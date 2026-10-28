// jaguar: what the game's rules and sounds know about it, section by section (the config files' per-species entries, 2026-10-13;
// its genome, sigil, sleeping form and nap are its other files). The schema: config/schema/creature.schema.json.
export const CREATURE_JAGUAR = {
  movement: {
    speed: 16,
    accel: 65,
    fight: [{ kind: "arrive", w: 1 }, { kind: "strafe", w: 0.3, swap: 1.4 }, { kind: "separation", w: 0.6, radius: 8 }],
    move: { kind: "leap", cooldown: 3, from: 6, to: 22, time: 0.5, height: 2.2, strike: true },
    tactics: [{ kind: "flank", w: 2 }]
  },
  radius: 1,
  attacks: [null, "swipe", "bigswipe", "legendCharge"],
  voice: { family: "cat", pitch: 0.55, glide: 0.5, volume: 0.8 },
  character: { posture: { head: [0.02, -0.03], body: -0.02 }, quirk: "tailflick", every: [5, 9], for: 0.9 },
  pack: {
    melee: { attacks: [null, "nip", "maul"] },
    ranged: { name: "jaguar bolt", range: 12, shots: [0, 1, 2], spread: 10, tint: "red" },
    special: "sync",
    retreat: "trees",
    rhythm: "steady",
    pressure: 2,
    call: "a stillness",
    tells: { melee: "crouch", ranged: "snarls", special: "a stillness" }
  }
};
