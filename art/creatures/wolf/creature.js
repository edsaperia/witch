// wolf: what the game's rules and sounds know about it, section by section (the config files' per-species entries, 2026-10-13;
// its genome, sigil, sleeping form and nap are its other files). The schema: config/schema/creature.schema.json.
export const CREATURE_WOLF = {
  movement: {
    speed: 17,
    accel: 70,
    momentum: { delay: 0.2, chaseLead: 0.15 },
    fight: [
      { kind: "arrive", w: 1 },
      { kind: "slot", w: 1.2 },
      { kind: "separation", w: 0.8, radius: 7.7 },
      { kind: "cohesion", w: 0.3, radius: 21 }
    ],
    tactics: [{ kind: "surround", w: 2 }, { kind: "pincer", w: 1 }]
  },
  radius: 0.9,
  temperament: "curious",
  voice: { family: "canid" },
  buff: {
    name: "Howl",
    kind: "shot",
    mods: { ring: 1 },
    label: "Wolf's Howl: every 5th burst a ring of 💌s round you"
  },
  character: { posture: { head: [0.05, -0.05], body: -0.02 }, quirk: "howl", every: [7, 13], for: 1.8 },
  pack: {
    melee: { attacks: [null, "nip", "maul"] },
    ranged: { name: "frost breath", range: 10, shots: [0, 1, 3], spread: 40, speed: 0.8, tint: "red" },
    special: "call",
    retreat: "flanks",
    rhythm: "tight",
    pressure: 2,
    call: "a howl",
    tells: { melee: "crouch", ranged: "head low", special: "the howl" }
  }
};
