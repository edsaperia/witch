// A few broom kinds flying (art/brooms.js): her lean cycle on each, over ground scrolling past, at 3× the game's size; the drone's
// rotors, the bicycle's wheels, the flames and exhausts and the mop's drips turn with the frames. Writes <out dir>/flying.gif.
//   node tools/witch/brooms-gif.mjs [out dir] [kind,...]
import { openBrowser } from "../../art/headless.mjs";
import { writeFileSync, mkdirSync, mkdtempSync, rmSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { tmpdir } from "node:os";
import path from "node:path";
const [out = "previews/brooms", only = "missile,jetbike,bicycle,drone,canoe,mop,speeder,gyrocopter"] = process.argv.slice(2);
mkdirSync(out, { recursive: true });
const tmp = mkdtempSync(path.join(tmpdir(), "witch-brooms-"));
const b = await openBrowser();
await b.page.goto(b.base + "/art/headless-blank.html").catch(() => {});
const frames = await b.page.evaluate(async only => {
  const G = await import("/art/generator.js"), st = G.defaultStyle(), base = G.genomeLook(G.WITCH_GENOME).look, kinds = only.split(",");
  const COL = { missile: [[.0, .05, .85], [.0, .75, .85]], jetbike: [[.55, .7, .7], [.13, .2, .95]], speeder: [[.08, .25, .75], [.6, .3, .45]], bicycle: [[.0, .75, .8], [.0, 0, .3]], drone: [[.6, .1, .55], [.55, .35, .9]], gyrocopter: [[.14, .75, .9], [.6, .15, .35]],
    canoe: [[.03, .7, .65], [.09, .5, .9]], hobbyhorse: [[.07, .5, .5], [.0, .0, .95]], mop: [[.6, .6, .7], [.12, .05, .95]] };
  const sprites = kinds.map(kind => { const look = { ...base, broom: kind }, [broom, bristles] = COL[kind] ?? [G.DEFAULT_OUTFIT.broom, G.DEFAULT_OUTFIT.bristles], col = G.witchColours(st, { ...G.DEFAULT_OUTFIT, broom, bristles });
    return [0, 1, 2, 3].map(frame => G.bake(G.witchSprite(st, { look, pose: "lean", frame }), col, st, st.cOutline)); });
  const per = 4, k = 3, cellW = 330, cellH = 230, W = per * cellW, H = Math.ceil(kinds.length / per) * cellH, out = [];
  for (let f = 0; f < 24; f++) {
    const c = document.createElement("canvas"); c.width = W; c.height = H; const g = c.getContext("2d"); g.imageSmoothingEnabled = false;
    g.fillStyle = "#1d2a3a"; g.fillRect(0, 0, W, H);
    kinds.forEach((kind, i) => {
      const x0 = (i % per) * cellW, y0 = Math.floor(i / per) * cellH;
      g.fillStyle = "#2c4a34"; g.fillRect(x0, y0 + cellH - 50, cellW, 50); // the ground, scrolling past
      g.fillStyle = "#3d6646"; for (let t = 0; t < 8; t++) { const x = ((t * 53 - f * 14) % cellW + cellW) % cellW; g.fillRect(x0 + x, y0 + cellH - 40 + (t % 3) * 12, 18, 4); }
      const s = sprites[i][f % 4]; g.drawImage(s.A, x0 + (cellW - s.w * k) / 2, y0 + cellH - 30 - s.h * k, s.w * k, s.h * k);
      g.fillStyle = "#f4ecd8"; g.font = "16px monospace"; g.fillText(kind, x0 + 8, y0 + 20);
    });
    out.push(c.toDataURL());
  }
  return out;
}, only);
frames.forEach((u, i) => writeFileSync(path.join(tmp, `f${String(i).padStart(3, "0")}.png`), Buffer.from(u.split(",")[1], "base64")));
await b.close();
execFileSync("ffmpeg", ["-y", "-loglevel", "error", "-framerate", "8", "-i", path.join(tmp, "f%03d.png"), "-vf", "split[a][b];[a]palettegen=max_colors=128[p];[b][p]paletteuse=dither=none", path.join(out, "flying.gif")]);
rmSync(tmp, { recursive: true, force: true });
console.log("wrote", path.join(out, "flying.gif"), frames.length, "frames");
