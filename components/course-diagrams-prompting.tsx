"use client";

/* ----------------------------------------------------------------------------
   Animated architecture diagrams for the CCA-F free course, Domain 4 lesson
   (Prompt Engineering & Structured Output). Self-contained clone of the
   course-diagrams.tsx pattern — same Dgm scroll-reveal wrapper, Box/Arrow/
   Shield/Defs/FlowDot primitives, indigo/blue palette, SMIL flow dots,
   prefers-reduced-motion handling via globals.css `.dgm`/`.dgm-in`/`.dgm-edge`/
   `.dgm-node` classes. Deliberately does not import from course-diagrams.tsx.
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
  const marker = tone === "brand" ? "url(#dgmp-ah-brand)" : tone === "bad" ? "url(#dgmp-ah-bad)" : "url(#dgmp-ah)";
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
          ["dgmp-ah", C.arrow],
          ["dgmp-ah-brand", C.brand],
          ["dgmp-ah-bad", C.badLine],
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

/* ---- 1. Plain-text JSON ask vs tool_use with input_schema ------------------- */

export function StructuredOutputDiagram() {
  return (
    <Dgm
      label="Plain-text JSON request versus tool_use with input_schema for structured output"
      caption="Fig 4.3 — Asking for JSON in plain text produces free text that merely contains JSON somewhere; tool_use with input_schema is validated server-side before it ever reaches your parser."
      viewBox="0 0 900 300"
      dots={() => (
        <>
          <FlowDot path="M200,78 L260,78" dur="1.8s" />
          <FlowDot path="M390,78 L450,78" dur="1.8s" begin="0.5s" />
          <FlowDot path="M670,78 L730,78" dur="1.8s" begin="1s" />
          <FlowDot path="M200,238 L260,238" dur="1.8s" />
          <FlowDot path="M390,238 L450,238" dur="1.8s" begin="0.5s" />
          <FlowDot path="M670,238 L730,238" dur="1.8s" begin="1s" />
        </>
      )}
    >
      <Defs />
      <text x={30} y={26} fontFamily={F} fontSize={12.5} fontWeight={700} fill={C.bad}>
        "Please respond in JSON" — anti-pattern
      </text>
      <Box x={30} y={50} w={170} h={56} tone="neutral" title="Plain-text prompt" sub="ask for JSON in prose" d={0} />
      <Arrow path="M200,78 L260,78" d={150} />
      <Box x={264} y={50} w={126} h={56} tone="neutral" title="Claude" d={200} />
      <Arrow path="M390,78 L450,78" d={350} />
      <Box x={454} y={44} w={216} h={68} tone="bad" title="Free text with JSON somewhere" sub="extra prose, maybe malformed" d={400} />
      <Arrow path="M670,78 L730,78" label="fragile" lx={700} ly={62} d={550} tone="bad" />
      <Box x={734} y={50} w={140} h={56} tone="bad" title="Fragile parser" sub="regex / trim hacks" d={650} />

      <line x1={20} y1={160} x2={880} y2={160} stroke={C.neutralLine} strokeWidth={1.3} strokeDasharray="4 4" />

      <text x={30} y={186} fontFamily={F} fontSize={12.5} fontWeight={700} fill={C.brandDark}>
        tool_use with input_schema — reliable
      </text>
      <Box x={30} y={210} w={170} h={56} tone="brand" title="Tool schema request" sub="input_schema JSON" d={0} shield />
      <Arrow path="M200,238 L260,238" d={150} tone="brand" />
      <Box x={264} y={210} w={126} h={56} tone="tint" title="Claude" d={200} />
      <Arrow path="M390,238 L450,238" d={350} tone="brand" />
      <Box x={454} y={204} w={216} h={68} tone="ok" title="Schema-validated tool_use" sub="args match schema server-side" d={400} />
      <Arrow path="M670,238 L730,238" label="reliable" lx={700} ly={222} d={550} tone="brand" />
      <Box x={734} y={210} w={140} h={56} tone="ok" title="Reliable parser" sub="tool_use.input, typed" d={650} />
    </Dgm>
  );
}

