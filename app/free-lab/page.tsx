import type { Metadata } from "next";
import { Container, Card, Button, SectionHeading } from "@/components/ui";
import { Reveal } from "@/components/reveal";
import { FaqSection, CtaBand } from "@/components/sections";
import { SchemaOrg } from "@/components/schema-org";
import {
  webPageSchema,
  breadcrumbSchema,
  faqSchema,
  courseSchema,
} from "@/lib/schema";
import { ArrowRight, Check, Cloud, Shield } from "@/components/icons";
import { SITE } from "@/lib/site";

const PAGE_URL = `${SITE.url}/free-lab`;
const LAUNCH_URL =
  "https://labs.shieldsyncsecurity.com/labs/s3-misconfiguration-audit?intent=launch";

export const metadata: Metadata = {
  title: "Free AWS Security Lab — Real Isolated AWS Account, No Credit Card | ShieldSync",
  description:
    "A 30-minute free AWS security lab in a real, isolated AWS account. Spot public S3 buckets, fix IAM, enforce KMS. No credit card, no setup, auto-wiped.",
  keywords: [
    "free AWS security lab",
    "free AWS hands-on",
    "free cloud security lab",
    "AWS S3 security lab",
    "free AWS sandbox",
    "AWS security practice free",
    "hands-on AWS security",
  ],
  alternates: { canonical: "/free-lab" },
  openGraph: {
    title: "Free AWS Security Lab — Real Isolated AWS Account, No Credit Card",
    description:
      "30 minutes in a real, isolated AWS account. Find the misconfigured S3 bucket, fix IAM, enforce KMS. Free, no card, auto-graded.",
    url: PAGE_URL,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free AWS Security Lab — Real Isolated AWS Account, No Credit Card",
    description:
      "30 min in a real AWS account. Find public S3, fix IAM, enforce KMS. Free, auto-graded.",
  },
};

const STEPS = [
  {
    n: "1",
    t: "Sign in with Google",
    d: "No forms, no credit card. One click and you're in.",
  },
  {
    n: "2",
    t: "Get a real AWS account in ~30 seconds",
    d: "We provision an isolated AWS account just for you, with the broken S3 scenario pre-seeded.",
  },
  {
    n: "3",
    t: "30 min hands-on, then auto-wipe",
    d: "Fix the misconfigurations, click 'Check my work,' get graded. Account is wiped — zero AWS bill.",
  },
];

const DIFFS = [
  {
    icon: Cloud,
    t: "Real isolated AWS account",
    d: "Not a simulator. Not a video. You're clicking inside the actual AWS Console with real S3, IAM, and KMS.",
  },
  {
    icon: Check,
    t: "Grader checks your live state",
    d: "The auto-grader hits the AWS APIs against your account and verifies the fix actually works.",
  },
  {
    icon: Shield,
    t: "Auto-wipe, no setup, no bill",
    d: "Zero AWS setup on your side. When the session ends the account is destroyed — you never see a bill.",
  },
];

// Kept concise (4) — the top objections only. Also feeds the FAQ rich-result schema.
const FAQS = [
  {
    q: "Is it really free? What's the catch?",
    a: "Yes — the first AWS S3 security lab is fully free, no credit card. We cover the AWS cost. Free seats are rate-limited, so at busy times you may wait a minute. Paid labs unlock the rest of the catalog (IAM, KMS, VPC, GuardDuty, CloudTrail).",
  },
  {
    q: "Do I need my own AWS account?",
    a: "No. We provision a dedicated, isolated AWS account for your session. Sign in with Google, click Launch, and you're in the AWS Console in about 30 seconds.",
  },
  {
    q: "What happens to my data when the lab ends?",
    a: "The entire AWS account is destroyed at session end — every bucket, role, and log. Nothing persists. Re-launch any time for a fresh environment.",
  },
  {
    q: "Can I retry if I get stuck or fail the grader?",
    a: "Yes. Re-run the grader as many times as you like in a session, and re-launch a fresh lab whenever you want a clean account to try again.",
  },
];

