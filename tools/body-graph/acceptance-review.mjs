// Capture the six default-off body-graph comparisons; canonical cloud only.
// WITCH_GRAPH_CLOUD=1 WITCH_SHA=<exact head> node tools/body-graph/acceptance-review.mjs <output>
import {execFileSync} from "node:child_process";
import {mkdirSync,writeFileSync} from "node:fs";
import {resolve,relative,sep} from "node:path";
import {openBrowser} from "../../art/headless.mjs";

if(process.env.WITCH_GRAPH_CLOUD!=="1")throw Error("Canonical cloud allocation required");
const root=process.cwd(),sha=execFileSync("git",["rev-parse","HEAD"],{encoding:"utf8"}).trim();
if(process.env.WITCH_SHA!==sha)throw Error("Exact WITCH_SHA required");
execFileSync("git",["diff","--quiet"]);execFileSync("git",["diff","--cached","--quiet"]);
const out=resolve(process.argv[2]??"previews/body-graph-acceptance");
if(!out.startsWith(root+sep))throw Error("Output must remain within this checkout");
mkdirSync(out,{recursive:true});writeFileSync(resolve(out,"source.json"),JSON.stringify({sha}));
const b=await openBrowser(),results=[];
try{
  b.page.setDefaultTimeout(180000);
  await b.page.goto(b.base+"/art/headless-blank.html");
  const source="/"+relative(root,resolve(out,"source.json")).split(sep).join("/");
  const served=await b.page.evaluate(async u=>(await(await fetch(u,{cache:"no-store"})).json()).sha,source);
  if(served!==sha)throw Error("Served SHA mismatch");
  for(const id of ["bear","wolf","stag","bat","snail","hydra"]){
    const result=await b.page.evaluate(async({id,sha})=>{
      const G=await import("/art/generator.js"),genomes=await import("/art/genome/index.js");
      const A=await import("/art/body-graph/acceptance.js");
      const raw=await(await fetch("/config/style.json")).json(),tuning=await(await fetch("/config/tuning.json")).json();
      const st={...G.defaultStyle(),...(raw.style??raw),pixel:tuning.pixelSize,artStyle:"bold"};
      const pack=A.createAcceptanceVariants(genomes.GENOMES.map(g=>genomes.selectedCreatureGenome(g,{})));
      const rows=[],cells=[];
      const fingerprint=sp=>{let h=2166136261;for(const bytes of [sp.m,new Uint8Array(sp.n.buffer,sp.n.byteOffset,sp.n.byteLength)])for(const v of bytes){h^=v;h=Math.imul(h,16777619);}return `${sp.w}x${sp.h}:${(h>>>0).toString(16)}`;};
      for(const age of [0,1,2,3])for(const facing of ["towards","away"]){
        const images=[];
        for(const mode of ["shipped","graph"])for(const frame of [0,1]){
          const style=mode==="graph"?{...st,creatureModels:`${id}:graph`,creatureVariants:pack}:st;
          const start=performance.now(),sp=G.critter(id,age,frame,style,facing);
          const baked=G.bake(sp,G.speciesColours(id,style,null,age),style,style.cOutline);
          if(!Array.from(sp.n).every(Number.isFinite))throw Error("Non-finite normals");
          cells.push({age,facing,mode,frame,width:sp.w,height:sp.h,fingerprint:fingerprint(sp),sizeFit:sp.sizeFit??null,coldConstructionAndBakeMs:performance.now()-start});
          images.push(baked.A);
        }
        if(fingerprint(G.critter(id,age,0,st,facing))!==cells.at(-4).fingerprint)throw Error("Graph contaminated shipped cache");
        rows.push({age,facing,images});
      }
      const col=Math.max(...rows.flatMap(r=>r.images.map(c=>c.width)))+22;
      const heights=rows.map(r=>Math.max(...r.images.map(c=>c.height))+30);
      const canvas=document.createElement("canvas");canvas.width=col*4;canvas.height=60+heights.reduce((a,b)=>a+b,0);
      if(canvas.width*4>16384||canvas.height*4>16384)throw Error("Bounded sheet size exceeded");
      const c=canvas.getContext("2d");c.imageSmoothingEnabled=false;c.fillStyle="#272532";c.fillRect(0,0,canvas.width,canvas.height);c.font="12px sans-serif";c.fillStyle="#eee";
      c.fillText(`${id} ${sha.slice(0,12)} | native game pixels | two-frame walk strips`,10,17);
      for(let j=0;j<4;j++)c.fillText(`${j<2?"Shipped":"Graph OFF"} frame ${j%2}`,j*col+10,38);
      let y=60;rows.forEach((r,i)=>{r.images.forEach((im,j)=>{c.fillText(`age ${r.age} ${r.facing}`,j*col+10,y+12);c.drawImage(im,j*col+10,y+22);});y+=heights[i];});
      const close=document.createElement("canvas");close.width=canvas.width*4;close.height=canvas.height*4;
      const ctx=close.getContext("2d");ctx.imageSmoothingEnabled=false;ctx.drawImage(canvas,0,0,close.width,close.height);
      return {native:canvas.toDataURL("image/png").split(",")[1],close:close.toDataURL("image/png").split(",")[1],cells,style:{pixel:st.pixel,artStyle:st.artStyle}};
    },{id,sha});
    for(const [label,data]of [["native-walk",result.native],["4x-walk",result.close]])writeFileSync(resolve(out,`${id}-${label}.png`),Buffer.from(data,"base64"));
    results.push({id,cells:result.cells,style:result.style});
  }
  if(b.errors.length)throw Error(b.errors.join("\n"));
  writeFileSync(resolve(out,"evidence.json"),JSON.stringify({sha,servedSha:served,results,costScope:"One cold construction+bake sample per cell, including selected native fitting; not steady-state live-rig frame time. Two baked walk frames, not turning/terrain proof."},null,2));
}finally{await b.close();}
