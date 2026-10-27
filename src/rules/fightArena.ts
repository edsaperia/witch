// The Fight Arena (Ed, 2026-10-27: "we can press a button to randomise the settings and another generates a random enemy pack to
// fight, and then I can tweak and save/copy attack settings that are fun"): ?fight=<seed>, her alone against a wild pack in the
// home clearing (rules/arena.ts, wild only), its panel in ui/fightArena.ts. Here, the seeded roll of a pack: the same seed, the
// same pack, so a fun roll comes back from its link. No drawing here.
import { CREATURE_IDS } from "./creatureConfig";
import { LEGEND, type Level } from "./creatures";
import { attackOf } from "./combat/data";
import { rng } from "./random";
import type { ArenaGroup } from "./arena";
import type { Game } from "./game";

/** The kinds a pack may be made of: those with an attack at every level a roll gives (young, adult and legend). */
export const FIGHTERS: readonly string[] = CREATURE_IDS.filter(s => ([1, 2, LEGEND] as Level[]).every(l => attackOf(s, l)));

/** A pack's groups as the arena's spec ("wolf*4@2,raven*2@1"). */
export const packSpec = (groups: readonly ArenaGroup[]): string => groups.map(g => `${g.species}*${g.count}@${g.level}`).join(",");

/** The pack seed `seed` rolls: now and then a lone legend (one in eight); else one kind (or, one time in three, two), 2 to 6 of
 *  each, young or adult, at most 8 in all. */
export function rollPack(seed: number, kinds: readonly string[] = FIGHTERS): ArenaGroup[] {
  const r = rng(seed), pick = () => kinds[Math.floor(r() * kinds.length)];
  if (!kinds.length) return [];
  if (r() < 1 / 8) return [{ species: pick(), count: 1, level: LEGEND as Level }];
  const first = pick(), n = r() < 1 / 3 ? 2 : 1, out: ArenaGroup[] = [];
  let left = 8;
  for (let i = 0; i < n; i++) {
    let species = i === 0 ? first : pick();
    for (let k = 0; k < 8 && out.some(g => g.species === species); k++) species = pick(); // (two kinds, not one twice)
    if (out.some(g => g.species === species)) break;
    const count = Math.min(left - (n - 1 - i) * 2, 2 + Math.floor(r() * 5));
    out.push({ species, count, level: (1 + Math.floor(r() * 2)) as Level });
    left -= count;
  }
  return out;
}

/** The seed after `seed` (the next roll's). */
export const nextSeed = (seed: number): number => (Math.imul(seed ^ 0x9e3779b9, 2654435761) >>> 0) % 1_000_000;

/** A telegraph on show (the Fight Arena's timings): whose, where, when it began and when it lands. Today's are the windups (a fighting
 *  creature's `fight.windupUntil`); the composable attacks' own are the grammar engine's (`combat.spells.telegraphs`). */
export interface Tell { key: string; species: string; x: number; z: number; start: number; fire: number }

/** The reaction floor the composer keeps to (docs/plans/attack-grammar.md, proposed 0.45 s): a telegraph shorter shows red. */
export const REACTION_FLOOR = 0.45;

/** Watches the arena's telegraphs: those live now, and the shortest lead (fire minus start) seen since it was made or reset. */
export class TellWatch {
  private seen = new Map<string, { fire: number; start: number }>();
  shortest = Infinity;
  shortestOf = "";
  count = 0;

  reset(): void { this.seen.clear(); this.shortest = Infinity; this.shortestOf = ""; this.count = 0; }

  /** This frame's live telegraphs (a windup began at its event's step, else when first seen). */
  update(g: Pick<Game, "clock" | "creatures" | "arena"> & { combat?: unknown }): Tell[] {
    const t = g.clock.time, out: Tell[] = [];
    const add = (key: string, species: string, x: number, z: number, fire: number, start?: number) => {
      let s = this.seen.get(key);
      if (!s || s.fire !== fire) {
        s = { fire, start: start ?? t };
        this.seen.set(key, s); this.count++;
        const lead = fire - s.start;
        if (lead < this.shortest) { this.shortest = lead; this.shortestOf = species; }
      }
      out.push({ key, species, x, z, start: s.start, fire });
    };
    // (when each began: its windup event this frame, at the step it happened; a frame can hold several steps)
    const began = new Map<number, number>();
    for (const e of (g.combat as { events?: { kind: string; at: number; id?: number }[] } | undefined)?.events ?? []) if (e.kind === "windup" && e.id !== undefined) began.set(e.id, e.at);
    for (const id of g.arena?.ids ?? []) {
      const c = g.creatures[id];
      if (!c || c.gone || c.spell || !c.fight?.windupUntil || c.fight.windupUntil <= t) continue; // (one fighting with an attack in the grammar: its telegraphs, below)
      add(`w${id}`, c.species, c.x, c.z, c.fight.windupUntil, began.get(id));
    }
    // (the grammar's own telegraphs, rules/attacks/engine.ts: live while alive, each with its start and when it fires, its shape's point)
    const tg = (g.combat as { spells?: { telegraphs?: { id: number; alive: boolean; kind: string; attack: string; start: number; fire: number; shape: { x: number; z: number } }[] } } | undefined)?.spells?.telegraphs;
    for (const k of tg ?? []) if (k.alive && k.fire > t) add(`t${k.id}`, `${k.attack} ${k.kind}`, k.shape.x, k.shape.z, k.fire, k.start);
    for (const [key, s] of this.seen) if (s.fire < t - 5) this.seen.delete(key);
    return out;
  }
}
