"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Space_Grotesk, Manrope } from "next/font/google";
import { AWS_LABS } from "@/lib/site";

const display = Space_Grotesk({ subsets: ["latin"], weight: ["500", "600", "700"] });
const body = Manrope({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });

// Sample pricing for the prototype (real pricing parked until cost-maths).
const PRICE: Record<string, number> = { Beginner: 9, Intermediate: 14, Advanced: 19 };
const FREE_SLUG = "s3-misconfiguration-audit";
const priceOf = (lab: (typeof AWS_LABS)[number]) => (lab.slug === FREE_SLUG ? 0 : PRICE[lab.level]);

const LEVELS = ["All", "Beginner", "Intermediate", "Advanced"] as const;
const LEVEL_DOT: Record<string, string> = {
  Beginner: "bg-lime-400",
  Intermediate: "bg-amber-400",
  Advanced: "bg-rose-400",
};

function Switcher() {
  return (
    <div className="fixed bottom-5 left-1/2 z-50 flex -translate-x-1/2 items-center gap-1 rounded-full border border-white/10 bg-stone-900/90 p-1.5 text-sm font-semibold shadow-2xl backdrop-blur">
      <Link href="/" className="rounded-full px-4 py-2 text-stone-400 hover:text-white">Current</Link>
      <Link href="/preview" className="rounded-full px-4 py-2 text-stone-400 hover:text-white">Emerald</Link>
      <span className="rounded-full bg-lime-400 px-4 py-2 text-stone-900">Midnight</span>
    </div>
  );
}

