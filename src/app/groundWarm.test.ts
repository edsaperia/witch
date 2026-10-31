import {expect, it, vi} from 'vitest';
import {GroundWarm, groundWarmFromLink, nearestGroundTargets} from './groundWarm';
it('defaults ground precompile on and honors the explicit link off switch', () => {
  expect(groundWarmFromLink(new URLSearchParams())).toBe(true);
  expect(groundWarmFromLink(new URLSearchParams('precompileGround=1'))).toBe(true);
  expect(groundWarmFromLink(new URLSearchParams('precompileGround=0'))).toBe(false);
});
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
it('re-entry in the same context starts a fresh descriptor after cancellation and retains it',async()=>{
  let eligible=true; const cancelled=deferred<string>(), fresh=deferred<string>();
  const prepare=vi.fn().mockReturnValueOnce(cancelled).mockReturnValueOnce(fresh);
  const compile=vi.fn(()=>({ready:()=>true,dispose:vi.fn()}));
  const warm=new GroundWarm(()=>eligible,prepare,compile);
  warm.tick('same',['fox']);eligible=false;warm.tick('same',['fox']);
  cancelled.resolve('stale');await Promise.resolve();
  eligible=true;warm.tick('same',['fox']);expect(prepare).toHaveBeenCalledTimes(2);
  fresh.resolve('fresh');await Promise.resolve();warm.tick('same',['fox']);warm.tick('same',['fox']);
  expect(compile).toHaveBeenCalledExactlyOnceWith('fresh');expect(warm.status.retained).toBe(1);warm.dispose();
});
it('re-entry resumes interrupted GPU polling and retains when that GPU reports completion',async()=>{
  let eligible=true,done=false;const job=deferred<string>(),poll=vi.fn(()=>done);
  const prepare=vi.fn(()=>job),compile=vi.fn(()=>({ready:poll,dispose:vi.fn()}));
  const warm=new GroundWarm(()=>eligible,prepare,compile);
  warm.tick('same',['fox']);job.resolve('fox');await Promise.resolve();warm.tick('same',['fox']);
  eligible=false;warm.tick('same',['fox']);expect(poll).not.toHaveBeenCalled();
  done=true;eligible=true;warm.tick('same',['fox']);
  expect(warm.status.retained).toBe(1);expect(poll).toHaveBeenCalledOnce();
  expect(prepare).toHaveBeenCalledOnce();expect(compile).toHaveBeenCalledOnce();warm.dispose();
});
it('pins the destination program through old-night teardown and the new island context',async()=>{
  let users=0;const job=deferred<string>(),dispose=vi.fn(()=>{users--;});
  const warm=new GroundWarm(()=>true,()=>job,()=>{users++;return {ready:()=>true,dispose};},8);
  warm.tick('home-night',['fox'],{world:0,island:'home'});job.resolve('fox');await Promise.resolve();
  warm.tick('home-night',['fox'],{world:0,island:'home'});warm.tick('home-night',['fox'],{world:0,island:'home'});
  expect(users).toBe(1);expect(warm.status.retained).toBe(1);
  // The old live scene is retired; only the warm material owns this destination program.
  warm.tick('fox-night',[],{world:0,island:'fox'});
  expect(users,'destination warm material must survive the sail context reset').toBe(1);
  expect(dispose).not.toHaveBeenCalled();expect(warm.status.retained).toBe(1);
  // The arrival's real material can acquire this still-live program before the pin is released.
  users++;warm.dispose();expect(users).toBe(1);expect(dispose).toHaveBeenCalledOnce();
});
it('does not carry destination references across a world or settings-scope change',async()=>{
  for(const next of [{world:1,island:'fox',scope:'normal'},{world:0,island:'fox',scope:'changed'}]){
    const job=deferred<string>(),dispose=vi.fn(),warm=new GroundWarm(()=>true,()=>job,()=>({ready:()=>true,dispose}));
    const before={world:0,island:'home',scope:'normal'};
    warm.tick('old',['fox'],before);job.resolve('fox');await Promise.resolve();warm.tick('old',['fox'],before);warm.tick('old',['fox'],before);
    warm.tick('new',[],next);expect(dispose).toHaveBeenCalledOnce();expect(warm.status.retained).toBe(0);warm.dispose();
  }
});
it('also pins an in-flight destination GPU program without polling during the sail',async()=>{
  let eligible=true,ready=false;const job=deferred<string>(),dispose=vi.fn(),poll=vi.fn(()=>ready);
  const warm=new GroundWarm(()=>eligible,()=>job,()=>({ready:poll,dispose}));
  warm.tick('home',['fox'],{world:0,island:'home'});job.resolve('fox');await Promise.resolve();warm.tick('home',['fox'],{world:0,island:'home'});
  eligible=false;warm.tick('fox',[],{world:0,island:'fox'});
  expect(dispose).not.toHaveBeenCalled();expect(poll).not.toHaveBeenCalled();
  eligible=true;ready=true;warm.tick('fox',[],{world:0,island:'fox'});expect(warm.status.retained).toBe(1);
  warm.dispose();expect(dispose).toHaveBeenCalledOnce();
});
