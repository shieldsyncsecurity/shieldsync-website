import Link from "next/link";
import type { Metadata } from "next";
import { Container, Button, Card, SectionHeading } from "@/components/ui";
import { Reveal } from "@/components/reveal";
import { PageHero, CtaBand } from "@/components/sections";
import { SchemaOrg } from "@/components/schema-org";
import { webPageSchema, breadcrumbSchema } from "@/lib/schema";
import { Check, ArrowRight, Shield, Cap } from "@/components/icons";
import { ROADMAP, ROADMAP_ROLES, SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Start Here — Learn Cloud Security (Hands-on Roadmap)",
  description:
    "A clear, hands-on roadmap to learn AWS cloud security from zero to job-ready — every step mapped to a real lab. No overwhelm, no AWS account, no setup. Start free.",
};

const PAGE_URL = `${SITE.url}/start-here`;
const PAGE_SCHEMA = [
  webPageSchema({
    url: PAGE_URL,
    name: "Start Here — Learn Cloud Security (Hands-on Roadmap)",
    description:
      "A step-by-step, hands-on roadmap for learning AWS cloud security from beginner to job-ready, mapped to real labs.",
    dateModified: "2026-06-06",
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
  Beginner: { dot: "bg-emerald-500", chip: "border-emerald-300 bg-emerald-50 text-emerald-700" },
  Intermediate: { dot: "bg-amber-500", chip: "border-amber-300 bg-amber-50 text-amber-700" },
  Advanced: { dot: "bg-rose-500", chip: "border-rose-300 bg-rose-50 text-rose-700" },
  SOC: { dot: "bg-violet-500", chip: "border-violet-300 bg-violet-50 text-violet-700" },
};

export default function StartHerePage() {
  return (
    <>
      <SchemaOrg schema={PAGE_SCHEMA} />

      <PageHero
        eyebrow="Start here"
        title={
          <>
            Learn <span className="text-gradient">cloud security</span> — a hands-on roadmap, not a reading list.
          </>
        }
        description="Cloud security feels huge, and most courses are slides you forget by Friday. This is the opposite: a clear path from zero to job-ready, where every step is a real lab you do in a real AWS console. Your first one is free."
      />

      {/* Who it's for */}
      <section className="border-b border-line py-12 sm:py-14">
        <Container>
          <Reveal className="mx-auto mb-8 max-w-2xl text-center">
            <h2 className="text-2xl font-extrabold tracking-tight text-fg sm:text-3xl">Who this roadmap is for</h2>
            <p className="mt-3 text-base text-muted">
              No security or cloud background required — pick the one that sounds like you.
            </p>
          </Reveal>
          <div className="grid gap-5 sm:grid-cols-3">
            {[
              { t: "Complete beginners", d: "Never touched AWS or security? Stage 1 assumes nothing — you'll be doing real labs from day one." },
              { t: "Developers & IT pros", d: "Already technical? Add the cloud-security skills employers test for, with a portfolio of labs to prove them." },
              { t: "Career switchers", d: "Moving into cloud or security from another field? This is the hands-on path from zero to job-ready." },
            ].map((x) => (
              <Reveal key={x.t}>
                <div className="h-full rounded-2xl border border-line bg-panel p-6">
                  <h3 className="text-lg font-semibold text-fg">{x.t}</h3>
                  <p className="mt-2 text-base leading-7 text-muted">{x.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* The roadmap */}
      <section className="border-b border-line py-14 sm:py-20">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="The roadmap"
              title="From zero to job-ready, one lab at a time"
              description="Four stages. Each maps to a set of hands-on labs you can launch right now."
            />
          </Reveal>

          <ol className="mt-12 space-y-6">
            {ROADMAP.map((s, i) => {
              const lv = LEVEL[s.level];
              return (
                <Reveal key={s.step} delay={i * 70}>
                  <li>
                    <Card className="p-7 sm:p-8">
                      <div className="flex flex-wrap items-center gap-4">
                        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-r from-brand to-cyan text-lg font-extrabold text-white">
                          {s.step}
                        </span>
                        <div>
                          <span
                            className={`inline-flex items-center gap-1.5 rounded-md border px-2 py-0.5 text-[11px] font-bold uppercase tracking-wide ${lv.chip}`}
                          >
                            <span className={`h-1.5 w-1.5 rounded-full ${lv.dot}`} />
                            {s.level === "SOC" ? "SOC track" : `${s.level} labs`}
                          </span>
                          <h3 className="mt-1.5 text-xl font-bold text-fg sm:text-2xl">{s.title}</h3>
                        </div>
                        <span className="ml-auto text-sm font-semibold text-muted">{s.time}</span>
                      </div>

                      <p className="mt-4 text-base leading-7 text-muted">{s.goal}</p>

                      <ul className="mt-5 grid gap-2.5 sm:grid-cols-2">
                        {s.skills.map((sk) => (
                          <li key={sk} className="flex items-start gap-2.5 text-base text-fg/85">
                            <Check className="mt-1 h-4 w-4 shrink-0 text-brand" />
                            {sk}
                          </li>
                        ))}
                      </ul>

                      <div className="mt-6">
                        <Button href={s.track === "aws" ? `/labs-wizard?track=aws&level=${s.level}` : "/labs-wizard?track=soc"}>
                          {i === 0 ? "Start free" : `Start ${s.level === "SOC" ? "SOC" : s.level.toLowerCase()} labs`}
                          <ArrowRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </Card>
                  </li>
                </Reveal>
              );
            })}
          </ol>
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
                <h2 className="text-2xl font-extrabold tracking-tight text-fg">Practice without fear — no account, no bill</h2>
                <p className="mt-2 text-base leading-7 text-muted">
                  The biggest reason people stall on cloud security is fear of running up an AWS bill or breaking
                  something real. You won&apos;t. Every lab runs in a managed, isolated environment in your browser —
                  you never touch your own AWS account, there&apos;s nothing to set up, and when you&apos;re done it&apos;s wiped
                  clean. Experiment freely; that&apos;s how it sticks.
                </p>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Where it gets you */}
      <section className="border-b border-line py-14 sm:py-20">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Outcomes"
              title="Where this roadmap gets you"
              description="Finish it and you can do the day-to-day work of these roles — and talk through real scenarios in an interview, not just recite definitions."
            />
          </Reveal>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {ROADMAP_ROLES.map((role, i) => (
              <Reveal key={role} delay={i * 60}>
                <div className="flex h-full items-center gap-3 rounded-2xl border border-line bg-panel p-5">
                  <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand/10 text-brand-bright">
                    <Cap className="h-5 w-5" />
                  </span>
                  <span className="text-base font-semibold text-fg">{role}</span>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <p className="mt-8 text-base text-muted">
              New to all this?{" "}
              <Link href="/blog" className="font-semibold text-brand-bright">
                Start with the blog
              </Link>{" "}
              for free walkthroughs, then jump into Stage 1.
            </p>
          </Reveal>
        </Container>
      </section>

      <CtaBand
        title="Start Stage 1 — free"
        subtitle="Your first cloud security lab is on us. No account, no setup — just a browser."
        primary={{ label: "Start free lab", href: SITE.startUrl }}
      />
    </>
  );
}
