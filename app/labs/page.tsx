import Link from "next/link";
import type { Metadata } from "next";
import { Container, Button } from "@/components/ui";
import { Reveal } from "@/components/reveal";
import { FaqSection } from "@/components/sections";
import { SchemaOrg } from "@/components/schema-org";
import { webPageSchema, breadcrumbSchema, faqSchema } from "@/lib/schema";
import { ArrowRight, Check, Cloud, Radar } from "@/components/icons";
import { AWS_LABS, SOC_LABS, FAQS, SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Hands-on Labs — Cloud Security & SOC (SIEM & SOAR)",
  description:
    "Two hands-on tracks in managed cyber ranges you launch from a browser: Cloud Security on real AWS (our flagship), and a full SOC track — SIEM and SOAR. No setup.",
  alternates: { canonical: "/labs" },
};

const PAGE_URL = `${SITE.url}/labs`;
const PAGE_SCHEMA = [
  webPageSchema({
    url: PAGE_URL,
    name: "Hands-on Labs — Cloud Security & SOC — ShieldSync Security",
    description: "Two tracks of real, managed cyber ranges: Cloud Security on AWS, and a full SOC track (SIEM & SOAR).",
    dateModified: "2026-06-29",
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

const LEVEL_STYLE: Record<string, string> = {
  Beginner: "border-emerald-300 bg-emerald-50 text-emerald-700",
  Intermediate: "border-amber-300 bg-amber-50 text-amber-700",
  Advanced: "border-rose-300 bg-rose-50 text-rose-700",
};

const FREE_LAB_HREF = `${SITE.labsUrl}/labs/${AWS_LABS.find((l) => l.free)?.slug ?? "s3-misconfiguration-audit"}`;

export default function LabsPage() {
  return (
    <>
      <SchemaOrg schema={PAGE_SCHEMA} />

      {/* ── Compact hero ─────────────────────────────────────────────── */}
      <section className="relative isolate overflow-hidden border-b border-line">
        <div className="aurora absolute inset-0 -z-10" />
        <div className="cyber-grid absolute inset-0 -z-10" />
        <Container className="py-10 sm:py-14">
          <Reveal>
            <span className="inline-flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-bright">
              <span className="h-1 w-1 rounded-full bg-brand" />
              Hands-on labs
            </span>
            <h1 className="mt-4 text-3xl font-extrabold leading-tight tracking-tight text-fg sm:text-4xl">
              Two tracks. Real environments. <span className="text-gradient">Zero setup.</span>
            </h1>
            <p className="mt-3 max-w-2xl text-base leading-7 text-muted">
              Managed, on-demand cyber ranges launched from your browser — no AWS account, no install.
              First lab is free.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Button href={FREE_LAB_HREF} external>
                Start free lab
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button href={SITE.startUrl} variant="secondary">
                View pricing & buy access
              </Button>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* ── Tracks + Pricing in one section ──────────────────────────── */}
      <section className="py-10 sm:py-14">
        <Container className="grid gap-10">

          {/* Track bars */}
          <div className="grid items-stretch gap-5 lg:grid-cols-2">

            {/* Cloud Security */}
            <Reveal>
              <div className="flex h-full flex-col rounded-2xl border border-line bg-panel p-6 sm:p-7">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-brand/25 bg-brand/10 text-brand-bright">
                      <Cloud className="h-5 w-5" />
                    </span>
                    <h2 className="text-xl font-bold text-fg">Cloud Security</h2>
                  </div>
                  <span className="shrink-0 rounded-full bg-brand/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-brand-bright">
                    ★ Flagship · Live
                  </span>
                </div>
                <p className="mt-3 text-sm leading-6 text-muted">
                  Audit and harden real AWS accounts — IAM, S3, encryption, logging, and detection — mapped to how attackers actually get in.
                </p>
                <ul className="mt-5 grid gap-2">
                  {AWS_LABS.map((lab) => (
                    <li key={lab.slug}>
                      <Link
                        href={`/labs/${lab.slug}`}
                        className="group flex items-center justify-between gap-3 rounded-lg border border-line bg-surface px-4 py-3 transition hover:border-line-strong"
                      >
                        <span className="text-sm font-semibold text-fg group-hover:text-brand-bright">{lab.title}</span>
                        <span className="flex shrink-0 items-center gap-1.5">
                          {lab.free && (
                            <span className="rounded px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide bg-brand/10 text-brand-bright">Free</span>
                          )}
                          <span className={`rounded border px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide ${LEVEL_STYLE[lab.level]}`}>
                            {lab.level}
                          </span>
                        </span>
                      </Link>
                    </li>
                  ))}
                  <li className="px-1 text-xs text-muted">More AWS labs added regularly.</li>
                </ul>
                <Button href={FREE_LAB_HREF} external variant="secondary" className="mt-5 w-full sm:w-fit">
                  Start the free lab
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </Reveal>

            {/* SOC */}
            <Reveal delay={80}>
              <div className="flex h-full flex-col rounded-2xl border border-line bg-panel p-6 sm:p-7">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-violet-300/60 bg-violet-50/50 text-violet-600">
                      <Radar className="h-5 w-5" />
                    </span>
                    <div className="flex items-center gap-2">
                      <h2 className="text-xl font-bold text-fg">SOC</h2>
                      <span className="rounded border border-emerald-300 bg-emerald-50 px-1.5 py-0.5 text-[10px] font-bold uppercase text-emerald-700">SIEM</span>
                      <span className="rounded border border-violet-300 bg-violet-50 px-1.5 py-0.5 text-[10px] font-bold uppercase text-violet-700">SOAR</span>
                    </div>
                  </div>
                  <span className="shrink-0 rounded-full border border-amber-200 bg-amber-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-amber-700">
                    Coming soon
                  </span>
                </div>
                <p className="mt-3 text-sm leading-6 text-muted">
                  Round out cloud security with blue-team essentials — build detections, hunt threats, and automate the response.
                </p>
                <ul className="mt-5 grid gap-2">
                  {SOC_LABS.map((lab) => (
                    <li
                      key={lab.slug}
                      className="flex items-center justify-between gap-3 rounded-lg border border-line bg-surface px-4 py-3"
                    >
                      <span className="text-sm font-semibold text-fg">{lab.title}</span>
                      <span className={`shrink-0 rounded border px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide ${
                        lab.product === "SIEM"
                          ? "border-emerald-300 bg-emerald-50 text-emerald-700"
                          : "border-violet-300 bg-violet-50 text-violet-700"
                      }`}>
                        {lab.product}
                      </span>
                    </li>
                  ))}
                </ul>
                <Button href="/labs/soc" variant="secondary" className="mt-5 w-full sm:w-fit">
                  Explore the SOC track
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </Reveal>
          </div>

          {/* Pricing — 3 cards in one row */}
          <Reveal>
            <p className="mb-4 text-xs font-bold uppercase tracking-widest text-muted">Pricing</p>
            <div className="grid gap-4 sm:grid-cols-3">
              {/* Free */}
              <div className="flex flex-col rounded-xl border border-line bg-panel p-5">
                <p className="text-xs font-bold uppercase tracking-widest text-muted">Free</p>
                <p className="mt-2 text-2xl font-extrabold text-fg">₹0</p>
                <p className="mt-1 text-sm text-muted">First lab, no card needed.</p>
                <ul className="mt-4 grid gap-1.5 text-sm text-fg/85">
                  <li className="flex items-center gap-2"><Check className="h-3.5 w-3.5 shrink-0 text-brand" />S3 misconfiguration lab</li>
                  <li className="flex items-center gap-2"><Check className="h-3.5 w-3.5 shrink-0 text-brand" />Full graded experience</li>
                </ul>
                <Button href={FREE_LAB_HREF} external variant="secondary" className="mt-5">
                  Start free
                </Button>
              </div>
              {/* Per-lab */}
              <div className="flex flex-col rounded-xl border border-brand/40 bg-panel p-5 ring-1 ring-brand/20">
                <p className="text-xs font-bold uppercase tracking-widest text-brand-bright">Pay per lab</p>
                <p className="mt-2 text-2xl font-extrabold text-fg">From ₹99 <span className="text-base font-medium text-muted">/ $3</span></p>
                <p className="mt-1 text-sm text-muted">Buy individual labs as you go.</p>
                <ul className="mt-4 grid gap-1.5 text-sm text-fg/85">
                  <li className="flex items-center gap-2"><Check className="h-3.5 w-3.5 shrink-0 text-brand" />Any single lab</li>
                  <li className="flex items-center gap-2"><Check className="h-3.5 w-3.5 shrink-0 text-brand" />Multiple launches</li>
                  <li className="flex items-center gap-2"><Check className="h-3.5 w-3.5 shrink-0 text-brand" />Completion certificate</li>
                </ul>
                <Button href={SITE.startUrl} className="mt-5">
                  Buy a lab <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
              {/* Monthly */}
              <div className="flex flex-col rounded-xl border border-line bg-panel p-5">
                <p className="text-xs font-bold uppercase tracking-widest text-muted">Monthly pass</p>
                <p className="mt-2 text-2xl font-extrabold text-fg">₹2,000 <span className="text-base font-medium text-muted">/ $25</span></p>
                <p className="mt-1 text-sm text-muted">All labs, all levels, one month.</p>
                <ul className="mt-4 grid gap-1.5 text-sm text-fg/85">
                  <li className="flex items-center gap-2"><Check className="h-3.5 w-3.5 shrink-0 text-brand" />All available labs</li>
                  <li className="flex items-center gap-2"><Check className="h-3.5 w-3.5 shrink-0 text-brand" />All tracks + levels</li>
                  <li className="flex items-center gap-2"><Check className="h-3.5 w-3.5 shrink-0 text-brand" />Completion certificate</li>
                </ul>
                <Button href={`${SITE.startUrl}&plan=monthly`} variant="secondary" className="mt-5">
                  Get monthly pass
                </Button>
              </div>
            </div>
          </Reveal>

        </Container>
      </section>

      <FaqSection faqs={FAQS.labs} title="Labs — frequently asked questions" />
    </>
  );
}
