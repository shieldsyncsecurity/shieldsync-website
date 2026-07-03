"use client";

import { useState } from "react";
import { WEB3FORMS_KEY_CONTACT, isWeb3FormsConfigured, submitWeb3Forms } from "@/lib/web3forms";

const INPUT =
  "w-full rounded-lg border border-line bg-panel px-4 py-3 text-base text-fg placeholder-muted/60 shadow-sm outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20";

const KEY_CONFIGURED = isWeb3FormsConfigured(WEB3FORMS_KEY_CONTACT);

type Status = "idle" | "submitting" | "success" | "error" | "unconfigured";

/* Inline SOC labs waitlist capture — reuses the same Web3Forms contact key
 * and submission pattern as ContactForm, just with a distinct subject line
 * so replies land in the same inbox but are easy to filter. */
export function SocWaitlistForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!KEY_CONFIGURED) {
      setStatus("unconfigured");
      return;
    }
    setStatus("submitting");
    setErrorMsg("");
    const r = await submitWeb3Forms(WEB3FORMS_KEY_CONTACT, "SOC Labs waitlist", {
      email,
      interested_in: "SOC Labs waitlist",
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
      <div id="waitlist" className="rounded-2xl border border-brand/30 bg-brand/5 p-5 text-center scroll-mt-24">
        <p className="text-base font-bold text-fg">You&apos;re on the list ✓</p>
        <p className="mt-1 text-sm text-muted">We&apos;ll email you the moment SOC labs go live.</p>
      </div>
    );
  }

  if (status === "unconfigured") {
    return (
      <div id="waitlist" className="rounded-2xl border border-amber-300/40 bg-amber-50/60 p-5 text-center scroll-mt-24">
        <p className="text-sm font-bold text-fg">Almost there</p>
        <p className="mt-1 text-xs text-muted">The waitlist form is being connected — check back shortly.</p>
      </div>
    );
  }

  const submitting = status === "submitting";

  return (
    <form
      id="waitlist"
      onSubmit={onSubmit}
      className="flex flex-col gap-3 rounded-2xl border border-line bg-panel p-4 scroll-mt-24 sm:flex-row sm:items-start"
    >
      <div className="flex-1">
        <label htmlFor="soc-waitlist-email" className="sr-only">
          Email address
        </label>
        <input
          id="soc-waitlist-email"
          name="email"
          type="email"
          required
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={INPUT}
        />
        {status === "error" && (
          <p className="mt-2 text-sm text-rose-700">{errorMsg}</p>
        )}
      </div>

      {/* Hidden honeypot — bots fill it, humans never see it. */}
      <input type="checkbox" name="botcheck" className="hidden" tabIndex={-1} autoComplete="off" aria-hidden="true" />

      <button
        type="submit"
        disabled={submitting}
        className="glow-brand shrink-0 rounded-xl bg-gradient-to-r from-brand to-cyan px-6 py-3 text-sm font-semibold text-white transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {submitting ? "Joining…" : "Join the SOC labs waitlist — first access at launch"}
      </button>
    </form>
  );
}
