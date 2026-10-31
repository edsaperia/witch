// Each tree's own leaf colour (Ed, 2026-10-16, docs/ART-GUIDE.md section 3: "a small amount of per-tree colour jitter"; the
// tuning's leafJitter, render/sprites.ts): the built game (DIST, default dist/) at 1280×720 on a seed, at three spots of the home
// island (the home clearing, the densest wooded area, the thinnest), each from the treetops and from the ground, the same frame
// shot with the jitter off (as shipped), at the tuning's numbers, and at twice them; and the measurements CLAUDE.md's visual-bug
// rules ask for: for every tree drawn, its leaves' mean hue (from the baked variant's own pixels, the ones its sway mask marks
// as leaves) before and with its jitter, so the per-tree hue spread in degrees before and after; and on the screenshots, the hue
// spread of the crown pixels and how many pixels changed. Writes <out>/<spot>-<mode>-<off|on|x2>.png and <out>/measure.json.
//   npm run build && node tools/flora/leaf-jitter-shots.cjs <out dir> [seed]
const http = require("http"), fs = require("fs"), path = require("path");
let playwright; try { playwright = require("playwright"); } catch { playwright = require("/opt/node22/lib/node_modules/playwright"); }
const [outDir = "previews/leaf-jitter", seed = "123"] = process.argv.slice(2);
const root = path.resolve(process.env.DIST || path.join(__dirname, "../../dist"));
const types = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".json": "application/json", ".png": "image/png", ".wasm": "application/wasm" };
/** The areas' layout densities (art/areas.js), to pick a dense and a thin spot. */
const DENSE = 0.75, THIN = 0.3;
(async () => {
  fs.mkdirSync(outDir, { recursive: true });
  const server = http.createServer((req, res) => { const p = path.join(root, decodeURIComponent(new URL(req.url, "http://x").pathname)), f = fs.existsSync(p) && fs.statSync(p).isDirectory() ? path.join(p, "index.html") : p; if (!f.startsWith(root) || !fs.existsSync(f)) { res.writeHead(404); res.end(); return; } res.writeHead(200, { "content-type": types[path.extname(f)] || "application/octet-stream" }); fs.createReadStream(f).pipe(res); });
  await new Promise(r => server.listen(0, "127.0.0.1", r));
  const browser = await playwright.chromium.launch({ args: ["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist"] });
  const errors = [], measure = {};
  try {
    const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
    page.on("pageerror", e => errors.push(e.message));
    await page.goto(`http://127.0.0.1:${server.address().port}/?seed=${seed}&creator=0&wave=off&pixels=keep`);
    await page.waitForFunction(() => window.witch && window.witch.ready, null, { timeout: 900000, polling: 1000 });
    await page.keyboard.press("Enter");
    await page.waitForFunction(() => window.witch.game.clock.time > 3, null, { timeout: 600000, polling: 500 });
    // The spots: home, the densest wooded playable area, the thinnest (by the areas' layout density, read off the page's art).
    const spots = await page.evaluate(([DENSE, THIN]) => {
      const w = window.witch, g = w.game, M = g.map, D = M.dancefloor, [hx, hy] = M.centreCell, seen = new Map();
      for (let dy = -4; dy <= 4; dy++) for (let dx = -4; dx <= 4; dx++) {
        const cx = hx + dx, cy = hy + dy; if (!dx && !dy) continue;
        const s = M.siteOf(cx, cy); if (Math.hypot(s.x - D.x, s.z - D.z) > 700) continue;
        const type = M.typeOf(cx, cy), id = w.areaTypeId(type);
        if (!seen.has(id)) seen.set(id, { id, type, cx, cy, x: s.x, z: s.z, d: Math.hypot(s.x - D.x, s.z - D.z) });
      }
      return { home: { id: "home", x: D.x, z: D.z + 18 }, areas: [...seen.values()] };
    }, [DENSE, THIN]);
    // (the densities from the art's own tables, read in node: the page's typeArt may not be made yet for far areas)
    const { AREAS } = await import(path.join(__dirname, "../../art/areas.js"));
    const dens = Object.fromEntries(AREAS.map(a => [a.id, a.layout?.density ?? 0.5]));
    const wooded = spots.areas.filter(a => dens[a.id] !== undefined).sort((a, b) => dens[b.id] - dens[a.id] || a.d - b.d);
    const dense = wooded.find(a => dens[a.id] >= DENSE) ?? wooded[0], thin = [...wooded].reverse().find(a => dens[a.id] <= THIN && a.id !== dense?.id) ?? wooded[wooded.length - 1];
    const list = [{ name: "home", ...spots.home }, { name: `dense-${dense.id}`, ...dense }, { name: `thin-${thin.id}`, ...thin }];
    console.log("spots:", list.map(s => `${s.name} (${Math.round(s.x)}, ${Math.round(s.z)})`).join("; "));
    const defaults = await page.evaluate(() => ({ ...window.witch.game.tuning.leafJitter }));
    const setJ = (autumn, value) => page.evaluate(([a, v]) => { const L = window.witch.game.tuning.leafJitter; L.autumn = a; L.value = v; }, [autumn, value]); // (the autumn drift since 2026-10-19, in place of the hue turn)
    const step = (o, dt = 1 / 30) => page.evaluate(([o, dt]) => { const w = window.witch, C = o => ({ moveX: 0, moveZ: 0, toggleMode: false, zoom: 0, ...o }); w.manual = true; w.frame(C(o), dt); }, [o, dt]);
    const shot = name => page.screenshot({ path: path.join(outDir, `${name}.png`), timeout: 300000 });
    // Every tree drawn: its leaves' mean hue before (its variant's own) and with its jitter (per-tree, from the batches' instances and the atlases' pixels).
    const perTree = () => page.evaluate(() => {
      const w = window.witch, v = w.view, L = w.game.tuning.leafJitter, out = [], hueOf = new Map();
      const hsv = (r, g, b) => { const mx = Math.max(r, g, b), mn = Math.min(r, g, b), d = mx - mn; let h = 0; if (d > 0) { h = mx === r ? ((g - b) / d) % 6 : mx === g ? (b - r) / d + 2 : (r - g) / d + 4; h = (h * 60 + 360) % 360; } return [h, mx ? d / mx : 0, mx / 255]; };
      const rgba = (t, p, on) => { const d = t.image.data; if (!on || !d) return d; const P = p.image.data, o = new Uint8Array(d.length * 4); for (let i = 0; i < d.length; i++) { const k = d[i] * 4; o[i * 4] = P[k]; o[i * 4 + 1] = P[k + 1]; o[i * 4 + 2] = P[k + 2]; o[i * 4 + 3] = P[k + 3]; } return o; }; // (an indexed plane as RGBA: render/palette.ts)
      for (const [type, b] of v.typeBatches) {
        const art = v.assets.typeArt(type); if (!art) continue;
        const A = art.atlas.albedo.image, W = A.width, H = A.height, ad = rgba(art.atlas.albedo, art.atlas.albedoPal, art.atlas.indexed.x > 0.5), nd = rgba(art.atlas.normal, art.atlas.normalPal, art.atlas.indexed.y > 0.5); if (!ad || !nd) continue;
        for (const it of b.items) {
          if (!it.jitter || !it.top) continue; // (a tree's crown: one a tree)
          const key = `${type}:${it.frame.uv.join(",")}`;
          let m = hueOf.get(key);
          if (!m) {
            const [u0, v0, u1, v1] = it.frame.uv, x0 = Math.round(Math.min(u0, u1) * W), x1 = Math.round(Math.max(u0, u1) * W), y0 = Math.round(Math.min(v0, v1) * H), y1 = Math.round(Math.max(v0, v1) * H); // (the atlas's uv: x/W, y/H from the top, flipY false: render/atlas.ts)
            let sx = 0, sy = 0, n = 0, sv = 0;
            for (let y = y0; y < y1; y++) for (let x = x0; x < x1; x++) { const i = (y * W + x) * 4; if (ad[i + 3] < 128 || nd[i + 3] < 1) continue; const [h, s, val] = hsv(ad[i], ad[i + 1], ad[i + 2]); if (s < 0.15) continue; sx += Math.cos(h * Math.PI / 180); sy += Math.sin(h * Math.PI / 180); sv += val; n++; }
            m = n ? { hue: (Math.atan2(sy, sx) * 180 / Math.PI + 360) % 360, val: sv / n, n } : null;
            hueOf.set(key, m);
          }
          if (m) out.push({ x: Math.round(it.x * 10) / 10, z: Math.round(it.z * 10) / 10, hue: m.hue, val: m.val, sh: it.jitter[0], sv: it.jitter[1], jh: it.jitter[0] * L.autumn, jv: it.jitter[1] * L.value }); // (sh, sv: its seeds, so the spread with the jitter can be worked out on the very trees of the off capture)
        }
      }
      return out;
    });
    // The hue spread of a list of hues (degrees): circular standard deviation and the 5th to 95th percentile range round the mean.
    const spread = hues => { if (!hues.length) return null; let sx = 0, sy = 0; for (const h of hues) { sx += Math.cos(h * Math.PI / 180); sy += Math.sin(h * Math.PI / 180); } const mean = (Math.atan2(sy, sx) * 180 / Math.PI + 360) % 360, R = Math.hypot(sx, sy) / hues.length; const dev = hues.map(h => ((h - mean + 540) % 360) - 180).sort((a, b) => a - b), q = p => dev[Math.min(dev.length - 1, Math.floor(p * dev.length))]; return { n: hues.length, mean: +mean.toFixed(1), std: +(Math.sqrt(-2 * Math.log(Math.max(1e-9, R))) * 180 / Math.PI).toFixed(2), p5: +q(0.05).toFixed(1), p95: +q(0.95).toFixed(1), min: +dev[0].toFixed(1), max: +dev[dev.length - 1].toFixed(1) }; };
    // The screenshot's crown pixels (green-ish, not too dark): their hue spread, and how many pixels differ from another shot.
    const pixels = async (a, b) => page.evaluate(async ([pa, pb]) => {
      const load = async d => { const img = new Image(); img.src = "data:image/png;base64," + d; await img.decode(); const c = document.createElement("canvas"); c.width = img.width; c.height = img.height; const x = c.getContext("2d"); x.drawImage(img, 0, 0); return x.getImageData(0, 0, c.width, c.height).data; };
      const A = await load(pa), B = pb ? await load(pb) : null;
      const hsv = (r, g, b) => { const mx = Math.max(r, g, b), mn = Math.min(r, g, b), d = mx - mn; let h = 0; if (d > 0) { h = mx === r ? ((g - b) / d) % 6 : mx === g ? (b - r) / d + 2 : (r - g) / d + 4; h = (h * 60 + 360) % 360; } return [h, mx ? d / mx : 0, mx / 255]; };
      let sx = 0, sy = 0, n = 0, diff = 0, big = 0; const hs = [];
      for (let i = 0; i < A.length; i += 4) {
        if (B && (Math.abs(A[i] - B[i]) > 8 || Math.abs(A[i + 1] - B[i + 1]) > 8 || Math.abs(A[i + 2] - B[i + 2]) > 8)) { diff++; if (Math.abs(A[i] - B[i]) + Math.abs(A[i + 1] - B[i + 1]) + Math.abs(A[i + 2] - B[i + 2]) > 90) big++; }
        const [h, s, v] = hsv(A[i], A[i + 1], A[i + 2]); if (h < 50 || h > 190 || s < 0.2 || v < 0.12) continue; // (the crowns: green to teal, lit)
        sx += Math.cos(h * Math.PI / 180); sy += Math.sin(h * Math.PI / 180); n++; if (hs.length < 200000 && (i / 4) % 7 === 0) hs.push(h);
      }
      const mean = (Math.atan2(sy, sx) * 180 / Math.PI + 360) % 360, R = n ? Math.hypot(sx, sy) / n : 1;
      return { crownPixels: n, std: +(Math.sqrt(-2 * Math.log(Math.max(1e-9, R))) * 180 / Math.PI).toFixed(2), mean: +mean.toFixed(1), pixelsDiffering: diff, pixelsDifferingALot: big, of: A.length / 4 };
    }, [fs.readFileSync(a).toString("base64"), b ? fs.readFileSync(b).toString("base64") : null]);
    for (const s of list) {
      for (const mode of ["treetop", "ground"]) {
        await setJ(0, 0);
        await page.evaluate(([x, z, mode]) => { const g = window.witch.game; window.witch.manual = false; g.tuning.wind.on = false; g.witch = { ...g.witch, x, z: mode === "ground" ? z + 12 : z, seated: false, perch: undefined, mode, lift: mode === "ground" ? 0 : 1 }; }, [s.x, s.z, mode]); // (no wind: the three shots of a spot differ by the jitter alone)
        const t0 = await page.evaluate(() => window.witch.game.clock.time);
        await page.waitForFunction(t => window.witch.game.clock.time > t, t0 + 10, { timeout: 900000, polling: 500 }); // (the art arrives, the camera settles)
        for (let i = 0; i < 6; i++) await step({});
        const name = `${s.name}-${mode}`, off = path.join(outDir, `${name}-off.png`), on = path.join(outDir, `${name}-on.png`), x2 = path.join(outDir, `${name}-x2.png`);
        await shot(`${name}-off`);
        const trees = await perTree();
        await setJ(defaults.autumn, defaults.value); for (let i = 0; i < 2; i++) await step({}); await shot(`${name}-on`);
        await setJ(Math.min(1, defaults.autumn * 2), defaults.value * 2); for (let i = 0; i < 2; i++) await step({}); await shot(`${name}-x2`);
        // (one entry a tree: its crown, in the batches drawn at this spot; the same trees before and with the jitter, by their seeds)
        // (the baked variants' own hue spread; the autumn drift is on the lit colour, so its effect is measured on the screenshots below)
        const before = spread(trees.map(t => t.hue)), after = null, x2s = null, maxDelta = null;
        const px = { off: await pixels(off), on: await pixels(on, off), x2: await pixels(x2, off) };
        measure[name] = { spot: { x: Math.round(s.x), z: Math.round(s.z) }, trees: trees.length, perTreeHue: { before, after, x2: x2s, maxHueShiftDeg: maxDelta, maxValueScale: trees.length ? +Math.max(...trees.map(t => Math.abs(t.sv * defaults.value))).toFixed(3) : 0 }, pixels: px };
        console.log(name, JSON.stringify(measure[name]));
      }
    }
    await setJ(defaults.autumn, defaults.value);
    await page.evaluate(() => { window.witch.game.tuning.wind.on = true; });
    fs.writeFileSync(path.join(outDir, "measure.json"), JSON.stringify({ seed, defaults, spots: list, measure }, null, 2));
  } finally { await browser.close(); server.close(); }
  if (errors.length) { console.error(errors.join("\n")); process.exit(1); }
  console.log("ok");
})().catch(e => { console.error(e); process.exit(1); });
