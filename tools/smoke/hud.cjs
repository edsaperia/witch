// The HUD's top and edges (Ed, 2026-10-06: the wave pointer toward the ley line's pulse with 🎶, the game clock top centre,
// no dancefloor cue, no wave bar): the built game (DIST, default dist/) at 1600×900 on a seed, out of the boot with the next
// wave half way to coming, the witch a little way from home; the whole screen, then the same with the decisions panel open
// (F2) and the debug overlay (~) to check nothing at the top collides. BOOT=1 leaves home booting (no wave pointer yet) and waiting for the party spell (its prompt). Writes <out dir>/hud.png, hud-decide.png, hud-debug.png.
//   npm run build && node tools/smoke/hud.cjs [out dir] [seed]
const http = require("http"), fs = require("fs"), path = require("path");
let playwright; try { playwright = require("playwright"); } catch { playwright = require("/opt/node22/lib/node_modules/playwright"); }
const [outDir = "previews/hud", seed = "123"] = process.argv.slice(2);
const root = path.resolve(process.env.DIST || path.join(__dirname, "../../dist"));
const types = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".json": "application/json", ".png": "image/png", ".wasm": "application/wasm" };
(async () => {
  fs.mkdirSync(outDir, { recursive: true });
  const server = http.createServer((req, res) => { const p = path.join(root, decodeURIComponent(new URL(req.url, "http://x").pathname)), f = fs.existsSync(p) && fs.statSync(p).isDirectory() ? path.join(p, "index.html") : p; if (!f.startsWith(root) || !fs.existsSync(f)) { res.writeHead(404); res.end(); return; } res.writeHead(200, { "content-type": types[path.extname(f)] || "application/octet-stream" }); fs.createReadStream(f).pipe(res); });
  await new Promise(r => server.listen(0, "127.0.0.1", r));
  const browser = await playwright.chromium.launch({ args: ["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist"] });
  const errors = [];
  try {
    const page = await browser.newPage({ viewport: { width: 1600, height: 900 } });
    page.on("pageerror", e => errors.push(e.message));
    await page.goto(`http://127.0.0.1:${server.address().port}/?seed=${seed}&creator=0`);
    await page.waitForFunction(() => window.witch && window.witch.ready, null, { timeout: 600000, polling: 500 });
    await page.keyboard.press("Enter");
    await page.waitForFunction(() => window.witch.game.clock.time > 2, null, { timeout: 600000, polling: 500 });
    // out of the boot, the next wave half way; the witch away from home, facing the way the line goes
    await page.evaluate(boot => {
      const g = window.witch.game, t = g.clock.time, I = g.tuning.party.interval, D = g.map.dancefloor;
      if (!boot) { g.party.bootUntil = t; g.party.nextAt = t + I * 0.5; } // (BOOT=1: left booting, the wave pointer hidden)
      if (boot) g.party.spellAt = null; // (and waiting for the party spell: the clock at 00:00 and the prompt to cast it)
      g.witch = { ...g.witch, x: D.x + 60, z: D.z + 40, seated: false, mode: "ground", lift: 0 };
    }, !!process.env.BOOT);
    const wait = async s => page.waitForFunction(t => window.witch.game.clock.time > t, (await page.evaluate(() => window.witch.game.clock.time)) + s, { timeout: 600000, polling: 500 });
    await wait(6);
    const info = await page.evaluate(() => ({ time: Math.round(window.witch.game.clock.time), clock: document.querySelector("#clock")?.textContent ?? null, wave: !!document.querySelector("#wave") }));
    console.log(JSON.stringify(info));
    await page.screenshot({ path: path.join(outDir, "hud.png") });
    await page.keyboard.press("F2"); await page.waitForTimeout(800);
    await page.screenshot({ path: path.join(outDir, "hud-decide.png") });
    await page.keyboard.press("F2"); await page.keyboard.press("Backquote"); await page.waitForTimeout(800);
    await page.screenshot({ path: path.join(outDir, "hud-debug.png") });
  } finally { await browser.close(); server.close(); }
  if (errors.length) { console.error(errors.join("\n")); process.exit(1); }
})().catch(e => { console.error(e); process.exit(1); });
