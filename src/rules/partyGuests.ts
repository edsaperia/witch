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
const MAX_SPOTS = 8;

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
    spots = all.slice(0, MAX_SPOTS);
    byCell.set(key, spots);
  }
  return spots;
}

/** Where this guest gathers: by its soundsystem (a share of them) or at one of the area's party places, dealt by its id. */
export function guestSpot(c: Pick<Creature, "id">, soundsystem: { x: number; z: number }, spots: PartySpot[]): PartySpot {
  if (!spots.length || hash2(c.id, 17, 401) < AT_SOUNDSYSTEM) return { x: soundsystem.x, z: soundsystem.z, r: SPOT_RANGE.soundsystem, kind: "soundsystem" };
  return spots[Math.floor(hash2(c.id, 23, 409) * spots.length) % spots.length];
}
