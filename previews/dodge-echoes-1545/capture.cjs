// QA capture for PR #1545 (dodge echoes preview, ?dodgeEchoes=1). Review tooling only, no game code.
// node previews/dodge-echoes-1545/capture.cjs   (after `npm run build`; serves dist/ on 127.0.0.1)
// For every capture point the same frame is drawn twice: echoes ON as the game drew it, then with the
// echo meshes hidden (OFF) and the view re-rendered at the same game time. Hiding is used rather than
// `view.dodgeEchoes.enabled = false` because disabling clears the live echoes (dodgeEchoModel.ts),
// which would make the next ON frame wrong; one scenario ("flag") checks enabled=false matches hidden.
const http = require("http"), fs = require("fs"), path = require("path");
const playwright = require("playwright");
const OUT = path.join(__dirname, "raw"), root = path.resolve(__dirname, "../../dist");
const SCENE = process.env.SCENE || "creature:fox@1", W = 960, H = 540;
const types = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".json": "application/json", ".png": "image/png", ".wasm": "application/wasm", ".woff2": "font/woff2", ".ogg": "audio/ogg" };
const t0 = Date.now(), log = (...a) => console.log(`[${((Date.now() - t0) / 1000).toFixed(0)} s]`, ...a);
fs.mkdirSync(OUT, { recursive: true });

