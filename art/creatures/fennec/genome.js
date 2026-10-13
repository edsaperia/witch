// the erg's fennec fox (a journey kind: unknown-07's, the hot south): a small pale sand fox that's mostly ears, a black-tipped brush; its
// legend the dunes' own: ears like sails, a white mask, turquoise beads, heat-shimmer rising off its back
export const GENOME_FENNEC = { id: "fennec", name: "Fennec fox", template: "quadruped", builder: "quad", palette: { hue: .1, sat: .32, val: .93, belly: "white", ear: [.97, .32, .9], magic: .12 }, body: { hgt: .62, len: .55, chest: .4, tuck: .48, neck: .28, neckAng: .78, neckW: .3, hr: .28, legW: .7 , profile: { shoulder: { w: 1.1, d: 1.04 }, waist: { w: .78, d: .88 }, loin: { w: .85, d: .95 }, hip: { w: .92 } } }, head: { snout: .8, snoutD: .42, snoutTaper: .5, eyeK: 1.35 }, parts: { ears: { kind: "sail", size: 2 }, tail: "bushy", feet: "paw" }, coat: { belly: true }, legend: ["tails"],
  levels: [
    { body: { len: .44, chest: .36, tuck: .42, hr: .32 }, head: { snout: .6, eyeK: 1.5 }, parts: { ears: { kind: "sail", size: 2.3 }, tail: "puff" } },
    { body: { len: .62, chest: .44, tuck: .52, legW: .65, neckW: .27 }, head: { snout: .9 } },
    { body: { len: .6, legW: .72 }, head: { snout: .88 }, parts: { ears: { kind: "sail", size: 2.1 } }, features: [{ kind: "ruff", size: .1, count: 10, mat: "BELLY" }] },
    { body: { len: .66, legW: .8, neckAng: .7 }, head: { snout: .9, mask: true, eyeGlow: true }, parts: { ears: { kind: "sail", size: 2.6 } }, coat: { beads: true }, features: [
      { kind: "ruff", size: .18, count: 14, mat: "BELLY" },
      { kind: "mane", from: .25, to: .9, height: .07, count: 14, lean: .85, mat: "BELLY" },
      { kind: "wisps", at: "mane", size: .2, count: 6, from: .15, to: .85, mat: "MAGIC2", lift: .2 },
    ] },
  ] };
