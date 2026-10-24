// What the great oak's crown costs to draw (render/crown.ts, its lights in render/strings.ts, its far landmark in
// render/crownLandmark.ts; the coordinator's ask, 2026-10-24: "Measure the cost ... at the treehouse, inside and out ... keep it lean").
// At each scene (app/shot.ts: by default outside in the treetops just south of the house, inside in the Parlour, and far off with
// the landmark up), one page: the frames stepped at a fixed 1/60 s with the crown drawn, then with every crown mesh hidden by its
// layers (the view resets .visible, never the layers), then drawn again; each frame's own work (view.ms by part), the scene pass,
// the draw calls and triangles, and the GPU's time for each crown draw call by itself (EXT_disjoint_timer_query_webgl2: on the cloud's
// software renderer, shares, not milliseconds).
//   npm run build && node tools/bench/crown-cost.cjs [out.json]   (DIST=, SEED=123, SCENES=a|b|c, FRAMES=60, SIZE=1280x720)
const http = require("http"), fs = require("fs"), path = require("path");
let playwright; try { playwright = require("playwright"); } catch { playwright = require("/opt/node22/lib/node_modules/playwright"); }
const root = path.resolve(process.env.DIST || path.join(__dirname, "../../dist"));
const SEED = process.env.SEED || "123", FRAMES = Number(process.env.FRAMES || 60), [W, H] = (process.env.SIZE || "1280x720").split("x").map(Number);
const SCENES = (process.env.SCENES || "at:3208,2840,treetop|room:parlour|at:3208,3290,treetop").split("|");
const types = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".json": "application/json", ".png": "image/png", ".wasm": "application/wasm", ".woff2": "font/woff2", ".ogg": "audio/ogg" };
const med = a => { const s = [...a].sort((x, y) => x - y); return s.length ? s[Math.floor(s.length / 2)] : 0; };

