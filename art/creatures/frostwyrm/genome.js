// the frost cave's frost wyrm (a journey kind: unknown-17's, mountains and glaciers): a wingless ice dragon, long and low, a
// long neck and a crocodile's snout, swept-back horns, a crest of ice-blue plates and a long tapering tail; its legend the thing
// that makes it a wyrm: a body and tail so long it winds like a river of ice, great horns and a beard of icicles
export const GENOME_FROSTWYRM = { id: "frostwyrm", name: "Frost wyrm", template: "quadruped", builder: "quad", palette: { hue: .6, sat: .55, val: .9, belly: "white", accent: [.55, .1, .98], magic: .52, flower: [232, 184, 72] }, body: { hgt: 1.4, len: .95, chest: .52, tuck: .56, neck: .7, neckAng: .95, neckW: .3, hr: .21, legW: 1.0, bw: .27 }, head: { snout: 1.3, snoutD: .5, snoutTaper: .6, eyeK: .8, horn: { length: 3, curl: .7, twist: 1, back: .25, up: 0, r: .3, out: .2 } }, parts: { ears: { kind: "none" }, tail: "otter", feet: "paw", horns: "twist" }, coat: { belly: true, ridge: 1.4, ridgeMat: "BELLY" }, legend: ["mane"], texture: { kind: "scales" },
  levels: [
    { body: { len: .7, neck: .4, hr: .3, legW: 1.2 }, head: { snout: .8, horn: { length: 1.4, curl: .2, twist: 1, r: .28 } }, coat: { ridge: .8 } },
    { body: { len: 1.0, neck: .55 }, head: { snout: 1.2, horn: { length: 2.4, curl: .3, twist: 1, r: .3 } } },
    { features: [{ kind: "claws", size: .14 }] },
    { body: { len: 1.2, hgt: 1.6, neck: .8, legW: 1.2, front: 1.08 }, head: { snout: 1.45, frost: true, hornBroken: true, horn: { length: 4.6, curl: .8, twist: 1.5, back: .3, up: 0, r: .4, out: .25 } }, coat: { scars: 6, hoard: true }, features: [
      { kind: "ruff", size: .34, count: 22, mat: "BELLY" }, // a beard of icicles grown over aeons
      { kind: "claws", size: .24 },
    ] },
  ] };
