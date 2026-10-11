  // ---- north biome concepts (2026-10-11, not in the game) ----
  { id: "reindeer", name: "Reindeer", template: "quadruped", builder: "quad", palette: { hue: .07, sat: .38, val: .42, belly: "white" }, body: { hgt: 1.05, len: .64, chest: .5, tuck: .58, neck: .36, neckAng: .55, neckW: .44, hr: .25, legW: 1.1, back: "hump", humpK: .8 }, head: { snout: 1.1, snoutD: .72, snoutTaper: .85, muzzle: true }, parts: { ears: { kind: "small", size: 1 }, tail: "stub", feet: "hoof", antlers: "branch" }, coat: { belly: true, socks: .22, rump: true }, legend: ["antlersGlow"],
    levels: [
      { body: { len: .52, legW: 1.3 }, head: { snout: .7 }, coat: { spots: true } },
      null,
      { body: { hgt: 1.12, humpK: 1.1 }, features: [{ kind: "ruff", size: .22, count: 16 }] },
      { body: { hgt: 1.2, humpK: 1.3, legW: 1.25 }, head: { eyeGlow: true, frost: true, features: ["antlersGlow"] }, features: [{ kind: "ruff", size: .32, count: 22 }, { kind: "mane", from: .55, to: 1, height: .22, count: 12, lean: .4, mat: "BELLY" }] },
    ] },
  { id: "muskox", name: "Musk ox", template: "quadruped", builder: "quad", palette: { hue: .07, sat: .45, val: .3 }, body: { hgt: .95, len: .7, chest: .26, tuck: .3, neck: .14, neckAng: -.1, neckW: .62, hr: .3, legW: 1.3, back: "hump", front: 1.25, humpK: 2.2, bw: .4 }, head: { snout: .7, snoutD: .75, snoutTaper: .85, muzzle: true, horn: { length: .8, r: .26, curl: .55, twist: .2, ridges: 0, segs: 8, out: .45, mat2: "BELLY" } }, parts: { ears: { kind: "small", size: .5 }, tail: "stub", feet: "hoof", horns: "twist" }, coat: { shaggy: true, legMat: "BELLY" }, legend: [],
    levels: [
      { body: { len: .55, chest: .3, tuck: .34, humpK: 1 }, head: { horn: { length: .2, r: .2, curl: .2, twist: 0, segs: 4, out: .3, ridges: 0 } } },
      { features: [{ kind: "mane", belly: true, from: .05, to: .95, height: .18, count: 22, lean: .08 }] },
      { features: [{ kind: "mane", belly: true, from: .02, to: 1, height: .3, count: 30, lean: .06 }, { kind: "mane", from: .3, to: .95, height: .16, count: 12, lean: .3 }] },
      { body: { humpK: 2.8, front: 1.35, legW: 1.6, len: .82 }, head: { eyeGlow: true, frost: true, horn: { length: 1.5, r: .4, curl: .7, twist: .3, ridges: 2, segs: 12, out: .55, mat2: "WEB", tip: "MAGIC" } }, features: [
        { kind: "mane", belly: true, from: 0, to: 1, height: .42, count: 36, lean: .05 },
        { kind: "mane", from: .15, to: 1, height: .22, count: 16, lean: .3 },
        { kind: "stones", from: .15, to: .8, count: 5, height: .5, mat: "WEB" },
        { kind: "wisps", at: "horns", size: .26, mat: "MAGIC" },
      ] },
    ] },
  { id: "wolverine", name: "Wolverine", template: "quadruped", builder: "quad", palette: { hue: .06, sat: .5, val: .28 }, body: { hgt: .72, len: .7, chest: .3, tuck: .36, neck: .24, neckAng: .3, neckW: .5, hr: .29, legW: 1.25, back: "arch", bw: .34 }, head: { snout: .7, snoutD: .62, snoutTaper: .7, face: "dark" }, parts: { ears: { kind: "round", size: .75 }, tail: "bushy", feet: "paw" }, coat: { saddle: true }, legend: ["mane"],
    levels: [
      { body: { len: .55, hr: .32 }, head: { snout: .5 }, parts: { tail: "puff" } },
      null,
      { body: { hgt: .78, legW: 1.4 }, features: [{ kind: "claws", size: .15, mat: "BELLY" }, { kind: "mane", from: .35, to: .95, height: .08, count: 12, lean: .6 }] },
      { body: { hgt: .85, legW: 1.6, front: 1.15 }, head: { eyeGlow: true, frost: true }, features: [
        { kind: "claws", size: .26, mat: "WEB" },
        { kind: "mane", from: .15, to: 1, height: .34, count: 22, lean: .3, mat: "WEB" },
        { kind: "wisps", at: "mane", size: .26, count: 6, from: .1, to: .9, mat: "MAGIC", lift: .25 },
      ] },
    ] },
  { id: "lemming", name: "Lemming", template: "quadruped", builder: "quad", palette: { hue: .08, sat: .6, val: .62, belly: "white" }, body: { hgt: .4, len: .5, chest: .32, tuck: .34, neck: .1, neckAng: .4, neckW: .62, hr: .33, legW: 1.1, bw: .42 }, head: { snout: .42, snoutD: .75, snoutTaper: .9, whiskers: true, face: "dark" }, parts: { ears: { kind: "round", size: .45 }, tail: "stub", feet: "paw" }, coat: { belly: true, saddle: true }, legend: ["mane"],
    levels: [
      { body: { len: .44 } },
      null,
      { features: [{ kind: "ruff", size: .14, count: 12 }] },
      { body: { hgt: .55, len: .6, bw: .5 }, head: { eyeGlow: true, frost: true }, features: [
        { kind: "ruff", size: .26, count: 18 },
        { kind: "stones", from: .3, to: .75, count: 3, height: .3, mat: "WEB" },
        { kind: "wisps", at: "mane", size: .28, count: 5, from: .15, to: .85, mat: "MAGIC", lift: .2 },
      ] },
    ] },
  { id: "mammoth", name: "Mammoth", template: "quadruped", builder: "quad", palette: { hue: .06, sat: .55, val: .4 }, body: { hgt: 1.35, len: .68, chest: .5, tuck: .56, neck: .1, neckAng: .25, neckW: .72, hr: .4, legW: 1.75, back: "hump", front: 1.3, humpK: 2.6, bw: .4 }, head: { snout: .4, snoutD: .8, snoutTaper: .95, tuskSize: 1.2, tuskCurl: 1.1 }, parts: { ears: { kind: "small", size: .55 }, tail: "thin", feet: "hoof", tusks: true }, coat: { shaggy: true }, legend: [],
    levels: [
      { body: { len: .55, humpK: 1.4 }, head: { tuskSize: 0 }, features: [{ kind: "trunk", length: .5, width: .7, curl: 1.2 }] },
      { head: { tuskSize: .7, tuskCurl: .6 }, features: [{ kind: "trunk", length: .5, width: .7, curl: 1.2 }, { kind: "mane", belly: true, from: .1, to: .9, height: .12, count: 14, lean: .1 }] },
      { head: { tuskSize: 1.5, tuskCurl: 1.2 }, features: [{ kind: "trunk", length: .5, width: .7, curl: 1.2 }, { kind: "mane", belly: true, from: .02, to: 1, height: .28, count: 26, lean: .08 }] },
      { body: { humpK: 3.2, front: 1.4, legW: 2 }, head: { eyeGlow: true, frost: true, tuskSize: 2.6, tuskCurl: 1.7 }, features: [
        { kind: "trunk", length: .5, width: .7, curl: 1.2 },
        { kind: "mane", belly: true, from: 0, to: 1, height: .4, count: 34, lean: .06 },
        { kind: "wisps", at: "tusks", size: .34, mat: "MAGIC" },
      ] },
    ] },
