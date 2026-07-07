"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Check, ArrowRight } from "@/components/icons";
import {
  AWS_PRICE,
  AWS_MONTHLY,
  formatMoney,
  type Currency,
  type Money,
} from "@/lib/region";

/* Pricing tiers with a ₹/$ region toggle, mirroring the labs-wizard. Labs only —
 * the internship is a separate program (/internship), deliberately NOT a tier here. */

type Tier = {
  name: string;
  price: (c: Currency) => string;
  cadence?: string;
  blurb: string;
  points: string[];
  cta: { label: string; href: string; external?: boolean };
  badge?: string;
  featured?: boolean;
};

const money = (m: Money, c: Currency) => formatMoney(m, c);

const TIERS: Tier[] = [
  {
    name: "Free lab",
    price: () => "Free",
    blurb: "Your first beginner lab, on us.",
    points: ["One real, isolated AWS account", "S3 misconfiguration scenario", "Auto-graded against live state", "No credit card"],
    cta: { label: "Start free lab", href: "/free-labs/aws-security" },
  },
  {
    name: "Pay per lab",
    // Flat pricing (owner, 2026-07-07): every paid lab is the same price — no
    // "From" qualifier needed.
    price: (c) => `${money(AWS_PRICE.Beginner, c)}`,
    blurb: "Buy only the labs you want.",
    points: ["One-time payment per lab", "30 launches within 7 days", "Every level — one flat price", "Great for targeted practice"],
    cta: { label: "Pick a lab", href: "/labs-wizard?track=aws&plan=per-lab" },
  },
  {
    name: "Monthly",
    price: (c) => `${money(AWS_MONTHLY, c)}`,
    cadence: "/ month",
    blurb: "Every AWS security lab, unlocked.",
    points: ["All AWS labs included", "New labs as we ship them", "Unlimited launches (fair use)", "Cancel anytime"],
    cta: { label: "Go monthly", href: "/labs-wizard?track=aws&plan=monthly" },
    badge: "Best value",
    featured: true,
  },
];

export function PricingTiers() {
  // Prices are chosen before first paint by the region script in layout.tsx
  // (sets <html data-region="in"> for India) and swapped purely in CSS
  // (.price-usd / .price-inr) — so there is no USD->INR flash on load. This
  // state only drives the toggle-button highlight + the USD footnote.
  const [currency, setCurrency] = useState<Currency>("USD");

  useEffect(() => {
    // Initial sync from whatever the pre-paint script decided (cache or TZ).
    if (document.documentElement.getAttribute("data-region") === "in") setCurrency("INR");
    // Keep in sync when the async IP refinement lands (edge case: wrong-TZ or
    // VPN visitors get corrected without a page reload).
    const onRegion = (e: Event) => {
      const detail = (e as CustomEvent<{ region: string }>).detail;
      setCurrency(detail?.region === "in" ? "INR" : "USD");
    };
    window.addEventListener("ss:region", onRegion);
    return () => window.removeEventListener("ss:region", onRegion);
  }, []);

  // Toggle: flip the region attribute (CSS swaps the prices) and the state
  // (button highlight + footnote) together. Mark it user-set so the async IP
  // fetch can't stomp the choice, and cache it so the choice survives full
  // page loads (the layout script reads ss_region before first paint).
  const pick = (c: Currency) => {
    setCurrency(c);
    const r = c === "INR" ? "in" : "us";
    document.documentElement.setAttribute("data-region", r);
    document.documentElement.setAttribute("data-region-userset", "1");
    try { localStorage.setItem("ss_region", JSON.stringify({ r, t: Date.now() })); } catch {}
  };

  const curBtn = (active: boolean) =>
    `rounded-md px-3 py-1.5 transition ${active ? "bg-brand/10 text-brand-bright" : "text-muted hover:text-fg"}`;

  return (
    <div>
      <div className="mb-6 flex items-center justify-center gap-3">
        <span className="text-xs text-muted">Prices shown for your region</span>
        <div className="inline-flex rounded-lg border border-line bg-panel p-0.5 text-sm font-semibold">
          <button type="button" onClick={() => pick("INR")} className={curBtn(currency === "INR")}>₹ INR</button>
          <button type="button" onClick={() => pick("USD")} className={curBtn(currency === "USD")}>$ USD</button>
        </div>
      </div>

      <div className="mx-auto grid max-w-4xl gap-5 sm:grid-cols-3">
        {TIERS.map((t) => (
          <div
            key={t.name}
            className={`relative flex flex-col rounded-2xl border bg-panel p-6 ${
              t.featured ? "border-brand ring-1 ring-brand/40" : "border-line"
            }`}
          >
            {t.badge ? (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-brand to-cyan px-3 py-0.5 text-[11px] font-bold text-white shadow-sm">
                {t.badge}
              </span>
            ) : null}
            <h3 className="text-base font-bold text-fg">{t.name}</h3>
            <div className="mt-2 flex items-baseline gap-1">
              <span className="text-3xl font-extrabold text-fg">
                <span className="price-usd">{t.price("USD")}</span>
                <span className="price-inr">{t.price("INR")}</span>
              </span>
              {t.cadence ? <span className="text-sm text-muted">{t.cadence}</span> : null}
            </div>
            <p className="mt-2 text-sm text-muted">{t.blurb}</p>
            <ul className="mt-4 flex-1 space-y-2">
              {t.points.map((p) => (
                <li key={p} className="flex items-start gap-2 text-sm text-fg/85">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                  {p}
                </li>
              ))}
            </ul>
            <Link
              href={t.cta.href}
              className={`mt-5 inline-flex items-center justify-center gap-1.5 rounded-xl px-4 py-2.5 text-sm font-semibold transition ${
                t.featured
                  ? "glow-brand bg-gradient-to-r from-brand to-cyan text-white hover:brightness-110"
                  : "border border-line-strong text-fg hover:bg-surface"
              }`}
            >
              {t.cta.label}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        ))}
      </div>

      {/* Shown only when USD is active (CSS-hidden for data-region="in"), so it
          matches the price display before first paint with no flash. Honest
          claim (owner, 2026-07-07): checkout bills in INR until the Paytm-side
          issue is fixed and USD checkout is enabled — update this when it is. */}
      <p className="price-usd mt-4 text-center text-xs text-muted">
        USD prices shown for reference — checkout is currently billed in INR (₹).
      </p>
    </div>
  );
}
