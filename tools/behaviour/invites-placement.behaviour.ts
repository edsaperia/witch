// IP2 placement/route surveys retain original full-world seeds and counts; outcome references are informational only.
import fs from "node:fs";
import path from "node:path";
import {it} from "vitest";
import {metric} from "./results.mjs";
import {TUNING,withTuning,type Tuning} from "../../src/rules/tuning";
import {floorPatterns,pickPattern} from "../../src/rules/dancefloor";
import {newInvites,stepInvites,type Affection} from "../../src/rules/invites";
import {newGame,stepGame,STEP} from "../../src/rules/game";
import {generateMap} from "../../src/rules/map";
import {newParty,castPartySpell,spawnMarkers,cellKey,routeOf,spreadWave,stepParty,speakersOn} from "../../src/rules/party";
import {leyReachTimes,TIP_PACE} from "../../src/rules/leypulse";
import {crossingPairs} from "../../src/rules/leyroute";
import {dressingOf,partyDef} from "../../src/rules/partyDressing";
import {AT_SOUNDSYSTEM,guestSpot,partySpots} from "../../src/rules/partyGuests";
import {largestWorldTuning,smallWorldTuning} from "../../src/test/worlds";
import {bootPath} from "../../src/rules/bootRing";
import {dealRunestones} from "../../src/rules/runestones";
import {stumpCutOf} from "../../src/rules/stumps";

