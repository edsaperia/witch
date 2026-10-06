// Leashed and happy creatures' sigils from the treetops (render/leash.ts; Ed's playtest, 2026-10-06: "I should be able to see
// sigils of leashed creatures and happy creatures from treetop mode"): the built game (DIST, default dist/) at 1280×720 on a
// seed; a few creatures near home made happy and a few leashed (put there for the picture), then she rises to the treetops.
// Writes ground.png, treetops.png and treetops-off.png (the same with the projection off, to compare). Fails on a page error.
//   npm run build && node tools/smoke/treetop-sigils.cjs [out dir] [seed]
const http = require("http"), fs = require("fs"), path = require("path");
let playwright; try { playwright = require("playwright"); } catch { playwright = require("/opt/node22/lib/node_modules/playwright"); }
const [outDir = "previews/treetop-sigils", seed = "123"] = process.argv.slice(2);
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
    await page.waitForFunction(() => window.witch && window.witch.ready, null, { timeout: 900000, polling: 1000 });
    await page.keyboard.press("Enter");
    await page.waitForFunction(() => window.witch.game.clock.time > 3, null, { timeout: 600000, polling: 500 });
    console.log(await page.evaluate(() => {
      const g = window.witch.game, t = g.clock.time, D = g.map.dancefloor, x = D.x + 40, z = D.z + 30; // (home's open ground)
      g.witch = { ...g.witch, x, z, seated: false, mode: "ground", lift: 0 }; const w = g.witch;
      const near = g.creatures.filter(c => !c.gone && !c.boss && c.level < 3 && !c.leashed).sort((a, b) => Math.hypot(a.x - w.x, a.z - w.z) - Math.hypot(b.x - w.x, b.z - w.z)).slice(0, 10);
      near.forEach((c, i) => {
        const a = i * 2.4, r = 14 + i * 5, px = x + Math.cos(a) * r, pz = z - 10 + Math.sin(a) * r * .6; // (brought round her, for the picture)
        Object.assign(c, { x: px, z: pz, tx: px, tz: pz, homeX: px, homeZ: pz, anchorX: px, anchorZ: pz, rest: 99, cell: g.map.centreCell });
        if (i % 2) { c.leashed = true; c.state = "leashed"; } else { c.state = "happy"; c.happyAt = t - 30; c.enraged = false; }
      });
      g.byArea = null;
      return `${near.length} creatures: ${near.map(c => `${c.species}${c.level}${c.leashed ? "L" : "H"}@${Math.round(Math.hypot(c.x - w.x, c.z - w.z))}m`).join(" ")}`;
    }));
    const step = (o, dt = 0.05) => page.evaluate(([o, dt]) => { const w = window.witch, C = o => ({ moveX: 0, moveZ: 0, toggleMode: false, zoom: 0, ...o }); w.manual = true; w.frame(C(o), dt); }, [o, dt]);
    for (let i = 0; i < 20; i++) await step({});
    await page.screenshot({ path: path.join(outDir, "ground.png") });
    await step({ toggleMode: true });
    for (let i = 0; i < 90; i++) await step({});
    await page.screenshot({ path: path.join(outDir, "treetops.png") });
    console.log(await page.evaluate(() => { const g = window.witch.game, w = g.witch; return `mode ${w.mode} lift ${w.lift.toFixed(2)} at ${Math.round(w.x)},${Math.round(w.z)}; leashed ${g.creatures.filter(c => c.leashed).length}, happy ${g.creatures.filter(c => c.state === "happy").length}`; }));
    await page.evaluate(() => { window.witch.game.tuning.sigilProjection.creatures.max = 0; });
    await step({}); await step({});
    await page.screenshot({ path: path.join(outDir, "treetops-off.png") });
  } finally { await browser.close(); server.close(); }
  if (errors.length) { console.error(errors.join("\n")); process.exit(1); }
  console.log("ok");
})().catch(e => { console.error(e); process.exit(1); });
