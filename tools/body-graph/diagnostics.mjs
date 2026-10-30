// Browser-free, bounded diagnostics. SVG cells preserve each rendered art pixel;
// this is a geometry sheet, not the game's palette/texture/lighting acceptance.
// node tools/body-graph/diagnostics.mjs [output.svg] [--gait]
import { writeFileSync, mkdirSync } from "node:fs";
import { dirname } from "node:path";
import { GENOMES } from "../../art/genome/species.js";
import { compileGraph } from "../../art/body-graph/graph.js";
import { quadrupedFixture, socketFixture } from "../../art/body-graph/fixtures.js";
import { render } from "../../art/model3d.js";
import { poseGraph } from "../../art/body-graph/gait.js";

const gait = process.argv.includes("--gait");
const output = process.argv.slice(2).find(a => a !== "--gait") ?? `previews/body-graph-${gait ? "gait" : "diagnostics"}.svg`;
const builders = {};
for (const g of GENOMES) (builders[g.builder] ??= []).push(g.id);
console.log(JSON.stringify({ species: GENOMES.length, builders }, null, 2));
const fixtures = ["plantigrade", "digitigrade", "hoof"].map(id => [id, quadrupedFixture(id)]);
if (!gait) fixtures.push(["extra sockets (placeholders)", socketFixture()]);
const cells = [], columns = gait ? 8 : 4, cellW = gait ? 180 : 300, cellH = 220;
for (let row = 0; row < fixtures.length; row++) {
  const [label, graph] = fixtures[row];
  for (let col = 0; col < columns; col++) {
    const facing = gait || col < 2 ? "towards" : "away", smooth = gait || col % 2 === 1;
    // Epsilon is required by the existing blend formula's divisor.
    const { model } = gait ? poseGraph(graph, col / columns * .16 / .65) : compileGraph(graph, { blend: smooth ? .07 : 1e-6 });
    const sp = render(model, { scale: 32, facing }).sp;
    const scale = 3, ox = col * cellW + Math.floor((cellW - sp.w * scale) / 2), oy = row * cellH + 50;
    cells.push(`<text x="${col * cellW + 10}" y="${row * cellH + 23}">${label}</text>`);
    const caption = gait ? `gait phase ${col / columns}` : `${facing}: ${smooth ? "smooth skin .07" : "hard join diagnostic"}`;
    cells.push(`<text x="${col * cellW + 10}" y="${row * cellH + 42}">${caption}</text>`);
    for (let y = 0; y < sp.h; y++) for (let x = 0; x < sp.w; x++) {
      const material = sp.get(x, y);
      if (!material) continue;
      const i = (y * sp.w + x) * 3;
      // Fixed screen-space light with three bands exposes normal continuity at
      // joins. This deliberately does not imitate production night lighting.
      const diffuse = Math.max(0, -sp.n[i] * .4 - sp.n[i + 1] * .6 + sp.n[i + 2] * .69);
      const light = [.48, .74, 1][Math.min(2, Math.floor(diffuse * 3))];
      const base = material === 3 ? [181, 165, 140] : [154, 171, 194];
      const colour = `rgb(${base.map(v => Math.round(v * light)).join(",")})`;
      cells.push(`<rect x="${ox + x * scale}" y="${oy + y * scale}" width="${scale}" height="${scale}" fill="${colour}"/>`);
    }
  }
}
mkdirSync(dirname(output), { recursive: true });
const width = columns * cellW, height = fixtures.length * cellH;
writeFileSync(output, `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}"><rect width="${width}" height="${height}" fill="#201e29"/><g font-family="sans-serif" font-size="13" fill="#eee">${cells.join("")}</g></svg>\n`);
console.log(`Geometry diagnostic written: ${output}`);
