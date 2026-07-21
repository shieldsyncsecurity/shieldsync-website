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
import {
  PromptCachingDiagram,
  EscalationTriggersDiagram,
  ProvenanceConflictDiagram,
} from "@/components/course-diagrams-context";

const LESSON_URL = `${SITE.url}${CCAF_BASE}/context-management-reliability`;

export const metadata: Metadata = {
  title: "Context Management & Reliability — CCA-F Domain 5 (15%) Free Lesson",
  description:
    "Free CCA-F Domain 5 lesson: prompt caching for cost and latency, session/agent handoff patterns, deterministic escalation thresholds versus self-reported confidence, multi-hop error propagation, and provenance in multi-agent synthesis — with animated diagrams and an exam-style quiz.",
  keywords: [
    "claude prompt caching exam",
    "claude agent escalation design",
    "cca-f domain 5",
    "multi-agent error propagation",
    "claude context management certification",
  ],
  alternates: { canonical: `${CCAF_BASE}/context-management-reliability` },
  openGraph: {
    title: "Context Management & Reliability — CCA-F Domain 5 (15%)",
    description:
      "Prompt caching, agent handoffs, deterministic escalation, error propagation, and provenance — taught with animated diagrams and an exam-style quiz.",
    url: LESSON_URL,
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Context Management & Reliability — CCA-F Domain 5 (15%)",
    description:
      "Prompt caching, agent handoffs, deterministic escalation, error propagation, and provenance — with animated diagrams and an exam-style quiz.",
  },
};

const PAGE_SCHEMA = [
  webPageSchema({
    url: LESSON_URL,
    name: "Context Management & Reliability — CCA-F Domain 5",
    description:
      "Free lesson covering CCA-F Domain 5 (15% of the exam): prompt caching, session/agent handoff patterns, deterministic escalation thresholds, multi-hop error propagation, and provenance in multi-agent synthesis.",
  }),
  breadcrumbSchema(LESSON_URL, [
    { name: "Home", url: SITE.url },
    { name: "Free Courses", url: `${SITE.url}/free-courses` },
    { name: "CCA-F Prep Course", url: `${SITE.url}${CCAF_BASE}` },
    { name: "Domain 5: Context Management", url: LESSON_URL },
  ]),
];

const TOC: TocItem[] = [
  { id: "s1", label: "5.1 Prompt caching", progressId: "d5-s1" },
  { id: "s2", label: "5.2 Handoff patterns", progressId: "d5-s2" },
  { id: "s3", label: "5.3 Deterministic escalation", progressId: "d5-s3" },
  { id: "s4", label: "5.4 Error propagation", progressId: "d5-s4" },
  { id: "s5", label: "5.5 Provenance & conflicts", progressId: "d5-s5" },
  { id: "quiz", label: "Checkpoint quiz" },
];

/* ---- local presentational helpers (mirrors agentic-architecture/page.tsx) --- */

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
        <span className="text-xs text-muted">Maps to blueprint: {blueprint}</span>
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

