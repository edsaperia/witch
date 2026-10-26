// The zoo (?zoo; Ed, 2026-10-13: "make a zoo where I can easily see all creatures in their areas, and they have nameplates and
// descriptions under each, and there's no timer etc ... Could be literally like a flat grid of city blocks with paths between, each
// block the terrain of the area, with a lit runestone at the centre. One row for each biome, and then creatures ordered by size left
// to right"): its plan, from config/zoo.json. Each block is a real area (rules/map.ts, the "zoo" shape: a square grid, no warp, no
// fractal borders), its own runestone, legend clearing and creatures; a row per biome, top (north) to bottom; home (the treehouse,
// the dancefloor) the entrance, at the left of the middle row; the kinds not yet designed (config/kinds.json placeholders) empty "?"
// blocks at the end of their rows; paths along every border, a relic's flask at each crossing (rules/legends.ts placeRelics). No
// drawing here.
import ZOO from "../../config/zoo.json";
import { AREAS } from "../../art/areas.js";
import { KINDS } from "./rosters";
import type { ZooLayout } from "./zooMap";

export interface ZooBlock {
  /** Its grid cell (column, row). */
  cell: [number, number];
  /** Its area type's id, or null for a kind not yet designed (an empty "?" block). */
  area: string | null;
  /** The kind it shows (its area's creature, or the placeholder's id). */
  kind: string;
  /** Its row's name (the biome's). */
  row: string;
  /** Laid out like the chart (rules/zooMap.ts): its island's middle (m), and whether it's found (its area) or not yet (a lake). */
  x?: number;
  z?: number;
  found?: boolean;
}

export interface ZooPlan {
  /** The grid's size (n x n cells: the map's). */
  n: number;
  /** The blocks' columns and rows (home's column, 0, and the rows' longest). */
  cols: number;
  rows: number;
  /** Home's cell: the entrance, at the left of the middle row. */
  home: [number, number];
  blocks: ZooBlock[];
  /** The rows' names, top to bottom. */
  rowNames: string[];
  /** The creatures each block starts with. */
  group: { babies: number; young: number; adults: number };
  /** Half a path's width (m). */
  pathHalf: number;
  /** Laid out like the chart (rules/zooMap.ts): the islands, home's middle and its cell. */
  layout?: ZooLayout;
}

interface ZooRow { name: string; biomes: string[]; areas: string[] }
interface ZooConfig { group: ZooPlan["group"]; pathHalf: number; gap?: number; size?: number; street?: number; margin?: number; legendCap?: number; plaza?: number; lip?: number; rows: ZooRow[] }
/** The zoo's config (config/zoo.json). */
export const ZOO_CONFIG = ZOO as ZooConfig;

/** The zoo's plan: every row's areas from column 1 (home's column 0 left free but for home), then any area type its list doesn't
 *  name yet whose creature's biome is the row's (the first such row: a new kind is in the zoo the day it lands, at its row's end,
 *  till tools/zoo/order.mjs --write puts it in its place), then its biomes' placeholder kinds. */
export function zooPlan(cfg: ZooConfig = ZOO as ZooConfig, kinds: Record<string, { biome?: string; placeholder?: boolean }> = KINDS,
  areas: readonly { id: string; creature: string }[] = AREAS as unknown as { id: string; creature: string }[]): ZooPlan {
  const blocks: ZooBlock[] = [];
  let widest = 0;
  const listed = new Set(cfg.rows.flatMap(r => r.areas)), firstRow = (biome: string) => cfg.rows.findIndex(r => r.biomes.includes(biome));
  cfg.rows.forEach((row, r) => {
    const mine = (biome: string | undefined) => firstRow(biome ?? "") === r;
    const unknown = Object.keys(kinds).filter(k => kinds[k].placeholder && mine(kinds[k].biome)).sort();
    const unlisted = areas.filter(a => !listed.has(a.id) && mine(kinds[a.creature]?.biome)).map(a => a.id);
    const line = [...[...row.areas, ...unlisted].map(a => ({ area: a as string | null, kind: a })), ...unknown.map(k => ({ area: null, kind: k }))];
    line.forEach((b, i) => blocks.push({ cell: [1 + i, r], area: b.area, kind: b.kind, row: row.name }));
    widest = Math.max(widest, line.length);
  });
  const cols = 1 + widest, rows = cfg.rows.length;
  return { n: Math.max(cols, rows), cols, rows, home: [0, Math.floor(rows / 2)], blocks, rowNames: cfg.rows.map(r => r.name), group: cfg.group, pathHalf: cfg.pathHalf };
}

