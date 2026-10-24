// Finds on loan's frames for Ed (Ed, 2026-10-24; app/loan.ts, render/dream.ts, render/loanIcon.ts, render/loanSparkle.ts): the
// built game in headless Chromium (as tools/shot/shot.cjs loads it: ?shot=<scene>, only the art the view needs), then
//   dream   her dream of a loan over the bedroom's dark, won and lost, frame by frame at its own times (window.__dream.draw)
//   homes   the won dream's last beat for each kind of find: a hat (the hats' floor), clothes (the wardrobe), a part (the pegboard),
//           a bag (the bags)
//   hats    a hat on loan on the hats' floor, sparkling, a few frames apart
//   card    a loaned top's card sparkling at the wardrobe
//   sky     a find on loan north of the treehouse: the on-loan icon top left, its constellation lit in the treetops' sky
//   npm run build && node tools/loan/shots.cjs <out dir> [dream,homes,hats,card,sky]
// SEED (123), SIZE (1280x720), DIST (dist/), TIMEOUT (seconds a scene's art may take, 1500).
const http = require("http"), fs = require("fs"), path = require("path");
let playwright; try { playwright = require("playwright"); } catch { playwright = require("/opt/node22/lib/node_modules/playwright"); }

const [outArg, which = "dream,homes,hats,card,sky"] = process.argv.slice(2);
if (!outArg) { console.error("usage: node tools/loan/shots.cjs <out dir> [dream,homes,hats,card,sky]"); process.exit(2); }
const out = path.resolve(outArg), root = path.resolve(process.env.DIST || path.join(__dirname, "../../dist"));
const [W, H] = (process.env.SIZE || "1280x720").split("x").map(Number), LIMIT = Number(process.env.TIMEOUT || 1500) * 1000;
const types = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".json": "application/json", ".png": "image/png", ".wasm": "application/wasm", ".woff2": "font/woff2", ".ogg": "audio/ogg" };
const t0 = Date.now(), log = (...a) => console.log(`[${((Date.now() - t0) / 1000).toFixed(0)} s]`, ...a);
const want = new Set(which.split(","));

