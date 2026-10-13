export const GENOME_FOX = { id: "fox", name: "Fox", template: "quadruped", builder: "quad", palette: { hue: .06, sat: .8, val: .9, belly: "white", flower: [190, 40, 34] }, body: { hgt: .8, len: .62, chest: .4, tuck: .5, neck: .3, neckAng: .7, neckW: .32, hr: .24, legW: .9 , profile: { shoulder: { w: 1.1, d: 1.05 }, ribcage: { w: 1.02 }, waist: { w: .75, d: .85 }, loin: { w: .82, d: .92 }, hip: { w: .9 } } }, head: { snout: 1.05, snoutD: .5, snoutTaper: .6 }, parts: { ears: { kind: "point", size: 1.35 }, tail: "bushy", feet: "paw" }, coat: { belly: true, socks: .3 }, legend: ["tails"],
  // its evolution (docs/art-guide/EVOLUTIONS.md): a fluffy round kit with huge ears, a slim long-legged young with a full brush,
  // an adult with a ruff and a second, smaller tail (the first sign of the kitsune), and the shrine's legend, the elder of its kind
  // (Ed's brief, docs/ART-GUIDE.md 0c): the old shrine fox, nine soft tails tipped silver-white with the years, a grizzled muzzle
  // and a bitten ear, a red shrine rope at its throat with a bell, rings in its ears and stone prayer beads on its legs
  levels: [
    { body: { len: .5, chest: .36, tuck: .42, hr: .27 }, head: { snout: .75 }, parts: { ears: { kind: "point", size: 1.85 }, tail: "puff" }, coat: { socks: .12 } },
    { body: { len: .72, chest: .46, tuck: .56, legW: .8, neckW: .28 }, head: { snout: 1.25, snoutTaper: .5 } },
    { body: { len: .68, legW: .95 }, head: { snout: 1.15 }, features: [{ kind: "ruff", size: .16, count: 12 }, { kind: "tails", count: 2, length: .75 }] },
    { body: { len: .7, legW: 1, neckAng: .6 }, head: { snout: 1.15, mask: true }, coat: { socks: .3, beads: true }, features: [
      { kind: "ruff", size: .24, count: 16 },
      { kind: "tails", count: 9, length: 1.05, spread: .42, tip: "BELLY", replace: true, width: 1.1 },
      { kind: "grizzle", amount: .6 }, { kind: "worn", ear: "near" }, { kind: "torc", mat: "FLOWER", size: .2 }, // (a red rope, as round a shrine's fox)
      { kind: "earrings", which: "both" }, { kind: "bells", at: "throat", size: .13 }, // the elder kit: a shrine fox's rings in its ears and a bell at its throat
    ] },
  ] };
