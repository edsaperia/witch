// The Fight Arena (Ed, 2026-10-27: "we can press a button to randomise the settings and another generates a random enemy pack to
// fight, and then I can tweak and save/copy attack settings that are fun"): ?fight=<seed>, her alone against a wild pack in the
// home clearing (rules/arena.ts, wild only), its panel in ui/fightArena.ts. Here, the seeded roll of a pack: the same seed, the
// same pack, so a fun roll comes back from its link. No drawing here.
import { CREATURE_IDS } from "./creatureConfig";
import { LEGEND, type Level } from "./creatures";
import { attackOf } from "./combat/data";
import { rng } from "./random";
import type { ArenaGroup } from "./arena";
import type { Game } from "./game";
import type { AttackSpec, BodyKind } from "./attacks";

/** The kinds a pack may be made of: those with an attack at every level a roll gives (young, adult and legend). */
export const FIGHTERS: readonly string[] = CREATURE_IDS.filter(s => ([1, 2, LEGEND] as Level[]).every(l => attackOf(s, l)));

/** A pack's groups as the arena's spec ("wolf*4@2,raven*2@1"). */
export const packSpec = (groups: readonly ArenaGroup[]): string => groups.map(g => `${g.species}*${g.count}@${g.level}`).join(",");

/** The pack seed `seed` rolls: now and then a lone legend (one in eight); else one kind (or, one time in three, two), 2 to 6 of
 *  each, young or adult, at most 8 in all. */
export function rollPack(seed: number, kinds: readonly string[] = FIGHTERS): ArenaGroup[] {
  const r = rng(seed), pick = () => kinds[Math.floor(r() * kinds.length)];
  if (!kinds.length) return [];
  if (r() < 1 / 8) return [{ species: pick(), count: 1, level: LEGEND as Level }];
  const first = pick(), n = r() < 1 / 3 ? 2 : 1, out: ArenaGroup[] = [];
  let left = 8;
  for (let i = 0; i < n; i++) {
    let species = i === 0 ? first : pick();
    for (let k = 0; k < 8 && out.some(g => g.species === species); k++) species = pick(); // (two kinds, not one twice)
    if (out.some(g => g.species === species)) break;
    const count = Math.min(left - (n - 1 - i) * 2, 2 + Math.floor(r() * 5));
    out.push({ species, count, level: (1 + Math.floor(r() * 2)) as Level });
    left -= count;
  }
  return out;
}

/** The seed after `seed` (the next roll's). */
export const nextSeed = (seed: number): number => (Math.imul(seed ^ 0x9e3779b9, 2654435761) >>> 0) % 1_000_000;

/** A telegraph on show (the Fight Arena's timings): who, where, when it began and when it lands. Today's are the windups (a fighting
 *  creature's `fight.windupUntil`); the composable attacks' own (`combat.telegraphs`, docs/plans/attack-grammar.md) join as they come. */
export interface Tell { key: string; species: string; x: number; z: number; start: number; fire: number }

/** The reaction floor the composer keeps to (docs/plans/attack-grammar.md, proposed 0.45 s): a telegraph shorter shows red. */
export const REACTION_FLOOR = 0.45;

/** Watches the arena's telegraphs: those live now, and the shortest lead (fire minus start) seen since it was made or reset. */
export class TellWatch {
  private seen = new Map<string, { fire: number; start: number }>();
  shortest = Infinity;
  shortestOf = "";
  count = 0;

  reset(): void { this.seen.clear(); this.shortest = Infinity; this.shortestOf = ""; this.count = 0; }

