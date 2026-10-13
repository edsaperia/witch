// the jungle river's black jaguar (the journey's west, unknown-29's island): a melanistic jaguar, stocky and short-legged with a big
// head, black with rosettes a shade darker that show only in the light, gold-green eyes. Its evolution: a round, big-headed cub
// whose rosettes still show, a lithe young, a heavy-jawed adult, and the legend: a huge head and a crushing jaw, its hidden rosettes
// surfacing black on black in the moonlight, rippling like light on water as it moves; the elder of its kind, its muzzle grey, old
// scars on its flanks and brow, a collar of jade and bronze beads
export const GENOME_JAGUAR = { id: "jaguar", name: "Black jaguar", template: "quadruped", builder: "quad", palette: { hue: .7, sat: .16, val: .3, flower: [60, 176, 132] }, body: { hgt: .95, len: .84, chest: .46, tuck: .52, neck: .26, neckAng: .5, neckW: .48, hr: .29, legW: 1.25, bw: .3 , profile: { shoulder: { w: 1.18, d: 1.05 }, ribcage: { w: 1.06 }, waist: { w: .8, d: .9 }, loin: { w: .86, d: .95 }, hip: { w: .96 } } , spine: { ribcage: -.04, waist: -.048, loin: -.038, hip: -.015 } }, head: { snout: .5, snoutD: .8, snoutTaper: .82, cheeks: true, whiskers: true, eyeK: 1.1 }, parts: { ears: { kind: "round", size: .7 }, tail: "jaguar", feet: "paw" }, coat: { rosettes: { k: 8, density: .75 } }, legend: ["mane"],
  levels: [
    { body: { len: .6, hr: .33, legW: 1.45 }, coat: { rosettes: { k: 6, density: .8 } }, parts: { ears: { kind: "round", size: .95 } } },
    { body: { len: .86, legW: 1.1, chest: .5 } },
    { body: { front: 1.08, legW: 1.4, bw: .33, hgt: .95, hr: .4, len: .74, chest: .42 }, head: { snoutD: .88 } }, // (a big head on a short, deep body: tells apart from the tiger at game size),
    { body: { front: 1.15, legW: 1.55, bw: .34, len: .9, hgt: 1.08, hr: .4 }, head: { snoutD: 1.15, snoutTaper: .95, jaw: 1.5, muzzle: true }, coat: { rosettes: { k: 8, density: .85, mat: "BODYL", ripple: .18 }, scars: 3 }, features: [
      { kind: "garland", count: 14, size: .11, mat: "FLOWER", alt: "WOOD", every: 4, drop: .3, out: 1.7 },
      { kind: "claws", size: .14, mat: "BODY3" },
    ] }, // (Ed, 2026-10-13: its huge head and crushing jaw; the hidden rosettes, black on black, surfacing in the moonlight and rippling like light on water)
  ] };
