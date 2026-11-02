import{bY as Gt,bZ as Ut,b_ as _t,b$ as Ht}from"./forest-BhsFUe7u.js";import{K as y,V as F,_ as M,af as fe,o as _,ab as ke,c5 as $e,u as N,x as Re,ag as nt,c6 as Wt,c7 as Ot,a4 as Ee,S as U,r as Nt,l as ve,R as lt,ac as ht,q as ut,k as me,ad as Be,H as se,ae as It,a2 as ct,aD as je,aE as Je,ao as qt,a7 as $t,a5 as dt,e as Ge,av as Bt,I as ft,as as gt,c8 as Ke,A as jt,a0 as Jt,g as Kt,ak as Yt}from"./chartView-Dr6SbV81.js";import{n as Vt,H as mt}from"./linkParams-DBMHhTFK.js";import{a as vt,b as pt,c as wt}from"./playerSettings-Pc-E4pln.js";import"./generator-CWe2Nd4g.js";import{h as X}from"./witch-w90jPAu6.js";import"./housePieces-CD7sDFrZ.js";const Z={reduceFlashing:!1},K=24,Ce=4,L={uAmb:{value:new F},uUnlitDim:{value:1},uMoon:{value:new F},uMoonDir:{value:new F(-.45,.75,.5).normalize()},uMoonBeam:{value:new F},uMoonUp:{value:new y},uShafts:{value:.3},uShaftScale:{value:1},uGlowPos:{value:new F},uGlowRgb:{value:new F},uGlowR:{value:8},uGlowFalloff:{value:2.5},uGlowNear:{value:1},uGlowPower:{value:1.4},uGlowDim:{value:1},uHazeCentre:{value:new M},uHazeRange:{value:new M(70,200)},uHazeColour:{value:new F},uTime:{value:0},uLightPos:{value:Array.from({length:K},()=>new y)},uLightCol:{value:Array.from({length:K},()=>new y)},uLightCount:{value:0},uLightKnee:{value:new M(.9,1.1)},uGlade:{value:Array.from({length:Ce},()=>new y)},uGladeCount:{value:0},uGladeRgb:{value:new F},uGladeLight:{value:new M},uDim:{value:1},uSlow:{value:new y},uSlowKeep:{value:new y},uRealTime:{value:0},uDisco:{value:new y},uDiscoParams:{value:new y},uDiscoColour:{value:new F(1,1,1)},uScenery:{value:new M(1e6,1)},uCanopyReach:{value:0},uPartyOver:{value:new y(0,0,0,30)}},Xt=.95,Zt=.55,Qt=.16;function so(a,e,t,i=1,o=2.5,r=1){const n=(s,l)=>new F(s[0]/255*l,s[1]/255*l,s[2]/255*l);L.uAmb.value.copy(n(X(a.ambientHue,.55,1),a.ambient*i)),L.uMoon.value.copy(n(X(a.moonHue,a.moonSat??.35,1),a.moon*r)),L.uMoonBeam.value.copy(n(X(a.moonHue,.35,1),a.shafts*.25)),L.uShafts.value=a.shafts,L.uShaftScale.value=t*2,L.uGlowRgb.value.copy(n(X(a.glowHue,a.glowSat,1),1)),L.uGlowR.value=e,L.uGlowFalloff.value=o,L.uGlowPower.value=a.glowPower,L.uHazeColour.value.copy(n(X(a.ambientHue-.08,.55,1),.16*Math.sqrt(i)))}const Ue=`
uniform vec3 uAmb, uMoon, uMoonDir, uMoonBeam, uGlowPos, uGlowRgb;
uniform float uUnlitDim;
uniform vec4 uMoonUp;
uniform float uShafts, uShaftScale, uGlowR, uGlowFalloff, uGlowNear, uGlowPower, uGlowDim, uTime;
uniform vec2 uHazeCentre, uHazeRange;
uniform vec3 uHazeColour;
uniform vec4 uLightPos[${K}], uLightCol[${K}];
uniform vec4 uGlade[${Ce}];
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
  for (int i = 0; i < ${Ce}; i++) {
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
  for (int i = 0; i < ${K}; i++) {
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
  vec3 warm = max(min(dot(col, Y), ${Zt.toFixed(3)}), ${Qt.toFixed(3)} * fall) * uGlowRgb / max(1e-3, dot(uGlowRgb, Y));
  return mix(col, min(vec3(1.0), warm), ${Xt.toFixed(2)} * fall);
}
`,ea=4,ne=9,W={uHiz:{value:null},uHizOn:{value:0},uHizSize:{value:new M(1,1)},uHizLevels:{value:0},uHizAt:{value:Array.from({length:ne},()=>new y)}},ta=`
uniform sampler2D uHiz;
uniform float uHizOn, uHizLevels;
uniform vec2 uHizSize;
uniform vec4 uHizAt[${ne}];
bool hizHidden(vec2 lo, vec2 hi, float near) {
  if (uHizOn < 0.5) return false;
  lo = clamp(lo, vec2(0.0), uHizSize - 1.0); hi = clamp(hi, vec2(0.0), uHizSize - 1.0);
  float span = max(hi.x - lo.x, hi.y - lo.y) + 1.0;
  int L = int(ceil(log2(max(span, 1.0))));
  if (float(L) > uHizLevels - 1.0) return false;
  vec4 at = uHizAt[0];
  for (int i = 0; i < ${ne}; i++) if (i == L) at = uHizAt[i];
  float cell = exp2(float(L));
  vec2 a = min(floor(lo / cell), at.zw - 1.0), b = min(floor(hi / cell), at.zw - 1.0);
  vec2 ts = vec2(textureSize(uHiz, 0));
  float far = 0.0;
  for (int j = 0; j < 2; j++) for (int i = 0; i < 2; i++) {
    vec2 c = vec2(i == 0 ? a.x : b.x, j == 0 ? a.y : b.y);
    far = max(far, texelFetch(uHiz, ivec2(at.xy + c), 0).r);
  }
  return near > far;
}`,aa="varying vec2 vUv; void main() { vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }",ia="uniform sampler2D uSrc; void main() { gl_FragColor = vec4(texelFetch(uSrc, ivec2(gl_FragCoord.xy), 0).r, 0.0, 0.0, 1.0); }",oa=`
uniform sampler2D uSrc; uniform vec2 uSrcSize;
void main() {
  ivec2 p = ivec2(gl_FragCoord.xy) * 2, m = ivec2(uSrcSize) - 1;
  float d = 0.0;
  for (int j = 0; j < 3; j++) for (int i = 0; i < 3; i++) {
    if ((i == 2 && p.x + 2 != m.x) || (j == 2 && p.y + 2 != m.y)) continue;
    d = max(d, texelFetch(uSrc, min(p + ivec2(i, j), m), 0).r);
  }
  gl_FragColor = vec4(d, 0.0, 0.0, 1.0);
}`,sa="uniform sampler2D uSrc; uniform vec2 uAt; void main() { gl_FragColor = texelFetch(uSrc, ivec2(gl_FragCoord.xy - uAt), 0); }";class ro{depth=new fe(1,1,{depthBuffer:!0,stencilBuffer:!1});levels=[];atlas=new fe(1,1,{type:$e,format:ke,minFilter:_,magFilter:_,depthBuffer:!1});quad=new N(new Re(2,2));cam=new nt(-1,1,1,-1,0,1);copy;reduce;place;size={w:0,h:0};ok;constructor(e){this.depth.depthTexture=new Wt(1,1,Ot);const t=(i,o)=>new U({vertexShader:aa,fragmentShader:i,uniforms:o,depthTest:!1,depthWrite:!1});this.copy=t(ia,{uSrc:{value:null}}),this.reduce=t(oa,{uSrc:{value:null},uSrcSize:{value:new M}}),this.place=t(sa,{uSrc:{value:null},uAt:{value:new M}}),this.quad.frustumCulled=!1,this.ok=e.capabilities.isWebGL2&&!!e.extensions.get("EXT_color_buffer_float")}resize(e,t){if(e===this.size.w&&t===this.size.h)return;this.size={w:e,h:t},this.depth.setSize(e,t);for(const l of this.levels)l.dispose();this.levels=[];let i=e,o=t,r=0,n=0;const s=W.uHizAt.value;for(;n<ne;n++){const l=new fe(i,o,{type:$e,format:ke,minFilter:_,magFilter:_,depthBuffer:!1});if(this.levels.push(l),s[n].set(n===0?0:e,n===0?0:r,i,o),n>0&&(r+=o),i<=2&&o<=2){n++;break}i=Math.max(1,Math.ceil(i/2)),o=Math.max(1,Math.ceil(o/2))}for(let l=n;l<ne;l++)s[l].set(0,0,0,0);W.uHizLevels.value=n,this.atlas.setSize(e+Math.ceil(e/2),Math.max(t,r)),W.uHizSize.value.set(e,t)}render(e,t,i,o,r,n){if(W.uHizOn.value=0,!n||!this.ok||o<1||r<1)return;this.resize(o,r);const s=e,l=i.layers.mask,h=s.getRenderTarget(),u=s.autoClear,d=s.getClearColor(new Ee),m=s.getClearAlpha();i.layers.set(ea),s.setRenderTarget(this.depth),s.setClearColor(0,0),s.autoClear=!0,s.render(t,i),i.layers.mask=l;const g=(v,c)=>{this.quad.material=v,s.setRenderTarget(c),s.render(this.quad,this.cam)};this.copy.uniforms.uSrc.value=this.depth.depthTexture,g(this.copy,this.levels[0]);for(let v=1;v<this.levels.length;v++){const c=this.levels[v-1];this.reduce.uniforms.uSrc.value=c.texture,this.reduce.uniforms.uSrcSize.value.set(c.width,c.height),g(this.reduce,this.levels[v])}s.setRenderTarget(this.atlas),s.setClearColor(0,0),s.clear(),s.autoClear=!1;const x=W.uHizAt.value;this.levels.forEach((v,c)=>{const p=x[c];this.place.uniforms.uSrc.value=v.texture,this.place.uniforms.uAt.value.set(p.x,p.y),this.atlas.viewport.set(p.x,p.y,p.z,p.w),s.setRenderTarget(this.atlas),this.quad.material=this.place,s.render(this.quad,this.cam)}),this.atlas.viewport.set(0,0,this.atlas.width,this.atlas.height),s.autoClear=u,s.setClearColor(d,m),s.setRenderTarget(h),W.uHiz.value=this.atlas.texture,W.uHizOn.value=1}compile(e){return Promise.all([this.copy,this.reduce,this.place].map(t=>{const i=new N(this.quad.geometry,t);return i.frustumCulled=!1,e.compileAsync(i,this.cam)}))}dispose(){this.depth.dispose(),this.atlas.dispose();for(const e of this.levels)e.dispose();this.copy.dispose(),this.reduce.dispose(),this.place.dispose(),this.quad.geometry.dispose()}}const no=`
float hash(vec2 p) { p = fract(p * vec2(123.34, 456.21)); p += dot(p, p + 45.32); return fract(p.x * p.y); }
float vnoise(vec2 p) {
  vec2 i = floor(p), f = fract(p), u = f * f * (3.0 - 2.0 * f);
  float a = hash(i), b = hash(i + vec2(1, 0)), c = hash(i + vec2(0, 1)), d = hash(i + vec2(1, 1));
  return a + (b - a) * u.x + (c - a) * u.y + (a - b - c + d) * u.x * u.y;
}
`,lo=`
float bayer2(vec2 a) { a = floor(a); return fract(a.x / 2.0 + a.y * a.y * 0.75); }
float bayer4(vec2 a) { return bayer2(0.5 * a) * 0.25 + bayer2(a); }
`,ra=`
float windGust(vec2 q) {
  vec2 i = floor(q), f = fract(q), e = f * f * (3.0 - 2.0 * f);
  float h00 = fract(sin(dot(i, vec2(127.1, 311.7))) * 43758.5453), h10 = fract(sin(dot(i + vec2(1, 0), vec2(127.1, 311.7))) * 43758.5453);
  float h01 = fract(sin(dot(i + vec2(0, 1), vec2(127.1, 311.7))) * 43758.5453), h11 = fract(sin(dot(i + vec2(1, 1), vec2(127.1, 311.7))) * 43758.5453);
  return mix(mix(h00, h10, e.x), mix(h01, h11, e.x), e.y);
}
`,_e=`
vec2 pixelSnap(vec4 b) {
  vec2 ndc = b.xy / b.w, snapped = (floor((ndc * 0.5 + 0.5) * uRes) + 0.5) / uRes * 2.0 - 1.0;
  return snapped - ndc;
}
`,le=256;function ze(a){a.byteOffset%4&&(a=a.slice());const e=a.length>>2,t=new Uint32Array(a.buffer,a.byteOffset,e),i=new Uint8Array(e),o=new Map([[0,0]]),r=new Uint8Array(le*4);let n=0,s=0;for(let l=0;l<e;l++){const h=t[l];if(h!==n){let u=o.get(h);if(u===void 0){if(u=o.size,u>=le)return null;o.set(h,u),r.set(a.subarray(l*4,l*4+4),u*4)}n=h,s=u}i[l]=s}return{idx:i,pal:r}}const ho=(a,e,t,i)=>e?e[a[t]*4+i]:a[t*4+i],Ye=(a,e,t)=>t?a*e+le*4:a*e*4;function we(a,e,t){return a.getContext("2d").getImageData(0,0,e,t).data}const na=(a,e=2048)=>Nt(la(a,e));function*la(a,e=2048){const i=[],o=new Map;let r=0,n=0,s=0,l=1;for(const[v,c]of a.entries()){const p=o.get(c);if(p!==void 0){i.push(i[p]);continue}o.set(c,v),r+c.w+1>e&&(r=0,n+=s+1,s=0),i.push({x:r,y:n}),r+=c.w+1,s=Math.max(s,c.h),l=Math.max(l,r)}const h=Math.max(1,n+s),u=new Uint8Array(l*h*4),d=new Uint8Array(l*h*4),m=[];for(let v=0;v<a.length;v++){v&&v%4===0&&(yield);const c=a[v],p=o.get(c);if(p!==v){m.push(m[p]);continue}const z=i[v],f=we(c.A,c.w,c.h),T=we(c.N,c.w,c.h),A=c.S?we(c.S,c.w,c.h):null,V=A?Array.from({length:c.h},(C,k)=>Array.from({length:c.w},(G,D)=>A[(k*c.w+D)*4+1])):null;for(let C=0;C<c.h;C++){const k=C*c.w*4,G=((z.y+C)*l+z.x)*4;if(u.set(f.subarray(k,k+c.w*4),G),c.eyes)for(let D=0;D<c.w;D++)c.eyes[C*c.w+D]&&u[G+D*4+3]===255&&(u[G+D*4+3]=253);if(d.set(T.subarray(k,k+c.w*4),G),c.S){const D=V[C];for(let H=0;H<c.w;H++)d[G+H*4+3]&&(d[G+H*4+3]=D[H])}}let w=0;e:for(let C=c.h-1;C>=0;C--,w++)for(let k=0;k<c.w;k++)if(f[(C*c.w+k)*4+3]>=128)break e;let $=0;if(w<c.h){const C=c.h-1-w;for(let k=0;k<c.w;k++)f[(C*c.w+k)*4+3]>=128&&($=Math.max($,Math.abs(k+.5-c.w/2)+.5))}m.push({uv:[z.x/l,z.y/h,(z.x+c.w)/l,(z.y+c.h)/h],w:c.w,h:c.h,pad:Math.min(w,c.h),...$?{foot:$}:{},...c.S?{masked:!0}:{},...c.head?{head:c.head}:{}})}yield;const g=ze(u);yield;const x=ze(d);return{albedo:g?.idx??u,normal:x?.idx??d,albedoPal:g?.pal??null,normalPal:x?.pal??null,width:l,height:h,frames:m}}const yt={},xt=["baby","young","adult","legend"],Ve=new Map,uo=(a,e,t)=>`${xt[a]}-walk${e}${t?"-away":""}`;function co(a,e){const t=`${a}/${e}`,i=yt[t];if(!i)return;let o=Ve.get(t);if(!o){const r=atob(i.px),n=new Uint8ClampedArray(r.length);for(let s=0;s<r.length;s++)n[s]=r.charCodeAt(s);Ve.set(t,o={w:i.w,h:i.h,rgba:n})}return o}const fo=(a,e)=>ha.has(`${a}/${xt[e]}`),ha=new Set(Object.keys(yt).map(a=>a.slice(0,a.indexOf("-"))));function ua(a){const e=new Uint8Array(2048);e.set(a.subarray(0,1024));for(let t=0;t<256;t++){const i=t*4,o=(a[i]*.3+a[i+1]*.55+a[i+2]*.15)/255;e.set([Math.round(90+o*150),Math.round(145+o*105),Math.round(180+o*75),a[i+3]],1024+i)}return e}let bt=!1;function go(a){bt=a}const ca=a=>{bt||(a.image.data=null),a.onUpdate=null};function Pe(a,e,t,i=!1){const o=new ve(a,e,t,i?ke:lt,ht);return i&&(o.unpackAlignment=1),o.magFilter=_,o.minFilter=_,o.generateMipmaps=!1,o.flipY=!1,o.colorSpace=ut,o.needsUpdate=!0,o.onUpdate=ca,o}function St(a){const e=new ve(ua(a),le,2,lt,ht);return e.magFilter=e.minFilter=_,e.generateMipmaps=!1,e.flipY=!1,e.colorSpace=ut,e.needsUpdate=!0,e}let da=null;const Ae=()=>da??=St(new Uint8Array(le*4));function mo(a,e,t,i){const o=ze(a),[r,n]=Me(o?.idx??a,o?.pal??null,e,t,i);return{tex:r,pal:n,indexed:!!o}}function Me(a,e,t,i,o){const r=me(Pe(a,t,i,!!e),o);if(!e)return[r,Ae()];const n=me(St(e),o);return r.addEventListener("dispose",()=>n.dispose()),[r,n]}function fa(a,e="props"){const[t,i]=Me(a.albedo,a.albedoPal,a.width,a.height,e),[o,r]=Me(a.normal,a.normalPal,a.width,a.height,e);return{albedo:t,normal:o,albedoPal:i,normalPal:r,indexed:new M(a.albedoPal?1:0,a.normalPal?1:0),frames:a.frames}}function vo(a){const e=n=>{const s=n.image;return[s?.width??0,s?.height??0]},[t,i]=e(a.albedo),[o,r]=e(a.normal);return Ye(t,i,a.indexed.x>.5)+Ye(o,r,a.indexed.y>.5)+(a.indexed.x>.5?1024:0)+(a.indexed.y>.5?1024:0)}const ga=(a="uAlbedo",e="uNormal")=>`
uniform sampler2D ${a}, ${e}, ${a}Pal, ${e}Pal;
uniform vec2 uIndexed;
vec4 albedoAt(vec2 q) { vec4 c = texture2D(${a}, q); return uIndexed.x > 0.5 ? texelFetch(${a}Pal, ivec2(int(c.r * 255.0 + 0.5), 0), 0) : c; }
vec4 normalAt(vec2 q) { vec4 c = texture2D(${e}, q); return uIndexed.y > 0.5 ? texelFetch(${e}Pal, ivec2(int(c.r * 255.0 + 0.5), 0), 0) : c; }
`,ma=(a,e="uAlbedo",t="uNormal")=>({[e]:{value:a.albedo},[t]:{value:a.normal},[e+"Pal"]:{value:a.albedoPal},[t+"Pal"]:{value:a.normalPal},uIndexed:{value:a.indexed}});function va(a,e,t="uAlbedo",i="uNormal"){a[t].value=e.albedo,a[i].value=e.normal,a[t+"Pal"].value=e.albedoPal,a[i+"Pal"].value=e.normalPal,a.uIndexed.value=e.indexed}function po(a){const e=new Uint8Array(4),t={uv:[0,0,0,0],w:1,h:1,pad:0};return{albedo:Pe(e,1,1),normal:Pe(new Uint8Array(4),1,1),albedoPal:Ae(),normalPal:Ae(),indexed:new M(0,0),frames:Array.from({length:a},()=>t),grounds:[]}}const wo=(a,e=2048)=>fa(na(a,e));function pa(a){return{value:a?new y(1,a.lightFloor,a.lightTint,a.lightRim):new y}}const wa=`
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
  for (int i = 0; i < ${K}; i++) {
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
`,ya=3,Le={uCastMap:{value:null},uCastWin:{value:new y(0,0,1,0)}},xa=`
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
`;class yo{constructor(e=160,t=1024){this.size=e,this.res=t,this.rt=new fe(t,t,{minFilter:Be,magFilter:Be,depthBuffer:!1,stencilBuffer:!1,generateMipmaps:!1});const i=e/2;this.cam=new nt(-i,i,i,-i,1,2e3),this.cam.up.set(0,0,-1),this.cam.layers.set(ya),Le.uCastMap.value=this.rt.texture}size;res;rt;cam;clear=new Ee;render(e,t,i,o,r){const n=Le.uCastWin.value;if(!r){n.w=0;return}const s=this.size/this.res,l=Math.round(i/s)*s,h=Math.round(o/s)*s;this.cam.position.set(l,1e3,h),this.cam.lookAt(l,0,h),this.cam.updateMatrixWorld();const u=se.uBend.value.x,d=t.background,m=e.getRenderTarget(),g=e.getClearAlpha();e.getClearColor(this.clear),se.uBend.value.x=0,t.background=null,e.setRenderTarget(this.rt),e.setClearColor(16777215,1),e.clear(!0,!1,!1),e.render(t,this.cam),e.setRenderTarget(m),e.setClearColor(this.clear,g),t.background=d,se.uBend.value.x=u,n.set(l-this.size/2,h+this.size/2,this.size,1)}dispose(){this.rt.dispose()}}class R{lo=1/0;hi=-1;range={start:0,count:0};touch(e){e<this.lo&&(this.lo=e),e>this.hi&&(this.hi=e)}flush(e){if(this.hi>=this.lo){const t=e.itemSize,i=this.range,o=e.updateRanges[0];let r=this.lo*t,n=(this.hi+1)*t;o&&(r=Math.min(o.start,r),n=Math.max(o.start+o.count,n),e.clearUpdateRanges()),i.start=r,i.count=n-r,e.updateRanges.push(i),e.needsUpdate=!0}this.lo=1/0,this.hi=-1}}const ba={ramp:["#49141e","#b43216","#ff7826","#fff0af"],contrast:"#77bbee",motion:0,imprint:"scorch",sound:"fire"},Sa={ramp:["#163b64","#397cbb","#9dd8ed","#f0fbff"],contrast:"#ffffff",motion:1,imprint:"frost",sound:"ice"},Fa={ramp:["#193116","#467d23","#a7d73a","#f1fac1"],contrast:"#a366bb",motion:2,imprint:"wet",sound:"water"},ka={ramp:["#302749","#7774b8","#c4c3eb","#f6efff"],contrast:"#94cfed",motion:3,imprint:"charge",sound:"light"},Ca={ramp:["#22254e","#525fbd","#91c3f1","#f2faff"],contrast:"#e6bf78",motion:4,imprint:"charge",sound:"storm"},za={ramp:["#30221d","#81532d","#ce9b55","#f3d9a4"],contrast:"#95b88b",motion:5,imprint:"push",sound:"earth"},Pa={ramp:["#20192f","#674878","#b289c1","#f1d8f5"],contrast:"#b9a2d3",motion:6,imprint:"scorch",sound:"void"},Aa={ramp:["#273426","#518551","#d895b6","#f6dddc"],contrast:"#b1d97d",motion:7,imprint:"bloom",sound:"nature"},Ma={ramp:["#173646","#28799c","#6fc9db","#dbf6ee"],contrast:"#b5dce5",motion:2,imprint:"wet",sound:"water"},La={ramp:["#41302c","#9b7142","#dcb67a","#f4e1b2"],contrast:"#bba38c",motion:5,imprint:"push",sound:"earth"},Ta={ramp:["#233025","#536542","#a1a66a","#e2d7a6"],contrast:"#c6a26f",motion:7,imprint:"bloom",sound:"nature"},Da={ramp:["#283c41","#629298","#abd1cf","#edf2da"],contrast:"#e0d8b1",motion:3,imprint:"push",sound:"wind"},Ra={ramp:["#352239","#a65879","#dfad66","#fff0c2"],contrast:"#e598bb",motion:7,imprint:"bloom",sound:"party"},q={fire:ba,frost:Sa,venom:Fa,moonlight:ka,storm:Ca,earth:za,shadow:Pa,bloom:Aa,water:Ma,sand:La,wood:Ta,wind:Da,party:Ra},Ea={id:0,size:1.7,ground:!1},Ga={id:1,size:4,ground:!1},Ua={id:2,size:1.1,ground:!1},_a={id:3,size:2,ground:!0},Ha={id:4,size:3.2,ground:!1},Wa={id:5,size:9,ground:!1},Oa={id:6,size:5,ground:!1},Na={id:7,size:6,ground:!1},Ia={id:8,size:2,ground:!0},qa={id:9,size:5,ground:!1},$a={id:10,size:2.2,ground:!1},Ba={id:11,size:1.1,ground:!1},O={projectile:Ea,burst:Ga,beam:Ua,zone:_a,aura:Ha,pillar:Wa,vortex:Oa,dome:Na,trap:Ia,eruption:qa,lob:$a,trail:Ba},ja=[.25,.45,.65,1],Ja=[.6,1.4],Ka=[.08,.25],Ya=.5,Va=6,Xa=.2,Za=[6,18],Qa=[.2,.85],ei=128,ti=200,ai=5,ii=256,oi=2048,b={levels:ja,size:Ja,halo:Ka,secondaryAt:Ya,lightCap:Va,lightEase:Xa,lightReach:Za,lightStrength:Qa,fieldSize:ei,fieldMetres:ti,imprintSeconds:ai,pool:ii,instances:oi},Xe=["frost","scorch","wet","bloom","charge","push"],I=Object.keys(q),Ze=Object.keys(O),ye=a=>b.levels[Math.max(0,Math.min(3,Math.round(a)))]??.65,ue=(a,e)=>a[0]+(a[1]-a[0])*Math.max(0,Math.min(1,e));function Q(a){return Object.hasOwn(q,a)?a:"moonlight"}function xe(a,e,t,i,o){return Math.max(0,t)/(1+Math.hypot(a-i,e-o)/12)}class si{constructor(e=b.fieldSize,t=b.fieldMetres){this.size=e,this.metres=t,this.data=new Uint8Array(e*e*8),this.values=new Float32Array(this.data.length),this.cell=t/e}size;metres;data;values;x=0;z=0;cell;ready=!1;index(e,t){return((t%this.size+this.size)%this.size*this.size+(e%this.size+this.size)%this.size)*8}move(e,t){const i=Math.floor(e/this.cell)-this.size/2,o=Math.floor(t/this.cell)-this.size/2;if(!(this.ready&&i===this.x&&o===this.z)){for(let r=o;r<o+this.size;r++)for(let n=i;n<i+this.size;n++)if(!this.ready||n<this.x||n>=this.x+this.size||r<this.z||r>=this.z+this.size){const s=this.index(n,r);this.values.fill(0,s,s+8),this.data.fill(0,s,s+8)}this.x=i,this.z=o,this.ready=!0}}decay(e){const t=Math.max(0,e)*255/b.imprintSeconds;if(t)for(let i=0;i<this.values.length;i++)this.values[i]=Math.max(0,this.values[i]-t)}stamp(e,t,i,o,r){const n=Xe.indexOf(o);if(n<0||!(i>0)||!this.ready)return;const s=Math.max(this.x,Math.floor((e-i)/this.cell)),l=Math.min(this.x+this.size-1,Math.floor((e+i)/this.cell)),h=Math.max(this.z,Math.floor((t-i)/this.cell)),u=Math.min(this.z+this.size-1,Math.floor((t+i)/this.cell));for(let d=h;d<=u;d++)for(let m=s;m<=l;m++){const g=Math.hypot((m+.5)*this.cell-e,(d+.5)*this.cell-t),x=Math.max(0,1-g/i)*Math.min(1,Math.max(0,r))*255,v=this.index(m,d)+n;this.values[v]=Math.max(this.values[v],x)}}publish(){for(let e=0;e<this.data.length;e++)this.data[e]=Math.round(this.values[e])}at(e,t,i){const o=Math.floor(e/this.cell),r=Math.floor(t/this.cell);return o<this.x||o>=this.x+this.size||r<this.z||r>=this.z+this.size?0:this.values[this.index(o,r)+Xe.indexOf(i)]/255}reset(){this.values.fill(0),this.data.fill(0),this.ready=!1}}const Qe=()=>{const a=me(new ve(new Uint8Array(b.fieldSize**2*4),b.fieldSize,b.fieldSize),"fx");return a.minFilter=a.magFilter=_,a.wrapS=a.wrapT=It,a.generateMipmaps=!1,a.needsUpdate=!0,a},E={uFxField:{value:Qe()},uFxExtra:{value:Qe()},uFxBox:{value:new y(0,0,b.fieldMetres,b.fieldSize)},uFxOn:{value:0},uFxTime:{value:0},uFxCalm:{value:0},uFxVertex:{value:1}},Ft=`
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
`;function xo(a,e=!1){return a.asleep?.18:a.leashed||a.friendly||a.state==="happy"?.28:e||a.charge||a.leap?1:a.enraged||a.state==="enraged"?.8:.42}const ri={uThermalStrength:{value:0},uThermalColdBrightness:{value:.35},uThermalDangerGain:{value:1}},ni=`
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
`;function bo(a){return 1/(a.artPixelsPerMetre*(2/a.pixelSize))}const ge={...ri,uPotionSky:{value:0},uPoolReadability:{value:new URLSearchParams(globalThis.location?.search??"").get("poolreadability")==="1"?1:0},uMoodRim:{value:new y},uRimInset:{value:0},uWitchGlow:{value:0},uWitchLift:{value:0},uRight:{value:new F(1,0,0)},uUp:{value:new F(0,1,0)},uFacing:{value:new F(0,0,1)},uTopFade:{value:0},uCutout:{value:new y(0,0,0,1)},uCutWhole:{value:0},uCutShape:{value:new y(0,.35,0,.2)},uDebugCull:{value:0},uRes:{value:new M(1,1)},uWitch:{value:new y(0,0,0,0)},uWitchDepth:{value:0},uOcc:{value:new y(.38,6,2.5,1)},uNearCut:{value:0},uCircleBox:{value:new y(0,0,0,0)},uCircleFade:{value:new y(0,0,1,1)},uEdgeDither:{value:0},uHoleHard:{value:0},uCircleKeep:{value:new y(0,0,0,0)},uWholeCull:{value:typeof location<"u"&&new URLSearchParams(location.search).get("wholecull")==="0"?0:1},uParty:{value:Array.from({length:16},()=>new y)},uPartyCol:{value:Array.from({length:16},()=>new F)},uPartyCount:{value:0},uUplight:{value:new y},uTrunkFade:{value:new F(0,.125,.3)},uFindLook:{value:new y},uEyeRgb:{value:new F(1,.8,.35)},uEyeRange:{value:40},uTrunkLook:{value:new M(.8,.5)},uAreaAvg:{value:1},uSeeDepth:{value:1},uSeeDbg:{value:new y(1,0,1,0)},uCullByPass:{value:new URLSearchParams(globalThis.location?.search??"").get("cullpass")==="0"?0:1},uCullDbg:{value:7},uSeeEarly:{value:1},uSeeTwo:{value:1},uSeeDither:{value:0},uSeeShowA:{value:0},uSeeSolid:{value:0},uDebugTrunks:{value:0},uWind:{value:new y(0,0,1,0)},uLeafJitter:{value:new F(0,0,0)},uWatch:{value:new y(0,0,9,0)}},ee=`
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
varying float vFront;
varying vec2 vLocal;
varying float vSizeY;
varying vec2 vGround; // its ground spot under this pixel: its foot, across its width (the cast shadows: render/castShadows.ts)
${Ge}
${ra}${_e}${ta}
${Ft}
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
  vJitter = iJitter.xy;
  vThermalHeat = iJitter.z;
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
`,li=`
${ga()}
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
${ni}
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
${Ue}
${Ft}
varying vec2 vFxBase;
varying vec4 vFxPaint;
varying vec2 vFxInfo;
${xa}
${wa}
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
`,te=li.replace("void main() {","void spriteMain() {")+`
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
`,hi=-.5;function So(a){for(const e of a.meshes)e.renderOrder=hi,e.material.depthWrite=!1;return a}const be=[],Se=[],ui={value:new y(1,.85,.35,0)};class Fo{constructor(e,t,i={}){this.atlas=e,this.metresPerPixel=t;const o=new Re(1,1);o.translate(0,.5,0),this.geo=new ct,this.geo.index=o.index,this.geo.setAttribute("position",o.getAttribute("position")),this.geo.setAttribute("uv",o.getAttribute("uv")),this.pos=this.size=this.uvs=this.flags=this.glow=void 0,this.grow(64);const r=h=>({...L,...ge,...se,...W,...ma(e),uUnlit:{value:i.unlit?1:0},uIsScenery:{value:i.scenery?1:0},uAppear:this.appearU,uArrivalFade:this.arrivalFade,uFadePass:{value:0},uHasFade:{value:i.fade?1:0},uFlat:{value:i.flat||i.solid?1:0},uLies:{value:i.flat?1:0},...Le,uSilhouette:{value:new y(0,0,0,0)},uWitchLight:pa(i.witchLight),uFind:{value:i.find?1:0},uRimOn:{value:i.rim?1:0},uTint:i.tint??{value:new y(0,0,0,0)},uShadow:i.shadow?ui:{value:new y(0,0,0,0)},uLegend:{value:i.legend??new y(0,0,0,0)},uSteps:{value:i.steps??0},uLegendFloor:{value:i.legendFloor??0},uLegendAwake:{value:i.legendAwake??0},uGlowGain:i.glowGain??{value:1},uAbsolute:{value:i.absolute?1:0},uLie:{value:i.lie??0},uLean:this.leanU,...h}),n=i.scenery?{blending:dt,blendSrc:$t,blendDst:qt}:{},s=i.scenery?{stencilWrite:!0,stencilRef:1,stencilFunc:Je,stencilZPass:je}:i.unmark?{stencilWrite:!0,stencilRef:0,stencilFunc:Je,stencilZPass:je}:{},l=new U({vertexShader:ee,fragmentShader:te,defines:i.spotSpill?{MUSHROOM_SPOT_SPILL:1}:{},uniforms:r({}),depthTest:!i.onTop,depthWrite:!i.onTop&&!i.shadow,...n,...s,...i.shadow?{transparent:!0}:{}});if(this.mesh=new N(this.geo,l),this.mesh.frustumCulled=!1,i.onTop&&(this.mesh.renderOrder=10),i.scenery&&(this.mesh.renderOrder=.5),this.meshes=[this.mesh],i.fade){const h=new N(this.geo,new U({vertexShader:ee,fragmentShader:te,uniforms:r({uFadePass:{value:1}}),transparent:!0,depthWrite:!1})),u=new N(this.geo,new U({vertexShader:ee,fragmentShader:te,uniforms:r({uFadePass:{value:3}}),transparent:!0,depthWrite:!0}));u.frustumCulled=!1,u.renderOrder=10.9,h.frustumCulled=!1,h.renderOrder=11,i.scenery&&Object.assign(h.material,s,{stencilWrite:!1}),be.push(h.material),Se.push(h);const d=new N(this.geo,new U({vertexShader:ee,fragmentShader:te,uniforms:r({uFadePass:{value:2}}),transparent:!0,colorWrite:!1,depthWrite:!0}));d.frustumCulled=!1,d.renderOrder=19.9,typeof location<"u"&&new URLSearchParams(location.search).get("seedepth")==="off"&&(d.material.depthWrite=!1),this.meshes.push(h,d,u)}if(i.silhouette){const h=i.silhouette.colour,u=new N(this.geo,new U({vertexShader:ee,fragmentShader:te,uniforms:r({uSilhouette:{value:new y(h.x,h.y,h.z,i.silhouette.opacity)}}),transparent:!0,depthWrite:!1,depthFunc:Bt}));u.frustumCulled=!1,u.renderOrder=12,this.meshes.push(u),this.sil=u}for(const h of this.meshes)Object.assign(h.material.uniforms,E)}atlas;metresPerPixel;mesh;meshes;geo;pos;size;uvs;flags;glow;jitter;capacity=0;dirty=[new R,new R,new R,new R,new R,new R];count=0;name(e){return this.meshes.forEach((t,i)=>{t.name=i===0?e:`${e} (${i===1&&this.meshes.length>1&&t!==this.sil?"see-through":"silhouette"})`}),this}setAtlas(e){this.atlas=e;for(const t of this.meshes)va(t.material.uniforms,e)}sil=null;set silhouette(e){this.sil&&(this.sil.visible=e)}set silhouetteColour(e){const t=this.sil&&this.sil.material.uniforms.uSilhouette.value;t&&t.set(e.x,e.y,e.z,t.w)}set silhouetteOpacity(e){const t=this.sil&&this.sil.material.uniforms.uSilhouette.value;t&&(t.w=e)}grow(e){const t=Math.max(e,this.capacity*2);this.geo.dispose();const i=(o,r)=>{const n=new ft(new Float32Array(t*o),o);return n.setUsage(gt),r&&n.array.set(r.array),n};this.pos=i(3,this.pos),this.size=i(3,this.size),this.uvs=i(4,this.uvs),this.flags=i(4,this.flags),this.glow=i(1,this.glow),this.jitter=i(3,this.jitter),this.geo.setAttribute("iPos",this.pos),this.geo.setAttribute("iSize",this.size),this.geo.setAttribute("iUv",this.uvs),this.geo.setAttribute("iFlags",this.flags),this.geo.setAttribute("iGlow",this.glow),this.geo.setAttribute("iJitter",this.jitter),this.capacity=t}leanU={value:new y};appearU={value:1};arrivalFade={value:1};items=[];set(e){this.items=e,e.length>this.capacity&&this.grow(e.length);const t=this.pos.array,i=this.size.array,o=this.uvs.array,r=this.flags.array,n=this.glow.array,s=this.jitter.array,l=this.dirty[0],h=this.dirty[1],u=this.dirty[2],d=this.dirty[3],m=this.dirty[4],g=this.dirty[5],x=this.metresPerPixel;for(let p=0,z=e.length;p<z;p++){const f=e[p],T=f.frame,A=T.uv,V=f.scale??1;let w=p*3;(t[w]!==f.x||t[w+1]!==f.y||t[w+2]!==f.z)&&(t[w]=f.x,t[w+1]=f.y,t[w+2]=f.z,l.touch(p));const $=(f.sx===void 0?T.w:Math.max(1,Math.round(T.w*f.sx)))*x*V,C=(f.sy===void 0?T.h:Math.max(1,Math.round(T.h*f.sy)))*x*V,k=(f.foot??(f.top?0:T.foot??0))*x*V*(f.sx??1);w=p*3,(i[w]!==$||i[w+1]!==C||i[w+2]!==k)&&(i[w]=$,i[w+1]=C,i[w+2]=k,h.touch(p)),w=p*4,(o[w]!==A[0]||o[w+1]!==A[1]||o[w+2]!==A[2]||o[w+3]!==A[3])&&(o[w]=A[0],o[w+1]=A[1],o[w+2]=A[2],o[w+3]=A[3],u.touch(p));const G=f.flip?1:0,D=f.top?1:f.cut?-f.cut:0,H=(f.fresh?1:0)+(f.small?2:0),We=(T.masked?-1:1)*(f.sway??0);(r[w]!==G||r[w+1]!==D||r[w+2]!==H||r[w+3]!==We)&&(r[w]=G,r[w+1]=D,r[w+2]=H,r[w+3]=We,d.touch(p));const Oe=f.glow??0;n[p]!==Oe&&(n[p]=Oe,m.touch(p));const he=f.jitter,Ne=he?he[0]:0,Ie=he?he[1]:0,qe=f.heat??0;w=p*3,(s[w]!==Ne||s[w+1]!==Ie||s[w+2]!==qe)&&(s[w]=Ne,s[w+1]=Ie,s[w+2]=qe,g.touch(p))}l.flush(this.pos),h.flush(this.size),u.flush(this.uvs),d.flush(this.flags),m.flush(this.glow),g.flush(this.jitter),this.count=e.length,this.geo.instanceCount=e.length;const v=this.meshes,c=e.length>0;for(let p=0;p<v.length;p++)v[p].visible=c}get dropped(){const e=this.geo._maxInstanceCount;return e===void 0||!this.mesh.visible?0:Math.max(0,this.count-e)}release(){this.geo.dispose();for(const e of this.meshes){e.material.dispose();const t=Se.indexOf(e);t>=0&&(Se.splice(t,1),be.splice(be.indexOf(e.material),1))}}dispose(){this.release(),this.atlas.albedo.dispose(),this.atlas.normal.dispose()}}const ko=[.91,.71,.42],Co=[.85,.47,.62],zo=[[.91,.71,.42],[.82,.52,.28],[.91,.71,.42]],Po=1.4,et=32,Y=16,kt=Y*Y-1,ci=kt-1,Ao=(a,e,t=.8)=>Math.min(1,Math.max(0,(a-e)/t)),di=3,Mo=10,Lo=a=>a.level>=di,To=`
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
${Ge}
${_e}
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
}`,Do=`
uniform sampler2D uGlyphs, uGlyphsPal;
uniform float uGlyphIdx; // 1: uGlyphs is an index plane, its colours in uGlyphsPal (render/palette.ts; the attack look's atlas)
uniform float uSolid;
uniform float uRgb; // the texture's own colours, times the instance's (the attack look's atlas: render/leash/attackLook.ts); else its colour alone
varying vec2 vUv, vP;
varying vec4 vCol;
varying float vDraw, vShine;
varying vec3 vWorld;
varying float vPix, vN;
${Ue}
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
    vec2 q = (floor((vP + 0.5) * ${et}.0) + 0.5) / ${et}.0;
    if (abs((q.x + q.y) * 0.5 - (vShine - 2.0)) < 0.13) rgb = mix(rgb, vec3(1.0), 0.9);
  }
  // Written on: revealed clockwise from the top as vDraw goes 0 to 1.
  float ang = fract(atan(vP.x, vP.y) / 6.2831853 + 1.0);
  if (ang > vDraw || a < 0.02) discard;
#ifdef MASK
  gl_FragColor = vec4(a); return; // (its coverage alone, for the tilt-shift's sharp mask: maskOf)
#endif
  gl_FragColor = uSolid > 0.5 ? vec4(haze(rgb, vWorld), a) : vec4(haze(rgb * a, vWorld), 1.0); // (solid: dust and bits, blended, not glowing)
}`;function Ro(a){return new U({vertexShader:a.vertexShader,fragmentShader:a.fragmentShader,uniforms:a.uniforms,defines:{MASK:""},transparent:!0,depthWrite:!1,depthTest:!1,blending:dt,blendEquation:Ke,blendEquationAlpha:Ke})}const fi=["iPos","iSize","iUv","iCol","iDraw","iShine"];function gi(a){const e=t=>a[0]===t%Y/Y&&a[1]===1-Math.floor(t/Y)/Y;return!(a[0]===0&&a[1]===1)&&!e(kt)&&!e(ci)}class mi{mesh;glyphGain=1;geo=new ct;cap=0;n=0;dirty=[new R,new R,new R,new R,new R,new R];pos;size;uv;col;draw;shine;constructor(e){const t=new Re(1,1);this.geo.index=t.index,this.geo.setAttribute("position",t.getAttribute("position")),this.geo.setAttribute("uv",t.getAttribute("uv")),this.grow(256),this.mesh=new N(this.geo,e),this.mesh.frustumCulled=!1,this.mesh.renderOrder=3}grow(e){const t=(o,r)=>{const n=new Float32Array(e*r);return o&&n.set(o),n};this.pos=t(this.pos,3),this.size=t(this.size,1),this.uv=t(this.uv,4),this.col=t(this.col,4),this.draw=t(this.draw,1),this.shine=t(this.shine,1),this.cap=e,this.geo.dispose();const i=(o,r,n)=>this.geo.setAttribute(o,new ft(r,n).setUsage(gt));i("iPos",this.pos,3),i("iSize",this.size,1),i("iUv",this.uv,4),i("iCol",this.col,4),i("iDraw",this.draw,1),i("iShine",this.shine,1)}begin(){this.n=0}add(e,t,i,o,r,n,s,l,h,u=1,d=!1,m=0){this.n>=this.cap&&this.grow(this.cap*2),this.glyphGain!==1&&gi(r)&&(n*=this.glyphGain,s*=this.glyphGain,l*=this.glyphGain);const g=this.n++,x=this.pos,v=this.uv,c=this.col,p=this.dirty,z=u+(d?2:0);let f=g*3;(x[f]!==e||x[f+1]!==t||x[f+2]!==i)&&(x[f]=e,x[f+1]=t,x[f+2]=i,p[0].touch(g)),this.size[g]!==o&&(this.size[g]=o,p[1].touch(g)),f=g*4,(v[f]!==r[0]||v[f+1]!==r[1]||v[f+2]!==r[2]||v[f+3]!==r[3])&&(v[f]=r[0],v[f+1]=r[1],v[f+2]=r[2],v[f+3]=r[3],p[2].touch(g)),(c[f]!==n||c[f+1]!==s||c[f+2]!==l||c[f+3]!==h)&&(c[f]=n,c[f+1]=s,c[f+2]=l,c[f+3]=h,p[3].touch(g)),this.draw[g]!==z&&(this.draw[g]=z,p[4].touch(g)),this.shine[g]!==m&&(this.shine[g]=m,p[5].touch(g))}end(){this.geo.instanceCount=this.n,fi.forEach((e,t)=>this.dirty[t].flush(this.geo.getAttribute(e)))}}const S=[{id:"full",label:"full quality",when:"live",built:!0},{id:"farDither",label:"the forest's far edge dithered, not faded",when:"live",built:!0},{id:"density90",label:"trees ×0.9",when:"load",built:!0},{id:"blend40",label:"area borders blend over 40 m",when:"load",built:!1},{id:"squeeze",label:"tall trees squeezed",when:"live",built:!0},{id:"still",label:"leaves still, no trunk shadows",when:"live",built:!0},{id:"hardCut",label:"the cut-away's crowns solid",when:"live",built:!0},{id:"fxDistort",label:"magic shimmer off",when:"live",built:!0},{id:"fxImprints",label:"temporary magic scenery marks off",when:"live",built:!0},{id:"fxSecondary",label:"magic secondary detail off",when:"live",built:!0},{id:"fxLights",label:"at most two magic lights",when:"live",built:!0},{id:"fxParticles",label:"half the magic particles",when:"live",built:!0},{id:"density80",label:"trees ×0.8",when:"load",built:!0},{id:"cap30",label:"a steady 30 fps",when:"live",built:!0},{id:"px4",label:"chunkier pixels (px 4)",when:"load",built:!0}];function vi(a){const e=t=>{const i=S.findIndex(o=>o.id===t);return S[i].built&&i<=a};return{density:e("density80")?.8:e("density90")?.9:1,blend:e("blend40")?40:null,px:e("px4")?4:null}}const Ct={over:.9,under:.7,downAfter:3,upAfter:10,settle:2,flips:3,flipWindow:60,fit:.85,retry:60,retryMax:480,missed:1.25,kept:1.1},Fe=(a=0,e="auto")=>{const t=pe(a);return{rung:t,loaded:t,mode:e,slow:0,roomy:0,since:0,last:-1/0,dir:0,reversals:[],locked:!1,cost:S.map(()=>NaN),left:S.map(()=>0),leftAt:S.map(()=>NaN),t:0}},pe=a=>Math.max(0,Math.min(S.length-1,Math.round(Number.isFinite(a)?a:0)));function ce(a,e){const t=S[e];return!t?.built||e===0?!1:t.when==="live"?e<=a.rung:e<=a.loaded}function pi(a){const e=[],t=[];return S.forEach((i,o)=>{i.when!=="load"||!i.built||(o<=a.rung&&o>a.loaded&&e.push(o),o>a.rung&&o<=a.loaded&&t.push(o))}),{adds:e,drops:t}}function wi(a){for(let e=a.rung+1;e<S.length;e++)if(S[e].built&&S[e].when==="live")return e;for(let e=S.length-1;e>a.rung;e--)if(S[e].built)return e;return-1}function yi(a){for(let e=a.rung;e>0;e--)if(S[e].built&&S[e].when==="live")return e-1;return a.rung>0?0:-1}function xi(a,e,t,i=1,o=!1,r=Ct,n=!0){const s={...a,t:a.t+i,since:a.since+i,cost:a.cost.slice(),reversals:a.reversals.filter(u=>a.t+i-u<=r.flipWindow)};if(s.mode!=="auto")return s;if(o)return{...s,since:0,slow:0};if(!(e>0)||!(t>0)||s.since<=r.settle)return s;const l=s.cost[s.rung];s.cost[s.rung]=Number.isFinite(l)?l+(e-l)*.3:e,s.slow=e>t*(n?r.over:r.missed)?s.slow+1:0,s.roomy=e<t*(n?r.under:r.kept)?s.roomy+i:0;const h=(u,d)=>{s.dir&&d!==s.dir&&s.t-s.last<=r.flipWindow&&s.reversals.push(s.t);const m=s.locked||s.reversals.length>=r.flips,g=s.left.slice(),x=s.leftAt.slice();return d<0&&(g[s.rung]++,x[s.rung]=s.t),{...s,rung:u,dir:d,last:s.t,since:0,slow:0,roomy:0,locked:m,left:g,leftAt:x}};if(s.slow>=r.downAfter){const u=wi(s);if(u>=0)return h(u,-1);s.slow=0}else if(s.roomy>=r.upAfter&&!s.locked){const u=yi(s);if(u>=0){const d=s.cost[u];if(!Number.isFinite(d)||d<t*r.fit||s.t-s.leftAt[u]>=bi(s,u,r))return h(u,1);s.roomy=0}}return s}const bi=(a,e,t=Ct)=>Math.min(t.retryMax,t.retry*2**Math.max(0,(a.left[e]??0)-1));function re(a,e,t=a.rung){const i=e==="off"?0:pe(t);return{...a,mode:e,rung:i,since:0,slow:0,roomy:0,locked:e==="auto"?!1:a.locked,reversals:e==="auto"?[]:a.reversals}}const Si=`
uniform vec3 uRight,uUp;
uniform float uFlat,uMpp;uniform vec2 uRes;
attribute vec3 iPos; attribute float iSize,iDraw,iShine; attribute vec4 iUv,iCol;
varying vec2 vP; varying vec4 vData,vCol; varying vec3 vWorld;varying vec2 vGrid;
${Ge}
${_e}
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
}`,Fi=`
uniform sampler2D uFxRamp;uniform float uFxTime,uLayer,uCalm,uSecondary,uDistort;uniform vec2 uHalo;
varying vec2 vP;varying vec4 vData,vCol;varying vec3 vWorld;varying vec2 vGrid;
${Ue}
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
    bool detail=uSecondary>0.5 && strength>${b.secondaryAt} && abs(sin(angle*4.0+time+r*9.0))<0.08 && r>0.45 && r<0.8;
    if(!detail && (spark<0.985-strength*0.012 || r>0.95))discard;
    rgb=detail?texelFetch(uFxRamp,ivec2(4,int(vData.y+0.5)),0).rgb:ramp(2.0).rgb;a=0.65;
  }
  if(form>10.5)a*=smoothstep(-1.0,0.7,p.x);
  a*=vCol.a;if(a<0.01)discard;
  gl_FragColor=vec4(haze(rgb*vCol.rgb,vWorld),a);
}`;class ki{layers=[];time={value:0};calm={value:0};secondary={value:1};distort={value:1};mpp={value:.09375};count=0;canopy=!1;constructor(e){const t=new Uint8Array(5*I.length*4);I.forEach((o,r)=>{const n=q[o];[...n.ramp,n.contrast].forEach((s,l)=>{const h=parseInt(s.slice(1),16),u=(r*5+l)*4;t.set([h>>16,h>>8&255,h&255,n.motion],u)})});const i=me(new ve(t,5,I.length),"fx");i.minFilter=i.magFilter=_,i.needsUpdate=!0;for(let o=0;o<9;o++){const r=o===8,n=r?0:Math.floor(o/4),s=r?2:o%4,l=new U({vertexShader:Si,fragmentShader:Fi,uniforms:{...L,...se,uRight:ge.uRight,uUp:ge.uUp,uRes:ge.uRes,uMpp:this.mpp,uHalo:{value:new M(...b.halo)},uFxRamp:{value:i},uFlat:{value:n},uLayer:{value:s},uFxTime:this.time,uCalm:this.calm,uSecondary:this.secondary,uDistort:this.distort},transparent:!0,depthWrite:!1,depthTest:!r,blending:s>=2?jt:Jt}),h=new mi(l);h.mesh.name=r?"Magic canopy halo":`Magic ${n?"ground":"upright"} layer ${s}`,h.mesh.renderOrder=r?11.2:n?2.9+s*.01:2.8+s*.01,e.add(h.mesh),this.layers.push(h)}}begin(e,t){this.time.value=e,this.calm.value=t?1:0,this.count=0;for(const i of this.layers)i.begin()}add(e,t,i,o,r,n,s,l=null,h=!0){for(let u=0;u<(h?4:3);u++){if(u!==1){if(this.count>=b.instances)continue;this.count++}this.layers[(s?4:0)+u].add(e,t,i,o*(u===0?1.12:u===2?1.45:1),r,l?.[0]??1,l?.[1]??1,l?.[2]??1,n)}!s&&this.canopy&&this.secondary.value>.5&&this.count<b.instances&&(this.count++,this.layers[8].add(e,t,i,o*1.5,r,l?.[0]??1,l?.[1]??1,l?.[2]??1,n*.12))}beam(e,t,i,o,r,n,s,l,h){for(let u=0;u<4;u++){if(u!==1){if(this.count>=b.instances)continue;this.count++}this.layers[u].add(e,t,i,n*(u===0?1.12:u===2?1.45:1),s,h?.[0]??1,h?.[1]??1,h?.[2]??1,l,-o,!1,r)}this.canopy&&this.secondary.value>.5&&this.count<b.instances&&(this.count++,this.layers[8].add(e,t,i,n*1.5,s,h?.[0]??1,h?.[1]??1,h?.[2]??1,l*.12,-o,!1,r))}end(){for(const e of this.layers)e.end()}}const Ci={element:"party",form:"beam",intensity:.45,preserveHue:!0,light:.12,anchor:.08},zi={element:"party",form:"beam",intensity:.65,preserveHue:!0,light:.08,anchor:.04},Pi={element:"party",form:"projectile",intensity:.25,preserveHue:!0,light:.04,anchor:.02},Ai={element:"moonlight",form:"aura",intensity:.45,preserveHue:!0,light:0,anchor:.06},Mi={element:"water",form:"aura",intensity:.25,preserveHue:!0,light:.05,anchor:.02},Li={element:"moonlight",form:"pillar",intensity:.65,preserveHue:!0,light:0,anchor:0},Ti={element:"party",form:"beam",intensity:.65,preserveHue:!0,light:.14,anchor:.08},Di={element:"moonlight",form:"dome",intensity:.65,preserveHue:!0,light:0,anchor:0},Ri={element:"water",form:"zone",intensity:.45,preserveHue:!0,light:0,anchor:0},Ei={element:"party",form:"burst",intensity:1,preserveHue:!0,light:0,anchor:0},Gi={element:"moonlight",form:"aura",intensity:.45,preserveHue:!0,light:0,anchor:0},zt={flightTrail:Ci,partySwoop:zi,broomSpark:Pi,sigil:Ai,ringDot:Mi,runestone:Li,ley:Ti,hologram:Di,lake:Ri,firework:Ei,decorativeGlow:Gi},Pt={value:1};function Ui(a){const e=zt[a],t=q[e.element];return{uNativeOn:Pt,uNativeRamp:{value:t.ramp.map(i=>new F((parseInt(i.slice(1),16)>>16)/255,(parseInt(i.slice(1),16)>>8&255)/255,(parseInt(i.slice(1),16)&255)/255))},uNativeStyle:{value:new M(e.intensity,e.preserveHue?1:0)}}}const _i=`
uniform float uNativeOn;uniform vec3 uNativeRamp[4];uniform vec2 uNativeStyle;
vec3 nativeFxColour(vec3 c){
  if(uNativeOn<0.5)return c;
  float l=max(c.r,max(c.g,c.b));if(l<0.00001)return c;
  vec3 band=l<0.2?uNativeRamp[0]:l<0.45?uNativeRamp[1]:l<0.75?uNativeRamp[2]:uNativeRamp[3];
  if(uNativeStyle.y>0.5)band=c/l*max(band.r,max(band.g,band.b));
  // Retain the native form's falloff and authored hue; quantise its light toward the family's ramp.
  return mix(c,band*min(1.0,l*1.2),0.18*uNativeStyle.x);
}`;function Eo(a,e){a.traverse(t=>{const i=t.material;for(const o of Array.isArray(i)?i:[i]){if(!(o instanceof U)||o.userData.nativeFx)return;/void\s+main\s*\(/.test(o.fragmentShader)&&(o.fragmentShader=_i+o.fragmentShader.replace(/void\s+main\s*\(/,"void nativeMain(")+`
void main(){nativeMain();gl_FragColor.rgb=nativeFxColour(gl_FragColor.rgb);}
`,Object.assign(o.uniforms,Ui(e)),o.userData.nativeFx=e,o.needsUpdate=!0)}})}const Hi={shakeCap:.18,seconds:.5,minimumIntensity:.85},ae={screen:Hi},P={distortion:!0,imprints:!0,secondary:!0,lightCap:b.lightCap,particles:1},tt=new WeakMap;function Go(a){let e=tt.get(a);return e||(e=new Wi(a),tt.set(a,e)),e}class Wi{quality=P;fieldUniforms=E;batches;field=new si;stats={lights:0,requests:0,instances:0,fieldBytes:b.fieldSize**2*8};enabled=new URLSearchParams(globalThis.location?.search??"").get("magic")!=="old";galleryPage=0;galleryElement=null;galleryTime=null;captureTime=null;galleryDark=!1;galleryCamera=null;galleryVisible=!0;galleryLegacyVisible=!0;legacyParty=null;panel=null;hidden=[];background=null;lights=new Map;bursts=[];data=[0,0,0,0];selected=[];owner=null;time=0;dt=0;cx=0;cz=0;screenAt=-1/0;screenStrength=0;constructor(e){this.batches=new ki(e)}begin(e,t,i,o){e=this.captureTime??e,(this.owner!==o||e<this.time)&&(this.reset(),this.owner=o,this.time=e),this.dt=Math.max(0,e-this.time),this.time=e,this.cx=t,this.cz=i,Pt.value=this.enabled?1:0,this.field.move(t,i),this.field.decay(this.dt),this.batches.begin(e,Z.reduceFlashing),this.batches.secondary.value=P.secondary?1:0,this.batches.distort.value=P.distortion&&!Z.reduceFlashing?1:0,E.uFxOn.value=this.enabled&&P.imprints?1:0,E.uFxTime.value=e,E.uFxCalm.value=Z.reduceFlashing?1:0,this.stats.instances=0}reset(){this.field.reset(),this.lights.clear(),this.bursts.length=0,this.screenAt=-1/0,this.screenStrength=0}get screenKick(){if(!this.enabled||Z.reduceFlashing)return 0;const e=Math.max(0,(this.time-this.screenAt)/ae.screen.seconds);return e>=1?0:Math.min(ae.screen.shakeCap,this.screenStrength)*(1-e)**2}draw(e,t,i,o,r,n,s=1,l=1,h=0,u=0,d=null,m=ye(n)){if(!this.enabled||!(l>.01)||Math.hypot(i-this.cx,r-this.cz)>140)return;const g=Q(e),x=q[g],v=O[t],c=this.batches.mpp.value,p=Math.max(c,Math.round(v.size*s*ue(b.size,m)/c)*c);m>=ae.screen.minimumIntensity&&(t==="burst"||t==="eruption")&&h<.15&&(this.screenAt=this.time,this.screenStrength=ae.screen.shakeCap*l),this.data[0]=v.id,this.data[1]=I.indexOf(g),this.data[2]=m,this.data[3]=h,this.batches.add(i,o,r,p,this.data,l,v.ground,d,P.particles>.5||(u&1)===0),this.stats.instances++,v.ground||(this.data[0]=O.zone.id,this.batches.add(i,0,r,Math.min(p*.75,12),this.data,l*.18,!0,d,!1)),this.light(`${g}:${t}:${u}`,i,o,r,g,m,l,d),P.imprints&&(t==="burst"||t==="zone"||t==="eruption"||t==="beam"||t==="projectile"||t==="vortex"||t==="pillar")&&this.field.stamp(i,r,Math.max(2,Math.min(18,p*.6)),x.imprint,m*l*(t==="projectile"?.25:1))}emit(e,t,i,o,r,n,s=1,l=1.2,h=0){this.bursts.length>=b.pool&&this.bursts.shift(),this.bursts.push({element:e,form:t,x:i,y:o,z:r,level:n,size:s,at:this.time,life:l,seed:h}),n>=3&&s>=1&&(this.screenAt=this.time,this.screenStrength=ae.screen.shakeCap)}native(e,t,i,o,r=1,n=0,s=null){if(!this.enabled||r<=.01||Math.hypot(t-this.cx,o-this.cz)>80)return;const l=zt[e],h=Q(l.element);l.light>0&&this.light(`native:${e}:${n}`,t,i,o,h,l.intensity,Math.min(1,r)*l.light,s),l.anchor>0&&(this.data[0]=O.zone.id,this.data[1]=I.indexOf(h),this.data[2]=l.intensity,this.data[3]=0,this.batches.add(t,0,o,Math.min(5,O[l.form].size*1.5),this.data,l.anchor*Math.min(1,r),!0,s,!1))}beam(e,t,i,o,r,n,s,l,h,u,d=null,m=ye(l)){const g=Math.hypot(o-t,r-i);if(!this.enabled||g<.01||h<=.01)return;const x=Q(e),v=(t+o)/2,c=(i+r)/2;if(Math.hypot(v-this.cx,c-this.cz)>140+g/2)return;this.data[0]=O.beam.id,this.data[1]=I.indexOf(x),this.data[2]=m,this.data[3]=this.time%1;const p=Math.abs(r-i)/g;this.batches.beam(v,n,c,g,Math.atan2(r-i,o-t),Math.max(s,this.batches.mpp.value*3)*(1+p*.35),this.data,h,d);const z=Math.min(8,Math.max(1,Math.ceil(g/4)));for(let f=0;f<=z;f++){const T=t+(o-t)*f/z,A=i+(r-i)*f/z;this.light(`${x}:beam:${u}:${f}`,T,n,A,x,m,h,d),P.imprints&&this.field.stamp(T,A,Math.max(2,s*1.5),q[x].imprint,m*h)}this.stats.instances++}ribbon(e,t,i,o,r,n,s,l,h,u=null,d=ye(l)){const m=Math.hypot(r,s);if(!this.enabled||m<.1)return;const g=Math.min(.32,8/m),x=m*g,v=Q(e);this.data[0]=O.trail.id,this.data[1]=I.indexOf(v),this.data[2]=d,this.data[3]=n*g,this.batches.beam(t-r*g/2,i-n*g/2,o-s*g/2,x,Math.atan2(s,r),.55*ue(b.size,d),this.data,.6,u),P.imprints&&(h&3)===0&&this.field.stamp(t-r*g,o-s*g,2,q[v].imprint,.15*d)}light(e,t,i,o,r,n,s,l){let h=this.lights.get(e);if(!h){if(this.lights.size>=b.pool){const d=xe(t,o,n*s,this.cx,this.cz);let m="",g=1/0;for(const[x,v]of this.lights){const c=xe(v.x,v.z,v.target,this.cx,this.cz);c<g&&(m=x,g=c)}if(d<=g)return;this.lights.delete(m)}h={x:t,y:i,z:o,reach:0,rgb:new F,strength:0,target:0,seen:this.time,score:0,fade:0},this.lights.set(e,h)}const u=parseInt(q[r].ramp[1].slice(1),16);h.x=t,h.y=i,h.z=o,h.reach=ue(b.lightReach,n),h.rgb.set(l?.[0]??(u>>16)/255,l?.[1]??(u>>8&255)/255,l?.[2]??(u&255)/255),h.target=ue(b.lightStrength,n)*Math.min(1,s)*(Z.reduceFlashing?.5:1),h.seen=this.time}finish(e){let t=0;for(const n of this.bursts){const s=this.time-n.at;if(s<0||s>=n.life)continue;this.bursts[t++]=n;const l=s/n.life,h=Math.min(1,s/.2,(n.life-s)/.3);this.draw(n.element,n.form,n.x,n.y,n.z,n.level,n.size,h,l,n.seed)}this.bursts.length=t,this.batches.end(),this.field.publish();const i=E.uFxField.value.image.data,o=E.uFxExtra.value.image.data;let r=!1;for(let n=0,s=0;n<this.field.data.length;n+=8,s+=4)for(let l=0;l<4;l++){const h=this.field.data[n+l],u=this.field.data[n+l+4];(h||u)&&(r=!0),i[s+l]=h,o[s+l]=u}E.uFxOn.value=r&&this.enabled&&P.imprints?1:0,E.uFxField.value.needsUpdate=!0,E.uFxExtra.value.needsUpdate=!0,E.uFxBox.value.set(this.field.x*this.field.cell,this.field.z*this.field.cell,this.field.metres,this.field.size),this.applyLights(e)}applyLights(e){this.selected.length=0;for(const[s,l]of this.lights){const h=this.enabled&&l.seen===this.time,u=this.dt/b.lightEase;if(l.fade=Math.max(0,Math.min(1,l.fade+(h?u:-u))),l.strength=l.target*l.fade,!h&&l.fade<.001){this.lights.delete(s);continue}l.score=xe(l.x,l.z,l.strength,this.cx,this.cz),Math.hypot(l.x-this.cx,l.z-this.cz)<l.reach+30&&this.selected.push(l)}this.selected.sort((s,l)=>l.score-s.score),this.enabled||(this.selected.length=0);const t=L,i=Math.max(0,Math.min(K,Math.floor(e))),o=Math.min(P.lightCap,b.lightCap,i),r=Math.min(o,this.selected.length),n=Math.min(t.uLightCount.value,Math.max(0,i-r));for(let s=0;s<r;s++){const l=this.selected[s];t.uLightPos.value[n+s].set(l.x,Kt(l.x,l.z)+l.y,l.z,l.reach),t.uLightCol.value[n+s].set(l.rgb.x,l.rgb.y,l.rgb.z,l.strength)}t.uLightCount.value=n+r,this.stats.lights=r,this.stats.requests=this.lights.size}gallery(e,t,i,o){if(this.galleryPanel(e),!this.galleryVisible)return;const r=(this.galleryTime??o)%4/4;if(this.galleryPage===3){const s=this.galleryElement??e;this.beam(s,t-13,i,t-3,i,1.5,1.4,2,.8,880001),this.beam(s,t+8,i-5,t+8,i+5,1.5,1.4,2,.8,880002);return}Ze.slice(this.galleryPage*4,this.galleryPage*4+4).forEach((s,l)=>[.25,.6,1].forEach((h,u)=>{const d=t+(l-1.5)*10,m=i+(u-1)*12;if(s==="beam"){this.beam(this.galleryElement??e,d-3,m,d+3,m,1.5,1.4,2,.8,l*3+u,null,h);return}if(s==="trail"){this.ribbon(this.galleryElement??e,d+3,2,m,20,0,0,2,l*3+u,null,h);return}this.draw(this.galleryElement??e,s,d,O[s].ground?0:s==="pillar"?5:2,m,2,1,.7,r,l*3+u,null,h)}))}galleryPanel(e){if(this.panel||typeof document>"u")return;const t=this.panel=document.createElement("aside");t.style.cssText="position:fixed;left:12px;top:12px;z-index:20000;background:#15131eee;color:#fff;padding:12px;font:14px monospace;max-width:420px";const i=document.createElement("div");i.textContent="Magic gallery · rows far → near: 0.25 / 0.6 / 1",t.append(i);const o=document.createElement("select");o.setAttribute("aria-label","Magic element");for(const d of I){const m=document.createElement("option");m.value=m.textContent=d,o.append(m)}o.value=Q(e),o.onchange=()=>{this.galleryElement=o.value},t.append(o);const r=document.createElement("select");r.setAttribute("aria-label","Magic forms");for(let d=0;d<3;d++){const m=document.createElement("option");m.value=String(d),m.textContent=Ze.slice(d*4,d*4+4).join(" / "),r.append(m)}const n=document.createElement("option");n.value="3",n.textContent="Equal E–W / N–S beams",r.append(n),r.onchange=()=>{this.galleryPage=Number(r.value)},t.append(r);const s=(d,m)=>{const g=document.createElement("button");return g.textContent=d,g.onclick=m,t.append(g),g},l=s("Pause",()=>{this.galleryTime=this.galleryTime===null?this.time:null,l.textContent=this.galleryTime===null?"Pause":"Play"}),h=s("Dark ground",()=>{this.galleryDark=!this.galleryDark,h.textContent=this.galleryDark?"Forest ground":"Dark ground"}),u=s("Treetop camera",()=>{this.galleryCamera=!this.galleryCamera,u.textContent=this.galleryCamera?"Ground camera":"Treetop camera"});document.body.append(t)}hideBackdrop(e){if(this.galleryDark){this.background=e.background,e.background=new Ee("#15131e"),this.hidden=e.children.filter(t=>!t.name.startsWith("Magic ")).map(t=>({object:t,visible:t.visible}));for(const t of this.hidden)t.object.visible=!1}}restoreBackdrop(e){if(this.hidden.length){for(const t of this.hidden)t.object.visible=t.visible;this.hidden.length=0,e.background=this.background}}}const at=1e3/60,it=1e3/30,Oi=.35,At="witch.ladder";class Uo{mutate=(e,t)=>t();state;ms=NaN;timed=!1;key;bases=new WeakMap;applied="";win={t0:NaN,frames:[],skip:!1};constructor(e,t){this.key=`${At}:${e.slice(0,120)}`,this.state=Mt(t,Lt(this.key)),this.sync()}get cap30(){return ce(this.state,S.findIndex(e=>e.id==="cap30"))}frame(e,t,i,o,r){const n=this.win;if(Number.isNaN(n.t0)&&(n.t0=e),i||t>250?n.skip=!0:t>0&&n.frames.push(t),e-n.t0>=1e3){const s=(e-n.t0)/1e3,l=n.frames.length,h=r.length?rt(r.slice(-Math.max(1,Math.min(l,r.length)))):NaN;this.timed=Number.isFinite(h),this.ms=this.timed?h:rt(n.frames);const u=this.state.rung;this.state=xi(this.state,this.ms,this.cap30?it:at,s,n.skip||l<5,void 0,this.timed),this.state.rung!==u&&this.state.mode==="auto"&&this.save(),this.sync(),n.t0=e,n.frames=[],n.skip=!1}this.apply(o)}apply(e){let t=this.bases.get(e);if(!t){const r=Tt.get(e);r!==void 0&&(this.state={...this.state,loaded:r}),t={keep:e.treeCap.keep,wind:e.wind.on,trunks:e.shadows.trunks?.mode??"off",edge:!!e.scenery.edgeDither,hard:!!e.canopyCutout.hard},this.bases.set(e,t),this.applied=""}const i=r=>ce(this.state,S.findIndex(n=>n.id===r)),o=S.map((r,n)=>ce(this.state,n)?1:0).join("");o!==this.applied&&(this.applied=o,this.mutate("automatic quality tuning",()=>{P.distortion=!i("fxDistort"),P.imprints=!i("fxImprints"),P.secondary=!i("fxSecondary"),P.lightCap=i("fxLights")?2:6,P.particles=i("fxParticles")?.5:1,st(e.scenery,"edgeDither",i("farDither")||t.edge),st(e.canopyCutout,"hard",i("hardCut")||t.hard),e.treeCap.keep=i("squeeze")?Math.min(t.keep,Oi):t.keep,e.wind.on=i("still")?!1:t.wind,e.shadows.trunks&&(e.shadows.trunks.mode=i("still")?"off":t.trunks)}))}lines(){const e=this.state,t=S[e.rung],i=S.length-1,r=[`${e.mode==="off"?"off (full quality)":e.mode==="pinned"?`pinned at ${e.rung}`:e.locked?"auto, holding (it kept flipping)":"auto"}: rung ${e.rung} of ${i}, ${t.label}`];Number.isFinite(this.ms)&&r.push(`${this.timed?"GPU":"frame"} ${this.ms.toFixed(1)} ms a frame, budget ${(this.cap30?it:at).toFixed(1)}`);const n=S.filter((l,h)=>ce(e,h)).map(l=>l.label);n.length&&r.push(`in effect: ${n.join("; ")}`);const s=pi(e);return s.adds.length&&r.push(`from the next load: ${s.adds.map(l=>S[l].label).join("; ")}`),s.drops.length&&r.push(`back from the next load: ${s.drops.map(l=>S[l].label).join("; ")}`),r}options(){return[{value:"auto",label:"Auto"},{value:"off",label:"Off (full quality)"},...S.slice(1).map((e,t)=>({value:String(t+1),label:`${t+1}: ${e.label}${e.built?"":" (not built yet)"}`}))]}current(){return this.state.mode==="auto"?"auto":this.state.mode==="off"?"off":String(this.state.rung)}choose(e){this.state=e==="auto"?re(this.state,"auto"):e==="off"?re(this.state,"off"):re(this.state,"pinned",Number(e)),e==="auto"&&this.save(),this.sync()}sync(){ie=this.state.mode==="off"?0:this.state.rung}save(){try{localStorage.setItem(this.key,JSON.stringify({rung:this.state.rung,at:Date.now()}))}catch{}}}function Mt(a,e){const t=a.get("ladder"),i=t!==null&&t!==""&&Number.isFinite(Number(t)),o=typeof navigator<"u"&&navigator.webdriver===!0;return t==="off"||o&&t!=="auto"&&!i?re(Fe(0),"off"):i?re(Fe(pe(Number(t))),"pinned"):Fe(e)}function Lt(a){try{const e=JSON.parse(localStorage.getItem(a)??"null");return pe(Number(e?.rung??0))}catch{return 0}}let ie=null,de;const Tt=new WeakMap;function Dt(a,e=new Set){ie===null&&(ie=(()=>{const i=Mt(ot(),Lt(`${At}:${Ni().slice(0,120)}`));return i.mode==="off"?0:i.rung})());const t=vi(ie);de===void 0&&(de=ot().has("px")?null:t.px),t.density!==1&&!e.has("treeDensity")&&(a.treeDensity*=t.density),t.blend!==null&&!e.has("areaEdgeBlend.width")&&(a.areaEdgeBlend.width=Math.min(a.areaEdgeBlend.width,t.blend)),de&&(a.pixelSize=de),Tt.set(a,ie)}const ot=()=>new URLSearchParams(typeof location<"u"?location.search:"");function Ni(){try{const a=document.createElement("canvas").getContext("webgl2");if(!a)return"unknown";const e=Ii(a);return a.getExtension("WEBGL_lose_context")?.loseContext(),e}catch{return"unknown"}}function Ii(a){try{const e=a.getExtension("WEBGL_debug_renderer_info");return String(e?a.getParameter(e.UNMASKED_RENDERER_WEBGL):a.getParameter(a.RENDERER))}catch{return"unknown"}}function st(a,e,t){t?a[e]=!0:delete a[e]}function rt(a){if(!a.length)return NaN;const e=[...a].sort((t,i)=>t-i);return e[Math.floor(e.length/2)]}const qi="witch-mapprep",Te="prep",$i="next",Bi=()=>new Promise(a=>{try{const e=indexedDB.open(qi,1);e.onupgradeneeded=()=>e.result.createObjectStore(Te),e.onsuccess=()=>a(e.result),e.onerror=e.onblocked=()=>a(null)}catch{a(null)}});async function ji(){const a=await Bi();return a?new Promise(e=>{try{const t=a.transaction(Te,"readonly").objectStore(Te).get($i);t.onsuccess=()=>{a.close(),e(t.result??null)},t.onerror=()=>{a.close(),e(null)}}catch{a.close(),e(null)}}):null}const Ji="v6979 · 5167f8f",He=(a,e)=>`${Ji}|${a}|${Vt(JSON.stringify(e))}`;function Rt(a,e,t){const i=new URLSearchParams({island:a,seed:String(t),...e!=null?{world:String(e)}:{},arrive:"1"}),{tuning:o}=mt(i);return vt(o,void 0,new Set),Dt(o),pt(wt(),o),o}let B="none",j=0,J=0;const oe=(a,e=0)=>{try{performance.mark("witch:map-prep-source",{detail:{seed:a,status:B,workerMs:j,hydrateMs:J,checkMs:e}})}catch{}};function De(a,e,t){const i=performance.now();if(B="none",j=0,J=0,!a)return oe(e),null;if(a.key!==He(e,t))return B="stale",oe(e,performance.now()-i),a.key.split("|")[1]===String(e)&&a.tuning&&console.info("map prep: another tuning's",Object.keys(t).filter(r=>JSON.stringify(t[r])!==JSON.stringify(a.tuning[r]))),null;const o=_t(a.prep);return o?(B="unsound",oe(e,performance.now()-i),console.warn("map prep: unsound, made afresh:",o),null):(Ht(a.arch),B="worker",j=a.ms,oe(e,performance.now()-i),a.prep)}function Ki(a,e,t){const i=performance.now();if(t)try{const o=Gt(a,e,t);J=performance.now()-i;try{performance.mark("witch:map-hydrated",{detail:{seed:a,ms:J,workerMs:j}})}catch{}return j>0&&J>j&&console.warn(`map prep: hydrate ${Math.round(J)} ms, slower than making it (${Math.round(j)} ms in the worker)`),o}catch(o){B="failed",oe(a),console.warn("map prep: hydrate failed, made afresh:",o)}return Ut(a,e)}async function Yi(a,e,t=1500){return De(typeof indexedDB>"u"?null:await Promise.race([ji(),new Promise(i=>setTimeout(()=>i(null),t))]),a,e)}function Et(a,e,t,i=!0){let o=null,r=()=>{};const n=new Promise(s=>{r=s});try{if(typeof Worker>"u")return r(null),{done:n,stop(){}};o=new Worker(new URL(""+new URL("mapPrep.worker-D-LcahDb.js",import.meta.url).href,import.meta.url),{type:"module"}),o.onmessage=s=>{r(s.data.rec??s.data.ok),o?.terminate(),o=null},o.onerror=()=>{r(null),o?.terminate(),o=null},Yt(o,{key:He(a,e),seed:a,tuning:e,send:t,noKeep:!i},"map-prep",a)}catch{r(null)}return{done:n,stop(){o?.terminate(),o=null,r(null)}}}function Vi(a,e,t,i=!1){return Et(t,Rt(a,e,t),i)}function Xi(a,e,t=1e4){try{const{tuning:i}=mt(e),o=new Set((e.get("set")??"").split(";").map(s=>s.split("=")[0]).filter(Boolean));vt(i,void 0,o),Dt(i,o),pt(wt(),i);const r=Et(a,i,!0,!1),n=setTimeout(()=>r.stop(),t);return r.done.then(s=>(clearTimeout(n),s&&typeof s=="object"?s:null))}catch{return Promise.resolve(null)}}const _o=Object.freeze(Object.defineProperty({__proto__:null,get hydrateMs(){return J},prepKey:He,get prepUsed(){return B},readyMap:Ki,sailTuning:Rt,startBootMapPrep:Xi,startMapPrep:Vi,takeMapPrep:Yi,useReadyMap:De},Symbol.toStringTag,{value:"Module"}));export{zo as $,kt as A,lo as B,ya as C,R as D,Go as E,E as F,mo as G,Ze as H,mi as I,Po as J,Do as K,L,K as M,_i as N,To as O,_e as P,ci as Q,Ro as R,ge as S,ri as T,Mo as U,no as V,ra as W,ko as X,Co as Y,Lo as Z,di as _,na as a,Ao as a0,Ce as a1,xo as a2,ui as a3,be as a4,Se as a5,wo as a6,yo as a7,so as a8,ro as a9,ea as aa,S as ab,Dt as ac,Yi as ad,De as ae,Ki as af,Xi as ag,Uo as ah,Ii as ai,go as aj,J as ak,B as al,_o as am,we as b,Z as c,fa as d,et as e,Y as f,Fo as g,fo as h,ua as i,Eo as j,Ue as k,po as l,vo as m,ho as n,co as o,uo as p,Ft as q,ni as r,Ui as s,bo as t,ma as u,ga as v,So as w,la as x,va as y,P as z};
