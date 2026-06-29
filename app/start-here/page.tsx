import Link from "next/link";
import type { Metadata } from "next";
import { Container, Button, Card, SectionHeading } from "@/components/ui";
import { Reveal } from "@/components/reveal";
import { CtaBand } from "@/components/sections";
import { SchemaOrg } from "@/components/schema-org";
import { BlogCarousel } from "@/components/blog-carousel";
import { webPageSchema, breadcrumbSchema } from "@/lib/schema";
import { Check, ArrowRight, Shield, Cap } from "@/components/icons";
import { ROADMAP, ROADMAP_ROLES, SITE, BLOG_POSTS } from "@/lib/site";

export const metadata: Metadata = {
  title: "Cloud Security Engineer Roadmap — Hands-on AWS Security",
  description:
    "Cloud security engineer roadmap: a step-by-step, hands-on path from zero to job-ready in AWS security. Every step mapped to a real lab — no AWS account, no setup, first lab free.",
  keywords: [
    "cloud security engineer roadmap",
    "AWS security learning path",
    "how to become cloud security engineer",
    "AWS security beginner",
    "learn cloud security",
    "cybersecurity roadmap india",
    "SOC analyst roadmap",
  ],
  alternates: { canonical: "/start-here" },
  openGraph: {
    title: "Cloud Security Engineer Roadmap — Hands-on AWS Security",
    description:
      "Zero-to-job-ready roadmap for AWS cloud security. Every step mapped to a real lab. First lab free.",
    url: `${SITE.url}/start-here`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cloud Security Engineer Roadmap — Hands-on AWS Security",
    description: "Zero-to-job-ready AWS security roadmap, every step a real lab.",
  },
};

const PAGE_URL = `${SITE.url}/start-here`;
const PAGE_SCHEMA = [
  webPageSchema({
    url: PAGE_URL,
    name: "Start Here — Learn Cloud Security (Hands-on Roadmap)",
    description:
      "A step-by-step, hands-on roadmap for learning AWS cloud security from beginner to job-ready, mapped to real labs.",
    dateModified: "2026-06-29",
    breadcrumb: [
      { name: "Home", url: SITE.url },
      { name: "Start here", url: PAGE_URL },
    ],
  }),
  breadcrumbSchema(PAGE_URL, [
    { name: "Home", url: SITE.url },
    { name: "Start here", url: PAGE_URL },
  ]),
];

const LEVEL: Record<string, { dot: string; chip: string }> = {
  Beginner:     { dot: "bg-emerald-500", chip: "border-emerald-300 bg-emerald-50 text-emerald-700" },
  Intermediate: { dot: "bg-amber-500",   chip: "border-amber-300 bg-amber-50 text-amber-700" },
  Advanced:     { dot: "bg-rose-500",    chip: "border-rose-300 bg-rose-50 text-rose-700" },
  SOC:          { dot: "bg-violet-500",  chip: "border-violet-300 bg-violet-50 text-violet-700" },
};

const WHO = [
  { t: "Complete beginners", d: "Never touched AWS or security? Stage 1 assumes nothing." },
  { t: "Developers & IT pros", d: "Add cloud-security skills employers test for — with labs to prove them." },
  { t: "Career switchers", d: "The hands-on path into cloud or security, from any background." },
];

