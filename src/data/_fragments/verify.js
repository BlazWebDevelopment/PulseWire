const fs = require('fs');
const src = fs.readFileSync('C:/Users/Blaz/Desktop/PulseWire/src/data/articles.ts', 'utf8');
const frag = fs.readFileSync('C:/Users/Blaz/Desktop/PulseWire/src/data/_fragments/crypto.txt', 'utf8');

const fields = ['id', 'slug', 'title', 'excerpt', 'category', 'author', 'authorRole', 'publishedAt', 'readTime', 'imageId', 'featured', 'trending', 'tags'];

function parseObjects(text) {
  const objs = [];
  const re = /\{\s*id:\s*(\d+),[\s\S]*?\n  \},/g;
  let m;
  while ((m = re.exec(text)) !== null) {
    objs.push({ id: parseInt(m[1], 10), block: m[0] });
  }
  return objs;
}

function extract(block, field) {
  const re = new RegExp(`\\b${field}:\\s*([^\\n]+?),\\n`);
  const m = block.match(re);
  return m ? m[1].trim() : null;
}

const srcObjs = parseObjects(src).filter(o => o.id >= 1 && o.id <= 20);
const fragObjs = parseObjects(frag);

console.log('source 1-20 count:', srcObjs.length, 'fragment count:', fragObjs.length);

let mismatches = 0;
for (let i = 0; i < 20; i++) {
  const s = srcObjs[i];
  const f = fragObjs[i];
  if (!s || !f) {
    console.log('missing id', i + 1);
    continue;
  }
  if (s.id !== f.id) {
    console.log('id mismatch', s.id, '!==', f.id);
    mismatches++;
    continue;
  }
  for (const field of fields) {
    const sv = extract(s.block, field);
    const fv = extract(f.block, field);
    if (sv !== fv) {
      console.log(`id ${s.id} field ${field} differs:\n  src: ${sv}\n  frag: ${fv}`);
      mismatches++;
    }
  }
}
console.log('total mismatches:', mismatches);
