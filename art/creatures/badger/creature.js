// badger: what the game's rules and sounds know about it, section by section (the config files' per-species entries, 2026-10-13;
// its genome, sigil, sleeping form and nap are its other files). The schema: config/schema/creature.schema.json.
export const CREATURE_BADGER = {
  movement: {
    speed: 12,
    accel: 40,
    fight: [{ kind: "arrive", w: 1 }, { kind: "separation", w: 0.6, radius: 7 }],
    move: { kind: "dig", cooldown: 4, trigger: 6, time: 3, armour: 0.5 }
  },
  radius: 0.8,
  temperament: "curious",
  voice: { family: "big", pitch: 1.8, dur: 0.6 },
  character: { posture: { head: [0.04, -0.07], body: -0.02 }, quirk: "sniff", every: [3, 6], for: 1.4 },
  pack: {
    melee: { attacks: [null, "maul", "maul"], knockback: 8 },
    ranged: { name: "stone shard", range: 14, shots: [0, 1, 1], size: [1, 1, 1.5], tint: "red" },
    special: "cover",
    retreat: "hold",
    rhythm: "slow",
    pressure: 1,
    call: "the dig",
    tells: { melee: "crouch", ranged: "turns its back", special: "the dig" }
  }
};
