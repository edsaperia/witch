// Command charges in her sigil bar (?commands=1; docs/plans/combat-skill-and-commands.md, Charges). Ed, 2026-11-17: "I think we can
// do this with the existing berry charge meter, with blinking or something like that"; "dots in two rows". A commanding creature's
// berry dots are its charges (rules/commands/charges.ts): its level's max of them, lit as it holds them, in two rows of up to 8.
// Cooling down, the lit ones dim and the one it will spend next blinks (a quick cooldown, under BLINK_FROM seconds, only dims);
// ready again, they flash once. A youth whose bar is full pulses as a youth ready to grow does today: its next berry makes it an adult.
import type { Game } from "../../rules/game";
import type { Creature } from "../../rules/creatures";
import type { Tuning } from "../../rules/tuning";
import { chargesOf, commandNow } from "../../rules/commands/charges";

/** The shortest cooldown whose next dot blinks; shorter ones only dim. */
const BLINK_FROM = 1.5;
/** How long the ready flash lasts (s), and the blink's rate (Hz). */
const FLASH = 0.3, BLINK_HZ = 2;

export interface ChargeDots { n: number; lit: number; perRow: number; /** seconds of cooldown left, and its whole length */ cool: number; cooldown: number; /** seconds since it was ready again */ since: number }

/** Its charges' dots, or null when it shows its old dots (commands off, a kind with no command, a baby, a legend). */
export function chargeDots(g: Pick<Game, "berries" | "witches" | "clock">, c: Creature, t: Tuning): ChargeDots | null {
  const K = commandNow(c, t);
  if (!K || c.level < 1 || c.level > 2) return null;
  const W = g.witches.find(w => w.leash.stack.includes(c.id)), ready = W?.leash.cmd?.ready[c.id] ?? -Infinity, now = g.clock.time;
  return { n: K.max, lit: chargesOf(g.berries, c, t), perRow: Math.max(4, Math.min(8, Math.ceil(K.max / 2))), cool: Math.max(0, ready - now), cooldown: K.cooldown, since: now - ready };
}

/** Dot i's brightness multiplier (on the frame's clock `time`). */
export function chargeK(d: ChargeDots, i: number, time: number): number {
  if (i >= d.lit) return 1;
  if (d.cool > 0) {
    if (i === d.lit - 1 && d.cooldown >= BLINK_FROM) return Math.sin(time * Math.PI * 2 * BLINK_HZ) > 0 ? 0.9 : 0.12;
    return 0.45;
  }
  return d.since >= 0 && d.since < FLASH ? 1.7 : 1;
}
