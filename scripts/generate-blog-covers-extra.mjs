// Generate on-brand covers for content/blog/*.json articles that are missing one.
// A cover already present in public/blog/ is SKIPPED — a default run never rewrites
// a live cover. Style is a stable hash of the slug (not list position), so adding or
// removing posts never restyles another post's cover, even with --force.
//   node scripts/generate-blog-covers-extra.mjs           # write missing covers only
//   node scripts/generate-blog-covers-extra.mjs --force   # rewrite ALL covers (restyles live ones)
import sharp from "sharp";
import { readdirSync, readFileSync, mkdirSync, existsSync } from "node:fs";
import { join } from "node:path";

const CONTENT = join(process.cwd(), "content", "blog");
const OUT = join(process.cwd(), "public", "blog");
mkdirSync(OUT, { recursive: true });

function grid() {
  let l = "";
  for (let x = 0; x <= 1200; x += 60) l += `<line x1="${x}" y1="0" x2="${x}" y2="675"/>`;
  for (let y = 0; y <= 675; y += 60) l += `<line x1="0" y1="${y}" x2="1200" y2="${y}"/>`;
  return l;
}

const GLYPHS = {
  padlock: `<rect x="40" y="120" width="180" height="145" rx="24"/><path d="M76 120 V88 a54 54 0 0 1 108 0 V120"/><circle cx="130" cy="178" r="16" fill="#fff" stroke="none"/><rect x="121" y="188" width="18" height="40" rx="9" fill="#fff" stroke="none"/>`,
  storage: `<ellipse cx="130" cy="56" rx="110" ry="36"/><path d="M20 56 V210 a110 36 0 0 0 220 0 V56"/><path d="M20 133 a110 36 0 0 0 220 0"/>`,
  shield: `<path d="M130 22 L236 66 V160 C236 232 180 270 130 290 C80 270 24 232 24 160 V66 Z"/><line x1="130" y1="104" x2="130" y2="182"/><circle cx="130" cy="222" r="11" fill="#fff" stroke="none"/>`,
  key: `<circle cx="74" cy="74" r="44"/><path d="M106 106 L228 228"/><path d="M190 190 l36 0 M208 208 l30 0"/>`,
  network: `<circle cx="60" cy="62" r="22"/><circle cx="214" cy="84" r="22"/><circle cx="130" cy="226" r="22"/><path d="M81 72 L193 92 M68 82 L120 206 M202 100 L150 210"/>`,
  eye: `<path d="M16 135 C80 52 180 52 244 135 C180 218 80 218 16 135 Z"/><circle cx="130" cy="135" r="44"/><circle cx="130" cy="135" r="15" fill="#fff" stroke="none"/>`,
};

const STYLES = [
  { a: "#4f46e5", b: "#4338ca", accent: "#22d3ee", glyph: GLYPHS.padlock },
  { a: "#2563eb", b: "#0ea5e9", accent: "#a78bfa", glyph: GLYPHS.storage },
  { a: "#6d28d9", b: "#4f46e5", accent: "#34d399", glyph: GLYPHS.shield },
  { a: "#0ea5e9", b: "#2563eb", accent: "#fbbf24", glyph: GLYPHS.key },
  { a: "#4338ca", b: "#6d28d9", accent: "#f472b6", glyph: GLYPHS.network },
  { a: "#1e3a8a", b: "#4f46e5", accent: "#22d3ee", glyph: GLYPHS.eye },
];

function cover({ a, b, accent, glyph }) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="675" viewBox="0 0 1200 675">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${a}"/><stop offset="1" stop-color="${b}"/></linearGradient>
    <radialGradient id="glow" cx="0.78" cy="0.2" r="0.75"><stop offset="0" stop-color="#ffffff" stop-opacity="0.22"/><stop offset="1" stop-color="#ffffff" stop-opacity="0"/></radialGradient>
  </defs>
  <rect width="1200" height="675" fill="url(#bg)"/>
  <g stroke="#ffffff" stroke-opacity="0.07" stroke-width="1">${grid()}</g>
  <rect width="1200" height="675" fill="url(#glow)"/>
  <circle cx="950" cy="150" r="300" fill="#ffffff" fill-opacity="0.05"/>
  <circle cx="120" cy="600" r="160" fill="#ffffff" fill-opacity="0.04"/>
  <g transform="translate(150,200)" fill="none" stroke="#ffffff" stroke-width="13" stroke-linecap="round" stroke-linejoin="round">${glyph}</g>
  <circle cx="1064" cy="556" r="17" fill="${accent}"/>
  <circle cx="1022" cy="556" r="8" fill="#ffffff" fill-opacity="0.45"/>
</svg>`;
}

const posts = readdirSync(CONTENT)
  .filter((f) => f.endsWith(".json"))
  .map((f) => JSON.parse(readFileSync(join(CONTENT, f), "utf8")))
  .sort((x, y) => x.slug.localeCompare(y.slug));

const FORCE = process.argv.includes("--force");

// djb2 hash of the slug — style depends only on the slug, never on the file set
function styleFor(slug) {
  let h = 5381;
  for (let j = 0; j < slug.length; j++) h = ((h * 33) ^ slug.charCodeAt(j)) >>> 0;
  return STYLES[h % STYLES.length];
}

let written = 0;
let skipped = 0;
for (const p of posts) {
  const file = p.image.replace("/blog/", "");
  if (!FORCE && existsSync(join(OUT, file))) {
    skipped++;
    continue;
  }
  await sharp(Buffer.from(cover(styleFor(p.slug)))).webp({ quality: 88 }).toFile(join(OUT, file));
  console.log("wrote", file);
  written++;
}
console.log(`done: ${written} written, ${skipped} skipped (cover already exists)`);
