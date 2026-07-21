import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import { SITE } from "@/lib/site";
import { CCAF_BASE } from "@/lib/free-courses";
import { Container } from "@/components/ui";
import { SchemaOrg } from "@/components/schema-org";
import { breadcrumbSchema, webPageSchema } from "@/lib/schema";
import { MarkCompleteButton } from "@/components/course-progress";
import { LessonToc, LessonChipNav, type TocItem } from "@/components/course-toc";

const LESSON_URL = `${SITE.url}${CCAF_BASE}/exam-orientation`;

export const metadata: Metadata = {
  title: "CCA-F Exam Orientation — Format, Scenarios, Scoring & Registration",
  description:
    "Everything about sitting the Claude Certified Architect - Foundations (CCA-F) exam: the 60-question format, the 4-of-6 scenario draw, 720/1000 scoring, proctoring rules, registration via Anthropic Academy, and a 4-week study plan.",
  keywords: [
    "cca-f exam format",
    "claude certified architect registration",
    "cca-f passing score",
    "cca-f scenarios",
    "claude certification cost",
    "cca-f study plan",
  ],
  alternates: { canonical: `${CCAF_BASE}/exam-orientation` },
  openGraph: {
    title: "CCA-F Exam Orientation — Format, Scenarios, Scoring & Registration",
    description:
      "The 60-question format, 4-of-6 scenario draw, 720/1000 scoring, proctoring rules, and a 4-week study plan.",
    url: LESSON_URL,
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "CCA-F Exam Orientation",
    description: "Format, scenarios, scoring, registration, and a 4-week study plan for the CCA-F exam.",
  },
};

const PAGE_SCHEMA = [
  webPageSchema({
    url: LESSON_URL,
    name: "CCA-F Exam Orientation",
    description:
      "Lesson 0 of the free CCA-F prep course: exam format, the six scenarios, scoring, proctoring, registration, and a 4-week study plan.",
  }),
  breadcrumbSchema(LESSON_URL, [
    { name: "Home", url: SITE.url },
    { name: "Free Courses", url: `${SITE.url}/free-courses` },
    { name: "CCA-F Prep Course", url: `${SITE.url}${CCAF_BASE}` },
    { name: "Lesson 0: Exam Orientation", url: LESSON_URL },
  ]),
];

const TOC: TocItem[] = [
  { id: "s1", label: "0.1 What the CCA-F is", progressId: "d0-s1" },
  { id: "s2", label: "0.2 Format & scoring", progressId: "d0-s2" },
  { id: "s3", label: "0.3 The six scenarios", progressId: "d0-s3" },
  { id: "s4", label: "0.4 How questions are built", progressId: "d0-s4" },
  { id: "s5", label: "0.5 Registration & official resources", progressId: "d0-s5" },
  { id: "s6", label: "0.6 Using this course + 4-week plan", progressId: "d0-s6" },
];

function Sec({ id, pid, title, children }: { id: string; pid: string; title: string; children: ReactNode }) {
  return (
    <section id={id} className="panel mb-4 scroll-mt-24 rounded-2xl p-5 sm:p-6">
      <h2 className="text-lg font-bold tracking-tight text-fg sm:text-xl">{title}</h2>
      {children}
      <div className="mt-4 flex justify-end border-t border-dashed border-line pt-3">
        <MarkCompleteButton id={pid} />
      </div>
    </section>
  );
}

function P({ children }: { children: ReactNode }) {
  return <p className="mt-2.5 max-w-[76ch] text-[15px] leading-7 text-slate-700">{children}</p>;
}

const TH =
  "border border-line bg-ink-2 px-3 py-2 text-left text-[11px] font-semibold uppercase tracking-[0.08em] text-slate-600";
const TD = "border border-line px-3 py-2 align-top text-[13.5px] leading-6 text-slate-700";

