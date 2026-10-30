// Browser-free, bounded diagnostics. SVG cells preserve each rendered art pixel;
// this is a geometry sheet, not the game's palette/texture/lighting acceptance.
// node tools/body-graph/diagnostics.mjs [output.svg]
import { writeFileSync, mkdirSync } from "node:fs";
import { dirname } from "node:path";
import { GENOMES } from "../../art/genome/species.js";
import { compileGraph } from "../../art/body-graph/graph.js";
import { quadrupedFixture, socketFixture } from "../../art/body-graph/fixtures.js";
import { render } from "../../art/model3d.js";

const output = process.argv[2] ?? "previews/body-graph-diagnostics.svg";
const builders = {};
for (const g of GENOMES) (builders[g.builder] ??= []).push(g.id);
console.log(JSON.stringify({ species: GENOMES.length, builders }, null, 2));
const fixtures = ["plantigrade", "digitigrade", "hoof"].map(id => [id, quadrupedFixture(id)]);
fixtures.push(["extra sockets (placeholders)", socketFixture()]);
const cells = [], cellW = 300, cellH = 220;
for (let row = 0; row < fixtures.length; row++) {
  const [label, graph] = fixtures[row];
  for (let col = 0; col < 4; col++) {
    const facing = col < 2 ? "towards" : "away", smooth = col % 2 === 1;
    // Epsilon is required by the existing blend formula's divisor.
    const { model } = compileGraph(graph, { blend: smooth ? .07 : 1e-6 });
    const sp = render(model, { scale: 32, facing }).sp;
    const scale = 3, ox = col * cellW + Math.floor((cellW - sp.w * scale) / 2), oy = row * cellH + 50;
    cells.push(`<text x="${col * cellW + 10}" y="${row * cellH + 23}">${label}</text>`);
    cells.push(`<text x="${col * cellW + 10}" y="${row * cellH + 42}">${facing}: ${smooth ? "smooth skin .07" : "hard join diagnostic"}</text>`);
    for (let y = 0; y < sp.h; y++) for (let x = 0; x < sp.w; x++) {
      const material = sp.get(x, y);
      if (!material) continue;
      const colour = material === 3 ? "#b5a58c" : "#9aabc2";
      cells.push(`<rect x="${ox + x * scale}" y="${oy + y * scale}" width="${scale}" height="${scale}" fill="${colour}"/>`);
    }
  }
}
mkdirSync(dirname(output), { recursive: true });
writeFileSync(output, `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="880" viewBox="0 0 1200 880"><rect width="1200" height="880" fill="#201e29"/><g font-family="sans-serif" font-size="13" fill="#eee">${cells.join("")}</g></svg>\n`);
console.log(`Geometry diagnostic written: ${output}`);