export default function FreeLabPage() {
  const breadcrumbs = [
    { name: "Home", url: SITE.url },
    { name: "Free AWS Security Lab", url: PAGE_URL },
  ];

  return (
    <>
      <SchemaOrg
        schema={[
          webPageSchema({
            url: PAGE_URL,
            name: "Free AWS Security Lab — Real Isolated AWS Account",
            description:
              "A 30-minute free AWS security lab in a real, isolated AWS account. Spot public S3 buckets, fix IAM, enforce KMS. No credit card, auto-graded, auto-wiped.",
            breadcrumb: breadcrumbs,
          }),
          breadcrumbSchema(PAGE_URL, breadcrumbs),
          faqSchema(FAQS),
          courseSchema({
            url: PAGE_URL,
            name: "Free AWS S3 Security Lab — Misconfiguration Audit",
            description:
              "Hands-on AWS S3 security lab in a real, isolated AWS account. Identify and fix public buckets, over-broad IAM, and missing KMS encryption, then verify your fixes with an auto-grader.",
            level: "Beginner",
            hoursMin: 30,
            free: true,
          }),
        ]}
      />

      {/* Hero: pitch + CTA left, the three "not a simulator" differentiators right. */}
      <section className="relative isolate overflow-hidden border-b border-line">
        <div className="aurora absolute inset-0 -z-10" />
        <div className="cyber-grid absolute inset-0 -z-10" />

        <Container className="grid gap-8 py-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:py-12">
          <Reveal>
            <span className="inline-flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-bright">
              <span className="h-1 w-1 rounded-full bg-brand" />
              Free · Real AWS · 30 min
            </span>

            <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-fg sm:text-4xl lg:text-5xl">
              Free AWS Security Lab — Real Isolated AWS Account, No Credit Card
            </h1>

            <p className="mt-3 max-w-xl text-base leading-7 text-muted">
              Launch a 30-minute hands-on lab in your own isolated AWS account. Find the
              misconfigured S3 bucket, fix IAM, enforce KMS — graded against your live AWS state.
            </p>

            <div className="mt-5 flex flex-col items-start gap-1.5">
              <Button href={LAUNCH_URL} external newTab>
                Start free lab
                <ArrowRight className="h-4 w-4" />
              </Button>
              <p className="text-xs text-muted">Google sign-in · no card · live in ~60 seconds</p>
            </div>
          </Reveal>

          <Reveal delay={140}>
            <div className="rounded-3xl border border-line bg-panel p-5 shadow-xl shadow-slate-900/5">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">
                Not a simulator
              </p>
              <div className="mt-4 flex flex-col gap-4">
                {DIFFS.map((d) => {
                  const Icon = d.icon;
                  return (
                    <div key={d.t} className="flex items-start gap-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand/10">
                        <Icon className="h-5 w-5 text-brand-bright" />
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-fg">{d.t}</h3>
                        <p className="mt-1 text-xs leading-5 text-muted">{d.d}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* How it works — the low-friction reassurance (fast, easy, no bill). */}
      <section className="border-b border-line py-6 sm:py-8">
        <Container>
          <Reveal>
            <SectionHeading eyebrow="How it works" title="Three steps to a real AWS Console" />
          </Reveal>
          <div className="mt-5 grid gap-4 sm:grid-cols-3">
            {STEPS.map((s) => (
              <Card key={s.n} className="p-5">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand/10 font-mono text-sm font-bold text-brand-bright">
                  {s.n}
                </div>
                <h3 className="mt-3 text-base font-bold text-fg">{s.t}</h3>
                <p className="mt-2 text-sm leading-6 text-muted">{s.d}</p>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* FAQ — top objections only. */}
      <FaqSection faqs={FAQS} title="Free AWS lab — questions people ask" />

      {/* Final CTA */}
      <CtaBand
        title="Launch your free AWS security lab now"
        subtitle="Real isolated AWS account in 30 seconds. No credit card. Auto-graded. Auto-wiped."
        primary={{ label: "Start free lab", href: LAUNCH_URL }}
        primaryCaption="Google sign-in · no card · live in ~60 seconds"
        secondary={{ label: "Browse all AWS labs", href: "/labs" }}
      />
    </>
  );
}
