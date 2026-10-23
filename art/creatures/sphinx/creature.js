// sphinx: what the game's rules and sounds know about it, section by section (the config files' per-species entries, 2026-10-13;
// its genome, sigil, sleeping form and nap are its other files). The schema: config/schema/creature.schema.json.
export const CREATURE_SPHINX = {
  movement: {
    speed: 13,
    accel: 30,
    fight: [{ kind: "arrive", w: 1 }, { kind: "strafe", w: 0.3, swap: 3 }, { kind: "separation", w: 0.6, radius: 9 }]
  },
  radius: 1.2,
  attacks: [null, "screech", "bigscreech", "legendBeam"],
  temperament: "curious",
  traits: ["heavy"],
  voice: { family: "big", pitch: 0.75, glide: 0.5, dur: 1.3, noise: 0.15 },
  buff: {
    name: "Riddle",
    kind: "shot",
    scale: { "invites.range": 1.4, "invites.cooldown": 0.85 },
    label: "Sphinx's Riddle: 💌s carry far and come a little quicker"
  },
  character: { posture: { head: [0, 0.06], body: 0 }, quirk: "stretch", every: [8, 14], for: 1.6 }
};
