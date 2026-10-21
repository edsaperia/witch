// The bedroom's main-thread budget (2026-10-21; Foxtrot's measure, Alpha's "one long task after the map"): the built game loaded
// headless, its long tasks (over 50 ms) from witch:view on, while the bedroom shows and the island builds. Plain (the creator's
// room as the loading cover, ?quick=1) or, OPENING=1, the new opening: the chart, Sail home (its dive skipped with a key), the
// wake-up's alarm, and the dressing table's mirror opening the creator (its room made then). Prints the longest tasks and how many
// passed 200 ms; with LIMIT=<ms>, fails if any did after witch:view.
//   node tools/opening/bedroom-budget.cjs [dist] [throttle] [secs]   (OPENING=1, LIMIT=, OUT=<json>)
const http = require("http"), fs = require("fs"), path = require("path");
let pw; try { pw = require("playwright"); } catch { pw = require("/opt/node22/lib/node_modules/playwright"); }
const [dir = "dist", thr = "1", secs = "60"] = process.argv.slice(2), root = path.resolve(dir), opening = process.env.OPENING === "1";
const types = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".json": "application/json", ".png": "image/png", ".wasm": "application/wasm", ".ogg": "audio/ogg", ".woff2": "font/woff2" };
const srv = http.createServer((q, r) => { let f = path.join(root, decodeURIComponent(new URL(q.url, "http://x").pathname)); if (fs.existsSync(f) && fs.statSync(f).isDirectory()) f = path.join(f, "index.html"); if (!f.startsWith(root) || !fs.existsSync(f)) { r.writeHead(404); return r.end(); } r.writeHead(200, { "content-type": types[path.extname(f)] || "application/octet-stream" }); fs.createReadStream(f).pipe(r); });
srv.listen(0, "127.0.0.1", async () => {
  const b = await pw.chromium.launch({ args: ["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist"] });
  const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
  await p.addInitScript(() => { window.__lt = []; try { new PerformanceObserver(l => { for (const e of l.getEntries()) window.__lt.push([e.startTime, e.duration]); }).observe({ type: "longtask", buffered: true }); } catch {} });
  const errors = []; p.on("pageerror", e => errors.push(e.message));
  if (Number(thr) > 1) { const cdp = await p.context().newCDPSession(p); await cdp.send("Emulation.setCPUThrottlingRate", { rate: Number(thr) }); }
  const T = Number(thr), t0 = Date.now();
  await p.goto(`http://127.0.0.1:${srv.address().port}/?quick=1&timing=1${opening ? "&opening=chart" : ""}`);
  let mirrorAt = null;
  if (opening) {
    await p.waitForSelector("#chart-overlay .home", { timeout: 600000 * T });
    await p.waitForTimeout(1500);
    await p.click("#chart-overlay .home");
    await p.waitForFunction(() => !document.getElementById("chart-overlay"), null, { timeout: 600000 * T, polling: 500 });
    await p.keyboard.press("Space");
    await p.waitForFunction(() => !!window.witch?.game?.wake && !document.body.classList.contains("arriving"), null, { timeout: 900000 * T, polling: 500 });
    await p.waitForTimeout(Number(secs) * 500); // (the alarm ringing, the island building)
    // up and to the dressing table: its mirror opens the creator by itself
    await p.evaluate(() => { const g = window.witch.game, th = g.map.treehouse, W = g.witches[0]; g.wake.beat = "up"; W.body = { ...W.body, x: th.x + 14.2, z: th.z - 13.5, vx: 0, vz: 0 }; });
    await p.keyboard.down("KeyA");
    await p.waitForFunction(() => window.witch.game.wake?.mirror, null, { timeout: 300000 * T, polling: 250 }).catch(() => {});
    await p.keyboard.up("KeyA");
    mirrorAt = await p.evaluate(() => performance.now());
    await p.waitForTimeout(Number(secs) * 500);
  } else await p.waitForTimeout(Number(secs) * 1000);
  const r = await p.evaluate(m => {
    const at = n => performance.getEntriesByName(n)[0]?.startTime ?? NaN, v = at("witch:view");
    const after = window.__lt.filter(([s]) => s >= v).map(([s, d]) => [Math.round(s), Math.round(d)]);
    const mirror = m == null ? null : window.__lt.filter(([s]) => s >= m - 1000).map(([s, d]) => [Math.round(s), Math.round(d)]);
    return { view: Math.round(v), ready: Math.round(at("witch:ready")), after, mirror, open: !!window.__creator?.open };
  }, mirrorAt);
  const longest = a => (a ?? []).map(x => x[1]).sort((x, y) => y - x).slice(0, 5);
  const out = { mode: opening ? "opening" : "plain", throttle: T, dir, view: r.view, ready: r.ready, longestAfterView: longest(r.after), over200: r.after.filter(x => x[1] > 200).length, sumOver50: r.after.reduce((a, x) => a + x[1], 0), mirror: r.mirror && { longest: longest(r.mirror), over200: r.mirror.filter(x => x[1] > 200).length, open: r.open }, errors, secs: Math.round((Date.now() - t0) / 1000) };
  console.log(JSON.stringify(out));
  if (process.env.OUT) fs.writeFileSync(process.env.OUT, JSON.stringify(out, null, 1));
  await b.close(); srv.close();
  const lim = Number(process.env.LIMIT ?? 0);
  if (errors.length || (lim && out.longestAfterView[0] > lim * T)) process.exit(1);
});
