// Issue #1091 (Foxtrot's neutral pair, 2026-10-24): the see-through at full opacity (occlusion.fadeOpacity 1) should draw what the
// see-through off (occlusion.on false) draws; at seed 886806, on the ground at 3250,2698, it differed by 440 px. One frame held (the
// game's time still), drawn with each, then again with each suspect switched off, to bisect; where they differ saved as a PNG.
//   npm run build && node tools/bench/neutral-hunt.cjs [out dir]   (DIST=, SEED=, AT=x,z, ONLY=base,nohiz,...; FOX=0 placed straight, not as the smoke places her; RAF=1 each picture taken as the smoke's check takes it; NOAT=1 started as the smoke starts her)
const http = require("http"), fs = require("fs"), path = require("path");
let playwright; try { playwright = require("playwright"); } catch { playwright = require("/opt/node22/lib/node_modules/playwright"); }
const root = path.resolve(process.env.DIST || path.join(__dirname, "../../dist"));
const types = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".json": "application/json", ".png": "image/png", ".wasm": "application/wasm", ".woff2": "font/woff2", ".ogg": "audio/ogg", ".webp": "image/webp" };
const SEED = process.env.SEED || "886806", AT = (process.env.AT || "3250,2698").split(",").map(Number);
const uni = (name, v) => `{ let u = null; v.scene.traverse(o => { u ??= o.material?.uniforms?.${name} ?? null; }); if (!u) throw new Error("no ${name}"); u.value = ${v}; }`;
const SUSPECTS = {
  base: "",
  nohiz: "v.hizOff = true;",
  noearly: uni("uSeeEarly", 0),
  nobypass: uni("uCullByPass", 0),
  onepass: "t.suspects.seeTwo = false;",
  nodepth: "t.suspects.seeDepth = false;",
  noblend: "t.suspects.seeNoBlend = true;", // (the see-through passes unblended)
  solid: "t.suspects.seeSolid = 'all';", // (their alpha forced to 1)
  write: "t.suspects.seeWrite = true;", // (the half-faded pass writing its depth)
  early: "t.suspects.seeEarly = true;", // (the see-through passes drawn right after the scenery: renderOrder 0.6)
  // (hidden by their layers, which the view never resets as it does .visible: what's drawn between the solid scenery, 0.5, and the front pass, 10.9, that isn't a sprite pass, hidden: all of it, the blob
  // shadows alone, the mist alone)
  between: "v.scene.traverse(o => { if (o.renderOrder > 0.5 && o.renderOrder < 10.9 && !o.material?.uniforms?.uFadePass && o.layers.mask) { const m = o.layers.mask; o.layers.mask = 0; (window.__undo ??= []).push(() => { o.layers.mask = m; }); } });",
  noshadow: "v.scene.traverse(o => { if (o.renderOrder === 1 && o.layers.mask) { const m = o.layers.mask; o.layers.mask = 0; (window.__undo ??= []).push(() => { o.layers.mask = m; }); } });",
  nomist: "t.suspects.mist = false;",
  // (the wild creatures' batches, uFind 1, and everything drawn at renderOrder 12, her silhouette's place, hidden by their layers)
  nofind: "v.scene.traverse(o => { if (o.material?.uniforms?.uFind?.value === 1 && o.layers.mask) { const m = o.layers.mask; o.layers.mask = 0; (window.__undo ??= []).push(() => { o.layers.mask = m; }); } });",
  nosil: "v.scene.traverse(o => { if (o.renderOrder === 12 && o.layers.mask) { const m = o.layers.mask; o.layers.mask = 0; (window.__undo ??= []).push(() => { o.layers.mask = m; }); } });",
  nocull: "t.suspects.seeCull = false;", // (uSeeDbg is set from the suspects every frame: frameUniforms.ts)
};
const RAF = process.env.RAF === "1";
// NOAT=1: started as the smoke starts her (at her decks, then put on the spot before the night starts), not by ?at= in the link
const NOAT = process.env.NOAT === "1";
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
    await page.goto(`http://127.0.0.1:${server.address().port}/?seed=${SEED}&creator=0&spell=auto&wave=off${NOAT ? "&mode=ground" : `&at=${AT[0]},${AT[1]}&mode=ground`}${process.env.QUERY ? "&" + process.env.QUERY : ""}`); // (QUERY=pixels=keep: as the smoke loads it)
    await page.waitForFunction(() => window.witch && window.witch.ready, null, { timeout: 900000, polling: 1000 });
    if (NOAT) {
      // (as the smoke does: on the spot before the night starts, the art round it in, then started)
      await page.evaluate(([x, z]) => { const g = window.witch.game; g.witch = { ...g.witch, x, z, mode: "ground", lift: 0, seated: false, perch: false, vx: 0, vz: 0 }; g.introFocus = undefined; }, AT);
      for (let i = 0; i < 120; i++) { if ((await page.evaluate(() => window.witch.view.assets.pending)) === 0) break; await new Promise(r => setTimeout(r, 5000)); }
    }
    await page.keyboard.press("Enter");
    await page.waitForFunction(() => window.witch.game.clock.time > 2, null, { timeout: 600000, polling: 500 });
    const NONE = { moveX: 0, moveZ: 0, toggleMode: false, zoom: 0 };
    if (process.env.FOX !== "0") {
      // (placed as the smoke's neutral section places her, tools/smoke/smoke.cjs: on the spot, a step north to settle the camera,
      // back on the spot, four seconds of play there and ten more, then paused, so the camera and her framing are its own)
      const place = () => page.evaluate(([x, z]) => { const g = window.witch.game; g.witch = { ...g.witch, x, z, mode: "ground", lift: 0, seated: false, perch: false, vx: 0, vz: 0 }; g.introFocus = undefined; }, AT);
      const sleep = ms => new Promise(r => setTimeout(r, ms));
      await place(); await page.keyboard.down("ArrowUp"); await sleep(300); await page.keyboard.up("ArrowUp"); await sleep(1000); await place();
      await page.waitForFunction(t => window.witch.game.clock.time > t, (await page.evaluate(() => window.witch.game.clock.time)) + 4, { timeout: 300000, polling: 250 });
      await sleep(10000);
      await page.keyboard.press("Escape"); await sleep(3000);
    }
    // CREATURE=dx,dz: the nearest creature put that far from her (the smoke's picture had one 4 m west, 6 m south: among the trees in front)
    if (process.env.CREATURE) {
      const [dx, dz] = process.env.CREATURE.split(",").map(Number);
      out.creature = await page.evaluate(([x, z]) => { const g = window.witch.game; let best = null, bd = Infinity; for (const c of g.creatures) { const d = Math.hypot(c.x - x, c.z - z); if (d < bd) { bd = d; best = c; } } if (!best) return null; Object.assign(best, { x, z, tx: x, tz: z }); return { species: best.species, level: best.level, state: best.state, was: bd }; }, [AT[0] + dx, AT[1] + dz]);
      console.log("creature", JSON.stringify(out.creature));
    }
    const step = n => page.evaluate(([n, NONE]) => { const w = window.witch; w.manual = true; for (let i = 0; i < n; i++) w.frame(NONE, 1 / 60, true); }, [n, NONE]);
    if (process.env.FOX === "0") {
      await page.evaluate(([x, z]) => { const g = window.witch.game; Object.assign(g.witch, { x, z, vx: 0, vz: 0, mode: "ground", lift: 0, perch: false, seated: false }); g.camera.intro = null; g.introFocus = null; }, AT);
      await step(60);
    }
    let last = -1, same = 0; for (let i = 0; i < 60 && same < 3 && !RAF; i++) { await step(2); await new Promise(r => setTimeout(r, 2000)); const t = await page.evaluate(() => window.witch.view.renderer.info.render.triangles); same = t === last ? same + 1 : 0; last = t; }
    // One frame drawn with these knobs over the game's, read back as drawn, the knobs put back.
    // RAF=1: each picture taken as the smoke's check takes it (ui/visualReport.ts drawn): the knobs set, four real frames, the canvas
    // read, the knobs put back; the game's own loop drawing, not a frame stepped by hand at no time.
    const grabRaf = (setup, knobs) => page.evaluate(async ([setup, knobs]) => {
      const w = window.witch, v = w.view, t = w.game.tuning, canvas = v.renderer.domElement;
      const at = k => k.split(".").reduce((o, p) => o[p], t), put = (k, val) => { const ps = k.split("."), last = ps.pop(); ps.reduce((o, p) => o[p], t)[last] = val; };
      const keptT = JSON.stringify(t.suspects ?? {}), hiz = v.hizOff, was = w.manual; w.manual = false;
      const kept = Object.entries(knobs).map(([k, val]) => { const old = at(k); put(k, val); return [k, old]; });
      try {
        new Function("v", "t", setup)(v, t);
        await new Promise(ok => { let n = 4; const f = () => (--n <= 0 ? ok() : requestAnimationFrame(f)); requestAnimationFrame(f); });
        const c = document.createElement("canvas"); c.width = canvas.width; c.height = canvas.height;
        const x = c.getContext("2d"); x.drawImage(canvas, 0, 0);
        const d = x.getImageData(0, 0, c.width, c.height).data, W = c.width, H = c.height, px = new Array(W * H * 4);
        for (let y = 0; y < H; y++) for (let i = 0; i < W * 4; i++) px[(H - 1 - y) * W * 4 + i] = d[y * W * 4 + i]; // (bottom up, as readPixels gives)
        return { W, H, px };
      } finally {
        for (const [k, old] of kept) put(k, old);
        Object.assign(t.suspects ??= {}, JSON.parse(keptT)); v.hizOff = hiz; w.manual = was; for (const f of (window.__undo ?? []).splice(0)) f();
      }
    }, [setup, knobs]);
    const grabHand = (setup, knobs) => page.evaluate(([setup, knobs, NONE]) => {
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
        Object.assign(t.suspects ??= {}, JSON.parse(keptT)); v.hizOff = hiz; for (const f of (window.__undo ?? []).splice(0)) f();
        v.scene.traverse(o => { const u = o.material?.uniforms; if (u) for (const [n, val] of unis) if (u[n]) { if (u[n].value?.copy) u[n].value.copy(val); else u[n].value = val; } });
      }
    }, [setup, knobs, NONE]);
    const grab = (setup, knobs) => (RAF ? grabRaf(setup, knobs) : grabHand(setup, knobs));
    const count = (a, b) => { let n = 0, max = 0; for (let i = 0; i < a.px.length; i += 4) { const d = Math.max(Math.abs(a.px[i] - b.px[i]), Math.abs(a.px[i + 1] - b.px[i + 1]), Math.abs(a.px[i + 2] - b.px[i + 2])); if (d) { n++; if (d > max) max = d; } } return { n, max }; };
    const A = { "occlusion.fadeOpacity": 1 }, B = { "occlusion.on": false };
    for (const id of ONLY) {
      const s = SUSPECTS[id];
      const a0 = await grab(s, A), a = await grab(s, A), b = await grab(s, B), b1 = await grab(s, B), base = await grab(s, {});
      // (and the smoke's own check with the suspect on, as the issue measured it: the canvas after four real frames, paused)
      const check = await page.evaluate(async setup => {
        const w = window.witch, v = w.view, t = w.game.tuning, keptT = JSON.stringify(t.suspects ?? {}), hiz = v.hizOff, unis = new Map();
        v.scene.traverse(o => { const u = o.material?.uniforms; if (u) for (const n of ["uSeeEarly", "uCullByPass"]) if (u[n] && !unis.has(n)) unis.set(n, u[n].value); });
        const was = w.manual; w.manual = false;
        try { new Function("v", "t", setup)(v, t); const r = await window.__neutralCheck(); return { changed: r.pairs[0].changed, max: r.pairs[0].maxDiff, still: r.still, inUse: r.seeThroughInUse }; }
        finally { w.manual = was; Object.assign(t.suspects, JSON.parse(keptT)); v.hizOff = hiz; for (const f of (window.__undo ?? []).splice(0)) f(); v.scene.traverse(o => { const u = o.material?.uniforms; if (u) for (const [n, val] of unis) if (u[n]) u[n].value = val; }); }
      }, s);
      const r = { check, diff: count(a, b), driftA: count(a0, a).n, driftB: count(b, b1).n, inUse: count(base, b).n };
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
        // (each differing pixel, from the top left, with both colours; and both pictures round them, 4x, side by side)
        const list = [];
        let x0 = W, y0 = H, x1 = 0, y1 = 0;
        for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
          const i = ((H - 1 - y) * W + x) * 4;
          if (a.px[i] !== b.px[i] || a.px[i + 1] !== b.px[i + 1] || a.px[i + 2] !== b.px[i + 2]) {
            if (list.length < 60) list.push(`${x},${y} full[${a.px[i]},${a.px[i + 1]},${a.px[i + 2]},${a.px[i + 3]}] off[${b.px[i]},${b.px[i + 1]},${b.px[i + 2]},${b.px[i + 3]}]`);
            x0 = Math.min(x0, x); y0 = Math.min(y0, y); x1 = Math.max(x1, x); y1 = Math.max(y1, y);
          }
        }
        fs.writeFileSync(path.join(outDir, "diff-pixels.txt"), list.join("\n") + "\n");
        if (list.length) {
          const pad = 12, cx0 = Math.max(0, x0 - pad), cy0 = Math.max(0, y0 - pad), cw = Math.min(W, x1 + pad + 1) - cx0, ch = Math.min(H, y1 + pad + 1) - cy0, Z = 4;
          const crop = new Array(cw * Z * 3 * ch * Z * 4).fill(255), CW = cw * Z * 3;
          for (let y = 0; y < ch; y++) for (let x = 0; x < cw; x++) {
            const i = ((H - 1 - (cy0 + y)) * W + cx0 + x) * 4, d = a.px[i] !== b.px[i] || a.px[i + 1] !== b.px[i + 1] || a.px[i + 2] !== b.px[i + 2];
            for (let k = 0; k < 3; k++) { const c = k === 0 ? a.px.slice(i, i + 3) : k === 1 ? b.px.slice(i, i + 3) : d ? [255, 0, 255] : [a.px[i] >> 2, a.px[i + 1] >> 2, a.px[i + 2] >> 2];
              for (let dy = 0; dy < Z; dy++) for (let dx = 0; dx < Z; dx++) { const o = ((y * Z + dy) * CW + k * cw * Z + x * Z + dx) * 4; crop[o] = c[0]; crop[o + 1] = c[1]; crop[o + 2] = c[2]; crop[o + 3] = 255; } }
          }
          const curl = await page.evaluate(([W, H, img]) => { const c = document.createElement("canvas"); c.width = W; c.height = H; c.getContext("2d").putImageData(new ImageData(new Uint8ClampedArray(img), W, H), 0, 0); return c.toDataURL("image/png"); }, [CW, ch * Z, crop]);
          fs.writeFileSync(path.join(outDir, "diff-crop.png"), Buffer.from(curl.split(",")[1], "base64"));
          console.log(`differing pixels within ${x0},${y0} to ${x1},${y1}; crop (full, off, where) in diff-crop.png`);
        }
      }
    }
  } finally {
    fs.writeFileSync(path.join(outDir, "neutral-hunt.json"), JSON.stringify(out, null, 1));
    console.log(errors.length ? "errors: " + errors.slice(0, 3).join(" | ") : "no page errors");
    await browser.close(); server.close();
  }
})();