export default function ExamOrientationLesson() {
  return (
    <>
      <SchemaOrg schema={PAGE_SCHEMA} />
      <section className="relative isolate overflow-hidden border-b border-line">
        <div className="aurora absolute inset-0 -z-10" />
        <Container className="py-5 sm:py-7">
          <span className="inline-flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-bright">
            <span className="h-1 w-1 rounded-full bg-brand" />
            Lesson 0 · Read this before anything else
          </span>
          <h1 className="mt-2 text-2xl font-bold leading-[1.15] tracking-tight text-fg sm:text-3xl lg:text-4xl">
            Exam orientation: format, scenarios, scoring, registration
          </h1>
          <p className="mt-2 max-w-3xl text-[15px] leading-7 text-muted">
            Fifteen minutes that stop you studying the wrong way: how the CCA-F actually asks questions, how it is
            scored, what the proctor allows, and how to plan four weeks of preparation.
          </p>
        </Container>
      </section>

      <section className="py-6 sm:py-8">
        <Container>
          <LessonChipNav items={TOC} />
          <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[230px_minmax(0,1fr)]">
            <aside className="sticky top-24 hidden self-start lg:block">
              <LessonToc items={TOC} />
            </aside>
            <main className="min-w-0">
              <Sec id="s1" pid="d0-s1" title="0.1 What the CCA-F is — and who should sit it">
                <P>
                  The Claude Certified Architect – Foundations (CCA-F) is Anthropic&apos;s first official
                  certification, launched 12 March 2026 on Anthropic Academy. It validates that you can{" "}
                  <strong>make informed architectural trade-offs</strong> when building real systems with the Claude
                  API, Claude Code, the Claude Agent SDK, and the Model Context Protocol (MCP) — not that you can
                  recite documentation.
                </P>
                <P>
                  Anthropic&apos;s stated candidate profile is roughly <strong>six or more months of hands-on
                  building</strong> across those four surfaces. If you are still learning API fundamentals or mostly
                  use Claude through the chat interface, work through this course first and sit the exam when the
                  readiness exam says you are consistently above the pass line — the exam fee is real money and
                  retakes cost time.
                </P>
                <P>
                  Access note: the exam launched gated to Claude Partner Network members (free to join), with wider
                  public access expected during 2026 — still gated as of this writing. Registration is a two-step
                  flow: eligibility/purchase through Anthropic&apos;s Partner Academy, then scheduling through Pearson
                  VUE (see 0.2). Check the current status on Anthropic Academy before planning a date.
                </P>
              </Sec>

              <Sec id="s2" pid="d0-s2" title="0.2 Format, scoring and proctoring">
                <div className="mt-3 overflow-x-auto">
                  <table className="w-full border-collapse">
                    <tbody>
                      <tr>
                        <td className={`${TD} font-semibold`}>Questions</td>
                        <td className={TD}>60 multiple-choice: one correct answer, three distractors. No labs, no free text.</td>
                      </tr>
                      <tr>
                        <td className={`${TD} font-semibold`}>Time</td>
                        <td className={TD}>120 minutes — an average of 2 minutes per question. Non-pausable.</td>
                      </tr>
                      <tr>
                        <td className={`${TD} font-semibold`}>Scoring</td>
                        <td className={TD}>Scaled score of 100–1000; <strong>720 passes</strong>. Scaled means you cannot compute "X of 60 correct = pass" exactly — aim well above the line in practice.</td>
                      </tr>
                      <tr>
                        <td className={`${TD} font-semibold`}>Fee</td>
                        <td className={TD}>$125 listed on the official certification page (partner pricing has differed).</td>
                      </tr>
                      <tr>
                        <td className={`${TD} font-semibold`}>Proctoring</td>
                        <td className={TD}>Delivered via Pearson VUE (OnVUE online proctoring, or an in-person test center) — closed book, <strong>no AI assistance</strong>. This moved off the exam&apos;s original ProctorFree setup in a June/July 2026 migration, alongside the exam&apos;s formal code becoming CCAR-F (still commonly called CCA-F).</td>
                      </tr>
                      <tr>
                        <td className={`${TD} font-semibold`}>Retakes</td>
                        <td className={TD}>Up to 4 attempts per rolling 12 months, with escalating waits: 14 days after attempt 1, 30 after attempt 2, 90 after attempt 3. Recertification cycle is 12 months.</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <P>
                  Practical consequences: with 2 minutes per question, you cannot afford to reason every option from
                  first principles. The candidates who finish comfortably are the ones who recognise the{" "}
                  <Link href={`${CCAF_BASE}`} className="text-brand-bright hover:underline">
                    seven anti-patterns
                  </Link>{" "}
                  on sight and eliminate two options instantly.
                </P>
              </Sec>

              <Sec id="s3" pid="d0-s3" title="0.3 The six scenarios — your exam is four of them">
                <P>
                  Every question on the CCA-F is anchored to a business scenario. The pool holds six; each sitting
                  draws <strong>four at random</strong>, and all 60 questions are framed inside those four contexts.
                  You cannot pick, so you prepare all six:
                </P>
                <div className="mt-3 overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr>
                        <th className={TH}>Scenario</th>
                        <th className={TH}>What it really tests</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className={`${TD} font-semibold`}>Customer Support Resolution Agent</td>
                        <td className={TD}>Escalation design, tool error recovery, session state across long conversations.</td>
                      </tr>
                      <tr>
                        <td className={`${TD} font-semibold`}>Code Generation with Claude Code</td>
                        <td className={TD}>Team-wide configuration: CLAUDE.md hierarchy, slash commands, plan mode vs direct execution.</td>
                      </tr>
                      <tr>
                        <td className={`${TD} font-semibold`}>Multi-Agent Research System</td>
                        <td className={TD}>Coordinator/subagent orchestration, context passing, graceful failure handling.</td>
                      </tr>
                      <tr>
                        <td className={`${TD} font-semibold`}>Developer Productivity</td>
                        <td className={TD}>Built-in tools (Read, Grep, Glob, Bash), MCP integration for codebase navigation.</td>
                      </tr>
                      <tr>
                        <td className={`${TD} font-semibold`}>Claude Code in CI/CD</td>
                        <td className={TD}>Headless -p mode, --output-format json, session isolation, minimising false positives.</td>
                      </tr>
                      <tr>
                        <td className={`${TD} font-semibold`}>Structured Data Extraction</td>
                        <td className={TD}>JSON schemas, nullable fields against hallucination, validation loops, Batch API trade-offs.</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <P>
                  Lesson 6 walks each scenario in depth; our{" "}
                  <Link href={`${CCAF_BASE}/readiness-exam`} className="text-brand-bright hover:underline">
                    readiness exam
                  </Link>{" "}
                  tags every question with its scenario so you feel the format early.
                </P>
              </Sec>

              <Sec id="s4" pid="d0-s4" title="0.4 How questions are built (and how to eliminate)">
                <P>
                  CCA-F distractors are not random wrong answers — they are <strong>plausible architectural
                  mistakes</strong>, drawn from a small set of failure modes: enforcing rules through prompts instead
                  of hooks, trusting model self-reported confidence, using the Batch API in real-time flows, growing
                  the context window instead of restructuring, silent subagent failures, unrestricted tool access, and
                  flat agent topologies.
                </P>
                <P>
                  That gives you a repeatable elimination method: read the stem, identify the constraint word
                  (&quot;must never&quot;, &quot;real-time&quot;, &quot;cost-optimal&quot;, &quot;20,000 documents&quot;),
                  and strike every option that matches a known anti-pattern. Usually exactly one option survives.
                  Every quiz explanation in this course names the anti-pattern behind each wrong option to train that
                  reflex.
                </P>
              </Sec>

              <Sec id="s5" pid="d0-s5" title="0.5 Registration and the official resources">
                <P>
                  You register through <strong>Anthropic&apos;s Partner Academy</strong> for eligibility and purchase,
                  then schedule the sitting itself through <strong>Pearson VUE</strong>. The certification page
                  carries three documents worth reading before exam day: the official Exam Guide (includes sample
                  questions), the Certification Terms, and the Exam Policy. Anthropic&apos;s full-length official
                  practice exam was retired in the same mid-2026 migration to Pearson VUE — only the Exam
                  Guide&apos;s sample questions remain official. Our readiness exam and the checkpoint quizzes in
                  every lesson are the closest full-length substitute; run through this course and aim for a
                  comfortable, repeated margin above 720 before booking.
                </P>
                <P>
                  Anthropic&apos;s free self-paced courses (Claude 101, Building with the Claude API, the MCP courses,
                  Claude Code in Action, subagents and skills) are the official syllabus. This course compresses and
                  cross-links that material into the exam&apos;s own structure — it replaces none of the hands-on
                  practice, which is where the exam is actually won.
                </P>
              </Sec>

              <Sec id="s6" pid="d0-s6" title="0.6 How to use this course — a 4-week plan">
                <div className="mt-3 overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr>
                        <th className={TH}>Week</th>
                        <th className={TH}>Study</th>
                        <th className={TH}>Build (non-negotiable)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className={TD}>1</td>
                        <td className={TD}>Lesson 1 (Domain 1 — 27%, the biggest)</td>
                        <td className={TD}>Write a bounded agentic loop with real tool calling and error results.</td>
                      </tr>
                      <tr>
                        <td className={TD}>2</td>
                        <td className={TD}>Lessons 2 + 3 (MCP, Claude Code)</td>
                        <td className={TD}>Build one small MCP server; set up CLAUDE.md + rules + one hook in a real repo.</td>
                      </tr>
                      <tr>
                        <td className={TD}>3</td>
                        <td className={TD}>Lessons 4 + 5 (structured output, context)</td>
                        <td className={TD}>Ship a schema-validated extraction pipeline with a retry loop.</td>
                      </tr>
                      <tr>
                        <td className={TD}>4</td>
                        <td className={TD}>Lessons 6 + 7 (scenarios, anti-patterns), readiness exam twice</td>
                        <td className={TD}>Fix your weakest domain from the diagnosis; retake the readiness exam until consistently above 720; book.</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <P>
                  Progress is saved in your browser — the rings on the{" "}
                  <Link href={CCAF_BASE} className="text-brand-bright hover:underline">
                    course hub
                  </Link>{" "}
                  track each lesson. Start with Domain 1.
                </P>
              </Sec>

              <div className="mt-5 flex flex-wrap gap-3">
                <Link
                  href={`${CCAF_BASE}/agentic-architecture`}
                  className="glow-brand inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-brand to-cyan px-5 py-3 text-base font-semibold text-white transition hover:brightness-110"
                >
                  Start Lesson 1: Agentic Architecture
                </Link>
                <Link
                  href={CCAF_BASE}
                  className="inline-flex items-center justify-center rounded-xl border border-line bg-panel px-5 py-3 text-base font-semibold text-fg shadow-sm transition hover:border-line-strong hover:bg-surface"
                >
                  Back to course home
                </Link>
              </div>

              <p className="mt-6 text-xs leading-5 text-muted">
                Unofficial study resource — not affiliated with, endorsed by, or sponsored by Anthropic. Exam
                logistics reflect Anthropic&apos;s published information as of July 2026; always confirm current
                details on Anthropic Academy before booking.
              </p>
            </main>
          </div>
        </Container>
      </section>
    </>
  );
}
