import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { Container, Button, Card, Pill, SectionHeading } from "@/components/ui";
import { Reveal } from "@/components/reveal";
import { CtaBand, FaqSection, PageHero } from "@/components/sections";
import { SchemaOrg } from "@/components/schema-org";
import { webPageSchema, breadcrumbSchema, faqSchema } from "@/lib/schema";
import { ArrowRight, Cloud, Radar, Flask } from "@/components/icons";
import { AWS_LABS, FAQS, SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Hands-on AWS Security Labs + SOC (SIEM & SOAR)",
  description:
    "Practice cloud security in real, managed AWS environments — our flagship. Plus a full SOC track: SIEM and SOAR. No setup, just a browser.",
};

const PAGE_URL = `${SITE.url}/labs`;
const PAGE_SCHEMA = [
  webPageSchema({
    url: PAGE_URL,
    name: "Hands-on AWS Security Labs + SOC — ShieldSync Security",
    description:
      "Real, managed cyber ranges. AWS cloud security is the flagship; SIEM and SOAR complete the SOC skill set.",
    dateModified: "2026-06-04",
    breadcrumb: [
      { name: "Home", url: SITE.url },
      { name: "Hands-on Labs", url: PAGE_URL },
    ],
  }),
  breadcrumbSchema(PAGE_URL, [
    { name: "Home", url: SITE.url },
    { name: "Hands-on Labs", url: PAGE_URL },
  ]),
  faqSchema(FAQS.labs),
];

const LEVEL: Record<string, string> = {
  Beginner: "border-emerald-300 bg-emerald-50 text-emerald-700",
  Intermediate: "border-amber-300 bg-amber-50 text-amber-700",
  Advanced: "border-rose-300 bg-rose-50 text-rose-700",
};

export default function LabsPage() {
  return (
    <>
      <SchemaOrg schema={PAGE_SCHEMA} />

      <PageHero
        eyebrow="Hands-on labs"
        title={
          <>
            Master cloud security in <span className="text-gradient">real AWS</span> environments.
          </>
        }
        description="Managed, on-demand cyber ranges you launch from a browser — no AWS account, no setup. AWS security is our flagship; SIEM and SOAR complete a full SOC skill set."
      />

      {/* Flagship — AWS Security Labs */}
      <section className="border-b border-line py-14 sm:py-20">
        <Container>
          <Reveal>
            <div className="flex items-center gap-3">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-brand/25 bg-brand/10 text-brand-bright">
                <Cloud className="h-6 w-6" />
              </span>
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-bright">★ Flagship track</p>
                <h2 className="text-2xl font-extrabold tracking-tight text-fg sm:text-3xl">AWS Security Labs</h2>
              </div>
            </div>
          </Reveal>

          <Reveal delay={80}>
            <div className="mt-8 overflow-hidden rounded-3xl border border-line bg-panel shadow-sm">
              <div className="grid lg:grid-cols-[1fr_1.1fr]">
                <div className="relative aspect-video lg:aspect-auto">
                  <Image src="/labs/aws.webp" alt="AWS Security Labs" fill sizes="(min-width:1024px) 45vw, 100vw" className="object-cover" />
                </div>
                <div className="p-8 sm:p-10">
                  <h3 className="text-xl font-bold text-fg">Cloud security the way real teams do it</h3>
                  <p className="mt-3 text-base leading-7 text-muted">
                    Audit and harden real AWS accounts — IAM, S3, encryption, logging, detection — mapped to
                    the attack paths that actually matter. Start free and go deeper at your own pace.
                  </p>
                  <div className="mt-6 flex flex-wrap gap-3">
                    <Button href={SITE.startUrl}>
                      Start free lab
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {AWS_LABS.map((lab, i) => (
              <Reveal key={lab.title} delay={i * 60}>
                <Link href={`/labs/${lab.slug}`} className="group block h-full">
                  <Card className="flex h-full flex-col p-6">
                    <span className={`inline-flex w-fit items-center rounded-md border px-2 py-0.5 text-[11px] font-bold uppercase tracking-wide ${LEVEL[lab.level]}`}>
                      {lab.level}
                    </span>
                    <h3 className="mt-4 text-lg font-semibold text-fg group-hover:text-brand-bright">{lab.title}</h3>
                    <p className="mt-2 flex-1 text-base leading-7 text-muted">{lab.desc}</p>
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {lab.tags.map((t) => (
                        <span key={t} className="rounded-md bg-surface px-2 py-0.5 font-mono text-[11px] text-muted">
                          {t}
                        </span>
                      ))}
                    </div>
                  </Card>
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* SOC — SIEM + SOAR */}
      <section className="border-b border-line py-14 sm:py-20">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="SOC track"
              title="Complete the SOC — SIEM + SOAR"
              description="Round out your cloud skills with the blue-team essentials: detection engineering and automated response — under one roof."
            />
          </Reveal>

          <Reveal>
            <div className="mt-10 flex flex-col items-start justify-between gap-6 rounded-3xl border border-line bg-surface p-8 sm:flex-row sm:items-center sm:p-10">
              <div className="max-w-xl">
                <div className="flex flex-wrap gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-md border border-emerald-300 bg-emerald-50 px-2.5 py-1 text-xs font-bold uppercase tracking-wide text-emerald-700">
                    <Radar className="h-3.5 w-3.5" /> SIEM
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-md border border-violet-300 bg-violet-50 px-2.5 py-1 text-xs font-bold uppercase tracking-wide text-violet-700">
                    <Flask className="h-3.5 w-3.5" /> SOAR
                  </span>
                </div>
                <p className="mt-4 text-base leading-7 text-muted">
                  Round out cloud security with the blue-team essentials — build detections, hunt threats, and
                  automate the response. A full SOC track in managed environments you launch from a browser.
                </p>
              </div>
              <Button href="/labs/soc" className="shrink-0">
                Explore the SOC track
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </Reveal>
        </Container>
      </section>

      <FaqSection faqs={FAQS.labs} title="Labs — frequently asked questions" />

      <CtaBand
        title="Start hands-on, today"
        subtitle="Spin up your first AWS security lab in minutes — your first one is free."
        primary={{ label: "Start free lab", href: SITE.startUrl }}
      />
    </>
  );
}
