"use client";

import { useState } from "react";
import { WEB3FORMS_KEY_FOUNDATION, isWeb3FormsConfigured, submitWeb3Forms } from "@/lib/web3forms";

const INPUT =
  "w-full rounded-lg border border-line bg-surface px-4 py-2.5 text-base text-fg placeholder-muted/60 shadow-sm outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20";

const BACKGROUNDS = [
  "Student / final-year graduate",
  "Career-changer entering cybersecurity",
  "Early-career IT professional",
  "Other",
];

const KEY_CONFIGURED = isWeb3FormsConfigured(WEB3FORMS_KEY_FOUNDATION);

type Status = "idle" | "submitting" | "success" | "error" | "unconfigured";

export function FoundationApplyForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [background, setBackground] = useState(BACKGROUNDS[0]);
  const [college, setCollege] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!KEY_CONFIGURED) {
      setStatus("unconfigured");
      return;
    }
    setStatus("submitting");
    setErrorMsg("");
    const r = await submitWeb3Forms(WEB3FORMS_KEY_FOUNDATION, `New Foundation Program Application — ${name}`, {
      name,
      email,
      phone: phone || "—",
      background,
      college_or_company: college || "—",
      why_join: message || "—",
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
        <p className="text-2xl font-extrabold text-fg">Application received!</p>
        <p className="mt-2 text-base text-muted">Thanks for applying. We&apos;ll review your details and reply within 24 hours.</p>
      </div>
    );
  }

  if (status === "unconfigured") {
    return (
      <div className="rounded-2xl border border-amber-300/40 bg-amber-50/60 p-7 text-center">
        <p className="text-lg font-bold text-fg">Almost there</p>
        <p className="mt-2 text-sm text-muted">
          The application form is being connected. In the meantime, email your details to{" "}
          <span className="font-semibold text-fg">internship@shieldsyncsecurity.com</span> — we reply within 24 hours.
        </p>
        <a
          href="mailto:internship@shieldsyncsecurity.com"
          className="mt-4 inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-brand to-cyan px-5 py-2.5 text-sm font-bold text-white transition hover:brightness-110"
        >
          Email your application <span aria-hidden>→</span>
        </a>
      </div>
    );
  }

  const submitting = status === "submitting";

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="ia-name" className="mb-1.5 block text-sm font-semibold text-fg">Full name *</label>
          <input id="ia-name" type="text" required placeholder="Your name"
            value={name} onChange={(e) => setName(e.target.value)} className={INPUT} />
        </div>
        <div>
          <label htmlFor="ia-email" className="mb-1.5 block text-sm font-semibold text-fg">Email *</label>
          <input id="ia-email" type="email" required placeholder="you@email.com"
            value={email} onChange={(e) => setEmail(e.target.value)} className={INPUT} />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="ia-phone" className="mb-1.5 block text-sm font-semibold text-fg">Phone</label>
          <input id="ia-phone" type="tel" placeholder="+91 98765 43210"
            value={phone} onChange={(e) => setPhone(e.target.value)} className={INPUT} />
        </div>
        <div>
          <label htmlFor="ia-bg" className="mb-1.5 block text-sm font-semibold text-fg">Background *</label>
          <select id="ia-bg" required value={background}
            onChange={(e) => setBackground(e.target.value)} className={INPUT}>
            {BACKGROUNDS.map((b) => <option key={b}>{b}</option>)}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="ia-college" className="mb-1.5 block text-sm font-semibold text-fg">College / Company</label>
        <input id="ia-college" type="text" placeholder="Where you currently study or work"
          value={college} onChange={(e) => setCollege(e.target.value)} className={INPUT} />
      </div>

      <div>
        <label htmlFor="ia-msg" className="mb-1.5 block text-sm font-semibold text-fg">Why do you want to join? <span className="text-muted font-normal">(optional)</span></label>
        <textarea id="ia-msg" rows={3} placeholder="A few lines about your motivation..."
          value={message} onChange={(e) => setMessage(e.target.value)} className={`${INPUT} resize-none`} />
      </div>

      {/* Hidden honeypot — bots fill it, humans never see it. */}
      <input type="checkbox" name="botcheck" className="hidden" tabIndex={-1} autoComplete="off" aria-hidden="true" />

      {status === "error" && (
        <p className="rounded-lg border border-rose-300/40 bg-rose-50/60 px-4 py-2.5 text-sm text-rose-700">{errorMsg}</p>
      )}

      <button type="submit" disabled={submitting}
        className="glow-brand w-full rounded-xl bg-gradient-to-r from-brand to-cyan px-6 py-3 text-base font-semibold text-white transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60">
        {submitting ? "Submitting…" : "Submit application →"}
      </button>
      <p className="text-center text-xs text-muted">
        Submitted securely — no email client needed. We reply within 24 hours.
      </p>
    </form>
  );
}
