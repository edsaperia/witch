export const GENOME_WOLF = { id: "wolf", name: "Wolf", template: "quadruped", builder: "quad", palette: { hue: .08, sat: .2, val: .72 }, body: { hgt: 1.12, len: .66, chest: .46, tuck: .66, neck: .34, neckAng: .62, neckW: .4, hr: .25, legW: 1.05 }, head: { snout: .9, snoutD: .65 }, parts: { ears: { kind: "point", size: 1.05 }, tail: "brush", feet: "paw" }, coat: { belly: true, saddle: true }, legend: ["wings", "mane"],
  // its evolution (docs/art-guide/EVOLUTIONS.md): a round pup with big paws and floppy ears, a lanky young, an adult with a heavy
  // shaggy mane over its shoulders, and the legend: shoulders twice its hips, a mane of spiky locks, pale spirit-fire along its
  // spine, glowing eyes and frost on its muzzle
  levels: [
    { body: { len: .5, hr: .29, legW: 1.5 }, head: { snout: .6 }, parts: { ears: { kind: "small", size: 1.2 }, tail: "stub" } },
    { body: { len: .74, chest: .52, tuck: .72, legW: .95, neckW: .34 }, head: { snout: 1 } },
    { body: { front: 1.08, legW: 1.05, bw: .25, hgt: 1.2, tuck: .72 }, head: { snout: 1.05 }, features: [{ kind: "mane", from: .6, to: 1, height: .26, count: 14, lean: .5, mat: "BODY2" }] },
    { body: { front: 1.22, humpK: .8, back: "hump", legW: 1.35, bw: .26, len: .72, tuck: .66 }, head: { snout: 1.1, eyeGlow: true, frost: true }, features: [ // (the elder: its howl made visible, docs/ART-GUIDE.md §0c)
      { kind: "mane", from: .55, to: 1, height: .3, count: 16, lean: .5, mat: "BODY" },
      { kind: "ruff", size: .2, count: 16, mat: "WEB" },
      { kind: "scars", count: 3, from: .35 },
      { kind: "howl", count: 3, size: .1 },
    ] },
  ] };
