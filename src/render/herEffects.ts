// The effects on her, read from the rules for the view and the sounds (Ed, 2026-11-13, after the attack legibility audit, #2069:
// "Mark + tint + sound": a mark on her, her sprite tinted and a sound for each effect, in the attacker's element's colour, for
// exactly as long as the effect lasts). Every effect the rules can put on her beyond a blow's hit and stagger:
//   - slowed (rules/game.ts slowUntil, slowMult: the snail's slime, trail and wall, a slowing zone, a flash; a root is a slow to
//     nearly nothing; and every stun a creature puts on her, which is a slow now, rules/game.ts stunWitch, witch.stunAsSlow: the
//     lynx's pounce, the ram's headbutt, the lion's roar, the sphinx's gaze): stars circling her head (Ed, 2026-11-13: "I think stun
//     and slow are very similar, and stun is less fun than slow, so how about stun is replaced with slow and we use circling
//     stars?"; not chains: "Chain effect for slow might be confusing because we already have chains"), and short drag marks behind
//     her steps;
//   - confused (confused: the stoat's dance, the bat's screech, a flashing cloud): a spiral over her head;
//   - thrown or pulled hard (knock: a charge's ram, a knockback, a pack's pull; effectMarks.thrown.minMetres or more): a dust skid
//     along the ground where she slides.
// Every blow's own stagger (knock.stunUntil: a quarter second, longer for a harder throw, when she can't move, blink or throw 💌s)
// has no mark of its own: her wobble and the dizzy twinkle as before (with ?stun=old a creature's stun is that stagger again, and
// shows the same way). Nothing in the rules burns or poisons her (a burn is a creature's only: rules/attacks/engine.ts), so neither
// is drawn.
// No drawing and no sound here: render/leash/combat.ts draws them, platform/audio/sfxCues.ts sounds them. ?effectmarks=0: none
// of it (her confusion's pale swirl as before), to compare.
import type { Game, Witch } from "../rules/game";
import { huntsWitch } from "../rules/creatureStates";
import { sideOf } from "../rules/combat/targeting";
import { PACKS } from "../rules/combat/packs";
import { SPECIES_ATTACKS } from "../rules/attacks/species";
import { ATTACK_LOOK, elementOf } from "../rules/attackLook";

/** ?effectmarks=0: no marks, tints or sounds for the effects on her, as before (to compare). */
export const EFFECT_MARKS = typeof location === "undefined" || new URLSearchParams(location.search).get("effectmarks") !== "0";

export type HerEffect = "slow" | "confuse" | "thrown";
export const HER_EFFECTS: readonly HerEffect[] = ["slow", "confuse", "thrown"];
/** One effect on her now: on, since when (her time), and the element of whoever did it. */
export interface EffectOn { on: boolean; since: number; el: string }

/** What in a kind's attacks (its grammar attack, its pack's special and move) names each effect. */
const CAN: Record<HerEffect, RegExp> = { slow: /slow|stun|root|slime|wall|trail/i, confuse: /confus|cloud|mirage|screech/i, thrown: /knockback|pull|charge|stampede/i };
const can = new Map<string, boolean>();
function capable(species: string, effect: HerEffect): boolean {
  const key = `${species}|${effect}`;
  let v = can.get(key);
  if (v === undefined) { const K = PACKS.kinds[species]; can.set(key, (v = CAN[effect].test(JSON.stringify([SPECIES_ATTACKS[species] ?? null, K ?? null, K ? PACKS.specials[K.special] ?? null : null])))); }
  return v;
}

/** Whose effect it is, as an element: the nearest one hunting her within `reach` metres whose attacks can do it, else the nearest
 *  hunting her at all, else null (the rules keep no record of who slowed, confused or threw her; the view only reads them). */
export function effectElement(g: Pick<Game, "creatures">, x: number, z: number, effect: HerEffect, reach = 45): string | null {
  let best: string | null = null, bd = Infinity;
  for (const c of g.creatures) {
    if (!c || c.gone || c.level < 1 || c.leashed || !huntsWitch(sideOf(c))) continue;
    const d = Math.hypot(c.x - x, c.z - z);
    if (d > reach) continue;
    const score = d + (capable(c.species, effect) ? 0 : reach); // (one that can do it wins over any nearer one that can't)
    if (score < bd) { bd = score; best = c.species; }
  }
  return best === null ? null : elementOf(best);
}

/** Her effects, followed from frame to frame (one for the view, one for the sounds): which are on, since when, in whose element,
 *  and how far a throw throws her. */
export class HerEffects {
  readonly slow: EffectOn = { on: false, since: 0, el: ATTACK_LOOK.default };
  readonly confuse: EffectOn = { on: false, since: 0, el: ATTACK_LOOK.default };
  readonly thrown: EffectOn = { on: false, since: 0, el: ATTACK_LOOK.default };
  /** the throw under way: its metres */
  metres = 0;
  private slowUntil = -Infinity; private confusedUntil = -Infinity; private knockAt = -Infinity; private hard = false;
  private game: unknown = null;

  /** ht: her time (rules/slowTime.ts: her knock and confusion run on it); the slow runs on the game's clock. */
  update(g: Game, W: Witch, ht: number, on = EFFECT_MARKS): void {
    if (this.game !== g) { this.game = g; this.slowUntil = this.confusedUntil = this.knockAt = -Infinity; this.hard = false; this.slow.on = this.confuse.on = this.thrown.on = false; }
    const M = g.tuning.effectMarks, live = on && !!M?.on && !W.ko, b = W.body;
    const set = (E: EffectOn, now: boolean, renewed: boolean, effect: HerEffect) => {
      if (now && (!E.on || renewed)) { const el = effectElement(g, b.x, b.z, effect); if (el) E.el = el; else if (!E.on) E.el = ATTACK_LOOK.default; }
      if (now && !E.on) E.since = ht;
      E.on = now;
    };
    const su = W.slowUntil ?? -Infinity, slowed = live && g.clock.time < su && (W.slowMult ?? 1) < 1;
    set(this.slow, slowed, su > this.slowUntil + 1e-6, "slow"); this.slowUntil = su;
    const cu = W.confused?.until ?? -Infinity, confused = live && ht < cu;
    set(this.confuse, confused, cu > this.confusedUntil + 1e-6, "confuse"); this.confusedUntil = cu;
    const K = W.knock, moving = !!K && (!!K.kx || !!K.kz), ease = Math.max(0.1, g.tuning.witch.knock.ease);
    if (K && Number.isFinite(K.at) && K.at !== this.knockAt) {
      // (a new throw: its whole distance, from what's left of it now; rules/knock.ts eases metres × ease m/s off at ease a second)
      this.knockAt = K.at;
      this.metres = Math.min(g.tuning.witch.knock.max, (Math.hypot(K.kx, K.kz) / ease) * Math.exp(Math.max(0, ht - K.at) * ease));
      this.hard = this.metres >= (M?.thrown.minMetres ?? Infinity);
      if (this.hard) this.thrown.on = false; // (so its element is chosen afresh, below)
    }
    set(this.thrown, live && moving && this.hard, false, "thrown");
  }
  /** The effect whose colour tints her: the newest one on (null: none). */
  tinting(): HerEffect | null {
    let best: HerEffect | null = null;
    for (const e of HER_EFFECTS) if (this[e].on && (best === null || this[e].since >= this[best].since)) best = e;
    return best;
  }
}
