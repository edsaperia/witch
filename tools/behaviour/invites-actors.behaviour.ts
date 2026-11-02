// IP2 actor surveys retain original windows, seeds and stepping cadence; direct contracts remain in release tests.
import fs from "node:fs";
import path from "node:path";
import {it} from "vitest";
import {metric} from "./results.mjs";
import {TUNING} from "../../src/rules/tuning";
import {newWitch,stepWitch,type WitchState} from "../../src/rules/witch";
import {NO_LOAD,type LeashLoad} from "../../src/rules/leashWeight";
import {newPartyWitches,stepPartyWitches,OFF_FLOOR,type PartyWitches,type PlayerView} from "../../src/rules/partyWitches";
import {generateMap} from "../../src/rules/map";
import {spawnCreatures,stepCreature,type Creature} from "../../src/rules/creatures";
import {floorGrid,setFloorSigils} from "../../src/rules/sigilAvoid";
import {smallWorldTuning} from "../../src/test/worlds";
import {newGame,stepGame,affectionOf,type Game} from "../../src/rules/game";
import {stateOf} from "../../src/rules/creatureStates";
import {runeOffset} from "../../src/rules/runeOffset";

it("reports IP2 actor activity and arrival measurements",()=>{
  const metrics:ReturnType<typeof metric>[]=[],samples:Record<string,unknown>={};
  const add=(id:string,value:number,operator:">"|"<"|">="|"<=",bound:number,unit="count")=>metrics.push(metric(id,value,unit,{operator,value:bound}));
  // leashWeight:89: same synthetic +x loads, bounds,60Hz and60/10-second windows.
  const W=TUNING.leash.weight,bounds={minX:-1e5,maxX:1e5,minZ:-1e5,maxZ:1e5};
  const pull=(over:number):LeashLoad=>({total:over+W.free,over,x:1,z:0,extreme:over>=W.extreme});
  const top=():WitchState=>({...newWitch(0,0),lift:1,mode:"treetop"});
  const fly=(w:WitchState,load:LeashLoad,seconds:number,move=1)=>{for(let i=0;i<seconds*60;i++)w=stepWitch(w,{moveX:move,moveZ:0,toggleMode:false},1/60,TUNING,bounds,load);return w;};
  const flying=fly(top(),pull(6),60),stopped=fly(top(),pull(6),60,0),extreme=fly(top(),pull(W.extreme+1),60),back=fly(flying,NO_LOAD,10);
  add("loaded flying remains treetop after60s",Number(flying.mode==="treetop"),">=",1,"boolean");add("loaded flying floor error after60s",Math.abs(flying.lift-W.floor),"<",0.5e-9,"lift error");
  add("stopped landing after60s",Number(stopped.mode==="ground"&&stopped.lift===0),">=",1,"boolean");add("extreme landing after60s",Number(extreme.mode==="ground"),">=",1,"boolean");add("unloaded recovery lift after10s",back.lift,">=",1,"lift");add("unloaded recovery lift upper",back.lift,"<=",1,"lift");
  samples.load={hz:60,loadedSeconds:60,recoverySeconds:10,flying:{mode:flying.mode,lift:flying.lift},stopped:{mode:stopped.mode,lift:stopped.lift},extreme:{mode:extreme.mode,lift:extreme.lift},back:{mode:back.mode,lift:back.lift}};

  // partyWitches:26/82/102/124: original seeds, actor counts, windows and20Hz cadence.
  const floor={x:100,z:200,radius:15},P=TUNING.partyWitches,areas=(n:number)=>Array.from({length:n},(_,i)=>({key:`a${i}`,x:floor.x+Math.cos(i)*150,z:floor.z+Math.sin(i)*150}));
  const run=(s:PartyWitches,n:number,seconds:number,players:PlayerView[],each:()=>void)=>{let time=0;for(let i=0;i<seconds*20;i++){time+=0.05;stepPartyWitches(s,areas(n),floor,players,time,0.05,TUNING);each();}};
  const first=newPartyWitches(3),activity=new Set<string>();run(first,8,120,[],()=>{for(const w of first.list)activity.add(w.activity);});
  for(const name of ["dance","pair"])add(`party activity ${name} observed120s`,Number(activity.has(name)),">=",1,"boolean");
  const crowd=newPartyWitches(21);let sum=0,n=0,far=0,onIt=0;
  run(crowd,30,300,[],()=>{for(const w of crowd.list){if(w.state!=="floor"||w.y>0.2)continue;const d=Math.hypot(w.x-floor.x,w.z-floor.z);sum+=d;n++;if(d>floor.radius*1.5)far++;if(d<floor.radius)onIt++;}});
  add("party crowd mean distance",sum/n,"<",20,"m");add("party crowd outer share",far/n,">",0.15,"share");add("party crowd floor share",onIt/n,">",0.2,"share");
  const off=newPartyWitches(25),offSeen=new Set<string>();run(off,30,400,[],()=>{for(const w of off.list)if(w.state==="floor"&&(OFF_FLOOR.has(w.activity)||w.pose==="holdHands"))offSeen.add(w.activity);});
  for(const name of ["drink","rest","chat"])add(`off-floor activity ${name} observed400s`,Number(offSeen.has(name)),">=",1,"boolean");
  const swoop=newPartyWitches(29),peaks:number[]=[];run(swoop,30,400,[{x:floor.x,z:floor.z+60,onFoot:false,moving:true,treetop:true}],()=>{for(const w of swoop.list)if(w.activity==="swoop"&&w.peak!==undefined&&!peaks.includes(w.peak))peaks.push(w.peak);});
  add("distinct swoop peaks",peaks.length,">",10);add("lowest swoop peak",Math.min(...peaks),"<",P.swoopHeight*0.85,"m");add("highest swoop peak",Math.max(...peaks),">",P.swoopHeight*1.4,"m");
  samples.partyWitches={hz:20,activity:{seed:3,actors:8,seconds:120,seen:[...activity]},crowd:{seed:21,actors:30,seconds:300,samples:n,sum,far,onIt},offFloor:{seed:25,actors:30,seconds:400,seen:[...offSeen]},swoop:{seed:29,actors:30,seconds:400,peaks}};

  // sigilAvoid:61: same seed1 small map, first non-circle young creature and three seconds.
  const avoidT=smallWorldTuning(TUNING,"Sigil avoidance samples local 10–12 m clusters and explicit placed coordinates, independent of world extent."),map=generateMap(1,avoidT),c=spawnCreatures(map).find(k=>k.level===1&&!k.circle)!;
  const x0=c.x,z0=c.z;c.tx=c.x;c.tz=c.z;c.rest=4;
  const grid=floorGrid([{x:c.x,z:c.z,r:1.6}]);setFloorSigils(grid);
  try{for(let i=0;i<60*3;i++)stepCreature(c,1/60,map);}finally{setFloorSigils(null);}
  const distance=Math.hypot(c.x-x0,c.z-z0);add("resting creature displacement after3s",distance,">",0.5,"m");samples.sigilAvoid={seed:1,hz:60,seconds:3,id:c.id,origin:[x0,z0],distance};

  // pickup:63: original full seed123 old-grid/cast-off fixture, first pickup and six-second second-rune approach.
  const oldGrid={...TUNING,leash:{...TUNING.leash,hex:{...TUNING.leash.hex!,size:4}},cast:{...TUNING.cast,on:false}},g=newGame(123,oldGrid);
  g.clock.paused=false;g.party.spellAt=undefined;
  const controls={moveX:0,moveZ:0,toggleMode:false,zoom:0};
  const place=(game:Game,x:number,z:number)=>{game.witch={...game.witch,x,z,vx:0,vz:0,seated:false,mode:"ground",lift:0};};
  const offset=(creature:Pick<Creature,"species"|"level">)=>runeOffset(creature,TUNING);
  const happyAt=(game:Game,x:number,z:number)=>{const creature=game.creatures.find(k=>!k.boss&&k.level>0&&k.level<3&&stateOf(k)==="wild"&&Math.hypot(k.x-x,k.z-z)>200)!;z-=offset(creature);Object.assign(creature,{x,z,tx:x,tz:z,wanderTo:undefined,fleeUntil:undefined});const A=affectionOf(game);for(let i=0;i<40&&stateOf(creature)==="wild";i++)A.hit(creature,TUNING.invites.amount,game.clock.time);return creature;};
  const press=()=>{stepGame(g,{...controls,place:true},1/60);stepGame(g,controls,1/60);};
  place(g,g.witch.x+30,g.witch.z+20);happyAt(g,g.witch.x+TUNING.leash.runeRadius-0.3,g.witch.z);press();
  const pullT=TUNING.leash.runePull,other=happyAt(g,g.witch.x,g.witch.z+pullT.radius-1);
  for(let i=0;i<6*60;i++)stepGame(g,controls,1/60);
  const docking=Math.hypot(other.x-g.witch.x,other.z+offset(other)-g.witch.z);press();
  add("rune distance after6s upper",docking,"<",pullT.stop+0.5,"m");add("rune distance after6s lower",docking,">",pullT.stop-0.5,"m");add("rune pickup after sampled approach",Number(!!other.leashed),">=",1,"boolean");samples.pickup={seed:123,hexSize:4,cast:false,hz:60,seconds:6,docking,leashed:!!other.leashed};

  const out=process.env.BEHAVIOUR_OUTPUT_DIR;if(!out)throw Error("Run via node tools/behaviour/run.mjs to preserve report artifacts");
  fs.writeFileSync(path.join(out,"invites-actors.json"),JSON.stringify({system:"invites-actors",group:"IP2",sourceDeclarations:7,samples,metrics},null,2)+"\n");
},300_000);
