// Lying down to stargaze on the beach, the sky opening up (Ed, 2026-10-06: "when you land on the beach
// to stargaze, the bend shader applies so that you can see the sky"):
//   node tools/beach/gaze-gif.cjs [dist dir]
// Loads the built game (seed 2) and puts her on the sand by a beach witch, keeping still: they chat,
// hold hands and hug, then lie down to stargaze together. From there it draws a frame every 0.15 s of
// game time while the bend eases in and the hearts start rising (after beach.hearts.after), and as she
// gets up and it eases back; writes previews/beach-stargaze.gif (ffmpeg) and two of its frames.
const http = require("http"), fs = require("fs"), path = require("path"), { execFileSync } = require("child_process");
let playwright;
try { playwright = require("playwright"); } catch { playwright = require("/opt/node22/lib/node_modules/playwright"); }
const root = path.resolve(process.argv[2] || path.resolve(__dirname, "../../dist")), out = path.resolve(__dirname, "../../previews");
const types = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".json": "application/json", ".png": "image/png", ".wasm": "application/wasm" };
const server = http.createServer((req, res) => {
  const p = path.join(root, decodeURIComponent(new URL(req.url, "http://x").pathname));
  const file = fs.existsSync(p) && fs.statSync(p).isDirectory() ? path.join(p, "index.html") : p;
  if (!file.startsWith(root) || !fs.existsSync(file)) { res.writeHead(404); res.end(); return; }
  res.writeHead(200, { "content-type": types[path.extname(file)] || "application/octet-stream" });
  fs.createReadStream(file).pipe(res);
});
server.listen(0, "127.0.0.1", async () => {
  const browser = await playwright.chromium.launch({ args: ["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist"] });
  const page = await browser.newPage({ viewport: { width: 960, height: 540 } }), errors = [];
  page.on("pageerror", e => errors.push(e.message));
  await page.goto(`http://127.0.0.1:${server.address().port}/?seed=2&spell=auto`);
  await page.waitForFunction(() => window.witch && window.witch.ready, null, { timeout: 300000, polling: 500 });
  await page.keyboard.press("Enter");
  await page.waitForFunction(() => !window.witch.game.clock.paused, null, { timeout: 30000 });
  // On the sand a few metres in from a beach witch, facing out to sea.
  const aim = await page.evaluate(() => {
    const g = window.witch.game, c = g.map.bounds.circle, s = g.beach[0], a = Math.atan2(s.z - c.z, s.x - c.x), d = Math.hypot(s.x - c.x, s.z - c.z) - 6;
    g.witch = { ...g.witch, x: c.x + Math.cos(a) * d - Math.sin(a) * 3, z: c.z + Math.sin(a) * d + Math.cos(a) * 3, seated: false, vx: 0, vz: 0, mode: "ground", lift: 0 };
    return { nx: Math.cos(a), nz: Math.sin(a) };
  });
  const step = (n, o, draw) => page.evaluate(([n, o, draw]) => { const w = window.witch; for (let i = 0; i < n; i++) w.frame({ moveX: 0, moveZ: 0, toggleMode: false, zoom: 0, ...o }, 1 / 60, draw && i === n - 1); return !!w.game.witch.stargazing; }, [n, o, draw]);
  let lying = false;
  for (let i = 0; i < 120 && !lying; i++) { await step(30, {}, false); lying = await page.evaluate(() => window.witch.game.beach[0].players[0]?.pose === "stargaze"); }
  await page.waitForFunction(() => window.witch.view.assets.partyWitchArt(null), null, { timeout: 120000, polling: 250 });
  const dir = fs.mkdtempSync(path.join(require("os").tmpdir(), "gaze-")), shots = [];
  const shot = async () => { const f = path.join(dir, `f${String(shots.length).padStart(3, "0")}.png`); await page.screenshot({ path: f }); shots.push(f); };
  // she's just lain down: the bend eases in over gazeEase, holds, then she gets up (inland) and it eases back
  for (let i = 0; i < 46; i++) { await step(9, {}, true); await shot(); }
  for (let i = 0; i < 14; i++) { await step(9, { moveX: -aim.nx * 0.2, moveZ: -aim.nz * 0.2 }, true); await shot(); }
  fs.mkdirSync(out, { recursive: true });
  fs.copyFileSync(shots[0], path.join(out, "beach-gaze-start.png")); fs.copyFileSync(shots[44], path.join(out, "beach-gaze-sky.png"));
  execFileSync("ffmpeg", ["-y", "-loglevel", "error", "-framerate", "7", "-i", path.join(dir, "f%03d.png"), "-vf", "scale=640:-1:flags=neighbor,split[a][b];[a]palettegen=max_colors=128[p];[b][p]paletteuse", path.join(out, "beach-stargaze.gif")]);
  console.log(`${lying ? "ok  " : "FAIL"} she lay down to stargaze with a beach witch`);
  console.log(`${errors.length ? "FAIL" : "ok  "} no page errors${errors.length ? ": " + errors.slice(0, 3).join(" | ") : ""}`);
  console.log(`wrote previews/beach-stargaze.gif (${shots.length} frames), beach-gaze-start.png, beach-gaze-sky.png`);
  await browser.close(); server.close();
  process.exit(lying && !errors.length ? 0 : 1);
});
