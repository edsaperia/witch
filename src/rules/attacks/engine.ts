// The composable attacks' engine (docs/plans/attack-grammar.md, steps 2 and 3): what an attack in the grammar does once cast. Its
// telegraphs shown from the windup's start (and the caster's tell), then at the release its pattern emitted: bodies flying their path
// terms at their speed profile, hitting, piercing, bouncing, sticking, and raising events (hit, expire, bounce, land, timer) that spawn
// child attacks (capped by depth and by the cast's count); areas striking once (and in patterns, waves and rain), zones lingering and
// ticking (a safe circle shrinking), beams charging, sweeping, tracking, spinning and pulsing, mines arming, seeds sprouting, lures
// pulling her in, force fields pushing whoever's near; and the pack's interplay (step 4: a bolt chaining from foe to foe, relayed through
// packmates, amplified passing them; a beam tethered between two of them; the ground between three erupting). Its foes take its damage and effects; other animals only the share and the
// effects `hit.allies` names (Ed, 2026-10-27); she's hurt at most once by a zone or a beam. All of it plain state in fixed
// pools (nothing allocated a step but a child's first use), seeded (a hash of the seed, the cast and the child: never Math.random),
// and read by the look layer and the audio as it is: bodies, zones and telegraphs with their tags, and events. The world it acts
// on is a small port (SpellWorld), so it runs headless in tests and in combat.ts alike.
import { childSpec, type Library } from "./parse";
import { REACTION_FLOOR, telegraphKind } from "./timeline";
import type { Aim, AttackSpec, BodyKind, Child, Effect, TelegraphKind, TellPose } from "./types";

// ---- the world it acts on ----

/** Something an attack can hit. `side` decides foes (the world's own rule); `id` is the world's. */
export interface Hittable { kind: "creature" | "witch" | "sound"; id: number | string; x: number; z: number; r: number; side: string; species?: string; vx?: number; vz?: number }

export interface SpellWorld {
  seed: number;
  /** Everything that could be hit within r of (x, z) (the caller filters asleep, down, flying...). */
  near(x: number, z: number, r: number): readonly Hittable[];
  /** Whether this is a foe of `side` (never the caster's own kind; anything else that isn't a foe is an ally, hit only as hit.allies says). */
  hostile(side: string, target: Hittable, casterSpecies: string, casterId: number): boolean;
  /** A hit lands: its damage and effect, from (fx, fz). */
  harm(target: Hittable, damage: number, effect: Effect | undefined, fx: number, fz: number, source: number, attack: string, /** what landed it (for the fight's counters) */ body?: BodyKind): void;
  /** A creature's place now (a caster or a stuck body's host), or null when it's gone. */
  where(kind: Hittable["kind"], id: number | string): { x: number; z: number; vx?: number; vz?: number } | null;
  /** Ground a runner can't cross (water), or a wall a bolt bounces off; absent: none. */
  blocked?(x: number, z: number): boolean;
  /** Where her dodge would put her (aim "dodge"); absent: where she is. */
  dodgeAim?(target: Hittable): { x: number; z: number } | null;
  /** A beat's length (s), for volleys. */
  beat?: number;
  /** Move this along by a force (m/s for dt: away from (fx, fz), or toward it when push < 0): a force field, a lure. */
  force?(target: Hittable, fx: number, fz: number, push: number, dt: number): void;
  /** Whether a caster is still winding up this cast (not stunned, gone or off its target): a cast it isn't is dropped at its release. */
  stillCasting?(source: number, cast: number): boolean;
  /** A caster's packmates (its own kind on its own side, awake, not itself) within r of (x, z), nearest first; absent: none (attack.pack
   *  does nothing). */
  packmates?(source: number, x: number, z: number, r: number): readonly { id: number; x: number; z: number }[];
}

// ---- its state ----

export const CAPS = { bodies: 512, zones: 128, beams: 64, telegraphs: 256, pending: 512, burns: 128, depth: 3, children: 64, bounces: 8, pierces: 8 };

export interface Body {
  id: number; alive: boolean; attack: AttackSpec; name: string;
  kind: "bolt" | "lob" | "runner" | "lure" | "mine" | "seed";
  x: number; z: number; y: number;
  /** its heading (unit) and speed now, and its spine (the path before its wave's sway) */
  hx: number; hz: number; v: number; sx: number; sz: number;
  /** where and when it set off; its caster; how far it has gone */
  ox: number; oz: number; born: number; source: number; side: string; species: string; travelled: number;
  damage: number; radius: number; depth: number; cast: number;
  /** what it's homing on, and whether it has locked on yet */
  target: Hittable | null; locked: boolean;
  pierced: number; bounced: number; hits: (number | string)[];
  /** a lob's flight: from, to, its time */
  lob: { fx: number; fz: number; tx: number; tz: number; at: number; lands: number } | null;
  /** stuck to something (life.stick): what, and where on it */
  stuck: { kind: Hittable["kind"]; id: number | string; dx: number; dz: number } | null;
  /** stop-and-go: the leg it's on, and whether it's paused */
  leg: number; paused: boolean;
  /** a mine or a seed: when it arms or sprouts, whether it has, and when it's spent if nothing sets it off */
  armAt: number; armed: boolean; until: number;
  /** the pack (attack.pack): chain hops left; packmates still to relay through (the next first); held (at a packmate or a chain's hop)
   *  till then; how much it has grown (amplify) and by whom */
  chain: number; relay: number[]; holdUntil: number; amp: number; ampBy: number[];
  /** the look layer's tags */
  element: string; look: string;
}
export interface Zone {
  id: number; alive: boolean; attack: AttackSpec; name: string;
  /** safe: all of r but its shrinking safe circle (inner, from `inner` to `to` over `shrink` s); polygon: inside `points` (a triangulation's
   *  corners, [x0, z0, x1, z1, ...]; x, z its middle and r its farthest corner) */
  shape: "disc" | "ring" | "donut" | "cone" | "safe" | "polygon"; points?: number[]; to: number; shrink: number; x: number; z: number; r: number; inner: number; width: number; angle: number; heading: number;
  from: number; until: number; tick: number; nextTick: number; grow: number;
  damage: number; effect: Effect | undefined; side: string; source: number; species: string; depth: number; cast: number;
  /** a one-off strike (an area) rather than a lingering zone; what an expanding ring has hit already */
  once: boolean; hit: (number | string)[];
  element: string; look: string;
}
/** A beam: from its caster along `angle`, `length` long and `width` wide; charging (its telegraph thin) till `liveAt`, then burning in
 *  ticks till `until`, off between its pulses; turning by its sweep, track or spin. */
export interface Beam {
  id: number; alive: boolean; attack: AttackSpec; name: string;
  x: number; z: number; angle: number; length: number; width: number;
  from: number; liveAt: number; until: number; tick: number; nextTick: number; phase: "charging" | "live" | "off";
  damage: number; side: string; source: number; species: string; depth: number; cast: number; target: Hittable | null;
  /** what it has hit once already (her, by a beam once: Ed's hits are few) and its telegraph */
  hits: (number | string)[]; telegraph: number;
  /** its angle at its last tick: a turning beam hits whatever it swept over since (its wedge), not just where it points */
  tickAngle: number;
  /** a tether's other end: the packmate it's strung to (its length and angle follow the two) */
  to?: number;
  element: string; look: string;
}
/** A burn on a creature: its damage a second till then, its next tick. */
interface Burn { alive: boolean; target: Hittable; dps: number; until: number; next: number; source: number; name: string }
/** A warning, as plain geometry and timing (the look layer's danger frame draws it; the audio cues on its events). */
export interface Telegraph {
  id: number; alive: boolean; kind: TelegraphKind; attack: string; side: string; source: number; cast: number;
  shape: { type: "point" | "segment" | "path" | "disc" | "ring" | "cone" | "polygon"; x: number; z: number; x2?: number; z2?: number; r?: number; inner?: number; width?: number; angle?: number; heading?: number; points?: number[] };
  start: number; fire: number; until: number;
  /** what it moves with: a body, or a creature; and what a segment's far end moves with (a tether's packmate) */
  follows?: { body?: number; creature?: number; end?: number };
}
/** Something waiting to happen: a release after a windup, a burst's next shot, a timer's child. */
interface Pending { at: number; attack: AttackSpec; name: string; x: number; z: number; heading: number; aim: Hittable | null; side: string; species: string; source: number; damage: number; depth: number; cast: number; index: number; fromBody?: number; patternIndex?: number; /** a turret's casts still to come */ left?: number; /** where its target stood as it was cast (an area there lands where it was telegraphed) */ aimAt?: { x: number; z: number }; /** placed where it is (a pattern's cell, a raindrop): not moved to its caster */ placed?: boolean; /** a triangulation's corners */ points?: number[] }

export type SpellEventKind = "cast" | "release" | "emit" | "hit" | "expire" | "bounce" | "land" | "timer" | "split" | "zone" | "beam" | "armed" | "sprung" | "sprout" | "telegraph" | "fire" | "capped" | "chain" | "relay" | "amplify" | "fizzle";
export interface SpellEvent { kind: SpellEventKind; at: number; x: number; z: number; attack: string; source: number; body?: number; zone?: number; beam?: number; telegraph?: number; element?: string; /** a hit on an animal it wasn't aimed at (hit.allies) */ ally?: boolean }

