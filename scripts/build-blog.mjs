// Validate every content/blog/*.json article and merge into lib/blog-extra.json
// (date-sorted, newest first). Re-run whenever you add/edit an article JSON:
//   node scripts/build-blog.mjs
import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const DIR = join(process.cwd(), "content", "blog");
const OUT = join(process.cwd(), "lib", "blog-extra.json");
const VALID_T = new Set(["p", "h2", "ul", "code", "callout"]);
const NEED = ["slug", "title", "excerpt", "category", "date", "read", "image", "body"];

const files = readdirSync(DIR).filter((f) => f.endsWith(".json"));
const posts = [];
const errors = [];

for (const f of files) {
  let o;
  try {
    o = JSON.parse(readFileSync(join(DIR, f), "utf8"));
  } catch (e) {
    errors.push(`${f}: invalid JSON — ${e.message}`);
    continue;
  }
  const missing = NEED.filter((k) => !(k in o));
  if (missing.length) {
    errors.push(`${f}: missing keys ${missing.join(", ")}`);
    continue;
  }
  if (!Array.isArray(o.body) || o.body.length === 0) {
    errors.push(`${f}: body must be a non-empty array`);
    continue;
  }
  const bad = o.body.filter((b) => !b || !VALID_T.has(b.t));
  if (bad.length) {
    errors.push(`${f}: ${bad.length} body block(s) with invalid "t"`);
    continue;
  }
  posts.push(o);
}

posts.sort((a, b) => new Date(b.date) - new Date(a.date));
writeFileSync(OUT, JSON.stringify(posts, null, 2));

console.log(`Built ${posts.length}/${files.length} posts -> lib/blog-extra.json`);
posts.forEach((p) => console.log(`  • ${p.date.padEnd(13)} ${p.slug}  (${p.body.length} blocks)`));
if (errors.length) {
  console.log("\nERRORS (these were skipped):");
  errors.forEach((e) => console.log("  - " + e));
  process.exit(2);
}
