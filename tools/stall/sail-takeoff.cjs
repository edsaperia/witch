// The sail take-off check, counting the shader programs made when she takes off from the treehouse after a sail by the map table's
// chart. Ed, 2026-11-12, live v7872: "Just had a very long freeze when taking off from the treehouse after a sail"
// (tools/stall/SAIL-TAKEOFF.md). Loads home seed 81808, sails from the map table's chart to raven seed 864794 (the dive
// path, not window.witch.sail(), which takes the full warm-up path), arrives, wakes and takes off from the treehouse; records,
// frame by frame from the take-off on: the frame's time, the shader programs three added (renderer.info.programs), the textures
// it allocated (renderer.info.memory.textures) and the time spent in the GL calls that compile, link, query or upload.
//
//   node tools/stall/sail-takeoff.cjs <dist> [out.json]       (after npm run build)
//   CONTROL=1   the same take-off on a fresh load, no sail
//   PROFILE=1   a CPU profile of the take-off, next to out.json (.cpuprofile)
//   PROFILE_SAIL=1   a CPU profile of the sail, from the hand-off on to 20 s after the first frame on the island (-sail.cpuprofile)
//   CHECK=1     fail (exit 1) if the take-off (from Space to 20 frames in the treetops) adds any shader program: the guard
//
// Programs added at take-off are the measure, not milliseconds: on the cloud's software renderer every frame takes seconds, so
// a frame's time doesn't tell a compile from an ordinary draw; a program made at take-off is a compile on the main thread there,
// on any machine (5.4 s of Ed's Intel UHD). Takes 8 to 15 minutes on the cloud's machine.
const http = require("http"), fs = require("fs"), path = require("path");
const playwright = require("playwright");
const [distArg, outArg = "sail-takeoff.json"] = process.argv.slice(2);
if (!distArg) { console.error("usage: node tools/stall/sail-takeoff.cjs <dist> [out.json]"); process.exit(2); }
const root = path.resolve(distArg);
const PROFILE_SAIL = process.env.PROFILE_SAIL === "1", PROFILE = process.env.PROFILE === "1", CONTROL = process.env.CONTROL === "1", CHECK = process.env.CHECK === "1";
const types = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".json": "application/json", ".png": "image/png", ".wasm": "application/wasm", ".woff2": "font/woff2", ".ttf": "font/ttf", ".ogg": "audio/ogg", ".svg": "image/svg+xml" };
const t0 = Date.now(), log = (...a) => console.log(`[${((Date.now() - t0) / 1000).toFixed(1)} s]`, ...a);
(async () => {
  const server = http.createServer((req, res) => { const p = path.join(root, decodeURIComponent(new URL(req.url, "http://x").pathname)), f = fs.existsSync(p) && fs.statSync(p).isDirectory() ? path.join(p, "index.html") : p; if (!f.startsWith(root) || !fs.existsSync(f)) { res.writeHead(404); res.end(); return; } res.writeHead(200, { "Content-Type": types[path.extname(f)] || "application/octet-stream" }); fs.createReadStream(f).pipe(res); });
  await new Promise(r => server.listen(0, "127.0.0.1", r));
  const base = `http://127.0.0.1:${server.address().port}`;
  const browser = await playwright.chromium.launch({ args: ["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist"] });
  const result = { control: CONTROL, errors: [] };
  let failed = false;
  try {
    const page = await browser.newPage({ viewport: { width: 640, height: 360 } });
    page.on("pageerror", e => result.errors.push(e.message));
    page.on("console", m => { if (m.type() === "error") result.errors.push(m.text().slice(0, 300)); });
    await page.addInitScript(() => {
      try { localStorage.setItem("witch.chart.sailAnywhere", "1"); } catch { /* */ }
      const w = window;
      w.__long = []; try { new PerformanceObserver(l => { for (const e of l.getEntries()) w.__long.push([Math.round(e.startTime), Math.round(e.duration)]); }).observe({ type: "longtask", buffered: true }); } catch { /* */ }
      // The GL calls that compile, link, wait on a program or upload a texture: their count and time, summed (read a frame at a time).
      const gl = w.__gl = { n: {}, ms: {} };
      const names = ["compileShader", "linkProgram", "getProgramParameter", "getShaderParameter", "getProgramInfoLog", "getShaderInfoLog", "getUniformLocation", "getActiveUniform", "texImage2D", "texSubImage2D", "texStorage2D", "compressedTexImage2D", "texImage3D", "texSubImage3D", "texStorage3D"];
      for (const P of [w.WebGL2RenderingContext?.prototype, w.WebGLRenderingContext?.prototype]) if (P) for (const name of names) {
        const f = P[name]; if (typeof f !== "function") continue;
        P[name] = function (...a) { const s = performance.now(); try { return f.apply(this, a); } finally { gl.n[name] = (gl.n[name] ?? 0) + 1; gl.ms[name] = (gl.ms[name] ?? 0) + performance.now() - s; } };
      }
    });
    await page.goto(`${base}/?seed=81808&creator=0&debug&set=treeNormals=%2232%22`);
    for (let i = 0; ; i++) { const s = await page.evaluate(() => ({ witch: !!window.witch, ready: !!window.witch?.ready })); if (s.ready) break; if (i % 6 === 0) log("waiting", JSON.stringify(s)); await page.waitForTimeout(5000); }
    for (let i = 0; i < 60 && await page.evaluate(() => window.witch.game.clock.paused); i++) { await page.keyboard.press("Enter"); await page.waitForTimeout(2000); }
    log("home running", await page.evaluate(() => !window.witch.game.clock.paused));
    await page.waitForTimeout(3000);
    const st = () => page.evaluate(() => { const g = window.witch.game, w = g.witch, R = window.witch.view.renderer; return { seed: g.seed, t: +g.clock.time.toFixed(2), mode: w.mode, perch: !!w.perch, paused: g.clock.paused, programs: R.info.programs.length, textures: R.info.memory.textures }; });
    if (!CONTROL) {
      await page.evaluate(() => window.witch.chart("mapTable"));
      await page.waitForFunction(() => window.chart?.islands?.().some(x => x.id === "raven"), null, { timeout: 600000, polling: 250 });
      await page.evaluate(() => { const b = document.querySelector("#chart-overlay button.sail-any"); if (b && b.getAttribute("aria-pressed") !== "true") b.click(); });
      await page.evaluate(async () => { const r = Math.random; Math.random = () => 0.8647945; try { window.chart.choose("raven"); } finally { Math.random = r; } await new Promise(r => setTimeout(r, 1500)); });
      await page.waitForFunction(() => window.chart?.islands?.().find(x => x.id === "raven" && x.outline && x.sail), null, { timeout: 600000, polling: 250 });
      await page.evaluate(() => document.activeElement?.blur?.());
      await page.evaluate(() => new Promise(done => { let last = performance.now(), run = 0; const until = last + 120000; const f = now => { run = now - last < 400 ? run + 1 : 0; last = now; if (run >= 10 || now > until) done(); else requestAnimationFrame(f); }; requestAnimationFrame(f); }));
      log("holding Enter on raven");
      result.sailFrom = await page.evaluate(() => { window.__long.length = 0; return Math.round(performance.now()); });
      const sailCdp = PROFILE_SAIL ? await page.context().newCDPSession(page) : null;
      if (sailCdp) { await sailCdp.send("Profiler.enable"); await sailCdp.send("Profiler.setSamplingInterval", { interval: 1000 }); await sailCdp.send("Profiler.start"); }
      const ts = Date.now(); let sailed = null;
      await page.keyboard.down("Enter");
      while (Date.now() - ts < 180000 && (sailed === null || Date.now() - sailed < 1000)) { await page.keyboard.down("Enter"); if (await page.evaluate(() => !!window.chart?.chart?.flight).catch(() => false)) sailed ??= Date.now(); await page.waitForTimeout(33); }
      await page.keyboard.up("Enter");
      log(sailed ? "sailed" : "never sailed");
      await page.waitForFunction(() => window.witch?.game?.seed === 864794 && !document.getElementById("chart-overlay"), null, { timeout: 1800000, polling: 1000 });
      log("night is raven 864794, chart gone");
      if (sailCdp) {
        await page.waitForFunction(() => { const f = performance.getEntriesByName("game:frame1").at(-1); return f && performance.now() - f.startTime > 20000; }, null, { timeout: 1800000, polling: 1000 }).catch(() => {});
        const { profile } = await sailCdp.send("Profiler.stop"); fs.writeFileSync(outArg.replace(/\.json$/, "") + "-sail.cpuprofile", JSON.stringify(profile)); log("sail profiled");
      }
      await page.waitForFunction(() => performance.getEntriesByName("game:arrived").length > 0, null, { timeout: 1800000, polling: 1000 });
      log("arrived", JSON.stringify(await st()));
      await page.keyboard.down("KeyD");
      await page.waitForFunction(() => !window.witch.game.wake || !!window.witch.game.wake.open, null, { timeout: 600000, polling: 200 }).catch(() => {});
      await page.keyboard.up("KeyD");
      log("woke", JSON.stringify(await st()));
      // Ed took off 80 s after arriving: the house, its forest and the tufts long built, the background compiles done.
      await page.waitForFunction(() => performance.getEntriesByName("landing:house-complete").length > 0 && performance.getEntriesByName("witch:tufts-in").length > 0, null, { timeout: 900000, polling: 1000 }).catch(() => log("house or tufts never done"));
      // (and the warm-up after the house, its second pass, after the tufts: render/view/readiness.ts warmAfterHouse)
      await page.waitForFunction(() => { const t = performance.getEntriesByName("witch:tufts-in").at(-1)?.startTime ?? Infinity; return performance.getEntriesByName("witch:prep-after-house").some(m => m.startTime >= t); }, null, { timeout: 300000, polling: 1000 }).catch(() => log("no warm-up after the house seen"));
      result.afterHouse = await page.evaluate(() => performance.getEntriesByName("witch:prep-after-house").map(m => ({ at: Math.round(m.startTime), ...m.detail })));
      log("warm-ups after the house", JSON.stringify(result.afterHouse));
      result.sailLong = await page.evaluate(() => window.__long.slice());
      result.marks = await page.evaluate(() => performance.getEntriesByType("mark").filter(m => /^(chart|witch|game|sail|dive|landing):/.test(m.name)).map(m => [m.name, Math.round(m.startTime)]));
    }
    // settle: as Ed's 8 s of play
    await page.evaluate(() => new Promise(r => { let n = 0; const f = () => (++n >= 30 ? r() : requestAnimationFrame(f)); requestAnimationFrame(f); }));
    result.before = await st();
    // What will compile when it's first drawn: every material in the scene (hidden ones too) with no program made yet.
    result.uncompiled = await page.evaluate(() => { const v = window.witch.view, R = v.renderer, out = [];
      v.scene.traverse(o => { for (const m of [].concat(o.material ?? [])) { const p = R.properties.get(m); if (!p.currentProgram && !(p.programs && p.programs.size)) out.push(`${o.name || o.type}${o.visible ? "" : " (hidden)"}: ${m.name || m.type}`); } });
      return [...new Set(out)]; });
    log("uncompiled materials", result.uncompiled.length, JSON.stringify(result.uncompiled.slice(0, 20)));
    log("before take-off", JSON.stringify(result.before));
    const cdp = await page.context().newCDPSession(page);
    if (PROFILE) { await cdp.send("Profiler.enable"); await cdp.send("Profiler.setSamplingInterval", { interval: 500 }); await cdp.send("Profiler.start"); }
    await page.evaluate(() => {
      window.__long.length = 0; const R = window.witch.view.renderer, gl = window.__gl, F = window.__frames = [];
      const snap = () => ({ at: performance.now(), programs: R.info.programs.length, textures: R.info.memory.textures, n: { ...gl.n }, ms: { ...gl.ms } });
      let last = snap(), known = new Set(R.info.programs);
      // (each new program named by the draw that made it: the object, its parents and its material, wherever it's drawn from)
      const madeBy = new Map(), draw = R.renderBufferDirect, seen = new Set(); window.witch.view.scene.traverse(o => seen.add(o));
      R.renderBufferDirect = function (camera, scene, geometry, material, object, group) {
        const r = draw.apply(this, arguments), p = R.properties.get(material).currentProgram;
        if (p && !known.has(p) && !madeBy.has(p)) { const chain = []; for (let o = object; o && chain.length < 5; o = o.parent) chain.push(o.name || o.type); madeBy.set(p, `${chain.join(" < ")} #${object.id} ${geometry.type}${seen.has(object) ? "" : " (not in the scene before)"} ${object.renderOrder}: ${material.name || material.type}${material.transparent ? " transparent" : ""}${material.depthTest ? "" : " noDepth"} side ${material.side} col ${material.color?.getHexString?.() ?? ""}${material.alphaTest ? ` alphaTest ${material.alphaTest}` : ""}${material.map ? " map" : ""} (scene ${scene?.name || scene?.type}, ${p.name || "?"} ${String(p.cacheKey ?? "").slice(0, 160)})`); window.__madeKeys.push(String(p.cacheKey)); }
        return r;
      };
      window.__madeKeys = []; window.__keysBefore = R.info.programs.map(p => String(p.cacheKey));
      window.__restoreDraw = () => { R.renderBufferDirect = draw; };
      const named = () => { const out = []; for (const p of R.info.programs) if (!known.has(p)) { known.add(p); out.push(madeBy.get(p) ?? `${p.name || "?"} (not drawn) ${String(p.cacheKey ?? "").slice(0, 160)}`); } return out; };
      const f = () => { const s = snap(), d = {}; for (const k in s.ms) { const dn = s.n[k] - (last.n[k] ?? 0); if (dn) d[k] = [dn, Math.round(s.ms[k] - (last.ms[k] ?? 0))]; }
        F.push({ at: Math.round(last.at), ms: Math.round(s.at - last.at), mode: window.witch.game.witch.mode, programs: s.programs - last.programs, made: s.programs !== last.programs ? named() : undefined, textures: s.textures - last.textures, gl: d }); last = s;
        if (F.length < 400 && !window.__stopFrames) requestAnimationFrame(f); };
      requestAnimationFrame(f);
    });
    await page.keyboard.press("Space");
    const tp = Date.now();
    await page.waitForFunction(() => window.witch.game.witch.mode === "treetop", null, { timeout: 900000, polling: 100 }).catch(() => {});
    log("treetop after", ((Date.now() - tp) / 1000).toFixed(1), "s");
    await page.evaluate(() => new Promise(r => { let n = 0; const f = () => (++n >= 20 ? r() : requestAnimationFrame(f)); requestAnimationFrame(f); }));
    await page.evaluate(() => { window.__stopFrames = true; window.__restoreDraw?.(); });
    if (PROFILE) { const { profile } = await cdp.send("Profiler.stop"); fs.writeFileSync(outArg.replace(/\.json$/, "") + ".cpuprofile", JSON.stringify(profile)); }
    const frames = await page.evaluate(() => window.__frames);
    // (each program made at take-off beside the nearest program there was before it: what differs in three's cache key)
    result.keyDiffs = await page.evaluate(() => window.__madeKeys.map(k => { const a = k.split(","); let best = null;
      for (const b of window.__keysBefore.map(x => x.split(","))) { if (b.length !== a.length || b[0] !== a[0]) continue; const d = a.map((v, i) => v === b[i] ? null : `${i}: ${b[i]} -> ${v}`).filter(Boolean); if (!best || d.length < best.length) best = d; }
      return { key: k.slice(0, 120), nearest: best }; }));
    result.after = await st();
    const sum = (k) => frames.reduce((a, f) => a + f[k], 0);
    const glms = frames.reduce((a, f) => { for (const [k, [n, ms]] of Object.entries(f.gl)) { a[k] = a[k] ?? [0, 0]; a[k][0] += n; a[k][1] += ms; } return a; }, {});
    result.takeoff = { reachedTreetop: result.after.mode === "treetop", programsAdded: sum("programs"), texturesAdded: sum("textures"), gl: glms,
      worstFrame: frames.reduce((a, f) => (f.ms > a.ms ? f : a), { ms: 0 }), long: await page.evaluate(() => window.__long.slice()), frames };
    log("take-off: programs added", result.takeoff.programsAdded, "textures", result.takeoff.texturesAdded, "worst frame", JSON.stringify(result.takeoff.worstFrame), "gl", JSON.stringify(glms));
    if (CHECK && (!result.takeoff.reachedTreetop || result.takeoff.programsAdded > 0)) { failed = true; console.error(`FAIL: the take-off ${result.takeoff.reachedTreetop ? `compiled ${result.takeoff.programsAdded} shader program(s) on the main thread` : "never reached the treetops"}`); }
  } catch (e) { console.error(e); result.errors.push(String(e)); failed = true; }
  finally { fs.writeFileSync(outArg, JSON.stringify(result, null, 1)); await browser.close(); server.close(); process.exit(failed && CHECK ? 1 : 0); }
})();
