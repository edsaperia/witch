// The sail's transition timed (Ed, 2026-10-24: "The transition from chart to island has a long pause right now"): the built game
// loaded at home, the sea chart opened over the night as the map table opens it (window.witch.chart), an island chosen and sailed
// to with Enter, as she does; then the page's own marks (?timing=1, app/timing.ts) from the press: the chart's flight done
// (chart:flown), the next night made (witch:game), its start ready (witch:prep-*), the game's camera taking over (sail:dive, else
// the still's fade, witch:landed), landed (game:arrived) and the alarm (opening:alarm); and the page's frames meanwhile (a
// requestAnimationFrame loop's gaps: the longest, and the time lost in gaps over GAP ms, the frozen frames), the longest tasks and
// every mark to the dive in order (steps, in the .json). STRIP=<ms>: a picture
// every that many ms from the press to the alarm too (slows the run: time it without). Writes <out>.json (and <out>-NNN.png).
//   npm run build && node tools/view/sail-timing.cjs [out] [dist]
// ISLAND (fox), THEN (islands to sail on to after it, on the same page: a warm sail, "fox,owl"), THROTTLE (CPU slow-down, 1), SIZE (960x540), GAP (ms, 100), EXTRA (more of the link), RUNS (1), AFTER (ms after landing whose frames are counted as `settle`: the island's art coming in, 15000).
// EXPECT_SHA verifies version.json before measuring; PROFILE=1 writes a CPU profile per leg. CHROMIUM selects an installed
// browser, GPU=hardware requests its default renderer (check the result's renderer: it may still fall back to software).
// SAIL_SEED fixes the selected island's night seed; TIMEOUT bounds each arrival (300000 ms). Each completed leg is saved
// immediately with its own comparability key, chart wait, build stamp and resource counts (heap is not collected).
const http = require("http"), fs = require("fs"), path = require("path");
const { pageKey } = require("../bench/comparable.cjs"); // (the result's comparability key: tools/bench/comparable.cjs)
let KEY = null;
let pw; try { pw = require("playwright"); } catch { pw = require("/opt/node22/lib/node_modules/playwright"); }
const [outArg = "previews/sail/timing", distArg] = process.argv.slice(2);
const out = path.resolve(outArg), root = path.resolve(distArg || path.join(__dirname, "../../dist"));
const [W, H] = (process.env.SIZE || "960x540").split("x").map(Number), THR = Number(process.env.THROTTLE || 1), GAP = Number(process.env.GAP || 100);
const AFTER = Number(process.env.AFTER || 15000), ISLAND0 = process.env.ISLAND || "fox", THEN = process.env.THEN ? process.env.THEN.split(",") : [], STRIP = Number(process.env.STRIP || 0), RUNS = Number(process.env.RUNS || 1);
const types = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".json": "application/json", ".png": "image/png", ".wasm": "application/wasm", ".woff2": "font/woff2", ".ogg": "audio/ogg" };
const t0 = Date.now(), log = (...a) => console.log(`[${((Date.now() - t0) / 1000).toFixed(0)} s]`, ...a);
const MARKS = ["chart:depart", "chart:ready", "chart:flown", "chart:go", "witch:prep", "witch:game", "witch:prep-start", "witch:prep-warm", "witch:prep-ground", "witch:prep-home", "witch:prep-idle", "witch:prep-compile0", "witch:prep-compiled", "witch:prep-programs", "witch:prep-textures", "witch:prep-draws", "witch:prep-track", "witch:prep-house", "sail:ready", "witch:landed", "dive:eased", "dive:house-ready", "dive:house-due", "dive:on", "game:arrived", "opening:alarm"];

