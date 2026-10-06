// A legendary sigil in play (art/sigils.js `legendary`, render/leash.ts `legendarySigil`; Ed, 2026-10-06): the built game (DIST,
// default dist/) at 1280×720 on a seed; at home's open ground she invites two wild babies brought there, a legend joins her stack
// (put there for the picture: a party legend's rules aren't in yet), she puts its sigil down, then rises to the treetops.
//   npm run build && node tools/smoke/legendary-sigil.cjs <out dir> [seed] [species]
const http = require("http"), fs = require("fs"), path = require("path");
let playwright; try { playwright = require("playwright"); } catch { playwright = require("/opt/node22/lib/node_modules/playwright"); }
const [outDir = "previews/sigils/legendary-ingame", seed = "123", species = "fox"] = process.argv.slice(2);
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
    const shot = (name, clip = { x: 340, y: 110, width: 600, height: 420 }) => page.screenshot({ path: path.join(outDir, `${name}.png`), clip });
    await step({ inviteNearest: true }); await step({}); await step({ inviteNearest: true });
    for (let i = 0; i < 20; i++) await step({});
    console.log(await page.evaluate(sp => {
      const g = window.witch.game, w = g.witch, c = g.creatures.find(c => !c.gone && c.level === 3 && (!sp || c.species === sp));
      if (!c || sp === "none") return "no legend";
      Object.assign(c, { x: w.x - 14, z: w.z - 10, tx: w.x - 14, tz: w.z - 10, homeX: w.x - 14, homeZ: w.z - 10, leashed: true, asleep: false, state: "leashed", rest: 99 });
      g.leash.stack.push(c.id); g.byArea = null;
      return `legend ${c.species} joined; stack ${g.leash.stack.length}`;
    }, species));
    for (let i = 0; i < 4; i++) { await step({ zoom: -1 }); await step({}); } // (in close)
    for (let i = 0; i < 30; i++) await step({});
    await page.screenshot({ path: path.join(outDir, "stack-full.png") });
    console.log("t before", await page.evaluate(() => window.witch.game.clock.time));
    await step({ sigil: true }); // put down

    await page.evaluate(() => { const g = window.witch.game, p = g.leash.placed[0], c = g.creatures[p.id]; Object.assign(c, { x: p.x - 30, z: p.z - 20, tx: p.x - 30, tz: p.z - 20 }); }); // (its legend off it, for the picture)
    for (let i = 0; i < 30; i++) await step({});
    console.log("t after", await page.evaluate(() => [window.witch.game.clock.time, window.witch.game.clock.paused]));
    await page.screenshot({ path: path.join(outDir, "placed-full.png") });
    console.log(await page.evaluate(() => { const g = window.witch.game; return JSON.stringify({ placed: g.leash.placed.map(p => ({ ...p, species: g.creatures[p.id].species, level: g.creatures[p.id].level })), witch: [g.witch.x, g.witch.z], stack: g.leash.stack.map(i => g.creatures[i].species + g.creatures[i].level) }); }));
    await step({ moveX: 1 }); for (let i = 0; i < 20; i++) await step({ moveX: 1 });
    await step({ toggleMode: true });
    for (let i = 0; i < 80; i++) await step({});
    await page.screenshot({ path: path.join(outDir, "treetops.png") });
    console.log(await page.evaluate(() => { const s = window.witch.game.leash; return `stack ${s.stack.length} placed ${s.placed.length} mode ${window.witch.game.witch.mode}`; }));
  } finally { await browser.close(); server.close(); }
  if (errors.length) { console.error(errors.join("\n")); process.exit(1); }
})();
