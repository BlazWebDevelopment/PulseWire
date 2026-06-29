import fs from "node:fs";
import path from "node:path";
import zlib from "node:zlib";

const width = 64;
const height = 64;
const pixels = new Uint8ClampedArray(width * height * 4);

function clamp(value, min = 0, max = 255) {
  return Math.max(min, Math.min(max, value));
}

function mix(a, b, t) {
  return a + (b - a) * t;
}

function blendPixel(x, y, r, g, b, a) {
  if (x < 0 || y < 0 || x >= width || y >= height) return;
  const idx = (y * width + x) * 4;
  const srcA = a / 255;
  const dstA = pixels[idx + 3] / 255;
  const outA = srcA + dstA * (1 - srcA);

  if (outA <= 0) return;

  pixels[idx] = clamp((r * srcA + pixels[idx] * dstA * (1 - srcA)) / outA);
  pixels[idx + 1] = clamp((g * srcA + pixels[idx + 1] * dstA * (1 - srcA)) / outA);
  pixels[idx + 2] = clamp((b * srcA + pixels[idx + 2] * dstA * (1 - srcA)) / outA);
  pixels[idx + 3] = clamp(outA * 255);
}

function insideRoundedRect(x, y, left, top, rectWidth, rectHeight, radius) {
  const right = left + rectWidth;
  const bottom = top + rectHeight;

  if (x >= left + radius && x <= right - radius) return y >= top && y <= bottom;
  if (y >= top + radius && y <= bottom - radius) return x >= left && x <= right;

  const cx = x < left + radius ? left + radius : right - radius;
  const cy = y < top + radius ? top + radius : bottom - radius;
  const dx = x - cx;
  const dy = y - cy;
  return dx * dx + dy * dy <= radius * radius;
}

function fillRoundedRect(left, top, rectWidth, rectHeight, radius, colorA, colorB = colorA) {
  for (let y = Math.floor(top); y < Math.ceil(top + rectHeight); y += 1) {
    for (let x = Math.floor(left); x < Math.ceil(left + rectWidth); x += 1) {
      const px = x + 0.5;
      const py = y + 0.5;
      if (!insideRoundedRect(px, py, left, top, rectWidth, rectHeight, radius)) continue;
      const t = ((px - left) + (py - top)) / (rectWidth + rectHeight);
      blendPixel(
        x,
        y,
        mix(colorA[0], colorB[0], t),
        mix(colorA[1], colorB[1], t),
        mix(colorA[2], colorB[2], t),
        mix(colorA[3], colorB[3], t),
      );
    }
  }
}

function strokeRoundedRect(left, top, rectWidth, rectHeight, radius, thickness, color) {
  const innerLeft = left + thickness;
  const innerTop = top + thickness;
  const innerWidth = rectWidth - thickness * 2;
  const innerHeight = rectHeight - thickness * 2;
  const innerRadius = Math.max(0, radius - thickness);

  for (let y = Math.floor(top); y < Math.ceil(top + rectHeight); y += 1) {
    for (let x = Math.floor(left); x < Math.ceil(left + rectWidth); x += 1) {
      const px = x + 0.5;
      const py = y + 0.5;
      const outer = insideRoundedRect(px, py, left, top, rectWidth, rectHeight, radius);
      const inner = insideRoundedRect(px, py, innerLeft, innerTop, innerWidth, innerHeight, innerRadius);
      if (outer && !inner) {
        blendPixel(x, y, color[0], color[1], color[2], color[3]);
      }
    }
  }
}

function distanceToSegment(px, py, x1, y1, x2, y2) {
  const dx = x2 - x1;
  const dy = y2 - y1;
  if (dx === 0 && dy === 0) return Math.hypot(px - x1, py - y1);
  const t = Math.max(0, Math.min(1, ((px - x1) * dx + (py - y1) * dy) / (dx * dx + dy * dy)));
  const projX = x1 + t * dx;
  const projY = y1 + t * dy;
  return {
    dist: Math.hypot(px - projX, py - projY),
    t,
  };
}

function gradientColor(progress) {
  const t = Math.max(0, Math.min(1, progress));
  // Emerald gradient: #6EE7B7 -> #059669
  return [
    mix(110, 5, t),
    mix(231, 150, t),
    mix(183, 105, t),
    255,
  ];
}

function drawStroke(points, radius, opacity = 1) {
  for (let i = 0; i < points.length - 1; i += 1) {
    const [x1, y1] = points[i];
    const [x2, y2] = points[i + 1];
    const minX = Math.floor(Math.min(x1, x2) - radius - 2);
    const maxX = Math.ceil(Math.max(x1, x2) + radius + 2);
    const minY = Math.floor(Math.min(y1, y2) - radius - 2);
    const maxY = Math.ceil(Math.max(y1, y2) + radius + 2);

    for (let y = minY; y <= maxY; y += 1) {
      for (let x = minX; x <= maxX; x += 1) {
        const { dist, t } = distanceToSegment(x + 0.5, y + 0.5, x1, y1, x2, y2);
        if (dist > radius + 1) continue;
        const alpha = clamp((1 - Math.max(0, dist - radius + 0.75)) * 255 * opacity);
        const progress = (i + t) / (points.length - 1);
        const [r, g, b, a] = gradientColor(progress);
        blendPixel(x, y, r, g, b, (a * alpha) / 255);
      }
    }
  }
}

