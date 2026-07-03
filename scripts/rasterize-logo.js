// Throwaway script: rasterize the new ShieldSync logo SVGs into PNGs.
// Run with: node scripts/rasterize-logo.js
const path = require("path");
const fs = require("fs");
const sharp = require(path.join(__dirname, "..", "node_modules", "sharp"));

const root = path.join(__dirname, "..");
const faviconSvg = path.join(root, "public", "logo", "shieldsync-favicon.svg");
const markLightSvg = path.join(root, "public", "logo", "shieldsync-mark-light.svg");

const outDir = path.join(root, "public");

async function run() {
  // Favicon PNGs from the dark navy tile mark
  const faviconSizes = [16, 32, 48, 64, 180, 192, 512];
  for (const size of faviconSizes) {
    let outPath;
    if (size === 180) outPath = path.join(outDir, "apple-touch-icon.png");
    else outPath = path.join(outDir, `favicon-${size}.png`);
    await sharp(faviconSvg, { density: 384 })
      .resize(size, size)
      .png()
      .toFile(outPath);
    console.log("wrote", outPath);
  }

  // Also produce app/apple-icon.png (Next convention) at 180x180
  const appDir = path.join(root, "app");
  await sharp(faviconSvg, { density: 384 })
    .resize(180, 180)
    .png()
    .toFile(path.join(appDir, "apple-icon.png"));
  console.log("wrote", path.join(appDir, "apple-icon.png"));

  // Transparent mark PNG (light variant) at 512 for OG/social use
  await sharp(markLightSvg, { density: 384 })
    .resize(512, 512)
    .png()
    .toFile(path.join(outDir, "logo", "shieldsync-mark-512.png"));
  console.log("wrote", path.join(outDir, "logo", "shieldsync-mark-512.png"));
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
