// The night's lighting as the game's sprite shader has it (tools/prebake/treeQuant.mjs lights its trees with it): loads a build in
// headless Chromium (fox, seed 123, a fresh game), waits for the fade, and writes every number and vector uniform of a scenery sprite
// material (the moon, ambient, her glow, the lights, the camera's axes) and the metres an art pixel.
//
//   node tools/prebake/lightUniforms.cjs <dist> <out.json>
const fs = require("fs"), path = require("path"), http = require("http");
const playwright = (() => { try { return require("playwright"); } catch { return require("/opt/node22/lib/node_modules/playwright"); } })();
const root = path.resolve(process.argv[2]);
const server = http.createServer((req, res) => {
  const p = path.join(root, decodeURIComponent(new URL(req.url, "http://x").pathname));
  const file = fs.existsSync(p) && fs.statSync(p).isDirectory() ? path.join(p, "index.html") : p;
  if (!file.startsWith(root) || !fs.existsSync(file)) { res.writeHead(404); res.end(); return; }
  res.writeHead(200, { "content-type": { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".json": "application/json" }[path.extname(file)] || "application/octet-stream" });
  fs.createReadStream(file).pipe(res);
});
server.listen(0, "127.0.0.1", async () => {
  const browser = await playwright.chromium.launch({ args: ["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist"] });
  const page = await browser.newPage({ viewport: { width: 960, height: 540 } });
  await page.goto(`http://127.0.0.1:${server.address().port}/index.html?island=fox&seed=123&fresh=1`);
  await page.waitForFunction(() => performance.getEntriesByName("witch:ready").length > 0, null, { timeout: 400000 });
  await page.waitForTimeout(3000);
  const u = await page.evaluate(() => {
    const v = window.witch.view; let found = null;
    v.scene.traverse(o => { const m = o.material; if (!found && m && m.uniforms && m.uniforms.uMoon && m.uniforms.uMoonDir && m.uniforms.uRight && m.uniforms.uIsScenery) found = m.uniforms; });
    const out = {};
    for (const [k, x] of Object.entries(found || {})) { const val = x.value; if (typeof val === "number") out[k] = val; else if (val && typeof val.toArray === "function" && !val.isTexture) out[k] = val.toArray(); else if (Array.isArray(val) && val.length && typeof val[0]?.toArray === "function") out[k] = val.map(e => e.toArray()); }
    out.mpp = v.mpp; return out;
  });
  fs.writeFileSync(process.argv[3], JSON.stringify(u, null, 1));
  console.log(Object.keys(u).length, "uniforms");
  await browser.close(); server.close();
});
