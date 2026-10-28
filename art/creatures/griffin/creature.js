// griffin: what the game's rules and sounds know about it, section by section (the config files' per-species entries, 2026-10-13;
// its genome, sigil, sleeping form and nap are its other files). The schema: config/schema/creature.schema.json.
export const CREATURE_GRIFFIN = {
  movement: {
    speed: 17,
    accel: 60,
    fight: [{ kind: "arrive", w: 1 }, { kind: "separation", w: 0.6, radius: 9 }],
    move: { kind: "charge", cooldown: 5, from: 6, to: 26, speed: 34, time: 0.7, windup: 0.7, accel: 90, brake: 60 },
    tactics: [{ kind: "flank", w: 2 }]
  },
  radius: 1.1,
  traits: ["heavy"],
  voice: { family: "bird", pitch: 0.6, pure: false, wave: "sawtooth", glide: 0.8 },
  character: { posture: { head: [0.03, 0.03], body: 0 }, quirk: "shake", every: [5, 10], for: 1.2 },
  pack: {
    melee: { attacks: [null, "nip", "maul"] },
    ranged: { name: "feather bolt", range: 18, shots: [0, 1, 3], spread: 12, tint: "red" },
    special: "pull",
    specialWith: { pull: 6, reach: 18 },
    retreat: "branches",
    rhythm: "steady",
    pressure: 2,
    call: "the wings",
    tells: { melee: "wings up", ranged: "a wingbeat", special: "the wings" }
  }
};
