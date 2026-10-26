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
// Terrace's take-off, desk and circle in `house`.
// The oak (Ed, 2026-10-24, the layout v4): the house is one floor of the old oak (config/house/shape.js), the Terrace one of its
// trunk rooms (the plan's middle, at the map's treehouse), its open rim on the south-east (towards the dancefloor: the take-off,
// config/house/base.json terrace.takeoff) where she steps off and flies back on; the rest of its edge, and every room's, keeps her in.
// Her DJ desk stands on that rim, her seat behind it; the magic circle is on the Terrace's floor.
import type { Game } from "./game";
import type { Tuning } from "./tuning";
import type { WitchState } from "./witch";
import { floorDistance, floorRects, fromPlan, HOUSE_ROOMS, nearestRoomFloor, objectAt, onRoomFloor, toPlan, type RoomFloor } from "./houseRooms";
import { inRoom } from "../../config/house/shape.js";

/** The deck in the world: its middle (x, z), radius, floor height (m over the ground there), the rail's keep-in, the map table, the decks' arc and her seat. */
export interface Deck {
  x: number; z: number; r: number; h: number; grace: number; rail: number;
  table: { r: number; use: number };
  /** The decks' desk, round the deck's centre (the deck) or the balcony's (the house): her standing radius, its front's radius, the angles it spans (degrees, 90 south). */
  decks: { inner: number; outer: number; from: number; to: number };
  seat: { x: number; z: number };
  /** The house (treehouse.house.on): its open rim (the take-off: its angle round the Terrace's middle and half its span, radians,
   *  clockwise from east), the decks' desk on it (its middle in the world, w along x, d along z), the magic circle on its floor, how
   *  long the landing onto it takes, and the fall off its open rim (on: with no broom; time: seconds to the ground). The Terrace's
   *  middle and size are the deck's own (x, z, r). */
  house?: { takeoff: { angle: number; half: number }; desk: { x: number; z: number; w: number; d: number }; circle: { x: number; z: number; r: number }; landTime: number; /** on foot in it, her walking speed (m/s) */ walk: number; /** the walking speed her walk cycle is drawn for (m/s) */ stride: number; fall: { on: boolean; time: number };
    /** The house's floor (rules/houseRooms.ts, config/house/: the oak's one shape), kept the rail in from its edge; null with the
     *  house's rooms off. */
    rooms: RoomFloor | null };
}

const DEG = Math.PI / 180;

/** The house (tuning treehouse.house.on) or the deck (treehouse.deck.on) at a map's treehouse, or null with both off (the old treehouse). */
export function deckOf(map: { treehouse: { x: number; z: number } }, t: Tuning): Deck | null {
  const { x, z } = map.treehouse, H = t.treehouse.house, D = t.treehouse.deck;
  if (H?.on) {
    const T = HOUSE_ROOMS.terrace, at = { x, z }, P = (p: { x: number; z: number }) => fromPlan(at, p.x, p.z), r = HOUSE_ROOMS.rooms.find(q => q.id === "terrace")?.r ?? 12.5;
    return { x, z, r, h: H.height, grace: H.grace, rail: H.rail, table: { r: 0, use: 0 }, decks: { inner: 0, outer: 0, from: 0, to: 0 }, seat: P(T.seat),
      house: { takeoff: { angle: T.takeoff.angle * DEG, half: T.takeoff.half * DEG }, desk: { ...P(T.decks), w: T.decks.w, d: T.decks.d }, circle: { ...P(T.circle), r: T.circle.r }, landTime: H.landTime, walk: H.walk ?? 5, stride: H.stride ?? 5, fall: { on: !!H.fall.on, time: H.fall.time }, rooms: HOUSE_ROOMS.on ? floorRects(at, H.rail) : null } };
  }
  if (!D?.on) return null;
  return { x, z, r: D.radius, h: D.height, grace: D.grace, rail: D.rail, table: { r: D.table, use: D.tableUse }, decks: { ...D.decks }, seat: { x, z: z + D.seat } };
}

/** Where she starts a night, from the treehouse's spot (metres east and south): behind the decks on the Terrace (the house), on the deck,
 *  or at the old studio. */
export const seatOffset = (t: Tuning): { x: number; z: number } => (t.treehouse.house?.on ? { ...HOUSE_ROOMS.terrace.seat } : { x: 0, z: t.treehouse.deck?.on ? t.treehouse.deck.seat : 1 });

/** On the Terrace's own floor (the house: its room's outline), `pad` metres past it. */
export function onTerraceFloor(d: Deck, x: number, z: number, pad = 0): boolean {
  const p = toPlan(d, x, z);
  return inRoom(HOUSE_ROOMS.shape, "terrace", p.x, p.z) <= pad;
}

/** The whole floor of the house (the oak's one shape), `pad` metres past its edges; or the deck's disc. */
export const onFloor = (d: Deck, x: number, z: number, pad = 0): boolean => (d.house?.rooms ? floorDistance(d.house.rooms, x, z) <= pad : Math.hypot(x - d.x, z - d.z) <= d.r + pad);

