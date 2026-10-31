import {afterEach,expect,it,vi} from 'vitest';
import {startGroundPrep} from './mapPrep';
afterEach(()=>vi.unstubAllGlobals());
it('returns descriptor data and terminates the existing worker without keeping a map record',async()=>{
  let worker: any;
  class Fake {onmessage: any; onerror: any; terminate=vi.fn(); postMessage=vi.fn(); constructor(){worker=this;} }
  vi.stubGlobal('Worker',Fake);
  const job=startGroundPrep('fox',0,42);
  expect(worker.postMessage.mock.calls[0][0]).toMatchObject({seed:42,groundOnly:true});
  expect(worker.postMessage.mock.calls[0][0].send).toBeUndefined();
  worker.onmessage({data:{ok:true,ground:{GROUND_SPECIALIZED:''}}});
  expect(await job.done).toEqual({GROUND_SPECIALIZED:''}); expect(worker.terminate).toHaveBeenCalledOnce();
});
it('stopping a mid-target descriptor job resolves null and ignores late replies',async()=>{
  let worker: any;
  class Fake {onmessage: any; onerror: any; terminate=vi.fn(); postMessage(){} constructor(){worker=this;} }
  vi.stubGlobal('Worker',Fake); const job=startGroundPrep('fox',0,42); job.stop();
  worker.onmessage({data:{ok:true,ground:{GROUND_SPECIALIZED:''}}}); expect(await job.done).toBeNull(); expect(worker.terminate).toHaveBeenCalledOnce();
});
