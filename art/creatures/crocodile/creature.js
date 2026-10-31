// crocodile: what the game's rules and sounds know about it, section by section (the config files' per-species entries, 2026-10-13;
// its genome, sigil, sleeping form and nap are its other files). The schema: config/schema/creature.schema.json.
export const CREATURE_CROCODILE = {
  movement: {
    speed: 10,
    accel: 25,
    fight: [{ kind: "arrive", w: 1 }, { kind: "separation", w: 0.6, radius: 10.5 }],
    move: { kind: "ambush", cooldown: 7, trigger: 14, speed: 2.2, time: 0.5 }
  },
  radius: 1.2,
  voice: { family: "big", pitch: 0.6, noise: 0.5, am: [18, 0.7], volume: 1.2 },
  character: { posture: { head: [0.02, -0.03], body: -0.01 }, quirk: "tailflick", every: [6, 11], for: 1 },
  pack: {
    melee: { attacks: [null, "nip", "maul"] },
    ranged: { name: "water jet", range: 14, shots: [0, 1, 1], tint: "red" },
    special: "pull",
    specialWith: { pull: 5, reach: 14 },
    retreat: "water",
    rhythm: "slow",
    pressure: 1,
    call: "the roll",
    tells: { melee: "jaws open", ranged: "a hiss", special: "the roll" }
  }
};
