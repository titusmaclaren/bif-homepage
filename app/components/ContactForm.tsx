"use client";

import { type FormEvent, useState } from "react";

const projectTypes = [
  "Brand film",
  "Corporate video",
  "Explainer or animation",
  "Social content",
  "Photography",
  "AI-powered content",
  "Something else",
];

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = new FormData(event.currentTarget);
    const name = String(form.get("name") || "").trim();
    const company = String(form.get("company") || "").trim();
    const email = String(form.get("email") || "").trim();
    const phone = String(form.get("phone") || "").trim();
    const projectType = String(form.get("projectType") || "").trim();
    const timeline = String(form.get("timeline") || "").trim();
    const message = String(form.get("message") || "").trim();

    const subject = `Website enquiry from ${name}${company ? ` at ${company}` : ""}`;
    const body = [
      `Name: ${name}`,
      `Company: ${company || "Not provided"}`,
      `Email: ${email}`,
      `Phone: ${phone || "Not provided"}`,
      `Project type: ${projectType || "Not selected"}`,
      `Timeline: ${timeline || "Not provided"}`,
      "",
      "Project details:",
      message,
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
          Name
          <input
            className={inputClass}
            type="text"
            name="name"
            autoComplete="name"
            required
          />
        </label>

        <label className="text-[12px] font-bold text-navy">
          Company
          <input
            className={inputClass}
            type="text"
            name="company"
            autoComplete="organization"
          />
        </label>

        <label className="text-[12px] font-bold text-navy">
          Work email
          <input
            className={inputClass}
            type="email"
            name="email"
            autoComplete="email"
            required
          />
        </label>

        <label className="text-[12px] font-bold text-navy">
          Phone
          <input
            className={inputClass}
            type="tel"
            name="phone"
            autoComplete="tel"
          />
        </label>

        <label className="text-[12px] font-bold text-navy">
          Project type
          <select className={inputClass} name="projectType" defaultValue="">
            <option value="" disabled>
              Select a service
            </option>
            {projectTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </label>

        <label className="text-[12px] font-bold text-navy">
          Ideal timeline
          <input
            className={inputClass}
            type="text"
            name="timeline"
            placeholder="e.g. September launch"
          />
        </label>
      </div>

      <label className="mt-5 block text-[12px] font-bold text-navy">
        Tell us about the project
        <textarea
          className={`${inputClass} min-h-36 resize-y`}
          name="message"
          required
        />
      </label>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <button
          type="submit"
          className="inline-flex min-h-12 items-center justify-center rounded-sm bg-mint px-7 py-3 text-[12px] font-bold uppercase tracking-wider text-white transition-colors hover:bg-mint-bright"
        >
          Send enquiry
        </button>
        {submitted && (
          <p className="text-[12px] font-medium text-slate" role="status">
            Your enquiry is ready to send.
          </p>
        )}
      </div>
    </form>
  );
}
