// The live rig's demo (#79 stage 5): serves the built game (dist/), loads it in headless Chromium
// with ?rig=1 and an arena (ARENA, default "wolf*4@2,snake*5@2"; the presets work too, e.g. charge
// or leap), starts it, and saves screenshots every STEP seconds of game time for SECS seconds to
// previews/rig-<name>-<n>.png, then a strip of them side by side (previews/rig-<name>.png). With
// COUNT=n it instead fills the arena with n creatures and reports the frame times.
// Run `npm run build` first.
const http = require("http"), fs = require("fs"), path = require("path");
let playwright;
try { playwright = require("playwright"); } catch { playwright = require("/opt/node22/lib/node_modules/playwright"); }
const root = path.resolve(__dirname, "../../dist"), out = path.resolve(__dirname, "../../previews");
const ARENA = process.env.ARENA || "wolf*4@2,snake*5@2", NAME = process.env.NAME || "demo", SECS = +(process.env.SECS || 6), STEP = +(process.env.STEP || 0.5), RIG = process.env.RIG ?? "1";
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
  const server = await serve(), port = server.address().port;
  const browser = await playwright.chromium.launch({ args: ["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist"] });
  const page = await browser.newPage({ viewport: { width: 1280, height: 720 } }), errors = [];
  page.on("pageerror", e => errors.push(e.message));
  page.on("console", m => { if (m.type() === "error") errors.push(m.text()); });
  await page.goto(`http://127.0.0.1:${port}/?seed=123&debug&rig=${RIG}&arena=${encodeURIComponent(ARENA)}`);
  await page.waitForFunction(() => window.witch && window.witch.ready, null, { timeout: 300000, polling: 500 });
  await page.keyboard.press("Enter");
  await page.waitForFunction(() => !window.witch.game.clock.paused, null, { timeout: 30000 });
  // let the rig's parts bake (they come from the art workers)
  await page.waitForFunction(() => !window.witch.view.rig || window.witch.view.rig.stats.creatures > 0, null, { timeout: 240000, polling: 500 }).catch(() => {});
  // BRIGHT=k: the picture brightened k times (the night is dark for judging shapes)
  if (process.env.BRIGHT) await page.addStyleTag({ content: `canvas { filter: brightness(${+process.env.BRIGHT}) }` });
  const t0 = await page.evaluate(() => window.witch.game.clock.time), shots = [];
  for (let k = 0; k * STEP <= SECS; k++) {
    await page.waitForFunction(t => window.witch.game.clock.time >= t, t0 + k * STEP, { timeout: 120000, polling: 50 });
    const f = path.join(out, `rig-${NAME}-${k}.png`);
    await page.screenshot({ path: f, ...(process.env.FULL ? {} : { clip: { x: 240, y: 200, width: 800, height: 400 } }) });
    shots.push(f);
  }
  const stats = await page.evaluate(() => ({ rig: window.witch.view.rig && window.witch.view.rig.stats, creatures: window.witch.view.stats.creatures, ms: window.witch.view.ms }));
  console.log(JSON.stringify(stats), errors.length ? errors : "no errors");
  await browser.close(); server.close();
})();