export function PreviewLabsFlow() {
  const [mode, setMode] = useState<"per-lab" | "monthly">("per-lab");
  const [level, setLevel] = useState<(typeof LEVELS)[number]>("All");
  const [topic, setTopic] = useState("All");
  const [sort, setSort] = useState<"price-asc" | "price-desc">("price-asc");

  const topics = useMemo(() => ["All", ...Array.from(new Set(AWS_LABS.flatMap((l) => l.tags)))], []);
  const labs = useMemo(
    () =>
      AWS_LABS.filter((l) => (level === "All" ? true : l.level === level))
        .filter((l) => (topic === "All" ? true : l.tags.includes(topic)))
        .sort((a, b) => (sort === "price-asc" ? priceOf(a) - priceOf(b) : priceOf(b) - priceOf(a))),
    [level, topic, sort],
  );

  const item = (active: boolean) =>
    `w-full rounded-lg px-3 py-2 text-left text-sm font-semibold transition ${
      active ? "bg-lime-400/15 text-lime-300" : "text-stone-400 hover:bg-white/5 hover:text-white"
    }`;

  const sortBtn = (active: boolean) =>
    `rounded-md px-3 py-1.5 text-sm font-semibold transition ${active ? "bg-lime-400/15 text-lime-300" : "text-stone-400 hover:text-white"}`;

  return (
    <div className={`${body.className} min-h-screen bg-stone-950 text-stone-300`}>
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -left-40 -top-40 h-[34rem] w-[34rem] rounded-full bg-lime-500/10 blur-[140px]" />
        <div className="absolute right-0 top-1/3 h-[28rem] w-[28rem] rounded-full bg-emerald-500/10 blur-[140px]" />
      </div>

      {/* Top bar */}
      <header className="sticky top-0 z-40 border-b border-white/10 bg-stone-950/80 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <Link href="/preview2" className={`${display.className} text-lg font-bold tracking-tight text-white`}>
            Shield<span className="text-lime-400">Sync</span>
            <span className="ml-2 text-sm font-medium text-stone-500">/ AWS Labs</span>
          </Link>
          <div className="flex items-center gap-3 text-sm">
            <span className="hidden text-stone-400 sm:inline">labs.shieldsyncsecurity.com</span>
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-lime-400 text-sm font-bold text-stone-900">H</span>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-12">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-lime-400">AWS Security Labs</p>
        <h1 className={`${display.className} mt-3 text-4xl font-bold tracking-tight text-white sm:text-5xl`}>
          Choose how you want to learn.
        </h1>
        <p className="mt-4 max-w-2xl text-lg leading-8 text-stone-400">
          Pay only for the labs you want, or go monthly for full AWS access. SOC labs (SIEM &amp; SOAR) are
          billed separately.
        </p>

        {/* Mode toggle */}
        <div className="mt-8 inline-flex rounded-2xl border border-white/10 bg-white/5 p-1.5">
          {(["per-lab", "monthly"] as const).map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => setMode(m)}
              className={`rounded-xl px-5 py-2.5 text-base font-semibold transition ${
                mode === m ? "bg-lime-400 text-stone-900" : "text-stone-300 hover:text-white"
              }`}
            >
              {m === "per-lab" ? "Pay per lab" : "Monthly — full AWS access"}
            </button>
          ))}
        </div>

        {mode === "per-lab" ? (
          <div className="mt-10 grid gap-8 lg:grid-cols-[230px_1fr]">
            {/* Left sidebar filters */}
            <aside className="lg:sticky lg:top-24 lg:self-start">
              <div className="space-y-6 rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                <div>
                  <p className="mb-2 text-xs font-bold uppercase tracking-wider text-stone-500">Difficulty</p>
                  <div className="space-y-1">
                    {LEVELS.map((l) => (
                      <button key={l} type="button" onClick={() => setLevel(l)} className={item(level === l)}>{l}</button>
                    ))}
                  </div>
                </div>
                <div className="border-t border-white/10 pt-5">
                  <p className="mb-2 text-xs font-bold uppercase tracking-wider text-stone-500">Topic</p>
                  <div className="space-y-1">
                    {topics.map((t) => (
                      <button key={t} type="button" onClick={() => setTopic(t)} className={item(topic === t)}>{t}</button>
                    ))}
                  </div>
                </div>
              </div>
            </aside>

            {/* Catalog */}
            <div>
              <div className="flex flex-wrap items-center justify-between gap-3">
                <p className="text-sm text-stone-500">
                  Showing {labs.length} of {AWS_LABS.length} labs · <span className="text-stone-400">sample pricing</span>
                </p>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-stone-400">Sort by price</span>
                  <div className="inline-flex rounded-lg border border-white/10 bg-white/[0.03] p-0.5">
                    <button type="button" onClick={() => setSort("price-asc")} className={sortBtn(sort === "price-asc")}>Low → High</button>
                    <button type="button" onClick={() => setSort("price-desc")} className={sortBtn(sort === "price-desc")}>High → Low</button>
                  </div>
                </div>
              </div>
              <div className="mt-5 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {labs.map((lab) => {
                  const free = priceOf(lab) === 0;
                  return (
                    <div key={lab.slug} className="group flex h-full flex-col rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition hover:border-lime-400/40 hover:bg-white/[0.05]">
                      <div className="flex items-center gap-2">
                        <span className={`h-2 w-2 rounded-full ${LEVEL_DOT[lab.level]}`} />
                        <span className="text-xs font-bold uppercase tracking-wide text-stone-400">{lab.level}</span>
                        {free ? <span className="ml-auto rounded-full bg-lime-400 px-2.5 py-0.5 text-xs font-bold text-stone-900">FREE</span> : null}
                      </div>
                      <h3 className={`${display.className} mt-4 text-lg font-bold text-white`}>{lab.title}</h3>
                      <p className="mt-2 flex-1 text-sm leading-6 text-stone-400">{lab.desc}</p>
                      <div className="mt-4 flex flex-wrap gap-1.5">
                        {lab.tags.map((t) => (
                          <span key={t} className="rounded-md bg-white/5 px-2 py-0.5 font-mono text-[11px] text-stone-400">{t}</span>
                        ))}
                      </div>
                      <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-4">
                        <span className="text-xl font-bold text-white">{free ? "Free" : `$${priceOf(lab)}`}</span>
                        <span className="rounded-xl bg-lime-400 px-4 py-2 text-sm font-bold text-stone-900 transition group-hover:brightness-110">
                          {free ? "Launch →" : "Buy & launch →"}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        ) : (
          /* Monthly plan */
          <div className="mt-10 grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div className="rounded-3xl border border-lime-400/30 bg-gradient-to-br from-lime-400/10 to-transparent p-8 sm:p-10">
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-lime-400">Monthly · full AWS access</p>
              <div className="mt-4 flex items-end gap-2">
                <span className={`${display.className} text-6xl font-bold text-white`}>$29</span>
                <span className="pb-2 text-lg text-stone-400">/ month</span>
              </div>
              <p className="mt-1 text-sm text-stone-500">sample pricing · cancel within 24h</p>
              <ul className="mt-6 grid gap-3">
                {["Every AWS security lab, unlocked", "New AWS labs included as we add them", "Launch instantly — no setup", "Cancel anytime (24h window)"].map((f) => (
                  <li key={f} className="flex items-center gap-3 text-base text-stone-200">
                    <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-lime-400 text-xs font-bold text-stone-900">✓</span>
                    {f}
                  </li>
                ))}
              </ul>
              <button type="button" className="mt-8 w-full rounded-2xl bg-lime-400 px-6 py-4 text-lg font-bold text-stone-900 transition hover:brightness-110">
                Subscribe & unlock all AWS labs →
              </button>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-8">
              <h3 className={`${display.className} text-xl font-bold text-white`}>What you get</h3>
              <p className="mt-3 text-base leading-7 text-stone-400">
                Full access to the entire AWS Security Labs catalog — {AWS_LABS.length} labs today and growing —
                in managed, isolated AWS environments. Practice as much as you want.
              </p>
              <p className="mt-5 rounded-xl border border-white/10 bg-white/[0.03] p-4 text-sm text-stone-400">
                Looking for SIEM &amp; SOAR? The <span className="font-semibold text-lime-300">SOC labs</span> are a
                separate plan.
              </p>
            </div>
          </div>
        )}
      </main>

      <Switcher />
    </div>
  );
}
