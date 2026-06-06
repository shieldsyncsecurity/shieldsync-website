#!/usr/bin/env node
/**
 * Reusable AI image generator (portable across projects).
 *
 * Reads a prompts file and generates one PNG per entry via the Google Gemini
 * API, saving them locally. Style is centralized below so every image in a set
 * stays visually consistent.
 *
 * SETUP
 *   1. Get a free key at https://aistudio.google.com  ("Get API key")
 *   2. Add it to .env.local:   GOOGLE_API_KEY=your_key_here
 *   3. Run:                     node scripts/generate-images.mjs
 *
 * OPTIONS (environment variables)
 *   GOOGLE_API_KEY   (required)
 *   IMAGE_MODEL      default "imagen-3.0-generate-002"
 *                    Free-tier alternative: "gemini-2.0-flash-preview-image-generation"
 *   OUT_DIR          default "public/labs"
 *   PROMPTS          default "scripts/image-prompts.json"
 *   ASPECT           default "16:9"  (Imagen models only)
 *
 * PORTABILITY: copy this file + a prompts JSON into any project, tweak STYLE
 * and the prompts, set OUT_DIR, and run. No framework assumptions.
 */
import { GoogleGenAI } from "@google/genai";
import { readFile, writeFile, mkdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";

// --- House style applied to every prompt (edit per project) -----------------
const STYLE =
  "Isometric 3D tech illustration on a dark navy background, modern cybersecurity " +
  "aesthetic, glowing neon accents, subtle circuit lines, clean, professional, " +
  "highly detailed, no text, no words, no letters.";

// Minimal .env loader (no extra dependency).
async function loadEnv(file) {
  if (!existsSync(file)) return;
  const txt = await readFile(file, "utf8");
  for (const line of txt.split("\n")) {
    const m = line.match(/^\s*([A-Za-z0-9_]+)\s*=\s*(.*)\s*$/);
    if (m && process.env[m[1]] === undefined) {
      process.env[m[1]] = m[2].replace(/^["']|["']$/g, "");
    }
  }
}

async function main() {
  await loadEnv(".env.local");
  await loadEnv(".env");

  const apiKey = process.env.GOOGLE_API_KEY;
  if (!apiKey) {
    console.error(
      "Missing GOOGLE_API_KEY. Add it to .env.local — get a free key at https://aistudio.google.com",
    );
    process.exit(1);
  }

  const MODEL = process.env.IMAGE_MODEL || "imagen-3.0-generate-002";
  const OUT_DIR = process.env.OUT_DIR || "public/labs";
  const PROMPTS = process.env.PROMPTS || "scripts/image-prompts.json";
  const ASPECT = process.env.ASPECT || "16:9";

  const prompts = JSON.parse(await readFile(PROMPTS, "utf8"));
  await mkdir(OUT_DIR, { recursive: true });

  const ai = new GoogleGenAI({ apiKey });
  const isImagen = MODEL.startsWith("imagen");

  console.log(`Model: ${MODEL}  →  ${OUT_DIR}  (${prompts.length} images)\n`);

  for (const p of prompts) {
    const fullPrompt = `${STYLE} ${p.prompt}`;
    const outPath = path.join(OUT_DIR, p.outFile);
    try {
      let bytes;
      if (isImagen) {
        const res = await ai.models.generateImages({
          model: MODEL,
          prompt: fullPrompt,
          config: { numberOfImages: 1, aspectRatio: ASPECT },
        });
        bytes = res.generatedImages?.[0]?.image?.imageBytes;
      } else {
        const res = await ai.models.generateContent({
          model: MODEL,
          contents: fullPrompt,
          config: { responseModalities: ["IMAGE", "TEXT"] },
        });
        const parts = res.candidates?.[0]?.content?.parts ?? [];
        bytes = parts.find((x) => x.inlineData)?.inlineData?.data;
      }

      if (!bytes) {
        console.error(`  ✗ ${p.name}: no image returned`);
        continue;
      }
      await writeFile(outPath, Buffer.from(bytes, "base64"));
      console.log(`  ✓ ${p.name} → ${outPath}`);
    } catch (err) {
      console.error(`  ✗ ${p.name}: ${err?.message || err}`);
    }
  }

  console.log("\nDone.");
}

main();
