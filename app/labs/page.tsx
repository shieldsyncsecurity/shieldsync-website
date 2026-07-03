import Link from "next/link";
import type { Metadata } from "next";
import { Container, Button, SectionHeading } from "@/components/ui";
import { Reveal } from "@/components/reveal";
import { FaqSection } from "@/components/sections";
import { SchemaOrg } from "@/components/schema-org";
import { BlogCarousel } from "@/components/blog-carousel";
import { webPageSchema, breadcrumbSchema, faqSchema, courseSchema, courseListSchema } from "@/lib/schema";
import { ArrowRight, Check, Cloud, Radar } from "@/components/icons";
import { AWS_LABS, SOC_LABS, FAQS, SITE, BLOG_POSTS } from "@/lib/site";
import { AWS_PRICE } from "@/lib/region";

export const metadata: Metadata = {
  title: "AWS Security Labs — Hands-on Cloud Security in Real AWS",
  description:
    "AWS security labs you launch in your browser — real, isolated AWS accounts, no setup, first lab free. Practise IAM, S3, encryption, VPC, GuardDuty, and detection on a live console with auto-wipe when you're done.",
  keywords: [
    "AWS security labs",
    "AWS cloud security",
    "hands-on AWS security",
    "AWS IAM labs",
    "AWS S3 security",
    "cloud security training",
    "AWS penetration testing labs",
    "cyber range AWS",
  ],
  alternates: { canonical: "/labs" },
  openGraph: {
    title: "AWS Security Labs — Hands-on Cloud Security in Real AWS",
    description:
      "Practise AWS cloud security in real, isolated AWS accounts. IAM, S3, encryption, GuardDuty, VPC — no setup, first lab free, auto-wipe when done.",
    url: `${SITE.url}/labs`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AWS Security Labs — Hands-on Cloud Security in Real AWS",
    description: "Real AWS accounts, no setup, first lab free. IAM, S3, encryption, GuardDuty, VPC.",
  },
};

const PAGE_URL = `${SITE.url}/labs`;
const PAGE_SCHEMA = [
  webPageSchema({
    url: PAGE_URL,
    name: "AWS Security Labs — Hands-on Cloud Security in Real AWS",
    description:
      "AWS security labs you launch in your browser — real, isolated AWS accounts covering IAM, S3, encryption, VPC, GuardDuty and detection. First lab free.",
    dateModified: "2026-06-30",
    breadcrumb: [{ name: "Home", url: SITE.url }, { name: "AWS Security Labs", url: PAGE_URL }],
  }),
  breadcrumbSchema(PAGE_URL, [
    { name: "Home", url: SITE.url },
    { name: "AWS Security Labs", url: PAGE_URL },
  ]),
  courseListSchema({
    url: PAGE_URL,
    name: "AWS Security Labs catalog",
    items: AWS_LABS.map((l) => ({
      url: `${SITE.labsUrl}/labs/${l.slug}`,
      name: `${l.title} — AWS Security Lab`,
      description: l.desc,
    })),
  }),
  // Each AWS lab as its own Course — Google can show course rich results
  // when users search for the specific lab topic ("AWS IAM lab", "S3 misconfig lab").
  ...AWS_LABS.map((l) =>
    courseSchema({
      url: `${SITE.labsUrl}/labs/${l.slug}`,
      name: `${l.title} — AWS Security Lab`,
      description: l.desc,
      level: l.level,
      free: l.free,
      priceINR: AWS_PRICE[l.level]?.inr,
    })
  ),
  faqSchema(FAQS.labs),
];

const LEVEL_STYLE: Record<string, string> = {
  Beginner: "border-emerald-300 bg-emerald-50 text-emerald-700",
  Intermediate: "border-amber-300 bg-amber-50 text-amber-700",
  Advanced: "border-rose-300 bg-rose-50 text-rose-700",
};

const FREE_LAB_HREF = `${SITE.labsUrl}/labs/${AWS_LABS.find((l) => l.free)?.slug ?? "s3-misconfiguration-audit"}`;

// Uniform button classes for all three pricing cards
const PRICE_BTN = "mt-auto pt-5";

