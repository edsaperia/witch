// The composer's rules (Ed, 2026-11-08: better melodies and basslines, "smarter rules": still made live from the seed, but
// written more as a person would). Numbers only, no sound, no randomness of its own: rules/musicScore.ts deals the seeded
// choices and hands them here. A melody is planned, then filled: a contour with one peak, a motif that comes back and
// changes, chord tones on the strong beats, passing and neighbour notes between them, a leap now and then filled in by a
// step back. A bassline is the part's pattern, varied over a four-bar phrase, stepping into each new chord and sitting with
// the kick. docs/notes/music.md **The composer**.

/** The composer's settings (the style's `compose`; config/music-style.json, docs/notes/config-history/music-style.md#compose). */
export interface ComposeDef {
  /** The composer on (the default) or off: the melodies and basslines as before (tuning music.melody "old", ?melody=old). */
  on?: boolean;
  /** How often each phrase shape is dealt (weights): arch (up to the peak and down), rise (low to the peak), fall (from high,
   *  down, then up to the peak late), wave (a lower crest first, then the peak). */
  contours: Record<string, number>;
  /** Where the phrase's one highest note falls, as a share of the phrase (from, to). */
  peak: [number, number];
  /** The melody's chord tones (the notes on its strong beats) take the chord's seventh as well as its root, third and fifth
   *  (the dance music's colour: a narrow sung line over a slow chord has room to move). */
  sevenths?: boolean;
  /** The chance a motif's interval is a leap on an instrument (a fourth, or now and then a sixth); the sung line leaps only into
   *  its peak, by a fourth at most. */
  leap: number;
  /** The bass's rules: the chance it steps into a new chord (`approach`), and each bass part's own (parts not listed play their
   *  pattern as before: the drones, the haunted drop's sub). */
  bass: { approach: number; parts: Record<string, BassRule> };
}

/** A bass part's own rules (ComposeDef.bass.parts). */
export interface BassRule {
  /** Its chance of stepping into a new chord (the bass's `approach` if none; 0 never). */
  approach?: number;
  /** A note on the last eighth when its pattern has none on the last beat, to step into the new chord from. */
  insert?: boolean;
  /** The fourth bar's fill, at `fillChance`: "octave" (the last beat's notes an octave up), "walk" (two eighths walking into the
   *  next chord), "arp" (a sixteenth arpeggio up the chord: chip), "none". */
  fill?: "octave" | "walk" | "arp" | "none";
  fillChance?: number;
  /** The chance a bar's quiet sixteenths take a ghost note (where the kick allows: on it or just after it, never just before). */
  ghost?: number;
  /** The chance the second or third bar of its phrase moves one off-beat note an octave. */
  octave?: number;
  /** Strike the held note again where the kick hits off the beat (the bass following a breakbeat's kick). */
  restrike?: boolean;
}

const m7 = (d: number) => ((d % 7) + 7) % 7;
const sign = (x: number) => (x > 0 ? 1 : x < 0 ? -1 : 0);

// ---------------------------------------------------------------- the melody: a line planned, then filled

/** One note-to-be of a line: where it starts and how long (sixteenths), whether it's on a strong beat, the chord's tones there
 *  (scale steps, 0-6), the lowest and highest it may be, and where the plan would like it. */
export interface LineSlot { pos: number; dur: number; strong: boolean; tones: number[]; lo: number; hi: number; target: number }

/** A line's rules: the widest step between notes (and into the peak), the peak's slot (-1 none), how many leaps (a fourth or
 *  more) it may take, the scale steps it may end on, and a slot range already settled (the returning hook: its notes given). */
export interface LineRules { maxStep: number; peakStep: number; peak: number; maxLeaps: number; ends?: number[]; fixed?: (number | undefined)[]; /** the most of one note running (2 then 3 then any, if not given) */ most?: number }

/** A leap: a fourth or wider. */
export const LEAP = 3;

/** The line's notes (scale steps), one a slot: the nearest to each slot's target that keeps the rules. A strong slot takes a
 *  chord tone; a note off the chord only on a weak slot, reached by a step and left at once by a step to a chord tone (a passing
 *  or neighbour note); after a leap, a step back the other way; never three of the same note running; the peak exactly where
 *  given; the last note one of `ends`. A search, nearest first, so it's the plan wherever the plan keeps the rules;
 *  deterministic. `strict`: null when no line keeps them (else each slot's nearest chord tone). */
