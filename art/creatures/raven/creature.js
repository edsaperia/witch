// raven: what the game's rules and sounds know about it, section by section (the config files' per-species entries, 2026-10-13;
// its genome, sigil, sleeping form and nap are its other files). The schema: config/schema/creature.schema.json.
export const CREATURE_RAVEN = {
  movement: {
    speed: 19,
    accel: 80,
    fight: [
      { kind: "keepRange", w: 1, near: 0.55, far: 0.9 },
      { kind: "strafe", w: 0.6, swap: 2.5 },
      { kind: "slot", w: 0.9 },
      { kind: "separation", w: 0.6, radius: 10.5 }
    ],
    tactics: [{ kind: "volley", w: 2 }, { kind: "none", w: 1 }],
    move: {
      kind: "swoop",
      cooldown: 3,
      height: 9,
      radius: 13,
      circle: 10,
      jitter: 0.1,
      windup: 1.2,
      rise: 1.8,
      speed: 32,
      overshoot: 5,
      bottom: 4,
      climb: 1.2,
      dives: 1,
      lead: 1,
      knockback: 10
    }
  },
  radius: 0.6,
  attacks: [null, "longspit", "longbarb", "quake"],
  ranged: true,
  kite: true,
  temperament: "curious",
  traits: ["flier"],
  voice: {
    family: "bird",
    pitch: 0.55,
    pure: false,
    wave: "sawtooth",
    trill: [0, 0],
    glide: 0.85,
    vowel: 0,
    volume: 1.3
  },
  character: { sprite: "hop", every: [3, 6], for: 0.7 },
  pack: {
    melee: { attacks: [null, "nip", "nip"] },
    ranged: {
      name: "spit and barb",
      range: 36,
      shots: [0, 1, 2],
      spread: 8,
      attacks: [null, "longspit", "longbarb"],
      tint: "red"
    },
    special: "mirage",
    retreat: "branches",
    rhythm: "steady",
    pressure: 1,
    call: "a caw",
    tells: { melee: "wings", ranged: "aim line", special: "a caw" }
  }
};
