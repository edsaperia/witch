// Screenshots of the character creator (round 2) at its extremes: every slider at its low end, at its high end, an old save
// (from before round 2, so without the new fields), and the hat picker on "no hat". Run after `npm run build`; writes previews/creator2/.
const { spawn } = require("child_process"), path = require("path"), fs = require("fs");
let playwright; try { playwright = require("playwright"); } catch { playwright = require("/opt/node22/lib/node_modules/playwright"); }
const root = path.join(__dirname, "../.."), out = path.join(root, "previews/creator2");
const base = { hat: { shape: "classic", height: 1, brim: 1, tilt: 0, band: 1 }, hair: "long", top: "jacket", cloak: "none", broom: { kind: "classic", length: 1, bend: 0, bristles: 1 }, accessories: { phones: true, shades: false, glowsticks: false, scarf: true, satchel: true, pendant: false, earrings: false }, palette: null };
const looks = {
  "high": { ...base, hat: { shape: "crooked", height: 3, brim: 2.6, tilt: .35, band: 4 }, cloak: "long", broom: { kind: "fan", length: 2.4, bend: 1.5, bristles: 3 }, scarfLength: 3, bagSize: 2.6, backpackSize: 2.5, palette: { hat: [.0, .9, .5], jacket: [.5, .9, 1], hair: [.83, .8, 1] } },
  "low": { ...base, hat: { shape: "small", height: .3, brim: .3, tilt: -.9, band: 0 }, hair: "mohawk", broom: { kind: "round", length: .4, bend: -1.2, bristles: .3 }, scarfLength: .3, bagSize: .4, backpackSize: .5, palette: { hat: [.33, .9, .3], jacket: [.12, .9, 1], hair: [.6, .9, 1] } },
  "old-save": { ...base, hat: { shape: "floppy", height: 1.3, brim: 1.2, tilt: .1, band: 2 } },
};
(async () => {
  fs.mkdirSync(out, { recursive: true });
  const server = spawn("npx", ["vite", "preview", "--port", "4179", "--strictPort"], { cwd: root, stdio: "ignore" });
  await new Promise(r => setTimeout(r, 2500));
  const browser = await playwright.chromium.launch({ args: ["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist"] });
  const errors = [];
  try {
    for (const [name, g] of Object.entries(looks)) {
      const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
      page.on("pageerror", e => errors.push(`${name}: ${e.message}`));
      await page.addInitScript(s => localStorage.setItem("witch.genome", s), JSON.stringify(g));
      await page.goto("http://localhost:4179/?quick=1", { waitUntil: "load" });
      await page.waitForSelector("#creator-start", { timeout: 60000 });
      await page.waitForTimeout(1500);
      await page.screenshot({ path: path.join(out, `${name}.png`) });
      if (name === "high") { // no hat, then the jacket's colour picked off the rainbow
        await page.click('button[data-hat="none"]'); await page.click('button[data-part="jacket"]');
        const c = await page.$('canvas[data-strip="hue"]'), b = await c.boundingBox(); await page.mouse.click(b.x + b.width * .8, b.y + b.height / 2);
        await page.waitForTimeout(500); await page.screenshot({ path: path.join(out, "no-hat-picker.png") });
      }
      await page.close();
    }
  } finally { await browser.close(); server.kill(); }
  if (errors.length) { console.error(errors.join("\n")); process.exit(1); }
  console.log("creator screenshots in previews/creator2/");
})();