export interface SpellState {
  bodies: Body[]; zones: Zone[]; beams: Beam[]; telegraphs: Telegraph[]; pending: Pending[]; burns: Burn[];
  /** each caster's tell while it winds up (its pose and glow, from and until) */
  tells: Map<number, { pose: TellPose; glow: number; from: number; until: number; attack: string }>;
  events: SpellEvent[]; next: number; casts: number;
  /** what each cast's children have emitted so far (the cap: CAPS.children) */
  made: Map<number, number>;
  /** everything emitted since the start, by depth (bodies and zones), for the overlay and the tests */
  stats: { bodies: number[]; zones: number[]; beams: number[] };
  /** things not made for a cap */
  capped: number;
  /** the step's time (for children made inside it), and the bodies that have shown their lock-on */
  now: number; locks: Set<number>;
  /** what every random choice is seeded from (the night's: the Fight Arena sets it) */
  seed: number;
}
export const newSpells = (seed = 1): SpellState => ({ seed, bodies: [], zones: [], beams: [], telegraphs: [], pending: [], burns: [], tells: new Map(), events: [], next: 1, casts: 0, made: new Map(), stats: { bodies: [0, 0, 0, 0], zones: [0, 0, 0, 0], beams: [0, 0, 0, 0] }, capped: 0, now: 0, locks: new Set() });

// ---- seeded numbers ----

/** A number in [0, 1) from the seed, the cast and an index: the same every run. */
export function rnd(seed: number, cast: number, i: number): number {
  let h = (seed ^ 0x9e3779b9) >>> 0;
  h = Math.imul(h ^ (cast + 0x85ebca6b), 0xc2b2ae35) >>> 0;
  h = Math.imul(h ^ (i * 0x27d4eb2f + 0x165667b1), 0x85ebca6b) >>> 0;
  h ^= h >>> 15; h = Math.imul(h, 0x2c1b3c6d) >>> 0; h ^= h >>> 12;
  return (h >>> 0) / 4294967296;
}

const RAD = Math.PI / 180;
const isBody = (k: string | undefined) => k === undefined || k === "bolt" || k === "lob" || k === "runner" || k === "lure" || k === "mine" || k === "seed";
/** Placed where it's aimed rather than flown there (a mine, a seed). */
const isPlaced = (k: string | undefined) => k === "mine" || k === "seed";

/** A free slot in a pool (a dead one reused, else a new one under the cap), or null. */
function slot<T extends { alive: boolean }>(pool: T[], cap: number): number {
  for (let i = 0; i < pool.length; i++) if (!pool[i].alive) return i;
  return pool.length < cap ? pool.length : -1;
}

// ---- casting ----

export interface Caster { id: number; x: number; z: number; side: string; species: string; /** its facing (radians), for aim "ahead" */ heading?: number }

/** A cast begins: its telegraphs from now to `fireAt` (the windup's end), and the caster's tell; the release is scheduled at fireAt.
 *  Returns the cast's id. `damage`: the cast's damage (the level's budget for its cooldown, as combat.ts works it out). */
export function cast(S: SpellState, W: SpellWorld, spec: AttackSpec, name: string, c: Caster, target: Hittable | null, time: number, damage: number, fireAt = time + (spec.cast?.windup ?? 0.6)): number {
  const id = ++S.casts, tell = spec.cast?.tell;
  if (tell && (tell.pose ?? "none") !== "none") S.tells.set(c.id, { pose: tell.pose ?? "none", glow: tell.glow ?? 0, from: time, until: fireAt, attack: name });
  S.events.push({ kind: "cast", at: time, x: c.x, z: c.z, attack: name, source: c.id });
  const heading = aimHeading(spec.emit?.aim ?? "target", c.x, c.z, c.heading ?? 0, target, W, spec, id, 0);
  showTelegraphs(S, W, spec, name, c.x, c.z, heading, target, c.side, c.id, id, time, fireAt);
  const at = target && W.where(target.kind, target.id);
  queue(S, { at: fireAt, attack: spec, name, x: c.x, z: c.z, heading, aim: target, side: c.side, species: c.species, source: c.id, damage, depth: 0, cast: id, index: 0, ...(at ? { aimAt: { x: at.x, z: at.z } } : {}) });
  return id;
}

/** A cast's release cancelled (the caster stunned, knocked down, gone): its pending release and its telegraphs dropped. */
export function cancel(S: SpellState, castId: number): void {
  S.pending = S.pending.filter(p => p.cast !== castId || p.depth > 0);
  for (const t of S.telegraphs) if (t.alive && t.cast === castId && t.fire > 0) t.alive = false;
}

function queue(S: SpellState, p: Pending): void {
  if (S.pending.length >= CAPS.pending) { S.capped++; return; }
  S.pending.push(p);
}

/** Where to aim (a heading, radians) from (x, z). */
function aimHeading(aim: Aim, x: number, z: number, facing: number, target: Hittable | null, W: SpellWorld, spec: AttackSpec, cast: number, i: number): number {
  const at = target && W.where(target.kind, target.id);
  switch (aim) {
    case "random": return rnd(W.seed, cast, 1000 + i) * Math.PI * 2;
    case "ahead": case "spot": return facing;
    case "caster": return facing;
    case "lead": if (at && target) { const v = spec.speed?.v ?? 28, d = Math.hypot(at.x - x, at.z - z), tt = d / Math.max(1, v); return Math.atan2(at.z + (at.vz ?? 0) * tt - z, at.x + (at.vx ?? 0) * tt - x); } break;
    case "dodge": if (target) { const q = W.dodgeAim?.(target); if (q) return Math.atan2(q.z - z, q.x - x); } break;
  }
  return at ? Math.atan2(at.z - z, at.x - x) : facing;
}

/** The headings and offsets a pattern releases at once (a burst's and a spray's later ones are scheduled). */
function patternOf(spec: AttackSpec, heading: number): { heading: number; dx: number; dz: number; delay: number }[] {
  const E = spec.emit ?? {}, n = Math.max(1, E.n ?? 1), out: { heading: number; dx: number; dz: number; delay: number }[] = [];
  switch (E.pattern ?? "single") {
    // (a fan's or ring's things set off `spacing` out from the middle along their heading: a ring of bombs round where one landed)
    case "fan": { const a = (E.angle ?? 45) * RAD, sp = E.spacing ?? 0; for (let k = 0; k < n; k++) { const h = heading + (n > 1 ? (k / (n - 1) - 0.5) * a : 0); out.push({ heading: h, dx: Math.cos(h) * sp, dz: Math.sin(h) * sp, delay: 0 }); } break; }
    case "ring": { const o = (E.offset ?? 0) * RAD, sp = E.spacing ?? 0; for (let k = 0; k < n; k++) { const h = heading + o + (k / n) * Math.PI * 2; out.push({ heading: h, dx: Math.cos(h) * sp, dz: Math.sin(h) * sp, delay: 0 }); } break; }
    case "burst": case "volley": for (let k = 0; k < n; k++) out.push({ heading, dx: 0, dz: 0, delay: k * (E.gap ?? 0.15) }); break;
    case "spray": { const T = E.time ?? 1, rate = (E.rate ?? 180) * RAD; for (let k = 0; k < n; k++) { const t = n > 1 ? (k / (n - 1)) * T : 0; out.push({ heading: heading + rate * t, dx: 0, dz: 0, delay: t }); } break; }
    case "wall": { const sp = E.spacing ?? 2, holes = new Set(E.holes ?? []), px = -Math.sin(heading), pz = Math.cos(heading); for (let k = 0; k < n; k++) if (!holes.has(k)) { const o = (k - (n - 1) / 2) * sp; out.push({ heading, dx: px * o, dz: pz * o, delay: 0 }); } break; }
    default: out.push({ heading, dx: 0, dz: 0, delay: 0 });
  }
  return out;
}

/** A pattern area's cells (cross, line, grid), in the order they go off: `n` an arm's, a line's or a side's, `spacing` apart. */
function cellsOf(a: AttackSpec, cx: number, cz: number, heading: number): { x: number; z: number }[] {
  const A = a.area ?? {}, n = Math.max(1, A.n ?? 4), sp = A.spacing ?? 3, ux = Math.cos(heading), uz = Math.sin(heading), out: { x: number; z: number }[] = [];
  if (A.shape === "line") for (let k = 1; k <= n; k++) out.push({ x: cx + ux * sp * k, z: cz + uz * sp * k }); // (creeping out along the aim)
  else if (A.shape === "cross") { out.push({ x: cx, z: cz }); for (let k = 1; k <= n; k++) for (const [dx, dz] of [[ux, uz], [-uz, ux], [-ux, -uz], [uz, -ux]]) out.push({ x: cx + dx * sp * k, z: cz + dz * sp * k }); }
  else { const h = (n - 1) / 2; for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) out.push({ x: cx + (i - h) * sp * ux - (j - h) * sp * uz, z: cz + (i - h) * sp * uz + (j - h) * sp * ux }); }
  return out;
}

// ---- hitting ----

