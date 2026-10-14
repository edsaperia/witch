// The treehouse deck (Ed, 2026-10-11: "Okay let's make the treehouse. It can just be a circle with a wooden floor and a balustrade
// sitting on the ent. You land on it by being at treetop height, and during the night time slower 10x"; "The world map is in the
// centre"; "DJ decks are on the platform. The table holding the decks is along the curved bottom edge of the platform"; "The deck
// sits at 22 m"; "10x slowdown works the same as legend circles"). A round deck on the Ent at the treehouse's spot: from the
// treetops, landing over it lands her on it (`perch`); she walks it, kept inside its rail, round the map table in its middle and
// behind the decks along its south edge, where she starts each night and comes back to; rising takes her off. While she stands on
// it the world runs as in a calm legend's circle (rules/slowTime.ts). The hooks for what's to come at the treehouse (the hat and
// broom swap): onTreehouse, deckOf, and the leash events "perch" (on, off) and "chart" (E at the map table).
// The house (Ed, 2026-10-14, docs/backlog/treehouse.md, step 1; the tuning's treehouse.house, the deck kept behind treehouse.deck
// for a build or two): the hub, a round room where the deck was, with the map in its middle (E opens the chart) and the magic
// circle on its floor a few metres behind the decks; and the balcony, a half-round floor hung off the hub's south side, open at its
// rim either side of the decks' desk: at treetop height she flies straight onto it and lands (no button), walks it and the hub as
// one floor (the hub's wall and the balcony's sides keep her in), and walks off its open rim to fly again, or, with no broom
// (house.fall, for the brooms to come: hats and brooms as objects, step 3), falls, hits the ground off camera and comes back at
// the circle. A knockout brings her back at the circle too (rules/knockout.ts). `Deck` describes either: the house carries its
// balcony and circle in `house`.
import type { Game } from "./game";
import type { Tuning } from "./tuning";
import type { WitchState } from "./witch";

/** The deck in the world: its middle (x, z), radius, floor height (m over the ground there), the rail's keep-in, the map table, the decks' arc and her seat. */
export interface Deck {
  x: number; z: number; r: number; h: number; grace: number; rail: number;
  table: { r: number; use: number };
  /** The decks' desk, round the deck's centre (the deck) or the balcony's (the house): her standing radius, its front's radius, the angles it spans (degrees, 90 south). */
  decks: { inner: number; outer: number; from: number; to: number };
  seat: { x: number; z: number };
  /** The house (treehouse.house.on): the balcony hung off the hub's south side (its centre and radius), the magic circle on the hub's
   *  floor, how long the landing onto the balcony takes, and the fall off its open rim (on: with no broom; time: seconds to the ground). */
  house?: { balcony: { x: number; z: number; r: number }; circle: { x: number; z: number; r: number }; landTime: number; fall: { on: boolean; time: number } };
}

const DEG = Math.PI / 180;

/** The house (tuning treehouse.house.on) or the deck (treehouse.deck.on) at a map's treehouse, or null with both off (the old treehouse). */
export function deckOf(map: { treehouse: { x: number; z: number } }, t: Tuning): Deck | null {
  const { x, z } = map.treehouse, H = t.treehouse.house, D = t.treehouse.deck;
  if (H?.on) return { x, z, r: H.hub, h: H.height, grace: H.grace, rail: H.rail, table: { r: H.table, use: H.tableUse }, decks: { ...H.decks },
    seat: { x, z: z + H.balcony.out + H.seat }, house: { balcony: { x, z: z + H.balcony.out, r: H.balcony.r }, circle: { x, z: z + H.circle.out, r: H.circle.r }, landTime: H.landTime, fall: { on: !!H.fall.on, time: H.fall.time } } };
  if (!D?.on) return null;
  return { x, z, r: D.radius, h: D.height, grace: D.grace, rail: D.rail, table: { r: D.table, use: D.tableUse }, decks: { ...D.decks }, seat: { x, z: z + D.seat } };
}

