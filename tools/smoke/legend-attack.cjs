// An angry legend's long-range attack seen from the treetops (Ed, 2026-10-06: "I see an angry legend probably doing an attack
// animation but I don't see it firing anything"): the built game (DIST, default dist/) at 1280×720, a lobbing legend made angry,
// the witch in the treetops LEGEND_DIST metres south and 40 m west of it (out of its reach as a target up there, so it bombards a soundsystem
// set down in view to her left), stepped frame by frame through its wind-up, throw and landing; screenshots every EVERY frames
// into <out dir>/f<NN>.png and a strip of them, strip.png.
//   npm run build && node tools/smoke/legend-attack.cjs [out dir] [seed]   (DIST=..., LEGEND_DIST=60, EVERY=20, SHOTS=14)
const http = require("http"), fs = require("fs"), path = require("path");
let playwright; try { playwright = require("playwright"); } catch { playwright = require("/opt/node22/lib/node_modules/playwright"); }
const [outDir = "previews/legend-attack/after", seed = "123"] = process.argv.slice(2);
const root = path.resolve(process.env.DIST || path.join(__dirname, "../../dist")), DIST_M = +(process.env.LEGEND_DIST || 60), EVERY = +(process.env.EVERY || 20), SHOTS = +(process.env.SHOTS || 14);
const types = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".json": "application/json", ".png": "image/png", ".wasm": "application/wasm", ".mp3": "audio/mpeg" };
(async () => {
  fs.mkdirSync(outDir, { recursive: true });
  const server = http.createServer((req, res) => { const p = path.join(root, decodeURIComponent(new URL(req.url, "http://x").pathname)), f = fs.existsSync(p) && fs.statSync(p).isDirectory() ? path.join(p, "index.html") : p; if (!fs.existsSync(f)) { res.writeHead(404); res.end(); return; } res.writeHead(200, { "Content-Type": types[path.extname(f)] || "application/octet-stream" }); fs.createReadStream(f).pipe(res); });
  await new Promise(r => server.listen(0, "127.0.0.1", r));
  const browser = await playwright.chromium.launch({ args: ["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist"] });
  const errors = [];
  try {
    const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
    page.on("pageerror", e => errors.push(e.message));
    await page.goto(`http://127.0.0.1:${server.address().port}/?seed=${seed}&creator=0&wave=off`);
    await page.waitForFunction(() => window.witch && window.witch.ready, null, { timeout: 600000, polling: 500 });
    await page.keyboard.press("Enter");
    await page.waitForFunction(() => window.witch.game.clock.time > 2, null, { timeout: 600000, polling: 500 });
    // A lobbing legend (not a beam or a charger), nearest home.
    const info = await page.evaluate(([D]) => {
      const g = window.witch.game, H = g.map.dancefloor, beam = ["owl", "salamander", "spider", "raven", "bat", "glowworm", "moth", "snake", "toad", "woodlouse"], charge = ["boar", "elk", "stag", "ram", "hedgehog", "woodlouse"];
      const L = g.creatures.filter(c => c.boss && !c.gone && !beam.includes(c.species) && !charge.includes(c.species)).sort((a, b) => Math.hypot(a.x - H.x, a.z - H.z) - Math.hypot(b.x - H.x, b.z - H.z))[0];
      g.witch = { ...g.witch, x: L.x - 40, z: L.z + D, seated: false, mode: "treetop", lift: 1, vx: 0, vz: 0 };
      g.clock.paused = false;
      return { id: L.id, species: L.species, x: L.x, z: L.z };
    }, [DIST_M]);
    await page.waitForTimeout(40000); // (the art in round her)
    await page.evaluate(([id, D]) => {
      const g = window.witch.game, c = g.creatures[id], t = g.clock.time;
      g.witch = { ...g.witch, x: c.x - 40, z: c.z + D, mode: "treetop", lift: 1, vx: 0, vz: 0 };
      for (const k of g.creatures) if (k !== c && k.species === c.species) k.gone = true; // (none of its kind about: it stays angry, rules/legends.ts)
      Object.assign(c, { legendState: "angry", enraged: true, state: "enraged", asleep: false, lairX: c.x, lairZ: c.z, fight: { target: null, readyAt: t + 0.3, windupUntil: 0, aimX: 0, aimZ: 0 } });
      // a soundsystem in view between them, in its reach, for it to bombard (she's out of reach as a target up in the treetops)
      g.combat.sounds.set("test", { x: c.x - 115, z: c.z + D * 0.8, hp: 1e6, max: 1e6, radius: 6 });
    }, [info.id, DIST_M]);
    const C = { moveX: 0, moveZ: 0, toggleMode: false, zoom: 0 };
    const shots = [];
    for (let i = 0; i < SHOTS; i++) {
      const st = await page.evaluate(([C, n, id]) => { let r; for (let k = 0; k < n; k++) r = window.witch.frame(C, 1 / 60, k === n - 1); const g = window.witch.game, c = g.creatures[id]; return { t: g.clock.time.toFixed(2), windup: !!(c.fight && c.fight.windupUntil > 0), shots: g.combat.shots.filter(s => s.from === id).length, beams: g.combat.beams.filter(b => b.from === id).length }; }, [C, i === 0 ? 1 : EVERY, info.id]);
      const f = path.join(outDir, `f${String(i).padStart(2, "0")}.png`);
      await page.screenshot({ path: f, timeout: 180000 });
      shots.push({ f, ...st });
      console.log(i, JSON.stringify(st));
    }
    // the strip: every other frame, scaled down
    const pick = shots.filter((_, i) => i % 2 === 0).slice(0, 7);
    const imgs = pick.map(s => `<div style="display:inline-block;position:relative"><img src="data:image/png;base64,${fs.readFileSync(s.f).toString("base64")}" width="426" height="240"><span style="position:absolute;left:6px;top:4px;color:#fff;font:12px monospace;background:#0008;padding:1px 4px">t ${s.t} ${s.windup ? "winding up" : s.shots ? "lob in flight" : ""}</span></div>`).join("");
    const sp = await browser.newPage({ viewport: { width: 426 * pick.length, height: 240 } });
    await sp.setContent(`<body style="margin:0;background:#000;white-space:nowrap">${imgs}</body>`); await sp.screenshot({ path: path.join(outDir, "strip.png") });
    console.log(info.species, "legend at", Math.round(info.x), Math.round(info.z), "| wrote", outDir);
  } finally { await browser.close(); server.close(); }
  if (errors.length) { console.log("errors:", errors.slice(0, 5)); process.exitCode = 1; }
})();
