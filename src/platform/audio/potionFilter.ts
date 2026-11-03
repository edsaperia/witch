import type { Game } from '../../rules/game';
import { effectEnvelope, potionRecipe } from '../../rules/potionRecipes';
import { potionSettings } from '../../rules/potionSettings';
import { hueSpinPhase } from '../../rules/potionCycle';
import { forestCountStep } from '../../rules/forestCounts';
import { borrowedClock, landscapeState } from '../../rules/landscapePotions';

/** A fallback for existing/future trips; bespoke vision audio owns its own treatment. */
export function potionFilterState(g: Game) {
  const trip = g.mushrooms?.trips[g.witches[0]?.id ?? 0], recipe = trip && potionRecipe(trip.key);
  const p = potionSettings('trip-audio');
  const amount = recipe && !['night-vision', 'heat-vision'].includes(recipe.effect)
    ? effectEnvelope(trip, g.clock.time) * p.mix : 0;
  if (amount > 0) {
    // Shape the existing mix for each perception. Each uses the normal dry/wet trip envelope.
    switch (recipe?.effect) {
      case 'masterplan': return { amount, high: 260, low: 4300, gain: .93 };
      case 'woodcut': return { amount, high: 520, low: 2500, gain: .95 };
      case 'mirrorball': return { amount, high: 90, low: 3400 * 2 ** Math.sin(g.clock.time * potionSettings('mirrorball').spin * 6), gain: 1 };
      case 'kaleidoscope': return { amount, high: 120, low: 1600 * 2 ** (1 + Math.cos(g.clock.time * 1.5)), gain: 1 };
      case 'silent-film': return { amount, high: 480, low: 2400, gain: .88 };
      case 'folded-space': {
        const phase = (.8 * g.witch.x + .6 * g.witch.z) / potionSettings('folded-space').period;
        return { amount, high: 80, low: 2200 + 1600 * Math.cos(phase * 2 * Math.PI), gain: 1 };
      }
      case 'contour-dream': {
        const step = Math.floor(g.witch.lift * 4);
        return { amount, high: 120, low: 1700 * 2 ** (step * .45), gain: 1 };
      }
    }
  }
  const small = recipe?.effect === 'miniature';
  const landscape = amount > 0 && landscapeState(g);
  if (landscape) {
    const { effect, phase, setting, cutoff, sweep } = landscape;
    let signal = Math.sin(phase * p.speed * 2 * Math.PI);
    if (effect === 'held-breath') signal = 1 - 2 * phase;
    if (effect === 'walking-wood') signal = Math.sin(phase * 1.3);
    if (effect === 'out-of-time') signal = Math.sin(borrowedClock(phase, landscape.amount, setting) * .75);
    if (effect === 'underwater-light') signal = Math.sin(phase * .65);
    return { amount, high: 40, low: cutoff * 2 ** (sweep * signal), gain: 1 };
  }
  if (recipe?.effect === 'the-forest-counts' && amount > 0) {
    const index = forestCountStep(g).index, depth = potionSettings('the-forest-counts').soundDepth;
    const steps = [-1, 1, -.5, .5];
    return { amount, high: 40, low: p.cutoff * Math.pow(2, depth * steps[((index % 4) + 4) % 4]), gain: 1 };
  }
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
