// Compares two benchmark outs (Part B of the refactor: a change that moves code and nothing else
// should match): the rules fingerprints (rules.json, from tools/bench/run.mjs) part by part, the
// scene shots (frames.json and <scene>.png, from tools/bench/frames.cjs) pixel by pixel, and puts
// the timings side by side. Writes <after>/diff-<scene>.png for any shot that differs (the
// differing pixels in red over the shot, dimmed). Exits 1 on any mismatch the PR hasn't declared (tools/bench/expect.cjs:
// --expect tools/bench/expect/<branch>.json, what it means to change and why; the Bench workflow passes the PR's own). Refuses
// (exit 2) two runs whose comparability keys differ in more than the build (tools/bench/comparable.cjs): --testing <fields> to say
// what else is being tested, --override to compare them anyway.
//   node tools/bench/compare.cjs <before out> <after out> [--expect <file>] [--testing build,...] [--override]
const fs = require("fs");
const path = require("path");
const annotations = require('../ci/annotations.cjs').createSink();
let playwright;
try { playwright = require("playwright"); } catch { playwright = require("/opt/node22/lib/node_modules/playwright"); }

const { readExpect, judge } = require("./expect.cjs");
const { checkComparable, compareFlags } = require("./comparable.cjs");
const args = process.argv.slice(2), ei = args.indexOf("--expect"), expectFile = ei >= 0 ? args.splice(ei, 2)[1] : null;
const flags = compareFlags(args); // (--testing <fields>, build by default; --override: compare runs whose keys differ anyway)
const [A, B] = args.map(p => path.resolve(p));
if (!A || !B) { console.error("usage: node tools/bench/compare.cjs <before> <after> [--expect <file>] [--testing build,...] [--override]"); process.exit(2); }
const expect = readExpect(fs, expectFile);
const read = (dir, f) => (fs.existsSync(path.join(dir, f)) ? JSON.parse(fs.readFileSync(path.join(dir, f), "utf8")) : null);
// (each mismatch keyed, so a PR can declare it: rules:<state part>, frames:<scene>; none for what can't be declared)
const lines = [], bad = [], miss = (key, text) => bad.push({ key, text });
const row = (...cells) => lines.push(`| ${cells.join(" | ")} |`);

