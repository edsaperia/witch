import { describe, expect, it, vi } from 'vitest';
import { SfxKit } from './sfxKit';
import { CreaturePitch, creaturePitchRate, maskBreath, PotionAudio } from './potionAudio';
import { TUNING } from '../../rules/tuning';
import { Sfx } from './sfx';

function context() {
  const param = () => ({ value: 1, cancelScheduledValues: vi.fn(), setValueAtTime(v: number) { this.value = v; }, setTargetAtTime(v: number) { this.value = v; }, exponentialRampToValueAtTime: vi.fn() });
  const node = () => ({ connect: vi.fn(), disconnect: vi.fn(), start: vi.fn(), stop: vi.fn(), gain: param(), delayTime: param(), frequency: param(), Q: param(), playbackRate: param(), pan: param(), threshold: param(), knee: param(), ratio: param(), attack: param(), release: param() });
  const c = { currentTime: 0, sampleRate: 100, destination: node(), createGain: vi.fn(node), createDelay: vi.fn(node), createDynamicsCompressor: node, createStereoPanner: node, createOscillator: vi.fn(node), createBiquadFilter: node, createConvolver: node, createBufferSource: vi.fn(node), createBuffer: (_channels: number, length: number) => ({ getChannelData: () => new Float32Array(length) }) };
  return c;
}
describe('potion sound routes', () => {
  it('routes creature audio through pitch while breathing/startup bypass it but share the master and limiter', () => {
    const ctx = context(), sfx = new Sfx(ctx as unknown as AudioContext, .4, TUNING.sfx);
    const internals = sfx as unknown as { k: SfxKit; creatures: SfxKit; creaturePitch: CreaturePitch; potionAudio: { kit: SfxKit } };
    expect(internals.creatures.out.connect).toHaveBeenCalledWith(internals.creaturePitch.input);
    expect(internals.potionAudio.kit.out.connect).not.toHaveBeenCalledWith(internals.creaturePitch.input);
    expect(internals.creatures.final).toBe(internals.k.final);
    expect(internals.potionAudio.kit.final).toBe(internals.k.final);
    internals.creatures.space();
    // The last reverb gain before its input gain is the wet return, connected to the creature route.
    expect(ctx.createGain.mock.results.at(-2)!.value.connect).toHaveBeenCalledWith(internals.creatures.out);
    sfx.dispose();
  });
  it('transposes the existing creature bus with two bounded taps, restores exact dry routing and releases sources', () => {
    const ctx = context(), pitch = new CreaturePitch(ctx as unknown as AudioContext, ctx.destination as unknown as AudioNode);
    const dry = ctx.createGain.mock.results[1].value, wet = ctx.createGain.mock.results[2].value;
    expect(dry.connect).toHaveBeenCalledWith(ctx.destination); expect(wet.connect).toHaveBeenCalledWith(ctx.destination);
    expect(wet.gain.value).toBe(0); expect(ctx.createBufferSource).not.toHaveBeenCalled();
    pitch.set(1);
    expect(dry.gain.value).toBe(0); expect(wet.gain.value).toBe(1);
    expect(ctx.createBufferSource).toHaveBeenCalledTimes(4); expect(ctx.createDelay).toHaveBeenCalledTimes(2);
    for (const source of ctx.createBufferSource.mock.results) expect(source.value.playbackRate.value).toBeCloseTo(.5 / .06);
    pitch.set(.5);
    for (const source of ctx.createBufferSource.mock.results) expect(source.value.playbackRate.value).toBeCloseTo(creaturePitchRate(.5));
    expect(ctx.createBufferSource).toHaveBeenCalledTimes(4);
    pitch.set(0); expect(dry.gain.value).toBe(1); expect(wet.gain.value).toBe(0);
    for (const source of ctx.createBufferSource.mock.results) { expect(source.value.stop).toHaveBeenCalledOnce(); expect(source.value.disconnect).toHaveBeenCalledOnce(); }
    pitch.set(1); expect(ctx.createBufferSource).toHaveBeenCalledTimes(8); pitch.dispose();
    for (const source of ctx.createBufferSource.mock.results) expect(source.value.stop).toHaveBeenCalledOnce();
  });
  it('keeps creature routes, their reverb and shared volume/budget intact when ordinary output is muted', () => {
    const ctx = context(), k = new SfxKit(ctx as unknown as AudioContext, .4, TUNING.sfx, 57), creature = k.creatureKit();
    expect(creature.budget).toBe(k.budget);
    expect(creature.out).not.toBe(k.out);
    expect(creature.final).toBe(k.final);
    expect(creature.space()).not.toBe(k.space());
    k.ordinaryGain(0); expect(k.out.gain.value).toBe(0); expect(creature.out.gain.value).toBe(1);
    k.setVolume(.2); expect(creature.volume).toBe(.2); expect(k.out.gain.value).toBe(0);
    k.ordinaryGain(.5); expect(k.out.gain.value).toBe(.5); expect(creature.out.gain.value).toBe(1);
    k.ordinaryGain(1); expect(k.out.gain.value).toBe(1);
  });
  it('keeps one bounded breathing source and releases it at stop, with an original rising startup tone', () => {
    const ctx = context(), k = new SfxKit(ctx as unknown as AudioContext, .4, TUNING.sfx, 57), effects = new PotionAudio(k);
    effects.breathing(.35, .18, 1); effects.breathing(.2, .18, 2);
    expect(ctx.createBufferSource).toHaveBeenCalledTimes(1);
    const source = ctx.createBufferSource.mock.results[0].value;
    effects.breathing(0, .18, 3); effects.dispose(); expect(source.stop).toHaveBeenCalledOnce(); expect(source.disconnect).toHaveBeenCalledOnce();
    effects.startup(); expect(ctx.createOscillator).toHaveBeenCalledOnce();
    expect(ctx.createOscillator.mock.results[0].value.frequency.exponentialRampToValueAtTime).toHaveBeenCalledWith(2100, .375);
    expect(maskBreath(0, .18)).toBe(0);
    for (let t = 0; t < 30; t += .05) expect(maskBreath(t, .18)).toBeGreaterThanOrEqual(0);
  });
});
