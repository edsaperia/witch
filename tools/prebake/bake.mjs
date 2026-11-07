// The art bake (Ed, 2026-11-06: "We should definitely do 2!"): draws the sets the art workers would draw in the player's browser on
// a first visit, as a build step would, and measures them: how many, how big as shipped, how long to draw. Not wired into the build
// or the game yet: the measurement (docs/notes/performance.md "The art baked at build time") came over the brief's limits, so the
// design waits for Ed's choice of what to bake. Serves tools/prebake/bake.html with Vite and the game's own config (so every set's
// cache key is the game's, its kinds' source fingerprints included), opens it in headless Chromium, lists every set that depends on
// nothing chosen in play (tools/prebake/page.ts) and draws those not already in the output folder in the game's own art workers.
// Each file is named by its set's cache key (render/artBaked.ts), so a set whose generator, genome or style changed gets a new name
// and is drawn again, and a full run removes those no longer listed. Writes <out>/manifest.json and <out>/report.json (each set's
// sizes, drawing time and the islands that ask for it).
//
//   node tools/prebake/bake.mjs [--out .art-baked] [--workers N] [--list] [--measure] [--only <kind,...>] [--islands <id,...>] [--limit N] [--extra <island>=<asks.json>,...]
//
// --list: only list (and write <out>/listing.json). --measure: brotli each file too, for the report. --only / --islands / --limit:
// bake a part (a sample). --extra: the sets a recorded first visit asked for beyond the listing (tools/prebake/coverage.cjs EXTRA).
import { createServer } from "vite";
import { existsSync, mkdirSync, readdirSync, readFileSync, rmSync, statSync, writeFileSync } from "node:fs";
import { availableParallelism } from "node:os";
import { join, resolve } from "node:path";
import { gzipSync, brotliCompressSync, constants } from "node:zlib";
import { createRequire } from "node:module";

const args = process.argv.slice(2), opt = (k, d) => { const i = args.indexOf(k); return i >= 0 ? args[i + 1] : d; };
const out = resolve(opt("--out", ".art-baked")), listOnly = args.includes("--list"), only = opt("--only", "")?.split(",").filter(Boolean) ?? [];
const islands = opt("--islands", "")?.split(",").filter(Boolean) ?? [], limit = Number(opt("--limit", "0")) || Infinity;
const workers = Number(opt("--workers", "0")) || Math.max(1, Math.min(6, availableParallelism()));
const measure = args.includes("--measure"); // (also brotli each file, for the report)
mkdirSync(out, { recursive: true });

const require = createRequire(import.meta.url);
const { chromium } = (() => { try { return require("playwright"); } catch { return require("/opt/node22/lib/node_modules/playwright"); } })();

