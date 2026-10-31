import{ai as Ne,aD as Go,cU as Uo,cV as _o,cW as Yo,cX as Wo}from"./finds-DrjDuO6r.js";import{V as C,f as _,v as j,K as xt,a0 as to,P as Mt,r as de,l as re,c1 as Pt,a2 as oo,I as ao,ar as ro,ae as je,N as se,aa as dt,c2 as Dt,af as so,c3 as Ko,c4 as $o,a8 as St,y as qo,D as Qe,R as io,ab as no,k as lo,j as Xe,ac as zt,J as ze,ad as jo,aC as Ht,aD as Bt,an as Jo,a4 as Vo,au as Xo,A as Zo,x as Qo,u as ea,aj as ta}from"./chartView--slb0Czz.js";import{n as oa,G as uo}from"./linkParams-Nm6CPHkk.js";import{b as ho,a as co,c as fo}from"./settings-CuKT6mh0.js";import"./generator-Nqq88M7W.js";import{h as ee,a as o,b as S,M as At,r as aa,S as ra,e as sa}from"./witch-C4DZWSsN.js";const Ee={reduceFlashing:!1},P=[{id:"full",label:"full quality",when:"live",built:!0},{id:"farDither",label:"the forest's far edge dithered, not faded",when:"live",built:!0},{id:"density90",label:"trees ×0.9",when:"load",built:!0},{id:"blend40",label:"area borders blend over 40 m",when:"load",built:!1},{id:"squeeze",label:"tall trees squeezed",when:"live",built:!0},{id:"still",label:"leaves still, no trunk shadows",when:"live",built:!0},{id:"hardCut",label:"the cut-away's crowns solid",when:"live",built:!0},{id:"fxDistort",label:"magic shimmer off",when:"live",built:!0},{id:"fxImprints",label:"temporary magic scenery marks off",when:"live",built:!0},{id:"fxSecondary",label:"magic secondary detail off",when:"live",built:!0},{id:"fxLights",label:"at most two magic lights",when:"live",built:!0},{id:"fxParticles",label:"half the magic particles",when:"live",built:!0},{id:"density80",label:"trees ×0.8",when:"load",built:!0},{id:"cap30",label:"a steady 30 fps",when:"live",built:!0},{id:"px4",label:"chunkier pixels (px 4)",when:"load",built:!0}];function ia(e){const t=r=>{const l=P.findIndex(i=>i.id===r);return P[l].built&&l<=e};return{density:t("density80")?.8:t("density90")?.9:1,blend:t("blend40")?40:null,px:t("px4")?4:null}}const go={over:.9,under:.7,downAfter:3,upAfter:10,settle:2,flips:3,flipWindow:60,fit:.85,retry:60,retryMax:480,missed:1.25,kept:1.1},at=(e=0,t="auto")=>{const r=et(e);return{rung:r,loaded:r,mode:t,slow:0,roomy:0,since:0,last:-1/0,dir:0,reversals:[],locked:!1,cost:P.map(()=>NaN),left:P.map(()=>0),leftAt:P.map(()=>NaN),t:0}},et=e=>Math.max(0,Math.min(P.length-1,Math.round(Number.isFinite(e)?e:0)));function Ge(e,t){const r=P[t];return!r?.built||t===0?!1:r.when==="live"?t<=e.rung:t<=e.loaded}function na(e){const t=[],r=[];return P.forEach((l,i)=>{l.when!=="load"||!l.built||(i<=e.rung&&i>e.loaded&&t.push(i),i>e.rung&&i<=e.loaded&&r.push(i))}),{adds:t,drops:r}}function la(e){for(let t=e.rung+1;t<P.length;t++)if(P[t].built&&P[t].when==="live")return t;for(let t=P.length-1;t>e.rung;t--)if(P[t].built)return t;return-1}function ua(e){for(let t=e.rung;t>0;t--)if(P[t].built&&P[t].when==="live")return t-1;return e.rung>0?0:-1}function ha(e,t,r,l=1,i=!1,s=go,a=!0){const n={...e,t:e.t+l,since:e.since+l,cost:e.cost.slice(),reversals:e.reversals.filter(d=>e.t+l-d<=s.flipWindow)};if(n.mode!=="auto")return n;if(i)return{...n,since:0,slow:0};if(!(t>0)||!(r>0)||n.since<=s.settle)return n;const u=n.cost[n.rung];n.cost[n.rung]=Number.isFinite(u)?u+(t-u)*.3:t,n.slow=t>r*(a?s.over:s.missed)?n.slow+1:0,n.roomy=t<r*(a?s.under:s.kept)?n.roomy+l:0;const h=(d,c)=>{n.dir&&c!==n.dir&&n.t-n.last<=s.flipWindow&&n.reversals.push(n.t);const f=n.locked||n.reversals.length>=s.flips,v=n.left.slice(),m=n.leftAt.slice();return c<0&&(v[n.rung]++,m[n.rung]=n.t),{...n,rung:d,dir:c,last:n.t,since:0,slow:0,roomy:0,locked:f,left:v,leftAt:m}};if(n.slow>=s.downAfter){const d=la(n);if(d>=0)return h(d,-1);n.slow=0}else if(n.roomy>=s.upAfter&&!n.locked){const d=ua(n);if(d>=0){const c=n.cost[d];if(!Number.isFinite(c)||c<r*s.fit||n.t-n.leftAt[d]>=ca(n,d,s))return h(d,1);n.roomy=0}}return n}const ca=(e,t,r=go)=>Math.min(r.retryMax,r.retry*2**Math.max(0,(e.left[t]??0)-1));function He(e,t,r=e.rung){const l=t==="off"?0:et(r);return{...e,mode:t,rung:l,since:0,slow:0,roomy:0,locked:t==="auto"?!1:e.locked,reversals:t==="auto"?[]:e.reversals}}const oi=`
float hash(vec2 p) { p = fract(p * vec2(123.34, 456.21)); p += dot(p, p + 45.32); return fract(p.x * p.y); }
float vnoise(vec2 p) {
  vec2 i = floor(p), f = fract(p), u = f * f * (3.0 - 2.0 * f);
  float a = hash(i), b = hash(i + vec2(1, 0)), c = hash(i + vec2(0, 1)), d = hash(i + vec2(1, 1));
  return a + (b - a) * u.x + (c - a) * u.y + (a - b - c + d) * u.x * u.y;
}
`,ai=`
float bayer2(vec2 a) { a = floor(a); return fract(a.x / 2.0 + a.y * a.y * 0.75); }
float bayer4(vec2 a) { return bayer2(0.5 * a) * 0.25 + bayer2(a); }
`,da=`
float windGust(vec2 q) {
  vec2 i = floor(q), f = fract(q), e = f * f * (3.0 - 2.0 * f);
  float h00 = fract(sin(dot(i, vec2(127.1, 311.7))) * 43758.5453), h10 = fract(sin(dot(i + vec2(1, 0), vec2(127.1, 311.7))) * 43758.5453);
  float h01 = fract(sin(dot(i + vec2(0, 1), vec2(127.1, 311.7))) * 43758.5453), h11 = fract(sin(dot(i + vec2(1, 1), vec2(127.1, 311.7))) * 43758.5453);
  return mix(mix(h00, h10, e.x), mix(h01, h11, e.x), e.y);
}
`,Et=`
vec2 pixelSnap(vec4 b) {
  vec2 ndc = b.xy / b.w, snapped = (floor((ndc * 0.5 + 0.5) * uRes) + 0.5) / uRes * 2.0 - 1.0;
  return snapped - ndc;
}
`,we=24,ft=4,V={uAmb:{value:new _},uUnlitDim:{value:1},uMoon:{value:new _},uMoonDir:{value:new _(-.45,.75,.5).normalize()},uMoonBeam:{value:new _},uMoonUp:{value:new C},uShafts:{value:.3},uShaftScale:{value:1},uGlowPos:{value:new _},uGlowRgb:{value:new _},uGlowR:{value:8},uGlowFalloff:{value:2.5},uGlowNear:{value:1},uGlowPower:{value:1.4},uGlowDim:{value:1},uHazeCentre:{value:new j},uHazeRange:{value:new j(70,200)},uHazeColour:{value:new _},uTime:{value:0},uLightPos:{value:Array.from({length:we},()=>new C)},uLightCol:{value:Array.from({length:we},()=>new C)},uLightCount:{value:0},uLightKnee:{value:new j(.9,1.1)},uGlade:{value:Array.from({length:ft},()=>new C)},uGladeCount:{value:0},uGladeRgb:{value:new _},uGladeLight:{value:new j},uDim:{value:1},uSlow:{value:new C},uSlowKeep:{value:new C},uRealTime:{value:0},uDisco:{value:new C},uDiscoParams:{value:new C},uDiscoColour:{value:new _(1,1,1)},uScenery:{value:new j(1e6,1)},uCanopyReach:{value:0},uPartyOver:{value:new C(0,0,0,30)}},fa=.95,ga=.55,pa=.16;function ri(e,t,r,l=1,i=2.5,s=1){const a=(n,u)=>new _(n[0]/255*u,n[1]/255*u,n[2]/255*u);V.uAmb.value.copy(a(ee(e.ambientHue,.55,1),e.ambient*l)),V.uMoon.value.copy(a(ee(e.moonHue,e.moonSat??.35,1),e.moon*s)),V.uMoonBeam.value.copy(a(ee(e.moonHue,.35,1),e.shafts*.25)),V.uShafts.value=e.shafts,V.uShaftScale.value=r*2,V.uGlowRgb.value.copy(a(ee(e.glowHue,e.glowSat,1),1)),V.uGlowR.value=t,V.uGlowFalloff.value=i,V.uGlowPower.value=e.glowPower,V.uHazeColour.value.copy(a(ee(e.ambientHue-.08,.55,1),.16*Math.sqrt(l)))}const Lt=`
uniform vec3 uAmb, uMoon, uMoonDir, uMoonBeam, uGlowPos, uGlowRgb;
uniform float uUnlitDim;
uniform vec4 uMoonUp;
uniform float uShafts, uShaftScale, uGlowR, uGlowFalloff, uGlowNear, uGlowPower, uGlowDim, uTime;
uniform vec2 uHazeCentre, uHazeRange;
uniform vec3 uHazeColour;
uniform vec4 uLightPos[${we}], uLightCol[${we}];
uniform vec4 uGlade[${ft}];
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
uniform vec4 uDisco, uDiscoParams;
uniform vec3 uDiscoColour;
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
  for (int i = 0; i < ${ft}; i++) {
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
  for (int i = 0; i < ${we}; i++) {
    if (i >= uLightCount) break;
    vec3 lv = uLightPos[i].xyz - P;
    float ld = length(lv), reach = uLightPos[i].w;
    if (ld >= reach) continue;
    float ndl = max(0.0, dot(N, lv / max(ld, 1e-4))) * 0.7 + 0.3;
    float fall = 1.0 - ld / reach;
    l += uLightCol[i].rgb * min(1.0, ndl * fall * fall * uLightCol[i].w);
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
  vec3 warm = max(min(dot(col, Y), ${ga.toFixed(3)}), ${pa.toFixed(3)} * fall) * uGlowRgb / max(1e-3, dot(uGlowRgb, Y));
  return mix(col, min(vec3(1.0), warm), ${fa.toFixed(2)} * fall);
}
`;class X{lo=1/0;hi=-1;range={start:0,count:0};touch(t){t<this.lo&&(this.lo=t),t>this.hi&&(this.hi=t)}flush(t){if(this.hi>=this.lo){const r=t.itemSize,l=this.range,i=t.updateRanges[0];let s=this.lo*r,a=(this.hi+1)*r;i&&(s=Math.min(i.start,s),a=Math.max(i.start+i.count,a),t.clearUpdateRanges()),l.start=s,l.count=a-s,t.updateRanges.push(l),t.needsUpdate=!0}this.lo=1/0,this.hi=-1}}const si=[.91,.71,.42],ii=[.85,.47,.62],ni=[[.91,.71,.42],[.82,.52,.28],[.91,.71,.42]],li=1.4,It=32,Ae=16,po=Ae*Ae-1,va=po-1,ui=(e,t,r=.8)=>Math.min(1,Math.max(0,(e-t)/r)),ma=3,hi=10,ci=e=>e.level>=ma,di=`
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
${xt}
${Et}
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
}`,fi=`
uniform sampler2D uGlyphs, uGlyphsPal;
uniform float uGlyphIdx; // 1: uGlyphs is an index plane, its colours in uGlyphsPal (render/palette.ts; the attack look's atlas)
uniform float uSolid;
uniform float uRgb; // the texture's own colours, times the instance's (the attack look's atlas: render/leash/attackLook.ts); else its colour alone
varying vec2 vUv, vP;
varying vec4 vCol;
varying float vDraw, vShine;
varying vec3 vWorld;
varying float vPix, vN;
${Lt}
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
    vec2 q = (floor((vP + 0.5) * ${It}.0) + 0.5) / ${It}.0;
    if (abs((q.x + q.y) * 0.5 - (vShine - 2.0)) < 0.13) rgb = mix(rgb, vec3(1.0), 0.9);
  }
  // Written on: revealed clockwise from the top as vDraw goes 0 to 1.
  float ang = fract(atan(vP.x, vP.y) / 6.2831853 + 1.0);
  if (ang > vDraw || a < 0.02) discard;
#ifdef MASK
  gl_FragColor = vec4(a); return; // (its coverage alone, for the tilt-shift's sharp mask: maskOf)
#endif
  gl_FragColor = uSolid > 0.5 ? vec4(haze(rgb, vWorld), a) : vec4(haze(rgb * a, vWorld), 1.0); // (solid: dust and bits, blended, not glowing)
}`;function gi(e){return new re({vertexShader:e.vertexShader,fragmentShader:e.fragmentShader,uniforms:e.uniforms,defines:{MASK:""},transparent:!0,depthWrite:!1,depthTest:!1,blending:oo,blendEquation:Pt,blendEquationAlpha:Pt})}const ba=["iPos","iSize","iUv","iCol","iDraw","iShine"];function wa(e){const t=r=>e[0]===r%Ae/Ae&&e[1]===1-Math.floor(r/Ae)/Ae;return!(e[0]===0&&e[1]===1)&&!t(po)&&!t(va)}class ya{mesh;glyphGain=1;geo=new to;cap=0;n=0;dirty=[new X,new X,new X,new X,new X,new X];pos;size;uv;col;draw;shine;constructor(t){const r=new Mt(1,1);this.geo.index=r.index,this.geo.setAttribute("position",r.getAttribute("position")),this.geo.setAttribute("uv",r.getAttribute("uv")),this.grow(256),this.mesh=new de(this.geo,t),this.mesh.frustumCulled=!1,this.mesh.renderOrder=3}grow(t){const r=(i,s)=>{const a=new Float32Array(t*s);return i&&a.set(i),a};this.pos=r(this.pos,3),this.size=r(this.size,1),this.uv=r(this.uv,4),this.col=r(this.col,4),this.draw=r(this.draw,1),this.shine=r(this.shine,1),this.cap=t,this.geo.dispose();const l=(i,s,a)=>this.geo.setAttribute(i,new ao(s,a).setUsage(ro));l("iPos",this.pos,3),l("iSize",this.size,1),l("iUv",this.uv,4),l("iCol",this.col,4),l("iDraw",this.draw,1),l("iShine",this.shine,1)}begin(){this.n=0}add(t,r,l,i,s,a,n,u,h,d=1,c=!1,f=0){this.n>=this.cap&&this.grow(this.cap*2),this.glyphGain!==1&&wa(s)&&(a*=this.glyphGain,n*=this.glyphGain,u*=this.glyphGain);const v=this.n++,m=this.pos,g=this.uv,p=this.col,b=this.dirty,y=d+(c?2:0);let w=v*3;(m[w]!==t||m[w+1]!==r||m[w+2]!==l)&&(m[w]=t,m[w+1]=r,m[w+2]=l,b[0].touch(v)),this.size[v]!==i&&(this.size[v]=i,b[1].touch(v)),w=v*4,(g[w]!==s[0]||g[w+1]!==s[1]||g[w+2]!==s[2]||g[w+3]!==s[3])&&(g[w]=s[0],g[w+1]=s[1],g[w+2]=s[2],g[w+3]=s[3],b[2].touch(v)),(p[w]!==a||p[w+1]!==n||p[w+2]!==u||p[w+3]!==h)&&(p[w]=a,p[w+1]=n,p[w+2]=u,p[w+3]=h,b[3].touch(v)),this.draw[v]!==y&&(this.draw[v]=y,b[4].touch(v)),this.shine[v]!==f&&(this.shine[v]=f,b[5].touch(v))}end(){this.geo.instanceCount=this.n,ba.forEach((t,r)=>this.dirty[r].flush(this.geo.getAttribute(t)))}}const xa=4,Be=9,ue={uHiz:{value:null},uHizOn:{value:0},uHizSize:{value:new j(1,1)},uHizLevels:{value:0},uHizAt:{value:Array.from({length:Be},()=>new C)}},Ma=`
uniform sampler2D uHiz;
uniform float uHizOn, uHizLevels;
uniform vec2 uHizSize;
uniform vec4 uHizAt[${Be}];
bool hizHidden(vec2 lo, vec2 hi, float near) {
  if (uHizOn < 0.5) return false;
  lo = clamp(lo, vec2(0.0), uHizSize - 1.0); hi = clamp(hi, vec2(0.0), uHizSize - 1.0);
  float span = max(hi.x - lo.x, hi.y - lo.y) + 1.0;
  int L = int(ceil(log2(max(span, 1.0))));
  if (float(L) > uHizLevels - 1.0) return false;
  vec4 at = uHizAt[0];
  for (int i = 0; i < ${Be}; i++) if (i == L) at = uHizAt[i];
  float cell = exp2(float(L));
  vec2 a = min(floor(lo / cell), at.zw - 1.0), b = min(floor(hi / cell), at.zw - 1.0);
  vec2 ts = vec2(textureSize(uHiz, 0));
  float far = 0.0;
  for (int j = 0; j < 2; j++) for (int i = 0; i < 2; i++) {
    vec2 c = vec2(i == 0 ? a.x : b.x, j == 0 ? a.y : b.y);
    far = max(far, texelFetch(uHiz, ivec2(at.xy + c), 0).r);
  }
  return near > far;
}`,Sa="varying vec2 vUv; void main() { vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }",Aa="uniform sampler2D uSrc; void main() { gl_FragColor = vec4(texelFetch(uSrc, ivec2(gl_FragCoord.xy), 0).r, 0.0, 0.0, 1.0); }",Ea=`
uniform sampler2D uSrc; uniform vec2 uSrcSize;
void main() {
  ivec2 p = ivec2(gl_FragCoord.xy) * 2, m = ivec2(uSrcSize) - 1;
  float d = 0.0;
  for (int j = 0; j < 3; j++) for (int i = 0; i < 3; i++) {
    if ((i == 2 && p.x + 2 != m.x) || (j == 2 && p.y + 2 != m.y)) continue;
    d = max(d, texelFetch(uSrc, min(p + ivec2(i, j), m), 0).r);
  }
  gl_FragColor = vec4(d, 0.0, 0.0, 1.0);
}`,La="uniform sampler2D uSrc; uniform vec2 uAt; void main() { gl_FragColor = texelFetch(uSrc, ivec2(gl_FragCoord.xy - uAt), 0); }";class pi{depth=new je(1,1,{depthBuffer:!0,stencilBuffer:!1});levels=[];atlas=new je(1,1,{type:Dt,format:dt,minFilter:se,magFilter:se,depthBuffer:!1});quad=new de(new Mt(2,2));cam=new so(-1,1,1,-1,0,1);copy;reduce;place;size={w:0,h:0};ok;constructor(t){this.depth.depthTexture=new Ko(1,1,$o);const r=(l,i)=>new re({vertexShader:Sa,fragmentShader:l,uniforms:i,depthTest:!1,depthWrite:!1});this.copy=r(Aa,{uSrc:{value:null}}),this.reduce=r(Ea,{uSrc:{value:null},uSrcSize:{value:new j}}),this.place=r(La,{uSrc:{value:null},uAt:{value:new j}}),this.quad.frustumCulled=!1,this.ok=t.capabilities.isWebGL2&&!!t.extensions.get("EXT_color_buffer_float")}resize(t,r){if(t===this.size.w&&r===this.size.h)return;this.size={w:t,h:r},this.depth.setSize(t,r);for(const u of this.levels)u.dispose();this.levels=[];let l=t,i=r,s=0,a=0;const n=ue.uHizAt.value;for(;a<Be;a++){const u=new je(l,i,{type:Dt,format:dt,minFilter:se,magFilter:se,depthBuffer:!1});if(this.levels.push(u),n[a].set(a===0?0:t,a===0?0:s,l,i),a>0&&(s+=i),l<=2&&i<=2){a++;break}l=Math.max(1,Math.ceil(l/2)),i=Math.max(1,Math.ceil(i/2))}for(let u=a;u<Be;u++)n[u].set(0,0,0,0);ue.uHizLevels.value=a,this.atlas.setSize(t+Math.ceil(t/2),Math.max(r,s)),ue.uHizSize.value.set(t,r)}render(t,r,l,i,s,a){if(ue.uHizOn.value=0,!a||!this.ok||i<1||s<1)return;this.resize(i,s);const n=t,u=l.layers.mask,h=n.getRenderTarget(),d=n.autoClear,c=n.getClearColor(new St),f=n.getClearAlpha();l.layers.set(xa),n.setRenderTarget(this.depth),n.setClearColor(0,0),n.autoClear=!0,n.render(r,l),l.layers.mask=u;const v=(g,p)=>{this.quad.material=g,n.setRenderTarget(p),n.render(this.quad,this.cam)};this.copy.uniforms.uSrc.value=this.depth.depthTexture,v(this.copy,this.levels[0]);for(let g=1;g<this.levels.length;g++){const p=this.levels[g-1];this.reduce.uniforms.uSrc.value=p.texture,this.reduce.uniforms.uSrcSize.value.set(p.width,p.height),v(this.reduce,this.levels[g])}n.setRenderTarget(this.atlas),n.setClearColor(0,0),n.clear(),n.autoClear=!1;const m=ue.uHizAt.value;this.levels.forEach((g,p)=>{const b=m[p];this.place.uniforms.uSrc.value=g.texture,this.place.uniforms.uAt.value.set(b.x,b.y),this.atlas.viewport.set(b.x,b.y,b.z,b.w),n.setRenderTarget(this.atlas),this.quad.material=this.place,n.render(this.quad,this.cam)}),this.atlas.viewport.set(0,0,this.atlas.width,this.atlas.height),n.autoClear=d,n.setClearColor(c,f),n.setRenderTarget(h),ue.uHiz.value=this.atlas.texture,ue.uHizOn.value=1}compile(t){return Promise.all([this.copy,this.reduce,this.place].map(r=>{const l=new de(this.quad.geometry,r);return l.frustumCulled=!1,t.compileAsync(l,this.cam)}))}dispose(){this.depth.dispose(),this.atlas.dispose();for(const t of this.levels)t.dispose();this.copy.dispose(),this.reduce.dispose(),this.place.dispose(),this.quad.geometry.dispose()}}const Ie=256;function gt(e){e.byteOffset%4&&(e=e.slice());const t=e.length>>2,r=new Uint32Array(e.buffer,e.byteOffset,t),l=new Uint8Array(t),i=new Map([[0,0]]),s=new Uint8Array(Ie*4);let a=0,n=0;for(let u=0;u<t;u++){const h=r[u];if(h!==a){let d=i.get(h);if(d===void 0){if(d=i.size,d>=Ie)return null;i.set(h,d),s.set(e.subarray(u*4,u*4+4),d*4)}a=h,n=d}l[u]=n}return{idx:l,pal:s}}const vi=(e,t,r,l)=>t?t[e[r]*4+l]:e[r*4+l],Nt=(e,t,r)=>r?e*t+Ie*4:e*t*4;function rt(e,t,r){return e.getContext("2d").getImageData(0,0,t,r).data}const Ca=(e,t=2048)=>qo(Fa(e,t));function*Fa(e,t=2048){const l=[],i=new Map;let s=0,a=0,n=0,u=1;for(const[g,p]of e.entries()){const b=i.get(p);if(b!==void 0){l.push(l[b]);continue}i.set(p,g),s+p.w+1>t&&(s=0,a+=n+1,n=0),l.push({x:s,y:a}),s+=p.w+1,n=Math.max(n,p.h),u=Math.max(u,s)}const h=Math.max(1,a+n),d=new Uint8Array(u*h*4),c=new Uint8Array(u*h*4),f=[];for(let g=0;g<e.length;g++){g&&g%4===0&&(yield);const p=e[g],b=i.get(p);if(b!==g){f.push(f[b]);continue}const y=l[g],w=rt(p.A,p.w,p.h),M=rt(p.N,p.w,p.h),A=p.S?rt(p.S,p.w,p.h):null,L=A?Array.from({length:p.h},(F,O)=>Array.from({length:p.w},(k,R)=>A[(O*p.w+R)*4+1])):null;for(let F=0;F<p.h;F++){const O=F*p.w*4,k=((y.y+F)*u+y.x)*4;if(d.set(w.subarray(O,O+p.w*4),k),p.eyes)for(let R=0;R<p.w;R++)p.eyes[F*p.w+R]&&d[k+R*4+3]===255&&(d[k+R*4+3]=253);if(c.set(M.subarray(O,O+p.w*4),k),p.S){const R=L[F];for(let N=0;N<p.w;N++)c[k+N*4+3]&&(c[k+N*4+3]=R[N])}}let x=0;e:for(let F=p.h-1;F>=0;F--,x++)for(let O=0;O<p.w;O++)if(w[(F*p.w+O)*4+3]>=128)break e;let E=0;if(x<p.h){const F=p.h-1-x;for(let O=0;O<p.w;O++)w[(F*p.w+O)*4+3]>=128&&(E=Math.max(E,Math.abs(O+.5-p.w/2)+.5))}f.push({uv:[y.x/u,y.y/h,(y.x+p.w)/u,(y.y+p.h)/h],w:p.w,h:p.h,pad:Math.min(x,p.h),...E?{foot:E}:{},...p.S?{masked:!0}:{},...p.head?{head:p.head}:{}})}yield;const v=gt(d);yield;const m=gt(c);return{albedo:v?.idx??d,normal:m?.idx??c,albedoPal:v?.pal??null,normalPal:m?.pal??null,width:u,height:h,frames:f}}const vo={},mo=["baby","young","adult","legend"],Gt=new Map,mi=(e,t,r)=>`${mo[e]}-walk${t}${r?"-away":""}`;function bi(e,t){const r=`${e}/${t}`,l=vo[r];if(!l)return;let i=Gt.get(r);if(!i){const s=atob(l.px),a=new Uint8ClampedArray(s.length);for(let n=0;n<s.length;n++)a[n]=s.charCodeAt(n);Gt.set(r,i={w:l.w,h:l.h,rgba:a})}return i}const wi=(e,t)=>Oa.has(`${e}/${mo[t]}`),Oa=new Set(Object.keys(vo).map(e=>e.slice(0,e.indexOf("-"))));function Ut(e,t,r,l,i,s,a,n){e.box([t,i,r],[l,i,s],o.BELLY,{round:Math.min(l,s)*.35,group:a,rough:.015});const u=Math.max(2,Math.round(l*4));for(let h=0;h<u;h++){const d=(h+.5)/u*2-1,c=.05+.03*S(h,n,3);e.seg([t+d*l*.9,i*2-.05,r+s],[t+d*l*.95+(S(h,n,5)-.5)*.1,.04,r+s+.06],c*.6,c,o.BELLY,{group:a})}for(const h of[-1,1])e.seg([t+h*l,i*2-.05,r],[t+h*(l+.06),.04,r+(S(h+2,n,7)-.5)*s],.06,.09,o.BELLY,{group:a});e.ell([t,.03,r+s*.3],[l+.12,.04,s+.12],o.BELLY,{group:a})}const bo={Bed(e,{W:t,D:r,H:l}){const i=-t/2+.06,s=t/2-.06,a=-r/2+.06,n=r/2-.06,u=Math.min(.42,l*.55);[[i,a,u+.45],[s,a,u+.45],[i,n,u+.1],[s,n,u+.1]].forEach(([h,d,c],f)=>e.box([h,c/2,d],[.05,c/2,.05],o.BARKD,{group:2+f})),e.box([0,u+.25,a],[t/2-.06,.2,.03],o.WOOD,{group:6,paint:h=>Math.abs((h[0]/.25%1+1)%1-.5)>.45?o.BARKD:void 0});for(const h of[i,s])e.box([h,u,0],[.035,.05,r/2-.06],o.WOOD,{group:7});for(const h of[a,n])e.box([0,u,h],[t/2-.06,.05,.035],o.WOOD,{group:7});for(let h=a+.2;h<n-.1;h+=.24)e.box([0,u+.02,h],[t/2-.1,.015,.06],o.HAIR,{group:8});e.box([t*.12,u+.1,n-.45],[t*.22,.07,.22],o.BELLY,{round:.05,group:9,paint:h=>Math.abs(h[1]-(u+.1))<.012?o.STRAW:void 0}),e.ell([-t*.2,u+.12,n-.4],[.22,.08,.15],o.BELLY,{group:10})},Wardrobe(e,{W:t,D:r,H:l}){Ut(e,0,0,t/2-.05,l/2-.04,r/2-.05,2,1);for(const i of[-1,1])e.box([i*(t/2-.15),.03,r/2-.1],[.04,.03,.04],o.BARKD,{group:3})},Chest(e,{W:t,D:r,H:l}){Ut(e,0,0,t/2-.05,l/2-.02,r/2-.05,2,2),e.ell([-t*.2,l-.02,0],[t*.22,.1,r*.35],o.BELLY,{group:2})},Crates(e,{W:t,D:r,H:l}){const i=Math.min(t/2,r,l/2)*.95,s=n=>Math.abs((n[1]/(i/3)%1+1)%1-.5)>.44?o.BARKD:void 0,a=(n,u,h,d,c=0)=>e.box([n,u+i/2,h],[i/2,i/2,i/2],o.WOOD,{round:.01,group:d,dir:[Math.cos(c),0,Math.sin(c)],paint:s});a(-t/4,0,0,2),a(t/4,0,0,3,.12),a(-t/8,i,0,4,-.1),e.flat([t/4,i*.55,i/2+.01],[1,0,0],[0,1,0],i*.25,i*.25,(n,u)=>Math.abs(n)<.2&&u<.4||Math.abs(n)<.6-(u-.4)&&u>=.4&&u<1?o.BARKD:void 0,{group:5,bend:0}),e.box([-t/8,i*2+.03,0],[i*.38,.03,i*.3],o.BELLY,{round:.02,group:6,dir:[Math.cos(.3),0,Math.sin(.3)]})}},wo=["bedroom2","bedroom3"],Ra=Object.keys(bo),ka=Object.fromEntries(wo.flatMap(e=>Ra.map(t=>[e+t,bo[t]]))),Ta=Object.fromEntries(wo.map(e=>[e,{[o.BELLY]:[128,124,118],[o.WOOD]:[104,80,58],[o.HAIR]:[80,62,48]}])),Ct=2,Pa={bed:1,telephone:1.8,microphone:1.6,book:1.7,telescope:1.6,hats:1,drumKit:1.1,synthRack:1.4,broomBay:1.35,lathe:1.2,pegboard:1.4,cauldron:1.4,teaTable:1.4,cardTable:1.4,invitations:1},Da=1.5,yo=e=>Ct*(Pa[e]??(e.startsWith("bedroom")?1:Da)),z=[1,0,0],ne=[0,1,0],le=[0,0,1],Y=(e,t)=>[e[0]*Math.cos(t)+e[2]*Math.sin(t),e[1],-e[0]*Math.sin(t)+e[2]*Math.cos(t)],_t=.35,U=(e,t,r,l,i)=>{(e.lights??=[]).push({c:t,rgb:r,R:l,power:i})},oe=(e,t,r,l,i,s)=>{e.ell(t,[r,r,r],l,{group:i,extra:!0}),s&&U(e,t,...s)},Q=[255,190,110],Se=[255,120,210],he=[170,120,255],Ue=[150,214,255],Je=[130,255,160],Te=(e,t,r,l=.12,i=!0)=>{e.seg(t,[t[0],t[1]+l,t[2]],.028,.025,o.BELLY,{group:r}),oe(e,[t[0],t[1]+l+.035,t[2]],.022,o.WOKEN,r+100,i?[Q,14,.35]:null)},K=(e,t,r,l,i,s=.4)=>{for(let a=0;a<r;a++){const n=a*2.4,u=l*(1-a/(r*2));e.ell([t[0]+Math.cos(n)*l*.9,t[1]+a%3*l*.35,t[2]+Math.sin(n)*l*.9],[u,u*.5,u*.8],[o.LEAF,o.LEAF2,o.LEAF3][a%3],{group:i,dir:[Math.cos(n),s,Math.sin(n)]})}},xe=(e,t,r,l,i,s,a=.06)=>{for(let n=l,u=0;n<i;n+=a*3,u++){const h=u*1.9;e.ell([t+Math.cos(h)*a*1.4,n,r+Math.sin(h)*a*1.4],[a*1.2,a*.7,a],u%3?o.LEAF:o.LEAF2,{group:s,dir:[Math.cos(h),.4,Math.sin(h)]})}},_e=(e,t=o.BARKD,r=.015)=>l=>Math.abs((l[0]/e%1+1)%1-.5)>.5-r/e?t:void 0,$=(e,t,r,l,i,s)=>e.ell(t,[r,l,r],i,s),G=(e,t,r,l,i,s,a,n)=>e.seg([t,l+s*.3,r],[t,i-s*.3,r],s,s,a,n),za=(e,t)=>[e[0]-t[0],e[1]-t[1],e[2]-t[2]],Ye=(e,t)=>[e[0]+t[0],e[1]+t[1],e[2]+t[2]],We=(e,t)=>[e[0]*t,e[1]*t,e[2]*t];function Ha(e,t,r){const l=-r/2,i=l+t,s=c=>{const f=t-(c[2]-l),v=c[0]/t;return[f*Math.sin(v),c[1],i-f*Math.cos(v)]},a=c=>{const f=c[0],v=i-c[2],m=Math.hypot(f,v);return[Math.atan2(f,v)*t,c[1],l+t-m]},n=(c,f)=>[c[0]*Math.cos(f)-c[2]*Math.sin(f),c[1],c[0]*Math.sin(f)+c[2]*Math.cos(f)],u=.08,h=[];for(const c of e.parts)if(c.type==="box"&&Math.abs(c.axes[0][0])>.9&&c.h[0]>u){const f=Math.ceil(c.h[0]/u),v=c.h[0]/f;for(let m=0;m<f;m++)h.push({...c,c:Ye(c.c,We(c.axes[0],-c.h[0]+v*(2*m+1))),h:[v+c.round*.5,c.h[1],c.h[2]]})}else if(c.type==="cone"&&Math.abs(c.b[0]-c.a[0])>2*u){const f=Math.ceil(Math.abs(c.b[0]-c.a[0])/(2*u)),v=za(c.b,c.a);for(let m=0;m<f;m++)h.push({...c,a:Ye(c.a,We(v,m/f)),b:Ye(c.a,We(v,(m+1)/f)),r1:c.r1+(c.r2-c.r1)*m/f,r2:c.r1+(c.r2-c.r1)*(m+1)/f})}else h.push(c);e.parts=h.map(c=>{const f=c.paint?{paint:m=>c.paint(a(m))}:{};if(c.type==="cone")return{...c,...f,a:s(c.a),b:s(c.b)};const v=c.c[0]/t;return{...c,...f,c:s(c.c),axes:c.axes.map(m=>n(m,v))}});const d=[];for(const c of e.flats){const f=Math.abs(c.u[0])>.9&&c.su>u,v=!f&&Math.abs(c.v[0])>.9&&c.sv>u;if(!f&&!v){d.push(c);continue}const m=f?c.su:c.sv,g=f?c.u:c.v,p=Math.ceil(m/u);for(let b=0;b<p;b++){const y=-1+(2*b+1)/p,w=f?(M,A)=>c.mask(y+M/p,A):(M,A)=>c.mask(M,y+A/p);d.push({...c,c:Ye(c.c,We(g,y*m)),...f?{su:m/p*1.04}:{sv:m/p*1.04},mask:w})}}e.flats=d.map(c=>{const f=c.c[0]/t;return{...c,c:s(c.c),u:n(c.u,f),v:n(c.v,f)}});for(const c of e.lights??[])c.c=s(c.c);for(const c of Object.keys(e.marks??{}))e.marks[c]=s(e.marks[c])}const Ba=["#2f6b5e","#9fc4d8","#7f93a3","#2e8b3e","#7aa04a","#c8442a","#6f7a3a","#d9a441","#b0603a"],xo=[o.SKIN,o.EAR,o.EYE,o.PUPIL,o.BROW,o.BODYL,o.NIGHT,o.NIGHT2,o.MOUTH],Ia=e=>[1,3,5].map(t=>parseInt(e.slice(t,t+2),16)),Na=new Set(["curtains"]),Ze={bed(e,{W:t,D:r,H:l}){const i=-t/2+.07,s=t/2-.07,a=-r/2+.07,n=r/2-.07,u=2.25,h=l*.78,d=.26;e.box([0,d,0],[t/2-.1,.11,r/2-.1],o.BARKD,{round:.02,group:1,paint:c=>Math.abs(c[1]-d)<.02?o.WOOD:void 0}),e.box([0,h-.08,-.05],[t/2-.16,.1,r/2-.18],o.BELLY,{round:.06,group:2}),e.box([0,h+.02,.25],[t/2-.12,.07,r/2-.45],o.CLOTH,{round:.07,group:3,paint:c=>Math.abs(c[2]-(-r/2+.7))<.07?o.BELLY:Math.abs(((c[0]+c[2])*2.5%1+1)%1-.5)<.07?o.BODY3:void 0}),e.box([0,h-.12,n-.02],[t/2-.12,.2,.05],o.CLOTH,{round:.04,group:3});for(const c of[-1,1])e.ell([c*t*.22,h+.1,a+.28],[t*.2,.1,.16],o.BELLY,{group:4+(c>0)});e.box([0,.95,a],[t/2-.06,.55,.045],o.BARKD,{group:6,paint:c=>Math.abs(c[0])<t/2-.2&&Math.abs(c[1]-.95)<.4&&((c[0]*8+c[1]*3)%1+1)%1<.14?o.HAIR:void 0});for(let c=-3;c<=3;c++){const f=c/3,v=1.55+.35*(1-Math.abs(f))**1.6;e.seg([f*(t/2-.12),1.4,a],[f*(t/2-.2),v,a],.055,.04,o.BARKD,{group:6})}e.ell([0,1.95,a],[.09,.11,.05],o.BARKD,{group:6}),e.ell([0,1.15,a+.05],[.14,.14,.02],o.MAGIC,{group:7,paint:c=>Math.abs(Math.atan2(c[1]-1.15,c[0])%.8)<.12?o.MAGIC2:void 0}),U(e,[0,1.15,a+.15],he,10,.2),e.box([0,.52,n],[t/2-.06,.2,.04],o.BARKD,{group:8,paint:c=>Math.abs(c[0]%.3)<.03?o.HAIR:void 0}),[[i,a],[s,a],[i,n],[s,n]].forEach(([c,f],v)=>{e.seg([c,0,f],[c,u,f],.065,.05,o.BARKD,{group:10+v});for(const m of[.3,.75,1.4])e.ell([c,m,f],[.09,.065,.09],o.BARKD,{group:10+v});e.seg([c,u,f],[c,u+.3,f],.055,.005,o.BARKD,{group:10+v})});for(const c of[a,n])e.box([0,u-.02,c],[t/2-.07,.035,.035],o.BARKD,{group:14});for(const c of[i,s])e.box([c,u-.02,0],[.035,.035,r/2-.07],o.BARKD,{group:14});e.flat([0,u+.04,-r/4+.02],z,le,t/2-.06,r/4,(c,f)=>S(Math.floor((c+1)*6),Math.floor((f+1)*4),41)>.86||f>.7+.3*Math.sin(c*11)?void 0:o.ACCENT,{group:15,bend:.1}),e.flat([0,u-.1,a-.01],z,[0,-1,0],t/2-.06,.1,(c,f)=>f>.3&&Math.abs((c+1)*5%1-.5)>.32?void 0:o.ACCENT,{group:15,bend:.1});for(const c of[i,s])e.flat([c,u-.1,-r/4],le,[0,-1,0],r/4,.1,(f,v)=>v>.3&&Math.abs((f+1)*4%1-.5)>.32?void 0:o.ACCENT,{group:15,bend:.1});for(const c of[i,s]){const f=Math.sign(c);e.flat([c+f*.02,u*.55,a+.3],le,ne,.26,u*.45,(v,m)=>Math.abs(v)>1-(1-m)*.55?void 0:Math.sin(v*9)>.4?o.BODY:o.ACCENT,{group:16+(f>0),bend:.5}),e.ell([c+f*.04,u*.5,a+.15],[.06,.05,.11],o.FLOWER,{group:18})}xe(e,i,n,.2,u,20,.07),K(e,[i,u+.12,n-.05],6,.16,21),e.ell([t*.15,h+.16,.15],[.34,.11,.27],o.JACKET,{group:22,rough:.012}),e.ell([t*.15+.24,h+.21,.34],[.15,.1,.13],o.JACKET,{group:22}),e.seg([t*.15-.2,h+.14,.3],[i+.04,h-.1,.5],.08,.07,o.JACKET,{group:22}),e.box([-t*.22,h+.22,a+.32],[.09,.015,.15],o.SHADES,{group:24,dir:Y(z,.3)}),e.flat([-t*.22,h+.24,a+.32],Y(z,.3),Y(le,.3),.07,.12,()=>o.GLINT,{group:25,bend:0}),U(e,[-t*.22,h+.3,a+.32],Ue,9,.25),e.chain([[-t*.22,h+.2,a+.47,.016],[i+.05,h+.1,a+.55,.016],[i-.08,.3,a+.5,.016],[i-.12,.02,a+.2,.016]],o.SOLE,{group:26})},wardrobe(e,{W:t,D:r,H:l}){const i=l*.86,s=-t/2+.06,a=t/2-.06;for(const d of[s,a])e.seg([d,.06,0],[d,i+.04,0],.035,.035,o.FRAME,{group:1}),e.seg([d,.045,-r/2+.05],[d,.045,r/2-.05],.04,.04,o.FRAME,{group:1}),e.ell([d,i+.08,0],[.06,.06,.06],o.FLOWER,{group:1});e.seg([s,i,0],[a,i,0],.03,.03,o.FRAME,{group:1});const n=[[o.HAT2,.95,.24,"cloak"],[o.POM,.7,.2,"dress"],[o.HAT1,.45,.24,"cape"],[o.JACKET,.55,.26,"puffer"],[o.IRIS,.95,.24,"cloak"]],u=n.length,h=t-.35;n.forEach(([d,c,f,v],m)=>{const g=-h/2+(m+.5)*h/u,p=i-.06,b=.05;e.seg([g,i+.02,0],[g,p,b],.01,.01,o.FRAME,{group:2}),e.seg([g-f*.8,p-.03,b],[g+f*.8,p-.03,b],.016,.016,o.WOOD,{group:2});const y=30+m,w=p-c/2-.03;if(v==="cloak")e.box([g,w,b],[f*.9,c/2,.05],d,{round:.05,group:y,paint:M=>Math.abs(M[0]-g)<.02?o.FLOWER:void 0}),e.ell([g,p-.06,b+.05],[.1,.06,.08],d,{group:y});else if(v==="dress")e.seg([g,p-.04,b],[g,p-c,b],f*.55,f*1.15,d,{group:y,paint:M=>S(Math.round(M[0]*30),Math.round(M[1]*30),m)>.78?o.BELLY:void 0});else if(v==="puffer")for(let M=0;M<3;M++)e.ell([g,p-.1-M*c/3,b],[f,c/7,.1],d,{group:y});else e.box([g,w,b],[f,c/2,.045],d,{round:.03,group:y,paint:M=>M[1]<w-c/2+.06?o.FLOWER:void 0})}),[[-t*.28,0,o.ACCENT,o.BELLY],[-t*.28,1,o.CLOTH,o.FLOWER],[t*.2,0,o.BODY2,null]].forEach(([d,c,f,v],m)=>{const g=.12+c*.2;e.box([d,g,0],[.24,.09,.15],f,{round:.015,group:50+m}),v&&e.box([d,g+.1,0],[.25,.025,.16],v,{round:.012,group:50+m})}),e.ell([t*.2-.02,.27,.03],[.16,.07,.08],o.SHOES,{group:60,dir:[1,.15,0]}),e.ell([t*.2-.06,.22,.03],[.14,.03,.08],o.POM,{group:60});for(let d=0;d<=12;d++){const c=d/12,f=s+(a-s)*c,v=.08*Math.sin(c*Math.PI*3)**2;oe(e,[f,i-.03-v,.07],.035,d%2?o.COLLAR:o.WOKEN,70,d%4===2?[d%2?Se:Q,12,.3]:null)}xe(e,a,0,i*.4,i,80,.07),K(e,[a-.1,i+.1,0],5,.14,81),e.seg([s,i+.12,0],[s+.02,i+.45,0],.13,.01,o.HAT1,{group:82,paint:d=>Math.floor(d[1]*14)%2?o.POM:void 0}),e.ell([s+.02,i+.47,0],[.05,.05,.05],o.FLOWER,{group:82})},dressingTable(e,{W:t,D:r,H:l}){const a=r/2;e.box([0,.76,0],[t/2,.04,r/2],o.WOOD,{round:.02,group:1}),e.box([0,.76-.13,.02],[t/2-.04,.1,r/2-.05],o.BODY3,{group:2,paint:g=>Math.abs(g[0])<.015||Math.abs(Math.abs(g[0])-t/4)<.015?o.BARKD:void 0});for(const g of[-t/4,t/4])e.ell([g,.76-.13,a-.02],[.035,.035,.025],o.FLOWER,{group:3});for(const[g,p]of[[-1,-1],[1,-1],[-1,1],[1,1]])e.chain([[g*(t/2-.06),.76-.2,p*(r/2-.06),.035],[g*(t/2-.02),.35,p*(r/2-.04),.026],[g*(t/2-.07),.02,p*(r/2-.07),.03]],o.WOOD,{group:4});const n=t*.4,u=.76+.05,h=l,d=-r/2+.06,c=(u+h)/2,f=(h-u)/2;e.box([0,c,d],[n,f,.035],o.BARKD,{round:.025,group:5});for(const g of[-1,1])e.seg([g*(n+.04),.76,d],[g*(n+.04),h+.08,d],.025,.022,o.WOOD,{group:5}),e.ell([g*(n+.04),h+.11,d],[.04,.05,.04],o.FLOWER,{group:5});e.flat([0,c+.02,d+.06],z,ne,n-.1,f-.1,(g,p)=>g+p*.6>.45&&g+p*.6<.7?o.BELLY:o.WEB,{group:6,bend:0});const v=[];for(let g=0;g<4;g++)v.push([-n+.05+g*(2*n-.1)/3,h-.03]);for(let g=1;g<4;g++)for(const p of[-1,1])v.push([p*(n-.04),h-.03-g*(2*f-.1)/4]);v.forEach(([g,p],b)=>oe(e,[g,p,d+.07],.05,o.WOKEN,7,b===0||b===3?[Q,8,.12]:null)),e.chain([[n-.05,h+.03,d+.05,.05],[n+.07,h-.22,d+.08,.045],[n+.09,h-.6,d+.07,.04]],o.PHONES,{group:8});const m=.76+.04;e.ell([-t*.32,m+.13,.03],[.09,.13,.09],o.CRYSTAL,{group:10}),e.seg([-t*.32,m+.24,.03],[-t*.32,m+.34,.03],.03,.03,o.CRYSTAL,{group:10}),e.ell([-t*.32,m+.36,.03],[.04,.03,.04],o.WOOD,{group:10}),e.ell([-t*.32,m+.1,.03],[.075,.085,.075],o.MAGIC,{group:11,extra:!0}),U(e,[-t*.32,m+.14,.14],he,10,.3),G(e,t*.05,.1,m,m+.1,.075,o.CRYSTAL,{group:14}),e.ell([t*.05,m+.1,.1],[.065,.025,.065],o.POM,{group:15,paint:g=>S(Math.round(g[0]*50),Math.round(g[2]*50),3)>.55?o.FLOWER:void 0}),e.seg([t*.2,m,.13],[t*.2,m+.14,.13],.025,.022,o.ACCENT,{group:16}),e.ell([-t*.1,m+.02,.15],[.09,.02,.08],o.FLOWER,{group:19}),G(e,t*.36,-.04,m,m+.13,.07,o.BODY2,{group:20}),K(e,[t*.36,m+.17,-.04],5,.09,21);for(let g=0;g<3;g++)e.ell([t*.36+.1+g*.02,m+.06-g*.12,.08],[.06,.035,.05],o.LEAF2,{group:22,dir:[1,-.5,.3]})},crystalBall(e,{W:t,D:r}){const l=Math.min(t,r)/2-.02,i=.72,s=Math.min(.24,l*.6);e.ell([0,i,0],[l,.03,l],o.CLOTH,{group:1});const a=u=>{const h=Math.atan2(u[2],u[0]);return u[1]<.07?o.FLOWER:Math.sin(h*7)>.55?o.BODY:void 0};for(let u=0;u<9;u++){const h=u/8,d=i-.04-h*(i-.1),c=l*(1+.13*h*h);e.ell([0,d,0],[c,.07,c],o.CLOTH,{group:1,paint:a})}for(let u=0;u<12;u++){const h=u/12*Math.PI*2;e.ell([Math.cos(h)*l*1.13,.035,Math.sin(h)*l*1.13],[.025,.04,.025],o.FLOWER,{group:2})}const n=i+.03+s*.9;e.ell([0,i+.05,0],[s*.7,.04,s*.7],o.FRAME,{group:3});for(let u=0;u<3;u++){const h=u*Math.PI*2/3+.3,d=Math.cos(h),c=Math.sin(h);e.chain([[d*s*.45,i+.06,c*s*.45,.026],[d*s*.9,n-s*.35,c*s*.9,.024],[d*s*.95,n+s*.2,c*s*.95,.018],[d*s*.6,n+s*.55,c*s*.6,.01]],o.FRAME,{group:3})}e.ell([0,n,0],[s,s,s],o.MAGIC,{group:4,paint:u=>Math.sin((u[0]+u[1]*1.6)*18+u[2]*12)>.5?o.MAGIC2:void 0}),U(e,[0,n,0],he,22,.8);for(let u=0;u<4;u++){const h=-.5+u*.33,d=Y(z,h),c=Y(le,h);e.flat([l*.45+Math.sin(h)*.06,i+.035+u*.002,l*.3+Math.cos(h)*.02],d,c,.055,.09,(f,v)=>u===3?Math.abs(f)<.6&&Math.abs(v)<.7?Math.abs(v)<.25?o.FLOWER:o.BELLY:o.BODY2:Math.abs(f)>.7||Math.abs(v)>.8?o.FLOWER:o.ACCENT,{group:5+u,bend:0})}e.ell([-l*.5,i+.04,l*.2],[.07,.014,.07],o.FRAME,{group:12}),Te(e,[-l*.5,i+.04,l*.2],13);for(let u=0;u<3;u++)e.seg([-l*.3,i+.03,-l*.45],[-l*.3+(u-1)*.04,i+.12+u*.03,-l*.45+(u-1)*.01],.03,.005,o.CRYSTAL,{group:15})},curtains(e,{W:t,D:r,H:l},i){const s=-r/2+.03,a=t*.38,n=.75,u=l-.2,h=(n+u)/2,d=(u-n)/2,c=i==="shut";e.flat([0,h,s],z,ne,a,d,(m,g)=>{const p=m*a,b=g*d;if(!(g>.55&&Math.hypot(m,(g-.55)/.45*.9)>1))return Math.abs(p)<.025||Math.abs(b+d*.1)<.025?o.BARKD:Math.hypot(p+a*.45,b-d*.4)<.1?o.MAGIC2:S(Math.round(p*30),Math.round(b*30),9)>.95?o.MAGIC2:o.WATER},{group:1,bend:0}),e.box([0,n-.04,s+.05],[a+.12,.03,.09],o.WOOD,{round:.01,group:2}),e.chain([[-a-.05,n,s+.02,.04],[-a-.05,h+d*.1,s+.02,.04],[-a*.7,u-.02,s+.02,.04],[0,u+.08,s+.02,.04],[a*.7,u-.02,s+.02,.04],[a+.05,h+d*.1,s+.02,.04],[a+.05,n,s+.02,.04]],o.WOOD,{group:3}),U(e,[-a*.45,h+d*.4,s+.2],[190,200,255],10,.2);const f=l-.05,v=s+.14;e.seg([-t/2+.05,f,v],[t/2-.05,f,v],.025,.025,o.FLOWER,{group:4});for(const m of[-1,1])e.ell([m*(t/2-.03),f,v],[.05,.05,.05],o.FLOWER,{group:4});for(const m of[-1,1]){const g=5+(m>0),p=c?t/4-.02:.16,b=c?m*t/4:m*(t/2-.2);e.flat([b,f/2+.05,v],z,ne,p,f/2-.05,(y,w)=>!c&&Math.abs(w+.05)<.1&&Math.abs(y)>.7?void 0:Math.sin(y*(c?11:6))>.35?o.BODY:o.ACCENT,{group:g,bend:.5}),c||e.ell([b,f*.45,v+.06],[.18,.05,.07],o.FLOWER,{group:8})}for(let m=-3;m<=3;m++)K(e,[m*t/7,f+.08,v],2,.12,9+m+3,.2);G(e,a*.4,s+.12,n-.01,n+.1,.06,o.BODY2,{group:20}),e.ell([a*.4,n+.2,s+.12],[.05,.12,.05],o.LEAF,{group:21,paint:m=>S(Math.round(m[1]*40),Math.round(m[0]*40),2)>.85?o.FLOWER:void 0})},phone(e,{W:t,D:r,H:l}){const i=l*.85,s=Math.min(t,r)/2;e.box([0,i,0],[s,.035,s*.9],o.WOOD,{round:.02,group:1}),e.box([0,i-.1,.02],[s-.04,.07,s*.8],o.WOOD,{group:2,paint:n=>n[2]>s*.78&&Math.abs(n[1]-(i-.1))<.012?o.BARKD:void 0}),e.ell([0,i-.1,s*.84],[.03,.03,.02],o.FLOWER,{group:3});for(const[n,u]of[[-1,-1],[1,-1],[-1,1],[1,1]])e.seg([n*(s-.05),i-.03,u*(s*.9-.05)],[n*(s-.02),0,u*(s*.9-.02)],.03,.025,o.WOOD,{group:4});xe(e,-(s-.03),s*.9-.03,.05,i*.6,5,.045);const a=i+.035;e.seg([-s*.45,a,-s*.35],[-s*.45,a+.18,-s*.35],.03,.025,o.BELLY,{group:6}),e.ell([-s*.45,a+.2,-s*.35],[.11,.07,.11],o.GLOW,{group:7,paint:n=>S(Math.round(n[0]*30),Math.round(n[2]*30),4)>.75?o.MAGIC2:void 0}),U(e,[-s*.45,a+.18,-s*.2],Q,12,.35),e.box([s*.2,a+.012,s*.1],[.08,.012,.14],o.SHADES,{group:8,dir:Y(z,-.4)}),e.flat([s*.2,a+.026,s*.1],Y(z,-.4),Y(le,-.4),.065,.12,(n,u)=>Math.abs(u)<.2&&Math.abs(n)<.5?o.BELLY:o.GLINT,{group:9,bend:0}),U(e,[s*.2,a+.08,s*.1],Ue,8,.25),G(e,s*.5,-s*.4,a,a+.1,.045,o.HAT1,{group:10}),e.chain([[s*.5+.04,a+.08,-s*.4,.012],[s*.5+.08,a+.05,-s*.4,.012],[s*.5+.04,a+.02,-s*.4,.012]],o.HAT1,{group:10})},cloakPegs(e,{W:t,D:r,H:l}){const i=l*.86,s=Math.min(t,r)/2;for(let d=0;d<3;d++){const c=d*2.1+.3;e.chain([[0,.28,0,.05],[Math.cos(c)*s*.55,.09,Math.sin(c)*s*.55,.04],[Math.cos(c)*s*.9,.02,Math.sin(c)*s*.9,.035]],o.BARKD,{group:1})}e.chain([[0,.22,0,.075],[0,i*.5,0,.045],[0,i+.05,0,.055]],o.BARKD,{group:2,paint:d=>Math.sin(d[1]*40)>.75?o.HAIR:void 0});const a=6,n=d=>{const c=d/a*Math.PI*2+.35;return{c:Math.cos(c),s:Math.sin(c),y:i-.08-d%2*.14}};for(let d=0;d<a;d++){const{c,s:f,y:v}=n(d);e.seg([0,v,0],[c*.22,v+.1,f*.22],.026,.02,o.WOOD,{group:3}),e.ell([c*.24,v+.12,f*.24],[.035,.035,.035],o.FLOWER,{group:3})}const u=(d,c,f,v,m,g)=>{const{c:p,s:b,y}=n(d),w=p*.26,M=b*.26+Math.sign(b)*.05,A=y+.1;e.box([w,A-f/2-.04,M],[v,f/2,.06],c,{round:.07,group:m,paint:L=>L[1]<A-f+.04?g:Math.abs(L[0]-w)<.02?o.FLOWER:void 0}),e.ell([w,A-.03,M],[v*.7,.08,.09],c,{group:m})};u(0,o.HAT,.95,.2,10,o.HAT2),u(2,o.CLOTH,.7,.19,11,o.ACCENT),u(4,o.IRIS,.8,.18,12,o.BELLY);const h=n(1);e.chain([[h.c*.26-.05,h.y+.12,h.s*.26+.04,.045],[h.c*.3-.08,h.y-.3,h.s*.3+.06,.04],[h.c*.3+.02,h.y-.62,h.s*.3+.08,.035]],o.ACCENT,{group:13,paint:d=>Math.floor(d[1]*12)%2?o.BELLY:void 0}),e.ell([0,i+.1,0],[.22,.02,.2],o.HAT,{group:14}),e.seg([0,i+.1,0],[.07,i+.55,-.03],.13,.01,o.HAT,{group:14,paint:d=>d[1]<i+.17?o.FLOWER:void 0}),xe(e,0,0,.3,i*.7,15,.055),K(e,[.05,i+.1,.12],4,.09,16,.6)},shoeRack(e,{W:t,D:r,H:l}){const i=[.08,l*.55],s=l*.95;for(const n of[...i,s])e.box([0,n,0],[t/2,.03,r/2-.02],o.WOOD,{round:.01,group:1,paint:_e(.25)});for(const n of[-t/2+.03,t/2-.03]){e.box([n,s/2+.03,0],[.03,s/2,r/2-.02],o.BARKD,{group:2});for(const u of[-r/2+.04,r/2-.04])e.ell([n,.02,u],[.05,.03,.05],o.BARKD,{group:2})}e.seg([-t/2+.03,s+.18,-r/2+.05],[t/2-.03,s+.18,-r/2+.05],.02,.02,o.WOOD,{group:3});for(const n of[-t/2+.03,t/2-.03])e.seg([n,s,-r/2+.05],[n,s+.2,-r/2+.05],.02,.02,o.WOOD,{group:3});const a=(n,u,h,d,c,f=!1)=>{e.ell([n,u+.07,.02],[.08,f?.14:.06,.14],h,{group:c,dir:[0,0,1]}),f&&e.seg([n,u+.1,-.04],[n,u+.3,-.04],.07,.065,h,{group:c}),e.ell([n,u+.02,.03],[.085,.025,.15],d,{group:c+50})};a(-t*.3,i[0]+.03,o.SHOES,o.SOLE,10),a(-t*.3+.19,i[0]+.03,o.SHOES,o.SOLE,11),a(t*.05,i[0]+.03,o.BARKD,o.SHADES,12,!0),a(t*.05+.19,i[0]+.03,o.BARKD,o.SHADES,13,!0),a(-t*.25,i[1]+.03,o.POM,o.FLOWER,14),a(-t*.25+.19,i[1]+.03,o.POM,o.FLOWER,15),a(t*.22,i[1]+.03,o.SHADES,o.COLLAR,16),a(t*.22+.19,i[1]+.03,o.SHADES,o.COLLAR,17),U(e,[t*.3,i[1]+.05,.15],Se,8,.25),G(e,-t/2+.14,0,s+.03,s+.16,.08,o.BODY2,{group:20}),K(e,[-t/2+.14,s+.22,0],7,.12,21,.7)},telephone(e,{W:t,D:r,H:l}){const i=Math.min(t,r)/2-.02,s=l*.72;$(e,[0,s,0],i,.03,o.BARKD,{group:1}),$(e,[0,s+.02,0],i*.8,.008,o.BELLY,{group:2}),e.chain([[0,s-.02,0,.045],[0,s*.6,0,.03],[0,s*.3,0,.045],[0,.12,0,.035]],o.BARKD,{group:3,paint:n=>Math.sin(n[1]*50)>.6?o.HAIR:void 0});for(let n=0;n<3;n++){const u=n*2.1+.4;e.chain([[0,.12,0,.035],[Math.cos(u)*i*.7,.05,Math.sin(u)*i*.7,.03],[Math.cos(u)*i*.9,.015,Math.sin(u)*i*.9,.025]],o.BARKD,{group:4})}const a=s+.03;e.box([0,a+.07,0],[.13,.07,.11],o.ACCENT,{round:.05,group:5}),$(e,[0,a+.14,.06],.07,.015,o.BELLY,{group:6,paint:n=>Math.hypot(n[0],n[2]-.06)>.04&&Math.sin(Math.atan2(n[2]-.06,n[0])*10)>.3?o.SHADES:void 0}),e.chain([[-.13,a+.17,-.02,.035],[0,a+.2,-.03,.03],[.13,a+.17,-.02,.035]],o.ACCENT,{group:7});for(const n of[-1,1])e.ell([n*.13,a+.17,-.02],[.05,.04,.05],o.ACCENT,{group:7});e.chain([[.1,a+.05,-.08,.012],[.15,a+.02,-.1,.014],[.18,a,-.04,.012]],o.SHADES,{group:8}),e.box([-.12,a+.01,i*.45],[.07,.01,.05],o.BELLY,{group:9,dir:Y(z,.3),paint:n=>Math.abs((n[2]*60%1+1)%1-.5)<.08?o.IRIS:void 0})},mirror(e,{W:t,D:r,H:l}){const i=t/2-.1,s=.25,a=l-.1,n=(s+a)/2,u=(a-s)/2;for(const h of[-1,1])e.seg([h*i,0,0],[h*i,a-.2,0],.035,.03,o.FLOWER,{group:1}),e.seg([h*i,.01,-r/2+.03],[h*i,.01,r/2-.03],.035,.035,o.FLOWER,{group:1}),e.ell([h*i,a-.15,0],[.05,.06,.05],o.FLOWER,{group:1});e.ell([0,n,0],[i-.07,u,.04],o.FLOWER,{group:2}),e.flat([0,n,.07],z,ne,i-.14,u-.07,(h,d)=>Math.hypot(h,d)>1?void 0:h+d*.7>.35&&h+d*.7<.6?o.BELLY:o.WEB,{group:3,bend:0}),K(e,[0,a+.02,0],7,.12,4,.6),e.seg([-i,a-.1,0],[-i+.03,a+.2,0],.09,.008,o.HAT1,{group:5,paint:h=>Math.floor(h[1]*16)%2?o.POM:void 0}),G(e,i-.1,.2,0,.24,.17,o.ACCENT,{group:6,paint:h=>h[1]>.2?o.BELLY:void 0}),e.ell([i-.1,.25,.2],[.2,.02,.2],o.HAT,{group:7}),e.seg([i-.1,.25,.2],[i-.02,.65,.18],.12,.01,o.HAT,{group:7,paint:h=>h[1]<.31?o.MAGIC:void 0})},hats(e,{W:t,D:r}){const l=t/2-.05,i=r/2-.05;e.ell([0,.012,0],[l,.012,i],o.CLOTH,{group:1,paint:s=>{const a=Math.hypot(s[0]/l,s[2]/i),n=Math.floor(a*7);return[o.CLOTH,o.ACCENT,o.FLOWER,o.CLOTH,o.BODY3,o.ACCENT,o.FLOWER][n%7]}});for(const s of[-1,1])for(let a=0;a<9;a++){const n=(a/8-.5)*i*1.2;e.seg([s*l*.99,.01,n],[s*(l+.1),.01,n],.012,.012,o.BELLY,{group:2})}},bags(e,{W:t,D:r,H:l}){const s=l*.8;for(const n of[-t/2+.06,t/2-.06])e.seg([n,.03,0],[n,s+.14,0],.035,.03,o.WOOD,{group:1}),e.seg([n,.03,-.3],[n,.03,.3],.04,.04,o.WOOD,{group:1}),e.ell([n,s+.18,0],[.05,.05,.05],o.FLOWER,{group:1});e.box([0,s,-.02],[t/2-.06,.05,.03],o.WOOD,{round:.01,group:1,paint:_e(.4)}),e.seg([-t*.2,s,-.08],[-t*.22,.05,-.12],.02,.02,o.SHADES,{group:14}),e.seg([-t*.2,s+.03,-.08],[-t*.2+.06,s+.12,-.08],.012,.012,o.SHADES,{group:14}),e.chain([[t*.25,s,-.07,.04],[t*.27,s*.6,-.1,.035],[t*.24,s*.3,-.1,.03]],o.ACCENT,{group:15,paint:n=>Math.floor(n[1]*10)%2?o.FLOWER:void 0});const a=[-t*.36,-t*.12,t*.12,t*.36];for(const n of a)e.chain([[n,s,-.02+.02,.018],[n,s-.02,-.02+.12,.016],[n,s+.04,-.02+.16,.014]],o.SHADES,{group:2});e.chain([[a[0]-.12,s,-.02+.14,.018],[a[0],s+.03,-.02+.15,.018],[a[0]+.12,s,-.02+.14,.018]],o.BODY2,{group:10}),e.box([a[0],s-.3,-.02+.14],[.18,.14,.06],o.BODY2,{round:.04,group:10,paint:n=>n[1]>s-.26?o.WOOD:Math.abs(n[0]-a[0])<.025&&n[1]>s-.32?o.FLOWER:void 0}),e.box([a[1],s-.3,-.02+.16],[.17,.24,.09],o.IRIS,{round:.08,group:11}),e.box([a[1],s-.38,-.02+.25],[.12,.1,.04],o.IRIS,{round:.04,group:11,paint:n=>Math.abs(n[1]-(s-.3))<.015?o.FLOWER:void 0}),e.ell([a[2],s-.2,-.02+.16],[.16,.08,.07],o.PHONES,{group:12}),e.box([a[3],s-.32,-.02+.13],[.17,.2,.04],o.BELLY,{round:.02,group:13,paint:n=>Math.hypot(n[0]-a[3],n[1]-(s-.3))<.07?o.SHADES:void 0});for(const n of[-1,1])e.seg([a[3]+n*.1,s-.12,-.02+.13],[a[3],s+.02,-.02+.15],.012,.012,o.BELLY,{group:13});e.box([t/2-.15,.12,.05],[.07,.1,.07],o.SHADES,{round:.01,group:20}),oe(e,[t/2-.15,.13,.05],.05,o.GLOW,21,[Q,12,.35]),e.chain([[t/2-.2,.23,.05,.01],[t/2-.15,.3,.05,.01],[t/2-.1,.23,.05,.01]],o.SHADES,{group:20})},invitations(e,{W:t,D:r,H:l},i){const s=l*.78,a=s+.03,n=[1,0,0],u=[0,0,1],h=Math.min(t*.13,r*.3);e.box([0,s,0],[t/2,.035,r/2],o.WOOD,{round:.02,group:1}),e.box([0,s-.07,0],[t/2-.06,.04,r/2-.06],o.HAIR,{group:2});for(const g of[-t/2+.08,t/2-.08])for(const p of[-r/2+.08,r/2-.08])e.seg([g,0,p],[g,s-.1,p],.035,.028,o.WOOD,{group:3}),e.ell([g,s*.55,p],[.05,.05,.05],o.HAIR,{group:3});for(const g of[-r/2+.05,r/2-.05])e.box([0,s-.07,g],[t*.18,.035,.01],o.BARKD,{group:4}),e.ell([0,s-.07,g+Math.sign(g)*.015],[.02,.02,.015],o.FLOWER,{group:4});const d=(g,p)=>(g*g+p*p-1)**3-g*g*p*p*p<=0,c=(g,p)=>d(g/.56,(p+.1)/.62)?o.ACCENT:Math.abs(g)>.88||Math.abs(p)>.84||Math.abs(p-Math.abs(g)*.84)<.08?o.IRIS:o.BELLY,f=(g,p,b,y=0)=>{const w=Y(n,p),M=Y([0,0,-1],p),A=Math.cos(y),L=Math.sin(y),x=[M[0]*A,-L,M[2]*A],E=[M[0]*L,A,M[2]*L];e.box([g[0]-E[0]*.008,g[1]-E[1]*.008,g[2]-E[2]*.008],[h*.97,.004,h*.65],o.BELLY,{group:b,dir:w,up:E,round:.003}),e.flat([g[0]+E[0]*.006,g[1]+E[1]*.006,g[2]+E[2]*.006],w,x,h,h*.68,c,{group:b+1,bend:0})},v=(i??"8,8,8").split(",").map(Number),m=[o.POM,o.HAT1,o.FLOWER];[-t*.3,0,t*.3].forEach((g,p)=>{const y=Math.min(10,v[p]??0);e.box([g,a+.01,0],[h*1.25,.012,h*.95],m[p],{round:.012,group:10+p*4});for(let w=0;w<y;w++)f([g+(w-(y-1)/2)*h*.09+(S(p,w,3)-.5)*h*.2,a+.02+w*.014,0+(S(p,w,4)-.5)*h*.3],(S(p,w,5)-.5)*.9,11+p*4);y>4&&f([g+h*.9,a+.03,0+h*.6],.9+p,12+p*4),y>0&&f([g,a+.02+y*.014+h*.3,0+h*.25],(S(p,9,1)-.5)*.3,13+p*4,-1.05)}),f([-t/2+.02,s-.02,r*.3],.3,30,.7),f([t/2-.02,s-.03,-r*.25],-.4,32,-.6),f([t*.1,s-.02,r/2-.01],1.2,34,.8);for(let g=0;g<16;g++){const p=S(g,7,1)*Math.PI*2,b=.55+S(g,7,2)*.45,y=Math.cos(p)*(t/2+.1)*b*1.15,w=Math.sin(p)*(r/2+.1)*b*1.3;f([y,.03+g%3*.004,w],(S(g,7,3)-.5)*2.4,40+g%6*2,-.3)}G(e,t*.15,-r*.3,a,a+.07,.045,o.SHADES,{group:70}),e.flat([t*.15+.05,a+.2,-r*.3],[.3,1,0],u,.04,.14,(g,p)=>Math.abs(g)<(1-p*p)*.9?o.BELLY:void 0,{group:71,bend:.3})},pegboard(e,{W:t,D:r,H:l}){const a=l-.35,n=(.55+a)/2,u=(a-.55)/2,h=0+.035;for(const v of[-1,1]){const m=v*(t/2+.06);e.seg([m,0,0-.02],[m,a+.1,0-.02],.04,.035,o.WOOD,{group:3}),e.seg([m,.03,-.32],[m,.03,.32],.045,.045,o.WOOD,{group:3}),e.seg([m,.05,-.28],[m,n,0-.04],.02,.02,o.WOOD,{group:3}),e.ell([m,a+.14,0-.02],[.05,.05,.05],o.FLOWER,{group:3})}for(const v of[-1,1])e.seg([v*t*.45,.55,0-.035],[-v*t*.45,a,0-.035],.02,.02,o.BARKD,{group:3});e.box([0,n,0],[t/2,u,.02],o.CLOTH,{group:1,paint:v=>Math.abs((v[0]*9%1+1)%1-.5)<.1&&Math.abs((v[1]*9%1+1)%1-.5)<.1?o.BARKD:void 0}),e.box([0,n,0-.012],[t/2+.05,u+.05,.015],o.WOOD,{round:.01,group:2});const d=(t-.12)/3,c=(2*u-.12)/3;for(let v=0;v<3;v++)for(let m=0;m<3;m++){const g=-t/2+.06+d*(m+.5),p=a-.06-c*(v+.5),b=xo[v*3+m],y=.025;for(const w of[-1,1])e.box([g,p+w*(c/2-.03),h],[d/2-.04,y,.012],b,{group:10+v*3+m});for(const w of[-1,1])e.box([g+w*(d/2-.04),p,h],[y,c/2-.03,.012],b,{group:10+v*3+m});(e.marks??={})[`cell${v*3+m}`]=[g,p,h+.03];for(const w of[-.2,.2]){const M=g+w*Math.cos(_t),A=p+w*Math.sin(_t)-.045;e.seg([M,A,h],[M,A,h+.07],.016,.014,o.BARKD,{group:40+v*3+m})}}const f=[0,a+.2,h-.01];e.ell(f,[.16,.16,.02],o.FLOWER,{group:30});for(const[v,m,g]of[[0,1,o.ACCENT],[0,-1,o.BARKD],[1,0,o.BARKD],[-1,0,o.BARKD]])e.seg([f[0],f[1],f[2]+.02],[f[0]+v*.2,f[1]+m*.2,f[2]+.02],.035,.005,g,{group:31});K(e,[-t/2,a+.05,0+.05],5,.12,32),K(e,[t/2+.06,.55*.5,0+.05],4,.1,33,.2)},broomBay(e,{W:t,D:r,H:l}){const i=l*.82,s=[-t*.28,t*.18];for(const[n,u]of s.entries()){for(const h of[-1,1])for(const d of[-1,1])e.seg([u+h*.05,i-.05,0],[u+h*.22,0,d*r*.2],.03,.03,o.WOOD,{group:1+n});e.box([u,i-.05,0],[.06,.04,r*.22],o.WOOD,{round:.01,group:1+n}),e.ell([u,i-.01,0],[.07,.04,.12],o.ACCENT,{group:3+n})}(e.marks??={}).rest=[(s[0]+s[1])/2,i+.04,0],xe(e,s[0]-.2,r*.2,.05,i*.8,5,.05),e.box([-t*.05,.07,r*.32],[.45,.025,.17],o.BARKD,{round:.02,group:10,paint:n=>n[0]<-t*.05-.3?o.ACCENT:void 0});for(const[n,u]of[[-.38,-.12],[.38,-.12],[-.38,.12],[.38,.12]])e.ell([-t*.05+n,.03,r*.32+u],[.03,.03,.03],o.SHADES,{group:11});const a=t/2-.22;e.box([a,.45,-r*.1],[.2,.43,.18],o.ACCENT,{round:.02,group:20,paint:n=>Math.abs((n[1]/.14%1+1)%1-.5)>.45?o.BARKD:void 0});for(let n=0;n<6;n++)e.box([a,.14+n*.14,-r*.1+.19],[.08,.01,.01],o.FRAME,{group:21});e.seg([a-.1,.9,-r*.1],[a+.08,.9,-r*.1+.06],.015,.015,o.FRAME,{group:22}),G(e,a+.08,-r*.1-.05,.88,1,.045,o.FLOWER,{group:23}),e.seg([s[1]+.1,i-.05,-.05],[s[1]+.25,i+.35,-.1],.012,.012,o.SHADES,{group:30}),e.seg([s[1]+.25,i+.35,-.1],[s[1]+.2,i+.25,.05],.05,.08,o.SHADES,{group:31}),oe(e,[s[1]+.2,i+.24,.07],.035,o.WOKEN,32,[Q,14,.4])},lathe(e,{W:t,D:r,H:l},i){const s=l*.45;e.box([0,s,0],[t/2,.04,r/2],o.WOOD,{round:.015,group:1,paint:_e(.3)});for(const f of[-t/2+.08,t/2-.08])for(const v of[-r/2+.06,r/2-.06])e.seg([f,0,v],[f,s,v],.04,.04,o.WOOD,{group:2});e.box([0,s*.25,0],[t/2-.1,.02,r/2-.08],o.WOOD,{group:3});const a=s+.04,n=-t*.08,u=t*.55;for(const f of[-.05,.05])e.seg([n-u/2,a+.05,f],[n+u/2,a+.05,f],.02,.02,o.FRAME,{group:10});e.box([n-u/2,a+.16,0],[.09,.14,.1],o.HAT1,{round:.02,group:11}),e.ell([n-u/2-.05,a+.32,0],[.07,.07,.07],o.SHADES,{group:12}),e.box([n+u/2-.05,a+.12,0],[.06,.1,.08],o.HAT1,{round:.02,group:13}),(e.marks??={}).rest=[n,a+.22,0],[o.ACCENT,o.IRIS,o.FLOWER,o.POM,o.LEAF2].forEach((f,v)=>{const m=t*.26+v%3*.14,g=-r*.2+Math.floor(v/3)*.2;G(e,m,g,a,a+.12,.055,o.FRAME,{group:20+v,paint:p=>p[1]>a+.09||p[1]>a+.03&&Math.sin(Math.atan2(p[2]-g,p[0]-m)*5)>.7?f:void 0})}),G(e,t*.42,r*.2,a,a+.12,.05,o.CRYSTAL,{group:30});for(let f=0;f<3;f++)e.seg([t*.42+(f-1)*.02,a+.08,r*.2],[t*.42+(f-1)*.05,a+.3,r*.2],.01,.016,f?o.WOOD:o.STRAW,{group:31+f});e.ell([t*.1,a+.02,r*.25],[.12,.025,.08],o.BELLY,{group:35,rough:.01,paint:f=>S(Math.round(f[0]*40),Math.round(f[2]*40),4)>.7?o.ACCENT:void 0});for(let f=0;f<6;f++){const v=f*1.1;e.ell([n+Math.cos(v)*.3,.015,r*.35+Math.sin(v)*.15],[.05,.012,.03],o.STRAW,{group:40,dir:[Math.cos(v),0,Math.sin(v)]})}const d=Number(i??3),c=(f,v,m)=>{const g=[f[0]+(v[0]-f[0])*.72,f[1]+(v[1]-f[1])*.72,f[2]+(v[2]-f[2])*.72];e.seg(f,g,.06,.065,o.BARKD,{group:m}),e.seg(g,[g[0]+(v[0]-f[0])*.03,g[1]+(v[1]-f[1])*.03,g[2]+(v[2]-f[2])*.03],.08,.08,o.FRAME,{group:m+1}),e.seg(g,v,.09,.17,o.STRAW,{group:m+2,paint:p=>S(Math.round(p[0]*60),Math.round(p[1]*60),7)>.8?o.BROOM:void 0})};d>=1&&c([n-u*.55,a+.42,.12],[n+u*.6,a+.36,.12],50),d>=2&&c([-t/2-.02,s+.55,r/2-.1],[-t/2-.28,.02,r/2+.25],54),d>=3&&c([t/2+.02,s+.55,r/2-.1],[t/2+.3,.02,r/2+.2],58)},recordShelf(e,{W:t,D:r,H:l}){for(let a=0;a<=4;a++)e.box([0,.05+a*(l-.1)/4,0],[t/2,.025,r/2-.02],o.WOOD,{round:.008,group:1});for(const a of[-1,1])e.box([a*(t/2-.02),l/2,0],[.025,l/2,r/2-.02],o.BARKD,{group:2});for(const a of[-1,1])for(const n of[-1,1])e.ell([a*(t/2-.02),.02,n*(r/2-.04)],[.04,.03,.04],o.BARKD,{group:2});const s=[o.ACCENT,o.FLOWER,o.HAT1,o.BELLY,o.POM,o.IRIS,o.CLOTH,o.SHADES];for(let a=0;a<4;a++){const n=.075+a*(l-.1)/4,u=(l-.1)/4-.06;a===2&&(e.seg([t*.25,n,0],[t*.25,n+.1,0],.07,.05,o.FRAME,{group:30}),e.ell([t*.25,n+.2,0],[.055,.1,.055],o.MAGIC,{group:31,extra:!0,paint:h=>S(Math.round(h[1]*30),1,7)>.6?o.MAGIC2:void 0}),U(e,[t*.25,n+.2,.1],he,12,.35));for(let h=-t/2+.07,d=0;h<t/2-.07-(a===2?t*.35:0);h+=.045,d++){if(S(a,d,5)>.9){h+=.05;continue}e.box([h,n+u/2,.01],[.02,u/2,r/2-.06],s[Math.floor(S(d,a,3)*s.length)],{group:10+a,dir:Y(z,0),up:[S(d,a,2)>.8?.15:0,1,0]})}}e.box([-t*.15,l+.06,0],[.22,.05,.18],o.SHADES,{round:.015,group:40}),$(e,[-t*.15-.03,l+.12,0],.15,.01,o.BARKD,{group:41,paint:a=>Math.hypot(a[0]+t*.15+.03,a[2])<.04?o.ACCENT:void 0}),e.seg([-t*.15+.17,l+.12,-.12],[-t*.15+.05,l+.13,.05],.01,.01,o.FRAME,{group:42}),e.box([t/2+.25,.16,.05],[.2,.16,.2],o.WOOD,{group:50,paint:_e(.1)});for(let a=0;a<5;a++)e.box([t/2+.25-.12+a*.06,.32,.05],[.012,.14,.17],s[a*3%s.length],{group:51,dir:Y(z,0),up:[-.25,1,0]});G(e,-t/2+.12,0,l+.03,l+.15,.08,o.BODY2,{group:60}),K(e,[-t/2+.12,l+.18,0],4,.1,61);for(let a=0;a<6;a++)e.ell([-t/2-.03,l-.1-a*.22,.05+a%2*.04],[.05,.08,.05],[o.LEAF,o.LEAF2][a%2],{group:62,dir:[-.3,-1,.2]})},cauldron(e,{W:t,D:r}){const l=Math.min(t,r)/2-.05,i=l*.78;for(let s=0;s<9;s++){const a=s/9*Math.PI*2;e.ell([Math.cos(a)*l,.06,Math.sin(a)*l],[.1,.07,.09],o.STONE,{group:1+s%2,rough:.01})}e.ell([0,.03,0],[l*.7,.03,l*.7],o.STONED,{group:3,paint:s=>S(Math.round(s[0]*20),Math.round(s[2]*20),1)>.82?o.GLOW:void 0});for(let s=0;s<3;s++){const a=s*2.1+.5;e.seg([Math.cos(a)*i*.8,.45,Math.sin(a)*i*.8],[Math.cos(a)*i*.95,.05,Math.sin(a)*i*.95],.04,.03,o.SHADES,{group:4})}e.ell([0,.52,0],[i,i*.72,i],o.SHADES,{group:5,paint:s=>s[1]>.52+i*.5?o.BARKD:void 0}),e.ell([0,.52+i*.6,0],[i*.82,.06,i*.82],o.SHADES,{group:6}),e.ell([0,.52+i*.62,0],[i*.74,.04,i*.74],o.MAGIC,{group:7,paint:s=>S(Math.round(s[0]*14),Math.round(s[2]*14),6)>.75?o.MAGIC2:void 0}),U(e,[0,.52+i*.7,0],Je,14,.35),e.seg([i*.3,.52+i*.6,0],[i*1.15,.52+i*1.3,-.05],.022,.022,o.WOOD,{group:8}),e.seg([-l*.9,.1,l*.7],[-l*.5,.08,l*.95],.05,.08,o.LEAF2,{group:9,paint:s=>Math.abs(s[0]+l*.75)<.025?o.STRAW:void 0}),e.box([l*.85,.12,l*.75],[.09,.12,.04],o.FLOWER,{round:.03,group:10,dir:Y(z,.4),paint:s=>Math.abs(s[1]-.14)<.04?o.ACCENT:void 0})},teaTable(e,{W:t,D:r,H:l}){const i=Math.min(t,r)/2-.03,s=l;$(e,[0,s-.03,0],i,.03,o.WOOD,{group:1}),e.ell([0,s-.01,0],[i+.05,.02,i+.05],o.BELLY,{group:2,paint:n=>{const u=Math.hypot(n[0],n[2]);return u>i-.02&&Math.sin(Math.atan2(n[2],n[0])*24)>.3?void 0:u>i-.1?o.WEB:void 0}});for(let n=0;n<4;n++){const u=n*Math.PI/2+.78;e.chain([[Math.cos(u)*i*.7,s-.05,Math.sin(u)*i*.7,.04],[Math.cos(u)*i*.76,s*.5,Math.sin(u)*i*.76,.03],[Math.cos(u)*i*.72,.02,Math.sin(u)*i*.72,.035]],o.WOOD,{group:3}),K(e,[Math.cos(u)*i*.8,.05,Math.sin(u)*i*.8],3,.07,4+n,.8)}const a=s+.01;e.ell([-i*.25,a+.14,-i*.1],[.15,.13,.14],o.BELLY,{group:10,paint:n=>S(Math.round(n[0]*25),Math.round(n[1]*25),3)>.78?o.POM:S(Math.round(n[0]*25),Math.round(n[1]*25),4)>.9?o.LEAF2:void 0}),e.seg([-i*.25+.12,a+.14,-i*.1],[-i*.25+.25,a+.24,-i*.1],.04,.018,o.BELLY,{group:10}),e.ell([-i*.25,a+.28,-i*.1],[.03,.03,.03],o.FLOWER,{group:11});for(const[n,u]of[[i*.3,i*.3],[-i*.45,i*.4]])$(e,[n,a+.01,u],.08,.008,o.BELLY,{group:12}),G(e,n,u,a+.01,a+.09,.045,o.HAT1,{group:13});e.seg([i*.35,a,-i*.3],[i*.35,a+.14,-i*.3],.02,.02,o.FLOWER,{group:14}),$(e,[i*.35,a+.14,-i*.3],.13,.008,o.FLOWER,{group:14}),G(e,i*.35,-i*.3,a+.14,a+.25,.1,o.POM,{group:15,paint:n=>n[1]>a+.22?o.BELLY:Math.abs(n[1]-(a+.19))<.012?o.ACCENT:void 0}),G(e,0,i*.55,a,a+.12,.05,o.CRYSTAL,{group:16});for(let n=0;n<5;n++){const u=n*1.26;e.ell([Math.cos(u)*.06,a+.2+n%2*.04,i*.55+Math.sin(u)*.05],[.04,.035,.04],[o.FLOWER,o.POM,o.BELLY][n%3],{group:17})}K(e,[0,a+.14,i*.55],3,.05,18,.9)},cardTable(e,{W:t,D:r,H:l}){const i=Math.min(t,r)/2-.04,s=l;$(e,[0,s-.03,0],i,.03,o.BARKD,{group:1}),$(e,[0,s+.002,0],i-.07,.006,o.CLOTH,{group:2});for(const[n,u]of[[-1,-1],[1,-1],[-1,1],[1,1]].map(([h,d])=>[h*.68,d*.68]))e.chain([[n*(i-.1),s-.05,u*(i-.1),.045],[n*(i-.02),s*.5,u*(i-.02),.035],[n*(i-.12),.05,u*(i-.12),.04]],o.BARKD,{group:3}),e.ell([n*(i-.14),.03,u*(i-.14)],[.05,.03,.05],o.FLOWER,{group:3});const a=s+.01;for(const[n,u,h]of[[0,i*.5,0],[-i*.5,0,1.57],[i*.5,-i*.1,-1.57]])for(let d=0;d<3;d++){const c=h+(d-1)*.25;e.flat([n+Math.sin(c)*.04,a+d*.002,u+Math.cos(c)*.02],Y(z,c),Y(le,c),.06,.09,(f,v)=>Math.abs(f)>.75||Math.abs(v)>.82?o.BELLY:o.ACCENT,{group:10+d,bend:0})}for(const[n,u,h]of[[-i*.15,-i*.4,o.ACCENT],[i*.05,-i*.45,o.IRIS],[i*.25,-i*.42,o.BELLY]])for(let d=0;d<4;d++)$(e,[n,a+.015+d*.026,u],.055,.013,d%2?h:o.BELLY,{group:20});e.seg([-i*.45,a,-i*.45],[-i*.45,a+.3,-i*.45],.03,.02,o.FLOWER,{group:30}),e.chain([[-i*.45-.15,a+.32,-i*.45,.015],[-i*.45,a+.26,-i*.45,.015],[-i*.45+.15,a+.32,-i*.45,.015]],o.FLOWER,{group:30});for(const n of[-.15,0,.15])Te(e,[-i*.45+n,a+(n?.32:.3),-i*.45],31+Math.round(n*10),.12,n===0);e.box([i*.4,a+.01,i*.45],[.07,.01,.12],o.SHADES,{group:40,dir:Y(z,.6)})},book(e,{W:t,D:r,H:l}){const i=l*.85;e.ell([0,.05,0],[t*.35,.05,r*.35],o.BARKD,{group:1}),e.chain([[0,.08,0,.08],[0,i*.5,0,.05],[0,i-.1,-.03,.07]],o.BARKD,{group:2,paint:s=>Math.sin(s[1]*30)>.7?o.HAIR:void 0}),xe(e,0,0,.15,i*.8,3,.06),e.box([0,i-.04,0],[t/2-.05,.04,r/2-.05],o.BARKD,{group:4,dir:[1,0,0],up:[0,1,.45]});for(const s of[-1,1])e.flat([s*(t/4-.02),i+.03,.02],z,[0,.45,-1],t/4-.02,r/2-.1,(a,n)=>Math.abs(a)>.9||Math.abs(n)>.9?o.ACCENT:Math.abs((n*4%1+1)%1-.5)<.12&&Math.abs(a)<.7?S(Math.round(a*6),Math.round(n*8),s)>.55?o.RUNE:o.BARKD:o.BELLY,{group:5+(s>0),bend:.4});U(e,[0,i+.15,.05],[110,255,196],10,.25);for(const s of[-.05,.04])e.seg([s,i,.2],[s+.01,i-.35,.25],.015,.015,s<0?o.ACCENT:o.FLOWER,{group:8});e.seg([t/2-.05,i-.05,0],[t/2+.05,i-.02,.05],.015,.015,o.FLOWER,{group:9}),Te(e,[t/2+.05,i-.02,.05],10)},specimens(e,{W:t,D:r,H:l}){const i=-r/2+.02,s=[.05,l*.4,l*.72];for(const u of s)e.box([0,u,0],[t/2,.03,r/2-.02],o.BARKD,{round:.01,group:1});for(const u of[-t/2+.03,-t/6,t/6,t/2-.03])e.box([u,l*.37,0],[.025,l*.37,r/2-.02],o.BARKD,{group:2});e.box([0,l*.37,i],[t/2,l*.37,.012],o.BODY3,{group:2}),e.box([0,l*.37,i-.02],[t/2+.01,l*.37+.01,.012],o.BARKD,{group:2,paint:u=>Math.abs((u[0]/.18%1+1)%1-.5)>.46?o.HAIR:void 0}),e.box([0,l*.755,0],[t/2+.03,.025,r/2+.01],o.BARKD,{round:.01,group:2});for(const u of[-1,1])for(const h of[-1,1])e.ell([u*(t/2-.03),.02,h*(r/2-.05)],[.045,.035,.045],o.BARKD,{group:2});const a=(u,h,d,c,f=!1)=>{e.ell([u,h+d*.9,0],[d*.8,d*.75,d*.9],o.BELLY,{group:c}),e.ell([u,h+d*.4,d*.35],[d*.5,d*.35,d*.45],o.BELLY,{group:c});for(const v of[-1,1])e.ell([u+v*d*.32,h+d*.85,d*.7],[d*.2,d*.2,d*.08],o.SHADES,{group:c+50});f&&K(e,[u,h+d*1.7,0],5,d*.6,c+100,.8)};a(-t/3,s[0]+.03,.16,10,!0);for(const[u,h]of[[0,o.MAGIC],[t*.12,o.CRYSTAL]])G(e,u,0,s[0]+.03,s[0]+.3,.09,o.CRYSTAL,{group:20}),e.ell([u,s[0]+.15,0],[.06,.08,.06],h===o.MAGIC?o.MAGIC:o.LEAF2,{group:21,extra:h===o.MAGIC}),e.ell([u,s[0]+.31,0],[.09,.02,.09],o.FLOWER,{group:22});U(e,[0,s[0]+.15,.1],Je,9,.2),a(t/3,s[0]+.03,.13,12);for(let u=0;u<3;u++)a(-t/3+u*t/3,s[1]+.03,.09,14+u);e.box([t*.3,s[2]+.2,i+.02],[.17,.14,.015],o.WOOD,{group:30}),e.flat([t*.3,s[2]+.2,i+.04],z,ne,.12,.09,(u,h)=>Math.abs(u)<.9*(1-Math.abs(h)*.4)&&Math.abs(u)>.08?Math.hypot(Math.abs(u)-.45,h)<.15?o.FLOWER:o.BODY2:Math.abs(u)<.08?o.SHADES:o.BELLY,{group:31,bend:0}),G(e,-t*.05,0,s[2]+.03,s[2]+.25,.07,o.CRYSTAL,{group:32});const n=l*.95;e.box([-t*.2,l*.79,0],[.1,.04,.08],o.WOOD,{round:.01,group:39}),e.seg([-t*.2,l*.8,0],[-t*.2,n-.08,i+.1],.02,.02,o.BARKD,{group:39}),e.ell([-t*.2,n,i+.1],[.1,.14,.1],o.BELLY,{group:40});for(const u of[-1,1]){const h=[-t*.2+u*.06,n+.12,i+.1];e.chain([[...h,.025],[h[0]+u*.18,h[1]+.2,h[2],.02],[h[0]+u*.25,h[1]+.45,h[2],.012]],o.BELLY,{group:41}),e.seg([h[0]+u*.18,h[1]+.2,h[2]],[h[0]+u*.35,h[1]+.3,h[2]],.015,.008,o.BELLY,{group:41})}},telescope(e,{W:t,D:r,H:l}){const i=[0,l*.7,0];for(let c=0;c<3;c++){const f=c*2.1+.5;e.seg(i,[Math.cos(f)*t*.45,0,Math.sin(f)*r*.45],.03,.025,o.WOOD,{group:1})}e.ell(i,[.06,.05,.06],o.FRAME,{group:2});const s=[.25,.7,-.55],a=1.1,n=Math.hypot(...s),u=s.map(c=>c/n),h=i.map((c,f)=>c-u[f]*a*.35),d=i.map((c,f)=>c+u[f]*a*.65);e.seg(h,d,.06,.09,o.FLOWER,{group:3,paint:c=>Math.abs((c[1]*6%1+1)%1-.5)<.05?o.WOOD:void 0}),e.ell(d,[.095,.095,.095],o.FLOWER,{group:3,paint:()=>o.FLOWER}),e.ell(d.map((c,f)=>c+u[f]*.02),[.07,.07,.07],o.CRYSTAL,{group:4}),e.seg(h,h.map((c,f)=>c-u[f]*.12),.03,.025,o.SHADES,{group:5}),e.seg(i.map((c,f)=>c+u[f]*.1+[0,.1,0][f]),i.map((c,f)=>c+u[f]*.4+[0,.1,0][f]),.02,.02,o.FLOWER,{group:6}),e.box([t*.5,.3,r*.3],[.14,.025,.14],o.WOOD,{round:.02,group:10});for(const[c,f]of[[-1,-1],[1,-1],[-1,1],[1,1]])e.seg([t*.5+c*.1,.3,r*.3+f*.1],[t*.5+c*.12,0,r*.3+f*.12],.02,.02,o.WOOD,{group:10});e.seg([t*.5-.12,.36,r*.3],[t*.5+.12,.36,r*.3+.03],.035,.035,o.BELLY,{group:11,paint:c=>Math.abs(c[0]-t*.5)<.02?o.IRIS:void 0}),e.box([-t*.25,.5,r*.25],[.05,.07,.05],o.SHADES,{round:.01,group:12}),oe(e,[-t*.25,.5,r*.25],.035,o.GLOW,13,[Q,10,.3])},mapTable(e,{W:t,D:r,H:l}){const i=Math.min(t,r)/2-.05,s=l;$(e,[0,s-.04,0],i,.04,o.WOOD,{group:1,paint:n=>Math.hypot(n[0],n[2])>i-.06?o.BARKD:void 0}),e.chain([[0,s-.06,0,.14],[0,s*.5,0,.1],[0,.05,0,.17]],o.BARKD,{group:2,rough:.01});for(let n=0;n<5;n++){const u=n*1.26+.3;e.chain([[0,.08,0,.08],[Math.cos(u)*i*.5,.05,Math.sin(u)*i*.5,.05],[Math.cos(u)*i*.8,.02,Math.sin(u)*i*.8,.025]],o.BARKD,{group:3}),n%2&&K(e,[Math.cos(u)*i*.75,.06,Math.sin(u)*i*.75],3,.07,4+n,.8)}const a=[[.3,.2,.16],[-.35,-.1,.2],[.05,-.4,.12],[-.1,.45,.1],[.5,-.3,.08]];e.flat([0,s+.005,0],z,le,i*.82,i*.62,(n,u)=>{if(Math.abs(n)>.95||Math.abs(u)>.93)return o.BODY2;for(const[d,c,f]of a)if(Math.hypot(n-d,u-c)<f*(1+.3*Math.sin(n*20+u*13)))return Math.hypot(n-d,u-c)>f*.75?o.STRAW:o.LEAF2;return Math.hypot(n+.65,u-.6)<.12&&Math.abs(Math.atan2(u-.6,n+.65)%(Math.PI/2))<.25?o.ACCENT:o.WATER},{group:10,bend:.05}),$(e,[i*.45,s+.03,i*.35],.08,.02,o.FLOWER,{group:11,paint:n=>Math.hypot(n[0]-i*.45,n[2]-i*.35)<.06?o.BELLY:void 0}),Te(e,[-i*.55,s,-i*.3],12,.14),G(e,i*.5,-i*.4,s,s+.1,.05,o.ACCENT,{group:13})},drumKit(e,{W:t,D:r}){const l=h=>d=>S(Math.round(d[0]*40),Math.round(d[1]*40)+Math.round(d[2]*40),h)>.72?o.BELLY:void 0,i=r*.12,s=Math.min(.32,t*.15);e.seg([0,s+.02,i-.25],[0,s+.02,i+.2],s,s,o.POM,{group:1,paint:l(1)}),e.flat([0,s+.02,i+.23],z,ne,s*.92,s*.92,(h,d)=>{if(Math.hypot(h,d)>1)return;const c=Math.atan2(d,h),f=Math.hypot(h,d),v=.32+.18*Math.cos(c*5);return f<v?o.COLLAR:o.SHADES},{group:2,bend:0}),U(e,[0,s,i+.4],Se,12,.35);for(const h of[i-.25,i+.2])e.ell([0,s+.02,h],[s+.02,s+.02,.015],o.FRAME,{group:3});const a=(h,d,c,f,v=0)=>{e.seg(h,[h[0],h[1]+c,h[2]+v],d,d,o.POM,{group:f,paint:l(f)}),e.ell([h[0],h[1]+c+.01,h[2]+v],[d*.96,.012,d*.96],o.BELLY,{group:f+1})};a([-.15,s*2+.1,i-.05],.13,.14,10,-.05),a([.17,s*2+.1,i-.05],.15,.15,12,-.05),a([t*.33,.02,i-.1],.19,.42,14);for(const h of[-1,1])e.seg([t*.33+h*.15,0,i-.1],[t*.33+h*.16,.12,i-.1],.015,.015,o.FRAME,{group:16});e.seg([-t*.22,0,i-.2],[-t*.22,.5,i-.2],.015,.015,o.FRAME,{group:17}),a([-t*.22,.5,i-.2],.16,.1,18);const n=(h,d,c,f,v)=>{e.seg([h,0,d],[h,c,d],.014,.012,o.FRAME,{group:v});for(const m of[0,2.1,4.2])e.seg([h,.03,d],[h+Math.cos(m)*.14,0,d+Math.sin(m)*.14],.01,.01,o.FRAME,{group:v});e.ell([h,c+.02,d],[f,.012,f],o.FLOWER,{group:v+1,dir:[1,.25,0],up:[0,1,.3]})};n(-t*.38,i-.3,.78,.17,20),e.ell([-t*.38,.82,i-.3],[.17,.012,.17],o.FLOWER,{group:22}),n(-t*.2,i-.45,1.2,.23,23),n(t*.3,i-.5,1.1,.26,25);const u=-r*.38;e.seg([0,0,u],[0,.45,u],.03,.03,o.FRAME,{group:30}),e.ell([0,.5,u],[.17,.06,.17],o.SHADES,{group:31}),e.ell([.05,.55,u+.02],[.18,.08,.16],o.HAT1,{group:32,rough:.01}),e.seg([.15,.52,u+.1],[.22,.2,u+.18],.06,.05,o.HAT1,{group:32});for(const h of[-1,1])e.seg([-t*.22+h*.03,.62,i-.3],[-t*.22+h*.05+.1,.63,i-.02],.012,.01,o.WOOD,{group:33});e.seg([t*.42,0,-r*.45],[t*.42,.9,-r*.45],.015,.015,o.FRAME,{group:40});for(let h=0;h<5;h++){const d=h*1.26-Math.PI/2,c=d+1.26;e.seg([t*.42+Math.cos(d)*.14,1.05+Math.sin(d)*.14,-r*.45],[t*.42+Math.cos(c)*.14,1.05+Math.sin(c)*.14,-r*.45],.016,.016,o.MAGIC,{group:41,extra:!0})}U(e,[t*.42,1.05,-r*.35],he,10,.3),G(e,-t*.44,-r*.4,0,.2,.1,o.BODY2,{group:42}),K(e,[-t*.44,.26,-r*.4],6,.12,43,.7)},synthRack(e,{W:t,D:r,H:l}){const s=r/2-.03,a=-r/2+.12,n=[1,0,0];e.box([0,.6,0],[t/2,.03,r/2],o.WOOD,{round:.01,group:1});for(const p of[-t/2+.05,t/2-.05])for(const b of[-r/2+.05,r/2-.05])e.seg([p,0,b],[p,.6,b],.025,.025,o.FRAME,{group:1});const u=[o.COLLAR,o.RUNE,o.GLINT,o.WOKEN],h=.23,d=[[.6+.27,a+.22,.22],[.6+.78,a+.11,.1],[.6+1.29,a,0]],c=[];d.forEach(([p,b,y],w)=>{for(const[M,A,L,x]of[[-1,-t/2+.03,-t*.18,.5],[0,-t*.17,t*.17,0],[1,t*.18,t/2-.03,-.5]]){const E=(L-A)/2,F=(A+L)/2,O=b+Math.abs(M)*.12,k=Y(n,M?x:0),R=[0,Math.cos(y),Math.sin(y)],N=[k[1]*R[2]-k[2]*R[1],k[2]*R[0]-k[0]*R[2],k[0]*R[1]-k[1]*R[0]],ae=10+w*3+M+1,ye=D=>(D[0]-F)*k[0]+(D[2]-O)*k[2];e.box([F,p,O],[E,h,.05],o.FRAME,{round:.006,group:ae,dir:k,up:R,paint:D=>Math.abs((ye(D)/.12%1+1)%1-.5)>.45||Math.abs(D[1]-p)>h-.02?o.SHADES:void 0});const J=(D,B,te=.06)=>[F+k[0]*D+N[0]*te,p+R[1]*B+N[1]*te,O+k[2]*D+R[2]*B+N[2]*te];c.push({at:J,hw:E});const ie=Math.max(1,Math.round(E*2/.12));for(let D=0;D<ie;D++){const B=-E+(D+.5)*(2*E)/ie;e.ell(J(B,.06,.065),[.026,.026,.016],o.SHADES,{group:30+w,dir:N}),e.ell(J(B,-.08,.065),[.018,.018,.014],S(D,w,5)>.6?o.ACCENT:o.SHADES,{group:30+w,dir:N}),oe(e,J(B,.17,.06),.02,u[(D+w+M+4)%u.length],40+w,D%3===1?[[Se,Je,Ue,Q][(D+w+M+4)%4],9,.3]:null)}}});const f=[o.ACCENT,o.JACKET,o.FLOWER,o.IRIS],v=[];c.forEach((p,b)=>{for(const y of[-.6,.6])v.push(p.at(y*p.hw,-.15,.08))});for(let p=0;p<12;p++){const b=v[Math.floor(S(p,1,31)*v.length)],y=v[Math.floor(S(p,2,31)*v.length)];if(Math.hypot(b[0]-y[0],b[1]-y[1])<.3)continue;const w=.18+S(p,3,31)*.25,M=[(b[0]+y[0])/2,Math.min(b[1],y[1])-w,Math.max(b[2],y[2])+.1],A=L=>{const x=1-L;return[x*x*b[0]+2*x*L*M[0]+L*L*y[0],x*x*b[1]+2*x*L*M[1]+L*L*y[1],x*x*b[2]+2*x*L*M[2]+L*L*y[2],.02]};e.chain([0,.2,.4,.6,.8,1].map(A),f[p%f.length],{group:60+p%8})}for(let p=0;p<2;p++){const b=-t*.25+p*t*.45;e.chain([[b,.6+.2,a+.3,.02],[b+.05,.6+.03,s+.03,.02],[b+.02,.6*.5,s+.12,.02],[b+.14,.02,s+.25,.02]],f[p*3],{group:70+p})}const m=s-.16,g=t*.42;e.box([0,.6+.05,m],[g,.03,.13],o.SHADES,{round:.01,group:80}),e.box([0,.6+.075,m+.04],[g-.03,.012,.08],o.BELLY,{group:81,paint:p=>Math.abs((p[0]/.05%1+1)%1-.5)>.42?o.SHADES:void 0});for(let p=0;p<Math.floor(g*2/.05);p++)[1,2,4,5,6].includes(p%7)&&e.box([-g+.03+p*.05,.6+.09,m+.015],[.013,.009,.045],o.SHADES,{group:82});e.box([0,.6-.02,s+.01],[t/2-.03,.015,.012],o.GLINT,{group:2}),e.box([0,.6+.06,m-.135],[g,.012,.008],o.GLINT,{group:2}),U(e,[0,.6+.1,s+.1],Ue,18,.5),U(e,[0,.6+1.1,a+.5],Q,22,.45)},microphone(e,{W:t,D:r,H:l}){const i=Math.min(t,r)/2;$(e,[0,.006,0],i*1.3,.006,o.CLOTH,{group:1,paint:n=>Math.hypot(n[0],n[2])>i*1.1?o.FLOWER:Math.hypot(n[0],n[2])<i*.5?o.ACCENT:void 0}),$(e,[0,.03,0],i*.45,.02,o.FRAME,{group:2}),e.seg([0,.03,0],[0,l*.78,0],.016,.014,o.FRAME,{group:3}),e.ell([0,l*.78,0],[.035,.035,.035],o.FRAME,{group:3});const s=[0,l*.78+.1,.05];e.ell(s,[.07,.1,.07],o.FRAME,{group:4,paint:n=>Math.abs((n[1]-s[1])/.03%1-.5)<.12||n[1]<s[1]-.06?o.SHADES:void 0,dir:[0,1,.3]}),e.chain([[0,l*.7,0,.01],[-.1,l*.4,-.05,.01],[-.2,.02,-.1,.01],[-.35,.01,.1,.01],[-.2,.01,.25,.01]],o.SHADES,{group:5});const a=[0,l*1.25,.05];e.seg([a[0],l*1.5,a[2]],a,.006,.006,o.SHADES,{group:10,extra:!0}),e.seg(a,[a[0],a[1]-.14,a[2]+.03],.05,.1,o.SHADES,{group:11,extra:!0}),oe(e,[a[0],a[1]-.15,a[2]+.03],.05,o.WOKEN,12,[Q,20,.55]),(e.marks??={}).spot=[a[0],a[1]-.15,a[2]+.03]},bedroom2Door(e,t){Ze.door(e,t,0)},bedroom3Door(e,t){Ze.door(e,t,1)},door(e,{W:t,D:r,H:l},i=0){const s=Math.min(t,1.1)/2,a=Math.min(l,2.2),n=0;e.flat([0,a/2,n],z,ne,s,a/2,(h,d)=>{if(!(d>.5&&Math.hypot(h,(d-.5)/.5*.95)>1))return Math.abs((h*3%1+1)%1-.5)>.45?o.BARKD:o.WOOD},{group:1,bend:0}),e.chain([[-s-.06,0,n,.06],[-s-.06,a*.6,n,.06],[-s*.6,a*.92,n,.06],[0,a+.05,n,.06],[s*.6,a*.92,n,.06],[s+.06,a*.6,n,.06],[s+.06,0,n,.06]],o.BARKD,{group:2});for(const h of[a*.25,a*.62])e.box([-s*.4,h,n+.03],[s*.5,.025,.012],o.SHADES,{group:3});e.ell([s*.55,a*.45,n+.04],[.05,.05,.02],o.SHADES,{group:4,paint:h=>Math.hypot(h[0]-s*.55,h[1]-a*.45)<.025?void 0:o.SHADES}),oe(e,[s*.55,a*.38,n+.05],.025,o.MAGIC,5,[he,6,.2]);for(let h=0;h<10;h++){const d=h/10*Math.PI*2;e.ell([Math.cos(d)*.17,a*.72+Math.sin(d)*.17,n+.06],[.06,.045,.03],[o.LEAF,o.LEAF2,o.LEAF3][h%3],{group:6,dir:[-Math.sin(d),Math.cos(d),0]})}e.ell([0,a*.72,n+.07],[.06,.05,.02],o.ACCENT,{group:7});const u=i?o.COLLAR:o.MAGIC;for(let h=0;h<8;h++){const d=-1.9+h*.45,c=d+.45;e.seg([Math.cos(d)*.14,a+.3+Math.sin(d)*.14,n+.05],[Math.cos(c)*.14,a+.3+Math.sin(c)*.14,n+.05],.018,.018,u,{group:8,extra:!0})}U(e,[0,a+.3,n+.2],i?Se:he,10,.3)},...ka},Mo={light:U,bulb:oe,candle:Te,sprig:K,can:G,disc:$,WARM:Q,FAIRY:Se,MAGICL:he,GREEN:Je},Ga=Object.keys(Ze).filter(e=>e!=="door"),Ua={curtains:["open","shut"],invitations:["8,8,8","4,8,8","0,8,8","8,3,0","0,0,0"],lathe:["3","2","1","0"]},_a={[o.BARKD]:[58,38,30],[o.WOOD]:[138,96,60],[o.HAIR]:[98,70,52],[o.CLOTH]:[92,40,96],[o.ACCENT]:[160,36,64],[o.BODY]:[104,22,46],[o.BELLY]:[236,226,206],[o.FLOWER]:[222,176,78],[o.FRAME]:[196,200,212],[o.CRYSTAL]:[176,220,240],[o.WEB]:[176,196,226],[o.WATER]:[30,44,92],[o.STONE]:[118,112,108],[o.STONED]:[44,38,38],[o.MOSS]:ee(.27,.5,.45),[o.BROOM]:[128,84,50],[o.STRAW]:[214,180,112],[o.JACKET]:[236,186,62],[o.TOP]:[60,46,70],[o.HAT]:[64,40,98],[o.HAT2]:[120,84,168],[o.POM]:[252,132,200],[o.IRIS]:[80,136,226],[o.PHONES]:[255,92,176],[o.SHOES]:[240,240,248],[o.SOLE]:[246,246,246],[o.SHADES]:[34,30,40],[o.HAT1]:[92,210,200],[o.BODY2]:[204,124,84],[o.BODY3]:[110,78,132],[o.LEAF]:ee(.3,.6,.52),[o.LEAF2]:ee(.26,.55,.7),[o.LEAF3]:ee(.36,.65,.34),[o.WOKEN]:[255,222,160],[o.COLLAR]:[255,110,214],[o.MAGIC]:[178,120,255],[o.MAGIC2]:[236,220,255],[o.GLINT]:[160,226,255],[o.GLOW]:[255,184,100],[o.RUNE]:[110,255,196],[o.LINE]:[24,20,30],[o.NOSE]:[14,12,18]},Ya={bedroom:{},boudoir:{[o.CLOTH]:[36,96,102],[o.BODY]:[24,66,74],[o.ACCENT]:[196,64,92],[o.FRAME]:[214,166,80]},parlour:{[o.CLOTH]:[40,104,70],[o.ACCENT]:[178,120,48],[o.BODY]:[26,70,48]},study:{[o.CLOTH]:[40,56,104],[o.ACCENT]:[170,110,46]},workshop:{[o.CLOTH]:[74,92,64],[o.ACCENT]:[184,74,44]},studio:{[o.CLOTH]:[52,30,80],[o.ACCENT]:[226,60,140],[o.FRAME]:[226,230,240]},kitchen:{[o.CLOTH]:[110,138,104],[o.ACCENT]:[196,104,60]},solarium:{[o.CLOTH]:[224,206,150],[o.ACCENT]:[226,120,120],[o.WOOD]:[176,132,86]},drawingRoom:{[o.CLOTH]:[34,98,62],[o.ACCENT]:[150,30,44]},bestiary:{[o.CLOTH]:[70,84,56],[o.ACCENT]:[120,40,40],[o.BODY3]:[40,50,40]},crowsNest:{[o.CLOTH]:[40,74,110],[o.ACCENT]:[200,84,56]},atrium:{[o.CLOTH]:[92,62,40],[o.ACCENT]:[186,60,52]},...Ta},Wa=.6,Ka={invitations:{[o.BELLY]:[228,222,208],[o.IRIS]:[110,162,218],[o.ACCENT]:[238,44,70]},pegboard:Object.fromEntries(xo.map((e,t)=>[e,Ia(Ba[t]).map(r=>Math.round(r*Wa))]))},$a={invitations:.62};function qa(e={},t="bedroom",r=""){const l={..._a,...Ya[t]??{},...Ka[r]??{}},i=$a[r];return i?Object.fromEntries(Object.entries(l).map(([s,a])=>[s,a.map(n=>Math.round(n*i))])):l}function ja(e,t,r={},{ppm:l=32/3,pitch:i=.6,yaw:s=Math.PI/4,state:a=void 0,curve:n=0}={}){const u=Ze[e];if(!u||e==="door")throw new Error(`no furniture "${e}"`);const h=new At({blend:.025}),d=yo(e);return u(h,{W:t.w/d,D:t.d/d,H:t.h/d},a??Ua[e]?.[0]),n>0&&Na.has(e)&&Ha(h,n/d,t.d/d),Ft(h,{ppm:l,pitch:i,yaw:s,size:d})}function Ft(e,{ppm:t=32/3,pitch:r=.6,yaw:l=0,size:i=Ct}={}){e.ell([0,.004,0],[.01,.004,.01],o.NOSE,{group:0});const{sp:s,project:a}=aa(e,{scale:t*i,yaw:l,pitch:r,lineGap:.1});let n=s.w,u=-1,h=s.h,d=-1;for(let y=0;y<s.h;y++)for(let w=0;w<s.w;w++)s.m[y*s.w+w]&&(n=Math.min(n,w),u=Math.max(u,w),h=Math.min(h,y),d=Math.max(d,y));const c=u-n+1,f=d-h+1,v=new ra(c,f);for(let y=0;y<f;y++)for(let w=0;w<c;w++){const M=(y+h)*s.w+w+n,A=s.m[M];A&&v.put(w,y,A,s.n[M*3],s.n[M*3+1],s.n[M*3+2])}const[m,g]=a([0,0,0]),p=(e.lights??[]).map(y=>{const[w,M]=a(y.c);return{x:+(w-n).toFixed(1),y:+(M-h).toFixed(1),z:8*i,R:y.R*i,rgb:y.rgb,power:y.power}}),b=Object.fromEntries(Object.entries(e.marks??{}).map(([y,w])=>{const[M,A]=a(w);return[y,{x:+(M-n).toFixed(1),y:+(A-h).toFixed(1)}]}));return{sp:v,origin:{x:+(m-n).toFixed(1),y:+(g-h).toFixed(1)},lights:p,marks:b}}const{light:st,bulb:Me,candle:Ja,sprig:it,can:Yt,disc:nt,WARM:Le,FAIRY:Wt,MAGICL:Kt,GREEN:Va}=Mo,Xa=[1,0,0],Za=[0,0,1],H=(e,t)=>S(e*7919+t,t*31+3,17),Ke=(e,t,r)=>r[Math.floor(H(e,t)*r.length)%r.length],Qa={rug(e,t,{r=1.5}={}){const l=H(t,1)>.5,i=r,s=l?r*.7:r,a=H(t,2)>.55;if(e.ell([0,.008,0],[i,.008,s],o.CLOTH,{group:1,paint:n=>{const u=Math.hypot(n[0]/i,n[2]/s);return u>.9?o.HAIR:a?(Math.floor(n[0]*3)+Math.floor(n[2]*3))%2?o.BODY:void 0:Math.floor(u*6)%2?o.BODY:void 0}}),l)for(const n of[-1,1])for(let u=0;u<7;u++){const h=(u/6-.5)*s;e.seg([n*i*.99,.008,h],[n*(i+.08),.008,h],.01,.01,o.BELLY,{group:2})}},lamp(e,t){H(t,1)>.5?(nt(e,[0,.03,0],.16,.03,o.SHADES,{group:1}),e.seg([0,.03,0],[0,1.45,0],.025,.02,o.SHADES,{group:1,paint:r=>Math.abs(r[1]-.4)<.04?o.FLOWER:void 0}),e.box([0,1.58,0],[.09,.12,.09],o.SHADES,{round:.01,group:2}),Me(e,[0,1.58,0],.07,o.GLOW,3,[Le,18,.45]),e.seg([0,1.7,0],[0,1.78,0],.05,.005,o.SHADES,{group:2})):(nt(e,[-.25,.03,-.1],.14,.03,o.FRAME,{group:1}),e.chain([[-.25,.03,-.1,.02],[-.2,1.2,-.1,.018],[0,1.65,0,.016],[.3,1.55,.1,.015]],o.FRAME,{group:1}),e.ell([.32,1.45,.12],[.16,.1,.16],o.ACCENT,{group:2}),Me(e,[.32,1.37,.12],.05,o.WOKEN,3,[Le,16,.4]))},candles(e,t){const r=H(t,1)>.5,l=3+Math.floor(H(t,2)*3),i=r?.3:.45;if(r)for(let s=0;s<4;s++)e.box([(H(t,10+s)-.5)*.05,.04+s*.075,0],[.2-s*.015,.035,.14],[o.ACCENT,o.CLOTH,o.BODY2,o.HAT][s],{round:.01,group:1+s,dir:[Math.cos(s*.3),0,Math.sin(s*.3)]});else{e.seg([0,0,0],[0,i,0],.03,.03,o.SHADES,{group:1}),nt(e,[0,i,0],.18,.015,o.SHADES,{group:1});for(const s of[0,2.1,4.2])e.seg([0,.05,0],[Math.cos(s)*.15,0,Math.sin(s)*.15],.015,.012,o.SHADES,{group:1})}for(let s=0;s<l;s++){const a=s*2.4,n=s?.09:0;e.seg([Math.cos(a)*n,i,Math.sin(a)*n],[Math.cos(a)*n,i+.1+H(t,20+s)*.2,Math.sin(a)*n],.035,.033,o.BELLY,{group:10+s}),Me(e,[Math.cos(a)*n,i+.14+H(t,20+s)*.2,Math.sin(a)*n],.022,o.WOKEN,30+s,s===0?[Le,14,.4]:null)}e.ell([0,i+.01,0],[.14,.015,.12],o.BELLY,{group:9})},lantern(e,t){const r=H(t,1)>.5;e.box([0,.2,0],[.11,.18,.11],r?o.FLOWER:o.SHADES,{round:.02,group:1,paint:r?l=>S(Math.round(l[0]*40)+Math.round(l[2]*40),Math.round(l[1]*40),3)>.7?o.GLOW:void 0:void 0}),r||Me(e,[0,.2,0],.08,o.GLOW,2),st(e,[0,.22,.1],Le,14,.4),e.seg([0,.38,0],[0,.48,0],.1,.01,r?o.FLOWER:o.SHADES,{group:3}),e.chain([[-.07,.46,0,.01],[0,.56,0,.01],[.07,.46,0,.01]],o.SHADES,{group:3}),it(e,[.12,.04,.05],4,.07,4,.8)},plant(e,t){const r=Ke(t,1,["monstera","fern","trailing"]),l=Ke(t,2,[o.BODY2,o.HAT1,o.FRAME]);if(Yt(e,0,0,0,.32,.17,l,{group:1,paint:i=>i[1]>.28?o.BARKD:void 0}),r==="monstera")for(let i=0;i<7;i++){const s=i*.9,a=.55+H(t,10+i)*.55;e.seg([0,.3,0],[Math.cos(s)*.2,a,Math.sin(s)*.15],.012,.01,o.LEAF3,{group:2}),e.flat([Math.cos(s)*.28,a+.05,Math.sin(s)*.2],[Math.cos(s),.4,Math.sin(s)],[-Math.sin(s),0,Math.cos(s)],.2,.17,(n,u)=>Math.hypot(n,u)>1||Math.abs(u)<.9&&Math.abs((n*2.5%1+1)%1-.5)<.1&&Math.abs(u)>.15?void 0:u>0?o.LEAF2:o.LEAF,{group:3+i,bend:.4})}else if(r==="fern")for(let i=0;i<9;i++){const s=i*.7;e.chain([[0,.3,0,.03],[Math.cos(s)*.25,.65,Math.sin(s)*.2,.05],[Math.cos(s)*.5,.55,Math.sin(s)*.4,.03]],i%2?o.LEAF:o.LEAF2,{group:3})}else{it(e,[0,.4,0],6,.12,3,.6);for(let i=0;i<4;i++){const s=i*1.6;e.chain([[Math.cos(s)*.15,.32,Math.sin(s)*.15,.035],[Math.cos(s)*.3,.15,Math.sin(s)*.3,.035],[Math.cos(s)*.35,.02,Math.sin(s)*.35,.03]],o.LEAF2,{group:4+i})}}},mushrooms(e,t){e.seg([0,0,0],[0,.25,0],.2,.18,o.BARKD,{group:1,rough:.01,paint:i=>i[1]>.22?o.MOSS:void 0});const r=4+Math.floor(H(t,1)*4),l=[o.MAGIC,o.GLINT,o.COLLAR];for(let i=0;i<r;i++){const s=i*2.3,a=.1+H(t,10+i)*.2,n=.1+H(t,20+i)*.2,u=i<2,h=u?.25:0,d=Math.cos(s)*(u?.05:a+.15),c=Math.sin(s)*(u?.05:a+.15);e.seg([d,h,c],[d,h+n,c],.02,.018,o.BELLY,{group:30+i}),e.ell([d,h+n+.02,c],[.06+n*.2,.04,.06+n*.2],l[i%3],{group:40+i,extra:!0,paint:f=>S(Math.round(f[0]*60),Math.round(f[2]*60),i)>.8?o.MAGIC2:void 0})}st(e,[0,.35,.15],H(t,3)>.5?Kt:Va,16,.45)},books(e,t){const r=[o.ACCENT,o.CLOTH,o.BODY2,o.HAT,o.IRIS,o.FLOWER];for(let l=0;l<6;l++)e.box([(H(t,l)-.5)*.06,.04+l*.07,0],[.18-l%3*.02,.033,.13],r[(l+t)%r.length],{round:.01,group:1+l,dir:[Math.cos((H(t,10+l)-.5)*.8),0,Math.sin((H(t,10+l)-.5)*.8)],paint:i=>Math.abs(i[2])>.11?o.BELLY:void 0});if(H(t,2)>.5){e.ell([0,.52,0],[.07,.065,.08],o.BELLY,{group:10});for(const l of[-1,1])e.ell([l*.028,.53,.06],[.016,.016,.01],o.SHADES,{group:11})}else Ja(e,[0,.45,0],10,.1);e.flat([.32,.02,.12],Xa,Za,.14,.1,(l,i)=>Math.abs(l)<.04?o.BARKD:Math.abs((i*4%1+1)%1-.5)<.12&&Math.abs(l)>.2&&Math.abs(l)<.8?o.BARKD:o.BELLY,{group:20,bend:.25})},neon(e,t){const r=Ke(t,1,["moon","heart","star"]),l=Ke(t,2,[o.COLLAR,o.MAGIC,o.GLINT]),i=.75,s=.22;e.box([0,.03,0],[.18,.03,.1],o.SHADES,{round:.01,group:1}),e.seg([0,.03,0],[0,i-s,0],.015,.015,o.SHADES,{group:1});const a=[];for(let n=0;n<=24;n++){const u=n/24*Math.PI*2;if(r==="heart")a.push([16*Math.sin(u)**3/17,(13*Math.cos(u)-5*Math.cos(2*u)-2*Math.cos(3*u)-Math.cos(4*u))/17]);else if(r==="star"){const h=n%2?.45:1,d=n/24*Math.PI*2*5/2.5;a.push([Math.sin(d)*h,Math.cos(d)*h])}else{const h=.6+n/24*4.9;a.push(n<=12?[Math.cos(h),Math.sin(h)]:[Math.cos(h)*.7+.3,Math.sin(h)*.7])}}for(let n=0;n+1<a.length;n++)e.seg([a[n][0]*s,i+a[n][1]*s,0],[a[n+1][0]*s,i+a[n+1][1]*s,0],.016,.016,l,{group:2,extra:!0});st(e,[0,i,.15],l===o.COLLAR?Wt:l===o.MAGIC?Kt:[150,214,255],16,.45)},shelf(e,t){for(const a of[.05,.9*.5,.9])e.box([0,a,0],[.9/2,.02,.3/2],o.WOOD,{round:.01,group:1});for(const a of[-.9/2+.02,.9/2-.02])e.box([a,.9/2,0],[.02,.9/2,.3/2],o.BARKD,{group:2});const s=[o.CRYSTAL,o.BODY2,o.HAT1,o.CRYSTAL,o.POM];for(let a=0;a<2;a++)for(let n=0;n<4;n++){if(H(t,a*10+n)<.25)continue;const u=-.9/2+.12+n*(.9-.24)/3,h=(a?.9*.5:.05)+.02;Yt(e,u,0,h,h+.12+H(t,30+n)*.1,.05,s[(n+a+t)%s.length],{group:10+a*4+n})}it(e,[.9*.3,.9+.1,0],4,.08,30,.7);for(let a=0;a<=10;a++){const n=a/10,u=-.9/2+.9*n,h=.05*Math.sin(n*Math.PI*2)**2;Me(e,[u,.9+.02-h,.3/2+.02],.02,a%2?o.COLLAR:o.WOKEN,40,a===5?[Wt,12,.3]:null)}},crates(e,t){const r=(l,i,s,a)=>e.box([l,i,s],[.22,.16,.2],o.WOOD,{group:a,paint:n=>Math.abs((n[1]-i+.16)/.08%1-.5)>.4?o.BARKD:void 0});r(0,.16,0,1),r(.46,.16,.05,2),H(t,1)>.4&&r(.2,.48,0,3);for(let l=0;l<5;l++)e.box([.46-.14+l*.07,.34,.05],[.01,.14,.17],[o.ACCENT,o.FLOWER,o.HAT1,o.SHADES,o.POM][l],{group:4});e.box([0,.38,0],[.06,.07,.06],o.SHADES,{round:.01,group:5}),Me(e,[0,.38,0],.045,o.GLOW,6,[Le,12,.35])}};function er(e,t,r={},{ppm:l=32/3,pitch:i=.6,yaw:s=0,...a}={}){const n=Qa[e];if(!n)throw new Error(`no decor "${e}"`);const u=new At({blend:.025});return n(u,t,a),Ft(u,{ppm:l,pitch:i,yaw:s})}const{can:tr,disc:Ce}=Mo,I=(e,t)=>[e[0]*Math.cos(t)+e[2]*Math.sin(t),e[1],-e[0]*Math.sin(t)+e[2]*Math.cos(t)],W=[1,0,0],or={shoe(e,t,r,l,i,s){const a=[o.SHOES,o.POM,o.SHADES,o.HAT1,o.BARKD][Math.floor(S(i,1,3)*5)],n=a===o.SHADES?o.COLLAR:o.SOLE,u=I([0,0,1],l);e.ell([t,.06,r],[.08,.06,.14],a,{group:s,dir:u}),e.ell([t+u[0]*.01,.02,r+u[2]*.01],[.085,.022,.15],n,{group:s+1,dir:u}),S(i,2,3)>.6&&e.seg([t-u[0]*.08,.08,r-u[2]*.08],[t-u[0]*.12,.24,r-u[2]*.12],.065,.06,a,{group:s})},sock(e,t,r,l,i,s){const a=I(W,l);e.chain([[t-a[0]*.1,.02,r-a[2]*.1,.03],[t,.025,r,.03],[t+a[0]*.06,.02,r+a[2]*.08,.028]],[o.BELLY,o.POM,o.IRIS][i%3],{group:s,paint:n=>Math.floor((n[0]+n[2])*30)%3?void 0:o.ACCENT})},clothes(e,t,r,l,i,s){const a=[o.HAT2,o.POM,o.JACKET,o.IRIS,o.CLOTH,o.HAT1][Math.floor(S(i,4,3)*6)],n=I(W,l),u=[-n[2],0,n[0]];e.box([t,.025,r],[.17,.022,.2],a,{round:.03,group:s,dir:n,rough:.01,paint:h=>Math.abs(((h[0]-t)*n[0]+(h[2]-r)*n[2])*9%1)<.12?o.BODY:void 0});for(const h of[-1,1])e.chain([[t+n[0]*h*.15-u[0]*.12,.03,r+n[2]*h*.15-u[2]*.12,.05],[t+n[0]*h*.3,.025,r+n[2]*h*.3+.02,.045],[t+n[0]*h*.36+u[0]*.1*h,.02,r+n[2]*h*.36+u[2]*.1*h,.04]],a,{group:s+1});e.ell([t-u[0]*.17,.05,r-u[2]*.17],[.07,.02,.05],o.BODY,{group:s+2,dir:n})},hanger(e,t,r,l,i,s){const a=I(W,l);e.seg([t-a[0]*.16,.01,r-a[2]*.16],[t+a[0]*.16,.01,r+a[2]*.16],.012,.012,o.WOOD,{group:s}),e.seg([t,.01,r],[t-a[2]*.08,.01,r+a[0]*.08],.008,.008,o.FRAME,{group:s})},book(e,t,r,l,i,s){const a=[o.ACCENT,o.HAT1,o.IRIS,o.FLOWER,o.BODY3][i%5],n=I(W,l);if(S(i,5,3)>.5)e.box([t,.03,r],[.12,.025,.16],a,{round:.01,group:s,dir:n,paint:u=>u[1]>.05?o.BELLY:void 0});else{e.box([t,.015,r],[.2,.012,.14],a,{group:s,dir:n});for(const u of[-1,1])e.box([t+n[0]*u*.095,.032,r+n[2]*u*.095],[.09,.006,.12],o.BELLY,{group:s+1,dir:n})}},books(e,t,r,l,i,s){const a=3+i%3;for(let n=0;n<a;n++)e.box([t+(S(i,n,6)-.5)*.04,.04+n*.07,r+(S(i,n,7)-.5)*.04],[.15-n%2*.02,.03,.11],[o.ACCENT,o.HAT1,o.IRIS,o.FLOWER,o.BODY3,o.BODY2][(i+n)%6],{round:.01,group:s+n,dir:I(W,l+(S(i,n,8)-.5)*.5),paint:u=>Math.abs((u[1]-.04)/.07%1-.5)<.1?o.BELLY:void 0})},paper(e,t,r,l,i,s){e.box([t,.006,r],[.1,.004,.14],o.BELLY,{group:s,dir:I(W,l),paint:a=>Math.abs((a[2]-r)*25%1)<.2&&S(i,9,3)>.4?o.TOP:void 0})},crumple(e,t,r,l,i,s){e.ell([t,.045,r],[.05,.045,.05],o.BELLY,{group:s,rough:.02})},chart(e,t,r,l,i,s){if(i%2){const a=I(W,l);e.seg([t-a[0]*.2,.04,r-a[2]*.2],[t+a[0]*.2,.04,r+a[2]*.2],.04,.04,o.BELLY,{group:s,paint:n=>Math.abs((n[0]-t)*a[0]+(n[2]-r)*a[2])<.02?o.ACCENT:void 0})}else e.box([t,.006,r],[.18,.004,.13],o.STRAW,{group:s,dir:I(W,l),paint:a=>Math.hypot(a[0]-t-.03,a[2]-r)<.07?o.WATER:Math.hypot(a[0]-t-.03,a[2]-r)<.09?o.LEAF2:void 0})},pencil(e,t,r,l,i,s){const a=I(W,l);e.seg([t-a[0]*.08,.012,r-a[2]*.08],[t+a[0]*.08,.012,r+a[2]*.08],.012,.008,[o.FLOWER,o.ACCENT,o.HAT1][i%3],{group:s})},stick(e,t,r,l,i,s){const a=I(W,l);e.seg([t-a[0]*.2,.018,r-a[2]*.2],[t+a[0]*.2,.018,r+a[2]*.2],.018,.012,o.WOOD,{group:s})},shavings(e,t,r,l,i,s){for(let a=0;a<6;a++){const n=l+a*1.05,u=.05+S(i,a,9)*.12;e.ell([t+Math.cos(n)*u,.012,r+Math.sin(n)*u],[.05,.014,.025],a%3?o.STRAW:o.WOOD,{group:s,dir:[Math.cos(n+1),.3,Math.sin(n+1)]})}},straw(e,t,r,l,i,s){for(let a=0;a<7;a++){const n=l+(S(i,a,4)-.5)*1.6,u=[Math.cos(n),0,Math.sin(n)],h=(S(i,a,5)-.5)*.14;e.seg([t+h,.008,r-h],[t+h+u[0]*.14,.008,r-h+u[2]*.14],.007,.005,o.STRAW,{group:s})}},spanner(e,t,r,l,i,s){const a=I(W,l);e.seg([t-a[0]*.12,.012,r-a[2]*.12],[t+a[0]*.12,.012,r+a[2]*.12],.016,.016,o.FRAME,{group:s}),e.ell([t+a[0]*.14,.012,r+a[2]*.14],[.035,.012,.035],o.FRAME,{group:s})},screws(e,t,r,l,i,s){for(let a=0;a<4;a++)e.ell([t+(S(i,a,2)-.5)*.16,.01,r+(S(i,a,3)-.5)*.12],[.014,.01,.014],o.FRAME,{group:s})},rag(e,t,r,l,i,s){e.ell([t,.02,r],[.14,.025,.1],o.BELLY,{group:s,rough:.012,dir:I(W,l),paint:a=>S(Math.round(a[0]*40),Math.round(a[2]*40),i)>.7?o.ACCENT:void 0})},record(e,t,r,l,i,s){Ce(e,[t,.006,r],.13,.005,o.SHADES,{group:s,paint:a=>Math.hypot(a[0]-t,a[2]-r)<.04?[o.ACCENT,o.FLOWER,o.HAT1][i%3]:void 0}),i%2&&e.box([t+.12,.008,r+.05],[.14,.005,.14],[o.POM,o.IRIS,o.JACKET][i%3],{group:s+1,dir:I(W,l)})},cable(e,t,r,l,i,s){const a=[];for(let n=0;n<=8;n++){const u=n/8,h=l+u*5;a.push([t+Math.cos(h)*(.06+u*.1),.012,r+Math.sin(h)*(.06+u*.08),.012])}e.chain(a,[o.SHADES,o.ACCENT,o.HAT1,o.COLLAR][i%4],{group:s})},cup(e,t,r,l,i,s){const a=[o.ACCENT,o.BELLY,o.HAT1,o.POM][i%4];i%3?tr(e,t,r,0,.1,.045,a,{group:s}):e.seg([t-.05,.045,r],[t+.05,.045,r+.02],.045,.045,a,{group:s})},sugar(e,t,r,l,i,s){for(let a=0;a<2;a++)e.box([t+a*.05,.015,r+a*.03],[.015,.015,.015],o.BELLY,{group:s})},cards(e,t,r,l,i,s){for(let a=0;a<3;a++)e.box([t+a*.04,.004+a*.002,r+(a-1)*.03],[.05,.003,.075],o.BELLY,{group:s+a,dir:I(W,l+a*.5),paint:n=>Math.abs(n[0]-t-a*.04)<.015?a%2?o.ACCENT:o.SHADES:void 0})},chips(e,t,r,l,i,s){for(let a=0;a<3;a++)Ce(e,[t+a*.04,.01,r+a%2*.04],.025,.008,[o.ACCENT,o.IRIS,o.FLOWER][a],{group:s})},herbs(e,t,r,l,i,s){for(let a=0;a<4;a++){const n=l+a*.4;e.seg([t,.01,r],[t+Math.cos(n)*.14,.01,r+Math.sin(n)*.14],.008,.008,o.LEAF3,{group:s}),e.ell([t+Math.cos(n)*.13,.02,r+Math.sin(n)*.13],[.025,.012,.02],a%2?o.LEAF:o.LEAF2,{group:s})}},crisps(e,t,r,l,i,s){e.box([t,.025,r],[.08,.02,.1],[o.JACKET,o.ACCENT,o.IRIS][i%3],{round:.02,group:s,dir:I(W,l),paint:a=>Math.hypot(a[0]-t,a[2]-r)<.03?o.BELLY:void 0})},bottle(e,t,r,l,i,s){const a=I(W,l);e.seg([t-a[0]*.08,.04,r-a[2]*.08],[t+a[0]*.06,.04,r+a[2]*.06],.04,.035,o.CRYSTAL,{group:s}),e.seg([t+a[0]*.06,.04,r+a[2]*.06],[t+a[0]*.11,.04,r+a[2]*.11],.015,.015,o.CRYSTAL,{group:s})},makeup(e,t,r,l,i,s){e.seg([t,.015,r],[t+.07,.015,r+.02],.014,.014,o.SHADES,{group:s}),e.seg([t+.07,.015,r+.02],[t+.09,.015,r+.025],.012,.009,o.ACCENT,{group:s}),Ce(e,[t-.06,.012,r+.06],.035,.012,o.FLOWER,{group:s+1});for(let a=0;a<2;a++)Ce(e,[t+.04+a*.05,.006,r-.06],.025,.006,[o.POM,o.HAT1][a],{group:s+2})},hat(e,t,r,l,i,s){const a=[o.HAT,o.HAT2,o.HAT1][i%3];e.ell([t,.015,r],[.2,.015,.18],a,{group:s}),e.seg([t,.02,r],[t+.18,.1,r-.1],.1,.01,a,{group:s,paint:n=>n[1]<.05?o.FLOWER:void 0})},ribbon(e,t,r,l,i,s){e.chain([[t-.12,.006,r,.012],[t-.04,.006,r+.05,.012],[t+.04,.006,r-.03,.012],[t+.12,.006,r+.03,.012]],[o.POM,o.ACCENT,o.FLOWER][i%3],{group:s})},bone(e,t,r,l,i,s){const a=I(W,l);e.seg([t-a[0]*.1,.02,r-a[2]*.1],[t+a[0]*.1,.02,r+a[2]*.1],.018,.018,o.BELLY,{group:s});for(const n of[-1,1])e.ell([t+a[0]*n*.11,.025,r+a[2]*n*.11],[.03,.025,.03],o.BELLY,{group:s})},feather(e,t,r,l,i,s){e.flat([t,.006,r],I(W,l),I([0,0,1],l),.12,.035,(a,n)=>Math.abs(n)<1-a*a?a>.6?o.SHADES:o.HAT2:void 0,{group:s,bend:0})},keys(e,t,r,l,i,s){for(let a=0;a<2;a++)e.ell([t+a*.05,.008,r],[.02,.006,.02],o.FLOWER,{group:s}),e.seg([t+a*.05,.008,r],[t+a*.05+.05,.008,r+.02],.008,.008,o.FLOWER,{group:s});for(let a=0;a<3;a++)Ce(e,[t-.06+a*.03,.005,r+.07],.015,.004,o.FLOWER,{group:s+1})}},Ot={wardrobe:[["hanger",2]],dressingTable:[["makeup",1],["ribbon",1]],shoeRack:[["shoe",5],["sock",1]],cloakPegs:[["hat",1],["ribbon",1],["clothes",1],["sock",1]],mirror:[["ribbon",2],["makeup",1],["hat",1]],telephone:[["paper",3],["crumple",3],["pencil",1]],bags:[["keys",1],["crisps",1],["paper",2],["clothes",1]],pegboard:[["spanner",2],["screws",2],["rag",1]],broomBay:[["straw",3],["rag",1],["spanner",1],["screws",1]],lathe:[["shavings",5],["pencil",1],["rag",1]],recordShelf:[["record",4],["cable",1],["cup",1]],cauldron:[["herbs",3],["crisps",1],["bottle",2],["cup",1]],teaTable:[["cup",2],["sugar",2],["paper",1]],cardTable:[["cards",3],["chips",2],["cup",1]],book:[["books",3],["paper",3],["book",1]],specimens:[["bone",3],["feather",2],["bottle",1],["books",1]],telescope:[["chart",3],["paper",2],["pencil",2]],mapTable:[["chart",4],["pencil",3],["paper",2],["cup",1]],drumKit:[["stick",3],["paper",2],["cable",1],["cup",1]],synthRack:[["cable",3],["paper",2],["cup",1]],microphone:[["paper",4],["crumple",2],["bottle",1]]};function ar(e,t,r,{out:l=.55,gap:i=.2}={}){const s=(Ot[e]??[]).flatMap(([u,h])=>Array.from({length:h},()=>u)),a=[...e].reduce((u,h)=>u*31+h.charCodeAt(0)|0,7)>>>0,n=[];return s.forEach((u,h)=>{for(let d=0;d<40;d++){const c=g=>S(a%9973,h*53+d*7+g,11),f=c(1);let v,m;if(f<.55?(v=(c(2)-.5)*(t+l),m=r/2+.05+c(3)*l):(v=(f<.78?-1:1)*(t/2+.05+c(2)*l),m=(c(3)-.35)*(r*.9+l*.5)),n.every(g=>Math.hypot(g.x-v,g.z-m)>i)){n.push({kind:u,x:v,z:m,a:c(4)*Math.PI*2,k:(a+h*17)%997});break}}}),n}const rr=1.4;function sr(e,t,r={},{ppm:l=32/3,pitch:i=.6,yaw:s=0}={}){if(!Ot[e])return null;const a=yo(e)*rr,n=t.w/a,u=t.d/a,h=new At({blend:.02});return ar(e,n,u).forEach((d,c)=>or[d.kind](h,d.x,d.z,d.a,d.k,1+c*4)),Ft(h,{ppm:l,pitch:i,yaw:s,size:a})}function ir(e,t,r,l,i,s=2/(r.pixel||2)){const[a,n,u,h]=[0,0,e.w,e.h],d=e.a.getImageData(a,n,u,h).data,c=e.n.getImageData(a,n,u,h).data,f=t.getContext("2d"),v=f.createImageData(u,h),m=v.data,g=ee(r.ambientHue,.55,1).map(L=>L/255*r.ambient),p=ee(r.moonHue,.35,1).map(L=>L/255*r.moon),b=[-.45,-.75,.5],y=Math.hypot(...b),w=r.bands,M=r.dither*.5,A=(L,x,E)=>{let F=L*w;const O=F-Math.floor(F);return M&&Math.abs(O-.5)<M*.5&&(F+=x+E&1?.5:-.5),Math.floor(F)/w};for(let L=0;L<h;L++)for(let x=0;x<u;x++){const E=(L*u+x)*4,F=(c[E]-128)/127,O=(c[E+1]-128)/127,k=c[E+2]/255;if(d[E+3]===254){m[E]=d[E],m[E+1]=d[E+1],m[E+2]=d[E+2],m[E+3]=255;continue}let R=g[0],N=g[1],ae=g[2];const ye=Math.max(0,(F*b[0]+O*b[1]+k*b[2])/y),J=A(ye,x,L);if(R+=p[0]*J,N+=p[1]*J,ae+=p[2]*J,r.shafts>0){const B=(x+a+(L+n)*.9)%(150*s);if(B<34*s&&(x+L&1||B>4*s&&B<30*s)){const te=r.shafts*.5;R+=p[0]/Math.max(.01,r.moon)*te*.5,N+=p[1]/Math.max(.01,r.moon)*te*.5,ae+=p[2]/Math.max(.01,r.moon)*te*.5}}const ie=x+a,D=L+n;for(const B of l){const te=B.x-ie,kt=B.y-D,tt=Math.hypot(te,kt,B.z);if(tt>B.R)continue;const No=Math.max(0,(F*te+O*kt+k*B.z)/tt),Tt=1-tt/B.R,ot=A(Math.min(1,No*Tt*Tt*B.power),ie,D);R+=B.rgb[0]/255*ot,N+=B.rgb[1]/255*ot,ae+=B.rgb[2]/255*ot}m[E]=Math.min(255,d[E]*R*1.25),m[E+1]=Math.min(255,d[E+1]*N*1.25),m[E+2]=Math.min(255,d[E+2]*ae*1.25),m[E+3]=255}f.putImageData(v,0,0)}const nr=typeof location>"u"||new URLSearchParams(location.search).get("decor")!=="0",lr={bedroom:["plant","shelf","candles","neon","books"],boudoir:["rug","candles","neon","plant","lantern"],parlour:["rug","lamp","plant","books","candles"],workshop:["rug","crates","lantern","mushrooms","plant","lamp"],studio:["rug","neon","crates","plant"],kitchen:[],solarium:["rug","plant","plant","mushrooms","lantern","candles"],dining:["rug","lamp","plant","candles","books","neon"],cloakroom:["rug","plant","candles","lantern"],bestiary:["rug","mushrooms","candles","lantern","books","plant"],turret:["lantern","crates","plant"],terrace:["plant","lantern","candles"]},ur=["rug","plant","lantern","candles"],hr=.6,cr=.6,dr=2.8,fr=1.8,gr=.4,pr=2,vr=(e,t)=>{let r=e*374761393+t*668265263|0;return r=Math.imul(r^r>>>13,1274126177),((r^r>>>16)>>>0)/4294967296},mr=e=>[...e].reduce((t,r)=>t*31+r.charCodeAt(0)|0,7),br=(e,t,r,l)=>{const i=l[0]-r[0],s=l[1]-r[1],a=Math.max(0,Math.min(1,((e-r[0])*i+(t-r[1])*s)/Math.max(1e-9,i*i+s*s)));return Math.hypot(e-r[0]-i*a,t-r[1]-s*a)};function So(e,t=Ne){if(!e.r||e.locked)return[];const r=e.r,l=(e.x0+e.x1)/2,i=(e.z0+e.z1)/2,s=mr(e.id),a=lr[e.id]??ur,n=[];for(const m of t.corridors)if(m.pts&&m.id.split("-").includes(e.id)){const p=[m.pts[0],m.pts[m.pts.length-1]].reduce((b,y)=>Math.hypot(b[0]-l,b[1]-i)<Math.hypot(y[0]-l,y[1]-i)?b:y);n.push([p[0]-l,p[1]-i])}const u=t.objects.filter(m=>Math.hypot(m.x-l,m.z-i)<r+2),h=(m,g)=>n.every(p=>Math.hypot(m-p[0],g-p[1])>dr&&br(m,g,p,[0,0])>fr)&&u.every(p=>Math.hypot(Math.max(0,Math.abs(l+m-p.x)-p.w/2),Math.max(0,Math.abs(i+g-p.z)-p.d/2))>t.reach+gr),d=(m,g)=>{const p=Math.hypot(m,g)||1,b=-m/p,y=Math.abs(-g/p);return Math.atan2(-b,y)},c=[];a[0]==="rug"&&e.id!=="bedroom"&&c.push({kind:"rug",x:0,z:r*.15,yaw:0,k:s,r:Math.min(r*.42,2.8)});const f=[];for(const m of[r-1.05,r-1.5])for(let g=-125;g<=125;g+=6){const p=g*Math.PI/180;f.push([m*Math.sin(p),-m*Math.cos(p)])}const v=f.map((m,g)=>({p:m,s:vr(s,g)})).sort((m,g)=>m.s-g.s).map(m=>m.p);for(const m of u)if(m.room===e.id&&Ot[m.id]&&Ga.includes(m.id)){const g=Ao(m);c.push({kind:"mess",of:m.id,x:+(m.x-l).toFixed(2),z:+(m.z-i).toFixed(2),yaw:g.yaw,k:0,foot:g.foot})}return a.filter(m=>m!=="rug").forEach((m,g)=>{const p=v.find(([b,y])=>h(b,y)&&c.every(w=>w.kind==="rug"||w.kind==="mess"||Math.hypot(w.x-b,w.z-y)>pr));p&&c.push({kind:m,x:+p[0].toFixed(2),z:+p[1].toFixed(2),yaw:d(p[0],p[1]),k:s+g*101})}),c}const yi=nr?Ne.rooms.filter(e=>So(e).length):[],pe=e=>e.getContext("2d",{willReadFrequently:!0});function Ao(e){const t=Ne.rooms.find(h=>h.id===e.room),r=t?(t.x0+t.x1)/2-e.x:0,l=t?(t.z0+t.z1)/2-e.z:0,i=Math.hypot(r,l),s=Math.abs(r)>Math.abs(l),a=s?{w:e.d,d:e.w,h:e.h}:{w:e.w,d:e.d,h:e.h};if(i<1.2)return{yaw:0,foot:a,curve:0};const n=Go({x:0,z:0},r/i,l/i),u=n.z<0?[n.x,-n.z]:[n.x,n.z];return{yaw:Math.atan2(-u[0],u[1]),foot:a,curve:t?.r?i+a.d/2:0}}const wr=e=>({...e,ambient:.85,ambientHue:.09,moon:.4,shafts:0,dither:0});function Eo(e,t,r,l,i=1,s="",a={}){const n=Object.fromEntries(Object.entries({...qa(r,t,s),...a}).map(([v,m])=>[v,i===1?m:m.map(g=>Math.round(g*i))])),u=sa(e.sp,n,{...r,styleInterior:!1},r.cOutline,l),h=l(u.w,u.h);ir({a:pe(u.A),n:pe(u.N),w:u.w,h:u.h},h,wr(r),e.lights);const d=pe(u.A).getImageData(0,0,u.w,u.h).data,c=pe(h).getImageData(0,0,u.w,u.h),f=c.data;for(let v=3;v<f.length;v+=4)f[v]=d[v]?255:0;return pe(h).putImageData(c,0,0),h}const Lo=e=>pe(e).getImageData(0,0,e.width,e.height).data;function yr(e,t,r,l,i,s){const a=Ne.objects.find(f=>f.id===e);if(!a)return null;const{yaw:n,foot:u,curve:h}=Ao(a),d=ja(a.id,u,t,{ppm:r,pitch:l,yaw:n,state:s,curve:h}),c=Eo(d,a.room,t,i,1,a.id);return{px:Lo(c),w:c.width,h:c.height,ox:d.origin.x,oy:d.origin.y,marks:d.marks??{}}}function xr(e,t,r,l,i){const s=Ne.rooms.find(g=>g.id===e),a=s?So(s):[];if(!s||!a.length)return null;const n=Math.sin(l)*r,u=a.map(g=>{const p=g.kind==="mess"?sr(g.of,g.foot,t,{ppm:r,pitch:l,yaw:g.yaw}):er(g.kind,g.k,t,{ppm:r,pitch:l,yaw:g.yaw,...g.r?{r:g.r/Ct}:{}}),b=Eo(p,s.id,t,i,g.kind==="rug"?hr:g.kind==="mess"?cr:1);return{it:g,c:b,left:g.x*r-p.origin.x,top:g.z*n-p.origin.y}}),h=Math.floor(Math.min(...u.map(g=>g.left))),d=Math.floor(Math.min(...u.map(g=>g.top))),c=Math.ceil(Math.max(...u.map(g=>g.left+g.c.width)))-h,f=Math.ceil(Math.max(...u.map(g=>g.top+g.c.height)))-d,v=i(c,f),m=pe(v);m.imageSmoothingEnabled=!1;for(const g of[...u].sort((p,b)=>p.it.kind==="rug"?-1:b.it.kind==="rug"?1:p.it.kind==="mess"!=(b.it.kind==="mess")?p.it.kind==="mess"?-1:1:p.it.z-b.it.z))m.drawImage(g.c,Math.round(g.left-h),Math.round(g.top-d));return{px:Lo(v),w:c,h:f,ox:-h,oy:-d,marks:{}}}function xi(e,t,r,l,i){if(e.startsWith("decor:"))return xr(e.slice(6),t,r,l,i);const[s,a]=e.split("|");return yr(s,t,r,l,i,a||void 0)}function Mr(e){const t=new Uint8Array(2048);t.set(e.subarray(0,1024));for(let r=0;r<256;r++){const l=r*4,i=(e[l]*.3+e[l+1]*.55+e[l+2]*.15)/255;t.set([Math.round(90+i*150),Math.round(145+i*105),Math.round(180+i*75),e[l+3]],1024+l)}return t}let Co=!1;function Mi(e){Co=e}const Sr=e=>{Co||(e.image.data=null),e.onUpdate=null};function pt(e,t,r,l=!1){const i=new Qe(e,t,r,l?dt:io,no);return l&&(i.unpackAlignment=1),i.magFilter=se,i.minFilter=se,i.generateMipmaps=!1,i.flipY=!1,i.colorSpace=lo,i.needsUpdate=!0,i.onUpdate=Sr,i}function Fo(e){const t=new Qe(Mr(e),Ie,2,io,no);return t.magFilter=t.minFilter=se,t.generateMipmaps=!1,t.flipY=!1,t.colorSpace=lo,t.needsUpdate=!0,t}let Ar=null;const vt=()=>Ar??=Fo(new Uint8Array(Ie*4));function Si(e,t,r,l){const i=gt(e),[s,a]=mt(i?.idx??e,i?.pal??null,t,r,l);return{tex:s,pal:a,indexed:!!i}}function mt(e,t,r,l,i){const s=Xe(pt(e,r,l,!!t),i);if(!t)return[s,vt()];const a=Xe(Fo(t),i);return s.addEventListener("dispose",()=>a.dispose()),[s,a]}function Er(e,t="props"){const[r,l]=mt(e.albedo,e.albedoPal,e.width,e.height,t),[i,s]=mt(e.normal,e.normalPal,e.width,e.height,t);return{albedo:r,normal:i,albedoPal:l,normalPal:s,indexed:new j(e.albedoPal?1:0,e.normalPal?1:0),frames:e.frames}}function Ai(e){const t=a=>{const n=a.image;return[n?.width??0,n?.height??0]},[r,l]=t(e.albedo),[i,s]=t(e.normal);return Nt(r,l,e.indexed.x>.5)+Nt(i,s,e.indexed.y>.5)+(e.indexed.x>.5?1024:0)+(e.indexed.y>.5?1024:0)}const Lr=(e="uAlbedo",t="uNormal")=>`
uniform sampler2D ${e}, ${t}, ${e}Pal, ${t}Pal;
uniform vec2 uIndexed;
vec4 albedoAt(vec2 q) { vec4 c = texture2D(${e}, q); return uIndexed.x > 0.5 ? texelFetch(${e}Pal, ivec2(int(c.r * 255.0 + 0.5), 0), 0) : c; }
vec4 normalAt(vec2 q) { vec4 c = texture2D(${t}, q); return uIndexed.y > 0.5 ? texelFetch(${t}Pal, ivec2(int(c.r * 255.0 + 0.5), 0), 0) : c; }
`,Cr=(e,t="uAlbedo",r="uNormal")=>({[t]:{value:e.albedo},[r]:{value:e.normal},[t+"Pal"]:{value:e.albedoPal},[r+"Pal"]:{value:e.normalPal},uIndexed:{value:e.indexed}});function Fr(e,t,r="uAlbedo",l="uNormal"){e[r].value=t.albedo,e[l].value=t.normal,e[r+"Pal"].value=t.albedoPal,e[l+"Pal"].value=t.normalPal,e.uIndexed.value=t.indexed}function Ei(e){const t=new Uint8Array(4),r={uv:[0,0,0,0],w:1,h:1,pad:0};return{albedo:pt(t,1,1),normal:pt(new Uint8Array(4),1,1),albedoPal:vt(),normalPal:vt(),indexed:new j(0,0),frames:Array.from({length:e},()=>r),grounds:[]}}const Li=(e,t=2048)=>Er(Ca(e,t));function Or(e){return{value:e?new C(1,e.lightFloor,e.lightTint,e.lightRim):new C}}const Rr=`
uniform vec4 uWitchLight; // on, floor, tint, rim
uniform float uWitchGlow; // how much of her own glow lights her (the mood's: render/mood.ts)
uniform float uWitchLift; // her pool's light thrown up onto her, added (stylised art: its tones are baked dark)
vec3 witchShade(vec3 base, vec3 N, vec3 F, vec3 P) {
  // (inside a legend's clearing the forest's light dims and the clearing's twilight lights her: render/glades.ts)
  vec3 env = (uAmb + uMoon * lightStep(max(0.0, dot(N, uMoonDir)))) * uDim + gladeLight(P);
  vec3 col = base * max(vec3(uWitchLight.y), env * 1.25 + uGlowRgb * uGlowPower * uWitchGlow);
  // Her pool's light thrown back up onto her (the art director's round 3: in a stylised style she vanished in her own
  // pool): added, so even the style's near-black tones and outline lift, warm, and she's the brightest thing in it.
  col += (base + 0.1) * uGlowRgb * uWitchLift;
  vec3 tint = vec3(0.0), rim = vec3(0.0);
  float edge = 1.0 - clamp(dot(N, F), 0.0, 1.0); // her outline's pixels face sideways
  for (int i = 0; i < ${we}; i++) {
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
`,kr=3,bt={uCastMap:{value:null},uCastWin:{value:new C(0,0,1,0)}},Tr=`
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
`;class Ci{constructor(t=160,r=1024){this.size=t,this.res=r,this.rt=new je(r,r,{minFilter:zt,magFilter:zt,depthBuffer:!1,stencilBuffer:!1,generateMipmaps:!1});const l=t/2;this.cam=new so(-l,l,l,-l,1,2e3),this.cam.up.set(0,0,-1),this.cam.layers.set(kr),bt.uCastMap.value=this.rt.texture}size;res;rt;cam;clear=new St;render(t,r,l,i,s){const a=bt.uCastWin.value;if(!s){a.w=0;return}const n=this.size/this.res,u=Math.round(l/n)*n,h=Math.round(i/n)*n;this.cam.position.set(u,1e3,h),this.cam.lookAt(u,0,h),this.cam.updateMatrixWorld();const d=ze.uBend.value.x,c=r.background,f=t.getRenderTarget(),v=t.getClearAlpha();t.getClearColor(this.clear),ze.uBend.value.x=0,r.background=null,t.setRenderTarget(this.rt),t.setClearColor(16777215,1),t.clear(!0,!1,!1),t.render(r,this.cam),t.setRenderTarget(f),t.setClearColor(this.clear,v),r.background=c,ze.uBend.value.x=d,a.set(u-this.size/2,h+this.size/2,this.size,1)}dispose(){this.rt.dispose()}}const Pr={ramp:["#49141e","#b43216","#ff7826","#fff0af"],contrast:"#77bbee",motion:0,imprint:"scorch",sound:"fire"},Dr={ramp:["#163b64","#397cbb","#9dd8ed","#f0fbff"],contrast:"#ffffff",motion:1,imprint:"frost",sound:"ice"},zr={ramp:["#193116","#467d23","#a7d73a","#f1fac1"],contrast:"#a366bb",motion:2,imprint:"wet",sound:"water"},Hr={ramp:["#302749","#7774b8","#c4c3eb","#f6efff"],contrast:"#94cfed",motion:3,imprint:"charge",sound:"light"},Br={ramp:["#22254e","#525fbd","#91c3f1","#f2faff"],contrast:"#e6bf78",motion:4,imprint:"charge",sound:"storm"},Ir={ramp:["#30221d","#81532d","#ce9b55","#f3d9a4"],contrast:"#95b88b",motion:5,imprint:"push",sound:"earth"},Nr={ramp:["#20192f","#674878","#b289c1","#f1d8f5"],contrast:"#b9a2d3",motion:6,imprint:"scorch",sound:"void"},Gr={ramp:["#273426","#518551","#d895b6","#f6dddc"],contrast:"#b1d97d",motion:7,imprint:"bloom",sound:"nature"},Ur={ramp:["#173646","#28799c","#6fc9db","#dbf6ee"],contrast:"#b5dce5",motion:2,imprint:"wet",sound:"water"},_r={ramp:["#41302c","#9b7142","#dcb67a","#f4e1b2"],contrast:"#bba38c",motion:5,imprint:"push",sound:"earth"},Yr={ramp:["#233025","#536542","#a1a66a","#e2d7a6"],contrast:"#c6a26f",motion:7,imprint:"bloom",sound:"nature"},Wr={ramp:["#283c41","#629298","#abd1cf","#edf2da"],contrast:"#e0d8b1",motion:3,imprint:"push",sound:"wind"},Kr={ramp:["#352239","#a65879","#dfad66","#fff0c2"],contrast:"#e598bb",motion:7,imprint:"bloom",sound:"party"},ge={fire:Pr,frost:Dr,venom:zr,moonlight:Hr,storm:Br,earth:Ir,shadow:Nr,bloom:Gr,water:Ur,sand:_r,wood:Yr,wind:Wr,party:Kr},$r={id:0,size:1.7,ground:!1},qr={id:1,size:4,ground:!1},jr={id:2,size:1.1,ground:!1},Jr={id:3,size:2,ground:!0},Vr={id:4,size:3.2,ground:!1},Xr={id:5,size:9,ground:!1},Zr={id:6,size:5,ground:!1},Qr={id:7,size:6,ground:!1},es={id:8,size:2,ground:!0},ts={id:9,size:5,ground:!1},os={id:10,size:2.2,ground:!1},as={id:11,size:1.1,ground:!1},ce={projectile:$r,burst:qr,beam:jr,zone:Jr,aura:Vr,pillar:Xr,vortex:Zr,dome:Qr,trap:es,eruption:ts,lob:os,trail:as},rs=[.25,.45,.65,1],ss=[.6,1.4],is=[.08,.25],ns=.5,ls=6,us=.2,hs=[6,18],cs=[.2,.85],ds=128,fs=200,gs=5,ps=256,vs=2048,T={levels:rs,size:ss,halo:is,secondaryAt:ns,lightCap:ls,lightEase:us,lightReach:hs,lightStrength:cs,fieldSize:ds,fieldMetres:fs,imprintSeconds:gs,pool:ps,instances:vs},$t=["frost","scorch","wet","bloom","charge","push"],fe=Object.keys(ge),qt=Object.keys(ce),lt=e=>T.levels[Math.max(0,Math.min(3,Math.round(e)))]??.65,$e=(e,t)=>e[0]+(e[1]-e[0])*Math.max(0,Math.min(1,t));function Fe(e){return Object.hasOwn(ge,e)?e:"moonlight"}function ut(e,t,r,l,i){return Math.max(0,r)/(1+Math.hypot(e-l,t-i)/12)}class ms{constructor(t=T.fieldSize,r=T.fieldMetres){this.size=t,this.metres=r,this.data=new Uint8Array(t*t*8),this.values=new Float32Array(this.data.length),this.cell=r/t}size;metres;data;values;x=0;z=0;cell;ready=!1;index(t,r){return((r%this.size+this.size)%this.size*this.size+(t%this.size+this.size)%this.size)*8}move(t,r){const l=Math.floor(t/this.cell)-this.size/2,i=Math.floor(r/this.cell)-this.size/2;if(!(this.ready&&l===this.x&&i===this.z)){for(let s=i;s<i+this.size;s++)for(let a=l;a<l+this.size;a++)if(!this.ready||a<this.x||a>=this.x+this.size||s<this.z||s>=this.z+this.size){const n=this.index(a,s);this.values.fill(0,n,n+8),this.data.fill(0,n,n+8)}this.x=l,this.z=i,this.ready=!0}}decay(t){const r=Math.max(0,t)*255/T.imprintSeconds;if(r)for(let l=0;l<this.values.length;l++)this.values[l]=Math.max(0,this.values[l]-r)}stamp(t,r,l,i,s){const a=$t.indexOf(i);if(a<0||!(l>0)||!this.ready)return;const n=Math.max(this.x,Math.floor((t-l)/this.cell)),u=Math.min(this.x+this.size-1,Math.floor((t+l)/this.cell)),h=Math.max(this.z,Math.floor((r-l)/this.cell)),d=Math.min(this.z+this.size-1,Math.floor((r+l)/this.cell));for(let c=h;c<=d;c++)for(let f=n;f<=u;f++){const v=Math.hypot((f+.5)*this.cell-t,(c+.5)*this.cell-r),m=Math.max(0,1-v/l)*Math.min(1,Math.max(0,s))*255,g=this.index(f,c)+a;this.values[g]=Math.max(this.values[g],m)}}publish(){for(let t=0;t<this.data.length;t++)this.data[t]=Math.round(this.values[t])}at(t,r,l){const i=Math.floor(t/this.cell),s=Math.floor(r/this.cell);return i<this.x||i>=this.x+this.size||s<this.z||s>=this.z+this.size?0:this.values[this.index(i,s)+$t.indexOf(l)]/255}reset(){this.values.fill(0),this.data.fill(0),this.ready=!1}}const jt=()=>{const e=Xe(new Qe(new Uint8Array(T.fieldSize**2*4),T.fieldSize,T.fieldSize),"fx");return e.minFilter=e.magFilter=se,e.wrapS=e.wrapT=jo,e.generateMipmaps=!1,e.needsUpdate=!0,e},Z={uFxField:{value:jt()},uFxExtra:{value:jt()},uFxBox:{value:new C(0,0,T.fieldMetres,T.fieldSize)},uFxOn:{value:0},uFxTime:{value:0},uFxCalm:{value:0},uFxVertex:{value:1}},Oo=`
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
`;function Fi(e){return 1/(e.artPixelsPerMetre*(2/e.pixelSize))}const Ve={uPotionSky:{value:0},uPoolReadability:{value:new URLSearchParams(globalThis.location?.search??"").get("poolreadability")==="1"?1:0},uMoodRim:{value:new C},uRimInset:{value:0},uWitchGlow:{value:0},uWitchLift:{value:0},uRight:{value:new _(1,0,0)},uUp:{value:new _(0,1,0)},uFacing:{value:new _(0,0,1)},uTopFade:{value:0},uCutout:{value:new C(0,0,0,1)},uCutWhole:{value:0},uCutShape:{value:new C(0,.35,0,.2)},uDebugCull:{value:0},uRes:{value:new j(1,1)},uWitch:{value:new C(0,0,0,0)},uWitchDepth:{value:0},uOcc:{value:new C(.38,6,2.5,1)},uNearCut:{value:0},uCircleBox:{value:new C(0,0,0,0)},uCircleFade:{value:new C(0,0,1,1)},uEdgeDither:{value:0},uHoleHard:{value:0},uCircleKeep:{value:new C(0,0,0,0)},uWholeCull:{value:typeof location<"u"&&new URLSearchParams(location.search).get("wholecull")==="0"?0:1},uParty:{value:Array.from({length:16},()=>new C)},uPartyCol:{value:Array.from({length:16},()=>new _)},uPartyCount:{value:0},uUplight:{value:new C},uTrunkFade:{value:new _(0,.125,.3)},uFindLook:{value:new C},uEyeRgb:{value:new _(1,.8,.35)},uEyeRange:{value:40},uTrunkLook:{value:new j(.8,.5)},uAreaAvg:{value:1},uSeeDepth:{value:1},uSeeDbg:{value:new C(1,0,1,0)},uCullByPass:{value:new URLSearchParams(globalThis.location?.search??"").get("cullpass")==="0"?0:1},uCullDbg:{value:7},uSeeEarly:{value:1},uSeeTwo:{value:1},uSeeDither:{value:0},uSeeShowA:{value:0},uSeeSolid:{value:0},uDebugTrunks:{value:0},uWind:{value:new C(0,0,1,0)},uLeafJitter:{value:new _(0,0,0)},uWatch:{value:new C(0,0,9,0)}},Oe=`
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
attribute vec2 iJitter; // a tree's own leaf-colour jitter seeds, -1 to 1 (hue, value); 0 for everything else (render/view/scenery.ts; Ed, 2026-10-16)
varying float vGlow;
varying vec2 vJitter;
varying float vSwayM; // metres its leafiest pixels move this frame (masked sprites)
varying vec4 vFrame;  // its frame in the atlas (u0, v0, u1, v1), to keep the sway inside it
uniform vec4 uWind;
uniform vec4 uWatch;
varying vec2 vUv;
varying vec3 vWorld;
varying vec3 vFlags;
varying float vSmall;
varying float vFront;
varying vec2 vLocal;
varying float vSizeY;
varying vec2 vGround; // its ground spot under this pixel: its foot, across its width (the cast shadows: render/castShadows.ts)
${xt}
${da}${Et}${Ma}
${Oo}
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
  // Tall and nearer the camera than the witch: it may stand in front of her.
  // Eased over a few metres of depth and of height, so nothing snaps into the fade as she moves.
  vFront = smoothstep(0.0, 3.0, uWitchDepth - 0.5 + (viewMatrix * vec4(base, 1.0)).z) * smoothstep(uOcc.z * 0.7, uOcc.z * 1.3, iSize.y);
  // Lying on the ground (a great stump, render/view/home.ts): its rows away from the camera, as the art's camera saw them, so every
  // pixel of its ground is on the ground at any pitch, bent with it (Ed, 2026-10-29: "Stumps do not sit on the ground").
  vec3 upv = uLie > 0.0 ? cross(vec3(0.0, 1.0, 0.0), uRight) * uLie : uUp;
  vec3 w = base + uRight * (position.x * iSize.x) + upv * (position.y * iSize.y);
  w += uRight * (uLean.x * position.y * iSize.y) + uUp * (uLean.y * position.x * iSize.x);
  // Wind (Ed, v171): leafy things lean with gusts travelling across the forest, anchored at their
  // base (a crown at its foot, a trunk barely), so the trunks stay put and the foliage moves.
  if (iFlags.w > 0.0 && uWind.x > 0.0) {
    vec2 q = iPos.xz / uWind.z - vec2(0.8, 0.35) * uWind.w * uWind.y / uWind.z;
    float gust = windGust(q);
    float flutter = sin(uWind.w * 1.7 + dot(iPos.xz, vec2(0.31, 0.17))) * 0.35;
    w += uRight * (uWind.x * iFlags.w * uv.y * uv.y * (gust * 0.9 + flutter)) * min(1.0, iSize.y / 8.0);
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
    vSwayM = uWind.x * -iFlags.w * (gust * 0.9 + flutter) * min(1.0, iSize.y / 8.0);
  }
  // The trees watching her (Ed, 2026-10-07, the wild forest eerier: "canopy tips within a few metres of her sway a beat late
  // and slightly towards her, as if the trees lean in to watch"): a leafy thing near where she was a moment ago (uWatch,
  // eased behind her) leans its tip that way, across the screen, none at its foot; a nudge, no new objects.
  if (uWatch.w > 0.0 && iFlags.w != 0.0) {
    vec2 d = uWatch.xy - iPos.xz;
    float r = length(d), k = (1.0 - smoothstep(uWatch.z * 0.4, uWatch.z, r)) * smoothstep(0.3, 1.2, r);
    float lean = uWatch.w * k * dot(d / max(r, 1e-3), normalize(uRight.xz + vec2(1e-6, 0.0))) * abs(iFlags.w) * min(1.0, iSize.y / 8.0);
    if (iFlags.w > 0.0) w += uRight * (lean * uv.y * uv.y);
    else vSwayM += lean;
  }
  vFrame = vec4(min(iUv.x, iUv.z), min(iUv.y, iUv.w), max(iUv.x, iUv.z), max(iUv.y, iUv.w));
  float u = iFlags.x > 0.5 ? 1.0 - uv.x : uv.x;
  vUv = vec2(mix(iUv.x, iUv.z, u), mix(iUv.w, iUv.y, uv.y));
  vFlags = iFlags.xyz;
  vFlags.z = mod(iFlags.z, 2.0); vSmall = step(1.5, iFlags.z);
  vGlow = iGlow;
  vJitter = iJitter;
  vLocal = uv;
  vSizeY = iSize.y;
  vWorld = w;
  vGround = uLie > 0.0 ? w.xz : (iPos + uRight * (position.x * iSize.x)).xz;
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
  vec4 c0 = clipOf(base), c1 = clipOf(base + upv * iSize.y);
  vec2 s0 = (c0.xy / c0.w * 0.5 + 0.5) * uRes, s1 = (c1.xy / c1.w * 0.5 + 0.5) * uRes;
  float hh = abs(s1.y - s0.y) * 0.5 + 1.0, hw = hh * iSize.x / max(iSize.y, 0.01);
  if (uLie > 0.0) { vec4 c2 = clipOf(base + uRight * (iSize.x * 0.5)); hw = abs(c2.x / c2.w - c0.x / c0.w) * 0.5 * uRes.x + 1.0; } // (lying, not square to the camera)
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
  float pxm = 2.0 * hh / max(iSize.y, 0.01); // (screen pixels a metre, up the sprite)
  vec2 halfPx = vec2(hw, hh) + 4.0 + pxm * (abs(uWind.x) * abs(iFlags.w) * 1.3 * min(1.0, iSize.y / 8.0) + abs(uLean.x) * iSize.y + abs(uLean.y) * iSize.x + abs(uWatch.w) * abs(iFlags.w));
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
      if (length(iPos.xz - uHazeCentre) + iSize.x * 0.5 + 2.0 > r - uScenery.y && mod(floor(dbg / 4.0), 2.0) > 0.5) part = true;
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
`,Re=`
${Lr()}
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
uniform float uPotionSky;
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
${Lt}
${Oo}
varying vec2 vFxBase;
varying vec4 vFxPaint;
varying vec2 vFxInfo;
${Tr}
${Rr}
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
float occl, shown, trunkA;
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
  if (vFlags.y > 0.5) {
    shown = max(hole, uTopFade);
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
  vec4 n = normalAt(uvS);
  if (areaOn) n = areaAvg(true, uvS, n);
  float nx = (n.r * 255.0 - 128.0) / 127.0, ny = (n.g * 255.0 - 128.0) / 127.0, nz = n.b;
  if (vFlags.x > 0.5) nx = -nx;
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
`,bs=-.5;function Oi(e){for(const t of e.meshes)t.renderOrder=bs,t.material.depthWrite=!1;return e}const ht=[],ct=[],ws={value:new C(1,.85,.35,0)};class Ri{constructor(t,r,l={}){this.atlas=t,this.metresPerPixel=r;const i=new Mt(1,1);i.translate(0,.5,0),this.geo=new to,this.geo.index=i.index,this.geo.setAttribute("position",i.getAttribute("position")),this.geo.setAttribute("uv",i.getAttribute("uv")),this.pos=this.size=this.uvs=this.flags=this.glow=void 0,this.grow(64);const s=h=>({...V,...Ve,...ze,...ue,...Cr(t),uUnlit:{value:l.unlit?1:0},uIsScenery:{value:l.scenery?1:0},uAppear:this.appearU,uArrivalFade:this.arrivalFade,uFadePass:{value:0},uHasFade:{value:l.fade?1:0},uFlat:{value:l.flat||l.solid?1:0},uLies:{value:l.flat?1:0},...bt,uSilhouette:{value:new C(0,0,0,0)},uWitchLight:Or(l.witchLight),uFind:{value:l.find?1:0},uRimOn:{value:l.rim?1:0},uTint:l.tint??{value:new C(0,0,0,0)},uShadow:l.shadow?ws:{value:new C(0,0,0,0)},uLegend:{value:l.legend??new C(0,0,0,0)},uSteps:{value:l.steps??0},uLegendFloor:{value:l.legendFloor??0},uLegendAwake:{value:l.legendAwake??0},uGlowGain:l.glowGain??{value:1},uAbsolute:{value:l.absolute?1:0},uLie:{value:l.lie??0},uLean:this.leanU,...h}),a=l.scenery?{blending:oo,blendSrc:Vo,blendDst:Jo}:{},n=l.scenery?{stencilWrite:!0,stencilRef:1,stencilFunc:Bt,stencilZPass:Ht}:l.unmark?{stencilWrite:!0,stencilRef:0,stencilFunc:Bt,stencilZPass:Ht}:{},u=new re({vertexShader:Oe,fragmentShader:Re,uniforms:s({}),depthTest:!l.onTop,depthWrite:!l.onTop&&!l.shadow,...a,...n,...l.shadow?{transparent:!0}:{}});if(this.mesh=new de(this.geo,u),this.mesh.frustumCulled=!1,l.onTop&&(this.mesh.renderOrder=10),l.scenery&&(this.mesh.renderOrder=.5),this.meshes=[this.mesh],l.fade){const h=new de(this.geo,new re({vertexShader:Oe,fragmentShader:Re,uniforms:s({uFadePass:{value:1}}),transparent:!0,depthWrite:!1})),d=new de(this.geo,new re({vertexShader:Oe,fragmentShader:Re,uniforms:s({uFadePass:{value:3}}),transparent:!0,depthWrite:!0}));d.frustumCulled=!1,d.renderOrder=10.9,h.frustumCulled=!1,h.renderOrder=11,l.scenery&&Object.assign(h.material,n,{stencilWrite:!1}),ht.push(h.material),ct.push(h);const c=new de(this.geo,new re({vertexShader:Oe,fragmentShader:Re,uniforms:s({uFadePass:{value:2}}),transparent:!0,colorWrite:!1,depthWrite:!0}));c.frustumCulled=!1,c.renderOrder=19.9,typeof location<"u"&&new URLSearchParams(location.search).get("seedepth")==="off"&&(c.material.depthWrite=!1),this.meshes.push(h,c,d)}if(l.silhouette){const h=l.silhouette.colour,d=new de(this.geo,new re({vertexShader:Oe,fragmentShader:Re,uniforms:s({uSilhouette:{value:new C(h.x,h.y,h.z,l.silhouette.opacity)}}),transparent:!0,depthWrite:!1,depthFunc:Xo}));d.frustumCulled=!1,d.renderOrder=12,this.meshes.push(d),this.sil=d}for(const h of this.meshes)Object.assign(h.material.uniforms,Z)}atlas;metresPerPixel;mesh;meshes;geo;pos;size;uvs;flags;glow;jitter;capacity=0;dirty=[new X,new X,new X,new X,new X,new X];count=0;name(t){return this.meshes.forEach((r,l)=>{r.name=l===0?t:`${t} (${l===1&&this.meshes.length>1&&r!==this.sil?"see-through":"silhouette"})`}),this}setAtlas(t){this.atlas=t;for(const r of this.meshes)Fr(r.material.uniforms,t)}sil=null;set silhouette(t){this.sil&&(this.sil.visible=t)}set silhouetteColour(t){const r=this.sil&&this.sil.material.uniforms.uSilhouette.value;r&&r.set(t.x,t.y,t.z,r.w)}set silhouetteOpacity(t){const r=this.sil&&this.sil.material.uniforms.uSilhouette.value;r&&(r.w=t)}grow(t){const r=Math.max(t,this.capacity*2);this.geo.dispose();const l=(i,s)=>{const a=new ao(new Float32Array(r*i),i);return a.setUsage(ro),s&&a.array.set(s.array),a};this.pos=l(3,this.pos),this.size=l(3,this.size),this.uvs=l(4,this.uvs),this.flags=l(4,this.flags),this.glow=l(1,this.glow),this.jitter=l(2,this.jitter),this.geo.setAttribute("iPos",this.pos),this.geo.setAttribute("iSize",this.size),this.geo.setAttribute("iUv",this.uvs),this.geo.setAttribute("iFlags",this.flags),this.geo.setAttribute("iGlow",this.glow),this.geo.setAttribute("iJitter",this.jitter),this.capacity=r}leanU={value:new C};appearU={value:1};arrivalFade={value:1};items=[];set(t){this.items=t,t.length>this.capacity&&this.grow(t.length);const r=this.pos.array,l=this.size.array,i=this.uvs.array,s=this.flags.array,a=this.glow.array,n=this.jitter.array,u=this.dirty[0],h=this.dirty[1],d=this.dirty[2],c=this.dirty[3],f=this.dirty[4],v=this.dirty[5],m=this.metresPerPixel;for(let b=0,y=t.length;b<y;b++){const w=t[b],M=w.frame,A=M.uv,L=w.scale??1;let x=b*3;(r[x]!==w.x||r[x+1]!==w.y||r[x+2]!==w.z)&&(r[x]=w.x,r[x+1]=w.y,r[x+2]=w.z,u.touch(b));const E=(w.sx===void 0?M.w:Math.max(1,Math.round(M.w*w.sx)))*m*L,F=(w.sy===void 0?M.h:Math.max(1,Math.round(M.h*w.sy)))*m*L,O=(w.foot??(w.top?0:M.foot??0))*m*L*(w.sx??1);x=b*3,(l[x]!==E||l[x+1]!==F||l[x+2]!==O)&&(l[x]=E,l[x+1]=F,l[x+2]=O,h.touch(b)),x=b*4,(i[x]!==A[0]||i[x+1]!==A[1]||i[x+2]!==A[2]||i[x+3]!==A[3])&&(i[x]=A[0],i[x+1]=A[1],i[x+2]=A[2],i[x+3]=A[3],d.touch(b));const k=w.flip?1:0,R=w.top?1:w.cut?-w.cut:0,N=(w.fresh?1:0)+(w.small?2:0),ae=(M.masked?-1:1)*(w.sway??0);(s[x]!==k||s[x+1]!==R||s[x+2]!==N||s[x+3]!==ae)&&(s[x]=k,s[x+1]=R,s[x+2]=N,s[x+3]=ae,c.touch(b));const ye=w.glow??0;a[b]!==ye&&(a[b]=ye,f.touch(b));const J=w.jitter,ie=J?J[0]:0,D=J?J[1]:0;x=b*2,(n[x]!==ie||n[x+1]!==D)&&(n[x]=ie,n[x+1]=D,v.touch(b))}u.flush(this.pos),h.flush(this.size),d.flush(this.uvs),c.flush(this.flags),f.flush(this.glow),v.flush(this.jitter),this.count=t.length,this.geo.instanceCount=t.length;const g=this.meshes,p=t.length>0;for(let b=0;b<g.length;b++)g[b].visible=p}get dropped(){const t=this.geo._maxInstanceCount;return t===void 0||!this.mesh.visible?0:Math.max(0,this.count-t)}release(){this.geo.dispose();for(const t of this.meshes){t.material.dispose();const r=ct.indexOf(t);r>=0&&(ct.splice(r,1),ht.splice(ht.indexOf(t.material),1))}}dispose(){this.release(),this.atlas.albedo.dispose(),this.atlas.normal.dispose()}}const ys=`
uniform vec3 uRight,uUp;
uniform float uFlat,uMpp;uniform vec2 uRes;
attribute vec3 iPos; attribute float iSize,iDraw,iShine; attribute vec4 iUv,iCol;
varying vec2 vP; varying vec4 vData,vCol; varying vec3 vWorld;varying vec2 vGrid;
${xt}
${Et}
void main(){
  vP=uv*2.0-1.0;vData=iUv;vCol=iCol;
  vGrid=vec2(max(1.0,floor(iSize/uMpp+0.5)));
  vec2 p=position.xy;
  vec3 w=uFlat>0.5?onGround(iPos+vec3(p.x*iSize,0.06,-p.y*iSize)):onGround(iPos)+uRight*p.x*iSize+uUp*p.y*iSize;
  if(((iUv.x>1.5 && iUv.x<2.5)||iUv.x>10.5) && iDraw<0.0){
    vec2 direction=vec2(cos(iShine),sin(iShine)),side=vec2(-direction.y,direction.x);
    // The quad's top edge points north, matching the ground layers' front-face winding (+Y).
    vec2 q=direction*p.x*(-iDraw)-side*p.y*iSize;
    w=onGround(iPos+vec3(q.x,iUv.x>10.5?p.x*iUv.w:0.0,q.y));vGrid=vec2(max(1.0,floor(-iDraw/uMpp+0.5)),vGrid.y);
  }
  vWorld=w;gl_Position=clipOf(w);
  if(uFlat<0.5)gl_Position.xy+=pixelSnap(clipOf(onGround(iPos)))*gl_Position.w;
  if(overBend(onGround(iPos))<0.5)gl_Position=vec4(2.0,2.0,2.0,1.0);
}`,xs=`
uniform sampler2D uFxRamp;uniform float uFxTime,uLayer,uCalm,uSecondary,uDistort;uniform vec2 uHalo;
varying vec2 vP;varying vec4 vData,vCol;varying vec3 vWorld;varying vec2 vGrid;
${Lt}
float hash(vec2 q){return fract(sin(dot(q,vec2(127.1,311.7)))*43758.5453);}
vec4 ramp(float tone){return texelFetch(uFxRamp,ivec2(int(clamp(tone,0.0,3.0)),int(vData.y+0.5)),0);}
void main(){
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
  float r=length(p),angle=atan(p.y,p.x),d;
  if(form>10.5)d=max(abs(p.y)*3.0,abs(p.x)*1.1);
  else if(form<0.5 || form>9.5)d=length(p*vec2(1.1,1.3));
  else if(form<1.5)d=r/(0.65+sin(angle*7.0-time)*0.07+phase*0.15);
  // Broader, longer visible core inside the same authored beam quad; endpoints and draw cost stay bounded.
  else if(form<2.5)d=max(abs(p.y)*1.25,abs(p.x)*0.82);
  else if(form<3.5)d=max(abs(r-(0.55+phase*0.25))*5.0,r*0.9);
  else if(form<4.5)d=abs(length(p*vec2(1.0,0.85))-0.62)*6.0;
  else if(form<5.5)d=max(abs(p.x)/(0.15+(1.0-p.y)*0.2),abs(p.y)*1.1);
  else if(form<6.5)d=abs(r-(0.5+sin(angle*3.0+time*2.0+r*8.0)*0.15))*5.0;
  else if(form<7.5)d=abs(length(p*vec2(1.0,0.8))-0.75)*7.0;
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
  if(uLayer<0.5){a=(1.0-smoothstep(0.7,1.4,d))*0.65;if(a<0.01)discard;rgb=ramp(0.0).rgb*(uSecondary>0.5?clamp(nightLight(vec3(0.0,1.0,0.0),vWorld),vec3(0.2),vec3(1.25)):vec3(0.65));}
  else if(uLayer<1.5){
    if(d>0.95)discard;
    // A pale family-coloured core and a thin dark border separate from mid-green forest by value.
    if(beam)rgb=d>0.8?ramp(0.0).rgb*0.18:ramp(d<0.55?3.0:2.0).rgb;
    else rgb=ramp(d<0.28?3.0:d<0.5?2.0:d<0.75?1.0:0.0).rgb;
  }
  else if(uLayer<2.5){a=(1.0-smoothstep(0.15,1.6,d))*mix(uHalo.x,uHalo.y,strength);if(hash(floor(p*24.0))>a*3.0)discard;rgb=ramp(1.0).rgb;a=min(a,uCalm>0.5?0.12:0.24);}
  else { // rising embers, stepped shards, curling drops, forks, dust and petals in one fixed instance pool
    vec2 cell=floor(flow*24.0);float spark=hash(cell);
    bool detail=uSecondary>0.5 && strength>${T.secondaryAt} && abs(sin(angle*4.0+time+r*9.0))<0.08 && r>0.45 && r<0.8;
    if(!detail && (spark<0.985-strength*0.012 || r>0.95))discard;
    rgb=detail?texelFetch(uFxRamp,ivec2(4,int(vData.y+0.5)),0).rgb:ramp(2.0).rgb;a=0.65;
  }
  if(form>10.5)a*=smoothstep(-1.0,0.7,p.x);
  a*=vCol.a;if(a<0.01)discard;
  gl_FragColor=vec4(haze(rgb*vCol.rgb,vWorld),a);
}`;class Ms{layers=[];time={value:0};calm={value:0};secondary={value:1};distort={value:1};mpp={value:.09375};count=0;canopy=!1;constructor(t){const r=new Uint8Array(5*fe.length*4);fe.forEach((i,s)=>{const a=ge[i];[...a.ramp,a.contrast].forEach((n,u)=>{const h=parseInt(n.slice(1),16),d=(s*5+u)*4;r.set([h>>16,h>>8&255,h&255,a.motion],d)})});const l=Xe(new Qe(r,5,fe.length),"fx");l.minFilter=l.magFilter=se,l.needsUpdate=!0;for(let i=0;i<9;i++){const s=i===8,a=s?0:Math.floor(i/4),n=s?2:i%4,u=new re({vertexShader:ys,fragmentShader:xs,uniforms:{...V,...ze,uRight:Ve.uRight,uUp:Ve.uUp,uRes:Ve.uRes,uMpp:this.mpp,uHalo:{value:new j(...T.halo)},uFxRamp:{value:l},uFlat:{value:a},uLayer:{value:n},uFxTime:this.time,uCalm:this.calm,uSecondary:this.secondary,uDistort:this.distort},transparent:!0,depthWrite:!1,depthTest:!s,blending:n>=2?Zo:Qo}),h=new ya(u);h.mesh.name=s?"Magic canopy halo":`Magic ${a?"ground":"upright"} layer ${n}`,h.mesh.renderOrder=s?11.2:a?2.9+n*.01:2.8+n*.01,t.add(h.mesh),this.layers.push(h)}}begin(t,r){this.time.value=t,this.calm.value=r?1:0,this.count=0;for(const l of this.layers)l.begin()}add(t,r,l,i,s,a,n,u=null,h=!0){for(let d=0;d<(h?4:3);d++){if(d!==1){if(this.count>=T.instances)continue;this.count++}this.layers[(n?4:0)+d].add(t,r,l,i*(d===0?1.12:d===2?1.45:1),s,u?.[0]??1,u?.[1]??1,u?.[2]??1,a)}!n&&this.canopy&&this.secondary.value>.5&&this.count<T.instances&&(this.count++,this.layers[8].add(t,r,l,i*1.5,s,u?.[0]??1,u?.[1]??1,u?.[2]??1,a*.12))}beam(t,r,l,i,s,a,n,u,h){for(let d=0;d<4;d++){if(d!==1){if(this.count>=T.instances)continue;this.count++}this.layers[d].add(t,r,l,a*(d===0?1.12:d===2?1.45:1),n,h?.[0]??1,h?.[1]??1,h?.[2]??1,u,-i,!1,s)}this.canopy&&this.secondary.value>.5&&this.count<T.instances&&(this.count++,this.layers[8].add(t,r,l,a*1.5,n,h?.[0]??1,h?.[1]??1,h?.[2]??1,u*.12,-i,!1,s))}end(){for(const t of this.layers)t.end()}}const Ss={element:"party",form:"beam",intensity:.45,preserveHue:!0,light:.12,anchor:.08},As={element:"party",form:"beam",intensity:.65,preserveHue:!0,light:.08,anchor:.04},Es={element:"party",form:"projectile",intensity:.25,preserveHue:!0,light:.04,anchor:.02},Ls={element:"moonlight",form:"aura",intensity:.45,preserveHue:!0,light:0,anchor:.06},Cs={element:"water",form:"aura",intensity:.25,preserveHue:!0,light:.05,anchor:.02},Fs={element:"moonlight",form:"pillar",intensity:.65,preserveHue:!0,light:0,anchor:0},Os={element:"party",form:"beam",intensity:.65,preserveHue:!0,light:.14,anchor:.08},Rs={element:"moonlight",form:"dome",intensity:.65,preserveHue:!0,light:0,anchor:0},ks={element:"water",form:"zone",intensity:.45,preserveHue:!0,light:0,anchor:0},Ts={element:"party",form:"burst",intensity:1,preserveHue:!0,light:0,anchor:0},Ps={element:"moonlight",form:"aura",intensity:.45,preserveHue:!0,light:0,anchor:0},Ro={flightTrail:Ss,partySwoop:As,broomSpark:Es,sigil:Ls,ringDot:Cs,runestone:Fs,ley:Os,hologram:Rs,lake:ks,firework:Ts,decorativeGlow:Ps},ko={value:1};function Ds(e){const t=Ro[e],r=ge[t.element];return{uNativeOn:ko,uNativeRamp:{value:r.ramp.map(l=>new _((parseInt(l.slice(1),16)>>16)/255,(parseInt(l.slice(1),16)>>8&255)/255,(parseInt(l.slice(1),16)&255)/255))},uNativeStyle:{value:new j(t.intensity,t.preserveHue?1:0)}}}const zs=`
uniform float uNativeOn;uniform vec3 uNativeRamp[4];uniform vec2 uNativeStyle;
vec3 nativeFxColour(vec3 c){
  if(uNativeOn<0.5)return c;
  float l=max(c.r,max(c.g,c.b));if(l<0.00001)return c;
  vec3 band=l<0.2?uNativeRamp[0]:l<0.45?uNativeRamp[1]:l<0.75?uNativeRamp[2]:uNativeRamp[3];
  if(uNativeStyle.y>0.5)band=c/l*max(band.r,max(band.g,band.b));
  // Retain the native form's falloff and authored hue; quantise its light toward the family's ramp.
  return mix(c,band*min(1.0,l*1.2),0.18*uNativeStyle.x);
}`;function ki(e,t){e.traverse(r=>{const l=r.material;for(const i of Array.isArray(l)?l:[l]){if(!(i instanceof re)||i.userData.nativeFx)return;/void\s+main\s*\(/.test(i.fragmentShader)&&(i.fragmentShader=zs+i.fragmentShader.replace(/void\s+main\s*\(/,"void nativeMain(")+`
void main(){nativeMain();gl_FragColor.rgb=nativeFxColour(gl_FragColor.rgb);}
`,Object.assign(i.uniforms,Ds(t)),i.userData.nativeFx=t,i.needsUpdate=!0)}})}const Hs={shakeCap:.18,seconds:.5,minimumIntensity:.85},ke={screen:Hs},q={distortion:!0,imprints:!0,secondary:!0,lightCap:T.lightCap,particles:1},Jt=new WeakMap;function Ti(e){let t=Jt.get(e);return t||(t=new Bs(e),Jt.set(e,t)),t}class Bs{quality=q;fieldUniforms=Z;batches;field=new ms;stats={lights:0,requests:0,instances:0,fieldBytes:T.fieldSize**2*8};enabled=new URLSearchParams(globalThis.location?.search??"").get("magic")!=="old";galleryPage=0;galleryElement=null;galleryTime=null;captureTime=null;galleryDark=!1;galleryCamera=null;galleryVisible=!0;galleryLegacyVisible=!0;legacyParty=null;panel=null;hidden=[];background=null;lights=new Map;bursts=[];data=[0,0,0,0];selected=[];owner=null;time=0;dt=0;cx=0;cz=0;screenAt=-1/0;screenStrength=0;constructor(t){this.batches=new Ms(t)}begin(t,r,l,i){t=this.captureTime??t,(this.owner!==i||t<this.time)&&(this.reset(),this.owner=i,this.time=t),this.dt=Math.max(0,t-this.time),this.time=t,this.cx=r,this.cz=l,ko.value=this.enabled?1:0,this.field.move(r,l),this.field.decay(this.dt),this.batches.begin(t,Ee.reduceFlashing),this.batches.secondary.value=q.secondary?1:0,this.batches.distort.value=q.distortion&&!Ee.reduceFlashing?1:0,Z.uFxOn.value=this.enabled&&q.imprints?1:0,Z.uFxTime.value=t,Z.uFxCalm.value=Ee.reduceFlashing?1:0,this.stats.instances=0}reset(){this.field.reset(),this.lights.clear(),this.bursts.length=0,this.screenAt=-1/0,this.screenStrength=0}get screenKick(){if(!this.enabled||Ee.reduceFlashing)return 0;const t=Math.max(0,(this.time-this.screenAt)/ke.screen.seconds);return t>=1?0:Math.min(ke.screen.shakeCap,this.screenStrength)*(1-t)**2}draw(t,r,l,i,s,a,n=1,u=1,h=0,d=0,c=null,f=lt(a)){if(!this.enabled||!(u>.01)||Math.hypot(l-this.cx,s-this.cz)>140)return;const v=Fe(t),m=ge[v],g=ce[r],p=this.batches.mpp.value,b=Math.max(p,Math.round(g.size*n*$e(T.size,f)/p)*p);f>=ke.screen.minimumIntensity&&(r==="burst"||r==="eruption")&&h<.15&&(this.screenAt=this.time,this.screenStrength=ke.screen.shakeCap*u),this.data[0]=g.id,this.data[1]=fe.indexOf(v),this.data[2]=f,this.data[3]=h,this.batches.add(l,i,s,b,this.data,u,g.ground,c,q.particles>.5||(d&1)===0),this.stats.instances++,g.ground||(this.data[0]=ce.zone.id,this.batches.add(l,0,s,Math.min(b*.75,12),this.data,u*.18,!0,c,!1)),this.light(`${v}:${r}:${d}`,l,i,s,v,f,u,c),q.imprints&&(r==="burst"||r==="zone"||r==="eruption"||r==="beam"||r==="projectile"||r==="vortex"||r==="pillar")&&this.field.stamp(l,s,Math.max(2,Math.min(18,b*.6)),m.imprint,f*u*(r==="projectile"?.25:1))}emit(t,r,l,i,s,a,n=1,u=1.2,h=0){this.bursts.length>=T.pool&&this.bursts.shift(),this.bursts.push({element:t,form:r,x:l,y:i,z:s,level:a,size:n,at:this.time,life:u,seed:h}),a>=3&&n>=1&&(this.screenAt=this.time,this.screenStrength=ke.screen.shakeCap)}native(t,r,l,i,s=1,a=0,n=null){if(!this.enabled||s<=.01||Math.hypot(r-this.cx,i-this.cz)>80)return;const u=Ro[t],h=Fe(u.element);u.light>0&&this.light(`native:${t}:${a}`,r,l,i,h,u.intensity,Math.min(1,s)*u.light,n),u.anchor>0&&(this.data[0]=ce.zone.id,this.data[1]=fe.indexOf(h),this.data[2]=u.intensity,this.data[3]=0,this.batches.add(r,0,i,Math.min(5,ce[u.form].size*1.5),this.data,u.anchor*Math.min(1,s),!0,n,!1))}beam(t,r,l,i,s,a,n,u,h,d,c=null,f=lt(u)){const v=Math.hypot(i-r,s-l);if(!this.enabled||v<.01||h<=.01)return;const m=Fe(t),g=(r+i)/2,p=(l+s)/2;if(Math.hypot(g-this.cx,p-this.cz)>140+v/2)return;this.data[0]=ce.beam.id,this.data[1]=fe.indexOf(m),this.data[2]=f,this.data[3]=this.time%1;const b=Math.abs(s-l)/v;this.batches.beam(g,a,p,v,Math.atan2(s-l,i-r),Math.max(n,this.batches.mpp.value*3)*(1+b*.35),this.data,h,c);const y=Math.min(8,Math.max(1,Math.ceil(v/4)));for(let w=0;w<=y;w++){const M=r+(i-r)*w/y,A=l+(s-l)*w/y;this.light(`${m}:beam:${d}:${w}`,M,a,A,m,f,h,c),q.imprints&&this.field.stamp(M,A,Math.max(2,n*1.5),ge[m].imprint,f*h)}this.stats.instances++}ribbon(t,r,l,i,s,a,n,u,h,d=null,c=lt(u)){const f=Math.hypot(s,n);if(!this.enabled||f<.1)return;const v=Math.min(.32,8/f),m=f*v,g=Fe(t);this.data[0]=ce.trail.id,this.data[1]=fe.indexOf(g),this.data[2]=c,this.data[3]=a*v,this.batches.beam(r-s*v/2,l-a*v/2,i-n*v/2,m,Math.atan2(n,s),.55*$e(T.size,c),this.data,.6,d),q.imprints&&(h&3)===0&&this.field.stamp(r-s*v,i-n*v,2,ge[g].imprint,.15*c)}light(t,r,l,i,s,a,n,u){let h=this.lights.get(t);if(!h){if(this.lights.size>=T.pool){const c=ut(r,i,a*n,this.cx,this.cz);let f="",v=1/0;for(const[m,g]of this.lights){const p=ut(g.x,g.z,g.target,this.cx,this.cz);p<v&&(f=m,v=p)}if(c<=v)return;this.lights.delete(f)}h={x:r,y:l,z:i,reach:0,rgb:new _,strength:0,target:0,seen:this.time,score:0,fade:0},this.lights.set(t,h)}const d=parseInt(ge[s].ramp[1].slice(1),16);h.x=r,h.y=l,h.z=i,h.reach=$e(T.lightReach,a),h.rgb.set(u?.[0]??(d>>16)/255,u?.[1]??(d>>8&255)/255,u?.[2]??(d&255)/255),h.target=$e(T.lightStrength,a)*Math.min(1,n)*(Ee.reduceFlashing?.5:1),h.seen=this.time}finish(t){let r=0;for(const a of this.bursts){const n=this.time-a.at;if(n<0||n>=a.life)continue;this.bursts[r++]=a;const u=n/a.life,h=Math.min(1,n/.2,(a.life-n)/.3);this.draw(a.element,a.form,a.x,a.y,a.z,a.level,a.size,h,u,a.seed)}this.bursts.length=r,this.batches.end(),this.field.publish();const l=Z.uFxField.value.image.data,i=Z.uFxExtra.value.image.data;let s=!1;for(let a=0,n=0;a<this.field.data.length;a+=8,n+=4)for(let u=0;u<4;u++){const h=this.field.data[a+u],d=this.field.data[a+u+4];(h||d)&&(s=!0),l[n+u]=h,i[n+u]=d}Z.uFxOn.value=s&&this.enabled&&q.imprints?1:0,Z.uFxField.value.needsUpdate=!0,Z.uFxExtra.value.needsUpdate=!0,Z.uFxBox.value.set(this.field.x*this.field.cell,this.field.z*this.field.cell,this.field.metres,this.field.size),this.applyLights(t)}applyLights(t){this.selected.length=0;for(const[n,u]of this.lights){const h=this.enabled&&u.seen===this.time,d=this.dt/T.lightEase;if(u.fade=Math.max(0,Math.min(1,u.fade+(h?d:-d))),u.strength=u.target*u.fade,!h&&u.fade<.001){this.lights.delete(n);continue}u.score=ut(u.x,u.z,u.strength,this.cx,this.cz),Math.hypot(u.x-this.cx,u.z-this.cz)<u.reach+30&&this.selected.push(u)}this.selected.sort((n,u)=>u.score-n.score),this.enabled||(this.selected.length=0);const r=V,l=Math.max(0,Math.min(we,Math.floor(t))),i=Math.min(q.lightCap,T.lightCap,l),s=Math.min(i,this.selected.length),a=Math.min(r.uLightCount.value,Math.max(0,l-s));for(let n=0;n<s;n++){const u=this.selected[n];r.uLightPos.value[a+n].set(u.x,ea(u.x,u.z)+u.y,u.z,u.reach),r.uLightCol.value[a+n].set(u.rgb.x,u.rgb.y,u.rgb.z,u.strength)}r.uLightCount.value=a+s,this.stats.lights=s,this.stats.requests=this.lights.size}gallery(t,r,l,i){if(this.galleryPanel(t),!this.galleryVisible)return;const s=(this.galleryTime??i)%4/4;if(this.galleryPage===3){const n=this.galleryElement??t;this.beam(n,r-13,l,r-3,l,1.5,1.4,2,.8,880001),this.beam(n,r+8,l-5,r+8,l+5,1.5,1.4,2,.8,880002);return}qt.slice(this.galleryPage*4,this.galleryPage*4+4).forEach((n,u)=>[.25,.6,1].forEach((h,d)=>{const c=r+(u-1.5)*10,f=l+(d-1)*12;if(n==="beam"){this.beam(this.galleryElement??t,c-3,f,c+3,f,1.5,1.4,2,.8,u*3+d,null,h);return}if(n==="trail"){this.ribbon(this.galleryElement??t,c+3,2,f,20,0,0,2,u*3+d,null,h);return}this.draw(this.galleryElement??t,n,c,ce[n].ground?0:n==="pillar"?5:2,f,2,1,.7,s,u*3+d,null,h)}))}galleryPanel(t){if(this.panel||typeof document>"u")return;const r=this.panel=document.createElement("aside");r.style.cssText="position:fixed;left:12px;top:12px;z-index:20000;background:#15131eee;color:#fff;padding:12px;font:14px monospace;max-width:420px";const l=document.createElement("div");l.textContent="Magic gallery · rows far → near: 0.25 / 0.6 / 1",r.append(l);const i=document.createElement("select");i.setAttribute("aria-label","Magic element");for(const c of fe){const f=document.createElement("option");f.value=f.textContent=c,i.append(f)}i.value=Fe(t),i.onchange=()=>{this.galleryElement=i.value},r.append(i);const s=document.createElement("select");s.setAttribute("aria-label","Magic forms");for(let c=0;c<3;c++){const f=document.createElement("option");f.value=String(c),f.textContent=qt.slice(c*4,c*4+4).join(" / "),s.append(f)}const a=document.createElement("option");a.value="3",a.textContent="Equal E–W / N–S beams",s.append(a),s.onchange=()=>{this.galleryPage=Number(s.value)},r.append(s);const n=(c,f)=>{const v=document.createElement("button");return v.textContent=c,v.onclick=f,r.append(v),v},u=n("Pause",()=>{this.galleryTime=this.galleryTime===null?this.time:null,u.textContent=this.galleryTime===null?"Pause":"Play"}),h=n("Dark ground",()=>{this.galleryDark=!this.galleryDark,h.textContent=this.galleryDark?"Forest ground":"Dark ground"}),d=n("Treetop camera",()=>{this.galleryCamera=!this.galleryCamera,d.textContent=this.galleryCamera?"Ground camera":"Treetop camera"});document.body.append(r)}hideBackdrop(t){if(this.galleryDark){this.background=t.background,t.background=new St("#15131e"),this.hidden=t.children.filter(r=>!r.name.startsWith("Magic ")).map(r=>({object:r,visible:r.visible}));for(const r of this.hidden)r.object.visible=!1}}restoreBackdrop(t){if(this.hidden.length){for(const r of this.hidden)r.object.visible=r.visible;this.hidden.length=0,t.background=this.background}}}const Vt=1e3/60,Xt=1e3/30,Is=.35,To="witch.ladder";class Pi{mutate=(t,r)=>r();state;ms=NaN;timed=!1;key;bases=new WeakMap;applied="";win={t0:NaN,frames:[],skip:!1};constructor(t,r){this.key=`${To}:${t.slice(0,120)}`,this.state=Po(r,Do(this.key)),this.sync()}get cap30(){return Ge(this.state,P.findIndex(t=>t.id==="cap30"))}frame(t,r,l,i,s){const a=this.win;if(Number.isNaN(a.t0)&&(a.t0=t),l||r>250?a.skip=!0:r>0&&a.frames.push(r),t-a.t0>=1e3){const n=(t-a.t0)/1e3,u=a.frames.length,h=s.length?eo(s.slice(-Math.max(1,Math.min(u,s.length)))):NaN;this.timed=Number.isFinite(h),this.ms=this.timed?h:eo(a.frames);const d=this.state.rung;this.state=ha(this.state,this.ms,this.cap30?Xt:Vt,n,a.skip||u<5,void 0,this.timed),this.state.rung!==d&&this.state.mode==="auto"&&this.save(),this.sync(),a.t0=t,a.frames=[],a.skip=!1}this.apply(i)}apply(t){let r=this.bases.get(t);if(!r){const s=zo.get(t);s!==void 0&&(this.state={...this.state,loaded:s}),r={keep:t.treeCap.keep,wind:t.wind.on,trunks:t.shadows.trunks?.mode??"off",edge:!!t.scenery.edgeDither,hard:!!t.canopyCutout.hard},this.bases.set(t,r),this.applied=""}const l=s=>Ge(this.state,P.findIndex(a=>a.id===s)),i=P.map((s,a)=>Ge(this.state,a)?1:0).join("");i!==this.applied&&(this.applied=i,this.mutate("automatic quality tuning",()=>{q.distortion=!l("fxDistort"),q.imprints=!l("fxImprints"),q.secondary=!l("fxSecondary"),q.lightCap=l("fxLights")?2:6,q.particles=l("fxParticles")?.5:1,Qt(t.scenery,"edgeDither",l("farDither")||r.edge),Qt(t.canopyCutout,"hard",l("hardCut")||r.hard),t.treeCap.keep=l("squeeze")?Math.min(r.keep,Is):r.keep,t.wind.on=l("still")?!1:r.wind,t.shadows.trunks&&(t.shadows.trunks.mode=l("still")?"off":r.trunks)}))}lines(){const t=this.state,r=P[t.rung],l=P.length-1,s=[`${t.mode==="off"?"off (full quality)":t.mode==="pinned"?`pinned at ${t.rung}`:t.locked?"auto, holding (it kept flipping)":"auto"}: rung ${t.rung} of ${l}, ${r.label}`];Number.isFinite(this.ms)&&s.push(`${this.timed?"GPU":"frame"} ${this.ms.toFixed(1)} ms a frame, budget ${(this.cap30?Xt:Vt).toFixed(1)}`);const a=P.filter((u,h)=>Ge(t,h)).map(u=>u.label);a.length&&s.push(`in effect: ${a.join("; ")}`);const n=na(t);return n.adds.length&&s.push(`from the next load: ${n.adds.map(u=>P[u].label).join("; ")}`),n.drops.length&&s.push(`back from the next load: ${n.drops.map(u=>P[u].label).join("; ")}`),s}options(){return[{value:"auto",label:"Auto"},{value:"off",label:"Off (full quality)"},...P.slice(1).map((t,r)=>({value:String(r+1),label:`${r+1}: ${t.label}${t.built?"":" (not built yet)"}`}))]}current(){return this.state.mode==="auto"?"auto":this.state.mode==="off"?"off":String(this.state.rung)}choose(t){this.state=t==="auto"?He(this.state,"auto"):t==="off"?He(this.state,"off"):He(this.state,"pinned",Number(t)),t==="auto"&&this.save(),this.sync()}sync(){Pe=this.state.mode==="off"?0:this.state.rung}save(){try{localStorage.setItem(this.key,JSON.stringify({rung:this.state.rung,at:Date.now()}))}catch{}}}function Po(e,t){const r=e.get("ladder"),l=r!==null&&r!==""&&Number.isFinite(Number(r)),i=typeof navigator<"u"&&navigator.webdriver===!0;return r==="off"||i&&r!=="auto"&&!l?He(at(0),"off"):l?He(at(et(Number(r))),"pinned"):at(t)}function Do(e){try{const t=JSON.parse(localStorage.getItem(e)??"null");return et(Number(t?.rung??0))}catch{return 0}}let Pe=null,qe;const zo=new WeakMap;function Ho(e,t=new Set){Pe===null&&(Pe=(()=>{const l=Po(Zt(),Do(`${To}:${Ns().slice(0,120)}`));return l.mode==="off"?0:l.rung})());const r=ia(Pe);qe===void 0&&(qe=Zt().has("px")?null:r.px),r.density!==1&&!t.has("treeDensity")&&(e.treeDensity*=r.density),r.blend!==null&&!t.has("areaEdgeBlend.width")&&(e.areaEdgeBlend.width=Math.min(e.areaEdgeBlend.width,r.blend)),qe&&(e.pixelSize=qe),zo.set(e,Pe)}const Zt=()=>new URLSearchParams(typeof location<"u"?location.search:"");function Ns(){try{const e=document.createElement("canvas").getContext("webgl2");if(!e)return"unknown";const t=Gs(e);return e.getExtension("WEBGL_lose_context")?.loseContext(),t}catch{return"unknown"}}function Gs(e){try{const t=e.getExtension("WEBGL_debug_renderer_info");return String(t?e.getParameter(t.UNMASKED_RENDERER_WEBGL):e.getParameter(e.RENDERER))}catch{return"unknown"}}function Qt(e,t,r){r?e[t]=!0:delete e[t]}function eo(e){if(!e.length)return NaN;const t=[...e].sort((r,l)=>r-l);return t[Math.floor(t.length/2)]}const Us="witch-mapprep",wt="prep",_s="next",Ys=()=>new Promise(e=>{try{const t=indexedDB.open(Us,1);t.onupgradeneeded=()=>t.result.createObjectStore(wt),t.onsuccess=()=>e(t.result),t.onerror=t.onblocked=()=>e(null)}catch{e(null)}});async function Ws(){const e=await Ys();return e?new Promise(t=>{try{const r=e.transaction(wt,"readonly").objectStore(wt).get(_s);r.onsuccess=()=>{e.close(),t(r.result??null)},r.onerror=()=>{e.close(),t(null)}}catch{e.close(),t(null)}}):null}const Ks="v6512 · 6bba17f",Rt=(e,t)=>`${Ks}|${e}|${oa(JSON.stringify(t))}`;function Bo(e,t,r){const l=new URLSearchParams({island:e,seed:String(r),...t!=null?{world:String(t)}:{},arrive:"1"}),{tuning:i}=uo(l);return ho(i,void 0,new Set),Ho(i),co(fo(),i),i}let ve="none",me=0,be=0;const De=(e,t=0)=>{try{performance.mark("witch:map-prep-source",{detail:{seed:e,status:ve,workerMs:me,hydrateMs:be,checkMs:t}})}catch{}};function yt(e,t,r){const l=performance.now();if(ve="none",me=0,be=0,!e)return De(t),null;if(e.key!==Rt(t,r))return ve="stale",De(t,performance.now()-l),e.key.split("|")[1]===String(t)&&e.tuning&&console.info("map prep: another tuning's",Object.keys(r).filter(s=>JSON.stringify(r[s])!==JSON.stringify(e.tuning[s]))),null;const i=Yo(e.prep);return i?(ve="unsound",De(t,performance.now()-l),console.warn("map prep: unsound, made afresh:",i),null):(Wo(e.arch),ve="worker",me=e.ms,De(t,performance.now()-l),e.prep)}function $s(e,t,r){const l=performance.now();if(r)try{const i=Uo(e,t,r);be=performance.now()-l;try{performance.mark("witch:map-hydrated",{detail:{seed:e,ms:be,workerMs:me}})}catch{}return me>0&&be>me&&console.warn(`map prep: hydrate ${Math.round(be)} ms, slower than making it (${Math.round(me)} ms in the worker)`),i}catch(i){ve="failed",De(e),console.warn("map prep: hydrate failed, made afresh:",i)}return _o(e,t)}async function qs(e,t,r=1500){return yt(typeof indexedDB>"u"?null:await Promise.race([Ws(),new Promise(l=>setTimeout(()=>l(null),r))]),e,t)}function Io(e,t,r,l=!0){let i=null,s=()=>{};const a=new Promise(n=>{s=n});try{if(typeof Worker>"u")return s(null),{done:a,stop(){}};i=new Worker(new URL(""+new URL("mapPrep.worker-DGxdi1eA.js",import.meta.url).href,import.meta.url),{type:"module"}),i.onmessage=n=>{s(n.data.rec??n.data.ok),i?.terminate(),i=null},i.onerror=()=>{s(null),i?.terminate(),i=null},ta(i,{key:Rt(e,t),seed:e,tuning:t,send:r,noKeep:!l},"map-prep",e)}catch{s(null)}return{done:a,stop(){i?.terminate(),i=null,s(null)}}}function js(e,t,r,l=!1){return Io(r,Bo(e,t,r),l)}function Js(e,t,r=1e4){try{const{tuning:l}=uo(t),i=new Set((t.get("set")??"").split(";").map(n=>n.split("=")[0]).filter(Boolean));ho(l,void 0,i),Ho(l,i),co(fo(),l);const s=Io(e,l,!0,!1),a=setTimeout(()=>s.stop(),r);return s.done.then(n=>(clearTimeout(a),n&&typeof n=="object"?n:null))}catch{return Promise.resolve(null)}}const Di=Object.freeze(Object.defineProperty({__proto__:null,get hydrateMs(){return be},prepKey:Rt,get prepUsed(){return ve},readyMap:$s,sailTuning:Bo,startBootMapPrep:Js,startMapPrep:js,takeMapPrep:qs,useReadyMap:yt},Symbol.toStringTag,{value:"Module"}));export{di as $,Ds as A,ai as B,X as C,yi as D,Fi as E,Ga as F,Cr as G,_t as H,kr as I,Lr as J,Oi as K,V as L,we as M,zs as N,Fa as O,Et as P,Fr as Q,po as R,Ct as S,Ti as T,Si as U,oi as V,da as W,ya as X,qt as Y,li as Z,fi as _,Ca as a,va as a0,gi as a1,hi as a2,si as a3,ii as a4,ci as a5,ma as a6,ni as a7,ui as a8,ft as a9,ws as aa,ht as ab,ct as ac,Li as ad,Ci as ae,ri as af,pi as ag,xa as ah,ir as ai,P as aj,Ho as ak,qs as al,yt as am,$s as an,Js as ao,Pi as ap,Gs as aq,Mi as ar,be as as,ve as at,Di as au,rt as b,Ee as c,Ve as d,wi as e,Ri as f,er as g,xi as h,qa as i,Mr as j,Er as k,Eo as l,Ft as m,It as n,bi as o,mi as p,Ae as q,ki as r,Ao as s,ja as t,Lt as u,Ei as v,Ai as w,vi as x,Z as y,Oo as z};
