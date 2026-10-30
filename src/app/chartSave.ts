import { slotStorage } from "./saveSlots";
// The sea chart's save (wave 2, part C; Ed, 2026-10-10/11, docs/backlog/journey.md "The world and the sea chart"): what she's
// found, kept in this browser. An island appears on the chart when its legend's quest is done in a night that's then won (Ed,
// 2026-10-18: g.islandsTonight, rules/win.ts found; winning alone finds none, and a lost night keeps none), each found from the island she set out from (a
// voyage, a line on the chart); won islands are marked; every island is drawn, a sigil only on those she can travel to. Losing loses nothing (Ed,
// 2026-10-11): the night's island is only played. Every storage access is try/caught: blocked storage plays with nothing saved.
import { isPlaceholder, KINDS, playableIsland, REAL_KINDS } from "../rules/rosters";

export const SAVE_KEY = "witch.chart";

export interface ChartSave {
  /** The campaign's world seed (Ed, 2026-10-11; rules/rosters.ts): every island's shape. 0 (none saved) is the first world. */
  world: number;
  /** The kinds whose islands she's found (each legend's quest done in a night she then won: rules/win.ts found), oldest first. */
  found: string[];
  /** The islands she's won ("home" or a kind). */
  won: string[];
  /** The islands she's played, won or lost. */
  played: string[];
  /** Each island found, from the island she found it on. */
  voyages: { from: string; to: string }[];
}

export const emptySave = (world = 0): ChartSave => ({ world, found: [], won: [], played: [], voyages: [] });

/** A world seed from what's typed or pasted (a whole number, or any text hashed), or a random one for nothing. */
export function worldSeed(text?: string | null): number {
  const t = (text ?? "").trim();
  if (!t) return 1 + Math.floor(Math.random() * 2147483646);
  if (/^\d+$/.test(t)) return Number(t) % 2147483647; // (0: the first world)
  let h = 2166136261;
  for (let i = 0; i < t.length; i++) h = Math.imul(h ^ t.charCodeAt(i), 16777619);
  return (h >>> 0) % 2147483647 || 1;
}

type Store = Pick<Storage, "getItem" | "setItem" | "removeItem">;
const storeOf = (s?: Store | null): Store | null => { try { return s ?? slotStorage ?? null; } catch { return null; } };
const strings = (xs: unknown): string[] => (Array.isArray(xs) ? xs.filter((x): x is string => typeof x === "string") : []);

/** The save in this browser (an empty one if there's none, it's unreadable, or storage is blocked); unknown kinds dropped. */
export function loadSave(storage?: Store | null): ChartSave {
  try {
    const raw = storeOf(storage)?.getItem(SAVE_KEY);
    if (!raw) return emptySave();
    const o = JSON.parse(raw) as Partial<ChartSave>, island = playableIsland, kind = (k: string) => !!KINDS[k] && !isPlaceholder(k);
    const w = Number(o.world);
    return {
      world: Number.isInteger(w) && w >= 0 && w < 2147483647 ? w : 0,
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

/** Start a new campaign in the world `world` (Start over on the sea chart): nothing found, nothing won. */
export function newCampaign(world: number, storage?: Store | null): ChartSave {
  const save = emptySave(world);
  storeSave(save, storage);
  return save;
}

/** The night's end on `island` ("home" or a kind; anything else isn't an island of the chart and records nothing): played; if
 *  won, marked won, and the islands found tonight by quests (`found`: rules/win.ts) found from it, each with its voyage (an
 *  island already found keeps its first voyage). A new save; the old one unchanged. */
/** Sailing off from the treehouse deck's map table (Ed, 2026-10-11: "Sail anytime"; ui/chartOverlay.ts): with the night still on
 *  (not won, the party not over, nothing yet recorded), it ends unwon, as a loss: played, nothing found (its quests done tonight kept only by a won night); otherwise
 *  the night's already in the save as it ended. */
export function sailNight(save: ChartSave, island: string, nightOn: boolean): ChartSave {
  return nightOn ? recordNight(save, island, { won: false }) : save;
}

export function recordNight(save: ChartSave, island: string, result: { won: boolean; found?: readonly string[] }): ChartSave {
  if (!playableIsland(island)) return save;
  const next: ChartSave = { world: save.world, found: [...save.found], won: [...save.won], played: [...save.played], voyages: [...save.voyages] };
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

/** The islands found she can sail to and hasn't been to (Ed, 2026-10-26: "islands the player can go to and hasn't visited yet"):
 *  found, real, no night played there, and not `here` (the island she's on: landed counts). Oldest found first. */
export const unvisited = (save: ChartSave, here?: string | null): string[] => save.found.filter(k => !isPlaceholder(k) && !save.played.includes(k) && k !== here);

/** The islands she can play: home and every one found. */
export const unlocked = (save: ChartSave): string[] => ["home", ...save.found];

/** Every island found, won and played, every kind met (?chart=all, for testing): a save with the whole chart open, the
 *  placeholders' '?' islands too (their voyages from the island nearest them a phase in). */
export function allSave(): ChartSave {
  const kinds = Object.keys(KINDS), found = [...kinds];
  const voyages = found.map(k => ({ from: KINDS[k].phase === 0 ? "home" : nearestOf(k, kinds.filter(x => KINDS[x].phase === KINDS[k].phase - 1)), to: k }));
  return { world: 0, found, won: ["home"], played: ["home", ...REAL_KINDS], voyages };
}

/** Of `from`, the kind whose island lies nearest `k`'s bearing (a plausible voyage for the testing chart). */
function nearestOf(k: string, from: string[]): string {
  const apart = (a: number, b: number) => { const d = Math.abs(((a - b) % 360 + 360) % 360); return d > 180 ? 360 - d : d; };
  return from.reduce((best, x) => (apart(KINDS[x].bearing, KINDS[k].bearing) < apart(KINDS[best].bearing, KINDS[k].bearing) ? x : best), from[0] ?? "home");
}

/** The night's over (the game's hook: won, its legends' islands found, or lost): recorded in this browser's save, if it was
 *  played in the save's world (`world`, when known: a night in a world from someone's link isn't this campaign's). */
export function nightOver(island: string, result: { won: boolean; found?: readonly string[] }, storage?: Store | null, world?: number): ChartSave {
  const save = loadSave(storage);
  if (world !== undefined && world !== save.world) return save;
  const next = recordNight(save, island, result);
  storeSave(next, storage);
  return next;
}
