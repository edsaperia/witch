// Broom chassis; original drawing methods retained without geometry changes.
import { M } from "../core.js";
import { v3 } from "../model3d.js";
import { BR_BODY, BR_TRIM, BR_GLOW, BR_BITS, BR_SIDE, broomAlong, broomF4, broomRing, broomWheel } from "./common.js";

export const CHASSIS = {
  jetbike: { body(m, L, a, b) {
      const F = broomAlong(L, a, b);
      m.ell(v3.add(v3.lerp(a, F.e, .5), v3.mul(F.up, -.05)), [F.len * .52, .075, .085], M.BROOM, { dir: F.d, up: F.up, group: BR_BODY });
      m.ell(v3.add(F.at(F.len * .8), v3.mul(F.up, .03)), [.08, .04, .065], M.STRAW, { dir: v3.norm(v3.add(F.d, v3.mul(F.up, .5))), group: BR_TRIM });
      m.seg(F.at(F.len * .25, -.06, .09), F.at(F.len * .7, -.06, .09), .012, .012, M.STRAW, { group: BR_TRIM }); // a stripe down each side
      m.seg(F.at(F.len * .25, -.06, -.09), F.at(F.len * .7, -.06, -.09), .012, .012, M.STRAW, { group: BR_TRIM });
    } },
  canoe: { body(m, L, a, b) {
      const F = broomAlong(L, a, b), c = v3.add(v3.lerp(a, F.e, .45), v3.mul(F.up, -.06));
      m.ell(c, [F.len * .6, .085, .14], M.BROOM, { dir: F.d, up: F.up, group: BR_BODY });
      m.ell(v3.add(c, v3.mul(F.up, .045)), [F.len * .55, .085, .115], M.STRAW, { dir: F.d, up: F.up, group: BR_BODY, cut: true });
      for (const t of [-.5, .55]) m.seg(v3.add(c, v3.mul(F.d, t * F.len)), v3.add(v3.add(c, v3.mul(F.d, t * F.len * 1.12)), v3.mul(F.up, .1)), .02, .012, M.BROOM, { group: BR_TRIM }); // its ends sweeping up
    } },
  ladder: { body(m, L, a, b) {
      const F = broomAlong(L, a, b), n = Math.max(3, Math.round(F.len / .11));
      for (const s of [-.075, .075]) m.seg(F.at(0, 0, s), F.at(F.len, 0, s), .016, .016, M.BROOM, { group: BR_BODY });
      for (let i = 0; i <= n; i++) m.seg(F.at(F.len * (i + .5) / (n + 1), 0, -.075), F.at(F.len * (i + .5) / (n + 1), 0, .075), .011, .011, M.STRAW, { group: BR_TRIM });
    } },
  speeder: { body(m, L, a, b) {
      const F = broomAlong(L, a, b);
      m.ell(v3.add(v3.lerp(a, F.e, .5), v3.mul(F.up, -.03)), [F.len * .5, .045, .055], M.BROOM, { dir: F.d, up: F.up, group: BR_BODY });
      for (const s of [-1, 1]) {
        m.seg(F.at(F.len * .85, -.02, s * .03), F.at(F.len + .25, -.03, s * .07), .018, .01, M.STRAW, { group: BR_TRIM });
        m.box(F.at(F.len + .2, -.03, s * .075), [.045, .035, .005], M.BROOM, { dir: F.d, up: F.up, group: BR_BITS, round: .004 });
      }
    } },
  bicycle: { body(m, L, a, b) {
      const F = broomAlong(L, a, b), turn = broomF4(L) * Math.PI / 6, R = .14, low = -.2;
      const rear = F.at(.04, low), front = F.at(F.len - .02, low), seat = F.at(.46, -.02), bb = F.at(.5, low + .02), head = F.at(F.len - .1, 0);
      broomWheel(m, rear, F.d, F.up, R, turn); broomWheel(m, front, F.d, F.up, R, turn);
      for (const [p, q] of [[F.at(.36, 0), head], [head, bb], [seat, bb], [bb, rear], [seat, rear], [head, front]]) m.seg(p, q, .016, .016, M.BROOM, { group: BR_BODY });
      m.ell(v3.add(seat, v3.mul(F.up, .03)), [.06, .018, .04], M.STRAW, { dir: F.d, up: F.up, group: BR_TRIM });
      const top = v3.add(head, v3.mul(F.up, .07)); m.seg(head, top, .014, .014, M.BROOM, { group: BR_BODY }); m.seg(v3.add(top, [0, 0, -.1]), v3.add(top, [0, 0, .1]), .012, .012, M.STRAW, { group: BR_TRIM });
      const cr = [Math.cos(turn * 2), Math.sin(turn * 2)]; for (const s of [-1, 1]) m.seg(bb, v3.add(bb, v3.add(v3.add(v3.mul(F.d, s * .05 * cr[0]), v3.mul(F.up, s * .05 * cr[1])), [0, 0, s * .03])), .01, .01, M.STRAW, { group: BR_BITS }); // the cranks
    } },
  drone: { body(m, L, a, b) {
      const F = broomAlong(L, a, b), c = v3.add(v3.add(a, v3.mul(F.d, .46)), v3.mul(F.up, -.06)), k = (L.broomLength ?? 1), turn = (L.frame ?? 0) * Math.PI / 3;
      m.ell(c, [.15, .04, .13], M.BROOM, { dir: F.d, up: F.up, group: BR_BODY });
      m.ell(v3.add(c, v3.mul(F.up, -.045)), [.05, .03, .05], M.STRAW, { group: BR_TRIM }); // its camera, underneath
      for (const [p, q] of [[1, 1], [1, -1], [-1, 1], [-1, -1]]) {
        const hub = v3.add(c, v3.add(v3.mul(F.d, p * .3 * k), [0, 0, q * .28 * k])), top = v3.add(hub, v3.mul(F.up, .05));
        m.seg(c, hub, .022, .02, M.BROOM, { group: BR_BODY }); m.seg(hub, top, .03, .026, M.STRAW, { group: BR_TRIM });
        const t = turn + (p * q > 0 ? 0 : Math.PI / 2), dr = v3.add(v3.mul(F.d, Math.cos(t) * .13), [0, 0, Math.sin(t) * .13]);
        m.seg(v3.sub(top, dr), v3.add(top, dr), .014, .014, M.STRAW, { group: BR_BITS });
        broomRing(m, top, F.d, BR_SIDE, .13, .006, M.STRAW, BR_BITS + 1, 12); // the blur of its blades
        m.ell(v3.add(hub, v3.mul(F.up, -.02)), [.016, .016, .016], p > 0 ? M.MAGIC : M.MAGIC2, { group: BR_GLOW });
      }
    } },
  gyrocopter: { body(m, L, a, b) {
      const F = broomAlong(L, a, b), turn = (L.frame ?? 0) * Math.PI / 3;
      m.seg(F.at(0, -.06), F.at(F.len, -.06), .03, .028, M.BROOM, { group: BR_BODY });
      m.ell(F.at(F.len - .02, -.02), [.1, .07, .07], M.STRAW, { dir: F.d, up: F.up, group: BR_TRIM }); // the nose
      const foot = F.at(.3, -.04), top = v3.add(F.at(.24, 0), v3.mul(F.up, .98));
      m.seg(foot, top, .022, .016, M.BROOM, { group: BR_BODY });
      m.ell(top, [.03, .025, .03], M.STRAW, { group: BR_TRIM });
      for (const k of [0, 1]) { const t = turn + k * Math.PI, dr = v3.add(v3.mul(F.d, Math.cos(t) * .5), [0, 0, Math.sin(t) * .5]); m.seg(top, v3.add(top, dr), .02, .014, M.STRAW, { group: BR_BITS, extra: true }); }
      broomRing(m, v3.add(top, v3.mul(F.up, -.005)), F.d, BR_SIDE, .5, .005, M.BROOM, BR_BITS + 1, 20); // the blur of its rotor
      for (const s2 of [-1, 1]) m.seg(F.at(.5, -.07, s2 * .02), F.at(.42, -.25, s2 * .13), .012, .012, M.BROOM, { group: BR_BITS }); // its little legs
    } }
};
