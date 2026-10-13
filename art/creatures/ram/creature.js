// ram: what the game's rules and sounds know about it, section by section (the config files' per-species entries, 2026-10-13;
// its genome, sigil, sleeping form and nap are its other files). The schema: config/schema/creature.schema.json.
export const CREATURE_RAM = {
  movement: {
    speed: 14,
    accel: 35,
    fight: [{ kind: "arrive", w: 1 }, { kind: "separation", w: 0.6, radius: 7 }],
    move: {
      kind: "charge",
      cooldown: 4.5,
      from: 6,
      to: 30,
      speed: 30,
      time: 1.2,
      windup: 0.9,
      backup: 7,
      accel: 60,
      brake: 35,
      turn: 150,
      overshoot: 6
    }
  },
  radius: 0.9,
  temperament: "skittish",
  voice: { family: "big", pitch: 1.6, am: [12, 0.5], vowel: 1, noise: 0.1 },
  buff: { name: "Steady", kind: "move", mods: { steady: 1 }, label: "Ram's Steady: no slowing while you fire" },
  character: { posture: { head: [0.04, -0.04], body: 0 }, quirk: "stomp", every: [4, 8], for: 1 }
};
