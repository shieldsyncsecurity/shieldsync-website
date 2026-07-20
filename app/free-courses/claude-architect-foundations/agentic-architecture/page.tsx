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
import {
  AgenticLoopDiagram,
  TopologyDiagram,
  ContextIsolationDiagram,
  SessionStateDiagram,
  HooksDiagram,
} from "@/components/course-diagrams";

const LESSON_URL = `${SITE.url}${CCAF_BASE}/agentic-architecture`;

export const metadata: Metadata = {
  title: "Agentic Architecture & Orchestration — CCA-F Domain 1 (27%) Free Lesson",
  description:
    "Free CCA-F Domain 1 lesson: the agentic loop and stop_reason handling, tool execution, task decomposition, hub-and-spoke multi-agent design, subagents and context isolation, session state, and lifecycle hooks — with animated diagrams and an exam-style quiz.",
  keywords: [
    "agentic architecture",
    "cca-f domain 1",
    "agentic loop stop_reason",
    "hub and spoke multi-agent",
    "claude subagents context isolation",
    "claude tool_use tool_result",
    "claude code hooks pretooluse",
  ],
  alternates: { canonical: `${CCAF_BASE}/agentic-architecture` },
  openGraph: {
    title: "Agentic Architecture & Orchestration — CCA-F Domain 1 (27%)",
    description:
      "The agentic loop, multi-agent topologies, subagents, session state, and hooks — the biggest CCA-F domain, taught with animated diagrams.",
    url: LESSON_URL,
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Agentic Architecture & Orchestration — CCA-F Domain 1 (27%)",
    description:
      "The agentic loop, multi-agent topologies, subagents, session state, and hooks — with animated diagrams and an exam-style quiz.",
  },
};

const PAGE_SCHEMA = [
  webPageSchema({
    url: LESSON_URL,
    name: "Agentic Architecture & Orchestration — CCA-F Domain 1",
    description:
      "Free lesson covering CCA-F Domain 1 (27% of the exam): the agentic loop, tool execution, task decomposition, multi-agent topologies, subagents, session state, and lifecycle hooks.",
  }),
  breadcrumbSchema(LESSON_URL, [
    { name: "Home", url: SITE.url },
    { name: "Free Courses", url: `${SITE.url}/free-courses` },
    { name: "CCA-F Prep Course", url: `${SITE.url}${CCAF_BASE}` },
    { name: "Domain 1: Agentic Architecture", url: LESSON_URL },
  ]),
];

const TOC: TocItem[] = [
  { id: "s1", label: "1.1 The agentic spectrum", progressId: "d1-s1" },
  { id: "s2", label: "1.2 The agentic loop", progressId: "d1-s2" },
  { id: "s3", label: "1.3 Executing tools correctly", progressId: "d1-s3" },
  { id: "s4", label: "1.4 Task decomposition", progressId: "d1-s4" },
  { id: "s5", label: "1.5 Multi-agent topologies", progressId: "d1-s5" },
  { id: "s6", label: "1.6 Subagents & context isolation", progressId: "d1-s6" },
  { id: "s7", label: "1.7 Session state management", progressId: "d1-s7" },
  { id: "s8", label: "1.8 Lifecycle hooks", progressId: "d1-s8" },
  { id: "quiz", label: "Checkpoint quiz" },
];

