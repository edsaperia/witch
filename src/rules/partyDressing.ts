// Party objects (Ed, 2026-10-04; art/party.js, #38): what a partified area is strewn with, so party
// ground reads at a glance from the dormant forest. Ed's rulings: neon and balloon colours random
// per placement; 2 to 4 clusters, 20 to 40 loose objects and 0 to 1 set dressing per area;
// hanging things on real branches (the escaped balloon caught in a crown; the lanterns and the
// mirror ball stand on their poles); point lights from campfires and lanterns only, a few per area.
// Everything is seeded from the area's cell, so it's the same each time. No drawing here.
import { PARTY_BY_ID, PARTY_CLUSTERS, PARTY_LIGHT_NEONS, PARTY_OBJECTS } from "../../art/party.js";
import { NEON, SIGIL_NEON } from "../../art/sigils.js";
import { AREAS } from "../../art/areas.js";
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
  /** Lanterns, a jar, fairy lights or a mirror ball hanging from the trees near here (the view
   *  hangs each from a branch point in the nearest tree's crown by its hang anchor). */
  hanging: Placed[];
  /** The pieces whose light is real (campfires and lanterns: at most partyObjects.lightsPerArea), by their ref and place. */
  lights: Placed[];
  /** The area's party neons (areaNeons): the view recolours its clusters' neon pieces from them. */
  neons: string[];
}

/** Each piece that can be a loose one. */
const POOL = DEFS.filter(d => (d.cls === "litter" || d.cls === "small" || d.cls === "balloon") && !d.hang);
const HANGING = DEFS.filter(d => d.hang && d.cls !== "balloon" && d.id !== "balloon-caught");
const SETS = DEFS.filter(d => d.cls === "set");
/** The clusters any party area can have: all but home's own (#53). */
const WILD_CLUSTERS = PARTY_CLUSTERS.filter(c => !c.id.startsWith("home-"));

/** An area's party neons (the art director, round 1: "neons limited to the area's own colour plus one accent", so the party reads
 *  as warm pools, not six hues at once): its creature's sigil colour three times in four, one accent picked for the area; home,
 *  which has no creature, violet with a cyan accent. */
export function areaNeons(map: ForestMap, cell: Cell): string[] {
  const home = cell[0] === map.centreCell[0] && cell[1] === map.centreCell[1];
  if (home) return ["cyan", "cyan", "cyan", "cyan"]; // home: its speakers' and runes' cyan alone, with the warm light (the art director, round 2)
  const own = (SIGIL_NEON as Record<string, string>)[(AREAS as { creature: string }[])[map.typeOf(cell[0], cell[1])]?.creature] ?? "violet";
  const others = PARTY_LIGHT_NEONS.filter(n => n !== own), accent = others[Math.floor(rng(map.seed * 31 + cell[0] * 977 + cell[1] * 131 + 5)() * others.length)];
  return [own, own, own, accent];
}
/** A ref for a piece: its neon from the area's (neons, else any), its balloons' palette at random (Ed: random per placement). */
export function refFor(d: PartyDef, r: () => number, neons: string[] = PARTY_LIGHT_NEONS): string {
  const neon = d.light === "neon" ? "@" + neons[Math.floor(r() * neons.length)] : "";
  const pal = d.cls === "balloon" ? "~" + PALETTES[Math.floor(r() * PALETTES.length)] : "";
  return `party:${d.id}${neon}${pal}`;
}

/** The hand-made pieces the prop generator's variants replace (art/party.js PARTY_GEN, "gen-*", each with its `replaces`). */
const REPLACED = new Set(DEFS.flatMap(d => (d as PartyDef & { replaces?: string[] }).replaces ?? []));
/** Whether a piece is left out: partyObjects.exclude (Ed, v271: "the glowing party cubes look too much like game objects"); the
 *  generated variants unless partyObjects.generated (?props=gen), and the hand-made ones they replace when it is. */
export const leftOut = (id: string, t: Tuning) => t.partyObjects.exclude.includes(id) || (id.startsWith("gen-") ? !t.partyObjects.generated : t.partyObjects.generated && REPLACED.has(id));
export const excluded = (ref: string, t: Tuning) => leftOut(pieceId(ref), t);

