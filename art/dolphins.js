// Dolphins leaping off the east coast at night (Ed, 2026-10-07, via the coordinator: "occasional dolphins arcing out of the
// water and back, alone or in pairs ... a silvery moonlit highlight and a small splash; pixel art that reads at px 5"):
//   dolphin   a bottlenose seen side-on, travelling right (the game mirrors it to go left), in DOLPHIN.frames frames along its
//             arc: nose up as it breaks the water, level at the top, nose down as it goes back in; a dark slate back over a pale
//             belly, a beak, a dorsal fin, flukes, an eye; the moon catching its back in a line of glints (the only lit pixels);
//   splash    DOLPHIN.splashFrames frames of a small splash where it leaves or enters the water: a burst of spray up, falling,
//             a ring of foam left on the water.
// Built in 3D at the witch's scale (art/model3d.js), about 2.4 m long; origin: the dolphin's middle (the game puts it on its
// arc), the splash's foot on the water.
import { M, Sprite } from "./core.js";
import { Model, render, v3 } from "./model3d.js";
import { witchPixelsPerUnit } from "./witch.js";

export const DOLPHIN = { frames: 6, splashFrames: 3, length: 2.4, pitch: [.95, .55, .18, -.18, -.55, -.95] };

export function dolphinColours() {
  return {
    [M.BODY]: [58, 70, 92], [M.BODY2]: [88, 102, 126], [M.BELLY]: [196, 204, 214], // its back, flank, belly
    [M.GLINT]: [226, 236, 255], // the moon on its back
    [M.FRAME]: [214, 232, 240], [M.RUNE]: [150, 210, 230], // spray and foam
    [M.NOSE]: [14, 12, 18], [M.LINE]: [20, 24, 34],
  };
}

const DU = 1.9; // metres a model unit (the witch's scale)
// The dolphin along +x (nose at +x), up +y, in model units; pitched by `a` (radians, nose up) about its middle.
function dolphinModel(a) {
  const m = new Model({ blend: .04 }), L = DOLPHIN.length / DU, c = Math.cos(a), s = Math.sin(a);
  const P = (x, y, z = 0) => [x * c - y * s, x * s + y * c, z]; // a point on the body, pitched
  const back = p => { const q = [p[0] * c + p[1] * s, -p[0] * s + p[1] * c]; return q[1] < -.02 ? M.BELLY : q[1] > .045 ? (q[0] > -L * .22 && q[0] < L * .2 && q[1] > .108 + Math.abs(q[0]) * .05 ? M.GLINT : M.BODY) : M.BODY2; }; // (the glint: a thin line along the top of its back)
  // the body: beak, melon, the thick of it, the tail stock
  m.chain([[...P(L * .5, -.005), .018], [...P(L * .42, 0), .035], [...P(L * .3, .02), .08], [...P(L * .08, .015), .115], [...P(-L * .14, 0), .095], [...P(-L * .34, -.01), .05], [...P(-L * .46, -.01), .025]], M.BODY2, { group: 1, paint: back });
  // the flukes, flat and wide, a little swept back
  for (const z of [-1, 1]) m.seg(P(-L * .45, -.01, 0), P(-L * .53, 0, z * .1), .022, .008, M.BODY, { group: 2 });
  // the dorsal fin, curving back; the pectoral fin
  m.chain([[...P(-L * .02, .1), .03], [...P(-L * .07, .17), .018], [...P(-L * .12, .2), .006]], M.BODY, { group: 3, paint: p => { const q = [p[0] * c + p[1] * s, -p[0] * s + p[1] * c]; return q[1] > .175 && q[0] > -L * .1 ? M.GLINT : undefined; } }); // (its tip catching the moon)
  m.seg(P(L * .14, -.06, .05), P(L * .04, -.12, .09), .02, .008, M.BODY2, { group: 4 });
  m.ell(P(L * .33, .03, .055), [.012, .012, .008], M.NOSE, { group: 5 }); // its eye
  return m;
}
const dolphinSpriteOf = (m, st) => { const { sp, project } = render(m, { scale: witchPixelsPerUnit(st), yaw: 0 }); const [x, y] = project([0, 0, 0]); sp.origin = { x: +x.toFixed(1), y: +y.toFixed(1) }; return sp; };
/** The dolphin at `frame` of its leap (0 breaking the water nose up .. DOLPHIN.frames - 1 going back in nose down). */
export function dolphinSprite(st = {}, { frame = 0 } = {}) {
  const sp = dolphinSpriteOf(dolphinModel(DOLPHIN.pitch[Math.max(0, Math.min(DOLPHIN.frames - 1, frame))]), st);
  return sp;
}
/** The splash at `frame`: 0 a burst of spray going up, 1 at its height, 2 falling back with a ring of foam on the water. */
export function dolphinSplash(st = {}, { frame = 0 } = {}) {
  const m = new Model({ blend: .02 }), k = Math.max(0, Math.min(DOLPHIN.splashFrames - 1, frame)), up = [.12, .2, .1][k], spread = [.08, .14, .2][k];
  m.ell([0, .004, 0], [spread + .06, .006, (spread + .06) * .55], k === 2 ? M.RUNE : M.FRAME, { group: 1 }); // foam on the water
  for (let i = 0; i < 7; i++) { // drops of spray
    const a = i / 7 * Math.PI * 2 + .4, r = spread * (.5 + (i % 3) * .25), h = up * (1 - (i % 3) * .25) * (k === 2 ? .5 : 1);
    m.ell([Math.cos(a) * r, .02 + h, Math.sin(a) * r * .5], [.018, .022, .018], i % 2 ? M.FRAME : M.RUNE, { group: 2 + i });
  }
  m.ell([0, 0, 0], [.004, .002, .004], M.NOSE, { group: 0, extra: true }); // (the foot in the frame)
  const sp = dolphinSpriteOf(m, st); for (let i = 0; i < sp.m.length; i++) if (sp.m[i] === M.NOSE) sp.m[i] = 0;
  return sp;
}
