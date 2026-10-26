// The builders' quick shot (?shot=<scene>; the coordinator's ask, 2026-10-23: a proof shot of a room, an area, a creature or a find
// in a minute or two on the cloud's software renderer, where a whole night's art took 15 to 45 minutes): the night as ?quick=1 makes
// it (only the art the view needs, as it needs it), the start's card skipped and the waves held, and her put where the scene is, so
// the view asks only for that spot's art. tools/shot/shot.cjs loads it, waits for the art and saves the frame.
//   object:<id>  (or station:<id>) in front of a house object (config/house/), on foot, at the stations' reach
//   room:<id>    in the middle of a house room
//   area:<type>  on foot at the middle of the nearest area of that type (art/areas.js ids; an island lacking it says so)
//   creature:<species>[@level]  one of that species (0 baby .. 3 legend; 2 by default) 6 m east of her by the dancefloor, friendly
//   find:<kind>:<item> | find:tonight   that find on clear ground a few metres in front of her by the dancefloor (rules/finds.ts)
//   at:<x>,<z>[,treetop]   anywhere, on foot or in the treetops
//   legend[:<n>[,<south>[,treetop]]]   south of a legend's circle (the nth biggest, 0 by default), <south> m from its middle (its
//                radius and 12 m more by default: outside its ring of trees, looking in), on foot or in the treetops
import { deckOf } from "../rules/treehouse";
import { HOUSE_ROOMS, fromPlan, objectFront } from "../rules/houseRooms";
import { AREA_TYPES } from "../rules/map";
import { newCamera } from "../rules/camera";
import { witchHeight } from "../rules/witch";
import { spawnFind, spawnSpot, type FindKindId } from "../rules/finds";
import type { Game } from "../rules/game";

/** What a shot did: where she is and what's there, or why it couldn't (an unknown id, nothing of that kind on this island). */
export interface ShotResult { ok: boolean; say: string; x?: number; z?: number }

