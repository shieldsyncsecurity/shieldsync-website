"use client";

/* ----------------------------------------------------------------------------
   Animated diagrams for CCA-F Domain 5 (Context Management & Reliability).
   Self-contained copy of the course-diagrams.tsx pattern (Dgm shell, Box /
   Arrow / Shield / Defs / FlowDot primitives, scroll-reveal via
   IntersectionObserver with a dead-observer fallback timeout, prefers-reduced-
   motion honoured). Do not import from course-diagrams.tsx - this file must
   stand alone. Animation CSS lives in globals.css under the `dgm-` prefix;
   this file is not touched here.
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
  const marker = tone === "brand" ? "url(#dgmc-ah-brand)" : tone === "bad" ? "url(#dgmc-ah-bad)" : "url(#dgmc-ah)";
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
          ["dgmc-ah", C.arrow],
          ["dgmc-ah-brand", C.brand],
          ["dgmc-ah-bad", C.badLine],
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

/* ---- 1. Prompt caching: stable prefix vs volatile suffix -------------------- */

export function PromptCachingDiagram() {
  return (
    <Dgm
      label="Prompt caching: a stable prefix reused across requests is cached and billed at a discount, while the volatile latest message sits at the end"
      caption="Fig 5.1 - Structure prompts stable-first: repeated requests 2, 3 and 4 reuse the cached prefix (cheap, fast); only the trailing user turn changes and is processed fresh each time."
      viewBox="0 0 880 300"
      dots={() => (
        <>
          <FlowDot path="M140,140 L140,196" dur="1.8s" />
          <FlowDot path="M300,140 L300,196" dur="1.8s" begin="0.5s" />
          <FlowDot path="M460,140 L460,196" dur="1.8s" begin="1s" />
          <FlowDot path="M620,140 L620,196" dur="1.8s" begin="1.5s" />
        </>
      )}
    >
      <Defs />
      <text x={30} y={26} fontFamily={F} fontSize={12.5} fontWeight={600} fill={C.ink}>
        Request 1
      </text>
      <Box x={30} y={36} w={170} h={92} tone="brand" title="Stable prefix" sub="system prompt + tool defs" sub2="+ large docs - cache_control" d={0} shield />
      <Box x={30} y={140} w={170} h={44} tone="neutral" title="Latest user msg" sub="changes every turn" d={150} />

      <text x={230} y={26} fontFamily={F} fontSize={12.5} fontWeight={600} fill={C.ink}>
        Request 2
      </text>
      <Box x={230} y={36} w={140} h={92} tone="ok" title="Cache HIT" sub="same prefix bytes" sub2="discounted + faster" d={300} />
      <Box x={230} y={140} w={140} h={44} tone="neutral" title="New user msg" d={350} />

      <text x={400} y={26} fontFamily={F} fontSize={12.5} fontWeight={600} fill={C.ink}>
        Request 3
      </text>
      <Box x={400} y={36} w={140} h={92} tone="ok" title="Cache HIT" sub="same prefix bytes" sub2="discounted + faster" d={450} />
      <Box x={400} y={140} w={140} h={44} tone="neutral" title="New user msg" d={500} />

      <text x={570} y={26} fontFamily={F} fontSize={12.5} fontWeight={600} fill={C.ink}>
        Request 4
      </text>
      <Box x={570} y={36} w={140} h={92} tone="ok" title="Cache HIT" sub="same prefix bytes" sub2="discounted + faster" d={600} />
      <Box x={570} y={140} w={140} h={44} tone="neutral" title="New user msg" d={650} />

      <Arrow path="M120,128 L260,128" d={750} tone="brand" dashed />
      <Arrow path="M290,128 L430,128" d={800} tone="brand" dashed />
      <Arrow path="M460,128 L600,128" d={850} tone="brand" dashed />
      <text x={445} y={112} textAnchor="middle" fontFamily={F} fontSize={11} fill={C.muted}>
        identical prefix bytes reused across turns
      </text>

      <Box x={760} y={64} w={100} h={64} tone="bad" title="Reorder = miss" sub="volatile content first" d={900} />

      <text x={445} y={220} textAnchor="middle" fontFamily={F} fontSize={12} fontWeight={600} fill={C.brandDark}>
        Cache win = prefix STABILITY: put system prompt, tool defs and docs first; the changing user turn goes last.
      </text>
      <text x={445} y={240} textAnchor="middle" fontFamily={F} fontSize={11} fill={C.muted}>
        exam framing: high-volume production workloads with a repeated context prefix (e.g. a coding agent resending codebase context every turn)
      </text>
    </Dgm>
  );
}

/* ---- 2. Escalation: deterministic triggers vs self-reported confidence ---- */

