"use client";

import { useMemo, useState } from "react";
import { ProgressBar } from "./ProgressBar";
import { SingleChoiceStep } from "./steps/SingleChoiceStep";
import { RecommendationStep } from "./steps/RecommendationStep";
import { VideoTypeStep } from "./steps/VideoTypeStep";
import { ScopeStep } from "./steps/ScopeStep";
import { BriefStep } from "./steps/BriefStep";
import { DetailsStep } from "./steps/DetailsStep";
import { LoadingStep } from "./steps/LoadingStep";
import { ResultStep } from "./steps/ResultStep";
import type { DetailsValue } from "./steps/DetailsStep";
import {
  QUESTIONS,
  VIDEO_TYPE_OPTIONS,
  SCOPE_OPTIONS,
} from "@/lib/questions";
import {
  FALLBACK_ESTIMATE,
  type EstimateResponse,
} from "@/lib/pricing";

type Answers = {
  goal?: string;
  videoType?: string;
  length?: string;
  vibe?: string;
  scope?: string;
  brief: string;
  details: DetailsValue;
};

const INITIAL_ANSWERS: Answers = {
  brief: "",
  details: { name: "", email: "", company: "", newsletter: false },
};

// Step ordering: 0 goal, 1 recommendation, 2 length, 3 vibe, 4 scope, 5 brief, 6 details, 7 result
// The recommendation step replaces the VideoType step in the flow; users can
// still reach VideoType options via the "Or choose another type" expander.
const STEP_COUNT = 8;

/**
 * Root component for the estimator quiz. Owns all answer state, step
 * transitions (with a 250ms fade), and the POST to /api/estimate.
 */
export function Estimator() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>(INITIAL_ANSWERS);
  const [fading, setFading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [estimate, setEstimate] = useState<EstimateResponse | null>(null);

  const questionById = useMemo(() => {
    const map: Record<string, (typeof QUESTIONS)[number]> = {};
    for (const q of QUESTIONS) map[q.id] = q;
    return map;
  }, []);

  const go = (next: number) => {
    setFading(true);
    window.setTimeout(() => {
      setStep(next);
      window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
      setFading(false);
    }, 250);
  };

  const advance = () => go(step + 1);
  const back = () => go(Math.max(0, step - 1));

  const stepLabel = (n: number) => `Step ${n} of 7`;

  const submit = async () => {
    // Advance immediately so the LoadingStep shows while Claude is thinking.
    // The ResultStep only renders once `estimate` is populated.
    setSubmitting(true);
    setEstimate(null);
    advance();
    try {
      const res = await fetch("/api/estimate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(answers),
      });
      const data = (await res.json()) as EstimateResponse & { error?: string };
      if (!res.ok || data.error) {
        setEstimate({ ...FALLBACK_ESTIMATE });
      } else {
        setEstimate(data);
      }
    } catch {
      setEstimate({ ...FALLBACK_ESTIMATE });
    } finally {
      setSubmitting(false);
    }
  };

  const startOver = () => {
    setAnswers(INITIAL_ANSWERS);
    setEstimate(null);
    go(0);
  };

  // Server handles escalation via Claude. No client-side shortcut — avoids
  // false positives like "no paid talent needed" flipping users into the
  // booking-only path unfairly.

  const renderStep = () => {
    switch (step) {
      case 0: {
        const q = questionById.goal;
        if (q.kind !== "single") return null;
        return (
          <SingleChoiceStep
            stepLabel={stepLabel(1)}
            title={q.title}
            subtitle={q.subtitle}
            options={q.options}
            selected={answers.goal}
            onSelect={(value) => {
              setAnswers((a) => ({ ...a, goal: value }));
              advance();
            }}
          />
        );
      }
      case 1: {
        return (
          <RecommendationStep
            stepLabel={stepLabel(2)}
            goal={answers.goal || "Something else"}
            selected={answers.videoType}
            onSelect={(videoType) => {
              setAnswers((a) => ({ ...a, videoType }));
              advance();
            }}
            onBack={back}
          />
        );
      }
      case 2: {
        const q = questionById.length;
        if (q.kind !== "single") return null;
        return (
          <SingleChoiceStep
            stepLabel={stepLabel(3)}
            title={q.title}
            subtitle={q.subtitle}
            options={q.options}
            selected={answers.length}
            onSelect={(value) => {
              setAnswers((a) => ({ ...a, length: value }));
              advance();
            }}
            onBack={back}
          />
        );
      }
      case 3: {
        const q = questionById.vibe;
        if (q.kind !== "single") return null;
        return (
          <SingleChoiceStep
            stepLabel={stepLabel(4)}
            title={q.title}
            subtitle={q.subtitle}
            options={q.options}
            selected={answers.vibe}
            onSelect={(value) => {
              setAnswers((a) => ({ ...a, vibe: value }));
              advance();
            }}
            onBack={back}
          />
        );
      }
      case 4: {
        const q = questionById.scope;
        if (q.kind !== "scope") return null;
        return (
          <ScopeStep
            stepLabel={stepLabel(5)}
            title={q.title}
            subtitle={q.subtitle}
            options={q.options}
            highlight={q.highlight}
            selected={answers.scope}
            onSelect={(value) => {
              setAnswers((a) => ({ ...a, scope: value }));
              advance();
            }}
            onBack={back}
          />
        );
      }
      case 5: {
        const q = questionById.brief;
        if (q.kind !== "textarea") return null;
        return (
          <BriefStep
            stepLabel={stepLabel(6)}
            title={q.title}
            subtitle={q.subtitle}
            minLength={q.minLength}
            value={answers.brief}
            onChange={(brief) => setAnswers((a) => ({ ...a, brief }))}
            onContinue={advance}
            onBack={back}
          />
        );
      }
      case 6: {
        const q = questionById.details;
        if (q.kind !== "details") return null;
        return (
          <DetailsStep
            stepLabel={stepLabel(7)}
            title={q.title}
            subtitle={q.subtitle}
            value={answers.details}
            onChange={(details) => setAnswers((a) => ({ ...a, details }))}
            submitting={submitting}
            onBack={back}
            onSubmit={submit}
          />
        );
      }
      case 7: {
        // Still waiting on Claude — show the Lottie loader.
        if (submitting || !estimate) {
          return <LoadingStep />;
        }
        return (
          <ResultStep estimate={estimate} onStartOver={startOver} />
        );
      }
      default:
        return null;
    }
  };

  // Silence unused-import warning in case tree-shaking trims references.
  void VIDEO_TYPE_OPTIONS;
  void SCOPE_OPTIONS;

  return (
    <div className="below-header flex-1">
      <ProgressBar step={step} total={STEP_COUNT} />
      <main className="estimator-main mx-auto max-w-3xl px-5 sm:px-8 py-10 sm:py-16">
        <div
          className={[
            "transition-opacity duration-[250ms] ease-out",
            fading ? "opacity-0" : "opacity-100",
          ].join(" ")}
        >
          {renderStep()}
        </div>
      </main>
    </div>
  );
}
