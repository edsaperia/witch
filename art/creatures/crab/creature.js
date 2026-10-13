// crab: what the game's rules and sounds know about it, section by section (the config files' per-species entries, 2026-10-13;
// its genome, sigil, sleeping form and nap are its other files). The schema: config/schema/creature.schema.json.
export const CREATURE_CRAB = {
  movement: {
    speed: 14,
    accel: 120,
    fight: [
      { kind: "arrive", w: 0.8 },
      { kind: "strafe", w: 0.8, swap: 0.7 },
      { kind: "separation", w: 0.7, radius: 7 }
    ]
  },
  radius: 0.5,
  voice: { family: "bug", pitch: 0.6, am: [28, 0.9], noise: 0.45, volume: 1.3 },
  buff: {
    name: "Sidestep",
    kind: "move",
    scale: { groundAcceleration: 1.6, "dash.distance": 1.2 },
    label: "Crab's Sidestep: quicker off the mark on foot, and a longer blink"
  },
  character: { sprite: "shiver", every: [3, 6], for: 0.6 }
};
