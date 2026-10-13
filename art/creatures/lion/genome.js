// the savanna's lion (a journey kind: unknown-08's, the hot south): a big tawny cat, a spotted cub, a lean young with a fuzz of mane,
// the adult's dark mane; its legend the sun's: a mane of flame-locks, its eyes lit, sun-fire rising off it
export const GENOME_LION = { id: "lion", name: "Lion", template: "quadruped", builder: "quad", palette: { hue: .075, sat: .58, val: .66, belly: "white", magic: .09 }, body: { hgt: 1.4, len: .78, chest: .6, tuck: .7, neck: .3, neckAng: .55, neckW: .44, hr: .25, legW: 1.05, bw: .27 , profile: { shoulder: { w: 1.2, d: 1.06 }, ribcage: { w: 1.08 }, waist: { w: .78, d: .88 }, loin: { w: .85, d: .94 }, hip: { w: .95 } } , spine: { ribcage: -.04, waist: -.05, loin: -.04, hip: -.015 } }, head: { snout: .85, snoutD: .78, snoutTaper: .8, cheeks: true, whiskers: true }, parts: { ears: { kind: "round", size: .7 }, tail: "tuft", feet: "paw" }, coat: { belly: true }, legend: ["mane"],
  levels: [
    { body: { len: .5, chest: .4, tuck: .45, hr: .3, legW: 1.3 }, head: { snout: .45 }, parts: { ears: { kind: "round", size: 1 } }, coat: { spots: true } },
    { body: { len: .74, chest: .52, tuck: .6, legW: 1, neckW: .4 }, head: { snout: .65 }, features: [{ kind: "ruff", size: .1, count: 10, mat: "BODY2" }] },
    { body: { front: 1.1, legW: 1.2, bw: .32, hgt: 1.35 }, head: { snout: .65 }, features: [{ kind: "ruff", size: .3, count: 22, mat: "BODY3" }, { kind: "mane", from: .7, to: 1, height: .2, count: 8, lean: .55, mat: "BODY3" }] },
    { body: { front: 1.2, humpK: .6, legW: 1.35, bw: .34, len: .74 }, head: { snout: .7, eyeGlow: true }, features: [
      { kind: "ruff", size: .42, count: 28, mat: "BODY3" },
      { kind: "mane", from: .6, to: 1, height: .14, count: 10, lean: .7, mat: "BODY3" },
      { kind: "wisps", at: "mane", size: .28, count: 8, from: .5, to: 1, mat: "MAGIC2", lift: .3 },
    ] },
  ] };
