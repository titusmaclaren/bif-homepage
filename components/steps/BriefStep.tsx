"use client";

import { StepShell } from "./StepShell";
import { PrimaryButton } from "../primitives/PrimaryButton";

type Props = {
  stepLabel: string;
  title: string;
  subtitle: string;
  value: string;
  minLength: number;
  onChange: (value: string) => void;
  onContinue: () => void;
  onBack: () => void;
};

/**
 * Free-text brief. Continue is disabled until the user writes at least
 * `minLength` characters, so Claude has something to work with.
 */
export function BriefStep({
  stepLabel,
  title,
  subtitle,
  value,
  minLength,
  onChange,
  onContinue,
  onBack,
}: Props) {
  const tooShort = value.trim().length < minLength;
  const charsRemaining = Math.max(0, minLength - value.trim().length);
  const briefHelpId = "estimate-brief-help";

  return (
    <StepShell
      stepLabel={stepLabel}
      title={title}
      subtitle={subtitle}
      onBack={onBack}
      footer={
        <PrimaryButton onClick={onContinue} disabled={tooShort}>
          Continue
        </PrimaryButton>
      }
    >
      <div>
        <label
          htmlFor="estimate-brief"
          className="sr-only"
        >
          Project brief
        </label>
        <textarea
          id="estimate-brief"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={7}
          maxLength={2000}
          aria-describedby={briefHelpId}
          aria-invalid={value.length > 0 && tooShort}
          placeholder="A quick sketch of the project. Audience, tone, where it lives, anything that makes this specific."
          className="w-full rounded-lg border border-border-light bg-white p-5 text-[15px] leading-[1.65] text-text-primary placeholder:text-text-secondary/70 focus:border-navy focus:outline-none resize-y min-h-[180px]"
        />
        <div id={briefHelpId} className="mt-2 text-[12px] text-text-secondary">
          {tooShort
            ? `A little more detail helps. ${charsRemaining} more character${charsRemaining === 1 ? "" : "s"}.`
            : "Looks good."}
        </div>
      </div>
    </StepShell>
  );
}
