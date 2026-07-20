"use client";

/* ----------------------------------------------------------------------------
   Animated architecture diagrams for the free courses (Azure-docs flow style:
   flat boxes, labeled arrows, branch paths). Animation contract (site motion
   guardrails): one-time staggered reveal when scrolled into view, connectors
   draw themselves, and small "request" dots flow along the primary path.
   `prefers-reduced-motion` disables all of it (dots are not even rendered).
   Animation CSS lives in globals.css under the `dgm-` prefix.
---------------------------------------------------------------------------- */

import { useEffect, useRef, useState, type ReactNode } from "react";

/* Palette (mirrors the site theme tokens; SVG needs literal values) */
const C = {
  brand: "#4f46e5",
  brandDark: "#4338ca",
  tint: "#eef2ff",
  tintLine: "#c7d2fe",
  neutral: "#f1f5f9",
  neutralLine: "#e2e8f0",
  ink: "#0f172a",
  muted: "#5a6b82",
  arrow: "#64748b",
  bad: "#b91c1c",
  badBg: "#fef2f2",
  badLine: "#fca5a5",
  ok: "#047857",
  okBg: "#ecfdf5",
  okLine: "#6ee7b7",
};

const F = "Inter, -apple-system, 'Segoe UI', Arial, sans-serif";

/* ---- shared shell: in-view trigger + reduced-motion detection ------------- */

