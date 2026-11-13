// A part of the kit a mesh creature's plan is put together from (art/mesh/species/<id>.js; the how-to is in docs/notes/creatures.md,
// **Writing a mesh creature**). One part a file, so two batches adding parts don't touch the same lines: a new part is a new file
// here, imported by the species that use it. Each part returns { bones, lofts, cones } pieces (metres; y up; its head along +z);
// plan.js joins them. The shapes start from a red fox's, measured; a species bends them to its own animal.
import { bib } from "./bib.js";

/** The torso and neck: bones root, pelvis, loin, chest, neck, and the skin's rings from rump to neck top (the head's rings go
 *  on after them). o: back (the spine's height: about 0.38 x the legs' length), len (1: a fox's), girth, deep (the chest's depth),
 *  tuck (the loin's: under 1 tucked up), neck [up, forward] from the shoulders to the skull's base, neckThick, colours
 *  { coat, belly, back (a stripe along the spine, if any) }, white (how far up the flank the belly's colour comes, 0 to 1), hump (the
 *  withers raised: an old animal's high shoulders), arch (the back bowed up between hips and shoulders: a stoat's, a hare's), drop
 *  (the shoulders that much lower than the hips, for hind legs longer than the fore), rump (the haunches' size). */
export const stance = (hind, fore = hind) => ({ back: 0.37 * hind + 0.01, drop: 0.37 * hind - 0.03 - 0.34 * fore }); // the back's height and drop for legs of those lengths
export function torso(o) {
  const { back = 0.38, len = 1, girth = 1, deep = 1, tuck = 1, neck = [0.17, 0.15], neckThick = 1, white = 0.5, hump = 0, arch = 0, drop = 0, rump = 1, colours } = o, g = girth, C = colours;
  const coat = lo => (C.back ? cy => (cy > 0.75 ? C.back : cy < lo ? C.belly : C.coat) : bib(C.coat, C.belly, lo));
  const z = v => v * len, at = white * 0.9 - 1.05; // (white 0: none; 1: the lower half)
  // (how far along the back, 0 at the hips to 1 at the shoulders: the spine arched up between them by `arch`, its front `drop` lower)
  const fr = v => Math.min(1.1, Math.max(-0.2, (v + 0.275) / 0.46)), yo = v => arch * 0.07 * Math.sin(Math.PI * Math.min(1, Math.max(0, fr(v)))) - drop * fr(v);
  const sh = [0, back - 0.005 + yo(0.185), z(0.185)], pivot = [0, sh[1] + neck[0], sh[2] + neck[1]];
  return {
    pivot,
    bones: [["root", [0, 0, 0], null], ["pelvis", [0, back + 0.01 + yo(-0.26), z(-0.26)], "root"], ["loin", [0, back + 0.02 + yo(-0.1), z(-0.10)], "pelvis"], ["chest", [0, back + 0.005 + yo(0.08), z(0.08)], "loin"], ["neck", [0, sh[1] + neck[0] * 0.35, sh[2] + neck[1] * 0.45], "chest"]],
    rings: [
      { at: [0, back + 0.005 + yo(-0.365) - (rump - 1) * 0.02, z(-0.365)], rx: 0.03 * g * rump, ry: 0.035 * g * rump, bone: "pelvis", colour: C.coat },
      { at: [0, back - 0.005 + yo(-0.275), z(-0.275)], rx: 0.088 * g * rump, ry: 0.1 * g * rump, bone: "pelvis", colour: coat(at - 0.55) },
      { at: [0, back + 0.01 + (1 - tuck) * 0.03 + yo(-0.12), z(-0.12)], rx: 0.082 * g * (0.6 + 0.4 * tuck), ry: 0.088 * g * tuck, bone: "loin", colour: coat(at - 0.3) },
      { at: [0, back - 0.01 - (deep - 1) * 0.04 + hump * 0.025 + yo(0.05), z(0.05)], rx: 0.096 * g, ry: (0.122 * deep + hump * 0.03) * g, bone: "chest", colour: coat(at - 0.1) },
      { at: [0, sh[1] - (deep - 1) * 0.04 + hump * 0.05, sh[2]], rx: 0.094 * g, ry: (0.125 * deep + hump * 0.055) * g, bone: "chest", colour: coat(at + 0.15) },
      { at: [0, sh[1] + neck[0] * 0.35, sh[2] + neck[1] * 0.5], rx: 0.068 * g * neckThick, ry: 0.09 * g * neckThick, bone: "neck", colour: bib(C.coat, C.belly, at + 0.3), up: [0, 0.8, -0.6] },
      { at: [0, sh[1] + neck[0] * 0.82, sh[2] + neck[1] * 0.92], rx: 0.06 * g * neckThick, ry: 0.07 * g * neckThick, bone: "neck", colour: bib(C.coat, C.belly, at + 0.3), up: [0, 0.75, -0.65] },
    ],
    hip: s => [0.065 * g * rump * s, back - 0.01, z(-0.25)], shoulder: s => [0.06 * g * s, back - 0.04 - drop, z(0.175)],
  };
}

/** The bone each ring of the torso's skin rides, rump tip to throat: what stands off a ring (kit/tufts.js) rides the same. */
export const BONES = ["pelvis", "pelvis", "loin", "chest", "chest", "neck", "neck"];
