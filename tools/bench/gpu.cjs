// What the picture costs to draw, by its parts (the coordinator's ask from Ed's overlay, 2026-10-13: ground mode in the Bluebell
// glade, seed 569166, "gpu 21.4 ms median", 96% of frames over 20 ms): the built game at a spot on foot, really drawn, and then
// the same spot with one thing switched off at a time (the cast-shadow map, the trunks' shadows, the blobs under things, the
// bloom, the tilt-shift, the ground cover, the mist), each for FRAMES frames, and a table of what each frame cost with it on and
// off: the gap between frames, the view's own draw time on the page (three.js walking the scene and the GL calls), the scene
// pass alone, the GPU's own time where the browser can time it (EXT_disjoint_timer_query_webgl2: not under the software
// renderer here, where the frame gap is the GPU's time instead, the picture rasterised on the CPU), the draw calls and the
// triangles. The knobs are the tuning's, set live (the view reads them each frame), so the game's build is what's measured.
//   node tools/bench/gpu.cjs [out dir]   DIST=dist SEED=569166 X=2204 Z=2253 ZOOM=3 WAVES=9 SIZE=2000x1326 FRAMES=90 WARM=10 ONLY=base,cast
const http = require("http"), fs = require("fs"), path = require("path");
let playwright; try { playwright = require("playwright"); } catch { playwright = require("/opt/node22/lib/node_modules/playwright"); }
const env = (k, d) => (process.env[k] === undefined ? d : process.env[k]);
const root = path.resolve(__dirname, "../..", env("DIST", "dist")), out = path.resolve(process.argv[2] || path.join(__dirname, "../../previews/gpu"));
const SEED = env("SEED", "569166"), X = Number(env("X", 2204)), Z = Number(env("Z", 2253)), ZOOM = Number(env("ZOOM", 3)), WAVES = Number(env("WAVES", 9));
const [W, H] = env("SIZE", "2000x1326").split("x").map(Number), FRAMES = Number(env("FRAMES", 90)), WARM = Number(env("WARM", 10));
const ONLY = env("ONLY", "") ? env("ONLY", "").split(",") : null;
const types = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".json": "application/json", ".png": "image/png", ".woff2": "font/woff2", ".webp": "image/webp", ".ogg": "audio/ogg", ".wasm": "application/wasm" };
function serve() {
  const server = http.createServer((req, res) => {
    const p = path.join(root, decodeURIComponent(new URL(req.url, "http://x").pathname.replace(/\/$/, "/index.html")));
    fs.readFile(p, (err, data) => { if (err) { res.writeHead(404); res.end(); return; } res.writeHead(200, { "content-type": types[path.extname(p)] || "application/octet-stream" }); res.end(data); });
  });
  return new Promise(ok => server.listen(0, "127.0.0.1", () => ok({ server, port: server.address().port })));
}
const wait = ms => new Promise(r => setTimeout(r, ms));
const pct = (a, p) => { if (!a.length) return NaN; const s = [...a].sort((x, y) => x - y); return s[Math.min(s.length - 1, Math.floor(p * s.length))]; };
const f1 = x => (Number.isFinite(x) ? x.toFixed(1) : "—");

/** The variants: each a change to the tuning (applied in the page, undone after). */
const VARIANTS = [
  { id: "base", what: "as the game is", set: "" },
  { id: "cast", what: "no cast-shadow map (shadows.cast off)", set: "t.shadows.cast = false" },
  { id: "trunks", what: "no trunk shadows at all (trunks.mode off)", set: "t.shadows.trunks.mode = 'off'" },
  { id: "hard", what: "trunk shadows hard (one tap, not five)", set: "t.shadows.trunks.mode = 'hard'" },
  { id: "reach", what: "her glow's shadows to 20 m, not 50", set: "t.shadows.trunks.glowReach = 20" },
  { id: "blobs", what: "no blob shadows (shadows.on off)", set: "t.shadows.on = false" },
  { id: "bloom", what: "no bloom", set: "t.bloom.on = false" },
  { id: "tilt", what: "no tilt-shift", set: "t.tiltShift.on = false" },
  { id: "cover", what: "no ground cover", set: "t.groundCover.on = false" },
  { id: "post", what: "no bloom and no tilt-shift", set: "t.bloom.on = false; t.tiltShift.on = false" },
  { id: "shadows", what: "no shadows of any kind", set: "t.shadows.cast = false; t.shadows.trunks.mode = 'off'; t.shadows.on = false" },
  { id: "bare", what: "no shadows, bloom, tilt-shift or ground cover", set: "t.shadows.cast = false; t.shadows.trunks.mode = 'off'; t.shadows.on = false; t.bloom.on = false; t.tiltShift.on = false; t.groundCover.on = false" },
];

