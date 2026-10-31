import type { Game } from './game';
import { potionSettings } from './potionSettings';

/** One game-clock phase for colour and sound; restarting a trip restarts its cycle. */
export function hueSpinPhase(g: Game): number {
  const trip = g.mushrooms?.trips[g.witches[0]?.id ?? 0];
  const p = potionSettings('hue-spin');
  return (p.offset / 360 + Math.max(0, g.clock.time - (trip?.at ?? g.clock.time)) / p.period) * Math.PI * 2;
}
