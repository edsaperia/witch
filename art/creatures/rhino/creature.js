// rhino: what the game's rules and sounds know about it, section by section (the config files' per-species entries, 2026-10-13;
// its genome, sigil, sleeping form and nap are its other files). The schema: config/schema/creature.schema.json.
export const CREATURE_RHINO = {
  movement: {
    speed: 13,
    accel: 18,
    fight: [{ kind: "arrive", w: 1 }, { kind: "separation", w: 0.5, radius: 9 }],
    move: {
      kind: "charge",
      cooldown: 6,
      from: 12,
      to: 50,
      speed: 32,
      time: 1.8,
      windup: 0.8,
      accel: 30,
      brake: 25,
      turn: 90,
      overshoot: 12
    }
  },
  radius: 1.5,
  voice: { family: "big", pitch: 0.7, noise: 0.4, am: [30, 0.5], volume: 1.3 },
  character: { posture: { head: [0.04, -0.07], body: 0 }, quirk: "stomp", every: [5, 9], for: 1.2 },
  pack: {
    melee: { attacks: [null, "nip", "maul"], knockback: 8 },
    ranged: { name: "dust bolt", range: 10, shots: [0, 1, 1], tint: "red" },
    special: "knockback",
    specialWith: { throw: 12 },
    retreat: "circle",
    rhythm: "slow",
    pressure: 1,
    call: "paws the ground",
    tells: { melee: "head down", ranged: "a snort", special: "paws the ground" }
  }
};
