// bee: what the game's rules and sounds know about it, section by section (the config files' per-species entries, 2026-10-13;
// its genome, sigil, sleeping form and nap are its other files). The schema: config/schema/creature.schema.json.
// It takes the marten's place on home (Ed, 2026-11-11) and flies (Ed, 2026-11-12): it moves as the game's other small fliers do
// (the moth's steering without the pull to light), and fights as the marten it replaces did, so home is no harder or easier for
// the swap. Its numbers are a first guess for Ed and the balance tools, not tuned.
export const CREATURE_BEE = {
  movement: {
    speed: 16,
    accel: 100,
    fight: [
      { kind: "orbit", w: 1, radius: 0.9 },
      { kind: "wander", w: 0.8 },
      { kind: "dodge", w: 0.6, radius: 14 },
      { kind: "separation", w: 0.6, radius: 7 }
    ],
    tactics: [{ kind: "flank", w: 2 }, { kind: "pincer", w: 1 }]
  },
  radius: 0.45,
  temperament: "skittish",
  traits: ["flier"],
  voice: { family: "bug", pitch: 0.9, am: [210, 0.8], noise: 0.25, volume: 1.1 },
  character: { sprite: "shiver", every: [2, 5], for: 0.5 },
  pack: {
    melee: { attacks: [null, "nip", "maul"] },
    ranged: { name: "stinger", range: 12, shots: [0, 1, 2], spread: 10, tint: "red" },
    special: "call",
    retreat: "leapfrog",
    rhythm: "tight",
    pressure: 2,
    call: "a rising buzz",
    tells: { melee: "sting forward", ranged: "abdomen curls", special: "a hover" }
  }
};
