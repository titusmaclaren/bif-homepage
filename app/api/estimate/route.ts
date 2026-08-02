import Anthropic from "@anthropic-ai/sdk";
import { NextResponse, after } from "next/server";
import { getSystemPrompt } from "@/lib/systemPrompt";
import {
  PRICING_VERSION,
  FALLBACK_ESTIMATE,
  ESCALATION_ESTIMATE,
  normalizeEstimateResponse,
  type EstimateResponse,
} from "@/lib/pricing";
import { captureLead } from "@/lib/leadCapture";
import { subscribeToNewsletter } from "@/lib/beehiiv";
import {
  checkRateLimit,
  cleanSingleLine,
  cleanText,
  isTooLong,
  isValidEmail,
  isSameOriginRequest,
  readJsonObject,
  RequestBodyError,
} from "@/lib/requestSecurity";

export const runtime = "nodejs";
export const maxDuration = 30;

const MAX_BODY_BYTES = 16 * 1024;

type Answers = {
  goal?: string;
  videoType?: string;
  length?: string;
  vibe?: string;
  scope?: string;
  brief?: string;
  details?: {
    name?: string;
    email?: string;
    company?: string;
    newsletter?: boolean;
    website?: string;
  };
};

const FIELD_LIMITS = {
  choice: 120,
  brief: 2000,
  name: 100,
  email: 254,
  company: 120,
};

