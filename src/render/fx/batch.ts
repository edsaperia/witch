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
  // (an upright's height times iShine when that's set: the party start's pillar, render/partyStart.ts; beams use iShine as a heading)
  float tall=uFlat<0.5&&iDraw>=0.0&&iShine>0.0?iShine:1.0;
  vGrid=vec2(max(1.0,floor(iSize/uMpp+0.5)),max(1.0,floor(iSize*tall/uMpp+0.5)));
  vec2 p=position.xy;
  vec3 w=uFlat>0.5?onGround(iPos+vec3(p.x*iSize,0.06,-p.y*iSize)):onGround(iPos)+uRight*p.x*iSize+uUp*p.y*iSize*tall;
  if(((iUv.x>1.5 && iUv.x<2.5)||iUv.x>10.5) && iDraw<0.0){
    vec2 direction=vec2(cos(iShine),sin(iShine)),side=vec2(-direction.y,direction.x);
    // The quad's top edge points north, matching the ground layers' front-face winding (+Y).
    vec2 q=direction*p.x*(-iDraw)-side*p.y*iSize;
    w=onGround(iPos+vec3(q.x,iUv.x>10.5?p.x*iUv.w:0.0,q.y));vGrid=vec2(max(1.0,floor(-iDraw/uMpp+0.5)),vGrid.y);
  }
  vWorld=w;gl_Position=clipOf(w);
  if(uFlat<0.5)gl_Position.xy+=pixelSnap(clipOf(onGround(iPos)))*gl_Position.w;
  if(overBend(onGround(iPos))<0.5)gl_Position=vec4(2.0,2.0,2.0,1.0);
}`;
const FRAG=/* glsl */ `
uniform sampler2D uFxRamp;uniform float uFxTime,uLayer,uCalm,uSecondary,uDistort,uGlow;uniform vec2 uHalo;uniform vec4 uSpellGlow,uMagicGlow;
varying vec2 vP;varying vec4 vData,vCol;varying vec3 vWorld;varying vec2 vGrid;
${LIGHT_GLSL}
float hash(vec2 q){return fract(sin(dot(q,vec2(127.1,311.7)))*43758.5453);}
vec4 ramp(float tone){return texelFetch(uFxRamp,ivec2(int(clamp(tone,0.0,3.0)),int(vData.y+0.5)),0);}
float bayer2(vec2 a){a=floor(a);return fract(dot(a,vec2(0.5,a.y*0.75)));}
float bayer4(vec2 a){return bayer2(0.5*a)*0.25+bayer2(a);}
// The creatures' spell glow (render/fx/spellGlow.ts; Ed, 2026-11-09: "The animal magic effects need to glow"), layers 4 (standing:
// a glowing core and a dithered halo round it) and 5 (on the ground: its light's pool), both light added on. In whole art pixels
// (vGrid), the halo and the pool in stepped rings dithered by a 4 x 4 Bayer pattern (the brief's "dithered pixel halos"), in its
// element's bright step (or a party animal's neon: its element's row past 100). uSpellGlow: core, halo, pool, the halo's reach.
// Her own magic's (Ed, 2026-11-13: "extend"; its intensity past 10): the same, its strengths uMagicGlow's (attackFx.magicGlow).
void spellGlow(){
  vec3 k=vData.z>5.0?uMagicGlow.xyz:uSpellGlow.xyz;
  float tinted=step(50.0,vData.y),row=vData.y-100.0*tinted,form=vData.x;
  vec3 bright=texelFetch(uFxRamp,ivec2(2,int(row+0.5)),0).rgb,hot=texelFetch(uFxRamp,ivec2(3,int(row+0.5)),0).rgb;
  if(tinted>0.5){bright=vCol.rgb;hot=mix(vCol.rgb,vec3(1.0),0.45);}
  // (every element about as bright as fire's: a pale one, frost's or a yellow neon, added as strongly blows out into white; and its
  // colour pushed further from grey, so a pale element's glow still reads as its colour, not white)
  vec3 luma=vec3(0.2126,0.7152,0.0722);
  float even=clamp(0.55/max(0.05,dot(bright,luma)),0.55,1.15);
  bright=clamp(mix(vec3(dot(bright,luma)),bright,1.6),0.0,1.0);
  vec2 cell=floor((vP*0.5+0.5)*vGrid),p=(cell+0.5)/vGrid*2.0-1.0;
  bool line=(form>1.5&&form<2.5)||form>10.5;
  float a=0.0;vec3 rgb=bright;
  if(uLayer<4.5){
    // s: 1 at the core's edge; the quad reaches uSpellGlow.w times as far
    float s=(line?abs(p.y):length(p))*uSpellGlow.w;
    if(s<0.5){a=k.x*0.9;rgb=mix(bright,hot,0.2);}
    else if(s<0.85)a=k.x*0.5;
    else{
      float t=(s-0.85)/max(0.01,uSpellGlow.w-0.85),band=floor(t*3.0);
      if(band>2.5||bayer4(cell)>0.75-band*0.25)discard;
      a=k.y*(0.34-band*0.11);
    }
    if(line)a*=abs(p.x)>0.92?0.5:1.0;
  }else{
    float s=line?abs(p.y):length(p),band=floor(s*4.0);
    if(band>3.5||bayer4(cell)>1.0-band*0.25)discard;
    a=k.z*(0.5-band*0.12);
    if(line)a*=abs(p.x)>0.9?0.5:1.0;
  }
  a*=vCol.a*even;if(a<0.004)discard;
  // (the pool screen blended: its colour premultiplied)
  gl_FragColor=uLayer>4.5?vec4(haze(rgb,vWorld)*a,a):vec4(haze(rgb,vWorld),a);
}
void main(){
  if(uLayer>3.5){spellGlow();return;}
  float strength=vData.z,phase=vData.w,form=vData.x;
  bool beam=form>1.5 && form<2.5;
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
  float r=length(p),angle=atan(p.y,p.x),d,fill=0.0;
  if(form>10.5)d=max(abs(p.y)*3.0,abs(p.x)*1.1);
  else if(form<0.5 || form>9.5)d=length(p*vec2(1.1,1.3));
  else if(form<1.5)d=r/(0.65+sin(angle*7.0-time)*0.07+phase*0.15);
  // Broader, longer visible core inside the same authored beam quad; endpoints and draw cost stay bounded.
  else if(form<2.5)d=max(abs(p.y)*1.25,abs(p.x)*0.82);
  else if(form<3.5)d=max(abs(r-(0.55+phase*0.25))*5.0,r*0.9);
  else if(form<4.5)d=abs(length(p*vec2(1.0,0.85))-0.62)*6.0;
  else if(form<5.5)d=max(abs(p.x)/(0.15+(1.0-p.y)*0.2),abs(p.y)*1.1);
  else if(form<6.5)d=abs(r-(0.5+sin(angle*3.0+time*2.0+r*8.0)*0.15))*5.0;
  // (a dome's inside filled when its phase is negative, -fill: the party start's, render/partyStart.ts; every other dome a ring)
  else if(form<7.5){float e=length(p*vec2(1.0,0.8));d=abs(e-0.75)*7.0;if(phase<0.0&&e<0.75)fill=-phase*(0.55+0.45*e/0.75);}
  else if(form<8.5)d=abs(r-0.6)*8.0;
  else d=max(abs(p.x)/(0.25+(1.0-p.y)*0.25),abs(p.y))*1.15;
  // Family turbulence must not eat the beam's endpoints (notably fire's E-W segment).
  if(!beam){
    if(motion<0.5)d+=sin(p.x*15.0+time*2.0)*0.08*(p.y+1.0);
    else if(motion<1.5)d+=abs(sin(angle*6.0))*0.17;
    else if(motion>3.5 && motion<4.5)d+=step(0.5,n)*0.18;
  }
  d+=(n-0.5)*0.12;
  if(uDistort>0.5 && strength>0.85)d+=sin(p.y*18.0+time*2.0)*0.035;
  vec3 rgb;float a=1.0;
  // (uGlow, the party start's own batches, render/partyStart.ts: light alone, added on, no dark backing or rim to cover her and the house)
  if(uGlow>0.5&&uLayer<1.5){
    if(uLayer<0.5){a=(1.0-smoothstep(0.4,1.3,d))*0.22;rgb=ramp(1.0).rgb;}
    else{if(d>0.95)discard;rgb=ramp(d<0.3?3.0:d<0.6?2.0:1.0).rgb;a=0.75*(1.0-smoothstep(0.35,0.95,d));}
    if(a<0.01)discard;
  }
  else if(uLayer<0.5){a=(1.0-smoothstep(0.7,1.4,d))*0.65;if(a<0.01)discard;rgb=ramp(0.0).rgb*(uSecondary>0.5?clamp(nightLight(vec3(0.0,1.0,0.0),vWorld),vec3(0.2),vec3(1.25)):vec3(0.65));}
  else if(uLayer<1.5){
    if(d>0.95)discard;
    // A pale family-coloured core and a thin dark border separate from mid-green forest by value.
    if(beam)rgb=d>0.8?ramp(0.0).rgb*0.18:ramp(d<0.55?3.0:2.0).rgb;
    else rgb=ramp(d<0.28?3.0:d<0.5?2.0:d<0.75?1.0:0.0).rgb;
  }
  else if(uLayer<2.5){
    a=(1.0-smoothstep(0.15,1.6,d))*mix(uHalo.x,uHalo.y,strength);rgb=ramp(1.0).rgb;
    float cap=uCalm>0.5?0.12:0.24;
    if(fill>a){a=fill*(uCalm>0.5?0.5:1.0);rgb=mix(ramp(1.0).rgb,ramp(2.0).rgb,0.5);cap=uCalm>0.5?0.2:0.4;}
    if(hash(floor(p*24.0))>a*3.0)discard;a=min(a,cap);
  }
  else { // rising embers, stepped shards, curling drops, forks, dust and petals in one fixed instance pool
    vec2 cell=floor(flow*24.0);float spark=hash(cell);
    bool detail=uSecondary>0.5 && strength>${settings.secondaryAt} && abs(sin(angle*4.0+time+r*9.0))<0.08 && r>0.45 && r<0.8;
    if(!detail && (spark<0.985-strength*0.012 || r>0.95))discard;
    rgb=detail?texelFetch(uFxRamp,ivec2(4,int(vData.y+0.5)),0).rgb:ramp(2.0).rgb;a=0.65;
  }
  if(form>10.5)a*=smoothstep(-1.0,0.7,p.x);
  a*=vCol.a;if(a<0.01)discard;
  gl_FragColor=vec4(haze(rgb*vCol.rgb,vWorld),a);
}`;
/** Screen blending, light added that eases toward white instead of piling past it (1 - (1 - dst)(1 - src)): the spell glow's pool, so
 *  ground already lit (her light, the dancefloor's) isn't blown out into the bloom. */
const SCREEN={blending:THREE.CustomBlending,blendEquation:THREE.AddEquation,blendSrc:THREE.OneMinusDstColorFactor,blendDst:THREE.OneFactor,blendSrcAlpha:THREE.ZeroFactor,blendDstAlpha:THREE.OneFactor} as const;
/** How far the creatures' spell glow's dithered halo reaches past its core: its quad this many times the core's size. */
export const GLOW_SPAN=2.6;
/** How far a halo spreads past its core (1.45 of it), a little wider as its glow is raised. */
export const haloSpread=(glow:number):number=>1.45*(1+0.15*Math.max(0,glow-1));
/** A layer slot's draw order (slots 0 to 3 upright, 4 to 7 on the ground, 8 the canopy halo): the magic's own, or, from `base`, the
 *  ground layers, then the upright ones, then the halo (the party start's over the house: render/partyStart.ts). */
export function fxLayerOrder(slot:number,base?:number):number {
  const through=slot===8,flat=through?0:Math.floor(slot/4),layer=through?2:slot%4;
  // White warning marks (2.97) are composited after every new layer.
  return base!==undefined?base+(through?0.009:flat?layer*0.001:0.004+layer*0.001):through?11.2:flat?2.9+layer*0.01:2.8+layer*0.01;
}
export class FxBatches {
  readonly layers: Instances[]=[];
  readonly time={value:0}; readonly calm={value:0}; readonly secondary={value:1}; readonly distort={value:1};
  readonly mpp={value:0.09375};
  /** The creatures' spell glow's strengths this frame (render/fx/spellGlow.ts): core, halo, pool, and how far the halo reaches (its
   *  quad's size over the core's). */
  readonly spellGlow={value:new THREE.Vector4(0,0,0,GLOW_SPAN)};
  /** Her own magic's glow's strengths this frame (spellGlow.ts magicGlowLook): core, halo, pool. */
  readonly magicGlow={value:new THREE.Vector4(0,0,0,0)};
  private count=0;
  canopy=false;
  /** `order`: its layers' draw order from this (ground layers, then upright ones, then the canopy halo) in place of the magic's own
   *  (2.8 to 2.93, 11.2): the party start's over the house (render/partyStart.ts); `name`, its meshes' names' start; `glow`, every
   *  layer light alone, added on (no dark backing or rim: the party start's, drawn over her and the house). */
  constructor(scene: THREE.Scene, opts: { order?: number; name?: string; glow?: boolean } = {}){
    const data=new Uint8Array(5*ELEMENT_KEYS.length*4);
    ELEMENT_KEYS.forEach((key,row)=>{
      const el=elements[key];[...el.ramp,el.contrast].forEach((hex,col)=>{
        const n=parseInt(hex.slice(1),16),i=(row*5+col)*4;data.set([n>>16,(n>>8)&255,n&255,el.motion],i);
      });
    });
    const ramp=gpuKind(new THREE.DataTexture(data,5,ELEMENT_KEYS.length),"fx");ramp.minFilter=ramp.magFilter=THREE.NearestFilter;ramp.needsUpdate=true;
    for(let slot=0;slot<9;slot++){
      const through=slot===8,flat=through?0:Math.floor(slot/4),layer=through?2:slot%4;
      const mat=new THREE.ShaderMaterial({vertexShader:VERT,fragmentShader:FRAG,uniforms:{...LIGHT_UNIFORMS,...HEIGHT_UNIFORMS,
        uRight:SPRITE_UNIFORMS.uRight,uUp:SPRITE_UNIFORMS.uUp,uRes:SPRITE_UNIFORMS.uRes,uMpp:this.mpp,uHalo:{value:new THREE.Vector2(...settings.halo as [number,number])},uFxRamp:{value:ramp},uFlat:{value:flat},uLayer:{value:layer},uFxTime:this.time,uCalm:this.calm,uSecondary:this.secondary,uDistort:this.distort,uGlow:{value:opts.glow?1:0}},
        transparent:true,depthWrite:false,depthTest:!through,blending:layer>=2||opts.glow?THREE.AdditiveBlending:THREE.NormalBlending});
      const batch=new Instances(mat);batch.mesh.name=`${opts.name??"Magic"} ${through?"canopy halo":`${flat?"ground":"upright"} layer ${layer}`}`;
      // The red warning marks (2.97; Ed, 2026-11-02: "the telegraph should be red") are composited after every new layer.
      batch.mesh.renderOrder=fxLayerOrder(slot,opts.order);scene.add(batch.mesh);this.layers.push(batch);
    }
    // The creatures' spell glow (render/fx/spellGlow.ts): slot 9 standing (its glowing core and dithered halo, after the magic's own
    // standing layers), slot 10 on the ground (its light's pool, under the magic's ground layers), both added light. (None for a
    // light-alone set of batches: the party start's draws no creature spells.)
    this.ramp=ramp;
    if(!opts.glow)for(const flat of [0,1]){
      const batch=this.glowLayer(scene,flat,opts.order!==undefined?opts.order+(flat?-0.0005:0.0045):flat?2.895:2.84,`${opts.name??"Magic"} spell glow ${flat?"pool":"core"}`);
      this.layers.push(batch);this.glows.push(batch);
    }
  }
  private readonly ramp:THREE.DataTexture;
  /** The glow layers (drawn only while something asks: end). */
  private readonly glows:Instances[]=[];
  /** One glow layer: standing (flat 0: glowing cores and dithered halos) or on the ground (flat 1: pools, screen blended). */
  private glowLayer(scene:THREE.Scene,flat:number,order:number,name:string):Instances {
    const mat=new THREE.ShaderMaterial({vertexShader:VERT,fragmentShader:FRAG,uniforms:{...LIGHT_UNIFORMS,...HEIGHT_UNIFORMS,
      uRight:SPRITE_UNIFORMS.uRight,uUp:SPRITE_UNIFORMS.uUp,uRes:SPRITE_UNIFORMS.uRes,uMpp:this.mpp,uHalo:{value:new THREE.Vector2(...settings.halo as [number,number])},uFxRamp:{value:this.ramp},uFlat:{value:flat},uLayer:{value:4+flat},uFxTime:this.time,uCalm:this.calm,uSecondary:this.secondary,uDistort:this.distort,uGlow:{value:0},uSpellGlow:this.spellGlow,uMagicGlow:this.magicGlow},
      transparent:true,depthWrite:false,depthTest:true,...(flat?SCREEN:{blending:THREE.AdditiveBlending})});
    const batch=new Instances(mat);batch.mesh.name=name;batch.mesh.renderOrder=order;batch.mesh.visible=false;scene.add(batch.mesh);
    return batch;
  }
  /** Two more glow layers of these batches at a draw order of their own (her decks' analyser ring's, over the house's floor:
   *  render/leash/decksRing.ts): the same shader, ramp and strengths; begun and ended with the rest. */
  extraGlow(scene:THREE.Scene,order:number,name:string):{core:Instances;pool:Instances} {
    const pool=this.glowLayer(scene,1,order,`${name} glow pool`),core=this.glowLayer(scene,0,order+0.0002,`${name} glow core`);
    this.extras.push(pool,core);this.glows.push(pool,core);
    return {core,pool};
  }
  private readonly extras:Instances[]=[];
  begin(time:number,calm:boolean):void {this.time.value=time;this.calm.value=calm?1:0;this.count=0;for(const b of this.layers)b.begin();for(const b of this.extras)b.begin();}
  /** glow: the halo's strength and spread, times its own (1 for everything but the creatures' attacks: attackFx.visibility.bloom).
   *  tall: an upright's height times this (0: square, as every effect but the party start's pillar). */
  add(x:number,y:number,z:number,size:number,data:number[],alpha:number,ground:boolean,tint:readonly number[]|null=null,particles=true,glow=1,tall=0):void {
    const halo=haloSpread(glow);
    for(let layer=0;layer<(particles?4:3);layer++){
      if(layer!==1){if(this.count>=settings.instances)continue;this.count++;}
      this.layers[(ground?4:0)+layer].add(x,y,z,size*(layer===0?1.12:layer===2?halo:1),data,tint?.[0]??1,tint?.[1]??1,tint?.[2]??1,layer===2?alpha*glow:alpha,1,false,tall);
    }
    if(!ground&&this.canopy&&this.secondary.value>0.5&&this.count<settings.instances){
      this.count++;this.layers[8].add(x,y,z,size*1.5,data,tint?.[0]??1,tint?.[1]??1,tint?.[2]??1,alpha*0.12*glow);
    }
  }
  beam(x:number,y:number,z:number,length:number,heading:number,width:number,data:number[],alpha:number,tint:readonly number[]|null,glow=1):void {
    const halo=haloSpread(glow);
    for(let layer=0;layer<4;layer++){
      if(layer!==1){if(this.count>=settings.instances)continue;this.count++;}
      this.layers[layer].add(x,y,z,width*(layer===0?1.12:layer===2?halo:1),data,tint?.[0]??1,tint?.[1]??1,tint?.[2]??1,layer===2?alpha*glow:alpha,-length,false,heading);
    }
    if(this.canopy&&this.secondary.value>0.5&&this.count<settings.instances){
      this.count++;this.layers[8].add(x,y,z,width*1.5,data,tint?.[0]??1,tint?.[1]??1,tint?.[2]??1,alpha*0.12*glow,-length,false,heading);
    }
  }
  /** The creatures' spell glow standing (render/fx/spellGlow.ts): its glowing core and dithered halo, `size` the core's (the quad
   *  GLOW_SPAN times it). data: form, element (past 100: tinted, its colour the tint's), intensity, phase. */
  glowAt(x:number,y:number,z:number,size:number,data:number[],alpha:number,tint:readonly number[]|null):void {
    if(this.count>=settings.instances||!this.layers[9])return;this.count++;
    this.layers[9].add(x,y,z,size*this.spellGlow.value.w,data,tint?.[0]??1,tint?.[1]??1,tint?.[2]??1,alpha,1,false,0);
  }
  /** Its light's pool on the ground, `size` across (metres). */
  poolAt(x:number,z:number,size:number,data:number[],alpha:number,tint:readonly number[]|null):void {
    if(this.count>=settings.instances||!this.layers[10])return;this.count++;
    this.layers[10].add(x,0,z,size,data,tint?.[0]??1,tint?.[1]??1,tint?.[2]??1,alpha,1,false,0);
  }
  /** Both along a beam or a trail (data's form a beam's or a trail's): standing at y (pool: on the ground), `width` its core's. */
  glowLine(x:number,y:number,z:number,length:number,heading:number,width:number,data:number[],alpha:number,tint:readonly number[]|null,pool:boolean):void {
    if(this.count>=settings.instances||!this.layers[10])return;this.count++;
    this.layers[pool?10:9].add(x,pool?0:y,z,width*(pool?1:this.spellGlow.value.w),data,tint?.[0]??1,tint?.[1]??1,tint?.[2]??1,alpha,-length,false,heading);
  }
  end():void {for(const b of this.layers)b.end();for(const b of this.extras)b.end();for(const b of this.glows)b.mesh.visible=(b.mesh.geometry as THREE.InstancedBufferGeometry).instanceCount>0;}
}
