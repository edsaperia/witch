// The loading mist through the dive (Ed, 2026-10-24: "the dive might now interact with loading mist, in a good way - please
// check"): the built game loaded at home (its gate off and its trees drawn ahead of need held back, ?mistgate=0&artdelay=), then
// sailed in place to another island (window.witch.sail: the night ended, the next made, the chart's flight in over the sea and the
// forest to her decks, app/arrive.ts), the page's own loop running, a picture every EVERY seconds of the wall's clock from the
// sail on, each logged with the flight's state and each area type's mist front. Writes <out>/dive-NNN.png and <out>/dive.json.
//   npm run build && node tools/mist/dive.cjs [out] [dist]
// ISLAND (fox), SEED (4242), MIST (1; 0 to film it without), ARTDELAY (s, 30), EVERY (s, 3), SECONDS (after the sail, 240), SIZE (960x540), EXTRA (more of the link).
const http = require("http"), fs = require("fs"), path = require("path");
let playwright; try { playwright = require("playwright"); } catch { playwright = require("/opt/node22/lib/node_modules/playwright"); }
const [outArg = "previews/mist/dive", distArg] = process.argv.slice(2);
const out = path.resolve(outArg), root = path.resolve(distArg || path.join(__dirname, "../../dist"));
const [W, H] = (process.env.SIZE || "960x540").split("x").map(Number), EVERY = Number(process.env.EVERY || 3), SECONDS = Number(process.env.SECONDS || 240);
const ISLAND = process.env.ISLAND || "fox", SEED = Number(process.env.SEED || 4242), DELAY = Number(process.env.ARTDELAY ?? 30);
const types = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".json": "application/json", ".png": "image/png", ".wasm": "application/wasm", ".woff2": "font/woff2", ".ogg": "audio/ogg" };
const t0 = Date.now(), log = (...a) => console.log(`[${((Date.now() - t0) / 1000).toFixed(0)} s]`, ...a);

(async () => {
  fs.mkdirSync(out, { recursive: true });
  const server = http.createServer((req, res) => { const p = path.join(root, decodeURIComponent(new URL(req.url, "http://x").pathname)), f = fs.existsSync(p) && fs.statSync(p).isDirectory() ? path.join(p, "index.html") : p; if (!f.startsWith(root) || !fs.existsSync(f)) { res.writeHead(404); res.end(); return; } res.writeHead(200, { "Content-Type": types[path.extname(f)] || "application/octet-stream" }); fs.createReadStream(f).pipe(res); });
  await new Promise(r => server.listen(0, "127.0.0.1", r));
  const browser = await playwright.chromium.launch({ args: ["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist"] });
  const errors = [], shots = [];
  let code = 0;
  try {
    const page = await browser.newPage({ viewport: { width: W, height: H } });
    page.on("pageerror", e => errors.push(e.message));
    const link = `http://127.0.0.1:${server.address().port}/?loadmist=${process.env.MIST ?? 1}&mistgate=0${DELAY > 0 ? `&artdelay=${DELAY}` : ""}${process.env.EXTRA ? "&" + process.env.EXTRA : ""}`;
    log("loading", link.replace(/^http:\/\/[^/]+/, ""));
    await page.goto(link);
    await page.waitForFunction(() => window.witch && window.witch.ready, null, { timeout: 1800000, polling: 500 });
    log("ready; sailing to", ISLAND);
    const ts = Date.now();
    await page.evaluate(([i, s]) => { window.witch.sail(i, s); }, [ISLAND, SEED]);
    const state = () => page.evaluate(() => {
      const w = window.witch, v = w?.view, M = v?.loadingMist, g = w?.game;
      if (!v || !g) return null;
      const m = g.map, fronts = {};
      for (let y = m.first; y < m.first + m.n; y++) for (let x = m.first; x < m.first + m.n; x++) { const t = m.typeOf(x, y); if (!(t in fronts)) fronts[t] = M ? Math.round(Math.max(-99999, Math.min(99999, M.frontOf(t)))) : null; }
      return { seed: g.seed, flying: !!v.fly, arriving: document.body.classList.contains("arriving"), still: document.getElementById("arrive-still") ? getComputedStyle(document.getElementById("arrive-still")).opacity : null, mist: !!M && !M.done, fronts, landed: [...(v.assets.typeLog?.values() ?? [])].filter(L => L.landed !== undefined).length };
    }).catch(() => null);
    for (let i = 0; (Date.now() - ts) / 1000 < SECONDS; i++) {
      const at = Date.now();
      const s = await state();
      const file = `dive-${String(i).padStart(3, "0")}.png`;
      await page.screenshot({ path: path.join(out, file) }).catch(e => log("screenshot failed", e.message));
      shots.push({ file, t: +((at - ts) / 1000).toFixed(1), ...s });
      log(file, JSON.stringify({ t: shots[shots.length - 1].t, ...s }));
      const wait = EVERY * 1000 - (Date.now() - at);
      if (wait > 0) await page.waitForTimeout(wait);
    }
    fs.writeFileSync(path.join(out, "dive.json"), JSON.stringify({ link: link.replace(/^http:\/\/[^/]+/, ""), island: ISLAND, seed: SEED, shots }, null, 1));
  } catch (e) { console.error(e); code = 1; } finally { await browser.close(); server.close(); }
  if (errors.length) { console.error("page errors:\n" + errors.join("\n")); code = 1; }
  process.exit(code);
})();
