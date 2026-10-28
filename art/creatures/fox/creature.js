// fox: what the game's rules and sounds know about it, section by section (the config files' per-species entries, 2026-10-13;
// its genome, sigil, sleeping form and nap are its other files). The schema: config/schema/creature.schema.json.
export const CREATURE_FOX = {
  movement: {
    speed: 18,
    accel: 90,
    fight: [
      { kind: "arrive", w: 1 },
      { kind: "slot", w: 1.4 },
      { kind: "strafe", w: 0.3, swap: 1.2 },
      { kind: "separation", w: 0.6, radius: 7 }
    ],
    tactics: [{ kind: "flank", w: 2 }, { kind: "surround", w: 1 }]
  },
  radius: 0.7,
  temperament: "curious",
  voice: { family: "canid", pitch: 1.5, glide: 0.8 },
  character: { posture: { head: [0.02, 0.03], body: 0 }, quirk: "perk", every: [4, 8], for: 1.1 },
  pack: {
    melee: { attacks: [null, "nip", "maul"] },
    ranged: { name: "fox-fire", range: 15, shots: [0, 1, 2], spread: 10, tint: "red" },
    special: "feint",
    retreat: "splitBack",
    rhythm: "steady",
    pressure: 2,
    call: "ears flat",
    tells: { melee: "crouch", ranged: "tail up", special: "ears flat" }
  }
};
