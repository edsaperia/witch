// Broom tips; original drawing methods retained without geometry changes.
import { M } from "../core.js";
import { v3 } from "../model3d.js";
import { BR_BODY, BR_TRIM, BR_BITS, broomAlong, broomStick } from "./common.js";

export const TIPS = {
  missile: { body(m, L, a, b) { const F = broomAlong(L, a, b); m.seg(a, F.e, .052, .052, M.BROOM, { group: BR_BODY }); m.seg(F.e, v3.add(F.e, v3.mul(F.d, .17)), .052, .006, M.STRAW, { group: BR_TRIM }); m.seg(F.at(F.len * .8), F.at(F.len * .84), .056, .056, M.STRAW, { group: BR_TRIM }); } },
  curl: { body(m, L, a, b, r1, r2) {
      const F = broomStick(m, L, a, b, r1, r2), e = F.e, pts = [];
      for (let i = 0; i <= 12; i++) { const th = i * .62, R = .075 * (1 - i / 16); pts.push([...v3.add(v3.add(e, v3.mul(F.d, Math.sin(th) * R)), v3.mul(F.up, R - Math.cos(th) * R)), r2 * (1 - i / 22)]); }
      m.chain(pts, M.BROOM, { group: BR_BODY });
    } },
  handlebars: { body(m, L, a, b, r1, r2) {
      const F = broomStick(m, L, a, b, r1, r2), top = v3.add(F.e, v3.mul(F.up, .09));
      m.seg(F.e, top, .016, .014, M.BROOM, { group: BR_BODY });
      m.seg(v3.add(top, [0, 0, -.13]), v3.add(top, [0, 0, .13]), .013, .013, M.BROOM, { group: BR_TRIM });
      for (const s of [-1, 1]) m.seg(v3.add(top, [0, 0, s * .1]), v3.add(top, [0, 0, s * .15]), .022, .022, M.STRAW, { group: BR_BITS });
    } },
  hobbyhorse: { body(m, L, a, b, r1, r2) {
      const F = broomStick(m, L, a, b, r1, r2), neck = v3.add(v3.add(F.e, v3.mul(F.d, .05)), v3.mul(F.up, .13)), head = v3.add(neck, v3.add(v3.mul(F.d, .07), v3.mul(F.up, .02)));
      m.seg(F.e, neck, .035, .03, M.STRAW, { group: BR_TRIM });
      m.ell(head, [.085, .042, .038], M.STRAW, { dir: v3.norm(v3.sub(F.d, v3.mul(F.up, .7))), up: F.up, group: BR_TRIM });
      for (const s of [-1, 1]) { m.seg(v3.add(neck, [0, 0, s * .018]), v3.add(v3.add(neck, v3.mul(F.up, .06)), [0, 0, s * .022]), .014, .004, M.STRAW, { group: BR_TRIM }); m.ell(v3.add(head, [0, 0, s * .037]), [.012, .012, .006], M.EYE, { group: BR_TRIM }); }
      m.chain([[...v3.add(neck, v3.mul(F.up, .03)), .022], [...v3.add(v3.lerp(F.e, neck, .5), v3.mul(F.d, -.035)), .02], [...v3.add(F.e, v3.mul(F.d, -.04)), .012]], M.BROOM, { group: BR_BITS }); // the mane
    } }
};
