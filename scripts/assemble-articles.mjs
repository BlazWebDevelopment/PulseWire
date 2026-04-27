import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const fragDir = path.join(root, "src", "data", "_fragments");

const banners = {
  crypto: `  // ═══════════════════════════════════════════════════════════════════
  //                            CRYPTO  (1-20)
  //   Bitcoin, Ethereum, Solana, XRP and other major coins / protocols
  // ═══════════════════════════════════════════════════════════════════`,
  defi: `  // ═══════════════════════════════════════════════════════════════════
  //                              DEFI  (21-40)
  // ═══════════════════════════════════════════════════════════════════`,
  nfts: `  // ═══════════════════════════════════════════════════════════════════
  //                              NFTs  (41-60)
  // ═══════════════════════════════════════════════════════════════════`,
  markets: `  // ═══════════════════════════════════════════════════════════════════
  //                            MARKETS  (61-80)
  // ═══════════════════════════════════════════════════════════════════`,
  mining: `  // ═══════════════════════════════════════════════════════════════════
  //                            MINING  (81-100)
  // ═══════════════════════════════════════════════════════════════════`,
  regulation: `  // ═══════════════════════════════════════════════════════════════════
  //                          REGULATION  (101-120)
  // ═══════════════════════════════════════════════════════════════════`,
  opinion: `  // ═══════════════════════════════════════════════════════════════════
  //                            OPINION  (121-140)
  // ═══════════════════════════════════════════════════════════════════`,
};

const order = ["crypto", "defi", "nfts", "markets", "mining", "regulation", "opinion"];

/** Fix common mojibake from mixed UTF-8 / Windows-1252 in fragment text */
function fixMojibake(s) {
  return s
    .replace(/\uFFFD/g, "—")
    .replace(/â€"/g, "—")
    .replace(/â€"/g, "–")
    .replace(/â€™/g, "'")
    .replace(/â€œ/g, '"')
    .replace(/â€\u009d/g, '"');
}

const headerPath = path.join(root, "src", "data", "articles.ts");
const existing = fs.readFileSync(headerPath, "utf8");

const headerMarker = "export const articles: Article[] = [";
const headerIdx = existing.indexOf(headerMarker);
if (headerIdx === -1) throw new Error("Could not find articles array start");
const header = existing.slice(0, headerIdx + headerMarker.length);

const footerIdx = existing.indexOf("\n\nexport function getArticleBySlug");
if (footerIdx === -1) throw new Error("Could not find helper exports after articles array");
const footer = existing.slice(footerIdx);

const parts = [header, "\n"];

for (let i = 0; i < order.length; i++) {
  const name = order[i];
  const fp = path.join(fragDir, `${name}.txt`);
  let body = fs.readFileSync(fp, "utf8");
  body = fixMojibake(body).trimEnd();
  // Hero/thumb URLs come from getArticleImageUrl (Picsum seed); drop legacy loremflickr lines.
  body = body
    .split(/\r?\n/)
    .filter((l) => !/^\s*imageUrl:\s*img\(/.test(l))
    .join("\n");
  if (!body.endsWith(",")) body += ",";
  parts.push("\n", banners[name], "\n", body, "\n");
}

parts.push("];");
parts.push(footer);

const out = parts.join("");
fs.writeFileSync(headerPath, out, "utf8");
console.log("Wrote", headerPath, "bytes:", Buffer.byteLength(out, "utf8"));
