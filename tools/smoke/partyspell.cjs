// The start of play (Ed, 2026-10-06: "you are standing behind your decks in your treehouse, there is a button on the screen
// that says "CAST THE PARTY SPELL", when you press it, the witch does a spellcasting animation ... and you can start moving
// around"): the built game (DIST, default dist/) at 1280×720 on a seed, frames stepped by hand a fixed 1/30 s. Waiting at
// the decks (the clock at 00:00, held though she's told to move; the creator skipped: Enter casts it, the scroll's way is
// tools/smoke/spell-scroll.cjs), the cast (its sparkles, the clock running), her needle-drop routine at the decks (held till it ends: rules/djSet.ts), then off she goes. Writes start.gif and the stills waiting.png, casting.png, off.png.
//   npm run build && node tools/smoke/partyspell.cjs [out dir] [seed]
const http = require("http"), fs = require("fs"), path = require("path"), os = require("os"), { execFileSync } = require("child_process");
let playwright; try { playwright = require("playwright"); } catch { playwright = require("/opt/node22/lib/node_modules/playwright"); }
const [outDir = "previews/partyspell", seed = "123"] = process.argv.slice(2);
const root = path.resolve(process.env.DIST || path.join(__dirname, "../../dist")), tmp = fs.mkdtempSync(path.join(os.tmpdir(), "witch-spell-"));
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
    await page.goto(`http://127.0.0.1:${server.address().port}/?seed=${seed}&creator=0&spell=wait`);
    await page.waitForFunction(() => window.witch && window.witch.ready, null, { timeout: 600000, polling: 500 });
    await page.keyboard.press("Enter"); // (past the start screen: the clock not yet run, so not a cast)
    await page.waitForFunction(() => window.witch.game.party.spellAt === null && !window.witch.game.clock.paused, null, { timeout: 600000, polling: 500 });
    await page.waitForTimeout(8000); // (the treehouse's art in)
    // from here the loop stands still and each frame is stepped by hand; the HUD's clock and button kept as the loop keeps them
    const step = o => page.evaluate(o => {
      const w = window.witch, g = w.game; w.manual = true;
      w.frame({ moveX: 0, moveZ: 0, toggleMode: false, zoom: 0, ...o }, 1 / 30);
      const s = g.party.spellAt == null ? 0 : Math.max(0, Math.floor(g.clock.time - g.party.spellAt));
      document.querySelector("#clock").textContent = `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;
      return { x: g.witch.x, z: g.witch.z, spellAt: g.party.spellAt, t: g.clock.time, boot: g.party.bootUntil - g.clock.time };
    }, o);
    let n = 0, last;
    const shot = async name => { const f = path.join(tmp, `f${String(n++).padStart(3, "0")}.png`); await page.screenshot({ path: f }); if (name) fs.copyFileSync(f, path.join(outDir, name)); };
    const film = async (o, frames, still) => { for (let i = 0; i < frames; i++) { last = await step(typeof o === "function" ? o(i) : o); await shot(i === Math.floor(frames / 2) ? still : null); } };
    // waiting: told to move, and held
    const x0 = (await step({})).x;
    await film({ moveX: 1 }, 18, "waiting.png");
    if (Math.abs(last.x - x0) > 1e-6 || last.spellAt !== null) throw new Error(`she moved before the spell: ${JSON.stringify(last)}`);
    console.log("waiting", JSON.stringify(last));
    // the press (as the button does), the cast, then off
    await film(i => (i === 0 ? { castParty: true, moveX: 1 } : { moveX: 1 }), 300, "casting.png");
    console.log("cast", JSON.stringify(last));
    await film({ moveX: 1, moveZ: 0.3 }, 30, "off.png");
    console.log("off", JSON.stringify(last));
    if (!(last.x > x0 + 1)) throw new Error("she didn't move after the cast");
    execFileSync("ffmpeg", ["-y", "-loglevel", "error", "-framerate", "30", "-i", path.join(tmp, "f%03d.png"), "-vf", "fps=15,scale=640:-1:flags=lanczos,split[a][b];[a]palettegen=max_colors=128:stats_mode=diff[p];[b][p]paletteuse=dither=none:diff_mode=rectangle", path.join(outDir, "start.gif")]);
    console.log("frames", n);
  } finally { await browser.close(); server.close(); fs.rmSync(tmp, { recursive: true, force: true }); }
  if (errors.length) { console.error(errors.join("\n")); process.exit(1); }
})().catch(e => { console.error(e); process.exit(1); });
