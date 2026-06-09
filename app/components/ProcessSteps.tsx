"use client";

import { useEffect, useState } from "react";
import { VideoTrigger } from "./VideoLightbox";

type StepIconName = "flag" | "spark" | "calendar" | "camera" | "package";

const steps: {
  n: number;
  title: string;
  blurb: string;
  icon: StepIconName;
  meta: string[];
}[] = [
  {
    n: 1,
    title: "Kick-off",
    blurb: "Goals, budget and timing locked",
    icon: "flag",
    meta: ["Brief", "Quote", "e-sign"],
  },
  {
    n: 2,
    title: "Creative",
    blurb: "Message & visuals agreed",
    icon: "spark",
    meta: ["Research", "Script", "Storyboard"],
  },
  {
    n: 3,
    title: "Schedule",
    blurb: "Dates, crew, locations booked",
    icon: "calendar",
    meta: ["Dates", "Crew", "Locations"],
  },
  {
    n: 4,
    title: "Production",
    blurb: "Capture the content",
    icon: "camera",
    meta: ["Film", "Direct", "Record"],
  },
  {
    n: 5,
    title: "Post & Delivery",
    blurb: "Edit, revisions, formats, hand-off",
    icon: "package",
    meta: ["Edit", "VFX", "Deliver"],
  },
];

const ADVANCE_MS = 2800;

