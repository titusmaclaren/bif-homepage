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

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = new FormData(event.currentTarget);
    const name = String(form.get("name") || "").trim();
    const phone = String(form.get("phone") || "").trim();
    const email = String(form.get("email") || "").trim();
    const foundUs = String(form.get("foundUs") || "").trim();
    const message = String(form.get("message") || "").trim();
    const subscribed = form.get("subscribe") === "on";

    const subject = `Quote enquiry from ${name}`;
    const body = [
      `Name: ${name}`,
      `Contact number: ${phone}`,
      `Work email: ${email}`,
      `How did you find us?: ${foundUs}`,
      `Subscribe for insights: ${subscribed ? "Yes" : "No"}`,
      "",
      "Project notes:",
      message || "Not provided",
    ].join("\n");

    setSubmitted(true);
    window.location.href = `mailto:info@blackirisfilms.com?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;
  }

  const inputClass =
    "mt-2 min-h-12 w-full rounded-sm border border-fog bg-white px-3.5 py-3 text-sm text-navy outline-none transition-colors placeholder:text-mist focus:border-mint focus:ring-2 focus:ring-mint/20";

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-lg border border-fog/80 bg-white p-5 shadow-[0_18px_50px_rgba(15,24,38,0.08)] sm:p-7"
    >
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
          className="inline-flex min-h-12 items-center justify-center rounded-sm bg-mint px-7 py-3 text-[12px] font-bold uppercase tracking-wider text-white transition-colors hover:bg-mint-bright"
        >
          Submit
        </button>
        {submitted && (
          <p className="text-[12px] font-medium text-slate" role="status">
            Your quote request is ready to send.
          </p>
        )}
      </div>
    </form>
  );
}
