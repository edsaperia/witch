import type { Game } from './game';
import { beatAt, timeAt } from './beat';
import { potionSettings } from './potionSettings';

/** Samples the real musical clock. Only presentation consumes this held time. */
export function forestCountStep(g: Game): { index: number; time: number } {
  const p = potionSettings('the-forest-counts');
  const index = Math.floor(beatAt(g.beat, g.clock.time) / p.beats);
  const at = g.mushrooms?.trips[g.witches[0]?.id ?? 0]?.at ?? g.clock.time;
  const held = Math.max(at, timeAt(g.beat, index * p.beats));
  return { index, time: at + (held - at) * p.speed };
}

export function forestCountTime(g: Game, time: number, amount: number): number {
  if (amount <= 0) return time;
  return time + (forestCountStep(g).time - time) * Math.min(1, amount);
}
