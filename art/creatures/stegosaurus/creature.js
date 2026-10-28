// stegosaurus: what the game's rules and sounds know about it, section by section (the config files' per-species entries, 2026-10-13;
// its genome, sigil, sleeping form and nap are its other files). The schema: config/schema/creature.schema.json.
export const CREATURE_STEGOSAURUS = {
  movement: {
    speed: 11,
    accel: 18,
    fight: [{ kind: "arrive", w: 1 }, { kind: "separation", w: 0.5, radius: 9 }],
    move: {
      kind: "charge",
      cooldown: 6,
      from: 8,
      to: 30,
      speed: 22,
      time: 1.4,
      windup: 0.8,
      accel: 25,
      brake: 20,
      turn: 90,
      overshoot: 6
    }
  },
  radius: 1.6,
  voice: { family: "big", pitch: 0.55, volume: 0.9 },
  character: { posture: { head: [0.02, -0.03], body: 0 }, quirk: "sniff", every: [4, 8], for: 1 },
  pack: {
    melee: { attacks: [null, "swipe", "bigswipe"], knockback: 8 },
    ranged: { name: "thrown stone", range: 10, shots: [0, 1, 1], size: [1, 1, 1.5], tint: "red" },
    special: "stampede",
    retreat: "backLine",
    rhythm: "slow",
    pressure: 1,
    call: "the plates flush",
    tells: { melee: "tail raised", ranged: "rears", special: "the plates flush" }
  }
};
