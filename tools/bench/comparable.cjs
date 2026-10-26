// Compare like with like (Ed, 2026-10-26, out of the research on testing: this morning's "v4821 slower than v4522" set a wave-0
// run on one island against waves 0 to 4 after a sail on another). Every playtest log run (the L key, platform/playtestLog.ts) and
// every bench and perf tool's result carries a comparability key: what was run where, on what, with what. A tool that compares
// two runs checks the keys first and refuses a pair that differs on anything but what's being tested, naming the fields, unless
// told it's meant (--override). The playtest log's samples are split into segments by scene (island, wave, mode) so medians are
// a segment's, not a session's. Pure: the bench's compare (tools/bench/compare.cjs), the playtest compare
// (tools/playtest/compare.mjs) and their tests (comparable.test.ts) use it; the game builds its keys with src/app/compareKey.ts.

/** A key's fields, in the order a refusal lists them. `knobs` is compared knob by knob (`knobs.<path>`). */
const FIELDS = ["build", "seed", "world", "island", "scene", "spot", "viewport", "pixelScale", "renderer", "machine", "knobs"];

const same = (a, b) => JSON.stringify(a ?? null) === JSON.stringify(b ?? null);
/** Is `field` (or a knob `knobs.<path>`) among what's being tested: by its name, or for a knob by `knobs` or its own path. */
const tested = (field, testing) => testing.includes(field) || (field.startsWith("knobs.") && testing.includes("knobs"));

/** Where two keys differ, but for what's being tested: [{ field, a, b }], fields in FIELDS order, knobs one by one. */
function keyDiff(a, b, testing = []) {
  const out = [];
  for (const f of FIELDS) {
    if (f === "knobs") {
      const ka = a.knobs ?? {}, kb = b.knobs ?? {};
      for (const p of [...new Set([...Object.keys(ka), ...Object.keys(kb)])].sort()) {
        const field = `knobs.${p}`;
        if (!tested(field, testing) && !same(ka[p], kb[p])) out.push({ field, a: ka[p] ?? "(as built)", b: kb[p] ?? "(as built)" });
      }
    } else if (!tested(f, testing) && !same(a[f], b[f])) out.push({ field: f, a: a[f] ?? "(none)", b: b[f] ?? "(none)" });
  }
  return out;
}

/** Whether two runs may be compared: `ok` when their keys differ on nothing but `testing`, or with `override` (then `forced`);
 *  `text` says which fields differ, before and after, and how to mean it. A run without a key (one made before keys) can't be
 *  judged: `ok`, with a warning in `text`. */
function checkComparable(a, b, { testing = ["build"], override = false, what = "these runs" } = {}) {
  if (!a || !b) return { ok: true, diffs: [], forced: false, text: `warning: ${!a && !b ? "neither run has" : `the ${!a ? "first" : "second"} run has no`} comparability key (made before keys): can't tell whether ${what} are like for like` };
  const diffs = keyDiff(a, b, testing);
  if (!diffs.length) return { ok: true, diffs, forced: false, text: `comparable: ${what} match on everything but ${testing.join(", ") || "nothing"}` };
  const list = diffs.map(d => `  ${d.field}: ${fmt(d.a)} → ${fmt(d.b)}`).join("\n");
  if (override) return { ok: true, diffs, forced: true, text: `compared anyway (--override): ${what} also differ in\n${list}` };
  return { ok: false, diffs, forced: false, text: `REFUSED: ${what} differ in more than ${testing.join(", ") || "nothing"}:\n${list}\n(--testing <field,...> to say what's being tested, or --override if you mean it)` };
}
const fmt = v => (typeof v === "string" ? v : JSON.stringify(v));

/** A playtest sample's scene: its island (the run's), its wave and her mode (ground, treetops, house, zoo; a log from before
 *  `scene` was kept falls back to the view's mode). */
