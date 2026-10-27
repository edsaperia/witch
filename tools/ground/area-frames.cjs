// The ground's area texture before and after a change to it (the coordinator's ask from Ed, 2026-10-26: "Surely there must be a
// much more efficient way to do the ground that looks nearly the same"): the built game (DIST, default dist/) shot at the same spots
// with the same camera, a fixed 1/60 s at a time, waiting for the art: a night's area borders on the ground and from the treetops, the
// dancefloor's ring, a pond, the telescope's far view; an island's lake shore (ISLAND, if it has lakes); the zoo's coasts and
// flagstones with an island's inscription, ground and treetops, and an undiscovered island's lake. Writes <out>/<map>-<spot>.png
// and <out>/ground.json: each map's GPU textures (counted, and the area texture's size and format) and the ground's own work a frame
// (the view's "groundTiles" part, its median and worst) over a 30 s walk and a 30 s flight. Compare two builds' folders with
// tools/bench/compare.cjs's pixel diff or by eye. Fails on a page error.
//   npm run build && node tools/ground/area-frames.cjs [out dir]   DIST=dist SEED=123 ISLAND=fox ONLY=night,lakes,zoo WAIT=240
const http = require("http"), fs = require("fs"), path = require("path");
let playwright; try { playwright = require("playwright"); } catch { playwright = require("/opt/node22/lib/node_modules/playwright"); }
const out = path.resolve(process.argv[2] || "previews/ground-frames");
const root = path.resolve(process.env.DIST || path.join(__dirname, "../../dist"));
const SEED = process.env.SEED || "123", ISLAND = process.env.ISLAND || "fox", WAIT = Number(process.env.WAIT || 240);
const ONLY = (process.env.ONLY || "night,lakes,zoo").split(",");
const types = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".json": "application/json", ".png": "image/png", ".wasm": "application/wasm", ".woff2": "font/woff2", ".ogg": "audio/ogg" };
const t0 = Date.now(), log = (...a) => console.log(`[${((Date.now() - t0) / 1000).toFixed(0)} s]`, ...a);

// (in the page: the GPU textures in the scene, sized, and the ground's own area texture)
const GPU = () => {
  const v = window.witch.view, seen = new Set(); let bytes = 0;
  const size = t => { const im = t.image || {}, ch = t.format === 1028 || t.format === 1013 ? 1 : t.format === 1030 ? 2 : 4, per = t.type === 1015 ? 4 : t.type === 1016 ? 2 : 1; return (im.width || 0) * (im.height || 0) * (im.depth || 1) * ch * per; };
  const add = t => { if (t && t.isTexture && !seen.has(t)) { seen.add(t); bytes += size(t); } };
  v.scene.traverse(o => { for (const m of Array.isArray(o.material) ? o.material : [o.material]) { if (!m) continue; for (const k in m) if (m[k] && m[k].isTexture) add(m[k]); if (m.uniforms) for (const k in m.uniforms) { const x = m.uniforms[k] && m.uniforms[k].value; if (Array.isArray(x)) x.forEach(add); else add(x); } } });
  const u = v.ground.mesh.material.uniforms, areas = [u.uAreas && u.uAreas.value, u.uAreasFar && u.uAreasFar.value].filter(Boolean);
  return { sceneMB: +(bytes / 1048576).toFixed(1), areas: areas.map(t => ({ w: t.image.width, h: t.image.height, format: t.format, mb: +(size(t) / 1048576).toFixed(2) })), textures: v.renderer.info.memory.textures };
};

