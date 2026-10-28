// beaver: what the game's rules and sounds know about it, section by section (the config files' per-species entries, 2026-10-13;
// its genome, sigil, sleeping form and nap are its other files). The schema: config/schema/creature.schema.json.
export const CREATURE_BEAVER = {
  movement: {
    speed: 12,
    accel: 40,
    fight: [{ kind: "arrive", w: 1 }, { kind: "separation", w: 0.6, radius: 7 }],
    move: { kind: "block", cooldown: 3, radius: 14, time: 1, armour: 0.15 }
  },
  radius: 0.7,
  temperament: "curious",
  voice: { family: "whistler", pitch: 0.8, trill: [4, 30], volume: 0.7 },
  character: { posture: { head: [0.02, -0.02], body: -0.01 }, quirk: "tailslap", every: [5, 9], for: 0.7 },
  pack: {
    melee: { attacks: [null, "nip", "maul"], knockback: 6 },
    ranged: { name: "wood chip", range: 10, shots: [0, 1, 2], spread: 10, tint: "red" },
    special: "wall",
    specialWith: { time: 4 },
    retreat: "water",
    rhythm: "slow",
    pressure: 2,
    call: "the carry",
    tells: { melee: "tail up", ranged: "gnaws", special: "the carry" }
  }
};
