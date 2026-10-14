// A 💌 refused by an enraged animal (Ed, 2026-10-12, docs/backlog/gameplay.md "Invitations bounce off the enraged"; the rules'
// "blocked" in rules/invites.ts, drawn by render/invites.ts, its whine chimes.ts refused): the built game (DIST, default dist/)
// at 1280×720, her in the debug arena with one SPECIES (default wolf) at level 2 made enraged and stood 9 m off,
// throwing 💌s at it, frames stepped by hand at a fixed 1/30 s, a crop every EVERY frames saved, then made into
// <out dir>/<species>.gif and a contact sheet <out dir>/<species>-sheet.png (every SHEET_EVERY-th saved frame in a row).
//   npm run build && node tools/smoke/bounce-off.cjs <out dir> [species] [seed]
const http = require("http"), fs = require("fs"), path = require("path"), { execFileSync } = require("child_process");
let playwright; try { playwright = require("playwright"); } catch { playwright = require("/opt/node22/lib/node_modules/playwright"); }
const [outDir = "previews/bounce-off", species = "wolf", seed = "5"] = process.argv.slice(2);
const EVERY = +(process.env.EVERY || 2), MAX = +(process.env.MAX || 150), SHEET_EVERY = +(process.env.SHEET_EVERY || 5);
// CROP=x:y:w:h cuts a close-up of every saved frame (in the saved frame's pixels, drawn at twice the size) into
// <out dir>/<species>-closeup.gif and a 3-wide sheet of its first 12 frames from FROM (a saved frame's number).
const CROP = (process.env.CROP || "").split(":").map(Number), FROM = +(process.env.FROM || 0);
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
    // (the arena's first group is hers: a baby hare of hers, then the wild one)
    await page.goto(`http://127.0.0.1:${server.address().port}/?seed=${seed}&creator=0&wave=off&arena=${encodeURIComponent(`hare*1@0,${species}*1@2`)}`);
    await page.waitForFunction(() => window.witch && window.witch.ready, null, { timeout: 600000, polling: 500 });
    await page.keyboard.press("Enter");
    await page.waitForFunction(() => window.witch.game.clock.time > 1, null, { timeout: 600000, polling: 500 });
    if (process.env.BRIGHT) await page.addStyleTag({ content: `canvas { filter: brightness(${+process.env.BRIGHT}) }` });
    // The animal enraged (so it refuses her letters: rules/affection.ts blocksLetters), stood 7 m off to her right and a little
    // toward the camera, her unhurt whatever it does.
    // (held at that spot every frame: enraged, it would march off to besiege a soundsystem)
    // The opening's DJ routine over first (it holds her at the decks for its 13 beats): 8 s of frames, undrawn.
    await page.evaluate(() => { const w = window.witch; w.manual = true; const C = { moveX: 0, moveZ: 0, toggleMode: false, zoom: 0, autoTalk: false }; for (let k = 0; k < 240; k++) w.frame(C, 1 / 30, false); });
    // She steps down off her decks to the arena's ground beside it (on the treehouse deck a 💌 vanishes at the rail).
    const id = await page.evaluate(sp => { const g = window.witch.game, w = g.witches[0]; w.health.hp = 1e6; const id = g.arena.ids.find(i => g.creatures[i].species === sp), c = g.creatures[id]; c.enraged = true; w.body = { ...w.body, seated: false, perch: false, mode: "ground", x: c.x - 9, z: c.z - 2 }; window.__spot = { x: c.x, z: c.z }; return id; }, species);
    const step = n => page.evaluate(([n, id]) => {
      const w = window.witch, g = w.game, c = g.creatures[id], b = g.witches[0].body;
      const C = { moveX: 0, moveZ: 0, toggleMode: false, zoom: 0, autoTalk: false, fire: true, aimX: c.x - b.x, aimZ: c.z - b.z }; w.manual = true;
      for (let k = 0; k < n; k++) { c.x = window.__spot.x; c.z = window.__spot.z; c.fight = undefined; c.vx = c.vz = 0; w.frame(C, 1 / 30, k === n - 1); } // (held there, no lunging at her)
      const ev = g.witches[0].invites.events.map(e => e.kind);
      return { t: g.clock.time, letters: g.witches[0].invites.letters.length, blocked: ev.filter(k => k === "blocked").length, d: Math.hypot(c.x - b.x, c.z - b.z) };
    }, [n, id]);
    let k = 0, blocked = 0;
    for (let i = 0; i < MAX; i += EVERY) {
      const st = await step(EVERY);
      blocked += st.blocked;
      log.push(`${st.t.toFixed(2)} letters ${st.letters} blocked ${st.blocked} at ${st.d.toFixed(1)} m`);
      await page.screenshot({ path: path.join(dir, `f${String(k++).padStart(3, "0")}.png`), clip: { x: 280, y: 60, width: 760, height: 500 } });
    }
    if (k) {
      execFileSync("ffmpeg", ["-y", "-loglevel", "error", "-framerate", String(30 / EVERY), "-i", path.join(dir, "f%03d.png"), "-vf", "scale=360:-1:flags=neighbor,split[a][b];[a]palettegen=max_colors=96[p];[b][p]paletteuse=dither=none", path.join(outDir, `${species}.gif`)]);
      execFileSync("ffmpeg", ["-y", "-loglevel", "error", "-i", path.join(dir, "f%03d.png"), "-vf", `select=not(mod(n\\,${SHEET_EVERY})),scale=240:-1:flags=neighbor,tile=${Math.ceil(k / SHEET_EVERY)}x1`, "-frames:v", "1", path.join(outDir, `${species}-sheet.png`)]);
    }
    if (k && CROP.length === 4) {
      const cut = `crop=${CROP[2]}:${CROP[3]}:${CROP[0]}:${CROP[1]},scale=${CROP[2] * 2}:-1:flags=neighbor`;
      execFileSync("ffmpeg", ["-y", "-loglevel", "error", "-framerate", String(30 / EVERY), "-start_number", String(FROM), "-i", path.join(dir, "f%03d.png"), "-vf", `${cut},split[a][b];[a]palettegen=max_colors=64[p];[b][p]paletteuse=dither=none`, path.join(outDir, `${species}-closeup.gif`)]);
      execFileSync("ffmpeg", ["-y", "-loglevel", "error", "-start_number", String(FROM), "-i", path.join(dir, "f%03d.png"), "-frames:v", "1", "-vf", `select=lt(n\\,12),${cut},tile=3x4`, path.join(outDir, `${species}-closeup.png`)]);
    }
    console.log(log.join("\n"));
    console.log(`${blocked} letters refused; ${k} frames in ${outDir}/${species}.gif and ${species}-sheet.png`);
    if (!blocked) { console.error("no letter was refused"); process.exit(1); }
  } finally { await browser.close(); server.close(); }
  if (errors.length) { console.error(errors.join("\n")); process.exit(1); }
})();
