// squirrel: what the game's rules and sounds know about it, section by section (the config files' per-species entries, 2026-10-13;
// its genome, sigil, sleeping form and nap are its other files). The schema: config/schema/creature.schema.json.
export const CREATURE_SQUIRREL = {
  movement: {
    speed: 18,
    accel: 170,
    fight: [
      { kind: "arrive", w: 1 },
      { kind: "slot", w: 1.4 },
      { kind: "dodge", w: 1, radius: 18 },
      { kind: "separation", w: 0.6, radius: 6 }
    ],
    tactics: [{ kind: "hitAndRun", w: 1 }]
  },
  radius: 0.4,
  temperament: "curious",
  traits: ["nimble"],
  voice: { family: "small", pitch: 1.2, extra: 3, gap: 0.25, volume: 0.75 },
  character: { posture: { head: [0, 0.04], body: 0 }, quirk: "tailflick", every: [2, 4], for: 0.7 },
  pack: {
    melee: { attacks: [null, "nip", "maul"] },
    ranged: { name: "acorn bolts", range: 14, shots: [0, 1, 3], spread: 14, tint: "red" },
    special: "scatter",
    retreat: "trees",
    rhythm: "tight",
    pressure: 2,
    call: "rustle",
    tells: { melee: "crouch", ranged: "winds back", special: "a rustle in the crowns" }
  }
};
