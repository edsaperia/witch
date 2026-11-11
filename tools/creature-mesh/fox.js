// The fox's four levels as plans for tools/creature-mesh/quadruped.js, each its own build and not the last one enlarged (Ed,
// 2026-10-05: "the evolved design per stage (not just being larger)"). Its signature is the brush and the pointed mask, pushed
// further a level: a kit that's all ears with a stub of a tail; a leggy young with a full brush; an adult with five tails fanned
// and a spiked ruff; and the old shrine fox, the elder of its kind (the genome's brief, art/creatures/fox/genome.js: nine tails
// tipped silver-white, a grizzled muzzle and a bitten ear, a red rope at its throat with a bell, rings in its ears, stone prayer
// beads on its legs), made stranger and older still on Ed's word (below). The red fox's own proportions underneath: long in the leg, a deep narrow chest tucked up to
// the loin, a wedge of a head. Metres; y up; its head along +z.
import { band, fourLegs, head, plan, tail, torso, tufts, walk } from "./kit.js";

const WHITE = "#f4efe6", SOCK = "#2a1a16", NOSE = "#16100e", EAR = "#1f1512";

const legs = (body, o) => fourLegs(body, o);

function baby() {
  const C = { coat: "#a8643a", belly: "#eadfce", nose: NOSE, upper: "#a8643a", mid: "#96552f", sock: "#4a2f25" }, L = 0.52;
  const body = torso({ back: 0.37 * L + 0.012, len: 0.54, girth: 1.02, deep: 0.92, tuck: 1.08, neck: [0.075, 0.07], neckThick: 1.15, white: 0.45, colours: C });
  const skull = head(body.pivot, { size: 1.38, muzzle: 0.45, ear: { tall: 1.05, wide: 1.45, back: EAR }, cheek: 0.5, eye: 1.6, white: 0.55, colours: C });
  const brush = tail("tail", "pelvis", [0, 0.37 * L + 0.02, -0.19], { len: 0.19, r: 0.062, pitch: 0.15, tip: 0.4, blunt: 0.4, colours: { coat: C.coat, tip: WHITE } });
  return plan("fox-baby", body, skull, [...legs(body, { len: L, thick: 1.6, colours: C }), brush], { seconds: 0.46, duty: 0.55, bob: 0.011, sway: 0.07, tailSwing: 0.3, tails: [brush.chain], legs: walk(1.15) });
}

function young() {
  const C = { coat: "#e8852b", belly: WHITE, nose: NOSE, upper: "#e8852b", mid: "#cf6c1f", sock: SOCK }, L = 1.1;
  const body = torso({ back: 0.37 * L + 0.01, len: 0.96, girth: 0.84, deep: 0.95, tuck: 0.72, neck: [0.17, 0.15], neckThick: 0.92, white: 0.4, colours: C });
  const skull = head(body.pivot, { size: 0.93, muzzle: 1.08, ear: { tall: 1.25, wide: 1.05, back: EAR }, cheek: 0.35, eye: 1.15, colours: C });
  const brush = tail("tail", "pelvis", [0, 0.37 * L + 0.015, -0.33], { len: 0.54, r: 0.088, pitch: -0.3, colours: { coat: C.coat, under: "#b85c1b", tip: WHITE } });
  return plan("fox-young", body, skull, [...legs(body, { len: L, thick: 0.86, colours: C }), brush], { seconds: 0.62, duty: 0.58, bob: 0.008, sway: 0.05, tailSwing: 0.16, tails: [brush.chain], legs: walk(1.05) });
}

