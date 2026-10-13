// the icefall's snow leopard (an area recipe's, the north-north-east's island of high glaciers): a long, low, pale smoky cat with
// rosettes, small round ears, a broad face and a very long thick tail; a fluffy cub, a lean young, a heavy adult, and the
// elder the high ice's ghost, its long ringed tail worn round its shoulders like a stole, frost-muzzled, stone beads
export const GENOME_SNOWLEOPARD = { id: "snowleopard", name: "Snow leopard", template: "quadruped", builder: "quad", palette: { hue: .12, sat: .1, val: .82, belly: "white" }, body: { hgt: .94, len: .66, chest: .6, tuck: .64, neck: .26, neckAng: .55, neckW: .44, hr: .27, legW: 1.15, pawK: 1.35, tailK: 1.35 }, head: { snout: .48, snoutD: .78, snoutTaper: .8, cheeks: true, whiskers: true }, parts: { ears: { kind: "round", size: .7 }, tail: "banner", feet: "paw" }, coat: { belly: true, spots: true }, texture: { kind: "fur", size: 2 },
  levels: [
    { body: { len: .5, chest: .58, hr: .31, tailK: 1 }, parts: { ears: { kind: "round", size: .95 }, tail: "bushy" } },
    { body: { len: .66, legW: 1.05 } },
    { body: { len: .7, legW: 1.2 } },
    // the elder of the snow leopards (docs/ART-GUIDE.md 0c): the high ice's ghost, its coat thick and pale as fresh snow, its
    // tail grown so long it wraps round it like a scarf, a grizzled muzzle, offerings of stone beads round its legs
    { body: { len: .72, legW: 1.25, neckAng: .5, tailK: 1 }, palette: { val: .9, sat: .07 }, head: { frost: true }, parts: { tail: "scarf" }, coat: { beads: true }, features: [
      { kind: "ruff", size: .3, count: 20, mat: "BELLY" },
    ] },
  ] };
