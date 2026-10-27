// The audio capacity test (tools/audio-test) in headless Chromium, for a builder: serves the built game's dist/, opens
// audio-test/, presses Start, waits for the results (a few minutes) and prints the summary, writing the JSON to [out].
// Headless audio is software and has no real device: its numbers say the page works, not what a laptop can do.
//   node tools/audio-test/run.cjs [dist] [out.json] [page: "" the capacity test, stall.html the music stall test]
const http = require("http"), fs = require("fs"), path = require("path");
let playwright; try { playwright = require("playwright"); } catch { playwright = require("/opt/node22/lib/node_modules/playwright"); }
const root = path.resolve(process.argv[2] || "dist"), outFile = process.argv[3] || null, pageName = process.argv[4] || "";
const types = { ".html": "text/html", ".js": "text/javascript", ".json": "application/json", ".ogg": "audio/ogg", ".css": "text/css", ".wasm": "application/wasm" };
(async () => {
  const server = http.createServer((req, res) => {
    const p = path.join(root, decodeURIComponent(new URL(req.url, "http://x").pathname)), f = fs.existsSync(p) && fs.statSync(p).isDirectory() ? path.join(p, "index.html") : p;
    if (!f.startsWith(root) || !fs.existsSync(f)) { res.writeHead(404); res.end(); return; }
    res.writeHead(200, { "Content-Type": types[path.extname(f)] || "application/octet-stream" }); fs.createReadStream(f).pipe(res);
  });
  await new Promise(r => server.listen(0, "127.0.0.1", r));
  const browser = await playwright.chromium.launch({ args: ["--autoplay-policy=no-user-gesture-required"] });
  let failed = false;
  try {
    const page = await browser.newPage({ viewport: { width: 1100, height: 900 } });
    page.on("pageerror", e => { failed = true; console.log("pageerror:", e.message); });
    page.on("console", m => { if (m.type() === "error") console.log("console:", m.text()); });
    await page.goto(`http://127.0.0.1:${server.address().port}/audio-test/${pageName}`);
    const t0 = Date.now();
    await page.click("#go");
    let last = "";
    while (!(await page.evaluate(() => !!window.audioTest))) {
      const s = await page.evaluate(() => document.getElementById("status").textContent);
      if (s !== last) { console.log(`${Math.round((Date.now() - t0) / 1000)} s: ${s}`); last = s; }
      if (s.startsWith("failed")) { failed = true; break; }
      if (Date.now() - t0 > 15 * 60e3) { console.log("timed out"); failed = true; break; }
      await page.waitForTimeout(1000);
    }
    const r = await page.evaluate(() => window.audioTest);
    if (r) {
      console.log(`\n${r.summary}\n(${Math.round((Date.now() - t0) / 1000)} s)`);
      if (outFile) fs.writeFileSync(outFile, JSON.stringify(r, null, 1));
      await page.screenshot({ path: (outFile || "audio-test.json").replace(/\.json$/, ".png"), fullPage: true });
    }
  } finally { await browser.close(); server.close(); }
  process.exit(failed ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