function Dgm({
  label,
  caption,
  viewBox,
  children,
  dots,
}: {
  label: string;
  caption: string;
  viewBox: string;
  children: ReactNode;
  /** SMIL flow-dots factory - only rendered when motion is allowed */
  dots?: () => ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const [motionOk, setMotionOk] = useState(false);

  useEffect(() => {
    try {
      setMotionOk(!window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    } catch {}
    const el = ref.current;
    if (!el) return;
    // Fail-safe: if IO is unavailable or the viewport is degenerate (some
    // embedded webviews report innerHeight 0), reveal rather than stay hidden.
    if (typeof IntersectionObserver === "undefined" || window.innerHeight === 0) {
      setInView(true);
      return;
    }
    // A live IO always fires an initial callback (even when not intersecting);
    // the fallback only reveals when the observer is completely dead.
    const fallback = setTimeout(() => setInView(true), 4000);
    const io = new IntersectionObserver(
      (entries) => {
        clearTimeout(fallback);
        if (entries.some((e) => e.isIntersecting)) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold: 0.25 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      clearTimeout(fallback);
    };
  }, []);

  return (
    <figure
      ref={ref}
      className={`dgm my-5 overflow-x-auto rounded-2xl border border-line bg-panel p-3 ${inView ? "dgm-in" : ""}`}
    >
      <svg viewBox={viewBox} role="img" aria-label={label} className="block h-auto w-full min-w-[640px]">
        {children}
        {motionOk && inView && dots ? dots() : null}
      </svg>
      <figcaption className="pt-2 pb-1 text-center text-xs text-muted">{caption}</figcaption>
    </figure>
  );
}

/* ---- primitives ------------------------------------------------------------ */

type BoxTone = "brand" | "tint" | "neutral" | "bad" | "ok";
const TONES: Record<BoxTone, { fill: string; stroke: string; text: string; sub: string }> = {
  brand: { fill: C.brand, stroke: C.brand, text: "#ffffff", sub: "#c7d2fe" },
  tint: { fill: C.tint, stroke: C.tintLine, text: C.ink, sub: C.muted },
  neutral: { fill: C.neutral, stroke: C.neutralLine, text: C.ink, sub: C.muted },
  bad: { fill: C.badBg, stroke: C.badLine, text: C.bad, sub: C.bad },
  ok: { fill: C.okBg, stroke: C.okLine, text: C.ok, sub: C.ok },
};

function Box({
  x, y, w, h, tone = "tint", title, sub, sub2, d = 0, shield,
}: {
  x: number; y: number; w: number; h: number; tone?: BoxTone;
  title: string; sub?: string; sub2?: string; d?: number; shield?: boolean;
}) {
  const t = TONES[tone];
  const cx = x + w / 2;
  const titleY = sub ? y + h / 2 - (sub2 ? 12 : 5) : y + h / 2 + 4.5;
  return (
    <g className="dgm-node" style={{ transitionDelay: `${d}ms` }}>
      <rect x={x} y={y} width={w} height={h} rx={8} fill={t.fill} stroke={t.stroke} strokeWidth={1.4} />
      {shield ? <Shield cx={cx} cy={y - 2} onBrand={tone === "brand"} /> : null}
      <text x={cx} y={titleY} textAnchor="middle" fontFamily={F} fontSize={13} fontWeight={600} fill={t.text}>
        {title}
      </text>
      {sub ? (
        <text x={cx} y={titleY + 16} textAnchor="middle" fontFamily={F} fontSize={11} fill={t.sub}>
          {sub}
        </text>
      ) : null}
      {sub2 ? (
        <text x={cx} y={titleY + 31} textAnchor="middle" fontFamily={F} fontSize={11} fill={t.sub}>
          {sub2}
        </text>
      ) : null}
    </g>
  );
}

/** small ShieldSync-style shield badge that sits on a box's top edge */
function Shield({ cx, cy, onBrand }: { cx: number; cy: number; onBrand?: boolean }) {
  return (
    <g transform={`translate(${cx - 9},${cy - 11})`}>
      <path
        d="M9 0 L18 3.5 V10 C18 16 13.5 20.5 9 22 C4.5 20.5 0 16 0 10 V3.5 Z"
        fill={onBrand ? "#ffffff" : C.brand}
        stroke={onBrand ? C.brand : "#ffffff"}
        strokeWidth={1.2}
      />
      <path
        d="M5 10.5 L8 13.5 L13.5 7"
        fill="none"
        stroke={onBrand ? C.brand : "#ffffff"}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
  );
}

function Arrow({
  path, label, lx, ly, d = 0, tone = "arrow", dashed,
}: {
  path: string; label?: string; lx?: number; ly?: number; d?: number;
  tone?: "arrow" | "brand" | "bad"; dashed?: boolean;
}) {
  const stroke = tone === "brand" ? C.brand : tone === "bad" ? C.badLine : C.arrow;
  const marker = tone === "brand" ? "url(#dgm-ah-brand)" : tone === "bad" ? "url(#dgm-ah-bad)" : "url(#dgm-ah)";
  return (
    <g>
      {/* dashed edges fade in (the dgm-edge draw animation's dasharray would
          override their dash pattern - CSS beats presentation attributes) */}
      <path
        className={dashed ? "dgm-node" : "dgm-edge"}
        style={dashed ? { transitionDelay: `${d}ms` } : { animationDelay: `${d}ms` }}
        d={path}
        fill="none"
        stroke={stroke}
        strokeWidth={1.6}
        markerEnd={marker}
        strokeDasharray={dashed ? "5 4" : undefined}
      />
      {label ? (
        <text
          className="dgm-node"
          style={{ transitionDelay: `${d + 150}ms` }}
          x={lx}
          y={ly}
          textAnchor="middle"
          fontFamily={F}
          fontSize={11}
          fontWeight={500}
          fill="#475569"
        >
          {label}
        </text>
      ) : null}
    </g>
  );
}

function Defs() {
  return (
    <defs>
      {(
        [
          ["dgm-ah", C.arrow],
          ["dgm-ah-brand", C.brand],
          ["dgm-ah-bad", C.badLine],
        ] as const
      ).map(([id, fill]) => (
        <marker key={id} id={id} viewBox="0 0 10 10" refX="8.5" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M0,0 L10,5 L0,10 z" fill={fill} />
        </marker>
      ))}
    </defs>
  );
}

function FlowDot({ path, dur, begin = "0s", r = 4 }: { path: string; dur: string; begin?: string; r?: number }) {
  return (
    <circle r={r} fill={C.brand} opacity={0.9}>
      <animateMotion dur={dur} begin={begin} repeatCount="indefinite" path={path} rotate="none" />
    </circle>
  );
}

/* ---- 1. The agentic loop ---------------------------------------------------- */

export function AgenticLoopDiagram() {
  const loopPath = "M110,132 L110,196 L790,196 L790,96 L740,96";
  return (
    <Dgm
      label="The agentic loop: request, stop_reason check, tool execution, result, repeat"
      caption="Fig 1.2 - The agentic loop. A request cycles through tool execution until stop_reason becomes end_turn; every pass respects the loop bounds."
      viewBox="0 0 880 320"
      dots={() => (
        <>
          <FlowDot path="M180,96 L240,96" dur="1.6s" />
          <FlowDot path="M440,96 L500,96" dur="1.6s" begin="0.5s" />
          <FlowDot path={loopPath} dur="3.2s" begin="1s" r={3.5} />
        </>
      )}
    >
      <Defs />
      <Box x={40} y={68} w={140} h={64} tone="brand" title="Your application" sub="messages[] + tools[]" d={0} shield />
      <Arrow path="M180,96 L240,96" label="1. send request" lx={210} ly={84} d={150} />
      <Box x={244} y={68} w={196} h={64} tone="tint" title="Claude responds" sub="check stop_reason" d={200} />
      <Arrow path="M440,96 L500,96" label="tool_use" lx={470} ly={84} d={400} tone="brand" />
      <Box x={504} y={68} w={236} h={64} tone="tint" title="Execute tool(s)" sub="all calls in the turn, in parallel" d={450} />

      {/* loop back: results return as the next user turn */}
      <Arrow path={loopPath} label="4. tool_result (next user turn, by tool_use_id) - repeat" lx={450} ly={214} d={650} tone="brand" />

      {/* branch: end_turn exit */}
      <Arrow path="M342,132 L342,238" label="end_turn" lx={310} ly={190} d={800} />
      <Box x={252} y={242} w={180} h={54} tone="brand" title="Return the answer" sub="loop exits cleanly" d={950} />

      {/* branch: error result */}
      <Arrow path="M622,132 L622,238" label="tool failed" lx={664} ly={190} d={800} tone="bad" />
      <Box x={508} y={242} w={228} h={54} tone="bad" title="is_error: true, back to the model" sub="category + retryable + next step" d={950} />

      {/* bounds note */}
      <Box x={766} y={242} w={100} h={54} tone="neutral" title="Bounds" sub="iterations, budget, time" d={1100} />
    </Dgm>
  );
}

/* ---- 2. Hub-and-spoke vs flat topology -------------------------------------- */

export function TopologyDiagram() {
  return (
    <Dgm
      label="Hub-and-spoke coordinator topology versus flat peer-to-peer topology"
      caption="Fig 1.5 - One healthy multi-agent shape: tasks go down, structured reports come back up, spokes never talk to each other. Any answer routing spoke-to-spoke is the planted distractor."
      viewBox="0 0 880 330"
      dots={() => (
        <>
          <FlowDot path="M160,108 L92,182" dur="2.2s" />
          <FlowDot path="M205,108 L205,182" dur="2.2s" begin="0.7s" />
          <FlowDot path="M250,108 L318,182" dur="2.2s" begin="1.4s" />
        </>
      )}
    >
      <Defs />
      <text x={205} y={30} textAnchor="middle" fontFamily={F} fontSize={13.5} fontWeight={700} fill={C.brandDark}>
        Hub-and-spoke - the blessed shape
      </text>
      <Box x={125} y={46} w={160} h={58} tone="brand" title="Coordinator" sub="goal, plan, synthesis" d={0} shield />
      <Arrow path="M160,108 L92,182" d={200} tone="brand" />
      <Arrow path="M205,108 L205,182" d={300} tone="brand" />
      <Arrow path="M250,108 L318,182" d={400} tone="brand" />
      <Arrow path="M112,186 L172,112" d={500} dashed />
      <Arrow path="M225,186 L225,112" d={600} dashed />
      <Arrow path="M298,186 L238,112" d={700} dashed />
      <Box x={30} y={186} w={110} h={58} tone="tint" title="Search" sub="own tools + ctx" d={250} />
      <Box x={150} y={186} w={110} h={58} tone="tint" title="Analysis" sub="own tools + ctx" d={350} />
      <Box x={270} y={186} w={110} h={58} tone="tint" title="Report" sub="own tools + ctx" d={450} />
      <text x={205} y={282} textAnchor="middle" fontFamily={F} fontSize={11} fill={C.muted}>
        solid: task down - dashed: structured report up
      </text>

      <line x1={440} y1={24} x2={440} y2={300} stroke={C.neutralLine} strokeWidth={1.5} />

      <text x={665} y={30} textAnchor="middle" fontFamily={F} fontSize={13.5} fontWeight={700} fill={C.bad}>
        Flat peer-to-peer - anti-pattern #7
      </text>
      <Box x={490} y={60} w={110} h={50} tone="neutral" title="Agent A" d={300} />
      <Box x={730} y={60} w={110} h={50} tone="neutral" title="Agent B" d={400} />
      <Box x={490} y={200} w={110} h={50} tone="neutral" title="Agent C" d={500} />
      <Box x={730} y={200} w={110} h={50} tone="neutral" title="Agent D" d={600} />
      <Arrow path="M600,85 L726,85" d={700} tone="bad" dashed />
      <Arrow path="M545,110 L545,196" d={750} tone="bad" dashed />
      <Arrow path="M785,110 L785,196" d={800} tone="bad" dashed />
      <Arrow path="M600,110 L726,200" d={850} tone="bad" dashed />
      <Arrow path="M726,110 L600,200" d={900} tone="bad" dashed />
      <Arrow path="M600,225 L726,225" d={950} tone="bad" dashed />
      <text x={665} y={282} textAnchor="middle" fontFamily={F} fontSize={11} fill={C.bad}>
        no owner of done - N^2 paths - untraceable errors
      </text>
    </Dgm>
  );
}

/* ---- 3. Subagents and context isolation ------------------------------------- */

export function ContextIsolationDiagram() {
  return (
    <Dgm
      label="Subagent context isolation: noisy exploration stays inside each subagent; only final reports return"
      caption="Fig 1.6 - Context isolation: the parent pays for conclusions, never for exploration. Tool scoping happens per subagent."
      viewBox="0 0 880 310"
      dots={() => (
        <>
          <FlowDot path="M170,86 L170,146" dur="2s" />
          <FlowDot path="M700,146 L700,86" dur="2s" begin="1s" />
        </>
      )}
    >
      <Defs />
      <Box x={30} y={28} w={820} h={58} tone="brand" title="Parent context (coordinator / main session)" sub="holds the goal, the plan, and only the conclusions that come back" d={0} shield />

      <Arrow path="M170,86 L170,146" label="self-contained task" lx={170} ly={122} d={200} tone="brand" />
      <Arrow path="M450,86 L450,146" d={300} tone="brand" />
      <Arrow path="M640,146 L640,86" d={400} dashed />
      <Arrow path="M700,146 L700,86" label="final report ONLY" lx={712} ly={122} d={500} dashed />

      <Box x={60} y={150} w={230} h={120} tone="tint" title="research subagent" sub="Read + Grep only" sub2="50 file reads, dead ends: stay here" d={250} />
      <Box x={330} y={150} w={230} h={120} tone="tint" title="test-runner subagent" sub="Bash only" sub2="verbose logs, retries: stay here" d={350} />
      <Box x={600} y={150} w={230} h={120} tone="tint" title="security-audit subagent" sub="read-only tools" sub2="every hunch chased: stays here" d={450} />
    </Dgm>
  );
}

/* ---- 4. Durable session state ------------------------------------------------ */

export function SessionStateDiagram() {
  return (
    <Dgm
      label="Durable session state: extract critical facts when they happen, re-inject every request"
      caption="Fig 1.7 - Critical facts survive compaction because they were never left inside the conversation to begin with."
      viewBox="0 0 880 280"
      dots={() => <FlowDot path="M240,100 L240,168" dur="2s" />}
    >
      <Defs />
      <text x={30} y={30} fontFamily={F} fontSize={12.5} fontWeight={600} fill={C.ink}>
        Conversation turns (volatile - compaction can eat any of them)
      </text>
      <Box x={30} y={44} w={90} h={52} tone="neutral" title="turn 1" d={0} />
      <Box x={132} y={44} w={216} h={52} tone="ok" title="turn 2: identity VERIFIED" d={100} />
      <Box x={360} y={44} w={110} h={52} tone="neutral" title="turns 3-39" d={200} />
      <Box x={482} y={44} w={150} h={52} tone="bad" title="turn 40: COMPACTED" d={300} />
      <Box x={644} y={44} w={90} h={52} tone="neutral" title="turn 41" d={400} />

      <Arrow path="M240,100 L240,168" label="extract the moment it happens" lx={240} ly={140} d={500} tone="brand" />
      <Box x={110} y={172} w={340} h={64} tone="brand" title="Durable session state (DB / file)" sub="identity_verified: true - account A-4471 - case facts" d={650} shield />

      <Arrow path="M454,204 C620,204 700,150 748,100" label="re-inject into the system prompt, every request" lx={620} ly={232} d={850} tone="brand" />
      <Box x={748} y={44} w={110} h={52} tone="ok" title="still verified" sub="no re-ask" d={1000} />
    </Dgm>
  );
}

/* ---- 5. Lifecycle hooks pipeline --------------------------------------------- */

export function HooksDiagram() {
  return (
    <Dgm
      label="Hook lifecycle pipeline: PreToolUse can block a tool call; PostToolUse reacts to results"
      caption="Fig 1.8 - The hook pipeline: deterministic enforcement points that fire on every tool call, regardless of what the model wants."
      viewBox="0 0 880 240"
      dots={() => <FlowDot path="M30,88 L850,88" dur="4s" />}
    >
      <Defs />
      <Box x={30} y={60} w={170} h={56} tone="tint" title="Claude proposes" sub="a tool call" d={0} />
      <Arrow path="M200,88 L232,88" d={150} />
      <Box x={236} y={54} w={170} h={68} tone="brand" title="PreToolUse hook" sub="deterministic gate:" sub2="allow / BLOCK" d={200} shield />
      <Arrow path="M406,88 L438,88" d={350} />
      <Box x={442} y={60} w={150} h={56} tone="tint" title="Tool executes" sub="Edit / Write / Bash" d={400} />
      <Arrow path="M592,88 L624,88" d={550} />
      <Box x={628} y={54} w={170} h={68} tone="brand" title="PostToolUse hook" sub="format - lint - log" d={600} shield />
      <Arrow path="M798,88 L850,88" label="result" lx={826} ly={76} d={750} />

      <Arrow path="M321,122 L321,178" d={900} tone="bad" />
      <Box x={226} y={182} w={340} h={44} tone="bad" title="BLOCKED: tool never runs - the model cannot argue" d={1050} />
      <text x={640} y={210} fontFamily={F} fontSize={11.5} fill={C.muted}>
        must never / always / compliance = hook,
      </text>
      <text x={640} y={226} fontFamily={F} fontSize={11.5} fill={C.muted}>
        not a CLAUDE.md instruction
      </text>
    </Dgm>
  );
}
