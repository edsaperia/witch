// Every species' legendary sigil (art/sigils.js, legendCircle; Ed, 2026-10-06: "twice as wide and more detailed than the normal
// ones", then his reference, a magic circle with the animal in the centre): large as neon vector (full), beside the normal
// legend's at the same scale; smaller (no runes, then no detail); the carving mask (legendSigilMask, plain); the pixel glyph;
// floating in the stack (1× and 2×) and as the ground rune, labelled. Writes <out.png>.
//   node tools/sigils/legendary-sheet.mjs <out.png> [species,...]
import { openBrowser } from "../../art/headless.mjs";
import { writeFileSync } from "node:fs";
const b = await openBrowser();
await b.page.goto(b.base + "/art/headless-blank.html").catch(() => {});
const url = await b.page.evaluate(async only => {
  const G = await import("/art/generator.js"), ids = only ? only.split(",") : [...G.SIGIL_IDS, "relic"];
  const per = 3, cellW = 720, cellH = 380, W = per * cellW, H = Math.ceil(ids.length / per) * cellH;
  const c = document.createElement("canvas"); c.width = W; c.height = H; const g = c.getContext("2d"); g.fillStyle = "#0e0c1c"; g.fillRect(0, 0, W, H); g.imageSmoothingEnabled = false;
  ids.forEach((id, n) => {
    const x0 = (n % per) * cellW, y0 = Math.floor(n / per) * cellH, col = G.sigilColour(id);
    g.fillStyle = "#e8e2f4"; g.font = "15px monospace"; g.fillText(id, x0 + 8, y0 + 18);
    G.drawSigil(g, id, { x: x0 + 8, y: y0 + 26, size: 170, colour: col, legendary: true }); // neon, full: 340 across
    G.drawSigil(g, id, { x: x0 + 356, y: y0 + 26, size: 64, colour: col, level: 3 }); // a normal legend's, for scale
    G.drawSigil(g, id, { x: x0 + 430, y: y0 + 26, size: 50, colour: col, legendary: true }); // 100 across: no runes
    G.drawSigil(g, id, { x: x0 + 540, y: y0 + 26, size: 28, colour: col, legendary: true }); // 56 across: no detail
    const ms = 150, m = G.legendSigilMask(id, ms), img = g.createImageData(ms, ms); for (let i = 0; i < m.length; i++) { const v = 40 + m[i] * 200; img.data.set([v, v * .95, v * .85, 255], i * 4); } g.putImageData(img, x0 + 356, y0 + 100); // the carving mask
    const gl = G.sigilGlyph(id, 24, { legendary: true }); for (let j = 0; j < gl.h; j++) for (let i = 0; i < gl.w; i++) if (gl.m[j * gl.w + i]) { g.fillStyle = gl.frame[j * gl.w + i] ? `rgb(${col.map(v => v * .7 | 0)})` : `rgb(${col})`; g.fillRect(x0 + 520 + i * 2, y0 + 100 + j * 2, 2, 2); } // pixel glyph, 48 px, 2×
    const f = G.floatSigil(id, { px: 16, legendary: true }), cv = G.paintSigilField(f, 5, { colour: col }); g.drawImage(cv, x0 + 520, y0 + 205); g.drawImage(cv, x0 + 600, y0 + 205, cv.width * 2, cv.height * 2); // the stack, 1× and 2×
    const r = G.groundSigil(id, { pxPerMetre: 9, legendary: true }), rv = G.paintSigilField(r, 5, { colour: col }); g.drawImage(rv, x0 + 356, y0 + 262); // the ground rune
  });
  return c.toDataURL();
}, process.argv[3] ?? null);
writeFileSync(process.argv[2], Buffer.from(url.split(",")[1], "base64")); await b.close();
