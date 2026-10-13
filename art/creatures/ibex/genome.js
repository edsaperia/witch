// the crags' ibex (an area recipe's, the north-east's island of mountains and glaciers): a stocky wild goat, dark-legged and
// bearded, its horns sweeping back in long knobbled scimitars; a hornless kid, a young with short horns, an adult with great
// ridged horns, and the elder the peaks' oldest, horns vast and knobbled, bearded, lichened, stone beads
export const GENOME_IBEX = { id: "ibex", name: "Ibex", template: "quadruped", builder: "quad", palette: { hue: .08, sat: .32, val: .58, belly: "white" }, body: { hgt: .92, len: .6, chest: .5, tuck: .5, neck: .26, neckAng: .78, neckW: .48, hr: .25, legW: .8 }, head: { snout: .8, snoutD: .7, snoutTaper: .75, face: "dark" }, parts: { ears: { kind: "small", size: .8 }, tail: "stub", feet: "hoof", horns: "twist" }, coat: { belly: true, legMat: "BODY3" }, legend: ["crystals"], texture: { kind: "fur", size: 2 },
  levels: [
    { body: { len: .48, hr: .29 }, parts: { ears: { kind: "small", size: 1.2 }, horns: false } },
    { head: { horn: { length: 2, r: .4, curl: .4, twist: 0, ridges: 1, segs: 12, out: .22, ease: 1.1, mat: "BODY3" } } },
    { body: { bw: .36 }, head: { horn: { length: 3.4, r: .42, curl: .62, twist: 0, ridges: 1, segs: 22, out: .22, ease: 1.2, tighten: .1, mat: "BODY3" } } },
    // the elder of the ibex (docs/ART-GUIDE.md 0c): the peaks' oldest, its horns grown vast and knobbled with the years, a long
    // shaggy beard, lichen on its flanks like the rock it lies on, offerings of stone beads round its legs
    { body: { bw: .4, legW: 1.15 }, head: { horn: { length: 6.4, r: .58, curl: .74, twist: 0, ridges: 1, segs: 38, out: .26, ease: 1.2, tighten: .12, mat: "BODY3" } }, coat: { beads: true }, features: [
      { kind: "ruff", size: .2, count: 16, mat: "BODY" },
      { kind: "moss", count: 7, size: .085 },
    ] },
  ] };
