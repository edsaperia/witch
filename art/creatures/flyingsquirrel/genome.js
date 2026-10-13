// the cold rainforest's flying squirrel (Ed, 2026-10-12: a new animal for a later island, unknown-12's): a squirrel built for the night,
// huge dark eyes, a flat feathered tail and loose furred skin from wrist to ankle that spreads into a glide; its legend's membrane the night sky
export const GENOME_FLYINGSQUIRREL = { id: "flyingsquirrel", name: "Flying squirrel", template: "quadruped", builder: "quad", palette: { hue: .06, sat: .3, val: .42, belly: "white" }, body: { hgt: .5, len: .5, chest: .32, tuck: .36, neck: .16, neckAng: .75, neckW: .38, hr: .33, legW: .7, haunch: 1.1, back: "arch" }, head: { snout: .4, snoutD: .65, whiskers: true, eyeK: 1.45 }, parts: { ears: { kind: "round", size: .9 }, tail: "glider", feet: "paw" }, coat: { belly: true }, legend: ["starTail"], texture: { kind: "fur", size: 2 },
  levels: [
    { head: { eyeK: 1.5 }, features: [{ kind: "patagium", spread: .3 }] },
    { body: { tailL: .75 }, features: [{ kind: "patagium", spread: .2 }] },
    { features: [{ kind: "patagium", spread: .75 }] },
    { body: { tailL: 1.35, tailK: 1.5 }, head: { eyeGlow: true, frost: true }, features: [{ kind: "patagium", spread: 1.25, mat: "BODY2", rim: "MAGIC2", stars: true }, { kind: "moss", count: 6, size: .09 }] },
  ] };
