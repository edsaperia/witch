// A sail from the map table as Ed sails (Ed, 2026-11-06, v7569: "When I start sailing, I do not zoom into the map at all but cut
// immediately to a blue loading screen"): serves the built game (or BASE, a deployed one), loads it, opens the table's sea chart
// (window.witch.chart("mapTable")), chooses ISLAND and holds Enter as a person does (one keydown, then the OS's repeats every 33 ms
// after 500 ms) till the table's hold (the tuning's chart.sailHold) has sailed and HOLD ms more, then lets go; the page's frames recorded as they're
// drawn (a screencast) from the press to SECONDS after, with the chart's flight sampled. Fails if the flight jumped to its end
// (app/flightSkip.ts: the held key's repeats used to skip it). Writes <out>/cast/*.jpg and <out>/hold.json.
//   npm run build && node tools/sail/hold.cjs [out] [dist]   ISLAND=fox HOLD=1000 SECONDS=60 BASE=<url> EXTRA=<more of the link>
const http = require("http"), fs = require("fs"), path = require("path");
let playwright; try { playwright = require("playwright"); } catch { playwright = require("/opt/node22/lib/node_modules/playwright"); }
const [outArg = "previews/sail/hold", distArg] = process.argv.slice(2);
const out = path.resolve(outArg), root = path.resolve(distArg || path.join(__dirname, "../../dist"));
const ISLAND = process.env.ISLAND || "fox", HOLD = Number(process.env.HOLD || 1000), SECONDS = Number(process.env.SECONDS || 60);
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
  const errors = [], samples = [];
  let code = 0;
  try {
    const page = await browser.newPage({ viewport: { width: 960, height: 540 } });
    page.on("pageerror", e => errors.push(e.message));
    await page.addInitScript(() => { try { localStorage.setItem("witch.chart.sailAnywhere", "1"); } catch { /* */ } });
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
    const cdp = await page.context().newCDPSession(page);
    let n = 0, ts = Date.now();
    cdp.on("Page.screencastFrame", f => { fs.writeFileSync(path.join(out, "cast", `c-${String(n++).padStart(4, "0")}-t${((Date.now() - ts) / 1000).toFixed(2)}.jpg`), Buffer.from(f.data, "base64")); cdp.send("Page.screencastFrameAck", { sessionId: f.sessionId }).catch(() => {}); });
    await cdp.send("Page.startScreencast", { format: "jpeg", quality: 70, maxWidth: 960, maxHeight: 540, everyNthFrame: 1 });
    const flight = () => page.evaluate(() => { const f = window.chart?.chart?.flight; return f ? { t: +f.t.toFixed(2), end: f.keys.at(-1).at, held: !!f.held } : null; }).catch(() => null);
    ts = Date.now();
    log("holding Enter", HOLD, "ms on", ISLAND);
    await page.keyboard.down("Enter");
    await page.waitForTimeout(500);
    // (held till it sails, however slowly the frames come, then on through the flight's start; at most two minutes)
    let sailed = null;
    while (Date.now() - ts < 120000 && (sailed === null || Date.now() - sailed < HOLD)) { await page.keyboard.down("Enter"); const f = await flight(); if (f) { sailed ??= Date.now(); samples.push({ at: (Date.now() - ts) / 1000, ...f }); } await page.waitForTimeout(33); }
    log(sailed ? `sailed ${((sailed - ts) / 1000).toFixed(1)} s into the hold; let go ${((Date.now() - sailed) / 1000).toFixed(1)} s later` : "never sailed");
    await page.keyboard.up("Enter");
    while (Date.now() - ts < SECONDS * 1000) {
      const f = await flight(), s = await page.evaluate(() => ({ arriving: document.body.classList.contains("arriving"), dive: !!window.witch?.view?.fly })).catch(() => ({}));
      samples.push({ at: (Date.now() - ts) / 1000, ...(f ?? {}), ...s });
      await page.waitForTimeout(500);
    }
    await cdp.send("Page.stopScreencast").catch(() => {});
    const flown = samples.filter(s => s.end !== undefined), first = flown[0];
    // the flight first seen under way: had the held key's repeats skipped it, it would be at its end already (it moves at most 0.1 s a frame)
    const skipped = !first || first.t >= first.end - 0.01;
    log(first ? `the flight: first seen at ${first.t} of ${first.end} s` : "no flight seen", skipped ? "SKIPPED by the held key" : "played");
    fs.writeFileSync(path.join(out, "hold.json"), JSON.stringify({ link: link.replace(/^http:\/\/[^/]+/, ""), island: ISLAND, hold: HOLD, skipped, samples, errors }, null, 1));
    if (skipped) code = 1;
  } catch (e) { console.error(e); code = 1; } finally { await browser.close(); server?.close(); }
  if (errors.length) { console.error("page errors:\n" + errors.join("\n")); code = 1; }
  process.exit(code);
})();
