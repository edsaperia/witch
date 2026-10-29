// A bag's 💌s on a toy scene (the bags station's previews, ui/bagPreview.ts; Ed, 2026-10-29: "The bag menu should also show little
// animations of each bag \"firing\""): the real rules' stepInvites with the bag's own stats (rules/bags.ts bagTuning), from her on the
// left at three creatures bobbing up and down on the right, so its rate, reach, spread and homing show as they play. No page, no
// randomness: the same bag always plays the same loop, and a test can read it.
import { newInvites, stepInvites, type Affection, type Invites } from "../rules/invites";
import { bagTuning } from "../rules/bags";
import { TUNING, type Tuning } from "../rules/tuning";
import type { Creature } from "../rules/creatures";

/** The scene, in metres: she stands at (0, 0); three creatures stand near, middling and far (`at`: x, then z), each bobbing BOB
 *  metres; she aims at each in turn for a third of the loop (at where it stands, not where its bob has it: homing does the rest,
 *  as for her), so a bag's reach shows in which it can land on, and its rate, spread and homing in how. */
export const SCENE = { at: [[16, -7], [26, 0], [38, 7]] as const, bob: 3, bobPeriod: 2.2, loop: 6, step: 1 / 60, wait: 0.3 };
/** The view's window onto it (metres): x from -3 to the farthest bag's reach and a bit, z half that height either side. */
export const VIEW = { x0: -3, x1: 48, halfZ: 14 };

/** A creature on the toy scene: where it is and when a letter last landed on it (for the flash). */
export interface Dummy { id: number; x: number; z: number; hitAt: number }

export class BagSim {
  readonly t: Tuning;
  inv: Invites = newInvites();
  dummies: Dummy[] = [];
  time = 0;
  private looped = 0;

  constructor(readonly bag: string, tuning: Tuning = TUNING) {
    this.t = bagTuning(tuning, bag);
    this.reset();
  }

  /** Back to the loop's start: nothing in flight, the creatures in place. */
  reset(): void {
    this.inv = newInvites(); this.time = 0; this.looped = 0;
    this.dummies = SCENE.at.map(([x, z], i) => ({ id: i, x, z, hitAt: -Infinity }));
  }

  /** Advance `dt` seconds (fixed steps), looping every SCENE.loop seconds. */
  step(dt: number): void {
    for (let left = dt; left > 1e-9; left -= SCENE.step) {
      const h = Math.min(SCENE.step, left);
      if (this.looped + h > SCENE.loop + 1e-9) this.reset(); // (the loop over: from its start, this step its first)
      this.time += h; this.looped += h;
      const ph = (this.time / SCENE.bobPeriod) * Math.PI * 2;
      this.dummies.forEach((d, i) => { d.z = SCENE.at[i][1] + Math.sin(ph + i * 2.1) * SCENE.bob; });
      const creatures = this.dummies.map(d => ({ id: d.id, x: d.x, z: d.z, species: "fox", level: 1 })) as unknown as Creature[];
      const A: Affection = { invitable: () => true, blocksLetters: () => false, hit: c => { this.dummies[c.id].hitAt = this.time; }, affection: () => 0 };
      this.inv.events = [];
      const [ax, az] = SCENE.at[Math.min(2, Math.floor((this.looped / SCENE.loop) * 3))];
      stepInvites(this.inv, { fire: this.looped % (SCENE.loop / 3) > SCENE.wait, aimX: ax, aimZ: az }, { x: 0, z: 0, facing: 1 }, true, creatures, A, this.time, h, this.t);
    }
  }
}
