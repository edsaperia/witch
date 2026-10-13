// the mossy dell's roe deer (an area recipe's): a small, slight deer, all ears and eyes, a white rump and a black nose; the buck's
// short three-tined antlers (its own antler curve, a third of the stag's), the fawn dappled
export const GENOME_ROE = { id: "roe", name: "Roe deer", template: "quadruped", builder: "quad", palette: { hue: .055, sat: .62, val: .66, belly: "white" }, body: { hgt: 1.0, len: .52, chest: .36, tuck: .54, neck: .42, neckAng: .9, neckW: .28, hr: .23, legW: .55 }, head: { snout: .8, snoutD: .55, snoutTaper: .6, eyeK: 1.35 }, parts: { ears: { kind: "big", size: 1.15 }, tail: "bob", feet: "hoof", antlers: "branch" }, coat: { belly: true, spots: "young", rump: true }, sizes: { antlers: [0, .3, .42, .95] }, legend: [],
  // its legend, the elder of the roe (docs/ART-GUIDE.md 0c): an ancient buck grown tall and grey-muzzled, its antlers the old
  // bucks' "perruque", heavy, many-tined and furred with moss, a pale winter ruff at its throat, moss on its flanks from lying
  // out for ages in the dell, and bead offerings bound round its legs
  levels: [null, null, null,
    { body: { hgt: 1.15, neck: .5, chest: .4 }, head: { frost: true }, coat: { beads: true, socks: .3 }, features: [
      { kind: "ruff", size: .16, count: 12, mat: "BELLY" },
      { kind: "moss", count: 9, size: .1 },
    ] }] };
