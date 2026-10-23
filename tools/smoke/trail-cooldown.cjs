// One trail, one cooldown (Ed, 2026-10-15; rules/cooldown.ts, render/trail.ts): the built game (DIST, default dist/) at 1280×720
// on a seed; on home's open ground she walks, dodges (the trail laid along her blink, the counter half full), takes off (full),
// flies, lands (full again, over the room) and walks on while it drains; frames stepped by hand a fixed 1/20 s, a shot every few,
// the counter and the trail's length printed with each, and a gif of the lot (ffmpeg) in the out dir.
//   npm run build && node tools/smoke/trail-cooldown.cjs <out dir> [seed]
const http = require("http"), fs = require("fs"), path = require("path"), { execSync } = require("child_process");
let playwright; try { playwright = require("playwright"); } catch { playwright = require("/opt/node22/lib/node_modules/playwright"); }
const [outDir = "previews/trail-cooldown", seed = "123"] = process.argv.slice(2);
const root = path.resolve(process.env.DIST || path.join(__dirname, "../../dist"));
const types = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".json": "application/json", ".png": "image/png", ".wasm": "application/wasm" };
const EVERY = Number(process.env.EVERY || 6);
(async () => {
  fs.mkdirSync(outDir, { recursive: true });
  const server = http.createServer((req, res) => { const p = path.join(root, decodeURIComponent(new URL(req.url, "http://x").pathname)), f = fs.existsSync(p) && fs.statSync(p).isDirectory() ? path.join(p, "index.html") : p; if (!f.startsWith(root) || !fs.existsSync(f)) { res.writeHead(404); res.end(); return; } res.writeHead(200, { "content-type": types[path.extname(f)] || "application/octet-stream" }); fs.createReadStream(f).pipe(res); });
  await new Promise(r => server.listen(0, "127.0.0.1", r));
  const browser = await playwright.chromium.launch({ args: ["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist"] });
  const errors = [], log = [];
  try {
    const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
    page.on("pageerror", e => errors.push(e.message));
    await page.goto(`http://127.0.0.1:${server.address().port}/?seed=${seed}&creator=0&wave=off&parts=missile,fairing,nozzles`);
    await page.waitForFunction(() => window.witch && window.witch.ready, null, { timeout: 900000, polling: 1000 });
    await page.keyboard.press("Enter");
    await page.waitForFunction(() => window.witch.game.clock.time > 4, null, { timeout: 600000, polling: 500 });
    await page.evaluate(() => { const g = window.witch.game, D = g.map.dancefloor; g.witch = { ...g.witch, x: D.x + 24, z: D.z + 30, seated: false, mode: "ground", lift: 0 }; });
    await page.waitForFunction(t => window.witch.game.clock.time > t, (await page.evaluate(() => window.witch.game.clock.time)) + 3, { timeout: 600000, polling: 500 }); // (the camera settles)
    const step = (o, dt = 0.05) => page.evaluate(([o, dt]) => { const w = window.witch, C = o => ({ moveX: 0, moveZ: 0, toggleMode: false, zoom: 0, ...o }); w.manual = true; w.frame(C(o), dt); }, [o, dt]);
    const state = () => page.evaluate(() => { const g = window.witch.game, W = g.witches[0]; return { t: g.herTime.toFixed(2), cool: W.cool.left.toFixed(2), mode: W.body.mode, x: W.body.x.toFixed(1) }; });
    let n = 0;
    const shot = async label => { const s = await state(); const name = `${String(n++).padStart(3, "0")}-${label}`; log.push(`${name}: t ${s.t} cool ${s.cool} ${s.mode} x ${s.x}`); await page.screenshot({ path: path.join(outDir, `${name}.png`), clip: { x: 240, y: 120, width: 800, height: 440 }, timeout: 300000 }); };
    const run = async (label, frames, o) => { for (let i = 0; i < frames; i++) { if (i % EVERY === 0) await shot(label); await step(o); } };
    await run("walk", 12, { moveX: 1 });
    await step({ moveX: 1, dash: true });
    await run("dodge", 30, { moveX: 1 });
    await step({ moveX: 1, toggleMode: true });
    await run("takeoff", 36, { moveX: 1 });
    await step({ moveX: 1, toggleMode: true });
    await run("land", 24, { moveX: 1 });
    await run("walk2", 60, { moveX: 1 });
    await shot("end");
    fs.writeFileSync(path.join(outDir, "frames.txt"), log.join("\n") + "\n");
    try { execSync(`ffmpeg -y -loglevel error -framerate 4 -pattern_type glob -i '${outDir}/*.png' -vf "scale=640:-1:flags=lanczos,split[s0][s1];[s0]palettegen[p];[s1][p]paletteuse" ${outDir}/trail-cooldown.gif`); } catch (e) { errors.push("ffmpeg: " + e.message); }
  } finally { await browser.close(); server.close(); }
  console.log(log.join("\n"));
  if (errors.length) { console.error(errors.join("\n")); process.exit(1); }
  console.log("ok");
})().catch(e => { console.error(e); process.exit(1); });
