import type { Metadata } from "next";
import Link from "next/link";
import { SITE } from "@/lib/site";
import { CCAF_BASE } from "@/lib/free-courses";
import { Container } from "@/components/ui";
import { SchemaOrg } from "@/components/schema-org";
import { breadcrumbSchema, webPageSchema } from "@/lib/schema";
import { ReadinessExam } from "@/components/ccaf-readiness-exam";
import { CourseGlossary } from "@/components/course-glossary";

const PAGE_URL = `${SITE.url}${CCAF_BASE}/readiness-exam`;

export const metadata: Metadata = {
  title: "CCA-F Readiness Exam — Free Scored Practice for Claude Certified Architect",
  description:
    "Free CCA-F practice exam: timed, scenario-anchored questions in the real exam's format, scored on the 100-1000 scale against the 720 pass line with a per-domain diagnosis. Original questions, not dumps.",
  keywords: [
    "cca-f practice exam",
    "claude certified architect practice questions",
    "cca-f mock exam free",
    "claude certification practice test",
    "anthropic exam readiness",
  ],
  alternates: { canonical: `${CCAF_BASE}/readiness-exam` },
  openGraph: {
    title: "CCA-F Readiness Exam — Free Scored Practice",
    description:
      "Timed, scenario-anchored practice scored out of 1000 against the 720 pass line, with per-domain diagnosis.",
    url: PAGE_URL,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "CCA-F Readiness Exam — Free Scored Practice",
    description:
      "Timed, scenario-anchored practice scored out of 1000 against the 720 pass line, with per-domain diagnosis.",
  },
};

const PAGE_SCHEMA = [
  webPageSchema({
    url: PAGE_URL,
    name: "CCA-F Readiness Exam",
    description:
      "Timed, scenario-anchored CCA-F practice questions scored on the exam's 1000-point scale with per-domain diagnosis.",
  }),
  breadcrumbSchema(PAGE_URL, [
    { name: "Home", url: SITE.url },
    { name: "Free Courses", url: `${SITE.url}/free-courses` },
    { name: "CCA-F Prep Course", url: `${SITE.url}${CCAF_BASE}` },
    { name: "Readiness Exam", url: PAGE_URL },
  ]),
];

export default function ReadinessExamPage() {
  return (
    <>
      <SchemaOrg schema={PAGE_SCHEMA} />
      <section className="relative isolate overflow-hidden border-b border-line">
        <div className="aurora absolute inset-0 -z-10" />
        <Container className="py-5 sm:py-7">
          <span className="inline-flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-bright">
            <span className="h-1 w-1 rounded-full bg-brand" />
            Readiness exam · scored like the real thing
          </span>
          <h1 className="mt-2 text-2xl font-bold leading-[1.15] tracking-tight text-fg sm:text-3xl lg:text-4xl">
            CCA-F Readiness Exam
          </h1>
          <p className="mt-2 max-w-3xl text-[15px] leading-7 text-muted">
            Scenario-anchored questions in the real exam&apos;s format: one correct answer, three plausible
            architectural mistakes. Scored on the exam&apos;s 100&ndash;1000 scale against the 720 pass line, with a
            per-domain diagnosis. The bank grows as the remaining lessons ship.
          </p>
        </Container>
      </section>

      <section className="py-6 sm:py-8">
        <Container>
          <div className="mx-auto max-w-3xl">
            <div className="mb-6">
              <CourseGlossary compact />
            </div>
            <ReadinessExam />
            <p className="mt-6 text-xs leading-5 text-muted">
              All questions are original ShieldSync items written in the exam&apos;s format — we do not publish exam
              dumps. Your score is saved in this browser only. Unofficial study resource; not affiliated with
              Anthropic.{" "}
              <Link href={CCAF_BASE} className="text-brand-bright hover:underline">
                Back to the course
              </Link>
              .
            </p>
          </div>
        </Container>
      </section>
    </>
  );
}
