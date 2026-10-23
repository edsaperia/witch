// moth: what the game's rules and sounds know about it, section by section (the config files' per-species entries, 2026-10-13;
// its genome, sigil, sleeping form and nap are its other files). The schema: config/schema/creature.schema.json.
export const CREATURE_MOTH = {
  movement: {
    speed: 15,
    accel: 90,
    fight: [
      { kind: "orbit", w: 1, radius: 0.9 },
      { kind: "wander", w: 0.8 },
      { kind: "light", w: 1.4, radius: 40 },
      { kind: "dodge", w: 0.6, radius: 14 },
      { kind: "separation", w: 0.6, radius: 7 }
    ],
    tactics: [{ kind: "swarm", w: 1 }]
  },
  radius: 0.45,
  ranged: true,
  temperament: "skittish",
  traits: ["flier", "swarm"],
  voice: { family: "bug", pitch: 1.2, am: [120, 0.7], noise: 0.3, volume: 1.2 },
  buff: { name: "Flutter", kind: "shot", add: { "invites.burst": 1 }, label: "Butterfly's Flutter: one more 💌 a burst" },
  character: { sprite: "shiver", every: [2, 5], for: 0.6 }
};
