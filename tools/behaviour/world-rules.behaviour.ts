// W8 shared-rules surveys: original full-map and NET compatibility samples, informational numeric references only.
import fs from "node:fs";
import path from "node:path";
import {it} from "vitest";
import {metric} from "./results.mjs";
import {TUNING as GAME_TUNING, type Tuning} from "../../src/rules/tuning";
import {AREA_TYPES, HOME_LOOK, generateMap} from "../../src/rules/map";
import {Forest, treeChance} from "../../src/rules/forest";
import {makePartition} from "../../src/rules/partition";
import {hash2} from "../../src/rules/random";
import {tuftSpan, tuftsInCell} from "../../src/rules/groundcover";
import {wallFeatures} from "../../src/rules/walls";
import {isInside} from "../../src/rules/mapShape";

// Exact rules.test.ts opt-in scenery fixture. This is not the normal game's scenery configuration.
const TUNING:Tuning={...GAME_TUNING,setPieceChance:0.25,grounds:{...GAME_TUNING.grounds,kinds:["playground","tennis","baseball","football","basketball"]},decor:{...GAME_TUNING.decor,mix:{ruins:1,rocks:1,freak:1}},paths:{...GAME_TUNING.paths,pieces:true},scenes:{...GAME_TUNING.scenes,featured:undefined}};
const NET={...TUNING,paths:{...TUNING.paths,rails:[2,4] as [number,number],linkChance:0.55,deadEndChance:0.3}};

