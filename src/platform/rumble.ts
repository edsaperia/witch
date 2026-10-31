// Short, event-driven feedback. Browser/device failures are intentionally silent; this never affects the rules.
import type { Game } from "../rules/game";
export interface RumbleSettings { rumble: boolean; reduceFlashing: boolean }
interface Actuator { playEffect(type: "dual-rumble", effect: { duration: number; startDelay: number; weakMagnitude: number; strongMagnitude: number }): Promise<unknown> }
export interface RumblePad { connected?: boolean; vibrationActuator?: Actuator | null; hapticActuators?: readonly Actuator[] }
interface Seen { hurt: number; ko: boolean; landed: number; wave: number; won: boolean; lost: boolean }
const seen = (g: Game): Seen => ({ hurt: g.witches[0].health.hurtAt, ko: !!g.witches[0].ko, landed: g.witches[0].landedAt ?? -Infinity, wave: g.party.wave, won: g.win?.phase === "won", lost: !!g.partyOver });
const pulse = (duration: number, strongMagnitude: number, weakMagnitude = strongMagnitude / 2) => ({ duration, startDelay: 0, strongMagnitude, weakMagnitude });

export class Rumble {
  private game: Game | null = null;
  private before: Seen | null = null;
  private at = -Infinity;
  update(g: Game, settings: RumbleSettings, pads: readonly (RumblePad | null)[], now = performance.now()): void {
    const next = seen(g), old = this.game === g ? this.before : null;
    this.game = g; this.before = next;
    if (!old || !settings.rumble || settings.reduceFlashing || g.clock.paused) return;
    let effect: ReturnType<typeof pulse> | null = null;
    if (next.landed > old.landed) effect = pulse(40, 0.12);
    if (next.wave > old.wave) effect = pulse(65, 0.2);
    if (next.hurt > old.hurt) effect = pulse(65, 0.25);
    if (next.ko && !old.ko) effect = pulse(100, 0.35);
    if ((next.won && !old.won) || (next.lost && !old.lost)) effect = pulse(160, 0.35, 0.25);
    if (!effect || now - this.at < 80) return;
    const pad = pads.find(p => p && p.connected !== false), actuator = pad?.vibrationActuator ?? pad?.hapticActuators?.[0];
    if (!actuator?.playEffect) return;
    this.at = now;
    try { void Promise.resolve(actuator.playEffect("dual-rumble", effect)).catch(() => {}); } catch { /* unsupported, disconnected or denied */ }
  }
}
