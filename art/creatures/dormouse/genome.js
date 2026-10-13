export const GENOME_DORMOUSE = { id: "dormouse", name: "Dormouse", template: "quadruped", builder: "quad", palette: { hue: .09, sat: .6, val: .75, belly: "white" }, body: { hgt: .38, len: .45, chest: .35, tuck: .38, neck: .15, neckAng: .6, neckW: .4, hr: .34, legW: .8, back: "arch" }, head: { snout: .45, snoutD: .7, whiskers: true, eyeK: 1.6 }, parts: { ears: { kind: "round", size: .85 }, tail: "dormouse", feet: "paw" }, coat: { belly: true }, legend: [], elder: { kind: "dormouse", tail: true, eye: "EYE" },
  // growing up: a big-eyed baby with a short thin tail; a slim, leggy young, its tail not yet bushy; then the adult fattened for
  // its long sleep (its own record)
  levels: [
    { body: { hgt: .34, len: .4, chest: .38, tuck: .42 }, head: { snout: .35, eyeK: 1.9 }, parts: { ears: { kind: "round", size: 1.05 }, tail: "thin" } },
    { body: { hgt: .38, len: .52, chest: .28, tuck: .46, legW: .65, back: "flat" }, head: { snout: .5, eyeK: 1.75 }, parts: { ears: { kind: "round", size: 1.0 }, tail: "thin" } },
    null, null] };
