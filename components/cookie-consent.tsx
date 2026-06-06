"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const KEY = "ss-consent";

/** GDPR-style consent banner. Stores choice; broadcasts it so analytics/pixels
 *  only load after "accept". Strictly-necessary site features don't depend on it. */
export function CookieConsent() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem(KEY)) setShow(true);
    } catch {
      /* storage blocked — don't show */
    }
  }, []);

  function choose(value: "accepted" | "declined") {
    try {
      localStorage.setItem(KEY, value);
    } catch {
      /* ignore */
    }
    window.dispatchEvent(new CustomEvent("ss-consent-change", { detail: value }));
    setShow(false);
  }

  if (!show) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-[60] border-t border-line bg-panel/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p className="text-sm leading-6 text-muted">
          We use cookies for analytics and to improve your experience. See our{" "}
          <Link href="/privacy" className="font-semibold text-brand-bright">
            Privacy Policy
          </Link>
          .
        </p>
        <div className="flex shrink-0 gap-3">
          <button
            type="button"
            onClick={() => choose("declined")}
            className="rounded-lg border border-line px-4 py-2 text-sm font-semibold text-fg transition hover:bg-surface"
          >
            Decline
          </button>
          <button
            type="button"
            onClick={() => choose("accepted")}
            className="rounded-lg bg-gradient-to-r from-brand to-cyan px-4 py-2 text-sm font-semibold text-white transition hover:brightness-110"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
