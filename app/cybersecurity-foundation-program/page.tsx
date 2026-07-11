import type { Metadata } from "next";
import { Card, Pill, Button } from "@/components/ui";
import { Reveal } from "@/components/reveal";
import { ArrowRight, Check, Cloud, Flask, Radar, Cap } from "@/components/icons";
import { SchemaOrg } from "@/components/schema-org";
import { webPageSchema, breadcrumbSchema, foundationProgramSchema } from "@/lib/schema";
import { FoundationApplyForm } from "@/components/foundation-apply-form";
import { FoundationPlanDownload } from "@/components/foundation-plan-download";
import { FOUNDATION_PROGRAM, SITE } from "@/lib/site";

export const metadata: Metadata = {
  // Named a foundation PROGRAM (honest category — we charge for training, we
  // don't sell internships), but the page still intercepts "cybersecurity
  // internship" searches: keywords + on-page copy address that intent head-on.
  title: "Cybersecurity Foundation Program — 8 Weeks, AWS Labs, Certificate",
  description:
    "8-week hands-on cybersecurity foundation program: real AWS security projects, cloud labs, 1:1 mentorship, certificate. Internship-grade experience, ₹9,999.",
  keywords: [
    "cybersecurity foundation program",
    "cybersecurity beginner program india",
    "cybersecurity internship india",
    "cybersecurity internship online",
    "cloud security internship",
    "AWS security internship",
    "online cybersecurity course india",
  ],
  alternates: { canonical: "/cybersecurity-foundation-program" },
  // Hidden 2026-07-10 (owner): removed from nav + sitemap and noindexed. The page
  // still resolves at its URL (e.g. for the /internship redirect or a direct link)
  // but won't be indexed or surfaced in navigation.
  robots: { index: false, follow: false },
  openGraph: {
    title: "Cybersecurity Foundation Program — 8 Weeks, AWS Labs, Certificate",
    description:
      "Hands-on AWS security projects, 1:1 mentorship, certificate. Internship-grade experience. ₹9,999 all-inclusive.",
    url: `${SITE.url}/cybersecurity-foundation-program`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cybersecurity Foundation Program — 8 Weeks, AWS Labs",
    description: "Hands-on AWS security projects + mentorship + certificate. ₹9,999.",
  },
};

const WORK_ICONS = [Cloud, Flask, Radar] as const;
const PAGE_URL = `${SITE.url}/cybersecurity-foundation-program`;
const PAGE_SCHEMA = [
  webPageSchema({
    url: PAGE_URL,
    name: "Cybersecurity Foundation Program — ShieldSync Security",
    description:
      "A focused, hands-on 8-week cybersecurity foundation program. Real AWS security projects, managed cyber-range labs, 1:1 mentorship, and a completion certificate.",
    dateModified: "2026-07-07",
    breadcrumb: [
      { name: "Home", url: SITE.url },
      { name: "Foundation Program", url: PAGE_URL },
    ],
  }),
  breadcrumbSchema(PAGE_URL, [
    { name: "Home", url: SITE.url },
    { name: "Cybersecurity Foundation Program", url: PAGE_URL },
  ]),
  foundationProgramSchema(),
];

/* Narrow, low-scroll page (owner call 2026-07-07): content capped at max-w-6xl
 * (the enterprise-site width, vs the sitewide 1536px Container) and the deep
 * detail lives in the downloadable 8-week plan PDF, not on the page. */
const Wrap = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`mx-auto w-full max-w-6xl px-5 sm:px-6 lg:px-8 ${className}`}>{children}</div>
);