const t0 = performance.now();
const saved = new Map(); // name -> { raw, gz, br, ms }
const server = await createServer({
  configFile: resolve("vite.config.ts"), logLevel: "error", clearScreen: false,
  server: { host: "127.0.0.1", port: 0, hmr: false, watch: null },
  optimizeDeps: { noDiscovery: true, include: [] },
  plugins: [{ name: "prebake-sink", configureServer(s) { s.middlewares.use("/__prebake/put", (req, res) => {
    const u = new URL(req.url, "http://x"), name = u.searchParams.get("name"), ms = Number(u.searchParams.get("ms"));
    if (!/^[0-9a-f]{20}$/.test(name ?? "")) { res.statusCode = 400; res.end(); return; }
    const chunks = [];
    req.on("data", c => chunks.push(c));
    req.on("end", () => {
      const raw = Buffer.concat(chunks), gz = gzipSync(raw, { level: 9 });
      writeFileSync(join(out, name + ".bin"), gz);
      saved.set(name, { raw: raw.length, gz: gz.length, ...(measure ? { br: brotliCompressSync(raw, { params: { [constants.BROTLI_PARAM_QUALITY]: 11, [constants.BROTLI_PARAM_LGWIN]: 24 } }).length } : {}), ms });
      res.end("ok");
    });
  }); } }],
});
await server.listen();
const base = `http://127.0.0.1:${server.config.server.port ?? server.httpServer.address().port}`;
const browser = await chromium.launch();
const page = await browser.newPage();
const errors = [];
page.on("pageerror", e => errors.push(String(e)));
page.on("console", m => { if (m.type() === "error") errors.push(m.text()); });
let code = 0;
try {
  await page.goto(`${base}/tools/prebake/bake.html`);
  await page.waitForFunction(() => window.prebakeReady === true, null, { timeout: 300_000 });
  const listedAt = performance.now();
  let { entries, skipped, style } = await page.evaluate(() => window.prebake.enumerate());
  // --extra <island>=<file>,...: the sets a recorded first visit asked for beyond the listing (tools/prebake/coverage.cjs EXTRA)
  for (const x of (opt("--extra", "") ?? "").split(",").filter(Boolean)) {
    const [isl, file] = x.split("=");
    entries = await page.evaluate(([l, i]) => window.prebake.addExtra(l, i), [JSON.parse(readFileSync(file, "utf8")), isl]);
  }
  console.log(`listed ${entries.length} sets in ${((performance.now() - listedAt) / 1000).toFixed(1)} s; not baked (chosen in play): ${JSON.stringify(skipped)}`);
  if (listOnly) writeFileSync(join(out, "listing.json"), JSON.stringify(entries));
  const byCat = {};
  for (const e of entries) { const c = byCat[e.cat] ??= { all: 0, first: 0 }; c.all++; if (e.first.length) c.first++; }
  console.log("by category (all / asked on some island's first visit): " + Object.entries(byCat).map(([c, n]) => `${c} ${n.all}/${n.first}`).join(", "));
  const want = entries.map((e, i) => ({ ...e, i })).filter(e => (!only.length || only.includes(e.kind)) && (!islands.length || e.islands.some(x => islands.includes(x)) || e.islands.includes("*"))).slice(0, limit);
  const have = new Set(readdirSync(out).filter(f => f.endsWith(".bin")).map(f => f.slice(0, -4)));
  const todo = want.filter(e => !have.has(e.name));
  console.log(`${want.length} wanted, ${want.length - todo.length} already baked, ${todo.length} to draw with ${workers} workers`);
  let drawnAt = performance.now(), results = [];
  if (!listOnly && todo.length) {
    // (in batches, so a long bake reports as it goes)
    for (let k = 0; k < todo.length; k += 24) {
      const part = todo.slice(k, k + 24).map(e => e.i);
      results.push(...await page.evaluate(([w, n]) => window.prebake.bake(w, n), [part, workers]));
      console.log(`  ${Math.min(k + 24, todo.length)}/${todo.length} drawn, ${((performance.now() - drawnAt) / 1000).toFixed(0)} s`);
    }
    const failed = results.filter(r => r.error);
    if (failed.length) { code = 1; for (const f of failed.slice(0, 10)) console.error(`failed: ${entries[f.i].key}: ${f.error}`); }
  }
  const drawMs = performance.now() - drawnAt;
  // The manifest: every wanted set now in the folder (a full bake: every listed set); files no longer listed removed.
  const wanted = new Set(want.map(e => e.name)), files = {};
  if (!only.length && !islands.length && limit === Infinity) for (const f of readdirSync(out)) if (f.endsWith(".bin") && !wanted.has(f.slice(0, -4))) rmSync(join(out, f));
  for (const e of want) { const p = join(out, e.name + ".bin"); if (existsSync(p)) files[e.name] = statSync(p).size; }
  writeFileSync(join(out, "manifest.json"), JSON.stringify({ schema: 1, files }));
  // The report: each set with its sizes (this run's drawn ones with their time; the rest by their file).
  const old = existsSync(join(out, "report.json")) ? JSON.parse(readFileSync(join(out, "report.json"), "utf8")) : { sets: [] };
  const oldBy = new Map(old.sets.map(s => [s.name, s]));
  const sets = want.filter(e => files[e.name]).map(e => ({ name: e.name, key: e.key, kind: e.kind, cat: e.cat, islands: e.islands, first: e.first, ...(oldBy.get(e.name) ?? {}), ...(saved.get(e.name) ?? {}), shipped: files[e.name] }));
  writeFileSync(join(out, "report.json"), JSON.stringify({ style, at: new Date().toISOString(), drawnThisRun: results.length, drawMs: Math.round(drawMs), totalMs: Math.round(performance.now() - t0), workers, skipped, sets }));
  const total = Object.values(files).reduce((a, b) => a + b, 0);
  console.log(`manifest: ${Object.keys(files).length} sets, ${(total / 1048576).toFixed(1)} MB shipped; drew ${results.length} in ${(drawMs / 1000).toFixed(0)} s`);
  if (errors.length) { console.error("page errors:\n" + errors.slice(0, 10).join("\n")); code = 1; }
} catch (e) {
  console.error(e); code = 1;
} finally {
  await browser.close(); await server.close();
}
process.exit(code);
