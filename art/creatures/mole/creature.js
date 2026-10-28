// mole: what the game's rules and sounds know about it, section by section (the config files' per-species entries, 2026-10-13;
// its genome, sigil, sleeping form and nap are its other files). The schema: config/schema/creature.schema.json.
export const CREATURE_MOLE = {
  movement: {
    speed: 13,
    accel: 50,
    fight: [{ kind: "arrive", w: 1 }, { kind: "separation", w: 0.6, radius: 7 }],
    move: { kind: "burrow", cooldown: 4, from: 10, speed: 1.4, time: 5 }
  },
  radius: 0.4,
  attacks: [null, "upheaval", "bigupheaval", "quake"],
  temperament: "curious",
  traits: ["burrower"],
  voice: { family: "small", pitch: 0.8, noise: 0.3 },
  character: { sprite: "look", every: [4, 8], for: 1 },
  pack: {
    melee: { attacks: [null, "nip", "maul"] },
    ranged: { name: "earth bolt", range: 15, shots: [0, 1, 1], size: [1, 1, 1.5], tint: "red", mound: true },
    special: "cloud",
    retreat: "burrowApart",
    rhythm: "steady",
    pressure: 3,
    call: "the mound moving",
    tells: { melee: "crouch", ranged: "digs", special: "the mound moving" }
  }
};
