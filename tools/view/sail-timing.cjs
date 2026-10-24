// The sail's transition timed (Ed, 2026-10-24: "The transition from chart to island has a long pause right now"): the built game
// loaded at home, the sea chart opened over the night as the map table opens it (window.witch.chart), an island chosen and sailed
// to with Enter, as she does; then the page's own marks (?timing=1, app/timing.ts) from the press: the chart's flight done
// (chart:flown), the next night made (witch:game), its start ready (witch:prep-*), the game's camera taking over (sail:dive, else
// the still's fade, witch:landed), landed (game:arrived) and the alarm (opening:alarm); and the page's frames meanwhile (a
// requestAnimationFrame loop's gaps: the longest, and the time lost in gaps over GAP ms, the frozen frames), the longest tasks and
// every mark to the dive in order (steps, in the .json). STRIP=<ms>: a picture
// every that many ms from the press to the alarm too (slows the run: time it without). Writes <out>.json (and <out>-NNN.png).
//   npm run build && node tools/view/sail-timing.cjs [out] [dist]
// ISLAND (fox), THROTTLE (CPU slow-down, 1), SIZE (960x540), GAP (ms, 100), EXTRA (more of the link), RUNS (1).
const http = require("http"), fs = require("fs"), path = require("path");
let pw; try { pw = require("playwright"); } catch { pw = require("/opt/node22/lib/node_modules/playwright"); }
const [outArg = "previews/sail/timing", distArg] = process.argv.slice(2);
const out = path.resolve(outArg), root = path.resolve(distArg || path.join(__dirname, "../../dist"));
const [W, H] = (process.env.SIZE || "960x540").split("x").map(Number), THR = Number(process.env.THROTTLE || 1), GAP = Number(process.env.GAP || 100);
const ISLAND = process.env.ISLAND || "fox", STRIP = Number(process.env.STRIP || 0), RUNS = Number(process.env.RUNS || 1);
const types = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".json": "application/json", ".png": "image/png", ".wasm": "application/wasm", ".woff2": "font/woff2", ".ogg": "audio/ogg" };
const t0 = Date.now(), log = (...a) => console.log(`[${((Date.now() - t0) / 1000).toFixed(0)} s]`, ...a);
const MARKS = ["chart:depart", "chart:ready", "chart:flown", "chart:go", "witch:prep", "witch:game", "witch:prep-start", "witch:prep-warm", "witch:prep-ground", "witch:prep-home", "witch:prep-idle", "witch:prep-compile0", "witch:prep-compiled", "witch:prep-programs", "witch:prep-textures", "witch:prep-draws", "witch:prep-track", "witch:prep-house", "sail:ready", "witch:landed", "dive:eased", "dive:house-ready", "dive:house-due", "dive:on", "game:arrived", "opening:alarm"];

(async () => {
  fs.mkdirSync(path.dirname(out), { recursive: true });
  const server = http.createServer((req, res) => { const p = path.join(root, decodeURIComponent(new URL(req.url, "http://x").pathname)), f = fs.existsSync(p) && fs.statSync(p).isDirectory() ? path.join(p, "index.html") : p; if (!f.startsWith(root) || !fs.existsSync(f)) { res.writeHead(404); res.end(); return; } res.writeHead(200, { "Content-Type": types[path.extname(f)] || "application/octet-stream" }); fs.createReadStream(f).pipe(res); });
  await new Promise(r => server.listen(0, "127.0.0.1", r));
  const browser = await pw.chromium.launch({ args: ["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist"] });
  const errors = [], runs = [];
  let code = 0;
  try {
    for (let run = 0; run < RUNS; run++) {
      const page = await browser.newPage({ viewport: { width: W, height: H } });
      page.on("pageerror", e => errors.push(e.message));
      page.on("console", m => { const t = m.text(); if (t.startsWith("sail-timing:") || t.startsWith("arrival:")) log(t); });
      await page.addInitScript(() => {
        try { localStorage.setItem("witch.chart.sailAnywhere", "1"); } catch { /* */ }
        window.__f = []; const f = t => { window.__f.push(t); requestAnimationFrame(f); }; requestAnimationFrame(f);
        window.__lt = []; try { new PerformanceObserver(l => { for (const e of l.getEntries()) window.__lt.push([e.startTime, e.duration]); }).observe({ type: "longtask", buffered: true }); } catch { /* */ }
      });
      if (THR > 1) { const cdp = await page.context().newCDPSession(page); await cdp.send("Emulation.setCPUThrottlingRate", { rate: THR }); }
      const link = `http://127.0.0.1:${server.address().port}/?creator=0&timing=1${process.env.EXTRA ? "&" + process.env.EXTRA : ""}`;
      log(`run ${run + 1}: loading`, link.replace(/^http:\/\/[^/]+/, ""), THR > 1 ? `(CPU ×${THR})` : "");
      await page.goto(link);
      await page.waitForFunction(() => window.witch && window.witch.ready, null, { timeout: 1800000, polling: 500 });
      await page.waitForTimeout(3000);
      log("ready; opening the chart");
      await page.evaluate(() => window.witch.chart());
      await page.waitForFunction(i => { const c = window.chart; return c && c.islands && c.islands().find(x => x.id === i && x.outline); }, ISLAND, { timeout: 600000, polling: 250 });
      await page.waitForTimeout(1500);
      await page.evaluate(i => window.chart.choose(i), ISLAND);
      await page.waitForTimeout(1500);
      log("sailing to", ISLAND);
      const sail = await page.evaluate(() => performance.now());
      await page.keyboard.press("Enter");
      const shots = [];
      const until = Date.now() + 1800000;
      for (let i = 0; Date.now() < until; i++) {
        const done = await page.evaluate(() => performance.getEntriesByName("opening:alarm").length > 0 || performance.getEntriesByName("game:arrived").length > 0).catch(() => false);
        if (STRIP > 0) {
          const at = await page.evaluate(() => performance.now()).catch(() => 0), file = `${path.basename(out)}-${String(i).padStart(3, "0")}.png`;
          await page.screenshot({ path: path.join(path.dirname(out), file) }).catch(() => {});
          shots.push({ file, t: Math.round(at - sail) });
          if (done && shots.length > 1 && at - sail > shots.at(-2).t + 3000) break;
          await page.waitForTimeout(STRIP);
        } else { if (done) break; await page.waitForTimeout(500); }
      }
      await page.waitForTimeout(2000);
      const r = await page.evaluate(([names, gap, s0]) => {
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
        return { sailMark: Math.round(sailAt - s0), marks: m, toDive: sum(s0, dive), diveToEnd: sum(dive, end), tasks, steps };
      }, [MARKS, GAP * THR, sail]);
      r.shots = shots;
      runs.push(r);
      log(JSON.stringify({ marks: r.marks, toDive: r.toDive, diveToEnd: r.diveToEnd, tasks: r.tasks }));
      await page.close();
    }
    fs.writeFileSync(out + ".json", JSON.stringify({ island: ISLAND, throttle: THR, size: `${W}x${H}`, gap: GAP, runs }, null, 1));
    log("written", out + ".json");
  } catch (e) { console.error(e); code = 1; } finally { await browser.close(); server.close(); }
  if (errors.length) { console.error("page errors:\n" + errors.join("\n")); code = 1; }
  process.exit(code);
})();
