// Drawing only. All gameplay shapes, timing, warnings and hits remain in the attack grammar.
import * as THREE from "three";
import { FxBatches } from "./batch";
import { elements, forms, fxElement, intensityOf, mixIntensity, settings, ELEMENT_KEYS, FORM_KEYS, ImprintField, lightScore, type FxForm, type Imprint } from "./model";
import { FX_UNIFORMS } from "./uniforms";
import { LIGHT_UNIFORMS, MAX_LIGHTS } from "../lighting";
import { groundHeight } from "../height";
import { comfort } from "../comfort";
import { native, NATIVE_ON, type NativeFx } from "./native";
import layerPolicy from "../../../config/fx/layers.json";
import { sourcePattern, PATTERN_LOOK, type PatternLook } from "../lightPatternState";
import { trimLightPatterns, writeLightPattern } from "../lightPatternUniforms";
import { easeRoom, pickLights, HER_LIGHTS, MAGIC_GLOW, magicGlowLook, SPELL_GLOW, type GlowLook, type MagicGlowTuning } from "./spellGlow";
export const FX_QUALITY = { distortion:true, imprints:true, secondary:true, lightCap:settings.lightCap, particles:1 };
/** fade: eased with its presence; slot: eased with its holding a light slot; spell: a creature's spell's (attackFx.glow.lights caps
 *  those); hers: her own cast magic's (first claim on the slots: spellGlow.ts HER_LIGHTS). */
type Light={x:number;y:number;z:number;reach:number;rgb:THREE.Vector3;strength:number;target:number;seen:number;score:number;fade:number;slot:number;spell:boolean;hers:boolean;pattern?:boolean};
/** hers: her own magic's (it glows as hers: MagicFx.her). */
type Burst={element:string;form:FxForm;x:number;y:number;z:number;level:number;size:number;at:number;life:number;seed:number;hers:boolean};
/** A streak of her magic's glow along a line on her clock (her blink's: from where she was to where she lands), fading over `life`. */
type Streak={element:string;x0:number;z0:number;x1:number;z1:number;y:number;width:number;at:number;life:number};
/** Whose light: 0 any effect's; 1 her own magic's (its strength attackFx.magicGlow.light's while her glow's on); 2 her cast magic's
 *  (the same, and first claim on the light slots). */
export type Mine=0|1|2;
/** A native adapter's glow (config/fx/native.json `glow`; Ed, 2026-11-13: "extend"): its glowing core and halo `core` strong and
 *  `size` m across (0: none, where a core would cover her or a sigil's glyph), its pool on the ground `pool` strong and `poolSize` m
 *  across; `lift`: its core this far over where it's given (m; the ley line's spark burns 1 m over its light); `light`: its real
 *  light's strength while her glow's on, in place of the adapter's own (the spark earns one: its own lights nothing to speak of);
 *  `claim`: its light her cast magic's (first claim on the slots). */
