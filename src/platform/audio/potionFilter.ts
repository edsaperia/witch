import type { Game } from '../../rules/game';
import { effectEnvelope, potionRecipe } from '../../rules/potionRecipes';
import { potionSettings } from '../../rules/potionSettings';
import { forestCountStep } from '../../rules/forestCounts';

/** A fallback for existing/future trips; bespoke vision audio owns its own treatment. */
export function potionFilterState(g: Game) {
  const trip = g.mushrooms?.trips[g.witches[0]?.id ?? 0], recipe = trip && potionRecipe(trip.key);
  const p = potionSettings('trip-audio');
  const amount = recipe && !['night-vision', 'heat-vision'].includes(recipe.effect)
    ? effectEnvelope(trip, g.clock.time) * p.mix : 0;
  const small = recipe?.effect === 'miniature';
  if (recipe?.effect === 'the-forest-counts' && amount > 0) {
    const index = forestCountStep(g).index, depth = potionSettings('the-forest-counts').soundDepth;
    const steps = [-1, 1, -.5, .5];
    return { amount, high: 40, low: p.cutoff * Math.pow(2, depth * steps[((index % 4) + 4) % 4]), gain: 1 };
  }
  return { amount, high: small ? 700 : 40,
    low: small ? 8500 : p.cutoff * Math.pow(2, p.motion * Math.sin(g.clock.time * p.speed * Math.PI * 2)),
    gain: 1 - amount * p.flutter * (.5 + .5 * Math.sin(g.clock.time * p.speed * Math.PI * 4)) };
}

/** Both existing buses feed a dry/filtered crossfade. No new sources, timers or generated sounds. */
export class PotionFilter {
  readonly input: GainNode;
  private dry: GainNode;
  private wet: GainNode;
  private high: BiquadFilterNode;
  private low: BiquadFilterNode;
  constructor(readonly context: AudioContext) {
    this.input = context.createGain(); this.dry = context.createGain(); this.wet = context.createGain();
    this.high = context.createBiquadFilter(); this.high.type = 'highpass'; this.high.Q.value = .5;
    this.low = context.createBiquadFilter(); this.low.type = 'lowpass'; this.low.Q.value = .5;
    this.wet.gain.value = 0;
    this.input.connect(this.dry); this.dry.connect(context.destination);
    this.input.connect(this.high); this.high.connect(this.low); this.low.connect(this.wet); this.wet.connect(context.destination);
  }
  update(g: Game): void {
    const s = potionFilterState(g), at = this.context.currentTime;
    this.high.frequency.setTargetAtTime(s.high, at, .08);
    this.low.frequency.setTargetAtTime(Math.min(this.context.sampleRate * .45, Math.max(100, s.low)), at, .08);
    this.dry.gain.setTargetAtTime(1 - s.amount, at, .08);
    this.wet.gain.setTargetAtTime(s.amount * s.gain, at, .08);
  }
}
