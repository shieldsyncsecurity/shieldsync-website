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
      "Persist the case state, then hand off to a human or a fresh session",
      "Raise the cap to 50 iterations since 10 was clearly too few",
    ],
    a: 2,
    why: "Bounds exist to trigger controlled handoff, not to be raised whenever hit. State out, then escalate or reseed. Restarting loses the customer's progress; last-draft answers on billing are a liability.",
  },
  {
    d: "d2",
    s: "Developer Productivity with Claude",
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
    s: "Developer Productivity with Claude",
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
    s: "Claude Code for Continuous Integration",
    q: "You want Claude Code to review PRs in CI and emit machine-readable findings for a bot to post. The right invocation shape is:",
    opts: [
      "claude in interactive mode on a CI runner with a virtual terminal",
      'claude -p "review this diff" --output-format json',
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
      "Flag the unsourced claim, exclude or verify it, and note the conflict in the merged output",
      "Re-run all three subagents until they agree",
    ],
    a: 2,
    why: "Provenance is the control: claims travel with their sources, so unsourced contradictions are detectable and handled explicitly. Blind majority voting can launder correlated errors; re-running until agreement manufactures false consensus.",
  },
  {
    d: "d1",
    s: "Code Generation with Claude Code",
    q: 'In the core agentic loop, after Claude\'s response comes back with stop_reason "tool_use", what is the architecturally correct next step?',
    opts: [
      "Treat the tool_use block as the final answer and show it to the user as-is",
      "Execute the requested tool(s), then send the tool_result(s) back as a new user-turn message and continue the loop",
      "Discard the tool_use block and ask the model to answer directly in plain text instead",
      "Re-send the identical prior request unchanged, in case the model reconsiders",
    ],
    a: 1,
    why: "The loop is: send request, check stop_reason, execute the tool, return the tool_result, repeat. Showing the raw tool_use block to the user skips execution entirely; discarding it abandons the tool path; resending unchanged does nothing.",
  },
  {
    d: "d1",
    s: "Developer Productivity with Claude",
    q: "A teammate wants to tell apart three situations from the API response alone: Claude wants to call a tool, the response was cut off before finishing, and Claude declined for a policy reason. Which stop_reason values correspond to those three cases, in order?",
    opts: [
      "end_turn, stop_sequence, refusal",
      "tool_use, refusal, max_tokens",
      "tool_use, max_tokens, refusal",
      "end_turn, max_tokens, stop_sequence",
    ],
    a: 2,
    why: "tool_use signals a pending tool call, max_tokens means generation was truncated by the length cap, and refusal means the model declined for safety/policy reasons. The other orderings mismatch cause and value.",
  },
  {
    d: "d1",
    s: "Customer Support Resolution Agent",
    q: "The agent's assistant turn contains a tool_use block calling get_refund_policy. How must the result be returned to keep the conversation valid?",
    opts: [
      "As a tool_result content block in the next user-turn message, with tool_use_id matching the tool_use block's id",
      "As a new system message inserted before the next user turn",
      "As plain text appended to the same assistant turn that made the call",
      "As a tool_result block placed in the assistant turn immediately after the tool_use block, in the same turn",
    ],
    a: 0,
    why: "tool_result must go back as a user-turn content block, correlated to its tool_use via tool_use_id - that's how the model knows which call it answers. Same-turn placement and other roles break the protocol.",
  },
  {
    d: "d1",
    s: "Structured Data Extraction",
    q: "A custom extraction tool fails because the target file is corrupted. What should its tool_result contain?",
    opts: [
      "An empty string, so the model quietly moves past the failure",
      "The raw exception stack trace with no other structure",
      "Silently retry the same tool call automatically without telling the model anything failed",
      "is_error: true with a structured error: a category, whether it's retryable, and a suggested next action",
    ],
    a: 3,
    why: "Structured errors - category, retryable flag, next step - give the model something to act on. An empty result is the silent-failure anti-pattern; a bare stack trace is opaque; silent auto-retry hides the failure from the loop entirely.",
  },
  {
    d: "d1",
    s: "Claude Code for Continuous Integration",
    q: "In a single assistant turn, Claude requests three independent lint checks via three separate tool_use blocks. What is the correct handling?",
    opts: [
      "Execute only the first tool call and ignore the rest to save tokens",
      "Execute all three, then return all three tool_result blocks together in one user-turn message",
      "Execute all three, but send each tool_result back in its own separate user message, one per turn",
      "Reject the turn and ask Claude to request the tools one at a time instead",
    ],
    a: 1,
    why: "Parallel tool calls in one turn are executed concurrently and their results returned together in a single user message; splitting them across messages trains the model to stop batching calls. Dropping requested calls loses work.",
  },
  {
    d: "d1",
    s: "Multi-Agent Research System",
    q: "A research system has five specialist agents. Which topology keeps control and context manageable as more specialists get added?",
    opts: [
      "Flat peer-to-peer: every specialist can message every other specialist directly",
      "One agent holding all five specialists' tools loaded simultaneously",
      "Hub-and-spoke: a coordinator delegates to and integrates results from each specialist, which don't message each other directly",
      "A fixed round-robin chain that hands off to each specialist in turn",
    ],
    a: 2,
    why: "Hub-and-spoke keeps a single coordinator responsible for integration and context; flat peer-to-peer is the known anti-pattern that produces uncontrolled cross-talk. Loading every tool into one agent removes isolation, not adds capability.",
  },
  {
    d: "d1",
    s: "Code Generation with Claude Code",
    q: "A code-review subagent only needs read-only file access, but is launched with the full toolset including bash and file-write. What is wrong with this design?",
    opts: [
      "It should only receive the read-only tools its role needs, not the full project toolset",
      "Nothing - giving a subagent broader tool access always makes it more capable",
      "It should be given an even wider toolset, including network access, to be safe",
      "The fix is to merge it into the main session so tool scoping no longer matters",
    ],
    a: 0,
    why: "Context isolation via subagents is only as good as the tool scoping applied to each role; unrestricted tool access is the named anti-pattern. Widening access or removing isolation both make the problem worse, not better.",
  },
  {
    d: "d1",
    s: "Customer Support Resolution Agent",
    q: "The agent must remember a customer's verified identity and order ID across many turns, including after the conversation is compacted. Where should that information live?",
    opts: [
      "Only in the conversation history, trusting the model to recall it correctly after compaction",
      "Nowhere persistent - re-verify identity from scratch on every single turn",
      "Baked into the model via a per-customer fine-tune",
      "Extracted as durable facts into external state that gets re-injected into each new request",
    ],
    a: 3,
    why: "Durable facts belong in external state that gets re-injected, since conversation history is not guaranteed to survive compaction intact. Relying on raw history is fragile; re-verifying every turn is needlessly wasteful and user-hostile.",
  },
  {
    d: "d1",
    s: "Developer Productivity with Claude",
    q: "The team wants to guarantee no Claude Code session ever runs a destructive command in production directories, no matter what any prompt says. What enforces this deterministically?",
    opts: [
      "A CLAUDE.md instruction telling the model never to run destructive commands in prod",
      "A PreToolUse hook that inspects the command and blocks it before execution",
      "A PostToolUse hook that logs the command after it has already run",
      "Asking the model to double-check itself before any dangerous command",
    ],
    a: 1,
    why: "PreToolUse hooks can block before execution - deterministic enforcement outside the model's control. A CLAUDE.md rule and self-checking are prompt-based and not guaranteed; PostToolUse only reacts after the fact, too late to prevent it.",
  },
  {
    d: "d2",
    s: "Developer Productivity with Claude",
    q: 'An MCP server exposes a database query capability, a set of read-only project files, and a canned "generate changelog" template. In MCP terms, these map respectively to:',
    opts: [
      "Tools, Prompts, Resources",
      "Resources, Tools, Prompts",
      "Tools, Resources, Prompts",
      "Prompts, Resources, Tools",
    ],
    a: 2,
    why: "MCP's three primitives map cleanly: Tools are model-invoked actions, Resources are host-controlled data attached to context, Prompts are user-selected templates. Any other pairing confuses who controls invocation.",
  },
  {
    d: "d2",
    s: "Code Generation with Claude Code",
    q: "A project's .mcp.json lists one MCP server that runs as a local subprocess and another that is a remote hosted service. What transport should each use?",
    opts: [
      "stdio for the local subprocess server, Streamable HTTP for the remote server",
      "stdio for both, for simplicity",
      "Streamable HTTP for both, since it's the newer option",
      "stdio for the remote server for lower latency, Streamable HTTP for the local one",
    ],
    a: 0,
    why: "stdio is for local subprocess MCP servers; Streamable HTTP is for remote servers reachable over the network. Using stdio for a remote service, or HTTP for a local subprocess, doesn't match the transport to where the server actually runs.",
  },
  {
    d: "d2",
    s: "Claude Code for Continuous Integration",
    q: "An MCP server declared in .mcp.json needs an API key to authenticate. What is the correct way to configure it?",
    opts: [
      "Hardcode the key directly in .mcp.json, since the repository is private",
      "Base64-encode the key and commit the encoded value, since that isn't plaintext",
      "Put the key in a comment above the server entry for documentation",
      "Reference an environment variable in the config; never commit the literal secret value into .mcp.json",
    ],
    a: 3,
    why: "Secrets belong behind env-var references in .mcp.json, never as literal committed values. Encoding isn't encryption - it's trivially reversible - and a private repo or a comment are not substitutes for keeping secrets out of source control.",
  },
  {
    d: "d2",
    s: "Multi-Agent Research System",
    q: "The project declares five MCP tools across two connected servers. A citation-checking subagent only needs one of them. What should that subagent's configuration grant?",
    opts: [
      "All five, since they're already declared and available",
      "Only the one MCP tool its role needs, even though all five are declared project-wide",
      "None - have the coordinator relay MCP calls on the subagent's behalf instead",
      "Whichever tools the model happens to request at runtime, with no fixed scope",
    ],
    a: 1,
    why: "Per-role scoping applies to MCP tools the same as any other tool: grant only what the role needs. Granting all declared tools is the unrestricted-access anti-pattern; routing everything through the coordinator adds latency without real isolation benefit.",
  },
  {
    d: "d2",
    s: "Structured Data Extraction",
    q: "Two MCP tools, extract_fields and parse_document, have nearly identical one-line descriptions. Claude keeps calling the wrong one for extraction tasks. What is the description-level fix?",
    opts: [
      "Lower the temperature setting so the model chooses more carefully",
      "Rename both tools randomly until the model happens to pick correctly",
      "Rewrite both descriptions to state distinct, non-overlapping conditions for when each should be used",
      "Rewrite the tools' underlying implementation, since that is what's causing the misselection",
    ],
    a: 2,
    why: "The tool description is the only signal Claude has for selection - the implementation is invisible to it. Ambiguous, overlapping descriptions cause misselection regardless of implementation quality or sampling settings.",
  },
  {
    d: "d3",
    s: "Code Generation with Claude Code",
    q: "A team's CLAUDE.md is growing unwieldy with API conventions, testing conventions, and deploy conventions all inline. What is the idiomatic way to organize this?",
    opts: [
      "Split the content into separate files and reference them from the main CLAUDE.md via @path imports",
      "Keep everything inline, since CLAUDE.md must be a single file",
      "Move it all into ~/.claude/CLAUDE.md so every teammate automatically shares it",
      "Delete the sections and rely on the model's general training knowledge instead",
    ],
    a: 0,
    why: "@path imports let a project CLAUDE.md stay organized while pulling in separate files. User-level ~/.claude/CLAUDE.md is personal, not shared across the team; deleting project-specific context loses information the model has no other way to know.",
  },
  {
    d: "d3",
    s: "Developer Productivity with Claude",
    q: "The team wants a rule about SQL migration conventions to apply only when Claude is editing files under db/migrations/**, not elsewhere in the repo. How should this be scoped?",
    opts: [
      "A single always-loaded instruction in CLAUDE.md telling Claude to only apply it in that folder",
      "A comment repeating the convention inside every migration file",
      "A .claude/rules/ file with the scope described only in its instruction text, no frontmatter",
      "A file in .claude/rules/ with YAML frontmatter paths matching db/migrations/**",
    ],
    a: 3,
    why: ".claude/rules/ files use a YAML frontmatter paths field (glob patterns) to scope instructions to matching files only - deterministic, not wording-dependent. An always-loaded CLAUDE.md instruction applies everywhere regardless of intent; a rules file with no paths field isn't actually scoped.",
  },
  {
    d: "d3",
    s: "Structured Data Extraction",
    q: 'The extraction team needs two things: a repeatable "/reprocess-batch $ARGUMENTS" shortcut for a routine manual task, and a capability that runs in an isolated context with only a narrow, fixed set of tools available while active. Which mechanism fits each, respectively?',
    opts: [
      "An Agent Skill with context: fork and disallowed-tools for the shortcut; a slash command with $ARGUMENTS for the isolated case",
      "A custom slash command with $ARGUMENTS for the shortcut; an Agent Skill with context: fork and disallowed-tools for the isolated case",
      "The same slash command handles both needs equally well",
      "A CLAUDE.md rule for both needs",
    ],
    a: 1,
    why: "Slash commands are the right fit for a parameterized repeatable shortcut; Agent Skills with context: fork run in isolated context and disallowed-tools removes tools from the pool while the skill is active - allowed-tools would only pre-approve tools to skip permission prompts, not restrict anything. Swapping the two, or using CLAUDE.md for either, doesn't get the isolation or the parameterization.",
  },
  {
    d: "d3",
    s: "Customer Support Resolution Agent",
    q: 'A support tooling team is deciding whether a Claude Code change needs plan mode: renaming one local variable in a single function, versus restructuring how refund authorization flows across a dozen files. How should this be decided?',
    opts: [
      "Always use plan mode for any change touching more than one file, as a fixed rule",
      "Never use plan mode, since it slows down every task equally",
      "Judge it by blast radius: the small rename can proceed directly, the large restructuring goes through plan mode first",
      'Use plan mode only when the user explicitly types the words "plan mode"',
    ],
    a: 2,
    why: "Plan mode is matched to blast radius - larger, riskier, more ambiguous changes warrant proposing a plan first; small well-defined changes don't need the overhead. A fixed file-count rule or an opt-in-only trigger ignores the actual risk being managed.",
  },
  {
    d: "d3",
    s: "Claude Code for Continuous Integration",
    q: "Two separate CI pipeline runs invoke Claude Code headlessly on two different pull requests at the same time. What must NOT happen between them?",
    opts: [
      "One run's session state or context leaking into or affecting the other run",
      "Both running headlessly with the -p flag",
      "Both producing --output-format json output for the pipeline to parse",
      "Both completing within the same CI job's overall time budget",
    ],
    a: 0,
    why: "Session isolation between separate CI runs is required - one PR's context should never bleed into another's review. The other three items describe normal, correct headless CI usage, not a failure mode.",
  },
  {
    d: "d3",
    s: "Code Generation with Claude Code",
    q: 'A CI code-review prompt tells Claude to "review this PR for any possible issue" and the output floods reviewers with low-value nitpicks. What is the fix?',
    opts: [
      "Increase max_tokens so the model has more room to be thorough",
      "Switch to a model with a larger context window so it can see more of the codebase",
      "Lower the sampling temperature to reduce the number of nitpicks",
      "Scope the review prompt to specific, named concerns instead of asking it to flag any possible issue",
    ],
    a: 3,
    why: "A tightly scoped prompt naming exactly what to check is what reduces false positives - vague, open-ended review prompts produce noise regardless of model size. A bigger context window is the classic anti-pattern of treating a scoping problem as a capacity problem.",
  },
  {
    d: "d4",
    s: "Developer Productivity with Claude",
    q: 'A grading prompt asks Claude to rate support transcripts as "good enough" or "needs work." At scale, the labels come back inconsistent run to run. What is the fix?',
    opts: [
      'Add "please be consistent" to the existing prompt',
      "Replace the vague guidance with explicit, categorical grading criteria",
      "Raise the sampling temperature so variation looks intentional",
      "Run each transcript three times and average an inconsistent score",
    ],
    a: 1,
    why: 'Explicit categorical criteria produce consistent, gradeable output at scale; vague guidance like "good enough" is inherently subjective no matter how it\'s phrased. Averaging repeated runs papers over the ambiguity instead of fixing it.',
  },
  {
    d: "d4",
    s: "Code Generation with Claude Code",
    q: "A prompt describes the desired commit-message format in prose, but Claude's output still varies on edge cases like multi-file commits. What is the most reliable fix?",
    opts: [
      "Make the prose description longer and more detailed",
      "Add a few concrete few-shot examples, including edge cases, showing the exact desired format",
      "Lower the effort/thinking setting so the model follows instructions more literally",
      "Switch to a smaller, cheaper model to reduce output variance",
    ],
    a: 1,
    why: "Few-shot examples anchor format and edge-case handling more reliably than description-only prompting. Longer prose rarely closes the same gap, and neither effort level nor model size directly addresses an under-specified format.",
  },
  {
    d: "d4",
    s: "Structured Data Extraction",
    q: 'An integration asks Claude to "respond with JSON" describing the desired fields in plain text, and periodically gets extra prose before the JSON or malformed output. What is the reliable fix?',
    opts: [
      "Use tool_use with a JSON input_schema, or structured outputs, instead of asking for JSON in plain text",
      'Add "respond ONLY with JSON, nothing else" in all caps to the existing prompt',
      "Post-process by stripping anything before the first { with a regex",
      "Ask the model to double-check that its own JSON is valid before responding",
    ],
    a: 0,
    why: "A tool_use call with a JSON input_schema is schema-validated by construction; asking for JSON in prose can still produce malformed output or stray text. Regex post-processing and self-checking are both workarounds around an unreliable format, not fixes to it.",
  },
  {
    d: "d4",
    s: "Claude Code for Continuous Integration",
    q: "An extraction pipeline validates each response against a schema and business rules. On failure, what is the recommended recovery pattern?",
    opts: [
      "Retry indefinitely until validation passes, however long that takes",
      "Silently accept the invalid output rather than retry",
      "Fall back to manual human entry for every single validation failure",
      "A fixed number of retries, re-prompting with the validation error each time",
    ],
    a: 3,
    why: "A validation-retry loop with the error fed back and a bounded retry count is the reliable recovery pattern. Unbounded retries risk runaway loops; silently accepting invalid output is a silent failure; routing every failure to a human defeats the point of automation.",
  },
  {
    d: "d4",
    s: "Multi-Agent Research System",
    q: "A team wants both fast, cheap output and high accuracy on a research-writing task. What architecture best balances this?",
    opts: [
      "Always use the most expensive available model for every single request",
      "A cheap draft pass, then a stronger review pass checked against explicit criteria",
      "Use only the cheapest model and accept lower accuracy across the board",
      "Run the same cheap model three times and pick whichever response is longest",
    ],
    a: 1,
    why: "A cheap draft plus a stronger, criteria-based review pass balances cost and quality deliberately. Always using the top-tier model over-provisions cost; picking the longest of several cheap-model outputs is a proxy for quality, not quality itself.",
  },
  {
    d: "d4",
    s: "Customer Support Resolution Agent",
    q: "A developer proposes routing live, in-chat customer replies through the Message Batches API to save on cost. What is wrong with this idea?",
    opts: [
      "Nothing - the roughly 50% cost savings are worth it for any workload, including live chat",
      "It's fine as long as max_tokens is increased to compensate for the delay",
      "The Batches API can take up to 24 hours to return results and carries no real-time guarantee",
      "It's fine as long as prompt caching is also enabled to offset the delay",
    ],
    a: 2,
    why: "Batch processing is for large, deadline-tolerant, non-interactive workloads - using it where a user is waiting synchronously is the named anti-pattern, since it carries no real-time guarantee. Neither max_tokens nor caching changes the processing-window mismatch.",
  },
  {
    d: "d5",
    s: "Developer Productivity with Claude",
    q: "A pipeline sends the same large policy document and the same tool definitions on every request, with only the user's question changing. How should the request be structured to maximize prompt cache hits?",
    opts: [
      "Put the stable content first and mark it cacheable; put the volatile content last",
      "Put the user's question first for fastest processing, with the document afterward",
      "Alternate the order of stable and volatile content on each request to keep things fresh",
      "Mark the user's question as the cacheable part, since it's what changes most often",
    ],
    a: 0,
    why: "Caching rewards a stable prefix - system prompt, tool defs, large static docs - placed first, with volatile content like the latest message last. Caching what changes every request, or reordering unpredictably, defeats the mechanism entirely.",
  },
  {
    d: "d5",
    s: "Multi-Agent Research System",
    q: "A research subagent is about to hand off to a second subagent to continue drafting a report. What should it hand off?",
    opts: [
      "The full raw conversation transcript, so nothing is lost in translation",
      "Nothing - the next subagent should start over with zero context to avoid bias",
      'A one-line status like "in progress", with no further detail',
      "A structured summary of what's been tried, what's confirmed, and what's still open",
    ],
    a: 3,
    why: "Handoffs should carry a structured summary of state, not a raw transcript dump or a zero-context restart - both waste the isolation subagents are meant to provide. A one-line status gives the receiving agent nothing concrete to act on.",
  },
  {
    d: "d5",
    s: "Code Generation with Claude Code",
    q: 'An autonomous coding agent needs to hand control back to a human at some point. Which of the following is a valid, deterministic escalation trigger?',
    opts: [
      "The model's self-reported certainty in its own plan drops below a threshold it estimates itself",
      "Three consecutive tool-call failures on the same operation",
      'The agent "feels" the task is getting harder than expected',
      "The model decides on its own that a human would probably like to know",
    ],
    a: 1,
    why: "A fixed count of consecutive tool failures is an objective, testable trigger. Self-reported confidence is poorly calibrated and explicitly the anti-pattern to avoid for escalation decisions; the other two options are just restatements of that same anti-pattern.",
  },
  {
    d: "d5",
    s: "Customer Support Resolution Agent",
    q: "A billing-lookup subagent times out partway through and returns partial, unverified data to the coordinator, which is about to feed it into a refund-calculation subagent. What should happen?",
    opts: [
      "Pass the partial data along unmarked, since some data is better than none",
      "Have the coordinator silently substitute a plausible complete value for the missing parts",
      "The partial result must be marked incomplete or degraded, not passed downstream as normal",
      "Discard the entire multi-agent run without recording anything that did complete",
    ],
    a: 2,
    why: "In multi-hop error propagation, a subagent's partial failure must be flagged as incomplete/degraded before it feeds into another agent - treating it as normal risks a wrong refund calculation. Fabricating a plausible value or throwing away confirmed partial progress are both worse outcomes.",
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
