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
import { CheckpointQuiz, type QuizQuestion } from "@/components/course-quiz";
import { CourseGlossary } from "@/components/course-glossary";
import { AntiPatternsOverviewDiagram, EliminationDrillDiagram } from "@/components/course-diagrams-antipatterns";

const LESSON_URL = `${SITE.url}${CCAF_BASE}/anti-patterns`;

export const metadata: Metadata = {
  title: "The 7 CCA-F Anti-Patterns — How Wrong Answers Are Built (Free Lesson)",
  description:
    "Free CCA-F lesson: the seven recurring architectural mistakes the exam builds its wrong-answer options from — prompt-based rule enforcement, self-reported confidence, Batch API misuse, bigger-context-window fixes, silent tool failure, unrestricted tool access, and flat multi-agent topology — with a rapid elimination drill and an exam-style quiz.",
  keywords: [
    "cca-f anti-patterns",
    "claude certified architect wrong answers",
    "cca-f distractors",
    "claude agent architecture mistakes",
    "claude certified architect foundations study guide",
  ],
  alternates: { canonical: `${CCAF_BASE}/anti-patterns` },
  openGraph: {
    title: "The 7 CCA-F Anti-Patterns — How Wrong Answers Are Built",
    description:
      "Every distractor on the exam is one of seven plausible architectural mistakes. Learn to recognise each on sight and eliminate 2-3 wrong options before you finish reading the stem.",
    url: LESSON_URL,
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "The 7 CCA-F Anti-Patterns — How Wrong Answers Are Built",
    description:
      "The seven recurring architectural mistakes behind every CCA-F distractor, taught as a systematic reference with a rapid elimination drill.",
  },
};

const PAGE_SCHEMA = [
  webPageSchema({
    url: LESSON_URL,
    name: "The 7 CCA-F Anti-Patterns — How Wrong Answers Are Built",
    description:
      "Free lesson giving each of the seven recurring CCA-F anti-patterns its own dedicated treatment: definition, why it is a tempting distractor, a wrong-vs-right contrast, and the exam's signal phrasing — plus a worked rapid-elimination drill.",
  }),
  breadcrumbSchema(LESSON_URL, [
    { name: "Home", url: SITE.url },
    { name: "Free Courses", url: `${SITE.url}/free-courses` },
    { name: "CCA-F Prep Course", url: `${SITE.url}${CCAF_BASE}` },
    { name: "The 7 Anti-Patterns", url: LESSON_URL },
  ]),
];

const TOC: TocItem[] = [
  { id: "s1", label: "7.1 Prompt-based rule enforcement", progressId: "d7-s1" },
  { id: "s2", label: "7.2 Self-reported confidence", progressId: "d7-s2" },
  { id: "s3", label: "7.3 Batch API misuse", progressId: "d7-s3" },
  { id: "s4", label: "7.4 Bigger context window", progressId: "d7-s4" },
  { id: "s5", label: "7.5 Silent tool/subagent failure", progressId: "d7-s5" },
  { id: "s6", label: "7.6 Unrestricted tool access", progressId: "d7-s6" },
  { id: "s7", label: "7.7 Flat multi-agent topology", progressId: "d7-s7" },
  { id: "drill", label: "Rapid elimination drill" },
  { id: "quiz", label: "Checkpoint quiz" },
];

/* ---- local presentational helpers (matches agentic-architecture/page.tsx) --- */

function Sec({
  id,
  pid,
  title,
  blueprint,
  children,
}: {
  id: string;
  pid: string;
  title: string;
  blueprint: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="panel mb-4 scroll-mt-24 rounded-2xl p-5 sm:p-6">
      <h2 className="text-lg font-bold tracking-tight text-fg sm:text-xl">{title}</h2>
      {children}
      <div className="mt-4 flex flex-wrap items-center justify-between gap-2.5 border-t border-dashed border-line pt-3">
        <span className="text-xs text-muted">{blueprint}</span>
        <MarkCompleteButton id={pid} />
      </div>
    </section>
  );
}