(async () => {
  fs.mkdirSync(path.dirname(out), { recursive: true });
  const server = http.createServer((req, res) => { const p = path.join(root, decodeURIComponent(new URL(req.url, "http://x").pathname)), f = fs.existsSync(p) && fs.statSync(p).isDirectory() ? path.join(p, "index.html") : p; if (!f.startsWith(root) || !fs.existsSync(f)) { res.writeHead(404); res.end(); return; } res.writeHead(200, { "Content-Type": types[path.extname(f)] || "application/octet-stream" }); fs.createReadStream(f).pipe(res); });
  await new Promise(r => server.listen(0, "127.0.0.1", r));
  const browser = await pw.chromium.launch({ executablePath: process.env.CHROMIUM, args: process.env.GPU === 'hardware' ? [] : ["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist"] });
  const errors = [], runs = [];
  let code = 0;
  try {
    for (let run = 0; run < RUNS; run++) {
      const page = await browser.newPage({ viewport: { width: W, height: H } });
      page.on("pageerror", e => errors.push(e.message));
      page.on("console", m => { const t = m.text(); if (t.startsWith("sail-timing:") || t.startsWith("arrival:")) log(t); });
      await page.addInitScript(() => {
        try { localStorage.setItem("witch.chart.sailAnywhere", "1"); } catch { /* */ }
        window.__f = []; window.__parts = []; const f = t => { window.__f.push(t); const ms = window.witch?.view?.ms; if (ms) { const e = Object.entries(ms).filter(([, v]) => v > 2); if (e.reduce((p, [, v]) => p + v, 0) > 20) window.__parts.push({ t, parts: e }); } requestAnimationFrame(f); }; requestAnimationFrame(f); // (the view's own work by part, on frames it passed 20 ms)
        window.__lt = []; try { new PerformanceObserver(l => { for (const e of l.getEntries()) window.__lt.push([e.startTime, e.duration]); }).observe({ type: "longtask", buffered: true }); } catch { /* */ }
      });
      if (THR > 1) { const cdp = await page.context().newCDPSession(page); await cdp.send("Emulation.setCPUThrottlingRate", { rate: THR }); }
      const link = `http://127.0.0.1:${server.address().port}/?creator=0&timing=1${process.env.EXTRA ? "&" + process.env.EXTRA : ""}`;
      log(`run ${run + 1}: loading`, link.replace(/^http:\/\/[^/]+/, ""), THR > 1 ? `(CPU ×${THR})` : "");
      await page.goto(link);
      const version = await page.evaluate(async () => (await fetch('./version.json', { cache: 'no-store' })).json());
      if (process.env.EXPECT_SHA && !version.version.includes(process.env.EXPECT_SHA.slice(0, 7))) throw new Error(`served build ${version.version} does not match ${process.env.EXPECT_SHA}`);
      log('served build', version.version);
      await page.waitForFunction(() => window.witch && window.witch.ready, null, { timeout: 1800000, polling: 500 });
      KEY ??= await pageKey(page, { spot: `sail-timing.cjs: home to ${ISLAND0}` });
      await page.waitForTimeout(3000);
      for (const [leg, ISLAND] of [ISLAND0, ...THEN].entries()) { // (THEN: on the same page after, warm: its art, programs and workers the last island's)
      if (leg) await page.waitForTimeout(5000);
      log("ready; opening the chart");
      const chartOpened = await page.evaluate(() => performance.now());
      const cdp = await page.context().newCDPSession(page);
      if (process.env.PROFILE === '1') { await cdp.send('Profiler.enable'); await cdp.send('Profiler.start'); }
      await page.evaluate(() => window.witch.chart());
      await page.waitForFunction(i => { const c = window.chart; return c && c.islands && c.islands().find(x => x.id === i && x.outline); }, ISLAND, { timeout: 600000, polling: 250 });
      await page.waitForTimeout(1500);
      await page.evaluate(async ([i, seed]) => { const random = Math.random; if (seed != null) Math.random = () => Number(seed) / 1000000; try { window.chart.choose(i); await new Promise(r => setTimeout(r, 1500)); } finally { Math.random = random; } }, [ISLAND, process.env.SAIL_SEED ?? null]);
      log("sailing to", ISLAND);
      const progs = () => page.evaluate(() => (window.witch.view.renderer.info.programs ?? []).map(p => `${p.name}|${p.cacheKey.length}|${p.cacheKey.slice(-40)}`)).catch(() => []);
      const before = await progs();
      const sail = await page.evaluate(() => performance.now());
      await page.keyboard.press("Enter");
      const shots = [];
      const until = Date.now() + Number(process.env.TIMEOUT || 300000);
      let landed = false, doneAt = null;
      for (let i = 0; Date.now() < until; i++) {
        const done = await page.evaluate(s0 => ["opening:alarm", "game:arrived"].some(n => performance.getEntriesByName(n).some(e => e.startTime >= s0)), sail).catch(() => false);
        if (STRIP > 0) {
          const at = await page.evaluate(() => performance.now()).catch(() => 0), file = `${path.basename(out)}-${String(i).padStart(3, "0")}.png`;
          await page.screenshot({ path: path.join(path.dirname(out), file) }).catch(() => {});
          shots.push({ file, t: Math.round(at - sail) });
          if (done && doneAt === null) doneAt = at;
          if (doneAt !== null && at - doneAt >= 3000) { landed = true; break; }
          await page.waitForTimeout(STRIP);
        } else { if (done) { landed = true; break; } if (i && i % 60 === 0) log('still travelling', await page.evaluate(() => ({ marks: performance.getEntriesByType('mark').slice(-6).map(e => e.name), house: window.witch.view.homeDone, ready: window.witch.ready }))); await page.waitForTimeout(500); }
      }
      if (!landed) throw new Error(`arrival timed out after ${process.env.TIMEOUT || 300000} ms on ${ISLAND}`);
      await page.waitForTimeout(AFTER);
      if (process.env.PROFILE === '1') { const { profile } = await cdp.send('Profiler.stop'); fs.writeFileSync(`${out}-${run}-${leg}.cpuprofile`, JSON.stringify(profile)); }
      const r = await page.evaluate(([names, gap, s0, after]) => {
        const at = n => { const e = performance.getEntriesByName(n).filter(x => x.startTime >= s0); return e.length ? Math.round(e[0].startTime - s0) : null; };
        const m = Object.fromEntries(names.map(n => [n, at(n)]));
        const sailAt = performance.getEntriesByName("chart:sail").filter(x => x.startTime >= s0)[0]?.startTime ?? s0;
        const dive = (m["witch:landed"] ?? Infinity) + s0, end = (m["opening:alarm"] ?? m["game:arrived"] ?? Infinity) + s0;
        const gaps = (a, z) => { const g = []; for (let i = 1; i < window.__f.length; i++) { const t = window.__f[i]; if (t > a && window.__f[i - 1] < z) g.push(t - window.__f[i - 1]); } return g; };
        const sum = (a, z) => { const g = gaps(a, z); return { frames: g.length, longest: Math.round(Math.max(0, ...g)), frozen: Math.round(g.filter(x => x > gap).reduce((p, x) => p + x, 0)), over: g.filter(x => x > gap).length }; };
        // (the longest main-thread tasks from the press to the dive, each with the last mark before it)
        const all = performance.getEntriesByType("mark").filter(e => e.startTime >= s0).sort((a, b) => a.startTime - b.startTime);
        const tasks = window.__lt.filter(([t]) => t >= s0 && t < dive).sort((a, b) => b[1] - a[1]).slice(0, 8).map(([t, d]) => ({ at: Math.round(t - s0), ms: Math.round(d), after: all.filter(e => e.startTime <= t).at(-1)?.name ?? "" }));
        const steps = all.filter(e => e.startTime < dive).map(e => [e.name, Math.round(e.startTime - s0)]); // (every mark to the dive, in order)
        const slices = (window.witch.slices ?? []).map(x => ({ what: x.what, ms: Math.round(x.ms), slices: x.slices, longest: Math.round(x.longest), at: x.longestAt })); // (the sliced builds' own time: render/slices.ts)
        const parts = {}; for (const f of window.__parts ?? []) if (f.t >= end && f.t < end + after) for (const [k, ms] of f.parts) parts[k] = Math.round((parts[k] ?? 0) + ms);
        return { slices, settleParts: parts, sailMark: Math.round(sailAt - s0), marks: m, toDive: sum(s0, dive), diveToEnd: sum(dive, end), settle: sum(end, end + after), tasks, steps };
      }, [MARKS, GAP * THR, sail, AFTER]);
      const after = await progs(); r.programs = { before: before.length, after: after.length, made: after.filter(x => !before.includes(x)) }; // (the shader programs this sail made anew)
      r.key = await pageKey(page, { spot: `sail-timing.cjs: arrival ${ISLAND}` });
      r.chartWaitMs = Math.round(sail - chartOpened);
      r.resources = await page.evaluate(() => { const v = window.witch.view; return { heap: performance.memory?.usedJSHeapSize, dom: document.getElementsByTagName('*').length, textures: v.renderer.info.memory.textures, geometries: v.renderer.info.memory.geometries }; });
      r.resources.workers = page.workers().length;
      r.version = version;
      r.shots = shots; r.island = ISLAND; r.leg = leg ? "warm" : "cold";
      runs.push(r);
      fs.writeFileSync(out + ".json", JSON.stringify({ key: KEY, island: ISLAND0, then: THEN, throttle: THR, size: `${W}x${H}`, gap: GAP, runs }, null, 1));
      log(JSON.stringify({ island: ISLAND, leg: r.leg, marks: r.marks, toDive: r.toDive, diveToEnd: r.diveToEnd, settle: r.settle, settleParts: r.settleParts, programs: { ...r.programs, made: r.programs.made.length }, slices: r.slices, tasks: r.tasks }));
      }
      await page.close();
    }
    fs.writeFileSync(out + ".json", JSON.stringify({ key: KEY, island: ISLAND0, then: THEN, throttle: THR, size: `${W}x${H}`, gap: GAP, runs }, null, 1));
    log("written", out + ".json");
  } catch (e) { console.error(e); code = 1; } finally { await browser.close(); server.close(); }
  if (errors.length) { console.error("page errors:\n" + errors.join("\n")); code = 1; }
  process.exit(code);
})();
