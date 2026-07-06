"use client";

import { useEffect, useMemo, useState } from "react";
import { Container, Card, Button } from "@/components/ui";
import { Check, ArrowRight, Shield, Cloud, Radar } from "@/components/icons";
import { AWS_LABS, SOC_LABS, SITE } from "@/lib/site";
import { AWS_PRICE, SOC_PRICE, AWS_MONTHLY, SOC_MONTHLY, FREE, awsLabPrice, formatMoney, type Money, type Currency } from "@/lib/region";
import { levelDotClass, toneDotClass, PRODUCT_TONE } from "@/components/status-badge";

const FREE_SLUG = "s3-misconfiguration-audit";

type Track = "aws" | "soc" | null;
type Mode = "per-lab" | "monthly" | "free" | null;
type Item = { slug: string; title: string; desc: string; tags: string[]; badge: string; dot: string; price: Money; free: boolean };

export function LabsWizard({
  initialCurrency = "USD",
  serverDetected = false,
  initialTrack,
  initialPlan,
  initialLevel,
}: {
  initialCurrency?: Currency;
  serverDetected?: boolean;
  initialTrack?: "aws" | "soc";
  initialPlan?: "per-lab" | "monthly";
  initialLevel?: string;
}) {
  // Deep-links (ads + the "Start here" roadmap) can pre-select a track, plan, and lab level.
  // SOC (SIEM/SOAR) labs are in development — ignore a ?track=soc deep-link so it
  // can't enter the not-yet-built SOC funnel; land on track selection instead.
  const safeTrack: Track = initialTrack === "soc" ? null : (initialTrack ?? null);
  // If the requested track was blocked (soc, in development), drop any pre-set
  // plan/level intent too — otherwise picking "aws" on step 1 silently fast-forwards
  // past the Plan step to a plan the user never chose for the AWS track.
  const startMode: Mode = initialTrack === "soc" ? null : initialLevel ? "per-lab" : initialPlan ?? null;
  const startStep = safeTrack ? (initialLevel || initialPlan ? 3 : 2) : 1;
  const [step, setStep] = useState(startStep);
  const [track, setTrack] = useState<Track>(safeTrack);
  const [mode, setMode] = useState<Mode>(startMode);
  const [cat, setCat] = useState(initialLevel ?? "All");
  const [selected, setSelected] = useState<string | null>(null);
  const [currency, setCurrency] = useState<Currency>(initialCurrency);

  // The edge proxy resolves region from the CDN geo header in production.
  // If it couldn't (e.g. local dev with no header), fall back to the browser timezone.
  useEffect(() => {
    if (serverDetected) return;
    try {
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || "";
      if (/Kolkata|Calcutta/i.test(tz)) setCurrency("INR");
    } catch {
      /* ignore */
    }
  }, [serverDetected]);

  const money = (m: Money) => formatMoney(m, currency);

  const items: Item[] = useMemo(() => {
    if (track === "soc")
      return SOC_LABS.map((l) => ({
        slug: l.slug, title: l.title, desc: l.desc, tags: l.tags,
        badge: l.product, dot: toneDotClass(PRODUCT_TONE[l.product] ?? "emerald"),
        price: SOC_PRICE, free: false,
      }));
    return AWS_LABS.map((l) => ({
      slug: l.slug, title: l.title, desc: l.desc, tags: l.tags,
      badge: l.level, dot: levelDotClass(l.level),
      price: l.slug === FREE_SLUG ? FREE : awsLabPrice(l.slug, l.level), free: l.slug === FREE_SLUG,
    }));
  }, [track]);

  // The "Pick a lab" step renders only in the pay-per-lab plan, so it must NOT
  // list the FREE lab — that's its own separate card back on the Plan step.
  // Showing it here made users think the paid flow had dumped them on the free
  // lab. Exclude free labs from the picker AND from its category chips.
  const pickable = useMemo(() => items.filter((i) => !i.free), [items]);
  const cats = useMemo(() => ["All", ...Array.from(new Set(pickable.map((i) => i.badge)))], [pickable]);
  const filtered = useMemo(() => (cat === "All" ? pickable : pickable.filter((i) => i.badge === cat)), [pickable, cat]);
  const lab = useMemo(() => items.find((i) => i.slug === selected) ?? null, [items, selected]);

  const trackName = track === "soc" ? "Security Operations" : "AWS Cloud Security";
  const accessLabel = track === "soc" ? "full SOC access" : "full AWS access";
  const monthly = track === "soc" ? SOC_MONTHLY : AWS_MONTHLY;
  const fromPrice = track === "soc" ? SOC_PRICE : AWS_PRICE.Beginner;
  const total: Money = mode === "monthly" ? monthly : lab ? lab.price : FREE;

  // Where "Launch your lab" actually sends them. The platform deep-links each AWS
  // lab at /labs/<slug> (slugs match this catalog). `?intent=launch` tells the lab
  // page to auto-launch right after sign-in (no extra click). SOC labs aren't on the
  // platform yet, and monthly has no single lab — both fall back to the catalog root.
  const launchHref =
    mode === "free"
      ? `${SITE.labsUrl}/labs/${FREE_SLUG}?intent=launch`
      : mode !== "monthly" && track === "aws" && selected
      ? `${SITE.labsUrl}/labs/${selected}?intent=launch`
      : mode === "monthly"
      ? `${SITE.labsUrl}?checkout=monthly`
      : SITE.labsUrl;

  const labels = ["Track", "Plan", mode === "monthly" ? "Review" : "Pick a lab", "Confirm", "Launch"];
  const canContinue = step === 1 ? track !== null : step === 2 ? mode !== null : step === 3 ? mode === "monthly" || selected !== null : true;

  const curBtn = (active: boolean) => `rounded-md px-3 py-1.5 transition ${active ? "bg-brand/10 text-brand-bright" : "text-muted hover:text-fg"}`;

  function chooseTrack(t: Track) {
    setTrack(t);
    setSelected(null);
    setCat("All");
  }
  function reset() {
    setStep(1);
    setTrack(null);
    setMode(null);
    setSelected(null);
    setCat("All");
  }

  return (
    <section className="py-4 sm:py-6">
      <Container>
        <div className="mx-auto max-w-4xl">
          {/* Currency toggle */}
          <div className="mb-3 flex items-center justify-end gap-3">
            <span className="text-xs text-muted">Prices shown for your region</span>
            <div className="inline-flex rounded-lg border border-line bg-panel p-0.5 text-sm font-semibold">
              <button type="button" onClick={() => setCurrency("INR")} className={curBtn(currency === "INR")}>₹ INR</button>
              <button type="button" onClick={() => setCurrency("USD")} className={curBtn(currency === "USD")}>$ USD</button>
            </div>
          </div>

          {/* Stepper */}
          <ol className="flex items-center gap-2">
            {labels.map((l, i) => {
              const n = i + 1;
              const done = n < step;
              const active = n === step;
              return (
                <li key={l} aria-current={active ? "step" : undefined} className="flex flex-1 items-center gap-2">
                  <span className="sr-only">Step {n} of {labels.length}: {l}{active ? " (current)" : done ? " (completed)" : ""}</span>
                  <span
                    aria-hidden
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold transition ${
                      done ? "bg-brand text-white" : active ? "bg-gradient-to-r from-brand to-cyan text-white" : "bg-surface text-muted"
                    }`}
                  >
                    {done ? <Check className="h-4 w-4" /> : n}
                  </span>
                  <span aria-hidden className={`hidden text-sm font-semibold sm:inline ${active || done ? "text-fg" : "text-muted"}`}>{l}</span>
                  {n < labels.length ? <span className={`h-px flex-1 ${done ? "bg-brand" : "bg-line"}`} /> : null}
                </li>
              );
            })}
          </ol>

          <div className="mt-5">
            {/* STEP 1 — choose track */}
            {step === 1 ? (
              <div>
                <h1 className="text-2xl font-extrabold tracking-tight text-fg sm:text-3xl">Which track?</h1>
                <p className="mt-2 text-base text-muted">Start with the skills you want to build.</p>
                <div className="mt-3 flex flex-wrap gap-2 text-xs font-semibold text-muted">
                  <span className="rounded-full border border-line bg-surface px-3 py-1">Real AWS console</span>
                  <span className="rounded-full border border-line bg-surface px-3 py-1">Launches in your browser</span>
                  <span className="rounded-full border border-line bg-surface px-3 py-1">Auto-cleanup when you&apos;re done</span>
                </div>
                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  {[
                    { key: "aws" as const, icon: Cloud, title: "Cloud Security — AWS", desc: "Master cloud security in real AWS environments. Our flagship track.", tag: "Flagship", soon: false },
                    { key: "soc" as const, icon: Radar, title: "Security Operations — SIEM & SOAR", desc: "Detection & response across SIEM and SOAR.", tag: "", soon: true },
                  ].map((o) => {
                    const Icon = o.icon;
                    return (
                      <button
                        key={o.key}
                        type="button"
                        disabled={o.soon}
                        aria-disabled={o.soon}
                        onClick={() => { if (!o.soon) chooseTrack(o.key); }}
                        className={`rounded-2xl border p-5 text-left transition ${
                          o.soon
                            ? "cursor-not-allowed border-line bg-panel opacity-60"
                            : track === o.key
                            ? "border-brand bg-brand/[0.05] ring-2 ring-brand/40"
                            : "border-line bg-panel hover:border-line-strong"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-brand/25 bg-brand/10 text-brand-bright">
                            <Icon className="h-6 w-6" />
                          </span>
                          {o.soon ? (
                            <span className="rounded-full bg-amber-500/15 px-2.5 py-0.5 text-xs font-bold text-amber-600">Coming soon</span>
                          ) : o.tag ? (
                            <span className="rounded-full bg-brand/10 px-2.5 py-0.5 text-xs font-bold text-brand-bright">★ {o.tag}</span>
                          ) : null}
                        </div>
                        <h3 className="mt-4 text-lg font-bold text-fg">{o.title}</h3>
                        <p className="mt-1.5 text-sm leading-6 text-muted">{o.desc}{o.soon ? " — in development; the AWS track is live now." : ""}</p>
                      </button>
                    );
                  })}
                </div>
              </div>
            ) : null}

            {/* STEP 2 — choose plan. The FREE lab is a first-class, DISTINCT green
                card that launches the free lab straight away (a real navigation to
                the labs app — so it's obvious you've moved), instead of being buried
                as a footnote inside "Pay per lab". */}
            {step === 2 ? (
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-bright">{trackName}</p>
                <h1 className="mt-1 text-2xl font-extrabold tracking-tight text-fg sm:text-3xl">How do you want to learn?</h1>
                <p className="mt-1 text-sm text-muted">Pick what fits — you can change this anytime.</p>
                <div className={`mt-5 grid gap-4 ${track === "aws" ? "sm:grid-cols-3" : "sm:grid-cols-2"}`}>
                  {/* FREE — third box ALONGSIDE the paid plans (AWS track only).
                      Same select-then-Continue behaviour as the paid cards: clicking
                      sets mode="free"; Continue navigates to the free lab launch URL. */}
                  {track === "aws" ? (
                    <button
                      type="button"
                      onClick={() => setMode("free")}
                      className={`flex flex-col rounded-2xl border p-5 text-left transition ${
                        mode === "free" ? "border-brand bg-brand/[0.05] ring-2 ring-brand/40" : "border-line bg-panel hover:border-line-strong"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <h3 className="text-base font-bold text-fg">Free lab</h3>
                        <span className="shrink-0 rounded-full bg-emerald-100 px-2 py-0.5 text-[11px] font-bold text-emerald-700">FREE</span>
                      </div>
                      <ul className="mt-3 space-y-1.5">
                        {["Your first beginner lab", "Real, isolated AWS account", "No card needed"].map((p) => (
                          <li key={p} className="flex items-center gap-2 text-sm text-muted">
                            <Check className="h-3.5 w-3.5 shrink-0 text-brand" /> {p}
                          </li>
                        ))}
                      </ul>
                      <span className="mt-auto pt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-bright">
                        Launch now <ArrowRight className="h-3.5 w-3.5" />
                      </span>
                    </button>
                  ) : null}

                  {[
                    {
                      key: "per-lab" as const,
                      title: "Pay per lab",
                      price: `From ${money(fromPrice)}`,
                      badge: "",
                      pts: ["Buy only the labs you want", "One-time payment", "Great for targeted practice"],
                      cta: "Pick a lab →",
                    },
                    {
                      key: "monthly" as const,
                      title: `Monthly — ${accessLabel}`,
                      price: `${money(monthly)}/mo`,
                      badge: "Best value",
                      pts: [`Every ${track === "soc" ? "SOC" : "AWS"} lab unlocked`, "New labs included", "Cancel anytime"],
                      cta: "Get started →",
                    },
                  ].map((o) => (
                    <button
                      key={o.key}
                      type="button"
                      onClick={() => setMode(o.key)}
                      className={`relative flex flex-col rounded-2xl border p-5 text-left transition ${
                        mode === o.key ? "border-brand bg-brand/[0.05] ring-2 ring-brand/40" : "border-line bg-panel hover:border-line-strong"
                      }`}
                    >
                      {o.badge ? (
                        <span className="absolute -top-3 right-5 rounded-full bg-gradient-to-r from-brand to-cyan px-3 py-0.5 text-[11px] font-bold text-white shadow-sm">
                          {o.badge}
                        </span>
                      ) : null}
                      <div className="flex items-start justify-between gap-3">
                        <h3 className="text-base font-bold text-fg">{o.title}</h3>
                        <span className="shrink-0 text-sm font-bold text-brand-bright">{o.price}</span>
                      </div>
                      <ul className="mt-3 space-y-1.5">
                        {o.pts.map((p) => (
                          <li key={p} className="flex items-center gap-2 text-sm text-muted">
                            <Check className="h-3.5 w-3.5 shrink-0 text-brand" /> {p}
                          </li>
                        ))}
                      </ul>
                      <span className="mt-auto pt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-bright">
                        {o.cta}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            ) : null}

            {/* STEP 3 — pick a lab / review plan */}
            {step === 3 && mode === "per-lab" ? (
              <div>
                <h1 className="text-3xl font-extrabold tracking-tight text-fg sm:text-4xl">Pick your lab</h1>
                <p className="mt-3 text-lg text-muted">Choose one to start — you can buy more later.</p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {cats.map((c) => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => setCat(c)}
                      className={`rounded-lg border px-3 py-1.5 text-sm font-semibold transition ${
                        cat === c ? "border-brand bg-brand/10 text-brand-bright" : "border-line text-muted hover:text-fg"
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  {filtered.map((l) => {
                    const sel = selected === l.slug;
                    return (
                      <button
                        key={l.slug}
                        type="button"
                        onClick={() => setSelected(l.slug)}
                        className={`flex flex-col rounded-2xl border p-5 text-left transition ${
                          sel ? "border-brand bg-brand/[0.05] ring-2 ring-brand/40" : "border-line bg-panel hover:border-line-strong"
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span className={`h-2 w-2 rounded-full ${l.dot}`} />
                          <span className="text-xs font-bold uppercase tracking-wide text-muted">{l.badge}</span>
                          <span className="ml-auto flex items-center gap-2">
                            {l.free ? <span className="rounded-full bg-brand/10 px-2 py-0.5 text-xs font-bold text-brand-bright">FREE</span> : null}
                            <span className="text-base font-bold text-fg">{money(l.price)}</span>
                            {sel ? <Check className="h-4 w-4 text-brand" /> : null}
                          </span>
                        </div>
                        <h3 className="mt-3 font-bold text-fg">{l.title}</h3>
                        <p className="mt-1 text-sm leading-6 text-muted">{l.desc}</p>
                      </button>
                    );
                  })}
                </div>
              </div>
            ) : null}

            {step === 3 && mode === "monthly" ? (
              <div>
                <h1 className="text-3xl font-extrabold tracking-tight text-fg sm:text-4xl">Your plan</h1>
                <p className="mt-3 text-lg text-muted">Full access to every {track === "soc" ? "SOC" : "AWS"} lab.</p>
                <Card hover={false} className="mt-6 border-brand/30 bg-gradient-to-br from-brand/[0.08] to-transparent p-8">
                  <div className="flex items-end gap-2">
                    <span className="text-5xl font-extrabold text-fg">{money(monthly)}</span>
                    <span className="pb-1.5 text-lg text-muted">/ month</span>
                  </div>
                  <ul className="mt-6 grid gap-3">
                    {[`Every ${track === "soc" ? "SOC (SIEM + SOAR)" : "AWS security"} lab, unlocked`, "New labs included as we add them", "Launch instantly — no setup", "Cancel anytime — access runs to the end of the paid cycle"].map((f) => (
                      <li key={f} className="flex items-center gap-3 text-base text-fg/90">
                        <Check className="h-4 w-4 shrink-0 text-brand" /> {f}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-5 text-sm text-muted">{track === "soc" ? "AWS cloud security is a separate track." : "SOC labs (SIEM & SOAR) are a separate plan."}</p>
                </Card>
              </div>
            ) : null}

            {/* STEP 4 — review order (sign-in, payment & launch all happen on the labs platform) */}
            {step === 4 ? (
              <div>
                <h1 className="text-3xl font-extrabold tracking-tight text-fg sm:text-4xl">Review your order</h1>
                <p className="mt-3 text-lg text-muted">
                  {total.usd === 0
                    ? "No payment needed — you'll sign in on ShieldSync Labs and launch."
                    : mode === "monthly"
                    ? "You'll sign in and start your subscription securely on ShieldSync Labs."
                    : "You'll sign in and complete the one-time payment securely on ShieldSync Labs."}
                </p>
                <Card hover={false} className="mt-6 max-w-lg p-6">
                  <h3 className="text-base font-bold uppercase tracking-wide text-muted">Order summary</h3>
                  <p className="mt-2 text-xs font-semibold uppercase tracking-wide text-brand-bright">{trackName}</p>
                  <div className="mt-3 flex items-start justify-between gap-4 border-b border-line pb-4">
                    <span className="text-base text-fg">{mode === "monthly" ? `Monthly — ${accessLabel}` : lab?.title}</span>
                    <span className="shrink-0 font-bold text-fg">{mode === "monthly" ? `${money(monthly)}/mo` : money(total)}</span>
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-lg font-bold text-fg">{mode === "monthly" ? "Billed monthly" : "Total"}</span>
                    <span className="text-2xl font-extrabold text-fg">{mode === "monthly" ? `${money(monthly)}/mo` : money(total)}</span>
                  </div>
                  <p className="mt-5 flex items-start gap-2 text-sm text-muted">
                    <Shield className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                    <span>{`Secure sign-in & checkout on ShieldSync Labs.${currency === "INR" ? " UPI & cards supported in India." : ""}`}</span>
                  </p>
                </Card>
              </div>
            ) : null}

            {/* STEP 5 — done */}
            {step === 5 ? (
              <div className="text-center">
                <span className="mx-auto inline-flex h-16 w-16 items-center justify-center rounded-full bg-brand/10 text-brand">
                  <Check className="h-8 w-8" />
                </span>
                <h1 className="mt-6 text-3xl font-extrabold tracking-tight text-fg sm:text-4xl">
                  {total.usd === 0 ? "One step left — sign in to launch" : mode === "monthly" ? "You're almost set" : "One step left — sign in & pay"}
                </h1>
                <p className="mx-auto mt-3 max-w-md text-lg text-muted">
                  {mode === "monthly"
                    ? `Sign in on ShieldSync Labs to start your subscription — every ${track === "soc" ? "SOC" : "AWS"} lab unlocks instantly.`
                    : total.usd === 0
                    ? `A quick Google sign-in on ShieldSync Labs, then "${lab?.title}" spins up automatically in your own isolated AWS account.`
                    : `Sign in on ShieldSync Labs, complete the one-time payment, and "${lab?.title}" launches automatically in your own isolated AWS account.`}
                </p>
                <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                  <Button href={launchHref} external>
                    {mode === "monthly" ? "Continue to subscribe" : total.usd === 0 ? "Sign in & start the free lab" : "Continue to checkout"}
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                  <button type="button" onClick={reset} className="text-base font-semibold text-brand-bright">
                    Start over
                  </button>
                </div>
                <p className="mx-auto mt-8 max-w-md rounded-xl border border-line bg-surface px-5 py-3 text-sm text-muted">
                  💜 Refer a friend — you both get a <span className="font-bold text-brand-bright">free lab</span>.
                </p>
              </div>
            ) : null}
          </div>

          {/* Nav */}
          {step < 5 ? (
            <div className="mt-5 flex items-center justify-between border-t border-line pt-3">
              <button
                type="button"
                onClick={() => setStep((s) => (s === 4 && mode === "monthly" ? 2 : Math.max(1, s - 1)))}
                disabled={step === 1}
                className={`text-base font-semibold transition ${step === 1 ? "cursor-not-allowed text-muted/40" : "text-muted hover:text-fg"}`}
              >
                ← Back
              </button>
              {step === 4 && mode === "monthly" ? (
                <a
                  href={launchHref}
                  className="inline-flex items-center gap-2 rounded-xl px-6 py-3 text-base font-bold glow-brand bg-gradient-to-r from-brand to-cyan text-white hover:brightness-110 transition"
                >
                  Continue to payment
                  <ArrowRight className="h-4 w-4" />
                </a>
              ) : step === 2 && mode === "free" ? (
                <a
                  href={launchHref}
                  className="inline-flex items-center gap-2 rounded-xl px-6 py-3 text-base font-bold glow-brand bg-gradient-to-r from-brand to-cyan text-white hover:brightness-110 transition"
                >
                  Start free lab
                  <ArrowRight className="h-4 w-4" />
                </a>
              ) : (
                <button
                  type="button"
                  onClick={() =>
                    setStep((s) =>
                      // Arrived with a plan pre-chosen (deep-link) but no track yet:
                      // once the track is picked on step 1, skip the Plan step — the
                      // plan is already decided. Otherwise monthly jumps Plan -> Confirm.
                      s === 1 && mode ? 3 : s === 2 && mode === "monthly" ? 4 : s + 1,
                    )
                  }
                  disabled={!canContinue}
                  className={`inline-flex items-center gap-2 rounded-xl px-6 py-3 text-base font-bold transition ${
                    canContinue ? "glow-brand bg-gradient-to-r from-brand to-cyan text-white hover:brightness-110" : "cursor-not-allowed bg-surface text-muted"
                  }`}
                >
                  Continue
                  <ArrowRight className="h-4 w-4" />
                </button>
              )}
            </div>
          ) : null}
        </div>
      </Container>
    </section>
  );
}
