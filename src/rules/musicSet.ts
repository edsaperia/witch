// A night's set (Ed, 2026-10-11: "Each night should be a full set, starting quite gently and building to a climax, with
// build-ups and breakdowns within it. Use key changes, genre changes, instrumentation changes, breakdowns etc to give it
// structure"; "More steps. It should be noticeably different each wave"): the music's arc made for the night, one step a
// wave (step 0 the countdown after the boot, step N the island's last wave), from the style's genre families.
//
// - The SHAPE is the night's, fitted to its waves over its time (each wave as long as its link of the ley line takes the
//   pulse): a build, peak and breakdown cycle every `set.cycleWaves` waves, each peaking higher; the last cycle warm-up,
//   build, peak, breakdown, a bigger build, the main peak and the climax on the final wave.
// - The PALETTE comes from the absolute wave on the `set.masterWaves` (64) curve: early waves organic and dreamy, the
//   middle techno, electro and breakbeat, the late industrial, phonk, hyperpop and hard. A 10-wave island is a full set in
//   the early palette; only home at 64 travels the whole range.
// - DJ-ish rules: never a family twice running; a neighbouring key (a fifth either way, or the same), lifted a step or two
//   into peaks and darker in breakdowns; the tempo rising with the palette and the energy, eased back in breakdowns; the
//   lead, bass patch and voice dealt so each wave differs from the last in at least two ways.
// - The first home night (10 waves) is hand-picked (the style's `curated`).
// Deterministic: the same seed, island and waves give the same set. Numbers only: the conductor (musicPlan.ts) plays the
// night's arc as it played the style's.
import styleJson from "../../config/music-style.json";
import { hash2 } from "./random";
import type { ForestMap } from "./map";
import { routeOf } from "./party";
import { polyLength } from "./pulseRoute";
import type { ArcStep, MusicStyle } from "./musicScore";

/** The game's music style (config/music-style.json). */
export const MUSIC_STYLE = styleJson as unknown as MusicStyle;

/** A genre family: where it fits (its palette, a share of the master curve, and its energy), its sections on the form, its
 *  build, and the bass patches, leads and voices it takes. */
export interface FamilyDef {
  name: string;
  palette: [number, number];
  energy: [number, number];
  /** A breakdown wave's family. */
  calm?: boolean;
  /** Bpm over the night's tempo (a half-time feel slower, jungle faster). */
  tempo?: number;
  /** Its own mode (witch house's phrygian). */
  scale?: string;
  land?: string; four: string[]; breaks: string[]; breakdown: string[];
  build: string; buildBars?: number;
  bass: string[];
  leads?: string[];
  vocals?: string[];
}

export interface SetDef {
  masterWaves: number;
  cycleWaves: number;
  darker: string;
  keyRange: [number, number];
  lift: number[];
  tempo: { from: number; to: number; spread: number; breakdown: number; climax: number; min: number; max: number };
  leads: string[];
  vocals: string[];
}

export type Role = "warm" | "build" | "peak" | "breakdown" | "climax";

/** One wave's place in the night. */
export interface NightStep {
  wave: number;
  family: string;
  role: Role;
  energy: number;
  transpose: number;
  scale: string;
  bpm: number;
  lead: string;
  bass: string;
  vocal: string;
  /** Where its middle falls in the night's time (0 to 1). */
  at: number;
}

export interface CuratedStep { family: string; role: Role; energy: number; transpose: number; bpm: number; lead: string; bass: string; vocal: string; scale?: string }

/** The night's set: its steps (0 the countdown after the boot, then a step a wave), how many cycles, whether hand-picked. */
export interface NightSet { island: string; waves: number; seed: number; curated: boolean; cycles: number; steps: NightStep[] }

export interface NightOptions {
  seed: number;
  /** "home", a kind's name, or "" (an island of no roster: the radius map, a test's). */
  island: string;
  /** The night's waves (its areas but home's). */
  waves: number;
  /** Each step's length (any unit: the links' metres), step 0's the countdown's; equal if left out. */
  lengths?: number[];
}

const clamp = (x: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, x));
const norm = (t: number, [lo, hi]: [number, number]) => { let k = t; while (k > hi) k -= 12; while (k < lo) k += 12; return k; };

/** The night's energy at `u` (0 to 1 of its time) with `cycles` cycles: each a build from where the last left off to a peak
 *  higher than the last, a breakdown, and a rebuild into the next; the last a peak, a breakdown, a bigger build, the main
 *  peak and the climax at its end. */
