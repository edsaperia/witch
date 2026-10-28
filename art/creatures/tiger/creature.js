// tiger: what the game's rules and sounds know about it, section by section (the config files' per-species entries, 2026-10-13;
// its genome, sigil, sleeping form and nap are its other files). The schema: config/schema/creature.schema.json.
export const CREATURE_TIGER = {
  movement: {
    speed: 17,
    accel: 60,
    fight: [{ kind: "arrive", w: 1 }, { kind: "strafe", w: 0.3, swap: 1.6 }, { kind: "separation", w: 0.6, radius: 9 }],
    move: { kind: "leap", cooldown: 3.2, from: 8, to: 26, time: 0.55, height: 2.4, strike: true },
    tactics: [{ kind: "flank", w: 2 }]
  },
  radius: 1.2,
  attacks: [null, "swipe", "bigswipe", "legendCharge"],
  temperament: "curious",
  traits: ["heavy"],
  voice: { family: "cat", pitch: 0.5, glide: 0.6, volume: 0.8 },
  character: { posture: { head: [0.02, -0.02], body: -0.02 }, quirk: "tailflick", every: [4, 8], for: 0.9 },
  pack: {
    melee: { attacks: [null, "swipe", "bigswipe"] },
    ranged: { name: "growl bolt", range: 12, shots: [0, 1, 1], size: [1, 1, 1.5], tint: "red" },
    special: "feint",
    retreat: "freeze",
    rhythm: "slow",
    pressure: 1,
    call: "crouch",
    tells: { melee: "crouch", ranged: "growls", special: "a short spring" }
  }
};
