// the pack ice's polar bear (an area recipe's, phase 4): a long-necked white bear, its coat shaggy
export const GENOME_POLARBEAR = { id: "polarbear", name: "Polar bear", template: "quadruped", builder: "quad", palette: { hue: .14, sat: .05, val: .9 }, body: { hgt: 1.25, len: .9, chest: .38, tuck: .42, neck: .34, neckAng: .02, neckW: .55, hr: .3, legW: 1.8, bw: .36 }, head: { snout: .85, snoutD: .6, snoutTaper: .75, muzzle: true }, parts: { ears: { kind: "small", size: .8 }, tail: "stub", feet: "paw" }, coat: { shaggy: true }, legend: [],
  // its legend (Ed, 2026-10-12: "emphasise the thing that makes that creature unusual"; Ed, 2026-10-13: the coat a long hanging
  // fleece; the legend brief: an elder, revered): a vast fleece hanging off it to the ground, a ruff, frost on its muzzle,
  // a necklace of bronze offerings with a stone at its throat
  // Ed's review (2026-10-13): less loaf: a longer neck, the head lower and smaller, a higher shoulder (levels 0 to 2; the elder is its own)
  levels: [
      { body: { len: .8, neck: .42, neckAng: -.06, hr: .33, withers: .07, chest: .44, tuck: .46 } },
      { body: { len: 0.72, legW: 1.152, neckW: 0.451, hr: 0.25, neck: .48, neckAng: -.14, withers: .1, front: 1.1, chest: 0.48, tuck: 0.5, profile: { shoulder: { w: .9, d: .95 }, ribcage: { w: .9 }, waist: { w: .74, d: .8 }, loin: { w: .82, d: .88 }, hip: { w: .86 } } } },
      { body: { chest: 0.33, tuck: 0.4, hr: .25, neck: .6, neckAng: -.22, withers: .15, front: 1.18, brisket: .06, profile: { shoulder: { w: 1.26, d: 1.26 }, ribcage: { w: 1.14, d: 1.06 }, waist: { w: .86, d: .85 }, loin: { w: .92, d: .94 }, hip: { w: 1.0, d: .98 } } } },
      { body: { bw: .44, len: 0.954, chest: 0.3, tuck: 0.38, profile: { shoulder: { w: 1.34, d: 1.28 }, ribcage: { w: 1.2, d: 1.08 }, waist: { w: .96, d: .96 }, loin: { w: 1.0 }, hip: { w: 1.08, d: 1.04 } } }, head: { frost: true }, features: [{ kind: "ruff", size: .28, count: 16 }, { kind: "worn", ear: "near" }, { kind: "scars", count: 5 }, { kind: "crown", count: 9, size: 1.6, mat: "WEB", spread: 1 }] },
    ] };
