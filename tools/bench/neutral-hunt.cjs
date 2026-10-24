const http = require("http"), fs = require("fs"), path = require("path");
let playwright; try { playwright = require("playwright"); } catch { playwright = require("/opt/node22/lib/node_modules/playwright"); }
const root = path.resolve(process.env.DIST || path.join(__dirname, "../../dist"));
const types = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".json": "application/json", ".png": "image/png", ".wasm": "application/wasm", ".woff2": "font/woff2", ".ogg": "audio/ogg", ".webp": "image/webp" };
// Issue #1091 (Foxtrot's neutral pair, 2026-10-24): the see-through at full opacity (occlusion.fadeOpacity 1) should draw what the
// see-through off (occlusion.on false) draws; at seed 886806, on the ground at 3250,2698, it differed by 440 px. One frame held (the
// game's time still), drawn with each, then again with each suspect switched off, to bisect; where they differ saved as a PNG.
//   npm run build && node tools/bench/neutral-hunt.cjs [out dir]   (DIST=, SEED=, AT=x,z, ONLY=base,nohiz,...)
const SEED = process.env.SEED || "886806", AT = (process.env.AT || "3250,2698").split(",").map(Number);
const uni = (name, v) => `{ let u = null; v.scene.traverse(o => { u ??= o.material?.uniforms?.${name} ?? null; }); if (!u) throw new Error("no ${name}"); u.value = ${v}; }`;
const SUSPECTS = {
  base: "",
  nohiz: "v.hizOff = true;",
  noearly: uni("uSeeEarly", 0),
  nobypass: uni("uCullByPass", 0),
  onepass: "t.suspects.seeTwo = false;",
  nodepth: "t.suspects.seeDepth = false;",
  nocull: "t.suspects.seeCull = false;", // (uSeeDbg is set from the suspects every frame: frameUniforms.ts)
};
const ONLY = process.env.ONLY ? process.env.ONLY.split(",") : Object.keys(SUSPECTS);
(async () => {
  const outDir = process.argv[2] || "previews/neutral-hunt";
  fs.mkdirSync(outDir, { recursive: true });
  const server = http.createServer((req, res) => { const p = path.join(root, decodeURIComponent(new URL(req.url, "http://x").pathname)), f = fs.existsSync(p) && fs.statSync(p).isDirectory() ? path.join(p, "index.html") : p; if (!f.startsWith(root) || !fs.existsSync(f)) { res.writeHead(404); res.end(); return; } res.writeHead(200, { "content-type": types[path.extname(f)] || "application/octet-stream" }); res.end(fs.readFileSync(f)); });
  await new Promise(r => server.listen(0, "127.0.0.1", r));
  const browser = await playwright.chromium.launch({ args: ["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist"] });
  const errors = [], out = {};
  try {
    const page = await browser.newPage({ viewport: { width: 1000, height: 663 } });
    page.on("pageerror", e => errors.push(e.message));
    await page.goto(`http://127.0.0.1:${server.address().port}/?seed=${SEED}&creator=0&spell=auto&wave=off&at=${AT[0]},${AT[1]}&mode=ground`);
    await page.waitForFunction(() => window.witch && window.witch.ready, null, { timeout: 900000, polling: 1000 });
    await page.keyboard.press("Enter");
    await page.waitForFunction(() => window.witch.game.clock.time > 2, null, { timeout: 600000, polling: 500 });
    const NONE = { moveX: 0, moveZ: 0, toggleMode: false, zoom: 0 };
    const step = n => page.evaluate(([n, NONE]) => { const w = window.witch; w.manual = true; for (let i = 0; i < n; i++) w.frame(NONE, 1 / 60, true); }, [n, NONE]);
    await page.evaluate(([x, z]) => { const g = window.witch.game; Object.assign(g.witch, { x, z, vx: 0, vz: 0, mode: "ground", lift: 0, perch: false, seated: false }); g.camera.intro = null; g.introFocus = null; }, AT);
    await step(60);
    let last = -1, same = 0; for (let i = 0; i < 60 && same < 3; i++) { await step(2); await new Promise(r => setTimeout(r, 2000)); const t = await page.evaluate(() => window.witch.view.renderer.info.render.triangles); same = t === last ? same + 1 : 0; last = t; }
    // One frame drawn with these knobs over the game's, read back as drawn, the knobs put back.
    const grab = (setup, knobs) => page.evaluate(([setup, knobs, NONE]) => {
      const w = window.witch, v = w.view, t = w.game.tuning, undo = [];
      const at = k => k.split(".").reduce((o, p) => o[p], t), put = (k, val) => { const ps = k.split("."), last = ps.pop(); ps.reduce((o, p) => o[p], t)[last] = val; };
      const kept = Object.entries(knobs).map(([k, val]) => { const was = at(k); put(k, val); return [k, was]; });
      const keptT = JSON.stringify(t.suspects ?? {}), hiz = v.hizOff, unis = new Map();
      v.scene.traverse(o => { const u = o.material?.uniforms; if (u) for (const n of ["uSeeEarly", "uCullByPass", "uSeeDbg"]) if (u[n] && !unis.has(n)) unis.set(n, u[n].value?.clone ? u[n].value.clone() : u[n].value); });
      try {
        new Function("v", "t", setup)(v, t);
        w.frame(NONE, 0, true);
        const gl = v.renderer.getContext(), W = gl.drawingBufferWidth, H = gl.drawingBufferHeight, px = new Uint8Array(W * H * 4);
        gl.readPixels(0, 0, W, H, gl.RGBA, gl.UNSIGNED_BYTE, px);
        return { W, H, px: Array.from(px) };
      } finally {
        for (const [k, was] of kept) put(k, was);
        Object.assign(t.suspects ??= {}, JSON.parse(keptT)); v.hizOff = hiz;
        v.scene.traverse(o => { const u = o.material?.uniforms; if (u) for (const [n, val] of unis) if (u[n]) { if (u[n].value?.copy) u[n].value.copy(val); else u[n].value = val; } });
      }
    }, [setup, knobs, NONE]);
    const count = (a, b) => { let n = 0, max = 0; for (let i = 0; i < a.px.length; i += 4) { const d = Math.max(Math.abs(a.px[i] - b.px[i]), Math.abs(a.px[i + 1] - b.px[i + 1]), Math.abs(a.px[i + 2] - b.px[i + 2])); if (d) { n++; if (d > max) max = d; } } return { n, max }; };
    const A = { "occlusion.fadeOpacity": 1 }, B = { "occlusion.on": false };
    for (const id of ONLY) {
      const s = SUSPECTS[id];
      const a0 = await grab(s, A), a = await grab(s, A), b = await grab(s, B), b1 = await grab(s, B), base = await grab(s, {});
      const r = { diff: count(a, b), driftA: count(a0, a).n, driftB: count(b, b1).n, inUse: count(base, b).n };
      out[id] = r; console.log(id, JSON.stringify(r));
      if (id === "base") {
        // (where they differ, magenta over the frame darkened, encoded by the page itself)
        const W = a.W, H = a.H, img = new Array(W * H * 4);
        for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
          const i = ((H - 1 - y) * W + x) * 4, o = (y * W + x) * 4, d = a.px[i] !== b.px[i] || a.px[i + 1] !== b.px[i + 1] || a.px[i + 2] !== b.px[i + 2];
          img[o] = d ? 255 : a.px[i] >> 2; img[o + 1] = d ? 0 : a.px[i + 1] >> 2; img[o + 2] = d ? 255 : a.px[i + 2] >> 2; img[o + 3] = 255;
        }
        const url = await page.evaluate(([W, H, img]) => { const c = document.createElement("canvas"); c.width = W; c.height = H; c.getContext("2d").putImageData(new ImageData(new Uint8ClampedArray(img), W, H), 0, 0); return c.toDataURL("image/png"); }, [W, H, img]);
        fs.writeFileSync(path.join(outDir, "diff-base.png"), Buffer.from(url.split(",")[1], "base64"));
      }
    }
  } finally {
    fs.writeFileSync(path.join(outDir, "neutral-hunt.json"), JSON.stringify(out, null, 1));
    console.log(errors.length ? "errors: " + errors.slice(0, 3).join(" | ") : "no page errors");
    await browser.close(); server.close();
  }
})();
