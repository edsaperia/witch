// komodo: what the game's rules and sounds know about it, section by section (the config files' per-species entries, 2026-10-13;
// its genome, sigil, sleeping form and nap are its other files). The schema: config/schema/creature.schema.json.
export const CREATURE_KOMODO = {
  movement: {
    speed: 10,
    accel: 18,
    fight: [{ kind: "arrive", w: 1 }, { kind: "separation", w: 0.6, radius: 10 }],
    move: { kind: "ambush", cooldown: 9, trigger: 18, speed: 2, time: 0.7 }
  },
  radius: 1.1,
  voice: { family: "snake", pitch: 0.55, am: [9, 0.4] },
  pack: {
    melee: { attacks: [null, "nip", "maul"] },
    ranged: { name: "venom spit", range: 14, shots: [0, 1, 2], spread: 10, tint: "red" },
    special: "confusion",
    specialWith: { time: 3 },
    retreat: "freeze",
    rhythm: "slow",
    pressure: 1,
    call: "a hiss",
    tells: { melee: "jaws open", ranged: "throat swells", special: "a hiss" }
  }
};
