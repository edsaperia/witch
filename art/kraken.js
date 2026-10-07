// A kraken off the west coast (Ed, 2026-10-07, via the coordinator: "a few huge tentacles rise slowly out of the moonlit sea, curl
// and sink back; maybe an eye or the dome of its head breaking the surface; rare, slow and awe-inspiring"): seen against the
// moon road, so a near-black sea-purple with a moonlit rim and pale suckers along its inner side.
//   tentacle  KRAKEN.frames frames of one tentacle out of the water (its foot on the water, the rest the sea hides): rising, its
//             tip lifting, tall and curling over, curled tight, unfurling as it sinks, nearly gone; mirrored by the game for a
//             tentacle curling the other way. About 9 m out of the water at its tallest.
//   head      KRAKEN.headFrames frames of the dome of its head breaking the surface: a hump, the dome up with the water running
//             off it, its great eye open (the eye the one glowing thing: a dim gold, slit-pupilled).
// Built in 3D at the witch's scale (art/model3d.js); every sprite's foot is the water line (its bottom row).
import { M, Sprite } from "./core.js";
import { Model, render, v3 } from "./model3d.js";
import { witchPixelsPerUnit } from "./witch.js";

export const KRAKEN = { frames: 6, headFrames: 3, tall: 9 };
export function krakenColours() {
  return {
    [M.BODY]: [34, 24, 46], [M.BODY2]: [52, 36, 64], [M.BELLY]: [150, 120, 150], // its hide, the light side, the suckers
    [M.GLINT]: [196, 210, 240], // the moon along its rim
    [M.WOKEN]: [214, 170, 60], [M.NOSE]: [10, 6, 14], // its eye, the slit
    [M.FRAME]: [200, 220, 232], [M.RUNE]: [120, 170, 200], // water running off it
    [M.LINE]: [12, 8, 18],
  };
}
const U = 1.9; // metres a model unit
// Each frame: how much of it is out of the water (0..1) and how far its tip has curled over (radians along its last third).
const POSE = [[.35, .2], [.7, .5], [1, 1.2], [1, 2.4], [.75, 1.6], [.35, .8]];

function tentacleModel(frame) {
  const [out, curl] = POSE[Math.max(0, Math.min(POSE.length - 1, frame))], H = KRAKEN.tall / U * out, n = 14, m = new Model({ blend: .05 }), pts = [];
  // its spine: up from the water, leaning a little, then the tip curling over (to +x), the curl tightening along it
  let p = [0, -.3, 0], a = Math.PI / 2 - .12; const step = (H + .3) / n;
  for (let i = 0; i <= n; i++) {
    const t = i / n, r = .42 * (1 - t) ** .8 + .03;
    pts.push([...p, r]);
    const bend = t > .5 ? curl * ((t - .5) / .5) * 2.6 / n * 3 : .015; // (most of the curl in its last stretch)
    a -= bend; p = v3.add(p, [Math.cos(a) * step, Math.sin(a) * step, 0]);
  }
  const rimSide = q => q[0] + q[1] * .3; // (the moon behind it, up and to its left: the rim on that side)
  m.chain(pts, M.BODY, { group: 1, paint: q => {
    // suckers along its inner (curling) side, the moonlit rim on its outer
    let best = 0, bd = Infinity; for (let i = 0; i < pts.length; i++) { const d = Math.hypot(q[0] - pts[i][0], q[1] - pts[i][1]); if (d < bd) { bd = d; best = i; } }
    const c = pts[best], dx = q[0] - c[0], dy = q[1] - c[1], r = c[3], along = best / pts.length;
    if (dx > r * .45 && dy < 0 && along > .2 && (best % 2 === 0)) return M.BELLY;
    if (dx < -r * .55 && dy > -r * .2) return M.GLINT;
    return along > .6 ? M.BODY2 : undefined;
  } });
  m.ell([0, 0, 0], [.6, .02, .3], M.RUNE, { group: 2 }); // the water stirred round its foot
  return m;
}
function headModel(frame) {
  const k = Math.max(0, Math.min(KRAKEN.headFrames - 1, frame)), up = [.35, .8, .9][k], m = new Model({ blend: .05 });
  m.ell([0, -.6 + up, 0], [1.6, 1.1, 1.1], M.BODY, { group: 1, rough: .04, paint: q => q[1] > -.6 + up + 1.02 ? M.GLINT : q[1] > -.6 + up + .7 ? M.BODY2 : undefined }); // the dome, a thin crown of moonlight on it
  if (k === 2) { const e = [.95, -.6 + up + .25, .78]; m.ell(e, [.2, .3, .24], M.WOKEN, { group: 2 }); m.ell(v3.add(e, [.06, 0, .08]), [.05, .26, .08], M.NOSE, { group: 3 }); } // its great eye, slit-pupilled
  for (let i = 0; i < (k === 0 ? 2 : 5); i++) m.ell([(i - 2) * .5, .03 + (i % 2) * .05, .9], [.06, .08 + k * .03, .05], i % 2 ? M.FRAME : M.RUNE, { group: 4 + i }); // water running off
  m.ell([0, 0, 0], [2, .02, 1], M.RUNE, { group: 10 }); // its wake on the water
  return m;
}
const below = (sp, project) => { // everything under the water line cut away (the sea hides it), so its foot is the bottom row
  const [ox, wy] = project([0, 0, 0]), H = Math.max(1, Math.min(sp.h, Math.round(wy) + 1)), out = new Sprite(sp.w, H);
  for (let y = 0; y < H; y++) for (let x = 0; x < sp.w; x++) { const i = y * sp.w + x; if (sp.m[i]) out.put(x, y, sp.m[i], sp.n[i * 3], sp.n[i * 3 + 1], sp.n[i * 3 + 2]); }
  out.origin = { x: +ox.toFixed(1), y: H };
  return out;
};
const draw = (m, st) => { const { sp, project } = render(m, { scale: witchPixelsPerUnit(st), yaw: .25 }); return below(sp, project); };
/** One tentacle at `frame` (0 rising .. KRAKEN.frames - 1 nearly gone). */
export const krakenTentacle = (st = {}, { frame = 0 } = {}) => draw(tentacleModel(frame), st);
/** The dome of its head at `frame` (0 a hump, 1 the dome, 2 its eye open). */
export const krakenHead = (st = {}, { frame = 0 } = {}) => draw(headModel(frame), st);
