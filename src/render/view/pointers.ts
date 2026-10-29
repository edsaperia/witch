// What the edge pointers point at and how they look (render/view/hud.ts draws them; Ed's pointer pass, 2026-10-28: "the party pointer
// and the straggler pointer are different things"), kept apart from the drawing so it can be tested:
// - the straggler pointer: the enraged animal nearest the centre while the route's last stragglers live (rules/win.ts winTarget), its
//   sigil in the enemy palette at its rank's size, as everywhere sigils show (render/leash/ranks.ts);
// - the legend pointers: one for each legend awake (restless, angry or happy), till the party's won: its sigil at a legend's size in
//   its stack colour, the enemy's while it's hostile, the friend's once it's happy (Ed: "It looks like their sigil in their sigil
//   colour"), and shiny as a legend's sigil is everywhere (render/leash/ranks.ts legendShine);
// - the party pointer (Ed, 2026-10-28): 🪩 in the rainbow ring on the victory lap's pulse racing home, then on the disco ball after the
//   win till she reaches the party (rules/win.ts atTheParty), when the guidance pins take over.
import type { Game } from "../../rules/game";
import type { Tuning } from "../../rules/tuning";
import { winPulse, winTarget, won } from "../../rules/win";
import { rankColour, rankOf, rankSize } from "../leash/ranks";

/** A sigil's size in a pointer (art pixels across) at an adult's size (render/indicator.ts). */
export const POINTER_SIGIL = 17;

/** A pointer's subject: where it is, how tall it stands (m), its colour (0-1) and, a creature's, its sigil and that sigil's size, and
 *  whether it shines, a legend's (render/leash/ranks.ts legendShine). */
export interface PointerTarget { x: number; z: number; top: number; colour: [number, number, number]; species?: string; sigilSize?: number; id?: number; shine?: boolean }

/** The straggler pointer's subject: the enraged animal the route ends on, in the enemy palette at its rank's size; null without one. */
export function stragglerPointer(g: Game, t: Tuning = g.tuning): PointerTarget | null {
  const S = winTarget(g);
  if (!S) return null;
  const r = rankOf(S);
  return { x: S.x, z: S.z, top: 2.5, colour: rankColour(t, r, false), species: S.species, sigilSize: POINTER_SIGIL * rankSize(t, r), id: S.id, shine: r === 3 };
}

/** Whether a legend is awake: not asleep (restless, angry or happy), not gone. */
export const awakeLegend = (c: Game["creatures"][number]): boolean => !!c.boss && !c.gone && !!c.legendState && c.legendState !== "asleep";

/** The legend pointers' subjects: every awake legend, till the party's won (none after), each its sigil at a legend's size in its stack
 *  colour (friend once happy, else enemy). `tops` how tall each stands as drawn (m), by id. */
export function legendPointers(g: Game, tops?: ReadonlyMap<number, number>, t: Tuning = g.tuning): PointerTarget[] {
  if (won(g)) return [];
  const out: PointerTarget[] = [];
  for (const c of g.creatures) {
    if (!awakeLegend(c)) continue;
    out.push({ x: c.x, z: c.z, top: tops?.get(c.id) ?? 6, colour: rankColour(t, 3, c.legendState === "happy"), species: c.species, sigilSize: POINTER_SIGIL * rankSize(t, 3), id: c.id, shine: true });
  }
  return out;
}

/** The party pointer's subject (Ed's plan, 2026-10-28): 🪩 in the wave pointer's rainbow ring, on the victory lap's pulse racing home
 *  (its sparkler's own point when drawn: `tip`); at the win, on the disco ball over the dancefloor, staying there till she reaches the
 *  party (rules/win.ts atTheParty: the night settles and the guidance pins take over at once); none before the lap, after that, or on a
 *  lost night. */
export function partyPointer(g: Game, tip?: { x: number; z: number } | null): { x: number; z: number; top: number } | null {
  const L = winPulse(g);
  if (L) return { x: tip?.x ?? L.x, z: tip?.z ?? L.z, top: 1.5 };
  if (!won(g) || g.win?.settled) return null;
  const d = g.map.dancefloor, D = g.tuning.dancefloor;
  return { x: d.x, z: d.z, top: D.discoHeight + D.discoSize / 2 };
}
