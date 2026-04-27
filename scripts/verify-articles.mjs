import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const t = fs.readFileSync(path.join(__dirname, "../src/data/articles.ts"), "utf8");

const ids = [...t.matchAll(/^\s{4}id: (\d+),/gm)].map((m) => +m[1]);
console.log("article count:", ids.length, "range:", Math.min(...ids), "-", Math.max(...ids));

const slugLines = [...t.matchAll(/^\s{4}slug: "([^"]+)",$/gm)].map((m) => m[1]);
console.log("slug lines:", slugLines.length);
const imageIds = [...t.matchAll(/^\s{4}imageId: (\d+),/gm)].map((m) => +m[1]);
console.log("unique imageIds (loremflickr lock):", new Set(imageIds).size, "/", imageIds.length);

const contents = [...t.matchAll(/content:\s*`([\s\S]*?)`,\s*\n/gm)].map((m) => m[1]);
console.log("content literals parsed:", contents.length);

let badPara = 0;
let badTag = 0;
let backtick = 0;
for (let i = 0; i < contents.length; i++) {
  const c = contents[i];
  const pCount = (c.match(/<p>/g) || []).length;
  if (pCount < 5) badPara++;
  if (/<(?!\/?p>)[^>]+>/.test(c.replace(/<\/?p>/g, ""))) badTag++;
  if (c.includes("`")) backtick++;
}
console.log("articles with <5 <p>:", badPara);
console.log("articles with non-p HTML tags:", badTag);
console.log("articles with backticks in content:", backtick);
