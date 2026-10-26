// The Terrace's art and the house's floor locked together (Ed, 2026-10-26: "the DJ booth and maybe the whole terrace behaves
// strangely as you walk around the treehouse": the Ent's sprites, the Terrace's art and her decks, stayed where they stand while the
// house's floors slid up the plane with her, render/view/witch.ts houseShiftOf). In each room (app/shot.ts room:<id>), where the Ent's
// deck middle is drawn (its far half's sprite, as the sprites' shader stands it: View.entDeckDrawn) and where the house's floor has the
// Terrace's middle (render/houseRooms.ts plan), each on the screen: the gap between them is the same in every room as on the Terrace
// itself, within TOL pixels, or it fails.
//   npm run build && node tools/house/terrace-lock.cjs   (SEED=123, ROOMS=terrace,dining,parlour,cloakroom,studio,boudoir, TOL=2, DIST=dist)
const http = require("http"), fs = require("fs"), path = require("path");
let playwright; try { playwright = require("playwright"); } catch { playwright = require("/opt/node22/lib/node_modules/playwright"); }
const root = path.resolve(process.env.DIST || path.join(__dirname, "../../dist")), SEED = process.env.SEED || "123", TOL = Number(process.env.TOL || 2);
const ROOMS = (process.env.ROOMS || "terrace,dining,parlour,cloakroom,studio,boudoir").split(",");
const types = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".json": "application/json", ".png": "image/png", ".wasm": "application/wasm", ".woff2": "font/woff2", ".ogg": "audio/ogg" };
const t0 = Date.now(), log = (...a) => console.log(`[${((Date.now() - t0) / 1000).toFixed(0)} s]`, ...a);

(async () => {
  const server = http.createServer((req, res) => { const p = path.join(root, decodeURIComponent(new URL(req.url, "http://x").pathname)), f = fs.existsSync(p) && fs.statSync(p).isDirectory() ? path.join(p, "index.html") : p; if (!f.startsWith(root) || !fs.existsSync(f)) { res.writeHead(404); res.end(); return; } res.writeHead(200, { "Content-Type": types[path.extname(f)] || "application/octet-stream" }); fs.createReadStream(f).pipe(res); });
  await new Promise(r => server.listen(0, "127.0.0.1", r));
  const browser = await playwright.chromium.launch({ args: ["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist"] });
  const rows = [], errors = [];
  try {
    const page = await browser.newPage({ viewport: { width: 960, height: 540 } });
    page.on("pageerror", e => errors.push(e.message));
    await page.goto(`http://127.0.0.1:${server.address().port}/?shot=${encodeURIComponent("room:" + ROOMS[0])}&seed=${SEED}`);
    await page.waitForFunction(() => window.witch && window.witch.ready, null, { timeout: 900000, polling: 500 });
    await page.evaluate(() => { window.witch.manual = true; });
    if (await page.evaluate(() => window.witch.game.clock.paused)) { await page.keyboard.press("Enter"); await page.waitForFunction(() => !window.witch.game.clock.paused, null, { timeout: 60000 }).catch(() => {}); }
    const step = n => page.evaluate(n => { const w = window.witch; for (let i = 0; i < n; i++) w.frame({ moveX: 0, moveZ: 0, toggleMode: false, zoom: 0 }, 1 / 60, true); }, n);
    const settle = async () => { for (let round = 0, calm = 0; calm < 2 && round < 40; round++) { await step(10); if ((await page.evaluate(() => window.witch.view.assets.pending)) === 0) { calm++; continue; } calm = 0; await page.waitForFunction(() => window.witch.view.assets.pending === 0, null, { timeout: 900000, polling: 500 }); } };
    for (const [i, room] of ROOMS.entries()) {
      if (i > 0) { const said = await page.evaluate(s => window.witch.shot(s), "room:" + room); if (!said.ok) throw new Error(said.say); }
      await settle(); await step(30);
      const m = await page.evaluate(() => {
        // (the floor's middle of the Terrace, render/houseRooms.ts plan; the Ent's deck middle as its sprite is drawn; each on the screen)
        const v = window.witch.view, cam = v.camera, o = v.houseRooms.plan.o, e = v.entDeckDrawn(), s = p => { const q = o.clone().set(p.x, p.y, p.z).project(cam); return { x: (q.x * 0.5 + 0.5) * innerWidth, y: (0.5 - q.y * 0.5) * innerHeight }; };
        const floor = s(o), ent = s(e);
        return { floor, ent, shift: v.houseShift, dx: ent.x - floor.x, dy: ent.y - floor.y };
      });
      rows.push({ room, ...m });
      log(`${room.padEnd(10)} the Terrace's art to its floor ${m.dx.toFixed(1)}, ${m.dy.toFixed(1)} px (the floor's middle of the Terrace at ${m.floor.x.toFixed(0)}, ${m.floor.y.toFixed(0)}; slid ${m.shift.toFixed(0)} art px)`);
    }
  } finally { await browser.close(); server.close(); }
  const base = rows[0], bad = rows.filter(r => !Number.isFinite(r.dx) || Math.hypot(r.dx - base.dx, r.dy - base.dy) > TOL);
  if (errors.length) console.log("page errors:", errors.join(" | "));
  for (const r of bad) console.log(`FAIL ${r.room}: the Terrace's art is ${Math.hypot(r.dx - base.dx, r.dy - base.dy).toFixed(1)} px off its floor (as seen from the ${base.room}: ${base.dx.toFixed(1)}, ${base.dy.toFixed(1)})`);
  console.log(bad.length || errors.length ? "the Terrace and the house are NOT locked together" : `the Terrace and the house stay locked together in every room (within ${TOL} px)`);
  process.exit(bad.length || errors.length ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