it("reports the remaining seventeen W8 shared-world samples",()=>{
  const metrics:ReturnType<typeof metric>[]=[];
  const add=(id:string,value:number,operator:">"|"<"|">="|"<=",bound:number,unit="count")=>metrics.push(metric(id,value,unit,{operator,value:bound}));
  const samples:Record<string,unknown>={};
  const map=generateMap(123,TUNING),netMap=generateMap(123,NET),forest=new Forest(map),P=netMap.paths,T=NET.paths;

  // rules:65/80: original 200 seed-difference probes and 20x20 sites.
  const a=makePartition(1,4),b=makePartition(2,4);let differ=0;
  for(let i=0;i<200;i++){const x=(i*0.37)%10,y=(i*0.53)%10;if(a.partition(x,y).join()!==b.partition(x,y).join())differ++;}
  const partition=makePartition(5,4);let own=0;
  for(let cx=0;cx<20;cx++)for(let cy=0;cy<20;cy++){const [x,y]=partition.site(cx,cy);if(partition.partition(x,y).join()===[cx,cy].join())own++;}
  add("different-seed partition probes",differ,">",20);add("sites owning their own position",own,">",300);samples.partition={layers:4,differenceSeeds:[1,2],probes:200,ownSeed:5,siteGrid:20,differ,own};

  // rules:301/766: original planting windows and 20x20 eligible-piece grid.
  const trees=forest.treesNear(1300,1300,160),strays=trees.filter(t=>t.type!==map.areaAt(t.x,t.z).type).length;
  const wide=forest.treesNear(map.dancefloor.x+300,map.dancefloor.z+300,300),mine=wide.filter(t=>t.type===map.areaAt(t.x,t.z).type).length;
  add("observed planting strays",strays,">",0);add("wide own planting share",mine/wide.length,">",0.5,"share");samples.planting={sample:[1300,1300,160],wideOffset:[300,300,300],trees:trees.length,strays,wide:wide.length,mine};
  let shown=0,could=0;
  for(let y=0;y<20;y++)for(let x=0;x<20;x++){const type=AREA_TYPES[map.typeOf(x,y)];if(!type.setPiece)continue;could++;if(map.setPieceOf(x,y))shown++;}
  add("eligible set-piece selected share",shown/could,"<",TUNING.setPieceChance*2.5,"share");samples.setPieces={grid:20,chance:TUNING.setPieceChance,shown,could};

  // rules:1049: original 3000 probes, including the same exclusions.
  const chances:number[]=[];
  for(let i=0;i<3000;i++){
    const x=map.bounds.minX+hash2(i,5,9)*(map.bounds.maxX-map.bounds.minX),z=map.bounds.minZ+hash2(i,6,9)*(map.bounds.maxZ-map.bounds.minZ);
    if(map.hardClear(x,z)||map.paths.at(x,z)||map.paths.pieceAt(x,z)||map.arenaOpen(x,z)<1||map.areaAt(x,z).look===HOME_LOOK)continue;
    chances.push(treeChance(map,x,z,map.areaAt(x,z).type));
  }
  const share=(lo:number,hi:number)=>chances.filter(c=>c>=lo&&c<hi).length/chances.length;
  add("dense woods share",share(0.6,9),">",0.08,"share");add("sparse woods share",share(0,0.15),">",0.15,"share");add("middle woods share",share(0.15,0.6),">",0.2,"share");samples.density={probes:3000,eligible:chances.length};

  // rules:1063: original 48 band and 24 beyond-band probes per eligible area.
  const R=TUNING.arena!,scale=TUNING.fight.scale,full=(R.radius+R.band*(1+R.noise))*scale+4,rings=[0,0,0],ringN=[0,0,0],lone=[0,0,0];let beyond=0,outsideTrees=0;
  for(let cy=1;cy<map.n-1;cy++)for(let cx=1;cx<map.n-1;cx++){
    if((cx===map.centreCell[0]&&cy===map.centreCell[1])||!map.playable(cx,cy))continue;
    const s=map.siteOf(cx,cy),mine=(x:number,z:number)=>map.areaAt(x,z).cell.join()===`${cx},${cy}`;
    for(let i=0;i<48;i++){
      const third=i%3,angle=i/48*Math.PI*2,distance=(R.radius+R.band*(third+0.5)/3)*scale,x=s.x+Math.cos(angle)*distance,z=s.z+Math.sin(angle)*distance;
      if(!mine(x,z)||map.hardClear(x,z)||map.paths.at(x,z))continue;
      const c=treeChance(map,x,z,map.areaAt(x,z).type);rings[third]+=c;ringN[third]++;if(c>0&&c<=TUNING.density.lone)lone[third]++;
    }
    for(let i=0;i<24;i++){
      const angle=i/24*Math.PI*2,x=s.x+Math.cos(angle)*full,z=s.z+Math.sin(angle)*full;
      if(!mine(x,z)||map.hardClear(x,z)||map.paths.at(x,z))continue;
      beyond++;if(treeChance(map,x,z,map.areaAt(x,z).type)>=TUNING.density.lone)outsideTrees++;
    }
  }
  const means=rings.map((r,i)=>r/ringN[i]);
  add("first arena-band mean positive",means[0],">",0,"tree chance");add("middle arena-band mean",means[1],">",means[0]*1.5,"tree chance");add("outer arena-band mean",means[2],">",means[1]*1.2,"tree chance");add("first/outer arena-band contrast",means[0],"<",means[2]*0.5,"tree chance");add("first-band lone trees",lone[0],">",0);add("beyond-band restoration",outsideTrees/beyond,">",0.9,"share");samples.arena={bandProbes:48,beyondProbes:24,ringN,means,lone,beyond,outsideTrees};

  // rules:1110/1121/1131: original normal/dense networks and crossings.
  const sparse=generateMap(123,TUNING).paths.lines,densePaths=P.lines.filter(l=>l.kind==="path"),trunk=P.lines.filter(l=>l.kind==="rail"&&l.pts.length>100);
  add("normal footpath abundance",sparse.filter(l=>l.kind==="path").length,"<",densePaths.length/2);
  trunk.forEach((line,index)=>add(`rail ${index} areas crossed`,new Set(line.pts.map(p=>netMap.areaAt(p[0],p[1]).cell.join(","))).size,">",5));
  add("dense network footpaths",densePaths.length,">",20);
  const crossers=densePaths.filter(l=>new Set(l.pts.map(p=>netMap.areaAt(p[0],p[1]).cell.join(","))).size>1);
  add("footpaths crossing areas",crossers.length,">",5);samples.network={seed:123,rails:NET.paths.rails,linkChance:NET.paths.linkChance,deadEndChance:NET.paths.deadEndChance,densePaths:densePaths.length,crossers:crossers.length};

  // rules:1148: original 600m window and 40000 reference-area probes.
  const netForest=new Forest(netMap),s=netMap.start;
  const broken=netForest.treesNear(s.x,s.z,600).filter(t=>{const h=P.at(t.x,t.z);return h?.kind==="rail"&&P.railBroken(t.x,t.z);}).length;
  let edge=0,open=0,edgeN=0,openN=0;
  for(const bush of netForest.bushesNear(s.x,s.z,600)){const h=P.at(bush.x,bush.z,T.edgeBushes);if(h&&h.d<=P.lines[h.line].half)continue;if(h)edge++;else open++;}
  for(let i=0;i<40000;i++){const x=s.x-600+hash2(i,1,3)*1200,z=s.z-600+hash2(i,2,3)*1200,h=P.at(x,z,T.edgeBushes);if(h&&h.d>P.lines[h.line].half)edgeN++;else if(!h)openN++;}
  add("incidental broken-rail trees",broken,">",0);add("corridor-edge bush density",edge/edgeN,">",open/openN*1.5,"bushes/probe");samples.corridors={radius:600,probes:40000,broken,edge,open,edgeN,openN};

  // rules:1172: preserve all six original bridge seeds and the fingerpost opt-in draw.
  const bridgeSamples=[];for(let seed=1;seed<=6;seed++)bridgeSamples.push({seed,bridges:generateMap(seed,NET).paths.pieces.filter(p=>p.id.includes("bridge")).length});
  const bridges=bridgeSamples.reduce((n,s)=>n+s.bridges,0),posts=generateMap(123,{...NET,paths:{...NET.paths,fingerposts:true}}).paths.pieces.filter(p=>p.id==="fingerpost").length;
  add("bridges across six seeds",bridges,">",0);add("enabled fingerpost quantity",posts,">",3);samples.pathPieces={bridgeSamples,fingerpostSeed:123,posts};

  // rules:1200/1221/1231: original full-map/NET queries, not a smaller logic fixture.
  const start=map.start,decor=forest.decorNear(start.x,start.z,700),families=new Set(decor.map(d=>d.family));
  add("decor family occurrence",Number(families.has("ruins")&&families.has("rocks")),">=",1,"boolean");add("decor quantity lower",decor.length,">",5);add("decor quantity upper",decor.length,"<",(1400/TUNING.decor.spacing)**2*0.03);
  add("grounds quantity lower",map.grounds.length,">=",2);add("grounds quantity upper",map.grounds.length,"<=",30);
  const extent=netMap.extent,relics=netForest.relicsNear((extent.minX+extent.maxX)/2,(extent.minZ+extent.maxZ)/2,extent.maxX-extent.minX);
  const byRoad=relics.filter(r=>{const h=P.at(r.x,r.z,20);return h&&(h.kind==="road"||h.kind==="rail");}).length;
  add("modern relic quantity",relics.length,">",3);add("modern relics by road/rail",byRoad,">",0);samples.scenery={decorRadius:700,decor:decor.length,families:[...families],grounds:map.grounds.length,relicExtent:extent,relics:relics.length,byRoad};

  // rules:1513/1524: original tuft grid and nested per-type sampling, including its row-local break.
  const G=TUNING.groundCover,d=map.dancefloor;
  const around=(x:number,z:number,r:number)=>{const out:ReturnType<typeof tuftsInCell>=[],C=tuftSpan(G.cell,G.spacing);for(let cj=Math.floor((z-r)/C);cj<=Math.floor((z+r)/C);cj++)for(let ci=Math.floor((x-r)/C);ci<=Math.floor((x+r)/C);ci++)out.push(...tuftsInCell(map,ci,cj,G.cell,G.spacing,G.density));return out;};
  const tufts=around(d.x+60,d.z+40,70);
  const per=(id:string)=>{let n=0,area=0;for(let y=0;y<map.n;y++)for(let x=0;x<map.n;x++){if(AREA_TYPES[map.typeOf(x,y)].id!==id)continue;const s=map.siteOf(x,y),list=around(s.x+30,s.z+30,8).filter(f=>map.areaAt(f.x,f.z).type===map.typeOf(x,y));n+=list.length;area++;if(area>=3)break;}return {n,area,mean:n/Math.max(1,area)};};
  const grassland=per("grassland"),cave=per("jungle-cave");add("sample groundcover quantity",tufts.length,">",500);add("grassland/cave groundcover contrast",grassland.mean,">",cave.mean*2,"tufts/area");samples.groundcover={offset:[60,40],radius:70,tufts:tufts.length,grassland,cave};

  // rules:1621: same eligible shrine cells and two-neighbours-within-14m proxy.
  let stones=0,inRing=0,shrines=0;
  for(let y=0;y<map.n;y++)for(let x=0;x<map.n;x++){
    if(AREA_TYPES[map.typeOf(x,y)].id!=="stone-shrine")continue;
    const site=map.siteOf(x,y),cell=map.areaAt(site.x,site.z).cell;
    if(cell[0]!==x||cell[1]!==y||!isInside(map.bounds,site.x,site.z,(TUNING.beach?.on?TUNING.beach.width:0)+map.areaSize*0.6))continue;
    const walls=wallFeatures(map,x,y).walls;shrines++;
    for(const p of walls){stones++;if(walls.filter(q=>q!==p&&Math.hypot(q.x-p.x,q.z-p.z)<14).length>=2)inRing++;}
  }
  add("shrine ring-neighbour share",inRing/stones,">",0.8,"share");samples.shrines={shrines,stones,inRing,neighbourDistance:14};

  const out=process.env.BEHAVIOUR_OUTPUT_DIR;if(!out)throw Error("Run via node tools/behaviour/run.mjs to preserve report artifacts");
  fs.writeFileSync(path.join(out,"world-rules.json"),JSON.stringify({system:"world-rules",group:"W8 shared rules",sourceDeclarations:17,auditLines:[65,80,301,766,1049,1063,1110,1121,1131,1148,1172,1200,1221,1231,1513,1524,1621],sourceFile:"src/rules/rules.test.ts",seed:123,samples,metrics},null,2)+"\n");
},300_000);
