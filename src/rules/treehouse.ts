// The treehouse deck (Ed, 2026-10-11: "Okay let's make the treehouse. It can just be a circle with a wooden floor and a balustrade
// sitting on the ent. You land on it by being at treetop height, and during the night time slower 10x"; "The world map is in the
// centre"; "DJ decks are on the platform. The table holding the decks is along the curved bottom edge of the platform"; "The deck
// sits at 22 m"; "10x slowdown works the same as legend circles"). A round deck on the Ent at the treehouse's spot: from the
// treetops, landing over it lands her on it (`perch`); she walks it, kept inside its rail, round the map table in its middle and
// behind the decks along its south edge, where she starts each night and comes back to; rising takes her off. While she stands on
// it the world runs as in a calm legend's circle (rules/slowTime.ts). The hooks for what's to come at the treehouse (the hat and
// broom swap): onTreehouse, deckOf, and the leash events "perch" (on, off) and "chart" (E at the map table).
import type { Game } from "./game";
import type { Tuning } from "./tuning";
import type { WitchState } from "./witch";

/** The deck in the world: its middle (x, z), radius, floor height (m over the ground there), the rail's keep-in, the map table, the decks' arc and her seat. */
export interface Deck {
  x: number; z: number; r: number; h: number; grace: number; rail: number;
  table: { r: number; use: number };
  decks: { inner: number; outer: number; from: number; to: number };
  seat: { x: number; z: number };
}

const DEG = Math.PI / 180;

/** The deck at a map's treehouse, or null with the deck off (tuning treehouse.deck.on false: the old treehouse). */
export function deckOf(map: { treehouse: { x: number; z: number } }, t: Tuning): Deck | null {
  const D = t.treehouse.deck;
  if (!D?.on) return null;
  const { x, z } = map.treehouse;
  return { x, z, r: D.radius, h: D.height, grace: D.grace, rail: D.rail, table: { r: D.table, use: D.tableUse }, decks: { ...D.decks }, seat: { x, z: z + D.seat } };
}

/** Is she on the deck (landed, or landing or leaving it)? */
export const perched = (w: WitchState): boolean => !!w.perch;

/** Witch `i` stands on the treehouse deck: landed on it, not still at her decks. The hook for the treehouse's own business (the
 *  hat and broom swap). */
export function onTreehouse(g: Game, i = 0): boolean {
  const w = g.witches[i]?.body;
  return !!w && !!w.perch && w.mode === "ground" && !w.seated;
}

/** Over the deck, near enough to land on it from the treetops. */
export const overDeck = (d: Deck, x: number, z: number): boolean => Math.hypot(x - d.x, z - d.z) <= d.r + d.grace;

/** The nearest place to (x, z) she can stand on the deck: inside the rail, clear of the map table, and not in the decks' arc. */
export function keepOnDeck(d: Deck, x: number, z: number): { x: number; z: number } {
  let dx = x - d.x, dz = z - d.z, r = Math.hypot(dx, dz);
  const out = d.r - d.rail, inn = d.table.r + 0.35;
  if (r < 1e-6) { dx = 0; dz = -1; r = 1e-6; }
  let a = Math.atan2(dz, dx);
  if (r > out) r = out;
  if (r < inn) r = inn;
  // the decks' table: from where she stands behind it (inner metres out) to its front (outer), from..to degrees round; she's put
  // back on its nearer side
  const { inner, outer, from, to } = d.decks, A = a / DEG;
  if (A >= from && A <= to && r > inner && r < outer + 0.35) {
    // (the decks against the rail: no way round outside them)
    const toIn = r - inner, toOut = outer + 0.35 <= out ? outer + 0.35 - r : Infinity, toFrom = (A - from) * DEG * r, toTo = (to - A) * DEG * r;
    const m = Math.min(toIn, toOut, toFrom, toTo);
    if (m === toIn) r = inner; else if (m === toOut) r = outer + 0.35; else if (m === toFrom) a = (from - 0.5) * DEG; else a = (to + 0.5) * DEG;
  }
  return { x: d.x + Math.cos(a) * r, z: d.z + Math.sin(a) * r };
}

/** Within reach of the map table (E there opens the sea chart). */
export const atMapTable = (d: Deck, x: number, z: number): boolean => Math.hypot(x - d.x, z - d.z) <= d.table.r + d.table.use;

/** Does a 💌 thrown from the deck leave it (from (x0, z0) to (x1, z1))? It vanishes at the rail, as one leaving a legend's circle. */
export const leavesDeck = (d: Deck, x0: number, z0: number, x1: number, z1: number): boolean => Math.hypot(x0 - d.x, z0 - d.z) <= d.r && Math.hypot(x1 - d.x, z1 - d.z) > d.r;
