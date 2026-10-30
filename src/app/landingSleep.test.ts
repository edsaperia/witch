import { expect, it } from 'vitest';
import { LandingSleep } from './landingSleep';

it('holds exactly its loading night and releases once only when its house is ready', () => {
  const hold = new LandingSleep<object>(), night = {}, another = {};
  expect(hold.holds(night)).toBe(false); // every normal/warm arrival bypasses it
  hold.begin(night);
  expect(hold.holds(night)).toBe(true); expect(hold.holds(another)).toBe(false);
  expect(hold.release(night, false)).toBe(false); expect(hold.holds(night)).toBe(true);
  expect(hold.release(another, true)).toBe(false);
  expect(hold.release(night, true)).toBe(true);
  expect(hold.release(night, true)).toBe(false); expect(hold.holds(night)).toBe(false);
});
