// The Terrace's gap in the great oak's crown, measured (Ed, 2026-10-26: "It doesn't seem to surround the balcony, and also there are
// branches in front of the balcony"; CLAUDE.md, visual bugs: measure, don't eyeball). At each scene (app/shot.ts), the Terrace's
// floor outline (config/house/outline.json, laid into the world by the crown's own map and bent as the crown is) is projected onto the
// screen; the frame is drawn with the crown, then with every crown mesh hidden, then with it again; the share of the Terrace's pixels
// the crown changes is how much of it the crown covers (0: the gap frames it all). Her own see-through hole only takes crown away,
// so it never counts against it. Each scene's frame is saved with the Terrace's outline drawn on it.
//   npm run build && node tools/shot/crown-gap.cjs [out dir] (SEED=160271, SCENES="at:3166,2850,treetop|...", SIZE=1280x720, DIST=dist)
// Exits 1 if a scene's Terrace is on the screen and covered more than MAX (0.02).
const http = require("http"), fs = require("fs"), path = require("path");
let playwright; try { playwright = require("playwright"); } catch { playwright = require("/opt/node22/lib/node_modules/playwright"); }
const root = path.resolve(process.env.DIST || path.join(__dirname, "../../dist"));
const SEED = process.env.SEED || "160271", [W, H] = (process.env.SIZE || "1280x720").split("x").map(Number), MAX = Number(process.env.MAX || 0.02);
const SCENES = (process.env.SCENES || "at:3166,2850,treetop|at:3166,2900,treetop|room:terrace").split("|");
const out = path.resolve(process.argv[2] || path.join(__dirname, "../../previews/shot/crown-gap"));
const types = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".json": "application/json", ".png": "image/png", ".wasm": "application/wasm", ".woff2": "font/woff2", ".ogg": "audio/ogg" };
const OUTLINE = JSON.parse(fs.readFileSync(path.join(__dirname, "../../config/house/outline.json"), "utf8")).rooms.find(r => r.id === "terrace").outline;

