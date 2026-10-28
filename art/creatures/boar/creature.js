// boar: what the game's rules and sounds know about it, section by section (the config files' per-species entries, 2026-10-13;
// its genome, sigil, sleeping form and nap are its other files). The schema: config/schema/creature.schema.json.
export const CREATURE_BOAR = {
  movement: {
    speed: 14,
    accel: 25,
    momentum: { turn: 160 },
    fight: [{ kind: "arrive", w: 1 }, { kind: "separation", w: 0.5, radius: 7 }],
    move: {
      kind: "charge",
      cooldown: 5,
      from: 10,
      to: 45,
      speed: 30,
      time: 1.6,
      windup: 0.5,
      accel: 40,
      brake: 30,
      turn: 140,
      overshoot: 8
    }
  },
  radius: 1,
  temperament: "curious",
  traits: ["heavy"],
  voice: { family: "big", pitch: 1.2, noise: 0.55, am: [40, 0.6], volume: 1.3 },
  character: { posture: { head: [0.05, -0.06], body: 0 }, quirk: "stomp", every: [4, 8], for: 1 },
  pack: {
    melee: { attacks: [null, "nip", "maul"], knockback: 8 },
    ranged: null,
    special: "stampede",
    retreat: "backLine",
    rhythm: "slow",
    pressure: 1,
    call: "heads down",
    tells: { melee: "head down", special: "heads down" }
  }
};
