// cat: what the game's rules and sounds know about it, section by section (the config files' per-species entries, 2026-10-13;
// its genome, sigil, sleeping form and nap are its other files). The schema: config/schema/creature.schema.json.
export const CREATURE_CAT = {
  movement: {
    speed: 15,
    accel: 70,
    fight: [{ kind: "arrive", w: 1 }, { kind: "strafe", w: 0.3, swap: 1.6 }, { kind: "separation", w: 0.6, radius: 7 }],
    move: { kind: "leap", cooldown: 2.8, from: 5, to: 18, time: 0.4, height: 1.6, strike: true }
  },
  radius: 0.6,
  temperament: "skittish",
  voice: { family: "cat", pitch: 1.3, volume: 0.35 },
  character: { posture: { head: [0.03, 0], body: -0.01 }, quirk: "tailflick", every: [3, 7], for: 0.8 },
  pack: {
    melee: { attacks: [null, "nip", "maul"] },
    ranged: { name: "hiss bolt", range: 10, shots: [0, 1, 2], spread: 10, tint: "red" },
    special: "sync",
    retreat: "trees",
    rhythm: "steady",
    pressure: 2,
    call: "a stillness",
    tells: { melee: "crouch", ranged: "ears back", special: "a stillness" }
  }
};
