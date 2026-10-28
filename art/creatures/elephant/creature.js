// elephant: what the game's rules and sounds know about it, section by section (the config files' per-species entries, 2026-10-13;
// its genome, sigil, sleeping form and nap are its other files). The schema: config/schema/creature.schema.json.
export const CREATURE_ELEPHANT = {
  movement: {
    speed: 13,
    accel: 16,
    fight: [{ kind: "arrive", w: 1 }, { kind: "separation", w: 0.6, radius: 11 }],
    move: {
      kind: "charge",
      cooldown: 7,
      from: 12,
      to: 45,
      speed: 26,
      time: 2,
      windup: 0.9,
      accel: 20,
      brake: 14,
      turn: 50,
      overshoot: 14
    }
  },
  radius: 1.9,
  attacks: [null, "slam", "bigslam", "quake"],
  traits: ["heavy"],
  voice: { family: "big", pitch: 0.6, glide: 0.9, volume: 0.9 },
  character: { posture: { head: [0.02, -0.03], body: 0 }, quirk: "stomp", every: [6, 12], for: 1.4 },
  pack: {
    melee: { attacks: [null, "swipe", "bigswipe"], knockback: 10 },
    ranged: null,
    special: "stampede",
    retreat: "backLine",
    rhythm: "slow",
    pressure: 1,
    call: "ears out",
    tells: { melee: "trunk raised", special: "ears out" }
  }
};
