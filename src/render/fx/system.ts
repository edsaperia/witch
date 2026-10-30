// Drawing only. All gameplay shapes, timing, warnings and hits remain in the attack grammar.
import * as THREE from "three";
import { FxBatches } from "./batch";
import { elements, forms, fxElement, intensityOf, mixIntensity, settings, ELEMENT_KEYS, FORM_KEYS, ImprintField, lightScore, type FxForm, type Imprint } from "./model";
import { FX_UNIFORMS } from "./uniforms";
import { LIGHT_UNIFORMS, MAX_LIGHTS } from "../lighting";
import { groundHeight } from "../height";
import { comfort } from "../comfort";
export const FX_QUALITY = { distortion:true, imprints:true, secondary:true, lightCap:settings.lightCap, particles:1 };
type Light={x:number;y:number;z:number;reach:number;rgb:THREE.Vector3;strength:number;target:number;seen:number;score:number;fade:number};
type Burst={element:string;form:FxForm;x:number;y:number;z:number;level:number;size:number;at:number;life:number;seed:number};
const SYSTEMS=new WeakMap<THREE.Scene,MagicFx>();
export function fxFor(scene:THREE.Scene):MagicFx {let fx=SYSTEMS.get(scene);if(!fx){fx=new MagicFx(scene);SYSTEMS.set(scene,fx);}return fx;}
export class MagicFx {
  readonly quality=FX_QUALITY;
  readonly fieldUniforms=FX_UNIFORMS;
  readonly batches:FxBatches;
  readonly field=new ImprintField();
  readonly stats={lights:0,requests:0,instances:0,fieldBytes:settings.fieldSize**2*8};
  enabled=new URLSearchParams(globalThis.location?.search??"").get("magic")!=="old";
  galleryPage=0;
  galleryElement:string|null=null;
  galleryTime:number|null=null;
  captureTime:number|null=null;
  galleryDark=false;
  galleryCamera:boolean|null=null;
  galleryVisible=true;
  private panel:HTMLElement|null=null;
  private hidden:{object:THREE.Object3D;visible:boolean}[]=[];
  private background:THREE.Scene["background"]=null;
  private lights=new Map<string,Light>();
  private bursts:Burst[]=[];
  private data=[0,0,0,0];
  private selected:Light[]=[];
  private owner:object|null=null;
  private time=0;private dt=0;private cx=0;private cz=0;
  constructor(scene:THREE.Scene){this.batches=new FxBatches(scene);}
  begin(time:number,x:number,z:number,owner:object):void {
    time=this.captureTime??time;
    if(this.owner!==owner || time<this.time){this.reset();this.owner=owner;this.time=time;}
    this.dt=Math.max(0,time-this.time);this.time=time;this.cx=x;this.cz=z;
    this.field.move(x,z);this.field.decay(this.dt);
    this.batches.begin(time,comfort.reduceFlashing);
    this.batches.secondary.value=FX_QUALITY.secondary?1:0;this.batches.distort.value=FX_QUALITY.distortion&&!comfort.reduceFlashing?1:0;
    FX_UNIFORMS.uFxOn.value=this.enabled&&FX_QUALITY.imprints?1:0;
    FX_UNIFORMS.uFxTime.value=time;FX_UNIFORMS.uFxCalm.value=comfort.reduceFlashing?1:0;
    this.stats.instances=0;
  }
  reset():void {this.field.reset();this.lights.clear();this.bursts.length=0;}
  draw(element:string,form:FxForm,x:number,y:number,z:number,level:number,size=1,alpha=1,phase=0,seed=0,tint:readonly number[]|null=null,intensity=intensityOf(level)):void {
    if(!this.enabled || !(alpha>0.01) || Math.hypot(x-this.cx,z-this.cz)>140)return;
    const key=fxElement(element),el=elements[key],f=forms[form];
    const pixel=this.batches.mpp.value;
    const diameter=Math.max(pixel,Math.round(f.size*size*mixIntensity(settings.size,intensity)/pixel)*pixel);
    this.data[0]=f.id;this.data[1]=ELEMENT_KEYS.indexOf(key);this.data[2]=intensity;this.data[3]=phase;
    this.batches.add(x,y,z,diameter,this.data,alpha,f.ground,tint,FX_QUALITY.particles>0.5 || (seed&1)===0);
    this.stats.instances++;
    // An airborne effect has a real ground anchor even when its core is above the canopy.
    if(!f.ground){this.data[0]=forms.zone.id;this.batches.add(x,0,z,Math.min(diameter*0.75,12),this.data,alpha*0.18,true,tint,false);}
    this.light(`${key}:${form}:${seed}`,x,y,z,key,intensity,alpha,tint);
    if(FX_QUALITY.imprints && (form==="burst" || form==="zone" || form==="eruption" || form==="beam" || form==="projectile" || form==="vortex" || form==="pillar")) {
      this.field.stamp(x,z,Math.max(2,Math.min(18,diameter*0.6)),el.imprint as Imprint,intensity*alpha*(form==="projectile"?0.25:1));
    }
  }
  emit(element:string,form:FxForm,x:number,y:number,z:number,level:number,size=1,life=1.2,seed=0):void {
    if(this.bursts.length>=settings.pool)this.bursts.shift();
    this.bursts.push({element,form,x,y,z,level,size,at:this.time,life,seed});
  }
  beam(element:string,x0:number,z0:number,x1:number,z1:number,y:number,width:number,level:number,alpha:number,seed:number,tint:readonly number[]|null=null,intensity=intensityOf(level)):void {
    const length=Math.hypot(x1-x0,z1-z0);if(!this.enabled || length<0.01 || alpha<=0.01)return;
    const key=fxElement(element),x=(x0+x1)/2,z=(z0+z1)/2;
    if(Math.hypot(x-this.cx,z-this.cz)>140+length/2)return;
    this.data[0]=forms.beam.id;this.data[1]=ELEMENT_KEYS.indexOf(key);this.data[2]=intensity;this.data[3]=this.time%1;
    const north=Math.abs(z1-z0)/length;
    this.batches.beam(x,y,z,length,Math.atan2(z1-z0,x1-x0),Math.max(width,this.batches.mpp.value*3)*(1+north*0.35),this.data,alpha,tint);
    const n=Math.min(8,Math.max(1,Math.ceil(length/4)));
    for(let i=0;i<=n;i++){
      const px=x0+(x1-x0)*i/n,pz=z0+(z1-z0)*i/n;
      this.light(`${key}:beam:${seed}:${i}`,px,y,pz,key,intensity,alpha,tint);
      if(FX_QUALITY.imprints)this.field.stamp(px,pz,Math.max(2,width*1.5),elements[key].imprint as Imprint,intensity*alpha);
    }
    this.stats.instances++;
  }
  private light(id:string,x:number,y:number,z:number,element:keyof typeof elements,intensity:number,alpha:number,tint:readonly number[]|null):void {
    let light=this.lights.get(id);
    if(!light){
      if(this.lights.size>=settings.pool){
        const incoming=lightScore(x,z,intensity*alpha,this.cx,this.cz);
        let weakest="",score=Infinity;
        for(const [key,l] of this.lights){const s=lightScore(l.x,l.z,l.target,this.cx,this.cz);if(s<score){weakest=key;score=s;}}
        if(incoming<=score)return;this.lights.delete(weakest);
      }
      light={x,y,z,reach:0,rgb:new THREE.Vector3(),strength:0,target:0,seen:this.time,score:0,fade:0};this.lights.set(id,light);
    }
    const n=parseInt(elements[element].ramp[1].slice(1),16);
    light.x=x;light.y=y;light.z=z;light.reach=mixIntensity(settings.lightReach,intensity);
    light.rgb.set(tint?.[0]??(n>>16)/255,tint?.[1]??((n>>8)&255)/255,tint?.[2]??(n&255)/255);
    light.target=mixIntensity(settings.lightStrength,intensity)*Math.min(1,alpha)*(comfort.reduceFlashing?0.5:1);
    light.seen=this.time;
  }
  finish(budget:number):void {
    let used=0;
    for(const b of this.bursts){
      const age=this.time-b.at;if(age<0 || age>=b.life)continue;this.bursts[used++]=b;
      const phase=age/b.life,alpha=Math.min(1,age/0.2,(b.life-age)/0.3);
      this.draw(b.element,b.form,b.x,b.y,b.z,b.level,b.size,alpha,phase,b.seed);
    }
    this.bursts.length=used;this.batches.end();
    this.field.publish();
    const a=FX_UNIFORMS.uFxField.value.image.data as Uint8Array,b=FX_UNIFORMS.uFxExtra.value.image.data as Uint8Array;
    let active=false;
    for(let i=0,j=0;i<this.field.data.length;i+=8,j+=4)for(let c=0;c<4;c++){
      const av=this.field.data[i+c],bv=this.field.data[i+c+4];if(av || bv)active=true;a[j+c]=av;b[j+c]=bv;
    }
    FX_UNIFORMS.uFxOn.value=active&&this.enabled&&FX_QUALITY.imprints?1:0;
    FX_UNIFORMS.uFxField.value.needsUpdate=true;FX_UNIFORMS.uFxExtra.value.needsUpdate=true;
    FX_UNIFORMS.uFxBox.value.set(this.field.x*this.field.cell,this.field.z*this.field.cell,this.field.metres,this.field.size);
    this.applyLights(budget);
  }
  private applyLights(budget:number):void {
    this.selected.length=0;
    for(const [key,l] of this.lights){
      const present=this.enabled && l.seen===this.time;
      // Linear slew bounds the full rise/fall to at least 200 ms, including reduce flashing.
      const step=this.dt/settings.lightEase;
      l.fade=Math.max(0,Math.min(1,l.fade+(present?step:-step)));
      l.strength=l.target*l.fade;
      if(!present && l.fade<0.001){this.lights.delete(key);continue;}
      l.score=lightScore(l.x,l.z,l.strength,this.cx,this.cz);
      if(Math.hypot(l.x-this.cx,l.z-this.cz)<l.reach+30)this.selected.push(l);
    }
    this.selected.sort((a,b)=>b.score-a.score);
    if(!this.enabled)this.selected.length=0;
    const U=LIGHT_UNIFORMS,limit=Math.max(0,Math.min(MAX_LIGHTS,Math.floor(budget)));
    const cap=Math.min(FX_QUALITY.lightCap,settings.lightCap,limit),n=Math.min(cap,this.selected.length);
    // At least budget-cap slots stay available to the world's existing lights. Strongest nearby effects take the last n.
    const world=Math.min(U.uLightCount.value,Math.max(0,limit-n));
    for(let i=0;i<n;i++){
      const l=this.selected[i];U.uLightPos.value[world+i].set(l.x,groundHeight(l.x,l.z)+l.y,l.z,l.reach);
      const slot=U.uLightCol.value[world+i];
      slot.set(l.rgb.x,l.rgb.y,l.rgb.z,l.strength);
    }
    U.uLightCount.value=world+n;this.stats.lights=n;this.stats.requests=this.lights.size;
  }
  /** The same production layers, not a second mock implementation. One element's complete family and intensity ladder. */
  gallery(element:string,x:number,z:number,time:number):void {
    this.galleryPanel(element);
    if(!this.galleryVisible)return;
    const phase=((this.galleryTime??time)%4)/4;
    if(this.galleryPage===3){
      const el=this.galleryElement??element;
      this.beam(el,x-13,z,x-3,z,1.5,1.4,2,0.8,880001);
      this.beam(el,x+8,z-5,x+8,z+5,1.5,1.4,2,0.8,880002);
      return;
    }
    const family=FORM_KEYS.slice(this.galleryPage*4,this.galleryPage*4+4);
    family.forEach((form,col)=>[0.25,0.6,1].forEach((intensity,row)=>{
      const xx=x+(col-1.5)*10,zz=z+(row-1)*12;
      if(form==="beam"){this.beam(this.galleryElement??element,xx-3,zz,xx+3,zz,1.5,1.4,2,0.8,col*3+row,null,intensity);return;}
      this.draw(this.galleryElement??element,form,xx,forms[form].ground?0:form==="pillar"?5:2,zz,2,1,0.7,phase,col*3+row,null,intensity);
    }));
  }
  private galleryPanel(element:string):void {
    if(this.panel || typeof document==="undefined")return;
    const p=this.panel=document.createElement("aside");p.style.cssText="position:fixed;left:12px;top:12px;z-index:20000;background:#15131eee;color:#fff;padding:12px;font:14px monospace;max-width:420px";
    const title=document.createElement("div");title.textContent="Magic gallery · rows far → near: 0.25 / 0.6 / 1";p.append(title);
    const select=document.createElement("select");select.setAttribute("aria-label","Magic element");
    for(const key of ELEMENT_KEYS){const o=document.createElement("option");o.value=o.textContent=key;select.append(o);}
    select.value=fxElement(element);select.onchange=()=>{this.galleryElement=select.value;};p.append(select);
    const pages=document.createElement("select");pages.setAttribute("aria-label","Magic forms");
    for(let i=0;i<3;i++){const o=document.createElement("option");o.value=String(i);o.textContent=FORM_KEYS.slice(i*4,i*4+4).join(" / ");pages.append(o);}
    const iso=document.createElement("option");iso.value="3";iso.textContent="Equal E–W / N–S beams";pages.append(iso);
    pages.onchange=()=>{this.galleryPage=Number(pages.value);};p.append(pages);
    const button=(label:string,action:()=>void)=>{const b=document.createElement("button");b.textContent=label;b.onclick=action;p.append(b);return b;};
    const pause=button("Pause",()=>{this.galleryTime=this.galleryTime===null?this.time:null;pause.textContent=this.galleryTime===null?"Pause":"Play";});
    const dark=button("Dark ground",()=>{this.galleryDark=!this.galleryDark;dark.textContent=this.galleryDark?"Forest ground":"Dark ground";});
    const camera=button("Treetop camera",()=>{this.galleryCamera=!this.galleryCamera;camera.textContent=this.galleryCamera?"Ground camera":"Treetop camera";});
    document.body.append(p);
  }
  hideBackdrop(scene:THREE.Scene):void {
    if(!this.galleryDark)return;
    this.background=scene.background;scene.background=new THREE.Color("#15131e");
    this.hidden=scene.children.filter(o=>!o.name.startsWith("Magic ")).map(object=>({object,visible:object.visible}));
    for(const h of this.hidden)h.object.visible=false;
  }
  restoreBackdrop(scene:THREE.Scene):void {if(!this.hidden.length)return;for(const h of this.hidden)h.object.visible=h.visible;this.hidden.length=0;scene.background=this.background;}
}
