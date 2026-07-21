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
  StructuredOutputDiagram,
  ValidationRetryLoopDiagram,
  BatchVsRealtimeDiagram,
} from "@/components/course-diagrams-prompting";

const LESSON_URL = `${SITE.url}${CCAF_BASE}/prompt-engineering-structured-output`;

export const metadata: Metadata = {
  title: "Prompt Engineering & Structured Output — CCA-F Domain 4 (20%) Free Lesson",
  description:
    "Free CCA-F Domain 4 lesson: explicit criteria vs vague prompts, few-shot examples, tool_use with JSON schemas for guaranteed structure, nullable fields against hallucination, validation-retry loops, multi-pass review, and the Message Batches API — with animated diagrams and an exam-style quiz.",
  keywords: [
    "claude structured output json schema",
    "claude tool_use extraction",
    "claude message batches api",
    "cca-f domain 4",
    "claude prompt engineering exam",
  ],
  alternates: { canonical: `${CCAF_BASE}/prompt-engineering-structured-output` },
  openGraph: {
    title: "Prompt Engineering & Structured Output — CCA-F Domain 4 (20%)",
    description:
      "Explicit criteria, few-shot design, tool_use schemas, nullable fields, validation-retry loops, and Batch vs real-time API selection — taught with animated diagrams.",
    url: LESSON_URL,
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Prompt Engineering & Structured Output — CCA-F Domain 4 (20%)",
    description:
      "Explicit criteria, few-shot design, tool_use schemas, nullable fields, validation-retry loops, and Batch vs real-time API selection — with animated diagrams and an exam-style quiz.",
  },
};

const PAGE_SCHEMA = [
  webPageSchema({
    url: LESSON_URL,
    name: "Prompt Engineering & Structured Output — CCA-F Domain 4",
    description:
      "Free lesson covering CCA-F Domain 4 (20% of the exam): explicit criteria vs vague prompts, few-shot examples, tool_use with JSON schemas, nullable fields, validation-retry loops, multi-pass review, and the Message Batches API.",
  }),
  breadcrumbSchema(LESSON_URL, [
    { name: "Home", url: SITE.url },
    { name: "Free Courses", url: `${SITE.url}/free-courses` },
    { name: "CCA-F Prep Course", url: `${SITE.url}${CCAF_BASE}` },
    { name: "Domain 4: Prompt Engineering", url: LESSON_URL },
  ]),
];

