import type { Metadata } from "next";
import { Container, Card, Pill, Button, SectionHeading } from "@/components/ui";
import { Reveal } from "@/components/reveal";
import { ArrowRight, Check, Cloud, Flask, Radar, Cap } from "@/components/icons";
import { SchemaOrg } from "@/components/schema-org";
import { RelatedBlogSection } from "@/components/related-blog-section";
import { webPageSchema, breadcrumbSchema, internshipProgramSchema } from "@/lib/schema";
import { InternshipApplyForm } from "@/components/internship-apply-form";
import { InternshipPlanDownload } from "@/components/internship-plan-download";
import { INTERNSHIP, SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Cybersecurity Internship in India — 8 Weeks, AWS Labs, Certificate",
  description:
    "Online cybersecurity internship in India: hands-on AWS security projects, real cloud labs, 1:1 mentorship, and a completion certificate. 8 weeks, ₹9,999 all-inclusive. Open to students and career-changers.",
  keywords: [
    "cybersecurity internship india",
    "cybersecurity internship online",
    "cloud security internship",
    "AWS security internship",
    "cybersecurity internship for students",
    "online cybersecurity course india",
  ],
  alternates: { canonical: "/internship" },
  openGraph: {
    title: "Cybersecurity Internship in India — 8 Weeks, AWS Labs, Certificate",
    description:
      "Online cybersecurity internship: hands-on AWS security projects, 1:1 mentorship, certificate. ₹9,999 all-inclusive.",
    url: `${SITE.url}/internship`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cybersecurity Internship in India — 8 Weeks, AWS Labs",
    description: "Hands-on AWS security projects + mentorship + certificate. ₹9,999.",
  },
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

        <Container className="py-6 sm:py-8">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.05fr] lg:items-start">

            {/* Left: pitch */}
            <Reveal>
              <Pill tone="brand">{INTERNSHIP.badge}</Pill>
              <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-fg sm:text-4xl lg:text-5xl">
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

              {/* Download the full 8-week plan as a PDF */}
              <div className="mt-5">
                <InternshipPlanDownload />
                <p className="mt-1.5 text-xs text-muted">
                  Full curriculum, week by week — see exactly what you&apos;ll learn before you apply.
                </p>
              </div>
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

      {/* ─── Week-by-week curriculum ──────────────────────────────────────── */}
      <section className="border-t border-line py-8 sm:py-10">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="The 8-week plan"
              title="Exactly what you'll learn, week by week"
              description={INTERNSHIP.commitment}
            />
          </Reveal>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {INTERNSHIP.curriculum.map((w, i) => (
              <Reveal key={w.week} delay={(i % 2) * 60}>
                <div className="flex h-full flex-col rounded-2xl border border-line bg-panel p-5">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex h-7 min-w-7 items-center justify-center rounded-full bg-brand/10 px-2 text-xs font-bold text-brand-bright">
                      {i + 1}
                    </span>
                    <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-muted">{w.week}</span>
                  </div>
                  <h3 className="mt-2 text-base font-bold text-fg">{w.title}</h3>
                  <p className="mt-1 text-sm font-medium text-brand-bright">{w.focus}</p>
                  <ul className="mt-3 grid gap-1.5">
                    {w.learn.map((l) => (
                      <li key={l} className="flex items-start gap-2 text-sm text-muted">
                        <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand" /> {l}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-auto pt-3 text-sm text-fg/85">
                    <span className="font-semibold text-fg">Build:</span> {w.project}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* ─── Certificate + exam readiness ─────────────────────────────────── */}
      <section className="border-t border-line py-8 sm:py-10">
        <Container>
          <div className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
            <Reveal>
              <div className="flex h-full flex-col rounded-2xl border border-brand/30 bg-gradient-to-br from-brand/[0.08] to-transparent p-6 sm:p-7">
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-brand/25 bg-brand/10 text-brand-bright">
                    <Cap className="h-5 w-5" />
                  </span>
                  <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-brand-bright">What you graduate with</p>
                </div>
                <h2 className="mt-3 text-xl font-bold text-fg sm:text-2xl">{INTERNSHIP.certificate.title}</h2>
                <p className="mt-2 text-sm leading-6 text-muted">{INTERNSHIP.certificate.detail}</p>
              </div>
            </Reveal>
            <Reveal delay={80}>
              <div className="flex h-full flex-col rounded-2xl border border-line bg-panel p-6 sm:p-7">
                <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-brand-bright">Plus — exam ready</p>
                <h3 className="mt-3 text-lg font-bold text-fg">Toward AWS Security Specialty (SCS-C03)</h3>
                <p className="mt-2 text-sm leading-6 text-muted">{INTERNSHIP.certificate.examReadiness}</p>
                <Button href="/aws-security-certification" variant="secondary" className="mt-4 self-start">
                  See the SCS-C03 path
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      <RelatedBlogSection keywords={["Training", "Cloud", "AWS", "Career"]} />
    </>
  );
}
