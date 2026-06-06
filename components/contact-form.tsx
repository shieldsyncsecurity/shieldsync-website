"use client";

import { useState } from "react";
import { CONTACT } from "@/lib/site";

const INPUT =
  "w-full rounded-lg border border-line bg-panel px-4 py-3 text-base text-fg placeholder-muted/60 shadow-sm outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20";

const SUBJECTS = [
  { value: "services", label: "Cloud security services (business)" },
  { value: "training", label: "Training / career tracks" },
  { value: "internship", label: "The internship" },
  { value: "labs", label: "Hands-on labs" },
  { value: "other", label: "Something else" },
];

export function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState(SUBJECTS[0].label);
  const [message, setMessage] = useState("");

  // Build the WhatsApp deep-link from the configured number (no backend needed).
  const waBase = CONTACT.whatsappHref.split("?")[0];

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const text = [
      `Hi ShieldSync — I'm ${name}${email ? ` (${email})` : ""}.`,
      `Interested in: ${subject}`,
      "",
      message,
    ].join("\n");
    const url = `${waBase}?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-2 block text-sm font-semibold text-fg">Name</label>
          <input
            id="name" name="name" type="text" required placeholder="Your name"
            value={name} onChange={(e) => setName(e.target.value)} className={INPUT}
          />
        </div>
        <div>
          <label htmlFor="email" className="mb-2 block text-sm font-semibold text-fg">Email</label>
          <input
            id="email" name="email" type="email" required placeholder="you@example.com"
            value={email} onChange={(e) => setEmail(e.target.value)} className={INPUT}
          />
        </div>
      </div>

      <div>
        <label htmlFor="subject" className="mb-2 block text-sm font-semibold text-fg">I&apos;m interested in</label>
        <select
          id="subject" name="subject" value={subject}
          onChange={(e) => setSubject(e.target.value)} className={INPUT}
        >
          {SUBJECTS.map((s) => (
            <option key={s.value} value={s.label}>{s.label}</option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="message" className="mb-2 block text-sm font-semibold text-fg">Message</label>
        <textarea
          id="message" name="message" rows={5} required placeholder="Tell us what you need..."
          value={message} onChange={(e) => setMessage(e.target.value)} className={`${INPUT} resize-none`}
        />
      </div>

      <button
        type="submit"
        className="glow-brand w-full rounded-xl bg-gradient-to-r from-brand to-cyan px-6 py-3.5 text-base font-semibold text-white transition hover:brightness-110"
      >
        Send via WhatsApp
      </button>
      <p className="text-center text-sm text-muted">
        Opens WhatsApp with your message ready to send. Prefer email?{" "}
        <a href={`mailto:${CONTACT.email}`} className="font-semibold text-brand-bright">{CONTACT.email}</a>
      </p>
    </form>
  );
}
