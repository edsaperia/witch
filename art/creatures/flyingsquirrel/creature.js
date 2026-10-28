// flyingsquirrel: what the game's rules and sounds know about it, section by section (the config files' per-species entries, 2026-10-13;
// its genome, sigil, sleeping form and nap are its other files). The schema: config/schema/creature.schema.json.
export const CREATURE_FLYINGSQUIRREL = {
  movement: {
    speed: 16,
    accel: 140,
    fight: [
      { kind: "keepRange", w: 1, near: 0.45, far: 0.8 },
      { kind: "strafe", w: 0.5, swap: 1.2 },
      { kind: "separation", w: 0.6, radius: 6.5 }
    ],
    tactics: [{ kind: "hitAndRun", w: 1 }],
    move: { kind: "leap", cooldown: 3.2, from: 10, to: 34, time: 1.3, height: 4, strike: true },
    glide: { min: 9, speed: 11, height: 5, chance: 0.75 }
  },
  radius: 0.4,
  voice: { family: "small", pitch: 1.65, extra: 2, gap: 0.18, volume: 0.7 },
  character: { posture: { head: [0, 0.05], body: 0 }, quirk: "sniff", every: [2, 5], for: 0.6 },
  pack: {
    melee: { attacks: [null, "nip", "maul"] },
    ranged: { name: "acorn bolt", range: 12, shots: [0, 1, 3], spread: 14, tint: "red" },
    special: "scatter",
    retreat: "trees",
    rhythm: "tight",
    pressure: 2,
    call: "the launch",
    tells: { melee: "the launch", ranged: "winds back", special: "the launch" }
  }
};
