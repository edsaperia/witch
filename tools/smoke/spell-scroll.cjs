// The party spell's scroll (ui/spellScroll.ts; Ed, 2026-10-06): the built game (DIST, default dist/) at 1280×720 on a seed, the
// creator open, the forest grown; the cursor comes in from the far side to the scroll (its 🎶 glowing, the paper rippling, the
// screen darkening), drifts off and back, then clicks: the scroll grows, crackles, bursts, and the game runs with the spell
// cast. Fails on a page error, or if play hasn't started with the spell cast. Writes scroll.gif and the stills far.png,
// near.png, grow.png, burst.png, after.png.
//   npm run build && node tools/smoke/spell-scroll.cjs [out dir] [seed]
const http = require("http"), fs = require("fs"), path = require("path"), os = require("os"), { execFileSync } = require("child_process");
let playwright; try { playwright = require("playwright"); } catch { playwright = require("/opt/node22/lib/node_modules/playwright"); }
const [outDir = "previews/spell-scroll", seed = "123"] = process.argv.slice(2);
const root = path.resolve(process.env.DIST || path.join(__dirname, "../../dist")), tmp = fs.mkdtempSync(path.join(os.tmpdir(), "witch-scroll-"));
const types = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".json": "application/json", ".png": "image/png", ".wasm": "application/wasm" };
(async () => {
  fs.mkdirSync(outDir, { recursive: true });
  const server = http.createServer((req, res) => { const p = path.join(root, decodeURIComponent(new URL(req.url, "http://x").pathname)), f = fs.existsSync(p) && fs.statSync(p).isDirectory() ? path.join(p, "index.html") : p; if (!f.startsWith(root) || !fs.existsSync(f)) { res.writeHead(404); res.end(); return; } res.writeHead(200, { "content-type": types[path.extname(f)] || "application/octet-stream" }); fs.createReadStream(f).pipe(res); });
  await new Promise(r => server.listen(0, "127.0.0.1", r));
  const browser = await playwright.chromium.launch({ args: ["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist"] });
  const errors = [];
  try {
    const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
    page.on("pageerror", e => errors.push(e.message));
    await page.goto(`http://127.0.0.1:${server.address().port}/?seed=${seed}`);
    await page.waitForSelector("#creator-start", { timeout: 120000 });
    await page.waitForFunction(() => window.witch && window.witch.ready, null, { timeout: 900000, polling: 1000 });
    await page.waitForTimeout(1500);
    const box = await page.locator("#creator-start").boundingBox(), sx = box.x + box.width / 2, sy = box.y + box.height / 2;
    let n = 0;
    const shot = async name => { const f = path.join(tmp, `f${String(n++).padStart(3, "0")}.png`); await page.screenshot({ path: f }); if (name) fs.copyFileSync(f, path.join(outDir, name)); };
    // the approach: from the far left to the scroll, a little off, and back on
    const path0 = [];
    for (let i = 0; i <= 24; i++) { const k = i / 24; path0.push([200 + (sx - 200) * k, 300 + (sy - 300) * k]); }
    for (let i = 0; i <= 8; i++) path0.push([sx - 260 * Math.sin(i / 8 * Math.PI), sy - 80 * Math.sin(i / 8 * Math.PI)]);
    for (const [i, [x, y]] of path0.entries()) { await page.mouse.move(x, y); await page.waitForTimeout(60); await shot(i === 0 ? "far.png" : i === 24 ? "near.png" : null); }
    for (let i = 0; i < 6; i++) { await page.waitForTimeout(60); await shot(); }
    // the click: grow, crackle, burst, clear
    await page.mouse.click(sx, sy);
    const t0 = Date.now();
    let grew = false, burst = false;
    while (Date.now() - t0 < 2600) { const dt = Date.now() - t0, name = !grew && dt > 300 ? (grew = true, "grow.png") : !burst && dt > 1000 ? (burst = true, "burst.png") : null; await shot(name); await page.waitForTimeout(20); }
    await page.waitForTimeout(500); await shot("after.png");
    const st = await page.evaluate(() => { const g = window.witch.game; return { paused: g.clock.paused, spellAt: g.party.spellAt, creator: window.__creator.open }; });
    console.log("after", JSON.stringify(st), "frames", n);
    if (st.paused || st.creator || typeof st.spellAt !== "number") throw new Error(`play didn't start with the spell cast: ${JSON.stringify(st)}`);
    execFileSync("ffmpeg", ["-y", "-loglevel", "error", "-framerate", "12", "-i", path.join(tmp, "f%03d.png"), "-vf", "scale=640:-1:flags=lanczos,split[a][b];[a]palettegen=max_colors=160:stats_mode=diff[p];[b][p]paletteuse=dither=bayer:bayer_scale=4:diff_mode=rectangle", path.join(outDir, "scroll.gif")]);
  } finally { await browser.close(); server.close(); fs.rmSync(tmp, { recursive: true, force: true }); }
  if (errors.length) { console.error(errors.join("\n")); process.exit(1); }
})().catch(e => { console.error(e); process.exit(1); });
