// Walking from a room onto the Terrace and back, measured frame by frame (Ed, 2026-11-12: "there is a camera transition (I think) when
// going onto the terrace of the treehouse; this isn't required anymore since the treehouse is treated as one area"). From the middle of
// FROM (app/shot.ts room:<id>) she walks to the Terrace's middle and back; each frame it writes her place, the camera (place, aim, field
// of view), the rules' camera (zoom, house, distance), the house's slide (View.houseShift, houseCam) and the mood's area, and prints
// the largest frame-to-frame jump of each against her own step, so a transition at the Terrace's edge shows as a jump there.
//   npm run build && node tools/house/terrace-walk.cjs   (SEED=123, FROM=parlour, LINK= extra link switches e.g. "&terracecut=old",
//   OUT=a JSON file for the rows, SHOTS=a folder for a picture every EVERY=3 frames, W=480 H=270 the picture's size, DIST=dist)
const http = require("http"), fs = require("fs"), path = require("path");
let playwright; try { playwright = require("playwright"); } catch { playwright = require("/opt/node22/lib/node_modules/playwright"); }
const root = path.resolve(process.env.DIST || path.join(__dirname, "../../dist")), SEED = process.env.SEED || "123", FROM = process.env.FROM || "parlour", LINK = process.env.LINK || "";
const types = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".json": "application/json", ".png": "image/png", ".wasm": "application/wasm", ".woff2": "font/woff2", ".ogg": "audio/ogg" };