async function main() {
  // Like with like first (tools/bench/comparable.cjs): each part's comparability keys may differ only in what's being tested.
  for (const [f, what] of [["rules.json", "the rules runs"], ["frames.json", "the frames runs"]]) {
    const a = read(A, f), b = read(B, f);
    if (!a || !b) continue;
    const c = checkComparable(a.key, b.key, { ...flags, what });
    console.log(c.text);
    if (!c.ok) { annotations.error('bench comparability', c.text, { file: __filename }); process.exit(2); }
  }
  // The rules: same fingerprints at every checkpoint, every seed.
  const ra = read(A, "rules.json"), rb = read(B, "rules.json");
  if (ra && rb) {
    lines.push("### Rules (stepGame at the late wave)", "", "| seed | wave | creatures | median ms | p99 ms | worst ms | state |", "|---|---|---|---|---|---|---|");
    for (const sa of ra.seeds) {
      const sb = rb.seeds.find(s => s.seed === sa.seed);
      if (!sb) { miss(null, `rules: seed ${sa.seed} missing after`); continue; }
      const diffs = [], parts = new Map();
      sa.prints.forEach((p, i) => { const q = sb.prints[i]; if (!q) { diffs.push(`step ${p.step} missing`); miss(null, `rules seed ${sa.seed}: step ${p.step} missing after`); return; } for (const k of Object.keys(p.print)) if (k !== "all" && p.print[k] !== q.print[k]) { diffs.push(`${k} at step ${p.step}`); if (!parts.has(k)) parts.set(k, p.step); } });
      for (const [k, step] of parts) miss(`rules:${k}`, `rules seed ${sa.seed}: ${k} (first at step ${step})`);
      const f = (a, b) => `${a} → ${b}`;
      row(sa.seed, f(sa.wave, sb.wave), f(sa.creatures, sb.creatures), f(sa.step.median, sb.step.median), f(sa.step.p99, sb.step.p99), f(sa.step.worst, sb.step.worst), diffs.length ? `**differs** (${diffs[0]})` : "same");
    }
    lines.push("");
  } else if (ra || rb) miss(null, `rules: only the ${ra ? "before" : "after"} run has them`);
  if (!ra && !rb && !read(A, "frames.json") && !read(B, "frames.json")) miss(null, "nothing to compare: neither run wrote rules.json or frames.json");

  // The frames: same pictures, and the timings.
  const fa = read(A, "frames.json"), fb = read(B, "frames.json");
  if (fa && fb) {
    const browser = await playwright.chromium.launch();
    const page = await browser.newPage();
    if (!!fa.quick !== !!fb.quick) miss(null, `frames: a ${fa.quick ? "quick" : "full"} run against a ${fb.quick ? "quick" : "full"} one (compare like with like)`);
    lines.push(`### Frames (${(fa.viewport ?? "1280x720").replace("x", "×")}${fa.quick ? ", quick" : ""}, seed ${fa.seed})`, "", "| scene | where | pixels differing | frame work median ms | p99 ms | worst ms |", "|---|---|---|---|---|---|");
    for (const [name, sa] of Object.entries(fa.scenes)) {
      const sb = fb.scenes[name];
      if (!sb) { miss(null, `frames: ${name} missing after`); continue; }
      const where = sa.x === sb.x && sa.z === sb.z && sa.time === sb.time ? "same" : `**${sa.x},${sa.z} → ${sb.x},${sb.z}**`;
      if (where !== "same") miss(`frames:${name}`, `frames ${name}: the witch ended elsewhere (${sa.x},${sa.z} at ${sa.time} s → ${sb.x},${sb.z} at ${sb.time} s)`);
      const pa = path.join(A, `${name}.png`), pb = path.join(B, `${name}.png`);
      const r = await page.evaluate(async ({ a, b }) => {
        const load = async s => { const i = new Image(); i.src = "data:image/png;base64," + s; await i.decode(); const c = document.createElement("canvas"); c.width = i.width; c.height = i.height; const x = c.getContext("2d"); x.drawImage(i, 0, 0); return { c, x, d: x.getImageData(0, 0, i.width, i.height) }; };
        const A = await load(a), B = await load(b);
        if (A.c.width !== B.c.width || A.c.height !== B.c.height) return { n: -1 };
        let n = 0, most = 0; const out = A.x.createImageData(A.c.width, A.c.height), W = A.c.width, H = A.c.height;
        // (where they differ, for a log one can't fetch the picture from: the box round the differing pixels, and their counts over a 12 by 6 grid)
        let x0 = W, y0 = H, x1 = -1, y1 = -1; const grid = new Array(72).fill(0);
        for (let k = 0; k < A.d.data.length; k += 4) {
          const d = Math.max(Math.abs(A.d.data[k] - B.d.data[k]), Math.abs(A.d.data[k + 1] - B.d.data[k + 1]), Math.abs(A.d.data[k + 2] - B.d.data[k + 2]));
          if (d) { n++; most = Math.max(most, d); out.data[k] = 255; out.data[k + 3] = 255; const px = (k >> 2) % W, py = Math.floor((k >> 2) / W); if (px < x0) x0 = px; if (px > x1) x1 = px; if (py < y0) y0 = py; if (py > y1) y1 = py; grid[Math.floor(py * 6 / H) * 12 + Math.floor(px * 12 / W)]++; }
          else { out.data[k] = B.d.data[k] >> 2; out.data[k + 1] = B.d.data[k + 1] >> 2; out.data[k + 2] = B.d.data[k + 2] >> 2; out.data[k + 3] = 255; }
        }
        A.x.putImageData(out, 0, 0);
        return { n, most, total: A.d.data.length / 4, box: n ? [x0, y0, x1, y1] : null, grid: n ? Array.from({ length: 6 }, (_, r) => grid.slice(r * 12, r * 12 + 12).join(" ")) : null, diff: n ? A.c.toDataURL("image/png").split(",")[1] : null };
      }, { a: fs.readFileSync(pa).toString("base64"), b: fs.readFileSync(pb).toString("base64") });
      if (r.diff) fs.writeFileSync(path.join(B, `diff-${name}.png`), Buffer.from(r.diff, "base64"));
      if (r.n !== 0) miss(`frames:${name}`, `frames ${name}: ${r.n < 0 ? "a different size" : `${r.n} pixels differ (most by ${r.most}), see diff-${name}.png; within x ${r.box[0]}..${r.box[2]}, y ${r.box[1]}..${r.box[3]} of ${fa.viewport ?? "the picture"}; by a 12 by 6 grid:\n    ${r.grid.join("\n    ")}`}`);
      if (JSON.stringify(sa.start ?? null) !== JSON.stringify(sb.start ?? null)) miss(null, `frames ${name}: unequal controlled starting boundaries (${JSON.stringify(sa.start)} vs ${JSON.stringify(sb.start)})`);
      // (the frames art landed on, frames.cjs `landed`: told apart, a picture that differs may be the art's timing, not the change)
      if (r.n !== 0 && sa.landed && sb.landed && JSON.stringify(sa.landed) !== JSON.stringify(sb.landed)) miss(`frames:${name}`, `frames ${name}: its art landed on other frames (before ${JSON.stringify(sa.landed)}, after ${JSON.stringify(sb.landed)}): a change in what's asked for, or the bench's art wait broken (frames.cjs frames)`);
      const w = s => s.work ? s.work.total : null, f = k => (w(sa) ? `${w(sa)[k]} → ${w(sb)[k]}` : "");
      row(name, where, r.n < 0 ? "size differs" : r.n === 0 ? "0" : `**${r.n}** (${(100 * r.n / r.total).toFixed(2)}%)`, f("median"), f("p99"), f("worst"));
    }
    await browser.close();
    lines.push("");
  } else if (fa || fb) miss(null, `frames: only the ${fa ? "before" : "after"} run has them (did the other's frames.cjs fail?)`);
  console.log(lines.join("\n"));
  const { ok, left, unseen } = judge(bad, expect);
  if (expect) console.log(`Declared (${expectFile}): ${expect.reason}`);
  if (ok.length) console.log("DECLARED (differ as the PR says):\n" + ok.map(b => `- ${b.text}\n  why: ${b.why}`).join("\n"));
  if (unseen.length) console.log("Declared but unchanged (stale, or a change that didn't happen?): " + unseen.join(", "));
  if (left.length) { for (const b of left) annotations.error('bench', `${b.key ?? 'unclassified'}: ${b.text}`, { file: __filename }); console.log("MISMATCH" + (expect ? " (not declared)" : "") + ":\n" + left.map(b => "- " + b.text + (b.key ? ` [${b.key}]` : "")).join("\n")); process.exit(1); }
  console.log(ok.length ? "match: only the declared differences" : "match: same state, same pictures");
}
main().catch(e => { annotations.error('bench crash', String(e), { file: __filename }); console.error(e); process.exit(1); });
