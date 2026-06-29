import Link from "next/link";
import type { Metadata } from "next";
import { Container, Button } from "@/components/ui";
import { Reveal } from "@/components/reveal";
import { FaqSection, PageHero } from "@/components/sections";
import { SchemaOrg } from "@/components/schema-org";
import { webPageSchema, breadcrumbSchema, faqSchema } from "@/lib/schema";
import { ArrowRight, Cloud, Radar } from "@/components/icons";
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

const LEVEL: Record<string, string> = {
  Beginner: "border-emerald-300 bg-emerald-50 text-emerald-700",
  Intermediate: "border-amber-300 bg-amber-50 text-amber-700",
  Advanced: "border-rose-300 bg-rose-50 text-rose-700",
};

// Direct free-lab page on the platform (no ?intent=launch, so no auto-redirect flash).
const FREE_LAB_HREF = `${SITE.labsUrl}/labs/${AWS_LABS.find((l) => l.free)?.slug ?? "s3-misconfiguration-audit"}`;

export default function LabsPage() {
  return (
    <>
      <SchemaOrg schema={PAGE_SCHEMA} />

      <PageHero
        eyebrow="Hands-on labs"
        title={
          <>
            Two tracks. Real environments. <span className="text-gradient">Zero setup</span>.
          </>
        }
        description="Managed, on-demand cyber ranges you launch from a browser — no AWS account, no install. Pick your track: Cloud Security on real AWS, or a full SOC track with SIEM and SOAR."
      />

      {/* Two big track bars */}
      <section className="border-b border-line py-14 sm:py-20">
        <Container>
          <div className="grid items-stretch gap-6 lg:grid-cols-2">
            {/* ───────────────────────────── Cloud Security */}
            <Reveal>
              <div className="flex h-full flex-col rounded-3xl border border-line bg-panel p-8 shadow-sm sm:p-10">
                <div className="flex items-center justify-between gap-3">
                  <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-brand/25 bg-brand/10 text-brand-bright">
                    <Cloud className="h-7 w-7" />
                  </span>
                  <span className="rounded-full bg-brand/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] text-brand-bright">
                    ★ Flagship · Live
                  </span>
                </div>
                <h2 className="mt-6 text-3xl font-extrabold tracking-tight text-fg">Cloud Security</h2>
                <p className="mt-3 text-base leading-7 text-muted">
                  Audit and harden real AWS accounts — IAM, S3, encryption, logging, and detection — mapped to the
                  attack paths that actually matter. Start free and go deeper at your own pace.
                </p>

                <ul className="mt-7 grid flex-1 gap-3">
                  {AWS_LABS.map((lab) => (
                    <li key={lab.slug}>
                      <Link
                        href={`/labs/${lab.slug}`}
                        className="group flex items-center justify-between gap-3 rounded-xl border border-line bg-surface px-4 py-3.5 transition hover:border-line-strong"
                      >
                        <span className="font-semibold text-fg group-hover:text-brand-bright">{lab.title}</span>
                        <span className="flex shrink-0 items-center gap-2">
                          {lab.free ? (
                            <span className="rounded-md bg-brand/10 px-2 py-0.5 text-[11px] font-bold uppercase tracking-wide text-brand-bright">
                              Free
                            </span>
                          ) : null}
                          <span className={`rounded-md border px-2 py-0.5 text-[11px] font-bold uppercase tracking-wide ${LEVEL[lab.level]}`}>
                            {lab.level}
                          </span>
                        </span>
                      </Link>
                    </li>
                  ))}
                  <li className="px-1 pt-1 text-sm text-muted">More AWS labs added regularly.</li>
                </ul>

                <Button href={FREE_LAB_HREF} external className="mt-8 w-full sm:w-fit">
                  Start the free lab
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </Reveal>

            {/* ───────────────────────────── SOC (SIEM & SOAR) */}
            <Reveal delay={100}>
              <div className="flex h-full flex-col rounded-3xl border border-line bg-panel p-8 shadow-sm sm:p-10">
                <div className="flex items-center justify-between gap-3">
                  <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-emerald-300 bg-emerald-50 text-emerald-700">
                    <Radar className="h-7 w-7" />
                  </span>
                  <span className="rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] text-amber-700">
                    Coming soon
                  </span>
                </div>
                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <h2 className="text-3xl font-extrabold tracking-tight text-fg">SOC</h2>
                  <span className="rounded-md border border-emerald-300 bg-emerald-50 px-2 py-0.5 text-[11px] font-bold uppercase tracking-wide text-emerald-700">SIEM</span>
                  <span className="rounded-md border border-violet-300 bg-violet-50 px-2 py-0.5 text-[11px] font-bold uppercase tracking-wide text-violet-700">SOAR</span>
                </div>
                <p className="mt-3 text-base leading-7 text-muted">
                  Round out cloud security with the blue-team essentials — build detections, hunt threats, and
                  automate the response. A full SOC track in managed environments you launch from a browser.
                </p>

                <ul className="mt-7 grid flex-1 gap-3">
                  {SOC_LABS.map((lab) => (
                    <li
                      key={lab.slug}
                      className="flex items-center justify-between gap-3 rounded-xl border border-line bg-surface px-4 py-3.5"
                    >
                      <span className="font-semibold text-fg">{lab.title}</span>
                      <span
                        className={`shrink-0 rounded-md border px-2 py-0.5 text-[11px] font-bold uppercase tracking-wide ${
                          lab.product === "SIEM"
                            ? "border-emerald-300 bg-emerald-50 text-emerald-700"
                            : "border-violet-300 bg-violet-50 text-violet-700"
                        }`}
                      >
                        {lab.product}
                      </span>
                    </li>
                  ))}
                </ul>

                <Button href="/labs/soc" variant="secondary" className="mt-8 w-full sm:w-fit">
                  Explore the SOC track
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Pricing / access — clear path to the wizard + Paytm checkout */}
      <section className="border-b border-line py-14 sm:py-20">
        <Container>
          <Reveal>
            <div className="grid gap-6 sm:grid-cols-3">
              {/* Free */}
              <div className="flex flex-col rounded-2xl border border-line bg-panel p-7">
                <p className="text-xs font-bold uppercase tracking-widest text-muted">Free</p>
                <p className="mt-3 text-3xl font-extrabold text-fg">₹0</p>
                <p className="mt-2 text-sm text-muted">Your first lab, no card required.</p>
                <ul className="mt-5 grid gap-2 text-sm text-fg/85">
                  <li>✓ S3 misconfiguration lab (Beginner)</li>
                  <li>✓ Full lab experience</li>
                  <li>✓ Auto-graded tasks</li>
                </ul>
                <Button href={FREE_LAB_HREF} external variant="secondary" className="mt-auto pt-6">
                  Start free
                </Button>
              </div>
              {/* Per-lab */}
              <div className="flex flex-col rounded-2xl border border-brand/40 bg-panel p-7 ring-1 ring-brand/30">
                <p className="text-xs font-bold uppercase tracking-widest text-brand-bright">Pay per lab</p>
                <p className="mt-3 text-3xl font-extrabold text-fg">From ₹99 <span className="text-lg font-medium text-muted">/ $3</span></p>
                <p className="mt-2 text-sm text-muted">Buy individual labs as you need them.</p>
                <ul className="mt-5 grid gap-2 text-sm text-fg/85">
                  <li>✓ Unlock any single lab</li>
                  <li>✓ Multiple launches in window</li>
                  <li>✓ Certificate on completion</li>
                </ul>
                <Button href={SITE.startUrl} className="mt-auto pt-6">
                  Buy a lab
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
              {/* Monthly */}
              <div className="flex flex-col rounded-2xl border border-line bg-panel p-7">
                <p className="text-xs font-bold uppercase tracking-widest text-muted">Monthly pass</p>
                <p className="mt-3 text-3xl font-extrabold text-fg">₹2,000 <span className="text-lg font-medium text-muted">/ $25</span></p>
                <p className="mt-2 text-sm text-muted">All labs, all levels, for a full month.</p>
                <ul className="mt-5 grid gap-2 text-sm text-fg/85">
                  <li>✓ All available labs</li>
                  <li>✓ All tracks + levels</li>
                  <li>✓ Certificate on completion</li>
                </ul>
                <Button href={`${SITE.startUrl}&plan=monthly`} variant="secondary" className="mt-auto pt-6">
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
