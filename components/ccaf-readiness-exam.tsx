"use client";

/* ----------------------------------------------------------------------------
   CCA-F readiness exam. Timed, scenario-anchored MCQs scored on the real
   exam's 100-1000 scale against the 720 pass line, with per-domain diagnosis.
   Questions are ORIGINAL ShieldSync items in the exam's format - never dumps.
   The bank renders only after Start (client-side), so lesson scrapers get
   none of the exam value. Result persists via course-progress (localStorage).
---------------------------------------------------------------------------- */

import { useEffect, useRef, useState } from "react";
import { useCourseProgress } from "./course-progress";

const DOMAINS: Record<string, string> = {
  d1: "Agentic Architecture & Orchestration",
  d2: "Tool Design & MCP Integration",
  d3: "Claude Code Configuration & Workflows",
  d4: "Prompt Engineering & Structured Output",
  d5: "Context Management & Reliability",
};

type Q = { d: keyof typeof DOMAINS; s: string; q: string; opts: string[]; a: number; why: string };

const BANK: Q[] = [
  {
    d: "d1",
    s: "Multi-Agent Research System",
    q: "A coordinator delegates to a search subagent that finds nothing relevant. The best-designed subagent response is:",
    opts: [
      "Return an empty string so the coordinator moves on quickly",
      "Return a report stating no relevant results, listing the queries tried and suggesting alternative search angles",
      "Keep broadening the search autonomously until something is found",
      "Return the full transcript of every failed search for transparency",
    ],
    a: 1,
    why: "Negative results are results. 'Nothing found + what was tried + what to try next' lets the coordinator re-plan. Empty output is the silent-failure anti-pattern; unbounded broadening blows budget; full transcripts defeat context isolation.",
  },
  {
    d: "d1",
    s: "Customer Support Resolution Agent",
    q: "Your agent hits its 10-iteration loop cap while mid-diagnosis on a billing issue. Architecturally, what should happen?",
    opts: [
      "Silently restart the loop with a fresh context",
      "Return whatever the model's last draft answer was",
      "Persist structured case state, then hand off to a human or a fresh session seeded with that state",
      "Raise the cap to 50 iterations since 10 was clearly too few",
    ],
    a: 2,
    why: "Bounds exist to trigger controlled handoff, not to be raised whenever hit. State out, then escalate or reseed. Restarting loses the customer's progress; last-draft answers on billing are a liability.",
  },
  {
    d: "d2",
    s: "Developer Productivity",
    q: "Claude keeps picking search_docs when it should call search_code. Both tools work correctly. The first fix to try:",
    opts: [
      "Rewrite both tool descriptions to state precisely when each applies and when it does not",
      "Remove search_docs so the wrong choice is impossible",
      "Add a system-prompt rule: 'prefer search_code for code questions'",
      "Fine-tune on examples of correct tool selection",
    ],
    a: 0,
    why: "Tool selection is driven by descriptions - they are the model's only view of what a tool does. Disambiguating descriptions (including 'do NOT use for...') is the canonical fix. Removing capability or patching the prompt treats the symptom.",
  },
  {
    d: "d2",
    s: "Developer Productivity",
    q: "An MCP server wraps an internal ticket API. A lookup fails because the ticket is archived. The best tool response is:",
    opts: [
      "HTTP 500 with the raw stack trace in the body",
      "isError: true with category TICKET_ARCHIVED, retryable: false, and a pointer to the archive-search tool",
      "An empty result set, since archived is effectively not-found",
      "isError: true with the message 'Error 4022'",
    ],
    a: 1,
    why: "Structured, actionable errors: category + retryability + next step. The agent can then switch tools instead of retrying a non-retryable state. Stack traces and opaque codes give the model nothing to reason with; empty results hide the truth.",
  },
  {
    d: "d3",
    s: "Code Generation with Claude Code",
    q: "A 40-developer team wants shared coding standards applied to everyone's Claude Code sessions in one repo. Where do they belong?",
    opts: [
      "Each developer's ~/.claude/CLAUDE.md",
      "A wiki page linked from the README",
      "CLAUDE.md (and .claude/rules/) committed at the repo root",
      "A pinned Slack message with the standards",
    ],
    a: 2,
    why: "Project-level CLAUDE.md is version-controlled, shared context loaded for every session in that repo. User-level files are personal; wikis and Slack are invisible to the model.",
  },
  {
    d: "d3",
    s: "Claude Code in CI/CD",
    q: "You want Claude Code to review PRs in CI and emit machine-readable findings for a bot to post. The right invocation shape is:",
    opts: [
      "claude in interactive mode on a CI runner with a virtual terminal",
      'claude -p "review this diff" --output-format json (headless, parsed by the pipeline)',
      "A cron job that opens Claude Code and screenshots the response",
      "claude -p with default text output, parsed with regex",
    ],
    a: 1,
    why: "-p is non-interactive/headless mode for automation; --output-format json gives structured output a pipeline can consume without brittle parsing. Interactive mode in CI and regex-parsing prose are both fragile.",
  },
  {
    d: "d4",
    s: "Structured Data Extraction",
    q: "Invoices sometimes lack a PO number. Extraction keeps inventing plausible PO numbers. The schema-level fix:",
    opts: [
      "Lower temperature to 0 to reduce creativity",
      "Add 'do not hallucinate' to the prompt",
      "Make po_number nullable and instruct that missing data must return null - then validate",
      "Post-process by deleting PO numbers that fail a checksum",
    ],
    a: 2,
    why: "If the schema demands a value, the model will supply one. Give it a legitimate way to say 'absent' (nullable + explicit instruction) and enforce with validation. Temperature and pleading reduce, not eliminate; checksums only catch invalid inventions.",
  },
  {
    d: "d4",
    s: "Structured Data Extraction",
    q: "Nightly, 20,000 archived contracts need one-time field extraction. No user is waiting. The cost-optimal approach:",
    opts: [
      "The Message Batches API - roughly half price, results within 24 hours",
      "Parallel real-time API calls with high concurrency to finish fast",
      "One giant request concatenating many contracts to save overhead",
      "Real-time calls with prompt caching as the primary cost lever",
    ],
    a: 0,
    why: "Asynchronous, throughput-shaped, deadline-tolerant = Batch API's exact use case (50% discount). Concurrency burns rate limits at full price; concatenation destroys per-document reliability. The reverse also appears: Batch API for a live user flow is an anti-pattern - no real-time SLA.",
  },
  {
    d: "d5",
    s: "Customer Support Resolution Agent",
    q: "When should the support agent escalate to a human? The design the exam rewards:",
    opts: [
      "When the model reports its own confidence is below 0.7",
      "On deterministic triggers: policy boundaries (refund > limit), repeated tool failure, explicit customer request, loop caps",
      "Never - the 80% first-contact-resolution target means escalation is failure",
      "After every negative-sentiment message",
    ],
    a: 1,
    why: "Self-reported confidence is poorly calibrated (anti-pattern #2). Escalation triggers must be objective and testable. A resolution target never overrides policy boundaries; sentiment alone over-escalates.",
  },
  {
    d: "d5",
    s: "Multi-Agent Research System",
    q: "A synthesis agent merges three subagent reports; one contains an unsourced claim that contradicts the other two. Best architecture response:",
    opts: [
      "Majority vote: report the claim two agents agree on and drop the third",
      "Include both versions and let the reader decide",
      "Because reports carry source provenance, flag the unsourced claim, exclude or verify it, and note the conflict in the output",
      "Re-run all three subagents until they agree",
    ],
    a: 2,
    why: "Provenance is the control: claims travel with their sources, so unsourced contradictions are detectable and handled explicitly. Blind majority voting can launder correlated errors; re-running until agreement manufactures false consensus.",
  },
];