export function composeLine(slots: LineSlot[], R: LineRules, strict: true): number[] | null;
export function composeLine(slots: LineSlot[], R: LineRules, strict?: false): number[];
export function composeLine(slots: LineSlot[], R: LineRules, strict = false): number[] | null {
  // (never three the same running if it can be helped; else never four; else as the chords allow)
  for (const most of R.most !== undefined ? [R.most] : [2, 3, Infinity]) { const out = search(slots, R, most); if (out) return out; }
  return strict ? null : greedy(slots, R);
}

function search(slots: LineSlot[], R: LineRules, most: number): number[] | null {
  const n = slots.length, out: number[] = new Array(n), leapsTo: number[] = new Array(n).fill(0);
  if (!n) return out;
  const fx = R.fixed;
  const ct = (i: number, d: number) => slots[i].tones.includes(m7(d));
  const ok = (i: number, d: number): boolean => {
    if (fx?.[i] !== undefined) return d === fx[i];
    const S = slots[i], tone = ct(i, d);
    if (d < S.lo || d > S.hi) return false;
    if ((S.strong || i === R.peak || i === 0 || i === n - 1) && !tone) return false;
    if (i === n - 1 && R.ends && !R.ends.includes(m7(d))) return false;
    if (!tone) { // (a passing or neighbour note: reached by a step, followed at once by a step to the next chord's tone)
      const T = slots[i + 1];
      if (Math.abs(S.pos + S.dur - T.pos) > 1e-6 || Math.abs(d - out[i - 1]) !== 1) return false;
      if (![d - 1, d + 1].some(x => x >= T.lo && x <= T.hi && T.tones.includes(m7(x)) && (fx?.[i + 1] === undefined || fx[i + 1] === x))) return false;
    }
    if (i > 0) {
      const p = out[i - 1], iv = d - p;
      if (Math.abs(iv) > (i === R.peak ? R.peakStep : R.maxStep)) return false;
      if (!ct(i - 1, p) && !(Math.abs(iv) === 1 && tone)) return false; // (the note off the chord resolved)
      if (i > 1) {
        const pv = p - out[i - 2];
        if (Math.abs(pv) >= LEAP && iv !== -sign(pv)) return false; // (the gap filled: a step back)
      }
      if (iv === 0 && most < Infinity) { let run = 2; for (let j = i - 1; j > 0 && out[j - 1] === d; j--) run++; if (run > most) return false; } // (the same note running)
      if (Math.abs(iv) >= LEAP && (i > 1 ? leapsTo[i - 1] : 0) >= R.maxLeaps) return false;
    }
    return true;
  };
  const order = (i: number): number[] => {
    if (fx?.[i] !== undefined) return [fx[i]!];
    // (nearest the target, then keeping the plan's direction from the note before (the motif's shape kept when its notes
    // move to fit a chord), then the smaller move)
    const S = slots[i], p = i > 0 ? out[i - 1] : S.target, want = i > 0 ? sign(S.target - slots[i - 1].target) : 0, xs: number[] = [];
    const cost = (d: number) => Math.abs(d - S.target) * 4 + (i > 0 && sign(d - p) !== want ? 3 : 0) + Math.abs(d - p);
    for (let d = S.lo; d <= S.hi; d++) xs.push(d);
    return xs.sort((a, b) => cost(a) - cost(b) || a - b);
  };
  // (depth first, nearest first; a slot that failed from the same last three notes and leaps fails again, so it's never slow)
  const failed = new Set<string>();
  let nodes = 0;
  const go = (i: number): boolean => {
    if (i === n) return true;
    const key = i > 0 ? `${i},${out[i - 1]},${i > 1 ? out[i - 2] : ""},${i > 2 ? out[i - 3] : ""},${leapsTo[i - 1]}` : "0";
    if (failed.has(key) || ++nodes > 20000) return false;
    for (const d of order(i)) {
      if (!ok(i, d)) continue;
      out[i] = d;
      leapsTo[i] = (i > 0 ? leapsTo[i - 1] : 0) + (i > 0 && Math.abs(d - out[i - 1]) >= LEAP ? 1 : 0);
      if (go(i + 1)) return true;
    }
    failed.add(key);
    return false;
  };
  return go(0) ? out : null;
}

/** When the search finds nothing (it hasn't, over the seeds the tests try): each slot's nearest chord tone, the peak and the
 *  ending kept. */
function greedy(slots: LineSlot[], R: LineRules): number[] {
  return slots.map((S, i) => {
    if (R.fixed?.[i] !== undefined) return R.fixed[i]!;
    let best = S.target, bd = Infinity;
    for (let d = S.lo; d <= S.hi; d++) if (S.tones.includes(m7(d)) && (i !== slots.length - 1 || !R.ends || R.ends.includes(m7(d))) && Math.abs(d - S.target) < bd) { bd = Math.abs(d - S.target); best = d; }
    return best;
  });
}

