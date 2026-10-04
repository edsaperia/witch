// Party objects (Ed, 2026-10-04; art/party.js, #38): what a partified area is strewn with, so party
// ground reads at a glance from the dormant forest. Ed's rulings: neon and balloon colours random
// per placement; 2 to 4 clusters, 20 to 40 loose objects and 0 to 1 set dressing per area;
// hanging things on real branches (the escaped balloon caught in a crown; the lanterns and the
// mirror ball stand on their poles); point lights from campfires and lanterns only, a few per area.
// Everything is seeded from the area's cell, so it's the same each time. No drawing here.
import { PARTY_BY_ID, PARTY_CLUSTERS, PARTY_LIGHT_NEONS, PARTY_OBJECTS } from "../../art/party.js";
import type { ForestMap } from "./map";

import type { Cell } from "./partition";
import { rng } from "./random";
import { floorClearing } from "./speakers";
import type { Tuning } from "./tuning";

type PartyDef = { id: string; cls: string; light: string | null; decal: boolean; cold?: boolean; hang?: boolean; frames: number; pointLight?: { rgb: number[]; radius: number; height: number }; bob?: { amplitude: number; period: number; phase: number } | null };
const DEFS = PARTY_OBJECTS as unknown as PartyDef[];
const BY_ID = PARTY_BY_ID as unknown as Record<string, PartyDef>;
const PALETTES = ["neon", "pastel", "metallic", "mixed"];
const LANTERNS = new Set(["lantern-pole", "lantern-string", "jam-jar-lantern"]);

/** A party piece's reference: "party:<id>[@<neon>][~<balloon palette>]" (as art/scenes.js reads them). */
export const pieceId = (ref: string) => ref.replace(/^party:/, "").split("~")[0].split("@")[0];
export const partyDef = (ref: string): PartyDef | undefined => BY_ID[pieceId(ref)];

export interface Placed { ref: string; x: number; z: number; flip: boolean }
export interface Dressing {
  /** Clusters (art/party.js PARTY_CLUSTERS): laid out round x, z as authored or mirrored. */
  clusters: { id: string; x: number; z: number; mirror: boolean }[];
  /** Loose pieces: litter, small lights, balloons; and the set dressing, if any. */
  loose: Placed[];
  /** An escaped balloon caught up in a crown near here (the view hangs it from the nearest tree). */
  caught: Placed | null;
  /** The pieces whose light is real (campfires and lanterns: at most partyObjects.lightsPerArea), by their ref and place. */
  lights: Placed[];
}

/** Each piece that can be a loose one. */
const POOL = DEFS.filter(d => (d.cls === "litter" || d.cls === "small" || d.cls === "balloon") && !d.hang);
const SETS = DEFS.filter(d => d.cls === "set");

/** A ref for a piece, its neon and balloons picked at random (Ed: random per placement). */
export function refFor(d: PartyDef, r: () => number): string {
  const neon = d.light === "neon" ? "@" + PARTY_LIGHT_NEONS[Math.floor(r() * PARTY_LIGHT_NEONS.length)] : "";
  const pal = d.cls === "balloon" ? "~" + PALETTES[Math.floor(r() * PALETTES.length)] : "";
  return `party:${d.id}${neon}${pal}`;
}

/** Whether a piece is left out (partyObjects.exclude; Ed, v271: "the glowing party cubes look too much like game objects"). */
export const excluded = (ref: string, t: Tuning) => t.partyObjects.exclude.includes(pieceId(ref));

/** The party objects of a partified area (seeded by its cell). */
export function dressingOf(map: ForestMap, cell: Cell, t: Tuning): Dressing {
  const pool = POOL.filter(d => !t.partyObjects.exclude.includes(d.id)), sets = SETS.filter(d => !t.partyObjects.exclude.includes(d.id));
  const P = t.partyObjects, r = rng(map.seed * 4517 + cell[0] * 7349 + cell[1] * 2903 + 11), site = map.siteOf(cell[0], cell[1]);
  const d = map.dancefloor, clear = floorClearing(t) + 3, ss = map.soundsystemSpot(cell[0], cell[1]);
  const taken: { x: number; z: number; r: number }[] = [];
  // A free spot in the area: out from its clearing's middle, not on a path, kept ground, the
  // dancefloor's clearing, its soundsystem or anything already placed.
  const spotFor = (gap: number, from = 0.08, to = 0.45): { x: number; z: number } | null => {
    for (let k = 0; k < 40; k++) {
      const a = r() * Math.PI * 2, dist = map.areaSize * (from + r() * (to - from)), x = site.x + Math.cos(a) * dist, z = site.z + Math.sin(a) * dist;
      const at = map.areaAt(x, z);
      if (at.cell[0] !== cell[0] || at.cell[1] !== cell[1] || map.paths.at(x, z, 1) || map.hardClear(x, z)) continue;
      if (Math.hypot(x - d.x, z - d.z) < clear || Math.hypot(x - ss.x, z - ss.z) < 4) continue;
      if (taken.some(q => Math.hypot(q.x - x, q.z - z) < q.r + gap)) continue;
      taken.push({ x, z, r: gap });
      return { x, z };
    }
    return null;
  };
  const between = ([lo, hi]: number[]) => lo + Math.floor(r() * (hi - lo + 1));
  const out: Dressing = { clusters: [], loose: [], caught: null, lights: [] };
  for (let i = 0, n = between(P.clusters); i < n; i++) {
    const s = spotFor(4);
    if (s) out.clusters.push({ id: PARTY_CLUSTERS[Math.floor(r() * PARTY_CLUSTERS.length)].id, ...s, mirror: r() < 0.5 });
  }
  if (r() < P.setChance && sets.length) { const s = spotFor(3); if (s) out.loose.push({ ref: refFor(sets[Math.floor(r() * sets.length)], r), ...s, flip: r() < 0.5 }); }
  for (let i = 0, n = between(P.loose); i < n; i++) {
    const s = spotFor(0.6, 0.05, 0.5);
    if (s) out.loose.push({ ref: refFor(pool[Math.floor(r() * pool.length)], r), ...s, flip: r() < 0.5 });
  }
  if (r() < P.caughtChance) { const s = spotFor(1, 0.2, 0.55); if (s) out.caught = { ref: `party:balloon-caught~${PALETTES[Math.floor(r() * PALETTES.length)]}`, ...s, flip: r() < 0.5 }; }
  // Real lights: the loose campfires and lanterns first (the clusters' own are added by the view, which knows their layout), at most lightsPerArea.
  for (const p of out.loose) { const def = partyDef(p.ref); if (def && (def.pointLight || LANTERNS.has(def.id)) && !def.cold && out.lights.length < P.lightsPerArea) out.lights.push(p); }
  return out;
}

/** A piece's real light, if it has one: campfires their own; lanterns a small warm glow. */
export function lightOf(ref: string, t: Tuning): { rgb: number[]; radius: number; height: number } | null {
  const def = partyDef(ref);
  if (!def || def.cold) return null;
  if (def.pointLight) return def.pointLight;
  return LANTERNS.has(def.id) ? { rgb: [255, 186, 96], radius: t.partyObjects.lanternReach, height: 1.4 } : null;
}

export const isLit = (ref: string) => { const def = partyDef(ref); return !!def && !def.cold && (!!def.pointLight || LANTERNS.has(def.id)); };
