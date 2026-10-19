// A take-off pulled back down (Ed, 2026-10-18: "One adult stops you taking off. Three young do.", by weight; rules/leashWeight.ts
// groundedBy, the "grounded" leash event): the built game (DIST, default dist/) at 1280×720 on a seed; on home's open ground she
// stands with animals following her (their sigils in her stack), presses rise once, and frames are shot across the next 0.6 s
// (her hop yanked back down, the leashes taut and bright). Cases: one adult; three young; and two young, too light (she takes off).
//   npm run build && node tools/leash/grounded-shots.cjs <out dir> [seed]
const http = require("http"), fs = require("fs"), path = require("path");
let playwright; try { playwright = require("playwright"); } catch { playwright = require("/opt/node22/lib/node_modules/playwright"); }
const [outDir = "previews/grounded", seed = "123"] = process.argv.slice(2);
const root = path.resolve(process.env.DIST || path.join(__dirname, "../../dist"));
const types = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".json": "application/json", ".png": "image/png", ".wasm": "application/wasm" };
const CASES = [["adult", [2]], ["three-young", [1, 1, 1]], ["two-young", [1, 1]]].filter(([n]) => !process.env.ONLY || process.env.ONLY.split(",").includes(n));
const AT = [0, 0.1, 0.2, 0.35, 0.6]; // seconds after the press
(async () => {
  fs.mkdirSync(outDir, { recursive: true });
  const server = http.createServer((req, res) => { const p = path.join(root, decodeURIComponent(new URL(req.url, "http://x").pathname)), f = fs.existsSync(p) && fs.statSync(p).isDirectory() ? path.join(p, "index.html") : p; if (!fs.existsSync(f)) { res.writeHead(404); res.end(); return; } res.writeHead(200, { "Content-Type": types[path.extname(f)] || "application/octet-stream" }); fs.createReadStream(f).pipe(res); });
  await new Promise(r => server.listen(0, "127.0.0.1", r));
  const browser = await playwright.chromium.launch({ args: ["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist"] });
  const errors = [];
  try {
    const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
    page.on("pageerror", e => errors.push(e.message));
    await page.goto(`http://127.0.0.1:${server.address().port}/?seed=${seed}&creator=0&wave=off`);
    await page.waitForFunction(() => window.witch && window.witch.ready, null, { timeout: 900000, polling: 1000 });
    await page.keyboard.press("Enter");
    await page.waitForFunction(() => window.witch.game.clock.time > 3, null, { timeout: 600000, polling: 500 });
    const step = (o, dt = 1 / 60) => page.evaluate(([o, dt]) => { const w = window.witch, C = o => ({ moveX: 0, moveZ: 0, toggleMode: false, zoom: 0, ...o }); w.manual = true; w.frame(C(o), dt); }, [o, dt]);
    const clip = { x: 640 - 220, y: 360 - 260, width: 440, height: 360 };
    for (const [name, levels] of CASES) {
      console.log(name, await page.evaluate(levels => {
        const g = window.witch.game, D = g.map.dancefloor, x = D.x + 34, z = D.z + 26;
        for (const id of g.leash.stack) { const c = g.creatures[id]; if (c) { c.leashed = false; c.state = "wild"; c.x = c.tx = x + 400; c.z = c.tz = z; } }
        g.leash.stack = [];
        g.witch = { ...g.witch, x, z, vx: 0, vz: 0, seated: false, mode: "ground", lift: 0 };
        const pool = g.creatures.filter(c => !c.gone && !c.boss && !c.leashed && c.level >= 1 && c.level < 3 && ["wolf", "fox", "badger", "boar", "hare"].includes(c.species));
        const got = levels.map((lv, i) => { const c = pool[i], px = x - 4 + i * 4, pz = z - 5; Object.assign(c, { level: lv, x: px, z: pz, tx: px, tz: pz, leashed: true, state: "leashed", enraged: false, siege: undefined, fight: undefined }); g.leash.stack.push(c.id); return `${c.species}${lv}`; });
        g.byArea = null;
        return got.join(" ");
      }, levels));
      for (let i = 0; i < 4 / (1 / 60); i++) await step({}); // (settled, past any landing's cooldown)
      await step({ toggleMode: true });
      if (process.env.DEBUG) console.log("  after press", await page.evaluate(() => { const g = window.witch.game; return JSON.stringify({ mode: g.witch.mode, ev: g.leashEvents.map(e => e.kind), stack: g.leash.stack.map(id => g.creatures[id].level), groundedAt: (window.witch.view || {}).groundedAt }); }));
      let t = 0;
      for (const at of AT) {
        while (t < at - 1e-6) { await step({}); t += 1 / 60; }
        await page.screenshot({ path: path.join(outDir, `${name}-${String(Math.round(at * 100)).padStart(3, "0")}.png`), clip, timeout: 300000 });
      }
      console.log("  mode after", await page.evaluate(() => window.witch.game.witch.mode));
    }
  } finally { await browser.close(); server.close(); }
  if (errors.length) { console.error(errors.join("\n")); process.exit(1); }
  console.log("ok");
})().catch(e => { console.error(e); process.exit(1); });