/** The phrase's shape at `t` (0-1 through it): 0 its lowest to 1 its peak, the peak at `tp`. */
export function contourAt(kind: string, t: number, tp: number): number {
  const pts: [number, number][] = kind === "rise" ? [[0, 0.05], [tp, 1], [1, 0.4]]
    : kind === "fall" ? [[0, 0.75], [tp * 0.6, 0.2], [tp, 1], [1, 0]]
    : kind === "wave" ? [[0, 0.3], [tp * 0.4, 0.7], [tp * 0.7, 0.25], [tp, 1], [1, 0.15]]
    : [[0, 0.3], [tp, 1], [1, 0.15]]; // (arch)
  for (let k = 1; k < pts.length; k++) if (t <= pts[k][0]) { const [a, ha] = pts[k - 1], [b, hb] = pts[k]; return ha + ((hb - ha) * (t - a)) / Math.max(1e-6, b - a); }
  return pts[pts.length - 1][1];
}

/** A contour dealt by its weights (r a seeded 0-1). */
export function pickContour(weights: Record<string, number>, r: number): string {
  const ks = Object.keys(weights).filter(k => weights[k] > 0), sum = ks.reduce((s, k) => s + weights[k], 0);
  let x = r * sum;
  for (const k of ks) { x -= weights[k]; if (x < 0) return k; }
  return ks[ks.length - 1] ?? "arch";
}

/** A rhythm cell's notes: where each starts in the bar, how long, and whether it's on the beat (x a note, - held, T a quarter-note
 *  triplet over 8 sixteenths, t an eighth-note triplet over 4). */
export function cellNotes(cell: string): { pos: number; dur: number; strong: boolean }[] {
  const out: { pos: number; dur: number; strong: boolean }[] = [];
  for (let s = 0; s < 16; s++) {
    const c = cell[s];
    if (c === "x") { let dur = 1; while (s + dur < 16 && cell[s + dur] === "-") dur++; out.push({ pos: s, dur, strong: s % 4 === 0 }); }
    else if (c === "T" || c === "t") { const span = c === "T" ? 8 : 4; for (let k = 0; k < 3; k++) out.push({ pos: s + (k * span) / 3, dur: span / 3, strong: k === 0 && s % 4 === 0 }); }
  }
  return out;
}

/** A rhythm a little changed (the motif's rhythm when it comes back): a long note split in two, or the last two notes joined;
 *  triplets as they are. `r` a seeded 0-1. */
export function varyCell(cell: string, r: number): string {
  if (/[Tt]/.test(cell)) return cell;
  const notes = cellNotes(cell), split = notes.filter(n => n.dur >= 4 && n.dur % 2 === 0), c = [...cell];
  if (split.length && (r < 0.6 || notes.length < 3)) { const n = split[Math.floor(r * 7919) % split.length]; c[n.pos + n.dur / 2] = "x"; return c.join(""); }
  if (notes.length >= 3) { const n = notes[notes.length - 1]; c[n.pos] = "-"; return c.join(""); }
  return cell;
}

/** A motif's shape: each note's scale steps from its first, `n` notes; mostly steps, now and then a third, and on an instrument
 *  (leap > 0) now and then a leap with the step back after it; never three the same. `r(k)` a seeded 0-1 for note k. */
export function motifShape(n: number, r: (k: number) => number, leap: number, reach: number): number[] {
  const offs = [0];
  let cur = 0, pv = 0;
  for (let k = 1; k < n; k++) {
    const x = r(k);
    let iv: number;
    if (Math.abs(pv) >= LEAP) iv = -sign(pv);
    else if (x < leap) iv = (x < leap * 0.25 ? 5 : 3) * (r(k + 101) < 0.5 ? 1 : -1);
    else iv = [1, -1, 1, -1, 2, -2, 0][Math.floor(r(k + 211) * 7)];
    if (iv === 0 && (pv === 0 || k === 1)) iv = r(k + 307) < 0.5 ? 1 : -1;
    if (Math.abs(cur + iv) > reach) iv = -sign(iv) * Math.min(Math.abs(iv), 2);
    cur += iv; pv = iv; offs.push(cur);
  }
  return offs;
}

// ---------------------------------------------------------------- the clearing's (and the old styles') motif

