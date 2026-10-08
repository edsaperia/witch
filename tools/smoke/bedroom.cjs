// A still of the character creator's bedroom (art/bedroom.js) for review: the game at 1920×1080 (and at each ?style= and
// ?px= given), the room's canvas alone and the whole screen. Run after `npm run build`; writes previews/bedroom/.
//   node tools/smoke/bedroom.cjs [now/3,bold/4,ref/5]
const { spawn } = require("child_process"), path = require("path"), fs = require("fs");
let playwright; try { playwright = require("playwright"); } catch { playwright = require("/opt/node22/lib/node_modules/playwright"); }
const root = path.join(__dirname, "../.."), out = path.join(root, "previews/bedroom");
const looks = (process.argv[2] || "now/3").split(",");
(async () => {
  fs.mkdirSync(out, { recursive: true });
  const server = spawn("npx", ["vite", "preview", "--port", "4181", "--strictPort"], { cwd: root, stdio: "ignore" });
  await new Promise(r => setTimeout(r, 2500));
  const browser = await playwright.chromium.launch({ args: ["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist"] });
  const errors = [];
  try {
    for (const lk of looks) {
      const [style, px] = lk.split("/"), page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
      page.on("pageerror", e => errors.push(`${lk}: ${e.message}`));
      await page.goto(`http://localhost:4181/?quick=1&style=${style}&px=${px}${process.env.CROP ? "&" + process.env.CROP : ""}`, { waitUntil: "load" });
      await page.waitForSelector("#creator-start", { timeout: 60000 });
      await page.waitForTimeout(2000);
      const name = `${style}-px${px}`;
      await page.screenshot({ path: path.join(out, `${name}-screen.png`) });
      await (await page.$("#creator canvas[title]")).screenshot({ path: path.join(out, `${name}-room.png`) });
      // its art pixels, 6× (no smoothing): the room's own canvas
      const crop = await page.evaluate(() => { const c = document.querySelector("#creator canvas[title]"), k = 10, w = 80, h = 80, x0 = Math.round(c.width * (+(new URLSearchParams(location.search).get("cx")) || .42) - w / 2), y0 = Math.round(c.height * (+(new URLSearchParams(location.search).get("cy")) || .62) - h / 2), z = document.createElement("canvas"); z.width = w * k; z.height = h * k; const x = z.getContext("2d"); x.imageSmoothingEnabled = false; x.fillStyle = "#14132c"; x.fillRect(0, 0, z.width, z.height); x.drawImage(c, x0, y0, w, h, 0, 0, z.width, z.height); return z.toDataURL(); });
      fs.writeFileSync(path.join(out, `${name}-her.png`), Buffer.from(crop.split(",")[1], "base64"));
      const url = await page.evaluate(() => { const c = document.querySelector("#creator canvas[title]"), k = 6, z = document.createElement("canvas"); z.width = c.width * k; z.height = c.height * k; const x = z.getContext("2d"); x.imageSmoothingEnabled = false; x.fillStyle = "#14132c"; x.fillRect(0, 0, z.width, z.height); x.drawImage(c, 0, 0, z.width, z.height); return z.toDataURL(); });
      fs.writeFileSync(path.join(out, `${name}-zoom.png`), Buffer.from(url.split(",")[1], "base64"));
      await page.close();
    }
  } finally { await browser.close(); server.kill(); }
  if (errors.length) { console.error(errors.join("\n")); process.exit(1); }
  console.log("bedroom stills in previews/bedroom/");
})();
