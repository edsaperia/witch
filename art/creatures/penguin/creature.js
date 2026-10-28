// penguin: what the game's rules and sounds know about it, section by section (the config files' per-species entries, 2026-10-13;
// its genome, sigil, sleeping form and nap are its other files). The schema: config/schema/creature.schema.json.
export const CREATURE_PENGUIN = {
  movement: {
    speed: 9,
    accel: 30,
    fight: [{ kind: "arrive", w: 1 }, { kind: "separation", w: 0.6, radius: 7 }],
    move: {
      kind: "charge",
      cooldown: 5,
      from: 6,
      to: 22,
      speed: 24,
      time: 0.9,
      windup: 0.5,
      accel: 60,
      brake: 18,
      turn: 60,
      overshoot: 6
    }
  },
  radius: 0.55,
  voice: {
    family: "bird",
    pitch: 0.8,
    pure: false,
    wave: "sawtooth",
    trill: [6, 0.3],
    glide: 0.6,
    vowel: 0.6,
    volume: 0.9
  },
  pack: {
    melee: { attacks: [null, "nip", "nip"] },
    ranged: { name: "ice pellet", range: 10, shots: [0, 1, 2], spread: 10, tint: "red" },
    special: "stampede",
    retreat: "huddle",
    rhythm: "slow",
    pressure: 3,
    call: "the drop",
    tells: { melee: "beak up", ranged: "flippers out", special: "the drop" }
  }
};
