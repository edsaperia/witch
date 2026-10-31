import {afterEach,beforeEach,expect,it,vi} from 'vitest';
import {generateMap} from '../rules/map';
import {TUNING} from '../rules/tuning';
import {smallWorldTuning} from '../test/worlds';
import {groundProgramDefines} from '../render/groundRecipe';
const mocks=vi.hoisted(()=>({put:vi.fn()}));
beforeEach(()=>{vi.resetModules();vi.clearAllMocks();vi.doMock('./mapPrepStore',()=>({putPrep:mocks.put}));});
afterEach(()=>{vi.unstubAllGlobals();vi.doUnmock('./mapPrepStore');vi.resetModules();});
it('the actual map worker returns exactly the normal program recipe, without a map payload or cache write',async()=>{
  const tuning=smallWorldTuning(TUNING,'Descriptor equality needs actual deterministic map facts, not shipped world size.');
  const scope:any={postMessage:vi.fn()};vi.stubGlobal('self',scope);
  await import('./mapPrep.worker');
  await scope.onmessage({data:{key:'ground',seed:123,tuning,groundOnly:true}});
  expect(scope.postMessage).toHaveBeenCalledOnce();
  expect(scope.postMessage.mock.calls[0][0]).toEqual({ok:true,ground:groundProgramDefines(generateMap(123,tuning))});
  expect(mocks.put).not.toHaveBeenCalled();
});
