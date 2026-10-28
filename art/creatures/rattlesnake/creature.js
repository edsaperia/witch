// rattlesnake: what the game's rules and sounds know about it, section by section (the config files' per-species entries, 2026-10-13;
// its genome, sigil, sleeping form and nap are its other files). The schema: config/schema/creature.schema.json.
export const CREATURE_RATTLESNAKE = {
  movement: {
    speed: 13,
    accel: 70,
    fight: [
      { kind: "keepRange", w: 1, near: 0.4, far: 0.75 },
      { kind: "strafe", w: 0.5, swap: 1.2 },
      { kind: "separation", w: 0.6, radius: 7 }
    ],
    move: { kind: "ambush", cooldown: 7, trigger: 14, speed: 1.9, time: 0.5 }
  },
  radius: 0.6,
  voice: { family: "snake", pitch: 0.85 },
  character: { posture: { head: [0, 0.03], body: 0 }, quirk: "rattle", every: [5, 9], for: 1.4 },
  pack: {
    melee: { attacks: [null, "nip", "maul"] },
    ranged: { name: "venom spit", range: 12, shots: [0, 1, 2], spread: 10, tint: "red" },
    special: "confusion",
    specialWith: { move: true },
    retreat: "freeze",
    rhythm: "slow",
    pressure: 1,
    call: "the rattle",
    tells: { melee: "coils", ranged: "head back", special: "the rattle" }
  }
};
