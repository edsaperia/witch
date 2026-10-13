// the jungle's tiger (the journey's west, unknown-11's island): a big striped cat, low and long, heavy in the shoulder. Its evolution:
// a round, big-pawed cub with soft broad stripes, a lanky young, a heavy-shouldered adult with a ruff of cheek fur, and the legend:
// the elder of the tigers, huge and grizzled, its stripes worn thin with age, old scars raked across its flanks and brow, a white
// ruff, and a garland of red flowers and bronze beads round its neck, the jungle's offerings
export const GENOME_TIGER = { id: "tiger", name: "Tiger", template: "quadruped", builder: "quad", palette: { hue: .065, sat: .85, val: .9, belly: "white", flower: [214, 48, 58] }, body: { hgt: 1.1, len: .86, chest: .5, tuck: .56, neck: .28, neckAng: .5, neckW: .52, hr: .3, legW: 1.3, bw: .32 , profile: { shoulder: { w: 1.18, d: 1.05 }, ribcage: { w: 1.08 }, waist: { w: .8, d: .9 }, loin: { w: .86, d: .95 }, hip: { w: .96 } } , spine: { ribcage: -.04, waist: -.048, loin: -.038, hip: -.015 } }, head: { snout: .55, snoutD: .78, snoutTaper: .8, cheeks: true, whiskers: true, muzzle: true }, parts: { ears: { kind: "round", size: .75 }, tail: "tiger", feet: "paw" }, coat: { belly: true, stripes: { n: 11, w: .3 } }, legend: ["mane"],
  levels: [
    { body: { len: .6, hr: .34, legW: 1.55 }, coat: { stripes: { n: 7, w: .28, legN: 4 } }, parts: { ears: { kind: "round", size: 1.05 } } },
    { body: { len: .84, legW: 1.15, chest: .54 } },
    { body: { front: 1.12, legW: 1.45, bw: .35, hgt: 1.15 }, features: [{ kind: "ruff", size: .15, count: 12 }] },
    { body: { front: 1.22, legW: 1.6, bw: .37, len: .95, hgt: 1.25 }, head: { muzzle: true }, coat: { stripes: { n: 9, w: .2, wave: .35 }, scars: 4 }, features: [ // (Ed, 2026-10-13, ART-GUIDE 0c: the elder of its kind)
      { kind: "ruff", size: .3, count: 18, mat: "BELLY" },
      { kind: "garland", count: 18, size: .1, mat: "FLOWER", alt: "WOOD", every: 4, drop: .6, out: 1.45 },
      { kind: "claws", size: .13, mat: "BODY3" },
    ] },
  ] };
