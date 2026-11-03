import{bZ as _t,b_ as Ut,b$ as Ht,c0 as Wt}from"./forest-BPNIGMQq.js";import{K as x,V as F,_ as T,ba as Ot,ca as Nt,af as fe,o as U,ab as ke,cb as $e,u as I,x as Re,ag as lt,cc as It,cd as qt,a4 as De,S as _,r as $t,l as ve,R as ut,ac as ht,q as ct,k as me,ad as Be,H as se,ae as Bt,a2 as dt,aD as je,aE as Ke,ao as jt,a7 as Kt,a5 as ft,e as Ge,av as Jt,I as gt,as as mt,ce as Je,A as Vt,a0 as Yt,g as Xt,ak as Zt}from"./chartView-B0KDtkUS.js";import{n as Qt,H as vt}from"./linkParams-DtQVWAn8.js";import{c as X,a as pt,b as wt,d as yt}from"./playerSettings-C9BoDGSd.js";import"./generator-avZzDr7h.js";import{h as Q}from"./witch-DT_Ne75G.js";import"./housePieces-BEOVlqof.js";const Y=24,Ce=4,M={uLandscapeTrip:Ot,uAmb:{value:new F},uUnlitDim:{value:1},uMoon:{value:new F},uMoonDir:{value:new F(-.45,.75,.5).normalize()},uMoonBeam:{value:new F},uMoonUp:{value:new x},uShafts:{value:.3},uShaftScale:{value:1},uGlowPos:{value:new F},uGlowRgb:{value:new F},uGlowR:{value:8},uGlowFalloff:{value:2.5},uGlowNear:{value:1},uGlowPower:{value:1.4},uGlowDim:{value:1},uHazeCentre:{value:new T},uHazeRange:{value:new T(70,200)},uHazeColour:{value:new F},uTime:{value:0},uLightPos:{value:Array.from({length:Y},()=>new x)},uLightCol:{value:Array.from({length:Y},()=>new x)},uLightCount:{value:0},uLightKnee:{value:new T(.9,1.1)},uGlade:{value:Array.from({length:Ce},()=>new x)},uGladeCount:{value:0},uGladeRgb:{value:new F},uGladeLight:{value:new T},uDim:{value:1},uSlow:{value:new x},uSlowKeep:{value:new x},uRealTime:{value:0},uMirrorMoon:{value:new F},uDisco:{value:new x},uDiscoParams:{value:new x},uContourDream:{value:new F(0,1.5,.12)},uDiscoColour:{value:new F(1,1,1)},uScenery:{value:new T(1e6,1)},uCanopyReach:{value:0},uPartyOver:{value:new x(0,0,0,30)}},ea=.95,ta=.55,aa=.16;function fr(a,e,t,i=1,r=2.5,o=1){const n=(s,l)=>new F(s[0]/255*l,s[1]/255*l,s[2]/255*l);M.uAmb.value.copy(n(Q(a.ambientHue,.55,1),a.ambient*i)),M.uMoon.value.copy(n(Q(a.moonHue,a.moonSat??.35,1),a.moon*o)),M.uMoonBeam.value.copy(n(Q(a.moonHue,.35,1),a.shafts*.25)),M.uShafts.value=a.shafts,M.uShaftScale.value=t*2,M.uGlowRgb.value.copy(n(Q(a.glowHue,a.glowSat,1),1)),M.uGlowR.value=e,M.uGlowFalloff.value=r,M.uGlowPower.value=a.glowPower,M.uHazeColour.value.copy(n(Q(a.ambientHue-.08,.55,1),.16*Math.sqrt(i)))}const _e=`
${Nt}
uniform vec3 uAmb, uMoon, uMoonDir, uMoonBeam, uGlowPos, uGlowRgb;
uniform float uUnlitDim;
uniform vec4 uMoonUp;
uniform float uShafts, uShaftScale, uGlowR, uGlowFalloff, uGlowNear, uGlowPower, uGlowDim, uTime;
uniform vec2 uHazeCentre, uHazeRange;
uniform vec3 uHazeColour;
uniform vec4 uLightPos[${Y}], uLightCol[${Y}];
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
  for (int i = 0; i < ${Y}; i++) {
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
  vec3 warm = max(min(dot(col, Y), ${ta.toFixed(3)}), ${aa.toFixed(3)} * fall) * uGlowRgb / max(1e-3, dot(uGlowRgb, Y));
  return mix(col, min(vec3(1.0), warm), ${ea.toFixed(2)} * fall);
}
`,ia=4,ne=9,O={uHiz:{value:null},uHizOn:{value:0},uHizSize:{value:new T(1,1)},uHizLevels:{value:0},uHizAt:{value:Array.from({length:ne},()=>new x)}},ra=`
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
}`,sa="varying vec2 vUv; void main() { vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }",oa="uniform sampler2D uSrc; void main() { gl_FragColor = vec4(texelFetch(uSrc, ivec2(gl_FragCoord.xy), 0).r, 0.0, 0.0, 1.0); }",na=`
uniform sampler2D uSrc; uniform vec2 uSrcSize;
void main() {
  ivec2 p = ivec2(gl_FragCoord.xy) * 2, m = ivec2(uSrcSize) - 1;
  float d = 0.0;
  for (int j = 0; j < 3; j++) for (int i = 0; i < 3; i++) {
    if ((i == 2 && p.x + 2 != m.x) || (j == 2 && p.y + 2 != m.y)) continue;
    d = max(d, texelFetch(uSrc, min(p + ivec2(i, j), m), 0).r);
  }
  gl_FragColor = vec4(d, 0.0, 0.0, 1.0);
}`,la="uniform sampler2D uSrc; uniform vec2 uAt; void main() { gl_FragColor = texelFetch(uSrc, ivec2(gl_FragCoord.xy - uAt), 0); }";class gr{depth=new fe(1,1,{depthBuffer:!0,stencilBuffer:!1});levels=[];atlas=new fe(1,1,{type:$e,format:ke,minFilter:U,magFilter:U,depthBuffer:!1});quad=new I(new Re(2,2));cam=new lt(-1,1,1,-1,0,1);copy;reduce;place;size={w:0,h:0};ok;constructor(e){this.depth.depthTexture=new It(1,1,qt);const t=(i,r)=>new _({vertexShader:sa,fragmentShader:i,uniforms:r,depthTest:!1,depthWrite:!1});this.copy=t(oa,{uSrc:{value:null}}),this.reduce=t(na,{uSrc:{value:null},uSrcSize:{value:new T}}),this.place=t(la,{uSrc:{value:null},uAt:{value:new T}}),this.quad.frustumCulled=!1,this.ok=e.capabilities.isWebGL2&&!!e.extensions.get("EXT_color_buffer_float")}resize(e,t){if(e===this.size.w&&t===this.size.h)return;this.size={w:e,h:t},this.depth.setSize(e,t);for(const l of this.levels)l.dispose();this.levels=[];let i=e,r=t,o=0,n=0;const s=O.uHizAt.value;for(;n<ne;n++){const l=new fe(i,r,{type:$e,format:ke,minFilter:U,magFilter:U,depthBuffer:!1});if(this.levels.push(l),s[n].set(n===0?0:e,n===0?0:o,i,r),n>0&&(o+=r),i<=2&&r<=2){n++;break}i=Math.max(1,Math.ceil(i/2)),r=Math.max(1,Math.ceil(r/2))}for(let l=n;l<ne;l++)s[l].set(0,0,0,0);O.uHizLevels.value=n,this.atlas.setSize(e+Math.ceil(e/2),Math.max(t,o)),O.uHizSize.value.set(e,t)}render(e,t,i,r,o,n){if(O.uHizOn.value=0,!n||!this.ok||r<1||o<1)return;this.resize(r,o);const s=e,l=i.layers.mask,h=s.getRenderTarget(),u=s.autoClear,d=s.getClearColor(new De),f=s.getClearAlpha();i.layers.set(ia),s.setRenderTarget(this.depth),s.setClearColor(0,0),s.autoClear=!0,s.render(t,i),i.layers.mask=l;const m=(p,c)=>{this.quad.material=p,s.setRenderTarget(c),s.render(this.quad,this.cam)};this.copy.uniforms.uSrc.value=this.depth.depthTexture,m(this.copy,this.levels[0]);for(let p=1;p<this.levels.length;p++){const c=this.levels[p-1];this.reduce.uniforms.uSrc.value=c.texture,this.reduce.uniforms.uSrcSize.value.set(c.width,c.height),m(this.reduce,this.levels[p])}s.setRenderTarget(this.atlas),s.setClearColor(0,0),s.clear(),s.autoClear=!1;const w=O.uHizAt.value;this.levels.forEach((p,c)=>{const v=w[c];this.place.uniforms.uSrc.value=p.texture,this.place.uniforms.uAt.value.set(v.x,v.y),this.atlas.viewport.set(v.x,v.y,v.z,v.w),s.setRenderTarget(this.atlas),this.quad.material=this.place,s.render(this.quad,this.cam)}),this.atlas.viewport.set(0,0,this.atlas.width,this.atlas.height),s.autoClear=u,s.setClearColor(d,f),s.setRenderTarget(h),O.uHiz.value=this.atlas.texture,O.uHizOn.value=1}compile(e){return Promise.all([this.copy,this.reduce,this.place].map(t=>{const i=new I(this.quad.geometry,t);return i.frustumCulled=!1,e.compileAsync(i,this.cam)}))}dispose(){this.depth.dispose(),this.atlas.dispose();for(const e of this.levels)e.dispose();this.copy.dispose(),this.reduce.dispose(),this.place.dispose(),this.quad.geometry.dispose()}}const mr=`
float hash(vec2 p) { p = fract(p * vec2(123.34, 456.21)); p += dot(p, p + 45.32); return fract(p.x * p.y); }
float vnoise(vec2 p) {
  vec2 i = floor(p), f = fract(p), u = f * f * (3.0 - 2.0 * f);
  float a = hash(i), b = hash(i + vec2(1, 0)), c = hash(i + vec2(0, 1)), d = hash(i + vec2(1, 1));
  return a + (b - a) * u.x + (c - a) * u.y + (a - b - c + d) * u.x * u.y;
}
`,vr=`
float bayer2(vec2 a) { a = floor(a); return fract(a.x / 2.0 + a.y * a.y * 0.75); }
float bayer4(vec2 a) { return bayer2(0.5 * a) * 0.25 + bayer2(a); }
`,ua=`
float windGust(vec2 q) {
  vec2 i = floor(q), f = fract(q), e = f * f * (3.0 - 2.0 * f);
  float h00 = fract(sin(dot(i, vec2(127.1, 311.7))) * 43758.5453), h10 = fract(sin(dot(i + vec2(1, 0), vec2(127.1, 311.7))) * 43758.5453);
  float h01 = fract(sin(dot(i + vec2(0, 1), vec2(127.1, 311.7))) * 43758.5453), h11 = fract(sin(dot(i + vec2(1, 1), vec2(127.1, 311.7))) * 43758.5453);
  return mix(mix(h00, h10, e.x), mix(h01, h11, e.x), e.y);
}
`,Ue=`
vec2 pixelSnap(vec4 b) {
  vec2 ndc = b.xy / b.w, snapped = (floor((ndc * 0.5 + 0.5) * uRes) + 0.5) / uRes * 2.0 - 1.0;
  return snapped - ndc;
}
`,le=256;function ze(a){a.byteOffset%4&&(a=a.slice());const e=a.length>>2,t=new Uint32Array(a.buffer,a.byteOffset,e),i=new Uint8Array(e),r=new Map([[0,0]]),o=new Uint8Array(le*4);let n=0,s=0;for(let l=0;l<e;l++){const h=t[l];if(h!==n){let u=r.get(h);if(u===void 0){if(u=r.size,u>=le)return null;r.set(h,u),o.set(a.subarray(l*4,l*4+4),u*4)}n=h,s=u}i[l]=s}return{idx:i,pal:o}}const pr=(a,e,t,i)=>e?e[a[t]*4+i]:a[t*4+i],Ve=(a,e,t)=>t?a*e+le*4:a*e*4;function we(a,e,t){return a.getContext("2d").getImageData(0,0,e,t).data}const ha=(a,e=2048)=>$t(ca(a,e));function*ca(a,e=2048){const i=[],r=new Map;let o=0,n=0,s=0,l=1;for(const[p,c]of a.entries()){const v=r.get(c);if(v!==void 0){i.push(i[v]);continue}r.set(c,p),o+c.w+1>e&&(o=0,n+=s+1,s=0),i.push({x:o,y:n}),o+=c.w+1,s=Math.max(s,c.h),l=Math.max(l,o)}const h=Math.max(1,n+s),u=new Uint8Array(l*h*4),d=new Uint8Array(l*h*4),f=[];for(let p=0;p<a.length;p++){p&&p%4===0&&(yield);const c=a[p],v=r.get(c);if(v!==p){f.push(f[v]);continue}const C=i[p],g=we(c.A,c.w,c.h),P=we(c.N,c.w,c.h),L=c.S?we(c.S,c.w,c.h):null,H=L?Array.from({length:c.h},(z,k)=>Array.from({length:c.w},(G,E)=>L[(k*c.w+E)*4+1])):null;for(let z=0;z<c.h;z++){const k=z*c.w*4,G=((C.y+z)*l+C.x)*4;if(u.set(g.subarray(k,k+c.w*4),G),c.eyes)for(let E=0;E<c.w;E++)c.eyes[z*c.w+E]&&u[G+E*4+3]===255&&(u[G+E*4+3]=253);if(d.set(P.subarray(k,k+c.w*4),G),c.S){const E=H[z];for(let W=0;W<c.w;W++)d[G+W*4+3]&&(d[G+W*4+3]=E[W])}}let y=0;e:for(let z=c.h-1;z>=0;z--,y++)for(let k=0;k<c.w;k++)if(g[(z*c.w+k)*4+3]>=128)break e;let B=0;if(y<c.h){const z=c.h-1-y;for(let k=0;k<c.w;k++)g[(z*c.w+k)*4+3]>=128&&(B=Math.max(B,Math.abs(k+.5-c.w/2)+.5))}f.push({uv:[C.x/l,C.y/h,(C.x+c.w)/l,(C.y+c.h)/h],w:c.w,h:c.h,pad:Math.min(y,c.h),...B?{foot:B}:{},...c.S?{masked:!0}:{},...c.head?{head:c.head}:{}})}yield;const m=ze(u);yield;const w=ze(d);return{albedo:m?.idx??u,normal:w?.idx??d,albedoPal:m?.pal??null,normalPal:w?.pal??null,width:l,height:h,frames:f}}const xt={},bt=["baby","young","adult","legend"],Ye=new Map,wr=(a,e,t)=>`${bt[a]}-walk${e}${t?"-away":""}`;function yr(a,e){const t=`${a}/${e}`,i=xt[t];if(!i)return;let r=Ye.get(t);if(!r){const o=atob(i.px),n=new Uint8ClampedArray(o.length);for(let s=0;s<o.length;s++)n[s]=o.charCodeAt(s);Ye.set(t,r={w:i.w,h:i.h,rgba:n})}return r}const xr=(a,e)=>da.has(`${a}/${bt[e]}`),da=new Set(Object.keys(xt).map(a=>a.slice(0,a.indexOf("-"))));function fa(a){const e=new Uint8Array(2048);e.set(a.subarray(0,1024));for(let t=0;t<256;t++){const i=t*4,r=(a[i]*.3+a[i+1]*.55+a[i+2]*.15)/255;e.set([Math.round(90+r*150),Math.round(145+r*105),Math.round(180+r*75),a[i+3]],1024+i)}return e}let St=!1;function br(a){St=a}const ga=a=>{St||(a.image.data=null),a.onUpdate=null};function Pe(a,e,t,i=!1){const r=new ve(a,e,t,i?ke:ut,ht);return i&&(r.unpackAlignment=1),r.magFilter=U,r.minFilter=U,r.generateMipmaps=!1,r.flipY=!1,r.colorSpace=ct,r.needsUpdate=!0,r.onUpdate=ga,r}function Ft(a){const e=new ve(fa(a),le,2,ut,ht);return e.magFilter=e.minFilter=U,e.generateMipmaps=!1,e.flipY=!1,e.colorSpace=ct,e.needsUpdate=!0,e}let ma=null;const Ae=()=>ma??=Ft(new Uint8Array(le*4));function Sr(a,e,t,i){const r=ze(a),[o,n]=Le(r?.idx??a,r?.pal??null,e,t,i);return{tex:o,pal:n,indexed:!!r}}function Le(a,e,t,i,r){const o=me(Pe(a,t,i,!!e),r);if(!e)return[o,Ae()];const n=me(Ft(e),r);return o.addEventListener("dispose",()=>n.dispose()),[o,n]}function va(a,e="props"){const[t,i]=Le(a.albedo,a.albedoPal,a.width,a.height,e),[r,o]=Le(a.normal,a.normalPal,a.width,a.height,e);return{albedo:t,normal:r,albedoPal:i,normalPal:o,indexed:new T(a.albedoPal?1:0,a.normalPal?1:0),frames:a.frames}}function Fr(a){const e=n=>{const s=n.image;return[s?.width??0,s?.height??0]},[t,i]=e(a.albedo),[r,o]=e(a.normal);return Ve(t,i,a.indexed.x>.5)+Ve(r,o,a.indexed.y>.5)+(a.indexed.x>.5?1024:0)+(a.indexed.y>.5?1024:0)}const pa=(a="uAlbedo",e="uNormal")=>`
uniform sampler2D ${a}, ${e}, ${a}Pal, ${e}Pal;
uniform vec2 uIndexed;
vec4 albedoAt(vec2 q) { vec4 c = texture2D(${a}, q); return uIndexed.x > 0.5 ? texelFetch(${a}Pal, ivec2(int(c.r * 255.0 + 0.5), 0), 0) : c; }
vec4 normalAt(vec2 q) { vec4 c = texture2D(${e}, q); return uIndexed.y > 0.5 ? texelFetch(${e}Pal, ivec2(int(c.r * 255.0 + 0.5), 0), 0) : c; }
`,wa=(a,e="uAlbedo",t="uNormal")=>({[e]:{value:a.albedo},[t]:{value:a.normal},[e+"Pal"]:{value:a.albedoPal},[t+"Pal"]:{value:a.normalPal},uIndexed:{value:a.indexed}});function ya(a,e,t="uAlbedo",i="uNormal"){a[t].value=e.albedo,a[i].value=e.normal,a[t+"Pal"].value=e.albedoPal,a[i+"Pal"].value=e.normalPal,a.uIndexed.value=e.indexed}function kr(a){const e=new Uint8Array(4),t={uv:[0,0,0,0],w:1,h:1,pad:0};return{albedo:Pe(e,1,1),normal:Pe(new Uint8Array(4),1,1),albedoPal:Ae(),normalPal:Ae(),indexed:new T(0,0),frames:Array.from({length:a},()=>t),grounds:[]}}const Cr=(a,e=2048)=>va(ha(a,e));function xa(a){return{value:a?new x(1,a.lightFloor,a.lightTint,a.lightRim):new x}}const ba=`
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
  for (int i = 0; i < ${Y}; i++) {
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
`,Sa=3,Te={uCastMap:{value:null},uCastWin:{value:new x(0,0,1,0)}},Fa=`
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
`;class zr{constructor(e=160,t=1024){this.size=e,this.res=t,this.rt=new fe(t,t,{minFilter:Be,magFilter:Be,depthBuffer:!1,stencilBuffer:!1,generateMipmaps:!1});const i=e/2;this.cam=new lt(-i,i,i,-i,1,2e3),this.cam.up.set(0,0,-1),this.cam.layers.set(Sa),Te.uCastMap.value=this.rt.texture}size;res;rt;cam;clear=new De;render(e,t,i,r,o){const n=Te.uCastWin.value;if(!o){n.w=0;return}const s=this.size/this.res,l=Math.round(i/s)*s,h=Math.round(r/s)*s;this.cam.position.set(l,1e3,h),this.cam.lookAt(l,0,h),this.cam.updateMatrixWorld();const u=se.uBend.value.x,d=t.background,f=e.getRenderTarget(),m=e.getClearAlpha();e.getClearColor(this.clear),se.uBend.value.x=0,t.background=null,e.setRenderTarget(this.rt),e.setClearColor(16777215,1),e.clear(!0,!1,!1),e.render(t,this.cam),e.setRenderTarget(f),e.setClearColor(this.clear,m),t.background=d,se.uBend.value.x=u,n.set(l-this.size/2,h+this.size/2,this.size,1)}dispose(){this.rt.dispose()}}class R{lo=1/0;hi=-1;range={start:0,count:0};touch(e){e<this.lo&&(this.lo=e),e>this.hi&&(this.hi=e)}flush(e){if(this.hi>=this.lo){const t=e.itemSize,i=this.range,r=e.updateRanges[0];let o=this.lo*t,n=(this.hi+1)*t;r&&(o=Math.min(r.start,o),n=Math.max(r.start+r.count,n),e.clearUpdateRanges()),i.start=o,i.count=n-o,e.updateRanges.push(i),e.needsUpdate=!0}this.lo=1/0,this.hi=-1}}const ka={ramp:["#49141e","#b43216","#ff7826","#fff0af"],contrast:"#77bbee",motion:0,imprint:"scorch",sound:"fire"},Ca={ramp:["#163b64","#397cbb","#9dd8ed","#f0fbff"],contrast:"#ffffff",motion:1,imprint:"frost",sound:"ice"},za={ramp:["#193116","#467d23","#a7d73a","#f1fac1"],contrast:"#a366bb",motion:2,imprint:"wet",sound:"water"},Pa={ramp:["#302749","#7774b8","#c4c3eb","#f6efff"],contrast:"#94cfed",motion:3,imprint:"charge",sound:"light"},Aa={ramp:["#22254e","#525fbd","#91c3f1","#f2faff"],contrast:"#e6bf78",motion:4,imprint:"charge",sound:"storm"},La={ramp:["#30221d","#81532d","#ce9b55","#f3d9a4"],contrast:"#95b88b",motion:5,imprint:"push",sound:"earth"},Ta={ramp:["#20192f","#674878","#b289c1","#f1d8f5"],contrast:"#b9a2d3",motion:6,imprint:"scorch",sound:"void"},Ma={ramp:["#273426","#518551","#d895b6","#f6dddc"],contrast:"#b1d97d",motion:7,imprint:"bloom",sound:"nature"},Ea={ramp:["#173646","#28799c","#6fc9db","#dbf6ee"],contrast:"#b5dce5",motion:2,imprint:"wet",sound:"water"},Ra={ramp:["#41302c","#9b7142","#dcb67a","#f4e1b2"],contrast:"#bba38c",motion:5,imprint:"push",sound:"earth"},Da={ramp:["#233025","#536542","#a1a66a","#e2d7a6"],contrast:"#c6a26f",motion:7,imprint:"bloom",sound:"nature"},Ga={ramp:["#283c41","#629298","#abd1cf","#edf2da"],contrast:"#e0d8b1",motion:3,imprint:"push",sound:"wind"},_a={ramp:["#352239","#a65879","#dfad66","#fff0c2"],contrast:"#e598bb",motion:7,imprint:"bloom",sound:"party"},Ua={ramp:["#4a3a6a","#d0c8f0","#f4f0ff","#ffffff"],contrast:"#ffe9a8",motion:3,imprint:"bloom",sound:"light"},Ha={ramp:["#4a2c06","#c08414","#ffd23c","#fff7c8"],contrast:"#fffbe8",motion:3,imprint:"charge",sound:"light"},$={fire:ka,frost:Ca,venom:za,moonlight:Pa,storm:Aa,earth:La,shadow:Ta,bloom:Ma,water:Ea,sand:Ra,wood:Da,wind:Ga,party:_a,rainbow:Ua,gold:Ha},Wa={id:0,size:1.7,ground:!1},Oa={id:1,size:4,ground:!1},Na={id:2,size:1.1,ground:!1},Ia={id:3,size:2,ground:!0},qa={id:4,size:3.2,ground:!1},$a={id:5,size:9,ground:!1},Ba={id:6,size:5,ground:!1},ja={id:7,size:6,ground:!1},Ka={id:8,size:2,ground:!0},Ja={id:9,size:5,ground:!1},Va={id:10,size:2.2,ground:!1},Ya={id:11,size:1.1,ground:!1},N={projectile:Wa,burst:Oa,beam:Na,zone:Ia,aura:qa,pillar:$a,vortex:Ba,dome:ja,trap:Ka,eruption:Ja,lob:Va,trail:Ya},Xa=[.25,.45,.65,1],Za=[.6,1.4],Qa=[.08,.25],ei=.5,ti=6,ai=.2,ii=[6,18],ri=[.2,.85],si=128,oi=200,ni=5,li=256,ui=2048,b={levels:Xa,size:Za,halo:Qa,secondaryAt:ei,lightCap:ti,lightEase:ai,lightReach:ii,lightStrength:ri,fieldSize:si,fieldMetres:oi,imprintSeconds:ni,pool:li,instances:ui},Xe=["frost","scorch","wet","bloom","charge","push"],q=Object.keys($),Ze=Object.keys(N),ye=a=>b.levels[Math.max(0,Math.min(3,Math.round(a)))]??.65,he=(a,e)=>a[0]+(a[1]-a[0])*Math.max(0,Math.min(1,e));function ee(a){return Object.hasOwn($,a)?a:"moonlight"}function xe(a,e,t,i,r){return Math.max(0,t)/(1+Math.hypot(a-i,e-r)/12)}class hi{constructor(e=b.fieldSize,t=b.fieldMetres){this.size=e,this.metres=t,this.data=new Uint8Array(e*e*8),this.values=new Float32Array(this.data.length),this.cell=t/e}size;metres;data;values;x=0;z=0;cell;ready=!1;index(e,t){return((t%this.size+this.size)%this.size*this.size+(e%this.size+this.size)%this.size)*8}move(e,t){const i=Math.floor(e/this.cell)-this.size/2,r=Math.floor(t/this.cell)-this.size/2;if(!(this.ready&&i===this.x&&r===this.z)){for(let o=r;o<r+this.size;o++)for(let n=i;n<i+this.size;n++)if(!this.ready||n<this.x||n>=this.x+this.size||o<this.z||o>=this.z+this.size){const s=this.index(n,o);this.values.fill(0,s,s+8),this.data.fill(0,s,s+8)}this.x=i,this.z=r,this.ready=!0}}decay(e){const t=Math.max(0,e)*255/b.imprintSeconds;if(t)for(let i=0;i<this.values.length;i++)this.values[i]=Math.max(0,this.values[i]-t)}stamp(e,t,i,r,o){const n=Xe.indexOf(r);if(n<0||!(i>0)||!this.ready)return;const s=Math.max(this.x,Math.floor((e-i)/this.cell)),l=Math.min(this.x+this.size-1,Math.floor((e+i)/this.cell)),h=Math.max(this.z,Math.floor((t-i)/this.cell)),u=Math.min(this.z+this.size-1,Math.floor((t+i)/this.cell));for(let d=h;d<=u;d++)for(let f=s;f<=l;f++){const m=Math.hypot((f+.5)*this.cell-e,(d+.5)*this.cell-t),w=Math.max(0,1-m/i)*Math.min(1,Math.max(0,o))*255,p=this.index(f,d)+n;this.values[p]=Math.max(this.values[p],w)}}publish(){for(let e=0;e<this.data.length;e++)this.data[e]=Math.round(this.values[e])}at(e,t,i){const r=Math.floor(e/this.cell),o=Math.floor(t/this.cell);return r<this.x||r>=this.x+this.size||o<this.z||o>=this.z+this.size?0:this.values[this.index(r,o)+Xe.indexOf(i)]/255}reset(){this.values.fill(0),this.data.fill(0),this.ready=!1}}const Qe=()=>{const a=me(new ve(new Uint8Array(b.fieldSize**2*4),b.fieldSize,b.fieldSize),"fx");return a.minFilter=a.magFilter=U,a.wrapS=a.wrapT=Bt,a.generateMipmaps=!1,a.needsUpdate=!0,a},D={uFxField:{value:Qe()},uFxExtra:{value:Qe()},uFxBox:{value:new x(0,0,b.fieldMetres,b.fieldSize)},uFxOn:{value:0},uFxTime:{value:0},uFxCalm:{value:0},uFxVertex:{value:1}},kt=`
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
`;function Pr(a,e=!1){return a.asleep?.18:a.leashed||a.friendly||a.state==="happy"?.28:e||a.charge||a.leap?1:a.enraged||a.state==="enraged"?.8:.42}const ci={uThermalStrength:{value:0},uThermalColdBrightness:{value:.35},uThermalDangerGain:{value:1}},di=`
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
`;function Ar(a){return 1/(a.artPixelsPerMetre*(2/a.pixelSize))}const ge={...ci,uPotionSky:{value:0},uPoolReadability:{value:new URLSearchParams(globalThis.location?.search??"").get("poolreadability")==="1"?1:0},uMoodRim:{value:new x},uRimInset:{value:0},uWitchGlow:{value:0},uWitchLift:{value:0},uRight:{value:new F(1,0,0)},uUp:{value:new F(0,1,0)},uFacing:{value:new F(0,0,1)},uTopFade:{value:0},uCutout:{value:new x(0,0,0,1)},uCutWhole:{value:0},uCutShape:{value:new x(0,.35,0,.2)},uDebugCull:{value:0},uRes:{value:new T(1,1)},uWitch:{value:new x(0,0,0,0)},uWitchDepth:{value:0},uOcc:{value:new x(.38,6,2.5,1)},uNearCut:{value:0},uCircleBox:{value:new x(0,0,0,0)},uCircleFade:{value:new x(0,0,1,1)},uEdgeDither:{value:0},uHoleHard:{value:0},uCircleKeep:{value:new x(0,0,0,0)},uWholeCull:{value:typeof location<"u"&&new URLSearchParams(location.search).get("wholecull")==="0"?0:1},uParty:{value:Array.from({length:16},()=>new x)},uPartyCol:{value:Array.from({length:16},()=>new F)},uPartyCount:{value:0},uUplight:{value:new x},uTrunkFade:{value:new F(0,.125,.3)},uFindLook:{value:new x},uEyeRgb:{value:new F(1,.8,.35)},uEyeRange:{value:40},uTrunkLook:{value:new T(.8,.5)},uAreaAvg:{value:1},uSeeDepth:{value:1},uSeeDbg:{value:new x(1,0,1,0)},uCullByPass:{value:new URLSearchParams(globalThis.location?.search??"").get("cullpass")==="0"?0:1},uCullDbg:{value:7},uSeeEarly:{value:1},uSeeTwo:{value:1},uSeeDither:{value:0},uSeeShowA:{value:0},uSeeSolid:{value:0},uDebugTrunks:{value:0},uWind:{value:new x(0,0,1,0)},uLeafJitter:{value:new F(0,0,0)},uWatch:{value:new x(0,0,9,0)}},te=`
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
${ua}${Ue}${ra}
${kt}
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
  vFlags.z = mod(iFlags.z, 2.0); vSmall = mod(floor(iFlags.z / 2.0), 2.0);
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
`,fi=`
${pa()}
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
${di}
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
${_e}
${kt}
varying vec2 vFxBase;
varying vec4 vFxPaint;
varying vec2 vFxInfo;
${Fa}
${ba}
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
  vec4 n = normalAt(uvS);
  if (areaOn) n = areaAvg(true, uvS, n);
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
`,ae=fi.replace("void main() {","void spriteMain() {")+`
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
`,gi=-.5;function Lr(a){for(const e of a.meshes)e.renderOrder=gi,e.material.depthWrite=!1;return a}const be=[],Se=[],mi={value:new x(1,.85,.35,0)};class Tr{constructor(e,t,i={}){this.atlas=e,this.metresPerPixel=t;const r=new Re(1,1);r.translate(0,.5,0),this.geo=new dt,this.geo.index=r.index,this.geo.setAttribute("position",r.getAttribute("position")),this.geo.setAttribute("uv",r.getAttribute("uv")),this.pos=this.size=this.uvs=this.flags=this.glow=void 0,this.grow(64);const o=h=>({...M,...ge,...se,...O,...wa(e),uUnlit:{value:i.unlit?1:0},uIsScenery:{value:i.scenery?1:0},uAppear:this.appearU,uArrivalFade:this.arrivalFade,uFadePass:{value:0},uHasFade:{value:i.fade?1:0},uFlat:{value:i.flat||i.solid?1:0},uLies:{value:i.flat?1:0},...Te,uSilhouette:{value:new x(0,0,0,0)},uWitchLight:xa(i.witchLight),uFind:{value:i.find?1:0},uRimOn:{value:i.rim?1:0},uTint:i.tint??{value:new x(0,0,0,0)},uShadow:i.shadow?mi:{value:new x(0,0,0,0)},uLegend:{value:i.legend??new x(0,0,0,0)},uSteps:{value:i.steps??0},uLegendFloor:{value:i.legendFloor??0},uLegendAwake:{value:i.legendAwake??0},uGlowGain:i.glowGain??{value:1},uAbsolute:{value:i.absolute?1:0},uLie:{value:i.lie??0},uLean:this.leanU,...h}),n=i.scenery?{blending:ft,blendSrc:Kt,blendDst:jt}:{},s=i.scenery?{stencilWrite:!0,stencilRef:1,stencilFunc:Ke,stencilZPass:je}:i.unmark?{stencilWrite:!0,stencilRef:0,stencilFunc:Ke,stencilZPass:je}:{},l=new _({vertexShader:te,fragmentShader:ae,defines:i.spotSpill?{MUSHROOM_SPOT_SPILL:1}:{},uniforms:o({}),depthTest:!i.onTop,depthWrite:!i.onTop&&!i.shadow,...n,...s,...i.shadow?{transparent:!0}:{}});if(this.mesh=new I(this.geo,l),this.mesh.frustumCulled=!1,i.onTop&&(this.mesh.renderOrder=10),i.scenery&&(this.mesh.renderOrder=.5),this.meshes=[this.mesh],i.fade){const h=new I(this.geo,new _({vertexShader:te,fragmentShader:ae,uniforms:o({uFadePass:{value:1}}),transparent:!0,depthWrite:!1})),u=new I(this.geo,new _({vertexShader:te,fragmentShader:ae,uniforms:o({uFadePass:{value:3}}),transparent:!0,depthWrite:!0}));u.frustumCulled=!1,u.renderOrder=10.9,h.frustumCulled=!1,h.renderOrder=11,i.scenery&&Object.assign(h.material,s,{stencilWrite:!1}),be.push(h.material),Se.push(h);const d=new I(this.geo,new _({vertexShader:te,fragmentShader:ae,uniforms:o({uFadePass:{value:2}}),transparent:!0,colorWrite:!1,depthWrite:!0}));d.frustumCulled=!1,d.renderOrder=19.9,typeof location<"u"&&new URLSearchParams(location.search).get("seedepth")==="off"&&(d.material.depthWrite=!1),this.meshes.push(h,d,u)}if(i.silhouette){const h=i.silhouette.colour,u=new I(this.geo,new _({vertexShader:te,fragmentShader:ae,uniforms:o({uSilhouette:{value:new x(h.x,h.y,h.z,i.silhouette.opacity)}}),transparent:!0,depthWrite:!1,depthFunc:Jt}));u.frustumCulled=!1,u.renderOrder=12,this.meshes.push(u),this.sil=u}for(const h of this.meshes)Object.assign(h.material.uniforms,D)}atlas;metresPerPixel;mesh;meshes;geo;pos;size;uvs;flags;glow;jitter;capacity=0;dirty=[new R,new R,new R,new R,new R,new R];count=0;name(e){return this.meshes.forEach((t,i)=>{t.name=i===0?e:`${e} (${i===1&&this.meshes.length>1&&t!==this.sil?"see-through":"silhouette"})`}),this}setAtlas(e){this.atlas=e;for(const t of this.meshes)ya(t.material.uniforms,e)}sil=null;set silhouette(e){this.sil&&(this.sil.visible=e)}set silhouetteColour(e){const t=this.sil&&this.sil.material.uniforms.uSilhouette.value;t&&t.set(e.x,e.y,e.z,t.w)}set silhouetteOpacity(e){const t=this.sil&&this.sil.material.uniforms.uSilhouette.value;t&&(t.w=e)}grow(e){const t=Math.max(e,this.capacity*2);this.geo.dispose();const i=(r,o)=>{const n=new gt(new Float32Array(t*r),r);return n.setUsage(mt),o&&n.array.set(o.array),n};this.pos=i(3,this.pos),this.size=i(3,this.size),this.uvs=i(4,this.uvs),this.flags=i(4,this.flags),this.glow=i(1,this.glow),this.jitter=i(3,this.jitter),this.geo.setAttribute("iPos",this.pos),this.geo.setAttribute("iSize",this.size),this.geo.setAttribute("iUv",this.uvs),this.geo.setAttribute("iFlags",this.flags),this.geo.setAttribute("iGlow",this.glow),this.geo.setAttribute("iJitter",this.jitter),this.capacity=t}leanU={value:new x};appearU={value:1};arrivalFade={value:1};items=[];set(e){this.items=e,e.length>this.capacity&&this.grow(e.length);const t=this.pos.array,i=this.size.array,r=this.uvs.array,o=this.flags.array,n=this.glow.array,s=this.jitter.array,l=this.dirty[0],h=this.dirty[1],u=this.dirty[2],d=this.dirty[3],f=this.dirty[4],m=this.dirty[5],w=this.metresPerPixel;for(let v=0,C=e.length;v<C;v++){const g=e[v],P=g.frame,L=P.uv,H=g.scale??1;let y=v*3;(t[y]!==g.x||t[y+1]!==g.y||t[y+2]!==g.z)&&(t[y]=g.x,t[y+1]=g.y,t[y+2]=g.z,l.touch(v));const B=(g.sx===void 0?P.w:Math.max(1,Math.round(P.w*g.sx)))*w*H,z=(g.sy===void 0?P.h:Math.max(1,Math.round(P.h*g.sy)))*w*H,k=(g.foot??(g.top?0:P.foot??0))*w*H*(g.sx??1);y=v*3,(i[y]!==B||i[y+1]!==z||i[y+2]!==k)&&(i[y]=B,i[y+1]=z,i[y+2]=k,h.touch(v)),y=v*4,(r[y]!==L[0]||r[y+1]!==L[1]||r[y+2]!==L[2]||r[y+3]!==L[3])&&(r[y]=L[0],r[y+1]=L[1],r[y+2]=L[2],r[y+3]=L[3],u.touch(v));const G=g.flip?1:0,E=g.top?1:g.cut?-g.cut:0,W=(g.fresh?1:0)+(g.small?2:0)+(g.tree?4:0),We=(P.masked?-1:1)*(g.sway??0);(o[y]!==G||o[y+1]!==E||o[y+2]!==W||o[y+3]!==We)&&(o[y]=G,o[y+1]=E,o[y+2]=W,o[y+3]=We,d.touch(v));const Oe=g.glow??0;n[v]!==Oe&&(n[v]=Oe,f.touch(v));const ue=g.jitter,Ne=ue?ue[0]:0,Ie=ue?ue[1]:0,qe=g.heat??0;y=v*3,(s[y]!==Ne||s[y+1]!==Ie||s[y+2]!==qe)&&(s[y]=Ne,s[y+1]=Ie,s[y+2]=qe,m.touch(v))}l.flush(this.pos),h.flush(this.size),u.flush(this.uvs),d.flush(this.flags),f.flush(this.glow),m.flush(this.jitter),this.count=e.length,this.geo.instanceCount=e.length;const p=this.meshes,c=e.length>0;for(let v=0;v<p.length;v++)p[v].visible=c}get dropped(){const e=this.geo._maxInstanceCount;return e===void 0||!this.mesh.visible?0:Math.max(0,this.count-e)}release(){this.geo.dispose();for(const e of this.meshes){e.material.dispose();const t=Se.indexOf(e);t>=0&&(Se.splice(t,1),be.splice(be.indexOf(e.material),1))}}dispose(){this.release(),this.atlas.albedo.dispose(),this.atlas.normal.dispose()}}const Mr=[.91,.71,.42],Er=[.85,.47,.62],Rr=[[.91,.71,.42],[.82,.52,.28],[.91,.71,.42]],Dr=1.4,et=32,Z=16,Ct=Z*Z-1,vi=Ct-1,Gr=(a,e,t=.8)=>Math.min(1,Math.max(0,(a-e)/t)),pi=3,_r=10,Ur=a=>a.level>=pi,Hr=`
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
${Ue}
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
}`,Wr=`
uniform sampler2D uGlyphs, uGlyphsPal;
uniform float uGlyphIdx; // 1: uGlyphs is an index plane, its colours in uGlyphsPal (render/palette.ts; the attack look's atlas)
uniform float uSolid;
uniform float uRgb; // the texture's own colours, times the instance's (the attack look's atlas: render/leash/attackLook.ts); else its colour alone
varying vec2 vUv, vP;
varying vec4 vCol;
varying float vDraw, vShine;
varying vec3 vWorld;
varying float vPix, vN;
${_e}
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
}`;function Or(a){return new _({vertexShader:a.vertexShader,fragmentShader:a.fragmentShader,uniforms:a.uniforms,defines:{MASK:""},transparent:!0,depthWrite:!1,depthTest:!1,blending:ft,blendEquation:Je,blendEquationAlpha:Je})}const wi=["iPos","iSize","iUv","iCol","iDraw","iShine"];function yi(a){const e=t=>a[0]===t%Z/Z&&a[1]===1-Math.floor(t/Z)/Z;return!(a[0]===0&&a[1]===1)&&!e(Ct)&&!e(vi)}class xi{mesh;glyphGain=1;geo=new dt;cap=0;n=0;dirty=[new R,new R,new R,new R,new R,new R];pos;size;uv;col;draw;shine;constructor(e){const t=new Re(1,1);this.geo.index=t.index,this.geo.setAttribute("position",t.getAttribute("position")),this.geo.setAttribute("uv",t.getAttribute("uv")),this.grow(256),this.mesh=new I(this.geo,e),this.mesh.frustumCulled=!1,this.mesh.renderOrder=3}grow(e){const t=(r,o)=>{const n=new Float32Array(e*o);return r&&n.set(r),n};this.pos=t(this.pos,3),this.size=t(this.size,1),this.uv=t(this.uv,4),this.col=t(this.col,4),this.draw=t(this.draw,1),this.shine=t(this.shine,1),this.cap=e,this.geo.dispose();const i=(r,o,n)=>this.geo.setAttribute(r,new gt(o,n).setUsage(mt));i("iPos",this.pos,3),i("iSize",this.size,1),i("iUv",this.uv,4),i("iCol",this.col,4),i("iDraw",this.draw,1),i("iShine",this.shine,1)}begin(){this.n=0}add(e,t,i,r,o,n,s,l,h,u=1,d=!1,f=0){this.n>=this.cap&&this.grow(this.cap*2),this.glyphGain!==1&&yi(o)&&(n*=this.glyphGain,s*=this.glyphGain,l*=this.glyphGain);const m=this.n++,w=this.pos,p=this.uv,c=this.col,v=this.dirty,C=u+(d?2:0);let g=m*3;(w[g]!==e||w[g+1]!==t||w[g+2]!==i)&&(w[g]=e,w[g+1]=t,w[g+2]=i,v[0].touch(m)),this.size[m]!==r&&(this.size[m]=r,v[1].touch(m)),g=m*4,(p[g]!==o[0]||p[g+1]!==o[1]||p[g+2]!==o[2]||p[g+3]!==o[3])&&(p[g]=o[0],p[g+1]=o[1],p[g+2]=o[2],p[g+3]=o[3],v[2].touch(m)),(c[g]!==n||c[g+1]!==s||c[g+2]!==l||c[g+3]!==h)&&(c[g]=n,c[g+1]=s,c[g+2]=l,c[g+3]=h,v[3].touch(m)),this.draw[m]!==C&&(this.draw[m]=C,v[4].touch(m)),this.shine[m]!==f&&(this.shine[m]=f,v[5].touch(m))}end(){this.geo.instanceCount=this.n,wi.forEach((e,t)=>this.dirty[t].flush(this.geo.getAttribute(e)))}}const S=[{id:"full",label:"full quality",when:"live",built:!0},{id:"farDither",label:"the forest's far edge dithered, not faded",when:"live",built:!0},{id:"density90",label:"trees ×0.9",when:"load",built:!0},{id:"blend40",label:"area borders blend over 40 m",when:"load",built:!1},{id:"squeeze",label:"tall trees squeezed",when:"live",built:!0},{id:"still",label:"leaves still, no trunk shadows",when:"live",built:!0},{id:"hardCut",label:"the cut-away's crowns solid",when:"live",built:!0},{id:"fxDistort",label:"magic shimmer off",when:"live",built:!0},{id:"fxImprints",label:"temporary magic scenery marks off",when:"live",built:!0},{id:"fxSecondary",label:"magic secondary detail off",when:"live",built:!0},{id:"fxLights",label:"at most two magic lights",when:"live",built:!0},{id:"fxParticles",label:"half the magic particles",when:"live",built:!0},{id:"density80",label:"trees ×0.8",when:"load",built:!0},{id:"cap30",label:"a steady 30 fps",when:"live",built:!0},{id:"px4",label:"chunkier pixels (px 4)",when:"load",built:!0}];function bi(a){const e=t=>{const i=S.findIndex(r=>r.id===t);return S[i].built&&i<=a};return{density:e("density80")?.8:e("density90")?.9:1,blend:e("blend40")?40:null,px:e("px4")?4:null}}const zt={over:.9,under:.7,downAfter:3,upAfter:10,settle:2,flips:3,flipWindow:60,fit:.85,retry:60,retryMax:480,missed:1.25,kept:1.1},Fe=(a=0,e="auto")=>{const t=pe(a);return{rung:t,loaded:t,mode:e,slow:0,roomy:0,since:0,last:-1/0,dir:0,reversals:[],locked:!1,cost:S.map(()=>NaN),left:S.map(()=>0),leftAt:S.map(()=>NaN),t:0}},pe=a=>Math.max(0,Math.min(S.length-1,Math.round(Number.isFinite(a)?a:0)));function ce(a,e){const t=S[e];return!t?.built||e===0?!1:t.when==="live"?e<=a.rung:e<=a.loaded}function Si(a){const e=[],t=[];return S.forEach((i,r)=>{i.when!=="load"||!i.built||(r<=a.rung&&r>a.loaded&&e.push(r),r>a.rung&&r<=a.loaded&&t.push(r))}),{adds:e,drops:t}}function Fi(a){for(let e=a.rung+1;e<S.length;e++)if(S[e].built&&S[e].when==="live")return e;for(let e=S.length-1;e>a.rung;e--)if(S[e].built)return e;return-1}function ki(a){for(let e=a.rung;e>0;e--)if(S[e].built&&S[e].when==="live")return e-1;return a.rung>0?0:-1}function Ci(a,e,t,i=1,r=!1,o=zt,n=!0){const s={...a,t:a.t+i,since:a.since+i,cost:a.cost.slice(),reversals:a.reversals.filter(u=>a.t+i-u<=o.flipWindow)};if(s.mode!=="auto")return s;if(r)return{...s,since:0,slow:0};if(!(e>0)||!(t>0)||s.since<=o.settle)return s;const l=s.cost[s.rung];s.cost[s.rung]=Number.isFinite(l)?l+(e-l)*.3:e,s.slow=e>t*(n?o.over:o.missed)?s.slow+1:0,s.roomy=e<t*(n?o.under:o.kept)?s.roomy+i:0;const h=(u,d)=>{s.dir&&d!==s.dir&&s.t-s.last<=o.flipWindow&&s.reversals.push(s.t);const f=s.locked||s.reversals.length>=o.flips,m=s.left.slice(),w=s.leftAt.slice();return d<0&&(m[s.rung]++,w[s.rung]=s.t),{...s,rung:u,dir:d,last:s.t,since:0,slow:0,roomy:0,locked:f,left:m,leftAt:w}};if(s.slow>=o.downAfter){const u=Fi(s);if(u>=0)return h(u,-1);s.slow=0}else if(s.roomy>=o.upAfter&&!s.locked){const u=ki(s);if(u>=0){const d=s.cost[u];if(!Number.isFinite(d)||d<t*o.fit||s.t-s.leftAt[u]>=zi(s,u,o))return h(u,1);s.roomy=0}}return s}const zi=(a,e,t=zt)=>Math.min(t.retryMax,t.retry*2**Math.max(0,(a.left[e]??0)-1));function oe(a,e,t=a.rung){const i=e==="off"?0:pe(t);return{...a,mode:e,rung:i,since:0,slow:0,roomy:0,locked:e==="auto"?!1:a.locked,reversals:e==="auto"?[]:a.reversals}}const Pi=`
uniform vec3 uRight,uUp;
uniform float uFlat,uMpp;uniform vec2 uRes;
attribute vec3 iPos; attribute float iSize,iDraw,iShine; attribute vec4 iUv,iCol;
varying vec2 vP; varying vec4 vData,vCol; varying vec3 vWorld;varying vec2 vGrid;
${Ge}
${Ue}
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
}`,Ai=`
uniform sampler2D uFxRamp;uniform float uFxTime,uLayer,uCalm,uSecondary,uDistort,uGlow;uniform vec2 uHalo;
varying vec2 vP;varying vec4 vData,vCol;varying vec3 vWorld;varying vec2 vGrid;
${_e}
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
    bool detail=uSecondary>0.5 && strength>${b.secondaryAt} && abs(sin(angle*4.0+time+r*9.0))<0.08 && r>0.45 && r<0.8;
    if(!detail && (spark<0.985-strength*0.012 || r>0.95))discard;
    rgb=detail?texelFetch(uFxRamp,ivec2(4,int(vData.y+0.5)),0).rgb:ramp(2.0).rgb;a=0.65;
  }
  if(form>10.5)a*=smoothstep(-1.0,0.7,p.x);
  a*=vCol.a;if(a<0.01)discard;
  gl_FragColor=vec4(haze(rgb*vCol.rgb,vWorld),a);
}`,tt=a=>1.45*(1+.15*Math.max(0,a-1));function Li(a,e){const t=a===8,i=t?0:Math.floor(a/4),r=t?2:a%4;return e!==void 0?e+(t?.009:i?r*.001:.004+r*.001):t?11.2:i?2.9+r*.01:2.8+r*.01}class Ti{layers=[];time={value:0};calm={value:0};secondary={value:1};distort={value:1};mpp={value:.09375};count=0;canopy=!1;constructor(e,t={}){const i=new Uint8Array(5*q.length*4);q.forEach((o,n)=>{const s=$[o];[...s.ramp,s.contrast].forEach((l,h)=>{const u=parseInt(l.slice(1),16),d=(n*5+h)*4;i.set([u>>16,u>>8&255,u&255,s.motion],d)})});const r=me(new ve(i,5,q.length),"fx");r.minFilter=r.magFilter=U,r.needsUpdate=!0;for(let o=0;o<9;o++){const n=o===8,s=n?0:Math.floor(o/4),l=n?2:o%4,h=new _({vertexShader:Pi,fragmentShader:Ai,uniforms:{...M,...se,uRight:ge.uRight,uUp:ge.uUp,uRes:ge.uRes,uMpp:this.mpp,uHalo:{value:new T(...b.halo)},uFxRamp:{value:r},uFlat:{value:s},uLayer:{value:l},uFxTime:this.time,uCalm:this.calm,uSecondary:this.secondary,uDistort:this.distort,uGlow:{value:t.glow?1:0}},transparent:!0,depthWrite:!1,depthTest:!n,blending:l>=2||t.glow?Vt:Yt}),u=new xi(h);u.mesh.name=`${t.name??"Magic"} ${n?"canopy halo":`${s?"ground":"upright"} layer ${l}`}`,u.mesh.renderOrder=Li(o,t.order),e.add(u.mesh),this.layers.push(u)}}begin(e,t){this.time.value=e,this.calm.value=t?1:0,this.count=0;for(const i of this.layers)i.begin()}add(e,t,i,r,o,n,s,l=null,h=!0,u=1,d=0){const f=tt(u);for(let m=0;m<(h?4:3);m++){if(m!==1){if(this.count>=b.instances)continue;this.count++}this.layers[(s?4:0)+m].add(e,t,i,r*(m===0?1.12:m===2?f:1),o,l?.[0]??1,l?.[1]??1,l?.[2]??1,m===2?n*u:n,1,!1,d)}!s&&this.canopy&&this.secondary.value>.5&&this.count<b.instances&&(this.count++,this.layers[8].add(e,t,i,r*1.5,o,l?.[0]??1,l?.[1]??1,l?.[2]??1,n*.12*u))}beam(e,t,i,r,o,n,s,l,h,u=1){const d=tt(u);for(let f=0;f<4;f++){if(f!==1){if(this.count>=b.instances)continue;this.count++}this.layers[f].add(e,t,i,n*(f===0?1.12:f===2?d:1),s,h?.[0]??1,h?.[1]??1,h?.[2]??1,f===2?l*u:l,-r,!1,o)}this.canopy&&this.secondary.value>.5&&this.count<b.instances&&(this.count++,this.layers[8].add(e,t,i,n*1.5,s,h?.[0]??1,h?.[1]??1,h?.[2]??1,l*.12*u,-r,!1,o))}end(){for(const e of this.layers)e.end()}}const Mi={element:"party",form:"beam",intensity:.45,preserveHue:!0,light:.12,anchor:.08},Ei={element:"party",form:"beam",intensity:.65,preserveHue:!0,light:.08,anchor:.04},Ri={element:"party",form:"projectile",intensity:.25,preserveHue:!0,light:.04,anchor:.02},Di={element:"moonlight",form:"aura",intensity:.45,preserveHue:!0,light:0,anchor:.06},Gi={element:"water",form:"aura",intensity:.25,preserveHue:!0,light:.05,anchor:.02},_i={element:"moonlight",form:"pillar",intensity:.65,preserveHue:!0,light:0,anchor:0},Ui={element:"party",form:"beam",intensity:.65,preserveHue:!0,light:.14,anchor:.08},Hi={element:"moonlight",form:"dome",intensity:.65,preserveHue:!0,light:0,anchor:0},Wi={element:"water",form:"zone",intensity:.45,preserveHue:!0,light:0,anchor:0},Oi={element:"party",form:"burst",intensity:1,preserveHue:!0,light:0,anchor:0},Ni={element:"moonlight",form:"aura",intensity:.45,preserveHue:!0,light:0,anchor:0},Pt={flightTrail:Mi,partySwoop:Ei,broomSpark:Ri,sigil:Di,ringDot:Gi,runestone:_i,ley:Ui,hologram:Hi,lake:Wi,firework:Oi,decorativeGlow:Ni},At={value:1};function Ii(a){const e=Pt[a],t=$[e.element];return{uNativeOn:At,uNativeRamp:{value:t.ramp.map(i=>new F((parseInt(i.slice(1),16)>>16)/255,(parseInt(i.slice(1),16)>>8&255)/255,(parseInt(i.slice(1),16)&255)/255))},uNativeStyle:{value:new T(e.intensity,e.preserveHue?1:0)}}}const qi=`
uniform float uNativeOn;uniform vec3 uNativeRamp[4];uniform vec2 uNativeStyle;
vec3 nativeFxColour(vec3 c){
  if(uNativeOn<0.5)return c;
  float l=max(c.r,max(c.g,c.b));if(l<0.00001)return c;
  vec3 band=l<0.2?uNativeRamp[0]:l<0.45?uNativeRamp[1]:l<0.75?uNativeRamp[2]:uNativeRamp[3];
  if(uNativeStyle.y>0.5)band=c/l*max(band.r,max(band.g,band.b));
  // Retain the native form's falloff and authored hue; quantise its light toward the family's ramp.
  return mix(c,band*min(1.0,l*1.2),0.18*uNativeStyle.x);
}`;function Nr(a,e){a.traverse(t=>{const i=t.material;for(const r of Array.isArray(i)?i:[i]){if(!(r instanceof _)||r.userData.nativeFx)return;/void\s+main\s*\(/.test(r.fragmentShader)&&(r.fragmentShader=qi+r.fragmentShader.replace(/void\s+main\s*\(/,"void nativeMain(")+`
void main(){nativeMain();gl_FragColor.rgb=nativeFxColour(gl_FragColor.rgb);}
`,Object.assign(r.uniforms,Ii(e)),r.userData.nativeFx=e,r.needsUpdate=!0)}})}const $i={shakeCap:.18,seconds:.5,minimumIntensity:.85},j={screen:$i},A={distortion:!0,imprints:!0,secondary:!0,lightCap:b.lightCap,particles:1},at=new WeakMap,Bi={width:1,alpha:.6,life:1,glow:1},ji=a=>Math.max(0,Math.min(1.5,1+(a-1)*.5));function Ir(a){let e=at.get(a);return e||(e=new Ki(a),at.set(a,e)),e}class Ki{quality=A;fieldUniforms=D;batches;field=new hi;stats={lights:0,requests:0,instances:0,fieldBytes:b.fieldSize**2*8};enabled=new URLSearchParams(globalThis.location?.search??"").get("magic")!=="old";galleryPage=0;galleryElement=null;galleryTime=null;captureTime=null;galleryDark=!1;galleryCamera=null;galleryVisible=!0;galleryLegacyVisible=!0;legacyParty=null;panel=null;hidden=[];background=null;lights=new Map;bursts=[];data=[0,0,0,0];selected=[];owner=null;time=0;dt=0;cx=0;cz=0;screenAt=-1/0;screenStrength=0;screenSeconds=j.screen.seconds;screenCap=j.screen.shakeCap;constructor(e){this.batches=new Ti(e)}begin(e,t,i,r){e=this.captureTime??e,(this.owner!==r||e<this.time)&&(this.reset(),this.owner=r,this.time=e),this.dt=Math.max(0,e-this.time),this.time=e,this.cx=t,this.cz=i,At.value=this.enabled?1:0,this.field.move(t,i),this.field.decay(this.dt),this.batches.begin(e,X.reduceFlashing),this.batches.secondary.value=A.secondary?1:0,this.batches.distort.value=A.distortion&&!X.reduceFlashing?1:0,D.uFxOn.value=this.enabled&&A.imprints?1:0,D.uFxTime.value=e,D.uFxCalm.value=X.reduceFlashing?1:0,this.stats.instances=0}reset(){this.field.reset(),this.lights.clear(),this.bursts.length=0,this.screen(),this.screenAt=-1/0,this.screenStrength=0}get screenKick(){if(!this.enabled||X.reduceFlashing)return 0;const e=Math.max(0,(this.time-this.screenAt)/this.screenSeconds);return e>=1?0:Math.min(this.screenCap,this.screenStrength)*(1-e)**2}screen(e=j.screen.shakeCap,t=j.screen.seconds,i=j.screen.shakeCap){this.screenAt=this.time,this.screenStrength=e,this.screenSeconds=Math.max(.01,t),this.screenCap=i}kick(e,t){this.screen(Math.max(0,e),t,.5)}lamp(e,t,i,r,o,n,s){if(!this.enabled||!(s>.001)||!(n>0))return;let l=this.lights.get(e);if(!l){if(this.lights.size>=b.pool)return;l={x:t,y:i,z:r,reach:0,rgb:new F,strength:0,target:0,seen:this.time,score:0,fade:0},this.lights.set(e,l)}l.x=t,l.y=i,l.z=r,l.reach=n,l.rgb.set(o[0],o[1],o[2]),l.target=s*(X.reduceFlashing?.5:1),l.seen=this.time}draw(e,t,i,r,o,n,s=1,l=1,h=0,u=0,d=null,f=ye(n),m=1){if(!this.enabled||!(l>.01)||Math.hypot(i-this.cx,o-this.cz)>140)return;const w=ee(e),p=$[w],c=N[t],v=this.batches.mpp.value,C=Math.max(v,Math.round(c.size*s*he(b.size,f)/v)*v);f>=j.screen.minimumIntensity&&(t==="burst"||t==="eruption")&&h<.15&&this.screen(j.screen.shakeCap*l),this.data[0]=c.id,this.data[1]=q.indexOf(w),this.data[2]=f,this.data[3]=h,this.batches.add(i,r,o,C,this.data,l,c.ground,d,A.particles>.5||(u&1)===0,m),this.stats.instances++,c.ground||(this.data[0]=N.zone.id,this.batches.add(i,0,o,Math.min(C*.75,12),this.data,l*.18*m,!0,d,!1)),this.light(`${w}:${t}:${u}`,i,r,o,w,f,l,d,m),A.imprints&&(t==="burst"||t==="zone"||t==="eruption"||t==="beam"||t==="projectile"||t==="vortex"||t==="pillar")&&this.field.stamp(i,o,Math.max(2,Math.min(18,C*.6)),p.imprint,f*l*(t==="projectile"?.25:1))}emit(e,t,i,r,o,n,s=1,l=1.2,h=0){this.bursts.length>=b.pool&&this.bursts.shift(),this.bursts.push({element:e,form:t,x:i,y:r,z:o,level:n,size:s,at:this.time,life:l,seed:h}),n>=3&&s>=1&&this.screen()}native(e,t,i,r,o=1,n=0,s=null){if(!this.enabled||o<=.01||Math.hypot(t-this.cx,r-this.cz)>80)return;const l=Pt[e],h=ee(l.element);l.light>0&&this.light(`native:${e}:${n}`,t,i,r,h,l.intensity,Math.min(1,o)*l.light,s),l.anchor>0&&(this.data[0]=N.zone.id,this.data[1]=q.indexOf(h),this.data[2]=l.intensity,this.data[3]=0,this.batches.add(t,0,r,Math.min(5,N[l.form].size*1.5),this.data,l.anchor*Math.min(1,o),!0,s,!1))}beam(e,t,i,r,o,n,s,l,h,u,d=null,f=ye(l),m=1){const w=Math.hypot(r-t,o-i);if(!this.enabled||w<.01||h<=.01)return;const p=ee(e),c=(t+r)/2,v=(i+o)/2;if(Math.hypot(c-this.cx,v-this.cz)>140+w/2)return;this.data[0]=N.beam.id,this.data[1]=q.indexOf(p),this.data[2]=f,this.data[3]=this.time%1;const C=Math.abs(o-i)/w;this.batches.beam(c,n,v,w,Math.atan2(o-i,r-t),Math.max(s,this.batches.mpp.value*3)*(1+C*.35),this.data,h,d,m);const g=Math.min(8,Math.max(1,Math.ceil(w/4)));for(let P=0;P<=g;P++){const L=t+(r-t)*P/g,H=i+(o-i)*P/g;this.light(`${p}:beam:${u}:${P}`,L,n,H,p,f,h,d,m),A.imprints&&this.field.stamp(L,H,Math.max(2,s*1.5),$[p].imprint,f*h)}this.stats.instances++}ribbon(e,t,i,r,o,n,s,l,h,u=null,d=ye(l),f=Bi){const m=Math.hypot(o,s);if(!this.enabled||m<.1)return;const w=Math.min(.32,8/m)*f.life,p=m*w,c=ee(e);this.data[0]=N.trail.id,this.data[1]=q.indexOf(c),this.data[2]=d,this.data[3]=n*w,this.batches.beam(t-o*w/2,i-n*w/2,r-s*w/2,p,Math.atan2(s,o),.55*f.width*he(b.size,d),this.data,f.alpha,u,f.glow),A.imprints&&(h&3)===0&&this.field.stamp(t-o*w,r-s*w,2,$[c].imprint,.15*d)}light(e,t,i,r,o,n,s,l,h=1){let u=this.lights.get(e);if(!u){if(this.lights.size>=b.pool){const f=xe(t,r,n*s,this.cx,this.cz);let m="",w=1/0;for(const[p,c]of this.lights){const v=xe(c.x,c.z,c.target,this.cx,this.cz);v<w&&(m=p,w=v)}if(f<=w)return;this.lights.delete(m)}u={x:t,y:i,z:r,reach:0,rgb:new F,strength:0,target:0,seen:this.time,score:0,fade:0},this.lights.set(e,u)}const d=parseInt($[o].ramp[1].slice(1),16);u.x=t,u.y=i,u.z=r,u.reach=he(b.lightReach,n),u.rgb.set(l?.[0]??(d>>16)/255,l?.[1]??(d>>8&255)/255,l?.[2]??(d&255)/255),u.target=he(b.lightStrength,n)*Math.min(1,s)*ji(h)*(X.reduceFlashing?.5:1),u.seen=this.time}finish(e){let t=0;for(const n of this.bursts){const s=this.time-n.at;if(s<0||s>=n.life)continue;this.bursts[t++]=n;const l=s/n.life,h=Math.min(1,s/.2,(n.life-s)/.3);this.draw(n.element,n.form,n.x,n.y,n.z,n.level,n.size,h,l,n.seed)}this.bursts.length=t,this.batches.end(),this.field.publish();const i=D.uFxField.value.image.data,r=D.uFxExtra.value.image.data;let o=!1;for(let n=0,s=0;n<this.field.data.length;n+=8,s+=4)for(let l=0;l<4;l++){const h=this.field.data[n+l],u=this.field.data[n+l+4];(h||u)&&(o=!0),i[s+l]=h,r[s+l]=u}D.uFxOn.value=o&&this.enabled&&A.imprints?1:0,D.uFxField.value.needsUpdate=!0,D.uFxExtra.value.needsUpdate=!0,D.uFxBox.value.set(this.field.x*this.field.cell,this.field.z*this.field.cell,this.field.metres,this.field.size),this.applyLights(e)}applyLights(e){this.selected.length=0;for(const[s,l]of this.lights){const h=this.enabled&&l.seen===this.time,u=this.dt/b.lightEase;if(l.fade=Math.max(0,Math.min(1,l.fade+(h?u:-u))),l.strength=l.target*l.fade,!h&&l.fade<.001){this.lights.delete(s);continue}l.score=xe(l.x,l.z,l.strength,this.cx,this.cz),Math.hypot(l.x-this.cx,l.z-this.cz)<l.reach+30&&this.selected.push(l)}this.selected.sort((s,l)=>l.score-s.score),this.enabled||(this.selected.length=0);const t=M,i=Math.max(0,Math.min(Y,Math.floor(e))),r=Math.min(A.lightCap,b.lightCap,i),o=Math.min(r,this.selected.length),n=Math.min(t.uLightCount.value,Math.max(0,i-o));for(let s=0;s<o;s++){const l=this.selected[s];t.uLightPos.value[n+s].set(l.x,Xt(l.x,l.z)+l.y,l.z,l.reach),t.uLightCol.value[n+s].set(l.rgb.x,l.rgb.y,l.rgb.z,l.strength)}t.uLightCount.value=n+o,this.stats.lights=o,this.stats.requests=this.lights.size}gallery(e,t,i,r){if(this.galleryPanel(e),!this.galleryVisible)return;const o=(this.galleryTime??r)%4/4;if(this.galleryPage===3){const s=this.galleryElement??e;this.beam(s,t-13,i,t-3,i,1.5,1.4,2,.8,880001),this.beam(s,t+8,i-5,t+8,i+5,1.5,1.4,2,.8,880002);return}Ze.slice(this.galleryPage*4,this.galleryPage*4+4).forEach((s,l)=>[.25,.6,1].forEach((h,u)=>{const d=t+(l-1.5)*10,f=i+(u-1)*12;if(s==="beam"){this.beam(this.galleryElement??e,d-3,f,d+3,f,1.5,1.4,2,.8,l*3+u,null,h);return}if(s==="trail"){this.ribbon(this.galleryElement??e,d+3,2,f,20,0,0,2,l*3+u,null,h);return}this.draw(this.galleryElement??e,s,d,N[s].ground?0:s==="pillar"?5:2,f,2,1,.7,o,l*3+u,null,h)}))}galleryPanel(e){if(this.panel||typeof document>"u")return;const t=this.panel=document.createElement("aside");t.style.cssText="position:fixed;left:12px;top:12px;z-index:20000;background:#15131eee;color:#fff;padding:12px;font:14px monospace;max-width:420px";const i=document.createElement("div");i.textContent="Magic gallery · rows far → near: 0.25 / 0.6 / 1",t.append(i);const r=document.createElement("select");r.setAttribute("aria-label","Magic element");for(const d of q){const f=document.createElement("option");f.value=f.textContent=d,r.append(f)}r.value=ee(e),r.onchange=()=>{this.galleryElement=r.value},t.append(r);const o=document.createElement("select");o.setAttribute("aria-label","Magic forms");for(let d=0;d<3;d++){const f=document.createElement("option");f.value=String(d),f.textContent=Ze.slice(d*4,d*4+4).join(" / "),o.append(f)}const n=document.createElement("option");n.value="3",n.textContent="Equal E–W / N–S beams",o.append(n),o.onchange=()=>{this.galleryPage=Number(o.value)},t.append(o);const s=(d,f)=>{const m=document.createElement("button");return m.textContent=d,m.onclick=f,t.append(m),m},l=s("Pause",()=>{this.galleryTime=this.galleryTime===null?this.time:null,l.textContent=this.galleryTime===null?"Pause":"Play"}),h=s("Dark ground",()=>{this.galleryDark=!this.galleryDark,h.textContent=this.galleryDark?"Forest ground":"Dark ground"}),u=s("Treetop camera",()=>{this.galleryCamera=!this.galleryCamera,u.textContent=this.galleryCamera?"Ground camera":"Treetop camera"});document.body.append(t)}hideBackdrop(e){if(this.galleryDark){this.background=e.background,e.background=new De("#15131e"),this.hidden=e.children.filter(t=>!t.name.startsWith("Magic ")).map(t=>({object:t,visible:t.visible}));for(const t of this.hidden)t.object.visible=!1}}restoreBackdrop(e){if(this.hidden.length){for(const t of this.hidden)t.object.visible=t.visible;this.hidden.length=0,e.background=this.background}}}const it=1e3/60,rt=1e3/30,Ji=.35,Lt="witch.ladder";class qr{mutate=(e,t)=>t();state;ms=NaN;timed=!1;key;bases=new WeakMap;applied="";win={t0:NaN,frames:[],skip:!1};constructor(e,t){this.key=`${Lt}:${e.slice(0,120)}`,this.state=Tt(t,Mt(this.key)),this.sync()}get cap30(){return ce(this.state,S.findIndex(e=>e.id==="cap30"))}frame(e,t,i,r,o){const n=this.win;if(Number.isNaN(n.t0)&&(n.t0=e),i||t>250?n.skip=!0:t>0&&n.frames.push(t),e-n.t0>=1e3){const s=(e-n.t0)/1e3,l=n.frames.length,h=o.length?nt(o.slice(-Math.max(1,Math.min(l,o.length)))):NaN;this.timed=Number.isFinite(h),this.ms=this.timed?h:nt(n.frames);const u=this.state.rung;this.state=Ci(this.state,this.ms,this.cap30?rt:it,s,n.skip||l<5,void 0,this.timed),this.state.rung!==u&&this.state.mode==="auto"&&this.save(),this.sync(),n.t0=e,n.frames=[],n.skip=!1}this.apply(r)}apply(e){let t=this.bases.get(e);if(!t){const o=Et.get(e);o!==void 0&&(this.state={...this.state,loaded:o}),t={keep:e.treeCap.keep,wind:e.wind.on,trunks:e.shadows.trunks?.mode??"off",edge:!!e.scenery.edgeDither,hard:!!e.canopyCutout.hard},this.bases.set(e,t),this.applied=""}const i=o=>ce(this.state,S.findIndex(n=>n.id===o)),r=S.map((o,n)=>ce(this.state,n)?1:0).join("");r!==this.applied&&(this.applied=r,this.mutate("automatic quality tuning",()=>{A.distortion=!i("fxDistort"),A.imprints=!i("fxImprints"),A.secondary=!i("fxSecondary"),A.lightCap=i("fxLights")?2:6,A.particles=i("fxParticles")?.5:1,ot(e.scenery,"edgeDither",i("farDither")||t.edge),ot(e.canopyCutout,"hard",i("hardCut")||t.hard),e.treeCap.keep=i("squeeze")?Math.min(t.keep,Ji):t.keep,e.wind.on=i("still")?!1:t.wind,e.shadows.trunks&&(e.shadows.trunks.mode=i("still")?"off":t.trunks)}))}lines(){const e=this.state,t=S[e.rung],i=S.length-1,o=[`${e.mode==="off"?"off (full quality)":e.mode==="pinned"?`pinned at ${e.rung}`:e.locked?"auto, holding (it kept flipping)":"auto"}: rung ${e.rung} of ${i}, ${t.label}`];Number.isFinite(this.ms)&&o.push(`${this.timed?"GPU":"frame"} ${this.ms.toFixed(1)} ms a frame, budget ${(this.cap30?rt:it).toFixed(1)}`);const n=S.filter((l,h)=>ce(e,h)).map(l=>l.label);n.length&&o.push(`in effect: ${n.join("; ")}`);const s=Si(e);return s.adds.length&&o.push(`from the next load: ${s.adds.map(l=>S[l].label).join("; ")}`),s.drops.length&&o.push(`back from the next load: ${s.drops.map(l=>S[l].label).join("; ")}`),o}options(){return[{value:"auto",label:"Auto"},{value:"off",label:"Off (full quality)"},...S.slice(1).map((e,t)=>({value:String(t+1),label:`${t+1}: ${e.label}${e.built?"":" (not built yet)"}`}))]}current(){return this.state.mode==="auto"?"auto":this.state.mode==="off"?"off":String(this.state.rung)}choose(e){this.state=e==="auto"?oe(this.state,"auto"):e==="off"?oe(this.state,"off"):oe(this.state,"pinned",Number(e)),e==="auto"&&this.save(),this.sync()}sync(){ie=this.state.mode==="off"?0:this.state.rung}save(){try{localStorage.setItem(this.key,JSON.stringify({rung:this.state.rung,at:Date.now()}))}catch{}}}function Tt(a,e){const t=a.get("ladder"),i=t!==null&&t!==""&&Number.isFinite(Number(t)),r=typeof navigator<"u"&&navigator.webdriver===!0;return t==="off"||r&&t!=="auto"&&!i?oe(Fe(0),"off"):i?oe(Fe(pe(Number(t))),"pinned"):Fe(e)}function Mt(a){try{const e=JSON.parse(localStorage.getItem(a)??"null");return pe(Number(e?.rung??0))}catch{return 0}}let ie=null,de;const Et=new WeakMap;function Rt(a,e=new Set){ie===null&&(ie=(()=>{const i=Tt(st(),Mt(`${Lt}:${Vi().slice(0,120)}`));return i.mode==="off"?0:i.rung})());const t=bi(ie);de===void 0&&(de=st().has("px")?null:t.px),t.density!==1&&!e.has("treeDensity")&&(a.treeDensity*=t.density),t.blend!==null&&!e.has("areaEdgeBlend.width")&&(a.areaEdgeBlend.width=Math.min(a.areaEdgeBlend.width,t.blend)),de&&(a.pixelSize=de),Et.set(a,ie)}const st=()=>new URLSearchParams(typeof location<"u"?location.search:"");function Vi(){try{const a=document.createElement("canvas").getContext("webgl2");if(!a)return"unknown";const e=Yi(a);return a.getExtension("WEBGL_lose_context")?.loseContext(),e}catch{return"unknown"}}function Yi(a){try{const e=a.getExtension("WEBGL_debug_renderer_info");return String(e?a.getParameter(e.UNMASKED_RENDERER_WEBGL):a.getParameter(a.RENDERER))}catch{return"unknown"}}function ot(a,e,t){t?a[e]=!0:delete a[e]}function nt(a){if(!a.length)return NaN;const e=[...a].sort((t,i)=>t-i);return e[Math.floor(e.length/2)]}const Xi="witch-mapprep",Me="prep",Zi="next",Qi=()=>new Promise(a=>{try{const e=indexedDB.open(Xi,1);e.onupgradeneeded=()=>e.result.createObjectStore(Me),e.onsuccess=()=>a(e.result),e.onerror=e.onblocked=()=>a(null)}catch{a(null)}});async function er(){const a=await Qi();return a?new Promise(e=>{try{const t=a.transaction(Me,"readonly").objectStore(Me).get(Zi);t.onsuccess=()=>{a.close(),e(t.result??null)},t.onerror=()=>{a.close(),e(null)}}catch{a.close(),e(null)}}):null}const tr="v7215 · 20af18d",He=(a,e)=>`${tr}|${a}|${Qt(JSON.stringify(e))}`;function Dt(a,e,t){const i=new URLSearchParams({island:a,seed:String(t),...e!=null?{world:String(e)}:{},arrive:"1"}),{tuning:r}=vt(i);return pt(r,void 0,new Set),Rt(r),wt(yt(),r),r}let K="none",J=0,V=0;const re=(a,e=0)=>{try{performance.mark("witch:map-prep-source",{detail:{seed:a,status:K,workerMs:J,hydrateMs:V,checkMs:e}})}catch{}};function Ee(a,e,t){const i=performance.now();if(K="none",J=0,V=0,!a)return re(e),null;if(a.key!==He(e,t))return K="stale",re(e,performance.now()-i),a.key.split("|")[1]===String(e)&&a.tuning&&console.info("map prep: another tuning's",Object.keys(t).filter(o=>JSON.stringify(t[o])!==JSON.stringify(a.tuning[o]))),null;const r=Ht(a.prep);return r?(K="unsound",re(e,performance.now()-i),console.warn("map prep: unsound, made afresh:",r),null):(Wt(a.arch),K="worker",J=a.ms,re(e,performance.now()-i),a.prep)}function ar(a,e,t){const i=performance.now();if(t)try{const r=_t(a,e,t);V=performance.now()-i;try{performance.mark("witch:map-hydrated",{detail:{seed:a,ms:V,workerMs:J}})}catch{}return J>0&&V>J&&console.warn(`map prep: hydrate ${Math.round(V)} ms, slower than making it (${Math.round(J)} ms in the worker)`),r}catch(r){K="failed",re(a),console.warn("map prep: hydrate failed, made afresh:",r)}return Ut(a,e)}async function ir(a,e,t=1500){return Ee(typeof indexedDB>"u"?null:await Promise.race([er(),new Promise(i=>setTimeout(()=>i(null),t))]),a,e)}function Gt(a,e,t,i=!0){let r=null,o=()=>{};const n=new Promise(s=>{o=s});try{if(typeof Worker>"u")return o(null),{done:n,stop(){}};r=new Worker(new URL(""+new URL("mapPrep.worker-C0yi000e.js",import.meta.url).href,import.meta.url),{type:"module"}),r.onmessage=s=>{o(s.data.rec??s.data.ok),r?.terminate(),r=null},r.onerror=()=>{o(null),r?.terminate(),r=null},Zt(r,{key:He(a,e),seed:a,tuning:e,send:t,noKeep:!i},"map-prep",a)}catch{o(null)}return{done:n,stop(){r?.terminate(),r=null,o(null)}}}function rr(a,e,t,i=!1){return Gt(t,Dt(a,e,t),i)}function sr(a,e,t=1e4){try{const{tuning:i}=vt(e),r=new Set((e.get("set")??"").split(";").map(s=>s.split("=")[0]).filter(Boolean));pt(i,void 0,r),Rt(i,r),wt(yt(),i);const o=Gt(a,i,!0,!1),n=setTimeout(()=>o.stop(),t);return o.done.then(s=>(clearTimeout(n),s&&typeof s=="object"?s:null))}catch{return Promise.resolve(null)}}const $r=Object.freeze(Object.defineProperty({__proto__:null,get hydrateMs(){return V},prepKey:He,get prepUsed(){return K},readyMap:ar,sailTuning:Dt,startBootMapPrep:sr,startMapPrep:rr,takeMapPrep:ir,useReadyMap:Ee},Symbol.toStringTag,{value:"Module"}));export{vi as $,Li as A,vr as B,Sa as C,R as D,q as E,D as F,N as G,he as H,b as I,$ as J,Ct as K,M as L,Y as M,qi as N,Ir as O,Ue as P,Sr as Q,xi as R,ge as S,ci as T,ee as U,mr as V,ua as W,Ze as X,Dr as Y,Wr as Z,Hr as _,ha as a,Mr as a0,pi as a1,Or as a2,_r as a3,Er as a4,Ur as a5,Rr as a6,Gr as a7,Ce as a8,Pr as a9,mi as aa,be as ab,Se as ac,Cr as ad,zr as ae,fr as af,gr as ag,ia as ah,S as ai,Rt as aj,ir as ak,Ee as al,ar as am,sr as an,qr as ao,Yi as ap,br as aq,V as ar,K as as,$r as at,we as b,va as c,et as d,Z as e,Tr as f,fa as g,xr as h,Nr as i,_e as j,kr as k,Fr as l,pr as m,kt as n,yr as o,wr as p,di as q,Ii as r,Ar as s,wa as t,pa as u,Lr as v,ca as w,ya as x,A as y,Ti as z};
