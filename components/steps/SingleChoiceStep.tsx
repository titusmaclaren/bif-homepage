"use client";

import { StepShell } from "./StepShell";

type Props = {
  stepLabel: string;
  title: string;
  subtitle: string;
  options: readonly string[];
  selected?: string;
  onSelect: (value: string) => void;
  onBack?: () => void;
};

/**
 * Plain single-select list (no thumbnails). Used for goal, length, vibe.
 * Auto-advances on click via the parent's onSelect handler.
 */
export function SingleChoiceStep({
  stepLabel,
  title,
  subtitle,
  options,
  selected,
  onSelect,
  onBack,
}: Props) {
  return (
    <StepShell stepLabel={stepLabel} title={title} subtitle={subtitle} onBack={onBack}>
      <div className="flex flex-col gap-3">
        {options.map((option) => {
          const isSelected = selected === option;
          return (
            <button
              key={option}
              type="button"
              onClick={() => onSelect(option)}
              aria-pressed={isSelected}
              className={[
                "w-full text-left rounded-lg border px-6 py-[18px] text-[16px] transition-all duration-200",
                isSelected
                  ? "bg-navy text-white border-navy"
                  : "bg-white text-text-primary border-border-light hover:border-navy hover:-translate-y-[1px]",
              ].join(" ")}
            >
              {option}
            </button>
          );
        })}
      </div>
    </StepShell>
  );
}
