// Her followers while she's in the treehouse (Ed, 2026-10-24: "when she's in the treehouse, her followers should switch to idling
// in the home area"; "But they should also defend it, as if their sigils are placed in the home area"). While a witch is perched
// (up in the treehouse, on its floor), the creatures on her stack (babies too; a party legend stays as ever) are seen by the rules
// as placed at spots of their own in the home area: they travel there, rest by their spot and guard the whole home area as
// placed-sigil creatures do (rules/combat.ts: sieges included), though a baby doesn't eat berries at its spot as at a real sigil
// (Ed, 2026-10-24: "While a witch is in the treehouse, a baby shouldn't eat berries at its spot"). No sigil is put down: her stack and leash are unchanged, and
// once she's off the treehouse (walked off its rim, flown or taken off) they're hers again and follow her. Per witch, by
// whether that witch is perched.
import type { Creature } from "./creatures";
import type { ForestMap } from "./map";
import type { Tuning } from "./tuning";
import type { LeashState, PlacedSigil } from "./leash";
import { homeArea } from "./homeArea";
import { isInside } from "./mapShape";

/** A witch as far as this needs: her leash, where she is, and whether she's knocked out. */
export interface Guarded { leash: LeashState; body: { perch?: boolean }; ko?: unknown }

/** How many spots a map's home area offers (far more than a stack ever holds). */
const SPOTS = 160;
/** Kept this far (m) past the dancefloor's speakers and from the treehouse's foot, and inside the home area's (ragged) border:
 *  a guard rests a few metres north of its spot, as by a placed sigil (rules/leash.ts), and should rest in the area. */
const RING_GAP = 8, HOUSE_GAP = 14, EDGE = 10;

const CACHE = new WeakMap<ForestMap, { x: number; z: number }[]>();

/** The home area's guard spots, spread over it in a fixed order (each prefix of the list spread about it: the golden angle round,
 *  the van der Corput sequence out), clear of the dancefloor and its speakers, the treehouse's foot, the area's border and the coast. */
export function guardSpots(map: ForestMap): { x: number; z: number }[] {
  const hit = CACHE.get(map);
  if (hit) return hit;
  const home = homeArea(map), D = map.dancefloor, T = map.treehouse;
  const ring = Math.max(D.radius, ...D.speakers.map(s => Math.hypot(s.x - D.x, s.z - D.z))) + RING_GAP;
  const out: { x: number; z: number }[] = [];
  for (let i = 0; out.length < SPOTS && i < SPOTS * 8; i++) {
    let v = 0, f = 0.5; for (let k = i + 1; k > 0; k >>= 1, f /= 2) if (k & 1) v += f; // (van der Corput, base 2)
    const a = i * 2.399963, r = ring + (home.r - ring) * Math.sqrt(v), x = D.x + Math.cos(a) * r, z = D.z + Math.sin(a) * r;
    const deep = home.inside(x, z) && Array.from({ length: 8 }, (_, k) => (k * Math.PI) / 4).every(b => home.inside(x + Math.cos(b) * EDGE, z + Math.sin(b) * EDGE)); // (all round: the border's ragged)
    if (!deep || Math.hypot(x - T.x, z - T.z) < HOUSE_GAP || !isInside(map.bounds, x, z, EDGE)) continue;
    out.push({ x, z });
  }
  CACHE.set(map, out);
  return out;
}

/** Whether her followers are guarding home now: she's perched in the treehouse (on its floor), not knocked out. */
export const inHouse = (w: Guarded): boolean => !!w.body.perch && !w.ko;

/** Her stack's creatures as placed at home while she's in the treehouse: each at a spot of its own (by id, so a creature keeps its
 *  spot as others come and go), none within leash.spacing of a real sigil. Empty when she isn't. */
export function houseGuards(w: Guarded, creatures: Creature[], map: ForestMap, t: Tuning, time = 0): PlacedSigil[] {
  if (!inHouse(w) || !w.leash.stack.length) return [];
  const ids = w.leash.stack.filter(id => !creatures[id]?.partyLegend).sort((a, b) => a - b);
  if (!ids.length) return [];
  const free = guardSpots(map).filter(s => !w.leash.placed.some(p => Math.hypot(p.x - s.x, p.z - s.z) < t.leash.spacing));
  return ids.flatMap((id, k) => (free.length ? [{ id, ...free[k % free.length], at: time }] : []));
}

/** Her leash as the rules see it this step: in the treehouse, her guards are placed at home and off the stack; otherwise as it is. */
export function leashView(w: Guarded, creatures: Creature[], map: ForestMap, t: Tuning): { stack: number[]; placed: PlacedSigil[]; guards: PlacedSigil[] } {
  const guards = houseGuards(w, creatures, map, t);
  if (!guards.length) return { stack: w.leash.stack, placed: w.leash.placed, guards };
  const g = new Set(guards.map(p => p.id));
  return { stack: w.leash.stack.filter(id => !g.has(id)), placed: [...w.leash.placed, ...guards], guards };
}
