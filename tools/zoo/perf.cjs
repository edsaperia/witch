// The zoo's cost (the coordinator's ask from Ed, 2026-10-26, after #1184, #1203 and #1206): the built game's zoo opened four ways,
// every island found (?zoo&all) or a typical player's few (home's ten and FOUND), straight from a link or from the bestiary book over
// a night (app/zooOverlay.ts: a whole second game page in a frame, the night paused under it), and for each: when its first frame
// came, when the art round her was in (the start's: the night's ready), when the whole zoo's art was (the art queue empty and no
// worker busy); the JS heap (after a collection) and the GPU textures (counted, and their bytes reckoned from their sizes and
// formats: an estimate); and a walk along the streets and a flight over the islands, a fixed frame at a time (1/60 s) with the
// picture's draw left out (the cloud's software renderer's own time isn't the zoo's), yielding between frames so the art arriving
// and the night's page under the frame run as they would: each frame's own work (rules and view) and its whole wall time, their
// median, p95 and worst, and the stalls (a frame's wall time over 100 ms). With the book, also the night's page's own work while
// the zoo is over it (its paused frames, drawn under the frame).
// A link's zoo is then loaded again on the same browser (WARM=0: not), with what it kept (the chart's coasts, the art cache): its
// first frame, ready and art again.
//   npm run build && node tools/zoo/perf.cjs [out.json] [dist]   ONLY=direct-all,direct-typical,book-all,book-typical
//   FOUND=lion,penguin,tiger  WALK=60 FLY=60 (game seconds)  WAIT=600 (s, for the zoo's art)  NIGHT=300 (s of the night's art before
//   the book's opened)  SIZE=1280x720
const http = require("http"), fs = require("fs"), path = require("path");
let playwright; try { playwright = require("playwright"); } catch { playwright = require("/opt/node22/lib/node_modules/playwright"); }
const [outArg, distArg] = process.argv.slice(2);
const root = path.resolve(distArg || path.join(__dirname, "../../dist"));
const [W, H] = (process.env.SIZE || "1280x720").split("x").map(Number), WAIT = Number(process.env.WAIT || 600), NIGHT = Number(process.env.NIGHT || 300);
const WALK = Number(process.env.WALK || 60), FLY = Number(process.env.FLY || 60), FOUND = process.env.FOUND || "lion,penguin,tiger";
const ONLY = (process.env.ONLY || "direct-all,direct-typical,book-all,book-typical").split(",");
const types = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".json": "application/json", ".png": "image/png", ".wasm": "application/wasm", ".woff2": "font/woff2", ".ogg": "audio/ogg", ".mp3": "audio/mpeg", ".webp": "image/webp" };
const t0 = Date.now(), log = (...a) => console.log(`[${((Date.now() - t0) / 1000).toFixed(0)} s]`, ...a);

// (in the page: the GPU textures in its view's scene, by size and format, and three.js's own counts)
const TEXTURES = view => {
  const seen = new Set(); let bytes = 0;
  const add = t => {
    if (!t || !t.isTexture || seen.has(t)) return; seen.add(t);
    const im = t.image || {}, w = im.width || 0, h = im.height || 0, d = im.depth || 1;
    const ch = t.format === 1028 || t.format === 1013 ? 1 : t.format === 1030 ? 2 : 4, per = t.type === 1015 ? 4 : t.type === 1016 ? 2 : 1;
    const b = w * h * d * ch * per * (t.generateMipmaps && t.minFilter !== 1003 && t.minFilter !== 1006 ? 4 / 3 : 1);
    bytes += b; list.push({ name: t.name || t.constructor.name, w, h, d, ch, per, mb: +(b / 1048576).toFixed(1) });
  };
  const list = [];
  view.scene.traverse(o => {
    for (const m of Array.isArray(o.material) ? o.material : [o.material]) {
      if (!m) continue;
      for (const k in m) if (m[k] && m[k].isTexture) add(m[k]);
      if (m.uniforms) for (const k in m.uniforms) { const v = m.uniforms[k] && m.uniforms[k].value; if (Array.isArray(v)) v.forEach(add); else add(v); }
    }
  });
  const mem = view.renderer.info.memory;
  return { top: list.sort((a, b) => b.mb - a.mb).slice(0, 10), inScene: seen.size, mb: +(bytes / 1048576).toFixed(1), textures: mem.textures, geometries: mem.geometries, programs: (view.renderer.info.programs || []).length };
};

