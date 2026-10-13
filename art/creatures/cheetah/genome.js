// the plains' cheetah (a journey kind: unknown-24's, the hot south): built to sprint, a greyhound of a cat. A very deep, narrow
// chest, a waist tucked up tight, its spine arched, long thin legs, a small round head with small ears, solid black spots, black
// tear lines and a long heavy ringed tail, its rudder; the cub in its silver mantle; its legend the wind's: longer and leaner still,
// its tears lit, wind streaming off its back
export const GENOME_CHEETAH = { id: "cheetah", name: "Cheetah", template: "quadruped", builder: "quad", palette: { hue: .1, sat: .6, val: .84, belly: "white", magic: .13 }, body: { hgt: 1.4, len: .66, chest: .47, tuck: .86, neck: .36, neckAng: .5, neckW: .24, hr: .17, legW: .58, bw: .17, back: "arch", archK: 1.8, profile: { shoulder: { w: 1.25, d: 1.08 }, ribcage: { w: 1.1 }, waist: { w: .68, d: .8 }, loin: { w: .78, d: .9 }, hip: { w: .95 } } , spine: { ribcage: -.04, waist: -.05, loin: -.045, hip: -.015 } }, head: { snout: .4, snoutD: .75, snoutTaper: .85, whiskers: true, tears: true }, parts: { ears: { kind: "round", size: .5 }, tail: "ringed", feet: "paw" }, coat: { belly: true, spots: "solid" }, legend: ["mane"], texture: { kind: "fur", size: 3, lumps: .0015 },
  levels: [
    { body: { len: .5, chest: .42, tuck: .5, hr: .25, legW: .9, bw: .22, archK: .6 }, head: { snout: .35 }, parts: { ears: { kind: "round", size: .7 } }, features: [{ kind: "mane", from: .15, to: 1, height: .1, count: 14, lean: .7, mat: "BELLY" }] },
    { body: { len: .64, chest: .46, tuck: .8, legW: .6, archK: 1.4 }, features: [{ kind: "mane", from: .6, to: 1, height: .05, count: 6, lean: .8, mat: "BELLY" }] },
    null,
    { body: { len: .72, legW: .62, tuck: .9, hgt: 1.5, archK: 2.2 }, head: { snout: .45, eyeGlow: true, tears: "glow" }, features: [
      { kind: "mane", from: .2, to: .95, height: .05, count: 14, lean: .9, mat: "BODY" },
      { kind: "wisps", at: "mane", size: .26, count: 9, from: .05, to: .95, mat: "MAGIC2", lift: .1 },
    ] },
  ] };
