// Her 💌s in the night (render/leash.ts drawLetters, render/invites.ts): the built game (DIST, default dist/) at 1280×720 on a
// seed; she stands on open ground at home beside a wild baby (it never attacks) brought there (a debug shortcut) and throws 💌s at it,
// then past it onto the ground; frames are saved, stepped by hand a fixed 1/30 s, cropped round them.
//   npm run build && node tools/smoke/magic-letters.cjs <out dir> [seed]
const http = require("http"), fs = require("fs"), path = require("path");
let playwright; try { playwright = require("playwright"); } catch { playwright = require("/opt/node22/lib/node_modules/playwright"); }
const [outDir = "previews/magic-letters", seed = "123"] = process.argv.slice(2);
const root = path.resolve(process.env.DIST || path.join(__dirname, "../../dist"));
const types = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".json": "application/json", ".png": "image/png", ".wasm": "application/wasm" };
(async () => {
  fs.mkdirSync(outDir, { recursive: true });
  const server = http.createServer((req, res) => { const p = path.join(root, decodeURIComponent(new URL(req.url, "http://x").pathname)), f = fs.existsSync(p) && fs.statSync(p).isDirectory() ? path.join(p, "index.html") : p; if (!f.startsWith(root) || !fs.existsSync(f)) { res.writeHead(404); res.end(); return; } res.writeHead(200, { "content-type": types[path.extname(f)] || "application/octet-stream" }); fs.createReadStream(f).pipe(res); });
  await new Promise(r => server.listen(0, "127.0.0.1", r));
  const browser = await playwright.chromium.launch({ args: ["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist"] });
  const errors = [];
  try {
    const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
    page.on("pageerror", e => errors.push(e.message));
    await page.goto(`http://127.0.0.1:${server.address().port}/?seed=${seed}&creator=0&wave=off`);
    await page.waitForFunction(() => window.witch && window.witch.ready, null, { timeout: 600000, polling: 500 });
    await page.keyboard.press("Enter");
    await page.waitForFunction(() => window.witch.game.clock.time > 4, null, { timeout: 600000, polling: 500 });
    await page.evaluate(() => {
      const g = window.witch.game, D = g.map.dancefloor;
      const c = g.creatures.filter(c => !c.gone && !c.boss && c.level === 0 && !c.leashed && c.state !== "happy").sort((a, b) => Math.hypot(a.x - D.x, a.z - D.z) - Math.hypot(b.x - D.x, b.z - D.z))[0];
      const x = D.x + 40, z = D.z + 26; // (home's open ground, brought there for the picture)
      Object.assign(c, { cell: g.map.centreCell, homeX: x, homeZ: z, anchorX: x, anchorZ: z, x, z, tx: x, tz: z, rest: 99 }); g.byArea = null;
      g.witch = { ...g.witch, x: x - 7, z: z + 0.5, seated: false, mode: "ground", lift: 0 };
    });
    await page.waitForFunction(t => window.witch.game.clock.time > t, (await page.evaluate(() => window.witch.game.clock.time)) + 3, { timeout: 600000, polling: 500 }); // (the camera settles)
    for (let i = 0; i < 30; i++) {
      // at the creature for the first 10 frames, then past it onto the ground
      await page.evaluate(i => { const w = window.witch, C = o => ({ moveX: 0, moveZ: 0, toggleMode: false, zoom: 0, ...o }); w.manual = true; w.frame(C({ fire: true, aimX: 1, aimZ: i < 10 ? -0.07 : 0.7 }), 1 / 30); }, i);
      await page.screenshot({ path: path.join(outDir, `letters-${i}.png`), clip: { x: 440, y: 200, width: 440, height: 260 } });
    }
  } finally { await browser.close(); server.close(); }
  if (errors.length) { console.error(errors.join("\n")); process.exit(1); }
})();
