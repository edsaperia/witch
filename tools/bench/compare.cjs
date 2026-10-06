// Compares two benchmark outs (Part B of the refactor: a change that moves code and nothing else
// should match): the rules fingerprints (rules.json, from tools/bench/run.mjs) part by part, the
// scene shots (frames.json and <scene>.png, from tools/bench/frames.cjs) pixel by pixel, and puts
// the timings side by side. Writes <after>/diff-<scene>.png for any shot that differs (the
// differing pixels in red over the shot, dimmed). Exits 1 on any mismatch.
//   node tools/bench/compare.cjs <before out> <after out>
const fs = require("fs");
const path = require("path");
let playwright;
try { playwright = require("playwright"); } catch { playwright = require("/opt/node22/lib/node_modules/playwright"); }

const [A, B] = process.argv.slice(2).map(p => path.resolve(p));
if (!A || !B) { console.error("usage: node tools/bench/compare.cjs <before> <after>"); process.exit(2); }
const read = (dir, f) => (fs.existsSync(path.join(dir, f)) ? JSON.parse(fs.readFileSync(path.join(dir, f), "utf8")) : null);
const lines = [], bad = [];
const row = (...cells) => lines.push(`| ${cells.join(" | ")} |`);

async function main() {
  // The rules: same fingerprints at every checkpoint, every seed.
  const ra = read(A, "rules.json"), rb = read(B, "rules.json");
  if (ra && rb) {
    lines.push("### Rules (stepGame at the late wave)", "", "| seed | wave | creatures | median ms | p99 ms | worst ms | state |", "|---|---|---|---|---|---|---|");
    for (const sa of ra.seeds) {
      const sb = rb.seeds.find(s => s.seed === sa.seed);
      if (!sb) { bad.push(`rules: seed ${sa.seed} missing after`); continue; }
      const diffs = [];
      sa.prints.forEach((p, i) => { const q = sb.prints[i]; if (!q) { diffs.push(`step ${p.step} missing`); return; } for (const k of Object.keys(p.print)) if (k !== "all" && p.print[k] !== q.print[k]) diffs.push(`${k} at step ${p.step}`); });
      if (diffs.length) bad.push(`rules seed ${sa.seed}: ${diffs.slice(0, 6).join(", ")}`);
      const f = (a, b) => `${a} → ${b}`;
      row(sa.seed, f(sa.wave, sb.wave), f(sa.creatures, sb.creatures), f(sa.step.median, sb.step.median), f(sa.step.p99, sb.step.p99), f(sa.step.worst, sb.step.worst), diffs.length ? `**differs** (${diffs[0]})` : "same");
    }
    lines.push("");
  } else if (ra || rb) bad.push(`rules: only the ${ra ? "before" : "after"} run has them`);
  if (!ra && !rb && !read(A, "frames.json") && !read(B, "frames.json")) bad.push("nothing to compare: neither run wrote rules.json or frames.json");

  // The frames: same pictures, and the timings.
  const fa = read(A, "frames.json"), fb = read(B, "frames.json");
  if (fa && fb) {
    const browser = await playwright.chromium.launch();
    const page = await browser.newPage();
    lines.push("### Frames (1280×720, seed " + fa.seed + ")", "", "| scene | where | pixels differing | frame work median ms | p99 ms | worst ms |", "|---|---|---|---|---|---|");
    for (const [name, sa] of Object.entries(fa.scenes)) {
      const sb = fb.scenes[name];
      if (!sb) { bad.push(`frames: ${name} missing after`); continue; }
      const where = sa.x === sb.x && sa.z === sb.z && sa.time === sb.time ? "same" : `**${sa.x},${sa.z} → ${sb.x},${sb.z}**`;
      if (where !== "same") bad.push(`frames ${name}: the witch ended elsewhere (${sa.x},${sa.z} at ${sa.time} s → ${sb.x},${sb.z} at ${sb.time} s)`);
      const pa = path.join(A, `${name}.png`), pb = path.join(B, `${name}.png`);
      const r = await page.evaluate(async ({ a, b }) => {
        const load = async s => { const i = new Image(); i.src = "data:image/png;base64," + s; await i.decode(); const c = document.createElement("canvas"); c.width = i.width; c.height = i.height; const x = c.getContext("2d"); x.drawImage(i, 0, 0); return { c, x, d: x.getImageData(0, 0, i.width, i.height) }; };
        const A = await load(a), B = await load(b);
        if (A.c.width !== B.c.width || A.c.height !== B.c.height) return { n: -1 };
        let n = 0, most = 0; const out = A.x.createImageData(A.c.width, A.c.height);
        for (let k = 0; k < A.d.data.length; k += 4) {
          const d = Math.max(Math.abs(A.d.data[k] - B.d.data[k]), Math.abs(A.d.data[k + 1] - B.d.data[k + 1]), Math.abs(A.d.data[k + 2] - B.d.data[k + 2]));
          if (d) { n++; most = Math.max(most, d); out.data[k] = 255; out.data[k + 3] = 255; }
          else { out.data[k] = B.d.data[k] >> 2; out.data[k + 1] = B.d.data[k + 1] >> 2; out.data[k + 2] = B.d.data[k + 2] >> 2; out.data[k + 3] = 255; }
        }
        A.x.putImageData(out, 0, 0);
        return { n, most, total: A.d.data.length / 4, diff: n ? A.c.toDataURL("image/png").split(",")[1] : null };
      }, { a: fs.readFileSync(pa).toString("base64"), b: fs.readFileSync(pb).toString("base64") });
      if (r.diff) fs.writeFileSync(path.join(B, `diff-${name}.png`), Buffer.from(r.diff, "base64"));
      if (r.n !== 0) bad.push(`frames ${name}: ${r.n < 0 ? "a different size" : `${r.n} pixels differ (most by ${r.most}), see diff-${name}.png`}`);
      const w = s => s.work ? s.work.total : null, f = k => (w(sa) ? `${w(sa)[k]} → ${w(sb)[k]}` : "");
      row(name, where, r.n < 0 ? "size differs" : r.n === 0 ? "0" : `**${r.n}** (${(100 * r.n / r.total).toFixed(2)}%)`, f("median"), f("p99"), f("worst"));
    }
    await browser.close();
    lines.push("");
  } else if (fa || fb) bad.push(`frames: only the ${fa ? "before" : "after"} run has them (did the other's frames.cjs fail?)`);
  console.log(lines.join("\n"));
  if (bad.length) { console.log("MISMATCH:\n" + bad.map(b => "- " + b).join("\n")); process.exit(1); }
  console.log("match: same state, same pictures");
}
main().catch(e => { console.error(e); process.exit(1); });
