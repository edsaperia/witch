// redpanda: what the game's rules and sounds know about it, section by section (the config files' per-species entries, 2026-10-13;
// its genome, sigil, sleeping form and nap are its other files). The schema: config/schema/creature.schema.json.
export const CREATURE_REDPANDA = {
  movement: {
    speed: 14,
    accel: 50,
    fight: [{ kind: "arrive", w: 1 }, { kind: "strafe", w: 0.4, swap: 1.8 }, { kind: "separation", w: 0.6, radius: 7 }],
    move: { kind: "leap", cooldown: 4.5, from: 5, to: 14, time: 0.5, height: 2.2 }
  },
  radius: 0.5,
  temperament: "curious",
  voice: { family: "small", pitch: 1.5, glide: 0.5, dur: 0.6 },
  character: { posture: { head: [0, 0.05], body: 0 }, quirk: "perk", every: [4, 8], for: 1.2 },
  pack: {
    melee: { attacks: [null, "nip", "maul"] },
    ranged: { name: "ember bolt", range: 10, shots: [0, 1, 2], spread: 10, tint: "red" },
    special: "rally",
    retreat: "trees",
    rhythm: "steady",
    pressure: 2,
    call: "chirps",
    tells: { melee: "rears up", ranged: "tail up", special: "chirps" }
  }
};
