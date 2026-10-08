// Every species' sigil (art/sigils.js; Ed, 2026-10-06: monoline icons): large as neon vector, bare, as the 12 and 16 px pixel
// glyphs (the HUD, the pointer), as the floating stack form at a baby's size and a legend's, and as the ground rune at each
// level, labelled. Writes <out.png>.
//   node tools/sigils/sheet.mjs <out.png> [species,...]
import { openBrowser } from "../../art/headless.mjs";
import { writeFileSync } from "node:fs";
const b = await openBrowser();
await b.page.goto(b.base + "/art/headless-blank.html").catch(() => {});
const url = await b.page.evaluate(async only => {
  const G = await import("/art/generator.js"), ids = only ? only.split(",") : [...G.SIGIL_IDS, "relic"];
  const per = 4, cellW = 470, cellH = 230, W = per * cellW, H = Math.ceil(ids.length / per) * cellH;
  const c = document.createElement("canvas"); c.width = W; c.height = H; const g = c.getContext("2d"); g.fillStyle = "#0e0c1c"; g.fillRect(0, 0, W, H); g.imageSmoothingEnabled = false;
  const glyph = (id, n, x, y, k, col) => { const m = G.sigilGlyph(id, n); g.fillStyle = `rgb(${col.join(",")})`; for (let j = 0; j < n; j++) for (let i = 0; i < n; i++) if (m.m[j * n + i]) g.fillRect(x + i * k, y + j * k, k, k); };
  ids.forEach((id, n) => {
    const x0 = (n % per) * cellW, y0 = Math.floor(n / per) * cellH, col = G.sigilColour(id);
    g.fillStyle = "#e8e2f4"; g.font = "15px monospace"; g.fillText(id, x0 + 8, y0 + 18);
    G.drawSigil(g, id, { x: x0 + 8, y: y0 + 26, size: 120, colour: col }); // neon, large
    G.drawSigil(g, id, { x: x0 + 136, y: y0 + 26, size: 64, glow: false, colour: [232, 226, 244] }); // bare
    glyph(id, 12, x0 + 136, y0 + 100, 3, col); glyph(id, 16, x0 + 180, y0 + 100, 3, col); // pixel glyphs, 3× (12 px: the dance floor; 16-17 px: the pointer, the HUD)
    glyph(id, 12, x0 + 136, y0 + 150, 1, col); glyph(id, 17, x0 + 152, y0 + 150, 1, col); // and at 1×
    [0, 3].forEach((lv, i) => { const f = G.floatSigil(id, { level: lv, px: 16 }), cv = G.paintSigilField(f, 5, { colour: col }); g.drawImage(cv, x0 + 240 + i * 34, y0 + 30, cv.width * 1, cv.height * 1); g.drawImage(cv, x0 + 240 + i * 60, y0 + 70, cv.width * 2, cv.height * 2); }); // the stack, 1× and 2×
    [0, 1, 2, 3].forEach(lv => { const f = G.groundSigil(id, { level: lv, pxPerMetre: 9 }), cv = G.paintSigilField(f, 5, { colour: col }); g.drawImage(cv, x0 + 240 + [0, 22, 52, 92][lv] + (lv === 3 ? 30 : 0), y0 + 150 + (lv === 3 ? 0 : 10), cv.width, cv.height); }); // ground runes
  });
  return c.toDataURL();
}, process.argv[3] ?? null);
writeFileSync(process.argv[2], Buffer.from(url.split(",")[1], "base64")); await b.close();
