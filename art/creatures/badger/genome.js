export const GENOME_BADGER = { id: "badger", name: "Badger", template: "quadruped", builder: "quad", palette: { hue: .65, sat: .08, val: .45 }, body: { stance: "flat", hgt: .5, len: .82, chest: .18, tuck: .2, neck: .16, neckAng: 0, neckW: .55, hr: .26, legW: 1.4, bw: .38 }, head: { snout: 1.05, snoutD: .5, snoutTaper: .5, face: "badger" }, parts: { ears: { kind: "round", size: .7 }, tail: "stub", feet: "paw" }, coat: { shaggy: true, legMat: "BODY3" }, legend: [], elder: { kind: "badger", eye: "EYE" },
  // its evolution (docs/art-guide/EVOLUTIONS.md): a round fluffy cub that's all face, a low wedge of a young, a broad shaggy-plated
  // digger with pale claws, and the moor's legend, the elder of its kind (art/elders.js; Ed's elder brief): grizzled and scarred, its
  // stripes running on down its back as chalk hill-figure lines, a bronze torc
  levels: [
    { body: { len: .58, chest: .22, tuck: .24, hr: .3, legW: 1.1 }, head: { snout: .8, blaze: 1.6 } },
    { body: { len: .9, chest: .18, tuck: .2, neckAng: 0 }, head: { snout: 1.2, snoutTaper: .45, blaze: 1.3 } },
    { body: { len: 1.6, hgt: .55, bw: .62, chest: .04, tuck: .05, legW: 1.7, hr: .3, neckAng: .12 }, head: { blaze: 1.8 }, features: [{ kind: "mane", from: .1, to: .85, height: .04, count: 16, lean: .95 }, { kind: "claws", size: .14 }] }, // (Ed, 2026-10-07: low, wide and flat-backed on short legs, not a bear: art lint)
    { body: { len: .95, bw: .5, chest: .14, tuck: .16, legW: 1.8, neckAng: .25, hr: .3 }, head: { blaze: 1.6 }, features: [{ kind: "mane", from: .05, to: .9, height: .08, count: 20, lean: 1 }, { kind: "claws", size: .24 }] }, // the elder (art/elders.js): grizzled, scarred, its stripes running down its back as chalk hill-figure lines, a bronze torc
  ] };
