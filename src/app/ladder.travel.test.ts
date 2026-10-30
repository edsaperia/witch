import { afterEach, expect, it } from 'vitest';
import { QualityLadder } from './ladder';
import { TUNING } from '../rules/tuning';
afterEach(() => { new QualityLadder('travel-test', new URLSearchParams('ladder=off')); });

function fixture(start = 0) {
  const ladder = new QualityLadder('travel-test', new URLSearchParams(`ladder=${start}`));
  ladder.choose('auto');
  const tuning = structuredClone(TUNING);
  let now = 0;
  return { ladder, frames(seconds: number, skip: boolean, gpu = 1000) { for (let i=0;i<seconds*100;i++) ladder.frame(now += 10, 16.7, skip, tuning, [gpu]); }, gap(seconds: number) { now += seconds*1000; ladder.frame(now, 0, true, tuning, [1000]); } };
}
it('ignores loading, a sail with no game frames, and the arrival flight, then grants settling time', () => {
  const f = fixture();
  f.frames(5,true); f.gap(60); f.frames(20,true);
  expect(f.ladder.state.rung).toBe(0);
  f.frames(2,false,1000);
  expect(f.ladder.state.rung).toBe(0);
  expect(f.ladder.state.mode).toBe('auto');
});
it('recovers quality after the trip while ordinary frames have room', () => {
  const f = fixture(6);
  f.frames(10,true); f.gap(30); f.frames(5,true);
  expect(f.ladder.state.rung).toBe(6);
  f.frames(30,false,4);
  expect(f.ladder.state.rung).toBeLessThan(6);
});
it('still reduces quality for sustained slow ordinary play after settling', () => {
  const f = fixture(); f.frames(5,true); f.frames(8,false,30);
  expect(f.ladder.state.rung).toBeGreaterThan(0);
});