// (in the page: a walk or a flight through a list of points, a fixed frame at a time, yielding between frames)
const ROUTE = async ([pts, mode, secs]) => {
  const Wt = window.witch, g = Wt.game, wb = () => g.witches[0].body;
  const idle = { moveX: 0, moveZ: 0, toggleMode: false, zoom: 0, autoTalk: false };
  const p0 = pts[0];
  g.witches[0].body = { ...wb(), x: p0[0], z: p0[1], vx: 0, vz: 0, seated: false, perch: undefined, mode, lift: mode === "ground" ? 0 : 1 };
  Wt.manual = true; g.clock.paused = false; // (started, as the start screen's Enter does)
  const ch = new MessageChannel(), yieldTask = () => new Promise(r => { ch.port1.onmessage = () => r(); ch.port2.postMessage(0); });
  const work = [], wall = [], step = [], render = [], stalls = [], parts = {};
  let i = 1, last = performance.now(), stuck = 0, lastD = Infinity;
  for (let f = 0; f < secs * 60 && i < pts.length; f++) {
    const b = wb(), dx = pts[i][0] - b.x, dz = pts[i][1] - b.z, L = Math.hypot(dx, dz);
    if (L < 4) { i++; stuck = 0; lastD = Infinity; continue; }
    // (a fence in the way on foot: she slides along it; stuck a while, on to the next point)
    if (L > lastD - 0.01) { if (++stuck > 120) { i++; stuck = 0; lastD = Infinity; continue; } } else stuck = 0;
    lastD = L;
    const a = performance.now();
    if (f) { const gap = a - last; wall.push(gap); if (gap > 100) stalls.push({ f, ms: Math.round(gap), x: Math.round(b.x), z: Math.round(b.z) }); }
    const r = Wt.frame({ ...idle, moveX: dx / L, moveZ: dz / L }, 1 / 60, false);
    g.zooExit = undefined; g.zooPush = 0; // (pushing on a fence or the edge: never out of the zoo, app/zooExit.ts)
    const e = performance.now();
    work.push(e - a); step.push(r.step); render.push(r.render);
    for (const k in r.ms) parts[k] = Math.max(parts[k] || 0, r.ms[k]);
    last = a;
    await yieldTask();
  }
  Wt.manual = false;
  const q = (xs, p) => { const s = [...xs].sort((u, v) => u - v); return s.length ? +s[Math.min(s.length - 1, Math.floor(p * s.length))].toFixed(1) : 0; };
  const sum = xs => ({ median: q(xs, 0.5), p95: q(xs, 0.95), worst: q(xs, 1) });
  const end = wb();
  return { frames: work.length, at: [Math.round(end.x), Math.round(end.z)], mode: end.mode, reached: i, of: pts.length, work: sum(work), wall: sum(wall), step: sum(step), render: sum(render), stalls: stalls.length, worstStalls: stalls.sort((u, v) => v.ms - u.ms).slice(0, 6), worstParts: Object.fromEntries(Object.entries(parts).map(([k, v]) => [k, +v.toFixed(1)]).sort((u, v) => v[1] - u[1]).slice(0, 6)) };
};

