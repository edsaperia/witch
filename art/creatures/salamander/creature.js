// salamander: what the game's rules and sounds know about it, section by section (the config files' per-species entries, 2026-10-13;
// its genome, sigil, sleeping form and nap are its other files). The schema: config/schema/creature.schema.json.
export const CREATURE_SALAMANDER = {
  movement: {
    speed: 12,
    accel: 30,
    fight: [{ kind: "keepRange", w: 1, near: 0.5, far: 0.85 }, { kind: "separation", w: 0.6, radius: 10.5 }]
  },
  radius: 0.5,
  attacks: [null, "beam", "widebeam", "quake"],
  ranged: true,
  temperament: "skittish",
  voice: { family: "amphibian", pitch: 1.6, am: [48, 0.7] },
  character: { posture: { head: [0.03, -0.02], body: -0.01 }, quirk: "tailflick", every: [4, 8], for: 1.2 },
  pack: {
    melee: null,
    ranged: { name: "fire beam", range: 20, shots: [0, 1, 1], attacks: [null, "beam", "widebeam"], tint: "red" },
    special: "wall",
    retreat: "freeze",
    rhythm: "slow",
    pressure: 1,
    call: "the glow",
    tells: { ranged: "aim line", special: "the glow" }
  }
};
