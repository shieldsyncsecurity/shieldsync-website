"use client";

import { useEffect, useRef, useState } from "react";
import { awsLogo, azureLogo } from "./hero-logos";

/**
 * Homepage hero visual: an indigo "blueprint" panel that auto-cycles through four
 * real cloud-attack paths — an attacker on the left tracing a route into YOUR
 * AWS/Azure cloud (the destination), then a lock closing on it.
 *
 * Motion is enforced (owner call): the sequence auto-plays and cycles regardless
 * of `prefers-reduced-motion`. The SVG is decorative — it carries an aria-label and
 * is otherwise hidden from assistive tech; the message lives in the hero copy.
 *
 * The animation is driven imperatively (SVG innerHTML + a rAF pulse) inside an
 * effect, so it's a single self-contained client component with clean teardown.
 */

type Step = { ico: IcoName; t: string; s: string };
type Flow = { label: string; top: Step; bot: Step };
type IcoName = "bucket" | "key" | "shield" | "server" | "chip" | "mail";

const FLOWS: Flow[] = [
  { label: "storage exposure", top: { ico: "bucket", t: "Public bucket", s: "S3 · anon read" }, bot: { ico: "key", t: "Over-broad IAM", s: "assume role" } },
  { label: "leaked key", top: { ico: "key", t: "Leaked access key", s: "public GitHub" }, bot: { ico: "shield", t: "Admin role", s: "no MFA" } },
  { label: "SSRF chain", top: { ico: "server", t: "Exposed web app", s: "SSRF" }, bot: { ico: "chip", t: "Instance metadata", s: "steal creds" } },
  { label: "phished identity", top: { ico: "mail", t: "Phished employee", s: "stolen creds" }, bot: { ico: "key", t: "Valid session", s: "MFA fatigue" } },
];
const MARKS = [0, 0.3, 0.62, 1];
const PATH_D = "M54 135 L180 82 L180 218 L316 140";

// ---- icons (recognizable inline SVG) ----
function icoAttacker(x: number, y: number) { return `<g transform="translate(${x},${y})"><circle cx="0" cy="-5" r="6" fill="#f0897c"/><path d="M-11 11 a11 10 0 0 1 22 0 z" fill="#f0897c"/><path d="M-8 -4 a8 9 0 0 1 16 0" fill="none" stroke="#e06a5c" stroke-width="2.5"/></g>`; }
function icoBucket(x: number, y: number) { return `<g transform="translate(${x},${y})"><path d="M-9 -6 L9 -6 L6.5 9 L-6.5 9 Z" fill="#3f8624" stroke="#6fc44a" stroke-width="1"/><ellipse cx="0" cy="-6" rx="9" ry="2.6" fill="#6fc44a"/><ellipse cx="0" cy="-6" rx="5" ry="1.3" fill="#173a0e"/></g>`; }
function icoKey(x: number, y: number) { return `<g transform="translate(${x},${y})" fill="none" stroke="#f2708a" stroke-width="2.2" stroke-linecap="round"><circle cx="-5" cy="-4" r="5.2"/><path d="M-1.5 -0.5 L8 9"/><path d="M4.5 5.5 L8 2"/><path d="M8 9 L5 12"/></g>`; }
function icoShield(x: number, y: number) { return `<g transform="translate(${x},${y})"><path d="M0 -10 L9 -6 v6 c0 7 -5 10 -9 12 c-4 -2 -9 -5 -9 -12 v-6 z" fill="rgba(167,139,250,.25)" stroke="#a78bfa" stroke-width="1.8"/><path d="M-4 0 l3 3 l6 -6" fill="none" stroke="#c4b5fd" stroke-width="1.8" stroke-linecap="round"/></g>`; }
function icoServer(x: number, y: number) { return `<g transform="translate(${x},${y})" stroke="#4aa8ff" stroke-width="1.6"><rect x="-9" y="-9" width="18" height="8" rx="2" fill="rgba(74,168,255,.15)"/><rect x="-9" y="2" width="18" height="8" rx="2" fill="rgba(74,168,255,.15)"/><circle cx="-5" cy="-5" r="1.2" fill="#7cd0ff" stroke="none"/><circle cx="-5" cy="6" r="1.2" fill="#7cd0ff" stroke="none"/></g>`; }
function icoChip(x: number, y: number) { return `<g transform="translate(${x},${y})" stroke="#f6b73c" stroke-width="1.6"><rect x="-7" y="-7" width="14" height="14" rx="2.5" fill="rgba(246,183,60,.16)"/><rect x="-3" y="-3" width="6" height="6" rx="1" fill="#f6b73c" stroke="none"/><path d="M-4 -7 v-3 M4 -7 v-3 M-4 7 v3 M4 7 v3 M-7 -4 h-3 M-7 4 h-3 M7 -4 h3 M7 4 h3"/></g>`; }
function icoMail(x: number, y: number) { return `<g transform="translate(${x},${y})" stroke="#5cc7ff" stroke-width="1.7" fill="none"><rect x="-9" y="-7" width="18" height="14" rx="2.5" fill="rgba(92,199,255,.14)"/><path d="M-9 -5 L0 2 L9 -5"/></g>`; }
const ICONS: Record<IcoName, (x: number, y: number) => string> = { bucket: icoBucket, key: icoKey, shield: icoShield, server: icoServer, chip: icoChip, mail: icoMail };

