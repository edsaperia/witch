// Supplied C1 finale geometry/state contracts: no generated game or sampled convergence deadline.
import {expect,it} from "vitest";
import type {Game} from "./game";
import type {Creature} from "./creatures";
import {TUNING} from "./tuning";
import {congaPlace,congaRadius,legendPlaces,stepWin,trailPlaces,WIN_DEFAULT,winFlare} from "./win";

const W={...WIN_DEFAULT,...TUNING.win};
const finale=()=>({tuning:TUNING,clock:{time:0},partyOver:null,witch:{x:500,z:500,mode:"treetop",lift:1},
  map:{dancefloor:{x:0,z:0,radius:20},treehouse:{x:0,z:-200}},creatures:[],
  win:{phase:"won",wonAt:0,lead:0,congaSize:5,settled:false,lap:[],found:[],lost:[],sigil:"worldTree"}
} as unknown as Game);

it("keeps configured conga/trail/legend destination geometry and faces a supplied arrived legend toward the camera",()=>{
  const g=finale(),n=g.win!.congaSize,R=congaRadius(n,W),places=Array.from({length:n},(_,i)=>congaPlace(g,i,n,0));
  for(const p of places)expect(Math.hypot(p.x,p.z)).toBeCloseTo(R,8);
  for(let i=1;i<n;i++)expect(Math.hypot(places[i].x-places[i-1].x,places[i].z-places[i-1].z)).toBeCloseTo(W.congaGap,0);
  const trail=trailPlaces([-Math.max(1000,W.followLead+n*W.congaGap+10),0],0,0,W.followLead,W.congaGap,n,[]);
  for(let i=0;i<n;i++){expect(trail[i*2]).toBeCloseTo(-(W.followLead+i*W.congaGap),8);expect(trail[i*2+1]).toBe(0);}
  const goals=legendPlaces(g,3);expect(goals).toHaveLength(3);
  for(const p of goals){expect(p.z).toBeLessThan(-R);expect(Math.hypot(p.x,p.z)).toBeGreaterThan(R+W.legendGap-0.6);}
  for(const a of goals)for(const b of goals)if(a!==b)expect(Math.hypot(a.x-b.x,a.z-b.z)).toBeGreaterThan(W.legendSpace-0.6);
  const p=goals[0],legend={id:0,level:3,boss:true,legendState:"happy",partyLegend:true,finale:-1,x:p.x,z:p.z,anchorX:p.x,anchorZ:p.z,away:true} as Creature;
  g.creatures.push(legend);stepWin(g,1/60);
  expect(legend.away).toBe(false);expect([legend.x,legend.z]).toEqual([p.x,p.z]);expect(legend.finale).toBe(-1);
});

it("shows the supplied won sigil before expiry and clears it after its full duration for fixed-step starts",()=>{
  const g=finale();expect(winFlare(g)).toEqual({sigil:"worldTree",drawn:0});
  g.clock.time=W.flare-1e-6;expect(winFlare(g)).not.toBeNull();
  g.clock.time=W.flare;expect(winFlare(g)).toBeNull();
  // With wonAt=1/60, (wonAt+16)-wonAt is15.999999999999998. Query a fully elapsed frame, without changing the rule/tolerance.
  for(const wonAt of [1/60,37/60,10+1/60]){
    g.win!.wonAt=wonAt;g.clock.time=wonAt+W.flare-1/60;expect(winFlare(g)).not.toBeNull();
    g.clock.time=wonAt+W.flare+1/60;expect(winFlare(g)).toBeNull();
  }
  g.win!.phase="stragglers";g.clock.time=0;expect(winFlare(g)).toBeNull();
});
