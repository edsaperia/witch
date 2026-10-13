// the meadow's wildcat (Ed, 2026-10-12: the glowworm replaced by a cat hunting in the long grass): a stocky striped tabby, a broad
// round head, a thick blunt tail; its legend crowned
export const GENOME_CAT = { id: "cat", name: "Wildcat", template: "quadruped", builder: "quad", palette: { hue: .08, sat: .1, val: .52, belly: "white", magic: .13 }, body: { hgt: .7, len: .68, chest: .4, tuck: .48, neck: .2, neckAng: .75, neckW: .36, hr: .32, legW: .58 }, head: { snout: .38, snoutD: .7, snoutTaper: .85, cheeks: true, whiskers: true, eyeK: 1.45 }, parts: { ears: { kind: "point", size: 1.3 }, tail: "stoat", feet: "paw" }, coat: { belly: true, tabby: { n: 13, w: .3 }, socks: .2 }, legend: [],
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