  /** This frame's live telegraphs (a windup began at its event's step, else when first seen). */
  update(g: Pick<Game, "clock" | "creatures" | "arena"> & { combat?: unknown }): Tell[] {
    const t = g.clock.time, out: Tell[] = [];
    const add = (key: string, species: string, x: number, z: number, fire: number, start?: number) => {
      let s = this.seen.get(key);
      if (!s || s.fire !== fire) {
        s = { fire, start: start ?? t };
        this.seen.set(key, s); this.count++;
        const lead = fire - s.start;
        if (lead < this.shortest) { this.shortest = lead; this.shortestOf = species; }
      }
      out.push({ key, species, x, z, start: s.start, fire });
    };
    // (when each began: its windup event this frame, at the step it happened; a frame can hold several steps)
    const began = new Map<number, number>();
    for (const e of (g.combat as { events?: { kind: string; at: number; id?: number }[] } | undefined)?.events ?? []) if (e.kind === "windup" && e.id !== undefined) began.set(e.id, e.at);
    for (const id of g.arena?.ids ?? []) {
      const c = g.creatures[id];
      if (!c || c.gone || !c.fight?.windupUntil || c.fight.windupUntil <= t) continue;
      add(`w${id}`, c.species, c.x, c.z, c.fight.windupUntil, began.get(id));
    }
    // (the composable attacks' telegraphs, when they're there: { id, start, fire, shape: a point { x, z } or a segment { a, b } })
    const tg = (g.combat as { telegraphs?: { id: number; start: number; fire: number; shape?: { x?: number; z?: number; a?: { x: number; z: number } } }[] } | undefined)?.telegraphs;
    for (const k of tg ?? []) {
      if (!(k.fire > t)) continue;
      const p = k.shape?.a ?? k.shape;
      if (typeof p?.x === "number" && typeof p?.z === "number") add(`t${k.id}`, "telegraph", p.x, p.z, k.fire, k.start);
    }
    for (const [key, s] of this.seen) if (s.fire < t - 5) this.seen.delete(key);
    return out;
  }
}

/** A random attack in the composable grammar (rules/attacks; the Fight Arena's 🎲 Randomise attack), seeded: a body and what fits it
 *  (a pattern, a path of up to two terms, a speed, a beam's or an area's shape, a trap's arming), now and then an effect on hit, and,
 *  one time in three while `depth` allows, a child attack on its hit, expiry or landing (rolled the same way, smaller). Its numbers
 *  kept to sensible ranges; its fairness (the reaction floor) is parseAttack's, which lengthens any warning under it and says so.
 *  The arena's own till the grammar's composer (docs/plans/attack-grammar.md, randomAttack) lands. */
