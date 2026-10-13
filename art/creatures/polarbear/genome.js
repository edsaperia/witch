// the pack ice's polar bear (an area recipe's, phase 4): a long-necked white bear, its coat shaggy
export const GENOME_POLARBEAR = { id: "polarbear", name: "Polar bear", template: "quadruped", builder: "quad", palette: { hue: .14, sat: .05, val: .9 }, body: { hgt: 1.25, len: .9, chest: .38, tuck: .42, neck: .34, neckAng: .02, neckW: .55, hr: .3, legW: 1.8, bw: .36 }, head: { snout: .85, snoutD: .6, snoutTaper: .75, muzzle: true }, parts: { ears: { kind: "small", size: .8 }, tail: "stub", feet: "paw" }, coat: { shaggy: true }, legend: [],
  // its legend (Ed, 2026-10-12: "emphasise the thing that makes that creature unusual"; Ed, 2026-10-13: the coat a long hanging
  // fleece; the legend brief: an elder, revered): a vast fleece hanging off it to the ground, a ruff, frost on its muzzle,
  // a necklace of bronze offerings with a stone at its throat
  levels: [null, null, null, { body: { bw: .44 }, head: { frost: true }, features: [{ kind: "mane", belly: true, from: 0, to: 1, height: .42, count: 40, lean: .25, mat: "BELLY" }, { kind: "ruff", size: .28, count: 16 }, { kind: "beads", count: 11, size: .055, mat: "WOOD", pendant: "STONE" }] }] };
