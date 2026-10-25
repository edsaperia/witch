// The treehouse's occluders (render/hiz.ts) change no pixel: the built game (DIST, default dist/) at spots all round the house (the
// decks, the Terrace's take-off, its sides and back, the Kitchen, on its floors and in the air round it, from the camera's own view at each), each frame drawn
// with them on and then off in the same page and compared pixel by pixel (the canvas as drawn, before anything is scaled). Fails on
// any pixel that differs, and on a blind comparison (the area types' scenery hidden by its layers, which the view never resets as it does .visible each time it lists them, must change some pixel at some spot: else the
// frames weren't drawn; in the enclosed rooms it's dark behind the house anyway). Its cost: tools/bench/gpu.cjs (QUERY=hiz=0 against the default).
//   npm run build && node tools/house/hiz-walk.cjs [out dir] [seed]   (DIST=, SPOTS=decks,takeoff,...)
const http = require("http"), fs = require("fs"), path = require("path");
let playwright; try { playwright = require("playwright"); } catch { playwright = require("/opt/node22/lib/node_modules/playwright"); }
const [outDir = "previews/hiz-walk", seed = "123"] = process.argv.slice(2);
const root = path.resolve(process.env.DIST || path.join(__dirname, "../../dist"));
const types = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".json": "application/json", ".png": "image/png", ".wasm": "application/wasm", ".woff2": "font/woff2", ".ogg": "audio/ogg", ".webp": "image/webp" };
// (metres from the treehouse's spot, south +z; mode; the house's floor or the air)
const ALL = {
  decks: null, takeoff: [9.5, 9.5, "ground", true], terrace: [0, 0, "ground", true], east: [8, 4, "ground", true], west: [-8, 4, "ground", true],
  back: [0, -8, "ground", true], kitchen: [-70, 44, "ground", true], flyS: [0, 40, "treetop", false], flyE: [45, 0, "treetop", false], flyW: [-45, 0, "treetop", false], flyN: [0, -60, "treetop", false],
};
const SPOTS = (process.env.SPOTS || Object.keys(ALL).join(",")).split(",");
(async () => {
  fs.mkdirSync(outDir, { recursive: true });
  const server = http.createServer((req, res) => { const p = path.join(root, decodeURIComponent(new URL(req.url, "http://x").pathname)), f = fs.existsSync(p) && fs.statSync(p).isDirectory() ? path.join(p, "index.html") : p; if (!f.startsWith(root) || !fs.existsSync(f)) { res.writeHead(404); res.end(); return; } res.writeHead(200, { "content-type": types[path.extname(f)] || "application/octet-stream" }); res.end(fs.readFileSync(f)); });
  await new Promise(r => server.listen(0, "127.0.0.1", r));
  const browser = await playwright.chromium.launch({ args: ["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist"] });
  const errors = [], out = {};
  let bad = 0, done = false;
  try {
    const page = await browser.newPage({ viewport: { width: 1600, height: 900 }, deviceScaleFactor: Number(process.env.DPR || 1) });
    page.on("pageerror", e => errors.push(e.message));
    page.on("console", m => { if (m.type() === "error") errors.push(m.text()); });
    await page.goto(`http://127.0.0.1:${server.address().port}/?seed=${seed}&creator=0&spell=auto&wave=off&hiz=0`); // (?hiz=0: the occluders never run till this turns them on, so the first spot's first frame is the game's untouched by them)
    await page.waitForFunction(() => window.witch && window.witch.ready, null, { timeout: 900000, polling: 1000 });
    await page.keyboard.press("Enter");
    await page.waitForFunction(() => window.witch.game.clock.time > 2, null, { timeout: 600000, polling: 500 });
    const NONE = { moveX: 0, moveZ: 0, toggleMode: false, zoom: 0 };
    const step = n => page.evaluate(([n, NONE]) => { const w = window.witch; w.manual = true; for (let i = 0; i < n; i++) w.frame(NONE, 1 / 60, true); }, [n, NONE]);
    // (the art the view needs, drawn: stepped until the triangles stop changing)
    const settle = async () => { let last = -1, same = 0; for (let i = 0; i < 60 && same < 3; i++) { await step(2); await new Promise(r => setTimeout(r, 2000)); const t = await page.evaluate(() => window.witch.view.renderer.info.render.triangles); same = t === last ? same + 1 : 0; last = t; } };
    for (const spot of SPOTS) {
      const s = ALL[spot];
      if (s) await page.evaluate(([x, z, mode, perch]) => { const g = window.witch.game, T = g.map.treehouse; Object.assign(g.witch, { x: T.x + x, z: T.z + z, vx: 0, vz: 0, mode, lift: mode === "treetop" ? 1 : 0, perch, seated: false }); g.camera.intro = null; g.introFocus = null; }, s);
      await step(60); await settle();
      // One frame drawn each way (the game's time held: the same frame), its pixels read straight after it's drawn.
      const grab = off => page.evaluate(([off, NONE]) => {
        const w = window.witch, v = w.view, g = w.game, t = g.clock.time, ht = g.herTime;
        v.hizOff = off; w.frame(NONE, 0, true);
        const gl = v.renderer.getContext(), W = gl.drawingBufferWidth, H = gl.drawingBufferHeight, px = new Uint8Array(W * H * 4);
        gl.readPixels(0, 0, W, H, gl.RGBA, gl.UNSIGNED_BYTE, px);
        const calls = v.renderer.info.render.calls;
        return { W, H, px: Array.from(px), calls, t, ht };
      }, [off, NONE]);
      // (off, on, off again: a pass that left the renderer changed would show as the two offs differing, which comparing on with
      // off alone can't see once both carry it: the canvas's viewport left at the atlas's, 2026-10-23)
      const n = (p, q) => { let d = 0; for (let i = 0; i < p.px.length; i += 4) if (p.px[i] !== q.px[i] || p.px[i + 1] !== q.px[i + 1] || p.px[i + 2] !== q.px[i + 2]) d++; return d; };
      // (two offs first: the first frame after the settle can still differ from the next, drift that's neither)
      const a0 = await grab(true), a = await grab(true), b = await grab(false), a1 = await grab(true);
      const drift = n(a0, a), diff = n(a, b), stale = n(a, a1);
      // (and a blind check: with the area types' scenery hidden the picture must change, or nothing was drawn)
      const seen = await page.evaluate(() => { const v = window.witch.view, all = [...v.typeBatches.values()].flatMap(b => b.meshes); all.forEach(m => { m.userData.mask = m.layers.mask; m.layers.mask = 0; }); return all.length; });
      const c = await grab(false);
      await page.evaluate(() => { for (const b of window.witch.view.typeBatches.values()) for (const m of b.meshes) m.layers.mask = m.userData.mask; });
      let blind = 0; for (let i = 0; i < a.px.length; i += 4) if (a.px[i] !== c.px[i] || a.px[i + 1] !== c.px[i + 1] || a.px[i + 2] !== c.px[i + 2]) blind++;
      await page.evaluate(() => { window.witch.view.hizOff = false; });
      await page.screenshot({ path: path.join(outDir, `${spot}.png`), timeout: 300000 });
      out[spot] = { diff, stale, drift, px: a.W * a.H, scenery: blind, batches: seen, sameFrame: a.t === b.t };
      if (diff || stale) bad++;
      console.log(spot, JSON.stringify(out[spot]));
    }
    done = true;
  } finally {
    fs.writeFileSync(path.join(outDir, "hiz-walk.json"), JSON.stringify(out, null, 1));
    console.log(errors.length ? "errors: " + errors.slice(0, 3).join(" | ") : "no page errors");
    const blindAll = Object.keys(out).length > 0 && Object.values(out).every(o => !o.scenery);
    if (blindAll || !done) bad++;
    console.log(!done ? "FAIL: stopped before every spot was compared" : blindAll ? "FAIL: blind (hiding the scenery changed nothing anywhere: were the frames drawn?)" : bad ? `FAIL: ${bad} spots differ` : "every spot the same to the pixel");
    await browser.close(); server.close();
    process.exitCode = bad || errors.length ? 1 : 0;
  }
})();
