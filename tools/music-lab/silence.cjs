// The measured output, live (platform/audio/outputMeter.ts; Ed, round 16: "Is there a way for the game to know if anything
// is being sent to the speakers or not?"):  node tools/music-lab/silence.cjs [dist dir]
// Loads the built game in headless Chromium with sound, walks her off her decks so the home speakers boot and the music
// plays, checks the meter hears it (no silences), then cuts the music and the sound effects inside their graphs (their
// output nodes untouched, so the mix still says the music should be heard) for 1.5 s and checks the meter logs that
// silence in the playtest log, with where she was (on the cloud's 1 to 2 s frames the reads are few and each reaches back
// only the analyser's 0.34 s, so it measures about 1 s of the 1.5); then that the sound comes back.
// MIC=1: with ?micCheck=1 and Chromium's fake microphone (a beep), that the mic check starts, listens and finds a lag.
const http = require("http"), fs = require("fs"), path = require("path");
let playwright;
try { playwright = require("playwright"); } catch { playwright = require("/opt/node22/lib/node_modules/playwright"); }
const MIC = process.env.MIC === "1";
const root = path.resolve(process.argv[2] || path.resolve(__dirname, "../../dist"));
const types = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".json": "application/json", ".png": "image/png", ".wasm": "application/wasm" };
const server = http.createServer((req, res) => {
  const p = path.join(root, decodeURIComponent(new URL(req.url, "http://x").pathname));
  const file = fs.existsSync(p) && fs.statSync(p).isDirectory() ? path.join(p, "index.html") : p;
  if (!file.startsWith(root) || !fs.existsSync(file)) { res.writeHead(404); res.end(); return; }
  res.writeHead(200, { "content-type": types[path.extname(file)] || "application/octet-stream" });
  fs.createReadStream(file).pipe(res);
});
server.listen(0, "127.0.0.1", async () => {
  const browser = await playwright.chromium.launch({ args: ["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist", "--autoplay-policy=no-user-gesture-required", ...(MIC ? ["--use-fake-device-for-media-stream", "--use-fake-ui-for-media-stream", ...(process.env.MIC_WAV ? [`--use-file-for-fake-audio-capture=${path.resolve(process.env.MIC_WAV)}`] : [])] : [])] });
  const page = await browser.newPage({ viewport: { width: 640, height: 360 } }), errors = [];
  page.on("pageerror", e => errors.push(e.message));
  await page.goto(`http://127.0.0.1:${server.address().port}/?seed=123&creator=0${MIC ? "&micCheck=1" : ""}`);
  await page.waitForFunction(() => window.witch && window.witch.ready, null, { timeout: 300000, polling: 500 });
  await page.keyboard.press("Enter");
  await page.mouse.click(320, 200);
  // off her decks (frames driven directly: the cloud's own are a second or two each), then the first speaker's 3 s
  await page.evaluate(() => { const w = window.witch; for (let i = 0; i < 300; i++) w.frame({ moveX: 0, moveZ: i < 60 ? 1 : 0, toggleMode: false, zoom: 0 }, 1 / 60, false); });
  await page.waitForFunction(() => window.witch.game.speakerBoot.some(t => t !== null), null, { timeout: 120000, polling: 250 });
  const heard = await page.waitForFunction(() => { const m = window.witch.audio.meter; return m.reading.db > -50 ? m.reading.db : null; }, null, { timeout: 120000, polling: 200 }).then(h => h.jsonValue()).catch(() => null);
  await page.waitForTimeout(3000);
  const before = await page.evaluate(() => ({ silences: window.witch.audio.meter.silences, line: window.witch.audio.meter.line() }));
  // cut the sound inside the graphs for 1.5 s
  await page.evaluate(() => { const a = window.witch.audio; a.music.wobble.disconnect(a.music.master); a.sfx?.k.out.disconnect(); });
  await page.waitForTimeout(1500);
  const during = await page.evaluate(() => window.witch.audio.meter.line());
  await page.evaluate(() => { const a = window.witch.audio; a.music.wobble.connect(a.music.master); a.sfx?.k.out.connect(a.sfx.k.final); });
  await page.waitForTimeout(2500);
  const after = await page.evaluate(() => { const m = window.witch.audio.meter, runs = JSON.parse(localStorage.getItem("witch.playtest") || "[]"); return { silences: m.silences, db: m.reading.db, logged: runs.length ? runs[runs.length - 1].silences || [] : [] }; });
  const mic = MIC ? await page.evaluate(() => window.witch.audio.meter.line().split("\n").find(l => l.startsWith("mic")) || "") : "";
  const ep = after.logged[after.logged.length - 1];
  const checks = [
    [heard !== null, `the meter hears the music (${heard} dBFS)`],
    [before.silences === 0, `no silences while it plays (${before.silences})`],
    [/SILENT/.test(during), `the overlay says SILENT while it's cut: ${during.split("\n")[0]}`],
    [after.silences === 1 && !!ep && ep.dur > 1 && ep.dur < 2.2, `one silence logged, about 1.5 s: ${JSON.stringify(ep)}`],
    [after.db > -50, `the sound back (${after.db} dBFS)`],
    ...(MIC ? [[/^mic +mic -?\d+ dB .*corr/.test(mic), `the mic check listening: ${mic}`]] : []),
    [!errors.length, `no page errors${errors.length ? ": " + errors.slice(0, 3).join(" | ") : ""}`],
  ];
  for (const [ok, what] of checks) console.log(`${ok ? "ok  " : "FAIL"} ${what}`);
  await browser.close(); server.close();
  process.exit(checks.every(c => c[0]) ? 0 : 1);
});
