// scorpion: what the game's rules and sounds know about it, section by section (the config files' per-species entries, 2026-10-13;
// its genome, sigil, sleeping form and nap are its other files). The schema: config/schema/creature.schema.json.
export const CREATURE_SCORPION = {
  movement: {
    speed: 13,
    accel: 90,
    fight: [{ kind: "arrive", w: 1 }, { kind: "strafe", w: 0.4, swap: 1.1 }, { kind: "separation", w: 0.7, radius: 7 }]
  },
  radius: 0.5,
  voice: { family: "bug", pitch: 0.8, am: [40, 0.85], noise: 0.35, volume: 1.3 },
  character: { sprite: "shiver", every: [3, 7], for: 0.5 },
  pack: {
    melee: null,
    ranged: { name: "venom bolt", range: 10, shots: [0, 1, 3], spread: 20, tint: "red" },
    special: "wall",
    specialWith: { time: 3 },
    retreat: "burrowApart",
    rhythm: "slow",
    pressure: 2,
    call: "the dig",
    tells: { ranged: "tail up", special: "the dig" }
  }
};