/** A two-bar motif, one value a sixteenth, scale steps above the chord's root (the clearing's layers and the sections' own
 *  melodies without a form): the beats planned on a contour (chord tones, the one peak 60-75% through, the second bar the first
 *  moved or turned over), the sixteenths between them passing and neighbour notes. `r(k)` a seeded 0-1. */
export function beatMotif(C: ComposeDef, r: (k: number) => number): number[] {
  const kind = pickContour(C.contours, r(1)), tp = C.peak[0] + (C.peak[1] - C.peak[0]) * r(2);
  const pkBeat = Math.min(7, Math.max(4, Math.round(tp * 8))), pk = r(3) < 0.7 ? 7 : 9, tones = C.sevenths ? [0, 2, 4, 6] : [0, 2, 4];
  // the beats: a contour, its second bar the first's shape moved by a third or turned over (inverted), toward the peak
  const shape = motifShape(4, k => r(10 + k), C.leap, 4), turn = r(4) < 0.35 ? -1 : 1, move = r(5) < 0.5 ? 2 : 1;
  const tgt = (b: number) => { const h = contourAt(kind, b / 8, pkBeat / 8); return Math.round(-2 + h * (pk - 1 + 2)); };
  const slots: LineSlot[] = Array.from({ length: 8 }, (_, b) => ({ pos: b * 4, dur: 4, strong: true, tones, lo: b === pkBeat ? pk : -2, hi: b === pkBeat ? pk : pk - 1, target: 0 }));
  const a0 = tgt(0);
  for (let b = 0; b < 4; b++) slots[b].target = a0 + shape[b];
  for (let b = 4; b < 8; b++) slots[b].target = b === pkBeat ? pk : Math.round((a0 + move + turn * shape[b - 4] + tgt(b)) / 2);
  const beats = composeLine(slots, { maxStep: 5, peakStep: 5, peak: pkBeat, maxLeaps: 2 });
  // the sixteenths between: stepwise toward the next beat, late (held, then stepping in) or early (stepping away at once: always
  // after the peak or a leap); a repeated beat takes a neighbour note
  const out: number[] = [], below = (v: number) => (v >= pk ? pk - (m7(pk) === 0 ? 3 : 2) : v);
  for (let b = 0; b < 8; b++) {
    const a = beats[b], nb = beats[(b + 1) % 8], d = nb - a, s = sign(d), prevLeap = b > 0 && Math.abs(a - beats[b - 1]) >= LEAP;
    const early = (a === pk || prevLeap || r(40 + b) < 0.5) && nb !== pk;
    let f: number[];
    if (d === 0) { const nbh = a + 1 < pk && r(50 + b) < 0.6 ? a + 1 : a - 1; f = early ? [nbh, a, a] : [a, nbh, a]; }
    else {
      const steps = Math.min(Math.abs(d) - 1, 3), path = Array.from({ length: steps }, (_, k) => a + s * (k + 1));
      f = early ? [...path, ...Array(3 - steps).fill(nb)] : [...Array(3 - steps).fill(a), ...path];
    }
    // (a note off the chord left by a step, else held on the note before it; nothing reaching the peak but the peak's beat)
    for (let k = 2; k >= 0; k--) {
      const nxt = k === 2 ? nb : f[k + 1];
      if (!tones.includes(m7(f[k])) && Math.abs(nxt - f[k]) !== 1) f[k] = k ? f[k - 1] : a;
      f[k] = below(f[k]);
    }
    out.push(a, ...f);
  }
  return out;
}

// ---------------------------------------------------------------- the bassline

/** One bass note of a bar: scale steps over the chord's root (`abs`: over the key's, an approach into the next chord), its level
 *  (×) and length (sixteenths). */
export interface BassNote { k: number; abs?: boolean; vel: number; dur: number }

const BASS_STEPS: Record<string, number> = { "1": 0, "2": 1, "3": 2, "5": 4, "7": 6, "8": 7 };

/** A bar of a bass part (its 16-character pattern bar) as the composer plays it: the pattern, varied by where the bar falls in
 *  its four-bar phrase (`q`, 0-3: the fourth's fill, an octave moved in the second or third), ghost notes where the kick (`kick`,
 *  its bar's pattern, or null) leaves room, held notes struck again on the kick's off-beat hits, and the last note before a new
 *  chord stepping into it (`root` the chord's, `next` the next bar's or null for the same: from a step above or below, or its
 *  fifth). "a" in a pattern always steps into the next chord (the root when it stays). `r(k)` a seeded 0-1. */