/* ---- 2. Validation-retry loop, bounded ------------------------------------- */

export function ValidationRetryLoopDiagram() {
  const loopPath = "M340,232 L150,232 L150,100";
  return (
    <Dgm
      label="Validation-retry loop: extract, validate, retry with the error appended, bounded, then accept or escalate"
      caption="Fig 4.5 — A bounded validation-retry loop. Failed validation feeds the error back into the prompt so the model can self-correct, capped at a small retry count before escalating to a human."
      viewBox="0 0 900 320"
      dots={() => (
        <>
          <FlowDot path="M214,100 L280,100" dur="1.6s" />
          <FlowDot path="M474,100 L560,100" dur="1.6s" begin="0.6s" />
          <FlowDot path={loopPath} dur="2.6s" begin="1.2s" r={3.5} />
        </>
      )}
    >
      <Defs />
      <Box x={40} y={70} w={174} h={60} tone="brand" title="Extract" sub="structured output call" d={0} shield />
      <Arrow path="M214,100 L280,100" d={150} />
      <Box x={284} y={70} w={190} h={60} tone="tint" title="Validate" sub="schema + business rules" d={250} />

      <Arrow path="M474,100 L560,100" label="pass" lx={517} ly={88} d={450} tone="brand" />
      <Box x={564} y={70} w={210} h={60} tone="ok" title="Accept & downstream" sub="validated record" d={550} />

      <Arrow path="M379,130 L379,196" label="fail (validation error)" lx={379} ly={166} d={650} tone="bad" />
      <Box x={284} y={200} w={190} h={60} tone="bad" title="Append error to prompt" sub="e.g. due_date &lt; invoice_date" d={750} />

      <Arrow path={loopPath} label="retry (error in context)" lx={225} ly={222} d={900} tone="bad" dashed />

      <Box x={564} y={200} w={210} h={60} tone="neutral" title="Bounded: max_retries = 3" sub="then flag for human review" d={1050} />
    </Dgm>
  );
}

/* ---- 3. Batch API vs real-time API selection -------------------------------- */

export function BatchVsRealtimeDiagram() {
  return (
    <Dgm
      label="Deciding between the real-time Messages API and the Message Batches API based on whether anyone is waiting synchronously"
      caption="Fig 4.6 — The deciding factor is synchronous waiting, not request volume. Routing a live, user-facing reply through the Batches API is the anti-pattern: it has no real-time SLA."
      viewBox="0 0 900 320"
      dots={() => (
        <>
          <FlowDot path="M420,90 L230,150" dur="1.8s" />
          <FlowDot path="M480,90 L670,150" dur="1.8s" begin="0.6s" />
        </>
      )}
    >
      <Defs />
      <Box x={310} y={26} w={280} h={64} tone="brand" title="Is anyone waiting synchronously?" sub="the deciding factor" d={0} shield />

      <Arrow path="M420,90 L230,150" label="yes" lx={300} ly={112} d={250} tone="brand" />
      <Box x={90} y={154} w={260} h={70} tone="tint" title="Real-time Messages API" sub="full per-token price, immediate response" d={400} />
      <Box x={90} y={240} w={260} h={54} tone="ok" title="live chat, user-facing agent" d={550} />

      <Arrow path="M480,90 L670,150" label="no" lx={600} ly={112} d={250} tone="brand" />
      <Box x={540} y={154} w={270} h={70} tone="tint" title="Message Batches API" sub="~50% lower cost, results within 24h" d={400} />
      <Box x={540} y={240} w={270} h={54} tone="ok" title="nightly extraction, deadline-tolerant" d={550} />

      <Arrow path="M350,189 C440,220 460,220 538,192" label="ANTI-PATTERN: user waiting, routed to Batch anyway" lx={444} ly={236} d={800} tone="bad" dashed />
      <text x={444} y={210} textAnchor="middle" fontFamily={F} fontSize={16} fontWeight={700} fill={C.bad} className="dgm-node" style={{ transitionDelay: "950ms" }}>
        ✗
      </text>
    </Dgm>
  );
}
