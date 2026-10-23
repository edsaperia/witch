// The treehouse's occluders (render/hiz.ts) change no pixel: the built game (DIST, default dist/) at spots all round the house (the
// decks, the balcony, its sides and back, on its floors and in the air round it, from the camera's own view at each), each frame drawn
// with them on and then off in the same page and compared pixel by pixel (the canvas as drawn, before anything is scaled), and each
// way timed (FRAMES frames, the GPU finished each). Fails on any pixel that differs.
//   npm run build && node tools/house/hiz-walk.cjs [out dir] [seed]   (DIST=, FRAMES=4, SPOTS=decks,balcony,...)
const http = require("http"), fs = require("fs"), path = require("path");
let playwright; try { playwright = require("playwright"); } catch { playwright = require("/opt/node22/lib/node_modules/playwright"); }
const [outDir = "previews/hiz-walk", seed = "123"] = process.argv.slice(2);
const root = path.resolve(process.env.DIST || path.join(__dirname, "../../dist")), FRAMES = Number(process.env.FRAMES || 4);
const types = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".json": "application/json", ".png": "image/png", ".wasm": "application/wasm", ".woff2": "font/woff2", ".ogg": "audio/ogg", ".webp": "image/webp" };
// (metres from the treehouse's spot, south +z; mode; the house's floor or the air)
const ALL = {
  decks: null, balcony: [0, 12, "ground", true], terrace: [0, 0, "ground", true], east: [8, 4, "ground", true], west: [-8, 4, "ground", true],
  back: [0, -8, "ground", true], kitchen: [0, -16, "ground", true], flyS: [0, 40, "treetop", false], flyE: [45, 0, "treetop", false], flyW: [-45, 0, "treetop", false], flyN: [0, -60, "treetop", false],
};
const SPOTS = (process.env.SPOTS || Object.keys(ALL).join(",")).split(",");
(async () => {
  fs.mkdirSync(outDir, { recursive: true });
  const server = http.createServer((req, res) => { const p = path.join(root, decodeURIComponent(new URL(req.url, "http://x").pathname)), f = fs.existsSync(p) && fs.statSync(p).isDirectory() ? path.join(p, "index.html") : p; if (!f.startsWith(root) || !fs.existsSync(f)) { res.writeHead(404); res.end(); return; } res.writeHead(200, { "content-type": types[path.extname(f)] || "application/octet-stream" }); res.end(fs.readFileSync(f)); });
  await new Promise(r => server.listen(0, "127.0.0.1", r));
  const browser = await playwright.chromium.launch({ args: ["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist"] });
  const errors = [], out = {};
  let bad = 0;
  try {
    const page = await browser.newPage({ viewport: { width: 1600, height: 900 } });
    page.on("pageerror", e => errors.push(e.message));
    page.on("console", m => { if (m.type() === "error") errors.push(m.text()); });
    await page.goto(`http://127.0.0.1:${server.address().port}/?seed=${seed}&creator=0&spell=auto&wave=off`);
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
      const a = await grab(false), b = await grab(true);
      let diff = 0; for (let i = 0; i < a.px.length; i += 4) if (a.px[i] !== b.px[i] || a.px[i + 1] !== b.px[i + 1] || a.px[i + 2] !== b.px[i + 2]) diff++;
      const time = off => page.evaluate(([off, F, NONE]) => { const w = window.witch, v = w.view, gl = v.renderer.getContext(); v.hizOff = off; w.frame(NONE, 0, true); gl.finish(); const ms = []; for (let i = 0; i < F; i++) { const t0 = performance.now(); w.frame(NONE, 0, true); gl.finish(); ms.push(performance.now() - t0); } ms.sort((p, q) => p - q); return ms[ms.length >> 1]; }, [off, FRAMES, NONE]);
      const on = await time(false), off = await time(true);
      await page.evaluate(() => { window.witch.view.hizOff = false; });
      await page.screenshot({ path: path.join(outDir, `${spot}.png`), timeout: 300000 });
      out[spot] = { diff, px: a.W * a.H, on: +on.toFixed(0), off: +off.toFixed(0), sameFrame: a.t === b.t };
      if (diff) bad++;
      console.log(spot, JSON.stringify(out[spot]));
    }
  } finally {
    fs.writeFileSync(path.join(outDir, "hiz-walk.json"), JSON.stringify(out, null, 1));
    console.log(errors.length ? "errors: " + errors.slice(0, 3).join(" | ") : "no page errors");
    console.log(bad ? `FAIL: ${bad} spots differ` : "every spot the same to the pixel");
    await browser.close(); server.close();
    process.exitCode = bad || errors.length ? 1 : 0;
  }
})();
