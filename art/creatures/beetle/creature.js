// beetle: what the game's rules and sounds know about it, section by section (the config files' per-species entries, 2026-10-13;
// its genome, sigil, sleeping form and nap are its other files). The schema: config/schema/creature.schema.json.
export const CREATURE_BEETLE = {
  movement: { speed: 12, accel: 15, fight: [{ kind: "arrive", w: 1 }, { kind: "separation", w: 0.9, radius: 8 }] },
  radius: 0.5,
  temperament: "skittish",
  traits: ["armoured"],
  voice: { family: "bug", pitch: 0.7, am: [60, 0.9], volume: 1.5 },
  character: { sprite: "shiver", every: [4, 8], for: 0.6 },
  pack: {
    melee: { attacks: [null, "nip", "maul"], knockback: 6 },
    ranged: null,
    special: "cover",
    specialWith: { both: true },
    retreat: "huddle",
    rhythm: "slow",
    pressure: 3,
    call: "the clack",
    tells: { melee: "horns down", special: "the clack" }
  }
};