/** The party objects of a partified area (seeded by its cell). */
export function dressingOf(map: ForestMap, cell: Cell, t: Tuning): Dressing {
  const pool = POOL.filter(d => !leftOut(d.id, t)), sets = SETS.filter(d => !leftOut(d.id, t));
  const P = t.partyObjects, r = rng(map.seed * 4517 + cell[0] * 7349 + cell[1] * 2903 + 11), site = map.siteOf(cell[0], cell[1]);
  const d = map.dancefloor, clear = floorClearing(t) + 3, ss = map.soundsystemSpot(cell[0], cell[1]);
  const taken: { x: number; z: number; r: number }[] = [];
  // A free spot in the area: out from its clearing's middle, not on a path, kept ground, the
  // dancefloor's clearing, its soundsystem or anything already placed.
  const spotFor = (gap: number, from = 0.08, to = 0.45, round?: { x: number; z: number; near: number; far: number }): { x: number; z: number } | null => {
    for (let k = 0; k < 40; k++) {
      const a = r() * Math.PI * 2, dist = round ? round.near + r() * (round.far - round.near) : map.areaSize * (from + r() * (to - from)), x = (round ?? site).x + Math.cos(a) * dist, z = (round ?? site).z + Math.sin(a) * dist;
      const at = map.areaAt(x, z);
      if (at.cell[0] !== cell[0] || at.cell[1] !== cell[1] || map.paths.at(x, z, 1) || map.hardClear(x, z)) continue;
      // Never on the dancefloor, its rim or its ring of speakers (Ed: home is a party area too, but
      // its things stay off the floor), nor on the treehouse, its terrace or her start seat.
      if (Math.hypot(x - d.x, z - d.z) < clear || Math.hypot(x - ss.x, z - ss.z) < 4) continue;
      if (Math.hypot(x - map.treehouse.x, z - map.treehouse.z) < t.treehouse.clear + 2 || Math.hypot(x - map.start.x, z - map.start.z) < 4) continue;
      if (taken.some(q => Math.hypot(q.x - x, q.z - z) < q.r + gap)) continue;
      taken.push({ x, z, r: gap });
      return { x, z };
    }
    return null;
  };
  const between = ([lo, hi]: number[]) => lo + Math.floor(r() * (hi - lo + 1));
  const neons = areaNeons(map, cell), ref = (d: PartyDef, rr: () => number) => refFor(d, rr, neons);
  const out: Dressing = { clusters: [], loose: [], caught: null, hanging: [], lights: [], neons };
  // Home (Ed, 2026-10-05: "It has party decorations instead of trees; ... they can be scattered
  // around the whole home area, excluding the dancefloor"): its meadow strewn all over with the party
  // pieces, by class (partyObjects.home.weights: the home set, small lights, balloons, litter,
  // furniture, set dressing), and clusters (the home ones among the rest), off the floor and its
  // clearing, the paths, the treehouse and her seat; an arch over each path where it leaves the
  // floor's clearing. No hanging things: home has no trees.
  const home = cell[0] === map.centreCell[0] && cell[1] === map.centreCell[1];
  if (home) return homeDressing(map, t, r, out, ref);
  for (let i = 0, n = between(P.clusters); i < n; i++) {
    const s = spotFor(4);
    if (s) out.clusters.push({ id: WILD_CLUSTERS[Math.floor(r() * WILD_CLUSTERS.length)].id, ...s, mirror: r() < 0.5 });
  }
  if (r() < P.setChance && sets.length) { const s = spotFor(3); if (s) out.loose.push({ ref: ref(sets[Math.floor(r() * sets.length)], r), ...s, flip: r() < 0.5 }); }
  for (let i = 0, n = between(P.loose); i < n; i++) {
    const s = spotFor(0.6, 0.05, 0.5);
    if (s) out.loose.push({ ref: ref(pool[Math.floor(r() * pool.length)], r), ...s, flip: r() < 0.5 });
  }
  const hangs = HANGING.filter(d => !leftOut(d.id, t));
  for (let i = 0, n = hangs.length ? between(P.hanging) : 0; i < n; i++) { const s = spotFor(2, 0.1, 0.5); if (s) out.hanging.push({ ref: ref(hangs[Math.floor(r() * hangs.length)], r), ...s, flip: r() < 0.5 }); }
  if (r() < P.caughtChance) { const s = spotFor(1, 0.2, 0.55); if (s) out.caught = { ref: `party:balloon-caught~${PALETTES[Math.floor(r() * PALETTES.length)]}`, ...s, flip: r() < 0.5 }; }
  // Real lights: the loose campfires and lanterns first (the clusters' own are added by the view, which knows their layout), at most lightsPerArea.
  for (const p of [...out.loose, ...out.hanging]) { const def = partyDef(p.ref); if (def && (def.pointLight || LANTERNS.has(def.id)) && !def.cold && out.lights.length < P.lightsPerArea) out.lights.push(p); }
  // Balloons by the lights (the art director, round 1: "balloons lit by the warm light, not glowing"): most of the loose balloons
  // stand within a few metres of one of the area's real lights, so its warm light catches their shine.
  if (out.lights.length) for (const p of out.loose) {
    if (partyDef(p.ref)?.cls !== "balloon" || r() >= 0.7) continue;
    const L = out.lights[Math.floor(r() * out.lights.length)], s = spotFor(0.6, 0, 0, { x: L.x, z: L.z, near: 1.2, far: 2.8 });
    if (s) { p.x = s.x; p.z = s.z; }
  }
  return out;
}

