// frosttroll: what the game's rules and sounds know about it, section by section (the config files' per-species entries, 2026-10-13;
// its genome, sigil, sleeping form and nap are its other files). The schema: config/schema/creature.schema.json.
export const CREATURE_FROSTTROLL = {
  movement: { speed: 12, accel: 18, fight: [{ kind: "arrive", w: 1 }, { kind: "separation", w: 0.6, radius: 9 }] },
  radius: 1.1,
  attacks: [null, "slam", "bigslam", "quake"],
  temperament: "curious",
  traits: ["heavy"],
  voice: { family: "big", pitch: 0.65, glide: 0.4 },
  character: { posture: { head: [0.03, -0.02], body: 0.03 }, quirk: "scratch", every: [5, 10], for: 1.8 },
  pack: {
    melee: { attacks: [null, "swipe", "bigswipe"], knockback: 10 },
    ranged: null,
    special: "cover",
    retreat: "backLine",
    rhythm: "slow",
    pressure: 1,
    call: "crouches",
    tells: { melee: "club raised", special: "crouches" }
  }
};
