// The telescope mock (Ed, 2026-10-21: "we should start a builder working on the telescope"; docs/backlog/treehouse.md: the crow's
// nest, "a view of its own, panning round the island 360°"): the built game (DIST, default dist/) seen from the crow's nest, the
// game's own view turned to each heading. Nothing in the game is changed: for the shots the camera is moved after the view places
// it (its lookAt), and the sprites' facing, the bend's forward and the culling turned with it; the forest is the one built round
// her (put at the treehouse, over the treetops), out to `reach` metres (the tuning's haze.far, 360, or more). Each heading and
// zoom saved as <out>/<name>.png (the canvas alone), with the frame's draw calls and triangles; the eyepiece is drawn over them by
// tools/telescope/mock-sheet.cjs. A few waves are brought on first, so the party has spread.
//   npm run build && node tools/telescope/mock-shots.cjs <out dir> [seed] [reach]
const http = require("http"), fs = require("fs"), path = require("path");
let playwright; try { playwright = require("playwright"); } catch { playwright = require("/opt/node22/lib/node_modules/playwright"); }
const [outDir = "previews/telescope", seed = "123", reachArg = "360"] = process.argv.slice(2), reach = Number(reachArg);
const root = path.resolve(process.env.DIST || path.join(__dirname, "../../dist"));
const types = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".json": "application/json", ".png": "image/png", ".wasm": "application/wasm", ".woff2": "font/woff2", ".ogg": "audio/ogg" };
// Headings (degrees clockwise from north, where the game's camera always looks) and zooms (field of view, degrees; the game's is 20).
// `at`: the ground distance the lens's middle looks at (m), its pitch worked out over the telescope's gentle bend (BEND).
const BEND = 0.0003;
const SHOTS = [
  { name: "n-wide", heading: 0, fov: 40, at: 260 }, { name: "e-wide", heading: 90, fov: 40, at: 260 },
  { name: "s-wide", heading: 180, fov: 40, at: 200 }, { name: "w-wide", heading: 270, fov: 40, at: 260 },
  { name: "ne-wide", heading: 45, fov: 40, at: 260 }, { name: "sw-wide", heading: 225, fov: 40, at: 260 },
  { name: "s-zoom", heading: 180, fov: 13, at: 160 }, { name: "n-zoom", heading: 0, fov: 13, at: 420 },
  { name: "e-zoom", heading: 90, fov: 8, at: 450 }, { name: "w-zoom", heading: 270, fov: 8, at: 450 },
];
(async () => {
  fs.mkdirSync(outDir, { recursive: true });
  const server = http.createServer((req, res) => { const p = path.join(root, decodeURIComponent(new URL(req.url, "http://x").pathname)), f = fs.existsSync(p) && fs.statSync(p).isDirectory() ? path.join(p, "index.html") : p; if (!f.startsWith(root) || !fs.existsSync(f)) { res.writeHead(404); res.end(); return; } res.writeHead(200, { "content-type": types[path.extname(f)] || "application/octet-stream" }); fs.createReadStream(f).pipe(res); });
  await new Promise(r => server.listen(0, "127.0.0.1", r));
  const browser = await playwright.chromium.launch({ args: ["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist"] });
  const errors = [], out = { seed, reach, shots: [] };
  try {
    const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
    page.on("pageerror", e => errors.push(e.message));
    await page.goto(`http://127.0.0.1:${server.address().port}/?seed=${seed}&creator=0`);
    await page.waitForFunction(() => window.witch && window.witch.ready, null, { timeout: 900000, polling: 500 });
    await page.keyboard.press("Enter");
    await page.waitForFunction(() => window.witch.game.clock.time > 2, null, { timeout: 900000, polling: 500 });
    const C = { moveX: 0, moveZ: 0, toggleMode: false, zoom: 0 };
    const step = n => page.evaluate(([n, c]) => { for (let k = 0; k < n; k++) window.witch.frame(c, 1 / 60, k === n - 1); }, [n, C]);
    await page.evaluate(() => { window.witch.manual = true; });
    for (let w = 0; w < 3; w++) { await page.evaluate(c => window.witch.frame({ ...c, nextWave: true }, 1 / 60, true), C); await step(240); }
    // Her over the treetops at the treehouse (the forest is built round her; she is out of the telescope's sight, behind it).
    const nest = await page.evaluate(([reach, nestY, bend]) => {
      const g = window.witch.game, th = g.map.treehouse || g.map.dancefloor;
      g.tuning.haze.far = Math.max(g.tuning.haze.far, reach);
      g.tuning.camera.curve.treetop = bend; // (the culling's horizon agreeing with the telescope's gentle bend)
      g.witch = { ...g.witch, x: th.x, z: th.z, vx: 0, vz: 0, mode: "treetop", lift: 1, seated: false, perch: undefined };
      return { x: th.x, z: th.z, y: nestY };
    }, [reach, Number(process.env.NEST_Y || 50), BEND]);
    await step(120);
    await page.waitForFunction(() => window.witch.view.assets.pending === 0, null, { timeout: 900000, polling: 1000 }).catch(() => {});
    // The camera from the crow's nest: placed after the view places it (inside its lookAt, so the culling's frustum is the
    // telescope's), and the shared sprite uniforms turned to it just before each draw.
    await page.evaluate(nest => {
      const v = window.witch.view, cam = v.camera, look = cam.lookAt.bind(cam);
      let U = null; v.scene.traverse(o => { const m = o.material; if (!U && m && m.uniforms && m.uniforms.uRight && m.uniforms.uBendFwd) U = m.uniforms; });
      window.__nest = nest;
      cam.lookAt = function (...a) {
        const T = window.__tele; if (!T) return look(...a);
        const h = T.heading * Math.PI / 180, p = T.pitch * Math.PI / 180;
        cam.position.set(nest.x, nest.y, nest.z);
        if (cam.fov !== T.fov) { cam.fov = T.fov; cam.updateProjectionMatrix(); }
        return look(nest.x + Math.sin(h) * Math.cos(p) * 100, nest.y - Math.sin(p) * 100, nest.z - Math.cos(h) * Math.cos(p) * 100);
      };
      const R = v.renderer, draw = R.render.bind(R);
      R.render = function (scene, camera) {
        const T = window.__tele;
        if (T && U) {
          const h = T.heading * Math.PI / 180, p = T.pitch * Math.PI / 180, s = Math.sin(h), c = Math.cos(h);
          U.uRight.value.set(c, 0, s); U.uUp.value.set(s * Math.sin(p), Math.cos(p), -c * Math.sin(p)).normalize();
          U.uFacing && U.uFacing.value.crossVectors(U.uRight.value, U.uUp.value).normalize();
          U.uBendFwd.value.set(s, -c); if (U.uBend) U.uBend.value.set(T.bend, nest.x, nest.z, U.uBend.value.w);
        }
        return draw(scene, camera);
      };
    }, nest);
    // (the page's own overlays hidden: the clock, the cues at the screen's edge, the seed; the canvas alone)
    await page.evaluate(() => { const gl = window.witch.view.renderer.domElement; for (const el of document.body.querySelectorAll("*")) if (el !== gl && !el.contains(gl)) el.style.visibility = "hidden"; });
    for (const s0 of SHOTS) {
      const s = { ...s0, pitch: Math.round(Math.atan((nest.y + BEND * s0.at * s0.at) / s0.at) * 1800 / Math.PI) / 10, bend: BEND };
      await page.evaluate(s => { window.__tele = s; }, s);
      await step(30);
      await page.waitForFunction(() => window.witch.view.assets.pending === 0, null, { timeout: 300000, polling: 1000 }).catch(() => {});
      await step(6);
      const info = await page.evaluate(() => { const i = window.witch.view.renderer.info.render; return { calls: i.calls, triangles: i.triangles }; });
      await page.screenshot({ path: path.join(outDir, `${s.name}.png`) });
      out.shots.push({ ...s, ...info });
    }
    // The game's own view from the same place, for the cost beside it.
    await page.evaluate(() => { window.__tele = null; const v = window.witch.view; v.camera.fov = window.witch.game.tuning.camera.fov; v.camera.updateProjectionMatrix(); });
    await step(30);
    out.game = await page.evaluate(() => { const i = window.witch.view.renderer.info.render; return { calls: i.calls, triangles: i.triangles }; });
    await page.screenshot({ path: path.join(outDir, "game-view.png") });
  } finally { await browser.close(); server.close(); }
  fs.writeFileSync(path.join(outDir, "shots.json"), JSON.stringify({ ...out, errors }, null, 1));
  console.log(JSON.stringify({ ...out, errors }));
  if (errors.length) process.exit(1);
})();
