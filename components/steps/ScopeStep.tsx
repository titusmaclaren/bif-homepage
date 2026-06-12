"use client";

import { StepShell } from "./StepShell";
import { OptionCard } from "../primitives/OptionCard";
import type { ScopeOption } from "@/lib/questions";

type Props = {
  stepLabel: string;
  title: string;
  subtitle: string;
  options: ScopeOption[];
  highlight: string;
  selected?: string;
  onSelect: (value: string) => void;
  onBack: () => void;
};

/**
 * Scope step. The `highlight` label (typically "Full content suite") gets
 * the mint Recommended pill. No thumbnails here; the description on each
 * card does the explaining.
 */
export function ScopeStep({
  stepLabel,
  title,
  subtitle,
  options,
  highlight,
  selected,
  onSelect,
  onBack,
}: Props) {
  return (
    <StepShell stepLabel={stepLabel} title={title} subtitle={subtitle} onBack={onBack}>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {options.map((opt) => (
          <OptionCard
            key={opt.label}
            label={opt.label}
            description={opt.description}
            selected={selected === opt.label}
            highlighted={opt.label === highlight}
            onClick={() => onSelect(opt.label)}
          />
        ))}
      </div>
    </StepShell>
  );
}