(async () => {
  const server = http.createServer((req, res) => { const p = path.join(root, decodeURIComponent(new URL(req.url, "http://x").pathname)), f = fs.existsSync(p) && fs.statSync(p).isDirectory() ? path.join(p, "index.html") : p; if (!f.startsWith(root) || !fs.existsSync(f)) { res.writeHead(404); res.end(); return; } res.writeHead(200, { "Content-Type": types[path.extname(f)] || "application/octet-stream" }); fs.createReadStream(f).pipe(res); });
  await new Promise(r => server.listen(0, "127.0.0.1", r));
  const browser = await playwright.chromium.launch({ args: ["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist"] });
  const errors = [], meta = { scene: SCENE, frames: [] };
  try {
    const page = await browser.newPage({ viewport: { width: W, height: H } });
    page.setDefaultTimeout(120000);
    page.on("pageerror", e => errors.push(e.message));
    await page.addInitScript(() => {
      let s = 12345; Math.random = () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296);
      const iv = setInterval(() => { if (window.witch) { window.witch.manual = true; clearInterval(iv); } }, 1);
    });
    const link = `http://127.0.0.1:${server.address().port}/?shot=${encodeURIComponent(SCENE)}&seed=123&creator=0&dodgeEchoes=1`;
    log("loading", link.replace(/^http:\/\/[^/]+/, ""));
    await page.goto(link);
    await page.waitForFunction(() => window.witch && window.witch.ready, null, { timeout: 600000, polling: 500 });
    await page.evaluate(() => { window.witch.manual = true; });
    if (await page.evaluate(() => window.witch.game.clock.paused)) { await page.keyboard.press("Enter"); await page.waitForFunction(() => !window.witch.game.clock.paused, null, { timeout: 60000 }).catch(() => {}); }
    const said = await page.evaluate(s => window.witch.lastShot ?? window.witch.shot(s), SCENE);
    log("scene:", JSON.stringify(said));
    await page.evaluate(() => {
      const w = window.witch;
      w.qa = {
        c: (o = {}) => ({ moveX: 0, moveZ: 0, toggleMode: false, zoom: 0, ...o }),
        step(n, o = {}, draw = true) { for (let i = 0; i < n; i++) w.frame(w.qa.c(i === 0 ? o : { ...o, dash: false }), 1 / 60, draw && i === n - 1); },
        hide(on) { for (const b of w.view.dodgeEchoes.batches) for (const m of b.meshes) m.visible = !on; },
        rerender() { w.view.render(w.game.clock.time, true); },
        state() { const g = w.game, W0 = g.witches[0], e = w.view.dodgeEchoes; return { t: +g.clock.time.toFixed(4), x: +W0.body.x.toFixed(2), z: +W0.body.z.toFixed(2), facing: W0.body.facing, mode: W0.body.mode, dashAt: +W0.dash.at.toFixed?.(4), until: W0.dash.until, enabled: e.enabled, batches: e.batches.length, echoes: e.history.echoes.map(x => ({ x: +x.x.toFixed(2), z: +x.z.toFixed(2), born: +x.born.toFixed(3), alpha: +x.alpha.toFixed(3) })), paused: g.clock.paused, timeScale: g.timeScale }; },
      };
    });
    const ev = (f, a) => page.evaluate(f, a);
    // Art in.
    for (let round = 0, calm = 0; calm < 2 && round < 40; round++) {
      await ev(() => window.witch.qa.step(10));
      const p = await ev(() => window.witch.view.assets.pending);
      if (p === 0) { calm++; continue; } calm = 0;
      await page.waitForFunction(() => window.witch.view.assets.pending === 0, null, { timeout: 600000, polling: 500 });
      log(`art in (${p})`);
    }
    await ev(() => window.witch.qa.step(30));
    await page.screenshot({ path: path.join(OUT, "warmup.png") });
    log("warm", JSON.stringify(await ev(() => window.witch.qa.state())));
    if (process.env.PROBE) {
      await ev(() => window.witch.qa.step(3, { dash: true, moveX: -1 }));
      for (let i = 0; i < 5; i++) { await ev(() => window.witch.qa.rerender()); await page.screenshot({ path: path.join(OUT, `probe-${i}.png`) }); }
      await ev(() => { window.witch.view.dodgeEchoes.batches.forEach(b => b.meshes.forEach(m => m.visible = true)); });
      meta.probe = await ev(() => window.witch.view.dodgeEchoes.batches.map(b => ({ n: b.meshes.length, inScene: b.meshes.map(m => !!m.parent), visible: b.meshes.map(m => m.visible), count: b.mesh.count ?? b.mesh.geometry.instanceCount, u: b.mesh.material.uniforms.uSilhouette?.value })));
      return;
    }
    const shoot = async (name, note) => {
      const s = await ev(() => window.witch.qa.state());
      // (the frame stepped by witch.frame draws differently from a re-render at the same time; the probe showed re-renders are
      // identical to each other, so ON, OFF and ON2 are all re-renders)
      await ev(() => window.witch.qa.rerender());
      s.uniforms = await ev(() => window.witch.view.dodgeEchoes.batches.map(b => +b.mesh.material.uniforms.uSilhouette.value.w.toFixed(3)));
      await page.screenshot({ path: path.join(OUT, `${name}-on.png`) });
      await ev(() => { window.witch.qa.hide(true); window.witch.qa.rerender(); });
      await page.screenshot({ path: path.join(OUT, `${name}-off.png`) });
      await ev(() => { window.witch.qa.hide(false); window.witch.qa.rerender(); });
      await page.screenshot({ path: path.join(OUT, `${name}-on2.png`) }); // idempotence: re-render ON at the same time
      meta.frames.push({ name, note, state: s }); log(name, JSON.stringify(s));
    };
    const settle = () => ev(() => window.witch.qa.step(90)); // > 1 s: cooldown back, old echoes gone
    const restoreAt = async () => { await ev(s => window.witch.shot(s), SCENE); await ev(() => window.witch.qa.step(30)); };

    // a. single sideways dodge (west, away from the fox), 0.05 / 0.15 / 0.30 s after.
    await restoreAt(); await shoot("a-before", "frame before the dodge");
    await ev(() => window.witch.qa.step(3, { dash: true, moveX: -1 }));   // dash on frame 1, +2 frames = 0.033 s
    await shoot("a-0.05", "~0.05 s after dodge (3 frames)");
    await ev(() => window.witch.qa.step(6)); await shoot("a-0.15", "~0.15 s after dodge (9 frames)");
    await ev(() => window.witch.qa.step(9)); await shoot("a-0.30", "~0.30 s after dodge (18 frames)");
    await ev(() => window.witch.qa.step(6)); await shoot("a-0.40", "~0.40 s after: echoes should have expired (life 0.32 s)");

    // b. a dodge that turns her: walk east for a moment (facing +1), then dodge west.
    await settle(); await restoreAt();
    await ev(() => window.witch.qa.step(20, { moveX: 1 }));
    await ev(() => window.witch.qa.step(4, { dash: true, moveX: -1 }));
    await shoot("b-turn-0.06", "walking east then dodge west (turn), ~0.06 s after");
    await ev(() => window.witch.qa.step(6)); await shoot("b-turn-0.16", "turn, ~0.16 s after");

    // c1. three dodges in a row at the real cooldown (1 s): each one's echoes alone.
    await settle(); await restoreAt();
    for (let i = 0; i < 3; i++) { await ev(() => window.witch.qa.step(4, { dash: true, moveZ: 1 })); await shoot(`c1-dodge${i + 1}`, `dodge ${i + 1} of 3 south at real cooldown, ~0.06 s after`); await ev(() => window.witch.qa.step(58, { moveZ: 1 })); }
    // c2. three rapid dodges with the cooldown lowered to 0.1 s for the test (tuning, in page only).
    await settle(); await restoreAt();
    const cool = await ev(() => { const t = window.witch.tuning, was = t.dash.cooldown; t.dash.cooldown = 0.1; return was; });
    for (let i = 0; i < 3; i++) { await ev(() => window.witch.qa.step(8, { dash: true, moveX: -1 })); await ev(() => window.witch.qa.step(1, { moveX: -1 })); }
    await shoot("c2-rapid3", "three dodges west 0.15 s apart (cooldown lowered to 0.1 s in-page)");
    await ev(() => window.witch.qa.step(9, { moveX: -1 })); await shoot("c2-rapid3-later", "0.15 s after the third");
    await ev(c => { window.witch.tuning.dash.cooldown = c; }, cool);

    // d. camera moving during echoes: dodge north, then keep walking north (camera follows her).
    await settle(); await restoreAt();
    await ev(() => window.witch.qa.step(3, { dash: true, moveZ: -1 }));
    await shoot("d-cam-0", "dodge north, 0.05 s after");
    await ev(() => window.witch.qa.step(8, { moveZ: -1 })); await shoot("d-cam-1", "walking north (camera moving), 0.18 s after");
    await ev(() => window.witch.qa.step(6, { moveZ: -1 })); await shoot("d-cam-2", "walking north (camera moving), 0.28 s after");

    // e. occlusion: dodge east, through/past the fox standing 6 m east.
    await settle(); await restoreAt();
    await ev(() => window.witch.qa.step(3, { dash: true, moveX: 1 }));
    await shoot("e-fox-0.05", "dodge east past the fox (6 m east), 0.05 s after");
    await ev(() => window.witch.qa.step(6)); await shoot("e-fox-0.15", "0.15 s after");

    // f. pause during echoes, then resume.
    await settle(); await restoreAt();
    await ev(() => window.witch.qa.step(4, { dash: true, moveX: -1 }));
    await shoot("f-prepause", "0.06 s after dodge, before pause");
    await ev(() => { const g = window.witch.game; g.clock.paused = true; window.witch.qa.step(60); });
    await shoot("f-paused-1s", "clock paused, 60 frames (1 s real) stepped");
    await ev(() => { window.witch.game.clock.paused = false; window.witch.qa.step(6); });
    await shoot("f-resumed-0.1", "resumed, +6 frames");
    await ev(() => window.witch.qa.step(18)); await shoot("f-resumed-0.4", "resumed, +24 frames: should be expired");

    // flag: enabled=false vs hidden meshes, same dodge.
    await settle(); await restoreAt();
    await ev(() => window.witch.qa.step(3, { dash: true, moveX: -1 }));
    await ev(() => { window.witch.view.dodgeEchoes.enabled = false; window.witch.qa.rerender(); });
    await page.screenshot({ path: path.join(OUT, "flag-disabled.png") });
    meta.flag = await ev(() => window.witch.qa.state());
    await ev(() => { window.witch.view.dodgeEchoes.enabled = true; window.witch.qa.hide(true); window.witch.qa.rerender(); });
    await page.screenshot({ path: path.join(OUT, "flag-hidden.png") });
    await ev(() => window.witch.qa.hide(false));
    meta.gpu = await ev(() => { const r = window.witch.view.renderer; const gl = r?.getContext?.(); const d = gl?.getExtension("WEBGL_debug_renderer_info"); return d ? gl.getParameter(d.UNMASKED_RENDERER_WEBGL) : null; }).catch(() => null);
    meta.version = await (await page.request.get(link.replace(/\/\?.*$/, "/version.json"))).json();
  } finally { meta.errors = errors; meta.seconds = (Date.now() - t0) / 1000; fs.writeFileSync(path.join(__dirname, "capture.json"), JSON.stringify(meta, null, 1)); await browser.close(); server.close(); }
  log("done", errors.length ? `errors: ${errors.join(" | ")}` : "no page errors");
})().catch(e => { console.error(e.stack || e); process.exit(1); });
