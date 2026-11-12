// The snail, four levels, as plans for tools/creature-mesh/quadruped.js (which builds any plan of bones, lofts and cones: this
// one has no legs). Ed's ladder (docs/art-guide/EVOLUTIONS.md and its genome): a near-clear one-turn shell on a baby with big
// stalk eyes; an amber banded young; a tall ridged cone on a frilled adult; and the elder, its shell the night sky, full of
// stars, a gold spiral inlaid along its whorls, old grey skin, huge slow eye stalks with glowing tips. On his word for the fox
// (2026-11-11) the adult wears its signature loud and the legend is stranger and older, with "magical armour pieces": plate
// raised from its own skin over its neck, a lit rune on each. Metres; y up; its head along +z.
import { ball } from "./kit.js";

/** The shell: a tube coiled `turns` times about an axis from its mouth (where the body leaves it) to its apex, the coil and the
 *  tube both shrinking towards the apex. tower 0 lies the coil flat on its side (a garden snail's); 1 stands it up as a spire.
 *  colour(t, i) each ring's; inlay a thin line of that colour along the outside of the whorls; stars { n, colour } lit points
 *  set in it; ridge { colour, every } a fin standing off every few rings. */
function shell(o) {
  const { at, turns = 2, r = 0.09, coil = 0.11, high = 0.06, tower = 0, colour, inlay, stars, ridge, lip, steps = 9 } = o;
  const A = [Math.cos(tower * 1.35) * 0.9, Math.sin(tower * 1.35), -0.25 * tower - 0.1], al = Math.hypot(...A), a = A.map(v => v / al);
  const u0 = [0, 0, 1], k = u0[0] * a[0] + u0[1] * a[1] + u0[2] * a[2], U = u0.map((v, i) => v - a[i] * k), ul = Math.hypot(...U), u = U.map(v => v / ul), v = [a[1] * u[2] - a[2] * u[1], a[2] * u[0] - a[0] * u[2], a[0] * u[1] - a[1] * u[0]];
  const N = Math.round(turns * steps), rings = [], outer = [], cones = [];
  for (let i = 0; i <= N; i++) {
    const t = i / N, s = Math.pow(1 - t * 0.93, 1.25), th = -0.9 + t * turns * Math.PI * 2, rho = coil * s, c = at.map((p, j) => p + a[j] * high * (1 - s) + rho * (u[j] * Math.cos(th) + v[j] * Math.sin(th)));
    const out = [0, 1, 2].map(j => u[j] * Math.cos(th) + v[j] * Math.sin(th)), tan = [0, 1, 2].map(j => -u[j] * Math.sin(th) + v[j] * Math.cos(th));
    rings.push({ at: c, rx: r * s, ry: r * s, bone: "shell", colour: i === 0 && lip ? lip : colour(t, i), up: out });
    outer.push({ at: c.map((p, j) => p + out[j] * r * s * 0.96), rx: r * s * 0.16, ry: r * s * 0.16, bone: "shell", colour: inlay, up: out });
    if (ridge && i % ridge.every === 1 && s > 0.2) cones.push({ at: c.map((p, j) => p + out[j] * r * s * 0.9), rx: r * s * 0.5, ry: r * s * 0.16, tip: c.map((p, j) => p + out[j] * r * s * (1.5 + (ridge.long ?? 0)) - tan[j] * r * s * 0.3), bone: "shell", colour: ridge.colour, tipColour: ridge.tip ?? ridge.colour, split: 0.6, up: tan, sides: 4 });
    if (stars && s > 0.15) for (let n = 0; n < stars.n; n++) { // (scattered round the tube by a fixed shuffle: the same sky every time)
      const h = Math.sin(i * 12.9898 + n * 78.233) * 43758.5453, f = h - Math.floor(h), ang = f * Math.PI * 2, side = [0, 1, 2].map(j => out[j] * Math.cos(ang) + a[j] * Math.sin(ang));
      if (f > 0.28) cones.push({ at: c.map((p, j) => p + side[j] * r * s * 0.93), rx: r * s * 0.15 * (0.5 + f), ry: r * s * 0.15 * (0.5 + f), tip: c.map((p, j) => p + side[j] * r * s * 1.1), bone: "shell", colour: stars.colour, glow: true, up: tan, sides: 4 });
    }
  }
  return { lofts: [{ sides: 8, up: [0, 1, 0], rings }, ...(inlay ? [{ sides: 4, up: [0, 1, 0], rings: outer }] : [])], cones };
}