/** One thing an attack reaches: a foe takes its damage and effect; another animal (an ally) only hit.allies' share and the effects it
 *  names (none of either: untouched); her, by a zone or a beam, damaged only the first time (`once`). A burn is the engine's own.
 *  Whether it touched a foe or landed anything on an ally. */
function strike(S: SpellState, W: SpellWorld, a: AttackSpec, t: Hittable, damage: number, fx: number, fz: number, side: string, species: string, source: number, name: string, time: number, once?: (number | string)[], ref?: { body?: number; zone?: number; beam?: number }): boolean {
  const H = a.hit ?? {};
  let dmg = damage, effect = H.effect, ally = false;
  const foe = W.hostile(side, t, species, source);
  if (!foe) {
    if (t.kind !== "creature" || t.id === source || !H.allies) return false;
    dmg = damage * (H.allies.damage ?? 0); ally = true;
    const keep = new Set(H.allies.effects ?? []);
    effect = effect ? (Object.fromEntries(Object.entries(effect).filter(([k]) => keep.has(k as never))) as Effect) : undefined;
    if (effect && !Object.keys(effect).length) effect = undefined;
  }
  if (once && t.kind === "witch") { if (once.includes(t.id)) dmg = 0; else if (dmg > 0) once.push(t.id); }
  if (effect?.burn && t.kind === "creature") {
    const i = slot(S.burns, CAPS.burns);
    if (i >= 0) S.burns[i] = { alive: true, target: t, dps: effect.burn.dps, until: time + effect.burn.time, next: time + 0.5, source, name };
    const { burn: _b, ...rest } = effect; effect = Object.keys(rest).length ? rest : undefined;
  }
  if (dmg <= 0 && !effect) return foe; // (a foe touched all the same: a harmless sticky bolt still sticks)
  W.harm(t, dmg, effect, fx, fz, source, name, a.body?.kind ?? "bolt");
  S.events.push({ kind: "hit", at: time, x: t.x, z: t.z, attack: name, source, element: a.body?.element, ...ref, ...(ally ? { ally } : {}) });
  return true;
}

/** A force field (attack.force) round (cx, cz) for dt: whoever it reaches pushed (or pulled). */
function pushAround(W: SpellWorld, a: AttackSpec, cx: number, cz: number, r: number, side: string, species: string, source: number, dt: number): void {
  const F = a.force;
  if (!F || !W.force) return;
  const R = F.r ?? r, who = F.who ?? "others";
  for (const t of W.near(cx, cz, R)) {
    if (Math.hypot(t.x - cx, t.z - cz) > R + t.r || t.kind === "sound" || (t.kind === "creature" && t.id === source)) continue;
    if (who === "foes" ? !W.hostile(side, t, species, source) : who === "others" ? t.kind !== "creature" : false) continue;
    W.force(t, cx, cz, F.push, dt);
  }
}

// ---- telegraphs ----

function telegraph(S: SpellState, t: Omit<Telegraph, "id" | "alive">): void {
  const i = slot(S.telegraphs, CAPS.telegraphs);
  if (i < 0) { S.capped++; return; }
  const T: Telegraph = { ...t, id: S.next++, alive: true };
  S.telegraphs[i] = T;
  S.events.push({ kind: "telegraph", at: t.start, x: t.shape.x, z: t.shape.z, attack: t.attack, source: t.source, telegraph: T.id });
}

/** An attack's warnings, from `start` to its release at `fire`: each by its kind, as geometry. */
function showTelegraphs(S: SpellState, W: SpellWorld, spec: AttackSpec, name: string, x: number, z: number, heading: number, target: Hittable | null, side: string, source: number, castId: number, start: number, fire: number): void {
  const kind = telegraphKind(spec), lead = spec.telegraph?.lead, from = lead !== undefined ? Math.max(start, fire - lead) : start;
  if (kind === "none") return;
  const base = { kind, attack: name, side, source, cast: castId, start: from, fire };
  const B = spec.body?.kind ?? "bolt", range = lifeRange(spec), width = 2 * (spec.body?.radius ?? 0.6), at = target && W.where(target.kind, target.id);
  const A0 = spec.area ?? {}, centre = (A0.at ?? "caster") === "target" && at ? at : { x, z };
  if (B === "area" && (A0.shape === "cross" || A0.shape === "line" || A0.shape === "grid")) {
    // (a pattern's cells: each its own landing, firing in turn)
    cellsOf(spec, centre.x, centre.z, heading).forEach((c, k) => telegraph(S, { ...base, kind: "landing", shape: { type: "disc", x: c.x, z: c.z, r: A0.r ?? 2 }, fire: fire + k * (A0.delay ?? 0.2), until: fire + k * (A0.delay ?? 0.2) }));
    return;
  }
  if (B === "area" && A0.rain) return; // (each raindrop shows its own landing as it's dropped)
  if (spec.pack?.triangulate) {
    // (the ground between it and its two nearest packmates, as they stand now: where it will erupt)
    const pts = corners(W, spec, source, x, z);
    if (pts) telegraph(S, { ...base, kind: spec.telegraph?.kind ?? "ring", fire: fire + spec.pack.triangulate.delay, until: fire + spec.pack.triangulate.delay, shape: { type: "polygon", x: (pts[0] + pts[2] + pts[4]) / 3, z: (pts[1] + pts[3] + pts[5]) / 3, points: pts } });
    return;
  }
  switch (kind) {
    case "flash": telegraph(S, { ...base, shape: { type: "point", x, z }, until: fire, follows: { creature: source } }); return;
    case "tetherLine": {
      // (strung to the nearest packmate: none near, nothing shown, and nothing comes of it)
      const m = W.packmates?.(source, x, z, spec.cast?.range ?? 20)[0];
      if (m) telegraph(S, { ...base, fire: fire + (spec.beam?.charge ?? REACTION_FLOOR), until: fire + (spec.beam?.charge ?? REACTION_FLOOR) + (spec.pack?.tether?.time ?? 1), shape: { type: "segment", x, z, x2: m.x, z2: m.z, width: spec.pack?.tether?.width ?? 1 }, follows: { creature: source, end: m.id } });
      return;
    }
    case "beamLine": {
      const Bm = spec.beam ?? {}, len = Bm.length ?? spec.cast?.range ?? 20, live = fire + (Bm.charge ?? 0), sweep = (Bm.sweep ?? 0) * (Bm.duration ?? 0.8), a0 = heading - (sweep * RAD) / 2;
      telegraph(S, { ...base, fire: live, until: live + (Bm.duration ?? 0.8), shape: { type: "segment", x, z, x2: x + Math.cos(a0) * len, z2: z + Math.sin(a0) * len, width: Bm.width ?? 1, heading: a0 }, follows: { creature: source } });
      return;
    }
    case "landing": {
      const tx = at ? at.x : x + Math.cos(heading) * range, tz = at ? at.z : z + Math.sin(heading) * range, fl = spec.body?.flight ?? 1.2;
      telegraph(S, { ...base, shape: { type: "disc", x: tx, z: tz, r: spec.body?.radius ?? 2 }, until: fire + fl, fire: fire + fl }); return;
    }
    case "ring": case "cone": {
      const A = A0, cx = centre.x, cz = centre.z, waves = Math.max(1, A.waves ?? 1), last = fire + (waves - 1) * (A.gap ?? 0.5);
      const shape: Telegraph["shape"] = kind === "cone" ? { type: "cone", x: cx, z: cz, r: A.r ?? spec.zone?.r ?? 5, angle: A.angle ?? 60, heading }
        : A.shape === "safeCircle" ? { type: "ring", x: cx, z: cz, r: A.r ?? 12, inner: A.inner ?? (A.r ?? 12) * 0.6 }
        : { type: (A.shape ?? "disc") === "disc" ? "disc" : "ring", x: cx, z: cz, r: A.r ?? spec.zone?.r ?? 5, inner: A.inner, width: A.width };
      telegraph(S, { ...base, shape, until: last, ...(cx === x && cz === z ? { follows: { creature: source } } : {}) });
      return;
    }
    case "lane": default: {
      if (isPlaced(B)) { const px = at ? at.x : x, pz = at ? at.z : z; telegraph(S, { ...base, kind: "landing", shape: { type: "disc", x: px, z: pz, r: spec.body?.kind === "mine" ? spec.body?.trigger ?? 2 : spec.body?.radius ?? 1 }, until: fire }); return; } // (where it will be laid; its arming shows once it's down)
      if (!isBody(B)) { telegraph(S, { ...base, shape: { type: "point", x, z }, until: fire }); return; }
      // (one lane a heading the pattern releases at once, up to 16; a curving or swaying body's lane is the path it will fly, unaimed)
      // (relayed: its first leg toward its nearest packmate)
      const mate = spec.pack?.relay ? W.packmates?.(source, x, z, range)[0] : undefined, h0 = mate ? Math.atan2(mate.z - z, mate.x - x) : heading;
      const dirs = patternOf(spec, h0).slice(0, 16), bent = (spec.path ?? []).some(t => "curve" in t || "wave" in t || "spiral" in t || "orbit" in t || "boomerang" in t);
      for (const d of dirs) {
        if (bent) telegraph(S, { ...base, shape: { type: "path", x: x + d.dx, z: z + d.dz, width, points: predictPath(spec, x + d.dx, z + d.dz, d.heading, source, W) }, until: fire + d.delay });
        else telegraph(S, { ...base, shape: { type: "segment", x: x + d.dx, z: z + d.dz, x2: x + d.dx + Math.cos(d.heading) * range, z2: z + d.dz + Math.sin(d.heading) * range, width }, until: fire + d.delay });
      }
    }
  }
}

