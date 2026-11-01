// Recompute the two c680 hardware foreground cases offline with depth coverage and one screenshot-pixel AA margin.
import fs from 'node:fs/promises';
import path from 'node:path';
import {createRequire} from 'node:module';
import {pathToFileURL} from 'node:url';
if(!process.argv[2]||!process.argv[3])throw Error('Usage: node tools/refraction/review-depth-coverage.mjs ARTIFACT_DIRECTORY PINNED_PIXELS_MODULE');
const {decodePng,diffPixels,actorMask}=await import(pathToFileURL(path.resolve(process.argv[3])));
const {depthCoverage}=createRequire(import.meta.url)('./depth-coverage.cjs');
const root=path.resolve(process.argv[2]),results=[];
for(const crossing of [0,1]){
 const dir=path.join(root,`crossing-${crossing}`),json=async n=>JSON.parse(await fs.readFile(path.join(dir,n),'utf8'));
 if((await json('capture.json')).expectedSha!=='c6803bc4a52624737aed3be2a125987c8fc4e2aa')throw Error('This historical review requires exact c680 artifact provenance');
 const [offDepth,absentDepth]=await Promise.all(['off-depth.json','off-nowitch-depth.json'].map(json));
 const [off,on,absent,returned]=await Promise.all(['off','on','off-nowitch','off-return'].map(async n=>decodePng(await fs.readFile(path.join(dir,`${n}.png`)))));
 const {base,mask}=depthCoverage(offDepth,absentDepth,off.width,off.height),compact=({count,max,considered,bounds})=>({count,max,considered,bounds});
 const colorMask=actorMask(off,absent,24),count=m=>[...m].reduce((a,b)=>a+b,0);
 results.push({crossing,baseDepthPixels:count(base),dilatedDepthPixels:count(mask),depthCoverageDiff:compact(diffPixels(off,on,{mask})),offReturn:compact(diffPixels(off,returned)),secondaryColorContrast24:compact(diffPixels(off,on,{mask:colorMask})),historicalNineIncluded:Array.from({length:9},(_,i)=>({x:495+i%3,y:254+Math.floor(i/3),included:!!mask[(254+Math.floor(i/3))*off.width+495+i%3]}))});
}
const result={product:'c6803bc4a52624737aed3be2a125987c8fc4e2aa',source:'saved1543-A hardware maps only',coverage:'OFF front depth differs and nearer than no-witch; map via actual canvas rect/DPR; dilate by1 screenshot pixel including diagonals',differenceThreshold:0,colorContrastThreshold:24,colorContrastIsGate:false,results,depthCoveragePass:results.every(r=>r.depthCoverageDiff.count===0&&r.offReturn.count===0&&r.baseDepthPixels>0),defaultOn:false};
await fs.writeFile(path.join(root,'depth-coverage-review.json'),JSON.stringify(result,null,2));console.log(JSON.stringify(result));
