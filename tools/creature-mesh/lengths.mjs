// How long each mesh creature is drawn, for her line of followers (Ed, 2026-11-13: "update the conga line spacing for the new
// creature mesh sizes so they don't collide"; rules/babies.ts queueHalf reads it): config/mesh-lengths.json, every kind with a
// mesh at each level, baby to legend, in art pixels: how far across the picture it reaches, nose to tail tip, as the game's camera
// sees it (turned as art/mesh/raster.js draws it, towards us and away), over its whole walk, its fast pace and standing still:
// twice its reach from its sprite's middle, which for most is its sprite's drawn width (bakeMesh's `w`), worked out from its
// shape without drawing it.
//   node tools/creature-mesh/lengths.mjs           writes it
//   node tools/creature-mesh/lengths.mjs --check   fails if it is stale (src/render/meshLengths.test.ts checks the same)
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { MESH_HEIGHTS, MESH_PLANS } from "../../art/mesh/plans.js";
import { pose, shape } from "../../art/mesh/shape.js";
import { MESH_YAW, meshPpu } from "../../art/mesh/raster.js";
import { MESH_CYCLE, MESH_STRIKE } from "../../art/mesh/index.js";

export const LENGTHS_FILE = fileURLToPath(new URL("../../config/mesh-lengths.json", import.meta.url));

/** How long a kind is drawn at a level, art pixels (the game draws it at MESH_HEIGHTS, art/mesh/index.js `scale`): twice how far
 *  it reaches across the picture from its sprite's middle, where it stands, walking, at its fast pace or standing still. For
 *  most that is its sprite's width; one whose sprite holds other poses too (the hydra's striking heads: art/mesh/index.js
 *  `strikes`, which widen the sprite and so move its middle) is measured from that sprite's middle, by its walk alone. */
export function drawnLength(species, level) {
  const p = () => ({ ...MESH_PLANS[species][level](), fine: 2 }), sh = shape(p()), run = p().gait?.paces?.run ? shape(p(), "run") : null, S = p().gait?.strike;
  const more = S ? S.heads.flatMap((_, k) => MESH_STRIKE.map(phase => { const q = p(); return shape({ ...q, still: { ...q.gait.strike.pose(k, phase), root: q.gait.root } }); })) : [];
  const all = [...sh.lit.pos, ...sh.glow.pos], bone = [...sh.lit.bone, ...sh.glow.bone], walk = [Infinity, -Infinity], whole = [Infinity, -Infinity];
  const poses = [...Array.from({ length: MESH_CYCLE + 1 }, (_, i) => [sh, i < MESH_CYCLE ? i / MESH_CYCLE : null, true]), ...(run ? Array.from({ length: MESH_CYCLE }, (_, i) => [run, i / MESH_CYCLE, true]) : []), ...more.map(m => [m, 0, false])]; // (art/mesh/raster.js bakeMesh's frames: the walk, standing still, the fast pace, then the other poses)
  // (every pose's corners, in the model's own space; turned about the middle of their box, as bakeMesh turns them)
  const placed = poses.map(([s, at, walking]) => { const { R, T } = pose(s, at), xz = new Float64Array(bone.length * 2);
    for (let v = 0; v < bone.length; v++) { const b = bone[v], a = s.bones[b].at, x = all[v * 3] - a[0], y = all[v * 3 + 1] - a[1], z = all[v * 3 + 2] - a[2]; xz[v * 2] = R[b * 9] * x + R[b * 9 + 1] * y + R[b * 9 + 2] * z + T[b * 3]; xz[v * 2 + 1] = R[b * 9 + 6] * x + R[b * 9 + 7] * y + R[b * 9 + 8] * z + T[b * 3 + 2]; }
    return { xz, walking }; });
  const lo = [Infinity, Infinity], hi = [-Infinity, -Infinity]; for (const { xz } of placed) for (let i = 0; i < xz.length; i++) { const v = xz[i], k = i % 2; if (v < lo[k]) lo[k] = v; if (v > hi[k]) hi[k] = v; }
  const cx = (lo[0] + hi[0]) / 2, cz = (lo[1] + hi[1]) / 2;
  for (const { xz, walking } of placed) for (const yaw of [MESH_YAW.towards, MESH_YAW.away]) { const th = Math.PI / 2 - yaw, c = Math.cos(th), sn = Math.sin(th);
    for (let v = 0; v < bone.length; v++) { const rx = (xz[v * 2] - cx) * c + (xz[v * 2 + 1] - cz) * sn;
      for (const box of walking ? [walk, whole] : [whole]) { if (rx < box[0]) box[0] = rx; if (rx > box[1]) box[1] = rx; } } }
  const middle = (whole[0] + whole[1]) / 2;
  return Math.ceil(2 * Math.max(middle - walk[0], walk[1] - middle) * meshPpu(sh, MESH_HEIGHTS[species][level]) * 10) / 10;
}

/** The file's text: every kind with a mesh, sorted, a line each. */
export function lengthsText() {
  const kinds = Object.keys(MESH_PLANS).sort();
  return `{\n "_": "Written by node tools/creature-mesh/lengths.mjs (never by hand): how long each mesh creature is drawn walking, baby to legend, in art pixels (twice its reach across the picture from its sprite's middle). rules/babies.ts spaces her line of followers by it (Ed, 2026-11-13).",\n "lengths": {\n${kinds.map(k => `  ${JSON.stringify(k)}: [${[0, 1, 2, 3].map(l => drawnLength(k, l)).join(", ")}]`).join(",\n")}\n }\n}\n`;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const text = lengthsText();
  if (process.argv.includes("--check")) { if (readFileSync(LENGTHS_FILE, "utf8") !== text) { console.error("config/mesh-lengths.json is stale: run node tools/creature-mesh/lengths.mjs"); process.exit(1); } }
  else { writeFileSync(LENGTHS_FILE, text); console.log(`wrote ${LENGTHS_FILE}`); }
}
