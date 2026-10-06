// Legend buffs, redesigned (Ed, 2026-10-05; issue #87; config/legend-buffs.json): while a legend gives
// its buff (its dream quest done, or happy), every witch has it. A buff changes only her 💌 invites
// and her own movement, never animals; a 💌 is never stronger. Each species' buff scales or adds to
// tuning numbers (the 💌's speed, her blink's reach...) and counts behaviours (mods: fan, pierce,
// orbit...) that rules/invites.ts and rules/dash.ts compose. Buffs stack: scales multiply, adds and
// mods add, each total held inside the file's limits. No drawing here.
import raw from "../../config/legend-buffs.json";
import { LEGEND, type Creature } from "./creatures";
import type { Tuning } from "./tuning";

/** The behaviours a buff can count (config/legend-buffs.json "how" has their numbers). */
export const MOD_KINDS = [
  "fan", "rear", "ring", "charge", "echo", "charm", "pierce", "ricochet", "split", "boomerang", "slip", "trail", "cache", "orbit",
  "charges", "momentum", "frenzy", "decoy", "steady",
] as const;
export type ModKind = (typeof MOD_KINDS)[number];
export type BuffMods = Record<ModKind, number>;
export const noMods = (): BuffMods => Object.fromEntries(MOD_KINDS.map(k => [k, 0])) as BuffMods;

export interface BuffDef {
  name: string;
  kind: "shot" | "move";
  label: string;
  /** Tuning numbers (dotted paths) times value. */
  scale?: Record<string, number>;
  /** Tuning numbers plus value. */
  add?: Record<string, number>;
  mods?: Partial<BuffMods>;
}

export interface BuffHow {
  fan: { per: number; spread: number };
  rear: { spread: number };
  ring: { every: number; letters: number };
  charge: { after: number; time: number; letters: number; spread: number; min: number };
  echo: { delay: number };
  charm: { homing: number; cone: number; range: number };
  ricochet: { range: number };
  split: { letters: number; spread: number; range: number; radius: number };
  boomerang: { turn: number; catch: number };
  trail: { every: number; life: number; radius: number };
  cache: { every: number; max: number; life: number; reach: number };
  orbit: { letters: number; radius: number; spin: number; reach: number; respawn: number };
  charges: { chain: number };
  momentum: { time: number; speed: number };
}

export interface BuffTable { how: BuffHow; limits: Record<string, [number, number]>; species: Record<string, BuffDef> }

export const LEGEND_BUFFS = raw as unknown as BuffTable;

export interface ActiveBuff { id: number; species: string; def: BuffDef }
export interface BuffEvent { kind: "gained" | "lost"; id: number; species: string; label: string }

export interface BuffState {
  /** The buffs on now, one per legend giving one, oldest first. */
  active: ActiveBuff[];
  /** The behaviours on now (counted, held inside the limits). */
  mods: BuffMods;
  /** The tuning the game plays by: the tuning file with the buffs' numbers applied. */
  tuning: Tuning;
  /** Buffs gained or lost in the latest step, for the view's flash and line. */
  events: BuffEvent[];
  /** The tuning file `tuning` was worked out from. */
  base: Tuning;
  /** Debug (?buffs=fox,toad,stag): these species' buffs on whatever the legends do. */
  forced: string[];
}

export function newBuffs(t: Tuning, forced: string[] = []): BuffState {
  return { active: [], mods: noMods(), tuning: t, events: [], base: t, forced };
}

/** The legends giving their buffs now: happy area legends (Ed, 2026-10-04), any whose buff she's
 *  earned (its quest done, or a relic: kept for good, #87), and any legend in
 *  the party (following her or at a sigil: none since legends stopped evolving, kept for later). */
export function partyLegends(creatures: readonly Creature[], partyIds: Iterable<number>): Creature[] {
  const out: Creature[] = [];
  for (const id of partyIds) { const c = creatures[id]; if (c && c.level >= LEGEND && (c.leashed || c.legendState === "happy" || c.buffed)) out.push(c); } // (#87: a buff once earned, by its quest or a relic, is kept)
  return out;
}

const hold = (v: number, lim: [number, number] | undefined) => (lim ? Math.min(lim[1], Math.max(lim[0], v)) : v);

/** The behaviours these buffs count, each held inside its limits. */
export function modsOf(defs: readonly BuffDef[], table: BuffTable = LEGEND_BUFFS): BuffMods {
  const M = noMods();
  for (const d of defs) for (const [k, v] of Object.entries(d.mods ?? {})) M[k as ModKind] += v ?? 0;
  for (const k of MOD_KINDS) M[k] = hold(M[k], table.limits[`mods.${k}`]);
  return M;
}

type Tree = { readonly [k: string]: unknown };
/** The number at a dotted path ("invites.speed") in a tuning-shaped tree (NaN if it isn't one). */
const get = (o: object, path: string): number => { const v = path.split(".").reduce<unknown>((a, k) => (a as Tree | undefined)?.[k], o); return typeof v === "number" ? v : NaN; };
/** A copy of t with the number at `path` set to v (copying only the objects on its way). */
function set<T extends object>(o: T, path: string, v: number): T {
  const [k, ...rest] = path.split(".");
  const at = (o as Tree)[k];
  return { ...o, [k]: rest.length ? set(typeof at === "object" && at ? at : {}, rest.join("."), v) : v };
}

/** The tuning with these buffs' numbers applied: scales multiply and adds add (on the file's
 *  value), then each is held inside its limits. Untouched numbers are the file's own. */
export function buffedTuning(t: Tuning, defs: readonly BuffDef[], table: BuffTable = LEGEND_BUFFS): Tuning {
  const scale = new Map<string, number>(), add = new Map<string, number>();
  for (const d of defs) {
    for (const [p, v] of Object.entries(d.scale ?? {})) scale.set(p, (scale.get(p) ?? 1) * v);
    for (const [p, v] of Object.entries(d.add ?? {})) add.set(p, (add.get(p) ?? 0) + v);
  }
  let out = t;
  for (const p of new Set([...scale.keys(), ...add.keys()])) out = set(out, p, hold(get(t, p) * (scale.get(p) ?? 1) + (add.get(p) ?? 0), table.limits[p]));
  return out;
}

/** One step: which buffs are on, from the legends giving them now (and any forced for debugging). */
export function stepBuffs(s: BuffState, creatures: readonly Creature[], partyIds: Iterable<number>, t: Tuning, table: BuffTable = LEGEND_BUFFS): void {
  s.events = [];
  const now: { id: number; species: string }[] = partyLegends(creatures, partyIds).filter(c => table.species[c.species]).map(c => ({ id: c.id, species: c.species }));
  s.forced.forEach((sp, i) => { if (table.species[sp]) now.push({ id: -1 - i, species: sp }); });
  const was = new Map(s.active.map(a => [a.id, a]));
  const is = new Set(now.map(c => c.id));
  let changed = false;
  for (const a of s.active) if (!is.has(a.id)) { s.events.push({ kind: "lost", id: a.id, species: a.species, label: a.def.label }); changed = true; }
  const active = s.active.filter(a => is.has(a.id));
  for (const c of now) if (!was.has(c.id)) {
    const def = table.species[c.species];
    active.push({ id: c.id, species: c.species, def });
    s.events.push({ kind: "gained", id: c.id, species: c.species, label: def.label });
    changed = true;
  }
  if (changed) { s.active = active; s.mods = modsOf(active.map(a => a.def), table); }
  if (changed || s.base !== t) { s.tuning = s.active.length ? buffedTuning(t, s.active.map(a => a.def), table) : t; s.base = t; }
}
