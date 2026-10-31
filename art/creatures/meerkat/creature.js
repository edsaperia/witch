// meerkat: what the game's rules and sounds know about it, section by section (the config files' per-species entries, 2026-10-13;
// its genome, sigil, sleeping form and nap are its other files). The schema: config/schema/creature.schema.json.
export const CREATURE_MEERKAT = {
  movement: {
    speed: 18,
    accel: 165,
    fight: [
      { kind: "arrive", w: 1 },
      { kind: "slot", w: 1.3 },
      { kind: "strafe", w: 0.6, swap: 0.5 },
      { kind: "dodge", w: 1.3, radius: 20 },
      { kind: "separation", w: 0.6, radius: 6 }
    ],
    tactics: [{ kind: "hitAndRun", w: 1 }]
  },
  radius: 0.4,
  voice: { family: "small", pitch: 1.35, extra: 2, gap: 0.2 },
  character: { posture: { head: [0, 0.06], body: 0.01 }, quirk: "sentinel", every: [5, 9], for: 3.5 },
  pack: {
    melee: { attacks: [null, "nip", "maul"] },
    ranged: { name: "sand bolt", range: 10, shots: [0, 1, 2], spread: 12, tint: "red" },
    special: "call",
    retreat: "zigzagApart",
    rhythm: "tight",
    pressure: 2,
    call: "stands tall",
    tells: { melee: "crouch", ranged: "digs", special: "the lookout's chirp" }
  }
};
