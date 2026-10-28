// stag: what the game's rules and sounds know about it, section by section (the config files' per-species entries, 2026-10-13;
// its genome, sigil, sleeping form and nap are its other files). The schema: config/schema/creature.schema.json.
export const CREATURE_STAG = {
  movement: {
    speed: 16,
    accel: 30,
    fight: [{ kind: "arrive", w: 1 }, { kind: "slot", w: 1 }, { kind: "separation", w: 0.6, radius: 8 }],
    tactics: [{ kind: "pincer", w: 1 }],
    move: {
      kind: "charge",
      cooldown: 6,
      from: 10,
      to: 45,
      speed: 32,
      time: 1.6,
      windup: 0.6,
      accel: 45,
      brake: 30,
      turn: 120,
      overshoot: 8,
      pair: true
    }
  },
  radius: 1.2,
  temperament: "skittish",
  traits: ["heavy"],
  voice: { family: "big", pitch: 1.2, glide: 0.8, dur: 1.6, noise: 0.2 },
  character: { posture: { head: [-0.02, 0.07], body: 0.01 }, quirk: "perk", every: [5, 10], for: 1.6 },
  pack: {
    melee: { attacks: [null, "nip", "maul"] },
    ranged: { name: "antler light", range: 14, shots: [0, 1, 2], spread: 10, tint: "red" },
    special: "stampede",
    retreat: "splitBack",
    rhythm: "steady",
    pressure: 2,
    call: "heads down",
    tells: { melee: "head down", ranged: "antlers glow", special: "heads down" }
  }
};
