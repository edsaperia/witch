// snowleopard: what the game's rules and sounds know about it, section by section (the config files' per-species entries, 2026-10-13;
// its genome, sigil, sleeping form and nap are its other files). The schema: config/schema/creature.schema.json.
export const CREATURE_SNOWLEOPARD = {
  movement: {
    speed: 17,
    accel: 75,
    fight: [{ kind: "arrive", w: 1 }, { kind: "strafe", w: 0.3, swap: 1.5 }, { kind: "separation", w: 0.6, radius: 7 }],
    move: { kind: "leap", cooldown: 3, from: 7, to: 26, time: 0.45, height: 2, strike: true }
  },
  radius: 0.85,
  temperament: "skittish",
  voice: { family: "cat", pitch: 0.85, volume: 0.45 },
  character: { posture: { head: [0.03, -0.03], body: -0.04 }, quirk: "tailflick", every: [4, 8], for: 0.9 },
  pack: {
    melee: { attacks: [null, "nip", "maul"] },
    ranged: { name: "snow bolt", range: 14, shots: [0, 1, 2], spread: 10, tint: "red" },
    special: "feint",
    retreat: "trees",
    rhythm: "steady",
    pressure: 2,
    call: "tail up",
    tells: { melee: "crouch", ranged: "ears back", special: "tail up" }
  }
};
