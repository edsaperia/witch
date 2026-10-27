// The Fight Arena (Ed, 2026-10-27: "we can press a button to randomise the settings and another generates a random enemy pack to
// fight, and then I can tweak and save/copy attack settings that are fun"): ?fight=<seed>, her alone against a wild pack in the
// home clearing (rules/arena.ts, wild only), its panel in ui/fightArena.ts. Here, the seeded roll of a pack: the same seed, the
// same pack, so a fun roll comes back from its link. No drawing here.
import { CREATURE_IDS } from "./creatureConfig";
import { LEGEND, type Level } from "./creatures";
import { attackOf } from "./combat/data";
import { rng } from "./random";
import type { ArenaGroup } from "./arena";

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
