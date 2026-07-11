"use client";

import { useEffect, useMemo, useState } from "react";
import { Container, Card, Button } from "@/components/ui";
import { Check, ArrowRight, Shield, Cloud, Radar } from "@/components/icons";
import { AWS_LABS, AZURE_LABS, AI_LABS, SOC_LABS, SITE } from "@/lib/site";
import { AWS_PRICE, SOC_PRICE, AWS_MONTHLY, SOC_MONTHLY, FREE, awsLabPrice, formatMoney, type Money, type Currency } from "@/lib/region";
import { levelDotClass, toneDotClass, PRODUCT_TONE } from "@/components/status-badge";

const FREE_SLUG = "s3-misconfiguration-audit";
const AI_FREE_SLUG = "bedrock-prompt-injection";
const AZURE_FREE_SLUG = "storage-public-exposure-audit";

type Track = "aws" | "soc" | "ai" | "azure" | "free" | null;
type Mode = "per-lab" | "monthly" | "free" | null;
type Item = { slug: string; title: string; desc: string; tags: string[]; badge: string; dot: string; price: Money; free: boolean };

export function LabsWizard({
  initialTrack,
  initialPlan,
  initialLevel,
}: {
  initialTrack?: "aws" | "soc" | "ai" | "azure" | "free";
  initialPlan?: "per-lab" | "monthly";
  initialLevel?: string;
}) {
  // Deep-links (ads + the "Start here" roadmap) can pre-select a track, plan, and lab level.
  // EVERY track opens inside the wizard the same way — including not-yet-live ones.
  // SOC has no purchasable lab yet, so it lands on its Plan step where the plans
  // render as "coming soon" (no checkout) with a pointer to the live AWS track,
  // instead of being a disabled card stuck on the chooser (owner 2026-07-12:
  // "soc labs wizard should be just like other tracks").
  const safeTrack: Track = initialTrack ?? null;
  // AI/Azure are free-first today and SOC has no live plan, so a pre-set paid
  // plan/level is dropped for them — otherwise picking the track would fast-forward
  // past the Plan step to a plan the user never chose. AWS honours the deep fast-path.
  const startMode: Mode =
    initialTrack === "ai" || initialTrack === "azure" ? "free"
    : initialTrack === "soc" ? null
    : initialLevel ? "per-lab"
    : initialPlan ?? null;
  const startStep = safeTrack ? (initialTrack !== "soc" && (initialLevel || initialPlan) ? 3 : 2) : 1;
  const [step, setStep] = useState(startStep);
  const [track, setTrack] = useState<Track>(safeTrack);
  const [mode, setMode] = useState<Mode>(startMode);
  const [cat, setCat] = useState(initialLevel ?? "All");
  const [selected, setSelected] = useState<string | null>(null);
  const [currency, setCurrency] = useState<Currency>("USD");

  // Currency follows the canonical <html data-region> set pre-paint by the
  // region script in app/layout.tsx (localStorage cache -> TZ -> IP via
  // labs /api/geo), same as PricingTiers — never re-detect here.
  useEffect(() => {
    if (document.documentElement.getAttribute("data-region") === "in") setCurrency("INR");
    const onRegion = (e: Event) => {
      const detail = (e as CustomEvent<{ region: string }>).detail;
      setCurrency(detail?.region === "in" ? "INR" : "USD");
    };
    window.addEventListener("ss:region", onRegion);
    return () => window.removeEventListener("ss:region", onRegion);
  }, []);

  // Manual toggle: write the shared region attributes (and cache) so the choice
  // holds across every priced surface and can't be stomped by a late IP result.
  const pickCurrency = (c: Currency) => {
    setCurrency(c);
    const r = c === "INR" ? "in" : "us";
    document.documentElement.setAttribute("data-region", r);
    document.documentElement.setAttribute("data-region-userset", "1");
    try { localStorage.setItem("ss_region", JSON.stringify({ r, t: Date.now() })); } catch {}
  };

  const money = (m: Money) => formatMoney(m, currency);

  const items: Item[] = useMemo(() => {
    if (track === "soc")
      return SOC_LABS.map((l) => ({
        slug: l.slug, title: l.title, desc: l.desc, tags: l.tags,
        badge: l.product, dot: toneDotClass(PRODUCT_TONE[l.product] ?? "emerald"),
        price: SOC_PRICE, free: false,
      }));
    if (track === "ai")
      return AI_LABS.map((l) => ({
        slug: l.slug, title: l.title, desc: l.desc, tags: l.tags,
        badge: l.level, dot: levelDotClass(l.level),
        price: FREE, free: true,
      }));
    if (track === "azure")
      return AZURE_LABS.map((l) => ({
        slug: l.slug, title: l.title, desc: l.desc, tags: l.tags,
        badge: l.level, dot: levelDotClass(l.level),
        price: l.slug === AZURE_FREE_SLUG ? FREE : awsLabPrice(l.slug, l.level), free: l.slug === AZURE_FREE_SLUG,
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

  const trackName = track === "soc" ? "Security Operations" : track === "ai" ? "AI Security" : track === "azure" ? "Azure Cloud Security" : "AWS Cloud Security";
  const accessLabel = track === "soc" ? "full SOC access" : track === "azure" ? "full Azure access" : "full AWS access";
  const monthly = track === "soc" ? SOC_MONTHLY : AWS_MONTHLY;
  const fromPrice = track === "soc" ? SOC_PRICE : AWS_PRICE.Beginner;
  const total: Money = mode === "monthly" ? monthly : lab ? lab.price : FREE;

  // Where "Launch your lab" actually sends them. The platform deep-links each AWS
  // lab at /labs/<slug> (slugs match this catalog). Paid labs carry `?intent=launch`
  // to auto-launch right after sign-in (they've committed at checkout); the FREE lab
  // deliberately omits it so the learner clicks "Launch lab" themselves (a free seat
  // is scarce — don't provision one before they're ready). SOC labs aren't on the
  // platform yet, and monthly has no single lab — both fall back to the catalog root.
  const launchHref =
    mode === "free"
      ? `${SITE.labsUrl}/labs/${track === "azure" ? AZURE_FREE_SLUG : track === "ai" ? AI_FREE_SLUG : FREE_SLUG}`
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

  // ?track=free-security-labs — a direct free-labs view instead of the stepper:
  // both live free labs, one click from launch. No prices, no plans.
  if (track === "free") {
    return (
      <section className="py-6 sm:py-8">
        <Container>
          <div className="mx-auto max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-bright">Free security labs</p>
            <h1 className="mt-1 text-2xl font-bold tracking-tight text-fg sm:text-3xl">Start with a free lab</h1>
            <p className="mt-2 text-base text-muted">
              Real, isolated cloud accounts — no card, auto-graded, auto-wiped. Sign in and click Launch.
            </p>
            <div className="mt-6 grid gap-4">
              {[
                { title: "AWS Security — S3 misconfiguration audit", desc: "Find the public S3 bucket, fix over-broad IAM, enforce KMS.", meta: "AWS · Beginner · 30 min", href: `${SITE.labsUrl}/labs/${FREE_SLUG}` },
                { title: "AI Security — secure a Bedrock assistant", desc: "Prompt-inject a live LLM assistant, then lock it down with Guardrails, least-privilege, and logging.", meta: "AI · Beginner · ~35 min", href: `${SITE.labsUrl}/labs/${AI_FREE_SLUG}` },
                { title: "Azure Security — Storage public exposure", desc: "Find the public blob container, kill anonymous access, require HTTPS, and disable account-key auth.", meta: "Azure · Beginner · 30 min", href: `${SITE.labsUrl}/labs/${AZURE_FREE_SLUG}` },
              ].map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  className="flex flex-col rounded-2xl border border-line bg-panel p-5 transition hover:border-brand sm:flex-row sm:items-center sm:justify-between sm:gap-6"
                >
                  <div>
                    <p className="font-mono text-[11px] font-semibold uppercase tracking-wide text-muted">{l.meta}</p>
                    <h2 className="mt-1 text-base font-bold text-fg">{l.title}</h2>
                    <p className="mt-1 text-sm leading-6 text-muted">{l.desc}</p>
                  </div>
                  <span className="mt-3 inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-brand-bright sm:mt-0">
                    Start free <ArrowRight className="h-4 w-4" />
                  </span>
                </a>
              ))}
            </div>
            <p className="mt-4 text-sm text-muted">
              Real, isolated cloud accounts — auto-graded, auto-wiped. Nothing to install.
            </p>
          </div>
        </Container>
      </section>
    );
  }

  // ?track=soc-labs opens the SOC track inside the wizard exactly like the others
  // (Track ✓ -> Plan). Its plans render as "coming soon" (no checkout) with a pointer
  // to the live AWS track, so it can't drop into a nonexistent SOC purchase funnel.

  return (
    <section className="py-3 sm:py-4">
      <Container>
        {/* Step 1 (track chooser) gets a wider shell so the 4 track cards sit in a
            single row on desktop; the other steps stay at the tighter max-w-4xl. */}
        <div className={`mx-auto ${step === 1 ? "max-w-6xl" : "max-w-4xl"}`}>
          {/* Page-level H1 — the stepper below had no heading at all (SEO gap:
              this route is priority 0.9 in the sitemap). Kept compact/restrained
              per the site's typography rules, not a big banner. */}
          <h1 className="sr-only">Start your {trackName} lab</h1>

          {/* Currency toggle */}
          <div className="mb-2 flex items-center justify-end gap-3">
            <span className="text-xs text-muted">Prices shown for your region</span>
            <div className="inline-flex rounded-lg border border-line bg-panel p-0.5 text-sm font-semibold">
              <button type="button" onClick={() => pickCurrency("INR")} className={curBtn(currency === "INR")}>₹ INR</button>
              <button type="button" onClick={() => pickCurrency("USD")} className={curBtn(currency === "USD")}>$ USD</button>
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

          <div className="mt-4">
            {/* STEP 1 — choose track */}
            {step === 1 ? (
              <div>
                <h1 className="text-2xl font-bold tracking-tight text-fg sm:text-3xl">Which track?</h1>
                <p className="mt-2 text-base text-muted">Start with the skills you want to build.</p>
                <div className="mt-3 flex flex-wrap gap-2 text-xs font-semibold text-muted">
                  <span className="rounded-full border border-line bg-surface px-3 py-1">Real AWS console</span>
                  <span className="rounded-full border border-line bg-surface px-3 py-1">Launches in your browser</span>
                  <span className="rounded-full border border-line bg-surface px-3 py-1">Auto-cleanup when you&apos;re done</span>
                </div>
                <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  {/* Track cards share one design in flagship order (AI, AWS, Azure,
                      SOC); not-yet-live tracks render the same card disabled with a
                      Coming-soon tag — every track gets the wizard treatment as it
                      ships. */}
                  {[
                    { id: "ai", key: "ai" as const, icon: Shield, title: "AI Security", desc: "Secure Bedrock assistants, LLM apps & agents. Free lab live now.", tag: "Flagship", soon: false },
                    { id: "aws", key: "aws" as const, icon: Cloud, title: "Cloud Security — AWS", desc: "Master cloud security in real AWS environments. Our deepest catalog.", tag: "", soon: false },
                    { id: "azure", key: "azure" as const, icon: Cloud, title: "Cloud Security — Azure", desc: "Storage exposure & misconfiguration in real Azure. Free lab live now.", tag: "", soon: false },
                    { id: "soc", key: "soc" as const, icon: Radar, title: "Security Operations — SIEM & SOAR", desc: "Detection & response across SIEM and SOAR.", tag: "", soon: true },
                  ].map((o) => {
                    const Icon = o.icon;
                    return (
                      <button
                        key={o.id}
                        type="button"
                        onClick={() => chooseTrack(o.key)}
                        className={`rounded-2xl border p-5 text-left transition ${
                          track === o.key
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
                        <p className="mt-1.5 text-sm leading-6 text-muted">{o.desc}{o.soon ? " Launching soon — the AWS track is live today." : ""}</p>
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
                <h1 className="mt-1 text-2xl font-bold tracking-tight text-fg sm:text-3xl">How do you want to learn?</h1>
                <p className="mt-1 text-sm text-muted">Pick what fits — you can change this anytime.</p>
                <div className={`mt-4 grid gap-4 ${track === "aws" || track === "ai" || track === "azure" ? "sm:grid-cols-3" : "sm:grid-cols-2"}`}>
                  {/* FREE — a first-class card alongside the paid plans (AWS + AI
                      tracks). Same select-then-Continue behaviour as the paid cards:
                      clicking sets mode="free"; Continue navigates to the free lab. */}
                  {track === "aws" || track === "ai" || track === "azure" ? (
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
                        {(track === "ai"
                          ? ["Secure a live Bedrock assistant", "Real, isolated AWS account", "No card needed"]
                          : track === "azure"
                          ? ["Find & fix a public storage account", "Real, isolated Azure resource group", "No card needed"]
                          : ["Your first beginner lab", "Real, isolated AWS account", "No card needed"]
                        ).map((p) => (
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

                  {/* AI paid plans don't exist yet — render the SAME 3-box layout as
                      AWS (owner: the 3-box plan step is the design), with the two
                      paid cards disabled Coming-soon until AI labs ship. */}
                  {track === "ai"
                    ? [
                        {
                          title: "Pay per lab",
                          pts: ["Buy only the AI labs you want", "One-time payment", "Agents, RAG pipelines, guardrail bypasses"],
                        },
                        {
                          title: "Monthly — full AI access",
                          pts: ["Every AI lab unlocked", "New labs included", "Cancel anytime"],
                        },
                      ].map((o) => (
                        <div key={o.title} className="flex cursor-not-allowed flex-col rounded-2xl border border-line bg-panel p-5 opacity-60">
                          <div className="flex items-start justify-between gap-3">
                            <h3 className="text-base font-bold text-fg">{o.title}</h3>
                            <span className="shrink-0 rounded-full bg-amber-500/15 px-2.5 py-0.5 text-[11px] font-bold text-amber-600">Coming soon</span>
                          </div>
                          <ul className="mt-3 space-y-1.5">
                            {o.pts.map((p) => (
                              <li key={p} className="flex items-center gap-2 text-sm text-muted">
                                <Check className="h-3.5 w-3.5 shrink-0 text-brand" /> {p}
                              </li>
                            ))}
                          </ul>
                          <span className="mt-auto pt-4 text-sm font-semibold text-muted">Launching soon</span>
                        </div>
                      ))
                    : null}

                  {/* SOC labs aren't live yet — same 3-box treatment as the AI track:
                      render the plan cards disabled Coming-soon so the SOC track opens
                      inside the wizard like every other track, but no one can buy a lab
                      that doesn't exist. A note below points at the live AWS track. */}
                  {track === "soc"
                    ? [
                        {
                          title: "Pay per lab",
                          pts: ["Buy only the SOC labs you want", "One-time payment", "SIEM detections + SOAR playbooks"],
                        },
                        {
                          title: "Monthly — full SOC access",
                          pts: ["Every SOC lab unlocked", "New labs included", "Cancel anytime"],
                        },
                      ].map((o) => (
                        <div key={o.title} className="flex cursor-not-allowed flex-col rounded-2xl border border-line bg-panel p-5 opacity-60">
                          <div className="flex items-start justify-between gap-3">
                            <h3 className="text-base font-bold text-fg">{o.title}</h3>
                            <span className="shrink-0 rounded-full bg-amber-500/15 px-2.5 py-0.5 text-[11px] font-bold text-amber-600">Coming soon</span>
                          </div>
                          <ul className="mt-3 space-y-1.5">
                            {o.pts.map((p) => (
                              <li key={p} className="flex items-center gap-2 text-sm text-muted">
                                <Check className="h-3.5 w-3.5 shrink-0 text-brand" /> {p}
                              </li>
                            ))}
                          </ul>
                          <span className="mt-auto pt-4 text-sm font-semibold text-muted">Launching soon</span>
                        </div>
                      ))
                    : null}

                  {(track === "aws" || track === "azure" ? [
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
                      pts: [`Every ${track === "azure" ? "Azure" : "AWS"} lab unlocked`, "New labs included", "Cancel anytime"],
                      cta: "Get started →",
                    },
                  ] : []).map((o) => (
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

                {track === "soc" ? (
                  <div className="mt-4 flex flex-col items-start gap-3 rounded-2xl border border-line bg-panel p-5 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-sm text-muted">
                      SOC labs (SIEM &amp; SOAR) are launching soon — nothing to pay until they&apos;re live.
                      Want a heads-up? <a href="/contact" className="font-semibold text-brand-bright hover:underline">Tell us to notify you</a>.
                    </p>
                    <button
                      type="button"
                      onClick={() => chooseTrack("aws")}
                      className="inline-flex shrink-0 items-center gap-1.5 rounded-xl border border-brand/30 bg-brand/10 px-4 py-2 text-sm font-semibold text-brand-bright transition hover:bg-brand/15"
                    >
                      Explore the AWS track <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                ) : null}
              </div>
            ) : null}

            {/* STEP 3 — pick a lab / review plan */}
            {step === 3 && mode === "per-lab" ? (
              <div>
                <h1 className="text-2xl font-bold tracking-tight text-fg sm:text-3xl">Pick your lab</h1>
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
                {filtered.length === 0 ? (
                  <p className="mt-6 rounded-2xl border border-line bg-panel p-6 text-base text-muted">
                    More paid labs are coming to this track. For now, start with the free lab (Back → Free), or choose Monthly for full access as they ship.
                  </p>
                ) : null}
                <div className="mt-4 grid gap-4 sm:grid-cols-2">
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
                <h1 className="text-2xl font-bold tracking-tight text-fg sm:text-3xl">Your plan</h1>
                <p className="mt-3 text-lg text-muted">Full access to every {track === "soc" ? "SOC" : track === "azure" ? "Azure" : "AWS"} lab.</p>
                <Card hover={false} className="mt-6 border-brand/30 bg-gradient-to-br from-brand/[0.08] to-transparent p-8">
                  <div className="flex items-end gap-2">
                    <span className="text-5xl font-extrabold text-fg">{money(monthly)}</span>
                    <span className="pb-1.5 text-lg text-muted">/ month</span>
                  </div>
                  <ul className="mt-6 grid gap-3">
                    {[`Every ${track === "soc" ? "SOC (SIEM + SOAR)" : track === "azure" ? "Azure security" : "AWS security"} lab, unlocked`, "New labs included as we add them", "Launch instantly — no setup", "Cancel anytime — access runs to the end of the paid cycle"].map((f) => (
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
                <h1 className="text-2xl font-bold tracking-tight text-fg sm:text-3xl">Review your order</h1>
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
                <h1 className="mt-6 text-2xl font-bold tracking-tight text-fg sm:text-3xl">
                  {total.usd === 0 ? "One step left — sign in to launch" : mode === "monthly" ? "You're almost set" : "One step left — sign in & pay"}
                </h1>
                <p className="mx-auto mt-3 max-w-md text-lg text-muted">
                  {mode === "monthly"
                    ? `Sign in on ShieldSync Labs to start your subscription — every ${track === "soc" ? "SOC" : track === "azure" ? "Azure" : "AWS"} lab unlocks instantly.`
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
            <div className="mt-4 flex items-center justify-between border-t border-line pt-3">
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
