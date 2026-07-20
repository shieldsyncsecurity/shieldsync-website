"use client";

/* ----------------------------------------------------------------------------
   Animated architecture diagrams for the Domain 3 (Claude Code Configuration &
   Workflows) lesson. Self-contained copy of the course-diagrams.tsx pattern
   (that file does not export its primitives, so this one re-implements the
   same shell/Box/Arrow/Shield/Defs/FlowDot contract rather than importing).
   Animation contract: one-time scroll-reveal, connectors draw themselves,
   small "request" dots flow along the primary path; prefers-reduced-motion
   disables all of it. Animation CSS lives in globals.css under the `dgm-`
   prefix (`.dgm` / `.dgm-in` / `.dgm-edge` / `.dgm-node`) - not touched here.
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
  tone?: "arrow" | "brand" | "bad" | "ok"; dashed?: boolean;
}) {
  const stroke = tone === "brand" ? C.brand : tone === "bad" ? C.badLine : tone === "ok" ? C.okLine : C.arrow;
  const marker =
    tone === "brand" ? "url(#dgmcc-ah-brand)" : tone === "bad" ? "url(#dgmcc-ah-bad)" : tone === "ok" ? "url(#dgmcc-ah-ok)" : "url(#dgmcc-ah)";
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
          ["dgmcc-ah", C.arrow],
          ["dgmcc-ah-brand", C.brand],
          ["dgmcc-ah-bad", C.badLine],
          ["dgmcc-ah-ok", C.okLine],
        ] as const
      ).map(([id, fill]) => (
        <marker key={id} id={id} viewBox="0 0 10 10" refX="8.5" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M0,0 L10,5 L0,10 z" fill={fill} />
        </marker>
      ))}
    </defs>
  );
}

function FlowDot({ path, dur, begin = "0s", r = 4, color = C.brand }: { path: string; dur: string; begin?: string; r?: number; color?: string }) {
  return (
    <circle r={r} fill={color} opacity={0.9}>
      <animateMotion dur={dur} begin={begin} repeatCount="indefinite" path={path} rotate="none" />
    </circle>
  );
}

/** simple red X mark used to cross out an anti-pattern box */
function CrossOut({ x, y, w, h, d = 0 }: { x: number; y: number; w: number; h: number; d?: number }) {
  return (
    <g className="dgm-node" style={{ transitionDelay: `${d}ms` }}>
      <line x1={x + 8} y1={y + 8} x2={x + w - 8} y2={y + h - 8} stroke={C.bad} strokeWidth={2} strokeLinecap="round" opacity={0.55} />
      <line x1={x + w - 8} y1={y + 8} x2={x + 8} y2={y + h - 8} stroke={C.bad} strokeWidth={2} strokeLinecap="round" opacity={0.55} />
    </g>
  );
}

/* ---- 1. CLAUDE.md hierarchy -------------------------------------------------- */

export function ClaudeMdHierarchyDiagram() {
  return (
    <Dgm
      label="CLAUDE.md hierarchy: user-level and project-level files both feed a Claude Code session, with an at-path import shown"
      caption="Fig 3.1 - CLAUDE.md hierarchy: project-level is shared and version-controlled; user-level is personal and follows you across every project. @path imports pull in extra files at either level."
      viewBox="0 0 900 320"
      dots={() => (
        <>
          <FlowDot path="M155,100 C155,170 300,190 350,228" dur="2.4s" />
          <FlowDot path="M595,100 C595,170 460,190 420,228" dur="2.4s" begin="0.8s" />
          <FlowDot path="M595,100 L630,150" dur="1.8s" begin="1.4s" r={3.5} />
        </>
      )}
    >
      <Defs />
      <Box x={30} y={26} w={250} h={74} tone="tint" title="~/.claude/CLAUDE.md" sub="user-level: personal preferences" sub2="NOT committed, applies to every project" d={0} />
      <Box x={470} y={26} w={250} h={74} tone="tint" title="CLAUDE.md (repo root)" sub="project-level: team standards" sub2="version-controlled, shared with the team" d={150} />

      <Arrow path="M595,100 L630,150" label="@path/to/file" lx={700} ly={116} d={350} tone="brand" dashed />
      <Box x={520} y={150} w={230} h={54} tone="neutral" title="docs/architecture.md" sub="pulled in via @import syntax" d={500} />

      <Arrow path="M155,100 C155,170 300,190 350,228" d={550} tone="brand" />
      <Arrow path="M595,100 C595,170 460,190 420,228" label="both load at session start" lx={520} ly={214} d={700} tone="brand" />

      <Box x={210} y={232} w={460} h={70} tone="brand" title="Claude Code session" sub="effective context = project CLAUDE.md + user CLAUDE.md (+ imports)" d={850} shield />

      <text x={155} y={288} textAnchor="middle" fontFamily={F} fontSize={11} fill={C.muted}>
        &quot;my personal preference, every project&quot; -&gt; user-level
      </text>
      <text x={595} y={288} textAnchor="middle" fontFamily={F} fontSize={11} fill={C.muted}>
        &quot;shared team standard&quot; -&gt; project-level
      </text>
    </Dgm>
  );
}

