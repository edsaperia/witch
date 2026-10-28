// Frames of a busy fight under combat as orbit slots (Ed, 2026-10-28; rules/orbit.ts): the built game in headless Chromium, the debug
// arena (ARENA, default her adult wolves against adult boars), her put down beside it, a frame every STEP seconds of game time for SECS
// seconds into OUT (default previews/orbit-combat/), so hearts, 💧s and 💌s can be judged together. Run `npm run build` first.
const http = require("http"), fs = require("fs"), path = require("path");
let playwright;
try { playwright = require("playwright"); } catch { playwright = require("/opt/node22/lib/node_modules/playwright"); }
const root = path.resolve(process.env.DIST || path.resolve(__dirname, "../../dist")), out = path.resolve(process.env.OUT || path.resolve(__dirname, "../../previews/orbit-combat"));
const ARENA = process.env.ARENA || "wolf*4@2,boar*4@2", SECS = +(process.env.SECS || 24), STEP = +(process.env.STEP || 3);
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
  // Her beside the arena on the ground (before its art bakes, so the view's there), out of its way and unhurt; then, each frame, a
  // fight's worth of hearts and 💧s on them (staged: the frames are for judging how the three read together, not a fight's course).
  const stage = () => page.evaluate(() => {
    const g = window.witch.game, cs = g.arena.ids.map(id => g.creatures[id]).filter(c => !c.gone && !c.fleeUntil);
    const mx = cs.reduce((a, c) => a + c.x, 0) / cs.length, mz = cs.reduce((a, c) => a + c.z, 0) / cs.length;
    g.witch = { ...g.witch, x: mx, z: mz + 16, seated: false, mode: "ground", lift: 0 };
    g.witches[0].health.hp = 1e6;
    cs.forEach((c, i) => { if (c.leashed) c.drops = Math.max(c.drops ?? 0, 0.2 + 0.15 * (i % 3)); else if (!c.dazed) { c.affection = 0.45 + 0.1 * (i % 3); c.fills = [c.affection - 0.3, -0.3]; c.affectionAt = g.clock.time; } });
  });
  await stage();
  await page.waitForFunction(() => (window.witch.view.stats.creatures ?? 0) > 0, null, { timeout: 600000, polling: 1000 }).catch(() => console.log("creatures not drawn yet"));
  const t0 = await page.evaluate(() => window.witch.game.clock.time);
  for (let k = 0; k * STEP <= SECS; k++) {
    await page.waitForFunction(t => window.witch.game.clock.time >= t, t0 + k * STEP, { timeout: 180000, polling: 50 });
    await stage();
    await page.waitForTimeout(1500); // (a few frames drawn with them)
    await page.screenshot({ path: path.join(out, `frame-${String(k).padStart(2, "0")}.png`) });
  }
  console.log(errors.length ? errors.slice(0, 5) : "no errors");
  await browser.close(); server.close();
})();
