"use client";

/* ----------------------------------------------------------------------------
   Animated diagrams for the "6 Exam Scenarios" lesson. Self-contained copy of
   the course-diagrams.tsx pattern (Azure-docs flow style: flat boxes, labeled
   arrows, SMIL flow dots, one-time scroll reveal, prefers-reduced-motion
   handled via the shared `.dgm` / `.dgm-in` / `.dgm-edge` / `.dgm-node`
   classes in globals.css). Deliberately does NOT import from
   components/course-diagrams.tsx so this lesson's diagrams stay independent.
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

/** dimmed variant of Box - used for the 2 scenarios NOT drawn in an example sitting */
function DimBox(props: Parameters<typeof Box>[0]) {
  return (
    <g opacity={0.4}>
      <Box {...props} />
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
  const marker = tone === "brand" ? "url(#dgms-ah-brand)" : tone === "bad" ? "url(#dgms-ah-bad)" : "url(#dgms-ah)";
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
          ["dgms-ah", C.arrow],
          ["dgms-ah-brand", C.brand],
          ["dgms-ah-bad", C.badLine],
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

/* ---- 1. Scenario -> Domain map (the lesson's signature diagram) ------------ */

export function ScenarioDomainMapDiagram() {
  // scenario column (left)
  const S = {
    s1: { y: 34, cy: 64 }, // Customer Support Resolution Agent
    s2: { y: 108, cy: 138 }, // Code Generation with Claude Code
    s3: { y: 182, cy: 212 }, // Multi-Agent Research System
    s4: { y: 256, cy: 286 }, // Developer Productivity with Claude
    s5: { y: 330, cy: 360 }, // Claude Code for Continuous Integration
    s6: { y: 404, cy: 434 }, // Structured Data Extraction
  };
  // domain column (right)
  const D = {
    d1: { y: 34, cy: 69 }, // Domain 1
    d2: { y: 122, cy: 157 }, // Domain 2
    d3: { y: 210, cy: 245 }, // Domain 3
    d4: { y: 298, cy: 333 }, // Domain 4
    d5: { y: 386, cy: 421 }, // Domain 5
  };
  const curve = (sy: number, dy: number) => `M280,${sy} C400,${sy} 490,${dy} 610,${dy}`;

  return (
    <Dgm
      label="Map from each of the 6 exam scenarios to the domains it draws on most heavily"
      caption="Fig 6.1 - Every scenario is a costume worn by one or two domains. Recognise the scenario in the question stem and you already know which concepts and anti-patterns are in play."
      viewBox="0 0 900 480"
      dots={() => (
        <>
          <FlowDot path={curve(S.s1.cy, D.d1.cy)} dur="2.4s" />
          <FlowDot path={curve(S.s3.cy, D.d5.cy)} dur="2.4s" begin="0.8s" />
          <FlowDot path={curve(S.s6.cy, D.d4.cy)} dur="2.4s" begin="1.6s" />
        </>
      )}
    >
      <Defs />
      <text x={150} y={18} textAnchor="middle" fontFamily={F} fontSize={13} fontWeight={700} fill={C.brandDark}>
        6 exam scenarios
      </text>
      <text x={745} y={18} textAnchor="middle" fontFamily={F} fontSize={13} fontWeight={700} fill={C.brandDark}>
        5 CCA-F domains
      </text>

      {/* scenario boxes */}
      <Box x={20} y={S.s1.y} w={260} h={60} tone="tint" title="Customer Support" sub="Resolution Agent" d={0} />
      <Box x={20} y={S.s2.y} w={260} h={60} tone="tint" title="Code Generation" sub="with Claude Code" d={60} />
      <Box x={20} y={S.s3.y} w={260} h={60} tone="tint" title="Multi-Agent" sub="Research System" d={120} />
      <Box x={20} y={S.s4.y} w={260} h={60} tone="tint" title="Developer" sub="Productivity Tools" d={180} />
      <Box x={20} y={S.s5.y} w={260} h={60} tone="tint" title="Claude Code" sub="in CI/CD" d={240} />
      <Box x={20} y={S.s6.y} w={260} h={60} tone="tint" title="Structured Data" sub="Extraction" d={300} />

      {/* domain boxes */}
      <Box x={610} y={D.d1.y} w={270} h={70} tone="brand" title="Domain 1" sub="Agentic Architecture" sub2="27% of exam" d={100} shield />
      <Box x={610} y={D.d2.y} w={270} h={70} tone="brand" title="Domain 2" sub="Tool Design & MCP" sub2="18% of exam" d={160} shield />
      <Box x={610} y={D.d3.y} w={270} h={70} tone="brand" title="Domain 3" sub="Claude Code Config" sub2="20% of exam" d={220} shield />
      <Box x={610} y={D.d4.y} w={270} h={70} tone="brand" title="Domain 4" sub="Structured Output" sub2="20% of exam" d={280} shield />
      <Box x={610} y={D.d5.y} w={270} h={70} tone="brand" title="Domain 5" sub="Context & Reliability" sub2="15% of exam" d={340} shield />

      {/* mappings */}
      <Arrow path={curve(S.s1.cy, D.d1.cy)} d={420} tone="brand" />
      <Arrow path={curve(S.s1.cy, D.d5.cy)} d={460} tone="brand" />
      <Arrow path={curve(S.s2.cy, D.d3.cy)} d={500} tone="brand" />
      <Arrow path={curve(S.s3.cy, D.d1.cy)} d={540} tone="brand" />
      <Arrow path={curve(S.s3.cy, D.d5.cy)} d={580} tone="brand" />
      <Arrow path={curve(S.s4.cy, D.d2.cy)} d={620} tone="brand" />
      <Arrow path={curve(S.s4.cy, D.d1.cy)} d={660} tone="brand" />
      <Arrow path={curve(S.s5.cy, D.d3.cy)} d={700} tone="brand" />
      <Arrow path={curve(S.s6.cy, D.d4.cy)} d={740} tone="brand" />
    </Dgm>
  );
}

/* ---- 2. The exam draw: 4 of 6, at random ------------------------------------ */

export function ExamDrawDiagram() {
  // top row: S1, S2, S3 (S3 dimmed - not drawn this example sitting)
  // bottom row: S4, S5, S6 (S6 dimmed - not drawn this example sitting)
  return (
    <Dgm
      label="A pool of 6 scenarios; each sitting draws 4 at random, leaving 2 unselected"
      caption="Fig 6.2 - An example draw only. The real draw is random every sitting - any of the 6 can be one of your four, so none can be skipped in preparation."
      viewBox="0 0 880 380"
      dots={() => (
        <>
          <FlowDot path="M155,110 C170,190 260,235 335,268" dur="2.6s" />
          <FlowDot path="M425,110 C425,180 415,230 400,268" dur="2.6s" begin="0.6s" />
          <FlowDot path="M155,220 C220,245 300,258 350,270" dur="2.6s" begin="1.2s" />
          <FlowDot path="M425,220 C440,242 465,255 485,270" dur="2.6s" begin="1.8s" />
        </>
      )}
    >
      <Defs />
      <text x={440} y={18} textAnchor="middle" fontFamily={F} fontSize={13} fontWeight={700} fill={C.brandDark}>
        The pool of 6 scenarios (example draw for this sitting)
      </text>

      {/* selected - brand tone, feed into "Your exam" */}
      <Box x={30} y={30} w={250} h={80} tone="brand" title="Customer Support" sub="Resolution Agent" sub2="selected" d={0} shield />
      <Box x={300} y={30} w={250} h={80} tone="brand" title="Code Generation" sub="with Claude Code" sub2="selected" d={80} shield />
      <Box x={30} y={140} w={250} h={80} tone="brand" title="Developer" sub="Productivity Tools" sub2="selected" d={160} shield />
      <Box x={300} y={140} w={250} h={80} tone="brand" title="Claude Code" sub="in CI/CD" sub2="selected" d={240} />

      {/* unselected - dimmed, no line into the exam */}
      <DimBox x={570} y={30} w={250} h={80} tone="neutral" title="Multi-Agent" sub="Research System" sub2="not drawn" d={320} />
      <DimBox x={570} y={140} w={250} h={80} tone="neutral" title="Structured Data" sub="Extraction" sub2="not drawn" d={360} />

      <Arrow path="M155,110 C170,190 260,235 335,268" d={420} tone="brand" />
      <Arrow path="M425,110 C425,180 415,230 400,268" d={460} tone="brand" />
      <Arrow path="M155,220 C220,245 300,258 350,270" d={500} tone="brand" />
      <Arrow path="M425,220 C440,242 465,255 485,270" d={540} tone="brand" />

      <Box x={290} y={272} w={300} h={64} tone="ok" title="Your exam: 4 scenarios drawn" sub="60 questions framed inside them" d={600} shield />

      <text x={695} y={240} textAnchor="middle" fontFamily={F} fontSize={11} fill={C.muted}>
        study every scenario -
      </text>
      <text x={695} y={256} textAnchor="middle" fontFamily={F} fontSize={11} fill={C.muted}>
        the draw changes each sitting
      </text>
    </Dgm>
  );
}
