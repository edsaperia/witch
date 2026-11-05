// Broom exhausts; original drawing methods retained without geometry changes.
import { M } from "../core.js";
import { v3 } from "../model3d.js";
import { BR_BODY, BR_TAIL, BR_TRIM, BR_GLOW, BR_BITS, BR_SIDE, broomTail, broomF4, broomFlick, broomWheel } from "./common.js";

export const EXHAUSTS = {
  missile: { tail(m, L, c, r, o) {
      const T = broomTail(c, r, o), k = L.bristles ?? 1;
      for (const v of [T.up, v3.mul(T.up, -1), BR_SIDE, v3.mul(BR_SIDE, -1)]) m.box(v3.add(T.at(.02), v3.mul(v, .075)), [.065, .04, .007], M.STRAW, { dir: T.d, up: v, group: BR_TRIM, round: .006 });
      const fl = .13 * k * broomFlick(L);
      m.ell(T.at(-fl * .75), [fl, .045, .045], M.MAGIC, { dir: T.d, group: BR_GLOW, extra: true });
      m.ell(T.at(-fl * .45), [fl * .5, .025, .025], M.MAGIC2, { dir: T.d, group: BR_GLOW, extra: true });
    } },
  hobbyhorse: { tail(m, L, c, r, o) { const T = broomTail(c, r, o); m.seg(T.at(.0), T.at(-.04), .015, .015, M.BROOM, { group: BR_BODY }); broomWheel(m, T.at(-.05), T.d, T.up, .05, broomF4(L) * Math.PI / 6); } },
  jetbike: { tail(m, L, c, r, o) {
      const T = broomTail(c, r, o), k = L.bristles ?? 1, fl = .09 * k * broomFlick(L);
      for (const s of [-1, 1]) { m.seg(T.at(.04, -.05, s * .045), T.at(-.05, -.05, s * .05), .03, .036, M.STRAW, { group: BR_TRIM }); m.ell(T.at(-.06 - fl * .6, -.05, s * .05), [fl, .028, .028], M.MAGIC, { dir: T.d, group: BR_GLOW, extra: true }); }
    } },
  oar: { tail(m, L, c, r, o) { const T = broomTail(c, r, o), k = L.bristles ?? 1; m.seg(T.at(.0), T.at(-.06), .024, .028, M.STRAW, { group: BR_TRIM }); m.ell(T.at(-.06 - .17 * k), [.19 * k, .075, .016], M.STRAW, { dir: T.d, up: T.up, group: BR_TRIM }); } },
  mop: { tail(m, L, c, r, o) {
      const T = broomTail(c, r, o), k = L.bristles ?? 1, f = broomF4(L);
      m.ell(T.at(-.01), [.04, .035, .035], M.STRAW, { dir: T.d, group: BR_TRIM });
      for (let i = 0; i < 10; i++) {
        const a = i / 10 * Math.PI * 2, out = v3.add(v3.mul(T.up, Math.cos(a)), v3.mul(BR_SIDE, Math.sin(a))), sway = [0, .015, .025, .01][(f + i) % 4];
        const end = v3.add(v3.add(T.at(-.16 * k), v3.mul(out, .06)), [0, -.05 - .03 * k + sway, 0]);
        m.chain([[...T.at(-.02), .016], [...v3.add(T.at(-.09 * k), v3.mul(out, .05)), .015], [...end, .012]], M.STRAW, { group: i % 2 ? BR_TAIL : BR_BITS });
      }
      for (let i = 0; i < 2; i++) { const t = ((f + i * 2) % 4) / 4; m.ell(v3.add(T.at(-.12 * k - i * .05), [0, -.12 - t * .12, (i - .5) * .04]), [.011, .016, .011], M.MAGIC2, { group: BR_GLOW, extra: true }); } // drips, falling
    } },
  pitchfork: { tail(m, L, c, r, o) {
      const T = broomTail(c, r, o), k = L.bristles ?? 1;
      m.seg(T.at(.02), T.at(-.02), .022, .026, M.STRAW, { group: BR_TRIM });
      m.chain([[...T.at(-.03, 0, -.065), .012], [...T.at(-.045, 0, 0), .014], [...T.at(-.03, 0, .065), .012]], M.STRAW, { group: BR_TRIM });
      for (const s of [-.065, 0, .065]) m.chain([[...T.at(-.035, 0, s), .011], [...T.at(-.12 * k, .012, s * 1.08), .009], [...T.at(-.22 * k, .02, s * 1.1), .004]], M.STRAW, { group: BR_TRIM });
    } },
  speeder: { tail(m, L, c, r, o) { const T = broomTail(c, r, o), k = L.bristles ?? 1, fl = .06 * k * broomFlick(L); m.ell(T.at(.03, -.03), [.11, .06, .07], M.STRAW, { dir: T.d, group: BR_TRIM }); m.ell(T.at(-.08 - fl * .5, -.03), [fl, .045, .05], M.MAGIC, { dir: T.d, group: BR_GLOW, extra: true }); } },
  gyrocopter: { tail(m, L, c, r, o) {
      const T = broomTail(c, r, o), turn = (L.frame ?? 0) * Math.PI / 4 + .4;
      m.box(T.at(.0, .08), [.07, .08, .008], M.STRAW, { dir: T.d, up: T.up, group: BR_TRIM, round: .006 }); // the fin
      m.ell(T.at(-.03, -.06), [.03, .025, .025], M.STRAW, { group: BR_TRIM });
      for (const k of [0, 1]) { const t = turn + k * Math.PI, dr = v3.add(v3.mul(T.up, Math.cos(t) * .11), [0, 0, Math.sin(t) * .11]); m.seg(T.at(-.05, -.06), v3.add(T.at(-.05, -.06), dr), .012, .008, M.BROOM, { group: BR_BITS }); }
    } }
};
