// A part of the kit a mesh creature's plan is put together from (art/mesh/species/<id>.js; the how-to is in docs/notes/creatures.md,
// **Writing a mesh creature**). One part a file, so two batches adding parts don't touch the same lines: a new part is a new file
// here, imported by the species that use it. Each part returns { bones, lofts, cones } pieces (metres; y up; its head along +z);
// plan.js joins them. The shapes start from a red fox's, measured; a species bends them to its own animal.

/** A plan from its parts: the torso's rings and the head's joined into one skin, every part's bones, lofts and cones, the gait.
 *  extra: { cones, armour }: armour is a list of plates laid on the skin (art/mesh/shape.js `armour`: from and to count the skin's
 *  rings, 0 rump tip, 1 hips, 2 loin, 3 ribs, 4 shoulders, 5 neck, 6 throat; round [a0, a1] the angle from the spine they cover). */
export function plan(name, body, skull, parts, gait, extra = {}) {
  return { name,
    bones: [...body.bones, ...skull.bones, ...parts.flatMap(p => p.bones)],
    lofts: [{ sides: 8, up: [0, 1, 0], rings: [...body.rings, ...skull.rings] }, ...(skull.lofts ?? []), ...parts.flatMap(p => p.lofts)],
    cones: [...skull.cones, ...parts.flatMap(p => p.cones), ...(extra.cones ?? [])], armour: extra.armour ?? [],
    gait: { root: "pelvis", hips: "pelvis", chest: "chest", neck: "neck", head: "head", ears: skull.ears, ...gait },
    // (where party gear goes, art/mesh/gear.js: the skin's neck ring, and where the head's rings begin)
    anchors: { neck: 5, skull: body.rings.length } };
}