/** A snail: body (its foot's length, its skin's colours), stalks (their length, the eyes' size and colour, lit or not), shell. */
function snail(name, o) {
  const { len = 1, fat = 1, C, stalk = 1, eye = 1, frill = 0, shell: sh, gait = {} } = o, z = v => v * len;
  const bones = [["root", [0, 0, 0], null], ["tailb", [0, 0.03, z(-0.2)], "root"], ["mid", [0, 0.04, z(0.0)], "root"], ["front", [0, 0.06, z(0.17)], "mid"], ["head", [0, 0.12 * fat, z(0.25)], "front"], ["shell", [0, 0.1 * fat, z(-0.03)], "mid"]];
  const skin = cy => (cy < -0.5 ? C.sole : C.skin), foot = [[-0.36, 0.014, 0.008, 0.006, "tailb"], [-0.27, 0.03, 0.06, 0.024, "tailb"], [-0.1, 0.045, 0.1, 0.04, "tailb"], [0.07, 0.05, 0.098, 0.046, "mid"], [0.18, 0.075, 0.072, 0.052, "front"], [0.245, 0.125, 0.056, 0.05, "head"], [0.3, 0.14, 0.04, 0.036, "head"], [0.33, 0.14, 0.012, 0.012, "head"]]
    .map(([zz, y, rx, ry, bone]) => ({ at: [0, y * fat, z(zz)], rx: rx * fat, ry: ry * fat, bone, colour: skin }));
  const lofts = [{ sides: 8, up: [0, 1, 0], rings: foot }], cones = [], H = [0, 0.15 * fat, z(0.265)];
  // the mantle's frill: flat lobes standing out along its sides
  for (let i = 0; i < frill; i++) for (const s of [1, -1]) { const t = -0.22 + (i / Math.max(1, frill - 1)) * 0.36; cones.push({ at: [0.08 * fat * s, 0.035 * fat, z(t)], rx: 0.03 * fat, ry: 0.01 * fat, tip: [0.125 * fat * s, 0.012, z(t - 0.015)], bone: t < -0.05 ? "tailb" : "mid", colour: C.skin, tipColour: C.frill ?? C.sole, split: 0.93, up: [0, 0, 1], sides: 4 }); }
  // the eye stalks, two bones each so they sway, an eye on each tip; and the two feelers under them
  for (const [s, tag] of [[1, "L"], [-1, "R"]]) {
    const b0 = [0.028 * fat * s, H[1] + 0.02 * fat, H[2]], L = 0.14 * stalk, mid = [b0[0] + 0.02 * s * stalk, b0[1] + L * 0.55, b0[2] + L * 0.12], tip = [b0[0] + 0.045 * s * stalk, b0[1] + L, b0[2] + L * 0.18];
    bones.push([`stalk${tag}1`, b0, "head"], [`stalk${tag}2`, mid, `stalk${tag}1`]);
    lofts.push({ sides: 5, up: [0, 0, 1], rings: [{ at: b0, rx: 0.016 * fat, ry: 0.016 * fat, bone: `stalk${tag}1`, colour: C.skin }, { at: mid, rx: 0.012 * fat, ry: 0.012 * fat, bone: `stalk${tag}1`, colour: C.skin }, { at: tip, rx: 0.011 * fat, ry: 0.011 * fat, bone: `stalk${tag}2`, colour: C.skin }] });
    lofts.push(...ball(`stalk${tag}2`, [tip[0], tip[1] + 0.012 * eye, tip[2]], { r: 0.024 * eye * fat, colour: C.eye, glow: !!C.lit, sides: 6 }).lofts);
    cones.push({ at: [0.02 * fat * s, 0.13 * fat, z(0.31)], rx: 0.008 * fat, ry: 0.008 * fat, tip: [0.05 * fat * s, 0.115 * fat, z(0.31) + 0.05 * fat], bone: "head", colour: C.skin, up: [0, 1, 0], sides: 3 });
  }
  const S = shell({ at: [0, (0.1 + sh.lift) * fat, z(-0.04)], ...sh });
  const sway = (o.sway ?? 0.12), T = Math.PI * 2;
  return { name, bones, lofts: [...lofts, ...S.lofts, ...(o.lofts ?? [])], cones: [...cones, ...S.cones, ...(o.cones ?? [])], armour: o.armour ?? [], anchors: { neck: 4, skull: 5 }, // (its collar round its neck, a hat on its head: art/mesh/gear.js)
    // it glides: a ripple runs up its foot, its shell rocks behind it, its stalks feel about
    gait: { type: "glide", seconds: 1.6, root: "root", bob: 0, legs: [], sleep: "shell", ...gait, extra: [
      { bone: "tailb", pos: u => [0, 0.004 * Math.sin(T * 2 * u), 0.012 * len * Math.sin(T * 2 * u)] }, { bone: "mid", pos: u => [0, 0.004 * Math.sin(T * 2 * u + 1.5), 0.01 * len * Math.sin(T * 2 * u + 1.5)] }, { bone: "front", pos: u => [0, 0.004 * Math.sin(T * 2 * u + 3), 0.012 * len * Math.sin(T * 2 * u + 3)] },
      { bone: "shell", rot: u => [0.035 * Math.sin(T * 2 * u + 2), 0, 0.05 * Math.sin(T * u)] }, { bone: "head", rot: u => [0.05 * Math.sin(T * u + 1), 0.08 * Math.sin(T * u), 0] },
      ...["L", "R"].flatMap((tag, n) => [{ bone: `stalk${tag}1`, rot: u => [sway * Math.sin(T * u + n * 2.2), 0, sway * 0.8 * Math.sin(T * u * 2 + n * 1.3)] }, { bone: `stalk${tag}2`, rot: u => [sway * 1.3 * Math.sin(T * u + n * 2.2 + 0.9), 0, sway * Math.sin(T * u * 2 + n * 1.3 + 0.8)] }])] } };
}

