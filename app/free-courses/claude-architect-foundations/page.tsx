import type { Metadata } from "next";
import Link from "next/link";
import { SITE } from "@/lib/site";
import { CCAF_BASE, CCAF_COURSE, CCAF_LESSONS } from "@/lib/free-courses";
import { Container, Card, Pill } from "@/components/ui";
import { PageHero, CtaBand, FaqSection } from "@/components/sections";
import { SchemaOrg } from "@/components/schema-org";
import { breadcrumbSchema, courseSchema, faqSchema, webPageSchema } from "@/lib/schema";
import { CourseStatusChips, LessonProgressRing } from "@/components/course-progress";
import { CourseGlossary } from "@/components/course-glossary";

export const metadata: Metadata = {
  title: "Claude Certified Architect (CCA-F) Free Prep Course — All 5 Domains",
  description:
    "Free CCA-F exam prep: all 5 domains of Anthropic's Claude Certified Architect – Foundations certification, the 6 scenarios, the 7 anti-patterns, animated architecture diagrams, quizzes, and a scored readiness exam. No signup.",
  keywords: [
    "claude certified architect",
    "cca-f exam prep",
    "cca-f study guide free",
    "claude certification course",
    "anthropic certification prep",
    "claude architect foundations domains",
    "agentic architecture exam",
    "mcp exam questions",
  ],
  alternates: { canonical: CCAF_BASE },
  openGraph: {
    title: "Claude Certified Architect (CCA-F) Free Prep Course",
    description:
      "All 5 domains, 6 scenarios, 7 anti-patterns — with animated diagrams, quizzes, and a scored readiness exam. Free, no signup.",
    url: `${SITE.url}${CCAF_BASE}`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Claude Certified Architect (CCA-F) Free Prep Course",
    description:
      "All 5 domains, 6 scenarios, 7 anti-patterns — with animated diagrams, quizzes, and a scored readiness exam.",
  },
};

const PAGE_URL = `${SITE.url}${CCAF_BASE}`;

const FAQS = [
  {
    q: "Is this an official Anthropic course?",
    a: "No. This is a free, unofficial study resource published by ShieldSync Security. It is not affiliated with, endorsed by, or sponsored by Anthropic. You register for the real exam through Anthropic Academy.",
  },
  {
    q: "What is the CCA-F exam format?",
    a: "60 multiple-choice questions in 120 minutes, proctored and closed-book. Questions are anchored to 4 of 6 business scenarios drawn at random, and you pass at 720 on a 100-1000 scaled score. The listed exam fee is $125.",
  },
  {
    q: "Who should sit the CCA-F exam?",
    a: "Anthropic's guidance targets practitioners with roughly 6+ months of hands-on experience building with the Claude API, Claude Code, the Claude Agent SDK, and MCP. Exam access launched via the Claude Partner Network, with wider public access expected during 2026.",
  },
  {
    q: "Are your practice questions real exam questions?",
    a: "No — and that matters. All questions here are original ShieldSync items written in the exam's format (scenario stem, one correct answer, three anti-pattern distractors). We do not publish exam dumps; they violate certification agreements and teach you nothing about the reasoning the exam actually tests.",
  },
  {
    q: "Do I need an account to use this course?",
    a: "No signup, no paywall. Your lesson progress and readiness-exam scores are saved in your browser so you can leave and resume any time on this device.",
  },
];

const PAGE_SCHEMA = [
  webPageSchema({
    url: PAGE_URL,
    name: CCAF_COURSE.name,
    description: CCAF_COURSE.description,
  }),
  breadcrumbSchema(PAGE_URL, [
    { name: "Home", url: SITE.url },
    { name: "Free Courses", url: `${SITE.url}/free-courses` },
    { name: "Claude Certified Architect – Foundations", url: PAGE_URL },
  ]),
  courseSchema({
    url: PAGE_URL,
    name: CCAF_COURSE.name,
    description: CCAF_COURSE.description,
    level: CCAF_COURSE.level,
    hoursMin: CCAF_COURSE.hoursMin,
    free: true,
  }),
  faqSchema(FAQS),
];