function P({ children }: { children: ReactNode }) {
  return <p className="mt-2.5 max-w-[76ch] text-[15px] leading-7 text-slate-700">{children}</p>;
}

function H3({ children }: { children: ReactNode }) {
  return <h3 className="mt-4 text-[15.5px] font-semibold text-fg">{children}</h3>;
}

function Code({ children }: { children: ReactNode }) {
  return (
    <code className="rounded-md border border-line bg-surface-2 px-1 py-0.5 font-mono text-[0.86em] text-fg">
      {children}
    </code>
  );
}

function Callout({ tone, title, children }: { tone: "exam" | "trap"; title: string; children: ReactNode }) {
  const cls =
    tone === "exam"
      ? "border-brand/25 bg-brand/5 [&_b]:text-brand-bright"
      : "border-red-300 bg-red-50";
  const titleCls = tone === "exam" ? "text-brand-bright" : "text-red-700";
  return (
    <div className={`mt-3 rounded-xl border px-4 py-3 text-sm leading-6 text-slate-700 ${cls}`}>
      <span className={`block font-mono text-[10.5px] font-semibold uppercase tracking-[0.14em] ${titleCls}`}>
        {title}
      </span>
      {children}
    </div>
  );
}

const TH = "border border-line bg-ink-2 px-3 py-2 text-left text-[11px] font-semibold uppercase tracking-[0.08em] text-slate-600";
const TD = "border border-line px-3 py-2 align-top text-[13.5px] leading-6 text-slate-700";

/* ---- quiz data -------------------------------------------------------------- */

