// Diagnostic only. Never launch this on the laptop: an allocated cloud runner must
// set CLOUD_RIG=1. One browser at a time, five cold runs/config, fourteen-minute cap.
import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";
import { loadHouse } from "../../config/house/load.mjs";
import { frameRows, summarizeRuns, markdown } from "./house-profile-summary.mjs";
const require = createRequire(import.meta.url);
const { PHASES, COLUMNS, houseRoute, walkHouse } = require("./house-route.cjs");
if (process.env.CLOUD_RIG !== "1") throw Error("Requires an allocated cloud runner and CLOUD_RIG=1; no laptop browser run");
const out = path.resolve(process.argv[2] ?? "previews/house-profile"), N = 5;
const configs = [
  { name: "as-built", root: path.resolve(process.env.DIST ?? "dist"), sha: process.env.EXPECTED_SHA, query: "" },
  { name: "recording-off", root: path.resolve(process.env.DIST ?? "dist"), sha: process.env.EXPECTED_SHA, query: "&recording=0" },
];
if (process.env.BASE_DIST) configs.push({ name: "external-baseline", root: path.resolve(process.env.BASE_DIST), sha: process.env.BASE_SHA, query: "" });
for (const c of configs) {
  if (!/^[a-f0-9]{40}$/.test(c.sha ?? "")) throw Error(`${c.name}: exact EXPECTED_SHA / BASE_SHA required`);
  const version = JSON.parse(fs.readFileSync(path.join(c.root, "version.json"), "utf8"));
  if (version.version?.split(" · ").at(-1) !== c.sha.slice(0, 7)) throw Error(`${c.name}: dist/version.json does not name ${c.sha}`);
}
let playwright; try { playwright = require("playwright"); } catch { playwright = require("/opt/node22/lib/node_modules/playwright"); }
fs.mkdirSync(out, { recursive: true });
const result = { complete: false, repetitions: N, configs, viewport: "960x540", seed: 123, route: houseRoute(loadHouse()), groups: {}, runs: [] };
const deadline = Date.now() + 14 * 60_000 - 10_000;
let activeBrowser, activeServer, expired = false;
const cap = setTimeout(() => { expired = true; void activeBrowser?.close().catch(() => {}); activeServer?.close(); }, deadline - Date.now());
const remaining = max => { const left = deadline - Date.now(); if (expired || left <= 0) throw Error("Fourteen-minute profile cap reached"); return Math.max(1, Math.min(max, left)); };
const write = () => {
  result.groups = Object.fromEntries(configs.map(c => [c.name, result.runs.filter(r => r.config === c.name)]).filter(([, runs]) => runs.length).map(([name, runs]) => [name, summarizeRuns(runs)]));
  fs.writeFileSync(path.join(out, "summary.json"), JSON.stringify(result, null, 2) + "\n");
  fs.writeFileSync(path.join(out, "summary.md"), markdown(result));
};
async function serve(root) {
  const types = { ".html": "text/html", ".js": "text/javascript", ".json": "application/json", ".css": "text/css", ".png": "image/png", ".woff2": "font/woff2", ".wasm": "application/wasm", ".ogg": "audio/ogg", ".webp": "image/webp" };
  const server = http.createServer((req, res) => {
    let file = path.resolve(root, "." + decodeURIComponent(new URL(req.url, "http://localhost").pathname));
    const rel = path.relative(root, file);
    if (rel.startsWith("..") || path.isAbsolute(rel)) { res.writeHead(404); res.end(); return; }
    if (fs.existsSync(file) && fs.statSync(file).isDirectory()) file = path.join(file, "index.html");
    if (!fs.existsSync(file)) { res.writeHead(404); res.end(); return; }
    res.writeHead(200, { "content-type": types[path.extname(file)] ?? "application/octet-stream", "cache-control": "no-store" }); fs.createReadStream(file).pipe(res);
  });
  await new Promise(resolve => server.listen(0, "127.0.0.1", resolve)); return server;
}
try {
  for (let repeat = 1; repeat <= N; repeat++) for (const config of configs) {
    remaining(1);
    activeServer = await serve(config.root);
    activeBrowser = await playwright.chromium.launch({ timeout: remaining(60_000), args: ["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist"] });
    try {
      const page = await activeBrowser.newPage({ viewport: { width: 960, height: 540 } });
      page.setDefaultTimeout(remaining(240_000));
      const cdp = await page.context().newCDPSession(page), events = [], errors = [];
      let traceDropped = 0;
      cdp.on("Tracing.dataCollected", ({ value }) => { const keep = Math.min(value.length, Math.max(0, 250_000 - events.length)); for (let i = 0; i < keep; i++) events.push(value[i]); traceDropped += value.length - keep; });
      const traceDone = new Promise(resolve => cdp.once("Tracing.tracingComplete", resolve));
      page.on("pageerror", e => errors.push(e.message));
      page.on("console", m => { if (m.type() === "error") errors.push(m.text()); });
      await cdp.send("Profiler.enable"); await cdp.send("Profiler.setSamplingInterval", { interval: 500 }); await cdp.send("Profiler.start");
      await cdp.send("Tracing.start", { categories: "v8,disabled-by-default-v8.gc,blink.user_timing,devtools.timeline", transferMode: "ReportEvents" });
      const origin = `http://127.0.0.1:${activeServer.address().port}`;
      await page.goto(`${origin}/?creator=0&seed=123&quick=1&debug${config.query}`, { timeout: remaining(240_000) });
      const served = await page.evaluate(async () => (await fetch("version.json", { cache: "no-store" })).json());
      if (served.version?.split(" · ").at(-1) !== config.sha.slice(0, 7)) throw Error(`Served wrong build for ${config.name}`);
      await page.waitForFunction(() => window.witch?.ready, null, { timeout: remaining(240_000), polling: 500 });
      // Older external bases still require their start gesture; the candidate's
      // direct-play path is left untouched. Record this initial-state difference.
      const usedStartKey = await page.evaluate(() => window.witch.game.clock.paused);
      if (usedStartKey) await page.keyboard.press("Enter");
      await page.waitForFunction(() => !window.witch.game.clock.paused, null, { timeout: remaining(30_000) });
      const start = { ...await page.evaluate(() => ({ time: window.witch.game.clock.time, herTime: window.witch.game.herTime, pendingArt: window.witch.view.assets.pending, islandReady: window.witch.game.islandReady, mode: window.witch.game.witch.mode, x: window.witch.game.witch.x, z: window.witch.game.witch.z, userAgent: navigator.userAgent, cores: navigator.hardwareConcurrency })), usedStartKey };
      const walk = await page.evaluate(walkHouse, { route: result.route, profile: true, phases: PHASES });
      const { profile } = await cdp.send("Profiler.stop"); await cdp.send("Tracing.end"); await traceDone;
      const prefix = `${config.name}-${repeat}`;
      fs.writeFileSync(path.join(out, `${prefix}.cpuprofile`), JSON.stringify(profile));
      fs.writeFileSync(path.join(out, `${prefix}.trace.json`), JSON.stringify({ traceEvents: events, dropped: traceDropped }));
      if (errors.length || traceDropped) throw Error(`${prefix}: page errors ${JSON.stringify(errors)}, omitted trace events ${traceDropped}`);
      const measured = frameRows(walk, COLUMNS, events);
      result.runs.push({ config: config.name, sha: config.sha, repeat, start, frames: walk.frames, smokeMax: walk.worst, smokeAt: walk.at, rows: measured.rows, gc: measured.gc, profile: `${prefix}.cpuprofile`, trace: `${prefix}.trace.json` });
      write(); console.log(`${prefix}: ${walk.frames} route frames; witch max ${walk.worst.toFixed(3)} ms`);
    } finally { await activeBrowser.close().catch(() => {}); activeBrowser = undefined; await new Promise(resolve => activeServer.close(resolve)); activeServer = undefined; }
  }
  result.complete = true;
} catch (error) { result.error = String(error?.stack ?? error); process.exitCode = 1; }
finally { clearTimeout(cap); await activeBrowser?.close().catch(() => {}); activeServer?.close(); write(); }
console.log(path.join(out, "summary.md"));