export default function FoundationProgramPage() {
  return (
    <>
      <SchemaOrg schema={PAGE_SCHEMA} />

      {/* ─── Hero + Apply form (the conversion core) ───────────────────────── */}
      <section className="relative isolate overflow-hidden border-b border-line">
        <div className="aurora absolute inset-0 -z-10" />
        <div className="cyber-grid absolute inset-0 -z-10" />

        <Wrap className="py-6 sm:py-8">
          <div className="grid gap-8 lg:grid-cols-[1fr_1.05fr] lg:items-start">
            {/* Left: pitch */}
            <Reveal>
              <Pill tone="brand">{FOUNDATION_PROGRAM.badge}</Pill>
              <h1 className="mt-3 text-2xl font-bold tracking-tight text-fg sm:text-3xl lg:text-4xl">
                {FOUNDATION_PROGRAM.title}
              </h1>
              <p className="mt-2 text-lg font-semibold text-brand-bright">{FOUNDATION_PROGRAM.subtitle}</p>
              <p className="mt-3 max-w-lg text-base leading-7 text-muted">{FOUNDATION_PROGRAM.summary}</p>

              {/* Price + commitment */}
              <div className="mt-5 inline-flex items-baseline gap-2 rounded-2xl border border-line bg-panel px-5 py-3">
                <span className="text-4xl font-extrabold text-fg">{FOUNDATION_PROGRAM.price}</span>
                <span className="text-sm text-muted">{FOUNDATION_PROGRAM.priceNote}</span>
              </div>
              <p className="mt-2 text-sm font-medium text-muted">{FOUNDATION_PROGRAM.commitment}</p>

              {/* Inclusions */}
              <ul className="mt-5 grid gap-2 sm:grid-cols-2">
                {FOUNDATION_PROGRAM.whatYouGet.map((g) => (
                  <li key={g} className="flex items-start gap-2 text-sm text-fg/85">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                    {g}
                  </li>
                ))}
              </ul>

              {/* The full curriculum lives in the PDF — not on the page. */}
              <div className="mt-5">
                <FoundationPlanDownload />
                <p className="mt-1.5 text-xs text-muted">
                  The full 8-week curriculum, week by week — everything you&apos;ll learn, before you apply.
                </p>
              </div>
            </Reveal>

            {/* Right: application form */}
            <Reveal delay={100}>
              <Card hover={false} className="p-6 sm:p-7">
                <p className="text-base font-bold text-fg">Apply now</p>
                <p className="mt-0.5 text-sm text-muted">Fill in your details — we reply within 24 hours.</p>
                <div className="mt-5">
                  <FoundationApplyForm />
                </div>
              </Card>
            </Reveal>
          </div>
        </Wrap>
      </section>

      {/* ─── One compact strip: what you'll do + who it's for ─────────────── */}
      <section className="py-8 sm:py-10">
        <Wrap>
          <Reveal>
            <div className="grid gap-4 sm:grid-cols-3">
              {FOUNDATION_PROGRAM.workOn.map((w, i) => {
                const Icon = WORK_ICONS[i % WORK_ICONS.length];
                return (
                  <div key={w.title} className="rounded-xl border border-line bg-panel p-4">
                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-brand/25 bg-brand/10 text-brand-bright">
                      <Icon className="h-4 w-4" />
                    </span>
                    <p className="mt-3 text-sm font-semibold text-fg">{w.title}</p>
                    <p className="mt-1 text-sm leading-6 text-muted">{w.desc}</p>
                  </div>
                );
              })}
            </div>
            <div className="mt-4 flex items-start gap-3 rounded-xl border border-brand/20 bg-brand/5 p-4">
              <Cap className="mt-0.5 h-5 w-5 shrink-0 text-brand" />
              <p className="text-sm text-fg/90">
                <span className="font-semibold text-fg">For students, career-changers, and early-career IT professionals.</span>{" "}
                No prior security experience needed — curiosity, basic IT knowledge, and 10–15 hrs/week is enough.
              </p>
            </div>
          </Reveal>
        </Wrap>
      </section>

      {/* ─── Certificate + exam readiness (compact) ───────────────────────── */}
      <section className="border-t border-line py-8 sm:py-10">
        <Wrap>
          <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
            <Reveal>
              <div className="flex h-full flex-col rounded-2xl border border-brand/30 bg-gradient-to-br from-brand/[0.08] to-transparent p-5 sm:p-6">
                <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-brand-bright">What you graduate with</p>
                <h2 className="mt-2 text-lg font-bold text-fg sm:text-xl">{FOUNDATION_PROGRAM.certificate.title}</h2>
                <p className="mt-2 text-sm leading-6 text-muted">{FOUNDATION_PROGRAM.certificate.detail}</p>
              </div>
            </Reveal>
            <Reveal delay={80}>
              <div className="flex h-full flex-col rounded-2xl border border-line bg-panel p-5 sm:p-6">
                <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-brand-bright">Plus — exam ready</p>
                <h3 className="mt-2 text-lg font-bold text-fg">Toward AWS Security Specialty (SCS-C03)</h3>
                <p className="mt-2 text-sm leading-6 text-muted">{FOUNDATION_PROGRAM.certificate.examReadiness}</p>
              </div>
            </Reveal>
          </div>
        </Wrap>
      </section>
    </>
  );
}
