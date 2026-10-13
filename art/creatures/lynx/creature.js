// lynx: what the game's rules and sounds know about it, section by section (the config files' per-species entries, 2026-10-13;
// its genome, sigil, sleeping form and nap are its other files). The schema: config/schema/creature.schema.json.
export const CREATURE_LYNX = {
  movement: {
    speed: 16,
    accel: 70,
    fight: [{ kind: "arrive", w: 1 }, { kind: "strafe", w: 0.3, swap: 1.5 }, { kind: "separation", w: 0.6, radius: 7 }],
    move: { kind: "leap", cooldown: 2.5, from: 6, to: 22, time: 0.45, height: 2, strike: true }
  },
  radius: 0.8,
  temperament: "skittish",
  voice: { family: "cat", volume: 0.4 },
  buff: {
    name: "Poise",
    kind: "move",
    scale: { groundAcceleration: 2, "treetop.turnRate": 1.4 },
    label: "Lynx's Poise: sharper turns, quicker starts"
  },
  character: { posture: { head: [0.04, -0.02], body: -0.03 }, quirk: "tailflick", every: [3, 6], for: 0.6 }
};
