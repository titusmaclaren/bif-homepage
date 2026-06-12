"use client";

import { useState } from "react";
import Image from "next/image";
import { StepShell } from "./StepShell";
import { OptionCard } from "../primitives/OptionCard";
import { GOAL_RECOMMENDATIONS } from "@/lib/recommendations";
import { VIDEO_TYPE_OPTIONS } from "@/lib/questions";
import { THUMBS, thumbForVideoType } from "@/lib/thumbnails";

type Props = {
  stepLabel: string;
  goal: string;
  selected?: string;
  onSelect: (videoType: string) => void;
  onBack: () => void;
};

/**
 * Step 2. Two large recommendation cards driven by the chosen goal, plus an
 * expandable "Or choose another type" details element that reveals the full
 * video-type list. Selecting either option writes to answers.videoType and
 * the parent advances.
 */
export function RecommendationStep({
  stepLabel,
  goal,
  selected,
  onSelect,
  onBack,
}: Props) {
  const [expanded, setExpanded] = useState(false);
  const [rec1, rec2] = GOAL_RECOMMENDATIONS[goal] || GOAL_RECOMMENDATIONS["Something else"];

  return (
    <StepShell
      stepLabel={stepLabel}
      title="For you, we'd recommend..."
      subtitle="Either of these tends to fit the goal you picked. Choose one to keep going, or expand the full list below."
      onBack={onBack}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[rec1, rec2].map((rec) => {
          const thumb = THUMBS[rec.thumbnailKey];
          const isSelected = selected === rec.mapsToVideoType;
          return (
            <button
              key={rec.headline}
              type="button"
              onClick={() => onSelect(rec.mapsToVideoType)}
              aria-pressed={isSelected}
              className={[
                "group text-left rounded-xl border overflow-hidden transition-all duration-200",
                isSelected
                  ? "bg-navy text-white border-navy"
                  : "bg-white text-text-primary border-border-light hover:border-navy hover:-translate-y-[1px]",
              ].join(" ")}
            >
              <div className="relative aspect-[16/9] w-full bg-sky-pale/30">
                <Image
                  src={thumb.src}
                  alt={thumb.alt}
                  fill
                  sizes="(min-width: 768px) 40vw, 90vw"
                  className="object-cover"
                />
              </div>
              <div className="p-5">
                <div className="text-[11px] tracking-[0.18em] uppercase font-medium mb-2 text-blue-slate group-aria-pressed:text-white/70">
                  {isSelected ? (
                    <span className="text-white/70">Selected</span>
                  ) : (
                    <span>{rec.priceRange}</span>
                  )}
                </div>
                <div className="font-medium text-[18px] leading-tight">
                  {rec.headline}
                </div>
                <p
                  className={[
                    "mt-2 text-[14px] leading-[1.6]",
                    isSelected ? "text-white/80" : "text-text-secondary",
                  ].join(" ")}
                >
                  {rec.description}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      <div className="mt-8">
        <button
          type="button"
          onClick={() => setExpanded((e) => !e)}
          className="text-[13px] tracking-[0.06em] text-text-secondary hover:text-navy underline underline-offset-4"
        >
          {expanded ? "Hide full list" : "Or choose another type"}
        </button>

        {expanded && (
          <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
            {VIDEO_TYPE_OPTIONS.map((opt) => (
              <OptionCard
                key={opt}
                label={opt}
                thumbnailKey={thumbForVideoType(opt)}
                selected={selected === opt}
                onClick={() => onSelect(opt)}
              />
            ))}
          </div>
        )}
      </div>
    </StepShell>
  );
}
