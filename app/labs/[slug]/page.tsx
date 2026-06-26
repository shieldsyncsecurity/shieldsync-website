import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container, Button, Pill, Card } from "@/components/ui";
import { Reveal } from "@/components/reveal";
import { CtaBand } from "@/components/sections";
import { SchemaOrg } from "@/components/schema-org";
import { webPageSchema, breadcrumbSchema } from "@/lib/schema";
import { Check, ArrowRight } from "@/components/icons";
import { AWS_LABS, SOC_LABS, SITE, launchPolicyText } from "@/lib/site";

export function generateStaticParams() {
  return [...AWS_LABS, ...SOC_LABS].map((l) => ({ slug: l.slug }));
}

function getLab(slug: string) {
  const aws = AWS_LABS.find((l) => l.slug === slug);
  if (aws) return { ...aws, kind: "aws" as const, track: "AWS Security Labs", badge: aws.level };
  const soc = SOC_LABS.find((l) => l.slug === slug);
  if (soc) return { ...soc, kind: "soc" as const, track: "SOC Labs", badge: soc.product };
  return null;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const lab = getLab(slug);
  if (!lab) return { title: "Lab" };
  return { title: `${lab.title} — Hands-on Lab`, description: lab.desc, alternates: { canonical: `/labs/${slug}` } };
}

const STEPS = {
  aws: [
    "Work in a real, isolated AWS environment — nothing to install or set up",
    "Find and exploit the weakness the way an attacker would",
    "Apply the fix and verify it like a defender",
    "Map what you did back to real-world controls and frameworks",
  ],
  soc: [
    "Work in a managed SIEM / SOAR environment from your browser",
    "Investigate realistic telemetry, logs, and alerts",
    "Build detections or automation that actually fire",
    "Understand the full blue-team workflow end to end",
  ],
};

