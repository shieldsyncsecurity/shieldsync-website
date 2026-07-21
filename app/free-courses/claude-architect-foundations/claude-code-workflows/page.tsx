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
  ClaudeMdHierarchyDiagram,
  PlanVsDirectDiagram,
  HeadlessCiDiagram,
} from "@/components/course-diagrams-claudecode";

const LESSON_URL = `${SITE.url}${CCAF_BASE}/claude-code-workflows`;

export const metadata: Metadata = {
  title: "Claude Code Configuration & Workflows — CCA-F Domain 3 (20%) Free Lesson",
  description:
    "Free CCA-F Domain 3 lesson: the CLAUDE.md hierarchy (user vs project), .claude/rules/ path-scoped instructions, skills and slash commands with allowed-tools vs disallowed-tools scoping, plan mode vs direct execution, and headless -p mode for CI/CD — with animated diagrams and an exam-style quiz.",
  keywords: [
    "claude code claude.md",
    "claude code ci cd",
    "claude code headless mode",
    "claude code plan mode",
    "cca-f domain 3",
    "claude code rules paths",
    "claude code slash commands",
    "claude agent skills disallowed-tools",
  ],
  alternates: { canonical: `${CCAF_BASE}/claude-code-workflows` },
  openGraph: {
    title: "Claude Code Configuration & Workflows — CCA-F Domain 3 (20%)",
    description:
      "CLAUDE.md hierarchy, path-scoped rules, skills and slash commands, plan mode vs direct execution, and headless CI/CD invocation — taught with animated diagrams.",
    url: LESSON_URL,
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Claude Code Configuration & Workflows — CCA-F Domain 3 (20%)",
    description:
      "CLAUDE.md hierarchy, path-scoped rules, skills and slash commands, plan mode vs direct execution, and headless CI/CD — with animated diagrams and an exam-style quiz.",
  },
};

const PAGE_SCHEMA = [
  webPageSchema({
    url: LESSON_URL,
    name: "Claude Code Configuration & Workflows — CCA-F Domain 3",
    description:
      "Free lesson covering CCA-F Domain 3 (20% of the exam): the CLAUDE.md hierarchy, .claude/rules/ with glob scoping, skills and slash commands, plan mode vs direct execution, and headless -p mode for CI/CD.",
  }),
  breadcrumbSchema(LESSON_URL, [
    { name: "Home", url: SITE.url },
    { name: "Free Courses", url: `${SITE.url}/free-courses` },
    { name: "CCA-F Prep Course", url: `${SITE.url}${CCAF_BASE}` },
    { name: "Domain 3: Claude Code Configuration", url: LESSON_URL },
  ]),
];

