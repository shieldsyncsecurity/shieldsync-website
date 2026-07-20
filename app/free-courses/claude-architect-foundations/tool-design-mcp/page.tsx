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
import { MCPPrimitivesDiagram, ToolSelectionDiagram, MCPTransportDiagram } from "@/components/course-diagrams-mcp";

const LESSON_URL = `${SITE.url}${CCAF_BASE}/tool-design-mcp`;

export const metadata: Metadata = {
  title: "Tool Design & MCP Integration — CCA-F Domain 2 (18%) Free Lesson",
  description:
    "Free CCA-F Domain 2 lesson: why tool descriptions decide selection accuracy, MCP's three primitives (tools, resources, prompts), before/after tool description design, structured MCP tool errors, .mcp.json configuration and transports, and per-agent tool scoping — with animated diagrams and an exam-style quiz.",
  keywords: [
    "mcp exam questions",
    "claude tool description design",
    "model context protocol certification",
    "mcp primitives tools resources prompts",
    "mcp.json configuration",
    "claude code subagent tool scoping",
    "cca-f domain 2",
    "mcp server transports stdio sse",
  ],
  alternates: { canonical: `${CCAF_BASE}/tool-design-mcp` },
  openGraph: {
    title: "Tool Design & MCP Integration — CCA-F Domain 2 (18%)",
    description:
      "MCP's three primitives, tool description design, structured tool errors, .mcp.json and transports, and per-agent tool scoping — taught with animated diagrams.",
    url: LESSON_URL,
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tool Design & MCP Integration — CCA-F Domain 2 (18%)",
    description:
      "MCP's three primitives, tool description design, structured tool errors, .mcp.json and transports, and per-agent tool scoping — with animated diagrams and an exam-style quiz.",
  },
};

const PAGE_SCHEMA = [
  webPageSchema({
    url: LESSON_URL,
    name: "Tool Design & MCP Integration — CCA-F Domain 2",
    description:
      "Free lesson covering CCA-F Domain 2 (18% of the exam): why tool design is its own domain, MCP's three primitives, tool description design, structured tool errors, .mcp.json and transports, and per-agent tool scoping.",
  }),
  breadcrumbSchema(LESSON_URL, [
    { name: "Home", url: SITE.url },
    { name: "Free Courses", url: `${SITE.url}/free-courses` },
    { name: "CCA-F Prep Course", url: `${SITE.url}${CCAF_BASE}` },
    { name: "Domain 2: Tool Design & MCP", url: LESSON_URL },
  ]),
];

