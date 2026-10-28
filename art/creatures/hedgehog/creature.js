// hedgehog: what the game's rules and sounds know about it, section by section (the config files' per-species entries, 2026-10-13;
// its genome, sigil, sleeping form and nap are its other files). The schema: config/schema/creature.schema.json.
export const CREATURE_HEDGEHOG = {
  movement: {
    speed: 10,
    accel: 30,
    pursuit: 14,
    fight: [{ kind: "arrive", w: 1 }, { kind: "separation", w: 0.6, radius: 6 }],
    move: {
      kind: "charge",
      cooldown: 5,
      from: 6,
      to: 30,
      speed: 22,
      time: 1.6,
      windup: 0.6,
      accel: 30,
      brake: 25,
      turn: 160,
      overshoot: 5,
      curl: 0.3
    }
  },
  radius: 0.4,
  temperament: "curious",
  traits: ["armoured"],
  voice: { family: "small", pitch: 0.9, noise: 0.4, pure: false, wave: "sawtooth" },
  character: { sprite: "puff", every: [4, 8], for: 0.9 },
  pack: {
    melee: { attacks: [null, "nip", "maul"] },
    ranged: { name: "spine fan", range: 12, shots: [0, 1, 3], spread: 30, tint: "red" },
    special: "stampede",
    retreat: "rollApart",
    rhythm: "slow",
    pressure: 3,
    call: "bristle",
    tells: { melee: "crouch", ranged: "bristles up", special: "the curl" }
  }
};
