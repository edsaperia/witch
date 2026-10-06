// Attack strips (Ed, 2026-10-06: "make creature attack visuals better"): the built game (dist/, or DIST) in headless
// Chromium, an arena (ARENAS, comma-separated presets or specs: src/rules/arena.ts), the camera zoomed all the way in on
// the ground; when a creature starts winding up a blow, FRAMES frames every STEP seconds of game time, cropped round it and
// what it's after, into one row per arena: previews/attacks/<NAME>.png. BRIGHT=k brightens the picture (the night is dark
// for judging shapes); TREETOP=1 flies up to the treetops first; PX=4 sets the art pixel (?px=). Run `npm run build` first.
//   ARENAS=strike,charge,swipe NAME=after node tools/attacks/strip.cjs
const http = require("http"), fs = require("fs"), path = require("path");
let pw; try { pw = require("playwright"); } catch { pw = require("/opt/node22/lib/node_modules/playwright"); }
const root = path.resolve(process.env.DIST || path.resolve(__dirname, "../../dist")), out = path.resolve(__dirname, "../../previews/attacks");
const ARENAS = (process.env.ARENAS || "strike,charge").split(","), NAME = process.env.NAME || "strip", FRAMES = +(process.env.FRAMES || 14), STEP = +(process.env.STEP || 0.07), CROP = +(process.env.CROP || 260);
const types = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".json": "application/json", ".png": "image/png" };
const serve = () => new Promise(r => { const s = http.createServer((req, res) => { const p = path.join(root, decodeURIComponent(new URL(req.url, "http://x").pathname)), f = fs.existsSync(p) && fs.statSync(p).isDirectory() ? path.join(p, "index.html") : p; if (!f.startsWith(root) || !fs.existsSync(f)) { res.writeHead(404); res.end(); return; } res.writeHead(200, { "content-type": types[path.extname(f)] || "application/octet-stream" }); fs.createReadStream(f).pipe(res); }); s.listen(0, "127.0.0.1", () => r(s)); });
(async () => {
  fs.mkdirSync(out, { recursive: true });
  const server = await serve(), browser = await pw.chromium.launch({ args: ["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist"] });
  const rows = [], errors = [];
  for (const arena of ARENAS) {
    const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
    page.on("pageerror", e => errors.push(e.message));
    await page.goto(`http://127.0.0.1:${server.address().port}/?creator=0&seed=123&rig=1${process.env.PX ? `&px=${process.env.PX}` : ""}&arena=${encodeURIComponent(arena)}`);
    await page.waitForFunction(() => window.witch && window.witch.ready, null, { timeout: 300000, polling: 500 });
    await page.keyboard.press("Enter");
    await page.waitForFunction(() => !window.witch.game.clock.paused, null, { timeout: 30000 });
    if (process.env.TREETOP) { await page.keyboard.press("KeyQ"); await page.waitForTimeout(3000); }
    for (let i = 0; i < 8; i++) await page.keyboard.press("KeyZ"); // all the way in
    await page.waitForTimeout(2500); // (the zoom eases in)
    await page.addStyleTag({ content: "body * { visibility: hidden !important } canvas { visibility: visible !important }" }); // the picture alone, no HUD
    if (process.env.BRIGHT) await page.addStyleTag({ content: `canvas { filter: brightness(${+process.env.BRIGHT}) }` });
    await page.waitForFunction(() => !window.witch.view.rig || window.witch.view.rig.stats.creatures > 0, null, { timeout: 120000, polling: 500 }).catch(() => {});
    // wait for a blow to start near the witch (not one already under way)
    const id = await page.waitForFunction(() => {
      const g = window.witch.game, w = g.witch, t = g.clock.time;
      let best = null, bd = 30;
      for (const c of g.creatures) { const f = c && c.fight; if (!f || !(f.windupUntil > t + 0.25) || !f.target) continue; const d = Math.hypot(c.x - w.x, c.z - w.z); if (d < bd) { bd = d; best = c.id; } }
      return best;
    }, null, { timeout: 120000, polling: 30 }).then(h => h.jsonValue()).catch(() => null);
    if (id === null) { rows.push({ label: `${arena}: no blow seen`, frames: [] }); await page.close(); continue; }
    const t0 = await page.evaluate(() => window.witch.game.clock.time), frames = []; let at = null;
    for (let k = 0; k < FRAMES; k++) {
      await page.waitForFunction(t => window.witch.game.clock.time >= t, t0 + k * STEP, { timeout: 60000, polling: 16 });
      at ??= await page.evaluate(id => { // (fixed at the wind-up's start, so its moves show against the ground) // the crop's centre: between it and what it's after, on screen
        const g = window.witch.game, v = window.witch.view, c = g.creatures[id], T = c.fight && c.fight.target, o = T && T.kind === "creature" ? g.creatures[T.id] : T && T.kind === "witch" ? g.witch : null;
        const x = o ? (c.x + o.x) / 2 : c.x, z = o ? (c.z + o.z) / 2 : c.z, p = v.camera.position.clone().set(x, window.witch.groundHeight(x, z) + 0.8, z).project(v.camera);
        return { x: (p.x + 1) / 2 * innerWidth, y: (1 - p.y) / 2 * innerHeight };
      }, id);
      const x = Math.max(0, Math.min(1280 - CROP, Math.round(at.x - CROP / 2))), y = Math.max(0, Math.min(720 - CROP, Math.round(at.y - CROP / 2)));
      frames.push((await page.screenshot({ clip: { x, y, width: CROP, height: CROP } })).toString("base64"));
    }
    const sp = await page.evaluate(id => { const c = window.witch.game.creatures[id]; return `${c.species} ${["baby", "young", "adult", "legend"][c.level]}`; }, id);
    rows.push({ label: `${arena}: ${sp}, every ${STEP}s from its wind-up`, frames });
    await page.close();
  }
  // one picture: a row per arena
  const page = await browser.newPage();
  const url = await page.evaluate(async ({ rows, CROP }) => {
    const load = s => new Promise(r => { const i = new Image(); i.onload = () => r(i); i.src = "data:image/png;base64," + s; });
    const n = Math.max(1, ...rows.map(r => r.frames.length)), c = document.createElement("canvas"); c.width = n * CROP; c.height = rows.length * (CROP + 18);
    const g = c.getContext("2d"); g.fillStyle = "#111"; g.fillRect(0, 0, c.width, c.height); g.font = "13px monospace";
    for (let j = 0; j < rows.length; j++) { g.fillStyle = "#fff"; g.fillText(rows[j].label, 4, j * (CROP + 18) + 13); const ims = await Promise.all(rows[j].frames.map(load)); ims.forEach((im, i) => g.drawImage(im, i * CROP, j * (CROP + 18) + 18)); }
    return c.toDataURL("image/png");
  }, { rows, CROP });
  const file = path.join(out, `${NAME}.png`);
  fs.writeFileSync(file, Buffer.from(url.split(",")[1], "base64"));
  console.log("wrote", file, errors.length ? errors.slice(0, 5) : "no errors");
  await browser.close(); server.close();
})();
