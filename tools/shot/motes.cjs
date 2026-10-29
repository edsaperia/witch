// The sigils' motes, measured (the coordinator, 2026-10-29, from Ed: "Given current settings, the motes from sigils don't do much"):
// from the built game on the playtest's island, each kind of mote drawn on and off at the same moment, and what it adds to the
// drawn picture read off its pixels (the drawing buffer, as it's drawn), over a few moments of its motion:
//   embers   the embers rising off four sigils put down on the ground, a baby's to a legend's (leash.ranks.embers)
//   stack    the embers off the four in her stack over her hat (the same, times embers.stack)
//   burst    the motes rising as a sigil's put down (leash.placeMotes; render/leash/combat.ts "motes")
//   stone    the motes rising off the next wave's runestone (runeMarkers.awake motes, moteSize, moteBright, moteRise)
//   crowd    the embers off twenty sigils put down round her (the noise check: leash.ranks.embers.crowd)
// For each, under each look (before: the knobs as they were; after: the tuning's own): energy (the luminance the motes add, summed
// over the picture, in pixels at full white), px (how many pixels they lift by over 0.02) and peak (the 95th percentile of the lift
// over those pixels). Frames <out>/motes-<look>-<subject>.png, numbers <out>/motes.json.
//   npm run build && node tools/shot/motes.cjs [out dir]   (SEED=542195, LINK= more of the link, SIZE=1106x743, MOMENTS=6, DIST=dist,
//   ONLY=embers,stack,burst,stone,crowd)
const http = require("http"), fs = require("fs"), path = require("path");
let playwright; try { playwright = require("playwright"); } catch { playwright = require("/opt/node22/lib/node_modules/playwright"); }
const root = path.resolve(process.env.DIST || path.join(__dirname, "../../dist"));
const out = path.resolve(process.argv[2] || path.join(__dirname, "../../previews/shot/motes"));
const SEED = process.env.SEED || "542195", [W, H] = (process.env.SIZE || "1106x743").split("x").map(Number), MOMENTS = Number(process.env.MOMENTS ?? 6);
const LINK = process.env.LINK ?? "world=1268398697&island=ibex&found=squirrel,hedgehog&hat=none&creator=0";
const ONLY = (process.env.ONLY || "embers,stack,burst,stone,crowd").split(",");
// the knobs as they were before this pass (the look "before"; "after" is the build's own tuning)
const BEFORE = { embers: { count: [3, 5, 8, 12], size: [0.22, 0.26, 0.3, 0.36], rise: [1.6, 2.1, 2.8, 3.6], bright: 1, crowd: 0 }, placeMotes: { count: 16, size: 0.7, bright: 1, rise: 1, life: 1 }, awake: { motes: 8, moteBuild: 12, moteSize: 3, moteBright: 1, moteRise: 7 } };
const types = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".json": "application/json", ".png": "image/png", ".wasm": "application/wasm", ".woff2": "font/woff2", ".ogg": "audio/ogg" };
const t0 = Date.now(), log = (...a) => console.log(`[${((Date.now() - t0) / 1000).toFixed(0)} s]`, ...a);

