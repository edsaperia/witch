// What the picture costs to draw, by its parts (the coordinator's ask from Ed's overlay, 2026-10-13: ground mode in the Bluebell
// glade, seed 569166, "gpu 21.4 ms median", 96% of frames over 20 ms): the built game at a spot on foot, really drawn, and then
// the same spot with one thing switched off at a time (the cast-shadow map, the trunks' shadows, the blobs under things, the
// bloom, the tilt-shift, the ground cover, the mist), each for FRAMES frames, and a table of what each frame cost with it on and
// off: the gap between frames, the view's own draw time on the page (three.js walking the scene and the GL calls), the scene
// pass alone, the GPU's own time where the browser can time it (EXT_disjoint_timer_query_webgl2: not under the software
// renderer here, where the frame gap is the GPU's time instead, the picture rasterised on the CPU), the draw calls and the
// triangles. The knobs are the tuning's, set live (the view reads them each frame), so the game's build is what's measured.
//   node tools/bench/gpu.cjs [out dir]   DIST=dist QUERY=island=fox SEED=569166 X=2204 Z=2253 ZOOM=3 WAVES=9 SIZE=2000x1326 FRAMES=90 WARM=10 ONLY=base,cast
const http = require("http"), fs = require("fs"), path = require("path");
const { pageKey } = require("../lib/comparable.cjs"); // (the result's comparability key: tools/lib/comparable.cjs)
let KEY = null;
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
  // (the shader's own parts, by the view's objects and uniforms: `v` the view, `undo` a list of ways back)
  { id: "nofade", what: "no see-through pass (the sprites' second draw)", set: "v.scene.traverse(o => { if (o.material?.uniforms?.uFadePass?.value === 1 && o.visible) { o.visible = false; undo.push(() => { o.visible = true; }); } })" },
  { id: "late", what: "the see-through passes' early out off (uSeeEarly 0: every pixel's taps before its discard)", set: "let u = null; v.scene.traverse(o => { u ??= o.material?.uniforms?.uSeeEarly ?? null; }); if (!u) throw new Error('no uSeeEarly'); u.value = 0; undo.push(() => { u.value = 1; })" },
  // (the perf pass: the see-through cull's keep-rules, one off at a time and all off, to attribute its cost; not pixel-identical)
  { id: "cull0", what: "the see-through cull keeping nothing (every extra pass's quad dropped)", set: "let u = null; v.scene.traverse(o => { u ??= o.material?.uniforms?.uCullDbg ?? null; }); if (!u) throw new Error('no uCullDbg'); u.value = 0; undo.push(() => { u.value = 7; })" },
  { id: "cullA", what: "the see-through cull without her circle's rule", set: "let u = null; v.scene.traverse(o => { u ??= o.material?.uniforms?.uCullDbg ?? null; }); if (!u) throw new Error('no uCullDbg'); u.value = 6; undo.push(() => { u.value = 7; })" },
  { id: "cullB", what: "the see-through cull without the hole's band rule", set: "let u = null; v.scene.traverse(o => { u ??= o.material?.uniforms?.uCullDbg ?? null; }); if (!u) throw new Error('no uCullDbg'); u.value = 5; undo.push(() => { u.value = 7; })" },
  { id: "cullC", what: "the see-through cull without the budget's edge rule", set: "let u = null; v.scene.traverse(o => { u ??= o.material?.uniforms?.uCullDbg ?? null; }); if (!u) throw new Error('no uCullDbg'); u.value = 3; undo.push(() => { u.value = 7; })" },
  { id: "nobypass", what: "the see-through passes culled as before A2 (uCullByPass 0: every pass keeps both kinds)", set: "let u = null; v.scene.traverse(o => { u ??= o.material?.uniforms?.uCullByPass ?? null; }); if (!u) throw new Error('no uCullByPass'); u.value = 0; undo.push(() => { u.value = 1; })" },
  { id: "lights0", what: "no point lights in the pixel shader (uLightCount 0)", set: "const u = v.scene.children.find(o => o.material?.uniforms?.uLightCount)?.material.uniforms.uLightCount ?? v.scene.children.flatMap(o => o.children ?? []).find(o => o.material?.uniforms?.uLightCount)?.material.uniforms.uLightCount; if (!u) throw new Error('no uLightCount'); const was = u.value; Object.defineProperty(u, 'value', { get: () => 0, set() {}, configurable: true }); undo.push(() => { delete u.value; u.value = was; })" },
  { id: "nosway", what: "no pixel wind (uWind.x 0: the sway taps skipped)", set: "let u = null; v.scene.traverse(o => { u ??= o.material?.uniforms?.uWind ?? null; }); if (!u) throw new Error('no uWind'); const w = u.value; Object.defineProperty(w, 'x', { get: () => 0, set() {}, configurable: true }); undo.push(() => { delete w.x; w.x = 0; })" },
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
  await page.goto(`http://127.0.0.1:${port}/?seed=${SEED}&creator=0&spell=auto${process.env.QUERY ? "&" + process.env.QUERY : ""}`);
  await page.waitForFunction(() => window.witch?.ready, null, { timeout: 180000 });
  KEY ??= await pageKey(page, { spot: `gpu.cjs at ${X},${Z} zoom ${ZOOM}` });
  lap("ready");
  // Off the decks (Space takes her up; a second press brings her down), to the spot on foot, at the zoom, the waves brought on.
  // (a frame here can take seconds under the software renderer: each key waited for by what it does, not by the clock)
  // (Space only while she's on the ground or in the treetops: pressed mid-rise it turns her round; her first seconds at the decks
  // are held by her routine, so a press then is lost and pressed again)
  const mode = () => page.evaluate(() => window.witch.game.witch.mode);
  const go = async (to, from) => { for (let i = 0; i < 300; i++) { const m = await mode(); if (m === to) return; if (m === from) await page.keyboard.press("Space"); await wait(1000); } throw new Error(`never ${to}`); };
  await go("treetop", "ground");
  await page.evaluate(({ X, Z, ZOOM }) => { const g = window.witch.game, w = g.witch; w.x = X; w.z = Z; w.vx = w.vz = 0; g.camera.zoomStep = ZOOM; }, { X, Z, ZOOM });
  await go("ground", "treetop");
  for (let i = 1; i <= WAVES; i++) { await page.keyboard.press("KeyN"); await page.waitForFunction(n => window.witch.game.party.wave >= n, i, { timeout: 120000 }).catch(() => {}); }
  const where = await page.evaluate(() => { const g = window.witch.game, w = g.witch, a = g.map.areaAt(w.x, w.z); return { mode: w.mode, x: Math.round(w.x), z: Math.round(w.z), area: a?.type, zoom: g.camera.zoomStep, wave: g.party.wave, gpuTimer: !!window.witch.frameStats.recent().gpu.length || !!window.witch.view.renderer.getContext().getExtension("EXT_disjoint_timer_query_webgl2") }; });
  lap(`at the spot: ${JSON.stringify(where)}; settling ${WARM} s`);
  await wait(WARM * 1000);
  // The measure: the view's render wrapped to note each frame's draw time, scene pass, calls and triangles; a frame loop of the
  // probe's own for the gaps.
  await page.evaluate(objects => { window.__objects = objects; }, env("OBJECTS", "0") !== "0");
  await page.evaluate(() => {
    const v = window.witch.view, f = v.render.bind(v);
    window.__m = { draw: [], scene: [], calls: [], tris: [], gaps: [], passes: {} };
    v.render = (time, draw) => { f(time, draw); const m = window.__m; m.draw.push(v.ms.draw); m.scene.push(v.post.sceneMs); m.calls.push(v.renderer.info.render.calls); m.tris.push(v.renderer.info.render.triangles); };
    let last = performance.now(); const tick = t => { window.__m.gaps.push(t - last); last = t; requestAnimationFrame(tick); }; requestAnimationFrame(tick);
    // Each render call (the cast-shadow map, the scene, the effects layer, each post pass) timed on the GPU by itself, where the
    // browser can: the frame's own query (platform/frameStats.ts) given up for these, one a call, read back as they come.
    const r = v.renderer, gl = r.getContext(), ext = gl.getExtension("EXT_disjoint_timer_query_webgl2");
    if (!ext) return;
    window.witch.frameStats.ext = null;
    const orig = r.render.bind(r), pending = [];
    const label = (scene, cam) => {
      const rt = r.getRenderTarget(), size = rt ? `${rt.width}x${rt.height}` : "canvas";
      if (scene === v.scene) return cam.isOrthographicCamera ? `cast-shadow map ${size}` : `scene ${size}`;
      if (v.post && scene === v.post.fxScene) return `effects layer ${size}`;
      const u = scene.children[0]?.material?.uniforms ?? {};
      const kind = u.uThreshold ? "bloom bright" : u.uStep ? "blur" : u.uBloom ? "composite" : u.uDir ? "tilt-shift" : "other";
      return `${kind} ${size}`;
    };
    // OBJECTS=1: each draw call by itself instead (the object's name, its material and its instances), within the scene pass.
    if (window.__objects) {
      const direct = r.renderBufferDirect.bind(r);
      r.renderBufferDirect = (camera, scene, geometry, material, object, group) => {
        const q = gl.createQuery();
        gl.beginQuery(ext.TIME_ELAPSED_EXT, q); direct(camera, scene, geometry, material, object, group); gl.endQuery(ext.TIME_ELAPSED_EXT);
        const key = `${camera.isOrthographicCamera ? "[cast] " : ""}${object.name || object.type}${object.isInstancedMesh ? ` x${object.count}` : geometry.isInstancedBufferGeometry ? ` i${geometry.instanceCount ?? "?"}` : ""} ${material.name || material.type} ${geometry.index ? geometry.index.count / 3 : geometry.attributes.position.count / 3}tri`;
        pending.push({ q, key, calls: 1 });
        while (pending.length && gl.getQueryParameter(pending[0].q, gl.QUERY_RESULT_AVAILABLE)) {
          const e = pending.shift(), ns = gl.getQueryParameter(e.q, gl.QUERY_RESULT); gl.deleteQuery(e.q);
          if (gl.getParameter(ext.GPU_DISJOINT_EXT)) continue;
          const P = (window.__m.passes[e.key] ??= { ms: [], calls: [] }); P.ms.push(ns / 1e6); P.calls.push(e.calls);
        }
      };
      return;
    }
    r.render = (scene, cam) => {
      const key = label(scene, cam), c0 = r.info.render.calls, q = gl.createQuery();
      gl.beginQuery(ext.TIME_ELAPSED_EXT, q); orig(scene, cam); gl.endQuery(ext.TIME_ELAPSED_EXT);
      pending.push({ q, key, calls: r.info.render.calls - c0 });
      while (pending.length && gl.getQueryParameter(pending[0].q, gl.QUERY_RESULT_AVAILABLE)) {
        const e = pending.shift(), ns = gl.getQueryParameter(e.q, gl.QUERY_RESULT); gl.deleteQuery(e.q);
        if (gl.getParameter(ext.GPU_DISJOINT_EXT)) continue;
        const P = (window.__m.passes[e.key] ??= { ms: [], calls: [] }); P.ms.push(ns / 1e6); P.calls.push(e.calls);
      }
    };
  });
  const rows = [];
  for (const V of VARIANTS) {
    if (ONLY && !ONLY.includes(V.id)) continue;
    const t1 = Date.now();
    await page.evaluate(set => { const t = window.witch.tuning; window.__m.passes = {}; window.__undo = []; window.__saved = JSON.stringify({ shadows: t.shadows, bloom: t.bloom, tiltShift: t.tiltShift, groundCover: t.groundCover }); new Function("t", "v", "undo", set)(t, window.witch.view, window.__undo); const m = window.__m; m.draw.length = m.scene.length = m.calls.length = m.tris.length = m.gaps.length = 0; }, V.set);
    await wait(1500); // (the change settling: a pass dropped, a batch hidden)
    await page.evaluate(() => { const m = window.__m; m.draw.length = m.scene.length = m.calls.length = m.tris.length = m.gaps.length = 0; });
    await page.waitForFunction(n => window.__m.draw.length >= n, FRAMES, { timeout: 600000 });
    const m = await page.evaluate(() => { const m = window.__m, r = window.witch.frameStats.recent(); return { ...m, gpu: r.gpu.slice(-m.draw.length) }; });
    const passes = Object.entries(m.passes).map(([k, P]) => ({ key: k, n: P.ms.length / Math.max(1, m.draw.length), ms: pct(P.ms, 0.5), calls: pct(P.calls, 0.5), total: P.ms.reduce((a, b) => a + b, 0) / Math.max(1, m.draw.length) })).sort((a, b) => b.total - a.total);
    if (passes.length) { console.log(`  ${V.id}, the GPU by ${env("OBJECTS", "0") !== "0" ? "draw call" : "render call"} (ms a frame: total, each; calls; ${passes.reduce((a, p) => a + p.total, 0).toFixed(1)} ms in all):`); for (const p of passes.slice(0, 30)) console.log(`    ${p.total.toFixed(1).padStart(8)}  ${p.ms.toFixed(1).padStart(7)} x${p.n.toFixed(1)}  ${String(p.calls).padStart(4)}  ${p.key}`); }
    if (!m.gpu.length && passes.length) m.gpu = Array.from({ length: m.draw.length }, (_, i) => Object.values(m.passes).reduce((a, P) => a + (P.ms[i] ?? 0), 0));
    await page.evaluate(() => { const t = window.witch.tuning, s = JSON.parse(window.__saved); Object.assign(t.shadows, s.shadows); Object.assign(t.bloom, s.bloom); Object.assign(t.tiltShift, s.tiltShift); Object.assign(t.groundCover, s.groundCover); for (const f of window.__undo.reverse()) f(); });
    const row = { id: V.id, what: V.what, frames: m.draw.length, gap50: pct(m.gaps, 0.5), gap95: pct(m.gaps, 0.95), draw50: pct(m.draw, 0.5), draw95: pct(m.draw, 0.95), scene50: pct(m.scene, 0.5), gpu50: pct(m.gpu, 0.5), gpu95: pct(m.gpu, 0.95), calls: pct(m.calls, 0.5), tris: pct(m.tris, 0.5), secs: (Date.now() - t1) / 1000 };
    rows.push(row);
    lap(`${V.id}: gap ${f1(row.gap50)} ms (p95 ${f1(row.gap95)}), draw ${f1(row.draw50)} ms, scene ${f1(row.scene50)} ms, gpu ${f1(row.gpu50)} ms, calls ${row.calls}, tris ${row.tris}`);
  }
  // A shader that didn't compile draws nothing, and nothing is cheap: the run is void (2026-10-13: `half` is a reserved word in GLSL).
  const shaderErrors = errors.filter(e => /Shader Error|not compiled|VALIDATE_STATUS/.test(e));
  if (shaderErrors.length) { console.error(`SHADER ERRORS (${shaderErrors.length}): the numbers below are of a picture missing what didn't compile\n` + shaderErrors[0].slice(0, 1500)); }
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
  fs.writeFileSync(path.join(out, "gpu.json"), JSON.stringify({ key: KEY, where, rows, errors }, null, 1));
  await page.screenshot({ path: path.join(out, "spot.png") });
  await browser.close(); server.close();
  if (shaderErrors.length) process.exit(2);
})().catch(e => { console.error(e); process.exit(1); });
