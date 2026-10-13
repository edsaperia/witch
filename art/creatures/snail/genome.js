export const GENOME_SNAIL = { id: "snail", name: "Snail", template: "squat", builder: "snail", palette: { hue: .08, sat: .45, val: .55 }, legend: [], elder: { kind: "snail" }, texture: { kind: "shell" },
  // its evolution (docs/art-guide/EVOLUTIONS.md): a near-clear one-turn shell on a baby with big stalk eyes, an amber banded young,
  // a tall ridged cone on a frilled adult, and the muddy forest's legend, the elder of its kind (Ed's elder brief): its shell the night sky,
  // full of stars, a gold spiral inlaid along its whorls, its lip chipped, old grey skin, huge slow eye stalks with glowing tips
  levels: [
    { body: { shell: { turns: 1.2, r: .26, pale: true }, stalks: 1.35 } },
    { body: { shell: { turns: 2, r: .3, bands: 3 } } },
    { body: { shell: { turns: 3, r: .32, cone: 1, ridge: true, bands: 2 }, stalks: 1.5, mantle: true, sheen: true } },
    { body: { shell: { turns: 4.2, r: .4, cone: .75, ridge: true, stars: true, runes: true, chipped: true }, stalks: 2.3, mantle: true, sheen: true, eyeGlow: true } }, // the elder: its shell the night sky and the age of the stars, a gold spiral inlaid, its lip chipped, old grey skin
  ] };
