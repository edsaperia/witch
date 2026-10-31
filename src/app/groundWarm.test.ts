import {expect, it, vi} from 'vitest';
import {GroundWarm, nearestGroundTargets} from './groundWarm';
const deferred = <T>() => { let resolve!: (v:T|null) => void; const done = new Promise<T|null>(r=>{resolve=r;}); return {done,resolve,stop:vi.fn()}; };
it('keeps only other reachable targets, nearest first with deterministic ties', () => {
  const from={id:'home',x:0,y:0};
  expect(nearestGroundTargets([from,{id:'far',x:8,y:0},{id:'b',x:1,y:0},{id:'a',x:0,y:1}],from).map(t=>t.id)).toEqual(['a','b','far']);
});
it('leaving mid-prepare terminates it and ignores late completion without compiling', async () => {
  let eligible=true; const job=deferred<string>(), compile=vi.fn();
  const warm=new GroundWarm(()=>eligible,()=>job,compile);
  warm.tick('one',['fox']); eligible=false; warm.tick('one',['fox']);
  expect(job.stop).toHaveBeenCalledOnce(); job.resolve('fox'); await Promise.resolve();
  eligible=true; warm.tick('two',[]); expect(compile).not.toHaveBeenCalled();
});
it('a prepared reply cannot submit after leaving; an eligible tick is required', async () => {
  let eligible=true; const job=deferred<string>(), compile=vi.fn(()=>null);
  const warm=new GroundWarm(()=>eligible,()=>job,compile);
  warm.tick('one',['fox']); job.resolve('fox'); await Promise.resolve();
  expect(compile).not.toHaveBeenCalled(); eligible=false; warm.tick('one',['fox']);
  eligible=true; warm.tick('one',[]); expect(compile).not.toHaveBeenCalled();
});
it('leaving mid-GPU-target stops every poll; reentering resumes that same target', async () => {
  let eligible=true, ready=false; const job=deferred<string>(), poll=vi.fn(()=>ready), dispose=vi.fn(), compile=vi.fn(()=>({ready:poll,dispose}));
  const prepare=vi.fn(()=>job), warm=new GroundWarm(()=>eligible,prepare,compile);
  warm.tick('one',['fox']); job.resolve('fox'); await Promise.resolve(); warm.tick('one',['fox']);
  eligible=false; warm.tick('one',['fox']); warm.tick('one',['fox']); expect(poll).not.toHaveBeenCalled();
  eligible=true; warm.tick('one',['fox']); expect(poll).toHaveBeenCalledOnce(); expect(compile).toHaveBeenCalledOnce();
  ready=true; warm.tick('one',['fox']); expect(prepare).toHaveBeenCalledOnce();
  warm.dispose(); expect(dispose).toHaveBeenCalledOnce(); warm.tick('one',['fox']); expect(prepare).toHaveBeenCalledOnce();
});
it('invalidates old-world replies and bounds retained program references', async () => {
  const jobs=[deferred<string>(),deferred<string>()], prepare=vi.fn(()=>jobs.shift()!), dispose=vi.fn();
  const warm=new GroundWarm(()=>true,prepare,()=>({ready:()=>true,dispose}),1);
  const old=jobs[0], next=jobs[1]; warm.tick('old',['fox']); warm.tick('new',['wolf']); old.resolve('old'); next.resolve('new'); await Promise.resolve();
  warm.tick('new',['wolf','fox']); warm.tick('new',['wolf','fox']); warm.tick('new',['wolf','fox']); expect(prepare).toHaveBeenCalledTimes(2);
  warm.tick('newer',[]); expect(dispose).toHaveBeenCalledOnce();
});