export function bassBar(bar: string, rule: BassRule, approach: number, root: number, next: number | null, kick: string | null, q: number, r: (k: number) => number): (BassNote | null)[] {
  const out: (BassNote | null)[] = new Array(16).fill(null);
  const hit = (s: number) => !!kick && kick[s] !== "." && kick[s] !== "-" && kick[s] !== undefined;
  const marks: string[] = [];
  for (let s = 0; s < 16; s++) {
    const c = bar[s];
    if (c === "." || c === "-") continue;
    let dur = 1;
    while (s + dur < 16 && bar[s + dur] === "-") dur++;
    out[s] = { k: BASS_STEPS[c] ?? 0, vel: 1, dur };
    marks[s] = c;
  }
  const onsets = () => out.map((n, s) => (n ? s : -1)).filter(s => s >= 0);
  const cutBefore = (s: number) => { for (let j = s - 1; j >= 0; j--) if (out[j]) { out[j]!.dur = Math.min(out[j]!.dur, s - j); break; } };
  const place = (s: number, n: BassNote) => { cutBefore(s); out[s] = n; };
  const heldAt = (s: number): number => { for (let j = s; j >= 0; j--) if (out[j]) return j + out[j]!.dur > s ? j : -1; return -1; };
  // the held note struck again on the kick's off-beat hits (a breakbeat's bass following its kick)
  if (rule.restrike && kick) for (let s = 1; s < 16; s++) if (s % 4 !== 0 && hit(s) && !out[s]) {
    const j = heldAt(s);
    if (j >= 0) { const n = out[j]!, end = j + n.dur; place(s, { k: n.k, vel: 0.8, dur: end - s }); }
  }
  // an octave moved, now and then, in the phrase's second or third bar
  if ((q === 1 || q === 2) && (rule.octave ?? 0) > 0 && r(1) < rule.octave!) {
    const off = onsets().filter(s => s % 4 !== 0 && s < 12);
    if (off.length) { const s = off[Math.floor(r(2) * off.length)], n = out[s]!; n.k = n.k >= 7 ? n.k - 7 : n.k + 7; }
  }
  // the fourth bar's fill
  if (q === 3 && rule.fill && rule.fill !== "none" && r(3) < (rule.fillChance ?? 0.7)) {
    if (rule.fill === "octave") { for (const s of onsets()) if (s >= 12 || (s >= 8 && !onsets().some(t => t >= 12))) { const n = out[s]!; if (n.k < 7) n.k += 7; } }
    else if (rule.fill === "arp") { for (let s = 12; s < 16; s++) out[s] = null; cutBefore(12); [0, 2, 4, 7].forEach((k, i) => (out[12 + i] = { k, vel: i ? 0.8 : 0.95, dur: 1 })); }
    else if (rule.fill === "walk") { for (let s = 12; s < 16; s++) out[s] = null; cutBefore(12); out[12] = { k: r(4) < 0.5 ? 4 : 2, vel: 0.9, dur: 2 }; out[14] = { k: 7, vel: 0.85, dur: 2 }; }
  }
  // ghost notes in the quiet sixteenths: on the kick or just after it, never just before it
  if ((rule.ghost ?? 0) > 0) for (let s = 1; s < 16; s++) {
    if (bar[s] !== "." || out[s] || heldAt(s) >= 0 || s % 2 === 0) continue;
    const room = kick ? (hit(s - 1) || hit(s)) && !hit(s + 1) : s % 4 === 3;
    if (room && r(20 + s) < rule.ghost!) out[s] = { k: r(40 + s) < 0.5 ? 7 : 0, vel: 0.45, dur: 1 };
  }
  // into the next chord: the last note on the bar's last beat (or a new one on its last eighth) from a step above or below, or
  // the next chord's fifth; "a" always
  const chance = rule.approach ?? approach, last = onsets().filter(s => s >= 12).pop();
  const want = marks.some(c => c === "a") || (next !== null && next !== root && r(5) < chance);
  if (want && next !== null) {
    let s = marks.lastIndexOf("a") >= 12 ? marks.lastIndexOf("a") : last ?? -1;
    if (s < 0 && rule.insert && !hit(15)) { s = 14; place(14, { k: 0, vel: 1, dur: 2 }); }
    if (s >= 0) {
      const x = r(6), k = next + (x < 0.4 ? -1 : x < 0.75 ? 1 : x < 0.9 ? 4 : -3);
      out[s] = { k, abs: true, vel: 0.9, dur: Math.max(1, Math.min(out[s]!.dur, 16 - s)) };
    }
  }
  for (const [s, c] of marks.entries()) if (c === "a" && out[s] && !out[s]!.abs) out[s]!.k = 0; // (an "a" with no new chord: the root)
  return out;
}