/** Home's dressing: party pieces scattered over its whole meadow (see dressingOf). */
function homeDressing(map: ForestMap, t: Tuning, r: () => number, out: Dressing, ref: (d: PartyDef, r: () => number) => string): Dressing {
  const P = t.partyObjects, H = P.home, d = map.dancefloor, th = map.treehouse, clear = floorClearing(t);
  const ok = (id: string) => !leftOut(id, t);
  const byClass = new Map<string, PartyDef[]>();
  for (const def of DEFS) if (!def.hang && ok(def.id) && def.id !== P.arch && H.weights[def.cls] !== undefined) byClass.set(def.cls, [...(byClass.get(def.cls) ?? []), def]);
  const classes = [...byClass.keys()], total = classes.reduce((a, c) => a + H.weights[c], 0);
  const pickDef = () => { let k = r() * total; for (const c of classes) { k -= H.weights[c]; if (k <= 0) { const l = byClass.get(c)!; return l[Math.floor(r() * l.length)]; } } const l = byClass.get(classes[0])!; return l[0]; };
  const taken: { x: number; z: number; r: number }[] = [];
  const reach = map.homeRadius + map.areaSize * H.reach;
  const spot = (gap: number, keep = 2): { x: number; z: number } | null => {
    for (let k = 0; k < 48; k++) {
      const a = r() * Math.PI * 2, dist = clear + 3 + Math.sqrt(r()) * (reach - clear - 3), x = d.x + Math.cos(a) * dist, z = d.z + Math.sin(a) * dist;
      const at = map.areaAt(x, z).cell;
      if (at[0] !== map.centreCell[0] || at[1] !== map.centreCell[1]) continue;
      if (map.paths.at(x, z, keep) || map.hardClear(x, z)) continue;
      if (Math.hypot(x - th.x, z - th.z) < t.treehouse.clear + 3 || Math.hypot(x - map.start.x, z - map.start.z) < 4) continue;
      if (taken.some(q => Math.hypot(q.x - x, q.z - z) < q.r + gap)) continue;
      taken.push({ x, z, r: gap });
      return { x, z };
    }
    return null;
  };
  // An arch over each path where it leaves the floor's clearing.
  if (BY_ID[P.arch] && ok(P.arch)) {
    const R = clear + 2.5, n = Math.floor((Math.PI * 2 * R) / 2);
    let onPath = false;
    for (let i = 0; i < n; i++) {
      const a = (i / n) * Math.PI * 2, x = d.x + Math.cos(a) * R, z = d.z + Math.sin(a) * R, path = !!map.paths.at(x, z, 1);
      if (path && !onPath && Math.hypot(x - th.x, z - th.z) > t.treehouse.clear + 2) { out.loose.push({ ref: ref(BY_ID[P.arch], r), x, z, flip: false }); taken.push({ x, z, r: 2 }); }
      onPath = path;
    }
  }
  const lo = (v: number[]) => v[0] + Math.floor(r() * (v[1] - v[0] + 1));
  // Clusters: the home ones first, then any.
  const homeCl = PARTY_CLUSTERS.filter(c => c.id.startsWith("home-")), anyCl = PARTY_CLUSTERS;
  for (let i = 0, n = lo(H.clusters); i < n; i++) {
    const s = spot(5, 3);
    if (s) out.clusters.push({ id: (i < homeCl.length * 2 ? homeCl[i % homeCl.length] : anyCl[Math.floor(r() * anyCl.length)]).id, ...s, mirror: r() < 0.5 });
  }
  for (let i = 0, n = lo(H.loose); i < n; i++) {
    const def = pickDef(), s = spot(def.cls === "furniture" || def.cls === "set" ? 3 : H.gap);
    if (s) out.loose.push({ ref: ref(def, r), ...s, flip: r() < 0.5 });
  }
  for (const p of out.loose) { const def = partyDef(p.ref); if (def && (def.pointLight || LANTERNS.has(def.id)) && !def.cold && out.lights.length < H.lights) out.lights.push(p); }
  return out;
}

/** A piece's real light, if it has one: campfires their own; lanterns a small warm glow. */
export function lightOf(ref: string, t: Tuning): { rgb: number[]; radius: number; height: number } | null {
  const def = partyDef(ref);
  if (!def || def.cold) return null;
  if (def.pointLight) {
    // "neon": the light of the neon this one was baked in.
    const rgb = def.pointLight.rgb as unknown;
    return rgb === "neon" ? { ...def.pointLight, rgb: (NEON as Record<string, number[]>)[ref.split("@")[1]?.split("~")[0] ?? "pink"] ?? NEON.pink } : def.pointLight;
  }
  return LANTERNS.has(def.id) ? { rgb: [255, 186, 96], radius: t.partyObjects.lanternReach, height: 1.4 } : null;
}

export const isLit = (ref: string) => { const def = partyDef(ref); return !!def && !def.cold && (!!def.pointLight || LANTERNS.has(def.id)); };