(async () => {
  fs.mkdirSync(out, { recursive: true });
  const server = http.createServer((req, res) => { const p = path.join(root, decodeURIComponent(new URL(req.url, "http://x").pathname)), f = fs.existsSync(p) && fs.statSync(p).isDirectory() ? path.join(p, "index.html") : p; if (!f.startsWith(root) || !fs.existsSync(f)) { res.writeHead(404); res.end(); return; } res.writeHead(200, { "Content-Type": types[path.extname(f)] || "application/octet-stream" }); fs.createReadStream(f).pipe(res); });
  await new Promise(r => server.listen(0, "127.0.0.1", r));
  const browser = await playwright.chromium.launch({ args: ["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist"] });
  const errors = [], report = {};
  const maps = { night: `?seed=${SEED}&creator=0&wave=off&opening=old`, lakes: `?seed=${SEED}&island=${ISLAND}&creator=0&wave=off&opening=old`, zoo: "?zoo&all&creator=0" };
  try {
    for (const name of ONLY) {
      const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
      page.on("pageerror", e => errors.push(`${name}: ${e.message}`));
      await page.goto(`http://127.0.0.1:${server.address().port}/${maps[name]}`);
      await page.waitForFunction(() => window.witch && window.witch.ready, null, { timeout: 1800000, polling: 1000 });
      await page.evaluate(() => { const g = window.witch.game; g.clock.paused = false; window.witch.manual = true; const W = g.witches[0]; W.kit = { invites: true, broom: true }; });
      // (her at a spot, `mode`, the camera at `zoom` if given; frames stepped till the art's in, then the shot)
      const shoot = async (spot, at, mode, o = {}) => {
        if (!at) { log(name, spot, "(no such spot here)"); return; }
        await page.evaluate(([x, z, mode, zoom]) => {
          const w = window.witch, g = w.game, W = g.witches[0];
          W.body = { ...W.body, x, z, vx: 0, vz: 0, mode, lift: mode === "ground" ? 0 : 1, perch: undefined, seated: false };
          if (zoom !== undefined) g.camera = { ...g.camera, zoomStep: zoom };
          for (let i = 0; i < 90; i++) w.frame({ moveX: 0, moveZ: 0, toggleMode: false, zoom: 0 }, 1 / 60, false);
        }, [at[0], at[1], mode, o.zoom]);
        const tw = Date.now();
        while ((Date.now() - tw) / 1000 < WAIT) {
          const s = await page.evaluate(() => { const w = window.witch, a = w.view.assets; for (let i = 0; i < 20; i++) w.frame({ moveX: 0, moveZ: 0, toggleMode: false, zoom: 0 }, 1 / 60, false); return { q: a.queue.length, busy: a.workers.some(k => k.busy), ground: w.view.stats.pendingGround }; });
          if (!s.q && !s.busy && !s.ground) break;
          await page.waitForTimeout(1000);
        }
        if (o.telescope) await page.evaluate(([h, zm]) => window.witch.telescope.look(h, zm), o.telescope);
        await page.evaluate(() => { const w = window.witch; for (let i = 0; i < 29; i++) w.frame({ moveX: 0, moveZ: 0, toggleMode: false, zoom: 0 }, 1 / 60, false); w.frame({ moveX: 0, moveZ: 0, toggleMode: false, zoom: 0 }, 1 / 60, true); });
        await page.evaluate(() => { for (const id of ["start", "zoo-bar", "clock", "hud"]) { const e = document.getElementById(id); if (e) e.style.visibility = "hidden"; } document.querySelectorAll(".zoo-bar,#zoo-jump,.legend-panel").forEach(e => (e.style.visibility = "hidden")); });
        await page.screenshot({ path: path.join(out, `${name}-${spot}.png`), timeout: 300000 });
        if (o.telescope) await page.evaluate(() => window.witch.telescope.close());
        log(name, spot, "shot");
      };
      // the spots, from the map itself (the same on any build: the rules don't change)
      const S = await page.evaluate(() => {
        const g = window.witch.game, m = g.map, w = g.witches[0].body, out = {};
        // an area border near her start: out along eight headings till the area type changes, 6 m past it
        for (let a = 0; a < 8 && !out.border; a++) { const dx = Math.cos(a * Math.PI / 4), dz = Math.sin(a * Math.PI / 4), t0 = m.areaAt(w.x, w.z).type;
          for (let r = 40; r < 600; r += 4) if (m.areaAt(w.x + dx * r, w.z + dz * r).type !== t0) { out.border = [w.x + dx * r, w.z + dz * r + 6]; break; } }
        const f = m.dancefloor; if (f && !m.zoo) out.dancefloor = [f.x, f.z + f.radius + 4];
        const ponds = g.forest ? g.forest.lightsNear(w.x, w.z, 900).filter(l => l.kind === "pond") : [];
        if (ponds.length) out.pond = [ponds[0].x, ponds[0].z + 3 * ponds[0].size + 5];
        const L = m.bounds.lakes;
        if (L) { const B = L.box; for (let z = B.minZ; z < B.maxZ && !out.lake; z += 6) for (let x = B.minX; x < B.maxX; x += 6) { const d = L.distAt(x, z); if (d > -1 && d < 1 && L.distAt(x, z + 10) < -6) { out.lake = [x, z + 10]; break; } } }
        const Z = m.zoo && m.zoo.layout;
        if (Z) { const I = [...Z.islands].sort((a, b) => Math.hypot(a.x - Z.home.x, a.z - Z.home.z) - Math.hypot(b.x - Z.home.x, b.z - Z.home.z)).find(I => I.found); if (I) out.coast = [I.x, I.z + I.most + 14]; }
        return out;
      });
      log(name, "spots", JSON.stringify(S));
      if (name === "night") {
        await shoot("border-ground", S.border, "ground");
        await shoot("border-treetop", S.border, "treetop");
        await shoot("dancefloor", S.dancefloor, "ground");
        await shoot("pond", S.pond, "ground");
        await shoot("telescope", S.border, "ground", { telescope: [0.6, 0.4] });
      } else if (name === "lakes") {
        await shoot("lake-ground", S.lake, "ground");
        await shoot("lake-treetop", S.lake, "treetop");
      } else {
        await shoot("coast-ground", S.coast, "ground");
        await shoot("coast-treetop", S.coast, "treetop");
        await shoot("lake-ground", S.lake, "ground");
      }
      // the ground's own work a frame (its tiles), walking and flying 30 s each from her last spot, and the GPU's textures
      const work = await page.evaluate(() => {
        const w = window.witch, g = w.game, ms = { ground: [], treetop: [] };
        for (const mode of ["ground", "treetop"]) {
          const W = g.witches[0]; W.body = { ...W.body, mode, lift: mode === "ground" ? 0 : 1 };
          for (let i = 0; i < 1800; i++) { const r = w.frame({ moveX: Math.cos(i / 300), moveZ: Math.sin(i / 300), toggleMode: false, zoom: 0 }, 1 / 60, false); ms[mode].push(r.ms.groundTiles || 0); }
        }
        const q = (xs, p) => { const s = [...xs].sort((a, b) => a - b); return +s[Math.min(s.length - 1, Math.floor(p * s.length))].toFixed(2); };
        return Object.fromEntries(Object.entries(ms).map(([k, xs]) => [k, { median: q(xs, 0.5), p95: q(xs, 0.95), worst: q(xs, 1) }]));
      });
      report[name] = { spots: S, gpu: await page.evaluate(`(${GPU})()`), groundTiles: work };
      log(name, JSON.stringify(report[name].gpu), JSON.stringify(work));
      await page.close();
    }
  } finally { await browser.close(); server.close(); }
  fs.writeFileSync(path.join(out, "ground.json"), JSON.stringify(report, null, 1));
  if (errors.length) { console.error(errors.join("\n")); process.exit(1); }
  log("ok");
})().catch(e => { console.error(e); process.exit(1); });
