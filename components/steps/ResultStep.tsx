"use client";

import { StepShell } from "./StepShell";
import { PhaseCard } from "../primitives/PhaseCard";
import { PrimaryButton } from "../primitives/PrimaryButton";
import { BOOKING_URL } from "@/lib/links";
import type { EstimateResponse } from "@/lib/pricing";

type Props = {
  estimate: EstimateResponse;
  onStartOver: () => void;
};

function formatRange(low: number, high: number): string {
  const fmt = (n: number) =>
    n >= 1000 ? `A$${(n / 1000).toFixed(n % 1000 === 0 ? 0 : 1)}k` : `A$${n}`;
  return `${fmt(low)} to ${fmt(high)}`;
}

/**
 * Final screen. Either the per-phase breakdown (standard) or the "let's
 * scope this properly" escalation variant. Both offer the booking CTA.
 *
 * The "Email this estimate to me" button is intentionally hidden until the
 * Google Apps Script transactional-send path is wired up. Resend works end
 * to end but requires MX records on a subdomain that Wix DNS doesn't
 * support. The Apps Script approach reuses our existing webhook and sends
 * from the Workspace account, which lands in Primary rather than
 * Promotions. See /api/email-estimate and lib/renderEstimateHtml for the
 * bits that stay in place meanwhile.
 */
export function ResultStep({ estimate, onStartOver }: Props) {
  if (estimate.escalate) {
    return (
      <StepShell
        title="Let's scope this properly."
        subtitle="What you've described has enough moving parts that a quick chat will get you a better answer than a generated range. Someone from our team will be in touch within one working day."
      >
        <div className="rounded-xl border border-border-light bg-white p-6 sm:p-8">
          <div className="text-[11px] tracking-[0.2em] uppercase font-medium text-blue-slate mb-3">
            Why we're suggesting a call
          </div>
          <p className="text-[15px] leading-[1.7] text-text-primary">
            {estimate.escalation_reason || estimate.rationale}
          </p>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <PrimaryButton href={BOOKING_URL} target="_blank">
            Book a call
          </PrimaryButton>
          <button
            type="button"
            onClick={onStartOver}
            className="text-[14px] text-text-secondary hover:text-navy underline underline-offset-4"
          >
            Start over
          </button>
        </div>
      </StepShell>
    );
  }

  const showPreProd = estimate.pre_production_high > 0;

  return (
    <StepShell
      title="Here's an indicative range."
      subtitle={
        estimate.scope_band
          ? `Scope: ${estimate.scope_band}. Based on what you've told us, typical projects like this sit in this range.`
          : "Based on what you've told us, typical projects like this sit in this range."
      }
    >
      <div className="rounded-xl bg-navy text-white p-8 sm:p-10 mb-6">
        <div className="text-[11px] tracking-[0.2em] uppercase font-medium text-sky-pale mb-4">
          Total indicative range
        </div>
        <div className="font-light text-[40px] sm:text-[52px] leading-[1.05] tracking-[-0.01em]">
          {formatRange(estimate.total_low, estimate.total_high)}
        </div>
        {estimate.rationale && (
          <p className="mt-5 text-[15px] leading-[1.65] text-white/80 max-w-[60ch]">
            {estimate.rationale}
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {showPreProd && estimate.pre_production_description && (
          <PhaseCard
            phase="Pre-production"
            priceLow={estimate.pre_production_low}
            priceHigh={estimate.pre_production_high}
            description={estimate.pre_production_description}
          />
        )}
        <PhaseCard
          phase="Production"
          priceLow={estimate.production_low}
          priceHigh={estimate.production_high}
          description={estimate.production_description}
          showAsterisk
        />
        <PhaseCard
          phase="Post-production"
          priceLow={estimate.post_production_low}
          priceHigh={estimate.post_production_high}
          description={estimate.post_production_description}
        />
      </div>

      <p className="mt-4 text-[12px] leading-[1.6] text-text-secondary">
        <span className="text-blue-slate">*</span> Does not include parking or
        location fees.
      </p>

      <div className="mt-10 rounded-xl border border-border-light bg-white p-6 sm:p-8">
        <div className="font-medium text-[18px] text-navy mb-2">
          Want to lock this in?
        </div>
        <p className="text-[14px] leading-[1.65] text-text-secondary max-w-[58ch]">
          Book a short call and we'll turn this into a proper quote,
          usually within one working day. 15 minutes, no pressure.
        </p>

        <div className="mt-5 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <PrimaryButton href={BOOKING_URL} target="_blank">
            Book a quote call
          </PrimaryButton>
        </div>
        {estimate.fallback && (
          <p className="mt-3 text-[12px] text-text-secondary">
            Using a fallback range while the estimator reconnects. Book a call
            and we'll send a tailored quote directly.
          </p>
        )}
      </div>

      <div className="mt-8 flex items-center gap-4 text-[13px] text-text-secondary">
        <button
          type="button"
          onClick={onStartOver}
          className="hover:text-navy underline underline-offset-4"
        >
          Start over
        </button>
        {estimate.pricing_version && (
          <span className="text-text-secondary/70">
            Pricing version {estimate.pricing_version}
          </span>
        )}
        {estimate.fallback && (
          <span className="text-blue-slate">Using fallback estimate</span>
        )}
      </div>
    </StepShell>
  );
}