const QUIZ: QuizQuestion[] = [
  {
    id: "d7-q1",
    scenario: "Developer Productivity",
    question:
      "Team policy: Claude Code must never commit directly to main, or write to infra/prod/. Which design guarantees this?",
    options: [
      "A PreToolUse hook (or deny permission rule) that blocks Bash git commands and Edit/Write on those paths",
      "Have the pre-commit review subagent report its confidence in the change, and only block the commit if confidence is below 50%",
      "Give the commit-review subagent full tool access — Bash, Edit, Write and the deploy scripts — so it can fix any issue it finds along the way",
      "Have the linter subagent send its findings straight to the deploy subagent to save a round trip through the coordinator",
    ],
    answer: 0,
    explanation:
      "\"Must never\" means deterministic enforcement — a hook or permission rule the model cannot argue with. B is anti-pattern #2 (self-reported confidence used as the gate — poorly calibrated and not what was asked for). C is anti-pattern #6 (unrestricted tool access — a commit reviewer never needs deploy scripts). D is anti-pattern #7 (flat, spoke-to-spoke routing that bypasses the coordinator).",
  },
  {
    id: "d7-q2",
    scenario: "Customer Support Resolution Agent",
    question:
      "The support agent is mid-way through a billing dispute. Which trigger set correctly decides when to hand off to a human?",
    options: [
      "Add an instruction telling the agent to escalate 'whenever it feels the situation calls for a human'",
      "Queue the dispute through the Message Batches API and let the customer wait up to 24 hours for the batch to clear before deciding",
      "Hand off when the dispute crosses the agent's refund limit, the same tool call fails twice, or the customer asks for a person",
      "If the refund-lookup tool fails, skip it and let the agent give a generic apology so the conversation keeps moving",
    ],
    answer: 2,
    explanation:
      "Deterministic, code-checkable triggers — a dollar threshold, a failure count, an explicit request — are the only reliable escalation design. A is anti-pattern #1 (a vague prompt instruction standing in for a hard rule). B is anti-pattern #3 (Batch API turnaround used inside a live, customer-waiting conversation). D is anti-pattern #5 (silently dropping a failed tool call instead of returning structured error context).",
  },
  {
    id: "d7-q3",
    scenario: "Structured Data Extraction",
    question:
      "A team extracts six fixed fields from invoices while the customer waits on a confirmation screen. Which processing approach is correct?",
    options: [
      "If a batch of scanned invoices is too large for one context window, switch to a model with a larger context limit",
      "A single synchronous structured-output call (JSON schema, one request) returned before the confirmation screen renders",
      "Give the extraction agent full filesystem and deployment tool access in case it needs to fix the pipeline along the way",
      "Only show the customer the extracted fields once the model's self-reported confidence score clears a threshold, otherwise retry silently",
    ],
    answer: 1,
    explanation:
      "A user is waiting on-screen: a synchronous, schema-constrained call is the correct real-time pattern. A is anti-pattern #4 (reaching for a bigger context window instead of decomposing or batching the backlog). C is anti-pattern #6 (an extraction agent needs no filesystem or deploy tools). D is anti-pattern #2 (self-reported confidence as the gate — it is not a calibrated signal).",
  },
  {
    id: "d7-q4",
    scenario: "Multi-Agent Research System",
    question:
      "The research coordinator's conversation spans 40 source documents. It keeps hitting compaction and losing track of which sources were already checked. What is the correct fix?",
    options: [
      "Add 'always remember which sources were checked' to the coordinator's system prompt",
      "If a source subagent's fetch fails, return nothing so the coordinator's synthesis step is not interrupted",
      "Let each source subagent forward its summary directly to the next subagent in the writing chain to save a coordinator round-trip",
      "Give each source its own subagent that returns a structured summary, and track checked sources in durable state outside the conversation",
    ],
    answer: 3,
    explanation:
      "The problem was letting the window overflow instead of restructuring — decomposition plus durable state (outside the conversation, re-injected each turn) fixes it permanently. A is anti-pattern #1 (a prompt reminder is not durable state and is not guaranteed to survive compaction). B is anti-pattern #5 (a failed fetch should return a structured error, not nothing). C is anti-pattern #7 (flat, spoke-to-spoke routing instead of the coordinator curating what each subagent receives).",
  },
  {
    id: "d7-q5",
    scenario: "Claude Code in CI/CD",
    question:
      "This is a headless, non-interactive CI/CD pipeline (Claude Code's -p mode). A step's Bash tool call to run the test suite fails because the runner ran out of disk space. What should the tool result contain?",
    options: [
      "Escalate to a human reviewer whenever the test-runner subagent's confidence in the results is below 90%",
      "A structured is_error result: category disk_space_exhausted, retryable: true, and a suggestion to clear the cache and retry",
      "Queue the failed test run through the Message Batches API and check back within 24 hours",
      "Give the CI test-runner step access to every tool, including deploy scripts, in case it needs to fix things directly",
    ],
    answer: 1,
    explanation:
      "Errors are data the calling agent reasons over — category, retryability and a next step let the pipeline self-heal or fail loudly with context. A is anti-pattern #2 (self-reported confidence as an escalation trigger). C is anti-pattern #3 (Batch API turnaround in a pipeline that needs a fast pass/fail signal). D is anti-pattern #6 (a test runner needs no deploy access).",
  },
  {
    id: "d7-q6",
    scenario: "Code Generation with Claude Code",
    question:
      "You are setting up a subagent whose only job is to review generated code for security issues before merge. Which design is correct?",
    options: [
      "Give it Read, Grep and Glob only — enough to inspect the diff and surrounding code, nothing that can change it or run deploy scripts",
      "Tell it in its system prompt to 'review only, never modify files,' while still connecting it to the full toolset the coding agent uses",
      "If the review queue backs up because the model needs to see the whole pull request at once, request a model with a larger context limit",
      "Have the review subagent send its findings straight to the deploy subagent so approved code ships immediately, bypassing the coordinator",
    ],
    answer: 0,
    explanation:
      "Read/Grep/Glob-only matches the reviewer's actual job — the fix for anti-pattern #6 is never granting the extra tools in the first place. B is anti-pattern #1 (a prompt promise standing in for an enforced boundary that should have been a tool-scoping decision). C is anti-pattern #4 (a bigger context window instead of decomposing the review). D is anti-pattern #7 (flat routing — findings must go back through the coordinator).",
  },
  {
    id: "d7-q7",
    scenario: "Multi-Agent Research System",
    question:
      "A coordinator delegates to a search subagent and a writer subagent. The search subagent finishes first. What should happen next?",
    options: [
      "The coordinator escalates to a human whenever the search subagent reports low confidence in what it found",
      "Queue the search subagent's results through the Message Batches API, since the writer does not need them immediately",
      "The search subagent returns a structured summary to the coordinator, which includes the relevant parts in the writer subagent's task prompt",
      "If the search subagent finds nothing, it returns an empty summary so the writer subagent is not left waiting",
    ],
    answer: 2,
    explanation:
      "Hub-and-spoke: the coordinator receives the structured summary and decides what the writer needs — this is what avoids anti-pattern #7 (flat, peer-to-peer routing). A is anti-pattern #2 (self-reported confidence as an escalation trigger). B is anti-pattern #3 (Batch API used where a subagent pipeline is waiting synchronously on the result). D is anti-pattern #5 ('found nothing' is meaningfully different from 'the tool errored' — both need structured reporting, not a blank result).",
  },
];