// (Ed, 2026-11-11: "I think the adult should be more like the legend (all the tails and spikes)": the first pass's legend, without
// the elder's trappings: five tails fanned, a spiked ruff and a crest down its back)
function adult() {
  const C = { coat: "#e07a1f", belly: WHITE, nose: NOSE, upper: "#e07a1f", mid: "#c9641a", sock: SOCK }, L = 1.06;
  const body = torso({ back: 0.37 * L + 0.01, len: 1.02, girth: 1.06, deep: 1.14, tuck: 0.74, neck: [0.19, 0.14], neckThick: 1.25, white: 0.5, colours: C });
  const skull = head(body.pivot, { size: 1.06, muzzle: 1.05, ear: { tall: 1.25, wide: 1, back: EAR, tip: EAR }, cheek: 1.75, eye: 1.15, colours: C });
  const tails = Array.from({ length: 5 }, (_, i) => { const f = (i - 2) / 2, a = Math.abs(f);
    return tail(`tail${"abcde"[i]}`, "pelvis", [0.045 * f, body.rings[1].at[1] + 0.05 - 0.03 * a, body.rings[1].at[2] - 0.03 + 0.03 * a], { len: 0.66 - 0.12 * a, r: 0.108 - 0.012 * a, yaw: f * 0.85, pitch: 0.6 - 0.5 * a, curl: -0.35, wave: 0.12, phase: i, tip: 0.2, blunt: 0.22, colours: { coat: C.coat, under: "#a44f18", tip: WHITE } }); });
  const ruff = tufts(body.rings[5], "neck", { n: 5, a0: 0.9, a1: 2.9, long: 0.17, sweep: 0.6, droop: 0.35, r: 0.062, lock: true, colour: () => WHITE });
  const crest = tufts(body.rings[4], "chest", { n: 1, a0: 0.12, long: 0.12, sweep: 0.9, r: 0.045, lock: true, colour: () => C.coat, tip: () => "#a44f18" }).concat(tufts(body.rings[3], "chest", { n: 1, a0: 0.12, long: 0.1, sweep: 0.9, r: 0.04, lock: true, colour: () => C.coat, tip: () => "#a44f18" }));
  return plan("fox-adult", body, skull, [...legs(body, { len: L, thick: 1, colours: C }), ...tails], { seconds: 0.74, duty: 0.6, bob: 0.007, sway: 0.045, tailSwing: 0.1, tails: tails.map(t => t.chain), legs: walk(1) }, { cones: [...ruff, ...crest] });
}