/** The path a body would fly from (x, z) on `heading`, unhomed and unhindered: [x0, z0, x1, z1, ...] every 0.1 s, at most 40. */
export function predictPath(spec: AttackSpec, x: number, z: number, heading: number, source: number, W: SpellWorld): number[] {
  const b = makeBody(spec, "", x, z, heading, null, "", "", source, 0, 0, 0, 0);
  const out = [x, z], life = lifeTime(spec, b.v);
  for (let t = 0.1; t <= Math.min(life, 4) + 1e-9; t += 0.1) { moveBody(b, spec, t, 0.1, W, true); out.push(round2(b.x), round2(b.z)); if (b.travelled >= lifeRange(spec)) break; }
  return out;
}
const round2 = (x: number) => Math.round(x * 100) / 100;

// ---- releasing ----

const lifeRange = (a: AttackSpec) => a.life?.range ?? (a.cast?.range ?? 20) * 1.3;
const lifeTime = (a: AttackSpec, v: number) => a.life?.time ?? Math.min(12, lifeRange(a) / Math.max(1, v) + 0.5);

/** A body's speed `t` s after it set off (its profile). */
export function speedAt(a: AttackSpec, t: number): number {
  const P = a.speed ?? {}, v = P.v ?? (P.profile === "slow" || a.body?.kind === "lure" ? 6 : 28), to = P.to ?? 0, T = Math.max(0.001, P.time ?? 1);
  switch (P.profile) {
    case "accel": case "decel": return v + (to - v) * Math.min(1, t / T);
    case "stopGo": { const go = P.go ?? 0.6, pause = P.pause ?? 0.4, legs = P.n ?? 3, k = Math.floor(t / (go + pause)); return k >= legs ? 0 : t - k * (go + pause) < go ? v : 0; }
    default: return v;
  }
}

function makeBody(a: AttackSpec, name: string, x: number, z: number, heading: number, target: Hittable | null, side: string, species: string, source: number, damage: number, depth: number, castId: number, time: number): Body {
  const kind = (a.body?.kind ?? "bolt") as Body["kind"];
  return { id: 0, alive: true, attack: a, name, kind, x, z, y: 0, hx: Math.cos(heading), hz: Math.sin(heading), v: speedAt(a, 0), sx: x, sz: z, ox: x, oz: z, born: time, source, side, species, travelled: 0, damage, radius: a.body?.radius ?? 0.6, depth, cast: castId, target, locked: false, pierced: 0, bounced: 0, hits: [], lob: null, stuck: null, leg: 0, paused: false, armAt: time + (a.body?.arm ?? 0), armed: false, until: time + (a.life?.time ?? 15), chain: a.pack?.chain?.n ?? 0, relay: [], holdUntil: 0, amp: 1, ampBy: [], element: a.body?.element ?? "", look: a.body?.look ?? "" };
}

/** A pending release: its pattern's bodies, or its area struck, or its zone laid. */
function release(S: SpellState, W: SpellWorld, lib: Library, p: Pending, time: number): void {
  const a = p.attack, B = a.body?.kind ?? "bolt";
  let x = p.x, z = p.z;
  if (p.fromBody !== undefined) { const b = S.bodies.find(q => q.alive && q.id === p.fromBody) ?? S.bodies.find(q => q.id === p.fromBody); if (b) { x = b.x; z = b.z; } }
  if (p.depth === 0 && !p.placed) {
    S.tells.delete(p.source);
    if (W.stillCasting && !W.stillCasting(p.source, p.cast)) { cancel(S, p.cast); return; } // (interrupted: nothing released)
    const c = W.where("creature", p.source); if (c) { x = c.x; z = c.z; }
  }
  // (a turret: a child that casts again, `casts` times, a cooldown apart)
  if (!p.placed && p.patternIndex === undefined && p.depth > 0) {
    const left = p.left ?? (a.cast?.casts ?? 1) - 1;
    if (left > 0) {
      const next = p.at + (a.cast?.cooldown ?? 1);
      showTelegraphs(S, W, a, p.name, x, z, p.heading, p.aim, p.side, p.source, p.cast, time, next); // (each of its casts warned of in turn)
      queue(S, { ...p, at: next, left: left - 1, x, z, fromBody: undefined });
    }
  }
  S.events.push({ kind: p.depth === 0 ? "release" : "emit", at: time, x, z, attack: p.name, source: p.source, element: a.body?.element });
  if (p.patternIndex !== undefined || !(a.emit && (a.emit.pattern === "burst" || a.emit.pattern === "spray" || a.emit.pattern === "volley"))) {
    // (re-aimed as it goes, for a burst's later shots and a stop-and-go's legs; the first as aimed at the cast)
    const heading = p.patternIndex ? aimHeading(a.emit?.aim ?? "target", x, z, p.heading, p.aim, W, a, p.cast, p.patternIndex) : p.heading;
    const dirs = p.patternIndex !== undefined ? [{ heading: a.emit?.pattern === "spray" ? p.heading : heading, dx: 0, dz: 0, delay: 0 }] : patternOf(a, heading);
    for (const d of dirs) emitOne(S, W, lib, a, p, x + d.dx, z + d.dz, d.heading, time, B);
    return;
  }
  // (a burst, a spray or a volley: the first now, the rest scheduled, each its own heading)
  const beat = a.emit?.pattern === "volley" ? (W.beat ?? 0.5) : 1;
  patternOf(a, p.heading).forEach((d, k) => {
    const at = p.at + d.delay * beat; // (from when it was due, not the step that found it due)
    if (k === 0) emitOne(S, W, lib, a, p, x, z, d.heading, time, B);
    else queue(S, { ...p, at, heading: d.heading, patternIndex: k, fromBody: undefined, x, z });
  });
}

