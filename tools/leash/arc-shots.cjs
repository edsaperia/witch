// The leash threads' bow (render/leash/stack.ts drawBond; Ed, 2026-10-15: "The arc of leashes should be higher"): the built game
// (DIST, default dist/) at 1280×720 on a seed; on home's open ground she stands with one adult on her stack and another at a
// placed sigil, each held just past the thread's strain point, and the same frame is shot with the old numbers (the tuning's
// bond.threadArcSlack 0.4, threadArcMax 4) and the new (0.8, 8), then at every bond.threadArcSlack given (SLACKS=0.4,0.8,1.2).
//   npm run build && node tools/leash/arc-shots.cjs <out dir> [seed]
const http = require("http"), fs = require("fs"), path = require("path");
let playwright; try { playwright = require("playwright"); } catch { playwright = require("/opt/node22/lib/node_modules/playwright"); }
const [outDir = "previews/leash-arc", seed = "123"] = process.argv.slice(2);
const root = path.resolve(process.env.DIST || path.join(__dirname, "../../dist"));
const types = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".json": "application/json", ".png": "image/png", ".wasm": "application/wasm" };
const slacks = (process.env.SLACKS || "").split(",").map(Number).filter(n => n > 0);
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
      const g = window.witch.game, D = g.map.dancefloor, x = D.x + 40, z = D.z + 30; // (home's open ground)
      g.witch = { ...g.witch, x, z, seated: false, mode: "ground", lift: 0 }; const w = g.witch;
      const near = g.creatures.filter(c => !c.gone && !c.boss && c.level === 2 && !c.leashed).sort((a, b) => Math.hypot(a.x - w.x, a.z - w.z) - Math.hypot(b.x - w.x, b.z - w.z)).slice(0, 2);
      const d = g.tuning.leash.length * 0.92; // (past the thread's strain point, 0.85 of the leash's length)
      // one on her stack, held d metres to her left; one at a sigil placed d metres to her right, held d metres beyond it
      const pin = [{ x: x - d, z: z + 1.5 }, { x: x + d * 2 + 2, z: z + 1.5 }];
      near.forEach((c, i) => { Object.assign(c, { x: pin[i].x, z: pin[i].z, tx: pin[i].x, tz: pin[i].z, leashed: true, state: "leashed", enraged: false, siege: undefined, fight: undefined }); });
      g.leash.stack.push(near[0].id);
      g.leash.placed.push({ id: near[1].id, x: x + d + 2, z: z + 1.5, at: g.clock.time });
      g.byArea = null;
      window.__pin = { ids: near.map(c => c.id), pin };
      return `leashed ${near.map(c => `${c.species}${c.level}`).join(" and ")}, ${d.toFixed(1)} m out`;
    }));
    const step = (o, dt = 0.05) => page.evaluate(([o, dt]) => { const w = window.witch, g = w.game, P = window.__pin, C = o => ({ moveX: 0, moveZ: 0, toggleMode: false, zoom: 0, ...o }); P.ids.forEach((id, i) => { const c = g.creatures[id]; c.x = P.pin[i].x; c.z = P.pin[i].z; c.tx = c.x; c.tz = c.z; c.vx = 0; c.vz = 0; }); w.manual = true; w.frame(C(o), dt); }, [o, dt]);
    const set = (slack, max) => page.evaluate(([s, m]) => { const B = window.witch.game.tuning.bond; B.threadArcSlack = s; B.threadArcMax = m; return `${B.threadArcSlack}/${B.threadArcMax}`; }, [slack, max]);
    const clip = { x: 640 - 400, y: 360 - 300, width: 800, height: 420 };
    for (let i = 0; i < 60; i++) await step({}); // (the stack settles, the camera too)
    const shoot = async (name, slack, max) => {
      console.log(name, await set(slack, max));
      for (let i = 0; i < 4; i++) await step({});
      await page.screenshot({ path: path.join(outDir, `${name}.png`), clip });
    };
    await shoot("before-0.4", 0.4, 4);
    await shoot("after-0.8", 0.8, 8);
    for (const s of slacks) await shoot(`slack-${s}`, s, 8);
    await page.screenshot({ path: path.join(outDir, "screen.png") });
  } finally { await browser.close(); server.close(); }
  if (errors.length) { console.error(errors.join("\n")); process.exit(1); }
  console.log("ok");
})().catch(e => { console.error(e); process.exit(1); });
