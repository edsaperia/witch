// What the ground's pixel shader costs, part by part (the perf pass's fix C, 2026-10-23: the ground mesh was 130 to 300 ms a
// frame on the cloud renderer at every spot, 60% of the frame at the decks): the built game at a few spots, the ground's own draw
// call timed on the GPU (EXT_disjoint_timer_query_webgl2, which the cloud's software renderer has: its milliseconds are the CPU
// rasterising, so it's the shares that carry over to a real GPU) with the shader as built, then with one part of it switched off
// at a time by rewriting its source in the page (render/ground.ts FRAG and the lighting's LIGHT_GLSL it includes), and each
// frame read back and compared with the base's pixel for pixel, so a part that costs time but changes nothing at a spot shows.
// Time stands still (each measured frame steps 0 s), so two frames of one shader are the same picture.
//   npm run build && node tools/bench/ground.cjs [out dir]   DIST=dist SEED=569166 SPOTS=decks,ground:60,-170,treetop:60,-170,coast:90
//   SIZE=1280x720 FRAMES=24 ONLY=base,lights QUERY=island=fox GROUND_ONLY=1 (the ground alone in the measured frames)
const http = require("http"), fs = require("fs"), path = require("path");
const { pageKey } = require("../lib/comparable.cjs"); // (the result's comparability key: tools/lib/comparable.cjs)
let KEY = null;
let playwright; try { playwright = require("playwright"); } catch { playwright = require("/opt/node22/lib/node_modules/playwright"); }
const env = (k, d) => (process.env[k] === undefined ? d : process.env[k]);
const root = path.resolve(__dirname, "../..", env("DIST", "dist")), out = path.resolve(process.argv[2] || path.join(__dirname, "../../previews/ground-cost"));
const SEED = env("SEED", "569166"), [W, H] = env("SIZE", "1280x720").split("x").map(Number), FRAMES = Number(env("FRAMES", 24));
const SPOTS = env("SPOTS", "decks,ground:60,-170,treetop:60,-170").split(/,(?=[a-z])/);
const ONLY = env("ONLY", "") ? env("ONLY", "").split(",") : null;
const types = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".json": "application/json", ".png": "image/png", ".woff2": "font/woff2", ".webp": "image/webp", ".ogg": "audio/ogg", ".wasm": "application/wasm" };

