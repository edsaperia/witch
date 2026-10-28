// marten: what the game's rules and sounds know about it, section by section (the config files' per-species entries, 2026-10-13;
// its genome, sigil, sleeping form and nap are its other files). The schema: config/schema/creature.schema.json.
export const CREATURE_MARTEN = {
  movement: {
    speed: 17,
    accel: 100,
    fight: [
      { kind: "arrive", w: 1 },
      { kind: "slot", w: 1.3 },
      { kind: "separation", w: 0.6, radius: 7 },
      { kind: "cohesion", w: 0.3, radius: 21 }
    ],
    tactics: [{ kind: "flank", w: 2 }, { kind: "pincer", w: 1 }]
  },
  radius: 0.55,
  temperament: "skittish",
  voice: { family: "small", pitch: 0.9, trill: [20, 60] },
  character: { posture: { head: [0.02, 0.02], body: -0.01 }, quirk: "sniff", every: [3, 6], for: 1 },
  pack: {
    melee: { attacks: [null, "nip", "maul"] },
    ranged: { name: "ember bolt", range: 12, shots: [0, 1, 2], spread: 10, tint: "red" },
    special: "call",
    retreat: "leapfrog",
    rhythm: "tight",
    pressure: 2,
    call: "chirr",
    tells: { melee: "crouch", ranged: "chirrs", special: "head up" }
  }
};
