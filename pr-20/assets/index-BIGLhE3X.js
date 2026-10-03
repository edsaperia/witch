(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);new MutationObserver(r=>{for(const a of r)if(a.type==="childList")for(const s of a.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&i(s)}).observe(document,{childList:!0,subtree:!0});function t(r){const a={};return r.integrity&&(a.integrity=r.integrity),r.referrerPolicy&&(a.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?a.credentials="include":r.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function i(r){if(r.ep)return;r.ep=!0;const a=t(r);fetch(r.href,a)}})();function jr(n){let e=n>>>0;return()=>{e=e+1831565813>>>0;let t=e;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}}function Tt(n,e,t){let i=Math.imul(n|0,374761393)^Math.imul(e|0,668265263)^Math.imul(t|0,2147483647);return i=Math.imul(i^i>>>13,1274126177),((i^i>>>16)>>>0)/4294967296}function Cl(n,e,t){const i=Math.floor(n),r=Math.floor(e),a=n-i,s=e-r,o=a*a*(3-2*a),u=s*s*(3-2*s),c=Tt(i,r,t),h=Tt(i+1,r,t),f=Tt(i,r+1,t),d=Tt(i+1,r+1,t);return c+(h-c)*o+(f-c)*u+(c-h-f+d)*o*u}const Wn=(n,e,t)=>n+(e-n)*t,Ki=(n,e,t)=>Math.min(t,Math.max(e,n)),Pr=n=>{const e=Ki(n,0,1);return e*e*(3-2*e)};function rh(n,e,t,i){const r=Math.max(1,n.camera.zoomSteps),a=Ki(Math.round(n.camera.startZoom),0,r-1),s=r>1?a/(r-1):0;return{zoomStep:a,zoom:s,tx:e,ty:t,tz:i,vx:0,vy:0,vz:0,ax:0,az:0,lift:0}}function Ms(n,e,t,i,r){const a=i*r,s=Math.exp(-a),o=n-t,u=e+i*o;return[t+(o+u*r)*s,(e-i*u*r)*s]}function ah(n,e,t,i,r,a,s){const o=s.camera,u=Math.max(1,o.zoomSteps),c=Ki(n.zoomStep+Math.sign(e),0,u-1),h=u>1?c/(u-1):0;let f=i.x*o.lookAhead,d=i.z*o.lookAhead;const p=Math.hypot(f,d);p>o.lookAheadMax&&(f*=o.lookAheadMax/p,d*=o.lookAheadMax/p);const _=1-Math.exp(-o.lookAheadEase*a),x=n.ax+(f-n.ax)*_,g=n.az+(d-n.az)*_,[m,v]=Ms(n.tx,n.vx,t.x+x,o.follow,a),[E,b]=Ms(n.ty,n.vy,t.y,o.follow,a),[R,A]=Ms(n.tz,n.vz,t.z+g,o.follow,a),D=n.zoom+(h-n.zoom)*(1-Math.exp(-o.zoomEase*a)),S=n.lift+(r-n.lift)*(1-Math.exp(-o.liftEase*a));return{zoomStep:c,zoom:D,tx:m,ty:E,tz:R,vx:v,vy:b,vz:A,ax:x,az:g,lift:Ki(S,0,1)}}function sh(n,e,t){const i=t.camera.ground,r=t.camera.treetop,a=Pr(e),s=Wn(Wn(i.angleIn,i.angleOut,n.zoom),Wn(r.angleIn,r.angleOut,n.zoom),a),o=Wn(Wn(i.distanceIn,i.distanceOut,n.zoom),Wn(r.distanceIn,r.distanceOut,n.zoom),a),u=s*Math.PI/180;return{angle:s,distance:o,x:n.tx,y:n.ty+Math.sin(u)*o,z:n.tz+Math.cos(u)*o,tx:n.tx,ty:n.ty,tz:n.tz}}const oh=.1,lh=()=>({time:0,paused:!0});function ch(n,e){if(n.paused||!(e>0))return 0;const t=Math.min(oh,e);return n.time+=t,t}const uh={moor:{treeDensity:.4},"fern-forest":{treeDensity:1},"muddy-forest":{treeDensity:1},"stone-shrine":{treeDensity:.3},"tangly-forest":{treeDensity:1},"wispy-forest":{treeDensity:1},"hazel-forest":{treeDensity:1},garden:{treeDensity:.6},"twiggy-forest":{treeDensity:1},ancient:{treeDensity:.9},norway:{treeDensity:1},"alder-forest":{treeDensity:.9},meadow:{treeDensity:.2},"old-oaks":{treeDensity:.9},"berry-thicket":{treeDensity:1},wetland:{treeDensity:.6},stream:{treeDensity:.7},"rocky-slope":{treeDensity:.6},bog:{treeDensity:.5},deadwood:{treeDensity:.8},"cave-mouth":{treeDensity:.6},grassland:{treeDensity:.2},"beaver-pond":{treeDensity:.8},"log-pile":{treeDensity:.7},heath:{treeDensity:.4},"old-pinewood":{treeDensity:1},ravine:{treeDensity:.6},"bluebell-glade":{treeDensity:.8},"holly-thicket":{treeDensity:1},"honeysuckle-tangle":{treeDensity:1}},hh={types:uh};function Hc(n,e){if(typeof document<"u"){const t=document.createElement("canvas");return t.width=n,t.height=e,t}return new OffscreenCanvas(n,e)}function $o(n){let e=n>>>0;return()=>{e=e+1831565813>>>0;let t=e;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}}const be=(n,e,t)=>e+(t-e)*n(),Gc=(n,e)=>e[Math.floor(n()*e.length)];function dn(n,e,t){let i=Math.imul(n|0,374761393)^Math.imul(e|0,668265263)^Math.imul(t|0,2147483647);return i=Math.imul(i^i>>>13,1274126177),((i^i>>>16)>>>0)/4294967296}function Ci(n,e,t){const i=Math.floor(n),r=Math.floor(e),a=n-i,s=e-r,o=a*a*(3-2*a),u=s*s*(3-2*s),c=dn(i,r,t),h=dn(i+1,r,t),f=dn(i,r+1,t),d=dn(i+1,r+1,t);return c+(h-c)*o+(f-c)*u+(c-h-f+d)*o*u}function Me(n,e,t){n=(n%1+1)%1,e=Math.max(0,Math.min(1,e)),t=Math.max(0,Math.min(1,t));const i=Math.floor(n*6),r=n*6-i,a=t*(1-e),s=t*(1-r*e),o=t*(1-(1-r)*e),[u,c,h]=[[t,o,a],[s,t,a],[a,t,o],[a,s,t],[o,a,t],[t,a,s]][i%6];return[Math.round(u*255),Math.round(c*255),Math.round(h*255)]}const l={BODY:1,BELLY:2,ACCENT:3,EYE:4,GLINT:5,TRUNK:6,LEAF:7,LEAF2:8,CLOTH:9,SKIN:10,HAIR:11,BROOM:12,STRAW:13,BODY2:14,BARK2:15,FLOWER:16,PUPIL:17,MAGIC:18,BARKD:19,LINE:20,IRIS:21,MAGIC2:22,NOSE:23,EAR:24,BODY3:25,LEAF3:26,BARKL:27,HAT:28,PHONES:29,TOP:30,JACKET:31,JEANS:32,SHOES:33,WATER:34,STONE:35,STONED:36,MOSS:37,RUNE:39,GLOW:40,WOOD:41,COLLAR:42,HAT1:43,HAT2:44,POM:45,SHADES:46,FRAME:47,SHOE:48,SOLE:49,WOKEN:50,WEB:51},dh=new Set([l.GLINT,l.MAGIC,l.MAGIC2,l.RUNE,l.GLOW,l.COLLAR,l.WOKEN]);function Ll(n,e=!0,t=8){const i=n.length,r=[];if(i<3)return n.slice();const a=o=>e?n[(o+i)%i]:n[Math.max(0,Math.min(i-1,o))],s=e?i:i-1;for(let o=0;o<s;o++){const u=a(o-1),c=a(o),h=a(o+1),f=a(o+2),d=Math.max(2,Math.ceil(Math.hypot(h[0]-c[0],h[1]-c[1])/1.5),t);for(let p=0;p<d;p++){const _=p/d,x=_*_,g=x*_;r.push([0,1].map(m=>.5*(2*c[m]+(-u[m]+h[m])*_+(2*u[m]-5*c[m]+4*h[m]-f[m])*x+(-u[m]+3*c[m]-3*h[m]+f[m])*g)))}}return e||r.push(n[i-1]),r}function fh(n,{cap:e=1,capEnd:t=e}={}){const i=[],r=[],a=n.length;for(let u=0;u<a;u++){const c=n[Math.max(0,u-1)],h=n[Math.min(a-1,u+1)];let f=h[0]-c[0],d=h[1]-c[1];const p=Math.hypot(f,d)||1;f/=p,d/=p;const _=n[u][2]/2;i.push([n[u][0]-d*_,n[u][1]+f*_]),r.push([n[u][0]+d*_,n[u][1]-f*_])}const s=(u,c,h,f)=>{let d=u[0]-c[0],p=u[1]-c[1];const _=Math.hypot(d,p)||1;return[u[0]+d/_*h/2*f,u[1]+p/_*h/2*f]};return[...i,s(n[a-1],n[a-2],n[a-1][2],t),...r.reverse(),s(n[0],n[1],n[0][2],e)]}const wt=(n,e)=>[n[0]+e[0],n[1]+e[1]],fi=(n,e,t)=>[n[0]+(e[0]-n[0])*t,n[1]+(e[1]-n[1])*t];function ss(n,e,t,i,r,a=1){const s=[];for(let o=0;o<n.length;o++){if(s.push(n[o]),o<e||o>=t)continue;const u=n[o],c=n[(o+1)%n.length];let h=c[0]-u[0],f=c[1]-u[1];const d=Math.hypot(h,f)||1,p=f/d*a,_=-h/d*a;for(let x=1;x<=i;x++){const g=(x-.5)/i,m=fi(u,c,g),v=[m[0]+p*r-h/d*r*.5,m[1]+_*r-f/d*r*.5];s.push(fi(u,c,g-.45/i),v,fi(u,c,g+.35/i))}}return s}function Dl(n,e,t){const i=new Uint8Array(n*e);let r=1/0,a=-1/0;for(const s of t)r=Math.min(r,s[1]),a=Math.max(a,s[1]);for(let s=Math.max(0,Math.floor(r));s<=Math.min(e-1,Math.ceil(a));s++){const o=s+.5,u=[];for(let c=0,h=t.length-1;c<t.length;h=c++){const[f,d]=t[c],[p,_]=t[h];d>o!=_>o&&u.push(f+(o-d)/(_-d)*(p-f))}u.sort((c,h)=>c-h);for(let c=0;c+1<u.length;c+=2)for(let h=Math.max(0,Math.ceil(u[c]-.5));h<=Math.min(n-1,Math.floor(u[c+1]-.5));h++)i[s*n+h]=1}return i}function ph(n,e,t){const r=new Float32Array(n*e),a=new Float32Array(n*e);for(let u=0;u<n*e;u++)t[u]&&(r[u]=1e4,a[u]=1e4);const s=u=>r[u]*r[u]+a[u]*a[u],o=(u,c,h,f,d)=>{const p=c+f,_=h+d;let x,g;if(p<0||_<0||p>=n||_>=e)x=f,g=d;else{const m=_*n+p;x=r[m]+f,g=a[m]+d}x*x+g*g<s(u)&&(r[u]=x,a[u]=g)};for(let u=0;u<e;u++){for(let c=0;c<n;c++){const h=u*n+c;t[h]&&(o(h,c,u,-1,0),o(h,c,u,0,-1),o(h,c,u,-1,-1),o(h,c,u,1,-1))}for(let c=n-1;c>=0;c--){const h=u*n+c;t[h]&&o(h,c,u,1,0)}}for(let u=e-1;u>=0;u--){for(let c=n-1;c>=0;c--){const h=u*n+c;t[h]&&(o(h,c,u,1,0),o(h,c,u,0,1),o(h,c,u,1,1),o(h,c,u,-1,1))}for(let c=0;c<n;c++){const h=u*n+c;t[h]&&o(h,c,u,-1,0)}}return{vx:r,vy:a}}class on{constructor(e,t,i=1){this.sx=i,this.w=Math.round(e*i),this.h=t|0,this.m=new Uint8Array(this.w*this.h),this.n=new Float32Array(this.w*this.h*3),this.g=new Uint8Array(this.w*this.h)}inb(e,t){return e>=0&&t>=0&&e<this.w&&t<this.h}get(e,t){return e|=0,t|=0,this.inb(e,t)?this.m[t*this.w+e]:0}put(e,t,i,r=0,a=0,s=1){this.px(e*this.sx,t,i,r,a,s)}px(e,t,i,r=0,a=0,s=1){if(e=Math.floor(e),t=Math.floor(t),!this.inb(e,t))return;const o=t*this.w+e;this.m[o]=i,this.n[o*3]=r,this.n[o*3+1]=a,this.n[o*3+2]=s}recolour(e,t,i){e=Math.floor(e),t=Math.floor(t),this.inb(e,t)&&this.m[t*this.w+e]&&(this.m[t*this.w+e]=i)}ellipse(e,t,i,r,a,s={}){const{onlyOn:o,density:u=1,noise:c=0,seed:h=0,round:f=1}=s;e*=this.sx,i*=this.sx;for(let d=Math.max(0,Math.floor(t-r-1));d<Math.min(this.h,t+r+1);d++)for(let p=Math.max(0,Math.floor(e-i-1));p<Math.min(this.w,e+i+1);p++){const _=(p+.5-e)/i,x=(d+.5-t)/r,g=_*_+x*x;if(g>1)continue;const m=d*this.w+p;if(o&&!o.has(this.m[m]))continue;if(u<1){const R=c?Ci(p/3.2,d/3.2,h)*c+(1-c)*.5:.5;if(dn(p,d,h+77)>u*(.4+R*1.2)*(1.15-g*.5))continue}const v=_*f,E=x*f,b=Math.hypot(v,E,Math.sqrt(Math.max(0,1-g))+.15);this.px(p,d,a,v/b,E/b,(Math.sqrt(Math.max(0,1-g))+.15)/b)}}line(e,t,i,r,a,s,o,u=1){e*=this.sx,i*=this.sx;const c=Math.max(1,Math.ceil(Math.hypot(i-e,r-t)));for(let h=0;h<=c;h++){const f=h/c,d=e+(i-e)*f,p=t+(r-t)*f,_=Math.max(.5,(a+(s-a)*f)/2);for(let x=Math.floor(p-_);x<=p+_;x++)for(let g=Math.floor(d-_);g<=d+_;g++){const m=(g+.5-d)/_,v=(x+.5-p)/_;if(m*m+v*v>1)continue;const E=m*u,b=Math.hypot(E,v*.3,1);this.px(g,x,o,E/b,v*.3/b,1/b)}}}tri(e,t){let[[i,r],[a,s],[o,u]]=e;i*=this.sx,a*=this.sx,o*=this.sx;const c=(_,x,g,m,v,E)=>(_-v)*(m-E)-(g-v)*(x-E),h=Math.max(0,Math.floor(Math.min(i,a,o))),f=Math.min(this.w,Math.ceil(Math.max(i,a,o))),d=Math.max(0,Math.floor(Math.min(r,s,u))),p=Math.min(this.h,Math.ceil(Math.max(r,s,u)));for(let _=d;_<p;_++)for(let x=h;x<f;x++){const g=x+.5,m=_+.5,v=c(g,m,i,r,a,s),E=c(g,m,a,s,o,u),b=c(g,m,o,u,i,r);(v<0||E<0||b<0)&&(v>0||E>0||b>0)||this.px(x,_,t,0,-.2,.98)}}shape(e,t,i={}){return this.fillMask(Dl(this.w,this.h,Ll(e,!0,i.per||6)),t,i)}limb(e,t,i={}){return this.shape(fh(e,i),t,i)}fillMask(e,t,{group:i=1,line:r=!1,depth:a=0,round:s=1,onlyOn:o=null,keepNormals:u=!1,tilt:c=[0,0],lineMat:h=l.LINE}={}){const{w:f,h:d}=this;if(o)for(let g=0;g<f*d;g++)e[g]&&!o.has(this.m[g])&&(e[g]=0);const{vx:p,vy:_}=ph(f,d,e);let x=a;if(!x){for(let g=0;g<f*d;g++)e[g]&&(x=Math.max(x,Math.hypot(p[g],_[g])));x=Math.max(1.5,Math.min(x*.9,2.5+x*.35))}for(let g=0;g<d;g++)for(let m=0;m<f;m++){const v=g*f+m;if(!e[v])continue;if(u){this.m[v]=t;continue}const E=Math.hypot(p[v],_[v]),b=Math.min(1,Math.max(0,(E-.5)/x)),R=Math.min(2.6,(1-b)/Math.sqrt(Math.max(.02,1-(1-b)*(1-b))))*s;let A=p[v]/(E||1)*R+c[0],D=_[v]/(E||1)*R+c[1];const S=Math.hypot(A,D,1);this.m[v]=t,this.n[v*3]=A/S,this.n[v*3+1]=D/S,this.n[v*3+2]=1/S}if(r&&!u){const g=[];for(let m=0;m<d;m++)for(let v=0;v<f;v++){const E=m*f+v;if(e[E])for(const[b,R]of[[1,0],[-1,0],[0,1],[0,-1]]){const A=v+b,D=m+R;if(A<0||D<0||A>=f||D>=d)continue;const S=D*f+A;if(!e[S]&&this.m[S]&&this.g[S]!==i&&this.m[S]!==h){g.push(E);break}}}for(const m of g)this.m[m]=h}if(!u)for(let g=0;g<f*d;g++)e[g]&&(this.g[g]=i);return e}mark(e,t,i,r={}){return this.fillMask(Dl(this.w,this.h,Ll(e,!0,6)),t,{...r,onlyOn:new Set(i),keepNormals:!0})}grid(e,t,i=0,r=0,{round:a=1,flipX:s=!1}={}){const o=Math.max(...e.map(h=>h.length)),u=new Uint8Array(this.w*this.h),c=new Map;e.forEach((h,f)=>[...h].forEach((d,p)=>{const _=t[d];if(!_)return;const x=i+(s?o-1-p:p),g=r+f;this.inb(x,g)&&(u[g*this.w+x]=1,c.set(g*this.w+x,_))})),this.fillMask(u,l.BODY,{round:a,depth:2.5});for(const[h,f]of c)this.m[h]=f}}function Ar(n,e,t,i=t.outline,r=Hc){const{w:a,h:s}=n,o=()=>r(a,s),u=o(),c=o(),h=o(),f=u.getContext("2d").createImageData(a,s),d=c.getContext("2d").createImageData(a,s),p=h.getContext("2d").createImageData(a,s),_=i==="none"?null:i==="dark"?[22,18,30]:"tint";for(let x=0;x<s;x++)for(let g=0;g<a;g++){const m=x*a+g,v=n.m[m],E=m*4;if(!v){if(!_)continue;const S=[n.get(g+1,x),n.get(g-1,x),n.get(g,x+1),n.get(g,x-1)].find(I=>I);if(!S)continue;const T=_==="tint"?(e[S]||[0,0,0]).map(I=>I*.35|0):_;f.data.set([...T,255],E),d.data.set([128,128,255,255],E),p.data.set([128,128,255,255],E);continue}let b=e[v];v===l.LINE&&!b&&(b=_==="tint"||!_?(e[l.BODY2]||[0,0,0]).map(S=>S*.55|0):_),b=b||[255,0,255],f.data.set([...b,dh.has(v)?254:255],E);const R=n.n[m*3],A=n.n[m*3+1],D=n.n[m*3+2];d.data.set([R*127+128,A*127+128,D*255,255],E),p.data.set([-R*127+128,A*127+128,D*255,255],E)}return u.getContext("2d").putImageData(f,0,0),c.getContext("2d").putImageData(d,0,0),h.getContext("2d").putImageData(p,0,0),{A:u,N:c,NF:h,w:a,h:s}}const Li=n=>{const e=Math.hypot(n[0],n[1],n[2])||1;return[n[0]/e,n[1]/e,n[2]/e]},Jr=(n,e)=>[n[1]*e[2]-n[2]*e[1],n[2]*e[0]-n[0]*e[2],n[0]*e[1]-n[1]*e[0]],Pt=(n,e)=>n[0]*e[0]+n[1]*e[1]+n[2]*e[2],En=(n,e)=>[n[0]-e[0],n[1]-e[1],n[2]-e[2]],w={add:(n,e)=>[n[0]+e[0],n[1]+e[1],n[2]+e[2]],sub:En,mul:(n,e)=>[n[0]*e,n[1]*e,n[2]*e],lerp:(n,e,t)=>[n[0]+(e[0]-n[0])*t,n[1]+(e[1]-n[1])*t,n[2]+(e[2]-n[2])*t],norm:Li,cross:Jr,dot:Pt};function Pl(n,e=[0,1,0]){const t=Li(n);let i=Jr(e,t);Math.hypot(...i)<1e-4&&(i=Jr([0,0,1],t)),i=Li(i);const r=Jr(t,i);return[t,r,i]}function Vc(n,e){const t=Pt(n,e.axes[0]),i=Pt(n,e.axes[1]),r=Pt(n,e.axes[2]),[a,s,o]=e.r,u=Math.hypot(t/a,i/s,r/o),c=Math.hypot(t/(a*a),i/(s*s),r/(o*o));return c>1e-9?u*(u-1)/c:-Math.min(a,s,o)}function Wc(n,e){const{ba:t,l2:i,rr:r,a2:a,il2:s,r1:o,r2:u}=e,c=Pt(n,t),h=c-i,f=[n[0]*i-t[0]*c,n[1]*i-t[1]*c,n[2]*i-t[2]*c],d=Pt(f,f),p=c*c*i,_=h*h*i,x=Math.sign(r)*r*r*d;return Math.sign(h)*a*_>x?Math.sqrt(d+_)*s-u:Math.sign(c)*a*p<x?Math.sqrt(d+p)*s-o:(Math.sqrt(d*a*s)+c*r)*s-o}function Yc(n,e){const t=Math.abs(Pt(n,e.axes[0]))-e.h[0]+e.round,i=Math.abs(Pt(n,e.axes[1]))-e.h[1]+e.round,r=Math.abs(Pt(n,e.axes[2]))-e.h[2]+e.round;return Math.hypot(Math.max(t,0),Math.max(i,0),Math.max(r,0))+Math.min(Math.max(t,i,r),0)-e.round}const mh=(n,e)=>e*(Math.sin(n[0]*23+n[1]*7)*Math.sin(n[1]*19-n[2]*11)+.5*Math.sin(n[2]*41+n[0]*29)),Il=(n,e)=>n.type==="ell"?Vc(En(e,n.cw),n):n.type==="box"?Yc(En(e,n.cw),n):Wc(En(e,n.aw),n),Or=(n,e)=>n.rough?Il(n,e)+mh(e,n.rough):Il(n,e);class je{constructor({blend:e=.07}={}){this.parts=[],this.flats=[],this.blend=e,this.anchors={feet:[]}}ell(e,t,i,r={}){const a=r.axes||(r.dir?Pl(r.dir,r.up):[[1,0,0],[0,1,0],[0,0,1]]);return this.parts.push({type:"ell",c:e,r:t,axes:a,mat:i,group:r.group??1,extra:!!r.extra,paint:r.paint,rough:r.rough,cut:!!r.cut}),this}box(e,t,i,r={}){const a=r.axes||(r.dir?Pl(r.dir,r.up):[[1,0,0],[0,1,0],[0,0,1]]);return this.parts.push({type:"box",c:e,h:t,round:Math.min(r.round??.02,...t),axes:a,mat:i,group:r.group??1,extra:!!r.extra,paint:r.paint,rough:r.rough,cut:!!r.cut}),this}seg(e,t,i,r,a,s={}){return this.parts.push({type:"cone",a:e,b:t,r1:i,r2:r,mat:a,group:s.group??1,extra:!!s.extra,paint:s.paint,rough:s.rough,cut:!!s.cut}),this}chain(e,t,i={}){for(let r=0;r+1<e.length;r++)this.seg(e[r].slice(0,3),e[r+1].slice(0,3),e[r][3],e[r+1][3],t,i);return this}flat(e,t,i,r,a,s,o={}){return this.flats.push({c:e,u:Li(t),v:Li(i),su:r,sv:a,mask:s,group:o.group??30,extra:!!o.extra,bend:o.bend??.35}),this}field(e){let t=1/0;for(const i of this.parts){if(i.extra||i.cut)continue;let r;if(i.type==="ell")r=Vc(En(e,i.c),i);else if(i.type==="box")r=Yc(En(e,i.c),i);else{const a=En(i.b,i.a),s=Math.max(1e-9,Pt(a,a)),o=i.r1-i.r2;r=Wc(En(e,i.a),{ba:a,l2:s,rr:o,a2:s-o*o,il2:1/s,r1:i.r1,r2:i.r2})}r<t&&(t=r)}return t}static surface(e,t,i){const r=1/Math.hypot(i[0]/t[0],i[1]/t[1],i[2]/t[2]);return[e[0]+i[0]*r,e[1]+i[1]*r,e[2]+i[2]*r]}}const Nl={towards:.6,away:-.6},gh=.52;function qi(n,{height:e,scale:t,facing:i="towards",yaw:r=Nl[i]??Nl.towards,pitch:a=gh,lineGap:s=.12}={}){const o=Math.cos(r),u=Math.sin(r),c=Math.cos(a),h=Math.sin(a),f=G=>[G[0]*o-G[2]*u,G[1],G[0]*u+G[2]*o],d=G=>[G[0]*o+G[2]*u,G[1],-G[0]*u+G[2]*o],p=[0,-h,-c],_=[0,c,-h],x=[1,0,0],g=[0,h,c],m=n.blend,v=n.parts.map(G=>{if(G.type==="ell"){const Ue=f(G.c),Ye=G.axes.map(f),We=Math.max(...G.r);return{...G,cw:Ue,axes:Ye,bc:Ue,br:We+(G.rough||0)*1.5}}if(G.type==="box"){const Ue=f(G.c),Ye=G.axes.map(f);return{...G,cw:Ue,axes:Ye,bc:Ue,br:Math.hypot(...G.h)+(G.rough||0)*1.5}}const ue=f(G.a),se=f(G.b),ye=En(se,ue),Ze=Math.max(1e-9,Pt(ye,ye)),Ce=G.r1-G.r2;return{...G,aw:ue,ba:ye,l2:Ze,rr:Ce,a2:Ze-Ce*Ce,il2:1/Ze,bc:w.lerp(ue,se,.5),br:Math.sqrt(Ze)/2+Math.max(G.r1,G.r2)}}),E=n.flats.map(G=>{const ue=f(G.c),se=f(G.u),ye=f(G.v);return{...G,cw:ue,uw:se,vw:ye,nw:Li(Jr(se,ye)),bc:ue,br:Math.hypot(G.su,G.sv)}}),b=[...v,...E],R=G=>{const ue=Pt(G.bc,x),se=Pt(G.bc,_),ye=G.br+(G.uw?0:m);return[ue-ye,ue+ye,se-ye,se+ye]};for(const G of b)[G.x0,G.x1,G.u0,G.u1]=R(G);const A=b.filter(G=>!G.extra&&!G.cut),D=Math.min(...A.map(G=>G.u0+(G.uw?0:m))),S=Math.max(...A.map(G=>G.u1-(G.uw?0:m))),T=t??e/Math.max(1e-6,S-D),I=Math.min(...b.map(G=>G.x0)),C=Math.max(...b.map(G=>G.x1)),F=Math.min(...b.map(G=>G.u0)),O=Math.max(...b.map(G=>G.u1)),P=Math.ceil((C-I)*T)+4,B=Math.ceil((O-F)*T)+2,W=new on(P,B),$=new Float32Array(P*B).fill(1/0),ae=new Int16Array(P*B).fill(-1),q=8,ee=Math.ceil(P/q),N=Math.ceil(B/q),re=Array.from({length:ee*N},()=>[]);b.forEach((G,ue)=>{const se=Math.max(0,Math.floor((G.x0-I)*T/q)),ye=Math.min(ee-1,Math.floor(((G.x1-I)*T+2)/q)),Ze=Math.max(0,Math.floor((O-G.u1)*T/q)),Ce=Math.min(N-1,Math.floor(((O-G.u0)*T+1)/q));for(let Ue=Ze;Ue<=Ce;Ue++)for(let Ye=se;Ye<=ye;Ye++)re[Ue*ee+Ye].push(ue)});const ce=.25/T,Re=(G,ue)=>{const se=Math.max(m-Math.abs(G-ue),0)/m;return Math.min(G,ue)-se*se*m*.25};for(let G=0;G<B;G++)for(let ue=0;ue<P;ue++){const se=re[Math.floor(G/q)*ee+Math.floor(ue/q)];if(!se.length)continue;const ye=I+(ue+.5-1)/T,Ze=O-(G+.5)/T,Ce=w.add(w.add(w.mul(x,ye),w.mul(_,Ze)),w.mul(g,50));let Ue=1/0,Ye=-1/0;const We=[],vt=[];for(const $e of se){const ke=b[$e],L=En(Ce,ke.bc),M=Pt(L,p),U=ke.br+(ke.uw?0:m),V=Pt(L,L)-U*U,Z=M*M-V;if(Z<0)continue;if(ke.uw){vt.push(ke);continue}if(ke.cut){We.push(ke);continue}const le=Math.sqrt(Z);Ue=Math.min(Ue,-M-le),Ye=Math.max(Ye,-M+le),We.push(ke)}let Dt=1/0,Yt=-1,_t=0,St=null;if(We.length){const $e=new Map;for(const M of We){let U=$e.get(M.group);U||$e.set(M.group,U=[]),U.push(M)}const ke=(M,U)=>{let V=1/0;for(const Z of M)Z.cut||(V=V===1/0?Or(Z,U):Re(V,Or(Z,U)));for(const Z of M)Z.cut&&(V=Math.max(V,-Or(Z,U)));return V};let L=Math.max(0,Ue);for(let M=0;M<96&&L<Ye;M++){const U=w.add(Ce,w.mul(p,L));let V=1/0,Z=null;for(const[le,he]of $e){const Q=ke(he,U);Q<V&&(V=Q,Z=le)}if(V<ce){const le=$e.get(Z),he=.5/T;St=Li([ke(le,[U[0]+he,U[1],U[2]])-ke(le,[U[0]-he,U[1],U[2]]),ke(le,[U[0],U[1]+he,U[2]])-ke(le,[U[0],U[1]-he,U[2]]),ke(le,[U[0],U[1],U[2]+he])-ke(le,[U[0],U[1],U[2]-he])]);let Q=le[0],te=1/0;for(const de of le){if(de.cut)continue;const Le=Or(de,U);Le<te&&(te=Le,Q=de)}for(const de of le)if(de.cut&&-Or(de,U)>te-ce*2){Q=de;break}Dt=L,Yt=Z,_t=Q.paint?Q.paint(d(U),Q)??Q.mat:Q.mat;break}L+=Math.max(V*.9,ce*.5)}}for(const $e of vt){const ke=Pt(p,$e.nw);if(Math.abs(ke)<1e-4)continue;const L=Pt(En($e.cw,Ce),$e.nw)/ke;if(L>=Dt)continue;const M=w.add(Ce,w.mul(p,L)),U=En(M,$e.cw),V=Pt(U,$e.uw)/$e.su,Z=Pt(U,$e.vw)/$e.sv;if(Math.abs(V)>1||Math.abs(Z)>1)continue;const le=$e.mask(V,Z);if(!le)continue;let he=ke>0?w.mul($e.nw,-1):$e.nw;he=Li(w.add(he,w.add(w.mul($e.uw,V*$e.bend),w.mul($e.vw,Z*$e.bend*.5)))),Dt=L,Yt=$e.group,_t=le,St=he}if(!St||!_t)continue;const z=G*P+ue;$[z]=Dt,ae[z]=Yt,W.px(ue,G,_t,Pt(St,x),-Pt(St,_),Pt(St,g))}const Fe=[];for(let G=0;G<B;G++)for(let ue=0;ue<P;ue++){const se=G*P+ue;if(W.m[se])for(const[ye,Ze]of[[1,0],[-1,0],[0,1],[0,-1]]){const Ce=ue+ye,Ue=G+Ze;if(Ce<0||Ue<0||Ce>=P||Ue>=B)continue;const Ye=Ue*P+Ce;if(W.m[Ye]&&ae[Ye]!==ae[se]&&$[Ye]-$[se]>s){Fe.push(se);break}}}for(const G of Fe)[l.EYE,l.GLINT,l.MAGIC,l.MAGIC2,l.NOSE,l.COLLAR,l.WOKEN,l.RUNE,l.GLOW].includes(W.m[G])||(W.m[G]=l.LINE);for(let G=0;G<B;G++)for(let ue=0;ue<P;ue++){const se=G*P+ue;if(W.m[se]!==l.EYE)continue;const ye=G>0&&W.m[se-P]===l.EYE,Ze=ue>0&&W.m[se-1]===l.EYE,Ce=ue+1<P&&W.m[se+1]===l.EYE&&G+1<B&&W.m[se+P]===l.EYE;!ye&&!Ze&&Ce&&(W.m[se]=l.GLINT)}let ze=-1;for(let G=B-1;G>=0&&ze<0;G--)for(let ue=0;ue<P;ue++)if(W.m[G*P+ue]){ze=G;break}const j=ze>=0&&ze<B-1?B-1-ze:0;if(ze>=0&&ze<B-1){const G=B-1-ze;for(let ue=B-1;ue>=0;ue--)for(let se=0;se<P;se++){const ye=ue*P+se,Ze=(ue-G)*P+se,Ce=ue-G>=0;W.m[ye]=Ce?W.m[Ze]:0,W.g[ye]=Ce?W.g[Ze]:0;for(let Ue=0;Ue<3;Ue++)W.n[ye*3+Ue]=Ce?W.n[Ze*3+Ue]:0}}return W.bodyH=Math.round((S-D)*T),{sp:W,s:T,project:G=>{const ue=f(G);return[+((ue[0]-I)*T+1).toFixed(1),+((O-Pt(ue,_))*T+j).toFixed(1)]}}}const Un=(n,e=9,t=.3)=>dn(Math.floor(n[0]*e),Math.floor(n[1]*e)+Math.floor(n[2]*e)*97,7)<t,Tr={wing:(n,e)=>(t,i)=>{const r=(t+1)/2,a=1-.35*r*r,s=-1+.55*r+.18*Math.abs(Math.sin(r*Math.PI*6));return i>a||i<s?null:i>a-.35*(1-r*.5)?e:Math.floor(r*9)%2?n:e},ear:(n,e=l.EAR,t=l.BODY3)=>(i,r)=>{const a=(r+1)/2,s=.95*Math.sin(Math.PI*Math.min(1,.15+a*.85))*(1-a*.35);return Math.abs(i)>s?null:a>.82?t:Math.abs(i)<s*.5&&a<.7&&a>.12?e:n},flame:(n,e)=>(t,i)=>{const r=(i+1)/2,a=Math.sin(Math.PI*Math.min(1,r*1.1))*(1-r)*1.4;return Math.abs(t)>a?null:Math.abs(t)<a*.45&&r<.6?e:n},membrane:n=>(e,t)=>{const i=(e+1)/2,r=-1+.35*Math.abs(Math.sin(i*Math.PI*3));return t<r||t>1-.2*i?null:n},spotted:(n,e,t)=>(i,r)=>{if(Math.hypot(i,r*1.2)>1)return null;const s=Math.hypot(i-.35,r-.1);return s<.18?t:s<.3?e:n}},_h={hair:l.HAIR,hat:l.HAT,headphones:l.PHONES,top:l.TOP,jacket:l.JACKET,jeans:l.JEANS,sneakers:l.SHOES,broom:l.BROOM,bristles:l.STRAW,skin:l.SKIN},Ul={hair:[.01,.7,.85],hat:[.74,.45,.45],headphones:[.92,.55,.9],top:[.13,.15,.95],jacket:[.72,.45,.7],jeans:[.6,.5,.7],sneakers:[0,0,.95],broom:[.08,.55,.55],bristles:[.12,.55,.9],skin:[.07,.3,.94]};function xh(n,e=Ul){const t={...Ul,...e},i={hair:n.hairHue,jacket:n.cloakHue,hat:n.hatHue,top:n.topHue,jeans:n.jeansHue,sneakers:n.shoeHue,headphones:n.phonesHue},r={};for(const[a,s]of Object.entries(_h)){const[o,u,c]=t[a];r[s]=Me(i[a]??o,u,c)}return r[l.EYE]=[24,18,30],r[l.GLINT]=[255,255,245],r[l.NOSE]=[20,16,24],r[l.MAGIC]=Me(n.glowHue??.13,.5,1),r[l.MAGIC2]=Me(n.glowHue??.13,.15,1),r[l.BELLY]=[245,245,240],r}const Mh={rise:.78,descend:-.66,brake:.44};function vh(n){const e=new je({blend:.03}),t=n%3,i=.5,r=.05,a=[[0,.02,-.01],[.02,-.01,.02],[-.01,.015,.01]][t],s=_=>i-r*(_/.62);e.seg([-.5,s(-.5),0],[.62,s(.62),0],.022,.018,l.BROOM,{group:2}),e.ell([-.64,s(-.64)+.005,0],[.2,.1,.11],l.STRAW,{dir:[1,r*1.6,0],group:3,paint:_=>_[0]<-.76?l.MAGIC2:_[0]>-.5?l.BROOM:void 0});const o=[-1,1].map(_=>[.5,s(.5)+.03,_*.045]),u=[-1,1].map(_=>[.2,i+.24+a[1],_*.1]);for(const _ of[0,1]){const x=_?1:-1,g=x>0?7:5;e.seg(u[_],o[_],.04,.03,l.JACKET,{group:g}),e.ell(o[_],[.035,.03,.035],l.SKIN,{group:g})}const c=[.3+a[0],i+.27+a[1],0],h=[.07,i+.28+a[1]*.5,0],f=[-.15,i+.35+a[2],0];e.ell(h,[.17,.1,.11],l.JACKET,{dir:[1,-.25,0],group:1,paint:_=>_[1]<h[1]-.04&&Math.abs(_[2])<.055?l.TOP:void 0}),e.ell(f,[.11,.08,.1],l.JEANS,{dir:[1,-.3,0],group:1}),e.chain([[...w.add(f,[-.02,.06,0]),.07],[...w.add(f,[-.18,.08+a[0]*2,0]),.05],[...w.add(f,[-.34,.05+a[1]*3,.02]),.025]],l.JACKET,{group:12}),[[[-.32,i+.5+a[1]*2,-.07],[-.46,i+.38+a[0]*2,-.08]],[[-.34,i+.33+a[2]*2,.08],[-.55,i+.44-a[1]*3,.1]]].forEach(([_,x],g)=>{const m=g?6:4,v=w.add(f,[-.04,0,g?.06:-.06]);e.seg(v,_,.055,.045,l.JEANS,{group:m}),e.seg(_,x,.045,.04,l.JEANS,{group:m}),e.ell(w.add(x,[-.05,0,0]),[.08,.04,.045],l.SHOES,{dir:[-1,.3,0],group:m,paint:E=>E[1]<x[1]-.03?l.BELLY:void 0})}),e.ell(c,[.11,.115,.1],l.SKIN,{group:8,paint:_=>_[0]<c[0]-.01||_[1]>c[1]+.075?l.HAIR:void 0});for(const _ of[-1,1]){const x=je.surface(c,[.11,.115,.1],w.norm([.85,.1,_*.45]));e.ell(x,[.026,.036,.026],l.BELLY,{group:8}),e.ell(w.add(x,[.012,0,_*.004]),[.014,.018,.014],l.EYE,{group:8})}e.ell(je.surface(c,[.11,.115,.1],w.norm([1,-.45,0])),[.012,.016,.04],l.BELLY,{group:8}),e.chain([[...w.add(c,[-.06,.03,0]),.065],[...w.add(c,[-.22,.05+a[1]*2,.01]),.05],[...w.add(c,[-.4,.06+a[2]*3,.02]),.03],[...w.add(c,[-.55,.07+a[0]*3,.02]),.012]],l.HAIR,{group:9});for(const _ of[-1,1])e.ell(w.add(c,[-.015,0,_*.105]),[.05,.055,.03],l.PHONES,{group:10});e.chain([[...w.add(c,[-.005,.03,-.095]),.015],[...w.add(c,[-.02,.12,0]),.015],[...w.add(c,[-.005,.03,.095]),.015]],l.PHONES,{group:10});const p=w.add(c,[-.1+a[0],.2+a[1]*2,0]);e.ell(p,[.16,.014,.15],l.HAT,{dir:[1,.9,0],group:11}),e.chain([[...w.add(p,[-.02,.02,0]),.08],[...w.add(p,[-.14,.13,0]),.04],[...w.add(p,[-.3,.14+a[2]*2,0]),.012]],l.HAT,{group:11,paint:_=>Math.hypot(_[0]-p[0],_[1]-p[1])<.06?l.MAGIC:void 0}),e.seg(w.add(p,[.08,-.02,.08]),w.add(c,[.04,-.09,.08]),.008,.008,l.HAT,{group:11});for(const[_,x,g,m]of[[-.86,s(-.8)+.05,.03,.22],[-.88,s(-.8)-.04,-.04,.16],[-.7,i+.45,.05,.14],[-.2,i+.5,-.04,.12]]){const v=t*.05%.1;e.seg([_-v,x,g],[_-v-m,x,g],.01,.004,l.MAGIC2,{group:30,extra:!0})}return e.ell([.02,.005,0],[.2,.005,.12],l.NOSE,{group:0}),e}const Sh={stand:{frames:3,fps:3},land:{frames:3,fps:10},takeoff:{frames:3,fps:10},talk:{frames:4,fps:2.5},placeSigil:{frames:3,fps:6},liftSigil:{frames:3,fps:6},sit:{frames:2,fps:1.5}},io=.34,Xc={binding:[-.02,.31,-.2],dir:[.02,1,-.04]},bh={stand:[0,1,2].map(n=>({breathe:[0,.006,.012][n],sway:[0,.02,.035][n],free:[.04,.5+[0,.006,.012][n],.18],hand:"rest",broom:Xc})),land:[{crouch:.2,hop:.01,broom:{astride:!0},sway:.05},{crouch:.1,bend:.1,broom:{binding:[-.28,.26,-.08],dir:[.6,.5,-.06]},legUp:[.18,.24,.12],sway:.03,free:[.2,.58,.2],hand:"rest"},{breathe:.004,broom:{binding:[.06,.31,-.2],dir:[.18,1,-.03]},sway:.015,free:[.06,.52,.19],hand:"rest"}],takeoff:[{crouch:.1,broom:{binding:[-.1,.3,-.17],dir:[.35,.7,-.04]},free:[.16,.58,.2],hand:"rest",sway:.02},{crouch:.15,bend:.1,broom:{binding:[-.3,.28,-.06],dir:[.7,.4,-.04]},legUp:[.1,.26,.13],sway:.04,free:[.24,.55,.17],hand:"rest"},{hop:.1,broom:{astride:!0},toes:!0,sway:.06}],talk:[{free:[.47,.84,.13],hand:"palm",tilt:.35,mouth:!0,sway:.01},{free:[.32,1.18,.12],hand:"point",tilt:-.25,look:.12,sway:.02},{free:[.24,1.16,.3],elbow:[.26,.88,.26],hand:"wave",tilt:.45,mouth:!0,sway:.03},{free:[.15,.76,.1],hand:"chest",tilt:-.35,breathe:.01,sway:.015}],placeSigil:[{free:[.16,1.62,.1],hand:"palm",look:.22,breathe:.01,sway:.02},{free:[.42,1,.12],hand:"palm",look:.08,sway:.03},{crouch:.7,bend:.55,free:[.38,.1,.13],hand:"down",look:-.08,sway:.04}],liftSigil:[{crouch:.7,bend:.55,free:[.36,.08,.13],hand:"down",look:-.08,sway:.02},{crouch:.25,bend:.18,free:[.44,.82,.12],hand:"palm",look:.05,sway:.04},{breathe:.012,free:[.2,1.64,.1],hand:"palm",look:.25,sway:.05,toes:!0}],sit:[0,1].map(n=>({sit:!0,swing:[.06,-.06][n],bend:-.08,look:[.02,.1][n],tilt:[.15,-.2][n],sway:[.01,.03][n],breathe:[0,.008][n],broom:{binding:[-.24,.31,-.3],dir:[.32,1,-.06]},free:[.2,io+.14,.15],far:[.18,io+.14,-.13],hand:"rest"}))};function Eh(n,e,t){const i=Math.hypot(e[0]-n[0],e[1]-n[1]),r=w.lerp(n,e,.5);if(i>=2*t)return r;const a=Math.sqrt(t*t-i*i/4),s=(e[0]-n[0])/i,o=(e[1]-n[1])/i;return[r[0]-o*a,r[1]+s*a,r[2]]}function yh(n,e){const t=bh[n],i={crouch:0,bend:0,hop:0,breathe:0,sway:0,tilt:0,look:0,broom:Xc,...t[e%t.length]},r=new je({blend:.03}),a=i.hop,s=i.sway,o=i.sit?io+.06:.45-i.crouch*.21+a,u=-i.crouch*.12,c=!!i.broom.astride,h=o-.04,f=c?[1,0,0]:w.norm(i.broom.dir),d=c?[-.36,h,0]:i.broom.binding,p=T=>w.add(d,w.mul(f,T));r.seg(p(0),p(c?.98:1.1),.022,.018,l.BROOM,{group:2}),r.ell(p(-.13),[.17,.07,.08],l.STRAW,{dir:f,group:3,paint:T=>{const I=w.dot(w.sub(T,d),f);return I<-.22?l.MAGIC2:I>-.01?l.BROOM:void 0}});for(const T of[-1,1]){const I=T>0?6:4,C=[u,o,T*.07],F=i.sit?i.swing*T:0,O=i.sit?[.24+F,.09+Math.max(0,F)*.6,T*.1]:T>0&&i.legUp?i.legUp:[(T>0?.05:-.01)+(i.toes?-.03:0),.07+(i.toes?a*.4:a),T*.1],P=i.sit?[.21,o+.01,T*.09]:Eh(C,O,.21);r.seg(C,P,.055,.045,l.JEANS,{group:I}),r.seg(P,O,.045,.04,l.JEANS,{group:I});const B=i.toes?[.03,-.045,0]:[.05,-.03,0];r.ell(w.add(O,B),[.08,.04,.045],l.SHOES,{dir:i.toes?[1,-.6,0]:[1,0,0],group:I,paint:W=>W[1]<O[1]+B[1]-.015?l.BELLY:void 0})}const _=[Math.sin(i.bend),Math.cos(i.bend),0],x=[Math.cos(i.bend),-Math.sin(i.bend),0],g=[u,o+.03,0];r.ell(g,[.1,.08,.105],l.JEANS,{group:1});const m=w.add(g,w.add(w.mul(_,.19),[0,i.breathe,0]));r.ell(m,[.1,.15+i.breathe*.5,.115],l.JACKET,{dir:x,group:1,paint:T=>w.dot(w.sub(T,m),x)>.045&&Math.abs(T[2])<.05?l.TOP:void 0}),r.chain([[...w.add(m,w.add(w.mul(x,-.07),w.mul(_,-.08))),.07],[...w.add(m,w.add(w.mul(x,-.11-s),w.mul(_,-.2))),.05],[...w.add(m,w.add(w.mul(x,-.13-s*1.6),w.mul(_,-.29))),.025]],l.JACKET,{group:12});const v=w.add(m,w.add(w.mul(_,.27),[i.look*.03,0,i.tilt*.04])),E=T=>w.add(m,w.add(w.mul(_,.1),[0,0,T*.12])),b=c?[.28,h+.03,-.05]:p(Math.max(.12,(Math.min(.62,o+.2)-d[1])/Math.max(.3,f[1]))),R=c?[.28,h+.03,.05]:i.free;for(const T of[-1,1]){const I=T>0?7:5,C=E(T),F=T>0?R:i.far||b,O=T>0&&i.elbow?i.elbow:w.add(w.lerp(C,F,.5),[-.03,-.02,T*.05]);r.seg(C,O,.04,.035,l.JACKET,{group:I}),r.seg(O,F,.035,.03,l.JACKET,{group:I});const P=T>0&&!c?i.hand:"grip";if(P==="palm")r.ell(F,[.045,.02,.04],l.SKIN,{group:I});else if(P==="down")r.ell(F,[.045,.02,.04],l.SKIN,{dir:[1,.15,0],group:I});else if(P==="wave"){r.ell(F,[.03,.045,.04],l.SKIN,{group:I});for(const B of[-1,0,1])r.seg(w.add(F,[0,.03,B*.02]),w.add(F,[B*.01,.065,B*.03]),.01,.008,l.SKIN,{group:I})}else P==="point"?(r.ell(F,[.035,.03,.035],l.SKIN,{group:I}),r.seg(w.add(F,[0,.02,0]),w.add(F,[.01,.08,0]),.012,.01,l.SKIN,{group:I})):r.ell(F,[.035,.03,.035],l.SKIN,{group:I})}r.ell(v,[.11,.115,.1],l.SKIN,{group:8,paint:T=>T[0]<v[0]-.01||T[1]>v[1]+.075?l.HAIR:void 0});for(const T of[-1,1])r.ell(je.surface(v,[.11,.115,.1],w.norm([.85,.05+i.look,T*.45+i.tilt*.1])),[.016,.026,.016],l.EYE,{group:8});i.mouth&&r.ell(je.surface(v,[.11,.115,.1],w.norm([1,-.5+i.look,i.tilt*.1])),[.012,.016,.025],l.NOSE,{group:8}),r.chain([[...w.add(v,[-.06,.02,0]),.06],[...w.add(v,[-.12-s,-.12,.02+i.tilt*.03]),.05],[...w.add(v,[-.13-s*1.5,-.25,.03+i.tilt*.04]),.03]],l.HAIR,{group:9});for(const T of[-1,1])r.ell(w.add(v,[-.015,0,T*.105]),[.05,.055,.03],l.PHONES,{group:10});r.chain([[...w.add(v,[-.005,.03,-.095]),.015],[...w.add(v,[-.005,.11,-.05]),.015],[...w.add(v,[-.005,.125,0]),.015],[...w.add(v,[-.005,.11,.05]),.015],[...w.add(v,[-.005,.03,.095]),.015]],l.PHONES,{group:10});const A=w.add(v,[-.03,.1,i.tilt*.02]),D=i.tilt*.05,S=w.add(A,[-.16-s*.5,.27,D*2]);return r.ell(A,[.16,.014,.15],l.HAT,{dir:[1,.25-i.look*.8,i.tilt*.3],group:11}),r.chain([[...w.add(A,[0,.01,0]),.085],[...w.add(A,[-.05,.17,D]),.045],[...S,.012]],l.HAT,{group:11,paint:T=>T[1]<A[1]+.045?l.MAGIC:void 0}),r.ell([.02,.005,0],[.2,.005,.12],l.NOSE,{group:0}),r.anchors.hand=R,r.anchors.hatTip=S,r}function Kc({frame:n=0,lean:e=!1,pose:t}={}){if(t==="fast")return vh(n);if(Sh[t])return yh(t,n);const i=t==="rise",r=t==="descend",a=t==="brake",s=i||r||a,o=new je({blend:.03}),u=s?0:[0,.025,.045][n%3],c=s?0:[0,.015,-.01][n%3]+(e?.08:0),h=.42+u,f=i?.3:r?-.27:a?-.12:e?.1:0,d=Math.min(.1,Math.max(0,f)),p=s?[.02,.06][n%2]:[0,.03,.05][n%3],_=r?1:i?-.6:0;o.seg([-.5,h-c*2,0],[.62,h+c*3,0],.022,.018,l.BROOM,{group:2}),a?o.ell([-.56,h-.08,0],[.17,.07,.09],l.STRAW,{dir:[.55,1,0],group:3,paint:E=>E[1]<h-.18?l.MAGIC2:E[1]>h-.01?l.BROOM:void 0}):o.ell([-.62,h-c*2-.01,0],[.17,.07,.08],l.STRAW,{dir:[1,c,0],group:3,paint:E=>E[0]<-.72?l.MAGIC2:E[0]>-.5?l.BROOM:void 0});for(const E of[-1,1]){const b=[-.04,h+.06,E*.07],R=a?[.18,h-.01,E*.14]:r?[.16,h-.05,E*.14]:i?[.06,h-.07,E*.14]:[.12+f*.5,h-.02,E*.14],A=a?E>0?[.44,h-.02+p,E*.13]:[.3,h-.16,E*.13]:r?[.2,h-.26,E*.13]:i?[-.1,h-.23,E*.13]:[.08+f,h-.2,E*.13];o.seg(b,R,.055,.045,l.JEANS,{group:E>0?6:4}),o.seg(R,A,.045,.04,l.JEANS,{group:E>0?6:4}),o.ell(w.add(A,[.05,-.02,0]),[.08,.04,.045],l.SHOES,{group:E>0?6:4,paint:D=>D[1]<A[1]-.04?l.BELLY:void 0})}o.ell([-.04,h+.08,0],[.11,.07,.1],l.JEANS,{group:1});const x=[0+f*.8,h+.26-Math.abs(f)*.3,0];o.ell(x,[.1,.16,.11],l.JACKET,{dir:[f*2.5,1,0],up:[-1,0,0],group:1,paint:E=>E[0]>x[0]+.04&&Math.abs(E[2])<.055?l.TOP:void 0}),a?o.chain([[...w.add(x,[-.08,-.06,0]),.07],[...w.add(x,[-.02,.12+p,.02]),.05],[...w.add(x,[.14,.18+p,.03]),.025]],l.JACKET,{group:12}):s&&o.chain([[...w.add(x,[-.08,-.1,0]),.07],[...w.add(x,[-.2,-.12+_*(.08+p),0]),.05],[...w.add(x,[-.3,-.12+_*(.16+p*1.5),.02]),.025]],l.JACKET,{group:12});const g=w.add(x,[.03+f*.5,.26,0]),m=w.add(g,[a?.05:r?-.01:-.03,a?.06:.1,0]);for(const E of[-1,1]){const b=w.add(x,[.01,.11,E*.11]),R=r&&E>0?w.add(m,[.1,.01,.1]):a?[.3,h+.03,E*.05]:[.26+f,h+.03,E*.05],A=r&&E>0?w.add(b,[.1,.02,.1]):w.lerp(b,R,.5);o.seg(b,A,.04,.035,l.JACKET,{group:E>0?7:5}),o.seg(A,R,.035,.03,l.JACKET,{group:E>0?7:5}),o.ell(R,[.035,.03,.035],l.SKIN,{group:E>0?7:5})}o.ell(g,[.11,.115,.1],l.SKIN,{group:8,paint:E=>E[0]<g[0]-.01||E[1]>g[1]+.075?l.HAIR:void 0});for(const E of[-1,1])o.ell(je.surface(g,[.11,.115,.1],w.norm([.85,.05,E*.45])),[.016,.026,.016],l.EYE,{group:8});a?o.chain([[...w.add(g,[-.06,.06,0]),.06],[...w.add(g,[.04,.13+p,.03]),.045],[...w.add(g,[.2,.08+p,.04]),.02]],l.HAIR,{group:9}):o.chain([[...w.add(g,[-.06,.02,0]),.06],[...w.add(g,[-.18-d,-.05+p+_*.1,.02]),.045],[...w.add(g,[-.3-d*1.5,-.08+p*1.6+_*.22,.03]),.02]],l.HAIR,{group:9});for(const E of[-1,1])o.ell(w.add(g,[-.015,0,E*.105]),[.05,.055,.03],l.PHONES,{group:10});o.chain([[...w.add(g,[-.005,.03,-.095]),.015],[...w.add(g,[-.005,.11,-.05]),.015],[...w.add(g,[-.005,.125,0]),.015],[...w.add(g,[-.005,.11,.05]),.015],[...w.add(g,[-.005,.03,.095]),.015]],l.PHONES,{group:10});const v=i?.1:0;if(o.ell(m,[.16,.014,.15],l.HAT,{dir:a?[1,-.55,0]:[1,.25+v*3,0],group:11}),o.chain(a?[[...w.add(m,[0,.01,0]),.085],[...w.add(m,[.06,.16,0]),.045],[...w.add(m,[.2,.22+p*.5,0]),.012]]:[[...w.add(m,[0,.01,0]),.085],[...w.add(m,[-.05-d-v*.5,.17-v*.3,0]),.045],[...w.add(m,[-.16-d*1.5-v,.27+p*.5-v*.5,0]),.012]],l.HAT,{group:11,paint:E=>E[1]<m[1]+.045?l.MAGIC:void 0}),s){const E=Mh[t]+(a?[0,.06][n%2]:0),b=Math.cos(E),R=Math.sin(E),A=[0,h,0],D=C=>[A[0]+(C[0]-A[0])*b-(C[1]-A[1])*R,A[1]+(C[0]-A[0])*R+(C[1]-A[1])*b,C[2]],S=C=>[A[0]+(C[0]-A[0])*b+(C[1]-A[1])*R,A[1]-(C[0]-A[0])*R+(C[1]-A[1])*b,C[2]],T=C=>[C[0]*b-C[1]*R,C[0]*R+C[1]*b,C[2]];for(const C of o.parts)if(C.type==="ell"?(C.c=D(C.c),C.axes=C.axes.map(T)):(C.a=D(C.a),C.b=D(C.b)),C.paint){const F=C.paint;C.paint=(O,P)=>F(S(O),P)}for(const C of o.flats)C.c=D(C.c),C.u=T(C.u),C.v=T(C.v);const I=Math.min(...o.parts.map(C=>C.type==="ell"?C.c[1]-Math.max(...C.r):Math.min(C.a[1]-C.r1,C.b[1]-C.r2)));if(I<.08)for(const C of o.parts){const F=.08-I;C.type==="ell"?C.c=[C.c[0],C.c[1]+F,C.c[2]]:(C.a=[C.a[0],C.a[1]+F,C.a[2]],C.b=[C.b[0],C.b[1]+F,C.b[2]])}if(a){const C=D([-.45,h-.24,0]);for(let F=0;F<5;F++){const O=F+n*.5,P=.055-F*.008;o.ell([C[0]+.1+O*.08,Math.max(.04,C[1]-.02+Math.sin(O*1.9)*.04),Math.cos(O*1.3)*.06],[P,P*.8,P],F<2?l.BELLY:F%2?l.MAGIC:l.MAGIC2,{group:25+F,extra:!0})}}if(i){const C=D([-.8,h,0]);for(let F=0;F<5;F++){const O=F+n*.5,P=.05-F*.007;o.ell([C[0]-.02+Math.sin(O*2.1)*.06,Math.max(.04,C[1]-.08-O*.09),Math.cos(O*1.7)*.05],[P,P,P],F%2?l.MAGIC:l.MAGIC2,{group:20+F,extra:!0})}}}return o.ell([.02,.005,0],[.2,.005,.12],l.NOSE,{group:0}),o}const qc=(n={})=>Math.round((n.size||8)*Math.sqrt(n.growth||20)*(2/(n.pixel||3))*1.9),vs=new Map,Zc=n=>(vs.has(n)||vs.set(n,qi(Kc({frame:0}),{height:n}).s),vs.get(n)),wh=(n={})=>Zc(qc(n));function Ah(n={},{frame:e=0,lean:t=!1,facing:i="towards",pose:r}={}){const a=qc(n),s=Kc({frame:e,lean:t,pose:r}),{sp:o,project:u}=r?qi(s,{scale:Zc(a),facing:i}):qi(s,{height:a,facing:i});s.anchors.hand&&(o.anchors={hand:u(s.anchors.hand),hatTip:u(s.anchors.hatTip)});let c=0;for(let h=0;h<400&&c<6;h++){const f=h*37%o.w,d=h*53%Math.floor(o.h*.8);o.get(f,d)||o.get(f+1,d)||o.get(f-1,d)||o.get(f,d+1)||o.get(f,d-1)||(f*7+d*13+e*5)%11||(o.px(f,d,l.MAGIC2),c++)}return o}const it=(n,e=0)=>{const t=Math.sin(n*127.1+e*311.7)*43758.5453;return t-Math.floor(t)},_r=n=>{const e=it(Math.floor(n[0]*14)+Math.floor(n[2]*14)*13,Math.floor(n[1]*6));return e<.14?l.BARKD:e>.88?l.BARKL:void 0},Th=n=>e=>{const t=it(Math.floor(e[0]*10),Math.floor(e[1]*10)+Math.floor(e[2]*10)*7);return e[1]<n[1]-.2||t<.2?l.LEAF3:t>.8?l.LEAF2:void 0},ni=(n,e,t,i,r=!0)=>n.ell(e,t,l.STONE,{group:i,rough:.025,paint:a=>a[1]>e[1]+t[1]*.45&&r?l.MOSS:Math.abs(Math.sin(a[0]*13+a[2]*7))<.06?l.STONED:void 0}),da=(n,e,t,i)=>n.ell(e,t,l.LEAF,{group:i,rough:.04,paint:Th(e)}),qt=(n,e,t)=>n.chain(e,l.TRUNK,{group:t,rough:.012,paint:_r}),fa=(n,e,t,i,r,a=.3,s=l.LEAF2)=>{for(let o=0;o<e;o++){const u=it(r,o)*6.283,c=t*Math.sqrt(it(o,r)),h=Math.cos(u)*c,f=Math.sin(u)*c*.7;n.ell([h,a*.3,f],[.07,a*(.35+it(o,4)*.3),.07],s,{group:i+o%3,paint:d=>d[1]>a*.45?l.LEAF:void 0})}},pa=(n,e,t,i)=>n.ell(e,[t[0],.015,t[1]],l.WATER,{group:i}),Rh={"sleeping-giant"(n){const e=t=>i=>{const r=it(Math.floor(i[0]*8),Math.floor(i[2]*8)+Math.floor(i[1]*8)*5);return r<.15?l.LEAF3:r>.86?l.LEAF2:void 0};for(const[t,i]of[[[.85,.42,0],[.7,.5,.66]],[[0,.3,0],[.62,.36,.6]],[[-.8,.3,0],[.56,.36,.62]],[[1.85,.5,.02],[.5,.5,.48]],[[-1.55,.72,.3],[.38,.5,.3]],[[-1.55,.72,-.3],[.38,.5,.3]],[[-2.2,.3,.32],[.42,.3,.26]],[[-2.2,.3,-.32],[.42,.3,.26]],[[.6,.2,.78],[.75,.2,.2]],[[.6,.2,-.78],[.75,.2,.2]]])n.ell(t,i,l.MOSS,{group:1,rough:.03,paint:e()});ni(n,[2.25,.75,.12],[.13,.15,.11],2,!1);for(const t of[-.12,.22])n.ell([2.12,.88,t],[.08,.04,.07],l.STONED,{group:3});ni(n,[-.2,.16,.95],[.2,.15,.18],4),ni(n,[-.2,.16,-.95],[.18,.14,.16],5),n.ell([2,.95,.02],[.42,.14,.4],l.LEAF3,{group:6,rough:.03}),fa(n,26,2.8,10,3,.3)},"fern-grotto"(n){n.ell([0,.16,0],[.78,.2,.72],l.STONE,{group:1,rough:.015,paint:e=>e[1]>.3?l.MOSS:void 0}),pa(n,[0,.345,0],[.55,.5],2);for(let e=0;e<6;e++){const t=e/6*Math.PI*2+.4,i=1.5+it(e)*.3,r=[Math.cos(t)*i,0,Math.sin(t)*i*.8],a=1.1+it(e,2)*.7,s=w.add(r,[0,a,0]);n.seg(r,s,.12,.09,l.TRUNK,{group:3+e,rough:.02,paint:_r});for(let o=0;o<7;o++){const u=o/7*Math.PI*2+e,c=[Math.cos(u),0,Math.sin(u)];n.chain([[...s,.05],[...w.add(s,w.add(w.mul(c,.45),[0,.18,0])),.04],[...w.add(s,w.add(w.mul(c,.9),[0,-.15,0])),.015]],o%2?l.LEAF:l.LEAF2,{group:10+e})}}for(let e=0;e<5;e++){const t=e*1.3;ni(n,[Math.cos(t)*.95,.08,Math.sin(t)*.95],[.16,.12,.14],20+e)}},"sunken-boat"(n){pa(n,[.3,.01,.15],[1.9,1.15],1);const e=[0,.12,0],t=w.norm([1,.28,.12]);n.ell(e,[1.3,.45,.55],l.WOOD,{dir:t,group:2,paint:i=>(w.dot(w.sub(i,e),[0,1,0])*9+9)%1<.14?l.BARKD:i[1]>.35&&it(Math.floor(i[0]*9))<.4?l.MOSS:void 0}),n.ell(w.add(e,[0,.14,0]),[1.2,.4,.47],l.BARKD,{dir:t,group:2,cut:!0});for(let i=-2;i<=2;i++)n.seg(w.add(e,w.add(w.mul(t,i*.4),[0,.1,-.42])),w.add(e,w.add(w.mul(t,i*.4),[0,.1,.42])),.04,.04,l.WOOD,{group:3});n.seg([-.9,.05,.7],[.3,1,.55],.03,.03,l.WOOD,{group:4}),n.box([-.98,.06,.72],[.2,.02,.07],l.WOOD,{dir:[1.2,-.8,-.15],group:4}),fa(n,18,2.2,10,5,.45)},"bramble-wagon"(n){const e=w.norm([1,-.12,0]);n.box([0,.62,0],[1.1,.22,.52],l.WOOD,{dir:e,round:.04,group:1,paint:t=>(t[0]+3)*4%1<.08?l.BARKD:void 0}),n.box([0,.72,0],[1,.2,.43],l.BARKD,{dir:e,group:1,cut:!0});for(const[t,i,r,a]of[[-.72,.55,.4,.4],[-.72,-.55,.4,.4],[.72,-.55,.32,.37]])n.ell([t,r,i],[a,a,.06],l.WOOD,{group:2+(t>0?1:0)+(i>0?2:0),paint:s=>{const o=s[0]-t,u=s[1]-r,c=Math.hypot(o,u),h=Math.atan2(u,o);return c>a*.82||c<a*.18?l.BARKD:Math.abs(Math.sin(h*4))<.2?l.WOOD:l.NOSE}});n.ell([.95,.1,.75],[.37,.06,.37],l.WOOD,{group:7,paint:t=>Math.hypot(t[0]-.95,t[2]-.75)>.3?l.BARKD:void 0});for(const t of[-.3,.3])n.seg([1.05,.55,t],[1.9,.05,t*1.4],.04,.035,l.WOOD,{group:8});for(let t=0;t<14;t++){const i=it(t,1)*6.283,r=Math.cos(i)*1.5,a=Math.sin(i)*.9,s=[[r,0,a,.03]];for(let o=1;o<4;o++)s.push([r*(1-o*.28)+(it(t,o)-.5)*.5,.25+o*.25+it(o,t)*.2,a*(1-o*.3)+(it(o,t*3)-.5)*.4,.025-o*.004]);if(n.chain(s,l.BARKD,{group:10+t%3}),t%2===0){const o=s[3];n.ell([o[0],o[1],o[2]],[.18,.13,.16],l.LEAF,{group:14,rough:.03,paint:u=>it(Math.floor(u[0]*30),Math.floor(u[1]*30))<.1?l.ACCENT:void 0})}}},"beehive-tree"(n){for(const[t,i,r]of[[-.2,0,-.25],[.15,-.1,.2],[0,.15,.05]])qt(n,[[t,0,i,.22],[t+r*.8,1.4,i,.16],[t+r*2,2.8,i-.1,.08]],1);for(const[t,i]of[[[-.6,2.9,-.2],[.9,.6,.7]],[[.6,3,-.2],[.85,.6,.7]],[[0,3.4,-.3],[.9,.55,.7]]])da(n,t,i,3);qt(n,[[.2,1.9,-.05,.08],[.75,2.05,.15,.05]],2);const e=[.72,1.6,.2];n.ell(e,[.24,.42,.22],l.STRAW,{group:4,paint:t=>{const i=Math.floor((t[1]-e[1])*14),r=Math.floor(Math.atan2(t[2]-e[2],t[0]-e[0])*3+i%2*.5);return it(i,r)<.3?l.BARK2:void 0}}),n.seg([.75,2.02,.15],[.72,1.9,.2],.05,.1,l.STRAW,{group:4});for(let t=0;t<6;t++){const i=t*1.9;n.ell([e[0]+Math.cos(i)*.45,e[1]+Math.sin(t*2.3)*.35,e[2]+Math.sin(i)*.35],[.03,.025,.03],l.MAGIC,{group:20+t,extra:!0})}},"fairy-ring"(n){n.ell([0,.005,0],[1.9,.005,1.5],l.LEAF3,{group:0});for(let e=0;e<9;e++){const t=e/9*Math.PI*2,i=[Math.cos(t)*1.6,0,Math.sin(t)*1.25],r=.35+it(e)*.35;n.box(w.add(i,[0,r/2,0]),[.13,r/2,.1],l.STONE,{dir:[-Math.sin(t),0,Math.cos(t)],round:.05,rough:.015,group:1+e,paint:s=>e===2&&Math.abs(s[1]-r*.55)<r*.22&&Math.abs(s[0]-i[0]-0)<.05?l.RUNE:s[1]>r*.85?l.MOSS:void 0});const a=w.add(i,[Math.cos(t+.35)*.25,0,Math.sin(t+.35)*.2]);n.seg(a,w.add(a,[0,.16,0]),.035,.03,l.CLOTH,{group:12}),n.ell(w.add(a,[0,.18,0]),[.1,.06,.1],l.ACCENT,{group:13,paint:s=>it(Math.floor(s[0]*60),Math.floor(s[2]*60))<.15?l.BELLY:void 0})}},"charcoal-hut"(n){const e=[0,2,0];for(let i=0;i<20;i++){const r=i/20*Math.PI*2;Math.abs(r-1.2)<.35||n.seg([Math.cos(r)*.95,0,Math.sin(r)*.8],w.add(e,[Math.cos(r)*.08,.1+it(i)*.25,Math.sin(r)*.08]),.05,.03,i%3?l.TRUNK:l.BARKD,{group:1+i%2})}n.ell([0,.6,0],[.85,.6,.7],l.BARKD,{group:3});const t=[1.7,0,.3];n.ell(t,[.85,.42,.7],l.BARKD,{group:4,rough:.03,paint:i=>it(Math.floor(i[0]*14),Math.floor(i[2]*14)+Math.floor(i[1]*14))<.07?l.GLOW:i[1]>.3?l.SHADES:void 0});for(let i=0;i<4;i++)n.seg([-1.4,.1+i*.14,-.5+i%2*.05],[-1.4,.1+i*.14,.5],.07,.07,l.TRUNK,{group:5+i%2,paint:r=>Math.abs(r[2])>.46?l.BARKL:void 0})},"root-arch"(n){qt(n,[[-1.8,0,.1,.4],[-1.4,1.2,0,.34],[-.4,2.3,-.1,.3],[.6,2.4,0,.28],[1.5,1.4,.1,.32],[1.9,0,.15,.38]],1),qt(n,[[-1.4,0,-.6,.28],[-.6,1.6,-.5,.22],[.5,1.9,-.45,.2],[1.3,.9,-.4,.22],[1.5,0,-.35,.26]],2),qt(n,[[-1.8,.2,.1,.3],[-2.4,.05,.5,.12]],1),qt(n,[[1.9,.2,.15,.3],[2.5,.05,.55,.12]],1);for(const[e,t]of[[[-.2,2.6,-.2],[.7,.35,.5]],[[.8,2.5,-.25],[.55,.3,.45]]])da(n,e,t,4);for(let e=0;e<4;e++)ni(n,[-.7+e*.45,.12,(it(e)-.5)*.5],[.22,.18,.2],6+e);n.box([0,.35,-.2],[.16,.35,.08],l.STONE,{round:.05,rough:.01,group:11,paint:e=>Math.abs(e[1]-.4)<.14&&Math.abs(e[0])<.05?l.MAGIC:e[1]>.62?l.MOSS:void 0})},"turf-hut"(n){n.box([0,.55,0],[1,.55,.7],l.WOOD,{round:.04,group:1,paint:e=>e[1]*7%1<.18?l.BARKD:e[2]>.66&&Math.abs(e[0]+.2)<.2&&e[1]<.85?l.NOSE:e[2]>.66&&Math.abs(e[0]-.5)<.14&&Math.abs(e[1]-.7)<.12?l.SHADES:void 0});for(const e of[-1,1])n.box([0,1.3,e*.4],[1.15,.05,.5],l.MOSS,{dir:[1,0,0],up:[0,1,-e*.75],round:.03,group:2,paint:t=>it(Math.floor(t[0]*12),Math.floor(t[2]*12))<.25?l.LEAF2:void 0});n.seg([.65,1.2,-.3],[.65,1.9,-.3],.15,.13,l.STONE,{group:3,rough:.015});for(let e=0;e<5;e++)ni(n,[-1.4+e*.7,.12,.9+it(e)*.3],[.2,.15,.18],4+e);fa(n,16,1.8,10,9,.25)},"heron-rookery"(n){qt(n,[[0,0,0,.25],[.4,1.4,0,.18],[.9,2.8,-.1,.12],[1.3,3.8,-.2,.06]],1);const e=[[[.6,2,-.05],[-.3,2,-.1]],[[1,3,-.1],[1.8,2.9,0]],[[1.25,3.6,-.2],[.6,3.7,-.3]]];e.forEach(([r,a],s)=>{qt(n,[[...r,.07],[...a,.04]],2),n.ell(w.add(a,[0,.08,0]),[.34,.13,.3],l.BARK2,{group:3+s,rough:.025,paint:o=>Math.abs(Math.sin(o[0]*30+o[2]*20))<.25?l.STRAW:o[1]<a[1]+.02?l.BARKD:void 0})});for(const[r,a]of[[[1.2,4,-.4],[.6,.4,.45]],[[.3,3.1,-.5],[.45,.3,.35]],[[1.9,3.3,-.4],[.4,.3,.35]]])da(n,r,a,7);const t=w.add(e[1][1],[0,.42,.05]),i=1.6;n.ell(t,[.18*i,.1*i,.09*i],l.BELLY,{dir:[1,.3,0],group:10,paint:r=>r[1]>t[1]+.06?l.STONE:void 0}),n.chain([[...w.add(t,[.12*i,.06*i,0]),.035*i],[...w.add(t,[.2*i,.22*i,0]),.03*i],[...w.add(t,[.16*i,.32*i,0]),.04*i]],l.BELLY,{group:10}),n.seg(w.add(t,[.18*i,.33*i,0]),w.add(t,[.36*i,.3*i,0]),.015*i,.005*i,l.BODY2,{group:11});for(const r of[-.04,.04])n.seg(w.add(t,[0,-.06*i,r]),w.add(t,[.02,-.42,r]),.012,.012,l.BARKD,{group:12})},sundial(n){n.ell([0,.07,0],[1.05,.09,1],l.STONE,{group:1,rough:.01}),n.ell([0,.2,0],[.72,.09,.68],l.STONE,{group:2,rough:.01,paint:e=>e[1]>.26&&it(Math.floor(e[0]*8),Math.floor(e[2]*8))<.3?l.MOSS:void 0}),n.seg([0,.28,0],[0,.95,0],.16,.13,l.STONE,{group:3,paint:e=>Math.abs(Math.sin(e[1]*30))<.15?l.STONED:void 0}),n.ell([0,1,0],[.38,.04,.38],l.FRAME,{group:4,paint:e=>{const t=Math.atan2(e[2],e[0]);return Math.abs(Math.sin(t*6))<.12&&Math.hypot(e[0],e[2])>.26?l.BARKD:void 0}}),n.box([0,1.12,0],[.2,.1,.01],l.FRAME,{dir:[1,-.5,0],round:.005,group:5});for(let e=0;e<22;e++){const t=e/22*Math.PI*2,i=1.25+it(e)*.2,r=[Math.cos(t)*i,0,Math.sin(t)*i*.85];n.seg(r,w.add(r,[0,.18,0]),.015,.012,l.LEAF2,{group:6}),n.ell(w.add(r,[0,.2,0]),[.05,.04,.05],[l.FLOWER,l.BELLY,l.ACCENT][e%3],{group:7})}},"bear-den"(n){const e=[0,.3,-.2];n.ell(e,[1.7,1.15,1.25],l.LEAF,{group:1,rough:.05,paint:t=>{const i=it(Math.floor(t[0]*16),Math.floor(t[1]*16)+Math.floor(t[2]*16)*3);return i<.06?l.ACCENT:i<.2?l.BARKD:t[1]<.4?l.LEAF3:i>.85?l.LEAF2:void 0}}),n.ell([.35,.35,.95],[.5,.55,.4],l.NOSE,{group:1,cut:!0}),n.seg([2,0,.5],[2,.65,.5],.3,.27,l.TRUNK,{group:3,paint:t=>t[1]>.6?l.BARKL:Math.abs(Math.sin(Math.atan2(t[2]-.5,t[0]-2)*3))<.12&&t[1]>.2?l.BARKD:void 0})},"stilt-hut"(n){pa(n,[0,.01,.1],[2.1,1.3],1);for(const[e,t]of[[-.75,-.55],[.75,-.55],[-.75,.55],[.75,.55]])n.seg([e,0,t],[e,1.05,t],.07,.06,l.WOOD,{group:2,paint:i=>i[1]<.15?l.MOSS:void 0});n.box([0,1.1,0],[1.05,.05,.8],l.WOOD,{round:.02,group:3,paint:e=>(e[0]+3)*6%1<.12?l.BARKD:void 0}),n.box([-.1,1.6,-.1],[.7,.45,.55],l.WOOD,{round:.03,group:4,paint:e=>e[2]>.4&&Math.abs(e[0]-.1)<.18&&e[1]<1.85?l.NOSE:void 0});for(const[e,t]of[[2.1,.92],[2.35,.72],[2.58,.48],[2.76,.24]])n.ell([-.1,e,-.1],[t,.16,t*.85],l.STRAW,{group:5,paint:i=>Math.abs(Math.sin(Math.atan2(i[2]+.1,i[0]+.1)*18))<.25?l.BARK2:void 0});for(const e of[.72,.95])n.seg([.9,1.1,e],[1.15,0,e],.02,.02,l.WOOD,{group:6});for(let e=0;e<4;e++)n.seg([.92+e*.06,1-e*.26,.72],[.92+e*.06,1-e*.26,.95],.02,.02,l.WOOD,{group:6});for(let e=0;e<26;e++){const t=it(e,7)*6.283,i=1.5+it(e,8)*.7,r=[Math.cos(t)*i,0,Math.sin(t)*i*.7],a=.5+it(e,9)*.5;n.seg(r,w.add(r,[0,a,0]),.028,.02,l.LEAF2,{group:10+e%3}),e%3===0&&n.ell(w.add(r,[0,a-.05,0]),[.025,.07,.025],l.BARKD,{group:13})}},"bog-shrine"(n){pa(n,[.6,.01,.4],[1.4,.9],1),n.seg([0,0,0],[0,1.9,0],.2,.17,l.TRUNK,{group:2,rough:.01,paint:e=>{const t=e[1];return e[2]>.12&&(Math.abs(t-1.6)<.05&&Math.abs(Math.abs(e[0])-.08)<.05||Math.abs(t-1.38)<.04&&Math.abs(e[0])<.1)||t*5%1<.07?l.BARKD:e[1]>1.85?l.MOSS:void 0}}),n.ell([0,1.95,0],[.24,.1,.24],l.MOSS,{group:3});for(let e=0;e<6;e++){const t=e/6*Math.PI*2;n.seg([Math.cos(t)*1,0,Math.sin(t)*.8],[Math.cos(t)*1,.35+it(e)*.25,Math.sin(t)*.8],.05,.04,l.TRUNK,{group:4})}n.ell([-.25,.06,.3],[.14,.07,.13],l.EAR,{group:5}),ni(n,[.3,.07,.3],[.09,.07,.08],6,!1),ni(n,[.15,.05,.42],[.06,.05,.06],7,!1);for(const[e,t,i]of[[.9,.9,.5],[1.4,1.2,.1],[.4,1.4,.8]])n.ell([e,t,i],[.06,.07,.06],l.MAGIC,{group:20+e*10,extra:!0,paint:r=>Math.hypot(r[0]-e,r[1]-t)<.03?l.MAGIC2:void 0});fa(n,20,2,10,11,.3,l.WEB)},"raven-tree"(n){qt(n,[[0,0,0,.3],[.1,1.3,0,.22],[-.1,2.5,-.1,.16],[.1,3.6,-.15,.07]],1),[[[.1,1.6,0],[1.3,2.3,.1],[1.8,2.2,.1]],[[-.05,2.1,-.05],[-1.2,2.8,-.1],[-1.6,3.2,-.1]],[[0,2.9,-.1],[.8,3.5,-.2]]].forEach((r,a)=>qt(n,r.map((s,o)=>[...s,.12-o*.04]),2+a)),qt(n,[[-.1,.5,0,.22],[-1.1,.1,.5,.08]],5),qt(n,[[.1,.4,0,.2],[.9,.05,-.4,.08]],5);const t=(r,a)=>{n.ell(r,[.12,.07,.06],l.SHADES,{dir:[1,.2,0],group:a}),n.ell(w.add(r,[.11,.07,0]),[.05,.05,.045],l.SHADES,{group:a}),n.seg(w.add(r,[.15,.07,0]),w.add(r,[.22,.05,0]),.015,.004,l.BODY2,{group:a}),n.seg(w.add(r,[-.1,0,0]),w.add(r,[-.22,-.04,0]),.04,.015,l.SHADES,{group:a})};t([1.3,2.42,.1],10),t([-1.2,2.92,-.1],11),t([.8,3.62,-.2],12),t([-.05,3.72,-.15],13);const i=[1.55,1.45,.1];n.seg([1.55,2.25,.1],w.add(i,[0,.3,0]),.01,.01,l.FRAME,{group:14});for(let r=0;r<6;r++){const a=r/6*Math.PI*2;n.seg(w.add(i,[Math.cos(a)*.2,-.25,Math.sin(a)*.2]),w.add(i,[Math.cos(a)*.12,.3,Math.sin(a)*.12]),.012,.012,l.FRAME,{group:14})}n.seg(w.add(i,[0,-.27,0]),w.add(i,[0,-.25,0]),.22,.22,l.FRAME,{group:14})},barrow(n){n.ell([0,0,-.2],[2.3,.95,1.3],l.LEAF2,{group:1,rough:.03,paint:e=>it(Math.floor(e[0]*10),Math.floor(e[2]*10)+Math.floor(e[1]*10))<.25?l.LEAF:void 0});for(const e of[-.35,.35])n.box([e,.45,.95],[.12,.45,.12],l.STONE,{round:.03,rough:.01,group:2});n.box([0,.95,.95],[.55,.1,.14],l.STONE,{round:.03,rough:.01,group:3,paint:e=>e[1]>1.02?l.MOSS:void 0}),n.box([0,.4,.9],[.23,.4,.3],l.NOSE,{group:1,cut:!0});for(const[e,t,i]of[[-1.6,1,.7],[1.7,.9,.55]])n.box([e,i/2,t],[.12,i/2,.09],l.STONE,{round:.04,rough:.01,group:4})},cairn(n){let e=0;for(let i=0;i<6;i++){const r=.9-i*.14,a=Math.max(3,9-i);for(let s=0;s<a;s++){const o=s/a*Math.PI*2+i;ni(n,[Math.cos(o)*r*.8,e+.14,Math.sin(o)*r*.7],[.24-i*.02,.15,.2-i*.02],1+(i+s)%4,i<2)}e+=.26}const t=[0,e+.1,0];for(let i=0;i<6;i++){const r=i/6*Math.PI*2;n.seg(w.add(t,[Math.cos(r)*.12,0,Math.sin(r)*.12]),w.add(t,[Math.cos(r)*.3,.35,Math.sin(r)*.3]),.02,.02,l.FRAME,{group:6})}n.seg(w.add(t,[0,-.3,0]),t,.05,.05,l.FRAME,{group:6}),n.ell(w.add(t,[0,.14,0]),[.2,.07,.2],l.SHADES,{group:7})},"stump-throne"(n){n.ell([0,.28,0],[.92,.34,.86],l.TRUNK,{group:1,rough:.015,paint:_r}),n.ell([0,.58,0],[.84,.06,.78],l.BARKL,{group:1,paint:e=>Math.abs(Math.sin(Math.hypot(e[0],e[2])*30))<.3?l.BARK2:void 0}),n.box([-.55,1.15,0],[.18,.62,.62],l.TRUNK,{round:.1,rough:.01,group:2,paint:_r});for(const e of[-.6,.6])n.box([-.1,.72,e],[.45,.14,.12],l.TRUNK,{round:.06,group:3,paint:_r});for(let e=0;e<6;e++){const t=e/6*Math.PI*2+.3;qt(n,[[Math.cos(t)*.8,.25,Math.sin(t)*.8,.18],[Math.cos(t)*1.4,.02,Math.sin(t)*1.3,.06]],4)}n.seg([1.5,.18,.8],[1.5,.18,.2],.18,.18,l.TRUNK,{group:5,paint:e=>e[2]>.78||e[2]<.22?l.BARKL:_r(e)}),n.seg([1.5,.3,.5],[1.6,.75,.5],.025,.025,l.WOOD,{group:6}),n.box([1.5,.36,.5],[.1,.06,.015],l.FRAME,{group:6});for(let e=0;e<6;e++){const t=e<3?0:1,i=e%3;n.seg([-1.7+i*.3+t*.15,.15+t*.26,-.7],[-1.7+i*.3+t*.15,.15+t*.26,.2],.14,.14,l.TRUNK,{group:7+e%2,paint:r=>r[2]>.16||r[2]<-.66?l.BARKL:void 0})}},"swing-beech"(n){qt(n,[[0,0,-.3,.45],[0,1.6,-.3,.36],[-.1,2.8,-.4,.26]],1),qt(n,[[0,2.2,-.3,.2],[1,2.6,-.2,.14],[1.9,2.75,-.1,.08]],2),qt(n,[[-.05,2.5,-.35,.18],[-1.2,3,-.4,.1]],3);for(let e=0;e<5;e++){const t=e/5*Math.PI*2;qt(n,[[Math.cos(t)*.35,.3,-.3+Math.sin(t)*.3,.2],[Math.cos(t)*.9,.02,-.3+Math.sin(t)*.8,.07]],4)}for(const[e,t]of[[[0,3.4,-.6],[1.4,.8,1]],[[1.4,3.1,-.4],[.9,.55,.7]],[[-1.3,3.2,-.6],[.9,.6,.7]]])da(n,e,t,5);for(const e of[-.12,.12])n.seg([1.3,2.65,e],[1.3,.55,e],.012,.012,l.STRAW,{group:6});n.box([1.3,.53,0],[.08,.025,.18],l.WOOD,{round:.01,group:6});for(let e=0;e<9;e++)n.ell([(it(e,1)-.5)*3,.05+it(e,2)*.5,(it(e,3)-.3)*1.6],[.022,.022,.022],l.MAGIC,{group:20+e,extra:!0})},bower(n){for(const t of[-.9,0,.9])for(const i of[-.6,.6])n.seg([t,0,i],[t,1.2,i],.04,.04,l.WOOD,{group:1});for(const t of[-.9,0,.9])n.chain([[t,1.2,-.6,.04],[t,1.62,-.3,.04],[t,1.72,0,.04],[t,1.62,.3,.04],[t,1.2,.6,.04]],l.WOOD,{group:2});for(const t of[-.6,.6])for(const i of[.5,1])n.seg([-.9,i,t],[.9,i,t],.025,.025,l.WOOD,{group:3});const e=t=>{const i=it(Math.floor(t[0]*26),Math.floor(t[1]*26)+Math.floor(t[2]*26)*3);return i<.12?l.BELLY:i<.2?l.STRAW:i>.85?l.LEAF2:void 0};for(const[t,i]of[[[-.6,1.6,0],[.6,.3,.75]],[[.5,1.65,0],[.65,.3,.75]],[[-.95,.9,-.55],[.25,.65,.25]],[[.95,.8,-.6],[.25,.55,.25]],[[-.9,.7,.62],[.22,.5,.2]],[[.2,1.3,-.65],[.5,.4,.2]]])n.ell(t,i,l.LEAF,{group:4,rough:.04,paint:e});n.box([0,.4,-.35],[.6,.04,.15],l.WOOD,{round:.02,group:5});for(const t of[-.5,.5])n.seg([t,0,-.35],[t,.38,-.35],.03,.03,l.WOOD,{group:5})}},$c={moor:["sleeping-giant","the sleeping giant, a moss mound like a figure lying on its back",1],"fern-forest":["fern-grotto","a ring of giant tree ferns round a stone basin",1],"muddy-forest":["sunken-boat","an old rowing boat sunk in the mud",1.15],"tangly-forest":["bramble-wagon","an old wagon wrapped in brambles",1.1],"wispy-forest":["beehive-tree","a many-trunked tree with a great wild honeycomb",1],"hazel-forest":["fairy-ring","a ring of fairy stones and toadstools",1.1],"twiggy-forest":["charcoal-hut","a charcoal burner's hut of sticks, its mound smouldering",1],ancient:["root-arch","a great arch of roots over mossy stones",1.1],norway:["turf-hut","a log cabin with a turf roof",1.15],"alder-forest":["heron-rookery","an alder holding herons' stick nests",1],meadow:["sundial","a moonlit sundial on a stone dais in a ring of flowers",1.2],"berry-thicket":["bear-den","a bear's den in a bramble mound",1.1],wetland:["stilt-hut","a fisher's hut on stilts over a pool",1.1],bog:["bog-shrine","a carved post shrine to the bog, will-o'-wisps over the pool",1.1],deadwood:["raven-tree","a dead tree where the ravens gather",1],grassland:["barrow","a barrow with a stone doorway",1],heath:["cairn","a tall cairn with an old beacon basket",1.4],"old-pinewood":["stump-throne","a woodcutter's stump throne",1.1],"bluebell-glade":["swing-beech","a great beech with a rope swing, glowworms beneath",1],"honeysuckle-tangle":["bower","a honeysuckle bower with a bench",1.2]};function Ch(n){let e=n.w,t=-1,i=n.h;for(let a=0;a<n.h;a++)for(let s=0;s<n.w;s++)n.m[a*n.w+s]&&(e=Math.min(e,s),t=Math.max(t,s),i=Math.min(i,a));const r=new on(t-e+1,n.h-i);for(let a=0;a<r.h;a++)for(let s=0;s<r.w;s++){const o=(a+i)*n.w+s+e;n.m[o]&&r.put(s,a,n.m[o],n.n[o*3],n.n[o*3+1],n.n[o*3+2])}return{sp:r,x0:e,y0:i}}function Lh(n,e){const t=n.leaf,i=e.trunkHue??.07;return{[l.TRUNK]:Me(i,.45,.36),[l.BARKD]:Me(i+.03,.5,.17),[l.BARKL]:Me(i,.35,.55),[l.BARK2]:Me(i+.02,.45,.26),[l.LEAF]:Me(t,.55,.45),[l.LEAF2]:Me(t-.03,.5,.62),[l.LEAF3]:Me(t+.03,.6,.26),[l.STONE]:[122,120,128],[l.STONED]:[62,60,70],[l.MOSS]:Me(.26,.45,.45),[l.WOOD]:[128,92,58],[l.STRAW]:[190,162,104],[l.CLOTH]:[228,220,200],[l.EAR]:[168,96,66],[l.FRAME]:[150,128,84],[l.SHADES]:[30,28,36],[l.ACCENT]:[196,40,52],[l.BELLY]:[232,228,214],[l.BODY2]:[210,170,60],[l.FLOWER]:[180,140,230],[l.WEB]:[228,228,234],[l.WATER]:[52,78,104],[l.NOSE]:[16,14,20],[l.GLOW]:[255,120,40],[l.MAGIC]:Me(e.magicHue??.45,.6,1),[l.MAGIC2]:Me(e.magicHue??.45,.2,1),[l.RUNE]:[120,230,255],[l.LINE]:[24,22,30]}}function Dh(n,e,t,i=16){const r=new je({blend:.05});Rh[n](r),r.ell([0,.004,0],[.01,.004,.01],l.NOSE,{group:0});const a=(Object.values($c).find(([d])=>d===n)||[,,1])[2],s=qi(r,{scale:wh(t)*a}),{sp:o,x0:u,y0:c}=Ch(s.sp),[h,f]=s.project([0,0,0]);return{sp:o,colours:Lh(e,t),origin:{x:+(h-u).toFixed(1),y:+(f-c).toFixed(1)},metres:{width:+(o.w/i).toFixed(1),height:+(o.h/i).toFixed(1)}}}const Ph=1.3,Ih=n=>[1,Math.sqrt(n.growth),Math.sqrt(n.growth)*Ph,n.growth],Fr=(n,e,t=1)=>Math.round(e.size*Ih(e)[Math.max(0,Math.min(3,n))]*(2/(e.pixel||2))*1.9*t),Jo=(n,e)=>{const t=$o(e);for(let i=0;i<9;i++){const r=Math.floor(be(t,2,n.w-2)),a=Math.floor(be(t,2,n.h*.6));if(!(n.get(r,a)||n.get(r+1,a)||n.get(r-1,a)||n.get(r,a+1)||n.get(r,a-1))&&(n.px(r,a,l.MAGIC2),i%3===0))for(const[s,o]of[[1,0],[-1,0],[0,1],[0,-1]])n.px(r+s,a+o,l.MAGIC)}};function os(n,e,t,i,r,a,s,o){const u=w.add(e,[-i*.7,i*(.75+r),t*i*.35]),c=w.norm(w.sub(u,e)),h=w.norm(w.sub([1,0,0],w.mul(c,w.dot([1,0,0],c)))),f=Math.hypot(...w.sub(u,e));n.flat(w.add(w.lerp(e,u,.5),w.mul(h,-i*.14)),c,h,f*.55,i*.34,Tr.wing(a,s),{group:o,extra:!0})}const Qo=(n,e,t=1)=>n===0?Math.round(Math.max(12,Math.min(30*Math.max(.75,Math.min(1.1,t)),Fr(1,e)*t*.72))):n===2?Math.round(Math.max(Fr(1,e)*t*1.08,Math.min(Fr(2,e,t),Fr(1,e)*1.4))):Fr(n,e)*t;let Wa=null;function Nh(n,e){const t=Wa;Wa=n;try{return e()}finally{Wa=t}}const Uh=(n,e)=>{const t=Math.atan2(e,n);return Math.hypot(n,e)<.55+.4*Math.pow(Math.abs(Math.cos(t*2.5+Math.PI/2)),3)},Oh=(n,e)=>{const t=n*1.2,i=-e*1.2+.25;return Math.pow(t*t+i*i-.6,3)-t*t*i*i*i<0};function jo(n){const e=Wa,t=n.anchors;if(!e)return;const i=t.head,r=i?Math.max(...i.r):.2;if(e.collar&&(t.neck||i)){const a=t.neck||{c:w.add(i.c,[-i.r[0]*.8,-i.r[1]*.4,0]),r:i.r[1]*.75,dir:w.norm([1,.4,0])},s=w.norm(a.dir),o=w.norm(w.cross(s,Math.abs(s[2])<.9?[0,0,1]:[1,0,0])),u=w.cross(s,o),c=[],h=Math.max(.03,a.r*.2);for(let x=0;x<=16;x++){const g=x/16*Math.PI*2,m=w.add(w.mul(o,Math.cos(g)),w.mul(u,Math.sin(g)));let v=0;for(;v<.8&&n.field(w.add(a.c,w.mul(m,v)))<0;)v+=.01;v>=.8&&(v=a.r),c.push([...w.add(a.c,w.mul(m,v+h*.7)),h])}n.chain(c,l.COLLAR,{group:60,extra:!0});const f=c.reduce((x,g)=>g[0]-g[1]*.6+g[2]*.5>x[0]-x[1]*.6+x[2]*.5?g:x),d=h*1.3*(a.tag||1),p=w.norm(w.add(w.norm(w.sub(f.slice(0,3),a.c)),[.3,-.5,.3]));let _=f.slice(0,3);for(let x=0;x<60&&n.field(_)<d*.4;x++)_=w.add(_,w.mul(p,.01));n.ell(_,[d,d,d*.6],l.COLLAR,{group:60,extra:!0})}if(e.hat!=null&&i){const a=Math.max(r,.13),s=i.top||w.add(je.surface(i.c,i.r,w.norm([-.15,1,.1])),[0,r*.1,0]),o=w.norm([.3,1,.35]),u=a*1.5,c=w.add(s,w.mul(o,u));n.seg(w.add(s,w.mul(o,-a*.1)),c,a*.48,a*.04,l.HAT1,{group:61,extra:!0,paint:h=>Math.floor(w.dot(w.sub(h,s),o)/(u/5)+10)%2?l.HAT2:void 0}),n.ell(c,[a*.17,a*.17,a*.17],l.POM,{group:61,extra:!0})}if(e.glasses&&t.eyes&&i){const[a,s]=t.eyes.pts,o=c=>w.add(c,w.mul(w.norm(w.sub(c,i.c)),t.eyes.size*.45)),u=Math.max(t.eyes.size*1.05,r*.1);if(e.glasses==="bar")n.seg(o(a),o(s),u,u,l.SHADES,{group:62,extra:!0}),n.ell(w.add(o(s),[u*.3,u*.5,u*.2]),[u*.25,u*.25,u*.25],l.GLINT,{group:62,extra:!0});else for(const c of[a,s]){const h=w.norm(w.sub(c,i.c)),f=w.norm(w.cross([0,1,0],h)),d=w.cross(h,f),p=e.glasses==="heart"?Oh:Uh,_=u*1.5;n.flat(o(c),f,d,_,_,(x,g)=>p(x,g)?p(x*1.3,g*1.3)?l.SHADES:l.FRAME:null,{group:62,bend:.1,extra:!0}),n.seg(o(a),o(s),u*.18,u*.18,l.FRAME,{group:62,extra:!0})}}if(e.shoes)for(const a of t.feet){const s=e.shoes==="platform",o=a.r,u=w.add(a.c,[o*.25,o*(s?.35:.15),0]);n.ell(u,[o*1.45,o*(s?1.2:.85),o*1.15],l.SHOE,{group:a.group,extra:!0,paint:c=>c[1]<u[1]-o*(s?.45:.4)?l.SOLE:e.shoes==="glitter"&&Un(c,60,.28)?l.GLINT:void 0})}}function Fh(n,e,t,i,r="towards"){const a={legW:1,earS:1,hgt:1,bw:.3,...n.q},s=e===3,o=e===1,u=e===0,c=N=>s&&n.legend.includes(N),h=new je,f=a.hr*(u?1.75:o?1.25:1)*(i.head/.44)**.5,d=a.len*(u?.8:o?.9:1.02)*i.long,p=u?.55:o?.9:1.04,_=t?-.04:0,x=1+_,g=a.chest*(s?1.06:1)/p+_,m=a.tuck/p+_,v=a.bw*(u?1.15:e>=2?1.06:1)*(a.legW>1.2?1.15:1),E=.06*a.legW*(s?1.1:u?1.7:1),b=a.back==="hump"?.1:0,R=a.back==="arch"?.1:0,A=g+.12,D=N=>{if(a.belly&&N[1]<A&&N[0]>-d*.5)return l.BELLY;if(a.saddle&&N[1]>x-.18&&N[0]<d*.55)return l.BODY2;if(a.spots&&N[1]>g+.1&&Un(N,10,.22))return a.spotMat==="belly"||a.spots==="young"&&o?l.BELLY:a.spots==="young"?void 0:l.BODY3;if(a.ridge&&N[1]>x-.08+b*.5)return l.BODY3};if(h.ell([d*.48,(x+g)/2+b*.5,0],[d*.62,(x-g)/2+b*.5,v],l.BODY,{paint:D}),h.ell([-d*.5,(x+m)/2+R*.6,0],[d*.58,(x-m)/2+R*.6,v*.93],l.BODY,{paint:D}),h.ell([0,(x+(g+m)/2)/2+.02,0],[d*.6,(x-(g+m)/2)/2,v*.9],l.BODY,{paint:D}),a.ridge)for(let N=0;N<(s?16:10);N++){const re=-d*.8+N*d*1.75/(s?15:9),ce=(.07+(s?.04:0))*(1+.5*Math.max(0,re/d));h.ell([re,x+.02+b*Math.max(0,1-Math.abs(re/d-.5)*2)+ce*.5,0],[ce,.03,v*.25],l.BODY3,{dir:[-.3,1,0],up:[1,0,0]})}if(a.wool)for(let N=0;N<14;N++){const re=N/14*Math.PI*2;h.ell([d*Math.cos(re)*.7,(x+g)/2+Math.sin(re)*.2,v*(N%2?.5:-.5)],[.16,.14,.14],l.BODY)}const S=[.32,-.32][t],T=(N,re)=>{const ce=re*v*.62,Re=N?d*.62:-d*.62,Fe=(N?1:-1)*re*S,ze=N?g+.1:m+.15,j=(N?re:-re)*(t?1:-1)>0?.06:0,ie=[Re+Math.sin(Fe)*.2+(N?.02:.1),Math.max(.3,ze*.55),ce],G=[Re+Math.sin(Fe)*.42,.05+j,ce],ue=[Re,ze+.12,ce*.8],se=re>0?a.legMat||l.BODY:a.legMat?l.BODY3:l.BODY2,ye=N?[[...ue,E*1.5],[...ie,E*1.05],[...G,E*.9]]:[[...ue,E*2*(a.haunch||1)],[...w.add(ie,[-.12,.06,0]),E*1.2],[...w.add(G,[-.06*(a.hindFoot||1),.12,0]),E*.9],[...G,E*.9]];h.chain(ye,se,{group:re>0?6+(N?1:0):2,paint:a.socks?Ce=>Ce[1]<a.socks?l.BODY3:void 0:void 0});const Ze=(a.paw==="hoof"?.07:.09)*a.legW**.5*(N?1:a.hindFoot||1);h.ell(w.add(G,[Ze*.5,-.01,0]),[Ze,E*.9,E*1.1],a.paw==="hoof"?l.NOSE:se,{group:re>0?6+(N?1:0):2}),h.anchors.feet.push({c:w.add(G,[Ze*.5,-.01,0]),r:Math.max(Ze,E*1.1),group:re>0?6+(N?1:0):2})};for(const N of[-1,1])T(!0,N),T(!1,N);const I=[d*.82,x-.12,0],C=[I[0]+Math.cos(a.neckAng)*a.neck*.9,I[1]+Math.sin(a.neckAng)*a.neck*.9+(u?.1:0),0];h.seg(I,C,a.neckW*.55,a.neckW*.42,l.BODY,{paint:N=>a.belly&&N[1]<(I[1]+C[1])/2-.05?l.BELLY:a.face==="dark"?l.BODY2:void 0});const F=N=>{if(a.face==="badger")return Math.abs(N[2])<f*.22+(N[0]-C[0])*.1||N[1]<C[1]-f*.1?l.BELLY:l.BODY3;if(a.face==="dark")return l.BODY2;if((a.belly||a.muzzle)&&N[1]<C[1]-f*.35)return l.BELLY};h.ell(C,[f*1.05,f*.92,f*.88],l.BODY,{paint:F});const O=f*a.snout*(u?.55:o?.78:1),P=f*a.snoutD*.55,B=[C[0]+f*.65+O*.5,C[1]-f*.28,0];h.ell(B,[O*.62+f*.2,P,P*.95],l.BODY,{dir:[1,-.25,0],paint:N=>(a.muzzle||a.belly)&&N[1]<B[1]-P*.1?l.BELLY:F(N)});const W=[B[0]+O*.62+f*.1,B[1]-.02,0];h.ell(W,[f*(a.disc?.1:.12),f*(a.disc?.2:.12),f*(a.disc?.2:.15)],l.NOSE,{group:1});for(const N of[-1,1]){const re=je.surface(C,[f*1.05,f*.92,f*.88],w.norm([.75,.32,N*.62]));h.ell(re,[f*.13,f*.16,f*.13].map(ce=>ce*(a.eyeK||1)*(u?1.5:o?1.2:1)),s&&!a.tusks?l.MAGIC2:l.EYE,{group:1})}h.anchors.head={c:C,r:[f*1.05,f*.92,f*.88],top:[C[0]-f*.1,C[1]+f*.82,0]},h.anchors.eyes={pts:[-1,1].map(N=>je.surface(C,[f*1.05,f*.92,f*.88],w.norm([.75,.32,N*.62]))),size:f*.16*(a.eyeK||1)*(u?1.5:o?1.2:1)},h.anchors.neck={c:w.lerp(I,C,u?.05:o?.25:.42),r:a.neckW*.5*(u?1.3:o?1.12:1),dir:w.norm(w.sub(C,I)),tag:u?1.8:o?1.3:1};for(const N of[-1,1]){const re=a.ear,ce=[C[0]-f*.15,C[1]+f*.7,N*f*.5],Re=a.earS*(u?1.2:1)*(a.ear==="long"?.62:1);if(re==="none")continue;if(re==="round"){h.ell(ce,[f*.22,f*.25*Re,f*.1],l.BODY,{group:1,paint:ye=>ye[0]>ce[0]+f*.02?l.EAR:void 0});continue}const Fe=re==="long",ze=re==="small"?-.6:0,j=f*.55*Re*(re==="big"?1.35:Fe?2.2:1),ie=f*.3*(re==="big"?1.2:Fe?1.35:1),G=w.norm([ze*.6-(Fe?.3:.12),1,N*.3]),ue=w.norm([.55,.2,N]),se=w.norm(w.cross(ue,G));h.flat(w.add(ce,w.mul(G,j)),se,G,ie,j,Tr.ear(l.BODY,l.EAR,l.BODY3),{group:5+(N>0?0:20),extra:Fe}),re==="tuft"&&h.seg(w.add(ce,[0,j*1.4,N*.02]),w.add(ce,[0,j*1.85,N*.04]),f*.05,f*.02,l.BODY3,{group:1})}const $=[-d*1.05,x-.1+R*.5,0],ae=t?.04:-.02;if(c("tails")||Bh(h,c("starTail")?"star":a.tail,$,d,x,ae),a.horns)for(const N of[-1,1]){const re=o?.6:u?.35:c("hornsGlow")?1.4:1,ce=[];for(let Re=0;Re<=8;Re++){const Fe=.3-Re/8*Math.PI*1.6,ze=f*.65*re*(1-.45*Re/8);ce.push([C[0]-f*.1+Math.cos(Fe)*ze,C[1]+f*.45+Math.sin(Fe)*ze,N*(f*.6+Re*.015)]),ce[Re].push(f*.2*re*(1-.6*Re/8))}h.chain(ce,c("hornsGlow")?l.MAGIC:l.ACCENT,{group:13})}if(a.antlers||c("jackalope"))for(const N of[-1,1])kh(h,a,[C[0]-f*.05,C[1]+f*.75,N*f*.4],N,e,c);if(a.tusks)for(const N of[-1,1]){const re=o?.4:u?0:c("tusksBig")?1.3:.75;if(!re)continue;const ce=[B[0]+O*.25,B[1]-P*.4,N*P*.8];h.chain([[...ce,.045*re],[...w.add(ce,[.1*re,.1*re,N*.03]),.04*re],[...w.add(ce,[.06*re,.24*re,N*.05]),.02*re]],l.ACCENT,{group:8})}a.teeth&&!u&&h.ell([W[0]-f*.1,W[1]-f*.25,0],[f*.08,f*.14,f*.12],l.ACCENT,{group:1});const q=N=>[-d*.9+N*d*1.65,x+b*Math.max(0,1-Math.abs(N-.8)*3)+R*(1-Math.abs(N-.4)*2),0];if(c("wings"))for(const N of[-1,1])os(h,[d*.2,x,N*v*.5],N,1.15,t?.1:0,N>0?l.MAGIC2:l.MAGIC,l.MAGIC,40+(N>0?10:0));if(c("mane")||c("flames"))for(let N=0;N<7;N++){const re=N/6,ce=w.lerp(w.add(C,[-f*.5,f*.3,0]),q(.55),re),Re=[.4,.3,.45,.28,.38,.25,.3][N],Fe=w.norm([-.35-(t?.1:0),1,0]);h.flat(w.add(ce,w.mul(Fe,Re*.5)),[1,0,0],Fe,Re*.32,Re*.55,Tr.flame(N%2?l.MAGIC:l.MAGIC2,l.MAGIC2),{group:60+N%2,extra:!0})}if(c("tails"))for(let N=0;N<7;N++){const re=Math.PI*(.55+N*.08),ce=(N-3)*.1,Re=w.add($,[Math.cos(re)*.9,Math.sin(re)*.85,ce]);h.chain([[...$,.1],[...w.lerp($,Re,.5),.17],[...Re,.08]],N%2?l.BODY2:l.BODY,{group:70,extra:!0}),h.ell(Re,[.09,.09,.09],l.MAGIC2,{group:71,extra:!0})}if(c("crystals")&&[.15,.3,.45,.6,.75].forEach((N,re)=>{const ce=q(N),Re=[.3,.5,.4,.6,.35][re];h.ell(w.add(ce,[0,Re*.45,(re%2-.5)*.1]),[Re*.55,.08,.08],l.MAGIC,{dir:[(re-2)*.12,1,0],group:80+re%2,extra:!0,paint:Fe=>Fe[2]>0?l.MAGIC2:void 0})}),c("moss")){for(let N=0;N<6;N++)h.ell(q(.08+N*.15),[d*.22,.07,v*.85],l.LEAF,{group:85,extra:!0});for(const[N,re]of[[.25,.55],[.5,.8],[.75,.45]]){const ce=q(N);h.seg(ce,w.add(ce,[0,re*.7,0]),.04,.025,l.TRUNK,{group:86,extra:!0}),h.ell(w.add(ce,[0,re*.8,0]),[re*.28,re*.26,re*.28],l.LEAF2,{group:87,extra:!0,paint:Re=>Re[1]<ce[1]+re*.72?l.LEAF3:void 0})}for(const N of[.12,.4,.65,.9]){const re=q(N);h.ell(w.add(re,[0,.12,v*.3]),[.07,.035,.07],l.MAGIC,{group:89,extra:!0})}}if(c("ribbons"))for(let N=0;N<3;N++){const re=[];for(let ce=0;ce<9;ce++){const Re=ce/8;re.push([d*(.5-Re*2.2),x+.05+N*.1+Re*(.25+N*.12)+Math.sin(Re*6+t+N)*.07,(N-1)*.18,.04*(1-Re*.6)])}h.chain(re,N%2?l.MAGIC2:l.MAGIC,{group:90+N,extra:!0})}jo(h);const{sp:ee}=qi(h,{height:Qo(e,i,a.hgt),facing:r});return s&&Jo(ee,n.id.length*7919),ee}function Bh(n,e,t,i,r,a){const s={group:3},o=u=>-i*u;e==="brush"?n.chain([[...t,.1],[o(1.3),r-.25+a,0,.15],[o(1.4),r-.55,0,.14],[o(1.35),.38+a,0,.09]],l.BODY,{...s,paint:u=>u[1]<.32?l.BODY3:void 0}):e==="bushy"?n.chain([[...t,.1],[o(1.05)-.35,r-.05+a,0,.17],[o(1.05)-.75,r-.2+a,0,.18],[o(1.05)-1,r-.35+a,0,.1]],l.BODY,{...s,paint:u=>u[0]<o(1.05)-.82?l.BELLY:void 0}):e==="stub"||e==="deer"||e==="bob"?n.ell(w.add(t,[-.06,.02+a,0]),[.1,.08,.07],e==="deer"?l.BELLY:l.BODY,{...s,paint:e==="bob"?u=>u[0]<t[0]-.08?l.BODY3:void 0:void 0}):e==="puff"?n.ell(w.add(t,[-.04,.02,0]),[.11,.11,.1],l.BELLY,s):e==="squirrel"||e==="star"?n.chain([[...t,.12],[o(1.3),r+.05+a,0,.25],[o(1.3),r+.6+a,0,.3],[o(1),r+.95+a,0,.27],[o(.65),r+.9+a,0,.16]],e==="star"?l.MAGIC:l.BODY,{...s,extra:!0,paint:e==="star"?u=>Un(u,14,.12)?l.GLINT:void 0:void 0}):e==="otter"?n.chain([[...t,.17],[o(1.3),r-.45+a,0,.12],[o(1.6),.1,0,.07],[o(1.85),.06+a,0,.03]],l.BODY,s):e==="stoat"?n.chain([[...t,.08],[o(1.3),r-.12+a,0,.07],[o(1.6),r-.05+a,0,.06]],l.BODY,{...s,paint:u=>u[0]<o(1.45)?l.BODY3:void 0}):e==="flat"?(n.seg(t,[o(1.15),.3,0],.08,.07,l.BODY2,s),n.ell([o(1.4),.1+a*.5,0],[.28,.03,.14],l.BODY3,s)):e==="thin"&&(n.chain([[...t,.04],[o(1.1),r-.3,0,.03],[o(1.12)+a,r-.55,0,.025]],l.BODY,s),n.ell([o(1.12)+a,r-.62,0],[.04,.07,.04],l.BODY3,s))}function kh(n,e,t,i,r,a){const s=!e.antlers,o=s?.45:[0,.5,.95,.95][r]*(a("antlersGlow")?1.15:1),u=a("antlersGlow")?i>0?l.MAGIC2:l.MAGIC:l.ACCENT,c={group:11+(i>0?1:0),extra:!0};if(!o)return;const h=.045*Math.max(.8,o),f=i*.35*o;if(e.antlers==="palm"){const g=w.add(t,[-.06*o,.12*o,f*.3]);n.seg(t,g,h*1.3,h*1.2,u,c);for(let m=0;m<5;m++){const v=.35+m*.3,E=w.norm([-Math.cos(v),Math.sin(v)*.9,i*.55]),b=(.24+.05*(m%2))*o;n.ell(w.add(g,w.mul(E,b*.55)),[b*.6,h*1.5,h*.6],u,{...c,dir:E,up:[0,0,1]})}return}const d=w.add(t,[-.18*o,.3*o,f*.4]),p=w.add(t,[-.25*o,.62*o,f*.8]),_=w.add(t,[-.1*o,.95*o,f]);n.chain([[...t,h*1.2],[...d,h],[...p,h*.85],[..._,h*.4]],u,c);const x=(g,m,v,E)=>n.seg(g,w.add(g,w.mul(w.norm(m),v)),E,E*.35,u,c);x(w.add(t,[-.04*o,.1*o,f*.1]),[1,.6,0],.28*o,h*.8),(o>.4||s)&&x(d,[1,.9,0],.3*o,h*.7),o>.7&&(x(p,[.8,1,0],.28*o,h*.6),x(_,[.3,1,i*.2],.18*o,h*.5))}function zh(n,e,t,i,r="towards"){const a=e===3,s=e===1,o=e===0,u=_=>a&&n.legend.includes(_),c=new je,h=t?.03:0,f=o?.48:s?.42:.36,d=(o?.95:1.08)+h;for(const _ of[-1,1]){const x=t&&_>0?.04:0;c.seg([.05,.2,_*.14],[.08,.05+x,_*.15],.07,.06,l.BODY2,{group:2});for(const g of[-.04,0,.04])c.ell([.16,.03+x,_*.15+g],[.06,.025,.02],l.ACCENT,{group:2});c.anchors.feet.push({c:[.13,.04+x,_*.15],r:.08,group:_>0?6:2})}if(c.ell([-.32,.32,0],[.22,.06,.14],l.BODY2,{dir:[-1,-.6,0],group:3}),c.ell([0,.55+h,0],[.36,.52,.36],l.BODY,{paint:_=>_[0]>.12&&_[1]<d-f*.5?Math.floor(_[1]*18)%3===0&&Un(_,16,.5)?l.BODY2:l.BELLY:void 0}),!u("wings"))for(const _ of[-1,1])c.ell([-.06,.58+h,_*.3],[.4,.3,.08],l.BODY2,{dir:[-.3,-1,0],up:[1,0,0],group:_>0?4:2,paint:x=>Un(x,12,.15)?l.BODY3:void 0});c.ell([0,d,0],[f,f*.9,f],l.BODY);for(const _ of[-1,1]){const x=w.norm([.75,-.05,_*.4+.35]),g=w.add(je.surface([0,d,0],[f,f*.9,f],x),w.mul(x,-f*.05));c.ell(g,[f*.22,f*.46,f*.4],l.BELLY,{group:1,dir:x});const m=w.add(g,w.mul(x,f*.14));c.ell(m,[f*.1,f*.26,f*.24].map(v=>v*(o?1.15:1)),a?l.MAGIC:l.IRIS,{group:1,dir:x}),c.ell(w.add(m,w.mul(x,f*.07)),[f*.08,f*.14,f*.13].map(v=>v*(o?1.15:1)),a?l.MAGIC2:l.EYE,{group:1,dir:x}),(c.anchors.eyes||={pts:[],size:f*.22}).pts.push(w.add(m,w.mul(x,f*.07))),o||c.ell([f*.05,d+f*.8,_*f*.6],[f*.32,f*.12,f*.08],l.BODY2,{dir:[-.1,1,_*.7],up:[1,0,0],group:1})}if(c.ell(je.surface([0,d,0],[f,f*.9,f],w.norm([.75,-.35,.35])),[f*.2,f*.12,f*.1],l.ACCENT,{dir:[.6,-1,.3],group:1}),u("wings"))for(const _ of[-1,1])os(c,[-.05,.8+h,_*.3],_,1.3,t?.12:0,_>0?l.MAGIC2:l.MAGIC,l.MAGIC,40+(_>0?10:0));if(u("eyesRing"))for(let _=0;_<7;_++){const x=Math.PI*(.15+_/6*.7);c.ell([Math.cos(x)*.2-.1,d+.1+Math.sin(x)*.6,(_-3)*.15],[.07,.07,.07],l.MAGIC2,{group:95+_,extra:!0}),c.ell([Math.cos(x)*.2-.05,d+.1+Math.sin(x)*.6,(_-3)*.15],[.035,.035,.035],l.EYE,{group:95+_,extra:!0})}c.anchors.head={c:[0,d,0],r:[f,f*.9,f]},c.anchors.neck={c:[0,d-f*.75,0],r:f*.85,dir:[0,1,0]},jo(c);const{sp:p}=qi(c,{height:Qo(e,i,.95),facing:r});return a&&Jo(p,31),p}const Ii=(n,e,t,i,r,a,s=1)=>{for(const o of i)n.ell(je.surface(e,t,w.norm(o)),[r,r*1.2,r],a,{group:s});n.anchors.head||={c:e,r:t},n.anchors.eyes||={pts:i.map(o=>je.surface(e,t,w.norm(o))),size:r}},Jc=(n,e,t)=>n.ell([e,.005,0],[t,.005,t*.6],l.NOSE,{group:0});function An(n,e,t,i,r,a){jo(n);const{sp:s}=qi(n,{height:Qo(t,i,r),facing:a});return t===3&&Jo(s,e.id.length*131),s}const Qc=(n,e,t)=>{n.ell(e,[t,t*.35,t],l.MAGIC,{group:95,extra:!0,paint:i=>i[1]>e[1]?l.MAGIC2:void 0});for(let i=0;i<5;i++){const r=i/5*Math.PI*2;n.ell(w.add(e,[Math.cos(r)*t*.8,t*.55,Math.sin(r)*t*.8]),[t*.38,t*.12,t*.12],l.MAGIC,{dir:[0,1,0],up:[1,0,0],group:96,extra:!0})}},el=(n,e)=>e.forEach(([t,i],r)=>n.ell(w.add(t,[0,i*.45,0]),[i*.55,.07,.07],l.MAGIC,{dir:[(r%3-1)*.25,1,(r%2-.5)*.3],group:80+r%2,extra:!0,paint:a=>a[2]>t[2]?l.MAGIC2:void 0}));function Hh(n,e,t,i,r="towards"){const a=e===3,s=new je,o=t?.03:0;for(const[f,d]of[[.28,.2],[.28,-.2],[-.28,.2],[-.28,-.2]])s.seg([f,.15,d],[f+(d>0?o:-o),.03,d],.06,.05,l.BODY3,{group:d>0?6:2}),s.anchors.feet.push({c:[f+.03+(d>0?o:-o),.03,d],r:.065,group:d>0?6:2});const u=[0,.32,0],c=[.5,.32,.38];s.ell(u,c,l.BODY2,{paint:f=>Un(f,22,.3)?l.BODY3:Un(f,19,.12)?l.BELLY:void 0});for(let f=0;f<46;f++){const d=f*2.399%(Math.PI*2),p=f/46*.9+.05,_=w.norm([Math.cos(d)*Math.sin(p*Math.PI*.5)-.25,Math.cos(p*Math.PI*.5)*.9+.1,Math.sin(d)*Math.sin(p*Math.PI*.5)]);_[0]>.55||s.ell(w.add(je.surface(u,c,_),w.mul(_,.02)),[.1,.025,.025],f%4?l.BODY2:l.BODY3,{dir:w.add(_,[-.4,0,0]),group:1})}const h=[.48,.22,0];return s.ell(h,[.22,.14,.15],l.BELLY,{dir:[1,-.3,0],group:1}),s.ell([.69,.16,0],[.04,.04,.04],l.NOSE,{group:1}),Ii(s,h,[.22,.14,.15],[[.3,.6,.55],[.3,.6,-.55]],.035,a?l.MAGIC2:l.EYE),a&&el(s,[[[-.3,.55,.1],.35],[[-.05,.62,-.1],.5],[[.2,.55,.12],.4],[[-.15,.58,.2],.3]]),An(s,n,e,i,.6,r)}function Gh(n,e,t,i,r="towards"){const a=e===3,s=new je,o=t?.05:0;for(const h of[-1,1])s.ell([-.22,.16,h*.36],[.24,.13,.12],h>0?l.BODY:l.BODY2,{dir:[1,.3,0],group:h>0?6:2,paint:f=>Un(f,14,.15)?l.BODY3:void 0}),s.ell([.05,.04,h*.4],[.16,.04,.08],h>0?l.BODY:l.BODY2,{group:h>0?6:2}),s.seg([.35,.2+o,h*.24],[.42,.03,h*.3],.05,.04,h>0?l.BODY:l.BODY2,{group:h>0?7:2}),s.anchors.feet.push({c:[.45,.03,h*.3],r:.06,group:h>0?7:2},{c:[.12,.04,h*.4],r:.08,group:h>0?6:2});const u=[0,.3+o,0],c=[.5,.28,.4];s.ell(u,c,l.BODY,{paint:h=>h[1]<u[1]-.12?l.BELLY:h[0]>.38&&Math.abs(h[1]-(u[1]-.02))<.018?l.LINE:Un(h,14,.22)?l.BODY3:void 0});for(const h of[-1,1]){const f=[.3,.55+o,h*.17];s.ell(f,[.1,.09,.1],l.BODY,{group:1}),s.ell(je.surface(f,[.1,.09,.1],w.norm([.6,.5,h*.5])),[.05,.05,.05],a?l.MAGIC2:l.IRIS,{group:1}),s.ell(je.surface(f,[.11,.1,.11],w.norm([.65,.45,h*.5])),[.03,.015,.03],l.EYE,{group:1})}return s.anchors.head={c:[.22,.45+o,0],r:[.3,.2,.3],top:[.18,.62+o,0]},s.anchors.eyes={pts:[-1,1].map(h=>je.surface([.3,.55+o,h*.17],[.1,.09,.1],w.norm([.6,.5,h*.5]))),size:.05},s.anchors.neck={c:[.32,.3+o,0],r:.25,dir:[1,.3,0]},a&&Qc(s,[.15,.66+o,0],.16),An(s,n,e,i,.55,r)}function Vh(n,e,t,i,r="towards"){const a=e===3,s=e===1,o=d=>a&&n.legend.includes(d),u=new je,c=t?.02:0;for(const d of[-1,1]){const p=t&&d>0?.04:0;u.seg([0,.3,d*.08],[.03,.03+p,d*.08],.03,.025,l.NOSE,{group:d>0?7:2}),u.ell([.08,.02+p,d*.08],[.08,.015,.04],l.NOSE,{group:2}),u.anchors.feet.push({c:[.07,.03+p,d*.08],r:.06,group:d>0?7:2})}if(u.ell([-.55,.42,0],[.32,.035,.12],l.BODY2,{dir:[-1,-.25,0],group:3}),u.ell([0,.52+c,0],[.42,.26,.24],l.BODY,{dir:[1,.45,0]}),!o("wings"))for(const d of[-1,1])u.ell([-.1,.55+c,d*.2],[.45,.17,.05],l.BODY2,{dir:[-1,-.25,0],group:d>0?4:2});const h=[.36,.84+c,0],f=s?.19:.16;if(u.ell(h,[f*1.1,f,f*.95],l.BODY,{paint:d=>d[1]>h[1]+f*.55?l.BELLY:void 0}),u.ell(w.add(h,[f*1.5,-f*.25,0]),[f*1,f*.38,f*.3],l.NOSE,{dir:[1,-.2,0],group:1}),Ii(u,h,[f*1.1,f,f*.95],[[.55,.35,.65],[.55,.35,-.65]],f*.16,a?l.MAGIC2:l.EYE),o("wings"))for(const d of[-1,1])os(u,[-.05,.65+c,d*.18],d,1.1,t?.1:0,d>0?l.MAGIC2:l.MAGIC,l.MAGIC,40+(d>0?10:0));if(o("eyesRing"))for(let d=0;d<6;d++){const p=Math.PI*(.2+d/5*.6);u.ell([Math.cos(p)*.25-.1,.95+Math.sin(p)*.45,(d-2.5)*.12],[.06,.06,.06],l.MAGIC2,{group:95+d,extra:!0})}return An(u,n,e,i,.75,r)}function Wh(n,e,t,i,r="towards"){const a=e===3,s=d=>a&&n.legend.includes(d),o=new je,u=t===0,c=.55,h=s("wingsBig")?1.5:1;Jc(o,0,.3*h);for(const d of[-1,1]){const p=[0,c+.05,d*.1],_=[.05,c+(u?.35:-.05),d*.45*h],x=[[-.05,c+(u?.45:-.15),d*.85*h],[-.25,c+(u?.2:-.25),d*.75*h],[-.3,c+(u?0:-.25),d*.4*h]],g=s("wingsBig")?l.MAGIC:l.BODY2,m=s("wingsBig")?l.MAGIC2:l.BODY3;o.seg(p,_,.03,.025,m,{group:11});for(const A of x)o.seg(_,A,.02,.012,m,{group:11});const v=w.sub(x[0],p),E=w.norm(v),b=w.norm(w.sub(x[2],_)),R=w.norm(w.sub(b,w.mul(E,w.dot(b,E))));o.flat(w.add(w.lerp(p,x[0],.5),w.mul(R,.12*h)),E,R,Math.hypot(...v)*.55,.3*h,Tr.membrane(g),{group:10+(d>0?1:0),bend:.2})}o.ell([0,c,0],[.13,.16,.12],l.BODY,{group:1});const f=[.08,c+.2,0];o.ell(f,[.12,.11,.11],l.BODY,{group:1});for(const d of[-1,1])o.ell(w.add(f,[-.02,.15,d*.07]),[.12,.045,.02],l.BODY,{dir:[.1,1,d*.3],up:[1,0,0],group:1,paint:p=>p[0]>f[0]-.01?l.EAR:void 0});return Ii(o,f,[.12,.11,.11],[[.7,.2,.5],[.7,.2,-.5]],.025,a?l.MAGIC2:l.EYE),o.ell(je.surface(f,[.12,.11,.11],[1,-.2,0]),[.025,.02,.03],l.NOSE,{group:1}),An(o,n,e,i,.55,r)}function Yh(n,e,t,i,r="towards"){const a=e===3,s=new je,o=t?.03:0;s.seg([-.5,.18,0],[-.62,.12,0],.04,.02,l.SKIN,{group:3});for(const u of[-1,1])s.ell([-.3,.05,u*.2],[.07,.04,.05],l.SKIN,{group:u>0?6:2}),s.anchors.feet.push({c:[-.3,.05,u*.2],r:.07,group:u>0?6:2});s.ell([0,.3,0],[.52,.29,.33],l.BODY,{paint:u=>u[1]>.45?l.BODY2:void 0}),s.ell([.55,.24,0],[.2,.07,.07],l.SKIN,{dir:[1,-.15,0],group:1}),s.ell([.74,.21,0],[.04,.05,.06],l.NOSE,{group:1});for(const u of[-1,1]){const c=[.32,.1-(u>0?o:0),u*.34];s.ell(c,[.13,.035,.12],l.SKIN,{group:u>0?7:2,axes:[[1,0,0],[0,1,0],[0,0,1]]});for(let h=0;h<4;h++)s.ell(w.add(c,[.14,-.01,u*(h-1.5)*.05]),[.05,.015,.015],l.ACCENT,{group:u>0?7:2})}for(const u of[-1,1])s.ell(je.surface([0,.3,0],[.52,.29,.33],w.norm([.85,.3,u*.35])),[.015,.015,.015],a?l.MAGIC2:l.EYE,{group:1});return s.anchors.head={c:[.32,.34,0],r:[.25,.22,.25],top:[.3,.58,0]},s.anchors.eyes={pts:[-1,1].map(u=>je.surface([0,.3,0],[.52,.29,.33],w.norm([.85,.3,u*.35]))),size:.03},s.anchors.neck={c:[.36,.3,0],r:.27,dir:[1,.1,0]},a&&Qc(s,[.15,.62,0],.15),An(s,n,e,i,.55,r)}function Xh(n,e,t,i,r="towards"){const a=e===3,s=f=>a&&n.legend.includes(f),o=new je;for(const f of[-1,1])for(let d=0;d<3;d++){const p=.25-d*.25,_=(d+(f>0?1:0)+t)%2?.06:-.06,x=[p,.22,f*.2];o.chain([[...x,.03],[p+_+(1-d)*.06,.32,f*.42,.025],[p+_*1.5+(1-d)*.15,.02,f*.55,.015]],f>0?l.BODY2:l.BODY3,{group:f>0?7:2})}o.ell([-.12,.34,0],[.46,.24,.32],l.BODY,{paint:f=>Math.abs(f[2])<.018&&f[1]>.4?l.LINE:f[1]>.5&&f[2]>.05&&f[2]<.17?l.BELLY:void 0}),o.ell([.38,.33,0],[.16,.16,.26],l.BODY,{group:1});const u=[.56,.3,0];o.ell(u,[.1,.1,.17],l.BODY2,{group:1});const c=[.3,.5,.7,.75][e]*(s("horn")?1.3:1),h=s("horn")?l.MAGIC:l.BODY3;for(const f of[-1,1]){const d=w.add(u,[.08,.02,f*.1]),p=w.add(d,[c*.7,c*.45,f*c*.15]),_=w.add(p,[c*.25,-c*.12,-f*c*.12]);o.chain([[...d,.045],[...p,.035],[..._,.015]],h,{group:8+(f>0?1:0)}),o.seg(w.lerp(d,p,.55),w.add(w.lerp(d,p,.55),[0,c*.22,0]),.02,.008,h,{group:8})}for(const f of[-1,1])o.chain([[...w.add(u,[.05,.06,f*.1]),.012],[u[0]+.1,.5,f*.22,.012],[u[0]+.2,.5,f*.26,.012]],l.BODY3,{group:9,extra:!0});return Ii(o,u,[.1,.1,.17],[[.4,.3,.85],[.4,.3,-.85]],.032,a?l.MAGIC2:l.EYE,9),s("crystals")&&el(o,[[[-.35,.5,.1],.3],[[-.1,.55,-.08],.45],[[.1,.5,.1],.35]]),An(o,n,e,i,.5,r)}function Kh(n,e,t,i,r="towards"){const a=e===3,s=new je,o=t?.04:0;s.ell([0,.07,0],[.6+o,.07,.17],l.SKIN,{group:1}),s.chain([[.45+o,.08,0,.1],[.6+o,.25,0,.09],[.68+o,.28,0,.08]],l.SKIN,{group:1});for(const h of[-1,1])s.seg([.7+o,.32,h*.04],[.78+o,.55,h*.1],.018,.014,l.SKIN,{group:5}),s.ell([.78+o,.57,h*.1],[.03,.03,.03],a?l.MAGIC2:l.EYE,{group:5});s.anchors.head={c:[.68+o,.3,0],r:[.09,.08,.09],top:[.66+o,.38,0]},s.anchors.eyes={pts:[-1,1].map(h=>[.78+o,.57,h*.1]),size:.03},s.anchors.neck={c:[.55+o,.17,0],r:.1,dir:[1,1.2,0]};const u=[-.12,.4,0],c=a?l.MAGIC:l.BODY;return s.ell(u,[.32,.32,.22],c,{group:3,paint:h=>{const f=Math.atan2(h[1]-u[1],h[0]-u[0]);return((Math.hypot(h[0]-u[0],h[1]-u[1])/.32-f/(Math.PI*2)*.3)%.3+.3)%.3<.06?a?l.MAGIC2:l.BODY3:void 0}}),An(s,n,e,i,.45,r)}function qh(n,e,t,i,r="towards"){const a=e===3,s=new je;for(const o of[-1,1])for(let u=0;u<7;u++){const c=-.45+u*.15,h=(u+t)%2?.03:-.03;s.seg([c,.1,o*.22],[c+h,.01,o*.33],.025,.015,l.BODY3,{group:o>0?7:2})}for(const o of[-1,1])s.chain([[.5,.15,o*.08,.02],[.7,.3,o*.2,.015],[.82,.22,o*.26,.012]],l.BODY3,{group:9,extra:!0});return s.ell([0,.18,0],[.58,.2,.3],l.BODY,{paint:o=>(Math.floor((o[0]+.6)*9)%2&&o[1]>.2?l.BODY2:void 0)||(Math.abs((o[0]+.6)*9%1)<.12?l.LINE:void 0)}),Ii(s,[0,.18,0],[.58,.2,.3],[[.92,.3,.25],[.92,.3,-.25]],.02,a?l.MAGIC2:l.EYE),a&&el(s,[[[-.3,.32,.05],.3],[[0,.37,-.05],.45],[[.25,.32,.05],.32]]),An(s,n,e,i,.4,r)}function Zh(n,e,t,i,r="towards"){const a=e===3,s=e===1,o=p=>a&&n.legend.includes(p),u=new je,c=t?.7:0,h=[];for(let p=0;p<=12;p++){const _=p/12;h.push([-.9+_*1.2,.07,Math.sin(_*Math.PI*2+c)*.25*(1-_*.5),.03+.045*Math.sin(Math.min(1,_*1.4)*Math.PI/2)])}h.push([.38,.25,h[12][2],.07],[.42,.45,h[12][2]*.8,.065]),u.chain(h,l.BODY,{paint:p=>p[1]<.05&&p[0]<.35?l.BELLY:Un([p[0]*1.5,p[1],p[2]],14,.3)?l.BODY3:void 0});const f=[.5,.5,h[13][2]*.8],d=s?.11:.09;if(u.ell(f,[d*1.5,d*.75,d],l.BODY,{dir:[1,-.15,0],group:1}),Ii(u,f,[d*1.5,d*.75,d],[[.5,.5,.7],[.5,.5,-.7]],d*.22,a?l.MAGIC2:l.EYE),t||u.seg(w.add(f,[d*1.4,-d*.2,0]),w.add(f,[d*2.3,-d*.3,0]),.01,.008,l.SKIN,{group:1}),u.anchors.feet.push({c:w.add(h[0].slice(0,3),[-.02,-.01,0]),r:.06,group:3,tail:!0}),u.anchors.neck={c:[.42,.36,h[12][2]*.9],r:.075,dir:[.2,1,0]},o("wings"))for(const p of[-1,1])os(u,[0,.2,p*.05],p,.9,t?.1:0,p>0?l.MAGIC2:l.MAGIC,l.MAGIC,40+(p>0?10:0));return An(u,n,e,i,.45,r)}function $h(n,e,t,i,r="towards"){const a=e===3,s=d=>a&&n.legend.includes(d),o=new je,u=t===0,c=.55,h=s("wingsBig")?1.45:1,f=s("wingsBig")?l.MAGIC:l.BODY;Jc(o,0,.3*h);for(const d of[-1,1]){const p=u?.5:-.1,_=w.norm([.35,p,d]),x=w.norm([-.3,p*.6,d]);o.flat(w.add([0,c,d*.05],w.mul(_,.38*h)),_,w.norm(w.cross(_,[0,1,0])),.4*h,.24*h,Tr.spotted(f,l.BELLY,l.BODY3),{group:10+(d>0?1:0)}),o.flat(w.add([-.05,c,d*.05],w.mul(x,.26*h)),x,w.norm(w.cross(x,[0,1,0])),.27*h,.17*h,Tr.spotted(s("wingsBig")?l.MAGIC2:l.BODY2,l.BODY2,l.BODY2),{group:12+(d>0?1:0)}),o.chain([[.12,c+.08,d*.03,.015],[.2,c+.25,d*.1,.025],[.24,c+.32,d*.14,.012]],l.BODY2,{group:11})}return o.ell([0,c,0],[.22,.09,.09],l.BELLY,{group:1,paint:d=>Un(d,30,.25)?l.BODY2:void 0}),o.ell([.17,c+.03,0],[.07,.07,.07],l.BELLY,{group:1}),Ii(o,[.17,c+.03,0],[.07,.07,.07],[[.7,.3,.6],[.7,.3,-.6]],.02,a?l.MAGIC2:l.EYE),An(o,n,e,i,.5,r)}function Jh(n,e,t,i,r="towards"){const a=e===3,s=c=>a&&n.legend.includes(c),o=new je,u=t?.05:0;for(let c=0;c<9;c++){const h=c/8,f=-.6+h*1.15;o.ell([f,.12+Math.sin(h*Math.PI)*(.06+u),0],[.08,.1-h*.02,.12-h*.03],c<2?l.MAGIC2:c%2?l.BODY2:l.BODY,{group:1})}s("lantern")&&o.ell([-.75,.3,0],[.22,.22,.22],l.MAGIC2,{group:3,paint:c=>c[1]<.2?l.MAGIC:void 0});for(let c=0;c<6;c++)o.seg([-.2+c*.12,.05,.08],[-.2+c*.12+(c%2?.02:-.02)*(t?-1:1),0,.12],.015,.01,l.BODY3,{group:7});return o.ell([.6,.14,0],[.06,.06,.08],l.BODY3,{group:1}),Ii(o,[.6,.14,0],[.06,.06,.08],[[.6,.3,.7],[.6,.3,-.7]],.015,a?l.MAGIC2:l.EYE),An(o,n,e,i,.4,r)}function Qh(n,e,t,i,r="towards"){const a=e===3,s=h=>a&&n.legend.includes(h),o=new je,u=[.15,.28,0];for(const h of[-1,1])for(let f=0;f<4;f++){const d=-.6+f*.4,p=(f+(h>0?0:1)+t)%2?.05:-.05,_=w.add(u,[.05-f*.04,0,h*.1]),x=w.add(_,[Math.cos(d)*.3*(f<2?1:-.6)+p,.3,h*.3]),g=w.add(_,[Math.cos(d)*.55*(f<2?1:-.8)+p*1.5,-.28,h*.55]);o.chain([[..._,.03],[...x,.028],[...g,.015]],h>0?l.BODY2:l.BODY3,{group:h>0?7:2})}o.ell([-.28,.38,0],[.34,.28,.3],l.BODY,{paint:h=>(Math.abs(h[2])<.03||Math.abs(h[0]+.28)<.03)&&h[1]>.45?l.BELLY:void 0}),o.ell(u,[.18,.13,.17],l.BODY2,{group:1}),o.anchors.head={c:u,r:[.18,.13,.17]},o.anchors.eyes={pts:[[.05,.05],[.05,-.05]].map(([h,f])=>je.surface(u,[.18,.13,.17],w.norm([.9,h*6,f*4]))),size:.03},o.anchors.neck={c:[-.02,.32,0],r:.15,dir:[1,0,0]};const c=s("eyesRing");for(const[h,f]of[[.05,.05],[.05,-.05],[.02,.1],[.02,-.1]])o.ell(je.surface(u,[.18,.13,.17],w.norm([.9,h*6,f*4])),[.025,.025,.025],c?l.MAGIC2:l.EYE,{group:1});if(c)for(let h=0;h<5;h++){const f=Math.PI*(.2+h/4*.6);o.ell([-.3+Math.cos(f)*.2,.75+Math.sin(f)*.35,(h-2)*.12],[.06,.06,.06],l.MAGIC2,{group:95+h,extra:!0})}return An(o,n,e,i,.5,r)}const jh=new Map(Object.entries({owl:zh,hedgehog:Hh,toad:Gh,raven:Vh,bat:Wh,mole:Yh,beetle:Xh,snail:Kh,woodlouse:qh,snake:Zh,moth:$h,glowworm:Jh,spider:Qh})),tl=[{id:"wolf",name:"Wolf",plan:"quad",hue:.08,sat:.24,val:.56,legend:["wings","mane"],q:{len:.64,chest:.42,tuck:.6,neck:.32,neckAng:.7,neckW:.42,hr:.26,snout:.82,snoutD:.7,ear:"point",earS:.82,tail:"brush",paw:"paw",legW:1.25,saddle:!0,belly:!0},tail:"up"},{id:"fox",name:"Fox",plan:"quad",q:{hgt:.8,len:.62,chest:.4,tuck:.5,neck:.3,neckAng:.7,neckW:.32,hr:.24,snout:1.05,snoutD:.5,snoutTaper:.6,ear:"point",earS:1.35,tail:"bushy",paw:"paw",legW:.9,belly:!0,socks:.3},hue:.06,sat:.8,val:.9,belly:"white",legend:["tails"]},{id:"badger",name:"Badger",plan:"quad",q:{hgt:.62,len:.78,chest:.2,tuck:.22,neck:.18,neckAng:.1,neckW:.5,hr:.26,snout:1,snoutD:.55,snoutTaper:.55,ear:"round",earS:.7,tail:"stub",paw:"paw",legW:1.35,legMat:l.BODY3,face:"badger",shaggy:!0},hue:.65,sat:.08,val:.45,legend:["crystals"]},{id:"boar",name:"Boar",plan:"quad",hue:.07,sat:.62,val:.5,legend:["tusksBig"],q:{len:.72,chest:.34,tuck:.42,neck:.2,neckAng:-.15,neckW:.55,hr:.27,snout:1.25,snoutD:.62,snoutTaper:.55,ear:"small",earS:.8,tail:"thin",paw:"hoof",legW:1.15,ridge:!0,tusks:!0,back:"hump",disc:!0},ridge:!0},{id:"stag",name:"Stag",plan:"quad",q:{hgt:1.3,len:.6,chest:.6,tuck:.7,neck:.55,neckAng:.95,neckW:.32,hr:.2,snout:1.15,snoutD:.6,snoutTaper:.65,ear:"point",earS:1.1,tail:"deer",paw:"hoof",legW:.75,antlers:"branch",rump:!0,spots:"young",belly:!0},hue:.08,sat:.5,val:.7,legend:["antlersGlow"]},{id:"hare",name:"Hare",plan:"quad",q:{hgt:.72,len:.5,chest:.4,tuck:.45,neck:.2,neckAng:.9,neckW:.35,hr:.27,snout:.65,snoutD:.7,ear:"long",earS:2.4,tail:"puff",paw:"paw",legW:.85,haunch:1.35,hindFoot:1.6,back:"arch",belly:!0,whiskers:!0},hue:.08,sat:.4,val:.72,legend:["jackalope"]},{id:"owl",name:"Owl",plan:"owl",hue:.08,sat:.5,val:.55,legend:["eyesRing","wings"]},{id:"bear",name:"Bear",plan:"quad",q:{hgt:1.15,len:.72,chest:.38,tuck:.4,neck:.25,neckAng:.3,neckW:.55,hr:.28,snout:.7,snoutD:.62,snoutTaper:.7,ear:"round",earS:.8,tail:"stub",paw:"paw",legW:1.55,back:"hump",muzzle:!0,shaggy:!0},hue:.07,sat:.55,val:.42,legend:["moss"]},{id:"hedgehog",name:"Hedgehog",plan:"hedgehog",hue:.08,sat:.4,val:.5,legend:["crystals"]},{id:"squirrel",name:"Squirrel",plan:"quad",q:{hgt:.55,len:.45,chest:.35,tuck:.4,neck:.2,neckAng:.9,neckW:.35,hr:.3,snout:.55,snoutD:.65,ear:"tuft",earS:1.1,tail:"squirrel",paw:"paw",legW:.8,haunch:1.3,back:"arch",belly:!0,whiskers:!0},hue:.03,sat:.75,val:.75,belly:"white",legend:["starTail"]},{id:"toad",name:"Toad",plan:"toad",hue:.2,sat:.5,val:.55,legend:["crown"]},{id:"otter",name:"Otter",plan:"quad",q:{hgt:.55,len:1,chest:.25,tuck:.25,neck:.3,neckAng:.35,neckW:.5,hr:.27,snout:.6,snoutD:.7,ear:"round",earS:.5,tail:"otter",paw:"paw",legW:1.1,muzzle:!0,belly:!0,whiskers:!0},hue:.07,sat:.55,val:.45,belly:"white",legend:["ribbons"]},{id:"lynx",name:"Lynx",plan:"quad",q:{hgt:.9,len:.55,chest:.5,tuck:.55,neck:.25,neckAng:.8,neckW:.4,hr:.27,snout:.5,snoutD:.75,snoutTaper:.8,ear:"tuft",earS:1,tail:"bob",paw:"paw",legW:1.2,cheeks:!0,spots:!0,belly:!0,whiskers:!0},hue:.09,sat:.45,val:.75,legend:["mane"]},{id:"elk",name:"Elk",plan:"quad",q:{hgt:1.4,len:.68,chest:.6,tuck:.66,neck:.45,neckAng:.75,neckW:.42,hr:.24,snout:1.6,snoutD:.9,snoutTaper:.85,ear:"point",earS:.9,tail:"stub",paw:"hoof",legW:.9,back:"hump",antlers:"palm",shaggy:!0},hue:.07,sat:.55,val:.38,legend:["antlersGlow","moss"]},{id:"raven",name:"Raven",plan:"raven",hue:.68,sat:.35,val:.3,legend:["wings","eyesRing"]},{id:"bat",name:"Bat",plan:"bat",hue:.78,sat:.25,val:.45,legend:["wingsBig"]},{id:"mole",name:"Mole",plan:"mole",hue:.7,sat:.15,val:.32,legend:["crown"]},{id:"beaver",name:"Beaver",plan:"quad",q:{hgt:.6,len:.65,chest:.2,tuck:.22,neck:.2,neckAng:.4,neckW:.55,hr:.28,snout:.6,snoutD:.75,ear:"round",earS:.45,tail:"flat",paw:"paw",legW:1.2,back:"arch",teeth:!0,whiskers:!0},hue:.06,sat:.6,val:.45,legend:["moss"]},{id:"stoat",name:"Stoat",plan:"quad",q:{hgt:.5,len:1,chest:.3,tuck:.33,neck:.35,neckAng:.6,neckW:.32,hr:.25,snout:.6,snoutD:.6,ear:"round",earS:.6,tail:"stoat",paw:"paw",legW:.8,belly:!0,back:"arch",whiskers:!0},hue:.1,sat:.25,val:.92,legend:["ribbons","mane"]},{id:"snail",name:"Snail",plan:"snail",hue:.08,sat:.45,val:.55,legend:["glowShell"]},{id:"ram",name:"Ram",plan:"quad",q:{hgt:.95,len:.6,chest:.48,tuck:.52,neck:.22,neckAng:.45,neckW:.48,hr:.25,snout:.85,snoutD:.75,snoutTaper:.8,ear:"small",earS:.7,tail:"stub",paw:"hoof",legW:.9,wool:!0,horns:"curl",face:"dark"},hue:.1,sat:.12,val:.88,legend:["hornsGlow"]},{id:"woodlouse",name:"Woodlouse",plan:"woodlouse",hue:.65,sat:.12,val:.45,legend:["crystals"]},{id:"snake",name:"Snake",plan:"snake",hue:.25,sat:.45,val:.45,legend:["wings"]},{id:"moth",name:"Moth",plan:"moth",hue:.1,sat:.3,val:.7,legend:["wingsBig"]},{id:"marten",name:"Pine marten",plan:"quad",q:{hgt:.55,len:.78,chest:.35,tuck:.38,neck:.3,neckAng:.55,neckW:.35,hr:.25,snout:.65,snoutD:.6,ear:"round",earS:.9,tail:"bushy",paw:"paw",legW:.85,belly:!0,back:"arch"},hue:.07,sat:.6,val:.45,legend:["mane"]},{id:"salamander",name:"Salamander",plan:"quad",q:{hgt:.42,len:.9,chest:.14,tuck:.14,neck:.12,neckAng:.05,neckW:.5,hr:.27,snout:.55,snoutD:.55,ear:"none",tail:"otter",paw:"paw",legW:1,spots:!0,spotMat:"belly"},hue:.1,sat:.1,val:.22,belly:"yellow",legend:["flames"]},{id:"glowworm",name:"Glow-worm",plan:"glowworm",hue:.12,sat:.4,val:.35,legend:["lantern"]},{id:"spider",name:"Spider",plan:"spider",hue:.07,sat:.45,val:.4,legend:["eyesRing"]},{id:"dormouse",name:"Dormouse",plan:"quad",q:{hgt:.38,len:.45,chest:.35,tuck:.38,neck:.15,neckAng:.6,neckW:.4,hr:.34,snout:.45,snoutD:.7,ear:"round",earS:.85,tail:"squirrel",paw:"paw",legW:.8,back:"arch",belly:!0,whiskers:!0,eyeK:1.6},hue:.09,sat:.6,val:.75,belly:"white",legend:["starTail"]},{id:"beetle",name:"Stag beetle",plan:"beetle",hue:.78,sat:.5,val:.35,legend:["horn","crystals"]}],jc=Object.fromEntries(tl.map(n=>[n.id,n])),Ol=[[[255,70,170],[255,245,250],[255,230,70]],[[40,220,255],[255,236,60],[255,80,180]],[[150,80,255],[175,255,60],[255,255,255]]],Fl={sneakers:[[255,70,90],[250,250,245]],glitter:[[215,215,235],[190,190,210]],platform:[[160,60,230],[40,30,52]]};function ed(n,e,t=null){const i=td(n,e);if(!t)return i;if(t.collar&&(i[l.COLLAR]=Array.isArray(t.collar)?t.collar:i[l.MAGIC]),t.hat!=null){const[r,a,s]=Ol[t.hat%Ol.length];i[l.HAT1]=r,i[l.HAT2]=a,i[l.POM]=s}if(t.glasses&&(i[l.SHADES]=[22,18,32],i[l.FRAME]=t.glasses==="heart"?[255,60,110]:[255,90,210]),t.shoes){const[r,a]=Fl[t.shoes]||Fl.sneakers;i[l.SHOE]=r,i[l.SOLE]=a}if(t.woken){i[l.WOKEN]=[255,40,36];for(const r of[l.BODY,l.BODY2,l.BODY3,l.BELLY,l.ACCENT,l.EAR])i[r]&&(i[r]=i[r].map((a,s)=>Math.round(a*.72+[30,8,12][s]*.1)))}return i}function td(n,e){const t=jc[n],i=e.cVal/.85,r=e.cSat/.6,a=Me(t.hue,t.sat*r*e.sat,t.val*i),s=t.belly==="yellow"?[240,196,40]:t.belly==="white"||t.q?.face==="badger"?[236,232,222]:Me(t.hue+.03,t.sat*.5*r,Math.min(1,t.val*i*1.3+.08)),o=Me(e.magicHue+t.hue*.3,.6,1),u=Me(e.magicHue+t.hue*.3,.18,1),c=["boar","stag","elk","ram"].includes(t.id);return{[l.BODY]:a,[l.BODY2]:Me(t.hue+.02,Math.min(1,t.sat*r*1.2+.05),t.val*i*.66),[l.BODY3]:Me(t.hue+.03,Math.min(1,t.sat*r*1.3+.1),t.val*i*.4),[l.BELLY]:s,[l.ACCENT]:c?[236,226,200]:Me(t.hue+.05,t.sat*.6,Math.min(1,t.val*i*.5+.25)),[l.MAGIC]:o,[l.MAGIC2]:u,[l.LEAF]:Me(.3,.55,.55),[l.LEAF2]:Me(.25,.5,.75),[l.LEAF3]:Me(.33,.6,.35),[l.TRUNK]:Me(.07,.45,.32),[l.EYE]:[24,18,30],[l.PUPIL]:[70,40,90],[l.GLINT]:[255,255,245],[l.NOSE]:[38,28,36],[l.EAR]:Me(t.hue+.97,Math.min(1,t.sat*.6+.2),Math.min(1,t.val*i*.55+.2)),[l.IRIS]:t.plan==="owl"?[255,176,40]:Me(.12,.7,.85),[l.SKIN]:[238,158,192]}}const nd=["size","growth","pixel","head","eye","legs","long","fur"],Br=new Map;function id(n,e,t,i,r="towards",a=null){const s=jc[n]||tl[0],o=a&&(a.collar||a.hat!=null||a.glasses||a.shoes||a.woken)?a:null,u=[s.id,e,t,r,...nd.map(h=>i[h]),o?[!!o.collar,o.hat??"",o.glasses||"",o.shoes||"",!!o.woken].join(","):""].join("|");let c=Br.get(u);if(!c){if(c=Nh(o,()=>s.q?Fh(s,e,t,i,r):jh.get(s.plan)(s,e,t,i,r)),o?.woken)for(let h=0;h<c.m.length;h++)(c.m[h]===l.EYE||c.m[h]===l.IRIS||c.m[h]===l.PUPIL)&&(c.m[h]=l.WOKEN);Br.size>600&&Br.delete(Br.keys().next().value),Br.set(u,c)}return c}const Ke=(...n)=>({l:n}),Mt=(n,e,t,i,r)=>({a:[n,e,t,i,r]}),Zt=(n,e)=>({d:[n,e]}),ht=(n,e=.86)=>Ke([.5,e],[.5,n]),dt=Mt(.5,.76,.13,25,155),rd=n=>n.l?{l:n.l.map(([e,t])=>[1-e,t])}:n.a?{a:[1-n.a[0],n.a[1],n.a[2],180-n.a[3],180-n.a[4]]}:{d:[1-n.d[0],n.d[1]]},ft=(...n)=>n.flatMap(e=>[e,rd(e)]);function ii(n,e,t){const i=e[0]-n[0],r=e[1]-n[1],a=Math.hypot(i,r),s=t*a,o=(a*a/4+s*s)/(2*Math.abs(s)),u=(n[0]+e[0])/2,c=(n[1]+e[1])/2,h=r/a,f=-i/a,d=(o-Math.abs(s))*Math.sign(s),p=u-h*d,_=c-f*d,x=Math.atan2(n[1]-_,n[0]-p)*180/Math.PI;let m=Math.atan2(e[1]-_,e[0]-p)*180/Math.PI-x;for(;m>180;)m-=360;for(;m<-180;)m+=360;return Mt(p,_,o,x,x+m)}const ad=(n,e,t,i,r,a=24)=>Ke(...Array.from({length:a+1},(s,o)=>[n+i*Math.sin(o/a*r*2*Math.PI),e+(t-e)*o/a])),sd=(n,e,t,i,r,a=0,s=40)=>Ke(...Array.from({length:s+1},(o,u)=>{const c=u/s,h=(a+c*r*360)*Math.PI/180,f=t+(i-t)*c;return[n+f*Math.cos(h),e+f*Math.sin(h)]})),ma=(n,e,t,i,r)=>r.map(a=>{const s=Math.cos(a*Math.PI/180),o=Math.sin(a*Math.PI/180);return Ke([n+t*s,e+t*o],[n+i*s,e+i*o])});ht(.3),Ke([.28,.08],[.5,.3],[.72,.08]),Mt(.5,.55,.2,-55,55),Zt(.5+.2*Math.cos(-55*Math.PI/180),.55+.2*Math.sin(-55*Math.PI/180)),ht(.34),Ke([.36,.06],[.5,.34],[.64,.06]),Mt(.67,.66,.17,180,-80),Zt(.67+.17*Math.cos(-80*Math.PI/180),.66+.17*Math.sin(-80*Math.PI/180)),[ht(.1),Ke([.24,.3],[.76,.3]),...ft(Ke([.33,.14],[.33,.56])),...ft(Zt(.24,.3))],[ht(.16),...ft(Mt(.36,.24,.15,45,180)),...ma(.5,.16,0,.1,[-130,-90,-50])],[ht(.42),...ft(Ke([.5,.42],[.34,.26],[.3,.06]),Ke([.335,.25],[.16,.2]),Ke([.32,.15],[.18,.07]))],[ht(.44),...ft(Ke([.5,.44],[.4,.34],[.38,.06])),Mt(.62,.66,.09,180,540),...ft(Zt(.38,.06))],[ht(.44),...ft(Mt(.33,.3,.13,0,360),Ke([.24,.18],[.18,.05])),...ft(Zt(.33,.3))],[ht(.24),Ke([.24,.3],[.76,.3]),...ft(Mt(.3,.3,.09,180,360)),...ft(Ke([.36,.5],[.32,.62]))],[ht(.52),Mt(.5,.52,.2,180,360),...ma(.5,.52,.22,.34,[-160,-125,-90,-55,-20])],ht(.2),Ke([.5,.2],[.4,.08]),Mt(.66,.4,.16,100,-200),Zt(.66+.16*Math.cos(-200*Math.PI/180),.4+.16*Math.sin(-200*Math.PI/180)),[ht(.42),Ke([.16,.54],[.24,.42],[.76,.42],[.84,.54]),...ft(Mt(.34,.3,.1,0,360)),...ft(Zt(.16,.54))],ht(.24),Mt(.5,.5,.28,-100,100),Zt(.5+.28*Math.cos(-100*Math.PI/180),.5+.28*Math.sin(-100*Math.PI/180)),ii([.18,.64],[.36,.64],.3),[ht(.32),Ke([.26,.2],[.5,.32],[.74,.2]),...ft(Ke([.26,.2],[.26,.06])),Ke([.5,.68],[.66,.62]),...ft(Zt(.26,.06))],[ht(.3),...ft(Ke([.5,.3],[.42,.2]),Mt(.3,.16,.12,0,180),Ke([.18,.16],[.14,.06])),Ke([.5,.44],[.6,.52])],[ht(.14),Ke([.5,.14],[.3,.22]),Ke([.18,.56],[.5,.38],[.82,.56]),Zt(.58,.17),...ft(Zt(.18,.56))],[ht(.3),Mt(.5,.16,.14,20,160),...ft(Ke([.5,.38],[.12,.26]),ii([.12,.26],[.24,.46],-.25),ii([.24,.46],[.38,.5],-.3),ii([.38,.5],[.5,.52],-.3))],[ht(.44),Mt(.5,.3,.16,0,180),...ma(.5,.3,.19,.3,[-160,-125,-55,-20]),Ke([.5,.14],[.5,.04])],[ht(.36),Ke([.32,.2],[.68,.2]),...ft(Ke([.44,.2],[.44,.34])),Ke([.5,.56],[.68,.66],[.5,.76],[.32,.66],[.5,.56])],[ht(.18),Mt(.5,.44,.24,180,360),Ke([.5,.18],[.6,.08]),...ft(Zt(.26,.44))],ht(.52),sd(.5,.33,.03,.2,1.6,90),Ke([.66,.2],[.76,.06]),Zt(.76,.06),[ht(.24),...ft(Mt(.36,.24,.14,0,-250)),...ft(Zt(.36+.14*Math.cos(-250*Math.PI/180),.24+.14*Math.sin(-250*Math.PI/180)))],[ht(.24),Mt(.5,.52,.22,205,335),Mt(.5,.66,.24,205,335),Mt(.5,.38,.2,205,335),...ft(Ke([.5,.24],[.32,.06]))],[ht(.16),ad(.5,.82,.2,.2,1.25),Ke([.5,.2],[.5,.11]),...ft(Ke([.5,.11],[.42,.045]))],[ht(.2),...ft(Ke([.5,.3],[.16,.18],[.24,.5],[.5,.4]),Ke([.5,.5],[.3,.64],[.5,.66]),Mt(.38,.16,.12,0,-110))],[ht(.32),Ke([.3,.2],[.5,.32],[.7,.2]),...ft(Mt(.3,.14,.07,90,-180)),Mt(.28,.56,.22,0,150),Zt(.28+.22*Math.cos(150*Math.PI/180),.56+.22*Math.sin(150*Math.PI/180))],[ht(.3),ii([.5,.3],[.5,.06],.35),ii([.5,.3],[.5,.06],-.35),...ft(Ke([.5,.42],[.32,.38],[.26,.48]),Ke([.5,.64],[.32,.6],[.26,.7])),...ft(Zt(.38,.52))],[ht(.4),Mt(.5,.27,.1,90,450),...ma(.5,.27,.15,.25,[0,60,120,180,240,300])],[Ke([.5,.05],[.5,.3]),ht(.5),Mt(.5,.4,.11,-90,270),...ft(...[-150,-170,170,150].map(n=>Ke([.5+.12*Math.cos(n*Math.PI/180),.4+.12*Math.sin(n*Math.PI/180)],[.5+.28*Math.cos(n*Math.PI/180),.4+.28*Math.sin(n*Math.PI/180)],[.5+.32*Math.cos(n*Math.PI/180),.4+.28*Math.sin(n*Math.PI/180)+.1]))),Zt(.5,.05)],[ht(.12),Mt(.5,.46,.24,-60,250),...ft(Mt(.34,.16,.08,90,-180)),ii([.56,.38],[.7,.38],-.4)],[ht(.36),...ft(Mt(.66,.26,.2,160,250)),ii([.5,.38],[.5,.82],.25),ii([.5,.38],[.5,.82],-.25)];tl.map(n=>n.id);const od=new Set([l.TRUNK,l.BARK2,l.BARKD,l.BARKL]);function Zi(n,e,t,i,r,a,{mat:s=l.LEAF,group:o=30,ragged:u=1}={}){const h=[];for(let m=0;m<9;m++){const v=m/9*Math.PI*2,E=1+(a()-.5)*.35*(r.clump+.3);h.push([e[0]+Math.cos(v)*t*E,e[1]+Math.sin(v)*i*E*(Math.sin(v)>0?.8:1)])}const f=Math.max(1,Math.round(Math.min(t,i)/3.5));n.shape(ss(h,0,9,f,Math.max(1.2,Math.min(t,i)*.14)*u,1),s,{group:o,line:!1,round:r.round}),n.mark([wt(e,[-t*1.1,i*.15]),wt(e,[t*1.1,i*.1]),wt(e,[t*1.1,i*1.2]),wt(e,[-t*1.1,i*1.2])],l.LEAF3,[s]),n.mark([wt(e,[-t*.75,-i*.55]),wt(e,[t*.25,-i*.95]),wt(e,[t*.55,-i*.35]),wt(e,[-t*.2,-i*.05])],l.LEAF2,[s]);const d=Math.floor(e[0]-t*1.2),p=Math.ceil(e[0]+t*1.2),_=Math.floor(e[1]-i*1.2),x=Math.ceil(e[1]+i*1.2),g=a()*1e4|0;for(let m=_;m<=x;m++)for(let v=d;v<=p;v++){const E=n.get(v,m);if(E!==s&&E!==l.LEAF2&&E!==l.LEAF3)continue;const b=dn(v,m,g),R=Ci(v/2,m/2,g)*.5+b*.5;R<.16*r.density?n.recolour(v,m,E===l.LEAF2?s:l.LEAF2):R>1-.16*r.density&&n.recolour(v,m,E===l.LEAF3?s:l.LEAF3)}}function Pi(n,e,t,i,r,a,s,o,{mat:u=l.TRUNK,bend:c=1,group:h=10,line:f=!1}={}){const d=[e],p=4;let _=t,x=e;for(let g=1;g<=p;g++)_+=(o()-.5)*.7*s.gnarl*c,x=wt(x,[Math.cos(_)*i/p,Math.sin(_)*i/p]),d.push(x);return n.limb(d.map((g,m)=>[...g,r+(a-r)*m/p]),u,{group:h,line:f,round:s.round,cap:.6,capEnd:1}),{end:x,ang:_,pts:d}}function ls(n,e,t,i,r,a,s){if(n.shape([[e-i*1.05,t],[e-i*.62,t-i*.5],[e-i*.45,t-i*1.4],[e+i*.45,t-i*1.4],[e+i*.62,t-i*.5],[e+i*1.05,t]],l.TRUNK,{group:10,round:r.round}),r.roots<=0)return;const o=Math.round(2+r.roots*4);for(let u=0;u<o;u++){const c=u%2?1:-1,h=(8+a()*16)*s*(.4+r.roots),f=(2+a()*3)*s,d=[e+c*i*.2,t-i*.5],p=[e+c*(i*.55+h*.4),t-f],_=[e+c*(i*.5+h),t-.5];n.limb([[...d,i*.55],[...p,i*.28],[..._,1.2]],l.TRUNK,{group:11,round:r.round,cap:.5,capEnd:.6})}}function cs(n,e,t=!0){if(!(e.bark<=0))for(let i=0;i<n.h;i++)for(let r=0;r<n.w;r++){const a=i*n.w+r;if(n.m[a]!==l.TRUNK)continue;const s=t?Ci(r/1.3,i/6,21):Ci(r/6,i/1.3,21);s>1-e.bark*.42||dn(r,i,4)<e.bark*.05?n.m[a]=l.BARKD:s>1-e.bark*.62&&n.n[a*3]<-.1&&(n.m[a]=l.BARKL)}}function Rr(n,e,t){let i=n.w,r=-1,a=n.h;for(let d=0;d<n.h;d++)for(let p=0;p<n.w;p++)n.m[d*n.w+p]&&(i=Math.min(i,p),r=Math.max(r,p),a=Math.min(a,d));if(r<0)return{sp:n,crownY:t};const s=Math.max(e-i,r-e)+2,o=Math.max(0,Math.floor(e-s)),u=Math.min(n.w-o,Math.ceil(s*2)+1),c=Math.max(0,a-1),h=n.h-c,f=new on(u,h);for(let d=0;d<h;d++)for(let p=0;p<u;p++){const _=(d+c)*n.w+p+o,x=d*u+p;f.m[x]=n.m[_],f.g[x]=n.g[_],f.n[x*3]=n.n[_*3],f.n[x*3+1]=n.n[_*3+1],f.n[x*3+2]=n.n[_*3+2]}return{sp:f,crownY:t-c}}const sa=n=>(n.crownWidth||3)/3;function eu(n,e,t){const i=sa(e),r=Math.round(220*t*i+60*t),a=Math.round(140*t),s=new on(r,a),o=r/2,u=a,c=e.treeTrunks||1,h=12*t*(e.treeThick||1)*(e.treeThin?.55:1)/Math.sqrt(c),f=(n()-.5)*.5*e.gnarl+(e.treeLean||0),d=[];let p=a;const _=(x,g,m,v,E)=>{const b=Pi(s,x,g,m,v,v*.65,e,n,{group:12});if(E===0){d.push(b.end);return}const R=n()<.35?3:2;for(let A=0;A<R;A++){const D=(A-(R-1)/2)*be(n,.5,.85)*(E===3?1.4:1);_(b.end,b.ang+D+(n()-.5)*.25,m*be(n,.6,.78),v*.62,E-1)}E<=2&&d.push(fi(x,b.end,.7))};for(let x=0;x<c;x++){const g=f+(c>1?(x/(c-1)-.5)*.8:0),m=[o+(x-(c-1)/2)*h*.6,u],v=Pi(s,m,-Math.PI/2+g,a*.36*(c>1?be(n,.75,1.15):1),h,h*.72,e,n,{bend:1.4});p=Math.min(p,v.end[1]);for(const E of[-1,1])_(v.end,-Math.PI/2+g*.5+E*be(n,.55,.95)*(.7+.3*i)*(c>1?.6:1),a*.22*(.75+.25*i)*(c>1?.7:1),h*.7,c>2?2:3);if(c===1&&n()<.7&&_(v.end,-Math.PI/2+(n()-.5)*.3,a*.18,h*.55,2),x===0&&e.treeHollow){const E=fi(m,v.end,.38);s.ellipse(E[0],E[1],h*.28,h*.5,l.NOSE,{round:.3})}}if(ls(s,o,u,h*Math.sqrt(c),e,n,t),cs(s,e),e.treeWebs)for(let x=0;x+1<d.length;x+=2){const g=d[x],m=d[x+1],v=Math.hypot(m[0]-g[0],m[1]-g[1]);if(v<40*t)for(let E=0;E<=v;E++){const b=fi(g,m,E/v);s.px(b[0],b[1]+Math.sin(E/v*Math.PI)*v*.15,l.WEB,0,0,1)}}if(e.treeBare)return Rr(s,o,p+4*t);d.sort((x,g)=>x[1]-g[1]);for(const x of d)Zi(s,wt(x,[0,-3*t]),be(n,14,21)*t,be(n,10,14)*t,e,n,{mat:n()<.35?l.LEAF3:l.LEAF});for(const x of d)n()<.75&&Zi(s,wt(x,[be(n,-9,9)*t,be(n,-12,-3)*t]),be(n,10,15)*t,be(n,7,10)*t,e,n);return Rr(s,o,p+4*t)}function nl(n,e,t){const i=.8+.2*sa(e),r=Math.round(90*t*i),a=Math.round(160*t),s=new on(r,a),o=r/2,u=a;s.limb([[o,u,6*t],[o,u-a*.5,4*t],[o,6*t,1.5]],l.TRUNK,{group:10,round:e.round}),ls(s,o,u,6*t,e,n,t*.6),cs(s,e);const c=Math.round(be(n,9,12));for(let h=c-1;h>=0;h--){const f=h/(c-1),d=6*t+f*a*.7,p=(5+f*36)*t*i*be(n,.9,1.1),_=(5+f*13)*t,x=[[o,d-4*t],[o+p*.5,d+_*.3],[o+p,d+_],[o+p*.7,d+_*1.15],[o,d+_*.7],[o-p*.7,d+_*1.15],[o-p,d+_],[o-p*.5,d+_*.3]];s.shape(ss(x,1,7,Math.max(2,Math.round(p/(3*t))),2*t,1),l.LEAF,{group:30+h,line:!1,round:e.round}),s.mark([[o-p,d+_*.55],[o+p,d+_*.55],[o+p,d+_*1.4],[o-p,d+_*1.4]],l.LEAF3,[l.LEAF]),s.mark([[o-p*.55,d-2*t],[o+p*.1,d-3*t],[o+p*.1,d+_*.45],[o-p*.7,d+_*.7]],l.LEAF2,[l.LEAF])}return Rr(s,o,a*.82)}function tu(n,e,t){const i=sa(e),r=Math.round(200*t*i+50*t),a=Math.round(130*t),s=new on(r,a),o=r/2,u=a,c=13*t,h=Pi(s,[o,u],-Math.PI/2+(n()-.5)*.3,a*.3,c,c*.8,e,n,{bend:1.6}),f=[];for(let _=0;_<5;_++){const x=_%2?1:-1,g=-Math.PI/2+x*be(n,.55,1.25)*(.7+.3*i),m=Pi(s,h.end,g,a*be(n,.3,.42)*(.8+.2*i),c*.55,c*.3,e,n,{group:12});f.push(m.end)}ls(s,o,u,c,e,n,t),cs(s,e);for(const _ of f)Zi(s,wt(_,[0,-2*t]),be(n,20,28)*t,be(n,9,12)*t,e,n);Zi(s,wt(h.end,[0,-8*t]),24*t,11*t,e,n);let d=r,p=0;for(const _ of f)d=Math.min(d,_[0]-22*t),p=Math.max(p,_[0]+22*t);for(let _=d;_<p;_+=be(n,1,1.7)){let x=a;for(let E=0;E<a;E++)if(s.get(_,E)===l.LEAF||s.get(_,E)===l.LEAF2||s.get(_,E)===l.LEAF3){x=E;break}if(x>=a)continue;const g=Math.abs(_-o)/(r/2),m=(u-x)*be(n,.5,.9)*(1-g*.3),v=dn(_|0,1,9)<.4?l.LEAF2:l.LEAF;for(let E=x+2;E<Math.min(u-2,x+m);E++){const b=Math.round(Math.sin(E*.12+_)*.7);dn(_|0,E,5)<.2+e.density*.8&&s.px(_+b,E,(E-x)/m>.8?l.LEAF3:v,b*.3,.2,.95)}}return Rr(s,o,h.end[1]+6*t)}function nu(n,e,t){const i=.7+.3*sa(e),r=Math.round(110*t*i),a=Math.round(155*t),s=new on(r,a),o=r/2,u=a,c=(n()-.5)*.25+(e.treeLean||0),h=Pi(s,[o,u],-Math.PI/2+c,a*.85,5*t,2*t,e,n,{mat:l.BARK2,bend:.4});for(let d=0;d<h.pts.length-1;d++)for(let p=0;p<1;p+=1/8){const _=fi(h.pts[d],h.pts[d+1],p+n()*.1);if(n()<.55)for(let x=-3;x<=3;x++)s.get(_[0]+x,_[1])===l.BARK2&&n()<.8&&s.recolour(_[0]+x,_[1],l.BARKD)}const f=[h.end];for(let d=0;d<7;d++){const p=be(n,.35,.9),_=fi(h.pts[0],h.end,p),x=d%2?1:-1,g=Pi(s,_,-Math.PI/2+x*be(n,.5,1),a*be(n,.12,.2)*i,2*t,1,e,n,{mat:l.BARKD,group:12});f.push(g.end)}for(const d of f)Zi(s,d,be(n,9,13)*t*i,be(n,7,10)*t,e,n,{mat:l.LEAF2,ragged:1.3});return Rr(s,o,a*.55)}function iu(n,e,t){const i=sa(e),r=Math.round(220*t*i+50*t),a=Math.round(120*t),s=new on(r,a),o=r/2,u=a,c=10*t,h=Pi(s,[o,u],-Math.PI/2+(n()-.5)*.4*(e.gnarl+.3),a*.4,c,c*.75,e,n,{bend:1.2}),f=[];for(const _ of[-1,1,-1,1]){const x=Pi(s,h.end,-Math.PI/2+_*be(n,.7,1.15)*(.7+.3*i),a*be(n,.3,.42)*(.7+.3*i),c*.55,c*.25,e,n,{group:12});f.push(x.end,fi(h.end,x.end,.55))}ls(s,o,u,c,e,n,t),cs(s,e);const d=Math.round(be(n,2,3)),p=Math.min(...f.map(_=>_[1]));for(let _=0;_<d;_++){const x=p-6*t+_*9*t,g=(95-_*12)*t*(.65+.35*i);for(let m=0;m<5;m++)Zi(s,[o+(m-2)*g*.36+be(n,-5,5)*t,x+be(n,-3,3)*t],g*be(n,.2,.26),7*t,e,n,{mat:_===d-1?l.LEAF:l.LEAF3})}return Rr(s,o,h.end[1]+4*t)}function il(n,e,t){const i=e.leafHue+(n()-.5)*e.leafVariety*.7+(t===nl?.06:0);return{[l.TRUNK]:Me(e.trunkHue,.45*e.sat,.34),[l.BARKD]:Me(e.trunkHue+.03,.5*e.sat,.17),[l.BARKL]:Me(e.trunkHue-.01,.38*e.sat,.5),[l.BARK2]:[222,220,212],[l.LEAF]:Me(i,.62*e.sat,.58),[l.LEAF2]:Me(i-.05,.55*e.sat,.8),[l.LEAF3]:Me(i+.03,.66*e.sat,.38),[l.WEB]:[225,225,232]}}function ld(n){const{sp:e,crownY:t}=n,i=new on(e.w,e.h),r=new on(e.w,e.h);for(let a=0;a<e.h;a++)for(let s=0;s<e.w;s++){const o=a*e.w+s,u=e.m[o];if(!u)continue;(od.has(u)&&a>=t?r:i).put(s,a,u,e.n[o*3],e.n[o*3+1],e.n[o*3+2])}return{top:i,bot:r}}function cd(n,e){const t=e.bushSize,i=Gc(n,["round","round","fern","grass","shrub"]),r=Math.round(40*t),a=Math.round(28*t),s=new on(r,a);if(i==="round"||i==="shrub"){const u=i==="shrub"?5:3;for(let c=0;c<u;c++)Zi(s,[r/2+be(n,-9,9)*t,a-8*t+be(n,-4,2)*t],be(n,7,10)*t,be(n,5,8)*t,e,n);if(i==="shrub"||n()<e.flowers)for(let c=0;c<18*e.flowers+3;c++){const h=r/2+be(n,-12,12)*t,f=a-be(n,5,17)*t;s.get(h,f)&&s.recolour(h,f,l.FLOWER)}}else if(i==="fern")for(let u=0;u<7;u++){const c=-Math.PI/2+(u/6-.5)*2.4;let h=r/2,f=a-1;for(let d=0;d<15*t;d++)h+=Math.cos(c)*.9,f+=Math.sin(c)*.9+d*.06,s.put(h,f,u%2?l.LEAF3:l.LEAF,Math.cos(c)*.4,-.2,.9),d%2&&(s.put(h,f-1,l.LEAF2,0,-.5,.85),s.put(h+Math.sign(Math.cos(c)),f+1,l.LEAF,0,.3,.9))}else for(let u=0;u<18*t;u++){const c=r/2+be(n,-13,13)*t,h=be(n,5,15)*t,f=be(n,-3,3);for(let d=0;d<h;d++)s.put(c+f*d/h*(d/h),a-1-d,d>h*.65?l.LEAF2:d<h*.3?l.LEAF3:l.LEAF,f*.1,-.3,.9)}const o=il(n,e,null);return o[l.FLOWER]=Me(n(),.55,.95),{sp:s,colours:o}}const st=(n,e={})=>["tree",{type:n,...e}],Oe=(n,e={})=>[n,e],oa=[{id:"moor",name:"Moor",creature:"badger",by:"Ed",leaf:.24,floor:["moss",.26,.45,.42],text:{floor:"moss",wall:"puddles, a lake",small:"long grass",big:"moss mounds"},wall:[Oe("water",{w:1.6})],small:[Oe("grass",{h:1.4})],big:[Oe("mound",{moss:!0})]},{id:"fern-forest",name:"Fern forest",creature:"boar",by:"Ed",leaf:.3,floor:["needles",.08,.45,.32],text:{floor:"pine needles",small:"ferns",big:"pine trees"},small:[Oe("fern")],big:[st("fir")]},{id:"muddy-forest",name:"Muddy forest",creature:"snail",by:"Ed",leaf:.22,floor:["mud",.07,.5,.28],text:{floor:"mud and leaves",small:"short trunks with broken branches",big:"trees with many trunks and branches"},small:[Oe("stump",{snag:!0})],big:[st("broad",{trunks:3,gnarl:.9})]},{id:"stone-shrine",name:"Stone shrine",creature:"fox",by:"Ed",leaf:.28,floor:["stony",.25,.3,.45],text:{floor:"grassy, stony",wall:"mossy henges",small:"little stones",big:"big stones",set:"a shrine"},wall:[Oe("henge")],small:[Oe("stones")],big:[Oe("boulder")],set:Oe("shrine")},{id:"tangly-forest",name:"Tangly forest",creature:"ram",by:"Ed",leaf:.27,floor:["nettles",.28,.5,.3],text:{floor:"nettles and earth",small:"tangled branches",big:"fairly short tangly trees"},small:[Oe("bramble",{bare:!0})],big:[st("broad",{scale:.7,gnarl:1})]},{id:"wispy-forest",name:"Wispy forest",creature:"woodlouse",by:"Ed",leaf:.2,floor:["leaves",.09,.55,.45],text:{floor:"dry leaves",small:"tall thin wispy trees",big:"thick trees with several trunks"},small:[st("birch",{scale:.75})],big:[st("broad",{trunks:3,thick:1.4})]},{id:"hazel-forest",name:"Hazel forest",creature:"hedgehog",by:"Ed",leaf:.26,floor:["grass",.24,.45,.45],text:{floor:"short grass",small:"brown lumps",big:"crooked trees with many branches"},small:[Oe("mound",{brown:!0})],big:[st("broad",{gnarl:1,scale:.85})]},{id:"garden",name:"Garden",creature:"squirrel",by:"Ed",leaf:.3,floor:["lawn",.27,.5,.5],text:{floor:"uniform grass",wall:"ornate stone wall",small:"manicured flower beds",big:"willows",set:"a stone pavilion"},wall:[Oe("wall")],small:[Oe("flowerbed")],big:[st("willow")],set:Oe("pavilion")},{id:"twiggy-forest",name:"Twiggy forest",creature:"wolf",by:"Ed",leaf:.29,floor:["plants",.3,.5,.38],text:{floor:"small leafy plants",small:"small trees with many thin trunks",big:"straight but slanted trees with many trunks"},small:[st("broad",{trunks:4,scale:.5,thin:!0})],big:[st("broad",{trunks:3,lean:.3,gnarl:.1})]},{id:"ancient",name:"Ancient",creature:"stag",by:"Ed",leaf:.31,floor:["roots",.1,.25,.35],text:{floor:"mossy roots over rocks",small:"sorrel",big:"giant gnarly slanted trees"},small:[Oe("flowers",{hue:.98,leafy:!0})],big:[st("broad",{scale:1.4,gnarl:1,lean:.35})]},{id:"norway",name:"Norway",creature:"stoat",by:"Ed",leaf:.36,floor:["slate",.6,.15,.35],text:{floor:"pine needles and slate",small:"rocks",big:"straight pines"},small:[Oe("stones",{big:!0})],big:[st("fir",{scale:1.2})]},{id:"alder-forest",name:"Alder forest",creature:"snake",by:"Ed",leaf:.23,floor:["tallgrass",.22,.45,.42],text:{floor:"tall and short grass",small:"tree stumps with tall grass around",big:"tall slanted trees with thin leaves at different heights"},small:[Oe("stump",{grass:!0})],big:[st("birch",{lean:.3,scale:1.2,dark:!0})]},{id:"meadow",name:"Meadow",creature:"hare",by:"draft",leaf:.25,floor:["flowers",.25,.5,.5],text:{floor:"grass and wildflowers",small:"scattered hawthorn",big:"lone oaks"},small:[Oe("shrub",{flower:[250,245,235]})],big:[st("broad",{scale:1.1})]},{id:"old-oaks",name:"Old oaks",creature:"owl",by:"draft",leaf:.22,floor:["leaves",.07,.5,.35],text:{floor:"leaf litter",small:"acorns, fallen branches",big:"ancient gnarled oaks with hollow trunks",set:"a great hollow oak"},small:[Oe("cones",{acorn:!0}),Oe("log",{branch:!0})],big:[st("broad",{gnarl:.9,hollow:!0})],set:st("broad",{scale:1.6,gnarl:1,hollow:!0})},{id:"berry-thicket",name:"Berry thicket",creature:"bear",by:"draft",leaf:.32,floor:["needles",.08,.45,.3],text:{floor:"pine needles",wall:"bramble thickets",small:"berry bushes",big:"tall pines"},wall:[Oe("bramble")],small:[Oe("shrub",{flower:[200,30,60]})],big:[st("fir",{scale:1.3})]},{id:"wetland",name:"Wetland",creature:"toad",by:"draft",leaf:.2,floor:["mud",.15,.45,.3],text:{floor:"wet mud",wall:"puddles, reeds",small:"reeds and rushes",big:"willows"},wall:[Oe("water"),Oe("reeds",{tall:!0})],small:[Oe("reeds")],big:[st("willow")]},{id:"stream",name:"Stream",creature:"otter",by:"draft",leaf:.27,floor:["pebbles",.25,.3,.45],text:{floor:"pebbles and grass",wall:"a stream or pond",small:"alder saplings",big:"alders",set:"a fallen-log bridge"},wall:[Oe("water",{w:2})],small:[st("broad",{scale:.45})],big:[st("broad",{scale:.95,gnarl:.3})],set:Oe("bridge")},{id:"rocky-slope",name:"Rocky slope",creature:"lynx",by:"draft",leaf:.34,floor:["scree",.2,.2,.42],text:{floor:"scree and moss",wall:"boulders",small:"rocks",big:"pines",set:"a rocky outcrop"},wall:[Oe("boulder",{big:!0})],small:[Oe("stones",{big:!0})],big:[st("fir")],set:Oe("outcrop")},{id:"bog",name:"Bog",creature:"elk",by:"draft",leaf:.38,floor:["moss",.18,.55,.4],text:{floor:"sphagnum moss",wall:"bog pools",small:"cotton grass",big:"spruce"},wall:[Oe("water",{bog:!0})],small:[Oe("reeds",{cotton:!0})],big:[st("fir",{dark:!0})]},{id:"deadwood",name:"Deadwood",creature:"raven",by:"draft",leaf:.15,floor:["earth",.07,.35,.3],text:{floor:"bare earth",small:"broken branches",big:"blasted dead trees"},small:[Oe("log",{branch:!0})],big:[st("broad",{bare:!0,gnarl:1})]},{id:"cave-mouth",name:"Cave mouth",creature:"bat",by:"draft",leaf:.2,floor:["stone",.08,.15,.35],text:{floor:"stone and roots",wall:"rock walls",small:"stalagmite stubs",big:"dead trees",set:"a cave mouth"},wall:[Oe("rockwall")],small:[Oe("stalagmite")],big:[st("broad",{bare:!0})],set:Oe("cave")},{id:"grassland",name:"Grassland",creature:"mole",by:"draft",leaf:.25,floor:["grass",.26,.5,.48],text:{floor:"short turf",small:"molehills",big:"lone birches"},small:[Oe("mound",{brown:!0,small:!0})],big:[st("birch")]},{id:"beaver-pond",name:"Beaver pond",creature:"beaver",by:"draft",leaf:.17,floor:["leaves",.13,.6,.5],text:{floor:"birch leaves",wall:"a pond",small:"stumps",big:"birch and aspen",set:"a beaver dam"},wall:[Oe("water",{w:2})],small:[Oe("stump",{gnawed:!0})],big:[st("birch")],set:Oe("dam")},{id:"log-pile",name:"Log pile",creature:"beetle",by:"draft",leaf:.22,floor:["leaves",.06,.5,.3],text:{floor:"rotting leaves",small:"fungi",big:"rotting logs",set:"a fallen giant"},small:[Oe("fungi")],big:[Oe("log",{rot:!0})],set:Oe("log",{rot:!0,giant:!0})},{id:"heath",name:"Heath",creature:"moth",by:"draft",leaf:.27,floor:["heather",.85,.35,.4],text:{floor:"heather",small:"gorse",big:"wind-bent birches"},small:[Oe("shrub",{flower:[250,205,40],spiky:!0})],big:[st("birch",{lean:.45,scale:.75})]},{id:"old-pinewood",name:"Old pinewood",creature:"marten",by:"draft",leaf:.35,floor:["needles",.07,.4,.3],text:{floor:"pine needles",small:"pine cones",big:"tall old pines with knotholes"},small:[Oe("cones")],big:[st("fir",{scale:1.35})]},{id:"ravine",name:"Ravine",creature:"salamander",by:"draft",leaf:.3,floor:["stone",.3,.3,.32],text:{floor:"wet moss and rock",wall:"rock walls",small:"ferns",big:"mossy boulders",set:"a waterfall"},wall:[Oe("rockwall",{moss:!0})],small:[Oe("fern")],big:[Oe("boulder",{moss:!0,big:!0})],set:Oe("waterfall")},{id:"bluebell-glade",name:"Bluebell glade",creature:"glowworm",by:"draft",leaf:.26,floor:["bluebells",.27,.45,.4],text:{floor:"bluebells",small:"ferns",big:"beeches"},small:[Oe("fern")],big:[st("broad",{gnarl:.2,scale:1.1})]},{id:"holly-thicket",name:"Holly thicket",creature:"spider",by:"draft",leaf:.36,floor:["leaves",.08,.35,.28],text:{floor:"dead leaves",wall:"holly hedges",small:"cobwebs",big:"hollies",set:"a web-hung dead tree"},wall:[Oe("hedge",{berries:!0})],small:[Oe("web")],big:[st("broad",{scale:.7,dark:!0})],set:st("broad",{bare:!0,webs:!0})},{id:"honeysuckle-tangle",name:"Honeysuckle tangle",creature:"dormouse",by:"draft",leaf:.25,floor:["clover",.27,.45,.45],text:{floor:"grass and clover",wall:"bramble",small:"honeysuckle",big:"hazel coppice"},wall:[Oe("bramble")],small:[Oe("shrub",{flower:[250,230,170]})],big:[st("broad",{trunks:5,scale:.7,thin:!0})]}];for(const[n,[e,t]]of Object.entries($c)){const i=oa.find(r=>r.id===n);i&&!i.set&&(i.set=Oe(e,{three:!0}),i.text={...i.text,set:t})}const ud=Object.fromEntries(oa.map(n=>[n.id,n])),hd=["ruins","rocks","freak","lake","modern"],pt=(n,e,t,i,r,a,s,o,u,c,h={})=>({pattern:n,...h,density:e,clump:t,glades:{count:i[0],size:i[1]||[0,0]},heightMix:r&&{sapling:r[0],mature:r[1],tall:r[2],giant:r[3]},undergrowth:a,lean:{dir:s[0],amount:s[1]},terrain:o,decor:{rate:u[0],...Object.fromEntries(hd.map((f,d)=>[f,u[1][d]]))},feel:c}),Rt=[0,0],dd={moor:pt("scatter",.2,.6,[2,[14,24]],null,.7,[30,.2],["pools","mounds","hollows"],[.5,[.3,.4,0,.3,0]],"Open rolling moss, low mounds and dark pools, long grass combed one way by the wind; you can see a long way."),"fern-forest":pt("groves",.65,.6,[2,[8,12]],[.2,.5,.25,.05],.9,Rt,["hollows","paths"],[.25,[.4,.3,.3,0,0]],"Pine groves standing waist-deep in ferns, with green sunken hollows between them."),"muddy-forest":pt("scatter",.7,.3,[1,[6,9]],[.25,.55,.17,.03],.4,Rt,["pools","paths"],[.3,[.3,.1,.2,.1,.3]],"Squelching mud between many-trunked trees, puddled ruts winding through, broken stumps everywhere."),"stone-shrine":pt("rings",.35,.8,[1,[10,14]],null,.3,Rt,["rocky","mounds"],[.5,[.6,.4,0,0,0]],"Big stones stand in rings round the shrine on stony grass; it feels deliberate and old."),"tangly-forest":pt("thicket",.9,.2,[1,[5,8]],[.35,.55,.1,0],.9,Rt,["hollows"],[.2,[.2,0,.6,0,.2]],"Short tangled trees packed close over nettles, low and claustrophobic, with one small clearing."),"wispy-forest":pt("stands",.55,.7,[2,[6,10]],[.15,.45,.3,.1],.5,Rt,["ridges"],[.3,[.4,.2,.3,0,.1]],"Stands of thick many-trunked trees, thin wispy saplings drifting between them over dry leaves."),"hazel-forest":pt("rings",.6,.6,[2,[6,9]],[.3,.55,.12,.03],.5,Rt,["mounds","paths"],[.3,[.4,.3,.3,0,0]],"Crooked hazels grown in loose fairy rings on short grass, lumpy little mounds in the middle of each."),garden:pt("rows",.45,0,[3,[6,10]],[.1,.7,.2,0],.6,Rt,["paths","pools"],[.4,[.7,0,0,.2,.1]],"A lost formal garden: willows in avenues along straight paths, lawns and flower beds, a pavilion at the heart.",{along:"paths"}),"twiggy-forest":pt("scatter",.75,.3,[1,[6,10]],[.25,.5,.2,.05],.6,[60,.5],["paths"],[.25,[.3,.2,.3,0,.2]],"Straight many-trunked trees all slanting the same way, like a wood frozen in a gale."),ancient:pt("lone",.4,.2,[1,[12,18]],[.05,.35,.4,.2],.4,[150,.25],["rocky","mounds","hollows"],[.45,[.5,.2,.3,0,0]],"Giant gnarled trees far apart, roots heaving over mossy rocks; every tree is a landmark."),norway:pt("stands",.8,.5,[1,[8,12]],[.15,.45,.35,.05],.2,Rt,["rocky","ridges"],[.3,[.2,.6,0,.2,0]],"Dense stands of straight pines on slate ridges, bare rock between; dark, vertical and cold."),"alder-forest":pt("scatter",.55,.4,[2,[6,10]],[.2,.4,.35,.05],.6,[120,.35],["stream","hollows"],[.3,[.3,.1,.2,.3,.1]],"Tall slanted alders at every height over long grass and stumps, a little stream wandering through."),meadow:pt("lone",.12,.1,[0],[.2,.5,.25,.05],.3,Rt,["mounds","paths"],[.35,[.3,.3,0,.2,.2]],"Wide-open wildflower grass with a lone oak here and there and scattered hawthorn; the sky does the work."),"old-oaks":pt("groves",.5,.5,[2,[10,16]],[.1,.35,.4,.15],.5,Rt,["mounds","hollows"],[.4,[.5,.1,.4,0,0]],"Groves of huge hollow oaks with broad clearings of leaf litter between; slow and grand."),"berry-thicket":pt("thicket",.85,.5,[2,[4,7]],[.2,.4,.35,.05],1,Rt,["paths"],[.15,[.3,0,.4,0,.3]],"Tall pines over solid berry bushes and brambles, only narrow animal paths and a couple of pockets of space."),wetland:pt("edgeOnly",.5,.5,[1,[16,24]],[.25,.55,.15,.05],.8,Rt,["pools","stream"],[.35,[.2,0,0,.6,.2]],"Open reedy water and mud in the middle, willows crowding the rim; wet and echoing."),stream:pt("rows",.5,.2,[1,[6,10]],[.3,.45,.2,.05],.5,Rt,["stream","pools"],[.3,[.3,.3,0,.3,.1]],"Alders lining both banks of a pebbly stream, saplings at the water's edge, open grass away from it.",{along:"stream"}),"rocky-slope":pt("scatter",.35,.6,[1,[8,12]],[.3,.5,.18,.02],.2,[90,.15],["rocky","ridges"],[.5,[.3,.7,0,0,0]],"Scree and boulders with pines clinging in clumps, everything leaning slightly uphill."),bog:pt("stands",.25,.85,[3,[10,20]],[.4,.5,.1,0],.6,Rt,["pools","mounds"],[.35,[.2,0,0,.5,.3]],"Sphagnum and bog pools, stunted spruce in tight dark stands, cotton grass pale between them."),deadwood:pt("scatter",.25,.2,[2,[8,14]],[.05,.3,.45,.2],.15,Rt,["ridges","hollows"],[.45,[.3,.1,.3,0,.3]],"Sparse tall blasted snags on bare ridges; bleak, quiet, with long sightlines."),"cave-mouth":pt("edgeOnly",.4,.5,[1,[10,14]],[.2,.5,.3,0],.2,Rt,["rocky","ridges"],[.4,[.3,.6,0,0,.1]],"Rock walls and dead trees ring an open stone floor that leads to the cave's dark mouth."),grassland:pt("lone",.1,.5,[0],[.3,.5,.2,0],.2,Rt,["mounds"],[.35,[.3,.2,0,.1,.4]],"Short turf to the horizon, molehills, birches alone or in twos and threes."),"beaver-pond":pt("edgeOnly",.55,.4,[1,[14,20]],[.4,.45,.15,0],.4,Rt,["pools","stream"],[.4,[.1,0,0,.7,.2]],"A pond in the middle, young birch and aspen round it, gnawed stumps where the big ones were felled."),"log-pile":pt("groves",.5,.7,[2,[6,10]],null,.7,Rt,["hollows","mounds"],[.3,[.3,0,.4,0,.3]],"Rotting logs heaped in piles, fungi everywhere, damp hollows between the heaps."),heath:pt("scatter",.2,.3,[1,[12,18]],[.5,.45,.05,0],.8,[30,.6],["ridges","paths"],[.4,[.4,.4,0,0,.2]],"Purple heather and gorse, small birches bent hard by the wind, all the same way."),"old-pinewood":pt("scatter",.5,.3,[2,[8,14]],[.1,.35,.4,.15],.15,Rt,["mounds","paths"],[.35,[.4,.3,.3,0,0]],"Cathedral-tall old pines on a clear floor of needles; you can see between the trunks a long way."),ravine:pt("edgeOnly",.55,.6,[1,[6,9]],null,.8,Rt,["stream","ridges","rocky"],[.4,[.3,.5,0,.2,0]],"A deep wet cleft: rock walls and mossy boulders either side, ferns, a stream down the middle."),"bluebell-glade":pt("groves",.45,.5,[3,[8,14]],[.1,.5,.35,.05],.3,Rt,["hollows"],[.35,[.4,0,.3,.3,0]],"Beech groves round open glades carpeted in bluebells; soft, bright and airy."),"holly-thicket":pt("thicket",.9,.3,[1,[6,9]],[.3,.6,.1,0],.7,Rt,["hollows"],[.25,[.3,0,.5,0,.2]],"Dark hollies packed close, cobwebs strung between, one clearing round the web-hung tree."),"honeysuckle-tangle":pt("stands",.6,.7,[2,[5,8]],[.45,.5,.05,0],.8,Rt,["paths","mounds"],[.3,[.3,0,.3,0,.4]],"Hazel coppice stools in clumps, honeysuckle and bramble between, clover paths winding through.")};for(const n of oa)n.layout=dd[n.id];function fd(n,e,t=64,i=48){const[r,a,s,o]=n.floor,u=new on(t,i),c=n.id.length*131;for(let x=0;x<i;x++)for(let g=0;g<t;g++){const m=(Ci(g/7,x/5,c)*(t-g)*(i-x)+Ci((g-t)/7,x/5,c)*g*(i-x)+Ci(g/7,(x-i)/5,c)*(t-g)*x+Ci((g-t)/7,(x-i)/5,c)*g*x)/(t*i),v=m<.38?l.BODY2:m>.64?l.BELLY:l.BODY;u.px(g,x,v,0,-.42,.91)}const h=$o(c),f=(x,g,m)=>u.px((x%t+t)%t,(g%i+i)%i,m,0,-.42,.91),d={moss:0,needles:70,mud:25,stony:30,nettles:60,leaves:80,grass:70,lawn:30,plants:60,roots:30,slate:40,tallgrass:90,flowers:70,pebbles:60,scree:70,earth:15,stone:40,heather:90,bluebells:90,clover:60}[r]??40;for(let x=0;x<d;x++){const g=Math.floor(h()*t),m=Math.floor(h()*i);if(r==="needles"){const v=h()<.5?1:-1;for(let E=0;E<3;E++)f(g+E*v,m+(E>>1),h()<.5?l.BODY2:l.ACCENT)}else if(["grass","lawn","tallgrass","plants","nettles","clover","flowers","bluebells","heather"].includes(r)){const v=r==="tallgrass"?4:r==="lawn"?1:2;for(let E=0;E<v;E++)f(g,m-E,E===v-1?l.LEAF2:l.LEAF);(r==="flowers"||r==="bluebells"||r==="heather"||r==="clover")&&h()<.5&&f(g+1,m-v,l.FLOWER)}else if(["stony","pebbles","scree","slate","stone","roots"].includes(r)){if(f(g,m,l.ACCENT),h()<.6&&f(g+1,m,l.ACCENT),h()<.4&&f(g,m+1,l.BODY2),r==="roots"&&h()<.5)for(let v=0;v<5;v++)f(g+v,m+(v>2?1:0),l.TRUNK)}else if(r==="leaves")f(g,m,l.FLOWER),f(g+1,m,l.FLOWER),h()<.5&&f(g,m+1,l.ACCENT);else if(r==="mud"||r==="earth")for(let v=0;v<3;v++)f(g+v,m,l.BODY2)}const p={flowers:Me(.13,.6,.95),bluebells:[90,110,230],heather:[180,90,170],clover:[240,235,240],leaves:Me(a+.02,.65,.6)}[r]||Me(a,.3,.6),_={[l.BODY]:Me(a,s*e.sat,o),[l.BODY2]:Me(a+.02,s*e.sat*1.1,o*.78),[l.BELLY]:Me(a-.02,s*e.sat*.9,Math.min(1,o*1.15)),[l.ACCENT]:r==="needles"?Me(.07,.5,.5):Me(.1,.08,.62),[l.FLOWER]:p,[l.LEAF]:Me(n.leaf,.55*e.sat,.45),[l.LEAF2]:Me(n.leaf-.03,.5*e.sat,.62),[l.TRUNK]:Me(e.trunkHue,.4,.3)};return{sp:u,colours:_}}const Gi=n=>({[l.ACCENT]:Me(.1,.06,.6),[l.BODY2]:Me(.62,.08,.4),[l.BELLY]:Me(.1,.05,.78),[l.LEAF]:Me(.27,.5,.45),[l.LEAF2]:Me(.25,.45,.62),[l.NOSE]:[20,16,24]});function Er(n,e,t,i,r,a,s){const o=[];for(let u=0;u<8;u++){const c=u/8*Math.PI*2,h=1+(a()-.5)*.3;o.push([e[0]+Math.cos(c)*t*h,e[1]+Math.sin(c)*i*h*(Math.sin(c)>0?.5:1)])}n.shape(o,l.ACCENT,{group:5,line:!0,round:r.round}),n.mark([wt(e,[-t,i*.1]),wt(e,[t,i*.1]),wt(e,[t,i]),wt(e,[-t,i])],l.BODY2,[l.ACCENT]),n.mark([wt(e,[-t*.6,-i*.8]),wt(e,[t*.1,-i*1.1]),wt(e,[t*.3,-i*.5]),wt(e,[-t*.3,-i*.3])],l.BELLY,[l.ACCENT]),s&&n.mark(ss([wt(e,[-t*1.1,-i*.55]),wt(e,[0,-i*1.3]),wt(e,[t*1.1,-i*.5]),wt(e,[t*.6,-i*.2]),wt(e,[-t*.6,-i*.2])],0,3,3,i*.15,1),l.LEAF,[l.ACCENT,l.BELLY,l.BODY2])}function Ya(n,e,t,i,r,a){const s={[l.LEAF]:Me(t.leaf,.6*i.sat,.55),[l.LEAF2]:Me(t.leaf-.05,.55*i.sat,.78),[l.LEAF3]:Me(t.leaf+.03,.66*i.sat,.36)},o={[l.TRUNK]:Me(i.trunkHue,.45*i.sat,.34),[l.BARKD]:Me(i.trunkHue+.03,.5*i.sat,.17),[l.BARKL]:Me(i.trunkHue-.01,.38*i.sat,.5),[l.BELLY]:Me(i.trunkHue+.02,.3,.7)},u={[l.MAGIC]:[60,110,150],[l.MAGIC2]:[150,200,220],[l.BODY2]:[35,70,100]};if(n==="tree"){const x={broad:eu,fir:nl,willow:tu,birch:nu,flat:iu}[e.type],g={...i,leafHue:t.leaf+(e.dark?.05:0),gnarl:e.gnarl??i.gnarl,treeBare:e.bare,treeTrunks:e.trunks,treeLean:e.lean,treeThick:e.thick,treeThin:e.thin,treeHollow:e.hollow,treeWebs:e.webs},m=x(r,g,i.treeSize*a*(e.scale||1)*be(r,.9,1.1)),v=il(r,g,x);return e.dark&&(v[l.LEAF]=v[l.LEAF3],v[l.LEAF3]=Me(t.leaf+.05,.7,.22)),v[l.NOSE]=[20,16,24],v[l.WEB]=[225,225,232],{sp:m.sp,colours:v}}if(n==="shrub"){const x=cd(r,{...i,leafHue:t.leaf,bushSize:i.bushSize*a,flowers:1});for(let g=0;g<x.sp.m.length;g++)x.sp.m[g]&&dn(g,1,3)<(e.spiky?.18:.1)&&x.sp.m[g]!==l.TRUNK&&(x.sp.m[g]=l.FLOWER);return x.colours[l.FLOWER]=e.flower,x}const c=Math.round(48*a*(e.w||1)),h=Math.round(32*a),f=new on(c,h),d=c/2,p=h;let _={};if(n==="grass"||n==="reeds"||n==="fern"||n==="flowers"||n==="flowerbed"){const x=n==="flowerbed"?40:24,g=(n==="reeds"?e.tall?26:20:n==="fern"?14:10*(e.h||1))*a;n==="flowerbed"&&f.shape([[d-20*a,p-2],[d-18*a,p-6*a],[d+18*a,p-6*a],[d+20*a,p-2],[d+20*a,p],[d-20*a,p]],l.ACCENT,{group:2,line:!0});for(let m=0;m<x;m++){const v=d+be(r,-16,16)*a,E=g*be(r,.5,1),b=n==="fern"?be(r,-6,6)*a:be(r,-2,2)*a,R=p-1-(n==="flowerbed"?5*a:0);for(let A=0;A<E;A++){const D=A/E;f.px(v+b*D*D,R-A,D>.7?l.LEAF2:D<.3?l.LEAF3:l.LEAF,b*.05,-.3,.9),n==="fern"&&A%2&&f.px(v+b*D*D+(b>0?1:-1),R-A+1,l.LEAF2,0,-.3,.9)}if(n==="reeds"&&(e.cotton||r()<.5))for(let A=0;A<(e.cotton?2:3);A++)f.px(v+b,R-E-A,e.cotton?l.WEB:l.TRUNK,0,-.5,.85);(n==="flowers"||n==="flowerbed")&&r()<.7&&(f.px(v+b,R-E,l.FLOWER,0,-.5,.85),f.px(v+b+1,R-E,l.FLOWER,0,-.5,.85))}if(_={...s,[l.FLOWER]:n==="flowerbed"?Gc(r,[[230,80,120],[250,210,60],[150,110,230]]):Me(e.hue??.95,.6,.85),[l.TRUNK]:Me(.07,.5,.35),[l.WEB]:[240,240,235],[l.ACCENT]:Me(.08,.1,.55)},n==="flowerbed"){for(let m=0;m<f.m.length;m++)f.m[m]===l.FLOWER&&dn(m,2,7)<.5&&(f.m[m]=l.BELLY);_[l.BELLY]=[250,245,240]}}else if(n==="stones"){for(let x=0;x<(e.big?3:6);x++)Er(f,[d+be(r,-14,14)*a,p-(e.big?5:2.5)*a],(e.big?6:3)*a*be(r,.7,1.2),(e.big?5:2.5)*a,i,r);_=Gi()}else if(n==="boulder")Er(f,[d,p-(e.big?11:8)*a],(e.big?18:13)*a,(e.big?12:9)*a,i,r,e.moss),_={...Gi(),...s,[l.ACCENT]:Me(.1,.06,.6)};else if(n==="henge")f.shape([[d-7*a,p],[d-8*a,p-18*a],[d-4*a,p-28*a],[d+5*a,p-27*a],[d+8*a,p-14*a],[d+7*a,p]],l.ACCENT,{group:5,line:!0,round:i.round}),f.mark([[d-9*a,p-30*a],[d+9*a,p-30*a],[d+9*a,p-22*a],[d-9*a,p-18*a]],l.LEAF,[l.ACCENT]),_={...Gi(),...s};else if(n==="mound"){const x=(e.small?8:14)*a,g=(e.small?5:8)*a;f.shape(ss([[d-x,p],[d-x*.6,p-g*.8],[d,p-g],[d+x*.6,p-g*.8],[d+x,p]],0,4,e.moss?3:1,(e.moss?1.5:.8)*a,1),e.moss?l.LEAF:l.TRUNK,{group:5,round:i.round}),f.mark([[d-x,p-g*.45],[d+x,p-g*.45],[d+x,p],[d-x,p]],e.moss?l.LEAF3:l.BARKD,[e.moss?l.LEAF:l.TRUNK]),_={...s,...o,[l.TRUNK]:Me(.07,.45,e.brown?.35:.3)}}else if(n==="stump"){const x=6*a;if(f.limb([[d,p,x*2.2],[d,p-8*a,x*1.6]],l.TRUNK,{group:5,round:i.round,cap:0,capEnd:0}),f.shape([[d-x*.8,p-8*a],[d,p-10*a-(e.gnawed?4*a:0)],[d+x*.8,p-8*a],[d,p-7*a]],l.BELLY,{group:6,round:i.round}),e.snag&&f.limb([[d+x*.4,p-8*a,2.5*a],[d+x*1.6,p-15*a,1.5*a]],l.TRUNK,{group:7,round:i.round}),e.grass)for(let g=0;g<20;g++){const m=d+be(r,-14,14)*a,v=be(r,6,13)*a;for(let E=0;E<v;E++)f.px(m,p-1-E,E>v*.6?l.LEAF2:l.LEAF,0,-.3,.9)}_={...s,...o}}else if(n==="log"){const x=(e.giant?46:e.branch?18:30)*a,g=(e.giant?14:e.branch?3:8)*a;if(f.limb([[d-x/2,p-g/2,g],[d+x/2,p-g/2-(e.branch?2*a:0),g*.9]],l.TRUNK,{group:5,round:i.round,cap:.3,capEnd:.3}),e.branch||f.shape([[d+x/2-g*.1,p-g],[d+x/2+g*.2,p-g/2],[d+x/2-g*.1,p],[d+x/2-g*.3,p-g/2]],l.BELLY,{group:6,round:i.round}),e.rot)for(let m=0;m<(e.giant?6:3);m++){const v=d+be(r,-x/2,x/3);f.shape([[v-3*a,p-g*.9],[v,p-g-3*a],[v+3*a,p-g*.9]],l.FLOWER,{group:7,line:!0,round:i.round})}e.branch&&f.limb([[d,p-g,g*.7],[d+5*a,p-g-6*a,g*.4]],l.TRUNK,{group:6,round:i.round}),_={...o,[l.FLOWER]:[230,190,120]}}else if(n==="fungi"){for(let x=0;x<5;x++){const g=d+be(r,-12,12)*a,m=be(r,3,7)*a,v=be(r,3,5)*a;f.limb([[g,p,1.6*a],[g,p-m,1.4*a]],l.BELLY,{group:5}),f.shape([[g-v,p-m],[g,p-m-v*.8],[g+v,p-m]],x%2?l.FLOWER:l.MAGIC,{group:6+x%2,line:!0,round:i.round})}_={[l.BELLY]:[225,215,195],[l.FLOWER]:[190,80,50],[l.MAGIC]:[120,230,200]}}else if(n==="cones"){for(let x=0;x<6;x++){const g=d+be(r,-14,14)*a,m=p-2*a;f.ellipse(g,m,(e.acorn?1.6:2)*a,(e.acorn?2:2.8)*a,l.TRUNK,{round:i.round}),e.acorn?f.ellipse(g,m-1.6*a,1.8*a,1*a,l.BARKD,{round:i.round}):f.px(g,m-1,l.BARKL)}_=o}else if(n==="water"){const x=22*a*(e.w||1),g=6*a;f.shape([[d-x,p-g],[d-x*.3,p-g*1.5],[d+x*.6,p-g*1.2],[d+x,p-g*.5],[d+x*.4,p],[d-x*.7,p-g*.2]],l.MAGIC,{group:5,round:.2});for(let m=0;m<6;m++){const v=d+be(r,-x*.6,x*.6),E=p-g*be(r,.4,1.1);for(let b=0;b<3*a;b++)f.recolour(v+b,E,l.MAGIC2)}_=e.bog?{[l.MAGIC]:[60,70,50],[l.MAGIC2]:[120,130,90]}:u;for(let m=0;m<f.m.length;m++)f.m[m]===l.MAGIC?f.m[m]=l.BODY:f.m[m]===l.MAGIC2&&(f.m[m]=l.BELLY);_={[l.BODY]:_[l.MAGIC],[l.BELLY]:_[l.MAGIC2]}}else if(n==="bramble"||n==="hedge"){const x=22*a,g=(n==="hedge"?18:12)*a;for(let m=0;m<(n==="hedge"?6:4);m++){const v=d+be(r,-x*.8,x*.8),E=p-g*be(r,.4,.7);f.ellipse(v,E,be(r,6,9)*a,g*.45,n==="hedge"?l.LEAF3:l.LEAF,{round:i.round,density:e.bare?.5:.95,noise:.5,seed:m})}for(let m=0;m<8;m++){let E=d+be(r,-x,x),b=p;for(let R=0;R<g*1.2;R++)E+=Math.sin(R*.3+m)*.8,b-=.8,f.px(E,b,l.TRUNK,0,-.3,.9)}if(n==="hedge"||e.berries||n==="bramble")for(let m=0;m<f.m.length;m++)f.m[m]&&f.m[m]!==l.TRUNK&&dn(m,5,9)<.05&&(f.m[m]=l.FLOWER);_={...s,...o,[l.FLOWER]:n==="hedge"?[210,30,40]:[70,30,70]}}else if(n==="wall"){const x=22*a,g=12*a;f.shape([[d-x,p],[d-x,p-g],[d+x,p-g],[d+x,p]],l.ACCENT,{group:5,line:!0,depth:2}),f.shape([[d-x-1,p-g],[d-x-1,p-g-2*a],[d+x+1,p-g-2*a],[d+x+1,p-g]],l.BELLY,{group:6,line:!0,depth:2}),f.shape([[d+x-6*a,p-g-2*a],[d+x-6*a,p-g-7*a],[d+x,p-g-7*a],[d+x,p-g-2*a]],l.ACCENT,{group:7,line:!0,depth:2}),f.ellipse(d+x-3*a,p-g-9*a,3*a,2.5*a,l.BELLY,{round:i.round});for(let m=p-g+3*a;m<p;m+=4*a)for(let v=d-x;v<d+x;v++)f.recolour(v,m,l.BODY2);_=Gi()}else if(n==="rockwall"){for(let x=0;x<5;x++)Er(f,[d+(x-2)*9*a,p-be(r,8,14)*a],8*a,10*a,i,r,e.moss);_={...Gi(),...s}}else if(n==="stalagmite"){for(let x=0;x<4;x++){const g=d+be(r,-14,14)*a,m=be(r,5,11)*a;f.shape([[g-3*a,p],[g-1*a,p-m],[g+1*a,p-m],[g+3*a,p]],l.ACCENT,{group:5,line:!0,round:i.round})}_=Gi()}else if(n==="web"){const x=[d,p-14*a],g=11*a;for(let m=0;m<8;m++){const v=m/8*Math.PI*2;for(let E=0;E<g;E++)f.px(x[0]+Math.cos(v)*E,x[1]+Math.sin(v)*E,l.WEB,0,0,1)}for(let m=3*a;m<g;m+=3*a)for(let v=0;v<Math.PI*2;v+=.05)f.px(x[0]+Math.cos(v)*m,x[1]+Math.sin(v)*m,l.WEB,0,0,1);_={[l.WEB]:[225,230,240]}}return{sp:f,colours:_}}function pd(n,e,t,i,r,a){if(e.three)return Dh(n,t,i);if(n==="tree"||n==="log")return Ya(n,e,t,i,r,a);const s=Math.round(90*a),o=Math.round(70*a),u=new on(s,o),c=s/2,h=o;let f={...Gi(),[l.LEAF]:Me(t.leaf,.55,.5),[l.LEAF2]:Me(t.leaf-.04,.5,.7),[l.TRUNK]:Me(i.trunkHue,.45,.34),[l.BARKD]:Me(i.trunkHue+.03,.5,.17),[l.MAGIC]:Me(i.magicHue,.6,1),[l.MAGIC2]:Me(i.magicHue,.2,1)};if(n==="shrine")u.shape([[c-16*a,h],[c-14*a,h-6*a],[c+14*a,h-6*a],[c+16*a,h]],l.ACCENT,{group:5,line:!0,depth:2}),u.shape([[c-9*a,h-6*a],[c-9*a,h-26*a],[c+9*a,h-26*a],[c+9*a,h-6*a]],l.ACCENT,{group:6,line:!0,depth:2}),u.shape([[c-5*a,h-10*a],[c-5*a,h-20*a],[c,h-23*a],[c+5*a,h-20*a],[c+5*a,h-10*a]],l.NOSE,{group:7}),u.shape([[c-13*a,h-26*a],[c,h-34*a],[c+13*a,h-26*a]],l.BODY2,{group:8,line:!0,depth:2}),u.ellipse(c,h-13*a,2.5*a,2.5*a,l.MAGIC2,{round:.5}),u.mark([[c-14*a,h-36*a],[c+2*a,h-36*a],[c-4*a,h-24*a],[c-14*a,h-24*a]],l.LEAF,[l.BODY2,l.ACCENT]);else if(n==="pavilion"){u.shape([[c-26*a,h],[c-26*a,h-4*a],[c+26*a,h-4*a],[c+26*a,h]],l.ACCENT,{group:5,line:!0,depth:2});for(const d of[-20,-7,7,20])u.limb([[c+d*a,h-4*a,4*a],[c+d*a,h-34*a,4*a]],d===-7||d===7?l.BODY2:l.BELLY,{group:6+(d>0?1:0),line:!0,cap:0,capEnd:0});u.shape([[c-28*a,h-34*a],[c-28*a,h-38*a],[c+28*a,h-38*a],[c+28*a,h-34*a]],l.ACCENT,{group:8,line:!0,depth:2}),u.shape([[c-24*a,h-38*a],[c-16*a,h-54*a],[c,h-60*a],[c+16*a,h-54*a],[c+24*a,h-38*a]],l.BELLY,{group:9,line:!0})}else if(n==="bridge"){const d=Ya("water",{w:1.8},t,i,r,a);for(let p=0;p<d.sp.m.length;p++){const _=p%d.sp.w,x=p/d.sp.w|0,g=Math.round(c-d.sp.w/2+_),m=h-d.sp.h+x;d.sp.m[p]&&u.inb(g,m)&&u.px(g,m,d.sp.m[p]===l.BODY?l.IRIS:l.PUPIL,0,-.42,.91)}u.limb([[c-34*a,h-6*a,9*a],[c+34*a,h-10*a,8*a]],l.TRUNK,{group:6,line:!0,cap:.3,capEnd:.3}),f[l.IRIS]=[60,110,150],f[l.PUPIL]=[150,200,220]}else if(n==="outcrop")for(const[d,p,_,x]of[[-18,14,16,13],[12,12,18,12],[-2,28,15,13],[16,34,9,9]])Er(u,[c+d*a,h-p*a],_*a,x*a,i,r,!0);else if(n==="cave"){for(const[d,p,_,x]of[[-26,16,16,15],[26,16,16,15],[0,40,30,18],[-12,30,14,12],[12,30,14,12]])Er(u,[c+d*a,h-p*a],_*a,x*a,i,r,p>30);u.shape([[c-15*a,h],[c-14*a,h-18*a],[c-4*a,h-28*a],[c+6*a,h-27*a],[c+14*a,h-16*a],[c+15*a,h]],l.NOSE,{group:9,line:!0})}else if(n==="dam"){const d=Ya("water",{w:1.9},t,i,r,a);for(let p=0;p<d.sp.m.length;p++){const _=p%d.sp.w,x=p/d.sp.w|0,g=Math.round(c-d.sp.w/2+_),m=h-d.sp.h+x-10*a;d.sp.m[p]&&u.inb(g,m)&&u.px(g,m,d.sp.m[p]===l.BODY?l.IRIS:l.PUPIL,0,-.42,.91)}for(let p=0;p<26;p++){const _=c+be(r,-32,32)*a,x=h-be(r,2,14)*a,g=be(r,-.5,.5),m=be(r,8,16)*a;u.limb([[_-Math.cos(g)*m/2,x-Math.sin(g)*m/2,2.6*a],[_+Math.cos(g)*m/2,x+Math.sin(g)*m/2,2*a]],p%3?l.TRUNK:l.BARKD,{group:6+p%2,line:!0})}f[l.IRIS]=[60,110,150],f[l.PUPIL]=[150,200,220]}else if(n==="waterfall"){for(const[d,p,_,x]of[[-22,30,18,30],[22,30,18,30],[0,56,20,12]])Er(u,[c+d*a,h-p*a],_*a,x*a,i,r,!0);for(let d=c-6*a;d<c+6*a;d++)for(let p=h-50*a;p<h-4*a;p++)u.px(d,p,dn(d|0,p/3|0,4)<.3?l.PUPIL:l.IRIS,0,-.2,.98);u.shape([[c-18*a,h],[c-14*a,h-6*a],[c+14*a,h-6*a],[c+18*a,h]],l.IRIS,{group:10,round:.2}),f[l.IRIS]=[90,150,190],f[l.PUPIL]=[210,235,245]}return{sp:u,colours:f}}function md(n,e,{K:t=2/(e.pixel||2),makeCanvas:i=Hc}={}){const r=ud[n];if(!r)throw new Error(`no area type "${n}"`);const a=$o(n.split("").reduce((h,f)=>h*31+f.charCodeAt(0),7)>>>0),s=(h,f,d)=>({sp:Ar(h.sp,h.colours,e,"none",i),kind:f,text:d}),o=fd(r,e),u=h=>(h||[]).map(([f,d])=>s(Ya(f,d,r,e,a,t),f,"")),c={def:r,floor:{sp:Ar(o.sp,o.colours,e,"none",i),kind:r.floor[0],text:r.text.floor},walls:u(r.wall),small:u(r.small),big:u(r.big),setPiece:null};if(c.walls.forEach(h=>h.text=r.text.wall),c.small.forEach(h=>h.text=r.text.small),c.big.forEach(h=>h.text=r.text.big),r.set){const h=pd(r.set[0],r.set[1],r,e,a,t);c.setPiece={...s(h,r.set[0],r.text.set),metres:h.metres,origin:h.origin}}return c}function gd(n,e){const t=new Map,i=new Map,r=(u,c,h)=>(u*2097152+(c+1048576))*2097152+(h+1048576),a=(u,c,h)=>{const f=r(u,c,h);let d=t.get(f);if(!d){const p=Math.pow(2,-u);d=[p*(c+Tt(c*7+u,h,n)),p*(h+Tt(c,h*13+u,n+1))],t.set(f,d)}return d},s=(u,c,h)=>{const f=Math.pow(2,-u),d=Math.floor(c/f),p=Math.floor(h/f);let _=d,x=p,g=1/0;for(let m=-2;m<=2;m++)for(let v=-2;v<=2;v++){const E=a(u,d+m,p+v),b=(E[0]-c)**2+(E[1]-h)**2;b<g&&(g=b,_=d+m,x=p+v)}return[_,x]},o=(u,c,h)=>{const f=r(u,c,h);let d=i.get(f);if(d)return d;if(u===0)d=[c,h];else{const p=a(u,c,h),_=s(u-1,p[0],p[1]);d=o(u-1,_[0],_[1])}return i.set(f,d),d};return{seed:n,depth:e,site:(u,c)=>a(0,u,c),partition(u,c){const h=s(e,u,c);return o(e,h[0],h[1])},centreness(u,c,h){const f=a(0,h[0],h[1]),d=Math.hypot(u-f[0],c-f[1]);let p=1/0;const _=Math.floor(u),x=Math.floor(c);for(let g=-2;g<=2;g++)for(let m=-2;m<=2;m++){const v=_+g,E=x+m;if(v===h[0]&&E===h[1])continue;const b=a(0,v,E);p=Math.min(p,Math.hypot(u-b[0],c-b[1]))}return Math.min(1,2*d/(d+p))},openness(u,c){let h=1/0,f=1/0;const d=Math.floor(u),p=Math.floor(c);for(let _=-2;_<=2;_++)for(let x=-2;x<=2;x++){const g=a(0,d+_,p+x),m=Math.hypot(u-g[0],c-g[1]);m<h?(f=h,h=m):m<f&&(f=m)}return Math.min(1,2*h/(h+f))}}}const _d=hh.types,Jn=oa.map(n=>({id:n.id,name:n.name,creature:n.creature,text:n.text,setPiece:n.set?n.text.set??"a set piece":"",hasWalls:!!n.wall?.length,floor:[n.floor[1],n.floor[2],n.floor[3]],treeDensity:_d[n.id]?.treeDensity??1})),vr=(n,e)=>n+","+e;function xd(n){if(n==null||n.trim()==="")return null;const e=n.trim();if(/^\d{1,9}$/.test(e))return Number(e);let t=2166136261;for(let i=0;i<e.length;i++)t=Math.imul(t^e.charCodeAt(i),16777619);return(t>>>0)%1e9}function Md(n,e,t,i){const r=new Map,a=(u,c)=>{if(u[0]===c[0]&&u[1]===c[1])return;const h=vr(u[0],u[1]),f=vr(c[0],c[1]);r.has(h)||r.set(h,new Set),r.has(f)||r.set(f,new Set),r.get(h).add(f),r.get(f).add(h)},s=(t-e)*i;let o=[];for(let u=0;u<=s;u++){const c=[];for(let h=0;h<=s;h++){const f=n.partition(e+h/i,e+u/i);c.push(f),h>0&&a(f,c[h-1]),u>0&&a(f,o[h])}o=c}return r}function vd(n,e){const t=e.mapAreas,i=2,r=e.areaSize*e.areaScale,a=Jn.length,s=3,o=Math.max(0,Math.min(1,e.areaSizeVariance))*s*.3,u=(O,P)=>{const B=O/r,W=P/r;return[B+o*(Cl(B/s,W/s,n+91)-.5)*2,W+o*(Cl(B/s,W/s,n+92)-.5)*2]},c=(O,P)=>{let B=O*r,W=P*r;for(let $=0;$<30;$++){const[ae,q]=u(B,W);B+=(O-ae)*r,W+=(P-q)*r}return[B,W]},h=gd(n,e.borderLayers),f=-i,d=t+i,p=Md(h,f,d,6),_=new Map,x=jr(n*5+1);for(let O=f;O<d;O++)for(let P=f;P<d;P++){const B=new Set;for(let ae=-2;ae<=2;ae++)for(let q=-2;q<=2;q++){const ee=_.get(vr(P+q,O+ae));ee!==void 0&&B.add(ee)}for(const ae of p.get(vr(P,O))??[]){const q=_.get(ae);q!==void 0&&B.add(q)}const W=[...Array(a).keys()].filter(ae=>!B.has(ae)),$=W.length?W:[...Array(a).keys()];_.set(vr(P,O),$[Math.floor(x()*$.length)])}const g=(O,P)=>_.get(vr(O,P))??Math.floor(Tt(O,P,n+17)*a),m=Math.floor(t/2),v=(O,P)=>{const B=h.site(O,P),W=h.partition(B[0],B[1]);return W[0]===O&&W[1]===P};let E=[m,m];for(const[O,P]of[[0,0],[1,0],[0,1],[-1,0],[0,-1],[1,1],[-1,1],[1,-1],[-1,-1]])if(v(m+O,m+P)){E=[m+O,m+P];break}const b=(O,P)=>{const B=h.site(O,P),W=c(B[0],B[1]);return{x:W[0],z:W[1]}},R=b(E[0],E[1]),A=(O,P)=>{const[B,W]=u(O,P),$=h.partition(B,W);return{cell:$,type:g($[0],$[1]),openness:h.openness(B,W)}},D=4.5,S=D*2.2,T=(O,P)=>{if(Math.hypot(O-R.x,P-R.z)<S)return 0;const[B,W]=u(O,P);return Pr((h.openness(B,W)-e.clearingSize)/Math.max(.01,e.clearingFalloff))*e.treeDensity},I=(O,P)=>{const B=Jn[g(O,P)];return B.setPiece&&Tt(O,P,n+61)<e.setPieceChance?B.setPiece:null},C=(O,P)=>Math.min(1,Math.hypot(O-E[0],P-E[1])/(t/2)),F=r*.5;return{seed:n,tuning:e,n:t,margin:i,areaSize:r,partition:h,centreCell:E,dancefloor:{x:R.x,z:R.z,radius:D},start:{x:R.x,z:R.z+2},bounds:{minX:F,maxX:t*r-F,minZ:F,maxZ:t*r-F},extent:{minX:f*r,maxX:d*r,minZ:f*r,maxZ:d*r},typeOf:g,areaAt:A,siteOf:b,treeWeight:T,neighbours:p,setPieceOf:I,remoteness:C}}function Sd(n,e,t=.5){const i=n.tuning,r=Ki(e,0,1),a=Math.round(Wn(i.creaturesNear,i.creaturesFar,Math.pow(r,i.creatureCurve))+(t-.5)*2),s=Math.min(Math.max(0,a),Math.round(i.legendsFar*Pr((r-i.legendsFrom)/Math.max(.01,1-i.legendsFrom))+(t-.5)*.8)),o=Math.round(Math.max(0,a-s)*i.youngShareFar*r);return{babies:Math.max(0,a-s-o),young:o,legends:s}}const bd=(n,e,t=0)=>(n.tuning.clearingSize+n.tuning.clearingFalloff*.3)*n.areaSize*.5*(e===2?.55:.8)*(1+t);function Ed(n){const e=[],t=n.tuning;let i=0;const[r,a]=n.centreCell;for(let s=0;s<n.n;s++)for(let o=0;o<n.n;o++){if(o===r&&s===a)continue;const u=jr(n.seed*7919+o*131+s*977+3),c=Jn[n.typeOf(o,s)],h=n.siteOf(o,s),f=n.remoteness(o,s),d=Sd(n,f,Tt(o,s,n.seed+43)),p=x=>{const g=bd(n,x,f),m=u()*Math.PI*2,v=Math.sqrt(u())*g,E=h.x+Math.cos(m)*v,b=h.z+Math.sin(m)*v;return{id:i++,species:c.creature,cell:[o,s],level:x,homeX:h.x,homeZ:h.z,range:g,x:E,z:b,tx:E,tz:b,rest:u()*3,speed:(x===2?t.legendSpeed:t.creatureSpeed)*(.7+u()*.6),facing:u()<.5?1:-1,moving:!1,walk:u(),rand:jr(n.seed*31+i*7+11)}};for(let x=0;x<d.babies;x++)e.push(p(0));for(let x=0;x<d.young;x++)e.push(p(1));const _=o===r+1&&s===a?Math.max(1,d.legends):d.legends;for(let x=0;x<_;x++)e.push(p(2))}return e}function yd(n,e){if(n.rest>0){n.rest-=e,n.moving=!1;return}const t=n.tx-n.x,i=n.tz-n.z,r=Math.hypot(t,i);if(r<.05){const s=n.rand()*Math.PI*2,o=Math.sqrt(n.rand())*n.range;n.tx=n.homeX+Math.cos(s)*o,n.tz=n.homeZ+Math.sin(s)*o,n.rest=.8+n.rand()*3.5,n.moving=!1;return}const a=Math.min(r,n.speed*e);n.x+=t/r*a,n.z+=i/r*a,Math.abs(t)>.02&&(n.facing=t>0?1:-1),n.moving=!0,n.walk+=e*(n.level===2?1.5:4)}function wd(n,e,t,i,r){for(const a of n)Math.abs(a.homeX-e)<i&&Math.abs(a.homeZ-t)<i&&yd(a,r)}const ru=6,Ad=4,tn=32;function Td(n){const e=n.tuning.camera.treetop.angleIn*Math.PI/180;return n.tuning.crownHeight/Math.sin(e)}function Rd(n,e,t){const{treeSpacingX:i,treeSpacingZ:r}=n.tuning,a=n.seed,s=[],o=Td(n),u=n.tuning.crownHalfWidth,c=Math.ceil(t*tn/r),h=Math.ceil((t+1)*tn/r);for(let f=c;f<h;f++){const d=f&1?.5:0,p=Math.ceil(e*tn/i-d),_=Math.ceil((e+1)*tn/i-d);for(let x=p;x<_;x++){const g=(x+d+(Tt(x,f,a+101)-.5)*.7)*i,m=(f+(Tt(x,f,a+102)-.5)*.7)*r,v=n.areaAt(g,m);Tt(x,f,a+103)>=n.treeWeight(g,m)*Jn[v.type].treeDensity||n.treeWeight(g,m-o)===0||n.treeWeight(g-u,m-o)===0||n.treeWeight(g+u,m-o)===0||s.push({x:g,z:m,type:v.type,variant:Math.floor(Tt(x,f,a+104)*ru),flip:Tt(x,f,a+105)<.5})}}return s}function Cd(n,e,t){const i=n.tuning.bushSpacing,r=n.seed,a=[],s=Math.ceil(t*tn/i),o=Math.ceil((t+1)*tn/i),u=Math.ceil(e*tn/i),c=Math.ceil((e+1)*tn/i);for(let h=s;h<o;h++)for(let f=u;f<c;f++){const d=(f+(Tt(f,h,r+201)-.5)*.9)*i,p=(h+(Tt(f,h,r+202)-.5)*.9)*i;Tt(f,h,r+203)>(.12+Math.min(1,n.treeWeight(d,p))*.3)*n.tuning.bushDensity||a.push({x:d,z:p,type:n.areaAt(d,p).type,variant:Math.floor(Tt(f,h,r+204)*Ad),flip:Tt(f,h,r+205)<.5})}return a}function Ld(n,e,t){const i=n.tuning.wallSpacing,r=n.seed,a=[],s=Math.ceil(t*tn/i),o=Math.ceil((t+1)*tn/i),u=Math.ceil(e*tn/i),c=Math.ceil((e+1)*tn/i);for(let h=s;h<o;h++)for(let f=u;f<c;f++){if(Tt(f,h,r+303)>n.tuning.wallDensity)continue;const d=(f+(Tt(f,h,r+301)-.5)*.6)*i,p=(h+(Tt(f,h,r+302)-.5)*.6)*i,_=n.areaAt(d,p);_.openness<.82||!Jn[_.type].hasWalls||a.push({x:d,z:p,type:_.type,variant:Math.floor(Tt(f,h,r+304)*4),flip:Tt(f,h,r+305)<.5})}return a}class Dd{constructor(e){this.map=e}map;trees=new Map;bushes=new Map;walls=new Map;chunks(e,t,i){const r=[];for(let a=Math.floor((t-i)/tn);a<=Math.floor((t+i)/tn);a++)for(let s=Math.floor((e-i)/tn);s<=Math.floor((e+i)/tn);s++)r.push([s,a]);return r}gather(e,t,i,r,a){e.size>600&&e.clear();const s=[];for(const[o,u]of this.chunks(i,r,a)){const c=o+","+u;let h=e.get(c);h||(h=t(o,u),e.set(c,h));for(const f of h)Math.abs(f.x-i)<=a&&Math.abs(f.z-r)<=a&&s.push(f)}return s}treesNear(e,t,i){return this.gather(this.trees,(r,a)=>Rd(this.map,r,a),e,t,i)}bushesNear(e,t,i){return this.gather(this.bushes,(r,a)=>Cd(this.map,r,a),e,t,i)}wallsNear(e,t,i){return this.gather(this.walls,(r,a)=>Ld(this.map,r,a),e,t,i)}setPiecesNear(e,t,i){const r=this.map,a=r.areaSize,s=[];for(let o=Math.floor((t-i)/a)-1;o<=Math.floor((t+i)/a)+1;o++)for(let u=Math.floor((e-i)/a)-1;u<=Math.floor((e+i)/a)+1;u++){if(u===r.centreCell[0]&&o===r.centreCell[1]||!r.setPieceOf(u,o))continue;const c=r.siteOf(u,o);Math.abs(c.x-e)<=i&&Math.abs(c.z-4-t)<=i&&s.push({x:c.x,z:c.z-4,type:r.typeOf(u,o),variant:0,flip:Tt(u,o,r.seed+71)<.5})}return s}}function Pd(n,e){return{x:n,z:e,vx:0,vz:0,lift:0,mode:"ground",facing:1}}const rl=(n,e)=>Wn(e.groundHeight,e.treetopHeight,Pr(n.lift)),Ss=n=>Pr(n.lift);function Id(n,e,t,i,r){let{mode:a,lift:s}=n;e.toggleMode&&(a=a==="ground"||a==="descending"?"rising":"descending"),a==="rising"?(s+=t/Math.max(.001,i.riseTime),s>=1&&(s=1,a="treetop")):a==="descending"&&(s-=t/Math.max(.001,i.descendTime),s<=0&&(s=0,a="ground"));let o=e.moveX,u=e.moveZ;const c=Math.hypot(o,u);c>1&&(o/=c,u/=c);const h=Wn(i.groundSpeed,i.treetopSpeed,Pr(s)),f=1-Math.exp(-i.acceleration*t);let d=n.vx+(o*h-n.vx)*f,p=n.vz+(u*h-n.vz)*f,_=n.x+d*t,x=n.z+p*t;(_<r.minX||_>r.maxX)&&(_=Ki(_,r.minX,r.maxX),d=0),(x<r.minZ||x>r.maxZ)&&(x=Ki(x,r.minZ,r.maxZ),p=0);const g=d>.3?1:d<-.3?-1:n.facing;return{x:_,z:x,vx:d,vz:p,lift:s,mode:a,facing:g}}function Nd(n,e){const t=vd(n,e),i=Pd(t.start.x,t.start.z);return{seed:n,tuning:e,map:t,forest:new Dd(t),creatures:Ed(t),clock:lh(),witch:i,camera:rh(e,i.x,rl(i,e),i.z)}}function Ud(n,e,t){const i=ch(n.clock,t);i!==0&&(n.witch=Id(n.witch,e,i,n.tuning,n.map.bounds),n.camera=ah(n.camera,e.zoom,{x:n.witch.x,y:rl(n.witch,n.tuning),z:n.witch.z},{x:n.witch.vx,z:n.witch.vz},n.witch.lift,i,n.tuning),wd(n.creatures,n.witch.x,n.witch.z,n.tuning.creatureSimRadius,i))}const Od=n=>sh(n.camera,n.camera.lift,n.tuning);function au(n){const e=n.map.areaAt(n.witch.x,n.witch.z),t=n.map.setPieceOf(e.cell[0],e.cell[1]);return Jn[e.type].name+(t?` (set piece: ${t})`:"")}const Fd="Witch tuning. Edit the numbers, push, and the playable link rebuilds. Distances are metres, times seconds, angles degrees. Keys starting with _ are notes.",Bd="The forest: mapAreas x mapAreas areas cut by the fractal partition. An area is areaSize x areaScale metres across on average (areaScale 1.4 doubles the ground of the first 28 m areas; push it for bigger). areaSizeVariance (0-1) makes areas vary in size, some small, some large. borderLayers sets how wiggly borders are.",kd=20,zd=28,Hd=1.4,Gd=.7,Vd=4,Wd="treeDensity (0-1): the chance of a tree on each spot outside the clearings; clearingSize (0-1): how far out from an area's centre the ground stays fully open; clearingFalloff (0-1): over how much of the way to the border trees thicken, smoothly, to full density; trees sit on a staggered grid treeSpacingX by treeSpacingZ metres, so no two crowns pile up. A tree is left out where its crown (crownHalfWidth either side, crownHeight up) would hang over a clearing seen from the treetops.",Yd=.9,Xd=.1,Kd=.5,qd=1,Zd=5,$d=3,Jd=4.5,Qd=5,jd=3.4,ef=4,tf=.6,nf="Speeds per mode, and how long rising and descending take.",rf=14,af=32,sf=10,of=.7,lf=.55,cf=1.4,uf=11,hf="Near-isometric on the ground, after Transistor; lower over the treetops, looking toward the horizon to feel the speed. The camera follows the witch on a soft spring (follow: its stiffness; higher keeps her closer to the middle) and looks a little ahead of her: lookAhead seconds of flight, at most lookAheadMax metres, eased in at lookAheadEase. zoomEase and liftEase: how softly zoom and rising change the angle and distance. a narrow field of view (fov, degrees) seen from far off, so there is little perspective. Each mode has its own angle (degrees below horizontal) and distance from the witch, at zoomed-in and zoomed-out. Zoom moves between them in zoomSteps steps.",df={fov:20,ground:{angleIn:38,angleOut:46,distanceIn:42,distanceOut:84},treetop:{angleIn:32,angleOut:36,distanceIn:70,distanceOut:120},lookAhead:.1,lookAheadMax:3,lookAheadEase:1.5,zoomEase:5,liftEase:8,zoomSteps:4,startZoom:1,follow:8},ff="Everything the camera can see is drawn, plus viewMargin metres round the view, so nothing appears or vanishes on screen. haze: the twilight haze fades the forest from near to far metres from the witch; nothing is drawn beyond far. pixelSize: screen pixels per art pixel. glowReach: metres the witch's light reaches. spriteTilt: 1 = sprites face the camera fully, 0 = stand upright.",pf=3,mf=8,gf=1,_f=1,xf=16,Mf=12,vf={near:90,far:220},Sf="bloom: a gentle glow round bright things (strength 0 or on false turns it off; threshold: how bright a pixel must be to glow). tiltShift: blurs the top and bottom of the screen so the forest looks like a miniature. strength: the blur at the screen's edges, in pixels; band: the height of the sharp band (0-1 of the screen); centre: where it sits (0 top, 0.5 middle, 1 bottom); where: 'before' blurs at the low resolution, before the pixels are scaled up, 'after' blurs the scaled-up image. Add ?tilt=before, ?tilt=after or ?tilt=off to the link to compare.",bf="shadows: a flat shadow under every tree (cast away from the moon), bush and creature. canopyShadow: a dappled shadow from the canopy overhead (height in metres), thinner in clearings, drifting with the wind. mist: a low drifting mist (height in metres above the ground). Each has on and strength.",Ef={on:!0,strength:.7},yf={on:!0,strength:.45,height:8,cover:.55,wind:.6},wf={on:!0,strength:.12,height:3,wind:.8},Af={on:!0,strength:.7,threshold:.55},Tf={on:!0,where:"before",strength:3,band:.4,centre:.55},Rf="Creatures grow more numerous and older with an area's distance from home (0 at the dancefloor, 1 at the map's edge): creaturesNear in the areas round home, creaturesFar at the edge (creatureCurve shapes the rise), youngShareFar of them young at the edge, and legendsFar legends from legendsFrom outward. Only creatures within creatureSimRadius metres of the witch move.",Cf=2,Lf=20,Df=1.3,Pf=.5,If=2,Nf=.55,Uf=110,Of=.6,Ff="setPieceChance: the share of areas, among the types that have a set piece, that show theirs. Wall objects (an area type's edges: puddles, henges, hedges) stand where areas meet, one per wallSpacing metres with chance wallDensity; they do not block movement.",Bf=.25,kf=.35,zf={_readme:Fd,_map:Bd,mapAreas:kd,areaSize:zd,areaScale:Hd,areaSizeVariance:Gd,borderLayers:Vd,_trees:Wd,treeDensity:Yd,clearingSize:Xd,clearingFalloff:Kd,bushDensity:qd,treeSpacingX:Zd,treeSpacingZ:$d,crownHalfWidth:Jd,crownHeight:Qd,bushSpacing:jd,wallSpacing:ef,wallDensity:tf,_witch:nf,groundSpeed:rf,treetopSpeed:af,acceleration:sf,riseTime:of,descendTime:lf,groundHeight:cf,treetopHeight:uf,_camera:hf,camera:df,_look:ff,pixelSize:pf,glowReach:mf,glowHeight:gf,spriteTilt:_f,artPixelsPerMetre:xf,viewMargin:Mf,haze:vf,_post:Sf,_shadows:bf,shadows:Ef,canopyShadow:yf,mist:wf,bloom:Af,tiltShift:Tf,_creatures:Rf,creaturesNear:Cf,creaturesFar:Lf,creatureCurve:Df,youngShareFar:Pf,legendsFar:If,legendsFrom:Nf,creatureSimRadius:Uf,creatureSpeed:Of,_setPieces:Ff,setPieceChance:Bf,legendSpeed:kf},ir=zf;class Hf{keys=new Set;pressed=new Set;padPrev=[];touch={x:0,y:0,toggle:!1,zoom:0,debug:!1};onAny=null;constructor(e=window){e.addEventListener("keydown",t=>{if(t.repeat){this.isGameKey(t.code)&&t.preventDefault();return}this.keys.add(t.code),this.isGameKey(t.code)&&t.preventDefault(),this.onAny?.()||this.pressed.add(t.code)}),e.addEventListener("keyup",t=>this.keys.delete(t.code)),e.addEventListener("blur",()=>this.keys.clear())}isGameKey(e){return/^(Arrow|Space$|Key[WASDQE]$|Minus$|Equal$|NumpadAdd$|NumpadSubtract$|Backquote$)/.test(e)}clearPresses(){this.pressed.clear();const e=this.touch;e.toggle=!1,e.zoom=0,e.debug=!1}read(){const e=f=>this.keys.has(f)?1:0,t=f=>this.pressed.has(f);let i=e("KeyD")+e("ArrowRight")-e("KeyA")-e("ArrowLeft"),r=e("KeyS")+e("ArrowDown")-e("KeyW")-e("ArrowUp"),a=t("Space"),s=(t("KeyQ")||t("Minus")||t("NumpadSubtract")?1:0)-(t("KeyE")||t("Equal")||t("NumpadAdd")?1:0),o=t("Backquote");this.pressed.clear();const u=typeof navigator<"u"&&navigator.getGamepads?navigator.getGamepads():[];for(const f of u){if(!f)continue;const d=b=>!!f.buttons[b]?.pressed,_=f.buttons.some((b,R)=>b.pressed&&!this.padPrev[R])&&!!this.onAny?.(),x=b=>!_&&d(b)&&!this.padPrev[b];let g=f.axes[0]??0,m=f.axes[1]??0;const v=Math.hypot(g,m),E=.18;if(v<E)g=0,m=0;else{const b=(Math.min(1,v)-E)/(1-E)/v;g*=b,m*=b}g+=(d(15)?1:0)-(d(14)?1:0),m+=(d(13)?1:0)-(d(12)?1:0),i+=g,r+=m,x(0)&&(a=!0),(x(4)||x(6))&&(s+=1),(x(5)||x(7))&&(s-=1),x(8)&&(o=!0),this.padPrev=f.buttons.map(b=>b.pressed);break}const c=this.touch;i+=c.x,r+=c.y,c.toggle&&(a=!0),s+=c.zoom,c.debug&&(o=!0),c.toggle=!1,c.zoom=0,c.debug=!1;const h=Math.hypot(i,r);return h>1&&(i/=h,r/=h),{moveX:i,moveZ:r,toggleMode:a,zoom:Math.sign(s),debug:o}}}const al="186",Gf=0,Bl=1,Vf=2,Xa=1,Wf=2,qr=3,$i=0,fn=1,ui=2,pi=0,Qr=1,kl=2,zl=3,Hl=4,Yf=5,xr=100,Xf=101,Kf=102,qf=103,Zf=104,$f=200,Jf=201,Qf=202,jf=203,su=204,ou=205,e0=206,t0=207,n0=208,i0=209,r0=210,a0=211,s0=212,o0=213,l0=214,ro=0,ao=1,so=2,ea=3,oo=4,lo=5,co=6,uo=7,lu=0,c0=1,u0=2,Zn=0,cu=1,uu=2,hu=3,du=4,fu=5,pu=6,mu=7,gu=300,Ji=301,Cr=302,bs=303,Es=304,us=306,ho=1e3,hi=1001,fo=1002,Gt=1003,h0=1004,ga=1005,Bt=1006,ys=1007,Wi=1008,_n=1009,_u=1010,xu=1011,ta=1012,sl=1013,Qn=1014,Kn=1015,jn=1016,ol=1017,ll=1018,na=1020,Mu=35902,vu=35899,Su=1021,bu=1022,yn=1023,xi=1026,Yi=1027,Eu=1028,cl=1029,Qi=1030,ul=1031,hl=1033,Ka=33776,qa=33777,Za=33778,$a=33779,po=35840,mo=35841,go=35842,_o=35843,xo=36196,Mo=37492,vo=37496,So=37488,bo=37489,ja=37490,Eo=37491,yo=37808,wo=37809,Ao=37810,To=37811,Ro=37812,Co=37813,Lo=37814,Do=37815,Po=37816,Io=37817,No=37818,Uo=37819,Oo=37820,Fo=37821,Bo=36492,ko=36494,zo=36495,Ho=36283,Go=36284,es=36285,Vo=36286,d0=3200,Gl=0,f0=1,Pn="",Sn="srgb",ia="srgb-linear",ts="linear",mt="srgb",ws=7680,p0=519,m0=512,g0=513,_0=514,dl=515,x0=516,M0=517,fl=518,v0=519,S0=35044,yu=35048,Vl="300 es",qn=2e3,ns=2001;function b0(n){for(let e=n.length-1;e>=0;--e)if(n[e]>=65535)return!0;return!1}function is(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function E0(){const n=is("canvas");return n.style.display="block",n}const Wl={};function Yl(...n){const e="THREE."+n.shift();console.log(e,...n)}function wu(n){const e=n[0];if(typeof e=="string"&&e.startsWith("TSL:")){const t=n[1];t&&t.isStackTrace?n[0]+=" "+t.getLocation():n[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return n}function He(...n){n=wu(n);const e="THREE."+n.shift();{const t=n[0];t&&t.isStackTrace?console.warn(t.getError(e)):console.warn(e,...n)}}function at(...n){n=wu(n);const e="THREE."+n.shift();{const t=n[0];t&&t.isStackTrace?console.error(t.getError(e)):console.error(e,...n)}}function yr(...n){const e=n.join(" ");e in Wl||(Wl[e]=!0,He(...n))}function y0(n,e,t){return new Promise(function(i,r){function a(){switch(n.clientWaitSync(e,n.SYNC_FLUSH_COMMANDS_BIT,0)){case n.WAIT_FAILED:r();break;case n.TIMEOUT_EXPIRED:setTimeout(a,t);break;default:i()}}setTimeout(a,t)})}const w0={[ro]:ao,[so]:co,[oo]:uo,[ea]:lo,[ao]:ro,[co]:so,[uo]:oo,[lo]:ea};class er{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(t)===-1&&i[e].push(t)}hasEventListener(e,t){const i=this._listeners;return i===void 0?!1:i[e]!==void 0&&i[e].indexOf(t)!==-1}removeEventListener(e,t){const i=this._listeners;if(i===void 0)return;const r=i[e];if(r!==void 0){const a=r.indexOf(t);a!==-1&&r.splice(a,1)}}dispatchEvent(e){const t=this._listeners;if(t===void 0)return;const i=t[e.type];if(i!==void 0){e.target=this;const r=i.slice(0);for(let a=0,s=r.length;a<s;a++)r[a].call(this,e);e.target=null}}}const Qt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],As=Math.PI/180,Wo=180/Math.PI;function la(){const n=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(Qt[n&255]+Qt[n>>8&255]+Qt[n>>16&255]+Qt[n>>24&255]+"-"+Qt[e&255]+Qt[e>>8&255]+"-"+Qt[e>>16&15|64]+Qt[e>>24&255]+"-"+Qt[t&63|128]+Qt[t>>8&255]+"-"+Qt[t>>16&255]+Qt[t>>24&255]+Qt[i&255]+Qt[i>>8&255]+Qt[i>>16&255]+Qt[i>>24&255]).toLowerCase()}function nt(n,e,t){return Math.max(e,Math.min(t,n))}function A0(n,e){return(n%e+e)%e}function Ts(n,e,t){return(1-t)*n+t*e}function kr(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:case Uint8ClampedArray:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function cn(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:case Uint8ClampedArray:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}class Ve{static{Ve.prototype.isVector2=!0}constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("THREE.Vector2: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,i=this.y,r=e.elements;return this.x=r[0]*t+r[3]*i+r[6],this.y=r[1]*t+r[4]*i+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=nt(this.x,e.x,t.x),this.y=nt(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=nt(this.x,e,t),this.y=nt(this.y,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(nt(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(nt(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y;return t*t+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const i=Math.cos(t),r=Math.sin(t),a=this.x-e.x,s=this.y-e.y;return this.x=a*i-s*r+e.x,this.y=a*r+s*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Ir{constructor(e=0,t=0,i=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=i,this._w=r}static slerpFlat(e,t,i,r,a,s,o){let u=i[r+0],c=i[r+1],h=i[r+2],f=i[r+3],d=a[s+0],p=a[s+1],_=a[s+2],x=a[s+3];if(f!==x||u!==d||c!==p||h!==_){let g=u*d+c*p+h*_+f*x;g<0&&(d=-d,p=-p,_=-_,x=-x,g=-g);let m=1-o;if(g<.9995){const v=Math.acos(g),E=Math.sin(v);m=Math.sin(m*v)/E,o=Math.sin(o*v)/E,u=u*m+d*o,c=c*m+p*o,h=h*m+_*o,f=f*m+x*o}else{u=u*m+d*o,c=c*m+p*o,h=h*m+_*o,f=f*m+x*o;const v=1/Math.sqrt(u*u+c*c+h*h+f*f);u*=v,c*=v,h*=v,f*=v}}e[t]=u,e[t+1]=c,e[t+2]=h,e[t+3]=f}static multiplyQuaternionsFlat(e,t,i,r,a,s){const o=i[r],u=i[r+1],c=i[r+2],h=i[r+3],f=a[s],d=a[s+1],p=a[s+2],_=a[s+3];return e[t]=o*_+h*f+u*p-c*d,e[t+1]=u*_+h*d+c*f-o*p,e[t+2]=c*_+h*p+o*d-u*f,e[t+3]=h*_-o*f-u*d-c*p,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,i,r){return this._x=e,this._y=t,this._z=i,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const i=e._x,r=e._y,a=e._z,s=e._order,o=Math.cos,u=Math.sin,c=o(i/2),h=o(r/2),f=o(a/2),d=u(i/2),p=u(r/2),_=u(a/2);switch(s){case"XYZ":this._x=d*h*f+c*p*_,this._y=c*p*f-d*h*_,this._z=c*h*_+d*p*f,this._w=c*h*f-d*p*_;break;case"YXZ":this._x=d*h*f+c*p*_,this._y=c*p*f-d*h*_,this._z=c*h*_-d*p*f,this._w=c*h*f+d*p*_;break;case"ZXY":this._x=d*h*f-c*p*_,this._y=c*p*f+d*h*_,this._z=c*h*_+d*p*f,this._w=c*h*f-d*p*_;break;case"ZYX":this._x=d*h*f-c*p*_,this._y=c*p*f+d*h*_,this._z=c*h*_-d*p*f,this._w=c*h*f+d*p*_;break;case"YZX":this._x=d*h*f+c*p*_,this._y=c*p*f+d*h*_,this._z=c*h*_-d*p*f,this._w=c*h*f-d*p*_;break;case"XZY":this._x=d*h*f-c*p*_,this._y=c*p*f-d*h*_,this._z=c*h*_+d*p*f,this._w=c*h*f+d*p*_;break;default:He("Quaternion: .setFromEuler() encountered an unknown order: "+s)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const i=t/2,r=Math.sin(i);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,i=t[0],r=t[4],a=t[8],s=t[1],o=t[5],u=t[9],c=t[2],h=t[6],f=t[10],d=i+o+f;if(d>0){const p=.5/Math.sqrt(d+1);this._w=.25/p,this._x=(h-u)*p,this._y=(a-c)*p,this._z=(s-r)*p}else if(i>o&&i>f){const p=2*Math.sqrt(1+i-o-f);this._w=(h-u)/p,this._x=.25*p,this._y=(r+s)/p,this._z=(a+c)/p}else if(o>f){const p=2*Math.sqrt(1+o-i-f);this._w=(a-c)/p,this._x=(r+s)/p,this._y=.25*p,this._z=(u+h)/p}else{const p=2*Math.sqrt(1+f-i-o);this._w=(s-r)/p,this._x=(a+c)/p,this._y=(u+h)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let i=e.dot(t)+1;return i<1e-8?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(nt(this.dot(e),-1,1)))}rotateTowards(e,t){const i=this.angleTo(e);if(i===0)return this;const r=Math.min(1,t/i);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const i=e._x,r=e._y,a=e._z,s=e._w,o=t._x,u=t._y,c=t._z,h=t._w;return this._x=i*h+s*o+r*c-a*u,this._y=r*h+s*u+a*o-i*c,this._z=a*h+s*c+i*u-r*o,this._w=s*h-i*o-r*u-a*c,this._onChangeCallback(),this}slerp(e,t){let i=e._x,r=e._y,a=e._z,s=e._w,o=this.dot(e);o<0&&(i=-i,r=-r,a=-a,s=-s,o=-o);let u=1-t;if(o<.9995){const c=Math.acos(o),h=Math.sin(c);u=Math.sin(u*c)/h,t=Math.sin(t*c)/h,this._x=this._x*u+i*t,this._y=this._y*u+r*t,this._z=this._z*u+a*t,this._w=this._w*u+s*t,this._onChangeCallback()}else this._x=this._x*u+i*t,this._y=this._y*u+r*t,this._z=this._z*u+a*t,this._w=this._w*u+s*t,this.normalize();return this}slerpQuaternions(e,t,i){return this.copy(e).slerp(t,i)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),i=Math.random(),r=Math.sqrt(1-i),a=Math.sqrt(i);return this.set(r*Math.sin(e),r*Math.cos(e),a*Math.sin(t),a*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class Y{static{Y.prototype.isVector3=!0}constructor(e=0,t=0,i=0){this.x=e,this.y=t,this.z=i}set(e,t,i){return i===void 0&&(i=this.z),this.x=e,this.y=t,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("THREE.Vector3: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Xl.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Xl.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,i=this.y,r=this.z,a=e.elements;return this.x=a[0]*t+a[3]*i+a[6]*r,this.y=a[1]*t+a[4]*i+a[7]*r,this.z=a[2]*t+a[5]*i+a[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,i=this.y,r=this.z,a=e.elements,s=1/(a[3]*t+a[7]*i+a[11]*r+a[15]);return this.x=(a[0]*t+a[4]*i+a[8]*r+a[12])*s,this.y=(a[1]*t+a[5]*i+a[9]*r+a[13])*s,this.z=(a[2]*t+a[6]*i+a[10]*r+a[14])*s,this}applyQuaternion(e){const t=this.x,i=this.y,r=this.z,a=e.x,s=e.y,o=e.z,u=e.w,c=2*(s*r-o*i),h=2*(o*t-a*r),f=2*(a*i-s*t);return this.x=t+u*c+s*f-o*h,this.y=i+u*h+o*c-a*f,this.z=r+u*f+a*h-s*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,i=this.y,r=this.z,a=e.elements;return this.x=a[0]*t+a[4]*i+a[8]*r,this.y=a[1]*t+a[5]*i+a[9]*r,this.z=a[2]*t+a[6]*i+a[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=nt(this.x,e.x,t.x),this.y=nt(this.y,e.y,t.y),this.z=nt(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=nt(this.x,e,t),this.y=nt(this.y,e,t),this.z=nt(this.z,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(nt(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const i=e.x,r=e.y,a=e.z,s=t.x,o=t.y,u=t.z;return this.x=r*u-a*o,this.y=a*s-i*u,this.z=i*o-r*s,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const i=e.dot(this)/t;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return Rs.copy(this).projectOnVector(e),this.sub(Rs)}reflect(e){return this.sub(Rs.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(nt(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y,r=this.z-e.z;return t*t+i*i+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,i){const r=Math.sin(t)*e;return this.x=r*Math.sin(i),this.y=Math.cos(t)*e,this.z=r*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,i){return this.x=e*Math.sin(t),this.y=i,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=i,this.z=r,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,i=Math.sqrt(1-t*t);return this.x=i*Math.cos(e),this.y=t,this.z=i*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Rs=new Y,Xl=new Ir;class Ge{static{Ge.prototype.isMatrix3=!0}constructor(e,t,i,r,a,s,o,u,c){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,i,r,a,s,o,u,c)}set(e,t,i,r,a,s,o,u,c){const h=this.elements;return h[0]=e,h[1]=r,h[2]=o,h[3]=t,h[4]=a,h[5]=u,h[6]=i,h[7]=s,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],this}extractBasis(e,t,i){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,r=t.elements,a=this.elements,s=i[0],o=i[3],u=i[6],c=i[1],h=i[4],f=i[7],d=i[2],p=i[5],_=i[8],x=r[0],g=r[3],m=r[6],v=r[1],E=r[4],b=r[7],R=r[2],A=r[5],D=r[8];return a[0]=s*x+o*v+u*R,a[3]=s*g+o*E+u*A,a[6]=s*m+o*b+u*D,a[1]=c*x+h*v+f*R,a[4]=c*g+h*E+f*A,a[7]=c*m+h*b+f*D,a[2]=d*x+p*v+_*R,a[5]=d*g+p*E+_*A,a[8]=d*m+p*b+_*D,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[1],r=e[2],a=e[3],s=e[4],o=e[5],u=e[6],c=e[7],h=e[8];return t*s*h-t*o*c-i*a*h+i*o*u+r*a*c-r*s*u}invert(){const e=this.elements,t=e[0],i=e[1],r=e[2],a=e[3],s=e[4],o=e[5],u=e[6],c=e[7],h=e[8],f=h*s-o*c,d=o*u-h*a,p=c*a-s*u,_=t*f+i*d+r*p;if(_===0)return this.set(0,0,0,0,0,0,0,0,0);const x=1/_;return e[0]=f*x,e[1]=(r*c-h*i)*x,e[2]=(o*i-r*s)*x,e[3]=d*x,e[4]=(h*t-r*u)*x,e[5]=(r*a-o*t)*x,e[6]=p*x,e[7]=(i*u-c*t)*x,e[8]=(s*t-i*a)*x,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,i,r,a,s,o){const u=Math.cos(a),c=Math.sin(a);return this.set(i*u,i*c,-i*(u*s+c*o)+s+e,-r*c,r*u,-r*(-c*s+u*o)+o+t,0,0,1),this}scale(e,t){return yr("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(Cs.makeScale(e,t)),this}rotate(e){return yr("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(Cs.makeRotation(-e)),this}translate(e,t){return yr("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(Cs.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,i,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,i=e.elements;for(let r=0;r<9;r++)if(t[r]!==i[r])return!1;return!0}fromArray(e,t=0){for(let i=0;i<9;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const Cs=new Ge,Kl=new Ge().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),ql=new Ge().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function T0(){const n={enabled:!0,workingColorSpace:ia,spaces:{},convert:function(r,a,s){return this.enabled===!1||a===s||!a||!s||(this.spaces[a].transfer===mt&&(r.r=mi(r.r),r.g=mi(r.g),r.b=mi(r.b)),this.spaces[a].primaries!==this.spaces[s].primaries&&(r.applyMatrix3(this.spaces[a].toXYZ),r.applyMatrix3(this.spaces[s].fromXYZ)),this.spaces[s].transfer===mt&&(r.r=wr(r.r),r.g=wr(r.g),r.b=wr(r.b))),r},workingToColorSpace:function(r,a){return this.convert(r,this.workingColorSpace,a)},colorSpaceToWorking:function(r,a){return this.convert(r,a,this.workingColorSpace)},getPrimaries:function(r){return this.spaces[r].primaries},getTransfer:function(r){return r===Pn?ts:this.spaces[r].transfer},getToneMappingMode:function(r){return this.spaces[r].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(r,a=this.workingColorSpace){return r.fromArray(this.spaces[a].luminanceCoefficients)},define:function(r){Object.assign(this.spaces,r)},_getMatrix:function(r,a,s){return r.copy(this.spaces[a].toXYZ).multiply(this.spaces[s].fromXYZ)},_getDrawingBufferColorSpace:function(r){return this.spaces[r].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(r=this.workingColorSpace){return this.spaces[r].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(r,a){return yr("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),n.workingToColorSpace(r,a)},toWorkingColorSpace:function(r,a){return yr("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),n.colorSpaceToWorking(r,a)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],i=[.3127,.329];return n.define({[ia]:{primaries:e,whitePoint:i,transfer:ts,toXYZ:Kl,fromXYZ:ql,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:Sn},outputColorSpaceConfig:{drawingBufferColorSpace:Sn}},[Sn]:{primaries:e,whitePoint:i,transfer:mt,toXYZ:Kl,fromXYZ:ql,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:Sn}}}),n}const tt=T0();function mi(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function wr(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}let rr;class R0{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let i;if(e instanceof HTMLCanvasElement)i=e;else{rr===void 0&&(rr=is("canvas")),rr.width=e.width,rr.height=e.height;const r=rr.getContext("2d");e instanceof ImageData?r.putImageData(e,0,0):r.drawImage(e,0,0,e.width,e.height),i=rr}return i.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=is("canvas");t.width=e.width,t.height=e.height;const i=t.getContext("2d");i.drawImage(e,0,0,e.width,e.height);const r=i.getImageData(0,0,e.width,e.height),a=r.data;for(let s=0;s<a.length;s++)a[s]=mi(a[s]/255)*255;return i.putImageData(r,0,0),t}else if(e.data){const t=e.data.slice(0);for(let i=0;i<t.length;i++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[i]=Math.floor(mi(t[i]/255)*255):t[i]=mi(t[i]);return{data:t,width:e.width,height:e.height}}else return He("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let C0=0;class pl{constructor(e=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:C0++}),this.uuid=la(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<"u"&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const i={uuid:this.uuid,url:""},r=this.data;if(r!==null){let a;if(Array.isArray(r)){a=[];for(let s=0,o=r.length;s<o;s++)r[s].isDataTexture?a.push(Ls(r[s].image)):a.push(Ls(r[s]))}else a=Ls(r);i.url=a}return t||(e.images[this.uuid]=i),i}}function Ls(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?R0.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(He("Texture: Unable to serialize Texture."),{})}let L0=0;const Ds=new Y;class sn extends er{constructor(e=sn.DEFAULT_IMAGE,t=sn.DEFAULT_MAPPING,i=hi,r=hi,a=Bt,s=Wi,o=yn,u=_n,c=sn.DEFAULT_ANISOTROPY,h=Pn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:L0++}),this.uuid=la(),this.name="",this.source=new pl(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=i,this.wrapT=r,this.magFilter=a,this.minFilter=s,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=u,this.offset=new Ve(0,0),this.repeat=new Ve(1,1),this.center=new Ve(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ge,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(Ds).x}get height(){return this.source.getSize(Ds).y}get depth(){return this.source.getSize(Ds).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const t in e){const i=e[t];if(i===void 0){He(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}const r=this[t];if(r===void 0){He(`Texture.setValues(): property '${t}' does not exist.`);continue}r&&i&&r.isVector2&&i.isVector2||r&&i&&r.isVector3&&i.isVector3||r&&i&&r.isMatrix3&&i.isMatrix3?r.copy(i):this[t]=i}}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const i={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),t||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==gu)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case ho:e.x=e.x-Math.floor(e.x);break;case hi:e.x=e.x<0?0:1;break;case fo:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case ho:e.y=e.y-Math.floor(e.y);break;case hi:e.y=e.y<0?0:1;break;case fo:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}sn.DEFAULT_IMAGE=null;sn.DEFAULT_MAPPING=gu;sn.DEFAULT_ANISOTROPY=1;class Lt{static{Lt.prototype.isVector4=!0}constructor(e=0,t=0,i=0,r=1){this.x=e,this.y=t,this.z=i,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,i,r){return this.x=e,this.y=t,this.z=i,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("THREE.Vector4: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,i=this.y,r=this.z,a=this.w,s=e.elements;return this.x=s[0]*t+s[4]*i+s[8]*r+s[12]*a,this.y=s[1]*t+s[5]*i+s[9]*r+s[13]*a,this.z=s[2]*t+s[6]*i+s[10]*r+s[14]*a,this.w=s[3]*t+s[7]*i+s[11]*r+s[15]*a,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,i,r,a;const u=e.elements,c=u[0],h=u[4],f=u[8],d=u[1],p=u[5],_=u[9],x=u[2],g=u[6],m=u[10];if(Math.abs(h-d)<.01&&Math.abs(f-x)<.01&&Math.abs(_-g)<.01){if(Math.abs(h+d)<.1&&Math.abs(f+x)<.1&&Math.abs(_+g)<.1&&Math.abs(c+p+m-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const E=(c+1)/2,b=(p+1)/2,R=(m+1)/2,A=(h+d)/4,D=(f+x)/4,S=(_+g)/4;return E>b&&E>R?E<.01?(i=0,r=.707106781,a=.707106781):(i=Math.sqrt(E),r=A/i,a=D/i):b>R?b<.01?(i=.707106781,r=0,a=.707106781):(r=Math.sqrt(b),i=A/r,a=S/r):R<.01?(i=.707106781,r=.707106781,a=0):(a=Math.sqrt(R),i=D/a,r=S/a),this.set(i,r,a,t),this}let v=Math.sqrt((g-_)*(g-_)+(f-x)*(f-x)+(d-h)*(d-h));return Math.abs(v)<.001&&(v=1),this.x=(g-_)/v,this.y=(f-x)/v,this.z=(d-h)/v,this.w=Math.acos((c+p+m-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=nt(this.x,e.x,t.x),this.y=nt(this.y,e.y,t.y),this.z=nt(this.z,e.z,t.z),this.w=nt(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=nt(this.x,e,t),this.y=nt(this.y,e,t),this.z=nt(this.z,e,t),this.w=nt(this.w,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(nt(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this.w=e.w+(t.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class D0 extends er{constructor(e=1,t=1,i={}){super(),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Bt,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},i),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=i.depth,this.scissor=new Lt(0,0,e,t),this.scissorTest=!1,this.viewport=new Lt(0,0,e,t),this.textures=[];const r={width:e,height:t,depth:i.depth},a=new sn(r),s=i.count;for(let o=0;o<s;o++)this.textures[o]=a.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(i),this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveColorBuffer=i.resolveColorBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this.storeMultisampledColorBuffer=i.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=i.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=i.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=i.depthTexture,this.samples=i.samples,this.multiview=i.multiview,this.useArrayDepthTexture=i.useArrayDepthTexture}_setTextureOptions(e={}){const t={minFilter:Bt,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let i=0;i<this.textures.length;i++)this.textures[i].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),e!==null&&e.renderTarget===null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,i=1){if(this.width!==e||this.height!==t||this.depth!==i){this.width=e,this.height=t,this.depth=i;for(let r=0,a=this.textures.length;r<a;r++)this.textures[r].image.width=e,this.textures[r].image.height=t,this.textures[r].image.depth=i,this.textures[r].isData3DTexture!==!0&&(this.textures[r].isArrayTexture=this.textures[r].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,i=e.textures.length;t<i;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;const r=Object.assign({},e.textures[t].image);this.textures[t].source=new pl(r)}if(this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveColorBuffer=e.resolveColorBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,this.storeMultisampledColorBuffer=e.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=e.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=e.storeMultisampledStencilBuffer,e.depthTexture!==null)if(e.depthTexture.renderTarget===e){const t=e.depthTexture.clone();t.renderTarget=null,this.depthTexture=t}else this.depthTexture=e.depthTexture;return this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}}class wn extends D0{constructor(e=1,t=1,i={}){super(e,t,i),this.isWebGLRenderTarget=!0}}class Au extends sn{constructor(e=null,t=1,i=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:i,depth:r},this.magFilter=Gt,this.minFilter=Gt,this.wrapR=hi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class P0 extends sn{constructor(e=null,t=1,i=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:i,depth:r},this.magFilter=Gt,this.minFilter=Gt,this.wrapR=hi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}}class Ot{static{Ot.prototype.isMatrix4=!0}constructor(e,t,i,r,a,s,o,u,c,h,f,d,p,_,x,g){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,i,r,a,s,o,u,c,h,f,d,p,_,x,g)}set(e,t,i,r,a,s,o,u,c,h,f,d,p,_,x,g){const m=this.elements;return m[0]=e,m[4]=t,m[8]=i,m[12]=r,m[1]=a,m[5]=s,m[9]=o,m[13]=u,m[2]=c,m[6]=h,m[10]=f,m[14]=d,m[3]=p,m[7]=_,m[11]=x,m[15]=g,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Ot().fromArray(this.elements)}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],t[9]=i[9],t[10]=i[10],t[11]=i[11],t[12]=i[12],t[13]=i[13],t[14]=i[14],t[15]=i[15],this}copyPosition(e){const t=this.elements,i=e.elements;return t[12]=i[12],t[13]=i[13],t[14]=i[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,i){return this.determinantAffine()===0?(e.set(1,0,0),t.set(0,1,0),i.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this)}makeBasis(e,t,i){return this.set(e.x,t.x,i.x,0,e.y,t.y,i.y,0,e.z,t.z,i.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();const t=this.elements,i=e.elements,r=1/ar.setFromMatrixColumn(e,0).length(),a=1/ar.setFromMatrixColumn(e,1).length(),s=1/ar.setFromMatrixColumn(e,2).length();return t[0]=i[0]*r,t[1]=i[1]*r,t[2]=i[2]*r,t[3]=0,t[4]=i[4]*a,t[5]=i[5]*a,t[6]=i[6]*a,t[7]=0,t[8]=i[8]*s,t[9]=i[9]*s,t[10]=i[10]*s,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,i=e.x,r=e.y,a=e.z,s=Math.cos(i),o=Math.sin(i),u=Math.cos(r),c=Math.sin(r),h=Math.cos(a),f=Math.sin(a);if(e.order==="XYZ"){const d=s*h,p=s*f,_=o*h,x=o*f;t[0]=u*h,t[4]=-u*f,t[8]=c,t[1]=p+_*c,t[5]=d-x*c,t[9]=-o*u,t[2]=x-d*c,t[6]=_+p*c,t[10]=s*u}else if(e.order==="YXZ"){const d=u*h,p=u*f,_=c*h,x=c*f;t[0]=d+x*o,t[4]=_*o-p,t[8]=s*c,t[1]=s*f,t[5]=s*h,t[9]=-o,t[2]=p*o-_,t[6]=x+d*o,t[10]=s*u}else if(e.order==="ZXY"){const d=u*h,p=u*f,_=c*h,x=c*f;t[0]=d-x*o,t[4]=-s*f,t[8]=_+p*o,t[1]=p+_*o,t[5]=s*h,t[9]=x-d*o,t[2]=-s*c,t[6]=o,t[10]=s*u}else if(e.order==="ZYX"){const d=s*h,p=s*f,_=o*h,x=o*f;t[0]=u*h,t[4]=_*c-p,t[8]=d*c+x,t[1]=u*f,t[5]=x*c+d,t[9]=p*c-_,t[2]=-c,t[6]=o*u,t[10]=s*u}else if(e.order==="YZX"){const d=s*u,p=s*c,_=o*u,x=o*c;t[0]=u*h,t[4]=x-d*f,t[8]=_*f+p,t[1]=f,t[5]=s*h,t[9]=-o*h,t[2]=-c*h,t[6]=p*f+_,t[10]=d-x*f}else if(e.order==="XZY"){const d=s*u,p=s*c,_=o*u,x=o*c;t[0]=u*h,t[4]=-f,t[8]=c*h,t[1]=d*f+x,t[5]=s*h,t[9]=p*f-_,t[2]=_*f-p,t[6]=o*h,t[10]=x*f+d}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(I0,e,N0)}lookAt(e,t,i){const r=this.elements;return pn.subVectors(e,t),pn.lengthSq()===0&&(pn.z=1),pn.normalize(),Ei.crossVectors(i,pn),Ei.lengthSq()===0&&(Math.abs(i.z)===1?pn.x+=1e-4:pn.z+=1e-4,pn.normalize(),Ei.crossVectors(i,pn)),Ei.normalize(),_a.crossVectors(pn,Ei),r[0]=Ei.x,r[4]=_a.x,r[8]=pn.x,r[1]=Ei.y,r[5]=_a.y,r[9]=pn.y,r[2]=Ei.z,r[6]=_a.z,r[10]=pn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,r=t.elements,a=this.elements,s=i[0],o=i[4],u=i[8],c=i[12],h=i[1],f=i[5],d=i[9],p=i[13],_=i[2],x=i[6],g=i[10],m=i[14],v=i[3],E=i[7],b=i[11],R=i[15],A=r[0],D=r[4],S=r[8],T=r[12],I=r[1],C=r[5],F=r[9],O=r[13],P=r[2],B=r[6],W=r[10],$=r[14],ae=r[3],q=r[7],ee=r[11],N=r[15];return a[0]=s*A+o*I+u*P+c*ae,a[4]=s*D+o*C+u*B+c*q,a[8]=s*S+o*F+u*W+c*ee,a[12]=s*T+o*O+u*$+c*N,a[1]=h*A+f*I+d*P+p*ae,a[5]=h*D+f*C+d*B+p*q,a[9]=h*S+f*F+d*W+p*ee,a[13]=h*T+f*O+d*$+p*N,a[2]=_*A+x*I+g*P+m*ae,a[6]=_*D+x*C+g*B+m*q,a[10]=_*S+x*F+g*W+m*ee,a[14]=_*T+x*O+g*$+m*N,a[3]=v*A+E*I+b*P+R*ae,a[7]=v*D+E*C+b*B+R*q,a[11]=v*S+E*F+b*W+R*ee,a[15]=v*T+E*O+b*$+R*N,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[4],r=e[8],a=e[12],s=e[1],o=e[5],u=e[9],c=e[13],h=e[2],f=e[6],d=e[10],p=e[14],_=e[3],x=e[7],g=e[11],m=e[15],v=u*p-c*d,E=o*p-c*f,b=o*d-u*f,R=s*p-c*h,A=s*d-u*h,D=s*f-o*h;return t*(x*v-g*E+m*b)-i*(_*v-g*R+m*A)+r*(_*E-x*R+m*D)-a*(_*b-x*A+g*D)}determinantAffine(){const e=this.elements,t=e[0],i=e[4],r=e[8],a=e[1],s=e[5],o=e[9],u=e[2],c=e[6],h=e[10];return t*(s*h-o*c)-i*(a*h-o*u)+r*(a*c-s*u)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,i){const r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=i),this}invert(){const e=this.elements,t=e[0],i=e[1],r=e[2],a=e[3],s=e[4],o=e[5],u=e[6],c=e[7],h=e[8],f=e[9],d=e[10],p=e[11],_=e[12],x=e[13],g=e[14],m=e[15],v=t*o-i*s,E=t*u-r*s,b=t*c-a*s,R=i*u-r*o,A=i*c-a*o,D=r*c-a*u,S=h*x-f*_,T=h*g-d*_,I=h*m-p*_,C=f*g-d*x,F=f*m-p*x,O=d*m-p*g,P=v*O-E*F+b*C+R*I-A*T+D*S;if(P===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const B=1/P;return e[0]=(o*O-u*F+c*C)*B,e[1]=(r*F-i*O-a*C)*B,e[2]=(x*D-g*A+m*R)*B,e[3]=(d*A-f*D-p*R)*B,e[4]=(u*I-s*O-c*T)*B,e[5]=(t*O-r*I+a*T)*B,e[6]=(g*b-_*D-m*E)*B,e[7]=(h*D-d*b+p*E)*B,e[8]=(s*F-o*I+c*S)*B,e[9]=(i*I-t*F-a*S)*B,e[10]=(_*A-x*b+m*v)*B,e[11]=(f*b-h*A-p*v)*B,e[12]=(o*T-s*C-u*S)*B,e[13]=(t*C-i*T+r*S)*B,e[14]=(x*E-_*R-g*v)*B,e[15]=(h*R-f*E+d*v)*B,this}scale(e){const t=this.elements,i=e.x,r=e.y,a=e.z;return t[0]*=i,t[4]*=r,t[8]*=a,t[1]*=i,t[5]*=r,t[9]*=a,t[2]*=i,t[6]*=r,t[10]*=a,t[3]*=i,t[7]*=r,t[11]*=a,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,i,r))}makeTranslation(e,t,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,i,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,t,-i,0,0,i,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,0,i,0,0,1,0,0,-i,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,0,i,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const i=Math.cos(t),r=Math.sin(t),a=1-i,s=e.x,o=e.y,u=e.z,c=a*s,h=a*o;return this.set(c*s+i,c*o-r*u,c*u+r*o,0,c*o+r*u,h*o+i,h*u-r*s,0,c*u-r*o,h*u+r*s,a*u*u+i,0,0,0,0,1),this}makeScale(e,t,i){return this.set(e,0,0,0,0,t,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,t,i,r,a,s){return this.set(1,i,a,0,e,1,s,0,t,r,1,0,0,0,0,1),this}compose(e,t,i){const r=this.elements,a=t._x,s=t._y,o=t._z,u=t._w,c=a+a,h=s+s,f=o+o,d=a*c,p=a*h,_=a*f,x=s*h,g=s*f,m=o*f,v=u*c,E=u*h,b=u*f,R=i.x,A=i.y,D=i.z;return r[0]=(1-(x+m))*R,r[1]=(p+b)*R,r[2]=(_-E)*R,r[3]=0,r[4]=(p-b)*A,r[5]=(1-(d+m))*A,r[6]=(g+v)*A,r[7]=0,r[8]=(_+E)*D,r[9]=(g-v)*D,r[10]=(1-(d+x))*D,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,i){const r=this.elements;e.x=r[12],e.y=r[13],e.z=r[14];const a=this.determinantAffine();if(a===0)return i.set(1,1,1),t.identity(),this;let s=ar.set(r[0],r[1],r[2]).length();const o=ar.set(r[4],r[5],r[6]).length(),u=ar.set(r[8],r[9],r[10]).length();a<0&&(s=-s),Rn.copy(this);const c=1/s,h=1/o,f=1/u;return Rn.elements[0]*=c,Rn.elements[1]*=c,Rn.elements[2]*=c,Rn.elements[4]*=h,Rn.elements[5]*=h,Rn.elements[6]*=h,Rn.elements[8]*=f,Rn.elements[9]*=f,Rn.elements[10]*=f,t.setFromRotationMatrix(Rn),i.x=s,i.y=o,i.z=u,this}makePerspective(e,t,i,r,a,s,o=qn,u=!1){const c=this.elements,h=2*a/(t-e),f=2*a/(i-r),d=(t+e)/(t-e),p=(i+r)/(i-r);let _,x;if(u)_=a/(s-a),x=s*a/(s-a);else if(o===qn)_=-(s+a)/(s-a),x=-2*s*a/(s-a);else if(o===ns)_=-s/(s-a),x=-s*a/(s-a);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=h,c[4]=0,c[8]=d,c[12]=0,c[1]=0,c[5]=f,c[9]=p,c[13]=0,c[2]=0,c[6]=0,c[10]=_,c[14]=x,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,i,r,a,s,o=qn,u=!1){const c=this.elements,h=2/(t-e),f=2/(i-r),d=-(t+e)/(t-e),p=-(i+r)/(i-r);let _,x;if(u)_=1/(s-a),x=s/(s-a);else if(o===qn)_=-2/(s-a),x=-(s+a)/(s-a);else if(o===ns)_=-1/(s-a),x=-a/(s-a);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=h,c[4]=0,c[8]=0,c[12]=d,c[1]=0,c[5]=f,c[9]=0,c[13]=p,c[2]=0,c[6]=0,c[10]=_,c[14]=x,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){const t=this.elements,i=e.elements;for(let r=0;r<16;r++)if(t[r]!==i[r])return!1;return!0}fromArray(e,t=0){for(let i=0;i<16;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e[t+9]=i[9],e[t+10]=i[10],e[t+11]=i[11],e[t+12]=i[12],e[t+13]=i[13],e[t+14]=i[14],e[t+15]=i[15],e}}const ar=new Y,Rn=new Ot,I0=new Y(0,0,0),N0=new Y(1,1,1),Ei=new Y,_a=new Y,pn=new Y,Zl=new Ot,$l=new Ir;class ji{constructor(e=0,t=0,i=0,r=ji.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=i,this._order=r}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,i,r=this._order){return this._x=e,this._y=t,this._z=i,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,i=!0){const r=e.elements,a=r[0],s=r[4],o=r[8],u=r[1],c=r[5],h=r[9],f=r[2],d=r[6],p=r[10];switch(t){case"XYZ":this._y=Math.asin(nt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,p),this._z=Math.atan2(-s,a)):(this._x=Math.atan2(d,c),this._z=0);break;case"YXZ":this._x=Math.asin(-nt(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,p),this._z=Math.atan2(u,c)):(this._y=Math.atan2(-f,a),this._z=0);break;case"ZXY":this._x=Math.asin(nt(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-f,p),this._z=Math.atan2(-s,c)):(this._y=0,this._z=Math.atan2(u,a));break;case"ZYX":this._y=Math.asin(-nt(f,-1,1)),Math.abs(f)<.9999999?(this._x=Math.atan2(d,p),this._z=Math.atan2(u,a)):(this._x=0,this._z=Math.atan2(-s,c));break;case"YZX":this._z=Math.asin(nt(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-f,a)):(this._x=0,this._y=Math.atan2(o,p));break;case"XZY":this._z=Math.asin(-nt(s,-1,1)),Math.abs(s)<.9999999?(this._x=Math.atan2(d,c),this._y=Math.atan2(o,a)):(this._x=Math.atan2(-h,p),this._y=0);break;default:He("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,i){return Zl.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Zl,t,i)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return $l.setFromEuler(this),this.setFromQuaternion($l,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}ji.DEFAULT_ORDER="XYZ";class Tu{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let U0=0;const Jl=new Y,sr=new Ir,ri=new Ot,xa=new Y,zr=new Y,O0=new Y,F0=new Ir,Ql=new Y(1,0,0),jl=new Y(0,1,0),ec=new Y(0,0,1),tc={type:"added"},B0={type:"removed"},or={type:"childadded",child:null},Ps={type:"childremoved",child:null};class xn extends er{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:U0++}),this.uuid=la(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=xn.DEFAULT_UP.clone();const e=new Y,t=new ji,i=new Ir,r=new Y(1,1,1);function a(){i.setFromEuler(t,!1)}function s(){t.setFromQuaternion(i,void 0,!1)}t._onChange(a),i._onChange(s),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new Ot},normalMatrix:{value:new Ge}}),this.matrix=new Ot,this.matrixWorld=new Ot,this.matrixAutoUpdate=xn.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=xn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Tu,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return sr.setFromAxisAngle(e,t),this.quaternion.multiply(sr),this}rotateOnWorldAxis(e,t){return sr.setFromAxisAngle(e,t),this.quaternion.premultiply(sr),this}rotateX(e){return this.rotateOnAxis(Ql,e)}rotateY(e){return this.rotateOnAxis(jl,e)}rotateZ(e){return this.rotateOnAxis(ec,e)}translateOnAxis(e,t){return Jl.copy(e).applyQuaternion(this.quaternion),this.position.add(Jl.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Ql,e)}translateY(e){return this.translateOnAxis(jl,e)}translateZ(e){return this.translateOnAxis(ec,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(ri.copy(this.matrixWorld).invert())}lookAt(e,t,i){e.isVector3?xa.copy(e):xa.set(e,t,i);const r=this.parent;this.updateWorldMatrix(!0,!1),zr.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?ri.lookAt(zr,xa,this.up):ri.lookAt(xa,zr,this.up),this.quaternion.setFromRotationMatrix(ri),r&&(ri.extractRotation(r.matrixWorld),sr.setFromRotationMatrix(ri),this.quaternion.premultiply(sr.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(at("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(tc),or.child=e,this.dispatchEvent(or),or.child=null):at("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(B0),Ps.child=e,this.dispatchEvent(Ps),Ps.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),ri.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),ri.multiply(e.parent.matrixWorld)),e.applyMatrix4(ri),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(tc),or.child=e,this.dispatchEvent(or),or.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let i=0,r=this.children.length;i<r;i++){const s=this.children[i].getObjectByProperty(e,t);if(s!==void 0)return s}}getObjectsByProperty(e,t,i=[]){this[e]===t&&i.push(this);const r=this.children;for(let a=0,s=r.length;a<s;a++)r[a].getObjectsByProperty(e,t,i);return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(zr,e,O0),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(zr,F0,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}intersectsFrustum(){}traverse(e){e(this);const t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);const e=this.pivot;if(e!==null){const t=e.x,i=e.y,r=e.z,a=this.matrix.elements;a[12]+=t-a[0]*t-a[4]*i-a[8]*r,a[13]+=i-a[1]*t-a[5]*i-a[9]*r,a[14]+=r-a[2]*t-a[6]*i-a[10]*r}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].updateMatrixWorld(e)}updateWorldMatrix(e,t,i=!1){const r=this.parent;if(e===!0&&r!==null&&r.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||i)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,i=!0),t===!0){const a=this.children;for(let s=0,o=a.length;s<o;s++)a[s].updateWorldMatrix(!1,!0,i)}}toJSON(e){const t=e===void 0||typeof e=="string",i={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const r={};r.uuid=this.uuid,r.type=this.type,r.name=this.name,r.castShadow=this.castShadow,r.receiveShadow=this.receiveShadow,r.visible=this.visible,r.frustumCulled=this.frustumCulled,r.renderOrder=this.renderOrder,r.static=this.static,r.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.pivot!==null&&(r.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(r.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(r.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),r.instanceInfo=this._instanceInfo.map(o=>({...o})),r.availableInstanceIds=this._availableInstanceIds.slice(),r.availableGeometryIds=this._availableGeometryIds.slice(),r.nextIndexStart=this._nextIndexStart,r.nextVertexStart=this._nextVertexStart,r.geometryCount=this._geometryCount,r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.matricesTexture=this._matricesTexture.toJSON(e),r.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(r.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(r.boundingBox=this.boundingBox.toJSON()));function a(o,u){return o[u.uuid]===void 0&&(o[u.uuid]=u.toJSON(e)),u.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=a(e.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const u=o.shapes;if(Array.isArray(u))for(let c=0,h=u.length;c<h;c++){const f=u[c];a(e.shapes,f)}else a(e.shapes,u)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(a(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let u=0,c=this.material.length;u<c;u++)o.push(a(e.materials,this.material[u]));r.material=o}else r.material=a(e.materials,this.material);if(this.children.length>0){r.children=[];for(let o=0;o<this.children.length;o++)r.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let o=0;o<this.animations.length;o++){const u=this.animations[o];r.animations.push(a(e.animations,u))}}if(t){const o=s(e.geometries),u=s(e.materials),c=s(e.textures),h=s(e.images),f=s(e.shapes),d=s(e.skeletons),p=s(e.animations),_=s(e.nodes);o.length>0&&(i.geometries=o),u.length>0&&(i.materials=u),c.length>0&&(i.textures=c),h.length>0&&(i.images=h),f.length>0&&(i.shapes=f),d.length>0&&(i.skeletons=d),p.length>0&&(i.animations=p),_.length>0&&(i.nodes=_)}return i.object=r,i;function s(o){const u=[];for(const c in o){const h=o[c];delete h.metadata,u.push(h)}return u}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot!==null?e.pivot.clone():null,this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let i=0;i<e.children.length;i++){const r=e.children[i];this.add(r.clone())}return this}dispose(){this.dispatchEvent({type:"dispose"})}}xn.DEFAULT_UP=new Y(0,1,0);xn.DEFAULT_MATRIX_AUTO_UPDATE=!0;xn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class Ma extends xn{constructor(){super(),this.isGroup=!0,this.type="Group"}}const k0={type:"move"};class Is{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Ma,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Ma,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new Y,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new Y),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Ma,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new Y,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new Y,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const i of e.hand.values())this._getHandJoint(t,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,i){let r=null,a=null,s=null;const o=this._targetRay,u=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){s=!0;for(const x of e.hand.values()){const g=t.getJointPose(x,i),m=this._getHandJoint(c,x);g!==null&&(m.matrix.fromArray(g.transform.matrix),m.matrix.decompose(m.position,m.rotation,m.scale),m.matrixWorldNeedsUpdate=!0,m.jointRadius=g.radius),m.visible=g!==null}const h=c.joints["index-finger-tip"],f=c.joints["thumb-tip"],d=h.position.distanceTo(f.position),p=.02,_=.005;c.inputState.pinching&&d>p+_?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&d<=p-_&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else u!==null&&e.gripSpace&&(a=t.getPose(e.gripSpace,i),a!==null&&(u.matrix.fromArray(a.transform.matrix),u.matrix.decompose(u.position,u.rotation,u.scale),u.matrixWorldNeedsUpdate=!0,a.linearVelocity?(u.hasLinearVelocity=!0,u.linearVelocity.copy(a.linearVelocity)):u.hasLinearVelocity=!1,a.angularVelocity?(u.hasAngularVelocity=!0,u.angularVelocity.copy(a.angularVelocity)):u.hasAngularVelocity=!1,u.eventsEnabled&&u.dispatchEvent({type:"gripUpdated",data:e,target:this})));o!==null&&(r=t.getPose(e.targetRaySpace,i),r===null&&a!==null&&(r=a),r!==null&&(o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,r.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(r.linearVelocity)):o.hasLinearVelocity=!1,r.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(r.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(k0)))}return o!==null&&(o.visible=r!==null),u!==null&&(u.visible=a!==null),c!==null&&(c.visible=s!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const i=new Ma;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[t.jointName]=i,e.add(i)}return e.joints[t.jointName]}}const Ru={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},yi={h:0,s:0,l:0},va={h:0,s:0,l:0};function Ns(n,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?n+(e-n)*6*t:t<1/2?e:t<2/3?n+(e-n)*6*(2/3-t):n}class lt{constructor(e,t,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,i)}set(e,t,i){if(t===void 0&&i===void 0){const r=e;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(e,t,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Sn){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,tt.colorSpaceToWorking(this,t),this}setRGB(e,t,i,r=tt.workingColorSpace){return this.r=e,this.g=t,this.b=i,tt.colorSpaceToWorking(this,r),this}setHSL(e,t,i,r=tt.workingColorSpace){if(e=A0(e,1),t=nt(t,0,1),i=nt(i,0,1),t===0)this.r=this.g=this.b=i;else{const a=i<=.5?i*(1+t):i+t-i*t,s=2*i-a;this.r=Ns(s,a,e+1/3),this.g=Ns(s,a,e),this.b=Ns(s,a,e-1/3)}return tt.colorSpaceToWorking(this,r),this}setStyle(e,t=Sn){function i(a){a!==void 0&&parseFloat(a)<1&&He("Color: Alpha component of "+e+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let a;const s=r[1],o=r[2];switch(s){case"rgb":case"rgba":if(a=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(a[4]),this.setRGB(Math.min(255,parseInt(a[1],10))/255,Math.min(255,parseInt(a[2],10))/255,Math.min(255,parseInt(a[3],10))/255,t);if(a=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(a[4]),this.setRGB(Math.min(100,parseInt(a[1],10))/100,Math.min(100,parseInt(a[2],10))/100,Math.min(100,parseInt(a[3],10))/100,t);break;case"hsl":case"hsla":if(a=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(a[4]),this.setHSL(parseFloat(a[1])/360,parseFloat(a[2])/100,parseFloat(a[3])/100,t);break;default:He("Color: Unknown color model "+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){const a=r[1],s=a.length;if(s===3)return this.setRGB(parseInt(a.charAt(0),16)/15,parseInt(a.charAt(1),16)/15,parseInt(a.charAt(2),16)/15,t);if(s===6)return this.setHex(parseInt(a,16),t);He("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Sn){const i=Ru[e.toLowerCase()];return i!==void 0?this.setHex(i,t):He("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=mi(e.r),this.g=mi(e.g),this.b=mi(e.b),this}copyLinearToSRGB(e){return this.r=wr(e.r),this.g=wr(e.g),this.b=wr(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Sn){return tt.workingToColorSpace(jt.copy(this),e),Math.round(nt(jt.r*255,0,255))*65536+Math.round(nt(jt.g*255,0,255))*256+Math.round(nt(jt.b*255,0,255))}getHexString(e=Sn){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=tt.workingColorSpace){tt.workingToColorSpace(jt.copy(this),t);const i=jt.r,r=jt.g,a=jt.b,s=Math.max(i,r,a),o=Math.min(i,r,a);let u,c;const h=(o+s)/2;if(o===s)u=0,c=0;else{const f=s-o;switch(c=h<=.5?f/(s+o):f/(2-s-o),s){case i:u=(r-a)/f+(r<a?6:0);break;case r:u=(a-i)/f+2;break;case a:u=(i-r)/f+4;break}u/=6}return e.h=u,e.s=c,e.l=h,e}getRGB(e,t=tt.workingColorSpace){return tt.workingToColorSpace(jt.copy(this),t),e.r=jt.r,e.g=jt.g,e.b=jt.b,e}getStyle(e=Sn){tt.workingToColorSpace(jt.copy(this),e);const t=jt.r,i=jt.g,r=jt.b;return e!==Sn?`color(${e} ${t.toFixed(3)} ${i.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(i*255)},${Math.round(r*255)})`}offsetHSL(e,t,i){return this.getHSL(yi),this.setHSL(yi.h+e,yi.s+t,yi.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,i){return this.r=e.r+(t.r-e.r)*i,this.g=e.g+(t.g-e.g)*i,this.b=e.b+(t.b-e.b)*i,this}lerpHSL(e,t){this.getHSL(yi),e.getHSL(va);const i=Ts(yi.h,va.h,t),r=Ts(yi.s,va.s,t),a=Ts(yi.l,va.l,t);return this.setHSL(i,r,a),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,i=this.g,r=this.b,a=e.elements;return this.r=a[0]*t+a[3]*i+a[6]*r,this.g=a[1]*t+a[4]*i+a[7]*r,this.b=a[2]*t+a[5]*i+a[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const jt=new lt;lt.NAMES=Ru;class z0 extends xn{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new ji,this.environmentIntensity=1,this.environmentRotation=new ji,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),t.object.backgroundBlurriness=this.backgroundBlurriness,t.object.backgroundIntensity=this.backgroundIntensity,t.object.backgroundRotation=this.backgroundRotation.toArray(),t.object.environmentIntensity=this.environmentIntensity,t.object.environmentRotation=this.environmentRotation.toArray(),t}}const Cn=new Y,ai=new Y,Us=new Y,si=new Y,lr=new Y,cr=new Y,nc=new Y,Os=new Y,Fs=new Y,Bs=new Y,ks=new Lt,zs=new Lt,Hs=new Lt;class In{constructor(e=new Y,t=new Y,i=new Y){this.a=e,this.b=t,this.c=i}static getNormal(e,t,i,r){r.subVectors(i,t),Cn.subVectors(e,t),r.cross(Cn);const a=r.lengthSq();return a>0?r.multiplyScalar(1/Math.sqrt(a)):r.set(0,0,0)}static getBarycoord(e,t,i,r,a){Cn.subVectors(r,t),ai.subVectors(i,t),Us.subVectors(e,t);const s=Cn.dot(Cn),o=Cn.dot(ai),u=Cn.dot(Us),c=ai.dot(ai),h=ai.dot(Us),f=s*c-o*o;if(f===0)return a.set(0,0,0),null;const d=1/f,p=(c*u-o*h)*d,_=(s*h-o*u)*d;return a.set(1-p-_,_,p)}static containsPoint(e,t,i,r){return this.getBarycoord(e,t,i,r,si)===null?!1:si.x>=0&&si.y>=0&&si.x+si.y<=1}static getInterpolation(e,t,i,r,a,s,o,u){return this.getBarycoord(e,t,i,r,si)===null?(u.x=0,u.y=0,"z"in u&&(u.z=0),"w"in u&&(u.w=0),null):(u.setScalar(0),u.addScaledVector(a,si.x),u.addScaledVector(s,si.y),u.addScaledVector(o,si.z),u)}static getInterpolatedAttribute(e,t,i,r,a,s){return ks.setScalar(0),zs.setScalar(0),Hs.setScalar(0),ks.fromBufferAttribute(e,t),zs.fromBufferAttribute(e,i),Hs.fromBufferAttribute(e,r),s.setScalar(0),s.addScaledVector(ks,a.x),s.addScaledVector(zs,a.y),s.addScaledVector(Hs,a.z),s}static isFrontFacing(e,t,i,r){return Cn.subVectors(i,t),ai.subVectors(e,t),Cn.cross(ai).dot(r)<0}set(e,t,i){return this.a.copy(e),this.b.copy(t),this.c.copy(i),this}setFromPointsAndIndices(e,t,i,r){return this.a.copy(e[t]),this.b.copy(e[i]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,t,i,r){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Cn.subVectors(this.c,this.b),ai.subVectors(this.a,this.b),Cn.cross(ai).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return In.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return In.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,i,r,a){return In.getInterpolation(e,this.a,this.b,this.c,t,i,r,a)}containsPoint(e){return In.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return In.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const i=this.a,r=this.b,a=this.c;let s,o;lr.subVectors(r,i),cr.subVectors(a,i),Os.subVectors(e,i);const u=lr.dot(Os),c=cr.dot(Os);if(u<=0&&c<=0)return t.copy(i);Fs.subVectors(e,r);const h=lr.dot(Fs),f=cr.dot(Fs);if(h>=0&&f<=h)return t.copy(r);const d=u*f-h*c;if(d<=0&&u>=0&&h<=0)return s=u/(u-h),t.copy(i).addScaledVector(lr,s);Bs.subVectors(e,a);const p=lr.dot(Bs),_=cr.dot(Bs);if(_>=0&&p<=_)return t.copy(a);const x=p*c-u*_;if(x<=0&&c>=0&&_<=0)return o=c/(c-_),t.copy(i).addScaledVector(cr,o);const g=h*_-p*f;if(g<=0&&f-h>=0&&p-_>=0)return nc.subVectors(a,r),o=(f-h)/(f-h+(p-_)),t.copy(r).addScaledVector(nc,o);const m=1/(g+x+d);return s=x*m,o=d*m,t.copy(i).addScaledVector(lr,s).addScaledVector(cr,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}class Nr{constructor(e=new Y(1/0,1/0,1/0),t=new Y(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t+=3)this.expandByPoint(Ln.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,i=e.count;t<i;t++)this.expandByPoint(Ln.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const i=Ln.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const i=e.geometry;if(i!==void 0){const a=i.getAttribute("position");if(t===!0&&a!==void 0&&e.isInstancedMesh!==!0)for(let s=0,o=a.count;s<o;s++)e.isMesh===!0?e.getVertexPosition(s,Ln):Ln.fromBufferAttribute(a,s),Ln.applyMatrix4(e.matrixWorld),this.expandByPoint(Ln);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Sa.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),Sa.copy(i.boundingBox)),Sa.applyMatrix4(e.matrixWorld),this.union(Sa)}const r=e.children;for(let a=0,s=r.length;a<s;a++)this.expandByObject(r[a],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Ln),Ln.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,i;return e.normal.x>0?(t=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),t<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Hr),ba.subVectors(this.max,Hr),ur.subVectors(e.a,Hr),hr.subVectors(e.b,Hr),dr.subVectors(e.c,Hr),wi.subVectors(hr,ur),Ai.subVectors(dr,hr),Ui.subVectors(ur,dr);let t=[0,-wi.z,wi.y,0,-Ai.z,Ai.y,0,-Ui.z,Ui.y,wi.z,0,-wi.x,Ai.z,0,-Ai.x,Ui.z,0,-Ui.x,-wi.y,wi.x,0,-Ai.y,Ai.x,0,-Ui.y,Ui.x,0];return!Gs(t,ur,hr,dr,ba)||(t=[1,0,0,0,1,0,0,0,1],!Gs(t,ur,hr,dr,ba))?!1:(Ea.crossVectors(wi,Ai),t=[Ea.x,Ea.y,Ea.z],Gs(t,ur,hr,dr,ba))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Ln).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Ln).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(oi[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),oi[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),oi[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),oi[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),oi[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),oi[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),oi[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),oi[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(oi),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const oi=[new Y,new Y,new Y,new Y,new Y,new Y,new Y,new Y],Ln=new Y,Sa=new Nr,ur=new Y,hr=new Y,dr=new Y,wi=new Y,Ai=new Y,Ui=new Y,Hr=new Y,ba=new Y,Ea=new Y,Oi=new Y;function Gs(n,e,t,i,r){for(let a=0,s=n.length-3;a<=s;a+=3){Oi.fromArray(n,a);const o=r.x*Math.abs(Oi.x)+r.y*Math.abs(Oi.y)+r.z*Math.abs(Oi.z),u=e.dot(Oi),c=t.dot(Oi),h=i.dot(Oi);if(Math.max(-Math.max(u,c,h),Math.min(u,c,h))>o)return!1}return!0}const zt=new Y,ya=new Ve;let H0=0;class $n extends er{constructor(e,t,i=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:H0++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=i,this.usage=S0,this.updateRanges=[],this.gpuType=Kn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,i){e*=this.itemSize,i*=t.itemSize;for(let r=0,a=this.itemSize;r<a;r++)this.array[e+r]=t.array[i+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,i=this.count;t<i;t++)ya.fromBufferAttribute(this,t),ya.applyMatrix3(e),this.setXY(t,ya.x,ya.y);else if(this.itemSize===3)for(let t=0,i=this.count;t<i;t++)zt.fromBufferAttribute(this,t),zt.applyMatrix3(e),this.setXYZ(t,zt.x,zt.y,zt.z);return this}applyMatrix4(e){for(let t=0,i=this.count;t<i;t++)zt.fromBufferAttribute(this,t),zt.applyMatrix4(e),this.setXYZ(t,zt.x,zt.y,zt.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)zt.fromBufferAttribute(this,t),zt.applyNormalMatrix(e),this.setXYZ(t,zt.x,zt.y,zt.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)zt.fromBufferAttribute(this,t),zt.transformDirection(e),this.setXYZ(t,zt.x,zt.y,zt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let i=this.array[e*this.itemSize+t];return this.normalized&&(i=kr(i,this.array)),i}setComponent(e,t,i){return this.normalized&&(i=cn(i,this.array)),this.array[e*this.itemSize+t]=i,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=kr(t,this.array)),t}setX(e,t){return this.normalized&&(t=cn(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=kr(t,this.array)),t}setY(e,t){return this.normalized&&(t=cn(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=kr(t,this.array)),t}setZ(e,t){return this.normalized&&(t=cn(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=kr(t,this.array)),t}setW(e,t){return this.normalized&&(t=cn(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,i){return e*=this.itemSize,this.normalized&&(t=cn(t,this.array),i=cn(i,this.array)),this.array[e+0]=t,this.array[e+1]=i,this}setXYZ(e,t,i,r){return e*=this.itemSize,this.normalized&&(t=cn(t,this.array),i=cn(i,this.array),r=cn(r,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=r,this}setXYZW(e,t,i,r,a){return e*=this.itemSize,this.normalized&&(t=cn(t,this.array),i=cn(i,this.array),r=cn(r,this.array),a=cn(a,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=r,this.array[e+3]=a,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return e.name=this.name,e.usage=this.usage,e.gpuType=this.gpuType,e}dispose(){this.dispatchEvent({type:"dispose"})}}class Cu extends $n{constructor(e,t,i){super(new Uint16Array(e),t,i)}}class Lu extends $n{constructor(e,t,i){super(new Uint32Array(e),t,i)}}class gi extends $n{constructor(e,t,i){super(new Float32Array(e),t,i)}}const G0=new Nr,Gr=new Y,Vs=new Y;class ml{constructor(e=new Y,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const i=this.center;t!==void 0?i.copy(t):G0.setFromPoints(e).getCenter(i);let r=0;for(let a=0,s=e.length;a<s;a++)r=Math.max(r,i.distanceToSquared(e[a]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const i=this.center.distanceToSquared(e);return t.copy(e),i>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Gr.subVectors(e,this.center);const t=Gr.lengthSq();if(t>this.radius*this.radius){const i=Math.sqrt(t),r=(i-this.radius)*.5;this.center.addScaledVector(Gr,r/i),this.radius+=r}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Vs.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Gr.copy(e.center).add(Vs)),this.expandByPoint(Gr.copy(e.center).sub(Vs))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}let V0=0;const vn=new Ot,Ws=new xn,fr=new Y,mn=new Nr,Vr=new Nr,Xt=new Y;class ei extends er{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:V0++}),this.uuid=la(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(b0(e)?Lu:Cu)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,i=0){this.groups.push({start:e,count:t,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const a=new Ge().getNormalMatrix(e);i.applyNormalMatrix(a),i.needsUpdate=!0}const r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return vn.makeRotationFromQuaternion(e),this.applyMatrix4(vn),this}rotateX(e){return vn.makeRotationX(e),this.applyMatrix4(vn),this}rotateY(e){return vn.makeRotationY(e),this.applyMatrix4(vn),this}rotateZ(e){return vn.makeRotationZ(e),this.applyMatrix4(vn),this}translate(e,t,i){return vn.makeTranslation(e,t,i),this.applyMatrix4(vn),this}scale(e,t,i){return vn.makeScale(e,t,i),this.applyMatrix4(vn),this}lookAt(e){return Ws.lookAt(e),Ws.updateMatrix(),this.applyMatrix4(Ws.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(fr).negate(),this.translate(fr.x,fr.y,fr.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const i=[];for(let r=0,a=e.length;r<a;r++){const s=e[r];i.push(s.x,s.y,s.z||0)}this.setAttribute("position",new gi(i,3))}else{const i=Math.min(e.length,t.count);for(let r=0;r<i;r++){const a=e[r];t.setXYZ(r,a.x,a.y,a.z||0)}e.length>t.count&&He("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Nr);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){at("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new Y(-1/0,-1/0,-1/0),new Y(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let i=0,r=t.length;i<r;i++){const a=t[i];mn.setFromBufferAttribute(a),this.morphTargetsRelative?(Xt.addVectors(this.boundingBox.min,mn.min),this.boundingBox.expandByPoint(Xt),Xt.addVectors(this.boundingBox.max,mn.max),this.boundingBox.expandByPoint(Xt)):(this.boundingBox.expandByPoint(mn.min),this.boundingBox.expandByPoint(mn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&at('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new ml);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){at("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new Y,1/0);return}if(e){const i=this.boundingSphere.center;if(mn.setFromBufferAttribute(e),t)for(let a=0,s=t.length;a<s;a++){const o=t[a];Vr.setFromBufferAttribute(o),this.morphTargetsRelative?(Xt.addVectors(mn.min,Vr.min),mn.expandByPoint(Xt),Xt.addVectors(mn.max,Vr.max),mn.expandByPoint(Xt)):(mn.expandByPoint(Vr.min),mn.expandByPoint(Vr.max))}mn.getCenter(i);let r=0;for(let a=0,s=e.count;a<s;a++)Xt.fromBufferAttribute(e,a),r=Math.max(r,i.distanceToSquared(Xt));if(t)for(let a=0,s=t.length;a<s;a++){const o=t[a],u=this.morphTargetsRelative;for(let c=0,h=o.count;c<h;c++)Xt.fromBufferAttribute(o,c),u&&(fr.fromBufferAttribute(e,c),Xt.add(fr)),r=Math.max(r,i.distanceToSquared(Xt))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&at('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){at("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=t.position,r=t.normal,a=t.uv;let s=this.getAttribute("tangent");(s===void 0||s.count!==i.count)&&(s=new $n(new Float32Array(4*i.count),4),this.setAttribute("tangent",s));const o=[],u=[];for(let S=0;S<i.count;S++)o[S]=new Y,u[S]=new Y;const c=new Y,h=new Y,f=new Y,d=new Ve,p=new Ve,_=new Ve,x=new Y,g=new Y;function m(S,T,I){c.fromBufferAttribute(i,S),h.fromBufferAttribute(i,T),f.fromBufferAttribute(i,I),d.fromBufferAttribute(a,S),p.fromBufferAttribute(a,T),_.fromBufferAttribute(a,I),h.sub(c),f.sub(c),p.sub(d),_.sub(d);const C=1/(p.x*_.y-_.x*p.y);isFinite(C)&&(x.copy(h).multiplyScalar(_.y).addScaledVector(f,-p.y).multiplyScalar(C),g.copy(f).multiplyScalar(p.x).addScaledVector(h,-_.x).multiplyScalar(C),o[S].add(x),o[T].add(x),o[I].add(x),u[S].add(g),u[T].add(g),u[I].add(g))}let v=this.groups;v.length===0&&(v=[{start:0,count:e.count}]);for(let S=0,T=v.length;S<T;++S){const I=v[S],C=I.start,F=I.count;for(let O=C,P=C+F;O<P;O+=3)m(e.getX(O+0),e.getX(O+1),e.getX(O+2))}const E=new Y,b=new Y,R=new Y,A=new Y;function D(S){R.fromBufferAttribute(r,S),A.copy(R);const T=o[S];E.copy(T),E.sub(R.multiplyScalar(R.dot(T))).normalize(),b.crossVectors(A,T);const C=b.dot(u[S])<0?-1:1;s.setXYZW(S,E.x,E.y,E.z,C)}for(let S=0,T=v.length;S<T;++S){const I=v[S],C=I.start,F=I.count;for(let O=C,P=C+F;O<P;O+=3)D(e.getX(O+0)),D(e.getX(O+1)),D(e.getX(O+2))}this._transformed=!0}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let i=this.getAttribute("normal");if(i===void 0||i.count!==t.count)i=new $n(new Float32Array(t.count*3),3),this.setAttribute("normal",i);else for(let d=0,p=i.count;d<p;d++)i.setXYZ(d,0,0,0);const r=new Y,a=new Y,s=new Y,o=new Y,u=new Y,c=new Y,h=new Y,f=new Y;if(e)for(let d=0,p=e.count;d<p;d+=3){const _=e.getX(d+0),x=e.getX(d+1),g=e.getX(d+2);r.fromBufferAttribute(t,_),a.fromBufferAttribute(t,x),s.fromBufferAttribute(t,g),h.subVectors(s,a),f.subVectors(r,a),h.cross(f),o.fromBufferAttribute(i,_),u.fromBufferAttribute(i,x),c.fromBufferAttribute(i,g),o.add(h),u.add(h),c.add(h),i.setXYZ(_,o.x,o.y,o.z),i.setXYZ(x,u.x,u.y,u.z),i.setXYZ(g,c.x,c.y,c.z)}else for(let d=0,p=t.count;d<p;d+=3)r.fromBufferAttribute(t,d+0),a.fromBufferAttribute(t,d+1),s.fromBufferAttribute(t,d+2),h.subVectors(s,a),f.subVectors(r,a),h.cross(f),i.setXYZ(d+0,h.x,h.y,h.z),i.setXYZ(d+1,h.x,h.y,h.z),i.setXYZ(d+2,h.x,h.y,h.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,i=e.count;t<i;t++)Xt.fromBufferAttribute(e,t),Xt.normalize(),e.setXYZ(t,Xt.x,Xt.y,Xt.z)}toNonIndexed(){function e(o,u){const c=o.array,h=o.itemSize,f=o.normalized,d=new c.constructor(u.length*h);let p=0,_=0;for(let x=0,g=u.length;x<g;x++){o.isInterleavedBufferAttribute?p=u[x]*o.data.stride+o.offset:p=u[x]*h;for(let m=0;m<h;m++)d[_++]=c[p++]}return new $n(d,h,f)}if(this.index===null)return He("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new ei,i=this.index.array,r=this.attributes;for(const o in r){const u=r[o],c=e(u,i);t.setAttribute(o,c)}const a=this.morphAttributes;for(const o in a){const u=[],c=a[o];for(let h=0,f=c.length;h<f;h++){const d=c[h],p=e(d,i);u.push(p)}t.morphAttributes[o]=u}t.morphTargetsRelative=this.morphTargetsRelative;const s=this.groups;for(let o=0,u=s.length;o<u;o++){const c=s[o];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,e.name=this.name,Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){const u=this.parameters;for(const c in u)u[c]!==void 0&&(e[c]=u[c]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const i=this.attributes;for(const u in i){const c=i[u];e.data.attributes[u]=c.toJSON(e.data)}const r={};let a=!1;for(const u in this.morphAttributes){const c=this.morphAttributes[u],h=[];for(let f=0,d=c.length;f<d;f++){const p=c[f];h.push(p.toJSON(e.data))}h.length>0&&(r[u]=h,a=!0)}a&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);const s=this.groups;s.length>0&&(e.data.groups=JSON.parse(JSON.stringify(s)));const o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const i=e.index;i!==null&&this.setIndex(i.clone());const r=e.attributes;for(const c in r){const h=r[c];this.setAttribute(c,h.clone(t))}const a=e.morphAttributes;for(const c in a){const h=[],f=a[c];for(let d=0,p=f.length;d<p;d++)h.push(f[d].clone(t));this.morphAttributes[c]=h}this.morphTargetsRelative=e.morphTargetsRelative;const s=e.groups;for(let c=0,h=s.length;c<h;c++){const f=s[c];this.addGroup(f.start,f.count,f.materialIndex)}const o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());const u=e.boundingSphere;return u!==null&&(this.boundingSphere=u.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Ys=new Y,W0=new Y,Y0=new Ge;class Ri{constructor(e=new Y(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,i,r){return this.normal.set(e,t,i),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,i){const r=Ys.subVectors(i,t).cross(W0.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,i=!0){const r=e.delta(Ys),a=this.normal.dot(r);if(a===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const s=-(e.start.dot(this.normal)+this.constant)/a;return i===!0&&(s<0||s>1)?null:t.copy(e.start).addScaledVector(r,s)}intersectsLine(e){const t=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return t<0&&i>0||i<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const i=t||Y0.getNormalMatrix(e),r=this.coplanarPoint(Ys).applyMatrix4(e),a=this.normal.applyMatrix3(i).normalize();return this.constant=-r.dot(a),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(e){return this.normal.fromArray(e.normal),this.constant=e.constant,this}}let X0=0;class hs extends er{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:X0++}),this.uuid=la(),this.name="",this.type="Material",this.blending=Qr,this.side=$i,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=su,this.blendDst=ou,this.blendEquation=xr,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new lt(0,0,0),this.blendAlpha=0,this.depthFunc=ea,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=p0,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=ws,this.stencilZFail=ws,this.stencilZPass=ws,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const i=e[t];if(i===void 0){He(`Material: parameter '${t}' has value of undefined.`);continue}const r=this[t];if(r===void 0){He(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(i):r&&r.isVector2&&i&&i.isVector2||r&&r.isEuler&&i&&i.isEuler||r&&r.isVector3&&i&&i.isVector3?r.copy(i):this[t]=i}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const i={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,i.blending=this.blending,i.side=this.side,i.shadowSide=this.shadowSide,i.vertexColors=this.vertexColors,i.opacity=this.opacity,i.transparent=this.transparent,i.blendSrc=this.blendSrc,i.blendDst=this.blendDst,i.blendEquation=this.blendEquation,i.blendSrcAlpha=this.blendSrcAlpha,i.blendDstAlpha=this.blendDstAlpha,i.blendEquationAlpha=this.blendEquationAlpha,i.blendColor=this.blendColor.getHex(),i.blendAlpha=this.blendAlpha,i.depthFunc=this.depthFunc,i.depthTest=this.depthTest,i.depthWrite=this.depthWrite,i.colorWrite=this.colorWrite,i.clipIntersection=this.clipIntersection,i.clipShadows=this.clipShadows,i.stencilWriteMask=this.stencilWriteMask,i.stencilFunc=this.stencilFunc,i.stencilRef=this.stencilRef,i.stencilFuncMask=this.stencilFuncMask,i.stencilFail=this.stencilFail,i.stencilZFail=this.stencilZFail,i.stencilZPass=this.stencilZPass,i.stencilWrite=this.stencilWrite,i.polygonOffset=this.polygonOffset,i.polygonOffsetFactor=this.polygonOffsetFactor,i.polygonOffsetUnits=this.polygonOffsetUnits,i.dithering=this.dithering,i.alphaTest=this.alphaTest,i.alphaHash=this.alphaHash,i.alphaToCoverage=this.alphaToCoverage,i.premultipliedAlpha=this.premultipliedAlpha,i.forceSinglePass=this.forceSinglePass,i.allowOverride=this.allowOverride,i.visible=this.visible,i.toneMapped=this.toneMapped,i.name=this.name,this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(i.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(i.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(i.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(i.clippingPlanes=this.clippingPlanes.map(a=>a.toJSON())),this.rotation!==void 0&&(i.rotation=this.rotation),this.depthPacking!==void 0&&(i.depthPacking=this.depthPacking),this.linewidth!==void 0&&(i.linewidth=this.linewidth),this.linecap!==void 0&&(i.linecap=this.linecap),this.linejoin!==void 0&&(i.linejoin=this.linejoin),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.wireframe!==void 0&&(i.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(i.flatShading=this.flatShading),this.fog!==void 0&&(i.fog=this.fog),Object.keys(this.userData).length>0&&(i.userData=this.userData);function r(a){const s=[];for(const o in a){const u=a[o];delete u.metadata,s.push(u)}return s}if(t){const a=r(e.textures),s=r(e.images);a.length>0&&(i.textures=a),s.length>0&&(i.images=s)}return i}fromJSON(e,t){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new lt().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.retroreflectivity!==void 0&&(this.retroreflectivity=e.retroreflectivity),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=e.iridescenceThicknessRange),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.clippingPlanes!==void 0&&(this.clippingPlanes=e.clippingPlanes.map(i=>new Ri().fromJSON(i))),e.clipIntersection!==void 0&&(this.clipIntersection=e.clipIntersection),e.clipShadows!==void 0&&(this.clipShadows=e.clipShadows),e.depthPacking!==void 0&&(this.depthPacking=e.depthPacking),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.linecap!==void 0&&(this.linecap=e.linecap),e.linejoin!==void 0&&(this.linejoin=e.linejoin),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(typeof e.vertexColors=="number"?this.vertexColors=e.vertexColors>0:this.vertexColors=e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=t[e.map]||null),e.matcap!==void 0&&(this.matcap=t[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=t[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=t[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=t[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let i=e.normalScale;Array.isArray(i)===!1&&(i=[i,i]),this.normalScale=new Ve().fromArray(i)}return e.displacementMap!==void 0&&(this.displacementMap=t[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=t[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=t[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=t[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=t[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=t[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=t[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=t[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=t[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=t[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=t[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=t[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=t[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=t[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new Ve().fromArray(e.clearcoatNormalScale)),e.iridescenceMap!==void 0&&(this.iridescenceMap=t[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=t[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=t[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=t[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=t[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=t[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=t[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let i=null;if(t!==null){const r=t.length;i=new Array(r);for(let a=0;a!==r;++a)i[a]=t[a].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}const li=new Y,Xs=new Y,wa=new Y,Aa=new Y;class K0{constructor(e=new Y,t=new Y(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,li)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const i=t.dot(this.direction);return i<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=li.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(li.copy(this.origin).addScaledVector(this.direction,t),li.distanceToSquared(e))}distanceSqToSegment(e,t,i,r){Xs.copy(e).add(t).multiplyScalar(.5),wa.copy(t).sub(e).normalize(),Aa.copy(this.origin).sub(Xs);const a=e.distanceTo(t)*.5,s=-this.direction.dot(wa),o=Aa.dot(this.direction),u=-Aa.dot(wa),c=Aa.lengthSq(),h=Math.abs(1-s*s);let f,d,p,_;if(h>0)if(f=s*u-o,d=s*o-u,_=a*h,f>=0)if(d>=-_)if(d<=_){const x=1/h;f*=x,d*=x,p=f*(f+s*d+2*o)+d*(s*f+d+2*u)+c}else d=a,f=Math.max(0,-(s*d+o)),p=-f*f+d*(d+2*u)+c;else d=-a,f=Math.max(0,-(s*d+o)),p=-f*f+d*(d+2*u)+c;else d<=-_?(f=Math.max(0,-(-s*a+o)),d=f>0?-a:Math.min(Math.max(-a,-u),a),p=-f*f+d*(d+2*u)+c):d<=_?(f=0,d=Math.min(Math.max(-a,-u),a),p=d*(d+2*u)+c):(f=Math.max(0,-(s*a+o)),d=f>0?a:Math.min(Math.max(-a,-u),a),p=-f*f+d*(d+2*u)+c);else d=s>0?-a:a,f=Math.max(0,-(s*d+o)),p=-f*f+d*(d+2*u)+c;return i&&i.copy(this.origin).addScaledVector(this.direction,f),r&&r.copy(Xs).addScaledVector(wa,d),p}intersectSphere(e,t){if(e.radius<0)return null;li.subVectors(e.center,this.origin);const i=li.dot(this.direction),r=li.dot(li)-i*i,a=e.radius*e.radius;if(r>a)return null;const s=Math.sqrt(a-r),o=i-s,u=i+s;return u<0?null:o<0?this.at(u,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(e.normal)+e.constant)/t;return i>=0?i:null}intersectPlane(e,t){const i=this.distanceToPlane(e);return i===null?null:this.at(i,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let i,r,a,s,o,u;const c=1/this.direction.x,h=1/this.direction.y,f=1/this.direction.z,d=this.origin;return c>=0?(i=(e.min.x-d.x)*c,r=(e.max.x-d.x)*c):(i=(e.max.x-d.x)*c,r=(e.min.x-d.x)*c),h>=0?(a=(e.min.y-d.y)*h,s=(e.max.y-d.y)*h):(a=(e.max.y-d.y)*h,s=(e.min.y-d.y)*h),i>s||a>r||((a>i||isNaN(i))&&(i=a),(s<r||isNaN(r))&&(r=s),f>=0?(o=(e.min.z-d.z)*f,u=(e.max.z-d.z)*f):(o=(e.max.z-d.z)*f,u=(e.min.z-d.z)*f),i>u||o>r)||((o>i||i!==i)&&(i=o),(u<r||r!==r)&&(r=u),r<0)?null:this.at(i>=0?i:r,t)}intersectsBox(e){return this.intersectBox(e,li)!==null}intersectTriangle(e,t,i,r,a){const s=this.origin,o=this.direction,u=o.x,c=o.y,h=o.z,f=e.x-s.x,d=e.y-s.y,p=e.z-s.z,_=t.x-s.x,x=t.y-s.y,g=t.z-s.z,m=i.x-s.x,v=i.y-s.y,E=i.z-s.z,b=Math.abs(u),R=Math.abs(c),A=Math.abs(h);let D,S,T,I,C,F,O,P,B,W,$,ae;if(b>=R&&b>=A?(T=u,F=f,B=_,ae=m,u>=0?(D=c,S=h,I=d,C=p,O=x,P=g,W=v,$=E):(D=h,S=c,I=p,C=d,O=g,P=x,W=E,$=v)):R>=A?(T=c,F=d,B=x,ae=v,c>=0?(D=h,S=u,I=p,C=f,O=g,P=_,W=E,$=m):(D=u,S=h,I=f,C=p,O=_,P=g,W=m,$=E)):(T=h,F=p,B=g,ae=E,h>=0?(D=u,S=c,I=f,C=d,O=_,P=x,W=m,$=v):(D=c,S=u,I=d,C=f,O=x,P=_,W=v,$=m)),T===0)return null;const q=D/T,ee=S/T,N=1/T,re=I-q*F,ce=C-ee*F,Re=O-q*B,Fe=P-ee*B,ze=W-q*ae,j=$-ee*ae,ie=ze*Fe-j*Re,G=re*j-ce*ze,ue=Re*ce-Fe*re;if(r){if(ie<0||G<0||ue<0)return null}else if((ie<0||G<0||ue<0)&&(ie>0||G>0||ue>0))return null;const se=ie+G+ue;if(se===0)return null;const ye=N*(ie*F+G*B+ue*ae);return(se>0?ye<0:ye>0)?null:this.at(ye/se,a)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Du extends hs{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new lt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new ji,this.combine=lu,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const ic=new Ot,Fi=new K0,Ta=new ml,rc=new Y,Ra=new Y,Ca=new Y,La=new Y,Ks=new Y,Da=new Y,ac=new Y,Pa=new Y;class ln extends xn{constructor(e=new ei,t=new Du){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const r=t[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let a=0,s=r.length;a<s;a++){const o=r[a].name||String(a);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=a}}}}getVertexPosition(e,t){const i=this.geometry,r=i.attributes.position,a=i.morphAttributes.position,s=i.morphTargetsRelative;t.fromBufferAttribute(r,e);const o=this.morphTargetInfluences;if(a&&o){Da.set(0,0,0);for(let u=0,c=a.length;u<c;u++){const h=o[u],f=a[u];h!==0&&(Ks.fromBufferAttribute(f,e),s?Da.addScaledVector(Ks,h):Da.addScaledVector(Ks.sub(t),h))}t.add(Da)}return t}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){const i=this.geometry,r=this.material,a=this.matrixWorld;r!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),Ta.copy(i.boundingSphere),Ta.applyMatrix4(a),Fi.copy(e.ray).recast(e.near),!(Ta.containsPoint(Fi.origin)===!1&&(Fi.intersectSphere(Ta,rc)===null||Fi.origin.distanceToSquared(rc)>(e.far-e.near)**2))&&(ic.copy(a).invert(),Fi.copy(e.ray).applyMatrix4(ic),!(i.boundingBox!==null&&Fi.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,t,Fi)))}_computeIntersections(e,t,i){let r;const a=this.geometry,s=this.material,o=a.index,u=a.attributes.position,c=a.attributes.uv,h=a.attributes.uv1,f=a.attributes.normal,d=a.groups,p=a.drawRange;if(o!==null)if(Array.isArray(s))for(let _=0,x=d.length;_<x;_++){const g=d[_],m=s[g.materialIndex],v=Math.max(g.start,p.start),E=Math.min(o.count,Math.min(g.start+g.count,p.start+p.count));for(let b=v,R=E;b<R;b+=3){const A=o.getX(b),D=o.getX(b+1),S=o.getX(b+2);r=Ia(this,m,e,i,c,h,f,A,D,S),r&&(r.faceIndex=Math.floor(b/3),r.face.materialIndex=g.materialIndex,t.push(r))}}else{const _=Math.max(0,p.start),x=Math.min(o.count,p.start+p.count);for(let g=_,m=x;g<m;g+=3){const v=o.getX(g),E=o.getX(g+1),b=o.getX(g+2);r=Ia(this,s,e,i,c,h,f,v,E,b),r&&(r.faceIndex=Math.floor(g/3),t.push(r))}}else if(u!==void 0)if(Array.isArray(s))for(let _=0,x=d.length;_<x;_++){const g=d[_],m=s[g.materialIndex],v=Math.max(g.start,p.start),E=Math.min(u.count,Math.min(g.start+g.count,p.start+p.count));for(let b=v,R=E;b<R;b+=3){const A=b,D=b+1,S=b+2;r=Ia(this,m,e,i,c,h,f,A,D,S),r&&(r.faceIndex=Math.floor(b/3),r.face.materialIndex=g.materialIndex,t.push(r))}}else{const _=Math.max(0,p.start),x=Math.min(u.count,p.start+p.count);for(let g=_,m=x;g<m;g+=3){const v=g,E=g+1,b=g+2;r=Ia(this,s,e,i,c,h,f,v,E,b),r&&(r.faceIndex=Math.floor(g/3),t.push(r))}}}}function q0(n,e,t,i,r,a,s,o){let u;if(e.side===fn?u=i.intersectTriangle(s,a,r,!0,o):u=i.intersectTriangle(r,a,s,e.side===$i,o),u===null)return null;Pa.copy(o),Pa.applyMatrix4(n.matrixWorld);const c=t.ray.origin.distanceTo(Pa);return c<t.near||c>t.far?null:{distance:c,point:Pa.clone(),object:n}}function Ia(n,e,t,i,r,a,s,o,u,c){n.getVertexPosition(o,Ra),n.getVertexPosition(u,Ca),n.getVertexPosition(c,La);const h=q0(n,e,t,i,Ra,Ca,La,ac);if(h){const f=new Y;In.getBarycoord(ac,Ra,Ca,La,f),r&&(h.uv=In.getInterpolatedAttribute(r,o,u,c,f,new Ve)),a&&(h.uv1=In.getInterpolatedAttribute(a,o,u,c,f,new Ve)),s&&(h.normal=In.getInterpolatedAttribute(s,o,u,c,f,new Y),h.normal.dot(i.direction)>0&&h.normal.multiplyScalar(-1));const d={a:o,b:u,c,normal:new Y,materialIndex:0};In.getNormal(Ra,Ca,La,d.normal),h.face=d,h.barycoord=f}return h}class Sr extends sn{constructor(e=null,t=1,i=1,r,a,s,o,u,c=Gt,h=Gt,f,d){super(null,s,o,u,c,h,r,a,f,d),this.isDataTexture=!0,this.image={data:e,width:t,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Pu extends $n{constructor(e,t,i,r=1){super(e,t,i),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=r}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const Bi=new ml,Z0=new Ve(.5,.5),Na=new Y;class gl{constructor(e=new Ri,t=new Ri,i=new Ri,r=new Ri,a=new Ri,s=new Ri){this.planes=[e,t,i,r,a,s]}set(e,t,i,r,a,s){const o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(i),o[3].copy(r),o[4].copy(a),o[5].copy(s),this}copy(e){const t=this.planes;for(let i=0;i<6;i++)t[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,t=qn,i=!1){const r=this.planes,a=e.elements,s=a[0],o=a[1],u=a[2],c=a[3],h=a[4],f=a[5],d=a[6],p=a[7],_=a[8],x=a[9],g=a[10],m=a[11],v=a[12],E=a[13],b=a[14],R=a[15];if(r[0].setComponents(c-s,p-h,m-_,R-v).normalize(),r[1].setComponents(c+s,p+h,m+_,R+v).normalize(),r[2].setComponents(c+o,p+f,m+x,R+E).normalize(),r[3].setComponents(c-o,p-f,m-x,R-E).normalize(),i)r[4].setComponents(u,d,g,b).normalize(),r[5].setComponents(c-u,p-d,m-g,R-b).normalize();else if(r[4].setComponents(c-u,p-d,m-g,R-b).normalize(),t===qn)r[5].setComponents(c+u,p+d,m+g,R+b).normalize();else if(t===ns)r[5].setComponents(u,d,g,b).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Bi.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Bi.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Bi)}intersectsSprite(e){Bi.center.set(0,0,0);const t=Z0.distanceTo(e.center);return Bi.radius=.7071067811865476+t,Bi.applyMatrix4(e.matrixWorld),this.intersectsSphere(Bi)}intersectsSphere(e){const t=this.planes,i=e.center,r=-e.radius;for(let a=0;a<6;a++)if(t[a].distanceToPoint(i)<r)return!1;return!0}intersectsBox(e){const t=this.planes;for(let i=0;i<6;i++){const r=t[i];if(Na.x=r.normal.x>0?e.max.x:e.min.x,Na.y=r.normal.y>0?e.max.y:e.min.y,Na.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(Na)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let i=0;i<6;i++)if(t[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class Iu extends sn{constructor(e=[],t=Ji,i,r,a,s,o,u,c,h){super(e,t,i,r,a,s,o,u,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class ra extends sn{constructor(e,t,i=Qn,r,a,s,o=Gt,u=Gt,c,h=xi,f=1){if(h!==xi&&h!==Yi)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const d={width:e,height:t,depth:f};super(d,r,a,s,o,u,h,i,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new pl(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return t.compareFunction=this.compareFunction,t}}class $0 extends ra{constructor(e,t=Qn,i=Ji,r,a,s=Gt,o=Gt,u,c=xi){const h={width:e,height:e,depth:1},f=[h,h,h,h,h,h];super(e,e,t,i,r,a,s,o,u,c),this.image=f,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}}class Nu extends sn{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}}class ca extends ei{constructor(e=1,t=1,i=1,r=1,a=1,s=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:i,widthSegments:r,heightSegments:a,depthSegments:s};const o=this;r=Math.floor(r),a=Math.floor(a),s=Math.floor(s);const u=[],c=[],h=[],f=[];let d=0,p=0;_("z","y","x",-1,-1,i,t,e,s,a,0),_("z","y","x",1,-1,i,t,-e,s,a,1),_("x","z","y",1,1,e,i,t,r,s,2),_("x","z","y",1,-1,e,i,-t,r,s,3),_("x","y","z",1,-1,e,t,i,r,a,4),_("x","y","z",-1,-1,e,t,-i,r,a,5),this.setIndex(u),this.setAttribute("position",new gi(c,3)),this.setAttribute("normal",new gi(h,3)),this.setAttribute("uv",new gi(f,2));function _(x,g,m,v,E,b,R,A,D,S,T){const I=b/D,C=R/S,F=b/2,O=R/2,P=A/2,B=D+1,W=S+1;let $=0,ae=0;const q=new Y;for(let ee=0;ee<W;ee++){const N=ee*C-O;for(let re=0;re<B;re++){const ce=re*I-F;q[x]=ce*v,q[g]=N*E,q[m]=P,c.push(q.x,q.y,q.z),q[x]=0,q[g]=0,q[m]=A>0?1:-1,h.push(q.x,q.y,q.z),f.push(re/D),f.push(1-ee/S),$+=1}}for(let ee=0;ee<S;ee++)for(let N=0;N<D;N++){const re=d+N+B*ee,ce=d+N+B*(ee+1),Re=d+(N+1)+B*(ee+1),Fe=d+(N+1)+B*ee;u.push(re,ce,Fe),u.push(ce,Re,Fe),ae+=6}o.addGroup(p,ae,T),p+=ae,d+=$}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ca(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}class ti extends ei{constructor(e=1,t=1,i=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:i,heightSegments:r};const a=e/2,s=t/2,o=Math.floor(i),u=Math.floor(r),c=o+1,h=u+1,f=e/o,d=t/u,p=[],_=[],x=[],g=[];for(let m=0;m<h;m++){const v=m*d-s;for(let E=0;E<c;E++){const b=E*f-a;_.push(b,-v,0),x.push(0,0,1),g.push(E/o),g.push(1-m/u)}}for(let m=0;m<u;m++)for(let v=0;v<o;v++){const E=v+c*m,b=v+c*(m+1),R=v+1+c*(m+1),A=v+1+c*m;p.push(E,b,A),p.push(b,R,A)}this.setIndex(p),this.setAttribute("position",new gi(_,3)),this.setAttribute("normal",new gi(x,3)),this.setAttribute("uv",new gi(g,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ti(e.width,e.height,e.widthSegments,e.heightSegments)}}function Lr(n){const e={};for(const t in n){e[t]={};for(const i in n[t]){const r=n[t][i];if(sc(r))r.isRenderTargetTexture?(He("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][i]=null):e[t][i]=r.clone();else if(Array.isArray(r))if(sc(r[0])){const a=[];for(let s=0,o=r.length;s<o;s++)a[s]=r[s].clone();e[t][i]=a}else e[t][i]=r.slice();else e[t][i]=r}}return e}function an(n){const e={};for(let t=0;t<n.length;t++){const i=Lr(n[t]);for(const r in i)e[r]=i[r]}return e}function sc(n){return n&&(n.isColor||n.isMatrix3||n.isMatrix4||n.isVector2||n.isVector3||n.isVector4||n.isTexture||n.isQuaternion)}function J0(n){const e=[];for(let t=0;t<n.length;t++)e.push(n[t].clone());return e}function Uu(n){const e=n.getRenderTarget();return e===null?n.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:tt.workingColorSpace}const Q0={clone:Lr,merge:an};var j0=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,ep=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class nn extends hs{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=j0,this.fragmentShader=ep,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Lr(e.uniforms),this.uniformsGroups=J0(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const r in this.uniforms){const s=this.uniforms[r].value;s&&s.isTexture?t.uniforms[r]={type:"t",value:s.toJSON(e).uuid}:s&&s.isColor?t.uniforms[r]={type:"c",value:s.getHex()}:s&&s.isVector2?t.uniforms[r]={type:"v2",value:s.toArray()}:s&&s.isVector3?t.uniforms[r]={type:"v3",value:s.toArray()}:s&&s.isVector4?t.uniforms[r]={type:"v4",value:s.toArray()}:s&&s.isMatrix3?t.uniforms[r]={type:"m3",value:s.toArray()}:s&&s.isMatrix4?t.uniforms[r]={type:"m4",value:s.toArray()}:t.uniforms[r]={value:s}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const i={};for(const r in this.extensions)this.extensions[r]===!0&&(i[r]=!0);return Object.keys(i).length>0&&(t.extensions=i),t}fromJSON(e,t){if(super.fromJSON(e,t),e.uniforms!==void 0)for(const i in e.uniforms){const r=e.uniforms[i];switch(this.uniforms[i]={},r.type){case"t":this.uniforms[i].value=t[r.value]||null;break;case"c":this.uniforms[i].value=new lt().setHex(r.value);break;case"v2":this.uniforms[i].value=new Ve().fromArray(r.value);break;case"v3":this.uniforms[i].value=new Y().fromArray(r.value);break;case"v4":this.uniforms[i].value=new Lt().fromArray(r.value);break;case"m3":this.uniforms[i].value=new Ge().fromArray(r.value);break;case"m4":this.uniforms[i].value=new Ot().fromArray(r.value);break;default:this.uniforms[i].value=r.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(const i in e.extensions)this.extensions[i]=e.extensions[i];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}}class tp extends nn{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class np extends hs{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=d0,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class ip extends hs{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const Ua=new Y,Oa=new Ir,kn=new Y;class Ou extends xn{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Ot,this.projectionMatrix=new Ot,this.projectionMatrixInverse=new Ot,this.coordinateSystem=qn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(Ua,Oa,kn),kn.x===1&&kn.y===1&&kn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Ua,Oa,kn.set(1,1,1)).invert()}updateWorldMatrix(e,t,i=!1){super.updateWorldMatrix(e,t,i),this.matrixWorld.decompose(Ua,Oa,kn),kn.x===1&&kn.y===1&&kn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Ua,Oa,kn.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}const Ti=new Y,oc=new Ve,lc=new Ve;class bn extends Ou{constructor(e=50,t=1,i=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=Wo*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(As*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Wo*2*Math.atan(Math.tan(As*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,i){Ti.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Ti.x,Ti.y).multiplyScalar(-e/Ti.z),Ti.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(Ti.x,Ti.y).multiplyScalar(-e/Ti.z)}getViewSize(e,t){return this.getViewBounds(e,oc,lc),t.subVectors(lc,oc)}setViewOffset(e,t,i,r,a,s){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=r,this.view.width=a,this.view.height=s,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(As*.5*this.fov)/this.zoom,i=2*t,r=this.aspect*i,a=-.5*r;const s=this.view;if(this.view!==null&&this.view.enabled){const u=s.fullWidth,c=s.fullHeight;a+=s.offsetX*r/u,t-=s.offsetY*i/c,r*=s.width/u,i*=s.height/c}const o=this.filmOffset;o!==0&&(a+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(a,a+r,t,t-i,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}class _l extends Ou{constructor(e=-1,t=1,i=1,r=-1,a=.1,s=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=i,this.bottom=r,this.near=a,this.far=s,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,i,r,a,s){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=r,this.view.width=a,this.view.height=s,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,r=(this.top+this.bottom)/2;let a=i-e,s=i+e,o=r+t,u=r-t;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;a+=c*this.view.offsetX,s=a+c*this.view.width,o-=h*this.view.offsetY,u=o-h*this.view.height}this.projectionMatrix.makeOrthographic(a,s,o,u,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}class Fu extends ei{constructor(){super(),this.isInstancedBufferGeometry=!0,this.type="InstancedBufferGeometry",this.instanceCount=1/0}copy(e){return super.copy(e),this.instanceCount=e.instanceCount,this}toJSON(){const e=super.toJSON();return e.instanceCount=this.instanceCount,e.isInstancedBufferGeometry=!0,e}}const pr=-90,mr=1;class rp extends xn{constructor(e,t,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const r=new bn(pr,mr,e,t);r.layers=this.layers,this.add(r);const a=new bn(pr,mr,e,t);a.layers=this.layers,this.add(a);const s=new bn(pr,mr,e,t);s.layers=this.layers,this.add(s);const o=new bn(pr,mr,e,t);o.layers=this.layers,this.add(o);const u=new bn(pr,mr,e,t);u.layers=this.layers,this.add(u);const c=new bn(pr,mr,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[i,r,a,s,o,u]=t;for(const c of t)this.remove(c);if(e===qn)i.up.set(0,1,0),i.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),a.up.set(0,0,-1),a.lookAt(0,1,0),s.up.set(0,0,1),s.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),u.up.set(0,1,0),u.lookAt(0,0,-1);else if(e===ns)i.up.set(0,-1,0),i.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),a.up.set(0,0,1),a.lookAt(0,1,0),s.up.set(0,0,-1),s.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),u.up.set(0,-1,0),u.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[a,s,o,u,c,h]=this.children,f=e.getRenderTarget(),d=e.getActiveCubeFace(),p=e.getActiveMipmapLevel(),_=e.xr.enabled;e.xr.enabled=!1;const x=i.texture.generateMipmaps;i.texture.generateMipmaps=!1;let g=!1;e.isWebGLRenderer===!0?g=e.state.buffers.depth.getReversed():g=e.reversedDepthBuffer,e.setRenderTarget(i,0,r),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(i,1,r),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,s),e.setRenderTarget(i,2,r),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(i,3,r),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,u),e.setRenderTarget(i,4,r),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),i.texture.generateMipmaps=x,e.setRenderTarget(i,5,r),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,h),e.setRenderTarget(f,d,p),e.xr.enabled=_,i.texture.needsPMREMUpdate=!0}}class ap extends bn{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}class Bu{static{Bu.prototype.isMatrix2=!0}constructor(e,t,i,r){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,i,r)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let i=0;i<4;i++)this.elements[i]=e[i+t];return this}set(e,t,i,r){const a=this.elements;return a[0]=e,a[2]=t,a[1]=i,a[3]=r,this}}function cc(n,e,t,i){const r=sp(i);switch(t){case Su:return n*e;case Eu:return n*e/r.components*r.byteLength;case cl:return n*e/r.components*r.byteLength;case Qi:return n*e*2/r.components*r.byteLength;case ul:return n*e*2/r.components*r.byteLength;case bu:return n*e*3/r.components*r.byteLength;case yn:return n*e*4/r.components*r.byteLength;case hl:return n*e*4/r.components*r.byteLength;case Ka:case qa:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case Za:case $a:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case mo:case _o:return Math.max(n,16)*Math.max(e,8)/4;case po:case go:return Math.max(n,8)*Math.max(e,8)/2;case xo:case Mo:case So:case bo:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case vo:case ja:case Eo:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case yo:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case wo:return Math.floor((n+4)/5)*Math.floor((e+3)/4)*16;case Ao:return Math.floor((n+4)/5)*Math.floor((e+4)/5)*16;case To:return Math.floor((n+5)/6)*Math.floor((e+4)/5)*16;case Ro:return Math.floor((n+5)/6)*Math.floor((e+5)/6)*16;case Co:return Math.floor((n+7)/8)*Math.floor((e+4)/5)*16;case Lo:return Math.floor((n+7)/8)*Math.floor((e+5)/6)*16;case Do:return Math.floor((n+7)/8)*Math.floor((e+7)/8)*16;case Po:return Math.floor((n+9)/10)*Math.floor((e+4)/5)*16;case Io:return Math.floor((n+9)/10)*Math.floor((e+5)/6)*16;case No:return Math.floor((n+9)/10)*Math.floor((e+7)/8)*16;case Uo:return Math.floor((n+9)/10)*Math.floor((e+9)/10)*16;case Oo:return Math.floor((n+11)/12)*Math.floor((e+9)/10)*16;case Fo:return Math.floor((n+11)/12)*Math.floor((e+11)/12)*16;case Bo:case ko:case zo:return Math.ceil(n/4)*Math.ceil(e/4)*16;case Ho:case Go:return Math.ceil(n/4)*Math.ceil(e/4)*8;case es:case Vo:return Math.ceil(n/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function sp(n){switch(n){case _n:case _u:return{byteLength:1,components:1};case ta:case xu:case jn:return{byteLength:2,components:1};case ol:case ll:return{byteLength:2,components:4};case Qn:case sl:case Kn:return{byteLength:4,components:1};case Mu:case vu:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${n}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:al}}));typeof window<"u"&&(window.__THREE__?He("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=al);function ku(){let n=null,e=!1,t=null,i=null;function r(a,s){i=n.requestAnimationFrame(r),t(a,s)}return{start:function(){e!==!0&&t!==null&&n!==null&&(i=n.requestAnimationFrame(r),e=!0)},stop:function(){n!==null&&n.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(a){t=a},setContext:function(a){n=a}}}function op(n){const e=new WeakMap;function t(o,u){const c=o.array,h=o.usage,f=c.byteLength,d=n.createBuffer();n.bindBuffer(u,d),n.bufferData(u,c,h),o.onUploadCallback();let p;if(c instanceof Float32Array)p=n.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)p=n.HALF_FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?p=n.HALF_FLOAT:p=n.UNSIGNED_SHORT;else if(c instanceof Int16Array)p=n.SHORT;else if(c instanceof Uint32Array)p=n.UNSIGNED_INT;else if(c instanceof Int32Array)p=n.INT;else if(c instanceof Int8Array)p=n.BYTE;else if(c instanceof Uint8Array)p=n.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)p=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:d,type:p,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:f}}function i(o,u,c){const h=u.array,f=u.updateRanges;if(n.bindBuffer(c,o),f.length===0)n.bufferSubData(c,0,h);else{f.sort((p,_)=>p.start-_.start);let d=0;for(let p=1;p<f.length;p++){const _=f[d],x=f[p];x.start<=_.start+_.count+1?_.count=Math.max(_.count,x.start+x.count-_.start):(++d,f[d]=x)}f.length=d+1;for(let p=0,_=f.length;p<_;p++){const x=f[p];n.bufferSubData(c,x.start*h.BYTES_PER_ELEMENT,h,x.start,x.count)}u.clearUpdateRanges()}u.onUploadCallback()}function r(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function a(o){o.isInterleavedBufferAttribute&&(o=o.data);const u=e.get(o);u&&(n.deleteBuffer(u.buffer),e.delete(o))}function s(o,u){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const h=e.get(o);(!h||h.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const c=e.get(o);if(c===void 0)e.set(o,t(o,u));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(c.buffer,o,u),c.version=o.version}}return{get:r,remove:a,update:s}}var lp=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,cp=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,up=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,hp=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,dp=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,fp=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,pp=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,mp=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,gp=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,_p=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,xp=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Mp=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,vp=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,Sp=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,bp=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,Ep=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,yp=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,wp=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Ap=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Tp=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,Rp=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,Cp=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,Lp=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,Dp=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
#define inverseTransformDirection transformDirectionByInverseViewMatrix
vec3 transformNormalByInverseViewMatrix( in vec3 normal, in mat4 viewMatrix ) {
	return normalize( ( vec4( normal, 0.0 ) * viewMatrix ).xyz );
}
vec3 transformDirectionByInverseViewMatrix( in vec3 dir, in mat4 viewMatrix ) {
	return normalize( ( vec4( dir, 0.0 ) * viewMatrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,Pp=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,Ip=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
#endif`,Np=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Up=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Op=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Fp=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Bp="gl_FragColor = linearToOutputTexel( gl_FragColor );",kp=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,zp=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,Hp=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,Gp=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,Vp=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Wp=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,Yp=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Xp=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Kp=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,qp=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Zp=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,$p=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Jp=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Qp=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,jp=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_SUN_LIGHTS > 0
	struct SunLight {
		vec3 direction;
		vec3 color;
	};
	uniform SunLight sunLights[ NUM_SUN_LIGHTS ];
	void getSunLightInfo( const in SunLight sunLight, out IncidentLight light ) {
		light.color = sunLight.color;
		light.direction = sunLight.direction;
		light.visible = true;
	}
#endif
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif
#include <lightprobes_pars_fragment>`,em=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = transformDirectionByInverseViewMatrix( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_RETROREFLECTION
		vec3 getIBLRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 retroVec = normalize( mix( viewDir, normal, pow4( roughness ) ) );
				retroVec = transformDirectionByInverseViewMatrix( retroVec, viewMatrix );
				vec4 envMapColor = textureCubeUV( envMap, envMapRotation * retroVec, roughness );
				return envMapColor.rgb * envMapIntensity;
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
		#ifdef USE_RETROREFLECTION
			vec3 getIBLAnisotropyRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
				#ifdef ENVMAP_TYPE_CUBE_UV
					vec3 bentNormal = cross( bitangent, viewDir );
					bentNormal = normalize( cross( bentNormal, bitangent ) );
					bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
					return getIBLRetroRadiance( viewDir, bentNormal, roughness );
				#else
					return vec3( 0.0 );
				#endif
			}
		#endif
	#endif
#endif`,tm=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,nm=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,im=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,rm=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,am=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_RETROREFLECTION
	material.retroreflectivity = retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,sm=`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	vec2 dfg;
	vec3 multiScatteringCompensation;
	#ifdef USE_RETROREFLECTION
		float retroreflectivity;
	#endif
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0Dielectric;
		vec3 iridescenceF0Metallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		return 0.5 / max( gv + gl, EPSILON );
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec2 fab, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec2 fab, const in vec3 specularColor, const in float specularF90, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	vec3 specularBRDF = BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	#ifdef USE_RETROREFLECTION
		vec3 retroViewDir = reflect( - geometryViewDir, geometryNormal );
		vec3 retroSpecularBRDF = BRDF_GGX( directLight.direction, retroViewDir, geometryNormal, material );
		specularBRDF = mix( specularBRDF, retroSpecularBRDF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directSpecular += irradiance * specularBRDF * material.multiScatteringCompensation;
	vec3 halfDir = normalize( directLight.direction + geometryViewDir );
	float dotVH = saturate( dot( geometryViewDir, halfDir ) );
	vec3 F = F_Schlick( material.specularColor, material.specularF90, dotVH );
	#ifdef USE_RETROREFLECTION
		vec3 retroHalfDir = normalize( directLight.direction + retroViewDir );
		float dotRetroVH = saturate( dot( retroViewDir, retroHalfDir ) );
		vec3 retroF = F_Schlick( material.specularColor, material.specularF90, dotRetroVH );
		F = mix( F, retroF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - F );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScattering, multiScattering );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScattering, multiScattering );
	#endif
	vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - singleScattering - multiScattering );
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		sheenSpecularIndirect += irradiance * material.sheenColor * sheenAlbedo * RECIPROCAL_PI;
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( material.dfg, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceF0Metallic, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( material.dfg, material.diffuseColor, material.specularF90, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,om=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		vec3 iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		vec3 iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( iridescenceFresnelDielectric, iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0Dielectric = Schlick_to_F0( iridescenceFresnelDielectric, 1.0, dotNVi );
		material.iridescenceF0Metallic = Schlick_to_F0( iridescenceFresnelMetallic, 1.0, dotNVi );
	}
#endif
#ifdef STANDARD
	float dotNVms = saturate( dot( geometryNormal, geometryViewDir ) );
	material.dfg = texture2D( dfgLUT, vec2( material.roughness, dotNVms ) ).rg;
	#if ( NUM_SUN_LIGHTS > 0 || NUM_DIR_LIGHTS > 0 || NUM_POINT_LIGHTS > 0 || NUM_SPOT_LIGHTS > 0 )
		float EssMs = material.dfg.x + material.dfg.y;
		material.multiScatteringCompensation = 1.0 + material.specularColorBlended * ( 1.0 / EssMs - 1.0 );
	#endif
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SUN_LIGHTS > 0 ) && defined( RE_Direct )
	SunLight sunLight;
	#if defined( USE_SHADOWMAP ) && NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHTS; i ++ ) {
		sunLight = sunLights[ i ];
		getSunLightInfo( sunLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SUN_LIGHT_SHADOWS )
		sunLightShadow = sunLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getSunShadow( sunShadowMap[ i ], sunLightShadow, UNROLLED_LOOP_INDEX ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
	#ifdef USE_LIGHT_PROBES_GRID
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = transformNormalByInverseViewMatrix( geometryNormal, viewMatrix );
		irradiance += getLightProbeGridIrradiance( probeWorldPos, probeWorldNormal );
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,lm=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_CUBE_UV )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		vec3 iblRadiance = getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		vec3 iblRadiance = getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_RETROREFLECTION
		#ifdef USE_ANISOTROPY
			vec3 retroIBLRadiance = getIBLAnisotropyRetroRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
		#else
			vec3 retroIBLRadiance = getIBLRetroRadiance( geometryViewDir, geometryNormal, material.roughness );
		#endif
		iblRadiance = mix( iblRadiance, retroIBLRadiance, saturate( material.retroreflectivity ) );
	#endif
	radiance += iblRadiance;
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,cm=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,um=`#ifdef USE_LIGHT_PROBES_GRID
uniform highp sampler3D probesSH;
uniform vec3 probesMin;
uniform vec3 probesMax;
uniform vec3 probesResolution;
vec3 getLightProbeGridIrradiance( vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 resMinusOne = res - 1.0;
	vec3 probeSpacing = gridRange / resMinusOne;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.0, 1.0 );
	uvw = uvw * resMinusOne / res + 0.5 / res;
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`,hm=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,dm=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,fm=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,pm=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,mm=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,gm=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,_m=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,xm=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Mm=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,vm=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Sm=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,bm=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Em=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,ym=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,wm=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Am=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#ifdef DOUBLE_SIDED
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#ifdef DOUBLE_SIDED
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,Tm=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,Rm=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Cm=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Lm=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,Dm=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,Pm=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Im=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Nm=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Um=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Om=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Fm=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,Bm=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,km=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,zm=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Hm=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Gm=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Vm=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Wm=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		#define SUN_LIGHT_CASCADES 2
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#else
			uniform sampler2D sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#endif
		uniform mat4 sunShadowMatrix[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		uniform vec4 sunShadowCascade[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
		struct SunLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SunLightShadow sunLightShadows[ NUM_SUN_LIGHT_SHADOWS ];
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			shadowCoord.z += shadowBias;
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				float radius = shadowRadius * texelSize.x;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_SUN_LIGHT_SHADOWS > 0
		float getSunShadow(
			#if defined( SHADOWMAP_TYPE_PCF )
				sampler2DShadow shadowMap,
			#else
				sampler2D shadowMap,
			#endif
			SunLightShadow sunLightShadow,
			int shadowIndex
		) {
			vec4 shadowWorldPosition = vec4( vSunShadowWorldPosition.xyz + vSunShadowWorldNormal * sunLightShadow.shadowNormalBias, 1.0 );
			float viewDepth = vSunShadowWorldPosition.w;
			int cascadeOffset = shadowIndex * SUN_LIGHT_CASCADES;
			float shadow = 1.0;
			for ( int i = SUN_LIGHT_CASCADES - 1; i >= 0; i -- ) {
				vec4 cascade = sunShadowCascade[ cascadeOffset + i ];
				if ( viewDepth >= cascade.x && viewDepth < cascade.y ) {
					float cascadeShadow = getShadow(
						shadowMap,
						sunLightShadow.shadowMapSize,
						sunLightShadow.shadowIntensity,
						sunLightShadow.shadowBias,
						sunLightShadow.shadowRadius,
						sunShadowMatrix[ cascadeOffset + i ] * shadowWorldPosition
					);
					shadow = mix( cascadeShadow, shadow, smoothstep( cascade.z, cascade.y, viewDepth ) );
				}
			}
			return shadow;
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float dp = ( shadowCameraNear * ( shadowCameraFar - viewSpaceZ ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp -= shadowBias;
			#else
				float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp += shadowBias;
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			vec2 sample0 = vogelDiskSample( 0, 5, phi );
			vec2 sample1 = vogelDiskSample( 1, 5, phi );
			vec2 sample2 = vogelDiskSample( 2, 5, phi );
			vec2 sample3 = vogelDiskSample( 3, 5, phi );
			vec2 sample4 = vogelDiskSample( 4, 5, phi );
			shadow = (
				texture( shadowMap, vec4( bd3D + ( tangent * sample0.x + bitangent * sample0.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample1.x + bitangent * sample1.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample2.x + bitangent * sample2.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample3.x + bitangent * sample3.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample4.x + bitangent * sample4.y ) * texelSize, dp ) )
			) * 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,Ym=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,Xm=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_SUN_LIGHT_SHADOWS > 0
		vSunShadowWorldPosition = vec4( worldPosition.xyz, - mvPosition.z );
		vSunShadowWorldNormal = shadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,Km=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHT_SHADOWS; i ++ ) {
		sunLight = sunLightShadows[ i ];
		shadow *= receiveShadow ? getSunShadow( sunShadowMap[ i ], sunLight, UNROLLED_LOOP_INDEX ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,qm=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Zm=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,$m=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Jm=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,Qm=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,jm=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,eg=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,tg=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,ng=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,ig=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,rg=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,ag=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,sg=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,og=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const lg=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,cg=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,ug=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,hg=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,dg=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,fg=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,pg=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,mg=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,gg=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,_g=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,xg=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Mg=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,vg=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Sg=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,bg=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,Eg=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,yg=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,wg=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Ag=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,Tg=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Rg=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,Cg=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,Lg=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Dg=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Pg=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,Ig=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_RETROREFLECTION
	uniform float retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Ng=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Ug=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Og=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,Fg=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Bg=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,kg=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,zg=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Hg=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Qe={alphahash_fragment:lp,alphahash_pars_fragment:cp,alphamap_fragment:up,alphamap_pars_fragment:hp,alphatest_fragment:dp,alphatest_pars_fragment:fp,aomap_fragment:pp,aomap_pars_fragment:mp,batching_pars_vertex:gp,batching_vertex:_p,begin_vertex:xp,beginnormal_vertex:Mp,bsdfs:vp,iridescence_fragment:Sp,bumpmap_pars_fragment:bp,clipping_planes_fragment:Ep,clipping_planes_pars_fragment:yp,clipping_planes_pars_vertex:wp,clipping_planes_vertex:Ap,color_fragment:Tp,color_pars_fragment:Rp,color_pars_vertex:Cp,color_vertex:Lp,common:Dp,cube_uv_reflection_fragment:Pp,defaultnormal_vertex:Ip,displacementmap_pars_vertex:Np,displacementmap_vertex:Up,emissivemap_fragment:Op,emissivemap_pars_fragment:Fp,colorspace_fragment:Bp,colorspace_pars_fragment:kp,envmap_fragment:zp,envmap_common_pars_fragment:Hp,envmap_pars_fragment:Gp,envmap_pars_vertex:Vp,envmap_physical_pars_fragment:em,envmap_vertex:Wp,fog_vertex:Yp,fog_pars_vertex:Xp,fog_fragment:Kp,fog_pars_fragment:qp,gradientmap_pars_fragment:Zp,lightmap_pars_fragment:$p,lights_lambert_fragment:Jp,lights_lambert_pars_fragment:Qp,lights_pars_begin:jp,lights_toon_fragment:tm,lights_toon_pars_fragment:nm,lights_phong_fragment:im,lights_phong_pars_fragment:rm,lights_physical_fragment:am,lights_physical_pars_fragment:sm,lights_fragment_begin:om,lights_fragment_maps:lm,lights_fragment_end:cm,lightprobes_pars_fragment:um,logdepthbuf_fragment:hm,logdepthbuf_pars_fragment:dm,logdepthbuf_pars_vertex:fm,logdepthbuf_vertex:pm,map_fragment:mm,map_pars_fragment:gm,map_particle_fragment:_m,map_particle_pars_fragment:xm,metalnessmap_fragment:Mm,metalnessmap_pars_fragment:vm,morphinstance_vertex:Sm,morphcolor_vertex:bm,morphnormal_vertex:Em,morphtarget_pars_vertex:ym,morphtarget_vertex:wm,normal_fragment_begin:Am,normal_fragment_maps:Tm,normal_pars_fragment:Rm,normal_pars_vertex:Cm,normal_vertex:Lm,normalmap_pars_fragment:Dm,clearcoat_normal_fragment_begin:Pm,clearcoat_normal_fragment_maps:Im,clearcoat_pars_fragment:Nm,iridescence_pars_fragment:Um,opaque_fragment:Om,packing:Fm,premultiplied_alpha_fragment:Bm,project_vertex:km,dithering_fragment:zm,dithering_pars_fragment:Hm,roughnessmap_fragment:Gm,roughnessmap_pars_fragment:Vm,shadowmap_pars_fragment:Wm,shadowmap_pars_vertex:Ym,shadowmap_vertex:Xm,shadowmask_pars_fragment:Km,skinbase_vertex:qm,skinning_pars_vertex:Zm,skinning_vertex:$m,skinnormal_vertex:Jm,specularmap_fragment:Qm,specularmap_pars_fragment:jm,tonemapping_fragment:eg,tonemapping_pars_fragment:tg,transmission_fragment:ng,transmission_pars_fragment:ig,uv_pars_fragment:rg,uv_pars_vertex:ag,uv_vertex:sg,worldpos_vertex:og,background_vert:lg,background_frag:cg,backgroundCube_vert:ug,backgroundCube_frag:hg,cube_vert:dg,cube_frag:fg,depth_vert:pg,depth_frag:mg,distance_vert:gg,distance_frag:_g,equirect_vert:xg,equirect_frag:Mg,linedashed_vert:vg,linedashed_frag:Sg,meshbasic_vert:bg,meshbasic_frag:Eg,meshlambert_vert:yg,meshlambert_frag:wg,meshmatcap_vert:Ag,meshmatcap_frag:Tg,meshnormal_vert:Rg,meshnormal_frag:Cg,meshphong_vert:Lg,meshphong_frag:Dg,meshphysical_vert:Pg,meshphysical_frag:Ig,meshtoon_vert:Ng,meshtoon_frag:Ug,points_vert:Og,points_frag:Fg,shadow_vert:Bg,shadow_frag:kg,sprite_vert:zg,sprite_frag:Hg},_e={common:{diffuse:{value:new lt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ge},alphaMap:{value:null},alphaMapTransform:{value:new Ge},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ge}},envmap:{envMap:{value:null},envMapRotation:{value:new Ge},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ge}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ge}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ge},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ge},normalScale:{value:new Ve(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ge},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ge}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ge}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ge}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new lt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new Y},probesMax:{value:new Y},probesResolution:{value:new Y}},points:{diffuse:{value:new lt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ge},alphaTest:{value:0},uvTransform:{value:new Ge}},sprite:{diffuse:{value:new lt(16777215)},opacity:{value:1},center:{value:new Ve(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ge},alphaMap:{value:null},alphaMapTransform:{value:new Ge},alphaTest:{value:0}}},Yn={basic:{uniforms:an([_e.common,_e.specularmap,_e.envmap,_e.aomap,_e.lightmap,_e.fog]),vertexShader:Qe.meshbasic_vert,fragmentShader:Qe.meshbasic_frag},lambert:{uniforms:an([_e.common,_e.specularmap,_e.envmap,_e.aomap,_e.lightmap,_e.emissivemap,_e.bumpmap,_e.normalmap,_e.displacementmap,_e.fog,_e.lights,{emissive:{value:new lt(0)},envMapIntensity:{value:1}}]),vertexShader:Qe.meshlambert_vert,fragmentShader:Qe.meshlambert_frag},phong:{uniforms:an([_e.common,_e.specularmap,_e.envmap,_e.aomap,_e.lightmap,_e.emissivemap,_e.bumpmap,_e.normalmap,_e.displacementmap,_e.fog,_e.lights,{emissive:{value:new lt(0)},specular:{value:new lt(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:Qe.meshphong_vert,fragmentShader:Qe.meshphong_frag},standard:{uniforms:an([_e.common,_e.envmap,_e.aomap,_e.lightmap,_e.emissivemap,_e.bumpmap,_e.normalmap,_e.displacementmap,_e.roughnessmap,_e.metalnessmap,_e.fog,_e.lights,{emissive:{value:new lt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Qe.meshphysical_vert,fragmentShader:Qe.meshphysical_frag},toon:{uniforms:an([_e.common,_e.aomap,_e.lightmap,_e.emissivemap,_e.bumpmap,_e.normalmap,_e.displacementmap,_e.gradientmap,_e.fog,_e.lights,{emissive:{value:new lt(0)}}]),vertexShader:Qe.meshtoon_vert,fragmentShader:Qe.meshtoon_frag},matcap:{uniforms:an([_e.common,_e.bumpmap,_e.normalmap,_e.displacementmap,_e.fog,{matcap:{value:null}}]),vertexShader:Qe.meshmatcap_vert,fragmentShader:Qe.meshmatcap_frag},points:{uniforms:an([_e.points,_e.fog]),vertexShader:Qe.points_vert,fragmentShader:Qe.points_frag},dashed:{uniforms:an([_e.common,_e.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Qe.linedashed_vert,fragmentShader:Qe.linedashed_frag},depth:{uniforms:an([_e.common,_e.displacementmap]),vertexShader:Qe.depth_vert,fragmentShader:Qe.depth_frag},normal:{uniforms:an([_e.common,_e.bumpmap,_e.normalmap,_e.displacementmap,{opacity:{value:1}}]),vertexShader:Qe.meshnormal_vert,fragmentShader:Qe.meshnormal_frag},sprite:{uniforms:an([_e.sprite,_e.fog]),vertexShader:Qe.sprite_vert,fragmentShader:Qe.sprite_frag},background:{uniforms:{uvTransform:{value:new Ge},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Qe.background_vert,fragmentShader:Qe.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Ge}},vertexShader:Qe.backgroundCube_vert,fragmentShader:Qe.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Qe.cube_vert,fragmentShader:Qe.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Qe.equirect_vert,fragmentShader:Qe.equirect_frag},distance:{uniforms:an([_e.common,_e.displacementmap,{referencePosition:{value:new Y},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Qe.distance_vert,fragmentShader:Qe.distance_frag},shadow:{uniforms:an([_e.lights,_e.fog,{color:{value:new lt(0)},opacity:{value:1}}]),vertexShader:Qe.shadow_vert,fragmentShader:Qe.shadow_frag}};Yn.physical={uniforms:an([Yn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ge},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ge},clearcoatNormalScale:{value:new Ve(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ge},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ge},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ge},sheen:{value:0},sheenColor:{value:new lt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ge},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ge},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ge},transmissionSamplerSize:{value:new Ve},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ge},attenuationDistance:{value:0},attenuationColor:{value:new lt(0)},specularColor:{value:new lt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ge},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ge},anisotropyVector:{value:new Ve},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ge}}]),vertexShader:Qe.meshphysical_vert,fragmentShader:Qe.meshphysical_frag};const Fa={r:0,b:0,g:0},Gg=new Ot,zu=new Ge;zu.set(-1,0,0,0,1,0,0,0,1);function Vg(n,e,t,i,r,a){const s=new lt(0);let o=r===!0?0:1,u,c,h=null,f=0,d=null;function p(v){let E=v.isScene===!0?v.background:null;if(E&&E.isTexture){const b=v.backgroundBlurriness>0;E=e.get(E,b)}return E}function _(v){let E=!1;const b=p(v);b===null?g(s,o):b&&b.isColor&&(g(b,1),E=!0);const R=n.xr.getEnvironmentBlendMode();R==="additive"?t.buffers.color.setClear(0,0,0,1,a):R==="alpha-blend"&&t.buffers.color.setClear(0,0,0,0,a),(n.autoClear||E)&&(t.buffers.depth.setTest(!0),t.buffers.depth.setMask(!0),t.buffers.color.setMask(!0),n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil))}function x(v,E){const b=p(E);b&&(b.isCubeTexture||b.mapping===us)?(c===void 0&&(c=new ln(new ca(1,1,1),new nn({name:"BackgroundCubeMaterial",uniforms:Lr(Yn.backgroundCube.uniforms),vertexShader:Yn.backgroundCube.vertexShader,fragmentShader:Yn.backgroundCube.fragmentShader,side:fn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(R,A,D){this.matrixWorld.copyPosition(D.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(c)),c.material.uniforms.envMap.value=b,c.material.uniforms.backgroundBlurriness.value=E.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=E.backgroundIntensity,c.material.uniforms.backgroundRotation.value.setFromMatrix4(Gg.makeRotationFromEuler(E.backgroundRotation)).transpose(),b.isCubeTexture&&b.isRenderTargetTexture===!1&&c.material.uniforms.backgroundRotation.value.premultiply(zu),c.material.toneMapped=tt.getTransfer(b.colorSpace)!==mt,(h!==b||f!==b.version||d!==n.toneMapping)&&(c.material.needsUpdate=!0,h=b,f=b.version,d=n.toneMapping),c.layers.enableAll(),v.unshift(c,c.geometry,c.material,0,0,null)):b&&b.isTexture&&(u===void 0&&(u=new ln(new ti(2,2),new nn({name:"BackgroundMaterial",uniforms:Lr(Yn.background.uniforms),vertexShader:Yn.background.vertexShader,fragmentShader:Yn.background.fragmentShader,side:$i,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),u.geometry.deleteAttribute("normal"),Object.defineProperty(u.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(u)),u.material.uniforms.t2D.value=b,u.material.uniforms.backgroundIntensity.value=E.backgroundIntensity,u.material.toneMapped=tt.getTransfer(b.colorSpace)!==mt,b.matrixAutoUpdate===!0&&b.updateMatrix(),u.material.uniforms.uvTransform.value.copy(b.matrix),(h!==b||f!==b.version||d!==n.toneMapping)&&(u.material.needsUpdate=!0,h=b,f=b.version,d=n.toneMapping),u.layers.enableAll(),v.unshift(u,u.geometry,u.material,0,0,null))}function g(v,E){v.getRGB(Fa,Uu(n)),t.buffers.color.setClear(Fa.r,Fa.g,Fa.b,E,a)}function m(){c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0),u!==void 0&&(u.geometry.dispose(),u.material.dispose(),u=void 0)}return{getClearColor:function(){return s},setClearColor:function(v,E=1){s.set(v),o=E,g(s,o)},getClearAlpha:function(){return o},setClearAlpha:function(v){o=v,g(s,o)},render:_,addToRenderList:x,dispose:m}}function Wg(n,e){const t=n.getParameter(n.MAX_VERTEX_ATTRIBS),i={},r=d(null);let a=r,s=!1;function o(C,F,O,P,B){let W=!1;const $=f(C,P,O,F);a!==$&&(a=$,c(a.object)),W=p(C,P,O,B),W&&_(C,P,O,B),B!==null&&e.update(B,n.ELEMENT_ARRAY_BUFFER),(W||s)&&(s=!1,b(C,F,O,P),B!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,e.get(B).buffer))}function u(){return n.createVertexArray()}function c(C){return n.bindVertexArray(C)}function h(C){return n.deleteVertexArray(C)}function f(C,F,O,P){const B=P.wireframe===!0;let W=i[F.id];W===void 0&&(W={},i[F.id]=W);const $=C.isInstancedMesh===!0?C.id:0;let ae=W[$];ae===void 0&&(ae={},W[$]=ae);let q=ae[O.id];q===void 0&&(q={},ae[O.id]=q);let ee=q[B];return ee===void 0&&(ee=d(u()),q[B]=ee),ee}function d(C){const F=[],O=[],P=[];for(let B=0;B<t;B++)F[B]=0,O[B]=0,P[B]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:F,enabledAttributes:O,attributeDivisors:P,object:C,attributes:{},index:null}}function p(C,F,O,P){const B=a.attributes,W=F.attributes;let $=0;const ae=O.getAttributes();for(const q in ae)if(ae[q].location>=0){const N=B[q];let re=W[q];if(re===void 0&&(q==="instanceMatrix"&&C.instanceMatrix&&(re=C.instanceMatrix),q==="instanceColor"&&C.instanceColor&&(re=C.instanceColor)),N===void 0||N.attribute!==re||re&&N.data!==re.data)return!0;$++}return a.attributesNum!==$||a.index!==P}function _(C,F,O,P){const B={},W=F.attributes;let $=0;const ae=O.getAttributes();for(const q in ae)if(ae[q].location>=0){let N=W[q];N===void 0&&(q==="instanceMatrix"&&C.instanceMatrix&&(N=C.instanceMatrix),q==="instanceColor"&&C.instanceColor&&(N=C.instanceColor));const re={};re.attribute=N,N&&N.data&&(re.data=N.data),B[q]=re,$++}a.attributes=B,a.attributesNum=$,a.index=P}function x(){const C=a.newAttributes;for(let F=0,O=C.length;F<O;F++)C[F]=0}function g(C){m(C,0)}function m(C,F){const O=a.newAttributes,P=a.enabledAttributes,B=a.attributeDivisors;O[C]=1,P[C]===0&&(n.enableVertexAttribArray(C),P[C]=1),B[C]!==F&&(n.vertexAttribDivisor(C,F),B[C]=F)}function v(){const C=a.newAttributes,F=a.enabledAttributes;for(let O=0,P=F.length;O<P;O++)F[O]!==C[O]&&(n.disableVertexAttribArray(O),F[O]=0)}function E(C,F,O,P,B,W,$){$===!0?n.vertexAttribIPointer(C,F,O,B,W):n.vertexAttribPointer(C,F,O,P,B,W)}function b(C,F,O,P){x();const B=P.attributes,W=O.getAttributes(),$=F.defaultAttributeValues;for(const ae in W){const q=W[ae];if(q.location>=0){let ee=B[ae];if(ee===void 0&&(ae==="instanceMatrix"&&C.instanceMatrix&&(ee=C.instanceMatrix),ae==="instanceColor"&&C.instanceColor&&(ee=C.instanceColor)),ee!==void 0){const N=ee.normalized,re=ee.itemSize,ce=e.get(ee);if(ce===void 0)continue;const Re=ce.buffer,Fe=ce.type,ze=ce.bytesPerElement,j=Fe===n.INT||Fe===n.UNSIGNED_INT||ee.gpuType===sl;if(ee.isInterleavedBufferAttribute){const ie=ee.data,G=ie.stride,ue=ee.offset;if(ie.isInstancedInterleavedBuffer){for(let se=0;se<q.locationSize;se++)m(q.location+se,ie.meshPerAttribute);C.isInstancedMesh!==!0&&P._maxInstanceCount===void 0&&(P._maxInstanceCount=ie.meshPerAttribute*ie.count)}else for(let se=0;se<q.locationSize;se++)g(q.location+se);n.bindBuffer(n.ARRAY_BUFFER,Re);for(let se=0;se<q.locationSize;se++)E(q.location+se,re/q.locationSize,Fe,N,G*ze,(ue+re/q.locationSize*se)*ze,j)}else{if(ee.isInstancedBufferAttribute){for(let ie=0;ie<q.locationSize;ie++)m(q.location+ie,ee.meshPerAttribute);C.isInstancedMesh!==!0&&P._maxInstanceCount===void 0&&(P._maxInstanceCount=ee.meshPerAttribute*ee.count)}else for(let ie=0;ie<q.locationSize;ie++)g(q.location+ie);n.bindBuffer(n.ARRAY_BUFFER,Re);for(let ie=0;ie<q.locationSize;ie++)E(q.location+ie,re/q.locationSize,Fe,N,re*ze,re/q.locationSize*ie*ze,j)}}else if($!==void 0){const N=$[ae];if(N!==void 0)switch(N.length){case 2:n.vertexAttrib2fv(q.location,N);break;case 3:n.vertexAttrib3fv(q.location,N);break;case 4:n.vertexAttrib4fv(q.location,N);break;default:n.vertexAttrib1fv(q.location,N)}}}}v()}function R(){T();for(const C in i){const F=i[C];for(const O in F){const P=F[O];for(const B in P){const W=P[B];for(const $ in W)h(W[$].object),delete W[$];delete P[B]}}delete i[C]}}function A(C){if(i[C.id]===void 0)return;const F=i[C.id];for(const O in F){const P=F[O];for(const B in P){const W=P[B];for(const $ in W)h(W[$].object),delete W[$];delete P[B]}}delete i[C.id]}function D(C){for(const F in i){const O=i[F];for(const P in O){const B=O[P];if(B[C.id]===void 0)continue;const W=B[C.id];for(const $ in W)h(W[$].object),delete W[$];delete B[C.id]}}}function S(C){for(const F in i){const O=i[F],P=C.isInstancedMesh===!0?C.id:0,B=O[P];if(B!==void 0){for(const W in B){const $=B[W];for(const ae in $)h($[ae].object),delete $[ae];delete B[W]}delete O[P],Object.keys(O).length===0&&delete i[F]}}}function T(){I(),s=!0,a!==r&&(a=r,c(a.object))}function I(){r.geometry=null,r.program=null,r.wireframe=!1}return{setup:o,reset:T,resetDefaultState:I,dispose:R,releaseStatesOfGeometry:A,releaseStatesOfObject:S,releaseStatesOfProgram:D,initAttributes:x,enableAttribute:g,disableUnusedAttributes:v}}function Yg(n,e,t){let i;function r(u){i=u}function a(u,c){n.drawArrays(i,u,c),t.update(c,i,1)}function s(u,c,h){h!==0&&(n.drawArraysInstanced(i,u,c,h),t.update(c,i,h))}function o(u,c,h){if(h===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,u,0,c,0,h);let d=0;for(let p=0;p<h;p++)d+=c[p];t.update(d,i,1)}this.setMode=r,this.render=a,this.renderInstances=s,this.renderMultiDraw=o}function Xg(n,e,t,i){let r;function a(){if(r!==void 0)return r;if(e.has("EXT_texture_filter_anisotropic")===!0){const D=e.get("EXT_texture_filter_anisotropic");r=n.getParameter(D.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else r=0;return r}function s(D){return!(D!==yn&&i.convert(D)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(D){const S=D===jn&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(D!==_n&&D!==Kn&&!S&&i.convert(D)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_TYPE))}function u(D){if(D==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";D="mediump"}return D==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp";const h=u(c);h!==c&&(He("WebGLRenderer:",c,"not supported, using",h,"instead."),c=h);const f=t.logarithmicDepthBuffer===!0,d=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control");t.reversedDepthBuffer===!0&&d===!1&&He("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");const p=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),_=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),x=n.getParameter(n.MAX_TEXTURE_SIZE),g=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),m=n.getParameter(n.MAX_VERTEX_ATTRIBS),v=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),E=n.getParameter(n.MAX_VARYING_VECTORS),b=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),R=n.getParameter(n.MAX_SAMPLES),A=n.getParameter(n.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:a,getMaxPrecision:u,textureFormatReadable:s,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:f,reversedDepthBuffer:d,maxTextures:p,maxVertexTextures:_,maxTextureSize:x,maxCubemapSize:g,maxAttributes:m,maxVertexUniforms:v,maxVaryings:E,maxFragmentUniforms:b,maxSamples:R,samples:A}}function Kg(n){const e=this;let t=null,i=0,r=!1,a=!1;const s=new Ri,o=new Ge,u={value:null,needsUpdate:!1};this.uniform=u,this.numPlanes=0,this.numIntersection=0,this.init=function(f,d){const p=f.length!==0||d||i!==0||r;return r=d,i=f.length,p},this.beginShadows=function(){a=!0,h(null)},this.endShadows=function(){a=!1},this.setGlobalState=function(f,d){t=h(f,d,0)},this.setState=function(f,d,p){const _=f.clippingPlanes,x=f.clipIntersection,g=f.clipShadows,m=n.get(f);if(!r||_===null||_.length===0||a&&!g)a?h(null):c();else{const v=a?0:i,E=v*4;let b=m.clippingState||null;u.value=b,b=h(_,d,E,p);for(let R=0;R!==E;++R)b[R]=t[R];m.clippingState=b,this.numIntersection=x?this.numPlanes:0,this.numPlanes+=v}};function c(){u.value!==t&&(u.value=t,u.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function h(f,d,p,_){const x=f!==null?f.length:0;let g=null;if(x!==0){if(g=u.value,_!==!0||g===null){const m=p+x*4,v=d.matrixWorldInverse;o.getNormalMatrix(v),(g===null||g.length<m)&&(g=new Float32Array(m));for(let E=0,b=p;E!==x;++E,b+=4)s.copy(f[E]).applyMatrix4(v,o),s.normal.toArray(g,b),g[b+3]=s.constant}u.value=g,u.needsUpdate=!0}return e.numPlanes=x,e.numIntersection=0,g}}const br=4,qg=6,Zg=20,$g=256,Wr=new _l,uc=new lt;let qs=null,Zs=0,$s=0,Js=!1;const Jg=new Y,ki=new Y;class hc{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,i=.1,r=100,a={}){const{size:s=256,position:o=Jg}=a;qs=this._renderer.getRenderTarget(),Zs=this._renderer.getActiveCubeFace(),$s=this._renderer.getActiveMipmapLevel(),Js=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(s);const u=this._allocateTargets();return u.depthBuffer=!0,this._sceneToCubeUV(e,i,r,u,o),t>0&&this._blur(u,0,0,t),this._applyPMREM(u),this._cleanup(u),u}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=pc(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=fc(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(qs,Zs,$s),this._renderer.xr.enabled=Js,e.scissorTest=!1,gr(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===Ji||e.mapping===Cr?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),qs=this._renderer.getRenderTarget(),Zs=this._renderer.getActiveCubeFace(),$s=this._renderer.getActiveMipmapLevel(),Js=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=t||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,i={magFilter:Bt,minFilter:Bt,generateMipmaps:!1,type:jn,format:yn,colorSpace:ia,depthBuffer:!1},r=dc(e,t,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=dc(e,t,i);const{_lodMax:a}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods}=Qg(a)),this._blurMaterial=e1(a,e,t),this._ggxMaterial=jg(a,e,t)}return r}_compileMaterial(e){const t=new ln(new ei,e);this._renderer.compile(t,Wr)}_sceneToCubeUV(e,t,i,r,a){const u=new bn(90,1,t,i),c=[1,-1,1,1,1,1],h=[1,1,1,-1,-1,-1],f=this._renderer,d=f.autoClear,p=f.toneMapping;f.getClearColor(uc),f.toneMapping=Zn,f.autoClear=!1,f.state.buffers.depth.getReversed()&&(f.setRenderTarget(r),f.clearDepth(),f.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new ln(new ca,new Du({name:"PMREM.Background",side:fn,depthWrite:!1,depthTest:!1})));const x=this._backgroundBox,g=x.material;let m=!1;const v=e.background;v?v.isColor&&(g.color.copy(v),e.background=null,m=!0):(g.color.copy(uc),m=!0);for(let E=0;E<6;E++){const b=E%3;b===0?(u.up.set(0,c[E],0),u.position.set(a.x,a.y,a.z),u.lookAt(a.x+h[E],a.y,a.z)):b===1?(u.up.set(0,0,c[E]),u.position.set(a.x,a.y,a.z),u.lookAt(a.x,a.y+h[E],a.z)):(u.up.set(0,c[E],0),u.position.set(a.x,a.y,a.z),u.lookAt(a.x,a.y,a.z+h[E]));const R=this._cubeSize;gr(r,b*R,E>2?R:0,R,R),f.setRenderTarget(r),m&&f.render(x,u),f.render(e,u)}f.toneMapping=p,f.autoClear=d,e.background=v}_textureToCubeUV(e,t){const i=this._renderer,r=e.mapping===Ji||e.mapping===Cr;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=pc()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=fc());const a=r?this._cubemapMaterial:this._equirectMaterial,s=this._lodMeshes[0];s.material=a;const o=a.uniforms;o.envMap.value=e;const u=this._cubeSize;gr(t,0,0,3*u,2*u),i.setRenderTarget(t),i.render(s,Wr)}_applyPMREM(e){const t=this._renderer,i=t.autoClear;t.autoClear=!1;const r=this._lodMeshes.length;for(let a=1;a<r;a++)this._applyGGXFilter(e,a-1,a);t.autoClear=i}_applyGGXFilter(e,t,i){const r=this._renderer,a=this._pingPongRenderTarget,s=this._ggxMaterial,o=this._lodMeshes[i];o.material=s;const u=s.uniforms,c=i/(this._lodMeshes.length-1),h=t/(this._lodMeshes.length-1),f=Math.sqrt(c*c-h*h),d=c*1.25,p=f*d,{_lodMax:_}=this,x=this._sizeLods[i],g=3*x*(i>_-br?i-_+br:0),m=4*(this._cubeSize-x);u.envMap.value=e.texture,u.roughness.value=p,u.mipInt.value=_-t,gr(a,g,m,3*x,2*x),r.setRenderTarget(a),r.render(o,Wr),u.envMap.value=a.texture,u.roughness.value=0,u.mipInt.value=_-i,gr(e,g,m,3*x,2*x),r.setRenderTarget(e),r.render(o,Wr)}_blur(e,t,i,r){const a=this._pingPongRenderTarget,s=Math.min(r,Math.PI)/Math.SQRT2;this._blurPass(e,a,t,i,s),this._blurPass(a,e,i,i,s)}_blurPass(e,t,i,r,a){const s=this._renderer,o=this._blurMaterial,u=this._lodMeshes[r];u.material=o;const c=o.uniforms;c.envMap.value=e.texture,c.sigma.value=a,c.mipInt.value=this._lodMax-i;const h=this._sizeLods[r],f=3*h*(r>this._lodMax-br?r-this._lodMax+br:0),d=4*(this._cubeSize-h);gr(t,f,d,3*h,2*h),s.setRenderTarget(t),s.render(u,Wr)}}function Qg(n){const e=[],t=[];let i=n;const r=n-br+1+qg;for(let a=0;a<r;a++){const s=Math.pow(2,i);e.push(s);const o=1/(s-2),u=-o,c=1+o,h=[u,u,c,u,c,c,u,u,c,c,u,c],f=6,d=6,p=3,_=new Float32Array(p*d*f),x=new Float32Array(p*d*f);for(let m=0;m<f;m++){const v=m%3*2/3-1,E=m>2?0:-1,b=[v,E,0,v+2/3,E,0,v+2/3,E+1,0,v,E,0,v+2/3,E+1,0,v,E+1,0];_.set(b,p*d*m);for(let R=0;R<d;R++){const A=h[R*2]*2-1,D=h[R*2+1]*2-1;m===0?ki.set(1,D,A):m===1?ki.set(-A,1,-D):m===2?ki.set(-A,D,1):m===3?ki.set(-1,D,-A):m===4?ki.set(-A,-1,D):ki.set(A,D,-1),ki.toArray(x,(m*d+R)*p)}}const g=new ei;g.setAttribute("position",new $n(_,p)),g.setAttribute("outputDirection",new $n(x,p)),t.push(new ln(g,null)),i>br&&i--}return{lodMeshes:t,sizeLods:e}}function dc(n,e,t){const i=new wn(n,e,t);return i.texture.mapping=us,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function gr(n,e,t,i,r){n.viewport.set(e,t,i,r),n.scissor.set(e,t,i,r)}function jg(n,e,t){return new nn({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:$g,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:ds(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float roughness;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359

			// Van der Corput radical inverse
			float radicalInverse_VdC(uint bits) {
				bits = (bits << 16u) | (bits >> 16u);
				bits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);
				bits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);
				bits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);
				bits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);
				return float(bits) * 2.3283064365386963e-10; // / 0x100000000
			}

			// Hammersley sequence
			vec2 hammersley(uint i, uint N) {
				return vec2(float(i) / float(N), radicalInverse_VdC(i));
			}

			// GGX VNDF importance sampling (Eric Heitz 2018)
			// "Sampling the GGX Distribution of Visible Normals"
			// https://jcgt.org/published/0007/04/01/
			vec3 importanceSampleGGX_VNDF(vec2 Xi, vec3 V, float roughness) {
				float alpha = roughness * roughness;

				// Section 4.1: Orthonormal basis
				vec3 T1 = vec3(1.0, 0.0, 0.0);
				vec3 T2 = cross(V, T1);

				// Section 4.2: Parameterization of projected area
				float r = sqrt(Xi.x);
				float phi = 2.0 * PI * Xi.y;
				float t1 = r * cos(phi);
				float t2 = r * sin(phi);
				float s = 0.5 * (1.0 + V.z);
				t2 = (1.0 - s) * sqrt(1.0 - t1 * t1) + s * t2;

				// Section 4.3: Reprojection onto hemisphere
				vec3 Nh = t1 * T1 + t2 * T2 + sqrt(max(0.0, 1.0 - t1 * t1 - t2 * t2)) * V;

				// Section 3.4: Transform back to ellipsoid configuration
				return normalize(vec3(alpha * Nh.x, alpha * Nh.y, max(0.0, Nh.z)));
			}

			void main() {
				vec3 N = normalize(vOutputDirection);
				vec3 V = N; // Assume view direction equals normal for pre-filtering

				vec3 prefilteredColor = vec3(0.0);
				float totalWeight = 0.0;

				// For very low roughness, just sample the environment directly
				if (roughness < 0.001) {
					gl_FragColor = vec4(bilinearCubeUV(envMap, N, mipInt), 1.0);
					return;
				}

				// Tangent space basis for VNDF sampling
				vec3 up = abs(N.z) < 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);
				vec3 tangent = normalize(cross(up, N));
				vec3 bitangent = cross(N, tangent);

				for(uint i = 0u; i < uint(GGX_SAMPLES); i++) {
					vec2 Xi = hammersley(i, uint(GGX_SAMPLES));

					// For PMREM, V = N, so in tangent space V is always (0, 0, 1)
					vec3 H_tangent = importanceSampleGGX_VNDF(Xi, vec3(0.0, 0.0, 1.0), roughness);

					// Transform H back to world space
					vec3 H = normalize(tangent * H_tangent.x + bitangent * H_tangent.y + N * H_tangent.z);
					vec3 L = normalize(2.0 * dot(V, H) * H - V);

					float NdotL = max(dot(N, L), 0.0);

					if(NdotL > 0.0) {
						// Sample environment at fixed mip level
						// VNDF importance sampling handles the distribution filtering
						vec3 sampleColor = bilinearCubeUV(envMap, L, mipInt);

						// Weight by NdotL for the split-sum approximation
						// VNDF PDF naturally accounts for the visible microfacet distribution
						prefilteredColor += sampleColor * NdotL;
						totalWeight += NdotL;
					}
				}

				if (totalWeight > 0.0) {
					prefilteredColor = prefilteredColor / totalWeight;
				}

				gl_FragColor = vec4(prefilteredColor, 1.0);
			}
		`,blending:pi,depthTest:!1,depthWrite:!1})}function e1(n,e,t){return new nn({name:"SphericalGaussianBlur",defines:{SAMPLES:Zg,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},sigma:{value:0},mipInt:{value:0}},vertexShader:ds(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float sigma;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359
			#define GOLDEN_ANGLE 2.39996322973

			void main() {

				if ( sigma == 0.0 ) {

					gl_FragColor = vec4( bilinearCubeUV( envMap, vOutputDirection, mipInt ), 1.0 );
					return;

				}

				vec3 outputDirection = normalize( vOutputDirection );

				vec3 up = abs( outputDirection.z ) < 0.999 ? vec3( 0.0, 0.0, 1.0 ) : vec3( 1.0, 0.0, 0.0 );
				vec3 tangent = normalize( cross( up, outputDirection ) );
				vec3 bitangent = cross( outputDirection, tangent );

				// Truncate the kernel at three standard deviations or at the antipode.
				float thetaMax = min( 3.0 * sigma, PI );
				float truncation = 1.0 - exp( - 0.5 * thetaMax * thetaMax / ( sigma * sigma ) );

				vec3 accumColor = vec3( 0.0 );
				float accumWeight = 0.0;

				for ( int i = 0; i < SAMPLES; i ++ ) {

					// Stratified inverse-CDF sampling of the Gaussian, placed on a golden-angle spiral.
					float stratum = ( float( i ) + 0.5 ) / float( SAMPLES );
					float theta = sigma * sqrt( - 2.0 * log( 1.0 - stratum * truncation ) );
					float phi = float( i ) * GOLDEN_ANGLE;

					vec3 offset = cos( phi ) * tangent + sin( phi ) * bitangent;
					vec3 sampleDirection = cos( theta ) * outputDirection + sin( theta ) * offset;

					// Correct the planar sample density to solid angle.
					float weight = sin( theta ) / theta;

					accumColor += weight * bilinearCubeUV( envMap, sampleDirection, mipInt );
					accumWeight += weight;

				}

				gl_FragColor = vec4( accumColor / accumWeight, 1.0 );

			}
		`,blending:pi,depthTest:!1,depthWrite:!1})}function fc(){return new nn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:ds(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:pi,depthTest:!1,depthWrite:!1})}function pc(){return new nn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:ds(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:pi,depthTest:!1,depthWrite:!1})}function ds(){return`

		precision mediump float;
		precision mediump int;

		attribute vec3 outputDirection;

		varying vec3 vOutputDirection;

		void main() {

			vOutputDirection = outputDirection;
			gl_Position = vec4( position, 1.0 );

		}
	`}class Hu extends wn{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const i={width:e,height:e,depth:1},r=[i,i,i,i,i,i];this.texture=new Iu(r),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},r=new ca(5,5,5),a=new nn({name:"CubemapFromEquirect",uniforms:Lr(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:fn,blending:pi});a.uniforms.tEquirect.value=t;const s=new ln(r,a),o=t.minFilter;return t.minFilter===Wi&&(t.minFilter=Bt),new rp(1,10,this).update(e,s),t.minFilter=o,s.geometry.dispose(),s.material.dispose(),this}clear(e,t=!0,i=!0,r=!0){const a=e.getRenderTarget();for(let s=0;s<6;s++)e.setRenderTarget(this,s),e.clear(t,i,r);e.setRenderTarget(a)}}function t1(n){let e=new WeakMap,t=new WeakMap,i=null;function r(d,p=!1){return d==null?null:p?s(d):a(d)}function a(d){if(d&&d.isTexture){const p=d.mapping;if(p===bs||p===Es)if(e.has(d)){const _=e.get(d).texture;return o(_,d.mapping)}else{const _=d.image;if(_&&_.height>0){const x=new Hu(_.height);return x.fromEquirectangularTexture(n,d),e.set(d,x),d.addEventListener("dispose",c),o(x.texture,d.mapping)}else return null}}return d}function s(d){if(d&&d.isTexture){const p=d.mapping,_=p===bs||p===Es,x=p===Ji||p===Cr;if(_||x){let g=t.get(d);const m=g!==void 0?g.texture.pmremVersion:0;if(d.isRenderTargetTexture&&d.pmremVersion!==m)return i===null&&(i=new hc(n)),g=_?i.fromEquirectangular(d,g):i.fromCubemap(d,g),g.texture.pmremVersion=d.pmremVersion,t.set(d,g),g.texture;if(g!==void 0)return g.texture;{const v=d.image;return _&&v&&v.height>0||x&&v&&u(v)?(i===null&&(i=new hc(n)),g=_?i.fromEquirectangular(d):i.fromCubemap(d),g.texture.pmremVersion=d.pmremVersion,t.set(d,g),d.addEventListener("dispose",h),g.texture):null}}}return d}function o(d,p){return p===bs?d.mapping=Ji:p===Es&&(d.mapping=Cr),d}function u(d){let p=0;const _=6;for(let x=0;x<_;x++)d[x]!==void 0&&p++;return p===_}function c(d){const p=d.target;p.removeEventListener("dispose",c);const _=e.get(p);_!==void 0&&(e.delete(p),_.dispose())}function h(d){const p=d.target;p.removeEventListener("dispose",h);const _=t.get(p);_!==void 0&&(t.delete(p),_.dispose())}function f(){e=new WeakMap,t=new WeakMap,i!==null&&(i.dispose(),i=null)}return{get:r,dispose:f}}function n1(n){const e={};function t(i){if(e[i]!==void 0)return e[i];const r=n.getExtension(i);return e[i]=r,r}return{has:function(i){return t(i)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(i){const r=t(i);return r===null&&yr("WebGLRenderer: "+i+" extension not supported."),r}}}function i1(n,e,t,i){const r={},a=new WeakMap;function s(f){const d=f.target;d.index!==null&&e.remove(d.index);for(const _ in d.attributes)e.remove(d.attributes[_]);d.removeEventListener("dispose",s),delete r[d.id];const p=a.get(d);p&&(e.remove(p),a.delete(d)),i.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,t.memory.geometries--}function o(f,d){return r[d.id]===!0||(d.addEventListener("dispose",s),r[d.id]=!0,t.memory.geometries++),d}function u(f){const d=f.attributes;for(const p in d)e.update(d[p],n.ARRAY_BUFFER)}function c(f){const d=[],p=f.index,_=f.attributes.position;let x=0;if(_===void 0)return;if(p!==null){const v=p.array;x=p.version;for(let E=0,b=v.length;E<b;E+=3){const R=v[E+0],A=v[E+1],D=v[E+2];d.push(R,A,A,D,D,R)}}else{const v=_.array;x=_.version;for(let E=0,b=v.length/3-1;E<b;E+=3){const R=E+0,A=E+1,D=E+2;d.push(R,A,A,D,D,R)}}const g=new(_.count>=65535?Lu:Cu)(d,1);g.version=x;const m=a.get(f);m&&e.remove(m),a.set(f,g)}function h(f){const d=a.get(f);if(d){const p=f.index;p!==null&&d.version<p.version&&c(f)}else c(f);return a.get(f)}return{get:o,update:u,getWireframeAttribute:h}}function r1(n,e,t){let i;function r(f){i=f}let a,s;function o(f){a=f.type,s=f.bytesPerElement}function u(f,d){n.drawElements(i,d,a,f*s),t.update(d,i,1)}function c(f,d,p){p!==0&&(n.drawElementsInstanced(i,d,a,f*s,p),t.update(d,i,p))}function h(f,d,p){if(p===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,d,0,a,f,0,p);let x=0;for(let g=0;g<p;g++)x+=d[g];t.update(x,i,1)}this.setMode=r,this.setIndex=o,this.render=u,this.renderInstances=c,this.renderMultiDraw=h}function a1(n){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function i(a,s,o){switch(t.calls++,s){case n.TRIANGLES:t.triangles+=o*(a/3);break;case n.LINES:t.lines+=o*(a/2);break;case n.LINE_STRIP:t.lines+=o*(a-1);break;case n.LINE_LOOP:t.lines+=o*a;break;case n.POINTS:t.points+=o*a;break;default:at("WebGLInfo: Unknown draw mode:",s);break}}function r(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:r,update:i}}function s1(n,e,t){const i=new WeakMap,r=new Lt;function a(s,o,u){const c=s.morphTargetInfluences,h=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,f=h!==void 0?h.length:0;let d=i.get(o);if(d===void 0||d.count!==f){let T=function(){D.dispose(),i.delete(o),o.removeEventListener("dispose",T)};d!==void 0&&d.texture.dispose();const p=o.morphAttributes.position!==void 0,_=o.morphAttributes.normal!==void 0,x=o.morphAttributes.color!==void 0,g=o.morphAttributes.position||[],m=o.morphAttributes.normal||[],v=o.morphAttributes.color||[];let E=0;p===!0&&(E=1),_===!0&&(E=2),x===!0&&(E=3);let b=o.attributes.position.count*E,R=1;b>e.maxTextureSize&&(R=Math.ceil(b/e.maxTextureSize),b=e.maxTextureSize);const A=new Float32Array(b*R*4*f),D=new Au(A,b,R,f);D.type=Kn,D.needsUpdate=!0;const S=E*4;for(let I=0;I<f;I++){const C=g[I],F=m[I],O=v[I],P=b*R*4*I;for(let B=0;B<C.count;B++){const W=B*S;p===!0&&(r.fromBufferAttribute(C,B),A[P+W+0]=r.x,A[P+W+1]=r.y,A[P+W+2]=r.z,A[P+W+3]=0),_===!0&&(r.fromBufferAttribute(F,B),A[P+W+4]=r.x,A[P+W+5]=r.y,A[P+W+6]=r.z,A[P+W+7]=0),x===!0&&(r.fromBufferAttribute(O,B),A[P+W+8]=r.x,A[P+W+9]=r.y,A[P+W+10]=r.z,A[P+W+11]=O.itemSize===4?r.w:1)}}d={count:f,texture:D,size:new Ve(b,R)},i.set(o,d),o.addEventListener("dispose",T)}if(s.isInstancedMesh===!0&&s.morphTexture!==null)u.getUniforms().setValue(n,"morphTexture",s.morphTexture,t);else{let p=0;for(let x=0;x<c.length;x++)p+=c[x];const _=o.morphTargetsRelative?1:1-p;u.getUniforms().setValue(n,"morphTargetBaseInfluence",_),u.getUniforms().setValue(n,"morphTargetInfluences",c)}u.getUniforms().setValue(n,"morphTargetsTexture",d.texture,t),u.getUniforms().setValue(n,"morphTargetsTextureSize",d.size)}return{update:a}}function o1(n,e,t,i,r){let a=new WeakMap;function s(c){const h=r.render.frame,f=c.geometry,d=e.get(c,f);if(a.get(d)!==h&&(e.update(d),a.set(d,h)),c.isInstancedMesh&&(c.hasEventListener("dispose",u)===!1&&c.addEventListener("dispose",u),a.get(c)!==h&&(t.update(c.instanceMatrix,n.ARRAY_BUFFER),c.instanceColor!==null&&t.update(c.instanceColor,n.ARRAY_BUFFER),a.set(c,h))),c.isSkinnedMesh){const p=c.skeleton;a.get(p)!==h&&(p.update(),a.set(p,h))}return d}function o(){a=new WeakMap}function u(c){const h=c.target;h.removeEventListener("dispose",u),i.releaseStatesOfObject(h),t.remove(h.instanceMatrix),h.instanceColor!==null&&t.remove(h.instanceColor)}return{update:s,dispose:o}}const l1={[cu]:"LINEAR_TONE_MAPPING",[uu]:"REINHARD_TONE_MAPPING",[hu]:"CINEON_TONE_MAPPING",[du]:"ACES_FILMIC_TONE_MAPPING",[pu]:"AGX_TONE_MAPPING",[mu]:"NEUTRAL_TONE_MAPPING",[fu]:"CUSTOM_TONE_MAPPING"};function c1(n,e,t,i,r,a){const s=new wn(e,t,{type:n,depthBuffer:r,stencilBuffer:a,samples:i?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1});let o=null,u=null;const c=new ei;c.setAttribute("position",new gi([-1,3,0,-1,-1,0,3,-1,0],3)),c.setAttribute("uv",new gi([0,2,0,0,2,0],2));const h=new tp({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),f=new ln(c,h),d=new _l(-1,1,1,-1,0,1);let p=null,_=null,x=!1,g,m=null,v=[],E=!1;this.setSize=function(b,R){s.setSize(b,R),o!==null&&o.setSize(b,R),u!==null&&u.setSize(b,R);for(let A=0;A<v.length;A++){const D=v[A];D.setSize&&D.setSize(b,R)}},this.setEffects=function(b){v=b,E=v.length>0&&v[0].isRenderPass===!0;const R=s.width,A=s.height;v.length>0&&o===null&&(o=new wn(R,A,{type:jn,depthBuffer:!1,stencilBuffer:!1}),u=new wn(R,A,{type:jn,depthBuffer:!1,stencilBuffer:!1}));for(let D=0;D<v.length;D++){const S=v[D];S.setSize&&S.setSize(R,A)}},this.begin=function(b,R){if(x||b.toneMapping===Zn&&v.length===0)return!1;if(m=R,R!==null){const A=R.width,D=R.height;(s.width!==A||s.height!==D)&&this.setSize(A,D)}return E===!1&&b.setRenderTarget(s),g=b.toneMapping,b.toneMapping=Zn,!0},this.hasRenderPass=function(){return E},this.end=function(b,R){b.toneMapping=g,x=!0;let A=s,D=o;for(let S=0;S<v.length;S++){const T=v[S];T.enabled!==!1&&(T.render(b,D,A,R),T.needsSwap!==!1&&(A=D,D=D===o?u:o))}if(p!==b.outputColorSpace||_!==b.toneMapping){p=b.outputColorSpace,_=b.toneMapping,h.defines={},tt.getTransfer(p)===mt&&(h.defines.SRGB_TRANSFER="");const S=l1[_];S&&(h.defines[S]=""),h.needsUpdate=!0}h.uniforms.tDiffuse.value=A.texture,b.setRenderTarget(m),b.render(f,d),m=null,x=!1},this.isCompositing=function(){return x},this.dispose=function(){s.dispose(),o!==null&&o.dispose(),u!==null&&u.dispose(),c.dispose(),h.dispose()}}const Gu=new sn,Yo=new ra(1,1),Vu=new Au,Wu=new P0,Yu=new Iu,mc=[],gc=[],_c=new Float32Array(16),xc=new Float32Array(9),Mc=new Float32Array(4);function Ur(n,e,t){const i=n[0];if(i<=0||i>0)return n;const r=e*t;let a=mc[r];if(a===void 0&&(a=new Float32Array(r),mc[r]=a),e!==0){i.toArray(a,0);for(let s=1,o=0;s!==e;++s)o+=t,n[s].toArray(a,o)}return a}function Vt(n,e){if(n.length!==e.length)return!1;for(let t=0,i=n.length;t<i;t++)if(n[t]!==e[t])return!1;return!0}function Wt(n,e){for(let t=0,i=e.length;t<i;t++)n[t]=e[t]}function fs(n,e){let t=gc[e];t===void 0&&(t=new Int32Array(e),gc[e]=t);for(let i=0;i!==e;++i)t[i]=n.allocateTextureUnit();return t}function u1(n,e){const t=this.cache;t[0]!==e&&(n.uniform1f(this.addr,e),t[0]=e)}function h1(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Vt(t,e))return;n.uniform2fv(this.addr,e),Wt(t,e)}}function d1(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(n.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Vt(t,e))return;n.uniform3fv(this.addr,e),Wt(t,e)}}function f1(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Vt(t,e))return;n.uniform4fv(this.addr,e),Wt(t,e)}}function p1(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(Vt(t,e))return;n.uniformMatrix2fv(this.addr,!1,e),Wt(t,e)}else{if(Vt(t,i))return;Mc.set(i),n.uniformMatrix2fv(this.addr,!1,Mc),Wt(t,i)}}function m1(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(Vt(t,e))return;n.uniformMatrix3fv(this.addr,!1,e),Wt(t,e)}else{if(Vt(t,i))return;xc.set(i),n.uniformMatrix3fv(this.addr,!1,xc),Wt(t,i)}}function g1(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(Vt(t,e))return;n.uniformMatrix4fv(this.addr,!1,e),Wt(t,e)}else{if(Vt(t,i))return;_c.set(i),n.uniformMatrix4fv(this.addr,!1,_c),Wt(t,i)}}function _1(n,e){const t=this.cache;t[0]!==e&&(n.uniform1i(this.addr,e),t[0]=e)}function x1(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Vt(t,e))return;n.uniform2iv(this.addr,e),Wt(t,e)}}function M1(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Vt(t,e))return;n.uniform3iv(this.addr,e),Wt(t,e)}}function v1(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Vt(t,e))return;n.uniform4iv(this.addr,e),Wt(t,e)}}function S1(n,e){const t=this.cache;t[0]!==e&&(n.uniform1ui(this.addr,e),t[0]=e)}function b1(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Vt(t,e))return;n.uniform2uiv(this.addr,e),Wt(t,e)}}function E1(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Vt(t,e))return;n.uniform3uiv(this.addr,e),Wt(t,e)}}function y1(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Vt(t,e))return;n.uniform4uiv(this.addr,e),Wt(t,e)}}function w1(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r);let a;this.type===n.SAMPLER_2D_SHADOW?(Yo.compareFunction=t.isReversedDepthBuffer()?fl:dl,a=Yo):a=Gu,t.setTexture2D(e||a,r)}function A1(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTexture3D(e||Wu,r)}function T1(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTextureCube(e||Yu,r)}function R1(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTexture2DArray(e||Vu,r)}function C1(n){switch(n){case 5126:return u1;case 35664:return h1;case 35665:return d1;case 35666:return f1;case 35674:return p1;case 35675:return m1;case 35676:return g1;case 5124:case 35670:return _1;case 35667:case 35671:return x1;case 35668:case 35672:return M1;case 35669:case 35673:return v1;case 5125:return S1;case 36294:return b1;case 36295:return E1;case 36296:return y1;case 35678:case 36198:case 36298:case 36306:case 35682:return w1;case 35679:case 36299:case 36307:return A1;case 35680:case 36300:case 36308:case 36293:return T1;case 36289:case 36303:case 36311:case 36292:return R1}}function L1(n,e){n.uniform1fv(this.addr,e)}function D1(n,e){const t=Ur(e,this.size,2);n.uniform2fv(this.addr,t)}function P1(n,e){const t=Ur(e,this.size,3);n.uniform3fv(this.addr,t)}function I1(n,e){const t=Ur(e,this.size,4);n.uniform4fv(this.addr,t)}function N1(n,e){const t=Ur(e,this.size,4);n.uniformMatrix2fv(this.addr,!1,t)}function U1(n,e){const t=Ur(e,this.size,9);n.uniformMatrix3fv(this.addr,!1,t)}function O1(n,e){const t=Ur(e,this.size,16);n.uniformMatrix4fv(this.addr,!1,t)}function F1(n,e){n.uniform1iv(this.addr,e)}function B1(n,e){n.uniform2iv(this.addr,e)}function k1(n,e){n.uniform3iv(this.addr,e)}function z1(n,e){n.uniform4iv(this.addr,e)}function H1(n,e){n.uniform1uiv(this.addr,e)}function G1(n,e){n.uniform2uiv(this.addr,e)}function V1(n,e){n.uniform3uiv(this.addr,e)}function W1(n,e){n.uniform4uiv(this.addr,e)}function Y1(n,e,t){const i=this.cache,r=e.length,a=fs(t,r);Vt(i,a)||(n.uniform1iv(this.addr,a),Wt(i,a));let s;this.type===n.SAMPLER_2D_SHADOW?s=Yo:s=Gu;for(let o=0;o!==r;++o)t.setTexture2D(e[o]||s,a[o])}function X1(n,e,t){const i=this.cache,r=e.length,a=fs(t,r);Vt(i,a)||(n.uniform1iv(this.addr,a),Wt(i,a));for(let s=0;s!==r;++s)t.setTexture3D(e[s]||Wu,a[s])}function K1(n,e,t){const i=this.cache,r=e.length,a=fs(t,r);Vt(i,a)||(n.uniform1iv(this.addr,a),Wt(i,a));for(let s=0;s!==r;++s)t.setTextureCube(e[s]||Yu,a[s])}function q1(n,e,t){const i=this.cache,r=e.length,a=fs(t,r);Vt(i,a)||(n.uniform1iv(this.addr,a),Wt(i,a));for(let s=0;s!==r;++s)t.setTexture2DArray(e[s]||Vu,a[s])}function Z1(n){switch(n){case 5126:return L1;case 35664:return D1;case 35665:return P1;case 35666:return I1;case 35674:return N1;case 35675:return U1;case 35676:return O1;case 5124:case 35670:return F1;case 35667:case 35671:return B1;case 35668:case 35672:return k1;case 35669:case 35673:return z1;case 5125:return H1;case 36294:return G1;case 36295:return V1;case 36296:return W1;case 35678:case 36198:case 36298:case 36306:case 35682:return Y1;case 35679:case 36299:case 36307:return X1;case 35680:case 36300:case 36308:case 36293:return K1;case 36289:case 36303:case 36311:case 36292:return q1}}class $1{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.setValue=C1(t.type)}}class J1{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=Z1(t.type)}}class Q1{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,i){const r=this.seq;for(let a=0,s=r.length;a!==s;++a){const o=r[a];o.setValue(e,t[o.id],i)}}}const Qs=/(\w+)(\])?(\[|\.)?/g;function vc(n,e){n.seq.push(e),n.map[e.id]=e}function j1(n,e,t){const i=n.name,r=i.length;for(Qs.lastIndex=0;;){const a=Qs.exec(i),s=Qs.lastIndex;let o=a[1];const u=a[2]==="]",c=a[3];if(u&&(o=o|0),c===void 0||c==="["&&s+2===r){vc(t,c===void 0?new $1(o,n,e):new J1(o,n,e));break}else{let f=t.map[o];f===void 0&&(f=new Q1(o),vc(t,f)),t=f}}}class Ja{constructor(e,t){this.seq=[],this.map={};const i=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let s=0;s<i;++s){const o=e.getActiveUniform(t,s),u=e.getUniformLocation(t,o.name);j1(o,u,this)}const r=[],a=[];for(const s of this.seq)s.type===e.SAMPLER_2D_SHADOW||s.type===e.SAMPLER_CUBE_SHADOW||s.type===e.SAMPLER_2D_ARRAY_SHADOW?r.push(s):a.push(s);r.length>0&&(this.seq=r.concat(a))}setValue(e,t,i,r){const a=this.map[t];a!==void 0&&a.setValue(e,i,r)}setOptional(e,t,i){const r=t[i];r!==void 0&&this.setValue(e,i,r)}static upload(e,t,i,r){for(let a=0,s=t.length;a!==s;++a){const o=t[a],u=i[o.id];u.needsUpdate!==!1&&o.setValue(e,u.value,r)}}static seqWithValue(e,t){const i=[];for(let r=0,a=e.length;r!==a;++r){const s=e[r];s.id in t&&i.push(s)}return i}}function Sc(n,e,t){const i=n.createShader(e);return n.shaderSource(i,t),n.compileShader(i),i}const e2=37297;let t2=0;function n2(n,e){const t=n.split(`
`),i=[],r=Math.max(e-6,0),a=Math.min(e+6,t.length);for(let s=r;s<a;s++){const o=s+1;i.push(`${o===e?">":" "} ${o}: ${t[s]}`)}return i.join(`
`)}const bc=new Ge;function i2(n){tt._getMatrix(bc,tt.workingColorSpace,n);const e=`mat3( ${bc.elements.map(t=>t.toFixed(4))} )`;switch(tt.getTransfer(n)){case ts:return[e,"LinearTransferOETF"];case mt:return[e,"sRGBTransferOETF"];default:return He("WebGLProgram: Unsupported color space: ",n),[e,"LinearTransferOETF"]}}function Ec(n,e,t){const i=n.getShaderParameter(e,n.COMPILE_STATUS),a=(n.getShaderInfoLog(e)||"").trim();if(i&&a==="")return"";const s=/ERROR: 0:(\d+)/.exec(a);if(s){const o=parseInt(s[1]);return t.toUpperCase()+`

`+a+`

`+n2(n.getShaderSource(e),o)}else return a}function r2(n,e){const t=i2(e);return[`vec4 ${n}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}const a2={[cu]:"Linear",[uu]:"Reinhard",[hu]:"Cineon",[du]:"ACESFilmic",[pu]:"AgX",[mu]:"Neutral",[fu]:"Custom"};function s2(n,e){const t=a2[e];return t===void 0?(He("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+n+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+n+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const Ba=new Y;function o2(){tt.getLuminanceCoefficients(Ba);const n=Ba.x.toFixed(4),e=Ba.y.toFixed(4),t=Ba.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${n}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function l2(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",n.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Zr).join(`
`)}function c2(n){const e=[];for(const t in n){const i=n[t];i!==!1&&e.push("#define "+t+" "+i)}return e.join(`
`)}function u2(n,e){const t={},i=n.getProgramParameter(e,n.ACTIVE_ATTRIBUTES);for(let r=0;r<i;r++){const a=n.getActiveAttrib(e,r),s=a.name;let o=1;a.type===n.FLOAT_MAT2&&(o=2),a.type===n.FLOAT_MAT3&&(o=3),a.type===n.FLOAT_MAT4&&(o=4),t[s]={type:a.type,location:n.getAttribLocation(e,s),locationSize:o}}return t}function Zr(n){return n!==""}function yc(n,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return n.replace(/NUM_SUN_LIGHTS/g,e.numSunLights).replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,e.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function wc(n,e){return n.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const h2=/^[ \t]*#include +<([\w\d./]+)>/gm;function Xo(n){return n.replace(h2,f2)}const d2=new Map;function f2(n,e){let t=Qe[e];if(t===void 0){const i=d2.get(e);if(i!==void 0)t=Qe[i],He('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,i);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+e+">")}return Xo(t)}const p2=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Ac(n){return n.replace(p2,m2)}function m2(n,e,t,i){let r="";for(let a=parseInt(e);a<parseInt(t);a++)r+=i.replace(/\[\s*i\s*\]/g,"[ "+a+" ]").replace(/UNROLLED_LOOP_INDEX/g,a);return r}function Tc(n){let e=`precision ${n.precision} float;
	precision ${n.precision} int;
	precision ${n.precision} sampler2D;
	precision ${n.precision} samplerCube;
	precision ${n.precision} sampler3D;
	precision ${n.precision} sampler2DArray;
	precision ${n.precision} sampler2DShadow;
	precision ${n.precision} samplerCubeShadow;
	precision ${n.precision} sampler2DArrayShadow;
	precision ${n.precision} isampler2D;
	precision ${n.precision} isampler3D;
	precision ${n.precision} isamplerCube;
	precision ${n.precision} isampler2DArray;
	precision ${n.precision} usampler2D;
	precision ${n.precision} usampler3D;
	precision ${n.precision} usamplerCube;
	precision ${n.precision} usampler2DArray;
	`;return n.precision==="highp"?e+=`
#define HIGH_PRECISION`:n.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:n.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}const g2={[Xa]:"SHADOWMAP_TYPE_PCF",[qr]:"SHADOWMAP_TYPE_VSM"};function _2(n){return g2[n.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const x2={[Ji]:"ENVMAP_TYPE_CUBE",[Cr]:"ENVMAP_TYPE_CUBE",[us]:"ENVMAP_TYPE_CUBE_UV"};function M2(n){return n.envMap===!1?"ENVMAP_TYPE_CUBE":x2[n.envMapMode]||"ENVMAP_TYPE_CUBE"}const v2={[Cr]:"ENVMAP_MODE_REFRACTION"};function S2(n){return n.envMap===!1?"ENVMAP_MODE_REFLECTION":v2[n.envMapMode]||"ENVMAP_MODE_REFLECTION"}const b2={[lu]:"ENVMAP_BLENDING_MULTIPLY",[c0]:"ENVMAP_BLENDING_MIX",[u0]:"ENVMAP_BLENDING_ADD"};function E2(n){return n.envMap===!1?"ENVMAP_BLENDING_NONE":b2[n.combine]||"ENVMAP_BLENDING_NONE"}function y2(n){const e=n.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,i=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:i,maxMip:t}}function w2(n,e,t,i){const r=n.getContext(),a=t.defines;let s=t.vertexShader,o=t.fragmentShader;const u=_2(t),c=M2(t),h=S2(t),f=E2(t),d=y2(t),p=l2(t),_=c2(a),x=r.createProgram();let g,m,v=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(g=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_].filter(Zr).join(`
`),g.length>0&&(g+=`
`),m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_].filter(Zr).join(`
`),m.length>0&&(m+=`
`)):(g=[Tc(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexNormals?"#define HAS_NORMAL":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+u:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Zr).join(`
`),m=[Tc(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+h:"",t.envMap?"#define "+f:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.retroreflection?"#define USE_RETROREFLECTION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas||t.batchingColor?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+u:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Zn?"#define TONE_MAPPING":"",t.toneMapping!==Zn?Qe.tonemapping_pars_fragment:"",t.toneMapping!==Zn?s2("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Qe.colorspace_pars_fragment,r2("linearToOutputTexel",t.outputColorSpace),o2(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Zr).join(`
`)),s=Xo(s),s=yc(s,t),s=wc(s,t),o=Xo(o),o=yc(o,t),o=wc(o,t),s=Ac(s),o=Ac(o),t.isRawShaderMaterial!==!0&&(v=`#version 300 es
`,g=[p,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+g,m=["#define varying in",t.glslVersion===Vl?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Vl?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+m);const E=v+g+s,b=v+m+o,R=Sc(r,r.VERTEX_SHADER,E),A=Sc(r,r.FRAGMENT_SHADER,b);r.attachShader(x,R),r.attachShader(x,A),t.index0AttributeName!==void 0?r.bindAttribLocation(x,0,t.index0AttributeName):t.hasPositionAttribute===!0&&r.bindAttribLocation(x,0,"position"),r.linkProgram(x);function D(C){if(n.debug.checkShaderErrors){const F=r.getProgramInfoLog(x)||"",O=r.getShaderInfoLog(R)||"",P=r.getShaderInfoLog(A)||"",B=F.trim(),W=O.trim(),$=P.trim();let ae=!0,q=!0;if(r.getProgramParameter(x,r.LINK_STATUS)===!1)if(ae=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(r,x,R,A);else{const ee=Ec(r,R,"vertex"),N=Ec(r,A,"fragment");at("WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(x,r.VALIDATE_STATUS)+`

Material Name: `+C.name+`
Material Type: `+C.type+`

Program Info Log: `+B+`
`+ee+`
`+N)}else B!==""?He("WebGLProgram: Program Info Log:",B):(W===""||$==="")&&(q=!1);q&&(C.diagnostics={runnable:ae,programLog:B,vertexShader:{log:W,prefix:g},fragmentShader:{log:$,prefix:m}})}r.deleteShader(R),r.deleteShader(A),S=new Ja(r,x),T=u2(r,x)}let S;this.getUniforms=function(){return S===void 0&&D(this),S};let T;this.getAttributes=function(){return T===void 0&&D(this),T};let I=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return I===!1&&(I=r.getProgramParameter(x,e2)),I},this.destroy=function(){i.releaseStatesOfProgram(this),r.deleteProgram(x),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=t2++,this.cacheKey=e,this.usedTimes=1,this.program=x,this.vertexShader=R,this.fragmentShader=A,this}let A2=0;class T2{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,i){const r=this._getShaderCacheForMaterial(e);return r.has(t)===!1&&(r.add(t),t.usedTimes++),r.has(i)===!1&&(r.add(i),i.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const i of t)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let i=t.get(e);return i===void 0&&(i=new Set,t.set(e,i)),i}_getShaderStage(e){const t=this.shaderCache;let i=t.get(e);return i===void 0&&(i=new R2(e),t.set(e,i)),i}}class R2{constructor(e){this.id=A2++,this.code=e,this.usedTimes=0}}function C2(n){return n===Qi||n===ja||n===es}function L2(n,e,t,i,r,a){const s=new Tu,o=new T2,u=new Set,c=[],h=new Map,f=i.logarithmicDepthBuffer;let d=i.precision;const p={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function _(S){return u.add(S),S===0?"uv":`uv${S}`}function x(S,T,I,C,F,O){const P=C.fog,B=F.geometry,W=S.isMeshStandardMaterial||S.isMeshLambertMaterial||S.isMeshPhongMaterial?C.environment:null,$=S.isMeshStandardMaterial||S.isMeshLambertMaterial&&!S.envMap||S.isMeshPhongMaterial&&!S.envMap,ae=e.get(S.envMap||W,$),q=ae&&ae.mapping===us?ae.image.height:null,ee=p[S.type];S.precision!==null&&(d=i.getMaxPrecision(S.precision),d!==S.precision&&He("WebGLProgram.getParameters:",S.precision,"not supported, using",d,"instead."));const N=B.morphAttributes.position||B.morphAttributes.normal||B.morphAttributes.color,re=N!==void 0?N.length:0;let ce=0;B.morphAttributes.position!==void 0&&(ce=1),B.morphAttributes.normal!==void 0&&(ce=2),B.morphAttributes.color!==void 0&&(ce=3);let Re,Fe,ze,j;if(ee){const Et=Yn[ee];Re=Et.vertexShader,Fe=Et.fragmentShader}else{Re=S.vertexShader,Fe=S.fragmentShader;const Et=o.getVertexShaderStage(S),ct=o.getFragmentShaderStage(S);o.update(S,Et,ct),ze=Et.id,j=ct.id}const ie=n.getRenderTarget(),G=n.state.buffers.depth.getReversed(),ue=F.isInstancedMesh===!0,se=F.isBatchedMesh===!0,ye=!!S.map,Ze=!!S.matcap,Ce=!!ae,Ue=!!S.aoMap,Ye=!!S.lightMap,We=!!S.bumpMap&&S.wireframe===!1,vt=!!S.normalMap,Dt=!!S.displacementMap,Yt=!!S.emissiveMap,_t=!!S.metalnessMap,St=!!S.roughnessMap,z=S.anisotropy>0,$e=S.clearcoat>0,ke=S.dispersion>0,L=S.retroreflectivity>0,M=S.iridescence>0,U=S.sheen>0,V=S.transmission>0,Z=z&&!!S.anisotropyMap,le=$e&&!!S.clearcoatMap,he=$e&&!!S.clearcoatNormalMap,Q=$e&&!!S.clearcoatRoughnessMap,te=M&&!!S.iridescenceMap,de=M&&!!S.iridescenceThicknessMap,Le=U&&!!S.sheenColorMap,ge=U&&!!S.sheenRoughnessMap,fe=!!S.specularMap,Ie=!!S.specularColorMap,Be=!!S.specularIntensityMap,Xe=V&&!!S.transmissionMap,H=V&&!!S.thicknessMap,pe=!!S.gradientMap,ne=!!S.alphaMap,me=S.alphaTest>0,Se=!!S.alphaHash,oe=!!S.extensions;let Ne=Zn;S.toneMapped&&(ie===null||ie.isXRRenderTarget===!0)&&(Ne=n.toneMapping);const De={shaderID:ee,shaderType:S.type,shaderName:S.name,vertexShader:Re,fragmentShader:Fe,defines:S.defines,customVertexShaderID:ze,customFragmentShaderID:j,isRawShaderMaterial:S.isRawShaderMaterial===!0,glslVersion:S.glslVersion,precision:d,batching:se,batchingColor:se&&F._colorsTexture!==null,instancing:ue,instancingColor:ue&&F.instanceColor!==null,instancingMorph:ue&&F.morphTexture!==null,outputColorSpace:ie===null?n.outputColorSpace:ie.isXRRenderTarget===!0?ie.texture.colorSpace:tt.workingColorSpace,alphaToCoverage:!!S.alphaToCoverage,map:ye,matcap:Ze,envMap:Ce,envMapMode:Ce&&ae.mapping,envMapCubeUVHeight:q,aoMap:Ue,lightMap:Ye,bumpMap:We,normalMap:vt,displacementMap:Dt,emissiveMap:Yt,normalMapObjectSpace:vt&&S.normalMapType===f0,normalMapTangentSpace:vt&&S.normalMapType===Gl,packedNormalMap:vt&&S.normalMapType===Gl&&C2(S.normalMap.format),metalnessMap:_t,roughnessMap:St,anisotropy:z,anisotropyMap:Z,clearcoat:$e,clearcoatMap:le,clearcoatNormalMap:he,clearcoatRoughnessMap:Q,dispersion:ke,retroreflection:L,iridescence:M,iridescenceMap:te,iridescenceThicknessMap:de,sheen:U,sheenColorMap:Le,sheenRoughnessMap:ge,specularMap:fe,specularColorMap:Ie,specularIntensityMap:Be,transmission:V,transmissionMap:Xe,thicknessMap:H,gradientMap:pe,opaque:S.transparent===!1&&S.blending===Qr&&S.alphaToCoverage===!1,alphaMap:ne,alphaTest:me,alphaHash:Se,combine:S.combine,mapUv:ye&&_(S.map.channel),aoMapUv:Ue&&_(S.aoMap.channel),lightMapUv:Ye&&_(S.lightMap.channel),bumpMapUv:We&&_(S.bumpMap.channel),normalMapUv:vt&&_(S.normalMap.channel),displacementMapUv:Dt&&_(S.displacementMap.channel),emissiveMapUv:Yt&&_(S.emissiveMap.channel),metalnessMapUv:_t&&_(S.metalnessMap.channel),roughnessMapUv:St&&_(S.roughnessMap.channel),anisotropyMapUv:Z&&_(S.anisotropyMap.channel),clearcoatMapUv:le&&_(S.clearcoatMap.channel),clearcoatNormalMapUv:he&&_(S.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Q&&_(S.clearcoatRoughnessMap.channel),iridescenceMapUv:te&&_(S.iridescenceMap.channel),iridescenceThicknessMapUv:de&&_(S.iridescenceThicknessMap.channel),sheenColorMapUv:Le&&_(S.sheenColorMap.channel),sheenRoughnessMapUv:ge&&_(S.sheenRoughnessMap.channel),specularMapUv:fe&&_(S.specularMap.channel),specularColorMapUv:Ie&&_(S.specularColorMap.channel),specularIntensityMapUv:Be&&_(S.specularIntensityMap.channel),transmissionMapUv:Xe&&_(S.transmissionMap.channel),thicknessMapUv:H&&_(S.thicknessMap.channel),alphaMapUv:ne&&_(S.alphaMap.channel),vertexTangents:!!B.attributes.tangent&&(vt||z),vertexNormals:!!B.attributes.normal,vertexColors:S.vertexColors,vertexAlphas:S.vertexColors===!0&&!!B.attributes.color&&B.attributes.color.itemSize===4,pointsUvs:F.isPoints===!0&&!!B.attributes.uv&&(ye||ne),fog:!!P,useFog:S.fog===!0,fogExp2:!!P&&P.isFogExp2,flatShading:S.wireframe===!1&&(S.flatShading===!0||B.attributes.normal===void 0&&vt===!1&&(S.isMeshLambertMaterial||S.isMeshPhongMaterial||S.isMeshStandardMaterial||S.isMeshPhysicalMaterial)),sizeAttenuation:S.sizeAttenuation===!0,logarithmicDepthBuffer:f,reversedDepthBuffer:G,skinning:F.isSkinnedMesh===!0,hasPositionAttribute:B.attributes.position!==void 0,morphTargets:B.morphAttributes.position!==void 0,morphNormals:B.morphAttributes.normal!==void 0,morphColors:B.morphAttributes.color!==void 0,morphTargetsCount:re,morphTextureStride:ce,numSunLights:T.sun.length,numDirLights:T.directional.length,numPointLights:T.point.length,numSpotLights:T.spot.length,numSpotLightMaps:T.spotLightMap.length,numRectAreaLights:T.rectArea.length,numHemiLights:T.hemi.length,numSunLightShadows:T.sunShadowMap.length,numDirLightShadows:T.directionalShadowMap.length,numPointLightShadows:T.pointShadowMap.length,numSpotLightShadows:T.spotShadowMap.length,numSpotLightShadowsWithMaps:T.numSpotLightShadowsWithMaps,numLightProbes:T.numLightProbes,numLightProbeGrids:O.length,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:S.dithering,shadowMapEnabled:n.shadowMap.enabled&&I.length>0,shadowMapType:n.shadowMap.type,toneMapping:Ne,decodeVideoTexture:ye&&S.map.isVideoTexture===!0&&tt.getTransfer(S.map.colorSpace)===mt,decodeVideoTextureEmissive:Yt&&S.emissiveMap.isVideoTexture===!0&&tt.getTransfer(S.emissiveMap.colorSpace)===mt,premultipliedAlpha:S.premultipliedAlpha,doubleSided:S.side===ui,flipSided:S.side===fn,useDepthPacking:S.depthPacking>=0,depthPacking:S.depthPacking||0,index0AttributeName:S.index0AttributeName,extensionClipCullDistance:oe&&S.extensions.clipCullDistance===!0&&t.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(oe&&S.extensions.multiDraw===!0||se)&&t.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:t.has("KHR_parallel_shader_compile"),customProgramCacheKey:S.customProgramCacheKey()};return De.vertexUv1s=u.has(1),De.vertexUv2s=u.has(2),De.vertexUv3s=u.has(3),u.clear(),De}function g(S){const T=[];if(S.shaderID?T.push(S.shaderID):(T.push(S.customVertexShaderID),T.push(S.customFragmentShaderID)),S.defines!==void 0)for(const I in S.defines)T.push(I),T.push(S.defines[I]);return S.isRawShaderMaterial===!1&&(m(T,S),v(T,S),T.push(n.outputColorSpace)),T.push(S.customProgramCacheKey),T.join()}function m(S,T){S.push(T.precision),S.push(T.outputColorSpace),S.push(T.envMapMode),S.push(T.envMapCubeUVHeight),S.push(T.mapUv),S.push(T.alphaMapUv),S.push(T.lightMapUv),S.push(T.aoMapUv),S.push(T.bumpMapUv),S.push(T.normalMapUv),S.push(T.displacementMapUv),S.push(T.emissiveMapUv),S.push(T.metalnessMapUv),S.push(T.roughnessMapUv),S.push(T.anisotropyMapUv),S.push(T.clearcoatMapUv),S.push(T.clearcoatNormalMapUv),S.push(T.clearcoatRoughnessMapUv),S.push(T.iridescenceMapUv),S.push(T.iridescenceThicknessMapUv),S.push(T.sheenColorMapUv),S.push(T.sheenRoughnessMapUv),S.push(T.specularMapUv),S.push(T.specularColorMapUv),S.push(T.specularIntensityMapUv),S.push(T.transmissionMapUv),S.push(T.thicknessMapUv),S.push(T.combine),S.push(T.fogExp2),S.push(T.sizeAttenuation),S.push(T.morphTargetsCount),S.push(T.morphAttributeCount),S.push(T.numSunLights),S.push(T.numDirLights),S.push(T.numPointLights),S.push(T.numSpotLights),S.push(T.numSpotLightMaps),S.push(T.numHemiLights),S.push(T.numRectAreaLights),S.push(T.numSunLightShadows),S.push(T.numDirLightShadows),S.push(T.numPointLightShadows),S.push(T.numSpotLightShadows),S.push(T.numSpotLightShadowsWithMaps),S.push(T.numLightProbes),S.push(T.shadowMapType),S.push(T.toneMapping),S.push(T.numClippingPlanes),S.push(T.numClipIntersection),S.push(T.depthPacking)}function v(S,T){s.disableAll(),T.instancing&&s.enable(0),T.instancingColor&&s.enable(1),T.instancingMorph&&s.enable(2),T.matcap&&s.enable(3),T.envMap&&s.enable(4),T.normalMapObjectSpace&&s.enable(5),T.normalMapTangentSpace&&s.enable(6),T.clearcoat&&s.enable(7),T.iridescence&&s.enable(8),T.alphaTest&&s.enable(9),T.vertexColors&&s.enable(10),T.vertexAlphas&&s.enable(11),T.vertexUv1s&&s.enable(12),T.vertexUv2s&&s.enable(13),T.vertexUv3s&&s.enable(14),T.vertexTangents&&s.enable(15),T.anisotropy&&s.enable(16),T.alphaHash&&s.enable(17),T.batching&&s.enable(18),T.dispersion&&s.enable(19),T.retroreflection&&s.enable(24),T.batchingColor&&s.enable(20),T.gradientMap&&s.enable(21),T.packedNormalMap&&s.enable(22),T.vertexNormals&&s.enable(23),S.push(s.mask),s.disableAll(),T.fog&&s.enable(0),T.useFog&&s.enable(1),T.flatShading&&s.enable(2),T.logarithmicDepthBuffer&&s.enable(3),T.reversedDepthBuffer&&s.enable(4),T.skinning&&s.enable(5),T.morphTargets&&s.enable(6),T.morphNormals&&s.enable(7),T.morphColors&&s.enable(8),T.premultipliedAlpha&&s.enable(9),T.shadowMapEnabled&&s.enable(10),T.doubleSided&&s.enable(11),T.flipSided&&s.enable(12),T.useDepthPacking&&s.enable(13),T.dithering&&s.enable(14),T.transmission&&s.enable(15),T.sheen&&s.enable(16),T.opaque&&s.enable(17),T.pointsUvs&&s.enable(18),T.decodeVideoTexture&&s.enable(19),T.decodeVideoTextureEmissive&&s.enable(20),T.alphaToCoverage&&s.enable(21),T.numLightProbeGrids>0&&s.enable(22),T.hasPositionAttribute&&s.enable(23),S.push(s.mask)}function E(S){const T=p[S.type];let I;if(T){const C=Yn[T];I=Q0.clone(C.uniforms)}else I=S.uniforms;return I}function b(S,T){let I=h.get(T);return I!==void 0?++I.usedTimes:(I=new w2(n,T,S,r),c.push(I),h.set(T,I)),I}function R(S){if(--S.usedTimes===0){const T=c.indexOf(S);c[T]=c[c.length-1],c.pop(),h.delete(S.cacheKey),S.destroy()}}function A(S){o.remove(S)}function D(){o.dispose()}return{getParameters:x,getProgramCacheKey:g,getUniforms:E,acquireProgram:b,releaseProgram:R,releaseShaderCache:A,programs:c,dispose:D}}function D2(){let n=new WeakMap;function e(s){return n.has(s)}function t(s){let o=n.get(s);return o===void 0&&(o={},n.set(s,o)),o}function i(s){n.delete(s)}function r(s,o,u){n.get(s)[o]=u}function a(){n=new WeakMap}return{has:e,get:t,remove:i,update:r,dispose:a}}function P2(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.material.id!==e.material.id?n.material.id-e.material.id:n.materialVariant!==e.materialVariant?n.materialVariant-e.materialVariant:n.z!==e.z?n.z-e.z:n.id-e.id}function Rc(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.z!==e.z?e.z-n.z:n.id-e.id}function Cc(){const n=[];let e=0;const t=[],i=[],r=[];function a(){e=0,t.length=0,i.length=0,r.length=0}function s(d){let p=0;return d.isInstancedMesh&&(p+=2),d.isSkinnedMesh&&(p+=1),p}function o(d,p,_,x,g,m){let v=n[e];return v===void 0?(v={id:d.id,object:d,geometry:p,material:_,materialVariant:s(d),groupOrder:x,renderOrder:d.renderOrder,z:g,group:m},n[e]=v):(v.id=d.id,v.object=d,v.geometry=p,v.material=_,v.materialVariant=s(d),v.groupOrder=x,v.renderOrder=d.renderOrder,v.z=g,v.group=m),e++,v}function u(d,p,_,x,g,m,v){v.reversedDepth===!0&&(g=-g);const E=o(d,p,_,x,g,m);_.transmission>0?i.push(E):_.transparent===!0?r.push(E):t.push(E)}function c(d,p,_,x,g,m){const v=o(d,p,_,x,g,m);_.transmission>0?i.unshift(v):_.transparent===!0?r.unshift(v):t.unshift(v)}function h(d,p){t.length>1&&t.sort(d||P2),i.length>1&&i.sort(p||Rc),r.length>1&&r.sort(p||Rc)}function f(){for(let d=e,p=n.length;d<p;d++){const _=n[d];if(_.id===null)break;_.id=null,_.object=null,_.geometry=null,_.material=null,_.group=null}}return{opaque:t,transmissive:i,transparent:r,init:a,push:u,unshift:c,finish:f,sort:h}}function I2(){let n=new WeakMap;function e(i,r){const a=n.get(i);let s;return a===void 0?(s=new Cc,n.set(i,[s])):r>=a.length?(s=new Cc,a.push(s)):s=a[r],s}function t(){n=new WeakMap}return{get:e,dispose:t}}function N2(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={direction:new Y,color:new lt};break;case"SpotLight":t={position:new Y,direction:new Y,color:new lt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new Y,color:new lt,distance:0,decay:0};break;case"HemisphereLight":t={direction:new Y,skyColor:new lt,groundColor:new lt};break;case"RectAreaLight":t={color:new lt,position:new Y,halfWidth:new Y,halfHeight:new Y};break}return n[e.id]=t,t}}}function U2(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ve};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ve};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ve,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[e.id]=t,t}}}let O2=0;function F2(n,e){return(e.castShadow?2:0)-(n.castShadow?2:0)+(e.map?1:0)-(n.map?1:0)}function B2(n){const e=new N2,t=U2(),i={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)i.probe.push(new Y);const r=new Y,a=new Ot,s=new Ot;function o(c){let h=0,f=0,d=0;for(let F=0;F<9;F++)i.probe[F].set(0,0,0);let p=0,_=0,x=0,g=0,m=0,v=0,E=0,b=0,R=0,A=0,D=0,S=0,T=0,I=0;c.sort(F2);for(let F=0,O=c.length;F<O;F++){const P=c[F],B=P.color,W=P.intensity,$=P.distance;let ae=null;if(P.shadow&&P.shadow.map&&(P.shadow.map.texture.format===Qi?ae=P.shadow.map.texture:ae=P.shadow.map.depthTexture||P.shadow.map.texture),P.isAmbientLight)h+=B.r*W,f+=B.g*W,d+=B.b*W;else if(P.isLightProbe){for(let q=0;q<9;q++)i.probe[q].addScaledVector(P.sh.coefficients[q],W);I++}else if(P.isSunLight){const q=e.get(P);if(q.color.copy(P.color).multiplyScalar(P.intensity),P.castShadow){const ee=P.shadow,N=t.get(P);N.shadowIntensity=ee.intensity,N.shadowBias=ee.bias,N.shadowNormalBias=ee.normalBias,N.shadowRadius=ee.radius,N.shadowMapSize.copy(ee.mapSize).multiply(ee.getFrameExtents()),i.sunShadow[_]=N,i.sunShadowMap[_]=ae;const re=ee.getViewportCount();for(let ce=0;ce<re;ce++)i.sunShadowMatrix[x+ce]=ee.getMatrix(ce),i.sunShadowCascade[x+ce]=ee._cascadeData[ce];x+=re,_++}i.sun[p]=q,p++}else if(P.isDirectionalLight){const q=e.get(P);if(q.color.copy(P.color).multiplyScalar(P.intensity),P.castShadow){const ee=P.shadow,N=t.get(P);N.shadowIntensity=ee.intensity,N.shadowBias=ee.bias,N.shadowNormalBias=ee.normalBias,N.shadowRadius=ee.radius,N.shadowMapSize=ee.mapSize,i.directionalShadow[g]=N,i.directionalShadowMap[g]=ae,i.directionalShadowMatrix[g]=P.shadow.matrix,R++}i.directional[g]=q,g++}else if(P.isSpotLight){const q=e.get(P);q.position.setFromMatrixPosition(P.matrixWorld),q.color.copy(B).multiplyScalar(W),q.distance=$,q.coneCos=Math.cos(P.angle),q.penumbraCos=Math.cos(P.angle*(1-P.penumbra)),q.decay=P.decay,i.spot[v]=q;const ee=P.shadow;if(P.map&&(i.spotLightMap[S]=P.map,S++,ee.updateMatrices(P),P.castShadow&&T++),i.spotLightMatrix[v]=ee.matrix,P.castShadow){const N=t.get(P);N.shadowIntensity=ee.intensity,N.shadowBias=ee.bias,N.shadowNormalBias=ee.normalBias,N.shadowRadius=ee.radius,N.shadowMapSize=ee.mapSize,i.spotShadow[v]=N,i.spotShadowMap[v]=ae,D++}v++}else if(P.isRectAreaLight){const q=e.get(P);q.color.copy(B).multiplyScalar(W),q.halfWidth.set(P.width*.5,0,0),q.halfHeight.set(0,P.height*.5,0),i.rectArea[E]=q,E++}else if(P.isPointLight){const q=e.get(P);if(q.color.copy(P.color).multiplyScalar(P.intensity),q.distance=P.distance,q.decay=P.decay,P.castShadow){const ee=P.shadow,N=t.get(P);N.shadowIntensity=ee.intensity,N.shadowBias=ee.bias,N.shadowNormalBias=ee.normalBias,N.shadowRadius=ee.radius,N.shadowMapSize=ee.mapSize,N.shadowCameraNear=ee.camera.near,N.shadowCameraFar=ee.camera.far,i.pointShadow[m]=N,i.pointShadowMap[m]=ae,i.pointShadowMatrix[m]=P.shadow.matrix,A++}i.point[m]=q,m++}else if(P.isHemisphereLight){const q=e.get(P);q.skyColor.copy(P.color).multiplyScalar(W),q.groundColor.copy(P.groundColor).multiplyScalar(W),i.hemi[b]=q,b++}}E>0&&(n.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=_e.LTC_FLOAT_1,i.rectAreaLTC2=_e.LTC_FLOAT_2):(i.rectAreaLTC1=_e.LTC_HALF_1,i.rectAreaLTC2=_e.LTC_HALF_2)),i.ambient[0]=h,i.ambient[1]=f,i.ambient[2]=d;const C=i.hash;(C.sunLength!==p||C.directionalLength!==g||C.pointLength!==m||C.spotLength!==v||C.rectAreaLength!==E||C.hemiLength!==b||C.numSunShadows!==_||C.numDirectionalShadows!==R||C.numPointShadows!==A||C.numSpotShadows!==D||C.numSpotMaps!==S||C.numLightProbes!==I)&&(i.sun.length=p,i.directional.length=g,i.spot.length=v,i.rectArea.length=E,i.point.length=m,i.hemi.length=b,i.sunShadow.length=_,i.sunShadowMap.length=_,i.sunShadowMatrix.length=x,i.sunShadowCascade.length=x,i.directionalShadow.length=R,i.directionalShadowMap.length=R,i.directionalShadowMatrix.length=R,i.pointShadow.length=A,i.pointShadowMap.length=A,i.pointShadowMatrix.length=A,i.spotShadow.length=D,i.spotShadowMap.length=D,i.spotLightMatrix.length=D+S-T,i.spotLightMap.length=S,i.numSpotLightShadowsWithMaps=T,i.numLightProbes=I,C.sunLength=p,C.directionalLength=g,C.pointLength=m,C.spotLength=v,C.rectAreaLength=E,C.hemiLength=b,C.numSunShadows=_,C.numDirectionalShadows=R,C.numPointShadows=A,C.numSpotShadows=D,C.numSpotMaps=S,C.numLightProbes=I,i.version=O2++)}function u(c,h){let f=0,d=0,p=0,_=0,x=0,g=0;const m=h.matrixWorldInverse;for(let v=0,E=c.length;v<E;v++){const b=c[v];if(b.isSunLight){const R=i.sun[f];R.direction.setFromMatrixPosition(b.matrixWorld),R.direction.transformDirection(m),f++}else if(b.isDirectionalLight){const R=i.directional[d];R.direction.setFromMatrixPosition(b.matrixWorld),r.setFromMatrixPosition(b.target.matrixWorld),R.direction.sub(r),R.direction.transformDirection(m),d++}else if(b.isSpotLight){const R=i.spot[_];R.position.setFromMatrixPosition(b.matrixWorld),R.position.applyMatrix4(m),R.direction.setFromMatrixPosition(b.matrixWorld),r.setFromMatrixPosition(b.target.matrixWorld),R.direction.sub(r),R.direction.transformDirection(m),_++}else if(b.isRectAreaLight){const R=i.rectArea[x];R.position.setFromMatrixPosition(b.matrixWorld),R.position.applyMatrix4(m),s.identity(),a.copy(b.matrixWorld),a.premultiply(m),s.extractRotation(a),R.halfWidth.set(b.width*.5,0,0),R.halfHeight.set(0,b.height*.5,0),R.halfWidth.applyMatrix4(s),R.halfHeight.applyMatrix4(s),x++}else if(b.isPointLight){const R=i.point[p];R.position.setFromMatrixPosition(b.matrixWorld),R.position.applyMatrix4(m),p++}else if(b.isHemisphereLight){const R=i.hemi[g];R.direction.setFromMatrixPosition(b.matrixWorld),R.direction.transformDirection(m),g++}}}return{setup:o,setupView:u,state:i}}function Lc(n){const e=new B2(n),t=[],i=[],r=[];function a(d){f.camera=d,t.length=0,i.length=0,r.length=0}function s(d){t.push(d)}function o(d){i.push(d)}function u(d){r.push(d)}function c(){e.setup(t)}function h(d){e.setupView(t,d)}const f={lightsArray:t,shadowsArray:i,lightProbeGridArray:r,camera:null,lights:e,transmissionRenderTarget:{},textureUnits:0};return{init:a,state:f,setupLights:c,setupLightsView:h,pushLight:s,pushShadow:o,pushLightProbeGrid:u}}function k2(n){let e=new WeakMap;function t(r,a=0){const s=e.get(r);let o;return s===void 0?(o=new Lc(n),e.set(r,[o])):a>=s.length?(o=new Lc(n),s.push(o)):o=s[a],o}function i(){e=new WeakMap}return{get:t,dispose:i}}const z2=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,H2=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,G2=[new Y(1,0,0),new Y(-1,0,0),new Y(0,1,0),new Y(0,-1,0),new Y(0,0,1),new Y(0,0,-1)],V2=[new Y(0,-1,0),new Y(0,-1,0),new Y(0,0,1),new Y(0,0,-1),new Y(0,-1,0),new Y(0,-1,0)],Dc=new Ot,Yr=new Y,js=new Y;function W2(n,e,t){let i=new gl;const r=new Ve,a=new Ve,s=new Lt,o=new np,u=new ip,c={},h=t.maxTextureSize,f={[$i]:fn,[fn]:$i,[ui]:ui},d=new nn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Ve},radius:{value:4}},vertexShader:z2,fragmentShader:H2}),p=d.clone();p.defines.HORIZONTAL_PASS=1;const _=new ei;_.setAttribute("position",new $n(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const x=new ln(_,d),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Xa;let m=this.type;this.render=function(A,D,S){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||A.length===0)return;this.type===Wf&&(He("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."),this.type=Xa);const T=n.getRenderTarget(),I=n.getActiveCubeFace(),C=n.getActiveMipmapLevel(),F=n.state;F.setBlending(pi),F.buffers.depth.getReversed()===!0?F.buffers.color.setClear(0,0,0,0):F.buffers.color.setClear(1,1,1,1),F.buffers.depth.setTest(!0),F.setScissorTest(!1);const O=m!==this.type;O&&D.traverse(function(P){P.material&&(Array.isArray(P.material)?P.material.forEach(B=>B.needsUpdate=!0):P.material.needsUpdate=!0)});for(let P=0,B=A.length;P<B;P++){const W=A[P],$=W.shadow;if($===void 0){He("WebGLShadowMap:",W,"has no shadow.");continue}if($.autoUpdate===!1&&$.needsUpdate===!1)continue;r.copy($.mapSize);const ae=$.getFrameExtents();r.multiply(ae),a.copy($.mapSize),(r.x>h||r.y>h)&&(r.x>h&&(a.x=Math.floor(h/ae.x),r.x=a.x*ae.x,$.mapSize.x=a.x),r.y>h&&(a.y=Math.floor(h/ae.y),r.y=a.y*ae.y,$.mapSize.y=a.y));const q=n.state.buffers.depth.getReversed();if($.camera._reversedDepth=q,$.map===null||O===!0){if($.map!==null&&($.map.depthTexture!==null&&($.map.depthTexture.dispose(),$.map.depthTexture=null),$.map.dispose()),this.type===qr){if(W.isPointLight){He("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}$.map=new wn(r.x,r.y,{format:Qi,type:jn,minFilter:Bt,magFilter:Bt,generateMipmaps:!1}),$.map.texture.name=W.name+".shadowMap",$.map.depthTexture=new ra(r.x,r.y,Kn),$.map.depthTexture.name=W.name+".shadowMapDepth",$.map.depthTexture.format=xi,$.map.depthTexture.compareFunction=null,$.map.depthTexture.minFilter=Gt,$.map.depthTexture.magFilter=Gt}else W.isPointLight?($.map=new Hu(r.x),$.map.depthTexture=new $0(r.x,Qn)):($.map=new wn(r.x,r.y),$.map.depthTexture=new ra(r.x,r.y,Qn)),$.map.depthTexture.name=W.name+".shadowMap",$.map.depthTexture.format=xi,this.type===Xa?($.map.depthTexture.compareFunction=q?fl:dl,$.map.depthTexture.minFilter=Bt,$.map.depthTexture.magFilter=Bt):($.map.depthTexture.compareFunction=null,$.map.depthTexture.minFilter=Gt,$.map.depthTexture.magFilter=Gt);$.camera.updateProjectionMatrix()}$.map.isWebGLCubeRenderTarget!==!0&&($.map.width!==r.x||$.map.height!==r.y)&&$.map.setSize(r.x,r.y);const ee=$.map.isWebGLCubeRenderTarget?6:$.getViewportCount();W.isPointLight!==!0&&$.updateMatrices(W,S);for(let N=0;N<ee;N++){const re=$.getCamera(N);if(W.isPointLight){const ce=$.camera,Re=$.matrix,Fe=W.distance||ce.far;Fe!==ce.far&&(ce.far=Fe,ce.updateProjectionMatrix()),Yr.setFromMatrixPosition(W.matrixWorld),ce.position.copy(Yr),js.copy(ce.position),js.add(G2[N]),ce.up.copy(V2[N]),ce.lookAt(js),ce.updateMatrixWorld(),Re.makeTranslation(-Yr.x,-Yr.y,-Yr.z),Dc.multiplyMatrices(ce.projectionMatrix,ce.matrixWorldInverse),$._frustum.setFromProjectionMatrix(Dc,ce.coordinateSystem,ce.reversedDepth)}if($.map.isWebGLCubeRenderTarget)n.setRenderTarget($.map,N),n.clear();else{N===0&&(n.setRenderTarget($.map),n.clear());const ce=$.getViewport(N);s.set(a.x*ce.x,a.y*ce.y,a.x*ce.z,a.y*ce.w),F.viewport(s)}i=$.getFrustum(N),b(D,S,re,W,this.type)}$.isPointLightShadow!==!0&&this.type===qr&&v($,S),$.needsUpdate=!1}m=this.type,g.needsUpdate=!1,n.setRenderTarget(T,I,C)};function v(A,D){const S=e.update(x);d.defines.VSM_SAMPLES!==A.blurSamples&&(d.defines.VSM_SAMPLES=A.blurSamples,p.defines.VSM_SAMPLES=A.blurSamples,d.needsUpdate=!0,p.needsUpdate=!0),A.mapPass===null?A.mapPass=new wn(r.x,r.y,{format:Qi,type:jn}):(A.mapPass.width!==A.map.width||A.mapPass.height!==A.map.height)&&A.mapPass.setSize(A.map.width,A.map.height),d.uniforms.shadow_pass.value=A.map.depthTexture,d.uniforms.resolution.value.set(A.map.width,A.map.height),d.uniforms.radius.value=A.radius,n.setRenderTarget(A.mapPass),n.clear(),n.renderBufferDirect(D,null,S,d,x,null),p.uniforms.shadow_pass.value=A.mapPass.texture,p.uniforms.resolution.value.set(A.map.width,A.map.height),p.uniforms.radius.value=A.radius,n.setRenderTarget(A.map),n.clear(),n.renderBufferDirect(D,null,S,p,x,null)}function E(A,D,S,T){let I=null;const C=S.isPointLight===!0?A.customDistanceMaterial:A.customDepthMaterial;if(C!==void 0)I=C;else if(I=S.isPointLight===!0?u:o,n.localClippingEnabled&&D.clipShadows===!0&&Array.isArray(D.clippingPlanes)&&D.clippingPlanes.length!==0||D.displacementMap&&D.displacementScale!==0||D.alphaMap&&D.alphaTest>0||D.map&&D.alphaTest>0||D.alphaToCoverage===!0){const F=I.uuid,O=D.uuid;let P=c[F];P===void 0&&(P={},c[F]=P);let B=P[O];B===void 0&&(B=I.clone(),P[O]=B,D.addEventListener("dispose",R)),I=B}if(I.visible=D.visible,I.wireframe=D.wireframe,T===qr?I.side=D.shadowSide!==null?D.shadowSide:D.side:I.side=D.shadowSide!==null?D.shadowSide:f[D.side],I.alphaMap=D.alphaMap,I.alphaTest=D.alphaToCoverage===!0?.5:D.alphaTest,I.map=D.map,I.clipShadows=D.clipShadows,I.clippingPlanes=D.clippingPlanes,I.clipIntersection=D.clipIntersection,I.displacementMap=D.displacementMap,I.displacementScale=D.displacementScale,I.displacementBias=D.displacementBias,I.wireframeLinewidth=D.wireframeLinewidth,I.linewidth=D.linewidth,S.isPointLight===!0&&I.isMeshDistanceMaterial===!0){const F=n.properties.get(I);F.light=S}return I}function b(A,D,S,T,I){if(A.visible===!1)return;if(A.layers.test(D.layers)&&(A.isMesh||A.isLine||A.isPoints)&&(A.castShadow||A.receiveShadow&&I===qr)&&(!A.frustumCulled||A.intersectsFrustum(i))){A.modelViewMatrix.multiplyMatrices(S.matrixWorldInverse,A.matrixWorld);const O=e.update(A),P=A.material;if(Array.isArray(P)){const B=O.groups;for(let W=0,$=B.length;W<$;W++){const ae=B[W],q=P[ae.materialIndex];if(q&&q.visible){const ee=E(A,q,T,I);A.onBeforeShadow(n,A,D,S,O,ee,ae),n.renderBufferDirect(S,null,O,ee,A,ae),A.onAfterShadow(n,A,D,S,O,ee,ae)}}}else if(P.visible){const B=E(A,P,T,I);A.onBeforeShadow(n,A,D,S,O,B,null),n.renderBufferDirect(S,null,O,B,A,null),A.onAfterShadow(n,A,D,S,O,B,null)}}const F=A.children;for(let O=0,P=F.length;O<P;O++)b(F[O],D,S,T,I)}function R(A){A.target.removeEventListener("dispose",R);for(const S in c){const T=c[S],I=A.target.uuid;I in T&&(T[I].dispose(),delete T[I])}}}function Y2(n,e){function t(){let H=!1;const pe=new Lt;let ne=null;const me=new Lt(0,0,0,0);return{setMask:function(Se){ne!==Se&&!H&&(n.colorMask(Se,Se,Se,Se),ne=Se)},setLocked:function(Se){H=Se},setClear:function(Se,oe,Ne,De,Et){Et===!0&&(Se*=De,oe*=De,Ne*=De),pe.set(Se,oe,Ne,De),me.equals(pe)===!1&&(n.clearColor(Se,oe,Ne,De),me.copy(pe))},reset:function(){H=!1,ne=null,me.set(-1,0,0,0)}}}function i(){let H=!1,pe=!1,ne=null,me=null,Se=null;return{setReversed:function(oe){if(pe!==oe){const Ne=e.get("EXT_clip_control");oe?Ne.clipControlEXT(Ne.LOWER_LEFT_EXT,Ne.ZERO_TO_ONE_EXT):Ne.clipControlEXT(Ne.LOWER_LEFT_EXT,Ne.NEGATIVE_ONE_TO_ONE_EXT),pe=oe;const De=Se;Se=null,this.setClear(De)}},getReversed:function(){return pe},setTest:function(oe){oe?ie(n.DEPTH_TEST):G(n.DEPTH_TEST)},setMask:function(oe){ne!==oe&&!H&&(n.depthMask(oe),ne=oe)},setFunc:function(oe){if(pe&&(oe=w0[oe]),me!==oe){switch(oe){case ro:n.depthFunc(n.NEVER);break;case ao:n.depthFunc(n.ALWAYS);break;case so:n.depthFunc(n.LESS);break;case ea:n.depthFunc(n.LEQUAL);break;case oo:n.depthFunc(n.EQUAL);break;case lo:n.depthFunc(n.GEQUAL);break;case co:n.depthFunc(n.GREATER);break;case uo:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}me=oe}},setLocked:function(oe){H=oe},setClear:function(oe){Se!==oe&&(Se=oe,pe&&(oe=1-oe),n.clearDepth(oe))},reset:function(){H=!1,ne=null,me=null,Se=null,pe=!1}}}function r(){let H=!1,pe=null,ne=null,me=null,Se=null,oe=null,Ne=null,De=null,Et=null;return{setTest:function(ct){H||(ct?ie(n.STENCIL_TEST):G(n.STENCIL_TEST))},setMask:function(ct){pe!==ct&&!H&&(n.stencilMask(ct),pe=ct)},setFunc:function(ct,Tn,Fn){(ne!==ct||me!==Tn||Se!==Fn)&&(n.stencilFunc(ct,Tn,Fn),ne=ct,me=Tn,Se=Fn)},setOp:function(ct,Tn,Fn){(oe!==ct||Ne!==Tn||De!==Fn)&&(n.stencilOp(ct,Tn,Fn),oe=ct,Ne=Tn,De=Fn)},setLocked:function(ct){H=ct},setClear:function(ct){Et!==ct&&(n.clearStencil(ct),Et=ct)},reset:function(){H=!1,pe=null,ne=null,me=null,Se=null,oe=null,Ne=null,De=null,Et=null}}}const a=new t,s=new i,o=new r,u=new WeakMap,c=new WeakMap;let h={},f={},d={},p=new WeakMap,_=[],x=null,g=!1,m=null,v=null,E=null,b=null,R=null,A=null,D=null,S=new lt(0,0,0),T=0,I=!1,C=null,F=null,O=null,P=null,B=null;const W=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let $=!1,ae=0;const q=n.getParameter(n.VERSION);q.indexOf("WebGL")!==-1?(ae=parseFloat(/^WebGL (\d)/.exec(q)[1]),$=ae>=1):q.indexOf("OpenGL ES")!==-1&&(ae=parseFloat(/^OpenGL ES (\d)/.exec(q)[1]),$=ae>=2);let ee=null,N={};const re=n.getParameter(n.SCISSOR_BOX),ce=n.getParameter(n.VIEWPORT),Re=new Lt().fromArray(re),Fe=new Lt().fromArray(ce);function ze(H,pe,ne,me){const Se=new Uint8Array(4),oe=n.createTexture();n.bindTexture(H,oe),n.texParameteri(H,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(H,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let Ne=0;Ne<ne;Ne++)H===n.TEXTURE_3D||H===n.TEXTURE_2D_ARRAY?n.texImage3D(pe,0,n.RGBA,1,1,me,0,n.RGBA,n.UNSIGNED_BYTE,Se):n.texImage2D(pe+Ne,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,Se);return oe}const j={};j[n.TEXTURE_2D]=ze(n.TEXTURE_2D,n.TEXTURE_2D,1),j[n.TEXTURE_CUBE_MAP]=ze(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),j[n.TEXTURE_2D_ARRAY]=ze(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),j[n.TEXTURE_3D]=ze(n.TEXTURE_3D,n.TEXTURE_3D,1,1),a.setClear(0,0,0,1),s.setClear(1),o.setClear(0),ie(n.DEPTH_TEST),s.setFunc(ea),We(!1),vt(Bl),ie(n.CULL_FACE),Ue(pi);function ie(H){h[H]!==!0&&(n.enable(H),h[H]=!0)}function G(H){h[H]!==!1&&(n.disable(H),h[H]=!1)}function ue(H,pe){return d[H]!==pe?(n.bindFramebuffer(H,pe),d[H]=pe,H===n.DRAW_FRAMEBUFFER&&(d[n.FRAMEBUFFER]=pe),H===n.FRAMEBUFFER&&(d[n.DRAW_FRAMEBUFFER]=pe),!0):!1}function se(H,pe){let ne=_,me=!1;if(H){ne=p.get(pe),ne===void 0&&(ne=[],p.set(pe,ne));const Se=H.textures;if(ne.length!==Se.length||ne[0]!==n.COLOR_ATTACHMENT0){for(let oe=0,Ne=Se.length;oe<Ne;oe++)ne[oe]=n.COLOR_ATTACHMENT0+oe;ne.length=Se.length,me=!0}}else ne[0]!==n.BACK&&(ne[0]=n.BACK,me=!0);me&&n.drawBuffers(ne)}function ye(H){return x!==H?(n.useProgram(H),x=H,!0):!1}const Ze={[xr]:n.FUNC_ADD,[Xf]:n.FUNC_SUBTRACT,[Kf]:n.FUNC_REVERSE_SUBTRACT};Ze[qf]=n.MIN,Ze[Zf]=n.MAX;const Ce={[$f]:n.ZERO,[Jf]:n.ONE,[Qf]:n.SRC_COLOR,[su]:n.SRC_ALPHA,[r0]:n.SRC_ALPHA_SATURATE,[n0]:n.DST_COLOR,[e0]:n.DST_ALPHA,[jf]:n.ONE_MINUS_SRC_COLOR,[ou]:n.ONE_MINUS_SRC_ALPHA,[i0]:n.ONE_MINUS_DST_COLOR,[t0]:n.ONE_MINUS_DST_ALPHA,[a0]:n.CONSTANT_COLOR,[s0]:n.ONE_MINUS_CONSTANT_COLOR,[o0]:n.CONSTANT_ALPHA,[l0]:n.ONE_MINUS_CONSTANT_ALPHA};function Ue(H,pe,ne,me,Se,oe,Ne,De,Et,ct){if(H===pi){g===!0&&(G(n.BLEND),g=!1);return}if(g===!1&&(ie(n.BLEND),g=!0),H!==Yf){if(H!==m||ct!==I){if((v!==xr||R!==xr)&&(n.blendEquation(n.FUNC_ADD),v=xr,R=xr),ct)switch(H){case Qr:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case kl:n.blendFunc(n.ONE,n.ONE);break;case zl:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case Hl:n.blendFuncSeparate(n.DST_COLOR,n.ONE_MINUS_SRC_ALPHA,n.ZERO,n.ONE);break;default:at("WebGLState: Invalid blending: ",H);break}else switch(H){case Qr:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case kl:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE,n.ONE,n.ONE);break;case zl:at("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Hl:at("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:at("WebGLState: Invalid blending: ",H);break}E=null,b=null,A=null,D=null,S.set(0,0,0),T=0,m=H,I=ct}return}Se=Se||pe,oe=oe||ne,Ne=Ne||me,(pe!==v||Se!==R)&&(n.blendEquationSeparate(Ze[pe],Ze[Se]),v=pe,R=Se),(ne!==E||me!==b||oe!==A||Ne!==D)&&(n.blendFuncSeparate(Ce[ne],Ce[me],Ce[oe],Ce[Ne]),E=ne,b=me,A=oe,D=Ne),(De.equals(S)===!1||Et!==T)&&(n.blendColor(De.r,De.g,De.b,Et),S.copy(De),T=Et),m=H,I=!1}function Ye(H,pe){H.side===ui?G(n.CULL_FACE):ie(n.CULL_FACE);let ne=H.side===fn;pe&&(ne=!ne),We(ne),H.blending===Qr&&H.transparent===!1?Ue(pi):Ue(H.blending,H.blendEquation,H.blendSrc,H.blendDst,H.blendEquationAlpha,H.blendSrcAlpha,H.blendDstAlpha,H.blendColor,H.blendAlpha,H.premultipliedAlpha),s.setFunc(H.depthFunc),s.setTest(H.depthTest),s.setMask(H.depthWrite),a.setMask(H.colorWrite);const me=H.stencilWrite;o.setTest(me),me&&(o.setMask(H.stencilWriteMask),o.setFunc(H.stencilFunc,H.stencilRef,H.stencilFuncMask),o.setOp(H.stencilFail,H.stencilZFail,H.stencilZPass)),Yt(H.polygonOffset,H.polygonOffsetFactor,H.polygonOffsetUnits),H.alphaToCoverage===!0?ie(n.SAMPLE_ALPHA_TO_COVERAGE):G(n.SAMPLE_ALPHA_TO_COVERAGE)}function We(H){C!==H&&(H?n.frontFace(n.CW):n.frontFace(n.CCW),C=H)}function vt(H){H!==Gf?(ie(n.CULL_FACE),H!==F&&(H===Bl?n.cullFace(n.BACK):H===Vf?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):G(n.CULL_FACE),F=H}function Dt(H){H!==O&&($&&n.lineWidth(H),O=H)}function Yt(H,pe,ne){H?(ie(n.POLYGON_OFFSET_FILL),(P!==pe||B!==ne)&&(P=pe,B=ne,s.getReversed()&&(pe=-pe),n.polygonOffset(pe,ne))):G(n.POLYGON_OFFSET_FILL)}function _t(H){H?ie(n.SCISSOR_TEST):G(n.SCISSOR_TEST)}function St(H){H===void 0&&(H=n.TEXTURE0+W-1),ee!==H&&(n.activeTexture(H),ee=H)}function z(H,pe,ne){ne===void 0&&(ee===null?ne=n.TEXTURE0+W-1:ne=ee);let me=N[ne];me===void 0&&(me={type:void 0,texture:void 0},N[ne]=me),(me.type!==H||me.texture!==pe)&&(ee!==ne&&(n.activeTexture(ne),ee=ne),n.bindTexture(H,pe||j[H]),me.type=H,me.texture=pe)}function $e(){const H=N[ee];H!==void 0&&H.type!==void 0&&(n.bindTexture(H.type,null),H.type=void 0,H.texture=void 0)}function ke(){try{n.compressedTexImage2D(...arguments)}catch(H){at("WebGLState:",H)}}function L(){try{n.compressedTexImage3D(...arguments)}catch(H){at("WebGLState:",H)}}function M(){try{n.texSubImage2D(...arguments)}catch(H){at("WebGLState:",H)}}function U(){try{n.texSubImage3D(...arguments)}catch(H){at("WebGLState:",H)}}function V(){try{n.compressedTexSubImage2D(...arguments)}catch(H){at("WebGLState:",H)}}function Z(){try{n.compressedTexSubImage3D(...arguments)}catch(H){at("WebGLState:",H)}}function le(){try{n.texStorage2D(...arguments)}catch(H){at("WebGLState:",H)}}function he(){try{n.texStorage3D(...arguments)}catch(H){at("WebGLState:",H)}}function Q(){try{n.texImage2D(...arguments)}catch(H){at("WebGLState:",H)}}function te(){try{n.texImage3D(...arguments)}catch(H){at("WebGLState:",H)}}function de(H){return f[H]!==void 0?f[H]:n.getParameter(H)}function Le(H,pe){f[H]!==pe&&(n.pixelStorei(H,pe),f[H]=pe)}function ge(H){Re.equals(H)===!1&&(n.scissor(H.x,H.y,H.z,H.w),Re.copy(H))}function fe(H){Fe.equals(H)===!1&&(n.viewport(H.x,H.y,H.z,H.w),Fe.copy(H))}function Ie(H,pe){let ne=c.get(pe);ne===void 0&&(ne=new WeakMap,c.set(pe,ne));let me=ne.get(H);me===void 0&&(me=n.getUniformBlockIndex(pe,H.name),ne.set(H,me))}function Be(H,pe){const me=c.get(pe).get(H);u.get(pe)!==me&&(n.uniformBlockBinding(pe,me,H.__bindingPointIndex),u.set(pe,me))}function Xe(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),s.setReversed(!1),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),n.pixelStorei(n.PACK_ALIGNMENT,4),n.pixelStorei(n.UNPACK_ALIGNMENT,4),n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,!1),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,n.BROWSER_DEFAULT_WEBGL),n.pixelStorei(n.PACK_ROW_LENGTH,0),n.pixelStorei(n.PACK_SKIP_PIXELS,0),n.pixelStorei(n.PACK_SKIP_ROWS,0),n.pixelStorei(n.UNPACK_ROW_LENGTH,0),n.pixelStorei(n.UNPACK_IMAGE_HEIGHT,0),n.pixelStorei(n.UNPACK_SKIP_PIXELS,0),n.pixelStorei(n.UNPACK_SKIP_ROWS,0),n.pixelStorei(n.UNPACK_SKIP_IMAGES,0),h={},f={},ee=null,N={},d={},p=new WeakMap,_=[],x=null,g=!1,m=null,v=null,E=null,b=null,R=null,A=null,D=null,S=new lt(0,0,0),T=0,I=!1,C=null,F=null,O=null,P=null,B=null,Re.set(0,0,n.canvas.width,n.canvas.height),Fe.set(0,0,n.canvas.width,n.canvas.height),a.reset(),s.reset(),o.reset()}return{buffers:{color:a,depth:s,stencil:o},enable:ie,disable:G,bindFramebuffer:ue,drawBuffers:se,useProgram:ye,setBlending:Ue,setMaterial:Ye,setFlipSided:We,setCullFace:vt,setLineWidth:Dt,setPolygonOffset:Yt,setScissorTest:_t,activeTexture:St,bindTexture:z,unbindTexture:$e,compressedTexImage2D:ke,compressedTexImage3D:L,texImage2D:Q,texImage3D:te,pixelStorei:Le,getParameter:de,updateUBOMapping:Ie,uniformBlockBinding:Be,texStorage2D:le,texStorage3D:he,texSubImage2D:M,texSubImage3D:U,compressedTexSubImage2D:V,compressedTexSubImage3D:Z,scissor:ge,viewport:fe,reset:Xe}}function X2(n,e,t,i,r,a,s){const o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,u=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new Ve,h=new WeakMap,f=new Set;let d;const p=new WeakMap;let _=!1;try{_=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function x(L,M){return _?new OffscreenCanvas(L,M):is("canvas")}function g(L,M,U){let V=1;const Z=ke(L);if((Z.width>U||Z.height>U)&&(V=U/Math.max(Z.width,Z.height)),V<1)if(typeof HTMLImageElement<"u"&&L instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&L instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&L instanceof ImageBitmap||typeof VideoFrame<"u"&&L instanceof VideoFrame){const le=Math.floor(V*Z.width),he=Math.floor(V*Z.height);d===void 0&&(d=x(le,he));const Q=M?x(le,he):d;return Q.width=le,Q.height=he,Q.getContext("2d").drawImage(L,0,0,le,he),He("WebGLRenderer: Texture has been resized from ("+Z.width+"x"+Z.height+") to ("+le+"x"+he+")."),Q}else return"data"in L&&He("WebGLRenderer: Image in DataTexture is too big ("+Z.width+"x"+Z.height+")."),L;return L}function m(L){return L.generateMipmaps}function v(L){n.generateMipmap(L)}function E(L){return L.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:L.isWebGL3DRenderTarget?n.TEXTURE_3D:L.isWebGLArrayRenderTarget||L.isCompressedArrayTexture?n.TEXTURE_2D_ARRAY:n.TEXTURE_2D}function b(L,M,U,V,Z,le=!1){if(L!==null){if(n[L]!==void 0)return n[L];He("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+L+"'")}let he;V&&(he=e.get("EXT_texture_norm16"),he||He("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let Q=M;if(M===n.RED&&(U===n.FLOAT&&(Q=n.R32F),U===n.HALF_FLOAT&&(Q=n.R16F),U===n.UNSIGNED_BYTE&&(Q=n.R8),U===n.UNSIGNED_SHORT&&he&&(Q=he.R16_EXT),U===n.SHORT&&he&&(Q=he.R16_SNORM_EXT)),M===n.RED_INTEGER&&(U===n.UNSIGNED_BYTE&&(Q=n.R8UI),U===n.UNSIGNED_SHORT&&(Q=n.R16UI),U===n.UNSIGNED_INT&&(Q=n.R32UI),U===n.BYTE&&(Q=n.R8I),U===n.SHORT&&(Q=n.R16I),U===n.INT&&(Q=n.R32I)),M===n.RG&&(U===n.FLOAT&&(Q=n.RG32F),U===n.HALF_FLOAT&&(Q=n.RG16F),U===n.UNSIGNED_BYTE&&(Q=n.RG8),U===n.UNSIGNED_SHORT&&he&&(Q=he.RG16_EXT),U===n.SHORT&&he&&(Q=he.RG16_SNORM_EXT)),M===n.RG_INTEGER&&(U===n.UNSIGNED_BYTE&&(Q=n.RG8UI),U===n.UNSIGNED_SHORT&&(Q=n.RG16UI),U===n.UNSIGNED_INT&&(Q=n.RG32UI),U===n.BYTE&&(Q=n.RG8I),U===n.SHORT&&(Q=n.RG16I),U===n.INT&&(Q=n.RG32I)),M===n.RGB_INTEGER&&(U===n.UNSIGNED_BYTE&&(Q=n.RGB8UI),U===n.UNSIGNED_SHORT&&(Q=n.RGB16UI),U===n.UNSIGNED_INT&&(Q=n.RGB32UI),U===n.BYTE&&(Q=n.RGB8I),U===n.SHORT&&(Q=n.RGB16I),U===n.INT&&(Q=n.RGB32I)),M===n.RGBA_INTEGER&&(U===n.UNSIGNED_BYTE&&(Q=n.RGBA8UI),U===n.UNSIGNED_SHORT&&(Q=n.RGBA16UI),U===n.UNSIGNED_INT&&(Q=n.RGBA32UI),U===n.BYTE&&(Q=n.RGBA8I),U===n.SHORT&&(Q=n.RGBA16I),U===n.INT&&(Q=n.RGBA32I)),M===n.RGB&&(U===n.UNSIGNED_SHORT&&he&&(Q=he.RGB16_EXT),U===n.SHORT&&he&&(Q=he.RGB16_SNORM_EXT),U===n.UNSIGNED_INT_5_9_9_9_REV&&(Q=n.RGB9_E5),U===n.UNSIGNED_INT_10F_11F_11F_REV&&(Q=n.R11F_G11F_B10F)),M===n.RGBA){const te=le?ts:tt.getTransfer(Z);U===n.FLOAT&&(Q=n.RGBA32F),U===n.HALF_FLOAT&&(Q=n.RGBA16F),U===n.UNSIGNED_BYTE&&(Q=te===mt?n.SRGB8_ALPHA8:n.RGBA8),U===n.UNSIGNED_SHORT&&he&&(Q=he.RGBA16_EXT),U===n.SHORT&&he&&(Q=he.RGBA16_SNORM_EXT),U===n.UNSIGNED_SHORT_4_4_4_4&&(Q=n.RGBA4),U===n.UNSIGNED_SHORT_5_5_5_1&&(Q=n.RGB5_A1)}return(Q===n.R16F||Q===n.R32F||Q===n.RG16F||Q===n.RG32F||Q===n.RGBA16F||Q===n.RGBA32F)&&e.get("EXT_color_buffer_float"),Q}function R(L,M){let U;return L?M===null||M===Qn||M===na?U=n.DEPTH24_STENCIL8:M===Kn?U=n.DEPTH32F_STENCIL8:M===ta&&(U=n.DEPTH24_STENCIL8,He("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):M===null||M===Qn||M===na?U=n.DEPTH_COMPONENT24:M===Kn?U=n.DEPTH_COMPONENT32F:M===ta&&(U=n.DEPTH_COMPONENT16),U}function A(L,M){return m(L)===!0||L.isFramebufferTexture&&L.minFilter!==Gt&&L.minFilter!==Bt?Math.log2(Math.max(M.width,M.height))+1:L.mipmaps!==void 0&&L.mipmaps.length>0?L.mipmaps.length:L.isCompressedTexture&&Array.isArray(L.image)?M.mipmaps.length:1}function D(L){const M=L.target;M.removeEventListener("dispose",D),T(M),M.isVideoTexture&&h.delete(M),M.isHTMLTexture&&f.delete(M)}function S(L){const M=L.target;M.removeEventListener("dispose",S),C(M)}function T(L){const M=i.get(L);if(M.__webglInit===void 0)return;const U=L.source,V=p.get(U);if(V){const Z=V[M.__cacheKey];Z.usedTimes--,Z.usedTimes===0&&I(L),Object.keys(V).length===0&&p.delete(U)}i.remove(L)}function I(L){const M=i.get(L);n.deleteTexture(M.__webglTexture);const U=L.source,V=p.get(U);delete V[M.__cacheKey],s.memory.textures--}function C(L){const M=i.get(L);if(L.depthTexture&&(L.depthTexture.dispose(),i.remove(L.depthTexture)),L.isWebGLCubeRenderTarget)for(let V=0;V<6;V++){if(Array.isArray(M.__webglFramebuffer[V]))for(let Z=0;Z<M.__webglFramebuffer[V].length;Z++)n.deleteFramebuffer(M.__webglFramebuffer[V][Z]);else n.deleteFramebuffer(M.__webglFramebuffer[V]);M.__webglDepthbuffer&&n.deleteRenderbuffer(M.__webglDepthbuffer[V])}else{if(Array.isArray(M.__webglFramebuffer))for(let V=0;V<M.__webglFramebuffer.length;V++)n.deleteFramebuffer(M.__webglFramebuffer[V]);else n.deleteFramebuffer(M.__webglFramebuffer);if(M.__webglDepthbuffer&&n.deleteRenderbuffer(M.__webglDepthbuffer),M.__webglMultisampledFramebuffer&&n.deleteFramebuffer(M.__webglMultisampledFramebuffer),M.__webglColorRenderbuffer)for(let V=0;V<M.__webglColorRenderbuffer.length;V++)M.__webglColorRenderbuffer[V]&&n.deleteRenderbuffer(M.__webglColorRenderbuffer[V]);M.__webglDepthRenderbuffer&&n.deleteRenderbuffer(M.__webglDepthRenderbuffer)}const U=L.textures;for(let V=0,Z=U.length;V<Z;V++){const le=i.get(U[V]);le.__webglTexture&&(n.deleteTexture(le.__webglTexture),s.memory.textures--),i.remove(U[V])}i.remove(L)}let F=0;function O(){F=0}function P(){return F}function B(L){F=L}function W(){const L=F;return L>=r.maxTextures&&He("WebGLTextures: Trying to use "+(L+1)+" texture units while this GPU supports only "+r.maxTextures),F+=1,L}function $(L){const M=[];return M.push(L.wrapS),M.push(L.wrapT),M.push(L.wrapR||0),M.push(L.magFilter),M.push(L.minFilter),M.push(L.anisotropy),M.push(L.internalFormat),M.push(L.format),M.push(L.type),M.push(L.generateMipmaps),M.push(L.premultiplyAlpha),M.push(L.flipY),M.push(L.unpackAlignment),M.push(L.colorSpace),M.join()}function ae(L,M){const U=i.get(L);if(L.isVideoTexture&&z(L),L.isRenderTargetTexture===!1&&L.isExternalTexture!==!0&&L.version>0&&U.__version!==L.version){const V=L.image;if(V===null)He("WebGLRenderer: Texture marked for update but no image data found.");else if(V.complete===!1)He("WebGLRenderer: Texture marked for update but image is incomplete");else{G(U,L,M);return}}else L.isExternalTexture&&(U.__webglTexture=L.sourceTexture?L.sourceTexture:null);t.bindTexture(n.TEXTURE_2D,U.__webglTexture,n.TEXTURE0+M)}function q(L,M){const U=i.get(L);if(L.isRenderTargetTexture===!1&&L.version>0&&U.__version!==L.version){G(U,L,M);return}else L.isExternalTexture&&(U.__webglTexture=L.sourceTexture?L.sourceTexture:null);t.bindTexture(n.TEXTURE_2D_ARRAY,U.__webglTexture,n.TEXTURE0+M)}function ee(L,M){const U=i.get(L);if(L.isRenderTargetTexture===!1&&L.version>0&&U.__version!==L.version){G(U,L,M);return}t.bindTexture(n.TEXTURE_3D,U.__webglTexture,n.TEXTURE0+M)}function N(L,M){const U=i.get(L);if(L.isCubeDepthTexture!==!0&&L.version>0&&U.__version!==L.version){ue(U,L,M);return}t.bindTexture(n.TEXTURE_CUBE_MAP,U.__webglTexture,n.TEXTURE0+M)}const re={[ho]:n.REPEAT,[hi]:n.CLAMP_TO_EDGE,[fo]:n.MIRRORED_REPEAT},ce={[Gt]:n.NEAREST,[h0]:n.NEAREST_MIPMAP_NEAREST,[ga]:n.NEAREST_MIPMAP_LINEAR,[Bt]:n.LINEAR,[ys]:n.LINEAR_MIPMAP_NEAREST,[Wi]:n.LINEAR_MIPMAP_LINEAR},Re={[m0]:n.NEVER,[v0]:n.ALWAYS,[g0]:n.LESS,[dl]:n.LEQUAL,[_0]:n.EQUAL,[fl]:n.GEQUAL,[x0]:n.GREATER,[M0]:n.NOTEQUAL};function Fe(L,M){if(M.type===Kn&&e.has("OES_texture_float_linear")===!1&&(M.magFilter===Bt||M.magFilter===ys||M.magFilter===ga||M.magFilter===Wi||M.minFilter===Bt||M.minFilter===ys||M.minFilter===ga||M.minFilter===Wi)&&He("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),n.texParameteri(L,n.TEXTURE_WRAP_S,re[M.wrapS]),n.texParameteri(L,n.TEXTURE_WRAP_T,re[M.wrapT]),(L===n.TEXTURE_3D||L===n.TEXTURE_2D_ARRAY)&&n.texParameteri(L,n.TEXTURE_WRAP_R,re[M.wrapR]),n.texParameteri(L,n.TEXTURE_MAG_FILTER,ce[M.magFilter]),n.texParameteri(L,n.TEXTURE_MIN_FILTER,ce[M.minFilter]),M.compareFunction&&(n.texParameteri(L,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(L,n.TEXTURE_COMPARE_FUNC,Re[M.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(M.magFilter===Gt||M.minFilter!==ga&&M.minFilter!==Wi||M.type===Kn&&e.has("OES_texture_float_linear")===!1)return;if(M.anisotropy>1||i.get(M).__currentAnisotropy){const U=e.get("EXT_texture_filter_anisotropic");n.texParameterf(L,U.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(M.anisotropy,r.getMaxAnisotropy())),i.get(M).__currentAnisotropy=M.anisotropy}}}function ze(L,M){let U=!1;L.__webglInit===void 0&&(L.__webglInit=!0,M.addEventListener("dispose",D));const V=M.source;let Z=p.get(V);Z===void 0&&(Z={},p.set(V,Z));const le=$(M);if(le!==L.__cacheKey){Z[le]===void 0&&(Z[le]={texture:n.createTexture(),usedTimes:0},s.memory.textures++,U=!0),Z[le].usedTimes++;const he=Z[L.__cacheKey];he!==void 0&&(Z[L.__cacheKey].usedTimes--,he.usedTimes===0&&I(M)),L.__cacheKey=le,L.__webglTexture=Z[le].texture}return U}function j(L,M,U){return Math.floor(Math.floor(L/U)/M)}function ie(L,M,U,V){const le=L.updateRanges;if(le.length===0)t.texSubImage2D(n.TEXTURE_2D,0,0,0,M.width,M.height,U,V,M.data);else{le.sort((Le,ge)=>Le.start-ge.start);let he=0;for(let Le=1;Le<le.length;Le++){const ge=le[he],fe=le[Le],Ie=ge.start+ge.count,Be=j(fe.start,M.width,4),Xe=j(ge.start,M.width,4);fe.start<=Ie+1&&Be===Xe&&j(fe.start+fe.count-1,M.width,4)===Be?ge.count=Math.max(ge.count,fe.start+fe.count-ge.start):(++he,le[he]=fe)}le.length=he+1;const Q=t.getParameter(n.UNPACK_ROW_LENGTH),te=t.getParameter(n.UNPACK_SKIP_PIXELS),de=t.getParameter(n.UNPACK_SKIP_ROWS);t.pixelStorei(n.UNPACK_ROW_LENGTH,M.width);for(let Le=0,ge=le.length;Le<ge;Le++){const fe=le[Le],Ie=Math.floor(fe.start/4),Be=Math.ceil(fe.count/4),Xe=Ie%M.width,H=Math.floor(Ie/M.width),pe=Be,ne=1;t.pixelStorei(n.UNPACK_SKIP_PIXELS,Xe),t.pixelStorei(n.UNPACK_SKIP_ROWS,H),t.texSubImage2D(n.TEXTURE_2D,0,Xe,H,pe,ne,U,V,M.data)}L.clearUpdateRanges(),t.pixelStorei(n.UNPACK_ROW_LENGTH,Q),t.pixelStorei(n.UNPACK_SKIP_PIXELS,te),t.pixelStorei(n.UNPACK_SKIP_ROWS,de)}}function G(L,M,U){let V=n.TEXTURE_2D;(M.isDataArrayTexture||M.isCompressedArrayTexture)&&(V=n.TEXTURE_2D_ARRAY),M.isData3DTexture&&(V=n.TEXTURE_3D);const Z=ze(L,M),le=M.source;t.bindTexture(V,L.__webglTexture,n.TEXTURE0+U);const he=i.get(le);if(le.version!==he.__version||Z===!0){if(t.activeTexture(n.TEXTURE0+U),(typeof ImageBitmap<"u"&&M.image instanceof ImageBitmap)===!1){const ne=tt.getPrimaries(tt.workingColorSpace),me=M.colorSpace===Pn?null:tt.getPrimaries(M.colorSpace),Se=M.colorSpace===Pn||ne===me?n.NONE:n.BROWSER_DEFAULT_WEBGL;t.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,M.flipY),t.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,M.premultiplyAlpha),t.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,Se)}t.pixelStorei(n.UNPACK_ALIGNMENT,M.unpackAlignment);let te=g(M.image,!1,r.maxTextureSize);te=$e(M,te);const de=a.convert(M.format,M.colorSpace),Le=a.convert(M.type);let ge=b(M.internalFormat,de,Le,M.normalized,M.colorSpace,M.isVideoTexture);Fe(V,M);let fe;const Ie=M.mipmaps,Be=M.isVideoTexture!==!0,Xe=he.__version===void 0||Z===!0,H=le.dataReady,pe=A(M,te);if(M.isDepthTexture)ge=R(M.format===Yi,M.type),Xe&&(Be?t.texStorage2D(n.TEXTURE_2D,1,ge,te.width,te.height):t.texImage2D(n.TEXTURE_2D,0,ge,te.width,te.height,0,de,Le,null));else if(M.isDataTexture)if(Ie.length>0){Be&&Xe&&t.texStorage2D(n.TEXTURE_2D,pe,ge,Ie[0].width,Ie[0].height);for(let ne=0,me=Ie.length;ne<me;ne++)fe=Ie[ne],Be?H&&t.texSubImage2D(n.TEXTURE_2D,ne,0,0,fe.width,fe.height,de,Le,fe.data):t.texImage2D(n.TEXTURE_2D,ne,ge,fe.width,fe.height,0,de,Le,fe.data);M.generateMipmaps=!1}else Be?(Xe&&t.texStorage2D(n.TEXTURE_2D,pe,ge,te.width,te.height),H&&ie(M,te,de,Le)):t.texImage2D(n.TEXTURE_2D,0,ge,te.width,te.height,0,de,Le,te.data);else if(M.isCompressedTexture)if(M.isCompressedArrayTexture){Be&&Xe&&t.texStorage3D(n.TEXTURE_2D_ARRAY,pe,ge,Ie[0].width,Ie[0].height,te.depth);for(let ne=0,me=Ie.length;ne<me;ne++)if(fe=Ie[ne],M.format!==yn)if(de!==null)if(Be){if(H)if(M.layerUpdates.size>0){const Se=cc(fe.width,fe.height,M.format,M.type);for(const oe of M.layerUpdates){const Ne=fe.data.subarray(oe*Se/fe.data.BYTES_PER_ELEMENT,(oe+1)*Se/fe.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,ne,0,0,oe,fe.width,fe.height,1,de,Ne)}}else t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,ne,0,0,0,fe.width,fe.height,te.depth,de,fe.data)}else t.compressedTexImage3D(n.TEXTURE_2D_ARRAY,ne,ge,fe.width,fe.height,te.depth,0,fe.data,0,0);else He("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Be?H&&t.texSubImage3D(n.TEXTURE_2D_ARRAY,ne,0,0,0,fe.width,fe.height,te.depth,de,Le,fe.data):t.texImage3D(n.TEXTURE_2D_ARRAY,ne,ge,fe.width,fe.height,te.depth,0,de,Le,fe.data);M.layerUpdates.size>0&&M.clearLayerUpdates()}else{Be&&Xe&&t.texStorage2D(n.TEXTURE_2D,pe,ge,Ie[0].width,Ie[0].height);for(let ne=0,me=Ie.length;ne<me;ne++)fe=Ie[ne],M.format!==yn?de!==null?Be?H&&t.compressedTexSubImage2D(n.TEXTURE_2D,ne,0,0,fe.width,fe.height,de,fe.data):t.compressedTexImage2D(n.TEXTURE_2D,ne,ge,fe.width,fe.height,0,fe.data):He("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Be?H&&t.texSubImage2D(n.TEXTURE_2D,ne,0,0,fe.width,fe.height,de,Le,fe.data):t.texImage2D(n.TEXTURE_2D,ne,ge,fe.width,fe.height,0,de,Le,fe.data)}else if(M.isDataArrayTexture)if(Be){if(Xe&&t.texStorage3D(n.TEXTURE_2D_ARRAY,pe,ge,te.width,te.height,te.depth),H)if(M.layerUpdates.size>0){const ne=cc(te.width,te.height,M.format,M.type);for(const me of M.layerUpdates){const Se=te.data.subarray(me*ne/te.data.BYTES_PER_ELEMENT,(me+1)*ne/te.data.BYTES_PER_ELEMENT);t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,me,te.width,te.height,1,de,Le,Se)}M.clearLayerUpdates()}else t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,te.width,te.height,te.depth,de,Le,te.data)}else t.texImage3D(n.TEXTURE_2D_ARRAY,0,ge,te.width,te.height,te.depth,0,de,Le,te.data);else if(M.isData3DTexture)Be?(Xe&&t.texStorage3D(n.TEXTURE_3D,pe,ge,te.width,te.height,te.depth),H&&t.texSubImage3D(n.TEXTURE_3D,0,0,0,0,te.width,te.height,te.depth,de,Le,te.data)):t.texImage3D(n.TEXTURE_3D,0,ge,te.width,te.height,te.depth,0,de,Le,te.data);else if(M.isFramebufferTexture){if(Xe)if(Be)t.texStorage2D(n.TEXTURE_2D,pe,ge,te.width,te.height);else{let ne=te.width,me=te.height;for(let Se=0;Se<pe;Se++)t.texImage2D(n.TEXTURE_2D,Se,ge,ne,me,0,de,Le,null),ne>>=1,me>>=1}}else if(M.isHTMLTexture){if("texElementImage2D"in n){const ne=n.canvas;if(ne.hasAttribute("layoutsubtree")||ne.setAttribute("layoutsubtree","true"),te.parentNode!==ne){ne.appendChild(te),f.add(M),ne.onpaint=me=>{const Se=me.changedElements;for(const oe of f)Se.includes(oe.image)&&(oe.needsUpdate=!0)},ne.requestPaint();return}if(n.texElementImage2D.length===3)n.texElementImage2D(n.TEXTURE_2D,n.RGBA8,te);else{const Se=n.RGBA,oe=n.RGBA,Ne=n.UNSIGNED_BYTE;n.texElementImage2D(n.TEXTURE_2D,0,Se,oe,Ne,te)}n.texParameteri(n.TEXTURE_2D,n.TEXTURE_MIN_FILTER,n.LINEAR),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_S,n.CLAMP_TO_EDGE),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_T,n.CLAMP_TO_EDGE)}}else if(Ie.length>0){if(Be&&Xe){const ne=ke(Ie[0]);t.texStorage2D(n.TEXTURE_2D,pe,ge,ne.width,ne.height)}for(let ne=0,me=Ie.length;ne<me;ne++)fe=Ie[ne],Be?H&&t.texSubImage2D(n.TEXTURE_2D,ne,0,0,de,Le,fe):t.texImage2D(n.TEXTURE_2D,ne,ge,de,Le,fe);M.generateMipmaps=!1}else if(Be){if(Xe){const ne=ke(te);t.texStorage2D(n.TEXTURE_2D,pe,ge,ne.width,ne.height)}H&&t.texSubImage2D(n.TEXTURE_2D,0,0,0,de,Le,te)}else t.texImage2D(n.TEXTURE_2D,0,ge,de,Le,te);m(M)&&v(V),he.__version=le.version,M.onUpdate&&M.onUpdate(M)}L.__version=M.version}function ue(L,M,U){if(M.image.length!==6)return;const V=ze(L,M),Z=M.source;t.bindTexture(n.TEXTURE_CUBE_MAP,L.__webglTexture,n.TEXTURE0+U);const le=i.get(Z);if(Z.version!==le.__version||V===!0){t.activeTexture(n.TEXTURE0+U);const he=tt.getPrimaries(tt.workingColorSpace),Q=M.colorSpace===Pn?null:tt.getPrimaries(M.colorSpace),te=M.colorSpace===Pn||he===Q?n.NONE:n.BROWSER_DEFAULT_WEBGL;t.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,M.flipY),t.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,M.premultiplyAlpha),t.pixelStorei(n.UNPACK_ALIGNMENT,M.unpackAlignment),t.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,te);const de=M.isCompressedTexture||M.image[0].isCompressedTexture,Le=M.image[0]&&M.image[0].isDataTexture,ge=[];for(let oe=0;oe<6;oe++)!de&&!Le?ge[oe]=g(M.image[oe],!0,r.maxCubemapSize):ge[oe]=Le?M.image[oe].image:M.image[oe],ge[oe]=$e(M,ge[oe]);const fe=ge[0],Ie=a.convert(M.format,M.colorSpace),Be=a.convert(M.type),Xe=b(M.internalFormat,Ie,Be,M.normalized,M.colorSpace),H=M.isVideoTexture!==!0,pe=le.__version===void 0||V===!0,ne=Z.dataReady;let me=A(M,fe);Fe(n.TEXTURE_CUBE_MAP,M);let Se;if(de){H&&pe&&t.texStorage2D(n.TEXTURE_CUBE_MAP,me,Xe,fe.width,fe.height);for(let oe=0;oe<6;oe++){Se=ge[oe].mipmaps;for(let Ne=0;Ne<Se.length;Ne++){const De=Se[Ne];M.format!==yn?Ie!==null?H?ne&&t.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+oe,Ne,0,0,De.width,De.height,Ie,De.data):t.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+oe,Ne,Xe,De.width,De.height,0,De.data):He("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):H?ne&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+oe,Ne,0,0,De.width,De.height,Ie,Be,De.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+oe,Ne,Xe,De.width,De.height,0,Ie,Be,De.data)}}}else{if(Se=M.mipmaps,H&&pe){Se.length>0&&me++;const oe=ke(ge[0]);t.texStorage2D(n.TEXTURE_CUBE_MAP,me,Xe,oe.width,oe.height)}for(let oe=0;oe<6;oe++)if(Le){H?ne&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+oe,0,0,0,ge[oe].width,ge[oe].height,Ie,Be,ge[oe].data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+oe,0,Xe,ge[oe].width,ge[oe].height,0,Ie,Be,ge[oe].data);for(let Ne=0;Ne<Se.length;Ne++){const Et=Se[Ne].image[oe].image;H?ne&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+oe,Ne+1,0,0,Et.width,Et.height,Ie,Be,Et.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+oe,Ne+1,Xe,Et.width,Et.height,0,Ie,Be,Et.data)}}else{H?ne&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+oe,0,0,0,Ie,Be,ge[oe]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+oe,0,Xe,Ie,Be,ge[oe]);for(let Ne=0;Ne<Se.length;Ne++){const De=Se[Ne];H?ne&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+oe,Ne+1,0,0,Ie,Be,De.image[oe]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+oe,Ne+1,Xe,Ie,Be,De.image[oe])}}}m(M)&&v(n.TEXTURE_CUBE_MAP),le.__version=Z.version,M.onUpdate&&M.onUpdate(M)}L.__version=M.version}function se(L,M,U,V,Z,le){const he=a.convert(U.format,U.colorSpace),Q=a.convert(U.type),te=b(U.internalFormat,he,Q,U.normalized,U.colorSpace),de=i.get(M),Le=i.get(U);if(Le.__renderTarget=M,!de.__hasExternalTextures){const ge=Math.max(1,M.width>>le),fe=Math.max(1,M.height>>le);Z===n.TEXTURE_3D||Z===n.TEXTURE_2D_ARRAY?t.texImage3D(Z,le,te,ge,fe,M.depth,0,he,Q,null):t.texImage2D(Z,le,te,ge,fe,0,he,Q,null)}t.bindFramebuffer(n.FRAMEBUFFER,L),St(M)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,V,Z,Le.__webglTexture,0,_t(M)):(Z===n.TEXTURE_2D||Z>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&Z<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,V,Z,Le.__webglTexture,le),t.bindFramebuffer(n.FRAMEBUFFER,null)}function ye(L,M,U){if(n.bindRenderbuffer(n.RENDERBUFFER,L),M.depthBuffer){const V=M.depthTexture,Z=V&&V.isDepthTexture?V.type:null,le=R(M.stencilBuffer,Z),he=M.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;St(M)?o.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,_t(M),le,M.width,M.height):U?n.renderbufferStorageMultisample(n.RENDERBUFFER,_t(M),le,M.width,M.height):n.renderbufferStorage(n.RENDERBUFFER,le,M.width,M.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,he,n.RENDERBUFFER,L)}else{const V=M.textures;for(let Z=0;Z<V.length;Z++){const le=V[Z],he=a.convert(le.format,le.colorSpace),Q=a.convert(le.type),te=b(le.internalFormat,he,Q,le.normalized,le.colorSpace);St(M)?o.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,_t(M),te,M.width,M.height):U?n.renderbufferStorageMultisample(n.RENDERBUFFER,_t(M),te,M.width,M.height):n.renderbufferStorage(n.RENDERBUFFER,te,M.width,M.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function Ze(L,M,U){const V=M.isWebGLCubeRenderTarget===!0;if(t.bindFramebuffer(n.FRAMEBUFFER,L),!(M.depthTexture&&M.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");const Z=i.get(M.depthTexture);if(Z.__renderTarget=M,(!Z.__webglTexture||M.depthTexture.image.width!==M.width||M.depthTexture.image.height!==M.height)&&(M.depthTexture.image.width=M.width,M.depthTexture.image.height=M.height,M.depthTexture.needsUpdate=!0),V){if(Z.__webglInit===void 0&&(Z.__webglInit=!0,M.depthTexture.addEventListener("dispose",D)),Z.__webglTexture===void 0){Z.__webglTexture=n.createTexture(),t.bindTexture(n.TEXTURE_CUBE_MAP,Z.__webglTexture),Fe(n.TEXTURE_CUBE_MAP,M.depthTexture);const de=a.convert(M.depthTexture.format),Le=a.convert(M.depthTexture.type);let ge;M.depthTexture.format===xi?ge=n.DEPTH_COMPONENT24:M.depthTexture.format===Yi&&(ge=n.DEPTH24_STENCIL8);for(let fe=0;fe<6;fe++)n.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+fe,0,ge,M.width,M.height,0,de,Le,null)}}else ae(M.depthTexture,0);const le=Z.__webglTexture,he=_t(M),Q=V?n.TEXTURE_CUBE_MAP_POSITIVE_X+U:n.TEXTURE_2D,te=M.depthTexture.format===Yi?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;if(M.depthTexture.format===xi)St(M)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,te,Q,le,0,he):n.framebufferTexture2D(n.FRAMEBUFFER,te,Q,le,0);else if(M.depthTexture.format===Yi)St(M)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,te,Q,le,0,he):n.framebufferTexture2D(n.FRAMEBUFFER,te,Q,le,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function Ce(L){const M=i.get(L),U=L.isWebGLCubeRenderTarget===!0;if(M.__boundDepthTexture!==L.depthTexture){const V=L.depthTexture;if(M.__depthDisposeCallback&&M.__depthDisposeCallback(),V){const Z=()=>{delete M.__boundDepthTexture,delete M.__depthDisposeCallback,V.removeEventListener("dispose",Z)};V.addEventListener("dispose",Z),M.__depthDisposeCallback=Z}M.__boundDepthTexture=V}if(L.depthTexture&&!M.__autoAllocateDepthBuffer)if(U)for(let V=0;V<6;V++)Ze(M.__webglFramebuffer[V],L,V);else{const V=L.texture.mipmaps;V&&V.length>0?Ze(M.__webglFramebuffer[0],L,0):Ze(M.__webglFramebuffer,L,0)}else if(U){M.__webglDepthbuffer=[];for(let V=0;V<6;V++)if(t.bindFramebuffer(n.FRAMEBUFFER,M.__webglFramebuffer[V]),M.__webglDepthbuffer[V]===void 0)M.__webglDepthbuffer[V]=n.createRenderbuffer(),ye(M.__webglDepthbuffer[V],L,!1);else{const Z=L.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,le=M.__webglDepthbuffer[V];n.bindRenderbuffer(n.RENDERBUFFER,le),n.framebufferRenderbuffer(n.FRAMEBUFFER,Z,n.RENDERBUFFER,le)}}else{const V=L.texture.mipmaps;if(V&&V.length>0?t.bindFramebuffer(n.FRAMEBUFFER,M.__webglFramebuffer[0]):t.bindFramebuffer(n.FRAMEBUFFER,M.__webglFramebuffer),M.__webglDepthbuffer===void 0)M.__webglDepthbuffer=n.createRenderbuffer(),ye(M.__webglDepthbuffer,L,!1);else{const Z=L.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,le=M.__webglDepthbuffer;n.bindRenderbuffer(n.RENDERBUFFER,le),n.framebufferRenderbuffer(n.FRAMEBUFFER,Z,n.RENDERBUFFER,le)}}t.bindFramebuffer(n.FRAMEBUFFER,null)}function Ue(L,M,U){const V=i.get(L);M!==void 0&&se(V.__webglFramebuffer,L,L.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),U!==void 0&&Ce(L)}function Ye(L){const M=L.texture,U=i.get(L),V=i.get(M);L.addEventListener("dispose",S);const Z=L.textures,le=L.isWebGLCubeRenderTarget===!0,he=Z.length>1;if(he||(V.__webglTexture===void 0&&(V.__webglTexture=n.createTexture()),V.__version=M.version,s.memory.textures++),le){U.__webglFramebuffer=[];for(let Q=0;Q<6;Q++)if(M.mipmaps&&M.mipmaps.length>0){U.__webglFramebuffer[Q]=[];for(let te=0;te<M.mipmaps.length;te++)U.__webglFramebuffer[Q][te]=n.createFramebuffer()}else U.__webglFramebuffer[Q]=n.createFramebuffer()}else{if(M.mipmaps&&M.mipmaps.length>0){U.__webglFramebuffer=[];for(let Q=0;Q<M.mipmaps.length;Q++)U.__webglFramebuffer[Q]=n.createFramebuffer()}else U.__webglFramebuffer=n.createFramebuffer();if(he)for(let Q=0,te=Z.length;Q<te;Q++){const de=i.get(Z[Q]);de.__webglTexture===void 0&&(de.__webglTexture=n.createTexture(),s.memory.textures++)}if(L.samples>0&&St(L)===!1){U.__webglMultisampledFramebuffer=n.createFramebuffer(),U.__webglColorRenderbuffer=[],t.bindFramebuffer(n.FRAMEBUFFER,U.__webglMultisampledFramebuffer);for(let Q=0;Q<Z.length;Q++){const te=Z[Q];U.__webglColorRenderbuffer[Q]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,U.__webglColorRenderbuffer[Q]);const de=a.convert(te.format,te.colorSpace),Le=a.convert(te.type),ge=b(te.internalFormat,de,Le,te.normalized,te.colorSpace,L.isXRRenderTarget===!0),fe=_t(L);n.renderbufferStorageMultisample(n.RENDERBUFFER,fe,ge,L.width,L.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+Q,n.RENDERBUFFER,U.__webglColorRenderbuffer[Q])}n.bindRenderbuffer(n.RENDERBUFFER,null),L.depthBuffer&&(U.__webglDepthRenderbuffer=n.createRenderbuffer(),ye(U.__webglDepthRenderbuffer,L,!0)),t.bindFramebuffer(n.FRAMEBUFFER,null)}}if(le){t.bindTexture(n.TEXTURE_CUBE_MAP,V.__webglTexture),Fe(n.TEXTURE_CUBE_MAP,M);for(let Q=0;Q<6;Q++)if(M.mipmaps&&M.mipmaps.length>0)for(let te=0;te<M.mipmaps.length;te++)se(U.__webglFramebuffer[Q][te],L,M,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+Q,te);else se(U.__webglFramebuffer[Q],L,M,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+Q,0);m(M)&&v(n.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(he){for(let Q=0,te=Z.length;Q<te;Q++){const de=Z[Q],Le=i.get(de);let ge=n.TEXTURE_2D;(L.isWebGL3DRenderTarget||L.isWebGLArrayRenderTarget)&&(ge=L.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(ge,Le.__webglTexture),Fe(ge,de),se(U.__webglFramebuffer,L,de,n.COLOR_ATTACHMENT0+Q,ge,0),m(de)&&v(ge)}t.unbindTexture()}else{let Q=n.TEXTURE_2D;if((L.isWebGL3DRenderTarget||L.isWebGLArrayRenderTarget)&&(Q=L.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(Q,V.__webglTexture),Fe(Q,M),M.mipmaps&&M.mipmaps.length>0)for(let te=0;te<M.mipmaps.length;te++)se(U.__webglFramebuffer[te],L,M,n.COLOR_ATTACHMENT0,Q,te);else se(U.__webglFramebuffer,L,M,n.COLOR_ATTACHMENT0,Q,0);m(M)&&v(Q),t.unbindTexture()}L.depthBuffer&&Ce(L)}function We(L){const M=L.textures;for(let U=0,V=M.length;U<V;U++){const Z=M[U];if(m(Z)){const le=E(L),he=i.get(Z).__webglTexture;t.bindTexture(le,he),v(le),t.unbindTexture()}}}const vt=[],Dt=[];function Yt(L){if(L.samples>0){if(St(L)===!1){const M=L.textures,U=L.width,V=L.height;let Z=n.COLOR_BUFFER_BIT;const le=L.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,he=i.get(L),Q=M.length>1;if(Q)for(let de=0;de<M.length;de++)t.bindFramebuffer(n.FRAMEBUFFER,he.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+de,n.RENDERBUFFER,null),t.bindFramebuffer(n.FRAMEBUFFER,he.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+de,n.TEXTURE_2D,null,0);t.bindFramebuffer(n.READ_FRAMEBUFFER,he.__webglMultisampledFramebuffer);const te=L.texture.mipmaps;te&&te.length>0?t.bindFramebuffer(n.DRAW_FRAMEBUFFER,he.__webglFramebuffer[0]):t.bindFramebuffer(n.DRAW_FRAMEBUFFER,he.__webglFramebuffer);for(let de=0;de<M.length;de++){if(L.resolveDepthBuffer&&(L.depthBuffer&&(Z|=n.DEPTH_BUFFER_BIT),L.stencilBuffer&&L.resolveStencilBuffer&&(Z|=n.STENCIL_BUFFER_BIT)),Q){n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,he.__webglColorRenderbuffer[de]);const Le=i.get(M[de]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,Le,0)}n.blitFramebuffer(0,0,U,V,0,0,U,V,Z,n.NEAREST),u===!0&&(vt.length=0,Dt.length=0,vt.push(n.COLOR_ATTACHMENT0+de),L.depthBuffer&&L.storeMultisampledDepthBuffer===!1&&(vt.push(le),Dt.push(le),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,Dt)),n.invalidateFramebuffer(n.READ_FRAMEBUFFER,vt))}if(t.bindFramebuffer(n.READ_FRAMEBUFFER,null),t.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),Q)for(let de=0;de<M.length;de++){t.bindFramebuffer(n.FRAMEBUFFER,he.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+de,n.RENDERBUFFER,he.__webglColorRenderbuffer[de]);const Le=i.get(M[de]).__webglTexture;t.bindFramebuffer(n.FRAMEBUFFER,he.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+de,n.TEXTURE_2D,Le,0)}t.bindFramebuffer(n.DRAW_FRAMEBUFFER,he.__webglMultisampledFramebuffer)}else if(L.depthBuffer&&L.storeMultisampledDepthBuffer===!1&&u){const M=L.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[M])}}}function _t(L){return Math.min(r.maxSamples,L.samples)}function St(L){const M=i.get(L);return L.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&M.__useRenderToTexture!==!1}function z(L){const M=s.render.frame;h.get(L)!==M&&(h.set(L,M),L.update())}function $e(L,M){const U=L.colorSpace,V=L.format,Z=L.type;return L.isCompressedTexture===!0||L.isVideoTexture===!0||U!==ia&&U!==Pn&&(tt.getTransfer(U)===mt?(V!==yn||Z!==_n)&&He("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):at("WebGLTextures: Unsupported texture color space:",U)),M}function ke(L){return typeof HTMLImageElement<"u"&&L instanceof HTMLImageElement?(c.width=L.naturalWidth||L.width,c.height=L.naturalHeight||L.height):typeof VideoFrame<"u"&&L instanceof VideoFrame?(c.width=L.displayWidth,c.height=L.displayHeight):(c.width=L.width,c.height=L.height),c}this.allocateTextureUnit=W,this.resetTextureUnits=O,this.getTextureUnits=P,this.setTextureUnits=B,this.setTexture2D=ae,this.setTexture2DArray=q,this.setTexture3D=ee,this.setTextureCube=N,this.rebindTextures=Ue,this.setupRenderTarget=Ye,this.updateRenderTargetMipmap=We,this.updateMultisampleRenderTarget=Yt,this.setupDepthRenderbuffer=Ce,this.setupFrameBufferTexture=se,this.useMultisampledRTT=St,this.isReversedDepthBuffer=function(){return t.buffers.depth.getReversed()}}function K2(n,e){function t(i,r=Pn){let a;const s=tt.getTransfer(r);if(i===_n)return n.UNSIGNED_BYTE;if(i===ol)return n.UNSIGNED_SHORT_4_4_4_4;if(i===ll)return n.UNSIGNED_SHORT_5_5_5_1;if(i===Mu)return n.UNSIGNED_INT_5_9_9_9_REV;if(i===vu)return n.UNSIGNED_INT_10F_11F_11F_REV;if(i===_u)return n.BYTE;if(i===xu)return n.SHORT;if(i===ta)return n.UNSIGNED_SHORT;if(i===sl)return n.INT;if(i===Qn)return n.UNSIGNED_INT;if(i===Kn)return n.FLOAT;if(i===jn)return n.HALF_FLOAT;if(i===Su)return n.ALPHA;if(i===bu)return n.RGB;if(i===yn)return n.RGBA;if(i===xi)return n.DEPTH_COMPONENT;if(i===Yi)return n.DEPTH_STENCIL;if(i===Eu)return n.RED;if(i===cl)return n.RED_INTEGER;if(i===Qi)return n.RG;if(i===ul)return n.RG_INTEGER;if(i===hl)return n.RGBA_INTEGER;if(i===Ka||i===qa||i===Za||i===$a)if(s===mt)if(a=e.get("WEBGL_compressed_texture_s3tc_srgb"),a!==null){if(i===Ka)return a.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===qa)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===Za)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===$a)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(a=e.get("WEBGL_compressed_texture_s3tc"),a!==null){if(i===Ka)return a.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===qa)return a.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===Za)return a.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===$a)return a.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===po||i===mo||i===go||i===_o)if(a=e.get("WEBGL_compressed_texture_pvrtc"),a!==null){if(i===po)return a.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===mo)return a.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===go)return a.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===_o)return a.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===xo||i===Mo||i===vo||i===So||i===bo||i===ja||i===Eo)if(a=e.get("WEBGL_compressed_texture_etc"),a!==null){if(i===xo||i===Mo)return s===mt?a.COMPRESSED_SRGB8_ETC2:a.COMPRESSED_RGB8_ETC2;if(i===vo)return s===mt?a.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:a.COMPRESSED_RGBA8_ETC2_EAC;if(i===So)return a.COMPRESSED_R11_EAC;if(i===bo)return a.COMPRESSED_SIGNED_R11_EAC;if(i===ja)return a.COMPRESSED_RG11_EAC;if(i===Eo)return a.COMPRESSED_SIGNED_RG11_EAC}else return null;if(i===yo||i===wo||i===Ao||i===To||i===Ro||i===Co||i===Lo||i===Do||i===Po||i===Io||i===No||i===Uo||i===Oo||i===Fo)if(a=e.get("WEBGL_compressed_texture_astc"),a!==null){if(i===yo)return s===mt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:a.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===wo)return s===mt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:a.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===Ao)return s===mt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:a.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===To)return s===mt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:a.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===Ro)return s===mt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:a.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===Co)return s===mt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:a.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===Lo)return s===mt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:a.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===Do)return s===mt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:a.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===Po)return s===mt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:a.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===Io)return s===mt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:a.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===No)return s===mt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:a.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===Uo)return s===mt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:a.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===Oo)return s===mt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:a.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===Fo)return s===mt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:a.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===Bo||i===ko||i===zo)if(a=e.get("EXT_texture_compression_bptc"),a!==null){if(i===Bo)return s===mt?a.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:a.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===ko)return a.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===zo)return a.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===Ho||i===Go||i===es||i===Vo)if(a=e.get("EXT_texture_compression_rgtc"),a!==null){if(i===Ho)return a.COMPRESSED_RED_RGTC1_EXT;if(i===Go)return a.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===es)return a.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===Vo)return a.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===na?n.UNSIGNED_INT_24_8:n[i]!==void 0?n[i]:null}return{convert:t}}const q2=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Z2=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class $2{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){const i=new Nu(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=i}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,i=new nn({vertexShader:q2,fragmentShader:Z2,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new ln(new ti(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class J2 extends er{constructor(e,t){super();const i=this;let r=null,a=1,s=null,o="local-floor",u=1,c=null,h=null,f=null,d=null,p=null,_=null;const x=typeof XRWebGLBinding<"u",g=new $2,m={},v=t.getContextAttributes();let E=null,b=null;const R=[],A=[],D=new Ve;let S=null,T=null;const I=new bn;I.viewport=new Lt;const C=new bn;C.viewport=new Lt;const F=[I,C],O=new ap;let P=null,B=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(j){let ie=R[j];return ie===void 0&&(ie=new Is,R[j]=ie),ie.getTargetRaySpace()},this.getControllerGrip=function(j){let ie=R[j];return ie===void 0&&(ie=new Is,R[j]=ie),ie.getGripSpace()},this.getHand=function(j){let ie=R[j];return ie===void 0&&(ie=new Is,R[j]=ie),ie.getHandSpace()};function W(j){const ie=A.indexOf(j.inputSource);if(ie===-1)return;const G=R[ie];G!==void 0&&(G.update(j.inputSource,j.frame,c||s),G.dispatchEvent({type:j.type,data:j.inputSource}))}function $(){r.removeEventListener("select",W),r.removeEventListener("selectstart",W),r.removeEventListener("selectend",W),r.removeEventListener("squeeze",W),r.removeEventListener("squeezestart",W),r.removeEventListener("squeezeend",W),r.removeEventListener("end",$),r.removeEventListener("inputsourceschange",ae);for(let j=0;j<R.length;j++){const ie=A[j];ie!==null&&(A[j]=null,R[j].disconnect(ie))}P=null,B=null,g.reset();for(const j in m)delete m[j];if(e.setRenderTarget(E),p=null,d=null,f=null,r=null,b=null,ze.stop(),i.isPresenting=!1,e.setPixelRatio(S),e.setSize(D.width,D.height,!1),T!==null){const j=T.camera;j.fov=T.fov,j.zoom=T.zoom,j.updateProjectionMatrix(),T=null}i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(j){a=j,i.isPresenting===!0&&He("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(j){o=j,i.isPresenting===!0&&He("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||s},this.setReferenceSpace=function(j){c=j},this.getBaseLayer=function(){return d!==null?d:p},this.getBinding=function(){return f===null&&x&&(f=new XRWebGLBinding(r,t)),f},this.getFrame=function(){return _},this.getSession=function(){return r},this.setSession=async function(j){if(r=j,r!==null){if(E=e.getRenderTarget(),r.addEventListener("select",W),r.addEventListener("selectstart",W),r.addEventListener("selectend",W),r.addEventListener("squeeze",W),r.addEventListener("squeezestart",W),r.addEventListener("squeezeend",W),r.addEventListener("end",$),r.addEventListener("inputsourceschange",ae),v.xrCompatible!==!0&&await t.makeXRCompatible(),S=e.getPixelRatio(),e.getSize(D),x&&"createProjectionLayer"in XRWebGLBinding.prototype){let G=null,ue=null,se=null;v.depth&&(se=v.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,G=v.stencil?Yi:xi,ue=v.stencil?na:Qn);const ye={colorFormat:t.RGBA8,depthFormat:se,scaleFactor:a};f=this.getBinding(),d=f.createProjectionLayer(ye),r.updateRenderState({layers:[d]}),e.setPixelRatio(1),e.setSize(d.textureWidth,d.textureHeight,!1),b=new wn(d.textureWidth,d.textureHeight,{format:yn,type:_n,depthTexture:new ra(d.textureWidth,d.textureHeight,ue,void 0,void 0,void 0,void 0,void 0,void 0,G),stencilBuffer:v.stencil,colorSpace:e.outputColorSpace,samples:v.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1,storeMultisampledDepthBuffer:d.ignoreDepthValues===!1,storeMultisampledStencilBuffer:d.ignoreDepthValues===!1})}else{const G={antialias:v.antialias,alpha:!0,depth:v.depth,stencil:v.stencil,framebufferScaleFactor:a};p=new XRWebGLLayer(r,t,G),r.updateRenderState({baseLayer:p}),e.setPixelRatio(1),e.setSize(p.framebufferWidth,p.framebufferHeight,!1),b=new wn(p.framebufferWidth,p.framebufferHeight,{format:yn,type:_n,colorSpace:e.outputColorSpace,stencilBuffer:v.stencil,resolveDepthBuffer:p.ignoreDepthValues===!1,resolveStencilBuffer:p.ignoreDepthValues===!1,storeMultisampledDepthBuffer:p.ignoreDepthValues===!1,storeMultisampledStencilBuffer:p.ignoreDepthValues===!1})}b.isXRRenderTarget=!0,this.setFoveation(u),c=null,s=await r.requestReferenceSpace(o),ze.setContext(r),ze.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return g.getDepthTexture()};function ae(j){for(let ie=0;ie<j.removed.length;ie++){const G=j.removed[ie],ue=A.indexOf(G);ue>=0&&(A[ue]=null,R[ue].disconnect(G))}for(let ie=0;ie<j.added.length;ie++){const G=j.added[ie];let ue=A.indexOf(G);if(ue===-1){for(let ye=0;ye<R.length;ye++)if(ye>=A.length){A.push(G),ue=ye;break}else if(A[ye]===null){A[ye]=G,ue=ye;break}if(ue===-1)break}const se=R[ue];se&&se.connect(G)}}const q=new Y,ee=new Y;function N(j,ie,G){q.setFromMatrixPosition(ie.matrixWorld),ee.setFromMatrixPosition(G.matrixWorld);const ue=q.distanceTo(ee),se=ie.projectionMatrix.elements,ye=G.projectionMatrix.elements,Ze=se[14]/(se[10]-1),Ce=se[14]/(se[10]+1),Ue=(se[9]+1)/se[5],Ye=(se[9]-1)/se[5],We=(se[8]-1)/se[0],vt=(ye[8]+1)/ye[0],Dt=Ze*We,Yt=Ze*vt,_t=ue/(-We+vt),St=_t*-We;if(ie.matrixWorld.decompose(j.position,j.quaternion,j.scale),j.translateX(St),j.translateZ(_t),j.matrixWorld.compose(j.position,j.quaternion,j.scale),j.matrixWorldInverse.copy(j.matrixWorld).invert(),se[10]===-1)j.projectionMatrix.copy(ie.projectionMatrix),j.projectionMatrixInverse.copy(ie.projectionMatrixInverse);else{const z=Ze+_t,$e=Ce+_t,ke=Dt-St,L=Yt+(ue-St),M=Ue*Ce/$e*z,U=Ye*Ce/$e*z;j.projectionMatrix.makePerspective(ke,L,M,U,z,$e),j.projectionMatrixInverse.copy(j.projectionMatrix).invert()}}function re(j,ie){ie===null?j.matrixWorld.copy(j.matrix):j.matrixWorld.multiplyMatrices(ie.matrixWorld,j.matrix),j.matrixWorldInverse.copy(j.matrixWorld).invert()}this.updateCamera=function(j){if(r===null)return;let ie=j.near,G=j.far;g.texture!==null&&(g.depthNear>0&&(ie=g.depthNear),g.depthFar>0&&(G=g.depthFar)),O.near=C.near=I.near=ie,O.far=C.far=I.far=G,(P!==O.near||B!==O.far)&&(r.updateRenderState({depthNear:O.near,depthFar:O.far}),P=O.near,B=O.far),O.layers.mask=j.layers.mask|6,I.layers.mask=O.layers.mask&-5,C.layers.mask=O.layers.mask&-3;const ue=j.parent,se=O.cameras;re(O,ue);for(let ye=0;ye<se.length;ye++)re(se[ye],ue);se.length===2?N(O,I,C):O.projectionMatrix.copy(I.projectionMatrix),T===null&&j.isPerspectiveCamera&&(T={camera:j,fov:j.fov,zoom:j.zoom}),ce(j,O,ue)};function ce(j,ie,G){G===null?j.matrix.copy(ie.matrixWorld):(j.matrix.copy(G.matrixWorld),j.matrix.invert(),j.matrix.multiply(ie.matrixWorld)),j.matrix.decompose(j.position,j.quaternion,j.scale),j.updateMatrixWorld(!0),j.projectionMatrix.copy(ie.projectionMatrix),j.projectionMatrixInverse.copy(ie.projectionMatrixInverse),j.isPerspectiveCamera&&(j.fov=Wo*2*Math.atan(1/j.projectionMatrix.elements[5]),j.zoom=1)}this.getCamera=function(){return O},this.getFoveation=function(){if(!(d===null&&p===null))return u},this.setFoveation=function(j){u=j,d!==null&&(d.fixedFoveation=j),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=j)},this.hasDepthSensing=function(){return g.texture!==null},this.getDepthSensingMesh=function(){return g.getMesh(O)},this.getCameraTexture=function(j){return m[j]};let Re=null;function Fe(j,ie){if(h=ie.getViewerPose(c||s),_=ie,h!==null){const G=h.views;p!==null&&(e.setRenderTargetFramebuffer(b,p.framebuffer),e.setRenderTarget(b));let ue=!1;G.length!==O.cameras.length&&(O.cameras.length=0,ue=!0);for(let Ce=0;Ce<G.length;Ce++){const Ue=G[Ce];let Ye=null;if(p!==null)Ye=p.getViewport(Ue);else{const vt=f.getViewSubImage(d,Ue);Ye=vt.viewport,Ce===0&&(e.setRenderTargetTextures(b,vt.colorTexture,vt.depthStencilTexture),e.setRenderTarget(b))}let We=F[Ce];We===void 0&&(We=new bn,We.layers.enable(Ce),We.viewport=new Lt,F[Ce]=We),We.matrix.fromArray(Ue.transform.matrix),We.matrix.decompose(We.position,We.quaternion,We.scale),We.projectionMatrix.fromArray(Ue.projectionMatrix),We.projectionMatrixInverse.copy(We.projectionMatrix).invert(),We.viewport.set(Ye.x,Ye.y,Ye.width,Ye.height),Ce===0&&(O.matrix.copy(We.matrix),O.matrix.decompose(O.position,O.quaternion,O.scale)),ue===!0&&O.cameras.push(We)}const se=r.enabledFeatures;if(se&&se.includes("depth-sensing")&&r.depthUsage=="gpu-optimized"&&x){f=i.getBinding();const Ce=f.getDepthInformation(G[0]);Ce&&Ce.isValid&&Ce.texture&&g.init(Ce,r.renderState)}if(se&&se.includes("camera-access")&&x){e.state.unbindTexture(),f=i.getBinding();for(let Ce=0;Ce<G.length;Ce++){const Ue=G[Ce].camera;if(Ue){let Ye=m[Ue];Ye||(Ye=new Nu,m[Ue]=Ye);const We=f.getCameraImage(Ue);Ye.sourceTexture=We}}}}for(let G=0;G<R.length;G++){const ue=A[G],se=R[G];ue!==null&&se!==void 0&&se.update(ue,ie,c||s)}Re&&Re(j,ie),ie.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:ie}),_=null}const ze=new ku;ze.setAnimationLoop(Fe),this.setAnimationLoop=function(j){Re=j},this.dispose=function(){}}}const Q2=new Ot,Xu=new Ge;Xu.set(-1,0,0,0,1,0,0,0,1);function j2(n,e){function t(g,m){g.matrixAutoUpdate===!0&&g.updateMatrix(),m.value.copy(g.matrix)}function i(g,m){m.color.getRGB(g.fogColor.value,Uu(n)),m.isFog?(g.fogNear.value=m.near,g.fogFar.value=m.far):m.isFogExp2&&(g.fogDensity.value=m.density)}function r(g,m,v,E,b){m.isNodeMaterial?m.uniformsNeedUpdate=!1:m.isMeshBasicMaterial?a(g,m):m.isMeshLambertMaterial?(a(g,m),m.envMap&&(g.envMapIntensity.value=m.envMapIntensity)):m.isMeshToonMaterial?(a(g,m),f(g,m)):m.isMeshPhongMaterial?(a(g,m),h(g,m),m.envMap&&(g.envMapIntensity.value=m.envMapIntensity)):m.isMeshStandardMaterial?(a(g,m),d(g,m),m.isMeshPhysicalMaterial&&p(g,m,b)):m.isMeshMatcapMaterial?(a(g,m),_(g,m)):m.isMeshDepthMaterial?a(g,m):m.isMeshDistanceMaterial?(a(g,m),x(g,m)):m.isMeshNormalMaterial?a(g,m):m.isLineBasicMaterial?(s(g,m),m.isLineDashedMaterial&&o(g,m)):m.isPointsMaterial?u(g,m,v,E):m.isSpriteMaterial?c(g,m):m.isShadowMaterial?(g.color.value.copy(m.color),g.opacity.value=m.opacity):m.isShaderMaterial&&(m.uniformsNeedUpdate=!1)}function a(g,m){g.opacity.value=m.opacity,m.color&&g.diffuse.value.copy(m.color),m.emissive&&g.emissive.value.copy(m.emissive).multiplyScalar(m.emissiveIntensity),m.map&&(g.map.value=m.map,t(m.map,g.mapTransform)),m.alphaMap&&(g.alphaMap.value=m.alphaMap,t(m.alphaMap,g.alphaMapTransform)),m.bumpMap&&(g.bumpMap.value=m.bumpMap,t(m.bumpMap,g.bumpMapTransform),g.bumpScale.value=m.bumpScale,m.side===fn&&(g.bumpScale.value*=-1)),m.normalMap&&(g.normalMap.value=m.normalMap,t(m.normalMap,g.normalMapTransform),g.normalScale.value.copy(m.normalScale),m.side===fn&&g.normalScale.value.negate()),m.displacementMap&&(g.displacementMap.value=m.displacementMap,t(m.displacementMap,g.displacementMapTransform),g.displacementScale.value=m.displacementScale,g.displacementBias.value=m.displacementBias),m.emissiveMap&&(g.emissiveMap.value=m.emissiveMap,t(m.emissiveMap,g.emissiveMapTransform)),m.specularMap&&(g.specularMap.value=m.specularMap,t(m.specularMap,g.specularMapTransform)),m.alphaTest>0&&(g.alphaTest.value=m.alphaTest);const v=e.get(m),E=v.envMap,b=v.envMapRotation;E&&(g.envMap.value=E,g.envMapRotation.value.setFromMatrix4(Q2.makeRotationFromEuler(b)).transpose(),E.isCubeTexture&&E.isRenderTargetTexture===!1&&g.envMapRotation.value.premultiply(Xu),g.reflectivity.value=m.reflectivity,g.ior.value=m.ior,g.refractionRatio.value=m.refractionRatio),m.lightMap&&(g.lightMap.value=m.lightMap,g.lightMapIntensity.value=m.lightMapIntensity,t(m.lightMap,g.lightMapTransform)),m.aoMap&&(g.aoMap.value=m.aoMap,g.aoMapIntensity.value=m.aoMapIntensity,t(m.aoMap,g.aoMapTransform))}function s(g,m){g.diffuse.value.copy(m.color),g.opacity.value=m.opacity,m.map&&(g.map.value=m.map,t(m.map,g.mapTransform))}function o(g,m){g.dashSize.value=m.dashSize,g.totalSize.value=m.dashSize+m.gapSize,g.scale.value=m.scale}function u(g,m,v,E){g.diffuse.value.copy(m.color),g.opacity.value=m.opacity,g.size.value=m.size*v,g.scale.value=E*.5,m.map&&(g.map.value=m.map,t(m.map,g.uvTransform)),m.alphaMap&&(g.alphaMap.value=m.alphaMap,t(m.alphaMap,g.alphaMapTransform)),m.alphaTest>0&&(g.alphaTest.value=m.alphaTest)}function c(g,m){g.diffuse.value.copy(m.color),g.opacity.value=m.opacity,g.rotation.value=m.rotation,m.map&&(g.map.value=m.map,t(m.map,g.mapTransform)),m.alphaMap&&(g.alphaMap.value=m.alphaMap,t(m.alphaMap,g.alphaMapTransform)),m.alphaTest>0&&(g.alphaTest.value=m.alphaTest)}function h(g,m){g.specular.value.copy(m.specular),g.shininess.value=Math.max(m.shininess,1e-4)}function f(g,m){m.gradientMap&&(g.gradientMap.value=m.gradientMap)}function d(g,m){g.metalness.value=m.metalness,m.metalnessMap&&(g.metalnessMap.value=m.metalnessMap,t(m.metalnessMap,g.metalnessMapTransform)),g.roughness.value=m.roughness,m.roughnessMap&&(g.roughnessMap.value=m.roughnessMap,t(m.roughnessMap,g.roughnessMapTransform)),m.envMap&&(g.envMapIntensity.value=m.envMapIntensity)}function p(g,m,v){g.ior.value=m.ior,m.sheen>0&&(g.sheenColor.value.copy(m.sheenColor).multiplyScalar(m.sheen),g.sheenRoughness.value=m.sheenRoughness,m.sheenColorMap&&(g.sheenColorMap.value=m.sheenColorMap,t(m.sheenColorMap,g.sheenColorMapTransform)),m.sheenRoughnessMap&&(g.sheenRoughnessMap.value=m.sheenRoughnessMap,t(m.sheenRoughnessMap,g.sheenRoughnessMapTransform))),m.clearcoat>0&&(g.clearcoat.value=m.clearcoat,g.clearcoatRoughness.value=m.clearcoatRoughness,m.clearcoatMap&&(g.clearcoatMap.value=m.clearcoatMap,t(m.clearcoatMap,g.clearcoatMapTransform)),m.clearcoatRoughnessMap&&(g.clearcoatRoughnessMap.value=m.clearcoatRoughnessMap,t(m.clearcoatRoughnessMap,g.clearcoatRoughnessMapTransform)),m.clearcoatNormalMap&&(g.clearcoatNormalMap.value=m.clearcoatNormalMap,t(m.clearcoatNormalMap,g.clearcoatNormalMapTransform),g.clearcoatNormalScale.value.copy(m.clearcoatNormalScale),m.side===fn&&g.clearcoatNormalScale.value.negate())),m.dispersion>0&&(g.dispersion.value=m.dispersion),m.retroreflectivity>0&&(g.retroreflectivity.value=m.retroreflectivity),m.iridescence>0&&(g.iridescence.value=m.iridescence,g.iridescenceIOR.value=m.iridescenceIOR,g.iridescenceThicknessMinimum.value=m.iridescenceThicknessRange[0],g.iridescenceThicknessMaximum.value=m.iridescenceThicknessRange[1],m.iridescenceMap&&(g.iridescenceMap.value=m.iridescenceMap,t(m.iridescenceMap,g.iridescenceMapTransform)),m.iridescenceThicknessMap&&(g.iridescenceThicknessMap.value=m.iridescenceThicknessMap,t(m.iridescenceThicknessMap,g.iridescenceThicknessMapTransform))),m.transmission>0&&(g.transmission.value=m.transmission,g.transmissionSamplerMap.value=v.texture,g.transmissionSamplerSize.value.set(v.width,v.height),m.transmissionMap&&(g.transmissionMap.value=m.transmissionMap,t(m.transmissionMap,g.transmissionMapTransform)),g.thickness.value=m.thickness,m.thicknessMap&&(g.thicknessMap.value=m.thicknessMap,t(m.thicknessMap,g.thicknessMapTransform)),g.attenuationDistance.value=m.attenuationDistance,g.attenuationColor.value.copy(m.attenuationColor)),m.anisotropy>0&&(g.anisotropyVector.value.set(m.anisotropy*Math.cos(m.anisotropyRotation),m.anisotropy*Math.sin(m.anisotropyRotation)),m.anisotropyMap&&(g.anisotropyMap.value=m.anisotropyMap,t(m.anisotropyMap,g.anisotropyMapTransform))),g.specularIntensity.value=m.specularIntensity,g.specularColor.value.copy(m.specularColor),m.specularColorMap&&(g.specularColorMap.value=m.specularColorMap,t(m.specularColorMap,g.specularColorMapTransform)),m.specularIntensityMap&&(g.specularIntensityMap.value=m.specularIntensityMap,t(m.specularIntensityMap,g.specularIntensityMapTransform))}function _(g,m){m.matcap&&(g.matcap.value=m.matcap)}function x(g,m){const v=e.get(m).light;g.referencePosition.value.setFromMatrixPosition(v.matrixWorld),g.nearDistance.value=v.shadow.camera.near,g.farDistance.value=v.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:r}}function e_(n,e,t,i){let r={},a={},s=[];const o=n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS);function u(b,R){const A=R.program;i.uniformBlockBinding(b,A)}function c(b,R){let A=r[b.id];A===void 0&&(g(b),A=h(b),r[b.id]=A,b.addEventListener("dispose",v));const D=R.program;i.updateUBOMapping(b,D);const S=e.render.frame;a[b.id]!==S&&(d(b),a[b.id]=S)}function h(b){const R=f();b.__bindingPointIndex=R;const A=n.createBuffer(),D=b.__size,S=b.usage;return n.bindBuffer(n.UNIFORM_BUFFER,A),n.bufferData(n.UNIFORM_BUFFER,D,S),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,R,A),A}function f(){for(let b=0;b<o;b++)if(s.indexOf(b)===-1)return s.push(b),b;return at("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(b){const R=r[b.id],A=b.uniforms,D=b.__cache;n.bindBuffer(n.UNIFORM_BUFFER,R);for(let S=0,T=A.length;S<T;S++){const I=A[S];if(Array.isArray(I))for(let C=0,F=I.length;C<F;C++)p(I[C],S,C,D);else p(I,S,0,D)}n.bindBuffer(n.UNIFORM_BUFFER,null)}function p(b,R,A,D){if(x(b,R,A,D)===!0){const S=b.__offset,T=b.value;if(Array.isArray(T)){let I=0;for(let C=0;C<T.length;C++){const F=T[C],O=m(F);_(F,b.__data,I),typeof F!="number"&&typeof F!="boolean"&&!F.isMatrix3&&!ArrayBuffer.isView(F)&&(I+=O.storage/Float32Array.BYTES_PER_ELEMENT)}}else _(T,b.__data,0);n.bufferSubData(n.UNIFORM_BUFFER,S,b.__data)}}function _(b,R,A){typeof b=="number"||typeof b=="boolean"?R[0]=b:b.isMatrix3?(R[0]=b.elements[0],R[1]=b.elements[1],R[2]=b.elements[2],R[3]=0,R[4]=b.elements[3],R[5]=b.elements[4],R[6]=b.elements[5],R[7]=0,R[8]=b.elements[6],R[9]=b.elements[7],R[10]=b.elements[8],R[11]=0):ArrayBuffer.isView(b)?R.set(new b.constructor(b.buffer,b.byteOffset,R.length)):b.toArray(R,A)}function x(b,R,A,D){const S=b.value,T=R+"_"+A;if(D[T]===void 0)return typeof S=="number"||typeof S=="boolean"?D[T]=S:ArrayBuffer.isView(S)?D[T]=S.slice():D[T]=S.clone(),!0;{const I=D[T];if(typeof S=="number"||typeof S=="boolean"){if(I!==S)return D[T]=S,!0}else{if(ArrayBuffer.isView(S))return!0;if(I.equals(S)===!1)return I.copy(S),!0}}return!1}function g(b){const R=b.uniforms;let A=0;const D=16;for(let T=0,I=R.length;T<I;T++){const C=Array.isArray(R[T])?R[T]:[R[T]];for(let F=0,O=C.length;F<O;F++){const P=C[F],B=Array.isArray(P.value)?P.value:[P.value];for(let W=0,$=B.length;W<$;W++){const ae=B[W],q=m(ae),ee=A%D,N=ee%q.boundary,re=ee+N;A+=N,re!==0&&D-re<q.storage&&(A+=D-re),P.__data=new Float32Array(q.storage/Float32Array.BYTES_PER_ELEMENT),P.__offset=A,A+=q.storage}}}const S=A%D;return S>0&&(A+=D-S),b.__size=A,b.__cache={},this}function m(b){const R={boundary:0,storage:0};return typeof b=="number"||typeof b=="boolean"?(R.boundary=4,R.storage=4):b.isVector2?(R.boundary=8,R.storage=8):b.isVector3||b.isColor?(R.boundary=16,R.storage=12):b.isVector4?(R.boundary=16,R.storage=16):b.isMatrix3?(R.boundary=48,R.storage=48):b.isMatrix4?(R.boundary=64,R.storage=64):b.isTexture?He("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(b)?(R.boundary=16,R.storage=b.byteLength):He("WebGLRenderer: Unsupported uniform value type.",b),R}function v(b){const R=b.target;R.removeEventListener("dispose",v);const A=s.indexOf(R.__bindingPointIndex);s.splice(A,1),n.deleteBuffer(r[R.id]),delete r[R.id],delete a[R.id]}function E(){for(const b in r)n.deleteBuffer(r[b]);s=[],r={},a={}}return{bind:u,update:c,dispose:E}}const t_=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let zn=null;function n_(){return zn===null&&(zn=new Sr(t_,16,16,Qi,jn),zn.name="DFG_LUT",zn.minFilter=Bt,zn.magFilter=Bt,zn.wrapS=hi,zn.wrapT=hi,zn.generateMipmaps=!1,zn.needsUpdate=!0),zn}class i_{constructor(e={}){const{canvas:t=E0(),context:i=null,depth:r=!0,stencil:a=!1,alpha:s=!1,antialias:o=!1,premultipliedAlpha:u=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:f=!1,reversedDepthBuffer:d=!1,outputBufferType:p=_n}=e;this.isWebGLRenderer=!0;let _;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");_=i.getContextAttributes().alpha}else _=s;const x=p,g=new Set([hl,ul,cl]),m=new Set([_n,Qn,ta,na,ol,ll]),v=new Uint32Array(4),E=new Int32Array(4),b=new Y;let R=null,A=null;const D=[],S=[];let T=null;this.domElement=t,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Zn,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const I=this;let C=!1,F=null,O=null,P=null,B=null;this._outputColorSpace=Sn;let W=0,$=0,ae=null,q=-1,ee=null;const N=new Lt,re=new Lt;let ce=null;const Re=new lt(0);let Fe=0,ze=t.width,j=t.height,ie=1,G=null,ue=null;const se=new Lt(0,0,ze,j),ye=new Lt(0,0,ze,j);let Ze=!1;const Ce=new gl;let Ue=!1,Ye=!1;const We=new Ot,vt=new Y,Dt=new Lt,Yt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let _t=!1;function St(){return ae===null?ie:1}let z=i;function $e(y,k){return t.getContext(y,k)}let ke,L,M,U,V,Z,le,he,Q,te,de,Le,ge,fe,Ie,Be,Xe,H,pe,ne,me,Se,oe;try{const y={alpha:!0,depth:r,stencil:a,antialias:o,premultipliedAlpha:u,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:f};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${al}`),t.addEventListener("webglcontextlost",Et,!1),t.addEventListener("webglcontextrestored",ct,!1),t.addEventListener("webglcontextcreationerror",Tn,!1),z===null){const k="webgl2";if(z=$e(k,y),z===null)throw $e(k)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}Ne()}catch(y){throw t.removeEventListener("webglcontextlost",Et,!1),t.removeEventListener("webglcontextrestored",ct,!1),t.removeEventListener("webglcontextcreationerror",Tn,!1),at("WebGLRenderer: "+y.message),y}function Ne(){ke=new n1(z),ke.init(),me=new K2(z,ke),L=new Xg(z,ke,e,me),M=new Y2(z,ke),L.reversedDepthBuffer&&d&&M.buffers.depth.setReversed(!0),O=z.createFramebuffer(),P=z.createFramebuffer(),B=z.createFramebuffer(),U=new a1(z),V=new D2,Z=new X2(z,ke,M,V,L,me,U),le=new t1(I),he=new op(z),Se=new Wg(z,he),Q=new i1(z,he,U,Se),te=new o1(z,Q,he,Se,U),H=new s1(z,L,Z),Ie=new Kg(V),de=new L2(I,le,ke,L,Se,Ie),Le=new j2(I,V),ge=new I2,fe=new k2(ke),Xe=new Vg(I,le,M,te,_,u),Be=new W2(I,te,L),oe=new e_(z,U,L,M),pe=new Yg(z,ke,U),ne=new r1(z,ke,U),U.programs=de.programs,I.capabilities=L,I.extensions=ke,I.properties=V,I.renderLists=ge,I.shadowMap=Be,I.state=M,I.info=U}x!==_n&&(T=new c1(x,t.width,t.height,o,r,a));const De=new J2(I,z);this.xr=De,this.getContext=function(){return z},this.getContextAttributes=function(){return z.getContextAttributes()},this.forceContextLoss=function(){const y=ke.get("WEBGL_lose_context");y&&y.loseContext()},this.forceContextRestore=function(){const y=ke.get("WEBGL_lose_context");y&&y.restoreContext()},this.getPixelRatio=function(){return ie},this.setPixelRatio=function(y){y!==void 0&&(ie=y,this.setSize(ze,j,!1))},this.getSize=function(y){return y.set(ze,j)},this.setSize=function(y,k,J=!0){if(De.isPresenting){He("WebGLRenderer: Can't change size while VR device is presenting.");return}ze=y,j=k,t.width=Math.floor(y*ie),t.height=Math.floor(k*ie),J===!0&&(t.style.width=y+"px",t.style.height=k+"px"),T!==null&&T.setSize(t.width,t.height),this.setViewport(0,0,y,k)},this.getDrawingBufferSize=function(y){return y.set(ze*ie,j*ie).floor()},this.setDrawingBufferSize=function(y,k,J){ze=y,j=k,ie=J,t.width=Math.floor(y*J),t.height=Math.floor(k*J),this.setViewport(0,0,y,k)},this.setEffects=function(y){if(x===_n){at("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(y){for(let k=0;k<y.length;k++)if(y[k].isOutputPass===!0){He("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}T.setEffects(y||[])},this.getCurrentViewport=function(y){return y.copy(N)},this.getViewport=function(y){return y.copy(se)},this.setViewport=function(y,k,J,X){y.isVector4?se.set(y.x,y.y,y.z,y.w):se.set(y,k,J,X),M.viewport(N.copy(se).multiplyScalar(ie).round())},this.getScissor=function(y){return y.copy(ye)},this.setScissor=function(y,k,J,X){y.isVector4?ye.set(y.x,y.y,y.z,y.w):ye.set(y,k,J,X),M.scissor(re.copy(ye).multiplyScalar(ie).round())},this.getScissorTest=function(){return Ze},this.setScissorTest=function(y){M.setScissorTest(Ze=y)},this.setOpaqueSort=function(y){G=y},this.setTransparentSort=function(y){ue=y},this.getClearColor=function(y){return y.copy(Xe.getClearColor())},this.setClearColor=function(){Xe.setClearColor(...arguments)},this.getClearAlpha=function(){return Xe.getClearAlpha()},this.setClearAlpha=function(){Xe.setClearAlpha(...arguments)},this.clear=function(y=!0,k=!0,J=!0){let X=0;if(y){let K=!1;if(ae!==null){const ve=ae.texture.format;K=g.has(ve)}if(K){const ve=ae.texture.type,we=m.has(ve),xe=Xe.getClearColor(),Ae=Xe.getClearAlpha(),Pe=xe.r,Je=xe.g,et=xe.b;we?(v[0]=Pe,v[1]=Je,v[2]=et,v[3]=Ae,z.clearBufferuiv(z.COLOR,0,v)):(E[0]=Pe,E[1]=Je,E[2]=et,E[3]=Ae,z.clearBufferiv(z.COLOR,0,E))}else X|=z.COLOR_BUFFER_BIT}k&&(X|=z.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),J&&(X|=z.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),X!==0&&z.clear(X)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(y){y.setRenderer(this),F=y},this.dispose=function(){t.removeEventListener("webglcontextlost",Et,!1),t.removeEventListener("webglcontextrestored",ct,!1),t.removeEventListener("webglcontextcreationerror",Tn,!1),Xe.dispose(),ge.dispose(),fe.dispose(),V.dispose(),le.dispose(),te.dispose(),Se.dispose(),oe.dispose(),de.dispose(),De.dispose(),De.removeEventListener("sessionstart",vl),De.removeEventListener("sessionend",Sl),Ni.stop()};function Et(y){y.preventDefault(),Yl("WebGLRenderer: Context Lost."),C=!0}function ct(){Yl("WebGLRenderer: Context Restored."),C=!1;const y=U.autoReset,k=Be.enabled,J=Be.autoUpdate,X=Be.needsUpdate,K=Be.type;Ne(),U.autoReset=y,Be.enabled=k,Be.autoUpdate=J,Be.needsUpdate=X,Be.type=K}function Tn(y){at("WebGLRenderer: A WebGL context could not be created. Reason: ",y.statusMessage)}function Fn(y){const k=y.target;k.removeEventListener("dispose",Fn),Ju(k)}function Ju(y){Qu(y),V.remove(y)}function Qu(y){const k=V.get(y).programs;k!==void 0&&(k.forEach(function(J){de.releaseProgram(J)}),y.isShaderMaterial&&de.releaseShaderCache(y))}this.renderBufferDirect=function(y,k,J,X,K,ve){k===null&&(k=Yt);const we=K.isMesh&&K.matrixWorld.determinantAffine()<0,xe=th(y,k,J,X,K);M.setMaterial(X,we);let Ae=J.index,Pe=1;if(X.wireframe===!0){if(Ae=Q.getWireframeAttribute(J),Ae===void 0)return;Pe=2}const Je=J.drawRange,et=J.attributes.position;let Te=Je.start*Pe,ut=(Je.start+Je.count)*Pe;ve!==null&&(Te=Math.max(Te,ve.start*Pe),ut=Math.min(ut,(ve.start+ve.count)*Pe)),Ae!==null?(Te=Math.max(Te,0),ut=Math.min(ut,Ae.count)):et!=null&&(Te=Math.max(Te,0),ut=Math.min(ut,et.count));const kt=ut-Te;if(kt<0||kt===1/0)return;Se.setup(K,X,xe,J,Ae);let At,bt=pe;if(Ae!==null&&(At=he.get(Ae),bt=ne,bt.setIndex(At)),K.isMesh)X.wireframe===!0?(M.setLineWidth(X.wireframeLinewidth*St()),bt.setMode(z.LINES)):bt.setMode(z.TRIANGLES);else if(K.isLine){let Jt=X.linewidth;Jt===void 0&&(Jt=1),M.setLineWidth(Jt*St()),K.isLineSegments?bt.setMode(z.LINES):K.isLineLoop?bt.setMode(z.LINE_LOOP):bt.setMode(z.LINE_STRIP)}else K.isPoints?bt.setMode(z.POINTS):K.isSprite&&bt.setMode(z.TRIANGLES);if(K.isBatchedMesh)if(ke.get("WEBGL_multi_draw"))bt.renderMultiDraw(K._multiDrawStarts,K._multiDrawCounts,K._multiDrawCount);else{const Jt=K._multiDrawStarts,Ee=K._multiDrawCounts,rn=K._multiDrawCount,rt=Ae?he.get(Ae).bytesPerElement:1,Mn=V.get(X).currentProgram.getUniforms();for(let Bn=0;Bn<rn;Bn++)Mn.setValue(z,"_gl_DrawID",Bn),bt.render(Jt[Bn]/rt,Ee[Bn])}else if(K.isInstancedMesh)bt.renderInstances(Te,kt,K.count);else if(J.isInstancedBufferGeometry){const Jt=J._maxInstanceCount!==void 0?J._maxInstanceCount:1/0,Ee=Math.min(J.instanceCount,Jt);bt.renderInstances(Te,kt,Ee)}else bt.render(Te,kt)};function Ml(y,k,J,X){F!==null&&y.isNodeMaterial&&F.setObject(X,y),Ue===!0&&Ie.setState(y,J,!1),y.transparent===!0&&y.side===ui&&y.forceSinglePass===!1?(y.side=fn,y.needsUpdate=!0,ha(y,k,X),y.side=$i,y.needsUpdate=!0,ha(y,k,X),y.side=ui):ha(y,k,X)}this.compile=function(y,k,J=null){J===null&&(J=y),F!==null&&F.renderStart(y,k,J),A=fe.get(J),A.init(k),S.push(A),J.traverseVisible(function(K){K.isLight&&K.layers.test(k.layers)&&(A.pushLight(K),K.castShadow&&A.pushShadow(K))}),y!==J&&y.traverseVisible(function(K){K.isLight&&K.layers.test(k.layers)&&(A.pushLight(K),K.castShadow&&A.pushShadow(K))}),A.setupLights(),F!==null&&F.updateLights(A.state.lightsArray),Ye=this.localClippingEnabled,Ue=Ie.init(this.clippingPlanes,Ye),Ue===!0&&Ie.setGlobalState(this.clippingPlanes,k),F!==null&&Be.render(A.state.shadowsArray,J,k);const X=new Set;return y.traverse(function(K){if(!(K.isMesh||K.isPoints||K.isLine||K.isSprite))return;const ve=K.material;if(ve)if(Array.isArray(ve))for(let we=0;we<ve.length;we++){const xe=ve[we];Ml(xe,J,k,K),X.add(xe)}else Ml(ve,J,k,K),X.add(ve)}),A=S.pop(),F!==null&&F.renderEnd(),X},this.compileAsync=function(y,k,J=null){const X=this.compile(y,k,J);return new Promise(K=>{function ve(){if(X.forEach(function(we){const Ae=V.get(we).currentProgram;(Ae===void 0||Ae.isReady())&&X.delete(we)}),X.size===0){K(y);return}setTimeout(ve,10)}ke.get("KHR_parallel_shader_compile")!==null?ve():setTimeout(ve,10)})};let _s=null;function ju(y){_s&&_s(y)}function vl(){Ni.stop()}function Sl(){Ni.start()}const Ni=new ku;Ni.setAnimationLoop(ju),typeof self<"u"&&Ni.setContext(self),this.setAnimationLoop=function(y){_s=y,De.setAnimationLoop(y),y===null?Ni.stop():Ni.start()},De.addEventListener("sessionstart",vl),De.addEventListener("sessionend",Sl),this.render=function(y,k){if(k!==void 0&&k.isCamera!==!0){at("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(C===!0)return;F!==null&&F.renderStart(y,k);const J=De.enabled===!0&&De.isPresenting===!0,X=T!==null&&(ae===null||J)&&T.begin(I,ae);if(y.matrixWorldAutoUpdate===!0&&y.updateMatrixWorld(),k.parent===null&&k.matrixWorldAutoUpdate===!0&&k.updateMatrixWorld(),De.enabled===!0&&De.isPresenting===!0&&(T===null||T.isCompositing()===!1)&&(De.cameraAutoUpdate===!0&&De.updateCamera(k),k=De.getCamera()),y.isScene===!0&&y.onBeforeRender(I,y,k,ae),A=fe.get(y,S.length),A.init(k),A.state.textureUnits=Z.getTextureUnits(),S.push(A),We.multiplyMatrices(k.projectionMatrix,k.matrixWorldInverse),Ce.setFromProjectionMatrix(We,qn,k.reversedDepth),Ye=this.localClippingEnabled,Ue=Ie.init(this.clippingPlanes,Ye),R=ge.get(y,D.length),R.init(),D.push(R),De.enabled===!0&&De.isPresenting===!0){const we=I.xr.getDepthSensingMesh();we!==null&&xs(we,k,-1/0,I.sortObjects)}xs(y,k,0,I.sortObjects),R.finish(),F!==null&&F.updateLights(A.state.lightsArray),I.sortObjects===!0&&R.sort(G,ue),_t=De.enabled===!1||De.isPresenting===!1||De.hasDepthSensing()===!1,_t&&Xe.addToRenderList(R,y),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),Ue===!0&&Ie.beginShadows();const K=A.state.shadowsArray;if(Be.render(K,y,k),Ue===!0&&Ie.endShadows(),(X&&T.hasRenderPass())===!1){const we=R.opaque,xe=R.transmissive;if(A.setupLights(),k.isArrayCamera){const Ae=k.cameras;if(xe.length>0)for(let Pe=0,Je=Ae.length;Pe<Je;Pe++){const et=Ae[Pe];El(we,xe,y,et)}_t&&Xe.render(y);for(let Pe=0,Je=Ae.length;Pe<Je;Pe++){const et=Ae[Pe];bl(R,y,et,et.viewport)}}else xe.length>0&&El(we,xe,y,k),_t&&Xe.render(y),bl(R,y,k)}ae!==null&&$===0&&(Z.updateMultisampleRenderTarget(ae),Z.updateRenderTargetMipmap(ae)),X&&T.end(I),y.isScene===!0&&y.onAfterRender(I,y,k),Se.resetDefaultState(),q=-1,ee=null,S.pop(),S.length>0?(A=S[S.length-1],Z.setTextureUnits(A.state.textureUnits),Ue===!0&&Ie.setGlobalState(I.clippingPlanes,A.state.camera)):A=null,D.pop(),D.length>0?R=D[D.length-1]:R=null,F!==null&&F.renderEnd()};function xs(y,k,J,X){if(y.visible===!1)return;if(y.layers.test(k.layers)){if(y.isGroup)J=y.renderOrder;else if(y.isLOD)y.autoUpdate===!0&&y.update(k);else if(y.isLightProbeGrid)A.pushLightProbeGrid(y);else if(y.isLight)A.pushLight(y),y.castShadow&&A.pushShadow(y);else if(y.isSprite){if(!y.frustumCulled||y.intersectsFrustum(Ce)){X&&Dt.setFromMatrixPosition(y.matrixWorld).applyMatrix4(We);const we=te.update(y),xe=y.material;xe.visible&&R.push(y,we,xe,J,Dt.z,null,k)}}else if((y.isMesh||y.isLine||y.isPoints)&&(!y.frustumCulled||y.intersectsFrustum(Ce))){const we=te.update(y),xe=y.material;if(X&&(y.boundingSphere!==void 0?(y.boundingSphere===null&&y.computeBoundingSphere(),Dt.copy(y.boundingSphere.center)):(we.boundingSphere===null&&we.computeBoundingSphere(),Dt.copy(we.boundingSphere.center)),Dt.applyMatrix4(y.matrixWorld).applyMatrix4(We)),Array.isArray(xe)){const Ae=we.groups;for(let Pe=0,Je=Ae.length;Pe<Je;Pe++){const et=Ae[Pe],Te=xe[et.materialIndex];Te&&Te.visible&&R.push(y,we,Te,J,Dt.z,et,k)}}else xe.visible&&R.push(y,we,xe,J,Dt.z,null,k)}}const ve=y.children;for(let we=0,xe=ve.length;we<xe;we++)xs(ve[we],k,J,X)}function bl(y,k,J,X){const{opaque:K,transmissive:ve,transparent:we}=y;A.setupLightsView(J),Ue===!0&&Ie.setGlobalState(I.clippingPlanes,J),X&&M.viewport(N.copy(X)),K.length>0&&ua(K,k,J),ve.length>0&&ua(ve,k,J),we.length>0&&ua(we,k,J),M.buffers.depth.setTest(!0),M.buffers.depth.setMask(!0),M.buffers.color.setMask(!0),M.setPolygonOffset(!1)}function El(y,k,J,X){if((J.isScene===!0?J.overrideMaterial:null)!==null)return;if(A.state.transmissionRenderTarget[X.id]===void 0){const Te=ke.has("EXT_color_buffer_half_float")||ke.has("EXT_color_buffer_float");A.state.transmissionRenderTarget[X.id]=new wn(1,1,{generateMipmaps:!0,type:Te?jn:_n,minFilter:Wi,samples:Math.max(4,L.samples),stencilBuffer:a,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:tt.workingColorSpace})}const ve=A.state.transmissionRenderTarget[X.id],we=X.viewport||N;ve.setSize(we.z*I.transmissionResolutionScale,we.w*I.transmissionResolutionScale);const xe=I.getRenderTarget(),Ae=I.getActiveCubeFace(),Pe=I.getActiveMipmapLevel();I.setRenderTarget(ve),I.getClearColor(Re),Fe=I.getClearAlpha(),Fe<1&&I.setClearColor(16777215,.5),I.clear(),_t&&Xe.render(J);const Je=I.toneMapping;I.toneMapping=Zn;const et=X.viewport;if(X.viewport!==void 0&&(X.viewport=void 0),A.setupLightsView(X),Ue===!0&&Ie.setGlobalState(I.clippingPlanes,X),ua(y,J,X),Z.updateMultisampleRenderTarget(ve),Z.updateRenderTargetMipmap(ve),ke.has("WEBGL_multisampled_render_to_texture")===!1){let Te=!1;for(let ut=0,kt=k.length;ut<kt;ut++){const At=k[ut],{object:bt,geometry:Jt,material:Ee,group:rn}=At;if(Ee.side===ui&&bt.layers.test(X.layers)){const rt=Ee.side;Ee.side=fn,Ee.needsUpdate=!0,yl(bt,J,X,Jt,Ee,rn),Ee.side=rt,Ee.needsUpdate=!0,Te=!0}}Te===!0&&(Z.updateMultisampleRenderTarget(ve),Z.updateRenderTargetMipmap(ve))}I.setRenderTarget(xe,Ae,Pe),I.setClearColor(Re,Fe),et!==void 0&&(X.viewport=et),I.toneMapping=Je}function ua(y,k,J){const X=k.isScene===!0?k.overrideMaterial:null;for(let K=0,ve=y.length;K<ve;K++){const we=y[K],{object:xe,geometry:Ae,group:Pe}=we;let Je=we.material;Je.allowOverride===!0&&X!==null&&(Je=X),xe.layers.test(J.layers)&&yl(xe,k,J,Ae,Je,Pe)}}function yl(y,k,J,X,K,ve){F!==null&&K.isNodeMaterial&&F.setObject(y,K),y.onBeforeRender(I,k,J,X,K,ve),y.modelViewMatrix.multiplyMatrices(J.matrixWorldInverse,y.matrixWorld),y.normalMatrix.getNormalMatrix(y.modelViewMatrix),K.onBeforeRender(I,k,J,X,y,ve),K.transparent===!0&&K.side===ui&&K.forceSinglePass===!1?(K.side=fn,K.needsUpdate=!0,I.renderBufferDirect(J,k,X,K,y,ve),K.side=$i,K.needsUpdate=!0,I.renderBufferDirect(J,k,X,K,y,ve),K.side=ui):I.renderBufferDirect(J,k,X,K,y,ve),y.onAfterRender(I,k,J,X,K,ve)}function ha(y,k,J){k.isScene!==!0&&(k=Yt);const X=V.get(y),K=A.state.lights,ve=A.state.shadowsArray,we=K.state.version,xe=de.getParameters(y,K.state,ve,k,J,A.state.lightProbeGridArray),Ae=de.getProgramCacheKey(xe);let Pe=X.programs;X.environment=y.isMeshStandardMaterial||y.isMeshLambertMaterial||y.isMeshPhongMaterial?k.environment:null,X.fog=k.fog;const Je=y.isMeshStandardMaterial||y.isMeshLambertMaterial&&!y.envMap||y.isMeshPhongMaterial&&!y.envMap;X.envMap=le.get(y.envMap||X.environment,Je),X.envMapRotation=X.environment!==null&&y.envMap===null?k.environmentRotation:y.envMapRotation,Pe===void 0&&(y.addEventListener("dispose",Fn),Pe=new Map,X.programs=Pe);let et=Pe.get(Ae);if(et!==void 0){if(X.currentProgram===et&&X.lightsStateVersion===we)return Al(y,xe),et}else xe.uniforms=de.getUniforms(y),F!==null&&y.isNodeMaterial&&F.build(y,J,xe),y.onBeforeCompile(xe,I),et=de.acquireProgram(xe,Ae),Pe.set(Ae,et),X.uniforms=xe.uniforms;const Te=X.uniforms;return(!y.isShaderMaterial&&!y.isRawShaderMaterial||y.clipping===!0)&&(Te.clippingPlanes=Ie.uniform),Al(y,xe),X.needsLights=ih(y),X.lightsStateVersion=we,X.needsLights&&(Te.ambientLightColor.value=K.state.ambient,Te.lightProbe.value=K.state.probe,Te.sunLights.value=K.state.sun,Te.sunLightShadows.value=K.state.sunShadow,Te.directionalLights.value=K.state.directional,Te.directionalLightShadows.value=K.state.directionalShadow,Te.spotLights.value=K.state.spot,Te.spotLightShadows.value=K.state.spotShadow,Te.rectAreaLights.value=K.state.rectArea,Te.ltc_1.value=K.state.rectAreaLTC1,Te.ltc_2.value=K.state.rectAreaLTC2,Te.pointLights.value=K.state.point,Te.pointLightShadows.value=K.state.pointShadow,Te.hemisphereLights.value=K.state.hemi,Te.sunShadowMatrix.value=K.state.sunShadowMatrix,Te.sunShadowCascade.value=K.state.sunShadowCascade,Te.directionalShadowMatrix.value=K.state.directionalShadowMatrix,Te.spotLightMatrix.value=K.state.spotLightMatrix,Te.spotLightMap.value=K.state.spotLightMap,Te.pointShadowMatrix.value=K.state.pointShadowMatrix),X.lightProbeGrid=A.state.lightProbeGridArray.length>0,X.currentProgram=et,X.uniformsList=null,et}function wl(y){if(y.uniformsList===null){const k=y.currentProgram.getUniforms();y.uniformsList=Ja.seqWithValue(k.seq,y.uniforms)}return y.uniformsList}function Al(y,k){const J=V.get(y);J.outputColorSpace=k.outputColorSpace,J.batching=k.batching,J.batchingColor=k.batchingColor,J.instancing=k.instancing,J.instancingColor=k.instancingColor,J.instancingMorph=k.instancingMorph,J.skinning=k.skinning,J.morphTargets=k.morphTargets,J.morphNormals=k.morphNormals,J.morphColors=k.morphColors,J.morphTargetsCount=k.morphTargetsCount,J.numClippingPlanes=k.numClippingPlanes,J.numIntersection=k.numClipIntersection,J.vertexAlphas=k.vertexAlphas,J.vertexTangents=k.vertexTangents,J.toneMapping=k.toneMapping}function eh(y,k){if(y.length===0)return null;if(y.length===1)return y[0].texture!==null?y[0]:null;b.setFromMatrixPosition(k.matrixWorld);for(let J=0,X=y.length;J<X;J++){const K=y[J];if(K.texture!==null&&K.boundingBox.containsPoint(b))return K}return null}function th(y,k,J,X,K){k.isScene!==!0&&(k=Yt),Z.resetTextureUnits();const ve=k.fog,we=X.isMeshStandardMaterial||X.isMeshLambertMaterial||X.isMeshPhongMaterial?k.environment:null,xe=ae===null?I.outputColorSpace:ae.isXRRenderTarget===!0?ae.texture.colorSpace:tt.workingColorSpace,Ae=X.isMeshStandardMaterial||X.isMeshLambertMaterial&&!X.envMap||X.isMeshPhongMaterial&&!X.envMap,Pe=le.get(X.envMap||we,Ae),Je=X.vertexColors===!0&&!!J.attributes.color&&J.attributes.color.itemSize===4,et=!!J.attributes.tangent&&(!!X.normalMap||X.anisotropy>0),Te=!!J.morphAttributes.position,ut=!!J.morphAttributes.normal,kt=!!J.morphAttributes.color;let At=Zn;X.toneMapped&&(ae===null||ae.isXRRenderTarget===!0)&&(At=I.toneMapping);const bt=J.morphAttributes.position||J.morphAttributes.normal||J.morphAttributes.color,Jt=bt!==void 0?bt.length:0,Ee=V.get(X),rn=A.state.lights;if(Ue===!0&&(Ye===!0||y!==ee)){const yt=y===ee&&X.id===q;Ie.setState(X,y,yt)}let rt=!1;X.version===Ee.__version?(Ee.needsLights&&Ee.lightsStateVersion!==rn.state.version||Ee.outputColorSpace!==xe||K.isBatchedMesh&&Ee.batching===!1||!K.isBatchedMesh&&Ee.batching===!0||K.isBatchedMesh&&Ee.batchingColor===!0&&K._colorsTexture===null||K.isBatchedMesh&&Ee.batchingColor===!1&&K._colorsTexture!==null||K.isInstancedMesh&&Ee.instancing===!1||!K.isInstancedMesh&&Ee.instancing===!0||K.isSkinnedMesh&&Ee.skinning===!1||!K.isSkinnedMesh&&Ee.skinning===!0||K.isInstancedMesh&&Ee.instancingColor===!0&&K.instanceColor===null||K.isInstancedMesh&&Ee.instancingColor===!1&&K.instanceColor!==null||K.isInstancedMesh&&Ee.instancingMorph===!0&&K.morphTexture===null||K.isInstancedMesh&&Ee.instancingMorph===!1&&K.morphTexture!==null||Ee.envMap!==Pe||X.fog===!0&&Ee.fog!==ve||Ee.numClippingPlanes!==void 0&&(Ee.numClippingPlanes!==Ie.numPlanes||Ee.numIntersection!==Ie.numIntersection)||Ee.vertexAlphas!==Je||Ee.vertexTangents!==et||Ee.morphTargets!==Te||Ee.morphNormals!==ut||Ee.morphColors!==kt||Ee.toneMapping!==At||Ee.morphTargetsCount!==Jt||!!Ee.lightProbeGrid!=A.state.lightProbeGridArray.length>0)&&(rt=!0):(rt=!0,Ee.__version=X.version);let Mn=Ee.currentProgram;rt===!0&&(Mn=ha(X,k,K),F&&X.isNodeMaterial&&F.onUpdateProgram(X,Mn,Ee));let Bn=!1,vi=!1,tr=!1;const xt=Mn.getUniforms(),Ft=Ee.uniforms;if(M.useProgram(Mn.program)&&(Bn=!0,vi=!0,tr=!0),X.id!==q&&(q=X.id,vi=!0),Ee.needsLights){const yt=eh(A.state.lightProbeGridArray,K);Ee.lightProbeGrid!==yt&&(Ee.lightProbeGrid=yt,vi=!0)}if(Bn||ee!==y){M.buffers.depth.getReversed()&&y.reversedDepth!==!0&&(y._reversedDepth=!0,y.updateProjectionMatrix()),xt.setValue(z,"projectionMatrix",y.projectionMatrix),xt.setValue(z,"viewMatrix",y.matrixWorldInverse);const bi=xt.map.cameraPosition;bi!==void 0&&bi.setValue(z,vt.setFromMatrixPosition(y.matrixWorld)),L.logarithmicDepthBuffer&&xt.setValue(z,"logDepthBufFC",2/(Math.log(y.far+1)/Math.LN2)),(X.isMeshPhongMaterial||X.isMeshToonMaterial||X.isMeshLambertMaterial||X.isMeshBasicMaterial||X.isMeshStandardMaterial||X.isShaderMaterial)&&xt.setValue(z,"isOrthographic",y.isOrthographicCamera===!0),ee!==y&&(ee=y,vi=!0,tr=!0)}if(Ee.needsLights&&(rn.state.sunShadowMap.length>0&&xt.setValue(z,"sunShadowMap",rn.state.sunShadowMap,Z),rn.state.directionalShadowMap.length>0&&xt.setValue(z,"directionalShadowMap",rn.state.directionalShadowMap,Z),rn.state.spotShadowMap.length>0&&xt.setValue(z,"spotShadowMap",rn.state.spotShadowMap,Z),rn.state.pointShadowMap.length>0&&xt.setValue(z,"pointShadowMap",rn.state.pointShadowMap,Z)),K.isSkinnedMesh){xt.setOptional(z,K,"bindMatrix"),xt.setOptional(z,K,"bindMatrixInverse");const yt=K.skeleton;yt&&(yt.boneTexture===null&&yt.computeBoneTexture(),xt.setValue(z,"boneTexture",yt.boneTexture,Z))}K.isBatchedMesh&&(xt.setOptional(z,K,"batchingTexture"),xt.setValue(z,"batchingTexture",K._matricesTexture,Z),xt.setOptional(z,K,"batchingIdTexture"),xt.setValue(z,"batchingIdTexture",K._indirectTexture,Z),xt.setOptional(z,K,"batchingColorTexture"),K._colorsTexture!==null&&xt.setValue(z,"batchingColorTexture",K._colorsTexture,Z));const Si=J.morphAttributes;if((Si.position!==void 0||Si.normal!==void 0||Si.color!==void 0)&&H.update(K,J,Mn),(vi||Ee.receiveShadow!==K.receiveShadow)&&(Ee.receiveShadow=K.receiveShadow,xt.setValue(z,"receiveShadow",K.receiveShadow)),(X.isMeshStandardMaterial||X.isMeshLambertMaterial||X.isMeshPhongMaterial)&&X.envMap===null&&k.environment!==null&&(Ft.envMapIntensity.value=k.environmentIntensity),Ft.dfgLUT!==void 0&&(Ft.dfgLUT.value=n_()),vi){if(xt.setValue(z,"toneMappingExposure",I.toneMappingExposure),Ee.needsLights&&nh(Ft,tr),ve&&X.fog===!0&&Le.refreshFogUniforms(Ft,ve),Le.refreshMaterialUniforms(Ft,X,ie,j,A.state.transmissionRenderTarget[y.id]),Ee.needsLights&&Ee.lightProbeGrid){const yt=Ee.lightProbeGrid;Ft.probesSH.value=yt.texture,Ft.probesMin.value.copy(yt.boundingBox.min),Ft.probesMax.value.copy(yt.boundingBox.max),Ft.probesResolution.value.copy(yt.resolution)}Ja.upload(z,wl(Ee),Ft,Z)}if(X.isShaderMaterial&&X.uniformsNeedUpdate===!0&&(Ja.upload(z,wl(Ee),Ft,Z),X.uniformsNeedUpdate=!1),X.isSpriteMaterial&&xt.setValue(z,"center",K.center),xt.setValue(z,"modelViewMatrix",K.modelViewMatrix),xt.setValue(z,"normalMatrix",K.normalMatrix),xt.setValue(z,"modelMatrix",K.matrixWorld),X.uniformsGroups!==void 0){const yt=X.uniformsGroups;for(let bi=0,nr=yt.length;bi<nr;bi++){const Rl=yt[bi];oe.update(Rl,Mn),oe.bind(Rl,Mn)}}return Mn}function nh(y,k){y.ambientLightColor.needsUpdate=k,y.lightProbe.needsUpdate=k,y.sunLights.needsUpdate=k,y.sunLightShadows.needsUpdate=k,y.directionalLights.needsUpdate=k,y.directionalLightShadows.needsUpdate=k,y.pointLights.needsUpdate=k,y.pointLightShadows.needsUpdate=k,y.spotLights.needsUpdate=k,y.spotLightShadows.needsUpdate=k,y.rectAreaLights.needsUpdate=k,y.hemisphereLights.needsUpdate=k}function ih(y){return y.isMeshLambertMaterial||y.isMeshToonMaterial||y.isMeshPhongMaterial||y.isMeshStandardMaterial||y.isShadowMaterial||y.isShaderMaterial&&y.lights===!0}this.getActiveCubeFace=function(){return W},this.getActiveMipmapLevel=function(){return $},this.getRenderTarget=function(){return ae},this.setRenderTargetTextures=function(y,k,J){const X=V.get(y);X.__autoAllocateDepthBuffer=y.resolveDepthBuffer===!1,X.__autoAllocateDepthBuffer===!1&&(X.__useRenderToTexture=!1),V.get(y.texture).__webglTexture=k,V.get(y.depthTexture).__webglTexture=X.__autoAllocateDepthBuffer?void 0:J,X.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(y,k){const J=V.get(y);J.__webglFramebuffer=k,J.__useDefaultFramebuffer=k===void 0},this.setRenderTarget=function(y,k=0,J=0){ae=y,W=k,$=J;let X=null,K=!1,ve=!1;if(y){const xe=V.get(y);if(xe.__useDefaultFramebuffer!==void 0){M.bindFramebuffer(z.FRAMEBUFFER,xe.__webglFramebuffer),N.copy(y.viewport),re.copy(y.scissor),ce=y.scissorTest,M.viewport(N),M.scissor(re),M.setScissorTest(ce),q=-1;return}else if(xe.__webglFramebuffer===void 0)Z.setupRenderTarget(y);else if(xe.__hasExternalTextures)Z.rebindTextures(y,V.get(y.texture).__webglTexture,V.get(y.depthTexture).__webglTexture);else if(y.depthBuffer){const Je=y.depthTexture;if(xe.__boundDepthTexture!==Je){if(Je!==null&&V.has(Je)&&(y.width!==Je.image.width||y.height!==Je.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");Z.setupDepthRenderbuffer(y)}}const Ae=y.texture;(Ae.isData3DTexture||Ae.isDataArrayTexture||Ae.isCompressedArrayTexture)&&(ve=!0);const Pe=V.get(y).__webglFramebuffer;y.isWebGLCubeRenderTarget?(Array.isArray(Pe[k])?X=Pe[k][J]:X=Pe[k],K=!0):y.samples>0&&Z.useMultisampledRTT(y)===!1?X=V.get(y).__webglMultisampledFramebuffer:Array.isArray(Pe)?X=Pe[J]:X=Pe,N.copy(y.viewport),re.copy(y.scissor),ce=y.scissorTest}else N.copy(se).multiplyScalar(ie).floor(),re.copy(ye).multiplyScalar(ie).floor(),ce=Ze;if(J!==0&&(X=O),M.bindFramebuffer(z.FRAMEBUFFER,X)&&M.drawBuffers(y,X),M.viewport(N),M.scissor(re),M.setScissorTest(ce),K){const xe=V.get(y.texture);z.framebufferTexture2D(z.FRAMEBUFFER,z.COLOR_ATTACHMENT0,z.TEXTURE_CUBE_MAP_POSITIVE_X+k,xe.__webglTexture,J)}else if(ve){const xe=k;for(let Ae=0;Ae<y.textures.length;Ae++){const Pe=V.get(y.textures[Ae]);z.framebufferTextureLayer(z.FRAMEBUFFER,z.COLOR_ATTACHMENT0+Ae,Pe.__webglTexture,J,xe)}}else if(y!==null&&J!==0){const xe=V.get(y.texture);z.framebufferTexture2D(z.FRAMEBUFFER,z.COLOR_ATTACHMENT0,z.TEXTURE_2D,xe.__webglTexture,J)}q=-1};function Tl(y){const k=V.get(y);return(k.__readFormat!==y.format||k.__readType!==y.type)&&(k.__readFormat=y.format,k.__readType=y.type,k.__formatReadable=L.textureFormatReadable(y.format),k.__typeReadable=L.textureTypeReadable(y.type)),k}this.readRenderTargetPixels=function(y,k,J,X,K,ve,we,xe=0){if(!(y&&y.isWebGLRenderTarget)){at("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Ae=V.get(y).__webglFramebuffer;if(y.isWebGLCubeRenderTarget&&we!==void 0&&(Ae=Ae[we]),Ae){M.bindFramebuffer(z.FRAMEBUFFER,Ae);try{const Pe=y.textures[xe],Je=Pe.format,et=Pe.type;y.textures.length>1&&z.readBuffer(z.COLOR_ATTACHMENT0+xe);const Te=Tl(Pe);if(Te.__formatReadable===!1){at("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(Te.__typeReadable===!1){at("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}k>=0&&k<=y.width-X&&J>=0&&J<=y.height-K&&z.readPixels(k,J,X,K,me.convert(Je),me.convert(et),ve)}finally{const Pe=ae!==null?V.get(ae).__webglFramebuffer:null;M.bindFramebuffer(z.FRAMEBUFFER,Pe)}}},this.readRenderTargetPixelsAsync=async function(y,k,J,X,K,ve,we,xe=0){if(!(y&&y.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Ae=V.get(y).__webglFramebuffer;if(y.isWebGLCubeRenderTarget&&we!==void 0&&(Ae=Ae[we]),Ae)if(k>=0&&k<=y.width-X&&J>=0&&J<=y.height-K){M.bindFramebuffer(z.FRAMEBUFFER,Ae);const Pe=y.textures[xe],Je=Pe.format,et=Pe.type;y.textures.length>1&&z.readBuffer(z.COLOR_ATTACHMENT0+xe);const Te=Tl(Pe);if(Te.__formatReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(Te.__typeReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const ut=z.createBuffer();z.bindBuffer(z.PIXEL_PACK_BUFFER,ut),z.bufferData(z.PIXEL_PACK_BUFFER,ve.byteLength,z.STREAM_READ),z.readPixels(k,J,X,K,me.convert(Je),me.convert(et),0),z.bindBuffer(z.PIXEL_PACK_BUFFER,null);const kt=ae!==null?V.get(ae).__webglFramebuffer:null;M.bindFramebuffer(z.FRAMEBUFFER,kt);const At=z.fenceSync(z.SYNC_GPU_COMMANDS_COMPLETE,0);return z.flush(),await y0(z,At,4),z.bindBuffer(z.PIXEL_PACK_BUFFER,ut),z.getBufferSubData(z.PIXEL_PACK_BUFFER,0,ve),z.bindBuffer(z.PIXEL_PACK_BUFFER,null),z.deleteBuffer(ut),z.deleteSync(At),ve}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(y,k=null,J=0){const X=Math.pow(2,-J),K=Math.floor(y.image.width*X),ve=Math.floor(y.image.height*X),we=k!==null?k.x:0,xe=k!==null?k.y:0;Z.setTexture2D(y,0),z.copyTexSubImage2D(z.TEXTURE_2D,J,0,0,we,xe,K,ve),M.unbindTexture()},this.copyTextureToTexture=function(y,k,J=null,X=null,K=0,ve=0){let we,xe,Ae,Pe,Je,et,Te,ut,kt;const At=y.isCompressedTexture?y.mipmaps[ve]:y.image;if(J!==null)we=J.max.x-J.min.x,xe=J.max.y-J.min.y,Ae=J.isBox3?J.max.z-J.min.z:1,Pe=J.min.x,Je=J.min.y,et=J.isBox3?J.min.z:0;else{const Ft=Math.pow(2,-K);we=Math.floor(At.width*Ft),xe=Math.floor(At.height*Ft),y.isDataArrayTexture?Ae=At.depth:y.isData3DTexture?Ae=Math.floor(At.depth*Ft):Ae=1,Pe=0,Je=0,et=0}X!==null?(Te=X.x,ut=X.y,kt=X.z):(Te=0,ut=0,kt=0);const bt=me.convert(k.format),Jt=me.convert(k.type);let Ee;k.isData3DTexture?(Z.setTexture3D(k,0),Ee=z.TEXTURE_3D):k.isDataArrayTexture||k.isCompressedArrayTexture?(Z.setTexture2DArray(k,0),Ee=z.TEXTURE_2D_ARRAY):(Z.setTexture2D(k,0),Ee=z.TEXTURE_2D),M.activeTexture(z.TEXTURE0),M.pixelStorei(z.UNPACK_FLIP_Y_WEBGL,k.flipY),M.pixelStorei(z.UNPACK_PREMULTIPLY_ALPHA_WEBGL,k.premultiplyAlpha),M.pixelStorei(z.UNPACK_ALIGNMENT,k.unpackAlignment);const rn=M.getParameter(z.UNPACK_ROW_LENGTH),rt=M.getParameter(z.UNPACK_IMAGE_HEIGHT),Mn=M.getParameter(z.UNPACK_SKIP_PIXELS),Bn=M.getParameter(z.UNPACK_SKIP_ROWS),vi=M.getParameter(z.UNPACK_SKIP_IMAGES);M.pixelStorei(z.UNPACK_ROW_LENGTH,At.width),M.pixelStorei(z.UNPACK_IMAGE_HEIGHT,At.height),M.pixelStorei(z.UNPACK_SKIP_PIXELS,Pe),M.pixelStorei(z.UNPACK_SKIP_ROWS,Je),M.pixelStorei(z.UNPACK_SKIP_IMAGES,et);const tr=y.isDataArrayTexture||y.isData3DTexture,xt=k.isDataArrayTexture||k.isData3DTexture;if(y.isDepthTexture){const Ft=V.get(y),Si=V.get(k),yt=V.get(Ft.__renderTarget),bi=V.get(Si.__renderTarget);M.bindFramebuffer(z.READ_FRAMEBUFFER,yt.__webglFramebuffer),M.bindFramebuffer(z.DRAW_FRAMEBUFFER,bi.__webglFramebuffer);for(let nr=0;nr<Ae;nr++)tr&&(z.framebufferTextureLayer(z.READ_FRAMEBUFFER,z.COLOR_ATTACHMENT0,V.get(y).__webglTexture,K,et+nr),z.framebufferTextureLayer(z.DRAW_FRAMEBUFFER,z.COLOR_ATTACHMENT0,V.get(k).__webglTexture,ve,kt+nr)),z.blitFramebuffer(Pe,Je,we,xe,Te,ut,we,xe,z.DEPTH_BUFFER_BIT,z.NEAREST);M.bindFramebuffer(z.READ_FRAMEBUFFER,null),M.bindFramebuffer(z.DRAW_FRAMEBUFFER,null)}else if(K!==0||y.isRenderTargetTexture||V.has(y)){const Ft=V.get(y),Si=V.get(k);M.bindFramebuffer(z.READ_FRAMEBUFFER,P),M.bindFramebuffer(z.DRAW_FRAMEBUFFER,B);for(let yt=0;yt<Ae;yt++)tr?z.framebufferTextureLayer(z.READ_FRAMEBUFFER,z.COLOR_ATTACHMENT0,Ft.__webglTexture,K,et+yt):z.framebufferTexture2D(z.READ_FRAMEBUFFER,z.COLOR_ATTACHMENT0,z.TEXTURE_2D,Ft.__webglTexture,K),xt?z.framebufferTextureLayer(z.DRAW_FRAMEBUFFER,z.COLOR_ATTACHMENT0,Si.__webglTexture,ve,kt+yt):z.framebufferTexture2D(z.DRAW_FRAMEBUFFER,z.COLOR_ATTACHMENT0,z.TEXTURE_2D,Si.__webglTexture,ve),K!==0?z.blitFramebuffer(Pe,Je,we,xe,Te,ut,we,xe,z.COLOR_BUFFER_BIT,z.NEAREST):xt?z.copyTexSubImage3D(Ee,ve,Te,ut,kt+yt,Pe,Je,we,xe):z.copyTexSubImage2D(Ee,ve,Te,ut,Pe,Je,we,xe);M.bindFramebuffer(z.READ_FRAMEBUFFER,null),M.bindFramebuffer(z.DRAW_FRAMEBUFFER,null)}else xt?y.isDataTexture||y.isData3DTexture?z.texSubImage3D(Ee,ve,Te,ut,kt,we,xe,Ae,bt,Jt,At.data):k.isCompressedArrayTexture?z.compressedTexSubImage3D(Ee,ve,Te,ut,kt,we,xe,Ae,bt,At.data):z.texSubImage3D(Ee,ve,Te,ut,kt,we,xe,Ae,bt,Jt,At):y.isDataTexture?z.texSubImage2D(z.TEXTURE_2D,ve,Te,ut,we,xe,bt,Jt,At.data):y.isCompressedTexture?z.compressedTexSubImage2D(z.TEXTURE_2D,ve,Te,ut,At.width,At.height,bt,At.data):z.texSubImage2D(z.TEXTURE_2D,ve,Te,ut,we,xe,bt,Jt,At);M.pixelStorei(z.UNPACK_ROW_LENGTH,rn),M.pixelStorei(z.UNPACK_IMAGE_HEIGHT,rt),M.pixelStorei(z.UNPACK_SKIP_PIXELS,Mn),M.pixelStorei(z.UNPACK_SKIP_ROWS,Bn),M.pixelStorei(z.UNPACK_SKIP_IMAGES,vi),ve===0&&k.generateMipmaps&&z.generateMipmap(Ee),M.unbindTexture()},this.initRenderTarget=function(y){V.get(y).__webglFramebuffer===void 0&&Z.setupRenderTarget(y)},this.initTexture=function(y){y.isCubeTexture?Z.setTextureCube(y,0):y.isData3DTexture?Z.setTexture3D(y,0):y.isDataArrayTexture||y.isCompressedArrayTexture?Z.setTexture2DArray(y,0):Z.setTexture2D(y,0),M.unbindTexture()},this.resetState=function(){W=0,$=0,ae=null,M.reset(),Se.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return qn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=tt._getDrawingBufferColorSpace(e),t.unpackColorSpace=tt._getUnpackColorSpace()}}const Ut=(n,e=0)=>{const t=Math.sin(n*127.1+e*311.7)*43758.5453;return t-Math.floor(t)},gt=(n,e,t=0)=>Ut(Math.floor(n[0]*e)+Math.floor(n[2]*e)*57+t,Math.floor(n[1]*e)),Ct=(n=.2,e=.15)=>t=>{const i=gt(t,16,3);return gt(t,6,5)<e&&t[1]>.1?l.MOSS:i>1-n*.7?l.BODY2:void 0},Nt=(n,e,t,i,r,a=0,s=0)=>{for(let o=0;o<e;o++){const u=Ut(r,o)*6.283,c=t*Math.sqrt(Ut(o,r));n.ell([a+Math.cos(u)*c,.07,s+Math.sin(u)*c*.7],[.07,.1+Ut(o,4)*.08,.07],l.LEAF2,{group:i+o%3,paint:h=>h[1]>.13?l.LEAF:void 0})}},ka=(n,e,t,i=1)=>{for(let r=0;r<6;r++){const a=r/6*6.283+e[0],s=[Math.cos(a),0,Math.sin(a)];n.chain([[...e,.03*i],[...w.add(e,w.add(w.mul(s,.25*i),[0,.2*i,0])),.025*i],[...w.add(e,w.add(w.mul(s,.5*i),[0,.05*i,0])),.01*i]],r%2?l.LEAF:l.LEAF2,{group:t})}},Nn=(n,e,t,i,r)=>{const a=[];for(let s=0;s<=4;s++)a.push([...w.add(w.lerp(e,t,s/4),[(Ut(r,s)-.5)*.12,0,.02]),.03]);n.chain(a,l.LEAF,{group:i,paint:s=>gt(s,30)<.3?l.LEAF2:void 0})},rs=(n,e,t,i)=>n.ell(e,t,l.LEAF,{group:i,rough:.04,paint:r=>{const a=gt(r,10,2);return r[1]<e[1]-.15||a<.2?l.LEAF3:a>.8?l.LEAF2:void 0}}),qe=(n,e,t,i,r=.025,a=l.FRAME)=>n.seg(e,t,r,r,a,{group:i,paint:Ct(.35,.05)}),Dr=(n,e,t,i,r=l.MAGIC)=>n.ell(e,[t,t,t],r,{group:i,extra:!0});function Xn(n,e,{yaw:t=0,pitch:i=0,roll:r=0,at:a=[0,0,0]}={}){const s=(f,d,p,_)=>{const x=Math.cos(d),g=Math.sin(d),m=[...f];return m[p]=f[p]*x-f[_]*g,m[_]=f[p]*g+f[_]*x,m},o=f=>s(s(s(f,r,1,2),i,0,1),-t,0,2),u=f=>s(s(s(f,t,0,2),-i,0,1),-r,1,2),c=f=>w.add(o(f),a),h=f=>u(w.sub(f,a));for(const f of n.parts.slice(e))if(f.type==="cone"?(f.a=c(f.a),f.b=c(f.b)):(f.c=c(f.c),f.axes=f.axes.map(o)),f.paint){const d=f.paint;f.paint=(p,_)=>d(h(p),_)}}function eo(n,e,{len:t=1.5,van:i=!1,glow:r=!1,flat:a=!1}={}){const s=i?.62:.3,o=i?.8:.5;n.box([0,o,0],[t,s,.66],l.BODY,{round:.14,group:e,paint:u=>{const c=Ct(.3,.12)(u);return c||(u[0]>t-.06&&Math.abs(u[1]-(o+s*.2))<.07&&Math.abs(Math.abs(u[2])-.45)<.1?r?l.MAGIC2:l.FRAME:i&&u[1]>o+.1&&Math.abs(u[2])>.6&&Math.abs(u[0]+.2)<.9&&(u[0]+3)*3%1>.15||u[1]<o-s+.1?l.SHADES:void 0)}}),i||n.box([-.2,o+s+.22,0],[t*.6,.24,.6],l.BODY,{round:.14,group:e,paint:u=>Math.abs(u[2])>.52||u[0]>t*.6-.25-.2?gt(u,9)<.25?l.STONED:l.SHADES:Ct(.3,.25)(u)});for(const u of[-t*.65,t*.65])for(const c of[-.66,.66])n.ell([u,.3,c],[.3,a?.22:.3,.1],l.BODY3,{group:e+1,paint:h=>Math.hypot(h[0]-u,h[1]-.3)<.12?l.FRAME:void 0});if(r)for(const u of[-.45,.45])Dr(n,[t+.05,o+s*.2,u],.07,e+2,l.MAGIC2)}const r_={"car-nose-down":{desc:"a hatchback nose-down in the earth, ferns round it",build(n){const e=n.parts.length;eo(n,1),Xn(n,e,{pitch:-.5,at:[0,.2,0]}),n.ell([1.3,.1,0],[.9,.35,1],l.BARK2,{group:4,rough:.04,paint:t=>t[1]>.25?l.MOSS:void 0}),ka(n,[.9,.2,.8],5),ka(n,[-.9,.05,.9],6,.8),n.ell([-.6,1.25,0],[.5,.06,.4],l.MOSS,{group:7})}},"van-tree":{desc:"a camper van with a tree grown up through its roof, its headlights glowing with fairy light",glow:!0,build(n){eo(n,1,{van:!0,len:1.6,flat:!0,glow:!0}),n.chain([[.2,0,0,.22],[.2,1.5,0,.2],[.3,2.6,-.1,.14],[.35,3.3,-.1,.08]],l.TRUNK,{group:4,rough:.015}),rs(n,[.3,3.4,-.1],[1.1,.7,.9],5),Nn(n,[-1.6,.1,.66],[-1,1.3,.7],6,1),Nt(n,14,2.2,7,2)}},"car-on-side":{desc:"a car on its side among ferns",build(n){const e=n.parts.length;eo(n,1),Xn(n,e,{roll:Math.PI/2,at:[0,.2,.1]});for(const[t,i]of[[-1.2,.9],[.3,1.1],[1.4,.6],[-.4,-1]])ka(n,[t,.05,i],5+(t>0?1:0),1.1)}},"trolley-tipped":{desc:"a shopping trolley tipped over, a plant growing in its basket",build(n){const e=n.parts.length;Pc(n,1),rs(n,[.05,.65,0],[.32,.28,.26],3),Xn(n,e,{roll:1.35,at:[0,.32,0]}),Nt(n,8,.9,6,3)}},"trolley-nest":{desc:"a shopping trolley standing upright, a bird's nest in its basket",build(n){Pc(n,1),n.ell([0,.78,0],[.2,.08,.17],l.STRAW,{group:3,paint:e=>Math.abs(Math.sin(e[0]*40+e[2]*30))<.3?l.BARK2:void 0});for(const e of[-.05,.05])n.ell([e,.84,.02],[.04,.03,.035],l.BELLY,{group:4});Nt(n,8,.9,6,4)}},cone:{desc:"a single traffic cone, faded",build(n){Xr(n,[0,0,0],1)}},cones:{desc:"a little cluster of traffic cones, one fallen",build(n){Xr(n,[0,0,0],1),Xr(n,[.5,0,.2],4);const e=n.parts.length;Xr(n,[0,0,0],7),Xn(n,e,{roll:1.5,yaw:.6,at:[-.4,.2,.4]}),Nt(n,6,.8,10,5)}},"cone-lantern":{desc:"a traffic cone lit from within like a lantern, a ring of mushrooms round it",glow:!0,build(n){Xr(n,[0,0,0],1,!0);for(let e=0;e<9;e++){const t=e/9*6.283,i=[Math.cos(t)*.55,0,Math.sin(t)*.45];n.seg(i,w.add(i,[0,.08,0]),.02,.02,l.CLOTH,{group:5}),n.ell(w.add(i,[0,.1,0]),[.06,.035,.06],l.BODY2,{group:6})}}},"highway-slab":{desc:"a slab of tarmac tilted up out of the ground, faded lane markings, a crash-barrier stub",build(n){const e=n.parts.length;n.box([0,0,0],[2.2,.14,1.3],l.STONE,{round:.03,group:1,rough:.01,paint:t=>gt(t,5,1)<.06||Math.abs(Math.sin(t[0]*3+t[2]*5)*.3+t[2]*.6-.2)<.02?l.STONED:t[1]>.1&&Math.abs(t[2])<.05&&(t[0]+9)*.8%1<.55?gt(t,12)<.3?l.STONE:l.CLOTH:t[1]>.1&&Math.abs(t[2]-1.1)<.04?l.BELLY:t[1]>.1&&gt(t,6,4)<.12?l.MOSS:void 0});for(const t of[-1.6,-.4])qe(n,[t,.1,1.25],[t,.75,1.25],2,.04);n.box([-1,.62,1.3],[.9,.1,.03],l.FRAME,{group:3,paint:t=>Math.abs(t[1]-.62)<.02?l.STONED:Ct(.5,.1)(t)}),Xn(n,e,{pitch:.38,roll:.08,at:[0,.7,0]}),n.ell([-1.8,.1,0],[.6,.2,1.3],l.BARK2,{group:5,rough:.04,paint:t=>t[1]>.2?l.MOSS:void 0}),Nt(n,16,2.4,6,6)}},"highway-line":{desc:"a section of cracked road, its white line broken, grass in the cracks",build(n){n.box([0,.02,0],[2,.03,1],l.STONE,{round:.02,group:1,paint:e=>gt(e,4,9)<.08||Math.abs(Math.sin(e[0]*2.3)*.4-e[2])<.025?gt(e,20)<.4?l.LEAF2:l.STONED:Math.abs(e[2]+.05)<.05&&(e[0]+9)*.7%1<.6?l.CLOTH:gt(e,6)<.08?l.MOSS:void 0});for(const[e,t]of[[-1.2,.3],[.4,-.2],[1.3,.5]])Nt(n,4,.2,3,e*10+7,e,t)}},"road-sign":{desc:"a fallen road sign, blank but for an abstract arrow",build(n){qe(n,[-.9,.05,.2],[.6,.1,-.1],1,.03),n.box([.9,.12,-.15],[.62,.05,.46],l.HAT1,{group:2,dir:[1,.25,-.2],round:.02,paint:e=>{const t=e[0]-.9,i=e[2]+.15;return Math.abs(i)<.08&&t>-.36&&t<.2||t>.08&&Math.abs(i)<.28-(t-.08)*.9&&t<.38?l.BELLY:Math.hypot(Math.abs(t)-.56,Math.abs(i)-.4)<.04?l.FRAME:Ct(.2,.1)(e)}}),Nt(n,8,1.2,4,7)}},"phone-box":{desc:"an overgrown phone box, its panes long gone",build(n){n.box([0,1,0],[.42,1,.42],l.ACCENT,{round:.04,group:1,paint:e=>Math.max(Math.abs(e[0]),Math.abs(e[2]))>.38&&e[1]>.5&&e[1]<1.75&&e[1]*5%1>.12&&(Math.abs(e[0])+Math.abs(e[2]))*5%1>.12?l.SHADES:Ct(.3,.15)(e)}),n.box([0,2.08,0],[.46,.09,.46],l.ACCENT,{round:.06,group:2,paint:Ct(.3,.3)}),Nn(n,[.43,0,.3],[.4,1.9,.43],3,8),Nn(n,[-.3,0,.43],[-.1,1.4,.43],4,9),Nt(n,10,.9,5,8)}},lamppost:{desc:"a lamppost bent over, its lamp hanging near the ground",build(n){n.chain([[0,0,0,.06],[0,1.4,0,.05],[.2,2.1,0,.045],[.8,2.2,0,.04],[1.2,1.7,0,.035]],l.FRAME,{group:1,paint:Ct(.4,.05)}),n.box([1.25,1.55,0],[.16,.1,.12],l.FRAME,{round:.04,group:2}),n.ell([1.25,1.45,0],[.12,.06,.1],l.SHADES,{group:2}),Nn(n,[0,0,.06],[.05,1.5,.06],3,10),Nt(n,6,.7,4,9)}},sofa:{desc:"a sofa left in a clearing, moss on its cushions",build(n){const e=t=>gt(t,6,5)<.25&&t[1]>.4?l.MOSS:gt(t,14)>.9?l.STONED:void 0;n.box([0,.3,0],[.9,.2,.4],l.CLOTH,{round:.1,group:1,paint:e}),n.box([-.02,.7,-.32],[.9,.3,.12],l.CLOTH,{round:.1,group:2,paint:e});for(const t of[-.85,.85])n.box([t,.55,0],[.12,.22,.42],l.CLOTH,{round:.1,group:3,paint:e});for(const t of[-.4,.4])n.box([t,.53,.05],[.42,.08,.34],l.CLOTH,{round:.08,group:4,paint:e});Nt(n,14,1.6,5,10)}},"washing-machine":{desc:"a washing machine in the undergrowth, a fern in its drum",build(n){n.box([0,.42,0],[.32,.42,.32],l.BELLY,{round:.05,group:1,paint:e=>e[2]>.28&&Math.hypot(e[0],e[1]-.4)<.2?Math.hypot(e[0],e[1]-.4)<.15?l.SHADES:l.FRAME:Ct(.25,.15)(e)}),ka(n,[0,.4,.4],2,.55),Nt(n,8,.8,3,11)}},"bike-roots":{desc:"a bicycle tangled in tree roots",build(n){for(const e of[-.45,.45])for(let t=0;t<12;t++){const i=t/12*6.283,r=(t+1)/12*6.283;qe(n,[e+Math.cos(i)*.3,.32+Math.sin(i)*.3,0],[e+Math.cos(r)*.3,.32+Math.sin(r)*.3,0],1+(e>0?1:0),.018)}for(const[e,t]of[[[-.45,.32,0],[0,.35,0]],[[0,.35,0],[.3,.7,0]],[[-.45,.32,0],[-.15,.72,0]],[[-.15,.72,0],[.3,.7,0]],[[.3,.7,0],[.45,.32,0]],[[0,.35,0],[-.15,.72,0]],[[.3,.7,0],[.35,.85,0]]])qe(n,e,t,3,.022);n.box([-.17,.76,0],[.1,.03,.04],l.SHADES,{group:4}),qe(n,[.25,.85,-.15],[.42,.87,.15],4,.018);for(let e=0;e<4;e++)n.chain([[-1+e*.2,0,-.4,.09],[-.3+e*.3,.35+e%2*.2,-.05+e*.05,.07],[.4+e*.2,.1,.3,.05]],l.TRUNK,{group:5+e%2,rough:.01})}},"dish-birdbath":{desc:"a satellite dish fallen face-up, full of rainwater, a bird drinking",build(n){n.ell([0,.2,0],[.6,.22,.6],l.BELLY,{group:1,paint:Ct(.25,.2)}),n.ell([0,.34,0],[.52,.12,.52],l.BELLY,{group:1,cut:!0}),n.ell([0,.28,0],[.48,.02,.48],l.WATER,{group:2}),qe(n,[0,.25,-.5],[.1,.8,-.6],3,.03);const e=[.5,.45,.3];n.ell(e,[.12,.07,.06],l.BODY3,{group:4,dir:[1,.3,0]}),n.ell(w.add(e,[.1,.07,0]),[.05,.05,.045],l.BODY3,{group:4}),n.seg(w.add(e,[.14,.07,0]),w.add(e,[.2,.04,0]),.012,.004,l.ACCENT,{group:4}),Nt(n,8,1,5,12)}},"fridge-fireflies":{desc:"a fridge standing in the woods, its door ajar, fireflies inside",glow:!0,build(n){n.box([0,.85,0],[.36,.85,.32],l.BELLY,{round:.05,group:1,paint:e=>e[2]>.28&&Math.abs(e[0])<.3&&e[1]<1.55&&e[1]>.1?l.SHADES:Ct(.25,.2)(e)}),n.box([.5,.85,.4],[.03,.78,.3],l.BELLY,{dir:[.5,0,1],round:.03,group:2,paint:Ct(.25,.15)});for(let e=0;e<7;e++)Dr(n,[(Ut(e)-.5)*.4,.4+Ut(e,2)*1,.2+Ut(e,3)*.3],.03,10+e,e%2?l.MAGIC:l.MAGIC2);Nn(n,[-.36,0,.3],[-.3,1.6,.33],3,13)}}};function Pc(n,e){const t=[[-.35,.45,-.25],[.35,.45,-.25],[.35,.45,.25],[-.35,.45,.25],[-.3,.9,-.28],[.4,.9,-.28],[.4,.9,.28],[-.3,.9,.28]];for(const[i,r]of[[0,1],[1,2],[2,3],[3,0],[4,5],[5,6],[6,7],[7,4],[0,4],[1,5],[2,6],[3,7]])qe(n,t[i],t[r],e,.015);for(let i=1;i<6;i++){const r=i/6;qe(n,w.lerp(t[0],t[1],r),w.lerp(t[4],t[5],r),e,.008),qe(n,w.lerp(t[3],t[2],r),w.lerp(t[7],t[6],r),e,.008)}qe(n,t[4],[-.45,.95,-.28],e,.015),qe(n,t[7],[-.45,.95,.28],e,.015),qe(n,[-.45,.95,-.28],[-.45,.95,.28],e,.025,l.ACCENT);for(const[i,r]of[[-.3,-.22],[.3,-.22],[-.3,.22],[.3,.22]])qe(n,[i,.45,r],[i,.08,r],e,.012),n.ell([i,.06,r],[.05,.05,.02],l.BODY3,{group:e+1})}function Xr(n,e,t,i=!1){n.box(w.add(e,[0,.03,0]),[.24,.03,.24],l.ACCENT,{round:.02,group:t,paint:Ct(.15,.2)}),n.seg(w.add(e,[0,.05,0]),w.add(e,[0,.72,0]),.2,.03,l.ACCENT,{group:t+1,paint:r=>Math.abs(r[1]-e[1]-.42)<.07?i?l.MAGIC2:l.CLOTH:i&&gt(r,18)<.2?l.GLOW:Ct(.15,.1)(r)}),i&&Dr(n,w.add(e,[0,.78,0]),.05,t+2,l.MAGIC2)}const a_={swings:{desc:"a rusty swing set, one swing hanging, one chain broken; the hanging one sways on its own with a faint sparkle",glow:!0,split:1.6,build(n){for(const e of[-1.1,1.1])for(const t of[-.5,.5])qe(n,[e,0,t],[e*.95,2.1,0],1,.045);qe(n,[-1.1,2.1,0],[1.1,2.1,0],2,.05);for(const e of[-.12,.12])qe(n,[-.5,2.08,e],[-.42,.55,e*1.2],3,.012);n.box([-.42,.52,0],[.2,.025,.14],l.BODY3,{round:.02,group:3,dir:[1,-.15,0]});for(let e=0;e<5;e++)Dr(n,[-.42+(Ut(e)-.5)*.5,.6+Ut(e,2)*.7,(Ut(e,3)-.5)*.3],.025,10+e);qe(n,[.5,2.08,-.12],[.5,1.3,-.12],4,.012),qe(n,[.5,2.08,.12],[.58,.9,.2],4,.012),n.box([.7,.04,.3],[.2,.025,.14],l.BODY3,{round:.02,group:5,dir:[1,0,.5]}),Nn(n,[1.1,0,.5],[1.05,1.6,.25],6,14),Nt(n,14,1.8,7,15)}},slide:{desc:"a slide half-swallowed by brambles, a sapling at its foot",split:1.6,build(n){for(const e of[-.95,-.55])for(const t of[-.3,.3])qe(n,[e,0,t],[e,1.5,t],1,.035);for(let e=1;e<6;e++)qe(n,[-.95,e*.27,-.3],[-.95,e*.27,.3],1,.02);n.box([-.75,1.5,0],[.25,.04,.32],l.FRAME,{group:2,paint:Ct(.4,.1)}),n.box([.35,.78,0],[.95,.03,.26],l.HAT1,{dir:[1,-.75,0],round:.02,group:3,paint:e=>Math.abs(e[2])>.22?l.FRAME:Ct(.35,.15)(e)});for(let e=0;e<10;e++){const t=Ut(e,3)*6.283;n.chain([[.4+Math.cos(t)*.9,0,Math.sin(t)*.6,.03],[.3+Math.cos(t)*.4,.5+Ut(e)*.5,Math.sin(t)*.3,.025],[.1+Ut(e,4)*.6,.7+Ut(e,5)*.4,(Ut(e,6)-.5)*.4,.015]],l.BARKD,{group:5+e%2}),e%3===0&&n.ell([.3+Ut(e,7)*.6,.5+Ut(e,8)*.4,(Ut(e,9)-.5)*.5],[.2,.14,.16],l.LEAF,{group:7,rough:.03,paint:i=>gt(i,30)<.1?l.ACCENT:void 0})}n.seg([1.45,0,.2],[1.45,1.2,.2],.03,.02,l.TRUNK,{group:8}),rs(n,[1.45,1.3,.2],[.25,.2,.22],9)}},roundabout:{desc:"a roundabout tilted in the moss",build(n){const e=n.parts.length;n.ell([0,.2,0],[.9,.05,.9],l.HAT2,{group:1,paint:t=>Math.abs(Math.sin(Math.atan2(t[2],t[0])*3))<.08?l.FRAME:Ct(.35,.2)(t)});for(let t=0;t<3;t++){const i=t/3*6.283;qe(n,[Math.cos(i)*.7,.25,Math.sin(i)*.7],[Math.cos(i)*.7,.6,Math.sin(i)*.7],2,.025),qe(n,[Math.cos(i)*.7,.6,Math.sin(i)*.7],[Math.cos(i)*.1,.6,Math.sin(i)*.1],2,.02)}Xn(n,e,{pitch:.18,roll:.1,at:[0,.05,0]}),n.ell([0,.05,0],[1.1,.08,1],l.MOSS,{group:4}),Nt(n,10,1.3,5,16)}},seesaw:{desc:"a seesaw stuck at an angle",build(n){n.box([0,.2,0],[.08,.2,.14],l.FRAME,{round:.02,group:1,paint:Ct(.4,.1)});const e=n.parts.length;n.box([0,0,0],[1.3,.035,.12],l.WOOD,{round:.02,group:2,paint:t=>gt(t,8)<.2?l.MOSS:void 0});for(const t of[-1.05,1.05])qe(n,[t,.03,-.12],[t,.03,.12],3,.02);Xn(n,e,{pitch:.32,at:[0,.42,0]}),Nt(n,10,1.4,5,17)}},"climbing-frame":{desc:"a climbing frame, a dome of bars wound with ivy",split:1.4,build(n){const t=(i,r)=>{const a=i/8*6.283,s=r/4*Math.PI/2;return[Math.cos(a)*Math.cos(s)*1,Math.sin(s)*1*1.5,Math.sin(a)*Math.cos(s)*1]};for(let i=0;i<8;i++)for(let r=0;r<4;r++)qe(n,t(i,r),t(i,r+1),1,.025),qe(n,t(i,r),t(i+1,r),1,.025);for(let i=0;i<3;i++)Nn(n,t(i*3,0),t(i*3+1,3),3+i,18+i);Nt(n,12,1.4,6,18)}},"spring-rider":{desc:"a spring rider animal, its paint faded (a generic animal, no characters)",build(n){for(let e=0;e<6;e++)n.seg([Math.cos(e*2)*.06,e*.07,Math.sin(e*2)*.06],[Math.cos(e*2+2)*.06,(e+1)*.07,Math.sin(e*2+2)*.06],.022,.022,l.FRAME,{group:1});n.ell([0,.55,0],[.35,.16,.14],l.BODY,{group:2,paint:Ct(.4,.2)}),n.ell([.32,.72,0],[.12,.11,.1],l.BODY,{group:2,paint:Ct(.4,.2)});for(const e of[-.05,.05])n.ell([.28,.85,e],[.03,.06,.02],l.BODY,{group:3});n.ell([.43,.74,.06],[.015,.015,.015],l.SHADES,{group:3}),qe(n,[.25,.68,-.12],[.25,.68,.12],4,.015),n.box([0,.02,0],[.25,.02,.25],l.STONE,{group:5}),Nt(n,8,.8,6,19)}}};function s_(n,e,t,i,r,a=1){n.box([0,.015,0],[e,.015,t],i,{round:.01,group:a,paint:s=>gt(s,3,4)<.05||Math.abs(Math.sin(s[0]*1.3+1)*.5+Math.sin(s[0]*4.1)*.08-s[2]*.3)<.012?gt(s,18)<.5?l.LEAF2:l.STONED:r(s[0],s[2])?gt(s,10,2)<.25?i:l.CLOTH:gt(s,5,7)<.07?l.MOSS:void 0})}const Dn=(n,e,t=.045)=>Math.abs(n-e)<t,o_={"tennis-court":{desc:"a cracked tennis court, faded lines, grass through the cracks",decal:!0,build(n){s_(n,4.4+.5,2+.5,l.HAT2,(i,r)=>Math.abs(i)<=4.4+.05&&Math.abs(r)<=2+.05&&(Dn(Math.abs(i),4.4)||Dn(Math.abs(r),2)||Dn(Math.abs(r),2*.75)||Math.abs(i)<4.4*.54&&(Dn(r,0)||Dn(Math.abs(i),4.4*.54))))}},"tennis-net":{desc:"a sagging tennis net between its posts",build(n){for(const e of[-2.2,2.2])qe(n,[0,0,e],[0,.55,e],1,.035);n.box([0,.38,0],[.01,.17,2.15],l.CLOTH,{group:2,paint:e=>e[1]>.5?l.CLOTH:e[1]*25%1<.25||(e[2]+5)*25%1<.25?l.SHADES:void 0}),n.box([0,.25,0],[.012,.15,1],l.SHADES,{group:2,cut:!0})}},"umpire-chair":{desc:"a tennis umpire's chair leaning over",split:1.4,build(n){const e=n.parts.length;for(const t of[-.25,.25])for(const i of[-.2,.2])qe(n,[t*1.4,0,i*1.4],[t,1.5,i],1,.03);for(let t=1;t<5;t++)qe(n,[-.3,t*.3,-.22],[-.3,t*.3,.22],1,.02);n.box([0,1.55,0],[.28,.04,.25],l.WOOD,{group:2}),n.box([-.26,1.8,0],[.03,.25,.25],l.WOOD,{group:2}),Xn(n,e,{roll:.25,pitch:-.1}),Nt(n,8,1,4,20)}},"court-fence":{desc:"a chain-link fence section, ivy through it, a gap torn in it",build(n){for(const e of[-1.5,0,1.5])qe(n,[e,0,0],[e,1.7,0],1,.03);qe(n,[-1.5,1.7,0],[1.5,1.7,0],1,.025),n.box([0,.85,0],[1.5,.85,.008],l.FRAME,{group:2,paint:e=>(e[0]+e[1]+9)*9%1<.2||(e[0]-e[1]+9)*9%1<.2?gt(e,5)<.15?l.BODY2:l.FRAME:l.SHADES}),n.ell([.7,.5,0],[.4,.5,.05],l.SHADES,{group:2,cut:!0,rough:.08});for(let e=0;e<3;e++)Nn(n,[-1.3+e*.6,0,.03],[-1.1+e*.5,1.5,.03],3+e,21+e)}},"tennis-balls":{desc:"a few old tennis balls glowing faintly in the grass",glow:!0,build(n){for(let e=0;e<4;e++)Dr(n,[(Ut(e)-.5)*1.2,.06,(Ut(e,2)-.5)*.8],.06,1+e,e%2?l.MAGIC:l.MAGIC2);n.ell([0,.004,0],[.8,.004,.5],l.LEAF3,{group:9}),Nt(n,8,.8,5,22)}},"baseball-diamond":{desc:"a baseball diamond: the worn dirt infield, grown-over bases, a pitcher's mound",decal:!0,build(n){n.box([0,.015,0],[2.2*1.6,.015,2.2*1.2],l.LEAF2,{group:1,round:.01,paint:t=>{const i=Math.abs(t[0])/2.2+Math.abs(t[2])/1.6500000000000001;return i<1.08&&i>.78?gt(t,8)<.2?l.LEAF2:l.BARK2:i<=.78?gt(t,6)<.15?l.MOSS:void 0:gt(t,6,3)<.3?l.LEAF:void 0}});for(const[t,i]of[[2.2,0],[0,2.2*.75],[-2.2,0],[0,-2.2*.75]])n.box([t*.93,.04,i*.93],[.12,.02,.1],l.BELLY,{group:2,round:.02,paint:r=>gt(r,20)<.3?l.LEAF2:void 0});n.ell([0,.02,0],[.35,.08,.28],l.BARK2,{group:3})}},backstop:{desc:"a baseball backstop fence, a dugout bench beside it",build(n){for(let e=0;e<=4;e++){const t=-.8+e*.4;qe(n,[-Math.cos(t)*.8,0,Math.sin(t)*1.4],[-Math.cos(t)*.8,1.8,Math.sin(t)*1.4],1,.03)}for(let e=0;e<4;e++){const t=-.8+e*.4,i=t+.4,r=[-Math.cos(t)*.8,.9,Math.sin(t)*1.4],a=[-Math.cos(i)*.8,.9,Math.sin(i)*1.4],s=w.lerp(r,a,.5);n.box(s,[Math.hypot(a[0]-r[0],a[2]-r[2])/2,.9,.008],l.FRAME,{dir:w.sub(a,r),group:2,paint:o=>(o[1]+o[0]*2+9)*9%1<.2?gt(o,5)<.2?l.BODY2:l.FRAME:l.SHADES})}n.box([-.6,.3,2],[.15,.04,.7],l.WOOD,{group:3});for(const e of[1.4,2.6])n.box([-.6,.14,e],[.12,.14,.04],l.WOOD,{group:3});Nn(n,[-.75,0,-.5],[-.7,1.6,-.4],4,25)}},scoreboard:{desc:"a scoreboard frame, panels missing (no text)",split:1.8,build(n){for(const e of[-1,1])qe(n,[e,0,0],[e,2.6,0],1,.05);for(let e=0;e<3;e++)for(let t=0;t<5;t++)Ut(e,t)>.3&&n.box([-.8+t*.4,1.6+e*.32,0],[.18,.14,.03],l.HAT1,{group:2+e,round:.01,paint:Ct(.3,.1)});n.box([0,2.62,0],[1.1,.05,.06],l.FRAME,{group:5}),Nn(n,[-1,0,.06],[-.95,2.3,.06],6,26)}},"football-pitch":{desc:"a football pitch: faded lines, a centre circle, mown stripes long grown out",decal:!0,build(n){n.box([0,.015,0],[5.2+.5,.015,3.3+.5],l.LEAF2,{group:1,round:.01,paint:i=>{const r=i[0],a=i[2];return Math.abs(r)<=5.2+.05&&Math.abs(a)<=3.3+.05&&(Dn(Math.abs(r),5.2,.06)||Dn(Math.abs(a),3.3,.06)||Dn(r,0,.06)||Dn(Math.hypot(r,a*1),1,.06)||Math.abs(r)>5.2-1&&Math.abs(a)<1.6&&(Dn(Math.abs(r),5.2-1,.06)||Dn(Math.abs(a),1.6,.06)))?gt(i,8,2)<.3?l.LEAF2:l.CLOTH:Math.floor((r+20)*.8)%2?gt(i,6)<.25?l.LEAF2:l.LEAF:gt(i,5,9)<.1?l.LEAF3:void 0}})}},goal:{desc:"a football goal, its net torn, a sapling grown through it",split:1.1,build(n){Ic(n,1),n.seg([.3,0,.2],[.3,1.5,.2],.035,.025,l.TRUNK,{group:5}),rs(n,[.3,1.6,.2],[.35,.25,.3],6),Nt(n,8,1.2,7,27)}},"goal-tipped":{desc:"a football goal tipped on its back",build(n){const e=n.parts.length;Ic(n,1),Xn(n,e,{pitch:-Math.PI/2+.12,at:[-.5,.06,0]}),Nt(n,8,1.2,7,28)}},"corner-flag":{desc:"a corner flag, its flag a faded rag",build(n){qe(n,[0,0,0],[0,.9,0],1,.015),n.box([.12,.8,0],[.12,.08,.006],l.ACCENT,{group:2,dir:[1,-.3,.1],paint:Ct(.2,0)}),Nt(n,5,.4,3,29)}},floodlight:{desc:"a floodlight pylon, one lamp still flickering with fairy light",glow:!0,split:2.4,build(n){for(const[t,i]of[[-.25,-.25],[.25,-.25],[.25,.25],[-.25,.25]])qe(n,[t*1.6,0,i*1.6],[t*.5,4,i*.5],1,.035);for(let t=1;t<8;t++){const i=t*4/8,r=1.6-1.1*i/4;qe(n,[-.25*r,i,-.25*r],[.25*r,i+4/8,.25*r],2,.015),qe(n,[.25*r,i,-.25*r],[-.25*r,i+4/8,.25*r],2,.015)}for(let t=0;t<2;t++)for(let i=0;i<3;i++)n.box([-.3+i*.3,4+.2+t*.25,.1],[.12,.1,.06],l.FRAME,{group:3,round:.02,paint:r=>r[2]>.14?t===1&&i===1?l.MAGIC2:l.SHADES:Ct(.4,.1)(r)});Dr(n,[0,4+.45,.22],.06,4,l.MAGIC2),Nn(n,[-.4,0,.4],[-.2,2.4,.2],5,30)}},"basketball-hoop":{desc:"a basketball hoop on a leaning post, its net gone",split:1.8,build(n){const e=n.parts.length;qe(n,[0,0,0],[0,2.4,0],1,.05),n.box([.15,2.5,0],[.03,.3,.45],l.BELLY,{group:2,paint:t=>Math.abs(t[1]-2.4)<.1&&Math.abs(t[2])<.14&&Math.abs(Math.abs(t[2])-.12)<.02?l.ACCENT:Ct(.25,.1)(t)});for(let t=0;t<8;t++){const i=t/8*6.283,r=(t+1)/8*6.283;qe(n,[.36+Math.cos(i)*.17,2.32,Math.sin(i)*.17],[.36+Math.cos(r)*.17,2.32,Math.sin(r)*.17],3,.012,l.ACCENT)}Xn(n,e,{pitch:-.2}),Nt(n,8,1,5,31)}}};function Ic(n,e){for(const t of[-1.4,1.4])qe(n,[0,0,t],[0,1,t],e,.035,l.BELLY);qe(n,[0,1,-1.4],[0,1,1.4],e,.035,l.BELLY);for(const t of[-1.4,1.4])qe(n,[0,1,t],[-.6,0,t],e+1,.02,l.BELLY);n.box([-.3,.5,0],[.012,.55,1.38],l.CLOTH,{dir:[.6,1,0],group:e+2,paint:t=>t[1]*12%1<.3||(t[2]+5)*12%1<.3?l.CLOTH:l.SHADES}),n.ell([-.3,.4,.5],[.2,.3,.4],l.CLOTH,{group:e+2,cut:!0})}const l_=[...Object.entries(r_).map(([n,e])=>({id:n,family:"modern",size:1,split:null,...e})),...Object.entries(a_).map(([n,e])=>({id:n,family:"playground",size:1.1,split:null,...e})),...Object.entries(o_).map(([n,e])=>({id:n,family:"sports",size:1.1,split:null,...e}))];Object.fromEntries(l_.map(n=>[n.id,n]));const It=(n,e=0)=>{const t=Math.sin(n*127.1+e*311.7)*43758.5453;return t-Math.floor(t)},On=(n,e,t=0)=>It(Math.floor(n[0]*e)+Math.floor(n[2]*e)*57+t,Math.floor(n[1]*e)),Ko=n=>{const e=On(n,12);return e<.14?l.BARKD:e>.88?l.BARKL:void 0},c_=n=>e=>{const t=On(e,10,3);return e[1]<n[1]-.2||t<.2?l.LEAF3:t>.8?l.LEAF2:void 0},en=(n,e=0)=>t=>{const i=On(t,9,7);return t[1]>.05&&i<(n?.34:.12)&&On(t,3,1)<(n?.75:.45)?l.MOSS:e&&(t[1]*e%1<.1||((t[0]+t[2])*e*.7+Math.floor(t[1]*e)*.5)%1<.07)||i>.93?l.STONED:void 0},ot=(n,e,t,i,r,a={})=>n.box(e,t,l.STONE,{round:.03,rough:.012,group:i,paint:en(r,a.courses??5),...a}),un=(n,e,t,i,r)=>{const a=[];for(let s=0;s<=4;s++){const o=s/4;a.push([...w.add(w.lerp(e,t,o),[(It(r,s)-.5)*.15,0,.02]),.03])}n.chain(a,l.LEAF,{group:i,rough:.02,paint:s=>On(s,30)<.3?l.LEAF2:void 0})},ci=(n,e,t,i,r)=>{for(let a=0;a<e;a++){const s=It(r,a)*6.283,o=t*Math.sqrt(It(a,r)),u=Math.cos(s)*o,c=Math.sin(s)*o*.7;n.ell([u,.08,c],[.07,.1+It(a,4)*.08,.07],l.LEAF2,{group:i+a%3,paint:h=>h[1]>.14?l.LEAF:void 0})}},Vn=(n,e,t,i)=>n.ell(e,t,l.LEAF,{group:i,rough:.04,paint:c_(e)}),gn=(n,e,t)=>n.chain(e,l.TRUNK,{group:t,rough:.012,paint:Ko}),hn=(n,e,t,i,r={})=>n.ell(e,t,l.STONE,{group:i,rough:.03,dir:r.dir,paint:a=>a[1]>e[1]+t[1]*(r.moss??.62)&&On(a,5,i)<.7?l.MOSS:On(a,14)>.9?l.STONED:void 0}),Nc=(n,e,t,i,r=l.MAGIC)=>n.ell(e,[t,t,t],r,{group:i,extra:!0}),u_={"broken-arch":{desc:"a broken arch, one side fallen, a rune on its keystone",glow:!0,split:null,build(n,e){for(const t of[-1,1])ot(n,[t,t<0?1:.7,0],[.22,t<0?1:.7,.25],1+(t>0?1:0),e);for(let t=0;t<=6;t++){const i=Math.PI*(1-t/9),r=[Math.cos(i)*1,2+Math.sin(i)*.7,0];ot(n,r,[.17,.14,.25],3+t%2,e,{dir:[-Math.sin(i),Math.cos(i),0],courses:0,paint:t===4?(a=>Math.abs(a[0]-r[0])<.05&&Math.abs(a[1]-r[1])<.08?l.RUNE:en(e)(a)):en(e)})}for(let t=0;t<4;t++)ot(n,[1.3+t*.3,.14,.4+It(t)*.5],[.17,.13,.22],6+t,e,{dir:[1,.3*(It(t,2)-.5),It(t,3)-.5],courses:0});e&&(un(n,[-1.15,.1,.26],[-.9,1.9,.26],12,1),ci(n,14,1.8,14,2))}},"tower-stump":{desc:"a fallen tower's stump, a spiral stair climbing round its inside",split:2,build(n,e){for(let t=0;t<14;t++){const i=t/14*Math.PI*2,r=1+(Math.sin(i*2+1)*.5+.5)*1.6*(i>3.6&&i<5.4?1:.55);i>.9&&i<2||ot(n,[Math.cos(i)*1.05,r/2,Math.sin(i)*.95],[.25,r/2,.14],1+t%3,e,{dir:[-Math.sin(i),0,Math.cos(i)]})}for(let t=0;t<9;t++){const i=3.2+t*.42,r=.15+t*.26;ot(n,[Math.cos(i)*.7,r,Math.sin(i)*.6],[.24,.06,.12],5,e,{dir:[Math.cos(i),0,Math.sin(i)],courses:0})}for(let t=0;t<3;t++)ot(n,[.6+t*.35,.14,1.1],[.22,.13,.2],7,e,{dir:[1,0,.4*t],courses:0});e&&(un(n,[-1.05,.1,-.4],[-1,2.3,-.5],10,3),un(n,[.9,.1,-.6],[.95,1.7,-.55],11,4),n.ell([0,.2,0],[.55,.2,.5],l.LEAF,{group:12,rough:.04}))}},colonnade:{desc:"a colonnade, two columns standing and the rest toppled",split:null,build(n,e){ot(n,[0,.08,0],[2.2,.08,.55],1,e,{courses:0});for(const[t,i]of[[-1.7,1.9],[-.6,1.4]])n.seg([t,.16,0],[t,i,0],.18,.17,l.STONE,{group:2,rough:.01,paint:r=>Math.abs(Math.sin(Math.atan2(r[2],r[0]-t)*8))<.15?l.STONED:en(e,0)(r)}),ot(n,[t,i+.07,0],[.26,.07,.26],3,e,{courses:0});for(const[t,i,r]of[[.6,.55,.3],[1.6,.4,-.4]])n.seg([t-Math.cos(r)*.7,.2,i-Math.sin(r)*.7],[t+Math.cos(r)*.7,.2,i+Math.sin(r)*.7],.18,.18,l.STONE,{group:4,paint:en(e,0)});ot(n,[-1.15,2,0],[.75,.1,.28],5,e,{courses:0}),e&&(un(n,[-1.7,.2,.18],[-1.65,1.8,.18],8,5),ci(n,16,2.2,10,6))}},"stone-ring":{desc:"a ring of standing-stone stubs",split:null,build(n,e){for(let t=0;t<9;t++){const i=t/9*Math.PI*2,r=.3+It(t,9)*(t%3===0?1.2:.45);ot(n,[Math.cos(i)*1.7,r/2,Math.sin(i)*1.35],[.2,r/2,.14],1+t%4,e,{dir:[-Math.sin(i),.1*(It(t)-.5),Math.cos(i)],courses:0,round:.07})}ot(n,[0,.1,0],[.55,.1,.35],6,e,{courses:0,round:.05}),e&&ci(n,20,2,10,7)}},"chapel-wall":{desc:"a ruined chapel wall with an empty pointed window, moonlight caught in it",glow:!0,split:2.4,build(n,e){ot(n,[0,1.4,0],[1.4,1.4,.18],1,e,{paint:t=>{const i=t[0],r=t[1];return Math.abs(i)<.38&&r>1.1&&r<2.3-Math.abs(i)*.5?void 0:en(e,5)(t)}}),n.box([0,1.6,0],[.33,.55,.3],l.NOSE,{group:1,cut:!0}),n.ell([0,1.5,-.05],[.3,.5,.02],l.MAGIC2,{group:2,extra:!0,paint:t=>On(t,18)<.5?l.MAGIC:void 0});for(const[t,i]of[[-1.55,2.6],[1.5,1.6]])ot(n,[t,i/2,0],[.22,i/2,.26],3,e);for(let t=0;t<5;t++)ot(n,[-1.2+t*.6,.12,.55+It(t)*.3],[.18,.12,.16],4,e,{courses:0,dir:[1,0,It(t,5)-.5]});e&&(un(n,[-1.2,.1,.2],[-.6,2.6,.2],6,8),un(n,[1,.1,.2],[1.2,2,.2],7,9))}},well:{desc:"an old well with a broken winch, fireflies over the water",glow:!0,split:null,build(n,e){for(let t=0;t<12;t++){const i=t/12*Math.PI*2;ot(n,[Math.cos(i)*.55,.32,Math.sin(i)*.5],[.15,.32,.1],1+t%2,e,{dir:[-Math.sin(i),0,Math.cos(i)],courses:3})}n.ell([0,.55,0],[.42,.02,.38],l.WATER,{group:3});for(const t of[-.6,.6])n.box([t,1,0],[.06,.5,.06],l.WOOD,{group:4,round:.02});n.seg([-.6,1.4,0],[.1,1.25,.05],.04,.04,l.WOOD,{group:5}),n.seg([.1,1.25,.05],[0,.85,.1],.01,.01,l.STRAW,{group:5});for(let t=0;t<4;t++)Nc(n,[(It(t)-.5)*.8,.8+It(t,2)*.7,(It(t,3)-.5)*.6],.03,10+t,t%2?l.MAGIC:l.MAGIC2);e&&(un(n,[-.55,.05,.5],[-.4,.62,.5],15,10),ci(n,10,1,16,11))}},watchtower:{desc:"a crumbled watchtower, tall enough to see from the treetops",split:2.6,build(n,e){ot(n,[0,1.2,0],[.7,1.2,.7],1,e,{paint:t=>Math.abs(t[1]-1.9)<.16&&Math.abs(t[0])<.07&&t[2]>.6?l.NOSE:en(e,5)(t)});for(const[t,i,r]of[[-.5,-.5,1.3],[0,-.5,1],[.5,-.5,.7],[-.5,0,.9],[-.5,.5,.5],[.5,0,.3]])ot(n,[t,2.4+r/2,i],[.2,r/2,.2],1,e);n.box([0,.55,.7],[.25,.45,.1],l.NOSE,{group:1,cut:!0});for(let t=0;t<6;t++)ot(n,[.5+It(t)*1.2,.13,-.3+It(t,4)*1.2],[.17,.12,.15],2+t%2,e,{courses:0,dir:[1,0,It(t,5)-.5]});e&&(un(n,[-.7,.1,.3],[-.7,2.4,.2],4,12),un(n,[.3,.1,.72],[.5,1.8,.72],5,13),Vn(n,[.1,2.6,-.2],[.45,.3,.4],6))}},"sunken-stair":{desc:"a stairway going down into the ground, a dark doorway at its foot",split:null,build(n,e){for(const t of[-.6,.6])ot(n,[0,.2,t],[1.1,.2,.12],1,e,{courses:2});for(let t=0;t<5;t++)ot(n,[.8-t*.32,.3-t*.07,0],[.16,.04,.5],2,e,{courses:0});n.box([-.55,.08,0],[.28,.1,.48],l.NOSE,{group:3}),ot(n,[-1.1,.55,0],[.15,.55,.62],4,e),ot(n,[-1.05,1.15,0],[.2,.1,.7],5,e,{courses:0}),e&&(ci(n,12,1.6,10,14),un(n,[-1,1.2,.5],[-.9,.3,.62],13,15))}},"statue-head":{desc:"a toppled giant statue head, its eyes still faintly lit",glow:!0,split:null,build(n,e){const t=[0,.8,0],i=.62,r=(a,s)=>[t[0]+s,t[1]+a,t[2]+i];n.ell(t,[.8,1,.7],l.STONE,{group:1,rough:.012,dir:[1,.25,0],paint:en(e,0)}),n.ell(r(.3,0),[.62,.14,.16],l.STONE,{group:2,paint:en(e,0)});for(const a of[-.26,.26])n.ell(r(.12,a),[.15,.09,.1],l.STONED,{group:1,cut:!0}),Nc(n,r(.12,a),.05,3+(a>0?1:0),l.MAGIC);n.ell(r(-.08,0),[.11,.24,.14],l.STONE,{group:5,paint:en(e,0)}),n.ell(r(-.42,0),[.3,.07,.08],l.STONE,{group:6,paint:a=>Math.abs(a[1]-(t[1]-.42))<.015?l.STONED:en(e,0)(a)});for(const[a,s]of[[-.55,.75],[0,.95],[.5,.8],[-.7,.3],[.75,.3]])n.ell([t[0]+a,t[1]+s,t[2]-.2],[.3,.25,.45],l.STONE,{group:7,rough:.02,paint:en(e,0)});n.ell([t[0],.05,t[2]+.2],[1,.1,.8],l.STONE,{group:8,paint:en(e,0)}),e&&(ci(n,14,1.8,10,16),Vn(n,w.add(t,[-.2,.95,-.2]),[.5,.25,.45],6))}},hearth:{desc:"a collapsed cottage: its hearth and chimney still standing",split:2.6,build(n,e){ot(n,[0,1.6,-.2],[.45,1.6,.35],1,e),n.box([0,.45,.1],[.3,.3,.3],l.NOSE,{group:1,cut:!0});for(const[t,i,r,a,s]of[[-1.1,.4,.9,.5,0],[1,.5,.7,.35,0],[-1.9,-.2,.12,.35,1]])ot(n,[t,a/2,i],s?[.12,a/2,.7]:[r,a/2,.12],2,e);for(let t=0;t<4;t++)n.seg([-.5+t*.4,.08,.9],[.2+t*.5,.3,.3+t*.1],.05,.05,l.BARKD,{group:3});e&&(un(n,[-.4,.1,.16],[-.3,2.8,.16],5,17),ci(n,14,1.8,10,18))}},"bridge-span":{desc:"an old bridge span going nowhere, one arch over nothing",split:null,build(n,e){ot(n,[-.9,.7,0],[.35,.7,.5],1,e),ot(n,[.95,.55,0],[.3,.55,.5],2,e);for(let t=0;t<=8;t++){const i=t/8,r=Math.PI*(1-i),a=[Math.cos(r)*.85,.9+Math.sin(r)*.55,0];ot(n,a,[.14,.12,.5],3+t%2,e,{dir:[-Math.sin(r),Math.cos(r),0],courses:0})}ot(n,[-.1,1.62,0],[1.25,.1,.55],5,e,{courses:0,dir:[1,-.08,0]});for(const t of[-.5,.5])ot(n,[-.2,1.85,t],[1,.14,.06],6,e,{courses:0});e&&(un(n,[-1.2,.1,.5],[-1,1.6,.55],8,19),ci(n,10,1.6,10,20))}},gateway:{desc:"an overgrown gateway, two posts and a rusted gate, a rune glowing on one post",glow:!0,split:null,build(n,e){for(const t of[-.9,.9])ot(n,[t,.9,0],[.22,.9,.22],1+(t>0?1:0),e,{paint:t<0?(i=>i[2]>.2&&Math.abs(i[1]-1.1)<.14&&Math.abs(i[0]-t)<.06?l.RUNE:en(e,5)(i)):en(e,5)}),n.ell([t,1.9,0],[.18,.14,.18],l.STONE,{group:3,paint:en(e,0)});for(let t=0;t<6;t++)n.seg([-.65+t*.12,.1,.1+t*.06],[-.65+t*.12,1.2,.1+t*.06],.015,.015,l.SHADES,{group:4});for(const t of[.25,1.1])n.seg([-.65,t,.1],[-.05,t,.4],.018,.018,l.SHADES,{group:4});for(const t of[-1,1])for(let i=0;i<3;i++)ot(n,[t*(1.3+i*.35),.3-i*.08,0],[.17,.3-i*.08,.14],5,e);e&&(un(n,[.75,.05,.22],[.85,1.9,.22],7,21),un(n,[-.9,1.8,.22],[-.3,1,.3],8,22),ci(n,12,1.6,10,23))}}},h_={pebbles:{desc:"a cluster of fist-sized stones",build(n){for(let e=0;e<7;e++)hn(n,[(It(e)-.5)*.6,.04,(It(e,2)-.5)*.4],[.07+It(e,3)*.05,.05,.07],1+e,{moss:.8})}},pair:{desc:"two small rocks",build(n){hn(n,[-.15,.12,0],[.22,.15,.2],1),hn(n,[.2,.08,.12],[.14,.1,.13],2)}},rock:{desc:"a knee-high rock",build(n){hn(n,[0,.22,0],[.45,.3,.38],1,{dir:[1,.15,.2]})}},split:{desc:"a rock split in two, a seedling in the crack",build(n){hn(n,[-.28,.35,0],[.3,.45,.45],1,{dir:[1,.3,0]}),hn(n,[.3,.33,0],[.3,.42,.45],2,{dir:[1,-.3,0]}),n.seg([.02,.2,.1],[0,.6,.1],.015,.01,l.TRUNK,{group:3}),Vn(n,[0,.62,.1],[.1,.07,.1],4)}},boulder:{desc:"a big boulder",build(n){hn(n,[0,.55,0],[.85,.75,.7],1,{dir:[1,.1,.3]}),hn(n,[.7,.15,.5],[.22,.15,.2],2)}},"great-boulder":{desc:"a great mossy boulder, a landmark",build(n){hn(n,[0,.9,0],[1.4,1.15,1.1],1,{dir:[1,.2,.1],moss:.2}),hn(n,[-1.1,.3,.6],[.4,.35,.35],2),hn(n,[1.2,.2,.5],[.3,.22,.28],3)}},slab:{desc:"a flat slab of rock",build(n){n.box([0,.12,0],[1,.12,.7],l.STONE,{round:.08,rough:.02,group:1,dir:[1,.04,.2],paint:e=>e[1]>.2&&On(e,6)<.3?l.MOSS:On(e,14)>.9?l.STONED:void 0})}},"standing-rock":{desc:"a tall natural standing rock",build(n){hn(n,[0,.8,0],[.35,.85,.3],1,{moss:.8}),hn(n,[.35,.1,.25],[.15,.1,.14],2)}}},d_={"spiral-tree":{desc:"a tree whose trunk twists in a spiral",split:2.4,build(n){const e=[];for(let t=0;t<=10;t++){const i=t/10,r=i*Math.PI*4;e.push([Math.cos(r)*.35*(1-i*.4),i*3,Math.sin(r)*.3,.2-i*.12])}gn(n,e,1),Vn(n,[0,3.2,0],[.9,.6,.8],2)}},"loop-tree":{desc:"a tree grown into a loop",split:2.4,build(n){const e=[[0,0,0,.22],[.1,.9,0,.18]];for(let t=0;t<=10;t++){const i=-Math.PI/2+t/10*Math.PI*2;e.push([.1+Math.cos(i)*.55+t*.02,1.45+Math.sin(i)*.55,0,.15])}e.push([.3,2.6,0,.1]),gn(n,e,1),Vn(n,[.3,2.9,0],[.75,.5,.65],2)}},"split-tree":{desc:"a tree split by lightning, both halves still leafing",split:2,build(n){gn(n,[[0,0,0,.3],[0,.9,0,.26]],1),gn(n,[[-.05,.9,0,.18],[-.6,1.9,0,.13],[-1,2.6,0,.07]],2),gn(n,[[.05,.9,0,.18],[.55,1.8,.05,.13],[.9,2.4,.05,.07]],3),n.ell([0,1,.05],[.08,.25,.2],l.BARKD,{group:1,cut:!0}),Vn(n,[-1,2.7,0],[.6,.45,.5],4),Vn(n,[.95,2.5,.05],[.55,.4,.5],5)}},"door-tree":{desc:"a fat old tree with a little round door in it, a lit window above",glow:!0,split:2.3,build(n){n.ell([0,1,0],[.8,1.1,.75],l.TRUNK,{group:1,rough:.02,paint:e=>e[2]>.5&&Math.hypot(e[0],e[1]-.45)<.3&&e[1]>.2?Math.hypot(e[0],e[1]-.45)<.25?Math.abs(e[0]%.1)<.015?l.BARKD:l.ACCENT:l.BARKD:e[2]>.45&&Math.hypot(e[0]-.3,e[1]-1.3)<.13?Math.abs(e[0]-.3)<.015||Math.abs(e[1]-1.3)<.015?l.BARKD:l.GLOW:Ko(e)}),n.ell([.12,.45,.72],[.03,.03,.03],l.FRAME,{group:2}),Vn(n,[0,2.4,-.1],[1.1,.7,.9],3);for(let e=0;e<5;e++){const t=e/5*Math.PI*2;gn(n,[[Math.cos(t)*.6,.2,Math.sin(t)*.55,.15],[Math.cos(t)*1.1,.02,Math.sin(t)*1,.05]],4)}}},"mushroom-tree":{desc:"an enormous mushroom, tall as a tree",split:2.2,build(n){n.seg([0,0,0],[.1,2.4,0],.3,.22,l.CLOTH,{group:1,paint:e=>e[1]>2&&e[1]<2.15?l.BELLY:void 0}),n.ell([.1,2.55,0],[1.3,.45,1.15],l.ACCENT,{group:2,rough:.01,paint:e=>e[1]<2.35?l.BODY2:On(e,8)<.18?l.BELLY:void 0}),n.ell([.1,2.35,0],[1.2,.08,1.05],l.BODY2,{group:3,paint:e=>Math.abs(Math.sin(Math.atan2(e[2],e[0]-.1)*20))<.3?l.STRAW:void 0})}},"root-tree":{desc:"an upside-down-looking tree, its roots raised high like a crown",split:2,build(n){gn(n,[[0,0,0,.35],[0,1.6,0,.25]],1);for(let e=0;e<7;e++){const t=e/7*Math.PI*2;gn(n,[[0,1.6,0,.16],[Math.cos(t)*.7,2.2+It(e)*.3,Math.sin(t)*.6,.1],[Math.cos(t)*1.2,2.5+It(e,2)*.4,Math.sin(t)*1,.04]],2+e%2)}for(let e=0;e<4;e++){const t=e/4*Math.PI*2+.4;gn(n,[[Math.cos(t)*.25,.3,Math.sin(t)*.25,.14],[Math.cos(t)*.6,.02,Math.sin(t)*.55,.05]],4)}}},"stone-lifter":{desc:"a tree that has lifted great stones up in its roots",split:2.4,build(n){gn(n,[[0,.6,0,.3],[0,2,0,.22],[.1,2.8,0,.12]],1);for(let e=0;e<6;e++){const t=e/6*Math.PI*2;gn(n,[[Math.cos(t)*.2,.6,Math.sin(t)*.2,.15],[Math.cos(t)*.6,.45,Math.sin(t)*.55,.12],[Math.cos(t)*.9,0,Math.sin(t)*.8,.07]],2)}for(const[e,t,i]of[[.5,.45,.9],[-.5,.4,1.1],[.15,-.5,.8]])hn(n,[e,i,t],[.3,.24,.26],3);Vn(n,[.1,3,0],[1,.6,.85],4)}},"ring-tree":{desc:"a hollow ring of a tree you could fly through",split:null,build(n){for(let e=0;e<=16;e++){const t=e/16*Math.PI*2,i=[Math.cos(t)*1.2,1.35+Math.sin(t)*1.2,0];n.ell(i,[.3,.3,.3],l.TRUNK,{group:1,rough:.02,paint:Ko})}gn(n,[[-.6,0,.2,.3],[-.5,.3,.1,.3]],2),gn(n,[[.6,0,.2,.3],[.5,.3,.1,.3]],2);for(const[e,t]of[[-.9,2.3],[.3,2.65],[1.1,2]])Vn(n,[e,t,-.1],[.45,.3,.35],3)}}},f_=[...Object.entries(u_).map(([n,e])=>({id:n,family:"ruins",size:1.15,variants:2,...e})),...Object.entries(h_).map(([n,e])=>({id:n,family:"rocks",size:1,variants:1,split:null,...e})),...Object.entries(d_).map(([n,e])=>({id:n,family:"freak",size:1.2,variants:1,...e}))];Object.fromEntries(f_.map(n=>[n.id,n]));const Di=(n,e=0)=>{const t=Math.sin(n*127.1+e*311.7)*43758.5453;return t-Math.floor(t)},$t=(n,e,t=0)=>Di(Math.floor(n[0]*e)+Math.floor(n[2]*e)*57+t,Math.floor(n[1]*e)),Gn=(n=.25,e=.15)=>t=>{const i=$t(t,16,3);return $t(t,6,5)<e&&t[1]>.1?l.MOSS:i>1-n*.7?l.BODY2:void 0},Hn=(n,e,t,i,r=.025,a=l.FRAME)=>n.seg(e,t,r,r,a,{group:i,paint:Gn(.4,.05)}),Uc=(n,e,t,i)=>n.ell(e,t,l.STONE,{group:i,rough:.025,paint:r=>r[1]>e[1]+t[1]*.5&&$t(r,5,i)<.6?l.MOSS:$t(r,14)>.9?l.STONED:void 0}),zi=(n,e,t,i,r)=>{for(let a=0;a<e;a++){const s=Di(r,a)*6.283,o=t*Math.sqrt(Di(a,r));n.ell([Math.cos(s)*o,.07,Math.sin(s)*o*.7],[.07,.1+Di(a,4)*.08,.07],l.LEAF2,{group:i+a%3,paint:u=>u[1]>.13?l.LEAF:void 0})}},to=(n,e,t,i)=>n.ell(e,t,l.LEAF,{group:i,rough:.04,paint:r=>{const a=$t(r,10,2);return r[1]<e[1]-.15||a<.2?l.LEAF3:a>.8?l.LEAF2:void 0}}),za=(n,e,t,i,r)=>{const a=[];for(let s=0;s<=4;s++)a.push([...w.add(w.lerp(e,t,s/4),[(Di(r,s)-.5)*.12,0,.02]),.03]);n.chain(a,l.LEAF,{group:i,paint:s=>$t(s,30)<.3?l.LEAF2:void 0})};function Oc(n,e,{pitch:t=0,roll:i=0,at:r=[0,0,0]}={}){const a=(h,f,d,p)=>{const _=Math.cos(f),x=Math.sin(f),g=[...h];return g[d]=h[d]*_-h[p]*x,g[p]=h[d]*x+h[p]*_,g},s=h=>a(a(h,i,1,2),t,0,1),o=h=>a(a(h,-t,0,1),-i,1,2),u=h=>w.add(s(h),r),c=h=>o(w.sub(h,r));for(const h of n.parts.slice(e))if(h.type==="cone"?(h.a=u(h.a),h.b=u(h.b)):(h.c=u(h.c),h.axes=h.axes.map(s)),h.paint){const f=h.paint;h.paint=(d,p)=>f(c(d),p)}}const p_={"verge-post":{family:"prop",path:"tarmac",desc:"a road's verge post, leaning, its band faded",build(n){const e=n.parts.length;n.box([0,.4,0],[.06,.4,.06],l.BELLY,{round:.02,group:1,paint:t=>Math.abs(t[1]-.62)<.06?l.SHADES:Gn(.1,.2)(t)}),Oc(n,e,{roll:.15,pitch:.1}),zi(n,4,.25,3,1)}},"cats-eye":{family:"prop",path:"tarmac",desc:"a cat's-eye stud in the road (unlit)",build(n){n.box([0,.02,0],[.09,.02,.05],l.SHADES,{round:.01,group:1});for(const e of[-.04,.04])n.ell([e,.04,.03],[.025,.015,.015],l.FRAME,{group:2})}},"stepping-stone":{family:"prop",path:"stepping",desc:"a stepping stone, flat-topped and mossy",build(n){Uc(n,[0,.08,0],[.38,.12,.3],1)}},"boardwalk-post":{family:"prop",path:"boardwalk",desc:"a boardwalk's post, standing in the water",build(n){n.seg([0,0,0],[0,.55,0],.06,.055,l.WOOD,{group:1,paint:e=>e[1]<.12?l.MOSS:e[1]>.5?l.BARK2:void 0})}},"sleeper-sapling":{family:"prop",path:"railway",desc:"a sapling grown up between the sleepers",build(n){n.seg([0,0,0],[0,.9,0],.025,.015,l.TRUNK,{group:1}),to(n,[0,.95,0],[.22,.18,.2],2),zi(n,4,.2,3,2)}},"glow-mushrooms":{family:"prop",path:"magic",glow:!0,desc:"a cluster of softly glowing mushrooms",build(n){for(let e=0;e<4;e++){const t=[(Di(e)-.5)*.3,0,(Di(e,2)-.5)*.2],i=.08+Di(e,3)*.1;n.seg(t,w.add(t,[0,i,0]),.015,.012,l.CLOTH,{group:1}),n.ell(w.add(t,[0,i+.02,0]),[.05,.03,.05],l.MAGIC,{group:2+e,paint:r=>r[1]>t[1]+i+.035?l.MAGIC2:void 0})}}},"fairy-stone":{family:"prop",path:"magic",glow:!0,desc:"a small fairy stone with a glowing rune",build(n){n.box([0,.18,0],[.09,.18,.06],l.STONE,{round:.04,group:1,paint:e=>e[2]>.04&&Math.abs(e[1]-.2)<.07&&Math.abs(e[0])<.025?l.RUNE:e[1]>.32?l.MOSS:void 0})}},"signal-post":{family:"prop",path:"railway",desc:"a rusty old signal post, its arm dropped (unlit)",build(n){Hn(n,[0,0,0],[0,2.2,0],1,.04),n.box([.25,2,0],[.25,.05,.02],l.ACCENT,{dir:[1,-.6,0],group:2,paint:e=>e[0]>.38?l.BELLY:Gn(.4,0)(e)}),n.ell([0,2.05,.05],[.06,.06,.03],l.SHADES,{group:3}),za(n,[0,0,.04],[.02,1.4,.04],4,3)}},stairs:{family:"piece",path:"stairs",desc:"a short flight of mossy stone stairs, for ruins and hollows",build(n){for(let e=0;e<5;e++)n.box([0,.1+e*.2,-e*.3],[.6,.1+e*.2,.15],l.STONE,{round:.03,rough:.01,group:1+e%2,paint:t=>t[1]>.16+e*.4&&$t(t,6,e)<.35?l.MOSS:$t(t,14)>.9?l.STONED:void 0});for(const e of[-.7,.7])Uc(n,[e,.3,-.6],[.15,.35,.7],5)}},"stairs-turn":{family:"piece",path:"stairs",desc:"stone stairs turning on a landing",build(n){for(let e=0;e<3;e++)n.box([0,.1+e*.2,-e*.3],[.5,.1+e*.2,.15],l.STONE,{round:.03,rough:.01,group:1+e%2,paint:t=>$t(t,6,e)<.3&&t[1]>.2+e*.4?l.MOSS:void 0});n.box([0,.35,-1.1],[.55,.35,.5],l.STONE,{round:.03,group:3,paint:e=>$t(e,6)<.3&&e[1]>.6?l.MOSS:void 0});for(let e=0;e<3;e++)n.box([.65+e*.3,.8+e*.2,-1.1],[.15,.1+e*.1,.5],l.STONE,{round:.03,group:4+e%2})}},"root-bridge":{family:"piece",path:"roots",desc:"a bridge of gnarled roots over a stream",build(n){n.ell([0,.01,0],[1.4,.015,.6],l.WATER,{group:1});for(let e=0;e<4;e++)n.chain([[-1.8,0,-.4+e*.27,.14],[-.8,.45,-.35+e*.25,.1],[.6,.5,-.3+e*.22,.1],[1.8,0,-.25+e*.2,.13]],l.TRUNK,{group:2+e%2,rough:.015,paint:t=>$t(t,12)<.12?l.BARKD:t[1]>.55&&$t(t,5)<.3?l.MOSS:void 0});to(n,[-1.7,.25,-.5],[.3,.2,.25],5)}},footbridge:{family:"piece",path:"bridges",desc:"a little wooden footbridge over a stream",build(n){n.ell([0,.01,0],[1.2,.015,.7],l.WATER,{group:1});for(let e=-6;e<=6;e++){const t=e*.2,i=.35-t*t*.1;n.box([t,i,0],[.09,.03,.5],l.WOOD,{round:.01,group:2+(e&1),paint:r=>$t(r,10)<.15?l.MOSS:void 0})}for(const e of[-.5,.5]){for(const t of[-1.1,0,1.1])n.seg([t,.3-t*t*.1,e],[t,.85-t*t*.1,e],.03,.03,l.WOOD,{group:4});n.chain([[-1.1,.85-.121,e,.025],[0,.85,e,.025],[1.1,.85-.121,e,.025]],l.WOOD,{group:4})}}},"rope-bridge":{family:"piece",path:"bridges",desc:"a rope bridge over a stream, planks sagging, one missing",build(n){n.ell([0,.01,0],[1.3,.015,.7],l.WATER,{group:1});for(const e of[-1.6,1.6])for(const t of[-.45,.45])n.seg([e,0,t],[e,1.1,t],.05,.045,l.WOOD,{group:2});for(let e=-7;e<=7;e++){if(e===3)continue;const t=e*.2,i=.55-(1-(t/1.6)**2)*.3;n.box([t,i,0],[.08,.02,.38],l.WOOD,{round:.01,group:3+(e&1)})}for(const e of[-.45,.45])for(const t of[0,1]){const i=[];for(let r=0;r<=8;r++){const a=-1.6+r*.4,s=(t?1.05:.55)-(1-(a/1.6)**2)*(t?.25:.3);i.push([a,s,e,.015])}n.chain(i,l.STRAW,{group:5})}}},"goods-wagon":{family:"landmark",path:"railway",desc:"an abandoned goods wagon tipped on its side (no livery)",build(n){const e=n.parts.length;n.box([0,.75,0],[1.6,.65,.6],l.BODY2,{round:.05,group:1,paint:t=>(t[0]+9)*4%1<.08?l.SHADES:Gn(.6,.2)(t)});for(const t of[-1.1,1.1])for(const i of[-.55,.55])n.ell([t,.22,i],[.22,.22,.06],l.SHADES,{group:2,paint:r=>Math.hypot(r[0]-t,r[1]-.22)<.08?l.FRAME:void 0});Oc(n,e,{roll:1.4,at:[0,.3,.3]}),zi(n,14,2.2,4,5),za(n,[-1.2,0,1],[-.6,1,1.1],7,6)}},carriage:{family:"landmark",path:"railway",glow:!0,desc:"an old passenger carriage, mossy roof, a tree grown through it, its windows glowing",build(n){n.box([0,.95,0],[2.4,.65,.62],l.HAT1,{round:.08,group:1,paint:e=>Math.abs(e[2])>.58&&e[1]>1&&e[1]<1.35&&(e[0]+9)*1.6%1>.25?$t(e,9)<.2?l.SHADES:l.GLOW:Gn(.4,.15)(e)}),n.ell([0,1.62,0],[2.4,.14,.62],l.MOSS,{group:2,paint:e=>$t(e,6)<.3?l.LEAF2:void 0});for(const e of[-1.8,1.8])for(const t of[-.5,.5])n.ell([e,.25,t],[.24,.24,.06],l.SHADES,{group:3});n.chain([[.6,0,0,.2],[.6,1.8,0,.16],[.7,2.9,-.1,.09]],l.TRUNK,{group:4,rough:.015}),to(n,[.7,3.1,-.1],[1,.6,.8],5),zi(n,16,2.8,6,7)}},platform:{family:"landmark",path:"railway",desc:"a little station platform, a bench and a lamp post (no name board)",build(n){n.box([0,.35,0],[2.4,.35,.7],l.STONE,{round:.02,rough:.008,group:1,paint:e=>e[2]>.62&&e[1]>.6?l.BELLY:e[1]>.66&&$t(e,5)<.25?l.MOSS:(e[0]+9)*2.5%1<.06?l.STONED:void 0}),n.box([-.6,.95,-.3],[.6,.04,.16],l.WOOD,{group:2}),n.box([-.6,1.2,-.44],[.6,.18,.03],l.WOOD,{group:2});for(const e of[-1.1,-.1])n.box([e,.82,-.3],[.04,.12,.14],l.FRAME,{group:2});Hn(n,[1.4,.7,-.4],[1.4,2.4,-.4],3,.035),n.box([1.4,2.5,-.4],[.12,.12,.12],l.FRAME,{round:.03,group:4,paint:e=>Math.abs(e[1]-2.5)<.07?l.SHADES:void 0}),za(n,[1.4,.7,-.36],[1.42,2.2,-.36],5,8),zi(n,10,2.4,6,9)}},"level-crossing":{family:"landmark",path:"railway",desc:"a level crossing's barrier post, its boom broken off and lying in the grass",build(n){n.box([0,.55,0],[.15,.55,.15],l.BELLY,{round:.03,group:1,paint:Gn(.3,.15)}),n.box([.6,1.05,0],[.6,.05,.04],l.BELLY,{group:2,paint:e=>(e[0]+9)*2.5%1<.5?l.ACCENT:Gn(.3,0)(e)}),n.box([1.6,.05,.4],[.7,.05,.04],l.BELLY,{dir:[1,0,.5],group:3,paint:e=>(e[0]+9)*2.5%1<.5?l.ACCENT:Gn(.3,.15)(e)}),Hn(n,[-.5,0,0],[-.5,1.6,0],4,.03);for(const e of[-1,1])n.box([-.5,1.6,0],[.35,.04,.015],l.BELLY,{dir:[1,e,0],group:5});zi(n,10,1.6,6,10)}},"buffer-stop":{family:"landmark",path:"railway",desc:"a buffer stop at the end of the line: a timber beam on rusty posts, its buffers worn, grass round its short stub of track",build(n){for(const e of[-.45,.45])Hn(n,[-.2,0,e],[0,.75,e],1,.05),Hn(n,[.35,0,e],[0,.7,e],1,.04),n.seg([0,.62,e],[.22,.62,e],.07,.07,l.FRAME,{group:2,paint:Gn(.5,0)}),n.ell([.25,.62,e],[.03,.1,.1],l.SHADES,{group:2});n.box([0,.7,0],[.08,.1,.75],l.ACCENT,{round:.02,group:3,paint:e=>(e[2]+9)*4%1<.5?l.BELLY:Gn(.4,.1)(e)});for(const e of[-.3,.3])n.seg([.2,.03,e],[2,.03,e],.03,.03,l.SHADES,{group:4,paint:t=>t[1]>.05?l.FRAME:void 0});for(let e=0;e<4;e++)n.box([.5+e*.45,.02,0],[.07,.02,.45],l.WOOD,{group:5,paint:t=>$t(t,9)<.3?l.MOSS:void 0});zi(n,12,1.4,6,12)}},"signal-gantry":{family:"landmark",path:"railway",desc:"a rusty signal gantry spanning the line, its signals dark",build(n){for(const e of[-2,2])for(const t of[-.15,.15])Hn(n,[e,0,t],[e,3,t],1,.04);for(let e=0;e<8;e++){const t=-2+e*.5;Hn(n,[t,2.8,0],[t+.5,3.1,0],2,.02),Hn(n,[t,3.1,0],[t+.5,2.8,0],2,.02)}for(const e of[2.8,3.1])Hn(n,[-2,e,0],[2,e,0],3,.035);for(const e of[-.8,.8])Hn(n,[e,2.8,.05],[e,2.3,.05],4,.02),n.box([e,2.2,.08],[.12,.2,.05],l.SHADES,{round:.03,group:5,paint:t=>Math.hypot(t[0]-e,t[1]-2.27)<.05||Math.hypot(t[0]-e,t[1]-2.13)<.05?l.FRAME:void 0});za(n,[-2,0,.2],[-1.95,2.4,.2],6,11)}}},m_=Object.entries(p_).map(([n,e])=>({id:n,...e}));Object.fromEntries(m_.map(n=>[n.id,n]));const g_=[{k:"ambientHue",g:"Night light",label:"Twilight hue",min:0,max:1,step:.01,v:.68,hue:!0},{k:"ambient",g:"Night light",label:"Twilight brightness",min:.05,max:.6,step:.01,v:.22},{k:"moon",g:"Night light",label:"Moonlight",min:0,max:1,step:.01,v:.3},{k:"moonHue",g:"Night light",label:"Moon hue",min:0,max:1,step:.01,v:.58,hue:!0},{k:"glowHue",g:"Night light",label:"Witch glow hue",min:0,max:1,step:.01,v:.13,hue:!0},{k:"glowSat",g:"Night light",label:"Witch glow colour",min:0,max:1,step:.01,v:.35},{k:"glowRadius",g:"Night light",label:"Witch glow reach",min:30,max:200,step:5,v:110},{k:"glowPower",g:"Night light",label:"Witch glow strength",min:.3,max:2.5,step:.05,v:1.4},{k:"bands",g:"Shading",label:"Light steps",min:2,max:7,step:1,v:3},{k:"dither",g:"Shading",label:"Dithering",min:0,max:1,step:.05,v:.35},{k:"round",g:"Shading",label:"Roundness",min:.2,max:1.5,step:.05,v:.9},{k:"outline",g:"Shading",label:"Plant outline",options:["none","dark","tinted"],v:"none"},{k:"cOutline",g:"Shading",label:"Creature outline",options:["dark","tinted","none"],v:"dark"},{k:"shafts",g:"Night light",label:"Moonbeams",min:0,max:1,step:.05,v:.3},{k:"areaContrast",g:"Colour",label:"Difference between areas",min:0,max:1,step:.05,v:.6},{k:"sat",g:"Colour",label:"Saturation",min:.2,max:1.3,step:.01,v:.9},{k:"leafHue",g:"Colour",label:"Leaf hue",min:0,max:1,step:.01,v:.3,hue:!0},{k:"leafVariety",g:"Colour",label:"Leaf colour variety",min:0,max:1,step:.05,v:.3},{k:"trunkHue",g:"Colour",label:"Bark hue",min:0,max:1,step:.01,v:.07,hue:!0},{k:"groundHue",g:"Colour",label:"Ground hue",min:0,max:1,step:.01,v:.27,hue:!0},{k:"groundVal",g:"Colour",label:"Ground brightness",min:.15,max:.7,step:.01,v:.4},{k:"pixel",g:"Shading",label:"Pixel size",min:1,max:5,step:1,v:3},{k:"treeSize",g:"Trees",label:"Tree height",min:.5,max:1.5,step:.05,v:.85},{k:"crownWidth",g:"Trees",label:"Crown width",min:1,max:4,step:.1,v:3},{k:"clearing",g:"Trees",label:"Clearing size",min:0,max:1,step:.05,v:.55},{k:"depth",g:"Map",label:"Border detail (fractal layers)",min:0,max:6,step:1,v:4},{k:"areaScale",g:"Map",label:"Area size (screens)",min:.6,max:2,step:.05,v:1},{k:"areaTypes",g:"Map",label:"Area types",min:4,max:30,step:1,v:30},{k:"density",g:"Trees",label:"Foliage density",min:.2,max:1,step:.05,v:.55},{k:"clump",g:"Trees",label:"Clumpiness",min:0,max:1,step:.05,v:.6},{k:"gnarl",g:"Trees",label:"Gnarliness",min:0,max:1,step:.05,v:.5},{k:"roots",g:"Trees",label:"Roots",min:0,max:1,step:.05,v:.6},{k:"bark",g:"Trees",label:"Bark texture",min:0,max:1,step:.05,v:.6},{k:"trees",g:"Trees",label:"Tree density",min:.2,max:2,step:.05,v:1},{k:"wBroad",g:"Tree mix",label:"Gnarled broadleaf",min:0,max:1,step:.05,v:.8},{k:"wFir",g:"Tree mix",label:"Fir",min:0,max:1,step:.05,v:.6},{k:"wWillow",g:"Tree mix",label:"Willow",min:0,max:1,step:.05,v:.5},{k:"wBirch",g:"Tree mix",label:"Birch",min:0,max:1,step:.05,v:.5},{k:"wPalm",g:"Tree mix",label:"Tree fern",min:0,max:1,step:.05,v:.3},{k:"wFlat",g:"Tree mix",label:"Flat-crowned",min:0,max:1,step:.05,v:.5},{k:"bushes",g:"Undergrowth",label:"Bushes and shrubs",min:0,max:120,step:1,v:55},{k:"bushSize",g:"Undergrowth",label:"Bush size",min:.5,max:1.8,step:.05,v:1},{k:"flowers",g:"Undergrowth",label:"Flowers",min:0,max:1,step:.05,v:.3},{k:"cSat",g:"Creatures",label:"Creature saturation",min:.1,max:1,step:.01,v:.6},{k:"cVal",g:"Creatures",label:"Creature brightness",min:.4,max:1,step:.01,v:.85},{k:"head",g:"Creatures",label:"Baby head size",min:.3,max:.6,step:.01,v:.44},{k:"eye",g:"Creatures",label:"Eye size",min:.5,max:2,step:.05,v:1},{k:"legs",g:"Creatures",label:"Leg length",min:.5,max:1.8,step:.05,v:1},{k:"long",g:"Creatures",label:"Body length",min:.7,max:1.5,step:.05,v:1},{k:"size",g:"Creatures",label:"Baby size (px)",min:5,max:14,step:1,v:8},{k:"growth",g:"Creatures",label:"Legend vs baby height",min:5,max:25,step:1,v:20},{k:"magicHue",g:"Creatures",label:"Magic glow hue",min:0,max:1,step:.01,v:.5,hue:!0},{k:"fur",g:"Creatures",label:"Stripes and spots",min:0,max:1,step:.05,v:.5},{k:"cloakHue",g:"Witch",label:"Jacket hue",min:0,max:1,step:.01,v:.72,hue:!0},{k:"hairHue",g:"Witch",label:"Hair hue",min:0,max:1,step:.01,v:.01,hue:!0},{k:"hatHue",g:"Witch",label:"Hat hue",min:0,max:1,step:.01,v:.74,hue:!0},{k:"topHue",g:"Witch",label:"Top hue",min:0,max:1,step:.01,v:.13,hue:!0},{k:"jeansHue",g:"Witch",label:"Jeans hue",min:0,max:1,step:.01,v:.6,hue:!0},{k:"shoeHue",g:"Witch",label:"Sneakers hue",min:0,max:1,step:.01,v:0,hue:!0},{k:"phonesHue",g:"Witch",label:"Headphones hue",min:0,max:1,step:.01,v:.92,hue:!0}];function __(){const n={};return g_.forEach(e=>n[e.k]=e.v),n}const x_={broad:eu,fir:nl,willow:tu,birch:nu,flat:iu};function M_(n,e,t,i,r){const a=x_[e.type],s={...t,leafHue:n.leaf+(e.dark?.05:0),gnarl:e.gnarl??t.gnarl,treeBare:e.bare,treeTrunks:e.trunks,treeLean:e.lean,treeThick:e.thick,treeThin:e.thin,treeHollow:e.hollow,treeWebs:e.webs},o=a(i,s,t.treeSize*r*(e.scale||1)*be(i,.9,1.1)),u=il(i,s,a);return e.dark&&(u[l.LEAF]=u[l.LEAF3],u[l.LEAF3]=Me(n.leaf+.05,.7,.22)),u[l.NOSE]=[20,16,24],u[l.GLINT]=[235,235,240],{parts:ld(o),colours:u}}function v_(n,e,t,i,r){const a=Jn[t].id,s=oa.find(p=>p.id===a),o=md(a,n,{K:i,makeCanvas:r}),u=[],c=p=>u.push(p)-1,h={big:[],small:[],walls:[],set:null},f=(p,_)=>Ar(p,_,n,"none",r),d=(p,_)=>{const{parts:x,colours:g}=M_(s,p,n,jr(e*13+t*101+_*7+1),i);return{bot:c(f(x.bot,g)),top:c(f(x.top,g))}};s.big.forEach(([p,_],x)=>{if(p!=="tree"){h.big.push({bot:c(o.big[x].sp),top:null});return}const g=Math.max(1,Math.round(ru/s.big.length));for(let m=0;m<g;m++)h.big.push(d(_,x*17+m))}),s.small.forEach(([p,_],x)=>h.small.push(p==="tree"?d(_,500+x):{bot:c(o.small[x].sp),top:null}));for(const p of o.walls)h.walls.push(c(p.sp));return o.setPiece&&(h.set=s.set?.[0]==="tree"?d(s.set[1],900):{bot:c(o.setPiece.sp),top:null}),{sprites:u,layout:h,floor:o.floor.sp}}function S_(n,e,t){const i=[];for(let r=0;r<3;r++)for(let a=0;a<2;a++)i.push(Ar(id(e,r,a,n),ed(e,n),n,n.cOutline,t));return i}const b_=(n,e)=>n*2+e;function as(n,e,t){return n.getContext("2d").getImageData(0,0,e,t).data}function qo(n,e=2048){const i=[];let r=0,a=0,s=0,o=1;for(const d of n)r+d.w+1>e&&(r=0,a+=s+1,s=0),i.push({x:r,y:a}),r+=d.w+1,s=Math.max(s,d.h),o=Math.max(o,r);const u=Math.max(1,a+s),c=new Uint8Array(o*u*4),h=new Uint8Array(o*u*4),f=n.map((d,p)=>{const _=i[p],x=as(d.A,d.w,d.h),g=as(d.N,d.w,d.h);for(let m=0;m<d.h;m++){const v=m*d.w*4,E=((_.y+m)*o+_.x)*4;c.set(x.subarray(v,v+d.w*4),E),h.set(g.subarray(v,v+d.w*4),E)}return{uv:[_.x/o,_.y/u,(_.x+d.w)/o,(_.y+d.h)/u],w:d.w,h:d.h}});return{albedo:c,normal:h,width:o,height:u,frames:f}}function E_(n,e){if(n.kind==="creature")return{px:qo(S_(n.style,n.id,e),1024)};const{sprites:t,layout:i,floor:r}=v_(n.style,n.seed,n.id,n.K,e);return{px:qo(t),layout:i,floor:{albedo:new Uint8Array(as(r.A,r.w,r.h)),normal:new Uint8Array(as(r.N,r.w,r.h)),w:r.w,h:r.h}}}function Fc(n,e,t){const i=new Sr(n,e,t,yn,_n);return i.magFilter=Gt,i.minFilter=Gt,i.generateMipmaps=!1,i.flipY=!1,i.colorSpace=Pn,i.needsUpdate=!0,i}function Ku(n){return{albedo:Fc(n.albedo,n.width,n.height),normal:Fc(n.normal,n.width,n.height),frames:n.frames}}const Bc=(n,e=2048)=>Ku(qo(n,e));class y_{constructor(e,t,i){if(this.style=e,this.seed=t,this.K=2/i,this.witch=Bc([Ar(Ah(),xh(e),e,"dark")]),this.stones=Bc([0,1,2,3].map(r=>this.stone(r))),this.useWorkers=typeof Worker<"u"&&typeof OffscreenCanvas<"u",this.useWorkers){const r=Math.max(1,Math.min(3,(navigator.hardwareConcurrency||2)-1));try{for(let a=0;a<r;a++){const s=new Worker(new URL(""+new URL("artWorker-BkgpEsBL.js",import.meta.url).href,import.meta.url),{type:"module"}),o={w:s,busy:!1};s.onmessage=u=>{o.busy=!1,o.job=void 0,this.receive(u.data),this.dispatch()},s.onerror=()=>{this.useWorkers=!1,o.job&&this.queue.unshift(o.job),o.busy=!1,o.job=void 0},this.workers.push(o)}}catch{this.useWorkers=!1}}}style;seed;types=new Map;creatures=new Map;queue=[];inFlight=new Set;workers=[];useWorkers;witch;stones;K;version=0;onFloor=()=>{};stone(e){const t=jr(this.seed*3+e),i=5+Math.floor(t()*3),r=7+Math.floor(t()*5),a=new on(i+2,r+1);return a.ellipse((i+2)/2,r/2+1,i/2,r/2+.5,l.BODY,{round:this.style.round}),a.ellipse((i+2)/2-1,r/2,i/3,r/3,l.BODY2,{round:this.style.round,onlyOn:new Set([l.BODY]),density:.5,seed:e}),Ar(a,{[l.BODY]:[178,174,162],[l.BODY2]:[140,138,130]},this.style,"dark")}key=e=>e.kind+":"+e.id;ask(e){const t=this.key(e);this.inFlight.has(t)||(this.inFlight.add(t),this.queue.push(e),this.dispatch())}dispatch(){if(this.useWorkers)for(const e of this.workers)e.busy||!this.queue.length||(e.busy=!0,e.job=this.queue.shift(),e.w.postMessage(e.job))}receive(e){if(!e.result){console.warn("art worker failed, drawing on the page:",e.error),this.useWorkers=!1,this.queue.unshift(e.job);return}const t=Ku(e.result.px);e.job.kind==="type"?(this.types.set(e.job.id,{atlas:t,layout:e.result.layout}),e.result.floor&&this.onFloor(e.job.id,e.result.floor)):this.creatures.set(e.job.id,{atlas:t,frame:b_}),this.inFlight.delete(this.key(e.job)),this.version++}typeArt(e){const t=this.types.get(e);return t||this.ask({kind:"type",id:e,style:this.style,seed:this.seed,K:this.K}),t}creatureArt(e){const t=this.creatures.get(e);return t||this.ask({kind:"creature",id:e,style:this.style}),t}prefetchType(e){this.types.has(e)||this.typeArt(e)}get pending(){return this.inFlight.size}work(e){if(this.useWorkers)return;const t=performance.now();let i=0;for(;this.queue.length&&(i===0||performance.now()-t<e);){const r=this.queue.shift();this.receive({job:r,result:E_(r,(a,s)=>{const o=document.createElement("canvas");return o.width=a,o.height=s,o})}),i++}}whenIdle(){return new Promise(e=>{const t=()=>{this.work(50),this.pending?setTimeout(t,30):e()};t()})}}const Ht={uAmb:{value:new Y},uMoon:{value:new Y},uMoonDir:{value:new Y(-.45,.75,.5).normalize()},uMoonBeam:{value:new Y},uBands:{value:4},uDither:{value:.35},uShafts:{value:.3},uShaftScale:{value:1},uGlowPos:{value:new Y},uGlowRgb:{value:new Y},uGlowR:{value:8},uGlowPower:{value:1.4},uHazeCentre:{value:new Ve},uHazeRange:{value:new Ve(70,200)},uHazeColour:{value:new Y},uTime:{value:0}};function w_(n,e,t){const i=(r,a)=>new Y(r[0]/255*a,r[1]/255*a,r[2]/255*a);Ht.uAmb.value.copy(i(Me(n.ambientHue,.55,1),n.ambient)),Ht.uMoon.value.copy(i(Me(n.moonHue,.35,1),n.moon)),Ht.uMoonBeam.value.copy(i(Me(n.moonHue,.35,1),n.shafts*.25)),Ht.uBands.value=n.bands,Ht.uDither.value=n.dither*.5,Ht.uShafts.value=n.shafts,Ht.uShaftScale.value=t*2,Ht.uGlowRgb.value.copy(i(Me(n.glowHue,n.glowSat,1),1)),Ht.uGlowR.value=e,Ht.uGlowPower.value=n.glowPower,Ht.uHazeColour.value.copy(i(Me(n.ambientHue,.45,1),.16))}const ps=`
uniform vec3 uAmb, uMoon, uMoonDir, uMoonBeam, uGlowPos, uGlowRgb;
uniform float uBands, uDither, uShafts, uShaftScale, uGlowR, uGlowPower, uTime;
uniform vec2 uHazeCentre, uHazeRange;
uniform vec3 uHazeColour;

// Fade toward the twilight haze with distance, in a few dithered steps so it stays pixel art.
vec3 haze(vec3 c, vec3 P) {
  float h = smoothstep(uHazeRange.x, uHazeRange.y, length(P.xz - uHazeCentre));
  h *= h; // light through the middle distance, full only at the far edge
  float q = h * 4.0, fr = fract(q);
  q = floor(q) + (fr > (mod(floor(gl_FragCoord.x) + floor(gl_FragCoord.y), 2.0) > 0.5 ? 0.66 : 0.33) ? 1.0 : 0.0);
  return mix(c, uHazeColour, q / 4.0);
}

float lightStep(float f) {
  float q = f * uBands;
  float fr = fract(q);
  if (uDither > 0.0 && abs(fr - 0.5) < uDither * 0.5) q += mod(floor(gl_FragCoord.x) + floor(gl_FragCoord.y), 2.0) > 0.5 ? 0.5 : -0.5;
  return max(0.0, floor(q)) / uBands;
}

// N: world normal; P: world position; moonK: how much moonlight gets through (a shadow lowers
// it; the witch's own glow is never shadowed). Returns the light falling on that pixel.
vec3 nightLightShaded(vec3 N, vec3 P, float moonK) {
  vec3 l = uAmb * mix(1.0, moonK, 0.5) + uMoon * moonK * lightStep(max(0.0, dot(N, uMoonDir)));
  if (uShafts > 0.0 && moonK > 0.99) {
    // Moonbeams: diagonal bands across the world, as the lab draws them across the screen.
    float s = mod(P.x / uShaftScale + P.z * 0.9 / uShaftScale, 150.0);
    float chk = mod(floor(gl_FragCoord.x) + floor(gl_FragCoord.y), 2.0);
    if (s < 34.0 && (chk > 0.5 || (s > 4.0 && s < 30.0))) l += uMoonBeam;
  }
  vec3 v = uGlowPos - P;
  float d = length(v);
  if (d < uGlowR) {
    float ndl = max(0.0, dot(N, v / max(d, 1e-4)));
    float fall = 1.0 - d / uGlowR;
    l += uGlowRgb * lightStep(min(1.0, ndl * fall * fall * uGlowPower));
  }
  return l;
}
vec3 nightLight(vec3 N, vec3 P) { return nightLightShaded(N, P, 1.0); }
`,Hi=2,Kt=32,Vi=8,A_=`
varying vec3 vWorld;
void main() {
  vec4 w = modelMatrix * vec4(position, 1.0);
  vWorld = w.xyz;
  gl_Position = projectionMatrix * viewMatrix * w;
}
`,T_=`
uniform sampler2D uAreas;
uniform vec4 uExtent; // minX, minZ, width, depth (metres)
uniform float uPixel; // metres per art pixel
uniform vec3 uTypeFloor[32];      // each type's floor colour (hsv), until its tile is drawn
uniform float uFloorReady[32];
uniform sampler2D uFloors;        // every type's floor tile, FLOOR_COLS to a row
uniform vec2 uTile, uFloorsSize;  // one tile's size and the atlas's, in art pixels
uniform float uSat;
uniform vec3 uFloor; // dancefloor x, z, radius
uniform vec4 uCanopy; // canopy shadow: strength (0 off), height, cover, wind speed
uniform vec2 uClearing; // clearingSize, clearingFalloff: where trees, and so canopy, begin
varying vec3 vWorld;
${ps}
float hash(vec2 p) { p = fract(p * vec2(123.34, 456.21)); p += dot(p, p + 45.32); return fract(p.x * p.y); }
float vnoise(vec2 p) {
  vec2 i = floor(p), f = fract(p), u = f * f * (3.0 - 2.0 * f);
  float a = hash(i), b = hash(i + vec2(1, 0)), c = hash(i + vec2(0, 1)), d = hash(i + vec2(1, 1));
  return a + (b - a) * u.x + (c - a) * u.y + (a - b - c + d) * u.x * u.y;
}
vec3 hsv(float h, float s, float v) {
  vec3 k = clamp(abs(mod(fract(h) * 6.0 + vec3(0, 4, 2), 6.0) - 3.0) - 1.0, 0.0, 1.0);
  return clamp(v, 0.0, 1.0) * mix(vec3(1.0), k, clamp(s, 0.0, 1.0));
}
void main() {
  vec2 px = floor(vWorld.xz / uPixel);           // the art pixel this fragment is in
  vec2 p = (px + 0.5) * uPixel;                   // its centre, in metres
  // Wobble the lookup a little so area borders read as ragged, not as the texture's grid.
  vec2 j = vec2(vnoise(px / 5.0) - 0.5, vnoise(px / 5.0 + 17.0) - 0.5) * 0.9;
  vec4 area = texture2D(uAreas, (p + j - uExtent.xy) / uExtent.zw);
  float open = area.a > 0.5 ? area.g : 1.0;
  int t = int(area.r * 255.0 + 0.5);
  vec3 c;
  if (area.a > 0.5 && uFloorReady[t] > 0.5) {
    // The area's floor tile, repeated on the art's pixel grid.
    vec2 cell = vec2(mod(float(t), ${Vi}.0), floor(float(t) / ${Vi}.0));
    vec2 tp = mod(px, uTile);
    c = texture2D(uFloors, (cell * uTile + tp + 0.5) / uFloorsSize).rgb;
  } else {
    vec3 f = area.a > 0.5 ? uTypeFloor[t] : vec3(0.25, 0.45, 0.4);
    float v = vnoise(px / vec2(9.0, 6.0)) * 0.7 + vnoise(px / vec2(2.5, 2.0)) * 0.3;
    c = hsv(f.x, f.y * uSat, f.z * (v < 0.38 ? 0.8 : v > 0.66 ? 1.15 : 1.0));
  }
  c *= 1.0 + max(0.0, 0.55 - open) * 0.9;        // clearings are paler
  // The dancefloor: a worn ring of pale stones.
  float r = length(p - uFloor.xy);
  if (r < uFloor.z) c = mix(c, vec3(0.42, 0.42, 0.38), 0.25);
  if (abs(r - uFloor.z) < uPixel * 1.5 && hash(px * 0.71) < 0.8) c = vec3(150.0, 150.0, 135.0) / 255.0;
  float moonK = 1.0;
  if (uCanopy.x > 0.0) {
    // The canopy's shadow: a dappled layer at canopy height, cast along the moonlight onto the
    // ground, drifting with the wind; thinner where the canopy thins, in the clearings.
    vec2 q = p + uMoonDir.xz / max(0.2, uMoonDir.y) * uCanopy.y + vec2(0.7, 0.3) * uCanopy.w * uTime;
    float leaves = vnoise(q / 2.6) * 0.6 + vnoise(q / 1.1 + 31.0) * 0.4;
    float cover = uCanopy.z * smoothstep(0.0, 1.0, (open - uClearing.x) / max(0.01, uClearing.y));
    float edge = mod(floor(gl_FragCoord.x) + floor(gl_FragCoord.y), 2.0) > 0.5 ? 0.03 : -0.03;
    if (leaves + edge < cover) moonK = 1.0 - uCanopy.x;
  }
  vec3 light = nightLightShaded(vec3(0.0, 1.0, 0.0), vWorld, moonK);
  gl_FragColor = vec4(haze(min(vec3(1.0), c * light * 1.25), vWorld), 1.0);
}
`;class R_{constructor(e,t,i){this.map=e;const r=e.extent,a=r.maxX-r.minX,s=r.maxZ-r.minZ,o=Math.ceil(a*Hi/Kt)*Kt,u=Math.ceil(s*Hi/Kt)*Kt;this.tilesX=o/Kt,this.tilesZ=u/Kt,this.filled=new Uint8Array(this.tilesX*this.tilesZ);const c=p=>(p.magFilter=p.minFilter=Gt,p.generateMipmaps=!1,p.colorSpace=Pn,p.needsUpdate=!0,p);this.texture=c(new Sr(new Uint8Array(o*u*4),o,u)),c(this.tile),this.floors=c(new Sr(new Uint8Array(64*Vi*48*4*4),64*Vi,192));const h=Array.from({length:32},(p,_)=>new Y(...Jn[_]?.floor??[.25,.45,.4])),f=new nn({vertexShader:A_,fragmentShader:T_,uniforms:{...Ht,uAreas:{value:this.texture},uExtent:{value:new Lt(r.minX,r.minZ,o/Hi,u/Hi)},uPixel:{value:i},uTypeFloor:{value:h},uFloorReady:{value:this.floorReady},uFloors:{value:this.floors},uTile:{value:new Ve(64,48)},uFloorsSize:{value:new Ve(64*Vi,192)},uSat:{value:t.sat},uFloor:{value:new Y(e.dancefloor.x,e.dancefloor.z,e.dancefloor.radius)},uCanopy:{value:new Lt},uClearing:{value:new Ve(e.tuning.clearingSize,e.tuning.clearingFalloff)}}}),d=new ti(a+400,s+400);d.rotateX(-Math.PI/2),this.mesh=new ln(d,f),this.mesh.position.set((r.minX+r.maxX)/2,0,(r.minZ+r.maxZ)/2)}map;mesh;texture;tile=new Sr(new Uint8Array(Kt*Kt*4),Kt,Kt);filled;tilesX;tilesZ;initialised=!1;floorReady=new Array(32).fill(0);floors;pendingFloors=[];setCanopyShadow(e,t,i,r){this.mesh.material.uniforms.uCanopy.value.set(e,t,i,r)}setFloor(e,t){this.pendingFloors.push([e,t])}placeFloors(e){for(const[t,i]of this.pendingFloors){const r=this.mesh.material,a=r.uniforms.uTile.value;if(i.w!==a.x||i.h!==a.y)continue;const s=new Sr(i.albedo,i.w,i.h);s.needsUpdate=!0,e.copyTextureToTexture(s,this.floors,null,new Ve(t%Vi*i.w,Math.floor(t/Vi)*i.h)),s.dispose(),this.floorReady[t]=1}this.pendingFloors=[]}fill(e,t,i,r,a){this.initialised||(e.initTexture(this.texture),e.initTexture(this.floors),this.initialised=!0),this.pendingFloors.length&&this.placeFloors(e);const s=this.map.extent,o=Kt/Hi,u=(t-s.minX)/o,c=(i-s.minZ)/o,h=Math.ceil(r/o),f=[];for(let _=Math.max(0,Math.floor(c)-h);_<=Math.min(this.tilesZ-1,Math.floor(c)+h);_++)for(let x=Math.max(0,Math.floor(u)-h);x<=Math.min(this.tilesX-1,Math.floor(u)+h);x++)this.filled[_*this.tilesX+x]||f.push([x,_,(x+.5-u)**2+(_+.5-c)**2]);f.sort((_,x)=>_[2]-x[2]);const d=performance.now();let p=0;for(const[_,x]of f){if(p>0&&performance.now()-d>a)break;this.fillTile(e,_,x),p++}return f.length-p}fillTile(e,t,i){const r=this.map.extent,a=this.tile.image.data;for(let s=0;s<Kt;s++)for(let o=0;o<Kt;o++){const u=r.minX+(t*Kt+o+.5)/Hi,c=r.minZ+(i*Kt+s+.5)/Hi,h=this.map.areaAt(u,c),f=(s*Kt+o)*4;a[f]=h.type,a[f+1]=Math.round(h.openness*255),a[f+2]=0,a[f+3]=255}this.tile.needsUpdate=!0,e.copyTextureToTexture(this.tile,this.texture,null,new Ve(t*Kt,i*Kt)),this.filled[i*this.tilesX+t]=1}dispose(){this.texture.dispose(),this.tile.dispose(),this.mesh.geometry.dispose(),this.mesh.material.dispose()}}const C_="varying vec2 vUv; void main() { vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }",L_=`
uniform sampler2D uScene; uniform float uThreshold; varying vec2 vUv;
void main() {
  vec3 c = texture2D(uScene, vUv).rgb;
  float l = max(c.r, max(c.g, c.b));
  gl_FragColor = vec4(c * smoothstep(uThreshold, uThreshold + 0.25, l), 1.0);
}`,D_=`
uniform sampler2D uSrc; uniform vec2 uStep; varying vec2 vUv;
void main() {
  vec3 c = texture2D(uSrc, vUv).rgb * 0.227;
  c += (texture2D(uSrc, vUv + uStep * 1.38).rgb + texture2D(uSrc, vUv - uStep * 1.38).rgb) * 0.316;
  c += (texture2D(uSrc, vUv + uStep * 3.23).rgb + texture2D(uSrc, vUv - uStep * 3.23).rgb) * 0.070;
  gl_FragColor = vec4(c, 1.0);
}`,P_=`
uniform sampler2D uScene, uBloom; uniform vec2 uLow; uniform float uBloomStrength; varying vec2 vUv;
void main() {
  vec2 p = (floor(vUv * uLow) + 0.5) / uLow;
  vec3 c = texture2D(uScene, p).rgb + texture2D(uBloom, vUv).rgb * uBloomStrength;
  gl_FragColor = vec4(min(c, vec3(1.0)), 1.0);
}`,I_=`
uniform sampler2D uSrc; uniform vec2 uTexel, uDir; uniform float uStrength, uBand, uCentre; varying vec2 vUv;
void main() {
  float d = max(0.0, abs(vUv.y - uCentre) - uBand * 0.5) / max(0.05, 0.5 - uBand * 0.5);
  float r = uStrength * smoothstep(0.0, 1.0, d);
  if (r < 0.35) { gl_FragColor = texture2D(uSrc, vUv); return; }
  vec3 c = vec3(0.0); float w = 0.0;
  for (int i = -6; i <= 6; i++) {
    float t = float(i) / 6.0, k = exp(-t * t * 2.0);
    c += texture2D(uSrc, vUv + uDir * uTexel * t * r).rgb * k; w += k;
  }
  gl_FragColor = vec4(c / w, 1.0);
}`;function Kr(n,e,t,i=!1){const r=new wn(Math.max(1,n),Math.max(1,e),{minFilter:t,magFilter:t,depthBuffer:i,generateMipmaps:!1});return r.texture.colorSpace=Pn,r}class N_{constructor(e,t){this.renderer=e,this.tuning=t,this.scene=Kr(1,1,Bt,!0);const i=(r,a)=>new nn({vertexShader:C_,fragmentShader:r,uniforms:a,depthTest:!1,depthWrite:!1});this.mats={bright:i(L_,{uScene:{value:null},uThreshold:{value:.6}}),blur:i(D_,{uSrc:{value:null},uStep:{value:new Ve}}),composite:i(P_,{uScene:{value:null},uBloom:{value:null},uLow:{value:new Ve},uBloomStrength:{value:0}}),tilt:i(I_,{uSrc:{value:null},uTexel:{value:new Ve},uDir:{value:new Ve},uStrength:{value:0},uBand:{value:.4},uCentre:{value:.5}})},this.quad=new ln(new ti(2,2),this.mats.composite),this.quad.frustumCulled=!1}renderer;tuning;scene;bright=Kr(1,1,Bt);bloomB=Kr(1,1,Bt);a=Kr(1,1,Bt);b=Kr(1,1,Bt);quad;cam=new _l(-1,1,1,-1,0,1);mats;low=new Ve(1,1);out=new Ve(1,1);get fullResolution(){return this.tuning.tiltShift.on&&this.tuning.tiltShift.where==="after"}resize(e,t,i,r){this.low.set(e,t),this.out.set(i,r),this.scene.setSize(e,t);const a=Math.max(1,Math.round(e/2)),s=Math.max(1,Math.round(t/2));this.bright.setSize(a,s),this.bloomB.setSize(a,s);const o=this.fullResolution?i:e,u=this.fullResolution?r:t;this.a.setSize(o,u),this.b.setSize(o,u)}pass(e,t,i){const r=this.mats[e];i(r.uniforms),this.quad.material=r,this.renderer.setRenderTarget(t),this.renderer.render(this.quad,this.cam)}render(e,t){const i=this.renderer,r=this.tuning;i.setRenderTarget(this.scene),i.render(e,t);const a=r.bloom.on&&r.bloom.strength>0;if(a){const f=this.bright.width,d=this.bright.height;this.pass("bright",this.bright,p=>{p.uScene.value=this.scene.texture,p.uThreshold.value=r.bloom.threshold});for(let p=0;p<2;p++)this.pass("blur",this.bloomB,_=>{_.uSrc.value=this.bright.texture,_.uStep.value.set(1/f,0)}),this.pass("blur",this.bright,_=>{_.uSrc.value=this.bloomB.texture,_.uStep.value.set(0,1/d)})}const s=r.tiltShift.on&&r.tiltShift.strength>0;if(this.pass("composite",s?this.a:null,f=>{f.uScene.value=this.scene.texture,f.uBloom.value=this.bright.texture,f.uLow.value.copy(this.low),f.uBloomStrength.value=a?r.bloom.strength:0}),!s)return;const o=this.a.width,u=this.a.height,c=this.fullResolution?this.out.y/this.low.y:1,h=f=>{f.uTexel.value.set(1/o,1/u),f.uStrength.value=r.tiltShift.strength*c,f.uBand.value=r.tiltShift.band,f.uCentre.value=1-r.tiltShift.centre};this.pass("tilt",this.b,f=>{h(f),f.uSrc.value=this.a.texture,f.uDir.value.set(1,0)}),this.pass("tilt",null,f=>{h(f),f.uSrc.value=this.b.texture,f.uDir.value.set(0,1)})}}const U_=`
varying vec3 vWorld;
void main() {
  vec4 w = modelMatrix * vec4(position, 1.0);
  vWorld = w.xyz;
  gl_Position = projectionMatrix * viewMatrix * w;
}`,O_=`
uniform float uStrength, uWind, uPixel;
varying vec3 vWorld;
${ps}
float hash(vec2 p) { p = fract(p * vec2(123.34, 456.21)); p += dot(p, p + 45.32); return fract(p.x * p.y); }
float vnoise(vec2 p) {
  vec2 i = floor(p), f = fract(p), u = f * f * (3.0 - 2.0 * f);
  float a = hash(i), b = hash(i + vec2(1, 0)), c = hash(i + vec2(0, 1)), d = hash(i + vec2(1, 1));
  return a + (b - a) * u.x + (c - a) * u.y + (a - b - c + d) * u.x * u.y;
}
void main() {
  vec2 p = (floor(vWorld.xz / uPixel) + 0.5) * uPixel; // on the art's pixel grid
  vec2 drift = vec2(1.0, 0.35) * uWind * uTime;
  float n = vnoise((p + drift) / 14.0) * 0.65 + vnoise((p - drift * 0.6) / 5.0) * 0.35;
  float far = smoothstep(uHazeRange.x * 0.5, uHazeRange.y, length(vWorld.xz - uHazeCentre));
  float a = uStrength * (smoothstep(0.45, 0.85, n) + far * 0.3);
  // Ordered dither on the art's pixel grid: pixel art, no smooth alpha.
  vec2 g = mod(floor(gl_FragCoord.xy), 4.0);
  int i = int(g.x) + int(g.y) * 4;
  int m[16] = int[16](0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5);
  if ((float(m[i]) + 0.5) / 16.0 >= a) discard;
  gl_FragColor = vec4(mix(uHazeColour * 1.8, uMoon * 0.7 + uAmb * 0.8, 0.5), 1.0);
}`;class F_{constructor(e,t,i,r){this.height=t,this.mat=new nn({vertexShader:U_,fragmentShader:O_,uniforms:{...Ht,uStrength:{value:e},uWind:{value:i},uPixel:{value:r}},depthWrite:!1}),this.mesh=new ln(new ti(700,700).rotateX(-Math.PI/2),this.mat),this.mesh.frustumCulled=!1,this.mesh.renderOrder=2}height;mesh;mat;follow(e,t){this.mesh.position.set(e,this.height,t-150)}}const B_=`
attribute vec4 iShadow; // x, z, width, depth (metres)
varying vec2 vLocal;
varying vec3 vWorld;
void main() {
  vLocal = position.xz * 2.0;
  vec3 w = vec3(iShadow.x + position.x * iShadow.z, 0.03, iShadow.y + position.z * iShadow.w);
  vWorld = w;
  gl_Position = projectionMatrix * viewMatrix * vec4(w, 1.0);
}`,k_=`
uniform float uStrength;
varying vec2 vLocal;
varying vec3 vWorld;
${ps}
float bayer(vec2 p) {
  int i = int(mod(p.x, 4.0)) + int(mod(p.y, 4.0)) * 4;
  int m[16] = int[16](0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5);
  return (float(m[i]) + 0.5) / 16.0;
}
void main() {
  float r = dot(vLocal, vLocal);
  if (r > 1.0) discard;
  float a = uStrength * (1.0 - r * r);
  if (bayer(gl_FragCoord.xy) >= a) discard;
  gl_FragColor = vec4(haze(uHazeColour * 0.25, vWorld), 1.0);
}`;class z_{mesh;geo=new Fu;attr;capacity=0;constructor(e){const t=new ti(1,1).rotateX(-Math.PI/2);this.geo.index=t.index,this.geo.setAttribute("position",t.getAttribute("position")),this.attr=this.grow(1024);const i=new nn({vertexShader:B_,fragmentShader:k_,uniforms:{...Ht,uStrength:{value:e}},depthWrite:!1});this.mesh=new ln(this.geo,i),this.mesh.frustumCulled=!1,this.mesh.renderOrder=1}grow(e){return this.capacity=Math.max(e,this.capacity*2),this.attr=new Pu(new Float32Array(this.capacity*4),4),this.attr.setUsage(yu),this.geo.setAttribute("iShadow",this.attr),this.attr}set(e){e.length>this.capacity&&this.grow(e.length);const t=this.attr.array;e.forEach((i,r)=>{t[r*4]=i.x,t[r*4+1]=i.z,t[r*4+2]=i.w,t[r*4+3]=i.d}),this.attr.needsUpdate=!0,this.geo.instanceCount=e.length,this.mesh.visible=e.length>0}}const Mr={uRight:{value:new Y(1,0,0)},uUp:{value:new Y(0,1,0)},uFacing:{value:new Y(0,0,1)},uTopFade:{value:0}},H_=`
uniform vec3 uRight, uUp;
attribute vec3 iPos;
attribute vec2 iSize;
attribute vec4 iUv;
attribute vec2 iFlags;
varying vec2 vUv;
varying vec3 vWorld;
varying vec2 vFlags;
void main() {
  vec3 w = iPos + uRight * (position.x * iSize.x) + uUp * (position.y * iSize.y);
  float u = iFlags.x > 0.5 ? 1.0 - uv.x : uv.x;
  vUv = vec2(mix(iUv.x, iUv.z, u), mix(iUv.w, iUv.y, uv.y));
  vFlags = iFlags;
  vWorld = w;
  gl_Position = projectionMatrix * viewMatrix * vec4(w, 1.0);
}
`,G_=`
uniform sampler2D uAlbedo, uNormal;
uniform vec3 uRight, uUp, uFacing;
uniform float uTopFade, uUnlit;
varying vec2 vUv;
varying vec3 vWorld;
varying vec2 vFlags;
${ps}
// 4x4 ordered dither, for fading the canopy in pixel-art style.
float bayer(vec2 p) {
  int x = int(mod(p.x, 4.0)), y = int(mod(p.y, 4.0));
  int i = x + y * 4;
  int m[16] = int[16](0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5);
  return (float(m[i]) + 0.5) / 16.0;
}
void main() {
  vec4 a = texture2D(uAlbedo, vUv);
  if (a.a < 0.5) discard;
  if (vFlags.y > 0.5 && bayer(gl_FragCoord.xy) >= uTopFade) discard;
  // Eye glints, flowers and magic glow: the generator marks them with alpha 254.
  if (uUnlit > 0.5) { gl_FragColor = vec4(a.rgb, 1.0); return; }
  if (a.a < 0.999) { gl_FragColor = vec4(haze(a.rgb, vWorld), 1.0); return; }
  vec4 n = texture2D(uNormal, vUv);
  float nx = (n.r * 255.0 - 128.0) / 127.0, ny = (n.g * 255.0 - 128.0) / 127.0, nz = n.b;
  if (vFlags.x > 0.5) nx = -nx;
  vec3 N = normalize(uRight * nx - uUp * ny + uFacing * nz);
  gl_FragColor = vec4(haze(min(vec3(1.0), a.rgb * nightLight(N, vWorld) * 1.25), vWorld), 1.0);
}
`;class Ha{constructor(e,t,i={}){this.atlas=e,this.metresPerPixel=t;const r=new ti(1,1);r.translate(0,.5,0),this.geo=new Fu,this.geo.index=r.index,this.geo.setAttribute("position",r.getAttribute("position")),this.geo.setAttribute("uv",r.getAttribute("uv")),this.pos=this.size=this.uvs=this.flags=void 0,this.grow(64);const a=new nn({vertexShader:H_,fragmentShader:G_,uniforms:{...Ht,...Mr,uAlbedo:{value:e.albedo},uNormal:{value:e.normal},uUnlit:{value:i.unlit?1:0}},depthTest:!i.onTop,depthWrite:!i.onTop});this.mesh=new ln(this.geo,a),this.mesh.frustumCulled=!1,i.onTop&&(this.mesh.renderOrder=10)}atlas;metresPerPixel;mesh;geo;pos;size;uvs;flags;capacity=0;count=0;grow(e){const t=Math.max(e,this.capacity*2),i=(r,a)=>{const s=new Pu(new Float32Array(t*r),r);return s.setUsage(yu),a&&s.array.set(a.array),s};this.pos=i(3,this.pos),this.size=i(2,this.size),this.uvs=i(4,this.uvs),this.flags=i(2,this.flags),this.geo.setAttribute("iPos",this.pos),this.geo.setAttribute("iSize",this.size),this.geo.setAttribute("iUv",this.uvs),this.geo.setAttribute("iFlags",this.flags),this.capacity=t}set(e){e.length>this.capacity&&this.grow(e.length);const t=this.pos.array,i=this.size.array,r=this.uvs.array,a=this.flags.array;e.forEach((s,o)=>{t[o*3]=s.x,t[o*3+1]=s.y,t[o*3+2]=s.z,i[o*2]=s.frame.w*this.metresPerPixel,i[o*2+1]=s.frame.h*this.metresPerPixel,r.set(s.frame.uv,o*4),a[o*2]=s.flip?1:0,a[o*2+1]=s.top?1:0});for(const s of[this.pos,this.size,this.uvs,this.flags])s.needsUpdate=!0;this.count=e.length,this.geo.instanceCount=e.length,this.mesh.visible=e.length>0}dispose(){this.geo.dispose(),this.mesh.material.dispose(),this.atlas.albedo.dispose(),this.atlas.normal.dispose()}}class V_{constructor(e,t,i){this.canvas=e,this.game=t,this.style=i;const r=t.tuning;this.renderer=new i_({canvas:e,antialias:!1,powerPreference:"high-performance",preserveDrawingBuffer:!0}),this.renderer.setPixelRatio(1),this.renderer.info.autoReset=!1,this.renderer.outputColorSpace=ia,this.mpp=1/(r.artPixelsPerMetre*(2/r.pixelSize)),this.camera=new bn(r.camera.fov,1,1,900),this.post=new N_(this.renderer,r),this.scene.background=new lt(723478),w_(i,r.glowReach,this.mpp),this.assets=new y_(i,t.seed,r.pixelSize),this.ground=new R_(t.map,i,this.mpp),this.assets.onFloor=(c,h)=>this.ground.setFloor(c,h);const a=r.canopyShadow;this.ground.setCanopyShadow(a.on?a.strength:0,a.height,a.cover,a.wind),this.shadows=new z_(r.shadows.strength),this.shadows.mesh.visible=r.shadows.on,this.scene.add(this.shadows.mesh),r.mist.on&&r.mist.strength>0&&(this.mist=new F_(r.mist.strength,r.mist.height,r.mist.wind,this.mpp),this.scene.add(this.mist.mesh)),Ht.uHazeRange.value.set(r.haze.near,r.haze.far),this.scene.add(this.ground.mesh),this.witchBatch=new Ha(this.assets.witch,this.mpp,{unlit:!0,onTop:!0}),this.scene.add(this.witchBatch.mesh),this.stoneBatch=new Ha(this.assets.stones,this.mpp),this.scene.add(this.stoneBatch.mesh);const s=t.map.dancefloor,o=[];for(let c=0;c<9;c++){const h=c/9*Math.PI*2+.3;o.push({x:s.x+Math.cos(h)*s.radius,y:0,z:s.z+Math.sin(h)*s.radius,frame:this.assets.stones.frames[c%4],flip:c%2===0})}this.stoneBatch.set(o);const u=new nn({transparent:!1,depthWrite:!1,vertexShader:"varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }",fragmentShader:"varying vec2 vUv; void main(){ vec2 p = vUv * 2.0 - 1.0; if (dot(p, p) > 1.0 || mod(floor(gl_FragCoord.x) + floor(gl_FragCoord.y), 2.0) > 0.5) discard; gl_FragColor = vec4(0.02, 0.02, 0.05, 1.0); }"});this.shadow=new ln(new ti(1.4,.7).rotateX(-Math.PI/2),u),this.shadow.renderOrder=1,this.scene.add(this.shadow)}canvas;game;style;renderer;scene=new z0;camera;ground;assets;typeBatches=new Map;creatureBatches=new Map;witchBatch;stoneBatch;shadow;mpp;lastBuild={x:1/0,y:1/0,z:1/0,version:-1};post;shadows;shadowList=[];mist=null;width=1;height=1;stats={trees:0,bushes:0,creatures:0,batches:0,drawCalls:0,pendingArt:0,pendingGround:0};resize(e,t){const i=this.game.tuning.pixelSize;this.width=Math.max(1,Math.ceil(e/i)),this.height=Math.max(1,Math.ceil(t/i));const r=this.post.fullResolution?i:1;this.renderer.setSize(this.width*r,this.height*r,!1),this.post.resize(this.width,this.height,this.width*r,this.height*r),this.canvas.style.width=this.width*i+"px",this.canvas.style.height=this.height*i+"px",this.camera.aspect=this.width/this.height,this.camera.updateProjectionMatrix()}async prepare(){this.render(0,!1),this.drawCreatures(),this.ground.fill(this.renderer,this.game.witch.x,this.game.witch.z,50,1/0),await this.assets.whenIdle(),this.updateFrustum(),this.refresh(!0);for(let e=0;e<Jn.length;e++)this.assets.prefetchType(e);for(const e of Jn)this.assets.creatureArt(e.creature)}batchFor(e,t,i){let r=e.get(t);return r||(r=i(),r&&(e.set(t,r),this.scene.add(r.mesh))),r}frustum=new gl;box=new Nr;m4=new Ot;v3=new Y;drawn=new Set;pops=[];updateFrustum(){this.camera.updateMatrixWorld(),this.m4.multiplyMatrices(this.camera.projectionMatrix,this.camera.matrixWorldInverse),this.frustum.setFromProjectionMatrix(this.m4)}viewRect(e,t){const i=this.camera,r=i.position,a=this.game.witch,s=[];for(const c of[-1,1])for(const h of[-1,1]){const f=this.v3.set(c,h,1).unproject(i).sub(r).normalize();for(const d of[0,25]){let p=f.y<-.001?(d-r.y)/f.y:1/0;p>0||(p=1/0),p=Math.min(p,e+r.distanceTo(new Y(a.x,r.y,a.z))+t),s.push([r.x+f.x*p,r.z+f.z*p])}}s.push([r.x,r.z]);const o=s.map(c=>c[0]),u=s.map(c=>c[1]);return{minX:Math.min(...o)-t,maxX:Math.max(...o)+t,minZ:Math.min(...u)-t,maxZ:Math.max(...u)+t}}inView(e,t,i,r,a){const s=this.game.witch.x,o=this.game.witch.z,u=this.game.tuning.haze.far+a;return(e-s)**2+(t-o)**2>u*u?!1:(this.box.min.set(e-i/2-a,-a,t-r-a),this.box.max.set(e+i/2+a,r+a,t+a),this.frustum.intersectsBox(this.box))}inInnerView(e,t,i){const r=this.game.witch;if(Math.hypot(e-r.x,t-r.z)>this.game.tuning.haze.near)return!1;for(const a of[0,i]){const s=this.v3.set(e,a,t).project(this.camera);if(Math.abs(s.x)<.85&&Math.abs(s.y)<.85&&s.z<1)return!0}return!1}refresh(e=!1){const t=this.game,i=t.tuning,r=this.camera,a=i.viewMargin,s={x:r.position.x,y:r.position.y,z:r.position.z};if(!e&&Math.hypot(s.x-this.lastBuild.x,s.y-this.lastBuild.y,s.z-this.lastBuild.z)<a/3&&this.assets.version===this.lastBuild.version)return;this.lastBuild={...s,version:this.assets.version};const o=this.viewRect(i.haze.far,a),u=(o.minX+o.maxX)/2,c=(o.minZ+o.maxZ)/2,h=Math.max(o.maxX-o.minX,o.maxZ-o.minZ)/2,f=[],d=Ht.uMoonDir.value,p=-d.x/Math.max(.2,d.y),_=-d.z/Math.max(.2,d.y),x=new Map,g=new Set,m=(A,D)=>{let S=x.get(A);S||x.set(A,S=[]),S.push(D)},v=this.mpp;let E=0,b=0;for(const A of t.forest.treesNear(u,c,h)){const D=this.assets.typeArt(A.type);if(!D||!D.layout.big.length)continue;const S=D.atlas.frames,T=D.layout.big[A.variant%D.layout.big.length],I=S[T.top??T.bot];if(!this.inView(A.x,A.z,I.w*v,I.h*v,a))continue;m(A.type,{x:A.x,y:0,z:A.z,frame:S[T.bot],flip:A.flip}),T.top!==null&&m(A.type,{x:A.x,y:0,z:A.z,frame:S[T.top],flip:A.flip,top:!0});const C=I.w*v,F=I.h*v*(T.top===null?.2:.6);f.push({x:A.x+p*F,z:A.z+_*F,w:C*.8,d:C*.45}),g.add(`${A.x.toFixed(2)},${A.z.toFixed(2)},${I.h*v}`),E++}const R=(A,D)=>{for(const S of A){const T=this.assets.typeArt(S.type);if(!T)continue;const I=D(T.layout);if(!I.length)continue;const C=I[S.variant%I.length],F=T.atlas.frames,O=F[C.bot],P=F[C.top??C.bot];this.inView(S.x,S.z,P.w*v,P.h*v,a)&&(m(S.type,{x:S.x,y:0,z:S.z,frame:O,flip:S.flip}),C.top!==null&&m(S.type,{x:S.x,y:0,z:S.z,frame:F[C.top],flip:S.flip,top:!0}),f.push({x:S.x,z:S.z,w:O.w*v*.8,d:O.w*v*.3}),b++)}};R(t.forest.bushesNear(u,c,h),A=>A.small),R(t.forest.wallsNear(u,c,h),A=>A.walls.map(D=>({bot:D,top:null}))),R(t.forest.setPiecesNear(u,c,h),A=>A.set===null?[]:[A.set]);for(const[A,D]of this.typeBatches)x.has(A)||D.set([]);for(const[A,D]of x)this.batchFor(this.typeBatches,A,()=>{const T=this.assets.typeArt(A);return T&&new Ha(T.atlas,v)})?.set(D);if(!e&&this.assets.pending===0){const A=(D,S)=>{const[T,I,C]=D.split(",").map(Number);this.inInnerView(T,I,C)&&this.pops.push(`${S} ${T.toFixed(0)},${I.toFixed(0)}`)};for(const D of g)this.drawn.has(D)||A(D,"appeared");for(const D of this.drawn)g.has(D)||A(D,"vanished")}this.drawn=g,this.stats.trees=E,this.stats.bushes=b,this.shadowList=f}drawCreatures(){const e=this.game,t=e.camera,i=e.tuning.haze.far,r=new Map,a=[];let s=0;for(const o of e.creatures){if(Math.abs(o.x-t.tx)>i||Math.abs(o.z-t.tz)>i)continue;const u=this.assets.creatureArt(o.species);if(!u)continue;const c=u.atlas.frames[u.frame(o.level,o.moving?Math.floor(o.walk)%2:0)];if(!this.inView(o.x,o.z,c.w*this.mpp,c.h*this.mpp,4))continue;let h=r.get(o.species);h||r.set(o.species,h=[]),h.push({x:o.x,y:0,z:o.z,frame:c,flip:o.facing<0}),a.push({x:o.x,z:o.z,w:c.w*this.mpp*.7,d:c.w*this.mpp*.25}),s++}for(const[o,u]of this.creatureBatches)r.has(o)||u.set([]);for(const[o,u]of r)this.batchFor(this.creatureBatches,o,()=>{const h=this.assets.creatureArt(o);return h&&new Ha(h.atlas,this.mpp)})?.set(u);this.stats.creatures=s,this.game.tuning.shadows.on&&this.shadows.set(this.shadowList.concat(a))}render(e,t=!0){const i=this.game,r=i.tuning,a=Od(i),s=a.angle*Math.PI/180,o=2*a.distance*Math.tan(r.camera.fov*Math.PI/360)/this.height,u=new Y(0,Math.cos(s),-Math.sin(s)),c=new Y(a.tx,a.ty,a.tz),h=c.dot(u),f=c.x;c.addScaledVector(u,Math.round(h/o)*o-h),c.x+=Math.round(f/o)*o-f;const d=new Y(0,Math.sin(s),Math.cos(s)).multiplyScalar(a.distance);this.camera.position.copy(c).add(d),this.camera.up.set(0,1,0),this.camera.lookAt(c);const p=r.spriteTilt;Mr.uUp.value.set(0,1,0).lerp(u,p).normalize(),Mr.uFacing.value.crossVectors(Mr.uRight.value,Mr.uUp.value).normalize(),Mr.uTopFade.value=Ss(i.witch);const _=i.witch,x=rl(_,r);Ht.uGlowPos.value.set(_.x,x+r.glowHeight,_.z),Ht.uHazeCentre.value.set(_.x,_.z),Ht.uTime.value=e,this.mist?.follow(a.tx,a.tz);const g=Math.sin(e*2.4)*.12;this.witchBatch.set([{x:_.x,y:x+g-.4,z:_.z,frame:this.assets.witch.frames[0],flip:_.facing<0}]),this.shadow.position.set(_.x,.03,_.z),this.shadow.scale.setScalar(1-.5*Ss(_)),this.updateFrustum(),this.refresh(),this.drawCreatures(),this.assets.work(6);const m=Wn(r.haze.near,r.haze.far,Ss(_))*.8;this.stats.pendingGround=this.ground.fill(this.renderer,a.tx,a.tz-m*.5,m,3),this.stats.pendingArt=this.assets.pending,t&&(this.renderer.info.reset(),this.post.render(this.scene,this.camera),this.stats.drawCalls=this.renderer.info.render.calls,this.stats.batches=this.typeBatches.size+this.creatureBatches.size)}}const W_="The art style: knobs from the Witch Art Lab. Paste a style saved in the Lab here (its whole saved JSON, or just its style object). Any knob left out follows the Lab's current default, so an empty style means the Lab's default look, and stays up to date as the art changes.",Y_="Lab default",X_={},K_={_readme:W_,name:Y_,style:X_};function q_(n=K_){const e=n??{},t=e.style&&typeof e.style=="object"?e.style:e,i=__();for(const[r,a]of Object.entries(t))r in i&&(i[r]=a);return i}function Z_(n,e){const t=n.querySelector("#stick"),i=t.querySelector(".knob"),r=56;let a=null,s=0,o=0;const u=()=>n.classList.add("touch"),c=n.querySelector("#stick-zone");c.addEventListener("pointerdown",d=>{if(!(d.pointerType==="mouse"||a!==null)){u(),a=d.pointerId,s=d.clientX,o=d.clientY,t.style.left=s+"px",t.style.top=o+"px",t.classList.add("on");try{c.setPointerCapture(d.pointerId)}catch{}d.preventDefault()}}),c.addEventListener("pointermove",d=>{if(d.pointerId!==a)return;let p=d.clientX-s,_=d.clientY-o;const x=Math.hypot(p,_);x>r&&(p*=r/x,_*=r/x),i.style.transform=`translate(${p}px, ${_}px)`;const g=Math.min(1,x/r),m=.15,v=g<m?0:(g-m)/(1-m)/Math.max(1e-6,g);e.x=p/r*v,e.y=_/r*v});const h=d=>{d.pointerId===a&&(a=null,e.x=0,e.y=0,i.style.transform="",t.classList.remove("on"))};c.addEventListener("pointerup",h),c.addEventListener("pointercancel",h);const f=(d,p)=>{const _=n.querySelector(d);_.addEventListener("pointerdown",x=>{x.preventDefault(),x.stopPropagation(),p(),_.classList.add("down")}),_.addEventListener("pointerup",()=>_.classList.remove("down")),_.addEventListener("pointerleave",()=>_.classList.remove("down"))};f("#rise",()=>e.toggle=!0),f("#zoom-in",()=>e.zoom-=1),f("#zoom-out",()=>e.zoom+=1),window.addEventListener("touchstart",d=>{u(),d.touches.length===3&&(e.debug=!0)},{passive:!0})}const Mi=new URLSearchParams(location.search);let Xi=xd(Mi.get("seed"));Xi===null&&(Xi=Math.floor(Math.random()*1e6),Mi.set("seed",String(Xi)),history.replaceState(null,"","?"+Mi.toString()+location.hash));const _i={...ir,bloom:{...ir.bloom},tiltShift:{...ir.tiltShift},shadows:{...ir.shadows},canopyShadow:{...ir.canopyShadow},mist:{...ir.mist}};Mi.get("shadows")==="off"&&(_i.shadows.on=!1);Mi.get("canopy")==="off"&&(_i.canopyShadow.on=!1);Mi.get("mist")==="off"&&(_i.mist.on=!1);const Ga=Mi.get("tilt");Ga==="off"?_i.tiltShift.on=!1:(Ga==="before"||Ga==="after")&&(_i.tiltShift.on=!0,_i.tiltShift.where=Ga);Mi.get("bloom")==="off"&&(_i.bloom.on=!1);const di=Nd(Xi,_i),$_=document.getElementById("game"),aa=new V_($_,di,{...q_(),pixel:_i.pixelSize}),ms=new Hf;Z_(document.body,ms.touch);document.getElementById("version").textContent="v112 · 23920e7";const J_=document.getElementById("seed");J_.innerHTML=`seed <a href="?seed=${Xi}">${Xi}</a>`;const Zo=document.getElementById("debug"),xl=document.getElementById("start");let $r=Mi.has("debug");Zo.classList.toggle("on",$r);const qu=()=>aa.resize(window.innerWidth,window.innerHeight);window.addEventListener("resize",qu);qu();let gs=!1;requestAnimationFrame(()=>setTimeout(async()=>{await aa.prepare(),gs=!0,xl.classList.remove("loading")},0));let kc=null;function Zu(){if(!gs||!di.clock.paused)return!1;try{kc??=new AudioContext,kc.resume()}catch{}return di.clock.paused=!1,xl.style.display="none",ms.clearPresses(),!0}ms.onAny=Zu;xl.addEventListener("pointerdown",n=>{n.preventDefault(),Zu()});document.addEventListener("visibilitychange",()=>{document.hidden&&(Qa=0)});let Qa=0,zc=60,no=0,Va=0;function $u(n){requestAnimationFrame($u);const e=Qa?(n-Qa)/1e3:0;Qa=n,no++,Va+=e,Va>=.5&&(zc=no/Va,no=0,Va=0);const t=ms.read();if(t.debug&&($r=!$r,Zo.classList.toggle("on",$r)),Ud(di,t,e),!!gs&&(aa.render(n/1e3),$r)){const i=di.witch,r=aa.stats;Zo.textContent=[`fps    ${zc.toFixed(0)}`,`seed   ${Xi}`,`area   ${au(di)}`,`mode   ${i.mode}`,`at     ${i.x.toFixed(0)}, ${i.z.toFixed(0)} m   zoom ${di.camera.zoomStep}`,`trees  ${r.trees}  bushes ${r.bushes}  creatures ${r.creatures}`,`draws  ${r.drawCalls}  art queued ${r.pendingArt}  ground tiles ${r.pendingGround}`].join(`
`)}}requestAnimationFrame($u);window.witch={game:di,view:aa,areaUnderWitch:()=>au(di),get ready(){return gs}};
