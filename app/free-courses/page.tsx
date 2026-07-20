import type { Metadata } from "next";
import Link from "next/link";
import { SITE } from "@/lib/site";
import { CCAF_BASE, CCAF_COURSE, CCAF_LESSONS } from "@/lib/free-courses";
import { Container, Card, Pill } from "@/components/ui";
import { PageHero, CtaBand } from "@/components/sections";
import { SchemaOrg } from "@/components/schema-org";
import { breadcrumbSchema, courseListSchema, webPageSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Free Courses — Certification Prep & Security Skills",
  description:
    "Free, in-depth courses from ShieldSync: complete certification prep with animated architecture diagrams, checkpoint quizzes, progress tracking, and scored readiness exams. No signup required.",
  keywords: [
    "free courses",
    "free certification prep",
    "claude certified architect course",
    "cca-f exam prep free",
    "ai agent architecture course",
    "shieldsync free courses",
  ],
  alternates: { canonical: "/free-courses" },
  openGraph: {
    title: "Free Courses | ShieldSync Security",
    description:
      "Free, in-depth certification prep courses with animated diagrams, quizzes, and scored readiness exams.",
    url: `${SITE.url}/free-courses`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Courses | ShieldSync Security",
    description:
      "Free, in-depth certification prep courses with animated diagrams, quizzes, and scored readiness exams.",
  },
};

const PAGE_URL = `${SITE.url}/free-courses`;

const PAGE_SCHEMA = [
  webPageSchema({
    url: PAGE_URL,
    name: "Free Courses",
    description:
      "Free, in-depth courses from ShieldSync: certification prep with animated diagrams, quizzes, and scored readiness exams.",
  }),
  breadcrumbSchema(PAGE_URL, [
    { name: "Home", url: SITE.url },
    { name: "Free Courses", url: PAGE_URL },
  ]),
  courseListSchema({
    url: PAGE_URL,
    name: "ShieldSync Free Courses",
    items: [
      {
        url: `${SITE.url}${CCAF_BASE}`,
        name: CCAF_COURSE.name,
        description: CCAF_COURSE.description,
      },
    ],
  }),
];

export default function FreeCoursesPage() {
  const liveLessons = CCAF_LESSONS.filter((l) => l.status === "live").length;
  return (
    <>
      <SchemaOrg schema={PAGE_SCHEMA} />
      <PageHero
        eyebrow="Free courses"
        title={
          <>
            Learn it properly. <span className="text-gradient">Pay nothing.</span>
          </>
        }
        description="In-depth, no-signup courses built the ShieldSync way: real code and configs, animated architecture diagrams, checkpoint quizzes, and scored readiness exams — not surface-level summaries."
      />

      <section className="py-10 sm:py-14">
        <Container>
          <div className="mx-auto grid max-w-4xl gap-5">
            <Card className="p-6 sm:p-7">
              <div className="flex flex-wrap items-center gap-2">
                <Pill tone="brand">Certification prep</Pill>
                <Pill>
                  {liveLessons} of {CCAF_LESSONS.length} lessons live
                </Pill>
                <Pill>Free · no signup</Pill>
              </div>
              <h2 className="mt-3 text-xl font-bold tracking-tight text-fg sm:text-2xl">
                <Link href={CCAF_BASE} className="hover:text-brand-bright">
                  Claude Certified Architect – Foundations (CCA-F): the complete prep course
                </Link>
              </h2>
              <p className="mt-2 text-base leading-7 text-muted">
                Every domain, every task statement, every anti-pattern in Anthropic&apos;s first official AI
                certification — taught with real code, animated architecture diagrams, and an exam-style readiness
                score out of 1000. Built for engineers who want to pass on the first sitting.
              </p>
              <div className="mt-4 flex flex-wrap gap-2 text-[13px] text-muted">
                <span className="rounded-full border border-line bg-surface px-3 py-1">5 domains · 6 scenarios</span>
                <span className="rounded-full border border-line bg-surface px-3 py-1">60 questions · 120 minutes</span>
                <span className="rounded-full border border-line bg-surface px-3 py-1">Pass at 720/1000</span>
                <span className="rounded-full border border-line bg-surface px-3 py-1">Scored readiness exam</span>
              </div>
              <div className="mt-5">
                <Link
                  href={CCAF_BASE}
                  className="glow-brand inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-brand to-cyan px-5 py-3 text-base font-semibold text-white transition hover:brightness-110"
                >
                  Start the course — free
                </Link>
              </div>
            </Card>

            <p className="text-sm text-muted">
              More free courses are on the way. Courses are unofficial study resources unless stated otherwise —
              certification names belong to their respective owners.
            </p>
          </div>
        </Container>
      </section>

      <CtaBand
        compact
        title="Prefer learning by breaking things?"
        subtitle="Our hands-on labs put you inside real cloud environments with real misconfigurations. The first one is free."
        primary={{ label: "Start free lab", href: SITE.freeLabUrl }}
        secondary={{ label: "Explore all labs", href: "/labs-wizard" }}
      />
    </>
  );
}
