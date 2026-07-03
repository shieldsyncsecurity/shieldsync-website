// Throwaway script: pack PNG files into a multi-resolution .ico using the
// PNG-embedding ICO format (supported by all modern browsers/OSes; no
// external ico library needed since sharp doesn't produce .ico directly).
const path = require("path");
const fs = require("fs");

const root = path.join(__dirname, "..");
const entries = [
  { size: 16, file: path.join(root, "public", "favicon-16.png") },
  { size: 32, file: path.join(root, "public", "favicon-32.png") },
  { size: 48, file: path.join(root, "public", "favicon-48.png") },
];

const images = entries.map((e) => ({ size: e.size, buf: fs.readFileSync(e.file) }));

const headerSize = 6;
const dirEntrySize = 16;
const numImages = images.length;

const header = Buffer.alloc(headerSize);
header.writeUInt16LE(0, 0); // reserved
header.writeUInt16LE(1, 2); // type: 1 = icon
header.writeUInt16LE(numImages, 4);

let offset = headerSize + dirEntrySize * numImages;
const dirEntries = [];
const imageBuffers = [];

for (const img of images) {
  const dir = Buffer.alloc(dirEntrySize);
  const dim = img.size >= 256 ? 0 : img.size; // 0 means 256
  dir.writeUInt8(dim, 0); // width
  dir.writeUInt8(dim, 1); // height
  dir.writeUInt8(0, 2); // color palette
  dir.writeUInt8(0, 3); // reserved
  dir.writeUInt16LE(1, 4); // color planes
  dir.writeUInt16LE(32, 6); // bits per pixel
  dir.writeUInt32LE(img.buf.length, 8); // size of image data
  dir.writeUInt32LE(offset, 12); // offset of image data
  dirEntries.push(dir);
  imageBuffers.push(img.buf);
  offset += img.buf.length;
}

const ico = Buffer.concat([header, ...dirEntries, ...imageBuffers]);
const outPath = path.join(root, "app", "favicon.ico");
fs.writeFileSync(outPath, ico);
console.log("wrote", outPath, ico.length, "bytes");
