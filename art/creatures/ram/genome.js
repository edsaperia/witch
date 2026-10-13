export const GENOME_RAM = { id: "ram", name: "Ram", template: "quadruped", builder: "quad", palette: { hue: .1, sat: .12, val: .88, flower: [196, 36, 52] }, body: { hgt: .95, len: .62, chest: .44, tuck: .48, neck: .2, neckAng: .9, neckW: .5, hr: .25, legW: .62 }, head: { snout: .85, snoutD: .75, snoutTaper: .8, face: "dark" }, parts: { ears: { kind: "small", size: .7 }, tail: "stub", feet: "hoof", horns: "curl" }, coat: { wool: true }, legend: ["hornsGlow"] , texture: { kind: "fur", stretch: 1.2, size: 3 },
  // its evolution (docs/art-guide/EVOLUTIONS.md): a curly white lamb with big ears and no horns, a young with its first horn buds,
  // an adult with heavy dark ridged horns in a full curl and a fleece ruff, and the tangly forest's legend: bronze horns in a double
  // spiral with thorns along their ridges, brambles and berries woven through fleece that hangs in shaggy locks
  levels: [
    { body: { len: .5, hr: .29 }, parts: { ears: { kind: "small", size: 1.25 }, horns: false }, coat: { legMat: "BODY3" } },
    { parts: { horns: "twist" }, head: { horn: { length: 1.9, r: .42, curl: 1.1, twist: 0, ridges: 2, segs: 8, out: .55, ease: 1, mat: "BODY3" } } },
    { body: { bw: .36, legW: .8 }, coat: { legMat: "BODY3" }, parts: { horns: "twist" }, head: { horn: { length: 3.8, r: .62, curl: 1.75, twist: 0, ridges: 1, segs: 26, out: .7, ease: 1, tighten: .6, mat: "BODY3" } }, features: [{ kind: "ruff", size: .2, count: 14, mat: "BODY" }] },
    { body: { bw: .4, legW: 1.2 }, coat: { legMat: "BODY3" }, parts: { horns: "twist" }, head: { horn: { length: 6, r: .7, curl: 3.3, twist: 0, ridges: 1, segs: 44, out: .8, ease: 1, tighten: .72, mat: "WOOD", thorns: 9, back: .4, wide: .15 } }, features: [
      { kind: "ruff", size: .28, count: 18, mat: "BODY" },
      { kind: "mane", belly: true, from: .1, to: .95, height: .2, count: 14, lean: .2, mat: "BODY" },
      { kind: "brambles", count: 4 },
    ] },
  ] };
