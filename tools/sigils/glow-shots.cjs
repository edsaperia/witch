// MOCKUP (not for merging): the ground sigils' glow treatments side by side (?sigilGlow=today|tight|ink|state:
// render/leash/inkMock.ts) in the same busy scene (app/sigilScene.ts), stepped at a fixed 1/60 s so every mode draws the same
// moment: on the ground near (the game's own zoom) and far (two steps out), from the treetops, and a 1:1 crop of the middle.
// The built game (DIST, default dist/) at Ed's window, 1900×1240.
//   npm run build && node tools/sigils/glow-shots.cjs <out dir> [modes]
const http = require("http"), fs = require("fs"), path = require("path");
let playwright; try { playwright = require("playwright"); } catch { playwright = require("/opt/node22/lib/node_modules/playwright"); }
const [outDir = "previews/sigil-glow", modeList = "today,tight,ink,state"] = process.argv.slice(2);
const root = path.resolve(process.env.DIST || path.join(__dirname, "../../dist"));
const types = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".json": "application/json", ".png": "image/png", ".wasm": "application/wasm", ".woff2": "font/woff2", ".ogg": "audio/ogg" };
const W = 1900, H = 1240, LETTER = { today: "a", tight: "b", ink: "c", state: "d" };
(async () => {
  fs.mkdirSync(outDir, { recursive: true });
  const server = http.createServer((req, res) => { const p = path.join(root, decodeURIComponent(new URL(req.url, "http://x").pathname)), f = fs.existsSync(p) && fs.statSync(p).isDirectory() ? path.join(p, "index.html") : p; if (!f.startsWith(root) || !fs.existsSync(f)) { res.writeHead(404); res.end(); return; } res.writeHead(200, { "content-type": types[path.extname(f)] || "application/octet-stream" }); fs.createReadStream(f).pipe(res); });
  await new Promise(r => server.listen(0, "127.0.0.1", r));
  const browser = await playwright.chromium.launch({ args: ["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist"] });
  const errors = [];
  try {
    for (const mode of modeList.split(",")) {
      const page = await browser.newPage({ viewport: { width: W, height: H } });
      page.on("pageerror", e => errors.push(`${mode}: ${e.message}`));
      await page.goto(`http://127.0.0.1:${server.address().port}/?seed=123&creator=0&wave=off&sigilGlow=${mode}`);
      await page.waitForFunction(() => window.witch && window.witch.ready, null, { timeout: 900000, polling: 500 });
      await page.keyboard.press("Enter");
      await page.waitForFunction(() => window.witch.game.clock.time > 2, null, { timeout: 900000, polling: 500 });
      const C = { moveX: 0, moveZ: 0, toggleMode: false, zoom: 0 };
      const step = (n, c = C) => page.evaluate(([n, c]) => { for (let i = 0; i < n; i++) window.witch.frame(i === 0 ? c : { ...c, toggleMode: false, zoom: 0 }, 1 / 60, i === n - 1); }, [n, c]);
      await page.evaluate(() => { window.witch.manual = true; window.witch.sigilScene(); });
      // (the creatures' art bakes in the background: a few rounds of a frame and a wait, the world held still between)
      for (let i = 0; i < 6; i++) { await step(i === 0 ? 90 : 1); await page.waitForTimeout(15000); }
      const L = LETTER[mode] || mode, shot = async (name, clip) => page.screenshot({ path: path.join(outDir, `${L}-${mode}-${name}.png`), clip });
      await shot("ground-near-1900x1240");
      await shot("crop-1to1", { x: (W - 760) / 2, y: (H - 480) / 2, width: 760, height: 480 });
      await step(1, { ...C, zoom: 1 }); await step(1, { ...C, zoom: 1 }); await step(90); await page.waitForTimeout(15000); await step(1);
      await shot("ground-far-1900x1240");
      await step(1, { ...C, zoom: -1 }); await step(1, { ...C, zoom: -1 }); await step(60);
      await step(1, { ...C, toggleMode: true }); await step(150); await page.waitForTimeout(20000); await step(1);
      await shot("treetops-1900x1240");
      console.log(mode, "done");
      await page.close();
    }
  } finally { await browser.close(); server.close(); }
  console.log(JSON.stringify({ errors }));
  if (errors.length) process.exit(1);
})();
