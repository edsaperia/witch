// A sail from the map table as Ed sails: serves the built game (or BASE, a deployed one), loads it, opens the table's sea chart
// (window.witch.chart("mapTable")), chooses ISLAND and holds Enter as a person does (one keydown, then the OS's repeats every 33 ms
// after 500 ms) till the table's hold (the tuning's chart.sailHold) has sailed and HOLD ms more, then lets go; the page's frames
// recorded as they're drawn (a screencast) from the press to SECONDS after, with the chart's flight sampled. Nothing may skip the
// zoom (Ed, 2026-11-06: "Remove the ability to skip the zoom. But you can press circle to close the map and stop the sail while it's
// happening"; app/chartSail.ts): fails if the flight ever ran ahead of its frames (at most 0.1 s of it a frame), as a skip does.
//   PRESS=1      taps Space, Enter, an arrow, X, a click and the pad's cross (PAD=1) through the zoom: none may skip it
//   CANCEL=key   E (the table's back) early in the zoom; CANCEL=pad, the pad's circle (a stand-in pad: PAD=1 is implied). Fails unless
//                the chart closes and the night is the one she was on: same seed, same link, no arrival under way.
//   CANCEL=late  E once the sail is committed (the zoom past its first leg, the next night being made): fails unless it sails on.
// Writes <out>/cast/*.jpg and <out>/hold.json.
//   npm run build && node tools/sail/hold.cjs [out] [dist]   ISLAND=fox HOLD=1000 SECONDS=60 PRESS=1 CANCEL=key|pad|late BASE=<url> EXTRA=<more of the link>
const http = require("http"), fs = require("fs"), path = require("path");
let playwright; try { playwright = require("playwright"); } catch { playwright = require("/opt/node22/lib/node_modules/playwright"); }
const [outArg = "previews/sail/hold", distArg] = process.argv.slice(2);
const out = path.resolve(outArg), root = path.resolve(distArg || path.join(__dirname, "../../dist"));
const ISLAND = process.env.ISLAND || "fox", HOLD = Number(process.env.HOLD || 1000), SECONDS = Number(process.env.SECONDS || 60);
const CANCEL = process.env.CANCEL || "", PRESS = process.env.PRESS === "1", PAD = process.env.PAD === "1" || CANCEL === "pad";
const types = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".json": "application/json", ".png": "image/png", ".wasm": "application/wasm", ".woff2": "font/woff2", ".ttf": "font/ttf", ".ogg": "audio/ogg" };
const t0 = Date.now(), log = (...a) => console.log(`[${((Date.now() - t0) / 1000).toFixed(1)} s]`, ...a);

