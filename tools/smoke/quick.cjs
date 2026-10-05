// The quick smoke test, run in CI on every push and pull request (a few minutes): serves the built
// game (dist/), loads it in headless Chromium at a laptop size with ?quick=1 (only the art the
// start needs), starts, flies about 5 s on the ground, rises, flies about 5 s in the treetops and
// descends. Fails on any page or console error, a blank picture, or a witch that doesn't move,
// rise or descend. Saves one screenshot (QUICK_OUT, default previews/quick.png). The full smoke
// test (smoke.cjs) still covers pops, floating, big windows and the rest.
// Run `npm run build` first, then `npm run smoke:quick`.
const http = require("http");
const fs = require("fs");
const path = require("path");
let playwright;
try { playwright = require("playwright"); } catch { playwright = require("/opt/node22/lib/node_modules/playwright"); }

const root = path.resolve(__dirname, "../../dist");
const shotPath = path.resolve(process.env.QUICK_OUT || path.join(__dirname, "../../previews/quick.png"));
const types = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".json": "application/json", ".png": "image/png" };
const t0 = Date.now(), log = (...a) => console.log(`[${((Date.now() - t0) / 1000).toFixed(0)} s]`, ...a);

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

async function main() {
  const server = await serve(), port = server.address().port;
  const browser = await playwright.chromium.launch({ args: ["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist"] });
  const errors = [], results = [];
  const check = (ok, what) => { results.push(`${ok ? "ok  " : "FAIL"} ${what}`); log(ok ? "ok  " : "FAIL", what); if (!ok) errors.push(what); };
  const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
  page.on("pageerror", e => errors.push(`page error: ${e.message}`));
  page.on("console", m => { if (m.type() === "error") errors.push(`console error: ${m.text()}`); });
  try {
    await page.goto(`http://127.0.0.1:${port}/?creator=0&seed=123&quick=1&debug`);
    await page.waitForFunction(() => window.witch && window.witch.ready, null, { timeout: 240000, polling: 500 });
    log("start screen ready");
    const state = () => page.evaluate(() => { const g = window.witch.game; return { t: g.clock.time, x: g.witch.x, z: g.witch.z, mode: g.witch.mode, paused: g.clock.paused, trees: window.witch.view.stats.trees }; });
    // Hold a key for `secs` of game time (the software renderer here runs slow, capped frames).
    const hold = async (key, secs) => {
      const from = await state();
      await page.keyboard.down(key);
      await page.waitForFunction(t => window.witch.game.clock.time >= t, from.t + secs, { timeout: 300000, polling: 100 });
      await page.keyboard.up(key);
      return [from, await state()];
    };
    const canvas = await page.$("canvas#game");
    check(!!canvas, "the game's canvas is there");
    await page.keyboard.press("Enter");
    await page.waitForFunction(() => !window.witch.game.clock.paused, null, { timeout: 30000 });
    check(true, "a key press starts the game");
    let [a, b] = await hold("ArrowRight", 5);
    check(b.mode === "ground" && b.x - a.x > 20, `flies on the ground (${(b.x - a.x).toFixed(0)} m east in ${(b.t - a.t).toFixed(1)} s)`);
    await page.keyboard.press("Space");
    await page.waitForFunction(() => window.witch.game.witch.mode === "treetop", null, { timeout: 120000, polling: 100 }).catch(() => {});
    check((await state()).mode === "treetop", "space rises to the treetops");
    [a, b] = await hold("ArrowUp", 5);
    check(a.z - b.z > 40, `flies in the treetops (${(a.z - b.z).toFixed(0)} m north in ${(b.t - a.t).toFixed(1)} s)`);
    check(b.trees > 20, `the forest is drawn (${b.trees} trees)`);
    // Not a blank picture: the canvas holds many distinct colours.
    const colours = await page.evaluate(() => {
      const c = document.querySelector("canvas#game"), w = 64, h = 36, o = document.createElement("canvas");
      o.width = w; o.height = h; const x = o.getContext("2d"); x.drawImage(c, 0, 0, w, h);
      const d = x.getImageData(0, 0, w, h).data, seen = new Set();
      for (let i = 0; i < d.length; i += 4) seen.add((d[i] >> 3) * 1024 + (d[i + 1] >> 3) * 32 + (d[i + 2] >> 3));
      return seen.size;
    });
    check(colours > 40, `the picture isn't blank (${colours} colours)`);
    fs.mkdirSync(path.dirname(shotPath), { recursive: true });
    await page.screenshot({ path: shotPath });
    log(`screenshot ${shotPath}`);
    await page.keyboard.press("Space");
    await page.waitForFunction(() => window.witch.game.witch.mode === "ground", null, { timeout: 120000, polling: 100 }).catch(() => {});
    check((await state()).mode === "ground", "space descends to the ground");
  } catch (e) {
    errors.push(`stopped: ${e.message}`);
    try { fs.mkdirSync(path.dirname(shotPath), { recursive: true }); await page.screenshot({ path: shotPath }); } catch { /* none */ }
  }
  await browser.close();
  server.close();
  console.log(results.join("\n"));
  if (errors.length) { console.error("\nFAILED:\n" + errors.join("\n")); process.exit(1); }
  console.log(`\nquick smoke test passed in ${((Date.now() - t0) / 1000).toFixed(0)} s`);
}

main().catch(e => { console.error(e); process.exit(1); });
