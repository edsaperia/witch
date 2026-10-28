// roe: what the game's rules and sounds know about it, section by section (the config files' per-species entries, 2026-10-13;
// its genome, sigil, sleeping form and nap are its other files). The schema: config/schema/creature.schema.json.
export const CREATURE_ROE = {
  movement: {
    speed: 18,
    accel: 60,
    fight: [
      { kind: "keepRange", w: 1, near: 0.35, far: 0.7 },
      { kind: "strafe", w: 0.5, swap: 2 },
      { kind: "separation", w: 0.6, radius: 8 }
    ],
    move: { kind: "leap", cooldown: 4, from: 6, to: 18, time: 0.55, height: 2.5 }
  },
  radius: 0.7,
  temperament: "skittish",
  voice: { family: "big", pitch: 2.1, glide: 0.4, dur: 0.5, noise: 0.35 },
  character: { posture: { head: [-0.01, 0.06], body: 0 }, quirk: "perk", every: [3, 7], for: 1.2 },
  pack: {
    melee: { attacks: [null, "nip", "maul"] },
    ranged: { name: "bolt of light", range: 12, shots: [0, 1, 2], spread: 10, tint: "red" },
    special: "scatter",
    retreat: "zigzagApart",
    rhythm: "tight",
    pressure: 2,
    call: "a bark",
    tells: { melee: "head down", ranged: "ears up", special: "a bark" }
  }
};
