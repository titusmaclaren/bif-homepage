import "server-only";

type RateLimitOptions = {
  bucket: string;
  limit: number;
  windowMs: number;
};

type Bucket = {
  count: number;
  resetAt: number;
};

const buckets = new Map<string, Bucket>();
let cleanupAt = 0;

export class RequestBodyError extends Error {
  constructor(
    public readonly status: 400 | 413 | 415,
    message: string,
  ) {
    super(message);
    this.name = "RequestBodyError";
  }
}

export function getClientIp(request: Request) {
  const forwardedFor =
    request.headers.get("x-vercel-forwarded-for") ||
    request.headers.get("x-forwarded-for");
  if (forwardedFor) return forwardedFor.split(",")[0]?.trim() || "unknown";

  return (
    request.headers.get("x-real-ip") ||
    request.headers.get("cf-connecting-ip") ||
    "unknown"
  );
}

export function checkRateLimit(request: Request, options: RateLimitOptions) {
  const now = Date.now();
  if (now > cleanupAt) {
    cleanupAt = now + 60_000;
    for (const [key, bucket] of buckets) {
      if (bucket.resetAt <= now) buckets.delete(key);
    }
  }

  const key = `${options.bucket}:${getClientIp(request)}`;
  const current = buckets.get(key);

  if (!current || current.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + options.windowMs });
    return { ok: true, retryAfter: 0 };
  }

  if (current.count >= options.limit) {
    return {
      ok: false,
      retryAfter: Math.ceil((current.resetAt - now) / 1000),
    };
  }

  current.count += 1;
  return { ok: true, retryAfter: 0 };
}

export function isSameOriginRequest(request: Request) {
  if (request.headers.get("sec-fetch-site") === "cross-site") {
    return false;
  }

  const origin = request.headers.get("origin");
  if (!origin) {
    return true;
  }

  try {
    return new URL(origin).origin === new URL(request.url).origin;
  } catch {
    return false;
  }
}

export async function readJsonObject(
  request: Request,
  maxBytes: number,
): Promise<Record<string, unknown>> {
  const contentType = getMediaType(request);
  if (
    contentType !== "application/json" &&
    !contentType.endsWith("+json")
  ) {
    throw new RequestBodyError(415, "Expected a JSON request.");
  }

  const bytes = await readBodyBytes(request, maxBytes);
  let parsed: unknown;

  try {
    parsed = JSON.parse(
      new TextDecoder("utf-8", { fatal: true }).decode(bytes),
    ) as unknown;
  } catch {
    throw new RequestBodyError(400, "Invalid JSON body.");
  }

  if (!isRecord(parsed)) {
    throw new RequestBodyError(400, "Expected a JSON object.");
  }

  return parsed;
}

export async function readUrlEncodedForm(
  request: Request,
  maxBytes: number,
) {
  if (getMediaType(request) !== "application/x-www-form-urlencoded") {
    throw new RequestBodyError(415, "Expected a form submission.");
  }

  const bytes = await readBodyBytes(request, maxBytes);

  try {
    return new URLSearchParams(
      new TextDecoder("utf-8", { fatal: true }).decode(bytes),
    );
  } catch {
    throw new RequestBodyError(400, "Invalid form submission.");
  }
}

async function readBodyBytes(request: Request, maxBytes: number) {
  const declaredLength = Number(request.headers.get("content-length"));
  if (Number.isFinite(declaredLength) && declaredLength > maxBytes) {
    throw new RequestBodyError(413, "Request body is too large.");
  }

  if (!request.body) {
    return new Uint8Array();
  }

  const reader = request.body.getReader();
  const chunks: Uint8Array[] = [];
  let totalBytes = 0;

  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      if (!value) continue;

      totalBytes += value.byteLength;
      if (totalBytes > maxBytes) {
        await reader.cancel();
        throw new RequestBodyError(413, "Request body is too large.");
      }
      chunks.push(value);
    }
  } finally {
    reader.releaseLock();
  }

  const body = new Uint8Array(totalBytes);
  let offset = 0;
  for (const chunk of chunks) {
    body.set(chunk, offset);
    offset += chunk.byteLength;
  }
  return body;
}

function getMediaType(request: Request) {
  return (
    request.headers
      .get("content-type")
      ?.split(";", 1)[0]
      ?.trim()
      .toLowerCase() || ""
  );
}

export function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

export function cleanText(value: unknown) {
  return typeof value === "string"
    ? value.replace(/\0/g, "").replace(/\r\n/g, "\n").trim()
    : "";
}

export function cleanSingleLine(value: unknown) {
  return cleanText(value).replace(/[\r\n]+/g, " ").trim();
}

export function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) && value.length <= 254;
}

export function isTooLong(value: string, maxLength: number) {
  return value.length > maxLength;
}