(async () => {
  const server = http.createServer((req, res) => { const p = path.join(root, decodeURIComponent(new URL(req.url, "http://x").pathname)), f = fs.existsSync(p) && fs.statSync(p).isDirectory() ? path.join(p, "index.html") : p; if (!f.startsWith(root) || !fs.existsSync(f)) { res.writeHead(404); res.end(); return; } res.writeHead(200, { "Content-Type": types[path.extname(f)] || "application/octet-stream" }); fs.createReadStream(f).pipe(res); });
  await new Promise(r => server.listen(0, "127.0.0.1", r));
  const base = `http://127.0.0.1:${server.address().port}/`;
  const browser = await playwright.chromium.launch({ args: ["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist", "--enable-precise-memory-info"] });
  const results = {};
  try {
    for (const scen of ONLY) {
      const [how, which] = scen.split("-"), all = which === "all";
      log(scen);
      const context = await browser.newContext({ viewport: { width: W, height: H } });
      const page = await context.newPage(), errors = [];
      page.on("pageerror", e => errors.push(e.message));
      const cdp = await context.newCDPSession(page);
      const heap = async () => { await cdp.send("HeapProfiler.collectGarbage"); const h = await cdp.send("Runtime.getHeapUsage"); return +(h.usedSize / 1048576).toFixed(0); };
      let zoo = page, mountAt = 0, night = null;
      if (how === "direct") {
        await page.goto(`${base}?zoo&creator=0${all ? "&all" : `&found=${FOUND}`}`);
      } else {
        // (the night first, its art all in, as a player opening the book after a while; then the save the zoo reads: every island,
        // the map's see-all "*", or home's ten and FOUND)
        await page.goto(`${base}?creator=0&opening=old`);
        await page.waitForFunction(() => window.witch && window.witch.ready, null, { timeout: WAIT * 1000, polling: 500 });
        await page.waitForFunction(() => { const a = window.witch.view.assets; return !a.queue.length && !a.pending && !a.workers.some(w => w.busy); }, null, { timeout: NIGHT * 1000, polling: 1000 }).catch(() => log(`  (the night's art not all in after ${NIGHT} s: the book opened with it still drawing)`));
        night = { heapMB: await heap(), gpu: await page.evaluate(`(${TEXTURES})(window.witch.view)`) };
        await page.evaluate(found => { const k = "witch.chart", s = JSON.parse(localStorage.getItem(k) || "null") || { world: 0, found: [], won: [], played: [], voyages: [] }; s.found = found; localStorage.setItem(k, JSON.stringify(s)); }, all ? ["*"] : FOUND.split(","));
        // (the night's page while the zoo's over it: its view's render timed)
        await page.evaluate(() => { const v = window.witch.view, r = v.render.bind(v); window.__nightRender = []; v.render = (...a) => { const t = performance.now(); const o = r(...a); window.__nightRender.push(performance.now() - t); return o; }; });
        mountAt = await page.evaluate(() => { const t = performance.timeOrigin + performance.now(); window.witch.zooOverlay.open(); return t; });
        const el = await page.waitForSelector("#zoo-over iframe");
        zoo = await el.contentFrame();
      }
      // (when: its first frame, ready (the start's art round her), every art job done; ms from the load, or from the book's opening)
      const startAt = how === "direct" ? await page.evaluate(() => performance.timeOrigin) : mountAt;
      await zoo.waitForFunction(() => window.witch && window.witch.ready, null, { timeout: WAIT * 1000, polling: 200 });
      const marks = await zoo.evaluate(() => { const o = performance.timeOrigin, m = n => { const e = performance.getEntriesByName(n)[0]; return e ? o + e.startTime : null; }; return { ready: m("witch:ready"), view: m("witch:view") }; });
      await zoo.waitForFunction(() => performance.getEntriesByName("game:frame1").length > 0, null, { timeout: 60000, polling: 100 }).catch(() => {});
      const frame1 = await zoo.evaluate(() => { const e = performance.getEntriesByName("game:frame1")[0]; return e ? performance.timeOrigin + e.startTime : null; });
      const info = await zoo.evaluate(() => { const g = window.witch.game, L = g.map.zoo && g.map.zoo.layout; return { islands: L ? L.islands.length : 0, found: L ? L.islands.filter(I => I.found).length : 0, creatures: g.creatures.length, areas: g.map.areas ? g.map.areas.length : null }; });
      // (the art's progress every 30 s till it's all in or WAIT runs out)
      const progress = [];
      const artAt = await (async () => {
        for (let k = 0; ; k++) {
          const s = await zoo.evaluate(() => { const a = window.witch.view.assets; return { at: performance.timeOrigin + performance.now(), done: a.done, queue: a.queue.length, pending: a.pending, busy: a.workers.filter(w => w.busy).length, workers: a.workers.length }; });
          if (k % 60 === 0) progress.push({ s: Math.round((s.at - startAt) / 1000), done: s.done, queue: s.queue, pending: s.pending, busy: s.busy });
          if (!s.queue && !s.pending && !s.busy) return s.at;
          if (s.at - startAt > WAIT * 1000) return null;
          await new Promise(r => setTimeout(r, 500));
        }
      })();
      const jobs = await zoo.evaluate(() => { const T = window.witch.view.assets.timings, kind = s => s.split(":")[0], by = {}; for (const t of T) { const k = kind(t.set), b = by[k] || (by[k] = { n: 0, cached: 0, ms: 0 }); b.n++; if (t.cached) b.cached++; else b.ms += t.ms; } for (const k in by) by[k].ms = Math.round(by[k].ms); return { done: T.length, cached: T.filter(t => t.cached).length, workerMs: Math.round(T.reduce((a, t) => a + (t.cached ? 0 : t.ms), 0)), byKind: by, slowest: T.filter(t => !t.cached).sort((a, b) => b.ms - a.ms).slice(0, 8).map(t => `${t.set} ${Math.round(t.ms)}`) }; });
      const ms = t => (t ? Math.round(t - startAt) : null);
      const r = { info, firstFrameMs: ms(frame1), readyMs: ms(marks.ready), viewMs: ms(marks.view), allArtMs: ms(artAt), artJobs: jobs, progress };
      log(" ", JSON.stringify(r));
      r.heapMB = await heap();
      r.gpu = await zoo.evaluate(`(${TEXTURES})(window.witch.view)`);
      if (night) { r.night = night; r.night.gpuNow = await page.evaluate(`(${TEXTURES})(window.witch.view)`); }
      log("  heap", r.heapMB, "MB, gpu", JSON.stringify(r.gpu));
      // (the routes: on foot along the streets, out from the plaza to a ring of islands' fences, from one to the next; flying, out to
      // the farthest islands each way and back over the middle)
      const routes = await zoo.evaluate(() => {
        const L = window.witch.game.map.zoo.layout, h = L.home, I = [...L.islands];
        const near = I.sort((a, b) => Math.hypot(a.x - h.x, a.z - h.z) - Math.hypot(b.x - h.x, b.z - h.z)).slice(0, 10).sort((a, b) => Math.atan2(a.z - h.z, a.x - h.x) - Math.atan2(b.z - h.z, b.x - h.x));
        const out = near.map(a => { const dx = h.x - a.x, dz = h.z - a.z, d = Math.hypot(dx, dz); return [a.x + (dx / d) * (a.reach + 12), a.z + (dz / d) * (a.reach + 12)]; });
        const far = [0, 1, 2, 3].map(q => I.reduce((m, a) => { const ang = Math.atan2(a.z - h.z, a.x - h.x), want = (q * Math.PI) / 2 - Math.PI; const da = Math.abs(Math.atan2(Math.sin(ang - want), Math.cos(ang - want))); const s = Math.hypot(a.x - h.x, a.z - h.z) * Math.cos(da); return s > m.s ? { s, a } : m; }, { s: -1, a: I[0] }).a);
        const fly = [[h.x, h.z]]; for (const a of far) fly.push([a.x, a.z], [h.x, h.z]);
        return { walk: [[h.x, h.z], ...out, out[0]], fly };
      });
      r.walk = await zoo.evaluate(`(${ROUTE})(${JSON.stringify([routes.walk, "ground", WALK])})`);
      log("  walk", JSON.stringify(r.walk));
      r.fly = await zoo.evaluate(`(${ROUTE})(${JSON.stringify([routes.fly, "treetop", FLY])})`);
      log("  fly", JSON.stringify(r.fly));
      r.groundReach = await zoo.evaluate(() => { const G = window.witch.view.ground; return { maxReach: Math.round(G.maxReach || 0), window: !!G.win }; }); // (the cameras' reach: the zoo's area window must hold it)
      r.heapAfterMB = await heap();
      r.gpuAfter = await zoo.evaluate(`(${TEXTURES})(window.witch.view)`);
      if (night) {
        const nr = await page.evaluate(() => { const xs = window.__nightRender; return { renders: xs.length, totalMs: Math.round(xs.reduce((a, b) => a + b, 0)), worst: Math.round(Math.max(0, ...xs)) }; });
        r.night.whileOver = { ...nr, seconds: Math.round((Date.now() - mountAt) / 1000) };
      }
      r.errors = errors;
      log("  heap after", r.heapAfterMB, "MB, gpu", JSON.stringify(r.gpuAfter), night ? `night under it: ${JSON.stringify(r.night.whileOver)}` : "");
      // (again on the same browser, everything it kept now kept: the chart's coasts, the art: how a second visit opens)
      if (how === "direct" && process.env.WARM !== "0") {
        const w0 = Date.now();
        await page.reload();
        await page.waitForFunction(() => window.witch && window.witch.ready, null, { timeout: WAIT * 1000, polling: 200 });
        await page.waitForFunction(() => performance.getEntriesByName("game:frame1").length > 0, null, { timeout: 60000, polling: 100 }).catch(() => {});
        const at = await page.evaluate(() => { const o = performance.timeOrigin, m = n => { const e = performance.getEntriesByName(n)[0]; return e ? Math.round(e.startTime) : null; }; return { firstFrameMs: m("game:frame1"), readyMs: m("witch:ready"), viewMs: m("witch:view") }; });
        const art = await page.waitForFunction(() => { const a = window.witch.view.assets; return !a.queue.length && !a.pending && !a.workers.some(w => w.busy) ? Math.round(performance.now()) : 0; }, null, { timeout: Math.min(WAIT, 600) * 1000, polling: 500 }).then(h => h.jsonValue()).catch(() => null);
        const T = await page.evaluate(() => { const T = window.witch.view.assets.timings; return { done: T.length, cached: T.filter(t => t.cached).length, queue: window.witch.view.assets.queue.length }; });
        r.warm = { ...at, allArtMs: art, jobs: T, wallS: Math.round((Date.now() - w0) / 1000) };
        log("  warm", JSON.stringify(r.warm));
      }
      results[scen] = r;
      await context.close();
    }
  } finally { await browser.close(); server.close(); }
  const out = path.resolve(outArg || "previews/zoo/perf.json");
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, JSON.stringify(results, null, 1));
  log("wrote", out);
})().catch(e => { console.error(e); process.exit(1); });
