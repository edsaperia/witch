// Every species' legendary sigil (art/sigils.js, LEGEND_DETAIL and legendFrame; Ed, 2026-10-06: "twice as wide and more detailed
// than the normal ones, with a decorative border"): large as neon vector beside the normal legend's, bare, as the 17 px pixel
// glyph (3× and 1×), floating in the stack (1× and 2×) and as the ground rune, labelled. Writes <out.png>.
//   node tools/sigils/legendary-sheet.mjs <out.png> [species,...]
import { openBrowser } from "../../art/headless.mjs";
import { writeFileSync } from "node:fs";
const b = await openBrowser();
await b.page.goto(b.base + "/art/headless-blank.html").catch(() => {});
const url = await b.page.evaluate(async only => {
  const G = await import("/art/generator.js"), ids = only ? only.split(",") : [...G.SIGIL_IDS, "relic"];
  const per = 3, cellW = 640, cellH = 300, W = per * cellW, H = Math.ceil(ids.length / per) * cellH;
  const c = document.createElement("canvas"); c.width = W; c.height = H; const g = c.getContext("2d"); g.fillStyle = "#0e0c1c"; g.fillRect(0, 0, W, H); g.imageSmoothingEnabled = false;
  const glyph = (id, n, x, y, k, col) => { const m = G.sigilGlyph(id, n, { legendary: true }), gold = [255, 214, 140]; for (let j = 0; j < m.h; j++) for (let i = 0; i < m.w; i++) if (m.m[j * m.w + i]) { g.fillStyle = `rgb(${(m.gold[j * m.w + i] ? gold : col).join(",")})`; g.fillRect(x + i * k, y + j * k, k, k); } };
  ids.forEach((id, n) => {
    const x0 = (n % per) * cellW, y0 = Math.floor(n / per) * cellH, col = G.sigilColour(id);
    g.fillStyle = "#e8e2f4"; g.font = "15px monospace"; g.fillText(id, x0 + 8, y0 + 18);
    G.drawSigil(g, id, { x: x0 + 8, y: y0 + 26, size: 120, colour: col, legendary: true }); // neon, large: 240 × 120
    G.drawSigil(g, id, { x: x0 + 256, y: y0 + 26, size: 120, colour: col, level: 3 }); // the normal legend's, for scale
    G.drawSigil(g, id, { x: x0 + 384, y: y0 + 26, size: 64, glow: false, colour: [232, 226, 244], legendary: true }); // bare
    glyph(id, 17, x0 + 8, y0 + 156, 3, col); glyph(id, 17, x0 + 120, y0 + 156, 1, col); glyph(id, 12, x0 + 120, y0 + 180, 1, col); // pixel glyphs
    const f = G.floatSigil(id, { px: 16, legendary: true }), cv = G.paintSigilField(f, 5, { colour: col }); g.drawImage(cv, x0 + 170, y0 + 156); g.drawImage(cv, x0 + 170, y0 + 196, cv.width * 2, cv.height * 2); // the stack, 1× and 2×
    const r = G.groundSigil(id, { pxPerMetre: 9, legendary: true }), rv = G.paintSigilField(r, 5, { colour: col }); g.drawImage(rv, x0 + 384 + 4, y0 + 150); // the ground rune
    const n3 = G.groundSigil(id, { level: 3, pxPerMetre: 9 }), nv = G.paintSigilField(n3, 5, { colour: col }); g.drawImage(nv, x0 + 384 + rv.width + 12, y0 + 150); // a legend's, for scale
  });
  return c.toDataURL();
}, process.argv[3] ?? null);
writeFileSync(process.argv[2], Buffer.from(url.split(",")[1], "base64")); await b.close();
