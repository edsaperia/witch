// otter: what the game's rules and sounds know about it, section by section (the config files' per-species entries, 2026-10-13;
// its genome, sigil, sleeping form and nap are its other files). The schema: config/schema/creature.schema.json.
export const CREATURE_OTTER = {
  movement: {
    speed: 17,
    accel: 130,
    fight: [
      { kind: "arrive", w: 1 },
      { kind: "strafe", w: 0.7, swap: 0.7 },
      { kind: "dodge", w: 1.3, radius: 18 },
      { kind: "separation", w: 0.6, radius: 7 }
    ]
  },
  radius: 0.7,
  temperament: "curious",
  traits: ["nimble"],
  voice: { family: "whistler", volume: 0.7 },
  buff: {
    name: "Skimming stone",
    kind: "shot",
    mods: { ricochet: 1 },
    label: "Otter's Skimming stone: 💌s bounce on to another animal"
  },
  character: { posture: { head: [0.02, 0.02], body: -0.01 }, quirk: "shake", every: [5, 9], for: 0.8 }
};
