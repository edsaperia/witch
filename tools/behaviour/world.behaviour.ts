// W8 focused-file surveys: preserve original seeds, spatial samples and references as data, never release assertions.
import fs from "node:fs";
import path from "node:path";
import { it } from "vitest";
import { metric } from "./results.mjs";
import { TUNING, withTuning } from "../../src/rules/tuning";
import { generateMap, type AreaLayout, type ForestMap } from "../../src/rules/map";
import { Forest, patternMask } from "../../src/rules/forest";
import { worldOf, islandOf, homeIsland, REAL_KINDS, dealLegends } from "../../src/rules/rosters";
import { islandOutline } from "../../src/rules/islandShape";
import { STRAIT } from "../../src/rules/archipelago";
import { beachOf } from "../../src/rules/mapShape";
import { BeachDecor } from "../../src/rules/beachDecor";
import { tuftsInCell, TUFT_KINDS } from "../../src/rules/groundcover";
import { lakesOf, mapBiome } from "../../src/rules/lakeLooks";
import { shorePieces, lavaGlows } from "../../src/rules/lakeShore";
import { LAYOUT_PATTERNS } from "../../art/areas.js";
import { zooLayout, reachAt } from "../../src/rules/zooMap";
import { ZOO_CONFIG } from "../../src/rules/zoo";

