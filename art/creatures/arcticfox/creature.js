// arcticfox: what the game's rules and sounds know about it, section by section (the config files' per-species entries, 2026-10-13;
// its genome, sigil, sleeping form and nap are its other files). The schema: config/schema/creature.schema.json.
export const CREATURE_ARCTICFOX = {
  movement: {
    speed: 17,
    accel: 85,
    fight: [
      { kind: "arrive", w: 1 },
      { kind: "slot", w: 1.2 },
      { kind: "strafe", w: 0.3, swap: 1.4 },
      { kind: "separation", w: 0.6, radius: 7 }
    ],
    tactics: [{ kind: "flank", w: 1 }, { kind: "surround", w: 2 }],
    move: { kind: "leap", cooldown: 3.5, from: 6, to: 18, time: 0.5, height: 3, strike: true }
  },
  radius: 0.6,
  temperament: "curious",
  voice: { family: "canid", pitch: 1.75, glide: 0.6 },
  character: { posture: { head: [0.03, 0.02], body: 0 }, quirk: "perk", every: [3, 7], for: 1 },
  pack: {
    melee: { attacks: [null, "nip", "maul"] },
    ranged: { name: "snow bolt", range: 12, shots: [0, 1, 2], spread: 10, tint: "red" },
    special: "mirage",
    retreat: "freeze",
    rhythm: "steady",
    pressure: 2,
    call: "vanishes",
    tells: { melee: "crouch", ranged: "tail up", special: "vanishes" }
  }
};
