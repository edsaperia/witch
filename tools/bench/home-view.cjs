// What the view from home costs (the coordinator's ask, 2026-10-23: #1024's re-packed archipelago changed home's patch, and the
// view from the decks went from about 130k triangles to 250k): the built game (DIST) at fixed spots round the treehouse, each
// frame stepped at 1/60 s and the GPU finished (so a frame's time is its whole draw on this renderer), its draw calls and
// triangles, and the triangles by object (the batches are named), with a screenshot. Spots: `decks` (the night's opening shot,
// seated), `balcony` (stood at the balcony's rim at the game's zoom, as she walks out to step off), `off` (in the treetops 40 m
// south of the treehouse, just flown off).
//   node tools/bench/home-view.cjs <out dir> [seed]     DIST=dist SPOTS=decks,balcony,off FRAMES=12 SIZE=1600x900
const http = require("http"), fs = require("fs"), path = require("path");
let playwright; try { playwright = require("playwright"); } catch { playwright = require("/opt/node22/lib/node_modules/playwright"); }
const [outDir = "previews/home-view", seed = "123"] = process.argv.slice(2);
const root = path.resolve(process.env.DIST || path.join(__dirname, "../../dist"));
const SPOTS = (process.env.SPOTS || "decks,balcony,off").split(","), FRAMES = Number(process.env.FRAMES || 12);
const [W, H] = (process.env.SIZE || "1600x900").split("x").map(Number);
const types = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".json": "application/json", ".png": "image/png", ".wasm": "application/wasm", ".woff2": "font/woff2", ".ogg": "audio/ogg", ".webp": "image/webp" };
(async () => {
  fs.mkdirSync(outDir, { recursive: true });
  const server = http.createServer((req, res) => { const p = path.join(root, decodeURIComponent(new URL(req.url, "http://x").pathname)), f = fs.existsSync(p) && fs.statSync(p).isDirectory() ? path.join(p, "index.html") : p; if (!f.startsWith(root) || !fs.existsSync(f)) { res.writeHead(404); res.end(); return; } res.writeHead(200, { "content-type": types[path.extname(f)] || "application/octet-stream" }); res.end(fs.readFileSync(f)); });
  await new Promise(r => server.listen(0, "127.0.0.1", r));
  const browser = await playwright.chromium.launch({ args: ["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist"] });
  const errors = [], out = { seed, spots: {} };
  try {
    const page = await browser.newPage({ viewport: { width: W, height: H } });
    page.on("pageerror", e => errors.push(e.message));
    await page.goto(`http://127.0.0.1:${server.address().port}/?seed=${seed}&creator=0&spell=auto&wave=off`);
    await page.waitForFunction(() => window.witch && window.witch.ready, null, { timeout: 900000, polling: 1000 });
    await page.keyboard.press("Enter"); // (past the start card)
    await page.waitForFunction(() => window.witch.game.clock.time > 2, null, { timeout: 600000, polling: 500 });
    const NONE = { moveX: 0, moveZ: 0, toggleMode: false, zoom: 0 };
    const step = n => page.evaluate(([n, NONE]) => { const w = window.witch; w.manual = true; for (let i = 0; i < n; i++) w.frame(NONE, 1 / 60, true); }, [n, NONE]);
    // (the art the view needs, drawn: stepped until nothing new arrives for a while)
    const settle = async () => { let last = -1, same = 0; for (let i = 0; i < 120 && same < 4; i++) { await step(2); await new Promise(r => setTimeout(r, 3000)); const t = await page.evaluate(() => window.witch.view.renderer.info.render.triangles); same = t === last ? same + 1 : 0; last = t; } };
    const place = spot => page.evaluate(spot => {
      const g = window.witch.game, T = g.map.treehouse, w = g.witch;
      if (spot === "balcony") Object.assign(w, { x: T.x, z: T.z + 12, vx: 0, vz: 0, mode: "ground", lift: 0, perch: true, seated: false });
      if (spot === "off") Object.assign(w, { x: T.x, z: T.z + 40, vx: 0, vz: 0, mode: "treetop", lift: 1, perch: false, seated: false });
      if (spot !== "decks") { g.camera.intro = null; g.introFocus = null; }
    }, spot);
    for (const spot of SPOTS) {
      await place(spot); await step(60); await settle();
      await page.evaluate(() => {
        const v = window.witch.view, r = v.renderer, direct = r.__direct ?? (r.__direct = r.renderBufferDirect.bind(r));
        window.__by = {};
        // (each unnamed batch's mesh labelled by where the view keeps it: a map of batches, or a field)
        const lab = new Map(), see = (b, k) => { for (const m of b?.meshes ?? []) if (!lab.has(m)) lab.set(m, k); };
        for (const [f, val] of Object.entries(v)) { if (val instanceof Map) for (const [k, b] of val) see(b, `${f}:${k}`); else if (val?.meshes) see(val, f); else if (val && typeof val === "object") for (const [g, w] of Object.entries(val)) if (w?.meshes) see(w, `${f}.${g}`); }
        r.renderBufferDirect = (camera, scene, geometry, material, object, group) => {
          direct(camera, scene, geometry, material, object, group);
          const n = (geometry.index ? geometry.index.count : geometry.attributes.position?.count ?? 0) / 3, inst = object.isInstancedMesh ? object.count : geometry.isInstancedBufferGeometry ? geometry.instanceCount : 1;
          const k = `${camera.isOrthographicCamera ? "[cast] " : ""}${object.name || lab.get(object) || object.parent?.name || ""} ${material.name || material.type} ${geometry.type}${object.isInstancedMesh || geometry.isInstancedBufferGeometry ? " inst" : ""}${object.name ? "" : " {" + Object.keys(material.uniforms ?? {}).filter(u => !/^(uTime|uWind|uBend|uCam|uFocus|uMpp|uLight|uFog|uHaze)/.test(u)).slice(0, 5).join(",") + "}"}`, e = (window.__by[k] ??= { tris: 0, calls: 0 });
          e.tris += n * (Number.isFinite(inst) ? inst : 1); e.calls++;
        };
      });
      await step(1);
      const by = await page.evaluate(() => { const r = window.witch.view.renderer; r.renderBufferDirect = r.__direct; return window.__by; });
      const time = () => page.evaluate(([F, NONE]) => { const w = window.witch, gl = w.view.renderer.getContext(), ms = []; for (let i = 0; i < F; i++) { const t0 = performance.now(); w.frame(NONE, 1 / 60, true); gl.finish(); ms.push(performance.now() - t0); } ms.sort((a, b) => a - b); return { p50: ms[ms.length >> 1], tris: w.view.renderer.info.render.triangles, calls: w.view.renderer.info.render.calls }; }, [FRAMES, NONE]);
      await time();
      const t = await time();
      // (and again with the trunks' shadows off, to see their share)
      const mode0 = await page.evaluate(() => { const T = window.witch.tuning.shadows.trunks, m = T.mode; T.mode = "off"; return m; });
      await step(4); await time(); t.noTrunks = (await time()).p50;
      await page.evaluate(m => { window.witch.tuning.shadows.trunks.mode = m; }, mode0); await step(4);
      const where = await page.evaluate(() => { const g = window.witch.game, w = g.witch, T = g.map.treehouse; return { x: Math.round(w.x - T.x), z: Math.round(w.z - T.z), mode: w.mode, home: [Math.round(T.x), Math.round(T.z)] }; });
      await page.screenshot({ path: path.join(outDir, `${spot}.png`), timeout: 300000 });
      const top = Object.entries(by).sort((a, b) => b[1].tris - a[1].tris).slice(0, 12).map(([k, e]) => ({ k, tris: Math.round(e.tris), calls: e.calls }));
      out.spots[spot] = { ...t, where, top };
      console.log(spot, JSON.stringify({ ms: +t.p50.toFixed(1), noTrunks: +t.noTrunks.toFixed(1), tris: t.tris, calls: t.calls, where }));
      for (const e of top) console.log(`   ${String(e.tris).padStart(8)}  ${e.calls}  ${e.k}`);
    }
  } finally {
    fs.writeFileSync(path.join(outDir, "home-view.json"), JSON.stringify(out, null, 1));
    console.log(errors.length ? "errors: " + errors.slice(0, 3).join(" | ") : "no page errors");
    await browser.close(); server.close();
  }
})();
