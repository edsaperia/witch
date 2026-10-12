// Her hats out in the world at once (Ed, 2026-10-12: "If there are multiple hats on the ground, they each get a pointer. Make the
// hat on the hat pointer a different colour for each hat"; each lying in the look it went down in): the built game (DIST, default
// dist/) at 1600x900, her own hat down by her feet and two left in other looks, one on screen and one off it. Shot: hats-out.
// Fails on a page error.
//   npm run build && node tools/hats/hats-out-shots.cjs <out dir> [seed]
const http = require("http"), fs = require("fs"), path = require("path");
let playwright; try { playwright = require("playwright"); } catch { playwright = require("/opt/node22/lib/node_modules/playwright"); }
const [outDir = "previews/hats-out", seed = "123"] = process.argv.slice(2);
const root = path.resolve(process.env.DIST || path.join(__dirname, "../../dist"));
const types = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".json": "application/json", ".png": "image/png", ".wasm": "application/wasm", ".woff2": "font/woff2", ".ogg": "audio/ogg" };
(async () => {
  fs.mkdirSync(outDir, { recursive: true });
  const server = http.createServer((req, res) => { const p = path.join(root, decodeURIComponent(new URL(req.url, "http://x").pathname)), f = fs.existsSync(p) && fs.statSync(p).isDirectory() ? path.join(p, "index.html") : p; if (!f.startsWith(root) || !fs.existsSync(f)) { res.writeHead(404); res.end(); return; } res.writeHead(200, { "content-type": types[path.extname(f)] || "application/octet-stream" }); fs.createReadStream(f).pipe(res); });
  await new Promise(r => server.listen(0, "127.0.0.1", r));
  const browser = await playwright.chromium.launch({ args: ["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist"] });
  const errors = [], out = {};
  try {
    const page = await browser.newPage({ viewport: { width: 1600, height: 900 } });
    page.on("pageerror", e => errors.push(e.message));
    await page.goto(`http://127.0.0.1:${server.address().port}/?seed=${seed}&creator=0&wave=off&hat=helmet`);
    await page.waitForFunction(() => window.witch && window.witch.ready, null, { timeout: 900000, polling: 500 });
    await page.keyboard.press("Enter");
    await page.waitForFunction(() => window.witch.game.clock.time > 4, null, { timeout: 900000, polling: 500 });
    // three hats out: hers by her feet, and two left in other looks (a red cowboy hat on screen, a green wizard's off it)
    await page.evaluate(() => {
      const { game: g, view: v } = window.witch, d = g.map.dancefloor, x = d.x + 40, z = d.z + 40, H = g.witches[0].hat, now = g.clock.time;
      const base = { hat: { shape: "classic", height: 1, brim: 1, tilt: 0, band: 1 }, hair: "long", top: "jacket", cloak: "none", broom: { kind: "classic", length: 1, bend: 0, bristles: 1, thickness: 1 }, accessories: {}, cloakLength: 1, scarfLength: 1, bagSize: 1, backpackSize: 0, palette: null };
      const look = (shape, hat) => ({ ...base, hat: { ...base.hat, shape }, palette: { hat, band: [0.15, 0.9, 0.7] } });
      g.witch = { ...g.witch, x, z, vx: 0, vz: 0, mode: "ground", lift: 0, perch: undefined, seated: false };
      H.down = { x: x + 4, z: z + 1, at: now };
      const a = { x: x - 9, z: z - 3, at: now - 30, spell: "sentry" }, b = { x: x + 70, z: z - 90, at: now - 20, spell: "bramble" };
      H.left.push(a, b);
      v.hatLooks.set(`${a.x},${a.z},${a.at}`, look("cowboy", [0.0, 0.75, 0.45]));
      v.hatLooks.set(`${b.x},${b.z},${b.at}`, look("wizard", [0.33, 0.7, 0.4]));
    });
    await page.waitForTimeout(6000);
    await page.screenshot({ path: path.join(outDir, "hats-out.png") });
    out.left = await page.evaluate(() => window.witch.game.witches[0].hat.left.length);
  } finally { await browser.close(); server.close(); }
  console.log(JSON.stringify({ ...out, errors }));
  if (errors.length || out.left !== 2) process.exit(1);
})();
