// C1 nap/finale observations: four original seeded windows, with informational historical references only.
import fs from "node:fs";
import path from "node:path";
import {it} from "vitest";
import {metric} from "./results.mjs";
import {newGame,stepGame,STEP,type Game} from "../../src/rules/game";
import {TUNING,withTuning} from "../../src/rules/tuning";
import {LEGEND} from "../../src/rules/creatures";
import {cellKey} from "../../src/rules/party";
import {anger} from "../../src/rules/legends";
import {befriend} from "../../src/rules/creatureStates";
import {isHomeKey} from "../../src/rules/speakers";
import {congaPlace,congaRadius,finalStone,routeDone,straggler,trailPlaces,WIN_DEFAULT} from "../../src/rules/win";

const idle={moveX:0,moveZ:0,toggleMode:false,zoom:0,autoTalk:false},W={...WIN_DEFAULT,...TUNING.win};
const run=(g:Game,seconds:number,each?:()=>void)=>{for(let i=0;i<seconds/STEP;i++){stepGame(g,idle,STEP);each?.();}};
// Nap tests round their frame count; win tests use the original i<seconds/STEP loop above.
const runNap=(g:Game,seconds:number,each:()=>void)=>{for(let i=0;i<Math.round(seconds/STEP);i++){stepGame(g,idle,STEP);each();}};
const calmAll=(g:Game)=>{for(const c of g.creatures)if(straggler(c))befriend(c,g.clock.time);};
function toTheEnd(){
  const g=newGame(7,withTuning({map:{...TUNING.map!,islandAreas:10}}));
  g.clock.paused=false;g.party.spellAt=undefined;g.party.paused=true;g.witch={...g.witch,seated:false,mode:"treetop",lift:1};stepGame(g,idle,STEP);
  let finalSeen=false;
  for(let k=0;k<40&&!routeDone(g);k++){if(finalStone(g))finalSeen=true;stepGame(g,{...idle,nextWave:true},STEP);}
  for(const [key,h]of g.combat.sounds)if(isHomeKey(key))h.hp=h.max=1e9;
  return {g,finalSeen};
}

