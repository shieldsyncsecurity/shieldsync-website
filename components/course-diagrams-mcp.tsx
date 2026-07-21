"use client";

/* ----------------------------------------------------------------------------
   Animated diagrams for the Domain 2 (Tool Design & MCP Integration) lesson.
   Self-contained copy of the course-diagrams.tsx pattern - its own Dgm shell,
   primitives (Box/Arrow/Shield/Defs/FlowDot) and palette, since those are not
   exported from course-diagrams.tsx. Same motion contract: one-time
   scroll-reveal via IntersectionObserver (dead-observer timeout fallback),
   SMIL flow dots along key paths, prefers-reduced-motion handled by the
   shared `.dgm` / `.dgm-in` / `.dgm-edge` / `.dgm-node` CSS in globals.css.
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
  const marker = tone === "brand" ? "url(#dgm-mcp-ah-brand)" : tone === "bad" ? "url(#dgm-mcp-ah-bad)" : "url(#dgm-mcp-ah)";
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
          ["dgm-mcp-ah", C.arrow],
          ["dgm-mcp-ah-brand", C.brand],
          ["dgm-mcp-ah-bad", C.badLine],
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

/* ---- 1. MCP's three primitives --------------------------------------------- */

export function MCPPrimitivesDiagram() {
  return (
    <Dgm
      label="An MCP server exposes three primitive types: tools (model-invoked), resources (app-controlled), prompts (user-controlled)"
      caption="Fig 2.2 - MCP's three primitives, and who controls each. Tools are the only primitive the model itself decides to invoke."
      viewBox="0 0 880 330"
      dots={() => (
        <>
          <FlowDot path="M400,88 L155,180" dur="2.2s" />
          <FlowDot path="M440,88 L440,180" dur="2.2s" begin="0.7s" />
          <FlowDot path="M480,88 L725,180" dur="2.2s" begin="1.4s" />
        </>
      )}
    >
      <Defs />
      <Box x={330} y={24} w={220} h={64} tone="brand" title="MCP Server" sub="one process, three primitive types" d={0} shield />

      <Arrow path="M400,88 L155,180" label="model decides" lx={230} ly={140} d={200} tone="brand" />
      <Arrow path="M440,88 L440,180" label="host attaches to context" lx={440} ly={140} d={350} tone="brand" />
      <Arrow path="M480,88 L725,180" label="user selects template" lx={648} ly={140} d={500} tone="brand" />

      <Box x={40} y={184} w={230} h={110} tone="tint" title="Tools" sub="model-invoked functions" sub2="controlled by: the model" d={280} />
      <Box x={325} y={184} w={230} h={110} tone="tint" title="Resources" sub="app-controlled context data" sub2="controlled by: the host app" d={430} />
      <Box x={610} y={184} w={230} h={110} tone="tint" title="Prompts" sub="user-selected templates" sub2="controlled by: the user" d={580} />

      <text x={155} y={318} textAnchor="middle" fontFamily={F} fontSize={10.5} fill={C.muted}>
        e.g. run_query(sql)
      </text>
      <text x={440} y={318} textAnchor="middle" fontFamily={F} fontSize={10.5} fill={C.muted}>
        e.g. a file, a DB record
      </text>
      <text x={725} y={318} textAnchor="middle" fontFamily={F} fontSize={10.5} fill={C.muted}>
        e.g. /summarize-ticket
      </text>
    </Dgm>
  );
}

/* ---- 2. Tool descriptions drive selection ----------------------------------- */

