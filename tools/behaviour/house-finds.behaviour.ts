// H4 house observations; historical outcome references are informational, never release gates.
import fs from "node:fs";
import path from "node:path";
import {it} from "vitest";
import {metric} from "./results.mjs";
import {TUNING} from "../../src/rules/tuning";
import {newGame,type Game} from "../../src/rules/game";
import {nightPick,spawnSpot} from "../../src/rules/finds";
it("reports original six-night trunk,60-draw and five-spawn samples",()=>{
  const game=(seed=123)=>{const g=newGame(seed,TUNING);g.clock.paused=false;g.party.paused=true;g.party.spellAt=undefined;return g;};
  const at=(g:Game,x:number,z:number)=>{g.witch={...g.witch,x,z,vx:0,vz:0,seated:false,perch:undefined,mode:"ground",lift:0};};
  const locations=[1,2,3,4,5,6].map(seed=>{const t=game(seed).trunk!;return {seed,x:t.x,z:t.z,key:t.x.toFixed(1)+","+t.z.toFixed(1)};}),spots=new Set(locations.map(p=>p.key));
  const picks=Array.from({length:60},(_,s)=>nightPick(s+1,{})!),items=new Set(picks.map(p=>p.item)),kinds=["wearable","part","hat"].map(kind=>({kind,present:picks.some(p=>p.kind===kind)}));
  const g=game(),W=g.witches[0].body,offsets=[[200,150],[-260,90],[120,-300],[-80,-220],[300,260]],probes=offsets.map(([dx,dz])=>{at(g,W.x+dx,W.z+dz);return {dx,dz,x:g.witch.x,z:g.witch.z,spot:spawnSpot(g)};}),successes=probes.filter(p=>p.spot).length;
  const metrics=[metric("six-night trunk location variety",spots.size,"locations",{operator:">",value:3}),metric("60-night find item variety",items.size,"items",{operator:">",value:10}),...kinds.map(k=>metric("60-night "+k.kind+" present",+k.present,"boolean",{operator:">=",value:1})),metric("five-probe spawn success",successes,"spots",{operator:">=",value:4})];
  const samples={locations,roundingDecimals:1,pickSeeds:{first:1,last:60},picks,kinds,spawnSeed:123,originalBody:{x:W.x,z:W.z},probes,successes};
  const output=process.env.BEHAVIOUR_OUTPUT_DIR;if(!output)throw Error("Run via node tools/behaviour/run.mjs to preserve report artifacts");
  fs.writeFileSync(path.join(output,"house-finds.json"),JSON.stringify({system:"house-finds",group:"H4 house",sourceDeclarations:3,samples,metrics},null,2)+"\n");
});
