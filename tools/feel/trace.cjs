// Frame feel (Ed's playtest, 2026-10-06: "even though the framerate appears to be high in the
// stats, it feels low when you are playing"): drives the built game frame by frame on a scripted
// display schedule (60, 120, 144 Hz, 60 Hz with rAF jitter...) through the real loop's own path
// (window.witch.frameLive: the fixed steps, the render eased between the last two, the camera's
// sub-pixel glide), and measures where things land on screen, in screen pixels as drawn: the witch,
// the ground under her flight and the nearest creature. Throughput isn't measured here (a frame
// takes what it takes in the headless renderer); smoothness is: with her flying straight (from the
// area's middle toward the map's) at a steady speed, the ground should move the same distance every frame and she should stay put.
//
//   npm run build && node tools/feel/trace.cjs [seed] [area] [out dir]
//   (default 922199 ravine previews/feel; FRAMES=240 per schedule; SHOTS=1 also saves a strip of
//    consecutive frames round her, the slow-motion capture)
//
// Per schedule and mode it prints: steps per frame (how often a frame runs 0 or 2 steps), the
// ground's per-frame motion (mean, its spread as a share of the mean, the share of frames it
// holds still while she flies, the worst jump over the mean) and her own wobble on screen.
const http = require("http");
const fs = require("fs");
const path = require("path");
let playwright;
try { playwright = require("playwright"); } catch { playwright = require("/opt/node22/lib/node_modules/playwright"); }

const seed = process.argv[2] || "922199", areaId = process.argv[3] || "ravine";
const out = path.resolve(process.argv[4] || path.join(__dirname, "../../previews/feel"));
const FRAMES = Number(process.env.FRAMES || 240), WARM = 240, SHOTS = process.env.SHOTS === "1";
const QUERY = process.env.QUERY || "";
const root = path.resolve(__dirname, "../../dist");
const types = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".json": "application/json", ".png": "image/png" };
const log = (...a) => console.log(...a);

function serve() {
  const server = http.createServer((req, res) => {
    const p = path.join(root, decodeURIComponent(new URL(req.url, "http://x").pathname));
    const file = fs.existsSync(p) && fs.statSync(p).isDirectory() ? path.join(p, "index.html") : p;
    if (!file.startsWith(root) || !fs.existsSync(file)) { res.writeHead(404); res.end(); return; }
    res.writeHead(200, { "content-type": types[path.extname(file)] || "application/octet-stream" });
    fs.createReadStream(file).pipe(res);
  });
  return new Promise(r => server.listen(0, "127.0.0.1", () => r(server)));
}

// Display schedules: a frame's dt in seconds, i its index. Jitter is seeded, so runs compare.
const rand = s => () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296);
const SCHEDULES = {
  "60 Hz": () => () => 1 / 60,
  "120 Hz": () => () => 1 / 120,
  "144 Hz": () => () => 1 / 144,
  "60 Hz, rAF jitter ±1.5 ms": () => { const r = rand(7); return () => 1 / 60 + (r() * 2 - 1) * 0.0015; },
  "144 Hz, rAF jitter ±1 ms": () => { const r = rand(9); return () => 1 / 144 + (r() * 2 - 1) * 0.001; },
};

const stats = a => { const m = a.reduce((s, x) => s + x, 0) / Math.max(1, a.length); const sd = Math.sqrt(a.reduce((s, x) => s + (x - m) ** 2, 0) / Math.max(1, a.length)); return { m, sd }; };

