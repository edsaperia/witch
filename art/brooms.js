// The broom's other kinds (Ed, 2026-10-06: "create some different kinds of broom; a missile, a curled tip, handlebars, hobby horse,
// jet bike, oar, mop, pitchfork, canoe, wicker basket, ladder, speeder bike, bicycle, quad drone"; later: "a gyrocopter", and the
// wicker basket left out). Each is drawn where her broom is
// (art/witch.js broomHandle and broomBristles: the handle from its binding a to its nose b, the bristles' end at c, o.dir toward the
// nose), so every pose that holds or rides a broom rides these too. Two colours, the creator's Broom box's two pickers: the body
// (M.BROOM, the handle's) and the trim (M.STRAW, the bristles'); flames, exhausts and lights glow in her magic (M.MAGIC, MAGIC2).
// The length knob stretches every one; the bend bows those still on a stick; the bristles knob grows its back end (the flame, the
// blade, the mop, the tines). Moving bits turn with the frame (L.frame): the rotors, the wheels, the flames, the drips.
import { M } from "./core.js";
import { v3 } from "./model3d.js";

/** The kinds after hers (classic, fan, twig, round), in the creator's order. */
export const NEW_BROOMS = ["missile", "curl", "handlebars", "hobbyhorse", "jetbike", "oar", "mop", "pitchfork", "canoe", "ladder", "speeder", "bicycle", "drone", "gyrocopter"];
/** She sits in these (knees up) rather than astride. */
export const SIT_IN = new Set(["canoe"]);
/** On foot these stand on the ground beside her (how high their binding is) rather than being held like a staff. */
export const PARKED = { canoe: .15, gyrocopter: .3, bicycle: .35, jetbike: .14, speeder: .1, drone: .11 };

const BR_BODY = 2, BR_TAIL = 3, BR_TRIM = 13, BR_GLOW = 16, BR_BITS = 17; // groups: different ones meet with a crease, so the pieces read apart
const BR_SIDE = [0, 0, 1];
// The broom's frame: its binding a, its nose e (a towards b, longer by broomLength), along it d, its up and its side.
function broomAlong(L, a, b) {
  const e = v3.add(a, v3.mul(v3.sub(b, a), L.broomLength ?? 1)), len = Math.hypot(...v3.sub(e, a)), d = v3.norm(v3.sub(e, a)), up = v3.norm(v3.cross(BR_SIDE, d));
  return { a, e, d, up, len, at: (t, u = 0, s = 0) => v3.add(v3.add(v3.add(a, v3.mul(d, t)), v3.mul(up, u)), v3.mul(BR_SIDE, s)) };
}
const broomTail = (c, r, o) => { const d = v3.norm(o.dir), up = v3.norm(v3.cross(BR_SIDE, d)), bind = v3.add(c, v3.mul(d, r[0] * .76)); return { d, up, bind, at: (t, u = 0, s = 0) => v3.add(v3.add(v3.add(bind, v3.mul(d, t)), v3.mul(up, u)), v3.mul(BR_SIDE, s)) }; };
const broomF4 = L => (L.frame ?? 0) % 4;
const broomFlick = L => [1, .8, 1.15, .9][broomF4(L)];
// A plain stick, bowed by the bend (as hers).
function broomStick(m, L, a, b, r1, r2) {
  const F = broomAlong(L, a, b), bend = L.broomBend || 0;
  if (!bend) m.seg(a, F.e, r1, r2, M.BROOM, { group: BR_BODY });
  else m.chain([[...a, r1], [...v3.add(v3.lerp(a, F.e, .55), [0, bend * .12, 0]), (r1 + r2) / 2], [...F.e, r2]], M.BROOM, { group: BR_BODY });
  return F;
}
// A ring of n segments round c in the plane of u and v.
function broomRing(m, c, u, v, R, r, mat, group, n = 12) {
  const p = k => v3.add(c, v3.add(v3.mul(u, R * Math.cos(k / n * Math.PI * 2)), v3.mul(v, R * Math.sin(k / n * Math.PI * 2))));
  for (let k = 0; k < n; k++) m.seg(p(k), p(k + 1), r, r, mat, { group });
}
// A wheel: a dark tyre, a hub and three spokes turned by the frame.
function broomWheel(m, c, d, up, R, turn) {
  broomRing(m, c, d, up, R, .016, M.NOSE, BR_BITS, 14);
  m.ell(c, [.025, .025, .02], M.STRAW, { group: BR_TRIM });
  for (let k = 0; k < 3; k++) { const a = turn + k * Math.PI * 2 / 3; m.seg(c, v3.add(c, v3.add(v3.mul(d, R * Math.cos(a)), v3.mul(up, R * Math.sin(a)))), .008, .008, M.STRAW, { group: BR_TRIM }); }
}

