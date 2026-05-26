"use client";

import { useState } from "react";

const faqs = [
  {
    q: "How fast can you deliver?",
    a: "Most videos are delivered inside 10 business days from kick-off. Need it quicker? We can fast-track for an agreed rush fee.",
  },
  {
    q: "What does a Video Production Agency actually do?",
    a: "We learn your goals, plan the right story for your audience, then handle every step. Script, filming, editing, graphics. So the finished video drops straight into your marketing without extra fuss.",
  },
  {
    q: "Why video? It seems like a gamble.",
    a: "86% of businesses already use video; 81% say it directly lifts sales (HubSpot/Wyzowl 2024). Landing-page videos can boost conversions by up to 80%. When done well, it’s one of the highest-return media you can buy.",
  },
  {
    q: "What can I expect in terms of price?",
    a: `Every project is scoped and fixed upfront. No surprises. Here’s how most clients engage:\n\n• Content Sprint. Agile half‑ or full‑day production plus editing, batching up to 10 social assets, from A$7–15k\n• Brand Hero Film. 1‑4 min hero piece or animated explainer, A$10–30k\n• Campaign Partnership. Always‑on video engine, A$12–25k per month (6‑ or 12‑month terms)\n\nEvery engagement is scoped up‑front and fixed‑price, so the figure you sign is the figure you pay.`,
  },
  {
    q: "How can I be sure that I’ll get a good return on my investment?",
    a: "No agency can promise a dollar figure. Too many outside variables. We maximise your odds with emotion-led storytelling and can test concepts with neuromarketing tools when you want added certainty.",
  },
  {
    q: "Why do I need to affect my customers’ emotions?",
    a: "95% of a buying decision happens in the subconscious and is then justified with logic. Emotion-rich campaigns are roughly twice as likely to deliver large profit gains as purely rational ads (IPA “Power of Emotion”, 2025). Move hearts first, minds follow.",
  },
  {
    q: "What’s the process in simple terms?",
    a: "Kick-off → Creative → Schedule → Production → Post & Delivery. You approve at each stage; we do the heavy lifting.",
  },
  {
    q: "Why choose Black Iris Films?",
    a: "You get big-agency storytelling skill with boutique-agency care: the same small team every time, a fixed bill, and a hands-free process that leaves clients “stoked with the results.”",
  },
  {
    q: "What do I have to do?",
    a: "Supply a brief and give feedback. That’s it. We take care of all scripting, crew, directing and editing. You approve the script, then review the edits, usually just minor tweaks to meet corporate guidelines, while we handle everything else.",
  },
  {
    q: "How many revision rounds are included?",
    a: "Every quote includes exactly the number of tweak rounds the project is likely to need. Anywhere from zero to four, depending on complexity. After years of projects we’re almost always spot-on, so extra rounds are rare. If you ever do want more than we scoped, we’ll flag it first and bill a simple hourly rate. No surprises.",
  },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="bg-white py-24 md:py-32">
      <div className="mx-auto max-w-3xl px-6 lg:px-10">
        <div className="text-center mb-12">
          <p className="text-[11px] uppercase tracking-[0.22em] text-mint font-semibold mb-5">
            FAQ
          </p>
          <h2 className="font-light text-navy text-4xl md:text-5xl leading-[1.05] tracking-tight">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="border-t border-fog/70">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={f.q} className="border-b border-fog/70">
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full flex items-center justify-between gap-6 py-5 text-left text-navy hover:text-mint transition-colors"
                  aria-expanded={isOpen}
                >
                  <span className="text-[16px] md:text-[17px] font-medium leading-snug">
                    {f.q}
                  </span>
                  <span
                    className={`flex-shrink-0 w-7 h-7 rounded-full border border-navy/20 flex items-center justify-center transition-transform ${isOpen ? "rotate-45 border-mint bg-mint text-white" : ""}`}
                  >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                      <path d="M12 5v14M5 12h14" />
                    </svg>
                  </span>
                </button>
                {isOpen && (
                  <div className="pb-7 pt-1 text-slate text-[15px] leading-relaxed whitespace-pre-line">
                    {f.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
