// A knockdown's wait at the decks in play (Ed, 2026-10-07): the built game (DIST, default dist/) at 1280×720, the party spell
// cast at once (?spell=auto), she steps off, is hit till she's knocked out (window.witch.hit), then is filmed frame by frame at
// a fixed 1/30 s from going down to free: her hat, the teleport, her scratching behind the decks and the knockdown candles
// melting along the desk's front (rules/djSet.ts). KOS=2 knocks her out that many times running (the wait growing, more
// candles). Saves respawn.gif (cropped round the booth, ×2) and respawn-<k>.png stills at a few moments of the last wait.
//   npm run build && node tools/dj/respawn.cjs [out dir] [seed]
const http = require("http"), fs = require("fs"), path = require("path"), os = require("os"), { execFileSync } = require("child_process");
let playwright; try { playwright = require("playwright"); } catch { playwright = require("/opt/node22/lib/node_modules/playwright"); }
const [outDir = "previews/dj", seed = "123"] = process.argv.slice(2), KOS = +(process.env.KOS || 1);
const root = path.resolve(process.env.DIST || path.join(__dirname, "../../dist")), tmp = fs.mkdtempSync(path.join(os.tmpdir(), "witch-ko-"));
const types = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".json": "application/json", ".png": "image/png", ".wasm": "application/wasm" };
(async () => {
  fs.mkdirSync(outDir, { recursive: true });
  const server = http.createServer((req, res) => { const p = path.join(root, decodeURIComponent(new URL(req.url, "http://x").pathname)), f = fs.existsSync(p) && fs.statSync(p).isDirectory() ? path.join(p, "index.html") : p; if (!fs.existsSync(f)) { res.writeHead(404); res.end(); return; } res.writeHead(200, { "content-type": types[path.extname(f)] || "application/octet-stream" }); fs.createReadStream(f).pipe(res); });
  await new Promise(r => server.listen(0, "127.0.0.1", r));
  const browser = await playwright.chromium.launch({ args: ["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist"] });
  const errors = [];
  try {
    const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
    page.on("pageerror", e => errors.push(e.message));
    await page.goto(`http://127.0.0.1:${server.address().port}/?seed=${seed}&creator=0&spell=auto`);
    await page.waitForFunction(() => window.witch && window.witch.ready, null, { timeout: 600000, polling: 500 });
    await page.keyboard.press("Enter");
    await page.waitForFunction(() => !window.witch.game.clock.paused, null, { timeout: 600000, polling: 500 });
    await page.waitForTimeout(6000); // (the treehouse's art in)
    const step = (o, n = 1) => page.evaluate(([o, n]) => {
      const w = window.witch, g = w.game; w.manual = true;
      for (let i = 0; i < n; i++) w.frame({ moveX: 0, moveZ: 0, toggleMode: false, zoom: 0, ...o }, 1 / 30);
      const v = w.view, b = v.witchBase, p = v.camera.position.clone().set(b.x, b.y + 1, b.z).project(v.camera), k = g.witches[0].ko;
      return { x: (p.x + 1) / 2 * innerWidth, y: (1 - p.y) / 2 * innerHeight, ko: k ? { at: k.at, inAt: k.inAt, backAt: k.backAt } : null, t: g.herTime, seated: g.witch.seated };
    }, [o, n]);
    await step({ moveX: 1 }, 30); // off the decks
    let last, n = 0, shotAt = [];
    for (let ko = 0; ko < KOS; ko++) {
      for (let i = 0; i < 40 && !(await page.evaluate(() => window.witch.hit())); i++) await step({}, 3);
      last = await step({});
      if (!last.ko) throw new Error("no knockout");
      console.log("down", JSON.stringify(last.ko));
      const film = ko === KOS - 1;
      while (last.ko && n < 2000) {
        last = await step({});
        if (film) { await page.screenshot({ path: path.join(tmp, `f${String(n).padStart(4, "0")}.png`) }); shotAt.push([n, last]); n++; }
      }
      if (!film) await step({ moveX: 1 }, 30); // off again, into the next knockdown
    }
        const x = 640 - 180, y = 385 - 130; // (the camera follows her: behind the decks she's in the screen's middle)
    execFileSync("ffmpeg", ["-y", "-loglevel", "error", "-framerate", "30", "-i", path.join(tmp, "f%04d.png"), "-vf", `crop=360:220:${x}:${y},scale=iw*2:ih*2:flags=neighbor,split[a][b];[a]palettegen=max_colors=128:stats_mode=diff[p];[b][p]paletteuse=dither=none`, path.join(outDir, "respawn.gif")]);
    const scr = shotAt.filter(([, s]) => s.ko && s.t >= s.ko.inAt), pick = [0, .33, .66, .97].map(q => scr[Math.min(scr.length - 1, Math.floor(q * scr.length))]).filter(Boolean);
    pick.forEach(([i], k) => fs.copyFileSync(path.join(tmp, `f${String(i).padStart(4, "0")}.png`), path.join(outDir, `respawn-full-${k}.png`)));
    pick.forEach(([i], k) => execFileSync("ffmpeg", ["-y", "-loglevel", "error", "-i", path.join(tmp, `f${String(i).padStart(4, "0")}.png`), "-vf", `crop=360:220:${x}:${y},scale=iw*3:ih*3:flags=neighbor`, path.join(outDir, `respawn-${k}.png`)]));
    console.log("frames", n, "saved to", outDir);
  } finally { await browser.close(); server.close(); fs.rmSync(tmp, { recursive: true, force: true }); }
  if (errors.length) { console.error(errors.join("\n")); process.exit(1); }
})().catch(e => { console.error(e); process.exit(1); });
