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
import { ScenarioDomainMapDiagram, ExamDrawDiagram } from "@/components/course-diagrams-scenarios";

const LESSON_URL = `${SITE.url}${CCAF_BASE}/exam-scenarios`;

export const metadata: Metadata = {
  title: "The 6 CCA-F Exam Scenarios, Deconstructed — Free Lesson",
  description:
    "Free CCA-F lesson: a deep dive into each of the 6 business scenarios the exam is built on — Customer Support Resolution Agent, Code Generation with Claude Code, Multi-Agent Research System, Developer Productivity Tools, Claude Code in CI/CD, and Structured Data Extraction — what each really tests, a mini decision point, and strong vs weak architectural choices.",
  keywords: [
    "cca-f exam scenarios",
    "claude certified architect scenarios",
    "cca-f customer support scenario",
    "cca-f multi-agent research scenario",
    "cca-f code generation scenario",
    "cca-f ci/cd scenario",
  ],
  alternates: { canonical: `${CCAF_BASE}/exam-scenarios` },
  openGraph: {
    title: "The 6 CCA-F Exam Scenarios, Deconstructed",
    description:
      "What each of the exam's 6 business scenarios really tests, a mini decision point for each, and strong vs weak architectural choices — with an animated scenario-to-domain map.",
    url: LESSON_URL,
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "The 6 CCA-F Exam Scenarios, Deconstructed",
    description:
      "Every CCA-F question is anchored to one of 6 scenarios, 4 drawn at random per sitting. Here is each one, deconstructed.",
  },
};

const PAGE_SCHEMA = [
  webPageSchema({
    url: LESSON_URL,
    name: "The 6 CCA-F Exam Scenarios, Deconstructed",
    description:
      "Free lesson deconstructing the 6 business scenarios the CCA-F exam draws its questions from: what each is really testing, a mini decision point, and strong vs weak architectural choices.",
  }),
  breadcrumbSchema(LESSON_URL, [
    { name: "Home", url: SITE.url },
    { name: "Free Courses", url: `${SITE.url}/free-courses` },
    { name: "CCA-F Prep Course", url: `${SITE.url}${CCAF_BASE}` },
    { name: "The 6 Exam Scenarios", url: LESSON_URL },
  ]),
];

