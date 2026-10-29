// The bold sigils' sheet (art/sigils.js BOLD; Ed, 2026-10-29: the monoline sigils can't be read at stack size), for drawing and
// checking them: every species in a row, left to right its monoline sigil as her stack showed it (26 px in the atlas, about 12 art
// px on screen), its bold sigil on its 24 px grid, and the bold one in her stack at the game's size (its rank's purple, blue and
// red, over the night), each at 4x; a species without a bold sigil yet says so. Only the ones named, or all.
//   node tools/leash/bold-sheet.mjs <out.png> [id,id,...]
import { openBrowser } from "../../art/headless.mjs";
import { writeFileSync } from "node:fs";
const [out = "previews/bold-sigils.png", only = ""] = process.argv.slice(2);
const { page, base, errors, close } = await openBrowser();
await page.goto(base + "/art/headless-blank.html");
const url = await page.evaluate(async only => {
  const S = await import("/art/sigils.js"), G = await import("/art/generator.js");
  const ids = G.SPECIES.map(s => s.id).filter(id => S.SIGILS[id] && (!only || only.split(",").includes(id)));
  const today = (id, n) => { const c = new OffscreenCanvas(32, 32), g = c.getContext("2d"); S.drawSigil(g, id, { x: 3, y: 3, size: 26, level: null, colour: [255, 255, 255], glow: false }); const d = g.getImageData(0, 0, 32, 32).data, m = new Uint8Array(n * n); for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) m[y * n + x] = d[(Math.floor((y + .5) * 32 / n) * 32 + Math.floor((x + .5) * 32 / n)) * 4 + 3] > 90 ? 1 : 0; return { w: n, m }; };
  const shrink = (k, n) => { const m = new Uint8Array(n * n); for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) m[y * n + x] = k.m[Math.floor((y + .5) * k.w / n) * k.w + Math.floor((x + .5) * k.w / n)]; return { w: n, m }; };
  const Z = 4, row = 30, cv = new OffscreenCanvas((12 + 24 + 3 * 28 + 120) * Z, ids.length * row * Z + 20), g = cv.getContext("2d");
  g.fillStyle = "#0b0f0a"; g.fillRect(0, 0, cv.width, cv.height); g.font = "28px monospace";
  const put = (k, x, y, col) => { g.fillStyle = `rgb(${col})`; for (let i = 0; i < k.m.length; i++) if (k.m[i]) g.fillRect((x + i % k.w) * Z, (y + Math.floor(i / k.w)) * Z, Z, Z); };
  ids.forEach((id, r) => {
    const y = r * row + 3;
    g.fillStyle = "#ccc"; g.fillText(id, 2, (y + 16) * Z);
    put(today(id, 12), 30, y + 6, [180, 100, 255]);
    const b = S.boldGlyph(id, S.BOLD_GRID);
    if (!b) { g.fillStyle = "#777"; g.fillText("no bold sigil yet", 50 * Z, (y + 16) * Z); return; }
    put(b, 46, y, [235, 235, 235]);
    [[180, 100, 255], [55, 115, 220], [225, 45, 40]].forEach((c, i) => put(shrink(b, 20), 74 + i * 24, y + 3, c)); // (about its size in her stack at the default zoom)
  });
  const blob = await cv.convertToBlob(); return await new Promise(r => { const f = new FileReader(); f.onload = () => r(f.result); f.readAsDataURL(blob); });
}, only);
writeFileSync(out, Buffer.from(url.split(",")[1], "base64"));
if (errors.length) { console.error(errors.slice(0, 5).join("\n")); process.exitCode = 1; }
console.log(`wrote ${out}`);
await close();