async function main() {
  fs.mkdirSync(out, { recursive: true });
  const server = await serve(), port = server.address().port;
  const browser = await playwright.chromium.launch({ args: ["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist"] });
  const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
  const errors = [];
  page.on("pageerror", e => errors.push(e.message));
  await page.goto(`http://127.0.0.1:${port}/?creator=0&seed=${seed}${QUERY}`);
  await page.waitForFunction(() => window.witch && window.witch.ready, null, { timeout: 600000, polling: 500 });
  await page.keyboard.press("Enter");
  await page.waitForFunction(() => !window.witch.game.clock.paused, null, { timeout: 30000 });
  // To the area, a little south of its middle so the straight flight north crosses it.
  const where = await page.evaluate(id => {
    const g = window.witch.game, m = g.map;
    for (let y = 0; y < m.n; y++) for (let x = 0; x < m.n; x++) {
      if (window.witch.areaTypeId(m.typeOf(x, y)) !== id) continue;
      // Flying from its middle toward the map's, so she never meets the map's edge.
      const s = m.siteOf(x, y), b = m.bounds, cx = (b.minX + b.maxX) / 2 - s.x, cz = (b.minZ + b.maxZ) / 2 - s.z, l = Math.hypot(cx, cz) || 1;
      g.witch = { ...g.witch, x: s.x, z: s.z, vx: 0, vz: 0, seated: false }; g.camera = { ...g.camera, tx: s.x, tz: s.z, intro: 0 };
      return { cell: `${x},${y}`, x: s.x, z: s.z, dx: cx / l, dz: cz / l };
    }
    return null;
  }, areaId);
  if (!where) throw new Error(`no ${areaId} on seed ${seed}`);
  log(`seed ${seed}, ${areaId} at ${where.cell}`);
  await page.waitForFunction(() => window.witch.view.assets.pending === 0, null, { timeout: 2400000, polling: 1000 });

  const results = {};
  for (const mode of ["treetop", "ground"]) {
    for (const [label, make] of Object.entries(SCHEDULES)) {
      // Back to the start, in the mode, settled at full speed before measuring.
      await page.evaluate(([w, mode]) => {
        const W = window.witch, g = W.game;
        W.manual = true;
        g.witch = { ...g.witch, x: w.x, z: w.z, vx: 0, vz: 0, seated: false };
        g.camera = { ...g.camera, tx: w.x, tz: w.z, intro: 0 };
        const C = o => ({ moveX: 0, moveZ: 0, toggleMode: false, zoom: 0, ...o });
        if ((g.witch.mode === "ground") !== (mode === "ground")) { W.frameLive(C({ toggleMode: true }), 1 / 60); for (let i = 0; i < 400 && g.witch.mode !== mode; i++) W.frameLive(C({}), 1 / 60); }
      }, [where, mode]);
      const dts = []; const next = make();
      for (let i = 0; i < FRAMES + WARM; i++) dts.push(next());
      const frames = await page.evaluate(async ([dts, where]) => {
        const W = window.witch, g = W.game, C = o => ({ moveX: 0, moveZ: 0, toggleMode: false, zoom: 0, ...o });
        const rec = [];
        let probes = [];
        for (let i = 0; i < dts.length; i++) {
          // Ground probes: a fixed row of points across her path, renewed when the last scrolls away.
          if (i % 30 === 0) probes = [-20, 0, 20].map(o => ({ x: g.witch.x + where.dx * 25 - where.dz * o, z: g.witch.z + where.dz * 25 + where.dx * o }));
          let near = -1, nd = 60;
          for (const k of g.creatures) { const d = Math.hypot(k.x - g.witch.x, k.z - g.witch.z); if (d < nd && !k.gone) { nd = d; near = k.id; } }
          const f = W.frameLive(C({ moveX: where.dx, moveZ: where.dz }), dts[i], probes, near >= 0 ? [near] : []);
          rec.push({ speed: Math.hypot(g.witch.vx, g.witch.vz), dt: dts[i], steps: f.steps, alpha: f.alpha, gx: f.gx, gy: f.gy, witch: f.witch, probes: f.probes, probeSet: Math.floor(i / 30), creature: f.creatures[0], near });
          if (i % 20 === 0) await new Promise(r => setTimeout(r, 0));
        }
        return rec;
      }, [dts, where]);
      const m = frames.slice(WARM);
      const steps = { 0: 0, 1: 0, 2: 0, more: 0 };
      for (const f of m) steps[f.steps > 2 ? "more" : f.steps]++;
      // The ground's per-frame motion on screen (the probe's y; she flies north, so it slides down), within one probe set.
      const d = [];
      for (let i = 1; i < m.length; i++) if (m[i].probeSet === m[i - 1].probeSet && m[i].probes[1] && m[i - 1].probes[1]) d.push(Math.hypot(m[i].probes[1][0] - m[i - 1].probes[1][0], m[i].probes[1][1] - m[i - 1].probes[1][1]) / (m[i].dt * 60)); // (per 1/60 s, so rates compare)
      const g = stats(d), held = d.filter(x => Math.abs(x) < 0.5).length / Math.max(1, d.length), worst = Math.max(...d.map(x => Math.abs(x - g.m)));
      const wx = stats(m.map(f => f.witch[0])), wy = stats(m.map(f => f.witch[1]));
      const wd = []; for (let i = 1; i < m.length; i++) wd.push(Math.hypot(m[i].witch[0] - m[i - 1].witch[0], m[i].witch[1] - m[i - 1].witch[1]));
      const r = { steps, groundPerFrame60: +g.m.toFixed(2), groundSpread: +(g.sd / Math.max(1e-6, Math.abs(g.m))).toFixed(3), groundHeld: +held.toFixed(3), groundWorst: +worst.toFixed(2), witchWobble: +Math.hypot(wx.sd, wy.sd).toFixed(2), witchStep: +stats(wd).m.toFixed(2), witchJumps: wd.filter(x => x >= 2).length, speed: +stats(m.map(f => f.speed)).m.toFixed(1) };
      results[`${mode} · ${label}`] = r;
      fs.writeFileSync(path.join(out, `frames-${mode}-${label.replace(/[^a-z0-9]+/gi, "-")}.json`), JSON.stringify(frames));
      log(`${mode.padEnd(8)} ${label.padEnd(28)} ${r.speed} m/s  steps 0/1/2: ${steps[0]}/${steps[1]}/${steps[2] + steps.more}  ground ${r.groundPerFrame60} px a 60th, spread ${(r.groundSpread * 100).toFixed(1)}%, held ${(r.groundHeld * 100).toFixed(1)}%, worst ±${r.groundWorst}  witch wobble ${r.witchWobble} px (moves ${r.witchStep} px a frame, ${r.witchJumps} jumps ≥2 px)`);
    }
  }
  fs.writeFileSync(path.join(out, "trace-summary.json"), JSON.stringify({ seed, area: areaId, query: QUERY, results }, null, 2));

  if (SHOTS) {
    // The slow-motion capture: 16 consecutive 60 Hz frames round her, in the treetops.
    await page.evaluate(w => { const g = window.witch.game; g.witch = { ...g.witch, x: w.x, z: w.z }; g.camera = { ...g.camera, tx: w.x, tz: w.z }; }, where);
    for (let i = 0; i < 90; i++) await page.evaluate(w => window.witch.frameLive({ moveX: w.dx, moveZ: w.dz, toggleMode: false, zoom: 0 }, 1 / 60), where);
    for (let i = 0; i < 16; i++) {
      const f = await page.evaluate(w => window.witch.frameLive({ moveX: w.dx, moveZ: w.dz, toggleMode: false, zoom: 0 }, 1 / 60), where);
      await page.screenshot({ path: path.join(out, `slowmo-${String(i).padStart(2, "0")}.png`), clip: { x: Math.max(0, f.witch[0] - 160), y: Math.max(0, f.witch[1] - 140), width: 320, height: 240 } });
    }
  }
  await page.evaluate(() => { window.witch.manual = false; });
  if (errors.length) log("page errors:", errors);
  await browser.close(); server.close();
}
main().catch(e => { console.error(e); process.exit(1); });
