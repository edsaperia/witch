import * as THREE from "three";
import { Instances } from "../leash/glyphs";
import { LIGHT_GLSL, LIGHT_UNIFORMS } from "../lighting";
import { HEIGHT_VERT_GLSL, HEIGHT_UNIFORMS } from "../height";
import { SPRITE_UNIFORMS } from "../sprites";
import { gpuKind } from "../gpuLedger";
import { PIXEL_SNAP_GLSL } from "../shaders";
import { ELEMENT_KEYS, elements, settings } from "./model";
const VERT=/* glsl */ `
uniform vec3 uRight,uUp;
uniform float uFlat,uMpp;uniform vec2 uRes;
attribute vec3 iPos; attribute float iSize,iDraw,iShine; attribute vec4 iUv,iCol;
varying vec2 vP; varying vec4 vData,vCol; varying vec3 vWorld;varying vec2 vGrid;
${HEIGHT_VERT_GLSL}
${PIXEL_SNAP_GLSL}
void main(){
  vP=uv*2.0-1.0;vData=iUv;vCol=iCol;
  vGrid=vec2(max(1.0,floor(iSize/uMpp+0.5)));
  vec2 p=position.xy;
  vec3 w=uFlat>0.5?onGround(iPos+vec3(p.x*iSize,0.06,-p.y*iSize)):onGround(iPos)+uRight*p.x*iSize+uUp*p.y*iSize;
  if(iUv.x>1.5 && iUv.x<2.5 && iDraw<0.0){
    vec2 direction=vec2(cos(iShine),sin(iShine)),side=vec2(-direction.y,direction.x);
    vec2 q=direction*p.x*(-iDraw)+side*p.y*iSize;
    w=onGround(iPos+vec3(q.x,0.0,q.y));vGrid=vec2(max(1.0,floor(-iDraw/uMpp+0.5)),vGrid.y);
  }
  vWorld=w;gl_Position=clipOf(w);
  if(uFlat<0.5)gl_Position.xy+=pixelSnap(clipOf(onGround(iPos)))*gl_Position.w;
  if(overBend(onGround(iPos))<0.5)gl_Position=vec4(2.0,2.0,2.0,1.0);
}`;
const FRAG=/* glsl */ `
uniform sampler2D uFxRamp;uniform float uFxTime,uLayer,uCalm,uSecondary,uDistort;uniform vec2 uHalo;
varying vec2 vP;varying vec4 vData,vCol;varying vec3 vWorld;varying vec2 vGrid;
${LIGHT_GLSL}
float hash(vec2 q){return fract(sin(dot(q,vec2(127.1,311.7)))*43758.5453);}
vec4 ramp(float tone){return texelFetch(uFxRamp,ivec2(int(clamp(tone,0.0,3.0)),int(vData.y+0.5)),0);}
void main(){
  float strength=vData.z,phase=vData.w,form=vData.x;
  float motion=ramp(0.0).a*255.0;
  vec2 p=(floor((vP*0.5+0.5)*vGrid)+0.5)/vGrid*2.0-1.0;
  float time=floor(uFxTime*6.0)/6.0;
  vec2 flow=p;
  if(motion<0.5)flow.y-=time*0.8;
  else if(motion<1.5)flow=floor(p*8.0+time*0.6)/8.0;
  else if(motion<2.5)flow=vec2(atan(p.y,p.x)+time*0.5,length(p)*3.0);
  else if(motion<3.5)flow.x+=sin(p.y*5.0-time)*0.3;
  else if(motion<4.5)flow+=floor(time*2.0)*0.3;
  else if(motion<5.5)flow.y+=time*0.4;
  else if(motion<6.5)flow*=1.0+fract(time*0.3);
  else flow.y-=time*0.25;
  float n=hash(floor(flow*16.0));
  float r=length(p),angle=atan(p.y,p.x),d;
  if(form<0.5 || form>9.5)d=length(p*vec2(1.1,1.3));
  else if(form<1.5)d=r/(0.65+sin(angle*7.0-time)*0.07+phase*0.15);
  else if(form<2.5)d=max(abs(p.y)*3.0,abs(p.x)*1.1);
  else if(form<3.5)d=max(abs(r-(0.55+phase*0.25))*5.0,r*0.9);
  else if(form<4.5)d=abs(length(p*vec2(1.0,0.85))-0.62)*6.0;
  else if(form<5.5)d=max(abs(p.x)/(0.15+(1.0-p.y)*0.2),abs(p.y)*1.1);
  else if(form<6.5)d=abs(r-(0.5+sin(angle*3.0+time*2.0+r*8.0)*0.15))*5.0;
  else if(form<7.5)d=abs(length(p*vec2(1.0,0.8))-0.75)*7.0;
  else if(form<8.5)d=abs(r-0.6)*8.0;
  else d=max(abs(p.x)/(0.25+(1.0-p.y)*0.25),abs(p.y))*1.15;
  if(motion<0.5)d+=sin(p.x*15.0+time*2.0)*0.08*(p.y+1.0);
  else if(motion<1.5)d+=abs(sin(angle*6.0))*0.17;
  else if(motion>3.5 && motion<4.5)d+=step(0.5,n)*0.18;
  d+=(n-0.5)*0.12;
  if(uDistort>0.5 && strength>0.85)d+=sin(p.y*18.0+time*2.0)*0.035;
  vec3 rgb;float a=1.0;
  if(uLayer<0.5){rgb=ramp(0.0).rgb;a=(1.0-smoothstep(0.7,1.4,d))*0.65;}
  else if(uLayer<1.5){if(d>0.95)discard;rgb=ramp(d<0.28?3.0:d<0.5?2.0:d<0.75?1.0:0.0).rgb;}
  else if(uLayer<2.5){a=(1.0-smoothstep(0.15,1.6,d))*mix(uHalo.x,uHalo.y,strength);if(hash(floor(p*24.0))>a*3.0)discard;rgb=ramp(1.0).rgb;a=min(a,uCalm>0.5?0.12:0.24);}
  else { // rising embers, stepped shards, curling drops, forks, dust and petals in one fixed instance pool
    vec2 cell=floor(flow*24.0);float spark=hash(cell);
    bool detail=uSecondary>0.5 && strength>${settings.secondaryAt} && abs(sin(angle*4.0+time+r*9.0))<0.08 && r>0.45 && r<0.8;
    if(!detail && (spark<0.985-strength*0.012 || r>0.95))discard;
    rgb=detail?texelFetch(uFxRamp,ivec2(4,int(vData.y+0.5)),0).rgb:ramp(2.0).rgb;a=0.65;
  }
  a*=vCol.a;if(a<0.01)discard;
  gl_FragColor=vec4(haze(rgb*vCol.rgb,vWorld),a);
}`;
export class FxBatches {
  readonly layers: Instances[]=[];
  readonly time={value:0}; readonly calm={value:0}; readonly secondary={value:1}; readonly distort={value:1};
  readonly mpp={value:0.09375};
  private count=0;
  constructor(scene: THREE.Scene){
    const data=new Uint8Array(5*ELEMENT_KEYS.length*4);
    ELEMENT_KEYS.forEach((key,row)=>{
      const el=elements[key];[...el.ramp,el.contrast].forEach((hex,col)=>{
        const n=parseInt(hex.slice(1),16),i=(row*5+col)*4;data.set([n>>16,(n>>8)&255,n&255,el.motion],i);
      });
    });
    const ramp=gpuKind(new THREE.DataTexture(data,5,ELEMENT_KEYS.length),"fx");ramp.minFilter=ramp.magFilter=THREE.NearestFilter;ramp.needsUpdate=true;
    for(let flat=0;flat<2;flat++)for(let layer=0;layer<4;layer++){
      const mat=new THREE.ShaderMaterial({vertexShader:VERT,fragmentShader:FRAG,uniforms:{...LIGHT_UNIFORMS,...HEIGHT_UNIFORMS,
        uRight:SPRITE_UNIFORMS.uRight,uUp:SPRITE_UNIFORMS.uUp,uRes:SPRITE_UNIFORMS.uRes,uMpp:this.mpp,uHalo:{value:new THREE.Vector2(...settings.halo as [number,number])},uFxRamp:{value:ramp},uFlat:{value:flat},uLayer:{value:layer},uFxTime:this.time,uCalm:this.calm,uSecondary:this.secondary,uDistort:this.distort},
        transparent:true,depthWrite:false,blending:layer>=2?THREE.AdditiveBlending:THREE.NormalBlending});
      const batch=new Instances(mat);batch.mesh.name=`Magic ${flat?"ground":"upright"} layer ${layer}`;
      // White warning marks (2.97) are composited after every new layer.
      batch.mesh.renderOrder=flat?2.9+layer*0.01:2.8+layer*0.01;scene.add(batch.mesh);this.layers.push(batch);
    }
  }
  begin(time:number,calm:boolean):void {this.time.value=time;this.calm.value=calm?1:0;this.count=0;for(const b of this.layers)b.begin();}
  add(x:number,y:number,z:number,size:number,data:number[],alpha:number,ground:boolean,tint:readonly number[]|null=null,particles=true):void {
    for(let layer=0;layer<(particles?4:3);layer++){
      if(layer!==1){if(this.count>=settings.instances)continue;this.count++;}
      this.layers[(ground?4:0)+layer].add(x,y,z,size*(layer===0?1.12:layer===2?1.45:1),data,tint?.[0]??1,tint?.[1]??1,tint?.[2]??1,alpha);
    }
  }
  beam(x:number,y:number,z:number,length:number,heading:number,width:number,data:number[],alpha:number,tint:readonly number[]|null):void {
    for(let layer=0;layer<4;layer++){
      if(layer!==1){if(this.count>=settings.instances)continue;this.count++;}
      this.layers[layer].add(x,y,z,width*(layer===0?1.12:layer===2?1.45:1),data,tint?.[0]??1,tint?.[1]??1,tint?.[2]??1,alpha,-length,false,heading);
    }
  }
  end():void {for(const b of this.layers)b.end();}
}