const SKIN = { skin: "#9c8a78", sole: "#c9b9a4", eye: "#17120f" }, band2 = (a, b, every = 2) => (t, i) => (Math.floor(i / every) % 2 ? a : b);
export const SNAIL_PLANS = {
  // a tiny pale shell of one turn you can almost see through, a soft body, big stalk eyes for its size
  baby: () => snail("snail-baby", { len: 0.8, fat: 1.15, C: { skin: "#c9bba8", sole: "#e3d8c6", eye: "#17120f" }, stalk: 1.1, eye: 1.7, shell: { lift: 0.0, turns: 1.1, r: 0.075, coil: 0.06, high: 0.03, colour: () => "#ece4cf" } }),
  // an amber banded shell of two turns, the body grey-brown
  young: () => snail("snail-young", { C: SKIN, stalk: 1.2, eye: 1.2, shell: { lift: 0.035, turns: 2.1, r: 0.1, coil: 0.1, high: 0.05, colour: band2("#d99632", "#f0c56a", 3) } }),
  // a tall shell, its spiral raised into a cone with a ridge on each whorl, banded amber and umber; a broad frill; long stalks
  adult: () => snail("snail-adult", { C: { ...SKIN, frill: "#e9dcc6" }, stalk: 2.0, eye: 1.2, frill: 5, shell: { lift: 0.07, turns: 3.3, r: 0.125, coil: 0.14, high: 0.3, tower: 0.75, colour: band2("#c9811f", "#6e4320", 3), ridge: { colour: "#f0c56a", tip: "#fff0c0", every: 3, long: 0.5 } } }),
  // the elder: its shell the night sky, full of stars, a gold spiral inlaid along its whorls; old grey skin; huge
  // slow eye stalks, their tips lit; night-blue plate edged in gold over its neck, cut with lit marks
  legend() {
    const NIGHT = "#1b2452", NIGHT2 = "#2a3472", GOLD = "#e9b949", STAR = "#f4f8ff", C = { skin: "#8a8a8c", sole: "#b6b6b4", frill: "#d6d6d2", eye: "#bfe6ff", lit: true };
    // its armour (Ed, 2026-11-11: "Armour should just be thickened polygons on their torso with a different colour and glowing runes"): night-blue plate edged in gold over its neck, a star-lit mark on each plate
    const armour = [{ on: 0, from: 3.3, to: 5.5, round: [0, 1.3], lames: 3, thick: 0.014, step: 0.008, colour: NIGHT, rim: GOLD, runes: { colour: STAR, size: 0.7 } }];
    return snail("snail-legend", { len: 1.15, fat: 1.25, C, stalk: 3.4, eye: 1.1, frill: 7, sway: 0.09, shell: { lift: 0.09, turns: 4.2, r: 0.17, coil: 0.2, high: 0.5, tower: 0.85, steps: 10, colour: band2(NIGHT, NIGHT2, 4), inlay: GOLD, stars: { n: 4, colour: STAR } }, armour, gait: { seconds: 2.4 } });
  },
};
