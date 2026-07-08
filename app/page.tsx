import type { Metadata } from "next";
import Link from "next/link";
import { Container, Button, SectionHeading, Card } from "@/components/ui";
import { Reveal } from "@/components/reveal";
import { LabWorkspacePreview } from "@/components/lab-workspace-preview";
import { ArrowRight, Check, Shield, Cloud, Compliance, Radar, Cap, Flask, Code, Lock } from "@/components/icons";
import { SERVICES, WHY, SOCIAL_PROOF, SITE } from "@/lib/site";
import { RelatedBlogSection } from "@/components/related-blog-section";
import { VideoEmbed } from "@/components/video-embed";

// ─────────────────────────────────────────────────────────────────────────
//  Explainer video config — flip these two constants when the YouTube
//  upload is ready. No other code change required.
//
//  HOMEPAGE_VIDEO_ID
//    Paste the 11-char unlisted YouTube id (the bit after "v=").
//    Empty string = no video yet → falls back to safe defaults below.
//
//  HOMEPAGE_VIDEO_PLACEMENT
//    "hero"      → video REPLACES the AWS-console mock in the hero right
//                  column. Use when the video is ≤ ~90 seconds.
//    "mid-page"  → video renders in the "See it in action" section
//                  just before the SCS-C02 callout. Use for
//                  ~2–3 min videos that qualify their own slot.
//    "off"       → no video on homepage anywhere. Use if the explainer
//                  ended up too long (3 min+); embed it on /free-lab or
//                  /aws-security-certification instead.
//
//  Fallback logic (so the page never looks broken mid-edit):
//    • placement="hero" but no id  → hero shows the mock (today's state)
//    • placement="mid-page" + no id → mid-page shows the placeholder card
//    • placement="off"             → no video anywhere on home
// ─────────────────────────────────────────────────────────────────────────
type VideoPlacement = "hero" | "mid-page" | "off";
const HOMEPAGE_VIDEO_ID: string = "XBLtcjQaXZE";
const HOMEPAGE_VIDEO_PLACEMENT: VideoPlacement = "hero" as VideoPlacement;
const HOMEPAGE_VIDEO_TITLE = "See ShieldSync in action — full walkthrough";

const VIDEO_IN_HERO = HOMEPAGE_VIDEO_PLACEMENT === "hero" && HOMEPAGE_VIDEO_ID !== "";
const VIDEO_MID_PAGE = HOMEPAGE_VIDEO_PLACEMENT === "mid-page";

export const metadata: Metadata = {
  // NOTE: the layout's title.template does NOT apply to the root page (Next
  // templates only affect child segments), so the brand must be explicit here.
  title: "AWS Cloud Security Services & Hands-on Labs | ShieldSync Security",
  description:
    "Practitioner-led AWS cloud security — assessments, compliance, and detection — plus hands-on AWS security labs in real, isolated AWS accounts. First lab free.",
  keywords: [
    "AWS security",
    "AWS cloud security",
    "AWS security labs",
    "AWS security services",
    "cloud security training",
    "AWS IAM",
    "AWS compliance",
    "cybersecurity services",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    title: "AWS Cloud Security Services & Hands-on Labs | ShieldSync",
    description:
      "AWS security services + hands-on AWS labs in real, isolated AWS accounts. IAM, S3, encryption, GuardDuty, VPC. First lab free.",
    url: SITE.url,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AWS Cloud Security Services & Hands-on Labs | ShieldSync",
    description: "AWS security services + hands-on AWS labs in real, isolated AWS accounts.",
  },
};

const SERVICE_ICONS = { cloud: Cloud, shield: Shield, flask: Flask, compliance: Compliance, cap: Cap, radar: Radar, code: Code, lock: Lock } as const;

const FRAMEWORKS = ["SOC 2", "ISO 27001", "GDPR", "PCI DSS", "DPDP", "NIST CSF"];