it("reports four C1 idler/circle sleep and finale/conga convergence samples",()=>{
  const metrics:ReturnType<typeof metric>[]=[],samples:Record<string,unknown>={},notes:string[]=[];
  const add=(id:string,value:number,operator:">"|"<"|">="|"<=",reference:number,unit="count")=>metrics.push(metric(id,value,unit,{operator,value:reference}));

  // naps:35: original full seed77 world, most-populated non-home wild area, treetops,120s.
  const g=newGame(77,TUNING);g.clock.paused=false;g.witches[0].health.hp=1e6;
  const home=cellKey(g.map.centreCell),counts=new Map<string,number>();
  for(const c of g.creatures)if(!c.boss&&!c.gone)counts.set(cellKey(c.cell),(counts.get(cellKey(c.cell))??0)+1);
  const area=g.map.cells.map(c=>({c,s:g.map.siteOf(c[0],c[1]),n:counts.get(cellKey(c))??0})).filter(({c})=>cellKey(c)!==home&&!g.party.areas.has(cellKey(c))).sort((a,b)=>b.n-a.n)[0];
  if(!area)throw Error("Original nap scene has no eligible wild area");
  const key=cellKey(area.c),inIt=(x:number,z:number)=>cellKey(g.map.cellSafe(x,z).cell)===key,one=g.creatures.find(c=>cellKey(c.cell)===key&&!c.boss&&inIt(c.x,c.z));
  const at=inIt(area.s.x,area.s.z)||!one?{x:area.s.x,z:area.s.z}:{x:one.x,z:one.z};
  g.witch={...g.witch,seated:false,x:at.x,z:at.z,vx:0,vz:0,mode:"treetop",lift:1};
  const list=g.creatures.filter(c=>cellKey(c.cell)===key&&!c.gone&&!c.leashed&&!c.boss&&!c.enraged),ever=new Set<number>();let most=0,woke=0;
  runNap(g,120,()=>{const n=list.filter(c=>c.asleep).length;most=Math.max(most,n);for(const c of list){if(c.asleep)ever.add(c.id);else if(ever.has(c.id)&&c.wakeUntil!==undefined)woke++;}});
  add("wild idlers ever observed asleep",ever.size,">",0);add("peak simultaneous sleeping idlers",most,"<",list.length);add("idler post-nap wake samples",woke,">",0);
  samples.idlers={seed:77,fixture:"full original most-populated wild area",key,at,ids:list.map(c=>c.id),seconds:120,dt:STEP,ever:[...ever],most,woke,wokeCountsFramesNotTransitions:true};

  // naps:129: original nearest wild legend-circle baby at seed77, treetops over the circle,300s.
  const circleGame=newGame(77,TUNING),floor=circleGame.map.dancefloor;circleGame.clock.paused=false;circleGame.witches[0].health.hp=1e6;
  const baby=circleGame.creatures.filter(c=>c.circle&&!c.boss&&!c.leashed&&!c.gone&&!circleGame.party.areas.has(cellKey(c.cell))).sort((a,b)=>Math.hypot(a.x-floor.x,a.z-floor.z)-Math.hypot(b.x-floor.x,b.z-floor.z))[0];
  if(!baby)throw Error("Original circle nap scene has no eligible baby");
  circleGame.witch={...circleGame.witch,seated:false,x:baby.circle!.x,z:baby.circle!.z,vx:0,vz:0,mode:"treetop",lift:1};
  let asleep=0,all=0,stirs=0,was=false;
  runNap(circleGame,300,()=>{all++;if(baby.asleep)asleep++;if(was&&!baby.asleep)stirs++;was=!!baby.asleep;});
  add("circle baby sleep share",asleep/all,">",0.6,"share");add("circle baby observed stirs",stirs,">",0);
  samples.circle={seed:77,fixture:"nearest wild legend-circle baby",id:baby.id,circle:baby.circle,seconds:300,dt:STEP,asleep,all,stirs};

  // win:173: original ten-area seed7 setup, one kept angry legend, other quests completed at0,1s flare then40s convergence.
  const {g:winGame,finalSeen}=toTheEnd(),legends=winGame.creatures.filter(c=>c.boss&&!c.gone),angry=legends[0];
  if(!angry)throw Error("Original win scene has no dealt legend");
  for(const c of legends)if(c!==angry)c.quest={species:"otter",done:0};winGame.islandsTonight=["otter"];
  const keepAngry=()=>{if(winGame.win?.phase!=="won"&&angry.legendState!=="angry")anger(angry,winGame.clock.time);};
  anger(angry,winGame.clock.time);run(winGame,0.2,keepAngry);calmAll(winGame);
  for(let i=0;i<120/STEP&&winGame.win?.phase!=="won";i++){keepAngry();stepGame(winGame,idle,STEP);}
  if(winGame.win?.phase!=="won")throw Error("Original finale fixture did not reach won state");
  run(winGame,1);const line=winGame.creatures.filter(c=>!c.gone&&!c.boss&&c.level!==LEGEND);run(winGame,40);
  const byPlace=[...line].sort((a,b)=>a.finale!-b.finale!),pointErrors=byPlace.map(c=>{const p=congaPlace(winGame,c.finale!,winGame.win!.congaSize,winGame.clock.time);return Math.hypot(p.x-c.x,p.z-c.z);}),gaps=byPlace.slice(1).map((c,i)=>Math.hypot(c.x-byPlace[i].x,c.z-byPlace[i].z));
  if(pointErrors.length)add("finale maximum dancer target error after40s",Math.max(...pointErrors),"<",0.6,"m");else notes.push("Finale dancer target errors: original loop had no eligible dancers.");
  if(gaps.length)add("finale maximum adjacent gap error after40s",Math.max(...gaps.map(gap=>Math.abs(gap-W.congaGap))),"<",0.5,"m");else notes.push("Finale adjacent gaps: original loop had fewer than two dancers.");
  const d0=winGame.map.dancefloor,R=congaRadius(winGame.win!.congaSize,W),dancers=legends.filter(c=>c!==angry),northMargins=dancers.map(c=>d0.z-R-c.z),radii=dancers.map(c=>Math.hypot(c.x-d0.x,c.z-d0.z)),legendGaps:number[]=[];
  for(const a of dancers)for(const b of dancers)if(a!==b)legendGaps.push(Math.hypot(a.x-b.x,a.z-b.z));
  if(dancers.length){add("finale minimum legend north margin after40s",Math.min(...northMargins),">",0,"m");add("finale minimum legend radius after40s",Math.min(...radii),">",R+W.legendGap-0.6,"m");add("finale legends facing away after40s",dancers.filter(c=>c.away!==false).length,"<=",0);}else notes.push("Finale legend convergence: original loop had no completed-quest legends.");
  if(legendGaps.length)add("finale minimum legend separation after40s",Math.min(...legendGaps),">",W.legendSpace-0.6,"m");else notes.push("Finale legend separation: original loop had fewer than two legends.");
  samples.finale={seed:7,islandAreas:10,dt:STEP,finalSeen,winWaitLimit:120,flareSeconds:1,convergenceSeconds:40,angry:angry.id,found:winGame.win.found,lost:winGame.win.lost,congaSize:winGame.win.congaSize,pointErrors,gaps,legends:dancers.map(c=>({id:c.id,x:c.x,z:c.z,away:c.away})),northMargins,radii,legendGaps};

  // win:307: original wonNight() setup including30s ring formation, then30s walking a wide home-area circle.
  const {g:followGame}=toTheEnd();run(followGame,0.2);calmAll(followGame);
  for(let i=0;i<120/STEP&&followGame.win?.phase!=="won";i++)stepGame(followGame,idle,STEP);
  if(followGame.win?.phase!=="won")throw Error("Original following fixture did not reach won state");
  run(followGame,30);const followFloor=followGame.map.dancefloor;followGame.witch={...followGame.witch,x:followFloor.x,z:followFloor.z+20,mode:"ground",lift:0,vx:0,vz:0,perch:undefined,seated:false};
  const n=followGame.win.congaSize;
  for(let i=0;i<30/STEP;i++){const a=i*STEP;stepGame(followGame,{...idle,moveX:-Math.sin(a),moveZ:Math.cos(a)},STEP);}
  const followers=followGame.creatures.filter(c=>!c.gone&&c.finale!==undefined&&c.finale>=0).sort((a,b)=>a.finale!-b.finale!),places=trailPlaces(followGame.win.trail!,followGame.witch.x,followGame.witch.z,W.followLead,W.congaGap,n,[]);
  if(!followers.length)throw Error("Original following fixture has no line");
  const leaderDistance=Math.hypot(followers[0].x-followGame.witch.x,followers[0].z-followGame.witch.z);let near=0;
  for(const c of followers)if(Math.hypot(places[c.finale!*2]-c.x,places[c.finale!*2+1]-c.z)<1)near++;
  const followGaps=[];for(let i=1;i<Math.min(followers.length,40);i++)followGaps.push(Math.hypot(followers[i].x-followers[i-1].x,followers[i].z-followers[i-1].z));
  add("following conga leader distance",leaderDistance,"<",W.followLead+1.5,"m");add("following conga near-trail share",near/followers.length,">",0.95,"share");
  if(followGaps.length)add("following conga maximum first40 gap",Math.max(...followGaps),"<",W.congaGap+0.3,"m");else notes.push("Following first40 gaps: original loop had fewer than two dancers.");
  samples.follow={seed:7,islandAreas:10,dt:STEP,winWaitLimit:120,ringFormationSeconds:30,walkingSeconds:30,congaSize:n,followers:followers.map(c=>c.id),leaderDistance,near,followGaps};

  const output=process.env.BEHAVIOUR_OUTPUT_DIR;if(!output)throw Error("Run via node tools/behaviour/run.mjs to preserve report artifacts");
  fs.writeFileSync(path.join(output,"creatures-finale.json"),JSON.stringify({system:"creatures-finale",group:"C1",sourceDeclarations:4,samples,metrics,notes},null,2)+"\n");
},300_000);
