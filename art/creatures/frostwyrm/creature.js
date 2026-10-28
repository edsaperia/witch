// frostwyrm: what the game's rules and sounds know about it, section by section (the config files' per-species entries, 2026-10-13;
// its genome, sigil, sleeping form and nap are its other files). The schema: config/schema/creature.schema.json.
export const CREATURE_FROSTWYRM = {
  movement: {
    speed: 14,
    accel: 40,
    fight: [{ kind: "arrive", w: 1 }, { kind: "separation", w: 0.6, radius: 10 }],
    tactics: [{ kind: "surround", w: 2 }]
  },
  radius: 1.3,
  attacks: [null, "swipe", "bigswipe", "legendNova"],
  traits: ["heavy"],
  voice: { family: "snake", pitch: 0.45, glide: 0.9 },
  character: { posture: { head: [0.02, 0.03], body: 0 }, quirk: "tailslap", every: [6, 11], for: 1.4 },
  pack: {
    melee: { attacks: [null, "nip", "maul"] },
    ranged: { name: "frost beam", range: 20, shots: [0, 1, 1], attacks: [null, "beam", "widebeam"], tint: "red" },
    special: "wall",
    specialWith: { time: 4 },
    retreat: "freeze",
    rhythm: "slow",
    pressure: 1,
    call: "the breath",
    tells: { melee: "jaws open", ranged: "aim line", special: "the breath" }
  }
};
