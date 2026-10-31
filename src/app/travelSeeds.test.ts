import {afterEach,expect,it,vi} from 'vitest';
import {offerTravelSeed,offeredTravelSeed,rememberTravelSeed,registerTravelSeeds,resetTravelSeeds} from './travelSeeds';
afterEach(()=>{resetTravelSeeds('');vi.restoreAllMocks();});
it('ordinary chart visits do not acquire cross-visit seeds while precompile is off',()=>{
  resetTravelSeeds(''); rememberTravelSeed(0,'fox',42); expect(offeredTravelSeed(0,'fox')).toBeUndefined();
});
it('shares the exact offered seed with a chart and preserves an already selected chart seed',()=>{
  resetTravelSeeds('night1'); rememberTravelSeed(0,'fox',42); expect(offerTravelSeed(0,'fox')).toBe(42);
  const random=vi.spyOn(Math,'random').mockReturnValue(.123); expect(offerTravelSeed(0,'wolf')).toBe(123000); expect(offeredTravelSeed(0,'wolf')).toBe(123000);
  resetTravelSeeds('night2'); expect(offeredTravelSeed(0,'fox')).toBeUndefined(); random.mockRestore();
});
it('adopts a seed already selected before opt-in, and unregisters it when that chart closes',()=>{
  resetTravelSeeds(''); const release=registerTravelSeeds(()=>0,new Map([['fox',77]]));
  resetTravelSeeds('late-enable'); expect(offerTravelSeed(0,'fox')).toBe(77);
  release(); resetTravelSeeds('next-night'); const random=vi.spyOn(Math,'random').mockReturnValue(.456);
  expect(offerTravelSeed(0,'fox')).toBe(456000); random.mockRestore();
});