function fillCircle(cx, cy, radius, color) {
  const minX = Math.floor(cx - radius - 1);
  const maxX = Math.ceil(cx + radius + 1);
  const minY = Math.floor(cy - radius - 1);
  const maxY = Math.ceil(cy + radius + 1);

  for (let y = minY; y <= maxY; y += 1) {
    for (let x = minX; x <= maxX; x += 1) {
      const dist = Math.hypot(x + 0.5 - cx, y + 0.5 - cy);
      if (dist <= radius + 0.75) {
        const alpha = clamp((1 - Math.max(0, dist - radius + 0.75)) * color[3]);
        blendPixel(x, y, color[0], color[1], color[2], alpha);
      }
    }
  }
}

function strokeCircle(cx, cy, radius, thickness, color) {
  const minX = Math.floor(cx - radius - thickness - 1);
  const maxX = Math.ceil(cx + radius + thickness + 1);
  const minY = Math.floor(cy - radius - thickness - 1);
  const maxY = Math.ceil(cy + radius + thickness + 1);

  for (let y = minY; y <= maxY; y += 1) {
    for (let x = minX; x <= maxX; x += 1) {
      const dist = Math.hypot(x + 0.5 - cx, y + 0.5 - cy);
      const delta = Math.abs(dist - radius);
      if (delta <= thickness / 2 + 0.75) {
        const alpha = clamp((1 - Math.max(0, delta - thickness / 2 + 0.75)) * color[3]);
        blendPixel(x, y, color[0], color[1], color[2], alpha);
      }
    }
  }
}

fillRoundedRect(4, 4, 56, 56, 10, [255, 255, 255, 255], [248, 251, 255, 255]);
strokeRoundedRect(4, 4, 56, 56, 10, 2, [203, 213, 225, 255]);

const chart = [
  [16, 45],
  [28, 36],
  [36, 41],
  [48, 20],
];

drawStroke(chart, 5.2, 0.12);
drawStroke(chart, 3, 1);
fillRoundedRect(44.5, 16, 7, 7, 0, [245, 158, 11, 255]);
strokeRoundedRect(44.5, 16, 7, 7, 0, 1, [253, 230, 138, 255]);

function crc32(buffer) {
  let crc = 0xffffffff;
  for (const byte of buffer) {
    crc ^= byte;
    for (let i = 0; i < 8; i += 1) {
      const mask = -(crc & 1);
      crc = (crc >>> 1) ^ (0xedb88320 & mask);
    }
  }
  return (crc ^ 0xffffffff) >>> 0;
}

function pngChunk(type, data) {
  const typeBuffer = Buffer.from(type);
  const length = Buffer.alloc(4);
  length.writeUInt32BE(data.length, 0);
  const crcBuffer = Buffer.alloc(4);
  const full = Buffer.concat([typeBuffer, data]);
  crcBuffer.writeUInt32BE(crc32(full), 0);
  return Buffer.concat([length, full, crcBuffer]);
}

function encodePng() {
  const raw = Buffer.alloc((width * 4 + 1) * height);
  for (let y = 0; y < height; y += 1) {
    raw[y * (width * 4 + 1)] = 0;
    for (let x = 0; x < width; x += 1) {
      const src = (y * width + x) * 4;
      const dest = y * (width * 4 + 1) + 1 + x * 4;
      raw[dest] = pixels[src];
      raw[dest + 1] = pixels[src + 1];
      raw[dest + 2] = pixels[src + 2];
      raw[dest + 3] = pixels[src + 3];
    }
  }

  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8;
  ihdr[9] = 6;
  ihdr[10] = 0;
  ihdr[11] = 0;
  ihdr[12] = 0;

  return Buffer.concat([
    signature,
    pngChunk("IHDR", ihdr),
    pngChunk("IDAT", zlib.deflateSync(raw)),
    pngChunk("IEND", Buffer.alloc(0)),
  ]);
}

const png = encodePng();

const icoHeader = Buffer.alloc(6);
icoHeader.writeUInt16LE(0, 0);
icoHeader.writeUInt16LE(1, 2);
icoHeader.writeUInt16LE(1, 4);

const dirEntry = Buffer.alloc(16);
dirEntry[0] = width;
dirEntry[1] = height;
dirEntry[2] = 0;
dirEntry[3] = 0;
dirEntry.writeUInt16LE(1, 4);
dirEntry.writeUInt16LE(32, 6);
dirEntry.writeUInt32LE(png.length, 8);
dirEntry.writeUInt32LE(22, 12);

const ico = Buffer.concat([icoHeader, dirEntry, png]);

const root = process.cwd();
const faviconPath = path.join(root, "src", "app", "favicon.ico");

fs.writeFileSync(faviconPath, ico);
console.log(`Generated ${faviconPath}`);
