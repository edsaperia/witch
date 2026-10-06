// The character creator's boxes (Ed, 2026-10-06: "Each item in character creation should have its own menu box with its own
// colour picker; only one menu box should be open at a time"): the built game at 1600×900; opens each box in turn (checking
// only it is open), picks a colour in the hat's own picker, then walks her up to her things in the room (the rail, the mirror,
// the broom...) checking each opens its box; screenshots and a GIF. Run after `npm run build`; writes previews/menus/.
const { spawn, execFileSync } = require("child_process"), path = require("path"), fs = require("fs");
let playwright; try { playwright = require("playwright"); } catch { playwright = require("/opt/node22/lib/node_modules/playwright"); }
const root = path.join(__dirname, "../.."), out = path.join(root, "previews/menus"), frames = path.join(require("os").tmpdir(), "witch-menus-frames"); // (the GIF's frames, outside the repository)
(async () => {
  fs.rmSync(frames, { recursive: true, force: true }); fs.mkdirSync(frames, { recursive: true });
  const server = spawn("npx", ["vite", "preview", "--port", "4183", "--strictPort"], { cwd: root, stdio: "ignore" });
  await new Promise(r => setTimeout(r, 2500));
  const browser = await playwright.chromium.launch({ args: ["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist"] });
  const errors = [];
  try {
    const page = await browser.newPage({ viewport: { width: 1600, height: 900 } });
    page.on("pageerror", e => errors.push(e.message));
    await page.goto("http://localhost:4183/?quick=1&seed=123", { waitUntil: "load" });
    await page.waitForSelector("#creator-start", { timeout: 60000 });
    await page.waitForFunction(() => window.__creator.progress().ready, null, { timeout: 240000 }); // (screenshots are quick once the forest is grown)
    await page.waitForTimeout(1500);
    const open = () => page.$$eval("#creator fieldset[data-box]", fs => fs.filter(f => f.querySelector("legend + div").style.display !== "none").map(f => f.dataset.box));
    const ids = await page.$$eval("#creator fieldset[data-box]", fs => fs.map(f => f.dataset.box));
    console.log("boxes", ids.join(" "));
    // each box in turn: only it open
    for (const id of ids) {
      if ((await open()).join() !== id) await page.click(`#creator fieldset[data-box="${id}"] legend`);
      const o = await open();
      if (o.length !== 1 || o[0] !== id) throw new Error(`opening ${id}: open ${o.join()}`);
      if (["hat", "outfit", "broom", "scarf"].includes(id)) await page.screenshot({ path: path.join(out, `box-${id}.png`), clip: { x: 1100, y: 0, width: 500, height: 900 } });
    }
    // closing the open one leaves none open
    await page.click(`#creator fieldset[data-box="${ids[ids.length - 1]}"] legend`);
    if ((await open()).length) throw new Error("closing left one open");
    // the hat's own picker: its plume, then a colour off the rainbow
    await page.click('#creator fieldset[data-box="hat"] legend');
    await page.click('#creator fieldset[data-box="hat"] button[data-part="plume"]');
    const c = await page.$('#creator fieldset[data-box="hat"] canvas[data-strip="hue"]'), b = await c.boundingBox();
    await page.mouse.click(b.x + b.width * .55, b.y + b.height / 2);
    const plume = await page.evaluate(() => JSON.stringify(window.__creator.genome().palette?.plume));
    console.log("plume", plume);
    if (!plume || plume === "undefined") throw new Error("the hat's picker didn't colour the plume");
    await page.waitForTimeout(400);
    await page.screenshot({ path: path.join(out, "hat-picker.png") });
    // walking up to her things: each opens its box
    let n = 0;
    // a frame: the room's own canvas (a screenshot of the page is too slow with the forest drawing behind)
    const shoot = async () => { const url = await page.evaluate(() => { const c = document.querySelector("#creator canvas[title]"), k = 3, z = document.createElement("canvas"); z.width = c.width * k; z.height = c.height * k; const x = z.getContext("2d"); x.imageSmoothingEnabled = false; x.fillStyle = "#14132c"; x.fillRect(0, 0, z.width, z.height); x.drawImage(c, 0, 0, z.width, z.height); return z.toDataURL(); }); fs.writeFileSync(path.join(frames, `f${String(n++).padStart(3, "0")}.png`), Buffer.from(url.split(",")[1], "base64")); };
    const go = async (id) => {
      for (let i = 0; i < 80; i++) {
        const s = await page.evaluate(id => { const c = window.__creator, w = c.walker, f = c.room.walk, t = f.spots[id], a = f.project([w.x, 0, w.z]), b = f.project([t[0], 0, t[2] ?? t[1]]); return { dx: b[0] - a[0], dy: b[1] - a[1], near: c.near }; }, id);
        if (s.near === id) return true;
        const keys = [];
        if (Math.abs(s.dx) > 1.5) keys.push(s.dx > 0 ? "KeyD" : "KeyA");
        if (Math.abs(s.dy) > 1.5) keys.push(s.dy > 0 ? "KeyS" : "KeyW");
        if (!keys.length) return false;
        for (const k of keys) await page.keyboard.down(k);
        await page.waitForTimeout(120);
        for (const k of keys) await page.keyboard.up(k);
        if (i % 2 === 0) await shoot();
      }
      return false;
    };
    const visits = [];
    for (const id of ["outfit", "hair", "phones", "scarf", "more", "broom", "hat"]) {
      const reached = await go(id), o = await open();
      visits.push(`${id}: ${reached ? "reached" : "stuck"}, open ${o.join()}`);
      for (let k = 0; k < 4; k++) { await page.waitForTimeout(150); await shoot(); }
      if (reached) await page.screenshot({ path: path.join(out, `by-${id}.png`), clip: { x: 1100, y: 0, width: 500, height: 900 } }); // (the box it opened)
      if (reached && o[0] !== id) throw new Error(`by the ${id}: open ${o.join()}`);
    }
    console.log(visits.join("\n"));
    if (visits.filter(v => v.includes("reached")).length < 4) throw new Error("she couldn't reach her things");
    await page.screenshot({ path: path.join(out, "walked.png") });
    execFileSync("ffmpeg", ["-y", "-loglevel", "error", "-framerate", "6", "-i", path.join(frames, "f%03d.png"), "-vf", "scale=iw/2:-1:flags=neighbor,split[a][b];[a]palettegen=max_colors=160[p];[b][p]paletteuse=dither=none", path.join(out, "walk-to-things.gif")]);
    fs.rmSync(frames, { recursive: true, force: true });
    console.log("frames", n, "errors", errors.length);
    if (errors.length) throw new Error(errors.join("\n"));
  } finally { await browser.close(); server.kill(); }
})().catch(e => { console.error(e); process.exit(1); });