const TOC: TocItem[] = [
  { id: "s1", label: "6.1 Customer Support Resolution Agent", progressId: "d6-s1" },
  { id: "s2", label: "6.2 Code Generation with Claude Code", progressId: "d6-s2" },
  { id: "s3", label: "6.3 Multi-Agent Research System", progressId: "d6-s3" },
  { id: "s4", label: "6.4 Developer Productivity Tools", progressId: "d6-s4" },
  { id: "s5", label: "6.5 Claude Code in CI/CD", progressId: "d6-s5" },
  { id: "s6", label: "6.6 Structured Data Extraction", progressId: "d6-s6" },
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
    id: "d6-q1",
    scenario: "Customer Support Resolution Agent",
    question:
      "Turn 2 verified the customer's identity. The team's dashboard shows first-contact resolution at 76%, just under the 80% target. A refund request comes in that is 40% over the policy threshold — a case that trips a mandatory escalation trigger. What should happen?",
    options: [
      "Let the agent use its own judgment on whether the case feels resolvable, to protect the resolution-rate metric",
      "Escalate automatically because the case trips a deterministic policy threshold — the FCR target does not override a mandatory trigger",
      "Ask the agent to re-verify the customer's identity again before deciding anything, to buy time",
      "Increase the context window so the agent can reason through the exception in more depth",
    ],
    answer: 1,
    explanation:
      "Escalation triggers are deterministic policy boundaries, not a call for the model's self-reported confidence — trusting the model's sense that a case 'feels fine' (A) is exactly the anti-pattern the scenario is built to catch. A metric target never outranks a mandatory trigger. C wastes the already-verified identity and damages trust for no reason. D is the classic 'bigger context window as a strategy' distractor — this is a policy question, not a reasoning-depth question.",
  },
  {
    id: "d6-q2",
    scenario: "Code Generation with Claude Code",
    question:
      "A 40-person engineering org is rolling out Claude Code. One rule is mandatory for everyone (\"never edit files under infra/prod/\"); other preferences (preferred commit style, personal aliases) should vary developer to developer. Where should each live?",
    options: [
      "Put both in one top-level CLAUDE.md so the whole org reads the same file",
      "Enforce the mandatory rule with a PreToolUse hook or permission rule at the repo level; let personal preferences live in each developer's user-level CLAUDE.md",
      "Write the mandatory rule as strongly worded text inside each developer's personal CLAUDE.md",
      "Skip configuration and rely on code review to catch violations after the fact",
    ],
    answer: 1,
    explanation:
      "Team-wide consistency needs deterministic enforcement (a hook/permission rule that cannot be argued with); individual flexibility belongs in user-level config that does not have to be identical across 40 people. A conflates 'shared' with 'enforced' — a shared file is still just a prompt, and any developer's personal edits to it could drift. C repeats the same mistake at individual scale — a rule that MUST hold cannot depend on prose being present and unedited in 40 separate files. D catches violations after the damage is done, not before.",
  },
  {
    id: "d6-q3",
    scenario: "Multi-Agent Research System",
    question:
      "A coordinator delegates to search, analysis, synthesis, and reporting subagents. The search subagent finds nothing for one of five sub-queries, and the analysis and synthesis subagents' summaries disagree on a key figure. What should the coordinator do?",
    options: [
      "Silently drop the sub-query with no results and use whichever figure the synthesis subagent reported, since it ran last",
      "Surface the zero-result sub-query as an explicit gap in the final report, and reconcile the conflicting figures by checking each subagent's cited source rather than trusting either one by default",
      "Re-run all four subagents from scratch so every number matches",
      "Let the analysis and synthesis subagents message each other directly to settle the discrepancy",
    ],
    answer: 1,
    explanation:
      "A coordinator's job includes surfacing what it could not find and resolving conflicts on evidence — not on recency or convenience (A is silent failure plus an arbitrary tie-break). Full re-runs (C) burn cost and latency without addressing why the figures diverged. D routes spoke-to-spoke, breaking hub-and-spoke (anti-pattern #7) — the coordinator is the only place that should own reconciling conflicting reports.",
  },
  {
    id: "d6-q4",
    scenario: "Developer Productivity Tools",
    question:
      "Onboarding automation must find every usage of a deprecated internal API across a 4,000-file monorepo it has never seen, using Grep/Glob/Read plus an MCP server for the ticketing system, then propose a migration plan. How should the exploration be structured to keep the main session usable?",
    options: [
      "Run the entire search and every file read in the main conversation so all context is visible when writing the final plan",
      "Delegate the noisy exploration (grepping, opening candidate files, checking each usage) to a subagent scoped to read-only tools, and have it return a structured summary of usages plus a proposed plan",
      "Give a single agent every available tool, including Write and Bash, so it never has to ask for anything",
      "Fine-tune a model on the monorepo before starting the search",
    ],
    answer: 1,
    explanation:
      "Exploratory, noisy, read-only work is exactly what a scoped subagent protects the parent's context from — hundreds of grep hits and dead-end reads never need to enter the main session. A recreates the context-bloat problem subagents exist to solve. C is anti-pattern #6 (unrestricted tool access) — a search task never needs Write or Bash. D is premature and expensive for a task that plain search tools already solve.",
  },
  {
    id: "d6-q5",
    scenario: "Claude Code in CI/CD",
    question:
      "A pipeline runs Claude Code to review every pull request and generate missing tests. The PR-comment bot needs machine-parseable output, and one PR's run must never carry state into the next PR's run. Which setup satisfies both requirements?",
    options: [
      "Run claude interactively inside the CI container and scrape the terminal transcript with regex",
      "Run claude -p with --output-format json, starting a brand-new session for every PR so no prior conversation state carries over",
      "Reuse one long-lived Claude Code session across every PR that day to save on prompt caching",
      "Have the model write a plain-English summary and have the bot parse it with keyword matching",
    ],
    answer: 1,
    explanation:
      "Headless mode with structured JSON output is built for exactly this: machine-parseable, scriptable, and isolated per invocation. A is fragile (regex over a terminal transcript breaks on any formatting change). C is the session-isolation failure the scenario is designed to test — one PR's findings or state could leak into the next review. D throws away structure for a parsing method that breaks the moment the model phrases something differently.",
  },
  {
    id: "d6-q6",
    scenario: "Structured Data Extraction",
    question:
      "A team needs 12 fields extracted from 50,000 scanned vendor contracts overnight (an 8-hour deadline), and separately needs 3 fields extracted from a customer email pasted into a live chat widget. Some contracts genuinely lack certain fields (e.g. no renewal clause). What is the correct combination of API choice and schema design?",
    options: [
      "Use the Message Batches API for both jobs, and simply omit any field that might be absent from the schema",
      "Use the Message Batches API for the overnight bulk job and the real-time API for the live chat extraction, and mark the sometimes-absent fields nullable so the model returns null instead of guessing a value",
      "Use the real-time API for both jobs since it is simpler to implement, and require every field so the output is never incomplete",
      "Use the Batch API for the live chat widget because it is cheaper, and the real-time API for the bulk job because it is faster",
    ],
    answer: 1,
    explanation:
      "Deadline-tolerant, high-volume, non-interactive work is what the Batch API is for; anything user-facing needs the real-time API. Nullable fields let the model say 'this genuinely is not here' instead of hallucinating a plausible-looking value to satisfy a required field — omitting the field entirely (A) loses the fact that it was checked and found absent. C forces hallucination on every contract missing a clause, and gets the latency profile backwards for the live case. D swaps the two APIs' actual trade-offs (Batch is cheaper but not instant; real-time is faster but not the deadline-tolerant, bulk-discounted option).",
  },
];