function emitOne(S: SpellState, W: SpellWorld, lib: Library, a: AttackSpec, p: Pending, x: number, z: number, heading: number, time: number, B: string): void { // eslint-disable-line max-params
  if (p.depth > 0) {
    const made = (S.made.get(p.cast) ?? 0) + 1;
    if (made > CAPS.children) { S.capped++; return; }
    S.made.set(p.cast, made);
  }
  if (B === "melee") return; // (the fight's own lunge lands it: rules/combat.ts)
  if (B === "beam" || a.pack?.tether) { emitBeam(S, W, a, p, x, z, heading, time); return; }
  if (a.pack?.triangulate && !p.points) {
    // (its corners where it and its two nearest packmates stand at the release; the ground between them erupts after its delay; none
    // shown at the cast (no packmates then), nothing comes of it: never a harm unwarned)
    const pts = corners(W, a, p.source, x, z), shown = S.telegraphs.find(t => t.alive && t.cast === p.cast && t.attack === p.name && t.shape.type === "polygon");
    if (!pts || !shown) { S.events.push({ kind: "fizzle", at: time, x, z, attack: p.name, source: p.source }); return; }
    const spec: AttackSpec = { ...a, body: { ...a.body, kind: B === "zone" ? "zone" : "area" } };
    shown.shape.points = pts; shown.shape.x = (pts[0] + pts[2] + pts[4]) / 3; shown.shape.z = (pts[1] + pts[3] + pts[5]) / 3; // (where they stand now)
    queue(S, { ...p, attack: spec, at: p.at + a.pack.triangulate.delay, placed: true, points: pts, patternIndex: undefined, left: 0, fromBody: undefined });
    return;
  }
  if (isBody(B) && !p.points) {
    const i = slot(S.bodies, CAPS.bodies);
    if (i < 0) { S.capped++; S.events.push({ kind: "capped", at: time, x, z, attack: p.name, source: p.source }); return; }
    // (a mine or a seed is laid where it's aimed: at her (as she stood when it was cast), else its pattern's place)
    if (isPlaced(B) && p.depth === 0 && p.aimAt) { x = p.aimAt.x + (x - p.x); z = p.aimAt.z + (z - p.z); }
    const b = makeBody(a, p.name, x, z, heading, p.aim, p.side, p.species, p.source, p.damage, p.depth, p.cast, time);
    b.id = S.next++;
    if (isPlaced(B)) telegraph(S, { kind: a.telegraph?.kind ?? "arming", attack: p.name, side: p.side, source: p.source, cast: p.cast, start: time, fire: b.armAt, until: B === "seed" ? b.armAt : b.until, shape: { type: "disc", x, z, r: B === "mine" ? a.body?.trigger ?? 2 : a.area?.r ?? a.zone?.r ?? b.radius }, follows: { body: b.id } });
    if (B === "lob") {
      const at = p.aim && W.where(p.aim.kind, p.aim.id), range = lifeRange(a), fl = a.body?.flight ?? 1.2;
      const tx = at && p.depth === 0 ? at.x : x + Math.cos(heading) * range * 0.75, tz = at && p.depth === 0 ? at.z : z + Math.sin(heading) * range * 0.75;
      b.lob = { fx: x, fz: z, tx, tz, at: time, lands: time + fl };
    }
    S.bodies[i] = b; S.stats.bodies[p.depth]++;
    if ((a.path ?? []).some(t => "home" in t) && p.aim) b.target = p.aim;
    // (relayed: by way of its nearest packmates in turn, each the nearest to the last, before it goes for its target)
    if (a.pack?.relay && W.packmates) {
      let fx = x, fz = z;
      for (let k = 0; k < a.pack.relay.n; k++) {
        const m = W.packmates(p.source, fx, fz, lifeRange(a)).find(q => !b.relay.includes(q.id));
        if (!m) break;
        b.relay.push(m.id); fx = m.x; fz = m.z;
      }
      if (b.relay.length) steer(b, W, b.relay[0]);
    }
    for (const t of a.on?.timer ?? []) child(S, W, lib, b, t, time + t.at, "timer");
    return;
  }
  // (an area strikes once, at once; a zone lingers; at the caster, the target (where it stood as it was cast) or the spot as it says)
  const A = a.area ?? {}, onTarget = !p.placed && (A.at ?? (p.depth === 0 ? "caster" : "spot")) === "target";
  const at = onTarget ? (p.aimAt ?? (p.aim ? W.where(p.aim.kind, p.aim.id) : null)) : null;
  const zx = at ? at.x : x, zz = at ? at.z : z;
  if (!p.placed) {
    const placed = (dx: number, dz: number, when: number, spec: AttackSpec) => { const q: Pending = { ...p, attack: spec, x: dx, z: dz, at: when, placed: true, patternIndex: undefined, left: 0, fromBody: undefined }; if (when <= time + 1e-9) emitOne(S, W, lib, spec, q, dx, dz, heading, time, B); else queue(S, q); };
    const cell: AttackSpec = { ...a, area: { ...A, shape: "disc", n: undefined, spacing: undefined, delay: undefined, waves: undefined, rain: undefined, at: "spot" } };
    // (a pattern's cells in turn, `delay` apart, where they were telegraphed)
    if (A.shape === "cross" || A.shape === "line" || A.shape === "grid") { cellsOf(a, zx, zz, heading).forEach((c, k) => placed(c.x, c.z, p.at + k * (A.delay ?? 0.2), cell)); return; }
    // (rain: n drops over r, seeded, each landing shown `lead` before it falls, the first a lead after the release)
    if (A.rain) {
      const R = A.rain, lead = a.telegraph?.lead ?? 0.9, n = Math.max(1, R.n);
      for (let k = 0; k < n; k++) {
        const ang = rnd(W.seed, p.cast, 2000 + p.index * 64 + k) * Math.PI * 2, rr = Math.sqrt(rnd(W.seed, p.cast, 3000 + p.index * 64 + k)) * R.r;
        const dx = zx + Math.cos(ang) * rr, dz = zz + Math.sin(ang) * rr, when = time + lead + (n > 1 ? (k / (n - 1)) * R.time : 0);
        telegraph(S, { kind: "landing", attack: p.name, side: p.side, source: p.source, cast: p.cast, start: when - lead, fire: when, until: when, shape: { type: "disc", x: dx, z: dz, r: A.r ?? 2 } });
        placed(dx, dz, when, cell);
      }
      return;
    }
    // (waves: rings one after another, `gap` apart)
    if ((A.waves ?? 1) > 1) { for (let k = 0; k < (A.waves ?? 1); k++) placed(zx, zz, p.at + k * (A.gap ?? 0.5), { ...a, area: { ...A, waves: undefined, at: "spot" } }); return; }
  }
  const i = slot(S.zones, CAPS.zones);
  if (i < 0) { S.capped++; return; }
  const once = B === "area" && A.shape !== "safeCircle", Zr = a.zone ?? {}, safe = A.shape === "safeCircle", poly = p.points;
  const zone: Zone = {
    id: S.next++, alive: true, attack: a, name: p.name, shape: safe ? "safe" : (A.shape === "ring" || A.shape === "donut" || A.shape === "cone" ? A.shape : "disc"), x: zx, z: zz,
    r: A.r ?? Zr.r ?? (safe ? 12 : 4), inner: A.inner ?? (safe ? (A.r ?? 12) * 0.6 : A.shape === "ring" ? Math.max(0, (A.r ?? 4) - (A.width ?? 1.5)) : 0), to: A.to ?? 0, shrink: A.time ?? 4,
    width: A.width ?? 1.5, angle: A.angle ?? 60, heading,
    from: time, until: once ? time + (A.grow ? (A.r ?? 4) / A.grow : 0) : time + (Zr.time ?? (safe ? (A.time ?? 4) + 1 : 3)), tick: Zr.tick ?? 0.5, nextTick: time, grow: A.grow ?? 0,
    damage: p.damage * (a.hit?.damage ?? 1), effect: a.hit?.effect, side: p.side, source: p.source, species: p.species, depth: p.depth, cast: p.cast,
    once, hit: [], element: a.body?.element ?? "", look: a.body?.look ?? "",
  };
  if (zone.grow) { zone.r = 0.5; } // (an expanding ring starts small and grows to its radius)
  if (poly) {
    zone.shape = "polygon"; zone.points = poly; zone.grow = 0;
    zone.x = (poly[0] + poly[2] + poly[4]) / 3; zone.z = (poly[1] + poly[3] + poly[5]) / 3;
    zone.r = Math.max(Math.hypot(poly[0] - zone.x, poly[1] - zone.z), Math.hypot(poly[2] - zone.x, poly[3] - zone.z), Math.hypot(poly[4] - zone.x, poly[5] - zone.z));
  }
  S.zones[i] = zone; S.stats.zones[p.depth]++;
  S.events.push({ kind: "zone", at: time, x: zone.x, z: zone.z, attack: p.name, source: p.source, zone: zone.id, element: zone.element });
}

/** An event's child: made from where it happened (or its caster), aimed as it says, its windup shown as its own telegraph. */
function child(S: SpellState, W: SpellWorld, lib: Library, b: { x: number; z: number; hx: number; hz: number; side: string; species: string; source: number; damage: number; depth: number; cast: number; target: Hittable | null; id?: number }, c: Child & { at?: number }, at: number, why: "hit" | "expire" | "bounce" | "land" | "timer", hitAt?: { x: number; z: number }): void {
  if (b.depth + 1 > CAPS.depth) { S.capped++; return; }
  if ((S.made.get(b.cast) ?? 0) >= CAPS.children) { S.capped++; return; }
  const made = S.next++; // (its own index for the seed: the ids run the same every time)
  const a = childSpec(c, lib), name = typeof c.attack === "string" ? c.attack : `${why}`;
  const origin = c.from === "caster" ? W.where("creature", b.source) : c.from === "hit" && hitAt ? hitAt : null;
  const x = origin ? origin.x : b.x, z = origin ? origin.z : b.z, facing = Math.atan2(b.hz, b.hx);
  const heading = aimHeading(c.aim ?? a.emit?.aim ?? "spot", x, z, facing, b.target, W, a, b.cast, made);
  const windup = a.cast?.windup ?? 0, damage = b.damage * (c.damage ?? 1);
  const p: Pending = { at: at + windup, attack: a, name, x, z, heading, aim: b.target, side: b.side, species: b.species, source: b.source, damage, depth: b.depth + 1, cast: b.cast, index: made, ...(why === "timer" && b.id !== undefined ? { fromBody: b.id } : {}) };
  // (its own warning: a timer's shows as a countdown on its body from now; any other's from when it's made, through its windup)
  if (why === "timer") telegraph(S, { kind: a.telegraph?.kind ?? "countdown", attack: name, side: b.side, source: b.source, cast: b.cast, start: S.now, fire: at + windup, until: at + windup, shape: { type: "disc", x, z, r: a.area?.r ?? a.zone?.r ?? a.body?.radius ?? 2 }, ...(b.id !== undefined ? { follows: { body: b.id } } : {}) });
  else showTelegraphs(S, W, a, name, x, z, heading, b.target, b.side, b.source, b.cast, at, at + windup);
  if (windup <= 0 && why !== "timer") release(S, W, lib, p, at); else queue(S, p);
}

// ---- beams ----

