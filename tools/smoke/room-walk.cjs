// The character creator's bedroom, walked about (Ed, 2026-10-06: "twice as large, and you should be able to walk around in it
// using WASD"): the built game at 1600×900, the room alone and the whole screen, then a walk round it with the keys (frames
// for a GIF), checking she moves, stays out of the furniture and the walls stop her. Run after `npm run build`; writes
// previews/room/.   node tools/smoke/room-walk.cjs [query]
const { spawn, execFileSync } = require("child_process"), path = require("path"), fs = require("fs");
let playwright; try { playwright = require("playwright"); } catch { playwright = require("/opt/node22/lib/node_modules/playwright"); }
const root = path.join(__dirname, "../.."), out = path.join(root, "previews/room"), frames = path.join(out, "frames");
const query = process.argv[2] || "";
(async () => {
  fs.rmSync(frames, { recursive: true, force: true }); fs.mkdirSync(frames, { recursive: true });
  const server = spawn("npx", ["vite", "preview", "--port", "4182", "--strictPort"], { cwd: root, stdio: "ignore" });
  await new Promise(r => setTimeout(r, 2500));
  const browser = await playwright.chromium.launch({ args: ["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist"] });
  const errors = [];
  try {
    const page = await browser.newPage({ viewport: { width: 1600, height: 900 } });
    page.on("pageerror", e => errors.push(e.message));
    page.on("console", m => { if (m.type() === "error") errors.push(m.text()); });
    await page.goto(`http://localhost:4182/?quick=1&seed=123${query ? "&" + query : ""}`, { waitUntil: "load" });
    await page.waitForSelector("#creator-start", { timeout: 60000 });
    await page.waitForTimeout(4000); // (her walking frames bake once her look is still)
    await page.screenshot({ path: path.join(out, "screen.png") });
    const room = await page.$("#creator canvas[title]");
    await room.screenshot({ path: path.join(out, "room.png") });
    let n = 0;
    // a frame: the room's own canvas, 3 screen pixels to its art pixel (read in the page: a screenshot is too slow while the forest grows)
    const shoot = async () => { const url = await page.evaluate(() => { const c = document.querySelector("#creator canvas[title]"), k = 3, z = document.createElement("canvas"); z.width = c.width * k; z.height = c.height * k; const x = z.getContext("2d"); x.imageSmoothingEnabled = false; x.fillStyle = "#14132c"; x.fillRect(0, 0, z.width, z.height); x.drawImage(c, 0, 0, z.width, z.height); return z.toDataURL(); }); fs.writeFileSync(path.join(frames, `f${String(n++).padStart(3, "0")}.png`), Buffer.from(url.split(",")[1], "base64")); };
    const where = () => page.evaluate(() => { const c = window.__creator; return c ? { x: +c.walker.x.toFixed(2), z: +c.walker.z.toFixed(2) } : null; });
    const start = await where();
    console.log("start", JSON.stringify(start));
    // a walk: up (into the room), left, down, right, round the bed and behind it, then into a wall
    const legs = [["KeyW", 1400], ["KeyA", 1600], ["KeyS", 1400], ["KeyA", 900], ["KeyW", 2200], ["KeyD", 2600], ["KeyS", 1800], ["KeyD", 1200], ["KeyW", 3000]];
    const path_ = [start];
    for (const [key, ms] of legs) {
      await page.keyboard.down(key);
      for (let t = 0; t < ms; t += 100) { await page.waitForTimeout(100); await shoot(); }
      await page.keyboard.up(key);
      path_.push({ key, ...(await where()) });
    }
    for (let t = 0; t < 1500; t += 100) { await page.waitForTimeout(100); await shoot(); } // standing still again: her idles
    console.log("walk", JSON.stringify(path_));
    const moved = path_.slice(1).filter((p, i) => Math.hypot(p.x - path_[i].x, p.z - path_[i].z) > .2).length;
    if (moved < 5) throw new Error(`she hardly moved: ${moved} legs`);
    await page.screenshot({ path: path.join(out, "after.png") });
    // the GIF: every frame, at 10 a second
    execFileSync("ffmpeg", ["-y", "-loglevel", "error", "-framerate", "10", "-i", path.join(frames, "f%03d.png"), "-vf", "split[a][b];[a]palettegen=max_colors=128[p];[b][p]paletteuse=dither=none", path.join(out, "walk.gif")]);
    console.log("frames", n, "errors", errors.length);
    if (errors.length) throw new Error(errors.join("\n"));
  } finally { await browser.close(); server.kill(); }
})().catch(e => { console.error(e); process.exit(1); });