// Claude handles escalation decisions based on the reference library and
// the explicit rules in the system prompt. We keep a light server-side
// fast-path only for phrases that are unambiguously out of self-serve scope,
// and only when they're NOT negated. Anything ambiguous goes to Claude.
function shouldEscalateFromBrief(brief: string | undefined): string | null {
  if (!brief) return null;
  const lc = brief.toLowerCase();
  const mentionsNegated = (phrase: string) => {
    const idx = lc.indexOf(phrase);
    if (idx === -1) return false;
    const before = lc.slice(Math.max(0, idx - 12), idx);
    return /(\bno\b|\bnot\b|\bwithout\b|\bn't\b)\s*$/.test(before);
  };
  const mentions = (phrase: string) =>
    lc.includes(phrase) && !mentionsNegated(phrase);

  if (mentions("studio build") || mentions("set build") || mentions("set construction"))
    return "Studio or set build mentioned.";
  if (mentions("broadcast tvc") || mentions("national tvc"))
    return "Broadcast TVC scope.";
  return null;
}

/**
 * All post-response side effects in one place: lead capture (Google
 * Apps Script -> Sheet + email) and, when the user ticked the
 * newsletter box, a Beehiiv subscription. Both run in parallel and
 * errors are swallowed independently — neither one should block or
 * fail the other.
 */
async function runPostSubmit(
  answers: Answers,
  payload: EstimateResponse,
): Promise<void> {
  const tasks: Promise<unknown>[] = [captureLead(answers, payload)];
  if (answers.details?.newsletter && answers.details?.email) {
    tasks.push(
      subscribeToNewsletter({
        email: answers.details.email,
        name: answers.details.name,
        source: "Estimator",
      }),
    );
  }
  await Promise.allSettled(tasks);
}

function stripFences(text: string): string {
  const fenced = text.match(/```(?:json)?\s*([\s\S]*?)\s*```/i);
  if (fenced) return fenced[1].trim();
  return text.trim();
}

function tryExtractJson(text: string): string | null {
  const stripped = stripFences(text);
  const firstBrace = stripped.indexOf("{");
  const lastBrace = stripped.lastIndexOf("}");
  if (firstBrace === -1 || lastBrace === -1 || lastBrace < firstBrace) return null;
  return stripped.slice(firstBrace, lastBrace + 1);
}

export async function POST(req: Request) {
  if (!isSameOriginRequest(req)) {
    return NextResponse.json(
      {
        error: "Cross-origin estimate requests are not allowed.",
        fallback: true,
        ...FALLBACK_ESTIMATE,
        pricing_version: PRICING_VERSION,
      },
      { status: 403 },
    );
  }

  let answers: Answers = {};
  try {
    answers = (await readJsonObject(req, MAX_BODY_BYTES)) as Answers;
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof RequestBodyError
            ? error.message
            : "Could not read request body.",
        fallback: true,
        ...FALLBACK_ESTIMATE,
      },
      { status: error instanceof RequestBodyError ? error.status : 400 },
    );
  }

  if (cleanSingleLine(answers.details?.website)) {
    return NextResponse.json({
      ...FALLBACK_ESTIMATE,
      pricing_version: PRICING_VERSION,
    });
  }

  const rateLimit = checkRateLimit(req, {
    bucket: "estimate",
    limit: 8,
    windowMs: 15 * 60 * 1000,
  });
  if (!rateLimit.ok) {
    return NextResponse.json(
      {
        error:
          "Too many estimate requests in a short time. Please wait a few minutes and try again.",
        fallback: true,
        ...FALLBACK_ESTIMATE,
        pricing_version: PRICING_VERSION,
      },
      {
        status: 429,
        headers: { "Retry-After": String(rateLimit.retryAfter) },
      },
    );
  }

  answers = {
    goal: cleanSingleLine(answers.goal),
    videoType: cleanSingleLine(answers.videoType),
    length: cleanSingleLine(answers.length),
    vibe: cleanSingleLine(answers.vibe),
    scope: cleanSingleLine(answers.scope),
    brief: cleanText(answers.brief),
    details: {
      name: cleanSingleLine(answers.details?.name),
      email: cleanSingleLine(answers.details?.email).toLowerCase(),
      company: cleanSingleLine(answers.details?.company),
      newsletter: answers.details?.newsletter === true,
    },
  };

  const fieldsTooLong =
    isTooLong(answers.goal || "", FIELD_LIMITS.choice) ||
    isTooLong(answers.videoType || "", FIELD_LIMITS.choice) ||
    isTooLong(answers.length || "", FIELD_LIMITS.choice) ||
    isTooLong(answers.vibe || "", FIELD_LIMITS.choice) ||
    isTooLong(answers.scope || "", FIELD_LIMITS.choice) ||
    isTooLong(answers.brief || "", FIELD_LIMITS.brief) ||
    isTooLong(answers.details?.name || "", FIELD_LIMITS.name) ||
    isTooLong(answers.details?.email || "", FIELD_LIMITS.email) ||
    isTooLong(answers.details?.company || "", FIELD_LIMITS.company);

  if (fieldsTooLong) {
    return NextResponse.json(
      {
        error:
          "One of the fields is too long. Please shorten your brief and try again.",
        fallback: true,
        ...FALLBACK_ESTIMATE,
        pricing_version: PRICING_VERSION,
      },
      { status: 400 },
    );
  }

  if (
    !answers.details?.name ||
    !answers.details?.email ||
    !isValidEmail(answers.details.email)
  ) {
    return NextResponse.json(
      {
        error: "Please enter your name and a valid email address.",
        fallback: true,
        ...FALLBACK_ESTIMATE,
        pricing_version: PRICING_VERSION,
      },
      { status: 400 },
    );
  }

  // Emergency server-side escalation shortcut for obvious keywords.
  const escalateHint = shouldEscalateFromBrief(answers.brief);
  if (escalateHint) {
    const escalationPayload: EstimateResponse = {
      ...ESCALATION_ESTIMATE,
      escalation_reason: escalateHint,
      pricing_version: PRICING_VERSION,
    };
    after(() => runPostSubmit(answers, escalationPayload));
    return NextResponse.json(escalationPayload);
  }

  // We prefer BIF_ANTHROPIC_API_KEY because Claude Code itself exports
  // ANTHROPIC_API_KEY (often empty) into the shell, and Next.js will not
  // overwrite a pre-existing env var from .env.local. Falling back to the
  // standard name means a plain Vercel deploy can still set ANTHROPIC_API_KEY.
  const apiKey =
    process.env.BIF_ANTHROPIC_API_KEY || process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    console.warn(
      "No API key set (tried BIF_ANTHROPIC_API_KEY, ANTHROPIC_API_KEY); returning fallback estimate.",
    );
    const fallbackPayload: EstimateResponse = {
      ...FALLBACK_ESTIMATE,
      pricing_version: PRICING_VERSION,
    };
    after(() => runPostSubmit(answers, fallbackPayload));
    return NextResponse.json(fallbackPayload);
  }

  try {
    const anthropic = new Anthropic({
      apiKey,
      maxRetries: 1,
      timeout: 20_000,
    });

    // Reshape to the snake_case keys the reference library documents.
    const userPayload = {
      goal: answers.goal,
      video_type: answers.videoType,
      length: answers.length,
      vibe: answers.vibe,
      scope: answers.scope,
      brief: answers.brief,
      company: answers.details?.company || null,
    };

    const response = await anthropic.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 1500,
      system: getSystemPrompt(),
      messages: [
        {
          role: "user",
          content: JSON.stringify(userPayload),
        },
      ],
    });

    const textBlock = response.content.find((b) => b.type === "text");
    const text = textBlock && textBlock.type === "text" ? textBlock.text : "";

    const jsonSlice = tryExtractJson(text);
    if (!jsonSlice) {
      console.error("No JSON found in Claude response.");
      const fallbackPayload: EstimateResponse = {
        ...FALLBACK_ESTIMATE,
        pricing_version: PRICING_VERSION,
        fallback: true,
      };
      after(() => runPostSubmit(answers, fallbackPayload));
      return NextResponse.json(fallbackPayload, { status: 200 });
    }

    let parsed: unknown;
    try {
      parsed = JSON.parse(jsonSlice) as unknown;
    } catch (err) {
      console.error(
        "Failed to parse Claude JSON:",
        err instanceof Error ? err.message : "Unknown parse error",
      );
      const fallbackPayload: EstimateResponse = {
        ...FALLBACK_ESTIMATE,
        pricing_version: PRICING_VERSION,
        fallback: true,
      };
      after(() => runPostSubmit(answers, fallbackPayload));
      return NextResponse.json(fallbackPayload, { status: 200 });
    }

    const normalized = normalizeEstimateResponse(parsed);
    if (!normalized) {
      console.error("Claude returned an invalid estimate shape.");
      const fallbackPayload: EstimateResponse = {
        ...FALLBACK_ESTIMATE,
        pricing_version: PRICING_VERSION,
        fallback: true,
      };
      after(() => runPostSubmit(answers, fallbackPayload));
      return NextResponse.json(fallbackPayload, { status: 200 });
    }

    const finalPayload: EstimateResponse = {
      ...normalized,
      pricing_version: PRICING_VERSION,
    };
    after(() => runPostSubmit(answers, finalPayload));
    return NextResponse.json(finalPayload);
  } catch (err) {
    console.error(
      "Anthropic call failed:",
      err instanceof Error ? err.message : "Unknown error",
    );
    const fallbackPayload: EstimateResponse = {
      ...FALLBACK_ESTIMATE,
      pricing_version: PRICING_VERSION,
      fallback: true,
    };
    after(() => runPostSubmit(answers, fallbackPayload));
    return NextResponse.json(fallbackPayload, { status: 200 });
  }
}
