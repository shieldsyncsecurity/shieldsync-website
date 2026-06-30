"use client";

import { useState } from "react";
import { CONTACT } from "@/lib/site";
import { WEB3FORMS_KEY_CONTACT, isWeb3FormsConfigured, submitWeb3Forms } from "@/lib/web3forms";

const INPUT =
  "w-full rounded-lg border border-line bg-panel px-4 py-3 text-base text-fg placeholder-muted/60 shadow-sm outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20";

const SUBJECTS = [
  { value: "services", label: "Cloud security services (business)" },
  { value: "training", label: "Training / career tracks" },
  { value: "internship", label: "The internship" },
  { value: "labs", label: "Hands-on labs" },
  { value: "other", label: "Something else" },
];

const KEY_CONFIGURED = isWeb3FormsConfigured(WEB3FORMS_KEY_CONTACT);

type Status = "idle" | "submitting" | "success" | "error" | "unconfigured";

export function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState(SUBJECTS[0].label);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  // WhatsApp deep-link (kept as a secondary option for people who prefer it).
  const waBase = CONTACT.whatsappHref.split("?")[0];
  const waUrl = `${waBase}?text=${encodeURIComponent(
    `Hi ShieldSync — I'm ${name || "(name)"}${email ? ` (${email})` : ""}. Interested in: ${subject}.${message ? `\n\n${message}` : ""}`
  )}`;

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!KEY_CONFIGURED) {
      setStatus("unconfigured");
      return;
    }
    setStatus("submitting");
    setErrorMsg("");
    const r = await submitWeb3Forms(WEB3FORMS_KEY_CONTACT, `New enquiry — ${subject}`, {
      name,
      email,
      interested_in: subject,
      message,
    });
    if (r.ok) {
      setStatus("success");
    } else {
      setStatus("error");
      setErrorMsg(r.message || "Something went wrong. Please try again.");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-brand/30 bg-brand/5 p-7 text-center">
        <p className="text-2xl font-extrabold text-fg">Message sent!</p>
        <p className="mt-2 text-base text-muted">Thanks for reaching out. We&apos;ll get back to you within 24 hours.</p>
      </div>
    );
  }

  if (status === "unconfigured") {
    return (
      <div className="rounded-2xl border border-amber-300/40 bg-amber-50/60 p-7 text-center">
        <p className="text-lg font-bold text-fg">Almost there</p>
        <p className="mt-2 text-sm text-muted">
          The contact form is being connected. In the meantime, email us at{" "}
          <span className="font-semibold text-fg">{CONTACT.email}</span> or message us on WhatsApp — we reply within 24 hours.
        </p>
      </div>
    );
  }

  const submitting = status === "submitting";

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

      {/* Hidden honeypot — bots fill it, humans never see it. */}
      <input type="checkbox" name="botcheck" className="hidden" tabIndex={-1} autoComplete="off" aria-hidden="true" />

      {status === "error" && (
        <p className="rounded-lg border border-rose-300/40 bg-rose-50/60 px-4 py-2.5 text-sm text-rose-700">{errorMsg}</p>
      )}

      <button
        type="submit" disabled={submitting}
        className="glow-brand w-full rounded-xl bg-gradient-to-r from-brand to-cyan px-6 py-3.5 text-base font-semibold text-white transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {submitting ? "Sending…" : "Send message"}
      </button>
      <p className="text-center text-sm text-muted">
        Sent securely — no app needed. Prefer{" "}
        <a href={waUrl} target="_blank" rel="noopener noreferrer" className="font-semibold text-brand-bright">WhatsApp</a>
        {" "}or{" "}
        <a href={`mailto:${CONTACT.email}`} className="font-semibold text-brand-bright">email</a>?
      </p>
    </form>
  );
}
