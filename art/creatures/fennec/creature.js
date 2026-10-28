// fennec: what the game's rules and sounds know about it, section by section (the config files' per-species entries, 2026-10-13;
// its genome, sigil, sleeping form and nap are its other files). The schema: config/schema/creature.schema.json.
export const CREATURE_FENNEC = {
  movement: {
    speed: 19,
    accel: 100,
    fight: [{ kind: "arrive", w: 1 }, { kind: "strafe", w: 0.5, swap: 0.9 }, { kind: "separation", w: 0.6, radius: 6 }],
    tactics: [{ kind: "flank", w: 2 }]
  },
  radius: 0.45,
  voice: { family: "canid", pitch: 2.1, glide: 0.9 },
  character: { posture: { head: [0.02, 0.04], body: 0 }, quirk: "perk", every: [3, 6], for: 1.2 },
  pack: {
    melee: { attacks: [null, "nip", "maul"] },
    ranged: { name: "sand bolt", range: 12, shots: [0, 1, 2], spread: 10, tint: "red" },
    special: "mirage",
    retreat: "splitBack",
    rhythm: "tight",
    pressure: 2,
    call: "ears flat",
    tells: { melee: "crouch", ranged: "ears up", special: "ears flat" }
  }
};
