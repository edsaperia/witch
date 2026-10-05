// When the sound effects play (platform/sfx.ts): each frame, from what the rules did this frame
// (their events) and what changed since the last (a creature turning enraged or happy), heard from
// the first witch, fading to nothing `sfx.hear` metres off and panned by where it is on screen.
// The rules know nothing of it.
//  - 💌s (the invites, #89): its letters' events, read as they come (shot, hit, happy), and the
//    affection meter's fill; until #89 lands there are none, and the talk's invites still flourish.
//  - States: a creature turning enraged (a growl; a crowd turning at once, one heavier growl) or
//    happy (a pop): its area's guards, a friendly area's creatures, a legend at peace.
//  - Legends: the nearest sleeping one snores and dreams; restless (#87), a nightmare's unease
//    grows under it; a legend's attack winding up (combat's windup, or the slow long-range
//    attack's own event when it lands) telegraphs itself.
import type { Game } from "../rules/game";
import type { Creature } from "../rules/creatures";
import { restlessness } from "../rules/dream";
import { bossBreath } from "../render/leash";
import type { Sfx } from "./sfx";

/** The 💌 events as #89 has them (read loosely, so this builds before it lands). */
interface LetterEvent { kind: string; x: number; z: number; id?: number; spent?: boolean }
interface LetterState { events?: LetterEvent[]; meter?: Map<number, number> }

const happyNow = (c: Creature) => !c.leashed && !c.gone && (!!c.guard || !!c.friendly || (!!c.boss && c.legendState === "happy"));

export class SfxCues {
  private enraged = new Set<number>();
  private happy = new Set<number>();
  private primed = false;
  private flourished = new Map<number, number>();

  constructor(private sfx: Sfx) {}

  update(g: Game, time: number): void {
    const t = g.tuning.sfx, w = g.witch, hear = Math.max(1, t.hear);
    const near = (x: number, z: number) => Math.max(0, 1 - Math.hypot(x - w.x, z - w.z) / hear);
    const pan = (x: number) => (x - w.x) / 30;
    const S = this.sfx;

    // 💌 (#89): its own events
    const inv = (g.witches[0] as unknown as { invites?: LetterState }).invites;
    for (const e of inv?.events ?? []) {
      const k = near(e.x, e.z);
      if (k <= 0) continue;
      if (e.kind === "shot") S.letter(pan(e.x), Math.max(0.6, k));
      else if (e.kind === "hit") {
        S.hit(pan(e.x), k, !!e.spent);
        const m = e.id !== undefined ? inv?.meter?.get(e.id) : undefined;
        if (!e.spent && m !== undefined) S.fill(m, pan(e.x), k);
      } else if (e.kind === "happy" && e.id !== undefined) this.flourish(g, e.id, time, k, pan(e.x));
    }
    // invited by talking (and whatever else the leash reports)
    for (const e of g.leash.events) if (e.kind === "invited") this.flourish(g, e.id, time, Math.max(0.6, near(e.x, e.z)), pan(e.x));

    // states: who turned enraged or happy since the last frame (the first frame only takes note)
    let angry = 0, ax = 0, ak = 0;
    let glad: Creature | null = null, gk = 0;
    const nowEnraged = new Set<number>(), nowHappy = new Set<number>();
    for (const c of g.creatures) {
      if (c.enraged && !c.gone && !c.leashed) {
        nowEnraged.add(c.id);
        if (this.primed && !this.enraged.has(c.id)) { const k = near(c.x, c.z); if (k > 0) { angry++; if (k > ak) { ak = k; ax = c.x; } } }
      }
      if (happyNow(c)) {
        nowHappy.add(c.id);
        if (this.primed && !this.happy.has(c.id)) { const k = near(c.x, c.z); if (k > gk) { gk = k; glad = c; } }
      }
    }
    this.enraged = nowEnraged; this.happy = nowHappy;
    if (angry) S.enraged(pan(ax), ak, angry);
    if (glad) S.happy(pan(glad.x), gk);

    // legends: the nearest sleeping one's snore and dream, and a nightmare's unease
    let best: Creature | null = null, bd = Infinity;
    for (const c of g.creatures) if (c.boss && !c.leashed && c.legendState === "asleep") { const d = Math.hypot(c.x - w.x, c.z - w.z); if (d < bd) { bd = d; best = c; } }
    const sleep = best ? Math.max(0, 1 - bd / Math.max(1, t.snore.range)) : 0;
    const W = g.tuning.wildLegends;
    S.legends(sleep, best ? bossBreath(time, best.id, W.breathEvery * 1.5) : 0, best ? restlessness(best) * Math.min(1, sleep * 1.5) : 0, best ? pan(best.x) : 0);
    // a legend's attack winding up: combat's windup (or the long-range attack's event, #87)
    for (const e of g.combat.events) {
      const c = e.id !== undefined ? g.creatures[e.id] : undefined;
      if ((e.kind === "windup" && c?.boss) || (e.kind as string) === "legendWindup") { const k = Math.max(0, 1 - Math.hypot(e.x - w.x, e.z - w.z) / (2 * hear)); if (k > 0) S.windup(pan(e.x), Math.max(0.5, k)); } // (heard twice as far: a warning)
    }
    this.primed = true;
  }

  /** The invite flourish, once per creature however it's reported. */
  private flourish(g: Game, id: number, time: number, k: number, pan: number): void {
    if ((this.flourished.get(id) ?? -Infinity) > time - 2) return;
    this.flourished.set(id, time);
    this.sfx.invited(g.creatures[id]?.level ?? 0, pan, k);
  }
}
