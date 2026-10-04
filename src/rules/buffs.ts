// Legend buffs (Ed, 2026-10-04; DESIGN.md, "Combat, pacing and forecasting"): while a party legend
// lives (now: a happy area legend, DESIGN.md "Sleeping legends"), it gives every witch its species' one buff (config/legend-buffs.json: a kind and a value).
// Buffs of one kind multiply (forecastAhead adds), held inside the file's limits; the game then
// plays by a copy of the tuning with those numbers changed. No drawing here.
import raw from "../../config/legend-buffs.json";
import { LEGEND, type Creature } from "./creatures";
import type { Tuning } from "./tuning";

export type BuffKind =
  | "flightSpeed" | "spellCooldown" | "spellDuration" | "leashLength" | "leashRun" | "berrySeek"
  | "evolveFaster" | "talkTime" | "partyPace" | "waveCountdown" | "glowReach" | "forecastAhead";

export const BUFF_KINDS: BuffKind[] = [
  "flightSpeed", "spellCooldown", "spellDuration", "leashLength", "leashRun", "berrySeek",
  "evolveFaster", "talkTime", "partyPace", "waveCountdown", "glowReach", "forecastAhead",
];

/** Kinds that add up rather than multiply. */
const ADDITIVE: ReadonlySet<BuffKind> = new Set(["forecastAhead"]);

export interface BuffDef { kind: BuffKind; value: number; label: string }
export interface BuffTable { limits: Record<BuffKind, [number, number]>; species: Record<string, BuffDef> }

export const LEGEND_BUFFS = raw as unknown as BuffTable;

/** Each kind's total: 1 (0 for additive kinds) when nothing buffs it. */
export type BuffTotals = Record<BuffKind, number>;

export const neutral = (k: BuffKind) => (ADDITIVE.has(k) ? 0 : 1);
export const noBuffs = (): BuffTotals => Object.fromEntries(BUFF_KINDS.map(k => [k, neutral(k)])) as BuffTotals;

export interface ActiveBuff { id: number; species: string; def: BuffDef }
export interface BuffEvent { kind: "gained" | "lost"; id: number; species: string; label: string }

export interface BuffState {
  /** The buffs on now, one per living party legend, oldest first. */
  active: ActiveBuff[];
  totals: BuffTotals;
  /** The tuning the game plays by: the tuning file with the totals applied. */
  tuning: Tuning;
  /** Buffs gained or lost in the latest step, for the view's flash and line. */
  events: BuffEvent[];
  /** The tuning file `tuning` was worked out from. */
  base: Tuning;
}

export function newBuffs(t: Tuning): BuffState {
  return { active: [], totals: noBuffs(), tuning: t, events: [], base: t };
}

/** The legends giving their buffs now: happy area legends (Ed, 2026-10-04), and any legend in
 *  the party (following her or at a sigil: none since legends stopped evolving, kept for later). */
export function partyLegends(creatures: readonly Creature[], partyIds: Iterable<number>): Creature[] {
  const out: Creature[] = [];
  for (const id of partyIds) { const c = creatures[id]; if (c && c.level >= LEGEND && (c.leashed || c.legendState === "happy")) out.push(c); }
  return out;
}

/** The totals from these buffs: one kind's values multiply (or add), then are held inside its limits. */
export function totalsOf(defs: readonly BuffDef[], table: BuffTable = LEGEND_BUFFS): BuffTotals {
  const T = noBuffs();
  for (const d of defs) T[d.kind] = ADDITIVE.has(d.kind) ? T[d.kind] + d.value : T[d.kind] * d.value;
  for (const k of BUFF_KINDS) {
    const lim = table.limits[k];
    if (lim) T[k] = Math.min(lim[1], Math.max(lim[0], T[k]));
  }
  return T;
}

/** The tuning with these totals applied. */
export function buffedTuning(t: Tuning, T: BuffTotals): Tuning {
  const S = t.spells.speed;
  return {
    ...t,
    groundSpeed: t.groundSpeed * T.flightSpeed,
    treetopSpeed: t.treetopSpeed * T.flightSpeed,
    spells: { ...t.spells, speed: { ...S, cooldown: S.cooldown * T.spellCooldown, duration: S.duration * T.spellDuration } },
    leash: { ...t.leash, length: t.leash.length * T.leashLength, runSpeed: t.leash.runSpeed * T.leashRun, pace: (t.leash.pace ?? 1) * T.partyPace },
    berries: { ...t.berries, seekRadius: t.berries.seekRadius * T.berrySeek, toEvolve: t.berries.toEvolve.map(n => Math.max(1, Math.round(n * T.evolveFaster))) },
    invite: { ...t.invite, talkTime: t.invite.talkTime.map(s => s * T.talkTime) },
    party: { ...t.party, interval: t.party.interval * T.waveCountdown },
    glowToCutout: t.glowToCutout * T.glowReach,
  };
}

/** One step: which buffs are on, from the party legends alive now. */
export function stepBuffs(s: BuffState, creatures: readonly Creature[], partyIds: Iterable<number>, t: Tuning, table: BuffTable = LEGEND_BUFFS): void {
  s.events = [];
  const now = partyLegends(creatures, partyIds).filter(c => table.species[c.species]);
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
  if (changed) { s.active = active; s.totals = totalsOf(active.map(a => a.def), table); }
  if (changed || s.base !== t) { s.tuning = s.active.length ? buffedTuning(t, s.totals) : t; s.base = t; }
}
