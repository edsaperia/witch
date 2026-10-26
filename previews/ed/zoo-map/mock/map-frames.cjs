// Mock (not for merging): frames of the zoo-as-map idea from the built game at ?zoo (its streets made wide flagstones by the mock's
// hack): on a street between blocks, in a block (an island's area with its animal), and from the treetops.
//   node tools/zoo/map-frames.cjs [out] [dist]   KIND (wolf)
const http = require("http"), fs = require("fs"), path = require("path");
let playwright; try { playwright = require("playwright"); } catch { playwright = require("/opt/node22/lib/node_modules/playwright"); }
const [outArg = "previews/ed/zoo-map", distArg] = process.argv.slice(2), out = path.resolve(outArg), root = path.resolve(distArg || "dist");
const KIND = process.env.KIND || "wolf";
const types = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".json": "application/json", ".png": "image/png", ".wasm": "application/wasm", ".woff2": "font/woff2", ".ogg": "audio/ogg" };
const t0 = Date.now(), log = (...a) => console.log(`[${((Date.now() - t0) / 1000).toFixed(0)} s]`, ...a);
(async () => {
  fs.mkdirSync(out, { recursive: true });
  const server = http.createServer((req, res) => { const p = path.join(root, decodeURIComponent(new URL(req.url, "http://x").pathname)), f = fs.existsSync(p) && fs.statSync(p).isDirectory() ? path.join(p, "index.html") : p; if (!f.startsWith(root) || !fs.existsSync(f)) { res.writeHead(404); res.end(); return; } res.writeHead(200, { "Content-Type": types[path.extname(f)] || "application/octet-stream" }); fs.createReadStream(f).pipe(res); });
  await new Promise(r => server.listen(0, "127.0.0.1", r));
  const browser = await playwright.chromium.launch({ args: ["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist"] });
  const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
  page.on("pageerror", e => log("pageerror", e.message));
  await page.goto(`http://127.0.0.1:${server.address().port}/?zoo&creator=0`);
  await page.waitForFunction(() => window.witch && window.witch.ready, null, { timeout: 1800000, polling: 500 });
  await page.keyboard.press("Enter");
  const b = await page.evaluate(k => { const Z = window.witch.game.map.zoo; return Z.blocks.find(x => x.kind === k) ?? Z.blocks[10]; }, KIND);
  log("block", JSON.stringify(b));
  const put = (x, z, mode = "ground") => page.evaluate(([x, z, mode]) => { const W = window.witch.game.witches[0]; W.body = { ...W.body, x, z, vx: 0, vz: 0, seated: false, perch: false, mode, lift: mode === "ground" ? 0 : 1 }; }, [x, z, mode]);
  const settle = async (min = 20, max = 300) => { const tb = Date.now(); await page.waitForTimeout(min * 1000); while ((Date.now() - tb) / 1000 < max) { const s = await page.evaluate(() => ({ trees: window.witch.view.stats.trees, pending: window.witch.view.assets.pending ?? 0, q: window.witch.view.assets.queue.length })); if (s.trees > 0 && !s.q) break; await page.waitForTimeout(5000); } };
  const A = await page.evaluate(() => window.witch.game.map.areaSize);
  const shots = [
    ["street", (b.cell[0]) * A + 1, (b.cell[1] + 0.5) * A, "ground"], // (on the street at the block's west edge)
    ["island", (b.cell[0] + 0.5) * A, (b.cell[1] + 0.62) * A, "ground"], // (in the block, south of its runestone)
    ["above", (b.cell[0]) * A, (b.cell[1] + 0.5) * A, "treetop"],
  ];
  for (const [name, x, z, mode] of shots) {
    await put(x, z, mode);
    await settle(name === "street" ? 40 : 20);
    await page.evaluate(() => { const s = document.getElementById("start"); if (s) s.style.display = "none"; });
    await page.screenshot({ path: path.join(out, `frame-${name}.png`) });
    log(name, "done");
  }
  await browser.close(); server.close();
})().catch(e => { console.error(e); process.exit(1); });
