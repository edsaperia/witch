// woodlouse: what the game's rules and sounds know about it, section by section (the config files' per-species entries, 2026-10-13;
// its genome, sigil, sleeping form and nap are its other files). The schema: config/schema/creature.schema.json.
export const CREATURE_WOODLOUSE = {
  movement: {
    speed: 9,
    accel: 25,
    pursuit: 12,
    fight: [{ kind: "keepRange", w: 1, near: 0.5, far: 0.85 }, { kind: "separation", w: 0.6, radius: 6 }],
    move: {
      kind: "charge",
      cooldown: 6,
      from: 8,
      to: 26,
      speed: 20,
      time: 1.4,
      windup: 0.5,
      accel: 30,
      brake: 25,
      turn: 160,
      overshoot: 4,
      curl: 0.3
    }
  },
  radius: 0.4,
  ranged: true,
  temperament: "skittish",
  traits: ["armoured"],
  voice: { family: "bug", pitch: 1.1, dur: 0.4, extra: 1, volume: 1.3 },
  character: { sprite: "puff", every: [4, 8], for: 1 },
  pack: {
    melee: { attacks: [null, "nip", "nip"] },
    ranged: null,
    special: "stampede",
    retreat: "rollApart",
    rhythm: "slow",
    pressure: 3,
    call: "the curl",
    tells: { melee: "crouch", special: "the curl" }
  }
};
