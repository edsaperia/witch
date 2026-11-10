import{h as ae,dJ as ba,dK as xa,dL as Sa,dM as Fa}from"./mushrooms-CekwzruF.js";import{ce as ka,_ as b,V as C,$ as T,aY as Ca,cf as Pa,bl as ve,o as N,U as Te,cg as rt,u as q,x as $e,bm as Et,ch as za,ci as La,aj as qe,S as W,r as Aa,l as xe,R as Gt,W as Rt,q as Dt,k as ye,a2 as ot,H as te,Z as Ma,ac as _t,bu as nt,bv as lt,a6 as Ta,a5 as Ea,a3 as Be,e as je,at as Ga,I as Ot,ab as Ut,cj as ht,A as ut,a4 as Ra,ad as ct,af as Da,ck as _a,al as Oa,g as Ua,T as Wa}from"./chartView-BWkUkqB0.js";import{n as Ha,P as Wt}from"./linkParams-iPGi_JG-.js";import{a as Ht,b as Nt,c as It}from"./saveSlots-adtOazhL.js";import{D as $t,s as qt,k as ke}from"./decisions-C5lctijb.js";import{$ as Bt}from"./game-w8K1gwm2.js";import"./housePieces-Yzi7DtFk.js";const jt="witch.settings";function Kt(){try{const a=Ht.getItem(jt);return a?JSON.parse(a):{}}catch{return{}}}function vr(a,e){if(!a.persist)return;const t=Kt();e===a.default?delete t[a.id]:t[a.id]=e;try{Ht.setItem(jt,JSON.stringify(t))}catch{}}function Vt(a,e=$t,t=new Set){const i=Kt(),s=[];for(const r of e){const n=i[r.id];!r.persist||!r.apply.knob||t.has(r.apply.knob)||n===void 0||typeof n!=typeof r.default||r.control.type==="slider"&&typeof n=="number"&&!(n>=r.control.min&&n<=r.control.max)||(qt(a,r.apply.knob,n),s.push(r.id))}return s}function wr(a,e,t=$t,i=new Set){const s=[];for(const r of t){const n=r.apply.knob;if(!n||i.has(n))continue;const o=ke(a,n);o===void 0||ke(e,n)===void 0||Object.is(o,ke(e,n))||(qt(e,n,o),s.push(r.id))}return s}const we={master:1,music:.5,effects:1,voices:1,muteBackground:!0,quality:"auto",shake:!0,screen:"",reduceFlashing:!1,talk:"hold",textSize:1,glyphs:"auto",rumble:!0},Jt="witch.player",Na="witch.settings",Ee="witch.shake",Yt=()=>ka();function Xt(a){const e=a&&typeof a=="object"?a:{},t={...we},i=n=>{const o=e[n];typeof o=="number"&&o>=0&&o<=1&&(t[n]=o)},s=n=>{typeof e[n]=="boolean"&&(t[n]=e[n])},r=(n,o)=>{o.includes(e[n])&&(t[n]=e[n])};return i("master"),i("music"),i("effects"),i("voices"),s("muteBackground"),s("shake"),s("reduceFlashing"),s("rumble"),r("quality",["auto","high","medium","low"]),r("talk",["hold","toggle"]),r("textSize",[1,1.25,1.5]),r("glyphs",["auto","ps","xbox"]),typeof e.screen=="string"&&(t.screen=e.screen.slice(0,80)),t}function Ia(a=Yt()){if(!a)return{...we};try{const e=a.getItem(Jt);if(e)return Xt(JSON.parse(e));const t=JSON.parse(a.getItem(Na)??"{}"),i={...we};return typeof t.musicVolume=="number"&&t.musicVolume>=0&&t.musicVolume<=1&&(i.music=t.musicVolume),typeof t.sfxVolume=="number"&&t.sfxVolume>=0&&t.sfxVolume<=1&&(i.effects=t.sfxVolume),a.getItem(Ee)==="0"&&(i.shake=!1),i}catch{return{...we}}}function $a(a,e=Yt()){if(!e)return!1;try{return e.setItem(Jt,JSON.stringify(a)),a.shake?e.setItem(Ee,"1"):e.setItem(Ee,"0"),!0}catch{return!1}}const be=new WeakMap;function yr(a){const e=be.get(a);return e?structuredClone(e):void 0}function br(a,e){if(!e||!e.voices||typeof e.voices!="object"||!Number.isFinite(e.shake)||!Number.isFinite(e.legendFlash)||Object.values(e.voices).some(t=>!Number.isFinite(t)))throw new Error("Invalid saved settings levels.");be.set(a,structuredClone(e))}function Zt(a,e){const t=e;let i=be.get(t);i||be.set(t,i={voices:Object.fromEntries(Object.entries(t.sfx.voice??{}).map(([s,r])=>[s,r.volume??0])),shake:t.combat.shake,legendFlash:t.attackFx?.legendFlash??0}),t.music.volume=a.music*a.master,t.sfx.volume=a.effects*a.master;for(const[s,r]of Object.entries(t.sfx.voice??{}))typeof r.volume=="number"&&(r.volume=(i.voices[s]??r.volume)*a.voices);t.combat.shake=a.shake?i.shake:0,t.attackFx&&(t.attackFx.legendFlash=a.reduceFlashing?0:i.legendFlash)}function xr(a,e){return a==="auto"?"auto":a==="high"?"off":String(a==="medium"?Math.round(e/2):e)}function Sr(a,e){return a!=="auto"?a:e&&/xbox|xinput|045e/i.test(e)?"xbox":"ps"}let Ge=null;function Ke(){return Ge??=Ia()}function qa(a){return Ge=Xt(a),$a(Ge)}function Fr(a,e){if(typeof e!="number"||a!=="music.volume"&&a!=="sfx.volume")return;const t=Ke(),i=t.master>0?Math.min(1,Math.max(0,e/t.master)):e;qa(a==="music.volume"?{...t,music:i}:{...t,effects:i})}const Qt={none:0,spokes:1,stripes:2,bands:3,flicker:4,rings:5,"colour-spokes":6},ce={scale:6,contrast:.9,beatsPerTurn:8,projectorCap:3},Ba=Math.PI*2,ea=(a,e,t)=>Math.max(e,Math.min(t,a));function ja(a,e){return a=Math.fround(a),e=Math.fround(e),[1/Math.max(.1,a),ea(.5+.3*Math.sin(e)+.2*Math.sin(e*1.73+1.2),0,1)]}function Ka(a,e,t=ce.beatsPerTurn){const i=Number.isFinite(t)&&t>0?t:ce.beatsPerTurn,s=Bt(a,e)%i;return(s<0?s+i:s)*Ba/i}function ta(a,e,t){return e&&!t&&Number.isFinite(a)?ea(a,0,1):0}const Va=`
vec3 lightPattern(vec3 relativeWorld, vec4 pattern, vec2 rotation, float lightDistance) {
  if (pattern.x < 0.5 || pattern.z <= 0.0) return vec3(1.0);
  vec3 p = vec3(dot(relativeWorld.xz, rotation), relativeWorld.y,
    dot(relativeWorld.xz, vec2(-rotation.y, rotation.x))) * pattern.y;
  float stripe = p.x + 0.35 * p.y + 0.25 * p.z;
  float wave = 0.5;
  vec3 bands;
  if (pattern.x < 1.5 || pattern.x > 5.5) {
    float radius = length(p.xz), blend = clamp(radius / 0.3, 0.0, 1.0);
    float angle = radius < 0.00001 ? 0.0 : atan(p.z, p.x);
    if (pattern.x > 5.5) {
      float rotated = angle - pattern.w;
      float spoke = 0.5 + 0.5 * sin(rotated * 4.0);
      bands = mix(vec3(1.0), spoke * (0.5 + 0.5 * sin(vec3(rotated) + vec3(0.0, 2.09439510239, 4.18879020479))) * max(1.0, min(4.0, pattern.z / 0.9)), blend);
      return mix(vec3(1.0), bands, clamp(pattern.z, 0.0, 1.0));
    }
    wave = mix(1.0, 0.5 + 0.5 * sin(angle * 4.0 - pattern.w), blend);
  } else if (pattern.x < 2.5) wave = 0.5 + 0.5 * sin(stripe * 6.28318530718 - pattern.w);
  else if (pattern.x < 3.5) {
    bands = 0.5 + 0.5 * sin(vec3(stripe * 6.28318530718 - pattern.w) + vec3(0.0, 2.09439510239, 4.18879020479));
    return mix(vec3(1.0), clamp(bands, 0.0, 1.0), clamp(pattern.z, 0.0, 1.0));
  } else if (pattern.x < 4.5) wave = pattern.w;
  else wave = 0.5 + 0.5 * sin(lightDistance * pattern.y * 6.28318530718 - pattern.w);
  return vec3(mix(1.0, clamp(wave, 0.0, 1.0), clamp(pattern.z, 0.0, 1.0)));
}
`,Ve=[0,1,0,0],Ja=a=>{const e=new URLSearchParams(a).get("patternlight");return e===null?"colour-spokes":e==="off"?"off":e==="auto"||e==="spokes"||e==="stripes"||e==="bands"||e==="colour-spokes"?e:"off"},Ya=Ja(globalThis.location?.search??""),dt=a=>(a=Math.max(0,Math.min(1,a)),a*a*(3-2*a));function kr(a,e,t,i,s){if(t==="off"||i)return Ve;const r=Math.max(0,Bt(a,e)),n=r/64,o=t==="auto"?["spokes","stripes","bands"][Math.floor(n)%3]:t,l=r%64,h=t==="auto"?dt(l/4)*dt((64-l)/4):1;return[Qt[o],ce.scale,ta(ce.contrast*h,!0,i),Ka(a,e,s)]}function aa(a,e,t){return t?Ve:[Qt[a],a==="rings"?3:6,ta(a==="flicker"?.5:.75,!0,t),e*(a==="flicker"?.45:.7)]}function Cr(a,e,t,i){a&&(a.pattern=t!=="off"&&!i?aa("flicker",e,!1):void 0)}class Xa{constructor(e,t=ce.projectorCap){this.slots=e,this.cap=t,this.data=new Float32Array(e*4)}slots;cap;data;count=0;begin(){this.data.fill(0),this.count=0}write(e,t=Ve){if(!Number.isInteger(e)||e<0||e>=this.slots)return;const i=e*4;this.data[i]>0&&this.count--,this.data.fill(0,i,i+4),!(!(t[0]>0&&t[2]>0)||this.count>=this.cap||!t.every(Number.isFinite))&&(this.data.set(t,i),this.count++)}get used(){return this.count}}const Se=24,Re=new Xa(Se),Je={uLightPattern:{value:Array.from({length:Se},()=>new b)}};let ia=1;function Pr(a=1){ia=Number.isFinite(a)?Math.max(0,Math.min(4,a)):0,Re.begin();for(const e of Je.uLightPattern.value)e.set(0,0,0,0)}function sa(a,e){const t=e?[e[0],e[1],e[2]*ia,e[3]]:void 0;if(Re.write(a,t),!Number.isInteger(a)||a<0||a>=Se)return;const i=a*4,s=Re.data,r=Je.uLightPattern.value[a];if(s[i]>0&&s[i+2]>0){const[n,o]=ja(s[i+1],s[i+3]);r.set(s[i],n,s[i+2],s[i]===4?o:s[i+3])}else r.set(0,0,0,0)}function Za(a){for(let e=Math.max(0,Math.floor(a));e<Se;e++)sa(e)}const B=24,De=4,E={...Je,uLandscapeTrip:Ca,uAmb:{value:new C},uUnlitDim:{value:1},uMoon:{value:new C},uMoonDir:{value:new C(-.45,.75,.5).normalize()},uMoonBeam:{value:new C},uMoonUp:{value:new b},uShafts:{value:.3},uShaftScale:{value:1},uGlowPos:{value:new C},uGlowRgb:{value:new C},uGlowR:{value:8},uGlowFalloff:{value:2.5},uGlowNear:{value:1},uGlowPower:{value:1.4},uGlowDim:{value:1},uHazeCentre:{value:new T},uHazeRange:{value:new T(70,200)},uHazeColour:{value:new C},uTime:{value:0},uLightPos:{value:Array.from({length:B},()=>new b)},uLightCol:{value:Array.from({length:B},()=>new b)},uLightCount:{value:0},uLightKnee:{value:new T(.9,1.1)},uGlade:{value:Array.from({length:De},()=>new b)},uGladeCount:{value:0},uGladeRgb:{value:new C},uGladeLight:{value:new T},uDim:{value:1},uSlow:{value:new b},uSlowKeep:{value:new b},uRealTime:{value:0},uMirrorMoon:{value:new C},uDisco:{value:new b},uDiscoParams:{value:new b},uContourDream:{value:new C(0,1.5,.12)},uDiscoColour:{value:new C(1,1,1)},uScenery:{value:new T(1e6,1)},uCanopyReach:{value:0},uPartyOver:{value:new b(0,0,0,30)}},Qa=.95,ei=.55,ti=.16;function zr(a,e,t,i=1,s=2.5,r=1){const n=(o,l)=>new C(o[0]/255*l,o[1]/255*l,o[2]/255*l);E.uAmb.value.copy(n(ae(a.ambientHue,.55,1),a.ambient*i)),E.uMoon.value.copy(n(ae(a.moonHue,a.moonSat??.35,1),a.moon*r)),E.uMoonBeam.value.copy(n(ae(a.moonHue,.35,1),a.shafts*.25)),E.uShafts.value=a.shafts,E.uShaftScale.value=t*2,E.uGlowRgb.value.copy(n(ae(a.glowHue,a.glowSat,1),1)),E.uGlowR.value=e,E.uGlowFalloff.value=s,E.uGlowPower.value=a.glowPower,E.uHazeColour.value.copy(n(ae(a.ambientHue-.08,.55,1),.16*Math.sqrt(i)))}const Ye=`
${Pa}
uniform vec3 uAmb, uMoon, uMoonDir, uMoonBeam, uGlowPos, uGlowRgb;
uniform float uUnlitDim;
uniform vec4 uMoonUp;
uniform float uShafts, uShaftScale, uGlowR, uGlowFalloff, uGlowNear, uGlowPower, uGlowDim, uTime;
uniform vec2 uHazeCentre, uHazeRange;
uniform vec3 uHazeColour;
uniform vec4 uLightPos[${B}], uLightCol[${B}];
uniform vec4 uLightPattern[${B}];
${Va}
uniform vec4 uGlade[${De}];
uniform int uGladeCount;
uniform vec3 uGladeRgb;
uniform vec2 uGladeLight;
uniform float uDim;
uniform vec4 uSlow, uSlowKeep;
uniform float uRealTime;
uniform int uLightCount;
uniform vec2 uLightKnee;
uniform vec4 uPartyOver;
// The party's over: how far switched off a party light at P is (0 on, 1 off), the front rippling out from home.
float partyOff(vec3 P) { if (uPartyOver.z <= 0.0) return 0.0; return smoothstep(0.0, 1.0, (uPartyOver.z - distance(P.xz, uPartyOver.xy)) / uPartyOver.w); }
uniform vec3 uMirrorMoon;
uniform vec4 uDisco, uDiscoParams;
uniform vec3 uDiscoColour, uContourDream;
uniform vec2 uScenery;
uniform float uCanopyReach;

// How much of a piece of scenery at P is drawn (1 well inside the scenery radius, 0 beyond it).
float sceneryFade(vec3 P) {
  return 1.0 - smoothstep(uScenery.x - uScenery.y, uScenery.x, length(P.xz - uHazeCentre));
}
// The same for a tree's crown: out to the canopy's reach in the treetops, where that's further than the scenery budget's radius.
float canopyFade(vec3 P) {
  float r = max(uScenery.x, uCanopyReach);
  return 1.0 - smoothstep(r - uScenery.y, r, length(P.xz - uHazeCentre));
}

// Fade toward the twilight haze with distance.
// Time slowed outside a legend's circle (Ed, 2026-10-06; render/slowtime.ts): the world beyond its edge greys and cools,
// as it eases to a crawl; inside, as it is.
vec3 slowGrade(vec3 c, vec3 P) {
  if (uSlow.w <= 0.0) return c;
  float k = uSlow.w * smoothstep(uSlow.z - 0.5, uSlow.z + 1.5, length(P.xz - uSlow.xy));
  if (uSlowKeep.z > 0.0) k *= smoothstep(0.85, 1.1, length((P.xz - uSlowKeep.xy) / uSlowKeep.zw)); // (its legend, standing up out of the circle, as it is)
  float l = dot(c, vec3(0.299, 0.587, 0.114));
  return mix(c, mix(c, vec3(l), 0.75) * vec3(0.86, 0.95, 1.12), k);
}
vec3 haze(vec3 c, vec3 P) {
  float h = smoothstep(uHazeRange.x, uHazeRange.y, length(P.xz - uHazeCentre));
  h *= h; // light through the middle distance, full only at the far edge
  return slowGrade(mix(c, uHazeColour * uDim, h), P);
}

// The light's soft knee: the light falling on a pixel (every source summed) kept in its own hue but eased, past uLightKnee.x
// of brightness, toward uLightKnee.y and never past it. Where a soundsystem's party light, campfires, her glow and the moon all
// meet, the sum ran to three or four times white and every lit pixel clipped to the same pale yellow (Ed, 2026-10-12): now
// the brightest ground stays under white and keeps its texture; the forest at large, below the knee, is as it was.
vec3 softKnee(vec3 l) {
  float k = uLightKnee.x, r = uLightKnee.y - uLightKnee.x;
  if (r <= 0.0) return l;
  float y = dot(l, vec3(0.3, 0.55, 0.15));
  if (y <= k) return l;
  return l * ((k + r * (1.0 - exp(-(y - k) / r))) / y);
}

float lightStep(float f) {
  return max(0.0, f); // smooth light: no bands, no dither
}

// A sleeping legend's clearing (render/glades.ts; Ed: "lit with an eerie twilight"): a cool pool filling the circle,
// soft at its edge, and a ring at the edge that brightens with the clearing's edge (the witch inside, a sigil put down).
vec3 gladeLight(vec3 P) {
  vec3 l = vec3(0.0);
  for (int i = 0; i < ${De}; i++) {
    if (i >= uGladeCount) break;
    vec4 G = uGlade[i];
    float d = length(P.xz - G.xy);
    if (d > G.z * 1.2) continue;
    float pool = 1.0 - smoothstep(G.z * 0.45, G.z, d), q = (d - G.z) / (G.z * 0.07), ring = exp(-q * q);
    l += uGladeRgb * (pool * uGladeLight.x + ring * (0.25 + 0.75 * G.w) * uGladeLight.y);
  }
  // Slowed time: its circle's edge shimmers, so the boundary of the magic reads (a ring of light flickering round it).
  if (uSlow.w > 0.0) {
    vec2 v = P.xz - uSlow.xy;
    float q = (length(v) - uSlow.z) / 0.6, a = atan(v.y, v.x);
    l += uGladeRgb * uSlow.w * exp(-q * q) * (0.35 + 0.65 * (0.5 + 0.5 * sin(a * 23.0 + uRealTime * 5.0)) * (0.5 + 0.5 * sin(a * 7.0 - uRealTime * 3.1)));
  }
  return l;
}

// N: world normal; P: world position; moonK: how much moonlight gets through (a shadow lowers
// it; the witch's own glow is never shadowed). Returns the light falling on that pixel.
vec3 nightLightShaded(vec3 N, vec3 P, float moonK) {
  vec3 l = uAmb * mix(1.0, moonK, 0.5) + uMoon * moonK * lightStep(max(0.0, dot(N, uMoonDir)));
  // The moon's fill from the open sky on whatever faces up (the art director's round 2: "dark should
  // still be legible"): canopy tops and open ground catch it, the undersides and the shade don't.
  // Wrapped (round 3): a crown's regular bumps lit by their own normals alone made a lattice of bright dots.
  l += uMoonUp.rgb * (moonK * mix(max(0.0, N.y), 1.0, uMoonUp.w));
  if (uShafts > 0.0 && moonK > 0.99) {
    // Moonbeams: diagonal bands across the world, as the lab draws them across the screen.
    float s = mod(P.x / uShaftScale + P.z * 0.9 / uShaftScale, 150.0);
    l += uMoonBeam * smoothstep(0.0, 6.0, s) * (1.0 - smoothstep(28.0, 34.0, s)); // soft-edged beams
  }
  // What nothing lights, darker (the mood's unlit: Ed's v5399 playtest, "The unlit forest needs to be darker"): the night's own light
  // so far, the ambient and the moon's; what's added below (her glow, the glades, the lights) stays as it is, so the lit stands out.
  l *= uUnlitDim;
  // The witch's glow (Ed, v147: "should fall off faster"; round 11: "a bit flat, it should fall off
  // closer"): full under her, falling off with the distance along the ground as
  // (1 - d/(reach × near))^falloff, a bright centre dropping quickly to dark at near of the reach;
  // lit from a source above her, so there's no hot spot under her.
  vec3 v = uGlowPos - P;
  float dg = length(v.xz), gr = uGlowR * uGlowNear;
  if (dg < gr) {
    float ndl = max(0.0, dot(N, normalize(v + vec3(0.0, 1e-4, 0.0)))) * 0.35 + 0.65;
    float fall = pow(1.0 - dg / gr, uGlowFalloff);
    l += uGlowRgb * min(1.0, ndl * fall * uGlowPower) * uGlowDim;
  }
  for (int i = 0; i < ${B}; i++) {
    if (i >= uLightCount) break;
    vec3 lv = uLightPos[i].xyz - P;
    float ld = length(lv), reach = uLightPos[i].w;
    if (ld >= reach) continue;
    float ndl = max(0.0, dot(N, lv / max(ld, 1e-4))) * 0.7 + 0.3;
    float fall = 1.0 - ld / reach;
    l += uLightCol[i].rgb * lightPattern(P - uLightPos[i].xyz, uLightPattern[i], vec2(1.0, 0.0), ld) * min(1.0, ndl * fall * fall * uLightCol[i].w);
  }
  l = l * uDim + gladeLight(P); // (inside a clearing the forest goes dark: Ed, 2026-10-06; render/glades.ts)
  if (uDisco.w > 0.5) {
    // The disco ball's specks: a grid of spots on a sphere round the ball, turning with it,
    // thrown onto whatever stands nearby.
    vec3 dv = P - uDisco.xyz;
    float dd = length(dv);
    if (dd < uDiscoParams.w && dd > 0.5) {
      vec3 dir = dv / dd;
      float az = atan(dir.z, dir.x) + uTime * uDiscoParams.x, el = asin(clamp(dir.y, -1.0, 1.0));
      vec2 g = vec2(az * 9.0, el * 9.0);
      vec2 cell = floor(g), f = fract(g) - 0.5;
      float pick = fract(sin(dot(cell, vec2(12.9898, 78.233))) * 43758.5453);
      float spot = 0.18 * (1.0 - dd / uDiscoParams.w * 0.5);
      if (pick < uDiscoParams.y && dot(f, f) < spot * spot) l += uDiscoColour * uDiscoParams.z * (1.0 - dd / uDiscoParams.w);
    }
  }
  if (uMirrorMoon.x > 0.0 && uMirrorMoon.z > 0.0) {
    // World metres: the same reflection sweeps over ground, tree trunks and animals.
    vec2 uv = P.xz * .27 + P.y * vec2(.09, -.13);
    uv += vec2(sin(uMirrorMoon.y), cos(uMirrorMoon.y)) * 2.2;
    vec2 tile = floor(uv);
    float seed = fract(sin(dot(tile, vec2(12.9898, 78.233))) * 43758.5453);
    vec2 centre = .25 + .5 * vec2(seed, fract(seed * 19.1));
    float spot = (1.0 - smoothstep(.08, .22, length(fract(uv) - centre))) * step(.58, seed);
    vec3 tint = .65 + .35 * cos(seed * 6.2832 + vec3(0., 2.1, 4.2));
    l += tint * (spot * uMirrorMoon.x * uMirrorMoon.z);
  }
  if (uContourDream.x > 0.) {
    float level = P.y / uContourDream.y;
    float line = 1. - smoothstep(0., uContourDream.z, abs(fract(level + .5) - .5));
    vec3 ink = .55 + .45 * cos(floor(level + .5) * 1.17 + vec3(0., 2.1, 4.2));
    l = mix(l, l * .5 + ink * (line * 3. + .12), uContourDream.x);
  }
  if (uLandscapeTrip.x == TRIP_UNDERWATER_LIGHT) {
    vec2 q = P.xz * .42 + P.y * vec2(.19, -.15);
    float t = uLandscapeTrip.w * .65;
    float lattice = sin(q.x + .8 * sin(q.y + t)) + cos(q.y * 1.2 - t + .6 * sin(q.x - t));
    float caustic = 1.0 - smoothstep(.025, .22, abs(lattice));
    l += vec3(.25, .8, .94) * caustic * uLandscapeTrip.y * uLandscapeTrip.z;
  }
  return softKnee(l);
}
vec3 nightLight(vec3 N, vec3 P) { return nightLightShaded(N, P, 1.0); }
// Her pool in her light's own colour (the art director, round 3: "a lime glow sits on the ground at the front of home's
// dancefloor"): her warm light times green grass came out lime, the brightest thing at home and off its palette. Within her
// pool, the lit ground's colour (col) is pulled toward her light's hue at the same brightness, most at its centre. And on a
// dark floor (the fern forest's litter: "her light doesn't show") it's never darker than POOL_LIFT there, so her pool reads.
vec3 glowPool(vec3 col, vec3 P) {
  vec3 v = uGlowPos - P;
  float dg = length(v.xz), gr = uGlowR * uGlowNear;
  if (dg >= gr || uGlowPower <= 0.0) return col;
  vec3 Y = vec3(0.3, 0.55, 0.15);
  float fall = pow(1.0 - dg / gr, uGlowFalloff) * min(1.0, uGlowPower) * uGlowDim;
  vec3 warm = max(min(dot(col, Y), ${ei.toFixed(3)}), ${ti.toFixed(3)} * fall) * uGlowRgb / max(1e-3, dot(uGlowRgb, Y));
  return mix(col, min(vec3(1.0), warm), ${Qa.toFixed(2)} * fall);
}
`,ai=4,de=9,$={uHiz:{value:null},uHizOn:{value:0},uHizSize:{value:new T(1,1)},uHizLevels:{value:0},uHizAt:{value:Array.from({length:de},()=>new b)}},ii=`
uniform sampler2D uHiz;
uniform float uHizOn, uHizLevels;
uniform vec2 uHizSize;
uniform vec4 uHizAt[${de}];
bool hizHidden(vec2 lo, vec2 hi, float near) {
  if (uHizOn < 0.5) return false;
  lo = clamp(lo, vec2(0.0), uHizSize - 1.0); hi = clamp(hi, vec2(0.0), uHizSize - 1.0);
  float span = max(hi.x - lo.x, hi.y - lo.y) + 1.0;
  int L = int(ceil(log2(max(span, 1.0))));
  if (float(L) > uHizLevels - 1.0) return false;
  vec4 at = uHizAt[0];
  for (int i = 0; i < ${de}; i++) if (i == L) at = uHizAt[i];
  float cell = exp2(float(L));
  vec2 a = min(floor(lo / cell), at.zw - 1.0), b = min(floor(hi / cell), at.zw - 1.0);
  vec2 ts = vec2(textureSize(uHiz, 0));
  float far = 0.0;
  for (int j = 0; j < 2; j++) for (int i = 0; i < 2; i++) {
    vec2 c = vec2(i == 0 ? a.x : b.x, j == 0 ? a.y : b.y);
    far = max(far, texelFetch(uHiz, ivec2(at.xy + c), 0).r);
  }
  return near > far;
}`,si="varying vec2 vUv; void main() { vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }",ri="uniform sampler2D uSrc; void main() { gl_FragColor = vec4(texelFetch(uSrc, ivec2(gl_FragCoord.xy), 0).r, 0.0, 0.0, 1.0); }",oi=`
uniform sampler2D uSrc; uniform vec2 uSrcSize;
void main() {
  ivec2 p = ivec2(gl_FragCoord.xy) * 2, m = ivec2(uSrcSize) - 1;
  float d = 0.0;
  for (int j = 0; j < 3; j++) for (int i = 0; i < 3; i++) {
    if ((i == 2 && p.x + 2 != m.x) || (j == 2 && p.y + 2 != m.y)) continue;
    d = max(d, texelFetch(uSrc, min(p + ivec2(i, j), m), 0).r);
  }
  gl_FragColor = vec4(d, 0.0, 0.0, 1.0);
}`,ni="uniform sampler2D uSrc; uniform vec2 uAt; void main() { gl_FragColor = texelFetch(uSrc, ivec2(gl_FragCoord.xy - uAt), 0); }";class Lr{depth=new ve(1,1,{depthBuffer:!0,stencilBuffer:!1});levels=[];atlas=new ve(1,1,{type:rt,format:Te,minFilter:N,magFilter:N,depthBuffer:!1});quad=new q(new $e(2,2));cam=new Et(-1,1,1,-1,0,1);copy;reduce;place;size={w:0,h:0};ok;constructor(e){this.depth.depthTexture=new za(1,1,La);const t=(i,s)=>new W({vertexShader:si,fragmentShader:i,uniforms:s,depthTest:!1,depthWrite:!1});this.copy=t(ri,{uSrc:{value:null}}),this.reduce=t(oi,{uSrc:{value:null},uSrcSize:{value:new T}}),this.place=t(ni,{uSrc:{value:null},uAt:{value:new T}}),this.quad.frustumCulled=!1,this.ok=e.capabilities.isWebGL2&&!!e.extensions.get("EXT_color_buffer_float")}resize(e,t){if(e===this.size.w&&t===this.size.h)return;this.size={w:e,h:t},this.depth.setSize(e,t);for(const l of this.levels)l.dispose();this.levels=[];let i=e,s=t,r=0,n=0;const o=$.uHizAt.value;for(;n<de;n++){const l=new ve(i,s,{type:rt,format:Te,minFilter:N,magFilter:N,depthBuffer:!1});if(this.levels.push(l),o[n].set(n===0?0:e,n===0?0:r,i,s),n>0&&(r+=s),i<=2&&s<=2){n++;break}i=Math.max(1,Math.ceil(i/2)),s=Math.max(1,Math.ceil(s/2))}for(let l=n;l<de;l++)o[l].set(0,0,0,0);$.uHizLevels.value=n,this.atlas.setSize(e+Math.ceil(e/2),Math.max(t,r)),$.uHizSize.value.set(e,t)}render(e,t,i,s,r,n){if($.uHizOn.value=0,!n||!this.ok||s<1||r<1)return;this.resize(s,r);const o=e,l=i.layers.mask,h=o.getRenderTarget(),u=o.autoClear,c=o.getClearColor(new qe),g=o.getClearAlpha();i.layers.set(ai),o.setRenderTarget(this.depth),o.setClearColor(0,0),o.autoClear=!0,o.render(t,i),i.layers.mask=l;const p=(d,f)=>{this.quad.material=d,o.setRenderTarget(f),o.render(this.quad,this.cam)};this.copy.uniforms.uSrc.value=this.depth.depthTexture,p(this.copy,this.levels[0]);for(let d=1;d<this.levels.length;d++){const f=this.levels[d-1];this.reduce.uniforms.uSrc.value=f.texture,this.reduce.uniforms.uSrcSize.value.set(f.width,f.height),p(this.reduce,this.levels[d])}o.setRenderTarget(this.atlas),o.setClearColor(0,0),o.clear(),o.autoClear=!1;const m=$.uHizAt.value;this.levels.forEach((d,f)=>{const v=m[f];this.place.uniforms.uSrc.value=d.texture,this.place.uniforms.uAt.value.set(v.x,v.y),this.atlas.viewport.set(v.x,v.y,v.z,v.w),o.setRenderTarget(this.atlas),this.quad.material=this.place,o.render(this.quad,this.cam)}),this.atlas.viewport.set(0,0,this.atlas.width,this.atlas.height),o.autoClear=u,o.setClearColor(c,g),o.setRenderTarget(h),$.uHiz.value=this.atlas.texture,$.uHizOn.value=1}compile(e){return Promise.all([this.copy,this.reduce,this.place].map(t=>{const i=new q(this.quad.geometry,t);return i.frustumCulled=!1,e.compileAsync(i,this.cam)}))}dispose(){this.depth.dispose(),this.atlas.dispose();for(const e of this.levels)e.dispose();this.copy.dispose(),this.reduce.dispose(),this.place.dispose(),this.quad.geometry.dispose()}}const Ar=`
float hash(vec2 p) { p = fract(p * vec2(123.34, 456.21)); p += dot(p, p + 45.32); return fract(p.x * p.y); }
float vnoise(vec2 p) {
  vec2 i = floor(p), f = fract(p), u = f * f * (3.0 - 2.0 * f);
  float a = hash(i), b = hash(i + vec2(1, 0)), c = hash(i + vec2(0, 1)), d = hash(i + vec2(1, 1));
  return a + (b - a) * u.x + (c - a) * u.y + (a - b - c + d) * u.x * u.y;
}
`,Mr=`
float bayer2(vec2 a) { a = floor(a); return fract(a.x / 2.0 + a.y * a.y * 0.75); }
float bayer4(vec2 a) { return bayer2(0.5 * a) * 0.25 + bayer2(a); }
`,li=`
float windGust(vec2 q) {
  vec2 i = floor(q), f = fract(q), e = f * f * (3.0 - 2.0 * f);
  float h00 = fract(sin(dot(i, vec2(127.1, 311.7))) * 43758.5453), h10 = fract(sin(dot(i + vec2(1, 0), vec2(127.1, 311.7))) * 43758.5453);
  float h01 = fract(sin(dot(i + vec2(0, 1), vec2(127.1, 311.7))) * 43758.5453), h11 = fract(sin(dot(i + vec2(1, 1), vec2(127.1, 311.7))) * 43758.5453);
  return mix(mix(h00, h10, e.x), mix(h01, h11, e.x), e.y);
}
`,Xe=`
vec2 pixelSnap(vec4 b) {
  vec2 ndc = b.xy / b.w, snapped = (floor((ndc * 0.5 + 0.5) * uRes) + 0.5) / uRes * 2.0 - 1.0;
  return snapped - ndc;
}
`,fe=256;function _e(a){a.byteOffset%4&&(a=a.slice());const e=a.length>>2,t=new Uint32Array(a.buffer,a.byteOffset,e),i=new Uint8Array(e),s=new Map([[0,0]]),r=new Uint8Array(fe*4);let n=0,o=0;for(let l=0;l<e;l++){const h=t[l];if(h!==n){let u=s.get(h);if(u===void 0){if(u=s.size,u>=fe)return null;s.set(h,u),r.set(a.subarray(l*4,l*4+4),u*4)}n=h,o=u}i[l]=o}return{idx:i,pal:r}}const Tr=(a,e,t,i)=>e?e[a[t]*4+i]:a[t*4+i],ft=(a,e,t)=>t?a*e+fe*4:a*e*4;function Ce(a,e,t){return a.getContext("2d").getImageData(0,0,e,t).data}const hi=(a,e=2048)=>Aa(ui(a,e));function*ui(a,e=2048){const i=[],s=new Map;let r=0,n=0,o=0,l=1;for(const[d,f]of a.entries()){const v=s.get(f);if(v!==void 0){i.push(i[v]);continue}s.set(f,d),r+f.w+1>e&&(r=0,n+=o+1,o=0),i.push({x:r,y:n}),r+=f.w+1,o=Math.max(o,f.h),l=Math.max(l,r)}const h=Math.max(1,n+o),u=new Uint8Array(l*h*4),c=new Uint8Array(l*h*4),g=[];for(let d=0;d<a.length;d++){d&&d%4===0&&(yield);const f=a[d],v=s.get(f);if(v!==d){g.push(g[v]);continue}const S=i[d],w=Ce(f.A,f.w,f.h),P=Ce(f.N,f.w,f.h),L=f.S?Ce(f.S,f.w,f.h):null,_=L?Array.from({length:f.h},(z,k)=>Array.from({length:f.w},(U,G)=>L[(k*f.w+G)*4+1])):null;for(let z=0;z<f.h;z++){const k=z*f.w*4,U=((S.y+z)*l+S.x)*4;if(u.set(w.subarray(k,k+f.w*4),U),f.eyes)for(let G=0;G<f.w;G++)f.eyes[z*f.w+G]&&u[U+G*4+3]===255&&(u[U+G*4+3]=253);if(c.set(P.subarray(k,k+f.w*4),U),f.S){const G=_[z];for(let I=0;I<f.w;I++)c[U+I*4+3]&&(c[U+I*4+3]=G[I])}}let y=0;e:for(let z=f.h-1;z>=0;z--,y++)for(let k=0;k<f.w;k++)if(w[(z*f.w+k)*4+3]>=128)break e;let A=0;if(y<f.h){const z=f.h-1-y;for(let k=0;k<f.w;k++)w[(z*f.w+k)*4+3]>=128&&(A=Math.max(A,Math.abs(k+.5-f.w/2)+.5))}g.push({uv:[S.x/l,S.y/h,(S.x+f.w)/l,(S.y+f.h)/h],w:f.w,h:f.h,pad:Math.min(y,f.h),...A?{foot:A}:{},...f.S?{masked:!0}:{},...f.head?{head:f.head}:{}})}yield;const p=_e(u);yield;const m=_e(c);return{albedo:p?.idx??u,normal:m?.idx??c,albedoPal:p?.pal??null,normalPal:m?.pal??null,width:l,height:h,frames:g}}const ra={},oa=["baby","young","adult","legend"],gt=new Map,Er=(a,e,t)=>`${oa[a]}-walk${e}${t?"-away":""}`;function Gr(a,e){const t=`${a}/${e}`,i=ra[t];if(!i)return;let s=gt.get(t);if(!s){const r=atob(i.px),n=new Uint8ClampedArray(r.length);for(let o=0;o<r.length;o++)n[o]=r.charCodeAt(o);gt.set(t,s={w:i.w,h:i.h,rgba:n})}return s}const Rr=(a,e)=>ci.has(`${a}/${oa[e]}`),ci=new Set(Object.keys(ra).map(a=>a.slice(0,a.indexOf("-"))));function di(a){const e=new Uint8Array(2048);e.set(a.subarray(0,1024));for(let t=0;t<256;t++){const i=t*4,s=(a[i]*.3+a[i+1]*.55+a[i+2]*.15)/255;e.set([Math.round(90+s*150),Math.round(145+s*105),Math.round(180+s*75),a[i+3]],1024+i)}return e}let Ze=!1;function Dr(a){Ze=a}const _r=()=>Ze,fi=a=>{Ze||(a.image.data=null),a.onUpdate=null};function Oe(a,e,t,i=!1){const s=new xe(a,e,t,i?Te:Gt,Rt);return i&&(s.unpackAlignment=1),s.magFilter=N,s.minFilter=N,s.generateMipmaps=!1,s.flipY=!1,s.colorSpace=Dt,s.needsUpdate=!0,s.onUpdate=fi,s}function na(a){const e=new xe(di(a),fe,2,Gt,Rt);return e.magFilter=e.minFilter=N,e.generateMipmaps=!1,e.flipY=!1,e.colorSpace=Dt,e.needsUpdate=!0,e}let gi=null;const Ue=()=>gi??=na(new Uint8Array(fe*4));function Or(a,e,t,i){const s=_e(a),[r,n]=We(s?.idx??a,s?.pal??null,e,t,i);return{tex:r,pal:n,indexed:!!s}}function We(a,e,t,i,s){const r=ye(Oe(a,t,i,!!e),s);if(!e)return[r,Ue()];const n=ye(na(e),s);return r.addEventListener("dispose",()=>n.dispose()),[r,n]}function mi(a,e="props"){const[t,i]=We(a.albedo,a.albedoPal,a.width,a.height,e),[s,r]=We(a.normal,a.normalPal,a.width,a.height,e);return{albedo:t,normal:s,albedoPal:i,normalPal:r,indexed:new T(a.albedoPal?1:0,a.normalPal?1:0),frames:a.frames}}function Ur(a){const e=n=>{const o=n.image;return[o?.width??0,o?.height??0]},[t,i]=e(a.albedo),[s,r]=e(a.normal);return ft(t,i,a.indexed.x>.5)+ft(s,r,a.indexed.y>.5)+(a.indexed.x>.5?1024:0)+(a.indexed.y>.5?1024:0)}const pi=(a="uAlbedo",e="uNormal")=>`
uniform sampler2D ${a}, ${e}, ${a}Pal, ${e}Pal;
uniform vec2 uIndexed;
vec4 albedoAt(vec2 q) { vec4 c = texture2D(${a}, q); return uIndexed.x > 0.5 ? texelFetch(${a}Pal, ivec2(int(c.r * 255.0 + 0.5), 0), 0) : c; }
vec4 normalAt(vec2 q) { vec4 c = texture2D(${e}, q); return uIndexed.y > 0.5 ? texelFetch(${e}Pal, ivec2(int(c.r * 255.0 + 0.5), 0), 0) : c; }
`,vi=(a,e="uAlbedo",t="uNormal")=>({[e]:{value:a.albedo},[t]:{value:a.normal},[e+"Pal"]:{value:a.albedoPal},[t+"Pal"]:{value:a.normalPal},uIndexed:{value:a.indexed}});function wi(a,e,t="uAlbedo",i="uNormal"){a[t].value=e.albedo,a[i].value=e.normal,a[t+"Pal"].value=e.albedoPal,a[i+"Pal"].value=e.normalPal,a.uIndexed.value=e.indexed}function Wr(a){const e=new Uint8Array(4),t={uv:[0,0,0,0],w:1,h:1,pad:0};return{albedo:Oe(e,1,1),normal:Oe(new Uint8Array(4),1,1),albedoPal:Ue(),normalPal:Ue(),indexed:new T(0,0),frames:Array.from({length:a},()=>t),grounds:[]}}const Hr=(a,e=2048)=>mi(hi(a,e));function yi(a){return{value:a?new b(1,a.lightFloor,a.lightTint,a.lightRim):new b}}const bi=`
uniform vec4 uWitchLight; // on, floor, tint, rim
uniform float uWitchGlow; // how much of her own glow lights her (the mood's: render/mood.ts)
uniform float uWitchLift; // her pool's light thrown up onto her, added (stylised art: its tones are baked dark)
uniform float uWitchHush; // her own batch's, in bed: the share of her glow and lift taken off her (render/bedPose.ts bedHush); 0 elsewhere
vec3 witchShade(vec3 base, vec3 N, vec3 F, vec3 P) {
  // (inside a legend's clearing the forest's light dims and the clearing's twilight lights her: render/glades.ts)
  vec3 env = (uAmb + uMoon * lightStep(max(0.0, dot(N, uMoonDir)))) * uDim + gladeLight(P);
  float own = 1.0 - uWitchHush;
  vec3 col = base * max(vec3(uWitchLight.y), env * 1.25 + uGlowRgb * uGlowPower * uWitchGlow * own);
  // Her pool's light thrown back up onto her (the art director's round 3: in a stylised style she vanished in her own
  // pool): added, so even the style's near-black tones and outline lift, warm, and she's the brightest thing in it.
  col += (base + 0.1) * uGlowRgb * uWitchLift * own;
  vec3 tint = vec3(0.0), rim = vec3(0.0);
  float edge = 1.0 - clamp(dot(N, F), 0.0, 1.0); // her outline's pixels face sideways
  for (int i = 0; i < ${B}; i++) {
    if (i >= uLightCount) break;
    vec3 lv = uLightPos[i].xyz - P;
    float ld = length(lv), reach = uLightPos[i].w;
    if (ld >= reach) continue;
    vec3 L = lv / max(ld, 1e-4);
    float ndl = max(0.0, dot(N, L)), fall = 1.0 - ld / reach, k = fall * fall * uLightCol[i].w;
    tint += uLightCol[i].rgb * min(1.0, (ndl * 0.7 + 0.3) * k);
    rim += uLightCol[i].rgb * min(1.0, ndl * edge * k);
  }
  col += base * tint * uWitchLight.z * 1.25 + mix(base, vec3(1.0), 0.5) * rim * uWitchLight.w;
  return min(vec3(1.0), col);
}
`,xi=3,He={uCastMap:{value:null},uCastWin:{value:new b(0,0,1,0)}},Si=`
uniform sampler2D uCastMap;
uniform vec4 uCastWin;
vec3 castShadow(vec2 xz) {
  if (uCastWin.w <= 0.0) return vec3(1.0);
  vec2 uv = vec2(xz.x - uCastWin.x, uCastWin.y - xz.y) / uCastWin.z;
  vec2 e = min(uv, 1.0 - uv);
  float k = smoothstep(0.0, 0.1, min(e.x, e.y));
  if (k <= 0.0) return vec3(1.0);
  return mix(vec3(1.0), texture2D(uCastMap, uv).rgb, k);
}
`;class Nr{constructor(e=160,t=1024){this.size=e,this.res=t,this.rt=new ve(t,t,{minFilter:ot,magFilter:ot,depthBuffer:!1,stencilBuffer:!1,generateMipmaps:!1});const i=e/2;this.cam=new Et(-i,i,i,-i,1,2e3),this.cam.up.set(0,0,-1),this.cam.layers.set(xi),He.uCastMap.value=this.rt.texture}size;res;rt;cam;clear=new qe;render(e,t,i,s,r){const n=He.uCastWin.value;if(!r){n.w=0;return}const o=this.size/this.res,l=Math.round(i/o)*o,h=Math.round(s/o)*o;this.cam.position.set(l,1e3,h),this.cam.lookAt(l,0,h),this.cam.updateMatrixWorld();const u=te.uBend.value.x,c=t.background,g=e.getRenderTarget(),p=e.getClearAlpha();e.getClearColor(this.clear),te.uBend.value.x=0,t.background=null,e.setRenderTarget(this.rt),e.setClearColor(16777215,1),e.clear(!0,!1,!1),e.render(t,this.cam),e.setRenderTarget(g),e.setClearColor(this.clear,p),t.background=c,te.uBend.value.x=u,n.set(l-this.size/2,h+this.size/2,this.size,1)}dispose(){this.rt.dispose()}}class D{lo=1/0;hi=-1;range={start:0,count:0};touch(e){e<this.lo&&(this.lo=e),e>this.hi&&(this.hi=e)}flush(e){if(this.hi>=this.lo){const t=e.itemSize,i=this.range,s=e.updateRanges[0];let r=this.lo*t,n=(this.hi+1)*t;s&&(r=Math.min(s.start,r),n=Math.max(s.start+s.count,n),e.clearUpdateRanges()),i.start=r,i.count=n-r,e.updateRanges.push(i),e.needsUpdate=!0}this.lo=1/0,this.hi=-1}}const Fi={ramp:["#49141e","#b43216","#ff7826","#fff0af"],contrast:"#77bbee",motion:0,imprint:"scorch",sound:"fire"},ki={ramp:["#163b64","#397cbb","#9dd8ed","#f0fbff"],contrast:"#ffffff",motion:1,imprint:"frost",sound:"ice"},Ci={ramp:["#193116","#467d23","#a7d73a","#f1fac1"],contrast:"#a366bb",motion:2,imprint:"wet",sound:"water"},Pi={ramp:["#302749","#7774b8","#c4c3eb","#f6efff"],contrast:"#94cfed",motion:3,imprint:"charge",sound:"light"},zi={ramp:["#22254e","#525fbd","#91c3f1","#f2faff"],contrast:"#e6bf78",motion:4,imprint:"charge",sound:"storm"},Li={ramp:["#30221d","#81532d","#ce9b55","#f3d9a4"],contrast:"#95b88b",motion:5,imprint:"push",sound:"earth"},Ai={ramp:["#20192f","#674878","#b289c1","#f1d8f5"],contrast:"#b9a2d3",motion:6,imprint:"scorch",sound:"void"},Mi={ramp:["#273426","#518551","#d895b6","#f6dddc"],contrast:"#b1d97d",motion:7,imprint:"bloom",sound:"nature"},Ti={ramp:["#173646","#28799c","#6fc9db","#dbf6ee"],contrast:"#b5dce5",motion:2,imprint:"wet",sound:"water"},Ei={ramp:["#41302c","#9b7142","#dcb67a","#f4e1b2"],contrast:"#bba38c",motion:5,imprint:"push",sound:"earth"},Gi={ramp:["#233025","#536542","#a1a66a","#e2d7a6"],contrast:"#c6a26f",motion:7,imprint:"bloom",sound:"nature"},Ri={ramp:["#283c41","#629298","#abd1cf","#edf2da"],contrast:"#e0d8b1",motion:3,imprint:"push",sound:"wind"},Di={ramp:["#352239","#a65879","#dfad66","#fff0c2"],contrast:"#e598bb",motion:7,imprint:"bloom",sound:"party"},_i={ramp:["#4a3a6a","#d0c8f0","#f4f0ff","#ffffff"],contrast:"#ffe9a8",motion:3,imprint:"bloom",sound:"light"},Oi={ramp:["#4a2c06","#c08414","#ffd23c","#fff7c8"],contrast:"#fffbe8",motion:3,imprint:"charge",sound:"light"},j={fire:Fi,frost:ki,venom:Ci,moonlight:Pi,storm:zi,earth:Li,shadow:Ai,bloom:Mi,water:Ti,sand:Ei,wood:Gi,wind:Ri,party:Di,rainbow:_i,gold:Oi},Ui={id:0,size:1.7,ground:!1},Wi={id:1,size:4,ground:!1},Hi={id:2,size:1.1,ground:!1},Ni={id:3,size:2,ground:!0},Ii={id:4,size:3.2,ground:!1},$i={id:5,size:9,ground:!1},qi={id:6,size:5,ground:!1},Bi={id:7,size:6,ground:!1},ji={id:8,size:2,ground:!0},Ki={id:9,size:5,ground:!1},Vi={id:10,size:2.2,ground:!1},Ji={id:11,size:1.1,ground:!1},R={projectile:Ui,burst:Wi,beam:Hi,zone:Ni,aura:Ii,pillar:$i,vortex:qi,dome:Bi,trap:ji,eruption:Ki,lob:Vi,trail:Ji},Yi=[.25,.45,.65,1],Xi=[.6,1.4],Zi=[.08,.25],Qi=.5,es=6,ts=.2,as=[6,18],is=[.2,.85],ss=128,rs=200,os=5,ns=256,ls=2048,x={levels:Yi,size:Xi,halo:Zi,secondaryAt:Qi,lightCap:es,lightEase:ts,lightReach:as,lightStrength:is,fieldSize:ss,fieldMetres:rs,imprintSeconds:os,pool:ns,instances:ls},mt=["frost","scorch","wet","bloom","charge","push"],H=Object.keys(j),pt=Object.keys(R),ie=a=>x.levels[Math.max(0,Math.min(3,Math.round(a)))]??.65,se=(a,e)=>a[0]+(a[1]-a[0])*Math.max(0,Math.min(1,e));function K(a){return Object.hasOwn(j,a)?a:"moonlight"}function Pe(a,e,t,i,s){return Math.max(0,t)/(1+Math.hypot(a-i,e-s)/12)}class hs{constructor(e=x.fieldSize,t=x.fieldMetres){this.size=e,this.metres=t,this.data=new Uint8Array(e*e*8),this.values=new Float32Array(this.data.length),this.cell=t/e}size;metres;data;values;x=0;z=0;cell;ready=!1;ink=0;dirty=!0;publishedActive=!1;work={decayValues:0,publishValues:0,clearValues:0};get active(){return this.publishedActive}index(e,t){return((t%this.size+this.size)%this.size*this.size+(e%this.size+this.size)%this.size)*8}move(e,t){const i=Math.floor(e/this.cell)-this.size/2,s=Math.floor(t/this.cell)-this.size/2;if(!(this.ready&&i===this.x&&s===this.z)){if(!this.ink&&!this.publishedActive){this.x=i,this.z=s,this.ready=!0;return}for(let r=s;r<s+this.size;r++)for(let n=i;n<i+this.size;n++)if(!this.ready||n<this.x||n>=this.x+this.size||r<this.z||r>=this.z+this.size){const o=this.index(n,r);this.work.clearValues+=16;for(let l=o;l<o+8;l++)this.values[l]>0&&this.ink--,(this.values[l]!==0||this.data[l]!==0)&&(this.dirty=!0),this.values[l]=0,this.data[l]=0}this.x=i,this.z=s,this.ready=!0}}decay(e){const t=Math.max(0,e)*255/x.imprintSeconds;if(!(!t||!this.ink)){this.work.decayValues+=this.values.length;for(let i=0;i<this.values.length;i++){const s=this.values[i];this.values[i]=Math.max(0,s-t),s>0&&this.values[i]===0&&this.ink--}this.dirty=!0}}stamp(e,t,i,s,r){const n=mt.indexOf(s);if(n<0||!(i>0)||!this.ready)return;const o=Math.max(this.x,Math.floor((e-i)/this.cell)),l=Math.min(this.x+this.size-1,Math.floor((e+i)/this.cell)),h=Math.max(this.z,Math.floor((t-i)/this.cell)),u=Math.min(this.z+this.size-1,Math.floor((t+i)/this.cell));for(let c=h;c<=u;c++)for(let g=o;g<=l;g++){const p=Math.hypot((g+.5)*this.cell-e,(c+.5)*this.cell-t),m=Math.max(0,1-p/i)*Math.min(1,Math.max(0,r))*255,d=this.index(g,c)+n,f=this.values[d];this.values[d]=Math.max(f,m),this.values[d]!==f&&(f===0&&this.values[d]>0&&this.ink++,this.dirty=!0)}}publish(){if(!this.dirty)return!1;this.work.publishValues+=this.data.length,this.publishedActive=!1;for(let e=0;e<this.data.length;e++)this.data[e]=Math.round(this.values[e]),this.data[e]&&(this.publishedActive=!0);return this.dirty=!1,!0}at(e,t,i){const s=Math.floor(e/this.cell),r=Math.floor(t/this.cell);return s<this.x||s>=this.x+this.size||r<this.z||r>=this.z+this.size?0:this.values[this.index(s,r)+mt.indexOf(i)]/255}reset(){(this.ink||this.publishedActive)&&(this.values.fill(0),this.data.fill(0),this.work.clearValues+=this.values.length+this.data.length,this.dirty=!0),this.ink=0,this.publishedActive=!1,this.ready=!1}}const vt=()=>{const a=ye(new xe(new Uint8Array(x.fieldSize**2*4),x.fieldSize,x.fieldSize),"fx");return a.minFilter=a.magFilter=N,a.wrapS=a.wrapT=Ma,a.generateMipmaps=!1,a.needsUpdate=!0,a},O={uFxField:{value:vt()},uFxExtra:{value:vt()},uFxBox:{value:new b(0,0,x.fieldMetres,x.fieldSize)},uFxOn:{value:0},uFxTime:{value:0},uFxCalm:{value:0},uFxVertex:{value:1}},la=`
uniform sampler2D uFxField, uFxExtra;
uniform vec4 uFxBox;
uniform float uFxOn, uFxTime, uFxCalm, uFxVertex;
vec4 fxField(vec2 p) {
  if(uFxOn<0.5 || any(lessThan(p,uFxBox.xy)) || any(greaterThanEqual(p,uFxBox.xy+uFxBox.z)))return vec4(0.0);
  return texture2D(uFxField,(floor(p/(uFxBox.z/uFxBox.w))+0.5)/uFxBox.w);
}
vec4 fxExtra(vec2 p) {
  if(uFxOn<0.5 || any(lessThan(p,uFxBox.xy)) || any(greaterThanEqual(p,uFxBox.xy+uFxBox.z)))return vec4(0.0);
  return texture2D(uFxExtra,(floor(p/(uFxBox.z/uFxBox.w))+0.5)/uFxBox.w);
}
vec3 fxTint(vec3 rgb,vec4 f) {
  float l=dot(rgb,vec3(0.3,0.55,0.15));
  rgb=mix(rgb,vec3(0.35,0.57,0.71)+l*vec3(0.59,0.41,0.29),f.r);
  rgb=mix(rgb,rgb*vec3(0.32,0.25,0.3),f.g*0.8);
  rgb*=1.0-f.b*0.25;
  return mix(rgb,rgb*vec3(0.8,1.25,0.85)+vec3(0.07,0.08,0.04),f.a*0.55);
}
`;function Ir(a,e=!1){return a.asleep?.18:a.leashed||a.friendly||a.state==="happy"?.28:e||a.charge||a.leap?1:a.enraged||a.state==="enraged"?.8:.42}const us={uThermalStrength:{value:0},uThermalColdBrightness:{value:.35},uThermalDangerGain:{value:1}},cs=`
uniform float uThermalStrength, uThermalColdBrightness, uThermalDangerGain;
vec3 thermalCold(vec3 colour) {
  float detail = clamp(dot(colour, vec3(.2126,.7152,.0722)), 0.0, 1.0);
  return mix(vec3(.008,.014,.055), vec3(.06,.34,.8), sqrt(detail)) * uThermalColdBrightness;
}
vec3 thermalCreature(vec3 paint, vec3 normal, float heat) {
  float detail = clamp(dot(paint, vec3(.2126,.7152,.0722)) * .7 + (normal.z * .5 + .5) * .3, 0.0, 1.0);
  float danger = clamp(.42 + (heat - .42) * uThermalDangerGain, 0.0, 1.0);
  float localHeat = clamp(.2 + danger * .65 + (detail - .5) * .4, 0.0, 1.0);
  vec3 warm = localHeat < .35 ? mix(vec3(.15,.85,.06), vec3(1.0,.88,.025), localHeat / .35)
    : localHeat < .65 ? mix(vec3(1.0,.88,.025), vec3(1.0,.32,.015), (localHeat-.35)/.3)
    : mix(vec3(1.0,.32,.015), vec3(1.0,.025,.008), (localHeat-.65)/.35);
  // Fur markings and relief change temperature bands, not just brightness, even in an unlit forest.
  return warm * (.65 + .35 * sqrt(detail));
}
`;function $r(a){return 1/(a.artPixelsPerMetre*(2/a.pixelSize))}function ds(a){const e=a.treeNormals;if(e===!1||e==="0"||e===0)return-1;const t=typeof e=="string"&&/^\d+$/.test(e)?Number(e):0;return t>=1&&t<=255?t:0}const qr=a=>ds(a)<0?0:1,Y={...us,uPotionSky:{value:0},uPoolReadability:{value:new URLSearchParams(globalThis.location?.search??"").get("poolreadability")==="1"?1:0},uMoodRim:{value:new b},uRimInset:{value:0},uWitchGlow:{value:0},uWitchLift:{value:0},uRight:{value:new C(1,0,0)},uUp:{value:new C(0,1,0)},uFacing:{value:new C(0,0,1)},uTopFade:{value:0},uCutout:{value:new b(0,0,0,1)},uCutWhole:{value:0},uCutShape:{value:new b(0,.35,0,.2)},uDebugCull:{value:0},uRes:{value:new T(1,1)},uWitch:{value:new b(0,0,0,0)},uWitchDepth:{value:0},uOcc:{value:new b(.38,6,2.5,1)},uNearCut:{value:0},uCircleBox:{value:new b(0,0,0,0)},uCircleFade:{value:new b(0,0,1,1)},uEdgeDither:{value:0},uHoleHard:{value:0},uCircleKeep:{value:new b(0,0,0,0)},uWholeCull:{value:typeof location<"u"&&new URLSearchParams(location.search).get("wholecull")==="0"?0:1},uParty:{value:Array.from({length:16},()=>new b)},uPartyCol:{value:Array.from({length:16},()=>new C)},uPartyCount:{value:0},uUplight:{value:new b},uTrunkFade:{value:new C(0,.125,.3)},uFindLook:{value:new b},uEyeRgb:{value:new C(1,.8,.35)},uEyeRange:{value:40},uTrunkLook:{value:new T(.8,.5)},uAreaAvg:{value:1},uSeeDepth:{value:1},uSeeDbg:{value:new b(1,0,1,0)},uCullByPass:{value:new URLSearchParams(globalThis.location?.search??"").get("cullpass")==="0"?0:1},uCullDbg:{value:7},uSeeEarly:{value:1},uSeeTwo:{value:1},uSeeDither:{value:0},uSeeShowA:{value:0},uSeeSolid:{value:0},uDebugTrunks:{value:0},uWind:{value:new b(0,0,1,0)},uLeafJitter:{value:new C(0,0,0)},uTreeNormals:{value:1},uWatch:{value:new b(0,0,9,0)}},re=`
uniform vec4 uSeeDbg;
uniform vec3 uRight, uUp;
uniform vec2 uRes;
uniform float uWitchDepth;
uniform vec4 uOcc;
uniform float uNearCut;
varying float vNear;
uniform vec4 uCircleBox, uCircleFade;
uniform vec4 uCircleKeep;
uniform float uHasFade, uEdgeDither, uHoleHard;
uniform float uWholeCull;
varying float vCircle; // how much of it shows, the place she stands in kept clear (1 all of it)
uniform float uAbsolute; // its y is a world height, not a height over the ground
uniform float uLie; // lies on the ground, its rows running away from the camera this many metres a metre of its height (0: upright)
uniform vec4 uLean; // the witch under a load (render/load.ts): sheared forward (m per m up), tilted nose-up (m per m across), her broom bowed (art pixels)
uniform vec4 uCutout, uWitch;
varying float vHole;   // crowns and cut trunks: the radius of the hole round her (pixels) for this tree
varying float vCrownD; // and how far the nearest of its crown is from the hole's middle on screen (pixels)
uniform vec4 uCutShape;
varying float vOverHer; // over her on screen and nearer the camera: it could hide her
uniform float uCutWhole, uTopFade, uFadePass, uIsScenery, uAppear, uFlat;
uniform vec4 uSilhouette;
uniform vec2 uScenery, uHazeCentre;
uniform float uCullDbg, uCullByPass, uSeeTwo, uSeeDither;
uniform float uCanopyReach;
attribute vec3 iPos;
attribute vec3 iSize; // its width and height (metres), and how far its foot reaches either side of its base
attribute vec4 iUv;
attribute vec4 iFlags; // flip, top (or a trunk's cut, negative), fresh + 2 for small foliage, sway
attribute float iGlow; // glowing white, 0 to 1 (a party animal evolving); -1: a wild creature blinking (no eyeshine); -0.5: switched off (its glowing pixels unlit)
attribute vec3 iJitter; // leaf hue/value jitter; z is semantic creature heat (zero for scenery)
varying float vGlow;
varying vec2 vJitter;
varying float vThermalHeat;
varying float vSwayM; // metres its leafiest pixels move this frame (masked sprites)
varying vec4 vFrame;  // its frame in the atlas (u0, v0, u1, v1), to keep the sway inside it
uniform vec4 uWind;
uniform vec4 uWatch;
varying vec2 vUv;
varying vec3 vWorld;
varying vec3 vFlags;
varying float vSmall;
varying float vTree; // a tree (trunk, crown or far crown): the tree-normals switch's (uTreeNormals)
varying float vFront;
varying vec2 vLocal;
varying float vSizeY;
varying vec2 vGround; // its ground spot under this pixel: its foot, across its width (the cast shadows: render/castShadows.ts)
${je}
${li}${Xe}${ii}
${la}
varying vec2 vFxBase;
varying vec4 vFxPaint;
varying vec2 vFxInfo;
void main() {
  // Every sprite stands upright on the rolling ground (height.ts), at the lowest ground under its
  // foot (most of its width, up to 5 m either side of its base, at five points): on a slope its uphill side is planted in the
  // hillside and nothing floats (Ed, v276: 50 m hills, too steep to skew sprites to). A foot drawn wider than that (a kapok's
  // buttresses, a strangler fig's roots, 30 m across) reaches as far as it's drawn, so its tips don't hang over the downhill side.
  // (Or, for her, at the height given: she rides a smoothed height over the hills, ride.ts.)
  float fw = max(min(iSize.x * 0.45, 5.0), iSize.z);
  float gl = min(min(groundH(iPos.xz), min(groundH((iPos - uRight * fw).xz), groundH((iPos + uRight * fw).xz))), min(groundH((iPos - uRight * fw * 0.5).xz), groundH((iPos + uRight * fw * 0.5).xz)));
  vec3 base = iPos + vec3(0.0, uAbsolute > 0.5 ? 0.0 : gl, 0.0);
  vec3 drawSize = iSize;
  if (iFlags.z >= 4.0 && uLandscapeTrip.x == TRIP_GIANT_TREES) {
    drawSize.y *= mix(1., uLandscapeTrip.z, uLandscapeTrip.y);
  } else if (uIsScenery > .5 && uLandscapeTrip.x == TRIP_DISTANT_GIANTS) {
    float farK = smoothstep(3., 75., length(base.xz - uHazeCentre));
    drawSize.xy *= mix(1., mix(.3, uLandscapeTrip.z, farK), uLandscapeTrip.y);
  } else if (iFlags.z >= 4.0 && uLandscapeTrip.x == TRIP_WALKING_WOOD) {
    float seed = dot(base.xz, vec2(.73, .31));
    float stride = uLandscapeTrip.w * 1.3 + seed;
    base.xz += vec2(cos(seed), sin(seed)) * sin(stride) * uLandscapeTrip.z * uLandscapeTrip.y;
    base.y += abs(cos(stride * 3.)) * .18 * uLandscapeTrip.z * uLandscapeTrip.y;
  }
  // Tall and nearer the camera than the witch: it may stand in front of her.
  // Eased over a few metres of depth and of height, so nothing snaps into the fade as she moves.
  vFront = smoothstep(0.0, 3.0, uWitchDepth - 0.5 + (viewMatrix * vec4(base, 1.0)).z) * smoothstep(uOcc.z * 0.7, uOcc.z * 1.3, drawSize.y);
  // Lying on the ground (a great stump, render/view/home.ts): its rows away from the camera, as the art's camera saw them, so every
  // pixel of its ground is on the ground at any pitch, bent with it (Ed, 2026-10-29: "Stumps do not sit on the ground").
  vec3 upv = uLie > 0.0 ? cross(vec3(0.0, 1.0, 0.0), uRight) * uLie : uUp;
  vec3 w = base + uRight * (position.x * drawSize.x) + upv * (position.y * drawSize.y);
  w += uRight * (uLean.x * position.y * drawSize.y) + uUp * (uLean.y * position.x * drawSize.x);
  // Wind (Ed, v171): leafy things lean with gusts travelling across the forest, anchored at their
  // base (a crown at its foot, a trunk barely), so the trunks stay put and the foliage moves.
  if (iFlags.w > 0.0 && uWind.x > 0.0) {
    vec2 q = iPos.xz / uWind.z - vec2(0.8, 0.35) * uWind.w * uWind.y / uWind.z;
    float gust = windGust(q);
    float flutter = sin(uWind.w * 1.7 + dot(iPos.xz, vec2(0.31, 0.17))) * 0.35;
    w += uRight * (uWind.x * iFlags.w * uv.y * uv.y * (gust * 0.9 + flutter)) * min(1.0, drawSize.y / 8.0);
  }
  // With a sway mask (#34; negative sway), the quad stays put and the fragment shader moves its leaves.
  vFxBase = iPos.xz;
  // Every fragment of this instance reads its ground anchor: fetch once per vertex, not per leaf pixel/pass.
  vFxPaint = fxField(iPos.xz);
  vFxInfo = fxExtra(iPos.xz).rg;
  if (iFlags.w != 0.0 && uFxOn > 0.5) w += uRight * (vFxInfo.g * uv.y * uv.y * 0.7);
  vSwayM = 0.0;
  if (iFlags.w < 0.0 && uWind.x > 0.0) {
    vec2 q = iPos.xz / uWind.z - vec2(0.8, 0.35) * uWind.w * uWind.y / uWind.z;
    float gust = windGust(q);
    float flutter = sin(uWind.w * 1.7 + dot(iPos.xz, vec2(0.31, 0.17))) * 0.35;
    vSwayM = uWind.x * -iFlags.w * (gust * 0.9 + flutter) * min(1.0, drawSize.y / 8.0);
  }
  // The trees watching her (Ed, 2026-10-07, the wild forest eerier: "canopy tips within a few metres of her sway a beat late
  // and slightly towards her, as if the trees lean in to watch"): a leafy thing near where she was a moment ago (uWatch,
  // eased behind her) leans its tip that way, across the screen, none at its foot; a nudge, no new objects.
  if (uWatch.w > 0.0 && iFlags.w != 0.0) {
    vec2 d = uWatch.xy - iPos.xz;
    float r = length(d), k = (1.0 - smoothstep(uWatch.z * 0.4, uWatch.z, r)) * smoothstep(0.3, 1.2, r);
    float lean = uWatch.w * k * dot(d / max(r, 1e-3), normalize(uRight.xz + vec2(1e-6, 0.0))) * abs(iFlags.w) * min(1.0, drawSize.y / 8.0);
    if (iFlags.w > 0.0) w += uRight * (lean * uv.y * uv.y);
    else vSwayM += lean;
  }
  vFrame = vec4(min(iUv.x, iUv.z), min(iUv.y, iUv.w), max(iUv.x, iUv.z), max(iUv.y, iUv.w));
  float u = iFlags.x > 0.5 ? 1.0 - uv.x : uv.x;
  vUv = vec2(mix(iUv.x, iUv.z, u), mix(iUv.w, iUv.y, uv.y));
  vFlags = iFlags.xyz;
  vFlags.z = mod(iFlags.z, 2.0); vSmall = mod(floor(iFlags.z / 2.0), 2.0); vTree = step(3.5, iFlags.z);
  vGlow = iGlow;
  vJitter = iJitter.xy;
  vThermalHeat = iJitter.z;
  vLocal = uv;
  vSizeY = drawSize.y;
  vWorld = w;
  vGround = uLie > 0.0 ? w.xz : (iPos + uRight * (position.x * drawSize.x)).xz;
  gl_Position = clipOf(w);
  vNear = uNearCut > 0.0 ? smoothstep(uNearCut * 0.75, uNearCut, -(viewMatrix * vec4(base, 1.0)).z) : 1.0;
  // Snap the whole sprite by its base to the pixel grid, so it moves a whole pixel at a time and
  // its small bright details (flowers, eyes) don't shimmer in and out as the camera glides.
  gl_Position.xy += pixelSnap(clipOf(base)) * gl_Position.w;
  // The hole cut in the canopy round her (Ed, round 7: "the crown-hiding circle still has a very
  // sharp edge"): each tree's crown (and its cut trunk with it) has its own radius for it, a little
  // nearer or further than the next, so no line runs across the canopy, and fades over a wide band.
  vHole = 1.0; vOverHer = 0.0; vCrownD = 0.0;
  // Its rectangle on screen (pixels): its middle and half-widths, from its foot and its top.
  vec4 c0 = clipOf(base), c1 = clipOf(base + upv * drawSize.y);
  vec2 s0 = (c0.xy / c0.w * 0.5 + 0.5) * uRes, s1 = (c1.xy / c1.w * 0.5 + 0.5) * uRes;
  float hh = abs(s1.y - s0.y) * 0.5 + 1.0, hw = hh * drawSize.x / max(drawSize.y, 0.01);
  if (uLie > 0.0) { vec4 c2 = clipOf(base + uRight * (drawSize.x * 0.5)); hw = abs(c2.x / c2.w - c0.x / c0.w) * 0.5 * uRes.x + 1.0; } // (lying, not square to the camera)
  vec2 cc = (s0 + s1) * 0.5;
  float wob = 0.5 * uCutout.w * uCutShape.x; // (the hole's edge wobbles this far either way)
  // The place she stands in (uCircleFade.y, eased in and out: a legend's circle, a runestone, the find, a flask): anything standing
  // nearer the camera than its centre whose rectangle covers its box on screen (the grove's south trees, the rim's stones, crowns) fades out
  // whole, easing over a few pixels of the boxes' gap and a few metres of depth, so nothing snaps at the line.
  vCircle = 1.0;
  float keepD = length(iPos.xz - uCircleKeep.xy);
  if (uCircleFade.y > 0.0 && uHasFade > 0.5 && uFlat < 0.5 && keepD >= uCircleKeep.z) {
    vec2 bc = (uCircleBox.xy + uCircleBox.zw) * 0.5, bh = (uCircleBox.zw - uCircleBox.xy) * 0.5;
    float gap = length(max(abs(cc - bc) - bh - vec2(hw, hh), 0.0));
    float within = uCircleKeep.w > 0.0 ? 1.0 - smoothstep(uCircleKeep.w - uCircleFade.w, uCircleKeep.w, keepD) : 1.0; // (only so far from it)
    vCircle = 1.0 - uCircleFade.y * within * (1.0 - smoothstep(0.0, uCircleFade.z, gap)) * smoothstep(0.0, uCircleFade.w, uCircleFade.x + (viewMatrix * vec4(base, 1.0)).z);
    if (vCircle < 0.004) { gl_Position = vec4(2.0, 2.0, 2.0, 1.0); return; } // (wholly gone: in no pass)
  }
  if (abs(iFlags.y) > 0.001) {
    // Its own radius for the hole (vHole here: in pixels): each tree's own, spread round the hole's (uCutShape.w), and the
    // outline ragged round her, its bays and points drifting slowly round (uCutShape.z: Ed, 2026-10-06, "circle": no round line).
    vec2 off = cc - uCutout.xy;
    float j = fract(sin(dot(floor(iPos.xz * 2.0), vec2(12.9898, 78.233))) * 43758.5453), ang = atan(off.y, off.x), tw = uWind.w;
    float rag = 0.5 * sin(ang * 3.0 + tw * 0.07 + 1.3) + 0.3 * sin(ang * 5.0 - tw * 0.05 + 4.1) + 0.2 * sin(ang * 7.0 + tw * 0.11 + 2.2);
    vHole = uCutout.z * (1.0 + uCutShape.w * (j - 0.5) * 2.0) * (1.0 + uCutShape.z * rag);
    // How far it is: from its middle less half its half-size (its rectangle on screen shrunk by half), so a big crown over her
    // goes as a whole, not stood whole by its far middle, while the canopy's big crowns at the screen's edges stay its roof.
    vCrownD = length(max(abs(off) - vec2(hw, hh) * 0.5, 0.0));
    // Whether it could hide her: over her sprite on screen and nearer the camera than her.
    vOverHer = abs(cc.x - uWitch.x) < hw + uWitch.z && abs(cc.y - uWitch.y) < hh + uWitch.w && uWitchDepth + (viewMatrix * vec4(base, 1.0)).z > 0.0 ? 1.0 : 0.0;
  }
  // A quad faded whole (every pixel of it half see-through: a crown in the hole's band, faded by its middle as uCutWhole has it; a
  // place kept clear; a batch still appearing) has no pixel of the solid pass's or the front pass's (passOf: see, and not occlusion
  // alone), so it's left out of both (the quality-ladder study, 2026-10-26: the solid pass shaded every such crown whole and threw
  // it all away; 12 to 19% of the frame's GPU time on foot in a thick wood, the picture the same to the pixel). uWholeCull 0: as before.
  if (uWholeCull > 0.5 && uHasFade > 0.5 && uSilhouette.a <= 0.0 && (uFadePass < 0.5 || uFadePass > 2.5)) {
    bool whole = vCircle < 0.996 || (uIsScenery > 0.5 && uAppear < 0.996);
    if (!whole && iFlags.y > 0.5 && uCutWhole >= 0.999) whole = max(smoothstep(vHole - uCutout.w, vHole + uCutout.w * uCutShape.y, vCrownD), uTopFade) < (uHoleHard > 0.0 ? uHoleHard : 0.996); // (the hard cut-away: drawn whole from its threshold, so only those under it are gone)
    if (whole) { gl_Position = vec4(2.0, 2.0, 2.0, 1.0); return; }
  }
  // What the pixels could never show, left undrawn whole (the ground-mode GPU cost, the coordinator's ask from Ed's overlay,
  // 2026-10-13: the scenery's quads rasterised twice over, the see-through pass discarding nearly every pixel after its taps). Its
  // rectangle with a margin for the wind, the lean, the watch and the snap, in pixels. Conservative: a quad kept whenever any of
  // its pixels might be drawn, so the picture is the same to the pixel (tools/bench).
  float pxm = 2.0 * hh / max(drawSize.y, 0.01); // (screen pixels a metre, up the sprite)
  vec2 halfPx = vec2(hw, hh) + 4.0 + pxm * (abs(uWind.x) * abs(iFlags.w) * 1.3 * min(1.0, drawSize.y / 8.0) + abs(uLean.x) * drawSize.y + abs(uLean.y) * drawSize.x + abs(uWatch.w) * abs(iFlags.w));
  // Behind the treehouse's own solid pixels, every pixel of it (render/hiz.ts: the perf pass, 2026-10-23): its nearest point (its
  // foot or its top: across, it's square to the camera) farther than the farthest occluder pixel its rectangle could touch.
  if (uIsScenery > 0.5 && uHizOn > 0.5 && hizHidden(cc - halfPx, cc + halfPx, min(c0.z / c0.w, c1.z / c1.w) * 0.5 + 0.5)) { gl_Position = vec4(2.0, 2.0, 2.0, 1.0); return; }
  // A crown wholly inside the hole (every pixel of it cut away, in either pass): its farthest corner still within the hole's inner edge.
  if (iFlags.y > 0.5 && uTopFade < 0.004) {
    vec2 far = abs(uCutout.xy - cc) + halfPx;
    if (mix(length(far) + wob, vCrownD, uCutWhole) + 1.0 < vHole - uCutout.w) { gl_Position = vec4(2.0, 2.0, 2.0, 1.0); return; }
  }
  // The see-through pass: only what could have a see-through pixel (the fragment shader's \`see\`): a tall thing over her circle
  // and nearer than her; a crown or a cut trunk whose fade reaches into the hole's band; scenery at its budget's edge (or its
  // batch still appearing). Anything else is wholly the opaque pass's.
  if (uFadePass > 0.5 && uSilhouette.a <= 0.0 && uSeeDbg.z > 0.5) { // (uSeeDbg.z: the circle hunt's switch for this cull)
    // Two kinds of see-through pixel (the fragment shader's \`passOf\`): \`occl\`, over her circle in front of her, and \`seePart\`,
    // anything half faded (a crown in the hole's band, a cut trunk's top, scenery at its budget's edge or appearing).
    bool occ = false, part = (uIsScenery > 0.5 && uAppear < 0.996) || vCircle < 0.996;
    float dbg = uCullDbg;
    if (uFlat < 0.5 && uOcc.w > 0.0 && vFront > 0.0) {
      float R = (1.0 + uOcc.y) * max(max(uWitch.z, uWitch.w) * 1.2, 1.0);
      vec2 d = max(abs(uWitch.xy - cc) - halfPx, 0.0);
      if (dot(d, d) < R * R && mod(floor(dbg), 2.0) > 0.5) occ = true;
    }
    if (abs(iFlags.y) > 0.001 && uTopFade < 0.996 && (uHoleHard <= 0.0 || uTopFade > 0.004)) { // (hard: no crown half see-through in the band, but while the crowns fade in or out as she rises or comes down)
      vec2 d = max(abs(uCutout.xy - cc) - halfPx, 0.0);
      if (mix(length(d) - wob, vCrownD, uCutWhole) < vHole + uCutout.w * uCutShape.y + 1.0 && mod(floor(dbg / 2.0), 2.0) > 0.5) part = true;
    }
    if (uIsScenery > 0.5 && uEdgeDither < 0.5) { // (dithered in the solid pass instead: not kept for these passes)
      float r = max(uScenery.x, iFlags.y > 0.5 ? uCanopyReach : 0.0);
      if (length(iPos.xz - uHazeCentre) + drawSize.x * 0.5 + 2.0 > r - uScenery.y && mod(floor(dbg / 4.0), 2.0) > 0.5) part = true;
    }
    // Each pass by the kind it keeps (the perf pass's A2, 2026-10-24: in a dense wood most of these passes' cost was the big trees
    // over her circle, drawn again in the half-faded pass that never keeps their pixels): with her see-through in a pass of its
    // own (uSeeTwo, no dither), the front pass (3) keeps only \`occl\` pixels that aren't half faded and the half-faded pass (1) only
    // \`seePart\`; the depth pass (2) both. Otherwise every pass keeps either, as before. (uCullByPass 0: as before, for the checks.)
    bool byPass = uCullByPass > 0.5 && uSeeTwo > 0.5 && uSeeDither < 0.5;
    bool need = !byPass ? occ || part : uFadePass > 2.5 ? occ : uFadePass > 1.5 ? occ || part : part;
    if (!need) { gl_Position = vec4(2.0, 2.0, 2.0, 1.0); return; }
  }
}
`,fs=`
${pi()}
uniform vec3 uRight, uUp, uFacing;
uniform float uTopFade, uUnlit;
uniform vec4 uCutout;
uniform float uDebugCull, uIsScenery, uAppear, uArrivalFade;
uniform vec4 uLean;
uniform vec4 uWitch, uOcc, uSilhouette;
varying float vNear;
uniform float uFadePass, uHasFade;
varying float vCircle;
uniform float uLies; // lies flat on the ground (no cast shadow taken: it's drawn over it already)
uniform float uFlat; // lies flat on the ground (a court's decal), or gameplay that stays solid: never cut away round her
uniform vec4 uParty[16];
uniform vec3 uPartyCol[16];
uniform int uPartyCount;
uniform vec4 uUplight;
varying vec2 vUv;
varying vec3 vWorld;
varying vec3 vFlags;
varying float vSmall;
varying float vTree;
uniform float uTreeNormals; // 0: trees lit flat, as if every pixel faced the camera (the tuning's treeNormals)
uniform float uPotionSky;
${cs}
varying float vThermalHeat;
varying float vGlow;
varying float vSwayM; // metres its leafiest pixels move this frame (masked sprites)
varying vec4 vFrame;  // its frame in the atlas (u0, v0, u1, v1), to keep the sway inside it
varying float vFront;
varying vec2 vJitter;
uniform vec3 uLeafJitter; // per-tree leaf-colour jitter (Ed, 2026-10-16 and 2026-10-19; the tuning's leafJitter): the autumn share, the value share and the hue turn in turns
// A hue rotation about the grey axis (Rodrigues), a in radians: cheap, and the pixel's value and saturation kept.
vec3 hueRotate(vec3 c, float a) { const vec3 k = vec3(0.57735027); float ca = cos(a), sa = sin(a); return c * ca + cross(k, c) * sa + k * dot(k, c) * (1.0 - ca); }
varying float vHole, vOverHer, vCrownD;
uniform float uCutWhole;
uniform vec4 uCutShape;
varying vec2 vLocal;
varying float vSizeY;
varying vec2 vGround;
uniform float uFind; // this batch: 1 for wild creatures (eyeshine, light floor, rim)
uniform float uPoolReadability; // default OFF; ?poolreadability=1 for the assigned review
uniform float uRimOn; // this batch: 1 for characters (the witch, creatures): the mood's moonlight rim
uniform vec4 uMoodRim; // the rim's colour and strength (0: none; render/mood.ts)
uniform float uRimInset; // 1: stylised sprites, the rim one pixel in from the edge (inside the style's outline)
float rimAlpha(vec2 q) { return q.x < vFrame.x || q.x > vFrame.z || q.y < vFrame.y || q.y > vFrame.w ? 0.0 : albedoAt(q).a; }
uniform vec4 uTint; // this batch's tint: colour and how much (enraged creatures' red, Ed 2026-10-05)
uniform vec4 uShadow; // a shadow batch (x 1): a pack member hiding, its own colours darkened by y, opacity z, by each instance's glow (0 solid, 1 shadow)
uniform float uSteps; // a legend's batch: its light in this many steps of brightness (0: smooth; Ed's round 14 playtest: "same pixel density and palette discipline")
uniform vec4 uLegend; // a sleeping legend's batch: its sigil's neon and the rim's strength (0: none; Ed's round 14 playtest)
uniform float uLegendFloor; // and the share of its own (mossed) look it never drops below
uniform float uGlowGain; // its glowing pixels (alpha 254) brighter by this, keeping their hue (the rune stones' runes, rank sigils: render/view/home.ts; 1 the rest)
uniform float uLegendAwake; // a dark-coated legend awake: the share of its own colour it never drops below at night (0 none; render/legendLight.ts)
uniform vec4 uFindLook;
uniform float uAreaAvg, uSeeDepth, uSeeSolid, uSeeShowA, uSeeDither, uSeeTwo;
uniform float uEdgeDither, uHoleHard;
uniform vec4 uSeeDbg;
uniform float uSeeEarly;
uniform vec2 uTrunkLook;   // trunks: light floor, rim
uniform float uDebugTrunks; // smoke: trunks drawn flat magenta
uniform vec3 uEyeRgb;
uniform float uEyeRange;
uniform vec3 uTrunkFade; // metres of trunk the fade covers at most, metres per art pixel, its most share of the visible trunk
uniform vec4 uWind;      // the wind: its time (w) sets the regions' flutter
${Ye}
${la}
varying vec2 vFxBase;
varying vec4 vFxPaint;
varying vec2 vFxInfo;
${Si}
${bi}
// 4x4 ordered dither, for fading the canopy in pixel-art style.
float bayer(vec2 p) {
  int x = int(mod(p.x, 4.0)), y = int(mod(p.y, 4.0));
  int i = x + y * 4;
  int m[16] = int[16](0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5);
  return (float(m[i]) + 0.5) / 16.0;
}
// A slow value noise (0-1) for the hole's wobbly edge.
float cutHash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float cutNoise(vec2 p) { vec2 i = floor(p), f = fract(p); f = f * f * (3.0 - 2.0 * f); return mix(mix(cutHash(i), cutHash(i + vec2(1.0, 0.0)), f.x), mix(cutHash(i + vec2(0.0, 1.0)), cutHash(i + 1.0), f.x), f.y); }
// One screen pixel's step in the sprite's uv (main takes them, in uniform flow), and, where a sprite is drawn smaller than its
// art (far crowns, the bend squashing the far forest), the texels each pixel covers (Ed, 2026-10-06: "Trees with horizontal
// lines"): nearest sampling dropped whole rows of the leaf clusters' lit tops and shaded undersides, and what was left read as
// scanlines. There a pixel takes the average colour (and normal) of the opaque texels it covers; its alpha and its flags stay
// the texel's own, so outlines stay crisp. Scenery only.
vec2 uvDx, uvDy, areaH;
bool areaOn = false;
float leafAutumn = 0.0, leafTurn = 0.0; vec3 leafTone = vec3(0.0); // a tree's own drift toward its autumn colour (0 to 1) and that colour (the tuning's leafJitter.autumn)
// The autumn colours a tree drifts toward (Ed, 2026-10-19: "Why don't I see reds and oranges and purples from the jitter, only blue?"
// and, of the two ways offered, the second: each tree toward a warm palette rather than a plain hue turn): gold, orange, red,
// crimson, purple, by its seed.
vec3 autumnTone(float t) {
  t = clamp(t, 0.0, 1.0) * 4.0;
  vec3 g = vec3(0.95, 0.74, 0.18), o = vec3(0.96, 0.44, 0.1), r = vec3(0.86, 0.16, 0.1), c = vec3(0.7, 0.1, 0.32), p = vec3(0.52, 0.2, 0.68);
  return t < 1.0 ? mix(g, o, t) : t < 2.0 ? mix(o, r, t - 1.0) : t < 3.0 ? mix(r, c, t - 2.0) : mix(c, p, t - 3.0);
}
vec4 areaAvg(bool normal, vec2 uv, vec4 c) {
  vec3 sum = c.rgb; float w = 1.0;
  for (int i = 0; i < 4; i++) {
    vec2 o = vec2(i == 0 || i == 2 ? -areaH.x : areaH.x, i < 2 ? -areaH.y : areaH.y);
    vec2 q = clamp(uv + o, vFrame.xy, vFrame.zw);
    if (albedoAt(q).a > 0.5) { sum += (normal ? normalAt(q) : albedoAt(q)).rgb; w += 1.0; }
  }
  return vec4(sum / w, c.a);
}
// The distance in screen pixels between two points, safe at mediump: scaled down before it's squared (a 16-bit float tops out
// near 65504, so length() of a difference over about 256 pixels overflowed) and clamped, so nothing far off can overflow either.
float screenDist(vec2 a, vec2 b) { return length(clamp((a - b) / 256.0, -100.0, 100.0)) * 256.0; }
// Which pass draws this pixel, and how see-through (Ed, 2026-10-06 on: the cut-away, the see-through circle, the two see-through
// passes): false where it's another pass's or cut away. Nothing here reads the art, so the see-through passes ask it first, before
// the sway's and the art's taps (the perf pass, 2026-10-23: in a dense wood those passes kept most quads, and each pixel paid every
// tap before it was thrown away); the solid pass asks it where it always has.
float occl, shown, trunkA, hiddenCrown;
bool passOf() {
  float e = screenDist(gl_FragCoord.xy, uWitch.xy) / max(max(uWitch.z, uWitch.w) * 1.2, 1.0);
  occl = uFlat > 0.5 ? 0.0 : uOcc.w * uSeeDbg.x * vFront * (1.0 - smoothstep(0.3, 1.0 + uOcc.y, e));
  // Crowns: hidden in a hole round the witch, which closes as she rises; its edge a smooth fade
  // (Ed: no dithering). A crown partly shown in the hole
  // is drawn see-through in the second pass where it's over her, after her, like whatever stands
  // in front of her: in the opaque pass it hid her (Ed, v289: she showed only as her silhouette inside a crisp disc).
  // The hole: a wide soft band at this tree's own radius (vHole); the pass by the whole crown (vOverHer).
  // Ed, 2026-10-06: "I still see concentric circles while moving through dense forests in ground mode": a fade by
  // each pixel's distance drew the same circular gradient across every crown, lining up into rings; by each crown's
  // middle (uCutWhole of the way), a crown fades much as a whole.
  // Ed, round 14: "canopy cut-out circle is still very sharp": by the crown's middle, a big crown near the camera (its
  // middle far off) stood whole right up to her and its edge read as a hard ring. So mostly by each pixel again, the
  // line wobbled by a slow noise on the ground (world space: it doesn't crawl as she moves) so the fade's lines aren't
  // circles, and fading over a wide band past the radius too (uCutShape: the wobble, and how far out the fade reaches).
  float wob = (cutNoise(vWorld.xz * 0.11 + vWorld.y * 0.07) - 0.5) * uCutout.w * uCutShape.x;
  float cutD = uCutWhole >= 0.999 ? vCrownD : mix(screenDist(gl_FragCoord.xy, uCutout.xy) + wob, vCrownD, uCutWhole); // (by the crown whole: its middle alone, never 0 × an overflow)
  float hole = smoothstep(vHole - uCutout.w, vHole + uCutout.w * uCutShape.y, cutD);
  if (uHoleHard > 0.0) hole = step(uHoleHard, hole); // (the quality ladder's hard cut-away: cut or whole)
  shown = 1.0;
  hiddenCrown = 0.0;
  if (vFlags.y > 0.5) {
    shown = max(hole, uTopFade);
    hiddenCrown = 1.0 - shown;
    if (uLandscapeTrip.x == TRIP_SEEING_THROUGH_SEEING)
      shown += hiddenCrown * .3 * uLandscapeTrip.y * uLandscapeTrip.z;
    if (shown < 0.004) return false;
  }
  // A trunk cut from its crown (Ed, v149: "fade out instead of just stop"): where the crowns are
  // hidden, its top fades out over uTrunkFade.x metres in a clustered ordered dither on the art's own
  // pixel grid; where the crowns show, it stays whole under them. The fade covers at most
  // uTrunkFade.z of the trunk's visible height (Ed, v233: short tangly trees kept no trunk at
  // all), so every trunk keeps a solid base. Smooth (Ed: no dithering), its top fades out in alpha (trunkA).
  trunkA = 1.0;
  if (vFlags.y < -0.001 && uTrunkFade.x > 0.0) {
    float crown = max(hole, uTopFade);
    float topY = 1.0 + vFlags.y, band = min(uTrunkFade.x / max(vSizeY, 0.01), topY * uTrunkFade.z);
    float t = clamp((topY - vLocal.y) / band, 0.0, 1.0);
    float keep = max(t, crown);
    if (keep < 0.004) return false;
    trunkA = uHoleHard > 0.0 ? step(uHoleHard, keep) : keep * keep * (3.0 - 2.0 * keep); // (hard: the cut trunk's top there or not)
  }
  // Which pass draws it. Anything partly see-through (a crown fading in the hole, a trunk's top fading, scenery fading at the
  // budget's edge) goes in the see-through pass, after everything solid and writing no depth (Ed, 2026-10-06: "no tree
  // trunks", "trees cut off at the top"): drawn in the opaque pass, nearest first for the early depth test, a half-faded
  // crown near the camera wrote its depth and hid every trunk and crown behind it, a teal carpet where the forest should be.
  // A batch with no see-through pass (uHasFade 0) keeps them in its one pass, as before.
  float edgeK = (uIsScenery > 0.5 ? (uEdgeDither > 0.5 ? 1.0 : vFlags.y > 0.5 ? canopyFade(vWorld) : sceneryFade(vWorld)) * uAppear : 1.0) * vCircle; // (dithered at the edge: not half faded there) // (a crown: out to the canopy's reach; and the place she stands in kept clear)
  bool part = shown * trunkA * edgeK < 0.996;
  bool seePart = part && (uHasFade > 0.5 || vOverHer > 0.5), see = occl > 0.001 || seePart;
  if (uSeeDither > 0.5) { see = seePart; if (uFadePass < 0.5 && occl > 0.001 && bayer(gl_FragCoord.xy) < occl * (1.0 - uOcc.x)) return false; } // (the circle hunt)
  // Two see-through passes (Ed, 2026-10-14, the circle bug, measured by the pause page's Circle report): what's in front of her
  // alone (uFadePass 3) first, writing its depth, so where it overlaps itself or what's half faded behind it the nearer wins as in
  // the solid pass; then whatever is half faded anyway (crowns at the cut-away's edge, trunk tops: uFadePass 1), blended over it.
  // In one pass, unsorted, a half-faded crown drawn before the trunk behind it lost or covered that trunk, but only inside her
  // circle, where the trunks were in that pass too: a hard round edge with the drawing jumbled inside it. (uSeeTwo 0: one pass, as before.)
  bool occOnly = see && !seePart, two = uSeeTwo > 0.5;
  bool mine = uFadePass < 0.5 ? !(uSeeDbg.w > 0.5 ? seePart : see) : uFadePass > 2.5 ? two && occOnly : uFadePass > 1.5 ? see : (two ? seePart : see); // (uSeeDbg.w, the circle hunt: the solid pass keeps what's in front of her too)
  return mine;
}
void shade() {
  // (the see-through passes: whether this pixel is theirs at all, first: passOf)
  bool early = uFadePass > 0.5 && uSilhouette.a <= 0.0 && uSeeEarly > 0.5;
  if (early && !passOf()) discard;
  // Swaying by its mask (#34): each pixel samples from where the wind has pushed the leaves; a
  // second tap lets leaf edges move out over empty pixels. Trunks and rocks (mask 0) stay still.
  // The mask is the art's pixel-wind code (art/sway.js swayCode): 0 rigid, else a region's phase (top 3 bits) and how far it moves
  // (low 5 bits, of 31). Pixel wind: each region moves whole, a whole art pixel at a time, out of step with the others; a pixel
  // shows whichever region's shift lands on it (moving ones first), or nothing where its own region has moved away.
  vec2 uvS = vUv;
  // Her broom bowing under a load (render/load.ts): the band it rides in sags in the middle, in whole art pixels.
  if (uLean.z > 0.0) {
    float bx = 2.0 * vLocal.x - 1.0, band = smoothstep(0.06, 0.16, vLocal.y) * (1.0 - smoothstep(0.42, 0.52, vLocal.y));
    uvS.y = clamp(uvS.y + floor(uLean.z * (1.0 - bx * bx) * band + 0.5) / float(textureSize(uAlbedo, 0).y), vFrame.y, vFrame.w);
  }
  if (vSwayM != 0.0) {
    float tw = float(textureSize(uAlbedo, 0).x), dir = vFlags.x > 0.5 ? -1.0 : 1.0, px = vSwayM / uTrunkFade.y;
    bool hit = false;
    for (int i = 1; i <= 5; i++) {
      float d = i == 5 ? 0.0 : (i == 1 ? 1.0 : i == 2 ? -1.0 : i == 3 ? 2.0 : -2.0);
      vec2 q = vUv - vec2(d * dir / tw, 0.0);
      if (q.x < vFrame.x || q.x > vFrame.z) continue;
      float c = floor(normalAt(q).a * 255.0 + 0.5);
      float off = c < 0.5 ? 0.0 : clamp(floor((mod(c, 32.0) / 31.0) * px * (0.8 + 0.35 * sin(uWind.w * 2.3 + floor(c / 32.0) * 0.785)) + 0.5), -2.0, 2.0);
      if (off == d) { uvS = q; hit = true; break; }
    }
    if (!hit) discard;
  }
  vec4 a = albedoAt(uvS);
  if (a.a < 0.5) discard;
  if (vNear < 1.0 && bayer(gl_FragCoord.xy) >= vNear) discard; // (near the low stargazing camera: dithered away)
  if (uIsScenery > 0.5) {
    vec2 ts = vec2(textureSize(uAlbedo, 0)), fp = vec2(length(vec2(uvDx.x, uvDy.x)), length(vec2(uvDx.y, uvDy.y))) * ts;
    if (uAreaAvg > 0.5 && max(fp.x, fp.y) > 1.25) { areaOn = true; areaH = min(fp, vec2(3.0)) * 0.25 / ts; a = areaAvg(false, uvS, a); }
    // Each tree's own leaf colour (Ed, 2026-10-16: "a small amount of per-tree colour jitter", docs/ART-GUIDE.md section 3): its
    // leaves' value scaled by its seed times the tuning's leafJitter here, and once lit (below) drifted toward its own autumn colour; its
    // wood (sway code 0) untouched.
    if ((vJitter.x != 0.0 || vJitter.y != 0.0) && (uLeafJitter.x != 0.0 || uLeafJitter.y != 0.0 || uLeafJitter.z != 0.0) && normalAt(uvS).a * 255.0 >= 0.5) {
      a.rgb = clamp(a.rgb * (1.0 + vJitter.y * uLeafJitter.y), 0.0, 1.0);
      // (its colour by its hue seed; how far it goes, its own share of the knob, a second number from the same seeds: some trees barely turn)
      leafTone = autumnTone(0.5 + 0.5 * vJitter.x);
      leafAutumn = uLeafJitter.x * fract(abs(vJitter.x) * 7.31 + abs(vJitter.y) * 3.17);
      leafTurn = vJitter.x * uLeafJitter.z * 6.2831853; // (and its hue turned either way by up to leafJitter.hue: Ed, 2026-10-19, "stretch the slider")
    }
  }
  // The witch's see-through silhouette: where she is hidden, a flat tint in her glow colour.
  vec4 frostField = uFxVertex > 0.5 ? vFxPaint : fxField(vFxBase);
  if (uIndexed.x > 0.5 && frostField.r > 0.0) {
    int frostIndex = int(texture2D(uAlbedo, uvS).r * 255.0 + 0.5);
    a.rgb = mix(a.rgb, texelFetch(uAlbedoPal, ivec2(frostIndex, 1), 0).rgb, frostField.r);
    frostField.r = 0.0;
  }
  a.rgb = fxTint(a.rgb, frostField);
  if (uSilhouette.a > 0.0) { gl_FragColor = vec4(uSilhouette.rgb, uSilhouette.a); return; }
  // Things standing in front of the witch fade (smoothly) where they cover her: left out of the
  // opaque pass there and drawn in a second, see-through pass after her.
  // A soft circle round her body, a little bigger than her sprite: fully see-through at the
  // centre, easing smoothly to opaque at the edge (uOcc.y: how far the edge reaches, a share of it).
  // (screenDist, not length(a - b): at mediump, the 16-bit floats some GPUs run this shader at, the square of a distance over about 256
  // screen pixels overflows, and everything further from her than that came out wrong: the circle bug, Ed, 2026-10-14, isolated to this fade)
  if (!early && !passOf()) discard;
  if (uFadePass > 1.5 && uSeeDepth < 0.5) discard; // (the depth pass, switched off: tuning suspects.seeDepth)
  float alpha = (uFadePass > 0.5 ? mix(1.0, uOcc.x, occl) : 1.0) * shown * trunkA;
  if (uFadePass > 0.5 && (uSeeSolid > 2.5 ? occl <= 0.001 : uSeeSolid > 1.5 ? occl > 0.001 : uSeeSolid > 0.5)) alpha = 1.0; // (the circle hunt: 1 all, 2 only her circle's, 3 only the rest)
  // Eye glints, flowers and magic glow: the generator marks them with alpha 254.
  if (uSeeDbg.y > 0.5 && uFadePass > 0.5 && (uFadePass < 1.5 || uFadePass > 2.5)) { gl_FragColor = vec4(mix(a.rgb, vec3(1.0, 0.0, 1.0), 0.6), alpha); return; } // (the circle hunt: what the see-through pass draws)
  if (uDebugCull > 0.5 && vFlags.z > 0.5) { gl_FragColor = vec4(1.0, 0.0, 0.0, alpha); return; }
  if (uUnlit > 0.5) { gl_FragColor = vec4(a.rgb, alpha); return; }
  // A wild creature's eye pixels are marked with alpha 253 (artBuild.ts markEyes); glowing ones 254.
  bool eyePx = a.a < 0.994;
  if (eyePx && uFind > 0.5 && uFindLook.z > 0.0 && vGlow > -0.5) {
    // Eyeshine (Ed, v244): a wild creature's eyes catch the light, pale gold, well beyond her
    // glow, blinking now and then (the view sets each one's blinks; a woken creature's red eyes
    // are glowing pixels, and stay red).
    float far = 1.0 - smoothstep(uEyeRange * 0.75, uEyeRange, length(vWorld.xz - uHazeCentre));
    float luma = dot(a.rgb, vec3(0.3, 0.55, 0.15));
    vec3 eye = uEyeRgb * (0.7 + 0.3 * luma) * (1.0 + uFindLook.z * 0.4);
    eye /= max(1.0, max(eye.r, max(eye.g, eye.b))); // brighter, but keeping its gold (not clipping to white)
    gl_FragColor = vec4(mix(haze(a.rgb * 0.3, vWorld), eye, far), alpha); return;
  }
  // (glow -0.5: switched off, a soundsystem standing when the party's over (render/party.ts): its glowing pixels lit as paint)
  if (a.a < 0.999 && !eyePx && abs(vGlow + 0.5) > 0.25) { vec3 g = a.rgb * uGlowGain; g /= max(1.0, max(g.r, max(g.g, g.b))); gl_FragColor = vec4(haze(g, vWorld), alpha); return; }
  // The tree-normals switch off (Ed, 2026-11-07: "Make the normal maps switch."): a tree's pixels lit as if each faced the camera,
  // the normal (128, 128, 255), never read; its alpha (the wind's sway code) is read above, as ever.
  bool flatN = vTree > 0.5 && uTreeNormals < 0.5;
  vec4 n = flatN ? vec4(128.0 / 255.0, 128.0 / 255.0, 1.0, 1.0) : normalAt(uvS);
  if (areaOn && !flatN) n = areaAvg(true, uvS, n);
  float nx = (n.r * 255.0 - 128.0) / 127.0, ny = (n.g * 255.0 - 128.0) / 127.0, nz = n.b;
  if (vFlags.x > 0.5) nx = -nx;
  if (uLandscapeTrip.x == TRIP_INSIDE_OUT_RELIEF) {
    float signK = mix(1., -uLandscapeTrip.z, uLandscapeTrip.y);
    nx *= signK; ny *= signK; nz = max(nz, .0001);
  }
  vec3 N = normalize(uRight * nx - uUp * ny + uFacing * nz);
  // Standing in a cast shadow (a trunk's, a palm's, scenery's: render/castShadows.ts), darkened and tinted by it where it falls on
  // this pixel's ground spot; not a crown up in the canopy, nor what lies flat on the ground (the shadow's drawn over that already).
  vec3 castK = uLies > 0.5 || vFlags.y > 0.5 ? vec3(1.0) : castShadow(vGround);
  if (uWitchLight.x > 0.5) { gl_FragColor = vec4(witchShade(a.rgb, N, uFacing, vWorld) * castK, alpha); return; }
  vec3 col = min(vec3(1.0), a.rgb * nightLight(N, vWorld) * 1.25);
  // The leaf jitter's colour, on the lit colour, not the albedo (Ed's v3893 playtest: "leafJitter.hue has no visible effect": the night's
  // coloured moonlight had squeezed a hue turn on the albedo to about a third on screen, 20 degrees moving the crowns 4.9 on average):
  // toward its autumn colour at the brightness the moonlight gave it, so a gold or red tree stays as dark as the night makes it.
  // Its hue turned too (up to 180 degrees either way, so any hue: Ed, "stretch the slider"), here on the lit colour so the degrees are the screen's.
  if (leafTurn != 0.0) col = clamp(hueRotate(col, leafTurn), 0.0, 1.0);
  if (leafAutumn > 0.0) { float l = dot(col, vec3(0.3, 0.55, 0.15)), lt = dot(leafTone, vec3(0.3, 0.55, 0.15)); col = clamp(mix(col, leafTone * (l / lt), leafAutumn), 0.0, 1.0); }
  // Scenery in her pool takes her light's own colour as the ground does (lighting.ts glowPool), so her light on green
  // crowns from the treetops reads amber, not lime (the art director via golf, #237). Characters keep their colours.
  if (uIsScenery > 0.5) col = glowPool(col, vWorld);
  // Trees' trunks (bottom halves cut from their crowns) stand in the canopy's shadow, where the
  // ambient and the moon barely reach: lit only by that they went black on black (Ed, v271: "We
  // have really lost our treetrunks"). Like wild creatures, they never drop below a share of
  // their unlit look and catch a rim from her glow.
  bool trunk = vFlags.y < -0.001;
  if (uDebugTrunks > 0.5 && trunk) { gl_FragColor = vec4(1.0, 0.0, 1.0, 1.0); return; } // smoke: where trunks are drawn
  if (uFind > 0.5 || trunk) {
    // Wild creatures never drop below a share of their unlit look, and catch a faint rim from her
    // glow on the edge facing her, so they read against the dark ground (Ed, v244).
    vec2 look = uFind > 0.5 ? uFindLook.xy : uTrunkLook;
    // A trunk's floor keeps its roundness: lit from the moon's side (the upper left), shaded on
    // the other, so a smooth pale beech doesn't flatten into a featureless slab (Ed, 2026-10-04).
    float side = trunk && uFind < 0.5 ? 0.5 + 0.5 * clamp(dot(N, normalize(-uRight * 0.75 + uFacing * 0.65)), 0.0, 1.0) : 1.0;
    col = max(col, a.rgb * look.x * side);
    vec3 lv = uGlowPos - vWorld;
    float d = length(lv), k = 1.0 - smoothstep(uGlowR * 0.5, uGlowR * 1.8, d);
    float edge = 1.0 - clamp(dot(N, uFacing), 0.0, 1.0);
    col = min(vec3(1.0), col + mix(a.rgb, vec3(1.0), 0.5) * uGlowRgb * edge * max(0.0, dot(N, lv / max(d, 1e-3))) * k * look.y);
  }
  // Separate from the established find rim: use her actual horizontal pool and its light factors.
  // Do not recolour the paint. A minimum floor could be cancelled by the existing find rim,
  // including on dark creatures, so add a small lift selected by the painted pixel instead.
  if (uPoolReadability > 0.5 && uFind > 0.5 && uIsScenery < 0.5 && uGlowPower > 0.0) {
    float radius = uGlowR * uGlowNear, distance = length((uGlowPos - vWorld).xz);
    if (radius > 0.0 && distance < radius) {
      float pool = pow(1.0 - distance / radius, uGlowFalloff) * min(1.0, uGlowPower) * max(0.0, uGlowDim);
      float paint = dot(a.rgb, vec3(0.3, 0.55, 0.15));
      // Keep the paint's relative values: normalising by luminance made the darkest shades
      // approach one flat value. This proportional addition retains their internal shading.
      float dark = 1.0 - smoothstep(0.35, 0.75, paint);
      col += a.rgb * (0.6 * pool * dark);
    }
  }
  if (vFlags.y > 0.5 && uPartyCount > 0) {
    // Crowns over a party catch a faint glow from below, on their undersides and lower edges.
    vec3 up = vec3(0.0);
    for (int i = 0; i < 16; i++) {
      if (i >= uPartyCount) break;
      float d = length(vWorld.xz - uParty[i].xy), r = uParty[i].z;
      if (d > r) continue;
      float k = (0.35 + 0.65 * (1.0 - smoothstep(0.0, r * 0.5, d))) * (1.0 - smoothstep(r - uUplight.z, r, d)) * uParty[i].w;
      up = max(up, uPartyCol[i] * k);
    }
    float under = clamp(0.45 - N.y * 0.75, 0.0, 1.0);
    col += up * uUplight.x * (1.0 + uUplight.y * sin(uUplight.w)) * under;
  }
  // A legend's light in a few steps (Ed's round 14 playtest: a legend at its size read airbrushed, "smooth gradients, glossy
  // highlights", beside the pixel art round it): banded by brightness, its hue kept, so its shading is a short ramp of tones.
  if (uSteps > 0.5) { float l = max(1e-3, dot(col, vec3(0.3, 0.55, 0.15))), q = (floor(l * uSteps) + 0.6) / uSteps; col *= min(q / l, 3.0); }
  if (uLandscapeTrip.x == TRIP_LIVING_BARK && trunk) {
    float band = vWorld.y - uLandscapeTrip.w * uLandscapeTrip.z + dot(vGround, vec2(.19, .27));
    vec3 stripe = .55 + .45 * cos(band * 1.7 + vec3(0., 2.1, 4.2));
    col = mix(col, stripe * (.2 + dot(col, vec3(.3,.55,.15))) * (1. + .45 * sin(band * 3.)), uLandscapeTrip.y);
  }
  if (uLandscapeTrip.x == TRIP_SEEING_THROUGH_SEEING && uIsScenery > .5) {
    float masked = max(occl, hiddenCrown);
    vec3 ink = mix(vec3(.12,.85,.75), vec3(1.,.18,.72), clamp(masked,0.,1.));
    col = mix(col, ink, uLandscapeTrip.y * uLandscapeTrip.z * (.13 + .87 * clamp(masked,0.,1.)));
  }
  gl_FragColor = vec4(haze(min(vec3(1.0), col) * castK, vWorld), alpha);
}
void main() {
  vec2 rdx = dFdx(vUv), rdy = dFdy(vUv); // (taken here, in uniform flow: one screen pixel, one art pixel, along the sprite)
  if (vSmall > 0.5 && uPotionSky > 0.0 && (uPotionSky >= 1.0 || bayer(gl_FragCoord.xy) < uPotionSky)) discard;
  uvDx = rdx; uvDy = rdy;
  if (uArrivalFade < 0.999 && bayer(gl_FragCoord.xy) >= uArrivalFade) discard;
  shade();
  // A pack member hiding in its lull (render/view/creatures.ts; Ed, 2026-10-29: "like the animal becoming a shadow (dark and
  // transparent), rather than teleporting"): its own lit sprite going over to a dark, see-through shadow of itself, by its glow.
  if (uShadow.x > 0.5) { float k = clamp(vGlow, 0.0, 1.0); gl_FragColor = vec4(mix(gl_FragColor.rgb, gl_FragColor.rgb * (1.0 - uShadow.y), k), gl_FragColor.a * mix(1.0, uShadow.z, k)); return; }
  #ifdef MUSHROOM_SPOT_SPILL
  vec2 texel = 1.0 / vec2(textureSize(uAlbedo, 0));
  vec3 spill = vec3(0.0);
  for (int axis = 0; axis < 4; axis++) {
    vec2 offset = axis == 0 ? vec2(texel.x,0.) : axis == 1 ? vec2(-texel.x,0.) : axis == 2 ? vec2(0.,texel.y) : vec2(0.,-texel.y);
    vec2 uv = clamp(vUv + offset, vFrame.xy, vFrame.zw);
    vec4 neighbour = albedoAt(uv);
    if (neighbour.a > 0.994 && neighbour.a < 0.999) spill += neighbour.rgb;
  }
  spill *= uGlowGain * 0.25;
  spill /= max(1.0, max(spill.r, max(spill.g, spill.b)));
  gl_FragColor.rgb = max(gl_FragColor.rgb, spill);
  #endif
  // Glowing white (a party animal evolving).
  if (vGlow > 0.0 && uSilhouette.a <= 0.0) gl_FragColor.rgb = mix(gl_FragColor.rgb, vec3(1.0), vGlow);
  // Tinted (enraged creatures, red): toward the tint by the pixel's own lightness, so its shading and shape still read.
  if (uTint.a > 0.0 && uSilhouette.a <= 0.0) { float l = dot(gl_FragColor.rgb, vec3(0.3, 0.55, 0.15)); gl_FragColor.rgb = mix(gl_FragColor.rgb, uTint.rgb * (0.55 + 1.1 * l), uTint.a); } // (a floor: red even in the dark, from the treetops)
  // A wild area's rising aggro (glow -1.05 to -1.45, render/aggro.ts; Ed, 2026-10-07): reddening by its own lightness, so its
  // shape still reads, and (on its body, not its legs' discs) a red outline pulsing faster as it nears the attack.
  if (vGlow < -1.02 && vGlow > -1.5 && gl_FragColor.a > 0.5) {
    float ag = clamp((-1.05 - vGlow) / 0.4, 0.0, 1.0), l = dot(gl_FragColor.rgb, vec3(0.3, 0.55, 0.15)), pulse = 0.85 + 0.15 * sin(uTime * (3.0 + 12.0 * ag));
    gl_FragColor.rgb = mix(gl_FragColor.rgb, vec3(1.0, 0.16, 0.12) * (0.45 + 1.2 * l), ag * 0.7);
    if (uRimOn > 0.5) { float e = min(min(rimAlpha(vUv + rdx), rimAlpha(vUv - rdx)), min(rimAlpha(vUv + rdy), rimAlpha(vUv - rdy))); if (e < 0.5) gl_FragColor.rgb = mix(gl_FragColor.rgb, vec3(1.0, 0.22, 0.15), min(1.0, ag * 1.5) * pulse); }
  }
  // A sleeping legend (glow -2 - moss): grown over, its colours gone toward moss and earth, so it
  // reads as a mound of the ground (no eyeshine: below -0.5).
  if (vGlow < -1.5) {
    // (its glow: -2 - (moss + 2 k), k its outline's steps off, render/legendOutline.ts: shown only while she's in its circle)
    float gv = -(vGlow + 2.0), gk = floor(gv * 0.5 + 0.0001), m = clamp(gv - 2.0 * gk, 0.0, 1.0), ring = 1.0 - gk / 16.0, l = dot(gl_FragColor.rgb, vec3(0.3, 0.55, 0.15));
    gl_FragColor.rgb = mix(gl_FragColor.rgb, vec3(0.2, 0.26, 0.14) * (0.45 + 1.1 * l), m);
    // In its circle it must read (Ed's round 14 playtest: "Legends in the circle are not very distinct"): it never sinks into
    // the dark below a share of its own mossed look, and its outline glows in its sigil's neon, breathing slowly (only while she's
    // in its circle: ring, Ed 2026-10-07; outside it, a mossy boulder).
    if (uLegend.w > 0.0 && gl_FragColor.a > 0.5) {
      vec3 own = albedoAt(vUv).rgb, mossed = mix(own, vec3(0.2, 0.26, 0.14) * (0.45 + 1.1 * dot(own, vec3(0.3, 0.55, 0.15))), m);
      gl_FragColor.rgb = max(gl_FragColor.rgb, mossed * uLegendFloor);
      float e = min(min(rimAlpha(vUv + rdx), rimAlpha(vUv - rdx)), min(rimAlpha(vUv + rdy), rimAlpha(vUv - rdy)));
      float e2 = min(min(rimAlpha(vUv + rdx * 2.0), rimAlpha(vUv - rdx * 2.0)), min(rimAlpha(vUv + rdy * 2.0), rimAlpha(vUv - rdy * 2.0)));
      float top = min(rimAlpha(vUv + rdy * 3.0), rimAlpha(vUv - rdy * 3.0)) < 0.5 ? 1.0 : 0.0; // (near its edge, up or down: its foot is in the ground, so this is its back)
      float breath = 0.75 + 0.25 * sin(uTime * 1.4 + vWorld.x * 0.3);
      vec3 neon = min(vec3(1.0), uLegend.rgb * 1.3); // (bright enough for the bloom to take it: it glows)
      if (e < 0.5) gl_FragColor.rgb = mix(gl_FragColor.rgb, neon, uLegend.w * ring * breath); // its outline, a pixel
      else if (e2 < 0.5) gl_FragColor.rgb = mix(gl_FragColor.rgb, neon, uLegend.w * ring * 0.55 * breath); // and a softer one inside it
      else if (top > 0.5) gl_FragColor.rgb = mix(gl_FragColor.rgb, uLegend.rgb, uLegend.w * ring * 0.25 * breath); // its back catching the glow
    }
  }
  // A dark-coated legend awake (Ed, 2026-10-07: lifted only for those dark enough to vanish at night): never below a share of its own colour.
  if (uLegendAwake > 0.0 && vGlow > -1.5 && gl_FragColor.a > 0.5) gl_FragColor.rgb = max(gl_FragColor.rgb, albedoAt(vUv).rgb * uLegendAwake);
  // The moonlight rim (render/mood.ts; the art director's round 1: "characters must read against the
  // night"): a character's pixels whose neighbour on the side away from the moon is empty catch a light
  // edge in the night sky's colour, one art pixel wide, so the witch and the creatures stand out of the dark.
  if (uRimOn > 0.5 && uMoodRim.w > 0.0 && gl_FragColor.a > 0.5 && uSilhouette.a <= 0.0 && vGlow > -1.5) {
    vec2 s = -vec2(dot(uMoonDir, uRight), dot(uMoonDir, uUp));
    // Taken from the silhouette (its alpha), never the normals, so it shows in every style; on a
    // stylised sprite (art/stylise.js) the edge pixel is the style's own dark outline, so the rim
    // lights the pixel just inside it instead (the art director's round 2).
    vec2 dx = rdx * sign(s.x), dy = rdy * sign(s.y);
    float ox = rimAlpha(vUv + dx * (1.0 + uRimInset)), oy = rimAlpha(vUv + dy * (1.0 + uRimInset));
    float ix = uRimInset > 0.5 ? rimAlpha(vUv + dx) : 1.0, iy = uRimInset > 0.5 ? rimAlpha(vUv + dy) : 1.0;
    // Only where the sprite is thick (Ed's playtest, 2026-10-06: "Animal legs have outlines on them; they'd look better without"): a leg,
    // a foot, a tail tip, two pixels wide or less, is all edge, so lit it read as a glowing wireframe. The side rim needs the sprite
    // three pixels deep behind the edge; the lower rim needs that and a pixel solid either side (so a leg's foot stays dark too).
    bool thickX = rimAlpha(vUv - dx) > 0.5 && rimAlpha(vUv - dx * 2.0) > 0.5;
    bool thickY = rimAlpha(vUv - dy) > 0.5 && rimAlpha(vUv - dy * 2.0) > 0.5 && rimAlpha(vUv + rdx) > 0.5 && rimAlpha(vUv - rdx) > 0.5;
    if ((ox < 0.5 && ix > 0.5 && thickX) || (oy < 0.5 && iy > 0.5 && thickY)) gl_FragColor.rgb = min(vec3(1.0), gl_FragColor.rgb + uMoodRim.rgb * uMoodRim.w);
  }
  // Scenery past the budget's radius fades out smoothly (alpha), from the far edge inward.
  float fxCharge = uFxVertex > 0.5 ? vFxInfo.r : fxExtra(vFxBase).r;
  gl_FragColor.rgb += vec3(0.08,0.12,0.18) * fxCharge * (uFxCalm>0.5?0.5:0.65+0.15*sin(uFxTime*3.0));
  // Sparse, stationary rime glints: no flashing and no silhouette expansion.
  float fxFrost = uFxVertex > 0.5 ? vFxPaint.r : fxField(vFxBase).r;
  if (fxFrost>0.25 && fract(sin(dot(floor(vUv*vec2(textureSize(uAlbedo,0))),vec2(31.7,79.3)))*43758.5)>0.985)
    gl_FragColor.rgb = mix(gl_FragColor.rgb,vec3(0.65,0.82,0.9),fxFrost*0.5);
  if (uIsScenery > 0.5) {
    float edge = vFlags.y > 0.5 ? canopyFade(vWorld) : sceneryFade(vWorld), k = edge * uAppear; // and a set just drawn fades in (a crown: out to the canopy's reach)
    if (uEdgeDither > 0.5) { if (bayer(gl_FragCoord.xy) >= edge) discard; k = uAppear; } // (the quality ladder's dithered edge: each art pixel there or not)
    if (k < 0.004) discard;
    gl_FragColor.a *= k;
  }
  gl_FragColor.a *= vCircle; // (the place she stands in kept clear)
  if (uSeeShowA > 0.5 && uFadePass > 0.5 && (uFadePass < 1.5 || uFadePass > 2.5)) gl_FragColor = vec4(vec3(gl_FragColor.a), 1.0); // (the circle hunt: its opacity, white solid)
}
`,oe=fs.replace("void main() {","void spriteMain() {")+`
void main() {
  spriteMain();
  if (uThermalStrength > 0.0) {
    vec3 thermal = thermalCold(gl_FragColor.rgb);
    if (vThermalHeat > 0.0) {
      vec3 normal = normalAt(vUv).rgb;
      thermal = thermalCreature(albedoAt(vUv).rgb, vec3((normal.rg * 255.0 - 128.0) / 127.0, normal.b), vThermalHeat);
    }
    gl_FragColor.rgb = mix(gl_FragColor.rgb, thermal, uThermalStrength);
  }
}
`,gs=-.5;function Br(a){for(const e of a.meshes)e.renderOrder=gs,e.material.depthWrite=!1;return a}const ze=[],Le=[],ms={value:new b(1,.85,.35,0)};class jr{constructor(e,t,i={}){this.atlas=e,this.metresPerPixel=t;const s=new $e(1,1);s.translate(0,.5,0),this.geo=new _t,this.geo.index=s.index,this.geo.setAttribute("position",s.getAttribute("position")),this.geo.setAttribute("uv",s.getAttribute("uv")),this.pos=this.size=this.uvs=this.flags=this.glow=void 0,this.grow(64);const r=h=>({...E,...Y,...te,...$,...vi(e),uUnlit:{value:i.unlit?1:0},uIsScenery:{value:i.scenery?1:0},uAppear:this.appearU,uArrivalFade:this.arrivalFade,uFadePass:{value:0},uHasFade:{value:i.fade?1:0},uFlat:{value:i.flat||i.solid?1:0},uLies:{value:i.flat?1:0},...He,uSilhouette:{value:new b(0,0,0,0)},uWitchLight:yi(i.witchLight),uWitchHush:{value:0},uFind:{value:i.find?1:0},uRimOn:{value:i.rim?1:0},uTint:i.tint??{value:new b(0,0,0,0)},uShadow:i.shadow?ms:{value:new b(0,0,0,0)},uLegend:{value:i.legend??new b(0,0,0,0)},uSteps:{value:i.steps??0},uLegendFloor:{value:i.legendFloor??0},uLegendAwake:{value:i.legendAwake??0},uGlowGain:i.glowGain??{value:1},uAbsolute:{value:i.absolute?1:0},uLie:{value:i.lie??0},uLean:this.leanU,...h}),n=i.scenery?{blending:Be,blendSrc:Ea,blendDst:Ta}:{},o=i.scenery?{stencilWrite:!0,stencilRef:1,stencilFunc:lt,stencilZPass:nt}:i.unmark?{stencilWrite:!0,stencilRef:0,stencilFunc:lt,stencilZPass:nt}:{},l=new W({vertexShader:re,fragmentShader:oe,defines:i.spotSpill?{MUSHROOM_SPOT_SPILL:1}:{},uniforms:r({}),depthTest:!i.onTop,depthWrite:!i.onTop&&!i.shadow,...n,...o,...i.shadow?{transparent:!0}:{}});if(this.mesh=new q(this.geo,l),this.mesh.frustumCulled=!1,i.onTop&&(this.mesh.renderOrder=10),i.scenery&&(this.mesh.renderOrder=.5),this.meshes=[this.mesh],i.fade){const h=new q(this.geo,new W({vertexShader:re,fragmentShader:oe,uniforms:r({uFadePass:{value:1}}),transparent:!0,depthWrite:!1})),u=new q(this.geo,new W({vertexShader:re,fragmentShader:oe,uniforms:r({uFadePass:{value:3}}),transparent:!0,depthWrite:!0}));u.frustumCulled=!1,u.renderOrder=10.9,h.frustumCulled=!1,h.renderOrder=11,i.scenery&&Object.assign(h.material,o,{stencilWrite:!1}),ze.push(h.material),Le.push(h);const c=new q(this.geo,new W({vertexShader:re,fragmentShader:oe,uniforms:r({uFadePass:{value:2}}),transparent:!0,colorWrite:!1,depthWrite:!0}));c.frustumCulled=!1,c.renderOrder=19.9,typeof location<"u"&&new URLSearchParams(location.search).get("seedepth")==="off"&&(c.material.depthWrite=!1),this.meshes.push(h,c,u)}if(i.silhouette){const h=i.silhouette.colour,u=new q(this.geo,new W({vertexShader:re,fragmentShader:oe,uniforms:r({uSilhouette:{value:new b(h.x,h.y,h.z,i.silhouette.opacity)}}),transparent:!0,depthWrite:!1,depthFunc:Ga}));u.frustumCulled=!1,u.renderOrder=12,this.meshes.push(u),this.sil=u}for(const h of this.meshes)Object.assign(h.material.uniforms,O)}atlas;metresPerPixel;mesh;meshes;geo;pos;size;uvs;flags;glow;jitter;capacity=0;dirty=[new D,new D,new D,new D,new D,new D];count=0;name(e){return this.meshes.forEach((t,i)=>{t.name=i===0?e:`${e} (${i===1&&this.meshes.length>1&&t!==this.sil?"see-through":"silhouette"})`}),this}setAtlas(e){this.atlas=e;for(const t of this.meshes)wi(t.material.uniforms,e)}sil=null;set silhouette(e){this.sil&&(this.sil.visible=e)}set silhouetteColour(e){const t=this.sil&&this.sil.material.uniforms.uSilhouette.value;t&&t.set(e.x,e.y,e.z,t.w)}set silhouetteOpacity(e){const t=this.sil&&this.sil.material.uniforms.uSilhouette.value;t&&(t.w=e)}grow(e){const t=Math.max(e,this.capacity*2);this.geo.dispose();const i=(s,r)=>{const n=new Ot(new Float32Array(t*s),s);return n.setUsage(Ut),r&&n.array.set(r.array),n};this.pos=i(3,this.pos),this.size=i(3,this.size),this.uvs=i(4,this.uvs),this.flags=i(4,this.flags),this.glow=i(1,this.glow),this.jitter=i(3,this.jitter),this.geo.setAttribute("iPos",this.pos),this.geo.setAttribute("iSize",this.size),this.geo.setAttribute("iUv",this.uvs),this.geo.setAttribute("iFlags",this.flags),this.geo.setAttribute("iGlow",this.glow),this.geo.setAttribute("iJitter",this.jitter),this.capacity=t}leanU={value:new b};appearU={value:1};arrivalFade={value:1};items=[];set(e){this.items=e,e.length>this.capacity&&this.grow(e.length);const t=this.pos.array,i=this.size.array,s=this.uvs.array,r=this.flags.array,n=this.glow.array,o=this.jitter.array,l=this.dirty[0],h=this.dirty[1],u=this.dirty[2],c=this.dirty[3],g=this.dirty[4],p=this.dirty[5],m=this.metresPerPixel;for(let v=0,S=e.length;v<S;v++){const w=e[v],P=w.frame,L=P.uv,_=w.scale??1;let y=v*3;(t[y]!==w.x||t[y+1]!==w.y||t[y+2]!==w.z)&&(t[y]=w.x,t[y+1]=w.y,t[y+2]=w.z,l.touch(v));const A=(w.sx===void 0?P.w:Math.max(1,Math.round(P.w*w.sx)))*m*_,z=(w.sy===void 0?P.h:Math.max(1,Math.round(P.h*w.sy)))*m*_,k=(w.foot??(w.top?0:P.foot??0))*m*_*(w.sx??1);y=v*3,(i[y]!==A||i[y+1]!==z||i[y+2]!==k)&&(i[y]=A,i[y+1]=z,i[y+2]=k,h.touch(v)),y=v*4,(s[y]!==L[0]||s[y+1]!==L[1]||s[y+2]!==L[2]||s[y+3]!==L[3])&&(s[y]=L[0],s[y+1]=L[1],s[y+2]=L[2],s[y+3]=L[3],u.touch(v));const U=w.flip?1:0,G=w.top?1:w.cut?-w.cut:0,I=(w.fresh?1:0)+(w.small?2:0)+(w.tree?4:0),et=(P.masked?-1:1)*(w.sway??0);(r[y]!==U||r[y+1]!==G||r[y+2]!==I||r[y+3]!==et)&&(r[y]=U,r[y+1]=G,r[y+2]=I,r[y+3]=et,c.touch(v));const tt=w.glow??0;n[v]!==tt&&(n[v]=tt,g.touch(v));const ge=w.jitter,at=ge?ge[0]:0,it=ge?ge[1]:0,st=w.heat??0;y=v*3,(o[y]!==at||o[y+1]!==it||o[y+2]!==st)&&(o[y]=at,o[y+1]=it,o[y+2]=st,p.touch(v))}l.flush(this.pos),h.flush(this.size),u.flush(this.uvs),c.flush(this.flags),g.flush(this.glow),p.flush(this.jitter),this.count=e.length,this.geo.instanceCount=e.length;const d=this.meshes,f=e.length>0;for(let v=0;v<d.length;v++)d[v].visible=f}get dropped(){const e=this.geo._maxInstanceCount;return e===void 0||!this.mesh.visible?0:Math.max(0,this.count-e)}release(){this.geo.dispose();for(const e of this.meshes){e.material.dispose();const t=Le.indexOf(e);t>=0&&(Le.splice(t,1),ze.splice(ze.indexOf(e.material),1))}}dispose(){this.release(),this.atlas.albedo.dispose(),this.atlas.normal.dispose()}}const Kr=[.91,.71,.42],Vr=[.85,.47,.62],Jr=[[.91,.71,.42],[.82,.52,.28],[.91,.71,.42]],Yr=1.4,wt=32,ee=16,ha=ee*ee-1,ps=ha-1,Xr=(a,e,t=.8)=>Math.min(1,Math.max(0,(a-e)/t)),vs=3,Zr=10,Qr=a=>a.level>=vs,eo=`
uniform vec3 uRight, uUp;
uniform float uFlat;
uniform vec2 uRes;
uniform float uMpp, uDotMax;
uniform float uPull; // drawn this many metres nearer the camera along its own ray (the blood trails: over the grass tufts), 0 for the rest
attribute vec3 iPos;
attribute float iSize;
attribute vec4 iUv;
attribute vec4 iCol;
attribute float iDraw;
attribute float iShine;
varying vec2 vUv, vP;
varying vec4 vCol;
varying float vDraw, vShine;
varying vec3 vWorld;
varying float vPix, vN;
${je}
${Xe}
void main() {
  vec2 p = position.xy;
  // On the rolling ground: a rune lying flat follows it corner by corner; the rest stand above it.
  vec3 w = uFlat > 0.5 ? onGround(iPos + vec3(p.x * iSize, 0.04, -p.y * iSize)) : onGround(iPos) + uRight * (p.x * iSize) + uUp * (p.y * iSize);
  vUv = vec2(mix(iUv.x, iUv.z, uv.x), mix(iUv.w, iUv.y, uv.y));
  bool glow = iDraw > 1.5;
  vP = p; vCol = iCol; vDraw = glow ? iDraw - 2.0 : iDraw; vWorld = w; vShine = iShine;
  vPix = !glow && iUv.z < 0.07 && iUv.y > 0.99 && iSize <= uDotMax ? 1.0 : 0.0; // (the soft dot, as an object)
  vN = max(1.0, floor(iSize / uMpp + 0.5)); // its art pixels across
  gl_Position = clipOf(w);
  if (uPull > 0.0) { vec3 b = bendW(w), r = b - cameraPosition; gl_Position = projectionMatrix * viewMatrix * vec4(b - r * min(0.9, uPull / max(1e-3, length(r))), 1.0); }
  if (vPix > 0.5) gl_Position.xy += pixelSnap(clipOf(onGround(iPos))) * gl_Position.w;
  if (overBend(onGround(iPos)) < 0.5) gl_Position = vec4(2.0, 2.0, 2.0, 1.0); // (the glows seen through the canopy: never through the earth)
}`,to=`
uniform sampler2D uGlyphs, uGlyphsPal;
uniform float uGlyphIdx; // 1: uGlyphs is an index plane, its colours in uGlyphsPal (render/palette.ts; the attack look's atlas)
uniform float uSolid;
uniform float uRgb; // the texture's own colours, times the instance's (the attack look's atlas: render/leash/attackLook.ts); else its colour alone
varying vec2 vUv, vP;
varying vec4 vCol;
varying float vDraw, vShine;
varying vec3 vWorld;
varying float vPix, vN;
${Ye}
void main() {
  vec4 tx = texture2D(uGlyphs, vUv);
  if (uGlyphIdx > 0.5) tx = texelFetch(uGlyphsPal, ivec2(int(tx.r * 255.0 + 0.5), 0), 0);
  float a = tx.a * vCol.a;
  vec3 rgb = uRgb > 0.5 ? tx.rgb * vCol.rgb : vCol.rgb;
  if (vPix > 0.5) {
    // A disc of art pixels: each fragment takes its art pixel's middle; a full core, a half rim, nothing past it (one or two
    // pixels across: solid).
    vec2 q = (floor((vP + 0.5) * vN) + 0.5) / vN - 0.5;
    float r = length(q) * 2.0;
    a = (vN < 2.5 ? 1.0 : r < 0.55 ? 1.0 : r < 0.95 ? 0.5 : 0.0) * vCol.a;
  }
  if (vShine > 1.5) {
    // A legend's glyph, shiny (render/leash/ranks.ts legendShine): the glint, a band of whole atlas pixels toward white, sweeping
    // across it corner to corner. (No rim: its strokes are thin, and a rim lit the whole glyph pale, losing its vivid colour.)
    vec2 q = (floor((vP + 0.5) * ${wt}.0) + 0.5) / ${wt}.0;
    if (abs((q.x + q.y) * 0.5 - (vShine - 2.0)) < 0.13) rgb = mix(rgb, vec3(1.0), 0.9);
  }
  // Written on: revealed clockwise from the top as vDraw goes 0 to 1.
  float ang = fract(atan(vP.x, vP.y) / 6.2831853 + 1.0);
  if (ang > vDraw || a < 0.02) discard;
#ifdef MASK
  gl_FragColor = vec4(a); return; // (its coverage alone, for the tilt-shift's sharp mask: maskOf)
#endif
  gl_FragColor = uSolid > 0.5 ? vec4(haze(rgb, vWorld), a) : vec4(haze(rgb * a, vWorld), 1.0); // (solid: dust and bits, blended, not glowing)
}`;function ao(a){return new W({vertexShader:a.vertexShader,fragmentShader:a.fragmentShader,uniforms:a.uniforms,defines:{MASK:""},transparent:!0,depthWrite:!1,depthTest:!1,blending:Be,blendEquation:ht,blendEquationAlpha:ht})}const ws=["iPos","iSize","iUv","iCol","iDraw","iShine"];function ys(a){const e=t=>a[0]===t%ee/ee&&a[1]===1-Math.floor(t/ee)/ee;return!(a[0]===0&&a[1]===1)&&!e(ha)&&!e(ps)}class yt{mesh;glyphGain=1;geo=new _t;cap=0;n=0;dirty=[new D,new D,new D,new D,new D,new D];pos;size;uv;col;draw;shine;constructor(e){const t=new $e(1,1);this.geo.index=t.index,this.geo.setAttribute("position",t.getAttribute("position")),this.geo.setAttribute("uv",t.getAttribute("uv")),this.grow(256),this.mesh=new q(this.geo,e),this.mesh.frustumCulled=!1,this.mesh.renderOrder=3}grow(e){const t=(s,r)=>{const n=new Float32Array(e*r);return s&&n.set(s),n};this.pos=t(this.pos,3),this.size=t(this.size,1),this.uv=t(this.uv,4),this.col=t(this.col,4),this.draw=t(this.draw,1),this.shine=t(this.shine,1),this.cap=e,this.geo.dispose();const i=(s,r,n)=>this.geo.setAttribute(s,new Ot(r,n).setUsage(Ut));i("iPos",this.pos,3),i("iSize",this.size,1),i("iUv",this.uv,4),i("iCol",this.col,4),i("iDraw",this.draw,1),i("iShine",this.shine,1)}begin(){this.n=0}add(e,t,i,s,r,n,o,l,h,u=1,c=!1,g=0){this.n>=this.cap&&this.grow(this.cap*2),this.glyphGain!==1&&ys(r)&&(n*=this.glyphGain,o*=this.glyphGain,l*=this.glyphGain);const p=this.n++,m=this.pos,d=this.uv,f=this.col,v=this.dirty,S=u+(c?2:0);let w=p*3;(m[w]!==e||m[w+1]!==t||m[w+2]!==i)&&(m[w]=e,m[w+1]=t,m[w+2]=i,v[0].touch(p)),this.size[p]!==s&&(this.size[p]=s,v[1].touch(p)),w=p*4,(d[w]!==r[0]||d[w+1]!==r[1]||d[w+2]!==r[2]||d[w+3]!==r[3])&&(d[w]=r[0],d[w+1]=r[1],d[w+2]=r[2],d[w+3]=r[3],v[2].touch(p)),(f[w]!==n||f[w+1]!==o||f[w+2]!==l||f[w+3]!==h)&&(f[w]=n,f[w+1]=o,f[w+2]=l,f[w+3]=h,v[3].touch(p)),this.draw[p]!==S&&(this.draw[p]=S,v[4].touch(p)),this.shine[p]!==g&&(this.shine[p]=g,v[5].touch(p))}end(){this.geo.instanceCount=this.n,ws.forEach((e,t)=>this.dirty[t].flush(this.geo.getAttribute(e)))}}const V={reduceFlashing:!1},F=[{id:"full",label:"full quality",when:"live",built:!0},{id:"farDither",label:"the forest's far edge dithered, not faded",when:"live",built:!0},{id:"density90",label:"trees ×0.9",when:"load",built:!0},{id:"blend40",label:"area borders blend over 40 m",when:"load",built:!1},{id:"squeeze",label:"tall trees squeezed",when:"live",built:!0},{id:"still",label:"leaves still, no trunk shadows",when:"live",built:!0},{id:"hardCut",label:"the cut-away's crowns solid",when:"live",built:!0},{id:"fxDistort",label:"magic shimmer off",when:"live",built:!0},{id:"fxImprints",label:"temporary magic scenery marks off",when:"live",built:!0},{id:"fxSecondary",label:"magic secondary detail off",when:"live",built:!0},{id:"fxLights",label:"at most two magic lights",when:"live",built:!0},{id:"fxParticles",label:"half the magic particles",when:"live",built:!0},{id:"density80",label:"trees ×0.8",when:"load",built:!0},{id:"cap30",label:"a steady 30 fps",when:"live",built:!0},{id:"px4",label:"chunkier pixels (px 4)",when:"load",built:!0}];function bs(a){const e=t=>{const i=F.findIndex(s=>s.id===t);return F[i].built&&i<=a};return{density:e("density80")?.8:e("density90")?.9:1,blend:e("blend40")?40:null,px:e("px4")?4:null}}const ua={over:.9,under:.7,downAfter:3,upAfter:10,settle:2,flips:3,flipWindow:60,fit:.85,retry:60,retryMax:480,missed:1.25,kept:1.1},Ae=(a=0,e="auto")=>{const t=Fe(a);return{rung:t,loaded:t,mode:e,slow:0,roomy:0,since:0,last:-1/0,dir:0,reversals:[],locked:!1,cost:F.map(()=>NaN),left:F.map(()=>0),leftAt:F.map(()=>NaN),t:0}},Fe=a=>Math.max(0,Math.min(F.length-1,Math.round(Number.isFinite(a)?a:0)));function me(a,e){const t=F[e];return!t?.built||e===0?!1:t.when==="live"?e<=a.rung:e<=a.loaded}function xs(a){const e=[],t=[];return F.forEach((i,s)=>{i.when!=="load"||!i.built||(s<=a.rung&&s>a.loaded&&e.push(s),s>a.rung&&s<=a.loaded&&t.push(s))}),{adds:e,drops:t}}function Ss(a){for(let e=a.rung+1;e<F.length;e++)if(F[e].built&&F[e].when==="live")return e;for(let e=F.length-1;e>a.rung;e--)if(F[e].built)return e;return-1}function Fs(a){for(let e=a.rung;e>0;e--)if(F[e].built&&F[e].when==="live")return e-1;return a.rung>0?0:-1}function ks(a,e,t,i=1,s=!1,r=ua,n=!0){const o={...a,t:a.t+i,since:a.since+i,cost:a.cost.slice(),reversals:a.reversals.filter(u=>a.t+i-u<=r.flipWindow)};if(o.mode!=="auto")return o;if(s)return{...o,since:0,slow:0};if(!(e>0)||!(t>0)||o.since<=r.settle)return o;const l=o.cost[o.rung];o.cost[o.rung]=Number.isFinite(l)?l+(e-l)*.3:e,o.slow=e>t*(n?r.over:r.missed)?o.slow+1:0,o.roomy=e<t*(n?r.under:r.kept)?o.roomy+i:0;const h=(u,c)=>{o.dir&&c!==o.dir&&o.t-o.last<=r.flipWindow&&o.reversals.push(o.t);const g=o.locked||o.reversals.length>=r.flips,p=o.left.slice(),m=o.leftAt.slice();return c<0&&(p[o.rung]++,m[o.rung]=o.t),{...o,rung:u,dir:c,last:o.t,since:0,slow:0,roomy:0,locked:g,left:p,leftAt:m}};if(o.slow>=r.downAfter){const u=Ss(o);if(u>=0)return h(u,-1);o.slow=0}else if(o.roomy>=r.upAfter&&!o.locked){const u=Fs(o);if(u>=0){const c=o.cost[u];if(!Number.isFinite(c)||c<t*r.fit||o.t-o.leftAt[u]>=Cs(o,u,r))return h(u,1);o.roomy=0}}return o}const Cs=(a,e,t=ua)=>Math.min(t.retryMax,t.retry*2**Math.max(0,(a.left[e]??0)-1));function ue(a,e,t=a.rung){const i=e==="off"?0:Fe(t);return{...a,mode:e,rung:i,since:0,slow:0,roomy:0,locked:e==="auto"?!1:a.locked,reversals:e==="auto"?[]:a.reversals}}const bt=`
uniform vec3 uRight,uUp;
uniform float uFlat,uMpp;uniform vec2 uRes;
attribute vec3 iPos; attribute float iSize,iDraw,iShine; attribute vec4 iUv,iCol;
varying vec2 vP; varying vec4 vData,vCol; varying vec3 vWorld;varying vec2 vGrid;
${je}
${Xe}
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
}`,xt=`
uniform sampler2D uFxRamp;uniform float uFxTime,uLayer,uCalm,uSecondary,uDistort,uGlow;uniform vec2 uHalo;uniform vec4 uSpellGlow;
varying vec2 vP;varying vec4 vData,vCol;varying vec3 vWorld;varying vec2 vGrid;
${Ye}
float hash(vec2 q){return fract(sin(dot(q,vec2(127.1,311.7)))*43758.5453);}
vec4 ramp(float tone){return texelFetch(uFxRamp,ivec2(int(clamp(tone,0.0,3.0)),int(vData.y+0.5)),0);}
float bayer2(vec2 a){a=floor(a);return fract(dot(a,vec2(0.5,a.y*0.75)));}
float bayer4(vec2 a){return bayer2(0.5*a)*0.25+bayer2(a);}
// The creatures' spell glow (render/fx/spellGlow.ts; Ed, 2026-11-09: "The animal magic effects need to glow"), layers 4 (standing:
// a glowing core and a dithered halo round it) and 5 (on the ground: its light's pool), both light added on. In whole art pixels
// (vGrid), the halo and the pool in stepped rings dithered by a 4 x 4 Bayer pattern (the brief's "dithered pixel halos"), in its
// element's bright step (or a party animal's neon: its element's row past 100). uSpellGlow: core, halo, pool, the halo's reach.
void spellGlow(){
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
    if(s<0.5){a=uSpellGlow.x*0.9;rgb=mix(bright,hot,0.2);}
    else if(s<0.85)a=uSpellGlow.x*0.5;
    else{
      float t=(s-0.85)/max(0.01,uSpellGlow.w-0.85),band=floor(t*3.0);
      if(band>2.5||bayer4(cell)>0.75-band*0.25)discard;
      a=uSpellGlow.y*(0.34-band*0.11);
    }
    if(line)a*=abs(p.x)>0.92?0.5:1.0;
  }else{
    float s=line?abs(p.y):length(p),band=floor(s*4.0);
    if(band>3.5||bayer4(cell)>1.0-band*0.25)discard;
    a=uSpellGlow.z*(0.5-band*0.12);
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
    bool detail=uSecondary>0.5 && strength>${x.secondaryAt} && abs(sin(angle*4.0+time+r*9.0))<0.08 && r>0.45 && r<0.8;
    if(!detail && (spark<0.985-strength*0.012 || r>0.95))discard;
    rgb=detail?texelFetch(uFxRamp,ivec2(4,int(vData.y+0.5)),0).rgb:ramp(2.0).rgb;a=0.65;
  }
  if(form>10.5)a*=smoothstep(-1.0,0.7,p.x);
  a*=vCol.a;if(a<0.01)discard;
  gl_FragColor=vec4(haze(rgb*vCol.rgb,vWorld),a);
}`,Ps={blending:Be,blendEquation:Oa,blendSrc:_a,blendDst:ct,blendSrcAlpha:Da,blendDstAlpha:ct},zs=2.6,St=a=>1.45*(1+.15*Math.max(0,a-1));function Ls(a,e){const t=a===8,i=t?0:Math.floor(a/4),s=t?2:a%4;return e!==void 0?e+(t?.009:i?s*.001:.004+s*.001):t?11.2:i?2.9+s*.01:2.8+s*.01}class As{layers=[];time={value:0};calm={value:0};secondary={value:1};distort={value:1};mpp={value:.09375};spellGlow={value:new b(0,0,0,zs)};count=0;canopy=!1;constructor(e,t={}){const i=new Uint8Array(5*H.length*4);H.forEach((r,n)=>{const o=j[r];[...o.ramp,o.contrast].forEach((l,h)=>{const u=parseInt(l.slice(1),16),c=(n*5+h)*4;i.set([u>>16,u>>8&255,u&255,o.motion],c)})});const s=ye(new xe(i,5,H.length),"fx");s.minFilter=s.magFilter=N,s.needsUpdate=!0;for(let r=0;r<9;r++){const n=r===8,o=n?0:Math.floor(r/4),l=n?2:r%4,h=new W({vertexShader:bt,fragmentShader:xt,uniforms:{...E,...te,uRight:Y.uRight,uUp:Y.uUp,uRes:Y.uRes,uMpp:this.mpp,uHalo:{value:new T(...x.halo)},uFxRamp:{value:s},uFlat:{value:o},uLayer:{value:l},uFxTime:this.time,uCalm:this.calm,uSecondary:this.secondary,uDistort:this.distort,uGlow:{value:t.glow?1:0}},transparent:!0,depthWrite:!1,depthTest:!n,blending:l>=2||t.glow?ut:Ra}),u=new yt(h);u.mesh.name=`${t.name??"Magic"} ${n?"canopy halo":`${o?"ground":"upright"} layer ${l}`}`,u.mesh.renderOrder=Ls(r,t.order),e.add(u.mesh),this.layers.push(u)}if(!t.glow)for(const r of[0,1]){const n=new W({vertexShader:bt,fragmentShader:xt,uniforms:{...E,...te,uRight:Y.uRight,uUp:Y.uUp,uRes:Y.uRes,uMpp:this.mpp,uHalo:{value:new T(...x.halo)},uFxRamp:{value:s},uFlat:{value:r},uLayer:{value:4+r},uFxTime:this.time,uCalm:this.calm,uSecondary:this.secondary,uDistort:this.distort,uGlow:{value:0},uSpellGlow:this.spellGlow},transparent:!0,depthWrite:!1,depthTest:!0,...r?Ps:{blending:ut}}),o=new yt(n);o.mesh.name=`${t.name??"Magic"} spell glow ${r?"pool":"core"}`,o.mesh.renderOrder=t.order!==void 0?t.order+(r?-5e-4:.0045):r?2.895:2.84,o.mesh.visible=!1,e.add(o.mesh),this.layers.push(o)}}begin(e,t){this.time.value=e,this.calm.value=t?1:0,this.count=0;for(const i of this.layers)i.begin()}add(e,t,i,s,r,n,o,l=null,h=!0,u=1,c=0){const g=St(u);for(let p=0;p<(h?4:3);p++){if(p!==1){if(this.count>=x.instances)continue;this.count++}this.layers[(o?4:0)+p].add(e,t,i,s*(p===0?1.12:p===2?g:1),r,l?.[0]??1,l?.[1]??1,l?.[2]??1,p===2?n*u:n,1,!1,c)}!o&&this.canopy&&this.secondary.value>.5&&this.count<x.instances&&(this.count++,this.layers[8].add(e,t,i,s*1.5,r,l?.[0]??1,l?.[1]??1,l?.[2]??1,n*.12*u))}beam(e,t,i,s,r,n,o,l,h,u=1){const c=St(u);for(let g=0;g<4;g++){if(g!==1){if(this.count>=x.instances)continue;this.count++}this.layers[g].add(e,t,i,n*(g===0?1.12:g===2?c:1),o,h?.[0]??1,h?.[1]??1,h?.[2]??1,g===2?l*u:l,-s,!1,r)}this.canopy&&this.secondary.value>.5&&this.count<x.instances&&(this.count++,this.layers[8].add(e,t,i,n*1.5,o,h?.[0]??1,h?.[1]??1,h?.[2]??1,l*.12*u,-s,!1,r))}glowAt(e,t,i,s,r,n,o){this.count>=x.instances||!this.layers[9]||(this.count++,this.layers[9].add(e,t,i,s*this.spellGlow.value.w,r,o?.[0]??1,o?.[1]??1,o?.[2]??1,n,1,!1,0))}poolAt(e,t,i,s,r,n){this.count>=x.instances||!this.layers[10]||(this.count++,this.layers[10].add(e,0,t,i,s,n?.[0]??1,n?.[1]??1,n?.[2]??1,r,1,!1,0))}glowLine(e,t,i,s,r,n,o,l,h,u){this.count>=x.instances||!this.layers[10]||(this.count++,this.layers[u?10:9].add(e,u?0:t,i,n*(u?1:this.spellGlow.value.w),o,h?.[0]??1,h?.[1]??1,h?.[2]??1,l,-s,!1,r))}end(){for(const e of this.layers)e.end();for(const e of[9,10])this.layers[e]&&(this.layers[e].mesh.visible=this.layers[e].mesh.geometry.instanceCount>0)}}const Ms={element:"party",form:"beam",intensity:.45,preserveHue:!0,light:.12,anchor:.08},Ts={element:"party",form:"beam",intensity:.65,preserveHue:!0,light:.08,anchor:.04},Es={element:"party",form:"projectile",intensity:.25,preserveHue:!0,light:.04,anchor:.02},Gs={element:"moonlight",form:"aura",intensity:.45,preserveHue:!0,light:0,anchor:.06},Rs={element:"water",form:"aura",intensity:.25,preserveHue:!0,light:.05,anchor:.02},Ds={element:"moonlight",form:"pillar",intensity:.65,preserveHue:!0,light:0,anchor:0},_s={element:"party",form:"beam",intensity:.65,preserveHue:!0,light:.14,anchor:.08},Os={element:"moonlight",form:"dome",intensity:.65,preserveHue:!0,light:0,anchor:0},Us={element:"water",form:"zone",intensity:.45,preserveHue:!0,light:0,anchor:0},Ws={element:"party",form:"burst",intensity:1,preserveHue:!0,light:0,anchor:0},Hs={element:"moonlight",form:"aura",intensity:.45,preserveHue:!0,light:0,anchor:0},ca={flightTrail:Ms,partySwoop:Ts,broomSpark:Es,sigil:Gs,ringDot:Rs,runestone:Ds,ley:_s,hologram:Os,lake:Us,firework:Ws,decorativeGlow:Hs},da={value:1};function Ns(a){const e=ca[a],t=j[e.element];return{uNativeOn:da,uNativeRamp:{value:t.ramp.map(i=>new C((parseInt(i.slice(1),16)>>16)/255,(parseInt(i.slice(1),16)>>8&255)/255,(parseInt(i.slice(1),16)&255)/255))},uNativeStyle:{value:new T(e.intensity,e.preserveHue?1:0)}}}const Is=`
uniform float uNativeOn;uniform vec3 uNativeRamp[4];uniform vec2 uNativeStyle;
vec3 nativeFxColour(vec3 c){
  if(uNativeOn<0.5)return c;
  float l=max(c.r,max(c.g,c.b));if(l<0.00001)return c;
  vec3 band=l<0.2?uNativeRamp[0]:l<0.45?uNativeRamp[1]:l<0.75?uNativeRamp[2]:uNativeRamp[3];
  if(uNativeStyle.y>0.5)band=c/l*max(band.r,max(band.g,band.b));
  // Retain the native form's falloff and authored hue; quantise its light toward the family's ramp.
  return mix(c,band*min(1.0,l*1.2),0.18*uNativeStyle.x);
}`;function io(a,e){a.traverse(t=>{const i=t.material;for(const s of Array.isArray(i)?i:[i]){if(!(s instanceof W)||s.userData.nativeFx)return;/void\s+main\s*\(/.test(s.fragmentShader)&&(s.fragmentShader=Is+s.fragmentShader.replace(/void\s+main\s*\(/,"void nativeMain(")+`
void main(){nativeMain();gl_FragColor.rgb=nativeFxColour(gl_FragColor.rgb);}
`,Object.assign(s.uniforms,Ns(e)),s.userData.nativeFx=e,s.needsUpdate=!0)}})}const $s={shakeCap:.18,seconds:.5,minimumIntensity:.85},J={screen:$s},qs=.5,Bs=6,Ft={on:new URLSearchParams(globalThis.location?.search??"").get("spellglow")!=="0"},ne=(a,e,t)=>Number.isFinite(a)?Math.max(e,Math.min(t,a)):e;function so(a,e,t){if(!e||!a)return null;const i=t?qs:1,s={core:ne(a.core,0,4)*i,halo:ne(a.halo,0,4)*i,pool:ne(a.pool,0,4)*i,lights:Math.round(ne(a.lights,0,Bs)),light:ne(a.light,0,4)*i};return s.core+s.halo+s.pool+s.light>0?s:null}function js(a,e,t){const i=a.map((n,o)=>o).sort((n,o)=>kt(a[o])-kt(a[n])||n-o),s=[];let r=0;for(const n of i){if(s.length>=e)break;if(a[n].spell){if(r>=t)continue;r++}s.push(n)}return s}const kt=a=>a.score*(a.held?1.35:1);function Ks(a,e,t){const i=e-a;if(Math.abs(i)<=1e-6)return e;const s=Math.max(1,Math.abs(i))*Math.max(0,t);return Math.abs(i)<=s?e:a+Math.sign(i)*s}const M={distortion:!0,imprints:!0,secondary:!0,lightCap:x.lightCap,particles:1},Ct=new WeakMap;let Pt=null;const Vs={width:1,alpha:.6,life:1,glow:1},Js=a=>Math.max(0,Math.min(1.5,1+(a-1)*.5));function ro(a){let e=Ct.get(a);return e||(e=new Ys(a),Ct.set(a,e)),e}class Ys{constructor(e,t=Ya){this.patternLook=t,this.batches=new As(e)}patternLook;quality=M;fieldUniforms=O;batches;field=new hs;stats={lights:0,requests:0,instances:0,fieldBytes:x.fieldSize**2*8,fieldCopyValues:0};enabled=new URLSearchParams(globalThis.location?.search??"").get("magic")!=="old";get spellGlow(){return Ft.on}set spellGlow(e){Ft.on=e}galleryPage=0;galleryElement=null;galleryTime=null;captureTime=null;galleryDark=!1;galleryCamera=null;galleryVisible=!0;galleryLegacyVisible=!0;legacyParty=null;panel=null;hidden=[];background=null;lights=new Map;bursts=[];data=[0,0,0,0];selected=[];room=0;spellCap=0;owner=null;time=0;dt=0;cx=0;cz=0;screenAt=-1/0;screenStrength=0;screenSeconds=J.screen.seconds;screenCap=J.screen.shakeCap;begin(e,t,i,s){e=this.captureTime??e,(this.owner!==s||e<this.time)&&(this.reset(),this.owner=s,this.time=e),this.dt=Math.max(0,e-this.time),this.time=e,this.cx=t,this.cz=i,da.value=this.enabled?1:0,this.field.move(t,i),this.field.decay(this.dt),this.batches.begin(e,V.reduceFlashing),this.batches.secondary.value=M.secondary?1:0,this.batches.distort.value=M.distortion&&!V.reduceFlashing?1:0,O.uFxOn.value=this.enabled&&M.imprints?1:0,O.uFxTime.value=e,O.uFxCalm.value=V.reduceFlashing?1:0,this.stats.instances=0,this.spellCap=0}reset(){this.field.reset(),this.lights.clear(),this.room=0,this.bursts.length=0,this.screen(),this.screenAt=-1/0,this.screenStrength=0}get screenKick(){if(!this.enabled||V.reduceFlashing)return 0;const e=Math.max(0,(this.time-this.screenAt)/this.screenSeconds);return e>=1?0:Math.min(this.screenCap,this.screenStrength)*(1-e)**2}screen(e=J.screen.shakeCap,t=J.screen.seconds,i=J.screen.shakeCap){this.screenAt=this.time,this.screenStrength=e,this.screenSeconds=Math.max(.01,t),this.screenCap=i}kick(e,t){this.screen(Math.max(0,e),t,.5)}lamp(e,t,i,s,r,n,o){if(!this.enabled||!(o>.001)||!(n>0))return;let l=this.lights.get(e);if(!l){if(this.lights.size>=x.pool)return;l={x:t,y:i,z:s,reach:0,rgb:new C,strength:0,target:0,seen:this.time,score:0,fade:0,slot:0,spell:!1},this.lights.set(e,l)}l.x=t,l.y=i,l.z=s,l.reach=n,l.rgb.set(r[0],r[1],r[2]),l.target=o*(V.reduceFlashing?.5:1),l.seen=this.time}draw(e,t,i,s,r,n,o=1,l=1,h=0,u=0,c=null,g=ie(n),p=1,m=null,d=!0){if(!this.enabled||!(l>.01)||Math.hypot(i-this.cx,r-this.cz)>140)return;const f=K(e),v=j[f],S=R[t],w=this.batches.mpp.value,P=Math.max(w,Math.round(S.size*o*se(x.size,g)/w)*w);if(g>=J.screen.minimumIntensity&&(t==="burst"||t==="eruption")&&h<.15&&this.screen(J.screen.shakeCap*l),this.data[0]=S.id,this.data[1]=H.indexOf(f),this.data[2]=g,this.data[3]=h,this.batches.add(i,s,r,P,this.data,l,S.ground,c,M.particles>.5||(u&1)===0,p),this.stats.instances++,S.ground||(this.data[0]=R.zone.id,this.batches.add(i,0,r,Math.min(P*.75,12),this.data,l*.18*p,!0,c,!1)),m){this.glowLook(m),this.glowData(S.id,f,g,h,c);const L=t==="burst"||t==="eruption";!S.ground&&m.core+m.halo>0&&this.batches.glowAt(i,s,r,P*(L?.26:.62),this.data,l*(L?.8:1),c),m.pool>0&&this.batches.poolAt(i,r,S.ground?P*1.15:Math.max(2.4,P*(L?1:1.9)),this.data,l*(S.ground?.6:Math.max(.35,1-s/14)),c)}d&&(!m||m.light>0)&&this.light(`${f}:${t}:${u}`,i,s,r,f,g,l,c,p,m?m.light:0),M.imprints&&(t==="burst"||t==="zone"||t==="eruption"||t==="beam"||t==="projectile"||t==="vortex"||t==="pillar")&&this.field.stamp(i,r,Math.max(2,Math.min(18,P*.6)),v.imprint,g*l*(t==="projectile"?.25:1))}emit(e,t,i,s,r,n,o=1,l=1.2,h=0){this.bursts.length>=x.pool&&this.bursts.shift(),this.bursts.push({element:e,form:t,x:i,y:s,z:r,level:n,size:o,at:this.time,life:l,seed:h}),n>=3&&o>=1&&this.screen()}native(e,t,i,s,r=1,n=0,o=null){if(!this.enabled||r<=.01||Math.hypot(t-this.cx,s-this.cz)>80)return;const l=ca[e],h=K(l.element);l.light>0&&this.light(`native:${e}:${n}`,t,i,s,h,l.intensity,Math.min(1,r)*l.light,o),l.anchor>0&&(this.data[0]=R.zone.id,this.data[1]=H.indexOf(h),this.data[2]=l.intensity,this.data[3]=0,this.batches.add(t,0,s,Math.min(5,R[l.form].size*1.5),this.data,l.anchor*Math.min(1,r),!0,o,!1))}beam(e,t,i,s,r,n,o,l,h,u,c=null,g=ie(l),p=1,m=null){const d=Math.hypot(s-t,r-i);if(!this.enabled||d<.01||h<=.01)return;const f=K(e),v=(t+s)/2,S=(i+r)/2;if(Math.hypot(v-this.cx,S-this.cz)>140+d/2)return;this.data[0]=R.beam.id,this.data[1]=H.indexOf(f),this.data[2]=g,this.data[3]=this.time%1;const w=Math.abs(r-i)/d,P=Math.atan2(r-i,s-t),L=Math.max(o,this.batches.mpp.value*3)*(1+w*.35);this.batches.beam(v,n,S,d,P,L,this.data,h,c,p),m&&(this.glowLook(m),this.glowData(R.beam.id,f,g,this.data[3],c),m.core+m.halo>0&&this.batches.glowLine(v,n,S,d,P,L*.7,this.data,h,c,!1),m.pool>0&&this.batches.glowLine(v,0,S,d,P,L*2.6,this.data,h*.8,c,!0));const _=Math.min(8,Math.max(1,Math.ceil(d/4))),y=Math.round(_/2);for(let A=0;A<=_;A++){const z=t+(s-t)*A/_,k=i+(r-i)*A/_;m?(A===y||A===_)&&m.light>0&&this.light(`${f}:beam:${u}:${A}`,z,n,k,f,g,h,c,p,m.light):this.light(`${f}:beam:${u}:${A}`,z,n,k,f,g,h,c,p),M.imprints&&this.field.stamp(z,k,Math.max(2,o*1.5),j[f].imprint,g*h)}this.stats.instances++}ribbon(e,t,i,s,r,n,o,l,h,u=null,c=ie(l),g=Vs,p=null){const m=Math.hypot(r,o);if(!this.enabled||m<.1)return;const d=Math.min(.32,8/m)*g.life,f=m*d,v=K(e);this.data[0]=R.trail.id,this.data[1]=H.indexOf(v),this.data[2]=c,this.data[3]=n*d,this.batches.beam(t-r*d/2,i-n*d/2,s-o*d/2,f,Math.atan2(o,r),.55*g.width*se(x.size,c),this.data,g.alpha,u,g.glow),p&&p.core+p.halo>0&&(this.glowLook(p),this.glowData(R.trail.id,v,c,this.data[3],u),this.batches.glowLine(t-r*d/2,i-n*d/2,s-o*d/2,f,Math.atan2(o,r),.3*g.width*se(x.size,c),this.data,g.alpha*.55,u,!1)),M.imprints&&(h&3)===0&&this.field.stamp(t-r*d,s-o*d,2,j[v].imprint,.15*c)}glowPool(e,t,i,s,r,n,o,l,h,u=!0,c=ie(r)){if(!this.enabled||!(n>.01)||Math.hypot(t-this.cx,i-this.cz)>140)return;const g=K(e);this.glowLook(h),this.glowData(R.zone.id,g,c,0,l),h.pool>0&&this.batches.poolAt(t,i,s,this.data,n,l),u&&h.light>0&&this.light(`${g}:pool:${o}`,t,.6,i,g,c,n,l,1,h.light)}glowBurst(e,t,i,s,r,n,o,l,h,u,c=ie(n)){if(!this.enabled||!(o>.01)||Math.hypot(t-this.cx,s-this.cz)>140)return;const g=K(e);this.glowLook(u),this.glowData(R.burst.id,g,c,0,h),u.core+u.halo>0&&this.batches.glowAt(t,i,s,r,this.data,o,h),u.pool>0&&this.batches.poolAt(t,s,r*2.4,this.data,o,h),u.light>0&&this.light(`${g}:blow:${l}`,t,i,s,g,c,o,h,1,u.light)}glowLook(e){this.batches.spellGlow.value.set(e.core,e.halo,e.pool,this.batches.spellGlow.value.w),this.spellCap=Math.max(this.spellCap,e.lights)}glowData(e,t,i,s,r){this.data[0]=e,this.data[1]=H.indexOf(t)+(r?100:0),this.data[2]=i,this.data[3]=s}light(e,t,i,s,r,n,o,l,h=1,u=0){let c=this.lights.get(e);if(!c){if(this.lights.size>=x.pool){const p=Pe(t,s,n*o,this.cx,this.cz);let m="",d=1/0;for(const[f,v]of this.lights){const S=Pe(v.x,v.z,v.target,this.cx,this.cz);S<d&&(m=f,d=S)}if(p<=d)return;this.lights.delete(m)}c={x:t,y:i,z:s,reach:0,rgb:new C,strength:0,target:0,seen:this.time,score:0,fade:0,slot:0,spell:u>0},this.lights.set(e,c)}c.spell=u>0;const g=parseInt(j[r].ramp[1].slice(1),16);c.x=t,c.y=i,c.z=s,c.reach=se(x.lightReach,n),c.rgb.set(l?.[0]??(g>>16)/255,l?.[1]??(g>>8&255)/255,l?.[2]??(g&255)/255),c.target=se(x.lightStrength,n)*Math.min(1,o)*Js(h)*(u>0?u:V.reduceFlashing?.5:1),c.seen=this.time,c.pattern=e.startsWith("moonlight:aura:")}finish(e){let t=0;for(const i of this.bursts){const s=this.time-i.at;if(s<0||s>=i.life)continue;this.bursts[t++]=i;const r=s/i.life,n=Math.min(1,s/.2,(i.life-s)/.3);this.draw(i.element,i.form,i.x,i.y,i.z,i.level,i.size,n,r,i.seed)}if(this.bursts.length=t,this.batches.end(),this.field.publish()||Pt!==this.field){const i=O.uFxField.value.image.data,s=O.uFxExtra.value.image.data;this.stats.fieldCopyValues+=this.field.data.length;for(let r=0,n=0;r<this.field.data.length;r+=8,n+=4)for(let o=0;o<4;o++)i[n+o]=this.field.data[r+o],s[n+o]=this.field.data[r+o+4];O.uFxField.value.needsUpdate=!0,O.uFxExtra.value.needsUpdate=!0,Pt=this.field}O.uFxOn.value=this.field.active&&this.enabled&&M.imprints?1:0,O.uFxBox.value.set(this.field.x*this.field.cell,this.field.z*this.field.cell,this.field.metres,this.field.size),this.applyLights(e)}applyLights(e){this.selected.length=0;for(const[m,d]of this.lights){const f=this.enabled&&d.seen===this.time,v=this.dt/x.lightEase;if(d.fade=Math.max(0,Math.min(1,d.fade+(f?v:-v))),d.strength=d.target*d.fade,!f&&d.fade<.001){this.lights.delete(m);continue}d.score=Pe(d.x,d.z,d.strength,this.cx,this.cz),Math.hypot(d.x-this.cx,d.z-this.cz)<d.reach+30?this.selected.push(d):d.slot=0}this.enabled||(this.selected.length=0);const t=E,i=Math.max(0,Math.min(B,Math.floor(e))),s=this.dt/x.lightEase,r=Math.min(M.lightCap,x.lightCap,i),n=js(this.selected.map(m=>({score:m.score,spell:m.spell,held:m.slot>0})),r,this.spellCap),o=Math.min(t.uLightCount.value,i),l=i-o;this.room=Math.min(o,Ks(this.room,Math.max(0,n.length-l),s));const h=Math.floor(this.room+1e-6),u=this.room-h,c=o-h;u>1e-6&&c>0&&(t.uLightCol.value[c-1].w*=1-u);const g=Math.min(n.length,i-c);Za(c);for(const m of this.selected)m.score=-1;let p=!1;for(let m=0;m<g;m++){const d=this.selected[n[m]];d.score=0,d.slot=Math.min(1,d.slot+s),t.uLightPos.value[c+m].set(d.x,Ua(d.x,d.z)+d.y,d.z,d.reach),t.uLightCol.value[c+m].set(d.rgb.x,d.rgb.y,d.rgb.z,d.strength*d.slot);const v=d.pattern&&!p&&this.patternLook!=="off"?aa("rings",this.time,V.reduceFlashing):void 0;sa(c+m,v),v&&(p=!0)}for(const m of this.selected)m.score<0&&(m.slot=0);t.uLightCount.value=c+g,this.stats.lights=g,this.stats.requests=this.lights.size}gallery(e,t,i,s){if(this.galleryPanel(e),!this.galleryVisible)return;const r=(this.galleryTime??s)%4/4;if(this.galleryPage===3){const o=this.galleryElement??e;this.beam(o,t-13,i,t-3,i,1.5,1.4,2,.8,880001),this.beam(o,t+8,i-5,t+8,i+5,1.5,1.4,2,.8,880002);return}pt.slice(this.galleryPage*4,this.galleryPage*4+4).forEach((o,l)=>[.25,.6,1].forEach((h,u)=>{const c=t+(l-1.5)*10,g=i+(u-1)*12;if(o==="beam"){this.beam(this.galleryElement??e,c-3,g,c+3,g,1.5,1.4,2,.8,l*3+u,null,h);return}if(o==="trail"){this.ribbon(this.galleryElement??e,c+3,2,g,20,0,0,2,l*3+u,null,h);return}this.draw(this.galleryElement??e,o,c,R[o].ground?0:o==="pillar"?5:2,g,2,1,.7,r,l*3+u,null,h)}))}galleryPanel(e){if(this.panel||typeof document>"u")return;const t=this.panel=document.createElement("aside");t.style.cssText="position:fixed;left:12px;top:12px;z-index:20000;background:#15131eee;color:#fff;padding:12px;font:14px monospace;max-width:420px";const i=document.createElement("div");i.textContent="Magic gallery · rows far → near: 0.25 / 0.6 / 1",t.append(i);const s=document.createElement("select");s.setAttribute("aria-label","Magic element");for(const c of H){const g=document.createElement("option");g.value=g.textContent=c,s.append(g)}s.value=K(e),s.onchange=()=>{this.galleryElement=s.value},t.append(s);const r=document.createElement("select");r.setAttribute("aria-label","Magic forms");for(let c=0;c<3;c++){const g=document.createElement("option");g.value=String(c),g.textContent=pt.slice(c*4,c*4+4).join(" / "),r.append(g)}const n=document.createElement("option");n.value="3",n.textContent="Equal E–W / N–S beams",r.append(n),r.onchange=()=>{this.galleryPage=Number(r.value)},t.append(r);const o=(c,g)=>{const p=document.createElement("button");return p.textContent=c,p.onclick=g,t.append(p),p},l=o("Pause",()=>{this.galleryTime=this.galleryTime===null?this.time:null,l.textContent=this.galleryTime===null?"Pause":"Play"}),h=o("Dark ground",()=>{this.galleryDark=!this.galleryDark,h.textContent=this.galleryDark?"Forest ground":"Dark ground"}),u=o("Treetop camera",()=>{this.galleryCamera=!this.galleryCamera,u.textContent=this.galleryCamera?"Ground camera":"Treetop camera"});document.body.append(t)}hideBackdrop(e){if(this.galleryDark){this.background=e.background,e.background=new qe("#15131e"),this.hidden=e.children.filter(t=>!t.name.startsWith("Magic ")).map(t=>({object:t,visible:t.visible}));for(const t of this.hidden)t.object.visible=!1}}restoreBackdrop(e){if(this.hidden.length){for(const t of this.hidden)t.object.visible=t.visible;this.hidden.length=0,e.background=this.background}}}const Me=new WeakMap;function Xs(a){if(Me.has(a))return Me.get(a);const e=a.getExtension("WEBGL_debug_renderer_info"),t=a.getParameter(e?e.UNMASKED_RENDERER_WEBGL:a.RENDERER);return t!=null&&Me.set(a,t),t}const zt=1e3/60,Lt=1e3/30,Zs=.35,fa="witch.ladder";class oo{mutate=(e,t)=>t();state;ms=NaN;timed=!1;key;bases=new WeakMap;applied="";win={t0:NaN,frames:[],skip:!1};constructor(e,t){this.key=`${fa}:${e.slice(0,120)}`,this.state=ga(t,ma(this.key)),this.sync()}get cap30(){return me(this.state,F.findIndex(e=>e.id==="cap30"))}frame(e,t,i,s,r){const n=this.win;if(Number.isNaN(n.t0)&&(n.t0=e),i||t>250?n.skip=!0:t>0&&n.frames.push(t),e-n.t0>=1e3){const o=(e-n.t0)/1e3,l=n.frames.length,h=r.length?Tt(r.slice(-Math.max(1,Math.min(l,r.length)))):NaN;this.timed=Number.isFinite(h),this.ms=this.timed?h:Tt(n.frames);const u=this.state.rung;this.state=ks(this.state,this.ms,this.cap30?Lt:zt,o,n.skip||l<5,void 0,this.timed),this.state.rung!==u&&this.state.mode==="auto"&&this.save(),this.sync(),n.t0=e,n.frames=[],n.skip=!1}this.apply(s)}apply(e){let t=this.bases.get(e);if(!t){const r=pa.get(e);r!==void 0&&(this.state={...this.state,loaded:r}),t={keep:e.treeCap.keep,wind:e.wind.on,trunks:e.shadows.trunks?.mode??"off",edge:!!e.scenery.edgeDither,hard:!!e.canopyCutout.hard},this.bases.set(e,t),this.applied=""}const i=r=>me(this.state,F.findIndex(n=>n.id===r)),s=F.map((r,n)=>me(this.state,n)?1:0).join("");s!==this.applied&&(this.applied=s,this.mutate("automatic quality tuning",()=>{M.distortion=!i("fxDistort"),M.imprints=!i("fxImprints"),M.secondary=!i("fxSecondary"),M.lightCap=i("fxLights")?2:6,M.particles=i("fxParticles")?.5:1,Mt(e.scenery,"edgeDither",i("farDither")||t.edge),Mt(e.canopyCutout,"hard",i("hardCut")||t.hard),e.treeCap.keep=i("squeeze")?Math.min(t.keep,Zs):t.keep,e.wind.on=i("still")?!1:t.wind,e.shadows.trunks&&(e.shadows.trunks.mode=i("still")?"off":t.trunks)}))}lines(){const e=this.state,t=F[e.rung],i=F.length-1,r=[`${e.mode==="off"?"off (full quality)":e.mode==="pinned"?`pinned at ${e.rung}`:e.locked?"auto, holding (it kept flipping)":"auto"}: rung ${e.rung} of ${i}, ${t.label}`];Number.isFinite(this.ms)&&r.push(`${this.timed?"GPU":"frame"} ${this.ms.toFixed(1)} ms a frame, budget ${(this.cap30?Lt:zt).toFixed(1)}`);const n=F.filter((l,h)=>me(e,h)).map(l=>l.label);n.length&&r.push(`in effect: ${n.join("; ")}`);const o=xs(e);return o.adds.length&&r.push(`from the next load: ${o.adds.map(l=>F[l].label).join("; ")}`),o.drops.length&&r.push(`back from the next load: ${o.drops.map(l=>F[l].label).join("; ")}`),r}options(){return[{value:"auto",label:"Auto"},{value:"off",label:"Off (full quality)"},...F.slice(1).map((e,t)=>({value:String(t+1),label:`${t+1}: ${e.label}${e.built?"":" (not built yet)"}`}))]}current(){return this.state.mode==="auto"?"auto":this.state.mode==="off"?"off":String(this.state.rung)}choose(e){this.state=e==="auto"?ue(this.state,"auto"):e==="off"?ue(this.state,"off"):ue(this.state,"pinned",Number(e)),e==="auto"&&this.save(),this.sync()}sync(){le=this.state.mode==="off"?0:this.state.rung}save(){try{Nt()?.setItem(this.key,JSON.stringify({rung:this.state.rung,at:Date.now()}))}catch{}}}function ga(a,e){const t=a.get("ladder"),i=t!==null&&t!==""&&Number.isFinite(Number(t)),s=typeof navigator<"u"&&navigator.webdriver===!0;return t==="off"||s&&t!=="auto"&&!i?ue(Ae(0),"off"):i?ue(Ae(Fe(Number(t))),"pinned"):Ae(e)}function ma(a){try{const e=JSON.parse(Nt()?.getItem(a)??"null");return Fe(Number(e?.rung??0))}catch{return 0}}let le=null,pe;const pa=new WeakMap;function va(a,e=new Set){le===null&&(le=(()=>{const i=ga(At(),ma(`${fa}:${Qs().slice(0,120)}`));return i.mode==="off"?0:i.rung})());const t=bs(le);pe===void 0&&(pe=At().has("px")?null:t.px),t.density!==1&&!e.has("treeDensity")&&(a.treeDensity*=t.density),t.blend!==null&&!e.has("areaEdgeBlend.width")&&(a.areaEdgeBlend.width=Math.min(a.areaEdgeBlend.width,t.blend)),pe&&(a.pixelSize=pe),pa.set(a,le)}const At=()=>new URLSearchParams(typeof location<"u"?location.search:"");function Qs(){try{const a=document.createElement("canvas").getContext("webgl2");if(!a)return"unknown";const e=er(a);return a.getExtension("WEBGL_lose_context")?.loseContext(),e}catch{return"unknown"}}function er(a){try{return String(Xs(a))}catch{return"unknown"}}function Mt(a,e,t){t?a[e]=!0:delete a[e]}function Tt(a){if(!a.length)return NaN;const e=[...a].sort((t,i)=>t-i);return e[Math.floor(e.length/2)]}const tr="witch-mapprep",Ne="prep",ar="next",ir=()=>new Promise(a=>{if(It()){a(null);return}try{const e=indexedDB.open(tr,1);e.onupgradeneeded=()=>e.result.createObjectStore(Ne),e.onsuccess=()=>a(e.result),e.onerror=e.onblocked=()=>a(null)}catch{a(null)}});async function sr(){const a=await ir();return a?new Promise(e=>{try{const t=a.transaction(Ne,"readonly").objectStore(Ne).get(ar);t.onsuccess=()=>{a.close(),e(t.result??null)},t.onerror=()=>{a.close(),e(null)}}catch{a.close(),e(null)}}):null}const rr="v7804 · f6d1db9",Qe=(a,e)=>`${rr}|${a}|${Ha(JSON.stringify(e))}`;function wa(a,e,t){const i=new URLSearchParams({island:a,seed:String(t),...e!=null?{world:String(e)}:{},arrive:"1"}),{tuning:s}=Wt(i);return Vt(s,void 0,new Set),va(s),Zt(Ke(),s),s}let X="none",Z=0,Q=0;const he=(a,e=0)=>{try{performance.mark("witch:map-prep-source",{detail:{seed:a,status:X,workerMs:Z,hydrateMs:Q,checkMs:e}})}catch{}};function Ie(a,e,t){const i=performance.now();if(X="none",Z=0,Q=0,!a)return he(e),null;if(a.key!==Qe(e,t))return X="stale",he(e,performance.now()-i),a.key.split("|")[1]===String(e)&&a.tuning&&console.info("map prep: another tuning's",Object.keys(t).filter(r=>JSON.stringify(t[r])!==JSON.stringify(a.tuning[r]))),null;const s=Sa(a.prep);return s?(X="unsound",he(e,performance.now()-i),console.warn("map prep: unsound, made afresh:",s),null):(Fa(a.arch),X="worker",Z=a.ms,he(e,performance.now()-i),a.prep)}function or(a,e,t){const i=performance.now();if(t)try{const s=ba(a,e,t);Q=performance.now()-i;try{performance.mark("witch:map-hydrated",{detail:{seed:a,ms:Q,workerMs:Z}})}catch{}return Z>0&&Q>Z&&console.warn(`map prep: hydrate ${Math.round(Q)} ms, slower than making it (${Math.round(Z)} ms in the worker)`),s}catch(s){X="failed",he(a),console.warn("map prep: hydrate failed, made afresh:",s)}return xa(a,e)}async function nr(a,e,t=1500){return Ie(typeof indexedDB>"u"?null:await Promise.race([sr(),new Promise(i=>setTimeout(()=>i(null),t))]),a,e)}function ya(a,e,t,i=!0){let s=null,r=()=>{};const n=new Promise(o=>{r=o});try{if(typeof Worker>"u")return r(null),{done:n,stop(){}};s=new Worker(new URL(""+new URL("mapPrep.worker-BBOMKnPp.js",import.meta.url).href,import.meta.url),{type:"module"}),s.onmessage=o=>{r(o.data.rec??o.data.ok),s?.terminate(),s=null},s.onerror=()=>{r(null),s?.terminate(),s=null},Wa(s,{key:Qe(a,e),seed:a,tuning:e,send:t,noKeep:!i||It()},"map-prep",a)}catch{r(null)}return{done:n,stop(){s?.terminate(),s=null,r(null)}}}function lr(a,e,t,i=!1){return ya(t,wa(a,e,t),i)}function hr(a,e,t=1e4){try{const{tuning:i}=Wt(e),s=new Set((e.get("set")??"").split(";").map(o=>o.split("=")[0]).filter(Boolean));Vt(i,void 0,s),va(i,s),Zt(Ke(),i);const r=ya(a,i,!0,!1),n=setTimeout(()=>r.stop(),t);return r.done.then(o=>(clearTimeout(n),o&&typeof o=="object"?o:null))}catch{return Promise.resolve(null)}}const no=Object.freeze(Object.defineProperty({__proto__:null,get hydrateMs(){return Q},prepKey:Qe,get prepUsed(){return X},readyMap:or,sailTuning:wa,startBootMapPrep:hr,startMapPrep:lr,takeMapPrep:nr,useReadyMap:Ie},Symbol.toStringTag,{value:"Module"}));export{pt as $,_r as A,Mr as B,Hr as C,sa as D,H as E,O as F,di as G,vi as H,xi as I,pi as J,D as K,E as L,B as M,Is as N,$r as O,Xe as P,io as Q,Br as R,Y as S,us as T,ro as U,Ar as V,Or as W,yt as X,so as Y,Ft as Z,K as _,Vt as a,Yr as a0,to as a1,eo as a2,Ya as a3,aa as a4,Pr as a5,Xr as a6,ha as a7,ps as a8,Kr as a9,qa as aA,F as aB,va as aC,wr as aD,nr as aE,Ie as aF,or as aG,yr as aH,br as aI,hr as aJ,oo as aK,er as aL,Dr as aM,Q as aN,X as aO,we as aP,vr as aQ,Fr as aR,no as aS,ao as aa,Zr as ab,Vr as ac,Qr as ad,vs as ae,Jr as af,Ir as ag,ms as ah,ze as ai,Le as aj,qr as ak,ds as al,Cr as am,Lr as an,ai as ao,Rr as ap,li as aq,ui as ar,wi as as,kr as at,De as au,Nr as av,zr as aw,Xs as ax,xr as ay,Sr as az,Zt as b,Ke as c,hi as d,Ce as e,mi as f,wt as g,ee as h,V as i,jr as j,Wr as k,Ur as l,Tr as m,Ye as n,Gr as o,Er as p,la as q,cs as r,Ns as s,As as t,Ls as u,M as v,R as w,se as x,x as y,j as z};
