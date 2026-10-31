import {expect,it} from "vitest";
import {Sprite,M} from "../art/core.js";
import {glowMotes} from "../art/creatures3d.js";
import {spriteConnectivity} from "../art/genome/connectivity.js";
it("places the intended separated count deterministically without overwriting bodies",()=>{
  function draw(){const sp=new Sprite(100,120);for(let y=50;y<110;y++)for(let x=30;x<70;x++)sp.px(x,y,M.BODY);glowMotes(sp,87009,3,true);return sp;}
  const a=draw(),b=draw();expect(a.m).toEqual(b.m);
  for(let y=50;y<110;y++)for(let x=30;x<70;x++)expect(a.get(x,y)).toBe(M.BODY);
  expect(spriteConnectivity(a).components).toEqual([2400,5,1,1]);
});
it("bounds the search when no empty cells can hold an effect",()=>{
  const sp=new Sprite(8,8);sp.m.fill(M.BODY);glowMotes(sp,1,9,true);expect(sp.m.every(v=>v===M.BODY)).toBe(true);
});
