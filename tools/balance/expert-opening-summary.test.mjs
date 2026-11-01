import test from 'node:test';
import assert from 'node:assert/strict';
import { openingSummary, linuxMemory } from './expert-opening-summary.mjs';
const animal = (level, placed = null) => ({ id: 1, species: 'fox', level, placed });
const event = (time, doing, carried, troops, sigil = false) => ({ playerTime: time, doing, controls: { sigil }, observation: { creatures: [], carried, campaign: { troops } } });
test('summary weights intervals and confirms growth/posts only from observations', () => {
  const s = openingSummary();
  s.consume(event(1, 'positioning an adult for an upcoming fight', [animal(1)], [animal(1)], true));
  s.consume(event(3, 'waiting', [], [animal(2, { x: 10, z: 0 })]));
  s.consume(event(4, 'positioning an adult for an upcoming fight', [], [animal(2, { x: 10, z: 0 })]));
  const r = s.finish(5);
  assert.equal(r.actionSeconds.waiting, 1);
  assert.equal(r.actionSeconds['positioning an adult for an upcoming fight'], 3);
  assert.equal(r.carriedAnimalSeconds['fox/1'], 2);
  assert.equal(r.observedGrowthLevelIncreases, 1);
  assert.equal(r.observedConfirmedPosts, 1);
  assert.equal(r.repeatedActionEpisodes['positioning an adult for an upcoming fight'], 2);
});
test('a placed animal without a posting press is not a posting success', () => {
  const s = openingSummary(); s.consume(event(1, 'waiting', [], [animal(2, { x: 0, z: 0 })]));
  assert.equal(s.finish(2).observedConfirmedPosts, 0);
});
test('Linux memory monitor requires measured RSS and high-water values', () => {
  assert.deepEqual(linuxMemory('VmRSS:    123 kB\nVmHWM: 456 kB\n'), { rss: 123 * 1024, peakRss: 456 * 1024 });
  assert.throws(() => linuxMemory('VmRSS: 1 kB\n'), /VmHWM/);
});
