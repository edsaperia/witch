// featheredserpent: what the game's rules and sounds know about it, section by section (the config files' per-species entries, 2026-10-13;
// its genome, sigil, sleeping form and nap are its other files). The schema: config/schema/creature.schema.json.
export const CREATURE_FEATHEREDSERPENT = {
  movement: {
    speed: 15,
    accel: 40,
    fight: [{ kind: "arrive", w: 1 }, { kind: "strafe", w: 0.4, swap: 2 }, { kind: "separation", w: 0.6, radius: 9 }],
    move: { kind: "ambush", cooldown: 6, trigger: 14, speed: 2.2, time: 0.5 }
  },
  radius: 1,
  attacks: [null, "spit", "longspit", "legendNova"],
  ranged: true,
  traits: ["heavy"],
  voice: { family: "bird", pitch: 0.7, pure: false, wave: "sawtooth", glide: 0.9 },
  character: { posture: { head: [0, 0.05], body: 0 }, quirk: "shake", every: [5, 9], for: 1.2 },
  pack: {
    melee: { attacks: [null, "nip", "nip"] },
    ranged: {
      name: "venom spit",
      range: 24,
      shots: [0, 1, 2],
      spread: 8,
      attacks: [null, "spit", "longspit"],
      tint: "red"
    },
    special: "mirage",
    retreat: "branches",
    rhythm: "steady",
    pressure: 2,
    call: "the ruff fans",
    tells: { melee: "the ruff flares", ranged: "aim line", special: "the ruff fans" }
  }
};
