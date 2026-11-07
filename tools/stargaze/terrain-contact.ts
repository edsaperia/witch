// Offline local neighbourhood only. Never fill the 400x400 height window or render/bake anything.
import fs from 'node:fs';
import {generateMap} from '../../src/rules/map';
import {Forest} from '../../src/rules/forest';
import {HeightSamples,arrivalHills,RES} from '../../src/rules/heightSamples';
import {DataUtils} from 'three';
const input=JSON.parse(fs.readFileSync(process.argv[2],'utf8'));
const started=performance.now(),map=generateMap(input.seed,input.tuning),forest=new Forest(map);
const height=new HeightSamples(map,forest,arrivalHills(input.tuning),DataUtils),cache=new Map<string,number>();
function texel(i:number,j:number){const key=i+','+j;let v=cache.get(key);if(v===undefined){v=DataUtils.fromHalfFloat(DataUtils.toHalfFloat(height.limited(i,j)));cache.set(key,v);}return v;}
function h(x:number,z:number){const a=x/RES,b=z/RES,i=Math.floor(a),j=Math.floor(b),fx=a-i,fz=b-j;return texel(i,j)*(1-fx)*(1-fz)+texel(i+1,j)*fx*(1-fz)+texel(i,j+1)*(1-fx)*fz+texel(i+1,j+1)*fx*fz;}
const x=input.x,z=input.z,x0=Math.floor(x/4)*4,z0=Math.floor(z/4)*4,fx=(x-x0)/4,fz=(z-z0)/4;
const points=[[x0,z0],[x0,z0+4],[x0+4,z0],[x0+4,z0+4]].map(([x,z])=>({x,z,h:h(x,z)}));
const triangle=fx+fz<=1?[0,1,2]:[1,3,2],weights=fx+fz<=1?[1-fx-fz,fz,fx]:[1-fx,fx+fz-1,1-fz];
const surface=triangle.reduce((a,i,j)=>a+weights[j]*points[i].h,0),sample=h(x,z);
const pixels=JSON.parse(fs.readFileSync(process.argv[3],'utf8')),projection=JSON.parse(fs.readFileSync(process.argv[4],'utf8'));
const angle=projection.stargazeAngleDegrees*Math.PI/180,up=[0,Math.cos(angle),-Math.sin(angle)],curve=input.tuning.camera.curve.treetop*8*projection.bendFactor;
const bend=(yy:number,zz:number)=>yy-curve*Math.max(0,input.focusZ-zz)**2;
function triangleAt(xx:number,zz:number){const a=Math.floor(xx/4)*4,b=Math.floor(zz/4)*4,fx=(xx-a)/4,fz=(zz-b)/4;const vertices=[[a,b],[a,b+4],[a+4,b],[a+4,b+4]],ids=fx+fz<=1?[0,1,2]:[1,3,2],ws=fx+fz<=1?[1-fx-fz,fz,fx]:[1-fx,fx+fz-1,1-fz];return ids.reduce((n,i,j)=>n+ws[j]*bend(h(vertices[i][0],vertices[i][1]),vertices[i][1]),0);}
const contactFrames=pixels.frames.map((f:any)=>{
 const sink=(f.height-f.ground[1])*f.mpp,baseZ=z-up[2]*sink,fw=f.width*f.mpp*.45;
 const gl=Math.min(...[-1,-.5,0,.5,1].map(k=>h(x+k*fw,baseZ)));
 const contacts=f.contacts.map((p:any)=>{const xx=x-(p.x-f.width/2)*f.mpp,zz=z+up[2]*p.upArtMetres,yy=gl+up[1]*p.upArtMetres;return {x:xx,z:zz,bodyY:bend(yy,zz),groundTriangleY:triangleAt(xx,zz),gapMetres:bend(yy,zz)-triangleAt(xx,zz)};});
 const shadowX=x-(f.ground[0]-f.width/2)*f.mpp,shadowZ=z,shadowY=bend(h(shadowX,shadowZ)+.08,shadowZ);
 return {frame:f.frame,spriteGroundSample:gl,sink,baseZ,contacts,shadow:{x:shadowX,z:shadowZ,y:shadowY,groundTriangleY:triangleAt(shadowX,shadowZ),gapMetres:shadowY-triangleAt(shadowX,shadowZ)}};
});
console.log(JSON.stringify({source:'4a95ed595 rules-map and local half-float HeightSamples reconstruction; not captured live GPU state',seed:input.seed,world:input.tuning.map.world,x,z,elapsedMs:performance.now()-started,localTexels:cache.size,points,triangle,weights,sampledGround:sample,groundTriangle:surface,pointSampleMinusTriangle:sample-surface,contactFrames,curve,limitations:['Moving height-window centre/edge fade, float32 instance quantization, pixelSnap, GPU depth and view interpolation were not saved.','Body contact uses the lowest baked opaque texel centres, including outline, not a claim about the visible GPU silhouette after depth testing.','Shadow value is its centre vertex, not the entire shadow mesh or its alpha boundary.']},null,2));
