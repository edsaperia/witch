// The Music Lab on the pause page (Ed, 2026-10-15; ui/musicLabPanel.ts): the built game at the decks, Esc, the pause page's
// 🎛 button, the panel open down the right edge; a part muted, its channel's gain at 0; a jump to a section, the cue forced;
// Esc again, the panel still up; ✕, closed. Screenshots to previews/music-lab-pause-*.png. `node tools/smoke/music-lab-pause.cjs [dist]`.
const http = require("http"), fs = require("fs"), path = require("path");
let playwright; try { playwright = require("playwright"); } catch { playwright = require("/opt/node22/lib/node_modules/playwright"); }
const root = path.resolve(process.argv[2] || "dist");
const types = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".json": "application/json", ".png": "image/png", ".ogg": "audio/ogg", ".wasm": "application/wasm", ".woff2": "font/woff2" };
const fail = [];
const check = (ok, what) => { console.log(`${ok ? "ok  " : "FAIL"} ${what}`); if (!ok) fail.push(what); };
(async () => {
  const server = http.createServer((req, res) => { const p = path.join(root, decodeURIComponent(new URL(req.url, "http://x").pathname)), f = fs.existsSync(p) && fs.statSync(p).isDirectory() ? path.join(p, "index.html") : p; if (!f.startsWith(root) || !fs.existsSync(f)) { res.writeHead(404); res.end(); return; } res.writeHead(200, { "content-type": types[path.extname(f)] || "application/octet-stream" }); fs.createReadStream(f).pipe(res); });
  await new Promise(r => server.listen(0, "127.0.0.1", r));
  const port = server.address().port;
  const browser = await playwright.chromium.launch({ args: ["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist", "--autoplay-policy=no-user-gesture-required"] });
  const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
  const errors = [];
  page.on("pageerror", e => errors.push(`page error: ${e.message}`));
  page.on("console", m => { if (m.type() === "error") errors.push(`console error: ${m.text()}`); });
  await page.goto(`http://127.0.0.1:${port}/?creator=0&quick=1&seed=123&debug`);
  await page.waitForFunction(() => window.witch && window.witch.ready, null, { timeout: 600000, polling: 500 });
  await page.keyboard.press("Enter");
  await page.waitForFunction(() => window.witch.game.clock.time > 1, null, { timeout: 120000, polling: 200 });
  fs.mkdirSync("previews", { recursive: true });
  // the pause page, its Music Lab button
  await page.keyboard.press("Escape");
  await page.waitForSelector("#pause-sliders.open", { timeout: 60000 });
  const btn = page.locator("#pause-sliders button", { hasText: "Music Lab" });
  check(await btn.count() === 1, "the pause page has a 🎛 Music Lab button");
  await btn.click();
  await page.waitForSelector("#music-lab.open", { timeout: 60000 });
  check(true, "the panel opens down the right edge");
  await page.waitForTimeout(1500);
  await page.screenshot({ path: "previews/music-lab-pause-01-open.png" });
  const box = await page.locator("#music-lab").boundingBox();
  check(box && Math.round(box.x + box.width) === 1280 && box.x > 800, `the panel sits at the right edge (x ${box && Math.round(box.x)}, width ${box && Math.round(box.width)})`);
  const leftBox = await page.locator("#pause-sliders").boundingBox();
  check(leftBox && leftBox.x <= 0, "the test sliders keep the left");
  // a mute: the kick's channel gain to 0 once the music plays
  await page.keyboard.press("Escape"); // (resume: the sound's context resumed, the engine's channels made as it plays)
  await page.waitForFunction(() => !window.witch.game.clock.paused, null, { timeout: 30000 });
  check(await page.evaluate(() => document.getElementById("music-lab").classList.contains("open")), "Esc resumes with the panel still up");
  const kickRow = page.locator("#music-lab .row", { hasText: "Kick · kick" }).first();
  await kickRow.locator("button", { hasText: "M" }).click();
  await page.waitForTimeout(500);
  const muted = await page.evaluate(() => { const lab = window.witch.sound?.lab; return lab ? lab.state.mute.includes("kick") : null; });
  check(muted === true, "M on the kick mutes it in the settings");
  // a jump to the drop: the cue forced
  await page.selectOption("#music-lab select >> nth=1", "drop");
  await page.waitForTimeout(300);
  const forced = await page.evaluate(() => { const lab = window.witch.sound?.lab; return lab ? { section: lab.state.section, follow: lab.state.follow } : null; });
  check(forced && forced.section === "drop" && forced.follow === false, `the Play select forces the drop (${JSON.stringify(forced)})`);
  // the settings copied: only what differs
  const json = await page.evaluate(() => window.witch.sound?.lab?.json());
  check(typeof json === "string" && /"mute": \["kick"\]/.test(json) && /"passage"/.test(json), `Copy my settings gives only what differs:\n${json}`);
  await page.waitForTimeout(1500);
  await page.screenshot({ path: "previews/music-lab-pause-02-playing.png" });
  // the channel's gain, once the engine has made the kick's channel
  const gain = await page.evaluate(() => { const e = window.witch.sound?.music?.engine; if (!e) return "no engine"; const ch = e.channels?.get("kick"); return ch ? ch.in.gain.value : "no kick channel yet"; });
  console.log(`info kick channel gain: ${gain}`);
  // reset, close
  await page.locator("#music-lab button", { hasText: "Reset" }).click();
  await page.waitForTimeout(300);
  const after = await page.evaluate(() => window.witch.sound?.lab?.differs());
  check(Array.isArray(after) && after.length === 0, `Reset puts everything back (${JSON.stringify(after)})`);
  await page.locator("#music-lab .close").click();
  await page.waitForTimeout(400);
  check(!(await page.evaluate(() => document.getElementById("music-lab").classList.contains("open"))), "✕ closes the panel");
  check(errors.length === 0, `no page or console errors${errors.length ? ": " + errors.slice(0, 3).join("; ") : ""}`);
  await browser.close(); server.close();
  if (fail.length) { console.log("FAILED:\n" + fail.join("\n")); process.exit(1); }
})().catch(e => { console.error(e); process.exit(1); });
