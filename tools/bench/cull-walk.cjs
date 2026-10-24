// The see-through passes culled by the kind of pixel each keeps (render/sprites.ts uCullByPass, the perf pass's A2) changes no pixel:
// the built game (DIST, default dist/) at spots in dense woods on foot and in the treetops and at the decks, loaded with it off
// (?cullpass=0, so nothing of it has run) and each frame drawn off, off, on and off again in the same page (the game's time held),
// compared pixel by pixel as drawn: off against on, the two offs before (drift: a frame still settling), the off after (a lasting
// side effect). Fails on any pixel that differs, or on a blind comparison (the area
// types' scenery hidden by its layers, which the view never resets as it does .visible, must change the picture at some spot). Its cost: tools/bench/gpu.cjs.
//   npm run build && node tools/bench/cull-walk.cjs [out dir] [seed]   (DIST=, SPOTS=decks,muddy,muddyTop,fern)
const http = require("http"), fs = require("fs"), path = require("path");
let playwright; try { playwright = require("playwright"); } catch { playwright = require("/opt/node22/lib/node_modules/playwright"); }
const [outDir = "previews/cull-walk", seed = "123"] = process.argv.slice(2);
const root = path.resolve(process.env.DIST || path.join(__dirname, "../../dist"));
const types = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".json": "application/json", ".png": "image/png", ".wasm": "application/wasm", ".woff2": "font/woff2", ".ogg": "audio/ogg", ".webp": "image/webp" };
// (seed 123's home: the muddy forest about 100 m off and the fern forest about 260 m, found by scanning the map round home)
const ALL = { decks: null, muddy: [3127, 2772, "ground"], muddyTop: [3127, 2772, "treetop"], fern: [3392, 2645, "ground"] };
const SPOTS = (process.env.SPOTS || Object.keys(ALL).join(",")).split(",");
(async () => {
  fs.mkdirSync(outDir, { recursive: true });
  const server = http.createServer((req, res) => { const p = path.join(root, decodeURIComponent(new URL(req.url, "http://x").pathname)), f = fs.existsSync(p) && fs.statSync(p).isDirectory() ? path.join(p, "index.html") : p; if (!f.startsWith(root) || !fs.existsSync(f)) { res.writeHead(404); res.end(); return; } res.writeHead(200, { "content-type": types[path.extname(f)] || "application/octet-stream" }); res.end(fs.readFileSync(f)); });
  await new Promise(r => server.listen(0, "127.0.0.1", r));
  const browser = await playwright.chromium.launch({ args: ["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist"] });
  const errors = [], out = {};
  let bad = 0, unsettled = 0, done = false;
  try {
    const page = await browser.newPage({ viewport: { width: 1600, height: 900 }, deviceScaleFactor: Number(process.env.DPR || 1) });
    page.on("pageerror", e => errors.push(e.message));
    await page.goto(`http://127.0.0.1:${server.address().port}/?seed=${seed}&creator=0&spell=auto&wave=off&cullpass=0`);
    await page.waitForFunction(() => window.witch && window.witch.ready, null, { timeout: 900000, polling: 1000 });
    await page.keyboard.press("Enter");
    await page.waitForFunction(() => window.witch.game.clock.time > 2, null, { timeout: 600000, polling: 500 });
    const NONE = { moveX: 0, moveZ: 0, toggleMode: false, zoom: 0 };
    const step = n => page.evaluate(([n, NONE]) => { const w = window.witch; w.manual = true; for (let i = 0; i < n; i++) w.frame(NONE, 1 / 60, true); }, [n, NONE]);
    const settle = async () => { let last = -1, same = 0; for (let i = 0; i < 60 && same < 3; i++) { await step(2); await new Promise(r => setTimeout(r, 2000)); const t = await page.evaluate(() => window.witch.view.renderer.info.render.triangles); same = t === last ? same + 1 : 0; last = t; } };
    const grab = () => page.evaluate(NONE => { const w = window.witch, gl = w.view.renderer.getContext(); w.frame(NONE, 0, true); const W = gl.drawingBufferWidth, H = gl.drawingBufferHeight, px = new Uint8Array(W * H * 4); gl.readPixels(0, 0, W, H, gl.RGBA, gl.UNSIGNED_BYTE, px); return Array.from(px); }, NONE);
    const setOn = on => page.evaluate(on => { let u = null; window.witch.view.scene.traverse(o => { u ??= o.material?.uniforms?.uCullByPass ?? null; }); if (!u) throw new Error("no uCullByPass"); u.value = on ? 1 : 0; }, on);
    const count = (a, b) => { let n = 0; for (let i = 0; i < a.length; i += 4) if (a[i] !== b[i] || a[i + 1] !== b[i + 1] || a[i + 2] !== b[i + 2]) n++; return n; };
    for (const spot of SPOTS) {
      const s = ALL[spot];
      if (s) await page.evaluate(([x, z, mode]) => { const g = window.witch.game; Object.assign(g.witch, { x, z, vx: 0, vz: 0, mode, lift: mode === "treetop" ? 1 : 0, perch: false, seated: false }); g.camera.intro = null; g.introFocus = null; }, s);
      await step(60); await settle();
      // (off, off, on, off: two offs first, so a frame still settling shows as drift apart from the cull; the off after, so a
      // lasting side effect shows. The first spot's offs are the game's untouched: the page loaded with it off)
      await setOn(false); const a0 = await grab(), a = await grab();
      await setOn(true); const b = await grab();
      await setOn(false); const a1 = await grab();
      await page.evaluate(() => { for (const bb of window.witch.view.typeBatches.values()) for (const m of bb.meshes) { m.userData.mask = m.layers.mask; m.layers.mask = 0; } });
      const c = await grab();
      await page.evaluate(() => { for (const bb of window.witch.view.typeBatches.values()) for (const m of bb.meshes) m.layers.mask = m.userData.mask; });
      await page.screenshot({ path: path.join(outDir, `${spot}.png`), timeout: 300000 });
      out[spot] = { diff: count(a, b), drift: count(a0, a), back: count(a, a1), scenery: count(a, c), px: a.length / 4 };
      // (a spot whose two offs differ is still settling: it proves nothing either way, said so, not counted as passed)
      if (out[spot].drift) { out[spot].unsettled = true; unsettled++; } else if (out[spot].diff || out[spot].back) bad++;
      console.log(spot, JSON.stringify(out[spot]));
    }
    done = true;
  } finally {
    fs.writeFileSync(path.join(outDir, "cull-walk.json"), JSON.stringify(out, null, 1));
    const blind = Object.keys(out).length > 0 && Object.values(out).every(o => !o.scenery);
    console.log(errors.length ? "errors: " + errors.slice(0, 3).join(" | ") : "no page errors");
    console.log(!done ? "FAIL: stopped before every spot was compared" : blind ? "FAIL: blind (hiding the scenery changed nothing)" : bad ? `FAIL: ${bad} spots differ` : (unsettled ? `the same to the pixel where settled; ${unsettled} spot(s) still settling, unproven` : "every spot the same to the pixel"));
    await browser.close(); server.close();
    process.exitCode = !done || bad || blind || errors.length ? 1 : 0;
  }
})();
