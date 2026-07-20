"use client";

/* ----------------------------------------------------------------------------
   Animated diagrams for the "7 Anti-Patterns" lesson. Self-contained copy of
   the course-diagrams.tsx internal pattern (Dgm scroll-reveal shell, Box /
   Arrow / Defs / FlowDot primitives, indigo/blue palette, SMIL flow dots,
   prefers-reduced-motion handled by the shared `.dgm` / `.dgm-in` / `.dgm-edge`
   / `.dgm-node` rules in app/globals.css - not duplicated or touched here).
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
    if (typeof IntersectionObserver === "undefined" || window.innerHeight === 0) {
      setInView(true);
      return;
    }
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
        <text x={cx} y={titleY + 31} textAnchor="middle" fontFamily={F} fontSize={11} fontWeight={700} fill={t.sub}>
          {sub2}
        </text>
      ) : null}
    </g>
  );
}

/** small warning badge that sits on a box's top edge (anti-pattern accent) */
function Warn({ cx, cy }: { cx: number; cy: number }) {
  return (
    <g transform={`translate(${cx - 10},${cy - 11})`}>
      <path d="M10 0 L20 19 L0 19 Z" fill={C.bad} stroke="#ffffff" strokeWidth={1.2} strokeLinejoin="round" />
      <rect x={9} y={6.5} width={2} height={6.5} rx={1} fill="#ffffff" />
      <rect x={9} y={14.5} width={2} height={2} rx={1} fill="#ffffff" />
    </g>
  );
}

