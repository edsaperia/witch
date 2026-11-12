// the turtle (Ed, 2026-11-11: "Martens and Stoats are pretty similar, maybe we should have a different animal. Bees? Turtles?";
// "keep both": kept for an island of its own, which it does not have yet): a pond turtle, a flat body slung between four splayed
// legs under a domed shell. It is drawn as a mesh (art/mesh/turtle.js: a hatchling in half its egg, a smooth young, a keeled
// adult, and the oracle whose whole shell is rune-cut plate); this record is what the generated art makes of it when the meshes
// are off (the link's meshCreatures=0): the shelled squat body the armadillo has, in a turtle's greens.
export const GENOME_TURTLE = { id: "turtle", name: "Turtle", template: "squat", builder: "armadillo", palette: { hue: .26, sat: .32, val: .5 }, legend: [], texture: { kind: "plates" },
  levels: [{ body: { soft: 1, dome: 1.3, head: 1.35, snout: .5, ears: .4, tail: .4, legs: 1.3 } }, { body: { dome: 1.15, head: 1.1, snout: .5, ears: .4, tail: .5, legs: 1.1 } }, { body: { dome: 1.2, snout: .55, ears: .4, tail: .5 } }, { body: { dome: 1.35, snout: .55, ears: .4, tail: .5 } }] };