const TOC: TocItem[] = [
  { id: "s1", label: "4.1 Explicit criteria beat vague guidance", progressId: "d4-s1" },
  { id: "s2", label: "4.2 Few-shot examples", progressId: "d4-s2" },
  { id: "s3", label: "4.3 tool_use for guaranteed structure", progressId: "d4-s3" },
  { id: "s4", label: "4.4 Nullable fields prevent hallucination", progressId: "d4-s4" },
  { id: "s5", label: "4.5 Validation-retry loops & multi-pass review", progressId: "d4-s5" },
  { id: "s6", label: "4.6 Message Batches API — when async wins", progressId: "d4-s6" },
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
    id: "d4-q1",
    scenario: "Claude Code in CI/CD",
    question:
      "A CI pipeline runs Claude against every pull request with the instruction \"review this code for quality issues,\" and the results are inconsistent and hard to grade across 500 PRs a week. What should replace the vague instruction?",
    options: [
      "A larger max_tokens value, giving Claude more room to write a longer and seemingly more thorough review each time",
      "Explicit, checkable categories to review — injection risk, missing null checks, unbounded loops, hardcoded secrets — plus a required output format per category",
      "A stricter refusal policy, so Claude simply declines to review any pull request that looks risky or insecure",
      "Running the same review twice per pull request and keeping whichever of the two responses turns out longer",
    ],
    answer: 1,
    explanation:
      "Vague adjectives like \"quality issues\" produce inconsistent, unverifiable output at scale — reviewers 1 and 500 get graded on different implicit standards. Explicit, categorical criteria produce reproducible, gradeable output. A does not address inconsistency (more tokens is not more precision); C is unrelated to review quality; D doubles cost without making output more checkable — length is not a proxy for correctness.",
  },
  {
    id: "d4-q2",
    scenario: "Structured Data Extraction",
    question:
      "A team extracts 6 fixed fields from vendor invoices at 500/day. They currently ask Claude to \"please respond in valid JSON only\" in plain text, then call JSON.parse on the response — which occasionally throws on extra prose or malformed output. What is the architecturally correct fix?",
    options: [
      "Add the instruction \"IMPORTANT: return ONLY the JSON object, nothing else\" in bold at the very top of the prompt text",
      "Give Claude a tool definition with an input_schema for the invoice fields, and read the validated tool_use.input instead of parsing free text",
      "Lower the sampling temperature, so the plain-text JSON output comes back more consistently formatted across repeated calls",
      "Wrap the JSON.parse call in a try/catch block, and silently retry the identical prompt again whenever it fails",
    ],
    answer: 1,
    explanation:
      "Asking for JSON in plain text is never validated by the API — the model can still wrap the JSON in prose or drop a bracket, and the parser has no guarantee to lean on. tool_use with input_schema is validated server-side before your code ever sees it. A is a prompt-only fix that raises probability but guarantees nothing; C reduces but does not eliminate the problem and unnecessarily constrains other aspects of generation; D retries the exact request that already failed with no structural change, so the same failure mode recurs.",
  },
  {
    id: "d4-q3",
    scenario: "Customer Support Resolution Agent",
    question:
      "A support-ticket classification prompt lists categories in prose (\"billing, technical, or account\") but keeps misclassifying ambiguous tickets, like \"my payment method got reset when I changed my email.\" What should the architect add?",
    options: [
      "A longer written description of each category with more adjectives and synonyms",
      "2-4 example ticket-to-category pairs shown before the real ticket, including at least one ambiguous, edge-case example",
      "A larger or more capable model, since the current one is clearly not smart enough",
      "A stricter system-prompt instruction: \"You must always pick exactly one category, no exceptions\"",
    ],
    answer: 1,
    explanation:
      "Edge-case handling that is hard to state precisely in words is easy to show — 2-4 examples anchor the model's behavior on exactly the boundary it keeps getting wrong far more reliably than a longer written description. A does not fix under-specified edge cases; words cannot enumerate every boundary case. C treats a prompt-design gap as a capability gap — the model is not the bottleneck here. D adds a formatting constraint (pick one) but does not teach the model where the boundary actually is.",
  },
  {
    id: "d4-q4",
    scenario: "Structured Data Extraction",
    question:
      "An invoice-extraction pipeline marks po_number as nullable and instructs Claude to return null — never guess — when the PO number is missing from the invoice. A downstream validator also checks that due_date falls after invoice_date. When that check fails, the pipeline retries the extraction, appending the validation error to the prompt, up to a bounded number of attempts before flagging the record for human review. A teammate wants to drop that validation-retry step entirely, arguing the nullable field alone already prevents every extraction error. Why is the teammate wrong?",
    options: [
      "The teammate is right — nullable fields alone already catch every possible extraction error, so the validation-retry step is pure redundancy",
      "The teammate is wrong — nullable fields stop invented values for missing data, while validation-retry separately catches logically inconsistent values that no schema alone can express",
      "The teammate is right — the validation step only adds processing latency and delivers no measurable improvement in data quality",
      "The teammate is right, though for a different reason — bounded retry loops are themselves the real bug worth removing",
    ],
    answer: 1,
    explanation:
      "Nullable fields and validation-retry solve two different problems: nullable fields stop the model from inventing a value when data is genuinely missing; validation-retry catches values the model did extract but that are logically wrong (a due date before the invoice date), which no schema constraint alone can express. A conflates the two failure modes into one; C dismisses a real data-quality gate as pure overhead; D misapplies Domain 1's loop-bounding principle backwards — bounding an agentic or retry loop is the correct control, not a defect.",
  },
  {
    id: "d4-q5",
    scenario: "Multi-Agent Research System",
    question:
      "A multi-agent research system crawls 20,000 archived documents every night. The results need to become structured citation records before the next day's research runs start, but no user is waiting on the extraction step itself. The coordinator (the agent orchestrating the pipeline) proposes looping the real-time Messages API over all 20,000 documents instead, reasoning that it is simpler to code than setting up a separate batch job. Is that the right call?",
    options: [
      "Yes — when the request volume is this large, simplicity of implementation should always outweigh any potential cost savings",
      "No — no one is waiting synchronously, the 24-hour turnaround is acceptable, and the Message Batches API costs roughly 50% less for the same tokens",
      "No — the Batches API should only ever be used for user-facing chat responses, in order to guarantee response freshness",
      "Yes, but only if the real-time loop also adds sleeps between requests, to roughly imitate how batching behaves",
    ],
    answer: 1,
    explanation:
      "The deciding factor is whether anyone is waiting synchronously, not how many requests there are — here, nothing is blocked on the extraction finishing before the next morning. The Batches API is built for exactly this: large, deadline-tolerant, non-interactive workloads, at a real cost saving. A optimizes for coding convenience over a real cost and architecture difference; C inverts the actual anti-pattern — routing a live, user-facing reply through the Batches API is wrong because it has no real-time SLA, not the other way around; D is not real batching and gets none of the cost benefit, just manual throttling of the expensive path.",
  },
];