/** Where she starts a night, metres south of the treehouse's spot: behind the decks on the balcony (the house), on the deck, or at the old studio. */
export const seatOffset = (t: Tuning): number => (t.treehouse.house?.on ? t.treehouse.house.balcony.out + t.treehouse.house.seat : t.treehouse.deck?.on ? t.treehouse.deck.seat : 1);

/** On the balcony's half-disc (the house), `pad` metres past its rim: south of its centre line and within its radius. */
export function onBalcony(d: Deck, x: number, z: number, pad = 0): boolean {
  const b = d.house?.balcony; if (!b) return false;
  const dz = z - b.z; return dz >= -pad && Math.hypot(x - b.x, dz) <= b.r + pad;
}

/** The whole floor of the house (the hub and the balcony), `pad` metres past its edges; or the deck's disc. */
export const onFloor = (d: Deck, x: number, z: number, pad = 0): boolean => Math.hypot(x - d.x, z - d.z) <= d.r + pad || onBalcony(d, x, z, pad);

/** Flying at treetop height over the balcony: she lands on it (Ed, 2026-10-14: "to enter the treehouse you fly directly onto a balcony"). */
export const flyOnto = (d: Deck, x: number, z: number): boolean => onBalcony(d, x, z);

/** The kind whose legend carries the Ent here (drawing only: art/carrier.js; Ed, 2026-10-10, journey.md "Arriving": on a new
 *  island the Ent stands on the back of a party legend of that island's kind), or null: tuning treehouse.carrier "island" the
 *  island's own kind (none at home, the Ent's own island, or on a map that isn't an island by roster), a kind's id that kind's,
 *  "none" no one. */
export function carrierOf(map: { island: { kind: string } | null }, t: Tuning): string | null {
  const c = t.treehouse.carrier ?? "island";
  if (c === "none" || c === "") return null;
  if (c !== "island") return c;
  const k = map.island?.kind;
  return k && k !== "home" ? k : null; // (a placeholder kind's island is never played: rules/rosters.ts)
}

/** Is she on the deck (landed, or landing or leaving it)? */
export const perched = (w: WitchState): boolean => !!w.perch;

/** Witch `i` stands on the treehouse deck: landed on it, not still at her decks. The hook for the treehouse's own business (the
 *  hat and broom swap). */
export function onTreehouse(g: Game, i = 0): boolean {
  const w = g.witches[i]?.body;
  return !!w && !!w.perch && w.mode === "ground" && !w.seated;
}

/** Over the deck (or anywhere over the house's floor), near enough to land on it from the treetops with the button. */
export const overDeck = (d: Deck, x: number, z: number): boolean => onFloor(d, x, z, d.grace);

/** Out of the decks' desk (round centre (cx, cz)): from where she stands behind it (inner metres out) to its front (outer),
 *  from..to degrees round; she's put back on its nearer side. `out`: the floor's edge there (the desk against it: no way round outside). */
function outOfDesk(d: Deck, cx: number, cz: number, out: number, x: number, z: number): { x: number; z: number } {
  let dx = x - cx, dz = z - cz, r = Math.hypot(dx, dz);
  if (r < 1e-6) return { x, z };
  let a = Math.atan2(dz, dx);
  const { inner, outer, from, to } = d.decks, A = a / DEG;
  if (A >= from && A <= to && r > inner && r < outer + 0.35) {
    const toIn = r - inner, toOut = outer + 0.35 <= out ? outer + 0.35 - r : Infinity, toFrom = (A - from) * DEG * r, toTo = (to - A) * DEG * r;
    const m = Math.min(toIn, toOut, toFrom, toTo);
    if (m === toIn) r = inner; else if (m === toOut) r = outer + 0.35; else if (m === toFrom) a = (from - 0.5) * DEG; else a = (to + 0.5) * DEG;
    return { x: cx + Math.cos(a) * r, z: cz + Math.sin(a) * r };
  }
  return { x, z };
}

