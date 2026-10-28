// unicorn: what the game's rules and sounds know about it, section by section (the config files' per-species entries, 2026-10-13;
// its genome, sigil, sleeping form and nap are its other files). The schema: config/schema/creature.schema.json.
export const CREATURE_UNICORN = {
  movement: {
    speed: 16,
    accel: 35,
    fight: [{ kind: "arrive", w: 1 }, { kind: "strafe", w: 0.3, swap: 2 }, { kind: "separation", w: 0.6, radius: 8 }],
    move: {
      kind: "charge",
      cooldown: 6,
      from: 10,
      to: 40,
      speed: 30,
      time: 1.4,
      windup: 0.6,
      accel: 45,
      brake: 30,
      turn: 120,
      overshoot: 6
    }
  },
  radius: 1.1,
  temperament: "skittish",
  voice: { family: "big", pitch: 1.5, glide: 0.9, dur: 1.2, noise: 0.1 },
  character: { posture: { head: [-0.02, 0.08], body: 0.01 }, quirk: "stomp", every: [5, 10], for: 1.2 },
  pack: {
    melee: { attacks: [null, "nip", "maul"] },
    ranged: { name: "horn bolt", range: 16, shots: [0, 1, 2], spread: 6, tint: "red" },
    special: "mind",
    retreat: "circle",
    rhythm: "steady",
    pressure: 2,
    call: "the horn glows",
    tells: { melee: "head down", ranged: "the horn", special: "the horn glows" }
  }
};
