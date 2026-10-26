// Every legend's drawn size, for its circle (Ed, 2026-10-26: "Legend circles need to be larger. Often legends don't fit in them";
// rules/legendFit.ts sizes each circle from it). The art (art/generator.js) drawn in headless Chromium in the game's own style
// (config/style.json at the tuning's pixel size, as app/viewParams.ts gameStyle), each species' legend (level 3) asleep (its nap,
// both breaths: as a wild legend lies in its circle, wildLegends.seen.nap) and awake (standing, both frames, facing us and away),
// measured in metres (its drawn pixels' box, from its material mask, times the game's metres an art pixel: render/sprites.ts metresPerArtPixel): its width (on
// the ground, across) and its height (standing up off the ground, which the camera lays over the ground behind it). Writes
// config/legend-footprints.json; --check fails if that's out of date (a legend's art changed: run it again and commit).
//   node tools/legends/footprint.mjs [--check]
import { readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { openBrowser, ROOT } from "../../art/headless.mjs";

const OUT = resolve(ROOT, "config/legend-footprints.json");
const tuning = JSON.parse(await readFile(resolve(ROOT, "config/tuning.json"), "utf8"));
const style = JSON.parse(await readFile(resolve(ROOT, "config/style.json"), "utf8"));
const check = process.argv.includes("--check");

const b = await openBrowser();
let code = 0;
try {
  await b.page.goto(b.base + "/art/headless-blank.html");
  const sizes = await b.page.evaluate(async ({ style, pixel }) => {
    const G = await import("/art/generator.js");
    const st = G.defaultStyle(), given = style.style && typeof style.style === "object" ? style.style : style;
    for (const [k, v] of Object.entries(given)) if (k in st) st[k] = v;
    st.pixel = pixel; // (the game draws at its own pixel size: app/viewParams.ts gameStyle)
    // (the drawn pixels' box, from the sprite's material mask: its canvas carries a margin)
    const box = sp => { let x0 = sp.w, x1 = -1, y0 = sp.h, y1 = -1; for (let y = 0; y < sp.h; y++) for (let x = 0; x < sp.w; x++) if (sp.m[y * sp.w + x]) { if (x < x0) x0 = x; if (x > x1) x1 = x; if (y < y0) y0 = y; if (y > y1) y1 = y; } return x1 < 0 ? [0, 0] : [x1 - x0 + 1, y1 - y0 + 1]; };
    const out = {};
    const ids = [...new Set(G.SPECIES.map(S => S.id))].sort();
    for (const id of ids) {
      let nw = 0, nh = 0, aw = 0, ah = 0;
      for (const frame of [0, 1]) {
        const n = G.critter(id, 3, frame, st, "towards", { nap: true });
        const [w0, h0] = box(n); nw = Math.max(nw, w0); nh = Math.max(nh, h0);
        for (const facing of ["towards", "away"]) { const [w1, h1] = box(G.critter(id, 3, frame, st, facing)); aw = Math.max(aw, w1); ah = Math.max(ah, h1); }
      }
      out[id] = [nw, nh, aw, ah];
    }
    return out;
  }, { style, pixel: tuning.pixelSize });
  const mpp = 1 / (tuning.artPixelsPerMetre * (2 / tuning.pixelSize)), m = px => Math.round(px * mpp * 10) / 10;
  const species = {};
  for (const [id, [nw, nh, aw, ah]] of Object.entries(sizes)) species[id] = { asleep: [m(nw), m(nh)], awake: [m(aw), m(ah)] };
  const json = JSON.stringify({
    _: "Each species' legend as drawn, in metres: asleep (its nap, both breaths) and awake (standing, both frames, facing us and away), each [width, height]. Written by node tools/legends/footprint.mjs from the art in the game's style (config/style.json at the tuning's pixelSize); rules/legendFit.ts sizes each legend's circle from it. Run it again after a change to a creature's art (--check says whether it's stale).",
    species,
  }, null, 1).replace(/\[\n\s+([\d.]+),\n\s+([\d.]+)\n\s+\]/g, "[$1, $2]") + "\n";
  if (check) {
    const was = await readFile(OUT, "utf8").catch(() => "");
    if (was !== json) { console.error("config/legend-footprints.json is out of date: run node tools/legends/footprint.mjs"); code = 1; }
    else console.log("config/legend-footprints.json is up to date");
  } else {
    await writeFile(OUT, json);
    console.log(`wrote config/legend-footprints.json (${Object.keys(species).length} species)`);
  }
  if (b.errors.length) { console.error("page errors:\n" + b.errors.join("\n")); code = 1; }
} finally { await b.close(); }
process.exit(code);