/** The parts: each a set of [from, to] edits to the ground's fragment shader (every `from` must be found, or the run says so). */
const VARIANTS = [
  { id: "base", what: "as built", edits: [] },
  { id: "allcode", what: "the lakes' and the beach's code compiled in, as before fix C (the plain ground's program)", edits: [["uniform sampler2D uAreas;", "#ifndef GROUND_LAKES\n#define GROUND_LAKES\n#endif\n#ifndef GROUND_BEACH\n#define GROUND_BEACH\n#endif\nuniform sampler2D uAreas;"]] },
  { id: "flat", what: "a flat colour: the cost of the mesh and its raster alone", edits: [["void main() {\n  vec2 px = floor(vWorld.xz / uPixel);", "void main() { gl_FragColor = vec4(0.2, 0.3, 0.25, 1.0); return;\n  vec2 px = floor(vWorld.xz / uPixel);"]] },
  { id: "lights", what: "no point lights (the loop in nightLightShaded)", edits: [["if (i >= uLightCount) break;\n    vec3 lv", "break;\n    vec3 lv"]] },
  { id: "glades", what: "no legend glade light (gladeLight's loop)", edits: [["if (i >= uGladeCount) break;", "break;"]] },
  { id: "disco", what: "no disco-ball specks in the light", edits: [["if (uDisco.w > 0.5) {", "if (false) {"]] },
  { id: "hills", what: "no hill shading (4 height lookups a pixel)", edits: [[/vec2 hg = vec2\(groundH\(p \+ vec2\(2\.0, 0\.0\)\)[^;]*;/, "vec2 hg = vec2(0.0);"]] },
  { id: "relief", what: "no fake relief (6 noise lookups)", edits: [["if (uRelief.x > 0.0) {", "if (false) {"]] },
  { id: "canopy", what: "no canopy shadow (2 noise)", edits: [["if (uCanopy.x > 0.0) {", "if (false) {"]] },
  { id: "blend", what: "no blended area edges (2 area lookups, 6 noise)", edits: [["if (uBlend.x + uBlend.y > 0.0) {", "if (false) {"]] },
  { id: "jitter", what: "no wobbled area lookup (2 noise)", edits: [[/vec2 j = vec2\(vnoise\(px \/ 5\.0\)[^;]*;/, "vec2 j = vec2(0.0);"]] },
  { id: "terrain", what: "no area terrain (mounds, hollows, ridges)", edits: [["if (T.x + T.y + T.z > 0.0) {", "if (false) {"]] },
  { id: "legends", what: "no legend rings and floors", edits: [["if (i >= uLegendRingCount) break;", "break;"]] },
  { id: "dancefloor", what: "no dancefloor or plaza", edits: [["if (length(fd) / uDiscoGeom.x * uDiscoGeom.y < uDiscoRim) {", "if (false) {"], ["} else if (uPave.y > 0.0) {", "} else if (false) {"]] },
  { id: "lakes", what: "no lakes (their map, looks and koi)", edits: [["if (uLake.x > 0.0) {", "if (false) {"]] },
  { id: "ponds", what: "no ponds", edits: [["if (area.a > 0.5 && area.b > 0.5) {", "if (false) {"]] },
  { id: "beach", what: "no beach or sea", edits: [["if (uBeach.x > 0.0) {", "if (false) {"]] },
  { id: "haze", what: "no haze (and slowed time's grade)", edits: [["vec3 haze(vec3 c, vec3 P) {", "vec3 haze(vec3 c, vec3 P) { return c;"]] },
  { id: "pool", what: "no glow pool's colour pull", edits: [["vec3 glowPool(vec3 col, vec3 P) {", "vec3 glowPool(vec3 col, vec3 P) { return col;"]] },
  { id: "lakes+beach", what: "no lakes and no beach", edits: [["if (uLake.x > 0.0) {", "if (false) {"], ["if (uBeach.x > 0.0) {", "if (false) {"]] },
  { id: "floortile", what: "the area's floor as its plain colour, not its tile", edits: [["if (area.a > 0.5 && uFloorReady[t] > 0.5) {", "if (false) {"]] },
  { id: "base2", what: "as built, again (the run's drift)", edits: [] },
];

function serve() {
  const server = http.createServer((req, res) => {
    const p = path.join(root, decodeURIComponent(new URL(req.url, "http://x").pathname.replace(/\/$/, "/index.html")));
    fs.readFile(p, (err, data) => { if (err) { res.writeHead(404); res.end(); return; } res.writeHead(200, { "content-type": types[path.extname(p)] || "application/octet-stream" }); res.end(data); });
  });
  return new Promise(ok => server.listen(0, "127.0.0.1", () => ok({ server, port: server.address().port })));
}
const med = a => { if (!a.length) return NaN; const s = [...a].sort((x, y) => x - y); return s[Math.floor(s.length / 2)]; };

(async () => {
  fs.mkdirSync(out, { recursive: true });
  const { server, port } = await serve();
  const browser = await playwright.chromium.launch({ args: ["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist"] });
  const t0 = Date.now(), lap = what => console.log(`[${((Date.now() - t0) / 1000).toFixed(0)} s] ${what}`);
  const results = [];
  for (const spot of SPOTS) {
    const page = await browser.newPage({ viewport: { width: W, height: H } });
    // (the page's clock, which the run holds once the spot is settled: what eases on it, her glow's place and the like, then stands still)
    await page.addInitScript(`(() => { const real = performance.now.bind(performance); let held = null; performance.now = () => (held === null ? real() : held); window.__holdClock = v => { held = v; }; })();`);
    const errors = [];
    page.on("pageerror", e => errors.push(String(e)));
    page.on("console", m => { if (m.type() === "error") errors.push(m.text()); });
    await page.goto(`http://127.0.0.1:${port}/?seed=${SEED}&creator=0&quick=1&spell=auto&pulse=off${process.env.QUERY ? "&" + process.env.QUERY : ""}`);
    await page.waitForFunction(() => window.witch?.ready, null, { timeout: 900000, polling: 500 });
    KEY ??= await pageKey(page, { spot: "ground.cjs spots" });
    await page.evaluate(() => { window.witch.manual = true; });
    if (await page.evaluate(() => window.witch.game.clock.paused)) { await page.keyboard.press("Enter"); await page.waitForTimeout(500); }
    if (spot.startsWith("coast:")) {
      // (on foot 30 m in from the sea's coast facing that bearing, degrees clockwise from east: the beach drawn, its program in use)
      const said = await page.evaluate(deg => { const c = window.witch.coastFacing(deg * Math.PI / 180); return c ? window.witch.shot(`at:${c.x - c.nx * 30},${c.z - c.nz * 30}`) : { ok: false, say: "no coast that way" }; }, +spot.slice(6));
      if (!said.ok) throw new Error(said.say);
    } else if (spot !== "decks") {
      const [mode, dx, dz] = spot.split(/[:,]/);
      const said = await page.evaluate(([mode, dx, dz]) => { const d = window.witch.game.map.dancefloor; return window.witch.shot(`at:${d.x + +dx},${d.z + +dz}${mode === "treetop" ? ",treetop" : ""}`); }, [mode, dx, dz]);
      if (!said.ok) throw new Error(said.say);
    }
    // (the art the spot asks for drawn first, frames stepped so the camera and the ground's tiles settle)
    const step = (n, dt) => page.evaluate(([n, dt]) => { const w = window.witch; for (let i = 0; i < n; i++) w.frame({ moveX: 0, moveZ: 0, toggleMode: false, zoom: 0 }, dt, i === n - 1); }, [n, dt]);
    for (let round = 0, calm = 0; calm < 2 && round < 40; round++) {
      await step(10, 1 / 60);
      if (await page.evaluate(() => window.witch.view.assets.pending) === 0) { calm++; continue; }
      calm = 0;
      await page.waitForFunction(() => window.witch.view.assets.pending === 0, null, { timeout: 1800000, polling: 1000 });
    }
    await step(30, 1 / 60);
    lap(`${spot}: settled (the ground's program: ${await page.evaluate(() => Object.keys(window.witch.view.ground.mesh.material.defines ?? {}).join(", ") || "plain")})`);
    await page.evaluate(on => { window.__groundOnly = on; }, env("GROUND_ONLY", "0") === "1");
    // The ground's own draw timed on the GPU; a frame drawn and read back at once (the canvas isn't kept between tasks).
    const ok = await page.evaluate(() => {
      const v = window.witch.view, r = v.renderer, gl = r.getContext(), ext = gl.getExtension("EXT_disjoint_timer_query_webgl2");
      if (!ext) return false;
      const mesh = v.ground.mesh, direct = r.renderBufferDirect.bind(r), pending = [];
      window.__g = { ms: [], pending };
      r.renderBufferDirect = (camera, scene, geometry, material, object, group) => {
        if (object !== mesh) return direct(camera, scene, geometry, material, object, group);
        const q = gl.createQuery(); gl.beginQuery(ext.TIME_ELAPSED_EXT, q); direct(camera, scene, geometry, material, object, group); gl.endQuery(ext.TIME_ELAPSED_EXT); pending.push(q);
      };
      window.__gDrain = () => { while (pending.length && gl.getQueryParameter(pending[0], gl.QUERY_RESULT_AVAILABLE)) { const q = pending.shift(), ns = gl.getQueryParameter(q, gl.QUERY_RESULT); gl.deleteQuery(q); if (!gl.getParameter(ext.GPU_DISJOINT_EXT)) window.__g.ms.push(ns / 1e6); } return pending.length; };
      window.__gSrc = mesh.material.fragmentShader;
      // GROUND_ONLY=1: everything but the ground hidden for the measured frames, so a spot whose picture isn't still at 0 s (her
      // glow, a creature's idle) still diffs the ground alone
      if (window.__groundOnly) v.scene.traverse(o => { if (o.isMesh || o.isPoints || o.isLine || o.isSprite) { let up = o, mine = false; while (up) { if (up === mesh) { mine = true; break; } up = up.parent; } if (!mine && o.visible) o.visible = false; } });
      window.__gFrame = read => { window.witch.frame({ moveX: 0, moveZ: 0, toggleMode: false, zoom: 0 }, 0, true); if (!read) return null; const w = gl.drawingBufferWidth, h = gl.drawingBufferHeight, px = new Uint8Array(w * h * 4); gl.readPixels(0, 0, w, h, gl.RGBA, gl.UNSIGNED_BYTE, px); return { w, h, px }; };
      return true;
    });
    if (!ok) throw new Error("no GPU timer here (EXT_disjoint_timer_query_webgl2)");
    await page.evaluate(() => window.__holdClock(performance.now()));
    // (still at 0 s, the ground can go on changing a few frames more: its area tiles and heights filled a few a frame round her;
    // drawn until two frames running are the same, so the diffs are of the shader alone)
    const still = await page.evaluate(() => {
      let prev = null, same = 0, n = 0;
      for (; n < 400 && same < 2; n++) { const f = window.__gFrame(true).px; let d = prev ? 0 : 1; if (prev) for (let i = 0; i < f.length; i++) if (f[i] !== prev[i]) { d = 1; break; } same = d ? 0 : same + 1; prev = f; }
      return { frames: n, still: same >= 2 };
    });
    lap(`${spot}: ${still.still ? "still" : "NOT STILL"} after ${still.frames} frames`);
    // (and from here her glow's radius pinned: it eases toward its target for ever, in the ninth figure, and now and then a pixel
    // of her pool crosses a step; and the dancefloor's tiles, lit by their own clock, kept as they are; then two frames of one shader are the same picture, and what the diffs compare is the shader)
    await page.evaluate(() => { const u = window.witch.view.ground.mesh.material.uniforms.uGlowR, v = u.value; Object.defineProperty(u, "value", { get: () => v, set() {}, configurable: true }); window.witch.view.ground.setFloorTiles = () => {}; });
    for (const V of VARIANTS) {
      if (ONLY && !ONLY.includes(V.id) && V.id !== "base" && V.id !== "base2") continue;
      const applied = await page.evaluate(edits => {
        let s = window.__gSrc; const missing = [];
        for (const [from, to] of edits) { const re = from.re ? new RegExp(from.re, from.flags) : null; const before = s; s = re ? s.replace(re, to) : s.split(from).join(to); if (s === before) missing.push(String(from.re ?? from).slice(0, 60)); }
        const m = window.witch.view.ground.mesh.material; m.fragmentShader = s; m.needsUpdate = true;
        return missing;
      }, V.edits.map(([f, t]) => [f instanceof RegExp ? { re: f.source, flags: f.flags } : f, t]));
      if (applied.length) { console.log(`  ${V.id}: NOT APPLIED (not found: ${applied.join(" | ")})`); continue; }
      // (a frame to compile, then the measured ones; the last read back)
      await page.evaluate(() => { window.__gFrame(false); window.__gFrame(false); window.__g.ms.length = 0; });
      for (let i = 0; i < FRAMES; i++) await page.evaluate(() => window.__gFrame(false));
      // The same frame twice, back to back with nothing stepped between (what the frames step, her glow easing, the dancefloor's
      // tiles, the view's budgeted work, can't come into it): the scene drawn with the shader as built and with this variant's,
      // into one target, read back and compared. The proof that a change leaves the picture as it was.
      const same = V.id.startsWith("base") ? null : await page.evaluate(() => {
        const v = window.witch.view, r = v.renderer, gl = r.getContext(), mesh = v.ground.mesh, mine = mesh.material;
        const built = window.__gBuilt ??= Object.assign(mine.clone(), { uniforms: mine.uniforms, fragmentShader: window.__gSrc });
        built.defines = { ...mine.defines }; built.needsUpdate = true;
        const w = gl.drawingBufferWidth, h = gl.drawingBufferHeight, rt = new window.witch.view.post.sceneTarget.constructor(w, h);
        const read = () => { r.setRenderTarget(rt); r.clear(); r.render(v.scene, v.camera); const px = new Uint8Array(w * h * 4); r.readRenderTargetPixels(rt, 0, 0, w, h, px); r.setRenderTarget(null); return px; };
        mesh.material = built; read(); const a = read();
        mesh.material = mine; read(); const b = read();
        rt.dispose();
        let d = 0, m = 0; for (let i = 0; i < a.length; i += 4) { const e = Math.max(Math.abs(a[i] - b[i]), Math.abs(a[i + 1] - b[i + 1]), Math.abs(a[i + 2] - b[i + 2])); if (e) { d++; if (e > m) m = e; } }
        return { diff: d, maxd: m };
      });
      // (the frame read back and compared with the base's in the page; the base's kept there)
      const cmp = await page.evaluate(isBase => {
        const f = window.__gFrame(true), b = window.__gBase, px = f.px;
        (window.__gKept ??= []).push(px);
        if (isBase) { window.__gBase = px; return { diff: 0, maxd: 0, of: px.length / 4 }; }
        let diff = 0, maxd = 0;
        for (let i = 0; i < px.length; i += 4) { const d = Math.max(Math.abs(px[i] - b[i]), Math.abs(px[i + 1] - b[i + 1]), Math.abs(px[i + 2] - b[i + 2])); if (d) { diff++; if (d > maxd) maxd = d; } }
        return { diff, maxd, of: px.length / 4 };
      }, V.id === "base");
      for (let i = 0; i < 60 && (await page.evaluate(() => window.__gDrain())) > 0; i++) await page.waitForTimeout(250);
      const ms = await page.evaluate(() => window.__g.ms.slice());
      const diff = cmp.diff, maxd = cmp.maxd;
      const row = { spot, id: V.id, what: V.what, ms: med(ms), n: ms.length, diffPx: diff, maxDiff: maxd, of: cmp.of, same };
      results.push(row);
      lap(`  ${spot} ${V.id.padEnd(10)} ground ${row.ms.toFixed(1)} ms (${ms.length} frames)${V.id === "base" ? "" : `, ${diff} px differ (max ${maxd})`}${same ? `; drawn back to back with the shader as built: ${same.diff} px differ (max ${same.maxd})` : ""}`);
    }
    // (each variant against the frame drawn next, too: a slow drift in the ground, tiles filled late, shows in both, the fix in neither)
    const next = await page.evaluate(() => { const K = window.__gKept, o = []; for (let k = 1; k + 1 < K.length; k++) { let d = 0; for (let i = 0; i < K[k].length; i += 4) if (K[k][i] !== K[k + 1][i] || K[k][i + 1] !== K[k + 1][i + 1] || K[k][i + 2] !== K[k + 1][i + 2]) d++; o.push(d); } window.__gKept = []; return o; });
    const ran = results.filter(r => r.spot === spot);
    next.forEach((d, k) => { const r = ran[k + 1]; if (r) r.diffNext = d; });
    lap(`  ${spot}: pixels each variant differs from the frame drawn after it: ${ran.slice(1, -1).map((r, k) => `${r.id} ${next[k]}`).join(", ")}`);
    if (errors.length) console.log(`  page errors at ${spot}: ${errors.slice(0, 3).join(" | ")}`);
    await page.close();
  }
  const lines = ["| spot | part off | ground ms | saved vs base | pixels changed (frame / back to back) |", "|---|---|---|---|---|"];
  for (const r of results) { const bs = results.filter(q => q.spot === r.spot && q.id.startsWith("base")), b = { ms: bs.reduce((a, q) => a + q.ms, 0) / bs.length }; lines.push(`| ${r.spot} | ${r.id}: ${r.what} | ${r.ms.toFixed(1)} | ${r.id === "base" ? "" : `${(b.ms - r.ms).toFixed(1)} (${((1 - r.ms / b.ms) * 100).toFixed(0)}%)`} | ${r.id === "base" ? "" : `${r.diffPx} (max ${r.maxDiff})`}${r.same ? ` / ${r.same.diff} (max ${r.same.maxd})` : ""} |`); }
  console.log("\n" + lines.join("\n"));
  fs.writeFileSync(path.join(out, "ground.md"), lines.join("\n") + "\n");
  fs.writeFileSync(path.join(out, "ground.json"), JSON.stringify({ key: KEY, results }, null, 1));
  await browser.close(); server.close();
})().catch(e => { console.error(e); process.exit(1); });
