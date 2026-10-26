// A sail ending in bed (Ed, 2026-10-25, his 2a: "a sail always ends with her asleep in bed"; app/opening.ts sailLandsInBed, main.ts
// bedFirst and arrived): the built game loaded at home, then sailed in place to another island (window.witch.sail, the chart's
// path), the page's own loop running through the flight in, a picture every EVERY seconds, each logged with the flight's and the
// wake-up's state; then, landed, the alarm ringing in her bedroom, a step up out of bed, and her by last night's clothes. LOAN=1
// takes the night's find first (window.witch.take), so she dreams it as she lands. Writes <out>/bed-NNN.png and <out>/bed.json.
//   npm run build && node tools/sail/bed-shots.cjs [out] [dist]
// ISLAND (fox), SEED (4242), LOAN (0), EVERY (s, 4), SECONDS (most of the flight filmed, 400; it waits for the landing all the same), SIZE (960x540).
const http = require("http"), fs = require("fs"), path = require("path");
let playwright; try { playwright = require("playwright"); } catch { playwright = require("/opt/node22/lib/node_modules/playwright"); }
const [outArg = "previews/sail/bed", distArg] = process.argv.slice(2);
const out = path.resolve(outArg), root = path.resolve(distArg || path.join(__dirname, "../../dist"));
const [W, H] = (process.env.SIZE || "960x540").split("x").map(Number), EVERY = Number(process.env.EVERY || 4), SECONDS = Number(process.env.SECONDS || 400);
const ISLAND = process.env.ISLAND || "fox", SEED = Number(process.env.SEED || 4242), LOAN = process.env.LOAN === "1";
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
    await page.goto(`http://127.0.0.1:${server.address().port}/?creator=0&quick=1&seed=123`);
    await page.waitForFunction(() => window.witch && window.witch.ready, null, { timeout: 1800000, polling: 500 });
    await page.keyboard.press("Enter"); // (?creator=0: the start card's any key)
    await page.waitForFunction(() => !window.witch.game.clock.paused, null, { timeout: 120000, polling: 200 }).catch(() => {});
    if (LOAN) log("take:", JSON.stringify(await page.evaluate(() => { const t = window.witch.game.trunk; return t ? window.witch.take(t.kind, t.item) : "no trunk"; })));
    log("sailing to", ISLAND, SEED);
    const ts = Date.now();
    const sailed = page.evaluate(([i, s]) => window.witch.sail(i, s), [ISLAND, SEED]);
    const state = () => page.evaluate(() => {
      const w = window.witch, g = w?.game;
      if (!g) return null;
      const W = g.witches[0];
      return { seed: g.seed, flying: !!w.view?.fly, arriving: document.body.classList.contains("arriving"), wake: g.wake ? { beat: g.wake.beat, first: !!g.wake.first, open: g.wake.open, pile: g.wake.pile?.length ?? 0 } : null, seated: W.body.seated, x: Math.round(W.body.x), z: Math.round(W.body.z) };
    }).catch(() => null);
    const shoot = async tag => {
      const s = await state(), file = `bed-${String(shots.length).padStart(3, "0")}.png`;
      await page.screenshot({ path: path.join(out, file) }).catch(e => log("screenshot failed", e.message));
      shots.push({ file, tag, t: +((Date.now() - ts) / 1000).toFixed(1), ...s });
      log(file, tag, JSON.stringify(s));
      return s;
    };
    // the flight in, till it lands (the wake-up on) or SECONDS
    for (;;) {
      const at = Date.now(), s = await shoot("flight");
      if ((s?.seed === SEED && s.wake && !s.arriving) || (Date.now() - ts) / 1000 > SECONDS) break;
      const wait = EVERY * 1000 - (Date.now() - at);
      if (wait > 0) await page.waitForTimeout(wait);
    }
    await sailed;
    await page.waitForFunction(s => window.witch.game.seed === s && !!window.witch.game.wake && !document.body.classList.contains("arriving"), SEED, { timeout: 1800000, polling: 500 }); // (landed: a slow renderer's flight outlasts SECONDS)
    await page.waitForTimeout(3000);
    await shoot(LOAN ? "landed: dreaming" : "landed: the alarm");
    if (LOAN) { await page.keyboard.press("KeyW"); await page.waitForTimeout(2500); await shoot("the dream over: the alarm"); }
    await page.keyboard.down("KeyD"); await page.waitForTimeout(1200); await page.keyboard.up("KeyD");
    await page.waitForTimeout(2000);
    await shoot("up: in her nightie, the pile by the bed");
    fs.writeFileSync(path.join(out, "bed.json"), JSON.stringify({ island: ISLAND, seed: SEED, loan: LOAN, shots }, null, 1));
  } catch (e) { console.error(e); code = 1; } finally { await browser.close(); server.close(); }
  if (errors.length) { console.error("page errors:\n" + errors.join("\n")); code = 1; }
  process.exit(code);
})();
