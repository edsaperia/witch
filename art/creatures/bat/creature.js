// bat: what the game's rules and sounds know about it, section by section (the config files' per-species entries, 2026-10-13;
// its genome, sigil, sleeping form and nap are its other files). The schema: config/schema/creature.schema.json.
export const CREATURE_BAT = {
  movement: {
    speed: 19,
    accel: 110,
    fight: [
      { kind: "orbit", w: 1, radius: 1.3 },
      { kind: "wander", w: 0.7 },
      { kind: "separation", w: 1.2, radius: 8.8 },
      { kind: "dodge", w: 0.8, radius: 16 }
    ],
    tactics: [{ kind: "swarm", w: 1 }],
    move: {
      kind: "swoop",
      cooldown: 2,
      height: 6,
      radius: 9,
      circle: 14,
      jitter: 0.3,
      windup: 0.5,
      speed: 30,
      overshoot: 3,
      bottom: 4,
      climb: 0.6,
      dives: 3,
      lead: 0.6
    }
  },
  radius: 0.5,
  attacks: [null, "screech", "bigscreech", "quake"],
  ranged: true,
  temperament: "skittish",
  traits: ["flier", "swarm"],
  voice: { family: "bat" },
  character: { sprite: "shiver", every: [3, 6], for: 0.6 },
  pack: {
    melee: { attacks: [null, "screech", "bigscreech"] },
    ranged: { name: "screech bolt", range: 10, shots: [0, 1, 2], spread: 12, tint: "red" },
    special: "confusion",
    specialWith: { move: true, drift: 60 },
    retreat: "zigzagApart",
    rhythm: "tight",
    pressure: 3,
    call: "the ring",
    tells: { melee: "wings", ranged: "mouth open", special: "the ring" }
  }
};
