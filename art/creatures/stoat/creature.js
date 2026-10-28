// stoat: what the game's rules and sounds know about it, section by section (the config files' per-species entries, 2026-10-13;
// its genome, sigil, sleeping form and nap are its other files). The schema: config/schema/creature.schema.json.
export const CREATURE_STOAT = {
  movement: {
    speed: 19,
    accel: 160,
    fight: [
      { kind: "arrive", w: 1 },
      { kind: "slot", w: 1.2 },
      { kind: "strafe", w: 0.8, swap: 0.4 },
      { kind: "dodge", w: 1.4, radius: 20 },
      { kind: "separation", w: 0.6, radius: 6 }
    ],
    tactics: [{ kind: "hitAndRun", w: 1 }]
  },
  radius: 0.45,
  temperament: "skittish",
  traits: ["nimble"],
  voice: { family: "small", pitch: 1.1, trill: [24, 80] },
  character: { posture: { head: [0, 0.05], body: 0 }, quirk: "perk", every: [3, 6], for: 1 },
  pack: {
    melee: { attacks: [null, "nip", "maul"] },
    ranged: { name: "dart of light", range: 10, shots: [0, 1, 2], spread: 8, speed: 1.4, tint: "red" },
    special: "confusion",
    retreat: "circle",
    rhythm: "tight",
    pressure: 2,
    call: "the dance",
    tells: { melee: "crouch", ranged: "sways", special: "the dance" }
  }
};