/* ---- local presentational helpers ------------------------------------------ */

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
    id: "d1-q1",
    scenario: "Customer Support Resolution Agent",
    question: "Your support agent calls get_order_status and the warehouse API times out. What should the tool layer return to Claude?",
    options: [
      "An empty tool_result so the conversation can continue smoothly",
      "A tool_result with is_error: true stating the timeout, that it is retryable, and what to tell the customer meanwhile",
      "Raise an exception and terminate the agent session to avoid wrong answers",
      "Have the agent apologise and immediately escalate to a human",
    ],
    answer: 1,
    explanation:
      "Errors are data the model reasons over. Structured error context (category + retryability + suggested action) lets the agent retry or set expectations. A is anti-pattern #5 (silent failure), C throws away a recoverable session, D escalates before any recovery attempt — escalation is for policy or uncertainty boundaries, not first-touch transient errors.",
  },
  {
    id: "d1-q2",
    scenario: "Multi-Agent Research System",
    question: "In a coordinator + 4-subagent research system, the analysis subagent needs the search subagent's findings. How should they flow?",
    options: [
      "Search subagent messages the analysis subagent directly to reduce coordinator load",
      "All subagents share one context window so everyone sees everything",
      "Search returns a structured summary to the coordinator, which includes the relevant parts in the analysis subagent's task prompt",
      "Analysis subagent re-runs the searches itself to stay independent",
    ],
    answer: 2,
    explanation:
      "Hub-and-spoke: results flow through the coordinator, which curates what each spoke needs. A is anti-pattern #7 (flat topology), B destroys context isolation (the entire point of subagents), D doubles cost and latency for nothing.",
  },
  {
    id: "d1-q3",
    scenario: "Developer Productivity",
    question: "Company policy: Claude must never write to infra/prod/. Where does this rule belong?",
    options: [
      "A PreToolUse hook (or deny permission rule) that blocks Edit/Write on that path",
      "A prominent instruction at the top of CLAUDE.md",
      "A system-prompt warning repeated in every subagent definition",
      "Training the team to review diffs before committing",
    ],
    answer: 0,
    explanation:
      "\"Never\" means deterministic enforcement — hooks and permission rules cannot be argued with. B and C are anti-pattern #1 (prompt-based rule enforcement): prompts raise the probability of compliance, they do not guarantee it. D is a mitigation, not a control.",
  },
  {
    id: "d1-q4",
    scenario: "Structured Data Extraction",
    question: "A team wants to pull 6 fixed fields out of uniform vendor invoices, 500/day. The architecturally correct starting point is:",
    options: [
      "A coordinator agent with extraction, validation and correction subagents",
      "An agent with document tools that decides per-invoice how to extract",
      "Fine-tuning a model on labelled invoices",
      "A single structured-output call with a JSON schema, batched for volume",
    ],
    answer: 3,
    explanation:
      "Well-defined, repeatable, fixed schema = workflow, not agent. Use the simplest pattern that meets the bar; agents add autonomy cost with no benefit here. A and B over-engineer (the exam's favourite distractor style); C is premature before prompting is exhausted.",
  },
  {
    id: "d1-q5",
    scenario: "Customer Support Resolution Agent",
    question: "Turn 3: customer's identity verified. Turn 45: the long conversation gets compacted. How should the architecture have protected the verification fact?",
    options: [
      "Increase the context window so compaction never happens",
      "Write verified-identity and case facts to durable session state when they occur, re-inject into the system prompt each request",
      "Instruct the model to always preserve important facts when summarising",
      "Re-verify the customer after every compaction for safety",
    ],
    answer: 1,
    explanation:
      "Critical facts get extracted to durable state at the moment they are established — never left to survive summarisation by luck. A is anti-pattern #4 (a bigger window as a strategy), C is probabilistic preservation of a fact that must be deterministic, D burns customer trust to paper over an architecture gap.",
  },
];

/* ---- page -------------------------------------------------------------------- */

