// Witch creature genomes (#79, stage 1): every species as data, not code. A record names its
// template (the body plan: which skeleton and which sockets it has), its builder (the 3D model
// code that draws that template, art/creatures3d.js), its palette, its proportions and its parts;
// its size levels come from its template's curves (templates.js). creatures.js reads SPECIES from
// these records (speciesOf in index.js), so editing a record changes the creature.
//   palette: hue, sat, val (its coat), belly ("white", "yellow" or its own lighter coat).
//   body (four-legged): hgt (height on screen, 1 = ordinary), len (body length, shoulder = 1),
//     chest and tuck (belly heights at the shoulder and the waist), neck, neckAng, neckW, hr (head
//     radius), bw (body width), legW (leg thickness), haunch, hindFoot, back ("hump" or "arch").
//   head: snout, snoutD (its depth), snoutTaper, face ("badger", "dark"), muzzle, cheeks, whiskers,
//     teeth, disc (a pig's nose), eyeK (eye size).
//   parts: the sockets' choices: ears { kind, size }, tail, feet, horns, antlers, tusks.
//   coat: markings: belly, saddle, spots, spotMat, socks, shaggy, wool, ridge, rump, legMat.
//   legend: what the legendary form grows (FEATURE_NAMES in creatures.js).
export const GENOMES = [
  { id: "wolf", name: "Wolf", template: "quadruped", builder: "quad", palette: { hue: .08, sat: .24, val: .56 }, body: { len: .64, chest: .42, tuck: .6, neck: .32, neckAng: .7, neckW: .42, hr: .26, legW: 1.25 }, head: { snout: .82, snoutD: .7 }, parts: { ears: { kind: "point", size: .82 }, tail: "brush", feet: "paw" }, coat: { belly: true, saddle: true }, legend: ["wings", "mane"],
    // its evolution (docs/art-guide/EVOLUTIONS.md): a round pup with big paws and floppy ears, a lanky young, an adult with a heavy
    // shaggy mane over its shoulders, and the legend: shoulders twice its hips, a mane of spiky locks, pale spirit-fire along its
    // spine, glowing eyes and frost on its muzzle
    levels: [
      { body: { len: .5, hr: .29, legW: 1.5 }, head: { snout: .6 }, parts: { ears: { kind: "small", size: 1.2 }, tail: "stub" } },
      { body: { len: .72, chest: .5, tuck: .66, legW: 1.05, neckW: .36 }, head: { snout: .95 } },
      { body: { front: 1.12, humpK: .5, back: "hump", legW: 1.25, bw: .27 }, head: { snout: 1 }, features: [{ kind: "mane", from: .45, to: 1, height: .26, count: 16, lean: .5, mat: "BODY2" }] },
      { body: { front: 1.22, humpK: .8, back: "hump", legW: 1.35, bw: .26, len: .72, tuck: .66 }, head: { snout: 1.1, eyeGlow: true, frost: true }, features: [
        { kind: "mane", from: .3, to: 1, height: .5, count: 26, lean: .35, mat: "BODY" },
        { kind: "mane", belly: true, from: .55, to: 1, height: .22, count: 10, lean: .3, mat: "BODY2" },
        { kind: "wisps", at: "mane", size: .26, count: 7, from: .05, to: .95, mat: "MAGIC2", lift: .32 },
      ] },
    ] },
  { id: "fox", name: "Fox", template: "quadruped", builder: "quad", palette: { hue: .06, sat: .8, val: .9, belly: "white" }, body: { hgt: .8, len: .62, chest: .4, tuck: .5, neck: .3, neckAng: .7, neckW: .32, hr: .24, legW: .9 }, head: { snout: 1.05, snoutD: .5, snoutTaper: .6 }, parts: { ears: { kind: "point", size: 1.35 }, tail: "bushy", feet: "paw" }, coat: { belly: true, socks: .3 }, legend: ["tails"],
    // its evolution (docs/art-guide/EVOLUTIONS.md): a fluffy round kit with huge ears, a slim long-legged young with a full brush,
    // an adult with a ruff and a second, smaller tail (the first sign of the kitsune), and the shrine's legend: a kitsune with
    // seven tails sweeping up like flames, fox-fire at their tips, a white mask, a mane of a ruff and stone prayer beads on its legs
    levels: [
      { body: { len: .5, chest: .36, tuck: .42, hr: .27 }, head: { snout: .75 }, parts: { ears: { kind: "point", size: 1.85 }, tail: "puff" }, coat: { socks: .12 } },
      { body: { len: .72, chest: .46, tuck: .56, legW: .8, neckW: .28 }, head: { snout: 1.25, snoutTaper: .5 } },
      { body: { len: .68, legW: .95 }, head: { snout: 1.15 }, features: [{ kind: "ruff", size: .16, count: 12 }, { kind: "tails", count: 2, length: .75 }] },
      { body: { len: .7, legW: 1, neckAng: .6 }, head: { snout: 1.15, mask: true }, coat: { socks: .3, beads: true }, features: [
        { kind: "ruff", size: .24, count: 16 },
        { kind: "tails", count: 7, length: 1.1, spread: .38, tip: "MAGIC2", replace: true, width: 1.15 },
      ] },
    ] },
  { id: "badger", name: "Badger", template: "quadruped", builder: "quad", palette: { hue: .65, sat: .08, val: .45 }, body: { hgt: .62, len: .78, chest: .2, tuck: .22, neck: .18, neckAng: .1, neckW: .5, hr: .26, legW: 1.35 }, head: { snout: 1, snoutD: .55, snoutTaper: .55, face: "badger" }, parts: { ears: { kind: "round", size: .7 }, tail: "stub", feet: "paw" }, coat: { shaggy: true, legMat: "BODY3" }, legend: ["crystals"],
    // its evolution (docs/art-guide/EVOLUTIONS.md): a round fluffy cub that's all face, a low wedge of a young, a broad shaggy-plated
    // digger with pale claws, and the moor's legend: low as a boulder, standing stones walking on its back, their runes moonlit
    levels: [
      { body: { len: .58, chest: .22, tuck: .24, hr: .3, legW: 1.1 }, head: { snout: .8, blaze: 1.6 } },
      { body: { len: .9, chest: .18, tuck: .2, neckAng: 0 }, head: { snout: 1.2, snoutTaper: .45, blaze: 1.3 } },
      { body: { len: .86, bw: .42, chest: .16, tuck: .18, legW: 1.6 }, head: { blaze: 1.45 }, features: [{ kind: "mane", from: .1, to: .85, height: .12, count: 16, lean: .95 }, { kind: "claws", size: .14 }] },
      { body: { len: .95, bw: .5, chest: .14, tuck: .16, legW: 1.8, neckAng: -.05 }, head: { blaze: 1.5, blazeGlow: true }, features: [
        { kind: "mane", from: .05, to: .9, height: .12, count: 20, lean: 1 },
        { kind: "stones", from: .15, to: .8, count: 5, height: .62 },
        { kind: "claws", size: .26, mat: "STONE" },
        { kind: "moss", count: 9, size: .1 },
      ] },
    ] },
  { id: "boar", name: "Boar", template: "quadruped", builder: "quad", palette: { hue: .07, sat: .62, val: .5 }, body: { len: .72, chest: .34, tuck: .42, neck: .2, neckAng: -.15, neckW: .55, hr: .27, legW: 1.15, back: "hump" }, head: { snout: 1.25, snoutD: .62, snoutTaper: .55, disc: true }, parts: { ears: { kind: "small", size: .8 }, tail: "thin", feet: "hoof", tusks: true }, coat: { ridge: true }, texture: { kind: "bristles" },
    // its evolution (the pilot of the evolution kit): a round, stubby, banded piglet; the young as it is; a heavy-fronted adult with a
    // shoulder hump, its head low and its tusks curving; a massive, top-heavy legend charging head-down with huge curling tusks, pale
    // flames off their tips and a dark shaggy mane along its spine and belly
    levels: [
      { body: { len: .6, chest: .3, tuck: .34, back: "arch" }, coat: { ridge: false, bands: { n: 2, mat: "BELLY" } } },
      null,
      { body: { humpK: 2.2, neckAng: -.42, front: 1.18, legW: 1.3 }, head: { tuskSize: 1.15, tuskCurl: .75, horn: { length: .75, r: .3, curl: .12, twist: .5, ridges: 2, segs: 6, out: .3, mat2: "NOSE" } }, parts: { horns: "twist" }, coat: { ridge: false }, features: [{ kind: "mane", from: .45, to: .98, height: .14, count: 10, lean: .45 }] },
      { body: { humpK: 2.8, neckAng: -.45, front: 1.36, legW: 1.45, chest: .3 }, head: { tuskSize: 1.7, tuskCurl: 1.25, eyeGlow: true, horn: { length: 5.2, r: .46, curl: .9, twist: 2.5, ridges: 3, segs: 24, out: .3, tip: "MAGIC2", mat2: "NOSE" } }, parts: { horns: "twist" }, coat: { ridge: false }, features: [ // (Ed, 2026-10-05: head down to charge, a battering ram; its eye glints under the hump, flames rise over it)
        { kind: "mane", from: .15, to: 1, height: .3, count: 18, lean: .55 },
        { kind: "mane", belly: true, from: .3, to: .95, height: .16, count: 10, lean: .4 },
        { kind: "wisps", at: "tusks", size: .3 },
        { kind: "wisps", at: "horns", size: .32 },
        { kind: "wisps", at: "mane", size: .26, count: 5, from: .4, to: .9 },
        { kind: "eyeglint", size: .06 },
      ] },
    ] },
  { id: "stag", name: "Stag", template: "quadruped", builder: "quad", palette: { hue: .08, sat: .5, val: .7 }, body: { hgt: 1.3, len: .6, chest: .6, tuck: .7, neck: .55, neckAng: .95, neckW: .32, hr: .2, legW: .75 }, head: { snout: 1.15, snoutD: .6, snoutTaper: .65 }, parts: { ears: { kind: "point", size: 1.1 }, tail: "deer", feet: "hoof", antlers: "branch" }, coat: { belly: true, spots: "young", rump: true }, legend: ["antlersGlow"] },
  { id: "hare", name: "Hare", template: "quadruped", builder: "quad", palette: { hue: .08, sat: .4, val: .72 }, body: { hgt: .72, len: .5, chest: .4, tuck: .45, neck: .2, neckAng: .9, neckW: .35, hr: .27, legW: .85, haunch: 1.35, hindFoot: 1.6, back: "arch" }, head: { snout: .65, snoutD: .7, whiskers: true }, parts: { ears: { kind: "long", size: 2.4 }, tail: "puff", feet: "paw" }, coat: { belly: true }, legend: ["jackalope"] },
  { id: "owl", name: "Owl", template: "avian", builder: "owl", palette: { hue: .08, sat: .5, val: .55 }, legend: ["eyesRing", "wings"] },
  { id: "bear", name: "Bear", template: "quadruped", builder: "quad", palette: { hue: .07, sat: .55, val: .42 }, body: { hgt: 1.15, len: .72, chest: .38, tuck: .4, neck: .25, neckAng: .3, neckW: .55, hr: .28, legW: 1.55, back: "hump" }, head: { snout: .7, snoutD: .62, snoutTaper: .7, muzzle: true }, parts: { ears: { kind: "round", size: .8 }, tail: "stub", feet: "paw" }, coat: { shaggy: true }, legend: ["moss"] },
  { id: "hedgehog", name: "Hedgehog", template: "squat", builder: "hedgehog", palette: { hue: .08, sat: .4, val: .5 }, legend: ["crystals"] , texture: { kind: "bristles" } },
  { id: "squirrel", name: "Squirrel", template: "quadruped", builder: "quad", palette: { hue: .03, sat: .75, val: .75, belly: "white" }, body: { hgt: .55, len: .45, chest: .35, tuck: .4, neck: .2, neckAng: .9, neckW: .35, hr: .3, legW: .8, haunch: 1.3, back: "arch" }, head: { snout: .55, snoutD: .65, whiskers: true }, parts: { ears: { kind: "tuft", size: 1.1 }, tail: "squirrel", feet: "paw" }, coat: { belly: true }, legend: ["starTail"] },
  { id: "toad", name: "Toad", template: "squat", builder: "toad", palette: { hue: .2, sat: .5, val: .55 }, legend: ["crown"] },
  { id: "otter", name: "Otter", template: "quadruped", builder: "quad", palette: { hue: .07, sat: .55, val: .45, belly: "white" }, body: { hgt: .55, len: 1, chest: .25, tuck: .25, neck: .3, neckAng: .35, neckW: .5, hr: .27, legW: 1.1 }, head: { snout: .6, snoutD: .7, muzzle: true, whiskers: true }, parts: { ears: { kind: "round", size: .5 }, tail: "otter", feet: "paw" }, coat: { belly: true }, legend: ["ribbons"] },
  { id: "lynx", name: "Lynx", template: "quadruped", builder: "quad", palette: { hue: .09, sat: .45, val: .75 }, body: { hgt: .9, len: .55, chest: .5, tuck: .55, neck: .25, neckAng: .8, neckW: .4, hr: .27, legW: 1.2 }, head: { snout: .5, snoutD: .75, snoutTaper: .8, cheeks: true, whiskers: true }, parts: { ears: { kind: "tuft", size: 1 }, tail: "bob", feet: "paw" }, coat: { belly: true, spots: true }, legend: ["mane"] },
  { id: "elk", name: "Elk", template: "quadruped", builder: "quad", palette: { hue: .07, sat: .55, val: .38 }, body: { hgt: 1.4, len: .68, chest: .6, tuck: .66, neck: .45, neckAng: .75, neckW: .42, hr: .24, legW: .9, back: "hump" }, head: { snout: 1.6, snoutD: .9, snoutTaper: .85 }, parts: { ears: { kind: "point", size: .9 }, tail: "stub", feet: "hoof", antlers: "palm" }, coat: { shaggy: true }, legend: ["antlersGlow", "moss"] },
  { id: "raven", name: "Raven", template: "avian", builder: "raven", palette: { hue: .68, sat: .35, val: .3 }, legend: ["wings", "eyesRing"] },
  { id: "bat", name: "Bat", template: "flyer", builder: "bat", palette: { hue: .78, sat: .25, val: .45 }, legend: ["wingsBig"] , texture: { kind: "fur", size: 3 } },
  { id: "mole", name: "Mole", template: "squat", builder: "mole", palette: { hue: .7, sat: .15, val: .32 }, legend: ["crown"] , texture: { kind: "fur", size: 3 } },
  { id: "beaver", name: "Beaver", template: "quadruped", builder: "quad", palette: { hue: .06, sat: .6, val: .45 }, body: { hgt: .6, len: .65, chest: .2, tuck: .22, neck: .2, neckAng: .4, neckW: .55, hr: .28, legW: 1.2, back: "arch" }, head: { snout: .6, snoutD: .75, whiskers: true, teeth: true }, parts: { ears: { kind: "round", size: .45 }, tail: "flat", feet: "paw" }, legend: ["moss"] },
  { id: "stoat", name: "Stoat", template: "quadruped", builder: "quad", palette: { hue: .1, sat: .25, val: .92 }, body: { hgt: .5, len: 1, chest: .3, tuck: .33, neck: .35, neckAng: .6, neckW: .32, hr: .25, legW: .8, back: "arch" }, head: { snout: .6, snoutD: .6, whiskers: true }, parts: { ears: { kind: "round", size: .6 }, tail: "stoat", feet: "paw" }, coat: { belly: true }, legend: ["ribbons", "mane"] },
  { id: "snail", name: "Snail", template: "squat", builder: "snail", palette: { hue: .08, sat: .45, val: .55 }, legend: ["glowShell"] , texture: { kind: "shell" },
    // its evolution (docs/art-guide/EVOLUTIONS.md): a near-clear one-turn shell on a baby with big stalk eyes, an amber banded young,
    // a tall ridged cone on a frilled adult, and the muddy forest's legend: a spiral tower the forest built, buttressed, caked in mud,
    // tiny trees and fungi on its whorls, its mouth glowing amber, huge slow eye stalks with glowing tips
    levels: [
      { body: { shell: { turns: 1.2, r: .26, pale: true }, stalks: 1.35 } },
      { body: { shell: { turns: 2, r: .3, bands: 3 } } },
      { body: { shell: { turns: 3, r: .32, cone: 1, ridge: true, bands: 2 }, stalks: 1.5, mantle: true, sheen: true } },
      { body: { shell: { turns: 4, r: .36, cone: 1.25, ridge: true, bands: 2, glow: true, buttress: true, mud: true, trees: 6 }, stalks: 2, mantle: true, sheen: true, eyeGlow: true } },
    ] },
  { id: "ram", name: "Ram", template: "quadruped", builder: "quad", palette: { hue: .1, sat: .12, val: .88, flower: [196, 36, 52] }, body: { hgt: .95, len: .6, chest: .48, tuck: .52, neck: .22, neckAng: .45, neckW: .48, hr: .25, legW: .9 }, head: { snout: .85, snoutD: .75, snoutTaper: .8, face: "dark" }, parts: { ears: { kind: "small", size: .7 }, tail: "stub", feet: "hoof", horns: "curl" }, coat: { wool: true }, legend: ["hornsGlow"] , texture: { kind: "fur", stretch: 1.2, size: 3 },
    // its evolution (docs/art-guide/EVOLUTIONS.md): a curly white lamb with big ears and no horns, a young with its first horn buds,
    // an adult with heavy dark ridged horns in a full curl and a fleece ruff, and the tangly forest's legend: bronze horns in a double
    // spiral with thorns along their ridges, brambles and berries woven through fleece that hangs in shaggy locks
    levels: [
      { body: { len: .5, hr: .29 }, parts: { ears: { kind: "small", size: 1.25 }, horns: false }, coat: { legMat: "BODY3" } },
      { parts: { horns: "twist" }, head: { horn: { length: 1.1, r: .38, curl: .7, twist: 0, ridges: 2, segs: 8, out: .55, ease: 1, mat: "BODY3" } } },
      { body: { bw: .36, legW: 1.1 }, coat: { legMat: "BODY3" }, parts: { horns: "twist" }, head: { horn: { length: 3.4, r: .62, curl: 1.75, twist: 0, ridges: 1, segs: 26, out: .7, ease: 1, tighten: .6, mat: "BODY3" } }, features: [{ kind: "ruff", size: .2, count: 14, mat: "BODY" }] },
      { body: { bw: .4, legW: 1.2 }, coat: { legMat: "BODY3" }, parts: { horns: "twist" }, head: { horn: { length: 6, r: .7, curl: 3.3, twist: 0, ridges: 1, segs: 44, out: .8, ease: 1, tighten: .72, mat: "WOOD", thorns: 9, back: .4, wide: .15 } }, features: [
        { kind: "ruff", size: .28, count: 18, mat: "BODY" },
        { kind: "mane", belly: true, from: .1, to: .95, height: .2, count: 14, lean: .2, mat: "BODY" },
        { kind: "brambles", count: 4 },
      ] },
    ] },
  { id: "woodlouse", name: "Woodlouse", template: "insectoid", builder: "woodlouse", palette: { hue: .65, sat: .12, val: .45 }, legend: ["crystals"],
    // its evolution (docs/art-guide/EVOLUTIONS.md): a pale round baby of five plates, a slate-grey young of seven with pale edges, an
    // adult of ten raised-rimmed plates flecked at their edges with jointed feelers and two tail spikes, and the wispy forest's legend:
    // armoured like a fortress, shields with spiked edges, moonstones along its spine, dry leaves caught in its plates, whip feelers
    levels: [
      { body: { plates: 5, pale: true, feelers: .6 } },
      { body: { plates: 7, rim: true, feelers: 1 } },
      { body: { plates: 10, rim: true, flecks: true, feelers: 1.35, jointed: true, tailSpikes: true } },
      { body: { plates: 10, rim: true, flecks: true, feelers: 2, jointed: true, tailSpikes: true, shields: true, crystals: true, leaves: true } },
    ] },
  { id: "snake", name: "Snake", template: "serpent", builder: "snake", palette: { hue: .25, sat: .45, val: .45 }, legend: ["wings"] },
  { id: "moth", name: "Moth", template: "flyer", builder: "moth", palette: { hue: .1, sat: .3, val: .7 }, legend: ["wingsBig"] , texture: { kind: "fur", size: 3, stretch: 1.6 } },
  { id: "marten", name: "Pine marten", template: "quadruped", builder: "quad", palette: { hue: .07, sat: .6, val: .45 }, body: { hgt: .55, len: .78, chest: .35, tuck: .38, neck: .3, neckAng: .55, neckW: .35, hr: .25, legW: .85, back: "arch" }, head: { snout: .65, snoutD: .6 }, parts: { ears: { kind: "round", size: .9 }, tail: "bushy", feet: "paw" }, coat: { belly: true }, legend: ["mane"] },
  { id: "salamander", name: "Salamander", template: "quadruped", builder: "quad", palette: { hue: .1, sat: .1, val: .22, belly: "yellow" }, body: { hgt: .42, len: .9, chest: .14, tuck: .14, neck: .12, neckAng: .05, neckW: .5, hr: .27, legW: 1 }, head: { snout: .55, snoutD: .55 }, parts: { ears: { kind: "none" }, tail: "otter", feet: "paw" }, coat: { spots: true, spotMat: "belly" }, legend: ["flames"] , texture: { kind: "smooth" } },
  { id: "glowworm", name: "Glow-worm", template: "serpent", builder: "glowworm", palette: { hue: .12, sat: .4, val: .35 }, legend: ["lantern"] , texture: { kind: "plates", size: 3 } },
  { id: "spider", name: "Spider", template: "insectoid", builder: "spider", palette: { hue: .07, sat: .45, val: .4 }, legend: ["eyesRing"] , texture: { kind: "bristles", size: 2 } },
  { id: "dormouse", name: "Dormouse", template: "quadruped", builder: "quad", palette: { hue: .09, sat: .6, val: .75, belly: "white" }, body: { hgt: .38, len: .45, chest: .35, tuck: .38, neck: .15, neckAng: .6, neckW: .4, hr: .34, legW: .8, back: "arch" }, head: { snout: .45, snoutD: .7, whiskers: true, eyeK: 1.6 }, parts: { ears: { kind: "round", size: .85 }, tail: "dormouse", feet: "paw" }, coat: { belly: true }, legend: ["starTail"] },
  { id: "beetle", name: "Stag beetle", template: "insectoid", builder: "beetle", palette: { hue: .78, sat: .5, val: .35 }, legend: ["horn", "crystals"] },
];
