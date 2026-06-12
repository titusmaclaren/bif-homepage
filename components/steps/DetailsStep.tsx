"use client";

import { StepShell } from "./StepShell";
import { PrimaryButton } from "../primitives/PrimaryButton";

export type DetailsValue = {
  name: string;
  email: string;
  company: string;
  newsletter: boolean;
};

type Props = {
  stepLabel: string;
  title: string;
  subtitle: string;
  value: DetailsValue;
  onChange: (value: DetailsValue) => void;
  onSubmit: () => void;
  onBack: () => void;
  submitting: boolean;
};

function isValidEmail(email: string): boolean {
  const trimmed = email.trim();
  if (!trimmed.includes("@") || !trimmed.includes(".")) return false;
  const [local, domain] = trimmed.split("@");
  return Boolean(local) && Boolean(domain) && domain.includes(".");
}

/**
 * Final quiz step. Name, email, optional company, newsletter opt-in.
 * Submit is disabled until name and a valid-looking email are present.
 * The parent handles the POST to /api/estimate; we just flip `submitting`
 * to reflect the pending state.
 */
export function DetailsStep({
  stepLabel,
  title,
  subtitle,
  value,
  onChange,
  onSubmit,
  onBack,
  submitting,
}: Props) {
  const canSubmit =
    value.name.trim().length > 1 && isValidEmail(value.email) && !submitting;

  const field =
    "w-full rounded-lg border border-border-light bg-white px-4 py-3 text-[15px] text-text-primary placeholder:text-text-secondary/70 focus:border-navy focus:outline-none";

  return (
    <StepShell
      stepLabel={stepLabel}
      title={title}
      subtitle={subtitle}
      onBack={onBack}
      footer={
        <PrimaryButton
          onClick={onSubmit}
          disabled={!canSubmit}
          icon={submitting ? null : undefined}
        >
          {submitting ? "Estimating..." : "See my estimate"}
        </PrimaryButton>
      }
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <label className="flex flex-col gap-1.5">
          <span className="text-[12px] tracking-[0.12em] uppercase font-medium text-text-secondary">
            Name
          </span>
          <input
            type="text"
            autoComplete="name"
            value={value.name}
            onChange={(e) => onChange({ ...value, name: e.target.value })}
            className={field}
            placeholder="Your name"
          />
        </label>

        <label className="flex flex-col gap-1.5">
          <span className="text-[12px] tracking-[0.12em] uppercase font-medium text-text-secondary">
            Email
          </span>
          <input
            type="email"
            autoComplete="email"
            value={value.email}
            onChange={(e) => onChange({ ...value, email: e.target.value })}
            className={field}
            placeholder="you@company.com"
          />
        </label>

        <label className="flex flex-col gap-1.5 sm:col-span-2">
          <span className="text-[12px] tracking-[0.12em] uppercase font-medium text-text-secondary">
            Company <span className="text-text-secondary/60 normal-case tracking-normal">(optional)</span>
          </span>
          <input
            type="text"
            autoComplete="organization"
            value={value.company}
            onChange={(e) => onChange({ ...value, company: e.target.value })}
            className={field}
            placeholder="Company or organisation"
          />
        </label>
      </div>

      <label className="mt-5 flex items-start gap-3 cursor-pointer select-none">
        <input
          type="checkbox"
          checked={value.newsletter}
          onChange={(e) => onChange({ ...value, newsletter: e.target.checked })}
          className="mt-1 h-4 w-4 accent-navy"
        />
        <span className="text-[14px] leading-[1.55] text-text-primary">
          Send me the occasional short note from Black Iris Films. Ideas on using
          video well, new work, no filler. One click to unsubscribe.
        </span>
      </label>
    </StepShell>
  );
}
