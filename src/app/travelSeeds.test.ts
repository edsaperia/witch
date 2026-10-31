import {expect,it,vi} from 'vitest';
import {offerTravelSeed,offeredTravelSeed,rememberTravelSeed,resetTravelSeeds} from './travelSeeds';
it('ordinary chart visits do not acquire cross-visit seeds while precompile is off',()=>{
  resetTravelSeeds(''); rememberTravelSeed(0,'fox',42); expect(offeredTravelSeed(0,'fox')).toBeUndefined();
});
it('shares the exact offered seed with a chart and preserves an already selected chart seed',()=>{
  resetTravelSeeds('night1'); rememberTravelSeed(0,'fox',42); expect(offerTravelSeed(0,'fox')).toBe(42);
  const random=vi.spyOn(Math,'random').mockReturnValue(.123); expect(offerTravelSeed(0,'wolf')).toBe(123000); expect(offeredTravelSeed(0,'wolf')).toBe(123000);
  resetTravelSeeds('night2'); expect(offeredTravelSeed(0,'fox')).toBeUndefined(); random.mockRestore();
});
