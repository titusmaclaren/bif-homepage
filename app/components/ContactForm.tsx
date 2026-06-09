"use client";

import { type FormEvent, useState } from "react";

const referralOptions = [
  "Google / search",
  "Referral / word of mouth",
  "LinkedIn",
  "Instagram",
  "Facebook",
  "YouTube or Vimeo",
  "Event or conference",
  "Returning client",
  "Other",
];

type SubmitStatus = "idle" | "sending" | "sent" | "error";

type ContactFormProps = {
  source?: string;
  successMessage?: string;
};

export function ContactForm({
  source = "Contact page",
  successMessage = "Thanks. Your enquiry has been sent.",
}: ContactFormProps) {
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [feedback, setFeedback] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formElement = event.currentTarget;
    const form = new FormData(formElement);
    const name = String(form.get("name") || "").trim();
    const phone = String(form.get("phone") || "").trim();
    const email = String(form.get("email") || "").trim();
    const foundUs = String(form.get("foundUs") || "").trim();
    const message = String(form.get("message") || "").trim();
    const subscribed = form.get("subscribe") === "on";
    const website = String(form.get("website") || "").trim();

    setStatus("sending");
    setFeedback("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          phone,
          email,
          foundUs,
          message,
          subscribed,
          source,
          website,
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
      setFeedback(successMessage);
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
      className="rounded-lg border border-fog/80 bg-white p-5 shadow-[0_18px_50px_rgba(15,24,38,0.08)] sm:p-7"
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
          <input
            className={inputClass}
            type="text"
            name="name"
            autoComplete="name"
            maxLength={100}
            required
          />
        </label>

        <label className="text-[12px] font-bold text-navy">
          Contact Number *
          <input
            className={inputClass}
            type="tel"
            name="phone"
            autoComplete="tel"
            maxLength={50}
            required
          />
        </label>

        <label className="text-[12px] font-bold text-navy">
          Work Email *
          <input
            className={inputClass}
            type="email"
            name="email"
            autoComplete="email"
            maxLength={250}
            required
          />
        </label>

        <label className="text-[12px] font-bold text-navy">
          How did you find us? *
          <select className={inputClass} name="foundUs" defaultValue="" required>
            <option value="" disabled>
              How did you find us? *
            </option>
            {referralOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>
      </div>

      <label className="mt-5 block text-[12px] font-bold text-navy">
        Tell us a little about the project
        <textarea
          className={`${inputClass} min-h-36 resize-y`}
          name="message"
          placeholder="Tell us a little about the project..."
        />
      </label>

      <label className="mt-5 flex gap-3 rounded-sm border border-fog/70 bg-off-white/55 p-4 text-[12px] font-semibold leading-relaxed text-navy">
        <input
          type="checkbox"
          name="subscribe"
          defaultChecked
          className="mt-0.5 h-4 w-4 shrink-0 rounded border-fog accent-mint"
        />
        <span>
          Subscribe for exclusive insights in marketing and creative content
        </span>
      </label>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <button
          type="submit"
          disabled={status === "sending"}
          className="inline-flex min-h-12 items-center justify-center rounded-sm bg-mint px-7 py-3 text-[12px] font-bold uppercase tracking-wider text-white transition-colors hover:bg-mint-bright disabled:cursor-wait disabled:opacity-70"
        >
          {status === "sending" ? "Sending..." : "Submit"}
        </button>
        {feedback ? (
          <p
            className={`text-[12px] font-medium ${
              status === "error" ? "text-[#c0392b]" : "text-slate"
            }`}
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