/* ---- page -------------------------------------------------------------------- */

export default function ExamScenariosLesson() {
  return (
    <>
      <SchemaOrg schema={PAGE_SCHEMA} />
      <section className="relative isolate overflow-hidden border-b border-line">
        <div className="aurora absolute inset-0 -z-10" />
        <Container className="py-5 sm:py-7">
          <span className="inline-flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-bright">
            <span className="h-1 w-1 rounded-full bg-brand" />
            Lesson 6 · Every question is anchored to one of these
          </span>
          <h1 className="mt-2 text-2xl font-bold leading-[1.15] tracking-tight text-fg sm:text-3xl lg:text-4xl">
            The 6 CCA-F exam scenarios, deconstructed
          </h1>
          <p className="mt-2 max-w-3xl text-[15px] leading-7 text-muted">
            Lesson 0 introduced the six business scenarios in one table. This is the deep dive: what each scenario
            really is, what it is really testing underneath the business framing, a realistic decision point you
            could be asked to judge, and what separates a strong architectural choice from a weak one.
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
                <h2 className="text-lg font-bold tracking-tight text-fg sm:text-xl">
                  Every scenario is a costume worn by one or two domains
                </h2>
                <P>
                  The business framing changes — a support bot, a CI pipeline, a research system — but the underlying
                  architectural concept being tested is always drawn from the same five domains you already studied.
                  Learning to see through the scenario to the domain underneath is the single highest-leverage skill
                  for exam day.
                </P>
                <ScenarioDomainMapDiagram />
              </div>

              <Sec
                id="s1"
                pid="d6-s1"
                title="6.1 Customer Support Resolution Agent"
                blueprint='"Customer Support Resolution Agent scenario"'
              >
                <P>
                  <strong>The scenario:</strong> a company is building or deploying an agent that handles returns,
                  billing disputes, and account issues end to end, with a stated business target of{" "}
                  <strong>80%+ first-contact resolution (FCR)</strong> — solving the customer&apos;s problem in a
                  single conversation, without a human handoff.
                </P>
                <H3>What it&apos;s really testing</H3>
                <ul className="mt-2 max-w-[74ch] list-disc space-y-1.5 pl-6 text-[15px] leading-7 text-slate-700">
                  <li>
                    <strong>Tool error handling and recovery (Domain 1).</strong> Order lookups time out, refund APIs
                    return declines — the agent must reason over structured errors, not crash or hallucinate success.
                  </li>
                  <li>
                    <strong>Escalation via deterministic triggers, not self-reported confidence (Domain 5).</strong>{" "}
                    The scenario almost always plants an option where the agent &quot;decides it can handle it&quot;
                    based on its own sense of the conversation. That is never the correct answer when a policy
                    threshold exists.
                  </li>
                  <li>
                    <strong>Session state preservation across a long conversation (Domain 1 / 5).</strong> Verified
                    identity and case facts established early must survive to the end of the conversation, including
                    across any compaction.
                  </li>
                  <li>
                    <strong>The FCR-vs-escalation tension.</strong> The scenario&apos;s signature trap: a resolution-rate
                    target sitting right next to a mandatory escalation rule. The target never wins.
                  </li>
                </ul>
                <H3>Mini decision point</H3>
                <P>
                  A customer&apos;s identity was verified in turn 2. By turn 20, they are requesting a refund that is
                  40% outside the policy window, and the team&apos;s FCR dashboard is sitting just under the 80%
                  target for the month. The refund-eligibility tool returns <Code>false</Code>. Does the agent try to
                  find a way to approve the exception to protect the metric, escalate immediately because the case
                  trips a defined policy threshold, or attempt more troubleshooting first?
                </P>
                <div className="mt-3 overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr>
                        <th className={TH}>Strong choice</th>
                        <th className={TH}>Weak choice</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className={TD}>
                          Escalate the moment the deterministic threshold is tripped, and hand the human agent the
                          already-verified identity and case facts so the customer never repeats themselves.
                        </td>
                        <td className={TD}>
                          Let the agent weigh whether it &quot;feels confident&quot; approving the exception, because
                          the team is under pressure to hit its FCR number this month.
                        </td>
                      </tr>
                      <tr>
                        <td className={TD}>
                          Treat the FCR target as a lagging outcome metric the architecture influences indirectly (by
                          resolving the cases it safely can) — never as a rule to satisfy by skipping a control.
                        </td>
                        <td className={TD}>
                          Re-verify the customer&apos;s identity a second time &quot;to be safe&quot; instead of
                          trusting state already established — this doesn&apos;t fix anything and erodes trust.
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <Callout tone="exam" title="Recognise this fast">
                  If the stem gives you a numeric business target (FCR%, CSAT, average handle time) sitting next to a
                  &quot;must always / must never&quot; policy word, the target is a distractor and the policy word
                  names the correct answer.
                </Callout>
              </Sec>

              <Sec
                id="s2"
                pid="d6-s2"
                title="6.2 Code Generation with Claude Code"
                blueprint='"Code Generation with Claude Code scenario"'
              >
                <P>
                  <strong>The scenario:</strong> a company is rolling out Claude Code across a development team — not
                  one developer&apos;s personal setup, but shared configuration that many engineers will use
                  day to day.
                </P>
                <H3>What it&apos;s really testing</H3>
                <ul className="mt-2 max-w-[74ch] list-disc space-y-1.5 pl-6 text-[15px] leading-7 text-slate-700">
                  <li>
                    <strong>CLAUDE.md hierarchy and shared config (Domain 3).</strong> What belongs at the repo level
                    (everyone must see it) versus the user level (one developer&apos;s own preferences), and how the
                    two layers combine.
                  </li>
                  <li>
                    <strong>Slash command and skill design with proper tool scoping (Domain 3).</strong> A shared
                    <Code>/deploy</Code> command or skill should carry exactly the tools it needs — no more.
                  </li>
                  <li>
                    <strong>Plan mode vs direct execution judgment (Domain 3).</strong> Knowing when a change is risky
                    or ambiguous enough to warrant a reviewed plan first, versus safe enough to execute directly.
                  </li>
                  <li>
                    <strong>Team-wide consistency vs individual flexibility.</strong> The scenario tests whether you
                    know which layer of configuration a given rule belongs in.
                  </li>
                </ul>
                <H3>Mini decision point</H3>
                <P>
                  A 40-person engineering org wants: (1) nobody ever edits <Code>infra/prod/</Code> directly, (2) a
                  consistent commit-message format across the team, and (3) each developer keeping their own personal
                  shortcuts and aliases. Three different rules, three different correct homes.
                </P>
                <div className="mt-3 overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr>
                        <th className={TH}>Requirement</th>
                        <th className={TH}>Strong choice</th>
                        <th className={TH}>Weak choice</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className={`${TD} font-semibold`}>Never edit infra/prod/</td>
                        <td className={TD}>Repo-level PreToolUse hook or permission rule that blocks it outright</td>
                        <td className={TD}>A line in the repo CLAUDE.md asking Claude not to</td>
                      </tr>
                      <tr>
                        <td className={`${TD} font-semibold`}>Consistent commit format</td>
                        <td className={TD}>Repo-level CLAUDE.md convention or a shared slash command everyone runs</td>
                        <td className={TD}>Leave it to each developer&apos;s memory</td>
                      </tr>
                      <tr>
                        <td className={`${TD} font-semibold`}>Personal aliases/shortcuts</td>
                        <td className={TD}>Each developer&apos;s own user-level CLAUDE.md or personal settings</td>
                        <td className={TD}>Bake everyone&apos;s personal preferences into the shared repo file</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <Callout tone="trap" title="Distractor pattern">
                  &quot;Put the mandatory rule in CLAUDE.md so everyone sees it.&quot; Visibility is not enforcement —
                  this is anti-pattern #1 again, wearing a Claude Code costume. A must-never rule needs a hook or
                  permission rule, full stop.
                </Callout>
              </Sec>

              <Sec
                id="s3"
                pid="d6-s3"
                title="6.3 Multi-Agent Research System"
                blueprint='"Multi-Agent Research System scenario"'
              >
                <P>
                  <strong>The scenario:</strong> a coordinator agent delegates a research task to specialised
                  subagents — typically search, analysis, synthesis, and reporting — and assembles their work into a
                  final answer.
                </P>
                <H3>What it&apos;s really testing</H3>
                <ul className="mt-2 max-w-[74ch] list-disc space-y-1.5 pl-6 text-[15px] leading-7 text-slate-700">
                  <li>
                    <strong>Hub-and-spoke orchestration vs flat topology (Domain 1).</strong> The coordinator owns the
                    plan and the definition of &quot;done&quot;; spokes never talk to each other.
                  </li>
                  <li>
                    <strong>Context passing as structured summaries, not raw transcripts (Domain 1).</strong> The
                    coordinator reasons over what each subagent concluded, not everything it read to get there.
                  </li>
                  <li>
                    <strong>Graceful handling of a subagent that finds nothing or fails partway (Domain 1 / 5).</strong>{" "}
                    A dead end is data too — it must surface, not vanish.
                  </li>
                  <li>
                    <strong>Provenance and conflict handling when subagent reports disagree (Domain 5).</strong> Two
                    subagents citing different numbers for the same fact is a reconciliation problem, not a coin
                    flip.
                  </li>
                </ul>
                <H3>Mini decision point</H3>
                <P>
                  Four subagents run: search, analysis, synthesis, reporting. The search subagent returns zero
                  results for one of its five sub-queries. Separately, the analysis subagent&apos;s summary states a
                  market-size figure that disagrees with the number in the synthesis subagent&apos;s summary. The
                  coordinator has to decide what goes into the final report.
                </P>
                <div className="mt-3 overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr>
                        <th className={TH}>Strong choice</th>
                        <th className={TH}>Weak choice</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className={TD}>
                          Note the zero-result sub-query as an explicit gap in the final report rather than silently
                          dropping it; trace both figures back to their cited sources and reconcile or flag the
                          discrepancy for the user.
                        </td>
                        <td className={TD}>
                          Quietly omit the failed sub-query and pick whichever figure came from the subagent that
                          happened to run last, on the assumption that later means more authoritative.
                        </td>
                      </tr>
                      <tr>
                        <td className={TD}>
                          Keep the reconciliation work inside the coordinator, which is the only agent with visibility
                          into every subagent&apos;s report.
                        </td>
                        <td className={TD}>
                          Let the analysis and synthesis subagents exchange messages directly to &quot;sort it
                          out&quot; between themselves.
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <Callout tone="exam" title="How the exam asks this">
                  Watch for the phrase &quot;for efficiency&quot; attached to any spoke-to-spoke communication option —
                  it is almost always the planted anti-pattern #7 distractor, however reasonable it sounds.
                </Callout>
              </Sec>

              <Sec
                id="s4"
                pid="d6-s4"
                title="6.4 Developer Productivity Tools"
                blueprint='"Developer Productivity Tools scenario"'
              >
                <P>
                  <strong>The scenario:</strong> automating codebase navigation and engineering grunt work — finding
                  usages, tracing dependencies, drafting a migration plan — often on a codebase Claude has never seen
                  before, using the built-in tools (<Code>Read</Code>, <Code>Write</Code>, <Code>Bash</Code>,{" "}
                  <Code>Grep</Code>, <Code>Glob</Code>) plus MCP servers for external systems like a ticketing tool.
                </P>
                <H3>What it&apos;s really testing</H3>
                <ul className="mt-2 max-w-[74ch] list-disc space-y-1.5 pl-6 text-[15px] leading-7 text-slate-700">
                  <li>
                    <strong>MCP server integration and tool scoping (Domain 2).</strong> Which external systems get
                    exposed as tools, and to which parts of the workflow.
                  </li>
                  <li>
                    <strong>Tool description quality driving correct selection (Domain 2).</strong> When two tools
                    sound similar, a vague description is what causes Claude to pick the wrong one.
                  </li>
                  <li>
                    <strong>Subagents for exploratory, noisy work (Domain 1).</strong> Protecting the main session
                    from hundreds of grep hits and dead-end file reads.
                  </li>
                </ul>
                <H3>Mini decision point</H3>
                <P>
                  A team wants Claude Code to find every call site of a deprecated internal API across a 4,000-file
                  monorepo it has no prior familiarity with, cross-reference open tickets via an MCP ticketing
                  server, and propose a migration plan — without derailing the main conversation the developer is
                  actually working in.
                </P>
                <div className="mt-3 overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr>
                        <th className={TH}>Strong choice</th>
                        <th className={TH}>Weak choice</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className={TD}>
                          Delegate the search to a subagent scoped to <Code>Read</Code>/<Code>Grep</Code>/<Code>Glob</Code>{" "}
                          (read-only), return a structured summary of usages plus a proposed migration plan to the
                          parent.
                        </td>
                        <td className={TD}>
                          Run the entire multi-hundred-file exploration inline in the main session &quot;so nothing
                          gets lost.&quot;
                        </td>
                      </tr>
                      <tr>
                        <td className={TD}>
                          Write precise, differentiated tool descriptions so a &quot;list open tickets&quot; MCP tool
                          and a &quot;list closed tickets&quot; MCP tool cannot be confused for each other.
                        </td>
                        <td className={TD}>
                          Give one agent every tool available (including <Code>Write</Code> and <Code>Bash</Code>) so
                          it &quot;never needs to ask&quot; — unrestricted access for a read-only search task.
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </Sec>

              <Sec
                id="s5"
                pid="d6-s5"
                title="6.5 Claude Code in CI/CD"
                blueprint='"Claude Code in CI/CD scenario"'
              >
                <P>
                  <strong>The scenario:</strong> Claude Code runs inside a pipeline — reviewing pull requests,
                  generating missing tests, or both — with no human at a terminal to interact with it.
                </P>
                <H3>What it&apos;s really testing</H3>
                <ul className="mt-2 max-w-[74ch] list-disc space-y-1.5 pl-6 text-[15px] leading-7 text-slate-700">
                  <li>
                    <strong>Headless <Code>-p</Code> mode and <Code>--output-format json</Code> (Domain 3).</strong>{" "}
                    Pipeline steps need machine-parseable output, not a chat transcript.
                  </li>
                  <li>
                    <strong>Session isolation between separate CI runs (Domain 3).</strong> One PR&apos;s review must
                    never inherit state from a different PR&apos;s run.
                  </li>
                  <li>
                    <strong>Minimising false positives via a tightly scoped review prompt (Domain 3 / 4).</strong> A
                    vague &quot;review this code&quot; prompt produces noisy, low-trust comments that teams learn to
                    ignore.
                  </li>
                </ul>
                <H3>Mini decision point</H3>
                <P>
                  A pipeline needs to review every PR&apos;s diff and post inline comments through a bot, and
                  separately generate missing unit tests for new functions. It must run unattended, produce output the
                  bot can parse reliably, and never let one PR&apos;s review leak into the next.
                </P>
                <CodeBlock>{`# CI step - one isolated invocation per PR, machine-parseable output
claude -p "Review this diff for security and correctness issues only. \\
  Do not comment on style. Cite file:line for every finding." \\
  --output-format json < pr-diff.patch > review.json`}</CodeBlock>
                <div className="mt-3 overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr>
                        <th className={TH}>Strong choice</th>
                        <th className={TH}>Weak choice</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className={TD}>
                          A fresh <Code>-p</Code> invocation per PR with <Code>--output-format json</Code>, and a
                          review prompt scoped tightly to the categories the team actually acts on.
                        </td>
                        <td className={TD}>
                          One long-lived interactive session reused across every PR of the day, with the terminal
                          output scraped by regex.
                        </td>
                      </tr>
                      <tr>
                        <td className={TD}>
                          Treat a broad &quot;review everything&quot; prompt as a false-positive generator to be
                          narrowed, not a thoroughness feature.
                        </td>
                        <td className={TD}>
                          Ask for a plain-English summary and have the bot keyword-match it, since &quot;JSON felt like
                          overkill.&quot;
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </Sec>

              <Sec
                id="s6"
                pid="d6-s6"
                title="6.6 Structured Data Extraction"
                blueprint='"Structured Data Extraction scenario"'
              >
                <P>
                  <strong>The scenario:</strong> converting unstructured documents — invoices, contracts, scanned
                  forms, emails — into clean, validated, structured data a downstream system can consume.
                </P>
                <H3>What it&apos;s really testing</H3>
                <ul className="mt-2 max-w-[74ch] list-disc space-y-1.5 pl-6 text-[15px] leading-7 text-slate-700">
                  <li>
                    <strong>JSON schema validation via <Code>tool_use</Code> (Domain 4).</strong> Forcing the model&apos;s
                    output into a schema you can validate mechanically.
                  </li>
                  <li>
                    <strong>Nullable field handling to prevent hallucinated values (Domain 4).</strong> A field that is
                    genuinely absent from the source document must come back <Code>null</Code>, never a plausible
                    guess.
                  </li>
                  <li>
                    <strong>Validation-retry loops (Domain 4).</strong> When the schema check fails, the correct move
                    is a bounded retry with the validation error fed back — not accepting bad data or failing the job.
                  </li>
                  <li>
                    <strong>Message Batches API vs real-time API (Domain 4).</strong> Large, deadline-tolerant jobs
                    belong in Batches; anything user-facing needs the real-time API.
                  </li>
                </ul>
                <H3>Mini decision point</H3>
                <P>
                  A team must extract 12 fields from 50,000 scanned vendor contracts overnight, with an 8-hour
                  deadline and no user waiting on the result. Separately, a live chat widget needs 3 fields extracted
                  from a customer&apos;s pasted email while the customer is on the page. Some contracts genuinely have
                  no renewal clause at all.
                </P>
                <div className="mt-3 overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr>
                        <th className={TH}>Strong choice</th>
                        <th className={TH}>Weak choice</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className={TD}>
                          Message Batches API for the overnight 50,000-contract job (deadline-tolerant, cost-optimised,
                          no one waiting); real-time API for the live chat extraction (user is actively waiting).
                        </td>
                        <td className={TD}>
                          Real-time API for both &quot;because it&apos;s simpler,&quot; ignoring that the bulk job is
                          exactly the deadline-tolerant, high-volume case Batches exists for.
                        </td>
                      </tr>
                      <tr>
                        <td className={TD}>
                          Mark the renewal-clause field <Code>nullable</Code> so the model returns <Code>null</Code>{" "}
                          when a contract genuinely has none, and run a bounded validation-retry loop on schema
                          failures.
                        </td>
                        <td className={TD}>
                          Require every field so the output is never &quot;incomplete&quot; — which forces the model
                          to invent a value for contracts that never had a renewal clause to begin with.
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <Callout tone="trap" title="Distractor pattern">
                  Swapping the two APIs&apos; trade-offs is a common wrong-answer construction: Batches is cheaper but
                  not instant; real-time is fast but not the discounted, deadline-tolerant option. If the stem says
                  &quot;overnight&quot; or gives you a multi-hour deadline with no live user, that is the Batches
                  signal.
                </Callout>

                <H3>How to use this for exam day</H3>
                <P>
                  Only <strong>4 of these 6 scenarios</strong> appear in any single sitting, drawn at random — you
                  will not know which four until you are in the exam. That means every scenario above earns its place
                  in your prep; skipping one because it &quot;seems less likely&quot; is a bet with no upside and a
                  real downside.
                </P>
                <ExamDrawDiagram />
                <P>
                  What you gain from studying all six is speed, not just coverage: the moment you recognise which
                  scenario a question stem belongs to, you already know which domain&apos;s concepts and which
                  anti-patterns are the likely trap — often before you have finished reading the four options.
                </P>
              </Sec>

              <CheckpointQuiz title="Checkpoint quiz — Exam Scenarios" questions={QUIZ} />

              <div className="mt-5 flex flex-wrap gap-3">
                <Link
                  href={`${CCAF_BASE}/anti-patterns`}
                  className="glow-brand inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-brand to-cyan px-5 py-3 text-base font-semibold text-white transition hover:brightness-110"
                >
                  Next: The 7 anti-patterns
                </Link>
                <Link
                  href={CCAF_BASE}
                  className="inline-flex items-center justify-center rounded-xl border border-line bg-panel px-5 py-3 text-base font-semibold text-fg shadow-sm transition hover:border-line-strong hover:bg-surface"
                >
                  Back to course home
                </Link>
              </div>

              <p className="mt-6 text-xs leading-5 text-muted">
                Unofficial study resource — not affiliated with, endorsed by, or sponsored by Anthropic.
              </p>
            </main>
          </div>
        </Container>
      </section>
    </>
  );
}
