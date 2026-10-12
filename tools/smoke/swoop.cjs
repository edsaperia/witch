// A wild flyer's swoop (rules/movement.ts stepSwoop): the built game (DIST, default dist/) at 1280×720, her in the debug arena against
// one wild SPECIES (default owl) at level 2, frames stepped by hand a fixed 1/30 s through a bout (circling out of reach, the
// telegraph, the dive at her, the bottom, the climb), a crop every EVERY frames saved, then made into <out dir>/<species>.gif.
//   npm run build && node tools/smoke/swoop.cjs <out dir> [species] [seed]
const http = require("http"), fs = require("fs"), path = require("path"), { execFileSync } = require("child_process");
let playwright; try { playwright = require("playwright"); } catch { playwright = require("/opt/node22/lib/node_modules/playwright"); }
const [outDir = "previews/swoop", species = "owl", seed = "5"] = process.argv.slice(2);
const EVERY = +(process.env.EVERY || 2), MAX = +(process.env.MAX || 240), WALK = +(process.env.WALK || 0);
const root = path.resolve(process.env.DIST || path.join(__dirname, "../../dist"));
const types = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".json": "application/json", ".png": "image/png", ".wasm": "application/wasm" };
(async () => {
  const dir = path.join(outDir, species);
  fs.mkdirSync(dir, { recursive: true });
  for (const f of fs.readdirSync(dir)) if (f.endsWith(".png")) fs.unlinkSync(path.join(dir, f));
  const server = http.createServer((req, res) => { const p = path.join(root, decodeURIComponent(new URL(req.url, "http://x").pathname)), f = fs.existsSync(p) && fs.statSync(p).isDirectory() ? path.join(p, "index.html") : p; if (!f.startsWith(root) || !fs.existsSync(f)) { res.writeHead(404); res.end(); return; } res.writeHead(200, { "content-type": types[path.extname(f)] || "application/octet-stream" }); fs.createReadStream(f).pipe(res); });
  await new Promise(r => server.listen(0, "127.0.0.1", r));
  const browser = await playwright.chromium.launch({ args: ["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist"] });
  const errors = [], log = [];
  try {
    const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
    page.on("pageerror", e => errors.push(e.message));
    // (a baby of hers, which nothing attacks, so the flyer comes for her)
    await page.goto(`http://127.0.0.1:${server.address().port}/?seed=${seed}&creator=0&wave=off&arena=${encodeURIComponent(`hare*1@0,${species}*1@2`)}`);
    await page.waitForFunction(() => window.witch && window.witch.ready, null, { timeout: 600000, polling: 500 });
    await page.keyboard.press("Enter");
    await page.waitForFunction(() => window.witch.game.clock.time > 1, null, { timeout: 600000, polling: 500 });
    if (process.env.BRIGHT) await page.addStyleTag({ content: `canvas { filter: brightness(${+process.env.BRIGHT}) }` });
    const id = await page.evaluate(sp => { const g = window.witch.game; g.witches[0].health.hp = 1e6; return g.arena.ids.find(i => g.creatures[i].species === sp); }, species);
    const step = n => page.evaluate(([n, id, walk]) => {
      const w = window.witch, C = { moveX: walk, moveZ: 0, toggleMode: false, zoom: 0, autoTalk: false }; w.manual = true;
      for (let k = 0; k < n; k++) w.frame(C, 1 / 30, k === n - 1);
      const g = w.game, c = g.creatures[id], s = c.swoop;
      return { t: g.clock.time, phase: s ? s.phase : "-", up: !!(s && s.up), hp: g.witches[0].health.hp };
    }, [n, id, WALK]);
    let seen = new Set(), k = 0;
    for (let i = 0; i < MAX; i += EVERY) {
      const st = await step(EVERY);
      seen.add(st.phase);
      log.push(`${st.t.toFixed(2)} ${st.phase}${st.up ? " (up)" : ""}`);
      if (seen.has("tele") || i > 24) { await page.screenshot({ path: path.join(dir, `f${String(k++).padStart(3, "0")}.png`), clip: { x: 340, y: 40, width: 600, height: 520 } }); }
      if (seen.has("climb") && st.phase === "circle") break;
    }
    if (k) execFileSync("ffmpeg", ["-y", "-loglevel", "error", "-framerate", String(30 / EVERY), "-i", path.join(dir, "f%03d.png"), "-vf", "scale=360:-1:flags=neighbor,split[a][b];[a]palettegen=max_colors=96[p];[b][p]paletteuse=dither=none", path.join(outDir, `${species}.gif`)]);
    console.log(log.join("\n"));
  } finally { await browser.close(); server.close(); }
  if (errors.length) { console.error(errors.join("\n")); process.exit(1); }
})();
