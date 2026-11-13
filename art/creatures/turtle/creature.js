// turtle: what the game's rules and sounds know about it, section by section (the config files' per-species entries, 2026-10-13;
// its genome, sigil, sleeping form and nap are its other files). The schema: config/schema/creature.schema.json.
// It takes the newt's place, in the Fen (Ed, 2026-11-12: "newt for turtle"): it fights as the newt it replaces did (keeping its
// range, a jet of pond water for the newt's spit, the newt's wall), so the Fen's fight is the one it was, but slower on its feet
// and armoured, and it draws into its shell to sleep. Its numbers are a first guess for Ed and the balance tools, not tuned.
export const CREATURE_TURTLE = {
  movement: {
    speed: 8,
    accel: 22,
    fight: [{ kind: "keepRange", w: 1, near: 0.5, far: 0.85 }, { kind: "separation", w: 0.6, radius: 10.5 }]
  },
  radius: 0.55,
  temperament: "curious",
  traits: ["armoured"],
  voice: { family: "small", pitch: 0.6, noise: 0.4 },
  pack: {
    melee: null,
    ranged: { name: "jet", range: 12, shots: [0, 1, 2], spread: 10, tint: "red" },
    special: "wall",
    retreat: "water",
    rhythm: "slow",
    pressure: 3,
    call: "a hiss",
    tells: { ranged: "neck draws back", special: "into its shell" }
  }
};
