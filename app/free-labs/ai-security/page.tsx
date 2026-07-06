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
import { ArrowRight, Check, Flask, Shield } from "@/components/icons";
import { SITE } from "@/lib/site";

const PAGE_URL = `${SITE.url}/free-labs/ai-security`;
const LAUNCH_URL =
  "https://labs.shieldsyncsecurity.com/labs/bedrock-prompt-injection";

export const metadata: Metadata = {
  title: "Free AI Security Lab — Secure a Real Bedrock Assistant, No Credit Card | ShieldSync",
  description:
    "A free, hands-on AI security lab in a real, isolated AWS account. Prompt-inject a live Amazon Bedrock assistant, then lock it down with Guardrails, least-privilege IAM, and model-invocation logging. No credit card, auto-graded, auto-wiped.",
  keywords: [
    "free AI security lab",
    "LLM security lab",
    "prompt injection lab",
    "Amazon Bedrock security",
    "Bedrock Guardrails",
    "GenAI security hands-on",
    "AI red teaming lab",
  ],
  alternates: { canonical: "/free-labs/ai-security" },
  openGraph: {
    title: "Free AI Security Lab — Secure a Real Bedrock Assistant, No Credit Card",
    description:
      "Prompt-inject a live Amazon Bedrock assistant, then lock it down with Guardrails, least-privilege, and logging. Free, no card, auto-graded.",
    url: PAGE_URL,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free AI Security Lab — Secure a Real Bedrock Assistant, No Credit Card",
    description:
      "Prompt-inject a live Bedrock assistant, then fix it with Guardrails, least-privilege & logging. Free, auto-graded.",
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
    d: "We provision an isolated AWS account with a deliberately-insecure Amazon Bedrock assistant already deployed.",
  },
  {
    n: "3",
    t: "~35 min hands-on, then auto-wipe",
    d: "Break it, then fix it, click 'Check my work,' get graded. The account is wiped — zero AWS bill.",
  },
];

const DIFFS = [
  {
    icon: Flask,
    t: "A real Amazon Bedrock assistant",
    d: "Not a chatbot mockup. You're attacking a live Lambda that calls Amazon Bedrock (Nova Lite) in a real AWS account.",
  },
  {
    icon: Check,
    t: "Grader checks your live config",
    d: "The auto-grader inspects your real AWS state: the Guardrail, the scoped invoke role, and model-invocation logging.",
  },
  {
    icon: Shield,
    t: "Auto-wipe, no setup, no bill",
    d: "Zero setup on your side. When the session ends the account and everything in it is destroyed — you never see a bill.",
  },
];

// Kept concise (4) — the top objections only. Also feeds the FAQ rich-result schema.
const FAQS = [
  {
    q: "Is it really free? What's the catch?",
    a: "Yes — this AI security lab is fully free, no credit card. We cover the AWS and Bedrock cost. Free seats are rate-limited, so at busy times you may wait a minute.",
  },
  {
    q: "Do I need my own AWS account or Bedrock access?",
    a: "No. We provision a dedicated, isolated AWS account with Bedrock already set up. Sign in with Google, click Launch, and you're in the AWS Console in about 30 seconds.",
  },
  {
    q: "Do I need to know how LLMs work?",
    a: "No — it's a Beginner lab. You'll see first-hand how a prompt injection leaks data the assistant was told to hide, then follow guided steps to attach a Guardrail, scope the IAM role, and enable logging.",
  },
  {
    q: "What happens to my data when the lab ends?",
    a: "The entire AWS account is destroyed at session end — the Lambda, the Guardrail, every log. Nothing persists. Re-launch any time for a fresh environment.",
  },
];

export default function FreeAiSecurityLabPage() {
  const breadcrumbs = [
    { name: "Home", url: SITE.url },
    { name: "Free Labs", url: `${SITE.url}/free-labs` },
    { name: "Free AI Security Lab", url: PAGE_URL },
  ];

  return (
    <>
      <SchemaOrg
        schema={[
          webPageSchema({
            url: PAGE_URL,
            name: "Free AI Security Lab — Secure a Real Bedrock Assistant",
            description:
              "A free, hands-on AI security lab in a real, isolated AWS account. Prompt-inject a live Amazon Bedrock assistant, then lock it down with Guardrails, least-privilege IAM, and model-invocation logging. No credit card, auto-graded, auto-wiped.",
            breadcrumb: breadcrumbs,
          }),
          breadcrumbSchema(PAGE_URL, breadcrumbs),
          faqSchema(FAQS),
          courseSchema({
            url: PAGE_URL,
            name: "Free AI Security Lab — Secure a Bedrock Assistant (Prompt Injection & Guardrails)",
            description:
              "Hands-on AI security lab in a real, isolated AWS account. Prompt-inject an Amazon Bedrock support assistant to leak restricted data, then fix it: attach a Bedrock Guardrail, scope the invoke role to least privilege, and enable model-invocation logging — all verified by an auto-grader.",
            level: "Beginner",
            hoursMin: 35,
            free: true,
          }),
        ]}
      />

      {/* Hero: pitch + CTA left, the three "not a simulator" differentiators right. */}
      <section className="relative isolate overflow-hidden border-b border-line">
        <div className="aurora absolute inset-0 -z-10" />
        <div className="cyber-grid absolute inset-0 -z-10" />

        <Container className="grid gap-8 py-7 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:py-10">
          <Reveal>
            <span className="inline-flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-bright">
              <span className="h-1 w-1 rounded-full bg-brand" />
              Free · Real AWS Bedrock · ~35 min
            </span>

            <h1 className="mt-3 text-2xl font-bold tracking-tight text-fg sm:text-3xl lg:text-4xl">
              Free AI security lab on a real Bedrock assistant
            </h1>

            <p className="mt-3 max-w-xl text-base leading-7 text-muted">
              Launch a hands-on lab in your own isolated AWS account: prompt-inject a live LLM
              support assistant into leaking its secrets, then lock it down with Bedrock Guardrails,
              least-privilege IAM, and model-invocation logging — graded against your live AWS config.
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
            <SectionHeading eyebrow="How it works" title="Three steps to a live Bedrock assistant" />
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
      <FaqSection faqs={FAQS} title="Free AI lab — questions people ask" />

      {/* Final CTA */}
      <CtaBand
        title="Launch your free AI security lab now"
        subtitle="A real Bedrock assistant in an isolated AWS account. No credit card. Auto-graded. Auto-wiped."
        primary={{ label: "Start free lab", href: LAUNCH_URL }}
        primaryCaption="Google sign-in · no card · live in ~60 seconds"
        secondary={{ label: "Explore all free labs", href: "/free-labs" }}
      />
    </>
  );
}