it("reports IP2 placement and route measurements",()=>{
  const metrics:ReturnType<typeof metric>[]=[],samples:Record<string,unknown>={},notes:string[]=[];
  const add=(id:string,value:number,operator:">"|"<"|">="|"<=",bound:number,unit="count")=>metrics.push(metric(id,value,unit,{operator,value:bound}));
  // floorSigils:12, exact40 seeds x200 plays and allowed wolf/fox/owl sample.
  const lib=floorPatterns(),every=new Set(lib.filter(p=>p.kind==="area").map(p=>p.area!)),kinds=new Set(["wolf","fox","owl"]),seen=new Set<string>();
  for(let seed=1;seed<=40;seed++)for(let played=0;played<200;played++){const p=lib[pickPattern(-1,played,4,every,seed,kinds)];if(p.sigil)seen.add(p.sigil);}
  for(const kind of ["worldTree",...kinds])add(`floor sigil observed ${kind}`,Number(seen.has(kind)),">=",1,"boolean");samples.floorSigils={seeds:40,playsPerSeed:200,kinds:[...kinds],seen:[...seen]};
  // invitesAim:30, same4-second holding-fire sampling and6-degree override.
  const aimT=withTuning({invites:{...TUNING.invites,inaccuracy:6}}),aim=newInvites(),angles:number[]=[];
  const none:Affection={invitable:()=>false,blocksLetters:()=>false,hit:()=>{},affection:()=>null};
  for(let i=0,time=0;i<4/STEP;i++,time+=STEP){const before=aim.next;stepInvites(aim,{fire:true,aimX:1,aimZ:0},{x:0,z:0,facing:1},true,[],none,time,STEP,aimT);for(const letter of aim.letters)if(letter.n>=before)angles.push(Math.atan2(letter.vz,letter.vx)*180/Math.PI);aim.letters=[];}
  add("letter minimum spread",Math.min(...angles),"<",-1,"degrees");add("letter maximum spread",Math.max(...angles),">",1,"degrees");samples.aim={seconds:4,step:STEP,inaccuracy:6,letters:angles.length};
  // leypulse:83, original full radius game and spell at10.
  const beaconGame=newGame(123,TUNING),beacon=beaconGame.party;beacon.spellAt=null;castPartySpell(beacon,beaconGame.map,10);
  const times=leyReachTimes(beacon,beaconGame.map)!,pace=TUNING.leyLines.reveal??TIP_PACE,step=100/(pace*TUNING.leyLines.pulseSpeed),lateAt=10+(beaconGame.map.cells.length/2)*step;
  const late=spawnMarkers(beacon,beaconGame.map).map(m=>times.get(m.key)!).filter(t=>t!==undefined&&t>lateAt).length;
  add("far-half late beacons",late,">",0);samples.beacons={seed:123,castAt:10,cells:beaconGame.map.cells.length,referenceLinkMetres:100,lateAt,late};
  // leyroute:41/106, unchanged40-seed crossing sample and first10 early-route means.
  const crossingCounts:number[]=[],early=[];
  for(let seed=1;seed<=40;seed++){
    const map=generateMap(seed,TUNING),route=routeOf(map);crossingCounts.push(crossingPairs(route.links).length);
    if(seed<=10){const steps=route.stones.slice(1,40).map((q,i)=>Math.hypot(q[0]-route.stones[i][0],q[1]-route.stones[i][1])),mean=steps.reduce((a,b)=>a+b,0)/steps.length;add(`early-wave step mean seed ${seed}`,mean,"<",2*map.areaSize,"m");early.push({seed,steps:steps.length,mean});}
  }
  add("route crossing-count variety",new Set(crossingCounts).size,">",1);samples.routes={seeds:40,crossingCounts,early};
  // partyDressing:14/43/71/102, original full seed123 map and exact spatial loops.
  const map=generateMap(123,TUNING),P=TUNING.partyObjects,D=map.dancefloor,home=dressingOf(map,map.centreCell,TUNING),H=P.home;
  add("home loose fill",home.loose.length,">=",H.loose[0]*0.8);add("home cluster fill",home.clusters.length,">=",H.clusters[0]-1);add("home-specific clusters",home.clusters.filter(c=>c.id.startsWith("home-")).length,">=",2);
  const classes=new Set(home.loose.map(p=>partyDef(p.ref)?.cls));for(const cls of ["home","small","balloon","litter","furniture"])add(`home class ${cls}`,Number(classes.has(cls)),">=",1,"boolean");
  const quarters=new Set(home.loose.map(p=>Math.floor((Math.atan2(p.z-D.z,p.x-D.x)+Math.PI)/(Math.PI/2))%4)).size,far=home.loose.filter(p=>Math.hypot(p.x-D.x,p.z-D.z)>map.homeRadius).length;
  add("home quarters occupied",quarters,">=",4);add("home far pieces",far,">",5);
  const sample=dressingOf(map,[map.centreCell[0]+1,map.centreCell[1]+1],TUNING);add("sample area cluster fill",sample.clusters.length,">=",P.clusters[0]-1);add("sample area loose fill",sample.loose.length,">=",P.loose[0]*0.75);
  let hanging=0,smalls=0,areas=0;
  for(let cy=0;cy<map.n;cy++)for(let cx=0;cx<map.n;cx++){if((cx===map.centreCell[0]&&cy===map.centreCell[1])||!map.playable(cx,cy))continue;const d=dressingOf(map,[cx,cy],TUNING);areas++;hanging+=d.hanging.length;smalls+=d.loose.filter(p=>partyDef(p.ref)?.cls==="small").length;}
  add("hanging pieces per area",hanging/areas,">=",P.hanging[0]*0.5,"pieces/area");add("small pieces per area",smalls/areas,">",2,"pieces/area");
  let near=0,balloons=0;
  for(let cx=0;cx<12;cx++)for(let cy=0;cy<12;cy++){const d=dressingOf(map,[cx,cy],TUNING);for(const p of d.loose)if(partyDef(p.ref)?.cls==="balloon"&&d.lights.length){balloons++;if(d.lights.some(light=>Math.hypot(light.x-p.x,light.z-p.z)<3.5))near++;}}
  if(balloons)add("balloons near lights",near/balloons,">",0.4,"share");else notes.push("Balloon/light share is not applicable: the original conditional12x12 sample contains zero balloons with lights.");
  samples.dressing={seed:123,home:{loose:home.loose.length,clusters:home.clusters.length,classes:[...classes],quarters,far},sample:{loose:sample.loose.length,clusters:sample.clusters.length},areas,hanging,smalls,balloonGrid:12,balloons,near};
  // partyGuests:34, largest shipped world, sixth nonhome cell and200 IDs as before.
  const guestT=largestWorldTuning(TUNING),guestMap=generateMap(123,guestT),cells=guestMap.cells.filter(([x,y])=>x!==guestMap.centreCell[0]||y!==guestMap.centreCell[1]),cell=cells[5],spots=partySpots(guestMap,cell,guestT),ss=guestMap.soundsystemSpot(...cell);
  const where=Array.from({length:200},(_,id)=>guestSpot({id},ss,spots)),atSound=where.filter(s=>s.kind==="soundsystem").length/where.length,occupied=new Set(where.filter(s=>s.kind!=="soundsystem")).size;
  add("guest soundsystem share lower",atSound,">",AT_SOUNDSYSTEM-0.12,"share");add("guest soundsystem share upper",atSound,"<",AT_SOUNDSYSTEM+0.12,"share");add("guest non-soundsystem places occupied",occupied,">=",spots.length);samples.guests={seed:123,largestShipped:true,cell,ids:200,places:spots.length,occupied,atSound};
  // rules:619/641 use the monolithic suite's explicit compatibility scenery, not the normal map above.
  const legacy:Tuning={...TUNING,setPieceChance:0.25,grounds:{...TUNING.grounds,kinds:["playground","tennis","baseball","football","basketball"]},decor:{...TUNING.decor,mix:{ruins:1,rocks:1,freak:1}},paths:{...TUNING.paths,pieces:true},scenes:{...TUNING.scenes,featured:undefined}};
  const noisyMap=generateMap(123,{...legacy,party:{...legacy.party,picker:"noisy"}}),noisy=newParty(noisyMap);let besideLast=0,couldAvoid=0;
  for(let wave=1;wave<=25;wave++){spreadWave(noisy,noisyMap,wave*30);if(noisy.last&&noisy.next.length&&wave>1){if(noisyMap.neighbours.get(cellKey(noisy.last))!.has(cellKey(noisy.next[0])))besideLast++;couldAvoid++;}}
  add("noisy picker avoidable adjacent choices",besideLast,"<",couldAvoid*0.5);samples.noisy={seed:123,waves:25,waveStep:30,besideLast,couldAvoid};
  const legacyMap=generateMap(123,legacy),party=newParty(legacyMap),boot=bootPath(legacyMap),vb=legacy.boot.speed!,n=legacyMap.dancefloor.speakers.length,first=boot.stoneAt[boot.order[0]]/vb,last=boot.stoneAt[boot.order[n-1]]/vb;
  stepParty(party,legacyMap,0,0);const counts=Array.from({length:61},(_,i)=>speakersOn(party,legacyMap,first+i/60*(last-first),n));
  add("boot path old195m reference lower",boot.length,">",194.5,"m");add("boot path old195m reference upper",boot.length,"<",195.5,"m");add("first speaker old time lower",first,">",8,"s");add("first speaker old time upper",first,"<",9.5,"s");add("midpoint speaker count lower",counts[30],">",2);add("midpoint speaker count upper",counts[30],"<",n);samples.boot={seed:123,pathMetres:boot.length,firstSeconds:first,lastSeconds:last,counts,edRuling:"2026-11-02: report, do not pin"};
  // runestones:23, original20-cell seed1 sample, not a changed dealing policy.
  const grid=Array.from({length:20},(_,i)=>[i%8,Math.floor(i/8)] as const),stones=[...dealRunestones(grid,1).values()],flipped=stones.filter(s=>s.flip).length;
  add("mirrored runestones observed",flipped,">",0);add("unmirrored runestones observed",stones.length-flipped,">",0);samples.runestones={seed:1,cells:20,flipped};
  // stoneStacks:219, same local seed123 game, six preparation steps, first eligible wild area.
  const at=(irregular:number)=>withTuning({cast:{...TUNING.cast,on:true},runeMarkers:{...TUNING.runeMarkers,stump:{...TUNING.runeMarkers.stump!,on:true,irregular}}});
  const evenT=at(0),g=newGame(123,smallWorldTuning(evenT,"Stump cut shape and casting bounds are local to one runestone."));
  g.clock.paused=false;g.party.spellAt=undefined;g.party.paused=true;g.witch={...g.witch,seated:false,mode:"treetop",lift:1};g.witches[0].health.hp=1e6;
  for(let i=0;i<6;i++)stepGame(g,{moveX:0,moveZ:0,toggleMode:false,zoom:0,autoTalk:false},1/60);
  const chosen=g.map.cells.find(([cx,cy])=>{const key=cellKey([cx,cy]),cs=g.creatures.filter(c=>cellKey(c.cell)===key&&!c.gone);return key!==cellKey(g.map.centreCell)&&!g.party.areas.has(key)&&g.map.playable(cx,cy)&&cs.some(c=>c.level===0&&!c.boss)&&cs.some(c=>c.level>0&&!c.boss);});
  if(!chosen)throw Error("Original stump sample has no eligible wild area");
  const even=stumpCutOf(evenT,g.map,chosen)!,odd=stumpCutOf(at(1),g.map,chosen)!;
  const spread=(cut:number[])=>{const mean=cut.reduce((a,b)=>a+b,0)/cut.length;return Math.sqrt(cut.reduce((a,b)=>a+(b-mean)**2,0)/cut.length)/mean;};
  add("stump maximum changed radius",Math.max(...odd.map((r,i)=>Math.abs(r-even[i]))),">",0.15,"m");add("irregular stump variation",spread(odd),">",spread(even)*0.8,"relative spread");samples.stumps={seed:123,cell:chosen,prepSteps:6,even,odd};

  const out=process.env.BEHAVIOUR_OUTPUT_DIR;if(!out)throw Error("Run via node tools/behaviour/run.mjs to preserve report artifacts");
  fs.writeFileSync(path.join(out,"invites-placement.json"),JSON.stringify({system:"invites-placement",group:"IP2",sourceDeclarations:14,samples,metrics,notes},null,2)+"\n");
},300_000);
