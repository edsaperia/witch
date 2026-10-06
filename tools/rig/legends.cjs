// Sleeping-legend strips (the rig's lying down and getting up: render/legendSleep.ts, render/rig/rig.ts): the built game
// (dist/, or DIST) in headless Chromium, the witch set down by an area legend (SPECIES, comma-separated: the nearest of
// each; else the nearest NUM legends; the other creatures round it cleared away), the camera zoomed all the way in on the ground; then a row per legend of: asleep,
// a nightmare (restless), woken happy (its drowsy getting up, every STEP seconds), and lulled back to sleep (its settling).
// One picture: previews/legends/<NAME>.png. BRIGHT=k brightens it, MOSS=0 leaves off its moss (the night hides it, as it should), PX=4 sets the art pixel (?px=). Run `npm run build` first.
//   SPECIES=bear,wolf,snake NAME=rig node tools/rig/legends.cjs
const http = require("http"), fs = require("fs"), path = require("path");
let pw; try { pw = require("playwright"); } catch { pw = require("/opt/node22/lib/node_modules/playwright"); }
const root = path.resolve(process.env.DIST || path.resolve(__dirname, "../../dist")), out = path.resolve(__dirname, "../../previews/legends");
const SPECIES = (process.env.SPECIES || "").split(",").filter(Boolean), NUM = +(process.env.NUM || 3), NAME = process.env.NAME || "rig", STEP = +(process.env.STEP || 0.75), CROP = +(process.env.CROP || 300);
const types = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".json": "application/json", ".png": "image/png" };
const serve = () => new Promise(r => { const s = http.createServer((req, res) => { const p = path.join(root, decodeURIComponent(new URL(req.url, "http://x").pathname)), f = fs.existsSync(p) && fs.statSync(p).isDirectory() ? path.join(p, "index.html") : p; if (!f.startsWith(root) || !fs.existsSync(f)) { res.writeHead(404); res.end(); return; } res.writeHead(200, { "content-type": types[path.extname(f)] || "application/octet-stream" }); fs.createReadStream(f).pipe(res); }); s.listen(0, "127.0.0.1", () => r(s)); });
(async () => {
  fs.mkdirSync(out, { recursive: true });
  const server = await serve(), browser = await pw.chromium.launch({ args: ["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist"] });
  const page = await browser.newPage({ viewport: { width: 1280, height: 720 } }), errors = [];
  page.on("pageerror", e => errors.push(e.message));
  await page.goto(`http://127.0.0.1:${server.address().port}/?creator=0&seed=123${process.env.PX ? `&px=${process.env.PX}` : ""}${process.env.QUERY || ""}`);
  await page.waitForFunction(() => window.witch && window.witch.ready, null, { timeout: 300000, polling: 500 });
  await page.keyboard.press("Enter");
  await page.waitForFunction(() => !window.witch.game.clock.paused, null, { timeout: 30000 });
  await page.keyboard.down("ArrowDown"); await page.waitForTimeout(600); await page.keyboard.up("ArrowDown"); // out of her seat
  for (let i = 0; i < 8; i++) await page.keyboard.press("KeyZ"); // all the way in
  await page.addStyleTag({ content: "body * { visibility: hidden !important } canvas { visibility: visible !important }" }); // the picture alone, no HUD
  if (process.env.BRIGHT) await page.addStyleTag({ content: `canvas { filter: brightness(${+process.env.BRIGHT}) }` });
  const ids = await page.evaluate(({ SPECIES, NUM }) => { // the legends: the nearest of each species asked for, else the nearest few
    const g = window.witch.game, w = g.witch, ls = (g.legendIds || []).map(i => g.creatures[i]).filter(c => c && !c.gone && c.legendState === "asleep");
    ls.sort((a, b) => Math.hypot(a.x - w.x, a.z - w.z) - Math.hypot(b.x - w.x, b.z - w.z));
    return SPECIES.length ? SPECIES.map(s => ls.find(c => c.species === s)?.id).filter(i => i !== undefined) : ls.slice(0, NUM).map(c => c.id);
  }, { SPECIES, NUM });
  console.log("legends", ids.join(","));
  if (process.env.MOSS) await page.evaluate(m => { window.witch.game.tuning.wildLegends.moss = m; }, +process.env.MOSS); // (MOSS=0: its own colours, to judge the shapes)
  const rows = [];
  const set = (id, what) => page.evaluate(({ id, what }) => { // its state, as the rules would set it (rules/legends.ts)
    const g = window.witch.game, c = g.creatures[id], t = g.clock.time;
    if (what === "restless") Object.assign(c, { legendState: "restless", stateAt: t, restlessness: 0.9 });
    if (what === "happy") Object.assign(c, { legendState: "happy", stateAt: t, enraged: false, state: undefined, restlessness: 0, questOpen: false, buffed: true });
    if (what === "asleep") Object.assign(c, { legendState: "asleep", stateAt: t, restlessness: 0, buffed: false });
  }, { id, what });
  const shoot = async (id, frames, label) => {
    const at = await page.evaluate(id => { const g = window.witch.game, v = window.witch.view, c = g.creatures[id], p = v.camera.position.clone().set(c.x, window.witch.groundHeight(c.x, c.z) + 1.5, c.z).project(v.camera); return { x: (p.x + 1) / 2 * innerWidth, y: (1 - p.y) / 2 * innerHeight }; }, id);
    const x = Math.max(0, Math.min(1280 - CROP, Math.round(at.x - CROP / 2))), y = Math.max(0, Math.min(720 - CROP, Math.round(at.y - CROP / 2)));
    frames.push({ label, png: (await page.screenshot({ clip: { x, y, width: CROP, height: CROP } })).toString("base64") });
  };
  const wait = async s => { const t = await page.evaluate(() => window.witch.game.clock.time) + s; await page.waitForFunction(t => window.witch.game.clock.time >= t, t, { timeout: 120000, polling: 16 }); };
  for (const id of ids) {
    await page.evaluate(id => { // the witch set down beside it, on the ground, the legend held still and turned side on
      const g = window.witch.game, c = g.creatures[id], w = g.witch;
      for (const o of g.creatures) if (o && !o.boss && !o.leashed && Math.hypot(o.x - c.x, o.z - c.z) < 90) o.gone = true; // (the area's others cleared away, so nothing picks a fight with her)
      Object.assign(w, { x: c.x - 1, z: c.z + 7, seated: false, mode: "ground", lift: 0, vx: 0, vz: 0 }); c.facing = 1; c.away = false;
    }, id);
    await wait(3); // (the camera eases over)
    await page.waitForFunction(id => { const c = window.witch.game.creatures[id]; return !window.witch.view.rig || !!window.witch.view.assets.rigArt(c.species, c.level); }, id, { timeout: 180000, polling: 500 }).catch(() => console.log("no rig parts (yet) for", id)); // its rig parts baked (four-legged and serpents)
    await wait(1);
    const frames = [];
    if (process.env.FULL) fs.writeFileSync(path.join(out, `${NAME}-full-${id}.png`), await page.screenshot());
    await shoot(id, frames, "asleep"); await wait(2.2); await shoot(id, frames, "breathing");
    await set(id, "restless"); for (let k = 0; k < 3; k++) { await wait(0.35); await shoot(id, frames, "nightmare"); }
    await set(id, "happy"); await shoot(id, frames, "woken 0s");
    for (let t = STEP; t <= 6.01; t += STEP) { await wait(STEP); await shoot(id, frames, `${t.toFixed(1)}s`); }
    await set(id, "asleep"); for (let t = 1; t <= 4; t += 1) { await wait(1); await shoot(id, frames, `lulled ${t}s`); }
    const sp = await page.evaluate(id => window.witch.game.creatures[id].species, id);
    console.log("shot", sp, frames.length);
    rows.push({ label: `${sp} legend`, frames });
  }
  const url = await page.evaluate(async ({ rows, CROP }) => {
    const load = s => new Promise(r => { const i = new Image(); i.onload = () => r(i); i.src = "data:image/png;base64," + s; });
    const n = Math.max(1, ...rows.map(r => r.frames.length)), H = CROP + 30, c = document.createElement("canvas"); c.width = n * CROP; c.height = rows.length * H;
    const g = c.getContext("2d"); g.fillStyle = "#111"; g.fillRect(0, 0, c.width, c.height); g.font = "13px monospace";
    for (let j = 0; j < rows.length; j++) {
      g.fillStyle = "#fff"; g.fillText(rows[j].label, 4, j * H + 13);
      const ims = await Promise.all(rows[j].frames.map(f => load(f.png)));
      ims.forEach((im, i) => { g.drawImage(im, i * CROP, j * H + 30); g.fillStyle = "#ccc"; g.fillText(rows[j].frames[i].label, i * CROP + 4, j * H + 27); });
    }
    return c.toDataURL("image/png");
  }, { rows, CROP });
  const file = path.join(out, `${NAME}.png`);
  fs.writeFileSync(file, Buffer.from(url.split(",")[1], "base64"));
  console.log("wrote", file, rows.map(r => r.label).join(", "), errors.length ? errors.slice(0, 5) : "no errors");
  await browser.close(); server.close();
})();
