// dragonfly: what the game's rules and sounds know about it, section by section (the config files' per-species entries, 2026-10-13;
// its genome, sigil, sleeping form and nap are its other files). The schema: config/schema/creature.schema.json.
export const CREATURE_DRAGONFLY = {
  movement: {
    speed: 20,
    accel: 130,
    fight: [
      { kind: "orbit", w: 0.9, radius: 1.1 },
      { kind: "wander", w: 0.9 },
      { kind: "dodge", w: 0.9, radius: 16 },
      { kind: "separation", w: 0.8, radius: 8 }
    ],
    move: {
      kind: "swoop",
      cooldown: 2.5,
      height: 3,
      radius: 8,
      circle: 10,
      jitter: 0.4,
      windup: 0.3,
      speed: 32,
      overshoot: 2,
      bottom: 1.5,
      climb: 0.5,
      dives: 2,
      lead: 0.5
    }
  },
  radius: 0.45,
  voice: { family: "bug", pitch: 1.6, am: [180, 0.6], noise: 0.2, volume: 1.1 },
  character: { sprite: "shiver", every: [1.5, 4], for: 0.5 },
  pack: {
    melee: { attacks: [null, "nip", "maul"] },
    ranged: { name: "water drop", range: 10, shots: [0, 1, 2], spread: 10, tint: "red" },
    special: "sync",
    retreat: "zigzagApart",
    rhythm: "tight",
    pressure: 3,
    call: "a hover",
    tells: { melee: "wings", ranged: "tail curls", special: "a hover" }
  }
};
