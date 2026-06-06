#!/usr/bin/env node
/**
 * One-off: optimize the generated lab illustrations.
 * Converts public/labs/*.png to resized, compressed .webp and removes the PNGs.
 * Run: node scripts/optimize-images.mjs
 */
import sharp from "sharp";
import { readdir, rm, stat } from "node:fs/promises";
import path from "node:path";

const dir = "public/labs";
const files = (await readdir(dir)).filter((f) => f.endsWith(".png"));

for (const f of files) {
  const src = path.join(dir, f);
  const out = src.replace(/\.png$/, ".webp");
  const before = (await stat(src)).size;
  await sharp(src).resize({ width: 1600, withoutEnlargement: true }).webp({ quality: 82 }).toFile(out);
  const after = (await stat(out)).size;
  await rm(src);
  console.log(`${f} → ${path.basename(out)}  ${(before / 1e6).toFixed(1)}MB → ${(after / 1e3).toFixed(0)}KB`);
}
console.log("Done.");
