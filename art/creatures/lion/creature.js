// lion: what the game's rules and sounds know about it, section by section (the config files' per-species entries, 2026-10-13;
// its genome, sigil, sleeping form and nap are its other files). The schema: config/schema/creature.schema.json.
export const CREATURE_LION = {
  movement: {
    speed: 15,
    accel: 40,
    fight: [{ kind: "arrive", w: 1 }, { kind: "separation", w: 0.6, radius: 9 }],
    move: { kind: "charge", cooldown: 5, from: 6, to: 22, speed: 30, time: 0.7, windup: 0.8, accel: 80, brake: 60 },
    tactics: [{ kind: "surround", w: 2 }]
  },
  radius: 1.2,
  attacks: [null, "swipe", "bigswipe", "legendCharge"],
  temperament: "curious",
  traits: ["heavy"],
  voice: { family: "big", pitch: 0.55, glide: 0.6 },
  character: { posture: { head: [0, 0.03], body: 0.01 }, quirk: "stretch", every: [7, 12], for: 1.5 },
  pack: {
    melee: { attacks: [null, "swipe", "bigswipe"], knockback: 8 },
    ranged: { name: "roar bolt", range: 12, shots: [0, 1, 1], size: [1, 1, 1.5], tint: "red" },
    special: "call",
    retreat: "flanks",
    rhythm: "steady",
    pressure: 2,
    call: "the roar",
    tells: { melee: "crouch", ranged: "mouth open", special: "the roar" }
  }
};
