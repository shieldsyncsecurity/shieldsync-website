import type { Metadata } from "next";
import Link from "next/link";
import { Container, Button } from "@/components/ui";
import { Reveal } from "@/components/reveal";
import { CtaBand } from "@/components/sections";
import { SchemaOrg } from "@/components/schema-org";
import { webPageSchema, breadcrumbSchema } from "@/lib/schema";
import { ArrowRight, Cloud, Flask, Check } from "@/components/icons";
import { SITE } from "@/lib/site";

const PAGE_URL = `${SITE.url}/free-labs`;

export const metadata: Metadata = {
  title: "Free Hands-on Security Labs — Real Cloud Accounts, No Credit Card | ShieldSync",
  description:
    "Free hands-on security labs in real, isolated cloud accounts. Start with the AWS S3 misconfiguration lab; AI security labs coming next. No credit card, auto-graded, auto-wiped.",
  keywords: [
    "free security labs",
    "free hands-on security lab",
    "free AWS security lab",
    "free AI security lab",
    "free cloud security lab",
  ],
  alternates: { canonical: "/free-labs" },
  openGraph: {
    title: "Free Hands-on Security Labs — Real Cloud Accounts, No Credit Card",
    description:
      "Free hands-on security labs in real, isolated cloud accounts. Start with AWS S3; AI security next. No card, auto-graded.",
    url: PAGE_URL,
    type: "website",
  },
};

// Each free lab gets its own landing page under /free-labs/<slug>. `ready:false`
// renders a "Coming soon" card (no link) — flip to true + add the page when it ships.
const FREE_LABS = [
  {
    href: "/free-labs/aws-security",
    icon: Cloud,
    tag: "AWS · Beginner · 30 min",
    title: "AWS Security — S3 misconfiguration audit",
    desc: "Find the public S3 bucket, fix over-broad IAM, enforce KMS — graded against your live AWS state.",
    ready: true,
  },
  {
    href: "/free-labs/ai-security",
    icon: Flask,
    tag: "AI · Beginner · ~35 min",
    title: "AI Security — secure a Bedrock assistant",
    desc: "Prompt-inject an LLM support assistant, then lock it down with Guardrails, least-privilege, and logging.",
    ready: false,
  },
];

export default function FreeLabsHubPage() {
  const breadcrumbs = [
    { name: "Home", url: SITE.url },
    { name: "Free Labs", url: PAGE_URL },
  ];

  return (
    <>
      <SchemaOrg
        schema={[
          webPageSchema({
            url: PAGE_URL,
            name: "Free Hands-on Security Labs",
            description:
              "Free hands-on security labs in real, isolated cloud accounts. AWS S3 misconfiguration lab live; AI security labs coming next.",
            breadcrumb: breadcrumbs,
          }),
          breadcrumbSchema(PAGE_URL, breadcrumbs),
        ]}
      />

      <section className="relative isolate overflow-hidden border-b border-line">
        <div className="aurora absolute inset-0 -z-10" />
        <div className="cyber-grid absolute inset-0 -z-10" />
        <Container className="py-8 lg:py-12">
          <Reveal>
            <span className="inline-flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-bright">
              <span className="h-1 w-1 rounded-full bg-brand" />
              Free · Real cloud accounts · No card
            </span>
            <h1 className="mt-3 max-w-2xl text-3xl font-extrabold tracking-tight text-fg sm:text-4xl lg:text-5xl">
              Free hands-on security labs
            </h1>
            <p className="mt-3 max-w-xl text-base leading-7 text-muted">
              Each lab spins up its own real, isolated cloud account, hands you the actual console, grades
              your fixes against live state, and wipes it clean when you&apos;re done. No setup, no bill.
            </p>
          </Reveal>

          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            {FREE_LABS.map((lab, i) => {
              const Icon = lab.icon;
              const inner = (
                <>
                  <div className="flex items-center justify-between gap-3">
                    <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-brand/25 bg-brand/10 text-brand-bright">
                      <Icon className="h-6 w-6" />
                    </span>
                    {lab.ready ? (
                      <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-[11px] font-bold text-emerald-700">
                        FREE · LIVE
                      </span>
                    ) : (
                      <span className="rounded-full bg-amber-500/15 px-2.5 py-0.5 text-[11px] font-bold text-amber-600">
                        Coming soon
                      </span>
                    )}
                  </div>
                  <p className="mt-4 font-mono text-[11px] font-semibold uppercase tracking-wide text-muted">{lab.tag}</p>
                  <h2 className="mt-1 text-lg font-bold text-fg">{lab.title}</h2>
                  <p className="mt-2 text-sm leading-6 text-muted">{lab.desc}</p>
                  {lab.ready ? (
                    <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-bright">
                      Start free <ArrowRight className="h-4 w-4" />
                    </span>
                  ) : (
                    <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-muted">
                      In development
                    </span>
                  )}
                </>
              );
              return lab.ready ? (
                <Reveal key={lab.href} delay={i * 80}>
                  <Link
                    href={lab.href}
                    className="flex h-full flex-col rounded-2xl border border-line bg-panel p-6 transition hover:border-brand"
                  >
                    {inner}
                  </Link>
                </Reveal>
              ) : (
                <Reveal key={lab.href} delay={i * 80}>
                  <div className="flex h-full flex-col rounded-2xl border border-line bg-panel/60 p-6 opacity-75">
                    {inner}
                  </div>
                </Reveal>
              );
            })}
          </div>

          <p className="mt-6 flex items-center gap-2 text-sm text-muted">
            <Check className="h-4 w-4 shrink-0 text-brand-bright" />
            No AWS account, no install, no credit card — just a browser.
          </p>
        </Container>
      </section>

      <CtaBand
        title="Start with the free AWS security lab"
        subtitle="Real isolated AWS account in 30 seconds. No credit card. Auto-graded. Auto-wiped."
        primary={{ label: "Start free AWS lab", href: "/free-labs/aws-security" }}
        secondary={{ label: "Browse all AWS labs", href: "/labs" }}
      />
    </>
  );
}
