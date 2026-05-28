"use client";

import { VideoTrigger } from "./VideoLightbox";

const steps = [
  { n: 1, title: "Kick-off", blurb: "Goals, budget and timing locked" },
  { n: 2, title: "Creative", blurb: "Message & visuals agreed" },
  { n: 3, title: "Schedule", blurb: "Dates, crew, locations booked" },
  { n: 4, title: "Production", blurb: "Capture the content" },
  { n: 5, title: "Post & Delivery", blurb: "Edit, revisions, formats, hand-off" },
];

export function ProcessSteps() {
  return (
    <section className="bg-off-white py-24 md:py-32 border-y border-fog/60">
      <div className="mx-auto max-w-[1260px] px-6 lg:px-10">
        <div className="grid md:grid-cols-12 gap-10 mb-14 items-end">
          <div className="md:col-span-7">
            <p className="text-[11px] uppercase tracking-[0.22em] text-mint font-semibold mb-5">
              How it works
            </p>
            <h2 className="font-bold text-navy text-4xl md:text-5xl leading-[1.05] tracking-tight">
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
              <span className="inline-flex items-center justify-center w-12 h-12 rounded-full border border-navy/20 group-hover:border-mint group-hover:bg-mint transition-all">
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

        <ol className="grid grid-cols-2 md:grid-cols-5 gap-px bg-fog/70 border border-fog/70 rounded-2xl overflow-hidden">
          {steps.map((s) => (
            <li key={s.n} className="bg-white p-7 md:p-8">
              <div className="text-mint text-5xl md:text-6xl font-light leading-none tracking-tight">{s.n}</div>
              <div className="mt-5 text-navy font-medium text-base">{s.title}</div>
              <div className="mt-2 text-slate text-[13.5px] leading-relaxed">{s.blurb}</div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
