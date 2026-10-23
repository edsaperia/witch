// the hot lands' sand cat (Ed, 2026-10-12: a wildcat hunting in the long grass; the biome roster, 2026-10-23: now the desert's):
// small and stocky, pale sand, a broad flat head under big low-set ears, faint bars only, a black-ringed tail; its legend crowned
export const GENOME_CAT = { id: "cat", name: "Sand cat", template: "quadruped", builder: "quad", palette: { hue: .1, sat: .32, val: .78, belly: "white", magic: .13 }, body: { hgt: .7, len: .68, chest: .4, tuck: .48, neck: .2, neckAng: .75, neckW: .36, hr: .32, legW: .58 }, head: { snout: .34, snoutD: .66, snoutTaper: .85, cheeks: true, whiskers: true, eyeK: 1.45, skullZ: 1.15, skullY: .9 }, parts: { ears: { kind: "point", size: 1.7 }, tail: "stoat", feet: "paw" }, coat: { belly: true, tabby: { n: 9, w: .14, mat: "BODY2" }, socks: .2 }, legend: [],
  // its legend, the elder of the wildcats (docs/ART-GUIDE.md 0c): the meadow's old queen, big and broad, a lion's ruff of
  // cheek fur gone pale with age, long claws, a collar of beads round each leg, and her crown
  levels: [
      null,
      { body: { len: 0.612, legW: 0.476, neckW: 0.324, chest: 0.45, tuck: 0.52, profile: { shoulder: { w: .9, d: .9 }, ribcage: { w: .92 }, waist: { w: .8, d: .85 }, loin: { w: .88, d: .92 }, hip: { w: .92 } } } },
      { body: { chest: 0.37, profile: { shoulder: { w: 1.2, d: 1.12 }, ribcage: { w: 1.08 }, waist: { w: .8, d: .88 }, loin: { w: .88, d: .95 }, hip: { w: .95 } } } },
      { body: { hgt: .8, len: .72, chest: .44 }, head: { frost: true }, coat: { beads: true, socks: .3 }, features: ["crown",
      { kind: "ruff", size: .32, count: 18, mat: "BELLY" },
      { kind: "claws", size: .16 },
    ] },
    ] };