export default function LabsPage() {
  const KW = ["Cloud", "AWS", "Lab", "IAM", "S3"];
  const matched = KW.length
    ? BLOG_POSTS.filter((p) => KW.some((k) => p.category.toLowerCase().includes(k.toLowerCase())))
    : [];
  const rest = BLOG_POSTS.filter((p) => !matched.includes(p));
  const posts = [...matched, ...rest].slice(0, 6);

  return (
    <>
      <SchemaOrg schema={PAGE_SCHEMA} />

      {/* ── Hero + Tracks + Pricing — one tight section ──────────────────── */}
      <section className="relative isolate overflow-hidden">
        <div className="aurora absolute inset-0 -z-10" />
        <div className="cyber-grid absolute inset-0 -z-10" />

        <Container className="py-6 sm:py-8">
          {/* Mini header row */}
          <Reveal>
            <div className="flex flex-col gap-3 border-b border-line pb-8 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <span className="inline-flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-bright">
                  <span className="h-1 w-1 rounded-full bg-brand" />
                  Hands-on labs
                </span>
                <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-fg sm:text-4xl">
                  <span className="text-gradient">AWS Security Labs</span> — practice cloud security in real AWS
                </h1>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-muted">
                  Real, isolated AWS accounts provisioned in your browser. Practice IAM, S3, encryption, GuardDuty, VPC and detection — no setup, first lab free, auto-wiped when you&apos;re done.
                </p>
              </div>
              <div className="flex shrink-0 gap-2">
                <Button href={FREE_LAB_HREF} external>
                  Start the free lab <ArrowRight className="h-4 w-4" />
                </Button>
                <Button href={SITE.startUrl} variant="secondary">
                  Pricing
                </Button>
              </div>
            </div>
          </Reveal>

          {/* Safe-to-practice strip */}
          <Reveal>
            <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2">
              {[
                "Real AWS console — not a simulator",
                "Isolated throwaway accounts",
                "Auto-wiped after session",
                "Instant grading on real infra",
                "Certificate on completion",
              ].map((t) => (
                <span key={t} className="flex items-center gap-1.5 text-xs text-muted">
                  <Check className="h-3.5 w-3.5 text-brand" /> {t}
                </span>
              ))}
            </div>
          </Reveal>

          {/* Tracks */}
          <div className="mt-8 grid items-stretch gap-5 lg:grid-cols-2">
            {/* AWS Cloud Security */}
            <Reveal>
              <div className="flex h-full flex-col rounded-2xl border border-line bg-panel p-6">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-brand/25 bg-brand/10 text-brand-bright">
                      <Cloud className="h-4 w-4" />
                    </span>
                    <h2 className="text-lg font-bold text-fg">Cloud Security — AWS</h2>
                  </div>
                  <span className="shrink-0 rounded-full bg-brand/10 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.16em] text-brand-bright">
                    ★ Flagship · Live
                  </span>
                </div>
                <p className="mt-2 text-sm leading-6 text-muted">
                  Audit and harden real AWS accounts — IAM, S3, encryption, logging, and detection — mapped to how attackers actually get in.
                </p>
                <ul className="mt-4 grid gap-1.5">
                  {AWS_LABS.map((lab) => (
                    <li key={lab.slug}>
                      <Link
                        href={`/labs/${lab.slug}`}
                        className="group flex items-center justify-between gap-3 rounded-lg border border-line bg-surface px-3 py-2.5 transition hover:border-line-strong"
                      >
                        <span className="text-sm font-semibold text-fg group-hover:text-brand-bright">{lab.title}</span>
                        <span className="flex shrink-0 items-center gap-1.5">
                          {lab.free && (
                            <span className="rounded px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide bg-brand/10 text-brand-bright">Free</span>
                          )}
                          <span className={`rounded border px-1.5 py-0.5 text-[10px] font-bold uppercase ${LEVEL_STYLE[lab.level]}`}>
                            {lab.level}
                          </span>
                        </span>
                      </Link>
                    </li>
                  ))}
                  <li className="px-1 pt-1 text-xs text-muted">More AWS labs added regularly.</li>
                </ul>
                <div className="mt-4">
                  <Button href={FREE_LAB_HREF} external variant="secondary" className="w-full sm:w-fit">
                    Start the free lab <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Reveal>

            {/* SOC */}
            <Reveal delay={80}>
              <div className="flex h-full flex-col rounded-2xl border border-line bg-panel p-6">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-violet-300/60 bg-violet-50/50 text-violet-600">
                      <Radar className="h-4 w-4" />
                    </span>
                    <div className="flex items-center gap-2">
                      <h2 className="text-lg font-bold text-fg">SOC — SIEM &amp; SOAR</h2>
                    </div>
                  </div>
                  <span className="shrink-0 rounded-full border border-amber-200 bg-amber-50 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.16em] text-amber-700">
                    Coming soon
                  </span>
                </div>
                <p className="mt-2 text-sm leading-6 text-muted">
                  Round out cloud security with blue-team essentials — build detections, hunt threats, and automate the response.
                </p>
                <ul className="mt-4 grid gap-1.5">
                  {SOC_LABS.map((lab) => (
                    <li key={lab.slug} className="flex items-center justify-between gap-3 rounded-lg border border-line bg-surface px-3 py-2.5">
                      <span className="text-sm font-semibold text-fg">{lab.title}</span>
                      <span className={`shrink-0 rounded border px-1.5 py-0.5 text-[10px] font-bold uppercase ${
                        lab.product === "SIEM" ? "border-emerald-300 bg-emerald-50 text-emerald-700" : "border-violet-300 bg-violet-50 text-violet-700"
                      }`}>
                        {lab.product}
                      </span>
                    </li>
                  ))}
                </ul>
                <div className="mt-4">
                  <Button href="/labs/soc" variant="secondary" className="w-full sm:w-fit">
                    Explore the SOC track <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Pricing — 3 uniform cards */}
          <Reveal>
            <p className="mt-10 mb-4 text-xs font-bold uppercase tracking-widest text-muted">Pricing</p>
            <div className="grid gap-4 sm:grid-cols-3">

              {/* Free */}
              <div className="flex flex-col rounded-xl border border-line bg-panel p-5">
                <p className="text-xs font-bold uppercase tracking-widest text-muted">Free</p>
                <p className="mt-2 text-2xl font-extrabold text-fg">₹0</p>
                <p className="mt-1 text-sm text-muted">First lab, no card needed.</p>
                <ul className="mt-4 flex-1 grid gap-1.5 text-sm text-fg/85">
                  <li className="flex items-center gap-2"><Check className="h-3.5 w-3.5 shrink-0 text-brand" />S3 misconfiguration lab</li>
                  <li className="flex items-center gap-2"><Check className="h-3.5 w-3.5 shrink-0 text-brand" />Full graded experience</li>
                  <li className="flex items-center gap-2"><Check className="h-3.5 w-3.5 shrink-0 text-brand" />No credit card required</li>
                </ul>
                <div className={PRICE_BTN}>
                  <Button href={FREE_LAB_HREF} external variant="secondary" className="w-full">
                    Start the free lab <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Per-lab — featured */}
              <div className="flex flex-col rounded-xl border border-brand/40 bg-panel p-5 ring-1 ring-brand/20">
                <p className="text-xs font-bold uppercase tracking-widest text-brand-bright">Pay per lab</p>
                <p className="mt-2 text-2xl font-extrabold text-fg">From ₹99 <span className="text-base font-medium text-muted">/ $3</span></p>
                <p className="mt-1 text-sm text-muted">Buy individual labs as you go.</p>
                <ul className="mt-4 flex-1 grid gap-1.5 text-sm text-fg/85">
                  <li className="flex items-center gap-2"><Check className="h-3.5 w-3.5 shrink-0 text-brand" />Any single lab</li>
                  <li className="flex items-center gap-2"><Check className="h-3.5 w-3.5 shrink-0 text-brand" />Multiple re-launches (48h)</li>
                  <li className="flex items-center gap-2"><Check className="h-3.5 w-3.5 shrink-0 text-brand" />Completion certificate</li>
                </ul>
                <div className={PRICE_BTN}>
                  <Button href={SITE.startUrl} className="w-full">
                    Buy a lab <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Monthly */}
              <div className="flex flex-col rounded-xl border border-line bg-panel p-5">
                <p className="text-xs font-bold uppercase tracking-widest text-muted">Monthly pass</p>
                <p className="mt-2 text-2xl font-extrabold text-fg">₹2,000 <span className="text-base font-medium text-muted">/ $25</span></p>
                <p className="mt-1 text-sm text-muted">All labs, all levels, one month.</p>
                <ul className="mt-4 flex-1 grid gap-1.5 text-sm text-fg/85">
                  <li className="flex items-center gap-2"><Check className="h-3.5 w-3.5 shrink-0 text-brand" />Every available lab unlocked</li>
                  <li className="flex items-center gap-2"><Check className="h-3.5 w-3.5 shrink-0 text-brand" />All tracks + levels</li>
                  <li className="flex items-center gap-2"><Check className="h-3.5 w-3.5 shrink-0 text-brand" />Certificate per lab</li>
                </ul>
                <div className={PRICE_BTN}>
                  <Button href={`${SITE.labsUrl}?checkout=monthly`} external variant="secondary" className="w-full">
                    Get monthly pass <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>

            </div>
          </Reveal>
        </Container>
      </section>

      {posts.length > 0 && (
        <section className="border-b border-line py-8 sm:py-10">
          <Container>
            <div className="flex items-end justify-between gap-4">
              <SectionHeading eyebrow="From the blog" title="Related reads" />
              <Button href="/blog" variant="secondary" className="shrink-0 self-start">
                All posts <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
            <div className="mt-6">
              <BlogCarousel posts={posts} />
            </div>
          </Container>
        </section>
      )}

      <FaqSection faqs={FAQS.labs} title="Labs — frequently asked questions" />
    </>
  );
}
