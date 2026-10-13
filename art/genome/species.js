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
  { id: "wolf", name: "Wolf", template: "quadruped", builder: "quad", palette: { hue: .08, sat: .2, val: .72 }, body: { hgt: 1.12, len: .66, chest: .46, tuck: .66, neck: .34, neckAng: .62, neckW: .4, hr: .25, legW: 1.05 }, head: { snout: .9, snoutD: .65 }, parts: { ears: { kind: "point", size: 1.05 }, tail: "brush", feet: "paw" }, coat: { belly: true, saddle: true }, legend: ["wings", "mane"],
    // its evolution (docs/art-guide/EVOLUTIONS.md): a round pup with big paws and floppy ears, a lanky young, an adult with a heavy
    // shaggy mane over its shoulders, and the legend: shoulders twice its hips, a mane of spiky locks, pale spirit-fire along its
    // spine, glowing eyes and frost on its muzzle
    levels: [
      { body: { len: .5, hr: .29, legW: 1.5 }, head: { snout: .6 }, parts: { ears: { kind: "small", size: 1.2 }, tail: "stub" } },
      { body: { len: .74, chest: .52, tuck: .72, legW: .95, neckW: .34 }, head: { snout: 1 } },
      { body: { front: 1.08, legW: 1.05, bw: .25, hgt: 1.2, tuck: .72 }, head: { snout: 1.05 }, features: [{ kind: "mane", from: .6, to: 1, height: .26, count: 14, lean: .5, mat: "BODY2" }] },
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
  { id: "badger", name: "Badger", template: "quadruped", builder: "quad", palette: { hue: .65, sat: .08, val: .45 }, body: { hgt: .5, len: .82, chest: .18, tuck: .2, neck: .16, neckAng: 0, neckW: .55, hr: .26, legW: 1.4, bw: .38 }, head: { snout: 1.05, snoutD: .5, snoutTaper: .5, face: "badger" }, parts: { ears: { kind: "round", size: .7 }, tail: "stub", feet: "paw" }, coat: { shaggy: true, legMat: "BODY3" }, legend: [], elder: { kind: "badger", eye: "EYE" },
    // its evolution (docs/art-guide/EVOLUTIONS.md): a round fluffy cub that's all face, a low wedge of a young, a broad shaggy-plated
    // digger with pale claws, and the moor's legend, the elder of its kind (art/elders.js; Ed's elder brief): grizzled and scarred, its
    // stripes running on down its back as chalk hill-figure lines, a bronze torc
    levels: [
      { body: { len: .58, chest: .22, tuck: .24, hr: .3, legW: 1.1 }, head: { snout: .8, blaze: 1.6 } },
      { body: { len: .9, chest: .18, tuck: .2, neckAng: 0 }, head: { snout: 1.2, snoutTaper: .45, blaze: 1.3 } },
      { body: { len: 1.6, hgt: .55, bw: .62, chest: .04, tuck: .05, legW: 1.7, hr: .3, neckAng: .12 }, head: { blaze: 1.8 }, features: [{ kind: "mane", from: .1, to: .85, height: .04, count: 16, lean: .95 }, { kind: "claws", size: .14 }] }, // (Ed, 2026-10-07: low, wide and flat-backed on short legs, not a bear: art lint)
      { body: { len: .95, bw: .5, chest: .14, tuck: .16, legW: 1.8, neckAng: .25, hr: .3 }, head: { blaze: 1.6 }, features: [{ kind: "mane", from: .05, to: .9, height: .08, count: 20, lean: 1 }, { kind: "claws", size: .24 }] }, // the elder (art/elders.js): grizzled, scarred, its stripes running down its back as chalk hill-figure lines, a bronze torc
    ] },
  { id: "boar", name: "Boar", template: "quadruped", builder: "quad", palette: { hue: .07, sat: .62, val: .5 }, body: { len: .72, chest: .38, tuck: .5, neck: .2, neckAng: -.2, neckW: .55, hr: .27, legW: .9, back: "hump", front: 1.18, humpK: 1.6 }, head: { snout: 1.25, snoutD: .62, snoutTaper: .55, disc: true }, parts: { ears: { kind: "small", size: .8 }, tail: "thin", feet: "hoof", tusks: true }, coat: { ridge: true }, texture: { kind: "bristles" },
    // its evolution (the pilot of the evolution kit): a round, stubby, banded piglet; the young as it is; a heavy-fronted adult with a
    // shoulder hump, its head low and its tusks curving; a massive, top-heavy legend charging head-down with huge curling tusks, pale
    // flames off their tips and a dark shaggy mane along its spine and belly
    levels: [
      { body: { len: .6, chest: .3, tuck: .34, back: "arch" }, coat: { ridge: false, bands: { n: 2, mat: "BELLY" } } },
      null,
      { body: { humpK: 2.4, neckAng: -.42, front: 1.25, legW: 1.0, hgt: 1.05 }, head: { tuskSize: 1.15, tuskCurl: .75, horn: { length: .75, r: .3, curl: .12, twist: .5, ridges: 2, segs: 6, out: .3, mat2: "NOSE" } }, parts: { horns: "twist" }, coat: { ridge: false }, features: [{ kind: "mane", from: .45, to: .98, height: .14, count: 10, lean: .45 }] },
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
  { id: "hare", name: "Hare", template: "quadruped", builder: "quad", palette: { hue: .08, sat: .4, val: .72 }, body: { hgt: .72, len: .5, chest: .4, tuck: .45, neck: .2, neckAng: .9, neckW: .35, hr: .27, legW: .85, haunch: 1.35, hindFoot: 1.6, back: "arch" }, head: { snout: .65, snoutD: .7, whiskers: true }, parts: { ears: { kind: "long", size: 2.4 }, tail: "puff", feet: "paw" }, coat: { belly: true }, legend: [], elder: { kind: "hare", ears: true, eye: "EYE" } },
  { id: "owl", name: "Owl", template: "avian", builder: "owl", palette: { hue: .08, sat: .5, val: .55 }, legend: ["eyesRing", "wings"],
    // its evolution (docs/art-guide/EVOLUTIONS.md): a downy owlet with huge eyes and no tufts, a smooth young with short tufts, an
    // adult with a dark-rimmed disc, long tufts, a barred chest and patterned wing tips, and the legend: wings half spread like a
    // cloak edged in moonlight, tufts swept back like horns, a ring of glowing eyes round its disc
    levels: [
      { body: { down: true }, head: { tufts: 0 } },
      { head: { tufts: .7 } },
      { body: { bars: true, wingTips: true }, head: { tufts: 1.5, discRim: true } },
      { body: { bars: true, cloak: true }, head: { tufts: 2.2, tuftsBack: true, discRim: true, eyesRing: true } },
    ] },
  { id: "bear", name: "Bear", template: "quadruped", builder: "quad", palette: { hue: .07, sat: .55, val: .42 }, body: { hgt: 1.25, len: .74, chest: .4, tuck: .46, neck: .22, neckAng: .1, neckW: .6, hr: .36, legW: 1.75, back: "hump", front: 1.4, humpK: 3.4, bw: .34 }, head: { snout: .5, snoutD: .72, snoutTaper: .8, muzzle: true }, parts: { ears: { kind: "round", size: .9 }, tail: "stub", feet: "paw" }, coat: { shaggy: true }, legend: ["moss"] },
  { id: "hedgehog", name: "Hedgehog", template: "squat", builder: "hedgehog", palette: { hue: .08, sat: .4, val: .5, flower: [200, 44, 40] }, legend: [], elder: { kind: "hedgehog" }, texture: { kind: "bristles" } },
  { id: "squirrel", name: "Squirrel", template: "quadruped", builder: "quad", palette: { hue: .03, sat: .75, val: .75, belly: "white" }, body: { hgt: .55, len: .45, chest: .35, tuck: .4, neck: .2, neckAng: .9, neckW: .35, hr: .3, legW: .8, haunch: 1.3, back: "arch" }, head: { snout: .55, snoutD: .65, whiskers: true }, parts: { ears: { kind: "tuft", size: 1.1 }, tail: "squirrel", feet: "paw" }, coat: { belly: true }, legend: [], elder: { kind: "squirrel", tail: true, eye: "EYE" } },
  { id: "toad", name: "Toad", template: "squat", builder: "toad", palette: { hue: .2, sat: .5, val: .55 }, legend: ["crown"] },
  { id: "otter", name: "Otter", template: "quadruped", builder: "quad", palette: { hue: .07, sat: .55, val: .45, belly: "white" }, body: { hgt: .46, len: 1.15, chest: .32, tuck: .26, neck: .36, neckAng: .5, neckW: .6, hr: .27, legW: 1.2, back: "arch" }, head: { snout: .55, snoutD: .55, muzzle: true, whiskers: true }, parts: { ears: { kind: "round", size: .4 }, tail: "otter", feet: "paw" }, coat: { belly: true }, legend: ["ribbons"] },
  { id: "lynx", name: "Lynx", template: "quadruped", builder: "quad", palette: { hue: .09, sat: .45, val: .75 }, body: { hgt: 1.08, len: .5, chest: .56, tuck: .62, neck: .25, neckAng: .8, neckW: .4, hr: .27, legW: .95 }, head: { snout: .5, snoutD: .75, snoutTaper: .8, cheeks: true, whiskers: true }, parts: { ears: { kind: "tuft", size: 1.5 }, tail: "bob", feet: "paw" }, coat: { belly: true, spots: true }, legend: ["mane"] },
  { id: "elk", name: "Elk", template: "quadruped", builder: "quad", palette: { hue: .07, sat: .55, val: .38 }, body: { hgt: 1.4, len: .68, chest: .6, tuck: .66, neck: .45, neckAng: .75, neckW: .42, hr: .24, legW: .9, back: "hump" }, head: { snout: 1.6, snoutD: .9, snoutTaper: .85 }, parts: { ears: { kind: "point", size: .9 }, tail: "stub", feet: "hoof", antlers: "palm" }, coat: { shaggy: true }, legend: ["antlersGlow", "moss"] },
  { id: "raven", name: "Raven", template: "avian", builder: "raven", palette: { hue: .68, sat: .35, val: .3 }, legend: ["wings", "eyesRing"] },
  { id: "bat", name: "Bat", template: "flyer", builder: "bat", palette: { hue: .78, sat: .25, val: .45 }, legend: ["wingsBig"] , texture: { kind: "fur", size: 3 } },
  { id: "mole", name: "Mole", template: "squat", builder: "mole", palette: { hue: .7, sat: .15, val: .32, flower: [70, 190, 150] }, legend: [], elder: { kind: "mole" }, texture: { kind: "fur", size: 3 } },
  { id: "beaver", name: "Beaver", template: "quadruped", builder: "quad", palette: { hue: .06, sat: .6, val: .45 }, body: { hgt: .66, len: .62, chest: .34, tuck: .3, neck: .18, neckAng: .35, neckW: .6, hr: .3, legW: 1.25, back: "hump" }, head: { snout: .55, snoutD: .8, whiskers: true, teeth: true }, parts: { ears: { kind: "round", size: .45 }, tail: "flat", feet: "paw" }, legend: ["moss"] },
  { id: "stoat", name: "Stoat", template: "quadruped", builder: "quad", palette: { hue: .1, sat: .25, val: .92 }, body: { hgt: .48, len: 1.05, chest: .3, tuck: .33, neck: .5, neckAng: .9, neckW: .3, hr: .25, legW: .8, back: "arch" }, head: { snout: .6, snoutD: .6, whiskers: true }, parts: { ears: { kind: "round", size: .6 }, tail: "stoat", feet: "paw" }, coat: { belly: true }, legend: ["ribbons", "mane"] },
  { id: "snail", name: "Snail", template: "squat", builder: "snail", palette: { hue: .08, sat: .45, val: .55 }, legend: [], elder: { kind: "snail" }, texture: { kind: "shell" },
    // its evolution (docs/art-guide/EVOLUTIONS.md): a near-clear one-turn shell on a baby with big stalk eyes, an amber banded young,
    // a tall ridged cone on a frilled adult, and the muddy forest's legend, the elder of its kind (Ed's elder brief): its shell the night sky,
    // full of stars, a gold spiral inlaid along its whorls, its lip chipped, old grey skin, huge slow eye stalks with glowing tips
    levels: [
      { body: { shell: { turns: 1.2, r: .26, pale: true }, stalks: 1.35 } },
      { body: { shell: { turns: 2, r: .3, bands: 3 } } },
      { body: { shell: { turns: 3, r: .32, cone: 1, ridge: true, bands: 2 }, stalks: 1.5, mantle: true, sheen: true } },
      { body: { shell: { turns: 4.2, r: .4, cone: .75, ridge: true, stars: true, runes: true, chipped: true }, stalks: 2.3, mantle: true, sheen: true, eyeGlow: true } }, // the elder: its shell the night sky and the age of the stars, a gold spiral inlaid, its lip chipped, old grey skin
    ] },
  { id: "ram", name: "Ram", template: "quadruped", builder: "quad", palette: { hue: .1, sat: .12, val: .88, flower: [196, 36, 52] }, body: { hgt: .95, len: .62, chest: .44, tuck: .48, neck: .2, neckAng: .9, neckW: .5, hr: .25, legW: .62 }, head: { snout: .85, snoutD: .75, snoutTaper: .8, face: "dark" }, parts: { ears: { kind: "small", size: .7 }, tail: "stub", feet: "hoof", horns: "curl" }, coat: { wool: true }, legend: ["hornsGlow"] , texture: { kind: "fur", stretch: 1.2, size: 3 },
    // its evolution (docs/art-guide/EVOLUTIONS.md): a curly white lamb with big ears and no horns, a young with its first horn buds,
    // an adult with heavy dark ridged horns in a full curl and a fleece ruff, and the tangly forest's legend: bronze horns in a double
    // spiral with thorns along their ridges, brambles and berries woven through fleece that hangs in shaggy locks
    levels: [
      { body: { len: .5, hr: .29 }, parts: { ears: { kind: "small", size: 1.25 }, horns: false }, coat: { legMat: "BODY3" } },
      { parts: { horns: "twist" }, head: { horn: { length: 1.9, r: .42, curl: 1.1, twist: 0, ridges: 2, segs: 8, out: .55, ease: 1, mat: "BODY3" } } },
      { body: { bw: .36, legW: .8 }, coat: { legMat: "BODY3" }, parts: { horns: "twist" }, head: { horn: { length: 3.8, r: .62, curl: 1.75, twist: 0, ridges: 1, segs: 26, out: .7, ease: 1, tighten: .6, mat: "BODY3" } }, features: [{ kind: "ruff", size: .2, count: 14, mat: "BODY" }] },
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
  { id: "marten", name: "Pine marten", template: "quadruped", builder: "quad", palette: { hue: .07, sat: .6, val: .45 }, body: { hgt: .68, len: .78, chest: .35, tuck: .42, neck: .3, neckAng: .55, neckW: .35, hr: .25, legW: .85, back: "arch" }, head: { snout: .65, snoutD: .6 }, parts: { ears: { kind: "round", size: 1.3 }, tail: "marten", feet: "paw" }, coat: { belly: true }, legend: [], elder: { kind: "marten", eye: "EYE" } },
  { id: "salamander", name: "Salamander", template: "quadruped", builder: "quad", palette: { hue: .1, sat: .1, val: .22, belly: "yellow" }, body: { hgt: .4, len: .95, chest: .16, tuck: .16, neck: .1, neckAng: -.05, neckW: .6, hr: .29, legW: 1.45, bw: .36 }, head: { snout: .55, snoutD: .55 }, parts: { ears: { kind: "none" }, tail: "salamander", feet: "paw" }, coat: { spots: true, spotMat: "belly" }, legend: ["flames"] , texture: { kind: "smooth" } },
  // the fen's newt (an area recipe's, #119; art builder 2's record): a slimmer, lower salamander with a crest along its back
  { id: "newt", name: "Newt", template: "quadruped", builder: "quad", palette: { hue: .08, sat: .55, val: .35, belly: "yellow" }, body: { hgt: .4, len: 1.1, chest: .1, tuck: .1, neck: .14, neckAng: .1, neckW: .45, hr: .28, legW: .6, bw: .22 }, head: { snout: .42, snoutD: .5 }, parts: { ears: { kind: "none" }, tail: "newt", feet: "paw" }, coat: { spots: true, spotMat: "belly", ridge: 2.4 }, legend: ["crystals"], texture: { kind: "smooth" } },
  // the mossy dell's roe deer (an area recipe's): a small, slight deer, all ears and eyes, a white rump and a black nose; the buck's
  // short three-tined antlers (its own antler curve, a third of the stag's), the fawn dappled
  { id: "roe", name: "Roe deer", template: "quadruped", builder: "quad", palette: { hue: .055, sat: .62, val: .66, belly: "white" }, body: { hgt: 1.0, len: .52, chest: .36, tuck: .54, neck: .42, neckAng: .9, neckW: .28, hr: .23, legW: .55 }, head: { snout: .8, snoutD: .55, snoutTaper: .6, eyeK: 1.35 }, parts: { ears: { kind: "big", size: 1.15 }, tail: "bob", feet: "hoof", antlers: "branch" }, coat: { belly: true, spots: "young", rump: true }, sizes: { antlers: [0, .3, .42, .95] }, legend: [],
    // its legend, the elder of the roe (docs/ART-GUIDE.md 0c): an ancient buck grown tall and grey-muzzled, its antlers the old
    // bucks' "perruque", heavy, many-tined and furred with moss, a pale winter ruff at its throat, moss on its flanks from lying
    // out for ages in the dell, and bead offerings bound round its legs
    levels: [null, null, null,
      { body: { hgt: 1.15, neck: .5, chest: .4 }, head: { frost: true }, coat: { beads: true, socks: .3 }, features: [
        { kind: "ruff", size: .16, count: 12, mat: "BELLY" },
        { kind: "moss", count: 9, size: .1 },
      ] }] },
  // the mangrove swamp's crocodile (an area recipe's, phase 3): long and low, a flat wide jaw lined with teeth, a heavy tail along the ground
  { id: "crocodile", name: "Crocodile", template: "quadruped", builder: "quad", palette: { hue: .2, sat: .35, val: .32 }, body: { hgt: .7, len: 2.1, chest: .05, tuck: .05, neck: .12, neckAng: -.04, neckW: .75, hr: .32, legW: 1.6, bw: .55 }, head: { snout: 4.4, snoutD: .9, snoutTaper: .9, flatJaw: true, eyeK: 1.15 }, parts: { ears: { kind: "none" }, tail: "croc", feet: "paw" }, coat: {}, legend: [], texture: { kind: "scales", size: 5, contrast: .35 },
    // its legend (Ed, 2026-10-12: "emphasise the thing that makes that creature unusual"): enormous jaws, its scutes risen into a ridge
    // of standing stones down its back and tail root, its eyes glowing just above the water line
    levels: [null, null, null, { body: { len: 2.3, bw: .62, hr: .38 }, head: { snout: 5, snoutD: 1.05, jawW: .78 }, features: [{ kind: "stones", from: .05, to: .95, count: 8, height: 1.05 }, { kind: "eyeglint", size: .05 }, { kind: "scars", count: 4, len: .55, width: 1 }, { kind: "beads", at: "snout", count: 22, size: .04, ry: .32, rz: .82, rings: [.3, .5] }] }] },
  // the heronry's heron (an area recipe's, #119; art builder 2's heron builder): a tall grey wader, S-necked, dagger-billed
  { id: "heron", name: "Heron", template: "avian", builder: "heron", palette: { hue: .6, sat: .08, val: .62 }, legend: ["wings"], texture: { kind: "feathers" } },
  // the mangrove swamp's dragonfly (Ed, 2026-10-12, unknown-10): a hawker over the water, metallic blue-green, four glassy veined wings;
  // every level flies (Ed: the baby a small dragonfly); its legend the elder of its kind, a coal-forest giant: all eye, vast tattered wings, scarred
  { id: "dragonfly", name: "Dragonfly", template: "flyer", builder: "dragonfly", palette: { hue: .5, sat: .62, val: .62 }, legend: ["eyesHuge", "ancient"], texture: { kind: "plates", size: 2 },
    levels: [{ body: { wing: .62, tail: .6 } }, { body: { wing: .8, tail: .85 } }, { body: { wing: 1, tail: 1 } }, { body: { wing: 1.45, tail: 1.4 } }] },
  // the mangrove swamp's crab (Ed, 2026-10-12, unknown-26): a mudflat fiddler that scuttles sideways, its shell orange-red, one great claw
  // on an adult, barnacles; its legend the elder of its kind: one colossal gleaming claw bigger than its body, waved in a slow beckoning display, its eyes lit, its shell aged like a reef
  { id: "crab", name: "Crab", template: "insectoid", builder: "crab", palette: { hue: .02, sat: .62, val: .58 }, legend: ["wave", "reef"], texture: { kind: "plates", size: 3 },
    levels: [{ body: { shell: .85, claw: 1 } }, { body: { shell: 1, claw: 1.25 } }, { body: { shell: 1, claw: 1.8, barnacles: true } }, { body: { shell: 1.05, claw: 3.2, barnacles: true } }] },
  // the badlands' meerkat (Ed, 2026-10-12, unknown-05): a slim sandy sentinel, long-necked and upright, banded faintly across the back,
  // dark round its eyes, a thin dark-tipped tail
  { id: "meerkat", name: "Meerkat", template: "quadruped", builder: "quad", idle: "sentinel", palette: { hue: .09, sat: .35, val: .72, belly: "white", flower: [168, 76, 50] }, elder: { kind: "meerkat", eye: "GLOW" }, body: { hgt: .8, len: .62, chest: .44, tuck: .5, neck: .34, neckAng: .75, neckW: .26, hr: .2, legW: .55, bw: .2, back: "arch" }, head: { snout: .8, snoutD: .45, snoutTaper: .4, face: "meerkat", whiskers: true }, parts: { ears: { kind: "round", size: .45 }, tail: "meerkat", feet: "paw" }, coat: { belly: true, bands: { n: 5, mat: "BODY2" } }, legend: [], texture: { kind: "fur", size: 2 } },
  // the scrub wash's armadillo (Ed, 2026-10-12, unknown-06, the badlands): its own builder, a low domed shell banded across its middle,
  // a long tapering snout, upright ears, a ringed tail; its legend (Ed: "rolls into a glowing ball, with glowing seams between its
  // bands, rolling when it moves") curled into that ball (armadillo3d's level 3)
  { id: "armadillo", name: "Armadillo", template: "squat", builder: "armadillo", palette: { hue: .06, sat: .22, val: .58 }, legend: ["ball"], elder: { kind: "armadillo" }, texture: { kind: "plates" } },
  // the cold rainforest's raccoon (Ed, 2026-10-12, unknown-30): grey and hunched, a black bandit mask between white brows and muzzle,
  // dark legs and hands, a thick ringed tail (not Delta's red panda: grey, not russet); its legend to come (Ed's elder brief, docs/ART-GUIDE.md 0c)
  { id: "raccoon", name: "Raccoon", template: "quadruped", builder: "quad", palette: { hue: .62, sat: .07, val: .55, flower: [196, 58, 44] }, body: { hgt: .62, len: .6, chest: .36, tuck: .4, neck: .2, neckAng: .45, neckW: .45, hr: .28, legW: .95, back: "arch" }, head: { snout: .7, snoutD: .55, snoutTaper: .5, face: "raccoon", whiskers: true }, parts: { ears: { kind: "round", size: .95 }, tail: "ringed", feet: "paw" }, coat: { legMat: "BODY3", shaggy: true }, legend: [], elder: { kind: "raccoon", eye: "EYE" }, texture: { kind: "fur", size: 3 } },
  // the erg's fennec fox (a journey kind: unknown-07's, the hot south): a small pale sand fox that's mostly ears, a black-tipped brush; its
  // legend the dunes' own: ears like sails, a white mask, turquoise beads, heat-shimmer rising off its back
  { id: "fennec", name: "Fennec fox", template: "quadruped", builder: "quad", palette: { hue: .1, sat: .32, val: .93, belly: "white", ear: [.97, .32, .9], magic: .12 }, body: { hgt: .62, len: .55, chest: .4, tuck: .48, neck: .28, neckAng: .78, neckW: .3, hr: .28, legW: .7 }, head: { snout: .8, snoutD: .42, snoutTaper: .5, eyeK: 1.35 }, parts: { ears: { kind: "sail", size: 2 }, tail: "bushy", feet: "paw" }, coat: { belly: true }, legend: ["tails"],
    levels: [
      { body: { len: .44, chest: .36, tuck: .42, hr: .32 }, head: { snout: .6, eyeK: 1.5 }, parts: { ears: { kind: "sail", size: 2.3 }, tail: "puff" } },
      { body: { len: .62, chest: .44, tuck: .52, legW: .65, neckW: .27 }, head: { snout: .9 } },
      { body: { len: .6, legW: .72 }, head: { snout: .88 }, parts: { ears: { kind: "sail", size: 2.1 } }, features: [{ kind: "ruff", size: .1, count: 10, mat: "BELLY" }] },
      { body: { len: .66, legW: .8, neckAng: .7 }, head: { snout: .9, mask: true, eyeGlow: true }, parts: { ears: { kind: "sail", size: 2.6 } }, coat: { beads: true }, features: [
        { kind: "ruff", size: .18, count: 14, mat: "BELLY" },
        { kind: "mane", from: .25, to: .9, height: .07, count: 14, lean: .85, mat: "BELLY" },
        { kind: "wisps", at: "mane", size: .2, count: 6, from: .15, to: .85, mat: "MAGIC2", lift: .2 },
      ] },
    ] },
  // the meadow's wildcat (Ed, 2026-10-12: the glowworm replaced by a cat hunting in the long grass): a stocky striped tabby, a broad
  // round head, a thick blunt tail; its legend crowned
  { id: "cat", name: "Wildcat", template: "quadruped", builder: "quad", palette: { hue: .08, sat: .1, val: .52, belly: "white", magic: .13 }, body: { hgt: .7, len: .68, chest: .4, tuck: .48, neck: .2, neckAng: .75, neckW: .36, hr: .32, legW: .58 }, head: { snout: .38, snoutD: .7, snoutTaper: .85, cheeks: true, whiskers: true, eyeK: 1.45 }, parts: { ears: { kind: "point", size: 1.3 }, tail: "stoat", feet: "paw" }, coat: { belly: true, tabby: { n: 13, w: .3 }, socks: .2 }, legend: [],
    // its legend, the elder of the wildcats (docs/ART-GUIDE.md 0c): the meadow's old queen, big and broad, a lion's ruff of
    // cheek fur gone pale with age, long claws, a collar of beads round each leg, and her crown
    levels: [null, null, null,
      { body: { hgt: .8, len: .72, chest: .44 }, head: { frost: true }, coat: { beads: true, socks: .3 }, features: ["crown",
        { kind: "ruff", size: .32, count: 18, mat: "BELLY" },
        { kind: "claws", size: .16 },
      ] }] },
  // the savanna's lion (a journey kind: unknown-08's, the hot south): a big tawny cat, a spotted cub, a lean young with a fuzz of mane,
  // the adult's dark mane; its legend the sun's: a mane of flame-locks, its eyes lit, sun-fire rising off it
  { id: "lion", name: "Lion", template: "quadruped", builder: "quad", palette: { hue: .075, sat: .58, val: .66, belly: "white", magic: .09 }, body: { hgt: 1.4, len: .78, chest: .6, tuck: .7, neck: .3, neckAng: .55, neckW: .44, hr: .25, legW: 1.05, bw: .27 }, head: { snout: .85, snoutD: .78, snoutTaper: .8, cheeks: true, whiskers: true }, parts: { ears: { kind: "round", size: .7 }, tail: "tuft", feet: "paw" }, coat: { belly: true }, legend: ["mane"],
    levels: [
      { body: { len: .5, chest: .4, tuck: .45, hr: .3, legW: 1.3 }, head: { snout: .45 }, parts: { ears: { kind: "round", size: 1 } }, coat: { spots: true } },
      { body: { len: .74, chest: .52, tuck: .6, legW: 1, neckW: .4 }, head: { snout: .65 }, features: [{ kind: "ruff", size: .1, count: 10, mat: "BODY2" }] },
      { body: { front: 1.1, legW: 1.2, bw: .32, hgt: 1.35 }, head: { snout: .65 }, features: [{ kind: "ruff", size: .3, count: 22, mat: "BODY3" }, { kind: "mane", from: .7, to: 1, height: .2, count: 8, lean: .55, mat: "BODY3" }] },
      { body: { front: 1.2, humpK: .6, legW: 1.35, bw: .34, len: .74 }, head: { snout: .7, eyeGlow: true }, features: [
        { kind: "ruff", size: .42, count: 28, mat: "BODY3" },
        { kind: "mane", from: .6, to: 1, height: .14, count: 10, lean: .7, mat: "BODY3" },
        { kind: "wisps", at: "mane", size: .28, count: 8, from: .5, to: 1, mat: "MAGIC2", lift: .3 },
      ] },
    ] },
  // the plains' cheetah (a journey kind: unknown-24's, the hot south): built to sprint, a greyhound of a cat. A very deep, narrow
  // chest, a waist tucked up tight, its spine arched, long thin legs, a small round head with small ears, solid black spots, black
  // tear lines and a long heavy ringed tail, its rudder; the cub in its silver mantle; its legend the wind's: longer and leaner still,
  // its tears lit, wind streaming off its back
  { id: "cheetah", name: "Cheetah", template: "quadruped", builder: "quad", palette: { hue: .1, sat: .6, val: .84, belly: "white", magic: .13 }, body: { hgt: 1.4, len: .66, chest: .47, tuck: .86, neck: .36, neckAng: .5, neckW: .24, hr: .17, legW: .58, bw: .17, back: "arch", archK: 1.8 }, head: { snout: .4, snoutD: .75, snoutTaper: .85, whiskers: true, tears: true }, parts: { ears: { kind: "round", size: .5 }, tail: "ringed", feet: "paw" }, coat: { belly: true, spots: "solid" }, legend: ["mane"], texture: { kind: "fur", size: 3, lumps: .0015 },
    levels: [
      { body: { len: .5, chest: .42, tuck: .5, hr: .25, legW: .9, bw: .22, archK: .6 }, head: { snout: .35 }, parts: { ears: { kind: "round", size: .7 } }, features: [{ kind: "mane", from: .15, to: 1, height: .1, count: 14, lean: .7, mat: "BELLY" }] },
      { body: { len: .64, chest: .46, tuck: .8, legW: .6, archK: 1.4 }, features: [{ kind: "mane", from: .6, to: 1, height: .05, count: 6, lean: .8, mat: "BELLY" }] },
      null,
      { body: { len: .72, legW: .62, tuck: .9, hgt: 1.5, archK: 2.2 }, head: { snout: .45, eyeGlow: true, tears: "glow" }, features: [
        { kind: "mane", from: .2, to: .95, height: .05, count: 14, lean: .9, mat: "BODY" },
        { kind: "wisps", at: "mane", size: .26, count: 9, from: .05, to: .95, mat: "MAGIC2", lift: .1 },
      ] },
    ] },
  // the frost cave's frost wyrm (a journey kind: unknown-17's, mountains and glaciers): a wingless ice dragon, long and low, a
  // long neck and a crocodile's snout, swept-back horns, a crest of ice-blue plates and a long tapering tail; its legend the thing
  // that makes it a wyrm: a body and tail so long it winds like a river of ice, great horns and a beard of icicles
  { id: "frostwyrm", name: "Frost wyrm", template: "quadruped", builder: "quad", palette: { hue: .6, sat: .55, val: .9, belly: "white", accent: [.55, .1, .98], magic: .52, flower: [232, 184, 72] }, body: { hgt: 1.4, len: .95, chest: .52, tuck: .56, neck: .7, neckAng: .95, neckW: .3, hr: .21, legW: 1.0, bw: .27 }, head: { snout: 1.3, snoutD: .5, snoutTaper: .6, eyeK: .8, horn: { length: 3, curl: .7, twist: 1, back: .25, up: 0, r: .3, out: .2 } }, parts: { ears: { kind: "none" }, tail: "otter", feet: "paw", horns: "twist" }, coat: { belly: true, ridge: 1.4, ridgeMat: "BELLY" }, legend: ["mane"], texture: { kind: "scales" },
    levels: [
      { body: { len: .7, neck: .4, hr: .3, legW: 1.2 }, head: { snout: .8, horn: { length: 1.4, curl: .2, twist: 1, r: .28 } }, coat: { ridge: .8 } },
      { body: { len: 1.0, neck: .55 }, head: { snout: 1.2, horn: { length: 2.4, curl: .3, twist: 1, r: .3 } } },
      { features: [{ kind: "claws", size: .14 }] },
      { body: { len: 1.2, hgt: 1.6, neck: .8, legW: 1.2, front: 1.08 }, head: { snout: 1.45, frost: true, hornBroken: true, horn: { length: 4.6, curl: .8, twist: 1.5, back: .3, up: 0, r: .4, out: .25 } }, coat: { scars: 6, hoard: true }, features: [
        { kind: "ruff", size: .34, count: 22, mat: "BELLY" }, // a beard of icicles grown over aeons
        { kind: "claws", size: .24 },
      ] },
    ] },
  // the eyrie's griffin (a journey kind: unknown-18's, mountains and glaciers): an eagle's white head, hooked gold beak and
  // feathered ear tufts on a lion's tawny body, eagle's wings and talons on its forelegs, a lion's tufted tail; its legend the thing
  // that makes it a griffin: wings vast as a sail, a crest of long white feathers, gold talons
  { id: "griffin", name: "Griffin", template: "quadruped", builder: "quad", palette: { hue: .08, sat: .5, val: .72, belly: "white", accent: [.12, .75, .95], magic: .12, flower: [226, 176, 64] }, body: { hgt: 1.5, len: .72, chest: .55, tuck: .66, neck: .32, neckAng: .75, neckW: .4, hr: .25, legW: 1.05, bw: .28 }, head: { beak: 1, eyeK: .9, mask: true }, parts: { ears: { kind: "tuft", size: .9 }, tail: "tuft", feet: "paw" }, coat: { belly: true }, legend: ["mane"], texture: { kind: "feathers" },
    levels: [
      { body: { len: .5, hr: .32, legW: 1.2 }, head: { beak: .7 }, features: [{ kind: "wings", feathered: true, nub: true, size: .8, mat: "BELLY", mat2: "BODY" }] },
      { body: { len: .7 }, features: [{ kind: "wings", feathered: true, size: .8, mat: "BODY", mat2: "BELLY" }, { kind: "ruff", size: .1, count: 10, mat: "BELLY" }] },
      { features: [{ kind: "wings", feathered: true, size: 1, mat: "BODY", mat2: "BELLY" }, { kind: "ruff", size: .16, count: 14, mat: "BELLY" }, { kind: "claws", size: .16, mat: "ACCENT" }] },
      { body: { hgt: 1.6, len: .78, front: 1.12, legW: 1.15 }, head: { beak: 1.2 }, coat: { scars: 4, harness: true }, features: [
        { kind: "wings", feathered: true, size: 1.25, mat: "BODY", mat2: "BELLY" },
        { kind: "ruff", size: .3, count: 20, mat: "BELLY" },
        { kind: "claws", size: .26, mat: "FLOWER" },
      ] },
    ] },
  // the misty terraces' red panda (Ed, 2026-10-12: "a few more animals"; its island to the east-north-east, the mountains): rusty
  // red, a white mask and ear rims, dark legs, a thick ringed tail
  { id: "redpanda", name: "Red panda", template: "quadruped", builder: "quad", palette: { hue: .03, sat: .8, val: .62, belly: "white" }, body: { hgt: .62, len: .6, chest: .3, tuck: .36, neck: .2, neckAng: .6, neckW: .42, hr: .32, legW: .9, back: "arch" }, head: { snout: .45, snoutD: .7, snoutTaper: .75, mask: true, whiskers: true, eyeK: 1.4 }, parts: { ears: { kind: "round", size: 1.2 }, tail: "panda", feet: "paw" }, coat: { legMat: "BODY3" }, legend: [],
    // its legend, the elder of the red pandas (docs/ART-GUIDE.md 0c): an old mountain sage, big and round, its whiskers and
    // muzzle gone white, a long pale ruff like a beard, its ringed tail heavier, the long claws of a life in the trees, and
    // prayer beads wound round its legs
    levels: [null, null, null,
      { body: { hgt: .72, len: .66, chest: .32 }, head: { frost: true }, coat: { beads: true, socks: .3 }, features: [
        { kind: "ruff", size: .24, count: 16, mat: "BELLY" },
        { kind: "claws", size: .14 },
      ] }] },
  { id: "spider", name: "Spider", template: "insectoid", builder: "spider", palette: { hue: .07, sat: .45, val: .4 }, legend: ["eyesRing"] , texture: { kind: "bristles", size: 2 } },
  { id: "dormouse", name: "Dormouse", template: "quadruped", builder: "quad", palette: { hue: .09, sat: .6, val: .75, belly: "white" }, body: { hgt: .38, len: .45, chest: .35, tuck: .38, neck: .15, neckAng: .6, neckW: .4, hr: .34, legW: .8, back: "arch" }, head: { snout: .45, snoutD: .7, whiskers: true, eyeK: 1.6 }, parts: { ears: { kind: "round", size: .85 }, tail: "dormouse", feet: "paw" }, coat: { belly: true }, legend: [], elder: { kind: "dormouse", tail: true, eye: "EYE" } },
  { id: "beetle", name: "Stag beetle", template: "insectoid", builder: "beetle", palette: { hue: .78, sat: .5, val: .35 }, legend: ["horn", "crystals"] },
];

