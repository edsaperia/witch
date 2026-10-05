// Frame strips of the pixel-art styles in play (docs/ART-GUIDE.md section 0): serves the built game (dist/), loads it at
// 1280x720 with ?style= and ?px=, starts, flies along the ground through the nearest wooded area (four frames, about a
// second apart, among trees and creatures), rises and flies over the treetops (two frames), and saves the six frames as one
// strip per combination, plus each frame.
//   npm run build && node tools/art-style/capture.cjs <out dir> [now/3,bold/4,bold/5,ref/4,ref/5] [seed]
const http = require("http");
const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");
let playwright;
try { playwright = require("playwright"); } catch { playwright = require("/opt/node22/lib/node_modules/playwright"); }

const [outDir = "previews/styles", combos = "now/3,bold/4,bold/5,ref/4,ref/5", seed = "123"] = process.argv.slice(2);
const root = path.resolve(process.env.DIST || path.join(__dirname, "../../dist"));
const types = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".json": "application/json", ".png": "image/png", ".wasm": "application/wasm" };
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

(async () => {
  const server = await serve(), port = server.address().port;
  const browser = await playwright.chromium.launch({ args: ["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist"] });
  fs.mkdirSync(outDir, { recursive: true });
  for (const combo of combos.split(",")) {
    const [style, px] = combo.split("/"), tag = `${style}-${px}`, page = await browser.newPage({ viewport: { width: 1280, height: 720 } }), errors = [];
    page.on("pageerror", e => errors.push(e.message));
    try {
      await page.goto(`http://127.0.0.1:${port}/?seed=${seed}&wave=off&style=${style}&px=${px}`);
      await page.waitForFunction(() => window.witch && window.witch.ready, null, { timeout: 400000, polling: 500 });
      await page.keyboard.press("Enter");
      await page.waitForFunction(() => !window.witch.game.clock.paused, null, { timeout: 30000 });
      const wait = s => page.evaluate(s => new Promise(ok => { const t = window.witch.game.clock.time + s; const f = () => window.witch.game.clock.time >= t ? ok() : setTimeout(f, 100); f(); }), s);
      const frames = [];
      const shot = async name => { const f = path.join(outDir, `${tag}-${name}.png`); await page.screenshot({ path: f }); frames.push(f); };
      // along the ground: south-east, among the first trees past the clearing
      await page.keyboard.down("ArrowDown"); await page.keyboard.down("ArrowRight");
      for (let i = 0; i < 4; i++) { await wait(1.6); await page.waitForTimeout(1500); await shot(`ground${i}`); }
      await page.keyboard.up("ArrowDown"); await page.keyboard.up("ArrowRight");
      await page.keyboard.press("Space");
      await page.waitForFunction(() => window.witch.game.witch.mode === "treetop", null, { timeout: 120000, polling: 100 }).catch(() => {});
      await page.keyboard.down("ArrowRight");
      for (let i = 0; i < 2; i++) { await wait(1.5); await page.waitForTimeout(2500); await shot(`treetops${i}`); }
      await page.keyboard.up("ArrowRight");
      // one strip: the four ground frames in a row, the two treetop frames below, each at half size
      const strip = path.join(outDir, `${tag}-strip.png`);
      execFileSync("convert", ["(", ...frames.slice(0, 4), "-resize", "50%", "+append", ")", "(", ...frames.slice(4), "-resize", "50%", "+append", ")", "-background", "#0b0d10", "-append", "-colors", "256", strip]);
      for (const f of frames) execFileSync("convert", [f, "-colors", "256", f]);
      log(tag, "strip", errors.length ? errors : "");
    } catch (e) { console.error(tag, "stopped:", e.message, errors); process.exitCode = 1; }
    await page.close();
  }
  await browser.close(); server.close();
})();
