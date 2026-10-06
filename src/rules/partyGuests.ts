// Guests at the party (the overnight brief: "make the party in the forest feel alive"): a happy
// creature in a partified area doesn't only crowd its soundsystem; it drifts to the party's own
// places in its area (rules/partyDressing.ts): a picnic rug, a table and chairs, a ring of candles,
// a bunch of balloons, a lantern's light; and keeps round it, dancing (the view dances it on the
// beat). Who goes where is dealt by its id, so it's the same every time; a share stay by the
// soundsystem. The spots are worked out once an area. No drawing here.
import type { Creature } from "./creatures";
import type { ForestMap } from "./map";
import type { Cell } from "./partition";
import { PARTY_CLUSTER_BY_ID } from "../../art/party.js";
import { dressingOf, isLit, partyDef } from "./partyDressing";
import { hash2 } from "./random";
import type { Tuning } from "./tuning";

/** A place guests gather: where, and how far round it they keep. */
export interface PartySpot { x: number; z: number; r: number; kind: "soundsystem" | "cluster" | "picnic" | "balloons" | "light" }

/** How far round a spot its guests keep (metres): a cluster's pieces spread a metre or two, a soundsystem's crowd wider. */
export const SPOT_RANGE = { soundsystem: 9, cluster: 2.6, picnic: 2.2, balloons: 2, light: 2.2 } as const;
/** The share of an area's guests who stay by its soundsystem; the rest go to its party places. */
export const AT_SOUNDSYSTEM = 0.35;
/** A cluster worth gathering at: one with a picnic, furniture, balloons or a light in it (not a scatter of litter or stepping stones). */
const SOCIABLE = new Set(["picnic", "furniture", "balloon"]);
const sociable = (id: string) => ((PARTY_CLUSTER_BY_ID as unknown as Record<string, { pieces: [string][] }>)[id]?.pieces ?? []).some(([ref]) => SOCIABLE.has(partyDef(ref)?.cls ?? "") || isLit(ref));
/** At most this many party places an area (its sociable clusters first, then picnics and tables, balloons and lights). */
const MAX_SPOTS = 8, ROOM = 6;

const cache = new WeakMap<ForestMap, Map<string, PartySpot[]>>();
/** The party places in an area (not its soundsystem): its sociable clusters, then its loose picnics and tables, balloons and lights. */
export function partySpots(map: ForestMap, cell: Cell, t: Tuning): PartySpot[] {
  let byCell = cache.get(map);
  if (!byCell) cache.set(map, (byCell = new Map()));
  const key = `${cell[0]},${cell[1]}`;
  let spots = byCell.get(key);
  if (!spots) {
    const d = dressingOf(map, cell, t);
    const all: PartySpot[] = d.clusters.filter(c => sociable(c.id)).map(c => ({ x: c.x, z: c.z, r: SPOT_RANGE.cluster, kind: "cluster" as const }));
    const loose = (kind: "picnic" | "balloons" | "light", is: (cls: string, ref: string) => boolean) => { for (const p of d.loose) if (is(partyDef(p.ref)?.cls ?? "", p.ref)) all.push({ x: p.x, z: p.z, r: SPOT_RANGE[kind], kind }); };
    loose("picnic", cls => cls === "picnic" || cls === "furniture");
    loose("balloons", cls => cls === "balloon");
    loose("light", (cls, ref) => isLit(ref) && cls !== "picnic" && cls !== "furniture");
    // (only places with room round them for their guests' arc: 6 m of their own area each way)
    const own = (x: number, z: number) => { const c = map.cellSafe(x, z).cell; return c[0] === cell[0] && c[1] === cell[1]; };
    spots = all.filter(s => own(s.x, s.z - ROOM) && own(s.x - ROOM, s.z) && own(s.x + ROOM, s.z) && own(s.x, s.z + ROOM)).slice(0, MAX_SPOTS);
    byCell.set(key, spots);
  }
  return spots;
}

/** Guests stand round a party place (the art director, #200: "they pile up"): in a shallow arc behind it (the far side,
 *  -z, so the side towards the camera stays open and none stands in front of another), side by side across the screen
 *  (the camera looks along z, so depth barely parts two silhouettes: only x does), the big ones further back; a second
 *  row behind when the first is full (`front`: the row on the near side, for a place whose far side is over its area's
 *  edge). `u`: its offset across (metres), `body`: its body radius (rules/spacing.ts). Each keeps to its slot,
 *  shuffling within `SLOT_RANGE` metres. */
export const SLOT_RANGE = 0.5, ROW_HALF = 10, ROW_STEP = 0.5;
export function guestSlot(spot: PartySpot, u: number, body: number, row = 0, front = false): { x: number; z: number; r: number } {
  if (spot.kind === "soundsystem") return spot;
  const back = spot.r * 0.6 + body * 1.5 + row * 3.5 + 0.06 * u * u;
  return { x: spot.x + u, z: spot.z + (front ? back : -back), r: SLOT_RANGE };
}
/** How far apart across the screen two guests stand (metres), by their body radii: their sprites stand wider than their
 *  bodies, so this is roomier than spacing.ts keeps them; each reads as its own silhouette. Two further apart in depth
 *  than `GUEST_DEPTH` don't overlap whatever their x. */
export const guestGap = (a: number, b: number) => (a + b) * 4 + 0.8, GUEST_DEPTH = 3;
/** Its offsets across, in the order tried: the middle first, then out either side. */
export const ROW_OFFSETS: number[] = [0];
for (let d = ROW_STEP; d <= ROW_HALF; d += ROW_STEP) ROW_OFFSETS.push(-d, d);

/** Where this guest gathers: by its soundsystem (a share of them) or at one of the area's party places, dealt by its id. */
export function guestSpot(c: Pick<Creature, "id">, soundsystem: { x: number; z: number }, spots: PartySpot[]): PartySpot {
  if (!spots.length || hash2(c.id, 17, 401) < AT_SOUNDSYSTEM) return { x: soundsystem.x, z: soundsystem.z, r: SPOT_RANGE.soundsystem, kind: "soundsystem" };
  return spots[Math.floor(hash2(c.id, 23, 409) * spots.length) % spots.length];
}
