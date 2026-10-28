// armadillo: what the game's rules and sounds know about it, section by section (the config files' per-species entries, 2026-10-13;
// its genome, sigil, sleeping form and nap are its other files). The schema: config/schema/creature.schema.json.
export const CREATURE_ARMADILLO = {
  movement: {
    speed: 10,
    accel: 28,
    pursuit: 13,
    fight: [{ kind: "arrive", w: 1 }, { kind: "separation", w: 0.6, radius: 6.5 }],
    move: {
      kind: "charge",
      cooldown: 6,
      from: 6,
      to: 28,
      speed: 24,
      time: 1.6,
      windup: 0.7,
      accel: 30,
      brake: 22,
      turn: 140,
      overshoot: 6,
      curl: 0.5
    }
  },
  radius: 0.5,
  voice: { family: "small", pitch: 0.75, noise: 0.35 },
  pack: {
    melee: { attacks: [null, "nip", "maul"] },
    ranged: null,
    special: "stampede",
    retreat: "rollApart",
    rhythm: "slow",
    pressure: 3,
    call: "the curl",
    tells: { melee: "crouch", special: "the curl" }
  }
};