const EXAM_MINUTES = 10;

export function ReadinessExam() {
  const [started, setStarted] = useState(false);
  const [picked, setPicked] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(EXAM_MINUTES * 60);
  const { setExam } = useCourseProgress();
  const resultRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!started || submitted) return;
    const t = setInterval(() => {
      setSecondsLeft((s) => {
        if (s <= 1) {
          clearInterval(t);
          setSubmitted(true);
          return 0;
        }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(t);
  }, [started, submitted]);

  useEffect(() => {
    if (!submitted) return;
    const correct = BANK.filter((q, i) => picked[i] === q.a).length;
    const score = Math.round((correct / BANK.length) * 900) + 100;
    setExam({ score, correct, total: BANK.length });
    resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [submitted]);

  if (!started) {
    return (
      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={() => setStarted(true)}
          className="glow-brand inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-brand to-cyan px-5 py-3 text-base font-semibold text-white transition hover:brightness-110"
        >
          Start timed check ({EXAM_MINUTES} min)
        </button>
        <span className="text-[13px] text-muted">
          Questions render only after you start — this exam lives on this page, not in the page source.
        </span>
      </div>
    );
  }

  const correct = BANK.filter((q, i) => picked[i] === q.a).length;
  const score = Math.round((correct / BANK.length) * 900) + 100;
  const pass = score >= 720;
  const mm = String(Math.floor(secondsLeft / 60)).padStart(2, "0");
  const ss = String(secondsLeft % 60).padStart(2, "0");

  return (
    <div>
      {!submitted ? (
        <div className="sticky top-20 z-10 mb-4 flex justify-end">
          <span className="rounded-xl bg-fg px-3.5 py-1.5 font-mono text-lg font-bold text-white shadow-lg">
            {mm}:{ss}
          </span>
        </div>
      ) : null}

      {BANK.map((q, i) => {
        const p = picked[i];
        return (
          <div key={i} className="panel mb-4 rounded-2xl p-5">
            <span className="block font-mono text-[10.5px] font-semibold uppercase tracking-[0.12em] text-muted">
              Q{i + 1} of {BANK.length} · Scenario: {q.s}
            </span>
            <p className="mt-1.5 font-semibold text-fg">{q.q}</p>
            <div className="mt-2 grid gap-2">
              {q.opts.map((opt, j) => {
                const isCorrect = submitted && j === q.a;
                const isWrong = submitted && j === p && j !== q.a;
                const isPicked = !submitted && j === p;
                return (
                  <button
                    key={j}
                    type="button"
                    disabled={submitted}
                    onClick={() => setPicked((prev) => ({ ...prev, [i]: j }))}
                    className={`flex items-start gap-2.5 rounded-xl border px-3.5 py-2.5 text-left text-sm transition ${
                      isCorrect
                        ? "border-emerald-300 bg-emerald-50 text-emerald-900"
                        : isWrong
                          ? "border-red-300 bg-red-50 text-red-900"
                          : isPicked
                            ? "border-brand/50 bg-brand/5 text-fg"
                            : "border-line bg-ink text-fg hover:border-line-strong disabled:cursor-default"
                    }`}
                  >
                    <span className="mt-0.5 font-mono text-[11px] font-semibold text-muted">
                      {String.fromCharCode(65 + j)}.
                    </span>
                    <span>{opt}</span>
                  </button>
                );
              })}
            </div>
            {submitted ? (
              <div className="mt-2 rounded-xl bg-ink-2 px-3.5 py-2.5 text-[13.5px] leading-6 text-slate-700">
                <b className="text-brand-bright">Correct: {String.fromCharCode(65 + q.a)}.</b> {q.why}
              </div>
            ) : null}
          </div>
        );
      })}

      {!submitted ? (
        <button
          type="button"
          onClick={() => setSubmitted(true)}
          className="glow-brand inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-brand to-cyan px-5 py-3 text-base font-semibold text-white transition hover:brightness-110"
        >
          Submit — score me
        </button>
      ) : (
        <div ref={resultRef} className="scroll-mt-24">
          <div className="rounded-3xl bg-gradient-to-r from-brand to-cyan px-6 py-8 text-center text-white">
            <div className="text-sm text-white/80">Your readiness score (scaled 100–1000, pass = 720)</div>
            <div className={`text-5xl font-extrabold leading-tight sm:text-6xl ${pass ? "" : "text-red-200"}`}>
              {score}
            </div>
            <div className="mx-auto mt-1 max-w-xl text-sm text-white/80">
              {correct} of {BANK.length} correct —{" "}
              {pass
                ? "on current form you would likely pass. Review the domains below that are not at 100%."
                : "below the pass line. Your per-domain breakdown shows exactly where to focus."}
            </div>
            <div className="mx-auto mt-5 max-w-xl text-left">
              {Object.entries(DOMAINS).map(([d, name]) => {
                const total = BANK.filter((q) => q.d === d).length;
                if (!total) return null;
                const right = BANK.filter((q, i) => q.d === d && picked[i] === q.a).length;
                return (
                  <div key={d} className="mb-2.5">
                    <div className="flex justify-between text-[13px] font-semibold">
                      <span className="text-white/90">{name}</span>
                      <span>
                        {right}/{total}
                      </span>
                    </div>
                    <div className="mt-1 h-2 overflow-hidden rounded-full bg-white/25">
                      <div className="h-full rounded-full bg-white" style={{ width: `${(right / total) * 100}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
