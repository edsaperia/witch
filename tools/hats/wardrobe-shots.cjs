// Back to her room mid-night from the treehouse deck (Ed's answer 4; main.ts toBedroom, ui/creator.ts visit): the built game
// (DIST, default dist/) at 1600×900; she's put on the deck mid-night, the Bedroom button shows, F opens her room with "Back to the
// island" where the party scroll would be, the Hat box's power is changed, and the way out brings her back on the deck with it.
// Her Helmet lies on the ground beside her meanwhile: it stays there (Ed, 2026-10-12), drawn, and she wears the new one.
// Shots: deck (the button), room (the way out), back. Fails on a page error, a missing button, the swap not taking, or the
// helmet not left where it lay.
//   npm run build && node tools/hats/wardrobe-shots.cjs <out dir> [seed]
const http = require("http"), fs = require("fs"), path = require("path");
let playwright; try { playwright = require("playwright"); } catch { playwright = require("/opt/node22/lib/node_modules/playwright"); }
const [outDir = "previews/wardrobe", seed = "123"] = process.argv.slice(2);
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
    await page.waitForFunction(() => window.witch && window.witch.ready, null, { timeout: 600000, polling: 500 });
    await page.keyboard.press("Enter");
    await page.waitForFunction(() => window.witch.game.clock.time > 4, null, { timeout: 600000, polling: 500 });
    // onto the deck: landed there, off her decks
    await page.evaluate(() => { const g = window.witch.game, T = g.map.treehouse; g.witch = { ...g.witch, x: T.x + 3, z: T.z - 2, vx: 0, vz: 0, mode: "ground", lift: 0, perch: true, seated: false }; g.witches[0].hat.down = { x: T.x + 1, z: T.z - 2, at: g.clock.time }; });
    await page.waitForFunction(() => getComputedStyle(document.getElementById("bedroom-btn")).display !== "none", null, { timeout: 60000, polling: 200 });
    await page.waitForTimeout(1500);
    await page.screenshot({ path: path.join(outDir, "deck.png") });
    await page.keyboard.press("KeyF");
    await page.waitForSelector('#creator button[data-exit]', { state: "visible", timeout: 60000 });
    await page.click('#creator [data-tab="hat"]', { timeout: 120000 });
    await page.selectOption('#creator select[data-spell="hat"]', "healing");
    out.timeScale = await page.evaluate(() => window.witch.game.timeScale);
    await page.waitForTimeout(800);
    await page.screenshot({ path: path.join(outDir, "room.png") });
    await page.click('#creator button[data-exit]');
    await page.waitForTimeout(1500);
    Object.assign(out, await page.evaluate(() => ({ hat: window.witch.game.spells.hat, open: document.getElementById("creator").style.display, perch: !!window.witch.game.witch.perch, wearing: !window.witch.game.witches[0].hat.down, left: window.witch.game.witches[0].hat.left.map(q => q.spell) })));
    await page.screenshot({ path: path.join(outDir, "back.png") });
  } finally { await browser.close(); server.close(); }
  console.log(JSON.stringify({ ...out, errors }));
  if (errors.length || out.hat !== "healing" || out.open !== "none" || !out.wearing || out.left.join() !== "helmet") process.exit(1);
})();
