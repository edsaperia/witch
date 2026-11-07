// Bounded offline geometry only: no pixel bake, canvas, browser, renderer or map simulation.
import fs from 'node:fs';
import {witchModel,witchHeight} from '../../art/witch.js';
import {genomeLook} from '../../art/witchGenome.js';
import {render,projectedInterval} from '../../art/model3d.js';
import {defaultStyle} from '../../art/generator.js';
const input=JSON.parse(fs.readFileSync(process.argv[2],'utf8'));
const raw=JSON.parse(fs.readFileSync(new URL('../../config/style.json',import.meta.url),'utf8'));
const style={...defaultStyle(),...(raw.style??raw)};
const look=genomeLook(input.look).look;
function bounds(p){
 if(p.type==='ell'){const extent=Math.hypot(...p.r.map((r,i)=>r*p.axes[i][1]));return [p.c[1]-extent,p.c[1]+extent];}
 if(p.type==='box'){const extent=p.h.reduce((s,h,i)=>s+Math.abs(h*p.axes[i][1]),0);return [p.c[1]-extent,p.c[1]+extent];}
 // model3d uses rounded cones (convex hull of endpoint spheres), NOT a flat-ended frustum.
 if(p.type==='cone')return [Math.min(p.a[1]-p.r1,p.b[1]-p.r2),Math.max(p.a[1]+p.r1,p.b[1]+p.r2)];
 throw Error('Unknown primitive '+p.type);
}
const scale=render(witchModel({frame:0}),{height:witchHeight(style),measure:true}).s;
const mpp=1/(input.artPixelsPerMetre*(2/input.pixelSize)),metresPerModelUnit=scale*mpp;
const result={source:'geometry-only model reconstruction; not baked-pixel/GPU contact',style:{size:style.size,growth:style.growth,pixel:style.pixel},scale,mpp,metresPerModelUnit,frames:[]};
for(const frame of [0,1]){
 const model=witchModel({pose:'stargaze',frame,look});
 const parts=model.parts.filter(p=>!p.extra&&!p.cut&&!(p.group===0&&p.type==='ell'&&Math.abs(p.c[1]-.005)<1e-6));
 const measured=parts.map((p,i)=>({i,type:p.type,group:p.group,material:p.mat,bounds:projectedInterval(p,[0,1,0])})).sort((a,b)=>a.bounds[0]-b.bounds[0]);
 const conservative=Math.min(...parts.map(p=>p.type==='cone'?Math.min(p.a[1]-p.r1,p.b[1]-p.r2):p.c[1]-Math.max(...(p.r??p.h))));
 result.frames.push({frame,primitiveBottomModel:measured[0].bounds[0],primitiveBottomMetres:measured[0].bounds[0]*metresPerModelUnit,conservativeBottomModel:conservative,lowest:measured.slice(0,4)});
}
console.log(JSON.stringify(result,null,2));
