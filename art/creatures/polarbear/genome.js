// the pack ice's polar bear (an area recipe's, phase 4): a long-necked white bear, its coat shaggy
export const GENOME_POLARBEAR = { id: "polarbear", name: "Polar bear", template: "quadruped", builder: "quad", palette: { hue: .14, sat: .05, val: .9 }, body: { hgt: 1.25, len: .9, chest: .38, tuck: .42, neck: .34, neckAng: .02, neckW: .55, hr: .3, legW: 1.8, bw: .36 }, head: { snout: .85, snoutD: .6, snoutTaper: .75, muzzle: true }, parts: { ears: { kind: "small", size: .8 }, tail: "stub", feet: "paw" }, coat: { shaggy: true }, legend: [],
  // its legend (Ed, 2026-10-12: "emphasise the thing that makes that creature unusual"; Ed, 2026-10-13: the coat a long hanging
  // fleece; the legend brief: an elder, revered): a vast fleece hanging off it to the ground, a ruff, frost on its muzzle,
  // a necklace of bronze offerings with a stone at its throat
  levels: [
      null,
      { body: { len: 0.72, legW: 1.152, neckW: 0.451, hr: 0.27, chest: 0.48, tuck: 0.5, profile: { shoulder: { w: .84, d: .84 }, ribcage: { w: .88 }, waist: { w: .78, d: .82 }, loin: { w: .86, d: .9 }, hip: { w: .88 } } } },
      { body: { chest: 0.33, tuck: 0.4, profile: { shoulder: { w: 1.22, d: 1.18 }, ribcage: { w: 1.12 }, waist: { w: .9, d: .92 }, loin: { w: .95 }, hip: { w: 1.02 } } } },
      { body: { bw: .44, len: 0.954, chest: 0.3, tuck: 0.38, profile: { shoulder: { w: 1.34, d: 1.28 }, ribcage: { w: 1.2, d: 1.08 }, waist: { w: .96, d: .96 }, loin: { w: 1.0 }, hip: { w: 1.08, d: 1.04 } } }, head: { frost: true }, features: [{ kind: "ruff", size: .28, count: 16 }, { kind: "worn", ear: "near" }, { kind: "scars", count: 5 }, { kind: "crown", count: 9, size: 1.6, mat: "WEB", spread: 1 }] },
    ] };
