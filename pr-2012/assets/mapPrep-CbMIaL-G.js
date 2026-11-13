import{h as je,dL as xs,dM as ks,dN as Ss,dO as zs}from"./mushrooms-Dxg-rlc7.js";import{cf as Ms,_ as W,V as J,$ as Z,aY as Fs,cg as Cs,bm as Rt,o as he,U as ia,ch as Ra,u as ve,x as ba,bn as vo,ci as Ps,cj as Ls,aj as wa,S as ne,r as Ts,l as _t,R as bo,W as wo,q as yo,k as Dt,a2 as Ga,H as He,Z as As,ac as xo,bv as Da,bw as Oa,a6 as Es,a5 as Rs,a3 as ya,e as xa,at as Gs,I as ko,ab as So,ck as _a,A as Ha,a4 as Ds,ad as Na,af as Os,cl as _s,al as Hs,g as Ns,T as Ws}from"./chartView-CMkrBo2U.js";import{n as Us,P as zo}from"./linkParams-Dwuw8pQA.js";import{a as Mo,b as Fo,c as Co}from"./saveSlots-adtOazhL.js";import{D as Po,s as Lo,k as Vt}from"./decisions-CKiqfyH4.js";import{$ as To}from"./game-MsBYgui3.js";import"./housePieces-DGVRyN1B.js";const Ao="witch.settings";function Eo(){try{const t=Mo.getItem(Ao);return t?JSON.parse(t):{}}catch{return{}}}function ul(t,e){if(!t.persist)return;const o=Eo();e===t.default?delete o[t.id]:o[t.id]=e;try{Mo.setItem(Ao,JSON.stringify(o))}catch{}}function Ro(t,e=Po,o=new Set){const a=Eo(),s=[];for(const r of e){const n=a[r.id];!r.persist||!r.apply.knob||o.has(r.apply.knob)||n===void 0||typeof n!=typeof r.default||r.control.type==="slider"&&typeof n=="number"&&!(n>=r.control.min&&n<=r.control.max)||(Lo(t,r.apply.knob,n),s.push(r.id))}return s}function hl(t,e,o=Po,a=new Set){const s=[];for(const r of o){const n=r.apply.knob;if(!n||a.has(n))continue;const i=Vt(t,n);i===void 0||Vt(e,n)===void 0||Object.is(i,Vt(e,n))||(Lo(e,n,i),s.push(r.id))}return s}const Gt={master:1,music:.5,effects:1,voices:1,muteBackground:!0,quality:"auto",shake:!0,screen:"",reduceFlashing:!1,talk:"hold",textSize:1,glyphs:"auto",rumble:!0},Go="witch.player",Is="witch.settings",na="witch.shake",Do=()=>Ms();function Oo(t){const e=t&&typeof t=="object"?t:{},o={...Gt},a=n=>{const i=e[n];typeof i=="number"&&i>=0&&i<=1&&(o[n]=i)},s=n=>{typeof e[n]=="boolean"&&(o[n]=e[n])},r=(n,i)=>{i.includes(e[n])&&(o[n]=e[n])};return a("master"),a("music"),a("effects"),a("voices"),s("muteBackground"),s("shake"),s("reduceFlashing"),s("rumble"),r("quality",["auto","high","medium","low"]),r("talk",["hold","toggle"]),r("textSize",[1,1.25,1.5]),r("glyphs",["auto","ps","xbox"]),typeof e.screen=="string"&&(o.screen=e.screen.slice(0,80)),o}function $s(t=Do()){if(!t)return{...Gt};try{const e=t.getItem(Go);if(e)return Oo(JSON.parse(e));const o=JSON.parse(t.getItem(Is)??"{}"),a={...Gt};return typeof o.musicVolume=="number"&&o.musicVolume>=0&&o.musicVolume<=1&&(a.music=o.musicVolume),typeof o.sfxVolume=="number"&&o.sfxVolume>=0&&o.sfxVolume<=1&&(a.effects=o.sfxVolume),t.getItem(na)==="0"&&(a.shake=!1),a}catch{return{...Gt}}}function qs(t,e=Do()){if(!e)return!1;try{return e.setItem(Go,JSON.stringify(t)),t.shake?e.setItem(na,"1"):e.setItem(na,"0"),!0}catch{return!1}}const Ot=new WeakMap;function dl(t){const e=Ot.get(t);return e?structuredClone(e):void 0}function fl(t,e){if(!e||!e.voices||typeof e.voices!="object"||!Number.isFinite(e.shake)||!Number.isFinite(e.legendFlash)||Object.values(e.voices).some(o=>!Number.isFinite(o)))throw new Error("Invalid saved settings levels.");Ot.set(t,structuredClone(e))}function _o(t,e){const o=e;let a=Ot.get(o);a||Ot.set(o,a={voices:Object.fromEntries(Object.entries(o.sfx.voice??{}).map(([s,r])=>[s,r.volume??0])),shake:o.combat.shake,legendFlash:o.attackFx?.legendFlash??0}),o.music.volume=t.music*t.master,o.sfx.volume=t.effects*t.master;for(const[s,r]of Object.entries(o.sfx.voice??{}))typeof r.volume=="number"&&(r.volume=(a.voices[s]??r.volume)*t.voices);o.combat.shake=t.shake?a.shake:0,o.attackFx&&(o.attackFx.legendFlash=t.reduceFlashing?0:a.legendFlash)}function pl(t,e){return t==="auto"?"auto":t==="high"?"off":String(t==="medium"?Math.round(e/2):e)}function gl(t,e){return t!=="auto"?t:e&&/xbox|xinput|045e/i.test(e)?"xbox":"ps"}let la=null;function ka(){return la??=$s()}function Bs(t){return la=Oo(t),qs(la)}function ml(t,e){if(typeof e!="number"||t!=="music.volume"&&t!=="sfx.volume")return;const o=ka(),a=o.master>0?Math.min(1,Math.max(0,e/o.master)):e;Bs(t==="music.volume"?{...o,music:a}:{...o,effects:a})}const Ho={none:0,spokes:1,stripes:2,bands:3,flicker:4,rings:5,"colour-spokes":6},it={scale:6,contrast:.9,beatsPerTurn:8,projectorCap:3},js=Math.PI*2,No=(t,e,o)=>Math.max(e,Math.min(o,t));function Ks(t,e){return t=Math.fround(t),e=Math.fround(e),[1/Math.max(.1,t),No(.5+.3*Math.sin(e)+.2*Math.sin(e*1.73+1.2),0,1)]}function Vs(t,e,o=it.beatsPerTurn){const a=Number.isFinite(o)&&o>0?o:it.beatsPerTurn,s=To(t,e)%a;return(s<0?s+a:s)*js/a}function Wo(t,e,o){return e&&!o&&Number.isFinite(t)?No(t,0,1):0}const Js=`
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
`,Sa=[0,1,0,0],Ys=t=>{const e=new URLSearchParams(t).get("patternlight");return e===null?"colour-spokes":e==="off"?"off":e==="auto"||e==="spokes"||e==="stripes"||e==="bands"||e==="colour-spokes"?e:"off"},Xs=Ys(globalThis.location?.search??""),Wa=t=>(t=Math.max(0,Math.min(1,t)),t*t*(3-2*t));function vl(t,e,o,a,s){if(o==="off"||a)return Sa;const r=Math.max(0,To(t,e)),n=r/64,i=o==="auto"?["spokes","stripes","bands"][Math.floor(n)%3]:o,l=r%64,c=o==="auto"?Wa(l/4)*Wa((64-l)/4):1;return[Ho[i],it.scale,Wo(it.contrast*c,!0,a),Vs(t,e,s)]}function Uo(t,e,o){return o?Sa:[Ho[t],t==="rings"?3:6,Wo(t==="flicker"?.5:.75,!0,o),e*(t==="flicker"?.45:.7)]}function bl(t,e,o,a){t&&(t.pattern=o!=="off"&&!a?Uo("flicker",e,!1):void 0)}class Zs{constructor(e,o=it.projectorCap){this.slots=e,this.cap=o,this.data=new Float32Array(e*4)}slots;cap;data;count=0;begin(){this.data.fill(0),this.count=0}write(e,o=Sa){if(!Number.isInteger(e)||e<0||e>=this.slots)return;const a=e*4;this.data[a]>0&&this.count--,this.data.fill(0,a,a+4),!(!(o[0]>0&&o[2]>0)||this.count>=this.cap||!o.every(Number.isFinite))&&(this.data.set(o,a),this.count++)}get used(){return this.count}}const Ht=24,ca=new Zs(Ht),za={uLightPattern:{value:Array.from({length:Ht},()=>new W)}};let Io=1;function wl(t=1){Io=Number.isFinite(t)?Math.max(0,Math.min(4,t)):0,ca.begin();for(const e of za.uLightPattern.value)e.set(0,0,0,0)}function $o(t,e){const o=e?[e[0],e[1],e[2]*Io,e[3]]:void 0;if(ca.write(t,o),!Number.isInteger(t)||t<0||t>=Ht)return;const a=t*4,s=ca.data,r=za.uLightPattern.value[t];if(s[a]>0&&s[a+2]>0){const[n,i]=Ks(s[a+1],s[a+3]);r.set(s[a],n,s[a+2],s[a]===4?i:s[a+3])}else r.set(0,0,0,0)}function Qs(t){for(let e=Math.max(0,Math.floor(t));e<Ht;e++)$o(e)}const be=24,ua=4,Q={...za,uLandscapeTrip:Fs,uAmb:{value:new J},uUnlitDim:{value:1},uMoon:{value:new J},uMoonDir:{value:new J(-.45,.75,.5).normalize()},uMoonBeam:{value:new J},uMoonUp:{value:new W},uShafts:{value:.3},uShaftScale:{value:1},uGlowPos:{value:new J},uGlowRgb:{value:new J},uGlowR:{value:8},uGlowFalloff:{value:2.5},uGlowNear:{value:1},uGlowPower:{value:1.4},uGlowDim:{value:1},uHazeCentre:{value:new Z},uHazeRange:{value:new Z(70,200)},uHazeColour:{value:new J},uTime:{value:0},uLightPos:{value:Array.from({length:be},()=>new W)},uLightCol:{value:Array.from({length:be},()=>new W)},uLightCount:{value:0},uLightKnee:{value:new Z(.9,1.1)},uGlade:{value:Array.from({length:ua},()=>new W)},uGladeCount:{value:0},uGladeRgb:{value:new J},uGladeLight:{value:new Z},uDim:{value:1},uSlow:{value:new W},uSlowKeep:{value:new W},uRealTime:{value:0},uMirrorMoon:{value:new J},uDisco:{value:new W},uDiscoParams:{value:new W},uContourDream:{value:new J(0,1.5,.12)},uDiscoColour:{value:new J(1,1,1)},uScenery:{value:new Z(1e6,1)},uCanopyReach:{value:0},uPartyOver:{value:new W(0,0,0,30)}},er=.95,tr=.55,ar=.16;function yl(t,e,o,a=1,s=2.5,r=1){const n=(i,l)=>new J(i[0]/255*l,i[1]/255*l,i[2]/255*l);Q.uAmb.value.copy(n(je(t.ambientHue,.55,1),t.ambient*a)),Q.uMoon.value.copy(n(je(t.moonHue,t.moonSat??.35,1),t.moon*r)),Q.uMoonBeam.value.copy(n(je(t.moonHue,.35,1),t.shafts*.25)),Q.uShafts.value=t.shafts,Q.uShaftScale.value=o*2,Q.uGlowRgb.value.copy(n(je(t.glowHue,t.glowSat,1),1)),Q.uGlowR.value=e,Q.uGlowFalloff.value=s,Q.uGlowPower.value=t.glowPower,Q.uHazeColour.value.copy(n(je(t.ambientHue-.08,.55,1),.16*Math.sqrt(a)))}const Ma=`
${Cs}
uniform vec3 uAmb, uMoon, uMoonDir, uMoonBeam, uGlowPos, uGlowRgb;
uniform float uUnlitDim;
uniform vec4 uMoonUp;
uniform float uShafts, uShaftScale, uGlowR, uGlowFalloff, uGlowNear, uGlowPower, uGlowDim, uTime;
uniform vec2 uHazeCentre, uHazeRange;
uniform vec3 uHazeColour;
uniform vec4 uLightPos[${be}], uLightCol[${be}];
uniform vec4 uLightPattern[${be}];
${Js}
uniform vec4 uGlade[${ua}];
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
  for (int i = 0; i < ${ua}; i++) {
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
  for (int i = 0; i < ${be}; i++) {
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
  vec3 warm = max(min(dot(col, Y), ${tr.toFixed(3)}), ${ar.toFixed(3)} * fall) * uGlowRgb / max(1e-3, dot(uGlowRgb, Y));
  return mix(col, min(vec3(1.0), warm), ${er.toFixed(2)} * fall);
}
`,or=4,nt=9,me={uHiz:{value:null},uHizOn:{value:0},uHizSize:{value:new Z(1,1)},uHizLevels:{value:0},uHizAt:{value:Array.from({length:nt},()=>new W)}},sr=`
uniform sampler2D uHiz;
uniform float uHizOn, uHizLevels;
uniform vec2 uHizSize;
uniform vec4 uHizAt[${nt}];
bool hizHidden(vec2 lo, vec2 hi, float near) {
  if (uHizOn < 0.5) return false;
  lo = clamp(lo, vec2(0.0), uHizSize - 1.0); hi = clamp(hi, vec2(0.0), uHizSize - 1.0);
  float span = max(hi.x - lo.x, hi.y - lo.y) + 1.0;
  int L = int(ceil(log2(max(span, 1.0))));
  if (float(L) > uHizLevels - 1.0) return false;
  vec4 at = uHizAt[0];
  for (int i = 0; i < ${nt}; i++) if (i == L) at = uHizAt[i];
  float cell = exp2(float(L));
  vec2 a = min(floor(lo / cell), at.zw - 1.0), b = min(floor(hi / cell), at.zw - 1.0);
  vec2 ts = vec2(textureSize(uHiz, 0));
  float far = 0.0;
  for (int j = 0; j < 2; j++) for (int i = 0; i < 2; i++) {
    vec2 c = vec2(i == 0 ? a.x : b.x, j == 0 ? a.y : b.y);
    far = max(far, texelFetch(uHiz, ivec2(at.xy + c), 0).r);
  }
  return near > far;
}`,rr="varying vec2 vUv; void main() { vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }",ir="uniform sampler2D uSrc; void main() { gl_FragColor = vec4(texelFetch(uSrc, ivec2(gl_FragCoord.xy), 0).r, 0.0, 0.0, 1.0); }",nr=`
uniform sampler2D uSrc; uniform vec2 uSrcSize;
void main() {
  ivec2 p = ivec2(gl_FragCoord.xy) * 2, m = ivec2(uSrcSize) - 1;
  float d = 0.0;
  for (int j = 0; j < 3; j++) for (int i = 0; i < 3; i++) {
    if ((i == 2 && p.x + 2 != m.x) || (j == 2 && p.y + 2 != m.y)) continue;
    d = max(d, texelFetch(uSrc, min(p + ivec2(i, j), m), 0).r);
  }
  gl_FragColor = vec4(d, 0.0, 0.0, 1.0);
}`,lr="uniform sampler2D uSrc; uniform vec2 uAt; void main() { gl_FragColor = texelFetch(uSrc, ivec2(gl_FragCoord.xy - uAt), 0); }";class xl{depth=new Rt(1,1,{depthBuffer:!0,stencilBuffer:!1});levels=[];atlas=new Rt(1,1,{type:Ra,format:ia,minFilter:he,magFilter:he,depthBuffer:!1});quad=new ve(new ba(2,2));cam=new vo(-1,1,1,-1,0,1);copy;reduce;place;size={w:0,h:0};ok;constructor(e){this.depth.depthTexture=new Ps(1,1,Ls);const o=(a,s)=>new ne({vertexShader:rr,fragmentShader:a,uniforms:s,depthTest:!1,depthWrite:!1});this.copy=o(ir,{uSrc:{value:null}}),this.reduce=o(nr,{uSrc:{value:null},uSrcSize:{value:new Z}}),this.place=o(lr,{uSrc:{value:null},uAt:{value:new Z}}),this.quad.frustumCulled=!1,this.ok=e.capabilities.isWebGL2&&!!e.extensions.get("EXT_color_buffer_float")}resize(e,o){if(e===this.size.w&&o===this.size.h)return;this.size={w:e,h:o},this.depth.setSize(e,o);for(const l of this.levels)l.dispose();this.levels=[];let a=e,s=o,r=0,n=0;const i=me.uHizAt.value;for(;n<nt;n++){const l=new Rt(a,s,{type:Ra,format:ia,minFilter:he,magFilter:he,depthBuffer:!1});if(this.levels.push(l),i[n].set(n===0?0:e,n===0?0:r,a,s),n>0&&(r+=s),a<=2&&s<=2){n++;break}a=Math.max(1,Math.ceil(a/2)),s=Math.max(1,Math.ceil(s/2))}for(let l=n;l<nt;l++)i[l].set(0,0,0,0);me.uHizLevels.value=n,this.atlas.setSize(e+Math.ceil(e/2),Math.max(o,r)),me.uHizSize.value.set(e,o)}render(e,o,a,s,r,n){if(me.uHizOn.value=0,!n||!this.ok||s<1||r<1)return;this.resize(s,r);const i=e,l=a.layers.mask,c=i.getRenderTarget(),d=i.autoClear,f=i.getClearColor(new wa),g=i.getClearAlpha();a.layers.set(or),i.setRenderTarget(this.depth),i.setClearColor(0,0),i.autoClear=!0,i.render(o,a),a.layers.mask=l;const p=(u,h)=>{this.quad.material=u,i.setRenderTarget(h),i.render(this.quad,this.cam)};this.copy.uniforms.uSrc.value=this.depth.depthTexture,p(this.copy,this.levels[0]);for(let u=1;u<this.levels.length;u++){const h=this.levels[u-1];this.reduce.uniforms.uSrc.value=h.texture,this.reduce.uniforms.uSrcSize.value.set(h.width,h.height),p(this.reduce,this.levels[u])}i.setRenderTarget(this.atlas),i.setClearColor(0,0),i.clear(),i.autoClear=!1;const v=me.uHizAt.value;this.levels.forEach((u,h)=>{const b=v[h];this.place.uniforms.uSrc.value=u.texture,this.place.uniforms.uAt.value.set(b.x,b.y),this.atlas.viewport.set(b.x,b.y,b.z,b.w),i.setRenderTarget(this.atlas),this.quad.material=this.place,i.render(this.quad,this.cam)}),this.atlas.viewport.set(0,0,this.atlas.width,this.atlas.height),i.autoClear=d,i.setClearColor(f,g),i.setRenderTarget(c),me.uHiz.value=this.atlas.texture,me.uHizOn.value=1}compile(e){return Promise.all([this.copy,this.reduce,this.place].map(o=>{const a=new ve(this.quad.geometry,o);return a.frustumCulled=!1,e.compileAsync(a,this.cam)}))}dispose(){this.depth.dispose(),this.atlas.dispose();for(const e of this.levels)e.dispose();this.copy.dispose(),this.reduce.dispose(),this.place.dispose(),this.quad.geometry.dispose()}}const kl=`
float hash(vec2 p) { p = fract(p * vec2(123.34, 456.21)); p += dot(p, p + 45.32); return fract(p.x * p.y); }
float vnoise(vec2 p) {
  vec2 i = floor(p), f = fract(p), u = f * f * (3.0 - 2.0 * f);
  float a = hash(i), b = hash(i + vec2(1, 0)), c = hash(i + vec2(0, 1)), d = hash(i + vec2(1, 1));
  return a + (b - a) * u.x + (c - a) * u.y + (a - b - c + d) * u.x * u.y;
}
`,Sl=`
float bayer2(vec2 a) { a = floor(a); return fract(a.x / 2.0 + a.y * a.y * 0.75); }
float bayer4(vec2 a) { return bayer2(0.5 * a) * 0.25 + bayer2(a); }
`,cr=`
float windGust(vec2 q) {
  vec2 i = floor(q), f = fract(q), e = f * f * (3.0 - 2.0 * f);
  float h00 = fract(sin(dot(i, vec2(127.1, 311.7))) * 43758.5453), h10 = fract(sin(dot(i + vec2(1, 0), vec2(127.1, 311.7))) * 43758.5453);
  float h01 = fract(sin(dot(i + vec2(0, 1), vec2(127.1, 311.7))) * 43758.5453), h11 = fract(sin(dot(i + vec2(1, 1), vec2(127.1, 311.7))) * 43758.5453);
  return mix(mix(h00, h10, e.x), mix(h01, h11, e.x), e.y);
}
`,Fa=`
vec2 pixelSnap(vec4 b) {
  vec2 ndc = b.xy / b.w, snapped = (floor((ndc * 0.5 + 0.5) * uRes) + 0.5) / uRes * 2.0 - 1.0;
  return snapped - ndc;
}
`,lt=256;function ha(t){t.byteOffset%4&&(t=t.slice());const e=t.length>>2,o=new Uint32Array(t.buffer,t.byteOffset,e),a=new Uint8Array(e),s=new Map([[0,0]]),r=new Uint8Array(lt*4);let n=0,i=0;for(let l=0;l<e;l++){const c=o[l];if(c!==n){let d=s.get(c);if(d===void 0){if(d=s.size,d>=lt)return null;s.set(c,d),r.set(t.subarray(l*4,l*4+4),d*4)}n=c,i=d}a[l]=i}return{idx:a,pal:r}}const zl=(t,e,o,a)=>e?e[t[o]*4+a]:t[o*4+a],Ua=(t,e,o)=>o?t*e+lt*4:t*e*4;function Jt(t,e,o){return t.getContext("2d").getImageData(0,0,e,o).data}const ur=(t,e=2048)=>Ts(hr(t,e));function*hr(t,e=2048){const a=[],s=new Map;let r=0,n=0,i=0,l=1;for(const[u,h]of t.entries()){const b=s.get(h);if(b!==void 0){a.push(a[b]);continue}s.set(h,u),r+h.w+1>e&&(r=0,n+=i+1,i=0),a.push({x:r,y:n}),r+=h.w+1,i=Math.max(i,h.h),l=Math.max(l,r)}const c=Math.max(1,n+i),d=new Uint8Array(l*c*4),f=new Uint8Array(l*c*4),g=[];for(let u=0;u<t.length;u++){u&&u%4===0&&(yield);const h=t[u],b=s.get(h);if(b!==u){g.push(g[b]);continue}const w=a[u],m=Jt(h.A,h.w,h.h),y=Jt(h.N,h.w,h.h),k=h.S?Jt(h.S,h.w,h.h):null,z=k?Array.from({length:h.h},(M,A)=>Array.from({length:h.w},(N,O)=>k[(A*h.w+O)*4+1])):null;for(let M=0;M<h.h;M++){const A=M*h.w*4,N=((w.y+M)*l+w.x)*4;if(d.set(m.subarray(A,A+h.w*4),N),h.eyes)for(let O=0;O<h.w;O++)h.eyes[M*h.w+O]&&d[N+O*4+3]===255&&(d[N+O*4+3]=253);if(f.set(y.subarray(A,A+h.w*4),N),h.S){const O=z[M];for(let _=0;_<h.w;_++)f[N+_*4+3]&&(f[N+_*4+3]=O[_])}}let x=0;e:for(let M=h.h-1;M>=0;M--,x++)for(let A=0;A<h.w;A++)if(m[(M*h.w+A)*4+3]>=128)break e;let C=0;if(x<h.h){const M=h.h-1-x;for(let A=0;A<h.w;A++)m[(M*h.w+A)*4+3]>=128&&(C=Math.max(C,Math.abs(A+.5-h.w/2)+.5))}g.push({uv:[w.x/l,w.y/c,(w.x+h.w)/l,(w.y+h.h)/c],w:h.w,h:h.h,pad:Math.min(x,h.h),...C?{foot:C}:{},...h.S?{masked:!0}:{},...h.head?{head:h.head}:{},...h.tall?{tall:h.tall}:{}})}yield;const p=ha(d);yield;const v=ha(f);return{albedo:p?.idx??d,normal:v?.idx??f,albedoPal:p?.pal??null,normalPal:v?.pal??null,width:l,height:c,frames:g}}function qo(t,e,o,a){const{at:s=.5,r=.08,wide:n=.03,colour:i,up:l=[0,.8,-.6],sides:c=8,ry:d=r}=a,f=Math.hypot(o[0]-e[0],o[1]-e[1],o[2]-e[2])||1,g=v=>e.map((u,h)=>u+(o[h]-u)*v),p=n/f;return{bones:[],cones:[],lofts:[{sides:c,up:l,rings:[[-p,.82],[-p/2,1],[p/2,1],[p,.82]].map(([v,u])=>({at:g(s+v),rx:r*u,ry:d*u,bone:t,colour:i,up:l}))}]}}const Nt=t=>[["hip","knee","hock"],["shoulder","elbow","wrist"]].flatMap((e,o)=>["L","R"].map((a,s)=>({bones:e.map(r=>r+a),phase:t[o][s]}))),Ia=()=>Nt([[0,.5],[.75,.25]]),$a=()=>Nt([[0,.5],[.5,0]]),dr=()=>Nt([[0,.05],[.47,.53]]),fr=()=>Nt([[0,.04],[.5,.56]]),qa={amble:{type:"walk",seconds:1.1,duty:.8,reach:.5,step:.13,legs:Ia(),body:{bob:.035,pitch:.018,roll:.045,sway:.035,yaw:.06,head:.75,tail:1.2,lag:.09,wag:.12}},trot:{type:"trot",seconds:.6,duty:.4,reach:.95,step:.22,leap:.07,legs:$a(),body:{bob:.07,pitch:.03,roll:.02,sway:.01,yaw:.05,head:.8,tail:1.3,lag:.1,wag:.08}},patter:{type:"trot",seconds:.36,duty:.3,reach:1.1,step:.2,leap:.05,legs:$a(),body:{bob:.05,pitch:.025,roll:.03,sway:.02,yaw:.08,head:.8,tail:1,lag:.1,wag:.1}},scramble:{type:"walk",seconds:.5,duty:.52,reach:1.1,step:.2,legs:Ia(),body:{bob:.03,pitch:.02,roll:.06,sway:.04,yaw:.11,head:.8,tail:1,lag:.1,wag:.1}},hop:{type:"bound",seconds:.7,duty:.58,reach:.5,step:.16,legs:fr(),body:{bob:.03,pitch:.06,flex:.1,roll:0,sway:0,yaw:.015,head:.8,tail:1.2,lag:.08,wag:.03}},bound:{type:"bound",seconds:.5,duty:.22,reach:1,step:.24,leap:.4,legs:dr(),body:{bob:.05,pitch:.15,flex:.24,roll:0,sway:0,yaw:.012,head:.85,tail:1.4,lag:.07,wag:.02}}},Ba=(t,e={})=>({...qa[t],...e,body:{...qa[t].body,...e.body}}),Ue=(t,e)=>(o={})=>{const{walk:a={},run:s={},...r}=o,n=Ba(e,s);return{type:n.type,seconds:n.seconds,legs:n.legs,...r,paces:{walk:Ba(t,a),run:n}}},Wt=Ue("amble","trot"),we=Ue("hop","bound"),oe=Ue("hop","bound"),ut=Ue("amble","trot"),ye=Ue("amble","patter"),pr=Ue("amble","scramble");function H(t,e,o,a,s,r={}){return{name:t,bones:[...e.bones,...o.bones,...a.flatMap(n=>n.bones)],lofts:[{sides:8,up:[0,1,0],rings:[...e.rings,...o.rings]},...o.lofts??[],...a.flatMap(n=>n.lofts)],cones:[...o.cones,...a.flatMap(n=>n.cones),...r.cones??[]],armour:r.armour??[],gait:{root:"pelvis",hips:"pelvis",chest:"chest",neck:"neck",head:"head",ears:o.ears,...s},anchors:{neck:5,skull:e.rings.length}}}const Ee=(t,e,o=-.25)=>a=>a<o?e:t;function Ie(t,e){const{size:o=1,muzzle:a=1,ear:s={},cheek:r=1,eye:n=1,colours:i,white:l=.5,wide:c=1,dome:d=1,muzzleWide:f=1,muzzleDeep:g=1,nose:p=1,stripe:v,eyeAt:u=[0,0,0]}=e,h=o,b=a,w=(S,E,G)=>[S*h,t[1]+E*h,t[2]+G*h],m=l*.7-.85,y=i.muzzle??i.mask??i.coat,k=(S,E)=>v?(G,U)=>v(G,U)??Ee(S,i.belly,E)(G):Ee(S,i.belly,E),z=[{at:w(0,.03,.04),rx:.09*h*c,ry:.074*h*d,bone:"head",colour:k(i.coat,m)},{at:w(0,.025,.11),rx:.08*h*c,ry:.066*h*d,bone:"head",colour:k(i.mask??i.coat,m+.2)},{at:w(0,0,.16),rx:.044*h*f,ry:.044*h*g,bone:"head",colour:k(y,m+.4)},{at:w(0,-.013,.16+.065*b),rx:.03*h*f,ry:.03*h*g,bone:"head",colour:Ee(y,i.belly,m+.55)},{at:w(0,-.013,.16+.087*b),rx:.02*h*p,ry:.02*h*p,bone:"head",colour:i.nose},{at:w(0,-.013,.16+.101*b),rx:.009*h*p,ry:.009*h*p,bone:"head",colour:i.nose}],x=s.tall??1,C=s.wide??1,M=[],A=[],N=[["head",t,"neck"]],[O=0,_=0,T=0]=s.at??[],D=s.shape??"point";for(const S of[1,-1]){const E=S>0?"earL":"earR",G=.048*c+O,U=w(G*S,.07*d+_,.025+T),j=s.torn===S,Y=j?.6:1;if(N.push([E,U,"head"]),D==="point"){const F=(R,I)=>w((G+(.026+(s.splay??0)*.1)*x*I+R)*S,.07*d+_+.16*x*I,.025+T-.015*I);M.push({at:U,rx:.042*h*C,ry:.034*h*C,tip:F(0,Y),bone:E,colour:R=>R<0?s.back??i.coat:i.coat,tipColour:s.tip??s.back??i.coat,split:j?.75:.62,up:[0,0,1]}),j&&M.push({at:w(.03*S,.1,.02),rx:.016*h,ry:.014*h,tip:F(-.03,.72),bone:E,colour:s.back??i.coat,up:[0,0,1]})}else{const F=D==="long",R=(F?.16:.075)*x*Y,I=s.lean??(F?.25:0),V=s.splay??(F?.12:.35),fe=F?[[0,.5],[.3,1],[.62,.92],[.86,.6],[1,.12]]:[[0,.8],[.45,1],[.8,.75],[1,.3]],re=[0,Math.sin(I),Math.cos(I)];A.push({sides:6,up:re,rings:fe.map(([Ge,ct],qt)=>({at:w((G+V*R*Ge)*S,.07*d+_+R*Ge*Math.cos(I),.025+T-R*Ge*Math.sin(I)),rx:.04*h*C*ct,ry:(F?.012:.016)*h*C*(.6+.4*ct),bone:E,up:re,colour:Ge>(F?.78:2)?s.tip??s.back??i.coat:Bt=>Bt>0?s.inner??i.coat:s.back??i.coat}))}),j&&M.push({at:w((G+V*R)*S,.07*d+_+R*.9,.025+T-R*Math.sin(I)),rx:.012*h,ry:.008*h,tip:w((G+V*R*1.3+.02)*S,.07*d+_+R*1.25,.025+T-R*Math.sin(I)*1.2),bone:E,colour:s.back??i.coat,up:re})}r&&M.push({at:w(.06*c*S,-.005,.065),rx:.04*h,ry:.03*h,tip:w((.06*c+.075*r)*S,-.005-.035*r,.065-.065*r),bone:"head",colour:i.cheek??i.belly,split:.5,up:[0,1,0]});const P=i.eyes?.[S>0?0:1],L=.058*c+u[0];M.push({at:w(L*S,.055*d+u[1],.117+u[2]),rx:.019*h*n,ry:.016*h*n,tip:w((L+.016*n)*S,.063*d+u[1],.125+u[2]),bone:"head",colour:P?.colour??i.eye??i.nose,glow:!!P?.glow,tag:"eye",split:.5,up:[0,1,0],sides:4})}return{bones:N,rings:z,cones:M,lofts:A,P:w,ears:["earL","earR"]}}function ja(t,e,o,a,s){const{len:r=1,thick:n=1,parent:i,colours:l,band:c,knob:d=1,claws:f,foot:g=1,paw:p=1}=s,v=r,u=n*r,h=(x,C,M)=>[a[0]+x*v*o,a[1]+C*v,a[2]+M*v],b=t==="hind",w=b?["hip","knee","hock","hpaw"]:["shoulder","elbow","wrist","fpaw"],m=w.map(x=>x+e),y=b?[[0,0,0],[.01,-.145,.065],[.01,-.245,-.065],[.01,-.348,-.035]]:[[0,0,0],[.005,-.125,-.035],[.005,-.255,-.02],[.005,-.318,-.015]],k=b?[[-.005,.02,-.005,.056,.111,0,"upper"],[.005,-.07,.035,.059,.098,0,"upper"],[.01,-.145,.065,.039,.052,0,"mid"],[.01,-.245,-.065,.024,.029,1,"sock"],[.01,-.34,-.038,.022,.023,2,"sock"],[.01,-.358,-.012,.031,.016,3,"sock",1],[.01,-.36,.035,.028,.013,3,"sock",1]]:[[-.002,.03,.01,.049,.085,0,"upper"],[.003,-.05,-.015,.05,.075,0,"upper"],[.005,-.125,-.035,.034,.042,0,"mid"],[.005,-.255,-.02,.022,.025,1,"sock"],[.005,-.312,-.017,.022,.022,2,"sock"],[.005,-.328,.01,.031,.016,3,"sock",1],[.005,-.33,.05,.028,.013,3,"sock",1]],z={bones:y.map((x,C)=>[m[C],h(...x),C?m[C-1]:i]),lofts:[{sides:5,up:[0,0,1],rings:k.map(([x,C,M,A,N,O,_,T],D)=>({at:h(x,C,D===6?k[5][2]+(M-k[5][2])*g:M),rx:A*u*(D===2||D===3?d:1)*(T?p:1),ry:N*u*(D===2||D===3?d:1),bone:m[O],colour:l[_],...T?{up:[0,1,0]}:{}}))}],cones:[],names:m};if(f){const x=[k[6][0],k[6][1],k[5][2]+(k[6][2]-k[5][2])*g],C=(f.wide??1)*p;for(const M of[-.02,0,.02])z.cones.push({at:h(x[0]+M*C,x[1]+.004,x[2]-.005),rx:.008*u*(f.thick??1),ry:.008*u*(f.thick??1),tip:h(x[0]+M*1.3*C,x[1]-.008,x[2]+.03*(f.len??1)),bone:m[3],colour:f.colour,up:[0,1,0],sides:3})}if(c){const x=h(...y[2]),C=h(...y[3]),M=O=>x.map((_,T)=>_+(C[T]-_)*O),A=(c.r??.034)*u,N=.035;z.lofts.push({sides:6,up:[0,0,1],rings:[[-N,.6],[-N/2,1],[N/2,1],[N,.6]].map(([O,_])=>({at:M(c.at+O),rx:A*_,ry:A*_,bone:m[2],colour:c.colour}))})}return z}function Ca(t,e,o=e){const a=[];for(const[s,r]of[[1,"L"],[-1,"R"]]){const n=t.hip(s),i=t.shoulder(s);a.push(ja("hind",r,s,[n[0]*(e.spread??1),.37*e.len,n[2]],{...e,parent:"pelvis"}),ja("fore",r,s,[i[0]*(o.spread??1),.34*o.len,i[2]],{...o,parent:"chest"}))}return a}const Bo=(t,e=t)=>({back:.37*t+.01,drop:.37*t-.03-.34*e});function $e(t){const{back:e=.38,len:o=1,girth:a=1,deep:s=1,tuck:r=1,neck:n=[.17,.15],neckThick:i=1,white:l=.5,hump:c=0,arch:d=0,drop:f=0,rump:g=1,colours:p}=t,v=a,u=p,h=x=>u.back?C=>C>.75?u.back:C<x?u.belly:u.coat:Ee(u.coat,u.belly,x),b=x=>x*o,w=l*.9-1.05,m=x=>Math.min(1.1,Math.max(-.2,(x+.275)/.46)),y=x=>d*.07*Math.sin(Math.PI*Math.min(1,Math.max(0,m(x))))-f*m(x),k=[0,e-.005+y(.185),b(.185)];return{pivot:[0,k[1]+n[0],k[2]+n[1]],bones:[["root",[0,0,0],null],["pelvis",[0,e+.01+y(-.26),b(-.26)],"root"],["loin",[0,e+.02+y(-.1),b(-.1)],"pelvis"],["chest",[0,e+.005+y(.08),b(.08)],"loin"],["neck",[0,k[1]+n[0]*.35,k[2]+n[1]*.45],"chest"]],rings:[{at:[0,e+.005+y(-.365)-(g-1)*.02,b(-.365)],rx:.03*v*g,ry:.035*v*g,bone:"pelvis",colour:u.coat},{at:[0,e-.005+y(-.275),b(-.275)],rx:.088*v*g,ry:.1*v*g,bone:"pelvis",colour:h(w-.55)},{at:[0,e+.01+(1-r)*.03+y(-.12),b(-.12)],rx:.082*v*(.6+.4*r),ry:.088*v*r,bone:"loin",colour:h(w-.3)},{at:[0,e-.01-(s-1)*.04+c*.025+y(.05),b(.05)],rx:.096*v,ry:(.122*s+c*.03)*v,bone:"chest",colour:h(w-.1)},{at:[0,k[1]-(s-1)*.04+c*.05,k[2]],rx:.094*v,ry:(.125*s+c*.055)*v,bone:"chest",colour:h(w+.15)},{at:[0,k[1]+n[0]*.35,k[2]+n[1]*.5],rx:.068*v*i,ry:.09*v*i,bone:"neck",colour:Ee(u.coat,u.belly,w+.3),up:[0,.8,-.6]},{at:[0,k[1]+n[0]*.82,k[2]+n[1]*.92],rx:.06*v*i,ry:.07*v*i,bone:"neck",colour:Ee(u.coat,u.belly,w+.3),up:[0,.75,-.65]}],hip:x=>[.065*v*g*x,e-.01,b(-.25)],shoulder:x=>[.06*v*x,e-.04-f,b(.175)]}}const de=["pelvis","pelvis","loin","chest","chest","neck","neck"];function Re(t){const e={colours:t.C,...t.hind},o={colours:t.C,...t.fore??t.hind},a=$e({...Bo(e.len,o.len),...t.body,colours:t.C}),s=Ie(a.pivot,{...t.head,colours:t.C});return{body:a,skull:s,legs:Ca(a,e,o),root:[0,a.rings[1].at[1]+.01,a.rings[0].at[2]+.03],R:a.rings,P:s.P}}function $(t,e,o,a){const{len:s=.5,r=.094,yaw:n=0,pitch:i=-.33,curl:l=0,twist:c=0,wave:d=0,waves:f=1,phase:g=0,colours:p,tip:v=.2,sides:u=7,blunt:h=.05,bones:b=4,fire:w,ring:m,spikes:y,plume:k=!1}=a,z=24,x=[[...o]],C=[];for(let P=0;P<z;P++){const L=(P+.5)/z,F=i+l*L+d*Math.sin(Math.PI*2*f*L+g),R=n+c*L,I=[Math.sin(R)*Math.cos(F),Math.sin(F),-Math.cos(R)*Math.cos(F)];C.push(I),x.push(x[P].map((V,fe)=>V+I[fe]*s/z))}const M=P=>{const L=Math.min(z-1e-6,Math.max(0,P*z)),F=Math.floor(L),R=L-F;return x[F].map((I,V)=>I+(x[F+1][V]-I)*R)},A=P=>C[Math.min(z-1,Math.max(0,Math.floor(P*z)))],N=P=>{const L=A(P),F=Math.abs(L[1])>.9?[0,0,1]:[0,1,0],R=F[0]*L[0]+F[1]*L[1]+F[2]*L[2],I=F.map((fe,re)=>fe-L[re]*R),V=Math.hypot(...I)||1;return I.map(fe=>fe/V)},O=Array.from({length:b},(P,L)=>.04+L/b*.95),_=O.map((P,L)=>[`${t}${L+1}`,M(P),L?`${t}${L}`:e]),T=P=>{let L=e;for(let F=0;F<b;F++)P>=O[F]+.5*(.95/b)&&(L=`${t}${F+1}`);return L},D=`${t}${b}`,S=k?[[0,.3],[.12,.34],[.28,.48],[.44,.72],[.58,.94],[.7,1],[.8,.86],[.9,.52],[1,.04]]:[[0,.28],[.1,.5],[.22,.8],[.38,.96],[.54,1],[.7,.9+h*.2],[.82,.74+h*.4],[.92,.5+h*.6],[1,h]],E={bones:_,cones:[],chain:_.map(P=>P[0]),lofts:[{sides:u,up:[0,1,0],rings:S.map(([P,L])=>({at:M(P),rx:r*L,ry:r*L*1.03,bone:T(P),up:N(P),colour:P>=1-v?p.tip:P>.45?Ee(p.coat,p.under??p.coat,-.3):p.coat}))}]},G=(P,L)=>{const F=M(P),R=N(P);return F.map((I,V)=>I+R[V]*L)},U=M(1),j=A(1);if(w){const P=w.size??1,L=U.map((F,R)=>F+j[R]*.03*P);E.cones.push({at:L,rx:.045*P,ry:.045*P,tip:L.map((F,R)=>F+j[R]*.06*P+(R===1?.14*P:0)),bone:D,colour:w.colour,tipColour:w.tip??w.colour,glow:!0,split:.55,up:N(1),sides:5},{at:L,rx:.045*P,ry:.045*P,tip:L.map((F,R)=>F-j[R]*.05*P-(R===1?.03*P:0)),bone:D,colour:w.colour,glow:!0,up:N(1),sides:5})}const Y=P=>{let L=0;for(;L+2<S.length&&S[L+1][0]<P;)L++;const[F,R]=S[L],[I,V]=S[L+1];return R+(V-R)*Math.min(1,Math.max(0,(P-F)/(I-F)))};if(m&&E.lofts.push({sides:u,up:[0,1,0],rings:[[-.018,.95],[-.008,1.14],[.008,1.14],[.018,.95]].map(([P,L])=>{const F=m.at+P,R=Y(F);return{at:M(F),rx:r*R*L,ry:r*R*L,bone:T(F),up:N(F),colour:m.colour}})}),y)for(let P=0;P<y.n;P++){const L=.2+P/y.n*.62,F=.85+.15*Math.sin(P*2.3),R=A(L).map(I=>-I*.03);E.cones.push({at:G(L,r*.75),rx:.03,ry:.022,tip:G(L-.05,r*.9+.07*(y.len??1)*F).map((I,V)=>I+R[V]),bone:T(L),colour:p.coat,tipColour:y.colour??p.coat,split:.5,up:A(L),sides:4,glow:y.glow})}return E}function B(t,e,o){const a=[],{n:s=6,a0:r=.2,a1:n=2.6,long:i=.2,sweep:l=.6,r:c=.045,colour:d,tip:f,grow:g=0,droop:p=.15,sides:v=4,glow:u=!1,flat:h=.8,jitter:b=.3,lock:w=!1}=o;for(const m of[1,-1])for(let y=0;y<s;y++){const k=r+(n-r)*(s===1?0:y/(s-1)),z=Math.sin(k)*m,x=Math.cos(k),C=i*(1+g*(y/Math.max(1,s-1)))*(1-b/2+b*((y*7+(m>0?0:3))%5)/4),M=[t.at[0]+z*t.rx*.8,t.at[1]+x*t.ry*.8,t.at[2]];a.push({at:M,rx:c,ry:c*h,tip:[M[0]+z*C*(1-l)*.8,M[1]+x*C*(1-l)*.8-C*p,M[2]-C*l],bone:e,colour:d(y,m),tipColour:f?.(y,m)??d(y,m),split:w?.45:.5,up:[0,0,1],sides:w?5:v,glow:typeof u=="function"?u(y,m):u,...w?{bulge:.9,bend:[z*C*.12,x*C*.12+C*.06,0]}:{}})}return a}const ot="#1b1817",gr="#b9722e",Se="#f2efe7",ht={coat:"#8d8d88",belly:ot,mask:Se,muzzle:Se,nose:"#141110",upper:"#2a2625",mid:ot,sock:ot,eye:"#0d0b0b",cheek:Se},mr=(t=1)=>(e,o)=>{const a=Math.abs(o);return e>-.55&&a>.3/t&&a<.3/t+.5*t?ot:e>-.2?Se:void 0},dt=(t,e)=>Re({C:t,hind:{len:.44,thick:1.9,...e.hind},fore:{len:.44,thick:2,...e.fore},body:{len:.95,girth:1.3,deep:.95,tuck:1.05,neck:[.03,.15],neckThick:1.35,white:.5,...e.body},head:{size:1.08,muzzle:.85,muzzleWide:1.2,wide:1.02,dome:.92,cheek:0,eye:.9,stripe:mr(e.bands??1),...e.head,ear:{shape:"round",tall:.55,wide:1,at:[.016,-.014,-.012],back:ot,inner:Se,tip:Se,...e.ear}}}),vr={baby(){const t={...ht,coat:"#a3a39d"},e=dt(t,{hind:{len:.3,thick:2},fore:{len:.3,thick:2},body:{len:.58,girth:1.3,neck:[.02,.09]},head:{size:1.5,muzzle:.6,eye:1.3},bands:.75}),o=$("tail","pelvis",e.root,{len:.1,r:.034,pitch:-.3,blunt:.08,tip:0,colours:{coat:t.coat,tip:t.coat}});return H("badger-baby",e.body,e.skull,[...e.legs,o],ut({lively:1.3,tails:[o.chain]}))},young(){const t=dt(ht,{body:{len:.9,girth:1.1,tuck:.95},head:{size:1.02}}),e=$("tail","pelvis",t.root,{len:.17,r:.04,pitch:-.35,blunt:.08,tip:0,colours:{coat:"#a3a39d",tip:"#a3a39d"}});return H("badger-young",t.body,t.skull,[...t.legs,e],ut({lively:1.1,tails:[e.chain]}))},adult(){const t=dt(ht,{fore:{len:.46,thick:2.4,paw:1.5,claws:{colour:"#e9e2cf",len:2.2,thick:1.8,wide:1.2}},hind:{len:.46,thick:2,claws:{colour:"#e9e2cf",len:1.2,thick:1.4}},body:{len:1,girth:1.5,deep:.92,hump:.5},head:{size:1.12},bands:1.25}),e=t.R,o=$("tail","pelvis",t.root,{len:.24,r:.055,pitch:-.25,blunt:.08,tip:.3,colours:{coat:"#a3a39d",tip:Se},spikes:{n:3,colour:Se,len:.6}}),a=[1,2,3,4].flatMap(s=>B(e[s],de[s],{n:4,a0:.15,a1:1.7,long:.15,sweep:.97,droop:.12,r:.11,flat:.28,jitter:.15,sides:5,lock:!0,colour:r=>r%2?"#6c6c68":"#85857f",tip:()=>"#c9c6bb"}));return H("badger-adult",t.body,t.skull,[...t.legs,o],ut({tails:[o.chain]}),{cones:a})},legend(){const t="#f7f6ee",e="#8b8f8c",o="#bfe8d0",a="#10b98a",s={...ht,coat:"#6f6f73",muzzle:"#dcd8cc",eyes:[{colour:o,glow:!0},{colour:"#e6ecec"}]},r=dt(s,{fore:{len:.5,thick:2.6,paw:1.6,knob:1.2,claws:{colour:"#b9bcb8",len:3.2,thick:2,wide:1.25}},hind:{len:.5,thick:2.2,knob:1.2,claws:{colour:"#b9bcb8",len:1.6,thick:1.5}},body:{len:1.1,girth:1.75,deep:.9,hump:.9,neck:[.02,.17],neckThick:1.5},head:{size:1.2,muzzle:.9,eye:1.2},ear:{torn:1},bands:1.3}),n=r.R,i=r.P,l=$("tail","pelvis",r.root,{len:.28,r:.06,pitch:-.25,blunt:.08,tip:.3,colours:{coat:"#9a9a96",tip:t},spikes:{n:3,colour:t,len:.7}}),c=u=>[0,n[u].at[1]+n[u].ry*.9,n[u].at[2]],d=[[1,.13],[2,.17],[3,.24],[4,.2]].flatMap(([u,h])=>[{at:c(u),rx:.085,ry:.04,tip:[.01,c(u)[1]+h*1.25,c(u)[2]-.02],bone:de[u],colour:e,tipColour:"#a4a8a5",split:.93,up:[0,0,1],sides:5},{at:[0,c(u)[1]+h*.55,c(u)[2]+.04],rx:.03,ry:.03,tip:[0,c(u)[1]+h*.6,c(u)[2]+.065],bone:de[u],colour:o,glow:!0,up:[0,1,0],sides:4}]),f=[1,2,3,4].flatMap(u=>B(n[u],de[u],{n:3,a0:1.5,a1:2.2,long:.12,sweep:.7,droop:.6,r:.07,flat:.45,colour:h=>h%2?"#505053":"#7a7a7d",tip:()=>"#a9a69b"})),g=qo("neck",n[5].at,n[6].at,{at:.2,r:n[5].rx*1.04,ry:n[5].ry*1.04,wide:.022,colour:gr}),p=[{from:.7,to:4.85,round:[.5,1],inset:.14,lames:6,thick:.016,step:.006,colour:t,rim:"#c9c6b8",runes:{colour:a,size:.55,max:1}}],v=[{at:i(.03,.06,.15),rx:.006,ry:.004,tip:i(.05,-.02,.2),bone:"head",colour:"#c98a80",up:[0,0,1],sides:3}];return H("badger-legend",r.body,r.skull,[...r.legs,l,g],ut({lively:.75,tails:[l.chain]}),{cones:[...f,...d,...v],armour:p})}},br={id:"badger",heights:[54,82,113,256],curl:{side:-1},plans:vr};function st(t,e,o){const{r:a=.04,colour:s,glow:r=!1,sides:n=7,squash:i=1}=o;return{bones:[],cones:[],lofts:[{sides:n,up:[0,0,1],rings:[[-1,.12],[-.62,.78],[0,1],[.62,.78],[1,.12]].map(([l,c])=>({at:[e[0],e[1]+l*a*i,e[2]],rx:a*c,ry:a*c,bone:t,colour:s,glow:r,up:[0,0,1]}))}]}}const wr="#1d1612",yr="#f2b21f",xr="#e0a019",kr="#e3f4ff";function ft(t,e){const{fly:o=.3,k:a=1,C:s={},wing:r=1,abdomen:n={},eye:i=1,sting:l=1,fuzz:c,antennae:d=1,gait:f={}}=e,g=s.fuzz??xr,p=s.dark??wr,v=s.band??yr,u=(T,D,S)=>[T*a,o+D*a,S*a],h=Math.PI*2,b=[["root",[0,0,0],null],["thorax",u(0,.06,.02),"root"],["head",u(0,.05,.11),"thorax"],["abd1",u(0,.04,-.06),"thorax"],["abd2",u(0,0,-.06-.16*(n.len??1)),"abd1"]],w=[],m=[];w.push(...st("thorax",u(0,.06,.02),{r:.092*a*(e.chest??1),colour:g,sides:8}).lofts,...st("head",u(0,.05,.135),{r:.066*a,colour:p,sides:7}).lofts);for(const T of[1,-1])w.push(...st("head",u(.046*T,.062,.16),{r:.036*a*i,colour:s.eye??"#0c0a09",glow:!!s.eyeGlow,sides:6}).lofts),b.push([`ant${T>0?"L":"R"}`,u(.02*T,.11,.16),"head"]),m.push({at:u(.02*T,.105,.16),rx:.008*a,ry:.008*a,tip:u(.07*T*d,.105+.12*d,.16+.1*d),bend:[0,.04*a*d,0],bulge:.9,bone:`ant${T>0?"L":"R"}`,colour:p,up:[0,0,1],sides:3});const y=n.len??1,k=n.fat??1,z=n.rings??6,x=T=>{const D=T/(z-1);return Math.sin(Math.PI*Math.pow(D,.75))*.9+.1*(1-D)},C=(T,D=0)=>{const S=Math.min(1,Math.max(0,T/(z-1)+D));return{at:u(0,.045-.11*S*y,-.07-.36*S*y),rx:.105*a*k*x(S*(z-1))+.012*a,ry:.1*a*k*x(S*(z-1))+.012*a,bone:S<.45?"abd1":"abd2",colour:(n.colour??(E=>E%2?p:v))(T)}},M=Array.from({length:z},(T,D)=>C(D)),A=.42/(z-1);w.push({name:"abdomen",sides:8,up:[0,1,.3],rings:M.flatMap((T,D)=>D===0?[T,C(D,A)]:D===z-1?[C(D,-A),T]:[C(D,-A),C(D,A)])});const N=M[z-1].at;m.push({at:N,rx:.014*a,ry:.014*a,tip:[N[0],N[1]-.03*a*l,N[2]-.09*a*l],bone:"abd2",colour:s.sting??p,up:[0,1,0],sides:4});for(const[T,D]of[[1,"L"],[-1,"R"]])for(const[S,E,G,U]of[["f",.3,.075,.25],["h",.2,.06,.75]]){const j=`wing${S}${D}`,Y=u(.035*T,.13,.02-(S==="h"?.035:0));b.push([j,Y,"thorax"]);const P=[T*Math.cos(U)*.92,.38,-Math.sin(U)],L=F=>Y.map((R,I)=>R+P[I]*E*r*a*F);if(e.ornate){const F=[0,-.12,-1],R=[P[1]*F[2]-P[2]*F[1],P[2]*F[0]-P[0]*F[2],P[0]*F[1]-P[1]*F[0]],I=Math.hypot(...R)*(R[1]<0?-1:1),V=R.map(re=>re/I);(S==="f"?[[-.3,.85,1],[.05,1.15,1.15],[.4,.95,1.05],[.75,.7,.9]]:[[.35,.8,.9],[.7,1.2,.8],[1.05,1.75,.6],[1.35,1.25,.55]]).forEach(([re,Ge,ct],qt)=>{const Bt=P.map((ze,qe)=>ze*Math.cos(re)+F[qe]*Math.sin(re)),Ta=E*r*a*Ge,jt=G*r*a*ct*.62,fs=S==="h"?.5:.22,ps=ze=>Y.map((qe,Be)=>qe+Bt[Be]*Ta*ze+F[Be]*fs*Ta*ze*ze+V[Be]*(qt%2?.006:0)*a),Kt=(ze,qe,Be,gs,ms)=>({sides:4,up:V,rings:ze.map(([vs,bs])=>({at:ps(vs).map((ws,ys)=>ws+V[ys]*gs),rx:Math.max(8e-4,qe*bs),ry:.004*a,bone:j,colour:Be,glow:ms,up:V}))});w.push(Kt([[0,.3],[.22,1],[.5,.85],[.75,.42],[.9,.16],[1,.01]],jt,e.ornate.frame,0,!1));const Aa=e.ornate.cells[qt%e.ornate.cells.length],Ea=[[.14,.2],[.26,1],[.48,.8],[.66,.2]];w.push(Kt(Ea,jt*.6,Aa,.005*a,!0),Kt(Ea,jt*.6,Aa,-.005*a,!0))});continue}w.push({sides:4,up:[0,1,0],rings:[[0,.35],[.3,1],[.65,1.05],[.9,.7],[1,.15]].map(([F,R])=>({at:L(F),rx:G*r*a*R,ry:.004*a,bone:j,colour:s.wing??kr,up:[0,1,0]}))}),s.vein&&w.push({sides:3,up:[0,1,0],rings:[.05,.4,.75,.97].map(F=>({at:L(F).map((R,I)=>R+(I===1?.006*a:0)),rx:.006*a,ry:.006*a,bone:j,colour:s.vein,glow:!0,up:[0,1,0]}))})}[[.08,.14,.9],[.02,.17,1],[-.04,.2,1.15]].forEach(([T,D,S],E)=>{for(const[G,U]of[[1,"L"],[-1,"R"]]){const j=`leg${E}${U}`,Y=u(.05*G,0,T);b.push([j,Y,"thorax"]);const P=[Y[0]+.06*a*G,Y[1]-D*.45*a,Y[2]-.01*a],L=[Y[0]+.04*a*G,Y[1]-D*S*a,Y[2]-.05*a];w.push({sides:4,up:[0,0,1],rings:[{at:Y,rx:.014*a,ry:.014*a,bone:j,colour:p},{at:P,rx:.011*a,ry:.011*a,bone:j,colour:p},{at:L,rx:.006*a,ry:.006*a,bone:j,colour:p}]}),e.pollen&&E===2&&w.push({sides:5,up:[0,0,1],rings:[[.1,.5],[.4,1],[.75,.9],[.95,.4]].map(([F,R])=>({at:P.map((I,V)=>I+(L[V]-I)*F),rx:.024*a*e.pollen*R,ry:.02*a*e.pollen*R,bone:j,colour:"#ffd84a"}))})}}),c&&m.push(...B({at:u(0,.06,.02),rx:.085*a,ry:.085*a},"thorax",{n:c.n??4,a0:.2,a1:2.6,long:(c.long??.05)*a,sweep:.5,droop:0,r:.03*a,lock:!0,colour:()=>g,tip:()=>c.tip??"#fff0b8"}),...B({at:u(0,.06,.07),rx:.07*a,ry:.07*a},"thorax",{n:c.n??4,a0:.3,a1:2.8,long:(c.long??.05)*a*.8,sweep:.2,droop:0,r:.028*a,lock:!0,colour:()=>c.collar??g,tip:()=>c.tip??"#fff0b8"}));const O=f.beats??3,_=(T,D)=>S=>[0,0,T*(.15+.75*Math.sin(h*O*S+D))];return{name:t,bones:b,lofts:[...w,...e.lofts??[]],cones:[...m,...e.cones??[]],armour:e.armour??[],hover:o*a,gait:{type:"fly",seconds:.8,root:"thorax",bob:.02*a,bobs:1,legs:[],...f,extra:[{bone:"wingfL",rot:_(1,0)},{bone:"wingfR",rot:_(-1,0)},{bone:"winghL",rot:_(1,-.5)},{bone:"winghR",rot:_(-1,-.5)},{bone:"abd1",rot:T=>[.08*Math.sin(h*T),0,0]},{bone:"abd2",rot:T=>[.1*Math.sin(h*T-.8),0,0]},{bone:"head",rot:T=>[.05*Math.sin(h*T+1),.06*Math.sin(h*T),0]},...[0,1,2].flatMap(T=>["L","R"].map((D,S)=>({bone:`leg${T}${D}`,rot:E=>[.12*Math.sin(h*E+T+S),0,.06*Math.sin(h*E*2+T)]}))),{bone:"antL",rot:T=>[.1*Math.sin(h*2*T),0,0]},{bone:"antR",rot:T=>[.1*Math.sin(h*2*T+1),0,0]},...f.more??[]]},P:u,R:M}}const pt=t=>{const{P:e,R:o,...a}=t;return a},Sr={baby:()=>pt(ft("bee-baby",{fly:.24,chest:1.25,C:{fuzz:"#f6d76a",band:"#f6d76a",dark:"#4a3a22"},wing:.5,eye:1.3,sting:0,antennae:.6,abdomen:{len:.45,fat:.85,rings:5,colour:t=>t%2?"#6a5230":"#f6d76a"},fuzz:{n:4,long:.06,tip:"#fffbe0"},gait:{seconds:.6,beats:5,bob:.012}})),young:()=>pt(ft("bee-young",{fly:.26,chest:.9,wing:.95,abdomen:{len:.9,fat:.8},antennae:.9})),adult:()=>pt(ft("bee-adult",{fly:.3,chest:1.2,wing:1.2,eye:1.1,sting:1.5,antennae:1.2,pollen:1.3,abdomen:{len:1.05,fat:1.2,rings:7},fuzz:{n:5,long:.07,tip:"#fff0b8",collar:"#fff0b8"}})),legend(){const t="#e9b949",e="#ffc83a",o="#fff2b0",a="#4b2a6e",s={fuzz:"#c98a14",band:t,dark:"#241a12",eye:"#6a1626",vein:o,sting:t,wing:"#cfe9ff"},r=[1,3,5,7].map(c=>({on:"abdomen",from:2*c-.25,to:2*c+1.25,round:[0,1.7],thick:.016,colour:a,rim:t,runes:{colour:e,size:.7,max:1,seed:c}})),n=ft("bee-legend",{fly:.36,chest:1.15,C:s,wing:1.75,eye:1.05,sting:2.6,antennae:1.8,abdomen:{len:1.9,fat:1.05,rings:10,colour:c=>c%2?"#241a12":t},fuzz:{n:6,long:.1,tip:"#ffffff",collar:"#ffffff"},armour:r,ornate:{frame:"#2b1840",cells:[o,e,"#cfe9ff"]},gait:{seconds:1.2,beats:5}}),{P:i}=n,l=[-2,-1,0,1,2].map(c=>({at:i(.03*c,.105,.125),rx:.022,ry:.02,tip:i(.04*c,.105+.15-.02*Math.abs(c),.115),bone:"head",colour:t,tipColour:c?t:e,glow:!c,split:.8,bulge:.9,up:[0,0,1],sides:6}));return{...pt(n),cones:[...n.cones,...l]}}},zr={id:"bee",heights:[45,69,97,280],plans:Sr},le=(t,e,o=1,a="head")=>[1,-1].flatMap(s=>[[-.03,.15],[0,.12]].map(([r,n])=>({at:t(.03*s,-.005,.2),rx:.006,ry:.006,tip:t((.03+.14*o)*s,r*o,n),bone:a,colour:e,up:[0,1,0],sides:3}))),Mr="#17120f",Fr="#e9b949",De={coat:"#d59a40",belly:"#f7ecd4",nose:"#c98a80",upper:"#d59a40",mid:"#c0862f",sock:"#f0d9c0",eye:Mr},gt=(t,e)=>Re({C:t,hind:{len:.32,thick:1.6,foot:1.3,...e.hind},fore:{len:.28,thick:1.3,...e.fore},body:{len:.55,girth:1,deep:1,tuck:1,arch:.8,rump:1.15,neck:[.06,.07],neckThick:1.2,white:.5,...e.body},head:{size:1.2,muzzle:.42,muzzleWide:1.1,dome:1.08,wide:1.05,cheek:0,eye:1.7,eyeAt:[0,.004,-.012],nose:.9,...e.head,ear:{shape:"round",tall:.75,wide:1.25,at:[.012,-.012,-.012],back:t.coat,inner:"#e9b9a8",...e.ear}}}),Cr={baby(){const t={...De,coat:"#c9a070",upper:"#c9a070",mid:"#c9a070"},e=gt(t,{hind:{len:.26,thick:1.7},fore:{len:.24,thick:1.5},body:{len:.44,girth:.95},head:{size:1.42,eye:1.9},ear:{tall:.9,wide:1.4}}),o=$("tail","pelvis",e.root,{len:.16,r:.016,pitch:-.1,blunt:.4,tip:0,colours:{coat:"#b98f62",tip:"#b98f62"}});return H("dormouse-baby",e.body,e.skull,[...e.legs,o],oe({lively:1.3,tails:[o.chain]}))},young(){const t=gt(De,{hind:{len:.42,thick:1.2},fore:{len:.36,thick:1},body:{len:.6,girth:.8,tuck:.85},head:{size:1.08}}),e=$("tail","pelvis",t.root,{len:.42,r:.026,pitch:-.05,curl:.4,blunt:.4,tip:0,colours:{coat:De.mid,tip:De.mid}});return H("dormouse-young",t.body,t.skull,[...t.legs,e],oe({lively:1.1,tails:[e.chain]}))},adult(){const t=gt(De,{body:{len:.6,girth:1.42,deep:1.05,rump:1.2},head:{size:1.26}}),e=$("tail","pelvis",t.root,{len:.62,r:.085,pitch:1.1,curl:2,bones:6,blunt:.35,tip:.12,colours:{coat:"#c88a30",under:"#a8701f",tip:"#f7ecd4"},spikes:{n:5,colour:"#e9bb62",len:.7}});return H("dormouse-adult",t.body,t.skull,[...t.legs,e],oe({tails:[e.chain]}),{cones:le(t.P,"#f7ecd4",1.2)})},legend(){const t="#c9a8ff",e="#fff0b8",o="#4a3168",a={...De,coat:"#c98f3a",back:"#b9a48a",belly:"#f3e6cc",muzzle:"#e6d8c0",upper:"#c98f3a",mid:"#b07a2c",eye:"#6a4a2a"},s=gt(a,{hind:{len:.44,thick:1.9,knob:1.2},fore:{len:.4,thick:1.6,knob:1.2},body:{len:.72,girth:1.95,deep:1,rump:1.15,neck:[.04,.1],neckThick:1.5},head:{size:1.75,eye:.7,eyeAt:[.004,-.004,-.012]},ear:{tall:.8,wide:1.3,torn:-1}}),r=s.P,n=s.R,i=$("tail","pelvis",s.root,{len:1,r:.13,pitch:.9,curl:2.6,wave:.2,bones:6,blunt:.35,tip:.1,colours:{coat:"#b9802c",under:"#96661f",tip:"#f3e6cc"},spikes:{n:7,colour:"#e9bb62",len:.9}}),l=[...B(n[4],"chest",{n:3,a0:1.75,a1:2.5,long:.1,sweep:.1,droop:-.1,r:.03,sides:5,jitter:.3,colour:()=>"#ffd7c8",tip:()=>e,glow:!0}),...B(n[5],"neck",{n:3,a0:.4,a1:2,long:.08,sweep:0,droop:-.2,r:.026,sides:5,colour:()=>e,glow:!0})],c=[{from:1.75,to:4.7,round:[0,1.7],lames:4,thick:.022,step:.014,colour:o,rim:Fr,runes:{colour:t}}];return H("dormouse-legend",s.body,s.skull,[...s.legs,i],oe({lively:.75,tails:[i.chain]}),{cones:[...l,...le(r,"#f3e6cc",2.4)],armour:c})}},Pr={id:"dormouse",heights:[38,65,86,246],plans:Cr},Ne="#f4efe6",jo="#2a1a16",Ut="#16100e",We="#1f1512",It=(t,e)=>Ca(t,e);function Lr(){const t={coat:"#a8643a",belly:"#eadfce",nose:Ut,upper:"#a8643a",mid:"#96552f",sock:"#4a2f25"},e=.52,o=$e({back:.37*e+.012,len:.54,girth:1.02,deep:.92,tuck:1.08,neck:[.075,.07],neckThick:1.15,white:.45,colours:t}),a=Ie(o.pivot,{size:1.38,muzzle:.45,ear:{tall:1.05,wide:1.45,back:We},cheek:.5,eye:1.6,white:.55,colours:t}),s=$("tail","pelvis",[0,.37*e+.02,-.19],{len:.19,r:.062,pitch:.15,tip:.4,blunt:.4,colours:{coat:t.coat,tip:Ne}});return H("fox-baby",o,a,[...It(o,{len:e,thick:1.6,colours:t}),s],Wt({lively:1.3,tails:[s.chain]}))}function Tr(){const t={coat:"#e8852b",belly:Ne,nose:Ut,upper:"#e8852b",mid:"#cf6c1f",sock:jo},e=1.1,o=$e({back:.37*e+.01,len:.96,girth:.84,deep:.95,tuck:.72,neck:[.17,.15],neckThick:.92,white:.4,colours:t}),a=Ie(o.pivot,{size:.93,muzzle:1.08,ear:{tall:1.25,wide:1.05,back:We},cheek:.35,eye:1.15,colours:t}),s=$("tail","pelvis",[0,.37*e+.015,-.33],{len:.54,r:.088,pitch:-.3,colours:{coat:t.coat,under:"#b85c1b",tip:Ne}});return H("fox-young",o,a,[...It(o,{len:e,thick:.86,colours:t}),s],Wt({lively:1.1,tails:[s.chain]}))}function Ar(){const t={coat:"#e07a1f",belly:Ne,nose:Ut,upper:"#e07a1f",mid:"#c9641a",sock:jo},e=1.06,o=$e({back:.37*e+.01,len:1.02,girth:1.06,deep:1.14,tuck:.74,neck:[.19,.14],neckThick:1.25,white:.5,colours:t}),a=Ie(o.pivot,{size:1.06,muzzle:1.05,ear:{tall:1.25,wide:1,back:We,tip:We},cheek:1.75,eye:1.15,colours:t}),s=Array.from({length:5},(i,l)=>{const c=(l-2)/2,d=Math.abs(c);return $(`tail${"abcde"[l]}`,"pelvis",[.045*c,o.rings[1].at[1]+.05-.03*d,o.rings[1].at[2]-.03+.03*d],{len:.66-.12*d,r:.108-.012*d,yaw:c*.85,pitch:.6-.5*d,curl:-.35,wave:.12,phase:l,tip:.2,blunt:.22,colours:{coat:t.coat,under:"#a44f18",tip:Ne}})}),r=B(o.rings[5],"neck",{n:5,a0:.9,a1:2.9,long:.17,sweep:.6,droop:.35,r:.062,lock:!0,colour:()=>Ne}),n=B(o.rings[4],"chest",{n:1,a0:.12,long:.12,sweep:.9,r:.045,lock:!0,colour:()=>t.coat,tip:()=>"#a44f18"}).concat(B(o.rings[3],"chest",{n:1,a0:.12,long:.1,sweep:.9,r:.04,lock:!0,colour:()=>t.coat,tip:()=>"#a44f18"}));return H("fox-adult",o,a,[...It(o,{len:e,thick:1,colours:t}),...s],Wt({tails:s.map(i=>i.chain)}),{cones:[...r,...n]})}function Er(){const t="#eef2f5",e="#bdb6ad",o="#e9e2d6",a="#e9b949",s="#c5222c",r="#8d9398",n="#9fdcff",i="#effaff",l="#fff0b0",c="#7d360b",d="#262a44",f={coat:"#b9520f",back:"#a9a39b",belly:o,mask:o,muzzle:e,nose:Ut,eyes:[{colour:"#ffd24a",glow:!0},{colour:"#e3edf2"}],upper:"#b9520f",mid:"#8c3f0e",sock:"#1c1210"},g=1.4,p=$e({back:.37*g+.01,len:1.14,girth:1.02,deep:1.36,tuck:.5,hump:1.1,neck:[.11,.25],neckThick:1.4,white:.5,colours:f}),v=Ie(p.pivot,{size:1.42,muzzle:1.45,ear:{tall:1.9,wide:.9,back:We,tip:We,torn:-1},cheek:2.3,eye:1.7,white:.6,colours:f}),u=v.P,h=Array.from({length:9},(S,E)=>{const G=(E-4)/4,U=Math.abs(G),j=E===4;return $(`tail${"abcdefghi"[E]}`,"pelvis",[.055*G,p.rings[1].at[1]+.06-.03*U,p.rings[1].at[2]-.02+.05*U],{len:1.02-.26*U+E%2*.09,r:.12-.02*U,yaw:G*.75,twist:G*.75,pitch:1.5-.5*U-E%2*.14,curl:-.75+.15*U,wave:.3,waves:1.25,phase:E*1.9,bones:6,tip:.2,plume:!0,sides:6,colours:{coat:f.coat,under:c,tip:t},ring:E%2?{colour:a,at:.2}:void 0,fire:{colour:j?l:n,tip:i,size:(j?1.5:1.15)-.25*U}})}),b=p.rings[5],w=p.rings[4];p.rings[3],p.rings[2];const m=[...B(b,"neck",{n:4,a0:.5,a1:2.8,long:.2,sweep:.8,droop:.45,r:.085,lock:!0,grow:.5,colour:S=>S<1?f.coat:o,tip:S=>S<1?f.back:e}),...B(w,"chest",{n:4,a0:.25,a1:2.5,long:.2,sweep:.85,droop:.4,r:.09,lock:!0,grow:.5,colour:S=>S<2?f.coat:o,tip:S=>S<2?f.back:e}),...B(w,"chest",{n:2,a0:2.75,a1:3.05,long:.17,sweep:.25,droop:.7,r:.06,lock:!0,colour:()=>o,tip:()=>e})],y=[{at:u(0,-.03,.2),rx:.035,ry:.035,tip:u(0,-.2,.13),bone:"head",colour:o,tipColour:e,split:.5,up:[0,0,1]},...[1,-1].map(S=>({at:u(.048*S,.09,.1),rx:.028,ry:.018,tip:u(.15*S,.17,-.04),bone:"head",colour:o,tipColour:e,split:.5,up:[0,1,0]}))],k=p.rings[6].at,z=b.at,x=qo("neck",z,k,{at:.42,r:.135,ry:.15,wide:.05,colour:s}),C=[[.1,-.1,.06],[-.1,-.1,.06],[.05,-.15,.1],[-.05,-.15,.1]].map(([S,E,G])=>({at:[z[0]+S,z[1]+E+.05,z[2]+G+.05],rx:.026,ry:.008,tip:[z[0]+S*1.15,z[1]+E-.14,z[2]+G+.06],bone:"neck",colour:"#ffffff",split:.9,up:[0,0,1],sides:4})),M=z[1]-.2,A=z[2]+.17,N=[{at:[0,M,A],rx:.055,ry:.055,tip:[0,M-.09,A],bone:"neck",colour:a,split:.85,up:[0,0,1],sides:6},{at:[0,M,A],rx:.055,ry:.055,tip:[0,M+.06,A-.02],bone:"neck",colour:a,up:[0,0,1],sides:6}],O=[1,-1].map(S=>({at:u(.092*S,.14,.025),rx:.02,ry:.02,tip:u(.11*S,.06,.025),bone:S>0?"earL":"earR",colour:a,split:.85,up:[0,0,1],sides:5})),_=It(p,{len:g,thick:.88,knob:1.5,colours:f,claws:{colour:"#ddd6c8",len:.9},band:{colour:r,at:.32,r:.04}}),T=_.flatMap(S=>{const E=S.lofts[0].rings[1];return[{at:[E.at[0],E.at[1]-.02,E.at[2]-E.ry*.7],rx:.04,ry:.04,tip:[E.at[0],E.at[1]-.15,E.at[2]-E.ry-.08],bone:E.bone,colour:f.coat,tipColour:e,split:.5,up:[1,0,0]}]}),D=[{from:1.15,to:3.3,round:[0,1.7],lames:3,thick:.02,step:.012,colour:d,rim:a,runes:{colour:n}}];return H("fox-legend",p,v,[..._,...h,x],Wt({lively:.75,tails:h.map(S=>S.chain)}),{cones:[...m,...y,...C,...N,...O,...T],armour:D})}const Rr={id:"fox",heights:[53,81,137,387],plans:{baby:Lr,young:Tr,adult:Ar,legend:Er}},Ko="#2a1c18",Gr="#17120f",mt="#dfe5ec",Ke={coat:"#b48d60",belly:"#f0e7d6",nose:Ko,upper:"#b48d60",mid:"#a17a50",sock:"#8a6842"},vt=(t,e)=>Re({C:t,hind:{len:.78,thick:1.25,foot:2.3,...e.hind},fore:{len:.56,thick:.95,...e.fore},body:{len:.86,girth:.98,deep:1,tuck:.9,arch:1.1,rump:1.28,neck:[.13,.1],neckThick:1.05,white:.5,...e.body},head:{size:1.02,muzzle:.55,muzzleWide:1.45,muzzleDeep:1.3,dome:1.12,wide:.9,cheek:0,eye:1.7,eyeAt:[.004,.012,-.02],nose:.9,...e.head,ear:{shape:"long",tall:1.6,wide:1,at:[-.012,0,-.03],back:t.coat,inner:"#d8a996",tip:Gr,...e.ear}}}),bt=(t,e={})=>$("tail","pelvis",[t[0],t[1]+.02,t[2]+.02],{len:.1,r:.036,pitch:.95,tip:.7,blunt:.05,sides:5,colours:{coat:"#5a4630",tip:"#ffffff"},...e}),Dr={baby(){const t={...Ke,coat:"#a8845c",upper:"#a8845c",mid:"#a8845c"},e=vt(t,{hind:{len:.4,thick:1.7,foot:1.5},fore:{len:.32,thick:1.5},body:{len:.6,girth:1.05,arch:.6,rump:1.15,neck:[.06,.07],neckThick:1.2},head:{size:1.22,eye:2.1},ear:{tall:.8,lean:.75,wide:1.1,inner:t.coat,tip:"#5a4630"}}),o=bt(e.root,{len:.06,r:.028});return H("hare-baby",e.body,e.skull,[...e.legs,o],oe({lively:1.3,tails:[o.chain]}))},young(){const t=vt(Ke,{hind:{len:.82,thick:1},fore:{len:.6,thick:.85},body:{len:.82,girth:.82,tuck:.8,rump:1.2},head:{size:.95},ear:{tall:1.9,lean:.1,wide:.9}}),e=bt(t.root);return H("hare-young",t.body,t.skull,[...t.legs,e],oe({lively:1.1,tails:[e.chain]}))},adult(){const t=vt(Ke,{hind:{len:.9,thick:1.3,foot:2.5},fore:{len:.62,thick:1},body:{len:.9,girth:1.02,deep:1.18,tuck:.78,rump:1.38,neckThick:1.2},head:{size:1.06},ear:{tall:2.7,lean:.12,wide:1.15,splay:.16}}),e=bt(t.root,{len:.13,r:.042}),o=B(t.R[5],"neck",{n:4,a0:1.2,a1:2.95,long:.11,sweep:.5,droop:.45,r:.05,lock:!0,colour:()=>Ke.belly}),a=B(t.R[4],"chest",{n:1,a0:.1,long:.1,sweep:.8,r:.035,colour:()=>Ke.coat,tip:()=>"#6e5334"});return H("hare-adult",t.body,t.skull,[...t.legs,e],oe({tails:[e.chain]}),{cones:[...o,...a,...le(t.P,"#f0e7d6",1.1)]})},legend(){const t="#cfe6ff",e="#4f5b78",a=vt({coat:"#c9ced6",back:"#9ea5b0",belly:"#f3f5f8",nose:Ko,upper:"#c9ced6",mid:"#aab0ba",sock:"#7f8794",eyes:[{colour:t,glow:!0},{colour:t,glow:!0}]},{hind:{len:1.1,thick:1.3,foot:2.6,knob:1.25,claws:{colour:"#3a3f48",len:1},band:{colour:e,at:.3,r:.05}},fore:{len:.78,thick:1,knob:1.25,band:{colour:mt,at:.3,r:.036}},body:{len:.98,girth:.96,deep:1.25,tuck:.62,rump:1.4,hump:.3,neck:[.2,.1],neckThick:1.15},head:{size:1.12,muzzle:.62,eye:1.6},ear:{tall:5.2,lean:.06,wide:1.25,splay:.09,back:"#aab0ba",inner:"#e9d2cc",tip:"#3a3f48",torn:-1}}),s=a.P,r=a.R,n=bt(a.root,{len:.17,r:.048,colours:{coat:"#9ea5b0",tip:"#ffffff"}}),i=[1,-1].map(f=>({at:s(.012*f,.092,.1),rx:.03,ry:.012,tip:s(.06*f,.14,.085),bone:"head",colour:t,glow:!0,up:[0,0,1],sides:4})),l=[.55,.8].flatMap((f,g)=>[1].map(p=>({at:s((.036+.1*f)*p,.07*1.12+.82*f,-.03),rx:.03,ry:.012,tip:s((.036+.1*f)*p+.07,.07*1.12+.82*f-.02,-.03),bone:"earL",colour:mt,split:.8,up:[0,1,0],sides:4}))),c=[{from:.75,to:2.15,round:[0,1.7],lames:2,thick:.02,step:.012,colour:e,rim:mt,runes:{colour:t}},{from:3.2,to:4.75,round:[0,1.7],lames:2,thick:.02,step:.012,colour:e,rim:mt,runes:{colour:t,seed:3}}],d=B(r[5],"neck",{n:4,a0:.9,a1:2.95,long:.16,sweep:.55,droop:.5,r:.06,lock:!0,colour:()=>"#f3f5f8",tip:()=>"#aab0ba"});return H("hare-legend",a.body,a.skull,[...a.legs,n],oe({lively:.75,tails:[n.chain]}),{cones:[...i,...l,...d,...le(s,"#f3f5f8",1.6)],armour:c})}},Or={id:"hare",heights:[74,114,164,491],curl:{ears:1.4,earsIn:1.6},plans:Dr},_r="#b9722e",Ka="#e0a04a",Ve={coat:"#4f3b2c",belly:"#cfae84",mask:"#cfae84",muzzle:"#cfae84",nose:"#1b1512",upper:"#b89a72",mid:"#a98a62",sock:"#8a6f4c",eye:"#120e0c"},wt=(t,e)=>Re({C:t,hind:{len:.26,thick:1.5,...e.hind},fore:{len:.26,thick:1.4,...e.fore},body:{len:.62,girth:1.35,deep:1,tuck:1.05,hump:.5,neck:[0,.11],neckThick:1.35,white:.55,...e.body},head:{size:.98,muzzle:1,muzzleWide:.8,muzzleDeep:.85,wide:1,cheek:0,eye:1.3,nose:1.2,...e.head,ear:{shape:"round",tall:.6,wide:.9,at:[.012,-.02,-.012],back:t.mask,inner:"#e2c6a8"}}}),yt=(t,e)=>(e.rings??[1,2,3,4,5]).flatMap(o=>B(t[o],de[o],{n:e.n??5,a0:.12,a1:e.down??1.75,long:e.long*(o===5?.75:1),sweep:e.sweep??.6,droop:0,r:e.r??.028,sides:3,jitter:e.jitter??.35,colour:e.colour??(()=>"#5a4332"),tip:e.tip??(()=>"#ecdfc2"),glow:e.glow??!1})),Hr={baby(){const t={...Ve,coat:"#b9a183",belly:"#e6d2b4",mask:"#e6d2b4",muzzle:"#e6d2b4"},e=wt(t,{hind:{len:.2,thick:1.6},fore:{len:.2,thick:1.5},body:{len:.45,girth:1.25},head:{size:1.25,muzzle:.7,nose:1.7,eye:1.6}});return H("hedgehog-baby",e.body,e.skull,e.legs,ye({lively:1.3}),{cones:yt(e.R,{n:3,long:.07,r:.026,down:1.3,sweep:.45,colour:()=>"#8f7a5e",tip:()=>"#ffffff"})})},young(){const t=wt(Ve,{body:{len:.58,girth:1.2}});return H("hedgehog-young",t.body,t.skull,t.legs,ye({lively:1.1}),{cones:yt(t.R,{n:5,long:.075})})},adult(){const t=wt(Ve,{body:{len:.66,girth:1.45,hump:.8},head:{size:1.02,muzzle:1.2}}),e=t.R,o=[2,3,4].flatMap(a=>B(e[a],de[a],{n:2,a0:1.95,a1:2.4,long:.07,sweep:.4,droop:.7,r:.045,lock:!0,colour:()=>Ve.belly,tip:()=>"#a98a62"}));return H("hedgehog-adult",t.body,t.skull,t.legs,ye(),{cones:[...yt(t.R,{n:6,long:.2,sweep:.42,r:.03,jitter:.5,colour:a=>a%2?"#5a4332":"#3c2c20",tip:()=>"#f3e7c9"}),...o,...le(t.P,"#e6d2b4",.7)]})},legend(){const t="#ffd27a",e="#d9dde0",o={...Ve,coat:"#3a2a20",belly:"#b8a488",mask:e,muzzle:e,upper:"#a8906c",mid:"#927a58",eyes:[{colour:t,glow:!0},{colour:t,glow:!0}]},a=wt(o,{hind:{len:.34,thick:1.6,knob:1.2,claws:{colour:"#3a2a20",len:1.2}},fore:{len:.34,thick:1.5,knob:1.2,claws:{colour:"#3a2a20",len:1.2}},body:{len:.78,girth:1.7,hump:1.2,neck:[0,.14],neckThick:1.4},head:{size:1.15,muzzle:1.35,eye:1.2}}),s=a.R,r=a.P,n=yt(s,{rings:[1,2,3,4],n:6,long:.52,sweep:.3,r:.034,jitter:.95,down:1.6,colour:c=>c%2?"#4a372a":"#2f2219",tip:c=>c%3?Ka:t,glow:c=>c%3?!1:"tip"}),i=[{from:4.55,to:6,round:[0,2],lames:2,thick:.02,step:.012,colour:_r,rim:Ka,runes:{colour:t}}],l=[2,3,4].flatMap(c=>B(s[c],de[c],{n:2,a0:1.9,a1:2.4,long:.1,sweep:.4,droop:.7,r:.05,lock:!0,colour:()=>o.belly,tip:()=>"#8f7a5c"}));return H("hedgehog-legend",a.body,a.skull,a.legs,ye({lively:.75}),{cones:[...n,...l,...le(r,"#e6e9ec",1.4)],armour:i})}},Nr={id:"hedgehog",heights:[47,74,103,347],plans:Hr};function xe(t){const e=Bo(t.legs.len),o=$e({...e,deep:.86,tuck:.96,...t.body,colours:t.C}),a=Ie(o.pivot,{muzzle:.55,wide:.98,dome:.86,muzzleWide:1.15,cheek:0,eye:1.25,ear:{shape:"round",tall:.62,wide:1.25,at:[.012,-.012,-.005],back:t.C.ear??t.C.coat,inner:t.C.inner??"#c98f6e"},...t.head,colours:t.C});return{body:o,skull:a,legs:Ca(o,{colours:t.C,...t.legs}),root:[0,o.rings[1].at[1]+.01,o.rings[0].at[2]+.03]}}const Wr="#16100e",ee={coat:"#5e3d28",belly:"#f2c98b",nose:Wr,upper:"#4a2f1f",mid:"#3d261a",sock:"#2a1a13",ear:"#5e3d28",inner:"#f0d9b0"},Oe={size:1,muzzle:.7,wide:1.02,eye:1.4,ear:{shape:"round",tall:.85,wide:1.35,at:[.012,-.008,-.005],back:ee.coat,inner:"#e8cfa0"}},Ur={baby(){const t=xe({C:ee,body:{len:.78,girth:.78,arch:.4,neck:[.07,.09],neckThick:1.15,white:.45},legs:{len:.4,thick:1.7},head:{...Oe,size:1.22,muzzle:.5,eye:1.7,ear:{...Oe.ear,tall:1.05,wide:1.6}}}),e=$("tail","pelvis",t.root,{len:.2,r:.045,pitch:.05,blunt:.3,tip:0,colours:{coat:ee.coat,tip:ee.coat}});return H("marten-baby",t.body,t.skull,[...t.legs,e],we({lively:1.3,tails:[e.chain]}))},young(){const t=xe({C:ee,body:{len:1.08,girth:.66,arch:.8,neck:[.13,.14],white:.36},legs:{len:.55,thick:1.3,paw:1.3},head:Oe}),e=$("tail","pelvis",t.root,{len:.44,r:.085,pitch:-.1,blunt:.3,tip:0,colours:{coat:ee.coat,under:"#3d261a",tip:ee.coat}});return H("marten-young",t.body,t.skull,[...t.legs,e],we({lively:1.1,tails:[e.chain]}))},adult(){const t=xe({C:ee,body:{len:1.28,girth:.72,arch:1.25,neck:[.17,.15],neckThick:1.1,white:.42},legs:{len:.62,thick:1.25,paw:1.25,claws:{colour:"#e6dcc8",len:.8}},head:{...Oe,size:1.06,eye:1.5}}),e=$("tail","pelvis",t.root,{len:.7,r:.125,pitch:.55,curl:-.8,wave:.15,bones:5,blunt:.3,tip:0,colours:{coat:ee.coat,under:"#3d261a",tip:ee.coat},spikes:{n:4,colour:"#3d261a",len:.9}}),o=B(t.body.rings[5],"neck",{n:4,a0:1.3,a1:2.95,long:.12,sweep:.5,droop:.4,r:.05,lock:!0,colour:()=>ee.belly}),a=[1,-1].map(s=>({at:t.skull.P(.075*s,.14,.01),rx:.012,ry:.01,tip:t.skull.P(.1*s,.2,-.005),bone:s>0?"earL":"earR",colour:"#3d261a",up:[0,0,1]}));return H("marten-adult",t.body,t.skull,[...t.legs,e],we({tails:[e.chain]}),{cones:[...o,...a]})},legend(){const t="#f0a23a",e="#ffd27a",o="#2f4a2c",a={...ee,coat:"#4a2e1e",back:"#2f1d14",belly:"#e8b874",eyes:[{colour:e,glow:!0},{colour:e,glow:!0}]},s=xe({C:a,body:{len:1.5,girth:.84,arch:1.5,hump:.4,neck:[.2,.2],neckThick:1.2,white:.4},legs:{len:.74,thick:1.15,knob:1.35,paw:1.3,claws:{colour:"#efe6d2",len:1.5,thick:1.3}},head:{...Oe,size:1.18,muzzle:.8,eye:1.6,ear:{...Oe.ear,tall:1,torn:-1}}}),r=s.skull.P,n=s.body.rings,i=$("tail","pelvis",s.root,{len:.95,r:.165,pitch:.75,curl:-1.1,wave:.25,waves:1.2,bones:6,blunt:.25,tip:0,colours:{coat:a.coat,under:"#2f1d14",tip:a.coat},spikes:{n:6,colour:o,len:1.3}}),l=[n[1],n[2],n[3],n[4]].flatMap((p,v)=>B(p,["pelvis","loin","chest","chest"][v],{n:2,a0:.95,a1:1.3,long:.13,sweep:.75,r:.022,sides:3,colour:()=>a.back,tip:()=>o})),c=[{from:.9,to:4.6,round:[0,.8],lames:5,thick:.018,step:.012,colour:"#8a4a16",rim:t,runes:{colour:e}}],d=["#3f7fc4","#d9c9a8","#1c1a1c","#8a5a34","#e9e2d2"],f=B(n[5],"neck",{n:5,a0:.15,a1:2.1,long:.26,sweep:.8,droop:.2,r:.045,flat:.4,jitter:.2,colour:p=>d[p%5],tip:p=>d[(p+2)%5]}),g=[1,-1].map(p=>({at:r(.03*p,-.005,.2),rx:.006,ry:.006,tip:r(.18*p,-.04,.14),bone:"head",colour:"#efe6d2",up:[0,1,0],sides:3}));return H("marten-legend",s.body,s.skull,[...s.legs,i],we({lively:.75,tails:[i.chain]}),{cones:[...l,...f,...g],armour:c})}},Ir={id:"marten",heights:[45,69,97,237],curl:{turn:4.3},plans:Ur},ie="#e9a79c",et={coat:"#574f66",belly:"#6a6179",nose:ie,upper:"#574f66",mid:"#574f66",sock:"#6a6179",eye:"#15121a"},xt=(t,e)=>Re({C:t,hind:{len:.24,thick:2,...e.hind},fore:{len:.24,thick:2.2,paw:2.8,spread:2.3,claws:{colour:"#f3e9dc",len:1.6,thick:1.8,wide:2.4},...e.fore},body:{len:.72,girth:1.3,deep:.95,tuck:1.05,neck:[0,.1],neckThick:1.22,white:0,...e.body},head:{size:1.08,muzzle:.8,muzzleWide:1.3,muzzleDeep:1.2,wide:1,dome:.95,cheek:0,eye:.4,nose:2,...e.head,ear:{shape:"round",tall:.08,wide:.5,back:t.coat,inner:t.coat}}}),kt=(t,e,o,a=1,s=et.belly)=>{const r=[],n=[],i=[];for(const l of[1,-1]){const c=t.R[4],d=.07*e,f=[(c.rx+d*.75)*l,.03*e+.01,c.at[2]+d*.9],g=l>0?"spadeL":"spadeR";i.push([g,[c.rx*.6*l,f[1],c.at[2]],"chest"]),r.push(...st(g,f,{r:d,squash:.32,colour:s,sides:8}).lofts);for(let p=0;p<5;p++){const v=-.35+p*.42,u=[Math.sin(v)*l,0,Math.cos(v)],h=[-Math.cos(v)*l,0,Math.sin(v)],b=.1*e*a,w=[f[0]+u[0]*d*.82,f[1],f[2]+u[2]*d*.82];r.push({sides:4,up:[0,1,0],rings:[0,.25,.5,.75,1].map(m=>({at:[w[0]+(u[0]*m+h[0]*.55*m*m)*b,w[1]-.45*m*m*b,w[2]+(u[2]*m+h[2]*.55*m*m)*b],rx:Math.max(8e-4,.02*e*(1-m)**.7),ry:Math.max(8e-4,.011*e*(1-m)**.7),bone:g,colour:o,plain:!0}))})}}return{bones:i,lofts:r,cones:n}},Va=(t,e,o,a,s=!1)=>Array.from({length:e},(r,n)=>{const i=n/e*Math.PI*2;return{at:t(Math.cos(i)*.012,-.013+Math.sin(i)*.012,.265),rx:.007,ry:.007,tip:t(Math.cos(i)*o,-.013+Math.sin(i)*o,.285),bone:"head",colour:a,glow:s,up:[0,0,1],sides:3}}),St={baby(){const t=xt(et,{hind:{len:.18,thick:2.2},fore:{len:.18,thick:2.4,paw:2.6,spread:2.3,claws:{colour:"#f3e9dc",len:1,thick:1.5,wide:2.2}},body:{len:.48,girth:1.2},head:{size:1.3,muzzle:.7,nose:2}}),e=$("tail","pelvis",t.root,{len:.05,r:.016,pitch:.2,blunt:.4,tip:0,colours:{coat:ie,tip:ie}});return H("mole-baby",t.body,t.skull,[...t.legs,e,kt(t,.8,"#f3e9dc",.6)],ye({lively:1.3,tails:[e.chain]}))},young(){const t=xt(et,{body:{len:.66,girth:1.15}}),e=$("tail","pelvis",t.root,{len:.07,r:.016,pitch:.2,blunt:.4,tip:0,colours:{coat:ie,tip:ie}});return H("mole-young",t.body,t.skull,[...t.legs,e,kt(t,1.1,"#f3e9dc",.8)],ye({lively:1.1,tails:[e.chain]}))},adult(){const t=xt(et,{fore:{len:.28,thick:2.6,paw:3.8,spread:2.5},hind:{len:.26,thick:2.2},body:{len:.78,girth:1.6,hump:.6,neckThick:1.1},head:{size:1.2,muzzle:1}}),e=$("tail","pelvis",t.root,{len:.08,r:.018,pitch:.3,blunt:.4,tip:0,colours:{coat:ie,tip:ie}});return H("mole-adult",t.body,t.skull,[...t.legs,e,kt(t,1.9,"#f3e9dc",1.2)],ye({tails:[e.chain]}),{cones:[...Va(t.P,8,.05,ie),...le(t.P,"#cfc6d6",.9)]})},legend(){const t="#d3dae2",e="#5d646d",o="#ffd98a",a="#5c4630",s="#c9b99a",r={...et,coat:"#463f54",belly:"#584f68",upper:"#463f54",mid:"#463f54",eye:"#463f54"},n=xt(r,{fore:{len:.34,thick:2.8,paw:4.4,spread:2.6,knob:1.2,band:{colour:e,at:.1,r:.04}},hind:{len:.3,thick:2.4,claws:{colour:t,len:1.4,thick:1.6}},body:{len:.9,girth:1.9,hump:1,neck:[0,.12],neckThick:1.15},head:{size:1.35,muzzle:1.1}}),i=n.R,l=n.P,c=$("tail","pelvis",n.root,{len:.1,r:.02,pitch:.3,blunt:.4,tip:0,colours:{coat:ie,tip:ie}}),d=[1,2].flatMap(p=>B(i[p],de[p],{n:3,a0:.2,a1:1.3,long:.07,sweep:.5,droop:0,r:.085,flat:.8,sides:5,jitter:.5,colour:v=>v%2?a:"#6f563a",tip:()=>"#7a6040"})),f=[1,2].flatMap(p=>B(i[p],de[p],{n:3,a0:1,a1:1.9,long:.2,sweep:.7,droop:.7,r:.014,sides:3,jitter:.6,colour:()=>s})),g=[{from:2.45,to:4.9,round:[0,1.3],lames:4,thick:.024,step:.014,colour:"#8a929c",rim:e,runes:{colour:o}}];return H("mole-legend",n.body,n.skull,[...n.legs,c,kt(n,2.6,t,1.5,r.belly)],ye({lively:.75,tails:[c.chain]}),{cones:[...d,...f,...Va(l,11,.085,"#ffb8c8",!0),...le(l,"#cfc6d6",1.3)],armour:g})}},Ja=(t,e)=>["L","R"].map((o,a)=>{const s=t.legs.find(i=>i.bones[0]==="shoulder"+o),r=t.duty,n=a?-1:1;return{bone:"spade"+o,rot:i=>{const l=((i+s.phase)%1+1)%1,c=l<r?2*l/r-1:1-2*(l-r)/(1-r);return[0,n*e*c,l<r?0:-n*.12*Math.sin(Math.PI*(l-r)/(1-r))]}}}),zt=t=>()=>{const e=t();return e.gait.lie={fore:[-.3,.1,.1]},e.gait.sleep="sphinx",e.gait.paces.walk.extra=Ja(e.gait.paces.walk,.22),e.gait.paces.run.extra=Ja(e.gait.paces.run,.4),e},$r={id:"mole",heights:[45,67,95,323],plans:{baby:zt(St.baby),young:zt(St.young),adult:zt(St.adult),legend:zt(St.legend)}};function qr(t){const{at:e,turns:o=2,r:a=.09,coil:s=.11,high:r=.06,tower:n=0,colour:i,inlay:l,stars:c,ridge:d,lip:f,steps:g=9}=t,p=[Math.cos(n*1.35)*.9,Math.sin(n*1.35),-.25*n-.1],v=Math.hypot(...p),u=p.map(A=>A/v),h=[0,0,1],b=h[0]*u[0]+h[1]*u[1]+h[2]*u[2],w=h.map((A,N)=>A-u[N]*b),m=Math.hypot(...w),y=w.map(A=>A/m),k=[u[1]*y[2]-u[2]*y[1],u[2]*y[0]-u[0]*y[2],u[0]*y[1]-u[1]*y[0]],z=Math.round(o*g),x=[],C=[],M=[];for(let A=0;A<=z;A++){const N=A/z,O=Math.pow(1-N*.93,1.25),_=-.9+N*o*Math.PI*2,T=s*O,D=e.map((G,U)=>G+u[U]*r*(1-O)+T*(y[U]*Math.cos(_)+k[U]*Math.sin(_))),S=[0,1,2].map(G=>y[G]*Math.cos(_)+k[G]*Math.sin(_)),E=[0,1,2].map(G=>-y[G]*Math.sin(_)+k[G]*Math.cos(_));if(x.push({at:D,rx:a*O,ry:a*O,bone:"shell",colour:A===0&&f?f:i(N,A),up:S}),C.push({at:D.map((G,U)=>G+S[U]*a*O*.96),rx:a*O*.16,ry:a*O*.16,bone:"shell",colour:l,up:S}),d&&A%d.every===1&&O>.2&&M.push({at:D.map((G,U)=>G+S[U]*a*O*.9),rx:a*O*.5,ry:a*O*.16,tip:D.map((G,U)=>G+S[U]*a*O*(1.5+(d.long??0))-E[U]*a*O*.3),bone:"shell",colour:d.colour,tipColour:d.tip??d.colour,split:.6,up:E,sides:4}),c&&O>.15)for(let G=0;G<c.n;G++){const U=Math.sin(A*12.9898+G*78.233)*43758.5453,j=U-Math.floor(U),Y=j*Math.PI*2,P=[0,1,2].map(L=>S[L]*Math.cos(Y)+u[L]*Math.sin(Y));j>.28&&M.push({at:D.map((L,F)=>L+P[F]*a*O*.93),rx:a*O*.15*(.5+j),ry:a*O*.15*(.5+j),tip:D.map((L,F)=>L+P[F]*a*O*1.1),bone:"shell",colour:c.colour,glow:!0,up:E,sides:4})}}return{lofts:[{sides:8,up:[0,1,0],rings:x},...l?[{sides:4,up:[0,1,0],rings:C}]:[]],cones:M}}function Mt(t,e){const{len:o=1,fat:a=1,C:s,stalk:r=1,eye:n=1,frill:i=0,shell:l,gait:c={}}=e,d=y=>y*o,f=[["root",[0,0,0],null],["tailb",[0,.03,d(-.2)],"root"],["mid",[0,.04,d(0)],"root"],["front",[0,.06,d(.17)],"mid"],["head",[0,.12*a,d(.25)],"front"],["shell",[0,.1*a,d(-.03)],"mid"]],g=y=>y<-.5?s.sole:s.skin,p=[[-.36,.014,.008,.006,"tailb"],[-.27,.03,.06,.024,"tailb"],[-.1,.045,.1,.04,"tailb"],[.07,.05,.098,.046,"mid"],[.18,.075,.072,.052,"front"],[.245,.125,.056,.05,"head"],[.3,.14,.04,.036,"head"],[.33,.14,.012,.012,"head"]].map(([y,k,z,x,C])=>({at:[0,k*a,d(y)],rx:z*a,ry:x*a,bone:C,colour:g})),v=[{sides:8,up:[0,1,0],rings:p}],u=[],h=[0,.15*a,d(.265)];for(let y=0;y<i;y++)for(const k of[1,-1]){const z=-.22+y/Math.max(1,i-1)*.36;u.push({at:[.08*a*k,.035*a,d(z)],rx:.03*a,ry:.01*a,tip:[.125*a*k,.012,d(z-.015)],bone:z<-.05?"tailb":"mid",colour:s.skin,tipColour:s.frill??s.sole,split:.93,up:[0,0,1],sides:4})}for(const[y,k]of[[1,"L"],[-1,"R"]]){const z=[.028*a*y,h[1]+.02*a,h[2]],x=.14*r,C=[z[0]+.02*y*r,z[1]+x*.55,z[2]+x*.12],M=[z[0]+.045*y*r,z[1]+x,z[2]+x*.18];f.push([`stalk${k}1`,z,"head"],[`stalk${k}2`,C,`stalk${k}1`]),v.push({sides:5,up:[0,0,1],rings:[{at:z,rx:.016*a,ry:.016*a,bone:`stalk${k}1`,colour:s.skin},{at:C,rx:.012*a,ry:.012*a,bone:`stalk${k}1`,colour:s.skin},{at:M,rx:.011*a,ry:.011*a,bone:`stalk${k}2`,colour:s.skin}]}),v.push(...st(`stalk${k}2`,[M[0],M[1]+.012*n,M[2]],{r:.024*n*a,colour:s.eye,glow:!!s.lit,sides:6}).lofts),u.push({at:[.02*a*y,.13*a,d(.31)],rx:.008*a,ry:.008*a,tip:[.05*a*y,.115*a,d(.31)+.05*a],bone:"head",colour:s.skin,up:[0,1,0],sides:3})}const b=qr({at:[0,(.1+l.lift)*a,d(-.04)],...l}),w=e.sway??.12,m=Math.PI*2;return{name:t,bones:f,lofts:[...v,...b.lofts,...e.lofts??[]],cones:[...u,...b.cones,...e.cones??[]],armour:e.armour??[],anchors:{neck:4,skull:5},gait:{type:"glide",seconds:1.6,root:"root",bob:0,legs:[],sleep:"shell",...c,extra:[{bone:"tailb",pos:y=>[0,.004*Math.sin(m*2*y),.012*o*Math.sin(m*2*y)]},{bone:"mid",pos:y=>[0,.004*Math.sin(m*2*y+1.5),.01*o*Math.sin(m*2*y+1.5)]},{bone:"front",pos:y=>[0,.004*Math.sin(m*2*y+3),.012*o*Math.sin(m*2*y+3)]},{bone:"shell",rot:y=>[.035*Math.sin(m*2*y+2),0,.05*Math.sin(m*y)]},{bone:"head",rot:y=>[.05*Math.sin(m*y+1),.08*Math.sin(m*y),0]},...["L","R"].flatMap((y,k)=>[{bone:`stalk${y}1`,rot:z=>[w*Math.sin(m*z+k*2.2),0,w*.8*Math.sin(m*z*2+k*1.3)]},{bone:`stalk${y}2`,rot:z=>[w*1.3*Math.sin(m*z+k*2.2+.9),0,w*Math.sin(m*z*2+k*1.3+.8)]}])]}}}const Ya={skin:"#9c8a78",sole:"#c9b9a4",eye:"#17120f"},Yt=(t,e,o=2)=>(a,s)=>Math.floor(s/o)%2?t:e,Br={baby:()=>Mt("snail-baby",{len:.8,fat:1.15,C:{skin:"#c9bba8",sole:"#e3d8c6",eye:"#17120f"},stalk:1.1,eye:1.7,shell:{lift:0,turns:1.1,r:.075,coil:.06,high:.03,colour:()=>"#ece4cf"}}),young:()=>Mt("snail-young",{C:Ya,stalk:1.2,eye:1.2,shell:{lift:.035,turns:2.1,r:.1,coil:.1,high:.05,colour:Yt("#d99632","#f0c56a",3)}}),adult:()=>Mt("snail-adult",{C:{...Ya,frill:"#e9dcc6"},stalk:2,eye:1.2,frill:5,shell:{lift:.07,turns:3.3,r:.125,coil:.14,high:.3,tower:.75,colour:Yt("#c9811f","#6e4320",3),ridge:{colour:"#f0c56a",tip:"#fff0c0",every:3,long:.5}}}),legend(){const t="#1b2452",e="#2a3472",o="#e9b949",a="#f4f8ff",s={skin:"#8a8a8c",sole:"#b6b6b4",frill:"#d6d6d2",eye:"#bfe6ff",lit:!0},r=[{on:0,from:3.3,to:5.5,round:[0,1.3],lames:3,thick:.014,step:.008,colour:t,rim:o,runes:{colour:a,size:.7}}];return Mt("snail-legend",{len:1.15,fat:1.25,C:s,stalk:3.4,eye:1.1,frill:7,sway:.09,shell:{lift:.09,turns:4.2,r:.17,coil:.2,high:.5,tower:.85,steps:10,colour:Yt(t,e,4),inlay:o,stars:{n:4,colour:a}},armour:r,gait:{seconds:2.4}})}},jr={id:"snail",heights:[35,54,73,222],plans:Br},Vo="#2a1c18",Xt="#e9b949",Ft={coat:"#b8521f",belly:"#f6efe4",nose:Vo,upper:"#b8521f",mid:"#a4471a",sock:"#8a3a15"},Xa={coat:"#a3441a",under:"#7e3212",tip:"#c96a2c"},Ct=(t,e)=>Re({C:t,hind:{len:.5,thick:1.5,foot:1.6,...e.hind},fore:{len:.38,thick:1.15,...e.fore},body:{len:.62,girth:.98,deep:1,tuck:.95,arch:1.2,rump:1.25,neck:[.09,.08],neckThick:1.1,white:.55,...e.body},head:{size:1.08,muzzle:.5,muzzleWide:1.2,muzzleDeep:1.15,dome:1.1,wide:1.02,cheek:0,eye:1.75,eyeAt:[.002,.008,-.015],...e.head,ear:{tall:.8,wide:.85,back:t.coat,...e.ear}}}),Zt=(t,e,o)=>[1,-1].map(a=>({at:t(.07*a,.17,.012),rx:.02+.004*e,ry:.016,tip:t(.085*a,.17+.1*e,0),bone:a>0?"earL":"earR",colour:o,bulge:.75,split:.45,up:[0,0,1],sides:5})),Kr={baby(){const t={...Ft,coat:"#c06a3a",upper:"#c06a3a",mid:"#c06a3a"},e=Ct(t,{hind:{len:.36,thick:1.7},fore:{len:.3,thick:1.4},body:{len:.5,girth:1,arch:.7,neck:[.05,.06]},head:{size:1.3,eye:2},ear:{tall:.7,wide:1.1,back:"#e6a58f"}}),o=$("tail","pelvis",e.root,{len:.26,r:.022,pitch:.7,curl:-.9,blunt:.4,tip:0,colours:{coat:t.coat,tip:t.coat}});return H("squirrel-baby",e.body,e.skull,[...e.legs,o],oe({lively:1.3,tails:[o.chain]}))},young(){const t=Ct(Ft,{body:{len:.6,girth:.86},head:{size:1},ear:{tall:.9}}),e=$("tail","pelvis",t.root,{len:.44,r:.075,pitch:1.45,curl:-.5,plume:!0,bones:5,tip:.18,colours:Xa});return H("squirrel-young",t.body,t.skull,[...t.legs,e],oe({lively:1.1,tails:[e.chain]}),{cones:Zt(t.P,.6,Ft.mid)})},adult(){const t=Ct(Ft,{body:{len:.66,girth:1.05,rump:1.3},head:{size:1.1,wide:1.14,cheek:.45},ear:{tall:.95}}),e=$("tail","pelvis",t.root,{len:.84,r:.16,pitch:1.5,curl:-.9,wave:.5,waves:.75,bones:6,plume:!0,tip:.16,colours:Xa,spikes:{n:6,colour:"#d9803a",len:.9}});return H("squirrel-adult",t.body,t.skull,[...t.legs,e],oe({tails:[e.chain]}),{cones:[...Zt(t.P,1.6,"#7e3212"),...le(t.P,"#f6efe4",.8)]})},legend(){const t="#ffd76a",e="#4a3220",a=Ct({coat:"#a84a1a",back:"#8c8178",belly:"#efe6d8",muzzle:"#d6cdc0",nose:Vo,upper:"#a84a1a",mid:"#8c3c14",sock:"#5f2a0f",eyes:[{colour:t,glow:!0},{colour:t,glow:!0}]},{hind:{len:.62,thick:1.45,foot:1.7,knob:1.3,claws:{colour:"#e6dcc8",len:1.1}},fore:{len:.46,thick:1.15,knob:1.3,claws:{colour:"#e6dcc8",len:1}},body:{len:.74,girth:1.12,deep:1.1,rump:1.35,hump:.4,neck:[.1,.1],neckThick:1.25},head:{size:1.2,wide:1.16,cheek:.6},ear:{tall:1,torn:1}}),s=a.P,r=$("tail","pelvis",a.root,{len:1.2,r:.165,pitch:1.5,curl:-1,wave:.6,waves:.75,bones:7,plume:!0,sides:8,tip:.12,colours:{coat:"#b5561f",under:"#7e3212",tip:"#e9a94a"},spikes:{n:8,colour:t,len:.9,glow:"tip"},ring:{colour:Xt,at:.3}}),n=[{from:2.2,to:4.65,round:[0,1.7],lames:3,thick:.02,step:.012,colour:e,rim:Xt,runes:{colour:t}}],i=[{at:s(.008,-.03,.235),rx:.008,ry:.006,tip:s(.008,-.062,.24),bone:"head",colour:Xt,up:[0,0,1],sides:3}];return H("squirrel-legend",a.body,a.skull,[...a.legs,r],oe({lively:.75,tails:[r.chain]}),{cones:[...Zt(s,1.7,"#7e3212"),...i,...le(s,"#efe6d8",1.5)],armour:n})}},Vr={id:"squirrel",heights:[42,71,122,403],plans:Kr},Jo="#16100e",ce="#17120f",Qt="#e9b949",Jr=-1,pe={coat:"#b9743d",belly:"#f6f0e3",nose:Jo,upper:"#b9743d",mid:"#a5642f",sock:"#f0e8d8"},Yr={baby(){const t={...pe,coat:"#c99a72",upper:"#c99a72",mid:"#c99a72",sock:"#e9dcc8"},e=xe({C:t,body:{len:.78,girth:.72,arch:.5,neck:[.07,.09],neckThick:1.15,white:.7},legs:{len:.34,thick:1.7},head:{size:1.18,muzzle:.42,eye:1.6}}),o=$("tail","pelvis",e.root,{len:.13,r:.03,pitch:.1,tip:.3,blunt:.3,colours:{coat:t.coat,tip:"#5a4234"}}),a=B(e.body.rings[5],"neck",{n:3,a0:.3,a1:2,long:.07,sweep:.5,r:.04,lock:!0,colour:()=>"#efe3cf"});return H("stoat-baby",e.body,e.skull,[...e.legs,o],we({lively:1.3,tails:[o.chain]}),{cones:a})},young(){const t=xe({C:pe,body:{len:1.12,girth:.56,arch:.9,neck:[.14,.14],neckThick:.95,white:.72},legs:{len:.4,thick:1.35},head:{size:.94,eye:1.4}}),e=$("tail","pelvis",t.root,{len:.26,r:.034,pitch:-.1,tip:.3,blunt:.3,colours:{coat:pe.coat,tip:ce}});return H("stoat-young",t.body,t.skull,[...t.legs,e],we({lively:1.1,tails:[e.chain]}))},adult(){const t=xe({C:pe,body:{len:1.3,girth:.6,arch:1.2,neck:[.3,.1],neckThick:.92,white:.78},legs:{len:.44,thick:1.35},head:{size:1.02,eye:1.5}}),e=$("tail","pelvis",t.root,{len:.5,r:.09,pitch:.6,curl:-.6,tip:.6,plume:!0,colours:{coat:pe.coat,tip:ce}}),o=[...B(t.body.rings[6],"neck",{n:1,a0:.1,long:.12,sweep:.7,r:.035,colour:()=>pe.coat,tip:()=>ce}),...B(t.body.rings[5],"neck",{n:1,a0:.1,long:.13,sweep:.7,r:.038,colour:()=>pe.coat,tip:()=>ce}),...B(t.body.rings[4],"chest",{n:1,a0:.1,long:.09,sweep:.8,r:.03,colour:()=>pe.coat,tip:()=>ce})];return H("stoat-adult",t.body,t.skull,[...t.legs,e],we({tails:[e.chain]}),{cones:o})},legend(){const t="#f4f2ec",e={coat:t,belly:"#ffffff",back:"#e3ded2",nose:Jo,upper:t,mid:"#e3ded2",sock:"#d8d2c4",eyes:[{colour:"#ff5a3c",glow:!0},{colour:"#ff5a3c",glow:!0}],ear:"#e3ded2"},o="#ff6a4a",a=xe({C:e,body:{len:1.45,girth:.72,arch:1.5,neck:[.36,.08],neckThick:.98,white:.5},legs:{len:.6,thick:1.2,knob:1.3,claws:{colour:ce,len:.9},band:{colour:Qt,at:.25,r:.036}},head:{size:1.16,muzzle:.62,eye:1.5,ear:{shape:"round",tall:.62,wide:1.25,at:[.012,-.012,-.005],back:"#e3ded2",inner:"#c98f6e",torn:1}}}),s=a.skull.P,r=[-1,0,1].map((d,f)=>$(`tail${"abc"[f]}`,"pelvis",[.02*d,a.root[1],a.root[2]],{len:.62-.1*Math.abs(d),r:.07,yaw:d*.5,twist:d*.4,pitch:.9-.3*Math.abs(d),curl:-.9,wave:.25,phase:f*2,bones:5,tip:.5,plume:!0,colours:{coat:t,tip:ce}})),n=[...B(a.body.rings[4],"chest",{n:5,a0:.2,a1:2.3,long:.22,sweep:.8,droop:.25,r:.042,flat:1,jitter:.15,colour:()=>"#ffffff",tip:()=>ce}),...B(a.body.rings[3],"chest",{n:4,a0:.25,a1:2,long:.2,sweep:.85,droop:.2,r:.04,flat:1,jitter:.15,colour:()=>"#ffffff",tip:()=>ce})],i=[{from:3.4,to:4.95,round:[0,1.7],side:Jr,lames:3,thick:.022,step:.012,flare:1,colour:"#d9a531",rim:"#8a6420",runes:{colour:"#ff3b1f",round:[.6,1.7],size:.6,w:.005,max:1}}],l=[{at:s(0,.085,.085),rx:.04,ry:.016,tip:s(0,.23,.07),bone:"head",colour:Qt,split:.6,up:[0,0,1]},...[1,-1].map(d=>({at:s(.05*d,.075,.07),rx:.028,ry:.014,tip:s(.075*d,.18,.05),bone:"head",colour:Qt,split:.6,up:[0,0,1]})),{at:s(0,.085,.1),rx:.016,ry:.016,tip:s(0,.1,.125),bone:"head",colour:o,glow:!0,up:[0,1,0]}],c=[1,-1].map(d=>({at:s(.03*d,-.005,.2),rx:.006,ry:.006,tip:s(.17*d,-.03,.15),bone:"head",colour:"#ffffff",up:[0,1,0],sides:3}));return H("stoat-legend",a.body,a.skull,[...a.legs,...r],we({lively:.75,tails:r.map(d=>d.chain)}),{cones:[...n,...l,...c],armour:i})}},Xr={id:"stoat",heights:[41,63,88,229],curl:{turn:4.5},plans:Yr};function Yo(t,e,o){const{rx:a=.16,rz:s=.2,high:r=.12,colour:n,rim:i,seams:l,sides:c=10,rows:d=5}=o,f=u=>u/d*(Math.PI/2)*.97,g=(u,h)=>{const b=u*(Math.PI/2)*.97,w=Math.sin(h)*Math.cos(b),m=Math.cos(h)*Math.cos(b),y=Math.sin(b),k=[w/a,y/r,m/s],z=Math.hypot(...k)||1;return{at:[e[0]+w*a,e[1]+y*r,e[2]+m*s],out:k.map(x=>x/z)}},p=Array.from({length:d+1},(u,h)=>({at:[e[0],e[1]+Math.sin(f(h))*r,e[2]],rx:a*Math.cos(f(h)),ry:s*Math.cos(f(h)),bone:t,up:[0,0,1],glow:!!o.glow,colour:(b,w)=>n(h,b,w)})),v=[{name:o.name??"dome",sides:c,up:[0,0,1],rings:[{...p[0],at:[e[0],e[1]-.012,e[2]],rx:a*.9,ry:s*.9},...p]}];if(i&&v.push({sides:c,up:[0,0,1],rings:[[-.02,.96],[-.006,1.06],[.01,1.06],[.022,.98]].map(([u,h])=>({at:[e[0],e[1]+u,e[2]],rx:a*h+(i.r??0),ry:s*h+(i.r??0),bone:t,up:[0,0,1],colour:i.colour}))}),l){const u=l.w??.007,h=b=>({sides:3,up:[0,1,0],rings:b.map(w=>({at:w.at.map((m,y)=>m+w.out[y]*u*.6),rx:u,ry:u,bone:t,colour:l.colour,glow:!!l.glow,up:w.out}))});for(let b=0;b<(l.n??6);b++){const w=(b+.5)/(l.n??6)*Math.PI*2;v.push(h([.02,.25,.5,.72].map(m=>g(m,w+(m>.4?.12:0)))))}v.push(h(Array.from({length:13},(b,w)=>g(.72,w/12*Math.PI*2)))),v.push(h(Array.from({length:13},(b,w)=>g(.36,w/12*Math.PI*2+.26))))}return{bones:[],cones:[],lofts:v,on:g}}function Zr(t,e,o,a){const{r:s=.08,high:r=.04,colour:n,rim:i,gem:l,sides:c=6,up:d=[0,1,0],ry:f=s}=a,g=Math.hypot(...o)||1,p=o.map(h=>h/g),v=e.map((h,b)=>h+p[b]*r),u=[{at:e,rx:s,ry:f,tip:v,bone:t,colour:i??n,tipColour:n,split:.35,up:d,sides:c}];return l&&u.push({at:v.map((h,b)=>h-p[b]*r*.35),rx:s*.28,ry:s*.28,tip:v.map((h,b)=>h+p[b]*r*.5),bone:t,colour:l.colour,glow:!0,up:d,sides:4}),{bones:[],lofts:[],cones:u}}const Qr="#7d8f6a",ge={coat:Qr,belly:"#e6d79a",nose:"#3a4226",upper:"#6a7c58",mid:"#5b6c4a",sock:"#4c5c3e",eye:"#17140f"},Pt=(t,e)=>Re({C:t,hind:{len:.27,thick:2,paw:1.5,spread:2.1,...e.hind},fore:{len:.27,thick:1.9,paw:1.6,spread:2.2,...e.fore},body:{len:.8,girth:1.2,deep:.72,tuck:1.05,neck:[.07,.2],neckThick:.62,white:.6,...e.body},head:{size:.84,muzzle:.42,muzzleWide:1.45,muzzleDeep:1.3,wide:.95,dome:.95,cheek:0,eye:1.35,eyeAt:[0,.006,-.01],nose:.01,...e.head,ear:{shape:"round",tall:.05,wide:.4,back:t.coat,inner:t.coat}}}),Lt=(t={})=>pr({sleep:"shell",...t,walk:{body:{roll:.05,sway:.05,yaw:.09,bob:.02},...t.walk}}),Tt=(t,e)=>{const o=t.R,a=[0,o[1].at[1]+.005,(o[1].at[2]+o[4].at[2])/2-.01],s=o[4].at[2]-o[1].at[2];return Yo("loin",a,{rx:o[3].rx*(e.wide??1.5),rz:s*(e.long??.72),high:e.high,sides:e.sides??10,rows:e.rows??5,colour:e.colour,rim:e.rim,seams:e.seams,glow:e.glow})},ea=(t,e)=>(o,a,s)=>(o+Math.round((Math.atan2(s,a)/Math.PI+1)*3))%2?t:e,ei={baby(){const t={...ge,coat:"#a3b08a",upper:"#a3b08a",mid:"#93a07a",sock:"#93a07a"},e=Pt(t,{hind:{len:.2,thick:2.1,paw:1.7,spread:2.1},fore:{len:.2,thick:2.1,paw:1.8,spread:2.2},body:{len:.56,girth:1.1,neck:[.05,.13],neckThick:.8},head:{size:1.25,eye:1.7}}),o=Tt(e,{high:.1,colour:ea("#c9a560","#b89250")}),a=$("tail","pelvis",e.root,{len:.07,r:.022,pitch:-.2,tip:0,colours:{coat:t.coat,tip:t.coat}}),s=o.on(.55,0),r=Yo("loin",[s.at[0],s.at[1]-.012,s.at[2]-.06],{rx:.12,rz:.12,high:.11,sides:8,rows:4,colour:()=>"#fbf8ee"}),n=Array.from({length:7},(i,l)=>{const c=r.on(.04,l/7*Math.PI*2+.3);return{at:c.at,rx:.03,ry:.012,tip:[c.at[0]+c.out[0]*.012,c.at[1]-.04-.016*(l%2),c.at[2]+c.out[2]*.012],bone:"loin",colour:"#fbf8ee",up:[0,0,1],sides:3}});return H("turtle-baby",e.body,e.skull,[...e.legs,o,r,a],Lt({lively:1.3,tails:[a.chain]}),{cones:n})},young(){const t=Pt(ge,{body:{len:.78,girth:1.08},head:{size:.82}}),e=Tt(t,{high:.13,colour:ea("#a8843f","#8f6d32"),rim:{colour:"#e6d79a"}}),o=$("tail","pelvis",t.root,{len:.12,r:.026,pitch:-.25,tip:0,colours:{coat:ge.coat,tip:ge.coat}});return H("turtle-young",t.body,t.skull,[...t.legs,e,o],Lt({lively:1.1,tails:[o.chain]}))},adult(){const t=Pt(ge,{hind:{len:.3,thick:2.2,paw:1.6,spread:2.2,claws:{colour:"#e6dcb8",len:1.2,thick:1.4,wide:1.5}},fore:{len:.3,thick:2.2,paw:1.7,spread:2.3,claws:{colour:"#e6dcb8",len:1.4,thick:1.4,wide:1.6}},body:{len:.86,girth:1.3,neck:[.09,.22],neckThick:.7},head:{size:.92,muzzle:.5,muzzleDeep:1.45}}),e=Tt(t,{high:.27,wide:1.6,colour:ea("#7a5a2a","#9a7636"),rim:{colour:"#e6d79a"}}),o=$("tail","pelvis",t.root,{len:.16,r:.03,pitch:-.25,tip:0,colours:{coat:ge.coat,tip:ge.coat}}),a=[.92,.72,.5].flatMap((r,n)=>[0,Math.PI].filter(i=>n||!i).map(i=>{const l=e.on(r,i);return Zr("loin",l.at,[l.out[0],l.out[1]+.6,l.out[2]-.2],{r:.06,ry:.04,high:.075,colour:"#c9a560",rim:"#7a5a2a",up:[0,0,1],sides:5})})),s=Array.from({length:8},(r,n)=>{const i=e.on(0,n/8*Math.PI*2+.2);return{at:i.at,rx:.03,ry:.016,tip:[i.at[0]+i.out[0]*.02,i.at[1]-.07-.02*(n%3),i.at[2]+i.out[2]*.02],bone:"loin",colour:"#4f7a3a",tipColour:"#7ba24c",bulge:.8,split:.5,up:[0,0,1],sides:4}});return H("turtle-adult",t.body,t.skull,[...t.legs,e,...a,o],Lt({tails:[o.chain]}),{cones:s})},legend(){const t="#2f3a34",e="#3d4a40",o="#a8f0d0",a="#b9722e",s={...ge,coat:"#5b6a48",belly:"#c9ba80",muzzle:"#8a9470",upper:"#4c5a3a",mid:"#3f4c30",sock:"#333f28",eyes:[{colour:o,glow:!0},{colour:"#dfe6e2"}]},r=Pt(s,{hind:{len:.36,thick:2.3,paw:1.7,spread:2.2,knob:1.2,claws:{colour:"#d9d2b8",len:1.8,thick:1.6,wide:1.6}},fore:{len:.36,thick:2.3,paw:1.8,spread:2.3,knob:1.2,claws:{colour:"#d9d2b8",len:2,thick:1.6,wide:1.7}},body:{len:.95,girth:1.4,neck:[.14,.26],neckThick:.78},head:{size:1.05,muzzle:.55,muzzleDeep:1.5,eye:1.4}}),n=r.P,i=Tt(r,{high:.3,wide:1.7,long:.78,rows:6,sides:8,colour:()=>o,glow:!0,rim:{colour:a,r:.012}}),l=$("tail","pelvis",r.root,{len:.2,r:.036,pitch:-.25,tip:0,colours:{coat:s.coat,tip:s.coat}}),c=[{on:"dome",from:1,to:5.9,round:[0,3.2],lames:3,inset:.07,gap:.05,thick:.02,step:0,colour:t,rim:a,runes:{colour:o,size:.5,max:1}},{on:"dome",from:6,to:7,round:[0,3.2],thick:.02,step:0,colour:e,rim:a}],d=[{at:n(0,-.035,.17),rx:.03,ry:.025,tip:n(0,-.24,.12),bone:"head",colour:"#f1eee4",tipColour:"#c9c6ba",bulge:.8,split:.45,up:[0,0,1],sides:5},...[1,-1].flatMap(f=>[{at:n(.05*f,.085,.11),rx:.016,ry:.012,tip:n(.2*f,.16,-.06),bone:"head",colour:"#f1eee4",bulge:.7,split:.5,up:[0,1,0],sides:4},{at:n(.04*f,-.01,.2),rx:.008,ry:.008,tip:n(.2*f,-.12,.14),bone:"head",colour:"#f1eee4",up:[0,1,0],sides:3}])];return H("turtle-legend",r.body,r.skull,[...r.legs,i,l],Lt({lively:.75,tails:[l.chain]}),{cones:d,armour:c})}},ti={id:"turtle",heights:[45,69,97,280],plans:ei},Xo={badger:br,bee:zr,dormouse:Pr,fox:Rr,hare:Or,hedgehog:Nr,marten:Ir,mole:$r,snail:jr,squirrel:Vr,stoat:Xr,turtle:ti},ai=["baby","young","adult","legend"],Ml=Object.fromEntries(Object.entries(Xo).map(([t,e])=>[t,ai.map(o=>e.curl?()=>{const a=e.plans[o]();return a.gait.curl=e.curl,a}:e.plans[o])])),Fl=Object.fromEntries(Object.entries(Xo).map(([t,e])=>[t,e.heights])),Zo={},Qo=["baby","young","adult","legend"],Za=new Map,Cl=(t,e,o)=>`${Qo[t]}-walk${e}${o?"-away":""}`;function Pl(t,e){const o=`${t}/${e}`,a=Zo[o];if(!a)return;let s=Za.get(o);if(!s){const r=atob(a.px),n=new Uint8ClampedArray(r.length);for(let i=0;i<r.length;i++)n[i]=r.charCodeAt(i);Za.set(o,s={w:a.w,h:a.h,rgba:n})}return s}const Ll=(t,e)=>oi.has(`${t}/${Qo[e]}`),oi=new Set(Object.keys(Zo).map(t=>t.slice(0,t.indexOf("-"))));function si(t){const e=new Uint8Array(2048);e.set(t.subarray(0,1024));for(let o=0;o<256;o++){const a=o*4,s=(t[a]*.3+t[a+1]*.55+t[a+2]*.15)/255;e.set([Math.round(90+s*150),Math.round(145+s*105),Math.round(180+s*75),t[a+3]],1024+a)}return e}let Pa=!1;function Tl(t){Pa=t}const Al=()=>Pa,ri=t=>{Pa||(t.image.data=null),t.onUpdate=null};function da(t,e,o,a=!1){const s=new _t(t,e,o,a?ia:bo,wo);return a&&(s.unpackAlignment=1),s.magFilter=he,s.minFilter=he,s.generateMipmaps=!1,s.flipY=!1,s.colorSpace=yo,s.needsUpdate=!0,s.onUpdate=ri,s}function es(t){const e=new _t(si(t),lt,2,bo,wo);return e.magFilter=e.minFilter=he,e.generateMipmaps=!1,e.flipY=!1,e.colorSpace=yo,e.needsUpdate=!0,e}let ii=null;const fa=()=>ii??=es(new Uint8Array(lt*4));function El(t,e,o,a){const s=ha(t),[r,n]=pa(s?.idx??t,s?.pal??null,e,o,a);return{tex:r,pal:n,indexed:!!s}}function pa(t,e,o,a,s){const r=Dt(da(t,o,a,!!e),s);if(!e)return[r,fa()];const n=Dt(es(e),s);return r.addEventListener("dispose",()=>n.dispose()),[r,n]}function ni(t,e="props"){const[o,a]=pa(t.albedo,t.albedoPal,t.width,t.height,e),[s,r]=pa(t.normal,t.normalPal,t.width,t.height,e);return{albedo:o,normal:s,albedoPal:a,normalPal:r,indexed:new Z(t.albedoPal?1:0,t.normalPal?1:0),frames:t.frames}}function Rl(t){const e=n=>{const i=n.image;return[i?.width??0,i?.height??0]},[o,a]=e(t.albedo),[s,r]=e(t.normal);return Ua(o,a,t.indexed.x>.5)+Ua(s,r,t.indexed.y>.5)+(t.indexed.x>.5?1024:0)+(t.indexed.y>.5?1024:0)}const li=(t="uAlbedo",e="uNormal")=>`
uniform sampler2D ${t}, ${e}, ${t}Pal, ${e}Pal;
uniform vec2 uIndexed;
vec4 albedoAt(vec2 q) { vec4 c = texture2D(${t}, q); return uIndexed.x > 0.5 ? texelFetch(${t}Pal, ivec2(int(c.r * 255.0 + 0.5), 0), 0) : c; }
vec4 normalAt(vec2 q) { vec4 c = texture2D(${e}, q); return uIndexed.y > 0.5 ? texelFetch(${e}Pal, ivec2(int(c.r * 255.0 + 0.5), 0), 0) : c; }
`,ci=(t,e="uAlbedo",o="uNormal")=>({[e]:{value:t.albedo},[o]:{value:t.normal},[e+"Pal"]:{value:t.albedoPal},[o+"Pal"]:{value:t.normalPal},uIndexed:{value:t.indexed}});function ui(t,e,o="uAlbedo",a="uNormal"){t[o].value=e.albedo,t[a].value=e.normal,t[o+"Pal"].value=e.albedoPal,t[a+"Pal"].value=e.normalPal,t.uIndexed.value=e.indexed}function Gl(t){const e=new Uint8Array(4),o={uv:[0,0,0,0],w:1,h:1,pad:0};return{albedo:da(e,1,1),normal:da(new Uint8Array(4),1,1),albedoPal:fa(),normalPal:fa(),indexed:new Z(0,0),frames:Array.from({length:t},()=>o),grounds:[]}}const Dl=(t,e=2048)=>ni(ur(t,e));function hi(t){return{value:t?new W(1,t.lightFloor,t.lightTint,t.lightRim):new W}}const di=`
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
  for (int i = 0; i < ${be}; i++) {
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
`,fi=3,ga={uCastMap:{value:null},uCastWin:{value:new W(0,0,1,0)}},pi=`
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
`;class Ol{constructor(e=160,o=1024){this.size=e,this.res=o,this.rt=new Rt(o,o,{minFilter:Ga,magFilter:Ga,depthBuffer:!1,stencilBuffer:!1,generateMipmaps:!1});const a=e/2;this.cam=new vo(-a,a,a,-a,1,2e3),this.cam.up.set(0,0,-1),this.cam.layers.set(fi),ga.uCastMap.value=this.rt.texture}size;res;rt;cam;clear=new wa;render(e,o,a,s,r){const n=ga.uCastWin.value;if(!r){n.w=0;return}const i=this.size/this.res,l=Math.round(a/i)*i,c=Math.round(s/i)*i;this.cam.position.set(l,1e3,c),this.cam.lookAt(l,0,c),this.cam.updateMatrixWorld();const d=He.uBend.value.x,f=o.background,g=e.getRenderTarget(),p=e.getClearAlpha();e.getClearColor(this.clear),He.uBend.value.x=0,o.background=null,e.setRenderTarget(this.rt),e.setClearColor(16777215,1),e.clear(!0,!1,!1),e.render(o,this.cam),e.setRenderTarget(g),e.setClearColor(this.clear,p),o.background=f,He.uBend.value.x=d,n.set(l-this.size/2,c+this.size/2,this.size,1)}dispose(){this.rt.dispose()}}class ae{lo=1/0;hi=-1;range={start:0,count:0};touch(e){e<this.lo&&(this.lo=e),e>this.hi&&(this.hi=e)}flush(e){if(this.hi>=this.lo){const o=e.itemSize,a=this.range,s=e.updateRanges[0];let r=this.lo*o,n=(this.hi+1)*o;s&&(r=Math.min(s.start,r),n=Math.max(s.start+s.count,n),e.clearUpdateRanges()),a.start=r,a.count=n-r,e.updateRanges.push(a),e.needsUpdate=!0}this.lo=1/0,this.hi=-1}}const gi={ramp:["#49141e","#b43216","#ff7826","#fff0af"],contrast:"#77bbee",motion:0,imprint:"scorch",sound:"fire"},mi={ramp:["#163b64","#397cbb","#9dd8ed","#f0fbff"],contrast:"#ffffff",motion:1,imprint:"frost",sound:"ice"},vi={ramp:["#193116","#467d23","#a7d73a","#f1fac1"],contrast:"#a366bb",motion:2,imprint:"wet",sound:"water"},bi={ramp:["#302749","#7774b8","#c4c3eb","#f6efff"],contrast:"#94cfed",motion:3,imprint:"charge",sound:"light"},wi={ramp:["#22254e","#525fbd","#91c3f1","#f2faff"],contrast:"#e6bf78",motion:4,imprint:"charge",sound:"storm"},yi={ramp:["#30221d","#81532d","#ce9b55","#f3d9a4"],contrast:"#95b88b",motion:5,imprint:"push",sound:"earth"},xi={ramp:["#20192f","#674878","#b289c1","#f1d8f5"],contrast:"#b9a2d3",motion:6,imprint:"scorch",sound:"void"},ki={ramp:["#273426","#518551","#d895b6","#f6dddc"],contrast:"#b1d97d",motion:7,imprint:"bloom",sound:"nature"},Si={ramp:["#173646","#28799c","#6fc9db","#dbf6ee"],contrast:"#b5dce5",motion:2,imprint:"wet",sound:"water"},zi={ramp:["#41302c","#9b7142","#dcb67a","#f4e1b2"],contrast:"#bba38c",motion:5,imprint:"push",sound:"earth"},Mi={ramp:["#233025","#536542","#a1a66a","#e2d7a6"],contrast:"#c6a26f",motion:7,imprint:"bloom",sound:"nature"},Fi={ramp:["#283c41","#629298","#abd1cf","#edf2da"],contrast:"#e0d8b1",motion:3,imprint:"push",sound:"wind"},Ci={ramp:["#352239","#a65879","#dfad66","#fff0c2"],contrast:"#e598bb",motion:7,imprint:"bloom",sound:"party"},Pi={ramp:["#4a3a6a","#d0c8f0","#f4f0ff","#ffffff"],contrast:"#ffe9a8",motion:3,imprint:"bloom",sound:"light"},Li={ramp:["#4a2c06","#c08414","#ffd23c","#fff7c8"],contrast:"#fffbe8",motion:3,imprint:"charge",sound:"light"},ke={fire:gi,frost:mi,venom:vi,moonlight:bi,storm:wi,earth:yi,shadow:xi,bloom:ki,water:Si,sand:zi,wood:Mi,wind:Fi,party:Ci,rainbow:Pi,gold:Li},Ti={id:0,size:1.7,ground:!1},Ai={id:1,size:4,ground:!1},Ei={id:2,size:1.1,ground:!1},Ri={id:3,size:2,ground:!0},Gi={id:4,size:3.2,ground:!1},Di={id:5,size:9,ground:!1},Oi={id:6,size:5,ground:!1},_i={id:7,size:6,ground:!1},Hi={id:8,size:2,ground:!0},Ni={id:9,size:5,ground:!1},Wi={id:10,size:2.2,ground:!1},Ui={id:11,size:1.1,ground:!1},te={projectile:Ti,burst:Ai,beam:Ei,zone:Ri,aura:Gi,pillar:Di,vortex:Oi,dome:_i,trap:Hi,eruption:Ni,lob:Wi,trail:Ui},Ii=[.25,.45,.65,1],$i=[.6,1.4],qi=[.08,.25],Bi=.5,ji=6,Ki=.2,Vi=[6,18],Ji=[.2,.85],Yi=128,Xi=200,Zi=5,Qi=256,en=2048,q={levels:Ii,size:$i,halo:qi,secondaryAt:Bi,lightCap:ji,lightEase:Ki,lightReach:Vi,lightStrength:Ji,fieldSize:Yi,fieldMetres:Xi,imprintSeconds:Zi,pool:Qi,instances:en},Qa=["frost","scorch","wet","bloom","charge","push"],ue=Object.keys(ke),eo=Object.keys(te),Je=t=>q.levels[Math.max(0,Math.min(3,Math.round(t)))]??.65,Ye=(t,e)=>t[0]+(t[1]-t[0])*Math.max(0,Math.min(1,e));function Me(t){return Object.hasOwn(ke,t)?t:"moonlight"}function ta(t,e,o,a,s){return Math.max(0,o)/(1+Math.hypot(t-a,e-s)/12)}class tn{constructor(e=q.fieldSize,o=q.fieldMetres){this.size=e,this.metres=o,this.data=new Uint8Array(e*e*8),this.values=new Float32Array(this.data.length),this.cell=o/e}size;metres;data;values;x=0;z=0;cell;ready=!1;ink=0;dirty=!0;publishedActive=!1;work={decayValues:0,publishValues:0,clearValues:0};get active(){return this.publishedActive}index(e,o){return((o%this.size+this.size)%this.size*this.size+(e%this.size+this.size)%this.size)*8}move(e,o){const a=Math.floor(e/this.cell)-this.size/2,s=Math.floor(o/this.cell)-this.size/2;if(!(this.ready&&a===this.x&&s===this.z)){if(!this.ink&&!this.publishedActive){this.x=a,this.z=s,this.ready=!0;return}for(let r=s;r<s+this.size;r++)for(let n=a;n<a+this.size;n++)if(!this.ready||n<this.x||n>=this.x+this.size||r<this.z||r>=this.z+this.size){const i=this.index(n,r);this.work.clearValues+=16;for(let l=i;l<i+8;l++)this.values[l]>0&&this.ink--,(this.values[l]!==0||this.data[l]!==0)&&(this.dirty=!0),this.values[l]=0,this.data[l]=0}this.x=a,this.z=s,this.ready=!0}}decay(e){const o=Math.max(0,e)*255/q.imprintSeconds;if(!(!o||!this.ink)){this.work.decayValues+=this.values.length;for(let a=0;a<this.values.length;a++){const s=this.values[a];this.values[a]=Math.max(0,s-o),s>0&&this.values[a]===0&&this.ink--}this.dirty=!0}}stamp(e,o,a,s,r){const n=Qa.indexOf(s);if(n<0||!(a>0)||!this.ready)return;const i=Math.max(this.x,Math.floor((e-a)/this.cell)),l=Math.min(this.x+this.size-1,Math.floor((e+a)/this.cell)),c=Math.max(this.z,Math.floor((o-a)/this.cell)),d=Math.min(this.z+this.size-1,Math.floor((o+a)/this.cell));for(let f=c;f<=d;f++)for(let g=i;g<=l;g++){const p=Math.hypot((g+.5)*this.cell-e,(f+.5)*this.cell-o),v=Math.max(0,1-p/a)*Math.min(1,Math.max(0,r))*255,u=this.index(g,f)+n,h=this.values[u];this.values[u]=Math.max(h,v),this.values[u]!==h&&(h===0&&this.values[u]>0&&this.ink++,this.dirty=!0)}}publish(){if(!this.dirty)return!1;this.work.publishValues+=this.data.length,this.publishedActive=!1;for(let e=0;e<this.data.length;e++)this.data[e]=Math.round(this.values[e]),this.data[e]&&(this.publishedActive=!0);return this.dirty=!1,!0}at(e,o,a){const s=Math.floor(e/this.cell),r=Math.floor(o/this.cell);return s<this.x||s>=this.x+this.size||r<this.z||r>=this.z+this.size?0:this.values[this.index(s,r)+Qa.indexOf(a)]/255}reset(){(this.ink||this.publishedActive)&&(this.values.fill(0),this.data.fill(0),this.work.clearValues+=this.values.length+this.data.length,this.dirty=!0),this.ink=0,this.publishedActive=!1,this.ready=!1}}const to=()=>{const t=Dt(new _t(new Uint8Array(q.fieldSize**2*4),q.fieldSize,q.fieldSize),"fx");return t.minFilter=t.magFilter=he,t.wrapS=t.wrapT=As,t.generateMipmaps=!1,t.needsUpdate=!0,t},se={uFxField:{value:to()},uFxExtra:{value:to()},uFxBox:{value:new W(0,0,q.fieldMetres,q.fieldSize)},uFxOn:{value:0},uFxTime:{value:0},uFxCalm:{value:0},uFxVertex:{value:1}},ts=`
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
`;function _l(t,e=!1){return t.asleep?.18:t.leashed||t.friendly||t.state==="happy"?.28:e||t.charge||t.leap?1:t.enraged||t.state==="enraged"?.8:.42}const an={uThermalStrength:{value:0},uThermalColdBrightness:{value:.35},uThermalDangerGain:{value:1}},on=`
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
`;function Hl(t){return 1/(t.artPixelsPerMetre*(2/t.pixelSize))}function sn(t){const e=t.treeNormals;if(e===!1||e==="0"||e===0)return-1;const o=typeof e=="string"&&/^\d+$/.test(e)?Number(e):0;return o>=1&&o<=255?o:0}const Nl=t=>sn(t)<0?0:1,Pe={...an,uPotionSky:{value:0},uPoolReadability:{value:new URLSearchParams(globalThis.location?.search??"").get("poolreadability")==="1"?1:0},uMoodRim:{value:new W},uRimInset:{value:0},uWitchGlow:{value:0},uWitchLift:{value:0},uRight:{value:new J(1,0,0)},uUp:{value:new J(0,1,0)},uFacing:{value:new J(0,0,1)},uTopFade:{value:0},uCutout:{value:new W(0,0,0,1)},uCutWhole:{value:0},uCutShape:{value:new W(0,.35,0,.2)},uDebugCull:{value:0},uRes:{value:new Z(1,1)},uWitch:{value:new W(0,0,0,0)},uWitchDepth:{value:0},uOcc:{value:new W(.38,6,2.5,1)},uNearCut:{value:0},uCircleBox:{value:new W(0,0,0,0)},uCircleFade:{value:new W(0,0,1,1)},uEdgeDither:{value:0},uHoleHard:{value:0},uCircleKeep:{value:new W(0,0,0,0)},uWholeCull:{value:typeof location<"u"&&new URLSearchParams(location.search).get("wholecull")==="0"?0:1},uParty:{value:Array.from({length:16},()=>new W)},uPartyCol:{value:Array.from({length:16},()=>new J)},uPartyCount:{value:0},uUplight:{value:new W},uTrunkFade:{value:new J(0,.125,.3)},uFindLook:{value:new W},uEyeRgb:{value:new J(1,.8,.35)},uEyeRange:{value:40},uTrunkLook:{value:new Z(.8,.5)},uAreaAvg:{value:1},uSeeDepth:{value:1},uSeeDbg:{value:new W(1,0,1,0)},uCullByPass:{value:new URLSearchParams(globalThis.location?.search??"").get("cullpass")==="0"?0:1},uCullDbg:{value:7},uSeeEarly:{value:1},uSeeTwo:{value:1},uSeeDither:{value:0},uSeeShowA:{value:0},uSeeSolid:{value:0},uDebugTrunks:{value:0},uWind:{value:new W(0,0,1,0)},uLeafJitter:{value:new J(0,0,0)},uTreeNormals:{value:1},uWatch:{value:new W(0,0,9,0)}},Xe=`
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
${xa}
${cr}${Fa}${sr}
${ts}
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
`,rn=`
${li()}
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
${on}
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
${Ma}
${ts}
varying vec2 vFxBase;
varying vec4 vFxPaint;
varying vec2 vFxInfo;
${pi}
${di}
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
`,Ze=rn.replace("void main() {","void spriteMain() {")+`
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
`,nn=-.5;function Wl(t){for(const e of t.meshes)e.renderOrder=nn,e.material.depthWrite=!1;return t}const aa=[],oa=[],ln={value:new W(1,.85,.35,0)};class Ul{constructor(e,o,a={}){this.atlas=e,this.metresPerPixel=o;const s=new ba(1,1);s.translate(0,.5,0),this.geo=new xo,this.geo.index=s.index,this.geo.setAttribute("position",s.getAttribute("position")),this.geo.setAttribute("uv",s.getAttribute("uv")),this.pos=this.size=this.uvs=this.flags=this.glow=void 0,this.grow(64);const r=c=>({...Q,...Pe,...He,...me,...ci(e),uUnlit:{value:a.unlit?1:0},uIsScenery:{value:a.scenery?1:0},uAppear:this.appearU,uArrivalFade:this.arrivalFade,uFadePass:{value:0},uHasFade:{value:a.fade?1:0},uFlat:{value:a.flat||a.solid?1:0},uLies:{value:a.flat?1:0},...ga,uSilhouette:{value:new W(0,0,0,0)},uWitchLight:hi(a.witchLight),uWitchHush:{value:0},uFind:{value:a.find?1:0},uRimOn:{value:a.rim?1:0},uTint:a.tint??{value:new W(0,0,0,0)},uShadow:a.shadow?ln:{value:new W(0,0,0,0)},uLegend:{value:a.legend??new W(0,0,0,0)},uSteps:{value:a.steps??0},uLegendFloor:{value:a.legendFloor??0},uLegendAwake:{value:a.legendAwake??0},uGlowGain:a.glowGain??{value:1},uAbsolute:{value:a.absolute?1:0},uLie:{value:a.lie??0},uLean:this.leanU,...c}),n=a.scenery?{blending:ya,blendSrc:Rs,blendDst:Es}:{},i=a.scenery?{stencilWrite:!0,stencilRef:1,stencilFunc:Oa,stencilZPass:Da}:a.unmark?{stencilWrite:!0,stencilRef:0,stencilFunc:Oa,stencilZPass:Da}:{},l=new ne({vertexShader:Xe,fragmentShader:Ze,defines:a.spotSpill?{MUSHROOM_SPOT_SPILL:1}:{},uniforms:r({}),depthTest:!a.onTop,depthWrite:!a.onTop&&!a.shadow,...n,...i,...a.shadow?{transparent:!0}:{}});if(this.mesh=new ve(this.geo,l),this.mesh.frustumCulled=!1,a.onTop&&(this.mesh.renderOrder=10),a.scenery&&(this.mesh.renderOrder=.5),this.meshes=[this.mesh],a.fade){const c=new ve(this.geo,new ne({vertexShader:Xe,fragmentShader:Ze,uniforms:r({uFadePass:{value:1}}),transparent:!0,depthWrite:!1})),d=new ve(this.geo,new ne({vertexShader:Xe,fragmentShader:Ze,uniforms:r({uFadePass:{value:3}}),transparent:!0,depthWrite:!0}));d.frustumCulled=!1,d.renderOrder=10.9,c.frustumCulled=!1,c.renderOrder=11,a.scenery&&Object.assign(c.material,i,{stencilWrite:!1}),aa.push(c.material),oa.push(c);const f=new ve(this.geo,new ne({vertexShader:Xe,fragmentShader:Ze,uniforms:r({uFadePass:{value:2}}),transparent:!0,colorWrite:!1,depthWrite:!0}));f.frustumCulled=!1,f.renderOrder=19.9,typeof location<"u"&&new URLSearchParams(location.search).get("seedepth")==="off"&&(f.material.depthWrite=!1),this.meshes.push(c,f,d)}if(a.silhouette){const c=a.silhouette.colour,d=new ve(this.geo,new ne({vertexShader:Xe,fragmentShader:Ze,uniforms:r({uSilhouette:{value:new W(c.x,c.y,c.z,a.silhouette.opacity)}}),transparent:!0,depthWrite:!1,depthFunc:Gs}));d.frustumCulled=!1,d.renderOrder=12,this.meshes.push(d),this.sil=d}for(const c of this.meshes)Object.assign(c.material.uniforms,se)}atlas;metresPerPixel;mesh;meshes;geo;pos;size;uvs;flags;glow;jitter;capacity=0;dirty=[new ae,new ae,new ae,new ae,new ae,new ae];count=0;name(e){return this.meshes.forEach((o,a)=>{o.name=a===0?e:`${e} (${a===1&&this.meshes.length>1&&o!==this.sil?"see-through":"silhouette"})`}),this}setAtlas(e){this.atlas=e;for(const o of this.meshes)ui(o.material.uniforms,e)}sil=null;set silhouette(e){this.sil&&(this.sil.visible=e)}set silhouetteColour(e){const o=this.sil&&this.sil.material.uniforms.uSilhouette.value;o&&o.set(e.x,e.y,e.z,o.w)}set silhouetteOpacity(e){const o=this.sil&&this.sil.material.uniforms.uSilhouette.value;o&&(o.w=e)}grow(e){const o=Math.max(e,this.capacity*2);this.geo.dispose();const a=(s,r)=>{const n=new ko(new Float32Array(o*s),s);return n.setUsage(So),r&&n.array.set(r.array),n};this.pos=a(3,this.pos),this.size=a(3,this.size),this.uvs=a(4,this.uvs),this.flags=a(4,this.flags),this.glow=a(1,this.glow),this.jitter=a(3,this.jitter),this.geo.setAttribute("iPos",this.pos),this.geo.setAttribute("iSize",this.size),this.geo.setAttribute("iUv",this.uvs),this.geo.setAttribute("iFlags",this.flags),this.geo.setAttribute("iGlow",this.glow),this.geo.setAttribute("iJitter",this.jitter),this.capacity=o}leanU={value:new W};appearU={value:1};arrivalFade={value:1};items=[];set(e){this.items=e,e.length>this.capacity&&this.grow(e.length);const o=this.pos.array,a=this.size.array,s=this.uvs.array,r=this.flags.array,n=this.glow.array,i=this.jitter.array,l=this.dirty[0],c=this.dirty[1],d=this.dirty[2],f=this.dirty[3],g=this.dirty[4],p=this.dirty[5],v=this.metresPerPixel;for(let b=0,w=e.length;b<w;b++){const m=e[b],y=m.frame,k=y.uv,z=m.scale??1;let x=b*3;(o[x]!==m.x||o[x+1]!==m.y||o[x+2]!==m.z)&&(o[x]=m.x,o[x+1]=m.y,o[x+2]=m.z,l.touch(b));const C=(m.sx===void 0?y.w:Math.max(1,Math.round(y.w*m.sx)))*v*z,M=(m.sy===void 0?y.h:Math.max(1,Math.round(y.h*m.sy)))*v*z,A=(m.foot??(m.top?0:y.foot??0))*v*z*(m.sx??1);x=b*3,(a[x]!==C||a[x+1]!==M||a[x+2]!==A)&&(a[x]=C,a[x+1]=M,a[x+2]=A,c.touch(b)),x=b*4,(s[x]!==k[0]||s[x+1]!==k[1]||s[x+2]!==k[2]||s[x+3]!==k[3])&&(s[x]=k[0],s[x+1]=k[1],s[x+2]=k[2],s[x+3]=k[3],d.touch(b));const N=m.flip?1:0,O=m.top?1:m.cut?-m.cut:0,_=(m.fresh?1:0)+(m.small?2:0)+(m.tree?4:0),T=(y.masked?-1:1)*(m.sway??0);(r[x]!==N||r[x+1]!==O||r[x+2]!==_||r[x+3]!==T)&&(r[x]=N,r[x+1]=O,r[x+2]=_,r[x+3]=T,f.touch(b));const D=m.glow??0;n[b]!==D&&(n[b]=D,g.touch(b));const S=m.jitter,E=S?S[0]:0,G=S?S[1]:0,U=m.heat??0;x=b*3,(i[x]!==E||i[x+1]!==G||i[x+2]!==U)&&(i[x]=E,i[x+1]=G,i[x+2]=U,p.touch(b))}l.flush(this.pos),c.flush(this.size),d.flush(this.uvs),f.flush(this.flags),g.flush(this.glow),p.flush(this.jitter),this.count=e.length,this.geo.instanceCount=e.length;const u=this.meshes,h=e.length>0;for(let b=0;b<u.length;b++)u[b].visible=h}get dropped(){const e=this.geo._maxInstanceCount;return e===void 0||!this.mesh.visible?0:Math.max(0,this.count-e)}release(){this.geo.dispose();for(const e of this.meshes){e.material.dispose();const o=oa.indexOf(e);o>=0&&(oa.splice(o,1),aa.splice(aa.indexOf(e.material),1))}}dispose(){this.release(),this.atlas.albedo.dispose(),this.atlas.normal.dispose()}}const Il=[.91,.71,.42],$l=[.85,.47,.62],ql=[[.91,.71,.42],[.82,.52,.28],[.91,.71,.42]],Bl=1.4,ao=32,_e=16,as=_e*_e-1,cn=as-1,jl=(t,e,o=.8)=>Math.min(1,Math.max(0,(t-e)/o)),un=3,Kl=10,Vl=t=>t.level>=un,Jl=`
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
${xa}
${Fa}
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
}`,Yl=`
uniform sampler2D uGlyphs, uGlyphsPal;
uniform float uGlyphIdx; // 1: uGlyphs is an index plane, its colours in uGlyphsPal (render/palette.ts; the attack look's atlas)
uniform float uSolid;
uniform float uRgb; // the texture's own colours, times the instance's (the attack look's atlas: render/leash/attackLook.ts); else its colour alone
varying vec2 vUv, vP;
varying vec4 vCol;
varying float vDraw, vShine;
varying vec3 vWorld;
varying float vPix, vN;
${Ma}
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
    vec2 q = (floor((vP + 0.5) * ${ao}.0) + 0.5) / ${ao}.0;
    if (abs((q.x + q.y) * 0.5 - (vShine - 2.0)) < 0.13) rgb = mix(rgb, vec3(1.0), 0.9);
  }
  // Written on: revealed clockwise from the top as vDraw goes 0 to 1.
  float ang = fract(atan(vP.x, vP.y) / 6.2831853 + 1.0);
  if (ang > vDraw || a < 0.02) discard;
#ifdef MASK
  gl_FragColor = vec4(a); return; // (its coverage alone, for the tilt-shift's sharp mask: maskOf)
#endif
  gl_FragColor = uSolid > 0.5 ? vec4(haze(rgb, vWorld), a) : vec4(haze(rgb * a, vWorld), 1.0); // (solid: dust and bits, blended, not glowing)
}`;function Xl(t){return new ne({vertexShader:t.vertexShader,fragmentShader:t.fragmentShader,uniforms:t.uniforms,defines:{MASK:""},transparent:!0,depthWrite:!1,depthTest:!1,blending:ya,blendEquation:_a,blendEquationAlpha:_a})}const hn=["iPos","iSize","iUv","iCol","iDraw","iShine"];function dn(t){const e=o=>t[0]===o%_e/_e&&t[1]===1-Math.floor(o/_e)/_e;return!(t[0]===0&&t[1]===1)&&!e(as)&&!e(cn)}class oo{mesh;glyphGain=1;geo=new xo;cap=0;n=0;dirty=[new ae,new ae,new ae,new ae,new ae,new ae];pos;size;uv;col;draw;shine;constructor(e){const o=new ba(1,1);this.geo.index=o.index,this.geo.setAttribute("position",o.getAttribute("position")),this.geo.setAttribute("uv",o.getAttribute("uv")),this.grow(256),this.mesh=new ve(this.geo,e),this.mesh.frustumCulled=!1,this.mesh.renderOrder=3}grow(e){const o=(s,r)=>{const n=new Float32Array(e*r);return s&&n.set(s),n};this.pos=o(this.pos,3),this.size=o(this.size,1),this.uv=o(this.uv,4),this.col=o(this.col,4),this.draw=o(this.draw,1),this.shine=o(this.shine,1),this.cap=e,this.geo.dispose();const a=(s,r,n)=>this.geo.setAttribute(s,new ko(r,n).setUsage(So));a("iPos",this.pos,3),a("iSize",this.size,1),a("iUv",this.uv,4),a("iCol",this.col,4),a("iDraw",this.draw,1),a("iShine",this.shine,1)}begin(){this.n=0}add(e,o,a,s,r,n,i,l,c,d=1,f=!1,g=0){this.n>=this.cap&&this.grow(this.cap*2),this.glyphGain!==1&&dn(r)&&(n*=this.glyphGain,i*=this.glyphGain,l*=this.glyphGain);const p=this.n++,v=this.pos,u=this.uv,h=this.col,b=this.dirty,w=d+(f?2:0);let m=p*3;(v[m]!==e||v[m+1]!==o||v[m+2]!==a)&&(v[m]=e,v[m+1]=o,v[m+2]=a,b[0].touch(p)),this.size[p]!==s&&(this.size[p]=s,b[1].touch(p)),m=p*4,(u[m]!==r[0]||u[m+1]!==r[1]||u[m+2]!==r[2]||u[m+3]!==r[3])&&(u[m]=r[0],u[m+1]=r[1],u[m+2]=r[2],u[m+3]=r[3],b[2].touch(p)),(h[m]!==n||h[m+1]!==i||h[m+2]!==l||h[m+3]!==c)&&(h[m]=n,h[m+1]=i,h[m+2]=l,h[m+3]=c,b[3].touch(p)),this.draw[p]!==w&&(this.draw[p]=w,b[4].touch(p)),this.shine[p]!==g&&(this.shine[p]=g,b[5].touch(p))}end(){this.geo.instanceCount=this.n,hn.forEach((e,o)=>this.dirty[o].flush(this.geo.getAttribute(e)))}}const Fe={reduceFlashing:!1},K=[{id:"full",label:"full quality",when:"live",built:!0},{id:"farDither",label:"the forest's far edge dithered, not faded",when:"live",built:!0},{id:"density90",label:"trees ×0.9",when:"load",built:!0},{id:"blend40",label:"area borders blend over 40 m",when:"load",built:!1},{id:"squeeze",label:"tall trees squeezed",when:"live",built:!0},{id:"still",label:"leaves still, no trunk shadows",when:"live",built:!0},{id:"hardCut",label:"the cut-away's crowns solid",when:"live",built:!0},{id:"fxDistort",label:"magic shimmer off",when:"live",built:!0},{id:"fxImprints",label:"temporary magic scenery marks off",when:"live",built:!0},{id:"fxSecondary",label:"magic secondary detail off",when:"live",built:!0},{id:"fxLights",label:"at most two magic lights",when:"live",built:!0},{id:"fxParticles",label:"half the magic particles",when:"live",built:!0},{id:"density80",label:"trees ×0.8",when:"load",built:!0},{id:"cap30",label:"a steady 30 fps",when:"live",built:!0},{id:"px4",label:"chunkier pixels (px 4)",when:"load",built:!0}];function fn(t){const e=o=>{const a=K.findIndex(s=>s.id===o);return K[a].built&&a<=t};return{density:e("density80")?.8:e("density90")?.9:1,blend:e("blend40")?40:null,px:e("px4")?4:null}}const os={over:.9,under:.7,downAfter:3,upAfter:10,settle:2,flips:3,flipWindow:60,fit:.85,retry:60,retryMax:480,missed:1.25,kept:1.1},sa=(t=0,e="auto")=>{const o=$t(t);return{rung:o,loaded:o,mode:e,slow:0,roomy:0,since:0,last:-1/0,dir:0,reversals:[],locked:!1,cost:K.map(()=>NaN),left:K.map(()=>0),leftAt:K.map(()=>NaN),t:0}},$t=t=>Math.max(0,Math.min(K.length-1,Math.round(Number.isFinite(t)?t:0)));function At(t,e){const o=K[e];return!o?.built||e===0?!1:o.when==="live"?e<=t.rung:e<=t.loaded}function pn(t){const e=[],o=[];return K.forEach((a,s)=>{a.when!=="load"||!a.built||(s<=t.rung&&s>t.loaded&&e.push(s),s>t.rung&&s<=t.loaded&&o.push(s))}),{adds:e,drops:o}}function gn(t){for(let e=t.rung+1;e<K.length;e++)if(K[e].built&&K[e].when==="live")return e;for(let e=K.length-1;e>t.rung;e--)if(K[e].built)return e;return-1}function mn(t){for(let e=t.rung;e>0;e--)if(K[e].built&&K[e].when==="live")return e-1;return t.rung>0?0:-1}function vn(t,e,o,a=1,s=!1,r=os,n=!0){const i={...t,t:t.t+a,since:t.since+a,cost:t.cost.slice(),reversals:t.reversals.filter(d=>t.t+a-d<=r.flipWindow)};if(i.mode!=="auto")return i;if(s)return{...i,since:0,slow:0};if(!(e>0)||!(o>0)||i.since<=r.settle)return i;const l=i.cost[i.rung];i.cost[i.rung]=Number.isFinite(l)?l+(e-l)*.3:e,i.slow=e>o*(n?r.over:r.missed)?i.slow+1:0,i.roomy=e<o*(n?r.under:r.kept)?i.roomy+a:0;const c=(d,f)=>{i.dir&&f!==i.dir&&i.t-i.last<=r.flipWindow&&i.reversals.push(i.t);const g=i.locked||i.reversals.length>=r.flips,p=i.left.slice(),v=i.leftAt.slice();return f<0&&(p[i.rung]++,v[i.rung]=i.t),{...i,rung:d,dir:f,last:i.t,since:0,slow:0,roomy:0,locked:g,left:p,leftAt:v}};if(i.slow>=r.downAfter){const d=gn(i);if(d>=0)return c(d,-1);i.slow=0}else if(i.roomy>=r.upAfter&&!i.locked){const d=mn(i);if(d>=0){const f=i.cost[d];if(!Number.isFinite(f)||f<o*r.fit||i.t-i.leftAt[d]>=bn(i,d,r))return c(d,1);i.roomy=0}}return i}const bn=(t,e,o=os)=>Math.min(o.retryMax,o.retry*2**Math.max(0,(t.left[e]??0)-1));function rt(t,e,o=t.rung){const a=e==="off"?0:$t(o);return{...t,mode:e,rung:a,since:0,slow:0,roomy:0,locked:e==="auto"?!1:t.locked,reversals:e==="auto"?[]:t.reversals}}const so=`
uniform vec3 uRight,uUp;
uniform float uFlat,uMpp;uniform vec2 uRes;
attribute vec3 iPos; attribute float iSize,iDraw,iShine; attribute vec4 iUv,iCol;
varying vec2 vP; varying vec4 vData,vCol; varying vec3 vWorld;varying vec2 vGrid;
${xa}
${Fa}
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
}`,ro=`
uniform sampler2D uFxRamp;uniform float uFxTime,uLayer,uCalm,uSecondary,uDistort,uGlow;uniform vec2 uHalo;uniform vec4 uSpellGlow;
varying vec2 vP;varying vec4 vData,vCol;varying vec3 vWorld;varying vec2 vGrid;
${Ma}
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
    bool detail=uSecondary>0.5 && strength>${q.secondaryAt} && abs(sin(angle*4.0+time+r*9.0))<0.08 && r>0.45 && r<0.8;
    if(!detail && (spark<0.985-strength*0.012 || r>0.95))discard;
    rgb=detail?texelFetch(uFxRamp,ivec2(4,int(vData.y+0.5)),0).rgb:ramp(2.0).rgb;a=0.65;
  }
  if(form>10.5)a*=smoothstep(-1.0,0.7,p.x);
  a*=vCol.a;if(a<0.01)discard;
  gl_FragColor=vec4(haze(rgb*vCol.rgb,vWorld),a);
}`,wn={blending:ya,blendEquation:Hs,blendSrc:_s,blendDst:Na,blendSrcAlpha:Os,blendDstAlpha:Na},yn=2.6,io=t=>1.45*(1+.15*Math.max(0,t-1));function xn(t,e){const o=t===8,a=o?0:Math.floor(t/4),s=o?2:t%4;return e!==void 0?e+(o?.009:a?s*.001:.004+s*.001):o?11.2:a?2.9+s*.01:2.8+s*.01}class kn{layers=[];time={value:0};calm={value:0};secondary={value:1};distort={value:1};mpp={value:.09375};spellGlow={value:new W(0,0,0,yn)};count=0;canopy=!1;constructor(e,o={}){const a=new Uint8Array(5*ue.length*4);ue.forEach((r,n)=>{const i=ke[r];[...i.ramp,i.contrast].forEach((l,c)=>{const d=parseInt(l.slice(1),16),f=(n*5+c)*4;a.set([d>>16,d>>8&255,d&255,i.motion],f)})});const s=Dt(new _t(a,5,ue.length),"fx");s.minFilter=s.magFilter=he,s.needsUpdate=!0;for(let r=0;r<9;r++){const n=r===8,i=n?0:Math.floor(r/4),l=n?2:r%4,c=new ne({vertexShader:so,fragmentShader:ro,uniforms:{...Q,...He,uRight:Pe.uRight,uUp:Pe.uUp,uRes:Pe.uRes,uMpp:this.mpp,uHalo:{value:new Z(...q.halo)},uFxRamp:{value:s},uFlat:{value:i},uLayer:{value:l},uFxTime:this.time,uCalm:this.calm,uSecondary:this.secondary,uDistort:this.distort,uGlow:{value:o.glow?1:0}},transparent:!0,depthWrite:!1,depthTest:!n,blending:l>=2||o.glow?Ha:Ds}),d=new oo(c);d.mesh.name=`${o.name??"Magic"} ${n?"canopy halo":`${i?"ground":"upright"} layer ${l}`}`,d.mesh.renderOrder=xn(r,o.order),e.add(d.mesh),this.layers.push(d)}if(!o.glow)for(const r of[0,1]){const n=new ne({vertexShader:so,fragmentShader:ro,uniforms:{...Q,...He,uRight:Pe.uRight,uUp:Pe.uUp,uRes:Pe.uRes,uMpp:this.mpp,uHalo:{value:new Z(...q.halo)},uFxRamp:{value:s},uFlat:{value:r},uLayer:{value:4+r},uFxTime:this.time,uCalm:this.calm,uSecondary:this.secondary,uDistort:this.distort,uGlow:{value:0},uSpellGlow:this.spellGlow},transparent:!0,depthWrite:!1,depthTest:!0,...r?wn:{blending:Ha}}),i=new oo(n);i.mesh.name=`${o.name??"Magic"} spell glow ${r?"pool":"core"}`,i.mesh.renderOrder=o.order!==void 0?o.order+(r?-5e-4:.0045):r?2.895:2.84,i.mesh.visible=!1,e.add(i.mesh),this.layers.push(i)}}begin(e,o){this.time.value=e,this.calm.value=o?1:0,this.count=0;for(const a of this.layers)a.begin()}add(e,o,a,s,r,n,i,l=null,c=!0,d=1,f=0){const g=io(d);for(let p=0;p<(c?4:3);p++){if(p!==1){if(this.count>=q.instances)continue;this.count++}this.layers[(i?4:0)+p].add(e,o,a,s*(p===0?1.12:p===2?g:1),r,l?.[0]??1,l?.[1]??1,l?.[2]??1,p===2?n*d:n,1,!1,f)}!i&&this.canopy&&this.secondary.value>.5&&this.count<q.instances&&(this.count++,this.layers[8].add(e,o,a,s*1.5,r,l?.[0]??1,l?.[1]??1,l?.[2]??1,n*.12*d))}beam(e,o,a,s,r,n,i,l,c,d=1){const f=io(d);for(let g=0;g<4;g++){if(g!==1){if(this.count>=q.instances)continue;this.count++}this.layers[g].add(e,o,a,n*(g===0?1.12:g===2?f:1),i,c?.[0]??1,c?.[1]??1,c?.[2]??1,g===2?l*d:l,-s,!1,r)}this.canopy&&this.secondary.value>.5&&this.count<q.instances&&(this.count++,this.layers[8].add(e,o,a,n*1.5,i,c?.[0]??1,c?.[1]??1,c?.[2]??1,l*.12*d,-s,!1,r))}glowAt(e,o,a,s,r,n,i){this.count>=q.instances||!this.layers[9]||(this.count++,this.layers[9].add(e,o,a,s*this.spellGlow.value.w,r,i?.[0]??1,i?.[1]??1,i?.[2]??1,n,1,!1,0))}poolAt(e,o,a,s,r,n){this.count>=q.instances||!this.layers[10]||(this.count++,this.layers[10].add(e,0,o,a,s,n?.[0]??1,n?.[1]??1,n?.[2]??1,r,1,!1,0))}glowLine(e,o,a,s,r,n,i,l,c,d){this.count>=q.instances||!this.layers[10]||(this.count++,this.layers[d?10:9].add(e,d?0:o,a,n*(d?1:this.spellGlow.value.w),i,c?.[0]??1,c?.[1]??1,c?.[2]??1,l,-s,!1,r))}end(){for(const e of this.layers)e.end();for(const e of[9,10])this.layers[e]&&(this.layers[e].mesh.visible=this.layers[e].mesh.geometry.instanceCount>0)}}const Sn={element:"party",form:"beam",intensity:.45,preserveHue:!0,light:.12,anchor:.08},zn={element:"party",form:"beam",intensity:.65,preserveHue:!0,light:.08,anchor:.04},Mn={element:"party",form:"projectile",intensity:.25,preserveHue:!0,light:.04,anchor:.02},Fn={element:"moonlight",form:"aura",intensity:.45,preserveHue:!0,light:0,anchor:.06},Cn={element:"water",form:"aura",intensity:.25,preserveHue:!0,light:.05,anchor:.02},Pn={element:"moonlight",form:"pillar",intensity:.65,preserveHue:!0,light:0,anchor:0},Ln={element:"party",form:"beam",intensity:.65,preserveHue:!0,light:.14,anchor:.08},Tn={element:"moonlight",form:"dome",intensity:.65,preserveHue:!0,light:0,anchor:0},An={element:"water",form:"zone",intensity:.45,preserveHue:!0,light:0,anchor:0},En={element:"party",form:"burst",intensity:1,preserveHue:!0,light:0,anchor:0},Rn={element:"moonlight",form:"aura",intensity:.45,preserveHue:!0,light:0,anchor:0},ss={flightTrail:Sn,partySwoop:zn,broomSpark:Mn,sigil:Fn,ringDot:Cn,runestone:Pn,ley:Ln,hologram:Tn,lake:An,firework:En,decorativeGlow:Rn},rs={value:1};function Gn(t){const e=ss[t],o=ke[e.element];return{uNativeOn:rs,uNativeRamp:{value:o.ramp.map(a=>new J((parseInt(a.slice(1),16)>>16)/255,(parseInt(a.slice(1),16)>>8&255)/255,(parseInt(a.slice(1),16)&255)/255))},uNativeStyle:{value:new Z(e.intensity,e.preserveHue?1:0)}}}const Dn=`
uniform float uNativeOn;uniform vec3 uNativeRamp[4];uniform vec2 uNativeStyle;
vec3 nativeFxColour(vec3 c){
  if(uNativeOn<0.5)return c;
  float l=max(c.r,max(c.g,c.b));if(l<0.00001)return c;
  vec3 band=l<0.2?uNativeRamp[0]:l<0.45?uNativeRamp[1]:l<0.75?uNativeRamp[2]:uNativeRamp[3];
  if(uNativeStyle.y>0.5)band=c/l*max(band.r,max(band.g,band.b));
  // Retain the native form's falloff and authored hue; quantise its light toward the family's ramp.
  return mix(c,band*min(1.0,l*1.2),0.18*uNativeStyle.x);
}`;function Zl(t,e){t.traverse(o=>{const a=o.material;for(const s of Array.isArray(a)?a:[a]){if(!(s instanceof ne)||s.userData.nativeFx)return;/void\s+main\s*\(/.test(s.fragmentShader)&&(s.fragmentShader=Dn+s.fragmentShader.replace(/void\s+main\s*\(/,"void nativeMain(")+`
void main(){nativeMain();gl_FragColor.rgb=nativeFxColour(gl_FragColor.rgb);}
`,Object.assign(s.uniforms,Gn(e)),s.userData.nativeFx=e,s.needsUpdate=!0)}})}const On={shakeCap:.18,seconds:.5,minimumIntensity:.85},Ce={screen:On},_n=.5,Hn=6,no={on:new URLSearchParams(globalThis.location?.search??"").get("spellglow")!=="0"},Qe=(t,e,o)=>Number.isFinite(t)?Math.max(e,Math.min(o,t)):e;function Ql(t,e,o){if(!e||!t)return null;const a=o?_n:1,s={core:Qe(t.core,0,4)*a,halo:Qe(t.halo,0,4)*a,pool:Qe(t.pool,0,4)*a,lights:Math.round(Qe(t.lights,0,Hn)),light:Qe(t.light,0,4)*a};return s.core+s.halo+s.pool+s.light>0?s:null}function Nn(t,e,o){const a=t.map((n,i)=>i).sort((n,i)=>lo(t[i])-lo(t[n])||n-i),s=[];let r=0;for(const n of a){if(s.length>=e)break;if(t[n].spell){if(r>=o)continue;r++}s.push(n)}return s}const lo=t=>t.score*(t.held?1.35:1);function Wn(t,e,o){const a=e-t;if(Math.abs(a)<=1e-6)return e;const s=Math.max(1,Math.abs(a))*Math.max(0,o);return Math.abs(a)<=s?e:t+Math.sign(a)*s}const X={distortion:!0,imprints:!0,secondary:!0,lightCap:q.lightCap,particles:1},co=new WeakMap;let uo=null;const Un={width:1,alpha:.6,life:1,glow:1},In=t=>Math.max(0,Math.min(1.5,1+(t-1)*.5));function e0(t){let e=co.get(t);return e||(e=new $n(t),co.set(t,e)),e}class $n{constructor(e,o=Xs){this.patternLook=o,this.batches=new kn(e)}patternLook;quality=X;fieldUniforms=se;batches;field=new tn;stats={lights:0,requests:0,instances:0,fieldBytes:q.fieldSize**2*8,fieldCopyValues:0};enabled=new URLSearchParams(globalThis.location?.search??"").get("magic")!=="old";get spellGlow(){return no.on}set spellGlow(e){no.on=e}galleryPage=0;galleryElement=null;galleryTime=null;captureTime=null;galleryDark=!1;galleryCamera=null;galleryVisible=!0;galleryLegacyVisible=!0;legacyParty=null;panel=null;hidden=[];background=null;lights=new Map;bursts=[];data=[0,0,0,0];selected=[];room=0;spellCap=0;owner=null;time=0;dt=0;cx=0;cz=0;screenAt=-1/0;screenStrength=0;screenSeconds=Ce.screen.seconds;screenCap=Ce.screen.shakeCap;begin(e,o,a,s){e=this.captureTime??e,(this.owner!==s||e<this.time)&&(this.reset(),this.owner=s,this.time=e),this.dt=Math.max(0,e-this.time),this.time=e,this.cx=o,this.cz=a,rs.value=this.enabled?1:0,this.field.move(o,a),this.field.decay(this.dt),this.batches.begin(e,Fe.reduceFlashing),this.batches.secondary.value=X.secondary?1:0,this.batches.distort.value=X.distortion&&!Fe.reduceFlashing?1:0,se.uFxOn.value=this.enabled&&X.imprints?1:0,se.uFxTime.value=e,se.uFxCalm.value=Fe.reduceFlashing?1:0,this.stats.instances=0,this.spellCap=0}reset(){this.field.reset(),this.lights.clear(),this.room=0,this.bursts.length=0,this.screen(),this.screenAt=-1/0,this.screenStrength=0}get screenKick(){if(!this.enabled||Fe.reduceFlashing)return 0;const e=Math.max(0,(this.time-this.screenAt)/this.screenSeconds);return e>=1?0:Math.min(this.screenCap,this.screenStrength)*(1-e)**2}screen(e=Ce.screen.shakeCap,o=Ce.screen.seconds,a=Ce.screen.shakeCap){this.screenAt=this.time,this.screenStrength=e,this.screenSeconds=Math.max(.01,o),this.screenCap=a}kick(e,o){this.screen(Math.max(0,e),o,.5)}lamp(e,o,a,s,r,n,i){if(!this.enabled||!(i>.001)||!(n>0))return;let l=this.lights.get(e);if(!l){if(this.lights.size>=q.pool)return;l={x:o,y:a,z:s,reach:0,rgb:new J,strength:0,target:0,seen:this.time,score:0,fade:0,slot:0,spell:!1},this.lights.set(e,l)}l.x=o,l.y=a,l.z=s,l.reach=n,l.rgb.set(r[0],r[1],r[2]),l.target=i*(Fe.reduceFlashing?.5:1),l.seen=this.time}draw(e,o,a,s,r,n,i=1,l=1,c=0,d=0,f=null,g=Je(n),p=1,v=null,u=!0){if(!this.enabled||!(l>.01)||Math.hypot(a-this.cx,r-this.cz)>140)return;const h=Me(e),b=ke[h],w=te[o],m=this.batches.mpp.value,y=Math.max(m,Math.round(w.size*i*Ye(q.size,g)/m)*m);if(g>=Ce.screen.minimumIntensity&&(o==="burst"||o==="eruption")&&c<.15&&this.screen(Ce.screen.shakeCap*l),this.data[0]=w.id,this.data[1]=ue.indexOf(h),this.data[2]=g,this.data[3]=c,this.batches.add(a,s,r,y,this.data,l,w.ground,f,X.particles>.5||(d&1)===0,p),this.stats.instances++,w.ground||(this.data[0]=te.zone.id,this.batches.add(a,0,r,Math.min(y*.75,12),this.data,l*.18*p,!0,f,!1)),v){this.glowLook(v),this.glowData(w.id,h,g,c,f);const k=o==="burst"||o==="eruption";!w.ground&&v.core+v.halo>0&&this.batches.glowAt(a,s,r,y*(k?.26:.62),this.data,l*(k?.8:1),f),v.pool>0&&this.batches.poolAt(a,r,w.ground?y*1.15:Math.max(2.4,y*(k?1:1.9)),this.data,l*(w.ground?.6:Math.max(.35,1-s/14)),f)}u&&(!v||v.light>0)&&this.light(`${h}:${o}:${d}`,a,s,r,h,g,l,f,p,v?v.light:0),X.imprints&&(o==="burst"||o==="zone"||o==="eruption"||o==="beam"||o==="projectile"||o==="vortex"||o==="pillar")&&this.field.stamp(a,r,Math.max(2,Math.min(18,y*.6)),b.imprint,g*l*(o==="projectile"?.25:1))}emit(e,o,a,s,r,n,i=1,l=1.2,c=0){this.bursts.length>=q.pool&&this.bursts.shift(),this.bursts.push({element:e,form:o,x:a,y:s,z:r,level:n,size:i,at:this.time,life:l,seed:c}),n>=3&&i>=1&&this.screen()}native(e,o,a,s,r=1,n=0,i=null){if(!this.enabled||r<=.01||Math.hypot(o-this.cx,s-this.cz)>80)return;const l=ss[e],c=Me(l.element);l.light>0&&this.light(`native:${e}:${n}`,o,a,s,c,l.intensity,Math.min(1,r)*l.light,i),l.anchor>0&&(this.data[0]=te.zone.id,this.data[1]=ue.indexOf(c),this.data[2]=l.intensity,this.data[3]=0,this.batches.add(o,0,s,Math.min(5,te[l.form].size*1.5),this.data,l.anchor*Math.min(1,r),!0,i,!1))}beam(e,o,a,s,r,n,i,l,c,d,f=null,g=Je(l),p=1,v=null){const u=Math.hypot(s-o,r-a);if(!this.enabled||u<.01||c<=.01)return;const h=Me(e),b=(o+s)/2,w=(a+r)/2;if(Math.hypot(b-this.cx,w-this.cz)>140+u/2)return;this.data[0]=te.beam.id,this.data[1]=ue.indexOf(h),this.data[2]=g,this.data[3]=this.time%1;const m=Math.abs(r-a)/u,y=Math.atan2(r-a,s-o),k=Math.max(i,this.batches.mpp.value*3)*(1+m*.35);this.batches.beam(b,n,w,u,y,k,this.data,c,f,p),v&&(this.glowLook(v),this.glowData(te.beam.id,h,g,this.data[3],f),v.core+v.halo>0&&this.batches.glowLine(b,n,w,u,y,k*.7,this.data,c,f,!1),v.pool>0&&this.batches.glowLine(b,0,w,u,y,k*2.6,this.data,c*.8,f,!0));const z=Math.min(8,Math.max(1,Math.ceil(u/4))),x=Math.round(z/2);for(let C=0;C<=z;C++){const M=o+(s-o)*C/z,A=a+(r-a)*C/z;v?(C===x||C===z)&&v.light>0&&this.light(`${h}:beam:${d}:${C}`,M,n,A,h,g,c,f,p,v.light):this.light(`${h}:beam:${d}:${C}`,M,n,A,h,g,c,f,p),X.imprints&&this.field.stamp(M,A,Math.max(2,i*1.5),ke[h].imprint,g*c)}this.stats.instances++}ribbon(e,o,a,s,r,n,i,l,c,d=null,f=Je(l),g=Un,p=null){const v=Math.hypot(r,i);if(!this.enabled||v<.1)return;const u=Math.min(.32,8/v)*g.life,h=v*u,b=Me(e);this.data[0]=te.trail.id,this.data[1]=ue.indexOf(b),this.data[2]=f,this.data[3]=n*u,this.batches.beam(o-r*u/2,a-n*u/2,s-i*u/2,h,Math.atan2(i,r),.55*g.width*Ye(q.size,f),this.data,g.alpha,d,g.glow),p&&p.core+p.halo>0&&(this.glowLook(p),this.glowData(te.trail.id,b,f,this.data[3],d),this.batches.glowLine(o-r*u/2,a-n*u/2,s-i*u/2,h,Math.atan2(i,r),.3*g.width*Ye(q.size,f),this.data,g.alpha*.55,d,!1)),X.imprints&&(c&3)===0&&this.field.stamp(o-r*u,s-i*u,2,ke[b].imprint,.15*f)}glowPool(e,o,a,s,r,n,i,l,c,d=!0,f=Je(r)){if(!this.enabled||!(n>.01)||Math.hypot(o-this.cx,a-this.cz)>140)return;const g=Me(e);this.glowLook(c),this.glowData(te.zone.id,g,f,0,l),c.pool>0&&this.batches.poolAt(o,a,s,this.data,n,l),d&&c.light>0&&this.light(`${g}:pool:${i}`,o,.6,a,g,f,n,l,1,c.light)}glowBurst(e,o,a,s,r,n,i,l,c,d,f=Je(n)){if(!this.enabled||!(i>.01)||Math.hypot(o-this.cx,s-this.cz)>140)return;const g=Me(e);this.glowLook(d),this.glowData(te.burst.id,g,f,0,c),d.core+d.halo>0&&this.batches.glowAt(o,a,s,r,this.data,i,c),d.pool>0&&this.batches.poolAt(o,s,r*2.4,this.data,i,c),d.light>0&&this.light(`${g}:blow:${l}`,o,a,s,g,f,i,c,1,d.light)}glowLook(e){this.batches.spellGlow.value.set(e.core,e.halo,e.pool,this.batches.spellGlow.value.w),this.spellCap=Math.max(this.spellCap,e.lights)}glowData(e,o,a,s,r){this.data[0]=e,this.data[1]=ue.indexOf(o)+(r?100:0),this.data[2]=a,this.data[3]=s}light(e,o,a,s,r,n,i,l,c=1,d=0){let f=this.lights.get(e);if(!f){if(this.lights.size>=q.pool){const p=ta(o,s,n*i,this.cx,this.cz);let v="",u=1/0;for(const[h,b]of this.lights){const w=ta(b.x,b.z,b.target,this.cx,this.cz);w<u&&(v=h,u=w)}if(p<=u)return;this.lights.delete(v)}f={x:o,y:a,z:s,reach:0,rgb:new J,strength:0,target:0,seen:this.time,score:0,fade:0,slot:0,spell:d>0},this.lights.set(e,f)}f.spell=d>0;const g=parseInt(ke[r].ramp[1].slice(1),16);f.x=o,f.y=a,f.z=s,f.reach=Ye(q.lightReach,n),f.rgb.set(l?.[0]??(g>>16)/255,l?.[1]??(g>>8&255)/255,l?.[2]??(g&255)/255),f.target=Ye(q.lightStrength,n)*Math.min(1,i)*In(c)*(d>0?d:Fe.reduceFlashing?.5:1),f.seen=this.time,f.pattern=e.startsWith("moonlight:aura:")}finish(e){let o=0;for(const a of this.bursts){const s=this.time-a.at;if(s<0||s>=a.life)continue;this.bursts[o++]=a;const r=s/a.life,n=Math.min(1,s/.2,(a.life-s)/.3);this.draw(a.element,a.form,a.x,a.y,a.z,a.level,a.size,n,r,a.seed)}if(this.bursts.length=o,this.batches.end(),this.field.publish()||uo!==this.field){const a=se.uFxField.value.image.data,s=se.uFxExtra.value.image.data;this.stats.fieldCopyValues+=this.field.data.length;for(let r=0,n=0;r<this.field.data.length;r+=8,n+=4)for(let i=0;i<4;i++)a[n+i]=this.field.data[r+i],s[n+i]=this.field.data[r+i+4];se.uFxField.value.needsUpdate=!0,se.uFxExtra.value.needsUpdate=!0,uo=this.field}se.uFxOn.value=this.field.active&&this.enabled&&X.imprints?1:0,se.uFxBox.value.set(this.field.x*this.field.cell,this.field.z*this.field.cell,this.field.metres,this.field.size),this.applyLights(e)}applyLights(e){this.selected.length=0;for(const[v,u]of this.lights){const h=this.enabled&&u.seen===this.time,b=this.dt/q.lightEase;if(u.fade=Math.max(0,Math.min(1,u.fade+(h?b:-b))),u.strength=u.target*u.fade,!h&&u.fade<.001){this.lights.delete(v);continue}u.score=ta(u.x,u.z,u.strength,this.cx,this.cz),Math.hypot(u.x-this.cx,u.z-this.cz)<u.reach+30?this.selected.push(u):u.slot=0}this.enabled||(this.selected.length=0);const o=Q,a=Math.max(0,Math.min(be,Math.floor(e))),s=this.dt/q.lightEase,r=Math.min(X.lightCap,q.lightCap,a),n=Nn(this.selected.map(v=>({score:v.score,spell:v.spell,held:v.slot>0})),r,this.spellCap),i=Math.min(o.uLightCount.value,a),l=a-i;this.room=Math.min(i,Wn(this.room,Math.max(0,n.length-l),s));const c=Math.floor(this.room+1e-6),d=this.room-c,f=i-c;d>1e-6&&f>0&&(o.uLightCol.value[f-1].w*=1-d);const g=Math.min(n.length,a-f);Qs(f);for(const v of this.selected)v.score=-1;let p=!1;for(let v=0;v<g;v++){const u=this.selected[n[v]];u.score=0,u.slot=Math.min(1,u.slot+s),o.uLightPos.value[f+v].set(u.x,Ns(u.x,u.z)+u.y,u.z,u.reach),o.uLightCol.value[f+v].set(u.rgb.x,u.rgb.y,u.rgb.z,u.strength*u.slot);const b=u.pattern&&!p&&this.patternLook!=="off"?Uo("rings",this.time,Fe.reduceFlashing):void 0;$o(f+v,b),b&&(p=!0)}for(const v of this.selected)v.score<0&&(v.slot=0);o.uLightCount.value=f+g,this.stats.lights=g,this.stats.requests=this.lights.size}gallery(e,o,a,s){if(this.galleryPanel(e),!this.galleryVisible)return;const r=(this.galleryTime??s)%4/4;if(this.galleryPage===3){const i=this.galleryElement??e;this.beam(i,o-13,a,o-3,a,1.5,1.4,2,.8,880001),this.beam(i,o+8,a-5,o+8,a+5,1.5,1.4,2,.8,880002);return}eo.slice(this.galleryPage*4,this.galleryPage*4+4).forEach((i,l)=>[.25,.6,1].forEach((c,d)=>{const f=o+(l-1.5)*10,g=a+(d-1)*12;if(i==="beam"){this.beam(this.galleryElement??e,f-3,g,f+3,g,1.5,1.4,2,.8,l*3+d,null,c);return}if(i==="trail"){this.ribbon(this.galleryElement??e,f+3,2,g,20,0,0,2,l*3+d,null,c);return}this.draw(this.galleryElement??e,i,f,te[i].ground?0:i==="pillar"?5:2,g,2,1,.7,r,l*3+d,null,c)}))}galleryPanel(e){if(this.panel||typeof document>"u")return;const o=this.panel=document.createElement("aside");o.style.cssText="position:fixed;left:12px;top:12px;z-index:20000;background:#15131eee;color:#fff;padding:12px;font:14px monospace;max-width:420px";const a=document.createElement("div");a.textContent="Magic gallery · rows far → near: 0.25 / 0.6 / 1",o.append(a);const s=document.createElement("select");s.setAttribute("aria-label","Magic element");for(const f of ue){const g=document.createElement("option");g.value=g.textContent=f,s.append(g)}s.value=Me(e),s.onchange=()=>{this.galleryElement=s.value},o.append(s);const r=document.createElement("select");r.setAttribute("aria-label","Magic forms");for(let f=0;f<3;f++){const g=document.createElement("option");g.value=String(f),g.textContent=eo.slice(f*4,f*4+4).join(" / "),r.append(g)}const n=document.createElement("option");n.value="3",n.textContent="Equal E–W / N–S beams",r.append(n),r.onchange=()=>{this.galleryPage=Number(r.value)},o.append(r);const i=(f,g)=>{const p=document.createElement("button");return p.textContent=f,p.onclick=g,o.append(p),p},l=i("Pause",()=>{this.galleryTime=this.galleryTime===null?this.time:null,l.textContent=this.galleryTime===null?"Pause":"Play"}),c=i("Dark ground",()=>{this.galleryDark=!this.galleryDark,c.textContent=this.galleryDark?"Forest ground":"Dark ground"}),d=i("Treetop camera",()=>{this.galleryCamera=!this.galleryCamera,d.textContent=this.galleryCamera?"Ground camera":"Treetop camera"});document.body.append(o)}hideBackdrop(e){if(this.galleryDark){this.background=e.background,e.background=new wa("#15131e"),this.hidden=e.children.filter(o=>!o.name.startsWith("Magic ")).map(o=>({object:o,visible:o.visible}));for(const o of this.hidden)o.object.visible=!1}}restoreBackdrop(e){if(this.hidden.length){for(const o of this.hidden)o.object.visible=o.visible;this.hidden.length=0,e.background=this.background}}}const ra=new WeakMap;function qn(t){if(ra.has(t))return ra.get(t);const e=t.getExtension("WEBGL_debug_renderer_info"),o=t.getParameter(e?e.UNMASKED_RENDERER_WEBGL:t.RENDERER);return o!=null&&ra.set(t,o),o}const ho=1e3/60,fo=1e3/30,Bn=.35,is="witch.ladder";class t0{mutate=(e,o)=>o();state;ms=NaN;timed=!1;key;bases=new WeakMap;applied="";win={t0:NaN,frames:[],skip:!1};constructor(e,o){this.key=`${is}:${e.slice(0,120)}`,this.state=ns(o,ls(this.key)),this.sync()}get cap30(){return At(this.state,K.findIndex(e=>e.id==="cap30"))}frame(e,o,a,s,r){const n=this.win;if(Number.isNaN(n.t0)&&(n.t0=e),a||o>250?n.skip=!0:o>0&&n.frames.push(o),e-n.t0>=1e3){const i=(e-n.t0)/1e3,l=n.frames.length,c=r.length?mo(r.slice(-Math.max(1,Math.min(l,r.length)))):NaN;this.timed=Number.isFinite(c),this.ms=this.timed?c:mo(n.frames);const d=this.state.rung;this.state=vn(this.state,this.ms,this.cap30?fo:ho,i,n.skip||l<5,void 0,this.timed),this.state.rung!==d&&this.state.mode==="auto"&&this.save(),this.sync(),n.t0=e,n.frames=[],n.skip=!1}this.apply(s)}apply(e){let o=this.bases.get(e);if(!o){const r=cs.get(e);r!==void 0&&(this.state={...this.state,loaded:r}),o={keep:e.treeCap.keep,wind:e.wind.on,trunks:e.shadows.trunks?.mode??"off",edge:!!e.scenery.edgeDither,hard:!!e.canopyCutout.hard},this.bases.set(e,o),this.applied=""}const a=r=>At(this.state,K.findIndex(n=>n.id===r)),s=K.map((r,n)=>At(this.state,n)?1:0).join("");s!==this.applied&&(this.applied=s,this.mutate("automatic quality tuning",()=>{X.distortion=!a("fxDistort"),X.imprints=!a("fxImprints"),X.secondary=!a("fxSecondary"),X.lightCap=a("fxLights")?2:6,X.particles=a("fxParticles")?.5:1,go(e.scenery,"edgeDither",a("farDither")||o.edge),go(e.canopyCutout,"hard",a("hardCut")||o.hard),e.treeCap.keep=a("squeeze")?Math.min(o.keep,Bn):o.keep,e.wind.on=a("still")?!1:o.wind,e.shadows.trunks&&(e.shadows.trunks.mode=a("still")?"off":o.trunks)}))}lines(){const e=this.state,o=K[e.rung],a=K.length-1,r=[`${e.mode==="off"?"off (full quality)":e.mode==="pinned"?`pinned at ${e.rung}`:e.locked?"auto, holding (it kept flipping)":"auto"}: rung ${e.rung} of ${a}, ${o.label}`];Number.isFinite(this.ms)&&r.push(`${this.timed?"GPU":"frame"} ${this.ms.toFixed(1)} ms a frame, budget ${(this.cap30?fo:ho).toFixed(1)}`);const n=K.filter((l,c)=>At(e,c)).map(l=>l.label);n.length&&r.push(`in effect: ${n.join("; ")}`);const i=pn(e);return i.adds.length&&r.push(`from the next load: ${i.adds.map(l=>K[l].label).join("; ")}`),i.drops.length&&r.push(`back from the next load: ${i.drops.map(l=>K[l].label).join("; ")}`),r}options(){return[{value:"auto",label:"Auto"},{value:"off",label:"Off (full quality)"},...K.slice(1).map((e,o)=>({value:String(o+1),label:`${o+1}: ${e.label}${e.built?"":" (not built yet)"}`}))]}current(){return this.state.mode==="auto"?"auto":this.state.mode==="off"?"off":String(this.state.rung)}choose(e){this.state=e==="auto"?rt(this.state,"auto"):e==="off"?rt(this.state,"off"):rt(this.state,"pinned",Number(e)),e==="auto"&&this.save(),this.sync()}sync(){tt=this.state.mode==="off"?0:this.state.rung}save(){try{Fo()?.setItem(this.key,JSON.stringify({rung:this.state.rung,at:Date.now()}))}catch{}}}function ns(t,e){const o=t.get("ladder"),a=o!==null&&o!==""&&Number.isFinite(Number(o)),s=typeof navigator<"u"&&navigator.webdriver===!0;return o==="off"||s&&o!=="auto"&&!a?rt(sa(0),"off"):a?rt(sa($t(Number(o))),"pinned"):sa(e)}function ls(t){try{const e=JSON.parse(Fo()?.getItem(t)??"null");return $t(Number(e?.rung??0))}catch{return 0}}let tt=null,Et;const cs=new WeakMap;function us(t,e=new Set){tt===null&&(tt=(()=>{const a=ns(po(),ls(`${is}:${jn().slice(0,120)}`));return a.mode==="off"?0:a.rung})());const o=fn(tt);Et===void 0&&(Et=po().has("px")?null:o.px),o.density!==1&&!e.has("treeDensity")&&(t.treeDensity*=o.density),o.blend!==null&&!e.has("areaEdgeBlend.width")&&(t.areaEdgeBlend.width=Math.min(t.areaEdgeBlend.width,o.blend)),Et&&(t.pixelSize=Et),cs.set(t,tt)}const po=()=>new URLSearchParams(typeof location<"u"?location.search:"");function jn(){try{const t=document.createElement("canvas").getContext("webgl2");if(!t)return"unknown";const e=Kn(t);return t.getExtension("WEBGL_lose_context")?.loseContext(),e}catch{return"unknown"}}function Kn(t){try{return String(qn(t))}catch{return"unknown"}}function go(t,e,o){o?t[e]=!0:delete t[e]}function mo(t){if(!t.length)return NaN;const e=[...t].sort((o,a)=>o-a);return e[Math.floor(e.length/2)]}const Vn="witch-mapprep",ma="prep",Jn="next",Yn=()=>new Promise(t=>{if(Co()){t(null);return}try{const e=indexedDB.open(Vn,1);e.onupgradeneeded=()=>e.result.createObjectStore(ma),e.onsuccess=()=>t(e.result),e.onerror=e.onblocked=()=>t(null)}catch{t(null)}});async function Xn(){const t=await Yn();return t?new Promise(e=>{try{const o=t.transaction(ma,"readonly").objectStore(ma).get(Jn);o.onsuccess=()=>{t.close(),e(o.result??null)},o.onerror=()=>{t.close(),e(null)}}catch{t.close(),e(null)}}):null}const Zn="v7953 · 968b405",La=(t,e)=>`${Zn}|${t}|${Us(JSON.stringify(e))}`;function hs(t,e,o){const a=new URLSearchParams({island:t,seed:String(o),...e!=null?{world:String(e)}:{},arrive:"1"}),{tuning:s}=zo(a);return Ro(s,void 0,new Set),us(s),_o(ka(),s),s}let Le="none",Te=0,Ae=0;const at=(t,e=0)=>{try{performance.mark("witch:map-prep-source",{detail:{seed:t,status:Le,workerMs:Te,hydrateMs:Ae,checkMs:e}})}catch{}};function va(t,e,o){const a=performance.now();if(Le="none",Te=0,Ae=0,!t)return at(e),null;if(t.key!==La(e,o))return Le="stale",at(e,performance.now()-a),t.key.split("|")[1]===String(e)&&t.tuning&&console.info("map prep: another tuning's",Object.keys(o).filter(r=>JSON.stringify(o[r])!==JSON.stringify(t.tuning[r]))),null;const s=Ss(t.prep);return s?(Le="unsound",at(e,performance.now()-a),console.warn("map prep: unsound, made afresh:",s),null):(zs(t.arch),Le="worker",Te=t.ms,at(e,performance.now()-a),t.prep)}function Qn(t,e,o){const a=performance.now();if(o)try{const s=xs(t,e,o);Ae=performance.now()-a;try{performance.mark("witch:map-hydrated",{detail:{seed:t,ms:Ae,workerMs:Te}})}catch{}return Te>0&&Ae>Te&&console.warn(`map prep: hydrate ${Math.round(Ae)} ms, slower than making it (${Math.round(Te)} ms in the worker)`),s}catch(s){Le="failed",at(t),console.warn("map prep: hydrate failed, made afresh:",s)}return ks(t,e)}async function el(t,e,o=1500){return va(typeof indexedDB>"u"?null:await Promise.race([Xn(),new Promise(a=>setTimeout(()=>a(null),o))]),t,e)}function ds(t,e,o,a=!0){let s=null,r=()=>{};const n=new Promise(i=>{r=i});try{if(typeof Worker>"u")return r(null),{done:n,stop(){}};s=new Worker(new URL(""+new URL("mapPrep.worker-BQaHXbEG.js",import.meta.url).href,import.meta.url),{type:"module"}),s.onmessage=i=>{r(i.data.rec??i.data.ok),s?.terminate(),s=null},s.onerror=()=>{r(null),s?.terminate(),s=null},Ws(s,{key:La(t,e),seed:t,tuning:e,send:o,noKeep:!a||Co()},"map-prep",t)}catch{r(null)}return{done:n,stop(){s?.terminate(),s=null,r(null)}}}function tl(t,e,o,a=!1){return ds(o,hs(t,e,o),a)}function al(t,e,o=1e4){try{const{tuning:a}=zo(e),s=new Set((e.get("set")??"").split(";").map(i=>i.split("=")[0]).filter(Boolean));Ro(a,void 0,s),us(a,s),_o(ka(),a);const r=ds(t,a,!0,!1),n=setTimeout(()=>r.stop(),o);return r.done.then(i=>(clearTimeout(n),i&&typeof i=="object"?i:null))}catch{return Promise.resolve(null)}}const a0=Object.freeze(Object.defineProperty({__proto__:null,get hydrateMs(){return Ae},prepKey:La,get prepUsed(){return Le},readyMap:Qn,sailTuning:hs,startBootMapPrep:al,startMapPrep:tl,takeMapPrep:el,useReadyMap:va},Symbol.toStringTag,{value:"Module"}));export{no as $,ke as A,Sl as B,Al as C,Dl as D,ue as E,se as F,be as G,$o as H,si as I,ci as J,fi as K,Q as L,Fl as M,Dn as N,li as O,Fa as P,ae as Q,Hl as R,Pe as S,an as T,Zl as U,kl as V,Wl as W,e0 as X,El as Y,oo as Z,Ql as _,Ro as a,Me as a0,eo as a1,Bl as a2,Yl as a3,Jl as a4,Xs as a5,Uo as a6,wl as a7,jl as a8,as as a9,pl as aA,gl as aB,Bs as aC,K as aD,us as aE,hl as aF,el as aG,va as aH,Qn as aI,dl as aJ,fl as aK,al as aL,t0 as aM,Kn as aN,Tl as aO,Ae as aP,Le as aQ,Gt as aR,ul as aS,ml as aT,a0 as aU,cn as aa,Il as ab,Xl as ac,Kl as ad,$l as ae,Vl as af,un as ag,ql as ah,_l as ai,ln as aj,aa as ak,oa as al,Nl as am,sn as an,bl as ao,xl as ap,or as aq,Ll as ar,cr as as,hr as at,ui as au,vl as av,ua as aw,Ol as ax,yl as ay,qn as az,_o as b,ka as c,Ml as d,ur as e,Jt as f,ni as g,ao as h,_e as i,Fe as j,Ul as k,Gl as l,Rl as m,zl as n,Pl as o,Cl as p,Ma as q,ts as r,on as s,Gn as t,kn as u,xn as v,X as w,te as x,Ye as y,q as z};
