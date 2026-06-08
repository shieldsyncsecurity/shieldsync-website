import type { Metadata } from "next";
import { Container, Button, SectionHeading, Card, Pill } from "@/components/ui";
import { Reveal } from "@/components/reveal";
import { Check, WhatsApp, Cloud, Flask, Radar, Cap } from "@/components/icons";
import { SchemaOrg } from "@/components/schema-org";
import { webPageSchema, breadcrumbSchema, internshipProgramSchema } from "@/lib/schema";
import { INTERNSHIP, CONTACT, SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Cybersecurity Internship — 8 Weeks, Real AWS Labs, Certificate",
  description:
    "ShieldSync Security's hands-on cybersecurity internship. Real cloud security projects, AWS labs, 1:1 mentorship, and a completion certificate. ₹9,999 all-inclusive. Limited seats.",
  // og:image and twitter:image are auto-wired from app/internship/opengraph-image.tsx
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
      {/* Page-level JSON-LD: WebPage + BreadcrumbList + EducationalOccupationalProgram */}
      <SchemaOrg schema={PAGE_SCHEMA} />
      {/* ----------------------------------------------------------------- Hero */}
      <section className="relative isolate overflow-hidden border-b border-line">
        <div className="aurora absolute inset-0 -z-10" />
        <div className="cyber-grid absolute inset-0 -z-10" />

        <Container className="py-14 sm:py-16 lg:py-20">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <Reveal>
              <Pill tone="brand">{INTERNSHIP.badge}</Pill>
              <h1 className="mt-4 text-4xl font-extrabold leading-[1.08] tracking-tight text-fg sm:text-5xl">
                {INTERNSHIP.title}
              </h1>
              <p className="mt-3 text-xl font-semibold text-brand-bright">{INTERNSHIP.subtitle}</p>
              <p className="mt-5 max-w-xl text-lg leading-8 text-muted">{INTERNSHIP.summary}</p>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <Button href={CONTACT.whatsappHref} external>
                  <WhatsApp className="h-4 w-4" />
                  Apply on WhatsApp
                </Button>
                <Button href="/contact" variant="secondary">
                  Ask a question
                </Button>
              </div>
            </Reveal>

            {/* Price + inclusions card */}
            <Reveal delay={120}>
              <Card hover={false} className="p-8">
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted">Programme fee</p>
                <p className="mt-2 text-6xl font-extrabold tracking-tight text-fg sm:text-7xl">{INTERNSHIP.price}</p>
                <p className="mt-1 text-sm text-muted">{INTERNSHIP.priceNote}</p>

                <ul className="mt-6 grid gap-3 border-t border-line pt-6">
                  {INTERNSHIP.whatYouGet.map((g) => (
                    <li key={g} className="flex items-start gap-2.5 text-base text-fg/85">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                      {g}
                    </li>
                  ))}
                </ul>
              </Card>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* --------------------------------------------------- What you'll work on */}
      <section className="border-b border-line py-14 sm:py-20">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="What you'll work on"
              title="Real projects, real environments"
              description="No passive video courses. You'll spend the internship doing the actual work of a cloud security practitioner."
            />
          </Reveal>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {INTERNSHIP.workOn.map((w, i) => {
              const Icon = WORK_ICONS[i % WORK_ICONS.length];
              return (
                <Reveal key={w.title} delay={i * 80}>
                  <Card className="flex h-full flex-col p-7">
                    <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-brand/25 bg-brand/10 text-brand-bright">
                      <Icon className="h-6 w-6" />
                    </span>
                    <h3 className="mt-5 text-xl font-semibold text-fg">{w.title}</h3>
                    <p className="mt-3 text-base leading-7 text-muted">{w.desc}</p>
                  </Card>
                </Reveal>
              );
            })}
          </div>
        </Container>
      </section>

      {/* -------------------------------------------------------------- Who it's for */}
      <section className="border-b border-line py-14 sm:py-20">
        <Container className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <Reveal>
            <SectionHeading eyebrow="Who it's for" title="Built for people breaking into security" />
          </Reveal>

          <div className="grid gap-4">
            {INTERNSHIP.forWho.map((f, i) => (
              <Reveal key={f} delay={i * 70}>
                <div className="flex items-center gap-3 rounded-xl border border-line bg-surface px-5 py-4">
                  <Cap className="h-5 w-5 shrink-0 text-brand" />
                  <span className="text-base text-fg/90">{f}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* ------------------------------------------------------------------ CTA */}
      <section className="py-16 sm:py-24">
        <Container>
          <Reveal>
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-brand to-cyan p-10 text-center text-white sm:p-16">
              <h2 className="mx-auto max-w-2xl text-3xl font-extrabold tracking-tight sm:text-4xl">
                Ready to start? Seats are limited.
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-lg leading-8 text-white/85">
                Message us on WhatsApp to apply or ask anything about the programme — we reply fast.
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <a
                  href={CONTACT.whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3 text-base font-semibold text-brand-bright shadow-sm transition hover:bg-white/90"
                >
                  <WhatsApp className="h-4 w-4" />
                  Apply on WhatsApp
                </a>
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/50 px-6 py-3 text-base font-semibold text-white transition hover:bg-white/10"
                >
                  Email us
                </a>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