interface NativeGlow{core:number;size:number;pool:number;poolSize:number;lift?:number;light?:number;claim?:boolean}
/** Past this in a glow instance's intensity: her own magic's (render/fx/batch.ts spellGlow). */
const HER_DATA=10;
const SYSTEMS=new WeakMap<THREE.Scene,MagicFx>();
// The uniforms are shared: another scene's field must not be mistaken for our cached upload.
let uploadedField:ImprintField|null=null;
/** A trail's look, times the ribbon's own: width, opacity (its own 0.6), seconds of flight (its own up to 0.32 s) and glow. */
export interface RibbonLook{width:number;alpha:number;life:number;glow:number}
const PLAIN_RIBBON:RibbonLook={width:1,alpha:0.6,life:1,glow:1};
/** A raised glow lifts an effect's light too, by half as much, at most 1.5 times (lights wash the scenery: kept gentle). */
export const lightGain=(glow:number):number=>Math.max(0,Math.min(1.5,1+(glow-1)*0.5));
export function fxFor(scene:THREE.Scene):MagicFx {let fx=SYSTEMS.get(scene);if(!fx){fx=new MagicFx(scene);SYSTEMS.set(scene,fx);}return fx;}
export class MagicFx {
  readonly quality=FX_QUALITY;
  readonly fieldUniforms=FX_UNIFORMS;
  readonly batches:FxBatches;
  readonly field=new ImprintField();
  readonly stats={lights:0,requests:0,instances:0,fieldBytes:settings.fieldSize**2*8,fieldCopyValues:0};
  enabled=new URLSearchParams(globalThis.location?.search??"").get("magic")!=="old";
  /** The creatures' spell glow on (render/fx/spellGlow.ts; ?spellglow=0 off), for the captures' before and after on one frame. */
  get spellGlow():boolean {return SPELL_GLOW.on;}
  set spellGlow(on:boolean){SPELL_GLOW.on=on;}
  /** Her own magic's glow on (spellGlow.ts MAGIC_GLOW; ?magicglow=0 off), flipped live the same way. */
  get magicGlow():boolean {return MAGIC_GLOW.on;}
  set magicGlow(on:boolean){MAGIC_GLOW.on=on;}
  /** This frame's glow for her own magic (hers(), after begin): the tuning's attackFx.magicGlow after ?magicglow and Reduce
   *  flashing; null, none (her magic as before). Pass it as an effect's `look` to make that effect glow as hers. */
  her:GlowLook|null=null;
  private mine=false;
  private streaks:Streak[]=[];
  galleryPage=0;
  galleryElement:string|null=null;
  galleryTime:number|null=null;
  captureTime:number|null=null;
  galleryDark=false;
  galleryCamera:boolean|null=null;
  galleryVisible=true;
  galleryLegacyVisible=true;
  legacyParty:((x:number,y:number,z:number,age:number)=>void)|null=null;
  private panel:HTMLElement|null=null;
  private hidden:{object:THREE.Object3D;visible:boolean}[]=[];
  private background:THREE.Scene["background"]=null;
  private lights=new Map<string,Light>();
  private bursts:Burst[]=[];
  private data=[0,0,0,0];
  private selected:Light[]=[];
  /** The world's lights making room for the effects' (spellGlow.ts easeRoom), and the most creature spells lit at once this frame. */
  private room=0;private spellCap=0;
  private owner:object|null=null;
  private time=0;private dt=0;private cx=0;private cz=0;
  private screenAt=-Infinity;private screenStrength=0;private screenSeconds:number=layerPolicy.screen.seconds;private screenCap:number=layerPolicy.screen.shakeCap;
  constructor(scene:THREE.Scene,private readonly patternLook:PatternLook=PATTERN_LOOK){this.batches=new FxBatches(scene);}
  begin(time:number,x:number,z:number,owner:object):void {
    time=this.captureTime??time;
    if(this.owner!==owner || time<this.time){this.reset();this.owner=owner;this.time=time;}
    this.dt=Math.max(0,time-this.time);this.time=time;this.cx=x;this.cz=z;
    NATIVE_ON.value=this.enabled?1:0;
    this.field.move(x,z);this.field.decay(this.dt);
    this.batches.begin(time,comfort.reduceFlashing);
    this.batches.secondary.value=FX_QUALITY.secondary?1:0;this.batches.distort.value=FX_QUALITY.distortion&&!comfort.reduceFlashing?1:0;
    FX_UNIFORMS.uFxOn.value=this.enabled&&FX_QUALITY.imprints?1:0;
    FX_UNIFORMS.uFxTime.value=time;FX_UNIFORMS.uFxCalm.value=comfort.reduceFlashing?1:0;
    this.stats.instances=0;this.spellCap=0;this.her=null;this.mine=false;this.batches.magicGlow.value.set(0,0,0,0);
  }
  /** Her own magic's glow this frame (each frame after begin; without it her magic draws as before): the tuning's attackFx.magicGlow. */
  hers(t:MagicGlowTuning|undefined):void {
    const look=this.her=magicGlowLook(t,MAGIC_GLOW.on&&this.enabled,comfort.reduceFlashing);
    this.batches.magicGlow.value.set(look?.core??0,look?.halo??0,look?.pool??0,0);
  }
  reset():void {this.field.reset();this.lights.clear();this.room=0;this.bursts.length=0;this.streaks.length=0;this.screen();this.screenAt=-Infinity;this.screenStrength=0;}
  get screenKick():number {
    if(!this.enabled||comfort.reduceFlashing)return 0;
    const phase=Math.max(0,(this.time-this.screenAt)/this.screenSeconds);
    return phase>=1?0:Math.min(this.screenCap,this.screenStrength)*(1-phase)**2;
  }
  /** The screen's response from now: the policy's (config/fx/layers.json screen) unless given. */
  private screen(strength=layerPolicy.screen.shakeCap,seconds=layerPolicy.screen.seconds,cap=layerPolicy.screen.shakeCap):void {this.screenAt=this.time;this.screenStrength=strength;this.screenSeconds=Math.max(0.01,seconds);this.screenCap=cap;}
  /** A shake of its own (the party start's, render/partyStart.ts: its knobs): `amount` (at most 0.5) dying away over `seconds`.
   *  Never with Reduce flashing (screenKick). */
  kick(amount:number,seconds:number):void {this.screen(Math.max(0,amount),seconds,0.5);}
  /** A light of its own this frame (the party start's), by id, eased in and out as every effect's: `rgb` 0 to 1, `reach` metres,
   *  `strength` at its brightest. Asked for each frame it's on. mine: her own magic's (Mine). */
  lamp(id:string,x:number,y:number,z:number,rgb:readonly number[],reach:number,strength:number,mine:Mine=0):void {
    if(!this.enabled||!(strength>0.001)||!(reach>0))return;
    let light=this.lights.get(id);
    if(!light){if(this.lights.size>=settings.pool)return;light={x,y,z,reach:0,rgb:new THREE.Vector3(),strength:0,target:0,seen:this.time,score:0,fade:0,slot:0,spell:false,hers:false};this.lights.set(id,light);}
    light.x=x;light.y=y;light.z=z;light.reach=reach;light.rgb.set(rgb[0],rgb[1],rgb[2]);light.hers=mine===2&&!!this.her;
    light.target=strength*this.calm(mine);light.seen=this.time;
  }
  /** glow: its halo, ground anchor and light times their own (1 but for the creatures' attacks: attackFx.visibility.bloom). look: a
   *  creature's spell's glow (render/fx/spellGlow.ts: its glowing core and dithered halo, its pool on the ground, its light), null for
   *  none; lit false: no light of its own (a lingering zone's tiles: the zone has one). With her own magic's look (`her`): the same
   *  pieces at her magic's strengths, smaller (a core mustn't cover her), its light hers. */
  draw(element:string,form:FxForm,x:number,y:number,z:number,level:number,size=1,alpha=1,phase=0,seed=0,tint:readonly number[]|null=null,intensity=intensityOf(level),glow=1,look:GlowLook|null=null,lit=true):void {
    if(!this.enabled || !(alpha>0.01) || Math.hypot(x-this.cx,z-this.cz)>140)return;
    const key=fxElement(element),el=elements[key],f=forms[form];
    const pixel=this.batches.mpp.value;
    const diameter=Math.max(pixel,Math.round(f.size*size*mixIntensity(settings.size,intensity)/pixel)*pixel);
    if(intensity>=layerPolicy.screen.minimumIntensity&&(form==="burst"||form==="eruption")&&phase<0.15)this.screen(layerPolicy.screen.shakeCap*alpha);
    this.data[0]=f.id;this.data[1]=ELEMENT_KEYS.indexOf(key);this.data[2]=intensity;this.data[3]=phase;
    this.batches.add(x,y,z,diameter,this.data,alpha,f.ground,tint,FX_QUALITY.particles>0.5 || (seed&1)===0,glow);
    this.stats.instances++;
    // An airborne effect has a real ground anchor even when its core is above the canopy.
    if(!f.ground){this.data[0]=forms.zone.id;this.batches.add(x,0,z,Math.min(diameter*0.75,12),this.data,alpha*0.18*glow,true,tint,false);}
    const mine=look!==null&&look===this.her;
    if(look){
      this.glowLook(look);this.glowData(f.id,key,intensity,phase,tint);
      const hit=form==="burst"||form==="eruption",wide=form==="aura"||form==="vortex"||form==="dome"||form==="pillar";
      // (her own: a wide form's core a small one at its middle, not a ball its whole size over her)
      if(!f.ground&&look.core+look.halo>0)this.batches.glowAt(x,y,z,diameter*(hit?0.26:mine&&wide?0.4:0.62),this.data,alpha*(hit?0.8:1),tint);
      // its pool under it: smaller and fainter the higher it flies (so the lit spot says how high it is), a hit's wide
      if(look.pool>0)this.batches.poolAt(x,z,f.ground?diameter*1.15:Math.max(mine?3.4:2.4,diameter*(hit?1:mine&&wide?1.2:1.9)),this.data,alpha*(f.ground?0.6:Math.max(0.35,1-y/14)),tint);
    }
    if(lit&&(!look||look.light>0))this.light(`${key}:${form}:${seed}`,x,y,z,key,intensity,alpha,tint,glow,look&&!mine?look.light:0,mine?2:0);
    if(FX_QUALITY.imprints && (form==="burst" || form==="zone" || form==="eruption" || form==="beam" || form==="projectile" || form==="vortex" || form==="pillar")) {
      this.field.stamp(x,z,Math.max(2,Math.min(18,diameter*0.6)),el.imprint as Imprint,intensity*alpha*(form==="projectile"?0.25:1));
    }
  }
  /** hers: her own magic's (her blink's, the soundsystem spell's): it glows as hers while her glow's on. */
  emit(element:string,form:FxForm,x:number,y:number,z:number,level:number,size=1,life=1.2,seed=0,hers=false):void {
    if(this.bursts.length>=settings.pool)this.bursts.shift();
    this.bursts.push({element,form,x,y,z,level,size,at:this.time,life,seed,hers});
    if(level>=3&&size>=1)this.screen();
  }
  native(feature:NativeFx,x:number,y:number,z:number,amount=1,seed=0,tint:readonly number[]|null=null):void{
    if(!this.enabled||amount<=0.01||Math.hypot(x-this.cx,z-this.cz)>80)return;
    const d=native[feature],key=fxElement(d.element),G=(d as {glow?:NativeGlow}).glow,her=this.her;
    const lit=her&&G?.light!==undefined?G.light:d.light;
    if(lit>0)this.light(`native:${feature}:${seed}`,x,y,z,key,d.intensity,Math.min(1,amount)*lit,tint,1,0,G?.claim?2:1);
    // Her own magic's glow (Ed, 2026-11-13: "extend"): its glowing core and dithered halo, and its pool on the ground under it
    // (smaller and fainter the higher it is, as a creature's shot's), in its own colour (the tint).
    if(her&&G){
      const a=Math.min(1,amount);this.mine=true;this.glowData(forms[d.form as FxForm].id===forms.beam.id?forms.projectile.id:forms[d.form as FxForm].id,key,d.intensity,0,tint);
      if(G.core>0&&her.core+her.halo>0)this.batches.glowAt(x,y+(G.lift??0),z,G.size,this.data,a*G.core,tint);
      if(G.pool>0&&her.pool>0){const high=Math.max(0.35,1-y/14);this.batches.poolAt(x,z,G.poolSize*(0.6+0.4*high),this.data,a*G.pool*high,tint);}
    }
    if(d.anchor>0){
      this.data[0]=forms.zone.id;this.data[1]=ELEMENT_KEYS.indexOf(key);this.data[2]=d.intensity;this.data[3]=0;
      this.batches.add(x,0,z,Math.min(5,forms[d.form as FxForm].size*1.5),this.data,d.anchor*Math.min(1,amount),true,tint,false);
    }
  }
  /** look: a creature's spell's glow (draw): along it, its pool under it, and two lights (its middle and its end) for its many. */
  beam(element:string,x0:number,z0:number,x1:number,z1:number,y:number,width:number,level:number,alpha:number,seed:number,tint:readonly number[]|null=null,intensity=intensityOf(level),glow=1,look:GlowLook|null=null):void {
    const length=Math.hypot(x1-x0,z1-z0);if(!this.enabled || length<0.01 || alpha<=0.01)return;
    const key=fxElement(element),x=(x0+x1)/2,z=(z0+z1)/2;
    if(Math.hypot(x-this.cx,z-this.cz)>140+length/2)return;
    this.data[0]=forms.beam.id;this.data[1]=ELEMENT_KEYS.indexOf(key);this.data[2]=intensity;this.data[3]=this.time%1;
    const north=Math.abs(z1-z0)/length;
    const heading=Math.atan2(z1-z0,x1-x0),w=Math.max(width,this.batches.mpp.value*3)*(1+north*0.35);
    this.batches.beam(x,y,z,length,heading,w,this.data,alpha,tint,glow);
    if(look){
      this.glowLook(look);this.glowData(forms.beam.id,key,intensity,this.data[3],tint);
      if(look.core+look.halo>0)this.batches.glowLine(x,y,z,length,heading,w*0.7,this.data,alpha,tint,false);
      if(look.pool>0)this.batches.glowLine(x,0,z,length,heading,w*2.6,this.data,alpha*0.8,tint,true);
    }
    const n=Math.min(8,Math.max(1,Math.ceil(length/4))),mid=Math.round(n/2);
    for(let i=0;i<=n;i++){
      const px=x0+(x1-x0)*i/n,pz=z0+(z1-z0)*i/n;
      if(!look)this.light(`${key}:beam:${seed}:${i}`,px,y,pz,key,intensity,alpha,tint,glow);
      else if((i===mid||i===n)&&look.light>0)this.light(`${key}:beam:${seed}:${i}`,px,y,pz,key,intensity,alpha,tint,glow,look.light);
      if(FX_QUALITY.imprints)this.field.stamp(px,pz,Math.max(2,width*1.5),elements[key].imprint as Imprint,intensity*alpha);
    }
    this.stats.instances++;
  }
  /** look: a creature attack's trail, its width, opacity, length (seconds of flight) and glow times their own (attackFx.visibility). */
  /** spell: a creature's spell's glow (draw), a fainter glowing core along the trail. */
  ribbon(element:string,x:number,y:number,z:number,vx:number,vy:number,vz:number,level:number,seed:number,tint:readonly number[]|null=null,intensity=intensityOf(level),look:RibbonLook=PLAIN_RIBBON,spell:GlowLook|null=null):void{
    const speed=Math.hypot(vx,vz);if(!this.enabled||speed<0.1)return;
    const life=Math.min(0.32,8/speed)*look.life,length=speed*life,key=fxElement(element);
    this.data[0]=forms.trail.id;this.data[1]=ELEMENT_KEYS.indexOf(key);this.data[2]=intensity;this.data[3]=vy*life;
    this.batches.beam(x-vx*life/2,y-vy*life/2,z-vz*life/2,length,Math.atan2(vz,vx),0.55*look.width*mixIntensity(settings.size,intensity),this.data,look.alpha,tint,look.glow);
    if(spell&&spell.core+spell.halo>0){
      this.glowLook(spell);this.glowData(forms.trail.id,key,intensity,this.data[3],tint);
      this.batches.glowLine(x-vx*life/2,y-vy*life/2,z-vz*life/2,length,Math.atan2(vz,vx),0.3*look.width*mixIntensity(settings.size,intensity),this.data,look.alpha*0.55,tint,false);
    }
    if(FX_QUALITY.imprints&&(seed&3)===0)this.field.stamp(x-vx*life,z-vz*life,2,elements[key].imprint as Imprint,0.15*intensity);
  }
  /** A creature's spell's glow, alone (render/fx/spellGlow.ts): a lingering zone's or a quake's pool of light, `size` across, and
   *  (lit) its one light at its middle. */
  glowPool(element:string,x:number,z:number,size:number,level:number,alpha:number,seed:number,tint:readonly number[]|null,look:GlowLook,lit=true,intensity=intensityOf(level)):void {
    if(!this.enabled||!(alpha>0.01)||Math.hypot(x-this.cx,z-this.cz)>140)return;
    const key=fxElement(element);this.glowLook(look);this.glowData(forms.zone.id,key,intensity,0,tint);
    if(look.pool>0)this.batches.poolAt(x,z,size,this.data,alpha,tint);
    if(lit&&look.light>0)this.light(`${key}:pool:${seed}`,x,0.6,z,key,intensity,alpha,tint,1,look.light);
  }
  /** A creature's spell's glow standing alone, round (a legend's blow: leash/combat.ts): its glowing core and halo `size` across, its
   *  pool and its light. */
  glowBurst(element:string,x:number,y:number,z:number,size:number,level:number,alpha:number,seed:number,tint:readonly number[]|null,look:GlowLook,intensity=intensityOf(level)):void {
    if(!this.enabled||!(alpha>0.01)||Math.hypot(x-this.cx,z-this.cz)>140)return;
    const key=fxElement(element);this.glowLook(look);this.glowData(forms.burst.id,key,intensity,0,tint);
    if(look.core+look.halo>0)this.batches.glowAt(x,y,z,size,this.data,alpha,tint);
    if(look.pool>0)this.batches.poolAt(x,z,size*2.4,this.data,alpha,tint);
    if(look.light>0)this.light(`${key}:blow:${seed}`,x,y,z,key,intensity,alpha,tint,1,look.light);
  }
  /** A streak of her magic's glow from now (her blink's line, on the magic's clock): a glowing line `width` m wide at `y`, its pool
   *  on the ground under it, fading over `life` s. Nothing without her glow. */
  streak(element:string,x0:number,z0:number,x1:number,z1:number,y:number,width:number,life:number):void {
    if(this.streaks.length>=8)this.streaks.shift();
    this.streaks.push({element,x0,z0,x1,z1,y,width,at:this.time,life});
  }
  /** Her own magic's glow at a point, alone (a bar's tip of her decks' ring is drawn by its own layers; this for the rest): its
   *  glowing core and halo `size` across at y, its pool `pool` m across (0: none). Nothing without her glow. */
  herGlowAt(element:string,x:number,y:number,z:number,size:number,pool:number,alpha:number,tint:readonly number[]|null=null):void {
    const her=this.her;if(!her||!(alpha>0.01)||Math.hypot(x-this.cx,z-this.cz)>140)return;
    this.mine=true;this.glowData(forms.burst.id,fxElement(element),1,0,tint);
    if(size>0&&her.core+her.halo>0)this.batches.glowAt(x,y,z,size,this.data,alpha,tint);
    if(pool>0&&her.pool>0)this.batches.poolAt(x,z,pool,this.data,alpha,tint);
  }
  /** The glow layers' data for a piece of her own magic's glow drawn by a caller's own layers (FxBatches.extraGlow: her decks'
   *  ring's): a new array each call (kept by the caller), or null without her glow. */
  herData(element:string,tinted:boolean):number[]|null {
    return this.her?[forms.burst.id,ELEMENT_KEYS.indexOf(fxElement(element))+(tinted?100:0),HER_DATA+1,0]:null;
  }
  /** This frame's spell glow: its strengths to the glow layers, its light cap to the lights. (Her own magic's: its strengths are
   *  set once a frame, hers(); its lights aren't the creatures'.) */
  private glowLook(look:GlowLook):void {
    this.mine=look===this.her;if(this.mine)return;
    this.batches.spellGlow.value.set(look.core,look.halo,look.pool,this.batches.spellGlow.value.w);this.spellCap=Math.max(this.spellCap,look.lights);
  }
  /** The glow layers' data: form, element (past 100 when tinted: its colour the tint's), intensity (past 10: her own magic's, its
   *  strengths attackFx.magicGlow's), phase. */
  private glowData(form:number,key:keyof typeof elements,intensity:number,phase:number,tint:readonly number[]|null):void {this.data[0]=form;this.data[1]=ELEMENT_KEYS.indexOf(key)+(tint?100:0);this.data[2]=intensity+(this.mine?HER_DATA:0);this.data[3]=phase;}
  /** A light's share kept: an effect's own, half with Reduce flashing; her own magic's, attackFx.magicGlow.light's (the comfort
   *  setting already in it) while her glow's on. */
  private calm(mine:Mine):number {return mine&&this.her?this.her.light:comfort.reduceFlashing?0.5:1;}
  /** spell: a creature's spell's light, times this (its glow's light, the comfort setting already in it); 0 for any other. */
  private light(id:string,x:number,y:number,z:number,element:keyof typeof elements,intensity:number,alpha:number,tint:readonly number[]|null,glow=1,spell=0,mine:Mine=0):void {
    let light=this.lights.get(id);
    if(!light){
      if(this.lights.size>=settings.pool){
        const incoming=lightScore(x,z,intensity*alpha,this.cx,this.cz);
        let weakest="",score=Infinity;
        for(const [key,l] of this.lights){const s=lightScore(l.x,l.z,l.target,this.cx,this.cz);if(s<score){weakest=key;score=s;}}
        if(incoming<=score)return;this.lights.delete(weakest);
      }
      light={x,y,z,reach:0,rgb:new THREE.Vector3(),strength:0,target:0,seen:this.time,score:0,fade:0,slot:0,spell:spell>0,hers:false};this.lights.set(id,light);
    }
    light.spell=spell>0;light.hers=mine===2&&!!this.her;
    const n=parseInt(elements[element].ramp[1].slice(1),16);
    light.x=x;light.y=y;light.z=z;light.reach=mixIntensity(settings.lightReach,intensity);
    light.rgb.set(tint?.[0]??(n>>16)/255,tint?.[1]??((n>>8)&255)/255,tint?.[2]??(n&255)/255);
    light.target=mixIntensity(settings.lightStrength,intensity)*Math.min(1,alpha)*lightGain(glow)*(spell>0?spell:this.calm(mine));
    light.seen=this.time;
    light.pattern=id.startsWith("moonlight:aura:"); // The existing blink's moonlight aura, not a new spell/light.
  }
  finish(budget:number):void {
    let used=0;
    for(const b of this.bursts){
      const age=this.time-b.at;if(age<0 || age>=b.life)continue;this.bursts[used++]=b;
      const phase=age/b.life,alpha=Math.min(1,age/0.2,(b.life-age)/0.3);
      this.draw(b.element,b.form,b.x,b.y,b.z,b.level,b.size,alpha,phase,b.seed,null,undefined,1,b.hers?this.her:null);
    }
    this.bursts.length=used;
    // Her blink's streaks: a glowing line where she went and its pool under it, fading (nothing flickers: one smooth fall).
    used=0;
    for(const k of this.streaks){
      const age=this.time-k.at;if(age<0||age>=k.life)continue;this.streaks[used++]=k;
      const her=this.her,length=Math.hypot(k.x1-k.x0,k.z1-k.z0);if(!her||length<0.5)continue;
      const fade=(1-age/k.life)**2,x=(k.x0+k.x1)/2,z=(k.z0+k.z1)/2,heading=Math.atan2(k.z1-k.z0,k.x1-k.x0);
      this.mine=true;this.glowData(forms.beam.id,fxElement(k.element),0.45,0,null);
      if(her.core+her.halo>0)this.batches.glowLine(x,k.y,z,length,heading,k.width,this.data,fade*0.9,null,false);
      if(her.pool>0)this.batches.glowLine(x,0,z,length,heading,k.width*7,this.data,fade*0.8,null,true);
    }
    this.streaks.length=used;this.batches.end();
    if(this.field.publish() || uploadedField!==this.field){
      const a=FX_UNIFORMS.uFxField.value.image.data as Uint8Array,b=FX_UNIFORMS.uFxExtra.value.image.data as Uint8Array;
      this.stats.fieldCopyValues+=this.field.data.length;
      for(let i=0,j=0;i<this.field.data.length;i+=8,j+=4)for(let c=0;c<4;c++){
        a[j+c]=this.field.data[i+c];b[j+c]=this.field.data[i+c+4];
      }
      FX_UNIFORMS.uFxField.value.needsUpdate=true;FX_UNIFORMS.uFxExtra.value.needsUpdate=true;
      uploadedField=this.field;
    }
    FX_UNIFORMS.uFxOn.value=this.field.active&&this.enabled&&FX_QUALITY.imprints?1:0;
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
      if(Math.hypot(l.x-this.cx,l.z-this.cz)<l.reach+30)this.selected.push(l);else l.slot=0;
    }
    if(!this.enabled)this.selected.length=0;
    const U=LIGHT_UNIFORMS,limit=Math.max(0,Math.min(MAX_LIGHTS,Math.floor(budget))),step=this.dt/settings.lightEase;
    const cap=Math.min(FX_QUALITY.lightCap,settings.lightCap,limit);
    // The strongest nearby effects (her own cast magic's first, at most HER_LIGHTS; a light that held its slot kept unless clearly
    // beaten; at most attackFx.glow.lights creatures' spells: render/fx/spellGlow.ts pickLights). They take the budget's last slots; where the world's own lights fill it, its
    // farthest make room eased (easeRoom), fading out and back rather than popping.
    const picked=pickLights(this.selected.map(l=>({score:l.score,spell:l.spell,held:l.slot>0,hers:l.hers})),cap,this.spellCap,HER_LIGHTS);
    const worldAll=Math.min(U.uLightCount.value,limit),free=limit-worldAll;
    this.room=Math.min(worldAll,easeRoom(this.room,Math.max(0,picked.length-free),step));
    const dropped=Math.floor(this.room+1e-6),part=this.room-dropped,world=worldAll-dropped;
    if(part>1e-6&&world>0)U.uLightCol.value[world-1].w*=1-part;
    const n=Math.min(picked.length,limit-world);
    trimLightPatterns(world);
    for(const l of this.selected)l.score=-1; // (marks: who holds a slot this frame)
    let patternedSpell=false;
    for(let i=0;i<n;i++){
      const l=this.selected[picked[i]];l.score=0;l.slot=Math.min(1,l.slot+step);
      U.uLightPos.value[world+i].set(l.x,groundHeight(l.x,l.z)+l.y,l.z,l.reach);
      const slot=U.uLightCol.value[world+i];
      slot.set(l.rgb.x,l.rgb.y,l.rgb.z,l.strength*l.slot);
      const pattern=l.pattern&&!patternedSpell&&this.patternLook!=="off"?sourcePattern("rings",this.time,comfort.reduceFlashing):undefined;
      writeLightPattern(world+i,pattern);
      if(pattern)patternedSpell=true;
    }
    for(const l of this.selected)if(l.score<0)l.slot=0;
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
      if(form==="trail"){this.ribbon(this.galleryElement??element,xx+3,2,zz,20,0,0,2,col*3+row,null,intensity);return;}
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
