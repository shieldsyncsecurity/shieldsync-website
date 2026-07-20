/* ----------------------------------------------------------------------------
   Free courses registry. Single source of truth for the /free-courses section:
   hub page, lesson pages, sitemap, and Course/ItemList structured data all
   read from here. Model mirrors the labs registries in lib/site.ts.

   NOTE: this is UNOFFICIAL exam-prep content owned by ShieldSync. It must
   always carry the "not affiliated with Anthropic" disclaimer on-page.
---------------------------------------------------------------------------- */

export type CourseLesson = {
  slug: string; // URL under /free-courses/<course>/<slug> ("" = hub-only entry)
  num: string; // display number, e.g. "1"
  title: string;
  desc: string;
  minutes: number;
  status: "live" | "soon";
  /** progress-tracking section ids (drives the hub completion ring) */
  progressIds?: string[];
};

export const CCAF_COURSE = {
  slug: "claude-architect-foundations",
  name: "Claude Certified Architect - Foundations (CCA-F): Free Prep Course",
  shortName: "CCA-F Prep Course",
  description:
    "Free, complete preparation for Anthropic's Claude Certified Architect - Foundations (CCA-F) certification exam: all 5 domains, the 6 exam scenarios, the 7 anti-patterns, animated architecture diagrams, checkpoint quizzes, and a scored readiness exam.",
  level: "Intermediate",
  hoursMin: 480, // total course workload in minutes (used for Course schema)
  exam: {
    questions: 60,
    minutes: 120,
    passScore: 720,
    scaleMax: 1000,
    priceUSD: 125,
  },
  domains: [
    { num: 1, name: "Agentic Architecture & Orchestration", weight: 27 },
    { num: 3, name: "Claude Code Configuration & Workflows", weight: 20 },
    { num: 4, name: "Prompt Engineering & Structured Output", weight: 20 },
    { num: 2, name: "Tool Design & MCP Integration", weight: 18 },
    { num: 5, name: "Context Management & Reliability", weight: 15 },
  ],
} as const;

export const CCAF_LESSONS: CourseLesson[] = [
  {
    slug: "exam-orientation",
    num: "0",
    title: "Exam orientation: format, scenarios, scoring, registration",
    desc: "How scenario-anchored questions work, the 4-of-6 scenario draw, proctoring rules, who should sit this exam, and a 4-week study plan.",
    minutes: 15,
    status: "live",
    progressIds: ["d0-s1", "d0-s2", "d0-s3", "d0-s4", "d0-s5", "d0-s6"],
  },
  {
    slug: "agentic-architecture",
    num: "1",
    title: "Domain 1: Agentic Architecture & Orchestration (27%)",
    desc: "The agentic loop, stop_reason handling, tool execution, task decomposition, hub-and-spoke multi-agent design, subagents and context isolation, session state, lifecycle hooks.",
    minutes: 55,
    status: "live",
    progressIds: ["d1-s1", "d1-s2", "d1-s3", "d1-s4", "d1-s5", "d1-s6", "d1-s7", "d1-s8"],
  },
  {
    slug: "tool-design-mcp",
    num: "2",
    title: "Domain 2: Tool Design & MCP Integration (18%)",
    desc: "MCP primitives, tool descriptions that drive selection, structured error responses, .mcp.json, transports, building servers and clients, per-role tool scoping.",
    minutes: 40,
    status: "live",
    progressIds: ["d2-s1", "d2-s2", "d2-s3", "d2-s4", "d2-s5", "d2-s6"],
  },
  {
    slug: "claude-code-workflows",
    num: "3",
    title: "Domain 3: Claude Code Configuration & Workflows (20%)",
    desc: "CLAUDE.md hierarchy, .claude/rules/ with YAML frontmatter, skills and slash commands, plan mode vs direct execution, headless -p mode and CI/CD patterns.",
    minutes: 45,
    status: "live",
    progressIds: ["d3-s1", "d3-s2", "d3-s3", "d3-s4", "d3-s5", "d3-s6"],
  },
  {
    slug: "prompt-engineering-structured-output",
    num: "4",
    title: "Domain 4: Prompt Engineering & Structured Output (20%)",
    desc: "Explicit criteria, few-shot design, tool_use with JSON schemas, nullable fields against hallucination, validation-retry loops, multi-pass review, Message Batches API.",
    minutes: 45,
    status: "live",
    progressIds: ["d4-s1", "d4-s2", "d4-s3", "d4-s4", "d4-s5", "d4-s6"],
  },
  {
    slug: "context-management-reliability",
    num: "5",
    title: "Domain 5: Context Management & Reliability (15%)",
    desc: "Long-session information preservation, agent handoffs, escalation via deterministic thresholds, error propagation, provenance, prompt caching.",
    minutes: 35,
    status: "live",
    progressIds: ["d5-s1", "d5-s2", "d5-s3", "d5-s4", "d5-s5"],
  },
  {
    slug: "exam-scenarios",
    num: "6",
    title: "The 6 exam scenarios, deconstructed",
    desc: "Support agent, Claude Code rollout, multi-agent research, developer productivity, CI/CD, structured extraction - what each scenario is really testing.",
    minutes: 30,
    status: "live",
    progressIds: ["d6-s1", "d6-s2", "d6-s3", "d6-s4", "d6-s5", "d6-s6"],
  },
  {
    slug: "anti-patterns",
    num: "7",
    title: "The 7 anti-patterns (how wrong answers are built)",
    desc: "Every distractor in the exam is a plausible architectural mistake. Learn the seven failure modes the exam recycles and eliminate options on sight.",
    minutes: 25,
    status: "live",
    progressIds: ["d7-s1", "d7-s2", "d7-s3", "d7-s4", "d7-s5", "d7-s6", "d7-s7"],
  },
  {
    slug: "readiness-exam",
    num: "8",
    title: "Readiness exam + study plan",
    desc: "Timed, scenario-anchored questions scored on the exam's 1000-point scale with a per-domain diagnosis against the 720 pass line.",
    minutes: 15,
    status: "live",
  },
];

export const CCAF_BASE = `/free-courses/${CCAF_COURSE.slug}`;

/** Lesson pages that exist as real routes (live + has a slug). */
export const CCAF_LIVE_ROUTES = CCAF_LESSONS.filter((l) => l.status === "live" && l.slug !== "");