export function energyAt(u: number, cycles: number): number {
  const C = Math.max(1, cycles), k = Math.min(C - 1, Math.floor(u * C)), v = u * C - k;
  const peak = (j: number) => 0.58 + 0.27 * ((j + 1) / C), dip = (j: number) => 0.3 + 0.1 * (j / C);
  const start = (j: number) => j === 0 ? 0.15 : dip(j - 1) + 0.08;
  const pts: [number, number][] = k === C - 1
    ? [[0, start(k)], [0.42, Math.min(0.8, Math.max(0.62, peak(k) - 0.15))], [0.55, dip(k)], [0.8, 0.8], [0.92, 0.9], [1, 1]]
    : [[0, start(k)], [0.55, peak(k)], [0.72, dip(k)], [1, start(k + 1)]];
  for (let i = 1; i < pts.length; i++) {
    const [x0, y0] = pts[i - 1], [x1, y1] = pts[i];
    if (v <= x1) return y0 + (y1 - y0) * ((v - x0) / Math.max(1e-9, x1 - x0));
  }
  return pts[pts.length - 1][1];
}

/** Each step's middle as a share of the night's time. */
function stepTimes(n: number, lengths?: number[]): number[] {
  const L = Array.from({ length: n }, (_, i) => Math.max(1e-6, lengths?.[i] ?? lengths?.[lengths.length - 1] ?? 1));
  const total = L.reduce((a, b) => a + b, 0);
  let t = 0;
  return L.map(l => { const m = (t + l / 2) / total; t += l; return m; });
}

/** The roles: the climax last; in each cycle its highest step a peak and its lowest after that a breakdown (in the last,
 *  the highest before its breakdown, and the highest after it but the climax, the main peak); before the first peak, warm
 *  while the energy's low; the rest build. */
function rolesOf(at: number[], energy: number[], cycles: number): Role[] {
  const n = at.length, roles: Role[] = new Array(n).fill("build"), C = Math.max(1, cycles);
  const best = (from: number, to: number, better: (a: number, b: number) => boolean) => {
    let k = -1;
    for (let i = from; i <= to; i++) if (k < 0 || better(energy[i], energy[k])) k = i;
    return k;
  };
  for (let c = 0; c < C; c++) {
    const last = c === C - 1, lo = c / C, hi = (c + 1) / C;
    let from = -1, to = -1;
    at.forEach((u, i) => { if (u >= lo && (u < hi || last) && i < n - 1) { if (from < 0) from = i; to = i; } });
    if (from < 0) continue;
    // (the last cycle's first peak and breakdown come before its main build: the first 60% of it)
    const split = last ? Math.max(from, at.findIndex(u => u >= lo + 0.62 / C) - 1) : to;
    const peak = best(from, split, (a, b) => a > b);
    const dip = peak >= 0 && peak < to ? best(peak + 1, last ? Math.min(to, Math.max(peak + 1, split + 1)) : to, (a, b) => a < b) : -1;
    if (peak >= 0) roles[peak] = "peak";
    if (dip > peak) roles[dip] = "breakdown";
    if (last && dip > 0 && dip < to) { const main = best(dip + 1, to, (a, b) => a > b); if (main > dip) roles[main] = "peak"; }
  }
  const firstPeak = roles.indexOf("peak");
  for (let i = 0; i < n && (firstPeak < 0 || i < firstPeak); i++) if (roles[i] === "build" && energy[i] < 0.36) roles[i] = "warm";
  roles[n - 1] = "climax";
  return roles;
}

/** A seeded pick, weighted. */
function pickWeighted<T>(xs: readonly T[], weight: (x: T) => number, r: number): T {
  const ws = xs.map(x => Math.max(0, weight(x))), total = ws.reduce((a, b) => a + b, 0);
  if (!(total > 0)) return xs[Math.min(xs.length - 1, Math.floor(r * xs.length))];
  let k = r * total;
  for (let i = 0; i < xs.length; i++) { k -= ws[i]; if (k <= 0) return xs[i]; }
  return xs[xs.length - 1];
}

/** A pick from `xs` that isn't `not` if it can be. */
const pickOther = <T>(xs: readonly T[], not: T | undefined, r: number): T => {
  const ok = xs.filter(x => x !== not), from = ok.length ? ok : xs;
  return from[Math.min(from.length - 1, Math.floor(r * from.length))];
};

/** Whether this is the first home night (the style's curated set). */
export const isCurated = (style: MusicStyle, o: Pick<NightOptions, "island" | "waves">): boolean =>
  !!style.curated && o.island === style.curated.island && o.waves === style.curated.waves && style.curated.steps.length === o.waves + 1;

