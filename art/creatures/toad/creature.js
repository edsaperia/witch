// toad: what the game's rules and sounds know about it, section by section (the config files' per-species entries, 2026-10-13;
// its genome, sigil, sleeping form and nap are its other files). The schema: config/schema/creature.schema.json.
export const CREATURE_TOAD = {
  movement: {
    speed: 12,
    accel: 40,
    fight: [{ kind: "keepRange", w: 0.8, near: 0.3, far: 0.5 }, { kind: "separation", w: 0.6, radius: 7 }],
    move: { kind: "leap", cooldown: 2.6, from: 8, to: 30, time: 0.9, height: 6 }
  },
  radius: 0.45,
  attacks: [null, "slam", "bigslam", "quake"],
  ranged: true,
  temperament: "skittish",
  voice: { family: "amphibian" },
  buff: {
    name: "Spawn",
    kind: "shot",
    mods: { split: 1 },
    label: "Toad's Spawn: a 💌 that lands splits into 3 small ones"
  },
  character: { sprite: "hop", every: [5, 10], for: 0.7 }
};