const TOC: TocItem[] = [
  { id: "s1", label: "2.1 Why tool design is its own domain", progressId: "d2-s1" },
  { id: "s2", label: "2.2 MCP's three primitives", progressId: "d2-s2" },
  { id: "s3", label: "2.3 Tool descriptions drive selection", progressId: "d2-s3" },
  { id: "s4", label: "2.4 Structured, actionable tool errors", progressId: "d2-s4" },
  { id: "s5", label: "2.5 Configuring MCP servers", progressId: "d2-s5" },
  { id: "s6", label: "2.6 Tool scoping per agent role", progressId: "d2-s6" },
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
    id: "d2-q1",
    scenario: "Developer Productivity",
    question:
      "Your team's MCP server exposes search_docs (\"Searches documentation.\") and search_code (\"Searches the codebase.\"). Claude keeps calling the wrong one for questions like \"where is refund logic implemented?\" What is the architecturally correct fix?",
    options: [
      "Merge both tools into a single generic \"search\" tool so there is nothing to choose between",
      "Add a reminder near the top of the system prompt telling Claude which tool to use for code questions",
      "Rewrite each tool's description to state precisely what it covers and explicitly say what NOT to use it for",
      "Give Claude read access to both tools' server-side implementation so it can inspect what they actually do",
    ],
    answer: 2,
    explanation:
      "The description field is the only signal Claude has about when to call a tool — it never reads your implementation, which rules out D. Merging into one tool (A) just relocates the ambiguity inside a single tool's argument handling instead of removing it. A system-prompt reminder (B) is the same anti-pattern as prompt-based rule enforcement: it raises compliance probability but doesn't fix the root ambiguity, and it stops scaling the moment a third overlapping tool is added.",
  },
  {
    id: "d2-q2",
    scenario: "Multi-Agent Research System",
    question:
      "A research subagent needs the full text of one specific archived report to ground its summary. The MCP server exposes that report as a Resource, not a Tool. What should the architecture do?",
    options: [
      "Have the model emit a tool_use-style call directly against the resource, since both come from the same MCP server",
      "Have the host application read the resource and attach its content to the subagent's context before it starts reasoning",
      "Convert the resource into a new tool named get_report so the model must explicitly invoke it as tool_use",
      "Skip the resource and have the subagent re-derive the report's contents from other tool calls",
    ],
    answer: 1,
    explanation:
      "Resources are application-controlled: the host decides what data gets attached to context, and the model does not invoke them the way it invokes tools — option A confuses the two primitive types, a distinction the exam tests directly. C technically works but adds an unnecessary tool_use round trip for data the host already knows it needs, which is over-engineering the simplest pattern. D wastes calls reconstructing data that already exists in a resource meant for exactly this purpose.",
  },
  {
    id: "d2-q3",
    scenario: "Customer Support Resolution Agent",
    question: "A refund-processing MCP tool fails because the target ticket is archived. Which tool result is architecturally correct to return to the model?",
    options: [
      "The raw exception traceback plus the underlying HTTP 409 status code, so the model has the fullest detail available",
      "An empty successful result, so the conversation continues without alarming the customer",
      "Content stating the error category (e.g. TICKET_ARCHIVED), that it is not retryable, and the suggested next tool (reopen_ticket)",
      "No tool_result at all — drop the call silently and let the agent infer what happened from the rest of the conversation",
    ],
    answer: 2,
    explanation:
      "This is the same is_error handling principle from Domain 1, applied at the MCP server boundary: category + retryability + next action turns a failure into something the model can reason about. A hands Claude an opaque signal it cannot act on — a stack trace or bare status code is not meaningfully better than no error at all. B is silent failure and will produce a hallucinated success. D is the same failure as B, just framed as a missing response instead of a fake one.",
  },
  {
    id: "d2-q4",
    scenario: "Claude Code in CI/CD",
    question:
      "You're committing a shared .mcp.json for a CI pipeline. One remote MCP server requires a private API key. What should the committed file contain for that key?",
    options: [
      "The literal API key value, so the CI runner needs no additional secret configuration",
      "A reference such as \"Authorization\": \"Bearer ${DOCS_MCP_TOKEN}\" that reads the secret from an environment variable at runtime",
      "No entry for that server at all, so the key never has to be considered",
      "The API key, base64-encoded inline in the config, since encoding keeps it out of plain view",
    ],
    answer: 1,
    explanation:
      ".mcp.json is meant to be checked into version control so a team or pipeline shares the same MCP server set — but that only holds up if secrets stay out of it via environment-variable references, resolved at runtime. A commits a live credential into source history, retrievable indefinitely even after rotation. D is security theater: base64 is encoding, not encryption, and is trivially reversible. C just breaks the pipeline instead of fixing the config.",
  },
  {
    id: "d2-q5",
    scenario: "Code Generation with Claude Code",
    question:
      "Both a test-execution MCP tool and a deploy MCP tool are declared in the project's .mcp.json. A test-runner subagent's job during code generation is only to run tests and report failures. How should its tool access be scoped?",
    options: [
      "Give the subagent access to every tool in .mcp.json, in case restricting tools causes it to fail on some edge case",
      "List only the test-execution tool in the subagent's own tool allowlist, leaving the deploy tool out even though it exists in .mcp.json",
      "Rely on the subagent's system prompt instructing it to never call the deploy tool",
      "Remove the deploy tool from .mcp.json entirely so that no agent anywhere in the project can ever use it",
    ],
    answer: 1,
    explanation:
      "Tool scoping happens at the agent/session level, not just the server level — the same anti-pattern as Domain 1's unrestricted tool access, applied to MCP. .mcp.json can list every server the project uses while each subagent's own allowlist restricts which of those tools it can actually call. A hands a tool with a real, irreversible side effect to an agent with no legitimate reason to use it. C is prompt-based enforcement of a rule that should be structural. D breaks deploy access for every other role that legitimately needs it, just to fix one subagent's scope.",
  },
];

