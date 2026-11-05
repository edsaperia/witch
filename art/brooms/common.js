// Shared broom geometry and material groups; moved unchanged from art/brooms.js.
import { M } from "../core.js";
import { v3 } from "../model3d.js";

export const BR_BODY = 2, BR_TAIL = 3, BR_TRIM = 13, BR_GLOW = 16, BR_BITS = 17; // groups: different ones meet with a crease, so the pieces read apart
export const BR_SIDE = [0, 0, 1];
// The broom's frame: its binding a, its nose e (a towards b, longer by broomLength), along it d, its up and its side.
export function broomAlong(L, a, b) {
  const e = v3.add(a, v3.mul(v3.sub(b, a), L.broomLength ?? 1)), len = Math.hypot(...v3.sub(e, a)), d = v3.norm(v3.sub(e, a)), up = v3.norm(v3.cross(BR_SIDE, d));
  return { a, e, d, up, len, at: (t, u = 0, s = 0) => v3.add(v3.add(v3.add(a, v3.mul(d, t)), v3.mul(up, u)), v3.mul(BR_SIDE, s)) };
}
export const broomTail = (c, r, o) => { const d = v3.norm(o.dir), up = v3.norm(v3.cross(BR_SIDE, d)), bind = v3.add(c, v3.mul(d, r[0] * .76)); return { d, up, bind, at: (t, u = 0, s = 0) => v3.add(v3.add(v3.add(bind, v3.mul(d, t)), v3.mul(up, u)), v3.mul(BR_SIDE, s)) }; };
export const broomF4 = L => (L.frame ?? 0) % 4;
export const broomFlick = L => [1, .8, 1.15, .9][broomF4(L)];
// A plain stick, bowed by the bend (as hers).
export function broomStick(m, L, a, b, r1, r2) {
  const F = broomAlong(L, a, b), bend = L.broomBend || 0;
  if (!bend) m.seg(a, F.e, r1, r2, M.BROOM, { group: BR_BODY });
  else m.chain([[...a, r1], [...v3.add(v3.lerp(a, F.e, .55), [0, bend * .12, 0]), (r1 + r2) / 2], [...F.e, r2]], M.BROOM, { group: BR_BODY });
  return F;
}
// A ring of n segments round c in the plane of u and v.
export function broomRing(m, c, u, v, R, r, mat, group, n = 12) {
  const p = k => v3.add(c, v3.add(v3.mul(u, R * Math.cos(k / n * Math.PI * 2)), v3.mul(v, R * Math.sin(k / n * Math.PI * 2))));
  for (let k = 0; k < n; k++) m.seg(p(k), p(k + 1), r, r, mat, { group });
}
// A wheel: a dark tyre, a hub and three spokes turned by the frame.
export function broomWheel(m, c, d, up, R, turn) {
  broomRing(m, c, d, up, R, .016, M.NOSE, BR_BITS, 14);
  m.ell(c, [.025, .025, .02], M.STRAW, { group: BR_TRIM });
  for (let k = 0; k < 3; k++) { const a = turn + k * Math.PI * 2 / 3; m.seg(c, v3.add(c, v3.add(v3.mul(d, R * Math.cos(a)), v3.mul(up, R * Math.sin(a)))), .008, .008, M.STRAW, { group: BR_TRIM }); }
}

