// Mock (not for merging): the sea chart's own rim (its sea pouring off the world's edge into space), the reference for the zoo's.
//   node tools/zoo/chart-edge.cjs [out.png] [dist]
const http = require("http"), fs = require("fs"), path = require("path");
let playwright; try { playwright = require("playwright"); } catch { playwright = require("/opt/node22/lib/node_modules/playwright"); }
const [outArg = "previews/ed/zoo-map/chart-edge.png", distArg] = process.argv.slice(2), root = path.resolve(distArg || "dist");
const types = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".json": "application/json", ".png": "image/png", ".wasm": "application/wasm", ".woff2": "font/woff2" };
(async () => {
  const server = http.createServer((req, res) => { const p = path.join(root, decodeURIComponent(new URL(req.url, "http://x").pathname)), f = fs.existsSync(p) && fs.statSync(p).isDirectory() ? path.join(p, "index.html") : p; if (!f.startsWith(root) || !fs.existsSync(f)) { res.writeHead(404); res.end(); return; } res.writeHead(200, { "Content-Type": types[path.extname(f)] || "application/octet-stream" }); fs.createReadStream(f).pipe(res); });
  await new Promise(r => server.listen(0, "127.0.0.1", r));
  const browser = await playwright.chromium.launch({ args: ["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist"] });
  const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
  page.on("pageerror", e => console.log("pageerror", e.message));
  await page.goto(`http://127.0.0.1:${server.address().port}/chart.html?chart=all`);
  await page.waitForTimeout(60000);
  for (let i = 0; i < 10; i++) { await page.keyboard.press("Minus"); await page.waitForTimeout(1500); }
  const minus = page.getByRole("button", { name: "−" }); for (let i = 0; i < 10; i++) { await minus.click().catch(() => {}); await page.waitForTimeout(1200); }
  await page.waitForTimeout(20000);
  await page.screenshot({ path: outArg, timeout: 120000 });
  await browser.close(); server.close();
  console.log("wrote", outArg);
})().catch(e => { console.error(e); process.exit(1); });
