import {afterEach,expect,it,vi} from 'vitest';
import type {Game} from '../../src/rules/game';
import {closeWarmChart,waitWarmFunction} from './ground-warm-controls.mjs';
afterEach(() => {vi.unstubAllGlobals();vi.resetModules();});

it('the probe closes MAP without invoking the real global pause adapter',async () => {
  vi.resetModules();
  const storage=new Map<string,string>();
  vi.stubGlobal('localStorage',{getItem:(k:string)=>storage.get(k)??null,setItem:(k:string,v:string)=>storage.set(k,v),removeItem:(k:string)=>storage.delete(k)});
  const listeners: ((e:KeyboardEvent)=>void)[] = [];
  vi.stubGlobal('window',{addEventListener(type:string,handler:(e:KeyboardEvent)=>void){if(type==='keydown')listeners.push(handler);}});
  vi.stubGlobal('navigator',{});
  vi.stubGlobal('document',{querySelector:()=>null,addEventListener(){},createElement:()=>({style:{},addEventListener(){}}),head:{append(){}},body:{append(){},classList:{toggle(){}}}});
  const {Freeze} = await import('../../src/platform/freeze');
  const freeze = new Freeze({clock:{paused:false}} as Game,1,'probe-test');
  let chartOpen = true;
  const page = {
    keyboard:{async press(code:string){
      let stopped=false;
      const event={type:'keydown',code,key:code,repeat:false,target:null,preventDefault(){},stopImmediatePropagation(){stopped=true;}} as unknown as KeyboardEvent;
      for(const handler of listeners){handler(event);if(stopped)break;}
      // The chart's Escape listener is behind Freeze's capture adapter, as in production.
      if(!stopped&&code==='Escape')chartOpen=false;
    }},
    locator(selector:string){expect(selector).toBe('#chart-overlay .close');return {async click(){chartOpen=false;}};},
  };
  await closeWarmChart(page);
  expect(freeze.frozen,'closing the chart must not pause over it').toBe(false);
  expect(chartOpen,'the chart must actually close').toBe(false);
});
it('fails a wait immediately on global pause, even if its condition would be true',async()=>{
  vi.stubGlobal('document',{body:{classList:{contains:()=>true}}});
  const predicate=vi.fn(()=>true);
  const page={waitForFunction:async(fn:Function,arg:unknown)=>fn(arg)};
  await expect(waitWarmFunction(page,predicate,{})).rejects.toThrow('global pause');
  expect(predicate).not.toHaveBeenCalled();
});
it('polls the original condition normally when global pause is off',async()=>{
  vi.stubGlobal('document',{body:{classList:{contains:()=>false}}});
  const page={waitForFunction:async(fn:Function,arg:unknown)=>fn(arg)};
  expect(await waitWarmFunction(page,()=>42,{})).toBe(42);
});