/** The night's set for an island's night. */
export function planNight(style: MusicStyle, o: NightOptions): NightSet {
  const N = Math.max(1, Math.round(o.waves)), n = N + 1, S = style.set!, F = style.families!;
  const cycles = Math.max(1, Math.round(N / Math.max(1, S.cycleWaves)));
  const at = stepTimes(n, o.lengths);
  if (isCurated(style, o)) {
    return { island: o.island, waves: N, seed: o.seed, curated: true, cycles: 1, steps: style.curated!.steps.map((c, i) => ({
      wave: i, family: c.family, role: c.role, energy: c.energy, transpose: c.transpose, scale: c.scale ?? F[c.family]?.scale ?? style.scale,
      bpm: c.bpm, lead: c.lead, bass: c.bass, vocal: c.vocal, at: at[i],
    })) };
  }
  const energy = at.map((u, i) => i === n - 1 ? 1 : energyAt(u, cycles)), roles = rolesOf(at, energy, cycles); // (the climax, the last wave: all in)
  const salt = (o.seed >>> 0) ^ Math.imul([...o.island].reduce((h, ch) => (h * 31 + ch.charCodeAt(0)) >>> 0, 7), 2654435761);
  const rnd = (i: number, what: number) => hash2(salt, 4001 + what, i * 7919 + N);
  const steps: NightStep[] = [], names = Object.keys(F);
  for (let i = 0; i < n; i++) {
    const role = roles[i], prev = steps[i - 1], p = clamp(i / Math.max(1, S.masterWaves), 0, 1);
    const e = clamp(role === "breakdown" && prev ? Math.min(energy[i], prev.energy - 0.08) : energy[i], 0.05, 1); // (a breakdown always a drop)
    // its family: one whose palette and energy fit (calm for a breakdown), not the last one, the recent ones less likely
    const fits = (name: string, slack: number) => {
      const f = F[name];
      if (name === prev?.family) return false;
      if ((role === "breakdown") !== !!f.calm && !(role === "warm" && f.calm && i > 0)) return false;
      return p >= f.palette[0] - slack && p <= f.palette[1] + slack && e >= f.energy[0] - slack && e <= f.energy[1] + slack;
    };
    let cands = names.filter(nm => fits(nm, 0));
    for (let slack = 0.05; !cands.length && slack < 1.01; slack += 0.1) cands = names.filter(nm => fits(nm, slack));
    if (!cands.length) cands = names.filter(nm => nm !== prev?.family);
    const recent = steps.slice(-4).map(s => s.family);
    const family = pickWeighted(cands, nm => {
      const f = F[nm], mid = (f.energy[0] + f.energy[1]) / 2, used = recent.lastIndexOf(nm);
      return (1.2 - Math.abs(e - mid)) * (used < 0 ? 1 : 0.15 + 0.2 * (recent.length - 1 - used));
    }, rnd(i, 1));
    const f = F[family];
    // its key: a neighbour of the last (a fifth either way, or the same), lifted into a peak, the same in a breakdown
    let transpose = 0;
    if (prev) {
      const r = rnd(i, 2);
      if (role === "peak" || role === "climax") transpose = prev.transpose + S.lift[Math.floor(r * S.lift.length)];
      else if (role === "breakdown") transpose = r < 0.6 ? prev.transpose : prev.transpose - 7;
      else transpose = prev.transpose + (r < 0.3 ? 0 : r < 0.65 ? 7 : -7);
      transpose = norm(transpose, S.keyRange);
    }
    const scale = f.scale ?? (role === "breakdown" ? S.darker : style.scale);
    // its tempo: the palette's, spread by the energy, eased back in a breakdown and pushed at the climax; never the last's
    const T = S.tempo;
    let bpm = Math.round(T.from + (T.to - T.from) * p + T.spread * (e - 0.5) + (f.tempo ?? 0) + (role === "breakdown" ? T.breakdown : 0) + (role === "climax" ? T.climax : 0));
    if (prev && bpm === prev.bpm) bpm += e >= prev.energy ? 1 : -1;
    bpm = clamp(bpm, T.min, T.max);
    const lead = pickOther((f.leads ?? S.leads).filter(l => style.parts[l]), prev?.lead, rnd(i, 3));
    const bass = pickOther(f.bass.filter(b => style.patches[b]), prev?.bass, rnd(i, 4));
    const voices = (f.vocals ?? S.vocals).filter(v => v === "none" || style.patches[v]);
    const vocal = role === "breakdown" && voices.includes("breathy") && prev?.vocal !== "breathy" ? "breathy" : pickOther(voices, prev?.vocal, rnd(i, 5));
    steps.push({ wave: i, family, role, energy: Math.round(e * 100) / 100, transpose, scale, bpm, lead, bass, vocal, at: at[i] });
  }
  return { island: o.island, waves: N, seed: o.seed, curated: false, cycles, steps };
}