function CodeBlock({ children }: { children: string }) {
  return (
    <pre className="mt-3 overflow-x-auto rounded-xl bg-fg p-4 font-mono text-[12.5px] leading-relaxed text-slate-200">
      <code>{children}</code>
    </pre>
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
    id: "d5-q1",
    scenario: "Claude Code for Continuous Integration",
    question:
      "A coding agent re-sends the same 40,000-token codebase context (system prompt + file tree + tool definitions) on every turn of a long session. Only the latest instruction changes each turn. What should the architect do to control cost and latency?",
    options: [
      "Switch to the Batch API so the repeated context is processed asynchronously",
      "Mark the stable codebase-context prefix as cacheable, with the volatile instruction placed last",
      "Ask the model to summarise the codebase context itself before each turn to shorten it",
      "Increase max_tokens so the repeated context is never truncated",
    ],
    answer: 1,
    explanation:
      "Prompt caching is the intended lever: a stable, repeated prefix reused across requests is billed at a steep discount and processed faster, so long as it stays byte-identical and the volatile content (the latest message) is structured at the end. A confuses caching with the Batch API, which is for asynchronous bulk jobs, not a live interactive CI/CD loop. C introduces a lossy, non-deterministic summarisation step to solve a cost problem caching already solves cleanly. D grows the window instead of restructuring the prompt — the same instinct the exam flags as anti-pattern #4.",
  },
  {
    id: "d5-q2",
    scenario: "Customer Support Resolution Agent",
    question:
      "A support agent has been working a case for 40 minutes and must hand off to a human representative because the customer explicitly asked for one. What should the handoff payload contain?",
    options: [
      "The full raw conversation transcript, so the human has complete context",
      "Nothing — the human should start fresh so they are not biased by the bot's prior reasoning",
      "A structured case summary: verified identity, issue category, steps already attempted, and the agent's current hypothesis",
      "A one-line note saying \"customer requested a human\"",
    ],
    answer: 2,
    explanation:
      "Handoff payloads must be structured summaries of state — what's confirmed, what's been tried, what's still open — not a raw transcript dump and not a context-free restart. A forces the human to re-derive the case from noisy dialogue, wasting the exact time the handoff was meant to save. B throws away verified facts like identity, forcing the customer to re-authenticate and repeat themselves — the same session-state failure covered in Domain 1. D is too thin to be useful; it satisfies the letter of \"a handoff happened\" but gives the human nothing to act on.",
  },
  {
    id: "d5-q3",
    scenario: "Customer Support Resolution Agent",
    question:
      "Which of these is the correct set of escalation triggers for handing a case to a human, per the architecture the exam expects?",
    options: [
      "The model reports it is only 55% confident in its proposed resolution",
      "A refund over the policy limit, N consecutive tool failures, or an explicit human request",
      "The conversation has run long enough that the model 'feels' the customer is frustrated",
      "The model's own assessment that the case is 'complex'",
    ],
    answer: 1,
    explanation:
      "Escalation triggers must be objective and code-enforced: a dollar threshold, a failure count, an explicit request, or a loop-iteration cap are all deterministic conditions your code can check without trusting the model's self-assessment. A, C and D all route escalation through the model's self-reported confidence or sentiment, which is poorly calibrated — a model can be confidently wrong or unconfident about a correct answer, so none of them are reliable triggers on their own.",
  },
  {
    id: "d5-q4",
    scenario: "Multi-Agent Research System",
    question:
      "In a three-hop pipeline (data-collector subagent -> analysis subagent -> report subagent), the data-collector partially fails after gathering 60% of its sources before an API quota error stops it. What should happen next?",
    options: [
      "The data-collector returns its 60% of results as a normal, complete-looking report so the pipeline keeps moving",
      "The data-collector returns a structured report of what succeeded and failed, marked partial; the analysis subagent treats it as degraded",
      "The whole multi-agent system crashes immediately so a human notices something went wrong",
      "The data-collector silently retries in an unbounded loop until it either succeeds or the process is killed",
    ],
    answer: 1,
    explanation:
      "Errors must propagate as structured information across every hop: what completed, what failed, and whether it's safe to retry. A launders a partial failure into an apparent success, so the analysis subagent (and everything downstream of it) reasons over incomplete data as if it were whole — false confidence compounds hop over hop. C is uninformative and destroys the work already completed. D is an unbounded retry with no failure signal at all, the opposite of structured propagation.",
  },
  {
    id: "d5-q5",
    scenario: "Multi-Agent Research System",
    question:
      "A synthesis agent receives three subagent reports on the same fact. Two report 'feature X shipped in Q2' with sources cited; the third reports 'feature X shipped in Q3' with no source, contradicting the other two. What should the synthesis step do?",
    options: [
      "Take the majority answer (Q2, 2 votes to 1) and present it as the confirmed fact",
      "Re-run all three subagents until they agree, then report the agreed answer",
      "Blend the two dates into a hedged statement like 'shipped in Q2 or Q3'",
      "Flag the conflict and the unsourced claim in the output, then exclude it or verify it separately",
    ],
    answer: 3,
    explanation:
      "Every claim in a synthesized output should be traceable to its source; when sources disagree or a claim is unsourced, the correct move is to surface the conflict, not paper over it. A is majority vote across non-independent, non-verified sources — it can launder a shared or isolated error into false consensus and hides that one input was never sourced at all. B manufactures agreement rather than resolving the actual disagreement — re-running until subagents converge doesn't make the unsourced claim true. C blends contradictory claims into one confident-sounding but meaningless statement, which is worse than surfacing the conflict.",
  },
];

/* ---- page -------------------------------------------------------------------- */