/* ---- page -------------------------------------------------------------------- */

export default function AntiPatternsLesson() {
  return (
    <>
      <SchemaOrg schema={PAGE_SCHEMA} />
      <section className="relative isolate overflow-hidden border-b border-line">
        <div className="aurora absolute inset-0 -z-10" />
        <Container className="py-5 sm:py-7">
          <span className="inline-flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-bright">
            <span className="h-1 w-1 rounded-full bg-brand" />
            Lesson 7 · Cross-cutting reference · Powers every wrong answer on the exam
          </span>
          <h1 className="mt-2 text-2xl font-bold leading-[1.15] tracking-tight text-fg sm:text-3xl lg:text-4xl">
            The 7 Anti-Patterns: How Wrong Answers Are Built
          </h1>
          <p className="mt-2 max-w-3xl text-[15px] leading-7 text-muted">
            Every distractor on the CCA-F exam is one of a small set of plausible architectural mistakes. Learn to
            recognise these seven instantly and you can often eliminate two or three wrong options before you finish
            reasoning through the right one — with two minutes per question, that is the difference between a
            comfortable pass and a rushed guess.
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
              <div className="panel mb-4 rounded-2xl p-5 sm:p-6">
                <P>
                  Domain 1 (Lesson 1) already introduced several of these anti-patterns in passing, wherever the
                  underlying architecture naturally called for it — prompt-based enforcement in §1.8, silent
                  subagent failure in §1.3, unrestricted tool access in §1.6, flat topology in §1.5. This lesson is
                  the opposite move: instead of meeting each mistake once, in context, you get a dedicated,
                  systematic pass over all seven — the definition, why it is tempting, a wrong-vs-right contrast, and
                  the exact phrasing the exam uses to signal it.
                </P>
                <AntiPatternsOverviewDiagram />
                <P>
                  Treat this page as a reference to revisit in the final week before the exam, not a one-time read.
                  The goal is pattern recognition fast enough that it happens before you have consciously finished
                  the question stem.
                </P>
              </div>

              <Sec
                id="s1"
                pid="d7-s1"
                title="7.1 Anti-pattern #1: Prompt-based rule enforcement"
                blueprint={`Introduced in Domain 1 §1.8 (Lifecycle hooks) — see the full walkthrough at ${CCAF_BASE}/agentic-architecture#s8`}
              >
                <P>
                  <strong>Definition:</strong> relying on system-prompt wording — &quot;never do X&quot;, &quot;always
                  do Y&quot; — for a rule that must be <em>absolutely guaranteed</em>, instead of deterministic code
                  enforcement (a <Code>PreToolUse</Code> hook, a deny permission rule, input validation).
                </P>
                <H3>Why it is a tempting distractor</H3>
                <P>
                  It is fast to write, costs nothing to add, and reads like a policy document — confident, direct
                  language that <em>sounds</em> like it settles the matter. Candidates under time pressure often pick
                  the option that states the rule most forcefully, mistaking forceful wording for enforcement.
                </P>
                <div className="mt-3 overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr>
                        <th className={TH}>Wrong</th>
                        <th className={TH}>Right</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className={TD}>&quot;Never modify files in /prod&quot; in CLAUDE.md or the system prompt</td>
                        <td className={TD}>A <Code>PreToolUse</Code> hook (or deny permission rule) that blocks <Code>Edit</Code>/<Code>Write</Code> on that path</td>
                      </tr>
                      <tr>
                        <td className={TD}>Repeating the instruction in every subagent definition for good measure</td>
                        <td className={TD}>One deterministic check, enforced at the tool layer, that every subagent inherits</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <Callout tone="exam" title="Signal words in the question stem">
                  <em>must never</em>, <em>always</em>, <em>compliance</em>, <em>policy requires</em>. Whenever a
                  requirement is phrased as absolute, the correct answer enforces it in code — any option that
                  enforces it only in the prompt is the planted anti-pattern, however well-worded.
                </Callout>
              </Sec>

              <Sec
                id="s2"
                pid="d7-s2"
                title="7.2 Anti-pattern #2: Self-reported confidence for escalation"
                blueprint={`Deepened in Domain 5 §5.3 (Deterministic escalation) — see ${CCAF_BASE}/context-management-reliability#s3`}
              >
                <P>
                  <strong>Definition:</strong> using the model&apos;s own stated confidence (&quot;I&apos;m 80% sure&quot;)
                  as the trigger for escalating to a human or another system, instead of a deterministic, objective
                  trigger the calling code can check without trusting the model&apos;s self-assessment.
                </P>
                <H3>Why it is a tempting distractor</H3>
                <P>
                  It feels like putting the model&apos;s own judgment to good use — efficient, and it avoids hard-coding
                  business rules. The catch: a model&apos;s self-reported certainty is poorly calibrated. It can be
                  confidently wrong, or unconfident about an answer that is actually correct, so it is not a signal
                  your architecture can rely on.
                </P>
                <div className="mt-3 overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr>
                        <th className={TH}>Wrong</th>
                        <th className={TH}>Right</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className={TD}>&quot;If the model says it isn&apos;t sure, escalate to a human&quot;</td>
                        <td className={TD}>Escalate on a policy-boundary breach, a repeated tool failure, an explicit user request, or a loop-iteration cap being hit</td>
                      </tr>
                      <tr>
                        <td className={TD}>Gate an answer on a confidence score crossing 70%</td>
                        <td className={TD}>Gate on a dollar threshold, a retry count, or a validation failure the code can actually check</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <Callout tone="exam" title="Signal words in the question stem">
                  <em>confidence score</em>, <em>the model indicates uncertainty</em>, <em>based on how sure the
                  agent is</em>. Any answer that routes a decision through the model rating its own certainty is the
                  distractor — the correct trigger is always something the code, not the model, decides.
                </Callout>
              </Sec>

              <Sec
                id="s3"
                pid="d7-s3"
                title="7.3 Anti-pattern #3: Batch API for blocking/real-time workflows"
                blueprint={`Domain 4 §4.6 covers the full selection criteria — see ${CCAF_BASE}/prompt-engineering-structured-output#s6`}
              >
                <P>
                  <strong>Definition:</strong> using the Message Batches API — cheaper, but with turnaround up to 24
                  hours and no real-time SLA — for a flow where a user or another system is waiting{" "}
                  <em>synchronously</em> for the response.
                </P>
                <H3>Why it is a tempting distractor</H3>
                <P>
                  The cost savings look attractive on paper (roughly half the price for the same tokens), and a
                  question that mentions volume or cost-optimisation nudges you toward &quot;use the cheaper API&quot;
                  before you have checked whether anyone is actually waiting on the result.
                </P>
                <div className="mt-3 overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr>
                        <th className={TH}>Wrong</th>
                        <th className={TH}>Right</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className={TD}>Route a live chat reply through the Batches API to cut cost</td>
                        <td className={TD}>The real-time Messages API — the customer is watching the screen</td>
                      </tr>
                      <tr>
                        <td className={TD}>Process a nightly, no-one-waiting extraction job with a synchronous loop over the Messages API</td>
                        <td className={TD}>The Batches API — deadline-tolerant, async, and materially cheaper here</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <Callout tone="exam" title="Signal words in the question stem">
                  <em>customer waiting</em>, <em>live chat</em>, <em>user-facing</em>, <em>immediate response
                  needed</em> — paired with an option that reaches for the Batches API. The Batches API is only ever
                  correct for async, deadline-tolerant, non-blocking workloads; anywhere synchronous, it is the trap.
                </Callout>
              </Sec>

              <Sec
                id="s4"
                pid="d7-s4"
                title="7.4 Anti-pattern #4: Bigger context window as the fix"
                blueprint={`First flagged in Domain 1's session-state quiz (§1.7) — see ${CCAF_BASE}/agentic-architecture#s7`}
              >
                <P>
                  <strong>Definition:</strong> responding to a context or compaction problem by simply requesting more
                  context window, or a larger model&apos;s context limit, instead of restructuring the approach —
                  extracting durable facts to external state, decomposing into subagents, or processing in multiple
                  passes.
                </P>
                <H3>Why it is a tempting distractor</H3>
                <P>
                  It avoids the harder architectural work. A bigger window is a one-line configuration change; durable
                  state extraction and decomposition require actually thinking about what should survive and where it
                  should live. The exam rewards the latter every time.
                </P>
                <div className="mt-3 overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr>
                        <th className={TH}>Wrong</th>
                        <th className={TH}>Right</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className={TD}>&quot;The conversation got too long — use a model with a bigger context window&quot;</td>
                        <td className={TD}>Extract durable facts to external state as they happen; re-inject them every request</td>
                      </tr>
                      <tr>
                        <td className={TD}>&quot;The research task has too many documents — increase the context limit&quot;</td>
                        <td className={TD}>Decompose into subagents, each with its own slice, reporting structured summaries; use scratchpad files for working notes</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <Callout tone="exam" title="Signal words in the question stem">
                  <em>context window ran out</em>, <em>conversation got too long</em> — paired with an option like
                  &quot;use a model with a bigger context window&quot; or &quot;increase the context limit&quot;. A
                  bigger window buys time; it does not fix an architecture that never extracted what mattered.
                </Callout>
              </Sec>

              <Sec
                id="s5"
                pid="d7-s5"
                title="7.5 Anti-pattern #5: Silent subagent/tool failure"
                blueprint={`Introduced in Domain 1 §1.3 (Executing tools correctly) — see ${CCAF_BASE}/agentic-architecture#s3`}
              >
                <P>
                  <strong>Definition:</strong> a subagent or tool call that fails returns an empty result, a blank
                  string, or is silently skipped — rather than returning structured error information: what failed,
                  why, and whether it is retryable.
                </P>
                <H3>Why it is a tempting distractor</H3>
                <P>
                  It lets the pipeline &quot;keep going&quot; without an ugly error surfacing, which reads as
                  resilience. In practice it hands the model a gap it cannot distinguish from a real, empty answer —
                  the agent hallucinates a success path instead of recovering.
                </P>
                <div className="mt-3 overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr>
                        <th className={TH}>Wrong</th>
                        <th className={TH}>Right</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className={TD}>Return <Code>&quot;&quot;</Code> so the loop does not break</td>
                        <td className={TD}>Return a <Code>tool_result</Code> with <Code>is_error: true</Code>, an error category, and a retryability hint</td>
                      </tr>
                      <tr>
                        <td className={TD}>&quot;Skip the failed step and continue&quot;</td>
                        <td className={TD}>Let the calling agent reason over the structured error and decide whether to retry, route around it, or surface the gap</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <Callout tone="exam" title="Signal words in the question stem">
                  <em>skip the failed step and continue</em>, <em>return nothing so it doesn&apos;t break the
                  flow</em>. Any option that makes a failure disappear rather than reporting it is the anti-pattern —
                  errors are data the model needs, not noise to be swallowed.
                </Callout>
              </Sec>

              <Sec
                id="s6"
                pid="d7-s6"
                title="7.6 Anti-pattern #6: Unrestricted tool access"
                blueprint={`Introduced in Domain 1 §1.6 (Subagents & context isolation) — see ${CCAF_BASE}/agentic-architecture#s6`}
              >
                <P>
                  <strong>Definition:</strong> giving every agent or subagent access to every available tool &quot;just
                  in case&quot;, instead of scoping tools tightly to each agent&apos;s actual role.
                </P>
                <H3>Why it is a tempting distractor</H3>
                <P>
                  It looks more flexible, and it avoids the upfront design work of deciding exactly what each subagent
                  needs. The cost is invisible until it is not: reasoning overload from a bloated tool list, and a
                  much larger blast radius if the agent misfires or is manipulated.
                </P>
                <div className="mt-3 overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr>
                        <th className={TH}>Wrong</th>
                        <th className={TH}>Right</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className={TD}>Connect every MCP server and every tool to every agent &quot;for flexibility&quot;</td>
                        <td className={TD}>A read-only research subagent gets <Code>Read</Code>/<Code>Grep</Code> only; a test-runner gets test-execution tools, not deploy tools</td>
                      </tr>
                      <tr>
                        <td className={TD}>Rely on the system prompt to tell an over-permissioned agent which tools not to use</td>
                        <td className={TD}>Never grant the tool in the first place if the role does not need it</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <Callout tone="exam" title="Signal words in the question stem">
                  <em>give all agents access to all tools for flexibility</em>, <em>just connect every MCP server to
                  every agent</em>. Per-role tool scoping is the correct default; &quot;just in case&quot; access is
                  the distractor even when framed as convenient or efficient.
                </Callout>
              </Sec>

              <Sec
                id="s7"
                pid="d7-s7"
                title="7.7 Anti-pattern #7: Flat/peer-to-peer multi-agent topology"
                blueprint={`Introduced in Domain 1 §1.5 (Multi-agent topologies) — see ${CCAF_BASE}/agentic-architecture#s5`}
              >
                <P>
                  <strong>Definition:</strong> letting subagents communicate directly with each other instead of
                  routing all coordination through a single coordinator (hub-and-spoke).
                </P>
                <H3>Why it is a tempting distractor</H3>
                <P>
                  It sounds more efficient — cutting out a &quot;middle step&quot; feels like removing overhead. In
                  practice it removes the one thing that made the system debuggable: a single owner of &quot;done&quot;
                  and a single point where every decision can be audited.
                </P>
                <div className="mt-3 overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr>
                        <th className={TH}>Wrong</th>
                        <th className={TH}>Right</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className={TD}>&quot;Let agent A send its results directly to agent B for efficiency&quot;</td>
                        <td className={TD}>A sends a structured report to the coordinator, which curates what B receives</td>
                      </tr>
                      <tr>
                        <td className={TD}>&quot;Peer agents coordinate among themselves&quot;</td>
                        <td className={TD}>The coordinator owns the plan, the completion decision, and the single audit trail</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <Callout tone="exam" title="Signal words in the question stem">
                  <em>let agent A send its results directly to agent B for efficiency</em>, <em>peer agents
                  coordinate among themselves</em>. Hub-and-spoke is the only blessed shape — any spoke-to-spoke
                  routing, however efficient it sounds, is the planted anti-pattern.
                </Callout>
              </Sec>

              <section id="drill" className="panel mb-4 scroll-mt-24 rounded-2xl p-5 sm:p-6">
                <h2 className="text-lg font-bold tracking-tight text-fg sm:text-xl">Rapid elimination drill</h2>
                <P>
                  Here is the skill in action, on a sample question in the CCA-F&apos;s own format: one scenario, four
                  options, three of them are anti-patterns wearing a plausible disguise.
                </P>
                <Callout tone="trap" title="Scenario: Multi-Agent Research System">
                  A subagent&apos;s fetch tool times out mid-task, partway through a research run. Which response is
                  architecturally correct?
                </Callout>
                <ul className="mt-3 max-w-[74ch] list-none space-y-2 pl-0 text-[15px] leading-7 text-slate-700">
                  <li>
                    <strong>A.</strong> The failing subagent returns an empty summary so the coordinator&apos;s
                    synthesis step is not interrupted. <span className="font-mono text-[11px] font-semibold text-red-700">→ struck: anti-pattern #5, silent failure</span>
                  </li>
                  <li>
                    <strong>B.</strong> Escalate to a human whenever the subagent&apos;s self-reported confidence drops
                    below 70%. <span className="font-mono text-[11px] font-semibold text-red-700">→ struck: anti-pattern #2, confidence as trigger</span>
                  </li>
                  <li>
                    <strong>C.</strong> Route the failing subagent&apos;s partial results directly to the writer
                    subagent so the coordinator is not a bottleneck. <span className="font-mono text-[11px] font-semibold text-red-700">→ struck: anti-pattern #7, flat topology</span>
                  </li>
                  <li>
                    <strong>D.</strong> The subagent returns a structured <Code>is_error</Code> result (category:
                    timeout, retryable: true); the coordinator retries once with backoff, then reports the gap if it
                    still fails. <span className="font-mono text-[11px] font-semibold text-emerald-700">→ survives: correct</span>
                  </li>
                </ul>
                <EliminationDrillDiagram />
                <P>
                  Read the stem once: a tool failed mid-task inside a multi-agent system. That alone is enough to scan
                  every option for the three usual suspects — a result that disappears (#5), a decision routed through
                  the model&apos;s own confidence (#2), and a shortcut that skips the coordinator (#7) — strike all
                  three, and D is the only option left standing before you have spent ten seconds on it. That is the
                  whole skill: it is not that D is obviously well-written, it is that A, B and C are each obviously{" "}
                  <em>one of the seven</em>.
                </P>
              </section>

              <CheckpointQuiz title="Checkpoint quiz — The 7 Anti-Patterns" questions={QUIZ} />

              <div className="mt-5">
                <CourseGlossary compact />
              </div>

              <div className="mt-5 flex flex-wrap gap-3">
                <Link
                  href={`${CCAF_BASE}/readiness-exam`}
                  className="glow-brand inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-brand to-cyan px-5 py-3 text-base font-semibold text-white transition hover:brightness-110"
                >
                  Next: take the readiness exam
                </Link>
                <Link
                  href={CCAF_BASE}
                  className="inline-flex items-center justify-center rounded-xl border border-line bg-panel px-5 py-3 text-base font-semibold text-fg shadow-sm transition hover:border-line-strong hover:bg-surface"
                >
                  Back to course home
                </Link>
              </div>
            </main>
          </div>
        </Container>
      </section>
    </>
  );
}