/* ---- page -------------------------------------------------------------------- */

export default function PromptEngineeringStructuredOutputLesson() {
  return (
    <>
      <SchemaOrg schema={PAGE_SCHEMA} />
      <section className="relative isolate overflow-hidden border-b border-line">
        <div className="aurora absolute inset-0 -z-10" />
        <Container className="py-5 sm:py-7">
          <span className="inline-flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-bright">
            <span className="h-1 w-1 rounded-full bg-brand" />
            Lesson 4 · Domain 4 · 20% of the exam
          </span>
          <h1 className="mt-2 text-2xl font-bold leading-[1.15] tracking-tight text-fg sm:text-3xl lg:text-4xl">
            Prompt Engineering &amp; Structured Output
          </h1>
          <p className="mt-2 max-w-3xl text-[15px] leading-7 text-muted">
            Everything Domain 4 tests: explicit criteria over vague guidance, few-shot examples, <Code>tool_use</Code>{" "}
            with JSON schemas for guaranteed structure, nullable fields against hallucination, validation-retry loops
            and multi-pass review, and choosing between the real-time Messages API and the Message Batches API. Every
            concept comes with the real request shape or code — because that is how the exam frames its questions.
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
              <Sec id="s1" pid="d4-s1" title="4.1 Explicit criteria beat vague guidance" blueprint='"prompt precision & checkable criteria"'>
                <P>
                  The exam rewards prompts that state <strong>categorical, checkable criteria</strong> over vague
                  adjectives. &quot;Review this code for quality issues&quot; and &quot;check this document for
                  problems&quot; sound reasonable, but they hand the model an ill-defined bar — every response
                  invents its own definition of &quot;quality&quot; or &quot;problem,&quot; and no two runs grade the
                  same way.
                </P>
                <P>
                  Compare the two versions of a code-review prompt used at scale (500 PRs a week, every PR reviewed
                  the same way):
                </P>
                <div className="mt-3 overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr>
                        <th className={TH}>Vague (fails at scale)</th>
                        <th className={TH}>Explicit criteria (scales)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className={TD}>&quot;Review this code for quality issues.&quot;</td>
                        <td className={TD}>
                          &quot;Check for exactly these categories: (1) SQL injection risk, (2) missing null checks,
                          (3) unbounded loops, (4) hardcoded secrets. For each category, output{" "}
                          <Code>{"{category, found: bool, line, detail}"}</Code>.&quot;
                        </td>
                      </tr>
                      <tr>
                        <td className={TD}>Output shape varies run to run; nothing to diff against</td>
                        <td className={TD}>Fixed shape; two runs on the same PR are directly comparable</td>
                      </tr>
                      <tr>
                        <td className={TD}>A human still has to read prose to find what was actually checked</td>
                        <td className={TD}>A missing category is visible immediately — the output says so</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <P>
                  The distinction matters most exactly where the exam likes to test it: <strong>a prompt running at
                  scale</strong>. Reviewing 1 PR, a vague prompt might work fine because a human reads the output and
                  fills the gaps. Reviewing 500 PRs a week with no human reading every response, vague instructions
                  produce inconsistent, unverifiable output — while explicit criteria produce reproducible, gradeable
                  output that a downstream system (or a human doing spot-checks) can actually act on.
                </P>
                <Callout tone="exam" title="How the exam asks this">
                  &quot;A team&apos;s code-review prompt produces inconsistent results across hundreds of PRs. What
                  should change?&quot; The correct answer replaces adjectives with a fixed list of checkable
                  categories and a required output shape — never &quot;use a bigger model&quot; or &quot;add more
                  emphasis to the existing instruction.&quot;
                </Callout>
              </Sec>

              <Sec id="s2" pid="d4-s2" title="4.2 Few-shot examples: show what's hard to say" blueprint='"few-shot prompting & edge-case anchoring"'>
                <P>
                  Some tasks have a desired output format or edge-case handling that is <strong>hard to state in
                  words but easy to show</strong>. When that is true, 2-4 input/output example pairs placed in the
                  prompt before the real input anchor the model&apos;s behavior far more reliably than a longer
                  written description alone.
                </P>
                <H3>Support-ticket classification: description-only vs few-shot</H3>
                <P>
                  A prompt that lists categories in prose — &quot;classify as billing, technical, or account&quot; —
                  under-specifies exactly the tickets that matter most: the ambiguous ones.
                </P>
                <CodeBlock>{`# Description-only (under-specifies edge cases)
"Classify the following support ticket as one of: billing,
technical, or account. Respond with only the category name."

Ticket: "My payment method got reset when I changed my email."
-> unclear which category this should be; the model guesses`}</CodeBlock>
                <CodeBlock>{`# Few-shot (anchors the exact edge-case handling)
Ticket: "I was charged twice for my subscription this month."
Category: billing

Ticket: "The app crashes every time I try to upload a photo."
Category: technical

Ticket: "My payment method got reset when I changed my email
address, and now I can't tell if my subscription is still active."
Category: account
# (edge case: touches billing AND technical, but the root cause
# is an account-settings change - the example teaches the model
# to classify by ROOT CAUSE, not by which keyword appears)

Ticket: "{{real_ticket}}"
Category:`}</CodeBlock>
                <P>
                  The third example pair is doing the real work: it is deliberately an ambiguous ticket, and it shows
                  the model exactly how to resolve the ambiguity (classify by root cause, not by surface keyword).
                  No amount of additional prose describing the &quot;account&quot; category would teach that
                  resolution rule as reliably as one worked example.
                </P>
                <Callout tone="trap" title="Distractor pattern">
                  &quot;Add a longer, more detailed description of each category.&quot; This sounds like it should
                  help and rarely does for edge cases — the failure isn&apos;t a missing adjective, it&apos;s a
                  missing example of the boundary. When a stem describes ambiguous or edge-case misclassification,
                  the fix is few-shot examples, not more prose.
                </Callout>
              </Sec>

              <Sec id="s3" pid="d4-s3" title="4.3 tool_use for guaranteed structure" blueprint='"structured outputs via tool_use / input_schema"'>
                <P>
                  Asking Claude to &quot;please respond in JSON&quot; in plain text is not reliable structured
                  output — it is a request the model interprets like any other instruction, and nothing on the API
                  side validates the response against a shape. The response can come back with extra prose around
                  the JSON, a dropped comma, or schema drift on a field name.
                </P>
                <P>
                  Giving Claude a <strong>tool definition with a JSON <Code>input_schema</Code></strong> — even when
                  the &quot;tool&quot; isn&apos;t really an external action, just a way to force schema-shaped output
                  — is far more reliable than asking for JSON in plain text. One precision worth knowing for the exam:
                  plain <Code>tool_use</Code> alone is <em>very</em> reliable but does not strictly guarantee
                  conformance — the model can still infer a value for a missing required field. Adding{" "}
                  <Code>strict: true</Code> to the tool definition (Strict tool use) is what turns that into a real
                  guarantee, validating the call arguments against the schema before you ever see them.
                </P>
                <StructuredOutputDiagram />
                <H3>Tool schema for invoice-field extraction</H3>
                <CodeBlock>{`{
  "name": "record_invoice_fields",
  "description": "Record the extracted fields from a vendor invoice.",
  "input_schema": {
    "type": "object",
    "properties": {
      "invoice_number": { "type": "string" },
      "vendor_name":    { "type": "string" },
      "amount":         { "type": "number" },
      "due_date":       { "type": "string", "format": "date" },
      "po_number":      { "type": ["string", "null"] }
    },
    "required": ["invoice_number", "vendor_name", "amount", "due_date", "po_number"]
  }
}`}</CodeBlock>
                <P>
                  Claude responds with a <Code>tool_use</Code> block whose <Code>input</Code> already matches this
                  shape — no free text to strip, no brackets to hunt for. Your code reads{" "}
                  <Code>tool_use.input.invoice_number</Code> directly.
                </P>
                <Callout tone="exam" title="How the exam asks this">
                  &quot;A team asks Claude to respond in JSON as plain text and occasionally gets malformed output at
                  scale. What is the fix?&quot; The correct answer is always a tool definition with an{" "}
                  <Code>input_schema</Code> (add <Code>strict: true</Code> for a hard guarantee, not just high
                  reliability), or the structured-outputs <Code>output_config.format</Code> feature — never
                  &quot;emphasize the JSON instruction more strongly&quot; or &quot;lower the temperature.&quot; A
                  prompt-only fix raises the probability of compliance; it never guarantees it.
                </Callout>
              </Sec>

              <Sec id="s4" pid="d4-s4" title="4.4 Nullable fields prevent hallucination" blueprint='"schema design against hallucinated fields"'>
                <P>
                  A schema-shaped answer solves one problem and creates another if you are not careful: if a schema
                  marks a field as <strong>required</strong> but the source document simply does not contain that
                  data, the model will often <strong>invent a plausible-looking value</strong> to satisfy the
                  schema — for example, fabricating a PO number that looks right but does not exist on the invoice.
                </P>
                <P>The schema-level fix has two parts, and both matter:</P>
                <ol className="mt-2 max-w-[74ch] list-decimal space-y-1.5 pl-6 text-[15px] leading-7 text-slate-700">
                  <li>
                    <strong>Mark optional fields nullable in the schema itself</strong> — <Code>{'"type": ["string", "null"]'}</Code>{" "}
                    — so the model has a valid, schema-conformant way to say &quot;this isn&apos;t here&quot; instead
                    of being forced to produce something.
                  </li>
                  <li>
                    <strong>Explicitly instruct the null path</strong> — &quot;If the PO number is not printed on the
                    invoice, return <Code>null</Code>. Do not guess or infer a value.&quot; — and{" "}
                    <strong>validate downstream</strong>: flag or reject any record where a nullable field is
                    unexpectedly populated with a low-confidence-looking value, or route null-heavy records for
                    human review.
                  </li>
                </ol>
                <P>
                  This is a direct continuation of the structured-output problem in 4.3: getting a schema-shaped
                  answer is necessary but not sufficient — the schema also has to make the true absence of data
                  <em> representable</em>, or the model will paper over the gap.
                </P>
                <Callout tone="trap" title="Weaker fixes that don't eliminate the problem">
                  &quot;Just lower the temperature&quot; or &quot;add &apos;don&apos;t hallucinate&apos; to the
                  prompt&quot; both <em>reduce</em> the rate of invented values but do not <em>eliminate</em> the
                  problem — the model can still be confidently wrong. The schema-level fix (nullable field +
                  explicit null instruction + downstream validation) is the only approach that gives you a
                  deterministic way to catch the failure, rather than just making it less likely.
                </Callout>
              </Sec>

              <Sec id="s5" pid="d4-s5" title="4.5 Validation-retry loops and multi-pass review" blueprint='"validation loops & multi-pass architecture"'>
                <P>
                  Once you have structured output, the production pattern is to run it through a{" "}
                  <strong>programmatic validator</strong> — a schema check, plus business-rule checks like &quot;
                  <Code>due_date</Code> must be after <Code>invoice_date</Code>.&quot; If validation fails, the
                  architecture <strong>retries the extraction call with the validation error appended to the
                  prompt</strong>, so the model can see exactly what was wrong and self-correct — up to a bounded
                  retry count.
                </P>
                <ValidationRetryLoopDiagram />
                <P>
                  That bound is not optional. It is the same loop-bounding principle from Domain 1: an agentic loop
                  that is allowed to retry forever is a production incident waiting to happen, whether the loop is
                  calling tools or re-attempting a structured extraction. A typical bound is 3 attempts, after which
                  the record is <strong>flagged for human review</strong> — never silently dropped, and never
                  retried indefinitely.
                </P>
                <CodeBlock>{`def extract_with_validation(document, max_retries=3):
    error_context = ""
    for attempt in range(max_retries):
        result = extract(document, prior_error=error_context)
        errors = validate(result)          # schema check + business rules
        if not errors:
            return result                  # accept
        error_context = f"Previous attempt failed: {errors}. Fix these issues."
    flag_for_human_review(document, result, errors)  # bounded - never loop forever
    return None`}</CodeBlock>
                <H3>Multi-pass review: a cheap draft, a stronger check</H3>
                <P>
                  A related production pattern is <strong>multi-pass review</strong>: a cheap or fast model pass
                  drafts the extraction or output, then a second pass — the same or a stronger model, reviewing
                  against explicit criteria — checks the draft. This catches errors a single pass misses, at a cost
                  premium that is worth paying for high-stakes output (financial figures, medical data, anything
                  that feeds a downstream decision without further human review).
                </P>
                <Callout tone="exam" title="How the exam asks this">
                  &quot;A structured-extraction pipeline retries on validation failure. What should bound the
                  retries, and what happens when the bound is hit?&quot; The correct answer is a small, explicit
                  retry count, with the record routed to human review on exhaustion — not &quot;retry until it
                  passes&quot; and not &quot;drop the record silently.&quot;
                </Callout>
              </Sec>

              <Sec id="s6" pid="d4-s6" title="4.6 Message Batches API — when async wins" blueprint='"Message Batches API selection criteria"'>
                <P>
                  The <strong>Message Batches API</strong> lets you submit many independent requests together and
                  get results back within a 24-hour processing window, at roughly <strong>50% lower cost</strong>{" "}
                  than real-time calls. It is built for large, deadline-tolerant, non-interactive workloads — the
                  textbook case is a nightly extraction job over 20,000 archived documents, where nothing downstream
                  is blocked on the job finishing before the next morning.
                </P>
                <BatchVsRealtimeDiagram />
                <P>
                  This maps directly onto Domain 1&apos;s anti-pattern #3: using the Batches API for a{" "}
                  <strong>blocking, user-facing, real-time flow is wrong</strong> because it has no real-time SLA — a
                  user waiting on a live chat response cannot wait up to 24 hours for the reply. The mistake runs in
                  both directions and the exam tests both: routing a live conversation through Batches is the classic
                  wrong answer, and looping the real-time API over 20,000 documents just because &quot;it&apos;s
                  simpler to code&quot; throws away a real cost saving for no architectural benefit.
                </P>
                <div className="mt-3 overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr>
                        <th className={TH}></th>
                        <th className={TH}>Real-time Messages API</th>
                        <th className={TH}>Message Batches API</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className={`${TD} font-semibold`}>Latency</td>
                        <td className={TD}>Immediate — the caller is waiting</td>
                        <td className={TD}>Up to 24 hours (most complete faster)</td>
                      </tr>
                      <tr>
                        <td className={`${TD} font-semibold`}>Cost</td>
                        <td className={TD}>Full per-token price</td>
                        <td className={TD}>~50% lower for the same tokens</td>
                      </tr>
                      <tr>
                        <td className={`${TD} font-semibold`}>Use when</td>
                        <td className={TD}>Someone or something is waiting synchronously on the response</td>
                        <td className={TD}>The workload is large, independent, and deadline-tolerant</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <Callout tone="exam" title="The deciding factor, in one line">
                  The exam frames this as: &quot;is anyone waiting synchronously?&quot; — not &quot;is this a lot of
                  requests?&quot; A huge batch of requests with no one waiting is a Batches API workload regardless
                  of size; a single request with a user staring at a loading spinner is a real-time workload
                  regardless of how cheap batching looks on paper.
                </Callout>
              </Sec>

              <CheckpointQuiz title="Checkpoint quiz — Domain 4" questions={QUIZ} />

              <div className="mt-5">
                <CourseGlossary compact />
              </div>

              <div className="mt-5 flex flex-wrap gap-3">
                <Link
                  href={`${CCAF_BASE}/context-management-reliability`}
                  className="glow-brand inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-brand to-cyan px-5 py-3 text-base font-semibold text-white transition hover:brightness-110"
                >
                  Next: Domain 5
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