/** A beam set going from (x, z) along `heading`: charging first if it charges, a sweep starting half its arc back. */
function emitBeam(S: SpellState, W: SpellWorld, a: AttackSpec, p: Pending, x: number, z: number, heading: number, time: number): void {
  const i = slot(S.beams, CAPS.beams);
  if (i < 0) { S.capped++; return; }
  // (a tether: to the packmate its telegraph was strung to, if it's still there)
  const T = a.pack?.tether, shown = T ? S.telegraphs.find(t => t.alive && t.cast === p.cast && t.attack === p.name && t.kind === "tetherLine" && t.follows?.end !== undefined) : undefined;
  const mate = shown ? W.where("creature", shown.follows!.end!) : null;
  if (T && !mate) { S.events.push({ kind: "fizzle", at: time, x, z, attack: p.name, source: p.source }); return; } // (no packmate near to string it to)
  const Bm = a.beam ?? {}, dur = T ? T.time : Bm.strike ? Math.min(Bm.duration ?? 0.15, 0.2) : Bm.duration ?? 0.8, tick = Bm.strike ? dur : Bm.tick ?? 0.2, ticks = Math.max(1, Math.round(dur / tick));
  const charge = Bm.charge ?? (T ? REACTION_FLOOR : 0), sweep = T ? 0 : (Bm.sweep ?? 0) * dur;
  if (mate) heading = Math.atan2(mate.z - z, mate.x - x);
  const b: Beam = {
    id: S.next++, alive: true, attack: a, name: p.name, x, z, angle: heading - (sweep * RAD) / 2, length: mate ? Math.hypot(mate.x - x, mate.z - z) : Bm.length ?? a.cast?.range ?? 20, width: T ? T.width : Bm.width ?? 1, ...(mate ? { to: shown!.follows!.end } : {}),
    from: time, liveAt: time + charge, until: time + charge + dur, tick, nextTick: time + charge, phase: charge > 0 ? "charging" : "live",
    damage: (p.damage * (a.hit?.damage ?? 1)) / ticks, side: p.side, source: p.source, species: p.species, depth: p.depth, cast: p.cast, target: p.aim, hits: [], telegraph: 0, tickAngle: heading - (sweep * RAD) / 2,
    element: a.body?.element ?? "", look: a.body?.look ?? "",
  };
  S.beams[i] = b; S.stats.beams[p.depth]++;
  S.events.push({ kind: "beam", at: time, x, z, attack: p.name, source: p.source, beam: b.id, element: b.element });
  void W;
}

