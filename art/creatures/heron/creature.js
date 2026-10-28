// heron: what the game's rules and sounds know about it, section by section (the config files' per-species entries, 2026-10-13;
// its genome, sigil, sleeping form and nap are its other files). The schema: config/schema/creature.schema.json.
export const CREATURE_HERON = {
  movement: {
    speed: 13,
    accel: 35,
    fight: [{ kind: "arrive", w: 1 }, { kind: "separation", w: 0.6, radius: 8 }],
    move: {
      kind: "charge",
      cooldown: 4,
      from: 5,
      to: 20,
      speed: 28,
      time: 0.6,
      windup: 0.9,
      accel: 70,
      brake: 40,
      turn: 120,
      overshoot: 3
    }
  },
  radius: 0.6,
  voice: {
    family: "bird",
    pitch: 0.5,
    pure: false,
    wave: "sawtooth",
    trill: [0, 0],
    glide: 0.8,
    vowel: 1,
    volume: 0.9
  },
  character: { sprite: "puff", every: [6, 11], for: 1.4 },
  pack: {
    melee: { attacks: [null, "nip", "maul"] },
    ranged: { name: "water jet", range: 18, shots: [0, 1, 1], speed: 1.4, size: [1, 1, 1.3], tint: "red" },
    special: "sync",
    retreat: "freeze",
    rhythm: "slow",
    pressure: 1,
    call: "a stillness",
    tells: { melee: "the neck draws back", ranged: "aim line", special: "a stillness, then a flash" }
  }
};
