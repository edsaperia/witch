// the step pyramid's feathered serpent (a journey kind: unknown-27's slot, the jungle west, ring 5; Ed, 2026-10-23, its biome's
// fantastic creature: "the serpent template plus feathers, in bright plumage"): an emerald serpent, gold-bellied, its neck raised in an S
// inside a ruff of scarlet, gold and turquoise feathers, a crest of plumes off its head, streamers off its tail. Its evolution: a hatchling
// with a fluff of a ruff, a young with its first streamers, the adult's full ruff and crest and wings beginning; the legend the plumed
// serpent of the temple: great feathered wings, a towering crest, its feathers' tips burning turquoise
export const GENOME_FEATHEREDSERPENT = { id: "featheredserpent", name: "Feathered serpent", template: "serpent", builder: "quetzal", palette: { hue: .39, sat: .62, val: .58, belly: "yellow", accent: [.13, .82, .96], magic: .48, flower: [232, 46, 58] }, legend: [], texture: { kind: "scales", size: 3 },
  levels: [
    { body: { thick: .85, rise: .8, ruff: .4, plumes: 1, crest: .3 } },
    { body: { thick: .95, rise: 1, ruff: .75, plumes: 2, crest: .7 } },
    { body: { thick: 1.1, rise: 1.15, ruff: 1, plumes: 3, crest: 1, wings: .55 } },
    { body: { thick: 1.25, rise: 1.3, ruff: 1.35, plumes: 5, crest: 1.3, wings: 1.1, glow: true } },
  ] };
