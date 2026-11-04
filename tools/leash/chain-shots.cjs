// Chains lying on the ground in a fight (Ed, 2026-11-03, the chain rework: "Chains lie on the floor at full length so you can see how
// taut they are"; rules/chains.ts, render/leash/chain.ts): the built game (DIST, default dist/) at 1280×720 on a seed; on home's open
// ground she has youths and adults following her at spread distances (some close, some near their chain's 80 m), a wild pack set on
// them, and walks away for a moment so the far chains go taut; frames are shot zoomed out: the close chains unseen, the far ones
// fading in and glowing taut, lying in curves where they were dragged.
//   npm run build && node tools/leash/chain-shots.cjs <out dir> [seed]
const http = require("http"), fs = require("fs"), path = require("path");
let playwright; try { playwright = require("playwright"); } catch { playwright = require("/opt/node22/lib/node_modules/playwright"); }
const [outDir = "previews/chains", seed = "123"] = process.argv.slice(2);
const root = path.resolve(process.env.DIST || path.join(__dirname, "../../dist"));
const types = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".json": "application/json", ".png": "image/png", ".wasm": "application/wasm" };
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
    console.log(await page.evaluate(() => {
      const g = window.witch.game, D = g.map.dancefloor, x = D.x + 40, z = D.z + 30;
      g.witch = { ...g.witch, x, z, vx: 0, vz: 0, seated: false, mode: "ground", lift: 0 };
      const pool = g.creatures.filter(c => !c.gone && !c.boss && !c.leashed && c.level >= 1 && c.level < 3);
      // (followers: two close, three out toward their chains' end, east and south-east of her: across the screen as she walks west)
      const spots = [[-6, 4, 1], [5, 6, 2], [58, 6, 1], [66, -12, 2], [44, 30, 1]];
      const got = spots.map(([dx, dz, lv], i) => { const c = pool[i]; Object.assign(c, { level: lv, x: x + dx, z: z + dz, tx: x + dx, tz: z + dz, leashed: true, state: "leashed", enraged: false, siege: undefined, fight: undefined, rest: 3 }); g.leash.stack.push(c.id); return `${c.species}${lv}`; });
      // (a wild pack set on her, close by)
      const foes = pool.slice(6, 10);
      foes.forEach((c, i) => Object.assign(c, { x: x + 14 + i * 3, z: z - 10, tx: x + 14 + i * 3, tz: z - 10, enraged: true, level: 1 }));
      g.byArea = null;
      return got.join(" ");
    }));
    for (let i = 0; i < 40; i++) await step({ zoom: i % 10 === 0 ? 1 : 0 }); // (zoomed out: four steps)
    for (let i = 0; i < 70; i++) await step({ moveX: -1, moveZ: -0.2 }); // (walking off west: the far chains drawn out taut)
    for (let i = 0; i < 20; i++) await step({});
    await page.screenshot({ path: path.join(outDir, "chains-fight.png"), timeout: 300000 });
    console.log(await page.evaluate(() => { const g = window.witch.game, w = g.witch; return g.leash.stack.map(id => Math.round(Math.hypot(g.creatures[id].x - w.x, g.creatures[id].z - w.z))).join(" m, ") + " m"; }));
  } finally { await browser.close(); server.close(); }
  if (errors.length) { console.error(errors.join("\n")); process.exit(1); }
  console.log("ok");
})().catch(e => { console.error(e); process.exit(1); });