(async () => {
  fs.mkdirSync(out, { recursive: true });
  const server = http.createServer((req, res) => { const p = path.join(root, decodeURIComponent(new URL(req.url, "http://x").pathname)), f = fs.existsSync(p) && fs.statSync(p).isDirectory() ? path.join(p, "index.html") : p; if (!f.startsWith(root) || !fs.existsSync(f)) { res.writeHead(404); res.end(); return; } res.writeHead(200, { "content-type": types[path.extname(f)] || "application/octet-stream" }); fs.createReadStream(f).pipe(res); });
  await new Promise(r => server.listen(0, "127.0.0.1", r));
  const browser = await playwright.chromium.launch({ args: ["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist"] });
  let failed = false;
  try {
    for (const scene of SCENES) {
      const page = await browser.newPage({ viewport: { width: W, height: H } }), errors = [];
      page.on("pageerror", e => errors.push(e.message));
      await page.goto(`http://127.0.0.1:${server.address().port}/?shot=${encodeURIComponent(scene)}&seed=${SEED}`);
      await page.waitForFunction(() => window.witch && window.witch.ready, null, { timeout: 900000, polling: 500 });
      await page.evaluate(() => { window.witch.manual = true; });
      if (await page.evaluate(() => window.witch.game.clock.paused)) { await page.keyboard.press("Enter"); await page.waitForFunction(() => !window.witch.game.clock.paused, null, { timeout: 60000 }).catch(() => {}); }
      const said = await page.evaluate(s => window.witch.lastShot ?? window.witch.shot(s), scene);
      if (!said.ok) throw new Error(said.say);
      const step = n => page.evaluate(n => { const w = window.witch; for (let i = 0; i < n; i++) w.frame({ moveX: 0, moveZ: 0, toggleMode: false, zoom: 0 }, 1 / 60, true); }, n);
      for (let round = 0, calm = 0; calm < 2 && round < 60; round++) { await step(10); if ((await page.evaluate(() => window.witch.view.assets.pending)) === 0) calm++; else { calm = 0; await page.waitForTimeout(1500); } }
      await step(30);
      // the Terrace's outline on the screen: the crown's own map (render/view.ts crownWorld), bent as the crown is (render/height.ts bendW)
      const poly = await page.evaluate(outline => {
        const v = window.witch.view, Wm = v.crownWorld, c = v.crown; if (!c || !Wm) return null;
        const u = c.meshes[0].material.uniforms, B = u.uBend.value, F = u.uBendFwd.value, on = u.uBendOn.value > 0.5, cam = v.camera, P = new cam.position.constructor();
        return outline.map(([x, z]) => {
          P.copy(Wm.o).addScaledVector(Wm.ex, x).addScaledVector(Wm.ez, z);
          if (on && B.x > 0) { const d = Math.max(0, (P.x - B.y) * F.x + (P.z - B.z) * F.y); P.y -= B.x * d * d; }
          P.project(cam); return [(P.x * 0.5 + 0.5) * innerWidth, (0.5 - P.y * 0.5) * innerHeight, P.z];
        });
      }, OUTLINE);
      const shot = async () => { await step(1); return page.screenshot({ type: "png", timeout: 300000 }); };
      const hide = vis => page.evaluate(vis => window.witch.view.scene.traverse(o => { if (/^crown$/.test(o.name)) o.visible = vis; }), vis);
      const a = await shot(); await hide(false); const b = await shot(); await hide(true);
      const where = await page.evaluate(() => { const w = window.witch.game.witch, c = window.witch.view.crown; return { x: Math.round(w.x), z: Math.round(w.z), mode: w.mode, indoors: c ? c.indoors : null }; });
      // the share of the Terrace's pixels the crown changes (decoded in the page: a canvas each)
      const r = await page.evaluate(async ([A, B, poly]) => {
        const load = async s => { const im = new Image(); im.src = "data:image/png;base64," + s; await im.decode(); const cv = document.createElement("canvas"); cv.width = im.width; cv.height = im.height; const x = cv.getContext("2d"); x.drawImage(im, 0, 0); return x.getImageData(0, 0, im.width, im.height); };
        const ia = await load(A), ib = await load(B), w = ia.width, h = ia.height;
        if (!poly || poly.some(p => p[2] > 1)) return { inView: 0, covered: 0 };
        const inside = (x, y) => { let c = false; for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) if ((poly[i][1] > y) !== (poly[j][1] > y) && x < ((poly[j][0] - poly[i][0]) * (y - poly[i][1])) / (poly[j][1] - poly[i][1]) + poly[i][0]) c = !c; return c; };
        let n = 0, changed = 0;
        for (let y = 0; y < h; y += 2) for (let x = 0; x < w; x += 2) { if (!inside(x, y)) continue; n++; const k = (y * w + x) * 4; if (Math.abs(ia.data[k] - ib.data[k]) + Math.abs(ia.data[k + 1] - ib.data[k + 1]) + Math.abs(ia.data[k + 2] - ib.data[k + 2]) > 24) changed++; }
        return { inView: n, covered: n ? changed / n : 0 };
      }, [a.toString("base64"), b.toString("base64"), poly]);
      // the frame, its Terrace outlined
      const name = scene.replace(/[^a-z0-9]+/gi, "-");
      fs.writeFileSync(path.join(out, `${name}.png`), a);
      if (poly) { const marked = await page.evaluate(async ([A, poly]) => { const im = new Image(); im.src = "data:image/png;base64," + A; await im.decode(); const cv = document.createElement("canvas"); cv.width = im.width; cv.height = im.height; const x = cv.getContext("2d"); x.drawImage(im, 0, 0); x.strokeStyle = "#ff3df0"; x.lineWidth = 2; x.beginPath(); poly.forEach(([px, py], i) => i ? x.lineTo(px, py) : x.moveTo(px, py)); x.closePath(); x.stroke(); return cv.toDataURL("image/png").split(",")[1]; }, [a.toString("base64"), poly]); fs.writeFileSync(path.join(out, `${name}-outlined.png`), Buffer.from(marked, "base64")); }
      const bad = r.inView > 200 && r.covered > MAX && !where.indoors; if (bad) failed = true;
      console.log(`${scene}: ${JSON.stringify(where)}; the Terrace ${r.inView ? `on screen (${r.inView * 4} px), ${(r.covered * 100).toFixed(1)}% of it covered by the crown` : "off the screen"}${bad ? "  FAIL" : ""}${errors.length ? `; page errors: ${errors.join(" | ")}` : ""}`);
      await page.close();
    }
  } finally { await browser.close(); server.close(); }
  process.exit(failed ? 1 : 0);
})().catch(e => { console.error(e); process.exit(2); });
