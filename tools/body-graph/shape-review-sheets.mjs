// Canonical CI/cloud only. No laptop browser or heavy art run is allocated.
// WITCH_SHA=<exact head> WITCH_SHAPE_CLOUD=1 node tools/body-graph/shape-review-sheets.mjs <output>
import {execFileSync} from "node:child_process";
import {mkdirSync,writeFileSync} from "node:fs";
import {resolve,relative,sep} from "node:path";
import {openBrowser} from "../../art/headless.mjs";

if(process.env.WITCH_SHAPE_CLOUD!=="1")throw Error("Canonical cloud capture allocation required");
const root=process.cwd(),sha=execFileSync("git",["rev-parse","HEAD"],{encoding:"utf8"}).trim();
if(process.env.WITCH_SHA!==sha)throw Error("WITCH_SHA must name the exact checkout");
execFileSync("git",["diff","--quiet"]);execFileSync("git",["diff","--cached","--quiet"]);
const out=resolve(process.argv[2]??"previews/creature-shapes-stage1");
if(!out.startsWith(root+sep))throw Error("Capture output must be inside the checkout");
mkdirSync(out,{recursive:true});
writeFileSync(resolve(out,"source.json"),JSON.stringify({sha}));
const b=await openBrowser(),metadata=[];
try{
  b.page.setDefaultTimeout(180000);
  await b.page.goto(b.base+"/art/headless-blank.html");
  const source="/"+relative(root,resolve(out,"source.json")).split(sep).join("/");
  const served=await b.page.evaluate(async url=>(await(await fetch(url,{cache:"no-store"})).json()).sha,source);
  if(served!==sha)throw Error("Served source SHA differs");
  for(const id of ["mole","hydra","lion","woodlouse","crocodile"]){
    const result=await b.page.evaluate(async({id,sha})=>{
      const G=await import("/art/generator.js"),{CREATURE_SHAPE_SWITCHES}=await import("/art/genome/shape-candidates.js");
      const {DEFAULT_ROSTER_IDS}=await import("/art/genome/selection.js");
      const raw=await(await fetch("/config/style.json")).json(),tuning=await(await fetch("/config/tuning.json")).json();
      const st={...G.defaultStyle(),...(raw.style??raw),pixel:tuning.pixelSize,artStyle:"bold"};
      for(const key of Object.values(CREATURE_SHAPE_SWITCHES))st[key]=0;
      const key=CREATURE_SHAPE_SWITCHES[id],rows=[],cells=[];
      const fingerprint=sp=>{
        let h=2166136261;for(const bytes of [sp.m,new Uint8Array(sp.n.buffer,sp.n.byteOffset,sp.n.byteLength)])
          for(const v of bytes){h^=v;h=Math.imul(h,16777619);}return `${sp.w}x${sp.h}:${(h>>>0).toString(16)}`;
      };
      for(const age of [0,1,2,3])for(const facing of ["towards","away"]){
        const pair=[];
        for(const flag of [0,1]){
          const style={...st,[key]:flag},start=performance.now();
          const sp=G.critter(id,age,0,style,facing);
          const baked=G.bake(sp,G.speciesColours(id,style,null,age),style,style.cOutline);
          for(const n of sp.n)if(!Number.isFinite(n))throw Error(`${id} has invalid normals`);
          pair.push({canvas:baked.A,origin:sp.origin??[0,sp.h]});
          cells.push({age,facing,flag,width:sp.w,height:sp.h,fingerprint:fingerprint(sp),
            fit:sp.sizeFit??null,constructionAndBakeMs:performance.now()-start});
        }
        const restored=G.critter(id,age,0,st,facing);
        if(fingerprint(restored)!==cells.at(-2).fingerprint)throw Error("Candidate contaminated OFF cache");
        rows.push({age,facing,pair});
      }
      const col=Math.max(...rows.flatMap(r=>r.pair.map(p=>p.canvas.width)))+28;
      const heights=rows.map(r=>Math.max(...r.pair.map(p=>p.canvas.height))+35);
      const canvas=document.createElement("canvas");canvas.width=col*2;canvas.height=64+heights.reduce((a,b)=>a+b,0);
      if(canvas.width*4>16384||canvas.height*4>16384)throw Error("Review sheet exceeds bounded canvas size");
      const c=canvas.getContext("2d");c.imageSmoothingEnabled=false;c.fillStyle="#272532";
      c.fillRect(0,0,canvas.width,canvas.height);c.font="12px sans-serif";c.fillStyle="#eee";
      c.fillText(`${id} | ${sha.slice(0,12)} | matching game art pixels, Bold`,10,16);
      c.fillText(`Before: shipped ${DEFAULT_ROSTER_IDS.includes(id)?"redesigned":"Current"}`,10,35);
      c.fillText(`After: ${key}=1 (default OFF)`,col+10,35);
      let y=64;rows.forEach((r,i)=>{for(let j=0;j<2;j++){
        c.fillText(`age ${r.age} ${r.facing} frame 0`,j*col+10,y+12);
        // Equal unscaled art pixels, not equalized silhouette heights.
        c.drawImage(r.pair[j].canvas,j*col+12,y+22);
      }y+=heights[i];});
      const close=document.createElement("canvas");close.width=canvas.width*4;close.height=canvas.height*4;
      const z=close.getContext("2d");z.imageSmoothingEnabled=false;z.drawImage(canvas,0,0,close.width,close.height);
      return {native:canvas.toDataURL("image/png").split(",")[1],close:close.toDataURL("image/png").split(",")[1],
        key,cells,style:{pixel:st.pixel,artStyle:st.artStyle},scope:"four ages, two facings, neutral walking frame0; not full gait/nap/rig review"};
    },{id,sha});
    for(const [name,data]of [["game",result.native],["4x",result.close]])
      writeFileSync(resolve(out,`${id}-${name}.png`),Buffer.from(data,"base64"));
    metadata.push({id,key:result.key,cells:result.cells,style:result.style,scope:result.scope});
    console.log(`${id}: game and 4x sheets`);
  }
  if(b.errors.length)throw Error(b.errors.join("\n"));
  writeFileSync(resolve(out,"evidence.json"),JSON.stringify({sha,servedSha:served,metadata},null,2));
}finally{await b.close();}
