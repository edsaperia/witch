// What the portrait is doing, and its parameters at a time (no DOM, no clock of its own: the caller passes the time in seconds):
// an expression (expressions.ts) eased in over a moment, a pose looping (poses.ts), a gesture played once over it, her hat lost
// or on, blinks now and then, and her mouth flapping through the visemes of what she's saying as it types on.

import { EXPRESSIONS, viseme } from "./expressions";
import { GESTURES, POSES, sample } from "./poses";
import { NEUTRAL, type Params } from "./rig";

/** How long an expression takes to ease in (s). */
const EASE = 0.14;
/** A blink: how long it's shut (s), and the gap between blinks (s, from..to). */
const BLINK = 0.13, BLINK_GAP = [2.2, 5] as const;

export interface Talk { text: string; at: number; cps: number }

export class PortraitState {
  expression = "neutral";
  pose = "idle";
  gesture: { name: string; at: number } | null = null;
  lostHat = false;
  talk: Talk | null = null;
  private exprAt = -1e9;
  private from: Params = { ...NEUTRAL };
  private poseAt = 0;
  private blinkAt = 1.5;
  private lastVis: Params["mouth"] | null = null;
  private seed = 1;
  private last: Params = { ...NEUTRAL };

  setExpression(name: string, t: number): void {
    if (!EXPRESSIONS[name]) return;
    this.from = this.last; this.expression = name; this.exprAt = t;
    const g = EXPRESSIONS[name].gesture; if (g) this.play(g, t);
  }
  setPose(name: string, t: number): void {
    if (!POSES[name]) return;
    this.pose = name; this.poseAt = t;
    if (name === "knockedDown" && !this.lostHat) this.play("hatLost", t);
  }
  play(name: string, t: number): void {
    const g = GESTURES[name]; if (!g) return;
    if (g.lostHat === false) this.lostHat = false;
    this.gesture = { name, at: t };
  }
  blink(t: number): void { this.blinkAt = t; }
  /** Say a line: it types on at cps letters a second, her mouth following it. */
  say(text: string, t: number, cps = 30): void { this.talk = { text, at: t, cps }; this.lastVis = null; }
  /** How much of the line has typed on (letters), and whether it's done. */
  typed(t: number): { n: number; done: boolean } {
    if (!this.talk) return { n: 0, done: true };
    const n = Math.min(this.talk.text.length, Math.floor((t - this.talk.at) * this.talk.cps));
    return { n, done: n >= this.talk.text.length };
  }

  /** Her parameters at time t. */
  params(t: number): Params {
    const e = EXPRESSIONS[this.expression] ?? EXPRESSIONS.neutral, target: Params = { ...NEUTRAL, ...e.face };
    // the expression eased in from where she was (numbers only; names switch halfway)
    const k = Math.min(1, (t - this.exprAt) / EASE), p: Params = { ...target };
    if (k < 1) for (const key of Object.keys(target) as (keyof Params)[]) {
      const a = this.from[key], b = target[key];
      if (typeof a === "number" && typeof b === "number") (p as unknown as Record<string, number>)[key] = a + (b - a) * k;
      else if (k < 0.5) (p as unknown as Record<string, unknown>)[key] = a;
    }
    Object.assign(p, sample(POSES[this.pose] ?? POSES.idle, t - this.poseAt));
    if (this.lostHat) { p.hatOn = 0; p.messy = Math.max(p.messy, 0.8); }
    if (this.gesture) {
      const g = GESTURES[this.gesture.name], gt = t - this.gesture.at;
      if (gt >= g.dur) { if (g.lostHat) { this.lostHat = true; p.hatOn = 0; p.messy = Math.max(p.messy, 0.8); } this.gesture = null; }
      else Object.assign(p, sample(g, gt));
    }
    // blinks (shut eyes stay shut)
    if (t >= this.blinkAt + BLINK) { this.seed = (this.seed * 16807) % 2147483647; this.blinkAt = t + BLINK_GAP[0] + (BLINK_GAP[1] - BLINK_GAP[0]) * (this.seed / 2147483647); }
    if (t >= this.blinkAt && (p.eyeShape === "normal" || p.eyeShape === "wide" || p.eyeShape === "sleepy")) p.eyeOpen *= Math.abs((t - this.blinkAt) / BLINK - 0.5) * 2 * 0.9;
    // talking: the mouth through the visemes as the line types on, closing between words
    if (this.talk) {
      const { n, done } = this.typed(t);
      if (done && t > this.talk.at + this.talk.text.length / this.talk.cps + 0.15) { /* finished: her own mouth */ }
      else if (!done) {
        const v = viseme(this.talk.text[n] ?? " ");
        if (v === "close") this.lastVis = null; else if (v) this.lastVis = v;
        p.mouth = this.lastVis ?? (["grin", "laugh", "gasp", "eww"].includes(p.mouth) ? p.mouth : "M");
      }
    }
    return (this.last = p);
  }
}
