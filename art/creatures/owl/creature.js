// owl: what the game's rules and sounds know about it, section by section (the config files' per-species entries, 2026-10-13;
// its genome, sigil, sleeping form and nap are its other files). The schema: config/schema/creature.schema.json.
export const CREATURE_OWL = {
  movement: {
    speed: 16,
    accel: 40,
    fight: [
      { kind: "orbit", w: 0.8, radius: 0.85 },
      { kind: "keepRange", w: 0.8, near: 0.6, far: 1 },
      { kind: "slot", w: 0.7 },
      { kind: "separation", w: 0.6, radius: 14 }
    ],
    tactics: [{ kind: "volley", w: 1 }, { kind: "none", w: 1 }],
    move: {
      kind: "swoop",
      cooldown: 3,
      height: 8,
      radius: 14,
      circle: 7,
      jitter: 0.05,
      windup: 1.5,
      speed: 26,
      overshoot: 5,
      bottom: 4,
      climb: 1.4,
      dives: 1,
      lead: 1,
      knockback: 8
    }
  },
  radius: 0.6,
  attacks: [null, "lob", "biglob", "quake"],
  ranged: true,
  temperament: "skittish",
  traits: ["flier"],
  voice: {
    family: "bird",
    pitch: 0.45,
    trill: [0, 0],
    glide: 0.93,
    dur: 1.6,
    gap: 1.6,
    vowel: 4,
    wave: "sine",
    volume: 0.4
  },
  character: { sprite: "look", every: [4, 8], for: 1.4 },
  pack: {
    melee: { attacks: [null, "nip", "nip"] },
    ranged: { name: "lob", range: 30, shots: [0, 1, 1], delivery: "lob", flight: 1.2, size: [1, 3, 3.5], tint: "red" },
    special: "mind",
    retreat: "branches",
    rhythm: "slow",
    pressure: 1,
    call: "the eyes glow",
    tells: { melee: "wings", ranged: "the circle", special: "the eyes glow" }
  }
};
