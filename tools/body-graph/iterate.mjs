// One-species reference/graph/shipped comparison. Canonical cloud only,55s budget.
// WITCH_GRAPH_CLOUD=1 WITCH_SHA=<head> WITCH_GRAPH_REFERENCE=<published ref-board.png URL> node tools/body-graph/iterate.mjs bear <out>
import {execFileSync} from "node:child_process";
import {mkdirSync,writeFileSync} from "node:fs";
import {resolve,relative,sep} from "node:path";
import {openBrowser} from "../../art/headless.mjs";
import {createHash} from "node:crypto";
const started=Date.now(),sha=execFileSync("git",["rev-parse","HEAD"],{encoding:"utf8"}).trim();
if(process.env.WITCH_GRAPH_CLOUD!=="1"||process.env.WITCH_SHA!==sha)throw Error("Explicit cloud allocation and exact source SHA required");
const id=process.argv[2];if(!["bear","wolf","stag","bat","snail","hydra"].includes(id))throw Error("One acceptance species required");
const reference=process.env.WITCH_GRAPH_REFERENCE;
if(!reference||!reference.startsWith("https://raw.githubusercontent.com/edsaperia/witch/claude/ed-shots/previews/ed/creature-graph/")||!reference.endsWith("/ref-board.png"))throw Error("Published matching-camera reference board URL required");
execFileSync("git",["diff","--quiet"]);execFileSync("git",["diff","--cached","--quiet"]);
const root=process.cwd(),out=resolve(process.argv[3]??`previews/graph-iterate/${id}`);
if(!out.startsWith(root+sep))throw Error("Output outside assigned checkout");
mkdirSync(out,{recursive:true});writeFileSync(resolve(out,"source.json"),JSON.stringify({sha}));
let b;
const timer=setTimeout(async()=>{writeFileSync(resolve(out,"incomplete.json"),JSON.stringify({sha,id,status:"INCOMPLETE",reason:"55s budget exhausted",elapsedMs:Date.now()-started}));try{await b?.close();}finally{process.exit(1);}},55000);
try{
  const response=await fetch(reference,{signal:AbortSignal.timeout(10000)});if(!response.ok)throw Error("Reference download failed");
  const refBytes=Buffer.from(await response.arrayBuffer());if(refBytes.length>8000000)throw Error("Reference board exceeds8MB");
  writeFileSync(resolve(out,"ref-board.png"),refBytes);
  const referenceArtifact={url:reference,sha256:createHash("sha256").update(refBytes).digest("hex"),layout:"2x2: adult/cub rows, towards/away columns",scope:"synthetic anatomy reference; real photographs take precedence"};
  b=await openBrowser();await b.page.goto(b.base+"/art/headless-blank.html");
  const source="/"+relative(root,resolve(out,"source.json")).split(sep).join("/");
  if(await b.page.evaluate(async u=>(await(await fetch(u,{cache:"no-store"})).json()).sha,source)!==sha)throw Error("Served SHA mismatch");
  const refPath="/"+relative(root,resolve(out,"ref-board.png")).split(sep).join("/");
  const result=await b.page.evaluate(async({id,sha,refPath})=>{
    const G=await import("/art/generator.js"),A=await import("/art/body-graph/acceptance.js"),S=await import("/art/body-graph/silhouette.js");
    const records=G.GENOMES.map(g=>G.selectedCreatureGenome(g,{})),pack=A.createAcceptanceVariants(records);
    const raw=await(await fetch("/config/style.json")).json(),tuning=await(await fetch("/config/tuning.json")).json();
    const st={...G.defaultStyle(),...(raw.style??raw),pixel:tuning.pixelSize,artStyle:"bold"},candidate={...st,creatureModels:`${id}:graph`,creatureVariants:pack};
    const rows=[],scores=[];
    const referenceImage=new Image();referenceImage.src=refPath;await referenceImage.decode();
    if(referenceImage.width%2||referenceImage.height%2)throw Error("Reference board must have equal2x2 panels");
    for(const age of [0,1,2,3])for(const facing of ["towards","away"]){
      const time=performance.now(),a=G.critter(id,age,0,st,facing),b=G.critter(id,age,0,candidate,facing),match=S.compareSilhouettes(a,b);
      const native=[G.bake(a,G.speciesColours(id,st,null,age),st,st.cOutline).A,G.bake(b,G.speciesColours(id,candidate,null,age),candidate,st.cOutline).A];
      const overlay=document.createElement("canvas");overlay.width=match.w;overlay.height=match.h;
      const ctx=overlay.getContext("2d"),im=ctx.createImageData(match.w,match.h);
      for(let i=0;i<match.mask.length;i++){const bit=match.mask[i];if(bit){im.data[i*4]=bit&2?255:0;im.data[i*4+1]=bit&1?255:0;im.data[i*4+2]=255;im.data[i*4+3]=255;}}ctx.putImageData(im,0,0);
      const ref=document.createElement("canvas"),cropW=referenceImage.width/2,cropH=referenceImage.height/2;
      ref.height=match.h;ref.width=Math.round(ref.height*cropW/cropH);
      ref.getContext("2d").drawImage(referenceImage,facing==="towards"?0:cropW,age===0?cropH:0,cropW,cropH,0,0,ref.width,ref.height);
      rows.push({age,facing,images:[ref,native[1],native[0],overlay],height:Math.max(a.h,b.h)+28});
      scores.push({age,facing,...match.score,constructionBakeAndScoreMs:performance.now()-time});
    }
    const col=Math.max(...rows.flatMap(r=>r.images.map(i=>i.width)))+24,canvas=document.createElement("canvas");canvas.width=col*4;canvas.height=60+rows.reduce((s,r)=>s+r.height,0);
    if(canvas.width*4>16384||canvas.height*4>16384)throw Error("Sheet exceeds bounded canvas");
    const c=canvas.getContext("2d");c.fillStyle="#272532";c.fillRect(0,0,canvas.width,canvas.height);c.imageSmoothingEnabled=false;c.font="12px sans-serif";c.fillStyle="#eee";c.fillText(`${id} ${sha.slice(0,12)} | graph native pixels; photo scaled | real anatomy decides, IoU is NOT a target`,8,18);
    ["Synthetic reference; real photos win","Graph selected (default off)","Shipped: size/placement only","Cyan shipped / magenta graph / white overlap"].forEach((s,i)=>c.fillText(s,i*col+8,38));
    let y=60;for(const row of rows){row.images.forEach((im,i)=>{c.fillText(`age ${row.age} ${row.facing} IoU ${scores.find(s=>s.age===row.age&&s.facing===row.facing).iou.toFixed(3)}`,i*col+8,y+12);c.drawImage(im,i*col+Math.floor((col-im.width)/2),y+row.height-im.height);});y+=row.height;}
    const close=document.createElement("canvas");close.width=canvas.width*4;close.height=canvas.height*4;const z=close.getContext("2d");z.imageSmoothingEnabled=false;z.drawImage(canvas,0,0,close.width,close.height);
    return {native:canvas.toDataURL("image/png").split(",")[1],close:close.toDataURL("image/png").split(",")[1],scores,preset:pack[id].graph.look.bodyGraphAcceptance};
  },{id,sha,refPath});
  if(b.errors.length)throw Error(b.errors.join("\n"));
  for(const [label,data]of [["native-overlay",result.native],["4x-overlay",result.close]])writeFileSync(resolve(out,`${id}-${label}.png`),Buffer.from(data,"base64"));
  writeFileSync(resolve(out,"evidence.json"),JSON.stringify({sha,servedSha:sha,id,referenceArtifact,elapsedMs:Date.now()-started,scores:result.scores,preset:result.preset,status:"COMPLETE",scope:"frame0 four ages/two facings; real anatomy acceptance, shipped only size/placement; IoU not a target; no perceptual acceptance or runtime-cost claim"},null,2));
}finally{clearTimeout(timer);await b?.close();}
