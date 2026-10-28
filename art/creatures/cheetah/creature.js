// cheetah: what the game's rules and sounds know about it, section by section (the config files' per-species entries, 2026-10-13;
// its genome, sigil, sleeping form and nap are its other files). The schema: config/schema/creature.schema.json.
export const CREATURE_CHEETAH = {
  movement: {
    speed: 26,
    accel: 120,
    momentum: { k: 3.5 },
    fight: [{ kind: "arrive", w: 1 }, { kind: "strafe", w: 0.4, swap: 1 }, { kind: "separation", w: 0.6, radius: 8 }],
    move: { kind: "charge", cooldown: 4, from: 8, to: 40, speed: 42, time: 1.1, windup: 0.4, accel: 120, brake: 80 },
    tactics: [{ kind: "flank", w: 2 }]
  },
  radius: 0.75,
  temperament: "skittish",
  traits: ["nimble"],
  voice: { family: "cat", pitch: 1.4, glide: 0.7 },
  character: { posture: { head: [0.03, 0.02], body: -0.01 }, quirk: "perk", every: [4, 8], for: 1 },
  pack: {
    melee: { attacks: [null, "nip", "maul"] },
    ranged: { name: "dust bolt", range: 12, shots: [0, 1, 2], spread: 10, tint: "red" },
    special: "sync",
    retreat: "circle",
    rhythm: "tight",
    pressure: 2,
    call: "a crouch",
    tells: { melee: "crouch", ranged: "tail flick", special: "a crouch" }
  }
};
