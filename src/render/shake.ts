// Screen shake when the witch is hit (Ed, 2026-10-05: "Screen should shake when the witch is hit.
// More shake when you are on lower health"). Trauma-style: each hit adds trauma (more the fewer
// hits she has left, most on the knockdown), trauma falls away at `decay` a second, and the shake
// is trauma² times the most offset and turn, driven by smooth noise rather than random jitter so
// it reads in pixel art. Runs on game time, so a pause holds it still. No Three.js: main.ts lays the
// result on the game canvas as a transform.

export interface ShakeTuning {
  /** Trauma (0-1) on her first hit. */
  base: number;
  /** More trauma for each hit she was already missing before this one. */
  perMissingHit: number;
  /** Trauma on the hit that knocks her down. */
  knockdown: number;
  /** Trauma lost a second. */
  decay: number;
  /** At full trauma: the most offset (screen pixels) and turn (degrees). */
  maxOffsetPx: number;
  maxRotDeg: number;
  /** How fast the noise wanders (a second). */
  speed: number;
}

/** Trauma a hit adds: `left` hits she has left after it, of `hits`. */
export function hitTrauma(left: number, hits: number, S: ShakeTuning): number {
  if (left <= 0) return S.knockdown;
  const missingBefore = Math.max(0, hits - left - 1);
  return Math.min(1, S.base + S.perMissingHit * missingBefore);
}

// Smooth 1D value noise in -1..1 (eased between seeded points), one channel per `ch`.
function lattice(i: number, ch: number): number {
  let h = Math.imul(i, 374761393) ^ Math.imul(ch + 1, 668265263);
  h = Math.imul(h ^ (h >>> 13), 1274126177);
  return ((h ^ (h >>> 16)) >>> 0) / 4294967295 * 2 - 1;
}
export function noise1(x: number, ch: number): number {
  const i = Math.floor(x), f = x - i, s = f * f * (3 - 2 * f);
  return lattice(i, ch) + (lattice(i + 1, ch) - lattice(i, ch)) * s;
}

export interface ShakeOffset { x: number; y: number; rot: number; amount: number }

export class Shake {
  trauma = 0;
  private at = 0;
  private hurtAt = -Infinity;
  private down = false;

  constructor(public S: ShakeTuning, public on = true) {}

  /** Add trauma now (game time `time`). */
  add(trauma: number, time: number): void {
    this.decayTo(time);
    this.trauma = Math.min(1, this.trauma + trauma);
  }

  /** Watch the witch's health each frame: a new hit (or the knockdown) adds its trauma. */
  watch(health: { hp: number; hurtAt: number }, knockedOut: boolean, hits: number, time: number): void {
    if (health.hurtAt > this.hurtAt && Number.isFinite(health.hurtAt)) { this.add(hitTrauma(health.hp, hits, this.S), time); this.hurtAt = health.hurtAt; }
    if (knockedOut && !this.down && health.hp > 0) this.add(this.S.knockdown, time); // (knocked out by other means)
    this.down = knockedOut;
  }

  private decayTo(time: number): void {
    if (time > this.at) this.trauma = Math.max(0, this.trauma - this.S.decay * (time - this.at));
    this.at = Math.max(this.at, time);
  }

  /** The offset now: screen pixels, whole ones (snapped to `snap`), and a turn in degrees. */
  offset(time: number, snap = 1): ShakeOffset {
    this.decayTo(time);
    const k = this.on ? this.trauma * this.trauma : 0;
    if (k <= 0) return { x: 0, y: 0, rot: 0, amount: 0 };
    const t = time * this.S.speed, q = (v: number) => Math.round(v / snap) * snap;
    return {
      x: q(this.S.maxOffsetPx * k * noise1(t, 0)),
      y: q(this.S.maxOffsetPx * k * noise1(t, 1)),
      rot: this.S.maxRotDeg * k * noise1(t, 2),
      amount: k,
    };
  }
}
