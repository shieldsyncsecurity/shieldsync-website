import Link from "next/link";
import type { Metadata } from "next";
import { Container, Button, Card } from "@/components/ui";
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
  alternates: { canonical: "/start-here" },
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
        compact
        eyebrow="Start here"
        title={
          <>
            Learn <span className="text-gradient">cloud security</span> — a hands-on roadmap, not a reading list.
          </>
        }
        description="A clear path from zero to job-ready, where every step is a real lab in a real AWS console. Pick your stage below and start — your first lab is free."
      />

      {/* The roadmap — four stages, side by side */}
      <section className="border-b border-line py-10 sm:py-14">
        <Container>
          <Reveal className="mb-8 flex flex-wrap items-end justify-between gap-3">
            <div>
              <h2 className="text-2xl font-extrabold tracking-tight text-fg sm:text-3xl">
                From zero to job-ready, one lab at a time
              </h2>
              <p className="mt-2 text-base text-muted">Four stages. Each maps to hands-on labs you can launch right now.</p>
            </div>
          </Reveal>

          <ol className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {ROADMAP.map((s, i) => {
              const lv = LEVEL[s.level];
              return (
                <Reveal key={s.step} delay={i * 70} as="li" className="h-full">
                  <Card className="flex h-full flex-col p-5 sm:p-6">
                    <div className="flex items-center justify-between gap-2">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-r from-brand to-cyan text-base font-extrabold text-white">
                        {s.step}
                      </span>
                      <span className="text-sm font-semibold text-muted">{s.time}</span>
                    </div>

                    <span
                      className={`mt-4 inline-flex w-fit items-center gap-1.5 rounded-md border px-2 py-0.5 text-[11px] font-bold uppercase tracking-wide ${lv.chip}`}
                    >
                      <span className={`h-1.5 w-1.5 rounded-full ${lv.dot}`} />
                      {s.level === "SOC" ? "SOC track" : `${s.level} labs`}
                    </span>
                    <h3 className="mt-2 text-lg font-bold text-fg">{s.title}</h3>
                    <p className="mt-2 text-base leading-7 text-muted">{s.goal}</p>

                    <ul className="mt-4 space-y-2.5">
                      {s.skills.map((sk) => (
                        <li key={sk} className="flex items-start gap-2.5 text-base text-fg/85">
                          <Check className="mt-1 h-4 w-4 shrink-0 text-brand" />
                          <span>{sk}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="mt-auto pt-6">
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

      {/* Who it's for + safe to practice — compact, single band */}
      <section className="border-b border-line py-10 sm:py-14">
        <Container>
          <div className="grid gap-5 lg:grid-cols-3">
            {[
              { t: "Complete beginners", d: "Never touched AWS or security? Stage 1 assumes nothing." },
              { t: "Developers & IT pros", d: "Add the cloud-security skills employers test for — with labs to prove them." },
              { t: "Career switchers", d: "The hands-on path from another field into cloud or security, zero to job-ready." },
            ].map((x, i) => (
              <Reveal key={x.t} delay={i * 60} className="h-full">
                <div className="h-full rounded-2xl border border-line bg-panel p-5">
                  <h3 className="text-base font-semibold text-fg">{x.t}</h3>
                  <p className="mt-1.5 text-base leading-7 text-muted">{x.d}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <div className="mt-5 flex items-start gap-4 rounded-2xl border border-line bg-surface p-5 sm:items-center sm:p-6">
              <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-brand/25 bg-brand/10 text-brand-bright">
                <Shield className="h-6 w-6" />
              </span>
              <p className="text-base leading-7 text-muted">
                <span className="font-semibold text-fg">Practice without fear.</span> Every lab runs in a managed,
                isolated environment in your browser — you never touch your own AWS account, there&apos;s nothing to set
                up, and it&apos;s wiped clean when you&apos;re done. Experiment freely; that&apos;s how it sticks.
              </p>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Where it gets you */}
      <section className="border-b border-line py-10 sm:py-14">
        <Container>
          <Reveal className="mb-6 flex flex-wrap items-baseline justify-between gap-2">
            <h2 className="text-2xl font-extrabold tracking-tight text-fg sm:text-3xl">Where this roadmap gets you</h2>
            <p className="text-base text-muted">
              New here?{" "}
              <Link href="/blog" className="font-semibold text-brand-bright">
                Start with the blog
              </Link>
              .
            </p>
          </Reveal>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {ROADMAP_ROLES.map((role, i) => (
              <Reveal key={role} delay={i * 60} className="h-full">
                <div className="flex h-full items-center gap-3 rounded-2xl border border-line bg-panel p-4">
                  <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand/10 text-brand-bright">
                    <Cap className="h-5 w-5" />
                  </span>
                  <span className="text-base font-semibold text-fg">{role}</span>
                </div>
              </Reveal>
            ))}
          </div>
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