/* ---- page -------------------------------------------------------------------- */

export default function ToolDesignMCPLesson() {
  return (
    <>
      <SchemaOrg schema={PAGE_SCHEMA} />
      <section className="relative isolate overflow-hidden border-b border-line">
        <div className="aurora absolute inset-0 -z-10" />
        <Container className="py-5 sm:py-7">
          <span className="inline-flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-bright">
            <span className="h-1 w-1 rounded-full bg-brand" />
            Lesson 2 · Domain 2 · 18% of the exam
          </span>
          <h1 className="mt-2 text-2xl font-bold leading-[1.15] tracking-tight text-fg sm:text-3xl lg:text-4xl">
            Tool Design &amp; MCP Integration
          </h1>
          <p className="mt-2 max-w-3xl text-[15px] leading-7 text-muted">
            Everything Domain 2 tests: why tool descriptions — not implementations — decide whether Claude picks the
            right tool, the Model Context Protocol&apos;s three primitives, structured MCP tool errors, <Code>.mcp.json</Code>{" "}
            configuration and transports, and scoping tool access per agent role. Every concept comes with the real
            schema, config, or error shape the exam expects you to recognise.
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
              <Sec id="s1" pid="d2-s1" title="2.1 Why tool design is its own domain" blueprint='"tool design principles"'>
                <P>
                  Domain 1 is about how an agent orchestrates itself. Domain 2 is about something narrower and, on the
                  exam, easy to underestimate: <strong>how Claude decides which tool to call</strong>. The exam&apos;s
                  core thesis for this domain is simple to state and easy to forget under time pressure:
                </P>
                <Callout tone="exam" title="Domain 2's central thesis">
                  Claude&apos;s tool selection accuracy depends almost entirely on how tools are <em>described</em>,
                  not on how they are implemented. A tool that works perfectly on the backend can still be chosen{" "}
                  <strong>incorrectly</strong> if its description is ambiguous or overlaps another tool&apos;s
                  description — the model never sees your code, only the <Code>description</Code> string.
                </Callout>
                <P>
                  That reframes a whole category of exam questions. A stem that describes a bug where &quot;the wrong
                  tool gets called&quot; is very rarely testing your knowledge of the tool&apos;s internals — it is
                  testing whether you will reach for the description field first. Distractors that propose fixing the
                  backend, adding retries, or upgrading the model are all answering a question that was not asked.
                </P>
                <P>
                  The rest of this lesson builds outward from that thesis: what MCP actually gives you to describe
                  (2.2), how to write descriptions that disambiguate (2.3), how to fail loudly and usefully at the
                  protocol boundary (2.4), how servers get wired into a project (2.5), and how access itself — not
                  just description quality — has to be scoped per agent (2.6).
                </P>
              </Sec>

              <Sec id="s2" pid="d2-s2" title="2.2 MCP's three primitives" blueprint='"MCP primitives: tools, resources, prompts"'>
                <P>
                  The Model Context Protocol (MCP) standardises how an application connects Claude to external
                  capabilities and data. A server can expose exactly three kinds of primitive, and the exam expects
                  you to know not just their names but <strong>who is in control of each one</strong>:
                </P>
                <div className="mt-3 overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr>
                        <th className={TH}>Primitive</th>
                        <th className={TH}>Who invokes it</th>
                        <th className={TH}>What it's for</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className={`${TD} font-semibold`}>Tools</td>
                        <td className={TD}>The model — Claude decides when to call one, exactly like Claude API <Code>tool_use</Code></td>
                        <td className={TD}>Actions and lookups: run a query, create a ticket, send a message</td>
                      </tr>
                      <tr>
                        <td className={`${TD} font-semibold`}>Resources</td>
                        <td className={TD}>The host application — not invoked by the model directly</td>
                        <td className={TD}>Data the client can read and attach to context: a file, a database record, a log</td>
                      </tr>
                      <tr>
                        <td className={`${TD} font-semibold`}>Prompts</td>
                        <td className={TD}>The user — explicitly selected, like a slash command</td>
                        <td className={TD}>Templated instructions a server exposes for the user to invoke on demand</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <MCPPrimitivesDiagram />
                <H3>Illustrative server manifest — one of each primitive</H3>
                <P>
                  MCP servers don&apos;t all expose their capabilities in exactly this JSON shape — this is a
                  simplified, illustrative structure to show the three primitive types side by side, not a literal SDK
                  dump:
                </P>
                <CodeBlock>{`{
  "tools": [
    {
      "name": "create_ticket",
      "description": "Create a new support ticket for a customer issue. Use when a new problem is reported that has no existing ticket.",
      "input_schema": { "type": "object", "properties": { "summary": {"type":"string"} } }
    }
  ],
  "resources": [
    {
      "uri": "ticket://{id}",
      "name": "Ticket record",
      "description": "A single support ticket's full history. The host app decides when to attach one to context - the model cannot fetch it directly."
    }
  ],
  "prompts": [
    {
      "name": "summarize_ticket",
      "description": "Template a user can select to summarize a ticket thread.",
      "arguments": [{ "name": "ticket_id", "required": true }]
    }
  ]
}`}</CodeBlock>
                <Callout tone="trap" title="Classic distractor">
                  A question describes a server that only needs to hand Claude read-only reference data (a policy
                  document, a schema) and asks how to expose it. &quot;Add it as a tool&quot; is the planted answer;
                  the correct primitive is a <strong>Resource</strong> — nothing about that data requires the model to
                  decide when to fetch it.
                </Callout>
              </Sec>

              <Sec id="s3" pid="d2-s3" title="2.3 Tool descriptions drive selection" blueprint='"tool description quality & selection accuracy"'>
                <P>
                  The <Code>description</Code> field of a tool schema is the <strong>only</strong> signal Claude has
                  about when to use it. It cannot read your implementation code, your tests, or your internal docs —
                  if the description is vague or overlaps another tool&apos;s description, misselection is not a bug
                  in Claude, it is a bug in your tool design.
                </P>
                <H3>Before: vague, overlapping descriptions</H3>
                <CodeBlock>{`{ "name": "search_docs", "description": "Searches documentation.",
  "input_schema": { "type": "object", "properties": { "query": {"type":"string"} } } }

{ "name": "search_code", "description": "Searches the codebase.",
  "input_schema": { "type": "object", "properties": { "query": {"type":"string"} } } }`}</CodeBlock>
                <P>
                  Both descriptions are technically true and neither says what the tool is <em>not</em> for. Ask
                  &quot;where is the refund logic implemented?&quot; and Claude has no textual signal telling it that
                  &quot;implemented&quot; means source code, not prose — it may call either tool, or the wrong one
                  first.
                </P>
                <H3>After: precise scope, plus explicit exclusions</H3>
                <CodeBlock>{`{
  "name": "search_docs",
  "description": "Full-text search over markdown documentation in docs/. Use when the user asks how something is documented, explained, or described in prose. Do NOT use for locating function or class definitions - use search_code for that.",
  "input_schema": { "type": "object", "properties": { "query": {"type":"string"} }, "required": ["query"] }
}

{
  "name": "search_code",
  "description": "Full-text search over source files (*.py, *.ts, *.go) for function names, class names, and code identifiers. Use when the user asks where something is implemented or defined. Do NOT use for documentation or prose questions - use search_docs for that.",
  "input_schema": { "type": "object", "properties": { "query": {"type":"string"} }, "required": ["query"] }
}`}</CodeBlock>
                <ToolSelectionDiagram />
                <P>
                  Two moves did the disambiguating work: stating precisely <em>when</em> each tool applies, and
                  stating explicitly what to use <em>instead</em> when it doesn&apos;t. &quot;Do NOT use for X&quot; is
                  not defensive filler — for two tools whose surface behaviour looks similar, it is often the only
                  line separating a clean selection from a coin flip.
                </P>
                <Callout tone="trap" title="Classic distractor">
                  &quot;The wrong tool keeps getting called — upgrade to a stronger model.&quot; A stronger model
                  narrows the gap but doesn&apos;t remove an ambiguity that lives in the schema, not the model. The
                  exam&apos;s correct answer is almost always to fix the description.
                </Callout>
              </Sec>

              <Sec id="s4" pid="d2-s4" title="2.4 Structured, actionable tool errors" blueprint='"structured tool error handling"'>
                <P>
                  Domain 1 taught that tool errors are data the model reasons over, not exceptions that crash the
                  loop — an error result needs a category, a retryability signal, and a suggested next step. That same
                  principle applies with equal force at the <strong>MCP server boundary</strong>: a well-designed MCP
                  tool never hands the model a raw stack trace or a bare HTTP status code.
                </P>
                <H3>Bad: opaque failure</H3>
                <CodeBlock>{`{
  "isError": true,
  "content": [{ "type": "text",
    "text": "Error: Traceback (most recent call last):\\n  File \\"server.py\\", line 88\\n  IntegrityError: FK constraint failed (code 409)" }]
}`}</CodeBlock>
                <P>
                  Claude cannot act on that. It doesn&apos;t know if the failure is transient, whether retrying is
                  safe, or what a customer-facing agent should tell the user in the meantime.
                </P>
                <H3>Good: structured, actionable failure</H3>
                <CodeBlock>{`{
  "isError": true,
  "content": [{ "type": "text",
    "text": "TICKET_ARCHIVED: Ticket #4471 is archived and cannot be updated directly. This is not retryable as-is. Suggested next step: call reopen_ticket first, or route this to close-notes if the customer only needs a status update." }]
}`}</CodeBlock>
                <P>
                  Notice the three ingredients: an <strong>error category</strong> (<Code>TICKET_ARCHIVED</Code>) the
                  model and your logs can both key off, an explicit <strong>retryable</strong> signal, and a{" "}
                  <strong>suggested next action or alternate tool</strong> (<Code>reopen_ticket</Code>). This is the
                  same <Code>is_error</Code> discipline from Domain 1&apos;s agentic loop — Domain 2 just asks you to
                  recognise it applies just as strongly when the tool sits behind an MCP server instead of being
                  called in-process.
                </P>
                <Callout tone="trap" title="Classic distractor">
                  &quot;Return the underlying HTTP status code so the client can branch on it.&quot; A status code
                  alone forces the model (or your code) to maintain a lookup table of meanings; a category plus a
                  suggested action is self-describing and survives the server changing its internals.
                </Callout>
              </Sec>

              <Sec id="s5" pid="d2-s5" title="2.5 Configuring MCP servers: .mcp.json and transports" blueprint='"MCP server configuration & transports"'>
                <P>
                  <Code>.mcp.json</Code> is the project-level configuration file listing the MCP servers that Claude
                  Code — or an Agent SDK application — connects to. Each entry is either a local server launched as a
                  subprocess, or a remote server reached over the network:
                </P>
                <CodeBlock>{`{
  "mcpServers": {
    "linear": {
      "command": "npx",
      "args": ["-y", "@example/mcp-server-linear"],
      "env": { "LINEAR_API_KEY": "\${LINEAR_API_KEY}" }
    },
    "shared-docs": {
      "url": "https://mcp.example.com/docs",
      "headers": { "Authorization": "Bearer \${DOCS_MCP_TOKEN}" }
    }
  }
}`}</CodeBlock>
                <P>The two entries above show the two transport mechanisms the exam expects you to tell apart:</P>
                <div className="mt-3 overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr>
                        <th className={TH}>Transport</th>
                        <th className={TH}>Shape in .mcp.json</th>
                        <th className={TH}>Typical use</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className={`${TD} font-semibold`}>stdio</td>
                        <td className={TD}><Code>command</Code> + <Code>args</Code> — spawns a local subprocess</td>
                        <td className={TD}>Local dev tools, most common for individual developer setups</td>
                      </tr>
                      <tr>
                        <td className={`${TD} font-semibold`}>Streamable HTTP / SSE</td>
                        <td className={TD}><Code>url</Code> — connects to a remote, network-reachable server</td>
                        <td className={TD}>Remote or shared servers, reachable by multiple clients at once</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <MCPTransportDiagram />
                <P>
                  <Code>.mcp.json</Code> is typically <strong>checked into version control</strong> so the whole team
                  or CI pipeline shares the same set of MCP servers — that is the point of the file. The corollary the
                  exam tests directly: personal API keys and other secrets must <strong>never</strong> be committed
                  inside it. Reference them as environment variables (<Code>{"${VAR_NAME}"}</Code>) resolved at
                  runtime, exactly as both entries above do, and keep the actual values in an untracked
                  <Code>.env</Code> or your CI secret store.
                </P>
                <Callout tone="trap" title="Classic distractor">
                  &quot;Commit the API key directly since .mcp.json is only used locally.&quot; The file being
                  version-controlled is exactly why a literal secret inside it is wrong — it lands in every clone and
                  the entire commit history, long after the key is rotated.
                </Callout>
              </Sec>

              <Sec id="s6" pid="d2-s6" title="2.6 Tool scoping per agent role" blueprint='"tool access scoping per agent"'>
                <P>
                  Domain 1&apos;s anti-pattern #6 — unrestricted tool access — reappears in Domain 2 with an MCP
                  twist: in a multi-agent or multi-MCP-server setup, <strong>each agent or subagent should only be
                  connected to the servers and tools it actually needs for its role</strong>. A read-only research
                  subagent has no legitimate reason to see a database-write MCP tool, even if that tool is available
                  somewhere in the project.
                </P>
                <P>
                  The key distinction the exam is testing: <Code>.mcp.json</Code> declares every server the{" "}
                  <em>project</em> uses. It does not follow that every <em>agent</em> in that project should have
                  every one of those tools available. Scoping happens one layer down, at the agent or session level:
                </P>
                <CodeBlock>{`# .claude/agents/test-runner.md
---
name: test-runner
description: Runs the test suite and reports failures. Use after code changes,
  never for deployment decisions.
tools: Bash, Read, mcp__test-execution__run_tests
---
You run the project's test suite and report failures as {file, test, error}.
You do not deploy, release, or modify infrastructure under any circumstance.`}</CodeBlock>
                <P>
                  Both a test-execution MCP tool and a deploy MCP tool can exist side by side in the project&apos;s{" "}
                  <Code>.mcp.json</Code>. The test-runner subagent&apos;s own <Code>tools</Code> allowlist names only{" "}
                  <Code>mcp__test-execution__run_tests</Code> — the deploy tool is never listed, so this subagent
                  cannot invoke it even if it &quot;discovers&quot; the server is technically reachable. Scoping is a
                  property of the agent definition, not of what the project has wired up.
                </P>
                <Callout tone="exam" title="How the exam asks this">
                  &quot;A test-runner subagent and a deploy subagent both exist in a CI pipeline. Both MCP servers are
                  declared in .mcp.json. How should the test-runner's access be restricted?&quot; — the correct answer
                  scopes the allowlist on the subagent itself, not on removing the deploy server from the project or
                  trusting a prompt instruction to hold the line.
                </Callout>
              </Sec>

              <CheckpointQuiz title="Checkpoint quiz — Domain 2" questions={QUIZ} />

              <div className="mt-5 flex flex-wrap gap-3">
                <Link
                  href={`${CCAF_BASE}/claude-code-workflows`}
                  className="glow-brand inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-brand to-cyan px-5 py-3 text-base font-semibold text-white transition hover:brightness-110"
                >
                  Next: Domain 3
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