/** The nearest place to (x, z) she can stand on the deck: inside the rail, clear of the map table, and not in the decks' arc. On the
 *  house, keepInHouse. */
export function keepOnDeck(d: Deck, x: number, z: number): { x: number; z: number } {
  if (d.house) { const k = keepInHouse(d, x, z); return { x: k.x, z: k.z }; }
  let dx = x - d.x, dz = z - d.z, r = Math.hypot(dx, dz);
  const out = d.r - d.rail, inn = d.table.r + 0.35;
  if (r < 1e-6) { dx = 0; dz = -1; r = 1e-6; }
  const a = Math.atan2(dz, dx);
  if (r > out) r = out;
  if (r < inn) r = inn;
  return outOfDesk(d, d.x, d.z, out, d.x + Math.cos(a) * r, d.z + Math.sin(a) * r);
}

/** The nearest place to (x, z) she can stand in the house: the hub's floor inside its wall and clear of the map, or the balcony inside
 *  its rail and out of the decks' desk; `off` when (x, z) has gone out over the balcony's open rim (either side of the desk: she
 *  flies, or falls), the place given then on the rim. */
/** How far north of the balcony's centre line its floor still counts (metres): the half-disc meets the hub's round wall in a notch
 *  either side of the doorway, and the floor is drawn whole there (art/ent.js: the balcony's disc overlaps the hub's), so she walks
 *  through it rather than wedging in the corner. */
const JOIN = 1.5;
export function keepInHouse(d: Deck, x: number, z: number): { x: number; z: number; off: boolean } {
  const b = d.house!.balcony, hubOut = d.r - d.rail, balOut = b.r - d.rail, inn = d.table.r + 0.35;
  const dz = z - b.z, inBal = dz >= -JOIN && Math.hypot(x - b.x, dz) <= balOut, rh = Math.hypot(x - d.x, z - d.z), inHub = rh <= hubOut;
  if (inHub || inBal) {
    let px = x, pz = z;
    if (rh < inn) { const a = rh < 1e-6 ? Math.PI / 2 : Math.atan2(z - d.z, x - d.x); px = d.x + Math.cos(a) * inn; pz = d.z + Math.sin(a) * inn; } // (clear of the map's pedestal: the grating round it is walked on)
    return { ...outOfDesk(d, b.x, b.z, balOut, px, pz), off: false };
  }
  // outside both: the nearer edge, the hub's wall or the balcony's rim
  const ah = rh < 1e-6 ? Math.PI / 2 : Math.atan2(z - d.z, x - d.x), hub = { x: d.x + Math.cos(ah) * hubOut, z: d.z + Math.sin(ah) * hubOut };
  if (dz < -JOIN) return { ...hub, off: false };
  const ab = Math.atan2(dz, x - b.x), bal = { x: b.x + Math.cos(ab) * balOut, z: b.z + Math.sin(ab) * balOut };
  if (Math.hypot(hub.x - x, hub.z - z) <= Math.hypot(bal.x - x, bal.z - z)) return { ...hub, off: false };
  const A = ab / DEG, desk = A >= d.decks.from && A <= d.decks.to; // (behind the desk the rim is the desk's own: no way off there)
  return { ...(desk ? outOfDesk(d, b.x, b.z, balOut, bal.x, bal.z) : bal), off: !desk };
}

/** Within reach of the map table (E there opens the sea chart). */
export const atMapTable = (d: Deck, x: number, z: number): boolean => Math.hypot(x - d.x, z - d.z) <= d.table.r + d.table.use;

/** Does a 💌 thrown from the deck (or the house's floor) leave it (from (x0, z0) to (x1, z1))? It vanishes at the rail, as one leaving a legend's circle. */
export const leavesDeck = (d: Deck, x0: number, z0: number, x1: number, z1: number): boolean => onFloor(d, x0, z0) && !onFloor(d, x1, z1);
