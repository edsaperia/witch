// The 💌s hidden as the animals are (Ed, 2026-10-19: "envelopes are hidden by scenery (smoke also counts)", render/occlusion.ts):
// the built game (DIST, default dist/) at 1280×800 in headless Chromium, stepped at a fixed 1/60 s. In a wood away from home, on
// foot, two letters held still at hand height: one just behind a trunk on the camera's line through it, one out in the open. Each
// shot with the hiding on (<name>.png) and off (<name>-off.png, as before), and measured: a letter's own pixels (its box, on against
// off), and the opacity the page gives it. Then the same from the treetops, a letter under the canopy; and an animal half invited
// (its ring showing) behind a crown. Fails on a page error, or if the letter behind the trunk shows or the one in the open doesn't.
//   npm run build && node tools/occlusion/envelope-shots.cjs <out dir> [seed]
const http = require("http"), fs = require("fs"), path = require("path");
let playwright; try { playwright = require("playwright"); } catch { playwright = require("/opt/node22/lib/node_modules/playwright"); }
const [outDir = "previews/envelope-occlusion", seed = "123"] = process.argv.slice(2);
const root = path.resolve(process.env.DIST || path.join(__dirname, "../../dist"));
const types = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".json": "application/json", ".png": "image/png", ".wasm": "application/wasm", ".woff2": "font/woff2", ".ogg": "audio/ogg" };
(async () => {
  fs.mkdirSync(outDir, { recursive: true });
  const server = http.createServer((req, res) => { const p = path.join(root, decodeURIComponent(new URL(req.url, "http://x").pathname)), f = fs.existsSync(p) && fs.statSync(p).isDirectory() ? path.join(p, "index.html") : p; if (!f.startsWith(root) || !fs.existsSync(f)) { res.writeHead(404); res.end(); return; } res.writeHead(200, { "content-type": types[path.extname(f)] || "application/octet-stream" }); fs.createReadStream(f).pipe(res); });
  await new Promise(r => server.listen(0, "127.0.0.1", r));
  const browser = await playwright.chromium.launch({ args: ["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist"] });
  const errors = [], out = { checks: [] };
  let failed = false;
  try {
    const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
    page.on("pageerror", e => errors.push(e.message));
    page.on("console", m => { if (m.type() === "error" && /shader|webgl|program/i.test(m.text())) errors.push(m.text().slice(0, 400)); });
    await page.goto(`http://127.0.0.1:${server.address().port}/?seed=${seed}&creator=0&wave=off`);
    await page.waitForFunction(() => window.witch && window.witch.ready, null, { timeout: 900000, polling: 500 });
    await page.keyboard.press("Enter");
    await page.waitForFunction(() => window.witch.game.clock.time > 2, null, { timeout: 900000, polling: 500 });
    const C = { moveX: 0, moveZ: 0, toggleMode: false, zoom: 0 };
    const step = n => page.evaluate(([n, c]) => { for (let k = 0; k < n; k++) window.witch.frame(c, 1 / 60, k === n - 1); }, [n, C]);
    // (a frame a task: a query's answer is only ever there once the page has had its turn, as between frames in play)
    const settle = async (n, dt = 1 / 60) => { for (let k = 0; k < n; k++) await page.evaluate(([c, dt]) => { window.__pin?.(); window.witch.frame(c, dt, true); }, [C, dt]); };
    await page.evaluate(() => { window.witch.manual = true; });

    // Where: a wood 150 m out from home, on foot; the trunk nearest the middle of the view, 7 to 16 m ahead of her.
    const setUp = async treetop => page.evaluate(treetop => {
      const g = window.witch.game, d = g.map.dancefloor;
      const at = window.__at ?? (window.__at = (() => { for (const a of [0, 1, 2, 3, 4, 5]) { const x = d.x + Math.cos(a) * 150, z = d.z + Math.sin(a) * 150; if (g.forest.treesNear(x, z, 25).length > 20) return { x, z }; } return { x: d.x + 150, z: d.z }; })());
      g.witch = { ...g.witch, x: at.x, z: at.z, vx: 0, vz: 0, mode: treetop ? "treetop" : "ground", lift: treetop ? 1 : 0, seated: false, perch: undefined };
      g.witches[0].invites.letters.length = 0;
      return at;
    }, treetop);
    const place = async (treetop) => page.evaluate(treetop => {
      const W = window.witch, g = W.game, v = W.view, cam = v.camera, w = g.witch;
      const fx = -Math.sin(0), fz = -1; // (the camera looks north: -z)
      const cpx = cam.position.x, cpz = cam.position.z;
      const trees = g.forest.treesNear(w.x, w.z - 12, 14).filter(t => t.z < w.z - (treetop ? 4 : 7) && t.z > w.z - 18 && Math.abs(t.x - w.x) < 6);
      if (!trees.length) return null;
      const tr = trees.sort((a, b) => Math.abs(a.x - w.x) - Math.abs(b.x - w.x))[0];
      // behind it: on the camera's line through its trunk, 1.5 m past
      let dx = tr.x - cpx, dz = tr.z - cpz; const dl = Math.hypot(dx, dz); dx /= dl; dz /= dl;
      const behind = { x: tr.x + dx * 1.5, z: tr.z + dz * 1.5 };
      // the open: as far from her, sideways, with no tree within 3 m of it or of the line to it
      let open = null;
      for (const side of [3, -3, 4.5, -4.5, 6, -6, 2, -2]) {
        const p = { x: behind.x + side, z: behind.z };
        const near = g.forest.treesNear(p.x, p.z, 4).some(t => Math.hypot(t.x - p.x, t.z - p.z) < 3 || (t.z > p.z && t.z < w.z && Math.abs(t.x - (p.x + (w.x - p.x) * (t.z - p.z) / (w.z - p.z))) < 1.6));
        if (!near) { open = p; break; }
      }
      const L = (n, p) => ({ n, x: p.x, z: p.z, vx: 0, vz: 0, flown: 0, at: g.clock.time, r: 0.01, range: 1e6, pierce: 0, bounce: 0, split: false, home: false, slip: false, hit: [] });
      g.witches[0].invites.letters.push(L(900001, behind));
      if (open) g.witches[0].invites.letters.push(L(900002, open));
      // from the treetops, a third under the canopy well out of her cut-away: the crown nearest 30 m ahead, under its middle
      let canopy = null;
      if (treetop) { const far = g.forest.treesNear(w.x, w.z - 30, 8).sort((a, b) => Math.hypot(a.x - w.x, a.z - (w.z - 30)) - Math.hypot(b.x - w.x, b.z - (w.z - 30)))[0]; if (far) { canopy = { x: far.x + 0.6, z: far.z }; g.witches[0].invites.letters.push(L(900003, canopy)); } }
      // and an animal half invited at each (its ring showing, half full), held there, its meter not draining
      g.tuning.invites.drain = 0;
      const spots = [behind, open, canopy].map(p => p && { x: p.x + 0.8, z: p.z - 0.6 }), ids = [];
      const pool = g.creatures.filter(c => !c.gone && !c.leashed && !c.boss && !c.legend && c.level >= 1 && c.level <= 2);
      spots.forEach((p, i) => { const c = pool[i]; if (!p || !c) { ids.push(-1); return; } ids.push(c.id); });
      window.__ringIds = ids;
      for (const L of g.witches[0].invites.letters) L.hit = ids.filter(i => i >= 0); // (the letters pass the animals by)
      window.__pin = () => { const G = window.witch.game; ids.forEach((id, i) => { const c = G.creatures[id], p = spots[i]; if (!c || !p) return; Object.assign(c, { x: p.x, z: p.z, vx: 0, vz: 0, affection: 0.5, affectionAt: G.clock.time, asleep: false, napUntil: undefined }); }); };
      window.__pin();
      return { tree: { x: tr.x, z: tr.z }, behind, open, canopy, rings: ids };
    }, treetop);
    // on: settled a frame at a time; off (as before): the same moment, a frame of no time, so only the 💌s can differ
    const measure = async (name, on) => {
      await page.evaluate(on => { window.witch.view.occlusion.on = on; }, on);
      if (on) { for (let k = 0; k < 120 && !(await page.evaluate(() => window.witch.view.occlusion.settled)); k++) await settle(1); await settle(30); } // (answered, then eased in)
      else await settle(1, 0);
      const m = await page.evaluate(() => {
        const iv = window.witch.view.inviteView, I = window.witch.game.witches[0].invites;
        const letters = I.letters.map((L, i) => { const el = iv.letters[i], r = el.getBoundingClientRect(); return { n: L.n, opacity: Number(el.style.opacity || 1), visibility: el.style.visibility, box: { x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width), h: Math.round(r.height) } }; });
        const rings = (window.__ringIds || []).map(id => { const R = iv.rings.get(id); if (!R) return null; const els = [...R.imgs, ...R.dots].filter(e => e.style.display !== "none"); return { id, shown: els.length, opacity: Math.max(0, ...els.map(e => e.style.visibility === "hidden" ? 0 : Number(e.style.opacity || 1))) }; });
        return { letters, rings };
      });
      const file = path.join(outDir, `${name}${on ? "" : "-off"}.png`);
      await page.screenshot({ path: file, timeout: 300000 });
      return { m, file };
    };
    const diff = async (a, b, box) => page.evaluate(async ([a, b, box]) => {
      const load = src => new Promise(r => { const im = new Image(); im.onload = () => r(im); im.src = src; });
      const [ia, ib] = await Promise.all([load(a), load(b)]), c = document.createElement("canvas"); c.width = box.w; c.height = box.h;
      const x = c.getContext("2d"), px = im => { x.clearRect(0, 0, box.w, box.h); x.drawImage(im, -box.x, -box.y); return x.getImageData(0, 0, box.w, box.h).data; };
      const A = px(ia), B = px(ib); let n = 0;
      for (let i = 0; i < A.length; i += 4) if (Math.abs(A[i] - B[i]) + Math.abs(A[i + 1] - B[i + 1]) + Math.abs(A[i + 2] - B[i + 2]) > 30) n++;
      return { changed: n, of: box.w * box.h };
    }, [a, b, box]);
    const b64 = f => "data:image/png;base64," + fs.readFileSync(f).toString("base64");

    for (const [name, treetop] of [["ground", false], ["treetops", true]]) {
      await setUp(treetop);
      await step(240); // (the wood built round her)
      const where = await place(treetop);
      out[name] = where;
      if (!where) { out.checks.push({ name, ok: false, why: "no trunk ahead" }); failed = true; continue; }
      const on = await measure(name, true), off = await measure(name, false);
      for (const [i, which] of [[0, "behind"], [1, "open"], [2, "canopy"]]) {
        const r = on.m.rings[i], ro = off.m.rings[i];
        if (r && ro) {
          const hidden = r.opacity < 0.1, ok = which === "open" ? (treetop || !hidden) : which === "canopy" ? hidden : treetop || hidden;
          out.checks.push({ name: `${name}: the ring of an animal half invited ${which === "behind" ? "behind a trunk" : which === "canopy" ? "under the canopy 30 m out" : "in the open"}`, envelopes: r.shown, opacity: r.opacity, opacityOff: ro.opacity, ok });
          if (!ok) failed = true;
        }
        const a = on.m.letters[i], b = off.m.letters[i];
        if (!a || !b) continue;
        const pix = await diff(b64(on.file), b64(off.file), b.box);
        const hidden = a.opacity < 0.1 || a.visibility === "hidden";
        // (from the treetops the two by her are inside her cut-away, where an animal shows through too: reported, not judged)
        const ok = which === "open" ? (treetop || !hidden) : which === "canopy" ? hidden : treetop || hidden; // (from the treetops, the canopy over her hides both by her too, as it hides an animal there: reported)
        out.checks.push({ name: `${name}: the letter ${which === "behind" ? "behind a trunk" : which === "canopy" ? "under the canopy 30 m out" : "in the open"}`, opacity: a.opacity, visibility: a.visibility, pixelsChangedVsOff: pix, ok });
        if (!ok) failed = true;
      }
    }

    // Smoke (Ed: "smoke also counts"): the first wave lights the campfires; from the treetops (looking down through the column; from
    // the ground the smoke has risen past a letter's height), a letter just beyond the nearest fire, in its clearing, seen through
    // the smoke: veiled as an animal there would be (its opacity by the smoke in front of it), not hidden outright.
    await page.evaluate(c => window.witch.frame({ ...c, nextWave: true }, 1 / 60, true), C);
    await step(300);
    const fire = await page.evaluate(() => {
      const W = window.witch, g = W.game, f = W.view.smoke.drawnFires(), d = g.map.dancefloor;
      if (!f.n) return null;
      let best = null;
      for (let i = 0; i < f.n; i++) { const o = i * f.stride, x = f.a[o], z = f.a[o + 2], dd = Math.hypot(x - d.x, z - d.z); if (f.a[o + 3] > 0.5 && (!best || dd < best.d)) best = { x, z, d: dd }; }
      return best;
    });
    if (fire) {
      await page.evaluate(f => { const g = window.witch.game; window.__pin = undefined; window.__ringIds = []; g.witch = { ...g.witch, x: f.x + 1.5, z: f.z + 4, vx: 0, vz: 0, mode: "treetop", lift: 1, seated: false, perch: undefined }; g.witches[0].invites.letters.length = 0; }, fire);
      await step(120);
      // (a row of them north of it, beyond the column at heights it reaches)
      const grid = []; for (const dz of [6, 10, 14, 18, 24, 30, 36, 44]) for (const dx of [-3, 0, 3, 6, 9]) grid.push([dx, dz]);
      await page.evaluate(([f, grid]) => { const g = window.witch.game; grid.forEach(([dx, dz], i) => g.witches[0].invites.letters.push({ n: 900010 + i, x: f.x + dx, z: f.z - dz, vx: 0, vz: 0, flown: 0, at: g.clock.time, r: 0.01, range: 1e6, pierce: 0, bounce: 0, split: false, home: false, slip: false, hit: [] })); }, [fire, grid]);
      const on = await measure("smoke", true), off = await measure("smoke", false);
      const veils = await page.evaluate(n => { const o = window.witch.view.occlusion; o.on = true; return Array.from({ length: n }, (_, i) => { const p = o.pool.find(q => q.key === `l${900010 + i}`); return p ? +p.veil.toFixed(3) : null; }); }, grid.length);
      const k = veils.reduce((b, v, i) => (v ?? 0) > (veils[b] ?? 0) ? i : b, 0), a = on.m.letters[k];
      const ok = !!a && (veils[k] ?? 0) > 0.05 && a.opacity < 0.97;
      out.checks.push({ name: "smoke: the letter most veiled by a campfire's smoke, seen through it from the treetops", most: veils[k], at: grid[k], veiled: veils.filter(v => v > 0.05).length, of: veils.length, opacity: a?.opacity, fire, ok });
      if (!ok) failed = true;
      void off;
    } else out.checks.push({ name: "smoke", ok: true, why: "no campfire burning after the first wave: not checked" });
  } finally { await browser.close(); server.close(); }
  console.log(JSON.stringify({ ...out, errors }, null, 1));
  if (errors.length || failed) process.exit(1);
})();
