"use client";

import { type FormEvent, useState } from "react";

const creditPacks = [
  "1 Image $100",
  "5 Images $400",
  "10 Images $600",
  "20 Images $1100",
  "25 Images $1500",
];

type SubmitStatus = "idle" | "sending" | "sent" | "error";

export function AiImageryContactForm() {
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [feedback, setFeedback] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formElement = event.currentTarget;
    const form = new FormData(formElement);

    setStatus("sending");
    setFeedback("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: String(form.get("name") || "").trim(),
          phone: String(form.get("phone") || "").trim(),
          email: String(form.get("email") || "").trim(),
          company: String(form.get("company") || "").trim(),
          pack: String(form.get("pack") || "").trim(),
          foundUs: "AI imagery page",
          message: String(form.get("message") || "").trim(),
          subscribed: form.get("subscribe") === "on",
          source: "AI imagery page",
          website: String(form.get("website") || "").trim(),
        }),
      });

      if (!response.ok) {
        const data = (await response.json().catch(() => null)) as {
          message?: string;
        } | null;
        throw new Error(data?.message || "Unable to send your enquiry.");
      }

      formElement.reset();
      setStatus("sent");
      setFeedback("Thanks. Your AI imagery enquiry has been sent.");
    } catch (error) {
      setStatus("error");
      setFeedback(
        error instanceof Error
          ? error.message
          : "Unable to send your enquiry right now.",
      );
    }
  }

  const inputClass =
    "mt-2 min-h-12 w-full rounded-sm border border-fog bg-white px-3.5 py-3 text-sm text-navy outline-none transition-colors placeholder:text-mist focus:border-mint focus:ring-2 focus:ring-mint/20";

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-lg border border-fog/80 bg-white p-5 shadow-[0_18px_50px_rgba(15,24,38,0.16)] sm:p-7"
    >
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />

      <div className="grid gap-5 sm:grid-cols-2">
        <label className="text-[12px] font-bold text-navy">
          Name *
          <input className={inputClass} type="text" name="name" autoComplete="name" maxLength={100} required />
        </label>
        <label className="text-[12px] font-bold text-navy">
          Work Email *
          <input className={inputClass} type="email" name="email" autoComplete="email" maxLength={250} required />
        </label>
        <label className="text-[12px] font-bold text-navy">
          Contact Number *
          <input className={inputClass} type="tel" name="phone" autoComplete="tel" maxLength={50} required />
        </label>
        <label className="text-[12px] font-bold text-navy">
          Company
          <input className={inputClass} type="text" name="company" autoComplete="organization" maxLength={120} />
        </label>
      </div>

      <fieldset className="mt-5">
        <legend className="text-[12px] font-bold text-navy">Select your credit pack *</legend>
        <div className="mt-3 grid gap-2.5 sm:grid-cols-2">
          {creditPacks.map((pack) => (
            <label
              key={pack}
              className="flex min-h-11 items-center gap-2.5 rounded-sm border border-fog/80 bg-off-white px-3 py-2.5 text-[12px] font-semibold text-navy"
            >
              <input type="radio" name="pack" value={pack} required className="accent-mint" />
              <span>{pack}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <label className="mt-5 block text-[12px] font-bold text-navy">
        What do you need?
        <textarea
          className={`${inputClass} min-h-32 resize-y`}
          name="message"
          maxLength={1200}
          placeholder="Tell us the use case, style, deadline or brand notes."
        />
      </label>

      <label className="mt-5 flex gap-3 rounded-sm border border-fog/70 bg-off-white/55 p-4 text-[12px] font-semibold leading-relaxed text-navy">
        <input type="checkbox" name="subscribe" className="mt-0.5 h-4 w-4 shrink-0 accent-mint" />
        <span>Subscribe for useful insights in marketing and creative content</span>
      </label>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <button
          type="submit"
          disabled={status === "sending"}
          className="inline-flex min-h-12 items-center justify-center rounded-sm bg-mint px-7 py-3 text-[12px] font-bold uppercase tracking-wider text-white transition-colors hover:bg-bif-green disabled:cursor-wait disabled:opacity-70"
        >
          {status === "sending" ? "Sending..." : "Get my images"}
        </button>
        {feedback ? (
          <p
            className={`text-[12px] font-medium ${status === "error" ? "text-[#c0392b]" : "text-slate"}`}
            role="status"
            aria-live="polite"
          >
            {feedback}
          </p>
        ) : null}
      </div>
    </form>
  );
}