function sceneOf(sample, island = "?") {
  const mode = sample.scene ?? (sample.view?.mode === "treetop" ? "treetops" : sample.view?.mode) ?? "?";
  return `${island} · wave ${sample.wave} · ${mode}`;
}

const median = xs => { const s = xs.filter(x => typeof x === "number" && Number.isFinite(x)).sort((p, q) => p - q); return s.length ? s[Math.floor((s.length - 1) / 2)] : null; };

/** A playtest run's samples split where the scene changes (consecutive samples of one scene make one segment; a scene come back
 *  to later is a segment of its own), each with its time span, its sample count and the medians of its frames' numbers. */
function segments(run) {
  const island = run.key?.island ?? "?", out = [];
  for (const s of run.samples ?? []) {
    const scene = sceneOf(s, island), last = out[out.length - 1];
    if (last && last.scene === scene) { last.samples.push(s); last.t1 = s.t; } else out.push({ scene, t0: s.t, t1: s.t, samples: [s] });
  }
  return out.map(({ samples, ...seg }) => {
    const f = k => median(samples.map(s => s.frames?.[k]));
    return { ...seg, n: samples.length, ms: f("ms"), p95: f("p95"), cpu: f("cpu"), gpu: f("gpu"), over20: f("over20") };
  });
}

/** Segments merged by scene (all of a scene's samples together, wherever in the run): for setting two runs side by side. */
function byScene(run) {
  const island = run.key?.island ?? "?", m = new Map();
  for (const s of run.samples ?? []) { const k = sceneOf(s, island); if (!m.has(k)) m.set(k, []); m.get(k).push(s); }
  return new Map([...m].map(([scene, samples]) => [scene, { scene, n: samples.length, ms: median(samples.map(s => s.frames?.ms)), p95: median(samples.map(s => s.frames?.p95)), cpu: median(samples.map(s => s.frames?.cpu)), gpu: median(samples.map(s => s.frames?.gpu)) }]));
}

/** A command line's --testing a,b and --override, taken out of `args`. */
function compareFlags(args, testing = ["build"]) {
  const ti = args.indexOf("--testing"), t = ti >= 0 ? args.splice(ti, 2)[1].split(",").map(s => s.trim()).filter(Boolean) : testing;
  const oi = args.indexOf("--override"); if (oi >= 0) args.splice(oi, 1);
  return { testing: t, override: oi >= 0 };
}

/** The Node side of a key, for a tool with no page (the rules' benches) or to stand beside a page's: the build (BUILD, else the
 *  git commit), the machine (CPU, cores, OS, Node). */
function nodeKey(extra = {}) {
  const os = require("os");
  let build = process.env.BUILD;
  if (!build) try { build = require("child_process").execSync("git rev-parse --short HEAD", { stdio: ["ignore", "pipe", "ignore"] }).toString().trim(); } catch { build = "?"; }
  const cpu = os.cpus()[0]?.model?.replace(/\s+/g, " ").trim() ?? "?";
  return { build, seed: null, world: null, island: null, scene: null, spot: null, viewport: null, pixelScale: null, renderer: "none (rules only)", machine: `${cpu} · ${os.cpus().length} cores · ${os.platform()} · node ${process.versions.node}`, knobs: {}, ...extra };
}

/** A page's key (window.witch.compareKey, src/app/compareKey.ts) as a browser tool takes it: the scene and route it names, and
 *  the Node machine's CPU added to the browser's own summary. Null from a build made before keys (a compare then warns). */
async function pageKey(page, extra = {}) {
  const k = await page.evaluate(() => (window.witch && window.witch.compareKey ? window.witch.compareKey() : null)).catch(() => null);
  return k ? { ...k, machine: `${k.machine} · ${nodeKey().machine}`, ...extra } : null;
}

module.exports = { FIELDS, keyDiff, checkComparable, sceneOf, segments, byScene, median, compareFlags, nodeKey, pageKey };
