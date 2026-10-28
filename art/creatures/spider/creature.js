// spider: what the game's rules and sounds know about it, section by section (the config files' per-species entries, 2026-10-13;
// its genome, sigil, sleeping form and nap are its other files). The schema: config/schema/creature.schema.json.
export const CREATURE_SPIDER = {
  movement: {
    speed: 15,
    accel: 90,
    fight: [
      { kind: "keepRange", w: 1, near: 0.4, far: 0.8 },
      { kind: "strafe", w: 0.4, swap: 1.5 },
      { kind: "separation", w: 0.6, radius: 7 }
    ],
    move: { kind: "ambush", cooldown: 8, trigger: 20, speed: 1.6, time: 0.6 }
  },
  radius: 0.5,
  attacks: [null, "web", "bigweb", "quake"],
  ranged: true,
  temperament: "skittish",
  voice: { family: "bug", pitch: 0.9, am: [45, 0.7], noise: 0.25, volume: 1.2 },
  character: { sprite: "shiver", every: [3, 7], for: 0.5 },
  pack: {
    melee: null,
    ranged: { name: "web shot", range: 22, shots: [0, 1, 1], attacks: [null, "web", "bigweb"], tint: "red" },
    special: "pull",
    specialWith: { pull: 6, reach: 22 },
    retreat: "trees",
    rhythm: "steady",
    pressure: 2,
    call: "legs raised",
    tells: { ranged: "abdomen up", special: "the line" }
  }
};
