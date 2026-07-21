/* ----------------------------------------------------------------------------
   Always-available jargon reference for the CCA-F course. Plain server
   component (no client state needed) using native <details> disclosure,
   same pattern as FaqSection. Rendered on every lesson page and the exam
   page so a reader who blanks on a term mid-question never has to scroll
   back through an earlier lesson to find it.
---------------------------------------------------------------------------- */

type Term = { term: string; def: string };

const TERMS: Term[] = [
  {
    term: "Agentic loop",
    def: "The repeating cycle behind any Claude-powered agent: send a request, check what Claude wants to do next (stop_reason), run a tool if asked, send the result back, repeat until Claude is done.",
  },
  {
    term: "stop_reason",
    def: "A field on Claude's response telling your code why it stopped talking — e.g. it wants to call a tool (tool_use), it finished (end_turn), or it ran out of room (max_tokens).",
  },
  {
    term: "tool_use / tool_result",
    def: "tool_use is Claude asking your code to run something (a search, a database lookup...). tool_result is your code's answer, sent back so Claude can continue.",
  },
  {
    term: "Subagent / Agent tool",
    def: "A helper Claude spawns to do one focused piece of work in its own separate memory space, then reports back a summary — so the main conversation doesn't get cluttered with the helper's scratch work.",
  },
  {
    term: "Hooks (PreToolUse / PostToolUse)",
    def: "Small scripts that run automatically around a tool call — one right before it (can block it entirely) and one right after (can react to the result). Used for rules that must always hold, not just usually hold.",
  },
  {
    term: "MCP (Model Context Protocol)",
    def: "A standard way to connect Claude to external systems — databases, internal tools, company APIs — through a shared plug-in format instead of custom one-off code every time.",
  },
  {
    term: "MCP Tools vs Resources vs Prompts",
    def: "The three things an MCP connection can offer: Tools are actions Claude decides to call itself; Resources are data the surrounding app decides to hand Claude; Prompts are ready-made instructions a person picks, like a menu option.",
  },
  {
    term: ".mcp.json",
    def: "A config file listing which external MCP connections a project uses — shared with the whole team via version control, with any secret keys kept out of it and read from environment variables instead.",
  },
  {
    term: "CLAUDE.md",
    def: "A plain-text file Claude reads automatically at the start of every session in a project — the place for standing instructions like coding conventions or how the codebase is organized.",
  },
  {
    term: ".claude/rules/",
    def: "Instructions that only switch on for certain files (e.g. only when editing test files), instead of loading into every single session the way CLAUDE.md does.",
  },
  {
    term: "Agent Skill",
    def: "A packaged set of instructions Claude loads by itself when a task matches, without anyone typing a command — think of it as an instruction manual Claude picks up automatically off the shelf.",
  },
  {
    term: "allowed-tools vs disallowed-tools",
    def: "Two different settings that sound alike: allowed-tools just skips the usual 'are you sure?' prompt for tools you've pre-approved — it doesn't block anything else. disallowed-tools is what actually removes a tool from what's available.",
  },
  {
    term: "Plan mode",
    def: "A mode where Claude describes what it's about to do and waits for a yes before touching any files — used for bigger or riskier changes, skipped for small obvious ones.",
  },
  {
    term: "Message Batches API",
    def: "A cheaper way to send Claude a large pile of requests when nobody is waiting on the answer right away — costs about half as much, but can take up to a day to come back.",
  },
  {
    term: "Prompt caching",
    def: "A way to avoid Claude re-reading the same large, unchanging block of text (like a system prompt or a codebase) on every single request — it's remembered for a while, which is both cheaper and faster.",
  },
  {
    term: "Context window",
    def: "The total amount of conversation and text Claude can 'see' at once for a given request. When a conversation runs long, older parts may need to be summarized or dropped to make room.",
  },
  {
    term: "Hub-and-spoke (multi-agent)",
    def: "A setup where one coordinator agent hands out tasks to several helper agents and collects their answers — the helpers never talk directly to each other, only to the coordinator.",
  },
  {
    term: "Anti-pattern",
    def: "A design choice that looks reasonable but causes real problems in practice — this course names seven specific ones the exam likes to hide inside wrong answers.",
  },
];

export function CourseGlossary({ compact = false }: { compact?: boolean }) {
  return (
    <div className="panel rounded-2xl p-5 sm:p-6">
      <h2 className="text-base font-bold text-fg">
        {compact ? "Quick glossary" : "New to this vocabulary? Quick glossary"}
      </h2>
      <p className="mt-1 text-[13px] leading-6 text-muted">
        Every term below appears somewhere in this course. If a question uses a word you&apos;re unsure of, check
        here before re-reading the whole lesson.
      </p>
      <div className="mt-3 divide-y divide-line border-y border-line">
        {TERMS.map((t) => (
          <details key={t.term} className="group py-2.5">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-semibold text-fg">
              {t.term}
              <span aria-hidden className="text-lg leading-none text-brand transition-transform group-open:rotate-45">
                +
              </span>
            </summary>
            <p className="mt-1.5 text-[13.5px] leading-6 text-muted">{t.def}</p>
          </details>
        ))}
      </div>
    </div>
  );
}
