// raccoon: what the game's rules and sounds know about it, section by section (the config files' per-species entries, 2026-10-13;
// its genome, sigil, sleeping form and nap are its other files). The schema: config/schema/creature.schema.json.
export const CREATURE_RACCOON = {
  movement: {
    speed: 15,
    accel: 85,
    fight: [
      { kind: "arrive", w: 1 },
      { kind: "slot", w: 1.2 },
      { kind: "separation", w: 0.6, radius: 7 },
      { kind: "cohesion", w: 0.4, radius: 18 }
    ],
    tactics: [{ kind: "flank", w: 1 }, { kind: "pincer", w: 2 }]
  },
  radius: 0.6,
  voice: { family: "small", pitch: 1.05, noise: 0.2, extra: 1 },
  buff: {
    name: "Light fingers",
    kind: "shot",
    scale: { "invites.cooldown": 0.85, "invites.speed": 1.15 },
    label: "Raccoon's Light fingers: quicker bursts, 💌s flying a little faster"
  }
};