export default function AgenticArchitectureLesson() {
  return (
    <>
      <SchemaOrg schema={PAGE_SCHEMA} />
      <section className="relative isolate overflow-hidden border-b border-line">
        <div className="aurora absolute inset-0 -z-10" />
        <Container className="py-5 sm:py-7">
          <span className="inline-flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-bright">
            <span className="h-1 w-1 rounded-full bg-brand" />
            Lesson 1 · Domain 1 · 27% of the exam — the biggest domain
          </span>
          <h1 className="mt-2 text-2xl font-bold leading-[1.15] tracking-tight text-fg sm:text-3xl lg:text-4xl">
            Agentic Architecture &amp; Orchestration
          </h1>
          <p className="mt-2 max-w-3xl text-[15px] leading-7 text-muted">
            Everything Domain 1 tests: the agentic loop, <Code>stop_reason</Code> handling, tool execution, task
            decomposition, multi-agent topologies, subagents with isolated context, session state, and lifecycle hooks.
            Every concept comes with the real request, response, or code — because that is how the exam frames its
            questions.
          </p>
        </Container>
      </section>

      <section className="py-6 sm:py-8">
        <Container>
          <LessonChipNav items={TOC} />
          <div className="grid gap-8 lg:grid-cols-[250px_minmax(0,1fr)]">
            <aside className="sticky top-24 hidden self-start lg:block">
              <LessonToc items={TOC} />
            </aside>
            <main className="min-w-0">
              <Sec id="s1" pid="d1-s1" title="1.1 The agentic spectrum: workflow vs agent" blueprint='"defining agentic systems & degrees of autonomy"'>
                <P>
                  The exam&apos;s first trap is definitional. Anthropic draws a hard line between two ways of using an
                  LLM in a system, and several questions hinge on picking the right side of it:
                </P>
                <div className="mt-3 overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr>
                        <th className={TH}></th>
                        <th className={TH}>Workflow</th>
                        <th className={TH}>Agent</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className={`${TD} font-semibold`}>Control flow</td>
                        <td className={TD}>Predefined by your code — the LLM fills in steps you orchestrated</td>
                        <td className={TD}>Decided by the model at runtime — Claude chooses which tools to call, in what order, and when to stop</td>
                      </tr>
                      <tr>
                        <td className={`${TD} font-semibold`}>Best when</td>
                        <td className={TD}>The task is well-defined and repeatable (classify, extract, route)</td>
                        <td className={TD}>The path to the goal is unknown in advance (debug this failure, resolve this ticket)</td>
                      </tr>
                      <tr>
                        <td className={`${TD} font-semibold`}>Cost / latency</td>
                        <td className={TD}>Predictable</td>
                        <td className={TD}>Open-ended — must be bounded with max iterations, budgets, timeouts</td>
                      </tr>
                      <tr>
                        <td className={`${TD} font-semibold`}>Failure mode</td>
                        <td className={TD}>Brittle when input varies</td>
                        <td className={TD}>Runaway loops, tool misuse, unbounded spend</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <P>
                  The architect&apos;s rule the exam rewards: <strong>use the simplest pattern that solves the problem</strong>.
                  If a fixed prompt chain hits the quality bar, an agent is the wrong answer — even though this is an
                  &quot;agents&quot; certification. Distractors love to offer an impressive multi-agent design for a task a
                  single prompt handles.
                </P>
                <Callout tone="exam" title="How the exam asks this">
                  &quot;A team wants to extract invoice fields from PDFs with a fixed schema. What should they build?&quot; —
                  the correct answer is a single structured-output call, not an agent. Autonomy is a cost you pay, not a
                  feature you add by default.
                </Callout>
              </Sec>

              <Sec id="s2" pid="d1-s2" title="1.2 The agentic loop — the pattern behind every question" blueprint='"the agentic loop / action loop"'>
                <P>
                  Every agent, from a support bot to Claude Code itself, runs the same four-beat loop:{" "}
                  <strong>
                    send request → check <Code>stop_reason</Code> → execute tool → return result → repeat
                  </strong>
                  . You must be able to read this loop in raw API terms.
                </P>
                <AgenticLoopDiagram />
                <H3>Beat 1 — the request declares tools</H3>
                <CodeBlock>{`POST /v1/messages
{
  "model": "claude-sonnet-5",
  "max_tokens": 4096,
  "tools": [{
    "name": "get_order_status",
    "description": "Look up the current status, carrier and ETA of a customer order by its order ID. Use when the customer asks where their order is.",
    "input_schema": {
      "type": "object",
      "properties": { "order_id": { "type": "string" } },
      "required": ["order_id"]
    }
  }],
  "messages": [
    { "role": "user", "content": "Where is my order ORD-8813?" }
  ]
}`}</CodeBlock>
                <H3>Beat 2 — Claude answers with a tool call, not text</H3>
                <CodeBlock>{`{
  "role": "assistant",
  "stop_reason": "tool_use",
  "content": [
    { "type": "text", "text": "I'll check that order for you." },
    { "type": "tool_use",
      "id": "toolu_01A9x",
      "name": "get_order_status",
      "input": { "order_id": "ORD-8813" } }
  ]
}`}</CodeBlock>
                <P>
                  The <Code>stop_reason</Code> field is the loop&apos;s steering wheel. Memorise the values — the exam
                  tests them directly:
                </P>
                <div className="mt-3 overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr>
                        <th className={TH}>stop_reason</th>
                        <th className={TH}>Meaning</th>
                        <th className={TH}>Your code should</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className={TD}><Code>tool_use</Code></td>
                        <td className={TD}>Claude wants a tool executed</td>
                        <td className={TD}>Run the tool, append a <Code>tool_result</Code>, call the API again</td>
                      </tr>
                      <tr>
                        <td className={TD}><Code>end_turn</Code></td>
                        <td className={TD}>Claude finished its answer</td>
                        <td className={TD}>Exit the loop, return the response</td>
                      </tr>
                      <tr>
                        <td className={TD}><Code>max_tokens</Code></td>
                        <td className={TD}>Output was truncated at the limit</td>
                        <td className={TD}>Treat as incomplete — never parse truncated JSON as success</td>
                      </tr>
                      <tr>
                        <td className={TD}><Code>stop_sequence</Code></td>
                        <td className={TD}>A custom stop string was hit</td>
                        <td className={TD}>Handle per your protocol</td>
                      </tr>
                      <tr>
                        <td className={TD}><Code>refusal</Code></td>
                        <td className={TD}>Claude declined the request</td>
                        <td className={TD}>Surface gracefully; do not blind-retry</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <H3>Beats 3+4 — execute, return, repeat, and always bound the loop</H3>
                <CodeBlock>{`import anthropic
client = anthropic.Anthropic()

messages = [{"role": "user", "content": "Where is my order ORD-8813?"}]
MAX_ITERATIONS = 10   # an unbounded agent loop is a production incident

for _ in range(MAX_ITERATIONS):
    resp = client.messages.create(
        model="claude-sonnet-5", max_tokens=4096,
        tools=TOOLS, messages=messages)

    if resp.stop_reason == "tool_use":
        messages.append({"role": "assistant", "content": resp.content})
        results = []
        for block in resp.content:
            if block.type == "tool_use":
                results.append({
                    "type": "tool_result",
                    "tool_use_id": block.id,          # must match the tool_use id
                    "content": run_tool(block.name, block.input)})
        messages.append({"role": "user", "content": results})  # results go back as a USER turn
        continue
    break   # end_turn (or refusal / max_tokens) exits the loop`}</CodeBlock>
                <Callout tone="trap" title="Classic distractor">
                  Returning the tool result as an <Code>assistant</Code> message, or forgetting <Code>tool_use_id</Code>.
                  Tool results are content blocks inside the <em>next user turn</em>, correlated by ID. Any answer choice
                  that breaks that contract is wrong.
                </Callout>
                <details className="mt-3 rounded-xl border border-line bg-ink">
                  <summary className="cursor-pointer px-4 py-2.5 text-[13.5px] font-semibold text-fg">
                    Deep dive: why the loop must be bounded three ways
                  </summary>
                  <div className="border-t border-dashed border-line px-4 py-3">
                    <P>
                      Production agent loops are bounded by (1) <strong>iteration count</strong> — a hard ceiling on round
                      trips; (2) <strong>budget</strong> — cumulative token or dollar spend per session; (3){" "}
                      <strong>wall clock</strong> — user-facing latency SLA. The exam expects you to know that model
                      self-restraint is not a control: an agent that &quot;usually stops&quot; is an unbounded agent.
                      Bounds live in code, never in the prompt.
                    </P>
                  </div>
                </details>
              </Sec>

              <Sec id="s3" pid="d1-s3" title="1.3 Executing tools correctly: parallel calls and error results" blueprint='"tool execution & result handling"'>
                <P>Two execution details separate passing candidates from failing ones.</P>
                <H3>Parallel tool use</H3>
                <P>
                  Claude can emit <em>multiple</em> <Code>tool_use</Code> blocks in one assistant turn when calls are
                  independent (e.g. &quot;check the order status AND the refund policy&quot;). Your loop must execute all
                  of them and return <strong>all results in a single user turn</strong>, one <Code>tool_result</Code>{" "}
                  block per <Code>tool_use_id</Code>. Returning them across separate turns breaks the correlation and is
                  a recurring distractor.
                </P>
                <H3>Errors are data, not exceptions</H3>
                <P>
                  When a tool fails, you do not crash the loop and you do not silently return an empty string. You return
                  a structured error <em>to the model</em> so it can reason about recovery:
                </P>
                <CodeBlock>{`{
  "type": "tool_result",
  "tool_use_id": "toolu_01A9x",
  "is_error": true,
  "content": "Order lookup failed: ORDER_NOT_FOUND. The order ID may be
mistyped. Valid IDs look like ORD-#### . Ask the customer to re-check."
}`}</CodeBlock>
                <P>
                  Note what that error contains: an error <em>category</em>, a hint about <em>whether retrying makes
                  sense</em>, and a suggested <em>next action</em>. Claude reads error text like instructions — a good
                  error message is self-healing behaviour for free.
                </P>
                <Callout tone="trap" title="Anti-pattern #5: silent failure">
                  Returning <Code>&quot;&quot;</Code> or omitting the failed call entirely makes the agent hallucinate a
                  success path. Exam answers that &quot;skip the failed tool and continue&quot; are wrong; answers that
                  return structured error context are right.
                </Callout>
              </Sec>

              <Sec id="s4" pid="d1-s4" title="1.4 Task decomposition: when to break work apart" blueprint='"task decomposition strategies"'>
                <P>Decomposition questions give you a big task and four ways to split it. The scoring logic behind the correct answers:</P>
                <ul className="mt-2 max-w-[74ch] list-disc space-y-1.5 pl-6 text-[15px] leading-7 text-slate-700">
                  <li>
                    <strong>Decompose when subtasks need different context.</strong> A research task over 40 documents
                    cannot fit one context window; each reader gets its slice, a synthesiser gets the summaries.
                  </li>
                  <li>
                    <strong>Decompose when subtasks need different tools or permissions.</strong> The agent that reads
                    production logs should not be the agent that writes code — scoping is decomposition.
                  </li>
                  <li>
                    <strong>Decompose when steps have different quality bars.</strong> A cheap model drafts, a strong
                    model reviews (multi-pass beats one giant pass).
                  </li>
                  <li>
                    <strong>Do NOT decompose when the task is sequential and shares one evolving state.</strong> Splitting
                    a refactor across agents that each hold partial state creates merge conflicts and lost context — keep
                    it in one session.
                  </li>
                </ul>
                <P>
                  Output contracts make decomposition work: each subtask returns a <strong>structured summary</strong>{" "}
                  (facts, decisions, open issues), never its raw transcript. The coordinator reasons over summaries;
                  shipping full transcripts upward recreates the context problem you decomposed to escape.
                </P>
                <Callout tone="exam" title="How the exam asks this">
                  The Multi-Agent Research scenario asks how the coordinator should receive subagent output. &quot;Full
                  conversation history&quot; is always a distractor; &quot;structured summary with source references&quot;
                  is the pattern Anthropic teaches.
                </Callout>
              </Sec>

              <Sec id="s5" pid="d1-s5" title="1.5 Multi-agent topologies: hub-and-spoke wins" blueprint='"multi-agent coordination / hub-and-spoke"'>
                <P>
                  When one agent is not enough, the exam recognises exactly one blessed shape: a{" "}
                  <strong>coordinator (hub)</strong> that owns the goal, delegates bounded subtasks to{" "}
                  <strong>specialist subagents (spokes)</strong>, and synthesises their results. Spokes never talk to each
                  other.
                </P>
                <TopologyDiagram />
                <P>Why flat (peer-to-peer) topologies are anti-pattern #7:</P>
                <ul className="mt-2 max-w-[74ch] list-disc space-y-1.5 pl-6 text-[15px] leading-7 text-slate-700">
                  <li><strong>No single owner of &quot;done.&quot;</strong> Peers can ping-pong work forever; the hub decides completion.</li>
                  <li><strong>N² communication paths</strong> means N² places context gets corrupted or duplicated.</li>
                  <li><strong>Debugging dies.</strong> With a hub, every decision has one audit point; with peers, causality is spread across transcripts.</li>
                  <li><strong>Error propagation becomes untraceable</strong> — a hallucination introduced by one peer laundered through another looks like independent confirmation.</li>
                </ul>
                <Callout tone="trap" title="Distractor pattern">
                  &quot;Let the search agent send its findings directly to the report agent for efficiency.&quot; Any
                  answer routing spoke-to-spoke — however efficient it sounds — is the planted anti-pattern. Results flow
                  through the coordinator.
                </Callout>
              </Sec>

              <Sec id="s6" pid="d1-s6" title="1.6 Subagents and context isolation" blueprint='"context forking, Task tool, delegation"'>
                <P>
                  A subagent is a <em>fresh context window</em> with its own system prompt, its own restricted tool set,
                  and a one-shot task. In Claude Code / the Agent SDK this is the <strong>Task tool</strong>: the parent
                  spawns a subagent, the subagent works in isolation, and only its <strong>final report</strong> returns
                  to the parent.
                </P>
                <ContextIsolationDiagram />
                <P>Three properties the exam tests:</P>
                <ol className="mt-2 max-w-[74ch] list-decimal space-y-1.5 pl-6 text-[15px] leading-7 text-slate-700">
                  <li>
                    <strong>Isolation is the feature.</strong> The subagent&apos;s exploration (50 file reads, dead ends,
                    noise) never pollutes the parent&apos;s context. The parent pays only for the conclusion.
                  </li>
                  <li>
                    <strong>Tool scoping happens per subagent.</strong> A read-only research subagent gets Read/Grep/Glob
                    and nothing else. Giving every agent every tool is anti-pattern #6 — it bloats reasoning and widens
                    blast radius.
                  </li>
                  <li>
                    <strong>Communication is a contract.</strong> The parent&apos;s prompt to a subagent must be
                    self-contained (the subagent has no memory of the conversation), and it should specify the shape of
                    the report it wants back.
                  </li>
                </ol>
                <P>In Claude Code, custom subagents are Markdown files with frontmatter — this exact syntax appears in questions:</P>
                <CodeBlock>{`# .claude/agents/security-auditor.md
---
name: security-auditor
description: Reviews code changes for security issues. Use after any
  change that touches auth, input handling, or file access.
tools: Read, Grep, Glob        # read-only: an auditor never edits
---
You are a security auditor. Examine the changed files for injection,
authz bypass, and unsafe file handling. Report findings as a list of
{file, line, issue, severity}. If nothing is found, say so explicitly.`}</CodeBlock>
                <Callout tone="exam" title="When to fork context">
                  Rule of thumb the exam rewards: delegate to a subagent when the work is (a) exploratory/noisy, (b)
                  parallelisable, or (c) needs different permissions. Keep work inline when the next step depends on rich
                  in-context state.
                </Callout>
              </Sec>

              <Sec id="s7" pid="d1-s7" title="1.7 Session state management" blueprint='"session state management"'>
                <P>
                  The API is stateless: every request re-sends the whole conversation. &quot;Session state&quot; is
                  therefore an architecture decision you make, and the exam asks where each kind of state belongs:
                </P>
                <div className="mt-3 overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr>
                        <th className={TH}>State</th>
                        <th className={TH}>Where it lives</th>
                        <th className={TH}>Why</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className={TD}>Conversation turns</td>
                        <td className={TD}>Your message array / SDK session</td>
                        <td className={TD}>Replayed each request; prompt caching makes the replay cheap</td>
                      </tr>
                      <tr>
                        <td className={TD}>Durable facts (customer ID, verified identity, decisions made)</td>
                        <td className={TD}>External store (DB/file), re-injected into the system prompt</td>
                        <td className={TD}>Survives compaction, restarts and handoffs</td>
                      </tr>
                      <tr>
                        <td className={TD}>Working notes in long tasks</td>
                        <td className={TD}>Scratchpad files the agent writes and re-reads</td>
                        <td className={TD}>Context windows overflow; files do not</td>
                      </tr>
                      <tr>
                        <td className={TD}>Cross-agent state</td>
                        <td className={TD}>Passed explicitly in delegation prompts / reports</td>
                        <td className={TD}>Subagents share no memory — anything unstated is unknown</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <SessionStateDiagram />
                <P>
                  The recurring scenario: a support agent verified the customer&apos;s identity in turn 2; the
                  conversation is compacted at turn 40; the agent asks the customer to verify again (bad) or worse,
                  assumes verification (dangerous). The correct architecture extracted &quot;identity verified, account
                  #, case facts&quot; into durable state <em>at the moment it happened</em>, and re-injects it every
                  request.
                </P>
              </Sec>

              <Sec id="s8" pid="d1-s8" title="1.8 Lifecycle hooks: rules that cannot be talked out of" blueprint='"lifecycle hooks (PreToolUse/PostToolUse)"'>
                <P>
                  Hooks are deterministic scripts that fire at fixed points of the agent lifecycle —{" "}
                  <Code>PreToolUse</Code> (can block a tool call before it runs), <Code>PostToolUse</Code> (react to a
                  result: format, lint, log), plus session-level events. The architectural point the exam hammers:{" "}
                  <strong>a hook is enforcement; a prompt is a suggestion.</strong>
                </P>
                <HooksDiagram />
                <CodeBlock>{`// .claude/settings.json - block edits to production config, always
{
  "hooks": {
    "PreToolUse": [{
      "matcher": "Edit|Write",
      "hooks": [{ "type": "command",
                  "command": "python check_protected_paths.py" }]
    }],
    "PostToolUse": [{
      "matcher": "Edit|Write",
      "hooks": [{ "type": "command", "command": "npx prettier --write" }]
    }]
  }
}`}</CodeBlock>
                <P>
                  If the requirement contains words like <em>must never / always / compliance / policy</em>, the answer
                  is a hook (or permission rule), not a CLAUDE.md instruction. Prompts steer probability; hooks remove
                  it. That is anti-pattern #1 in one sentence.
                </P>
                <Callout tone="trap" title="Distractor pattern">
                  &quot;Add &apos;never modify files in /prod&apos; to the system prompt.&quot; Tempting, cheap — and
                  wrong whenever the stem says the rule is mandatory. Deterministic requirements get deterministic
                  enforcement.
                </Callout>
              </Sec>

              <CheckpointQuiz title="Checkpoint quiz — Domain 1" questions={QUIZ} />

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
