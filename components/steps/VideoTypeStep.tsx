"use client";

import { StepShell } from "./StepShell";
import { OptionCard } from "../primitives/OptionCard";
import { thumbForVideoType } from "@/lib/thumbnails";

type Props = {
  stepLabel: string;
  options: readonly string[];
  selected?: string;
  onSelect: (value: string) => void;
  onBack: () => void;
};

export function VideoTypeStep({ stepLabel, options, selected, onSelect, onBack }: Props) {
  return (
    <StepShell
      stepLabel={stepLabel}
      title="What kind of video are you picturing?"
      subtitle="This helps us understand the production style and scope."
      onBack={onBack}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {options.map((option) => (
          <OptionCard
            key={option}
            label={option}
            thumbnailKey={thumbForVideoType(option)}
            selected={selected === option}
            onClick={() => onSelect(option)}
          />
        ))}
      </div>
    </StepShell>
  );
}
