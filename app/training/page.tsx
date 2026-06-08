import Link from "next/link";
import type { Metadata } from "next";
import { Container, Card, Pill, SectionHeading } from "@/components/ui";
import { Reveal } from "@/components/reveal";
import { CtaBand, FaqSection, PageHero } from "@/components/sections";
import { SchemaOrg } from "@/components/schema-org";
import { webPageSchema, breadcrumbSchema, faqSchema } from "@/lib/schema";
import { ArrowRight, Check, Cap, Flask, Cloud, Shield } from "@/components/icons";
import { TRAINING_PROGRAMS, FAQS, SITE, INTERNSHIP } from "@/lib/site";

export const metadata: Metadata = {
  title: "Cybersecurity Training — Internship, Career Tracks, Cohorts",
  description:
    "Hands-on cybersecurity training that takes you from motivated to job-ready: an 8-week internship, career-transformation tracks, and corporate cohorts. AWS-deep, lab-backed.",
  alternates: { canonical: "/training" },
};

const PAGE_URL = `${SITE.url}/training`;
const PAGE_SCHEMA = [
  webPageSchema({
    url: PAGE_URL,
    name: "Cybersecurity Training — ShieldSync Security",
    description: "Internship, career-transformation tracks, and corporate cohorts — hands-on and AWS-deep.",
    dateModified: "2026-06-04",
    breadcrumb: [
      { name: "Home", url: SITE.url },
      { name: "Training", url: PAGE_URL },
    ],
  }),
  breadcrumbSchema(PAGE_URL, [
    { name: "Home", url: SITE.url },
    { name: "Training", url: PAGE_URL },
  ]),
  faqSchema(FAQS.training),
];

const DIFFERENTIATORS = [
  { icon: Flask, title: "Hands-on, not passive", desc: "You learn by doing real lab work, not watching videos." },
  { icon: Cloud, title: "AWS-deep core", desc: "Cloud security on AWS is the spine of every track." },
  { icon: Cap, title: "1:1 mentorship", desc: "Real practitioners guide your progress and portfolio." },
  { icon: Shield, title: "Job-ready outcomes", desc: "Resume, portfolio, and interview prep built in." },
];

export default function TrainingPage() {
  return (
    <>
      <SchemaOrg schema={PAGE_SCHEMA} />

      <PageHero
        eyebrow="For individuals"
        title={
          <>
            Launch your <span className="text-gradient">security career</span> with real labs.
          </>
        }
        description="Hands-on training that takes you from motivated to job-ready — built around cloud security, with mentorship and a completion certificate."
      />

      {/* Programs */}
      <section className="border-b border-line py-14 sm:py-20">
        <Container>
          <div className="grid gap-6 lg:grid-cols-3">
            {TRAINING_PROGRAMS.map((p, i) => (
              <Reveal key={p.name} delay={i * 80}>
                <Card className={`flex h-full flex-col p-7 ${p.featured ? "ring-2 ring-brand/40" : ""}`}>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-muted">
                      {p.audience}
                    </span>
                    {p.featured ? <Pill tone="brand">From {INTERNSHIP.price}</Pill> : null}
                  </div>
                  <h3 className="mt-4 text-xl font-bold text-fg">{p.name}</h3>
                  <p className="mt-3 text-base leading-7 text-muted">{p.desc}</p>
                  <ul className="mt-5 grid flex-1 gap-2.5">
                    {p.points.map((pt) => (
                      <li key={pt} className="flex items-center gap-2.5 text-base text-fg/85">
                        <Check className="h-4 w-4 shrink-0 text-brand" />
                        {pt}
                      </li>
                    ))}
                  </ul>
                  <Link href={p.href} className="mt-6 inline-flex items-center gap-2 text-base font-semibold text-brand-bright">
                    {p.cta}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Card>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Differentiators */}
      <section className="border-b border-line py-14 sm:py-20">
        <Container>
          <Reveal>
            <SectionHeading eyebrow="Why train with us" title="Built to make you employable, not just certified" />
          </Reveal>
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {DIFFERENTIATORS.map((d, i) => {
              const Icon = d.icon;
              return (
                <Reveal key={d.title} delay={i * 70}>
                  <div>
                    <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-brand/25 bg-brand/10 text-brand-bright">
                      <Icon className="h-6 w-6" />
                    </span>
                    <h3 className="mt-4 text-lg font-semibold text-fg">{d.title}</h3>
                    <p className="mt-2 text-base leading-7 text-muted">{d.desc}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </Container>
      </section>

      <FaqSection faqs={FAQS.training} title="Training — frequently asked questions" />

      <CtaBand
        title="Ready to start your cyber career?"
        subtitle="Apply for the internship or talk to us about the track that fits where you are."
      />
    </>
  );
}
