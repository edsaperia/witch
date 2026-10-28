// ibex: what the game's rules and sounds know about it, section by section (the config files' per-species entries, 2026-10-13;
// its genome, sigil, sleeping form and nap are its other files). The schema: config/schema/creature.schema.json.
export const CREATURE_IBEX = {
  movement: {
    speed: 15,
    accel: 45,
    fight: [{ kind: "arrive", w: 1 }, { kind: "slot", w: 0.8 }, { kind: "separation", w: 0.6, radius: 7.5 }],
    move: {
      kind: "charge",
      cooldown: 5,
      from: 7,
      to: 28,
      speed: 31,
      time: 1,
      windup: 1,
      backup: 5,
      accel: 70,
      brake: 40,
      turn: 140,
      overshoot: 5
    }
  },
  radius: 0.85,
  temperament: "skittish",
  voice: { family: "big", pitch: 1.85, am: [16, 0.45], vowel: 0.8, noise: 0.15 },
  character: { posture: { head: [0.05, 0.02], body: 0 }, quirk: "stomp", every: [5, 9], for: 0.9 },
  pack: {
    melee: { attacks: [null, "nip", "maul"], knockback: 6 },
    ranged: { name: "dislodged stone", range: 14, shots: [0, 1, 1], tint: "red" },
    special: "knockback",
    retreat: "trees",
    rhythm: "steady",
    pressure: 1,
    call: "backs off uphill",
    tells: { melee: "head down", ranged: "a hoof scrape", special: "backs off uphill" }
  }
};
