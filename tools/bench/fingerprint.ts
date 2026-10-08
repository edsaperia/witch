// The bench's fingerprint of the game's moving state (tools/bench/rules.ts prints it at checkpoints; compare.cjs compares
// two runs part by part): canonical JSON of each part, hashed. Its own module so its test (fingerprint.test.ts) can use it.
import { createHash } from "node:crypto";
import type { Game } from "../../src/rules/game";

/** JSON of a value with Maps, Sets and typed arrays spelled out, functions left out; canonical: every object's keys
 *  sorted, and its "_" notes (string values under "_"-prefixed keys: the tuning file's) dropped. So a note edited, or the
 *  tuning file's groups reordered, leaves the fingerprint as it was (wherever a copy of the tuning rides along); a value changed
 *  still changes it. (Maps, Sets and arrays keep their order: that's the state's.) */
export function plain(v: unknown): string {
  return JSON.stringify(v, (_k, x) => {
    if (x instanceof Map) return { map: [...x.entries()] };
    if (x instanceof Set) return { set: [...x] };
    if (ArrayBuffer.isView(x)) return { typed: Array.from(x as unknown as ArrayLike<number>) };
    if (typeof x === "function") return undefined;
    if (x && typeof x === "object" && !Array.isArray(x)) {
      const o = x as Record<string, unknown>, out: Record<string, unknown> = {};
      for (const k of Object.keys(o).sort()) if (!(k.startsWith("_") && typeof o[k] === "string")) out[k] = o[k];
      return out;
    }
    return x;
  });
}
const hash = (s: string) => createHash("sha256").update(s).digest("hex").slice(0, 12);

/** The state that moves (the map and the forest are made from the seed and stand still). */
export function fingerprint(g: Game): Record<string, string> {
  const parts: Record<string, unknown> = {
    clock: g.clock, witches: g.witches, creatures: g.creatures, party: g.party, combat: g.combat, growth: g.growth,
    // The buffs without the tuning they carry (buffs.tuning, the tuning with the buffs on, and buffs.base): the tuning file
    // is the game's input, not its state, so a knob added, taken away or renamed isn't the game changing (it made "game
    // unchanged" red on #364, #406 and #407). Which buffs are on, and what they multiply (mods), still count.
    berries: g.berries, beat: g.beat, camera: g.camera, speakers: g.speakers, floor: g.floor, buffs: { ...g.buffs, tuning: undefined, base: undefined },
    partyWitches: g.partyWitches, friendly: g.friendly, tally: g.tally, over: g.over,
  };
  const out: Record<string, string> = {};
  for (const [k, v] of Object.entries(parts)) out[k] = hash(plain(v) ?? "undefined"); // (a part a later change took away, or not made yet)
  out.all = hash(Object.values(out).join(""));
  return out;
}