export function EscalationTriggersDiagram() {
  return (
    <Dgm
      label="Deterministic escalation triggers feed into escalate to human; model self-reported confidence does not"
      caption="Fig 5.3 - Escalation is code-enforced on objective thresholds. Self-reported confidence is a distractor path: LLM confidence is poorly calibrated, so it never gates escalation alone."
      viewBox="0 0 880 300"
      dots={() => (
        <>
          <FlowDot path="M160,90 L430,190" dur="2s" />
          <FlowDot path="M340,90 L430,190" dur="2s" begin="0.5s" />
          <FlowDot path="M520,90 L440,190" dur="2s" begin="1s" />
          <FlowDot path="M700,90 L450,190" dur="2s" begin="1.5s" />
        </>
      )}
    >
      <Defs />
      <Box x={70} y={40} w={170} h={58} tone="tint" title="Refund exceeds" sub="policy limit ($)" d={0} />
      <Box x={260} y={40} w={170} h={58} tone="tint" title="N consecutive" sub="tool failures" d={100} />
      <Box x={450} y={40} w={170} h={58} tone="tint" title="Explicit customer" sub='request: "human, please"' d={200} />
      <Box x={640} y={40} w={170} h={58} tone="tint" title="Loop-iteration" sub="cap hit" d={300} />

      <Arrow path="M155,98 L430,190" d={500} tone="brand" />
      <Arrow path="M345,98 L430,190" d={600} tone="brand" />
      <Arrow path="M535,98 L450,190" d={700} tone="brand" />
      <Arrow path="M725,98 L460,190" d={800} tone="brand" />

      <Box x={330} y={194} w={220} h={62} tone="ok" title="Escalate to human" sub="objective, code-enforced" d={900} shield />

      <line x1={30} y1={130} x2={850} y2={130} stroke={C.neutralLine} strokeWidth={1} strokeDasharray="4 4" />

      <Box x={330} y={20} w={220} h={0} tone="neutral" title="" d={0} />
      <Box x={620} y={230} w={230} h={58} tone="bad" title="Model self-reports" sub='"I am only 60% confident"' d={1000} />
      <Arrow path="M700,230 L560,225" label="unreliable signal" lx={655} ly={214} d={1150} tone="bad" dashed />

      <text x={445} y={280} textAnchor="middle" fontFamily={F} fontSize={11.5} fill={C.muted}>
        anti-pattern #2: self-reported confidence is not a control - a model can be confidently wrong or unconfident and correct
      </text>
    </Dgm>
  );
}

/* ---- 3. Provenance: conflicting subagent claims surfaced, not voted away -- */

export function ProvenanceConflictDiagram() {
  return (
    <Dgm
      label="Three subagent reports feed a synthesis step; one report carries an unsourced conflicting claim which synthesis flags rather than resolving by majority vote"
      caption="Fig 5.5 - Synthesis traces every claim to its source. An unsourced claim that contradicts two others gets flagged explicitly - never smoothed over by majority vote or re-running until agreement."
      viewBox="0 0 880 300"
      dots={() => (
        <>
          <FlowDot path="M140,110 L400,178" dur="2s" />
          <FlowDot path="M400,110 L420,178" dur="2s" begin="0.6s" />
          <FlowDot path="M660,110 L450,178" dur="2s" begin="1.2s" />
        </>
      )}
    >
      <Defs />
      <Box x={60} y={40} w={200} h={70} tone="tint" title="Subagent A report" sub="claim: rollout done Q2" sub2="sourced: changelog.md" d={0} />
      <Box x={340} y={40} w={200} h={70} tone="bad" title="Subagent B report" sub="claim: rollout done Q3" sub2="unsourced - contradicts A/C" d={150} />
      <Box x={620} y={40} w={200} h={70} tone="tint" title="Subagent C report" sub="claim: rollout done Q2" sub2="sourced: release notes" d={300} />

      <Arrow path="M160,110 L400,178" d={500} tone="brand" />
      <Arrow path="M440,110 L440,178" d={600} tone="bad" dashed />
      <Arrow path="M720,110 L480,178" d={700} tone="brand" />

      <Box x={330} y={182} w={220} h={60} tone="brand" title="Synthesis" sub="traces each claim to source" d={850} shield />

      <Arrow path="M440,242 L440,266" d={1000} tone="bad" />
      <Box x={230} y={270} w={420} h={26} tone="bad" title="Output flags the conflict explicitly - does not vote or blend" d={1100} />

      <text x={445} y={26} textAnchor="middle" fontFamily={F} fontSize={11.5} fontWeight={600} fill={C.muted}>
        majority vote across correlated sources would launder B's error into false consensus
      </text>
    </Dgm>
  );
}