(async () => {
  fs.mkdirSync(path.join(out, "cast"), { recursive: true });
  let server = null, base = process.env.BASE;
  if (!base) {
    server = http.createServer((req, res) => { const p = path.join(root, decodeURIComponent(new URL(req.url, "http://x").pathname)), f = fs.existsSync(p) && fs.statSync(p).isDirectory() ? path.join(p, "index.html") : p; if (!f.startsWith(root) || !fs.existsSync(f)) { res.writeHead(404); res.end(); return; } res.writeHead(200, { "Content-Type": types[path.extname(f)] || "application/octet-stream" }); fs.createReadStream(f).pipe(res); });
    await new Promise(r => server.listen(0, "127.0.0.1", r));
    base = `http://127.0.0.1:${server.address().port}`;
  }
  const proxy = /^https:/.test(base) && process.env.HTTPS_PROXY ? { proxy: { server: process.env.HTTPS_PROXY } } : {};
  const browser = await playwright.chromium.launch({ ...proxy, args: ["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist"] });
  const errors = [], samples = [], fails = [];
  let code = 0;
  try {
    const page = await browser.newPage({ viewport: { width: 960, height: 540 } });
    page.on("pageerror", e => errors.push(e.message));
    await page.addInitScript(() => {
      try { localStorage.setItem("witch.chart.sailAnywhere", "1"); } catch { /* */ }
      window.__frames = 0; const f = () => { window.__frames++; requestAnimationFrame(f); }; requestAnimationFrame(f); // (the page's frames, for the flight's pace)
    });
    // (a stand-in pad, its buttons pressed by window.__pad(i, on): 0 cross, 1 circle, as platform/bindings.ts PAD_BUTTONS)
    if (PAD) await page.addInitScript(() => {
      const buttons = Array.from({ length: 17 }, () => ({ pressed: false, touched: false, value: 0 }));
      const pad = { id: "stand-in pad", index: 0, connected: true, mapping: "standard", timestamp: 0, axes: [0, 0, 0, 0], buttons };
      navigator.getGamepads = () => [pad];
      window.__pad = (i, on) => { buttons[i].pressed = on; buttons[i].value = on ? 1 : 0; pad.timestamp = performance.now(); };
    });
    const link = `${base.replace(/\/$/, "")}/?fresh=1${process.env.EXTRA ? "&" + process.env.EXTRA : ""}`;
    log("loading", link.replace(/^http:\/\/[^/]+/, ""));
    await page.goto(link);
    await page.waitForFunction(() => window.witch && window.witch.ready, null, { timeout: 1800000, polling: 1000 });
    log("ready; the map table's chart");
    await page.waitForTimeout(3000);
    await page.evaluate(() => window.witch.chart("mapTable"));
    await page.waitForFunction(i => window.chart?.islands?.().some(x => x.id === i), ISLAND, { timeout: 600000, polling: 250 });
    // (a fresh game has found no island: the chart's own test switch, as the person testing presses it; the key in a fresh game's storage)
    await page.evaluate(() => { const b = document.querySelector("#chart-overlay button.sail-any"); if (b && b.getAttribute("aria-pressed") !== "true") b.click(); });
    await page.evaluate(async i => { window.chart.choose(i); await new Promise(r => setTimeout(r, 1500)); }, ISLAND);
    await page.waitForFunction(i => window.chart?.islands?.().find(x => x.id === i && x.outline && x.sail), ISLAND, { timeout: 600000, polling: 250 });
    await page.evaluate(() => document.activeElement?.blur?.());
    // (the chart's frames coming steadily before the press, so the hold's ring fills while it's held: ten frames in a row each under
    // 400 ms, else on after two minutes; a software renderer is busy for a while after choosing, the island's bake starting)
    await page.evaluate(() => new Promise(done => { let last = performance.now(), run = 0; const until = last + 120000; const f = now => { run = now - last < 400 ? run + 1 : 0; last = now; if (run >= 10 || now > until) done(); else requestAnimationFrame(f); }; requestAnimationFrame(f); }));
    const night = () => page.evaluate(() => ({ seed: window.witch?.game?.seed ?? null, search: location.search, arriving: document.body.classList.contains("arriving"), chart: !!document.getElementById("chart-overlay"), ready: !!window.witch?.ready })).catch(() => ({}));
    const before = await night();
    const cdp = await page.context().newCDPSession(page);
    let n = 0, ts = Date.now();
    cdp.on("Page.screencastFrame", f => { fs.writeFileSync(path.join(out, "cast", `c-${String(n++).padStart(4, "0")}-t${((Date.now() - ts) / 1000).toFixed(2)}.jpg`), Buffer.from(f.data, "base64")); cdp.send("Page.screencastFrameAck", { sessionId: f.sessionId }).catch(() => {}); });
    await cdp.send("Page.startScreencast", { format: "jpeg", quality: 70, maxWidth: 960, maxHeight: 540, everyNthFrame: 1 });
    const flight = () => page.evaluate(() => { const c = window.chart?.chart, f = c?.flight; return f ? { t: +f.t.toFixed(2), end: f.keys.at(-1).at, held: !!f.held, framed: !!c.flightFramed, frames: window.__frames } : null; }).catch(() => null);
    const sample = async () => { const f = await flight(); if (f) samples.push({ at: (Date.now() - ts) / 1000, ...f }); return f; };
    ts = Date.now();
    log("holding Enter on", ISLAND, HOLD ? `and ${HOLD} ms after it sails` : "till it sails");
    await page.keyboard.down("Enter");
    await page.waitForTimeout(500);
    // (held till it sails, however slowly the frames come, then on through the flight's start; at most two minutes)
    let sailed = null;
    while (Date.now() - ts < 120000 && (sailed === null || Date.now() - sailed < HOLD)) { await page.keyboard.down("Enter"); if (await sample()) sailed ??= Date.now(); await page.waitForTimeout(33); }
    log(sailed ? `sailed ${((sailed - ts) / 1000).toFixed(1)} s into the hold; let go ${((Date.now() - sailed) / 1000).toFixed(1)} s later` : "never sailed");
    await page.keyboard.up("Enter");
    if (!sailed) fails.push("never sailed");
    const back = async () => {
      // (the pad's circle held till a frame has read it: a software renderer's frames come seconds apart; a real pad's press spans several)
      if (CANCEL === "pad") { await page.evaluate(() => window.__pad(1, true)); const f0 = await page.evaluate(() => window.__frames); await page.waitForFunction(f => window.__frames >= f + 3, f0, { timeout: 30000, polling: 50 }).catch(() => {}); await page.evaluate(() => window.__pad(1, false)); }
      else await page.keyboard.press("e");
    };
    let cancelledAt = null;
    if (CANCEL === "key" || CANCEL === "pad") {
      const f = await sample();
      if (f?.framed) fails.push(`the zoom was past its first leg (${f.t} s) before the back could be pressed`);
      log(`the chart's back (${CANCEL === "pad" ? "circle" : "E"}) at ${f?.t} s of the zoom`);
      await back(); cancelledAt = Date.now();
    }
    if (CANCEL === "late") {
      await page.waitForFunction(() => window.chart?.chart?.flightFramed, null, { timeout: 600000, polling: 100 }).catch(() => fails.push("the zoom never reached its second leg"));
      log("the sail committed; E pressed"); await back(); cancelledAt = Date.now();
    }
    let pressed = 0; const shots = new Set();
    while (Date.now() - ts < SECONDS * 1000) {
      const f = await sample();
      if (PRESS && f && !CANCEL && pressed < 8) { // (any key or button through the zoom: none may skip it)
        const k = ["Space", "Enter", "ArrowUp", "x"][pressed % 4];
        if (pressed === 4) await page.mouse.click(480, 270); else if (pressed === 5 && PAD) { await page.evaluate(() => window.__pad(0, true)); const f0 = await page.evaluate(() => window.__frames); await page.waitForFunction(f => window.__frames >= f + 3, f0, { timeout: 30000, polling: 50 }).catch(() => {}); await page.evaluate(() => window.__pad(0, false)); } else await page.keyboard.press(k);
        pressed++;
      }
      const s = await night();
      samples.push({ at: (Date.now() - ts) / 1000, ...s });
      if (cancelledAt && CANCEL !== "late") { // (her night back: a picture now and then, as the screencast stalls on a software renderer)
        const k = Math.floor((Date.now() - cancelledAt) / 4000);
        if (!shots.has(k)) { shots.add(k); await page.screenshot({ path: path.join(out, "cast", `s-${String(k).padStart(2, "0")}-t${((Date.now() - ts) / 1000).toFixed(2)}.jpg`), quality: 70, timeout: 60000 }).catch(() => {}); }
        if (Date.now() - cancelledAt > 16000) break;
      }
      await page.waitForTimeout(f ? 150 : 500);
    }
    await cdp.send("Page.stopScreencast").catch(() => {});
    const flown = samples.filter(s => s.end !== undefined), first = flown[0];
    // the flight never ahead of its frames: from its first sample, at most 0.1 s of it a frame (and a little for the sampling)
    if (first) { const base0 = first.frames - first.t / 0.1; for (const s of flown) if (s.t > 0.1 * (s.frames - base0) + 0.25) { fails.push(`skipped: ${s.t} s of the zoom ${s.frames - base0} frames in`); break; } }
    const after = await night();
    if (CANCEL === "key" || CANCEL === "pad") {
      if (after.chart) fails.push("the chart still up after its back");
      if (after.seed !== before.seed || after.search !== before.search) fails.push(`the night changed: ${JSON.stringify(before)} -> ${JSON.stringify(after)}`);
      if (after.arriving || !after.ready) fails.push(`not back on her night: ${JSON.stringify(after)}`);
    }
    if (CANCEL === "late" && (after.seed === before.seed || !samples.some(s => s.arriving))) fails.push(`the committed sail didn't sail on: ${JSON.stringify(after)}`);
    log(first ? `the flight: first seen at ${first.t} of ${first.end} s, last at ${flown.at(-1).t}` : "no flight seen", fails.length ? `FAILED: ${fails.join("; ")}` : "ok", JSON.stringify({ before, after }));
    fs.writeFileSync(path.join(out, "hold.json"), JSON.stringify({ link: link.replace(/^http:\/\/[^/]+/, ""), island: ISLAND, hold: HOLD, cancel: CANCEL || null, press: PRESS, before, after, fails, samples, errors }, null, 1));
    if (fails.length) code = 1;
  } catch (e) { console.error(e); code = 1; } finally { await browser.close(); server?.close(); }
  if (errors.length) { console.error("page errors:\n" + errors.join("\n")); code = 1; }
  process.exit(code);
})();
