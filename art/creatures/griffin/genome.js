// the eyrie's griffin (a journey kind: unknown-18's, mountains and glaciers): an eagle's white head, hooked gold beak and
// feathered ear tufts on a lion's tawny body, eagle's wings and talons on its forelegs, a lion's tufted tail; its legend the thing
// that makes it a griffin: wings vast as a sail, a crest of long white feathers, gold talons
export const GENOME_GRIFFIN = { id: "griffin", name: "Griffin", template: "quadruped", builder: "quad", palette: { hue: .08, sat: .5, val: .72, belly: "white", accent: [.12, .75, .95], magic: .12, flower: [226, 176, 64] }, body: { hgt: 1.5, len: .72, chest: .55, tuck: .66, neck: .32, neckAng: .75, neckW: .4, hr: .25, legW: 1.05, bw: .28 }, head: { beak: 1, eyeK: .9, mask: true }, parts: { ears: { kind: "tuft", size: .9 }, tail: "tuft", feet: "paw" }, coat: { belly: true }, legend: ["mane"], texture: { kind: "feathers" },
  levels: [
    { body: { len: .5, hr: .32, legW: 1.2 }, head: { beak: .7 }, features: [{ kind: "wings", feathered: true, nub: true, size: .8, mat: "BELLY", mat2: "BODY" }] },
    { body: { len: .7 }, features: [{ kind: "wings", feathered: true, size: .8, mat: "BODY", mat2: "BELLY" }, { kind: "ruff", size: .1, count: 10, mat: "BELLY" }] },
    { features: [{ kind: "wings", feathered: true, size: 1, mat: "BODY", mat2: "BELLY" }, { kind: "ruff", size: .16, count: 14, mat: "BELLY" }, { kind: "claws", size: .16, mat: "ACCENT" }] },
    { body: { hgt: 1.6, len: .78, front: 1.12, legW: 1.15 }, head: { beak: 1.2 }, coat: { scars: 4, harness: true }, features: [
      { kind: "wings", feathered: true, size: 1.25, mat: "BODY", mat2: "BELLY" },
      { kind: "ruff", size: .3, count: 20, mat: "BELLY" },
      { kind: "claws", size: .26, mat: "FLOWER" },
    ] },
  ] };
