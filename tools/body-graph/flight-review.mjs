// Canonical cloud only: fixed-native-scale bat flap or state contact sheet.
// WITCH_GRAPH_CLOUD=1 WITCH_SHA=<head> node tools/body-graph/flight-review.mjs flap|states <age0..3> <out>
import {execFileSync} from "node:child_process";
import {mkdirSync,writeFileSync} from "node:fs";
import {resolve,relative,sep} from "node:path";
import {openBrowser} from "../../art/headless.mjs";
const started=Date.now(),sha=execFileSync("git",["rev-parse","HEAD"],{encoding:"utf8"}).trim();
if(process.env.WITCH_GRAPH_CLOUD!=="1"||process.env.WITCH_SHA!==sha)throw Error("Named canonical cloud allocation and exact source SHA required");
const mode=process.argv[2],age=Number(process.argv[3]);
if(!["flap","states"].includes(mode)||!Number.isInteger(age)||age<0||age>3)throw Error("flap|states and age0..3 required");
execFileSync("git",["diff","--quiet"]);execFileSync("git",["diff","--cached","--quiet"]);
const root=process.cwd(),out=resolve(process.argv[4]??`previews/graph-flight/${sha.slice(0,9)}/${mode}-${age}`);
if(!out.startsWith(root+sep))throw Error("Output outside assigned checkout");
mkdirSync(out,{recursive:true});writeFileSync(resolve(out,"source.json"),JSON.stringify({sha}));
let browser;
const timer=setTimeout(async()=>{writeFileSync(resolve(out,"incomplete.json"),JSON.stringify({sha,mode,age,status:"INCOMPLETE",elapsedMs:Date.now()-started}));try{await browser?.close();}finally{process.exit(1);}},55000);
try{
  browser=await openBrowser();await browser.page.goto(browser.base+"/art/headless-blank.html");
  const source="/"+relative(root,resolve(out,"source.json")).split(sep).join("/");
  if(await browser.page.evaluate(async u=>(await(await fetch(u,{cache:"no-store"})).json()).sha,source)!==sha)throw Error("Served SHA mismatch");
  const result=await browser.page.evaluate(async({sha,mode,age})=>{
    const G=await import("/art/generator.js"),A=await import("/art/body-graph/acceptance.js"),R=await import("/art/model3d.js"),C=await import("/art/creatures3d.js");
    const raw=await(await fetch("/config/style.json")).json(),tuning=await(await fetch("/config/tuning.json")).json();
    const pack=A.createAcceptanceVariants(G.GENOMES.map(g=>G.selectedCreatureGenome(g,{})));
    const st={...G.defaultStyle(),...(raw.style??raw),pixel:tuning.pixelSize,artStyle:"bold",creatureModels:"bat:graph",creatureVariants:pack};
    const S=G.speciesOf(pack.bat.graph),poses=mode==="flap"?Array.from({length:8},(_,i)=>({state:"flap",phase:i/8})): [
      {state:"glide"},{state:"grounded"},{state:"hanging"},
      ...[0,.5,1].map(progress=>({state:"takeoff",progress})),...[0,.5,1].map(progress=>({state:"landing",progress}))];
    const rows=[],metrics=[];
    for(const facing of ["towards","away"]){
      let scale;
      C.withForm((model,options)=>{scale=options.scale;return R.render(model,options).sp;},()=>G.critter("bat",age,0,st,facing));
      if(!(scale>0))throw Error("Game frame0 calibrated scale unavailable");
      for(const pose of poses){
        const {model,meta}=A.buildAcceptanceModel(S,age,0,pose),rendered=R.render(model,{scale,facing});
        const image=G.bake(rendered.sp,G.speciesColours("bat",st,null,age),st,st.cOutline).A;
        rows.push({image,label:`${facing} ${pose.state} phase ${pose.phase??0} progress ${pose.progress??0}`});
        metrics.push({facing,pose,scale,w:rendered.sp.w,h:rendered.sp.h,head:model.anchors.head.c,flight:meta.flight});
      }
    }
    const cellW=Math.max(250,...rows.map(r=>r.image.width+20)),cellH=Math.max(...rows.map(r=>r.image.height))+40;
    const sheet=document.createElement("canvas");sheet.width=cellW*2;sheet.height=70+cellH*poses.length;
    if(sheet.width*4>16384||sheet.height*4>16384)throw Error("Bounded sheet size exceeded");
    const c=sheet.getContext("2d");c.fillStyle="#272532";c.fillRect(0,0,sheet.width,sheet.height);c.fillStyle="#eee";c.font="12px sans-serif";c.imageSmoothingEnabled=false;
    c.fillText(`bat age${age} ${mode} ${sha.slice(0,12)} | default OFF | fixed game frame0 native scale`,8,20);
    c.fillText("Diagnostic poses; reference/photo likeness and gameplay animation NOT accepted by this sheet",8,42);
    rows.forEach((r,i)=>{const col=Math.floor(i/poses.length),row=i%poses.length,x=col*cellW,y=70+row*cellH;c.fillText(r.label,x+8,y+15);c.drawImage(r.image,x+(cellW-r.image.width)/2,y+cellH-r.image.height);});
    const close=document.createElement("canvas");close.width=sheet.width*4;close.height=sheet.height*4;const z=close.getContext("2d");z.imageSmoothingEnabled=false;z.drawImage(sheet,0,0,close.width,close.height);
    return {native:sheet.toDataURL("image/png").split(",")[1],close:close.toDataURL("image/png").split(",")[1],metrics};
  },{sha,mode,age});
  if(browser.errors.length)throw Error(browser.errors.join("\n"));
  for(const [label,data]of [["native",result.native],["4x",result.close]])writeFileSync(resolve(out,`bat-${mode}-${age}-${label}.png`),Buffer.from(data,"base64"));
  writeFileSync(resolve(out,"evidence.json"),JSON.stringify({sha,servedSha:sha,mode,age,elapsedMs:Date.now()-started,status:"COMPLETE",metrics:result.metrics,scope:"fixed frame0 game-calibrated scale; raw shared model poses; no reference, likeness, runtime or live multi-frame acceptance"},null,2));
}finally{clearTimeout(timer);await browser?.close();}
