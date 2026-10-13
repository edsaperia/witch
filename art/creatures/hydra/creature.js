// hydra: what the game's rules and sounds know about it, section by section (the config files' per-species entries, 2026-10-13;
// its genome, sigil, sleeping form and nap are its other files). The schema: config/schema/creature.schema.json.
export const CREATURE_HYDRA = {
  movement: {
    speed: 9,
    accel: 20,
    fight: [{ kind: "arrive", w: 1 }, { kind: "separation", w: 0.6, radius: 10.5 }],
    move: { kind: "ambush", cooldown: 7, trigger: 12, speed: 2, time: 0.5 }
  },
  radius: 1.3,
  voice: { family: "snake", pitch: 0.6, glide: 0.8, volume: 1.2 },
  buff: {
    name: "Many Heads",
    kind: "shot",
    scale: { "invites.cooldown": 0.75, "invites.radius": 1.2 },
    label: "Hydra's Many Heads: 💌s come quicker and land a little more easily"
  },
  character: { posture: { head: [0.02, 0.02], body: 0 }, quirk: "rise", every: [5, 9], for: 1.4 }
};
