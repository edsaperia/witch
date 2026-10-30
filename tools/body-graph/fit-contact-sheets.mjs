// CLOUD ONLY after coordinator assignment. Run this driver from the checkout
// being measured (it may be invoked by absolute path from a second checkout).
import {execFileSync} from "node:child_process";
import {mkdirSync,writeFileSync} from "node:fs";
import {resolve,relative,sep} from "node:path";
import {pathToFileURL} from "node:url";
const root=process.cwd(),sha=execFileSync("git",["rev-parse","HEAD"],{encoding:"utf8"}).trim();
if(!process.env.WITCH_SHA||process.env.WITCH_SHA!==sha)throw new Error("Set WITCH_SHA to this checkout's exact commit");
execFileSync("git",["diff","--quiet"]);execFileSync("git",["diff","--cached","--quiet"]);
const out=resolve(process.argv[2]??"previews/projected-fit/sheets");if(!out.startsWith(root+sep))throw new Error("Output must be inside measured checkout");mkdirSync(out,{recursive:true});
writeFileSync(resolve(out,"source.json"),JSON.stringify({sha,label:process.env.FIT_LABEL??"",scope:"64 species, four levels, both facings, all gait frames; albedo and game night"}));
const {openBrowser}=await import(pathToFileURL(resolve(root,"art/headless.mjs")).href),b=await openBrowser();
const metadata=[];
try{
 await b.page.goto(b.base+"/art/headless-blank.html");
 const url="/"+relative(root,resolve(out,"source.json")).split(sep).join("/");
 const served=await b.page.evaluate(async u=>(await(await fetch(u,{cache:"no-store"})).json()).sha,url);if(served!==sha)throw new Error("Served SHA mismatch");
 const ids=await b.page.evaluate(async()=>Object.keys((await import("/art/generator.js")).GENOME_BY_ID));
 for(const id of ids){
  const result=await b.page.evaluate(async({id,sha})=>{
   const G=await import("/art/generator.js"),{shade}=await import("/art/lighting.js"),selection=await import("/art/genome/selection.js");
   const status=(selection.DEFAULT_ROSTER_IDS??[]).includes(id)?"redesigned":"current";
   const st={...G.defaultStyle(),...await(await fetch("/config/style.json")).json(),artStyle:"bold",pixel:(await(await fetch("/config/tuning.json")).json()).pixelSize};
   const rows=[],times=[];
   for(const level of [0,1,2,3])for(const facing of ["towards","away"])for(let frame=0;frame<G.walkGait(id).frames;frame++){
    const start=performance.now(),sp=G.critter(id,level,frame,st,facing),made=performance.now();
    const baked=G.bake(sp,G.speciesColours(id,st,null,level),st,st.cOutline),done=performance.now();
    const night=document.createElement("canvas");night.width=sp.w;night.height=sp.h;
    shade({a:baked.A.getContext("2d"),n:baked.N.getContext("2d"),w:sp.w,h:sp.h},night,st,[],[0,0,sp.w,sp.h]);
    rows.push({level,facing,frame,albedo:baked.A,night,h:sp.h+26});times.push({level,facing,frame,width:sp.w,height:sp.h,constructionMs:made-start,bakeMs:done-made});
   }
   const width=Math.max(...rows.map(r=>r.albedo.width))+24,height=48+rows.reduce((s,r)=>s+r.h,0);if(width>8192||height>16384)throw new Error(`Contact sheet budget exceeded: ${id}`);
   const sheets={};for(const mode of ["albedo","night"]){const c=document.createElement("canvas");c.width=width;c.height=height;const ctx=c.getContext("2d");ctx.imageSmoothingEnabled=false;ctx.fillStyle=mode==="night"?"#12141f":"#292633";ctx.fillRect(0,0,width,height);ctx.fillStyle="#eee";ctx.font="12px sans-serif";ctx.fillText(`${id} ${status} ${mode} ${sha.slice(0,12)} — native pixels`,8,18);let y=48;for(const r of rows){ctx.fillText(`L${r.level} ${r.facing} frame${r.frame} ${r.albedo.width}×${r.albedo.height}`,8,y+12);ctx.drawImage(r[mode],12,y+22);y+=r.h;}sheets[mode]=c.toDataURL("image/png").split(",")[1];}
   return {sheets,times,status};
  },{id,sha});
  for(const [mode,data]of Object.entries(result.sheets))writeFileSync(resolve(out,`${id}-${mode}.png`),Buffer.from(data,"base64"));
  metadata.push({id,status:result.status,times:result.times});console.log(id);
 }
 if(b.errors.length)throw new Error(b.errors.join("\n"));
 writeFileSync(resolve(out,"evidence.json"),JSON.stringify({sha,servedSha:served,species:ids.length,cells:metadata.reduce((s,r)=>s+r.times.length,0),metadata},null,2));
}finally{await b.close();}
