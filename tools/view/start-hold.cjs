// The start hold (the coordinator, 2026-10-26: "about 7 s in some starts, 2 s in others"): cold starts of the built game, a fresh
// browser each, ?creator=0&quick=1&seed=123, the start key (Enter) pressed by the page itself the moment it's ready (the worst case:
// any later and the GPU has caught up meanwhile). For each: the GPU's backlog at ready (a fence's time to signal), the first frame
// after the key, the longest in the 15 s after, the shader programs made after it, and the view's prep marks.
//   node tools/view/start-hold.cjs [dist] [runs] [out.json]     (NOENTER=1: no key; FENCE=1: the key only once the fence signals;
//   PROF=1: a CPU profile of any start whose first frame passes 5 s)
// A frame here (the cloud's software renderer) is 2.3 to 3 s on its own; a held start's first one was 8 to 9.3 s.
const { chromium } = require("playwright"), http = require("http"), fs = require("fs"), path = require("path");
const { pageKey } = require("../lib/comparable.cjs"); // (the result's comparability key: tools/lib/comparable.cjs)
let KEY = null;
const [dist = path.join(__dirname, "../../dist"), runs = "8", out] = process.argv.slice(2);
const types = { ".js": "text/javascript", ".html": "text/html", ".css": "text/css", ".json": "application/json", ".png": "image/png", ".wasm": "application/wasm", ".ogg": "audio/ogg", ".woff2": "font/woff2" };
const server = http.createServer((q, r) => { let f = path.join(dist, decodeURIComponent(q.url.split("?")[0])); if (fs.existsSync(f) && fs.statSync(f).isDirectory()) f = path.join(f, "index.html"); if (!fs.existsSync(f)) { r.writeHead(404); return r.end(); } r.writeHead(200, { "content-type": types[path.extname(f)] || "application/octet-stream" }); fs.createReadStream(f).pipe(r); });
const inject = () => {
  window.__gl = { links: 0, blocks: [], frames: [] };
  const P = WebGL2RenderingContext.prototype, link = P.linkProgram, gpp = P.getProgramParameter, log = P.getProgramInfoLog;
  P.linkProgram = function (p) { p.__at = performance.now(); p.__n = ++window.__gl.links; p.__ready = !!window.witch?.view && window.__readyAt !== undefined; return link.call(this, p); };
  const timed = (name, f) => function (p, ...a) { const t = performance.now(), r = f.call(this, p, ...a), d = performance.now() - t; if (d > 100) window.__gl.blocks.push({ name, param: a[0], ms: Math.round(d), at: Math.round(t), linkAt: Math.round(p.__at ?? -1), n: p.__n, enter: window.__enterAt ?? null }); return r; };
  P.getProgramParameter = timed("getProgramParameter", gpp); P.getProgramInfoLog = timed("getProgramInfoLog", log);
  const go = setInterval(() => { if (!window.witch?.ready) return; clearInterval(go); window.__readyAt = performance.now();
    const press = () => { window.__enterAt = performance.now(); if (location.search.includes("noenter")) return; const o = { code: "Enter", key: "Enter", bubbles: true }; document.body.dispatchEvent(new KeyboardEvent("keydown", o)); setTimeout(() => document.body.dispatchEvent(new KeyboardEvent("keyup", o)), 80); };
    const gl = window.witch.view.renderer.getContext(), f = gl.fenceSync(gl.SYNC_GPU_COMMANDS_COMPLETE, 0); gl.flush();
    const poll = setInterval(() => { if (gl.clientWaitSync(f, 0, 0) === gl.TIMEOUT_EXPIRED) return; clearInterval(poll); gl.deleteSync(f); window.__fenceMs = Math.round(performance.now() - window.__readyAt); if (location.search.includes("fence")) press(); }, 25);
    if (!location.search.includes("fence")) press(); }, 20);
  let last = 0; const tick = t => { if (last && window.__enterAt !== undefined && t - last > 400) window.__gl.frames.push({ at: Math.round(last), ms: Math.round(t - last) }); last = t; requestAnimationFrame(tick); }; requestAnimationFrame(tick);
};
server.listen(0, async () => {
  const res = [];
  for (let i = 0; i < +runs; i++) {
    const b = await chromium.launch(), p = await b.newPage({ viewport: { width: 1280, height: 720 } });
    await p.addInitScript(inject);
    const logs = []; p.on("console", m => { if (/warn|error/.test(m.type())) logs.push(m.text().slice(0, 160)); });
    const cdp = process.env.PROF ? await p.context().newCDPSession(p) : null;
    const t0 = Date.now();
    if (cdp) { await cdp.send("Profiler.enable"); await cdp.send("Profiler.setSamplingInterval", { interval: 1000 }); await cdp.send("Profiler.start"); }
    await p.goto(`http://127.0.0.1:${server.address().port}/?creator=0&quick=1&seed=123${process.env.NOENTER ? "&noenter" : ""}${process.env.FENCE ? "&fence" : ""}`);
    await p.waitForFunction(() => window.witch && window.witch.ready, null, { timeout: 900000, polling: 200 });
    KEY ??= await pageKey(p, { spot: "start-hold.cjs: a cold start, the start key at ready" });
    const progs = () => p.evaluate(() => window.witch.view.renderer.info.programs.length);
    const names = () => p.evaluate(() => window.witch.view.renderer.info.programs.map(q => `${q.id}:${q.name}:${q.cacheKey}`));
    const n0 = await names();
    const before = await progs();

    if (!process.env.NOENTER) await p.waitForFunction(() => window.witch.game.clock.time > 0, null, { timeout: 300000, polling: 200 }).catch(() => {});
    await p.waitForTimeout(15000);
    const g = await p.evaluate(() => ({ ...window.__gl, fence: window.__fenceMs, enter: Math.round(window.__enterAt), ready: Math.round(window.__readyAt), time: window.witch.game.clock.time }));
    const marks = await p.evaluate(() => performance.getEntriesByType("mark").filter(m => /^witch:(prep|ready)/.test(m.name)).map(m => `${m.name.replace("witch:", "")}@${Math.round(m.startTime)}`));
    if (cdp) { const { profile } = await cdp.send("Profiler.stop"); if ((g.frames[0]?.ms ?? 0) > 5000) fs.writeFileSync(`${out || "sh"}-run${i}.cpuprofile`, JSON.stringify(profile)); }
    const after = await progs(); const n1 = await names(); const added = n1.filter(x => !n0.includes(x));
    const holds = g.frames.filter(f => f.ms > 1000);
    const r = { run: i, loadS: ((Date.now() - t0) / 1000).toFixed(1), enter: g.enter, programs: [before, after], fence: g.fence, links: g.links, marks, logs, added: added.length, addedKeys: added.map(a => a.split(":")[2].slice(0, 40)), max: Math.max(0, ...g.frames.map(f => f.ms)), first: g.frames[0] ?? null, holds: holds.length, blocks: g.blocks.filter(x => x.at >= g.enter - 50), blocksBefore: g.blocks.filter(x => x.at < g.enter - 50).length, gameTime: g.time.toFixed(1) };
    console.log(JSON.stringify(r));
    res.push(r);
    await b.close();
  }
  if (out) fs.writeFileSync(out, JSON.stringify({ key: KEY, runs: res }, null, 1));
  console.log(`programs made after the start key: ${res.map(r => r.added).join(" ")}; fence ${res.map(r => r.fence).join(" ")} ms; first frame after it: ${res.map(r => r.first ? (r.first.ms / 1000).toFixed(1) : "-").join(" ")} s; longest: ${res.map(r => (r.max / 1000).toFixed(1)).join(" ")} s`);
  server.close();
});
