// Frames of creatures won over celebrating (Ed, 2026-10-29; render/cheer.ts): the built game in headless Chromium, the debug arena
// (ARENA, default one of each body: wolves roll, toads hop, bats loop, snakes wiggle), her put down beside it, every one set
// celebrating (cheerUntil), a frame at each of AT (seconds into its second) into OUT (default previews/cheer/). Run `npm run build` first.
const http = require("http"), fs = require("fs"), path = require("path");
let playwright;
try { playwright = require("playwright"); } catch { playwright = require("/opt/node22/lib/node_modules/playwright"); }
const root = path.resolve(process.env.DIST || path.resolve(__dirname, "../../dist")), out = path.resolve(process.env.OUT || path.resolve(__dirname, "../../previews/cheer"));
const ARENA = process.env.ARENA || "wolf*1@2,toad*1@2,bat*1@2,snake*1@2", AT = (process.env.AT || "0.25,0.5,0.75").split(",").map(Number);
const types = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".json": "application/json", ".png": "image/png" };
function serve() {
  const server = http.createServer((req, res) => {
    const p = path.join(root, decodeURIComponent(new URL(req.url, "http://x").pathname));
    const file = fs.existsSync(p) && fs.statSync(p).isDirectory() ? path.join(p, "index.html") : p;
    if (!file.startsWith(root) || !fs.existsSync(file)) { res.writeHead(404); res.end(); return; }
    res.writeHead(200, { "content-type": types[path.extname(file)] || "application/octet-stream" });
    fs.createReadStream(file).pipe(res);
  });
  return new Promise(r => server.listen(0, "127.0.0.1", () => r(server)));
}
(async () => {
  fs.mkdirSync(out, { recursive: true });
  const server = await serve(), port = server.address().port;
  const browser = await playwright.chromium.launch({ args: ["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist"] });
  const page = await browser.newPage({ viewport: { width: 1280, height: 720 } }), errors = [];
  page.on("pageerror", e => errors.push(e.message));
  page.on("console", m => { if (m.type() === "error") errors.push(m.text()); });
  await page.goto(`http://127.0.0.1:${port}/?creator=0&seed=123&spell=auto&arena=${encodeURIComponent(ARENA)}`);
  await page.waitForFunction(() => window.witch && window.witch.ready, null, { timeout: 300000, polling: 500 });
  await page.keyboard.press("Enter");
  await page.waitForFunction(() => !window.witch.game.clock.paused, null, { timeout: 30000 }).catch(() => {});
  // Everyone in the arena held where it stands and out of any fight, every frame (moved by hand, the view would drop them), and each
  // held `at` of the way through its celebration once a shot is wanted (window.__cheerAt; null: not yet); her at their middle.
  await page.evaluate(() => {
    window.__cheerAt = null;
    const tick = () => {
      const g = window.witch.game, S = g.tuning.invites.cheer?.secs ?? 1;
      for (const id of g.arena.ids) {
        const c = g.creatures[id];
        if (c.gone) continue;
        Object.assign(c, { tx: c.x, tz: c.z, fight: undefined, fleeUntil: undefined, dazed: false, affection: undefined, fills: undefined, drops: undefined, cheerUntil: window.__cheerAt === null ? undefined : g.clock.time + S * (1 - window.__cheerAt) });
      }
      requestAnimationFrame(tick);
    };
    tick();
  });
  const place = () => page.evaluate(() => {
    const g = window.witch.game, cs = g.arena.ids.map(id => g.creatures[id]).filter(c => !c.gone);
    const mx = cs.reduce((a, c) => a + c.x, 0) / cs.length, mz = cs.reduce((a, c) => a + c.z, 0) / cs.length;
    g.witch = { ...g.witch, x: mx, z: mz + 7, seated: false, mode: "ground", lift: 0 };
    g.witches[0].health.hp = 1e6;
  });
  await place();
  for (let i = 0; i < +(process.env.ZOOM || 4); i++) { await page.keyboard.press("KeyZ"); await page.waitForTimeout(400); } // (in close: the celebrations are small moves)
  await page.waitForFunction(() => { const g = window.witch.game, v = window.witch.view; return g.arena.ids.every(id => g.creatures[id].gone || v.assets.hasCreature(g.creatures[id].species)); }, null, { timeout: 900000, polling: 2000 }).catch(() => console.log("art not all baked"));
  await place();
  await page.waitForTimeout(3000);
  for (const [k, at] of AT.entries()) {
    await page.evaluate(at => { window.__cheerAt = at; }, at);
    await page.waitForTimeout(2500);
    console.log(at, JSON.stringify(await page.evaluate(() => { const g = window.witch.game, v = window.witch.view; return { sprites: v.stats.creatures, near: g.arena.ids.map(id => { const c = g.creatures[id]; return [c.species, c.gone ? "gone" : Math.round(c.x - g.witch.x) + "," + Math.round(c.z - g.witch.z)]; }) }; })));
    await page.screenshot({ path: path.join(out, `cheer-${String(k).padStart(2, "0")}.png`) });
  }
  console.log(errors.length ? errors.slice(0, 5) : "no errors");
  await browser.close(); server.close();
})();
