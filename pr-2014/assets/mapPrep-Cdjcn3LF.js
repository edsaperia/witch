import{h as Qe,dL as gr,dM as mr,dN as br,dO as vr}from"./mushrooms-Dxg-rlc7.js";import{cf as yr,_ as $,V as J,$ as ee,aY as wr,cg as kr,bm as ha,o as pe,U as Ba,ch as So,u as we,x as ro,bn as ls,ci as xr,cj as zr,aj as io,S as ue,r as Sr,l as ya,R as cs,W as us,q as hs,k as pa,a2 as Mo,H as $e,Z as Mr,ac as ds,bv as Co,bw as Fo,a6 as Cr,a5 as Fr,a3 as no,e as lo,at as Pr,I as fs,ab as ps,ck as Po,A as Lo,a4 as Lr,ad as To,af as Tr,cl as Ar,al as Er,g as Rr,T as Dr}from"./chartView-Cseb5ntM.js";import{n as Or,P as gs}from"./linkParams-DEtCFae8.js";import{a as ms,b as bs,c as vs}from"./saveSlots-adtOazhL.js";import{D as ys,s as ws,k as Ta}from"./decisions-CKiqfyH4.js";import{$ as ks}from"./game-MsBYgui3.js";import"./housePieces-DGVRyN1B.js";const xs="witch.settings";function zs(){try{const t=ms.getItem(xs);return t?JSON.parse(t):{}}catch{return{}}}function Sl(t,e){if(!t.persist)return;const a=zs();e===t.default?delete a[t.id]:a[t.id]=e;try{ms.setItem(xs,JSON.stringify(a))}catch{}}function Ss(t,e=ys,a=new Set){const o=zs(),s=[];for(const r of e){const n=o[r.id];!r.persist||!r.apply.knob||a.has(r.apply.knob)||n===void 0||typeof n!=typeof r.default||r.control.type==="slider"&&typeof n=="number"&&!(n>=r.control.min&&n<=r.control.max)||(ws(t,r.apply.knob,n),s.push(r.id))}return s}function Ml(t,e,a=ys,o=new Set){const s=[];for(const r of a){const n=r.apply.knob;if(!n||o.has(n))continue;const i=Ta(t,n);i===void 0||Ta(e,n)===void 0||Object.is(i,Ta(e,n))||(ws(e,n,i),s.push(r.id))}return s}const da={master:1,music:.5,effects:1,voices:1,muteBackground:!0,quality:"auto",shake:!0,screen:"",reduceFlashing:!1,talk:"hold",textSize:1,glyphs:"auto",rumble:!0},Ms="witch.player",Gr="witch.settings",ja="witch.shake",Cs=()=>yr();function Fs(t){const e=t&&typeof t=="object"?t:{},a={...da},o=n=>{const i=e[n];typeof i=="number"&&i>=0&&i<=1&&(a[n]=i)},s=n=>{typeof e[n]=="boolean"&&(a[n]=e[n])},r=(n,i)=>{i.includes(e[n])&&(a[n]=e[n])};return o("master"),o("music"),o("effects"),o("voices"),s("muteBackground"),s("shake"),s("reduceFlashing"),s("rumble"),r("quality",["auto","high","medium","low"]),r("talk",["hold","toggle"]),r("textSize",[1,1.25,1.5]),r("glyphs",["auto","ps","xbox"]),typeof e.screen=="string"&&(a.screen=e.screen.slice(0,80)),a}function Hr(t=Cs()){if(!t)return{...da};try{const e=t.getItem(Ms);if(e)return Fs(JSON.parse(e));const a=JSON.parse(t.getItem(Gr)??"{}"),o={...da};return typeof a.musicVolume=="number"&&a.musicVolume>=0&&a.musicVolume<=1&&(o.music=a.musicVolume),typeof a.sfxVolume=="number"&&a.sfxVolume>=0&&a.sfxVolume<=1&&(o.effects=a.sfxVolume),t.getItem(ja)==="0"&&(o.shake=!1),o}catch{return{...da}}}function _r(t,e=Cs()){if(!e)return!1;try{return e.setItem(Ms,JSON.stringify(t)),t.shake?e.setItem(ja,"1"):e.setItem(ja,"0"),!0}catch{return!1}}const ga=new WeakMap;function Cl(t){const e=ga.get(t);return e?structuredClone(e):void 0}function Fl(t,e){if(!e||!e.voices||typeof e.voices!="object"||!Number.isFinite(e.shake)||!Number.isFinite(e.legendFlash)||Object.values(e.voices).some(a=>!Number.isFinite(a)))throw new Error("Invalid saved settings levels.");ga.set(t,structuredClone(e))}function Ps(t,e){const a=e;let o=ga.get(a);o||ga.set(a,o={voices:Object.fromEntries(Object.entries(a.sfx.voice??{}).map(([s,r])=>[s,r.volume??0])),shake:a.combat.shake,legendFlash:a.attackFx?.legendFlash??0}),a.music.volume=t.music*t.master,a.sfx.volume=t.effects*t.master;for(const[s,r]of Object.entries(a.sfx.voice??{}))typeof r.volume=="number"&&(r.volume=(o.voices[s]??r.volume)*t.voices);a.combat.shake=t.shake?o.shake:0,a.attackFx&&(a.attackFx.legendFlash=t.reduceFlashing?0:o.legendFlash)}function Pl(t,e){return t==="auto"?"auto":t==="high"?"off":String(t==="medium"?Math.round(e/2):e)}function Ll(t,e){return t!=="auto"?t:e&&/xbox|xinput|045e/i.test(e)?"xbox":"ps"}let Ka=null;function co(){return Ka??=Hr()}function Nr(t){return Ka=Fs(t),_r(Ka)}function Tl(t,e){if(typeof e!="number"||t!=="music.volume"&&t!=="sfx.volume")return;const a=co(),o=a.master>0?Math.min(1,Math.max(0,e/a.master)):e;Nr(t==="music.volume"?{...a,music:o}:{...a,effects:o})}const Ls={none:0,spokes:1,stripes:2,bands:3,flicker:4,rings:5,"colour-spokes":6},bt={scale:6,contrast:.9,beatsPerTurn:8,projectorCap:3},Wr=Math.PI*2,Ts=(t,e,a)=>Math.max(e,Math.min(a,t));function Ir(t,e){return t=Math.fround(t),e=Math.fround(e),[1/Math.max(.1,t),Ts(.5+.3*Math.sin(e)+.2*Math.sin(e*1.73+1.2),0,1)]}function Ur(t,e,a=bt.beatsPerTurn){const o=Number.isFinite(a)&&a>0?a:bt.beatsPerTurn,s=ks(t,e)%o;return(s<0?s+o:s)*Wr/o}function As(t,e,a){return e&&!a&&Number.isFinite(t)?Ts(t,0,1):0}const $r=`
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
`,uo=[0,1,0,0],qr=t=>{const e=new URLSearchParams(t).get("patternlight");return e===null?"colour-spokes":e==="off"?"off":e==="auto"||e==="spokes"||e==="stripes"||e==="bands"||e==="colour-spokes"?e:"off"},Br=qr(globalThis.location?.search??""),Ao=t=>(t=Math.max(0,Math.min(1,t)),t*t*(3-2*t));function Al(t,e,a,o,s){if(a==="off"||o)return uo;const r=Math.max(0,ks(t,e)),n=r/64,i=a==="auto"?["spokes","stripes","bands"][Math.floor(n)%3]:a,l=r%64,c=a==="auto"?Ao(l/4)*Ao((64-l)/4):1;return[Ls[i],bt.scale,As(bt.contrast*c,!0,o),Ur(t,e,s)]}function Es(t,e,a){return a?uo:[Ls[t],t==="rings"?3:6,As(t==="flicker"?.5:.75,!0,a),e*(t==="flicker"?.45:.7)]}function El(t,e,a,o){t&&(t.pattern=a!=="off"&&!o?Es("flicker",e,!1):void 0)}class jr{constructor(e,a=bt.projectorCap){this.slots=e,this.cap=a,this.data=new Float32Array(e*4)}slots;cap;data;count=0;begin(){this.data.fill(0),this.count=0}write(e,a=uo){if(!Number.isInteger(e)||e<0||e>=this.slots)return;const o=e*4;this.data[o]>0&&this.count--,this.data.fill(0,o,o+4),!(!(a[0]>0&&a[2]>0)||this.count>=this.cap||!a.every(Number.isFinite))&&(this.data.set(a,o),this.count++)}get used(){return this.count}}const wa=24,Va=new jr(wa),ho={uLightPattern:{value:Array.from({length:wa},()=>new $)}};let Rs=1;function Rl(t=1){Rs=Number.isFinite(t)?Math.max(0,Math.min(4,t)):0,Va.begin();for(const e of ho.uLightPattern.value)e.set(0,0,0,0)}function Ds(t,e){const a=e?[e[0],e[1],e[2]*Rs,e[3]]:void 0;if(Va.write(t,a),!Number.isInteger(t)||t<0||t>=wa)return;const o=t*4,s=Va.data,r=ho.uLightPattern.value[t];if(s[o]>0&&s[o+2]>0){const[n,i]=Ir(s[o+1],s[o+3]);r.set(s[o],n,s[o+2],s[o]===4?i:s[o+3])}else r.set(0,0,0,0)}function Kr(t){for(let e=Math.max(0,Math.floor(t));e<wa;e++)Ds(e)}const ke=24,Ja=4,te={...ho,uLandscapeTrip:wr,uAmb:{value:new J},uUnlitDim:{value:1},uMoon:{value:new J},uMoonDir:{value:new J(-.45,.75,.5).normalize()},uMoonBeam:{value:new J},uMoonUp:{value:new $},uShafts:{value:.3},uShaftScale:{value:1},uGlowPos:{value:new J},uGlowRgb:{value:new J},uGlowR:{value:8},uGlowFalloff:{value:2.5},uGlowNear:{value:1},uGlowPower:{value:1.4},uGlowDim:{value:1},uHazeCentre:{value:new ee},uHazeRange:{value:new ee(70,200)},uHazeColour:{value:new J},uTime:{value:0},uLightPos:{value:Array.from({length:ke},()=>new $)},uLightCol:{value:Array.from({length:ke},()=>new $)},uLightCount:{value:0},uLightKnee:{value:new ee(.9,1.1)},uGlade:{value:Array.from({length:Ja},()=>new $)},uGladeCount:{value:0},uGladeRgb:{value:new J},uGladeLight:{value:new ee},uDim:{value:1},uSlow:{value:new $},uSlowKeep:{value:new $},uRealTime:{value:0},uMirrorMoon:{value:new J},uDisco:{value:new $},uDiscoParams:{value:new $},uContourDream:{value:new J(0,1.5,.12)},uDiscoColour:{value:new J(1,1,1)},uScenery:{value:new ee(1e6,1)},uCanopyReach:{value:0},uPartyOver:{value:new $(0,0,0,30)}},Vr=.95,Jr=.55,Yr=.16;function Dl(t,e,a,o=1,s=2.5,r=1){const n=(i,l)=>new J(i[0]/255*l,i[1]/255*l,i[2]/255*l);te.uAmb.value.copy(n(Qe(t.ambientHue,.55,1),t.ambient*o)),te.uMoon.value.copy(n(Qe(t.moonHue,t.moonSat??.35,1),t.moon*r)),te.uMoonBeam.value.copy(n(Qe(t.moonHue,.35,1),t.shafts*.25)),te.uShafts.value=t.shafts,te.uShaftScale.value=a*2,te.uGlowRgb.value.copy(n(Qe(t.glowHue,t.glowSat,1),1)),te.uGlowR.value=e,te.uGlowFalloff.value=s,te.uGlowPower.value=t.glowPower,te.uHazeColour.value.copy(n(Qe(t.ambientHue-.08,.55,1),.16*Math.sqrt(o)))}const fo=`
${kr}
uniform vec3 uAmb, uMoon, uMoonDir, uMoonBeam, uGlowPos, uGlowRgb;
uniform float uUnlitDim;
uniform vec4 uMoonUp;
uniform float uShafts, uShaftScale, uGlowR, uGlowFalloff, uGlowNear, uGlowPower, uGlowDim, uTime;
uniform vec2 uHazeCentre, uHazeRange;
uniform vec3 uHazeColour;
uniform vec4 uLightPos[${ke}], uLightCol[${ke}];
uniform vec4 uLightPattern[${ke}];
${$r}
uniform vec4 uGlade[${Ja}];
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
  for (int i = 0; i < ${Ja}; i++) {
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
  for (int i = 0; i < ${ke}; i++) {
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
  vec3 warm = max(min(dot(col, Y), ${Jr.toFixed(3)}), ${Yr.toFixed(3)} * fall) * uGlowRgb / max(1e-3, dot(uGlowRgb, Y));
  return mix(col, min(vec3(1.0), warm), ${Vr.toFixed(2)} * fall);
}
`,Zr=4,vt=9,ye={uHiz:{value:null},uHizOn:{value:0},uHizSize:{value:new ee(1,1)},uHizLevels:{value:0},uHizAt:{value:Array.from({length:vt},()=>new $)}},Xr=`
uniform sampler2D uHiz;
uniform float uHizOn, uHizLevels;
uniform vec2 uHizSize;
uniform vec4 uHizAt[${vt}];
bool hizHidden(vec2 lo, vec2 hi, float near) {
  if (uHizOn < 0.5) return false;
  lo = clamp(lo, vec2(0.0), uHizSize - 1.0); hi = clamp(hi, vec2(0.0), uHizSize - 1.0);
  float span = max(hi.x - lo.x, hi.y - lo.y) + 1.0;
  int L = int(ceil(log2(max(span, 1.0))));
  if (float(L) > uHizLevels - 1.0) return false;
  vec4 at = uHizAt[0];
  for (int i = 0; i < ${vt}; i++) if (i == L) at = uHizAt[i];
  float cell = exp2(float(L));
  vec2 a = min(floor(lo / cell), at.zw - 1.0), b = min(floor(hi / cell), at.zw - 1.0);
  vec2 ts = vec2(textureSize(uHiz, 0));
  float far = 0.0;
  for (int j = 0; j < 2; j++) for (int i = 0; i < 2; i++) {
    vec2 c = vec2(i == 0 ? a.x : b.x, j == 0 ? a.y : b.y);
    far = max(far, texelFetch(uHiz, ivec2(at.xy + c), 0).r);
  }
  return near > far;
}`,Qr="varying vec2 vUv; void main() { vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }",ei="uniform sampler2D uSrc; void main() { gl_FragColor = vec4(texelFetch(uSrc, ivec2(gl_FragCoord.xy), 0).r, 0.0, 0.0, 1.0); }",ti=`
uniform sampler2D uSrc; uniform vec2 uSrcSize;
void main() {
  ivec2 p = ivec2(gl_FragCoord.xy) * 2, m = ivec2(uSrcSize) - 1;
  float d = 0.0;
  for (int j = 0; j < 3; j++) for (int i = 0; i < 3; i++) {
    if ((i == 2 && p.x + 2 != m.x) || (j == 2 && p.y + 2 != m.y)) continue;
    d = max(d, texelFetch(uSrc, min(p + ivec2(i, j), m), 0).r);
  }
  gl_FragColor = vec4(d, 0.0, 0.0, 1.0);
}`,ai="uniform sampler2D uSrc; uniform vec2 uAt; void main() { gl_FragColor = texelFetch(uSrc, ivec2(gl_FragCoord.xy - uAt), 0); }";class Ol{depth=new ha(1,1,{depthBuffer:!0,stencilBuffer:!1});levels=[];atlas=new ha(1,1,{type:So,format:Ba,minFilter:pe,magFilter:pe,depthBuffer:!1});quad=new we(new ro(2,2));cam=new ls(-1,1,1,-1,0,1);copy;reduce;place;size={w:0,h:0};ok;constructor(e){this.depth.depthTexture=new xr(1,1,zr);const a=(o,s)=>new ue({vertexShader:Qr,fragmentShader:o,uniforms:s,depthTest:!1,depthWrite:!1});this.copy=a(ei,{uSrc:{value:null}}),this.reduce=a(ti,{uSrc:{value:null},uSrcSize:{value:new ee}}),this.place=a(ai,{uSrc:{value:null},uAt:{value:new ee}}),this.quad.frustumCulled=!1,this.ok=e.capabilities.isWebGL2&&!!e.extensions.get("EXT_color_buffer_float")}resize(e,a){if(e===this.size.w&&a===this.size.h)return;this.size={w:e,h:a},this.depth.setSize(e,a);for(const l of this.levels)l.dispose();this.levels=[];let o=e,s=a,r=0,n=0;const i=ye.uHizAt.value;for(;n<vt;n++){const l=new ha(o,s,{type:So,format:Ba,minFilter:pe,magFilter:pe,depthBuffer:!1});if(this.levels.push(l),i[n].set(n===0?0:e,n===0?0:r,o,s),n>0&&(r+=s),o<=2&&s<=2){n++;break}o=Math.max(1,Math.ceil(o/2)),s=Math.max(1,Math.ceil(s/2))}for(let l=n;l<vt;l++)i[l].set(0,0,0,0);ye.uHizLevels.value=n,this.atlas.setSize(e+Math.ceil(e/2),Math.max(a,r)),ye.uHizSize.value.set(e,a)}render(e,a,o,s,r,n){if(ye.uHizOn.value=0,!n||!this.ok||s<1||r<1)return;this.resize(s,r);const i=e,l=o.layers.mask,c=i.getRenderTarget(),d=i.autoClear,f=i.getClearColor(new io),g=i.getClearAlpha();o.layers.set(Zr),i.setRenderTarget(this.depth),i.setClearColor(0,0),i.autoClear=!0,i.render(a,o),o.layers.mask=l;const p=(h,u)=>{this.quad.material=h,i.setRenderTarget(u),i.render(this.quad,this.cam)};this.copy.uniforms.uSrc.value=this.depth.depthTexture,p(this.copy,this.levels[0]);for(let h=1;h<this.levels.length;h++){const u=this.levels[h-1];this.reduce.uniforms.uSrc.value=u.texture,this.reduce.uniforms.uSrcSize.value.set(u.width,u.height),p(this.reduce,this.levels[h])}i.setRenderTarget(this.atlas),i.setClearColor(0,0),i.clear(),i.autoClear=!1;const m=ye.uHizAt.value;this.levels.forEach((h,u)=>{const b=m[u];this.place.uniforms.uSrc.value=h.texture,this.place.uniforms.uAt.value.set(b.x,b.y),this.atlas.viewport.set(b.x,b.y,b.z,b.w),i.setRenderTarget(this.atlas),this.quad.material=this.place,i.render(this.quad,this.cam)}),this.atlas.viewport.set(0,0,this.atlas.width,this.atlas.height),i.autoClear=d,i.setClearColor(f,g),i.setRenderTarget(c),ye.uHiz.value=this.atlas.texture,ye.uHizOn.value=1}compile(e){return Promise.all([this.copy,this.reduce,this.place].map(a=>{const o=new we(this.quad.geometry,a);return o.frustumCulled=!1,e.compileAsync(o,this.cam)}))}dispose(){this.depth.dispose(),this.atlas.dispose();for(const e of this.levels)e.dispose();this.copy.dispose(),this.reduce.dispose(),this.place.dispose(),this.quad.geometry.dispose()}}const Gl=`
float hash(vec2 p) { p = fract(p * vec2(123.34, 456.21)); p += dot(p, p + 45.32); return fract(p.x * p.y); }
float vnoise(vec2 p) {
  vec2 i = floor(p), f = fract(p), u = f * f * (3.0 - 2.0 * f);
  float a = hash(i), b = hash(i + vec2(1, 0)), c = hash(i + vec2(0, 1)), d = hash(i + vec2(1, 1));
  return a + (b - a) * u.x + (c - a) * u.y + (a - b - c + d) * u.x * u.y;
}
`,Hl=`
float bayer2(vec2 a) { a = floor(a); return fract(a.x / 2.0 + a.y * a.y * 0.75); }
float bayer4(vec2 a) { return bayer2(0.5 * a) * 0.25 + bayer2(a); }
`,oi=`
float windGust(vec2 q) {
  vec2 i = floor(q), f = fract(q), e = f * f * (3.0 - 2.0 * f);
  float h00 = fract(sin(dot(i, vec2(127.1, 311.7))) * 43758.5453), h10 = fract(sin(dot(i + vec2(1, 0), vec2(127.1, 311.7))) * 43758.5453);
  float h01 = fract(sin(dot(i + vec2(0, 1), vec2(127.1, 311.7))) * 43758.5453), h11 = fract(sin(dot(i + vec2(1, 1), vec2(127.1, 311.7))) * 43758.5453);
  return mix(mix(h00, h10, e.x), mix(h01, h11, e.x), e.y);
}
`,po=`
vec2 pixelSnap(vec4 b) {
  vec2 ndc = b.xy / b.w, snapped = (floor((ndc * 0.5 + 0.5) * uRes) + 0.5) / uRes * 2.0 - 1.0;
  return snapped - ndc;
}
`,yt=256;function Ya(t){t.byteOffset%4&&(t=t.slice());const e=t.length>>2,a=new Uint32Array(t.buffer,t.byteOffset,e),o=new Uint8Array(e),s=new Map([[0,0]]),r=new Uint8Array(yt*4);let n=0,i=0;for(let l=0;l<e;l++){const c=a[l];if(c!==n){let d=s.get(c);if(d===void 0){if(d=s.size,d>=yt)return null;s.set(c,d),r.set(t.subarray(l*4,l*4+4),d*4)}n=c,i=d}o[l]=i}return{idx:o,pal:r}}const _l=(t,e,a,o)=>e?e[t[a]*4+o]:t[a*4+o],Eo=(t,e,a)=>a?t*e+yt*4:t*e*4;function Aa(t,e,a){return t.getContext("2d").getImageData(0,0,e,a).data}const si=(t,e=2048)=>Sr(ri(t,e));function*ri(t,e=2048){const o=[],s=new Map;let r=0,n=0,i=0,l=1;for(const[h,u]of t.entries()){const b=s.get(u);if(b!==void 0){o.push(o[b]);continue}s.set(u,h),r+u.w+1>e&&(r=0,n+=i+1,i=0),o.push({x:r,y:n}),r+=u.w+1,i=Math.max(i,u.h),l=Math.max(l,r)}const c=Math.max(1,n+i),d=new Uint8Array(l*c*4),f=new Uint8Array(l*c*4),g=[];for(let h=0;h<t.length;h++){h&&h%4===0&&(yield);const u=t[h],b=s.get(u);if(b!==h){g.push(g[b]);continue}const y=o[h],v=Aa(u.A,u.w,u.h),k=Aa(u.N,u.w,u.h),x=u.S?Aa(u.S,u.w,u.h):null,C=x?Array.from({length:u.h},(M,T)=>Array.from({length:u.w},(N,F)=>x[(T*u.w+F)*4+1])):null;for(let M=0;M<u.h;M++){const T=M*u.w*4,N=((y.y+M)*l+y.x)*4;if(d.set(v.subarray(T,T+u.w*4),N),u.eyes)for(let F=0;F<u.w;F++)u.eyes[M*u.w+F]&&d[N+F*4+3]===255&&(d[N+F*4+3]=253);if(f.set(k.subarray(T,T+u.w*4),N),u.S){const F=C[M];for(let E=0;E<u.w;E++)f[N+E*4+3]&&(f[N+E*4+3]=F[E])}}let w=0;e:for(let M=u.h-1;M>=0;M--,w++)for(let T=0;T<u.w;T++)if(v[(M*u.w+T)*4+3]>=128)break e;let P=0;if(w<u.h){const M=u.h-1-w;for(let T=0;T<u.w;T++)v[(M*u.w+T)*4+3]>=128&&(P=Math.max(P,Math.abs(T+.5-u.w/2)+.5))}g.push({uv:[y.x/l,y.y/c,(y.x+u.w)/l,(y.y+u.h)/c],w:u.w,h:u.h,pad:Math.min(w,u.h),...P?{foot:P}:{},...u.S?{masked:!0}:{},...u.head?{head:u.head}:{},...u.tall?{tall:u.tall}:{}})}yield;const p=Ya(d);yield;const m=Ya(f);return{albedo:p?.idx??d,normal:m?.idx??f,albedoPal:p?.pal??null,normalPal:m?.pal??null,width:l,height:c,frames:g}}function go(t,e,a,o){const{at:s=.5,r=.08,wide:n=.03,colour:i,up:l=[0,.8,-.6],sides:c=8,ry:d=r}=o,f=Math.hypot(a[0]-e[0],a[1]-e[1],a[2]-e[2])||1,g=m=>e.map((h,u)=>h+(a[u]-h)*m),p=n/f;return{bones:[],cones:[],lofts:[{sides:c,up:l,rings:[[-p,.82],[-p/2,1],[p/2,1],[p,.82]].map(([m,h])=>({at:g(s+m),rx:r*h,ry:d*h,bone:t,colour:i,up:l}))}]}}const ka=t=>[["hip","knee","hock"],["shoulder","elbow","wrist"]].flatMap((e,a)=>["L","R"].map((o,s)=>({bones:e.map(r=>r+o),phase:t[a][s]}))),Ro=()=>ka([[0,.5],[.75,.25]]),Do=()=>ka([[0,.5],[.5,0]]),Os=()=>ka([[0,.05],[.47,.53]]),ii=()=>ka([[0,.04],[.5,.56]]),Oo={amble:{type:"walk",seconds:1.1,duty:.8,reach:.5,step:.13,legs:Ro(),body:{bob:.035,pitch:.018,roll:.045,sway:.035,yaw:.06,head:.75,tail:1.2,lag:.09,wag:.12}},trot:{type:"trot",seconds:.6,duty:.4,reach:.95,step:.22,leap:.07,legs:Do(),body:{bob:.07,pitch:.03,roll:.02,sway:.01,yaw:.05,head:.8,tail:1.3,lag:.1,wag:.08}},patter:{type:"trot",seconds:.36,duty:.3,reach:1.1,step:.2,leap:.05,legs:Do(),body:{bob:.05,pitch:.025,roll:.03,sway:.02,yaw:.08,head:.8,tail:1,lag:.1,wag:.1}},scramble:{type:"walk",seconds:.5,duty:.52,reach:1.1,step:.2,legs:Ro(),body:{bob:.03,pitch:.02,roll:.06,sway:.04,yaw:.11,head:.8,tail:1,lag:.1,wag:.1}},hop:{type:"bound",seconds:.7,duty:.58,reach:.5,step:.16,legs:ii(),body:{bob:.03,pitch:.06,flex:.1,roll:0,sway:0,yaw:.015,head:.8,tail:1.2,lag:.08,wag:.03}},bound:{type:"bound",seconds:.5,duty:.22,reach:1,step:.24,leap:.4,legs:Os(),body:{bob:.05,pitch:.15,flex:.24,roll:0,sway:0,yaw:.012,head:.85,tail:1.4,lag:.07,wag:.02}}},ma=(t,e={})=>({...Oo[t],...e,body:{...Oo[t].body,...e.body}}),Ke=(t,e)=>(a={})=>{const{walk:o={},run:s={},...r}=a,n=ma(e,s);return{type:n.type,seconds:n.seconds,legs:n.legs,...r,paces:{walk:ma(t,o),run:n}}},X=Ke("amble","trot"),xe=Ke("hop","bound"),ie=Ke("hop","bound"),ze=Ke("amble","trot"),Se=Ke("amble","patter"),ni=Ke("amble","scramble");function D(t,e,a,o,s,r={}){return{name:t,bones:[...e.bones,...a.bones,...o.flatMap(n=>n.bones)],lofts:[{sides:8,up:[0,1,0],rings:[...e.rings,...a.rings]},...a.lofts??[],...o.flatMap(n=>n.lofts)],cones:[...a.cones,...o.flatMap(n=>n.cones),...r.cones??[]],armour:r.armour??[],gait:{root:"pelvis",hips:"pelvis",chest:"chest",neck:"neck",head:"head",ears:a.ears,...s},anchors:{neck:5,skull:e.rings.length}}}const He=(t,e,a=-.25)=>o=>o<a?e:t;function Ve(t,e){const{size:a=1,muzzle:o=1,ear:s={},cheek:r=1,eye:n=1,colours:i,white:l=.5,wide:c=1,dome:d=1,muzzleWide:f=1,muzzleDeep:g=1,nose:p=1,stripe:m,eyeAt:h=[0,0,0]}=e,u=a,b=o,y=(z,O,H)=>[z*u,t[1]+O*u,t[2]+H*u],v=l*.7-.85,k=i.muzzle??i.mask??i.coat,x=(z,O)=>m?(H,I)=>m(H,I)??He(z,i.belly,O)(H):He(z,i.belly,O),C=[{at:y(0,.03,.04),rx:.09*u*c,ry:.074*u*d,bone:"head",colour:x(i.coat,v)},{at:y(0,.025,.11),rx:.08*u*c,ry:.066*u*d,bone:"head",colour:x(i.mask??i.coat,v+.2)},{at:y(0,0,.16),rx:.044*u*f,ry:.044*u*g,bone:"head",colour:x(k,v+.4)},{at:y(0,-.013,.16+.065*b),rx:.03*u*f,ry:.03*u*g,bone:"head",colour:He(k,i.belly,v+.55)},{at:y(0,-.013,.16+.087*b),rx:.02*u*p,ry:.02*u*p,bone:"head",colour:i.nose},{at:y(0,-.013,.16+.101*b),rx:.009*u*p,ry:.009*u*p,bone:"head",colour:i.nose}],w=s.tall??1,P=s.wide??1,M=[],T=[],N=[["head",t,"neck"]],[F=0,E=0,S=0]=s.at??[],L=s.shape??"point";for(const z of[1,-1]){const O=z>0?"earL":"earR",H=.048*c+F,I=y(H*z,.07*d+E,.025+S),j=s.torn===z,Y=j?.6:1;if(N.push([O,I,"head"]),L==="point"){const A=(_,q)=>y((H+(.026+(s.splay??0)*.1)*w*q+_)*z,.07*d+E+.16*w*q,.025+S-.015*q);M.push({at:I,rx:.042*u*P,ry:.034*u*P,tip:A(0,Y),bone:O,colour:_=>_<0?s.back??i.coat:i.coat,tipColour:s.tip??s.back??i.coat,split:j?.75:.62,up:[0,0,1]}),j&&M.push({at:y(.03*z,.1,.02),rx:.016*u,ry:.014*u,tip:A(-.03,.72),bone:O,colour:s.back??i.coat,up:[0,0,1]})}else{const A=L==="long",_=(A?.16:.075)*w*Y,q=s.lean??(A?.25:0),V=s.splay??(A?.12:.35),me=A?[[0,.5],[.3,1],[.62,.92],[.86,.6],[1,.12]]:[[0,.8],[.45,1],[.8,.75],[1,.3]],le=[0,Math.sin(q),Math.cos(q)];T.push({sides:6,up:le,rings:me.map(([_e,wt],Ca)=>({at:y((H+V*_*_e)*z,.07*d+E+_*_e*Math.cos(q),.025+S-_*_e*Math.sin(q)),rx:.04*u*P*wt,ry:(A?.012:.016)*u*P*(.6+.4*wt),bone:O,up:le,colour:_e>(A?.78:2)?s.tip??s.back??i.coat:Fa=>Fa>0?s.inner??i.coat:s.back??i.coat}))}),j&&M.push({at:y((H+V*_)*z,.07*d+E+_*.9,.025+S-_*Math.sin(q)),rx:.012*u,ry:.008*u,tip:y((H+V*_*1.3+.02)*z,.07*d+E+_*1.25,.025+S-_*Math.sin(q)*1.2),bone:O,colour:s.back??i.coat,up:le})}r&&M.push({at:y(.06*c*z,-.005,.065),rx:.04*u,ry:.03*u,tip:y((.06*c+.075*r)*z,-.005-.035*r,.065-.065*r),bone:"head",colour:i.cheek??i.belly,split:.5,up:[0,1,0]});const R=i.eyes?.[z>0?0:1],G=.058*c+h[0];M.push({at:y(G*z,.055*d+h[1],.117+h[2]),rx:.019*u*n,ry:.016*u*n,tip:y((G+.016*n)*z,.063*d+h[1],.125+h[2]),bone:"head",colour:R?.colour??i.eye??i.nose,glow:!!R?.glow,tag:"eye",split:.5,up:[0,1,0],sides:4})}return{bones:N,rings:C,cones:M,lofts:T,P:y,ears:["earL","earR"]}}function Go(t,e,a,o,s){const{len:r=1,thick:n=1,parent:i,colours:l,band:c,knob:d=1,claws:f,foot:g=1,paw:p=1}=s,m=r,h=n*r,u=(w,P,M)=>[o[0]+w*m*a,o[1]+P*m,o[2]+M*m],b=t==="hind",y=b?["hip","knee","hock","hpaw"]:["shoulder","elbow","wrist","fpaw"],v=y.map(w=>w+e),k=b?[[0,0,0],[.01,-.145,.065],[.01,-.245,-.065],[.01,-.348,-.035]]:[[0,0,0],[.005,-.125,-.035],[.005,-.255,-.02],[.005,-.318,-.015]],x=b?[[-.005,.02,-.005,.056,.111,0,"upper"],[.005,-.07,.035,.059,.098,0,"upper"],[.01,-.145,.065,.039,.052,0,"mid"],[.01,-.245,-.065,.024,.029,1,"sock"],[.01,-.34,-.038,.022,.023,2,"sock"],[.01,-.358,-.012,.031,.016,3,"sock",1],[.01,-.36,.035,.028,.013,3,"sock",1]]:[[-.002,.03,.01,.049,.085,0,"upper"],[.003,-.05,-.015,.05,.075,0,"upper"],[.005,-.125,-.035,.034,.042,0,"mid"],[.005,-.255,-.02,.022,.025,1,"sock"],[.005,-.312,-.017,.022,.022,2,"sock"],[.005,-.328,.01,.031,.016,3,"sock",1],[.005,-.33,.05,.028,.013,3,"sock",1]],C={bones:k.map((w,P)=>[v[P],u(...w),P?v[P-1]:i]),lofts:[{sides:5,up:[0,0,1],rings:x.map(([w,P,M,T,N,F,E,S],L)=>({at:u(w,P,L===6?x[5][2]+(M-x[5][2])*g:M),rx:T*h*(L===2||L===3?d:1)*(S?p:1),ry:N*h*(L===2||L===3?d:1),bone:v[F],colour:l[E],...S?{up:[0,1,0]}:{}}))}],cones:[],names:v};if(f){const w=[x[6][0],x[6][1],x[5][2]+(x[6][2]-x[5][2])*g],P=(f.wide??1)*p;for(const M of[-.02,0,.02])C.cones.push({at:u(w[0]+M*P,w[1]+.004,w[2]-.005),rx:.008*h*(f.thick??1),ry:.008*h*(f.thick??1),tip:u(w[0]+M*1.3*P,w[1]-.008,w[2]+.03*(f.len??1)),bone:v[3],colour:f.colour,up:[0,1,0],sides:3})}if(c){const w=u(...k[2]),P=u(...k[3]),M=F=>w.map((E,S)=>E+(P[S]-E)*F),T=(c.r??.034)*h,N=.035;C.lofts.push({sides:6,up:[0,0,1],rings:[[-N,.6],[-N/2,1],[N/2,1],[N,.6]].map(([F,E])=>({at:M(c.at+F),rx:T*E,ry:T*E,bone:v[2],colour:c.colour}))})}return C}function mo(t,e,a=e){const o=[];for(const[s,r]of[[1,"L"],[-1,"R"]]){const n=t.hip(s),i=t.shoulder(s);o.push(Go("hind",r,s,[n[0]*(e.spread??1),.37*e.len,n[2]],{...e,parent:"pelvis"}),Go("fore",r,s,[i[0]*(a.spread??1),.34*a.len,i[2]],{...a,parent:"chest"}))}return o}const Gs=(t,e=t)=>({back:.37*t+.01,drop:.37*t-.03-.34*e});function Je(t){const{back:e=.38,len:a=1,girth:o=1,deep:s=1,tuck:r=1,neck:n=[.17,.15],neckThick:i=1,white:l=.5,hump:c=0,arch:d=0,drop:f=0,rump:g=1,colours:p}=t,m=o,h=p,u=w=>h.back?P=>P>.75?h.back:P<w?h.belly:h.coat:He(h.coat,h.belly,w),b=w=>w*a,y=l*.9-1.05,v=w=>Math.min(1.1,Math.max(-.2,(w+.275)/.46)),k=w=>d*.07*Math.sin(Math.PI*Math.min(1,Math.max(0,v(w))))-f*v(w),x=[0,e-.005+k(.185),b(.185)];return{pivot:[0,x[1]+n[0],x[2]+n[1]],bones:[["root",[0,0,0],null],["pelvis",[0,e+.01+k(-.26),b(-.26)],"root"],["loin",[0,e+.02+k(-.1),b(-.1)],"pelvis"],["chest",[0,e+.005+k(.08),b(.08)],"loin"],["neck",[0,x[1]+n[0]*.35,x[2]+n[1]*.45],"chest"]],rings:[{at:[0,e+.005+k(-.365)-(g-1)*.02,b(-.365)],rx:.03*m*g,ry:.035*m*g,bone:"pelvis",colour:h.coat},{at:[0,e-.005+k(-.275),b(-.275)],rx:.088*m*g,ry:.1*m*g,bone:"pelvis",colour:u(y-.55)},{at:[0,e+.01+(1-r)*.03+k(-.12),b(-.12)],rx:.082*m*(.6+.4*r),ry:.088*m*r,bone:"loin",colour:u(y-.3)},{at:[0,e-.01-(s-1)*.04+c*.025+k(.05),b(.05)],rx:.096*m,ry:(.122*s+c*.03)*m,bone:"chest",colour:u(y-.1)},{at:[0,x[1]-(s-1)*.04+c*.05,x[2]],rx:.094*m,ry:(.125*s+c*.055)*m,bone:"chest",colour:u(y+.15)},{at:[0,x[1]+n[0]*.35,x[2]+n[1]*.5],rx:.068*m*i,ry:.09*m*i,bone:"neck",colour:He(h.coat,h.belly,y+.3),up:[0,.8,-.6]},{at:[0,x[1]+n[0]*.82,x[2]+n[1]*.92],rx:.06*m*i,ry:.07*m*i,bone:"neck",colour:He(h.coat,h.belly,y+.3),up:[0,.75,-.65]}],hip:w=>[.065*m*g*w,e-.01,b(-.25)],shoulder:w=>[.06*m*w,e-.04-f,b(.175)]}}const Z=["pelvis","pelvis","loin","chest","chest","neck","neck"];function ae(t){const e={colours:t.C,...t.hind},a={colours:t.C,...t.fore??t.hind},o=Je({...Gs(e.len,a.len),...t.body,colours:t.C}),s=Ve(o.pivot,{...t.head,colours:t.C});return{body:o,skull:s,legs:mo(o,e,a),root:[0,o.rings[1].at[1]+.01,o.rings[0].at[2]+.03],R:o.rings,P:s.P}}function U(t,e,a,o){const{len:s=.5,r=.094,yaw:n=0,pitch:i=-.33,curl:l=0,twist:c=0,wave:d=0,waves:f=1,phase:g=0,colours:p,tip:m=.2,sides:h=7,blunt:u=.05,bones:b=4,fire:y,ring:v,spikes:k,plume:x=!1}=o,C=24,w=[[...a]],P=[];for(let R=0;R<C;R++){const G=(R+.5)/C,A=i+l*G+d*Math.sin(Math.PI*2*f*G+g),_=n+c*G,q=[Math.sin(_)*Math.cos(A),Math.sin(A),-Math.cos(_)*Math.cos(A)];P.push(q),w.push(w[R].map((V,me)=>V+q[me]*s/C))}const M=R=>{const G=Math.min(C-1e-6,Math.max(0,R*C)),A=Math.floor(G),_=G-A;return w[A].map((q,V)=>q+(w[A+1][V]-q)*_)},T=R=>P[Math.min(C-1,Math.max(0,Math.floor(R*C)))],N=R=>{const G=T(R),A=Math.abs(G[1])>.9?[0,0,1]:[0,1,0],_=A[0]*G[0]+A[1]*G[1]+A[2]*G[2],q=A.map((me,le)=>me-G[le]*_),V=Math.hypot(...q)||1;return q.map(me=>me/V)},F=Array.from({length:b},(R,G)=>.04+G/b*.95),E=F.map((R,G)=>[`${t}${G+1}`,M(R),G?`${t}${G}`:e]),S=R=>{let G=e;for(let A=0;A<b;A++)R>=F[A]+.5*(.95/b)&&(G=`${t}${A+1}`);return G},L=`${t}${b}`,z=x?[[0,.3],[.12,.34],[.28,.48],[.44,.72],[.58,.94],[.7,1],[.8,.86],[.9,.52],[1,.04]]:[[0,.28],[.1,.5],[.22,.8],[.38,.96],[.54,1],[.7,.9+u*.2],[.82,.74+u*.4],[.92,.5+u*.6],[1,u]],O={bones:E,cones:[],chain:E.map(R=>R[0]),lofts:[{sides:h,up:[0,1,0],rings:z.map(([R,G])=>({at:M(R),rx:r*G,ry:r*G*1.03,bone:S(R),up:N(R),colour:R>=1-m?p.tip:R>.45?He(p.coat,p.under??p.coat,-.3):p.coat}))}]},H=(R,G)=>{const A=M(R),_=N(R);return A.map((q,V)=>q+_[V]*G)},I=M(1),j=T(1);if(y){const R=y.size??1,G=I.map((A,_)=>A+j[_]*.03*R);O.cones.push({at:G,rx:.045*R,ry:.045*R,tip:G.map((A,_)=>A+j[_]*.06*R+(_===1?.14*R:0)),bone:L,colour:y.colour,tipColour:y.tip??y.colour,glow:!0,split:.55,up:N(1),sides:5},{at:G,rx:.045*R,ry:.045*R,tip:G.map((A,_)=>A-j[_]*.05*R-(_===1?.03*R:0)),bone:L,colour:y.colour,glow:!0,up:N(1),sides:5})}const Y=R=>{let G=0;for(;G+2<z.length&&z[G+1][0]<R;)G++;const[A,_]=z[G],[q,V]=z[G+1];return _+(V-_)*Math.min(1,Math.max(0,(R-A)/(q-A)))};if(v&&O.lofts.push({sides:h,up:[0,1,0],rings:[[-.018,.95],[-.008,1.14],[.008,1.14],[.018,.95]].map(([R,G])=>{const A=v.at+R,_=Y(A);return{at:M(A),rx:r*_*G,ry:r*_*G,bone:S(A),up:N(A),colour:v.colour}})}),k)for(let R=0;R<k.n;R++){const G=.2+R/k.n*.62,A=.85+.15*Math.sin(R*2.3),_=T(G).map(q=>-q*.03);O.cones.push({at:H(G,r*.75),rx:.03,ry:.022,tip:H(G-.05,r*.9+.07*(k.len??1)*A).map((q,V)=>q+_[V]),bone:S(G),colour:p.coat,tipColour:k.colour??p.coat,split:.5,up:T(G),sides:4,glow:k.glow})}return O}function W(t,e,a){const o=[],{n:s=6,a0:r=.2,a1:n=2.6,long:i=.2,sweep:l=.6,r:c=.045,colour:d,tip:f,grow:g=0,droop:p=.15,sides:m=4,glow:h=!1,flat:u=.8,jitter:b=.3,lock:y=!1}=a;for(const v of[1,-1])for(let k=0;k<s;k++){const x=r+(n-r)*(s===1?0:k/(s-1)),C=Math.sin(x)*v,w=Math.cos(x),P=i*(1+g*(k/Math.max(1,s-1)))*(1-b/2+b*((k*7+(v>0?0:3))%5)/4),M=[t.at[0]+C*t.rx*.8,t.at[1]+w*t.ry*.8,t.at[2]];o.push({at:M,rx:c,ry:c*u,tip:[M[0]+C*P*(1-l)*.8,M[1]+w*P*(1-l)*.8-P*p,M[2]-P*l],bone:e,colour:d(k,v),tipColour:f?.(k,v)??d(k,v),split:y?.45:.5,up:[0,0,1],sides:y?5:m,glow:typeof h=="function"?h(k,v):h,...y?{bulge:.9,bend:[C*P*.12,w*P*.12+P*.06,0]}:{}})}return o}const dt="#1b1817",li="#b9722e",Pe="#f2efe7",kt={coat:"#8d8d88",belly:dt,mask:Pe,muzzle:Pe,nose:"#141110",upper:"#2a2625",mid:dt,sock:dt,eye:"#0d0b0b",cheek:Pe},ci=(t=1)=>(e,a)=>{const o=Math.abs(a);return e>-.55&&o>.3/t&&o<.3/t+.5*t?dt:e>-.2?Pe:void 0},xt=(t,e)=>ae({C:t,hind:{len:.44,thick:1.9,...e.hind},fore:{len:.44,thick:2,...e.fore},body:{len:.95,girth:1.3,deep:.95,tuck:1.05,neck:[.03,.15],neckThick:1.35,white:.5,...e.body},head:{size:1.08,muzzle:.85,muzzleWide:1.2,wide:1.02,dome:.92,cheek:0,eye:.9,stripe:ci(e.bands??1),...e.head,ear:{shape:"round",tall:.55,wide:1,at:[.016,-.014,-.012],back:dt,inner:Pe,tip:Pe,...e.ear}}}),ui={baby(){const t={...kt,coat:"#a3a39d"},e=xt(t,{hind:{len:.3,thick:2},fore:{len:.3,thick:2},body:{len:.58,girth:1.3,neck:[.02,.09]},head:{size:1.5,muzzle:.6,eye:1.3},bands:.75}),a=U("tail","pelvis",e.root,{len:.1,r:.034,pitch:-.3,blunt:.08,tip:0,colours:{coat:t.coat,tip:t.coat}});return D("badger-baby",e.body,e.skull,[...e.legs,a],ze({lively:1.3,tails:[a.chain]}))},young(){const t=xt(kt,{body:{len:.9,girth:1.1,tuck:.95},head:{size:1.02}}),e=U("tail","pelvis",t.root,{len:.17,r:.04,pitch:-.35,blunt:.08,tip:0,colours:{coat:"#a3a39d",tip:"#a3a39d"}});return D("badger-young",t.body,t.skull,[...t.legs,e],ze({lively:1.1,tails:[e.chain]}))},adult(){const t=xt(kt,{fore:{len:.46,thick:2.4,paw:1.5,claws:{colour:"#e9e2cf",len:2.2,thick:1.8,wide:1.2}},hind:{len:.46,thick:2,claws:{colour:"#e9e2cf",len:1.2,thick:1.4}},body:{len:1,girth:1.5,deep:.92,hump:.5},head:{size:1.12},bands:1.25}),e=t.R,a=U("tail","pelvis",t.root,{len:.24,r:.055,pitch:-.25,blunt:.08,tip:.3,colours:{coat:"#a3a39d",tip:Pe},spikes:{n:3,colour:Pe,len:.6}}),o=[1,2,3,4].flatMap(s=>W(e[s],Z[s],{n:4,a0:.15,a1:1.7,long:.15,sweep:.97,droop:.12,r:.11,flat:.28,jitter:.15,sides:5,lock:!0,colour:r=>r%2?"#6c6c68":"#85857f",tip:()=>"#c9c6bb"}));return D("badger-adult",t.body,t.skull,[...t.legs,a],ze({tails:[a.chain]}),{cones:o})},legend(){const t="#f7f6ee",e="#8b8f8c",a="#bfe8d0",o="#10b98a",s={...kt,coat:"#6f6f73",muzzle:"#dcd8cc",eyes:[{colour:a,glow:!0},{colour:"#e6ecec"}]},r=xt(s,{fore:{len:.5,thick:2.6,paw:1.6,knob:1.2,claws:{colour:"#b9bcb8",len:3.2,thick:2,wide:1.25}},hind:{len:.5,thick:2.2,knob:1.2,claws:{colour:"#b9bcb8",len:1.6,thick:1.5}},body:{len:1.1,girth:1.75,deep:.9,hump:.9,neck:[.02,.17],neckThick:1.5},head:{size:1.2,muzzle:.9,eye:1.2},ear:{torn:1},bands:1.3}),n=r.R,i=r.P,l=U("tail","pelvis",r.root,{len:.28,r:.06,pitch:-.25,blunt:.08,tip:.3,colours:{coat:"#9a9a96",tip:t},spikes:{n:3,colour:t,len:.7}}),c=h=>[0,n[h].at[1]+n[h].ry*.9,n[h].at[2]],d=[[1,.13],[2,.17],[3,.24],[4,.2]].flatMap(([h,u])=>[{at:c(h),rx:.085,ry:.04,tip:[.01,c(h)[1]+u*1.25,c(h)[2]-.02],bone:Z[h],colour:e,tipColour:"#a4a8a5",split:.93,up:[0,0,1],sides:5},{at:[0,c(h)[1]+u*.55,c(h)[2]+.04],rx:.03,ry:.03,tip:[0,c(h)[1]+u*.6,c(h)[2]+.065],bone:Z[h],colour:a,glow:!0,up:[0,1,0],sides:4}]),f=[1,2,3,4].flatMap(h=>W(n[h],Z[h],{n:3,a0:1.5,a1:2.2,long:.12,sweep:.7,droop:.6,r:.07,flat:.45,colour:u=>u%2?"#505053":"#7a7a7d",tip:()=>"#a9a69b"})),g=go("neck",n[5].at,n[6].at,{at:.2,r:n[5].rx*1.04,ry:n[5].ry*1.04,wide:.022,colour:li}),p=[{from:.7,to:4.85,round:[.5,1],inset:.14,lames:6,thick:.016,step:.006,colour:t,rim:"#c9c6b8",runes:{colour:o,size:.55,max:1}}],m=[{at:i(.03,.06,.15),rx:.006,ry:.004,tip:i(.05,-.02,.2),bone:"head",colour:"#c98a80",up:[0,0,1],sides:3}];return D("badger-legend",r.body,r.skull,[...r.legs,l,g],ze({lively:.75,tails:[l.chain]}),{cones:[...f,...d,...m],armour:p})}},hi={id:"badger",heights:[54,82,113,256],curl:{side:-1},plans:ui};function ft(t,e,a){const{r:o=.04,colour:s,glow:r=!1,sides:n=7,squash:i=1}=a;return{bones:[],cones:[],lofts:[{sides:n,up:[0,0,1],rings:[[-1,.12],[-.62,.78],[0,1],[.62,.78],[1,.12]].map(([l,c])=>({at:[e[0],e[1]+l*o*i,e[2]],rx:o*c,ry:o*c,bone:t,colour:s,glow:r,up:[0,0,1]}))}]}}const di="#1d1612",fi="#f2b21f",pi="#e0a019",gi="#e3f4ff";function zt(t,e){const{fly:a=.3,k:o=1,C:s={},wing:r=1,abdomen:n={},eye:i=1,sting:l=1,fuzz:c,antennae:d=1,gait:f={}}=e,g=s.fuzz??pi,p=s.dark??di,m=s.band??fi,h=(S,L,z)=>[S*o,a+L*o,z*o],u=Math.PI*2,b=[["root",[0,0,0],null],["thorax",h(0,.06,.02),"root"],["head",h(0,.05,.11),"thorax"],["abd1",h(0,.04,-.06),"thorax"],["abd2",h(0,0,-.06-.16*(n.len??1)),"abd1"]],y=[],v=[];y.push(...ft("thorax",h(0,.06,.02),{r:.092*o*(e.chest??1),colour:g,sides:8}).lofts,...ft("head",h(0,.05,.135),{r:.066*o,colour:p,sides:7}).lofts);for(const S of[1,-1])y.push(...ft("head",h(.046*S,.062,.16),{r:.036*o*i,colour:s.eye??"#0c0a09",glow:!!s.eyeGlow,sides:6}).lofts),b.push([`ant${S>0?"L":"R"}`,h(.02*S,.11,.16),"head"]),v.push({at:h(.02*S,.105,.16),rx:.008*o,ry:.008*o,tip:h(.07*S*d,.105+.12*d,.16+.1*d),bend:[0,.04*o*d,0],bulge:.9,bone:`ant${S>0?"L":"R"}`,colour:p,up:[0,0,1],sides:3});const k=n.len??1,x=n.fat??1,C=n.rings??6,w=S=>{const L=S/(C-1);return Math.sin(Math.PI*Math.pow(L,.75))*.9+.1*(1-L)},P=(S,L=0)=>{const z=Math.min(1,Math.max(0,S/(C-1)+L));return{at:h(0,.045-.11*z*k,-.07-.36*z*k),rx:.105*o*x*w(z*(C-1))+.012*o,ry:.1*o*x*w(z*(C-1))+.012*o,bone:z<.45?"abd1":"abd2",colour:(n.colour??(O=>O%2?p:m))(S)}},M=Array.from({length:C},(S,L)=>P(L)),T=.42/(C-1);y.push({name:"abdomen",sides:8,up:[0,1,.3],rings:M.flatMap((S,L)=>L===0?[S,P(L,T)]:L===C-1?[P(L,-T),S]:[P(L,-T),P(L,T)])});const N=M[C-1].at;v.push({at:N,rx:.014*o,ry:.014*o,tip:[N[0],N[1]-.03*o*l,N[2]-.09*o*l],bone:"abd2",colour:s.sting??p,up:[0,1,0],sides:4});for(const[S,L]of[[1,"L"],[-1,"R"]])for(const[z,O,H,I]of[["f",.3,.075,.25],["h",.2,.06,.75]]){const j=`wing${z}${L}`,Y=h(.035*S,.13,.02-(z==="h"?.035:0));b.push([j,Y,"thorax"]);const R=[S*Math.cos(I)*.92,.38,-Math.sin(I)],G=A=>Y.map((_,q)=>_+R[q]*O*r*o*A);if(e.ornate){const A=[0,-.12,-1],_=[R[1]*A[2]-R[2]*A[1],R[2]*A[0]-R[0]*A[2],R[0]*A[1]-R[1]*A[0]],q=Math.hypot(..._)*(_[1]<0?-1:1),V=_.map(le=>le/q);(z==="f"?[[-.3,.85,1],[.05,1.15,1.15],[.4,.95,1.05],[.75,.7,.9]]:[[.35,.8,.9],[.7,1.2,.8],[1.05,1.75,.6],[1.35,1.25,.55]]).forEach(([le,_e,wt],Ca)=>{const Fa=R.map((Le,Ze)=>Le*Math.cos(le)+A[Ze]*Math.sin(le)),ko=O*r*o*_e,Pa=H*r*o*wt*.62,nr=z==="h"?.5:.22,lr=Le=>Y.map((Ze,Xe)=>Ze+Fa[Xe]*ko*Le+A[Xe]*nr*ko*Le*Le+V[Xe]*(Ca%2?.006:0)*o),La=(Le,Ze,Xe,cr,ur)=>({sides:4,up:V,rings:Le.map(([hr,dr])=>({at:lr(hr).map((fr,pr)=>fr+V[pr]*cr),rx:Math.max(8e-4,Ze*dr),ry:.004*o,bone:j,colour:Xe,glow:ur,up:V}))});y.push(La([[0,.3],[.22,1],[.5,.85],[.75,.42],[.9,.16],[1,.01]],Pa,e.ornate.frame,0,!1));const xo=e.ornate.cells[Ca%e.ornate.cells.length],zo=[[.14,.2],[.26,1],[.48,.8],[.66,.2]];y.push(La(zo,Pa*.6,xo,.005*o,!0),La(zo,Pa*.6,xo,-.005*o,!0))});continue}y.push({sides:4,up:[0,1,0],rings:[[0,.35],[.3,1],[.65,1.05],[.9,.7],[1,.15]].map(([A,_])=>({at:G(A),rx:H*r*o*_,ry:.004*o,bone:j,colour:s.wing??gi,up:[0,1,0]}))}),s.vein&&y.push({sides:3,up:[0,1,0],rings:[.05,.4,.75,.97].map(A=>({at:G(A).map((_,q)=>_+(q===1?.006*o:0)),rx:.006*o,ry:.006*o,bone:j,colour:s.vein,glow:!0,up:[0,1,0]}))})}[[.08,.14,.9],[.02,.17,1],[-.04,.2,1.15]].forEach(([S,L,z],O)=>{for(const[H,I]of[[1,"L"],[-1,"R"]]){const j=`leg${O}${I}`,Y=h(.05*H,0,S);b.push([j,Y,"thorax"]);const R=[Y[0]+.06*o*H,Y[1]-L*.45*o,Y[2]-.01*o],G=[Y[0]+.04*o*H,Y[1]-L*z*o,Y[2]-.05*o];y.push({sides:4,up:[0,0,1],rings:[{at:Y,rx:.014*o,ry:.014*o,bone:j,colour:p},{at:R,rx:.011*o,ry:.011*o,bone:j,colour:p},{at:G,rx:.006*o,ry:.006*o,bone:j,colour:p}]}),e.pollen&&O===2&&y.push({sides:5,up:[0,0,1],rings:[[.1,.5],[.4,1],[.75,.9],[.95,.4]].map(([A,_])=>({at:R.map((q,V)=>q+(G[V]-q)*A),rx:.024*o*e.pollen*_,ry:.02*o*e.pollen*_,bone:j,colour:"#ffd84a"}))})}}),c&&v.push(...W({at:h(0,.06,.02),rx:.085*o,ry:.085*o},"thorax",{n:c.n??4,a0:.2,a1:2.6,long:(c.long??.05)*o,sweep:.5,droop:0,r:.03*o,lock:!0,colour:()=>g,tip:()=>c.tip??"#fff0b8"}),...W({at:h(0,.06,.07),rx:.07*o,ry:.07*o},"thorax",{n:c.n??4,a0:.3,a1:2.8,long:(c.long??.05)*o*.8,sweep:.2,droop:0,r:.028*o,lock:!0,colour:()=>c.collar??g,tip:()=>c.tip??"#fff0b8"}));const F=f.beats??3,E=(S,L)=>z=>[0,0,S*(.15+.75*Math.sin(u*F*z+L))];return{name:t,bones:b,lofts:[...y,...e.lofts??[]],cones:[...v,...e.cones??[]],armour:e.armour??[],hover:a*o,gait:{type:"fly",seconds:.8,root:"thorax",bob:.02*o,bobs:1,legs:[],...f,extra:[{bone:"wingfL",rot:E(1,0)},{bone:"wingfR",rot:E(-1,0)},{bone:"winghL",rot:E(1,-.5)},{bone:"winghR",rot:E(-1,-.5)},{bone:"abd1",rot:S=>[.08*Math.sin(u*S),0,0]},{bone:"abd2",rot:S=>[.1*Math.sin(u*S-.8),0,0]},{bone:"head",rot:S=>[.05*Math.sin(u*S+1),.06*Math.sin(u*S),0]},...[0,1,2].flatMap(S=>["L","R"].map((L,z)=>({bone:`leg${S}${L}`,rot:O=>[.12*Math.sin(u*O+S+z),0,.06*Math.sin(u*O*2+S)]}))),{bone:"antL",rot:S=>[.1*Math.sin(u*2*S),0,0]},{bone:"antR",rot:S=>[.1*Math.sin(u*2*S+1),0,0]},...f.more??[]]},P:h,R:M}}const St=t=>{const{P:e,R:a,...o}=t;return o},mi={baby:()=>St(zt("bee-baby",{fly:.24,chest:1.25,C:{fuzz:"#f6d76a",band:"#f6d76a",dark:"#4a3a22"},wing:.5,eye:1.3,sting:0,antennae:.6,abdomen:{len:.45,fat:.85,rings:5,colour:t=>t%2?"#6a5230":"#f6d76a"},fuzz:{n:4,long:.06,tip:"#fffbe0"},gait:{seconds:.6,beats:5,bob:.012}})),young:()=>St(zt("bee-young",{fly:.26,chest:.9,wing:.95,abdomen:{len:.9,fat:.8},antennae:.9})),adult:()=>St(zt("bee-adult",{fly:.3,chest:1.2,wing:1.2,eye:1.1,sting:1.5,antennae:1.2,pollen:1.3,abdomen:{len:1.05,fat:1.2,rings:7},fuzz:{n:5,long:.07,tip:"#fff0b8",collar:"#fff0b8"}})),legend(){const t="#e9b949",e="#ffc83a",a="#fff2b0",o="#4b2a6e",s={fuzz:"#c98a14",band:t,dark:"#241a12",eye:"#6a1626",vein:a,sting:t,wing:"#cfe9ff"},r=[1,3,5,7].map(c=>({on:"abdomen",from:2*c-.25,to:2*c+1.25,round:[0,1.7],thick:.016,colour:o,rim:t,runes:{colour:e,size:.7,max:1,seed:c}})),n=zt("bee-legend",{fly:.36,chest:1.15,C:s,wing:1.75,eye:1.05,sting:2.6,antennae:1.8,abdomen:{len:1.9,fat:1.05,rings:10,colour:c=>c%2?"#241a12":t},fuzz:{n:6,long:.1,tip:"#ffffff",collar:"#ffffff"},armour:r,ornate:{frame:"#2b1840",cells:[a,e,"#cfe9ff"]},gait:{seconds:1.2,beats:5}}),{P:i}=n,l=[-2,-1,0,1,2].map(c=>({at:i(.03*c,.105,.125),rx:.022,ry:.02,tip:i(.04*c,.105+.15-.02*Math.abs(c),.115),bone:"head",colour:t,tipColour:c?t:e,glow:!c,split:.8,bulge:.9,up:[0,0,1],sides:6}));return{...St(n),cones:[...n.cones,...l]}}},bi={id:"bee",heights:[45,69,97,280],plans:mi};function Ye(t,e={}){const{colour:a="#2a2019",size:o=1,long:s=1,cloven:r=!0}=e;return t.map(n=>{const i=n.lofts[0].rings,l=i[4],c=i[5].bone,d=Math.min(i[5].at[1]-i[5].ry,i[6].at[1]-i[6].ry),f=Math.max(l.rx,l.ry)*1.3*o,g=l.at[1]-d,[p,,m]=l.at,h=l.at[1]-g*.3,u=m+f*.25,b=m+f*.85*s,y={...n.lofts[0],rings:[...i.slice(0,5),{at:[p,h,u],rx:f*.95,ry:f*.95,bone:c,colour:a},{at:[p,h-g*.12,u],rx:f*.5,ry:f*.5,bone:c,colour:a}]},v=(r?[1,-1]:[0]).map(k=>({sides:5,up:[0,0,1],rings:[{at:[p+k*f*.42,h+g*.05,u],rx:f*(r?.52:.9),ry:f*.85,bone:c,colour:a,plain:!0},{at:[p+k*f*.5,d+g*.4,b],rx:f*(r?.6:1),ry:f*1.05*s,bone:c,colour:a,plain:!0},{at:[p+k*f*.54,d,b],rx:f*(r?.58:1),ry:f*1.1*s,bone:c,colour:a,plain:!0}]}));return{...n,lofts:[y,...v,...n.lofts.slice(1)],cones:[]}})}const Mt=(t,e,a)=>typeof t=="function"?t(e,a):t;function bo(t,e,a,o,s=0){const r=[[...t]],n=l=>1-s*(l+.5)/a,i=Array.from({length:a},(l,c)=>n(c)).reduce((l,c)=>l+c,0);for(let l=0;l<a;l++){const c=o((l+.5)/a),d=Math.hypot(...c)||1,f=e*n(l)/i;r.push(r[l].map((g,p)=>g+c[p]/d*f))}return r}const Ho=(t,e)=>{const a=Math.min(t.length-1-1e-6,Math.max(0,e*(t.length-1))),o=Math.floor(a),s=a-o;return t[o].map((r,n)=>r+(t[o+1][n]-r)*s)},vi=t=>{const e=t.map(Math.abs);return e[0]<=e[1]&&e[0]<=e[2]?[1,0,0]:e[2]<=e[1]?[0,0,1]:[0,1,0]};function xa(t,e,a){const{r:o=.02,colour:s,sides:r=5,up:n=[0,0,1],flat:i=1,glow:l=!1}=a,c=Math.max(1,e.length-1);return{sides:r,up:n,rings:e.map((d,f)=>{const g=f/c,p=Mt(o,g,f);return{at:d,rx:p,ry:p*Mt(i,g,f),bone:t,colour:Mt(s,g,f),glow:!!Mt(l,g,f),plain:!0,up:n}})}}function Ct(t,e={}){const{len:a=.09,r:o=.013,curl:s=1.3,out:r=.7,colour:n="#efe6cf",tip:i="#fffaf0",at:l=[.03,-.028,.2],bone:c="head",fire:d,sides:f=5}=e,g=t(1,0,0)[0],p=[],m=[];for(const h of[1,-1]){const u=bo(t(l[0]*h,l[1],l[2]),a*g,6,b=>{const y=.15+s*b;return[h*r*(1-.6*b),Math.sin(y),.6*Math.cos(y)]});if(p.push(xa(c,u,{r:b=>o*g*(1-.9*b*b),colour:b=>b>.7?i:n,sides:f})),d){const b=u[u.length-1],y=d.size??1;m.push({at:b,rx:.02*g*y,ry:.02*g*y,tip:[b[0]+h*.01*g,b[1]+.11*g*y,b[2]-.03*g*y],bone:c,colour:d.colour,tipColour:d.tip??d.colour,glow:!0,bulge:.75,split:.45,up:[0,0,1],sides:5})}}return{bones:[],lofts:p,cones:m}}const yi="#6a4a44",wi="#17110f",Ft={coat:"#5a4332",back:"#3a2a20",belly:"#46332a",muzzle:"#3f2e25",nose:yi,upper:"#4a372b",mid:"#33261e",sock:"#241a15"},Pt=(t,e)=>{const a=ae({C:t,hind:{len:.82,thick:1.4,...e.hind},fore:{len:.9,thick:1.45,...e.fore},body:{len:1.08,girth:1.3,deep:1.25,tuck:.95,rump:.9,neck:[-.02,.15],neckThick:1.5,white:.15,...e.body},head:{size:1.22,muzzle:1.55,muzzleWide:1.2,muzzleDeep:1.25,nose:1.75,dome:.92,cheek:0,eye:.75,...e.head,ear:{tall:.62,wide:.95,back:t.back??t.coat,...e.ear}}});return{...a,legs:Ye(a.legs,{colour:wi,size:.9})}},Lt=(t,e,a={})=>U("tail","pelvis",t.root,{len:.2,r:.016,pitch:-.7,curl:.5,tip:.3,blunt:.6,sides:4,colours:{coat:e.coat,tip:e.back??e.coat},...a}),Ea=(t,e)=>[2,3,4,5].flatMap(a=>W(t[a],Z[a],{n:1,a0:.1,long:.12,sweep:.75,droop:0,r:.05,flat:.5,lock:!0,...e})),ki={baby(){const t={coat:"#b0834f",back:"#e9d8b0",belly:"#c9a070",muzzle:"#8f6a44",nose:"#c98a80",upper:"#b0834f",mid:"#8f6a44",sock:"#5a4332"},e=Pt(t,{hind:{len:.5,thick:1.6},fore:{len:.52,thick:1.6},body:{len:.66,girth:1.25,deep:1.05,neck:[.02,.09],neckThick:1.2},head:{size:1.4,muzzle:.85,nose:1.5,eye:1.3},ear:{tall:.8}}),a=e.R,o=Lt(e,t,{len:.1}),s=[1,-1].flatMap(r=>[.75,1.35].map(n=>xa("loin",[1,2,3,4].map(i=>[a[i].at[0]+r*Math.sin(n)*a[i].rx,a[i].at[1]+Math.cos(n)*a[i].ry,a[i].at[2]]),{r:.016,flat:.5,colour:"#e9d8b0",sides:4,up:[r*Math.sin(n),Math.cos(n),0]})));return s.forEach(r=>r.rings.forEach((n,i)=>{n.bone=Z[i+1]})),D("boar-baby",e.body,e.skull,[...e.legs,o,{bones:[],lofts:s,cones:[]}],ze({lively:1.3,tails:[o.chain]}))},young(){const t=Pt(Ft,{hind:{len:.8,thick:1.2},fore:{len:.84,thick:1.22},body:{len:.95,girth:1.12,deep:1.1,neckThick:1.3},head:{size:1.1,muzzle:1.4}}),e=Lt(t,Ft);return D("boar-young",t.body,t.skull,[...t.legs,e,Ct(t.P,{len:.05,r:.01,curl:.9})],ze({lively:1.1,tails:[e.chain]}),{cones:Ea(t.R,{long:.07,r:.035,colour:()=>"#3a2a20"})})},adult(){const t=Pt(Ft,{fore:{len:.95,thick:1.55},body:{girth:1.4,deep:1.4,hump:1.2,tuck:.85,rump:.85,neck:[-.06,.16],neckThick:1.65},head:{size:1.3}}),e=Lt(t,Ft);return D("boar-adult",t.body,t.skull,[...t.legs,e,Ct(t.P,{len:.13,r:.017,curl:1.5})],ze({tails:[e.chain]}),{cones:Ea(t.R,{long:.15,r:.06,colour:()=>"#2a1e17",tip:()=>"#6a5240"})})},legend(){const t="#ff9a3c",e="#ffe6b0",a="#5a3a30",o="#1a1210",s={coat:"#2e2420",back:"#17110f",belly:"#231a17",muzzle:"#4a3a34",nose:"#5a3f3a",upper:"#2a201c",mid:"#1c1512",sock:"#120d0b",eyes:[{colour:t,glow:!0},{colour:t,glow:!0}]},r=Pt(s,{hind:{len:.9,thick:1.5,knob:1.2},fore:{len:1.08,thick:1.7,knob:1.2},body:{len:1.15,girth:1.5,deep:1.6,hump:2,tuck:.7,rump:.8,neck:[-.12,.17],neckThick:1.8},head:{size:1.5,muzzle:1.7,eye:.9},ear:{torn:1}}),n=r.R,i=r.P,l=Lt(r,s,{len:.3}),c=Ct(i,{len:.24,r:.03,curl:2.1,out:.9,fire:{colour:e,tip:"#ffffff",size:1.3}}),d=Ct(i,{len:.09,r:.018,curl:1.4,out:1.1,at:[.035,0,.17]}),f=[...Ea(n,{n:2,a1:.5,long:.3,r:.085,colour:()=>"#17110f",tip:()=>"#5a4a40"}),...[2,3,4].flatMap(m=>W(n[m],Z[m],{n:2,a0:2.7,a1:3.05,long:.16,sweep:.4,droop:.7,r:.06,lock:!0,colour:()=>"#17110f",tip:()=>"#4a3a34"}))],g=[[.07,.05,.12],[-.06,.02,.2]].map(([m,h,u])=>({at:i(m,h,u),rx:.007,ry:.005,tip:i(m*1.3,h-.07,u+.05),bone:"head",colour:"#c98a80",up:[0,0,1],sides:3})),p=[{from:1.3,to:4.5,round:[0,1.5],lames:4,thick:.026,step:.014,colour:a,rim:o,runes:{colour:t}}];return D("boar-legend",r.body,r.skull,[...r.legs,l,c,d],ze({lively:.75,tails:[l.chain]}),{cones:[...f,...g],armour:p})}},xi={id:"boar",heights:[55,83,119,364],plans:ki},he=(t,e,a=1,o="head")=>[1,-1].flatMap(s=>[[-.03,.15],[0,.12]].map(([r,n])=>({at:t(.03*s,-.005,.2),rx:.006,ry:.006,tip:t((.03+.14*a)*s,r*a,n),bone:o,colour:e,up:[0,1,0],sides:3}))),zi="#17120f",Si="#e9b949",Ne={coat:"#d59a40",belly:"#f7ecd4",nose:"#c98a80",upper:"#d59a40",mid:"#c0862f",sock:"#f0d9c0",eye:zi},Tt=(t,e)=>ae({C:t,hind:{len:.32,thick:1.6,foot:1.3,...e.hind},fore:{len:.28,thick:1.3,...e.fore},body:{len:.55,girth:1,deep:1,tuck:1,arch:.8,rump:1.15,neck:[.06,.07],neckThick:1.2,white:.5,...e.body},head:{size:1.2,muzzle:.42,muzzleWide:1.1,dome:1.08,wide:1.05,cheek:0,eye:1.7,eyeAt:[0,.004,-.012],nose:.9,...e.head,ear:{shape:"round",tall:.75,wide:1.25,at:[.012,-.012,-.012],back:t.coat,inner:"#e9b9a8",...e.ear}}}),Mi={baby(){const t={...Ne,coat:"#c9a070",upper:"#c9a070",mid:"#c9a070"},e=Tt(t,{hind:{len:.26,thick:1.7},fore:{len:.24,thick:1.5},body:{len:.44,girth:.95},head:{size:1.42,eye:1.9},ear:{tall:.9,wide:1.4}}),a=U("tail","pelvis",e.root,{len:.16,r:.016,pitch:-.1,blunt:.4,tip:0,colours:{coat:"#b98f62",tip:"#b98f62"}});return D("dormouse-baby",e.body,e.skull,[...e.legs,a],ie({lively:1.3,tails:[a.chain]}))},young(){const t=Tt(Ne,{hind:{len:.42,thick:1.2},fore:{len:.36,thick:1},body:{len:.6,girth:.8,tuck:.85},head:{size:1.08}}),e=U("tail","pelvis",t.root,{len:.42,r:.026,pitch:-.05,curl:.4,blunt:.4,tip:0,colours:{coat:Ne.mid,tip:Ne.mid}});return D("dormouse-young",t.body,t.skull,[...t.legs,e],ie({lively:1.1,tails:[e.chain]}))},adult(){const t=Tt(Ne,{body:{len:.6,girth:1.42,deep:1.05,rump:1.2},head:{size:1.26}}),e=U("tail","pelvis",t.root,{len:.62,r:.085,pitch:1.1,curl:2,bones:6,blunt:.35,tip:.12,colours:{coat:"#c88a30",under:"#a8701f",tip:"#f7ecd4"},spikes:{n:5,colour:"#e9bb62",len:.7}});return D("dormouse-adult",t.body,t.skull,[...t.legs,e],ie({tails:[e.chain]}),{cones:he(t.P,"#f7ecd4",1.2)})},legend(){const t="#c9a8ff",e="#fff0b8",a="#4a3168",o={...Ne,coat:"#c98f3a",back:"#b9a48a",belly:"#f3e6cc",muzzle:"#e6d8c0",upper:"#c98f3a",mid:"#b07a2c",eye:"#6a4a2a"},s=Tt(o,{hind:{len:.44,thick:1.9,knob:1.2},fore:{len:.4,thick:1.6,knob:1.2},body:{len:.72,girth:1.95,deep:1,rump:1.15,neck:[.04,.1],neckThick:1.5},head:{size:1.75,eye:.7,eyeAt:[.004,-.004,-.012]},ear:{tall:.8,wide:1.3,torn:-1}}),r=s.P,n=s.R,i=U("tail","pelvis",s.root,{len:1,r:.13,pitch:.9,curl:2.6,wave:.2,bones:6,blunt:.35,tip:.1,colours:{coat:"#b9802c",under:"#96661f",tip:"#f3e6cc"},spikes:{n:7,colour:"#e9bb62",len:.9}}),l=[...W(n[4],"chest",{n:3,a0:1.75,a1:2.5,long:.1,sweep:.1,droop:-.1,r:.03,sides:5,jitter:.3,colour:()=>"#ffd7c8",tip:()=>e,glow:!0}),...W(n[5],"neck",{n:3,a0:.4,a1:2,long:.08,sweep:0,droop:-.2,r:.026,sides:5,colour:()=>e,glow:!0})],c=[{from:1.75,to:4.7,round:[0,1.7],lames:4,thick:.022,step:.014,colour:a,rim:Si,runes:{colour:t}}];return D("dormouse-legend",s.body,s.skull,[...s.legs,i],ie({lively:.75,tails:[i.chain]}),{cones:[...l,...he(r,"#f3e6cc",2.4)],armour:c})}},Ci={id:"dormouse",heights:[38,65,86,246],plans:Mi},vo={red:[[.1,[.25,.3,1],.3],[.24,[.3,.45,1],.22],[.5,[.35,.6,.9],.27],[.8,[.9,.8,.1],.25],[.82,[-.5,1,.5],.23],[.9,[.1,1,-.7],.2]],roe:[[.48,[.15,.8,1],.32],[.74,[.15,.6,-1],.26]],fork:[[.5,[.2,.7,1],.38]],spike:[]};function ge(t,e={}){const{kind:a="red",size:o=1,spread:s=1,lean:r=1,r:n=.023,colour:i="#cdb48a",tip:l="#f3ead6",tines:c=vo[a]??[],at:d=[.03,.082,.065],bone:f="head",sides:g=5,glow:p,moss:m,pools:h}=e,u=t(1,0,0)[0],b=[],y=[],v=x=>{const C=Math.hypot(...x)||1;return x.map(w=>w/C)},k=x=>m&&y.push({at:x,rx:.02*u,ry:.009*u,tip:[x[0],x[1]-.11*u*(m.long??1),x[2]-.015*u],bone:f,colour:m.colour,tipColour:m.tip??m.colour,bulge:.8,split:.5,up:[0,0,1],sides:4});for(const x of[1,-1]){const C=t(d[0]*x,d[1],d[2]);if(a==="palm"){const M=[.02,.022,.065,.115,.135,.115,.05],T=[.02,.02,.014,.012,.012,.012,.01],N=M.length-1,F=M.map((S,L)=>{const z=L/N;return[C[0]+x*.3*z*s*o*u,C[1]+(.06*z+.26*z*z)*o*u,C[2]-(.05*z+.2*z*z)*r*o*u]});b.push({sides:6,up:[0,1,0],rings:F.map((S,L)=>({at:S,rx:M[L]*o*u,ry:T[L]*o*u*(L<2?1:.8),bone:f,colour:L===N?l:i,plain:!0,up:[0,1,0]}))});const E=(S,L,z,O=.03)=>y.push({at:S,rx:O*o*u,ry:.011*o*u,tip:S.map((H,I)=>H+v(L)[I]*z*o*u),bone:f,colour:i,tipColour:p??l,glow:p?"tip":!1,split:.5,bulge:.6,up:[0,1,0],sides:4});for(const S of[3,4,5])E([F[S][0],F[S][1],F[S][2]+M[S]*.8*o*u],[x*.35,.7,.6],.13);for(const S of[4,5])E([F[S][0],F[S][1],F[S][2]-M[S]*.8*o*u],[x*.4,.75,-.5],.11);E(F[N],[x*.8,.6,0],.12),E(F[1],[x*.35,.25,1],.17,.02),E(F[1],[x*.7,.35,.8],.13,.02),h&&b.push({sides:6,up:[0,1,0],rings:[2,3,4,5].map((S,L)=>({at:[F[S][0],F[S][1]+.014*o*u,F[S][2]],rx:M[S]*.45*o*u*(L===0||L===3?.6:1),ry:.004*o*u,bone:f,colour:h.colour,glow:!0,plain:!0,up:[0,1,0]}))});for(const S of[3,5])k([F[S][0],F[S][1],F[S][2]-M[S]*.6*o*u]);continue}const w=.42*o*u,P=bo(C,w,8,M=>[x*s*.75*Math.cos(M*2.2),1,r*(-.7+1.5*M)]);b.push(xa(f,P,{r:M=>n*u*Math.sqrt(o)*(1-.8*M),colour:M=>M>.85?p??l:i,glow:M=>!!p&&M>.85,sides:g}));for(const[M,[T,N,F],E]of c){const S=Ho(P,M),L=v([x*T,N,F]),z=E*w,O=n*u*Math.sqrt(o)*(1-.8*M)*.9;y.push({at:S,rx:O,ry:O,tip:S.map((H,I)=>H+L[I]*z),bone:f,colour:i,tipColour:p??l,glow:p?"tip":!1,split:.55,bulge:.6,bend:[0,z*.12,0],up:vi(L),sides:4})}for(const M of[.3,.55,.75])k(Ho(P,M))}return{bones:[],lofts:b,cones:y}}const Za="#2a211d",Fi="#1c1613",At={coat:"#4d3828",belly:"#3d2c20",muzzle:"#7a6654",nose:Za,upper:"#5a4636",mid:"#8a7866",sock:"#a39584"},Et={fore:[-1.35,2.5,.2],hind:[-.95,2.2,-1.25]},Rt=(t,e)=>{const a=ae({C:t,hind:{len:2,thick:.66,...e.hind},fore:{len:2.3,thick:.64,...e.fore},body:{len:1.15,girth:1.3,deep:1.3,tuck:.85,hump:.9,neck:[.1,.2],neckThick:1.35,white:.2,...e.body},head:{size:1.3,muzzle:1.9,muzzleWide:1.3,muzzleDeep:1.5,nose:1.7,dome:.95,cheek:0,eye:.9,...e.head,ear:{shape:"long",tall:.8,wide:1.2,splay:.8,lean:.5,back:t.coat,inner:"#8a7866",...e.ear}}});return{...a,legs:Ye(a.legs,{colour:Fi,size:1.1})}},Dt=(t,e)=>U("tail","pelvis",t.root,{len:.1,r:.03,pitch:-1,tip:0,blunt:.3,sides:5,colours:{coat:e.coat,tip:e.coat}}),Ra=(t,e,a=1)=>({at:[0,t[6].at[1]-t[6].ry*.7,t[6].at[2]],rx:.035,ry:.05,tip:[0,t[6].at[1]-t[6].ry-.16*a,t[6].at[2]+.02],bone:"neck",colour:e.coat,tipColour:e.belly,bulge:.8,split:.5,up:[0,0,1],sides:5}),Pi={baby(){const t={coat:"#a36a3c",belly:"#8f5a32",muzzle:"#6e4a30",nose:Za,upper:"#a36a3c",mid:"#b98a5e",sock:"#c9a580"},e=Rt(t,{hind:{len:1.5,thick:.72},fore:{len:1.62,thick:.7},body:{len:.72,girth:1,deep:1,hump:.2,neck:[.14,.12],neckThick:1},head:{size:1.3,muzzle:1.05,muzzleDeep:1.25,nose:1.4,eye:1.5},ear:{tall:1.1}}),a=Dt(e,t);return D("elk-baby",e.body,e.skull,[...e.legs,a],X({lively:1.3,lie:Et,tails:[a.chain]}))},young(){const t={...At,coat:"#6a4a30",upper:"#6a4a30"},e=Rt(t,{hind:{len:1.85,thick:.6},fore:{len:2.05,thick:.58},body:{len:1,girth:1.08,deep:1.1,hump:.5,neckThick:1.1},head:{size:1.15,muzzle:1.6,muzzleDeep:1.35}}),a=Dt(e,t);return D("elk-young",e.body,e.skull,[...e.legs,a,ge(e.P,{kind:"fork",size:.4,spread:1.5,lean:.4})],X({lively:1.1,lie:Et,tails:[a.chain]}),{cones:[Ra(e.R,t,.5)]})},adult(){const t=Rt(At,{}),e=t.R,a=Dt(t,At),o=[4,5].flatMap(s=>W(e[s],Z[s],{n:3,a0:.15,a1:1.1,long:.14,sweep:.8,droop:.2,r:.07,lock:!0,colour:()=>"#3a2a1e",tip:()=>"#5a4636"}));return D("elk-adult",t.body,t.skull,[...t.legs,a,ge(t.P,{kind:"palm",colour:"#c9b48e"})],X({lie:Et,tails:[a.chain]}),{cones:[Ra(e,At),...o]})},legend(){const t="#8ff5dc",e="#2b2622",a="#d9d4c4",o="#4c6f3a",s={coat:"#2e2620",back:"#1f1a16",belly:"#241d18",muzzle:"#5e5348",nose:Za,upper:"#3a3028",mid:"#6a5e52",sock:"#8f8474",eyes:[{colour:t,glow:!0},{colour:t,glow:!0}]},r=Rt(s,{hind:{len:2.2,thick:.64,knob:1.35},fore:{len:2.6,thick:.62,knob:1.35},body:{len:1.2,girth:1.3,deep:1.45,tuck:.7,hump:1.5,neck:[.06,.24],neckThick:1.45},head:{size:1.45,muzzle:2.1,muzzleDeep:1.6,eye:1.1},ear:{torn:1}}),n=r.R,i=r.P,l=Dt(r,s),c=ge(i,{kind:"palm",size:1.35,spread:1.05,colour:"#8a8168",tip:"#d9d2b8",glow:t,pools:{colour:t},moss:{colour:o,tip:"#7ba24c",long:1.6}}),d=[3,4,5].flatMap(m=>W(n[m],Z[m],{n:4,a0:.15,a1:1.3,long:.2,sweep:.75,droop:.3,r:.08,lock:!0,colour:()=>"#1f1a16",tip:()=>"#4a4038"})),f=[1,2,3,4].flatMap(m=>W(n[m],Z[m],{n:3,a0:1.7,a1:2.6,long:.16,sweep:.3,droop:.85,r:.05,flat:.4,colour:()=>o,tip:()=>"#7ba24c"})),g=[{at:i(0,-.04,.22),rx:.035,ry:.035,tip:i(0,-.2,.18),bone:"head",colour:s.coat,tipColour:s.muzzle,split:.5,bulge:.7,up:[0,0,1]}],p=[{from:1.2,to:4.4,round:[0,1.6],lames:4,thick:.024,step:.012,colour:e,rim:a,runes:{colour:t}}];return D("elk-legend",r.body,r.skull,[...r.legs,l,c],X({lively:.75,lie:Et,tails:[l.chain]}),{cones:[Ra(n,s,1.7),...d,...f,...g],armour:p})}},Li={id:"elk",heights:[72,130,199,440],plans:Pi},qe="#f4efe6",Hs="#2a1a16",za="#16100e",je="#1f1512",Sa=(t,e)=>mo(t,e);function Ti(){const t={coat:"#a8643a",belly:"#eadfce",nose:za,upper:"#a8643a",mid:"#96552f",sock:"#4a2f25"},e=.52,a=Je({back:.37*e+.012,len:.54,girth:1.02,deep:.92,tuck:1.08,neck:[.075,.07],neckThick:1.15,white:.45,colours:t}),o=Ve(a.pivot,{size:1.38,muzzle:.45,ear:{tall:1.05,wide:1.45,back:je},cheek:.5,eye:1.6,white:.55,colours:t}),s=U("tail","pelvis",[0,.37*e+.02,-.19],{len:.19,r:.062,pitch:.15,tip:.4,blunt:.4,colours:{coat:t.coat,tip:qe}});return D("fox-baby",a,o,[...Sa(a,{len:e,thick:1.6,colours:t}),s],X({lively:1.3,tails:[s.chain]}))}function Ai(){const t={coat:"#e8852b",belly:qe,nose:za,upper:"#e8852b",mid:"#cf6c1f",sock:Hs},e=1.1,a=Je({back:.37*e+.01,len:.96,girth:.84,deep:.95,tuck:.72,neck:[.17,.15],neckThick:.92,white:.4,colours:t}),o=Ve(a.pivot,{size:.93,muzzle:1.08,ear:{tall:1.25,wide:1.05,back:je},cheek:.35,eye:1.15,colours:t}),s=U("tail","pelvis",[0,.37*e+.015,-.33],{len:.54,r:.088,pitch:-.3,colours:{coat:t.coat,under:"#b85c1b",tip:qe}});return D("fox-young",a,o,[...Sa(a,{len:e,thick:.86,colours:t}),s],X({lively:1.1,tails:[s.chain]}))}function Ei(){const t={coat:"#e07a1f",belly:qe,nose:za,upper:"#e07a1f",mid:"#c9641a",sock:Hs},e=1.06,a=Je({back:.37*e+.01,len:1.02,girth:1.06,deep:1.14,tuck:.74,neck:[.19,.14],neckThick:1.25,white:.5,colours:t}),o=Ve(a.pivot,{size:1.06,muzzle:1.05,ear:{tall:1.25,wide:1,back:je,tip:je},cheek:1.75,eye:1.15,colours:t}),s=Array.from({length:5},(i,l)=>{const c=(l-2)/2,d=Math.abs(c);return U(`tail${"abcde"[l]}`,"pelvis",[.045*c,a.rings[1].at[1]+.05-.03*d,a.rings[1].at[2]-.03+.03*d],{len:.66-.12*d,r:.108-.012*d,yaw:c*.85,pitch:.6-.5*d,curl:-.35,wave:.12,phase:l,tip:.2,blunt:.22,colours:{coat:t.coat,under:"#a44f18",tip:qe}})}),r=W(a.rings[5],"neck",{n:5,a0:.9,a1:2.9,long:.17,sweep:.6,droop:.35,r:.062,lock:!0,colour:()=>qe}),n=W(a.rings[4],"chest",{n:1,a0:.12,long:.12,sweep:.9,r:.045,lock:!0,colour:()=>t.coat,tip:()=>"#a44f18"}).concat(W(a.rings[3],"chest",{n:1,a0:.12,long:.1,sweep:.9,r:.04,lock:!0,colour:()=>t.coat,tip:()=>"#a44f18"}));return D("fox-adult",a,o,[...Sa(a,{len:e,thick:1,colours:t}),...s],X({tails:s.map(i=>i.chain)}),{cones:[...r,...n]})}function Ri(){const t="#eef2f5",e="#bdb6ad",a="#e9e2d6",o="#e9b949",s="#c5222c",r="#8d9398",n="#9fdcff",i="#effaff",l="#fff0b0",c="#7d360b",d="#262a44",f={coat:"#b9520f",back:"#a9a39b",belly:a,mask:a,muzzle:e,nose:za,eyes:[{colour:"#ffd24a",glow:!0},{colour:"#e3edf2"}],upper:"#b9520f",mid:"#8c3f0e",sock:"#1c1210"},g=1.4,p=Je({back:.37*g+.01,len:1.14,girth:1.02,deep:1.36,tuck:.5,hump:1.1,neck:[.11,.25],neckThick:1.4,white:.5,colours:f}),m=Ve(p.pivot,{size:1.42,muzzle:1.45,ear:{tall:1.9,wide:.9,back:je,tip:je,torn:-1},cheek:2.3,eye:1.7,white:.6,colours:f}),h=m.P,u=Array.from({length:9},(z,O)=>{const H=(O-4)/4,I=Math.abs(H),j=O===4;return U(`tail${"abcdefghi"[O]}`,"pelvis",[.055*H,p.rings[1].at[1]+.06-.03*I,p.rings[1].at[2]-.02+.05*I],{len:1.02-.26*I+O%2*.09,r:.12-.02*I,yaw:H*.75,twist:H*.75,pitch:1.5-.5*I-O%2*.14,curl:-.75+.15*I,wave:.3,waves:1.25,phase:O*1.9,bones:6,tip:.2,plume:!0,sides:6,colours:{coat:f.coat,under:c,tip:t},ring:O%2?{colour:o,at:.2}:void 0,fire:{colour:j?l:n,tip:i,size:(j?1.5:1.15)-.25*I}})}),b=p.rings[5],y=p.rings[4];p.rings[3],p.rings[2];const v=[...W(b,"neck",{n:4,a0:.5,a1:2.8,long:.2,sweep:.8,droop:.45,r:.085,lock:!0,grow:.5,colour:z=>z<1?f.coat:a,tip:z=>z<1?f.back:e}),...W(y,"chest",{n:4,a0:.25,a1:2.5,long:.2,sweep:.85,droop:.4,r:.09,lock:!0,grow:.5,colour:z=>z<2?f.coat:a,tip:z=>z<2?f.back:e}),...W(y,"chest",{n:2,a0:2.75,a1:3.05,long:.17,sweep:.25,droop:.7,r:.06,lock:!0,colour:()=>a,tip:()=>e})],k=[{at:h(0,-.03,.2),rx:.035,ry:.035,tip:h(0,-.2,.13),bone:"head",colour:a,tipColour:e,split:.5,up:[0,0,1]},...[1,-1].map(z=>({at:h(.048*z,.09,.1),rx:.028,ry:.018,tip:h(.15*z,.17,-.04),bone:"head",colour:a,tipColour:e,split:.5,up:[0,1,0]}))],x=p.rings[6].at,C=b.at,w=go("neck",C,x,{at:.42,r:.135,ry:.15,wide:.05,colour:s}),P=[[.1,-.1,.06],[-.1,-.1,.06],[.05,-.15,.1],[-.05,-.15,.1]].map(([z,O,H])=>({at:[C[0]+z,C[1]+O+.05,C[2]+H+.05],rx:.026,ry:.008,tip:[C[0]+z*1.15,C[1]+O-.14,C[2]+H+.06],bone:"neck",colour:"#ffffff",split:.9,up:[0,0,1],sides:4})),M=C[1]-.2,T=C[2]+.17,N=[{at:[0,M,T],rx:.055,ry:.055,tip:[0,M-.09,T],bone:"neck",colour:o,split:.85,up:[0,0,1],sides:6},{at:[0,M,T],rx:.055,ry:.055,tip:[0,M+.06,T-.02],bone:"neck",colour:o,up:[0,0,1],sides:6}],F=[1,-1].map(z=>({at:h(.092*z,.14,.025),rx:.02,ry:.02,tip:h(.11*z,.06,.025),bone:z>0?"earL":"earR",colour:o,split:.85,up:[0,0,1],sides:5})),E=Sa(p,{len:g,thick:.88,knob:1.5,colours:f,claws:{colour:"#ddd6c8",len:.9},band:{colour:r,at:.32,r:.04}}),S=E.flatMap(z=>{const O=z.lofts[0].rings[1];return[{at:[O.at[0],O.at[1]-.02,O.at[2]-O.ry*.7],rx:.04,ry:.04,tip:[O.at[0],O.at[1]-.15,O.at[2]-O.ry-.08],bone:O.bone,colour:f.coat,tipColour:e,split:.5,up:[1,0,0]}]}),L=[{from:1.15,to:3.3,round:[0,1.7],lames:3,thick:.02,step:.012,colour:d,rim:o,runes:{colour:n}}];return D("fox-legend",p,m,[...E,...u,w],X({lively:.75,tails:u.map(z=>z.chain)}),{cones:[...v,...k,...P,...N,...F,...S],armour:L})}const Di={id:"fox",heights:[53,81,137,387],plans:{baby:Ti,young:Ai,adult:Ei,legend:Ri}},_s="#2a1c18",Oi="#17120f",Ot="#dfe5ec",et={coat:"#b48d60",belly:"#f0e7d6",nose:_s,upper:"#b48d60",mid:"#a17a50",sock:"#8a6842"},Gt=(t,e)=>ae({C:t,hind:{len:.78,thick:1.25,foot:2.3,...e.hind},fore:{len:.56,thick:.95,...e.fore},body:{len:.86,girth:.98,deep:1,tuck:.9,arch:1.1,rump:1.28,neck:[.13,.1],neckThick:1.05,white:.5,...e.body},head:{size:1.02,muzzle:.55,muzzleWide:1.45,muzzleDeep:1.3,dome:1.12,wide:.9,cheek:0,eye:1.7,eyeAt:[.004,.012,-.02],nose:.9,...e.head,ear:{shape:"long",tall:1.6,wide:1,at:[-.012,0,-.03],back:t.coat,inner:"#d8a996",tip:Oi,...e.ear}}}),Ht=(t,e={})=>U("tail","pelvis",[t[0],t[1]+.02,t[2]+.02],{len:.1,r:.036,pitch:.95,tip:.7,blunt:.05,sides:5,colours:{coat:"#5a4630",tip:"#ffffff"},...e}),Gi={baby(){const t={...et,coat:"#a8845c",upper:"#a8845c",mid:"#a8845c"},e=Gt(t,{hind:{len:.4,thick:1.7,foot:1.5},fore:{len:.32,thick:1.5},body:{len:.6,girth:1.05,arch:.6,rump:1.15,neck:[.06,.07],neckThick:1.2},head:{size:1.22,eye:2.1},ear:{tall:.8,lean:.75,wide:1.1,inner:t.coat,tip:"#5a4630"}}),a=Ht(e.root,{len:.06,r:.028});return D("hare-baby",e.body,e.skull,[...e.legs,a],ie({lively:1.3,tails:[a.chain]}))},young(){const t=Gt(et,{hind:{len:.82,thick:1},fore:{len:.6,thick:.85},body:{len:.82,girth:.82,tuck:.8,rump:1.2},head:{size:.95},ear:{tall:1.9,lean:.1,wide:.9}}),e=Ht(t.root);return D("hare-young",t.body,t.skull,[...t.legs,e],ie({lively:1.1,tails:[e.chain]}))},adult(){const t=Gt(et,{hind:{len:.9,thick:1.3,foot:2.5},fore:{len:.62,thick:1},body:{len:.9,girth:1.02,deep:1.18,tuck:.78,rump:1.38,neckThick:1.2},head:{size:1.06},ear:{tall:2.7,lean:.12,wide:1.15,splay:.16}}),e=Ht(t.root,{len:.13,r:.042}),a=W(t.R[5],"neck",{n:4,a0:1.2,a1:2.95,long:.11,sweep:.5,droop:.45,r:.05,lock:!0,colour:()=>et.belly}),o=W(t.R[4],"chest",{n:1,a0:.1,long:.1,sweep:.8,r:.035,colour:()=>et.coat,tip:()=>"#6e5334"});return D("hare-adult",t.body,t.skull,[...t.legs,e],ie({tails:[e.chain]}),{cones:[...a,...o,...he(t.P,"#f0e7d6",1.1)]})},legend(){const t="#cfe6ff",e="#4f5b78",o=Gt({coat:"#c9ced6",back:"#9ea5b0",belly:"#f3f5f8",nose:_s,upper:"#c9ced6",mid:"#aab0ba",sock:"#7f8794",eyes:[{colour:t,glow:!0},{colour:t,glow:!0}]},{hind:{len:1.1,thick:1.3,foot:2.6,knob:1.25,claws:{colour:"#3a3f48",len:1},band:{colour:e,at:.3,r:.05}},fore:{len:.78,thick:1,knob:1.25,band:{colour:Ot,at:.3,r:.036}},body:{len:.98,girth:.96,deep:1.25,tuck:.62,rump:1.4,hump:.3,neck:[.2,.1],neckThick:1.15},head:{size:1.12,muzzle:.62,eye:1.6},ear:{tall:5.2,lean:.06,wide:1.25,splay:.09,back:"#aab0ba",inner:"#e9d2cc",tip:"#3a3f48",torn:-1}}),s=o.P,r=o.R,n=Ht(o.root,{len:.17,r:.048,colours:{coat:"#9ea5b0",tip:"#ffffff"}}),i=[1,-1].map(f=>({at:s(.012*f,.092,.1),rx:.03,ry:.012,tip:s(.06*f,.14,.085),bone:"head",colour:t,glow:!0,up:[0,0,1],sides:4})),l=[.55,.8].flatMap((f,g)=>[1].map(p=>({at:s((.036+.1*f)*p,.07*1.12+.82*f,-.03),rx:.03,ry:.012,tip:s((.036+.1*f)*p+.07,.07*1.12+.82*f-.02,-.03),bone:"earL",colour:Ot,split:.8,up:[0,1,0],sides:4}))),c=[{from:.75,to:2.15,round:[0,1.7],lames:2,thick:.02,step:.012,colour:e,rim:Ot,runes:{colour:t}},{from:3.2,to:4.75,round:[0,1.7],lames:2,thick:.02,step:.012,colour:e,rim:Ot,runes:{colour:t,seed:3}}],d=W(r[5],"neck",{n:4,a0:.9,a1:2.95,long:.16,sweep:.55,droop:.5,r:.06,lock:!0,colour:()=>"#f3f5f8",tip:()=>"#aab0ba"});return D("hare-legend",o.body,o.skull,[...o.legs,n],ie({lively:.75,tails:[n.chain]}),{cones:[...i,...l,...d,...he(s,"#f3f5f8",1.6)],armour:c})}},Hi={id:"hare",heights:[74,114,164,491],curl:{ears:1.4,earsIn:1.6},plans:Gi},_i="#b9722e",_o="#e0a04a",tt={coat:"#4f3b2c",belly:"#cfae84",mask:"#cfae84",muzzle:"#cfae84",nose:"#1b1512",upper:"#b89a72",mid:"#a98a62",sock:"#8a6f4c",eye:"#120e0c"},_t=(t,e)=>ae({C:t,hind:{len:.26,thick:1.5,...e.hind},fore:{len:.26,thick:1.4,...e.fore},body:{len:.62,girth:1.35,deep:1,tuck:1.05,hump:.5,neck:[0,.11],neckThick:1.35,white:.55,...e.body},head:{size:.98,muzzle:1,muzzleWide:.8,muzzleDeep:.85,wide:1,cheek:0,eye:1.3,nose:1.2,...e.head,ear:{shape:"round",tall:.6,wide:.9,at:[.012,-.02,-.012],back:t.mask,inner:"#e2c6a8"}}}),Nt=(t,e)=>(e.rings??[1,2,3,4,5]).flatMap(a=>W(t[a],Z[a],{n:e.n??5,a0:.12,a1:e.down??1.75,long:e.long*(a===5?.75:1),sweep:e.sweep??.6,droop:0,r:e.r??.028,sides:3,jitter:e.jitter??.35,colour:e.colour??(()=>"#5a4332"),tip:e.tip??(()=>"#ecdfc2"),glow:e.glow??!1})),Ni={baby(){const t={...tt,coat:"#b9a183",belly:"#e6d2b4",mask:"#e6d2b4",muzzle:"#e6d2b4"},e=_t(t,{hind:{len:.2,thick:1.6},fore:{len:.2,thick:1.5},body:{len:.45,girth:1.25},head:{size:1.25,muzzle:.7,nose:1.7,eye:1.6}});return D("hedgehog-baby",e.body,e.skull,e.legs,Se({lively:1.3}),{cones:Nt(e.R,{n:3,long:.07,r:.026,down:1.3,sweep:.45,colour:()=>"#8f7a5e",tip:()=>"#ffffff"})})},young(){const t=_t(tt,{body:{len:.58,girth:1.2}});return D("hedgehog-young",t.body,t.skull,t.legs,Se({lively:1.1}),{cones:Nt(t.R,{n:5,long:.075})})},adult(){const t=_t(tt,{body:{len:.66,girth:1.45,hump:.8},head:{size:1.02,muzzle:1.2}}),e=t.R,a=[2,3,4].flatMap(o=>W(e[o],Z[o],{n:2,a0:1.95,a1:2.4,long:.07,sweep:.4,droop:.7,r:.045,lock:!0,colour:()=>tt.belly,tip:()=>"#a98a62"}));return D("hedgehog-adult",t.body,t.skull,t.legs,Se(),{cones:[...Nt(t.R,{n:6,long:.2,sweep:.42,r:.03,jitter:.5,colour:o=>o%2?"#5a4332":"#3c2c20",tip:()=>"#f3e7c9"}),...a,...he(t.P,"#e6d2b4",.7)]})},legend(){const t="#ffd27a",e="#d9dde0",a={...tt,coat:"#3a2a20",belly:"#b8a488",mask:e,muzzle:e,upper:"#a8906c",mid:"#927a58",eyes:[{colour:t,glow:!0},{colour:t,glow:!0}]},o=_t(a,{hind:{len:.34,thick:1.6,knob:1.2,claws:{colour:"#3a2a20",len:1.2}},fore:{len:.34,thick:1.5,knob:1.2,claws:{colour:"#3a2a20",len:1.2}},body:{len:.78,girth:1.7,hump:1.2,neck:[0,.14],neckThick:1.4},head:{size:1.15,muzzle:1.35,eye:1.2}}),s=o.R,r=o.P,n=Nt(s,{rings:[1,2,3,4],n:6,long:.52,sweep:.3,r:.034,jitter:.95,down:1.6,colour:c=>c%2?"#4a372a":"#2f2219",tip:c=>c%3?_o:t,glow:c=>c%3?!1:"tip"}),i=[{from:4.55,to:6,round:[0,2],lames:2,thick:.02,step:.012,colour:_i,rim:_o,runes:{colour:t}}],l=[2,3,4].flatMap(c=>W(s[c],Z[c],{n:2,a0:1.9,a1:2.4,long:.1,sweep:.4,droop:.7,r:.05,lock:!0,colour:()=>a.belly,tip:()=>"#8f7a5c"}));return D("hedgehog-legend",o.body,o.skull,o.legs,Se({lively:.75}),{cones:[...n,...l,...he(r,"#e6e9ec",1.4)],armour:i})}},Wi={id:"hedgehog",heights:[47,74,103,347],plans:Ni};function Be(t,e={}){const{len:a=.3,r:o=.03,p0:s=1.2,curl:r=1.5,out:n=[.2,.2],tighten:i=0,n:l=14,ridges:c=!0,knob:d=.16,colour:f="#5b4a3b",ridge:g="#857159",tip:p,at:m=[.034,.078,.05],bone:h="head",glow:u,broken:b,bands:y,sides:v=5}=e,k=t(1,0,0)[0],x=[];for(const C of[1,-1]){let w=bo(t(m[0]*C,m[1],m[2]),a*k,l,F=>{const E=s-r*F;return[C*(n[0]+(n[1]-n[0])*F),Math.sin(E),-Math.cos(E)]},i);const P=b?.side===C,M=P?Math.max(3,Math.round(l*b.at)+1):w.length,T=w.length-1;w=w.slice(0,M);const N=F=>o*k*Math.pow(1-.88*(F/T),.8);x.push({sides:v,up:[1,0,0],rings:w.map((F,E)=>{const S=E/T,L=c&&E%2===1,z=!!u&&!P&&S>.82;return{at:F,rx:N(E)*(L?1+d:1),ry:N(E)*(L?1+d:1)*1.1,bone:h,colour:z?u:S>.9&&p&&!P?p:L?g:f,glow:z,plain:!0,up:[1,0,0]}})});for(const F of y?.at??[]){const E=Math.round(F*T);E<1||E>=w.length-1||x.push(xa(h,[w[E-1],w[E],w[E+1]].map((S,L)=>S.map((z,O)=>w[E][O]+(z-w[E][O])*.3)),{r:N(E)*1.32,flat:1.1,colour:y.colour,sides:6,up:[1,0,0]}))}}return{bones:[],lofts:x,cones:[]}}const Me=(t={})=>{const{walk:e={},run:a={},...o}=t,s=ma("bound",{seconds:.55,duty:.26,reach:.8,leap:.36,legs:Os(),...a,body:{pitch:.07,flex:.07,bob:.06,...a.body}});return{type:s.type,seconds:s.seconds,legs:s.legs,...o,paces:{walk:ma("amble",e),run:s}}},ba="#3b2c22",Ii="#1c1613",Ui="#efe8d8",at={coat:"#9c7b55",back:"#5e4632",belly:Ui,muzzle:"#6e553d",nose:"#17110f",upper:"#7a5c40",mid:ba,sock:ba},Wt={fore:[-1.35,2.5,.2],hind:[-.95,2.2,-1.25]},It=(t,e)=>{const a=ae({C:t,hind:{len:1.12,thick:1,...e.hind},fore:{len:1.15,thick:.98,...e.fore},body:{len:1,girth:1.22,deep:1.18,tuck:.9,neck:[.2,.13],neckThick:1.25,white:.3,...e.body},head:{size:1.05,muzzle:.95,muzzleDeep:1.15,cheek:0,eye:1.05,...e.head,ear:{shape:"long",tall:.6,wide:1.1,splay:1.1,lean:.6,at:[.012,-.03,-.015],back:t.coat,inner:"#d9b9a0",...e.ear}}});return{...a,legs:Ye(a.legs,{colour:Ii})}},Ut=(t,e)=>U("tail","pelvis",t.root,{len:.11,r:.03,pitch:.5,tip:.5,blunt:.2,sides:5,colours:{coat:e.coat,tip:ba}}),No=(t,e,a,o=1)=>({at:t(0,-.035,.19),rx:.026,ry:.026,tip:t(0,-.07-.11*o,.15),bone:"head",colour:e,tipColour:a,split:.5,bulge:.7,up:[0,0,1]}),$i={baby(){const t={...at,coat:"#b08c62",back:void 0,upper:"#b08c62",mid:"#6e553d",sock:"#4a382c"},e=It(t,{hind:{len:.82,thick:1.05},fore:{len:.84,thick:1.02},body:{len:.64,girth:1.05,neck:[.13,.09],neckThick:1.05},head:{size:1.28,muzzle:.7,eye:1.5},ear:{tall:.95}}),a=Ut(e,t);return D("ibex-baby",e.body,e.skull,[...e.legs,a],Me({lively:1.3,lie:Wt,tails:[a.chain]}))},young(){const t=It(at,{hind:{len:1.08,thick:.9},fore:{len:1.1,thick:.88},body:{len:.9,girth:1.05,neckThick:1.05},head:{size:1}}),e=Ut(t,at);return D("ibex-young",t.body,t.skull,[...t.legs,e,Be(t.P,{len:.3,r:.024,p0:1.4,curl:.8,out:[.12,.2],n:8})],Me({lively:1.1,lie:Wt,tails:[e.chain]}))},adult(){const t=It(at,{body:{girth:1.3,deep:1.25,hump:.3,neckThick:1.45},head:{size:1.1}}),e=Ut(t,at),a=Be(t.P,{len:.78,r:.036,p0:1.4,curl:1.55,out:[.1,.3],n:18,knob:.22,tip:"#b9a98c"});return D("ibex-adult",t.body,t.skull,[...t.legs,e,a],Me({lie:Wt,tails:[e.chain]}),{cones:[No(t.P,ba,"#6e553d")]})},legend(){const t="#a8ecff",e="#3d4856",a="#d3e6f0",o="#b7c26a",s="#8d9398",r={coat:"#8f8a80",back:"#4c4740",belly:"#e3e0d6",muzzle:"#b9b4a8",nose:"#17110f",upper:"#6f6a62",mid:"#3a3632",sock:"#2c2926",eyes:[{colour:t,glow:!0},{colour:t,glow:!0}]},n=It(r,{hind:{len:1.3,thick:1.05,knob:1.35,band:{colour:s,at:.32,r:.042}},fore:{len:1.36,thick:1.02,knob:1.35,band:{colour:s,at:.32,r:.042}},body:{len:1.08,girth:1.32,deep:1.38,tuck:.72,hump:.8,neck:[.22,.17],neckThick:1.5},head:{size:1.28,muzzle:1.1,muzzleDeep:1.3,eye:1.2},ear:{torn:1}}),i=n.R,l=n.P,c=Ut(n,r),d=Be(l,{len:1.08,r:.052,p0:1.42,curl:1.9,out:[.1,.34],n:30,knob:.3,colour:"#4f4a44",ridge:"#8a857a",glow:t}),f=[2,3,4].flatMap(m=>W(i[m],Z[m],{n:3,a0:.6,a1:1.7,long:.07,sweep:.5,droop:.5,r:.055,flat:.35,colour:()=>o,tip:()=>"#dfe6a0"})),g=W(i[5],"neck",{n:4,a0:1.3,a1:3.05,long:.2,sweep:.3,droop:.7,r:.07,lock:!0,colour:()=>"#e3e0d6",tip:()=>"#8f8a80"}),p=[{from:1.2,to:4.35,round:[0,1.55],lames:4,thick:.022,step:.012,colour:e,rim:a,runes:{colour:t}}];return D("ibex-legend",n.body,n.skull,[...n.legs,c,d],Me({lively:.75,lie:Wt,tails:[c.chain]}),{cones:[No(l,"#e3e0d6","#8f8a80",2.2),...f,...g],armour:p})}},qi={id:"ibex",heights:[55,99,161,397],plans:$i};function Ce(t){const e=Gs(t.legs.len),a=Je({...e,deep:.86,tuck:.96,...t.body,colours:t.C}),o=Ve(a.pivot,{muzzle:.55,wide:.98,dome:.86,muzzleWide:1.15,cheek:0,eye:1.25,ear:{shape:"round",tall:.62,wide:1.25,at:[.012,-.012,-.005],back:t.C.ear??t.C.coat,inner:t.C.inner??"#c98f6e"},...t.head,colours:t.C});return{body:a,skull:o,legs:mo(a,{colours:t.C,...t.legs}),root:[0,a.rings[1].at[1]+.01,a.rings[0].at[2]+.03]}}const Bi="#16100e",oe={coat:"#5e3d28",belly:"#f2c98b",nose:Bi,upper:"#4a2f1f",mid:"#3d261a",sock:"#2a1a13",ear:"#5e3d28",inner:"#f0d9b0"},We={size:1,muzzle:.7,wide:1.02,eye:1.4,ear:{shape:"round",tall:.85,wide:1.35,at:[.012,-.008,-.005],back:oe.coat,inner:"#e8cfa0"}},ji={baby(){const t=Ce({C:oe,body:{len:.78,girth:.78,arch:.4,neck:[.07,.09],neckThick:1.15,white:.45},legs:{len:.4,thick:1.7},head:{...We,size:1.22,muzzle:.5,eye:1.7,ear:{...We.ear,tall:1.05,wide:1.6}}}),e=U("tail","pelvis",t.root,{len:.2,r:.045,pitch:.05,blunt:.3,tip:0,colours:{coat:oe.coat,tip:oe.coat}});return D("marten-baby",t.body,t.skull,[...t.legs,e],xe({lively:1.3,tails:[e.chain]}))},young(){const t=Ce({C:oe,body:{len:1.08,girth:.66,arch:.8,neck:[.13,.14],white:.36},legs:{len:.55,thick:1.3,paw:1.3},head:We}),e=U("tail","pelvis",t.root,{len:.44,r:.085,pitch:-.1,blunt:.3,tip:0,colours:{coat:oe.coat,under:"#3d261a",tip:oe.coat}});return D("marten-young",t.body,t.skull,[...t.legs,e],xe({lively:1.1,tails:[e.chain]}))},adult(){const t=Ce({C:oe,body:{len:1.28,girth:.72,arch:1.25,neck:[.17,.15],neckThick:1.1,white:.42},legs:{len:.62,thick:1.25,paw:1.25,claws:{colour:"#e6dcc8",len:.8}},head:{...We,size:1.06,eye:1.5}}),e=U("tail","pelvis",t.root,{len:.7,r:.125,pitch:.55,curl:-.8,wave:.15,bones:5,blunt:.3,tip:0,colours:{coat:oe.coat,under:"#3d261a",tip:oe.coat},spikes:{n:4,colour:"#3d261a",len:.9}}),a=W(t.body.rings[5],"neck",{n:4,a0:1.3,a1:2.95,long:.12,sweep:.5,droop:.4,r:.05,lock:!0,colour:()=>oe.belly}),o=[1,-1].map(s=>({at:t.skull.P(.075*s,.14,.01),rx:.012,ry:.01,tip:t.skull.P(.1*s,.2,-.005),bone:s>0?"earL":"earR",colour:"#3d261a",up:[0,0,1]}));return D("marten-adult",t.body,t.skull,[...t.legs,e],xe({tails:[e.chain]}),{cones:[...a,...o]})},legend(){const t="#f0a23a",e="#ffd27a",a="#2f4a2c",o={...oe,coat:"#4a2e1e",back:"#2f1d14",belly:"#e8b874",eyes:[{colour:e,glow:!0},{colour:e,glow:!0}]},s=Ce({C:o,body:{len:1.5,girth:.84,arch:1.5,hump:.4,neck:[.2,.2],neckThick:1.2,white:.4},legs:{len:.74,thick:1.15,knob:1.35,paw:1.3,claws:{colour:"#efe6d2",len:1.5,thick:1.3}},head:{...We,size:1.18,muzzle:.8,eye:1.6,ear:{...We.ear,tall:1,torn:-1}}}),r=s.skull.P,n=s.body.rings,i=U("tail","pelvis",s.root,{len:.95,r:.165,pitch:.75,curl:-1.1,wave:.25,waves:1.2,bones:6,blunt:.25,tip:0,colours:{coat:o.coat,under:"#2f1d14",tip:o.coat},spikes:{n:6,colour:a,len:1.3}}),l=[n[1],n[2],n[3],n[4]].flatMap((p,m)=>W(p,["pelvis","loin","chest","chest"][m],{n:2,a0:.95,a1:1.3,long:.13,sweep:.75,r:.022,sides:3,colour:()=>o.back,tip:()=>a})),c=[{from:.9,to:4.6,round:[0,.8],lames:5,thick:.018,step:.012,colour:"#8a4a16",rim:t,runes:{colour:e}}],d=["#3f7fc4","#d9c9a8","#1c1a1c","#8a5a34","#e9e2d2"],f=W(n[5],"neck",{n:5,a0:.15,a1:2.1,long:.26,sweep:.8,droop:.2,r:.045,flat:.4,jitter:.2,colour:p=>d[p%5],tip:p=>d[(p+2)%5]}),g=[1,-1].map(p=>({at:r(.03*p,-.005,.2),rx:.006,ry:.006,tip:r(.18*p,-.04,.14),bone:"head",colour:"#efe6d2",up:[0,1,0],sides:3}));return D("marten-legend",s.body,s.skull,[...s.legs,i],xe({lively:.75,tails:[i.chain]}),{cones:[...l,...f,...g],armour:c})}},Ki={id:"marten",heights:[45,69,97,237],curl:{turn:4.3},plans:ji},ce="#e9a79c",ct={coat:"#574f66",belly:"#6a6179",nose:ce,upper:"#574f66",mid:"#574f66",sock:"#6a6179",eye:"#15121a"},$t=(t,e)=>ae({C:t,hind:{len:.24,thick:2,...e.hind},fore:{len:.24,thick:2.2,paw:2.8,spread:2.3,claws:{colour:"#f3e9dc",len:1.6,thick:1.8,wide:2.4},...e.fore},body:{len:.72,girth:1.3,deep:.95,tuck:1.05,neck:[0,.1],neckThick:1.22,white:0,...e.body},head:{size:1.08,muzzle:.8,muzzleWide:1.3,muzzleDeep:1.2,wide:1,dome:.95,cheek:0,eye:.4,nose:2,...e.head,ear:{shape:"round",tall:.08,wide:.5,back:t.coat,inner:t.coat}}}),qt=(t,e,a,o=1,s=ct.belly)=>{const r=[],n=[],i=[];for(const l of[1,-1]){const c=t.R[4],d=.07*e,f=[(c.rx+d*.75)*l,.03*e+.01,c.at[2]+d*.9],g=l>0?"spadeL":"spadeR";i.push([g,[c.rx*.6*l,f[1],c.at[2]],"chest"]),r.push(...ft(g,f,{r:d,squash:.32,colour:s,sides:8}).lofts);for(let p=0;p<5;p++){const m=-.35+p*.42,h=[Math.sin(m)*l,0,Math.cos(m)],u=[-Math.cos(m)*l,0,Math.sin(m)],b=.1*e*o,y=[f[0]+h[0]*d*.82,f[1],f[2]+h[2]*d*.82];r.push({sides:4,up:[0,1,0],rings:[0,.25,.5,.75,1].map(v=>({at:[y[0]+(h[0]*v+u[0]*.55*v*v)*b,y[1]-.45*v*v*b,y[2]+(h[2]*v+u[2]*.55*v*v)*b],rx:Math.max(8e-4,.02*e*(1-v)**.7),ry:Math.max(8e-4,.011*e*(1-v)**.7),bone:g,colour:a,plain:!0}))})}}return{bones:i,lofts:r,cones:n}},Wo=(t,e,a,o,s=!1)=>Array.from({length:e},(r,n)=>{const i=n/e*Math.PI*2;return{at:t(Math.cos(i)*.012,-.013+Math.sin(i)*.012,.265),rx:.007,ry:.007,tip:t(Math.cos(i)*a,-.013+Math.sin(i)*a,.285),bone:"head",colour:o,glow:s,up:[0,0,1],sides:3}}),Bt={baby(){const t=$t(ct,{hind:{len:.18,thick:2.2},fore:{len:.18,thick:2.4,paw:2.6,spread:2.3,claws:{colour:"#f3e9dc",len:1,thick:1.5,wide:2.2}},body:{len:.48,girth:1.2},head:{size:1.3,muzzle:.7,nose:2}}),e=U("tail","pelvis",t.root,{len:.05,r:.016,pitch:.2,blunt:.4,tip:0,colours:{coat:ce,tip:ce}});return D("mole-baby",t.body,t.skull,[...t.legs,e,qt(t,.8,"#f3e9dc",.6)],Se({lively:1.3,tails:[e.chain]}))},young(){const t=$t(ct,{body:{len:.66,girth:1.15}}),e=U("tail","pelvis",t.root,{len:.07,r:.016,pitch:.2,blunt:.4,tip:0,colours:{coat:ce,tip:ce}});return D("mole-young",t.body,t.skull,[...t.legs,e,qt(t,1.1,"#f3e9dc",.8)],Se({lively:1.1,tails:[e.chain]}))},adult(){const t=$t(ct,{fore:{len:.28,thick:2.6,paw:3.8,spread:2.5},hind:{len:.26,thick:2.2},body:{len:.78,girth:1.6,hump:.6,neckThick:1.1},head:{size:1.2,muzzle:1}}),e=U("tail","pelvis",t.root,{len:.08,r:.018,pitch:.3,blunt:.4,tip:0,colours:{coat:ce,tip:ce}});return D("mole-adult",t.body,t.skull,[...t.legs,e,qt(t,1.9,"#f3e9dc",1.2)],Se({tails:[e.chain]}),{cones:[...Wo(t.P,8,.05,ce),...he(t.P,"#cfc6d6",.9)]})},legend(){const t="#d3dae2",e="#5d646d",a="#ffd98a",o="#5c4630",s="#c9b99a",r={...ct,coat:"#463f54",belly:"#584f68",upper:"#463f54",mid:"#463f54",eye:"#463f54"},n=$t(r,{fore:{len:.34,thick:2.8,paw:4.4,spread:2.6,knob:1.2,band:{colour:e,at:.1,r:.04}},hind:{len:.3,thick:2.4,claws:{colour:t,len:1.4,thick:1.6}},body:{len:.9,girth:1.9,hump:1,neck:[0,.12],neckThick:1.15},head:{size:1.35,muzzle:1.1}}),i=n.R,l=n.P,c=U("tail","pelvis",n.root,{len:.1,r:.02,pitch:.3,blunt:.4,tip:0,colours:{coat:ce,tip:ce}}),d=[1,2].flatMap(p=>W(i[p],Z[p],{n:3,a0:.2,a1:1.3,long:.07,sweep:.5,droop:0,r:.085,flat:.8,sides:5,jitter:.5,colour:m=>m%2?o:"#6f563a",tip:()=>"#7a6040"})),f=[1,2].flatMap(p=>W(i[p],Z[p],{n:3,a0:1,a1:1.9,long:.2,sweep:.7,droop:.7,r:.014,sides:3,jitter:.6,colour:()=>s})),g=[{from:2.45,to:4.9,round:[0,1.3],lames:4,thick:.024,step:.014,colour:"#8a929c",rim:e,runes:{colour:a}}];return D("mole-legend",n.body,n.skull,[...n.legs,c,qt(n,2.6,t,1.5,r.belly)],Se({lively:.75,tails:[c.chain]}),{cones:[...d,...f,...Wo(l,11,.085,"#ffb8c8",!0),...he(l,"#cfc6d6",1.3)],armour:g})}},Io=(t,e)=>["L","R"].map((a,o)=>{const s=t.legs.find(i=>i.bones[0]==="shoulder"+a),r=t.duty,n=o?-1:1;return{bone:"spade"+a,rot:i=>{const l=((i+s.phase)%1+1)%1,c=l<r?2*l/r-1:1-2*(l-r)/(1-r);return[0,n*e*c,l<r?0:-n*.12*Math.sin(Math.PI*(l-r)/(1-r))]}}}),jt=t=>()=>{const e=t();return e.gait.lie={fore:[-.3,.1,.1]},e.gait.sleep="sphinx",e.gait.paces.walk.extra=Io(e.gait.paces.walk,.22),e.gait.paces.run.extra=Io(e.gait.paces.run,.4),e},Vi={id:"mole",heights:[45,67,95,323],plans:{baby:jt(Bt.baby),young:jt(Bt.young),adult:jt(Bt.adult),legend:jt(Bt.legend)}},Kt="#3a2e28",Ji="#1f1815",va="#ebe4d2",Xa="#cfc6b0",Ie={coat:va,belly:"#d8cfba",mask:Kt,muzzle:Kt,nose:"#17110f",upper:va,mid:Kt,sock:Kt},Vt={fore:[-1.35,2.5,.2],hind:[-.95,2.2,-1.25]},Jt=(t,e)=>{const a=ae({C:t,hind:{len:1,thick:1,...e.hind},fore:{len:1,thick:.95,...e.fore},body:{len:.98,girth:1.4,deep:1.12,tuck:1.02,neck:[.15,.13],neckThick:1.3,white:.2,...e.body},head:{size:1.05,muzzle:1,muzzleWide:1.05,muzzleDeep:1.3,dome:1.05,cheek:0,eye:1,...e.head,ear:{shape:"long",tall:.6,wide:1.1,splay:1.3,lean:.6,at:[.01,-.03,-.01],back:t.mask??t.coat,inner:"#c9a79a",...e.ear}}});return{...a,legs:Ye(a.legs,{colour:Ji})}},Yt=(t,e)=>U("tail","pelvis",t.root,{len:.12,r:.04,pitch:-1.1,tip:0,blunt:.4,sides:5,colours:{coat:e.coat,tip:e.coat}}),Zt=(t,e={})=>[1,2,3,4].flatMap(a=>W(t[a],Z[a],{n:5,a0:.2,a1:2.5,long:.1,sweep:.55,droop:.25,r:.075,jitter:.2,lock:!0,colour:o=>o%2?Xa:va,tip:()=>Xa,...e})),Yi={baby(){const t={...Ie,mask:"#4a3a32",muzzle:"#4a3a32"},e=Jt(t,{hind:{len:.72,thick:1.15},fore:{len:.72,thick:1.1},body:{len:.62,girth:1.25,neck:[.1,.09],neckThick:1.1},head:{size:1.3,muzzle:.7,muzzleDeep:1.1,eye:1.5},ear:{tall:1}}),a=Yt(e,t);return D("ram-baby",e.body,e.skull,[...e.legs,a],X({lively:1.3,lie:Vt,tails:[a.chain]}),{cones:Zt(e.R,{n:4,long:.06,r:.055})})},young(){const t=Jt(Ie,{hind:{len:1,thick:.9},fore:{len:1,thick:.86},body:{len:.88,girth:1.2},head:{size:1}}),e=Yt(t,Ie);return D("ram-young",t.body,t.skull,[...t.legs,e,Be(t.P,{len:.17,r:.026,p0:.9,curl:1.3,out:[.5,.4],n:6})],X({lively:1.1,lie:Vt,tails:[e.chain]}),{cones:Zt(t.R,{n:4,long:.07,r:.06})})},adult(){const t=Jt(Ie,{body:{girth:1.5,deep:1.18,neckThick:1.5},head:{size:1.12}}),e=t.R,a=Yt(t,Ie),o=Be(t.P,{len:.52,r:.042,p0:.75,curl:5.3,out:[1.1,.25],tighten:.55,n:20,tip:"#b9a98c"}),s=W(e[5],"neck",{n:5,a0:.8,a1:3,long:.14,sweep:.4,droop:.5,r:.075,lock:!0,colour:()=>va,tip:()=>Xa});return D("ram-adult",t.body,t.skull,[...t.legs,a,o],X({lie:Vt,tails:[a.chain]}),{cones:[...Zt(e),...s]})},legend(){const t="#e9a0ff",e="#8a5a24",a="#e2b660",o="#9a9488",s={...Ie,coat:"#cfc8b8",belly:"#a8a294",mask:"#2e2623",muzzle:"#6e665e",upper:"#cfc8b8",eyes:[{colour:t,glow:!0},{colour:"#e3e6e6"}]},r=Jt(s,{hind:{len:1.15,thick:1.1,knob:1.3},fore:{len:1.15,thick:1.05,knob:1.3},body:{len:1.05,girth:1.55,deep:1.25,hump:.5,neck:[.14,.17],neckThick:1.55},head:{size:1.3,muzzle:1.15,muzzleDeep:1.45,eye:1.2},ear:{torn:-1}}),n=r.R,i=r.P,l=Yt(r,s),c=Be(i,{len:.86,r:.06,p0:.75,curl:9.2,out:[1.15,.4],tighten:.62,n:34,colour:"#6a5a48",ridge:"#9a8a70",tip:"#d9cdb0",glow:t,broken:{side:-1,at:.62},bands:{colour:a,at:[.14,.26,.38]}}),d=[...Zt(n,{long:.19,droop:.6,r:.085,colour:v=>v%2?o:"#cfc8b8",tip:()=>o}),...W(n[5],"neck",{n:5,a0:.8,a1:3,long:.22,sweep:.35,droop:.65,r:.085,lock:!0,colour:()=>"#cfc8b8",tip:()=>o})],f=[{at:i(0,-.04,.2),rx:.03,ry:.03,tip:i(0,-.19,.15),bone:"head",colour:"#cfc8b8",tipColour:o,split:.5,bulge:.7,up:[0,0,1]}],g=n[5].at,p=go("neck",g,n[6].at,{at:.3,r:n[5].rx*1.12,ry:n[5].ry*1.12,wide:.05,colour:"#5f7a4a"}),m=W({at:g,rx:n[5].rx*1.2,ry:n[5].ry*1.2},"neck",{n:5,a0:.3,a1:2.8,long:.07,sweep:.2,droop:.1,r:.03,colour:()=>"#b56ad0",tip:()=>"#e9a0ff"}),h=g[1]-n[5].ry*1.35,u=g[2]+.06,b=[{at:[0,h,u],rx:.055,ry:.055,tip:[0,h-.1,u],bone:"neck",colour:a,split:.85,bulge:.9,up:[0,0,1],sides:6},{at:[0,h,u],rx:.055,ry:.055,tip:[0,h+.06,u-.01],bone:"neck",colour:a,up:[0,0,1],sides:6}],y=[{from:1.2,to:4.3,round:[0,1.5],lames:3,thick:.024,step:.014,colour:e,rim:a,runes:{colour:t}}];return D("ram-legend",r.body,r.skull,[...r.legs,l,c,p],X({lively:.75,lie:Vt,tails:[l.chain]}),{cones:[...d,...f,...m,...b],armour:y})}},Zi={id:"ram",heights:[54,89,147,328],plans:Yi};function Ns(t,e,a={}){const{colour:o="#f3ead6",n:s=3,a0:r=.45,a1:n=1.5,r:i=.014,from:l=1,to:c=4}=a,d=[];for(let f=l*2;f<=c*2;f++){const g=t[Math.floor(f/2)],p=t[Math.ceil(f/2)],m=(y,v)=>(y+v)/2,h=[0,1,2].map(y=>m(g.at[y],p.at[y])),u=m(g.rx,p.rx),b=m(g.ry,p.ry);for(const y of[1,-1])for(let v=0;v<s;v++){const k=r+(n-r)*((v+f%2*.5+(f*3+v)%3*.12)/s),x=Math.sin(k)*y,C=Math.cos(k),w=[h[0]+x*u*.97,h[1]+C*b*.97,h[2]+((v*5+f)%3-1)*.008];d.push({at:w,rx:i,ry:i,tip:[w[0]+x*.012,w[1]+C*.012,w[2]],bone:e[Math.floor(f/2)],colour:o,bulge:.9,split:.5,up:[0,0,1],sides:5})}}return d}const pt=(t,e,a=1)=>({at:[0,t[1].at[1]+t[1].ry*.05,t[1].at[2]-.012],rx:t[1].rx*.8*a,ry:t[1].ry*.86*a,tip:[0,t[0].at[1],t[0].at[2]-.012],bone:"pelvis",colour:e,bulge:.78,split:.55,up:[0,1,0],sides:8}),Ws="#120e0c",Xi="#241b15",fa="#f6f1e6",Da={coat:"#b56f38",belly:fa,nose:Ws,upper:"#b56f38",mid:"#a2612f",sock:"#8a5228"},Xt={fore:[-1.35,2.5,.2],hind:[-.95,2.2,-1.25]},Qt=(t,e)=>{const a=ae({C:t,hind:{len:1.36,thick:.52,...e.hind},fore:{len:1.4,thick:.5,...e.fore},body:{len:.92,girth:.96,deep:1.02,tuck:.74,arch:.3,neck:[.3,.13],neckThick:.82,white:.4,...e.body},head:{size:1.08,muzzle:.95,muzzleWide:.9,cheek:0,eye:1.6,nose:1.2,...e.head,ear:{shape:"long",tall:1.25,wide:1.3,splay:.6,lean:.25,back:t.coat,inner:"#f0dccb",tip:"#3a2a20",...e.ear}}});return{...a,legs:Ye(a.legs,{colour:Xi})}},Qi={baby(){const t={...Da,coat:"#a8663a",upper:"#a8663a",mid:"#a8663a"},e=Qt(t,{hind:{len:.95,thick:.62},fore:{len:.98,thick:.6},body:{len:.62,girth:.9,neck:[.17,.09],neckThick:.9},head:{size:1.3,muzzle:.7,eye:2},ear:{tall:1.3}});return D("roe-baby",e.body,e.skull,e.legs,Me({lively:1.3,lie:Xt}),{cones:Ns(e.R,Z,{colour:fa,r:.012})})},young(){const t=Qt(Da,{hind:{len:1.25,thick:.5},fore:{len:1.28,thick:.48},body:{len:.85,girth:.88},head:{size:1.02}});return D("roe-young",t.body,t.skull,[...t.legs,ge(t.P,{kind:"spike",size:.26,spread:.3,lean:.3})],Me({lively:1.1,lie:Xt}),{cones:[pt(t.R,fa)]})},adult(){const t={...Da,muzzle:"#8a5228"},e=Qt(t,{body:{girth:1.02,deep:1.1,neckThick:.95}});return D("roe-adult",e.body,e.skull,[...e.legs,ge(e.P,{kind:"roe",size:.62,spread:.4,lean:.35,r:.026,colour:"#a08a66"})],Me({lie:Xt}),{cones:[pt(e.R,fa,1.1)]})},legend(){const t="#9df07a",e="#e9e4d6",a="#3b3a35",o="#4f7a3a",r=Qt({coat:"#93795e",back:"#6f5b47",belly:"#efe9dc",muzzle:"#b9b2a6",nose:Ws,upper:"#93795e",mid:"#7a6450",sock:"#54463a",eyes:[{colour:t,glow:!0},{colour:t,glow:!0}]},{hind:{len:1.62,thick:.56,knob:1.35,band:{colour:"#c4553a",at:.3,r:.05}},fore:{len:1.7,thick:.54,knob:1.35,band:{colour:"#4f8fb0",at:.3,r:.05}},body:{len:1,girth:1,deep:1.25,tuck:.6,hump:.5,neck:[.4,.17],neckThick:1},head:{size:1.2,muzzle:1.1,eye:1.5},ear:{tall:1.5,torn:1}}),n=r.R,i=ge(r.P,{kind:"roe",size:.95,spread:.55,lean:.4,r:.034,colour:"#6f6a4c",tip:"#d9d2b8",glow:t,moss:{colour:o,tip:"#7ba24c"},tines:[...vo.roe,[.2,[.8,.5,.5],.2],[.34,[-.6,.6,.6],.2],[.6,[1,.6,-.2],.24],[.86,[-.4,1,.3],.2],[.9,[.6,.9,.5],.18]]}),l=W(n[5],"neck",{n:5,a0:1.1,a1:3.05,long:.17,sweep:.35,droop:.6,r:.06,lock:!0,colour:()=>"#efe9dc",tip:()=>"#b9b2a6"}),c=[2,3,4].flatMap(f=>W(n[f],Z[f],{n:3,a0:.5,a1:1.5,long:.09,sweep:.5,droop:.7,r:.05,flat:.4,colour:()=>o,tip:()=>"#7ba24c"})),d=[{from:1.3,to:4.3,round:[0,1.5],lames:3,thick:.02,step:.01,colour:e,rim:a,runes:{colour:t}}];return D("roe-legend",r.body,r.skull,[...r.legs,i],Me({lively:.75,lie:Xt}),{cones:[pt(n,"#efe9dc",1.1),...l,...c],armour:d})}},en={id:"roe",heights:[51,78,115,363],plans:Qi};function tn(t){const{at:e,turns:a=2,r:o=.09,coil:s=.11,high:r=.06,tower:n=0,colour:i,inlay:l,stars:c,ridge:d,lip:f,steps:g=9}=t,p=[Math.cos(n*1.35)*.9,Math.sin(n*1.35),-.25*n-.1],m=Math.hypot(...p),h=p.map(T=>T/m),u=[0,0,1],b=u[0]*h[0]+u[1]*h[1]+u[2]*h[2],y=u.map((T,N)=>T-h[N]*b),v=Math.hypot(...y),k=y.map(T=>T/v),x=[h[1]*k[2]-h[2]*k[1],h[2]*k[0]-h[0]*k[2],h[0]*k[1]-h[1]*k[0]],C=Math.round(a*g),w=[],P=[],M=[];for(let T=0;T<=C;T++){const N=T/C,F=Math.pow(1-N*.93,1.25),E=-.9+N*a*Math.PI*2,S=s*F,L=e.map((H,I)=>H+h[I]*r*(1-F)+S*(k[I]*Math.cos(E)+x[I]*Math.sin(E))),z=[0,1,2].map(H=>k[H]*Math.cos(E)+x[H]*Math.sin(E)),O=[0,1,2].map(H=>-k[H]*Math.sin(E)+x[H]*Math.cos(E));if(w.push({at:L,rx:o*F,ry:o*F,bone:"shell",colour:T===0&&f?f:i(N,T),up:z}),P.push({at:L.map((H,I)=>H+z[I]*o*F*.96),rx:o*F*.16,ry:o*F*.16,bone:"shell",colour:l,up:z}),d&&T%d.every===1&&F>.2&&M.push({at:L.map((H,I)=>H+z[I]*o*F*.9),rx:o*F*.5,ry:o*F*.16,tip:L.map((H,I)=>H+z[I]*o*F*(1.5+(d.long??0))-O[I]*o*F*.3),bone:"shell",colour:d.colour,tipColour:d.tip??d.colour,split:.6,up:O,sides:4}),c&&F>.15)for(let H=0;H<c.n;H++){const I=Math.sin(T*12.9898+H*78.233)*43758.5453,j=I-Math.floor(I),Y=j*Math.PI*2,R=[0,1,2].map(G=>z[G]*Math.cos(Y)+h[G]*Math.sin(Y));j>.28&&M.push({at:L.map((G,A)=>G+R[A]*o*F*.93),rx:o*F*.15*(.5+j),ry:o*F*.15*(.5+j),tip:L.map((G,A)=>G+R[A]*o*F*1.1),bone:"shell",colour:c.colour,glow:!0,up:O,sides:4})}}return{lofts:[{sides:8,up:[0,1,0],rings:w},...l?[{sides:4,up:[0,1,0],rings:P}]:[]],cones:M}}function ea(t,e){const{len:a=1,fat:o=1,C:s,stalk:r=1,eye:n=1,frill:i=0,shell:l,gait:c={}}=e,d=k=>k*a,f=[["root",[0,0,0],null],["tailb",[0,.03,d(-.2)],"root"],["mid",[0,.04,d(0)],"root"],["front",[0,.06,d(.17)],"mid"],["head",[0,.12*o,d(.25)],"front"],["shell",[0,.1*o,d(-.03)],"mid"]],g=k=>k<-.5?s.sole:s.skin,p=[[-.36,.014,.008,.006,"tailb"],[-.27,.03,.06,.024,"tailb"],[-.1,.045,.1,.04,"tailb"],[.07,.05,.098,.046,"mid"],[.18,.075,.072,.052,"front"],[.245,.125,.056,.05,"head"],[.3,.14,.04,.036,"head"],[.33,.14,.012,.012,"head"]].map(([k,x,C,w,P])=>({at:[0,x*o,d(k)],rx:C*o,ry:w*o,bone:P,colour:g})),m=[{sides:8,up:[0,1,0],rings:p}],h=[],u=[0,.15*o,d(.265)];for(let k=0;k<i;k++)for(const x of[1,-1]){const C=-.22+k/Math.max(1,i-1)*.36;h.push({at:[.08*o*x,.035*o,d(C)],rx:.03*o,ry:.01*o,tip:[.125*o*x,.012,d(C-.015)],bone:C<-.05?"tailb":"mid",colour:s.skin,tipColour:s.frill??s.sole,split:.93,up:[0,0,1],sides:4})}for(const[k,x]of[[1,"L"],[-1,"R"]]){const C=[.028*o*k,u[1]+.02*o,u[2]],w=.14*r,P=[C[0]+.02*k*r,C[1]+w*.55,C[2]+w*.12],M=[C[0]+.045*k*r,C[1]+w,C[2]+w*.18];f.push([`stalk${x}1`,C,"head"],[`stalk${x}2`,P,`stalk${x}1`]),m.push({sides:5,up:[0,0,1],rings:[{at:C,rx:.016*o,ry:.016*o,bone:`stalk${x}1`,colour:s.skin},{at:P,rx:.012*o,ry:.012*o,bone:`stalk${x}1`,colour:s.skin},{at:M,rx:.011*o,ry:.011*o,bone:`stalk${x}2`,colour:s.skin}]}),m.push(...ft(`stalk${x}2`,[M[0],M[1]+.012*n,M[2]],{r:.024*n*o,colour:s.eye,glow:!!s.lit,sides:6}).lofts),h.push({at:[.02*o*k,.13*o,d(.31)],rx:.008*o,ry:.008*o,tip:[.05*o*k,.115*o,d(.31)+.05*o],bone:"head",colour:s.skin,up:[0,1,0],sides:3})}const b=tn({at:[0,(.1+l.lift)*o,d(-.04)],...l}),y=e.sway??.12,v=Math.PI*2;return{name:t,bones:f,lofts:[...m,...b.lofts,...e.lofts??[]],cones:[...h,...b.cones,...e.cones??[]],armour:e.armour??[],anchors:{neck:4,skull:5},gait:{type:"glide",seconds:1.6,root:"root",bob:0,legs:[],sleep:"shell",...c,extra:[{bone:"tailb",pos:k=>[0,.004*Math.sin(v*2*k),.012*a*Math.sin(v*2*k)]},{bone:"mid",pos:k=>[0,.004*Math.sin(v*2*k+1.5),.01*a*Math.sin(v*2*k+1.5)]},{bone:"front",pos:k=>[0,.004*Math.sin(v*2*k+3),.012*a*Math.sin(v*2*k+3)]},{bone:"shell",rot:k=>[.035*Math.sin(v*2*k+2),0,.05*Math.sin(v*k)]},{bone:"head",rot:k=>[.05*Math.sin(v*k+1),.08*Math.sin(v*k),0]},...["L","R"].flatMap((k,x)=>[{bone:`stalk${k}1`,rot:C=>[y*Math.sin(v*C+x*2.2),0,y*.8*Math.sin(v*C*2+x*1.3)]},{bone:`stalk${k}2`,rot:C=>[y*1.3*Math.sin(v*C+x*2.2+.9),0,y*Math.sin(v*C*2+x*1.3+.8)]}])]}}}const Uo={skin:"#9c8a78",sole:"#c9b9a4",eye:"#17120f"},Oa=(t,e,a=2)=>(o,s)=>Math.floor(s/a)%2?t:e,an={baby:()=>ea("snail-baby",{len:.8,fat:1.15,C:{skin:"#c9bba8",sole:"#e3d8c6",eye:"#17120f"},stalk:1.1,eye:1.7,shell:{lift:0,turns:1.1,r:.075,coil:.06,high:.03,colour:()=>"#ece4cf"}}),young:()=>ea("snail-young",{C:Uo,stalk:1.2,eye:1.2,shell:{lift:.035,turns:2.1,r:.1,coil:.1,high:.05,colour:Oa("#d99632","#f0c56a",3)}}),adult:()=>ea("snail-adult",{C:{...Uo,frill:"#e9dcc6"},stalk:2,eye:1.2,frill:5,shell:{lift:.07,turns:3.3,r:.125,coil:.14,high:.3,tower:.75,colour:Oa("#c9811f","#6e4320",3),ridge:{colour:"#f0c56a",tip:"#fff0c0",every:3,long:.5}}}),legend(){const t="#1b2452",e="#2a3472",a="#e9b949",o="#f4f8ff",s={skin:"#8a8a8c",sole:"#b6b6b4",frill:"#d6d6d2",eye:"#bfe6ff",lit:!0},r=[{on:0,from:3.3,to:5.5,round:[0,1.3],lames:3,thick:.014,step:.008,colour:t,rim:a,runes:{colour:o,size:.7}}];return ea("snail-legend",{len:1.15,fat:1.25,C:s,stalk:3.4,eye:1.1,frill:7,sway:.09,shell:{lift:.09,turns:4.2,r:.17,coil:.2,high:.5,tower:.85,steps:10,colour:Oa(t,e,4),inlay:a,stars:{n:4,colour:o}},armour:r,gait:{seconds:2.4}})}},on={id:"snail",heights:[35,54,73,222],plans:an},Is="#2a1c18",Ga="#e9b949",ta={coat:"#b8521f",belly:"#f6efe4",nose:Is,upper:"#b8521f",mid:"#a4471a",sock:"#8a3a15"},$o={coat:"#a3441a",under:"#7e3212",tip:"#c96a2c"},aa=(t,e)=>ae({C:t,hind:{len:.5,thick:1.5,foot:1.6,...e.hind},fore:{len:.38,thick:1.15,...e.fore},body:{len:.62,girth:.98,deep:1,tuck:.95,arch:1.2,rump:1.25,neck:[.09,.08],neckThick:1.1,white:.55,...e.body},head:{size:1.08,muzzle:.5,muzzleWide:1.2,muzzleDeep:1.15,dome:1.1,wide:1.02,cheek:0,eye:1.75,eyeAt:[.002,.008,-.015],...e.head,ear:{tall:.8,wide:.85,back:t.coat,...e.ear}}}),Ha=(t,e,a)=>[1,-1].map(o=>({at:t(.07*o,.17,.012),rx:.02+.004*e,ry:.016,tip:t(.085*o,.17+.1*e,0),bone:o>0?"earL":"earR",colour:a,bulge:.75,split:.45,up:[0,0,1],sides:5})),sn={baby(){const t={...ta,coat:"#c06a3a",upper:"#c06a3a",mid:"#c06a3a"},e=aa(t,{hind:{len:.36,thick:1.7},fore:{len:.3,thick:1.4},body:{len:.5,girth:1,arch:.7,neck:[.05,.06]},head:{size:1.3,eye:2},ear:{tall:.7,wide:1.1,back:"#e6a58f"}}),a=U("tail","pelvis",e.root,{len:.26,r:.022,pitch:.7,curl:-.9,blunt:.4,tip:0,colours:{coat:t.coat,tip:t.coat}});return D("squirrel-baby",e.body,e.skull,[...e.legs,a],ie({lively:1.3,tails:[a.chain]}))},young(){const t=aa(ta,{body:{len:.6,girth:.86},head:{size:1},ear:{tall:.9}}),e=U("tail","pelvis",t.root,{len:.44,r:.075,pitch:1.45,curl:-.5,plume:!0,bones:5,tip:.18,colours:$o});return D("squirrel-young",t.body,t.skull,[...t.legs,e],ie({lively:1.1,tails:[e.chain]}),{cones:Ha(t.P,.6,ta.mid)})},adult(){const t=aa(ta,{body:{len:.66,girth:1.05,rump:1.3},head:{size:1.1,wide:1.14,cheek:.45},ear:{tall:.95}}),e=U("tail","pelvis",t.root,{len:.84,r:.16,pitch:1.5,curl:-.9,wave:.5,waves:.75,bones:6,plume:!0,tip:.16,colours:$o,spikes:{n:6,colour:"#d9803a",len:.9}});return D("squirrel-adult",t.body,t.skull,[...t.legs,e],ie({tails:[e.chain]}),{cones:[...Ha(t.P,1.6,"#7e3212"),...he(t.P,"#f6efe4",.8)]})},legend(){const t="#ffd76a",e="#4a3220",o=aa({coat:"#a84a1a",back:"#8c8178",belly:"#efe6d8",muzzle:"#d6cdc0",nose:Is,upper:"#a84a1a",mid:"#8c3c14",sock:"#5f2a0f",eyes:[{colour:t,glow:!0},{colour:t,glow:!0}]},{hind:{len:.62,thick:1.45,foot:1.7,knob:1.3,claws:{colour:"#e6dcc8",len:1.1}},fore:{len:.46,thick:1.15,knob:1.3,claws:{colour:"#e6dcc8",len:1}},body:{len:.74,girth:1.12,deep:1.1,rump:1.35,hump:.4,neck:[.1,.1],neckThick:1.25},head:{size:1.2,wide:1.16,cheek:.6},ear:{tall:1,torn:1}}),s=o.P,r=U("tail","pelvis",o.root,{len:1.2,r:.165,pitch:1.5,curl:-1,wave:.6,waves:.75,bones:7,plume:!0,sides:8,tip:.12,colours:{coat:"#b5561f",under:"#7e3212",tip:"#e9a94a"},spikes:{n:8,colour:t,len:.9,glow:"tip"},ring:{colour:Ga,at:.3}}),n=[{from:2.2,to:4.65,round:[0,1.7],lames:3,thick:.02,step:.012,colour:e,rim:Ga,runes:{colour:t}}],i=[{at:s(.008,-.03,.235),rx:.008,ry:.006,tip:s(.008,-.062,.24),bone:"head",colour:Ga,up:[0,0,1],sides:3}];return D("squirrel-legend",o.body,o.skull,[...o.legs,r],ie({lively:.75,tails:[r.chain]}),{cones:[...Ha(s,1.7,"#7e3212"),...i,...he(s,"#efe6d8",1.5)],armour:n})}},rn={id:"squirrel",heights:[42,71,122,403],plans:sn},Us="#1c1512",nn="#2a2019",gt="#eadcc4",ot={coat:"#a9683a",belly:gt,nose:Us,upper:"#a9683a",mid:"#8f5630",sock:"#6e4226"},oa={fore:[-1.35,2.5,.2],hind:[-.95,2.2,-1.25]},sa=(t,e)=>{const a=ae({C:t,hind:{len:1.7,thick:.62,...e.hind},fore:{len:1.85,thick:.6,...e.fore},body:{len:1.2,girth:1.12,deep:1.15,tuck:.8,neck:[.34,.19],neckThick:1.05,white:.35,...e.body},head:{size:1.12,muzzle:1.45,muzzleWide:.95,cheek:0,eye:1.2,...e.head,ear:{shape:"long",tall:.85,wide:1.25,splay:.9,lean:.45,back:t.coat,inner:"#ecd6c2",...e.ear}}});return{...a,legs:Ye(a.legs,{colour:nn})}},ra=(t,e,a={})=>U("tail","pelvis",t.root,{len:.13,r:.032,pitch:-.9,tip:.5,blunt:.2,sides:5,colours:{coat:e.coat,tip:gt},...a}),ln={baby(){const t={...ot,coat:"#b8773f",upper:"#b8773f",mid:"#a76a38",sock:"#8f5630"},e=sa(t,{hind:{len:1.15,thick:.7},fore:{len:1.22,thick:.68},body:{len:.72,girth:.9,deep:.95,neck:[.2,.12],neckThick:.95},head:{size:1.3,muzzle:.85,eye:1.7},ear:{tall:1.15,splay:.7}}),a=ra(e,t,{len:.08});return D("stag-baby",e.body,e.skull,[...e.legs,a],X({lively:1.3,lie:oa,tails:[a.chain]}),{cones:Ns(e.R,Z,{colour:gt})})},young(){const t=sa(ot,{hind:{len:1.6,thick:.56},fore:{len:1.72,thick:.54},body:{len:1.05,girth:.95,deep:1.02,neck:[.32,.16],neckThick:.9},head:{size:1.05,muzzle:1.3}}),e=ra(t,ot);return D("stag-young",t.body,t.skull,[...t.legs,e,ge(t.P,{kind:"fork",size:.5,spread:.7})],X({lively:1.1,lie:oa,tails:[e.chain]}),{cones:[pt(t.R,gt)]})},adult(){const t=sa(ot,{hind:{len:1.75,thick:.68},fore:{len:1.92,thick:.66},body:{len:1.22,girth:1.18,deep:1.25,tuck:.76,hump:.35,neck:[.36,.2],neckThick:1.3},head:{size:1.15,muzzle:1.5}}),e=t.R,a=ra(t,ot),o=[...W(e[5],"neck",{n:4,a0:1.3,a1:3,long:.15,sweep:.3,droop:.6,r:.06,lock:!0,colour:()=>"#6e4226",tip:()=>"#4a2c1a"}),...W(e[6],"neck",{n:3,a0:1.6,a1:3,long:.12,sweep:.3,droop:.6,r:.05,lock:!0,colour:()=>"#6e4226",tip:()=>"#4a2c1a"})];return D("stag-adult",t.body,t.skull,[...t.legs,a,ge(t.P,{kind:"red",size:1.1})],X({lie:oa,tails:[a.chain]}),{cones:[pt(e,gt),...o]})},legend(){const t="#ffe08a",e="#3f6b58",a="#c9a24a",o="#55783a",s={coat:"#cfc6b4",back:"#8d8372",belly:"#f1ece0",muzzle:"#a39a8a",nose:Us,upper:"#bdb3a0",mid:"#9a8f7c",sock:"#5e5548",eyes:[{colour:t,glow:!0},{colour:"#e6e9ea"}]},r=sa(s,{hind:{len:2,thick:.62,knob:1.4,band:{colour:a,at:.35,r:.045}},fore:{len:2.2,thick:.6,knob:1.4,band:{colour:a,at:.35,r:.045}},body:{len:1.3,girth:1.12,deep:1.4,tuck:.55,hump:.9,neck:[.4,.26],neckThick:1.35},head:{size:1.3,muzzle:1.7,eye:1.4},ear:{tall:1,torn:-1}}),n=r.R,i=r.P,l=ra(r,s,{len:.2}),c=ge(i,{kind:"red",size:1.4,spread:1.15,r:.026,colour:"#9c8f78",glow:t,moss:{colour:o,tip:"#86a85a",long:1.5},tines:[...vo.red,[.36,[.9,.5,.3],.2],[.62,[-.3,.8,.9],.22],[.66,[1,.5,-.4],.2],[.95,[.6,1,.4],.16]]}),d=[...W(n[5],"neck",{n:5,a0:1,a1:3.05,long:.3,sweep:.25,droop:.75,r:.075,lock:!0,grow:.6,colour:()=>"#f1ece0",tip:()=>"#a39a8a"}),...W(n[6],"neck",{n:3,a0:1.6,a1:3.05,long:.24,sweep:.2,droop:.8,r:.06,lock:!0,colour:()=>"#f1ece0",tip:()=>"#a39a8a"}),...W(n[4],"chest",{n:2,a0:2.6,a1:3.05,long:.2,sweep:.3,droop:.7,r:.06,lock:!0,colour:()=>"#f1ece0",tip:()=>"#a39a8a"})],f=[{at:i(0,-.03,.2),rx:.03,ry:.03,tip:i(0,-.2,.15),bone:"head",colour:"#f1ece0",tipColour:"#a39a8a",split:.5,bulge:.7,up:[0,0,1]}],g=[{from:1.2,to:4.45,round:[0,1.65],lames:4,thick:.022,step:.012,colour:e,rim:a,runes:{colour:t}}];return D("stag-legend",r.body,r.skull,[...r.legs,l,c],X({lively:.75,lie:oa,tails:[l.chain]}),{cones:[...d,...f],armour:g})}},cn={id:"stag",heights:[64,152,240,386],plans:ln},$s="#16100e",de="#17120f",_a="#e9b949",un=-1,be={coat:"#b9743d",belly:"#f6f0e3",nose:$s,upper:"#b9743d",mid:"#a5642f",sock:"#f0e8d8"},hn={baby(){const t={...be,coat:"#c99a72",upper:"#c99a72",mid:"#c99a72",sock:"#e9dcc8"},e=Ce({C:t,body:{len:.78,girth:.72,arch:.5,neck:[.07,.09],neckThick:1.15,white:.7},legs:{len:.34,thick:1.7},head:{size:1.18,muzzle:.42,eye:1.6}}),a=U("tail","pelvis",e.root,{len:.13,r:.03,pitch:.1,tip:.3,blunt:.3,colours:{coat:t.coat,tip:"#5a4234"}}),o=W(e.body.rings[5],"neck",{n:3,a0:.3,a1:2,long:.07,sweep:.5,r:.04,lock:!0,colour:()=>"#efe3cf"});return D("stoat-baby",e.body,e.skull,[...e.legs,a],xe({lively:1.3,tails:[a.chain]}),{cones:o})},young(){const t=Ce({C:be,body:{len:1.12,girth:.56,arch:.9,neck:[.14,.14],neckThick:.95,white:.72},legs:{len:.4,thick:1.35},head:{size:.94,eye:1.4}}),e=U("tail","pelvis",t.root,{len:.26,r:.034,pitch:-.1,tip:.3,blunt:.3,colours:{coat:be.coat,tip:de}});return D("stoat-young",t.body,t.skull,[...t.legs,e],xe({lively:1.1,tails:[e.chain]}))},adult(){const t=Ce({C:be,body:{len:1.3,girth:.6,arch:1.2,neck:[.3,.1],neckThick:.92,white:.78},legs:{len:.44,thick:1.35},head:{size:1.02,eye:1.5}}),e=U("tail","pelvis",t.root,{len:.5,r:.09,pitch:.6,curl:-.6,tip:.6,plume:!0,colours:{coat:be.coat,tip:de}}),a=[...W(t.body.rings[6],"neck",{n:1,a0:.1,long:.12,sweep:.7,r:.035,colour:()=>be.coat,tip:()=>de}),...W(t.body.rings[5],"neck",{n:1,a0:.1,long:.13,sweep:.7,r:.038,colour:()=>be.coat,tip:()=>de}),...W(t.body.rings[4],"chest",{n:1,a0:.1,long:.09,sweep:.8,r:.03,colour:()=>be.coat,tip:()=>de})];return D("stoat-adult",t.body,t.skull,[...t.legs,e],xe({tails:[e.chain]}),{cones:a})},legend(){const t="#f4f2ec",e={coat:t,belly:"#ffffff",back:"#e3ded2",nose:$s,upper:t,mid:"#e3ded2",sock:"#d8d2c4",eyes:[{colour:"#ff5a3c",glow:!0},{colour:"#ff5a3c",glow:!0}],ear:"#e3ded2"},a="#ff6a4a",o=Ce({C:e,body:{len:1.45,girth:.72,arch:1.5,neck:[.36,.08],neckThick:.98,white:.5},legs:{len:.6,thick:1.2,knob:1.3,claws:{colour:de,len:.9},band:{colour:_a,at:.25,r:.036}},head:{size:1.16,muzzle:.62,eye:1.5,ear:{shape:"round",tall:.62,wide:1.25,at:[.012,-.012,-.005],back:"#e3ded2",inner:"#c98f6e",torn:1}}}),s=o.skull.P,r=[-1,0,1].map((d,f)=>U(`tail${"abc"[f]}`,"pelvis",[.02*d,o.root[1],o.root[2]],{len:.62-.1*Math.abs(d),r:.07,yaw:d*.5,twist:d*.4,pitch:.9-.3*Math.abs(d),curl:-.9,wave:.25,phase:f*2,bones:5,tip:.5,plume:!0,colours:{coat:t,tip:de}})),n=[...W(o.body.rings[4],"chest",{n:5,a0:.2,a1:2.3,long:.22,sweep:.8,droop:.25,r:.042,flat:1,jitter:.15,colour:()=>"#ffffff",tip:()=>de}),...W(o.body.rings[3],"chest",{n:4,a0:.25,a1:2,long:.2,sweep:.85,droop:.2,r:.04,flat:1,jitter:.15,colour:()=>"#ffffff",tip:()=>de})],i=[{from:3.4,to:4.95,round:[0,1.7],side:un,lames:3,thick:.022,step:.012,flare:1,colour:"#d9a531",rim:"#8a6420",runes:{colour:"#ff3b1f",round:[.6,1.7],size:.6,w:.005,max:1}}],l=[{at:s(0,.085,.085),rx:.04,ry:.016,tip:s(0,.23,.07),bone:"head",colour:_a,split:.6,up:[0,0,1]},...[1,-1].map(d=>({at:s(.05*d,.075,.07),rx:.028,ry:.014,tip:s(.075*d,.18,.05),bone:"head",colour:_a,split:.6,up:[0,0,1]})),{at:s(0,.085,.1),rx:.016,ry:.016,tip:s(0,.1,.125),bone:"head",colour:a,glow:!0,up:[0,1,0]}],c=[1,-1].map(d=>({at:s(.03*d,-.005,.2),rx:.006,ry:.006,tip:s(.17*d,-.03,.15),bone:"head",colour:"#ffffff",up:[0,1,0],sides:3}));return D("stoat-legend",o.body,o.skull,[...o.legs,...r],xe({lively:.75,tails:r.map(d=>d.chain)}),{cones:[...n,...l,...c],armour:i})}},dn={id:"stoat",heights:[41,63,88,229],curl:{turn:4.5},plans:hn};function qs(t,e,a){const{rx:o=.16,rz:s=.2,high:r=.12,colour:n,rim:i,seams:l,sides:c=10,rows:d=5}=a,f=h=>h/d*(Math.PI/2)*.97,g=(h,u)=>{const b=h*(Math.PI/2)*.97,y=Math.sin(u)*Math.cos(b),v=Math.cos(u)*Math.cos(b),k=Math.sin(b),x=[y/o,k/r,v/s],C=Math.hypot(...x)||1;return{at:[e[0]+y*o,e[1]+k*r,e[2]+v*s],out:x.map(w=>w/C)}},p=Array.from({length:d+1},(h,u)=>({at:[e[0],e[1]+Math.sin(f(u))*r,e[2]],rx:o*Math.cos(f(u)),ry:s*Math.cos(f(u)),bone:t,up:[0,0,1],glow:!!a.glow,colour:(b,y)=>n(u,b,y)})),m=[{name:a.name??"dome",sides:c,up:[0,0,1],rings:[{...p[0],at:[e[0],e[1]-.012,e[2]],rx:o*.9,ry:s*.9},...p]}];if(i&&m.push({sides:c,up:[0,0,1],rings:[[-.02,.96],[-.006,1.06],[.01,1.06],[.022,.98]].map(([h,u])=>({at:[e[0],e[1]+h,e[2]],rx:o*u+(i.r??0),ry:s*u+(i.r??0),bone:t,up:[0,0,1],colour:i.colour}))}),l){const h=l.w??.007,u=b=>({sides:3,up:[0,1,0],rings:b.map(y=>({at:y.at.map((v,k)=>v+y.out[k]*h*.6),rx:h,ry:h,bone:t,colour:l.colour,glow:!!l.glow,up:y.out}))});for(let b=0;b<(l.n??6);b++){const y=(b+.5)/(l.n??6)*Math.PI*2;m.push(u([.02,.25,.5,.72].map(v=>g(v,y+(v>.4?.12:0)))))}m.push(u(Array.from({length:13},(b,y)=>g(.72,y/12*Math.PI*2)))),m.push(u(Array.from({length:13},(b,y)=>g(.36,y/12*Math.PI*2+.26))))}return{bones:[],cones:[],lofts:m,on:g}}function fn(t,e,a,o){const{r:s=.08,high:r=.04,colour:n,rim:i,gem:l,sides:c=6,up:d=[0,1,0],ry:f=s}=o,g=Math.hypot(...a)||1,p=a.map(u=>u/g),m=e.map((u,b)=>u+p[b]*r),h=[{at:e,rx:s,ry:f,tip:m,bone:t,colour:i??n,tipColour:n,split:.35,up:d,sides:c}];return l&&h.push({at:m.map((u,b)=>u-p[b]*r*.35),rx:s*.28,ry:s*.28,tip:m.map((u,b)=>u+p[b]*r*.5),bone:t,colour:l.colour,glow:!0,up:d,sides:4}),{bones:[],lofts:[],cones:h}}const pn="#7d8f6a",ve={coat:pn,belly:"#e6d79a",nose:"#3a4226",upper:"#6a7c58",mid:"#5b6c4a",sock:"#4c5c3e",eye:"#17140f"},ia=(t,e)=>ae({C:t,hind:{len:.27,thick:2,paw:1.5,spread:2.1,...e.hind},fore:{len:.27,thick:1.9,paw:1.6,spread:2.2,...e.fore},body:{len:.8,girth:1.2,deep:.72,tuck:1.05,neck:[.07,.2],neckThick:.62,white:.6,...e.body},head:{size:.84,muzzle:.42,muzzleWide:1.45,muzzleDeep:1.3,wide:.95,dome:.95,cheek:0,eye:1.35,eyeAt:[0,.006,-.01],nose:.01,...e.head,ear:{shape:"round",tall:.05,wide:.4,back:t.coat,inner:t.coat}}}),na=(t={})=>ni({sleep:"shell",...t,walk:{body:{roll:.05,sway:.05,yaw:.09,bob:.02},...t.walk}}),la=(t,e)=>{const a=t.R,o=[0,a[1].at[1]+.005,(a[1].at[2]+a[4].at[2])/2-.01],s=a[4].at[2]-a[1].at[2];return qs("loin",o,{rx:a[3].rx*(e.wide??1.5),rz:s*(e.long??.72),high:e.high,sides:e.sides??10,rows:e.rows??5,colour:e.colour,rim:e.rim,seams:e.seams,glow:e.glow})},Na=(t,e)=>(a,o,s)=>(a+Math.round((Math.atan2(s,o)/Math.PI+1)*3))%2?t:e,gn={baby(){const t={...ve,coat:"#a3b08a",upper:"#a3b08a",mid:"#93a07a",sock:"#93a07a"},e=ia(t,{hind:{len:.2,thick:2.1,paw:1.7,spread:2.1},fore:{len:.2,thick:2.1,paw:1.8,spread:2.2},body:{len:.56,girth:1.1,neck:[.05,.13],neckThick:.8},head:{size:1.25,eye:1.7}}),a=la(e,{high:.1,colour:Na("#c9a560","#b89250")}),o=U("tail","pelvis",e.root,{len:.07,r:.022,pitch:-.2,tip:0,colours:{coat:t.coat,tip:t.coat}}),s=a.on(.55,0),r=qs("loin",[s.at[0],s.at[1]-.012,s.at[2]-.06],{rx:.12,rz:.12,high:.11,sides:8,rows:4,colour:()=>"#fbf8ee"}),n=Array.from({length:7},(i,l)=>{const c=r.on(.04,l/7*Math.PI*2+.3);return{at:c.at,rx:.03,ry:.012,tip:[c.at[0]+c.out[0]*.012,c.at[1]-.04-.016*(l%2),c.at[2]+c.out[2]*.012],bone:"loin",colour:"#fbf8ee",up:[0,0,1],sides:3}});return D("turtle-baby",e.body,e.skull,[...e.legs,a,r,o],na({lively:1.3,tails:[o.chain]}),{cones:n})},young(){const t=ia(ve,{body:{len:.78,girth:1.08},head:{size:.82}}),e=la(t,{high:.13,colour:Na("#a8843f","#8f6d32"),rim:{colour:"#e6d79a"}}),a=U("tail","pelvis",t.root,{len:.12,r:.026,pitch:-.25,tip:0,colours:{coat:ve.coat,tip:ve.coat}});return D("turtle-young",t.body,t.skull,[...t.legs,e,a],na({lively:1.1,tails:[a.chain]}))},adult(){const t=ia(ve,{hind:{len:.3,thick:2.2,paw:1.6,spread:2.2,claws:{colour:"#e6dcb8",len:1.2,thick:1.4,wide:1.5}},fore:{len:.3,thick:2.2,paw:1.7,spread:2.3,claws:{colour:"#e6dcb8",len:1.4,thick:1.4,wide:1.6}},body:{len:.86,girth:1.3,neck:[.09,.22],neckThick:.7},head:{size:.92,muzzle:.5,muzzleDeep:1.45}}),e=la(t,{high:.27,wide:1.6,colour:Na("#7a5a2a","#9a7636"),rim:{colour:"#e6d79a"}}),a=U("tail","pelvis",t.root,{len:.16,r:.03,pitch:-.25,tip:0,colours:{coat:ve.coat,tip:ve.coat}}),o=[.92,.72,.5].flatMap((r,n)=>[0,Math.PI].filter(i=>n||!i).map(i=>{const l=e.on(r,i);return fn("loin",l.at,[l.out[0],l.out[1]+.6,l.out[2]-.2],{r:.06,ry:.04,high:.075,colour:"#c9a560",rim:"#7a5a2a",up:[0,0,1],sides:5})})),s=Array.from({length:8},(r,n)=>{const i=e.on(0,n/8*Math.PI*2+.2);return{at:i.at,rx:.03,ry:.016,tip:[i.at[0]+i.out[0]*.02,i.at[1]-.07-.02*(n%3),i.at[2]+i.out[2]*.02],bone:"loin",colour:"#4f7a3a",tipColour:"#7ba24c",bulge:.8,split:.5,up:[0,0,1],sides:4}});return D("turtle-adult",t.body,t.skull,[...t.legs,e,...o,a],na({tails:[a.chain]}),{cones:s})},legend(){const t="#2f3a34",e="#3d4a40",a="#a8f0d0",o="#b9722e",s={...ve,coat:"#5b6a48",belly:"#c9ba80",muzzle:"#8a9470",upper:"#4c5a3a",mid:"#3f4c30",sock:"#333f28",eyes:[{colour:a,glow:!0},{colour:"#dfe6e2"}]},r=ia(s,{hind:{len:.36,thick:2.3,paw:1.7,spread:2.2,knob:1.2,claws:{colour:"#d9d2b8",len:1.8,thick:1.6,wide:1.6}},fore:{len:.36,thick:2.3,paw:1.8,spread:2.3,knob:1.2,claws:{colour:"#d9d2b8",len:2,thick:1.6,wide:1.7}},body:{len:.95,girth:1.4,neck:[.14,.26],neckThick:.78},head:{size:1.05,muzzle:.55,muzzleDeep:1.5,eye:1.4}}),n=r.P,i=la(r,{high:.3,wide:1.7,long:.78,rows:6,sides:8,colour:()=>a,glow:!0,rim:{colour:o,r:.012}}),l=U("tail","pelvis",r.root,{len:.2,r:.036,pitch:-.25,tip:0,colours:{coat:s.coat,tip:s.coat}}),c=[{on:"dome",from:1,to:5.9,round:[0,3.2],lames:3,inset:.07,gap:.05,thick:.02,step:0,colour:t,rim:o,runes:{colour:a,size:.5,max:1}},{on:"dome",from:6,to:7,round:[0,3.2],thick:.02,step:0,colour:e,rim:o}],d=[{at:n(0,-.035,.17),rx:.03,ry:.025,tip:n(0,-.24,.12),bone:"head",colour:"#f1eee4",tipColour:"#c9c6ba",bulge:.8,split:.45,up:[0,0,1],sides:5},...[1,-1].flatMap(f=>[{at:n(.05*f,.085,.11),rx:.016,ry:.012,tip:n(.2*f,.16,-.06),bone:"head",colour:"#f1eee4",bulge:.7,split:.5,up:[0,1,0],sides:4},{at:n(.04*f,-.01,.2),rx:.008,ry:.008,tip:n(.2*f,-.12,.14),bone:"head",colour:"#f1eee4",up:[0,1,0],sides:3}])];return D("turtle-legend",r.body,r.skull,[...r.legs,i,l],na({lively:.75,tails:[l.chain]}),{cones:d,armour:c})}},mn={id:"turtle",heights:[45,69,97,280],plans:gn},Bs={badger:hi,bee:bi,boar:xi,dormouse:Ci,elk:Li,fox:Di,hare:Hi,hedgehog:Wi,ibex:qi,marten:Ki,mole:Vi,ram:Zi,roe:en,snail:on,squirrel:rn,stag:cn,stoat:dn,turtle:mn},bn=["baby","young","adult","legend"],Nl=Object.fromEntries(Object.entries(Bs).map(([t,e])=>[t,bn.map(a=>e.curl?()=>{const o=e.plans[a]();return o.gait.curl=e.curl,o}:e.plans[a])])),Wl=Object.fromEntries(Object.entries(Bs).map(([t,e])=>[t,e.heights])),js={},Ks=["baby","young","adult","legend"],qo=new Map,Il=(t,e,a)=>`${Ks[t]}-walk${e}${a?"-away":""}`;function Ul(t,e){const a=`${t}/${e}`,o=js[a];if(!o)return;let s=qo.get(a);if(!s){const r=atob(o.px),n=new Uint8ClampedArray(r.length);for(let i=0;i<r.length;i++)n[i]=r.charCodeAt(i);qo.set(a,s={w:o.w,h:o.h,rgba:n})}return s}const $l=(t,e)=>vn.has(`${t}/${Ks[e]}`),vn=new Set(Object.keys(js).map(t=>t.slice(0,t.indexOf("-"))));function yn(t){const e=new Uint8Array(2048);e.set(t.subarray(0,1024));for(let a=0;a<256;a++){const o=a*4,s=(t[o]*.3+t[o+1]*.55+t[o+2]*.15)/255;e.set([Math.round(90+s*150),Math.round(145+s*105),Math.round(180+s*75),t[o+3]],1024+o)}return e}let yo=!1;function ql(t){yo=t}const Bl=()=>yo,wn=t=>{yo||(t.image.data=null),t.onUpdate=null};function Qa(t,e,a,o=!1){const s=new ya(t,e,a,o?Ba:cs,us);return o&&(s.unpackAlignment=1),s.magFilter=pe,s.minFilter=pe,s.generateMipmaps=!1,s.flipY=!1,s.colorSpace=hs,s.needsUpdate=!0,s.onUpdate=wn,s}function Vs(t){const e=new ya(yn(t),yt,2,cs,us);return e.magFilter=e.minFilter=pe,e.generateMipmaps=!1,e.flipY=!1,e.colorSpace=hs,e.needsUpdate=!0,e}let kn=null;const eo=()=>kn??=Vs(new Uint8Array(yt*4));function jl(t,e,a,o){const s=Ya(t),[r,n]=to(s?.idx??t,s?.pal??null,e,a,o);return{tex:r,pal:n,indexed:!!s}}function to(t,e,a,o,s){const r=pa(Qa(t,a,o,!!e),s);if(!e)return[r,eo()];const n=pa(Vs(e),s);return r.addEventListener("dispose",()=>n.dispose()),[r,n]}function xn(t,e="props"){const[a,o]=to(t.albedo,t.albedoPal,t.width,t.height,e),[s,r]=to(t.normal,t.normalPal,t.width,t.height,e);return{albedo:a,normal:s,albedoPal:o,normalPal:r,indexed:new ee(t.albedoPal?1:0,t.normalPal?1:0),frames:t.frames}}function Kl(t){const e=n=>{const i=n.image;return[i?.width??0,i?.height??0]},[a,o]=e(t.albedo),[s,r]=e(t.normal);return Eo(a,o,t.indexed.x>.5)+Eo(s,r,t.indexed.y>.5)+(t.indexed.x>.5?1024:0)+(t.indexed.y>.5?1024:0)}const zn=(t="uAlbedo",e="uNormal")=>`
uniform sampler2D ${t}, ${e}, ${t}Pal, ${e}Pal;
uniform vec2 uIndexed;
vec4 albedoAt(vec2 q) { vec4 c = texture2D(${t}, q); return uIndexed.x > 0.5 ? texelFetch(${t}Pal, ivec2(int(c.r * 255.0 + 0.5), 0), 0) : c; }
vec4 normalAt(vec2 q) { vec4 c = texture2D(${e}, q); return uIndexed.y > 0.5 ? texelFetch(${e}Pal, ivec2(int(c.r * 255.0 + 0.5), 0), 0) : c; }
`,Sn=(t,e="uAlbedo",a="uNormal")=>({[e]:{value:t.albedo},[a]:{value:t.normal},[e+"Pal"]:{value:t.albedoPal},[a+"Pal"]:{value:t.normalPal},uIndexed:{value:t.indexed}});function Mn(t,e,a="uAlbedo",o="uNormal"){t[a].value=e.albedo,t[o].value=e.normal,t[a+"Pal"].value=e.albedoPal,t[o+"Pal"].value=e.normalPal,t.uIndexed.value=e.indexed}function Vl(t){const e=new Uint8Array(4),a={uv:[0,0,0,0],w:1,h:1,pad:0};return{albedo:Qa(e,1,1),normal:Qa(new Uint8Array(4),1,1),albedoPal:eo(),normalPal:eo(),indexed:new ee(0,0),frames:Array.from({length:t},()=>a),grounds:[]}}const Jl=(t,e=2048)=>xn(si(t,e));function Cn(t){return{value:t?new $(1,t.lightFloor,t.lightTint,t.lightRim):new $}}const Fn=`
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
  for (int i = 0; i < ${ke}; i++) {
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
`,Pn=3,ao={uCastMap:{value:null},uCastWin:{value:new $(0,0,1,0)}},Ln=`
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
`;class Yl{constructor(e=160,a=1024){this.size=e,this.res=a,this.rt=new ha(a,a,{minFilter:Mo,magFilter:Mo,depthBuffer:!1,stencilBuffer:!1,generateMipmaps:!1});const o=e/2;this.cam=new ls(-o,o,o,-o,1,2e3),this.cam.up.set(0,0,-1),this.cam.layers.set(Pn),ao.uCastMap.value=this.rt.texture}size;res;rt;cam;clear=new io;render(e,a,o,s,r){const n=ao.uCastWin.value;if(!r){n.w=0;return}const i=this.size/this.res,l=Math.round(o/i)*i,c=Math.round(s/i)*i;this.cam.position.set(l,1e3,c),this.cam.lookAt(l,0,c),this.cam.updateMatrixWorld();const d=$e.uBend.value.x,f=a.background,g=e.getRenderTarget(),p=e.getClearAlpha();e.getClearColor(this.clear),$e.uBend.value.x=0,a.background=null,e.setRenderTarget(this.rt),e.setClearColor(16777215,1),e.clear(!0,!1,!1),e.render(a,this.cam),e.setRenderTarget(g),e.setClearColor(this.clear,p),a.background=f,$e.uBend.value.x=d,n.set(l-this.size/2,c+this.size/2,this.size,1)}dispose(){this.rt.dispose()}}class re{lo=1/0;hi=-1;range={start:0,count:0};touch(e){e<this.lo&&(this.lo=e),e>this.hi&&(this.hi=e)}flush(e){if(this.hi>=this.lo){const a=e.itemSize,o=this.range,s=e.updateRanges[0];let r=this.lo*a,n=(this.hi+1)*a;s&&(r=Math.min(s.start,r),n=Math.max(s.start+s.count,n),e.clearUpdateRanges()),o.start=r,o.count=n-r,e.updateRanges.push(o),e.needsUpdate=!0}this.lo=1/0,this.hi=-1}}const Tn={ramp:["#49141e","#b43216","#ff7826","#fff0af"],contrast:"#77bbee",motion:0,imprint:"scorch",sound:"fire"},An={ramp:["#163b64","#397cbb","#9dd8ed","#f0fbff"],contrast:"#ffffff",motion:1,imprint:"frost",sound:"ice"},En={ramp:["#193116","#467d23","#a7d73a","#f1fac1"],contrast:"#a366bb",motion:2,imprint:"wet",sound:"water"},Rn={ramp:["#302749","#7774b8","#c4c3eb","#f6efff"],contrast:"#94cfed",motion:3,imprint:"charge",sound:"light"},Dn={ramp:["#22254e","#525fbd","#91c3f1","#f2faff"],contrast:"#e6bf78",motion:4,imprint:"charge",sound:"storm"},On={ramp:["#30221d","#81532d","#ce9b55","#f3d9a4"],contrast:"#95b88b",motion:5,imprint:"push",sound:"earth"},Gn={ramp:["#20192f","#674878","#b289c1","#f1d8f5"],contrast:"#b9a2d3",motion:6,imprint:"scorch",sound:"void"},Hn={ramp:["#273426","#518551","#d895b6","#f6dddc"],contrast:"#b1d97d",motion:7,imprint:"bloom",sound:"nature"},_n={ramp:["#173646","#28799c","#6fc9db","#dbf6ee"],contrast:"#b5dce5",motion:2,imprint:"wet",sound:"water"},Nn={ramp:["#41302c","#9b7142","#dcb67a","#f4e1b2"],contrast:"#bba38c",motion:5,imprint:"push",sound:"earth"},Wn={ramp:["#233025","#536542","#a1a66a","#e2d7a6"],contrast:"#c6a26f",motion:7,imprint:"bloom",sound:"nature"},In={ramp:["#283c41","#629298","#abd1cf","#edf2da"],contrast:"#e0d8b1",motion:3,imprint:"push",sound:"wind"},Un={ramp:["#352239","#a65879","#dfad66","#fff0c2"],contrast:"#e598bb",motion:7,imprint:"bloom",sound:"party"},$n={ramp:["#4a3a6a","#d0c8f0","#f4f0ff","#ffffff"],contrast:"#ffe9a8",motion:3,imprint:"bloom",sound:"light"},qn={ramp:["#4a2c06","#c08414","#ffd23c","#fff7c8"],contrast:"#fffbe8",motion:3,imprint:"charge",sound:"light"},Fe={fire:Tn,frost:An,venom:En,moonlight:Rn,storm:Dn,earth:On,shadow:Gn,bloom:Hn,water:_n,sand:Nn,wood:Wn,wind:In,party:Un,rainbow:$n,gold:qn},Bn={id:0,size:1.7,ground:!1},jn={id:1,size:4,ground:!1},Kn={id:2,size:1.1,ground:!1},Vn={id:3,size:2,ground:!0},Jn={id:4,size:3.2,ground:!1},Yn={id:5,size:9,ground:!1},Zn={id:6,size:5,ground:!1},Xn={id:7,size:6,ground:!1},Qn={id:8,size:2,ground:!0},e0={id:9,size:5,ground:!1},t0={id:10,size:2.2,ground:!1},a0={id:11,size:1.1,ground:!1},se={projectile:Bn,burst:jn,beam:Kn,zone:Vn,aura:Jn,pillar:Yn,vortex:Zn,dome:Xn,trap:Qn,eruption:e0,lob:t0,trail:a0},o0=[.25,.45,.65,1],s0=[.6,1.4],r0=[.08,.25],i0=.5,n0=6,l0=.2,c0=[6,18],u0=[.2,.85],h0=128,d0=200,f0=5,p0=256,g0=2048,B={levels:o0,size:s0,halo:r0,secondaryAt:i0,lightCap:n0,lightEase:l0,lightReach:c0,lightStrength:u0,fieldSize:h0,fieldMetres:d0,imprintSeconds:f0,pool:p0,instances:g0},Bo=["frost","scorch","wet","bloom","charge","push"],fe=Object.keys(Fe),jo=Object.keys(se),st=t=>B.levels[Math.max(0,Math.min(3,Math.round(t)))]??.65,rt=(t,e)=>t[0]+(t[1]-t[0])*Math.max(0,Math.min(1,e));function Te(t){return Object.hasOwn(Fe,t)?t:"moonlight"}function Wa(t,e,a,o,s){return Math.max(0,a)/(1+Math.hypot(t-o,e-s)/12)}class m0{constructor(e=B.fieldSize,a=B.fieldMetres){this.size=e,this.metres=a,this.data=new Uint8Array(e*e*8),this.values=new Float32Array(this.data.length),this.cell=a/e}size;metres;data;values;x=0;z=0;cell;ready=!1;ink=0;dirty=!0;publishedActive=!1;work={decayValues:0,publishValues:0,clearValues:0};get active(){return this.publishedActive}index(e,a){return((a%this.size+this.size)%this.size*this.size+(e%this.size+this.size)%this.size)*8}move(e,a){const o=Math.floor(e/this.cell)-this.size/2,s=Math.floor(a/this.cell)-this.size/2;if(!(this.ready&&o===this.x&&s===this.z)){if(!this.ink&&!this.publishedActive){this.x=o,this.z=s,this.ready=!0;return}for(let r=s;r<s+this.size;r++)for(let n=o;n<o+this.size;n++)if(!this.ready||n<this.x||n>=this.x+this.size||r<this.z||r>=this.z+this.size){const i=this.index(n,r);this.work.clearValues+=16;for(let l=i;l<i+8;l++)this.values[l]>0&&this.ink--,(this.values[l]!==0||this.data[l]!==0)&&(this.dirty=!0),this.values[l]=0,this.data[l]=0}this.x=o,this.z=s,this.ready=!0}}decay(e){const a=Math.max(0,e)*255/B.imprintSeconds;if(!(!a||!this.ink)){this.work.decayValues+=this.values.length;for(let o=0;o<this.values.length;o++){const s=this.values[o];this.values[o]=Math.max(0,s-a),s>0&&this.values[o]===0&&this.ink--}this.dirty=!0}}stamp(e,a,o,s,r){const n=Bo.indexOf(s);if(n<0||!(o>0)||!this.ready)return;const i=Math.max(this.x,Math.floor((e-o)/this.cell)),l=Math.min(this.x+this.size-1,Math.floor((e+o)/this.cell)),c=Math.max(this.z,Math.floor((a-o)/this.cell)),d=Math.min(this.z+this.size-1,Math.floor((a+o)/this.cell));for(let f=c;f<=d;f++)for(let g=i;g<=l;g++){const p=Math.hypot((g+.5)*this.cell-e,(f+.5)*this.cell-a),m=Math.max(0,1-p/o)*Math.min(1,Math.max(0,r))*255,h=this.index(g,f)+n,u=this.values[h];this.values[h]=Math.max(u,m),this.values[h]!==u&&(u===0&&this.values[h]>0&&this.ink++,this.dirty=!0)}}publish(){if(!this.dirty)return!1;this.work.publishValues+=this.data.length,this.publishedActive=!1;for(let e=0;e<this.data.length;e++)this.data[e]=Math.round(this.values[e]),this.data[e]&&(this.publishedActive=!0);return this.dirty=!1,!0}at(e,a,o){const s=Math.floor(e/this.cell),r=Math.floor(a/this.cell);return s<this.x||s>=this.x+this.size||r<this.z||r>=this.z+this.size?0:this.values[this.index(s,r)+Bo.indexOf(o)]/255}reset(){(this.ink||this.publishedActive)&&(this.values.fill(0),this.data.fill(0),this.work.clearValues+=this.values.length+this.data.length,this.dirty=!0),this.ink=0,this.publishedActive=!1,this.ready=!1}}const Ko=()=>{const t=pa(new ya(new Uint8Array(B.fieldSize**2*4),B.fieldSize,B.fieldSize),"fx");return t.minFilter=t.magFilter=pe,t.wrapS=t.wrapT=Mr,t.generateMipmaps=!1,t.needsUpdate=!0,t},ne={uFxField:{value:Ko()},uFxExtra:{value:Ko()},uFxBox:{value:new $(0,0,B.fieldMetres,B.fieldSize)},uFxOn:{value:0},uFxTime:{value:0},uFxCalm:{value:0},uFxVertex:{value:1}},Js=`
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
`;function Zl(t,e=!1){return t.asleep?.18:t.leashed||t.friendly||t.state==="happy"?.28:e||t.charge||t.leap?1:t.enraged||t.state==="enraged"?.8:.42}const b0={uThermalStrength:{value:0},uThermalColdBrightness:{value:.35},uThermalDangerGain:{value:1}},v0=`
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
`;function Xl(t){return 1/(t.artPixelsPerMetre*(2/t.pixelSize))}function y0(t){const e=t.treeNormals;if(e===!1||e==="0"||e===0)return-1;const a=typeof e=="string"&&/^\d+$/.test(e)?Number(e):0;return a>=1&&a<=255?a:0}const Ql=t=>y0(t)<0?0:1,Re={...b0,uPotionSky:{value:0},uPoolReadability:{value:new URLSearchParams(globalThis.location?.search??"").get("poolreadability")==="1"?1:0},uMoodRim:{value:new $},uRimInset:{value:0},uWitchGlow:{value:0},uWitchLift:{value:0},uRight:{value:new J(1,0,0)},uUp:{value:new J(0,1,0)},uFacing:{value:new J(0,0,1)},uTopFade:{value:0},uCutout:{value:new $(0,0,0,1)},uCutWhole:{value:0},uCutShape:{value:new $(0,.35,0,.2)},uDebugCull:{value:0},uRes:{value:new ee(1,1)},uWitch:{value:new $(0,0,0,0)},uWitchDepth:{value:0},uOcc:{value:new $(.38,6,2.5,1)},uNearCut:{value:0},uCircleBox:{value:new $(0,0,0,0)},uCircleFade:{value:new $(0,0,1,1)},uEdgeDither:{value:0},uHoleHard:{value:0},uCircleKeep:{value:new $(0,0,0,0)},uWholeCull:{value:typeof location<"u"&&new URLSearchParams(location.search).get("wholecull")==="0"?0:1},uParty:{value:Array.from({length:16},()=>new $)},uPartyCol:{value:Array.from({length:16},()=>new J)},uPartyCount:{value:0},uUplight:{value:new $},uTrunkFade:{value:new J(0,.125,.3)},uFindLook:{value:new $},uEyeRgb:{value:new J(1,.8,.35)},uEyeRange:{value:40},uTrunkLook:{value:new ee(.8,.5)},uAreaAvg:{value:1},uSeeDepth:{value:1},uSeeDbg:{value:new $(1,0,1,0)},uCullByPass:{value:new URLSearchParams(globalThis.location?.search??"").get("cullpass")==="0"?0:1},uCullDbg:{value:7},uSeeEarly:{value:1},uSeeTwo:{value:1},uSeeDither:{value:0},uSeeShowA:{value:0},uSeeSolid:{value:0},uDebugTrunks:{value:0},uWind:{value:new $(0,0,1,0)},uLeafJitter:{value:new J(0,0,0)},uTreeNormals:{value:1},uWatch:{value:new $(0,0,9,0)}},it=`
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
${lo}
${oi}${po}${Xr}
${Js}
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
`,w0=`
${zn()}
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
${v0}
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
${fo}
${Js}
varying vec2 vFxBase;
varying vec4 vFxPaint;
varying vec2 vFxInfo;
${Ln}
${Fn}
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
`,nt=w0.replace("void main() {","void spriteMain() {")+`
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
`,k0=-.5;function ec(t){for(const e of t.meshes)e.renderOrder=k0,e.material.depthWrite=!1;return t}const Ia=[],Ua=[],x0={value:new $(1,.85,.35,0)};class tc{constructor(e,a,o={}){this.atlas=e,this.metresPerPixel=a;const s=new ro(1,1);s.translate(0,.5,0),this.geo=new ds,this.geo.index=s.index,this.geo.setAttribute("position",s.getAttribute("position")),this.geo.setAttribute("uv",s.getAttribute("uv")),this.pos=this.size=this.uvs=this.flags=this.glow=void 0,this.grow(64);const r=c=>({...te,...Re,...$e,...ye,...Sn(e),uUnlit:{value:o.unlit?1:0},uIsScenery:{value:o.scenery?1:0},uAppear:this.appearU,uArrivalFade:this.arrivalFade,uFadePass:{value:0},uHasFade:{value:o.fade?1:0},uFlat:{value:o.flat||o.solid?1:0},uLies:{value:o.flat?1:0},...ao,uSilhouette:{value:new $(0,0,0,0)},uWitchLight:Cn(o.witchLight),uWitchHush:{value:0},uFind:{value:o.find?1:0},uRimOn:{value:o.rim?1:0},uTint:o.tint??{value:new $(0,0,0,0)},uShadow:o.shadow?x0:{value:new $(0,0,0,0)},uLegend:{value:o.legend??new $(0,0,0,0)},uSteps:{value:o.steps??0},uLegendFloor:{value:o.legendFloor??0},uLegendAwake:{value:o.legendAwake??0},uGlowGain:o.glowGain??{value:1},uAbsolute:{value:o.absolute?1:0},uLie:{value:o.lie??0},uLean:this.leanU,...c}),n=o.scenery?{blending:no,blendSrc:Fr,blendDst:Cr}:{},i=o.scenery?{stencilWrite:!0,stencilRef:1,stencilFunc:Fo,stencilZPass:Co}:o.unmark?{stencilWrite:!0,stencilRef:0,stencilFunc:Fo,stencilZPass:Co}:{},l=new ue({vertexShader:it,fragmentShader:nt,defines:o.spotSpill?{MUSHROOM_SPOT_SPILL:1}:{},uniforms:r({}),depthTest:!o.onTop,depthWrite:!o.onTop&&!o.shadow,...n,...i,...o.shadow?{transparent:!0}:{}});if(this.mesh=new we(this.geo,l),this.mesh.frustumCulled=!1,o.onTop&&(this.mesh.renderOrder=10),o.scenery&&(this.mesh.renderOrder=.5),this.meshes=[this.mesh],o.fade){const c=new we(this.geo,new ue({vertexShader:it,fragmentShader:nt,uniforms:r({uFadePass:{value:1}}),transparent:!0,depthWrite:!1})),d=new we(this.geo,new ue({vertexShader:it,fragmentShader:nt,uniforms:r({uFadePass:{value:3}}),transparent:!0,depthWrite:!0}));d.frustumCulled=!1,d.renderOrder=10.9,c.frustumCulled=!1,c.renderOrder=11,o.scenery&&Object.assign(c.material,i,{stencilWrite:!1}),Ia.push(c.material),Ua.push(c);const f=new we(this.geo,new ue({vertexShader:it,fragmentShader:nt,uniforms:r({uFadePass:{value:2}}),transparent:!0,colorWrite:!1,depthWrite:!0}));f.frustumCulled=!1,f.renderOrder=19.9,typeof location<"u"&&new URLSearchParams(location.search).get("seedepth")==="off"&&(f.material.depthWrite=!1),this.meshes.push(c,f,d)}if(o.silhouette){const c=o.silhouette.colour,d=new we(this.geo,new ue({vertexShader:it,fragmentShader:nt,uniforms:r({uSilhouette:{value:new $(c.x,c.y,c.z,o.silhouette.opacity)}}),transparent:!0,depthWrite:!1,depthFunc:Pr}));d.frustumCulled=!1,d.renderOrder=12,this.meshes.push(d),this.sil=d}for(const c of this.meshes)Object.assign(c.material.uniforms,ne)}atlas;metresPerPixel;mesh;meshes;geo;pos;size;uvs;flags;glow;jitter;capacity=0;dirty=[new re,new re,new re,new re,new re,new re];count=0;name(e){return this.meshes.forEach((a,o)=>{a.name=o===0?e:`${e} (${o===1&&this.meshes.length>1&&a!==this.sil?"see-through":"silhouette"})`}),this}setAtlas(e){this.atlas=e;for(const a of this.meshes)Mn(a.material.uniforms,e)}sil=null;set silhouette(e){this.sil&&(this.sil.visible=e)}set silhouetteColour(e){const a=this.sil&&this.sil.material.uniforms.uSilhouette.value;a&&a.set(e.x,e.y,e.z,a.w)}set silhouetteOpacity(e){const a=this.sil&&this.sil.material.uniforms.uSilhouette.value;a&&(a.w=e)}grow(e){const a=Math.max(e,this.capacity*2);this.geo.dispose();const o=(s,r)=>{const n=new fs(new Float32Array(a*s),s);return n.setUsage(ps),r&&n.array.set(r.array),n};this.pos=o(3,this.pos),this.size=o(3,this.size),this.uvs=o(4,this.uvs),this.flags=o(4,this.flags),this.glow=o(1,this.glow),this.jitter=o(3,this.jitter),this.geo.setAttribute("iPos",this.pos),this.geo.setAttribute("iSize",this.size),this.geo.setAttribute("iUv",this.uvs),this.geo.setAttribute("iFlags",this.flags),this.geo.setAttribute("iGlow",this.glow),this.geo.setAttribute("iJitter",this.jitter),this.capacity=a}leanU={value:new $};appearU={value:1};arrivalFade={value:1};items=[];set(e){this.items=e,e.length>this.capacity&&this.grow(e.length);const a=this.pos.array,o=this.size.array,s=this.uvs.array,r=this.flags.array,n=this.glow.array,i=this.jitter.array,l=this.dirty[0],c=this.dirty[1],d=this.dirty[2],f=this.dirty[3],g=this.dirty[4],p=this.dirty[5],m=this.metresPerPixel;for(let b=0,y=e.length;b<y;b++){const v=e[b],k=v.frame,x=k.uv,C=v.scale??1;let w=b*3;(a[w]!==v.x||a[w+1]!==v.y||a[w+2]!==v.z)&&(a[w]=v.x,a[w+1]=v.y,a[w+2]=v.z,l.touch(b));const P=(v.sx===void 0?k.w:Math.max(1,Math.round(k.w*v.sx)))*m*C,M=(v.sy===void 0?k.h:Math.max(1,Math.round(k.h*v.sy)))*m*C,T=(v.foot??(v.top?0:k.foot??0))*m*C*(v.sx??1);w=b*3,(o[w]!==P||o[w+1]!==M||o[w+2]!==T)&&(o[w]=P,o[w+1]=M,o[w+2]=T,c.touch(b)),w=b*4,(s[w]!==x[0]||s[w+1]!==x[1]||s[w+2]!==x[2]||s[w+3]!==x[3])&&(s[w]=x[0],s[w+1]=x[1],s[w+2]=x[2],s[w+3]=x[3],d.touch(b));const N=v.flip?1:0,F=v.top?1:v.cut?-v.cut:0,E=(v.fresh?1:0)+(v.small?2:0)+(v.tree?4:0),S=(k.masked?-1:1)*(v.sway??0);(r[w]!==N||r[w+1]!==F||r[w+2]!==E||r[w+3]!==S)&&(r[w]=N,r[w+1]=F,r[w+2]=E,r[w+3]=S,f.touch(b));const L=v.glow??0;n[b]!==L&&(n[b]=L,g.touch(b));const z=v.jitter,O=z?z[0]:0,H=z?z[1]:0,I=v.heat??0;w=b*3,(i[w]!==O||i[w+1]!==H||i[w+2]!==I)&&(i[w]=O,i[w+1]=H,i[w+2]=I,p.touch(b))}l.flush(this.pos),c.flush(this.size),d.flush(this.uvs),f.flush(this.flags),g.flush(this.glow),p.flush(this.jitter),this.count=e.length,this.geo.instanceCount=e.length;const h=this.meshes,u=e.length>0;for(let b=0;b<h.length;b++)h[b].visible=u}get dropped(){const e=this.geo._maxInstanceCount;return e===void 0||!this.mesh.visible?0:Math.max(0,this.count-e)}release(){this.geo.dispose();for(const e of this.meshes){e.material.dispose();const a=Ua.indexOf(e);a>=0&&(Ua.splice(a,1),Ia.splice(Ia.indexOf(e.material),1))}}dispose(){this.release(),this.atlas.albedo.dispose(),this.atlas.normal.dispose()}}const ac=[.91,.71,.42],oc=[.85,.47,.62],sc=[[.91,.71,.42],[.82,.52,.28],[.91,.71,.42]],rc=1.4,Vo=32,Ue=16,Ys=Ue*Ue-1,z0=Ys-1,ic=(t,e,a=.8)=>Math.min(1,Math.max(0,(t-e)/a)),S0=3,nc=10,lc=t=>t.level>=S0,cc=`
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
${lo}
${po}
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
}`,uc=`
uniform sampler2D uGlyphs, uGlyphsPal;
uniform float uGlyphIdx; // 1: uGlyphs is an index plane, its colours in uGlyphsPal (render/palette.ts; the attack look's atlas)
uniform float uSolid;
uniform float uRgb; // the texture's own colours, times the instance's (the attack look's atlas: render/leash/attackLook.ts); else its colour alone
varying vec2 vUv, vP;
varying vec4 vCol;
varying float vDraw, vShine;
varying vec3 vWorld;
varying float vPix, vN;
${fo}
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
    vec2 q = (floor((vP + 0.5) * ${Vo}.0) + 0.5) / ${Vo}.0;
    if (abs((q.x + q.y) * 0.5 - (vShine - 2.0)) < 0.13) rgb = mix(rgb, vec3(1.0), 0.9);
  }
  // Written on: revealed clockwise from the top as vDraw goes 0 to 1.
  float ang = fract(atan(vP.x, vP.y) / 6.2831853 + 1.0);
  if (ang > vDraw || a < 0.02) discard;
#ifdef MASK
  gl_FragColor = vec4(a); return; // (its coverage alone, for the tilt-shift's sharp mask: maskOf)
#endif
  gl_FragColor = uSolid > 0.5 ? vec4(haze(rgb, vWorld), a) : vec4(haze(rgb * a, vWorld), 1.0); // (solid: dust and bits, blended, not glowing)
}`;function hc(t){return new ue({vertexShader:t.vertexShader,fragmentShader:t.fragmentShader,uniforms:t.uniforms,defines:{MASK:""},transparent:!0,depthWrite:!1,depthTest:!1,blending:no,blendEquation:Po,blendEquationAlpha:Po})}const M0=["iPos","iSize","iUv","iCol","iDraw","iShine"];function C0(t){const e=a=>t[0]===a%Ue/Ue&&t[1]===1-Math.floor(a/Ue)/Ue;return!(t[0]===0&&t[1]===1)&&!e(Ys)&&!e(z0)}class Jo{mesh;glyphGain=1;geo=new ds;cap=0;n=0;dirty=[new re,new re,new re,new re,new re,new re];pos;size;uv;col;draw;shine;constructor(e){const a=new ro(1,1);this.geo.index=a.index,this.geo.setAttribute("position",a.getAttribute("position")),this.geo.setAttribute("uv",a.getAttribute("uv")),this.grow(256),this.mesh=new we(this.geo,e),this.mesh.frustumCulled=!1,this.mesh.renderOrder=3}grow(e){const a=(s,r)=>{const n=new Float32Array(e*r);return s&&n.set(s),n};this.pos=a(this.pos,3),this.size=a(this.size,1),this.uv=a(this.uv,4),this.col=a(this.col,4),this.draw=a(this.draw,1),this.shine=a(this.shine,1),this.cap=e,this.geo.dispose();const o=(s,r,n)=>this.geo.setAttribute(s,new fs(r,n).setUsage(ps));o("iPos",this.pos,3),o("iSize",this.size,1),o("iUv",this.uv,4),o("iCol",this.col,4),o("iDraw",this.draw,1),o("iShine",this.shine,1)}begin(){this.n=0}add(e,a,o,s,r,n,i,l,c,d=1,f=!1,g=0){this.n>=this.cap&&this.grow(this.cap*2),this.glyphGain!==1&&C0(r)&&(n*=this.glyphGain,i*=this.glyphGain,l*=this.glyphGain);const p=this.n++,m=this.pos,h=this.uv,u=this.col,b=this.dirty,y=d+(f?2:0);let v=p*3;(m[v]!==e||m[v+1]!==a||m[v+2]!==o)&&(m[v]=e,m[v+1]=a,m[v+2]=o,b[0].touch(p)),this.size[p]!==s&&(this.size[p]=s,b[1].touch(p)),v=p*4,(h[v]!==r[0]||h[v+1]!==r[1]||h[v+2]!==r[2]||h[v+3]!==r[3])&&(h[v]=r[0],h[v+1]=r[1],h[v+2]=r[2],h[v+3]=r[3],b[2].touch(p)),(u[v]!==n||u[v+1]!==i||u[v+2]!==l||u[v+3]!==c)&&(u[v]=n,u[v+1]=i,u[v+2]=l,u[v+3]=c,b[3].touch(p)),this.draw[p]!==y&&(this.draw[p]=y,b[4].touch(p)),this.shine[p]!==g&&(this.shine[p]=g,b[5].touch(p))}end(){this.geo.instanceCount=this.n,M0.forEach((e,a)=>this.dirty[a].flush(this.geo.getAttribute(e)))}}const Ae={reduceFlashing:!1},K=[{id:"full",label:"full quality",when:"live",built:!0},{id:"farDither",label:"the forest's far edge dithered, not faded",when:"live",built:!0},{id:"density90",label:"trees ×0.9",when:"load",built:!0},{id:"blend40",label:"area borders blend over 40 m",when:"load",built:!1},{id:"squeeze",label:"tall trees squeezed",when:"live",built:!0},{id:"still",label:"leaves still, no trunk shadows",when:"live",built:!0},{id:"hardCut",label:"the cut-away's crowns solid",when:"live",built:!0},{id:"fxDistort",label:"magic shimmer off",when:"live",built:!0},{id:"fxImprints",label:"temporary magic scenery marks off",when:"live",built:!0},{id:"fxSecondary",label:"magic secondary detail off",when:"live",built:!0},{id:"fxLights",label:"at most two magic lights",when:"live",built:!0},{id:"fxParticles",label:"half the magic particles",when:"live",built:!0},{id:"density80",label:"trees ×0.8",when:"load",built:!0},{id:"cap30",label:"a steady 30 fps",when:"live",built:!0},{id:"px4",label:"chunkier pixels (px 4)",when:"load",built:!0}];function F0(t){const e=a=>{const o=K.findIndex(s=>s.id===a);return K[o].built&&o<=t};return{density:e("density80")?.8:e("density90")?.9:1,blend:e("blend40")?40:null,px:e("px4")?4:null}}const Zs={over:.9,under:.7,downAfter:3,upAfter:10,settle:2,flips:3,flipWindow:60,fit:.85,retry:60,retryMax:480,missed:1.25,kept:1.1},$a=(t=0,e="auto")=>{const a=Ma(t);return{rung:a,loaded:a,mode:e,slow:0,roomy:0,since:0,last:-1/0,dir:0,reversals:[],locked:!1,cost:K.map(()=>NaN),left:K.map(()=>0),leftAt:K.map(()=>NaN),t:0}},Ma=t=>Math.max(0,Math.min(K.length-1,Math.round(Number.isFinite(t)?t:0)));function ca(t,e){const a=K[e];return!a?.built||e===0?!1:a.when==="live"?e<=t.rung:e<=t.loaded}function P0(t){const e=[],a=[];return K.forEach((o,s)=>{o.when!=="load"||!o.built||(s<=t.rung&&s>t.loaded&&e.push(s),s>t.rung&&s<=t.loaded&&a.push(s))}),{adds:e,drops:a}}function L0(t){for(let e=t.rung+1;e<K.length;e++)if(K[e].built&&K[e].when==="live")return e;for(let e=K.length-1;e>t.rung;e--)if(K[e].built)return e;return-1}function T0(t){for(let e=t.rung;e>0;e--)if(K[e].built&&K[e].when==="live")return e-1;return t.rung>0?0:-1}function A0(t,e,a,o=1,s=!1,r=Zs,n=!0){const i={...t,t:t.t+o,since:t.since+o,cost:t.cost.slice(),reversals:t.reversals.filter(d=>t.t+o-d<=r.flipWindow)};if(i.mode!=="auto")return i;if(s)return{...i,since:0,slow:0};if(!(e>0)||!(a>0)||i.since<=r.settle)return i;const l=i.cost[i.rung];i.cost[i.rung]=Number.isFinite(l)?l+(e-l)*.3:e,i.slow=e>a*(n?r.over:r.missed)?i.slow+1:0,i.roomy=e<a*(n?r.under:r.kept)?i.roomy+o:0;const c=(d,f)=>{i.dir&&f!==i.dir&&i.t-i.last<=r.flipWindow&&i.reversals.push(i.t);const g=i.locked||i.reversals.length>=r.flips,p=i.left.slice(),m=i.leftAt.slice();return f<0&&(p[i.rung]++,m[i.rung]=i.t),{...i,rung:d,dir:f,last:i.t,since:0,slow:0,roomy:0,locked:g,left:p,leftAt:m}};if(i.slow>=r.downAfter){const d=L0(i);if(d>=0)return c(d,-1);i.slow=0}else if(i.roomy>=r.upAfter&&!i.locked){const d=T0(i);if(d>=0){const f=i.cost[d];if(!Number.isFinite(f)||f<a*r.fit||i.t-i.leftAt[d]>=E0(i,d,r))return c(d,1);i.roomy=0}}return i}const E0=(t,e,a=Zs)=>Math.min(a.retryMax,a.retry*2**Math.max(0,(t.left[e]??0)-1));function mt(t,e,a=t.rung){const o=e==="off"?0:Ma(a);return{...t,mode:e,rung:o,since:0,slow:0,roomy:0,locked:e==="auto"?!1:t.locked,reversals:e==="auto"?[]:t.reversals}}const Yo=`
uniform vec3 uRight,uUp;
uniform float uFlat,uMpp;uniform vec2 uRes;
attribute vec3 iPos; attribute float iSize,iDraw,iShine; attribute vec4 iUv,iCol;
varying vec2 vP; varying vec4 vData,vCol; varying vec3 vWorld;varying vec2 vGrid;
${lo}
${po}
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
}`,Zo=`
uniform sampler2D uFxRamp;uniform float uFxTime,uLayer,uCalm,uSecondary,uDistort,uGlow;uniform vec2 uHalo;uniform vec4 uSpellGlow;
varying vec2 vP;varying vec4 vData,vCol;varying vec3 vWorld;varying vec2 vGrid;
${fo}
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
    bool detail=uSecondary>0.5 && strength>${B.secondaryAt} && abs(sin(angle*4.0+time+r*9.0))<0.08 && r>0.45 && r<0.8;
    if(!detail && (spark<0.985-strength*0.012 || r>0.95))discard;
    rgb=detail?texelFetch(uFxRamp,ivec2(4,int(vData.y+0.5)),0).rgb:ramp(2.0).rgb;a=0.65;
  }
  if(form>10.5)a*=smoothstep(-1.0,0.7,p.x);
  a*=vCol.a;if(a<0.01)discard;
  gl_FragColor=vec4(haze(rgb*vCol.rgb,vWorld),a);
}`,R0={blending:no,blendEquation:Er,blendSrc:Ar,blendDst:To,blendSrcAlpha:Tr,blendDstAlpha:To},D0=2.6,Xo=t=>1.45*(1+.15*Math.max(0,t-1));function O0(t,e){const a=t===8,o=a?0:Math.floor(t/4),s=a?2:t%4;return e!==void 0?e+(a?.009:o?s*.001:.004+s*.001):a?11.2:o?2.9+s*.01:2.8+s*.01}class G0{layers=[];time={value:0};calm={value:0};secondary={value:1};distort={value:1};mpp={value:.09375};spellGlow={value:new $(0,0,0,D0)};count=0;canopy=!1;constructor(e,a={}){const o=new Uint8Array(5*fe.length*4);fe.forEach((r,n)=>{const i=Fe[r];[...i.ramp,i.contrast].forEach((l,c)=>{const d=parseInt(l.slice(1),16),f=(n*5+c)*4;o.set([d>>16,d>>8&255,d&255,i.motion],f)})});const s=pa(new ya(o,5,fe.length),"fx");s.minFilter=s.magFilter=pe,s.needsUpdate=!0;for(let r=0;r<9;r++){const n=r===8,i=n?0:Math.floor(r/4),l=n?2:r%4,c=new ue({vertexShader:Yo,fragmentShader:Zo,uniforms:{...te,...$e,uRight:Re.uRight,uUp:Re.uUp,uRes:Re.uRes,uMpp:this.mpp,uHalo:{value:new ee(...B.halo)},uFxRamp:{value:s},uFlat:{value:i},uLayer:{value:l},uFxTime:this.time,uCalm:this.calm,uSecondary:this.secondary,uDistort:this.distort,uGlow:{value:a.glow?1:0}},transparent:!0,depthWrite:!1,depthTest:!n,blending:l>=2||a.glow?Lo:Lr}),d=new Jo(c);d.mesh.name=`${a.name??"Magic"} ${n?"canopy halo":`${i?"ground":"upright"} layer ${l}`}`,d.mesh.renderOrder=O0(r,a.order),e.add(d.mesh),this.layers.push(d)}if(!a.glow)for(const r of[0,1]){const n=new ue({vertexShader:Yo,fragmentShader:Zo,uniforms:{...te,...$e,uRight:Re.uRight,uUp:Re.uUp,uRes:Re.uRes,uMpp:this.mpp,uHalo:{value:new ee(...B.halo)},uFxRamp:{value:s},uFlat:{value:r},uLayer:{value:4+r},uFxTime:this.time,uCalm:this.calm,uSecondary:this.secondary,uDistort:this.distort,uGlow:{value:0},uSpellGlow:this.spellGlow},transparent:!0,depthWrite:!1,depthTest:!0,...r?R0:{blending:Lo}}),i=new Jo(n);i.mesh.name=`${a.name??"Magic"} spell glow ${r?"pool":"core"}`,i.mesh.renderOrder=a.order!==void 0?a.order+(r?-5e-4:.0045):r?2.895:2.84,i.mesh.visible=!1,e.add(i.mesh),this.layers.push(i)}}begin(e,a){this.time.value=e,this.calm.value=a?1:0,this.count=0;for(const o of this.layers)o.begin()}add(e,a,o,s,r,n,i,l=null,c=!0,d=1,f=0){const g=Xo(d);for(let p=0;p<(c?4:3);p++){if(p!==1){if(this.count>=B.instances)continue;this.count++}this.layers[(i?4:0)+p].add(e,a,o,s*(p===0?1.12:p===2?g:1),r,l?.[0]??1,l?.[1]??1,l?.[2]??1,p===2?n*d:n,1,!1,f)}!i&&this.canopy&&this.secondary.value>.5&&this.count<B.instances&&(this.count++,this.layers[8].add(e,a,o,s*1.5,r,l?.[0]??1,l?.[1]??1,l?.[2]??1,n*.12*d))}beam(e,a,o,s,r,n,i,l,c,d=1){const f=Xo(d);for(let g=0;g<4;g++){if(g!==1){if(this.count>=B.instances)continue;this.count++}this.layers[g].add(e,a,o,n*(g===0?1.12:g===2?f:1),i,c?.[0]??1,c?.[1]??1,c?.[2]??1,g===2?l*d:l,-s,!1,r)}this.canopy&&this.secondary.value>.5&&this.count<B.instances&&(this.count++,this.layers[8].add(e,a,o,n*1.5,i,c?.[0]??1,c?.[1]??1,c?.[2]??1,l*.12*d,-s,!1,r))}glowAt(e,a,o,s,r,n,i){this.count>=B.instances||!this.layers[9]||(this.count++,this.layers[9].add(e,a,o,s*this.spellGlow.value.w,r,i?.[0]??1,i?.[1]??1,i?.[2]??1,n,1,!1,0))}poolAt(e,a,o,s,r,n){this.count>=B.instances||!this.layers[10]||(this.count++,this.layers[10].add(e,0,a,o,s,n?.[0]??1,n?.[1]??1,n?.[2]??1,r,1,!1,0))}glowLine(e,a,o,s,r,n,i,l,c,d){this.count>=B.instances||!this.layers[10]||(this.count++,this.layers[d?10:9].add(e,d?0:a,o,n*(d?1:this.spellGlow.value.w),i,c?.[0]??1,c?.[1]??1,c?.[2]??1,l,-s,!1,r))}end(){for(const e of this.layers)e.end();for(const e of[9,10])this.layers[e]&&(this.layers[e].mesh.visible=this.layers[e].mesh.geometry.instanceCount>0)}}const H0={element:"party",form:"beam",intensity:.45,preserveHue:!0,light:.12,anchor:.08},_0={element:"party",form:"beam",intensity:.65,preserveHue:!0,light:.08,anchor:.04},N0={element:"party",form:"projectile",intensity:.25,preserveHue:!0,light:.04,anchor:.02},W0={element:"moonlight",form:"aura",intensity:.45,preserveHue:!0,light:0,anchor:.06},I0={element:"water",form:"aura",intensity:.25,preserveHue:!0,light:.05,anchor:.02},U0={element:"moonlight",form:"pillar",intensity:.65,preserveHue:!0,light:0,anchor:0},$0={element:"party",form:"beam",intensity:.65,preserveHue:!0,light:.14,anchor:.08},q0={element:"moonlight",form:"dome",intensity:.65,preserveHue:!0,light:0,anchor:0},B0={element:"water",form:"zone",intensity:.45,preserveHue:!0,light:0,anchor:0},j0={element:"party",form:"burst",intensity:1,preserveHue:!0,light:0,anchor:0},K0={element:"moonlight",form:"aura",intensity:.45,preserveHue:!0,light:0,anchor:0},Xs={flightTrail:H0,partySwoop:_0,broomSpark:N0,sigil:W0,ringDot:I0,runestone:U0,ley:$0,hologram:q0,lake:B0,firework:j0,decorativeGlow:K0},Qs={value:1};function V0(t){const e=Xs[t],a=Fe[e.element];return{uNativeOn:Qs,uNativeRamp:{value:a.ramp.map(o=>new J((parseInt(o.slice(1),16)>>16)/255,(parseInt(o.slice(1),16)>>8&255)/255,(parseInt(o.slice(1),16)&255)/255))},uNativeStyle:{value:new ee(e.intensity,e.preserveHue?1:0)}}}const J0=`
uniform float uNativeOn;uniform vec3 uNativeRamp[4];uniform vec2 uNativeStyle;
vec3 nativeFxColour(vec3 c){
  if(uNativeOn<0.5)return c;
  float l=max(c.r,max(c.g,c.b));if(l<0.00001)return c;
  vec3 band=l<0.2?uNativeRamp[0]:l<0.45?uNativeRamp[1]:l<0.75?uNativeRamp[2]:uNativeRamp[3];
  if(uNativeStyle.y>0.5)band=c/l*max(band.r,max(band.g,band.b));
  // Retain the native form's falloff and authored hue; quantise its light toward the family's ramp.
  return mix(c,band*min(1.0,l*1.2),0.18*uNativeStyle.x);
}`;function dc(t,e){t.traverse(a=>{const o=a.material;for(const s of Array.isArray(o)?o:[o]){if(!(s instanceof ue)||s.userData.nativeFx)return;/void\s+main\s*\(/.test(s.fragmentShader)&&(s.fragmentShader=J0+s.fragmentShader.replace(/void\s+main\s*\(/,"void nativeMain(")+`
void main(){nativeMain();gl_FragColor.rgb=nativeFxColour(gl_FragColor.rgb);}
`,Object.assign(s.uniforms,V0(e)),s.userData.nativeFx=e,s.needsUpdate=!0)}})}const Y0={shakeCap:.18,seconds:.5,minimumIntensity:.85},Ee={screen:Y0},Z0=.5,X0=6,Qo={on:new URLSearchParams(globalThis.location?.search??"").get("spellglow")!=="0"},lt=(t,e,a)=>Number.isFinite(t)?Math.max(e,Math.min(a,t)):e;function fc(t,e,a){if(!e||!t)return null;const o=a?Z0:1,s={core:lt(t.core,0,4)*o,halo:lt(t.halo,0,4)*o,pool:lt(t.pool,0,4)*o,lights:Math.round(lt(t.lights,0,X0)),light:lt(t.light,0,4)*o};return s.core+s.halo+s.pool+s.light>0?s:null}function Q0(t,e,a){const o=t.map((n,i)=>i).sort((n,i)=>es(t[i])-es(t[n])||n-i),s=[];let r=0;for(const n of o){if(s.length>=e)break;if(t[n].spell){if(r>=a)continue;r++}s.push(n)}return s}const es=t=>t.score*(t.held?1.35:1);function el(t,e,a){const o=e-t;if(Math.abs(o)<=1e-6)return e;const s=Math.max(1,Math.abs(o))*Math.max(0,a);return Math.abs(o)<=s?e:t+Math.sign(o)*s}const Q={distortion:!0,imprints:!0,secondary:!0,lightCap:B.lightCap,particles:1},ts=new WeakMap;let as=null;const tl={width:1,alpha:.6,life:1,glow:1},al=t=>Math.max(0,Math.min(1.5,1+(t-1)*.5));function pc(t){let e=ts.get(t);return e||(e=new ol(t),ts.set(t,e)),e}class ol{constructor(e,a=Br){this.patternLook=a,this.batches=new G0(e)}patternLook;quality=Q;fieldUniforms=ne;batches;field=new m0;stats={lights:0,requests:0,instances:0,fieldBytes:B.fieldSize**2*8,fieldCopyValues:0};enabled=new URLSearchParams(globalThis.location?.search??"").get("magic")!=="old";get spellGlow(){return Qo.on}set spellGlow(e){Qo.on=e}galleryPage=0;galleryElement=null;galleryTime=null;captureTime=null;galleryDark=!1;galleryCamera=null;galleryVisible=!0;galleryLegacyVisible=!0;legacyParty=null;panel=null;hidden=[];background=null;lights=new Map;bursts=[];data=[0,0,0,0];selected=[];room=0;spellCap=0;owner=null;time=0;dt=0;cx=0;cz=0;screenAt=-1/0;screenStrength=0;screenSeconds=Ee.screen.seconds;screenCap=Ee.screen.shakeCap;begin(e,a,o,s){e=this.captureTime??e,(this.owner!==s||e<this.time)&&(this.reset(),this.owner=s,this.time=e),this.dt=Math.max(0,e-this.time),this.time=e,this.cx=a,this.cz=o,Qs.value=this.enabled?1:0,this.field.move(a,o),this.field.decay(this.dt),this.batches.begin(e,Ae.reduceFlashing),this.batches.secondary.value=Q.secondary?1:0,this.batches.distort.value=Q.distortion&&!Ae.reduceFlashing?1:0,ne.uFxOn.value=this.enabled&&Q.imprints?1:0,ne.uFxTime.value=e,ne.uFxCalm.value=Ae.reduceFlashing?1:0,this.stats.instances=0,this.spellCap=0}reset(){this.field.reset(),this.lights.clear(),this.room=0,this.bursts.length=0,this.screen(),this.screenAt=-1/0,this.screenStrength=0}get screenKick(){if(!this.enabled||Ae.reduceFlashing)return 0;const e=Math.max(0,(this.time-this.screenAt)/this.screenSeconds);return e>=1?0:Math.min(this.screenCap,this.screenStrength)*(1-e)**2}screen(e=Ee.screen.shakeCap,a=Ee.screen.seconds,o=Ee.screen.shakeCap){this.screenAt=this.time,this.screenStrength=e,this.screenSeconds=Math.max(.01,a),this.screenCap=o}kick(e,a){this.screen(Math.max(0,e),a,.5)}lamp(e,a,o,s,r,n,i){if(!this.enabled||!(i>.001)||!(n>0))return;let l=this.lights.get(e);if(!l){if(this.lights.size>=B.pool)return;l={x:a,y:o,z:s,reach:0,rgb:new J,strength:0,target:0,seen:this.time,score:0,fade:0,slot:0,spell:!1},this.lights.set(e,l)}l.x=a,l.y=o,l.z=s,l.reach=n,l.rgb.set(r[0],r[1],r[2]),l.target=i*(Ae.reduceFlashing?.5:1),l.seen=this.time}draw(e,a,o,s,r,n,i=1,l=1,c=0,d=0,f=null,g=st(n),p=1,m=null,h=!0){if(!this.enabled||!(l>.01)||Math.hypot(o-this.cx,r-this.cz)>140)return;const u=Te(e),b=Fe[u],y=se[a],v=this.batches.mpp.value,k=Math.max(v,Math.round(y.size*i*rt(B.size,g)/v)*v);if(g>=Ee.screen.minimumIntensity&&(a==="burst"||a==="eruption")&&c<.15&&this.screen(Ee.screen.shakeCap*l),this.data[0]=y.id,this.data[1]=fe.indexOf(u),this.data[2]=g,this.data[3]=c,this.batches.add(o,s,r,k,this.data,l,y.ground,f,Q.particles>.5||(d&1)===0,p),this.stats.instances++,y.ground||(this.data[0]=se.zone.id,this.batches.add(o,0,r,Math.min(k*.75,12),this.data,l*.18*p,!0,f,!1)),m){this.glowLook(m),this.glowData(y.id,u,g,c,f);const x=a==="burst"||a==="eruption";!y.ground&&m.core+m.halo>0&&this.batches.glowAt(o,s,r,k*(x?.26:.62),this.data,l*(x?.8:1),f),m.pool>0&&this.batches.poolAt(o,r,y.ground?k*1.15:Math.max(2.4,k*(x?1:1.9)),this.data,l*(y.ground?.6:Math.max(.35,1-s/14)),f)}h&&(!m||m.light>0)&&this.light(`${u}:${a}:${d}`,o,s,r,u,g,l,f,p,m?m.light:0),Q.imprints&&(a==="burst"||a==="zone"||a==="eruption"||a==="beam"||a==="projectile"||a==="vortex"||a==="pillar")&&this.field.stamp(o,r,Math.max(2,Math.min(18,k*.6)),b.imprint,g*l*(a==="projectile"?.25:1))}emit(e,a,o,s,r,n,i=1,l=1.2,c=0){this.bursts.length>=B.pool&&this.bursts.shift(),this.bursts.push({element:e,form:a,x:o,y:s,z:r,level:n,size:i,at:this.time,life:l,seed:c}),n>=3&&i>=1&&this.screen()}native(e,a,o,s,r=1,n=0,i=null){if(!this.enabled||r<=.01||Math.hypot(a-this.cx,s-this.cz)>80)return;const l=Xs[e],c=Te(l.element);l.light>0&&this.light(`native:${e}:${n}`,a,o,s,c,l.intensity,Math.min(1,r)*l.light,i),l.anchor>0&&(this.data[0]=se.zone.id,this.data[1]=fe.indexOf(c),this.data[2]=l.intensity,this.data[3]=0,this.batches.add(a,0,s,Math.min(5,se[l.form].size*1.5),this.data,l.anchor*Math.min(1,r),!0,i,!1))}beam(e,a,o,s,r,n,i,l,c,d,f=null,g=st(l),p=1,m=null){const h=Math.hypot(s-a,r-o);if(!this.enabled||h<.01||c<=.01)return;const u=Te(e),b=(a+s)/2,y=(o+r)/2;if(Math.hypot(b-this.cx,y-this.cz)>140+h/2)return;this.data[0]=se.beam.id,this.data[1]=fe.indexOf(u),this.data[2]=g,this.data[3]=this.time%1;const v=Math.abs(r-o)/h,k=Math.atan2(r-o,s-a),x=Math.max(i,this.batches.mpp.value*3)*(1+v*.35);this.batches.beam(b,n,y,h,k,x,this.data,c,f,p),m&&(this.glowLook(m),this.glowData(se.beam.id,u,g,this.data[3],f),m.core+m.halo>0&&this.batches.glowLine(b,n,y,h,k,x*.7,this.data,c,f,!1),m.pool>0&&this.batches.glowLine(b,0,y,h,k,x*2.6,this.data,c*.8,f,!0));const C=Math.min(8,Math.max(1,Math.ceil(h/4))),w=Math.round(C/2);for(let P=0;P<=C;P++){const M=a+(s-a)*P/C,T=o+(r-o)*P/C;m?(P===w||P===C)&&m.light>0&&this.light(`${u}:beam:${d}:${P}`,M,n,T,u,g,c,f,p,m.light):this.light(`${u}:beam:${d}:${P}`,M,n,T,u,g,c,f,p),Q.imprints&&this.field.stamp(M,T,Math.max(2,i*1.5),Fe[u].imprint,g*c)}this.stats.instances++}ribbon(e,a,o,s,r,n,i,l,c,d=null,f=st(l),g=tl,p=null){const m=Math.hypot(r,i);if(!this.enabled||m<.1)return;const h=Math.min(.32,8/m)*g.life,u=m*h,b=Te(e);this.data[0]=se.trail.id,this.data[1]=fe.indexOf(b),this.data[2]=f,this.data[3]=n*h,this.batches.beam(a-r*h/2,o-n*h/2,s-i*h/2,u,Math.atan2(i,r),.55*g.width*rt(B.size,f),this.data,g.alpha,d,g.glow),p&&p.core+p.halo>0&&(this.glowLook(p),this.glowData(se.trail.id,b,f,this.data[3],d),this.batches.glowLine(a-r*h/2,o-n*h/2,s-i*h/2,u,Math.atan2(i,r),.3*g.width*rt(B.size,f),this.data,g.alpha*.55,d,!1)),Q.imprints&&(c&3)===0&&this.field.stamp(a-r*h,s-i*h,2,Fe[b].imprint,.15*f)}glowPool(e,a,o,s,r,n,i,l,c,d=!0,f=st(r)){if(!this.enabled||!(n>.01)||Math.hypot(a-this.cx,o-this.cz)>140)return;const g=Te(e);this.glowLook(c),this.glowData(se.zone.id,g,f,0,l),c.pool>0&&this.batches.poolAt(a,o,s,this.data,n,l),d&&c.light>0&&this.light(`${g}:pool:${i}`,a,.6,o,g,f,n,l,1,c.light)}glowBurst(e,a,o,s,r,n,i,l,c,d,f=st(n)){if(!this.enabled||!(i>.01)||Math.hypot(a-this.cx,s-this.cz)>140)return;const g=Te(e);this.glowLook(d),this.glowData(se.burst.id,g,f,0,c),d.core+d.halo>0&&this.batches.glowAt(a,o,s,r,this.data,i,c),d.pool>0&&this.batches.poolAt(a,s,r*2.4,this.data,i,c),d.light>0&&this.light(`${g}:blow:${l}`,a,o,s,g,f,i,c,1,d.light)}glowLook(e){this.batches.spellGlow.value.set(e.core,e.halo,e.pool,this.batches.spellGlow.value.w),this.spellCap=Math.max(this.spellCap,e.lights)}glowData(e,a,o,s,r){this.data[0]=e,this.data[1]=fe.indexOf(a)+(r?100:0),this.data[2]=o,this.data[3]=s}light(e,a,o,s,r,n,i,l,c=1,d=0){let f=this.lights.get(e);if(!f){if(this.lights.size>=B.pool){const p=Wa(a,s,n*i,this.cx,this.cz);let m="",h=1/0;for(const[u,b]of this.lights){const y=Wa(b.x,b.z,b.target,this.cx,this.cz);y<h&&(m=u,h=y)}if(p<=h)return;this.lights.delete(m)}f={x:a,y:o,z:s,reach:0,rgb:new J,strength:0,target:0,seen:this.time,score:0,fade:0,slot:0,spell:d>0},this.lights.set(e,f)}f.spell=d>0;const g=parseInt(Fe[r].ramp[1].slice(1),16);f.x=a,f.y=o,f.z=s,f.reach=rt(B.lightReach,n),f.rgb.set(l?.[0]??(g>>16)/255,l?.[1]??(g>>8&255)/255,l?.[2]??(g&255)/255),f.target=rt(B.lightStrength,n)*Math.min(1,i)*al(c)*(d>0?d:Ae.reduceFlashing?.5:1),f.seen=this.time,f.pattern=e.startsWith("moonlight:aura:")}finish(e){let a=0;for(const o of this.bursts){const s=this.time-o.at;if(s<0||s>=o.life)continue;this.bursts[a++]=o;const r=s/o.life,n=Math.min(1,s/.2,(o.life-s)/.3);this.draw(o.element,o.form,o.x,o.y,o.z,o.level,o.size,n,r,o.seed)}if(this.bursts.length=a,this.batches.end(),this.field.publish()||as!==this.field){const o=ne.uFxField.value.image.data,s=ne.uFxExtra.value.image.data;this.stats.fieldCopyValues+=this.field.data.length;for(let r=0,n=0;r<this.field.data.length;r+=8,n+=4)for(let i=0;i<4;i++)o[n+i]=this.field.data[r+i],s[n+i]=this.field.data[r+i+4];ne.uFxField.value.needsUpdate=!0,ne.uFxExtra.value.needsUpdate=!0,as=this.field}ne.uFxOn.value=this.field.active&&this.enabled&&Q.imprints?1:0,ne.uFxBox.value.set(this.field.x*this.field.cell,this.field.z*this.field.cell,this.field.metres,this.field.size),this.applyLights(e)}applyLights(e){this.selected.length=0;for(const[m,h]of this.lights){const u=this.enabled&&h.seen===this.time,b=this.dt/B.lightEase;if(h.fade=Math.max(0,Math.min(1,h.fade+(u?b:-b))),h.strength=h.target*h.fade,!u&&h.fade<.001){this.lights.delete(m);continue}h.score=Wa(h.x,h.z,h.strength,this.cx,this.cz),Math.hypot(h.x-this.cx,h.z-this.cz)<h.reach+30?this.selected.push(h):h.slot=0}this.enabled||(this.selected.length=0);const a=te,o=Math.max(0,Math.min(ke,Math.floor(e))),s=this.dt/B.lightEase,r=Math.min(Q.lightCap,B.lightCap,o),n=Q0(this.selected.map(m=>({score:m.score,spell:m.spell,held:m.slot>0})),r,this.spellCap),i=Math.min(a.uLightCount.value,o),l=o-i;this.room=Math.min(i,el(this.room,Math.max(0,n.length-l),s));const c=Math.floor(this.room+1e-6),d=this.room-c,f=i-c;d>1e-6&&f>0&&(a.uLightCol.value[f-1].w*=1-d);const g=Math.min(n.length,o-f);Kr(f);for(const m of this.selected)m.score=-1;let p=!1;for(let m=0;m<g;m++){const h=this.selected[n[m]];h.score=0,h.slot=Math.min(1,h.slot+s),a.uLightPos.value[f+m].set(h.x,Rr(h.x,h.z)+h.y,h.z,h.reach),a.uLightCol.value[f+m].set(h.rgb.x,h.rgb.y,h.rgb.z,h.strength*h.slot);const b=h.pattern&&!p&&this.patternLook!=="off"?Es("rings",this.time,Ae.reduceFlashing):void 0;Ds(f+m,b),b&&(p=!0)}for(const m of this.selected)m.score<0&&(m.slot=0);a.uLightCount.value=f+g,this.stats.lights=g,this.stats.requests=this.lights.size}gallery(e,a,o,s){if(this.galleryPanel(e),!this.galleryVisible)return;const r=(this.galleryTime??s)%4/4;if(this.galleryPage===3){const i=this.galleryElement??e;this.beam(i,a-13,o,a-3,o,1.5,1.4,2,.8,880001),this.beam(i,a+8,o-5,a+8,o+5,1.5,1.4,2,.8,880002);return}jo.slice(this.galleryPage*4,this.galleryPage*4+4).forEach((i,l)=>[.25,.6,1].forEach((c,d)=>{const f=a+(l-1.5)*10,g=o+(d-1)*12;if(i==="beam"){this.beam(this.galleryElement??e,f-3,g,f+3,g,1.5,1.4,2,.8,l*3+d,null,c);return}if(i==="trail"){this.ribbon(this.galleryElement??e,f+3,2,g,20,0,0,2,l*3+d,null,c);return}this.draw(this.galleryElement??e,i,f,se[i].ground?0:i==="pillar"?5:2,g,2,1,.7,r,l*3+d,null,c)}))}galleryPanel(e){if(this.panel||typeof document>"u")return;const a=this.panel=document.createElement("aside");a.style.cssText="position:fixed;left:12px;top:12px;z-index:20000;background:#15131eee;color:#fff;padding:12px;font:14px monospace;max-width:420px";const o=document.createElement("div");o.textContent="Magic gallery · rows far → near: 0.25 / 0.6 / 1",a.append(o);const s=document.createElement("select");s.setAttribute("aria-label","Magic element");for(const f of fe){const g=document.createElement("option");g.value=g.textContent=f,s.append(g)}s.value=Te(e),s.onchange=()=>{this.galleryElement=s.value},a.append(s);const r=document.createElement("select");r.setAttribute("aria-label","Magic forms");for(let f=0;f<3;f++){const g=document.createElement("option");g.value=String(f),g.textContent=jo.slice(f*4,f*4+4).join(" / "),r.append(g)}const n=document.createElement("option");n.value="3",n.textContent="Equal E–W / N–S beams",r.append(n),r.onchange=()=>{this.galleryPage=Number(r.value)},a.append(r);const i=(f,g)=>{const p=document.createElement("button");return p.textContent=f,p.onclick=g,a.append(p),p},l=i("Pause",()=>{this.galleryTime=this.galleryTime===null?this.time:null,l.textContent=this.galleryTime===null?"Pause":"Play"}),c=i("Dark ground",()=>{this.galleryDark=!this.galleryDark,c.textContent=this.galleryDark?"Forest ground":"Dark ground"}),d=i("Treetop camera",()=>{this.galleryCamera=!this.galleryCamera,d.textContent=this.galleryCamera?"Ground camera":"Treetop camera"});document.body.append(a)}hideBackdrop(e){if(this.galleryDark){this.background=e.background,e.background=new io("#15131e"),this.hidden=e.children.filter(a=>!a.name.startsWith("Magic ")).map(a=>({object:a,visible:a.visible}));for(const a of this.hidden)a.object.visible=!1}}restoreBackdrop(e){if(this.hidden.length){for(const a of this.hidden)a.object.visible=a.visible;this.hidden.length=0,e.background=this.background}}}const qa=new WeakMap;function sl(t){if(qa.has(t))return qa.get(t);const e=t.getExtension("WEBGL_debug_renderer_info"),a=t.getParameter(e?e.UNMASKED_RENDERER_WEBGL:t.RENDERER);return a!=null&&qa.set(t,a),a}const os=1e3/60,ss=1e3/30,rl=.35,er="witch.ladder";class gc{mutate=(e,a)=>a();state;ms=NaN;timed=!1;key;bases=new WeakMap;applied="";win={t0:NaN,frames:[],skip:!1};constructor(e,a){this.key=`${er}:${e.slice(0,120)}`,this.state=tr(a,ar(this.key)),this.sync()}get cap30(){return ca(this.state,K.findIndex(e=>e.id==="cap30"))}frame(e,a,o,s,r){const n=this.win;if(Number.isNaN(n.t0)&&(n.t0=e),o||a>250?n.skip=!0:a>0&&n.frames.push(a),e-n.t0>=1e3){const i=(e-n.t0)/1e3,l=n.frames.length,c=r.length?ns(r.slice(-Math.max(1,Math.min(l,r.length)))):NaN;this.timed=Number.isFinite(c),this.ms=this.timed?c:ns(n.frames);const d=this.state.rung;this.state=A0(this.state,this.ms,this.cap30?ss:os,i,n.skip||l<5,void 0,this.timed),this.state.rung!==d&&this.state.mode==="auto"&&this.save(),this.sync(),n.t0=e,n.frames=[],n.skip=!1}this.apply(s)}apply(e){let a=this.bases.get(e);if(!a){const r=or.get(e);r!==void 0&&(this.state={...this.state,loaded:r}),a={keep:e.treeCap.keep,wind:e.wind.on,trunks:e.shadows.trunks?.mode??"off",edge:!!e.scenery.edgeDither,hard:!!e.canopyCutout.hard},this.bases.set(e,a),this.applied=""}const o=r=>ca(this.state,K.findIndex(n=>n.id===r)),s=K.map((r,n)=>ca(this.state,n)?1:0).join("");s!==this.applied&&(this.applied=s,this.mutate("automatic quality tuning",()=>{Q.distortion=!o("fxDistort"),Q.imprints=!o("fxImprints"),Q.secondary=!o("fxSecondary"),Q.lightCap=o("fxLights")?2:6,Q.particles=o("fxParticles")?.5:1,is(e.scenery,"edgeDither",o("farDither")||a.edge),is(e.canopyCutout,"hard",o("hardCut")||a.hard),e.treeCap.keep=o("squeeze")?Math.min(a.keep,rl):a.keep,e.wind.on=o("still")?!1:a.wind,e.shadows.trunks&&(e.shadows.trunks.mode=o("still")?"off":a.trunks)}))}lines(){const e=this.state,a=K[e.rung],o=K.length-1,r=[`${e.mode==="off"?"off (full quality)":e.mode==="pinned"?`pinned at ${e.rung}`:e.locked?"auto, holding (it kept flipping)":"auto"}: rung ${e.rung} of ${o}, ${a.label}`];Number.isFinite(this.ms)&&r.push(`${this.timed?"GPU":"frame"} ${this.ms.toFixed(1)} ms a frame, budget ${(this.cap30?ss:os).toFixed(1)}`);const n=K.filter((l,c)=>ca(e,c)).map(l=>l.label);n.length&&r.push(`in effect: ${n.join("; ")}`);const i=P0(e);return i.adds.length&&r.push(`from the next load: ${i.adds.map(l=>K[l].label).join("; ")}`),i.drops.length&&r.push(`back from the next load: ${i.drops.map(l=>K[l].label).join("; ")}`),r}options(){return[{value:"auto",label:"Auto"},{value:"off",label:"Off (full quality)"},...K.slice(1).map((e,a)=>({value:String(a+1),label:`${a+1}: ${e.label}${e.built?"":" (not built yet)"}`}))]}current(){return this.state.mode==="auto"?"auto":this.state.mode==="off"?"off":String(this.state.rung)}choose(e){this.state=e==="auto"?mt(this.state,"auto"):e==="off"?mt(this.state,"off"):mt(this.state,"pinned",Number(e)),e==="auto"&&this.save(),this.sync()}sync(){ut=this.state.mode==="off"?0:this.state.rung}save(){try{bs()?.setItem(this.key,JSON.stringify({rung:this.state.rung,at:Date.now()}))}catch{}}}function tr(t,e){const a=t.get("ladder"),o=a!==null&&a!==""&&Number.isFinite(Number(a)),s=typeof navigator<"u"&&navigator.webdriver===!0;return a==="off"||s&&a!=="auto"&&!o?mt($a(0),"off"):o?mt($a(Ma(Number(a))),"pinned"):$a(e)}function ar(t){try{const e=JSON.parse(bs()?.getItem(t)??"null");return Ma(Number(e?.rung??0))}catch{return 0}}let ut=null,ua;const or=new WeakMap;function sr(t,e=new Set){ut===null&&(ut=(()=>{const o=tr(rs(),ar(`${er}:${il().slice(0,120)}`));return o.mode==="off"?0:o.rung})());const a=F0(ut);ua===void 0&&(ua=rs().has("px")?null:a.px),a.density!==1&&!e.has("treeDensity")&&(t.treeDensity*=a.density),a.blend!==null&&!e.has("areaEdgeBlend.width")&&(t.areaEdgeBlend.width=Math.min(t.areaEdgeBlend.width,a.blend)),ua&&(t.pixelSize=ua),or.set(t,ut)}const rs=()=>new URLSearchParams(typeof location<"u"?location.search:"");function il(){try{const t=document.createElement("canvas").getContext("webgl2");if(!t)return"unknown";const e=nl(t);return t.getExtension("WEBGL_lose_context")?.loseContext(),e}catch{return"unknown"}}function nl(t){try{return String(sl(t))}catch{return"unknown"}}function is(t,e,a){a?t[e]=!0:delete t[e]}function ns(t){if(!t.length)return NaN;const e=[...t].sort((a,o)=>a-o);return e[Math.floor(e.length/2)]}const ll="witch-mapprep",oo="prep",cl="next",ul=()=>new Promise(t=>{if(vs()){t(null);return}try{const e=indexedDB.open(ll,1);e.onupgradeneeded=()=>e.result.createObjectStore(oo),e.onsuccess=()=>t(e.result),e.onerror=e.onblocked=()=>t(null)}catch{t(null)}});async function hl(){const t=await ul();return t?new Promise(e=>{try{const a=t.transaction(oo,"readonly").objectStore(oo).get(cl);a.onsuccess=()=>{t.close(),e(a.result??null)},a.onerror=()=>{t.close(),e(null)}}catch{t.close(),e(null)}}):null}const dl="v7955 · 28b114c",wo=(t,e)=>`${dl}|${t}|${Or(JSON.stringify(e))}`;function rr(t,e,a){const o=new URLSearchParams({island:t,seed:String(a),...e!=null?{world:String(e)}:{},arrive:"1"}),{tuning:s}=gs(o);return Ss(s,void 0,new Set),sr(s),Ps(co(),s),s}let De="none",Oe=0,Ge=0;const ht=(t,e=0)=>{try{performance.mark("witch:map-prep-source",{detail:{seed:t,status:De,workerMs:Oe,hydrateMs:Ge,checkMs:e}})}catch{}};function so(t,e,a){const o=performance.now();if(De="none",Oe=0,Ge=0,!t)return ht(e),null;if(t.key!==wo(e,a))return De="stale",ht(e,performance.now()-o),t.key.split("|")[1]===String(e)&&t.tuning&&console.info("map prep: another tuning's",Object.keys(a).filter(r=>JSON.stringify(a[r])!==JSON.stringify(t.tuning[r]))),null;const s=br(t.prep);return s?(De="unsound",ht(e,performance.now()-o),console.warn("map prep: unsound, made afresh:",s),null):(vr(t.arch),De="worker",Oe=t.ms,ht(e,performance.now()-o),t.prep)}function fl(t,e,a){const o=performance.now();if(a)try{const s=gr(t,e,a);Ge=performance.now()-o;try{performance.mark("witch:map-hydrated",{detail:{seed:t,ms:Ge,workerMs:Oe}})}catch{}return Oe>0&&Ge>Oe&&console.warn(`map prep: hydrate ${Math.round(Ge)} ms, slower than making it (${Math.round(Oe)} ms in the worker)`),s}catch(s){De="failed",ht(t),console.warn("map prep: hydrate failed, made afresh:",s)}return mr(t,e)}async function pl(t,e,a=1500){return so(typeof indexedDB>"u"?null:await Promise.race([hl(),new Promise(o=>setTimeout(()=>o(null),a))]),t,e)}function ir(t,e,a,o=!0){let s=null,r=()=>{};const n=new Promise(i=>{r=i});try{if(typeof Worker>"u")return r(null),{done:n,stop(){}};s=new Worker(new URL(""+new URL("mapPrep.worker-BQaHXbEG.js",import.meta.url).href,import.meta.url),{type:"module"}),s.onmessage=i=>{r(i.data.rec??i.data.ok),s?.terminate(),s=null},s.onerror=()=>{r(null),s?.terminate(),s=null},Dr(s,{key:wo(t,e),seed:t,tuning:e,send:a,noKeep:!o||vs()},"map-prep",t)}catch{r(null)}return{done:n,stop(){s?.terminate(),s=null,r(null)}}}function gl(t,e,a,o=!1){return ir(a,rr(t,e,a),o)}function ml(t,e,a=1e4){try{const{tuning:o}=gs(e),s=new Set((e.get("set")??"").split(";").map(i=>i.split("=")[0]).filter(Boolean));Ss(o,void 0,s),sr(o,s),Ps(co(),o);const r=ir(t,o,!0,!1),n=setTimeout(()=>r.stop(),a);return r.done.then(i=>(clearTimeout(n),i&&typeof i=="object"?i:null))}catch{return Promise.resolve(null)}}const mc=Object.freeze(Object.defineProperty({__proto__:null,get hydrateMs(){return Ge},prepKey:wo,get prepUsed(){return De},readyMap:fl,sailTuning:rr,startBootMapPrep:ml,startMapPrep:gl,takeMapPrep:pl,useReadyMap:so},Symbol.toStringTag,{value:"Module"}));export{Qo as $,Fe as A,Hl as B,Bl as C,Jl as D,fe as E,ne as F,ke as G,Ds as H,yn as I,Sn as J,Pn as K,te as L,Wl as M,J0 as N,zn as O,po as P,re as Q,Xl as R,Re as S,b0 as T,dc as U,Gl as V,ec as W,pc as X,jl as Y,Jo as Z,fc as _,Ss as a,Te as a0,jo as a1,rc as a2,uc as a3,cc as a4,Br as a5,Es as a6,Rl as a7,ic as a8,Ys as a9,Pl as aA,Ll as aB,Nr as aC,K as aD,sr as aE,Ml as aF,pl as aG,so as aH,fl as aI,Cl as aJ,Fl as aK,ml as aL,gc as aM,nl as aN,ql as aO,Ge as aP,De as aQ,da as aR,Sl as aS,Tl as aT,mc as aU,z0 as aa,ac as ab,hc as ac,nc as ad,oc as ae,lc as af,S0 as ag,sc as ah,Zl as ai,x0 as aj,Ia as ak,Ua as al,Ql as am,y0 as an,El as ao,Ol as ap,Zr as aq,$l as ar,oi as as,ri as at,Mn as au,Al as av,Ja as aw,Yl as ax,Dl as ay,sl as az,Ps as b,co as c,Nl as d,si as e,Aa as f,xn as g,Vo as h,Ue as i,Ae as j,tc as k,Vl as l,Kl as m,_l as n,Ul as o,Il as p,fo as q,Js as r,v0 as s,V0 as t,G0 as u,O0 as v,Q as w,se as x,rt as y,B as z};
