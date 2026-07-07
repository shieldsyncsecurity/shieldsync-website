import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { Container, Button } from "@/components/ui";
import { Reveal } from "@/components/reveal";
import { SchemaOrg } from "@/components/schema-org";
import { RelatedBlogSection } from "@/components/related-blog-section";
import { webPageSchema, breadcrumbSchema } from "@/lib/schema";
import { ArrowRight, Radar, Flask, Shield } from "@/components/icons";
import { SOC_LABS, SITE } from "@/lib/site";
import { SocWaitlistForm } from "@/components/soc-waitlist-form";
import { productBadgeClass } from "@/components/status-badge";

export const metadata: Metadata = {
  title: "SOC Labs — SIEM & SOAR, Hands-on (Detection & Response)",
  description:
    "Hands-on SOC labs: build detections, hunt threats, and automate response in managed SIEM and SOAR environments. No account, no setup — just a browser.",
  alternates: { canonical: "/soc-labs" },
};

const SOC_START = "#waitlist";
const PAGE_URL = `${SITE.url}/soc-labs`;
const PAGE_SCHEMA = [
  webPageSchema({
    url: PAGE_URL,
    name: "SOC Labs — SIEM & SOAR — ShieldSync Security",
    description: "Hands-on detection-and-response labs across SIEM and SOAR, in managed environments.",
    dateModified: "2026-06-29",
    breadcrumb: [
      { name: "Home", url: SITE.url },
      { name: "Hands-on Labs", url: `${SITE.url}/aws-security-labs` },
      { name: "SOC Labs", url: PAGE_URL },
    ],
  }),
  breadcrumbSchema(PAGE_URL, [
    { name: "Home", url: SITE.url },
    { name: "Hands-on Labs", url: `${SITE.url}/labs` },
    { name: "SOC Labs", url: PAGE_URL },
  ]),
];

const GROUPS = [
  {
    key: "SIEM",
    img: "/labs/siem.webp",
    alt: "SIEM detection labs",
    title: "SIEM — detection & log analysis",
    blurb: "Build high-signal detections, hunt through telemetry, and turn noisy logs into alerts that actually matter.",
    badge: "border-emerald-400/50 bg-emerald-600/80",
    border: "border-emerald-400/60",
    labelColor: productBadgeClass("SIEM"),
    icon: Radar,
  },
  {
    key: "SOAR",
    img: "/labs/soar.webp",
    alt: "SOAR automation labs",
    title: "SOAR — automated response",
    blurb: "Wire detections to automated playbooks, auto-enrich alerts, and cut mean-time-to-respond to minutes.",
    badge: "border-violet-400/50 bg-violet-600/80",
    border: "border-violet-400/60",
    labelColor: productBadgeClass("SOAR"),
    icon: Flask,
  },
] as const;

export default function SocLabsPage() {
  return (
    <>
      <SchemaOrg schema={PAGE_SCHEMA} />

      {/* ── Compact hero ─────────────────────────────────────────────── */}
      <section className="relative isolate overflow-hidden border-b border-line">
        <div className="aurora absolute inset-0 -z-10" />
        <div className="cyber-grid absolute inset-0 -z-10" />
        <Container className="py-6 sm:py-8">
          <Reveal>
            <span className="inline-flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-bright">
              <span className="h-1 w-1 rounded-full bg-brand" />
              SOC track — coming soon
            </span>
            <h1 className="mt-4 text-2xl font-bold tracking-tight text-fg sm:text-3xl lg:text-4xl">
              Build the <span className="text-gradient">blue team</span> — SIEM &amp; SOAR, hands-on.
            </h1>
            <p className="mt-3 max-w-2xl text-base leading-7 text-muted">
              Investigate real telemetry, write detections that fire, and automate the response — all in managed environments you launch from a browser. No setup, no servers.
            </p>
            <div className="mt-5 flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center rounded-lg border border-amber-300 bg-amber-50 px-3 py-1.5 text-sm font-bold text-amber-700">
                In development
              </span>
              <Button href={SOC_START} variant="secondary">
                Get notified when live
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button href="/labs-wizard?track=aws">
                Try the AWS track now
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </Reveal>

          <Reveal delay={80}>
            <div className="mt-6 max-w-xl">
              <p className="mb-2 text-sm font-semibold text-fg">
                Join the SOC labs waitlist — first access at launch
              </p>
              <SocWaitlistForm />
            </div>
          </Reveal>
        </Container>
      </section>

      {/* ── SIEM + SOAR cards + "safe to practice" in one section ────── */}
      <section className="py-8 sm:py-10">
        <Container className="grid gap-8">

          {/* Two track cards */}
          <div className="grid gap-5 lg:grid-cols-2">
            {GROUPS.map((g, gi) => {
              const labs = SOC_LABS.filter((l) => l.product === g.key);
              const Icon = g.icon;
              return (
                <Reveal key={g.key} delay={gi * 80}>
                  <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-panel shadow-sm">
                    <div className="relative aspect-video overflow-hidden border-b border-line">
                      <Image src={g.img} alt={g.alt} fill sizes="(min-width:1024px) 45vw, 100vw" className="object-cover" />
                      <span
                        className={`absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-md border px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-white ${g.badge}`}
                      >
                        <Icon className="h-3.5 w-3.5" /> {g.key}
                      </span>
                    </div>
                    <div className="flex flex-1 flex-col p-6">
                      <h2 className="text-lg font-bold text-fg">{g.title}</h2>
                      <p className="mt-1.5 text-sm leading-6 text-muted">{g.blurb}</p>
                      <ul className="mt-4 grid gap-2">
                        {labs.map((l) => (
                          <li key={l.slug} className={`border-l-2 pl-3 ${g.border}`}>
                            <Link href={`/labs/${l.slug}`} className="text-sm font-semibold text-fg transition hover:text-brand-bright">
                              {l.title}
                            </Link>
                            <p className="text-xs leading-5 text-muted">{l.desc}</p>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>

          {/* "Safe to practice" strip */}
          <Reveal>
            <div className="flex flex-col items-start gap-4 rounded-2xl border border-line bg-surface p-6 sm:flex-row sm:items-center">
              <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-brand/25 bg-brand/10 text-brand-bright">
                <Shield className="h-5 w-5" />
              </span>
              <div>
                <h2 className="text-base font-extrabold text-fg">Real telemetry, zero setup</h2>
                <p className="mt-1 text-sm leading-6 text-muted">
                  No servers to stand up, no agents to install. Each lab spins up a managed detection-and-response environment pre-loaded with realistic telemetry — wiped clean when you&apos;re done.
                </p>
              </div>
            </div>
          </Reveal>

          {/* Bottom CTA row */}
          <Reveal>
            <div className="flex flex-wrap items-center gap-3 border-t border-line pt-6">
              <p className="text-sm text-muted">AWS cloud security labs are live now while SOC is in development.</p>
              <Button href="/free-labs/aws-security">
                Start a free AWS lab
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button href={SOC_START} variant="secondary">
                Get notified for SOC
              </Button>
            </div>
          </Reveal>

        </Container>
      </section>

      <RelatedBlogSection keywords={["SOC", "SIEM", "SOAR", "Detection", "Incident"]} />
    </>
  );
}
