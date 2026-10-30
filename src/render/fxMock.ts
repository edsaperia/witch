// Stage 0: code-native effects in the game's forest/camera/post stack, ONLY behind ?fxmock.
import * as THREE from "three";
import type { View } from "./view";
import { LIGHT_UNIFORMS, MAX_LIGHTS } from "./lighting";
import { groundHeight } from "./height";
import { SpriteBatch, SPRITE_UNIFORMS, type SpriteInstance } from "./sprites";
import { comfort } from "./comfort";
import { frostPalette, mockEnvelope, mockFrost, mockLightSlots, MOCK_FORMS, MOCK_INTENSITIES, type MockForm } from "./fxMockModel";

const VERT = /* glsl */ `
uniform vec3 uOrigin, uRight, uUp;
uniform vec2 uSize, uDirection;
uniform float uGround, uBeam;
varying vec2 vUv;
void main() {
  vUv = uv;
  vec3 p;
  if (uBeam > 0.5) {
    vec2 side = vec2(-uDirection.y, uDirection.x);
    vec2 q = uDirection * position.x * uSize.x + side * position.y * uSize.y;
    p = uOrigin + vec3(q.x, 0.0, q.y);
  } else if (uGround > 0.5) p = uOrigin + vec3(position.x*uSize.x, 0.0, position.y*uSize.y);
  else p = uOrigin + uRight*position.x*uSize.x + uUp*position.y*uSize.y;
  gl_Position = projectionMatrix * viewMatrix * vec4(p, 1.0);
}`;
const FRAG = /* glsl */ `
uniform float uTime, uIntensity, uForm, uLayer, uCold, uEnvelope, uComfort;
varying vec2 vUv;
float noise(vec2 p) { return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453); }
void main() {
  // A fixed art-pixel grid; turbulence changes in gentle steps, never rapid flashing.
  vec2 q = (floor(vUv*64.0)+0.5)/64.0, p = q*2.0-1.0;
  float t = floor(uTime*6.0)/6.0;
  float n = noise(floor(q*32.0)+vec2(0.0,-floor(t*4.0)));
  float d;
  if (uForm < 0.5) { // bolt: hot head, dark broken tail
    float lead = -0.4+min(mod(uTime,8.0)/3.0,1.0)*0.95;
    float head = length((p-vec2(lead,0.0))*vec2(1.8,2.6));
    float tail = abs(p.y+sin(p.x*9.0-t*3.0)*0.06)/(0.06+(p.x+1.0)*0.15);
    d = min(head, max(max(tail,(lead-p.x)*0.65),(p.x-lead)*8.0));
  } else if (uForm < 1.5) { // burst: tongues around an expanding smoke ring
    float a = atan(p.y,p.x), r = length(p);
    d = r/(0.52+0.12*sin(a*7.0+t*2.0)+0.08*n);
  } else if (uForm < 2.5) { // beam: longitudinal hot line and depth hoops
    d = max(abs(p.y)/(0.18+0.05*sin(p.x*22.0-t*3.0)),abs(p.x)*1.08);
  } else { // aura: upright hollow flame crown, readable silhouette
    float r = length(p*vec2(1.0,0.85));
    d = abs(r-(0.54+sin(atan(p.y,p.x)*9.0-t*2.0)*0.045))*5.0;
  }
  d += (n-0.5)*0.14;
  vec3 dark = mix(vec3(0.19,0.025,0.035),vec3(0.06,0.14,0.23),uCold);
  vec3 red = mix(vec3(0.72,0.12,0.025),vec3(0.16,0.48,0.7),uCold);
  vec3 orange = mix(vec3(1.0,0.4,0.045),vec3(0.42,0.82,0.95),uCold);
  vec3 hot = mix(vec3(1.0,0.91,0.58),vec3(0.87,0.98,1.0),uCold);
  float a = 1.0; vec3 col;
  if (uLayer < 0.5) { col = dark; a = (1.0-smoothstep(0.8,1.5,d))*0.65; }
  else if (uLayer < 1.5) {
    if(d>0.94) discard;
    col = d<0.27 ? hot : d<0.53 ? orange : d<0.76 ? red : dark;
  } else if (uLayer < 2.5) {
    a = (1.0-smoothstep(0.1,1.7,d))*0.18*(0.5+uIntensity*0.5);
    if(noise(floor(q*64.0)) > a*2.5) discard;
    col = orange; a = min(a, mix(0.3,0.14,uComfort));
  } else if (uLayer < 3.5) { // footprint: dark scorch plus a rim of residual heat/rime
    float r = length(p);
    if(r>0.9) discard;
    col = mix(dark,red,step(0.67,r)); a = (1.0-r)*0.6;
  } else { // discrete rising sparks / crystalline shards and contrast secondaries
    vec2 cell = floor(q*32.0);
    float seed = noise(vec2(cell.x, floor((q.y-uTime*0.07)*32.0)));
    bool hoop = uForm>1.5 && uForm<2.5 && uIntensity>0.5 && abs(sin(p.x*12.0-t*2.0))<0.24 && abs(abs(p.y)-0.55)<0.1;
    if(!hoop && (seed<0.982-uIntensity*0.014 || length(p)>0.94)) discard;
    col = mix(hot,vec3(0.42,0.75,1.0),uIntensity>0.5?step(0.994,seed):0.0); a = 0.8;
  }
  col *= 0.65+uIntensity*0.35;
  a *= uEnvelope;
  if(a<0.008) discard;
  gl_FragColor = vec4(col,a);
}`;
type Effect = { x: number; z: number; intensity: number; cold: boolean; meshes: THREE.Mesh<THREE.PlaneGeometry, THREE.ShaderMaterial>[] };
export class FxMock {
  readonly group = new THREE.Group();
  readonly effects: Effect[] = [];
  readonly panel = document.createElement("div");
  readonly frost = { value: 0 };
  time: number | null = null;
  enabled = true;
  lightsUsed = 0;
  tree: SpriteBatch | null = null;
  private treeAtlas: unknown = null;
  private treePalette: THREE.DataTexture | null = null;
  private origin = new THREE.Vector2();
  private treeItems: SpriteInstance[] = [];
  private mode: string;
  constructor(v: View, mode: string) {
    this.mode = mode;
    this.group.name = "Stage 0 magic mock";
    v.scene.add(this.group);
    this.panel.style.cssText = "position:fixed;left:12px;top:12px;z-index:20000;background:#10121eee;color:#eee;padding:10px;font:14px monospace;pointer-events:none;white-space:pre-line";
    this.panel.textContent = mode === "frost" ? "Frost blast · tree freezes then thaws · 8 s loop" : mode === "iso" ? "Equal 12 m beams · east–west / north–south\nN–S core widened 1.5×; world length preserved" : "Fire · columns: bolt / burst / beam / aura\nRows far → near: 0.25 / 0.6 / 1.0 · 8 s loop";
    document.body.append(this.panel);
    if (mode === "frost") this.add("burst", 0, 0, 1, true);
    else if (mode === "iso") { this.add("beam", -9, 0, 0.6, false); this.add("beam", 9, 0, 0.6, false, true); }
    else MOCK_INTENSITIES.forEach((strength, row) => MOCK_FORMS.forEach((form, col) => this.add(form, (col-1.5)*13, (row-1)*16, strength, false)));
  }
  private add(form: MockForm, x: number, z: number, intensity: number, cold: boolean, north = false): void {
    const e: Effect = { x, z, intensity, cold, meshes: [] };
    const size = 4+intensity*4;
    for(let layer=0;layer<5;layer++) {
      const ground = layer === 3, beam = form === "beam" && !ground;
      const m = new THREE.ShaderMaterial({ vertexShader: VERT, fragmentShader: FRAG, transparent: true, depthWrite: false,
        blending: layer === 2 || layer === 4 ? THREE.AdditiveBlending : THREE.NormalBlending,
        side: THREE.DoubleSide,
        uniforms: { uOrigin: { value: new THREE.Vector3() }, uRight: SPRITE_UNIFORMS.uRight, uUp: SPRITE_UNIFORMS.uUp,
          uSize: { value: new THREE.Vector2(beam ? 12 : size*(layer===2?1.3:1), beam ? (north?3:2) : size) },
          uDirection: { value: new THREE.Vector2(north?0:1,north?1:0) }, uGround: { value: ground?1:0 }, uBeam: { value: beam?1:0 },
          uForm: { value: MOCK_FORMS.indexOf(form) }, uLayer: { value: layer }, uCold: { value: cold?1:0 }, uIntensity: { value: intensity },
          uTime: { value: 0 }, uEnvelope: { value: 0 }, uComfort: { value: 0 } } });
      const mesh = new THREE.Mesh(new THREE.PlaneGeometry(1,1),m);
      mesh.name = `Mock ${cold?"frost":"fire"} ${form} ${intensity} layer ${layer}`;
      mesh.frustumCulled = false; mesh.renderOrder = ground ? 1 : 8+layer;
      this.group.add(mesh); e.meshes.push(mesh);
    }
    this.effects.push(e);
  }
  update(v: View, clock: number): void {
    const w = v.game.witch;
    this.origin.set(w.x,w.z-8);
    const time = this.time ?? clock, envelope = mockEnvelope(time);
    this.group.visible = this.enabled;
    this.frost.value = this.enabled ? mockFrost(time) : 0;
    for(const e of this.effects) for(const mesh of e.meshes) {
      const u = mesh.material.uniforms, x=this.origin.x+e.x, z=this.origin.y+e.z;
      u.uOrigin.value.set(x,groundHeight(x,z)+(u.uGround.value?0.08:3),z);
      u.uTime.value=time; u.uEnvelope.value=u.uLayer.value===3 || u.uLayer.value===0 ? Math.max(envelope,mockFrost(time)*0.6) : envelope;
      u.uComfort.value=comfort.reduceFlashing?1:0;
    }
    // Append only into unused world-light slots. No ranking/budget change, no displaced world light.
    const U=LIGHT_UNIFORMS, base=U.uLightCount.value;
    const candidates = [...this.effects].sort((a,b)=>b.intensity-a.intensity);
    const n = this.enabled && envelope>0 ? mockLightSlots(base,Math.min(MAX_LIGHTS,v.game.tuning.lightBudget),candidates.length) : 0;
    for(let i=0;i<n;i++) {
      const e=candidates[i], x=this.origin.x+e.x,z=this.origin.y+e.z;
      U.uLightPos.value[base+i].set(x,groundHeight(x,z)+3,z,7+e.intensity*8);
      U.uLightCol.value[base+i].set(e.cold?0.3:1,e.cold?0.7:0.26,e.cold?1:0.035,envelope*e.intensity*(comfort.reduceFlashing?0.6:1));
    }
    U.uLightCount.value=base+n; this.lightsUsed=n; v.stats.lights=base+n;
    if(this.mode === "frost") this.updateTree(v);
  }
  private updateTree(v: View): void {
    // A private copy of a real generated forest tree, beside the blast. No shared shader/atlas mutation.
    const p = v.game.forest.treesNear(this.origin.x,this.origin.y,100)[Symbol.iterator]().next().value;
    if(!p) return;
    const art=v.assets.typeArt(p.type);
    if(!art || art.atlas.indexed.x<0.5 || !art.layout.big.length) return;
    if(this.treeAtlas!==art.atlas) {
      if(this.tree) { this.group.remove(...this.tree.meshes); this.tree.release(); this.treePalette?.dispose(); }
      const data=art.atlas.albedoPal.image.data as Uint8Array;
      this.treePalette=new THREE.DataTexture(frostPalette(data),256,2,THREE.RGBAFormat);
      this.treePalette.magFilter=this.treePalette.minFilter=THREE.NearestFilter; this.treePalette.needsUpdate=true;
      this.tree=new SpriteBatch(art.atlas,v.mpp,{solid:true}).name("Mock frost palette tree");
      for(const mesh of this.tree.meshes) {
        const mat=mesh.material as THREE.ShaderMaterial;
        mat.uniforms.uMockRows={value:this.treePalette}; mat.uniforms.uMockFrost=this.frost;
        mat.fragmentShader="uniform sampler2D uMockRows; uniform float uMockFrost;\n"+mat.fragmentShader.replace("vec4 a = albedoAt(uvS);",`vec4 a = albedoAt(uvS);
          int mockIndex = int(texture2D(uAlbedo,uvS).r*255.0+0.5);
          a.rgb = mix(a.rgb,texelFetch(uMockRows,ivec2(mockIndex,1),0).rgb,uMockFrost);`);
      }
      this.group.add(...this.tree.meshes); this.treeAtlas=art.atlas;
      const piece=art.layout.big.find(b=>b.top!==null)??art.layout.big[0];
      const frames=[art.atlas.frames[piece.bot],...(piece.top===null?[]:[art.atlas.frames[piece.top]])];
      const scale=10/(Math.max(...frames.map(f=>f.h))*v.mpp);
      this.treeItems=frames.map(frame=>({x:0,y:0,z:0,frame,flip:false,scale}));
    }
    for(const item of this.treeItems) { item.x=this.origin.x+7; item.z=this.origin.y-3; }
    this.tree?.set(this.treeItems);
  }
}