export default function ContextManagementReliabilityLesson() {
  return (
    <>
      <SchemaOrg schema={PAGE_SCHEMA} />
      <section className="relative isolate overflow-hidden border-b border-line">
        <div className="aurora absolute inset-0 -z-10" />
        <Container className="py-5 sm:py-7">
          <span className="inline-flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-bright">
            <span className="h-1 w-1 rounded-full bg-brand" />
            Lesson 5 · Domain 5 · 15% of the exam
          </span>
          <h1 className="mt-2 text-2xl font-bold leading-[1.15] tracking-tight text-fg sm:text-3xl lg:text-4xl">
            Context Management &amp; Reliability
          </h1>
          <p className="mt-2 max-w-3xl text-[15px] leading-7 text-muted">
            Domain 1 covered the basics of session state and lifecycle hooks. Domain 5 goes deeper on the reliability
            side of long-running, multi-agent systems: prompt caching for cost and latency, structured handoffs
            between agents and sessions, escalation that never trusts a model&apos;s self-reported confidence, error
            propagation across multiple hops, and provenance when several sources disagree.
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
              <Sec id="s1" pid="d5-s1" title="5.1 Prompt caching for cost and latency" blueprint='"prompt caching / cost and latency optimization"'>
                <P>
                  Every request to the Claude API is stateless — the full prompt is reprocessed from scratch each
                  time. <strong>Prompt caching</strong> changes that trade-off: you mark a portion of the prompt, a
                  long and stable prefix (a system prompt, a set of tool definitions, a large reference document), as
                  cacheable. If a later request sends that exact same prefix again, Claude reuses the cached
                  processing instead of redoing it — the repeated portion is billed at a steep discount and returns
                  faster.
                </P>
                <PromptCachingDiagram />
                <H3>The exam framing: caching is a reliability lever, not just a cost trick</H3>
                <P>
                  The scenario the exam reaches for is a <strong>high-volume production workload with a stable,
                  repeated context prefix</strong> — the textbook example is a coding agent that re-sends the same
                  large codebase context on every turn of a session. The win comes entirely from{" "}
                  <strong>prefix stability</strong>: caching only pays off when the cached bytes are identical between
                  requests.
                </P>
                <P>
                  That has a direct architectural consequence: <strong>restructure prompts so volatile content comes
                  last</strong>. Put the system prompt, tool definitions, and any large stable documents at the
                  front — cached once, reused many times. Put the thing that changes every request (the latest user
                  message) at the end. A prompt built the other way around — volatile content mixed into or ahead of
                  the stable prefix — invalidates the cache on almost every request and pays full price every time.
                </P>
                <CodeBlock>{`# Cache-friendly ordering
messages = [
  # stable: system prompt + tool defs + large docs, marked cacheable
  {"role": "system", "content": [
      {"type": "text", "text": SYSTEM_PROMPT},
      {"type": "text", "text": CODEBASE_CONTEXT, "cache_control": {"type": "ephemeral"}}
  ]},
  # volatile: the one thing that changes this turn, always LAST
  {"role": "user", "content": latest_user_message}
]`}</CodeBlock>
                <Callout tone="exam" title="How the exam asks this">
                  &quot;A support/coding agent resends a large, unchanged block of context on every request. How
                  should the prompt be structured to reduce cost and latency?&quot; — the correct answer restructures
                  the prompt with the stable content first (cached) and the changing content last, not a bigger
                  context window, not the Batch API, and not asking the model to compress its own context.
                </Callout>
                <P>
                  Cached entries also <strong>expire</strong>: by default after 5 minutes of inactivity, refreshed at
                  no extra cost on every hit (a 1-hour TTL is available at double the write cost for less frequent
                  access patterns). A byte-identical prefix that arrives after too long a gap still misses the cache
                  — a dropped hit rate doesn&apos;t always mean the prefix changed, it can just mean the requests
                  spread out too far.
                </P>
              </Sec>

              <Sec id="s2" pid="d5-s2" title="5.2 Handoff patterns between agents and sessions" blueprint='"agent-to-agent and session handoff patterns"'>
                <P>
                  Domain 1 covered how a subagent reports back to its coordinator inside one running system. This
                  section is about a different kind of handoff: transferring a long-running task from{" "}
                  <strong>one session or agent instance to another entirely</strong> — for example, a session that
                  hits its loop-iteration cap and must reseed a fresh session to continue, or a support case that
                  transfers from a bot to a human agent.
                </P>
                <P>
                  The failure mode the exam tests is the same shape in both directions: the handoff payload is either{" "}
                  <strong>too much</strong> (the raw conversation history, dumped wholesale, forcing the receiver to
                  re-derive everything) or <strong>too little</strong> (&quot;start over with no context,&quot;
                  throwing away confirmed work). The correct pattern sits in between:
                </P>
                <ul className="mt-2 max-w-[74ch] list-disc space-y-1.5 pl-6 text-[15px] leading-7 text-slate-700">
                  <li>
                    <strong>What&apos;s been tried</strong> — actions already taken and their outcomes, so the new
                    session/agent doesn&apos;t repeat failed approaches.
                  </li>
                  <li>
                    <strong>What&apos;s confirmed</strong> — durable facts already established (identity verified,
                    account number, case category) that must not be re-derived or re-asked.
                  </li>
                  <li>
                    <strong>What&apos;s still open</strong> — the unresolved part of the task, framed as the actual
                    next step.
                  </li>
                </ul>
                <div className="mt-3 overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr>
                        <th className={TH}>Handoff payload</th>
                        <th className={TH}>Bot -&gt; human support handoff</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className={`${TD} font-semibold`}>Verified identity</td>
                        <td className={TD}>Customer ID, account, verification method and timestamp</td>
                      </tr>
                      <tr>
                        <td className={`${TD} font-semibold`}>Issue category</td>
                        <td className={TD}>e.g. &quot;billing dispute — duplicate charge&quot;</td>
                      </tr>
                      <tr>
                        <td className={`${TD} font-semibold`}>Steps already attempted</td>
                        <td className={TD}>Refund policy checked (over limit), duplicate-charge lookup run (confirmed duplicate)</td>
                      </tr>
                      <tr>
                        <td className={`${TD} font-semibold`}>Current hypothesis</td>
                        <td className={TD}>Likely a billing-system double-submit; needs manual refund approval above bot&apos;s authority</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <Callout tone="trap" title="Distractor pattern">
                  &quot;Forward the entire chat transcript to the human agent so nothing is lost.&quot; This looks
                  thorough but is the anti-pattern: the human now has to re-read and re-derive the case from raw
                  dialogue under time pressure, which is slower and more error-prone than a structured summary built
                  for handoff.
                </Callout>
              </Sec>

              <Sec id="s3" pid="d5-s3" title="5.3 Escalation: deterministic thresholds, not self-reported confidence" blueprint='"escalation design / anti-pattern: self-reported confidence"'>
                <P>
                  This is anti-pattern #2 from Domain 1, deepened: escalation and handoff triggers must be{" "}
                  <strong>objective and enforced in code</strong>, never based on the model self-reporting how
                  confident it is. Concrete, deterministic triggers the exam expects you to recognise:
                </P>
                <ul className="mt-2 max-w-[74ch] list-disc space-y-1.5 pl-6 text-[15px] leading-7 text-slate-700">
                  <li>A refund or transaction amount <strong>exceeds a policy limit</strong> (a fixed dollar threshold your code checks).</li>
                  <li><strong>N consecutive tool failures</strong> — a counted, code-enforced ceiling, not a vibe.</li>
                  <li>The customer makes an <strong>explicit request for a human</strong> — a detectable, unambiguous signal.</li>
                  <li>A <strong>loop-iteration cap</strong> being hit — the same bound that stops runaway agent loops doubles as an escalation trigger.</li>
                </ul>
                <EscalationTriggersDiagram />
                <P>
                  The anti-pattern the exam plants over and over: routing escalation off the model saying something
                  like &quot;I am only 60% confident in this answer.&quot; <strong>LLM self-reported confidence is
                  poorly calibrated</strong> — a model can be very confidently wrong, and just as easily unconfident
                  about an answer that is actually correct. A confidence score generated by the same model that might
                  be wrong is not an independent check on that model; it&apos;s the fox reporting on the henhouse.
                </P>
                <Callout tone="trap" title="Classic distractor">
                  &quot;If the model says it isn&apos;t sure, escalate to a human.&quot; This reads as cautious and
                  sensible, which is exactly why it&apos;s the planted wrong answer — it substitutes a subjective,
                  uncalibrated model output for a deterministic, code-enforced condition.
                </Callout>
              </Sec>

              <Sec id="s4" pid="d5-s4" title="5.4 Error propagation across multi-agent systems" blueprint='"error propagation / multi-hop reliability"'>
                <P>
                  Domain 1&apos;s anti-pattern #5 (silent subagent failure) covered a single subagent swallowing an
                  error. This section is about what happens across <strong>multiple hops</strong>: if subagent A
                  fails partway through and its (partial) output feeds subagent B, B needs to know that A&apos;s
                  output is incomplete or degraded — not treat it as a normal, complete result.
                </P>
                <P>
                  A subagent that hits an error partway through its work must propagate that error to the coordinator
                  (or the next subagent in the chain) as <strong>structured information</strong>:
                </P>
                <ul className="mt-2 max-w-[74ch] list-disc space-y-1.5 pl-6 text-[15px] leading-7 text-slate-700">
                  <li><strong>What failed</strong> — the specific step or tool call, and the error category.</li>
                  <li><strong>What was completed before the failure</strong> — so downstream steps know exactly how much of the result is trustworthy.</li>
                  <li><strong>Whether it is safe to retry</strong> — transient vs. terminal, so the coordinator can decide the recovery path.</li>
                </ul>
                <P>
                  Two failure modes bracket the correct behaviour. On one side, a subagent that returns an{" "}
                  <strong>empty or success-looking report</strong> after a partial failure launders the error into
                  false confidence — everything downstream reasons over incomplete data as if it were whole, and the
                  mistake compounds hop over hop. On the other side, letting <strong>the whole system crash
                  uninformatively</strong> destroys the work that did succeed and gives operators nothing to act on.
                  The correct middle path is a structured, partial/degraded report that downstream agents are
                  designed to check for.
                </P>
                <Callout tone="exam" title="How the exam asks this">
                  &quot;Subagent A gathers data but hits an API quota error 60% of the way through; its output feeds
                  subagent B.&quot; The right answer has A return a structured partial-failure report (completed vs.
                  failed vs. retryable) and has B treat that input as degraded — not a silent 60%-looking-like-100%
                  report, and not an uncaught crash.
                </Callout>
              </Sec>

              <Sec id="s5" pid="d5-s5" title="5.5 Provenance: tracking where claims come from" blueprint='"provenance / synthesis conflict handling"'>
                <P>
                  In systems that synthesize information from multiple sources or subagents — the Multi-Agent
                  Research System scenario&apos;s core pattern — every claim in the final output should be{" "}
                  <strong>traceable back to the source that produced it</strong>. Provenance is what lets a reader (or
                  a downstream system) tell the difference between a well-supported fact and a guess.
                </P>
                <ProvenanceConflictDiagram />
                <P>
                  When two sources disagree, or a claim shows up with no source at all, the synthesis step&apos;s job
                  is to <strong>surface that conflict</strong>, not resolve it invisibly. Two ways synthesis quietly
                  manufactures false confidence:
                </P>
                <ul className="mt-2 max-w-[74ch] list-disc space-y-1.5 pl-6 text-[15px] leading-7 text-slate-700">
                  <li>
                    <strong>Majority vote across correlated, non-independent sources.</strong> If subagents share an
                    upstream input or a common blind spot, &quot;2 out of 3 agree&quot; is not independent
                    confirmation — it can launder a single shared error into apparent consensus.
                  </li>
                  <li>
                    <strong>Blending contradictory claims into one confident-sounding statement.</strong> Hedged
                    language that mashes two disagreeing dates or facts together reads as authoritative while
                    communicating nothing verifiable.
                  </li>
                </ul>
                <P>
                  The correct handling: flag the conflict or unsourced claim explicitly in the output, and either{" "}
                  <strong>exclude it</strong> or <strong>route it for separate verification</strong> — never
                  majority-vote it away, and never re-run subagents repeatedly until they happen to agree, which
                  manufactures consensus rather than finding the truth.
                </P>
                <Callout tone="exam" title="How the exam asks this">
                  &quot;A synthesis agent receives three subagent reports; two cite sources for the same fact, one
                  states a contradicting fact with no source.&quot; The correct answer flags the conflict and the
                  unsourced claim in the output (excluding or verifying it separately) — &quot;take the majority
                  answer&quot; and &quot;re-run until they agree&quot; are both the planted anti-pattern.
                </Callout>
              </Sec>

              <CheckpointQuiz title="Checkpoint quiz — Domain 5" questions={QUIZ} />

              <div className="mt-5">
                <CourseGlossary compact />
              </div>

              <div className="mt-5 flex flex-wrap gap-3">
                <Link
                  href={`${CCAF_BASE}/exam-scenarios`}
                  className="glow-brand inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-brand to-cyan px-5 py-3 text-base font-semibold text-white transition hover:brightness-110"
                >
                  Next: The 6 exam scenarios
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