/** A step of the night as the conductor's arc step. */
export function arcStepOf(style: MusicStyle, s: NightStep): ArcStep {
  const f = style.families![s.family];
  return {
    name: `${f?.name ?? s.family} · ${s.role}`, energy: s.energy, transpose: s.transpose, bpm: s.bpm,
    ...(s.scale !== style.scale ? { scale: s.scale } : {}),
    lead: s.lead, vocal: s.vocal, bass: s.bass, tune: s.wave + 1, family: s.family, role: s.role,
    sections: { land: f.land, four: f.four, breaks: f.breaks, breakdown: f.breakdown }, build: f.build, ...(f.buildBars ? { buildBars: f.buildBars } : {}),
  };
}

const NIGHT_STYLES = new WeakMap<NightSet, WeakMap<MusicStyle, MusicStyle>>();
/** The style with the night's arc in place of its own (the same object for the same set and style). */
export function nightStyle(style: MusicStyle, set: NightSet | null | undefined): MusicStyle {
  if (!set || !style.families) return style;
  let m = NIGHT_STYLES.get(set);
  if (!m) NIGHT_STYLES.set(set, (m = new WeakMap()));
  let s = m.get(style);
  if (!s) m.set(style, (s = { ...style, arc: set.steps.map(st => arcStepOf(style, st)) }));
  return s;
}

/** The night's tempos, a step a wave (the beat clock's: rules/beat.ts). */
export const nightTempos = (set: NightSet): number[] => set.steps.map(s => s.bpm);

/** How two steps differ (Ed: each wave must change at least two of these). */
export function stepChanges(a: NightStep, b: NightStep): string[] {
  const out: string[] = [];
  if (a.family !== b.family) out.push("genre");
  if (a.transpose !== b.transpose || a.scale !== b.scale) out.push("key");
  if (a.lead !== b.lead) out.push("lead");
  if (a.bass !== b.bass) out.push("bass");
  if (a.vocal !== b.vocal) out.push("vocal");
  if (a.bpm !== b.bpm) out.push("tempo");
  return out;
}

/** The style's set problems (empty when sound): every family's sections, patches, leads and voices exist, the curated night's
 *  families too, and no two curated steps in a row share a family. */
export function checkSet(style: MusicStyle): string[] {
  const errs: string[] = [], F = style.families ?? {};
  for (const [k, f] of Object.entries(F)) {
    for (const s of [f.land, ...f.four, ...f.breaks, ...f.breakdown, f.build]) if (s !== undefined && !style.sections[s]) errs.push(`family ${k}: no section "${s}"`);
    if (!f.four.length || !f.breaks.length || !f.breakdown.length) errs.push(`family ${k}: a kind of section missing`);
    for (const b of f.bass) if (!style.patches[b]) errs.push(`family ${k}: no bass patch "${b}"`);
    for (const l of f.leads ?? []) if (!style.parts[l]) errs.push(`family ${k}: no lead part "${l}"`);
    for (const v of f.vocals ?? []) if (v !== "none" && !style.patches[v]) errs.push(`family ${k}: no voice "${v}"`);
    if (f.scale && !style.scales[f.scale]) errs.push(`family ${k}: no scale "${f.scale}"`);
  }
  const S = style.set;
  if (S) {
    for (const l of S.leads) if (!style.parts[l]) errs.push(`set: no lead part "${l}"`);
    for (const v of S.vocals) if (v !== "none" && !style.patches[v]) errs.push(`set: no voice "${v}"`);
    if (!style.scales[S.darker]) errs.push(`set: no scale "${S.darker}"`);
  }
  (style.curated?.steps ?? []).forEach((c, i, all) => {
    if (!F[c.family]) errs.push(`curated ${i}: no family "${c.family}"`);
    if (i > 0 && all[i - 1].family === c.family) errs.push(`curated ${i}: ${c.family} twice running`);
    for (const p of [c.bass, c.vocal]) if (p !== "none" && !style.patches[p]) errs.push(`curated ${i}: no patch "${p}"`);
    if (!style.parts[c.lead]) errs.push(`curated ${i}: no lead part "${c.lead}"`);
  });
  return errs;
}

/** The night's set for a map (the game's: rules/game.ts newGame): its island ("home", a kind's, or "" with no roster), its
 *  waves (its areas but home's, a wave each witch's worth of them) and their lengths (each wave's link of the ley line: links[i]
 *  runs into the stone wave i + 1 wakes, so links[0] is the countdown after the boot). Null with no families in the style. */
export function nightFor(map: ForestMap, seed: number, style: MusicStyle = MUSIC_STYLE): NightSet | null {
  if (!style.families || !style.set) return null;
  let lengths: number[] | undefined, areas = Math.max(1, map.cells.length - 1);
  try { const r = routeOf(map); lengths = r.links.map(l => polyLength(l)); areas = Math.max(1, r.order.length); } catch { /* no route: equal lengths */ }
  const waves = Math.max(1, Math.ceil(areas / Math.max(1, map.tuning.party.areasPerWave)));
  return planNight(style, { seed, island: map.island?.kind ?? "", waves, lengths });
}
