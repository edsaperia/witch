// snail: what the game's rules and sounds know about it, section by section (the config files' per-species entries, 2026-10-13;
// its genome, sigil, sleeping form and nap are its other files). The schema: config/schema/creature.schema.json.
export const CREATURE_SNAIL = {
  movement: {
    speed: 6,
    accel: 10,
    pursuit: 8,
    fight: [{ kind: "arrive", w: 1 }, { kind: "separation", w: 0.6, radius: 6 }],
    move: { kind: "trail", cooldown: 0, every: 0.4, time: 7, radius: 2.2, slow: 0.5 }
  },
  radius: 0.45,
  temperament: "skittish",
  traits: ["armoured"],
  voice: { family: "amphibian", pitch: 1.2, am: [8, 0.4], noise: 0.3, dur: 1.3 },
  character: { sprite: "puff", every: [6, 12], for: 2 },
  pack: {
    melee: { attacks: [null, "nip", "maul"] },
    ranged: null,
    special: "wall",
    retreat: "shell",
    rhythm: "slow",
    pressure: 3,
    call: "the trail",
    tells: { melee: "rears", special: "the trail" }
  }
};