(async () => {
  fs.mkdirSync(out, { recursive: true });
  const server = http.createServer((req, res) => { const p = path.join(root, decodeURIComponent(new URL(req.url, "http://x").pathname)), f = fs.existsSync(p) && fs.statSync(p).isDirectory() ? path.join(p, "index.html") : p; if (!fs.existsSync(f)) { res.writeHead(404); res.end(); return; } res.writeHead(200, { "content-type": types[path.extname(f)] || "application/octet-stream" }); fs.createReadStream(f).pipe(res); });
  await new Promise(r => server.listen(0, "127.0.0.1", r));
  const browser = await playwright.chromium.launch({ args: ["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist"] });
  const errors = [];
  /** A page at `scene` (?shot=), its art in, the loop standing still. */
  async function open(scene, extra = "") {
    const page = await browser.newPage({ viewport: { width: W, height: H } });
    page.on("pageerror", e => errors.push(`${scene}: ${e.message}`));
    await page.goto(`http://127.0.0.1:${server.address().port}/?shot=${encodeURIComponent(scene)}&seed=${process.env.SEED || 123}${extra}`);
    await page.waitForFunction(() => window.witch && window.witch.ready, null, { timeout: LIMIT, polling: 500 });
    await page.evaluate(() => { window.witch.manual = true; });
    if (await page.evaluate(() => window.witch.game.clock.paused)) { await page.keyboard.press("Enter"); await page.waitForFunction(() => !window.witch.game.clock.paused, null, { timeout: 60000, polling: 200 }).catch(() => {}); }
    const said = await page.evaluate(s => window.witch.lastShot ?? window.witch.shot(s), scene);
    if (!said.ok) throw new Error(said.say);
    await settle(page);
    log(scene, "ready");
    return page;
  }
  const step = (page, n) => page.evaluate(n => { const w = window.witch; for (let i = 0; i < n; i++) w.frame({ moveX: 0, moveZ: 0, toggleMode: false, zoom: 0 }, 1 / 60, i === n - 1); }, n);
  async function settle(page) {
    for (let round = 0, calm = 0; calm < 2 && round < 40; round++) {
      await step(page, 10);
      if (await page.evaluate(() => window.witch.view.assets.pending) === 0) { calm++; continue; }
      calm = 0;
      await page.waitForFunction(() => window.witch.view.assets.pending === 0, null, { timeout: LIMIT, polling: 500 });
    }
  }
  /** The real loop for `ms` (main.ts's own frame: the HUD's icon, the stations' panels), then still again. */
  async function live(page, ms) { await page.evaluate(() => { window.witch.manual = false; }); await page.waitForTimeout(ms); await page.evaluate(() => { window.witch.manual = true; }); }
  const shot = (page, name) => page.screenshot({ path: path.join(out, name), timeout: 300000 });
  try {
    if (want.has("dream") || want.has("homes")) {
      const page = await open("object:bed");
      if (want.has("dream")) for (const [v, total] of [["won", 8], ["lost", 5.5]]) {
        await page.evaluate(v => window.witch.dream(v, "hat", "sentry"), v);
        log("her head on the page:", JSON.stringify(await page.evaluate(() => window.__dream.head())));
        for (let i = 0, t = 0.2; t < total - 0.1; i++, t += 0.25) { await page.evaluate(t => window.__dream.draw(t), t); await shot(page, `dream-${v}-${String(i).padStart(2, "0")}.png`); }
        log(`dream ${v}: frames saved`);
      }
      if (want.has("homes")) for (const [kind, item] of [["hat", "sentry"], ["wearable", "top-cape"], ["wearable", "shoes-chunky"], ["part", "nozzles"], ["bag", "backpack"]]) {
        await page.evaluate(([k, i]) => window.witch.dream("won", k, i), [kind, item]);
        await page.evaluate(() => window.__dream.draw(5.2));
        await shot(page, `home-${kind}-${item}.png`);
        log(`home ${kind} ${item}`);
      }
      await page.close();
    }
    if (want.has("hats")) {
      const page = await open("object:hats", "&hats=helmet"); // (only the helmet hers: the Sentry hat taken goes onto the floor)
      await step(page, 5);
      log("take:", await page.evaluate(() => window.witch.take("hat", "sentry")));
      log("floor:", await page.evaluate(() => { const W = window.witch.game.witches[0]; return JSON.stringify({ floor: W.house?.hats ?? null, hats: W.spells.hats ?? null, hat: W.spells.hat, trunk: window.witch.game.trunk }); }));
      await settle(page);
      for (let i = 0; i < 8; i++) { await step(page, 1); await shot(page, `sparkle-hats-${i}.png`); await page.waitForTimeout(220); }
      log("sparkle:", await page.evaluate(() => { const c = document.querySelector(".loan-sparkle"); return c ? `${c.style.display} ${c.width}x${c.height} at ${c.dataset.at}` : "none"; }));
      await page.close();
    }
    if (want.has("card")) {
      const page = await open("object:wardrobe");
      log("take:", await page.evaluate(() => window.witch.take("wearable", "top-cape")));
      await live(page, 3000);
      for (let i = 0; i < 6; i++) { await shot(page, `sparkle-card-${i}.png`); await page.waitForTimeout(280); }
      await page.close();
    }
    if (want.has("sky")) {
      // (north of the treehouse, so its constellation stands to the north, where the game's sky looks)
      const page = await open("at:3208,2380,treetop");
      log("take:", await page.evaluate(() => window.witch.take("hat", "sentry")));
      await live(page, 4000);
      await shot(page, "sky-treetop.png");
      await page.close();
    }
  } finally { await browser.close(); server.close(); }
  if (errors.length) { console.error("page errors:\n" + errors.join("\n")); process.exit(1); }
  log("done");
})().catch(e => { console.error(e.message || e); process.exit(1); });
