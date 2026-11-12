// Repro of Ed's 2026-11-12 18:30 freeze: home seed 81808, sail from the map table's chart to raven seed 864794 (the dive path),
// land, wake, take off from the treehouse; measure the take-off. node repro.cjs <dist> <out.json>  PROFILE=1 CONTROL=1 (no sail)
const http = require("http"), fs = require("fs"), path = require("path");
const playwright = require("playwright");
const [distArg, outArg = "repro.json"] = process.argv.slice(2);
const root = path.resolve(distArg);
const PROFILE = process.env.PROFILE === "1", CONTROL = process.env.CONTROL === "1";
const types = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".json": "application/json", ".png": "image/png", ".wasm": "application/wasm", ".woff2": "font/woff2", ".ttf": "font/ttf", ".ogg": "audio/ogg" };
const t0 = Date.now(), log = (...a) => console.log(`[${((Date.now() - t0) / 1000).toFixed(1)} s]`, ...a);
(async () => {
  const server = http.createServer((req, res) => { const p = path.join(root, decodeURIComponent(new URL(req.url, "http://x").pathname)), f = fs.existsSync(p) && fs.statSync(p).isDirectory() ? path.join(p, "index.html") : p; if (!f.startsWith(root) || !fs.existsSync(f)) { res.writeHead(404); res.end(); return; } res.writeHead(200, { "Content-Type": types[path.extname(f)] || "application/octet-stream" }); fs.createReadStream(f).pipe(res); });
  await new Promise(r => server.listen(0, "127.0.0.1", r));
  const base = `http://127.0.0.1:${server.address().port}`;
  const browser = await playwright.chromium.launch({ args: ["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist"] });
  const result = { errors: [] };
  try {
    const page = await browser.newPage({ viewport: { width: 960, height: 540 } });
    page.on("pageerror", e => result.errors.push(e.message));
    page.on("console", m => { if (m.type() === "error") result.errors.push(m.text().slice(0, 300)); });
    await page.addInitScript(() => {
      try { localStorage.setItem("witch.chart.sailAnywhere", "1"); } catch { /* */ }
      const w = window; w.__beat = { last: performance.now(), log: [] };
      const tick = () => { const n = performance.now(), b = w.__beat; if (n - b.last > 400) b.log.push([Math.round(b.last), Math.round(n - b.last)]); b.last = n; setTimeout(tick, 50); }; setTimeout(tick, 50);
      w.__long = []; try { new PerformanceObserver(l => { for (const e of l.getEntries()) w.__long.push([Math.round(e.startTime), Math.round(e.duration)]); }).observe({ type: "longtask", buffered: true }); } catch { /* */ }
    });
    await page.goto(`${base}/?seed=81808&creator=0&debug&set=treeNormals=%2232%22`);
    for (let i = 0; ; i++) { const s = await page.evaluate(() => ({ witch: !!window.witch, ready: !!window.witch?.ready, start: document.getElementById("start")?.style.display, loading: document.getElementById("start")?.className })); if (s.ready) break; if (i % 6 === 0) log("waiting", JSON.stringify(s)); await page.waitForTimeout(10000); }
    log("home ready (paused " + await page.evaluate(() => window.witch.game.clock.paused) + ")");
    for (let i = 0; i < 60 && await page.evaluate(() => window.witch.game.clock.paused); i++) { await page.keyboard.press("Enter"); await page.waitForTimeout(2000); }
    log("home running", await page.evaluate(() => !window.witch.game.clock.paused));
    await page.waitForTimeout(3000);
    const st = () => page.evaluate(() => { const g = window.witch.game, w = g.witch; return { seed: g.seed, t: +g.clock.time.toFixed(2), x: +w.x.toFixed(1), z: +w.z.toFixed(1), mode: w.mode, perch: !!w.perch, paused: g.clock.paused, wake: g.wake ? { open: !!g.wake.open } : null, arriving: document.body.classList.contains("arriving") }; });
    if (!CONTROL) {
      await page.evaluate(() => window.witch.chart("mapTable"));
      await page.waitForFunction(() => window.chart?.islands?.().some(x => x.id === "raven"), null, { timeout: 600000, polling: 250 });
      await page.evaluate(() => { const b = document.querySelector("#chart-overlay button.sail-any"); if (b && b.getAttribute("aria-pressed") !== "true") b.click(); });
      await page.evaluate(async () => { const r = Math.random; Math.random = () => 0.8647945; try { window.chart.choose("raven"); } finally { Math.random = r; } await new Promise(r => setTimeout(r, 1500)); });
      await page.waitForFunction(() => window.chart?.islands?.().find(x => x.id === "raven" && x.outline && x.sail), null, { timeout: 600000, polling: 250 });
      await page.evaluate(() => document.activeElement?.blur?.());
      await page.evaluate(() => new Promise(done => { let last = performance.now(), run = 0; const until = last + 120000; const f = now => { run = now - last < 400 ? run + 1 : 0; last = now; if (run >= 10 || now > until) done(); else requestAnimationFrame(f); }; requestAnimationFrame(f); }));
      log("holding Enter on raven");
      const ts = Date.now(); let sailed = null;
      await page.keyboard.down("Enter");
      while (Date.now() - ts < 180000 && (sailed === null || Date.now() - sailed < 1000)) { await page.keyboard.down("Enter"); if (await page.evaluate(() => !!window.chart?.chart?.flight).catch(() => false)) sailed ??= Date.now(); await page.waitForTimeout(33); }
      await page.keyboard.up("Enter");
      log(sailed ? "sailed" : "never sailed");
      await page.waitForFunction(() => window.witch?.game?.seed === 864794 && !document.getElementById("chart-overlay"), null, { timeout: 1800000, polling: 1000 });
      log("night is raven 864794, chart gone", JSON.stringify(await st()));
      await page.waitForFunction(() => performance.getEntriesByName("game:arrived").length > 0, null, { timeout: 1800000, polling: 1000 });
      log("arrived", JSON.stringify(await st()));
      result.marks = await page.evaluate(() => performance.getEntriesByType("mark").filter(m => /^(chart|witch|game|sail|dive|landing):/.test(m.name)).map(m => [m.name, Math.round(m.startTime)]));
      await page.keyboard.down("KeyD");
      await page.waitForFunction(() => !window.witch.game.wake || !!window.witch.game.wake.open, null, { timeout: 600000, polling: 200 }).catch(() => {});
      await page.keyboard.up("KeyD");
      log("woke", JSON.stringify(await st()));
    }
    // settle: let the page run some frames, as Ed's 8 s of play
    await page.evaluate(() => new Promise(r => { let n = 0; const f = () => (++n >= 30 ? r() : requestAnimationFrame(f)); requestAnimationFrame(f); }));
    result.before = await st();
    log("before take-off", JSON.stringify(result.before));
    if (!result.before.perch) log("not perched?");
    // move her onto the Terrace's deck spot if she can't rise where she is: try Space first
    const cdp = await page.context().newCDPSession(page);
    if (PROFILE) { await cdp.send("Profiler.enable"); await cdp.send("Profiler.setSamplingInterval", { interval: 500 }); await cdp.send("Profiler.start"); }
    const mark = await page.evaluate(() => { window.__beat.log.length = 0; window.__long.length = 0; window.__frameWork = []; let last = performance.now(); const f = n => { window.__frameWork.push([Math.round(last), Math.round(n - last), window.witch.game.witch.mode]); last = n; if (window.__frameWork.length < 400) requestAnimationFrame(f); }; requestAnimationFrame(f); return performance.now(); });
    await page.keyboard.press("Space");
    const tp = Date.now();
    await page.waitForFunction(() => window.witch.game.witch.mode === "treetop", null, { timeout: 600000, polling: 100 }).catch(() => {});
    log("treetop after", ((Date.now() - tp) / 1000).toFixed(1), "s", JSON.stringify(await st()));
    await page.evaluate(() => new Promise(r => { let n = 0; const f = () => (++n >= 20 ? r() : requestAnimationFrame(f)); requestAnimationFrame(f); }));
    if (PROFILE) { const { profile } = await cdp.send("Profiler.stop"); fs.writeFileSync(outArg.replace(/\.json$/, ".cpuprofile"), JSON.stringify(profile)); }
    const after = await page.evaluate(m => ({ beat: window.__beat.log.filter(b => b[0] >= m - 50), long: window.__long.filter(l => l[0] >= m - 50), frames: window.__frameWork }), mark);
    result.after = await st();
    result.takeoff = { beat: after.beat, long: after.long, worstFrame: after.frames.reduce((a, f) => (f[1] > a[1] ? f : a), [0, 0, ""]), frames: after.frames.slice(0, 120) };
    log("worst gap", JSON.stringify(result.takeoff.worstFrame), "long tasks", JSON.stringify(after.long.slice(0, 20)));
  } catch (e) { console.error(e); result.errors.push(String(e)); }
  finally { fs.writeFileSync(outArg, JSON.stringify(result, null, 1)); await browser.close(); server.close(); }
})();