const TOC: TocItem[] = [
  { id: "s1", label: "3.1 CLAUDE.md hierarchy", progressId: "d3-s1" },
  { id: "s2", label: "3.2 .claude/rules/ scoping", progressId: "d3-s2" },
  { id: "s3", label: "3.3 Skills & slash commands", progressId: "d3-s3" },
  { id: "s4", label: "3.4 Plan mode vs direct execution", progressId: "d3-s4" },
  { id: "s5", label: "3.5 Headless mode for CI/CD", progressId: "d3-s5" },
  { id: "s6", label: "3.6 Choosing the right invocation shape", progressId: "d3-s6" },
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
    id: "d3-q1",
    scenario: "Code Generation with Claude Code",
    question:
      "A team of eight engineers wants every contributor's Claude Code session to know the repo's testing commands and architecture notes, checked into source control so reviewers see changes to it in PRs. Where should this content live?",
    options: [
      "Project-level CLAUDE.md at the repo root",
      "Each engineer's own ~/.claude/CLAUDE.md",
      "A comment at the top of the main entry-point file",
      "A pinned Slack message linked from the README",
    ],
    answer: 0,
    explanation:
      "Shared, version-controlled team context is exactly what project-level CLAUDE.md is for — it lives in the repo, ships in PRs, and every contributor's session loads it. B is the anti-pattern of putting team-wide standards somewhere personal and invisible to reviewers; C overloads source code with agent instructions no linter or reviewer expects; D is outside version control entirely and will drift from the codebase.",
  },
  {
    id: "d3-q2",
    scenario: "Developer Productivity",
    question:
      "One engineer always wants Claude to prefer functional React components and avoid default exports, across every repo they touch — nobody else on the team shares this preference. Where does this belong?",
    options: [
      "That engineer's user-level ~/.claude/CLAUDE.md",
      "Project-level CLAUDE.md, since it is a coding standard",
      "A .claude/rules/ file with paths matching every .tsx file",
      "An Agent Skill invoked manually before each coding session",
    ],
    answer: 0,
    explanation:
      "A personal preference that should follow one person across all their projects is precisely the user-level CLAUDE.md's job. B wrongly pushes a personal preference into shared team config other engineers didn't agree to. C is a heavier mechanism than needed and would also affect teammates working in the same repo. D requires manual invocation for something that should just always be true for that engineer.",
  },
  {
    id: "d3-q3",
    scenario: "Code Generation with Claude Code",
    question:
      "The team wants Claude to always reuse helpers from fixtures/ when editing test files, but this instruction is irrelevant noise when Claude is editing anything else in the repo. What is the architecturally correct way to encode this?",
    options: [
      "Add it to project CLAUDE.md so it is always visible",
      "A .claude/rules/ file with paths: [\"**/*.test.ts\"] containing the instruction",
      "Repeat the instruction at the start of every prompt to Claude",
      "Rename fixtures/ so its purpose is self-evident from the path",
    ],
    answer: 1,
    explanation:
      "A path-scoped rules file only loads the instruction when Claude is actually working with matching files — precise targeting instead of blanket noise. A pollutes every session's context with an instruction irrelevant most of the time (and CLAUDE.md has no glob scoping). C is manual, easy to forget, and doesn't scale. D is a naming fix, not an instruction-delivery mechanism, and does nothing to guarantee the behavior.",
  },
  {
    id: "d3-q4",
    scenario: "Claude Code in CI/CD",
    question:
      "A security-conscious team builds a custom Agent Skill that reviews dependency-update PRs. They want a frontmatter setting that guarantees the skill can never call Bash or Write while it is active — no matter what tools the parent session otherwise has permission to use. Which frontmatter field actually enforces that?",
    options: [
      "allowed-tools: Read, Grep, Glob",
      "disallowed-tools: Bash, Write",
      "context: fork only, relying on isolated context to imply restricted tools",
      "A description field warning the model not to use other tools",
    ],
    answer: 1,
    explanation:
      "disallowed-tools removes the named tools from the skill's available pool while it's active — that's the actual restriction mechanism, and the same principle as anti-pattern #6 (unrestricted tool access) from Domain 1, applied to skills. A is the exam's classic trap: allowed-tools only pre-approves the listed tools so they skip a permission prompt — it does not block anything else, so Bash and Write would still be callable. C isolates context, not tool access, and implies nothing about which tools remain available. D is prompt-based enforcement, a suggestion rather than a control.",
  },
  {
    id: "d3-q5",
    scenario: "Claude Code in CI/CD",
    question:
      "A CI pipeline needs Claude Code to review each PR's diff and post structured findings a bot can parse and turn into inline comments, running unattended on a shared runner shared across many concurrent PRs. Which invocation is correct?",
    options: [
      "Interactive claude session on the runner, piping the diff into stdin",
      "claude -p \"review this diff for security issues\" --output-format json, one fresh session per PR, scoped to just the diff",
      "claude -p with default text output, parsed downstream with regular expressions",
      "One long-lived claude session shared across all PRs in the queue to save startup cost",
    ],
    answer: 1,
    explanation:
      "Headless -p plus a structured output format gives CI a reliable, machine-parseable result, and a fresh session per PR keeps one PR's review from leaking context into another's. A hangs waiting for a terminal that never responds on a runner. C throws away the structured envelope in favor of fragile regex parsing of free text. D reintroduces exactly the cross-PR context leakage session isolation is meant to prevent, and widens the blast radius of one bad review.",
  },
];

/* ---- page -------------------------------------------------------------------- */

