// Two renders of the sound effects compared (tools/sfx/check.mjs writes them to previews/sfx/; copy one set aside first):
//   node tools/sfx/compare.mjs <dir a> <dir b>
// For a change that should leave every sound as it was (a tidy): each WAV byte for byte, and where they differ, how much
// (the largest sample difference, and the correlation of the two). A few renders aren't the same from run to run of the
// same code (Chromium renders a long reverb's tail on a thread of its own): compare against two runs of the old code to
// see that noise, and a tidy should show nothing above it.
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

const [a, b] = process.argv.slice(2);
const pcm = f => { const buf = readFileSync(f); return new Int16Array(buf.buffer, buf.byteOffset + 44, (buf.length - 44) >> 1); };
let same = 0;
for (const name of readdirSync(a).filter(n => n.endsWith(".wav")).sort()) {
  let x, y;
  try { x = pcm(join(a, name)); y = pcm(join(b, name)); } catch { console.log(`MISSING ${name}`); continue; }
  if (x.length === y.length && x.every((v, i) => v === y[i])) { same++; continue; }
  const n = Math.min(x.length, y.length);
  let d = 0, xy = 0, xx = 0, yy = 0;
  for (let i = 0; i < n; i++) { d = Math.max(d, Math.abs(x[i] - y[i])); xy += x[i] * y[i]; xx += x[i] * x[i]; yy += y[i] * y[i]; }
  console.log(`${name.padEnd(32)} differs: length ${x.length} → ${y.length}, largest difference ${(d / 32767).toFixed(4)}, correlation ${(xy / Math.sqrt(xx * yy || 1)).toFixed(5)}`);
}
console.log(`${same} identical`);
