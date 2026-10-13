// the jungle's elephant (the journey's west, unknown-28's island): the biggest creature in the game, grey and wrinkled, a trunk, fan
// ears and tusks. Its evolution: a round calf with a short trunk and huge ears, a young with its first tusks, a great tusker, and the
// legend: the elder of the elephants, an ancient matriarch, her vast trunk raised in a trumpet, her tusks long and worn, banded
// in bronze, hung with temple bells from a red saddle-cloth, a jewelled cloth on her brow and a garland of flowers
export const GENOME_ELEPHANT = { id: "elephant", name: "Elephant", template: "quadruped", builder: "quad", palette: { hue: .62, sat: .22, val: .5, flower: [168, 32, 44] }, body: { hgt: 1.9, len: .95, chest: .58, tuck: .62, neck: .2, neckAng: .15, neckW: .75, hr: .5, legW: 2.1, bw: .3, back: "arch", front: 1.05 }, head: { snout: .3, snoutD: .95, trunk: { len: 1, curl: .5 }, eyeK: .65 }, parts: { ears: { kind: "fan", size: 1 }, tail: "thin", feet: "paw", tusks: true }, texture: { kind: "smooth" }, legend: ["moss"],
  levels: [
    { body: { len: .72, hr: .56, legW: 2.3, chest: .5, tuck: .54 }, head: { trunk: { len: .6, curl: .3 } }, parts: { ears: { kind: "fan", size: 1.15 } } },
    { head: { tuskSize: .6, tuskCurl: .45, trunk: { len: .9, curl: .45 } } },
    { body: { hgt: 2.0 }, head: { tuskSize: 1.5, tuskCurl: .55 } },
    { body: { hgt: 2.05, legW: 2.4, bw: .33 }, head: { tuskSize: 3.2, tuskCurl: .6, tuskBands: 3, trunk: { len: 2, curl: .9, raise: 1, r: .4 } }, coat: { scars: 3 }, features: [ // (Ed, 2026-10-13, ART-GUIDE 0c: the elder of its kind, an ancient matriarch)
      { kind: "bells", count: 4, from: .25, to: .8, size: .1 },
      { kind: "headcloth", size: .7 },
      { kind: "garland", count: 16, size: .09, mat: "FLOWER", alt: "WOOD", every: 3, drop: .5, out: 1.25 },
    ] },
  ] };