export default function StartHerePage() {
  const KW = ["Cloud", "AWS", "Training", "IAM", "Career"];
  const matched = KW.length
    ? BLOG_POSTS.filter((p) => KW.some((k) => p.category.toLowerCase().includes(k.toLowerCase())))
    : [];
  const rest = BLOG_POSTS.filter((p) => !matched.includes(p));
  const posts = [...matched, ...rest].slice(0, 6);

  return (
    <>
      <SchemaOrg schema={PAGE_SCHEMA} />

      {/* ── Two-column hero — fills full width ───────────────────────── */}
      <section className="relative isolate overflow-hidden border-b border-line">
        <div className="aurora absolute inset-0 -z-10" />
        <div className="cyber-grid absolute inset-0 -z-10" />
        <Container className="py-6 sm:py-8">
          <div className="grid items-center gap-8 lg:grid-cols-2">
            {/* Left: headline + CTAs */}
            <Reveal>
              <span className="inline-flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-bright">
                <span className="h-1 w-1 rounded-full bg-brand" />
                Start here
              </span>
              <h1 className="mt-4 text-3xl font-extrabold leading-tight tracking-tight text-fg sm:text-4xl">
                Learn <span className="text-gradient">cloud security</span> — a hands-on roadmap, not a reading list.
              </h1>
              <p className="mt-3 text-base leading-7 text-muted">
                A clear path from zero to job-ready, where every step is a real lab in a real AWS console. Pick your stage below and start — your first lab is free.
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <Button href={`${SITE.startUrl}&level=Beginner`}>
                  Start free — Stage 1
                  <ArrowRight className="h-4 w-4" />
                </Button>
                <Button href="/labs" variant="secondary">
                  Browse all labs
                </Button>
              </div>
            </Reveal>

            {/* Right: who it's for */}
            <Reveal delay={80}>
              <div className="grid gap-3">
                {WHO.map((w) => (
                  <div key={w.t} className="rounded-xl border border-line bg-panel/80 px-5 py-4 backdrop-blur-sm">
                    <p className="text-sm font-bold text-fg">{w.t}</p>
                    <p className="mt-0.5 text-sm text-muted">{w.d}</p>
                  </div>
                ))}
                <div className="flex items-start gap-3 rounded-xl border border-brand/20 bg-brand/5 px-5 py-4">
                  <Shield className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                  <p className="text-sm text-muted">
                    <span className="font-semibold text-fg">No AWS account needed.</span> Every lab runs in an isolated managed environment — just a browser.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* ── 4 roadmap stage cards — immediately visible ───────────────── */}
      <section className="border-b border-line py-6 sm:py-8">
        <Container>
          <ol className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {ROADMAP.map((s, i) => {
              const lv = LEVEL[s.level];
              return (
                <Reveal key={s.step} delay={i * 70} as="li" className="h-full">
                  <Card className="flex h-full flex-col p-5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-r from-brand to-cyan text-sm font-extrabold text-white">
                        {s.step}
                      </span>
                      <span className="text-sm font-semibold text-muted">{s.time}</span>
                    </div>

                    <span className={`mt-3 inline-flex w-fit items-center gap-1.5 rounded-md border px-2 py-0.5 text-[11px] font-bold uppercase tracking-wide ${lv.chip}`}>
                      <span className={`h-1.5 w-1.5 rounded-full ${lv.dot}`} />
                      {s.level === "SOC" ? "SOC track" : `${s.level} labs`}
                    </span>
                    <h3 className="mt-2 text-base font-bold text-fg">{s.title}</h3>
                    <p className="mt-1.5 text-sm leading-6 text-muted">{s.goal}</p>

                    <ul className="mt-3 space-y-2">
                      {s.skills.map((sk) => (
                        <li key={sk} className="flex items-start gap-2 text-sm text-fg/85">
                          <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand" />
                          <span>{sk}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="mt-auto pt-5">
                      <Button
                        href={s.track === "aws" ? `/labs-wizard?track=aws&level=${s.level}` : "/labs-wizard?track=soc"}
                        variant={i === 0 ? "primary" : "secondary"}
                        className="w-full justify-center whitespace-nowrap"
                      >
                        {i === 0 ? "Start free" : `Start ${s.level === "SOC" ? "SOC" : s.level.toLowerCase()}`}
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </Card>
                </Reveal>
              );
            })}
          </ol>
        </Container>
      </section>

      {/* ── Where it gets you ─────────────────────────────────────────── */}
      <section className="border-b border-line py-6 sm:py-8">
        <Container>
          <Reveal className="mb-5 flex flex-wrap items-baseline justify-between gap-2">
            <h2 className="text-xl font-extrabold tracking-tight text-fg sm:text-2xl">Where this roadmap gets you</h2>
            <p className="text-sm text-muted">
              New here?{" "}
              <Link href="/blog" className="font-semibold text-brand-bright">
                Start with the blog
              </Link>
              .
            </p>
          </Reveal>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {ROADMAP_ROLES.map((role, i) => (
              <Reveal key={role} delay={i * 60} className="h-full">
                <div className="flex h-full items-center gap-3 rounded-xl border border-line bg-panel p-4">
                  <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand/10 text-brand-bright">
                    <Cap className="h-4 w-4" />
                  </span>
                  <span className="text-sm font-semibold text-fg">{role}</span>
                </div>
              </Reveal>
            ))}
          </div>
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

      <CtaBand
        title="Start Stage 1 — free"
        subtitle="Your first cloud security lab is on us. No account, no setup — just a browser."
        primary={{ label: "Start free lab", href: SITE.startUrl }}
      />
    </>
  );
}
