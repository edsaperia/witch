// Source-only numeric allocation audit. No browser, raster capture, or server.
import {mkdirSync,readFileSync,writeFileSync} from "node:fs";
import {resolve} from "node:path";
import {execFileSync} from "node:child_process";
import {critter,walkGait} from "../../art/creatures.js";
import {withForm} from "../../art/creatures3d.js";
import {render,YAW,PITCH} from "../../art/model3d.js";
import {Sprite} from "../../art/core.js";
import {GENOME_BY_ID} from "../../art/genome/index.js";
import {defaultStyle} from "../../art/generator.js";

const out=resolve(process.argv[2]??"previews/projected-fit");mkdirSync(out,{recursive:true});
const style=JSON.parse(readFileSync("config/style.json")),tuning=JSON.parse(readFileSync("config/tuning.json"));
const st={...defaultStyle(),...style,artStyle:"bold",pixel:tuning.pixelSize};
const dot=(a,b)=>a.reduce((s,v,i)=>s+v*b[i],0);
function sphereMetrics(m,o){
  const yaw=o.yaw??YAW[o.facing]??YAW.towards,pitch=o.pitch??PITCH,sy=Math.sin(yaw),cy=Math.cos(yaw),cp=Math.cos(pitch),sp=Math.sin(pitch);
  const x=p=>p[0]*cy-p[2]*sy,u=p=>p[1]*cp-(p[0]*sy+p[2]*cy)*sp;
  const all=[...m.parts.map(q=>{const flat=false,c=q.c??q.a.map((v,i)=>(v+q.b[i])/2);const r=q.type==="ell"?Math.max(...q.r):q.type==="box"?Math.hypot(...q.h):Math.hypot(...q.a.map((v,i)=>v-q.b[i]))/2+Math.max(q.r1,q.r2);return {q,flat,x:x(c),u:u(c),r:r+(q.rough||0)*1.5};}),...m.flats.map(q=>({q,flat:true,x:x(q.c),u:u(q.c),r:Math.hypot(q.su,q.sv)}))];
  const body=all.filter(p=>!p.q.extra&&!p.q.cut),lo=Math.min(...body.map(p=>p.u-p.r)),hi=Math.max(...body.map(p=>p.u+p.r));
  const scale=o.scale??o.height/(hi-lo),sized=all.filter(p=>!p.q.inside);
  let X0=Math.min(...sized.map(p=>p.x-p.r-(p.flat?0:m.blend))),X1=Math.max(...sized.map(p=>p.x+p.r+(p.flat?0:m.blend))),U0=Math.min(...sized.map(p=>p.u-p.r-(p.flat?0:m.blend))),U1=Math.max(...sized.map(p=>p.u+p.r+(p.flat?0:m.blend)));
  if(m.phaseOnBody&&body.length){const xb=Math.min(...body.map(p=>p.x-p.r-(p.flat?0:m.blend))),ub=Math.max(...body.map(p=>p.u+p.r+(p.flat?0:m.blend)));X0=xb-Math.ceil((xb-X0)*scale-1e-9)/scale;U1=ub+Math.ceil((U1-ub)*scale-1e-9)/scale;}
  return {width:Math.ceil((X1-X0)*scale)+4,height:Math.ceil((U1-U0)*scale)+2,s:scale};
}
const cells=[];
for(const id of Object.keys(GENOME_BY_ID))for(let level=0;level<4;level++)for(const facing of ["towards","away"])for(let frame=0;frame<walkGait(id).frames;frame++){
  let m,o;const form=Object.assign((model,options)=>{m=model;o=options;return new Sprite(1,1);},{motes:false});
  withForm(form,()=>critter(id,level,frame,st,facing));
  const before=sphereMetrics(m,o),after=render(m,{...o,measure:true});
  cells.push({id,level,facing,frame,before,after:{width:after.width,height:after.height,s:after.s},scalePercent:100*(after.s/before.s-1)});
}
const rows=[];
for(const id of Object.keys(GENOME_BY_ID))for(let level=0;level<4;level++){const c=cells.filter(c=>c.id===id&&c.level===level),dim=(key,axis)=>Math.max(...c.map(r=>r[key][axis]));const b=[dim("before","width"),dim("before","height")],a=[dim("after","width"),dim("after","height")];rows.push({id,level,before:b,after:a,heightPercent:100*(a[1]/b[1]-1),widthPercent:100*(a[0]/b[0]-1),areaPercent:100*(a[0]*a[1]/(b[0]*b[1])-1),maxScalePercent:Math.max(...c.map(c=>c.scalePercent))});}
rows.sort((a,b)=>b.heightPercent-a.heightPercent);
const oldArea=cells.reduce((s,c)=>s+c.before.width*c.before.height,0),newArea=cells.reduce((s,c)=>s+c.after.width*c.after.height,0);
const summary={cells:cells.length,rows:rows.length,oldArea,newArea,areaPercent:100*(newArea/oldArea-1),rgbaTwoPlanesMiB:{before:oldArea*8/1048576,after:newArea*8/1048576},over2048:cells.filter(c=>c.after.width+2>2048||c.after.height+2>2048).map(c=>`${c.id}/${c.level}/${c.facing}/${c.frame}`)};
function pack(records,key){let x=0,y=0,row=0,width=1;for(const c of records){const p=c[key];if(x+p.width+1>2048){x=0;y+=row+1;row=0;}x+=p.width+1;row=Math.max(row,p.height);width=Math.max(width,x);}return {width,height:y+row,rgbaMiB:width*(y+row)*8/1048576};}
const pages=Object.keys(GENOME_BY_ID).map(id=>{const c=cells.filter(c=>c.id===id).sort((a,b)=>(a.facing==="towards"?0:1)-(b.facing==="towards"?0:1)||a.level-b.level||a.frame-b.frame);return {id,before:pack(c,"before"),after:pack(c,"after")};});
summary.packedRgbaMiB={before:pages.reduce((s,p)=>s+p.before.rgbaMiB,0),after:pages.reduce((s,p)=>s+p.after.rgbaMiB,0)};
summary.pagesAbove4096=pages.filter(p=>Math.max(p.after.width,p.after.height)>4096);
const sha=execFileSync("git",["rev-parse","HEAD"],{encoding:"utf8"}).trim();
writeFileSync(resolve(out,"sizes.json"),JSON.stringify({sourceBaseCommit:sha,note:"Generated from the implementation tree accompanying this artifact; before is reconstructed sphere allocation on the same models",baseline:"523b5cec + 090f76fd",style:st,summary,rows,cells,pages},null,2));
writeFileSync(resolve(out,"sizes.md"),`# Projected fit size audit\n\nMaximum allocation across both facings and frames per level; sorted by height change. These are allocated sprite rectangles, not occupied silhouette or real-animal metres. Source-only; no ray march or bake timing.\n\n|Species|Level|Before|After|Height %|Width %|Area %|Scale max %|\n|---|---:|---|---|---:|---:|---:|---:|\n`+rows.map(r=>`|${r.id}|${r.level}|${r.before.join("×")}|${r.after.join("×")}|${r.heightPercent.toFixed(1)}|${r.widthPercent.toFixed(1)}|${r.areaPercent.toFixed(1)}|${r.maxScalePercent.toFixed(1)}|`).join("\n")+"\n");
console.log(JSON.stringify({summary,largestHeight:rows.slice(0,12),adults:rows.filter(r=>r.level===2).sort((a,b)=>b.after[1]-a.after[1]).slice(0,15)}));
