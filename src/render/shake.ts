// Screen shake when the witch is hit (Ed, 2026-10-05: "Screen should shake when the witch is hit.
// More shake when you are on lower health"). Trauma-style: each hit adds trauma (more the fewer
// hits she has left, most on the knockdown), trauma falls away at `decay` a second, and the shake
// is trauma² times the most offset and turn, driven by smooth noise rather than random jitter so
// it reads in pixel art. Runs on her clock (g.herTime, rules/slowTime.ts), as her hits are, so a pause holds it still and a slowed
// world (a sleeping legend's circle, the treehouse deck: a tenth of its speed) doesn't stretch it: on the world's clock one hit there
// shook for 2.5 s (Ed's playtest, 2026-10-29: "screen shake ... doesn't switch off properly"). A bout of hits (each within
// SHAKE_QUIET of the shake falling still) shakes for maxSecs at most; a knockdown starts a bout of its own; a clock that runs
// backwards (a new night on the same page) starts it afresh. No Three.js: main.ts lays the result on the game canvas as a transform.

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
  /** The longest a bout of hits shakes (seconds from its first; a knockdown starts a new bout). */
  maxSecs?: number;
}

/** maxSecs when the tuning has none; the stillness (s) that ends a bout, so the next hit starts a new one; and the slowest decay taken
 *  (trauma 1 gone in 2 s at worst). */
export const SHAKE_MAX_SECS = 1.5, SHAKE_QUIET = 0.5, SHAKE_MIN_DECAY = 0.5;

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
  private at = -Infinity;
  private hurtAt = -Infinity;
  private down = false;
  /** When this bout of shaking began (the first hit since it was still, or the knockdown). */
  private boutAt = -Infinity;
  /** When it last fell still (its trauma gone, or cut off at the bout's maxSecs). */
  private stillAt = -Infinity;

  constructor(public S: ShakeTuning, public on = true) {}

  /** Still, and forgetting the hits seen (a new night: its clock starts again). */
  reset(): void { this.trauma = 0; this.at = -Infinity; this.hurtAt = -Infinity; this.down = false; this.boutAt = -Infinity; this.stillAt = -Infinity; }

  /** Add trauma now (her clock's `time`); `bout` starts a new bout (the knockdown). */
  add(trauma: number, time: number, bout = false): void {
    this.decayTo(time);
    // (a new bout after SHAKE_QUIET still; hits closer together are one bout, cut off at maxSecs from its first, and while they keep
    // coming after that they add nothing: decayTo)
    if (bout || (this.trauma <= 0 && time - this.stillAt >= SHAKE_QUIET)) this.boutAt = time;
    this.trauma = Math.min(1, this.trauma + trauma);
  }

  /** Watch the witch's health each frame (`time` her clock, as her health's): a new hit (or the knockdown) adds its trauma. */
  watch(health: { hp: number; hurtAt: number }, knockedOut: boolean, hits: number, time: number): void {
    this.rewound(time);
    if (health.hurtAt > this.hurtAt && Number.isFinite(health.hurtAt)) { this.add(hitTrauma(health.hp, hits, this.S), time, health.hp <= 0); this.hurtAt = health.hurtAt; }
    if (knockedOut && !this.down && health.hp > 0) this.add(this.S.knockdown, time, true); // (knocked out by other means)
    this.down = knockedOut;
  }

  /** Her clock gone backwards (a new night on the page, a game swapped under it): nothing carried over. */
  private rewound(time: number): void { if (time < this.at - 1e-6) this.reset(); }

  private decayTo(time: number): void {
    this.rewound(time);
    if (time > this.at && this.trauma > 0) {
      const r = Math.max(SHAKE_MIN_DECAY, this.S.decay), left = this.trauma - r * (time - this.at);
      if (left > 0) this.trauma = left;
      else { this.stillAt = this.at + this.trauma / r; this.trauma = 0; }
    }
    const capAt = this.boutAt + (this.S.maxSecs ?? SHAKE_MAX_SECS);
    if (this.trauma > 0 && time > capAt) { this.trauma = 0; this.stillAt = Math.max(capAt, this.at); }
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
