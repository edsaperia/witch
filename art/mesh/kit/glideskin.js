// A part of the kit a mesh creature's plan is put together from (art/mesh/species/<id>.js; the how-to is in docs/notes/creatures.md,
// **Writing a mesh creature**). One part a file, so two batches adding parts don't touch the same lines: a new part is a new file
// here, imported by the species that use it. Each part returns { bones, lofts, cones } pieces (metres; y up; its head along +z);
// plan.js joins them. Added with the heavy and the gnawing kinds (docs/plans/creature-mesh-rollout.md, batch D).

/** A flying squirrel's glide skin on legs made by kit/leg.js (kit/quad.js's `legs`) and the torso's rings R: a thin furred
 *  sheet down each flank from its wrist to its ankle, its inner edge in its side, each end riding that leg, so it stretches
 *  and folds as the legs go. wide: how far it stands out from its flank at its fullest; sag: how far its middle hangs below
 *  the flank's middle (of the body's depth there); colour (its top), under, edge (its rim); thick; stars: { colour, n } small
 *  lit points set in its top (a legend's). */
export function glideskin(legs, R, o = {}) {
  const { wide = 0.08, sag = 0.25, colour, under = colour, edge = colour, thick = 0.007, stars } = o, lofts = [], cones = [];
  for (const s of [1, -1]) {
    const tag = s > 0 ? "L" : "R", of = kind => legs.find(l => l.names[0] === kind + tag), fore = of("shoulder"), hind = of("hip");
    if (!fore || !hind) continue;
    const wrist = fore.lofts[0].rings[3], ankle = hind.lofts[0].rings[3], flank = (i, f) => ({ at: [s * (R[i].rx * 0.7 + wide * f * 0.5), R[i].at[1] - R[i].ry * sag, R[i].at[2]], rx: wide * f * 0.5 + R[i].rx * 0.2, bone: R[i].bone });
    const line = [{ at: [wrist.at[0] + s * 0.004, wrist.at[1] + 0.012, wrist.at[2]], rx: 0.012, bone: wrist.bone }, flank(4, 0.8), flank(3, 1), flank(2, 1), flank(1, 0.75), { at: [ankle.at[0] + s * 0.004, ankle.at[1] + 0.012, ankle.at[2]], rx: 0.012, bone: ankle.bone }].reverse();
    const up = [s * 0.25, 0.97, 0];
    lofts.push({ sides: 6, up, rings: line.map(p => ({ at: p.at, rx: p.rx, ry: thick, bone: p.bone, up, colour: (cy, sx) => (Math.abs(sx) > 0.72 ? edge : cy > 0 ? colour : under) })) });
    if (stars) for (let i = 0; i < (stars.n ?? 5); i++) { const m = line[1 + (i % 4)], f = 0.15 + 0.6 * ((i * 5) % 7) / 7, at = [m.at[0] + s * m.rx * f, m.at[1] + thick, m.at[2] + ((i * 3) % 5 - 2) * 0.012];
      cones.push({ at, rx: 0.008, ry: 0.008, tip: [at[0], at[1] + 0.012, at[2]], bone: m.bone, colour: stars.colour, glow: true, up: [0, 0, 1], sides: 4 }); }
  }
  return { bones: [], lofts, cones };
}