/* Provider mark for the destination node = the official AWS / Azure logo (see
 * hero-logos.ts, generated from the vendors' published brand SVGs). These are
 * trademarks used nominatively to name the cloud in a technical diagram — the
 * standard, permitted use; no partnership implied or claimed. */

export function HeroAttackMap() {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const labelRef = useRef<HTMLSpanElement | null>(null);
  const [provider, setProvider] = useState<"AWS" | "Azure">("AWS");

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;
    let flow = 0;
    let raf = 0;
    const timers: number[] = [];
    const timer = (fn: () => void, ms: number) => { const id = window.setTimeout(fn, ms); timers.push(id); return id; };

    function build() {
      const F = FLOWS[flow];
      if (labelRef.current) labelRef.current.textContent = `attack-path · ${F.label}`;
      let lines = "";
      for (let gx = 24; gx < 420; gx += 34) lines += `<line class="ham-grid" x1="${gx}" y1="20" x2="${gx}" y2="280"/>`;
      for (let gy = 28; gy < 280; gy += 34) lines += `<line class="ham-grid" x1="20" y1="${gy}" x2="420" y2="${gy}"/>`;
      const logo = provider === "AWS" ? awsLogo(360, 112) : azureLogo(360, 111);
      svg!.innerHTML =
        `<g opacity=".6">${lines}</g>` +
        `<path class="ham-edge" id="ham-edge" d="${PATH_D}"/>` +
        `<g class="ham-node ham-attacker" data-i="0"><circle class="ham-nb" cx="54" cy="135" r="26"/>${icoAttacker(54, 133)}<text class="ham-t" x="54" y="178" text-anchor="middle">Attacker</text><text class="ham-s" x="54" y="190" text-anchor="middle">external</text></g>` +
        `<g class="ham-node" data-i="1"><rect class="ham-nb" x="108" y="62" width="150" height="40" rx="10"/>${ICONS[F.top.ico](130, 82)}<text class="ham-t" x="150" y="79">${F.top.t}</text><text class="ham-s" x="150" y="91">${F.top.s}</text></g>` +
        `<g class="ham-node" data-i="2"><rect class="ham-nb" x="108" y="198" width="150" height="40" rx="10"/>${ICONS[F.bot.ico](130, 218)}<text class="ham-t" x="150" y="215">${F.bot.t}</text><text class="ham-s" x="150" y="227">${F.bot.s}</text></g>` +
        `<g class="ham-node ham-dest" data-i="3"><rect class="ham-nb" x="300" y="86" width="118" height="108" rx="14"/>${logo}<text class="ham-t" x="360" y="168" text-anchor="middle">Your ${provider} cloud</text><text class="ham-s" x="360" y="180" text-anchor="middle">customer data</text>` +
        `<g class="ham-lock" id="ham-lock"><rect x="398" y="76" width="26" height="26" rx="8" fill="#120f2e" stroke="#34d399" stroke-width="1.6"/><rect x="406" y="86" width="10" height="8" rx="1.4" fill="#34d399"/><path d="M407.5 86 v-2.6 a3.5 3.5 0 0 1 7 0 v2.6" fill="none" stroke="#34d399" stroke-width="1.5"/></g></g>` +
        `<circle class="ham-pulse" id="ham-pulse" r="5" style="opacity:0"/>`;
    }

    function cycle() {
      build();
      const nodes = svg!.querySelectorAll<SVGGElement>(".ham-node");
      const path = svg!.querySelector<SVGPathElement>("#ham-edge")!;
      const pulse = svg!.querySelector<SVGCircleElement>("#ham-pulse")!;
      const lock = svg!.querySelector<SVGGElement>("#ham-lock")!;
      lock.style.transition = "none"; lock.style.opacity = "0"; lock.style.transform = "scale(.4)";
      const len = path.getTotalLength();
      let start: number | null = null, lit = 0;
      pulse.style.opacity = "1";
      const frame = (ts: number) => {
        if (start === null) start = ts;
        const p = Math.min((ts - start) / 2500, 1);
        const pt = path.getPointAtLength(len * p);
        pulse.setAttribute("cx", String(pt.x)); pulse.setAttribute("cy", String(pt.y));
        while (lit < MARKS.length && p >= MARKS[lit]) { nodes[lit].classList.add("ham-hit"); lit++; }
        if (p < 1) { raf = requestAnimationFrame(frame); }
        else {
          pulse.style.opacity = "0";
          timer(() => {
            lock.style.transition = "opacity .4s, transform .5s cubic-bezier(.2,.8,.3,1.2)";
            lock.style.opacity = "1"; lock.style.transform = "scale(1)";
            nodes.forEach((n) => { n.classList.remove("ham-hit"); n.classList.add("ham-safe"); });
            // pause on the secured state, then advance to the next flow
            timer(() => { flow = (flow + 1) % FLOWS.length; cycle(); }, 1700);
          }, 860);
        }
      };
      raf = requestAnimationFrame(frame);
    }

    cycle();
    return () => { cancelAnimationFrame(raf); timers.forEach(clearTimeout); };
  }, [provider]);

  return (
    <div className="ham-panel">
      <style>{HAM_CSS}</style>
      <div className="ham-head">
        <span ref={labelRef} aria-hidden="true">attack-path · storage exposure</span>
        <span className="ham-prov" role="group" aria-label="Cloud provider">
          <button type="button" aria-pressed={provider === "AWS"} aria-label="Show the AWS attack path" className={provider === "AWS" ? "on" : ""} onClick={() => setProvider("AWS")}>AWS</button>
          <button type="button" aria-pressed={provider === "Azure"} aria-label="Show the Azure attack path" className={provider === "Azure" ? "on" : ""} onClick={() => setProvider("Azure")}>Azure</button>
        </span>
      </div>
      <svg
        ref={svgRef}
        className="ham-svg"
        viewBox="0 38 440 224"
        role="img"
        aria-label="Animation: an external attacker traces a path — through an exposed foothold and weak identity — into your AWS or Azure cloud, which is then locked down."
      />
    </div>
  );
}

