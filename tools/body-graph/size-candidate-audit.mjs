// Canonical runner: full numerical coverage; no browser or screenshot job.
import {execFileSync} from "node:child_process";
import {mkdirSync,writeFileSync} from "node:fs";
import {resolve} from "node:path";
import {critter,defaultStyle,walkGait} from "../../art/generator.js";
import {SIZE_CLASSES} from "../../art/genome/size-ranks.js";
import {candidateSizePixels} from "../../art/genome/size-candidate.js";
import {standingWitchHeight,occupiedHeight} from "../../art/creature-size.js";
const sha=execFileSync("git",["rev-parse","HEAD"],{encoding:"utf8"}).trim();
if(process.env.WITCH_SHA!==sha)throw new Error("WITCH_SHA must match exact checkout HEAD");
execFileSync("git",["diff","--quiet"]);execFileSync("git",["diff","--cached","--quiet"]);
const out=resolve(process.argv[2]??"previews/size-candidate");mkdirSync(out,{recursive:true});
const st={...defaultStyle(),creatureSizeCandidate:1},witch=standingWitchHeight(st),cells=[],failures=[];
for(const id of SIZE_CLASSES.flat())for(let level=0;level<4;level++)for(const facing of ["towards","away"])for(let frame=0;frame<walkGait(id).frames;frame++){
 const start=performance.now(),sp=critter(id,level,frame,st,facing),fit=sp.sizeFit,target=candidateSizePixels(id,level,witch);
 const cell={id,level,facing,frame,target,body:fit?.bodyHeight,complete:occupiedHeight(sp),width:sp.w,height:sp.h,rasters:fit?.rasters,probes:fit?.probes,ms:performance.now()-start};cells.push(cell);
 if(!Number.isFinite(cell.body)||Math.abs(cell.body-target)>1)failures.push(`${id}/${level}/${facing}/${frame}: body target`);
 if(cell.rasters>3)failures.push(`${id}/${level}/${facing}/${frame}: raster budget`);
}
const range=(id,age)=>cells.filter(c=>c.id===id&&c.level===age).map(c=>c.body);
for(const id of SIZE_CLASSES.flat())for(let age=1;age<4;age++)if(Math.min(...range(id,age))<=Math.max(...range(id,age-1)))failures.push(`${id}: growth ${age}`);
for(let rank=2;rank<SIZE_CLASSES.length;rank++)for(const a of SIZE_CLASSES[rank])for(const b of SIZE_CLASSES[rank-2])for(let age=0;age<4;age++)if(Math.min(...range(a,age))<=Math.max(...range(b,age)))failures.push(`${a}/${b}: order ${age}`);
const summary={sha,witch,cells:cells.length,failures,rasterCounts:Object.fromEntries([1,2,3].map(n=>[n,cells.filter(c=>c.rasters===n).length])),maxProbes:Math.max(...cells.map(c=>c.probes)),measurement:"anatomical body excludes existing extra-tagged decorations and motes; complete extent reported separately"};
writeFileSync(resolve(out,"numeric.json"),JSON.stringify({summary,cells},null,2));console.log(JSON.stringify(summary));
if(failures.length)process.exitCode=1;
