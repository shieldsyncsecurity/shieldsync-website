"use client";

import { useState } from "react";
import { CONTACT } from "@/lib/site";

const INPUT =
  "w-full rounded-lg border border-line bg-surface px-4 py-2.5 text-base text-fg placeholder-muted/60 shadow-sm outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20";

const BACKGROUNDS = [
  "Student / final-year graduate",
  "Career-changer entering cybersecurity",
  "Early-career IT professional",
  "Other",
];

export function InternshipApplyForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [background, setBackground] = useState(BACKGROUNDS[0]);
  const [college, setCollege] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const body = [
      `Name: ${name}`,
      `Email: ${email}`,
      `Phone: ${phone || "—"}`,
      `Background: ${background}`,
      `College / Company: ${college || "—"}`,
      "",
      message ? `Message:\n${message}` : "",
    ].filter(Boolean).join("\n");

    const mailto = `mailto:${CONTACT.email}?subject=${encodeURIComponent(`Internship Application — ${name}`)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailto;
    setSent(true);
  }

  if (sent) {
    return (
      <div className="rounded-2xl border border-brand/30 bg-brand/5 p-7 text-center">
        <p className="text-2xl font-extrabold text-fg">Application sent!</p>
        <p className="mt-2 text-base text-muted">Your email client should have opened with the details. We'll reply within 24 hours.</p>
      </div>
    );
  }

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

      <button type="submit"
        className="glow-brand w-full rounded-xl bg-gradient-to-r from-brand to-cyan px-6 py-3 text-base font-semibold text-white transition hover:brightness-110">
        Submit application →
      </button>
      <p className="text-center text-xs text-muted">
        Opens your email client with details pre-filled. We reply within 24 hours.
      </p>
    </form>
  );
}
