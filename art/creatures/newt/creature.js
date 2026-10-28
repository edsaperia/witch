// newt: what the game's rules and sounds know about it, section by section (the config files' per-species entries, 2026-10-13;
// its genome, sigil, sleeping form and nap are its other files). The schema: config/schema/creature.schema.json.
export const CREATURE_NEWT = {
  movement: {
    speed: 11,
    accel: 30,
    fight: [{ kind: "keepRange", w: 1, near: 0.5, far: 0.85 }, { kind: "separation", w: 0.6, radius: 10.5 }]
  },
  radius: 0.45,
  voice: { family: "amphibian", pitch: 1.9, am: [56, 0.6] },
  character: { posture: { head: [0.03, 0.01], body: -0.01 }, quirk: "tailflick", every: [4, 8], for: 1 },
  pack: {
    melee: null,
    ranged: { name: "spit", range: 12, shots: [0, 1, 2], spread: 10, tint: "red" },
    special: "wall",
    retreat: "water",
    rhythm: "slow",
    pressure: 3,
    call: "the gleam",
    tells: { ranged: "throat pulses", special: "the gleam" }
  }
};