export default async function LabDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const lab = getLab(slug);
  if (!lab) notFound();

  const url = `${SITE.url}/labs/${slug}`;
  // SOC (SIEM/SOAR) labs are advertised but not yet built — show them as "Coming
  // soon" (no launch CTA, no auto-grader claim) instead of a checkout dead-end.
  const soon = lab.kind === "soc";
  const startHref = `/labs-wizard?track=aws&level=${lab.kind === "aws" ? lab.level : "Beginner"}`;
  const related = (lab.kind === "aws" ? AWS_LABS : SOC_LABS).filter((l) => l.slug !== slug).slice(0, 4);
  const schema = [
    webPageSchema({
      url,
      name: `${lab.title} — ${lab.track}`,
      description: lab.desc,
      dateModified: "2026-06-04",
      breadcrumb: [
        { name: "Home", url: SITE.url },
        { name: "Hands-on Labs", url: `${SITE.url}/labs` },
        { name: lab.title, url },
      ],
    }),
    breadcrumbSchema(url, [
      { name: "Home", url: SITE.url },
      { name: "Hands-on Labs", url: `${SITE.url}/labs` },
      { name: lab.title, url },
    ]),
  ];

  return (
    <>
      <SchemaOrg schema={schema} />

      <section className="relative isolate overflow-hidden border-b border-line">
        <div className="aurora absolute inset-0 -z-10" />
        <div className="cyber-grid absolute inset-0 -z-10" />
        <Container className="py-14 sm:py-18">
          <Reveal className="max-w-3xl">
            <Link href="/labs" className="inline-flex items-center gap-2 text-sm font-semibold text-brand-bright">
              ← All hands-on labs
            </Link>
            <div className="mt-5 flex flex-wrap items-center gap-3">
              <Pill tone="brand">{lab.track}</Pill>
              <span className="rounded-md border border-line bg-surface px-2.5 py-1 text-xs font-bold uppercase tracking-wide text-fg">
                {lab.badge}
              </span>
              <span className="rounded-md border border-line bg-surface px-2.5 py-1 text-xs font-bold uppercase tracking-wide text-muted">
                ~{lab.minutes} min
              </span>
              <span className="rounded-md border border-line bg-surface px-2.5 py-1 text-xs font-bold uppercase tracking-wide text-muted">
                Browser · no setup
              </span>
              {lab.kind === "aws" ? (
                <span className="rounded-md border border-line bg-surface px-2.5 py-1 text-xs font-bold uppercase tracking-wide text-muted">
                  {lab.free ? "Free · " : ""}
                  {launchPolicyText(lab.level, lab.free)}
                </span>
              ) : null}
            </div>
            <h1 className="mt-5 text-4xl font-extrabold leading-[1.1] tracking-tight text-fg sm:text-5xl">{lab.title}</h1>
            <p className="mt-5 text-lg leading-8 text-muted">{lab.desc}</p>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              {soon ? (
                <>
                  <span className="inline-flex items-center rounded-xl border border-amber-400/40 bg-amber-500/10 px-4 py-2.5 text-sm font-bold text-amber-700">
                    Coming soon — in development
                  </span>
                  <Link href="/contact" className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-bright hover:underline">
                    Get notified when it launches →
                  </Link>
                </>
              ) : (
                <Button href={startHref}>
                  Start this lab
                  <ArrowRight className="h-4 w-4" />
                </Button>
              )}
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              {lab.tags.map((t) => (
                <span key={t} className="rounded-md bg-surface px-2 py-0.5 font-mono text-[11px] text-muted">
                  {t}
                </span>
              ))}
            </div>
          </Reveal>
        </Container>
      </section>

      {/* What you'll do */}
      <section className="border-b border-line py-14 sm:py-20">
        <Container>
          <div className="mx-auto max-w-3xl">
            <h2 className="text-2xl font-extrabold tracking-tight text-fg">What you&apos;ll do</h2>
            <ul className="mt-6 grid gap-3">
              {STEPS[lab.kind].map((s) => (
                <li key={s} className="flex items-start gap-3 text-base leading-7 text-fg/85">
                  <Check className="mt-1 h-4 w-4 shrink-0 text-brand" />
                  {s}
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      {/* Skills you'll gain + roles it maps to */}
      <section className="border-b border-line py-14 sm:py-20">
        <Container>
          <div className="mx-auto grid max-w-3xl gap-10 sm:grid-cols-2">
            <div>
              <h2 className="text-2xl font-extrabold tracking-tight text-fg">Skills you&apos;ll gain</h2>
              <ul className="mt-6 grid gap-3">
                {lab.skills.map((s) => (
                  <li key={s} className="flex items-start gap-3 text-base leading-7 text-fg/85">
                    <Check className="mt-1 h-4 w-4 shrink-0 text-brand" />
                    {s}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-2xl font-extrabold tracking-tight text-fg">Roles this maps to</h2>
              <div className="mt-6 flex flex-wrap gap-2">
                {lab.roles.map((r) => (
                  <span key={r} className="rounded-full border border-line bg-surface px-3 py-1.5 text-sm font-semibold text-fg">
                    {r}
                  </span>
                ))}
              </div>
              <p className="mt-5 text-base leading-7 text-muted">
                Practical, job-aligned skills you can put on a résumé and demonstrate in interviews — proven against
                real cloud state, not multiple-choice.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Check my work — never stuck (AWS labs only; SOC isn't built yet) */}
      {!soon ? (
        <section className="border-b border-line bg-surface/50 py-14 sm:py-18">
          <Container>
            <div className="mx-auto max-w-3xl">
              <span className="inline-flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-bright">
                <span className="h-1 w-1 rounded-full bg-brand" />
                You won&apos;t get stuck
              </span>
              <h2 className="mt-4 text-2xl font-extrabold tracking-tight text-fg sm:text-3xl">
                Hit <span className="text-gradient">Check my work</span> — graded against the live AWS account.
              </h2>
              <p className="mt-4 text-base leading-7 text-muted">
                No static checklist. Our auto-grader assumes a role in your lab account and verifies real cloud state —
                if you only half-fixed it, you&apos;ll know. Per-objective ✅ / ⬜, instant.
              </p>
            </div>
          </Container>
        </section>
      ) : null}

      {/* Related */}
      {related.length > 0 ? (
        <section className="border-b border-line py-14 sm:py-20">
          <Container>
            <h2 className="text-2xl font-extrabold tracking-tight text-fg">More {lab.track}</h2>
            <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
              {related.map((r) => (
                <Link key={r.slug} href={`/labs/${r.slug}`} className="group block h-full">
                  <Card className="h-full p-5">
                    <h3 className="text-base font-semibold text-fg group-hover:text-brand-bright">{r.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-muted">{r.desc}</p>
                  </Card>
                </Link>
              ))}
            </div>
          </Container>
        </section>
      ) : null}

      {soon ? (
        <CtaBand
          title="This lab is coming soon"
          subtitle="Our SIEM & SOAR labs are in development. Want first access when they launch?"
          primary={{ label: "Get notified", href: "/contact" }}
        />
      ) : (
        <CtaBand
          title="Ready to launch this lab?"
          subtitle="Spin it up in your browser — no setup. Your first lab is free."
          primary={{ label: "Start this lab", href: startHref }}
        />
      )}
    </>
  );
}
