// What the sprite art takes on the GPU, and what its uploads cost (Ed, 2026-10-26: "store the generated pixel art as palette
// indices", render/palette.ts): the built game (DIST, default dist/) in headless Chromium at a night (on foot at home, then a
// stretch of flight so the creatures' and the next areas' art comes in) and at the zoo with every island found, each left until
// its art has settled. For each: every texture the scene's sprite materials bind (their albedo and normal planes and palettes:
// uAlbedo, uNormal, uTufts, uTuftN and their *Pal), its size and bytes as stored (RGBA 4 a pixel, R8 1), split by kind; and every
// texture upload the page made (texImage2D / texSubImage2D of 64 by 64 or more, timed on the page's thread: under the cloud's
// software renderer the upload is a copy made there and then, so its time is real; a GPU's driver may defer it), with the median
// and worst per atlas. Run it on two builds to compare (an older build's atlases are all RGBA).
//   npm run build && node tools/bench/artmem.cjs [out.json]   DIST=dist SEED=123 ONLY=night,zoo FLY=600
const http = require("http"), fs = require("fs"), path = require("path");
let playwright; try { playwright = require("playwright"); } catch { playwright = require("/opt/node22/lib/node_modules/playwright"); }
const env = (k, d) => (process.env[k] === undefined ? d : process.env[k]);
const root = path.resolve(env("DIST", "dist")), out = process.argv[2] || null, SEED = env("SEED", "123"), FLY = Number(env("FLY", 600));
const ONLY = env("ONLY", "night,zoo").split(",");
const types = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".json": "application/json", ".png": "image/png", ".wasm": "application/wasm", ".woff2": "font/woff2", ".ogg": "audio/ogg", ".webp": "image/webp" };
const t0 = Date.now(), log = (...a) => console.log(`[${((Date.now() - t0) / 1000).toFixed(0)} s]`, ...a);
const MB = b => (b / 1048576).toFixed(1);

// (in the page before anything runs: every texture upload timed)
function hookUploads() {
  window.__uploads = [];
  const P = WebGL2RenderingContext.prototype;
  for (const name of ["texImage2D", "texSubImage2D"]) {
    const was = P[name];
    P[name] = function (...a) {
      const s = performance.now(), r = was.apply(this, a), ms = performance.now() - s;
      // (texImage2D(target, level, internal, w, h, border, format, type, data) / texSubImage2D(target, level, x, y, w, h, format, type, data))
      const w = name === "texImage2D" ? a[3] : a[4], h = name === "texImage2D" ? a[4] : a[5], format = name === "texImage2D" ? a[6] : a[6];
      if (typeof w === "number" && w * h >= 4096 && a[a.length - 1] && ArrayBuffer.isView(a[a.length - 1])) window.__uploads.push({ w, h, red: format === this.RED, ms });
      return r;
    };
  }
}

// (in the page: the sprite materials' textures, each once)
function artTextures() {
  const v = window.witch.view, seen = new Map(), NAMES = /^u(Albedo|Normal|Tufts|TuftN)(Pal)?$/;
  v.scene.traverse(o => {
    const mats = o.material ? (Array.isArray(o.material) ? o.material : [o.material]) : [];
    for (const m of mats) for (const [k, u] of Object.entries(m.uniforms ?? {})) {
      const t = u && u.value; if (!NAMES.test(k) || !t || !t.isTexture || seen.has(t)) continue;
      const i = t.image ?? {}, w = i.width ?? 0, h = i.height ?? 0, red = t.format === 1028; // (THREE.RedFormat)
      seen.set(t, { kind: /Pal$/.test(k) ? "palette" : /Albedo|Tufts$/.test(k) ? "albedo" : "normal", w, h, red, bytes: w * h * (red ? 1 : 4) });
    }
  });
  const list = [...seen.values()], by = {};
  for (const t of list) { const b = (by[t.kind] ??= { n: 0, bytes: 0, indexed: 0 }); b.n++; b.bytes += t.bytes; if (t.red) b.indexed++; }
  // (the shared stand-in palette of RGBA planes counted once, like any other)
  return { total: list.reduce((s, t) => s + t.bytes, 0), by, n: list.length, renderer: v.renderer?.info?.memory ?? null };
}

