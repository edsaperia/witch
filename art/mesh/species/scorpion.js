// The scorpion, four levels, as plans for art/mesh/shape.js (the rollout's batch G, the many-legged:
// docs/plans/creature-mesh-rollout.md; the ladders are proposals till Ed marks them). Its genome's brief
// (art/creatures/scorpion/genome.js; Ed, 2026-10-13): "a red-brown canyon scorpion, pincers ahead and its sting arched over its
// back; its legend the elder of its kind: a colossal curled tail, its young riding on its scarred back, glowing blue-green along
// its plates under the moon". A low flat body of plates, eight jointed legs going as two fours (kit/manylegs.js), a pincer on
// an arm each side of its head (kit/pincers.js) and its tail of beads with the sting (kit/sting.js). Its ladder: a pale soft
// scorpling with a stub of a tail; a slim sandy young one; a red-brown adult with heavy pincers; and the elder, its tail vast
// and curled high, its back plated in night blue with a blue-green mark lit on every plate, its sting and its pincers' points
// lit, three of its young riding on it.
import { legPairs, scuttles } from "../kit/manylegs.js";
import { pincer } from "../kit/pincers.js";
import { laidTail, stingTail } from "../kit/sting.js";

function scorpion(name, o) {
  const { k = 1, C, tail: tl = {}, pincers: pn = {}, legs: lg = {}, eyes = {}, armour = [], gait = {}, wide = 1 } = o, y0 = 0.075 * k * (lg.stand ?? 1);
  // its skin, tail end to nose: seven plates of its back (two rings each, light and dark by turns), then its head shield
  const ring = (z, rx, ry, bone, colour, dy = 0) => ({ at: [0, y0 + dy * k, z * k], rx: rx * k * wide, ry: ry * k, bone, colour: cy => (cy < -0.5 ? C.belly : colour) }), skin = [ring(-0.2, 0.03, 0.022, "body", C.coat)];
  for (let i = 0; i < 6; i++) { const z = -0.185 + i * 0.04, g = 0.6 + 0.4 * Math.sin(Math.PI * (0.12 + 0.6 * (i + 0.5) / 6)); skin.push(ring(z, 0.08 * g, 0.042 * g, "body", i % 2 ? C.coat : C.coat2 ?? C.coat), ring(z + 0.036, 0.084 * g, 0.045 * g, "body", i % 2 ? C.coat : C.coat2 ?? C.coat)); }
  const neck = skin.length; skin.push(ring(0.06, 0.082, 0.046, "head", C.head ?? C.coat), ring(0.11, 0.074, 0.04, "head", C.head ?? C.coat), ring(0.15, 0.045, 0.024, "head", C.head ?? C.coat, -0.006));
  const bones = [["body", [0, y0, 0], null], ["head", [0, y0, 0.06 * k], "body"]], lofts = [{ name: "skin", sides: 8, up: [0, 1, 0], rings: skin }], cones = [];
  for (const s of [1, -1]) cones.push({ at: [0.02 * k * s, y0 + 0.036 * k, 0.105 * k], rx: 0.011 * k * (eyes.size ?? 1), ry: 0.011 * k * (eyes.size ?? 1), tip: [0.026 * k * s, y0 + 0.05 * k, 0.11 * k], bone: "head", colour: eyes.colour ?? "#0c0a09", glow: !!eyes.glow, tag: "eye", up: [0, 0, 1], sides: 4, bulge: 0.8 });
  const tail = stingTail("body", [0, y0 + 0.01 * k, -0.19 * k], { n: tl.n ?? 5, len: 0.42 * k * (tl.len ?? 1), r: 0.03 * k * (tl.fat ?? 1), pitch: tl.pitch ?? 0.55, curl: tl.curl ?? 2.25, bulb: tl.bulb ?? 1, sting: tl.sting ?? 1, colours: { coat: C.tail ?? C.coat, joint: C.coat2 ?? C.coat, bulb: C.bulb ?? C.coat, sting: C.sting ?? "#2a1a14", point: C.point }, glow: !!C.point });
  const P = pn.size ?? 1, claws = [[1, "L"], [-1, "R"]].map(([s, tag]) => pincer(tag, [0.06 * k * wide * s, y0 - 0.004 * k, 0.12 * k], { out: [0.85 * s, 0.1, 0.6], fwd: [-0.28 * s, 0.05, 1], gape: [-s, 0.15, 0], l1: 0.1 * k * (pn.arm ?? 1), l2: 0.11 * k * P, size: 0.34 * (pn.fat ?? 1), finger: 0.85, open: 0.4, thick: 0.2, parent: "head", colours: { arm: C.arm ?? C.coat, hand: C.hand ?? C.coat, finger: C.coat2 ?? C.coat, tip: C.nip }, glow: !!C.nipGlow }));
  const L = 0.2 * k * (lg.len ?? 1), legs = legPairs([[-0.07, -0.85], [-0.02, -0.32], [0.03, 0.18], [0.075, 0.62]].map(([z, yaw]) => ({ at: [0.064 * k * wide, y0 - 0.012 * k, z * k], yaw })), { len: L, rise: lg.rise ?? 0.34, thick: lg.thick ?? 1, low: 0.3, parent: "body", colours: { upper: C.leg, joint: C.coat2 ?? C.leg, lower: C.leg, tip: C.foot ?? C.leg } });
  const T = Math.PI * 2, parts = [tail, ...claws, ...legs];
  // asleep: its legs folded in, its tail let down and laid round its side, its pincers drawn in before its face
  const also = ctx => { laidTail(tail, { step: tl.lay ?? 0.75 })(ctx); ctx.rots.armL = [0, -0.75, 0]; ctx.rots.armR = [0, 0.75, 0]; ctx.rots.nipL = [0, -0.3, 0]; ctx.rots.nipR = [0, 0.3, 0]; };
  return { name, bones: [...bones, ...parts.flatMap(p => p.bones)], lofts: [...lofts, ...parts.flatMap(p => p.lofts), ...(o.lofts?.({ skin, k, y0 }) ?? [])], cones: [...cones, ...parts.flatMap(p => p.cones), ...(o.cones?.({ skin, k, y0 }) ?? [])], armour,
    gait: { root: "body", hips: "body", head: "head", tails: [tail.chain], ...scuttles(legs, { fold: { also }, ...gait }), extra: [{ bone: "nipL", rot: u => [0, 0.22 * Math.max(0, Math.sin(T * u)), 0] }, { bone: "nipR", rot: u => [0, -0.22 * Math.max(0, Math.sin(T * u + 2.4)), 0] }, { bone: "armL", rot: u => [0, 0.06 * Math.sin(T * u), 0] }, { bone: "armR", rot: u => [0, 0.06 * Math.sin(T * u), 0] }] }, anchors: { neck, skull: neck } };
}
const scorpions = {
  // a scorpling: pale and soft, small pincers, a stub of a tail still learning to curl
  baby: () => scorpion("scorpion-baby", { k: 0.8, wide: 1.1, C: { coat: "#d9b98a", coat2: "#c9a878", belly: "#ead8b4", leg: "#c9a878", head: "#c9a070", sting: "#8a5a3a" }, tail: { n: 4, len: 0.62, fat: 1.15, curl: 1.9, pitch: 0.7, sting: 0.7 }, pincers: { size: 0.7, arm: 0.75, fat: 1.1 }, legs: { len: 0.8, thick: 1.5 }, eyes: { size: 1.5 }, gait: { lively: 1.3 } }),
  // slim and sandy, its tail up
  young: () => scorpion("scorpion-young", { k: 0.9, C: { coat: "#a8744a", coat2: "#96643e", belly: "#d9b98a", leg: "#96643e", head: "#8a5a3a", sting: "#3a2218" }, tail: { len: 0.9 }, pincers: { size: 0.9 }, legs: { thick: 1.2 }, gait: { lively: 1.1 } }),
  // red-brown, heavy pincers ahead, its sting arched over its back
  adult: () => scorpion("scorpion-adult", { C: { coat: "#7a4a32", coat2: "#6a3e2a", belly: "#b98a5a", leg: "#6a3e2a", head: "#63382a", hand: "#8a4a2e", bulb: "#8a4a2e", sting: "#2a1612" }, tail: { len: 1.1, fat: 1.1, sting: 1.2 }, pincers: { size: 1.3, fat: 1.15 }, legs: { thick: 1.3 } }),
  // the elder: a colossal curled tail, its back plated in night blue with a blue-green mark lit on every plate, its sting and
  // its pincers' points lit, its eyes lit; three of its young riding on its back
  legend() {
    const NIGHT = "#1c2a44", EDGE = "#4a6a8a", GLOW = "#5affd8";
    // its armour (Ed, 2026-11-11: "Armour should just be thickened polygons on their torso with a different colour and glowing runes"): plate i lies on the skin's rings 1 + 2i and 2 + 2i
    const armour = [...Array.from({ length: 6 }, (_, i) => ({ on: "skin", from: 1 + 2 * i + 0.1, to: 2 + 2 * i - 0.05, round: [0, 1.5], thick: 0.014, step: 0.008, colour: NIGHT, rim: EDGE, runes: { colour: GLOW, max: 1, size: 0.6, round: [0, 1.0] } })),
      { on: "skin", from: 13.1, to: 14.9, round: [0, 1.5], thick: 0.014, step: 0.004, colour: NIGHT, rim: EDGE }];
    // (its young: each a pale small body and a curl of tail, sat on a plate of its back)
    const brood = ({ k, y0 }) => [[0.03, -0.1, 0.4], [-0.035, -0.04, -0.5], [0.02, 0.02, 0.2]].flatMap(([x, z, turn]) => { const at = [x * k, y0 + 0.062 * k, z * k], f = [Math.sin(turn), Math.cos(turn)];
      return [{ at: [at[0] - f[0] * 0.03 * k, at[1], at[2] - f[1] * 0.03 * k], rx: 0.018 * k, ry: 0.012 * k, tip: [at[0] + f[0] * 0.035 * k, at[1] + 0.004 * k, at[2] + f[1] * 0.035 * k], bone: "body", colour: "#e6cfa0", bulge: 0.95, split: 0.4, up: [0, 1, 0], sides: 5 },
        { at: [at[0] - f[0] * 0.03 * k, at[1] + 0.004 * k, at[2] - f[1] * 0.03 * k], rx: 0.007 * k, ry: 0.007 * k, tip: [at[0] - f[0] * 0.012 * k, at[1] + 0.04 * k, at[2] - f[1] * 0.012 * k], bend: [-f[0] * 0.02 * k, 0.012 * k, -f[1] * 0.02 * k], bulge: 0.9, bone: "body", colour: "#d9b98a", tipColour: GLOW, glow: "tip", up: [1, 0, 0], sides: 3 }]; });
    return scorpion("scorpion-legend", { k: 1.45, C: { coat: "#5a3426", coat2: "#4a2a20", belly: "#8a6a4a", leg: "#3e241c", head: "#3e241c", hand: "#63382a", tail: "#4a2a20", bulb: NIGHT, sting: EDGE, point: GLOW, nip: GLOW, nipGlow: true, foot: EDGE },
      tail: { n: 7, len: 1.9, fat: 1.35, pitch: 0.75, curl: 2.5, bulb: 1.3, sting: 1.5, lay: 0.7 }, pincers: { size: 1.4, fat: 1.2 }, legs: { thick: 1.4, len: 1.1 }, eyes: { colour: GLOW, glow: true }, armour, cones: brood, gait: { lively: 0.75 } });
  },
};

/** This kind's mesh (art/mesh/species/index.js lists them, made by tools/creature-mesh/index.mjs): heights, how tall it stands, baby
 *  to legend, in art pixels (today's drawing's, from tools/creature-mesh/sizes.mjs: Ed, 2026-11-12, "keep the sizes"); plans, each
 *  level's build. It sleeps on its belly at every level, legs folded, its tail laid round its side and its pincers drawn in. */
export const MESH = { id: "scorpion", heights: [30, 46, 65, 200], plans: scorpions };