(async () => {
  fs.mkdirSync(out, { recursive: true });
  const { server, port } = await serve();
  const browser = await playwright.chromium.launch({ args: ["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist", "--autoplay-policy=no-user-gesture-required"] });
  const page = await browser.newPage({ viewport: { width: W, height: H } });
  const errors = [];
  page.on("pageerror", e => errors.push(String(e)));
  page.on("console", m => { if (m.type() === "error") errors.push(m.text()); });
  const t0 = Date.now(), lap = what => console.log(`[${((Date.now() - t0) / 1000).toFixed(1)} s] ${what}`);
  await page.goto(`http://127.0.0.1:${port}/?seed=${SEED}&creator=0&spell=auto`);
  await page.waitForFunction(() => window.witch?.ready, null, { timeout: 180000 });
  lap("ready");
  // Off the decks (Space takes her up; a second press brings her down), to the spot on foot, at the zoom, the waves brought on.
  await page.keyboard.press("Space"); await wait(800);
  for (let i = 0; i < 40; i++) { const mode = await page.evaluate(() => window.witch.game.witch.mode); if (mode === "treetop") break; await wait(500); }
  await page.evaluate(({ X, Z, ZOOM }) => { const g = window.witch.game, w = g.witch; w.x = X; w.z = Z; w.vx = w.vz = 0; g.camera.zoomStep = ZOOM; }, { X, Z, ZOOM });
  await page.keyboard.press("Space");
  for (let i = 0; i < 40; i++) { const mode = await page.evaluate(() => window.witch.game.witch.mode); if (mode === "ground") break; await wait(500); }
  for (let i = 0; i < WAVES; i++) { await page.keyboard.press("KeyN"); await wait(400); } // (a frame here can take seconds: the presses land on the frames after)
  if (WAVES) await page.waitForFunction(n => window.witch.game.party.wave >= n, WAVES, { timeout: 120000 }).catch(() => {});
  const where = await page.evaluate(() => { const g = window.witch.game, w = g.witch, a = g.map.areaAt(w.x, w.z); return { mode: w.mode, x: Math.round(w.x), z: Math.round(w.z), area: a?.type, zoom: g.camera.zoomStep, wave: g.party.wave, gpuTimer: !!window.witch.frameStats.recent().gpu.length || !!window.witch.view.renderer.getContext().getExtension("EXT_disjoint_timer_query_webgl2") }; });
  lap(`at the spot: ${JSON.stringify(where)}; settling ${WARM} s`);
  await wait(WARM * 1000);
  // The measure: the view's render wrapped to note each frame's draw time, scene pass, calls and triangles; a frame loop of the
  // probe's own for the gaps.
  await page.evaluate(() => {
    const v = window.witch.view, f = v.render.bind(v);
    window.__m = { draw: [], scene: [], calls: [], tris: [], gaps: [] };
    v.render = (time, draw) => { f(time, draw); const m = window.__m; m.draw.push(v.ms.draw); m.scene.push(v.post.sceneMs); m.calls.push(v.renderer.info.render.calls); m.tris.push(v.renderer.info.render.triangles); };
    let last = performance.now(); const tick = t => { window.__m.gaps.push(t - last); last = t; requestAnimationFrame(tick); }; requestAnimationFrame(tick);
  });
  const rows = [];
  for (const V of VARIANTS) {
    if (ONLY && !ONLY.includes(V.id)) continue;
    const t1 = Date.now();
    await page.evaluate(set => { const t = window.witch.tuning; window.__saved = JSON.stringify({ shadows: t.shadows, bloom: t.bloom, tiltShift: t.tiltShift, groundCover: t.groundCover }); new Function("t", set)(t); const m = window.__m; m.draw.length = m.scene.length = m.calls.length = m.tris.length = m.gaps.length = 0; }, V.set);
    await wait(1500); // (the change settling: a pass dropped, a batch hidden)
    await page.evaluate(() => { const m = window.__m; m.draw.length = m.scene.length = m.calls.length = m.tris.length = m.gaps.length = 0; });
    await page.waitForFunction(n => window.__m.draw.length >= n, FRAMES, { timeout: 600000 });
    const m = await page.evaluate(() => { const m = window.__m, r = window.witch.frameStats.recent(); return { ...m, gpu: r.gpu.slice(-m.draw.length) }; });
    await page.evaluate(() => { const t = window.witch.tuning, s = JSON.parse(window.__saved); Object.assign(t.shadows, s.shadows); Object.assign(t.bloom, s.bloom); Object.assign(t.tiltShift, s.tiltShift); Object.assign(t.groundCover, s.groundCover); });
    const row = { id: V.id, what: V.what, frames: m.draw.length, gap50: pct(m.gaps, 0.5), gap95: pct(m.gaps, 0.95), draw50: pct(m.draw, 0.5), draw95: pct(m.draw, 0.95), scene50: pct(m.scene, 0.5), gpu50: pct(m.gpu, 0.5), gpu95: pct(m.gpu, 0.95), calls: pct(m.calls, 0.5), tris: pct(m.tris, 0.5), secs: (Date.now() - t1) / 1000 };
    rows.push(row);
    lap(`${V.id}: gap ${f1(row.gap50)} ms (p95 ${f1(row.gap95)}), draw ${f1(row.draw50)} ms, scene ${f1(row.scene50)} ms, gpu ${f1(row.gpu50)} ms, calls ${row.calls}, tris ${row.tris}`);
  }
  const base = rows.find(r => r.id === "base");
  const end = await page.evaluate(() => { const g = window.witch.game, v = window.witch.view; return { wave: g.party.wave, lights: v.stats?.lights, trees: v.stats?.trees, bushes: v.stats?.bushes, creatures: g.creatures.length, cover: v.grass?.count }; });
  const lines = [
    `GPU ablation: area ${where.area} at ${where.x}, ${where.z}, ${where.mode}, zoom ${where.zoom}, wave ${end.wave} (${JSON.stringify(end)}), ${W}x${H}, ${FRAMES} frames a variant, the software renderer (gpu timer: ${where.gpuTimer})`,
    "",
    "| variant | frame gap ms (p50 / p95) | draw on the page ms | scene pass ms | gpu ms | draw calls | triangles | vs base |",
    "|---|---|---|---|---|---|---|---|",
    ...rows.map(r => `| ${r.id}: ${r.what} | ${f1(r.gap50)} / ${f1(r.gap95)} | ${f1(r.draw50)} | ${f1(r.scene50)} | ${f1(r.gpu50)} | ${r.calls} | ${r.tris} | ${base && r !== base ? `${f1(r.gap50 - base.gap50)} ms gap, ${f1(r.draw50 - base.draw50)} ms draw` : ""} |`),
  ];
  if (errors.length) lines.push("", `page errors: ${errors.length}`, ...errors.slice(0, 5).map(e => "  " + e));
  console.log("\n" + lines.join("\n"));
  fs.writeFileSync(path.join(out, "gpu.md"), lines.join("\n") + "\n");
  fs.writeFileSync(path.join(out, "gpu.json"), JSON.stringify({ where, rows, errors }, null, 1));
  await page.screenshot({ path: path.join(out, "spot.png") });
  await browser.close(); server.close();
})().catch(e => { console.error(e); process.exit(1); });
