// Her sigils in the night (render/leash.ts: placed, picked and cycled): the built game (DIST, default dist/) at 1280×720 on a
// seed; at home's open ground she invites two wild babies brought there (a debug shortcut; the debug key I), puts the
// bottom sigil down, picks it up again, rises to the treetops and cycles the stack; frames stepped by hand a fixed 1/20 s.
//   npm run build && node tools/smoke/magic-sigils.cjs <out dir> [seed]
const http = require("http"), fs = require("fs"), path = require("path");
let playwright; try { playwright = require("playwright"); } catch { playwright = require("/opt/node22/lib/node_modules/playwright"); }
const [outDir = "previews/magic-sigils", seed = "123"] = process.argv.slice(2);
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
      const g = window.witch.game, D = g.map.dancefloor, x = D.x + 40, z = D.z + 26; // (home's open ground, brought there for the picture)
      const babies = g.creatures.filter(c => !c.gone && !c.boss && c.level === 0 && !c.leashed && c.state !== "happy").sort((a, b) => Math.hypot(a.x - D.x, a.z - D.z) - Math.hypot(b.x - D.x, b.z - D.z)).slice(0, 2);
      babies.forEach((c, i) => Object.assign(c, { cell: g.map.centreCell, homeX: x + 3, homeZ: z - 2 + i * 4, anchorX: x + 3, anchorZ: z - 2 + i * 4, x: x + 3, z: z - 2 + i * 4, tx: x + 3, tz: z - 2 + i * 4, rest: 99 }));
      g.byArea = null;
      g.witch = { ...g.witch, x, z, seated: false, mode: "ground", lift: 0 };
    });
    await page.waitForFunction(t => window.witch.game.clock.time > t, (await page.evaluate(() => window.witch.game.clock.time)) + 3, { timeout: 600000, polling: 500 }); // (the camera settles)
    const step = (o, dt = 0.05) => page.evaluate(([o, dt]) => { const w = window.witch, C = o => ({ moveX: 0, moveZ: 0, toggleMode: false, zoom: 0, ...o }); w.manual = true; w.frame(C(o), dt); }, [o, dt]);
    const shot = (name, clip = { x: 440, y: 160, width: 400, height: 300 }) => page.screenshot({ path: path.join(outDir, `${name}.png`), clip });
    await step({ inviteNearest: true }); await step({}); await step({ inviteNearest: true });
    for (let i = 0; i < 20; i++) await step({}); // (the invites' bursts over)
    await step({ sigil: true }); // put down
    for (let i = 0; i < 10; i++) { await shot(`placed-${i}`); await step({}); }
    await step({ sigil: true }); // picked up
    for (let i = 0; i < 8; i++) { await shot(`picked-${i}`); await step({}); }
    await step({ toggleMode: true });
    for (let i = 0; i < 80; i++) await step({}); // (up in the treetops)
    await step({ sigil: true }); // cycled
    for (let i = 0; i < 8; i++) { await shot(`cycled-${i}`, { x: 560, y: 250, width: 160, height: 140 }); await step({}); }
    console.log(await page.evaluate(() => { const s = window.witch.game.leash; return `stack ${s.stack.length} placed ${s.placed.length} mode ${window.witch.game.witch.mode}`; }));
  } finally { await browser.close(); server.close(); }
  if (errors.length) { console.error(errors.join("\n")); process.exit(1); }
})();
