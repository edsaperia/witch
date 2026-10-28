// otter: what the game's rules and sounds know about it, section by section (the config files' per-species entries, 2026-10-13;
// its genome, sigil, sleeping form and nap are its other files). The schema: config/schema/creature.schema.json.
export const CREATURE_OTTER = {
  movement: {
    speed: 17,
    accel: 130,
    fight: [
      { kind: "arrive", w: 1 },
      { kind: "strafe", w: 0.7, swap: 0.7 },
      { kind: "dodge", w: 1.3, radius: 18 },
      { kind: "separation", w: 0.6, radius: 7 }
    ]
  },
  radius: 0.7,
  temperament: "curious",
  traits: ["nimble"],
  voice: { family: "whistler", volume: 0.7 },
  character: { posture: { head: [0.02, 0.02], body: -0.01 }, quirk: "shake", every: [5, 9], for: 0.8 },
  pack: {
    melee: { attacks: [null, "nip", "maul"] },
    ranged: { name: "water bolt", range: 12, shots: [0, 1, 2], spread: 10, tint: "red" },
    special: "rally",
    retreat: "water",
    rhythm: "steady",
    pressure: 2,
    call: "the whistle",
    tells: { melee: "crouch", ranged: "rears up", special: "the whistle" }
  }
};
