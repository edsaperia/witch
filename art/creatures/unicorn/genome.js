// the unicorn (Ed, 2026-10-13: magical creatures for the outer islands; unknown-31, the cold rainforest): a wild white horse of the
// misty old forest, one spiral horn from its brow, a nub on the foal growing longer by level; its legend's horn is light
export const GENOME_UNICORN = { id: "unicorn", name: "Unicorn", template: "quadruped", builder: "quad", palette: { hue: .6, sat: .05, val: .95, magic: .13 }, body: { hgt: 1.35, len: .7, chest: .52, tuck: .6, neck: .8, neckAng: 1.15, neckW: .32, hr: .24, legW: .66 }, head: { snout: 1.1, snoutD: .65, snoutTaper: .75, eyeK: 1.3 }, parts: { ears: { kind: "point", size: .8 }, tail: "brush", feet: "hoof", horns: "single" }, coat: { socks: .25, legMat: "BELLY", maneHair: { mat: "BODY3" } }, sizes: { horns: [.4, .7, 1, 1.7] }, legend: [],
  // its legend, the first unicorn (docs/ART-GUIDE.md 0c): ancient and great, a goat's beard and a long mane, its muzzle gone
  // grey, feathered hooves, and the bead garlands of those who came to it to be healed wound round its legs; its horn smooth
  // and glowing bright gold-white (Ed, 2026-10-13: "no spiral on the horn; instead make it glow brightly gold-white")
  levels: [null, null, null,
    { body: { hgt: 1.45, neck: .85 }, head: { frost: true, hornLight: true }, coat: { beads: true, socks: .4 }, features: [
      { kind: "ruff", size: .18, count: 10, mat: "BELLY" },
    ] }] };
