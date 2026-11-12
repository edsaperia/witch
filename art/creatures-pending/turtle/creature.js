// turtle: what the game's rules and sounds know about it, section by section (the config files' per-species entries, 2026-10-13;
// its genome, sigil, sleeping form and nap are its other files). The schema: config/schema/creature.schema.json.
// It has no island yet (Ed, 2026-11-11: "keep both"): slow and armoured, it holds its ground and draws into its shell. Its
// numbers are a first guess for Ed and the balance tools, not tuned.
export const CREATURE_TURTLE = {
  movement: {
    speed: 7,
    accel: 22,
    fight: [{ kind: "arrive", w: 1 }, { kind: "separation", w: 0.6, radius: 6.5 }]
  },
  radius: 0.55,
  temperament: "curious",
  traits: ["armoured"],
  voice: { family: "small", pitch: 0.6, noise: 0.4 },
  pack: {
    melee: { attacks: [null, "nip", "maul"] },
    ranged: null,
    special: "stampede",
    retreat: "rollApart",
    rhythm: "slow",
    pressure: 3,
    call: "a hiss",
    tells: { melee: "neck draws back", special: "into its shell" }
  }
};
