// Diagnostic only (in-page, no game code change): after one dodge, force the live echo to opaque red,
// then also with depthTest off, and record where (if anywhere) it lands. node diag.cjs
const http = require("http"), fs = require("fs"), path = require("path"), playwright = require("playwright");
const OUT = path.join(__dirname, "raw"), root = path.resolve(__dirname, "../../dist");
const types = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".json": "application/json", ".png": "image/png", ".wasm": "application/wasm" };
(async () => {
  const server = http.createServer((req, res) => { const p = path.join(root, decodeURIComponent(new URL(req.url, "http://x").pathname)), f = fs.existsSync(p) && fs.statSync(p).isDirectory() ? path.join(p, "index.html") : p; if (!f.startsWith(root) || !fs.existsSync(f)) { res.writeHead(404); res.end(); return; } res.writeHead(200, { "Content-Type": types[path.extname(f)] || "application/octet-stream" }); fs.createReadStream(f).pipe(res); });
  await new Promise(r => server.listen(0, "127.0.0.1", r));
  const browser = await playwright.chromium.launch({ args: ["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist"] });
  const out = {};
  try {
    const page = await browser.newPage({ viewport: { width: 960, height: 540 } }); page.setDefaultTimeout(120000);
    await page.addInitScript(() => { let s = 12345; Math.random = () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296); const iv = setInterval(() => { if (window.witch) { window.witch.manual = true; clearInterval(iv); } }, 1); });
    await page.goto(`http://127.0.0.1:${server.address().port}/?shot=at:3208,2856&seed=123&creator=0&dodgeEchoes=1`);
    await page.waitForFunction(() => window.witch && window.witch.ready, null, { timeout: 600000, polling: 500 });
    if (await page.evaluate(() => window.witch.game.clock.paused)) { await page.keyboard.press("Enter"); await page.waitForFunction(() => !window.witch.game.clock.paused).catch(() => {}); }
    const step = (n, o = {}) => page.evaluate(([n, o]) => { const w = window.witch; for (let i = 0; i < n; i++) w.frame({ moveX: 0, moveZ: 0, toggleMode: false, zoom: 0, ...(i ? { ...o, dash: false } : o) }, 1 / 60, i === n - 1); }, [n, o]);
    for (let i = 0; i < 12; i++) { await step(10); await page.waitForFunction(() => window.witch.view.assets.pending === 0, null, { timeout: 600000, polling: 500 }); }
    await step(30);
    await step(3, { dash: true, moveX: -1 });
    const info = () => page.evaluate(() => { const w = window.witch, e = w.view.dodgeEchoes, b = e.batches[0]; if (!b) return null; const m = b.mesh, u = m.material.uniforms;
      return { echoes: e.history.echoes.length, frustumCulled: m.frustumCulled, visible: m.visible, renderOrder: m.renderOrder, layers: m.layers.mask, camLayers: w.view.camera.layers.mask, parentIsScene: m.parent === w.view.scene, count: m.count ?? m.geometry.instanceCount, drawRange: m.geometry.drawRange, uSil: u.uSilhouette.value, uAbsolute: u.uAbsolute.value, uUnlit: u.uUnlit.value, uAppear: u.uAppear?.value, uArrivalFade: u.uArrivalFade?.value, uFadePass: u.uFadePass.value, uHasFade: u.uHasFade.value, uWholeCull: u.uWholeCull?.value, transparent: m.material.transparent, depthTest: m.material.depthTest, blending: m.material.blending, witchMesh: (() => { const wm = w.view.witchBatch?.mesh; if (!wm) return null; const wu = wm.material.uniforms; return { uAbsolute: wu.uAbsolute.value, uAppear: wu.uAppear?.value, uArrivalFade: wu.uArrivalFade?.value, renderOrder: wm.renderOrder, layers: wm.layers.mask, transparent: wm.material.transparent }; })() }; });
    out.before = await info();
    const shot = async n => { await page.evaluate(() => window.witch.view.render(window.witch.game.clock.time, true)); await page.screenshot({ path: path.join(OUT, `diag-${n}.png`) }); };
    await page.evaluate(() => window.witch.view.dodgeEchoes.batches.forEach(b => b.meshes.forEach(m => m.visible = false))); await shot("hidden");
    await page.evaluate(() => window.witch.view.dodgeEchoes.batches.forEach(b => b.meshes.forEach(m => m.visible = true))); await shot("asis");
    // force the uniform each render by patching DodgeEchoView.update's result for this test: override after update via onBeforeRender
    await page.evaluate(() => window.witch.view.dodgeEchoes.batches.forEach(b => { b.mesh.onBeforeRender = (r, s, c, g, mat) => { mat.uniforms.uSilhouette.value.set(1, 0, 0, 1); }; }));
    for (const a of [0.19, 0.3, 0.45, 0.5, 0.55, 0.75]) { await page.evaluate(a => window.witch.view.dodgeEchoes.batches.forEach(b => { b.mesh.onBeforeRender = (r, s, c, g, mat) => { mat.uniforms.uSilhouette.value.set(0.4, 0.4, 0.85, a); }; }), a); await shot(`alpha-${a}`); }
    await page.evaluate(() => window.witch.view.dodgeEchoes.batches.forEach(b => { b.mesh.onBeforeRender = (r, s, c, g, mat) => { mat.uniforms.uSilhouette.value.set(1, 0, 0, 1); }; }));
    await shot("red");
    await page.evaluate(() => window.witch.view.dodgeEchoes.batches.forEach(b => { b.mesh.material.depthTest = false; b.mesh.frustumCulled = false; }));
    await shot("red-nodepth");
    out.after = await info();
  } finally { fs.writeFileSync(path.join(__dirname, "diag.json"), JSON.stringify(out, null, 1)); await browser.close(); server.close(); }
})().catch(e => { console.error(e.stack || e); process.exit(1); });
