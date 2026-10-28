// elk: what the game's rules and sounds know about it, section by section (the config files' per-species entries, 2026-10-13;
// its genome, sigil, sleeping form and nap are its other files). The schema: config/schema/creature.schema.json.
export const CREATURE_ELK = {
  movement: {
    speed: 15,
    accel: 18,
    fight: [{ kind: "arrive", w: 1 }, { kind: "separation", w: 0.6, radius: 9 }],
    move: {
      kind: "charge",
      cooldown: 6,
      from: 12,
      to: 50,
      speed: 30,
      time: 2,
      windup: 0.7,
      accel: 25,
      brake: 18,
      turn: 60,
      overshoot: 16
    }
  },
  radius: 1.4,
  temperament: "skittish",
  traits: ["heavy"],
  voice: { family: "big", pitch: 1.4, glide: 1.25, dur: 1.5, noise: 0.15, am: [0, 0], volume: 0.8 },
  character: { posture: { head: [0.03, 0.02], body: 0 }, quirk: "stomp", every: [6, 11], for: 1.2 },
  pack: {
    melee: { attacks: [null, "nip", "maul"], knockback: 8 },
    ranged: { name: "gust of breath", range: 10, shots: [0, 1, 3], spread: 40, speed: 0.8, tint: "red" },
    special: "stampede",
    retreat: "flanks",
    rhythm: "slow",
    pressure: 1,
    call: "heads down",
    tells: { melee: "head down", ranged: "head up", special: "heads down" }
  }
};