export function ProcessSteps() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return undefined;

    const id = window.setInterval(
      () => setActive((current) => (current + 1) % steps.length),
      ADVANCE_MS,
    );

    return () => window.clearInterval(id);
  }, [paused]);

  const fillPct = (active / (steps.length - 1)) * 100;

  return (
    <section className="border-y border-fog/60 bg-off-white py-16 md:py-20">
      <div className="mx-auto max-w-[1180px] px-6 lg:px-10">
        <div className="mb-10 grid items-end gap-8 md:mb-12 md:grid-cols-12">
          <div className="md:col-span-7">
            <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-mint">
              How it works
            </p>
            <h2 className="text-3xl font-bold leading-[1.1] text-navy md:whitespace-nowrap md:text-4xl">
              You approve at each stage.
              <br />
              <span className="text-slate">We do the heavy lifting.</span>
            </h2>
          </div>
          <div className="flex flex-col items-start gap-2 md:col-span-5 md:items-end">
            <VideoTrigger
              video={{
                vimeoId: "280487304",
                category: "Process",
                title: "How we work, in 90 seconds",
                description:
                  "The five-stage process behind every Black Iris Films project, from kick-off to delivery.",
              }}
              className="group inline-flex items-center gap-2.5 whitespace-nowrap rounded-full bg-mint px-4 py-2.5 text-sm font-semibold text-white shadow-[0_14px_30px_-14px_rgba(97,179,131,0.7)] transition-colors hover:bg-navy"
            >
              <span className="flex h-[26px] w-[26px] items-center justify-center rounded-full bg-white/20">
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="ml-px"
                  aria-hidden="true"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </span>
              Watch the 90-sec process
            </VideoTrigger>
            <span className="text-xs text-slate md:text-right">
              See why campaigns blow out elsewhere and not here.
            </span>
          </div>
        </div>

        <div
          className="relative"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className="pointer-events-none absolute left-[10%] right-[10%] top-[27px] hidden h-0.5 rounded bg-fog md:block">
            <div
              className="h-full rounded bg-gradient-to-r from-mint to-[#3BDE7A] transition-[width] duration-700 ease-out"
              style={{ width: `${fillPct}%` }}
            />
          </div>

          <ol className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-5">
            {steps.map((step, index) => {
              const isActive = index === active;
              const done = index < active;

              return (
                <li key={step.n} className="flex flex-col items-center">
                  <button
                    type="button"
                    onClick={() => setActive(index)}
                    aria-label={`Stage ${step.n}: ${step.title}`}
                    className={[
                      "relative z-10 flex h-[54px] w-[54px] items-center justify-center rounded-full border-2 transition-all duration-[400ms]",
                      done || isActive
                        ? "border-mint bg-mint"
                        : "border-fog bg-white",
                      isActive
                        ? "shadow-[0_0_0_6px_rgba(97,179,131,0.16)]"
                        : "",
                    ].join(" ")}
                  >
                    {done ? (
                      <CheckIcon
                        className="h-[22px] w-[22px] text-white"
                        strokeWidth={2.4}
                      />
                    ) : (
                      <StepIcon
                        icon={step.icon}
                        className={`h-5 w-5 ${
                          isActive ? "text-white" : "text-[#8993A5]"
                        }`}
                      />
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => setActive(index)}
                    className={[
                      "mt-[18px] w-full rounded-xl border bg-white p-[18px] pb-5 pt-[18px] text-left transition-all duration-[400ms]",
                      isActive
                        ? "-translate-y-1.5 border-mint shadow-[0_18px_38px_-22px_rgba(41,51,77,0.45)]"
                        : "border-fog",
                    ].join(" ")}
                  >
                    <div className="mb-2.5 flex min-h-[16px] items-center justify-between">
                      <span
                        className={`text-[11px] font-bold tracking-[0.16em] ${
                          isActive ? "text-mint" : "text-[#8993A5]"
                        }`}
                      >
                        {String(step.n).padStart(2, "0")}
                      </span>
                      {done ? (
                        <span className="inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-mint">
                          <CheckIcon
                            className="h-3 w-3 text-mint"
                            strokeWidth={2.6}
                          />{" "}
                          Approved
                        </span>
                      ) : isActive ? (
                        <span className="inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-slate">
                          <span className="h-[7px] w-[7px] animate-ping rounded-full bg-[#3BDE7A]" />{" "}
                          In progress
                        </span>
                      ) : null}
                    </div>
                    <div className="mb-1.5 text-base font-bold text-navy">
                      {step.title}
                    </div>
                    <div className="mb-3.5 text-[13px] leading-relaxed text-slate">
                      {step.blurb}
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {step.meta.map((meta) => (
                        <span
                          key={meta}
                          className="rounded-full bg-slate/10 px-2.5 py-[3px] text-[10.5px] font-semibold text-slate"
                        >
                          {meta}
                        </span>
                      ))}
                    </div>
                  </button>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}

function CheckIcon({
  className,
  strokeWidth = 2,
}: {
  className?: string;
  strokeWidth?: number;
}) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 12.5 9 17.5 20 6.5" />
    </svg>
  );
}

function StepIcon({
  icon,
  className,
}: {
  icon: StepIconName;
  className?: string;
}) {
  const common = {
    className,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };

  if (icon === "flag") {
    return (
      <svg {...common}>
        <path d="M6 21V4" />
        <path d="M6 4h11l-2 4 2 4H6" />
      </svg>
    );
  }

  if (icon === "spark") {
    return (
      <svg {...common}>
        <path d="m12 3 1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3Z" />
        <path d="m19 16 .8 2.2L22 19l-2.2.8L19 22l-.8-2.2L16 19l2.2-.8L19 16Z" />
      </svg>
    );
  }

  if (icon === "calendar") {
    return (
      <svg {...common}>
        <path d="M5 5h14v15H5z" />
        <path d="M8 3v4" />
        <path d="M16 3v4" />
        <path d="M5 10h14" />
      </svg>
    );
  }

  if (icon === "camera") {
    return (
      <svg {...common}>
        <path d="M4 8h4l1.5-2h5L16 8h4v13H4z" />
        <circle cx="12" cy="14" r="3.4" />
      </svg>
    );
  }

  return (
    <svg {...common}>
      <path d="m12 3 8 4-8 4-8-4 8-4Z" />
      <path d="M4 11v6l8 4 8-4v-6" />
      <path d="M12 11v10" />
    </svg>
  );
}