/** Puts her (and what the scene shows) in place for the scene. The rules' state only: the view follows on its next frame. */
export function applyShot(g: Game, scene: string): ShotResult {
  const [what, ...rest] = scene.split(":"), arg = rest.join(":");
  const put = (x: number, z: number, opts: { perch?: boolean; treetop?: boolean } = {}): void => {
    g.witch = { ...g.witch, x, z, vx: 0, vz: 0, mode: opts.treetop ? "treetop" : "ground", lift: opts.treetop ? 1 : 0, seated: false, perch: opts.perch ? true : undefined };
    g.camera = newCamera(g.tuning, x, witchHeight(g.witch, g.tuning), z);
    g.camera.intro = 0;
    g.introFocus = undefined;
  };
  // (by the dancefloor's south edge, on the home area's open ground: the debug arena's spot, rules/arena.ts)
  const open = () => { const d = g.map.dancefloor; return { x: d.x, z: d.z + d.radius + 14 }; };
  switch (what) {
    case "object": case "station": case "room": {
      const deck = deckOf(g.map, g.tuning);
      if (!deck?.house) return { ok: false, say: "no treehouse rooms on this map" };
      if (what === "room") {
        const r = HOUSE_ROOMS.rooms.find(q => q.id === arg);
        if (!r) return { ok: false, say: `no room ${arg} (rooms: ${HOUSE_ROOMS.rooms.map(q => q.id).join(", ")})` };
        const p = fromPlan(deck, (r.x0 + r.x1) / 2, (r.z0 + r.z1) / 2);
        put(p.x, p.z, { perch: true });
        return { ok: true, say: `in the ${r.label}`, ...p };
      }
      const o = HOUSE_ROOMS.objects.find(q => q.id === arg);
      if (!o) return { ok: false, say: `no object ${arg} (objects: ${HOUSE_ROOMS.objects.map(q => q.id).join(", ")})` };
      const p = objectFront(o, deck, 1);
      put(p.x, p.z, { perch: true });
      return { ok: true, say: `at the ${o.label}`, ...p };
    }
    case "area": {
      const t = AREA_TYPES.findIndex(a => a.id === arg);
      if (t < 0) return { ok: false, say: `no area type ${arg}` };
      const m = g.map, d = m.dancefloor;
      let best: { x: number; z: number } | null = null, bd = Infinity;
      for (const [cx, cy] of m.cells) if (m.typeOf(cx, cy) === t) { const s = m.siteOf(cx, cy), k = Math.hypot(s.x - d.x, s.z - d.z); if (k < bd) { bd = k; best = s; } }
      if (!best) return { ok: false, say: `no ${arg} on this island (try ?island= or ?zoo)` };
      put(best.x, best.z);
      return { ok: true, say: `in ${AREA_TYPES[t].name ?? arg}`, ...best };
    }
    case "creature": {
      const [species, lv] = arg.split("@"), level = lv === undefined ? 2 : Math.max(0, Math.min(3, Math.round(Number(lv)) || 0));
      const at = open();
      put(at.x, at.z);
      // (one borrowed from far off, as the arena does: the map's edge holds plenty)
      const c = g.creatures.filter(k => !k.gone && !k.leashed && !k.boss && Math.hypot(k.x - at.x, k.z - at.z) > 200).sort((a, b) => Math.hypot(b.x - at.x, b.z - at.z) - Math.hypot(a.x - at.x, a.z - at.z))[0];
      if (!c) return { ok: false, say: "no creature to borrow" };
      const x = at.x + 6, z = at.z, cell = g.map.cellSafe(x, z).cell as [number, number];
      Object.assign(c, { species, level, x, z, tx: x, tz: z, cell, homeX: x, homeZ: z, anchorX: x, anchorZ: z, range: 2, friendly: true, circle: undefined, siege: undefined, enraged: false, state: undefined, asleep: undefined, napUntil: undefined, watchUntil: undefined, wanderTo: undefined });
      return { ok: true, say: `a ${species} (level ${level}) by her`, ...at };
    }
    case "find": {
      const at = open();
      put(at.x, at.z);
      const spot = spawnSpot(g);
      if (!spot) return { ok: false, say: "no clear ground for a find" };
      if (arg === "tonight") {
        if (!g.trunk?.item) return { ok: false, say: "no find tonight (its trunk is filled by the page: give it a frame)" };
        Object.assign(g.trunk, { x: spot.x, z: spot.z, cell: g.map.cellSafe(spot.x, spot.z).cell });
        return { ok: true, say: `tonight's ${g.trunk.kind} ${g.trunk.item}`, ...spot };
      }
      const [kind, item] = arg.split(":");
      return spawnFind(g, kind as FindKindId, item, spot) ? { ok: true, say: `a ${kind} find: ${item}`, ...spot } : { ok: false, say: `no ${kind} ${item}` };
    }
    case "legend": {
      const [n = "0", south, mode] = arg.split(","), all = [...g.map.legendClearings].sort((a, b) => b.r - a.r), c = all[Math.max(0, Math.round(+n) || 0)];
      if (!c) return { ok: false, say: `no legend circle ${n} on this island (it has ${all.length})` };
      const d = south !== undefined && south !== "" && Number.isFinite(+south) ? +south : c.r + 12, x = c.x, z = c.z + d;
      put(x, z, { treetop: mode === "treetop" });
      const t = g.map.typeOf(c.cell[0], c.cell[1]);
      return { ok: true, say: `${d.toFixed(0)} m south of the ${AREA_TYPES[t]?.creature ?? "?"} legend's circle (radius ${c.r.toFixed(1)} m)`, x, z };
    }
    case "at": {
      const [x, z, mode] = arg.split(",");
      if (!Number.isFinite(+x) || !Number.isFinite(+z)) return { ok: false, say: `at needs x,z (got ${arg})` };
      put(+x, +z, { treetop: mode === "treetop" });
      return { ok: true, say: `at ${x}, ${z}`, x: +x, z: +z };
    }
  }
  return { ok: false, say: `no scene ${what} (object, room, area, creature, find, at, legend)` };
}

/** The last shot applied (the page's ?shot=, or window.witch.shot): what tools/shot/shot.cjs reports. */
export let lastShot: (ShotResult & { scene: string }) | null = null;
/** applyShot, kept as the last shot. */
export function takeShot(g: Game, scene: string): ShotResult { const r = applyShot(g, scene); lastShot = { ...r, scene }; console.log(`shot ${scene}: ${r.say}`); return r; }

/** The link's switches a shot implies: only the art the view needs, no start card or bedroom, the party spell cast and the waves
 *  held (the rest of the link is kept, so ?seed=, ?island=, ?own=, ?hat= and the like still apply). */
export function shotParams(params: URLSearchParams): void {
  if (!params.has("shot")) return;
  for (const [k, v] of [["quick", "1"], ["creator", "0"], ["spell", "auto"], ["pulse", "off"]] as const) if (!params.has(k)) params.set(k, v);
}
