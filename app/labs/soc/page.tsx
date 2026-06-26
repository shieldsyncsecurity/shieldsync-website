import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { Container, Button } from "@/components/ui";
import { Reveal } from "@/components/reveal";
import { CtaBand, PageHero } from "@/components/sections";
import { SchemaOrg } from "@/components/schema-org";
import { webPageSchema, breadcrumbSchema } from "@/lib/schema";
import { ArrowRight, Radar, Flask, Shield } from "@/components/icons";
import { SOC_LABS, SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "SOC Labs — SIEM & SOAR, Hands-on (Detection & Response)",
  description:
    "Hands-on SOC labs: build detections, hunt threats, and automate response in managed SIEM and SOAR environments. No account, no setup — just a browser.",
  alternates: { canonical: "/labs/soc" },
};

// SOC (SIEM/SOAR) labs are in development — CTAs point to the notify/contact page,
// not the (non-functional) SOC wizard funnel.
const SOC_START = "/contact";
const PAGE_URL = `${SITE.url}/labs/soc`;
const PAGE_SCHEMA = [
  webPageSchema({
    url: PAGE_URL,
    name: "SOC Labs — SIEM & SOAR — ShieldSync Security",
    description: "Hands-on detection-and-response labs across SIEM and SOAR, in managed environments.",
    dateModified: "2026-06-06",
    breadcrumb: [
      { name: "Home", url: SITE.url },
      { name: "Hands-on Labs", url: `${SITE.url}/labs` },
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
    icon: Flask,
  },
] as const;

export default function SocLabsPage() {
  return (
    <>
      <SchemaOrg schema={PAGE_SCHEMA} />

      <PageHero
        eyebrow="SOC track"
        title={
          <>
            Build the <span className="text-gradient">blue team</span> — SIEM &amp; SOAR, hands-on.
          </>
        }
        description="Round out cloud security with the detection-and-response skills every SOC runs on. Investigate real telemetry, write detections that fire, and automate the response — all in managed environments you launch from a browser."
      />

      {/* SIEM + SOAR */}
      <section className="border-b border-line py-14 sm:py-20">
        <Container>
          <div className="grid gap-6 lg:grid-cols-2">
            {GROUPS.map((g, gi) => {
              const labs = SOC_LABS.filter((l) => l.product === g.key);
              const Icon = g.icon;
              return (
                <Reveal key={g.key} delay={gi * 90}>
                  <div className="flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-panel shadow-sm">
                    <div className="relative aspect-video overflow-hidden border-b border-line">
                      <Image src={g.img} alt={g.alt} fill sizes="(min-width:1024px) 45vw, 100vw" className="object-cover" />
                      <span
                        className={`absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-md border px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-white ${g.badge}`}
                      >
                        <Icon className="h-3.5 w-3.5" /> {g.key}
                      </span>
                    </div>
                    <div className="flex flex-1 flex-col p-7 sm:p-8">
                      <h2 className="text-xl font-bold text-fg sm:text-2xl">{g.title}</h2>
                      <p className="mt-2 text-base leading-7 text-muted">{g.blurb}</p>
                      <ul className="mt-5 grid flex-1 gap-3">
                        {labs.map((l) => (
                          <li key={l.slug} className={`border-l-2 pl-3 ${g.border}`}>
                            <Link href={`/labs/${l.slug}`} className="font-semibold text-fg transition hover:text-brand-bright">
                              {l.title}
                            </Link>
                            <p className="text-sm leading-6 text-muted">{l.desc}</p>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>

          <Reveal>
            <div className="mt-10 flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center rounded-xl border border-amber-400/40 bg-amber-500/10 px-4 py-2.5 text-sm font-bold text-amber-700">
                Coming soon — in development
              </span>
              <Button href={SOC_START}>
                Get notified
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Safe to practice */}
      <section className="border-b border-line py-14 sm:py-18">
        <Container>
          <Reveal>
            <div className="flex flex-col items-start gap-6 rounded-3xl border border-line bg-surface p-8 sm:flex-row sm:items-center sm:p-10">
              <span className="inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-brand/25 bg-brand/10 text-brand-bright">
                <Shield className="h-7 w-7" />
              </span>
              <div>
                <h2 className="text-2xl font-extrabold tracking-tight text-fg">Real telemetry, zero setup</h2>
                <p className="mt-2 text-base leading-7 text-muted">
                  No servers to stand up, no agents to install, nothing to configure. Each lab spins up a managed
                  detection-and-response environment in your browser, pre-loaded with realistic telemetry to
                  investigate — and it&apos;s wiped clean when you&apos;re done.
                </p>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      <CtaBand
        title="SOC labs are coming soon"
        subtitle="Our SIEM & SOAR labs are in development. Want first access when they launch? The AWS track is live now."
        primary={{ label: "Get notified", href: SOC_START }}
      />
    </>
  );
}
