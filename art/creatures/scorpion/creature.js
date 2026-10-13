// scorpion: what the game's rules and sounds know about it, section by section (the config files' per-species entries, 2026-10-13;
// its genome, sigil, sleeping form and nap are its other files). The schema: config/schema/creature.schema.json.
export const CREATURE_SCORPION = {
  movement: {
    speed: 13,
    accel: 90,
    fight: [{ kind: "arrive", w: 1 }, { kind: "strafe", w: 0.4, swap: 1.1 }, { kind: "separation", w: 0.7, radius: 7 }]
  },
  radius: 0.5,
  voice: { family: "bug", pitch: 0.8, am: [40, 0.85], noise: 0.35, volume: 1.3 },
  buff: {
    name: "Sting",
    kind: "shot",
    mods: { pierce: 1 },
    scale: { "invites.cooldown": 0.85 },
    label: "Scorpion's Sting: 💌s pass through to the next, with a little less wait"
  },
  character: { sprite: "shiver", every: [3, 7], for: 0.5 }
};