it("reports W8's twelve focused world samples", () => {
  const metrics: ReturnType<typeof metric>[] = [];
  const add = (id: string, value: number, operator: ">" | "<" | ">=" | "<=", bound: number, unit = "count") => metrics.push(metric(id, value, unit, {operator, value:bound}));
  const samples: Record<string, unknown> = {};

  // archipelago:22: the original world 0, four nearest eligible neighbours, 32-point outlines.
  const W = worldOf(0), home = W.islands.get("home")!, M = W.metres;
  const near = [...W.islands.values()].filter(p => p.id !== "home" && islandOf(p.id)).sort((a,b) => Math.hypot(a.x,a.y)-Math.hypot(b.x,b.y)).slice(0,4);
  const coast = (id: string, x: number, y: number) => {
    const outline = islandOutline(id === "home" ? homeIsland(0,REAL_KINDS.slice(0,64),64) : islandOf(id,0)!,TUNING,32), points: number[] = [];
    for (const loop of outline.loops) if (loop.sea) for (let i=0;i<loop.pts.length;i+=2) points.push(x*M+loop.pts[i],y*M+loop.pts[i+1]);
    return points;
  };
  const H = coast("home",home.x,home.y), gaps = near.map(p => {
    const C = coast(p.id,p.x,p.y);let gap=Infinity;
    for(let i=0;i<H.length;i+=2)for(let j=0;j<C.length;j+=2)gap=Math.min(gap,Math.hypot(H[i]-C[j],H[i+1]-C[j+1]));
    return {id:p.id,gap};
  });
  add("nearest home-neighbour coast",Math.min(...gaps.map(p=>p.gap)),"<",STRAIT*4,"m");samples.archipelago={world:0,outlineResolution:32,gaps};

  // Beach and groundcover use the same original seed 123 full radius map; no extent reduction.
  const map=generateMap(123,TUNING), forest=new Forest(map), beach=beachOf(map.bounds,TUNING)!, K=TUNING.beach!.decor!;
  const decor=new BeachDecor(beach,123,K), pieces=decor.sectorKeys().flatMap(k=>decor.sector(k)), prints=pieces.filter(p=>p.print);
  add("beach footprint quantity",prints.length,">",50);samples.beach={seed:123,prints:prints.length};
  const G=TUNING.groundCover, d=map.dancefloor;
  const cells=(x:number,z:number,r:number,f?:Forest)=>{
    const out:ReturnType<typeof tuftsInCell>=[],span=Math.max(1,Math.round(G.cell/G.spacing))*G.spacing;
    for(let cj=Math.floor((z-r)/span);cj<=Math.floor((z+r)/span);cj++)for(let ci=Math.floor((x-r)/span);ci<=Math.floor((x+r)/span);ci++)out.push(...tuftsInCell(map,ci,cj,G.cell,G.spacing,1,f));
    return out;
  };
  const ponds=forest.lightsNear(d.x,d.z,1500).filter(l=>l.kind==="pond").slice(0,6);let reeds=0;
  for(const pond of ponds)for(const tuft of cells(pond.x,pond.z,3*pond.size+3,forest))if(Math.hypot(tuft.x-pond.x,tuft.z-pond.z)<3*pond.size+1.6&&TUFT_KINDS[tuft.kind]==="reeds")reeds++;
  add("pond rim reeds",reeds,">",5);
  const spots=Array.from({length:64},(_,i)=>[d.x+120+(i%8)*25,d.z+90+Math.floor(i/8)*25]);
  const spot=spots.find(([x,z])=>forest.treesNear(x,z,30).length>12);
  if(!spot)throw Error("Original wooded comparison fixture has no sampled patch");
  const [x,z]=spot,trees=forest.treesNear(x,z,30);
  const nearFeet=(list:{x:number;z:number}[])=>list.filter(t=>trees.some(p=>{const distance=Math.hypot(t.x-p.x,t.z-p.z);return distance>0.35&&distance<1.75;})).length;
  const withForest=nearFeet(cells(x,z,30,forest)),withoutForest=nearFeet(cells(x,z,30));
  add("near-feet tufts with forest",withForest,">",withoutForest);samples.groundcover={seed:123,pondSearch:1500,ponds:ponds.length,pondLimit:6,reeds,woodedSample:spot,trees:trees.length,withForest,withoutForest};

  // bufferClearings:15: all seven original radius/authored-island fixtures.
  const bufferSamples=[];
  for(const [seed,island,islandAreas]of [[123,"home",0],[7,"home",0],[42,"fox",0],[9,"ibex",0],[123,"home",10],[7,"home",10],[42,"fox",10]] as const){
    const m=generateMap(seed,withTuning({map:{...TUNING.map,island,islandAreas}} as never)),L=m.bounds.land!,sand=beachOf(m.bounds,m.tuning);let inland=0,spotsClear=0;
    for(const key of m.neighbours.keys()){
      const [cx,cy]=key.split(",").map(Number),s=m.siteOf(cx,cy),q=m.soundsystemSpot(cx,cy);
      if(m.playable(cx,cy)||m.isLake?.(cx,cy)||L.distAt(s.x,s.z)<0)continue;
      if(L.distAt(q.x,q.z)>60&&m.areaAt(q.x,q.z).cell.join()===key&&!m.isLegendArea?.(cx,cy)&&!((sand?.intoSand(q.x,q.z)??-1)>0)){inland++;if(m.hardClear(q.x,q.z))spotsClear++;}
    }
    add(`incidentally clear buffer spots seed ${seed} ${island} ${islandAreas}`,spotsClear,"<=",Math.ceil(inland*0.25));bufferSamples.push({seed,island,islandAreas,inland,spotsClear});
  }
  samples.buffer=bufferSamples;

  // lakeShore:16/30: original lava island and seed, not a smaller synthetic lake.
  const t={...TUNING,map:{...TUNING.map,island:"stegosaurus"}} as typeof TUNING,lavaMap=generateMap(1,t),L=lavaMap.bounds.lakes!;
  const lava=lakesOf(L,lavaMap.island!.seed,mapBiome(lavaMap.island,t));
  const shore=shorePieces(lavaMap,lava.lake,lava.looks),glows=lavaGlows(lavaMap,lava.lake,lava.looks);
  add("lava shore piece quantity",shore.length,">",50);add("lava shore light quantity",glows.length,">",4);samples.lakeShore={island:"stegosaurus",seed:1,pieces:shore.length,glows:glows.length};

  // layoutPatterns:18/22: the same seed 7 mock map and -58..58 grid at spacing 2.
  const layout=(pattern:string):AreaLayout=>({pattern,along:30,density:0.5,clump:0.7,undergrowth:0.5,lean:{dir:40,amount:0.2},terrain:["hollows"]});
  const fieldMap={seed:7,areaAt:(x:number,z:number)=>({openness:Math.min(1,Math.hypot(x,z)/60)})} as unknown as ForestMap;
  const fields:Record<string,number[]>={};
  for(const pattern of LAYOUT_PATTERNS as string[]){const values:number[]=[];for(let z=-58;z<=58;z+=2)for(let x=-58;x<=58;x+=2)values.push(patternMask(fieldMap,x,z,layout(pattern)));fields[pattern]=values;}
  const mean=(a:number[])=>a.reduce((s,v)=>s+v,0)/a.length;
  const corr=(a:number[],b:number[])=>{const ma=mean(a),mb=mean(b);let sab=0,saa=0,sbb=0;for(let i=0;i<a.length;i++){sab+=(a[i]-ma)*(b[i]-mb);saa+=(a[i]-ma)**2;sbb+=(b[i]-mb)**2;}return saa&&sbb?sab/Math.sqrt(saa*sbb):0;};
  for(const [pattern,values]of Object.entries(fields)){add(`${pattern} mean lower`,mean(values),">",0.6,"mask");add(`${pattern} mean upper`,mean(values),"<",1.5,"mask");}
  const shaped=(LAYOUT_PATTERNS as string[]).filter(p=>!["scatter","lone","thicket"].includes(p));
  for(const p of shaped)add(`${p} sampled range`,Math.max(...fields[p])-Math.min(...fields[p]),">",0.8,"mask");
  for(const a of shaped)for(const b of shaped)if(a<b)add(`${a} / ${b} absolute correlation`,Math.abs(corr(fields[a],fields[b])),"<",0.8,"correlation");
  samples.patterns={seed:7,min:-58,max:58,spacing:2,pointsPerField:fields[shaped[0]].length};

  // mapShape:53: only aesthetic radial ratio moves; boundary agreement remains a blocking test.
  const coastSamples=[];
  for(const seed of [1,123,4242,90210,925469]){
    const m=generateMap(seed,TUNING),sea=m.bounds.land!.loops.find(l=>l.sea)!,far:number[]=[];
    for(let k=0;k<sea.pts.length;k+=2)far.push(Math.hypot(sea.pts[k]-m.dancefloor.x,sea.pts[k+1]-m.dancefloor.z));
    const ratio=Math.max(...far)/Math.min(...far);add(`coast headland/bay ratio seed ${seed}`,ratio,">",1.1,"ratio");coastSamples.push({seed,points:far.length,ratio});
  }
  samples.coasts=coastSamples;

  const rosterHome=homeIsland(123),deals=new Set([1,2,3,4,5,6,7,8].map(n=>dealLegends(rosterHome,n).sort().join()));
  add("home legend deal variety over eight nights",deals.size,">",2);samples.roster={seed:123,nights:[1,2,3,4,5,6,7,8],deals:[...deals]};

  // zooMap:20: retain the original chart size, gap and all-island nearest-street sample.
  const A=TUNING.areaSize*TUNING.areaScale,across=A*(ZOO_CONFIG.size??1);
  const zoo=zooLayout(0,"all",{across,gap:ZOO_CONFIG.gap!,street:ZOO_CONFIG.street,plaza:ZOO_CONFIG.plaza,margin:ZOO_CONFIG.margin!,areaSize:A});
  const street=zoo.islands.map(I=>Math.min(...zoo.islands.filter(J=>J!==I).map(J=>{const a=Math.atan2(J.z-I.z,J.x-I.x);return Math.hypot(J.x-I.x,J.z-I.z)-reachAt(I.reach,a)-reachAt(J.reach,a+Math.PI);}))),sorted=[...street].sort((a,b)=>a-b),median=sorted[Math.floor(sorted.length/2)];
  add("zoo median nearest street lower",median,">",ZOO_CONFIG.gap!,"m");add("zoo median nearest street upper",median,"<=",(ZOO_CONFIG.street??0)+1,"m");samples.zoo={world:0,found:"all",islands:zoo.islands.length,across,street,median};

  const out=process.env.BEHAVIOUR_OUTPUT_DIR;if(!out)throw Error("Run via node tools/behaviour/run.mjs to preserve report artifacts");
  fs.writeFileSync(path.join(out,"world.json"),JSON.stringify({system:"world",group:"W8 focused slice",sourceDeclarations:12,samples,metrics},null,2)+"\n");
},300_000);
