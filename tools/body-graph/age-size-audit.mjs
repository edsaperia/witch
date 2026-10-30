// Numeric CPU render + real bake palette audit, no browser or image export.
import {mkdirSync,readFileSync,writeFileSync} from "node:fs";
import {resolve} from "node:path";
import {critter,walkGait,speciesColours} from "../../art/creatures.js";
import {GENOME_BY_ID} from "../../art/genome/index.js";
import {SIZE_CLASSES,SIZE_CLASS_BY_ID,DESIGN_SIZE_RANKS,sizeMultiplier,sizeTargetPixels} from "../../art/genome/size-ranks.js";
import {standingWitchHeight} from "../../art/creature-size.js";
import {bake,M} from "../../art/core.js";
import {defaultStyle} from "../../art/generator.js";
const out=resolve(process.argv[2]??"previews/age-size");mkdirSync(out,{recursive:true});
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
  const row={id,class:SIZE_CLASS_BY_ID[id],designRank:DESIGN_SIZE_RANKS.has(id),level,facing,frame,target:sizeTargetPixels(id,level,witch),width:sp.w,height:sp.h,occupiedHeight:Math.max(0,hi-lo+1),constructionMs:made-start,bakeMs:done-made};cells.push(row);dims.push(row);
 }
 let x=0,y=0,rowH=0,width=1;for(const s of dims){if(x+s.width+1>2048){x=0;y+=rowH+1;rowH=0;}x+=s.width+1;rowH=Math.max(rowH,s.height);width=Math.max(width,x);}const height=y+rowH,pixels=width*height;
 pages.push({id,width,height,albedoColoursAtMost:A.size,normalColoursAtMost:N.size,albedoIndexed:A.size<=256,normalIndexed:N.size<=256,bytes:pixels*(A.size<=256?1:4)+pixels*(N.size<=256?1:4)+(A.size<=256?1024:0)+(N.size<=256?1024:0)});
 console.log(id);
}
const rows=[];for(let level=0;level<4;level++)for(const id of SIZE_CLASSES.flat()){const c=cells.filter(c=>c.id===id&&c.level===level);rows.push({id,level,class:SIZE_CLASS_BY_ID[id],designRank:DESIGN_SIZE_RANKS.has(id),multiplier:sizeMultiplier(id,level),target:c[0].target,actual:[Math.min(...c.map(r=>r.height)),Math.max(...c.map(r=>r.height))],occupied:[Math.min(...c.map(r=>r.occupiedHeight)),Math.max(...c.map(r=>r.occupiedHeight))],width:Math.max(...c.map(r=>r.width))});}
const ties=[];for(let level=0;level<4;level++){const map=new Map();for(const r of rows.filter(r=>r.level===level)){const ids=map.get(r.target)??[];ids.push(r.id);map.set(r.target,ids);}for(const [height,ids]of map)if(ids.length>1)ties.push({level,height,ids});}
const total=pages.reduce((s,p)=>s+p.bytes,0),active=pages.slice().sort((a,b)=>b.bytes-a.bytes).slice(0,8).reduce((s,p)=>s+p.bytes,0);
const summary={species:Object.keys(GENOME_BY_ID).length,cells:cells.length,witchStandingOccupied:witch,indexedAllSpeciesMiB:total/1048576,eightLargestActiveSpeciesMiB:active/1048576,overflow4096:pages.filter(p=>Math.max(p.width,p.height)>4096),targetMisses:cells.filter(c=>c.occupiedHeight!==c.target).map(c=>({id:c.id,level:c.level,facing:c.facing,frame:c.frame,target:c.target,actual:c.occupiedHeight})),maxConstructionMs:Math.max(...cells.map(c=>c.constructionMs)),maxBakeMs:Math.max(...cells.map(c=>c.bakeMs))};
writeFileSync(resolve(out,"age-sizes.json"),JSON.stringify({summary,rows,ties,pages,cells},null,2));
writeFileSync(resolve(out,"age-sizes.md"),`# Ranked creature age sizes\n\nStanding witch: ${witch} occupied art pixels. Full sprite allocation includes decorative extras and conservative support/padding; occupied heights are also shown so blank margins cannot be mistaken for visible body. Real species share broad mass classes; design placements marked *. All gait frames and both facings.\n\n|Age|Class|Species|Target ×witch|Target px|Actual sprite h|Occupied h|Max width|\n|---:|---:|---|---:|---:|---|---|---:|\n`+rows.map(r=>`|${r.level}|${r.class}|${r.id}${r.designRank?" *":""}|${r.multiplier.toFixed(3)}|${r.target}|${r.actual.join("–")}|${r.occupied.join("–")}|${r.width}|`).join("\n")+"\n\n## Raster ties\n\n"+ties.map(t=>`- Age ${t.level}, ${t.height}px: ${t.ids.join(", ")}`).join("\n")+"\n");
console.log(JSON.stringify(summary));