/* ---- 2. Plan mode vs direct execution --------------------------------------- */

export function PlanVsDirectDiagram() {
  return (
    <Dgm
      label="Decision diagram: small well-defined low-risk tasks go straight to direct execution, large ambiguous high-risk tasks go through plan mode's propose-approve-execute sequence"
      caption="Fig 3.4 - Match the mode to blast radius and ambiguity, not a rule of thumb. Plan mode adds a propose -> approve -> execute gate; direct execution skips straight to editing."
      viewBox="0 0 900 400"
      dots={() => (
        <>
          <FlowDot path="M420,80 C420,120 180,120 180,144" dur="2s" color={C.ok} />
          <FlowDot path="M480,80 C480,120 700,120 700,144" dur="2s" begin="0.6s" />
          <FlowDot path="M700,198 L700,214" dur="1.4s" begin="1.4s" />
          <FlowDot path="M700,268 L700,284" dur="1.4s" begin="2s" />
        </>
      )}
    >
      <Defs />
      <Box x={360} y={20} w={180} h={60} tone="brand" title="Incoming task" sub="how big? how ambiguous? how risky?" d={0} shield />

      <Arrow path="M420,80 C420,120 180,120 180,144" label="small, well-defined, low-risk?" lx={230} ly={112} d={200} tone="ok" />
      <Arrow path="M480,80 C480,120 700,120 700,144" label="large, ambiguous, high-risk?" lx={660} ly={112} d={300} tone="brand" />

      <Box x={60} y={144} w={240} h={56} tone="ok" title="Direct execution" sub="edit the file(s) immediately" d={400} />
      <Arrow path="M180,200 L180,244" d={550} tone="ok" />
      <Box x={60} y={248} w={240} h={54} tone="ok" title="Change shipped" sub="small blast radius, nothing ambiguous to get wrong" d={700} />

      <Box x={580} y={144} w={240} h={54} tone="brand" title="Propose plan" sub="Claude drafts the approach - no files touched yet" d={450} shield />
      <Arrow path="M700,198 L700,214" d={600} tone="brand" />
      <Box x={580} y={214} w={240} h={54} tone="brand" title="User approves (or edits) the plan" sub="explicit go-ahead required" d={750} />
      <Arrow path="M700,268 L700,284" d={900} tone="brand" />
      <Box x={580} y={284} w={240} h={54} tone="brand" title="Execute" sub="now files are edited, plan as the guide" d={1050} />

      <Box x={140} y={352} w={620} h={38} tone="bad" title="Wrong both ways: plan mode for a one-line fix (pure overhead) - direct execution for a 12-file refactor (unreviewed risk)" d={1200} />
    </Dgm>
  );
}

/* ---- 3. Headless mode for CI/CD ---------------------------------------------- */

export function HeadlessCiDiagram() {
  return (
    <Dgm
      label="Headless CI diagram: a CI pipeline invokes claude with the print flag and JSON output format, producing a structured result a bot posts as a PR comment, contrasted with a crossed-out interactive mode path that hangs on a CI runner"
      caption="Fig 3.5/3.6 - Headless -p plus --output-format json gives CI a structured, machine-parseable envelope. Interactive mode on a runner waits for a terminal that never responds."
      viewBox="0 0 900 300"
      dots={() => (
        <>
          <FlowDot path="M230,70 L280,70" dur="1.4s" />
          <FlowDot path="M560,70 L610,70" dur="1.4s" begin="0.5s" />
          <FlowDot path="M720,100 L720,140" dur="1.2s" begin="1s" />
        </>
      )}
    >
      <Defs />
      <Box x={30} y={40} w={200} h={60} tone="neutral" title="CI pipeline" sub="PR opened / updated" d={0} />
      <Arrow path="M230,70 L280,70" label={`claude -p "review this diff" --output-format json`} lx={445} ly={56} d={150} tone="brand" />
      <Box x={280} y={30} w={280} h={80} tone="brand" title="Headless Claude Code" sub="-p: non-interactive, no terminal session" sub2="fresh session per PR - no cross-run context" d={250} shield />
      <Arrow path="M560,70 L610,70" d={400} tone="brand" />
      <Box x={610} y={40} w={220} h={60} tone="tint" title="Structured JSON result" sub="result text + cost + session id" d={500} />
      <Arrow path="M720,100 L720,140" label="parsed reliably, no regex" lx={790} ly={124} d={650} tone="ok" />
      <Box x={610} y={144} w={220} h={54} tone="ok" title="Bot posts PR comment" sub="structured findings, not free text" d={800} />

      <Arrow path="M170,100 C170,170 280,170 280,224" label="interactive mode" lx={230} ly={186} d={950} tone="bad" dashed />
      <Box x={280} y={200} w={280} h={64} tone="bad" title="Interactive claude on a CI runner" sub="waits on a terminal prompt that never comes" sub2="pipeline hangs until timeout" d={1100} />
      <CrossOut x={280} y={200} w={280} h={64} d={1150} />

      <text x={720} y={280} textAnchor="middle" fontFamily={F} fontSize={11} fill={C.muted}>
        default free-text stdout = fragile regex parsing downstream
      </text>
    </Dgm>
  );
}