(async () => {
  fs.mkdirSync(out, { recursive: true });
  const server = http.createServer((req, res) => { const p = path.join(root, decodeURIComponent(new URL(req.url, "http://x").pathname)), f = fs.existsSync(p) && fs.statSync(p).isDirectory() ? path.join(p, "index.html") : p; if (!f.startsWith(root) || !fs.existsSync(f)) { res.writeHead(404); res.end(); return; } res.writeHead(200, { "content-type": types[path.extname(f)] || "application/octet-stream" }); fs.createReadStream(f).pipe(res); });
  await new Promise(r => server.listen(0, "127.0.0.1", r));
  const browser = await playwright.chromium.launch({ args: ["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist"] });
  const errors = [], result = {};
  try {
    const page = await browser.newPage({ viewport: { width: W, height: H } });
    page.on("pageerror", e => errors.push(e.message));
    await page.goto(`http://127.0.0.1:${server.address().port}/?shot=at:4060,4621&seed=${SEED}&${LINK}`);
    await page.waitForFunction(() => window.witch && window.witch.ready, null, { timeout: 900000, polling: 500 });
    await page.evaluate(() => { window.witch.manual = true; });
    if (await page.evaluate(() => window.witch.game.clock.paused)) { await page.keyboard.press("Enter"); await page.waitForFunction(() => !window.witch.game.clock.paused, null, { timeout: 60000 }).catch(() => {}); }
    const said = await page.evaluate(() => window.witch.lastShot ?? window.witch.shot("at:4060,4621"));
    if (!said.ok) throw new Error(said.say);
    const step = (n, dt = 1 / 60) => page.evaluate(([n, dt]) => { const w = window.witch; for (let i = 0; i < n; i++) w.frame({ moveX: 0, moveZ: 0, toggleMode: false, zoom: 0 }, dt, i === n - 1 || i % 6 === 5); }, [n, dt]);
    const settle = async () => { for (let round = 0, calm = 0; calm < 2 && round < 60; round++) { await step(10); if ((await page.evaluate(() => window.witch.view.assets.pending)) === 0) calm++; else { calm = 0; await page.waitForTimeout(1500); } } await step(30); };
    const put = (x, z) => page.evaluate(([x, z]) => { const g = window.witch.game, b = g.witches[0].body; g.witches[0].body = { ...b, x, z, vx: 0, vz: 0, mode: "ground", lift: 0, perch: false, seated: false }; }, [x, z]);
    const AFTER = await page.evaluate(() => { const t = window.witch.tuning; return JSON.parse(JSON.stringify({ embers: t.leash.ranks.embers, placeMotes: t.leash.placeMotes ?? {}, awake: t.runeMarkers.awake })); });
    const look = k => page.evaluate(k => { const t = window.witch.tuning; Object.assign(t.leash.ranks.embers, k.embers); t.leash.placeMotes = { ...k.placeMotes }; Object.assign(t.runeMarkers.awake, k.awake); }, k);
    // the subject's motes off (the same moment drawn without them)
    const off = s => page.evaluate(s => { const t = window.witch.tuning;
      if (s === "embers" || s === "stack" || s === "crowd") t.leash.ranks.embers.count = [0, 0, 0, 0];
      if (s === "stone") { t.runeMarkers.awake.motes = 0; t.runeMarkers.awake.moteBuild = 0; }
      if (s === "burst") window.__noBurst = true; }, s);
    // the drawn picture's luminance at this moment (dt 0: the same moment drawn again), the burst's motes put in as of this moment
    const grab = (burst) => page.evaluate(burst => {
      const w = window.witch, g = w.game, lv = w.view.leashView, gl = w.view.renderer.getContext(), cw = gl.drawingBufferWidth, ch = gl.drawingBufferHeight, px = new Uint8Array(cw * ch * 4);
      if (burst && !window.__noBurst) { const t = g.tuning, P = { count: 16, size: 0.7, bright: 1, rise: 1, life: 1, ...t.leash.placeMotes }, time = g.clock.time, b = g.witches[0].body;
        // (a placed adult's: its burst, as render/leash.ts makes it, partway through its life by the moment)
        lv.fx.push({ kind: "motes", x: b.x + 3, y: 0.2, z: b.z + 2, at: time - burst * 0.9 * P.life, life: 0.9 * P.life, r: 0.95 * P.bright, g: 0.3 * P.bright, b: 0.3 * P.bright, seed: 77, size: (3 + 2 * 0.8) * 0.35, tx: 3 * P.rise, n: P.count, dot: P.size }); }
      w.frame({ moveX: 0, moveZ: 0, toggleMode: false, zoom: 0 }, 0, true);
      if (burst) lv.fx.length = 0;
      gl.readPixels(0, 0, cw, ch, gl.RGBA, gl.UNSIGNED_BYTE, px);
      const lum = new Float32Array(cw * ch);
      for (let i = 0; i < cw * ch; i++) lum[i] = (0.2126 * px[i * 4] + 0.7152 * px[i * 4 + 1] + 0.0722 * px[i * 4 + 2]) / 255;
      return Array.from(lum);
    }, burst);
    const diff = (a, b) => { let e = 0; const lift = []; for (let i = 0; i < a.length; i++) { const d = a[i] - b[i]; if (d > 0) e += d; if (d > 0.02) lift.push(d); } lift.sort((x, y) => x - y); return { energy: e, px: lift.length, peak: lift.length ? lift[Math.floor(lift.length * 0.95)] : 0 }; };
    // the scene: four sigils put down south of her (a baby's to a legend's), four in her stack, the next wave's stone found
    const spot = await page.evaluate(() => {
      const g = window.witch.game, b = g.witches[0].body, cs = g.creatures.filter(c => !c.gone && !c.leashed).sort((p, q) => Math.hypot(p.x - b.x, p.z - b.z) - Math.hypot(q.x - b.x, q.z - b.z));
      const used = cs.slice(0, 28); used.forEach((c, i) => { c.leashed = true; c.level = i % 4; });
      window.__ground = used.slice(0, 4).map((c, i) => ({ id: c.id, x: b.x - 6 + i * 4, z: b.z + 5, at: g.clock.time - 30 }));
      window.__crowd = used.slice(8, 28).map((c, i) => ({ id: c.id, x: b.x + Math.cos(i * 0.9) * (5 + i * 0.6), z: b.z + Math.sin(i * 0.9) * (4 + i * 0.5), at: g.clock.time - 30 }));
      window.__stack = used.slice(4, 8).map(c => c.id);
      const st = window.witch.view.markerCache.list.filter(m => m.awake).sort((p, q) => Math.hypot(p.x - b.x, p.z - b.z) - Math.hypot(q.x - b.x, q.z - b.z))[0];
      // (its column and motes show only once the ley line has reached it: counted reached, as the Route-seer hat has them)
      if (st) { const v = window.witch.view, reach = { key: "", times: new Map([[st.key, -1e9]]) }; Object.defineProperty(v, "leyReach", { get: () => reach, set: () => {}, configurable: true }); }
      return { x: b.x, z: b.z, stone: st ? { x: st.x, z: st.z } : null };
    });
    log("scene", JSON.stringify(spot));
    const scene = s => page.evaluate(s => { const g = window.witch.game, L = g.leash;
      L.placed = s === "embers" ? [...window.__ground] : s === "crowd" ? [...window.__ground, ...window.__crowd] : [];
      L.stack = s === "stack" ? [...window.__stack] : []; window.__noBurst = false; }, s);
    for (const s of ONLY) {
      if (s === "stone" && !spot.stone) { log("no awake stone near"); continue; }
      if (s === "stone") await put(spot.stone.x, spot.stone.z + 9); else await put(spot.x, spot.z);
      await scene(s); await look(BEFORE); await settle();
      result[s] = {};
      for (const [name, k] of [["before", BEFORE], ["after", AFTER]]) {
        const sum = { energy: 0, px: 0, peak: 0 };
        for (let m = 0; m < MOMENTS; m++) {
          await step(8, 0.016 + m * 0.003); // (on to another moment of their motion)
          const burst = s === "burst" ? (m + 0.5) / MOMENTS : 0;
          await look(k); await scene(s); const on = await grab(burst);
          if (m === Math.floor(MOMENTS / 2)) await page.screenshot({ path: path.join(out, `motes-${name}-${s}.png`), timeout: 300000 });
          await off(s); const no = await grab(burst);
          const d = diff(on, no); sum.energy += d.energy / MOMENTS; sum.px += d.px / MOMENTS; sum.peak += d.peak / MOMENTS;
        }
        await look(k);
        result[s][name] = { energy: +sum.energy.toFixed(1), px: +sum.px.toFixed(0), peak: +sum.peak.toFixed(3) };
        log(s, name, JSON.stringify(result[s][name]));
      }
    }
    fs.writeFileSync(path.join(out, "motes.json"), JSON.stringify({ seed: SEED, link: LINK, size: `${W}x${H}`, moments: MOMENTS, before: BEFORE, after: AFTER, result }, null, 2));
  } finally { await browser.close(); server.close(); }
  console.log(errors.length ? "errors: " + errors.slice(0, 3).join(" | ") : "no page errors");
  process.exit(errors.length ? 1 : 0);
})().catch(e => { console.error(e); process.exit(2); });
