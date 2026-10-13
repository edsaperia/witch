// the snowfield's arctic fox (an area recipe's, the north's cold island): a small, round, white fox, short-muzzled and
// short-eared against the cold, a huge thick brush; a grey-brown kit, a white young, a ruffed adult, and the elder an old white
// fox of the long winter, shaggy, frost-muzzled, one vast tufted brush swept low, stone beads round its legs
export const GENOME_ARCTICFOX = { id: "arcticfox", name: "Arctic fox", template: "quadruped", builder: "quad", palette: { hue: .59, sat: .16, val: .96, belly: "white" }, body: { hgt: .68, len: .56, chest: .46, tuck: .54, neck: .24, neckAng: .62, neckW: .4, hr: .27, legW: 1 }, head: { snout: .78, snoutD: .58, snoutTaper: .7 }, parts: { ears: { kind: "point", size: .8 }, tail: "bushy", feet: "paw" }, coat: { belly: true }, legend: ["crystals"], texture: { kind: "fur", size: 2 },
  levels: [
    { body: { len: .46, chest: .42, tuck: .46, hr: .31 }, head: { snout: .58 }, parts: { ears: { kind: "point", size: 1.05 }, tail: "puff" }, coat: { saddle: true } },
    { body: { len: .58, legW: .9 } },
    { body: { len: .6 }, features: [{ kind: "ruff", size: .2, count: 14 }] },
    // the elder of the white foxes (docs/ART-GUIDE.md 0c): the long winter's own, its coat gone deep and shaggy, one vast brush
    // swept low behind it, its muzzle grizzled with frost, offerings of stone beads round its legs
    { body: { len: .64, legW: 1.1, neckAng: .55, hgt: .72 }, head: { frost: true }, parts: { tail: "plume" }, coat: { beads: true }, features: [
      { kind: "ruff", size: .42, count: 26, mat: "BELLY" },
    ] },
  ] };
