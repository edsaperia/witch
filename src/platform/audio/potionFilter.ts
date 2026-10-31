import type { Game } from '../../rules/game';
import { effectEnvelope, potionRecipe } from '../../rules/potionRecipes';
import { potionSettings } from '../../rules/potionSettings';
import { hueSpinPhase } from '../../rules/potionCycle';

/** A fallback for existing/future trips; bespoke vision audio owns its own treatment. */
export function potionFilterState(g: Game) {
  const trip = g.mushrooms?.trips[g.witches[0]?.id ?? 0], recipe = trip && potionRecipe(trip.key);
  const p = potionSettings('trip-audio');
  const amount = recipe && !['night-vision', 'heat-vision'].includes(recipe.effect)
    ? effectEnvelope(trip, g.clock.time) * p.mix : 0;
  const small = recipe?.effect === 'miniature';
  const spin = recipe?.effect === 'hue-spin';
  const phase = spin ? hueSpinPhase(g) : g.clock.time * p.speed * Math.PI * 2;
  const depth = spin ? potionSettings('hue-spin').soundDepth : p.motion;
  return { amount, high: small ? 700 : 40,
    low: small ? 8500 : p.cutoff * Math.pow(2, depth * Math.sin(phase)),
    gain: 1 - amount * p.flutter * (.5 + .5 * Math.sin(phase * 2)) };
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