/** On the Terrace (the house's one open floor, where she lands and takes off): its own floor; or the deck's disc. */
export const onTerrace = (d: Deck, x: number, z: number): boolean => (d.house ? onTerraceFloor(d, x, z) : Math.hypot(x - d.x, z - d.z) <= d.r);
/** By the Terrace's open rim (the take-off, base.json terrace.takeoff): within its angle span round the Terrace's middle and no more than
 *  3 m past its size (the mock's own test: where the rim's drawn open, worn pale with no lip), so a step off the floor there is a step
 *  off the house. */
export function atTakeoff(d: Deck, x: number, z: number): boolean {
  const k = d.house?.takeoff; if (!k) return false;
  const dx = x - d.x, dz = z - d.z, a = Math.atan2(dz, dx), da = Math.abs(((a - k.angle + 3 * Math.PI) % (2 * Math.PI)) - Math.PI);
  return Math.hypot(dx, dz) < d.r + 3 && da < k.half;
}
/** In the house's rooms or on its branches, off the Terrace: she can't rise there (Ed, 2026-10-23: "She shouldn't be able to rise
 *  while in the treehouse, except on the terrace"; rules/witch.ts). The rooms' floor give or take the rail (as onFloor's):
 *  the walls keep her on a round room's very edge, which a floor test with none reads as just outside it (Ed's playtest, v4273: the
 *  pad's X at a bedroom station, the stick held toward it, took her off). */
export const noRiseAt = (d: Deck, x: number, z: number): boolean => !!d.house?.rooms && onRoomFloor(d.house.rooms, x, z, d.rail) && !onTerrace(d, x, z);

/** Flying at treetop height over the Terrace: she lands on it (Ed, 2026-10-14: "to enter the treehouse you fly directly onto a
 *  balcony"; the oak's Terrace since 2026-10-24, its open rim facing the dancefloor), where she is over its floor. */
export const flyOnto = (d: Deck, x: number, z: number): boolean => !!d.house && onTerraceFloor(d, x, z, -d.rail) && onFloor(d, x, z, -d.rail);

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

/** Over the deck (or anywhere over the house's floor), near enough to land on it: where she stays perched, walking it. */
export const overDeck = (d: Deck, x: number, z: number): boolean => onFloor(d, x, z, d.grace);
/** Where coming down from the treetops with the button lands her on it: over the deck; the house only over its Terrace (the oak's
 *  rooms spread far over the forest round it: coming down over them she lands on the ground beneath, as anywhere). */
export const landsOn = (d: Deck, x: number, z: number): boolean => (d.house ? onTerraceFloor(d, x, z, d.grace) : overDeck(d, x, z));

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

/** Out of the decks' desk (the house: a box on the Terrace's open rim, her seat behind it): (x, z) inside it, 0.3 m round, put back
 *  out of its nearest side. */
function outOfDeskBox(d: Deck, x: number, z: number): { x: number; z: number } {
  const b = d.house!.desk, hw = b.w / 2 + 0.3, hd = b.d / 2 + 0.3, dx = x - b.x, dz = z - b.z;
  if (Math.abs(dx) >= hw || Math.abs(dz) >= hd) return { x, z };
  const out = [hw - dx, hw + dx, hd - dz, hd + dz], m = Math.min(...out);
  return m === out[0] ? { x: b.x + hw, z } : m === out[1] ? { x: b.x - hw, z } : m === out[2] ? { x, z: b.z + hd } : { x, z: b.z - hd };
}

/** The nearest place to (x, z) she can stand in the house: on its floor, the rail in from its edge, and out of the decks' desk; `off`
 *  when (x, z) has gone out over the Terrace's open rim (she flies, or falls), the place given then on the floor's edge there. */
export function keepInHouse(d: Deck, x: number, z: number): { x: number; z: number; off: boolean } {
  const rooms = d.house!.rooms;
  if (!rooms || onRoomFloor(rooms, x, z)) return { ...outOfDeskBox(d, x, z), off: false };
  const n = nearestRoomFloor(rooms, x, z)!;
  // out over the open rim (past where the rest of the floor's edge keeps her, the rail in from it): off the house
  if (atTakeoff(d, x, z)) return { x: n.x, z: n.z, off: true };
  return { ...outOfDeskBox(d, n.x, n.z), off: false };
}

/** Within reach of the map table (E there opens the sea chart). */
export const atMapTable = (d: Deck, x: number, z: number): boolean => (HOUSE_ROOMS.organic && d.house ? objectAt(d, x, z)?.use.kind === "chart" : Math.hypot(x - d.x, z - d.z) <= d.table.r + d.table.use); // (the Ent's own house: the Atrium's map table, Ed 2026-10-23)

/** Does a 💌 thrown from the deck (or the house's floor) leave it (from (x0, z0) to (x1, z1))? It vanishes at the rail, as one leaving a legend's circle. */
export const leavesDeck = (d: Deck, x0: number, z0: number, x1: number, z1: number): boolean => onFloor(d, x0, z0) && !onFloor(d, x1, z1);
