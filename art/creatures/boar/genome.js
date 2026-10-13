export const GENOME_BOAR = { id: "boar", name: "Boar", template: "quadruped", builder: "quad", palette: { hue: .07, sat: .62, val: .5 }, body: { len: .72, chest: .38, tuck: .5, neck: .2, neckAng: -.2, neckW: .55, hr: .27, legW: .9, back: "hump", front: 1.18, humpK: 1.6 }, head: { snout: 1.25, snoutD: .62, snoutTaper: .55, disc: true }, parts: { ears: { kind: "small", size: .8 }, tail: "thin", feet: "hoof", tusks: true }, coat: { ridge: true }, texture: { kind: "bristles" },
  // its evolution (the pilot of the evolution kit): a round, stubby, banded piglet; the young as it is; a heavy-fronted adult with a
  // shoulder hump, its head low and its tusks curving; a massive, top-heavy legend charging head-down with huge curling tusks, pale
  // flames off their tips and a dark shaggy mane along its spine and belly
  levels: [
    { body: { len: .6, chest: .3, tuck: .34, back: "arch" }, coat: { ridge: false, bands: { n: 2, mat: "BELLY" } } },
    null,
    { body: { humpK: 2.4, neckAng: -.42, front: 1.25, legW: 1.0, hgt: 1.05 }, head: { tuskSize: 1.15, tuskCurl: .75, horn: { length: .75, r: .3, curl: .12, twist: .5, ridges: 2, segs: 6, out: .3, mat2: "NOSE" } }, parts: { horns: "twist" }, coat: { ridge: false }, features: [{ kind: "mane", from: .45, to: .98, height: .14, count: 10, lean: .45 }] },
    { body: { humpK: 2.8, neckAng: -.45, front: 1.36, legW: 1.45, chest: .3 }, head: { tuskSize: 1.7, tuskCurl: 1.25, eyeGlow: true, horn: { length: 5.2, r: .46, curl: .9, twist: 2.5, ridges: 3, segs: 24, out: .3, tip: "MAGIC2", mat2: "NOSE" } }, parts: { horns: "twist" }, coat: { ridge: false }, features: [ // (Ed, 2026-10-05: head down to charge, a battering ram; its eye glints under the hump, flames rise over it)
      { kind: "mane", from: .15, to: 1, height: .3, count: 18, lean: .55 },
      { kind: "mane", belly: true, from: .3, to: .95, height: .16, count: 10, lean: .4 },
      { kind: "wisps", at: "tusks", size: .3 },
      { kind: "wisps", at: "horns", size: .32 },
      { kind: "eyeglint", size: .06 },
      { kind: "furrow" },
      { kind: "scars", count: 3, from: .35 },
    ] },
  ] };
