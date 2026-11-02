// C1 placement observations: six original berry/growth/stone-idle/species samples; historical references never gate releases.
import fs from "node:fs";
import path from "node:path";
import {it} from "vitest";
import {metric} from "./results.mjs";
import {newBerries,berryCounts} from "../../src/rules/berries";
import {growthLevel} from "../../src/rules/growth";
import {generateMap} from "../../src/rules/map";
import {newGame} from "../../src/rules/game";
import {LEGEND,spawnCreatures,stepCreaturesNear,type Creature} from "../../src/rules/creatures";
import {TUNING,type Tuning} from "../../src/rules/tuning";
import {largestWorldTuning} from "../../src/test/worlds";
import {cellKey} from "../../src/rules/party";

it("reports six C1 placement and distribution samples",()=>{
  const metrics:ReturnType<typeof metric>[]=[],samples:Record<string,unknown>={};
  const add=(id:string,value:number,operator:">"|"<"|">="|"<=",reference:number,unit="count")=>metrics.push(metric(id,value,unit,{operator,value:reference}));

  // berries:38/124: original full seed123 map, all berries/bushes, original quadratic neighbour query.
  const map=generateMap(123,TUNING),s=newBerries(map,TUNING),[lo,hi]=berryCounts(map,TUNING).perArea,per=new Map<string,number>();
  for(const berry of s.berries){const bush=s.bushes[berry.bush],key=map.areaAt(bush.x,bush.z).cell.join(",");per.set(key,(per.get(key)??0)+1);}
  const counts=[...per.values()],above=counts.filter(n=>n>=lo).length;
  add("berry populated area coverage",counts.length,">",map.cells.length*0.9);
  add("berry areas meeting configured lower count",above/counts.length,">",0.9,"share");
  const radius=TUNING.berries.patch.radius,near=s.bushes.filter(b=>s.bushes.some(o=>o!==b&&Math.hypot(o.x-b.x,o.z-b.z)<=radius*2)).length;
  add("berry bushes with nearby patch neighbour",near/s.bushes.length,">",0.9,"share");
  samples.berries={seed:123,fixture:"full original berries.test.ts map",areas:map.cells.length,perArea:[lo,hi],counts,above,bushes:s.bushes.length,berries:s.berries.length,near,neighbourRadius:radius*2};

  // growth:25: exact800 level draws, seed123,40 waves x20 cells, equal weights.
  const levels=[0,0,0];for(let wave=1;wave<=40;wave++)for(let cx=0;cx<20;cx++)levels[growthLevel(123,[cx,7],wave,0,[1,1,1])]++;
  levels.forEach((n,level)=>{add(`growth level ${level} share lower`,n/800,">",0.27,"share");add(`growth level ${level} share upper`,n/800,"<",0.4,"share");});
  samples.growth={seed:123,waves:40,cells:20,cellY:7,weights:[1,1,1],draws:800,levels};

  // rules:1581 uses rules.test.ts's explicit original opt-in scenery tuning, not a smaller population.
  const rulesTuning:Tuning={...TUNING,setPieceChance:0.25,grounds:{...TUNING.grounds,kinds:["playground","tennis","baseball","football","basketball"]},decor:{...TUNING.decor,mix:{ruins:1,rocks:1,freak:1}},paths:{...TUNING.paths,pieces:true},scenes:{...TUNING.scenes,featured:undefined}};
  const creatures=spawnCreatures(generateMap(123,rulesTuning)),fast=creatures.filter(c=>rulesTuning.creatureSpeeds.fast.includes(c.species)).length;
  add("configured fast-species population share",fast/creatures.length,"<",0.15,"share");samples.speeds={seed:123,fixture:"full rules.test.ts opt-in scenery",population:creatures.length,fast};

  // stoneIdle:33/52: exact original largest shipped seed123 world,0.1s steps,120/60-second windows.
  const tuning=largestWorldTuning(TUNING),S=tuning.stoneIdle!;
  type Game=ReturnType<typeof newGame>;
  const wildAreas=(g:Game)=>{const home=cellKey(g.map.centreCell),by=new Map<string,Creature[]>();for(const c of g.creatures){const key=cellKey(c.cell);if(key!==home)by.set(key,[...(by.get(key)??[]),c]);}return [...by];};
  const hostile=(c:Creature)=>c.level>0&&c.level!==LEGEND&&!c.circle;
  const fromStone=(g:Game,c:Creature,goal=false)=>{const p=g.map.soundsystemSpot(c.cell[0],c.cell[1]);return Math.hypot((goal?c.tx:c.x)-p.x,(goal?c.tz:c.z)-p.z);};
  const roam=(g:Game,seconds:number,each:()=>void)=>{for(let i=0;i<seconds*10;i++){stepCreaturesNear(g.creatures,0,0,1e9,0.1,(g.clock.time+=0.1),g.map);each();}};
  const g=newGame(123,tuning);let n=0,outside=0,onStone=0;
  for(const [,list]of wildAreas(g))for(const c of list)if(hostile(c)&&fromStone(g,c)>S.radius+1)outside++;
  roam(g,120,()=>{for(const [,list]of wildAreas(g))for(const c of list)if(hostile(c)){n++;const d=fromStone(g,c,true);if(d>S.radius+1)outside++;if(d<S.clear-1)onStone++;}});
  const distances=wildAreas(g).flatMap(([,list])=>list.filter(hostile).map(c=>fromStone(g,c,true))).sort((a,b)=>a-b),babies=wildAreas(g).flatMap(([,list])=>list.filter(c=>c.level===0&&!c.circle)),farBabies=babies.filter(c=>fromStone(g,c,true)>S.radius*1.5).length;
  add("stone-idle sampled hostile observations",n,">",1000);add("stone-idle outside cluster share",outside/n,"<",0.03,"share");add("stone-idle on-stone goal share",onStone/n,"<",0.001,"share");
  add("stone-idle goal lower quartile",distances[Math.floor(distances.length*0.25)],"<",S.radius*0.65,"m");add("stone-idle goal upper quartile",distances[Math.floor(distances.length*0.75)],">",S.radius*0.6,"m");add("ordinary babies far from stone",farBabies,">",babies.length*0.3);
  samples.stoneIdle={seed:123,fixture:"largest shipped world",seconds:120,dt:0.1,n,outside,onStone,distances,babies:babies.length,farBabies,initialOutsideIncludedInNumerator:true};
  const alternatives=[];
  for(const off of [false,true]){
    const t:Tuning=off?{...tuning,stoneIdle:{...S,on:false}}:tuning,game=newGame(123,t),list=game.creatures.filter(c=>hostile(c)&&cellKey(c.cell)!==cellKey(game.map.centreCell));
    if(!off)for(const c of list)c.friendly=true;
    let far=0,total=0;roam(game,60,()=>{for(const c of list){total++;if(fromStone(game,c,true)>S.radius*1.5)far++;}});
    add(`stone-idle ${off?"disabled":"friendly"} far-goal share`,far/total,">",0.3,"share");alternatives.push({off,seconds:60,dt:0.1,creatures:list.length,far,total});
  }
  samples.stoneAlternatives=alternatives;
  const output=process.env.BEHAVIOUR_OUTPUT_DIR;if(!output)throw Error("Run via node tools/behaviour/run.mjs to preserve report artifacts");
  fs.writeFileSync(path.join(output,"creatures-placement.json"),JSON.stringify({system:"creatures-placement",group:"C1",sourceDeclarations:6,samples,metrics},null,2)+"\n");
},300_000);