export function rollAttack(seed: number, depth = 0): AttackSpec {
  const r = rng((seed ^ 0x51ed27) + depth * 7919), pick = <T>(a: readonly T[]): T => a[Math.floor(r() * a.length)];
  const span = (lo: number, hi: number, dp = 2) => Math.round((lo + r() * (hi - lo)) * 10 ** dp) / 10 ** dp;
  const int = (lo: number, hi: number) => lo + Math.floor(r() * (hi - lo + 1));
  const kind: BodyKind = depth ? pick(["bolt", "bolt", "area", "zone", "mine"] as const) : pick(["bolt", "bolt", "bolt", "lob", "lob", "runner", "beam", "area", "mine", "lure", "melee"] as const);
  const a: AttackSpec = { cast: { windup: span(0.35, 1.2), cooldown: span(1.5, 4.5, 1) }, body: { kind } };
  if (!depth && r() < 0.5) a.cast!.tell = { pose: pick(["rear", "crouch", "coil", "spread", "glow", "stamp"] as const) };
  const travels = kind === "bolt" || kind === "runner" || kind === "lure";
  if (travels || kind === "lob" || kind === "mine") {
    const pattern = pick(kind === "mine" ? ["single", "ring", "fan"] as const : ["single", "single", "burst", "fan", "ring", "spray", "wall"] as const);
    if (pattern !== "single") {
      a.emit = { pattern, n: int(3, pattern === "ring" ? 10 : 6) };
      if (pattern === "fan") a.emit.angle = int(20, 100);
      if (pattern === "burst") a.emit.gap = span(0.08, 0.3);
      if (pattern === "spray") { a.emit.rate = int(90, 360); a.emit.time = span(0.6, 1.6); }
      if (pattern === "wall") { a.emit.spacing = span(1.5, 3, 1); a.emit.holes = [int(0, a.emit.n! - 1)]; }
    }
    if (r() < 0.4) (a.emit ??= {}).aim = pick(["target", "lead", "dodge", "ahead"] as const);
  }
  if (travels) {
    a.cast!.range = int(14, 30);
    a.body!.radius = span(0.4, 1.2, 1);
    const profile = pick(["constant", "constant", "slow", "accel", "decel", "stopGo"] as const), v = profile === "slow" ? span(3, 7, 1) : span(10, 30, 0);
    a.speed = { profile, v, ...(profile === "accel" ? { to: v + int(8, 20), time: span(0.5, 1.5) } : profile === "decel" ? { to: span(0, v / 2, 0), time: span(0.5, 1.5) } : profile === "stopGo" ? { go: span(0.3, 0.8), pause: span(0.2, 0.6), n: int(2, 4) } : {}) };
    const terms: NonNullable<AttackSpec["path"]> = kind === "runner" ? [{ runner: true }] : [];
    for (let i = int(0, 2); i > 0; i--) terms.push(pick([
      () => ({ curve: int(-90, 90) }), () => ({ wave: { amp: span(0.5, 3, 1), freq: span(0.3, 1.5, 1) } }), () => ({ home: { turn: int(30, 120), giveUp: 3 } }),
      () => ({ spiral: { rate: int(90, 360), grow: span(1, 4, 1) } }), () => ({ boomerang: { out: int(8, 20) } }),
    ])());
    if (terms.length) a.path = terms;
    a.life = { range: int(15, 35), ...(r() < 0.2 ? { pierce: int(1, 3) } : {}), ...(r() < 0.2 ? { bounce: { n: int(1, 3), keep: span(0.5, 0.9) } } : {}) };
    if (kind === "lure") Object.assign(a.body!, { pull: span(2, 6, 1), reach: int(6, 12) });
  } else if (kind === "lob") {
    a.cast!.range = int(16, 30);
    a.body!.flight = span(0.6, 1.6);
    a.path = [{ arc: { height: span(3, 8, 1) } }];
  } else if (kind === "beam") {
    const turn = pick(["sweep", "track", "spin"] as const);
    a.cast!.range = int(14, 26);
    a.beam = { length: int(12, 28), width: span(0.6, 2, 1), duration: span(0.6, 2), tick: 0.2, charge: span(0.2, 0.8), [turn]: turn === "spin" ? int(60, 180) : int(20, 90) };
  } else if (kind === "area" || kind === "zone") {
    const shape = pick(["disc", "ring", "donut", "cone", "cross", "line"] as const), rr = span(4, 11, 1);
    if (kind === "zone") a.zone = { r: span(2, 5, 1), time: span(1.5, 4, 1), tick: 0.5 };
    else a.area = { shape, r: rr, at: depth ? "spot" : pick(["caster", "target"] as const), ...(shape === "donut" ? { inner: span(1.5, rr / 2, 1) } : {}), ...(shape === "cone" ? { angle: int(40, 120) } : {}), ...(shape === "ring" ? { width: span(1, 2.5, 1) } : {}), ...(r() < 0.3 ? { waves: int(2, 3), gap: span(0.3, 0.7) } : {}) };
  } else if (kind === "mine") {
    Object.assign(a.body!, { arm: span(0.4, 1.4), trigger: span(1.5, 3, 1) });
  } else {
    a.cast!.range = span(2, 3, 1);
    a.body!.lunge = int(4, 14);
  }
  a.hit = { damage: span(0.6, 1.2), ...(r() < 0.4 ? { effect: pick([
    () => ({ slow: { mult: span(0.4, 0.7), time: span(1, 3, 1) } }), () => ({ stun: span(0.3, 0.8) }), () => ({ knockback: int(6, 16) }),
    () => ({ pull: span(2, 6, 1) }), () => ({ root: span(0.4, 1.2) }), () => ({ burn: { dps: span(0.2, 0.6), time: span(1, 3, 1) } }),
  ])() } : {}) };
  if (depth < 2 && kind !== "beam" && kind !== "melee" && r() < (depth ? 0.2 : 0.35)) {
    const ev = kind === "lob" ? "land" : pick(["hit", "expire"] as const);
    a.on = { [ev]: [{ attack: rollAttack(seed * 31 + 17, depth + 1), from: "self", damage: span(0.3, 0.7) }] };
  }
  return a;
}