// Each kind: body(m, L, a, b, r1, r2) in place of the handle, and tail(m, L, c, r, o) in place of the bristles (either may be absent:
// a plain stick, no back end).
export const BROOM_KINDS = {
  // a missile: a fat body with a pointed nose, fins at the back and a flame
  missile: {
    body(m, L, a, b) { const F = broomAlong(L, a, b); m.seg(a, F.e, .052, .052, M.BROOM, { group: BR_BODY }); m.seg(F.e, v3.add(F.e, v3.mul(F.d, .17)), .052, .006, M.STRAW, { group: BR_TRIM }); m.seg(F.at(F.len * .8), F.at(F.len * .84), .056, .056, M.STRAW, { group: BR_TRIM }); },
    tail(m, L, c, r, o) {
      const T = broomTail(c, r, o), k = L.bristles ?? 1;
      for (const v of [T.up, v3.mul(T.up, -1), BR_SIDE, v3.mul(BR_SIDE, -1)]) m.box(v3.add(T.at(.02), v3.mul(v, .075)), [.065, .04, .007], M.STRAW, { dir: T.d, up: v, group: BR_TRIM, round: .006 });
      const fl = .13 * k * broomFlick(L);
      m.ell(T.at(-fl * .75), [fl, .045, .045], M.MAGIC, { dir: T.d, group: BR_GLOW, extra: true });
      m.ell(T.at(-fl * .45), [fl * .5, .025, .025], M.MAGIC2, { dir: T.d, group: BR_GLOW, extra: true });
    },
  },
  // a curled tip: hers, the nose rolled up into a curl
  curl: {
    bristles: true, // (hers at the back)
    body(m, L, a, b, r1, r2) {
      const F = broomStick(m, L, a, b, r1, r2), e = F.e, pts = [];
      for (let i = 0; i <= 12; i++) { const th = i * .62, R = .075 * (1 - i / 16); pts.push([...v3.add(v3.add(e, v3.mul(F.d, Math.sin(th) * R)), v3.mul(F.up, R - Math.cos(th) * R)), r2 * (1 - i / 22)]); }
      m.chain(pts, M.BROOM, { group: BR_BODY });
    },
  },
  // handlebars: a stem up from the nose and a bar across it with grips
  handlebars: {
    bristles: true,
    body(m, L, a, b, r1, r2) {
      const F = broomStick(m, L, a, b, r1, r2), top = v3.add(F.e, v3.mul(F.up, .09));
      m.seg(F.e, top, .016, .014, M.BROOM, { group: BR_BODY });
      m.seg(v3.add(top, [0, 0, -.13]), v3.add(top, [0, 0, .13]), .013, .013, M.BROOM, { group: BR_TRIM });
      for (const s of [-1, 1]) m.seg(v3.add(top, [0, 0, s * .1]), v3.add(top, [0, 0, s * .15]), .022, .022, M.STRAW, { group: BR_BITS });
    },
  },
  // a hobby horse: a horse's head on the nose, a little wheel at the back
  hobbyhorse: {
    body(m, L, a, b, r1, r2) {
      const F = broomStick(m, L, a, b, r1, r2), neck = v3.add(v3.add(F.e, v3.mul(F.d, .05)), v3.mul(F.up, .13)), head = v3.add(neck, v3.add(v3.mul(F.d, .07), v3.mul(F.up, .02)));
      m.seg(F.e, neck, .035, .03, M.STRAW, { group: BR_TRIM });
      m.ell(head, [.085, .042, .038], M.STRAW, { dir: v3.norm(v3.sub(F.d, v3.mul(F.up, .7))), up: F.up, group: BR_TRIM });
      for (const s of [-1, 1]) { m.seg(v3.add(neck, [0, 0, s * .018]), v3.add(v3.add(neck, v3.mul(F.up, .06)), [0, 0, s * .022]), .014, .004, M.STRAW, { group: BR_TRIM }); m.ell(v3.add(head, [0, 0, s * .037]), [.012, .012, .006], M.EYE, { group: BR_TRIM }); }
      m.chain([[...v3.add(neck, v3.mul(F.up, .03)), .022], [...v3.add(v3.lerp(F.e, neck, .5), v3.mul(F.d, -.035)), .02], [...v3.add(F.e, v3.mul(F.d, -.04)), .012]], M.BROOM, { group: BR_BITS }); // the mane
    },
    tail(m, L, c, r, o) { const T = broomTail(c, r, o); m.seg(T.at(.0), T.at(-.04), .015, .015, M.BROOM, { group: BR_BODY }); broomWheel(m, T.at(-.05), T.d, T.up, .05, broomF4(L) * Math.PI / 6); },
  },
  // a jet bike: a fat fairing under her, a windscreen, twin nozzles glowing at the back
  jetbike: {
    body(m, L, a, b) {
      const F = broomAlong(L, a, b);
      m.ell(v3.add(v3.lerp(a, F.e, .5), v3.mul(F.up, -.05)), [F.len * .52, .075, .085], M.BROOM, { dir: F.d, up: F.up, group: BR_BODY });
      m.ell(v3.add(F.at(F.len * .8), v3.mul(F.up, .03)), [.08, .04, .065], M.STRAW, { dir: v3.norm(v3.add(F.d, v3.mul(F.up, .5))), group: BR_TRIM });
      m.seg(F.at(F.len * .25, -.06, .09), F.at(F.len * .7, -.06, .09), .012, .012, M.STRAW, { group: BR_TRIM }); // a stripe down each side
      m.seg(F.at(F.len * .25, -.06, -.09), F.at(F.len * .7, -.06, -.09), .012, .012, M.STRAW, { group: BR_TRIM });
    },
    tail(m, L, c, r, o) {
      const T = broomTail(c, r, o), k = L.bristles ?? 1, fl = .09 * k * broomFlick(L);
      for (const s of [-1, 1]) { m.seg(T.at(.04, -.05, s * .045), T.at(-.05, -.05, s * .05), .03, .036, M.STRAW, { group: BR_TRIM }); m.ell(T.at(-.06 - fl * .6, -.05, s * .05), [fl, .028, .028], M.MAGIC, { dir: T.d, group: BR_GLOW, extra: true }); }
    },
  },
  // an oar: hers, its back end a flat blade
  oar: { body: broomStick, tail(m, L, c, r, o) { const T = broomTail(c, r, o), k = L.bristles ?? 1; m.seg(T.at(.0), T.at(-.06), .024, .028, M.STRAW, { group: BR_TRIM }); m.ell(T.at(-.06 - .17 * k), [.19 * k, .075, .016], M.STRAW, { dir: T.d, up: T.up, group: BR_TRIM }); } },
  // a mop: a shaggy head of strands, dripping
  mop: {
    body: broomStick,
    tail(m, L, c, r, o) {
      const T = broomTail(c, r, o), k = L.bristles ?? 1, f = broomF4(L);
      m.ell(T.at(-.01), [.04, .035, .035], M.STRAW, { dir: T.d, group: BR_TRIM });
      for (let i = 0; i < 10; i++) {
        const a = i / 10 * Math.PI * 2, out = v3.add(v3.mul(T.up, Math.cos(a)), v3.mul(BR_SIDE, Math.sin(a))), sway = [0, .015, .025, .01][(f + i) % 4];
        const end = v3.add(v3.add(T.at(-.16 * k), v3.mul(out, .06)), [0, -.05 - .03 * k + sway, 0]);
        m.chain([[...T.at(-.02), .016], [...v3.add(T.at(-.09 * k), v3.mul(out, .05)), .015], [...end, .012]], M.STRAW, { group: i % 2 ? BR_TAIL : BR_BITS });
      }
      for (let i = 0; i < 2; i++) { const t = ((f + i * 2) % 4) / 4; m.ell(v3.add(T.at(-.12 * k - i * .05), [0, -.12 - t * .12, (i - .5) * .04]), [.011, .016, .011], M.MAGIC2, { group: BR_GLOW, extra: true }); } // drips, falling
    },
  },
  // a pitchfork: its back end three tines
  pitchfork: {
    body: broomStick,
    tail(m, L, c, r, o) {
      const T = broomTail(c, r, o), k = L.bristles ?? 1;
      m.seg(T.at(.02), T.at(-.02), .022, .026, M.STRAW, { group: BR_TRIM });
      m.chain([[...T.at(-.03, 0, -.065), .012], [...T.at(-.045, 0, 0), .014], [...T.at(-.03, 0, .065), .012]], M.STRAW, { group: BR_TRIM });
      for (const s of [-.065, 0, .065]) m.chain([[...T.at(-.035, 0, s), .011], [...T.at(-.12 * k, .012, s * 1.08), .009], [...T.at(-.22 * k, .02, s * 1.1), .004]], M.STRAW, { group: BR_TRIM });
    },
  },
  // a canoe: a hollow hull she sits in, its inside in the trim colour
  canoe: {
    body(m, L, a, b) {
      const F = broomAlong(L, a, b), c = v3.add(v3.lerp(a, F.e, .45), v3.mul(F.up, -.06));
      m.ell(c, [F.len * .6, .085, .14], M.BROOM, { dir: F.d, up: F.up, group: BR_BODY });
      m.ell(v3.add(c, v3.mul(F.up, .045)), [F.len * .55, .085, .115], M.STRAW, { dir: F.d, up: F.up, group: BR_BODY, cut: true });
      for (const t of [-.5, .55]) m.seg(v3.add(c, v3.mul(F.d, t * F.len)), v3.add(v3.add(c, v3.mul(F.d, t * F.len * 1.12)), v3.mul(F.up, .1)), .02, .012, M.BROOM, { group: BR_TRIM }); // its ends sweeping up
    },
  },
  // a ladder: two rails and rungs
  ladder: {
    body(m, L, a, b) {
      const F = broomAlong(L, a, b), n = Math.max(3, Math.round(F.len / .11));
      for (const s of [-.075, .075]) m.seg(F.at(0, 0, s), F.at(F.len, 0, s), .016, .016, M.BROOM, { group: BR_BODY });
      for (let i = 0; i <= n; i++) m.seg(F.at(F.len * (i + .5) / (n + 1), 0, -.075), F.at(F.len * (i + .5) / (n + 1), 0, .075), .011, .011, M.STRAW, { group: BR_TRIM });
    },
  },
  // a speeder bike: a slim body, two prongs out front with vanes, an engine glowing at the back
  speeder: {
    body(m, L, a, b) {
      const F = broomAlong(L, a, b);
      m.ell(v3.add(v3.lerp(a, F.e, .5), v3.mul(F.up, -.03)), [F.len * .5, .045, .055], M.BROOM, { dir: F.d, up: F.up, group: BR_BODY });
      for (const s of [-1, 1]) {
        m.seg(F.at(F.len * .85, -.02, s * .03), F.at(F.len + .25, -.03, s * .07), .018, .01, M.STRAW, { group: BR_TRIM });
        m.box(F.at(F.len + .2, -.03, s * .075), [.045, .035, .005], M.BROOM, { dir: F.d, up: F.up, group: BR_BITS, round: .004 });
      }
    },
    tail(m, L, c, r, o) { const T = broomTail(c, r, o), k = L.bristles ?? 1, fl = .06 * k * broomFlick(L); m.ell(T.at(.03, -.03), [.11, .06, .07], M.STRAW, { dir: T.d, group: BR_TRIM }); m.ell(T.at(-.08 - fl * .5, -.03), [fl, .045, .05], M.MAGIC, { dir: T.d, group: BR_GLOW, extra: true }); },
  },
  // a bicycle: a frame under the handle, two wheels turning, a saddle and handlebars
  bicycle: {
    body(m, L, a, b) {
      const F = broomAlong(L, a, b), turn = broomF4(L) * Math.PI / 6, R = .14, low = -.2;
      const rear = F.at(.04, low), front = F.at(F.len - .02, low), seat = F.at(.46, -.02), bb = F.at(.5, low + .02), head = F.at(F.len - .1, 0);
      broomWheel(m, rear, F.d, F.up, R, turn); broomWheel(m, front, F.d, F.up, R, turn);
      for (const [p, q] of [[F.at(.36, 0), head], [head, bb], [seat, bb], [bb, rear], [seat, rear], [head, front]]) m.seg(p, q, .016, .016, M.BROOM, { group: BR_BODY });
      m.ell(v3.add(seat, v3.mul(F.up, .03)), [.06, .018, .04], M.STRAW, { dir: F.d, up: F.up, group: BR_TRIM });
      const top = v3.add(head, v3.mul(F.up, .07)); m.seg(head, top, .014, .014, M.BROOM, { group: BR_BODY }); m.seg(v3.add(top, [0, 0, -.1]), v3.add(top, [0, 0, .1]), .012, .012, M.STRAW, { group: BR_TRIM });
      const cr = [Math.cos(turn * 2), Math.sin(turn * 2)]; for (const s of [-1, 1]) m.seg(bb, v3.add(bb, v3.add(v3.add(v3.mul(F.d, s * .05 * cr[0]), v3.mul(F.up, s * .05 * cr[1])), [0, 0, s * .03])), .01, .01, M.STRAW, { group: BR_BITS }); // the cranks
    },
  },
  // a quad drone: a plate under her, four arms, rotors spinning, lights at their ends
  drone: {
    body(m, L, a, b) {
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
    },
  },
  // a gyrocopter: a keel under her with a bubble nose, a mast behind her up past her hat, a big rotor turning on it, a tail fin and a
  // pusher propeller at the back
  gyrocopter: {
    body(m, L, a, b) {
      const F = broomAlong(L, a, b), turn = (L.frame ?? 0) * Math.PI / 3;
      m.seg(F.at(0, -.06), F.at(F.len, -.06), .03, .028, M.BROOM, { group: BR_BODY });
      m.ell(F.at(F.len - .02, -.02), [.1, .07, .07], M.STRAW, { dir: F.d, up: F.up, group: BR_TRIM }); // the nose
      const foot = F.at(.3, -.04), top = v3.add(F.at(.24, 0), v3.mul(F.up, .98));
      m.seg(foot, top, .022, .016, M.BROOM, { group: BR_BODY });
      m.ell(top, [.03, .025, .03], M.STRAW, { group: BR_TRIM });
      for (const k of [0, 1]) { const t = turn + k * Math.PI, dr = v3.add(v3.mul(F.d, Math.cos(t) * .5), [0, 0, Math.sin(t) * .5]); m.seg(top, v3.add(top, dr), .02, .014, M.STRAW, { group: BR_BITS, extra: true }); }
      broomRing(m, v3.add(top, v3.mul(F.up, -.005)), F.d, BR_SIDE, .5, .005, M.BROOM, BR_BITS + 1, 20); // the blur of its rotor
      for (const s2 of [-1, 1]) m.seg(F.at(.5, -.07, s2 * .02), F.at(.42, -.25, s2 * .13), .012, .012, M.BROOM, { group: BR_BITS }); // its little legs
    },
    tail(m, L, c, r, o) {
      const T = broomTail(c, r, o), turn = (L.frame ?? 0) * Math.PI / 4 + .4;
      m.box(T.at(.0, .08), [.07, .08, .008], M.STRAW, { dir: T.d, up: T.up, group: BR_TRIM, round: .006 }); // the fin
      m.ell(T.at(-.03, -.06), [.03, .025, .025], M.STRAW, { group: BR_TRIM });
      for (const k of [0, 1]) { const t = turn + k * Math.PI, dr = v3.add(v3.mul(T.up, Math.cos(t) * .11), [0, 0, Math.sin(t) * .11]); m.seg(T.at(-.05, -.06), v3.add(T.at(-.05, -.06), dr), .012, .008, M.BROOM, { group: BR_BITS }); }
    },
  },
};
