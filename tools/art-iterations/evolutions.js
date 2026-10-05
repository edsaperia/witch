// Evolved designs (docs/art-guide/EVOLUTIONS.md): species drawn with an evolution per level, as genome records the ladder
// can show beside today's (tools/art-iterations/ladder.mjs, its last band). Data only: the game's genomes are unchanged.
// levels: what changes at a level beyond the size curves (art/genome/index.js); features: a level's own extra parts.
export const EVOLVED = {
  // The boar, after Ed's reference: a round, stubby piglet; a hump-shouldered, heavy-fronted adult with its head low and big
  // curved tusks; a massive, top-heavy legend, head down to charge, its tusks sweeping up past its head, pale wisps rising
  // along a shaggy bristle mane.
  boar: { id: "boarEvolved", name: "Boar (evolved)", template: "quadruped", builder: "quad",
    palette: { hue: .06, sat: .78, val: .62, over: { BELLY: [.1, .28, .98], MAGIC: [.11, .3, 1], MAGIC2: [.09, .55, 1], ACCENT: [.12, .08, 1] } },
    body: { len: .72, chest: .34, tuck: .42, neck: .2, neckAng: -.15, neckW: .55, hr: .27, legW: 1.15, back: "hump" },
    head: { snout: 1.25, snoutD: .62, snoutTaper: .55, disc: true, muzzle: true },
    parts: { ears: { kind: "small", size: .8 }, tail: "thin", feet: "hoof", tusks: true }, coat: { ridge: true },
    sizes: { tusks: [0, .85, 1.45, 1.85], head: [2.1, 1, 1.15, 1.2], legK: [.5, 1, .9, .9], len: [.85, 1.02, 1.06, 1.14] },
    levels: {
      0: { body: { len: .5, chest: .46, tuck: .5, neck: .08, neckAng: .3, hr: .31, legW: 1.45, back: "arch", hump: .04 }, head: { snout: .9 }, coat: { ridge: false, saddle: true }, parts: { tusks: false, ears: { kind: "small", size: 1.1 } } },
      1: { body: { hump: .14, neckAng: -.25 } },
      2: { body: { hump: .24, neck: .34, neckAng: -.28, chest: .2, neckW: .72, legW: 1.55, len: .74 }, head: { snout: 1.15, snoutD: .7 } },
      3: { body: { hump: .32, neck: .42, neckAng: -.4, chest: .14, tuck: .3, neckW: .8, legW: 1.8, len: .82 }, head: { snout: 1.1, snoutD: .75 }, coat: { features: ["mane"] } },
    },
    legend: ["mane"] },
};
