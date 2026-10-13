// hare: what the game's rules and sounds know about it, section by section (the config files' per-species entries, 2026-10-13;
// its genome, sigil, sleeping form and nap are its other files). The schema: config/schema/creature.schema.json.
export const CREATURE_HARE = {
  movement: {
    speed: 20,
    accel: 150,
    fight: [
      { kind: "arrive", w: 1 },
      { kind: "slot", w: 1.4 },
      { kind: "strafe", w: 0.5, swap: 0.6 },
      { kind: "dodge", w: 1.2, radius: 20 },
      { kind: "separation", w: 0.6, radius: 7 }
    ],
    tactics: [{ kind: "hitAndRun", w: 1 }]
  },
  radius: 0.55,
  temperament: "skittish",
  traits: ["nimble"],
  voice: { family: "small" },
  buff: {
    name: "Dash bursts",
    kind: "move",
    mods: { charges: 2 },
    label: "Hare's Dash bursts: 2 more blink charges"
  },
  character: { posture: { head: [0, 0.04], body: 0 }, quirk: "thump", every: [4, 8], for: 0.8 }
};