export default function HomePage() {
  return (
    <>
      {/* ----------------------------------------------------------- Brand hero */}
      <section className="relative isolate overflow-hidden border-b border-line">
        <div className="aurora absolute inset-0 -z-10" />
        <div className="cyber-grid absolute inset-0 -z-10" />

        <Container className="grid gap-10 py-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:py-10">
          <Reveal>
            <span className="inline-flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-bright">
              <span className="h-1 w-1 rounded-full bg-brand" />
              Cloud &amp; cybersecurity services
            </span>

            <h1 className="mt-3 text-2xl font-bold leading-[1.15] tracking-tight text-fg sm:text-3xl lg:text-4xl">
              Secure your cloud — <span className="text-gradient">and the team that runs it</span>.
            </h1>

            <p className="mt-3 max-w-xl text-base leading-7 text-muted">
              Practitioner-led cloud security for businesses: AWS-deep <span className="font-medium text-fg">assessments</span>,{" "}
              <span className="font-medium text-fg">compliance readiness</span>, and{" "}
              <span className="font-medium text-fg">detection &amp; response</span> — plus hiring assessments that
              test candidates in real AWS before you make the offer.
            </p>

            <div className="mt-4 flex flex-col gap-3 sm:flex-row">
              <Button href="/contact">
                Book a call
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button href="/services" variant="secondary">
                Explore services
              </Button>
            </div>

            <div className="mt-6 flex items-center gap-2">
              <Check className="h-4 w-4 shrink-0 text-brand" />
              <p className="text-base text-muted">
                <span className="font-semibold text-fg">{SOCIAL_PROOF.count}</span> {SOCIAL_PROOF.label}
              </p>
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              {FRAMEWORKS.map((f) => (
                <span key={f} className="rounded-full border border-line bg-panel px-3 py-1 text-xs font-semibold text-muted">
                  {f}
                </span>
              ))}
            </div>
          </Reveal>

          {/* Right column: video OR the AWS-console mock.
              When VIDEO_IN_HERO (= placement="hero" + video id set), the explainer
              replaces the mock. Otherwise the mock renders as today. Both render
              at the same 16:9-ish footprint so the hero grid never shifts. */}
          <Reveal delay={140}>
            {VIDEO_IN_HERO ? (
              <div className="rounded-3xl border border-line bg-panel p-3 shadow-xl shadow-slate-900/5">
                <VideoEmbed videoId={HOMEPAGE_VIDEO_ID} title={HOMEPAGE_VIDEO_TITLE} />
                <Link
                  href="/aws-security-labs"
                  className="group mt-1 flex items-center justify-between gap-3 rounded-b-2xl px-3 py-4 transition hover:bg-surface"
                >
                  <span className="text-sm text-muted">Real, hands-on AWS cloud security in your browser.</span>
                  <span className="shrink-0 text-sm font-semibold text-brand-bright transition group-hover:translate-x-0.5">
                    Explore →
                  </span>
                </Link>
              </div>
            ) : (
              <div className="rounded-3xl border border-line bg-panel p-3 shadow-xl shadow-slate-900/5">
                <Link
                  href={SITE.startUrl}
                  aria-label="Open the guided lab picker"
                  className="group relative block overflow-hidden rounded-2xl border border-line bg-surface px-4 pb-4 pt-11 transition hover:border-line-strong hover:shadow-md"
                >
                  <span className="absolute left-3 top-3 rounded-md bg-cyan px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-white shadow">
                    ★ AWS Security Labs
                  </span>
                  <span className="absolute right-3 top-3 rounded-md border border-line bg-panel px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-muted">
                    Preview
                  </span>
                  <div className="pointer-events-none select-none">
                    <LabWorkspacePreview />
                  </div>
                  <span className="mt-3 flex items-center justify-center gap-1 text-sm font-semibold text-brand-bright opacity-80 transition group-hover:opacity-100">
                    Start a hands-on lab →
                  </span>
                </Link>
                <Link
                  href="/aws-security-labs"
                  className="group flex items-center justify-between gap-3 rounded-b-2xl px-3 py-4 transition hover:bg-surface"
                >
                  <span className="text-sm text-muted">Real, hands-on AWS cloud security in your browser.</span>
                  <span className="shrink-0 text-sm font-semibold text-brand-bright transition group-hover:translate-x-0.5">
                    Explore →
                  </span>
                </Link>
              </div>
            )}
          </Reveal>
        </Container>
      </section>

      {/* ------------------------------------------------------------- Services */}
      <section className="border-b border-line py-8 sm:py-10">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="What we do"
              title="Security services, end to end"
              description="From cloud and application security to 24/7 detection — practitioner-led work mapped to the attack paths that actually matter to your business."
            />
          </Reveal>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {SERVICES.slice(0, 4).map((s, i) => {
              const Icon = SERVICE_ICONS[s.icon];
              return (
                <Reveal key={s.title} delay={i * 70}>
                  <Card className={`flex h-full flex-col p-6 ${s.featured ? "ring-2 ring-brand/40" : ""}`}>
                    <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-brand/25 bg-brand/10 text-brand-bright">
                      <Icon className="h-5 w-5" />
                    </span>
                    <h3 className="mt-4 text-base font-semibold text-fg">{s.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-muted">{s.desc}</p>
                  </Card>
                </Reveal>
              );
            })}
          </div>
          <Reveal>
            <div className="mt-8">
              <Button href="/services" variant="secondary">
                Explore all services
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* ----------------------------------------------------------------- Why */}
      <section className="border-b border-line py-8 sm:py-10">
        <Container className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <Reveal>
            <SectionHeading
              eyebrow="Why ShieldSync"
              title="Practitioner-led, cloud-deep, audit-ready"
              description="The people who secure real cloud environments do the work and teach the training — so what you get matches how attackers and defenders actually operate."
            />
          </Reveal>
          <div className="grid gap-x-10 gap-y-8 sm:grid-cols-2">
            {WHY.map((w, i) => (
              <Reveal key={w.title} delay={i * 70}>
                <div>
                  <span className="font-mono text-sm text-brand">0{i + 1}</span>
                  <h3 className="mt-3 text-lg font-semibold text-fg">{w.title}</h3>
                  <p className="mt-2 text-base leading-7 text-muted">{w.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* -------------------------------------- For employers: hiring assessments */}
      <section className="border-b border-line bg-panel py-8 sm:py-10">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <Reveal>
              <span className="inline-flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-bright">
                <span className="h-1 w-1 rounded-full bg-brand" />
                For employers — hiring assessments
              </span>
              <h2 className="mt-2 text-2xl font-bold tracking-tight text-fg sm:text-3xl">
                Hire cloud security talent on proof, not resumes.
              </h2>
              <p className="mt-3 max-w-xl text-base leading-7 text-muted">
                Send each candidate one link. They secure a live, isolated AWS account against a real
                misconfiguration scenario, our engine grades the actual cloud state they produce, and
                your hiring team gets a verified, side-by-side report.
              </p>
              <ul className="mt-4 grid gap-2 sm:grid-cols-3">
                {["Real AWS, isolated per candidate", "Auto-graded on live cloud state", "Comparable, per-objective reports"].map((p) => (
                  <li key={p} className="flex items-start gap-2 text-sm text-fg/85">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                    {p}
                  </li>
                ))}
              </ul>
              <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                <Button href={`${SITE.enterpriseUrl}/demo/report`} external newTab>
                  See a sample report
                  <ArrowRight className="h-4 w-4" />
                </Button>
                <Button href={SITE.enterpriseUrl} external variant="secondary">
                  Explore hiring assessments
                </Button>
              </div>
            </Reveal>
            <Reveal delay={100}>
              {/* Mini report teaser — echoes the enterprise report at a glance. */}
              <div className="rounded-3xl border border-line bg-ink p-5 shadow-xl shadow-slate-900/5">
                <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-muted">Assessment report — sample</p>
                <div className="mt-3 flex flex-col gap-2.5">
                  {[
                    { name: "Candidate A", pct: 100, note: "6/6 objectives · reflection ✓" },
                    { name: "Candidate B", pct: 83, note: "5/6 objectives · reflection ✓" },
                    { name: "Candidate C", pct: 33, note: "2/6 objectives" },
                  ].map((c) => (
                    <div key={c.name} className="rounded-xl border border-line bg-panel px-4 py-3">
                      <div className="flex items-baseline justify-between gap-3">
                        <span className="text-sm font-semibold text-fg">{c.name}</span>
                        <span className="text-sm font-bold tabular-nums text-brand-bright">{c.pct}%</span>
                      </div>
                      <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-surface-2">
                        <div className="h-full rounded-full bg-gradient-to-r from-brand to-cyan" style={{ width: `${c.pct}%` }} />
                      </div>
                      <p className="mt-1.5 text-xs text-muted">{c.note}</p>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* -------------------------------------------- See it in action — video
          Renders only when HOMEPAGE_VIDEO_PLACEMENT === "mid-page". When
          placement is "hero" or "off", this section is omitted entirely so the
          page stays compact and we don't show the explainer twice. */}
      {VIDEO_MID_PAGE && (
        <section className="border-b border-line py-8 sm:py-10">
          <Container>
            <Reveal>
              <SectionHeading
                eyebrow="See it in action"
                title="Watch a real AWS security lab in 90 seconds"
                description="The launch flow. The grader. The auto-wipe. No setup, no pitch — just the product working."
              />
            </Reveal>
            <Reveal delay={100}>
              <div className="mx-auto mt-6 max-w-4xl">
                <VideoEmbed videoId={HOMEPAGE_VIDEO_ID} title={HOMEPAGE_VIDEO_TITLE} />
              </div>
              <div className="mt-5 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-muted">
                <span className="inline-flex items-center gap-1.5">
                  <Check className="h-4 w-4 shrink-0 text-brand" /> Real isolated AWS account
                </span>
                <span className="hidden sm:inline text-line">·</span>
                <span className="inline-flex items-center gap-1.5">
                  <Check className="h-4 w-4 shrink-0 text-brand" /> Auto-graded against live state
                </span>
                <span className="hidden sm:inline text-line">·</span>
                <span className="inline-flex items-center gap-1.5">
                  <Check className="h-4 w-4 shrink-0 text-brand" /> Auto-wiped, no credit card
                </span>
              </div>
              <div className="mt-5 flex justify-center">
                <Button href="/labs-wizard?track=aws" variant="secondary">
                  Skip the video — launch the free lab
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </Reveal>
          </Container>
        </section>
      )}

      {/* ---------------------------------------------- AWS SCS-C03 cert callout */}
      <section className="border-b border-line py-8 sm:py-10">
        <Container>
          <Reveal>
            <Link
              href="/aws-security-certification"
              className="group flex flex-col items-start justify-between gap-4 rounded-3xl border border-line bg-gradient-to-br from-brand/[0.08] to-transparent p-6 transition hover:border-brand sm:flex-row sm:items-center sm:p-8"
            >
              <div className="flex items-start gap-4">
                <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-brand/25 bg-brand/10 text-brand-bright">
                  <Cloud className="h-6 w-6" />
                </span>
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-brand-bright">
                    AWS Certification prep
                  </span>
                  <h2 className="mt-1 text-xl font-bold text-fg sm:text-2xl">
                    AWS Security Specialty (SCS-C03) — every domain mapped to a hands-on lab
                  </h2>
                  <p className="mt-1 max-w-2xl text-sm leading-6 text-muted">
                    Skip the walkthroughs. Practise IAM, S3, KMS, VPC, GenAI/ML security, GuardDuty, and CloudTrail in real, isolated AWS accounts. First lab free. Upgraded from SCS-C02.
                  </p>
                </div>
              </div>
              <span className="shrink-0 inline-flex items-center gap-1.5 rounded-xl border border-brand bg-brand px-5 py-2.5 text-sm font-semibold text-white transition group-hover:brightness-110">
                Explore SCS-C03 prep
                <ArrowRight className="h-4 w-4" />
              </span>
            </Link>
          </Reveal>
        </Container>
      </section>

      {/* ------------------------------------------------------------ Blog posts */}
      <RelatedBlogSection title="Insights on cloud security" />

    </>
  );
}
