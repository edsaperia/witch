// polarbear: what the game's rules and sounds know about it, section by section (the config files' per-species entries, 2026-10-13;
// its genome, sigil, sleeping form and nap are its other files). The schema: config/schema/creature.schema.json.
export const CREATURE_POLARBEAR = {
  movement: {
    speed: 14,
    accel: 22,
    fight: [{ kind: "arrive", w: 1 }, { kind: "separation", w: 0.6, radius: 9 }],
    move: { kind: "leap", cooldown: 5, from: 8, to: 26, time: 0.8, height: 4 }
  },
  radius: 1.4,
  voice: { family: "big", pitch: 0.9, noise: 0.35, volume: 1.2 },
  character: { posture: { head: [0.05, -0.02], body: 0 }, quirk: "sniff", every: [5, 9], for: 1.4 },
  pack: {
    melee: { attacks: [null, "swipe", "bigswipe"] },
    ranged: null,
    special: "cover",
    retreat: "backLine",
    rhythm: "slow",
    pressure: 1,
    call: "rears up",
    tells: { melee: "rears up", special: "rears up" }
  }
};
