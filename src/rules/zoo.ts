// The zoo (?zoo; Ed, 2026-10-13: "make a zoo where I can easily see all creatures in their areas, and they have nameplates and
// descriptions under each, and there's no timer etc ... Could be literally like a flat grid of city blocks with paths between, each
// block the terrain of the area, with a lit runestone at the centre. One row for each biome, and then creatures ordered by size left
// to right"): its plan, from config/zoo.json. Each block is a real area (rules/map.ts, the "zoo" shape: a square grid, no warp, no
// fractal borders), its own runestone, legend clearing and creatures; a row per biome, top (north) to bottom; home (the treehouse,
// the dancefloor) the entrance, at the left of the middle row; the kinds not yet designed (config/kinds.json placeholders) empty "?"
// blocks at the end of their rows; paths along every border, a relic's flask at each crossing (rules/legends.ts placeRelics). No
// drawing here.
import ZOO from "../../config/zoo.json";
import { KINDS } from "./rosters";

export interface ZooBlock {
  /** Its grid cell (column, row). */
  cell: [number, number];
  /** Its area type's id, or null for a kind not yet designed (an empty "?" block). */
  area: string | null;
  /** The kind it shows (its area's creature, or the placeholder's id). */
  kind: string;
  /** Its row's name (the biome's). */
  row: string;
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
}

interface ZooRow { name: string; biomes: string[]; areas: string[] }
interface ZooConfig { group: ZooPlan["group"]; pathHalf: number; rows: ZooRow[] }

/** The zoo's plan: every row's areas from column 1 (home's column 0 left free but for home), then its biomes' placeholder kinds. */
export function zooPlan(cfg: ZooConfig = ZOO as ZooConfig, kinds: Record<string, { biome?: string; placeholder?: boolean }> = KINDS): ZooPlan {
  const blocks: ZooBlock[] = [];
  let widest = 0;
  cfg.rows.forEach((row, r) => {
    const unknown = Object.keys(kinds).filter(k => kinds[k].placeholder && row.biomes.includes(kinds[k].biome ?? "")).sort();
    const line = [...row.areas.map(a => ({ area: a as string | null, kind: a })), ...unknown.map(k => ({ area: null, kind: k }))];
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
