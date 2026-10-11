// The sea chart's save (wave 2, part C; Ed, 2026-10-10/11, docs/backlog/journey.md "The world and the sea chart"): what she's
// found, kept in this browser. Islands appear on the chart as their legends are woken (a night won with that legend among its
// dealt ones: rules/win.ts found; an enraged legend's island stays hidden), each found from the island she set out from (a
// voyage, a line on the chart); won islands are marked; kinds she's met light their sigils. Losing loses nothing (Ed,
// 2026-10-11): the night's island is only played. Every storage access is try/caught: blocked storage plays with nothing saved.
import { homeKinds, isPlaceholder, islandOf, KINDS, playableIsland, REAL_KINDS } from "../rules/rosters";

export const SAVE_KEY = "witch.chart";

export interface ChartSave {
  /** The kinds whose islands she's found (their legends woken), oldest first. */
  found: string[];
  /** The islands she's won ("home" or a kind). */
  won: string[];
  /** The islands she's played, won or lost. */
  played: string[];
  /** Each island found, from the island she found it on. */
  voyages: { from: string; to: string }[];
}

export const emptySave = (): ChartSave => ({ found: [], won: [], played: [], voyages: [] });

type Store = Pick<Storage, "getItem" | "setItem" | "removeItem">;
const storeOf = (s?: Store | null): Store | null => { try { return s ?? globalThis.localStorage ?? null; } catch { return null; } };
const strings = (xs: unknown): string[] => (Array.isArray(xs) ? xs.filter((x): x is string => typeof x === "string") : []);

/** The save in this browser (an empty one if there's none, it's unreadable, or storage is blocked); unknown kinds dropped. */
export function loadSave(storage?: Store | null): ChartSave {
  try {
    const raw = storeOf(storage)?.getItem(SAVE_KEY);
    if (!raw) return emptySave();
    const o = JSON.parse(raw) as Partial<ChartSave>, island = playableIsland, kind = (k: string) => !!KINDS[k] && !isPlaceholder(k);
    return {
      found: strings(o.found).filter(kind),
      won: strings(o.won).filter(island),
      played: strings(o.played).filter(island),
      voyages: (Array.isArray(o.voyages) ? o.voyages : []).filter(v => v && typeof v.from === "string" && typeof v.to === "string" && island(v.from) && kind(v.to)).map(v => ({ from: v.from, to: v.to })),
    };
  } catch { return emptySave(); }
}

export function storeSave(save: ChartSave, storage?: Store | null): void {
  try { storeOf(storage)?.setItem(SAVE_KEY, JSON.stringify(save)); } catch { /* storage blocked: nothing kept */ }
}

/** Start over: forget it all. */
export function clearSave(storage?: Store | null): void {
  try { storeOf(storage)?.removeItem(SAVE_KEY); } catch { /* storage blocked */ }
}

/** The night's end on `island` ("home" or a kind; anything else isn't an island of the chart and records nothing): played; if
 *  won, marked won, and the islands of the legends it woke (`found`: rules/win.ts) found from it, each with its voyage (an
 *  island already found keeps its first voyage). A new save; the old one unchanged. */
export function recordNight(save: ChartSave, island: string, result: { won: boolean; found?: readonly string[] }): ChartSave {
  if (!playableIsland(island)) return save;
  const next: ChartSave = { found: [...save.found], won: [...save.won], played: [...save.played], voyages: [...save.voyages] };
  if (!next.played.includes(island)) next.played.push(island);
  if (!result.won) return next;
  if (!next.won.includes(island)) next.won.push(island);
  for (const k of result.found ?? []) {
    if (!KINDS[k] || isPlaceholder(k) || k === island || next.found.includes(k)) continue;
    next.found.push(k);
    next.voyages.push({ from: island, to: k });
  }
  return next;
}

/** The islands she can play: home and every one found. */
export const unlocked = (save: ChartSave): string[] => ["home", ...save.found];

/** The kinds she's met (their sigils lit on the chart): home's from the start, every kind on an island she's played, and every
 *  island's kind she's found. */
export function discovered(save: ChartSave): Set<string> {
  const out = new Set<string>(homeKinds());
  for (const k of save.found) out.add(k);
  for (const p of save.played) if (p !== "home") for (const r of islandOf(p)?.roster ?? []) out.add(r.kind);
  return out;
}

/** Every island found, won and played, every kind met (?chart=all, for testing): a save with the whole chart open, the
 *  placeholders' '?' islands too (their voyages from the island nearest them a phase in). */
export function allSave(): ChartSave {
  const kinds = Object.keys(KINDS), found = [...kinds];
  const voyages = found.map(k => ({ from: KINDS[k].phase === 0 ? "home" : nearestOf(k, kinds.filter(x => KINDS[x].phase === KINDS[k].phase - 1)), to: k }));
  return { found, won: ["home"], played: ["home", ...REAL_KINDS], voyages };
}

/** Of `from`, the kind whose island lies nearest `k`'s bearing (a plausible voyage for the testing chart). */
function nearestOf(k: string, from: string[]): string {
  const apart = (a: number, b: number) => { const d = Math.abs(((a - b) % 360 + 360) % 360); return d > 180 ? 360 - d : d; };
  return from.reduce((best, x) => (apart(KINDS[x].bearing, KINDS[k].bearing) < apart(KINDS[best].bearing, KINDS[k].bearing) ? x : best), from[0] ?? "home");
}

/** The night's over (the game's hook: won, its legends' islands found, or lost): recorded in this browser's save. */
export function nightOver(island: string, result: { won: boolean; found?: readonly string[] }, storage?: Store | null): ChartSave {
  const next = recordNight(loadSave(storage), island, result);
  storeSave(next, storage);
  return next;
}
