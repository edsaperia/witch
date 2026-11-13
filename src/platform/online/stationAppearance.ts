import { shelvesAt, wears } from "../../rules/wardrobe";
import { appearance, type Appearance } from "./appearance";

export type LookValue = string | number | boolean | number[];
/** `shelf`: the station's shelf it was chosen on (its id), for the piece it puts on her before she's dressed (rules/clothesPile.ts
 *  slotOf; Ed, 2026-11-11, "When I go to the wardrobe and put top/jacket on, trousers are put on too"); an older message without it,
 *  the station's piece, as before. */
export interface StationLook { kind: "look"; station: string; changes: Record<string, LookValue>; shelf?: string }
/** A shelf of `station`'s by its id (a message's `shelf`, rules/wardrobe.ts shelvesAt). */
export const shelfAt = (station: string, shelf: unknown): shelf is string => typeof shelf === "string" && !!shelvesAt(station)?.some(s => s.id === shelf);
const axisPath = (axis: string) => axis === "bristles" ? "broom.bristles" : ["hat", "broom"].some(part => axis.startsWith(part))
  ? axis.replace(/^(hat|broom)([A-Z])/, (_s, part: string, letter: string) => `${part}.${letter.toLowerCase()}`) : axis;
const pathsAt = (station: string) => {
  const shelves = shelvesAt(station); if (!shelves) return null;
  return new Set(shelves.flatMap(shelf => [...shelf.items.flatMap(item => Object.keys(item.set)), ...(shelf.colour ?? []).map(part => `palette.${part}`), ...(shelf.fit ?? []).map(axisPath)]));
};
/** Fields a station once sent that none does now: an older message's are dropped, not refused (the basin's blush: Ed, 2026-11-12,
 *  "Drop blush"). An older makeup message, lipstick or eyeshadow alone or in two colours, merges as sent and is then made one colour
 *  like a saved look (art/witchGenome.js oneMakeup, through appearance's upgrade). */
const RETIRED = new Set(["accessories.blush"]);
const get = (look: Appearance, path: string): unknown => path.split(".").reduce<unknown>((v, key) => (v as Appearance | undefined)?.[key], look);
/** Only shelf-owned fields cross the wire, never a replacement full genome or player identity. */
export function stationLook(station: string, value: unknown, shelf?: string): StationLook | null {
  const look = appearance(value), paths = pathsAt(station); if (!look || !paths) return null;
  const changes: Record<string, LookValue> = {};
  for (const path of paths) { const value = get(look, path); if (value !== undefined) changes[path] = structuredClone(value) as LookValue; }
  return { kind: "look", station, changes, ...(shelfAt(station, shelf) ? { shelf } : {}) };
}
export function readStationLook(value: unknown): StationLook | null {
  if (!value || typeof value !== "object" || Array.isArray(value)) return null;
  const v = value as Record<string, unknown>, paths = typeof v.station === "string" ? pathsAt(v.station) : null;
  const shelf = Object.hasOwn(v, "shelf"); // (optional: an older message names none)
  if (Object.keys(v).length !== (shelf ? 4 : 3) || v.kind !== "look" || !paths || !v.changes || typeof v.changes !== "object" || Array.isArray(v.changes)) return null;
  if (shelf && !shelfAt(v.station as string, v.shelf)) return null;
  const changes: Record<string, LookValue> = {};
  for (const [path, item] of Object.entries(v.changes)) {
    if (RETIRED.has(path) && typeof item === "boolean") continue;
    if (!paths.has(path)) return null;
    if (path.startsWith("palette.")) {
      if (!Array.isArray(item) || item.length !== 3 || item.some(n => typeof n !== "number" || !Number.isFinite(n) || n < 0 || n > 1)) return null;
    } else if (!["string", "boolean", "number"].includes(typeof item) || typeof item === "number" && !Number.isFinite(item)) return null;
    changes[path] = structuredClone(item) as LookValue;
  }
  return { kind: "look", station: v.station as string, changes, ...(shelf ? { shelf: v.shelf as string } : {}) };
}
/** Merge into the last approved look. A changed shelf item must be in the host's wardrobe. */
export function applyStationLook(before: Appearance, request: StationLook, owned?: ReadonlySet<string>, basePalette?: Record<string, number[]>): Appearance | null {
  const choice = readStationLook(request); if (!choice) return null;
  const next = structuredClone(before);
  if (next.palette === null && Object.keys(choice.changes).some(path => path.startsWith("palette."))) {
    if (!basePalette) return null; // Caller must preserve actual style colours when materializing a classic palette.
    next.palette = structuredClone(basePalette);
  }
  for (const [path, value] of Object.entries(choice.changes)) {
    const keys = path.split("."), last = keys.pop()!; let part = next;
    for (const key of keys) part = (part[key] ??= {}) as Appearance;
    part[last] = structuredClone(value);
  }
  const checked = appearance(next); if (!checked) return null;
  if (owned && shelvesAt(choice.station)!.some(shelf => shelf.items.some(item => wears(checked, item) && !wears(before, item) && !owned.has(item.id)))) return null;
  return checked;
}
