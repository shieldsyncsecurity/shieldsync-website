import type { Metadata } from "next";
import { Container, Card, Pill } from "@/components/ui";
import { Reveal } from "@/components/reveal";
import { Check, Cloud, Flask, Radar, Cap } from "@/components/icons";
import { SchemaOrg } from "@/components/schema-org";
import { webPageSchema, breadcrumbSchema, internshipProgramSchema } from "@/lib/schema";
import { InternshipApplyForm } from "@/components/internship-apply-form";
import { INTERNSHIP, SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Cybersecurity Internship — 8 Weeks, Real AWS Labs, Certificate",
  description:
    "ShieldSync Security's hands-on cybersecurity internship. Real cloud security projects, AWS labs, 1:1 mentorship, and a completion certificate. ₹9,999 all-inclusive. Limited seats.",
  alternates: { canonical: "/internship" },
};

const WORK_ICONS = [Cloud, Flask, Radar] as const;
const PAGE_URL = `${SITE.url}/internship`;
const PAGE_SCHEMA = [
  webPageSchema({
    url: PAGE_URL,
    name: "Cybersecurity Internship — ShieldSync Security",
    description:
      "A focused, hands-on 8-week internship in cloud and cybersecurity. Real AWS security projects, managed cyber-range labs, 1:1 mentorship, and a completion certificate.",
    dateModified: "2026-06-04",
    breadcrumb: [
      { name: "Home", url: SITE.url },
      { name: "Internship", url: PAGE_URL },
    ],
  }),
  breadcrumbSchema(PAGE_URL, [
    { name: "Home", url: SITE.url },
    { name: "Training", url: `${SITE.url}/training` },
    { name: "Cybersecurity Internship", url: PAGE_URL },
  ]),
  internshipProgramSchema(),
];

export default function InternshipPage() {
  return (
    <>
      <SchemaOrg schema={PAGE_SCHEMA} />

      {/* ─── Hero + Apply form ─────────────────────────────────────────────── */}
      <section className="relative isolate overflow-hidden border-b border-line">
        <div className="aurora absolute inset-0 -z-10" />
        <div className="cyber-grid absolute inset-0 -z-10" />

        <Container className="py-8 sm:py-10">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.05fr] lg:items-start">

            {/* Left: pitch */}
            <Reveal>
              <Pill tone="brand">{INTERNSHIP.badge}</Pill>
              <h1 className="mt-3 text-4xl font-extrabold leading-tight tracking-tight text-fg sm:text-5xl">
                {INTERNSHIP.title}
              </h1>
              <p className="mt-2 text-lg font-semibold text-brand-bright">{INTERNSHIP.subtitle}</p>
              <p className="mt-3 text-base leading-7 text-muted max-w-lg">{INTERNSHIP.summary}</p>

              {/* Price callout */}
              <div className="mt-5 inline-flex items-baseline gap-2 rounded-2xl border border-line bg-panel px-5 py-3">
                <span className="text-4xl font-extrabold text-fg">{INTERNSHIP.price}</span>
                <span className="text-sm text-muted">{INTERNSHIP.priceNote}</span>
              </div>

              {/* Inclusions */}
              <ul className="mt-5 grid gap-2 sm:grid-cols-2">
                {INTERNSHIP.whatYouGet.map((g) => (
                  <li key={g} className="flex items-start gap-2 text-sm text-fg/85">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                    {g}
                  </li>
                ))}
              </ul>
            </Reveal>

            {/* Right: application form */}
            <Reveal delay={100}>
              <Card hover={false} className="p-6 sm:p-7">
                <p className="text-base font-bold text-fg">Apply now</p>
                <p className="mt-0.5 text-sm text-muted">Fill in your details — we reply within 24 hours.</p>
                <div className="mt-5">
                  <InternshipApplyForm />
                </div>
              </Card>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* ─── What you'll work on + Who it's for ───────────────────────────── */}
      <section className="py-8 sm:py-10">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">

            {/* Work on — 3 compact cards */}
            <Reveal>
              <p className="text-xs font-bold uppercase tracking-widest text-brand-bright">What you&apos;ll work on</p>
              <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-fg">Real projects, real environments</h2>
              <p className="mt-2 text-sm text-muted">No passive video courses — you do the work of a cloud security practitioner.</p>
              <div className="mt-6 flex flex-col gap-4">
                {INTERNSHIP.workOn.map((w, i) => {
                  const Icon = WORK_ICONS[i % WORK_ICONS.length];
                  return (
                    <div key={w.title} className="flex items-start gap-4 rounded-xl border border-line bg-panel p-4">
                      <span className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-brand/25 bg-brand/10 text-brand-bright">
                        <Icon className="h-4 w-4" />
                      </span>
                      <div>
                        <p className="text-sm font-semibold text-fg">{w.title}</p>
                        <p className="mt-0.5 text-sm leading-6 text-muted">{w.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </Reveal>

            {/* Who it's for */}
            <Reveal delay={80}>
              <p className="text-xs font-bold uppercase tracking-widest text-brand-bright">Who it&apos;s for</p>
              <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-fg">Built for people breaking into security</h2>
              <p className="mt-2 text-sm text-muted">This programme is designed for motivated starters, not experienced practitioners.</p>
              <div className="mt-6 flex flex-col gap-3">
                {INTERNSHIP.forWho.map((f) => (
                  <div key={f} className="flex items-center gap-3 rounded-xl border border-line bg-panel px-4 py-3.5">
                    <Cap className="h-5 w-5 shrink-0 text-brand" />
                    <span className="text-sm text-fg/90">{f}</span>
                  </div>
                ))}
              </div>

              {/* Small reassurance block */}
              <div className="mt-6 rounded-xl border border-brand/20 bg-brand/5 p-4">
                <p className="text-sm font-semibold text-fg">No prior security experience needed</p>
                <p className="mt-1 text-sm text-muted">
                  If you have curiosity, basic IT knowledge, and 10–15 hrs/week to commit — you have what it takes.
                </p>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>
    </>
  );
}