function serve() {
  const server = http.createServer((req, res) => {
    const p = path.join(root, decodeURIComponent(new URL(req.url, "http://x").pathname.replace(/\/$/, "/index.html")));
    fs.readFile(p, (err, data) => { if (err) { res.writeHead(404); res.end(); return; } res.writeHead(200, { "content-type": types[path.extname(p)] || "application/octet-stream" }); res.end(data); });
  });
  return new Promise(ok => server.listen(0, "127.0.0.1", () => ok({ server, port: server.address().port })));
}

(async () => {
  const { server, port } = await serve();
  const browser = await playwright.chromium.launch({ args: ["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist"] });
  const result = {};
  const settle = async p => { for (let i = 0; i < 200; i++) { const n = await p.evaluate(() => window.witch.view.assets.queue.length + (window.witch.view.assets.workers.some(w => w.busy) ? 1 : 0)); if (!n) return; await p.waitForTimeout(3000); } };
  try {
    for (const scene of ONLY) {
      const ctx = await browser.newContext({ viewport: { width: 1280, height: 720 } }), p = await ctx.newPage(); // (a fresh context: nothing kept in the art cache)
      await p.addInitScript(hookUploads);
      p.on("pageerror", e => log("page error:", e.message));
      await p.goto(`http://127.0.0.1:${port}/?${scene === "zoo" ? "zoo&all&creator=0" : `creator=0&seed=${SEED}`}`);
      await p.waitForFunction(() => window.witch && window.witch.ready, null, { timeout: 900000, polling: 500 });
      await p.keyboard.press("Enter");
      await p.waitForTimeout(3000);
      await settle(p);
      if (scene === "night" && FLY) { // (a stretch of flight north, so creatures and the next areas come in)
        await p.keyboard.down("KeyW"); await p.waitForTimeout(FLY * 1000 / 60); await p.keyboard.up("KeyW");
        await settle(p);
      }
      await p.waitForTimeout(2000);
      const art = await p.evaluate(artTextures), up = await p.evaluate(() => window.__uploads);
      const big = up.filter(u => u.w * u.h >= 65536), ms = big.map(u => u.ms).sort((a, b) => a - b);
      result[scene] = { art, uploads: { n: up.length, atlases: big.length, red: big.filter(u => u.red).length, medianMs: ms[Math.floor(ms.length / 2)] ?? 0, worstMs: ms[ms.length - 1] ?? 0, totalMs: ms.reduce((s, x) => s + x, 0), perMpx: big.reduce((s, u) => s + u.ms, 0) / Math.max(1, big.reduce((s, u) => s + u.w * u.h, 0) / 1e6) } };
      log(scene, `art ${MB(art.total)} MB in ${art.n} textures (albedo ${MB(art.by.albedo?.bytes ?? 0)} MB, ${art.by.albedo?.indexed ?? 0}/${art.by.albedo?.n ?? 0} indexed; normal ${MB(art.by.normal?.bytes ?? 0)} MB, ${art.by.normal?.indexed ?? 0}/${art.by.normal?.n ?? 0} indexed; palettes ${MB(art.by.palette?.bytes ?? 0)} MB)`);
      log(scene, `uploads: ${big.length} atlases (${result[scene].uploads.red} R8), median ${result[scene].uploads.medianMs.toFixed(2)} ms, worst ${result[scene].uploads.worstMs.toFixed(1)} ms, ${result[scene].uploads.perMpx.toFixed(2)} ms a megapixel, ${result[scene].uploads.totalMs.toFixed(0)} ms in all`);
      await ctx.close();
    }
  } finally { await browser.close(); server.close(); }
  if (out) { fs.mkdirSync(path.dirname(path.resolve(out)), { recursive: true }); fs.writeFileSync(out, JSON.stringify(result, null, 1)); log("wrote", out); }
})().catch(e => { console.error(e); process.exit(1); });