export default function ClaudeCodeWorkflowsLesson() {
  return (
    <>
      <SchemaOrg schema={PAGE_SCHEMA} />
      <section className="relative isolate overflow-hidden border-b border-line">
        <div className="aurora absolute inset-0 -z-10" />
        <Container className="py-5 sm:py-7">
          <span className="inline-flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-bright">
            <span className="h-1 w-1 rounded-full bg-brand" />
            Lesson 3 · Domain 3 · 20% of the exam
          </span>
          <h1 className="mt-2 text-2xl font-bold leading-[1.15] tracking-tight text-fg sm:text-3xl lg:text-4xl">
            Claude Code Configuration &amp; Workflows
          </h1>
          <p className="mt-2 max-w-3xl text-[15px] leading-7 text-muted">
            Everything Domain 3 tests: the <Code>CLAUDE.md</Code> hierarchy, path-scoped rules under{" "}
            <Code>.claude/rules/</Code>, skills and slash commands with real tool-scoping, when to use plan mode versus
            direct execution, and headless <Code>-p</Code> invocation for CI/CD. This is the &quot;Code Generation
            with Claude Code&quot; and &quot;Claude Code in CI/CD&quot; scenarios, made concrete.
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
              <Sec id="s1" pid="d3-s1" title="3.1 CLAUDE.md hierarchy: project vs user" blueprint='"CLAUDE.md configuration hierarchy"'>
                <P>
                  Claude Code reads project context from a file named <Code>CLAUDE.md</Code>, and it exists at two
                  levels that the exam expects you to tell apart on sight:
                </P>
                <div className="mt-3 overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr>
                        <th className={TH}></th>
                        <th className={TH}>Project-level CLAUDE.md</th>
                        <th className={TH}>User-level ~/.claude/CLAUDE.md</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className={`${TD} font-semibold`}>Location</td>
                        <td className={TD}>At the repo root, alongside the code</td>
                        <td className={TD}>In the user&apos;s home directory, outside any repo</td>
                      </tr>
                      <tr>
                        <td className={`${TD} font-semibold`}>Scope</td>
                        <td className={TD}>Every contributor working in this repo</td>
                        <td className={TD}>Only this person, across every repo they touch</td>
                      </tr>
                      <tr>
                        <td className={`${TD} font-semibold`}>Version control</td>
                        <td className={TD}>Committed — reviewers see changes to it in PRs</td>
                        <td className={TD}>Not committed, not shared</td>
                      </tr>
                      <tr>
                        <td className={`${TD} font-semibold`}>Typical content</td>
                        <td className={TD}>Coding standards, architecture notes, build/test commands, protected paths</td>
                        <td className={TD}>Personal formatting preferences, preferred verbosity, personal shortcuts</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <ClaudeMdHierarchyDiagram />
                <P>
                  Both files load into the same Claude Code session and their content is simply concatenated into
                  context — there is no override semantics to memorise, just &quot;shared team standard&quot; goes in
                  the repo, &quot;my personal preference&quot; goes in the home directory. CLAUDE.md also supports an{" "}
                  <Code>@path/to/file</Code> import syntax, letting a short CLAUDE.md pull in longer reference
                  documents without bloating the file itself:
                </P>
                <CodeBlock>{`# CLAUDE.md (repo root)

## Commands
- Build: npm run build
- Test: npm test
- Lint: npm run lint

## Architecture
See @docs/architecture.md for the service boundaries and data flow.
Never edit generated files under src/generated/.

## Style
Prefer named exports. Match existing test structure in fixtures/.`}</CodeBlock>
                <Callout tone="exam" title="How the exam asks this">
                  &quot;A solo developer wants Claude to always answer in a terser style across every project they
                  work on.&quot; That is a personal preference with no team scope — the answer is user-level{" "}
                  <Code>~/.claude/CLAUDE.md</Code>, not the project file. Flip the stem to &quot;the whole team must
                  follow this build command&quot; and the answer flips to project-level.
                </Callout>
              </Sec>

              <Sec id="s2" pid="d3-s2" title="3.2 .claude/rules/ — path-scoped instructions" blueprint='"path-scoped rules and glob targeting"'>
                <P>
                  CLAUDE.md is blanket context — it loads into every session regardless of what Claude happens to be
                  touching. When an instruction only matters for a subset of files, a blanket instruction is noise the
                  rest of the time. <Code>.claude/rules/</Code> solves this: each rule is a Markdown file with YAML
                  frontmatter specifying a <Code>paths</Code> field (glob patterns, e.g. <Code>src/api/**/*.ts</Code>),
                  and the instruction body only loads into context when Claude is working with a matching file. A rule
                  with no <Code>paths</Code> field loads unconditionally, same as CLAUDE.md.
                </P>
                <CodeBlock>{`# .claude/rules/test-fixtures.md
---
paths:
  - "**/*.test.ts"
---
When editing or adding test files, always reuse the existing helpers in
fixtures/ (buildUser, buildOrder, mockClock) instead of constructing test
data inline. If a fixture you need doesn't exist yet, add it to
fixtures/ rather than duplicating setup logic in the test file.`}</CodeBlock>
                <P>
                  This rule is invisible to Claude while it is editing <Code>src/api/orders.ts</Code>, and loads
                  automatically the moment Claude opens or edits anything matching <Code>**/*.test.ts</Code>. That
                  precision is the entire value proposition over a CLAUDE.md instruction: scope the instruction to
                  where it is relevant, not to every session.
                </P>
                <Callout tone="exam" title="How the exam asks this">
                  A requirement phrased as &quot;only when editing X kind of file, Claude should Y&quot; is a{" "}
                  <Code>.claude/rules/</Code> question with a <Code>paths</Code> answer. A requirement phrased as
                  &quot;in this repo, Claude should always Y&quot; (no file-type qualifier) points back to CLAUDE.md
                  instead.
                </Callout>
              </Sec>

              <Sec id="s3" pid="d3-s3" title="3.3 Skills and slash commands" blueprint='"custom slash commands and Agent Skills"'>
                <P>
                  Two related but distinct customization mechanisms live under <Code>.claude/</Code>, and the exam
                  tests telling them apart:
                </P>
                <H3>Slash commands — .claude/commands/*.md</H3>
                <P>
                  A custom slash command is a Markdown file under <Code>.claude/commands/</Code>, invoked explicitly
                  by name as <Code>/command-name</Code>. It can take arguments via <Code>$ARGUMENTS</Code>, making it
                  a reusable, parameterised prompt template a developer triggers on demand — nothing loads unless
                  someone types the command.
                </P>
                <CodeBlock>{`# .claude/commands/fix-issue.md
Fetch GitHub issue $ARGUMENTS, understand the bug it describes, locate
the relevant code, and propose a fix. Do not open a PR — stop after
presenting the diff for review.`}</CodeBlock>
                <H3>Agent Skills — packaged instructions Claude loads when relevant</H3>
                <P>
                  A Skill is not manually invoked by name — Claude decides to load it when its description matches
                  what the current task needs. Skill frontmatter carries three fields the exam likes to test against
                  each other, because two of them sound like the same thing and are not: <Code>context: fork</Code>{" "}
                  runs the skill in an isolated context (the same context-isolation idea as subagents in Domain 1,
                  applied to a skill); <Code>allowed-tools</Code> <strong>pre-approves</strong> the listed tools so
                  Claude can call them during that turn without a permission prompt — it does <strong>not</strong>{" "}
                  restrict anything else, every other tool the session is permitted to use remains callable, just with
                  its normal prompt; <Code>disallowed-tools</Code> is the field that actually removes tools from the
                  skill&apos;s available pool while it is active — that is the real restriction mechanism.
                </P>
                <CodeBlock>{`# .claude/skills/dependency-audit/SKILL.md
---
name: dependency-audit
description: Reviews dependency-update PRs for supply-chain risk —
  new transitive deps, license changes, suspicious postinstall scripts.
  Use when a PR modifies package.json or a lockfile.
context: fork
disallowed-tools: Bash, Write, Edit
---
Examine the diff to package.json and the lockfile. Flag new
dependencies, license changes, and any postinstall/prepare script
additions. You have no write access — report findings only.`}</CodeBlock>
                <P>
                  <Code>disallowed-tools</Code> is the real, declarative security boundary — it ties directly back to
                  Domain 1&apos;s anti-pattern #6 (unrestricted tool access): a skill built to review code has no
                  business holding Bash or Write, regardless of what the parent session is permitted to do.{" "}
                  <Code>allowed-tools</Code> solves a different problem entirely (skipping approval friction for tools
                  you already trust the skill to use) and confusing the two is a genuine, exam-tested trap.
                </P>
                <Callout tone="trap" title="Distractor pattern">
                  &quot;Set <Code>allowed-tools: Read, Grep, Glob</Code> so the skill can&apos;t touch Bash or
                  Write.&quot; This is the exam&apos;s favourite Domain 3 trap: <Code>allowed-tools</Code> only
                  pre-approves what&apos;s listed, it does not remove anything else from the pool — Bash and Write
                  would still be callable (just subject to a normal permission prompt). Real restriction is{" "}
                  <Code>disallowed-tools</Code>. A description-field warning is a separate, weaker trap: that&apos;s
                  prompt-based enforcement, the anti-pattern this feature exists to avoid.
                </Callout>
              </Sec>

              <Sec id="s4" pid="d3-s4" title="3.4 Plan mode vs direct execution" blueprint='"plan mode vs direct execution judgment"'>
                <P>
                  Claude Code can work two ways: <strong>plan mode</strong>, where Claude proposes an approach and
                  gets it explicitly approved before touching any files, or <strong>direct execution</strong>, where
                  it goes straight to editing. Neither is universally correct — the exam rewards matching the mode to
                  the task&apos;s blast radius and ambiguity.
                </P>
                <PlanVsDirectDiagram />
                <div className="mt-3 overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr>
                        <th className={TH}></th>
                        <th className={TH}>Direct execution</th>
                        <th className={TH}>Plan mode</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className={`${TD} font-semibold`}>Best when</td>
                        <td className={TD}>Small, well-defined, low-risk change — a typo fix, a one-line config tweak, an isolated bug with an obvious cause</td>
                        <td className={TD}>Larger, higher-risk, or ambiguous change — a multi-file refactor, a schema migration, anything touching auth or billing</td>
                      </tr>
                      <tr>
                        <td className={`${TD} font-semibold`}>Overhead if misapplied</td>
                        <td className={TD}>Using it for a large ambiguous change risks an unreviewed mistake across many files</td>
                        <td className={TD}>Using it for a trivial one-line fix is pure ceremony — a review step with nothing meaningful to review</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <Callout tone="exam" title="How the exam asks this">
                  The trap is a stem that pushes you toward &quot;always plan first, it&apos;s safer&quot; or
                  &quot;always execute directly, it&apos;s faster.&quot; Both absolutes are wrong answers. The correct
                  reasoning names the specific blast radius and ambiguity of the task in the stem and picks the mode
                  that matches it.
                </Callout>
              </Sec>

              <Sec id="s5" pid="d3-s5" title="3.5 Headless mode for CI/CD" blueprint='"headless invocation, -p flag, structured output"'>
                <P>
                  Claude Code can run without any interactive terminal session at all, using the <Code>-p</Code>{" "}
                  (print) flag. This is what makes it usable inside CI/CD: a pipeline step invokes Claude, Claude does
                  its work and prints a result, and the process exits — no prompt is ever waiting on a human.
                </P>
                <CodeBlock>{`claude -p "review this diff for security issues" --output-format json`}</CodeBlock>
                <P>
                  Paired with <Code>--output-format json</Code> (or <Code>stream-json</Code> for incremental output),
                  the result comes back as a structured envelope instead of free-text stdout — conceptually
                  containing the <strong>result text</strong> Claude produced, <strong>cost</strong> information for
                  the run, and a <strong>session id</strong> identifying that invocation. A CI script parses this
                  envelope directly; it never needs to regex-scrape a paragraph of prose looking for a verdict.
                </P>
                <HeadlessCiDiagram />
                <P>
                  <strong>Session isolation</strong> matters just as much as the flags: each CI invocation — each PR,
                  each run — should start a fresh session in its own working directory. Reusing one long-lived session
                  across multiple PRs risks one PR&apos;s diff, findings, or conversation history leaking into
                  another&apos;s review.
                </P>
                <Callout tone="trap" title="Distractor pattern">
                  &quot;Run claude interactively on the CI runner and pipe the diff to it.&quot; Interactive mode
                  expects a terminal session; on a runner with no terminal, it either hangs until the job times out or
                  never receives the input it expects. Headless <Code>-p</Code> is the only shape built for
                  unattended execution.
                </Callout>
              </Sec>

              <Sec id="s6" pid="d3-s6" title="3.6 Choosing the right invocation shape for CI" blueprint='"CI/CD invocation shape synthesis"'>
                <P>
                  Put 3.5 together into the exam&apos;s favourite synthesis question: given a requirement like{" "}
                  <em>&quot;review PRs and post structured findings a bot can parse,&quot;</em> the correct combination
                  is always the same shape:
                </P>
                <ul className="mt-2 max-w-[74ch] list-disc space-y-1.5 pl-6 text-[15px] leading-7 text-slate-700">
                  <li>
                    <strong>Headless <Code>-p</Code></strong> — never interactive mode on a CI runner.
                  </li>
                  <li>
                    <strong><Code>--output-format json</Code> (or <Code>stream-json</Code>)</strong> — never the
                    default free-text output parsed downstream with regular expressions.
                  </li>
                  <li>
                    <strong>A fresh, isolated session per invocation</strong> — never one long-lived session shared
                    across unrelated PRs.
                  </li>
                </ul>
                <Callout tone="exam" title="Minimising false positives in automated review">
                  Scope the prompt tightly to the diff being reviewed — not the whole repository. A prompt that says
                  &quot;review this diff for security issues&quot; against just the changed hunks stays focused; a
                  prompt that says &quot;review this repository for security issues&quot; on every PR surfaces noisy,
                  unrelated findings that erode trust in the bot and get the check ignored. Narrow scope is itself a
                  false-positive control, not just a cost optimisation.
                </Callout>
              </Sec>

              <CheckpointQuiz title="Checkpoint quiz — Domain 3" questions={QUIZ} />

              <div className="mt-5 flex flex-wrap gap-3">
                <Link
                  href={`${CCAF_BASE}/prompt-engineering-structured-output`}
                  className="glow-brand inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-brand to-cyan px-5 py-3 text-base font-semibold text-white transition hover:brightness-110"
                >
                  Next: Domain 4
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