const HAM_CSS = `
.ham-panel{border-radius:1rem;overflow:hidden;position:relative;background:linear-gradient(165deg,#241f57,#171337);border:1px solid #3b348a;box-shadow:0 30px 60px -30px rgba(30,20,80,.55);}
.ham-head{display:flex;align-items:center;gap:.5rem;padding:.7rem .95rem;font-family:var(--font-mono,ui-monospace,monospace);font-size:.72rem;color:#b7bdf9;border-bottom:1px solid rgba(129,140,248,.22);background:rgba(255,255,255,.03);}
.ham-prov{margin-left:auto;display:flex;gap:.3rem;}
.ham-prov button{font:inherit;font-size:.62rem;text-transform:uppercase;letter-spacing:.06em;border:1px solid #4b45a0;background:transparent;color:#a9b2f7;border-radius:5px;padding:.12rem .5rem;cursor:pointer;}
.ham-prov button.on{color:#e6e9ff;border-color:#8b8cf5;background:rgba(139,140,245,.15);}
.ham-svg{display:block;width:100%;height:auto;}
.ham-grid{stroke:rgba(129,140,248,.14);stroke-width:1;}
.ham-nb{fill:rgba(99,102,241,.12);stroke:#6c6ee6;stroke-width:1.5;transition:stroke .3s,filter .3s;}
.ham-t{fill:#eceeff;font-size:11px;font-weight:700;}
.ham-s{fill:#a9b2f7;font-size:8.5px;font-weight:500;}
.ham-edge{stroke:#6f72e0;stroke-width:2;fill:none;stroke-dasharray:5 5;opacity:.7;}
.ham-node.ham-hit .ham-nb{stroke:#f59e0b;filter:drop-shadow(0 0 7px rgba(245,158,11,.75));}
.ham-node.ham-attacker .ham-nb{stroke:#ff8a7a;}
.ham-node.ham-dest.ham-hit .ham-nb{stroke:#ef4444;filter:drop-shadow(0 0 12px rgba(239,68,68,.85));}
.ham-node.ham-safe .ham-nb{stroke:#34d399;filter:drop-shadow(0 0 8px rgba(52,211,153,.7));}
.ham-pulse{fill:#fecaca;filter:drop-shadow(0 0 7px #ef4444);}
.ham-lock{opacity:0;transform-box:fill-box;transform-origin:center;}
`;
