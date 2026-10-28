// dormouse: what the game's rules and sounds know about it, section by section (the config files' per-species entries, 2026-10-13;
// its genome, sigil, sleeping form and nap are its other files). The schema: config/schema/creature.schema.json.
export const CREATURE_DORMOUSE = {
  movement: {
    speed: 13,
    accel: 180,
    fight: [
      { kind: "arrive", w: 0.8 },
      { kind: "slot", w: 1.2 },
      { kind: "wander", w: 0.6 },
      { kind: "strafe", w: 0.6, swap: 0.35 },
      { kind: "dodge", w: 1.4, radius: 16 },
      { kind: "separation", w: 0.6, radius: 5 }
    ],
    tactics: [{ kind: "hitAndRun", w: 1 }]
  },
  radius: 0.3,
  temperament: "curious",
  traits: ["nimble"],
  voice: { family: "small", pitch: 1.3 },
  character: { posture: { head: [0, 0.03], body: 0 }, quirk: "sniff", every: [2, 5], for: 0.8 },
  pack: {
    melee: { attacks: [null, "nip", "maul"] },
    ranged: { name: "nut bolt", range: 12, shots: [0, 1, 2], spread: 10, tint: "red" },
    special: "rally",
    retreat: "freeze",
    rhythm: "steady",
    pressure: 3,
    call: "a yawn",
    tells: { melee: "crouch", ranged: "winds back", special: "stretches" }
  }
};
