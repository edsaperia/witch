// How far a legless mesh creature slides sideways as it slithers (kit/serpent.js; docs/plans/creature-mesh-rollout.md, batch E:
// "a legless body that slithers"). A snake's curves stand still on the ground while it goes forward through them, so each part
// of it should move over the ground only the way its body points there. Measured, nothing drawn, pure Node: for every ring of
// it that lies on the ground, through the whole clip, its speed over the ground across its own length, as a share of the
// creature's pace (0: it follows its own track exactly), and the same in art pixels a cycle at the size it is drawn.
//   node tools/creature-mesh/slither.mjs [kind...]     every kind built by kit/serpent.js, or those named
//     --max <share>   fail (exit 1) if any is over that
import { meshFacts } from "../../art/mesh/index.js";
import { MESH_PLANS } from "../../art/mesh/plans.js";
import { pose, shape } from "../../art/mesh/shape.js";

const args = process.argv.slice(2), mi = args.indexOf("--max"), max = mi < 0 ? null : Number(args.splice(mi, 2)[1]);
const kinds = (args.length ? args : Object.keys(MESH_PLANS).sort()).filter(k => MESH_PLANS[k][2]().gait?.serpent), LEVELS = ["baby", "young", "adult", "legend"];
let bad = false;
for (const kind of kinds) for (let level = 0; level < 4; level++) {
  const p = MESH_PLANS[kind][level](), sh = shape({ ...p, fine: 2 }), F = meshFacts(kind, level), on = p.gait.serpent.spine.filter(q => q.pitch === 0), N = 96, du = 1e-4;
  let worst = 0, sum = 0;
  for (const q of on) { const i = sh.bones.findIndex(b => b.name === q.bone); let across = 0;
    for (let j = 0; j < N; j++) { const a = pose(sh, j / N), b = pose(sh, j / N + du);
      // (over the ground: the clip's own movement, and the ground going back under it one stride a cycle)
      const vx = (b.T[i * 3] - a.T[i * 3]) / du, vz = (b.T[i * 3 + 2] - a.T[i * 3 + 2]) / du + F.stride, way = q.yaw + Math.atan2(a.R[i * 9 + 2], a.R[i * 9 + 8]);
      const side = Math.abs(vx * Math.cos(way) - vz * Math.sin(way)); worst = Math.max(worst, side / F.stride); across += side / N; }
    sum = Math.max(sum, across); }
  if (max !== null && worst > max) bad = true;
  console.log(`${kind.padEnd(12)} ${LEVELS[level].padEnd(7)} stride ${F.stride.toFixed(2)} m (${(F.stride / F.body).toFixed(2)} of its body)   rings on the ground ${String(on.length).padStart(2)}   sideways: ${(worst * 100).toFixed(2)}% of its pace at worst, ${(sum * F.ppu).toFixed(2)} art px a cycle`);
}
if (bad) { console.error(`over --max ${max}`); process.exit(1); }