/** The paths' crossings, in metres (`A` an area's size): every corner of the grid of blocks, home's column with them. */
export function zooJunctions(plan: Pick<ZooPlan, "cols" | "rows">, A: number): { x: number; z: number }[] {
  const out: { x: number; z: number }[] = [];
  for (let r = 0; r <= plan.rows; r++) for (let c = 0; c <= plan.cols; c++) out.push({ x: c * A, z: r * A });
  return out;
}

/** The paths: a straight line along every border between blocks, one for each side of a block (from crossing to crossing). */
export function zooPathLines(plan: Pick<ZooPlan, "cols" | "rows">, A: number, step = 3): [number, number][][] {
  const line = (x0: number, z0: number, x1: number, z1: number) => {
    const n = Math.max(1, Math.round(Math.hypot(x1 - x0, z1 - z0) / step)), pts: [number, number][] = [];
    for (let i = 0; i <= n; i++) pts.push([x0 + ((x1 - x0) * i) / n, z0 + ((z1 - z0) * i) / n]);
    return pts;
  };
  const out: [number, number][][] = [];
  for (let r = 0; r <= plan.rows; r++) for (let c = 0; c < plan.cols; c++) out.push(line(c * A, r * A, (c + 1) * A, r * A));
  for (let c = 0; c <= plan.cols; c++) for (let r = 0; r < plan.rows; r++) out.push(line(c * A, r * A, c * A, (r + 1) * A));
  return out;
}

/** The plan laid out like the sea chart (rules/zooMap.ts): every block at its island, home's cell the layout's, the grid the
 *  layout's; its rows (the jump list's, by biome) as zooPlan's. A block with no island (a kind not on the chart) is left out. */
export function zooChartPlan(L: ZooLayout, cfg: ZooConfig = ZOO as ZooConfig): ZooPlan {
  const base = zooPlan(cfg), byKind = new Map(L.islands.map(I => [I.kind, I]));
  const creature = new Map((AREAS as unknown as { id: string; creature: string }[]).map(a => [a.id, a.creature]));
  const blocks: ZooBlock[] = [];
  for (const b of base.blocks) {
    const I = byKind.get(b.area ? creature.get(b.area) ?? b.kind : b.kind);
    if (I) blocks.push({ ...b, cell: [I.cell[0], I.cell[1]], x: I.x, z: I.z, found: I.found });
  }
  return { ...base, n: L.n, cols: L.n, rows: base.rows, home: [L.homeCell[0], L.homeCell[1]], blocks, layout: L };
}

/** The zoo's way out (Ed, 2026-10-26: "Near the top of the ent circle there is a mini treehouse tree, about twice her height; if you go
 *  up to it there is a use key prompt and 'exit' which takes her back"): the little treehouse oak just north of the Ent's circle (the far
 *  side from the camera, so it hides none of it), and how near her feet must be to use it (m). */
export const ZOO_EXIT_REACH = 4;
export function zooExitSpot(map: { zoo?: { layout?: { home: { x: number; z: number } } } }): { x: number; z: number } | null {
  const L = map.zoo?.layout;
  return L ? { x: L.home.x, z: L.home.z - (ZOO_CONFIG.plaza ?? 60) - 7 } : null;
}
/** Is she on foot by the zoo's little treehouse (its use prompt shows; E takes her out of the zoo)? */
export function atZooExit(map: { zoo?: { layout?: { home: { x: number; z: number } } } }, w: { x: number; z: number; mode: string; seated?: boolean }): boolean {
  const s = zooExitSpot(map);
  return !!s && w.mode === "ground" && !w.seated && Math.hypot(w.x - s.x, w.z - s.z) <= ZOO_EXIT_REACH;
}