export function ToolSelectionDiagram() {
  return (
    <Dgm
      label="Vague tool descriptions cause ambiguous tool selection; precise descriptions with explicit non-use cases cause a clean single match"
      caption="Fig 2.3 - The description field is the only signal Claude has. Vague, overlapping wording produces an ambiguous choice; precise wording (including what NOT to use a tool for) produces exactly one match."
      viewBox="0 0 880 320"
      dots={() => <FlowDot path="M645,94 L645,166" dur="1.8s" />}
    >
      <Defs />
      <text x={205} y={28} textAnchor="middle" fontFamily={F} fontSize={13.5} fontWeight={700} fill={C.bad}>
        Vague descriptions - ambiguous selection
      </text>
      <Box x={125} y={40} w={160} h={54} tone="neutral" title="Claude" sub="which tool matches?" d={0} />
      <Box x={30} y={166} w={150} h={80} tone="bad" title="search_docs" sub={'"searches stuff"'} d={200} />
      <Box x={200} y={166} w={150} h={80} tone="bad" title="search_code" sub={'"searches other stuff"'} d={300} />
      <Arrow path="M175,94 L110,166" d={400} tone="bad" dashed />
      <Arrow path="M235,94 L275,166" d={500} tone="bad" dashed />
      <Arrow path="M180,206 L270,206" d={600} tone="bad" dashed />
      <text x={205} y={274} textAnchor="middle" fontFamily={F} fontSize={11} fill={C.bad}>
        both plausible - Claude guesses, sometimes wrong
      </text>

      <line x1={440} y1={20} x2={440} y2={294} stroke={C.neutralLine} strokeWidth={1.5} />

      <text x={665} y={28} textAnchor="middle" fontFamily={F} fontSize={13.5} fontWeight={700} fill={C.brandDark}>
        Precise descriptions - clean selection
      </text>
      <Box x={565} y={40} w={160} h={54} tone="brand" title="Claude" sub="exactly one match" d={700} shield />
      <Box x={470} y={166} w={150} h={80} tone="ok" title="search_docs" sub="docs/*.md only" sub2="not code files" d={900} />
      <Box x={640} y={166} w={150} h={80} tone="neutral" title="search_code" sub="not selected" d={950} />
      <Arrow path="M630,94 L565,166" label="single clean path" lx={545} ly={132} d={1050} tone="brand" />
      <text x={665} y={274} textAnchor="middle" fontFamily={F} fontSize={11} fill={C.brandDark}>
        {'each description states scope + "do NOT use for X"'}
      </text>
    </Dgm>
  );
}

/* ---- 3. MCP transports ------------------------------------------------------- */

export function MCPTransportDiagram() {
  return (
    <Dgm
      label="Claude Code or an Agent SDK app connects to MCP servers over two transports: stdio for a local subprocess, Streamable HTTP for a remote shared server"
      caption="Fig 2.5 - Two MCP transports. stdio spawns a local subprocess (typical for local dev tools); Streamable HTTP reaches a remote server that can be shared across multiple clients (the older standalone SSE transport still works but is deprecated)."
      viewBox="0 0 880 300"
      dots={() => (
        <>
          <FlowDot path="M400,94 L205,168" dur="2s" />
          <FlowDot path="M480,94 L675,168" dur="2s" begin="0.8s" />
        </>
      )}
    >
      <Defs />
      <Box x={340} y={30} w={200} h={64} tone="brand" title="Claude Code / Agent SDK app" sub=".mcp.json" d={0} shield />

      <Arrow path="M400,94 L205,168" label="stdio (local)" lx={270} ly={136} d={200} tone="brand" />
      <Arrow path="M480,94 L675,168" label="Streamable HTTP (remote)" lx={610} ly={136} d={350} tone="brand" />

      <Box x={80} y={172} w={250} h={96} tone="tint" title="Local MCP server" sub="stdio - subprocess" sub2="command + args, same machine" d={300} />
      <Box x={550} y={172} w={250} h={96} tone="tint" title="Remote MCP server" sub="Streamable HTTP" sub2="url + type, shared across clients" d={450} />

      <text x={205} y={296} textAnchor="middle" fontFamily={F} fontSize={11} fill={C.muted}>
        most common for local dev tools
      </text>
      <text x={675} y={296} textAnchor="middle" fontFamily={F} fontSize={11} fill={C.muted}>
        multi-client, network-reachable
      </text>
    </Dgm>
  );
}
