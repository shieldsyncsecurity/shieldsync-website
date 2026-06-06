// Generate on-brand blog cover images (gradient + cyber-grid + topic glyph).
// No external API — SVG rasterised to WebP via sharp. Re-run any time:
//   node scripts/generate-blog-covers.mjs
import sharp from "sharp";
import { mkdirSync } from "node:fs";
import { join } from "node:path";

const OUT = join(process.cwd(), "public", "blog");
mkdirSync(OUT, { recursive: true });

function gridLines() {
  let l = "";
  for (let x = 0; x <= 1200; x += 60) l += `<line x1="${x}" y1="0" x2="${x}" y2="675"/>`;
  for (let y = 0; y <= 675; y += 60) l += `<line x1="0" y1="${y}" x2="1200" y2="${y}"/>`;
  return l;
}

// Stroke-based glyphs (drawn in a ~250x290 box), abstract on purpose.
const GLYPHS = {
  padlock: `<rect x="40" y="120" width="180" height="145" rx="24"/><path d="M76 120 V88 a54 54 0 0 1 108 0 V120"/><circle cx="130" cy="178" r="16" fill="#fff" stroke="none"/><rect x="121" y="188" width="18" height="40" rx="9" fill="#fff" stroke="none"/>`,
  storage: `<ellipse cx="130" cy="56" rx="110" ry="36"/><path d="M20 56 V210 a110 36 0 0 0 220 0 V56"/><path d="M20 133 a110 36 0 0 0 220 0"/>`,
  shield: `<path d="M130 22 L236 66 V160 C236 232 180 270 130 290 C80 270 24 232 24 160 V66 Z"/><line x1="130" y1="104" x2="130" y2="182"/><circle cx="130" cy="222" r="11" fill="#fff" stroke="none"/>`,
};

function cover({ a, b, accent, glyph }) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="675" viewBox="0 0 1200 675">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${a}"/><stop offset="1" stop-color="${b}"/>
    </linearGradient>
    <radialGradient id="glow" cx="0.78" cy="0.2" r="0.75">
      <stop offset="0" stop-color="#ffffff" stop-opacity="0.22"/>
      <stop offset="1" stop-color="#ffffff" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="675" fill="url(#bg)"/>
  <g stroke="#ffffff" stroke-opacity="0.07" stroke-width="1">${gridLines()}</g>
  <rect width="1200" height="675" fill="url(#glow)"/>
  <circle cx="950" cy="150" r="300" fill="#ffffff" fill-opacity="0.05"/>
  <circle cx="120" cy="600" r="160" fill="#ffffff" fill-opacity="0.04"/>
  <g transform="translate(150,200)" fill="none" stroke="#ffffff" stroke-width="13" stroke-linecap="round" stroke-linejoin="round">${glyph}</g>
  <circle cx="1064" cy="556" r="17" fill="${accent}"/>
  <circle cx="1022" cy="556" r="8" fill="#ffffff" fill-opacity="0.45"/>
</svg>`;
}

const COVERS = [
  { file: "iam-least-privilege.webp", a: "#4f46e5", b: "#4338ca", accent: "#22d3ee", glyph: GLYPHS.padlock },
  { file: "s3-data-leak.webp", a: "#2563eb", b: "#0ea5e9", accent: "#a78bfa", glyph: GLYPHS.storage },
  { file: "credential-compromise.webp", a: "#6d28d9", b: "#4f46e5", accent: "#34d399", glyph: GLYPHS.shield },
];

for (const c of COVERS) {
  const out = join(OUT, c.file);
  await sharp(Buffer.from(cover(c))).webp({ quality: 88 }).toFile(out);
  console.log("wrote", out);
}
console.log("done:", COVERS.length, "covers");
