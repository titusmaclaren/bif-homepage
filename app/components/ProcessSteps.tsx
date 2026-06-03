"use client";

import { VideoTrigger } from "./VideoLightbox";

const steps = [
  { n: 1, title: "Kick-off", blurb: "Goals, budget and timing locked", icon: "flag" },
  { n: 2, title: "Creative", blurb: "Message & visuals agreed", icon: "spark" },
  { n: 3, title: "Schedule", blurb: "Dates, crew, locations booked", icon: "calendar" },
  { n: 4, title: "Production", blurb: "Capture the content", icon: "camera" },
  { n: 5, title: "Post & Delivery", blurb: "Edit, revisions, formats, hand-off", icon: "package" },
];

type ProcessIcon = (typeof steps)[number]["icon"];

export function ProcessSteps() {
  return (
    <section className="bg-off-white py-16 md:py-20 border-y border-fog/60">
      <div className="mx-auto max-w-[1260px] px-6 lg:px-10">
        <div className="grid md:grid-cols-12 gap-8 mb-9 items-end">
          <div className="md:col-span-7">
            <p className="text-[11px] uppercase tracking-[0.22em] text-mint font-semibold mb-4">
              How it works
            </p>
            <h2 className="font-bold text-navy text-3xl md:text-4xl leading-[1.08]">
              You approve at each stage.
              <br />
              <span className="text-slate">We do the heavy lifting.</span>
            </h2>
          </div>
          <div className="md:col-span-5 md:text-right">
            <VideoTrigger
              video={{
                vimeoId: "280487304",
                category: "Process",
                title: "How we work, in 90 seconds",
                description: "The five-stage process behind every Black Iris Films project, from kick-off to delivery.",
              }}
              className="inline-flex items-center gap-3 text-sm font-medium text-navy hover:text-mint group"
            >
              <span className="inline-flex items-center justify-center w-10 h-10 rounded-full border border-navy/20 group-hover:border-mint group-hover:bg-mint transition-all">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="text-navy group-hover:text-white">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </span>
              <span className="text-left">
                <span className="block">Watch the 90 sec process</span>
                <span className="block text-xs text-slate font-normal mt-1">See why campaigns blow out elsewhere and not here.</span>
              </span>
            </VideoTrigger>
          </div>
        </div>

        <ol className="grid grid-cols-1 gap-px overflow-hidden rounded-lg border border-fog/70 bg-fog/70 sm:grid-cols-2 md:grid-cols-5">
          {steps.map((s) => (
            <li key={s.n} className="bg-white p-5 md:p-6">
              <div className="flex items-center justify-between gap-4">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-mint/12 text-mint">
                  <StepIcon icon={s.icon} />
                </span>
                <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-mint">
                  {String(s.n).padStart(2, "0")}
                </span>
              </div>
              <div className="mt-4 text-navy font-medium text-[15px]">{s.title}</div>
              <div className="mt-1.5 text-slate text-[13px] leading-relaxed">{s.blurb}</div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function StepIcon({ icon }: { icon: ProcessIcon }) {
  const common = "h-4 w-4";

  if (icon === "flag") {
    return (
      <svg aria-hidden="true" className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M6 21V4" />
        <path d="M6 4h11l-2 4 2 4H6" />
      </svg>
    );
  }

  if (icon === "spark") {
    return (
      <svg aria-hidden="true" className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="m12 3 1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3Z" />
        <path d="m19 16 .8 2.2L22 19l-2.2.8L19 22l-.8-2.2L16 19l2.2-.8L19 16Z" />
      </svg>
    );
  }

  if (icon === "calendar") {
    return (
      <svg aria-hidden="true" className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M5 5h14v15H5z" />
        <path d="M8 3v4" />
        <path d="M16 3v4" />
        <path d="M5 10h14" />
      </svg>
    );
  }

  if (icon === "camera") {
    return (
      <svg aria-hidden="true" className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M4 8h4l1.5-2h5L16 8h4v13H4z" />
        <circle cx="12" cy="14" r="3.4" />
      </svg>
    );
  }

  return (
    <svg aria-hidden="true" className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="m12 3 8 4-8 4-8-4 8-4Z" />
      <path d="M4 11v6l8 4 8-4v-6" />
      <path d="M12 11v10" />
    </svg>
  );
}
