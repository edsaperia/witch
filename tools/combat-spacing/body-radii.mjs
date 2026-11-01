// Cloud CPU calibration only: conservative anatomical ground-disc support at the shipped fitted drawing scale.
//   node tools/combat-spacing/body-radii.mjs <output.json>
import fs from "node:fs";
import { critter, defaultStyle } from "../../art/generator.js";
import { withForm } from "../../art/creatures3d.js";
import { projectedInterval } from "../../art/model3d.js";
import { SIZE_CLASS_BY_ID } from "../../art/genome/size-ranks.js";

const tuning = JSON.parse(fs.readFileSync("config/tuning.json", "utf8"));
const style = { ...defaultStyle(), ...JSON.parse(fs.readFileSync("config/style.json", "utf8")), pixel: tuning.pixelSize, creatureSizeCandidate: 1 };
const bodies = {};
for (const species of Object.keys(SIZE_CLASS_BY_ID).sort()) {
  bodies[species] = [];
  for (let level = 0; level < 4; level++) {
    let radius = 0;
    const capture = (model, options) => {
      // The real drawForm has already applied body fitting, including species/age shape and pixel phase.
      // World X/Z support is independent of camera heading. Include anatomical volume and flats, exclude decorative extras.
      for (const part of [...model.parts, ...model.flats].filter(p => !p.extra)) {
        const x = projectedInterval(part, [1, 0, 0]), z = projectedInterval(part, [0, 0, 1]);
        radius = Math.max(radius, Math.hypot(Math.max(...x.map(Math.abs)), Math.max(...z.map(Math.abs))) * options.scale);
      }
      return {};
    };
    capture.rig = true; // sparse body-fit probes; no unused final full raster
    withForm(capture, () => critter(species, level, 0, style));
    if (!Number.isFinite(radius) || radius <= 0) throw Error(`No drawn support: ${species}@${level}`);
    bodies[species].push(Math.ceil(radius * 1000) / 1000);
  }
  console.log(`calibrated ${species}`);
}
fs.writeFileSync(process.argv[2] ?? "body-radii.json", JSON.stringify({ schema: 1, pixelSize: tuning.pixelSize, source: process.env.GITHUB_SHA ?? null, definition: "Conservative origin-centred disc enclosing anatomical model X/Z support at actual fitted drawing scale; excludes decorative extra parts; pixels, not attack/hit radii.", bodies }, null, 2) + "\n");