/** small ShieldSync-style shield badge (used on hub / correct-answer boxes) */
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
  tone?: "arrow" | "brand" | "bad" | "ok"; dashed?: boolean;
}) {
  const stroke = tone === "brand" ? C.brand : tone === "bad" ? C.badLine : tone === "ok" ? C.okLine : C.arrow;
  const marker =
    tone === "brand" ? "url(#dap-ah-brand)" : tone === "bad" ? "url(#dap-ah-bad)" : tone === "ok" ? "url(#dap-ah-ok)" : "url(#dap-ah)";
  return (
    <g>
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

/** a plain strike-through line (no arrowhead) that draws itself in, for the elimination drill */
function Strike({ x1, y1, x2, y2, d = 0 }: { x1: number; y1: number; x2: number; y2: number; d?: number }) {
  return (
    <path
      className="dgm-edge"
      style={{ animationDelay: `${d}ms` }}
      d={`M${x1},${y1} L${x2},${y2}`}
      fill="none"
      stroke={C.bad}
      strokeWidth={3.5}
      strokeLinecap="round"
    />
  );
}

function Defs() {
  return (
    <defs>
      {(
        [
          ["dap-ah", C.arrow],
          ["dap-ah-brand", C.brand],
          ["dap-ah-bad", C.badLine],
          ["dap-ah-ok", C.okLine],
        ] as const
      ).map(([id, fill]) => (
        <marker key={id} id={id} viewBox="0 0 10 10" refX="8.5" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M0,0 L10,5 L0,10 z" fill={fill} />
        </marker>
      ))}
    </defs>
  );
}

function FlowDot({ path, dur, begin = "0s", r = 4, color = C.bad }: { path: string; dur: string; begin?: string; r?: number; color?: string }) {
  return (
    <circle r={r} fill={color} opacity={0.9}>
      <animateMotion dur={dur} begin={begin} repeatCount="indefinite" path={path} rotate="none" />
    </circle>
  );
}

/* ---- 1. The 7 anti-patterns, at a glance ------------------------------------ */

export function AntiPatternsOverviewDiagram() {
  const hub = { cx: 450, cy: 280, w: 236, h: 92 };
  const satellites: Array<{
    cx: number; cy: number; title: string; sub: string; from: [number, number]; to: [number, number]; d: number;
  }> = [
    { cx: 450, cy: 80, title: "#1 Prompt-based rules", sub: "hooks enforce, prompts suggest", from: [450, 124], to: [450, 236], d: 150 },
    { cx: 708, cy: 155, title: "#2 Confidence as trigger", sub: "objective triggers only", from: [652, 199], to: [545, 240], d: 300 },
    { cx: 772, cy: 325, title: "#3 Batch API misuse", sub: "async & deadline-tolerant only", from: [677, 325], to: [566, 300], d: 450 },
    { cx: 593, cy: 460, title: "#4 Bigger context window", sub: "restructure, don't just grow", from: [560, 416], to: [520, 326], d: 600 },
    { cx: 307, cy: 460, title: "#5 Silent tool failure", sub: "structured errors, always", from: [340, 416], to: [382, 326], d: 750 },
    { cx: 128, cy: 325, title: "#6 Unrestricted tools", sub: "scope tools per role", from: [223, 325], to: [334, 310], d: 900 },
    { cx: 192, cy: 155, title: "#7 Flat topology", sub: "hub-and-spoke, not peers", from: [250, 199], to: [365, 240], d: 1050 },
  ];
  return (
    <Dgm
      label="The seven CCA-F anti-patterns feeding the exam's wrong-answer options"
      caption="Fig 7.0 - All seven anti-patterns at a glance. Three or four options on any given question are drawn from this set - recognise the shape, eliminate the option."
      viewBox="0 0 900 540"
      dots={() => (
        <>
          <FlowDot path="M450,124 L450,236" dur="2.4s" />
          <FlowDot path="M560,416 L520,326" dur="2.4s" begin="0.8s" />
          <FlowDot path="M223,325 L334,310" dur="2.4s" begin="1.6s" />
        </>
      )}
    >
      <Defs />
      {satellites.map((s) => (
        <Arrow key={s.title} path={`M${s.from[0]},${s.from[1]} L${s.to[0]},${s.to[1]}`} tone="bad" d={Math.max(0, s.d - 100)} />
      ))}
      <Box x={hub.cx - hub.w / 2} y={hub.cy - hub.h / 2} w={hub.w} h={hub.h} tone="brand" title="Wrong-answer generator" sub="3-4 of 4 options recycle these 7 mistakes" d={0} shield />
      {satellites.map((s) => (
        <g key={s.title}>
          <Box x={s.cx - 95} y={s.cy - 44} w={190} h={88} tone="bad" title={s.title} sub={s.sub} d={s.d} />
          <g className="dgm-node" style={{ transitionDelay: `${s.d}ms` }}>
            <Warn cx={s.cx + 95 - 16} cy={s.cy - 44} />
          </g>
        </g>
      ))}
    </Dgm>
  );
}

/* ---- 2. The rapid elimination drill ------------------------------------------ */

export function EliminationDrillDiagram() {
  const boxes = [
    {
      x: 30,
      title: "A. Empty summary",
      sub: "pipeline keeps moving",
      sub2: "#5 silent failure",
      tone: "bad" as const,
      strikeDelay: 400,
    },
    {
      x: 240,
      title: "B. Escalate on confidence",
      sub: "human if <70% sure",
      sub2: "#2 confidence trigger",
      tone: "bad" as const,
      strikeDelay: 1000,
    },
    {
      x: 450,
      title: "C. Route straight to writer",
      sub: "skip the coordinator",
      sub2: "#7 flat topology",
      tone: "bad" as const,
      strikeDelay: 1600,
    },
    {
      x: 660,
      title: "D. Structured retry",
      sub: "is_error: timeout, retryable",
      sub2: "correct pattern",
      tone: "ok" as const,
      strikeDelay: 0,
    },
  ];
  const boxY = 130;
  const boxW = 185;
  const boxH = 170;
  return (
    <Dgm
      label="Elimination drill: three answer options struck through as anti-patterns, one correct option survives"
      caption="Fig 7.8 - The drill in slow motion: three options fall to a named anti-pattern in sequence, one survives. In the exam this takes under ten seconds."
      viewBox="0 0 880 400"
      dots={() => null}
    >
      <Defs />
      <text x={440} y={34} textAnchor="middle" fontFamily={F} fontSize={13.5} fontWeight={700} fill={C.ink}>
        Multi-Agent Research System - a subagent&apos;s fetch tool times out mid-task
      </text>
      <text x={440} y={56} textAnchor="middle" fontFamily={F} fontSize={12} fill={C.muted}>
        Which response is architecturally correct?
      </text>

      {boxes.map((b, i) => (
        <Box key={b.title} x={b.x} y={boxY} w={boxW} h={boxH} tone={b.tone} title={b.title} sub={b.sub} sub2={b.sub2} d={i * 150} shield={b.tone === "ok"} />
      ))}

      {/* strike-throughs draw in, one after another, over the three wrong options */}
      <Strike x1={boxes[0].x + 14} y1={boxY + 20} x2={boxes[0].x + boxW - 14} y2={boxY + boxH - 20} d={boxes[0].strikeDelay} />
      <Strike x1={boxes[1].x + 14} y1={boxY + 20} x2={boxes[1].x + boxW - 14} y2={boxY + boxH - 20} d={boxes[1].strikeDelay} />
      <Strike x1={boxes[2].x + 14} y1={boxY + 20} x2={boxes[2].x + boxW - 14} y2={boxY + boxH - 20} d={boxes[2].strikeDelay} />

      <g className="dgm-node" style={{ transitionDelay: "1900ms" }}>
        <text x={boxes[3].x + boxW / 2} y={boxY + boxH + 26} textAnchor="middle" fontFamily={F} fontSize={12} fontWeight={700} fill={C.ok}>
          survives - the correct answer
        </text>
      </g>
    </Dgm>
  );
}
