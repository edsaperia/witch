// Numeric CPU render + real bake palette audit, no browser or image export.
import {mkdirSync,readFileSync,writeFileSync} from "node:fs";
import {resolve} from "node:path";
import {execFileSync} from "node:child_process";
import {critter,walkGait,speciesColours} from "../../art/creatures.js";
import {GENOME_BY_ID} from "../../art/genome/index.js";
import {SIZE_CLASSES,SIZE_CLASS_BY_ID,DESIGN_SIZE_RANKS,sizeMultiplier,sizeTargetPixels} from "../../art/genome/size-ranks.js";
import {standingWitchHeight,sizePixelRange} from "../../art/creature-size.js";
import {DEFAULT_ROSTER_IDS} from "../../art/genome/selection.js";
import {bake,M} from "../../art/core.js";
import {defaultStyle} from "../../art/generator.js";
const out=resolve(process.argv[2]??"previews/age-size");mkdirSync(out,{recursive:true});
const auditSource=execFileSync("git",["rev-parse","HEAD"],{encoding:"utf8"}).trim();
const st={...defaultStyle(),...JSON.parse(readFileSync("config/style.json")),artStyle:"bold",pixel:JSON.parse(readFileSync("config/tuning.json")).pixelSize},witch=standingWitchHeight(st);
const makeCanvas=(w,h)=>{let pixels=new Uint8ClampedArray(w*h*4);const ctx={createImageData:(a,b)=>({data:new Uint8ClampedArray(a*b*4),width:a,height:b}),putImageData:image=>{pixels=image.data;},getImageData:()=>({data:pixels})};return {width:w,height:h,getContext:()=>ctx};};
function addColours(seen,bytes){if(seen.size>256)return;const values=new Uint32Array(bytes.buffer,bytes.byteOffset,bytes.byteLength/4);for(const v of values){seen.add(v);if(seen.size>256)break;}}
const only=process.argv[3]?.split(","),prior=only?JSON.parse(readFileSync(resolve(out,"age-sizes.json"))):null;
const cells=prior?prior.cells.filter(c=>!only.includes(c.id)):[],pages=prior?prior.pages.filter(p=>!only.includes(p.id)):[];
for(const id of SIZE_CLASSES.flat().filter(id=>!only||only.includes(id))){
 const A=new Set([0]),N=new Set([0]),dims=[];
 for(const facing of ["towards","away"])for(let level=0;level<4;level++)for(let frame=0;frame<walkGait(id).frames;frame++){
  const start=performance.now(),sp=critter(id,level,frame,st,facing),made=performance.now();
  let lo=sp.h,hi=-1;for(let y=0;y<sp.h;y++)for(let x=0;x<sp.w;x++)if(sp.m[y*sp.w+x]){lo=Math.min(lo,y);hi=Math.max(hi,y);}
  const b=bake(sp,speciesColours(id,st,null,level),st,st.cOutline,makeCanvas),done=performance.now();
  const albedo=b.A.getContext("2d").getImageData().data;
  for(let i=0;i<sp.m.length;i++)if([M.EYE,M.IRIS,M.PUPIL].includes(sp.m[i])&&albedo[i*4+3]===255)albedo[i*4+3]=253;
  addColours(A,albedo);addColours(N,b.N.getContext("2d").getImageData().data);
  const row={id,art:DEFAULT_ROSTER_IDS.includes(id)?"redesigned":"current",class:SIZE_CLASS_BY_ID[id],designRank:DESIGN_SIZE_RANKS.has(id),level,facing,frame,target:sizeTargetPixels(id,level,witch),range:sizePixelRange(id,level,witch),sizeFit:sp.sizeFit,width:sp.w,height:sp.h,occupiedHeight:Math.max(0,hi-lo+1),constructionMs:made-start,bakeMs:done-made};cells.push(row);dims.push(row);
 }
 let x=0,y=0,rowH=0,width=1;for(const s of dims){if(x+s.width+1>2048){x=0;y+=rowH+1;rowH=0;}x+=s.width+1;rowH=Math.max(rowH,s.height);width=Math.max(width,x);}const height=y+rowH,pixels=width*height;
 pages.push({id,width,height,albedoColoursAtMost:A.size,normalColoursAtMost:N.size,albedoIndexed:A.size<=256,normalIndexed:N.size<=256,bytes:pixels*(A.size<=256?1:4)+pixels*(N.size<=256?1:4)+(A.size<=256?1024:0)+(N.size<=256?1024:0)});
 console.log(id);
}
const rows=[];for(let level=0;level<4;level++)for(const id of SIZE_CLASSES.flat()){const c=cells.filter(c=>c.id===id&&c.level===level);rows.push({id,level,class:SIZE_CLASS_BY_ID[id],designRank:DESIGN_SIZE_RANKS.has(id),multiplier:sizeMultiplier(id,level),target:c[0].target,actual:[Math.min(...c.map(r=>r.height)),Math.max(...c.map(r=>r.height))],occupied:[Math.min(...c.map(r=>r.occupiedHeight)),Math.max(...c.map(r=>r.occupiedHeight))],width:Math.max(...c.map(r=>r.width))});}
const ties=[],tieGroups=new Map();for(const c of cells){const key=JSON.stringify([c.level,c.facing,c.frame,c.occupiedHeight]),ids=tieGroups.get(key)??[];ids.push(c.id);tieGroups.set(key,ids);}for(const[key,ids]of tieGroups)if(ids.length>1){const[level,facing,frame,height]=JSON.parse(key);ties.push({level,facing,frame,height,ids});}
const total=pages.reduce((s,p)=>s+p.bytes,0),active=pages.slice().sort((a,b)=>b.bytes-a.bytes).slice(0,8).reduce((s,p)=>s+p.bytes,0);
const summary={source:execFileSync("git",["rev-parse","HEAD"],{encoding:"utf8"}).trim(),tolerance:"At most ±1 native pixel, narrowed by hard bands, growth, legend ratio and ordering",species:Object.keys(GENOME_BY_ID).length,cells:cells.length,witchStandingOccupied:witch,indexedAllSpeciesMiB:total/1048576,eightLargestActiveSpeciesMiB:active/1048576,overflow4096:pages.filter(p=>Math.max(p.width,p.height)>4096),targetMisses:cells.filter(c=>c.occupiedHeight<c.range[0]||c.occupiedHeight>c.range[1]).map(c=>({id:c.id,level:c.level,facing:c.facing,frame:c.frame,target:c.target,range:c.range,actual:c.occupiedHeight})),thirdFullRasters:cells.filter(c=>c.sizeFit?.rasters===3).length,overThreeFullRasters:cells.filter(c=>c.sizeFit?.rasters>3).length,maxSparseProbes:Math.max(...cells.map(c=>c.sizeFit?.probes??0)),maxConstructionMs:Math.max(...cells.map(c=>c.constructionMs)),maxBakeMs:Math.max(...cells.map(c=>c.bakeMs))};
summary.source=auditSource;
const contractFailures=[],at=(id,level)=>rows.find(r=>r.id===id&&r.level===level),pairs=[["tiger","cat"],["wolf","fox"],["fox","stoat"],["elephant","rhino"]];
for(const id of SIZE_CLASSES.flat()){
 for(let level=1;level<4;level++)if(at(id,level).occupied[0]<=at(id,level-1).occupied[1])contractFailures.push(`${id} growth ${level}`);
 if(at(id,3).occupied[0]<at(id,2).occupied[1]*1.75)contractFailures.push(`${id} legend/adult`);
}
for(const a of SIZE_CLASSES.flat())for(const b of SIZE_CLASSES.flat())if(SIZE_CLASS_BY_ID[a]>=SIZE_CLASS_BY_ID[b]+2||pairs.some(([x,y])=>a===x&&b===y))for(let level=0;level<3;level++)if(at(a,level).occupied[0]<=at(b,level).occupied[1])contractFailures.push(`${a} <= ${b} age ${level}`);
summary.contractFailures=contractFailures;
writeFileSync(resolve(out,"age-sizes.json"),JSON.stringify({summary,rows,ties,pages,cells},null,2));
writeFileSync(resolve(out,"age-sizes.md"),`# Combined creature age-size audit\n\nSource ${auditSource}. Standing witch: ${witch} occupied art pixels. At most **±1 native pixel** from the nominal target is permitted, narrowed by hard age bands, strict growth, legend/adult ratio and class ordering. All gait frames and both facings; full allocation includes padding and decoration. Real species use broad mass cohorts; * marks mythical/extinct design placements ([rationale](ranks.md)).\n\nWalk-atlas estimate: ${summary.indexedAllSpeciesMiB.toFixed(2)} MiB all species; ${summary.eightLargestActiveSpeciesMiB.toFixed(2)} MiB eight largest species pages. Real palette indexability, conservative shelf packing; excludes rigs/gear/sleep/wake and is not measured runtime residency. Third full rasters: ${summary.thirdFullRasters}/${cells.length}; over three: ${summary.overThreeFullRasters}; max sparse probes: ${summary.maxSparseProbes}. Cold construction max ${summary.maxConstructionMs.toFixed(0)}ms, bake max ${summary.maxBakeMs.toFixed(0)}ms on the shared laptop; not a gameplay frame-time measurement.\n\n|Age|Class|Species|Art|Nominal px|Safe px interval|Occupied range|Allocated h|Max width|\n|---:|---:|---|---|---:|---|---|---|---:|\n`+rows.map(r=>`|${r.level}|${r.class}|${r.id}${r.designRank?" *":""}|${DEFAULT_ROSTER_IDS.includes(r.id)?"redesigned":"current"}|${r.target}|${sizePixelRange(r.id,r.level,witch).join("–")}|${r.occupied.join("–")}|${r.actual.join("–")}|${r.width}|`).join("\n")+"\n\n## Actual native pixel ties\n\n"+ties.map(t=>`- Age ${t.level}, ${t.facing}, frame ${t.frame}, ${t.height}px: ${t.ids.join(", ")}`).join("\n")+"\n");
console.log(JSON.stringify(summary));
if(summary.targetMisses.length||contractFailures.length||summary.overflow4096.length||summary.overThreeFullRasters)process.exitCode=1;
