// A creature joining the party (render/leash.ts: the join burst; render/view/creatures.ts: its hops): the built game (DIST,
// default dist/) at 1280×720 on a seed; she stands by a wild creature and invites it (the debug key I), and frames are saved
// as it joins, cropped round it.  npm run build && node tools/smoke/party-join.cjs <out dir> [seed]
const http = require("http"), fs = require("fs"), path = require("path");
let playwright; try { playwright = require("playwright"); } catch { playwright = require("/opt/node22/lib/node_modules/playwright"); }
const [outDir = "previews/party-join", seed = "123"] = process.argv.slice(2);
const root = path.resolve(process.env.DIST || path.join(__dirname, "../../dist"));
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
    await page.goto(`http://127.0.0.1:${server.address().port}/?seed=${seed}&creator=0&wave=off`);
    await page.waitForFunction(() => window.witch && window.witch.ready, null, { timeout: 600000, polling: 500 });
    await page.keyboard.press("Enter");
    await page.waitForFunction(() => window.witch.game.clock.time > 4, null, { timeout: 600000, polling: 500 });
    // The nearest young wild creature to home: she lands beside it.
    const id = await page.evaluate(([ax, az]) => {
      const g = window.witch.game, D = g.map.dancefloor;
      const c = g.creatures.filter(c => !c.gone && !c.boss && c.level === 1 && !c.leashed && c.state !== "happy").sort((a, b) => Math.hypot(a.x - D.x, a.z - D.z) - Math.hypot(b.x - D.x, b.z - D.z))[0];
      // brought to home's open ground for the picture (a debug shortcut), where she lands beside it
      const x = D.x + ax, z = D.z + az; Object.assign(c, { cell: g.map.centreCell, homeX: x, homeZ: z, anchorX: x, anchorZ: z, x, z, tx: x, tz: z, rest: 99 }); g.byArea = null;
      g.witch = { ...g.witch, x: x - 3.5, z: z + 2.5, seated: false, mode: "ground", lift: 0 };
      return c.id;
    }, [+process.env.AT_X || 30, +process.env.AT_Z || 16]); // (AT_X, AT_Z: where, from the dancefloor)
    await page.waitForFunction(t => window.witch.game.clock.time > t, (await page.evaluate(() => window.witch.game.clock.time)) + 3, { timeout: 600000, polling: 500 }); // (game time: the camera settles)
    // Stepped by hand a fixed 0.1 s a frame (the screenshots are slow), inviting on the first.
    for (let i = 0; i < 10; i++) {
      await page.evaluate(i => { const w = window.witch, C = o => ({ moveX: 0, moveZ: 0, toggleMode: false, zoom: 0, ...o }); w.manual = true; w.frame(C(i === 0 ? { inviteNearest: true } : {}), i === 0 ? 1 / 60 : 0.1); }, i);
      await page.screenshot({ path: path.join(outDir, `join-${i}.png`), clip: { x: 440, y: 160, width: 400, height: 300 } });
    }
    console.log("joined:", await page.evaluate(id => { const c = window.witch.game.creatures[id]; return `${c.species} leashed=${c.leashed} state=${c.state}`; }, id));
  } finally { await browser.close(); server.close(); }
  if (errors.length) { console.error(errors.join("\n")); process.exit(1); }
})();
