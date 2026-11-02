// C1 motion observations: five original game/roaming windows, with actual outcomes and informational references.
import fs from "node:fs";
import path from "node:path";
import {it} from "vitest";
import {metric} from "./results.mjs";
import {newGame,stepGame,STEP,type Game,type Controls} from "../../src/rules/game";
import {generateMap} from "../../src/rules/map";
import {keepsToCircle,makeCreature,spawnCreatures,speedFactor,stepCreature,wanderRange,type Creature,type Level} from "../../src/rules/creatures";
import {TUNING,type Tuning,withTuning} from "../../src/rules/tuning";
import {smallWorldTuning} from "../../src/test/worlds";
import {rng} from "../../src/rules/random";
import {setupArena} from "../../src/rules/arena";
import {marchSpeed} from "../../src/rules/combat";
import {bodyRadius} from "../../src/rules/spacing";
import {MOVEMENT} from "../../src/rules/movement";

const idle:Controls={moveX:0,moveZ:0,toggleMode:false,zoom:0,autoTalk:false};
const run=(g:Game,seconds:number,c:Controls=idle,each?:()=>void)=>{for(let i=0;i<Math.round(seconds/STEP);i++){stepGame(g,c,STEP);each?.();}};

it("reports five C1 catch-up, glide, roaming, LOD and follower-spacing samples",()=>{
  const metrics:ReturnType<typeof metric>[]=[],samples:Record<string,unknown>={};
  const add=(id:string,value:number,operator:">"|"<"|">="|"<=",reference:number,unit="count")=>metrics.push(metric(id,value,unit,{operator,value:reference}));

  // babies:120: original full seed123 scene, two areas away, spared creatures>300m away, one fox baby200m east/30m south.
  const babyT=withTuning({witchHealth:{...TUNING.witchHealth,hits:1e6},invites:{...TUNING.invites,on:false}}),babyGame=newGame(123,babyT),witch=babyGame.witches[0];
  babyGame.clock.paused=false;babyGame.party.paused=true;
  const [hx,hy]=babyGame.map.centreCell,cell:[number,number]=[hx+2,hy],site=babyGame.map.siteOf(cell[0],cell[1]);
  witch.body={...witch.body,seated:false,mode:"ground",lift:0,x:site.x,z:site.z};
  for(const c of babyGame.creatures)if(Math.hypot(c.x-site.x,c.z-site.z)<250)c.gone=true;
  const baby=babyGame.creatures.filter(c=>!c.gone&&!c.leashed&&!c.boss&&Math.hypot(c.x-site.x,c.z-site.z)>300).slice(0,1)[0];
  if(!baby)throw Error("Original baby scene has no spare creature");
  const x=site.x+2,z=site.z+2;
  Object.assign(baby,{species:"fox",level:0 as Level,x,z,tx:x,tz:z,cell,homeX:x,homeZ:z,anchorX:x,anchorZ:z,range:wanderRange(babyGame.map),speed:babyT.creatureSpeed*speedFactor("fox",0,babyT),gone:false,hp:undefined,siege:undefined,enraged:false,fight:undefined,circle:undefined,leashed:true,state:"leashed"});
  babyGame.leash.stack.push(baby.id);
  for(const b of babyGame.berries.berries){const p=babyGame.berries.bushes[b.bush];if(Math.hypot(p.x-site.x,p.z-site.z)<200)b.claimedBy=-1;}
  babyGame.byArea=null;
  Object.assign(baby,{x:babyGame.witch.x+200,z:babyGame.witch.z+30,tx:babyGame.witch.x+200,tz:babyGame.witch.z+30});
  const t0=babyGame.clock.time;let arrival=-1;
  run(babyGame,10,idle,()=>{if(arrival<0&&Math.hypot(baby.x-babyGame.witch.x,baby.z-babyGame.witch.z)<12)arrival=babyGame.clock.time-t0;});
  add("baby catch-up arrival observed",arrival,">",0,"s");add("baby catch-up arrival upper",arrival,"<",8,"s");
  samples.baby={seed:123,fixture:"full original scene",cell,offset:[200,30],within:12,seconds:10,dt:STEP,arrival,arrived:arrival>=0,population:babyGame.creatures.length};

  // glide:12: original small seed7 map, first cell/rng3,120s at60Hz, starting time0.
  const glideMap=generateMap(7,smallWorldTuning(TUNING,"One creature glides within one cell; distant areas cannot affect its movement.")),glider=makeCreature(glideMap,glideMap.cells[0] as [number,number],1,1,rng(3));glider.species="flyingsquirrel";
  let glides=0,landed=0,time=0,wasAir=false,maxAirStep=0,maxLandingError=0;
  for(let i=0;i<60*120;i++,time+=1/60){const px=glider.x,pz=glider.z;stepCreature(glider,1/60,glideMap,time);const air=!!glider.leap&&time>=glider.leap.at;
    if(air&&!wasAir)glides++;if(!glider.leap&&wasAir){landed++;maxLandingError=Math.max(maxLandingError,Math.hypot(glider.x-glider.tx,glider.z-glider.tz));}
    if(air)maxAirStep=Math.max(maxAirStep,Math.hypot(glider.x-px,glider.z-pz));wasAir=air;
  }
  add("squirrel observed glides",glides,">",2);add("squirrel observed landings",landed,">",1);samples.glide={seed:7,rng:3,fixture:"original small map",cell:glideMap.cells[0],seconds:120,dt:1/60,glides,landed,maxAirStep,maxLandingError};

  // rules:551: original opt-in scenery map and first roamer in every ninth area, capped at five.
  const rulesT:Tuning={...TUNING,setPieceChance:0.25,grounds:{...TUNING.grounds,kinds:["playground","tennis","baseball","football","basketball"]},decor:{...TUNING.decor,mix:{ruins:1,rocks:1,freak:1}},paths:{...TUNING.paths,pieces:true},scenes:{...TUNING.scenes,featured:undefined}},map=generateMap(123,rulesT),all=spawnCreatures(map),firsts=new Map<string,Creature>();
  for(const c of all)if(!keepsToCircle(c)&&!c.boss&&!firsts.has(`${c.cell}`))firsts.set(`${c.cell}`,c);
  const roamers=[...firsts.values()].filter((_,i)=>i%9===0).slice(0,5),roamSamples=[];
  for(const c of roamers){
    const visited=new Set<string>(),start=[c.x,c.z],k=map.areaSize/112,minutes=40*k*k,square=8*k;
    for(let i=0;i<10*60*minutes;i++){stepCreature(c,1/10,map);if(i%5===0)visited.add(`${Math.floor(c.x/square)},${Math.floor(c.z/square)}`);}
    let squares=0;
    for(let px=c.homeX-c.range;px<c.homeX+c.range;px+=square)for(let pz=c.homeZ-c.range;pz<c.homeZ+c.range;pz+=square){const area=map.areaAt(Math.floor(px/square)*square+square/2,Math.floor(pz/square)*square+square/2).cell;if(area[0]===c.cell[0]&&area[1]===c.cell[1])squares++;}
    add(`roamer ${c.id} visited area grid share`,visited.size/squares,">",0.4,"share");roamSamples.push({id:c.id,cell:c.cell,start,end:[c.x,c.z],minutes,dt:0.1,square,visited:visited.size,squares});
  }
  if(!roamers.length)throw Error("Original roaming scene has no sample creatures");samples.roaming={seed:123,fixture:"full rules opt-in scenery",selection:"first per area, every ninth, first five",roamSamples};

  // simLod:75: original seed7 arena and30s progress plus90s further arrival window.
  const L=TUNING.simLod,lodGame=newGame(7,TUNING);lodGame.clock.paused=false;stepGame(lodGame,{...idle,moveX:1},STEP);setupArena(lodGame,"wolf*1@2,boar*6@2!");
  const home=lodGame.map.dancefloor,marchers=lodGame.arena!.ids.map(id=>lodGame.creatures[id]).filter(c=>c.siege);
  marchers.forEach((c,i)=>{c.x=home.x+L.action+60;c.z=home.z+i*3;c.fight=undefined;lodGame.combat.busy.add(c.id);});
  for(const id of lodGame.arena!.ids)if(!lodGame.creatures[id].siege)lodGame.creatures[id].gone=true;
  lodGame.witches[0].body={...lodGame.witch,seated:false,mode:"treetop",lift:1,x:home.x-2000,z:home.z};
  stepGame(lodGame,idle,STEP);const coarseBefore=lodGame.lod!.marchCoarse,dist=(c:Creature)=>Math.hypot(c.x-home.x,c.z-home.z),d0=marchers.map(dist);
  run(lodGame,30);const progress=marchers.map((c,i)=>({id:c.id,initial:d0[i],distance:dist(c),progress:d0[i]-dist(c),reference:Math.min(marchSpeed(c,TUNING)*30*0.8,d0[i]-L.action-40)}));
  for(const c of progress)add(`coarse marcher ${c.id} thirty-second progress`,c.progress,">",c.reference,"m");
  run(lodGame,90);const coarseAfter=lodGame.lod!.marchCoarse;add("marchers remaining coarse after120s",coarseAfter,"<=",0);
  samples.lod={seed:7,fixture:"wolf*1@2,boar*6@2!",far:L.action+60,away:2000,dt:STEP,progressSeconds:30,totalSeconds:120,coarseBefore,coarseAfter,progress};

  // spacing:40: original seed77 full world, eight distant recruits relocated together,6s with first3s moving east.
  const spacing=newGame(77,TUNING);spacing.clock.paused=false;const d=spacing.map.dancefloor;
  spacing.witch={...spacing.witch,seated:false,x:d.x,z:d.z+20,mode:"ground",lift:0};
  for(const c of spacing.creatures)if(Math.hypot(c.x-spacing.witch.x,c.z-spacing.witch.z)<80&&!c.boss)c.gone=true;
  const party=spacing.creatures.filter(c=>!c.gone&&!c.leashed&&!c.boss&&Math.hypot(c.x-spacing.witch.x,c.z-spacing.witch.z)>200).slice(0,8);
  party.forEach((c,i)=>{Object.assign(c,{species:i<2?"bear":"dormouse",level:1,x:spacing.witch.x+1,z:spacing.witch.z+1,tx:spacing.witch.x,tz:spacing.witch.z,leashed:true});spacing.leash.stack.push(c.id);});
  for(let i=0;i<6/STEP;i++)stepGame(spacing,{...idle,moveX:i*STEP<3?1:0},STEP);
  const B=MOVEMENT.bodies;let closest=Infinity;
  for(const a of party)for(const b of party)if(a!==b)closest=Math.min(closest,Math.hypot(a.x-b.x,a.z-b.z)/((bodyRadius(a)+bodyRadius(b))*B.factor+B.margin));
  add("following party normalized minimum spacing",closest,">",0.6,"ratio");samples.spacing={seed:77,fixture:"full original world",recruits:party.map(c=>c.id),seconds:6,movingSeconds:3,dt:STEP,closest};

  const output=process.env.BEHAVIOUR_OUTPUT_DIR;if(!output)throw Error("Run via node tools/behaviour/run.mjs to preserve report artifacts");
  fs.writeFileSync(path.join(output,"creatures-motion.json"),JSON.stringify({system:"creatures-motion",group:"C1",sourceDeclarations:5,samples,metrics},null,2)+"\n");
},300_000);
