// The Workshop's broom parts (Ed, 2026-10-22/23; docs/backlog/workshop.md): one broom, three slots, the tip, the chassis and the
// exhaust, one part a slot. Each part changes one or two things she feels at once, often with a trade-off ("Stats and sets in
// the first build"), and two- and three-piece sets give today's broom spells (Ed, 2026-10-23: "Sets as proposed": Rocket → Speed,
// Hedge → Stealth, Ferry → Ley jump, Joust → Battering, Pile driver → Ground pound). The parts and sets are data
// (config/broom-parts.json); here, what a broom's parts make of the tuning's numbers for her own movement, and which set (so which
// spell) they complete. The bare broom (every slot empty) is the tuning as it stands, without the plain broom's old quick
// take-off (Ed, 2026-10-23: "Bare broom: LOSES the plain broom's quick take-off; the jet nozzles win it back"). No drawing here.
import RAW from "../../config/broom-parts.json";
import type { Tuning } from "./tuning";
import type { BroomSpellId } from "./spells";

export type Slot = "tip" | "chassis" | "exhaust";
export const SLOTS: readonly Slot[] = ["tip", "chassis", "exhaust"];
/** A part's change to one number: times mult, plus add (either may be absent). */
export interface StatChange { mult?: number; add?: number }
export interface BroomPart { id: string; slot: Slot; name: string; /** the broom kind it's cut from (art/brooms.js) and which end */ look: { kind: string; piece: "body" | "tail" }; up: string; down: string; stats: Record<string, StatChange> }
export interface BroomSet { id: string; name: string; pieces: string[]; spell: BroomSpellId }
/** What's fitted in each slot (null: empty). */
export type Fitted = Record<Slot, string | null>;

const R = RAW as unknown as { parts: Record<string, Omit<BroomPart, "id">>; sets: Record<string, Omit<BroomSet, "id">> };
export const PARTS: readonly BroomPart[] = Object.entries(R.parts).map(([id, p]) => ({ id, ...p }));
export const PART_IDS: readonly string[] = PARTS.map(p => p.id);
export const SETS: readonly BroomSet[] = Object.entries(R.sets).map(([id, s]) => ({ id, ...s }));
const BY_ID = new Map(PARTS.map(p => [p.id, p]));
export const partById = (id: string | null | undefined): BroomPart | undefined => (id ? BY_ID.get(id) : undefined);

/** The bare broom: every slot empty. */
export const bareBroom = (): Fitted => ({ tip: null, chassis: null, exhaust: null });
/** Her fitted parts, in slot order (empty slots left out). */
export const fittedParts = (f: Fitted): BroomPart[] => SLOTS.map(s => partById(f[s])).filter((p): p is BroomPart => !!p);
/** A broom with `id` fitted in its slot (what was there taken out); an unknown id changes nothing. */
export function fitPart(f: Fitted, id: string): Fitted {
  const p = partById(id);
  return p ? { ...f, [p.slot]: p.id } : f;
}
/** A broom from a list of part ids ("missile,ladder,nozzles", or an array): each in its slot, a later one in the same slot winning;
 *  unknown ids left out. */
export function fittedOf(list: string | readonly string[] | null | undefined): Fitted {
  let f = bareBroom();
  for (const id of typeof list === "string" ? list.split(",") : list ?? []) f = fitPart(f, id.trim());
  return f;
}
/** Its parts as a short key ("missile,-,nozzles"): the same broom, the same key. */
export const fittedKey = (f: Fitted): string => SLOTS.map(s => f[s] ?? "-").join(",");

/** The set her parts complete (every piece fitted), or null. The sets are laid out so no broom completes two (tested). */
export function completeSet(f: Fitted): BroomSet | null {
  const on = new Set(SLOTS.map(s => f[s]).filter(Boolean));
  return SETS.find(s => s.pieces.every(p => on.has(p))) ?? null;
}
/** The broom spell her parts give: the complete set's, else none (Ed, 2026-10-23: R casts the completed set's spell). */
export const spellOfParts = (f: Fitted): BroomSpellId => completeSet(f)?.spell ?? "none";
/** The set that gives `spell` (the old ?broom= and the broom stand's Power row fit it whole: debug switches for now). */
export const setForSpell = (spell: string): BroomSet | undefined => SETS.find(s => s.spell === spell);
/** Each set's progress: how many of its pieces she has fitted (the bay's chips, "Rocket 3/3 · Speed"). */
export const setProgress = (f: Fitted): { set: BroomSet; fitted: number }[] => {
  const on = new Set(SLOTS.map(s => f[s]).filter(Boolean));
  return SETS.map(set => ({ set, fitted: set.pieces.filter(p => on.has(p)).length }));
};

/** The number at a tuning path ("treetop.turnRate"), or undefined. */
const at = (t: unknown, path: string): number | undefined => {
  let o = t as Record<string, unknown> | undefined;
  for (const k of path.split(".")) { if (!o || typeof o !== "object") return undefined; o = o[k] as Record<string, unknown> | undefined; }
  return typeof o === "number" ? (o as unknown as number) : undefined;
};

/** The parts' summed change to each number: Σ(mult − 1) and Σ add, by key. */
function changes(f: Fitted): Map<string, { k: number; add: number }> {
  const out = new Map<string, { k: number; add: number }>();
  for (const p of fittedParts(f)) for (const [key, c] of Object.entries(p.stats)) {
    const o = out.get(key) ?? { k: 0, add: 0 };
    o.k += (c.mult ?? 1) - 1; o.add += c.add ?? 0;
    out.set(key, o);
  }
  return out;
}
const apply = (base: number, c: { k: number; add: number }) => base * (1 + c.k) + c.add;

/** How hard her sigils pull on her (rules/leashWeight.ts loadOf's pull): 1 on the bare broom, the Canoe hull's less. */
export function partsPull(f: Fitted): number {
  const c = changes(f).get("pull");
  return c ? Math.max(0, apply(1, c)) : 1;
}

/** The tuning her own movement plays by on this broom: each fitted part's numbers changed, adding up (Ed's doc: "Stats from
 *  different parts add up"). The bare broom's is `t` itself. Kept per base tuning and broom, so it's made once, not each step. */
const cache = new WeakMap<Tuning, Map<string, Tuning>>();
export function broomTuning(t: Tuning, f: Fitted): Tuning {
  const key = fittedKey(f);
  if (key === "-,-,-") return t;
  let byKey = cache.get(t);
  if (!byKey) cache.set(t, (byKey = new Map()));
  const hit = byKey.get(key);
  if (hit) return hit;
  const out = { ...t } as Record<string, unknown>;
  for (const [path, c] of changes(f)) {
    if (path === "pull") continue;
    const base = at(t, path);
    if (base === undefined) continue;
    const keys = path.split(".");
    let o = out;
    for (const k of keys.slice(0, -1)) { o[k] = { ...(o[k] as object) }; o = o[k] as Record<string, unknown>; }
    const v = apply(base, c);
    o[keys[keys.length - 1]] = path === "dash.charges" ? Math.max(1, Math.round(v)) : Math.max(0, v);
  }
  byKey.set(key, out as unknown as Tuning);
  return out as unknown as Tuning;
}
/** Whether every part's stat names a number in the tuning (or is pull): the data's check (broomParts.test.ts). */
export const statKnown = (t: Tuning, key: string): boolean => key === "pull" || at(t, key) !== undefined;
