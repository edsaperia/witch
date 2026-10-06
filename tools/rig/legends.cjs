// Sleeping-legend strips (the rig's lying down and getting up: render/legendSleep.ts, render/rig/rig.ts): the built game
// (dist/, or DIST) in headless Chromium: for each of SPECIES (comma-separated), its legend in the debug arena (?arena=, on
// the open ground below the dancefloor) made a sleeping area legend, the camera ZOOM steps in (0; 8 is all the way; below 0, out), the crop LIFT metres above its feet; a row of: asleep,
// a nightmare (restless), woken happy (its drowsy getting up, every STEP seconds), and lulled back to sleep (its settling).
// One picture: previews/legends/<NAME>.png. BRIGHT=k brightens it, MOSS=0 leaves off its moss (the night hides it, as it should), PX=4 sets the art pixel (?px=). Run `npm run build` first.
//   SPECIES=bear,wolf,snake NAME=rig node tools/rig/legends.cjs
const http = require("http"), fs = require("fs"), path = require("path");
let pw; try { pw = require("playwright"); } catch { pw = require("/opt/node22/lib/node_modules/playwright"); }
const root = path.resolve(process.env.DIST || path.resolve(__dirname, "../../dist")), out = path.resolve(__dirname, "../../previews/legends");
const SPECIES = (process.env.SPECIES || "bear,wolf,snake").split(","), NAME = process.env.NAME || "rig", STEP = +(process.env.STEP || 0.75), CROP = +(process.env.CROP || 640), ZOOM = +(process.env.ZOOM ?? 0), LIFT = +(process.env.LIFT ?? 4);
const types = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".json": "application/json", ".png": "image/png" };
const serve = () => new Promise(r => { const s = http.createServer((req, res) => { const p = path.join(root, decodeURIComponent(new URL(req.url, "http://x").pathname)), f = fs.existsSync(p) && fs.statSync(p).isDirectory() ? path.join(p, "index.html") : p; if (!f.startsWith(root) || !fs.existsSync(f)) { res.writeHead(404); res.end(); return; } res.writeHead(200, { "content-type": types[path.extname(f)] || "application/octet-stream" }); fs.createReadStream(f).pipe(res); }); s.listen(0, "127.0.0.1", () => r(s)); });
(async () => {
  fs.mkdirSync(out, { recursive: true });
  const server = await serve(), browser = await pw.chromium.launch({ args: ["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist"] });
  const rows = [], errors = [];
  let page;
  for (const sp of SPECIES) {
    page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
    page.on("pageerror", e => errors.push(e.message));
    await page.goto(`http://127.0.0.1:${server.address().port}/?creator=0&seed=123&arena=${sp}@3${process.env.PX ? `&px=${process.env.PX}` : ""}${process.env.QUERY || ""}`);
    await page.waitForFunction(() => window.witch && window.witch.ready, null, { timeout: 300000, polling: 500 });
    await page.keyboard.press("Enter");
    await page.waitForFunction(() => !window.witch.game.clock.paused, null, { timeout: 30000 });
    for (let i = 0; i < Math.abs(ZOOM); i++) await page.keyboard.press(ZOOM > 0 ? "KeyZ" : "KeyX"); // ZOOM steps in (or out, below 0)
    await page.addStyleTag({ content: "body * { visibility: hidden !important } canvas { visibility: visible !important }" }); // the picture alone, no HUD
    if (process.env.BRIGHT) await page.addStyleTag({ content: `canvas { filter: brightness(${+process.env.BRIGHT}) }` });
    if (process.env.MOSS) await page.evaluate(m => { window.witch.game.tuning.wildLegends.moss = m; }, +process.env.MOSS); // (MOSS=0: its own colours, to judge the shapes)
    const id = await page.evaluate(() => { // the arena's legend; home's own legend (and any other) near it cleared away, so it's alone in the picture
      const g = window.witch.game, id = g.arena.ids[0], a = g.creatures[id];
      const x = a.x + 6, z = a.z + 30; // (out in the open, south of the dancefloor's speakers)
      Object.assign(a, { x, z, tx: x, tz: z, homeX: x, homeZ: z, anchorX: x, anchorZ: z });
      for (const c of g.creatures) if (c && c.id !== id && Math.hypot(c.x - x, c.z - z) < 90) c.gone = true;
      Object.assign(g.witch, { x: x + 12, z: z + 8, vx: 0, vz: 0 }); // (beside it, so it stands mid-picture)
      return id;
    });
    const wait = async s => { const t = await page.evaluate(() => window.witch.game.clock.time) + s; await page.waitForFunction(t => window.witch.game.clock.time >= t, t, { timeout: 120000, polling: 16 }); };
    const set = what => page.evaluate(({ id, what }) => { // its state, as the rules would set it (rules/legends.ts); held side on, facing her way
      const g = window.witch.game, c = g.creatures[id], t = g.clock.time;
      Object.assign(c, { facing: 1, away: false, vx: 0, vz: 0, tx: c.x, tz: c.z });
      if (what === "restless") Object.assign(c, { legendState: "restless", stateAt: t, restlessness: 0.9 });
      if (what === "happy") Object.assign(c, { legendState: "happy", stateAt: t, enraged: false, state: undefined, restlessness: 0, questOpen: false, buffed: true });
      if (what === "asleep") Object.assign(c, { legendState: "asleep", stateAt: t, restlessness: 0, buffed: false });
    }, { id, what });
    await set("asleep");
    await page.waitForFunction(id => { const c = window.witch.game.creatures[id]; return !window.witch.view.rig || !!window.witch.view.assets.rigArt(c.species, c.level); }, id, { timeout: 240000, polling: 500 }).catch(() => console.log("no rig parts (yet) for", sp)); // its rig parts baked (four-legged and serpents)
    await wait(5); await set("asleep"); await wait(1); // (settled, the camera eased in)
    const shoot = async (frames, label) => {
      const at = await page.evaluate(({ id, LIFT }) => { const g = window.witch.game, v = window.witch.view, c = g.creatures[id], p = v.camera.position.clone().set(c.x, window.witch.groundHeight(c.x, c.z) + LIFT, c.z).project(v.camera); return { x: (p.x + 1) / 2 * innerWidth, y: (1 - p.y) / 2 * innerHeight }; }, { id, LIFT });
      const x = Math.max(0, Math.min(1280 - CROP, Math.round(at.x - CROP / 2))), y = Math.max(0, Math.min(720 - Math.min(720, CROP), Math.round(at.y - CROP / 2)));
      if (process.env.DEBUG) label += " " + await page.evaluate(id => { const g = window.witch.game, c = g.creatures[id], tr = window.witch.view.legendSleeps.get(id); return `${c.legendState} t${g.clock.time.toFixed(1)} at${tr ? tr.at.toFixed(1) : "-"} r${window.witch.view.rig.stats.creatures}`; }, id);
      frames.push({ label, png: (await page.screenshot({ clip: { x, y, width: CROP, height: Math.min(720, CROP) } })).toString("base64") });
    };
    if (process.env.FULL) fs.writeFileSync(path.join(out, `${NAME}-full-${sp}.png`), await page.screenshot());
    const frames = [];
    await shoot(frames, "asleep"); await wait(2.2); await shoot(frames, "breathing");
    await set("restless"); for (let k = 0; k < 3; k++) { await wait(0.35); await shoot(frames, "nightmare"); }
    await set("happy"); await shoot(frames, "woken 0s");
    for (let t = STEP; t <= 6.01; t += STEP) { await wait(STEP); await set(null); await shoot(frames, `${t.toFixed(1)}s`); }
    await set("asleep"); for (let t = 1; t <= 4; t += 1) { await wait(1); await shoot(frames, `lulled ${t}s`); }
    rows.push({ label: `${sp} legend`, frames });
    console.log("shot", sp, frames.length);
    if (sp !== SPECIES[SPECIES.length - 1]) await page.close();
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