export default function CcafHubPage() {
  return (
    <>
      <SchemaOrg schema={PAGE_SCHEMA} />
      <PageHero
        eyebrow="Free certification prep · 2026 blueprint"
        title={
          <>
            Claude Certified Architect – Foundations: <span className="text-gradient">the complete prep course</span>
          </>
        }
        description="Every domain, every task statement, every anti-pattern in Anthropic's first official certification — taught with real code, animated architecture diagrams, and an exam-style readiness score out of 1000."
      />

      <section className="py-8 sm:py-10">
        <Container>
          <div className="mx-auto max-w-5xl">
          {/* exam facts + resume */}
          <div className="flex flex-wrap items-center gap-2">
            <Pill tone="brand">Free · no signup</Pill>
            <Pill>{CCAF_COURSE.exam.questions} questions</Pill>
            <Pill>{CCAF_COURSE.exam.minutes} minutes</Pill>
            <Pill>Pass at {CCAF_COURSE.exam.passScore}/1000</Pill>
            <Pill>5 domains · 6 scenarios</Pill>
            <Pill>Proctored · closed book · ${CCAF_COURSE.exam.priceUSD}</Pill>
          </div>
          <CourseStatusChips lessonHref={`${CCAF_BASE}/agentic-architecture`} />

          <p className="mt-5 max-w-none rounded-xl border border-dashed border-line-strong bg-panel px-4 py-2.5 text-xs leading-5 text-muted">
            <strong className="text-fg">Unofficial study resource.</strong> This free course is published by ShieldSync
            Security and is not affiliated with, endorsed by, or sponsored by Anthropic. &quot;Claude&quot; and
            &quot;Claude Certified Architect&quot; are trademarks of Anthropic, PBC. Register for the real exam at
            Anthropic Academy. Exam access launched via the Claude Partner Network; wider public access is expected
            during 2026.
          </p>

          {/* weights + what you get */}
          <div className="mt-6 grid gap-5 lg:grid-cols-[1.4fr_1fr]">
            <Card hover={false} className="p-5 sm:p-6">
              <h2 className="text-base font-bold text-fg">How the exam is weighted — and how this course mirrors it</h2>
              <div className="mt-3">
                {CCAF_COURSE.domains.map((d) => (
                  <div key={d.num} className="mb-2.5">
                    <div className="flex justify-between text-[13px] font-semibold">
                      <span className="text-fg">
                        {d.num} · {d.name}
                      </span>
                      <span className="text-brand-bright">{d.weight}%</span>
                    </div>
                    <div className="mt-1 h-2 overflow-hidden rounded-full bg-surface-2">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-brand to-cyan"
                        style={{ width: `${d.weight}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <p className="mt-3 text-[13px] leading-6 text-muted">
                Lesson depth is proportional to exam weight — Domain 1 gets the most pages, Domain 5 the fewest. Every
                question in the real exam is anchored to one of six business scenarios; the scenarios and anti-pattern
                lessons train that format directly.
              </p>
            </Card>
            <Card hover={false} className="p-5 sm:p-6">
              <h2 className="text-base font-bold text-fg">What you get (all free, all on-site)</h2>
              <ul className="mt-3 space-y-2 text-sm leading-6 text-muted">
                <li>
                  <strong className="text-fg">9 lessons</strong> covering 100% of the published blueprint — nothing
                  skipped, nothing &quot;high level&quot;
                </li>
                <li>
                  <strong className="text-fg">Animated architecture diagrams</strong> for every core pattern — the
                  agentic loop, topologies, context isolation, hooks
                </li>
                <li>
                  <strong className="text-fg">Real artifacts</strong>: working agentic loops, MCP configs, CLAUDE.md
                  hierarchies, CI/CD commands, JSON schemas
                </li>
                <li>
                  <strong className="text-fg">Checkpoint quizzes</strong> with instant explanations
                </li>
                <li>
                  <strong className="text-fg">Readiness exam</strong> scored out of 1000 with a per-domain diagnosis
                  against the 720 pass line
                </li>
              </ul>
              <Link
                href={`${CCAF_BASE}/readiness-exam`}
                className="mt-4 inline-flex items-center justify-center gap-2 rounded-xl border border-line bg-panel px-4 py-2.5 text-sm font-semibold text-fg shadow-sm transition hover:border-line-strong hover:bg-surface"
              >
                Try the readiness exam
              </Link>
            </Card>
          </div>

          <div className="mt-6">
            <CourseGlossary />
          </div>

          {/* lessons */}
          <h2 className="mt-8 text-xl font-bold tracking-tight text-fg sm:text-2xl">Course lessons</h2>
          <div className="mt-4 grid gap-3">
            {CCAF_LESSONS.map((l) => {
              const href = l.slug ? `${CCAF_BASE}/${l.slug}` : `${CCAF_BASE}#lessons`;
              const isLive = l.status === "live";
              const inner = (
                <>
                  <span className="flex h-9 w-9 flex-none items-center justify-center rounded-full bg-brand/10 text-sm font-extrabold text-brand-bright">
                    {l.num}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-[14.5px] font-semibold text-fg">{l.title}</span>
                    <span className="block text-[12.5px] leading-5 text-muted">{l.desc}</span>
                  </span>
                  <span className="flex-none text-right">
                    {isLive && l.progressIds ? (
                      <LessonProgressRing ids={l.progressIds} />
                    ) : (
                      <span className="font-mono text-[10px] font-semibold tracking-[0.1em] text-muted">
                        {isLive ? `${l.minutes} MIN` : "COMING SOON"}
                      </span>
                    )}
                  </span>
                </>
              );
              const cls =
                "panel flex items-center gap-4 rounded-2xl p-4 transition duration-300";
              return isLive && l.slug ? (
                <Link key={l.num} href={href} className={`${cls} hover:-translate-y-0.5 hover:border-brand/45 hover:shadow-lg`}>
                  {inner}
                </Link>
              ) : (
                <div key={l.num} className={`${cls} ${isLive ? "" : "opacity-60"}`}>
                  {inner}
                </div>
              );
            })}
          </div>
          </div>
        </Container>
      </section>

      <FaqSection faqs={FAQS} title="CCA-F exam: quick answers" />

      <CtaBand
        title="Theory passed. Now break something real."
        subtitle="You just learned how agentic systems are architected — ShieldSync's hands-on labs let you attack and harden cloud environments for real. The first lab is free."
        primary={{ label: "Start free lab", href: SITE.freeLabUrl }}
        secondary={{ label: "Explore all labs", href: "/labs-wizard" }}
      />
    </>
  );
}