// (Ed, 2026-11-11: "the legend should be even more epic, gnarly, ancient, magical, fantastic (not just \"big\"!)". The old shrine
// fox, the elder of its kind: gaunt and towering on knotted legs, its withers humped under a hanging mane, its head carried
// low and forward behind a pale mask and a beard, one eye lit and one gone white, its brows grown out, an ear torn; nine
// tails longer than itself that rise and coil like smoke, each tipped silver and carrying fox-fire, the middle one's
// gold; the shrine's rope and paper streamers, its bell, gold bound on its tails, stone bands on its legs; and on its back
// black lacquer plate cut with lit marks. No balls of light: Ed, 2026-11-11, "I don't like the random spheres")
function legend() {
  const SILVER = "#eef2f5", GREY = "#bdb6ad", PALE = "#e9e2d6", GOLD = "#e9b949", ROPE = "#c5222c", STONE = "#8d9398", FIRE = "#9fdcff", FIRE2 = "#effaff", PEARL = "#fff0b0", DEEP = "#7d360b", LACQUER = "#262a44";
  const C = { coat: "#b9520f", back: "#a9a39b", belly: PALE, mask: PALE, muzzle: GREY, nose: NOSE, eyes: [{ colour: "#ffd24a", glow: true }, { colour: "#e3edf2" }], upper: "#b9520f", mid: "#8c3f0e", sock: "#1c1210" }, L = 1.4;
  const body = torso({ back: 0.37 * L + 0.01, len: 1.14, girth: 1.02, deep: 1.36, tuck: 0.5, hump: 1.1, neck: [0.11, 0.25], neckThick: 1.4, white: 0.5, colours: C });
  const skull = head(body.pivot, { size: 1.42, muzzle: 1.45, ear: { tall: 1.9, wide: 0.9, back: EAR, tip: EAR, torn: -1 }, cheek: 2.3, eye: 1.7, white: 0.6, colours: C }), P = skull.P;
  const tails = Array.from({ length: 9 }, (_, i) => { const f = (i - 4) / 4, a = Math.abs(f), mid = i === 4;
    return tail(`tail${"abcdefghi"[i]}`, "pelvis", [0.055 * f, body.rings[1].at[1] + 0.06 - 0.03 * a, body.rings[1].at[2] - 0.02 + 0.05 * a], {
      len: 1.02 - 0.26 * a + (i % 2) * 0.09, r: 0.12 - 0.02 * a, yaw: f * 0.75, twist: f * 0.75, pitch: 1.5 - 0.5 * a - (i % 2) * 0.14, curl: -0.75 + 0.15 * a, wave: 0.3, waves: 1.25, phase: i * 1.9, bones: 6, tip: 0.2, plume: true, sides: 6,
      colours: { coat: C.coat, under: DEEP, tip: SILVER }, ring: i % 2 ? { colour: GOLD, at: 0.2 } : undefined,
      fire: { colour: mid ? PEARL : FIRE, tip: FIRE2, size: (mid ? 1.5 : 1.15) - 0.25 * a } }); });
  // the mane: long pale fur hanging off the neck and the humped withers, darker and silver-tipped along the top
  const neckRing = body.rings[5], withers = body.rings[4], ribs = body.rings[3], loin = body.rings[2];
  const mane = [...tufts(neckRing, "neck", { n: 4, a0: 0.5, a1: 2.8, long: 0.2, sweep: 0.8, droop: 0.45, r: 0.085, lock: true, grow: 0.5, colour: i => (i < 1 ? C.coat : PALE), tip: i => (i < 1 ? C.back : GREY) }),
    ...tufts(withers, "chest", { n: 4, a0: 0.25, a1: 2.5, long: 0.2, sweep: 0.85, droop: 0.4, r: 0.09, lock: true, grow: 0.5, colour: i => (i < 2 ? C.coat : PALE), tip: i => (i < 2 ? C.back : GREY) }),
    // tatters under the chest
    ...tufts(withers, "chest", { n: 2, a0: 2.75, a1: 3.05, long: 0.17, sweep: 0.25, droop: 0.7, r: 0.06, lock: true, colour: () => PALE, tip: () => GREY })];
  // its face: a beard, and brows grown out long
  const face = [{ at: P(0, -0.03, 0.2), rx: 0.035, ry: 0.035, tip: P(0, -0.2, 0.13), bone: "head", colour: PALE, tipColour: GREY, split: 0.5, up: [0, 0, 1] },
    ...[1, -1].map(s => ({ at: P(0.048 * s, 0.09, 0.1), rx: 0.028, ry: 0.018, tip: P(0.15 * s, 0.17, -0.04), bone: "head", colour: PALE, tipColour: GREY, split: 0.5, up: [0, 1, 0] }))];
  // the shrine's rope low on its neck, paper streamers and its bell hanging from it
  const top = body.rings[6].at, n = neckRing.at, rope = band("neck", n, top, { at: 0.42, r: 0.135, ry: 0.15, wide: 0.05, colour: ROPE });
  const hang = [[0.1, -0.1, 0.06], [-0.1, -0.1, 0.06], [0.05, -0.15, 0.1], [-0.05, -0.15, 0.1]].map(([x, y, z]) => ({ at: [n[0] + x, n[1] + y + 0.05, n[2] + z + 0.05], rx: 0.026, ry: 0.008, tip: [n[0] + x * 1.15, n[1] + y - 0.14, n[2] + z + 0.06], bone: "neck", colour: "#ffffff", split: 0.9, up: [0, 0, 1], sides: 4 }));
  const by = n[1] - 0.2, bz = n[2] + 0.17, bell = [{ at: [0, by, bz], rx: 0.055, ry: 0.055, tip: [0, by - 0.09, bz], bone: "neck", colour: GOLD, split: 0.85, up: [0, 0, 1], sides: 6 }, { at: [0, by, bz], rx: 0.055, ry: 0.055, tip: [0, by + 0.06, bz - 0.02], bone: "neck", colour: GOLD, up: [0, 0, 1], sides: 6 }];
  const rings = [1, -1].map(s => ({ at: P(0.092 * s, 0.14, 0.025), rx: 0.02, ry: 0.02, tip: P(0.11 * s, 0.06, 0.025), bone: s > 0 ? "earL" : "earR", colour: GOLD, split: 0.85, up: [0, 0, 1], sides: 5 }));
  const four = legs(body, { len: L, thick: 0.88, knob: 1.5, colours: C, claws: { colour: "#ddd6c8", len: 0.9 }, band: { colour: STONE, at: 0.32, r: 0.04 } });
  // feathering behind each leg, as an old hound's
  const feather = four.flatMap(l => { const r = l.lofts[0].rings[1]; return [{ at: [r.at[0], r.at[1] - 0.02, r.at[2] - r.ry * 0.7], rx: 0.04, ry: 0.04, tip: [r.at[0], r.at[1] - 0.15, r.at[2] - r.ry - 0.08], bone: r.bone, colour: C.coat, tipColour: GREY, split: 0.5, up: [1, 0, 0] }]; });
  // its armour (Ed, 2026-11-11: "Armour should just be thickened polygons on their torso with a different colour and glowing runes"): black shrine lacquer edged in gold over its loin and ribs, a fox-fire mark lit on every plate
  const armour = [{ from: 1.15, to: 3.3, round: [0, 1.7], lames: 3, thick: 0.02, step: 0.012, colour: LACQUER, rim: GOLD, runes: { colour: FIRE } }];
  return plan("fox-legend", body, skull, [...four, ...tails, rope], { seconds: 1.15, duty: 0.66, bob: 0.006, sway: 0.03, tailSwing: 0.07, tails: tails.map(t => t.chain), legs: walk(0.85) }, { cones: [...mane, ...face, ...hang, ...bell, ...rings, ...feather], armour });
}

export const FOX = { baby, young, adult, legend };