function stepBeam(S: SpellState, W: SpellWorld, b: Beam, time: number, dt: number): void {
  const Bm = b.attack.beam ?? {};
  const c = b.depth === 0 || b.to !== undefined ? W.where("creature", b.source) : null;
  if ((b.depth === 0 || b.to !== undefined) && !c) { b.alive = false; return; } // (its caster gone: so is its beam)
  if (c) { b.x = c.x; b.z = c.z; }
  if (b.to !== undefined) {
    // (a tether: from its caster to its packmate as both move; either gone, it snaps)
    const m = W.where("creature", b.to);
    if (!m) { b.alive = false; S.events.push({ kind: "expire", at: time, x: b.x, z: b.z, attack: b.name, source: b.source, beam: b.id }); return; }
    b.angle = Math.atan2(m.z - b.z, m.x - b.x); b.length = Math.hypot(m.x - b.x, m.z - b.z);
  }
  if (time >= b.until) { b.alive = false; S.events.push({ kind: "expire", at: time, x: b.x, z: b.z, attack: b.name, source: b.source, beam: b.id }); return; }
  if (time >= b.liveAt) {
    if (Bm.spin) b.angle += Bm.spin * RAD * dt;
    else if (Bm.sweep) b.angle += Bm.sweep * RAD * dt;
    else if (Bm.track && b.target) {
      const at = W.where(b.target.kind, b.target.id);
      if (at) { let da = ((Math.atan2(at.z - b.z, at.x - b.x) - b.angle + Math.PI * 3) % (Math.PI * 2)) - Math.PI; const cap = Bm.track * RAD * dt; da = Math.max(-cap, Math.min(cap, da)); b.angle += da; }
    }
  }
  const P = Bm.pulse;
  b.phase = time < b.liveAt ? "charging" : P && (time - b.liveAt) % (P[0] + P[1]) >= P[0] ? "off" : "live";
  const ex = Math.cos(b.angle), ez = Math.sin(b.angle);
  // (its warning line lies along it as it turns)
  for (const t of S.telegraphs) if (t.alive && (t.kind === "beamLine" || t.kind === "tetherLine") && t.cast === b.cast && t.attack === b.name) { t.shape.x = b.x; t.shape.z = b.z; t.shape.x2 = b.x + ex * b.length; t.shape.z2 = b.z + ez * b.length; t.shape.heading = b.angle; }
  if (b.phase !== "live" || time < b.nextTick) { if (b.phase !== "live") b.tickAngle = b.angle; return; }
  b.nextTick += b.tick;
  // (along its line now, or anywhere in the wedge it turned through since its last tick)
  const from = b.tickAngle, swept = ((b.angle - from) % (Math.PI * 2) + Math.PI * 3) % (Math.PI * 2) - Math.PI;
  b.tickAngle = b.angle;
  for (const t of W.near(b.x + (ex * b.length) / 2, b.z + (ez * b.length) / 2, b.length / 2 + b.width + 2)) {
    const rx = t.x - b.x, rz = t.z - b.z, d = Math.hypot(rx, rz), along = rx * ex + rz * ez;
    let on = along >= 0 && along <= b.length && Math.abs(-rx * ez + rz * ex) <= b.width / 2 + t.r;
    if (!on && swept !== 0 && d <= b.length + t.r && d > 0.3) {
      const da = (((Math.atan2(rz, rx) - (swept > 0 ? from : b.angle)) % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2);
      on = da <= Math.abs(swept) + (b.width / 2 + t.r) / d;
    }
    if (on) strike(S, W, b.attack, t, b.damage, b.x, b.z, b.side, b.species, b.source, b.name, time, b.hits, { beam: b.id });
  }
}

// ---- stepping ----

/** Move a body one step: its speed by its profile, then each path term in turn; `dry` (predicting its path): no homing. */
function moveBody(b: Body, a: AttackSpec, age: number, dt: number, W: SpellWorld, dry = false): void {
  if (b.lob) return;
  const P = a.speed ?? {};
  b.v = speedAt(a, age);
  // (stop and go: at each pause's end, aimed afresh at its target)
  if (P.profile === "stopGo") { const leg = Math.floor(age / ((P.go ?? 0.6) + (P.pause ?? 0.4))); if (leg !== b.leg) { b.leg = leg; if (!dry && b.target) { const at = W.where(b.target.kind, b.target.id); if (at) { const d = Math.hypot(at.x - b.sx, at.z - b.sz) || 1; b.hx = (at.x - b.sx) / d; b.hz = (at.z - b.sz) / d; } } } }
  let turn = 0, sway = 0, orbit: { r: number; time: number } | null = null, spiral: { rate: number; grow: number } | null = null, back = false;
  for (const t of a.path ?? []) {
    if ("curve" in t) turn += t.curve * RAD * dt;
    else if ("wave" in t) sway += t.wave.amp * Math.sin(2 * Math.PI * t.wave.freq * age + (t.wave.phase ?? 0));
    else if ("home" in t && !dry && b.target && age >= (t.home.after ?? 0)) {
      const at = W.where(b.target.kind, b.target.id);
      if (at) {
        const dx = at.x - b.sx, dz = at.z - b.sz, d = Math.hypot(dx, dz);
        if (d > (t.home.giveUp ?? 3)) { b.locked = true; const want = Math.atan2(dz, dx), now = Math.atan2(b.hz, b.hx); let da = ((want - now + Math.PI * 3) % (Math.PI * 2)) - Math.PI; const cap = t.home.turn * RAD * dt; da = Math.max(-cap, Math.min(cap, da)); turn += da; }
      }
    } else if ("boomerang" in t && b.travelled >= t.boomerang.out) back = true;
    else if ("orbit" in t && age < t.orbit.time) orbit = t.orbit;
    else if ("spiral" in t) spiral = t.spiral;
  }
  if (back) { const c = W.where("creature", b.source); if (c) { const dx = c.x - b.sx, dz = c.z - b.sz, d = Math.hypot(dx, dz) || 1; b.hx = dx / d; b.hz = dz / d; } }
  if (turn) { const c = Math.cos(turn), s = Math.sin(turn), hx = b.hx * c - b.hz * s; b.hz = b.hx * s + b.hz * c; b.hx = hx; }
  const step = b.v * dt;
  if (orbit) {
    // (round its caster at its speed, then off along the tangent)
    const c = W.where("creature", b.source) ?? { x: b.ox, z: b.oz }, a0 = Math.atan2(b.oz - c.z, b.ox - c.x) || Math.atan2(b.hz, b.hx), th = a0 + (b.v / Math.max(0.5, orbit.r)) * age;
    b.sx = c.x + Math.cos(th) * orbit.r; b.sz = c.z + Math.sin(th) * orbit.r; b.hx = -Math.sin(th); b.hz = Math.cos(th);
  } else if (spiral) {
    const r = spiral.grow * age + 0.5, th = Math.atan2(b.hz, b.hx) + spiral.rate * RAD * age;
    b.sx = b.ox + Math.cos(th) * r; b.sz = b.oz + Math.sin(th) * r;
  } else { b.sx += b.hx * step; b.sz += b.hz * step; }
  b.travelled += step;
  b.x = b.sx - b.hz * sway; b.z = b.sz + b.hx * sway;
  for (const t of a.path ?? []) if ("arc" in t) { const k = Math.min(1, b.travelled / Math.max(1, lifeRange(a))); b.y = 4 * t.arc.height * k * (1 - k); }
}

/** Advance every attack in flight by dt to `time`: releases due, bodies moved and hitting, zones ticking, telegraphs over. */
export function stepSpells(S: SpellState, W: SpellWorld, lib: Library, time: number, dt: number): void {
  S.now = time;
  // (what's due, in the order it was queued: a release may queue more, for later)
  if (S.pending.length) {
    const due = S.pending.filter(p => p.at <= time + 1e-9);
    if (due.length) { S.pending = S.pending.filter(p => p.at > time + 1e-9); for (const p of due) release(S, W, lib, p, time); }
  }
  for (const b of S.bodies) if (b.alive) stepBody(S, W, lib, b, time, dt);
  for (const z of S.zones) if (z.alive) stepZone(S, W, z, time, dt);
  for (const b of S.beams) if (b.alive) stepBeam(S, W, b, time, dt);
  // (burns: a tick each half second on a creature till they've burnt out)
  for (const B of S.burns) if (B.alive) {
    if (time >= B.next && B.next <= B.until + 1e-9) { B.next += 0.5; W.harm(B.target, B.dps * 0.5, undefined, B.target.x, B.target.z, B.source, B.name); }
    if (B.next > B.until + 1e-9) B.alive = false;
  }
  for (const t of S.telegraphs) if (t.alive && time >= t.until) { t.alive = false; S.events.push({ kind: "fire", at: time, x: t.shape.x, z: t.shape.z, attack: t.attack, source: t.source, telegraph: t.id }); }
  for (const t of S.telegraphs) if (t.alive && t.follows) {
    const at = t.follows.body !== undefined ? S.bodies.find(b => b.id === t.follows!.body && b.alive) : t.follows.creature !== undefined ? W.where("creature", t.follows.creature) : null;
    const end = t.follows.end !== undefined ? W.where("creature", t.follows.end) : null;
    if (at) { const dx = at.x - t.shape.x, dz = at.z - t.shape.z; t.shape.x = at.x; t.shape.z = at.z; if (t.shape.x2 !== undefined && !end) { t.shape.x2 += dx; t.shape.z2! += dz; } }
    if (end) { t.shape.x2 = end.x; t.shape.z2 = end.z; }
  }
}

function end(S: SpellState, W: SpellWorld, lib: Library, b: Body, time: number, why: "expire" | "land"): void {
  b.alive = false;
  S.events.push({ kind: why, at: time, x: b.x, z: b.z, attack: b.name, source: b.source, body: b.id, element: b.element });
  const list = why === "land" ? (b.attack.on?.land ?? []) : (b.attack.on?.expire ?? []);
  if (list.length) S.events.push({ kind: "split", at: time, x: b.x, z: b.z, attack: b.name, source: b.source, body: b.id });
  for (const c of list) child(S, W, lib, b, c, time, why);
}

function stepBody(S: SpellState, W: SpellWorld, lib: Library, b: Body, time: number, dt: number): void {
  const a = b.attack, age = time - b.born, H = a.hit ?? {};
  if (b.stuck) {
    // (stuck fast: it rides on what it hit till its timers have gone off)
    const at = W.where(b.stuck.kind, b.stuck.id);
    if (at) { b.x = at.x + b.stuck.dx; b.z = at.z + b.stuck.dz; }
    if (age > lifeTime(a, b.v) + Math.max(0, ...(a.on?.timer ?? []).map(t => t.at))) { b.alive = false; }
    return;
  }
  if (b.lob) {
    const L = b.lob, k = Math.min(1, (time - L.at) / Math.max(0.01, L.lands - L.at));
    b.x = L.fx + (L.tx - L.fx) * k; b.z = L.fz + (L.tz - L.fz) * k; b.y = 4 * k * (1 - k) * Math.max(2, Math.hypot(L.tx - L.fx, L.tz - L.fz) * 0.25);
    if (time < L.lands) return;
    // (it lands: everything of the other side in its radius hit; a bounce sends it on, shorter, its way)
    for (const t of W.near(b.x, b.z, b.radius + 2)) if (Math.hypot(t.x - b.x, t.z - b.z) <= b.radius + t.r) strike(S, W, a, t, b.damage * (H.damage ?? 1), b.x, b.z, b.side, b.species, b.source, b.name, time, undefined, { body: b.id });
    const bounce = a.life?.bounce;
    if (bounce && b.bounced < Math.min(bounce.n, CAPS.bounces)) {
      b.bounced++;
      const keep = bounce.keep ?? 0.6, dx = (L.tx - L.fx) * keep, dz = (L.tz - L.fz) * keep, fl = (L.lands - L.at) * keep;
      b.lob = { fx: L.tx, fz: L.tz, tx: L.tx + dx, tz: L.tz + dz, at: time, lands: time + Math.max(0.15, fl) };
      S.events.push({ kind: "bounce", at: time, x: b.x, z: b.z, attack: b.name, source: b.source, body: b.id });
      for (const c of a.on?.bounce ?? []) child(S, W, lib, b, c, time, "bounce");
      return;
    }
    end(S, W, lib, b, time, "land");
    return;
  }
  if (b.kind === "mine" || b.kind === "seed") { stepPlaced(S, W, lib, b, time); return; }
  if (time < b.holdUntil) return; // (held at a packmate, or between a chain's hops)
  if (b.relay.length && !relayed(S, W, b, time)) return;
  moveBody(b, a, age, dt, W);
  if (a.pack?.amplify && b.amp < a.pack.amplify.max && W.packmates) amplify(S, W, b, time);
  // (a lure draws her in while she's within its reach; a body with a force field pushes whoever's round it)
  if (b.kind === "lure" && W.force) for (const t of W.near(b.x, b.z, a.body?.reach ?? 8)) if (t.kind === "witch" && W.hostile(b.side, t, b.species, b.source) && Math.hypot(t.x - b.x, t.z - b.z) <= (a.body?.reach ?? 8)) W.force(t, b.x, b.z, -(a.body?.pull ?? 4), dt);
  if (a.force) pushAround(W, a, b.x, b.z, b.radius * 4, b.side, b.species, b.source, dt);
  if (b.locked && !S.locks.has(b.id)) {
    S.locks.add(b.id);
    if (b.target) telegraph(S, { kind: "lockOn", attack: b.name, side: b.side, source: b.source, cast: b.cast, start: time, fire: time, until: time + lifeTime(a, b.v), shape: { type: "point", x: b.target.x, z: b.target.z }, follows: b.target.kind === "creature" ? { creature: b.target.id as number } : undefined });
  }
  // (a runner can't cross water; a wall turns a bouncing bolt back, slower)
  if (W.blocked?.(b.x, b.z)) {
    const bounce = a.life?.bounce;
    if (b.kind !== "runner" && bounce && b.bounced < Math.min(bounce.n, CAPS.bounces)) {
      b.bounced++; b.hx = -b.hx; b.hz = -b.hz; b.sx += b.hx * b.v * dt * 2; b.sz += b.hz * b.v * dt * 2;
      S.events.push({ kind: "bounce", at: time, x: b.x, z: b.z, attack: b.name, source: b.source, body: b.id });
      for (const c of a.on?.bounce ?? []) child(S, W, lib, b, c, time, "bounce");
    } else { end(S, W, lib, b, time, "expire"); return; }
  }
  if (b.y < 1.2) for (const t of W.near(b.x, b.z, b.radius + 2)) {
    if (b.hits.includes(t.id) || Math.hypot(t.x - b.x, t.z - b.z) > b.radius + t.r) continue;
    if (!strike(S, W, a, t, b.damage * (H.damage ?? 1), b.x - b.hx, b.z - b.hz, b.side, b.species, b.source, b.name, time, undefined, { body: b.id })) continue;
    b.hits.push(t.id);
    for (const c of a.on?.hit ?? []) child(S, W, lib, b, c, time, "hit", { x: t.x, z: t.z });
    if (b.chain > 0 && W.hostile(b.side, t, b.species, b.source) && chainOn(S, W, b, t, time)) return;
    if (a.life?.stick) { b.stuck = { kind: t.kind, id: t.id, dx: b.x - t.x, dz: b.z - t.z }; return; }
    if (b.pierced < Math.min(a.life?.pierce ?? 0, CAPS.pierces)) { b.pierced++; continue; }
    b.alive = false;
    return;
  }
  if (b.travelled >= lifeRange(a) || age >= lifeTime(a, b.v)) end(S, W, lib, b, time, "expire");
}

// ---- the pack ----

/** A triangulation's corners: the caster and its two nearest packmates within r, or null with fewer. */
function corners(W: SpellWorld, a: AttackSpec, source: number, x: number, z: number): number[] | null {
  const m = W.packmates?.(source, x, z, a.pack?.triangulate?.r ?? 15) ?? [];
  return m.length >= 2 ? [x, z, m[0].x, m[0].z, m[1].x, m[1].z] : null;
}

/** Aim a body at a creature (its heading and its spine's start: a fresh leg). */
function steer(b: Body, W: SpellWorld, id: number | null, target?: Hittable | null): void {
  const at = id !== null ? W.where("creature", id) : target ? W.where(target.kind, target.id) : null;
  if (!at) return;
  const d = Math.hypot(at.x - b.x, at.z - b.z) || 1;
  b.hx = (at.x - b.x) / d; b.hz = (at.z - b.z) / d; b.sx = b.x; b.sz = b.z;
}

/** On its way through its relay: steered at the next packmate each step; reaching it, held there `hop` s (its lane to the next shown
 *  that long), then on to the next or, the last done, its target. Whether it flies on this step. */
function relayed(S: SpellState, W: SpellWorld, b: Body, time: number): boolean {
  const id = b.relay[0], m = W.where("creature", id);
  if (!m) { b.relay.shift(); steer(b, W, b.relay[0] ?? null, b.target); return true; } // (that packmate gone: on to the next)
  if (Math.hypot(m.x - b.x, m.z - b.z) > Math.max(1.2, b.radius + 0.6)) { steer(b, W, id); return true; }
  b.relay.shift();
  const hop = b.attack.pack?.relay?.hop ?? REACTION_FLOOR;
  b.x = m.x; b.z = m.z; b.holdUntil = time + hop; b.travelled = 0;
  b.born = time + hop; // (its life and its speed profile from when it sets off again)
  steer(b, W, b.relay[0] ?? null, b.target);
  const next = b.relay.length ? W.where("creature", b.relay[0]) : b.target ? W.where(b.target.kind, b.target.id) : null;
  S.events.push({ kind: "relay", at: time, x: b.x, z: b.z, attack: b.name, source: b.source, body: b.id, element: b.element });
  const x2 = next ? next.x : b.x + b.hx * lifeRange(b.attack), z2 = next ? next.z : b.z + b.hz * lifeRange(b.attack);
  telegraph(S, { kind: "lane", attack: b.name, side: b.side, source: b.source, cast: b.cast, start: time, fire: b.holdUntil, until: b.holdUntil, shape: { type: "segment", x: b.x, z: b.z, x2, z2, width: 2 * b.radius } });
  return false;
}

/** Passing its packmates: each new one within r grows it by `per` (its radius and damage), to `max` times. */
function amplify(S: SpellState, W: SpellWorld, b: Body, time: number): void {
  const A = b.attack.pack!.amplify!;
  for (const m of W.packmates!(b.source, b.x, b.z, A.r)) {
    if (b.ampBy.includes(m.id) || b.amp >= A.max) continue;
    const to = Math.min(A.max, b.amp + A.per), k = to / b.amp;
    b.ampBy.push(m.id); b.amp = to; b.radius *= k; b.damage *= k;
    S.events.push({ kind: "amplify", at: time, x: b.x, z: b.z, attack: b.name, source: b.source, body: b.id, element: b.element });
  }
}

/** A chain's hop from what it hit to the next foe within range (not hit already): held there `hop` s with the jump shown (chainNext),
 *  then flying at it. Whether it hopped (none near: it ends as it would have). */
function chainOn(S: SpellState, W: SpellWorld, b: Body, from: Hittable, time: number): boolean {
  const C = b.attack.pack!.chain!;
  let next: Hittable | null = null, best = Infinity;
  for (const t of W.near(from.x, from.z, C.range)) {
    const d = Math.hypot(t.x - from.x, t.z - from.z);
    if (d > C.range || d >= best || b.hits.includes(t.id) || t.kind === "sound" || !W.hostile(b.side, t, b.species, b.source)) continue;
    next = { ...t }; best = d;
  }
  if (!next) return false;
  const hop = C.hop ?? REACTION_FLOOR;
  b.chain--; b.target = next; b.x = from.x; b.z = from.z; b.travelled = 0; b.holdUntil = time + hop; b.born = time + hop; b.pierced = 0;
  steer(b, W, null, next);
  S.events.push({ kind: "chain", at: time, x: from.x, z: from.z, attack: b.name, source: b.source, body: b.id, element: b.element });
  telegraph(S, { kind: "chainNext", attack: b.name, side: b.side, source: b.source, cast: b.cast, start: time, fire: b.holdUntil, until: b.holdUntil, shape: { type: "segment", x: from.x, z: from.z, x2: next.x, z2: next.z, width: 2 * b.radius }, ...(next.kind === "creature" ? { follows: { end: next.id as number } } : {}) });
  return true;
}

/** A mine (armed, set off by a foe in its trigger: its blast and its on-hit children) or a seed (sprouting into its on-land children). */
function stepPlaced(S: SpellState, W: SpellWorld, lib: Library, b: Body, time: number): void {
  const a = b.attack;
  if (b.kind === "seed") { if (time >= b.armAt) { S.events.push({ kind: "sprout", at: time, x: b.x, z: b.z, attack: b.name, source: b.source, body: b.id }); end(S, W, lib, b, time, "land"); } return; }
  if (!b.armed && time >= b.armAt) { b.armed = true; S.events.push({ kind: "armed", at: time, x: b.x, z: b.z, attack: b.name, source: b.source, body: b.id }); }
  if (time >= b.until) { end(S, W, lib, b, time, "expire"); return; }
  if (!b.armed) return;
  const trig = a.body?.trigger ?? 2;
  const near = W.near(b.x, b.z, trig + 1);
  if (!near.some(t => W.hostile(b.side, t, b.species, b.source) && Math.hypot(t.x - b.x, t.z - b.z) <= trig + t.r)) return;
  // (set off: everything in its blast, then whatever it sows)
  const R = a.area?.r ?? Math.max(trig, 3);
  b.alive = false;
  S.events.push({ kind: "sprung", at: time, x: b.x, z: b.z, attack: b.name, source: b.source, body: b.id, element: b.element });
  for (const t of W.near(b.x, b.z, R + 1)) if (Math.hypot(t.x - b.x, t.z - b.z) <= R + t.r) strike(S, W, a, t, b.damage * (a.hit?.damage ?? 1), b.x, b.z, b.side, b.species, b.source, b.name, time, undefined, { body: b.id });
  for (const c of a.on?.hit ?? []) child(S, W, lib, b, c, time, "hit");
}

/** The safe circle's radius now (it shrinks from `inner` to `to` over `shrink` s). */
const safeR = (z: Zone, time: number) => z.inner + (z.to - z.inner) * Math.min(1, (time - z.from) / Math.max(0.01, z.shrink));

function inZone(z: Zone, x: number, zz: number, r: number, time = 0): boolean {
  const dx = x - z.x, dz = zz - z.z, d = Math.hypot(dx, dz);
  if (d > z.r + r) return false;
  if (z.shape === "safe") return d > safeR(z, time) - r; // (all of it but the safe circle)
  if (z.shape === "polygon") return inPolygon(z.points!, x, zz, r);
  if ((z.shape === "ring" || z.shape === "donut") && d < z.inner - r) return false;
  if (z.shape === "cone") { let da = Math.atan2(dz, dx) - z.heading; da = ((da + Math.PI * 3) % (Math.PI * 2)) - Math.PI; if (Math.abs(da) > (z.angle * RAD) / 2 + r / Math.max(0.5, d)) return false; }
  return true;
}

/** Inside a polygon ([x0, z0, x1, z1, ...]), or within r of its edge. */
function inPolygon(P: number[], x: number, z: number, r: number): boolean {
  let inside = false, near = Infinity;
  for (let i = 0, j = P.length - 2; i < P.length; j = i, i += 2) {
    const xi = P[i], zi = P[i + 1], xj = P[j], zj = P[j + 1];
    if ((zi > z) !== (zj > z) && x < ((xj - xi) * (z - zi)) / (zj - zi) + xi) inside = !inside;
    const ex = xj - xi, ez = zj - zi, k = Math.max(0, Math.min(1, ((x - xi) * ex + (z - zi) * ez) / (ex * ex + ez * ez || 1)));
    near = Math.min(near, Math.hypot(x - xi - ex * k, z - zi - ez * k));
  }
  return inside || near <= r;
}

function stepZone(S: SpellState, W: SpellWorld, z: Zone, time: number, dt: number): void {
  if (z.grow) { z.r = Math.min(z.attack.area?.r ?? 4, z.r + z.grow * dt); if (z.shape === "ring") z.inner = Math.max(0, z.r - z.width); }
  if (z.attack.force) pushAround(W, z.attack, z.x, z.z, z.r, z.side, z.species, z.source, dt);
  if (z.once) {
    // (an area strikes everything in it once; an expanding ring whatever its edge passes over, once each)
    for (const t of W.near(z.x, z.z, z.r + 2)) if (!z.hit.includes(t.id) && inZone(z, t.x, t.z, t.r, time)) { z.hit.push(t.id); strike(S, W, z.attack, t, z.damage, z.x, z.z, z.side, z.species, z.source, z.name, time, undefined, { zone: z.id }); }
    if (time >= z.until) z.alive = false;
    return;
  }
  if (time >= z.until) { z.alive = false; S.events.push({ kind: "expire", at: time, x: z.x, z: z.z, attack: z.name, source: z.source, zone: z.id }); return; }
  if (time < z.nextTick) return;
  z.nextTick += z.tick;
  // (a lingering zone: each tick, everything in it its share of the damage a tick and its effect; her damaged once, its effect each tick)
  const ticks = Math.max(1, Math.round((z.until - z.from) / z.tick));
  for (const t of W.near(z.x, z.z, z.r + 2)) if (inZone(z, t.x, t.z, t.r, time)) strike(S, W, z.attack, t, z.damage / ticks, z.x, z.z, z.side, z.species, z.source, z.name, time, z.hit, { zone: z.id });
}