(async () => {
  const server = http.createServer((req, res) => { const p = path.join(root, decodeURIComponent(new URL(req.url, "http://x").pathname)), f = fs.existsSync(p) && fs.statSync(p).isDirectory() ? path.join(p, "index.html") : p; if (!f.startsWith(root) || !fs.existsSync(f)) { res.writeHead(404); res.end(); return; } res.writeHead(200, { "Content-Type": types[path.extname(f)] || "application/octet-stream" }); fs.createReadStream(f).pipe(res); });
  await new Promise(r => server.listen(0, "127.0.0.1", r));
  const browser = await playwright.chromium.launch({ args: ["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist"] });
  let rows = [];
  try {
    const page = await browser.newPage({ viewport: { width: Number(process.env.W || 480), height: Number(process.env.H || 270) } });
    page.on("pageerror", e => console.log("page error:", e.message));
    await page.goto(`http://127.0.0.1:${server.address().port}/?shot=${encodeURIComponent("room:" + FROM)}&seed=${SEED}${LINK}`);
    await page.waitForFunction(() => window.witch && window.witch.ready, null, { timeout: 900000, polling: 500 });
    await page.evaluate(() => { window.witch.manual = true; });
    if (await page.evaluate(() => window.witch.game.clock.paused)) { await page.keyboard.press("Enter"); await page.waitForFunction(() => !window.witch.game.clock.paused, null, { timeout: 60000 }).catch(() => {}); }
    const step = n => page.evaluate(n => { const w = window.witch; for (let i = 0; i < n; i++) w.frame({ moveX: 0, moveZ: 0, toggleMode: false, zoom: 0 }, 1 / 60, true); }, n);
    for (let i = 0; i < 20; i++) { await step(10); if ((await page.evaluate(() => window.witch.view.assets.pending)) === 0) break; await page.waitForFunction(() => window.witch.view.assets.pending === 0, null, { timeout: 900000, polling: 500 }); }
    await step(120); console.log("loaded; walking");
    // (the walk a few frames at a time, so SHOTS can take the picture between: out to the Terrace's middle, a second's rest, back)
    await page.evaluate(() => {
      const W = window.witch, g = W.game, v = W.view, c = g.map.treehouse, start = { x: g.witch.x, z: g.witch.z }, legs = [{ to: { x: c.x, z: c.z }, leg: "out" }, { to: start, leg: "back" }];
      const S = window.__walk = { rows: [], li: 0, rest: -1, i: 0, done: false };
      const rec = leg => { const cam = v.camera, d = new cam.position.constructor(); cam.getWorldDirection(d); S.rows.push({ leg, x: g.witch.x, z: g.witch.z, fromMiddle: Math.hypot(g.witch.x - c.x, g.witch.z - c.z), cam: [cam.position.x, cam.position.y, cam.position.z], dir: [d.x, d.y, d.z], fov: cam.fov, zoom: g.camera.zoom, house: g.camera.house ?? 0, shift: v.houseShift, houseCam: [v.houseCam.x, v.houseCam.y, v.houseCam.z], mood: v.moodArea, perch: !!g.witch.perch }); };
      S.step = n => { for (let k = 0; k < n && !S.done; k++) { const L = legs[S.li]; let mx = 0, mz = 0; if (S.rest < 0) { const dx = L.to.x - g.witch.x, dz = L.to.z - g.witch.z, d = Math.hypot(dx, dz); if (d < 0.6 || ++S.i > 1200) S.rest = 0; else { mx = dx / d; mz = dz / d; } } W.frame({ moveX: mx, moveZ: mz, toggleMode: false, zoom: 0 }, 1 / 60, true); rec(S.rest < 0 ? L.leg : L.leg + "-rest"); if (S.rest >= 0 && ++S.rest >= 60) { S.li++; S.rest = -1; S.i = 0; if (S.li >= legs.length) S.done = true; } } return S.done; };
    });
    const SHOTS = process.env.SHOTS, EVERY = Number(process.env.EVERY || 3);
    if (SHOTS) fs.mkdirSync(SHOTS, { recursive: true });
    for (let n = 0; ; n++) { const done = await page.evaluate(k => window.__walk.step(k), SHOTS ? EVERY : 600); if (SHOTS) await page.screenshot({ path: path.join(SHOTS, `f${String(n).padStart(4, "0")}.png`), timeout: 0 }); if (done) break; }
    rows = await page.evaluate(() => window.__walk.rows);
  } finally { await browser.close(); server.close(); }
  if (process.env.OUT) fs.writeFileSync(process.env.OUT, JSON.stringify(rows));
  // The camera's own move each frame, less her own step (it follows her: that part is no transition), and the eased values' jumps.
  const worst = {};
  const note = (k, val, r) => { if (!worst[k] || val > worst[k].val) worst[k] = { val, at: r.fromMiddle.toFixed(1), leg: r.leg }; };
  for (let i = 1; i < rows.length; i++) {
    const a = rows[i - 1], b = rows[i];
    const herStep = Math.hypot(b.x - a.x, b.z - a.z);
    note("camera's move less her step (m)", Math.abs(Math.hypot(b.cam[0] - a.cam[0], b.cam[1] - a.cam[1], b.cam[2] - a.cam[2]) - herStep), b);
    note("camera height (m)", Math.abs(b.cam[1] - a.cam[1]), b);
    note("camera tilt (deg)", Math.acos(Math.min(1, a.dir[0] * b.dir[0] + a.dir[1] * b.dir[1] + a.dir[2] * b.dir[2])) * 180 / Math.PI, b);
    note("field of view (deg)", Math.abs(b.fov - a.fov), b);
    note("zoom", Math.abs(b.zoom - a.zoom), b);
    note("camera.house", Math.abs(b.house - a.house), b);
    note("houseShift (art px)", Math.abs(b.shift - a.shift), b);
    note("houseCam (m)", Math.hypot(b.houseCam[0] - a.houseCam[0], b.houseCam[1] - a.houseCam[1], b.houseCam[2] - a.houseCam[2]), b);
    if (a.mood !== b.mood) console.log(`mood ${a.mood} -> ${b.mood} at ${b.fromMiddle.toFixed(1)} m from the middle`);
  }
  console.log(`${rows.length} frames from the ${FROM} to the Terrace's middle and back${LINK ? ` (${LINK})` : ""}; the largest frame-to-frame change of each:`);
  for (const [k, w] of Object.entries(worst)) console.log(`  ${k.padEnd(34)} ${w.val.toFixed(4)}  (${w.at} m from the middle, ${w.leg})`);
  const s = rows.map(r => r.shift), hc = rows.map(r => r.houseCam[1]);
  console.log(`  houseShift ran ${Math.min(...s).toFixed(1)} to ${Math.max(...s).toFixed(1)} art px; houseCam.y ${Math.min(...hc).toFixed(2)} to ${Math.max(...hc).toFixed(2)} m; her distance from the middle ${Math.min(...rows.map(r => r.fromMiddle)).toFixed(1)} to ${Math.max(...rows.map(r => r.fromMiddle)).toFixed(1)} m`);
})().catch(e => { console.error(e); process.exit(1); });
