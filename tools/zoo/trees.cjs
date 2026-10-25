// The zoo's trees (Lima, 2026-10-25: none of its areas showed any trees, even after 90 s): the built game at ?zoo, then her put on
// the ground in a few of its blocks in turn, each waited on till its trees are drawn (the view's own count, view.stats.trees) or
// WAIT seconds pass, with the art queue's state logged (held, the workers' jobs, what's waiting, urgent marked !). Fails on a page
// error or a block that never shows a tree. Writes <out>/zoo-<block>.png. The unit side is render/assets.test.ts (a set asked
// ahead, then wanted on screen, goes at once).
//   npm run build && node tools/zoo/trees.cjs [out] [dist]   BLOCKS (indices into the zoo's blocks, 10,20,30), WAIT (s, 300), SIZE (960x540)
const http = require("http"), fs = require("fs"), path = require("path");
let playwright; try { playwright = require("playwright"); } catch { playwright = require("/opt/node22/lib/node_modules/playwright"); }
const [outArg = "previews/zoo/trees", distArg] = process.argv.slice(2);
const out = path.resolve(outArg), root = path.resolve(distArg || path.join(__dirname, "../../dist"));
const [W, H] = (process.env.SIZE || "960x540").split("x").map(Number), WAIT = Number(process.env.WAIT || 300);
const PICK = (process.env.BLOCKS || "10,20,30").split(",").map(Number);
const types = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".json": "application/json", ".png": "image/png", ".wasm": "application/wasm", ".woff2": "font/woff2", ".ogg": "audio/ogg" };
const t0 = Date.now(), log = (...a) => console.log(`[${((Date.now() - t0) / 1000).toFixed(0)} s]`, ...a);

(async () => {
  fs.mkdirSync(out, { recursive: true });
  const server = http.createServer((req, res) => { const p = path.join(root, decodeURIComponent(new URL(req.url, "http://x").pathname)), f = fs.existsSync(p) && fs.statSync(p).isDirectory() ? path.join(p, "index.html") : p; if (!f.startsWith(root) || !fs.existsSync(f)) { res.writeHead(404); res.end(); return; } res.writeHead(200, { "Content-Type": types[path.extname(f)] || "application/octet-stream" }); fs.createReadStream(f).pipe(res); });
  await new Promise(r => server.listen(0, "127.0.0.1", r));
  const browser = await playwright.chromium.launch({ args: ["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist"] });
  const errors = [], bad = [];
  try {
    const page = await browser.newPage({ viewport: { width: W, height: H } });
    page.on("pageerror", e => errors.push(e.message));
    await page.goto(`http://127.0.0.1:${server.address().port}/?zoo&creator=0`);
    await page.waitForFunction(() => window.witch && window.witch.ready, null, { timeout: 1800000, polling: 500 });
    await page.keyboard.press("Enter");
    const blocks = await page.evaluate(() => window.witch.game.map.zoo.blocks.map(b => ({ cell: b.cell, kind: b.kind })));
    log(`ready: ${blocks.length} blocks`);
    const queue = () => page.evaluate(() => { const A = window.witch.view.assets; return { held: A.held, workers: A.workers.map(s => (s.busy ? `${s.job.kind}:${String(s.job.id).slice(0, 24)}` : "-")), waiting: A.queue.length, next: A.queue.slice(0, 5).map(j => `${j.kind}:${String(j.id).slice(0, 24)}${j.urgent ? "!" : ""}`) }; });
    for (const i of PICK) {
      const b = blocks[i % blocks.length];
      await page.evaluate(cell => { const g = window.witch.game, A = g.map.areaSize, Wb = g.witches[0]; Wb.body = { ...Wb.body, x: (cell[0] + 0.3) * A, z: (cell[1] + 0.3) * A, vx: 0, vz: 0, seated: false, perch: false, mode: "ground", lift: 0 }; }, b.cell);
      const tb = Date.now();
      let trees = 0;
      while ((Date.now() - tb) / 1000 < WAIT) {
        await page.waitForTimeout(5000);
        trees = await page.evaluate(() => window.witch.view.stats.trees);
        if (trees > 0) break;
        log(`${b.kind} ${JSON.stringify(b.cell)}: no trees yet`, JSON.stringify(await queue()));
      }
      log(`${b.kind} ${JSON.stringify(b.cell)}: ${trees} trees in ${((Date.now() - tb) / 1000).toFixed(0)} s`);
      await page.screenshot({ path: path.join(out, `zoo-${b.kind}.png`) });
      if (!trees) bad.push(`${b.kind} ${JSON.stringify(b.cell)}: no trees after ${WAIT} s`);
    }
  } finally { await browser.close(); server.close(); }
  if (errors.length) console.error("page errors:\n" + errors.join("\n"));
  if (bad.length) console.error("FAILED:\n" + bad.join("\n"));
  process.exit(errors.length || bad.length ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
