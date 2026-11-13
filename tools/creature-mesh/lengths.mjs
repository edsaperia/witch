// How long each mesh creature is drawn, for her line of followers (Ed, 2026-11-13: "update the conga line spacing for the new
// creature mesh sizes so they don't collide"; rules/babies.ts queueHalf reads it): config/mesh-lengths.json, every kind with a
// mesh at each level, baby to legend, in art pixels: how far across the picture it reaches, nose to tail tip, as the game's camera
// sees it (turned as art/mesh/raster.js draws it, towards us and away), over its whole walk, its fast pace and standing still.
// That is its sprite's drawn width (bakeMesh's `w`, less the empty pixel each side), worked out from its shape without drawing it.
//   node tools/creature-mesh/lengths.mjs           writes it
//   node tools/creature-mesh/lengths.mjs --check   fails if it is stale (src/render/meshLengths.test.ts checks the same)
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { MESH_HEIGHTS, MESH_PLANS } from "../../art/mesh/plans.js";
import { pose, shape } from "../../art/mesh/shape.js";
import { MESH_YAW, meshPpu } from "../../art/mesh/raster.js";
import { MESH_CYCLE } from "../../art/mesh/index.js";

export const LENGTHS_FILE = fileURLToPath(new URL("../../config/mesh-lengths.json", import.meta.url));

/** How far across the picture a kind reaches at a level, art pixels (the game draws it at MESH_HEIGHTS, art/mesh/index.js `scale`). */
export function drawnLength(species, level) {
  const p = () => ({ ...MESH_PLANS[species][level](), fine: 2 }), sh = shape(p()), run = p().gait?.paces?.run ? shape(p(), "run") : null;
  const all = [...sh.lit.pos, ...sh.glow.pos], bone = [...sh.lit.bone, ...sh.glow.bone]; let lo = Infinity, hi = -Infinity;
  for (const [s, n] of run ? [[sh, MESH_CYCLE + 1], [run, MESH_CYCLE]] : [[sh, MESH_CYCLE + 1]]) for (let i = 0; i < n; i++) { const { R, T } = pose(s, i < MESH_CYCLE ? i / MESH_CYCLE : null); // (and standing still: the frame after its walk's)
    for (let v = 0; v < bone.length; v++) { const b = bone[v], a = s.bones[b].at, x = all[v * 3] - a[0], y = all[v * 3 + 1] - a[1], z = all[v * 3 + 2] - a[2], wx = R[b * 9] * x + R[b * 9 + 1] * y + R[b * 9 + 2] * z + T[b * 3], wz = R[b * 9 + 6] * x + R[b * 9 + 7] * y + R[b * 9 + 8] * z + T[b * 3 + 2];
      for (const yaw of [MESH_YAW.towards, MESH_YAW.away]) { const th = Math.PI / 2 - yaw, rx = wx * Math.cos(th) + wz * Math.sin(th); if (rx < lo) lo = rx; if (rx > hi) hi = rx; } } }
  return Math.ceil((hi - lo) * meshPpu(sh, MESH_HEIGHTS[species][level]) * 10) / 10;
}

/** The file's text: every kind with a mesh, sorted, a line each. */
export function lengthsText() {
  const kinds = Object.keys(MESH_PLANS).sort();
  return `{\n "_": "Written by node tools/creature-mesh/lengths.mjs (never by hand): how far across the picture each mesh creature is drawn, baby to legend, in art pixels. rules/babies.ts spaces her line of followers by it (Ed, 2026-11-13).",\n "lengths": {\n${kinds.map(k => `  ${JSON.stringify(k)}: [${[0, 1, 2, 3].map(l => drawnLength(k, l)).join(", ")}]`).join(",\n")}\n }\n}\n`;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const text = lengthsText();
  if (process.argv.includes("--check")) { if (readFileSync(LENGTHS_FILE, "utf8") !== text) { console.error("config/mesh-lengths.json is stale: run node tools/creature-mesh/lengths.mjs"); process.exit(1); } }
  else { writeFileSync(LENGTHS_FILE, text); console.log(`wrote ${LENGTHS_FILE}`); }
}
