// A contact sheet of the character creator's looks (ui/looks.ts) and of six pleasing random witches, each standing on the
// bedroom's rug, at the room's art pixel ×6. Run after `npm run build`; writes previews/creator-looks.png.
const { spawn } = require("child_process"), path = require("path"), fs = require("fs");
let playwright; try { playwright = require("playwright"); } catch { playwright = require("/opt/node22/lib/node_modules/playwright"); }
const root = path.join(__dirname, "../..");
(async () => {
  const server = spawn("npx", ["vite", "preview", "--port", "4183", "--strictPort"], { cwd: root, stdio: "ignore" });
  await new Promise(r => setTimeout(r, 2500));
  const browser = await playwright.chromium.launch({ args: ["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist"] });
  const errors = [];
  try {
    const page = await browser.newPage({ viewport: { width: 1600, height: 900 } });
    page.on("pageerror", e => errors.push(e.message));
    await page.goto("http://localhost:4183/?quick=1", { waitUntil: "load" });
    await page.waitForSelector("#creator-start", { timeout: 60000 });
    await page.waitForTimeout(1200);
    const ids = await page.$$eval("button[data-look]", bs => bs.map(b => b.dataset.look));
    const shots = [];
    const grab = async label => { await page.waitForTimeout(500); shots.push([label, await page.evaluate(() => { const c = document.querySelector("#creator canvas[title]"), w = 64, h = 72, x0 = Math.round(c.width * .53 - w / 2), y0 = Math.round(c.height * .74 - h * .85), z = document.createElement("canvas"); z.width = w * 4; z.height = h * 4; const x = z.getContext("2d"); x.imageSmoothingEnabled = false; x.drawImage(c, x0, y0, w, h, 0, 0, z.width, z.height); return z.toDataURL(); })]); };
    for (const id of ids) { await page.click(`button[data-look="${id}"]`); await grab(id); }
    for (let i = 0; i < 6; i++) { await page.keyboard.press("KeyR"); await grab("random " + (i + 1)); }
    const sheet = await page.evaluate(async shots => {
      const imgs = await Promise.all(shots.map(([, u]) => new Promise(r => { const i = new Image(); i.onload = () => r(i); i.src = u; })));
      const cols = 7, w = imgs[0].width, h = imgs[0].height + 18, c = document.createElement("canvas"); c.width = cols * w; c.height = Math.ceil(imgs.length / cols) * h;
      const x = c.getContext("2d"); x.fillStyle = "#14132c"; x.fillRect(0, 0, c.width, c.height); x.font = "13px monospace"; x.fillStyle = "#efe6ff";
      imgs.forEach((im, i) => { const cx = (i % cols) * w, cy = Math.floor(i / cols) * h; x.drawImage(im, cx, cy); x.fillText(shots[i][0], cx + 4, cy + h - 4); });
      return c.toDataURL();
    }, shots);
    fs.writeFileSync(path.join(root, "previews/creator-looks.png"), Buffer.from(sheet.split(",")[1], "base64"));
  } finally { await browser.close(); server.kill(); }
  if (errors.length) { console.error(errors.join("\n")); process.exit(1); }
  console.log("previews/creator-looks.png");
})();