(async () => {
  const server = http.createServer((req, res) => { const p = path.join(root, decodeURIComponent(new URL(req.url, "http://x").pathname)), f = fs.existsSync(p) && fs.statSync(p).isDirectory() ? path.join(p, "index.html") : p; if (!f.startsWith(root) || !fs.existsSync(f)) { res.writeHead(404); res.end(); return; } res.writeHead(200, { "Content-Type": types[path.extname(f)] || "application/octet-stream" }); fs.createReadStream(f).pipe(res); });
  await new Promise(r => server.listen(0, "127.0.0.1", r));
  const browser = await playwright.chromium.launch({ args: ["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist"] });
  const out = {};
  try {
    for (const scene of SCENES) {
      const page = await browser.newPage({ viewport: { width: W, height: H } });
      const errors = []; page.on("pageerror", e => errors.push(e.message));
      await page.goto(`http://127.0.0.1:${server.address().port}/?shot=${encodeURIComponent(scene)}&seed=${SEED}`);
      await page.waitForFunction(() => window.witch && window.witch.ready, null, { timeout: 900000, polling: 500 });
      await page.evaluate(() => { window.witch.manual = true; });
      if (await page.evaluate(() => window.witch.game.clock.paused)) { await page.keyboard.press("Enter"); await page.waitForFunction(() => !window.witch.game.clock.paused, null, { timeout: 60000 }).catch(() => {}); }
      const said = await page.evaluate(s => window.witch.lastShot ?? window.witch.shot(s), scene);
      if (!said.ok) throw new Error(said.say);
      const step = n => page.evaluate(n => { const w = window.witch; for (let i = 0; i < n; i++) w.frame({ moveX: 0, moveZ: 0, toggleMode: false, zoom: 0 }, 1 / 60, true); }, n);
      for (let round = 0, calm = 0; calm < 2 && round < 40; round++) { await step(10); if ((await page.evaluate(() => window.witch.view.assets.pending)) === 0) { calm++; continue; } calm = 0; await page.waitForFunction(() => window.witch.view.assets.pending === 0, null, { timeout: 900000, polling: 500 }); }
      // (each crown draw call timed on the GPU by itself; the rest of the frame as the view counts it)
      await page.evaluate(() => {
        const v = window.witch.view, r = v.renderer, gl = r.getContext(), ext = gl.getExtension("EXT_disjoint_timer_query_webgl2");
        window.__m = { gpu: {}, pending: [] };
        if (!ext) return;
        window.witch.frameStats.ext = null;
        const direct = r.renderBufferDirect.bind(r);
        r.renderBufferDirect = (camera, sc, geometry, material, object, group) => {
          if (!/^crown/.test(object.name)) return direct(camera, sc, geometry, material, object, group);
          const q = gl.createQuery(); gl.beginQuery(ext.TIME_ELAPSED_EXT, q); direct(camera, sc, geometry, material, object, group); gl.endQuery(ext.TIME_ELAPSED_EXT);
          window.__m.pending.push({ q, key: `${object.name} ${object.type}${geometry.isInstancedBufferGeometry ? ` i${geometry.instanceCount}` : ""}` });
        };
      });
      const measure = async label => {
        const rows = [];
        for (let i = 0; i < FRAMES; i++) {
          rows.push(await page.evaluate(() => {
            const w = window.witch, v = w.view, t0 = performance.now();
            w.frame({ moveX: 0, moveZ: 0, toggleMode: false, zoom: 0 }, 1 / 60, true);
            const r = v.renderer, gl = r.getContext(), ext = gl.getExtension("EXT_disjoint_timer_query_webgl2"), M = window.__m;
            if (ext) while (M.pending.length && gl.getQueryParameter(M.pending[0].q, gl.QUERY_RESULT_AVAILABLE)) { const e = M.pending.shift(), ns = gl.getQueryParameter(e.q, gl.QUERY_RESULT); gl.deleteQuery(e.q); (M.gpu[e.key] ??= []).push(ns / 1e6); }
            return { wall: performance.now() - t0, draw: v.ms.draw ?? 0, scene: v.post?.sceneMs ?? 0, calls: r.info.render.calls, tris: r.info.render.triangles };
          }));
        }
        const gpu = await page.evaluate(() => { const g = window.__m.gpu, o = {}; for (const [k, a] of Object.entries(g)) { const s = [...a].sort((x, y) => x - y); o[k] = +s[Math.floor(s.length / 2)].toFixed(2); } window.__m.gpu = {}; return o; });
        return { label, wall: +med(rows.map(r => r.wall)).toFixed(1), draw: +med(rows.map(r => r.draw)).toFixed(1), scene: +med(rows.map(r => r.scene)).toFixed(1), calls: med(rows.map(r => r.calls)), tris: med(rows.map(r => r.tris)), gpu };
      };
      // (hidden by .visible: nothing of the view sets it on the crown's own meshes, nor the landmark's while it's hidden; the layers are
      // enabled again each frame indoors, render/view.ts behindHouse)
      const hide = on => page.evaluate(on => { const v = window.witch.view; window.__crownOff = !on; v.scene.traverse(o => { if (/^crown$/.test(o.name)) o.visible = on; }); const L = v.crownFar; if (L) { const u = L.update.bind(L); L.update = (...a) => { u(...a); if (window.__crownOff) for (const m of L.meshes) m.visible = false; }; } }, on);
      await step(20);
      const a = await measure("crown"); await hide(false); await step(5); const b = await measure("no crown"); await hide(true); await step(5); const c = await measure("crown again");
      // AB=1: on and off in pairs of frames (outside, a heavy frame comes every other frame whatever is drawn, so single frames
      // alternating put all the heavy ones on one side) (the software renderer's frame times drift by seconds between runs of frames: alternating
      // cancels it), each hiding by its test: the whole crown, then each part alone
      const ab = [];
      if (process.env.AB) for (const [label, test] of [["whole crown", "true"], ["leaves", "o.isMesh && o.geometry.isInstancedBufferGeometry"], ["bark", "o.isMesh && !o.geometry.isInstancedBufferGeometry"], ["bulbs", "o.isPoints"], ["wire", "o.isLineSegments"]]) {
        const r = await page.evaluate(([test, n]) => {
          const f = new Function("o", "return " + test), w = window.witch, v = w.view, on = [], off = [];
          const set = vis => v.scene.traverse(o => { if (/^crown$/.test(o.name) && f(o)) o.visible = vis; });
          for (let i = 0; i < n * 2; i++) { const show = Math.floor(i / 2) % 2 === 0; set(show); const t0 = performance.now(); w.frame({ moveX: 0, moveZ: 0, toggleMode: false, zoom: 0 }, 1 / 60, true); v.renderer.getContext().finish(); (show ? on : off).push(performance.now() - t0); }
          set(true);
          const med = a => { const q = [...a].sort((x, y) => x - y); return q[Math.floor(q.length / 2)]; };
          return { on: +med(on).toFixed(1), off: +med(off).toFixed(1) };
        }, [test, FRAMES]);
        ab.push({ label, ...r }); console.log(`  A/B ${label.padEnd(12)} with ${r.on} ms, without ${r.off} ms: ${(r.on - r.off).toFixed(1)} ms`);
      }
      // PARTS=1: each part of it hidden alone (the leaves, the bark, the bulbs, the wire), to see which costs
      const parts = [];
      if (process.env.PARTS) for (const [label, test] of [["no leaves", "o.isMesh && o.geometry.isInstancedBufferGeometry"], ["no bark", "o.isMesh && !o.geometry.isInstancedBufferGeometry"], ["no bulbs", "o.isPoints"], ["no wire", "o.isLineSegments"]]) {
        await page.evaluate(test => { const f = new Function("o", "return " + test); window.witch.view.scene.traverse(o => { if (/^crown$/.test(o.name)) o.visible = !f(o); }); }, test);
        await step(5); parts.push(await measure(label));
        await page.evaluate(() => window.witch.view.scene.traverse(o => { if (/^crown$/.test(o.name)) o.visible = true; }));
      }
      const where = await page.evaluate(() => { const g = window.witch.game, w = g.witch, c = window.witch.view.crown; return { x: Math.round(w.x), z: Math.round(w.z), mode: w.mode, perch: !!w.perch, crown: c ? c.stats : null, indoors: c ? c.indoors : null, landmark: !!window.witch.view.crownFar?.quad.visible }; });
      out[scene] = { where, runs: [a, b, c, ...parts], ab, errors };
      console.log(`${scene}: ${JSON.stringify(where)}`);
      for (const r of [a, b, c, ...parts]) console.log(`  ${r.label.padEnd(12)} frame ${r.wall} ms (view draw ${r.draw}, scene pass ${r.scene}); ${r.calls} calls, ${r.tris} tris; crown on the GPU ${JSON.stringify(r.gpu)}`);
      if (errors.length) console.log("  page errors:", errors.join(" | "));
      await page.close();
    }
  } finally { await browser.close(); server.close(); }
  if (process.argv[2]) fs.writeFileSync(process.argv[2], JSON.stringify(out, null, 1));
})().catch(e => { console.error(e); process.exit(1); });
