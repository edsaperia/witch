// the misty terraces' red panda (Ed, 2026-10-12: "a few more animals"; its island to the east-north-east, the mountains): rusty
// red, a white mask and ear rims, dark legs, a thick ringed tail
export const GENOME_REDPANDA = { id: "redpanda", name: "Red panda", template: "quadruped", builder: "quad", palette: { hue: .03, sat: .8, val: .62, belly: "white" }, body: { hgt: .62, len: .6, chest: .3, tuck: .36, neck: .2, neckAng: .6, neckW: .42, hr: .32, legW: .9, back: "arch" }, head: { snout: .45, snoutD: .7, snoutTaper: .75, mask: true, whiskers: true, eyeK: 1.4 }, parts: { ears: { kind: "round", size: 1.2 }, tail: "panda", feet: "paw" }, coat: { legMat: "BODY3" }, legend: [],
  // its legend, the elder of the red pandas (docs/ART-GUIDE.md 0c): an old mountain sage, big and round, its whiskers and
  // muzzle gone white, a long pale ruff like a beard, its ringed tail heavier, the long claws of a life in the trees, and
  // prayer beads wound round its legs
  levels: [null, null, null,
    { body: { hgt: .72, len: .66, chest: .32 }, head: { frost: true }, coat: { beads: true, socks: .3 }, features: [
      { kind: "ruff", size: .24, count: 16, mat: "BELLY" },
      { kind: "claws", size: .14 },
    ] }] };
