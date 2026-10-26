// The View's island build in slices (render/slices.ts; Ed's laptop, 2026-10-20: one 10 s main-thread task arriving at home after a
// sail, the bedroom's alarm, its music and every animation stopped): the built game loaded headless, the sliced builds' own longest
// step (window.witch.slices, render/slices.ts sliceLog) with the page's long tasks meanwhile (witch:game to witch:view), and its
// start's (prepare, to witch:prep-compiled). Fails if any one step of the View's build passes LIMIT ms (100 by default, at 1x in
// the cloud's software renderer); with SWAP=<seed>[,island] (and ?debug=sail in the query), then a new night in place too
// (View.setGame, as a sail in place makes it), failing the same way. PREP=1 fails on the start's long tasks too (its renders:
// frames, a GPU's in milliseconds, the software renderer's in hundreds). It fails too on a task over FIRST ms (1000) on play's first
// frame (game:frame1), the start's and the new night's (Ed's laptop, 2026-10-21: 5 s and 2 s; the cloud's 7 s: the GL's first draw
// of each program and target, warmed in View.compileAll now), and says how many programs the new night compiled.
//   node tools/view/build-budget.cjs [dist] [query] [throttle]   (THROTTLE=, LIMIT=, FIRST=, SWAP=, PREP=1, OUT=<json>)
// The default query is Ed's case: world 1268398697, home, seed 821186, straight to the decks.
const http = require("http"), fs = require("fs"), path = require("path");
const { pageKey } = require("../lib/comparable.cjs"); // (the result's comparability key: tools/lib/comparable.cjs)
let pw; try { pw = require("playwright"); } catch { pw = require("/opt/node22/lib/node_modules/playwright"); }
const [dir = "dist", query = "world=1268398697&island=home&seed=821186&creator=0", thr = process.env.THROTTLE ?? "1"] = process.argv.slice(2);
const LIMIT = Number(process.env.LIMIT ?? 100) * Number(thr), FIRST = Number(process.env.FIRST ?? 1000) * Number(thr), root = path.resolve(dir);
const types = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".json": "application/json", ".png": "image/png", ".wasm": "application/wasm", ".ogg": "audio/ogg", ".woff2": "font/woff2" };
const srv = http.createServer((q, r) => { let f = path.join(root, decodeURIComponent(new URL(q.url, "http://x").pathname)); if (fs.existsSync(f) && fs.statSync(f).isDirectory()) f = path.join(f, "index.html"); if (!f.startsWith(root) || !fs.existsSync(f)) { r.writeHead(404); return r.end(); } r.writeHead(200, { "content-type": types[path.extname(f)] || "application/octet-stream" }); fs.createReadStream(f).pipe(r); });
srv.listen(0, "127.0.0.1", async () => {
  const b = await pw.chromium.launch({ executablePath: process.env.CHROMIUM ?? (fs.existsSync("/opt/pw-browsers/chromium") ? "/opt/pw-browsers/chromium" : undefined), args: ["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist"] });
  const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
  await p.addInitScript(() => { window.__lt = []; try { new PerformanceObserver(l => { for (const e of l.getEntries()) window.__lt.push([e.startTime, e.duration]); }).observe({ type: "longtask", buffered: true }); } catch {} window.__frames = 0; window.__gaps = []; let last = 0; const f = t => { window.__frames++; if (last) window.__gaps.push([last, t - last]); last = t; requestAnimationFrame(f); }; requestAnimationFrame(f); });
  const errors = []; p.on("pageerror", e => errors.push(e.message));
  if (Number(thr) > 1) { const cdp = await p.context().newCDPSession(p); await cdp.send("Emulation.setCPUThrottlingRate", { rate: Number(thr) }); }
  await p.goto(`http://127.0.0.1:${srv.address().port}/?${query}`);
  await p.waitForFunction(() => performance.getEntriesByName("witch:prep-compiled").length > 0, null, { timeout: 1800000, polling: 250 });
  const r = await p.evaluate(() => {
    const m = n => performance.getEntriesByName(n)[0]?.startTime ?? NaN, g = m("witch:game"), v = m("witch:view"), pg = m("witch:prep-compiled");
    // (the tasks that start in it: the one the night's map was made in, before witch:game, isn't the View's)
    const inside = (a, z) => window.__lt.filter(([s]) => s >= a && s < z).map(([s, d]) => Math.round(d));
    // (the View's own: wholly inside its build; the one it ends in runs on into the page's own start, main.ts after witch:view)
    const within = (a, z) => window.__lt.filter(([s, d]) => s >= a && s + d <= z).map(([s, d]) => Math.round(d));
    const stages = performance.getEntriesByType("mark").filter(e => e.name.startsWith("witch:build-")).map(e => [e.name.slice(12), Math.round(e.startTime - g)]);
    // (the page's frames meanwhile: the gaps between them, the longest and how many passed 100 ms, in the build and in its start)
    const gaps = (a, z) => { const in_ = window.__gaps.filter(([t]) => t >= a && t < z).map(([, d]) => d); return { frames: in_.length, longest: Math.round(Math.max(0, ...in_)), over100: in_.filter(d => d > 100).length }; };
    return { buildFrames: gaps(g, v), prepFrames: gaps(v, pg), view: Math.round(v - g), toGround: Math.round(pg - v), viewTasks: within(g, v), straddle: window.__lt.filter(([s, d]) => s < v && s + d > v).map(([s, d]) => [Math.round(v - s), Math.round(s + d - v)]), prepTasks: inside(v, pg), frames: window.__frames, framesBuild: null, stages, slices: window.witch?.slices ?? null };
  });
  // The first frame after the start (game:frame1, play's own first render): its long tasks, the start's compile and uploads.
  await p.waitForFunction(() => performance.getEntriesByName("game:frame1").length > 0, null, { timeout: 1800000, polling: 250 }).catch(() => {});
  await p.waitForTimeout(2000);
  r.firstFrame = await p.evaluate(() => { const m = n => performance.getEntriesByName(n)[0]?.startTime ?? NaN, a = m("witch:prep-compile0"), f = m("game:frame1"); return { compile: Math.round(m("witch:prep-compiled") - a), tasks: window.__lt.filter(([s]) => s >= f - 50 && s < f + 2000).map(([, d]) => Math.round(d)), compileTasks: window.__lt.filter(([s]) => s >= a && s < f - 50).map(([, d]) => Math.round(d)) }; });
  // SWAP=<seed>[,island]: then a new night in place (?debug=sail's swap: the sail's path, View.setGame), its own long tasks.
  if (process.env.SWAP) {
    const [seed, island] = process.env.SWAP.split(",");
    await p.waitForFunction(() => performance.getEntriesByName("witch:ready").length > 0, null, { timeout: 1800000, polling: 500 });
    r.swap = await p.evaluate(async ([seed, island]) => {
      const keys = () => (window.witch.view?.renderer?.info?.programs ?? []).map(x => x.cacheKey), had = new Set(keys()); // (the programs it compiles: only what the new island alone uses)
      window.__lt.length = 0; const t0 = performance.now(); performance.mark("swap:start");
      await window.witch.debugSwap(Number(seed), island || undefined);
      await new Promise(r => setTimeout(r, 2500)); // (its first frame: start() draws it)
      const fm = performance.getEntriesByName("game:frame1").at(-1)?.startTime ?? NaN, c0 = performance.getEntriesByName("witch:prep-compile0").at(-1)?.startTime ?? NaN, c1 = performance.getEntriesByName("witch:prep-compiled").at(-1)?.startTime ?? NaN;
      const first = { programs: keys().filter(k => !had.has(k)).length, compile: Math.round(c1 - c0), tasks: window.__lt.filter(([s]) => s >= fm - 50 && s < fm + 2000).map(([, d]) => Math.round(d)) };
      const t1 = performance.now(), built = performance.getEntriesByName("witch:build-swap").at(-1)?.startTime ?? t1;
      const tasks = window.__lt.filter(([s]) => s >= t0), set = tasks.filter(([s, d]) => s + d <= built).map(([, d]) => Math.round(d)), prep = tasks.filter(([s]) => s >= built).map(([, d]) => Math.round(d));
      return { first, setGame: Math.round(built - t0), total: Math.round(t1 - t0), setTasks: set, prepTasks: prep, slices: (window.witch.slices ?? []).filter(x => x.what === "setGame").at(-1) ?? null };
    }, [seed, island ?? ""]);
  }
  const KEY = await pageKey(p, { spot: "build-budget.cjs: the island's build" });
  await b.close(); srv.close();
  const own = (r.slices ?? []).find(x => x.what === "view"), longest = own ? Math.round(own.longest) : Math.max(0, ...r.viewTasks); // (the build's own longest step: the page's other tasks meanwhile, a worker's reply and the like, are reported, not the build's)
  console.log(`throttle ${thr}x: the View built in ${r.view} ms; its longest step ${longest} ms (limit ${LIMIT}); the page's long tasks meanwhile (${r.viewTasks.length}): ${r.viewTasks.join(" ")}; the one it ends in (ms before witch:view, after): ${JSON.stringify(r.straddle)}`);
  const prepLongest = Math.max(0, ...r.prepTasks);
  console.log(`  the page's frames: in the build ${JSON.stringify(r.buildFrames)}; in its start ${JSON.stringify(r.prepFrames)} (frames, the longest gap ms, gaps over 100 ms)`);
  console.log(`  then its start (prepare, to its shaders compiled): ${r.toGround} ms, its longest task ${prepLongest} ms; long tasks ${r.prepTasks.join(" ")}`);
  console.log(`  stages (ms from witch:game): ${r.stages.map(([n, t]) => `${n} ${t}`).join(", ")}`);
  if (r.slices) console.log(`  sliced builds: ${JSON.stringify(r.slices)}`);
  if (r.firstFrame) console.log(`  its compile (prep-compile0 to prep-compiled) ${r.firstFrame.compile} ms, long tasks from there to the first frame ${r.firstFrame.compileTasks.join(" ")}; the first frame's long tasks ${r.firstFrame.tasks.join(" ")}`);
  if (r.firstFrame && Math.max(0, ...r.firstFrame.tasks) > FIRST) { console.log(`FAIL: the first frame had a ${Math.max(...r.firstFrame.tasks)} ms task (over ${FIRST})`); process.exitCode = 1; }
  if (r.swap) {
    const sw = r.swap, own = sw.slices ? Math.round(sw.slices.longest) : Math.max(0, ...sw.setTasks);
    console.log(`  a new night in place (setGame): built in ${sw.setGame} ms, its longest step ${own} ms; the page's long tasks meanwhile ${sw.setTasks.join(" ")}; then its start (to ready) ${sw.total - sw.setGame} ms, long tasks ${sw.prepTasks.join(" ")}`);
    if (sw.slices) console.log(`    sliced: ${JSON.stringify(sw.slices)}`);
    if (sw.first) console.log(`    its new programs ${sw.first.programs}, its compile ${sw.first.compile} ms; its first frame's long tasks ${sw.first.tasks.join(" ")}`);
    if (sw.first && Math.max(0, ...sw.first.tasks) > FIRST) { console.log(`FAIL: its first frame had a ${Math.max(...sw.first.tasks)} ms task (over ${FIRST})`); process.exitCode = 1; }
    if (own > LIMIT) { console.log(`FAIL: a step of setGame's build took ${own} ms (over ${LIMIT})`); process.exitCode = 1; }
  }
  if (process.env.OUT) fs.writeFileSync(process.env.OUT, JSON.stringify({ key: KEY, throttle: Number(thr), query, ...r, longest }, null, 1));
  if (errors.length) { console.log("page errors:", errors.slice(0, 3)); process.exit(1); }
  if (longest > LIMIT) { console.log(`FAIL: a step of the View's build took ${longest} ms (over ${LIMIT})`); process.exit(1); }
  // (the start's own frames, its renders, are frames: a GPU's in milliseconds, the cloud's software renderer's in hundreds; PREP=1 to fail on them too)
  if (process.env.PREP === "1" && prepLongest > LIMIT) { console.log(`FAIL: a task in the View's start (prepare) took ${prepLongest} ms (over ${LIMIT})`); process.exit(1); }
});
