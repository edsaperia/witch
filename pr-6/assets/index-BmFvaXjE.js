(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const a of s.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function t(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(r){if(r.ep)return;r.ep=!0;const s=t(r);fetch(r.href,s)}})();function Ui(n){let e=n>>>0;return()=>{e=e+1831565813>>>0;let t=e;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}}function He(n,e,t){let i=Math.imul(n|0,374761393)^Math.imul(e|0,668265263)^Math.imul(t|0,2147483647);return i=Math.imul(i^i>>>13,1274126177),((i^i>>>16)>>>0)/4294967296}function Rr(n,e,t){const i=Math.floor(n),r=Math.floor(e),s=n-i,a=e-r,o=s*s*(3-2*s),c=a*a*(3-2*a),l=He(i,r,t),u=He(i+1,r,t),f=He(i,r+1,t),d=He(i+1,r+1,t);return l+(u-l)*o+(f-l)*c+(l-u-f+d)*o*c}const Hn=(n,e,t)=>n+(e-n)*t,Oi=(n,e,t)=>Math.min(t,Math.max(e,n)),vn=n=>{const e=Oi(n,0,1);return e*e*(3-2*e)};function hd(n,e,t,i){const r=Math.max(1,n.camera.zoomSteps),s=Oi(Math.round(n.camera.startZoom),0,r-1),a=r>1?s/(r-1):0;return{zoomStep:s,zoom:a,tx:e,ty:t,tz:i,vx:0,vy:0,vz:0,ax:0,az:0,lift:0}}function Wa(n,e,t,i,r){const s=i*r,a=Math.exp(-s),o=n-t,c=e+i*o;return[t+(o+c*r)*a,(e-i*c*r)*a]}function ud(n,e,t,i,r,s,a){const o=a.camera,c=Math.max(1,o.zoomSteps),l=Oi(n.zoomStep+Math.sign(e),0,c-1),u=c>1?l/(c-1):0;let f=i.x*o.lookAhead,d=i.z*o.lookAhead;const p=Math.hypot(f,d);p>o.lookAheadMax&&(f*=o.lookAheadMax/p,d*=o.lookAheadMax/p);const g=1-Math.exp(-o.lookAheadEase*s),v=n.ax+(f-n.ax)*g,x=n.az+(d-n.az)*g,[m,M]=Wa(n.tx,n.vx,t.x+v,o.follow,s),[_,S]=Wa(n.ty,n.vy,t.y,o.follow,s),[w,E]=Wa(n.tz,n.vz,t.z+x,o.follow,s),L=n.zoom+(u-n.zoom)*(1-Math.exp(-o.zoomEase*s)),b=n.lift+(r-n.lift)*(1-Math.exp(-o.liftEase*s));return{zoomStep:l,zoom:L,tx:m,ty:_,tz:w,vx:M,vy:S,vz:E,ax:v,az:x,lift:Oi(b,0,1)}}function kh(n,e,t){const i=t.camera.ground,r=t.camera.treetop,s=vn(e),a=Hn(Hn(i.angleIn,i.angleOut,n.zoom),Hn(r.angleIn,r.angleOut,n.zoom),s),o=Hn(Hn(i.distanceIn,i.distanceOut,n.zoom),Hn(r.distanceIn,r.distanceOut,n.zoom),s),c=a*Math.PI/180;return{angle:a,distance:o,x:n.tx,y:n.ty+Math.sin(c)*o,z:n.tz+Math.cos(c)*o,tx:n.tx,ty:n.ty,tz:n.tz}}const dd=.1,fd=()=>({time:0,paused:!0});function pd(n,e){if(n.paused||!(e>0))return 0;const t=Math.min(dd,e);return n.time+=t,t}const md={moor:{treeDensity:.65},"fern-forest":{treeDensity:1},"muddy-forest":{treeDensity:1},"stone-shrine":{treeDensity:.6},"tangly-forest":{treeDensity:1},"wispy-forest":{treeDensity:1},"hazel-forest":{treeDensity:1},garden:{treeDensity:.75},"twiggy-forest":{treeDensity:1},ancient:{treeDensity:.9},norway:{treeDensity:1},"alder-forest":{treeDensity:.9},meadow:{treeDensity:.55},"old-oaks":{treeDensity:.9},"berry-thicket":{treeDensity:1},wetland:{treeDensity:.75},stream:{treeDensity:.8},"rocky-slope":{treeDensity:.75},bog:{treeDensity:.7},deadwood:{treeDensity:.8},"cave-mouth":{treeDensity:.75},grassland:{treeDensity:.55},"beaver-pond":{treeDensity:.8},"log-pile":{treeDensity:.7},heath:{treeDensity:.65},"old-pinewood":{treeDensity:1},ravine:{treeDensity:.75},"bluebell-glade":{treeDensity:.8},"holly-thicket":{treeDensity:1},"honeysuckle-tangle":{treeDensity:1}},gd={types:md};function Pl(n,e){if(typeof document<"u"){const t=document.createElement("canvas");return t.width=n,t.height=e,t}return new OffscreenCanvas(n,e)}function Ca(n){let e=n>>>0;return()=>{e=e+1831565813>>>0;let t=e;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}}const ye=(n,e,t)=>e+(t-e)*n(),Gh=(n,e)=>e[Math.floor(n()*e.length)];function Pt(n,e,t){let i=Math.imul(n|0,374761393)^Math.imul(e|0,668265263)^Math.imul(t|0,2147483647);return i=Math.imul(i^i>>>13,1274126177),((i^i>>>16)>>>0)/4294967296}function Di(n,e,t){const i=Math.floor(n),r=Math.floor(e),s=n-i,a=e-r,o=s*s*(3-2*s),c=a*a*(3-2*a),l=Pt(i,r,t),u=Pt(i+1,r,t),f=Pt(i,r+1,t),d=Pt(i+1,r+1,t);return l+(u-l)*o+(f-l)*c+(l-u-f+d)*o*c}function ge(n,e,t){n=(n%1+1)%1,e=Math.max(0,Math.min(1,e)),t=Math.max(0,Math.min(1,t));const i=Math.floor(n*6),r=n*6-i,s=t*(1-e),a=t*(1-r*e),o=t*(1-(1-r)*e),[c,l,u]=[[t,o,s],[a,t,s],[s,t,o],[s,a,t],[o,s,t],[t,s,a]][i%6];return[Math.round(c*255),Math.round(l*255),Math.round(u*255)]}const h={BODY:1,BELLY:2,ACCENT:3,EYE:4,GLINT:5,TRUNK:6,LEAF:7,LEAF2:8,CLOTH:9,SKIN:10,HAIR:11,BROOM:12,STRAW:13,BODY2:14,BARK2:15,FLOWER:16,PUPIL:17,MAGIC:18,BARKD:19,LINE:20,IRIS:21,MAGIC2:22,NOSE:23,EAR:24,BODY3:25,LEAF3:26,BARKL:27,HAT:28,PHONES:29,TOP:30,JACKET:31,JEANS:32,SHOES:33,WATER:34,STONE:35,STONED:36,MOSS:37,CRYSTAL:38,RUNE:39,GLOW:40,WOOD:41,COLLAR:42,HAT1:43,HAT2:44,POM:45,SHADES:46,FRAME:47,SHOE:48,SOLE:49,WOKEN:50,WEB:51},Va=4;function Hh(n,e,t,i=.12){const r=(s,a,o,c)=>{const l=o-s,u=c-a,f=Math.max(0,Math.min(1,((n-s)*l+(e-a)*u)/(l*l+u*u)));return Math.hypot(n-s-l*f,e-a-u*f)<i};switch((t%Va+Va)%Va){case 0:return r(.5,.08,.5,.92)||r(.5,.1,.18,.4)||r(.5,.1,.82,.4);case 1:return r(.5,.08,.5,.92)||r(.5,.5,.18,.18)||r(.5,.5,.82,.18);case 2:return r(.2,.1,.8,.9)||r(.8,.1,.2,.9)||r(.5,.08,.5,.92);default:return r(.3,.08,.3,.92)||r(.3,.12,.75,.35)||r(.75,.35,.3,.55)||r(.3,.55,.78,.92)}}const xd=new Set([h.GLINT,h.MAGIC,h.MAGIC2,h.RUNE,h.GLOW,h.COLLAR,h.WOKEN]);function vc(n,e=!0,t=8){const i=n.length,r=[];if(i<3)return n.slice();const s=o=>e?n[(o+i)%i]:n[Math.max(0,Math.min(i-1,o))],a=e?i:i-1;for(let o=0;o<a;o++){const c=s(o-1),l=s(o),u=s(o+1),f=s(o+2),d=Math.max(2,Math.ceil(Math.hypot(u[0]-l[0],u[1]-l[1])/1.5),t);for(let p=0;p<d;p++){const g=p/d,v=g*g,x=v*g;r.push([0,1].map(m=>.5*(2*l[m]+(-c[m]+u[m])*g+(2*c[m]-5*l[m]+4*u[m]-f[m])*v+(-c[m]+3*l[m]-3*u[m]+f[m])*x)))}}return e||r.push(n[i-1]),r}function vd(n,{cap:e=1,capEnd:t=e}={}){const i=[],r=[],s=n.length;for(let c=0;c<s;c++){const l=n[Math.max(0,c-1)],u=n[Math.min(s-1,c+1)];let f=u[0]-l[0],d=u[1]-l[1];const p=Math.hypot(f,d)||1;f/=p,d/=p;const g=n[c][2]/2;i.push([n[c][0]-d*g,n[c][1]+f*g]),r.push([n[c][0]+d*g,n[c][1]-f*g])}const a=(c,l,u,f)=>{let d=c[0]-l[0],p=c[1]-l[1];const g=Math.hypot(d,p)||1;return[c[0]+d/g*u/2*f,c[1]+p/g*u/2*f]};return[...i,a(n[s-1],n[s-2],n[s-1][2],t),...r.reverse(),a(n[0],n[1],n[0][2],e)]}const Ct=(n,e)=>[n[0]+e[0],n[1]+e[1]],vi=(n,e,t)=>[n[0]+(e[0]-n[0])*t,n[1]+(e[1]-n[1])*t];function La(n,e,t,i,r,s=1){const a=[];for(let o=0;o<n.length;o++){if(a.push(n[o]),o<e||o>=t)continue;const c=n[o],l=n[(o+1)%n.length];let u=l[0]-c[0],f=l[1]-c[1];const d=Math.hypot(u,f)||1,p=f/d*s,g=-u/d*s;for(let v=1;v<=i;v++){const x=(v-.5)/i,m=vi(c,l,x),M=[m[0]+p*r-u/d*r*.5,m[1]+g*r-f/d*r*.5];a.push(vi(c,l,x-.45/i),M,vi(c,l,x+.35/i))}}return a}function Mc(n,e,t){const i=new Uint8Array(n*e);let r=1/0,s=-1/0;for(const a of t)r=Math.min(r,a[1]),s=Math.max(s,a[1]);for(let a=Math.max(0,Math.floor(r));a<=Math.min(e-1,Math.ceil(s));a++){const o=a+.5,c=[];for(let l=0,u=t.length-1;l<t.length;u=l++){const[f,d]=t[l],[p,g]=t[u];d>o!=g>o&&c.push(f+(o-d)/(g-d)*(p-f))}c.sort((l,u)=>l-u);for(let l=0;l+1<c.length;l+=2)for(let u=Math.max(0,Math.ceil(c[l]-.5));u<=Math.min(n-1,Math.floor(c[l+1]-.5));u++)i[a*n+u]=1}return i}function Md(n,e,t){const r=new Float32Array(n*e),s=new Float32Array(n*e);for(let c=0;c<n*e;c++)t[c]&&(r[c]=1e4,s[c]=1e4);const a=c=>r[c]*r[c]+s[c]*s[c],o=(c,l,u,f,d)=>{const p=l+f,g=u+d;let v,x;if(p<0||g<0||p>=n||g>=e)v=f,x=d;else{const m=g*n+p;v=r[m]+f,x=s[m]+d}v*v+x*x<a(c)&&(r[c]=v,s[c]=x)};for(let c=0;c<e;c++){for(let l=0;l<n;l++){const u=c*n+l;t[u]&&(o(u,l,c,-1,0),o(u,l,c,0,-1),o(u,l,c,-1,-1),o(u,l,c,1,-1))}for(let l=n-1;l>=0;l--){const u=c*n+l;t[u]&&o(u,l,c,1,0)}}for(let c=e-1;c>=0;c--){for(let l=n-1;l>=0;l--){const u=c*n+l;t[u]&&(o(u,l,c,1,0),o(u,l,c,0,1),o(u,l,c,1,1),o(u,l,c,-1,1))}for(let l=0;l<n;l++){const u=c*n+l;t[u]&&o(u,l,c,-1,0)}}return{vx:r,vy:s}}class Mn{constructor(e,t,i=1){this.sx=i,this.w=Math.round(e*i),this.h=t|0,this.m=new Uint8Array(this.w*this.h),this.n=new Float32Array(this.w*this.h*3),this.g=new Uint8Array(this.w*this.h)}inb(e,t){return e>=0&&t>=0&&e<this.w&&t<this.h}get(e,t){return e|=0,t|=0,this.inb(e,t)?this.m[t*this.w+e]:0}put(e,t,i,r=0,s=0,a=1){this.px(e*this.sx,t,i,r,s,a)}px(e,t,i,r=0,s=0,a=1){if(e=Math.floor(e),t=Math.floor(t),!this.inb(e,t))return;const o=t*this.w+e;this.m[o]=i,this.n[o*3]=r,this.n[o*3+1]=s,this.n[o*3+2]=a}recolour(e,t,i){e=Math.floor(e),t=Math.floor(t),this.inb(e,t)&&this.m[t*this.w+e]&&(this.m[t*this.w+e]=i)}ellipse(e,t,i,r,s,a={}){const{onlyOn:o,density:c=1,noise:l=0,seed:u=0,round:f=1}=a;e*=this.sx,i*=this.sx;for(let d=Math.max(0,Math.floor(t-r-1));d<Math.min(this.h,t+r+1);d++)for(let p=Math.max(0,Math.floor(e-i-1));p<Math.min(this.w,e+i+1);p++){const g=(p+.5-e)/i,v=(d+.5-t)/r,x=g*g+v*v;if(x>1)continue;const m=d*this.w+p;if(o&&!o.has(this.m[m]))continue;if(c<1){const w=l?Di(p/3.2,d/3.2,u)*l+(1-l)*.5:.5;if(Pt(p,d,u+77)>c*(.4+w*1.2)*(1.15-x*.5))continue}const M=g*f,_=v*f,S=Math.hypot(M,_,Math.sqrt(Math.max(0,1-x))+.15);this.px(p,d,s,M/S,_/S,(Math.sqrt(Math.max(0,1-x))+.15)/S)}}line(e,t,i,r,s,a,o,c=1){e*=this.sx,i*=this.sx;const l=Math.max(1,Math.ceil(Math.hypot(i-e,r-t)));for(let u=0;u<=l;u++){const f=u/l,d=e+(i-e)*f,p=t+(r-t)*f,g=Math.max(.5,(s+(a-s)*f)/2);for(let v=Math.floor(p-g);v<=p+g;v++)for(let x=Math.floor(d-g);x<=d+g;x++){const m=(x+.5-d)/g,M=(v+.5-p)/g;if(m*m+M*M>1)continue;const _=m*c,S=Math.hypot(_,M*.3,1);this.px(x,v,o,_/S,M*.3/S,1/S)}}}tri(e,t){let[[i,r],[s,a],[o,c]]=e;i*=this.sx,s*=this.sx,o*=this.sx;const l=(g,v,x,m,M,_)=>(g-M)*(m-_)-(x-M)*(v-_),u=Math.max(0,Math.floor(Math.min(i,s,o))),f=Math.min(this.w,Math.ceil(Math.max(i,s,o))),d=Math.max(0,Math.floor(Math.min(r,a,c))),p=Math.min(this.h,Math.ceil(Math.max(r,a,c)));for(let g=d;g<p;g++)for(let v=u;v<f;v++){const x=v+.5,m=g+.5,M=l(x,m,i,r,s,a),_=l(x,m,s,a,o,c),S=l(x,m,o,c,i,r);(M<0||_<0||S<0)&&(M>0||_>0||S>0)||this.px(v,g,t,0,-.2,.98)}}shape(e,t,i={}){return this.fillMask(Mc(this.w,this.h,vc(e,!0,i.per||6)),t,i)}limb(e,t,i={}){return this.shape(vd(e,i),t,i)}fillMask(e,t,{group:i=1,line:r=!1,depth:s=0,round:a=1,onlyOn:o=null,keepNormals:c=!1,tilt:l=[0,0],lineMat:u=h.LINE}={}){const{w:f,h:d}=this;if(o)for(let x=0;x<f*d;x++)e[x]&&!o.has(this.m[x])&&(e[x]=0);const{vx:p,vy:g}=Md(f,d,e);let v=s;if(!v){for(let x=0;x<f*d;x++)e[x]&&(v=Math.max(v,Math.hypot(p[x],g[x])));v=Math.max(1.5,Math.min(v*.9,2.5+v*.35))}for(let x=0;x<d;x++)for(let m=0;m<f;m++){const M=x*f+m;if(!e[M])continue;if(c){this.m[M]=t;continue}const _=Math.hypot(p[M],g[M]),S=Math.min(1,Math.max(0,(_-.5)/v)),w=Math.min(2.6,(1-S)/Math.sqrt(Math.max(.02,1-(1-S)*(1-S))))*a;let E=p[M]/(_||1)*w+l[0],L=g[M]/(_||1)*w+l[1];const b=Math.hypot(E,L,1);this.m[M]=t,this.n[M*3]=E/b,this.n[M*3+1]=L/b,this.n[M*3+2]=1/b}if(r&&!c){const x=[];for(let m=0;m<d;m++)for(let M=0;M<f;M++){const _=m*f+M;if(e[_])for(const[S,w]of[[1,0],[-1,0],[0,1],[0,-1]]){const E=M+S,L=m+w;if(E<0||L<0||E>=f||L>=d)continue;const b=L*f+E;if(!e[b]&&this.m[b]&&this.g[b]!==i&&this.m[b]!==u){x.push(_);break}}}for(const m of x)this.m[m]=u}if(!c)for(let x=0;x<f*d;x++)e[x]&&(this.g[x]=i);return e}mark(e,t,i,r={}){return this.fillMask(Mc(this.w,this.h,vc(e,!0,6)),t,{...r,onlyOn:new Set(i),keepNormals:!0})}grid(e,t,i=0,r=0,{round:s=1,flipX:a=!1}={}){const o=Math.max(...e.map(u=>u.length)),c=new Uint8Array(this.w*this.h),l=new Map;e.forEach((u,f)=>[...u].forEach((d,p)=>{const g=t[d];if(!g)return;const v=i+(a?o-1-p:p),x=r+f;this.inb(v,x)&&(c[x*this.w+v]=1,l.set(x*this.w+v,g))})),this.fillMask(c,h.BODY,{round:s,depth:2.5});for(const[u,f]of l)this.m[u]=f}}function Ii(n,e,t,i=t.outline,r=Pl){const{w:s,h:a}=n,o=()=>r(s,a),c=o(),l=o(),u=o(),f=c.getContext("2d").createImageData(s,a),d=l.getContext("2d").createImageData(s,a),p=u.getContext("2d").createImageData(s,a),g=i==="none"?null:i==="dark"?[22,18,30]:"tint";for(let v=0;v<a;v++)for(let x=0;x<s;x++){const m=v*s+x,M=n.m[m],_=m*4;if(!M){if(!g)continue;const b=[n.get(x+1,v),n.get(x-1,v),n.get(x,v+1),n.get(x,v-1)].find(P=>P);if(!b)continue;const A=g==="tint"?(e[b]||[0,0,0]).map(P=>P*.35|0):g;f.data.set([...A,255],_),d.data.set([128,128,255,255],_),p.data.set([128,128,255,255],_);continue}let S=e[M];M===h.LINE&&!S&&(S=g==="tint"||!g?(e[h.BODY2]||[0,0,0]).map(b=>b*.55|0):g),S=S||[255,0,255],f.data.set([...S,xd.has(M)?254:255],_);const w=n.n[m*3],E=n.n[m*3+1],L=n.n[m*3+2];d.data.set([w*127+128,E*127+128,L*255,255],_),p.data.set([-w*127+128,E*127+128,L*255,255],_)}return c.getContext("2d").putImageData(f,0,0),l.getContext("2d").putImageData(d,0,0),u.getContext("2d").putImageData(p,0,0),{A:c,N:l,NF:u,w:s,h:a}}const Ni=n=>{const e=Math.hypot(n[0],n[1],n[2])||1;return[n[0]/e,n[1]/e,n[2]/e]},hs=(n,e)=>[n[1]*e[2]-n[2]*e[1],n[2]*e[0]-n[0]*e[2],n[0]*e[1]-n[1]*e[0]],Ft=(n,e)=>n[0]*e[0]+n[1]*e[1]+n[2]*e[2],Nn=(n,e)=>[n[0]-e[0],n[1]-e[1],n[2]-e[2]],T={add:(n,e)=>[n[0]+e[0],n[1]+e[1],n[2]+e[2]],sub:Nn,mul:(n,e)=>[n[0]*e,n[1]*e,n[2]*e],lerp:(n,e,t)=>[n[0]+(e[0]-n[0])*t,n[1]+(e[1]-n[1])*t,n[2]+(e[2]-n[2])*t],norm:Ni,cross:hs,dot:Ft};function _c(n,e=[0,1,0]){const t=Ni(n);let i=hs(e,t);Math.hypot(...i)<1e-4&&(i=hs([0,0,1],t)),i=Ni(i);const r=hs(t,i);return[t,r,i]}function Wh(n,e){const t=Ft(n,e.axes[0]),i=Ft(n,e.axes[1]),r=Ft(n,e.axes[2]),[s,a,o]=e.r,c=Math.hypot(t/s,i/a,r/o),l=Math.hypot(t/(s*s),i/(a*a),r/(o*o));return l>1e-9?c*(c-1)/l:-Math.min(s,a,o)}function Vh(n,e){const{ba:t,l2:i,rr:r,a2:s,il2:a,r1:o,r2:c}=e,l=Ft(n,t),u=l-i,f=[n[0]*i-t[0]*l,n[1]*i-t[1]*l,n[2]*i-t[2]*l],d=Ft(f,f),p=l*l*i,g=u*u*i,v=Math.sign(r)*r*r*d;return Math.sign(u)*s*g>v?Math.sqrt(d+g)*a-c:Math.sign(l)*s*p<v?Math.sqrt(d+p)*a-o:(Math.sqrt(d*s*a)+l*r)*a-o}function Xh(n,e){const t=Math.abs(Ft(n,e.axes[0]))-e.h[0]+e.round,i=Math.abs(Ft(n,e.axes[1]))-e.h[1]+e.round,r=Math.abs(Ft(n,e.axes[2]))-e.h[2]+e.round;return Math.hypot(Math.max(t,0),Math.max(i,0),Math.max(r,0))+Math.min(Math.max(t,i,r),0)-e.round}const _d=(n,e)=>e*(Math.sin(n[0]*23+n[1]*7)*Math.sin(n[1]*19-n[2]*11)+.5*Math.sin(n[2]*41+n[0]*29)),Sc=(n,e)=>n.type==="ell"?Wh(Nn(e,n.cw),n):n.type==="box"?Xh(Nn(e,n.cw),n):Vh(Nn(e,n.aw),n),qr=(n,e)=>n.rough?Sc(n,e)+_d(e,n.rough):Sc(n,e);class Xe{constructor({blend:e=.07}={}){this.parts=[],this.flats=[],this.blend=e,this.anchors={feet:[]}}ell(e,t,i,r={}){const s=r.axes||(r.dir?_c(r.dir,r.up):[[1,0,0],[0,1,0],[0,0,1]]);return this.parts.push({type:"ell",c:e,r:t,axes:s,mat:i,group:r.group??1,extra:!!r.extra,paint:r.paint,rough:r.rough,cut:!!r.cut}),this}box(e,t,i,r={}){const s=r.axes||(r.dir?_c(r.dir,r.up):[[1,0,0],[0,1,0],[0,0,1]]);return this.parts.push({type:"box",c:e,h:t,round:Math.min(r.round??.02,...t),axes:s,mat:i,group:r.group??1,extra:!!r.extra,paint:r.paint,rough:r.rough,cut:!!r.cut}),this}seg(e,t,i,r,s,a={}){return this.parts.push({type:"cone",a:e,b:t,r1:i,r2:r,mat:s,group:a.group??1,extra:!!a.extra,paint:a.paint,rough:a.rough,cut:!!a.cut}),this}chain(e,t,i={}){for(let r=0;r+1<e.length;r++)this.seg(e[r].slice(0,3),e[r+1].slice(0,3),e[r][3],e[r+1][3],t,i);return this}flat(e,t,i,r,s,a,o={}){return this.flats.push({c:e,u:Ni(t),v:Ni(i),su:r,sv:s,mask:a,group:o.group??30,extra:!!o.extra,bend:o.bend??.35}),this}field(e){let t=1/0;for(const i of this.parts){if(i.extra||i.cut)continue;let r;if(i.type==="ell")r=Wh(Nn(e,i.c),i);else if(i.type==="box")r=Xh(Nn(e,i.c),i);else{const s=Nn(i.b,i.a),a=Math.max(1e-9,Ft(s,s)),o=i.r1-i.r2;r=Vh(Nn(e,i.a),{ba:s,l2:a,rr:o,a2:a-o*o,il2:1/a,r1:i.r1,r2:i.r2})}r<t&&(t=r)}return t}static surface(e,t,i){const r=1/Math.hypot(i[0]/t[0],i[1]/t[1],i[2]/t[2]);return[e[0]+i[0]*r,e[1]+i[1]*r,e[2]+i[2]*r]}}const bc={towards:.6,away:-.6},Sd=.52;function Tn(n,{height:e,scale:t,facing:i="towards",yaw:r=bc[i]??bc.towards,pitch:s=Sd,lineGap:a=.12}={}){const o=Math.cos(r),c=Math.sin(r),l=Math.cos(s),u=Math.sin(s),f=X=>[X[0]*o-X[2]*c,X[1],X[0]*c+X[2]*o],d=X=>[X[0]*o+X[2]*c,X[1],-X[0]*c+X[2]*o],p=[0,-u,-l],g=[0,l,-u],v=[1,0,0],x=[0,u,l],m=n.blend,M=n.parts.map(X=>{if(X.type==="ell"){const Oe=f(X.c),Ke=X.axes.map(f),Ye=Math.max(...X.r);return{...X,cw:Oe,axes:Ke,bc:Oe,br:Ye+(X.rough||0)*1.5}}if(X.type==="box"){const Oe=f(X.c),Ke=X.axes.map(f);return{...X,cw:Oe,axes:Ke,bc:Oe,br:Math.hypot(...X.h)+(X.rough||0)*1.5}}const he=f(X.a),ae=f(X.b),Ee=Nn(ae,he),Je=Math.max(1e-9,Ft(Ee,Ee)),Ce=X.r1-X.r2;return{...X,aw:he,ba:Ee,l2:Je,rr:Ce,a2:Je-Ce*Ce,il2:1/Je,bc:T.lerp(he,ae,.5),br:Math.sqrt(Je)/2+Math.max(X.r1,X.r2)}}),_=n.flats.map(X=>{const he=f(X.c),ae=f(X.u),Ee=f(X.v);return{...X,cw:he,uw:ae,vw:Ee,nw:Ni(hs(ae,Ee)),bc:he,br:Math.hypot(X.su,X.sv)}}),S=[...M,..._],w=X=>{const he=Ft(X.bc,v),ae=Ft(X.bc,g),Ee=X.br+(X.uw?0:m);return[he-Ee,he+Ee,ae-Ee,ae+Ee]};for(const X of S)[X.x0,X.x1,X.u0,X.u1]=w(X);const E=S.filter(X=>!X.extra&&!X.cut),L=Math.min(...E.map(X=>X.u0+(X.uw?0:m))),b=Math.max(...E.map(X=>X.u1-(X.uw?0:m))),A=t??e/Math.max(1e-6,b-L),P=Math.min(...S.map(X=>X.x0)),C=Math.max(...S.map(X=>X.x1)),N=Math.min(...S.map(X=>X.u0)),U=Math.max(...S.map(X=>X.u1)),D=Math.ceil((C-P)*A)+4,O=Math.ceil((U-N)*A)+2,z=new Mn(D,O),V=new Float32Array(D*O).fill(1/0),Q=new Int16Array(D*O).fill(-1),Y=8,te=Math.ceil(D/Y),F=Math.ceil(O/Y),ne=Array.from({length:te*F},()=>[]);S.forEach((X,he)=>{const ae=Math.max(0,Math.floor((X.x0-P)*A/Y)),Ee=Math.min(te-1,Math.floor(((X.x1-P)*A+2)/Y)),Je=Math.max(0,Math.floor((U-X.u1)*A/Y)),Ce=Math.min(F-1,Math.floor(((U-X.u0)*A+1)/Y));for(let Oe=Je;Oe<=Ce;Oe++)for(let Ke=ae;Ke<=Ee;Ke++)ne[Oe*te+Ke].push(he)});const ce=.25/A,be=(X,he)=>{const ae=Math.max(m-Math.abs(X-he),0)/m;return Math.min(X,he)-ae*ae*m*.25};for(let X=0;X<O;X++)for(let he=0;he<D;he++){const ae=ne[Math.floor(X/Y)*te+Math.floor(he/Y)];if(!ae.length)continue;const Ee=P+(he+.5-1)/A,Je=U-(X+.5)/A,Ce=T.add(T.add(T.mul(v,Ee),T.mul(g,Je)),T.mul(x,50));let Oe=1/0,Ke=-1/0;const Ye=[],wt=[];for(const Qe of ae){const ze=S[Qe],I=Nn(Ce,ze.bc),y=Ft(I,p),B=ze.br+(ze.uw?0:m),K=Ft(I,I)-B*B,Z=y*y-K;if(Z<0)continue;if(ze.uw){wt.push(ze);continue}if(ze.cut){Ye.push(ze);continue}const le=Math.sqrt(Z);Oe=Math.min(Oe,-y-le),Ke=Math.max(Ke,-y+le),Ye.push(ze)}let Ot=1/0,Qt=-1,_t=0,Et=null;if(Ye.length){const Qe=new Map;for(const y of Ye){let B=Qe.get(y.group);B||Qe.set(y.group,B=[]),B.push(y)}const ze=(y,B)=>{let K=1/0;for(const Z of y)Z.cut||(K=K===1/0?qr(Z,B):be(K,qr(Z,B)));for(const Z of y)Z.cut&&(K=Math.max(K,-qr(Z,B)));return K};let I=Math.max(0,Oe);for(let y=0;y<96&&I<Ke;y++){const B=T.add(Ce,T.mul(p,I));let K=1/0,Z=null;for(const[le,ue]of Qe){const j=ze(ue,B);j<K&&(K=j,Z=le)}if(K<ce){const le=Qe.get(Z),ue=.5/A;Et=Ni([ze(le,[B[0]+ue,B[1],B[2]])-ze(le,[B[0]-ue,B[1],B[2]]),ze(le,[B[0],B[1]+ue,B[2]])-ze(le,[B[0],B[1]-ue,B[2]]),ze(le,[B[0],B[1],B[2]+ue])-ze(le,[B[0],B[1],B[2]-ue])]);let j=le[0],ie=1/0;for(const de of le){if(de.cut)continue;const Le=qr(de,B);Le<ie&&(ie=Le,j=de)}for(const de of le)if(de.cut&&-qr(de,B)>ie-ce*2){j=de;break}Ot=I,Qt=Z,_t=j.paint?j.paint(d(B),j)??j.mat:j.mat;break}I+=Math.max(K*.9,ce*.5)}}for(const Qe of wt){const ze=Ft(p,Qe.nw);if(Math.abs(ze)<1e-4)continue;const I=Ft(Nn(Qe.cw,Ce),Qe.nw)/ze;if(I>=Ot)continue;const y=T.add(Ce,T.mul(p,I)),B=Nn(y,Qe.cw),K=Ft(B,Qe.uw)/Qe.su,Z=Ft(B,Qe.vw)/Qe.sv;if(Math.abs(K)>1||Math.abs(Z)>1)continue;const le=Qe.mask(K,Z);if(!le)continue;let ue=ze>0?T.mul(Qe.nw,-1):Qe.nw;ue=Ni(T.add(ue,T.add(T.mul(Qe.uw,K*Qe.bend),T.mul(Qe.vw,Z*Qe.bend*.5)))),Ot=I,Qt=Qe.group,_t=le,Et=ue}if(!Et||!_t)continue;const G=X*D+he;V[G]=Ot,Q[G]=Qt,z.px(he,X,_t,Ft(Et,v),-Ft(Et,g),Ft(Et,x))}const Ue=[];for(let X=0;X<O;X++)for(let he=0;he<D;he++){const ae=X*D+he;if(z.m[ae])for(const[Ee,Je]of[[1,0],[-1,0],[0,1],[0,-1]]){const Ce=he+Ee,Oe=X+Je;if(Ce<0||Oe<0||Ce>=D||Oe>=O)continue;const Ke=Oe*D+Ce;if(z.m[Ke]&&Q[Ke]!==Q[ae]&&V[Ke]-V[ae]>a){Ue.push(ae);break}}}for(const X of Ue)[h.EYE,h.GLINT,h.MAGIC,h.MAGIC2,h.NOSE,h.COLLAR,h.WOKEN,h.RUNE,h.GLOW].includes(z.m[X])||(z.m[X]=h.LINE);for(let X=0;X<O;X++)for(let he=0;he<D;he++){const ae=X*D+he;if(z.m[ae]!==h.EYE)continue;const Ee=X>0&&z.m[ae-D]===h.EYE,Je=he>0&&z.m[ae-1]===h.EYE,Ce=he+1<D&&z.m[ae+1]===h.EYE&&X+1<O&&z.m[ae+D]===h.EYE;!Ee&&!Je&&Ce&&(z.m[ae]=h.GLINT)}let ke=-1;for(let X=O-1;X>=0&&ke<0;X--)for(let he=0;he<D;he++)if(z.m[X*D+he]){ke=X;break}const ee=ke>=0&&ke<O-1?O-1-ke:0;if(ke>=0&&ke<O-1){const X=O-1-ke;for(let he=O-1;he>=0;he--)for(let ae=0;ae<D;ae++){const Ee=he*D+ae,Je=(he-X)*D+ae,Ce=he-X>=0;z.m[Ee]=Ce?z.m[Je]:0,z.g[Ee]=Ce?z.g[Je]:0;for(let Oe=0;Oe<3;Oe++)z.n[Ee*3+Oe]=Ce?z.n[Je*3+Oe]:0}}return z.bodyH=Math.round((b-L)*A),{sp:z,s:A,project:X=>{const he=f(X);return[+((he[0]-P)*A+1).toFixed(1),+((U-Ft(he,g))*A+ee).toFixed(1)]}}}const Yn=(n,e=9,t=.3)=>Pt(Math.floor(n[0]*e),Math.floor(n[1]*e)+Math.floor(n[2]*e)*97,7)<t,Qi={wing:(n,e)=>(t,i)=>{const r=(t+1)/2,s=1-.35*r*r,a=-1+.55*r+.18*Math.abs(Math.sin(r*Math.PI*6));return i>s||i<a?null:i>s-.35*(1-r*.5)?e:Math.floor(r*9)%2?n:e},ear:(n,e=h.EAR,t=h.BODY3)=>(i,r)=>{const s=(r+1)/2,a=.95*Math.sin(Math.PI*Math.min(1,.15+s*.85))*(1-s*.35);return Math.abs(i)>a?null:s>.82?t:Math.abs(i)<a*.5&&s<.7&&s>.12?e:n},flame:(n,e)=>(t,i)=>{const r=(i+1)/2,s=Math.sin(Math.PI*Math.min(1,r*1.1))*(1-r)*1.4;return Math.abs(t)>s?null:Math.abs(t)<s*.45&&r<.6?e:n},membrane:n=>(e,t)=>{const i=(e+1)/2,r=-1+.35*Math.abs(Math.sin(i*Math.PI*3));return t<r||t>1-.2*i?null:n},spotted:(n,e,t)=>(i,r)=>{if(Math.hypot(i,r*1.2)>1)return null;const a=Math.hypot(i-.35,r-.1);return a<.18?t:a<.3?e:n}},bd={hair:h.HAIR,hat:h.HAT,headphones:h.PHONES,top:h.TOP,jacket:h.JACKET,jeans:h.JEANS,sneakers:h.SHOES,broom:h.BROOM,bristles:h.STRAW,skin:h.SKIN},yc={hair:[.01,.7,.85],hat:[.74,.45,.45],headphones:[.92,.55,.9],top:[.13,.15,.95],jacket:[.72,.45,.7],jeans:[.6,.5,.7],sneakers:[0,0,.95],broom:[.08,.55,.55],bristles:[.12,.55,.9],skin:[.07,.3,.94]};function yd(n,e=yc){const t={...yc,...e},i={hair:n.hairHue,jacket:n.cloakHue,hat:n.hatHue,top:n.topHue,jeans:n.jeansHue,sneakers:n.shoeHue,headphones:n.phonesHue},r={};for(const[s,a]of Object.entries(bd)){const[o,c,l]=t[s];r[a]=ge(i[s]??o,c,l)}return r[h.EYE]=[24,18,30],r[h.GLINT]=[255,255,245],r[h.NOSE]=[20,16,24],r[h.MAGIC]=ge(n.glowHue??.13,.5,1),r[h.MAGIC2]=ge(n.glowHue??.13,.15,1),r[h.BELLY]=[245,245,240],r}const wd={rise:.78,descend:-.66,brake:.44};function Ed(n){const e=new Xe({blend:.03}),t=n%3,i=.5,r=.05,s=[[0,.02,-.01],[.02,-.01,.02],[-.01,.015,.01]][t],a=g=>i-r*(g/.62);e.seg([-.5,a(-.5),0],[.62,a(.62),0],.022,.018,h.BROOM,{group:2}),e.ell([-.64,a(-.64)+.005,0],[.2,.1,.11],h.STRAW,{dir:[1,r*1.6,0],group:3,paint:g=>g[0]<-.76?h.MAGIC2:g[0]>-.5?h.BROOM:void 0});const o=[-1,1].map(g=>[.5,a(.5)+.03,g*.045]),c=[-1,1].map(g=>[.2,i+.24+s[1],g*.1]);for(const g of[0,1]){const v=g?1:-1,x=v>0?7:5;e.seg(c[g],o[g],.04,.03,h.JACKET,{group:x}),e.ell(o[g],[.035,.03,.035],h.SKIN,{group:x})}const l=[.3+s[0],i+.27+s[1],0],u=[.07,i+.28+s[1]*.5,0],f=[-.15,i+.35+s[2],0];e.ell(u,[.17,.1,.11],h.JACKET,{dir:[1,-.25,0],group:1,paint:g=>g[1]<u[1]-.04&&Math.abs(g[2])<.055?h.TOP:void 0}),e.ell(f,[.11,.08,.1],h.JEANS,{dir:[1,-.3,0],group:1}),e.chain([[...T.add(f,[-.02,.06,0]),.07],[...T.add(f,[-.18,.08+s[0]*2,0]),.05],[...T.add(f,[-.34,.05+s[1]*3,.02]),.025]],h.JACKET,{group:12}),[[[-.32,i+.5+s[1]*2,-.07],[-.46,i+.38+s[0]*2,-.08]],[[-.34,i+.33+s[2]*2,.08],[-.55,i+.44-s[1]*3,.1]]].forEach(([g,v],x)=>{const m=x?6:4,M=T.add(f,[-.04,0,x?.06:-.06]);e.seg(M,g,.055,.045,h.JEANS,{group:m}),e.seg(g,v,.045,.04,h.JEANS,{group:m}),e.ell(T.add(v,[-.05,0,0]),[.08,.04,.045],h.SHOES,{dir:[-1,.3,0],group:m,paint:_=>_[1]<v[1]-.03?h.BELLY:void 0})}),e.ell(l,[.11,.115,.1],h.SKIN,{group:8,paint:g=>g[0]<l[0]-.01||g[1]>l[1]+.075?h.HAIR:void 0});for(const g of[-1,1]){const v=Xe.surface(l,[.11,.115,.1],T.norm([.85,.1,g*.45]));e.ell(v,[.026,.036,.026],h.BELLY,{group:8}),e.ell(T.add(v,[.012,0,g*.004]),[.014,.018,.014],h.EYE,{group:8})}e.ell(Xe.surface(l,[.11,.115,.1],T.norm([1,-.45,0])),[.012,.016,.04],h.BELLY,{group:8}),e.chain([[...T.add(l,[-.06,.03,0]),.065],[...T.add(l,[-.22,.05+s[1]*2,.01]),.05],[...T.add(l,[-.4,.06+s[2]*3,.02]),.03],[...T.add(l,[-.55,.07+s[0]*3,.02]),.012]],h.HAIR,{group:9});for(const g of[-1,1])e.ell(T.add(l,[-.015,0,g*.105]),[.05,.055,.03],h.PHONES,{group:10});e.chain([[...T.add(l,[-.005,.03,-.095]),.015],[...T.add(l,[-.02,.12,0]),.015],[...T.add(l,[-.005,.03,.095]),.015]],h.PHONES,{group:10});const p=T.add(l,[-.1+s[0],.2+s[1]*2,0]);e.ell(p,[.16,.014,.15],h.HAT,{dir:[1,.9,0],group:11}),e.chain([[...T.add(p,[-.02,.02,0]),.08],[...T.add(p,[-.14,.13,0]),.04],[...T.add(p,[-.3,.14+s[2]*2,0]),.012]],h.HAT,{group:11,paint:g=>Math.hypot(g[0]-p[0],g[1]-p[1])<.06?h.MAGIC:void 0}),e.seg(T.add(p,[.08,-.02,.08]),T.add(l,[.04,-.09,.08]),.008,.008,h.HAT,{group:11});for(const[g,v,x,m]of[[-.86,a(-.8)+.05,.03,.22],[-.88,a(-.8)-.04,-.04,.16],[-.7,i+.45,.05,.14],[-.2,i+.5,-.04,.12]]){const M=t*.05%.1;e.seg([g-M,v,x],[g-M-m,v,x],.01,.004,h.MAGIC2,{group:30,extra:!0})}return e.ell([.02,.005,0],[.2,.005,.12],h.NOSE,{group:0}),e}const Ad={stand:{frames:3,fps:3},land:{frames:3,fps:10},takeoff:{frames:3,fps:10},talk:{frames:4,fps:2.5},placeSigil:{frames:3,fps:6},liftSigil:{frames:3,fps:6},sit:{frames:2,fps:1.5}},Oo=.34,Yh={binding:[-.02,.31,-.2],dir:[.02,1,-.04]},Td={stand:[0,1,2].map(n=>({breathe:[0,.006,.012][n],sway:[0,.02,.035][n],free:[.04,.5+[0,.006,.012][n],.18],hand:"rest",broom:Yh})),land:[{crouch:.2,hop:.01,broom:{astride:!0},sway:.05},{crouch:.1,bend:.1,broom:{binding:[-.28,.26,-.08],dir:[.6,.5,-.06]},legUp:[.18,.24,.12],sway:.03,free:[.2,.58,.2],hand:"rest"},{breathe:.004,broom:{binding:[.06,.31,-.2],dir:[.18,1,-.03]},sway:.015,free:[.06,.52,.19],hand:"rest"}],takeoff:[{crouch:.1,broom:{binding:[-.1,.3,-.17],dir:[.35,.7,-.04]},free:[.16,.58,.2],hand:"rest",sway:.02},{crouch:.15,bend:.1,broom:{binding:[-.3,.28,-.06],dir:[.7,.4,-.04]},legUp:[.1,.26,.13],sway:.04,free:[.24,.55,.17],hand:"rest"},{hop:.1,broom:{astride:!0},toes:!0,sway:.06}],talk:[{free:[.47,.84,.13],hand:"palm",tilt:.35,mouth:!0,sway:.01},{free:[.32,1.18,.12],hand:"point",tilt:-.25,look:.12,sway:.02},{free:[.24,1.16,.3],elbow:[.26,.88,.26],hand:"wave",tilt:.45,mouth:!0,sway:.03},{free:[.15,.76,.1],hand:"chest",tilt:-.35,breathe:.01,sway:.015}],placeSigil:[{free:[.16,1.62,.1],hand:"palm",look:.22,breathe:.01,sway:.02},{free:[.42,1,.12],hand:"palm",look:.08,sway:.03},{crouch:.7,bend:.55,free:[.38,.1,.13],hand:"down",look:-.08,sway:.04}],liftSigil:[{crouch:.7,bend:.55,free:[.36,.08,.13],hand:"down",look:-.08,sway:.02},{crouch:.25,bend:.18,free:[.44,.82,.12],hand:"palm",look:.05,sway:.04},{breathe:.012,free:[.2,1.64,.1],hand:"palm",look:.25,sway:.05,toes:!0}],sit:[0,1].map(n=>({sit:!0,swing:[.06,-.06][n],bend:-.08,look:[.02,.1][n],tilt:[.15,-.2][n],sway:[.01,.03][n],breathe:[0,.008][n],broom:{binding:[-.24,.31,-.3],dir:[.32,1,-.06]},free:[.2,Oo+.14,.15],far:[.18,Oo+.14,-.13],hand:"rest"}))};function Rd(n,e,t){const i=Math.hypot(e[0]-n[0],e[1]-n[1]),r=T.lerp(n,e,.5);if(i>=2*t)return r;const s=Math.sqrt(t*t-i*i/4),a=(e[0]-n[0])/i,o=(e[1]-n[1])/i;return[r[0]-o*s,r[1]+a*s,r[2]]}function Cd(n,e){const t=Td[n],i={crouch:0,bend:0,hop:0,breathe:0,sway:0,tilt:0,look:0,broom:Yh,...t[e%t.length]},r=new Xe({blend:.03}),s=i.hop,a=i.sway,o=i.sit?Oo+.06:.45-i.crouch*.21+s,c=-i.crouch*.12,l=!!i.broom.astride,u=o-.04,f=l?[1,0,0]:T.norm(i.broom.dir),d=l?[-.36,u,0]:i.broom.binding,p=A=>T.add(d,T.mul(f,A));r.seg(p(0),p(l?.98:1.1),.022,.018,h.BROOM,{group:2}),r.ell(p(-.13),[.17,.07,.08],h.STRAW,{dir:f,group:3,paint:A=>{const P=T.dot(T.sub(A,d),f);return P<-.22?h.MAGIC2:P>-.01?h.BROOM:void 0}});for(const A of[-1,1]){const P=A>0?6:4,C=[c,o,A*.07],N=i.sit?i.swing*A:0,U=i.sit?[.24+N,.09+Math.max(0,N)*.6,A*.1]:A>0&&i.legUp?i.legUp:[(A>0?.05:-.01)+(i.toes?-.03:0),.07+(i.toes?s*.4:s),A*.1],D=i.sit?[.21,o+.01,A*.09]:Rd(C,U,.21);r.seg(C,D,.055,.045,h.JEANS,{group:P}),r.seg(D,U,.045,.04,h.JEANS,{group:P});const O=i.toes?[.03,-.045,0]:[.05,-.03,0];r.ell(T.add(U,O),[.08,.04,.045],h.SHOES,{dir:i.toes?[1,-.6,0]:[1,0,0],group:P,paint:z=>z[1]<U[1]+O[1]-.015?h.BELLY:void 0})}const g=[Math.sin(i.bend),Math.cos(i.bend),0],v=[Math.cos(i.bend),-Math.sin(i.bend),0],x=[c,o+.03,0];r.ell(x,[.1,.08,.105],h.JEANS,{group:1});const m=T.add(x,T.add(T.mul(g,.19),[0,i.breathe,0]));r.ell(m,[.1,.15+i.breathe*.5,.115],h.JACKET,{dir:v,group:1,paint:A=>T.dot(T.sub(A,m),v)>.045&&Math.abs(A[2])<.05?h.TOP:void 0}),r.chain([[...T.add(m,T.add(T.mul(v,-.07),T.mul(g,-.08))),.07],[...T.add(m,T.add(T.mul(v,-.11-a),T.mul(g,-.2))),.05],[...T.add(m,T.add(T.mul(v,-.13-a*1.6),T.mul(g,-.29))),.025]],h.JACKET,{group:12});const M=T.add(m,T.add(T.mul(g,.27),[i.look*.03,0,i.tilt*.04])),_=A=>T.add(m,T.add(T.mul(g,.1),[0,0,A*.12])),S=l?[.28,u+.03,-.05]:p(Math.max(.12,(Math.min(.62,o+.2)-d[1])/Math.max(.3,f[1]))),w=l?[.28,u+.03,.05]:i.free;for(const A of[-1,1]){const P=A>0?7:5,C=_(A),N=A>0?w:i.far||S,U=A>0&&i.elbow?i.elbow:T.add(T.lerp(C,N,.5),[-.03,-.02,A*.05]);r.seg(C,U,.04,.035,h.JACKET,{group:P}),r.seg(U,N,.035,.03,h.JACKET,{group:P});const D=A>0&&!l?i.hand:"grip";if(D==="palm")r.ell(N,[.045,.02,.04],h.SKIN,{group:P});else if(D==="down")r.ell(N,[.045,.02,.04],h.SKIN,{dir:[1,.15,0],group:P});else if(D==="wave"){r.ell(N,[.03,.045,.04],h.SKIN,{group:P});for(const O of[-1,0,1])r.seg(T.add(N,[0,.03,O*.02]),T.add(N,[O*.01,.065,O*.03]),.01,.008,h.SKIN,{group:P})}else D==="point"?(r.ell(N,[.035,.03,.035],h.SKIN,{group:P}),r.seg(T.add(N,[0,.02,0]),T.add(N,[.01,.08,0]),.012,.01,h.SKIN,{group:P})):r.ell(N,[.035,.03,.035],h.SKIN,{group:P})}r.ell(M,[.11,.115,.1],h.SKIN,{group:8,paint:A=>A[0]<M[0]-.01||A[1]>M[1]+.075?h.HAIR:void 0});for(const A of[-1,1])r.ell(Xe.surface(M,[.11,.115,.1],T.norm([.85,.05+i.look,A*.45+i.tilt*.1])),[.016,.026,.016],h.EYE,{group:8});i.mouth&&r.ell(Xe.surface(M,[.11,.115,.1],T.norm([1,-.5+i.look,i.tilt*.1])),[.012,.016,.025],h.NOSE,{group:8}),r.chain([[...T.add(M,[-.06,.02,0]),.06],[...T.add(M,[-.12-a,-.12,.02+i.tilt*.03]),.05],[...T.add(M,[-.13-a*1.5,-.25,.03+i.tilt*.04]),.03]],h.HAIR,{group:9});for(const A of[-1,1])r.ell(T.add(M,[-.015,0,A*.105]),[.05,.055,.03],h.PHONES,{group:10});r.chain([[...T.add(M,[-.005,.03,-.095]),.015],[...T.add(M,[-.005,.11,-.05]),.015],[...T.add(M,[-.005,.125,0]),.015],[...T.add(M,[-.005,.11,.05]),.015],[...T.add(M,[-.005,.03,.095]),.015]],h.PHONES,{group:10});const E=T.add(M,[-.03,.1,i.tilt*.02]),L=i.tilt*.05,b=T.add(E,[-.16-a*.5,.27,L*2]);return r.ell(E,[.16,.014,.15],h.HAT,{dir:[1,.25-i.look*.8,i.tilt*.3],group:11}),r.chain([[...T.add(E,[0,.01,0]),.085],[...T.add(E,[-.05,.17,L]),.045],[...b,.012]],h.HAT,{group:11,paint:A=>A[1]<E[1]+.045?h.MAGIC:void 0}),r.ell([.02,.005,0],[.2,.005,.12],h.NOSE,{group:0}),r.anchors.hand=w,r.anchors.hatTip=b,r}function Kh({frame:n=0,lean:e=!1,pose:t}={}){if(t==="fast")return Ed(n);if(Ad[t])return Cd(t,n);const i=t==="rise",r=t==="descend",s=t==="brake",a=i||r||s,o=new Xe({blend:.03}),c=a?0:[0,.025,.045][n%3],l=a?0:[0,.015,-.01][n%3]+(e?.08:0),u=.42+c,f=i?.3:r?-.27:s?-.12:e?.1:0,d=Math.min(.1,Math.max(0,f)),p=a?[.02,.06][n%2]:[0,.03,.05][n%3],g=r?1:i?-.6:0;o.seg([-.5,u-l*2,0],[.62,u+l*3,0],.022,.018,h.BROOM,{group:2}),s?o.ell([-.56,u-.08,0],[.17,.07,.09],h.STRAW,{dir:[.55,1,0],group:3,paint:_=>_[1]<u-.18?h.MAGIC2:_[1]>u-.01?h.BROOM:void 0}):o.ell([-.62,u-l*2-.01,0],[.17,.07,.08],h.STRAW,{dir:[1,l,0],group:3,paint:_=>_[0]<-.72?h.MAGIC2:_[0]>-.5?h.BROOM:void 0});for(const _ of[-1,1]){const S=[-.04,u+.06,_*.07],w=s?[.18,u-.01,_*.14]:r?[.16,u-.05,_*.14]:i?[.06,u-.07,_*.14]:[.12+f*.5,u-.02,_*.14],E=s?_>0?[.44,u-.02+p,_*.13]:[.3,u-.16,_*.13]:r?[.2,u-.26,_*.13]:i?[-.1,u-.23,_*.13]:[.08+f,u-.2,_*.13];o.seg(S,w,.055,.045,h.JEANS,{group:_>0?6:4}),o.seg(w,E,.045,.04,h.JEANS,{group:_>0?6:4}),o.ell(T.add(E,[.05,-.02,0]),[.08,.04,.045],h.SHOES,{group:_>0?6:4,paint:L=>L[1]<E[1]-.04?h.BELLY:void 0})}o.ell([-.04,u+.08,0],[.11,.07,.1],h.JEANS,{group:1});const v=[0+f*.8,u+.26-Math.abs(f)*.3,0];o.ell(v,[.1,.16,.11],h.JACKET,{dir:[f*2.5,1,0],up:[-1,0,0],group:1,paint:_=>_[0]>v[0]+.04&&Math.abs(_[2])<.055?h.TOP:void 0}),s?o.chain([[...T.add(v,[-.08,-.06,0]),.07],[...T.add(v,[-.02,.12+p,.02]),.05],[...T.add(v,[.14,.18+p,.03]),.025]],h.JACKET,{group:12}):a&&o.chain([[...T.add(v,[-.08,-.1,0]),.07],[...T.add(v,[-.2,-.12+g*(.08+p),0]),.05],[...T.add(v,[-.3,-.12+g*(.16+p*1.5),.02]),.025]],h.JACKET,{group:12});const x=T.add(v,[.03+f*.5,.26,0]),m=T.add(x,[s?.05:r?-.01:-.03,s?.06:.1,0]);for(const _ of[-1,1]){const S=T.add(v,[.01,.11,_*.11]),w=r&&_>0?T.add(m,[.1,.01,.1]):s?[.3,u+.03,_*.05]:[.26+f,u+.03,_*.05],E=r&&_>0?T.add(S,[.1,.02,.1]):T.lerp(S,w,.5);o.seg(S,E,.04,.035,h.JACKET,{group:_>0?7:5}),o.seg(E,w,.035,.03,h.JACKET,{group:_>0?7:5}),o.ell(w,[.035,.03,.035],h.SKIN,{group:_>0?7:5})}o.ell(x,[.11,.115,.1],h.SKIN,{group:8,paint:_=>_[0]<x[0]-.01||_[1]>x[1]+.075?h.HAIR:void 0});for(const _ of[-1,1])o.ell(Xe.surface(x,[.11,.115,.1],T.norm([.85,.05,_*.45])),[.016,.026,.016],h.EYE,{group:8});s?o.chain([[...T.add(x,[-.06,.06,0]),.06],[...T.add(x,[.04,.13+p,.03]),.045],[...T.add(x,[.2,.08+p,.04]),.02]],h.HAIR,{group:9}):o.chain([[...T.add(x,[-.06,.02,0]),.06],[...T.add(x,[-.18-d,-.05+p+g*.1,.02]),.045],[...T.add(x,[-.3-d*1.5,-.08+p*1.6+g*.22,.03]),.02]],h.HAIR,{group:9});for(const _ of[-1,1])o.ell(T.add(x,[-.015,0,_*.105]),[.05,.055,.03],h.PHONES,{group:10});o.chain([[...T.add(x,[-.005,.03,-.095]),.015],[...T.add(x,[-.005,.11,-.05]),.015],[...T.add(x,[-.005,.125,0]),.015],[...T.add(x,[-.005,.11,.05]),.015],[...T.add(x,[-.005,.03,.095]),.015]],h.PHONES,{group:10});const M=i?.1:0;if(o.ell(m,[.16,.014,.15],h.HAT,{dir:s?[1,-.55,0]:[1,.25+M*3,0],group:11}),o.chain(s?[[...T.add(m,[0,.01,0]),.085],[...T.add(m,[.06,.16,0]),.045],[...T.add(m,[.2,.22+p*.5,0]),.012]]:[[...T.add(m,[0,.01,0]),.085],[...T.add(m,[-.05-d-M*.5,.17-M*.3,0]),.045],[...T.add(m,[-.16-d*1.5-M,.27+p*.5-M*.5,0]),.012]],h.HAT,{group:11,paint:_=>_[1]<m[1]+.045?h.MAGIC:void 0}),a){const _=wd[t]+(s?[0,.06][n%2]:0),S=Math.cos(_),w=Math.sin(_),E=[0,u,0],L=C=>[E[0]+(C[0]-E[0])*S-(C[1]-E[1])*w,E[1]+(C[0]-E[0])*w+(C[1]-E[1])*S,C[2]],b=C=>[E[0]+(C[0]-E[0])*S+(C[1]-E[1])*w,E[1]-(C[0]-E[0])*w+(C[1]-E[1])*S,C[2]],A=C=>[C[0]*S-C[1]*w,C[0]*w+C[1]*S,C[2]];for(const C of o.parts)if(C.type==="ell"?(C.c=L(C.c),C.axes=C.axes.map(A)):(C.a=L(C.a),C.b=L(C.b)),C.paint){const N=C.paint;C.paint=(U,D)=>N(b(U),D)}for(const C of o.flats)C.c=L(C.c),C.u=A(C.u),C.v=A(C.v);const P=Math.min(...o.parts.map(C=>C.type==="ell"?C.c[1]-Math.max(...C.r):Math.min(C.a[1]-C.r1,C.b[1]-C.r2)));if(P<.08)for(const C of o.parts){const N=.08-P;C.type==="ell"?C.c=[C.c[0],C.c[1]+N,C.c[2]]:(C.a=[C.a[0],C.a[1]+N,C.a[2]],C.b=[C.b[0],C.b[1]+N,C.b[2]])}if(s){const C=L([-.45,u-.24,0]);for(let N=0;N<5;N++){const U=N+n*.5,D=.055-N*.008;o.ell([C[0]+.1+U*.08,Math.max(.04,C[1]-.02+Math.sin(U*1.9)*.04),Math.cos(U*1.3)*.06],[D,D*.8,D],N<2?h.BELLY:N%2?h.MAGIC:h.MAGIC2,{group:25+N,extra:!0})}}if(i){const C=L([-.8,u,0]);for(let N=0;N<5;N++){const U=N+n*.5,D=.05-N*.007;o.ell([C[0]-.02+Math.sin(U*2.1)*.06,Math.max(.04,C[1]-.08-U*.09),Math.cos(U*1.7)*.05],[D,D,D],N%2?h.MAGIC:h.MAGIC2,{group:20+N,extra:!0})}}}return o.ell([.02,.005,0],[.2,.005,.12],h.NOSE,{group:0}),o}const Dl=(n={})=>Math.round((n.size||8)*Math.sqrt(n.growth||20)*(2/(n.pixel||3))*1.9),Xa=new Map,qh=n=>(Xa.has(n)||Xa.set(n,Tn(Kh({frame:0}),{height:n}).s),Xa.get(n)),Ld=(n={})=>qh(Dl(n));function Pd(n={},{frame:e=0,lean:t=!1,facing:i="towards",pose:r}={}){const s=Dl(n),a=Kh({frame:e,lean:t,pose:r}),{sp:o,project:c}=r?Tn(a,{scale:qh(s),facing:i}):Tn(a,{height:s,facing:i});a.anchors.hand&&(o.anchors={hand:c(a.anchors.hand),hatTip:c(a.anchors.hatTip)});let l=0;for(let u=0;u<400&&l<6;u++){const f=u*37%o.w,d=u*53%Math.floor(o.h*.8);o.get(f,d)||o.get(f+1,d)||o.get(f-1,d)||o.get(f,d+1)||o.get(f,d-1)||(f*7+d*13+e*5)%11||(o.px(f,d,h.MAGIC2),l++)}return o}const at=(n,e=0)=>{const t=Math.sin(n*127.1+e*311.7)*43758.5453;return t-Math.floor(t)},yr=n=>{const e=at(Math.floor(n[0]*14)+Math.floor(n[2]*14)*13,Math.floor(n[1]*6));return e<.14?h.BARKD:e>.88?h.BARKL:void 0},Dd=n=>e=>{const t=at(Math.floor(e[0]*10),Math.floor(e[1]*10)+Math.floor(e[2]*10)*7);return e[1]<n[1]-.2||t<.2?h.LEAF3:t>.8?h.LEAF2:void 0},li=(n,e,t,i,r=!0)=>n.ell(e,t,h.STONE,{group:i,rough:.025,paint:s=>s[1]>e[1]+t[1]*.45&&r?h.MOSS:Math.abs(Math.sin(s[0]*13+s[2]*7))<.06?h.STONED:void 0}),bs=(n,e,t,i)=>n.ell(e,t,h.LEAF,{group:i,rough:.04,paint:Dd(e)}),tn=(n,e,t)=>n.chain(e,h.TRUNK,{group:t,rough:.012,paint:yr}),ys=(n,e,t,i,r,s=.3,a=h.LEAF2)=>{for(let o=0;o<e;o++){const c=at(r,o)*6.283,l=t*Math.sqrt(at(o,r)),u=Math.cos(c)*l,f=Math.sin(c)*l*.7;n.ell([u,s*.3,f],[.07,s*(.35+at(o,4)*.3),.07],a,{group:i+o%3,paint:d=>d[1]>s*.45?h.LEAF:void 0})}},ws=(n,e,t,i)=>n.ell(e,[t[0],.015,t[1]],h.WATER,{group:i}),Id={"sleeping-giant"(n){const e=t=>i=>{const r=at(Math.floor(i[0]*8),Math.floor(i[2]*8)+Math.floor(i[1]*8)*5);return r<.15?h.LEAF3:r>.86?h.LEAF2:void 0};for(const[t,i]of[[[.85,.42,0],[.7,.5,.66]],[[0,.3,0],[.62,.36,.6]],[[-.8,.3,0],[.56,.36,.62]],[[1.85,.5,.02],[.5,.5,.48]],[[-1.55,.72,.3],[.38,.5,.3]],[[-1.55,.72,-.3],[.38,.5,.3]],[[-2.2,.3,.32],[.42,.3,.26]],[[-2.2,.3,-.32],[.42,.3,.26]],[[.6,.2,.78],[.75,.2,.2]],[[.6,.2,-.78],[.75,.2,.2]]])n.ell(t,i,h.MOSS,{group:1,rough:.03,paint:e()});li(n,[2.25,.75,.12],[.13,.15,.11],2,!1);for(const t of[-.12,.22])n.ell([2.12,.88,t],[.08,.04,.07],h.STONED,{group:3});li(n,[-.2,.16,.95],[.2,.15,.18],4),li(n,[-.2,.16,-.95],[.18,.14,.16],5),n.ell([2,.95,.02],[.42,.14,.4],h.LEAF3,{group:6,rough:.03}),ys(n,26,2.8,10,3,.3)},"fern-grotto"(n){n.ell([0,.16,0],[.78,.2,.72],h.STONE,{group:1,rough:.015,paint:e=>e[1]>.3?h.MOSS:void 0}),ws(n,[0,.345,0],[.55,.5],2);for(let e=0;e<6;e++){const t=e/6*Math.PI*2+.4,i=1.5+at(e)*.3,r=[Math.cos(t)*i,0,Math.sin(t)*i*.8],s=1.1+at(e,2)*.7,a=T.add(r,[0,s,0]);n.seg(r,a,.12,.09,h.TRUNK,{group:3+e,rough:.02,paint:yr});for(let o=0;o<7;o++){const c=o/7*Math.PI*2+e,l=[Math.cos(c),0,Math.sin(c)];n.chain([[...a,.05],[...T.add(a,T.add(T.mul(l,.45),[0,.18,0])),.04],[...T.add(a,T.add(T.mul(l,.9),[0,-.15,0])),.015]],o%2?h.LEAF:h.LEAF2,{group:10+e})}}for(let e=0;e<5;e++){const t=e*1.3;li(n,[Math.cos(t)*.95,.08,Math.sin(t)*.95],[.16,.12,.14],20+e)}},"sunken-boat"(n){ws(n,[.3,.01,.15],[1.9,1.15],1);const e=[0,.12,0],t=T.norm([1,.28,.12]);n.ell(e,[1.3,.45,.55],h.WOOD,{dir:t,group:2,paint:i=>(T.dot(T.sub(i,e),[0,1,0])*9+9)%1<.14?h.BARKD:i[1]>.35&&at(Math.floor(i[0]*9))<.4?h.MOSS:void 0}),n.ell(T.add(e,[0,.14,0]),[1.2,.4,.47],h.BARKD,{dir:t,group:2,cut:!0});for(let i=-2;i<=2;i++)n.seg(T.add(e,T.add(T.mul(t,i*.4),[0,.1,-.42])),T.add(e,T.add(T.mul(t,i*.4),[0,.1,.42])),.04,.04,h.WOOD,{group:3});n.seg([-.9,.05,.7],[.3,1,.55],.03,.03,h.WOOD,{group:4}),n.box([-.98,.06,.72],[.2,.02,.07],h.WOOD,{dir:[1.2,-.8,-.15],group:4}),ys(n,18,2.2,10,5,.45)},"bramble-wagon"(n){const e=T.norm([1,-.12,0]);n.box([0,.62,0],[1.1,.22,.52],h.WOOD,{dir:e,round:.04,group:1,paint:t=>(t[0]+3)*4%1<.08?h.BARKD:void 0}),n.box([0,.72,0],[1,.2,.43],h.BARKD,{dir:e,group:1,cut:!0});for(const[t,i,r,s]of[[-.72,.55,.4,.4],[-.72,-.55,.4,.4],[.72,-.55,.32,.37]])n.ell([t,r,i],[s,s,.06],h.WOOD,{group:2+(t>0?1:0)+(i>0?2:0),paint:a=>{const o=a[0]-t,c=a[1]-r,l=Math.hypot(o,c),u=Math.atan2(c,o);return l>s*.82||l<s*.18?h.BARKD:Math.abs(Math.sin(u*4))<.2?h.WOOD:h.NOSE}});n.ell([.95,.1,.75],[.37,.06,.37],h.WOOD,{group:7,paint:t=>Math.hypot(t[0]-.95,t[2]-.75)>.3?h.BARKD:void 0});for(const t of[-.3,.3])n.seg([1.05,.55,t],[1.9,.05,t*1.4],.04,.035,h.WOOD,{group:8});for(let t=0;t<14;t++){const i=at(t,1)*6.283,r=Math.cos(i)*1.5,s=Math.sin(i)*.9,a=[[r,0,s,.03]];for(let o=1;o<4;o++)a.push([r*(1-o*.28)+(at(t,o)-.5)*.5,.25+o*.25+at(o,t)*.2,s*(1-o*.3)+(at(o,t*3)-.5)*.4,.025-o*.004]);if(n.chain(a,h.BARKD,{group:10+t%3}),t%2===0){const o=a[3];n.ell([o[0],o[1],o[2]],[.18,.13,.16],h.LEAF,{group:14,rough:.03,paint:c=>at(Math.floor(c[0]*30),Math.floor(c[1]*30))<.1?h.ACCENT:void 0})}}},"beehive-tree"(n){for(const[t,i,r]of[[-.2,0,-.25],[.15,-.1,.2],[0,.15,.05]])tn(n,[[t,0,i,.22],[t+r*.8,1.4,i,.16],[t+r*2,2.8,i-.1,.08]],1);for(const[t,i]of[[[-.6,2.9,-.2],[.9,.6,.7]],[[.6,3,-.2],[.85,.6,.7]],[[0,3.4,-.3],[.9,.55,.7]]])bs(n,t,i,3);tn(n,[[.2,1.9,-.05,.08],[.75,2.05,.15,.05]],2);const e=[.72,1.6,.2];n.ell(e,[.24,.42,.22],h.STRAW,{group:4,paint:t=>{const i=Math.floor((t[1]-e[1])*14),r=Math.floor(Math.atan2(t[2]-e[2],t[0]-e[0])*3+i%2*.5);return at(i,r)<.3?h.BARK2:void 0}}),n.seg([.75,2.02,.15],[.72,1.9,.2],.05,.1,h.STRAW,{group:4});for(let t=0;t<6;t++){const i=t*1.9;n.ell([e[0]+Math.cos(i)*.45,e[1]+Math.sin(t*2.3)*.35,e[2]+Math.sin(i)*.35],[.03,.025,.03],h.MAGIC,{group:20+t,extra:!0})}},"fairy-ring"(n){n.ell([0,.005,0],[1.9,.005,1.5],h.LEAF3,{group:0});for(let e=0;e<9;e++){const t=e/9*Math.PI*2,i=[Math.cos(t)*1.6,0,Math.sin(t)*1.25],r=.35+at(e)*.35;n.box(T.add(i,[0,r/2,0]),[.13,r/2,.1],h.STONE,{dir:[-Math.sin(t),0,Math.cos(t)],round:.05,rough:.015,group:1+e,paint:a=>e===2&&Math.abs(a[1]-r*.55)<r*.22&&Math.abs(a[0]-i[0]-0)<.05?h.RUNE:a[1]>r*.85?h.MOSS:void 0});const s=T.add(i,[Math.cos(t+.35)*.25,0,Math.sin(t+.35)*.2]);n.seg(s,T.add(s,[0,.16,0]),.035,.03,h.CLOTH,{group:12}),n.ell(T.add(s,[0,.18,0]),[.1,.06,.1],h.ACCENT,{group:13,paint:a=>at(Math.floor(a[0]*60),Math.floor(a[2]*60))<.15?h.BELLY:void 0})}},"charcoal-hut"(n){const e=[0,2,0];for(let i=0;i<20;i++){const r=i/20*Math.PI*2;Math.abs(r-1.2)<.35||n.seg([Math.cos(r)*.95,0,Math.sin(r)*.8],T.add(e,[Math.cos(r)*.08,.1+at(i)*.25,Math.sin(r)*.08]),.05,.03,i%3?h.TRUNK:h.BARKD,{group:1+i%2})}n.ell([0,.6,0],[.85,.6,.7],h.BARKD,{group:3});const t=[1.7,0,.3];n.ell(t,[.85,.42,.7],h.BARKD,{group:4,rough:.03,paint:i=>at(Math.floor(i[0]*14),Math.floor(i[2]*14)+Math.floor(i[1]*14))<.07?h.GLOW:i[1]>.3?h.SHADES:void 0});for(let i=0;i<4;i++)n.seg([-1.4,.1+i*.14,-.5+i%2*.05],[-1.4,.1+i*.14,.5],.07,.07,h.TRUNK,{group:5+i%2,paint:r=>Math.abs(r[2])>.46?h.BARKL:void 0})},"root-arch"(n){tn(n,[[-1.8,0,.1,.4],[-1.4,1.2,0,.34],[-.4,2.3,-.1,.3],[.6,2.4,0,.28],[1.5,1.4,.1,.32],[1.9,0,.15,.38]],1),tn(n,[[-1.4,0,-.6,.28],[-.6,1.6,-.5,.22],[.5,1.9,-.45,.2],[1.3,.9,-.4,.22],[1.5,0,-.35,.26]],2),tn(n,[[-1.8,.2,.1,.3],[-2.4,.05,.5,.12]],1),tn(n,[[1.9,.2,.15,.3],[2.5,.05,.55,.12]],1);for(const[e,t]of[[[-.2,2.6,-.2],[.7,.35,.5]],[[.8,2.5,-.25],[.55,.3,.45]]])bs(n,e,t,4);for(let e=0;e<4;e++)li(n,[-.7+e*.45,.12,(at(e)-.5)*.5],[.22,.18,.2],6+e);n.box([0,.35,-.2],[.16,.35,.08],h.STONE,{round:.05,rough:.01,group:11,paint:e=>Math.abs(e[1]-.4)<.14&&Math.abs(e[0])<.05?h.MAGIC:e[1]>.62?h.MOSS:void 0})},"turf-hut"(n){n.box([0,.55,0],[1,.55,.7],h.WOOD,{round:.04,group:1,paint:e=>e[1]*7%1<.18?h.BARKD:e[2]>.66&&Math.abs(e[0]+.2)<.2&&e[1]<.85?h.NOSE:e[2]>.66&&Math.abs(e[0]-.5)<.14&&Math.abs(e[1]-.7)<.12?h.SHADES:void 0});for(const e of[-1,1])n.box([0,1.3,e*.4],[1.15,.05,.5],h.MOSS,{dir:[1,0,0],up:[0,1,-e*.75],round:.03,group:2,paint:t=>at(Math.floor(t[0]*12),Math.floor(t[2]*12))<.25?h.LEAF2:void 0});n.seg([.65,1.2,-.3],[.65,1.9,-.3],.15,.13,h.STONE,{group:3,rough:.015});for(let e=0;e<5;e++)li(n,[-1.4+e*.7,.12,.9+at(e)*.3],[.2,.15,.18],4+e);ys(n,16,1.8,10,9,.25)},"heron-rookery"(n){tn(n,[[0,0,0,.25],[.4,1.4,0,.18],[.9,2.8,-.1,.12],[1.3,3.8,-.2,.06]],1);const e=[[[.6,2,-.05],[-.3,2,-.1]],[[1,3,-.1],[1.8,2.9,0]],[[1.25,3.6,-.2],[.6,3.7,-.3]]];e.forEach(([r,s],a)=>{tn(n,[[...r,.07],[...s,.04]],2),n.ell(T.add(s,[0,.08,0]),[.34,.13,.3],h.BARK2,{group:3+a,rough:.025,paint:o=>Math.abs(Math.sin(o[0]*30+o[2]*20))<.25?h.STRAW:o[1]<s[1]+.02?h.BARKD:void 0})});for(const[r,s]of[[[1.2,4,-.4],[.6,.4,.45]],[[.3,3.1,-.5],[.45,.3,.35]],[[1.9,3.3,-.4],[.4,.3,.35]]])bs(n,r,s,7);const t=T.add(e[1][1],[0,.42,.05]),i=1.6;n.ell(t,[.18*i,.1*i,.09*i],h.BELLY,{dir:[1,.3,0],group:10,paint:r=>r[1]>t[1]+.06?h.STONE:void 0}),n.chain([[...T.add(t,[.12*i,.06*i,0]),.035*i],[...T.add(t,[.2*i,.22*i,0]),.03*i],[...T.add(t,[.16*i,.32*i,0]),.04*i]],h.BELLY,{group:10}),n.seg(T.add(t,[.18*i,.33*i,0]),T.add(t,[.36*i,.3*i,0]),.015*i,.005*i,h.BODY2,{group:11});for(const r of[-.04,.04])n.seg(T.add(t,[0,-.06*i,r]),T.add(t,[.02,-.42,r]),.012,.012,h.BARKD,{group:12})},sundial(n){n.ell([0,.07,0],[1.05,.09,1],h.STONE,{group:1,rough:.01}),n.ell([0,.2,0],[.72,.09,.68],h.STONE,{group:2,rough:.01,paint:e=>e[1]>.26&&at(Math.floor(e[0]*8),Math.floor(e[2]*8))<.3?h.MOSS:void 0}),n.seg([0,.28,0],[0,.95,0],.16,.13,h.STONE,{group:3,paint:e=>Math.abs(Math.sin(e[1]*30))<.15?h.STONED:void 0}),n.ell([0,1,0],[.38,.04,.38],h.FRAME,{group:4,paint:e=>{const t=Math.atan2(e[2],e[0]);return Math.abs(Math.sin(t*6))<.12&&Math.hypot(e[0],e[2])>.26?h.BARKD:void 0}}),n.box([0,1.12,0],[.2,.1,.01],h.FRAME,{dir:[1,-.5,0],round:.005,group:5});for(let e=0;e<22;e++){const t=e/22*Math.PI*2,i=1.25+at(e)*.2,r=[Math.cos(t)*i,0,Math.sin(t)*i*.85];n.seg(r,T.add(r,[0,.18,0]),.015,.012,h.LEAF2,{group:6}),n.ell(T.add(r,[0,.2,0]),[.05,.04,.05],[h.FLOWER,h.BELLY,h.ACCENT][e%3],{group:7})}},"bear-den"(n){const e=[0,.3,-.2];n.ell(e,[1.7,1.15,1.25],h.LEAF,{group:1,rough:.05,paint:t=>{const i=at(Math.floor(t[0]*16),Math.floor(t[1]*16)+Math.floor(t[2]*16)*3);return i<.06?h.ACCENT:i<.2?h.BARKD:t[1]<.4?h.LEAF3:i>.85?h.LEAF2:void 0}}),n.ell([.35,.35,.95],[.5,.55,.4],h.NOSE,{group:1,cut:!0}),n.seg([2,0,.5],[2,.65,.5],.3,.27,h.TRUNK,{group:3,paint:t=>t[1]>.6?h.BARKL:Math.abs(Math.sin(Math.atan2(t[2]-.5,t[0]-2)*3))<.12&&t[1]>.2?h.BARKD:void 0})},"stilt-hut"(n){ws(n,[0,.01,.1],[2.1,1.3],1);for(const[e,t]of[[-.75,-.55],[.75,-.55],[-.75,.55],[.75,.55]])n.seg([e,0,t],[e,1.05,t],.07,.06,h.WOOD,{group:2,paint:i=>i[1]<.15?h.MOSS:void 0});n.box([0,1.1,0],[1.05,.05,.8],h.WOOD,{round:.02,group:3,paint:e=>(e[0]+3)*6%1<.12?h.BARKD:void 0}),n.box([-.1,1.6,-.1],[.7,.45,.55],h.WOOD,{round:.03,group:4,paint:e=>e[2]>.4&&Math.abs(e[0]-.1)<.18&&e[1]<1.85?h.NOSE:void 0});for(const[e,t]of[[2.1,.92],[2.35,.72],[2.58,.48],[2.76,.24]])n.ell([-.1,e,-.1],[t,.16,t*.85],h.STRAW,{group:5,paint:i=>Math.abs(Math.sin(Math.atan2(i[2]+.1,i[0]+.1)*18))<.25?h.BARK2:void 0});for(const e of[.72,.95])n.seg([.9,1.1,e],[1.15,0,e],.02,.02,h.WOOD,{group:6});for(let e=0;e<4;e++)n.seg([.92+e*.06,1-e*.26,.72],[.92+e*.06,1-e*.26,.95],.02,.02,h.WOOD,{group:6});for(let e=0;e<26;e++){const t=at(e,7)*6.283,i=1.5+at(e,8)*.7,r=[Math.cos(t)*i,0,Math.sin(t)*i*.7],s=.5+at(e,9)*.5;n.seg(r,T.add(r,[0,s,0]),.028,.02,h.LEAF2,{group:10+e%3}),e%3===0&&n.ell(T.add(r,[0,s-.05,0]),[.025,.07,.025],h.BARKD,{group:13})}},"bog-shrine"(n){ws(n,[.6,.01,.4],[1.4,.9],1),n.seg([0,0,0],[0,1.9,0],.2,.17,h.TRUNK,{group:2,rough:.01,paint:e=>{const t=e[1];return e[2]>.12&&(Math.abs(t-1.6)<.05&&Math.abs(Math.abs(e[0])-.08)<.05||Math.abs(t-1.38)<.04&&Math.abs(e[0])<.1)||t*5%1<.07?h.BARKD:e[1]>1.85?h.MOSS:void 0}}),n.ell([0,1.95,0],[.24,.1,.24],h.MOSS,{group:3});for(let e=0;e<6;e++){const t=e/6*Math.PI*2;n.seg([Math.cos(t)*1,0,Math.sin(t)*.8],[Math.cos(t)*1,.35+at(e)*.25,Math.sin(t)*.8],.05,.04,h.TRUNK,{group:4})}n.ell([-.25,.06,.3],[.14,.07,.13],h.EAR,{group:5}),li(n,[.3,.07,.3],[.09,.07,.08],6,!1),li(n,[.15,.05,.42],[.06,.05,.06],7,!1);for(const[e,t,i]of[[.9,.9,.5],[1.4,1.2,.1],[.4,1.4,.8]])n.ell([e,t,i],[.06,.07,.06],h.MAGIC,{group:20+e*10,extra:!0,paint:r=>Math.hypot(r[0]-e,r[1]-t)<.03?h.MAGIC2:void 0});ys(n,20,2,10,11,.3,h.WEB)},"raven-tree"(n){tn(n,[[0,0,0,.3],[.1,1.3,0,.22],[-.1,2.5,-.1,.16],[.1,3.6,-.15,.07]],1),[[[.1,1.6,0],[1.3,2.3,.1],[1.8,2.2,.1]],[[-.05,2.1,-.05],[-1.2,2.8,-.1],[-1.6,3.2,-.1]],[[0,2.9,-.1],[.8,3.5,-.2]]].forEach((r,s)=>tn(n,r.map((a,o)=>[...a,.12-o*.04]),2+s)),tn(n,[[-.1,.5,0,.22],[-1.1,.1,.5,.08]],5),tn(n,[[.1,.4,0,.2],[.9,.05,-.4,.08]],5);const t=(r,s)=>{n.ell(r,[.12,.07,.06],h.SHADES,{dir:[1,.2,0],group:s}),n.ell(T.add(r,[.11,.07,0]),[.05,.05,.045],h.SHADES,{group:s}),n.seg(T.add(r,[.15,.07,0]),T.add(r,[.22,.05,0]),.015,.004,h.BODY2,{group:s}),n.seg(T.add(r,[-.1,0,0]),T.add(r,[-.22,-.04,0]),.04,.015,h.SHADES,{group:s})};t([1.3,2.42,.1],10),t([-1.2,2.92,-.1],11),t([.8,3.62,-.2],12),t([-.05,3.72,-.15],13);const i=[1.55,1.45,.1];n.seg([1.55,2.25,.1],T.add(i,[0,.3,0]),.01,.01,h.FRAME,{group:14});for(let r=0;r<6;r++){const s=r/6*Math.PI*2;n.seg(T.add(i,[Math.cos(s)*.2,-.25,Math.sin(s)*.2]),T.add(i,[Math.cos(s)*.12,.3,Math.sin(s)*.12]),.012,.012,h.FRAME,{group:14})}n.seg(T.add(i,[0,-.27,0]),T.add(i,[0,-.25,0]),.22,.22,h.FRAME,{group:14})},barrow(n){n.ell([0,0,-.2],[2.3,.95,1.3],h.LEAF2,{group:1,rough:.03,paint:e=>at(Math.floor(e[0]*10),Math.floor(e[2]*10)+Math.floor(e[1]*10))<.25?h.LEAF:void 0});for(const e of[-.35,.35])n.box([e,.45,.95],[.12,.45,.12],h.STONE,{round:.03,rough:.01,group:2});n.box([0,.95,.95],[.55,.1,.14],h.STONE,{round:.03,rough:.01,group:3,paint:e=>e[1]>1.02?h.MOSS:void 0}),n.box([0,.4,.9],[.23,.4,.3],h.NOSE,{group:1,cut:!0});for(const[e,t,i]of[[-1.6,1,.7],[1.7,.9,.55]])n.box([e,i/2,t],[.12,i/2,.09],h.STONE,{round:.04,rough:.01,group:4})},cairn(n){let e=0;for(let i=0;i<6;i++){const r=.9-i*.14,s=Math.max(3,9-i);for(let a=0;a<s;a++){const o=a/s*Math.PI*2+i;li(n,[Math.cos(o)*r*.8,e+.14,Math.sin(o)*r*.7],[.24-i*.02,.15,.2-i*.02],1+(i+a)%4,i<2)}e+=.26}const t=[0,e+.1,0];for(let i=0;i<6;i++){const r=i/6*Math.PI*2;n.seg(T.add(t,[Math.cos(r)*.12,0,Math.sin(r)*.12]),T.add(t,[Math.cos(r)*.3,.35,Math.sin(r)*.3]),.02,.02,h.FRAME,{group:6})}n.seg(T.add(t,[0,-.3,0]),t,.05,.05,h.FRAME,{group:6}),n.ell(T.add(t,[0,.14,0]),[.2,.07,.2],h.SHADES,{group:7})},"stump-throne"(n){n.ell([0,.28,0],[.92,.34,.86],h.TRUNK,{group:1,rough:.015,paint:yr}),n.ell([0,.58,0],[.84,.06,.78],h.BARKL,{group:1,paint:e=>Math.abs(Math.sin(Math.hypot(e[0],e[2])*30))<.3?h.BARK2:void 0}),n.box([-.55,1.15,0],[.18,.62,.62],h.TRUNK,{round:.1,rough:.01,group:2,paint:yr});for(const e of[-.6,.6])n.box([-.1,.72,e],[.45,.14,.12],h.TRUNK,{round:.06,group:3,paint:yr});for(let e=0;e<6;e++){const t=e/6*Math.PI*2+.3;tn(n,[[Math.cos(t)*.8,.25,Math.sin(t)*.8,.18],[Math.cos(t)*1.4,.02,Math.sin(t)*1.3,.06]],4)}n.seg([1.5,.18,.8],[1.5,.18,.2],.18,.18,h.TRUNK,{group:5,paint:e=>e[2]>.78||e[2]<.22?h.BARKL:yr(e)}),n.seg([1.5,.3,.5],[1.6,.75,.5],.025,.025,h.WOOD,{group:6}),n.box([1.5,.36,.5],[.1,.06,.015],h.FRAME,{group:6});for(let e=0;e<6;e++){const t=e<3?0:1,i=e%3;n.seg([-1.7+i*.3+t*.15,.15+t*.26,-.7],[-1.7+i*.3+t*.15,.15+t*.26,.2],.14,.14,h.TRUNK,{group:7+e%2,paint:r=>r[2]>.16||r[2]<-.66?h.BARKL:void 0})}},"swing-beech"(n){tn(n,[[0,0,-.3,.45],[0,1.6,-.3,.36],[-.1,2.8,-.4,.26]],1),tn(n,[[0,2.2,-.3,.2],[1,2.6,-.2,.14],[1.9,2.75,-.1,.08]],2),tn(n,[[-.05,2.5,-.35,.18],[-1.2,3,-.4,.1]],3);for(let e=0;e<5;e++){const t=e/5*Math.PI*2;tn(n,[[Math.cos(t)*.35,.3,-.3+Math.sin(t)*.3,.2],[Math.cos(t)*.9,.02,-.3+Math.sin(t)*.8,.07]],4)}for(const[e,t]of[[[0,3.4,-.6],[1.4,.8,1]],[[1.4,3.1,-.4],[.9,.55,.7]],[[-1.3,3.2,-.6],[.9,.6,.7]]])bs(n,e,t,5);for(const e of[-.12,.12])n.seg([1.3,2.65,e],[1.3,.55,e],.012,.012,h.STRAW,{group:6});n.box([1.3,.53,0],[.08,.025,.18],h.WOOD,{round:.01,group:6});for(let e=0;e<9;e++)n.ell([(at(e,1)-.5)*3,.05+at(e,2)*.5,(at(e,3)-.3)*1.6],[.022,.022,.022],h.MAGIC,{group:20+e,extra:!0})},bower(n){for(const t of[-.9,0,.9])for(const i of[-.6,.6])n.seg([t,0,i],[t,1.2,i],.04,.04,h.WOOD,{group:1});for(const t of[-.9,0,.9])n.chain([[t,1.2,-.6,.04],[t,1.62,-.3,.04],[t,1.72,0,.04],[t,1.62,.3,.04],[t,1.2,.6,.04]],h.WOOD,{group:2});for(const t of[-.6,.6])for(const i of[.5,1])n.seg([-.9,i,t],[.9,i,t],.025,.025,h.WOOD,{group:3});const e=t=>{const i=at(Math.floor(t[0]*26),Math.floor(t[1]*26)+Math.floor(t[2]*26)*3);return i<.12?h.BELLY:i<.2?h.STRAW:i>.85?h.LEAF2:void 0};for(const[t,i]of[[[-.6,1.6,0],[.6,.3,.75]],[[.5,1.65,0],[.65,.3,.75]],[[-.95,.9,-.55],[.25,.65,.25]],[[.95,.8,-.6],[.25,.55,.25]],[[-.9,.7,.62],[.22,.5,.2]],[[.2,1.3,-.65],[.5,.4,.2]]])n.ell(t,i,h.LEAF,{group:4,rough:.04,paint:e});n.box([0,.4,-.35],[.6,.04,.15],h.WOOD,{round:.02,group:5});for(const t of[-.5,.5])n.seg([t,0,-.35],[t,.38,-.35],.03,.03,h.WOOD,{group:5})}},$h={moor:["sleeping-giant","the sleeping giant, a moss mound like a figure lying on its back",1],"fern-forest":["fern-grotto","a ring of giant tree ferns round a stone basin",1],"muddy-forest":["sunken-boat","an old rowing boat sunk in the mud",1.15],"tangly-forest":["bramble-wagon","an old wagon wrapped in brambles",1.1],"wispy-forest":["beehive-tree","a many-trunked tree with a great wild honeycomb",1],"hazel-forest":["fairy-ring","a ring of fairy stones and toadstools",1.1],"twiggy-forest":["charcoal-hut","a charcoal burner's hut of sticks, its mound smouldering",1],ancient:["root-arch","a great arch of roots over mossy stones",1.1],norway:["turf-hut","a log cabin with a turf roof",1.15],"alder-forest":["heron-rookery","an alder holding herons' stick nests",1],meadow:["sundial","a moonlit sundial on a stone dais in a ring of flowers",1.2],"berry-thicket":["bear-den","a bear's den in a bramble mound",1.1],wetland:["stilt-hut","a fisher's hut on stilts over a pool",1.1],bog:["bog-shrine","a carved post shrine to the bog, will-o'-wisps over the pool",1.1],deadwood:["raven-tree","a dead tree where the ravens gather",1],grassland:["barrow","a barrow with a stone doorway",1],heath:["cairn","a tall cairn with an old beacon basket",1.4],"old-pinewood":["stump-throne","a woodcutter's stump throne",1.1],"bluebell-glade":["swing-beech","a great beech with a rope swing, glowworms beneath",1],"honeysuckle-tangle":["bower","a honeysuckle bower with a bench",1.2]};function Nd(n,e){const t=n.leaf,i=e.trunkHue??.07;return{[h.TRUNK]:ge(i,.45,.36),[h.BARKD]:ge(i+.03,.5,.17),[h.BARKL]:ge(i,.35,.55),[h.BARK2]:ge(i+.02,.45,.26),[h.LEAF]:ge(t,.55,.45),[h.LEAF2]:ge(t-.03,.5,.62),[h.LEAF3]:ge(t+.03,.6,.26),[h.STONE]:[122,120,128],[h.STONED]:[62,60,70],[h.MOSS]:ge(.26,.45,.45),[h.WOOD]:[128,92,58],[h.STRAW]:[190,162,104],[h.CLOTH]:[228,220,200],[h.EAR]:[168,96,66],[h.FRAME]:[150,128,84],[h.SHADES]:[30,28,36],[h.ACCENT]:[196,40,52],[h.BELLY]:[232,228,214],[h.BODY2]:[210,170,60],[h.FLOWER]:[180,140,230],[h.WEB]:[228,228,234],[h.WATER]:[52,78,104],[h.NOSE]:[16,14,20],[h.GLOW]:[255,120,40],[h.MAGIC]:ge(e.magicHue??.45,.6,1),[h.MAGIC2]:ge(e.magicHue??.45,.2,1),[h.RUNE]:[120,230,255],[h.LINE]:[24,22,30]}}function Ud(n,e,t,i=16){const r=new Xe({blend:.05});Id[n](r),r.ell([0,.004,0],[.01,.004,.01],h.NOSE,{group:0});const s=(Object.values($h).find(([o])=>o===n)||[,,1])[2],{sp:a}=Tn(r,{scale:Ld(t)*s});return{sp:a,colours:Nd(e,t),metres:{width:+(a.w/i).toFixed(1),height:+(a.h/i).toFixed(1)}}}const Od=1.3,Fd=n=>[1,Math.sqrt(n.growth),Math.sqrt(n.growth)*Od,n.growth],$r=(n,e,t=1)=>Math.round(e.size*Fd(e)[Math.max(0,Math.min(3,n))]*(2/(e.pixel||2))*1.9*t),Il=(n,e)=>{const t=Ca(e);for(let i=0;i<9;i++){const r=Math.floor(ye(t,2,n.w-2)),s=Math.floor(ye(t,2,n.h*.6));if(!(n.get(r,s)||n.get(r+1,s)||n.get(r-1,s)||n.get(r,s+1)||n.get(r,s-1))&&(n.px(r,s,h.MAGIC2),i%3===0))for(const[a,o]of[[1,0],[-1,0],[0,1],[0,-1]])n.px(r+a,s+o,h.MAGIC)}};function Pa(n,e,t,i,r,s,a,o){const c=T.add(e,[-i*.7,i*(.75+r),t*i*.35]),l=T.norm(T.sub(c,e)),u=T.norm(T.sub([1,0,0],T.mul(l,T.dot([1,0,0],l)))),f=Math.hypot(...T.sub(c,e));n.flat(T.add(T.lerp(e,c,.5),T.mul(u,-i*.14)),l,u,f*.55,i*.34,Qi.wing(s,a),{group:o,extra:!0})}const Nl=(n,e,t=1)=>n===0?Math.round(Math.max(12,Math.min(30*Math.max(.75,Math.min(1.1,t)),$r(1,e)*t*.72))):n===2?Math.round(Math.max($r(1,e)*t*1.08,Math.min($r(2,e,t),$r(1,e)*1.4))):$r(n,e)*t;let na=null;function Bd(n,e){const t=na;na=n;try{return e()}finally{na=t}}const zd=(n,e)=>{const t=Math.atan2(e,n);return Math.hypot(n,e)<.55+.4*Math.pow(Math.abs(Math.cos(t*2.5+Math.PI/2)),3)},kd=(n,e)=>{const t=n*1.2,i=-e*1.2+.25;return Math.pow(t*t+i*i-.6,3)-t*t*i*i*i<0};function Ul(n){const e=na,t=n.anchors;if(!e)return;const i=t.head,r=i?Math.max(...i.r):.2;if(e.collar&&(t.neck||i)){const s=t.neck||{c:T.add(i.c,[-i.r[0]*.8,-i.r[1]*.4,0]),r:i.r[1]*.75,dir:T.norm([1,.4,0])},a=T.norm(s.dir),o=T.norm(T.cross(a,Math.abs(a[2])<.9?[0,0,1]:[1,0,0])),c=T.cross(a,o),l=[],u=Math.max(.03,s.r*.2);for(let v=0;v<=16;v++){const x=v/16*Math.PI*2,m=T.add(T.mul(o,Math.cos(x)),T.mul(c,Math.sin(x)));let M=0;for(;M<.8&&n.field(T.add(s.c,T.mul(m,M)))<0;)M+=.01;M>=.8&&(M=s.r),l.push([...T.add(s.c,T.mul(m,M+u*.7)),u])}n.chain(l,h.COLLAR,{group:60,extra:!0});const f=l.reduce((v,x)=>x[0]-x[1]*.6+x[2]*.5>v[0]-v[1]*.6+v[2]*.5?x:v),d=u*1.3*(s.tag||1),p=T.norm(T.add(T.norm(T.sub(f.slice(0,3),s.c)),[.3,-.5,.3]));let g=f.slice(0,3);for(let v=0;v<60&&n.field(g)<d*.4;v++)g=T.add(g,T.mul(p,.01));n.ell(g,[d,d,d*.6],h.COLLAR,{group:60,extra:!0})}if(e.hat!=null&&i){const s=Math.max(r,.13),a=i.top||T.add(Xe.surface(i.c,i.r,T.norm([-.15,1,.1])),[0,r*.1,0]),o=T.norm([.3,1,.35]),c=s*1.5,l=T.add(a,T.mul(o,c));n.seg(T.add(a,T.mul(o,-s*.1)),l,s*.48,s*.04,h.HAT1,{group:61,extra:!0,paint:u=>Math.floor(T.dot(T.sub(u,a),o)/(c/5)+10)%2?h.HAT2:void 0}),n.ell(l,[s*.17,s*.17,s*.17],h.POM,{group:61,extra:!0})}if(e.glasses&&t.eyes&&i){const[s,a]=t.eyes.pts,o=l=>T.add(l,T.mul(T.norm(T.sub(l,i.c)),t.eyes.size*.45)),c=Math.max(t.eyes.size*1.05,r*.1);if(e.glasses==="bar")n.seg(o(s),o(a),c,c,h.SHADES,{group:62,extra:!0}),n.ell(T.add(o(a),[c*.3,c*.5,c*.2]),[c*.25,c*.25,c*.25],h.GLINT,{group:62,extra:!0});else for(const l of[s,a]){const u=T.norm(T.sub(l,i.c)),f=T.norm(T.cross([0,1,0],u)),d=T.cross(u,f),p=e.glasses==="heart"?kd:zd,g=c*1.5;n.flat(o(l),f,d,g,g,(v,x)=>p(v,x)?p(v*1.3,x*1.3)?h.SHADES:h.FRAME:null,{group:62,bend:.1,extra:!0}),n.seg(o(s),o(a),c*.18,c*.18,h.FRAME,{group:62,extra:!0})}}if(e.shoes)for(const s of t.feet){const a=e.shoes==="platform",o=s.r,c=T.add(s.c,[o*.25,o*(a?.35:.15),0]);n.ell(c,[o*1.45,o*(a?1.2:.85),o*1.15],h.SHOE,{group:s.group,extra:!0,paint:l=>l[1]<c[1]-o*(a?.45:.4)?h.SOLE:e.shoes==="glitter"&&Yn(l,60,.28)?h.GLINT:void 0})}}function Gd(n,e,t,i,r="towards"){const s={legW:1,earS:1,hgt:1,bw:.3,...n.q},a=e===3,o=e===1,c=e===0,l=F=>a&&n.legend.includes(F),u=new Xe,f=s.hr*(c?1.75:o?1.25:1)*(i.head/.44)**.5,d=s.len*(c?.8:o?.9:1.02)*i.long,p=c?.55:o?.9:1.04,g=t?-.04:0,v=1+g,x=s.chest*(a?1.06:1)/p+g,m=s.tuck/p+g,M=s.bw*(c?1.15:e>=2?1.06:1)*(s.legW>1.2?1.15:1),_=.06*s.legW*(a?1.1:c?1.7:1),S=s.back==="hump"?.1:0,w=s.back==="arch"?.1:0,E=x+.12,L=F=>{if(s.belly&&F[1]<E&&F[0]>-d*.5)return h.BELLY;if(s.saddle&&F[1]>v-.18&&F[0]<d*.55)return h.BODY2;if(s.spots&&F[1]>x+.1&&Yn(F,10,.22))return s.spotMat==="belly"||s.spots==="young"&&o?h.BELLY:s.spots==="young"?void 0:h.BODY3;if(s.ridge&&F[1]>v-.08+S*.5)return h.BODY3};if(u.ell([d*.48,(v+x)/2+S*.5,0],[d*.62,(v-x)/2+S*.5,M],h.BODY,{paint:L}),u.ell([-d*.5,(v+m)/2+w*.6,0],[d*.58,(v-m)/2+w*.6,M*.93],h.BODY,{paint:L}),u.ell([0,(v+(x+m)/2)/2+.02,0],[d*.6,(v-(x+m)/2)/2,M*.9],h.BODY,{paint:L}),s.ridge)for(let F=0;F<(a?16:10);F++){const ne=-d*.8+F*d*1.75/(a?15:9),ce=(.07+(a?.04:0))*(1+.5*Math.max(0,ne/d));u.ell([ne,v+.02+S*Math.max(0,1-Math.abs(ne/d-.5)*2)+ce*.5,0],[ce,.03,M*.25],h.BODY3,{dir:[-.3,1,0],up:[1,0,0]})}if(s.wool)for(let F=0;F<14;F++){const ne=F/14*Math.PI*2;u.ell([d*Math.cos(ne)*.7,(v+x)/2+Math.sin(ne)*.2,M*(F%2?.5:-.5)],[.16,.14,.14],h.BODY)}const b=[.32,-.32][t],A=(F,ne)=>{const ce=ne*M*.62,be=F?d*.62:-d*.62,Ue=(F?1:-1)*ne*b,ke=F?x+.1:m+.15,ee=(F?ne:-ne)*(t?1:-1)>0?.06:0,se=[be+Math.sin(Ue)*.2+(F?.02:.1),Math.max(.3,ke*.55),ce],X=[be+Math.sin(Ue)*.42,.05+ee,ce],he=[be,ke+.12,ce*.8],ae=ne>0?s.legMat||h.BODY:s.legMat?h.BODY3:h.BODY2,Ee=F?[[...he,_*1.5],[...se,_*1.05],[...X,_*.9]]:[[...he,_*2*(s.haunch||1)],[...T.add(se,[-.12,.06,0]),_*1.2],[...T.add(X,[-.06*(s.hindFoot||1),.12,0]),_*.9],[...X,_*.9]];u.chain(Ee,ae,{group:ne>0?6+(F?1:0):2,paint:s.socks?Ce=>Ce[1]<s.socks?h.BODY3:void 0:void 0});const Je=(s.paw==="hoof"?.07:.09)*s.legW**.5*(F?1:s.hindFoot||1);u.ell(T.add(X,[Je*.5,-.01,0]),[Je,_*.9,_*1.1],s.paw==="hoof"?h.NOSE:ae,{group:ne>0?6+(F?1:0):2}),u.anchors.feet.push({c:T.add(X,[Je*.5,-.01,0]),r:Math.max(Je,_*1.1),group:ne>0?6+(F?1:0):2})};for(const F of[-1,1])A(!0,F),A(!1,F);const P=[d*.82,v-.12,0],C=[P[0]+Math.cos(s.neckAng)*s.neck*.9,P[1]+Math.sin(s.neckAng)*s.neck*.9+(c?.1:0),0];u.seg(P,C,s.neckW*.55,s.neckW*.42,h.BODY,{paint:F=>s.belly&&F[1]<(P[1]+C[1])/2-.05?h.BELLY:s.face==="dark"?h.BODY2:void 0});const N=F=>{if(s.face==="badger")return Math.abs(F[2])<f*.22+(F[0]-C[0])*.1||F[1]<C[1]-f*.1?h.BELLY:h.BODY3;if(s.face==="dark")return h.BODY2;if((s.belly||s.muzzle)&&F[1]<C[1]-f*.35)return h.BELLY};u.ell(C,[f*1.05,f*.92,f*.88],h.BODY,{paint:N});const U=f*s.snout*(c?.55:o?.78:1),D=f*s.snoutD*.55,O=[C[0]+f*.65+U*.5,C[1]-f*.28,0];u.ell(O,[U*.62+f*.2,D,D*.95],h.BODY,{dir:[1,-.25,0],paint:F=>(s.muzzle||s.belly)&&F[1]<O[1]-D*.1?h.BELLY:N(F)});const z=[O[0]+U*.62+f*.1,O[1]-.02,0];u.ell(z,[f*(s.disc?.1:.12),f*(s.disc?.2:.12),f*(s.disc?.2:.15)],h.NOSE,{group:1});for(const F of[-1,1]){const ne=Xe.surface(C,[f*1.05,f*.92,f*.88],T.norm([.75,.32,F*.62]));u.ell(ne,[f*.13,f*.16,f*.13].map(ce=>ce*(s.eyeK||1)*(c?1.5:o?1.2:1)),a&&!s.tusks?h.MAGIC2:h.EYE,{group:1})}u.anchors.head={c:C,r:[f*1.05,f*.92,f*.88],top:[C[0]-f*.1,C[1]+f*.82,0]},u.anchors.eyes={pts:[-1,1].map(F=>Xe.surface(C,[f*1.05,f*.92,f*.88],T.norm([.75,.32,F*.62]))),size:f*.16*(s.eyeK||1)*(c?1.5:o?1.2:1)},u.anchors.neck={c:T.lerp(P,C,c?.05:o?.25:.42),r:s.neckW*.5*(c?1.3:o?1.12:1),dir:T.norm(T.sub(C,P)),tag:c?1.8:o?1.3:1};for(const F of[-1,1]){const ne=s.ear,ce=[C[0]-f*.15,C[1]+f*.7,F*f*.5],be=s.earS*(c?1.2:1)*(s.ear==="long"?.62:1);if(ne==="none")continue;if(ne==="round"){u.ell(ce,[f*.22,f*.25*be,f*.1],h.BODY,{group:1,paint:Ee=>Ee[0]>ce[0]+f*.02?h.EAR:void 0});continue}const Ue=ne==="long",ke=ne==="small"?-.6:0,ee=f*.55*be*(ne==="big"?1.35:Ue?2.2:1),se=f*.3*(ne==="big"?1.2:Ue?1.35:1),X=T.norm([ke*.6-(Ue?.3:.12),1,F*.3]),he=T.norm([.55,.2,F]),ae=T.norm(T.cross(he,X));u.flat(T.add(ce,T.mul(X,ee)),ae,X,se,ee,Qi.ear(h.BODY,h.EAR,h.BODY3),{group:5+(F>0?0:20),extra:Ue}),ne==="tuft"&&u.seg(T.add(ce,[0,ee*1.4,F*.02]),T.add(ce,[0,ee*1.85,F*.04]),f*.05,f*.02,h.BODY3,{group:1})}const V=[-d*1.05,v-.1+w*.5,0],Q=t?.04:-.02;if(l("tails")||Hd(u,l("starTail")?"star":s.tail,V,d,v,Q),s.horns)for(const F of[-1,1]){const ne=o?.6:c?.35:l("hornsGlow")?1.4:1,ce=[];for(let be=0;be<=8;be++){const Ue=.3-be/8*Math.PI*1.6,ke=f*.65*ne*(1-.45*be/8);ce.push([C[0]-f*.1+Math.cos(Ue)*ke,C[1]+f*.45+Math.sin(Ue)*ke,F*(f*.6+be*.015)]),ce[be].push(f*.2*ne*(1-.6*be/8))}u.chain(ce,l("hornsGlow")?h.MAGIC:h.ACCENT,{group:13})}if(s.antlers||l("jackalope"))for(const F of[-1,1])Wd(u,s,[C[0]-f*.05,C[1]+f*.75,F*f*.4],F,e,l);if(s.tusks)for(const F of[-1,1]){const ne=o?.4:c?0:l("tusksBig")?1.3:.75;if(!ne)continue;const ce=[O[0]+U*.25,O[1]-D*.4,F*D*.8];u.chain([[...ce,.045*ne],[...T.add(ce,[.1*ne,.1*ne,F*.03]),.04*ne],[...T.add(ce,[.06*ne,.24*ne,F*.05]),.02*ne]],h.ACCENT,{group:8})}s.teeth&&!c&&u.ell([z[0]-f*.1,z[1]-f*.25,0],[f*.08,f*.14,f*.12],h.ACCENT,{group:1});const Y=F=>[-d*.9+F*d*1.65,v+S*Math.max(0,1-Math.abs(F-.8)*3)+w*(1-Math.abs(F-.4)*2),0];if(l("wings"))for(const F of[-1,1])Pa(u,[d*.2,v,F*M*.5],F,1.15,t?.1:0,F>0?h.MAGIC2:h.MAGIC,h.MAGIC,40+(F>0?10:0));if(l("mane")||l("flames"))for(let F=0;F<7;F++){const ne=F/6,ce=T.lerp(T.add(C,[-f*.5,f*.3,0]),Y(.55),ne),be=[.4,.3,.45,.28,.38,.25,.3][F],Ue=T.norm([-.35-(t?.1:0),1,0]);u.flat(T.add(ce,T.mul(Ue,be*.5)),[1,0,0],Ue,be*.32,be*.55,Qi.flame(F%2?h.MAGIC:h.MAGIC2,h.MAGIC2),{group:60+F%2,extra:!0})}if(l("tails"))for(let F=0;F<7;F++){const ne=Math.PI*(.55+F*.08),ce=(F-3)*.1,be=T.add(V,[Math.cos(ne)*.9,Math.sin(ne)*.85,ce]);u.chain([[...V,.1],[...T.lerp(V,be,.5),.17],[...be,.08]],F%2?h.BODY2:h.BODY,{group:70,extra:!0}),u.ell(be,[.09,.09,.09],h.MAGIC2,{group:71,extra:!0})}if(l("crystals")&&[.15,.3,.45,.6,.75].forEach((F,ne)=>{const ce=Y(F),be=[.3,.5,.4,.6,.35][ne];u.ell(T.add(ce,[0,be*.45,(ne%2-.5)*.1]),[be*.55,.08,.08],h.MAGIC,{dir:[(ne-2)*.12,1,0],group:80+ne%2,extra:!0,paint:Ue=>Ue[2]>0?h.MAGIC2:void 0})}),l("moss")){for(let F=0;F<6;F++)u.ell(Y(.08+F*.15),[d*.22,.07,M*.85],h.LEAF,{group:85,extra:!0});for(const[F,ne]of[[.25,.55],[.5,.8],[.75,.45]]){const ce=Y(F);u.seg(ce,T.add(ce,[0,ne*.7,0]),.04,.025,h.TRUNK,{group:86,extra:!0}),u.ell(T.add(ce,[0,ne*.8,0]),[ne*.28,ne*.26,ne*.28],h.LEAF2,{group:87,extra:!0,paint:be=>be[1]<ce[1]+ne*.72?h.LEAF3:void 0})}for(const F of[.12,.4,.65,.9]){const ne=Y(F);u.ell(T.add(ne,[0,.12,M*.3]),[.07,.035,.07],h.MAGIC,{group:89,extra:!0})}}if(l("ribbons"))for(let F=0;F<3;F++){const ne=[];for(let ce=0;ce<9;ce++){const be=ce/8;ne.push([d*(.5-be*2.2),v+.05+F*.1+be*(.25+F*.12)+Math.sin(be*6+t+F)*.07,(F-1)*.18,.04*(1-be*.6)])}u.chain(ne,F%2?h.MAGIC2:h.MAGIC,{group:90+F,extra:!0})}Ul(u);const{sp:te}=Tn(u,{height:Nl(e,i,s.hgt),facing:r});return a&&Il(te,n.id.length*7919),te}function Hd(n,e,t,i,r,s){const a={group:3},o=c=>-i*c;e==="brush"?n.chain([[...t,.1],[o(1.3),r-.25+s,0,.15],[o(1.4),r-.55,0,.14],[o(1.35),.38+s,0,.09]],h.BODY,{...a,paint:c=>c[1]<.32?h.BODY3:void 0}):e==="bushy"?n.chain([[...t,.1],[o(1.05)-.35,r-.05+s,0,.17],[o(1.05)-.75,r-.2+s,0,.18],[o(1.05)-1,r-.35+s,0,.1]],h.BODY,{...a,paint:c=>c[0]<o(1.05)-.82?h.BELLY:void 0}):e==="stub"||e==="deer"||e==="bob"?n.ell(T.add(t,[-.06,.02+s,0]),[.1,.08,.07],e==="deer"?h.BELLY:h.BODY,{...a,paint:e==="bob"?c=>c[0]<t[0]-.08?h.BODY3:void 0:void 0}):e==="puff"?n.ell(T.add(t,[-.04,.02,0]),[.11,.11,.1],h.BELLY,a):e==="squirrel"||e==="star"?n.chain([[...t,.12],[o(1.3),r+.05+s,0,.25],[o(1.3),r+.6+s,0,.3],[o(1),r+.95+s,0,.27],[o(.65),r+.9+s,0,.16]],e==="star"?h.MAGIC:h.BODY,{...a,extra:!0,paint:e==="star"?c=>Yn(c,14,.12)?h.GLINT:void 0:void 0}):e==="otter"?n.chain([[...t,.17],[o(1.3),r-.45+s,0,.12],[o(1.6),.1,0,.07],[o(1.85),.06+s,0,.03]],h.BODY,a):e==="stoat"?n.chain([[...t,.08],[o(1.3),r-.12+s,0,.07],[o(1.6),r-.05+s,0,.06]],h.BODY,{...a,paint:c=>c[0]<o(1.45)?h.BODY3:void 0}):e==="flat"?(n.seg(t,[o(1.15),.3,0],.08,.07,h.BODY2,a),n.ell([o(1.4),.1+s*.5,0],[.28,.03,.14],h.BODY3,a)):e==="thin"&&(n.chain([[...t,.04],[o(1.1),r-.3,0,.03],[o(1.12)+s,r-.55,0,.025]],h.BODY,a),n.ell([o(1.12)+s,r-.62,0],[.04,.07,.04],h.BODY3,a))}function Wd(n,e,t,i,r,s){const a=!e.antlers,o=a?.45:[0,.5,.95,.95][r]*(s("antlersGlow")?1.15:1),c=s("antlersGlow")?i>0?h.MAGIC2:h.MAGIC:h.ACCENT,l={group:11+(i>0?1:0),extra:!0};if(!o)return;const u=.045*Math.max(.8,o),f=i*.35*o;if(e.antlers==="palm"){const x=T.add(t,[-.06*o,.12*o,f*.3]);n.seg(t,x,u*1.3,u*1.2,c,l);for(let m=0;m<5;m++){const M=.35+m*.3,_=T.norm([-Math.cos(M),Math.sin(M)*.9,i*.55]),S=(.24+.05*(m%2))*o;n.ell(T.add(x,T.mul(_,S*.55)),[S*.6,u*1.5,u*.6],c,{...l,dir:_,up:[0,0,1]})}return}const d=T.add(t,[-.18*o,.3*o,f*.4]),p=T.add(t,[-.25*o,.62*o,f*.8]),g=T.add(t,[-.1*o,.95*o,f]);n.chain([[...t,u*1.2],[...d,u],[...p,u*.85],[...g,u*.4]],c,l);const v=(x,m,M,_)=>n.seg(x,T.add(x,T.mul(T.norm(m),M)),_,_*.35,c,l);v(T.add(t,[-.04*o,.1*o,f*.1]),[1,.6,0],.28*o,u*.8),(o>.4||a)&&v(d,[1,.9,0],.3*o,u*.7),o>.7&&(v(p,[.8,1,0],.28*o,u*.6),v(g,[.3,1,i*.2],.18*o,u*.5))}function Vd(n,e,t,i,r="towards"){const s=e===3,a=e===1,o=e===0,c=g=>s&&n.legend.includes(g),l=new Xe,u=t?.03:0,f=o?.48:a?.42:.36,d=(o?.95:1.08)+u;for(const g of[-1,1]){const v=t&&g>0?.04:0;l.seg([.05,.2,g*.14],[.08,.05+v,g*.15],.07,.06,h.BODY2,{group:2});for(const x of[-.04,0,.04])l.ell([.16,.03+v,g*.15+x],[.06,.025,.02],h.ACCENT,{group:2});l.anchors.feet.push({c:[.13,.04+v,g*.15],r:.08,group:g>0?6:2})}if(l.ell([-.32,.32,0],[.22,.06,.14],h.BODY2,{dir:[-1,-.6,0],group:3}),l.ell([0,.55+u,0],[.36,.52,.36],h.BODY,{paint:g=>g[0]>.12&&g[1]<d-f*.5?Math.floor(g[1]*18)%3===0&&Yn(g,16,.5)?h.BODY2:h.BELLY:void 0}),!c("wings"))for(const g of[-1,1])l.ell([-.06,.58+u,g*.3],[.4,.3,.08],h.BODY2,{dir:[-.3,-1,0],up:[1,0,0],group:g>0?4:2,paint:v=>Yn(v,12,.15)?h.BODY3:void 0});l.ell([0,d,0],[f,f*.9,f],h.BODY);for(const g of[-1,1]){const v=T.norm([.75,-.05,g*.4+.35]),x=T.add(Xe.surface([0,d,0],[f,f*.9,f],v),T.mul(v,-f*.05));l.ell(x,[f*.22,f*.46,f*.4],h.BELLY,{group:1,dir:v});const m=T.add(x,T.mul(v,f*.14));l.ell(m,[f*.1,f*.26,f*.24].map(M=>M*(o?1.15:1)),s?h.MAGIC:h.IRIS,{group:1,dir:v}),l.ell(T.add(m,T.mul(v,f*.07)),[f*.08,f*.14,f*.13].map(M=>M*(o?1.15:1)),s?h.MAGIC2:h.EYE,{group:1,dir:v}),(l.anchors.eyes||={pts:[],size:f*.22}).pts.push(T.add(m,T.mul(v,f*.07))),o||l.ell([f*.05,d+f*.8,g*f*.6],[f*.32,f*.12,f*.08],h.BODY2,{dir:[-.1,1,g*.7],up:[1,0,0],group:1})}if(l.ell(Xe.surface([0,d,0],[f,f*.9,f],T.norm([.75,-.35,.35])),[f*.2,f*.12,f*.1],h.ACCENT,{dir:[.6,-1,.3],group:1}),c("wings"))for(const g of[-1,1])Pa(l,[-.05,.8+u,g*.3],g,1.3,t?.12:0,g>0?h.MAGIC2:h.MAGIC,h.MAGIC,40+(g>0?10:0));if(c("eyesRing"))for(let g=0;g<7;g++){const v=Math.PI*(.15+g/6*.7);l.ell([Math.cos(v)*.2-.1,d+.1+Math.sin(v)*.6,(g-3)*.15],[.07,.07,.07],h.MAGIC2,{group:95+g,extra:!0}),l.ell([Math.cos(v)*.2-.05,d+.1+Math.sin(v)*.6,(g-3)*.15],[.035,.035,.035],h.EYE,{group:95+g,extra:!0})}l.anchors.head={c:[0,d,0],r:[f,f*.9,f]},l.anchors.neck={c:[0,d-f*.75,0],r:f*.85,dir:[0,1,0]},Ul(l);const{sp:p}=Tn(l,{height:Nl(e,i,.95),facing:r});return s&&Il(p,31),p}const Bi=(n,e,t,i,r,s,a=1)=>{for(const o of i)n.ell(Xe.surface(e,t,T.norm(o)),[r,r*1.2,r],s,{group:a});n.anchors.head||={c:e,r:t},n.anchors.eyes||={pts:i.map(o=>Xe.surface(e,t,T.norm(o))),size:r}},Zh=(n,e,t)=>n.ell([e,.005,0],[t,.005,t*.6],h.NOSE,{group:0});function On(n,e,t,i,r,s){Ul(n);const{sp:a}=Tn(n,{height:Nl(t,i,r),facing:s});return t===3&&Il(a,e.id.length*131),a}const Jh=(n,e,t)=>{n.ell(e,[t,t*.35,t],h.MAGIC,{group:95,extra:!0,paint:i=>i[1]>e[1]?h.MAGIC2:void 0});for(let i=0;i<5;i++){const r=i/5*Math.PI*2;n.ell(T.add(e,[Math.cos(r)*t*.8,t*.55,Math.sin(r)*t*.8]),[t*.38,t*.12,t*.12],h.MAGIC,{dir:[0,1,0],up:[1,0,0],group:96,extra:!0})}},Ol=(n,e)=>e.forEach(([t,i],r)=>n.ell(T.add(t,[0,i*.45,0]),[i*.55,.07,.07],h.MAGIC,{dir:[(r%3-1)*.25,1,(r%2-.5)*.3],group:80+r%2,extra:!0,paint:s=>s[2]>t[2]?h.MAGIC2:void 0}));function Xd(n,e,t,i,r="towards"){const s=e===3,a=new Xe,o=t?.03:0;for(const[f,d]of[[.28,.2],[.28,-.2],[-.28,.2],[-.28,-.2]])a.seg([f,.15,d],[f+(d>0?o:-o),.03,d],.06,.05,h.BODY3,{group:d>0?6:2}),a.anchors.feet.push({c:[f+.03+(d>0?o:-o),.03,d],r:.065,group:d>0?6:2});const c=[0,.32,0],l=[.5,.32,.38];a.ell(c,l,h.BODY2,{paint:f=>Yn(f,22,.3)?h.BODY3:Yn(f,19,.12)?h.BELLY:void 0});for(let f=0;f<46;f++){const d=f*2.399%(Math.PI*2),p=f/46*.9+.05,g=T.norm([Math.cos(d)*Math.sin(p*Math.PI*.5)-.25,Math.cos(p*Math.PI*.5)*.9+.1,Math.sin(d)*Math.sin(p*Math.PI*.5)]);g[0]>.55||a.ell(T.add(Xe.surface(c,l,g),T.mul(g,.02)),[.1,.025,.025],f%4?h.BODY2:h.BODY3,{dir:T.add(g,[-.4,0,0]),group:1})}const u=[.48,.22,0];return a.ell(u,[.22,.14,.15],h.BELLY,{dir:[1,-.3,0],group:1}),a.ell([.69,.16,0],[.04,.04,.04],h.NOSE,{group:1}),Bi(a,u,[.22,.14,.15],[[.3,.6,.55],[.3,.6,-.55]],.035,s?h.MAGIC2:h.EYE),s&&Ol(a,[[[-.3,.55,.1],.35],[[-.05,.62,-.1],.5],[[.2,.55,.12],.4],[[-.15,.58,.2],.3]]),On(a,n,e,i,.6,r)}function Yd(n,e,t,i,r="towards"){const s=e===3,a=new Xe,o=t?.05:0;for(const u of[-1,1])a.ell([-.22,.16,u*.36],[.24,.13,.12],u>0?h.BODY:h.BODY2,{dir:[1,.3,0],group:u>0?6:2,paint:f=>Yn(f,14,.15)?h.BODY3:void 0}),a.ell([.05,.04,u*.4],[.16,.04,.08],u>0?h.BODY:h.BODY2,{group:u>0?6:2}),a.seg([.35,.2+o,u*.24],[.42,.03,u*.3],.05,.04,u>0?h.BODY:h.BODY2,{group:u>0?7:2}),a.anchors.feet.push({c:[.45,.03,u*.3],r:.06,group:u>0?7:2},{c:[.12,.04,u*.4],r:.08,group:u>0?6:2});const c=[0,.3+o,0],l=[.5,.28,.4];a.ell(c,l,h.BODY,{paint:u=>u[1]<c[1]-.12?h.BELLY:u[0]>.38&&Math.abs(u[1]-(c[1]-.02))<.018?h.LINE:Yn(u,14,.22)?h.BODY3:void 0});for(const u of[-1,1]){const f=[.3,.55+o,u*.17];a.ell(f,[.1,.09,.1],h.BODY,{group:1}),a.ell(Xe.surface(f,[.1,.09,.1],T.norm([.6,.5,u*.5])),[.05,.05,.05],s?h.MAGIC2:h.IRIS,{group:1}),a.ell(Xe.surface(f,[.11,.1,.11],T.norm([.65,.45,u*.5])),[.03,.015,.03],h.EYE,{group:1})}return a.anchors.head={c:[.22,.45+o,0],r:[.3,.2,.3],top:[.18,.62+o,0]},a.anchors.eyes={pts:[-1,1].map(u=>Xe.surface([.3,.55+o,u*.17],[.1,.09,.1],T.norm([.6,.5,u*.5]))),size:.05},a.anchors.neck={c:[.32,.3+o,0],r:.25,dir:[1,.3,0]},s&&Jh(a,[.15,.66+o,0],.16),On(a,n,e,i,.55,r)}function Kd(n,e,t,i,r="towards"){const s=e===3,a=e===1,o=d=>s&&n.legend.includes(d),c=new Xe,l=t?.02:0;for(const d of[-1,1]){const p=t&&d>0?.04:0;c.seg([0,.3,d*.08],[.03,.03+p,d*.08],.03,.025,h.NOSE,{group:d>0?7:2}),c.ell([.08,.02+p,d*.08],[.08,.015,.04],h.NOSE,{group:2}),c.anchors.feet.push({c:[.07,.03+p,d*.08],r:.06,group:d>0?7:2})}if(c.ell([-.55,.42,0],[.32,.035,.12],h.BODY2,{dir:[-1,-.25,0],group:3}),c.ell([0,.52+l,0],[.42,.26,.24],h.BODY,{dir:[1,.45,0]}),!o("wings"))for(const d of[-1,1])c.ell([-.1,.55+l,d*.2],[.45,.17,.05],h.BODY2,{dir:[-1,-.25,0],group:d>0?4:2});const u=[.36,.84+l,0],f=a?.19:.16;if(c.ell(u,[f*1.1,f,f*.95],h.BODY,{paint:d=>d[1]>u[1]+f*.55?h.BELLY:void 0}),c.ell(T.add(u,[f*1.5,-f*.25,0]),[f*1,f*.38,f*.3],h.NOSE,{dir:[1,-.2,0],group:1}),Bi(c,u,[f*1.1,f,f*.95],[[.55,.35,.65],[.55,.35,-.65]],f*.16,s?h.MAGIC2:h.EYE),o("wings"))for(const d of[-1,1])Pa(c,[-.05,.65+l,d*.18],d,1.1,t?.1:0,d>0?h.MAGIC2:h.MAGIC,h.MAGIC,40+(d>0?10:0));if(o("eyesRing"))for(let d=0;d<6;d++){const p=Math.PI*(.2+d/5*.6);c.ell([Math.cos(p)*.25-.1,.95+Math.sin(p)*.45,(d-2.5)*.12],[.06,.06,.06],h.MAGIC2,{group:95+d,extra:!0})}return On(c,n,e,i,.75,r)}function qd(n,e,t,i,r="towards"){const s=e===3,a=d=>s&&n.legend.includes(d),o=new Xe,c=t===0,l=.55,u=a("wingsBig")?1.5:1;Zh(o,0,.3*u);for(const d of[-1,1]){const p=[0,l+.05,d*.1],g=[.05,l+(c?.35:-.05),d*.45*u],v=[[-.05,l+(c?.45:-.15),d*.85*u],[-.25,l+(c?.2:-.25),d*.75*u],[-.3,l+(c?0:-.25),d*.4*u]],x=a("wingsBig")?h.MAGIC:h.BODY2,m=a("wingsBig")?h.MAGIC2:h.BODY3;o.seg(p,g,.03,.025,m,{group:11});for(const E of v)o.seg(g,E,.02,.012,m,{group:11});const M=T.sub(v[0],p),_=T.norm(M),S=T.norm(T.sub(v[2],g)),w=T.norm(T.sub(S,T.mul(_,T.dot(S,_))));o.flat(T.add(T.lerp(p,v[0],.5),T.mul(w,.12*u)),_,w,Math.hypot(...M)*.55,.3*u,Qi.membrane(x),{group:10+(d>0?1:0),bend:.2})}o.ell([0,l,0],[.13,.16,.12],h.BODY,{group:1});const f=[.08,l+.2,0];o.ell(f,[.12,.11,.11],h.BODY,{group:1});for(const d of[-1,1])o.ell(T.add(f,[-.02,.15,d*.07]),[.12,.045,.02],h.BODY,{dir:[.1,1,d*.3],up:[1,0,0],group:1,paint:p=>p[0]>f[0]-.01?h.EAR:void 0});return Bi(o,f,[.12,.11,.11],[[.7,.2,.5],[.7,.2,-.5]],.025,s?h.MAGIC2:h.EYE),o.ell(Xe.surface(f,[.12,.11,.11],[1,-.2,0]),[.025,.02,.03],h.NOSE,{group:1}),On(o,n,e,i,.55,r)}function $d(n,e,t,i,r="towards"){const s=e===3,a=new Xe,o=t?.03:0;a.seg([-.5,.18,0],[-.62,.12,0],.04,.02,h.SKIN,{group:3});for(const c of[-1,1])a.ell([-.3,.05,c*.2],[.07,.04,.05],h.SKIN,{group:c>0?6:2}),a.anchors.feet.push({c:[-.3,.05,c*.2],r:.07,group:c>0?6:2});a.ell([0,.3,0],[.52,.29,.33],h.BODY,{paint:c=>c[1]>.45?h.BODY2:void 0}),a.ell([.55,.24,0],[.2,.07,.07],h.SKIN,{dir:[1,-.15,0],group:1}),a.ell([.74,.21,0],[.04,.05,.06],h.NOSE,{group:1});for(const c of[-1,1]){const l=[.32,.1-(c>0?o:0),c*.34];a.ell(l,[.13,.035,.12],h.SKIN,{group:c>0?7:2,axes:[[1,0,0],[0,1,0],[0,0,1]]});for(let u=0;u<4;u++)a.ell(T.add(l,[.14,-.01,c*(u-1.5)*.05]),[.05,.015,.015],h.ACCENT,{group:c>0?7:2})}for(const c of[-1,1])a.ell(Xe.surface([0,.3,0],[.52,.29,.33],T.norm([.85,.3,c*.35])),[.015,.015,.015],s?h.MAGIC2:h.EYE,{group:1});return a.anchors.head={c:[.32,.34,0],r:[.25,.22,.25],top:[.3,.58,0]},a.anchors.eyes={pts:[-1,1].map(c=>Xe.surface([0,.3,0],[.52,.29,.33],T.norm([.85,.3,c*.35]))),size:.03},a.anchors.neck={c:[.36,.3,0],r:.27,dir:[1,.1,0]},s&&Jh(a,[.15,.62,0],.15),On(a,n,e,i,.55,r)}function Zd(n,e,t,i,r="towards"){const s=e===3,a=f=>s&&n.legend.includes(f),o=new Xe;for(const f of[-1,1])for(let d=0;d<3;d++){const p=.25-d*.25,g=(d+(f>0?1:0)+t)%2?.06:-.06,v=[p,.22,f*.2];o.chain([[...v,.03],[p+g+(1-d)*.06,.32,f*.42,.025],[p+g*1.5+(1-d)*.15,.02,f*.55,.015]],f>0?h.BODY2:h.BODY3,{group:f>0?7:2})}o.ell([-.12,.34,0],[.46,.24,.32],h.BODY,{paint:f=>Math.abs(f[2])<.018&&f[1]>.4?h.LINE:f[1]>.5&&f[2]>.05&&f[2]<.17?h.BELLY:void 0}),o.ell([.38,.33,0],[.16,.16,.26],h.BODY,{group:1});const c=[.56,.3,0];o.ell(c,[.1,.1,.17],h.BODY2,{group:1});const l=[.3,.5,.7,.75][e]*(a("horn")?1.3:1),u=a("horn")?h.MAGIC:h.BODY3;for(const f of[-1,1]){const d=T.add(c,[.08,.02,f*.1]),p=T.add(d,[l*.7,l*.45,f*l*.15]),g=T.add(p,[l*.25,-l*.12,-f*l*.12]);o.chain([[...d,.045],[...p,.035],[...g,.015]],u,{group:8+(f>0?1:0)}),o.seg(T.lerp(d,p,.55),T.add(T.lerp(d,p,.55),[0,l*.22,0]),.02,.008,u,{group:8})}for(const f of[-1,1])o.chain([[...T.add(c,[.05,.06,f*.1]),.012],[c[0]+.1,.5,f*.22,.012],[c[0]+.2,.5,f*.26,.012]],h.BODY3,{group:9,extra:!0});return Bi(o,c,[.1,.1,.17],[[.4,.3,.85],[.4,.3,-.85]],.032,s?h.MAGIC2:h.EYE,9),a("crystals")&&Ol(o,[[[-.35,.5,.1],.3],[[-.1,.55,-.08],.45],[[.1,.5,.1],.35]]),On(o,n,e,i,.5,r)}function Jd(n,e,t,i,r="towards"){const s=e===3,a=new Xe,o=t?.04:0;a.ell([0,.07,0],[.6+o,.07,.17],h.SKIN,{group:1}),a.chain([[.45+o,.08,0,.1],[.6+o,.25,0,.09],[.68+o,.28,0,.08]],h.SKIN,{group:1});for(const u of[-1,1])a.seg([.7+o,.32,u*.04],[.78+o,.55,u*.1],.018,.014,h.SKIN,{group:5}),a.ell([.78+o,.57,u*.1],[.03,.03,.03],s?h.MAGIC2:h.EYE,{group:5});a.anchors.head={c:[.68+o,.3,0],r:[.09,.08,.09],top:[.66+o,.38,0]},a.anchors.eyes={pts:[-1,1].map(u=>[.78+o,.57,u*.1]),size:.03},a.anchors.neck={c:[.55+o,.17,0],r:.1,dir:[1,1.2,0]};const c=[-.12,.4,0],l=s?h.MAGIC:h.BODY;return a.ell(c,[.32,.32,.22],l,{group:3,paint:u=>{const f=Math.atan2(u[1]-c[1],u[0]-c[0]);return((Math.hypot(u[0]-c[0],u[1]-c[1])/.32-f/(Math.PI*2)*.3)%.3+.3)%.3<.06?s?h.MAGIC2:h.BODY3:void 0}}),On(a,n,e,i,.45,r)}function Qd(n,e,t,i,r="towards"){const s=e===3,a=new Xe;for(const o of[-1,1])for(let c=0;c<7;c++){const l=-.45+c*.15,u=(c+t)%2?.03:-.03;a.seg([l,.1,o*.22],[l+u,.01,o*.33],.025,.015,h.BODY3,{group:o>0?7:2})}for(const o of[-1,1])a.chain([[.5,.15,o*.08,.02],[.7,.3,o*.2,.015],[.82,.22,o*.26,.012]],h.BODY3,{group:9,extra:!0});return a.ell([0,.18,0],[.58,.2,.3],h.BODY,{paint:o=>(Math.floor((o[0]+.6)*9)%2&&o[1]>.2?h.BODY2:void 0)||(Math.abs((o[0]+.6)*9%1)<.12?h.LINE:void 0)}),Bi(a,[0,.18,0],[.58,.2,.3],[[.92,.3,.25],[.92,.3,-.25]],.02,s?h.MAGIC2:h.EYE),s&&Ol(a,[[[-.3,.32,.05],.3],[[0,.37,-.05],.45],[[.25,.32,.05],.32]]),On(a,n,e,i,.4,r)}function jd(n,e,t,i,r="towards"){const s=e===3,a=e===1,o=p=>s&&n.legend.includes(p),c=new Xe,l=t?.7:0,u=[];for(let p=0;p<=12;p++){const g=p/12;u.push([-.9+g*1.2,.07,Math.sin(g*Math.PI*2+l)*.25*(1-g*.5),.03+.045*Math.sin(Math.min(1,g*1.4)*Math.PI/2)])}u.push([.38,.25,u[12][2],.07],[.42,.45,u[12][2]*.8,.065]),c.chain(u,h.BODY,{paint:p=>p[1]<.05&&p[0]<.35?h.BELLY:Yn([p[0]*1.5,p[1],p[2]],14,.3)?h.BODY3:void 0});const f=[.5,.5,u[13][2]*.8],d=a?.11:.09;if(c.ell(f,[d*1.5,d*.75,d],h.BODY,{dir:[1,-.15,0],group:1}),Bi(c,f,[d*1.5,d*.75,d],[[.5,.5,.7],[.5,.5,-.7]],d*.22,s?h.MAGIC2:h.EYE),t||c.seg(T.add(f,[d*1.4,-d*.2,0]),T.add(f,[d*2.3,-d*.3,0]),.01,.008,h.SKIN,{group:1}),c.anchors.feet.push({c:T.add(u[0].slice(0,3),[-.02,-.01,0]),r:.06,group:3,tail:!0}),c.anchors.neck={c:[.42,.36,u[12][2]*.9],r:.075,dir:[.2,1,0]},o("wings"))for(const p of[-1,1])Pa(c,[0,.2,p*.05],p,.9,t?.1:0,p>0?h.MAGIC2:h.MAGIC,h.MAGIC,40+(p>0?10:0));return On(c,n,e,i,.45,r)}function ef(n,e,t,i,r="towards"){const s=e===3,a=d=>s&&n.legend.includes(d),o=new Xe,c=t===0,l=.55,u=a("wingsBig")?1.45:1,f=a("wingsBig")?h.MAGIC:h.BODY;Zh(o,0,.3*u);for(const d of[-1,1]){const p=c?.5:-.1,g=T.norm([.35,p,d]),v=T.norm([-.3,p*.6,d]);o.flat(T.add([0,l,d*.05],T.mul(g,.38*u)),g,T.norm(T.cross(g,[0,1,0])),.4*u,.24*u,Qi.spotted(f,h.BELLY,h.BODY3),{group:10+(d>0?1:0)}),o.flat(T.add([-.05,l,d*.05],T.mul(v,.26*u)),v,T.norm(T.cross(v,[0,1,0])),.27*u,.17*u,Qi.spotted(a("wingsBig")?h.MAGIC2:h.BODY2,h.BODY2,h.BODY2),{group:12+(d>0?1:0)}),o.chain([[.12,l+.08,d*.03,.015],[.2,l+.25,d*.1,.025],[.24,l+.32,d*.14,.012]],h.BODY2,{group:11})}return o.ell([0,l,0],[.22,.09,.09],h.BELLY,{group:1,paint:d=>Yn(d,30,.25)?h.BODY2:void 0}),o.ell([.17,l+.03,0],[.07,.07,.07],h.BELLY,{group:1}),Bi(o,[.17,l+.03,0],[.07,.07,.07],[[.7,.3,.6],[.7,.3,-.6]],.02,s?h.MAGIC2:h.EYE),On(o,n,e,i,.5,r)}function tf(n,e,t,i,r="towards"){const s=e===3,a=l=>s&&n.legend.includes(l),o=new Xe,c=t?.05:0;for(let l=0;l<9;l++){const u=l/8,f=-.6+u*1.15;o.ell([f,.12+Math.sin(u*Math.PI)*(.06+c),0],[.08,.1-u*.02,.12-u*.03],l<2?h.MAGIC2:l%2?h.BODY2:h.BODY,{group:1})}a("lantern")&&o.ell([-.75,.3,0],[.22,.22,.22],h.MAGIC2,{group:3,paint:l=>l[1]<.2?h.MAGIC:void 0});for(let l=0;l<6;l++)o.seg([-.2+l*.12,.05,.08],[-.2+l*.12+(l%2?.02:-.02)*(t?-1:1),0,.12],.015,.01,h.BODY3,{group:7});return o.ell([.6,.14,0],[.06,.06,.08],h.BODY3,{group:1}),Bi(o,[.6,.14,0],[.06,.06,.08],[[.6,.3,.7],[.6,.3,-.7]],.015,s?h.MAGIC2:h.EYE),On(o,n,e,i,.4,r)}function nf(n,e,t,i,r="towards"){const s=e===3,a=u=>s&&n.legend.includes(u),o=new Xe,c=[.15,.28,0];for(const u of[-1,1])for(let f=0;f<4;f++){const d=-.6+f*.4,p=(f+(u>0?0:1)+t)%2?.05:-.05,g=T.add(c,[.05-f*.04,0,u*.1]),v=T.add(g,[Math.cos(d)*.3*(f<2?1:-.6)+p,.3,u*.3]),x=T.add(g,[Math.cos(d)*.55*(f<2?1:-.8)+p*1.5,-.28,u*.55]);o.chain([[...g,.03],[...v,.028],[...x,.015]],u>0?h.BODY2:h.BODY3,{group:u>0?7:2})}o.ell([-.28,.38,0],[.34,.28,.3],h.BODY,{paint:u=>(Math.abs(u[2])<.03||Math.abs(u[0]+.28)<.03)&&u[1]>.45?h.BELLY:void 0}),o.ell(c,[.18,.13,.17],h.BODY2,{group:1}),o.anchors.head={c,r:[.18,.13,.17]},o.anchors.eyes={pts:[[.05,.05],[.05,-.05]].map(([u,f])=>Xe.surface(c,[.18,.13,.17],T.norm([.9,u*6,f*4]))),size:.03},o.anchors.neck={c:[-.02,.32,0],r:.15,dir:[1,0,0]};const l=a("eyesRing");for(const[u,f]of[[.05,.05],[.05,-.05],[.02,.1],[.02,-.1]])o.ell(Xe.surface(c,[.18,.13,.17],T.norm([.9,u*6,f*4])),[.025,.025,.025],l?h.MAGIC2:h.EYE,{group:1});if(l)for(let u=0;u<5;u++){const f=Math.PI*(.2+u/4*.6);o.ell([-.3+Math.cos(f)*.2,.75+Math.sin(f)*.35,(u-2)*.12],[.06,.06,.06],h.MAGIC2,{group:95+u,extra:!0})}return On(o,n,e,i,.5,r)}const rf=new Map(Object.entries({owl:Vd,hedgehog:Xd,toad:Yd,raven:Kd,bat:qd,mole:$d,beetle:Zd,snail:Jd,woodlouse:Qd,snake:jd,moth:ef,glowworm:tf,spider:nf})),Fl=[{id:"wolf",name:"Wolf",plan:"quad",hue:.08,sat:.24,val:.56,legend:["wings","mane"],q:{len:.64,chest:.42,tuck:.6,neck:.32,neckAng:.7,neckW:.42,hr:.26,snout:.82,snoutD:.7,ear:"point",earS:.82,tail:"brush",paw:"paw",legW:1.25,saddle:!0,belly:!0},tail:"up"},{id:"fox",name:"Fox",plan:"quad",q:{hgt:.8,len:.62,chest:.4,tuck:.5,neck:.3,neckAng:.7,neckW:.32,hr:.24,snout:1.05,snoutD:.5,snoutTaper:.6,ear:"point",earS:1.35,tail:"bushy",paw:"paw",legW:.9,belly:!0,socks:.3},hue:.06,sat:.8,val:.9,belly:"white",legend:["tails"]},{id:"badger",name:"Badger",plan:"quad",q:{hgt:.62,len:.78,chest:.2,tuck:.22,neck:.18,neckAng:.1,neckW:.5,hr:.26,snout:1,snoutD:.55,snoutTaper:.55,ear:"round",earS:.7,tail:"stub",paw:"paw",legW:1.35,legMat:h.BODY3,face:"badger",shaggy:!0},hue:.65,sat:.08,val:.45,legend:["crystals"]},{id:"boar",name:"Boar",plan:"quad",hue:.07,sat:.62,val:.5,legend:["tusksBig"],q:{len:.72,chest:.34,tuck:.42,neck:.2,neckAng:-.15,neckW:.55,hr:.27,snout:1.25,snoutD:.62,snoutTaper:.55,ear:"small",earS:.8,tail:"thin",paw:"hoof",legW:1.15,ridge:!0,tusks:!0,back:"hump",disc:!0},ridge:!0},{id:"stag",name:"Stag",plan:"quad",q:{hgt:1.3,len:.6,chest:.6,tuck:.7,neck:.55,neckAng:.95,neckW:.32,hr:.2,snout:1.15,snoutD:.6,snoutTaper:.65,ear:"point",earS:1.1,tail:"deer",paw:"hoof",legW:.75,antlers:"branch",rump:!0,spots:"young",belly:!0},hue:.08,sat:.5,val:.7,legend:["antlersGlow"]},{id:"hare",name:"Hare",plan:"quad",q:{hgt:.72,len:.5,chest:.4,tuck:.45,neck:.2,neckAng:.9,neckW:.35,hr:.27,snout:.65,snoutD:.7,ear:"long",earS:2.4,tail:"puff",paw:"paw",legW:.85,haunch:1.35,hindFoot:1.6,back:"arch",belly:!0,whiskers:!0},hue:.08,sat:.4,val:.72,legend:["jackalope"]},{id:"owl",name:"Owl",plan:"owl",hue:.08,sat:.5,val:.55,legend:["eyesRing","wings"]},{id:"bear",name:"Bear",plan:"quad",q:{hgt:1.15,len:.72,chest:.38,tuck:.4,neck:.25,neckAng:.3,neckW:.55,hr:.28,snout:.7,snoutD:.62,snoutTaper:.7,ear:"round",earS:.8,tail:"stub",paw:"paw",legW:1.55,back:"hump",muzzle:!0,shaggy:!0},hue:.07,sat:.55,val:.42,legend:["moss"]},{id:"hedgehog",name:"Hedgehog",plan:"hedgehog",hue:.08,sat:.4,val:.5,legend:["crystals"]},{id:"squirrel",name:"Squirrel",plan:"quad",q:{hgt:.55,len:.45,chest:.35,tuck:.4,neck:.2,neckAng:.9,neckW:.35,hr:.3,snout:.55,snoutD:.65,ear:"tuft",earS:1.1,tail:"squirrel",paw:"paw",legW:.8,haunch:1.3,back:"arch",belly:!0,whiskers:!0},hue:.03,sat:.75,val:.75,belly:"white",legend:["starTail"]},{id:"toad",name:"Toad",plan:"toad",hue:.2,sat:.5,val:.55,legend:["crown"]},{id:"otter",name:"Otter",plan:"quad",q:{hgt:.55,len:1,chest:.25,tuck:.25,neck:.3,neckAng:.35,neckW:.5,hr:.27,snout:.6,snoutD:.7,ear:"round",earS:.5,tail:"otter",paw:"paw",legW:1.1,muzzle:!0,belly:!0,whiskers:!0},hue:.07,sat:.55,val:.45,belly:"white",legend:["ribbons"]},{id:"lynx",name:"Lynx",plan:"quad",q:{hgt:.9,len:.55,chest:.5,tuck:.55,neck:.25,neckAng:.8,neckW:.4,hr:.27,snout:.5,snoutD:.75,snoutTaper:.8,ear:"tuft",earS:1,tail:"bob",paw:"paw",legW:1.2,cheeks:!0,spots:!0,belly:!0,whiskers:!0},hue:.09,sat:.45,val:.75,legend:["mane"]},{id:"elk",name:"Elk",plan:"quad",q:{hgt:1.4,len:.68,chest:.6,tuck:.66,neck:.45,neckAng:.75,neckW:.42,hr:.24,snout:1.6,snoutD:.9,snoutTaper:.85,ear:"point",earS:.9,tail:"stub",paw:"hoof",legW:.9,back:"hump",antlers:"palm",shaggy:!0},hue:.07,sat:.55,val:.38,legend:["antlersGlow","moss"]},{id:"raven",name:"Raven",plan:"raven",hue:.68,sat:.35,val:.3,legend:["wings","eyesRing"]},{id:"bat",name:"Bat",plan:"bat",hue:.78,sat:.25,val:.45,legend:["wingsBig"]},{id:"mole",name:"Mole",plan:"mole",hue:.7,sat:.15,val:.32,legend:["crown"]},{id:"beaver",name:"Beaver",plan:"quad",q:{hgt:.6,len:.65,chest:.2,tuck:.22,neck:.2,neckAng:.4,neckW:.55,hr:.28,snout:.6,snoutD:.75,ear:"round",earS:.45,tail:"flat",paw:"paw",legW:1.2,back:"arch",teeth:!0,whiskers:!0},hue:.06,sat:.6,val:.45,legend:["moss"]},{id:"stoat",name:"Stoat",plan:"quad",q:{hgt:.5,len:1,chest:.3,tuck:.33,neck:.35,neckAng:.6,neckW:.32,hr:.25,snout:.6,snoutD:.6,ear:"round",earS:.6,tail:"stoat",paw:"paw",legW:.8,belly:!0,back:"arch",whiskers:!0},hue:.1,sat:.25,val:.92,legend:["ribbons","mane"]},{id:"snail",name:"Snail",plan:"snail",hue:.08,sat:.45,val:.55,legend:["glowShell"]},{id:"ram",name:"Ram",plan:"quad",q:{hgt:.95,len:.6,chest:.48,tuck:.52,neck:.22,neckAng:.45,neckW:.48,hr:.25,snout:.85,snoutD:.75,snoutTaper:.8,ear:"small",earS:.7,tail:"stub",paw:"hoof",legW:.9,wool:!0,horns:"curl",face:"dark"},hue:.1,sat:.12,val:.88,legend:["hornsGlow"]},{id:"woodlouse",name:"Woodlouse",plan:"woodlouse",hue:.65,sat:.12,val:.45,legend:["crystals"]},{id:"snake",name:"Snake",plan:"snake",hue:.25,sat:.45,val:.45,legend:["wings"]},{id:"moth",name:"Moth",plan:"moth",hue:.1,sat:.3,val:.7,legend:["wingsBig"]},{id:"marten",name:"Pine marten",plan:"quad",q:{hgt:.55,len:.78,chest:.35,tuck:.38,neck:.3,neckAng:.55,neckW:.35,hr:.25,snout:.65,snoutD:.6,ear:"round",earS:.9,tail:"bushy",paw:"paw",legW:.85,belly:!0,back:"arch"},hue:.07,sat:.6,val:.45,legend:["mane"]},{id:"salamander",name:"Salamander",plan:"quad",q:{hgt:.42,len:.9,chest:.14,tuck:.14,neck:.12,neckAng:.05,neckW:.5,hr:.27,snout:.55,snoutD:.55,ear:"none",tail:"otter",paw:"paw",legW:1,spots:!0,spotMat:"belly"},hue:.1,sat:.1,val:.22,belly:"yellow",legend:["flames"]},{id:"glowworm",name:"Glow-worm",plan:"glowworm",hue:.12,sat:.4,val:.35,legend:["lantern"]},{id:"spider",name:"Spider",plan:"spider",hue:.07,sat:.45,val:.4,legend:["eyesRing"]},{id:"dormouse",name:"Dormouse",plan:"quad",q:{hgt:.38,len:.45,chest:.35,tuck:.38,neck:.15,neckAng:.6,neckW:.4,hr:.34,snout:.45,snoutD:.7,ear:"round",earS:.85,tail:"squirrel",paw:"paw",legW:.8,back:"arch",belly:!0,whiskers:!0,eyeK:1.6},hue:.09,sat:.6,val:.75,belly:"white",legend:["starTail"]},{id:"beetle",name:"Stag beetle",plan:"beetle",hue:.78,sat:.5,val:.35,legend:["horn","crystals"]}],Qh=Object.fromEntries(Fl.map(n=>[n.id,n])),Fo=[[[255,70,170],[255,245,250],[255,230,70]],[[40,220,255],[255,236,60],[255,80,180]],[[150,80,255],[175,255,60],[255,255,255]]],Bo={sneakers:[[255,70,90],[250,250,245]],glitter:[[215,215,235],[190,190,210]],platform:[[160,60,230],[40,30,52]]},sf=["bar","star","heart"];function af(n,e=!0){const t=Ca((n|0)*7919+17),i=t()<.12;return{collar:e,hat:i||t()<.45?Math.floor(t()*Fo.length):null,glasses:i||t()<.4?sf[t()<.6?0:t()<.5?1:2]:null,shoes:i||t()<.4?Object.keys(Bo)[Math.floor(t()*3)]:null}}function of(n,e,t=null){const i=lf(n,e);if(!t)return i;if(t.collar&&(i[h.COLLAR]=Array.isArray(t.collar)?t.collar:i[h.MAGIC]),t.hat!=null){const[r,s,a]=Fo[t.hat%Fo.length];i[h.HAT1]=r,i[h.HAT2]=s,i[h.POM]=a}if(t.glasses&&(i[h.SHADES]=[22,18,32],i[h.FRAME]=t.glasses==="heart"?[255,60,110]:[255,90,210]),t.shoes){const[r,s]=Bo[t.shoes]||Bo.sneakers;i[h.SHOE]=r,i[h.SOLE]=s}if(t.woken){i[h.WOKEN]=[255,40,36];for(const r of[h.BODY,h.BODY2,h.BODY3,h.BELLY,h.ACCENT,h.EAR])i[r]&&(i[r]=i[r].map((s,a)=>Math.round(s*.72+[30,8,12][a]*.1)))}return i}function lf(n,e){const t=Qh[n],i=e.cVal/.85,r=e.cSat/.6,s=ge(t.hue,t.sat*r*e.sat,t.val*i),a=t.belly==="yellow"?[240,196,40]:t.belly==="white"||t.q?.face==="badger"?[236,232,222]:ge(t.hue+.03,t.sat*.5*r,Math.min(1,t.val*i*1.3+.08)),o=ge(e.magicHue+t.hue*.3,.6,1),c=ge(e.magicHue+t.hue*.3,.18,1),l=["boar","stag","elk","ram"].includes(t.id);return{[h.BODY]:s,[h.BODY2]:ge(t.hue+.02,Math.min(1,t.sat*r*1.2+.05),t.val*i*.66),[h.BODY3]:ge(t.hue+.03,Math.min(1,t.sat*r*1.3+.1),t.val*i*.4),[h.BELLY]:a,[h.ACCENT]:l?[236,226,200]:ge(t.hue+.05,t.sat*.6,Math.min(1,t.val*i*.5+.25)),[h.MAGIC]:o,[h.MAGIC2]:c,[h.LEAF]:ge(.3,.55,.55),[h.LEAF2]:ge(.25,.5,.75),[h.LEAF3]:ge(.33,.6,.35),[h.TRUNK]:ge(.07,.45,.32),[h.EYE]:[24,18,30],[h.PUPIL]:[70,40,90],[h.GLINT]:[255,255,245],[h.NOSE]:[38,28,36],[h.EAR]:ge(t.hue+.97,Math.min(1,t.sat*.6+.2),Math.min(1,t.val*i*.55+.2)),[h.IRIS]:t.plan==="owl"?[255,176,40]:ge(.12,.7,.85),[h.SKIN]:[238,158,192]}}const cf=["size","growth","pixel","head","eye","legs","long","fur"],Zr=new Map;function hf(n,e,t,i,r="towards",s=null){const a=Qh[n]||Fl[0],o=s&&(s.collar||s.hat!=null||s.glasses||s.shoes||s.woken)?s:null,c=[a.id,e,t,r,...cf.map(u=>i[u]),o?[!!o.collar,o.hat??"",o.glasses||"",o.shoes||"",!!o.woken].join(","):""].join("|");let l=Zr.get(c);if(!l){if(l=Bd(o,()=>a.q?Gd(a,e,t,i,r):rf.get(a.plan)(a,e,t,i,r)),o?.woken)for(let u=0;u<l.m.length;u++)(l.m[u]===h.EYE||l.m[u]===h.IRIS||l.m[u]===h.PUPIL)&&(l.m[u]=h.WOKEN);Zr.size>600&&Zr.delete(Zr.keys().next().value),Zr.set(c,l)}return l}const Da=.07,Bl=.048,$e=(...n)=>({l:n}),bt=(n,e,t,i,r)=>({a:[n,e,t,i,r]}),nn=(n,e)=>({d:[n,e]}),pt=(n,e=.86)=>$e([.5,e],[.5,n]),mt=bt(.5,.76,.13,25,155),uf=n=>n.l?{l:n.l.map(([e,t])=>[1-e,t])}:n.a?{a:[1-n.a[0],n.a[1],n.a[2],180-n.a[3],180-n.a[4]]}:{d:[1-n.d[0],n.d[1]]},gt=(...n)=>n.flatMap(e=>[e,uf(e)]);function ci(n,e,t){const i=e[0]-n[0],r=e[1]-n[1],s=Math.hypot(i,r),a=t*s,o=(s*s/4+a*a)/(2*Math.abs(a)),c=(n[0]+e[0])/2,l=(n[1]+e[1])/2,u=r/s,f=-i/s,d=(o-Math.abs(a))*Math.sign(a),p=c-u*d,g=l-f*d,v=Math.atan2(n[1]-g,n[0]-p)*180/Math.PI;let m=Math.atan2(e[1]-g,e[0]-p)*180/Math.PI-v;for(;m>180;)m-=360;for(;m<-180;)m+=360;return bt(p,g,o,v,v+m)}const df=(n,e,t,i,r,s=24)=>$e(...Array.from({length:s+1},(a,o)=>[n+i*Math.sin(o/s*r*2*Math.PI),e+(t-e)*o/s])),ff=(n,e,t,i,r,s=0,a=40)=>$e(...Array.from({length:a+1},(o,c)=>{const l=c/a,u=(s+l*r*360)*Math.PI/180,f=t+(i-t)*l;return[n+f*Math.cos(u),e+f*Math.sin(u)]})),Es=(n,e,t,i,r)=>r.map(s=>{const a=Math.cos(s*Math.PI/180),o=Math.sin(s*Math.PI/180);return $e([n+t*a,e+t*o],[n+i*a,e+i*o])}),pf={wolf:[pt(.3),$e([.28,.08],[.5,.3],[.72,.08]),bt(.5,.55,.2,-55,55),mt,nn(.5+.2*Math.cos(-55*Math.PI/180),.55+.2*Math.sin(-55*Math.PI/180))],fox:[pt(.34),$e([.36,.06],[.5,.34],[.64,.06]),bt(.67,.66,.17,180,-80),nn(.67+.17*Math.cos(-80*Math.PI/180),.66+.17*Math.sin(-80*Math.PI/180)),mt],badger:[pt(.1),$e([.24,.3],[.76,.3]),...gt($e([.33,.14],[.33,.56])),mt,...gt(nn(.24,.3))],boar:[pt(.16),...gt(bt(.36,.24,.15,45,180)),...Es(.5,.16,0,.1,[-130,-90,-50]),mt],stag:[pt(.42),...gt($e([.5,.42],[.34,.26],[.3,.06]),$e([.335,.25],[.16,.2]),$e([.32,.15],[.18,.07])),mt],hare:[pt(.44),...gt($e([.5,.44],[.4,.34],[.38,.06])),bt(.62,.66,.09,180,540),mt,...gt(nn(.38,.06))],owl:[pt(.44),...gt(bt(.33,.3,.13,0,360),$e([.24,.18],[.18,.05])),mt,...gt(nn(.33,.3))],bear:[pt(.24),$e([.24,.3],[.76,.3]),...gt(bt(.3,.3,.09,180,360)),...gt($e([.36,.5],[.32,.62])),mt],hedgehog:[pt(.52),bt(.5,.52,.2,180,360),...Es(.5,.52,.22,.34,[-160,-125,-90,-55,-20]),mt],squirrel:[pt(.2),$e([.5,.2],[.4,.08]),bt(.66,.4,.16,100,-200),nn(.66+.16*Math.cos(-200*Math.PI/180),.4+.16*Math.sin(-200*Math.PI/180)),mt],toad:[pt(.42),$e([.16,.54],[.24,.42],[.76,.42],[.84,.54]),...gt(bt(.34,.3,.1,0,360)),mt,...gt(nn(.16,.54))],otter:[pt(.24),bt(.5,.5,.28,-100,100),nn(.5+.28*Math.cos(-100*Math.PI/180),.5+.28*Math.sin(-100*Math.PI/180)),ci([.18,.64],[.36,.64],.3),mt],lynx:[pt(.32),$e([.26,.2],[.5,.32],[.74,.2]),...gt($e([.26,.2],[.26,.06])),$e([.5,.68],[.66,.62]),mt,...gt(nn(.26,.06))],elk:[pt(.3),...gt($e([.5,.3],[.42,.2]),bt(.3,.16,.12,0,180),$e([.18,.16],[.14,.06])),$e([.5,.44],[.6,.52]),mt],raven:[pt(.14),$e([.5,.14],[.3,.22]),$e([.18,.56],[.5,.38],[.82,.56]),mt,nn(.58,.17),...gt(nn(.18,.56))],bat:[pt(.3),bt(.5,.16,.14,20,160),...gt($e([.5,.38],[.12,.26]),ci([.12,.26],[.24,.46],-.25),ci([.24,.46],[.38,.5],-.3),ci([.38,.5],[.5,.52],-.3)),mt],mole:[pt(.44),bt(.5,.3,.16,0,180),...Es(.5,.3,.19,.3,[-160,-125,-55,-20]),$e([.5,.14],[.5,.04]),mt],beaver:[pt(.36),$e([.32,.2],[.68,.2]),...gt($e([.44,.2],[.44,.34])),$e([.5,.56],[.68,.66],[.5,.76],[.32,.66],[.5,.56]),mt],stoat:[pt(.18),bt(.5,.44,.24,180,360),$e([.5,.18],[.6,.08]),mt,...gt(nn(.26,.44))],snail:[pt(.52),ff(.5,.33,.03,.2,1.6,90),$e([.66,.2],[.76,.06]),mt,nn(.76,.06)],ram:[pt(.24),...gt(bt(.36,.24,.14,0,-250)),mt,...gt(nn(.36+.14*Math.cos(-250*Math.PI/180),.24+.14*Math.sin(-250*Math.PI/180)))],woodlouse:[pt(.24),bt(.5,.52,.22,205,335),bt(.5,.66,.24,205,335),bt(.5,.38,.2,205,335),...gt($e([.5,.24],[.32,.06])),mt],snake:[pt(.16),df(.5,.82,.2,.2,1.25),$e([.5,.2],[.5,.11]),...gt($e([.5,.11],[.42,.045])),mt],moth:[pt(.2),...gt($e([.5,.3],[.16,.18],[.24,.5],[.5,.4]),$e([.5,.5],[.3,.64],[.5,.66]),bt(.38,.16,.12,0,-110)),mt],marten:[pt(.32),$e([.3,.2],[.5,.32],[.7,.2]),...gt(bt(.3,.14,.07,90,-180)),bt(.28,.56,.22,0,150),nn(.28+.22*Math.cos(150*Math.PI/180),.56+.22*Math.sin(150*Math.PI/180)),mt],salamander:[pt(.3),ci([.5,.3],[.5,.06],.35),ci([.5,.3],[.5,.06],-.35),...gt($e([.5,.42],[.32,.38],[.26,.48]),$e([.5,.64],[.32,.6],[.26,.7])),mt,...gt(nn(.38,.52))],glowworm:[pt(.4),bt(.5,.27,.1,90,450),...Es(.5,.27,.15,.25,[0,60,120,180,240,300]),mt],spider:[$e([.5,.05],[.5,.3]),pt(.5),bt(.5,.4,.11,-90,270),...gt(...[-150,-170,170,150].map(n=>$e([.5+.12*Math.cos(n*Math.PI/180),.4+.12*Math.sin(n*Math.PI/180)],[.5+.28*Math.cos(n*Math.PI/180),.4+.28*Math.sin(n*Math.PI/180)],[.5+.32*Math.cos(n*Math.PI/180),.4+.28*Math.sin(n*Math.PI/180)+.1]))),mt,nn(.5,.05)],dormouse:[pt(.12),bt(.5,.46,.24,-60,250),...gt(bt(.34,.16,.08,90,-180)),ci([.56,.38],[.7,.38],-.4),mt],beetle:[pt(.36),...gt(bt(.66,.26,.2,160,250)),ci([.5,.38],[.5,.82],.25),ci([.5,.38],[.5,.82],-.25),mt]},wc={pink:[255,64,200],cyan:[50,235,255],acid:[175,255,45],violet:[165,95,255],orange:[255,135,35],lemon:[255,238,70],red:[255,55,95],mint:[70,255,175],blue:[70,145,255],magenta:[235,70,255]},mf={badger:"pink",boar:"cyan",snail:"acid",fox:"violet",ram:"orange",woodlouse:"lemon",hedgehog:"red",squirrel:"mint",wolf:"blue",stag:"magenta",stoat:"pink",snake:"cyan",hare:"acid",owl:"violet",bear:"orange",toad:"lemon",otter:"red",lynx:"mint",elk:"blue",raven:"magenta",bat:"pink",mole:"cyan",beaver:"acid",beetle:"violet",moth:"orange",marten:"lemon",salamander:"red",glowworm:"mint",spider:"blue",dormouse:"magenta"},Ia=n=>wc[mf[n]]||wc.cyan,gf=[255,255,250],xf=(n,e,t)=>n.map((i,r)=>Math.round(i+(e[r]-i)*t)),Ec=n=>`rgb(${n.join(",")})`;function vf(n=0){const e=Math.max(0,n);return{level:e,metres:2+e+Math.max(0,e-2)*.5,core:1+.2*e,halo:Math.min(1,.45+.19*e),rings:e>=4?3:e>=3?2:e>=2?1:0,dots:e>=1&&e<2?12:0,band:e>=3,rays:e>=4?8:e>=3?4:0,shimmer:e>=3}}function ia(n){if(n.d)return{dot:!0,pts:[n.d],len:Bl*2};let e=n.l;if(n.a){const[i,r,s,a,o]=n.a,c=Math.max(6,Math.ceil(Math.abs(o-a)/8));e=Array.from({length:c+1},(l,u)=>{const f=(a+(o-a)*u/c)*Math.PI/180;return[i+s*Math.cos(f),r+s*Math.sin(f)]})}let t=0;for(let i=1;i<e.length;i++)t+=Math.hypot(e[i][0]-e[i-1][0],e[i][1]-e[i-1][1]);return{dot:!1,pts:e,len:t}}const zo=(n,e=0,t=1)=>{const i=n.reduce((s,a)=>s+a.len,0)||1;let r=0;for(const s of n)s.start=e+(t-e)*r/i,r+=s.len,s.end=e+(t-e)*r/i;return n},Ya=new Map;function jh(n){return Ya.has(n)||Ya.set(n,zo((pf[n]||[]).map(e=>({...ia(e),w:Da,part:"sigil"})))),Ya.get(n)}const Ka=new Map;function Mf(n,e=0){const t=n+":"+e;if(Ka.has(t))return Ka.get(t);const i=e===null?null:vf(e),r=i?i.rings>=2?.6:i.rings||i.dots?.66:.8:1,s=(1-r)/2,a=i?i.core:1,o=Da*.55*((i?.level??0)<3?1:Math.min(1.6,.8+.25*i.level)),c=[];if(i){const p=g=>ia({a:[.5,.5,g,90,450]});for(let g=0;g<i.rings;g++)c.push({...p(.44-g*.06),w:o,part:"ring"});for(let g=0;g<i.dots;g++){const v=(90+g*360/i.dots)*Math.PI/180;c.push({dot:!0,pts:[[.5+.44*Math.cos(v),.5+.44*Math.sin(v)]],len:.05,r:.042,w:o,part:"ring"})}if(i.band&&i.rings>=2)for(let g=0;g<16;g++){const v=(90+g*22.5)*Math.PI/180,x=.44-.06+.014,m=.44-.014;c.push({...ia({l:[[.5+x*Math.cos(v),.5+x*Math.sin(v)],[.5+m*Math.cos(v),.5+m*Math.sin(v)]]}),w:o*.8,part:"band"})}for(let g=0;g<i.rays;g++){const v=(90+g*360/i.rays)*Math.PI/180,x=.44+.02,m=.5-o/2;c.push({...ia({l:[[.5+x*Math.cos(v),.5+x*Math.sin(v)],[.5+m*Math.cos(v),.5+m*Math.sin(v)]]}),w:o*1.3,part:"ray"})}}const l=Math.min(1.25,a),u=jh(n).map(d=>({dot:d.dot,len:d.len*r,pts:d.pts.map(([p,g])=>[s+p*r,s+g*r]),w:d.w*r*l,r:Bl*r*l,part:"sigil"})),f={level:e,frame:i,k:r,strokes:[...zo(c,0,c.length?.15:0),...zo(u,c.length?.15:0,1)]};return Ka.set(t,f),f}function _f(n,e){if(e>=n.end)return n.pts;if(e<=n.start)return null;if(n.dot)return n.pts;let t=(e-n.start)/(n.end-n.start)*n.len;const i=[n.pts[0]];for(let r=1;r<n.pts.length;r++){const s=n.pts[r-1],a=n.pts[r],o=Math.hypot(a[0]-s[0],a[1]-s[1]);if(t<=o){i.push([s[0]+(a[0]-s[0])*t/o,s[1]+(a[1]-s[1])*t/o]);break}i.push(a),t-=o}return i}function Sf(n,e,{x:t=0,y:i=0,size:r=64,level:s=null,colour:a=Ia(e),progress:o=1,glow:c=!0}={}){const l=Mf(e,s),u=l.frame?l.frame.halo:.7;n.save(),n.translate(t,i),n.scale(r,r),n.lineCap="round",n.lineJoin="round";const f=(d,p,g,v)=>{n.globalAlpha=g,n.strokeStyle=n.fillStyle=Ec(d),n.shadowColor=Ec(a),n.shadowBlur=v;for(const x of l.strokes){const m=_f(x,o);if(m){if(n.beginPath(),x.dot){n.arc(m[0][0],m[0][1],x.r*(p>1?1.5:1),0,Math.PI*2),n.fill();continue}n.lineWidth=x.w*p,m.forEach((M,_)=>_?n.lineTo(M[0],M[1]):n.moveTo(M[0],M[1])),n.stroke()}}};c?(f(a,2.4,Math.min(u,.7)*.55,r/12),f(xf(a,gf,.72),.62,1,r/30)):f(a,1,1,0),n.restore()}function bf(n,e,t,i){let r=1/0;for(const s of n){if(s.start>=r)break;if(s.dot){Math.hypot(e-s.pts[0][0],t-s.pts[0][1])<Bl+i-Da/2&&(r=s.start);continue}let a=0;for(let o=1;o<s.pts.length;o++){const c=s.pts[o-1],l=s.pts[o],u=l[0]-c[0],f=l[1]-c[1],d=u*u+f*f,p=Math.sqrt(d),g=d?Math.max(0,Math.min(1,((e-c[0])*u+(t-c[1])*f)/d)):0;if(Math.hypot(e-c[0]-u*g,t-c[1]-f*g)<i){const v=s.start+(a+g*p)/s.len*(s.end-s.start);v<r&&(r=v)}a+=p}}return r}function yf(n,e,t,i=Da/2){return bf(jh(n),e,t,i)<1/0}Fl.map(n=>n.id);const wf=new Set([h.TRUNK,h.BARK2,h.BARKD,h.BARKL]);function ji(n,e,t,i,r,s,{mat:a=h.LEAF,group:o=30,ragged:c=1}={}){const u=[];for(let m=0;m<9;m++){const M=m/9*Math.PI*2,_=1+(s()-.5)*.35*(r.clump+.3);u.push([e[0]+Math.cos(M)*t*_,e[1]+Math.sin(M)*i*_*(Math.sin(M)>0?.8:1)])}const f=Math.max(1,Math.round(Math.min(t,i)/3.5));n.shape(La(u,0,9,f,Math.max(1.2,Math.min(t,i)*.14)*c,1),a,{group:o,line:!1,round:r.round}),n.mark([Ct(e,[-t*1.1,i*.15]),Ct(e,[t*1.1,i*.1]),Ct(e,[t*1.1,i*1.2]),Ct(e,[-t*1.1,i*1.2])],h.LEAF3,[a]),n.mark([Ct(e,[-t*.75,-i*.55]),Ct(e,[t*.25,-i*.95]),Ct(e,[t*.55,-i*.35]),Ct(e,[-t*.2,-i*.05])],h.LEAF2,[a]);const d=Math.floor(e[0]-t*1.2),p=Math.ceil(e[0]+t*1.2),g=Math.floor(e[1]-i*1.2),v=Math.ceil(e[1]+i*1.2),x=s()*1e4|0;for(let m=g;m<=v;m++)for(let M=d;M<=p;M++){const _=n.get(M,m);if(_!==a&&_!==h.LEAF2&&_!==h.LEAF3)continue;const S=Pt(M,m,x),w=Di(M/2,m/2,x)*.5+S*.5;w<.16*r.density?n.recolour(M,m,_===h.LEAF2?a:h.LEAF2):w>1-.16*r.density&&n.recolour(M,m,_===h.LEAF3?a:h.LEAF3)}}function Fi(n,e,t,i,r,s,a,o,{mat:c=h.TRUNK,bend:l=1,group:u=10,line:f=!1}={}){const d=[e],p=4;let g=t,v=e;for(let x=1;x<=p;x++)g+=(o()-.5)*.7*a.gnarl*l,v=Ct(v,[Math.cos(g)*i/p,Math.sin(g)*i/p]),d.push(v);return n.limb(d.map((x,m)=>[...x,r+(s-r)*m/p]),c,{group:u,line:f,round:a.round,cap:.6,capEnd:1}),{end:v,ang:g,pts:d}}function Na(n,e,t,i,r,s,a){if(n.shape([[e-i*1.05,t],[e-i*.62,t-i*.5],[e-i*.45,t-i*1.4],[e+i*.45,t-i*1.4],[e+i*.62,t-i*.5],[e+i*1.05,t]],h.TRUNK,{group:10,round:r.round}),r.roots<=0)return;const o=Math.round(2+r.roots*4);for(let c=0;c<o;c++){const l=c%2?1:-1,u=(8+s()*16)*a*(.4+r.roots),f=(2+s()*3)*a,d=[e+l*i*.2,t-i*.5],p=[e+l*(i*.55+u*.4),t-f],g=[e+l*(i*.5+u),t-.5];n.limb([[...d,i*.55],[...p,i*.28],[...g,1.2]],h.TRUNK,{group:11,round:r.round,cap:.5,capEnd:.6})}}function Ua(n,e,t=!0){if(!(e.bark<=0))for(let i=0;i<n.h;i++)for(let r=0;r<n.w;r++){const s=i*n.w+r;if(n.m[s]!==h.TRUNK)continue;const a=t?Di(r/1.3,i/6,21):Di(r/6,i/1.3,21);a>1-e.bark*.42||Pt(r,i,4)<e.bark*.05?n.m[s]=h.BARKD:a>1-e.bark*.62&&n.n[s*3]<-.1&&(n.m[s]=h.BARKL)}}function Ur(n,e,t){let i=n.w,r=-1,s=n.h;for(let d=0;d<n.h;d++)for(let p=0;p<n.w;p++)n.m[d*n.w+p]&&(i=Math.min(i,p),r=Math.max(r,p),s=Math.min(s,d));if(r<0)return{sp:n,crownY:t};const a=Math.max(e-i,r-e)+2,o=Math.max(0,Math.floor(e-a)),c=Math.min(n.w-o,Math.ceil(a*2)+1),l=Math.max(0,s-1),u=n.h-l,f=new Mn(c,u);for(let d=0;d<u;d++)for(let p=0;p<c;p++){const g=(d+l)*n.w+p+o,v=d*c+p;f.m[v]=n.m[g],f.g[v]=n.g[g],f.n[v*3]=n.n[g*3],f.n[v*3+1]=n.n[g*3+1],f.n[v*3+2]=n.n[g*3+2]}return{sp:f,crownY:t-l}}const ms=n=>(n.crownWidth||3)/3;function eu(n,e,t){const i=ms(e),r=Math.round(220*t*i+60*t),s=Math.round(140*t),a=new Mn(r,s),o=r/2,c=s,l=e.treeTrunks||1,u=12*t*(e.treeThick||1)*(e.treeThin?.55:1)/Math.sqrt(l),f=(n()-.5)*.5*e.gnarl+(e.treeLean||0),d=[];let p=s;const g=(v,x,m,M,_)=>{const S=Fi(a,v,x,m,M,M*.65,e,n,{group:12});if(_===0){d.push(S.end);return}const w=n()<.35?3:2;for(let E=0;E<w;E++){const L=(E-(w-1)/2)*ye(n,.5,.85)*(_===3?1.4:1);g(S.end,S.ang+L+(n()-.5)*.25,m*ye(n,.6,.78),M*.62,_-1)}_<=2&&d.push(vi(v,S.end,.7))};for(let v=0;v<l;v++){const x=f+(l>1?(v/(l-1)-.5)*.8:0),m=[o+(v-(l-1)/2)*u*.6,c],M=Fi(a,m,-Math.PI/2+x,s*.36*(l>1?ye(n,.75,1.15):1),u,u*.72,e,n,{bend:1.4});p=Math.min(p,M.end[1]);for(const _ of[-1,1])g(M.end,-Math.PI/2+x*.5+_*ye(n,.55,.95)*(.7+.3*i)*(l>1?.6:1),s*.22*(.75+.25*i)*(l>1?.7:1),u*.7,l>2?2:3);if(l===1&&n()<.7&&g(M.end,-Math.PI/2+(n()-.5)*.3,s*.18,u*.55,2),v===0&&e.treeHollow){const _=vi(m,M.end,.38);a.ellipse(_[0],_[1],u*.28,u*.5,h.NOSE,{round:.3})}}if(Na(a,o,c,u*Math.sqrt(l),e,n,t),Ua(a,e),e.treeWebs)for(let v=0;v+1<d.length;v+=2){const x=d[v],m=d[v+1],M=Math.hypot(m[0]-x[0],m[1]-x[1]);if(M<40*t)for(let _=0;_<=M;_++){const S=vi(x,m,_/M);a.px(S[0],S[1]+Math.sin(_/M*Math.PI)*M*.15,h.WEB,0,0,1)}}if(e.treeBare)return Ur(a,o,p+4*t);d.sort((v,x)=>v[1]-x[1]);for(const v of d)ji(a,Ct(v,[0,-3*t]),ye(n,14,21)*t,ye(n,10,14)*t,e,n,{mat:n()<.35?h.LEAF3:h.LEAF});for(const v of d)n()<.75&&ji(a,Ct(v,[ye(n,-9,9)*t,ye(n,-12,-3)*t]),ye(n,10,15)*t,ye(n,7,10)*t,e,n);return Ur(a,o,p+4*t)}function zl(n,e,t){const i=.8+.2*ms(e),r=Math.round(90*t*i),s=Math.round(160*t),a=new Mn(r,s),o=r/2,c=s;a.limb([[o,c,6*t],[o,c-s*.5,4*t],[o,6*t,1.5]],h.TRUNK,{group:10,round:e.round}),Na(a,o,c,6*t,e,n,t*.6),Ua(a,e);const l=Math.round(ye(n,9,12));for(let u=l-1;u>=0;u--){const f=u/(l-1),d=6*t+f*s*.7,p=(5+f*36)*t*i*ye(n,.9,1.1),g=(5+f*13)*t,v=[[o,d-4*t],[o+p*.5,d+g*.3],[o+p,d+g],[o+p*.7,d+g*1.15],[o,d+g*.7],[o-p*.7,d+g*1.15],[o-p,d+g],[o-p*.5,d+g*.3]];a.shape(La(v,1,7,Math.max(2,Math.round(p/(3*t))),2*t,1),h.LEAF,{group:30+u,line:!1,round:e.round}),a.mark([[o-p,d+g*.55],[o+p,d+g*.55],[o+p,d+g*1.4],[o-p,d+g*1.4]],h.LEAF3,[h.LEAF]),a.mark([[o-p*.55,d-2*t],[o+p*.1,d-3*t],[o+p*.1,d+g*.45],[o-p*.7,d+g*.7]],h.LEAF2,[h.LEAF])}return Ur(a,o,s*.82)}function tu(n,e,t){const i=ms(e),r=Math.round(200*t*i+50*t),s=Math.round(130*t),a=new Mn(r,s),o=r/2,c=s,l=13*t,u=Fi(a,[o,c],-Math.PI/2+(n()-.5)*.3,s*.3,l,l*.8,e,n,{bend:1.6}),f=[];for(let g=0;g<5;g++){const v=g%2?1:-1,x=-Math.PI/2+v*ye(n,.55,1.25)*(.7+.3*i),m=Fi(a,u.end,x,s*ye(n,.3,.42)*(.8+.2*i),l*.55,l*.3,e,n,{group:12});f.push(m.end)}Na(a,o,c,l,e,n,t),Ua(a,e);for(const g of f)ji(a,Ct(g,[0,-2*t]),ye(n,20,28)*t,ye(n,9,12)*t,e,n);ji(a,Ct(u.end,[0,-8*t]),24*t,11*t,e,n);let d=r,p=0;for(const g of f)d=Math.min(d,g[0]-22*t),p=Math.max(p,g[0]+22*t);for(let g=d;g<p;g+=ye(n,1,1.7)){let v=s;for(let _=0;_<s;_++)if(a.get(g,_)===h.LEAF||a.get(g,_)===h.LEAF2||a.get(g,_)===h.LEAF3){v=_;break}if(v>=s)continue;const x=Math.abs(g-o)/(r/2),m=(c-v)*ye(n,.5,.9)*(1-x*.3),M=Pt(g|0,1,9)<.4?h.LEAF2:h.LEAF;for(let _=v+2;_<Math.min(c-2,v+m);_++){const S=Math.round(Math.sin(_*.12+g)*.7);Pt(g|0,_,5)<.2+e.density*.8&&a.px(g+S,_,(_-v)/m>.8?h.LEAF3:M,S*.3,.2,.95)}}return Ur(a,o,u.end[1]+6*t)}function nu(n,e,t){const i=.7+.3*ms(e),r=Math.round(110*t*i),s=Math.round(155*t),a=new Mn(r,s),o=r/2,c=s,l=(n()-.5)*.25+(e.treeLean||0),u=Fi(a,[o,c],-Math.PI/2+l,s*.85,5*t,2*t,e,n,{mat:h.BARK2,bend:.4});for(let d=0;d<u.pts.length-1;d++)for(let p=0;p<1;p+=1/8){const g=vi(u.pts[d],u.pts[d+1],p+n()*.1);if(n()<.55)for(let v=-3;v<=3;v++)a.get(g[0]+v,g[1])===h.BARK2&&n()<.8&&a.recolour(g[0]+v,g[1],h.BARKD)}const f=[u.end];for(let d=0;d<7;d++){const p=ye(n,.35,.9),g=vi(u.pts[0],u.end,p),v=d%2?1:-1,x=Fi(a,g,-Math.PI/2+v*ye(n,.5,1),s*ye(n,.12,.2)*i,2*t,1,e,n,{mat:h.BARKD,group:12});f.push(x.end)}for(const d of f)ji(a,d,ye(n,9,13)*t*i,ye(n,7,10)*t,e,n,{mat:h.LEAF2,ragged:1.3});return Ur(a,o,s*.55)}function iu(n,e,t){const i=ms(e),r=Math.round(220*t*i+50*t),s=Math.round(120*t),a=new Mn(r,s),o=r/2,c=s,l=10*t,u=Fi(a,[o,c],-Math.PI/2+(n()-.5)*.4*(e.gnarl+.3),s*.4,l,l*.75,e,n,{bend:1.2}),f=[];for(const g of[-1,1,-1,1]){const v=Fi(a,u.end,-Math.PI/2+g*ye(n,.7,1.15)*(.7+.3*i),s*ye(n,.3,.42)*(.7+.3*i),l*.55,l*.25,e,n,{group:12});f.push(v.end,vi(u.end,v.end,.55))}Na(a,o,c,l,e,n,t),Ua(a,e);const d=Math.round(ye(n,2,3)),p=Math.min(...f.map(g=>g[1]));for(let g=0;g<d;g++){const v=p-6*t+g*9*t,x=(95-g*12)*t*(.65+.35*i);for(let m=0;m<5;m++)ji(a,[o+(m-2)*x*.36+ye(n,-5,5)*t,v+ye(n,-3,3)*t],x*ye(n,.2,.26),7*t,e,n,{mat:g===d-1?h.LEAF:h.LEAF3})}return Ur(a,o,u.end[1]+4*t)}function kl(n,e,t){const i=e.leafHue+(n()-.5)*e.leafVariety*.7+(t===zl?.06:0);return{[h.TRUNK]:ge(e.trunkHue,.45*e.sat,.34),[h.BARKD]:ge(e.trunkHue+.03,.5*e.sat,.17),[h.BARKL]:ge(e.trunkHue-.01,.38*e.sat,.5),[h.BARK2]:[222,220,212],[h.LEAF]:ge(i,.62*e.sat,.58),[h.LEAF2]:ge(i-.05,.55*e.sat,.8),[h.LEAF3]:ge(i+.03,.66*e.sat,.38),[h.WEB]:[225,225,232]}}function Ef(n){const{sp:e,crownY:t}=n,i=new Mn(e.w,e.h),r=new Mn(e.w,e.h);for(let s=0;s<e.h;s++)for(let a=0;a<e.w;a++){const o=s*e.w+a,c=e.m[o];if(!c)continue;(wf.has(c)&&s>=t?r:i).put(a,s,c,e.n[o*3],e.n[o*3+1],e.n[o*3+2])}return{top:i,bot:r}}function Af(n,e){const t=e.bushSize,i=Gh(n,["round","round","fern","grass","shrub"]),r=Math.round(40*t),s=Math.round(28*t),a=new Mn(r,s);if(i==="round"||i==="shrub"){const c=i==="shrub"?5:3;for(let l=0;l<c;l++)ji(a,[r/2+ye(n,-9,9)*t,s-8*t+ye(n,-4,2)*t],ye(n,7,10)*t,ye(n,5,8)*t,e,n);if(i==="shrub"||n()<e.flowers)for(let l=0;l<18*e.flowers+3;l++){const u=r/2+ye(n,-12,12)*t,f=s-ye(n,5,17)*t;a.get(u,f)&&a.recolour(u,f,h.FLOWER)}}else if(i==="fern")for(let c=0;c<7;c++){const l=-Math.PI/2+(c/6-.5)*2.4;let u=r/2,f=s-1;for(let d=0;d<15*t;d++)u+=Math.cos(l)*.9,f+=Math.sin(l)*.9+d*.06,a.put(u,f,c%2?h.LEAF3:h.LEAF,Math.cos(l)*.4,-.2,.9),d%2&&(a.put(u,f-1,h.LEAF2,0,-.5,.85),a.put(u+Math.sign(Math.cos(l)),f+1,h.LEAF,0,.3,.9))}else for(let c=0;c<18*t;c++){const l=r/2+ye(n,-13,13)*t,u=ye(n,5,15)*t,f=ye(n,-3,3);for(let d=0;d<u;d++)a.put(l+f*d/u*(d/u),s-1-d,d>u*.65?h.LEAF2:d<u*.3?h.LEAF3:h.LEAF,f*.1,-.3,.9)}const o=kl(n,e,null);return o[h.FLOWER]=ge(n(),.55,.95),{sp:a,colours:o}}const ht=(n,e={})=>["tree",{type:n,...e}],Fe=(n,e={})=>[n,e],gs=[{id:"moor",name:"Moor",creature:"badger",by:"Ed",leaf:.24,floor:["moss",.26,.45,.42],text:{floor:"moss",wall:"puddles, a lake",small:"long grass",big:"moss mounds"},wall:[Fe("water",{w:1.6})],small:[Fe("grass",{h:1.4})],big:[Fe("mound",{moss:!0})]},{id:"fern-forest",name:"Fern forest",creature:"boar",by:"Ed",leaf:.3,floor:["needles",.08,.45,.32],text:{floor:"pine needles",small:"ferns",big:"pine trees"},small:[Fe("fern")],big:[ht("fir")]},{id:"muddy-forest",name:"Muddy forest",creature:"snail",by:"Ed",leaf:.22,floor:["mud",.07,.5,.28],text:{floor:"mud and leaves",small:"short trunks with broken branches",big:"trees with many trunks and branches"},small:[Fe("stump",{snag:!0})],big:[ht("broad",{trunks:3,gnarl:.9})]},{id:"stone-shrine",name:"Stone shrine",creature:"fox",by:"Ed",leaf:.28,floor:["stony",.25,.3,.45],text:{floor:"grassy, stony",wall:"mossy henges",small:"little stones",big:"big stones",set:"a shrine"},wall:[Fe("henge")],small:[Fe("stones")],big:[Fe("boulder")],set:Fe("shrine")},{id:"tangly-forest",name:"Tangly forest",creature:"ram",by:"Ed",leaf:.27,floor:["nettles",.28,.5,.3],text:{floor:"nettles and earth",small:"tangled branches",big:"fairly short tangly trees"},small:[Fe("bramble",{bare:!0})],big:[ht("broad",{scale:.7,gnarl:1})]},{id:"wispy-forest",name:"Wispy forest",creature:"woodlouse",by:"Ed",leaf:.2,floor:["leaves",.09,.55,.45],text:{floor:"dry leaves",small:"tall thin wispy trees",big:"thick trees with several trunks"},small:[ht("birch",{scale:.75})],big:[ht("broad",{trunks:3,thick:1.4})]},{id:"hazel-forest",name:"Hazel forest",creature:"hedgehog",by:"Ed",leaf:.26,floor:["grass",.24,.45,.45],text:{floor:"short grass",small:"brown lumps",big:"crooked trees with many branches"},small:[Fe("mound",{brown:!0})],big:[ht("broad",{gnarl:1,scale:.85})]},{id:"garden",name:"Garden",creature:"squirrel",by:"Ed",leaf:.3,floor:["lawn",.27,.5,.5],text:{floor:"uniform grass",wall:"ornate stone wall",small:"manicured flower beds",big:"willows",set:"a stone pavilion"},wall:[Fe("wall")],small:[Fe("flowerbed")],big:[ht("willow")],set:Fe("pavilion")},{id:"twiggy-forest",name:"Twiggy forest",creature:"wolf",by:"Ed",leaf:.29,floor:["plants",.3,.5,.38],text:{floor:"small leafy plants",small:"small trees with many thin trunks",big:"straight but slanted trees with many trunks"},small:[ht("broad",{trunks:4,scale:.5,thin:!0})],big:[ht("broad",{trunks:3,lean:.3,gnarl:.1})]},{id:"ancient",name:"Ancient",creature:"stag",by:"Ed",leaf:.31,floor:["roots",.1,.25,.35],text:{floor:"mossy roots over rocks",small:"sorrel",big:"giant gnarly slanted trees"},small:[Fe("flowers",{hue:.98,leafy:!0})],big:[ht("broad",{scale:1.4,gnarl:1,lean:.35})]},{id:"norway",name:"Norway",creature:"stoat",by:"Ed",leaf:.36,floor:["slate",.6,.15,.35],text:{floor:"pine needles and slate",small:"rocks",big:"straight pines"},small:[Fe("stones",{big:!0})],big:[ht("fir",{scale:1.2})]},{id:"alder-forest",name:"Alder forest",creature:"snake",by:"Ed",leaf:.23,floor:["tallgrass",.22,.45,.42],text:{floor:"tall and short grass",small:"tree stumps with tall grass around",big:"tall slanted trees with thin leaves at different heights"},small:[Fe("stump",{grass:!0})],big:[ht("birch",{lean:.3,scale:1.2,dark:!0})]},{id:"meadow",name:"Meadow",creature:"hare",by:"draft",leaf:.25,floor:["flowers",.25,.5,.5],text:{floor:"grass and wildflowers",small:"scattered hawthorn",big:"lone oaks"},small:[Fe("shrub",{flower:[250,245,235]})],big:[ht("broad",{scale:1.1})]},{id:"old-oaks",name:"Old oaks",creature:"owl",by:"draft",leaf:.22,floor:["leaves",.07,.5,.35],text:{floor:"leaf litter",small:"acorns, fallen branches",big:"ancient gnarled oaks with hollow trunks",set:"a great hollow oak"},small:[Fe("cones",{acorn:!0}),Fe("log",{branch:!0})],big:[ht("broad",{gnarl:.9,hollow:!0})],set:ht("broad",{scale:1.6,gnarl:1,hollow:!0})},{id:"berry-thicket",name:"Berry thicket",creature:"bear",by:"draft",leaf:.32,floor:["needles",.08,.45,.3],text:{floor:"pine needles",wall:"bramble thickets",small:"berry bushes",big:"tall pines"},wall:[Fe("bramble")],small:[Fe("shrub",{flower:[200,30,60]})],big:[ht("fir",{scale:1.3})]},{id:"wetland",name:"Wetland",creature:"toad",by:"draft",leaf:.2,floor:["mud",.15,.45,.3],text:{floor:"wet mud",wall:"puddles, reeds",small:"reeds and rushes",big:"willows"},wall:[Fe("water"),Fe("reeds",{tall:!0})],small:[Fe("reeds")],big:[ht("willow")]},{id:"stream",name:"Stream",creature:"otter",by:"draft",leaf:.27,floor:["pebbles",.25,.3,.45],text:{floor:"pebbles and grass",wall:"a stream or pond",small:"alder saplings",big:"alders",set:"a fallen-log bridge"},wall:[Fe("water",{w:2})],small:[ht("broad",{scale:.45})],big:[ht("broad",{scale:.95,gnarl:.3})],set:Fe("bridge")},{id:"rocky-slope",name:"Rocky slope",creature:"lynx",by:"draft",leaf:.34,floor:["scree",.2,.2,.42],text:{floor:"scree and moss",wall:"boulders",small:"rocks",big:"pines",set:"a rocky outcrop"},wall:[Fe("boulder",{big:!0})],small:[Fe("stones",{big:!0})],big:[ht("fir")],set:Fe("outcrop")},{id:"bog",name:"Bog",creature:"elk",by:"draft",leaf:.38,floor:["moss",.18,.55,.4],text:{floor:"sphagnum moss",wall:"bog pools",small:"cotton grass",big:"spruce"},wall:[Fe("water",{bog:!0})],small:[Fe("reeds",{cotton:!0})],big:[ht("fir",{dark:!0})]},{id:"deadwood",name:"Deadwood",creature:"raven",by:"draft",leaf:.15,floor:["earth",.07,.35,.3],text:{floor:"bare earth",small:"broken branches",big:"blasted dead trees"},small:[Fe("log",{branch:!0})],big:[ht("broad",{bare:!0,gnarl:1})]},{id:"cave-mouth",name:"Cave mouth",creature:"bat",by:"draft",leaf:.2,floor:["stone",.08,.15,.35],text:{floor:"stone and roots",wall:"rock walls",small:"stalagmite stubs",big:"dead trees",set:"a cave mouth"},wall:[Fe("rockwall")],small:[Fe("stalagmite")],big:[ht("broad",{bare:!0})],set:Fe("cave")},{id:"grassland",name:"Grassland",creature:"mole",by:"draft",leaf:.25,floor:["grass",.26,.5,.48],text:{floor:"short turf",small:"molehills",big:"lone birches"},small:[Fe("mound",{brown:!0,small:!0})],big:[ht("birch")]},{id:"beaver-pond",name:"Beaver pond",creature:"beaver",by:"draft",leaf:.17,floor:["leaves",.13,.6,.5],text:{floor:"birch leaves",wall:"a pond",small:"stumps",big:"birch and aspen",set:"a beaver dam"},wall:[Fe("water",{w:2})],small:[Fe("stump",{gnawed:!0})],big:[ht("birch")],set:Fe("dam")},{id:"log-pile",name:"Log pile",creature:"beetle",by:"draft",leaf:.22,floor:["leaves",.06,.5,.3],text:{floor:"rotting leaves",small:"fungi",big:"rotting logs",set:"a fallen giant"},small:[Fe("fungi")],big:[Fe("log",{rot:!0})],set:Fe("log",{rot:!0,giant:!0})},{id:"heath",name:"Heath",creature:"moth",by:"draft",leaf:.27,floor:["heather",.85,.35,.4],text:{floor:"heather",small:"gorse",big:"wind-bent birches"},small:[Fe("shrub",{flower:[250,205,40],spiky:!0})],big:[ht("birch",{lean:.45,scale:.75})]},{id:"old-pinewood",name:"Old pinewood",creature:"marten",by:"draft",leaf:.35,floor:["needles",.07,.4,.3],text:{floor:"pine needles",small:"pine cones",big:"tall old pines with knotholes"},small:[Fe("cones")],big:[ht("fir",{scale:1.35})]},{id:"ravine",name:"Ravine",creature:"salamander",by:"draft",leaf:.3,floor:["stone",.3,.3,.32],text:{floor:"wet moss and rock",wall:"rock walls",small:"ferns",big:"mossy boulders",set:"a waterfall"},wall:[Fe("rockwall",{moss:!0})],small:[Fe("fern")],big:[Fe("boulder",{moss:!0,big:!0})],set:Fe("waterfall")},{id:"bluebell-glade",name:"Bluebell glade",creature:"glowworm",by:"draft",leaf:.26,floor:["bluebells",.27,.45,.4],text:{floor:"bluebells",small:"ferns",big:"beeches"},small:[Fe("fern")],big:[ht("broad",{gnarl:.2,scale:1.1})]},{id:"holly-thicket",name:"Holly thicket",creature:"spider",by:"draft",leaf:.36,floor:["leaves",.08,.35,.28],text:{floor:"dead leaves",wall:"holly hedges",small:"cobwebs",big:"hollies",set:"a web-hung dead tree"},wall:[Fe("hedge",{berries:!0})],small:[Fe("web")],big:[ht("broad",{scale:.7,dark:!0})],set:ht("broad",{bare:!0,webs:!0})},{id:"honeysuckle-tangle",name:"Honeysuckle tangle",creature:"dormouse",by:"draft",leaf:.25,floor:["clover",.27,.45,.45],text:{floor:"grass and clover",wall:"bramble",small:"honeysuckle",big:"hazel coppice"},wall:[Fe("bramble")],small:[Fe("shrub",{flower:[250,230,170]})],big:[ht("broad",{trunks:5,scale:.7,thin:!0})]}];for(const[n,[e,t]]of Object.entries($h)){const i=gs.find(r=>r.id===n);i&&!i.set&&(i.set=Fe(e,{three:!0}),i.text={...i.text,set:t})}const Tf=Object.fromEntries(gs.map(n=>[n.id,n])),Rf=["ruins","rocks","freak","lake","modern"],xt=(n,e,t,i,r,s,a,o,c,l,u={})=>({pattern:n,...u,density:e,clump:t,glades:{count:i[0],size:i[1]||[0,0]},heightMix:r&&{sapling:r[0],mature:r[1],tall:r[2],giant:r[3]},undergrowth:s,lean:{dir:a[0],amount:a[1]},terrain:o,decor:{rate:c[0],...Object.fromEntries(Rf.map((f,d)=>[f,c[1][d]]))},feel:l}),Dt=[0,0],Cf={moor:xt("scatter",.2,.6,[2,[14,24]],null,.7,[30,.2],["pools","mounds","hollows"],[.5,[.3,.4,0,.3,0]],"Open rolling moss, low mounds and dark pools, long grass combed one way by the wind; you can see a long way."),"fern-forest":xt("groves",.65,.6,[2,[8,12]],[.2,.5,.25,.05],.9,Dt,["hollows","paths"],[.25,[.4,.3,.3,0,0]],"Pine groves standing waist-deep in ferns, with green sunken hollows between them."),"muddy-forest":xt("scatter",.7,.3,[1,[6,9]],[.25,.55,.17,.03],.4,Dt,["pools","paths"],[.3,[.3,.1,.2,.1,.3]],"Squelching mud between many-trunked trees, puddled ruts winding through, broken stumps everywhere."),"stone-shrine":xt("rings",.35,.8,[1,[10,14]],null,.3,Dt,["rocky","mounds"],[.5,[.6,.4,0,0,0]],"Big stones stand in rings round the shrine on stony grass; it feels deliberate and old."),"tangly-forest":xt("thicket",.9,.2,[1,[5,8]],[.35,.55,.1,0],.9,Dt,["hollows"],[.2,[.2,0,.6,0,.2]],"Short tangled trees packed close over nettles, low and claustrophobic, with one small clearing."),"wispy-forest":xt("stands",.55,.7,[2,[6,10]],[.15,.45,.3,.1],.5,Dt,["ridges"],[.3,[.4,.2,.3,0,.1]],"Stands of thick many-trunked trees, thin wispy saplings drifting between them over dry leaves."),"hazel-forest":xt("rings",.6,.6,[2,[6,9]],[.3,.55,.12,.03],.5,Dt,["mounds","paths"],[.3,[.4,.3,.3,0,0]],"Crooked hazels grown in loose fairy rings on short grass, lumpy little mounds in the middle of each."),garden:xt("rows",.45,0,[3,[6,10]],[.1,.7,.2,0],.6,Dt,["paths","pools"],[.4,[.7,0,0,.2,.1]],"A lost formal garden: willows in avenues along straight paths, lawns and flower beds, a pavilion at the heart.",{along:"paths"}),"twiggy-forest":xt("scatter",.75,.3,[1,[6,10]],[.25,.5,.2,.05],.6,[60,.5],["paths"],[.25,[.3,.2,.3,0,.2]],"Straight many-trunked trees all slanting the same way, like a wood frozen in a gale."),ancient:xt("lone",.4,.2,[1,[12,18]],[.05,.35,.4,.2],.4,[150,.25],["rocky","mounds","hollows"],[.45,[.5,.2,.3,0,0]],"Giant gnarled trees far apart, roots heaving over mossy rocks; every tree is a landmark."),norway:xt("stands",.8,.5,[1,[8,12]],[.15,.45,.35,.05],.2,Dt,["rocky","ridges"],[.3,[.2,.6,0,.2,0]],"Dense stands of straight pines on slate ridges, bare rock between; dark, vertical and cold."),"alder-forest":xt("scatter",.55,.4,[2,[6,10]],[.2,.4,.35,.05],.6,[120,.35],["stream","hollows"],[.3,[.3,.1,.2,.3,.1]],"Tall slanted alders at every height over long grass and stumps, a little stream wandering through."),meadow:xt("lone",.12,.1,[0],[.2,.5,.25,.05],.3,Dt,["mounds","paths"],[.35,[.3,.3,0,.2,.2]],"Wide-open wildflower grass with a lone oak here and there and scattered hawthorn; the sky does the work."),"old-oaks":xt("groves",.5,.5,[2,[10,16]],[.1,.35,.4,.15],.5,Dt,["mounds","hollows"],[.4,[.5,.1,.4,0,0]],"Groves of huge hollow oaks with broad clearings of leaf litter between; slow and grand."),"berry-thicket":xt("thicket",.85,.5,[2,[4,7]],[.2,.4,.35,.05],1,Dt,["paths"],[.15,[.3,0,.4,0,.3]],"Tall pines over solid berry bushes and brambles, only narrow animal paths and a couple of pockets of space."),wetland:xt("edgeOnly",.5,.5,[1,[16,24]],[.25,.55,.15,.05],.8,Dt,["pools","stream"],[.35,[.2,0,0,.6,.2]],"Open reedy water and mud in the middle, willows crowding the rim; wet and echoing."),stream:xt("rows",.5,.2,[1,[6,10]],[.3,.45,.2,.05],.5,Dt,["stream","pools"],[.3,[.3,.3,0,.3,.1]],"Alders lining both banks of a pebbly stream, saplings at the water's edge, open grass away from it.",{along:"stream"}),"rocky-slope":xt("scatter",.35,.6,[1,[8,12]],[.3,.5,.18,.02],.2,[90,.15],["rocky","ridges"],[.5,[.3,.7,0,0,0]],"Scree and boulders with pines clinging in clumps, everything leaning slightly uphill."),bog:xt("stands",.25,.85,[3,[10,20]],[.4,.5,.1,0],.6,Dt,["pools","mounds"],[.35,[.2,0,0,.5,.3]],"Sphagnum and bog pools, stunted spruce in tight dark stands, cotton grass pale between them."),deadwood:xt("scatter",.25,.2,[2,[8,14]],[.05,.3,.45,.2],.15,Dt,["ridges","hollows"],[.45,[.3,.1,.3,0,.3]],"Sparse tall blasted snags on bare ridges; bleak, quiet, with long sightlines."),"cave-mouth":xt("edgeOnly",.4,.5,[1,[10,14]],[.2,.5,.3,0],.2,Dt,["rocky","ridges"],[.4,[.3,.6,0,0,.1]],"Rock walls and dead trees ring an open stone floor that leads to the cave's dark mouth."),grassland:xt("lone",.1,.5,[0],[.3,.5,.2,0],.2,Dt,["mounds"],[.35,[.3,.2,0,.1,.4]],"Short turf to the horizon, molehills, birches alone or in twos and threes."),"beaver-pond":xt("edgeOnly",.55,.4,[1,[14,20]],[.4,.45,.15,0],.4,Dt,["pools","stream"],[.4,[.1,0,0,.7,.2]],"A pond in the middle, young birch and aspen round it, gnawed stumps where the big ones were felled."),"log-pile":xt("groves",.5,.7,[2,[6,10]],null,.7,Dt,["hollows","mounds"],[.3,[.3,0,.4,0,.3]],"Rotting logs heaped in piles, fungi everywhere, damp hollows between the heaps."),heath:xt("scatter",.2,.3,[1,[12,18]],[.5,.45,.05,0],.8,[30,.6],["ridges","paths"],[.4,[.4,.4,0,0,.2]],"Purple heather and gorse, small birches bent hard by the wind, all the same way."),"old-pinewood":xt("scatter",.5,.3,[2,[8,14]],[.1,.35,.4,.15],.15,Dt,["mounds","paths"],[.35,[.4,.3,.3,0,0]],"Cathedral-tall old pines on a clear floor of needles; you can see between the trunks a long way."),ravine:xt("edgeOnly",.55,.6,[1,[6,9]],null,.8,Dt,["stream","ridges","rocky"],[.4,[.3,.5,0,.2,0]],"A deep wet cleft: rock walls and mossy boulders either side, ferns, a stream down the middle."),"bluebell-glade":xt("groves",.45,.5,[3,[8,14]],[.1,.5,.35,.05],.3,Dt,["hollows"],[.35,[.4,0,.3,.3,0]],"Beech groves round open glades carpeted in bluebells; soft, bright and airy."),"holly-thicket":xt("thicket",.9,.3,[1,[6,9]],[.3,.6,.1,0],.7,Dt,["hollows"],[.25,[.3,0,.5,0,.2]],"Dark hollies packed close, cobwebs strung between, one clearing round the web-hung tree."),"honeysuckle-tangle":xt("stands",.6,.7,[2,[5,8]],[.45,.5,.05,0],.8,Dt,["paths","mounds"],[.3,[.3,0,.3,0,.4]],"Hazel coppice stools in clumps, honeysuckle and bramble between, clover paths winding through.")};for(const n of gs)n.layout=Cf[n.id];function Lf(n,e,t=64,i=48){const[r,s,a,o]=n.floor,c=new Mn(t,i),l=n.id.length*131;for(let v=0;v<i;v++)for(let x=0;x<t;x++){const m=(Di(x/7,v/5,l)*(t-x)*(i-v)+Di((x-t)/7,v/5,l)*x*(i-v)+Di(x/7,(v-i)/5,l)*(t-x)*v+Di((x-t)/7,(v-i)/5,l)*x*v)/(t*i),M=m<.38?h.BODY2:m>.64?h.BELLY:h.BODY;c.px(x,v,M,0,-.42,.91)}const u=Ca(l),f=(v,x,m)=>c.px((v%t+t)%t,(x%i+i)%i,m,0,-.42,.91),d={moss:0,needles:70,mud:25,stony:30,nettles:60,leaves:80,grass:70,lawn:30,plants:60,roots:30,slate:40,tallgrass:90,flowers:70,pebbles:60,scree:70,earth:15,stone:40,heather:90,bluebells:90,clover:60}[r]??40;for(let v=0;v<d;v++){const x=Math.floor(u()*t),m=Math.floor(u()*i);if(r==="needles"){const M=u()<.5?1:-1;for(let _=0;_<3;_++)f(x+_*M,m+(_>>1),u()<.5?h.BODY2:h.ACCENT)}else if(["grass","lawn","tallgrass","plants","nettles","clover","flowers","bluebells","heather"].includes(r)){const M=r==="tallgrass"?4:r==="lawn"?1:2;for(let _=0;_<M;_++)f(x,m-_,_===M-1?h.LEAF2:h.LEAF);(r==="flowers"||r==="bluebells"||r==="heather"||r==="clover")&&u()<.5&&f(x+1,m-M,h.FLOWER)}else if(["stony","pebbles","scree","slate","stone","roots"].includes(r)){if(f(x,m,h.ACCENT),u()<.6&&f(x+1,m,h.ACCENT),u()<.4&&f(x,m+1,h.BODY2),r==="roots"&&u()<.5)for(let M=0;M<5;M++)f(x+M,m+(M>2?1:0),h.TRUNK)}else if(r==="leaves")f(x,m,h.FLOWER),f(x+1,m,h.FLOWER),u()<.5&&f(x,m+1,h.ACCENT);else if(r==="mud"||r==="earth")for(let M=0;M<3;M++)f(x+M,m,h.BODY2)}const p={flowers:ge(.13,.6,.95),bluebells:[90,110,230],heather:[180,90,170],clover:[240,235,240],leaves:ge(s+.02,.65,.6)}[r]||ge(s,.3,.6),g={[h.BODY]:ge(s,a*e.sat,o),[h.BODY2]:ge(s+.02,a*e.sat*1.1,o*.78),[h.BELLY]:ge(s-.02,a*e.sat*.9,Math.min(1,o*1.15)),[h.ACCENT]:r==="needles"?ge(.07,.5,.5):ge(.1,.08,.62),[h.FLOWER]:p,[h.LEAF]:ge(n.leaf,.55*e.sat,.45),[h.LEAF2]:ge(n.leaf-.03,.5*e.sat,.62),[h.TRUNK]:ge(e.trunkHue,.4,.3)};return{sp:c,colours:g}}const Yi=n=>({[h.ACCENT]:ge(.1,.06,.6),[h.BODY2]:ge(.62,.08,.4),[h.BELLY]:ge(.1,.05,.78),[h.LEAF]:ge(.27,.5,.45),[h.LEAF2]:ge(.25,.45,.62),[h.NOSE]:[20,16,24]});function Cr(n,e,t,i,r,s,a){const o=[];for(let c=0;c<8;c++){const l=c/8*Math.PI*2,u=1+(s()-.5)*.3;o.push([e[0]+Math.cos(l)*t*u,e[1]+Math.sin(l)*i*u*(Math.sin(l)>0?.5:1)])}n.shape(o,h.ACCENT,{group:5,line:!0,round:r.round}),n.mark([Ct(e,[-t,i*.1]),Ct(e,[t,i*.1]),Ct(e,[t,i]),Ct(e,[-t,i])],h.BODY2,[h.ACCENT]),n.mark([Ct(e,[-t*.6,-i*.8]),Ct(e,[t*.1,-i*1.1]),Ct(e,[t*.3,-i*.5]),Ct(e,[-t*.3,-i*.3])],h.BELLY,[h.ACCENT]),a&&n.mark(La([Ct(e,[-t*1.1,-i*.55]),Ct(e,[0,-i*1.3]),Ct(e,[t*1.1,-i*.5]),Ct(e,[t*.6,-i*.2]),Ct(e,[-t*.6,-i*.2])],0,3,3,i*.15,1),h.LEAF,[h.ACCENT,h.BELLY,h.BODY2])}function ra(n,e,t,i,r,s){const a={[h.LEAF]:ge(t.leaf,.6*i.sat,.55),[h.LEAF2]:ge(t.leaf-.05,.55*i.sat,.78),[h.LEAF3]:ge(t.leaf+.03,.66*i.sat,.36)},o={[h.TRUNK]:ge(i.trunkHue,.45*i.sat,.34),[h.BARKD]:ge(i.trunkHue+.03,.5*i.sat,.17),[h.BARKL]:ge(i.trunkHue-.01,.38*i.sat,.5),[h.BELLY]:ge(i.trunkHue+.02,.3,.7)},c={[h.MAGIC]:[60,110,150],[h.MAGIC2]:[150,200,220],[h.BODY2]:[35,70,100]};if(n==="tree"){const v={broad:eu,fir:zl,willow:tu,birch:nu,flat:iu}[e.type],x={...i,leafHue:t.leaf+(e.dark?.05:0),gnarl:e.gnarl??i.gnarl,treeBare:e.bare,treeTrunks:e.trunks,treeLean:e.lean,treeThick:e.thick,treeThin:e.thin,treeHollow:e.hollow,treeWebs:e.webs},m=v(r,x,i.treeSize*s*(e.scale||1)*ye(r,.9,1.1)),M=kl(r,x,v);return e.dark&&(M[h.LEAF]=M[h.LEAF3],M[h.LEAF3]=ge(t.leaf+.05,.7,.22)),M[h.NOSE]=[20,16,24],M[h.WEB]=[225,225,232],{sp:m.sp,colours:M}}if(n==="shrub"){const v=Af(r,{...i,leafHue:t.leaf,bushSize:i.bushSize*s,flowers:1});for(let x=0;x<v.sp.m.length;x++)v.sp.m[x]&&Pt(x,1,3)<(e.spiky?.18:.1)&&v.sp.m[x]!==h.TRUNK&&(v.sp.m[x]=h.FLOWER);return v.colours[h.FLOWER]=e.flower,v}const l=Math.round(48*s*(e.w||1)),u=Math.round(32*s),f=new Mn(l,u),d=l/2,p=u;let g={};if(n==="grass"||n==="reeds"||n==="fern"||n==="flowers"||n==="flowerbed"){const v=n==="flowerbed"?40:24,x=(n==="reeds"?e.tall?26:20:n==="fern"?14:10*(e.h||1))*s;n==="flowerbed"&&f.shape([[d-20*s,p-2],[d-18*s,p-6*s],[d+18*s,p-6*s],[d+20*s,p-2],[d+20*s,p],[d-20*s,p]],h.ACCENT,{group:2,line:!0});for(let m=0;m<v;m++){const M=d+ye(r,-16,16)*s,_=x*ye(r,.5,1),S=n==="fern"?ye(r,-6,6)*s:ye(r,-2,2)*s,w=p-1-(n==="flowerbed"?5*s:0);for(let E=0;E<_;E++){const L=E/_;f.px(M+S*L*L,w-E,L>.7?h.LEAF2:L<.3?h.LEAF3:h.LEAF,S*.05,-.3,.9),n==="fern"&&E%2&&f.px(M+S*L*L+(S>0?1:-1),w-E+1,h.LEAF2,0,-.3,.9)}if(n==="reeds"&&(e.cotton||r()<.5))for(let E=0;E<(e.cotton?2:3);E++)f.px(M+S,w-_-E,e.cotton?h.WEB:h.TRUNK,0,-.5,.85);(n==="flowers"||n==="flowerbed")&&r()<.7&&(f.px(M+S,w-_,h.FLOWER,0,-.5,.85),f.px(M+S+1,w-_,h.FLOWER,0,-.5,.85))}if(g={...a,[h.FLOWER]:n==="flowerbed"?Gh(r,[[230,80,120],[250,210,60],[150,110,230]]):ge(e.hue??.95,.6,.85),[h.TRUNK]:ge(.07,.5,.35),[h.WEB]:[240,240,235],[h.ACCENT]:ge(.08,.1,.55)},n==="flowerbed"){for(let m=0;m<f.m.length;m++)f.m[m]===h.FLOWER&&Pt(m,2,7)<.5&&(f.m[m]=h.BELLY);g[h.BELLY]=[250,245,240]}}else if(n==="stones"){for(let v=0;v<(e.big?3:6);v++)Cr(f,[d+ye(r,-14,14)*s,p-(e.big?5:2.5)*s],(e.big?6:3)*s*ye(r,.7,1.2),(e.big?5:2.5)*s,i,r);g=Yi()}else if(n==="boulder")Cr(f,[d,p-(e.big?11:8)*s],(e.big?18:13)*s,(e.big?12:9)*s,i,r,e.moss),g={...Yi(),...a,[h.ACCENT]:ge(.1,.06,.6)};else if(n==="henge")f.shape([[d-7*s,p],[d-8*s,p-18*s],[d-4*s,p-28*s],[d+5*s,p-27*s],[d+8*s,p-14*s],[d+7*s,p]],h.ACCENT,{group:5,line:!0,round:i.round}),f.mark([[d-9*s,p-30*s],[d+9*s,p-30*s],[d+9*s,p-22*s],[d-9*s,p-18*s]],h.LEAF,[h.ACCENT]),g={...Yi(),...a};else if(n==="mound"){const v=(e.small?8:14)*s,x=(e.small?5:8)*s;f.shape(La([[d-v,p],[d-v*.6,p-x*.8],[d,p-x],[d+v*.6,p-x*.8],[d+v,p]],0,4,e.moss?3:1,(e.moss?1.5:.8)*s,1),e.moss?h.LEAF:h.TRUNK,{group:5,round:i.round}),f.mark([[d-v,p-x*.45],[d+v,p-x*.45],[d+v,p],[d-v,p]],e.moss?h.LEAF3:h.BARKD,[e.moss?h.LEAF:h.TRUNK]),g={...a,...o,[h.TRUNK]:ge(.07,.45,e.brown?.35:.3)}}else if(n==="stump"){const v=6*s;if(f.limb([[d,p,v*2.2],[d,p-8*s,v*1.6]],h.TRUNK,{group:5,round:i.round,cap:0,capEnd:0}),f.shape([[d-v*.8,p-8*s],[d,p-10*s-(e.gnawed?4*s:0)],[d+v*.8,p-8*s],[d,p-7*s]],h.BELLY,{group:6,round:i.round}),e.snag&&f.limb([[d+v*.4,p-8*s,2.5*s],[d+v*1.6,p-15*s,1.5*s]],h.TRUNK,{group:7,round:i.round}),e.grass)for(let x=0;x<20;x++){const m=d+ye(r,-14,14)*s,M=ye(r,6,13)*s;for(let _=0;_<M;_++)f.px(m,p-1-_,_>M*.6?h.LEAF2:h.LEAF,0,-.3,.9)}g={...a,...o}}else if(n==="log"){const v=(e.giant?46:e.branch?18:30)*s,x=(e.giant?14:e.branch?3:8)*s;if(f.limb([[d-v/2,p-x/2,x],[d+v/2,p-x/2-(e.branch?2*s:0),x*.9]],h.TRUNK,{group:5,round:i.round,cap:.3,capEnd:.3}),e.branch||f.shape([[d+v/2-x*.1,p-x],[d+v/2+x*.2,p-x/2],[d+v/2-x*.1,p],[d+v/2-x*.3,p-x/2]],h.BELLY,{group:6,round:i.round}),e.rot)for(let m=0;m<(e.giant?6:3);m++){const M=d+ye(r,-v/2,v/3);f.shape([[M-3*s,p-x*.9],[M,p-x-3*s],[M+3*s,p-x*.9]],h.FLOWER,{group:7,line:!0,round:i.round})}e.branch&&f.limb([[d,p-x,x*.7],[d+5*s,p-x-6*s,x*.4]],h.TRUNK,{group:6,round:i.round}),g={...o,[h.FLOWER]:[230,190,120]}}else if(n==="fungi"){for(let v=0;v<5;v++){const x=d+ye(r,-12,12)*s,m=ye(r,3,7)*s,M=ye(r,3,5)*s;f.limb([[x,p,1.6*s],[x,p-m,1.4*s]],h.BELLY,{group:5}),f.shape([[x-M,p-m],[x,p-m-M*.8],[x+M,p-m]],v%2?h.FLOWER:h.MAGIC,{group:6+v%2,line:!0,round:i.round})}g={[h.BELLY]:[225,215,195],[h.FLOWER]:[190,80,50],[h.MAGIC]:[120,230,200]}}else if(n==="cones"){for(let v=0;v<6;v++){const x=d+ye(r,-14,14)*s,m=p-2*s;f.ellipse(x,m,(e.acorn?1.6:2)*s,(e.acorn?2:2.8)*s,h.TRUNK,{round:i.round}),e.acorn?f.ellipse(x,m-1.6*s,1.8*s,1*s,h.BARKD,{round:i.round}):f.px(x,m-1,h.BARKL)}g=o}else if(n==="water"){const v=22*s*(e.w||1),x=6*s;f.shape([[d-v,p-x],[d-v*.3,p-x*1.5],[d+v*.6,p-x*1.2],[d+v,p-x*.5],[d+v*.4,p],[d-v*.7,p-x*.2]],h.MAGIC,{group:5,round:.2});for(let m=0;m<6;m++){const M=d+ye(r,-v*.6,v*.6),_=p-x*ye(r,.4,1.1);for(let S=0;S<3*s;S++)f.recolour(M+S,_,h.MAGIC2)}g=e.bog?{[h.MAGIC]:[60,70,50],[h.MAGIC2]:[120,130,90]}:c;for(let m=0;m<f.m.length;m++)f.m[m]===h.MAGIC?f.m[m]=h.BODY:f.m[m]===h.MAGIC2&&(f.m[m]=h.BELLY);g={[h.BODY]:g[h.MAGIC],[h.BELLY]:g[h.MAGIC2]}}else if(n==="bramble"||n==="hedge"){const v=22*s,x=(n==="hedge"?18:12)*s;for(let m=0;m<(n==="hedge"?6:4);m++){const M=d+ye(r,-v*.8,v*.8),_=p-x*ye(r,.4,.7);f.ellipse(M,_,ye(r,6,9)*s,x*.45,n==="hedge"?h.LEAF3:h.LEAF,{round:i.round,density:e.bare?.5:.95,noise:.5,seed:m})}for(let m=0;m<8;m++){let _=d+ye(r,-v,v),S=p;for(let w=0;w<x*1.2;w++)_+=Math.sin(w*.3+m)*.8,S-=.8,f.px(_,S,h.TRUNK,0,-.3,.9)}if(n==="hedge"||e.berries||n==="bramble")for(let m=0;m<f.m.length;m++)f.m[m]&&f.m[m]!==h.TRUNK&&Pt(m,5,9)<.05&&(f.m[m]=h.FLOWER);g={...a,...o,[h.FLOWER]:n==="hedge"?[210,30,40]:[70,30,70]}}else if(n==="wall"){const v=22*s,x=12*s;f.shape([[d-v,p],[d-v,p-x],[d+v,p-x],[d+v,p]],h.ACCENT,{group:5,line:!0,depth:2}),f.shape([[d-v-1,p-x],[d-v-1,p-x-2*s],[d+v+1,p-x-2*s],[d+v+1,p-x]],h.BELLY,{group:6,line:!0,depth:2}),f.shape([[d+v-6*s,p-x-2*s],[d+v-6*s,p-x-7*s],[d+v,p-x-7*s],[d+v,p-x-2*s]],h.ACCENT,{group:7,line:!0,depth:2}),f.ellipse(d+v-3*s,p-x-9*s,3*s,2.5*s,h.BELLY,{round:i.round});for(let m=p-x+3*s;m<p;m+=4*s)for(let M=d-v;M<d+v;M++)f.recolour(M,m,h.BODY2);g=Yi()}else if(n==="rockwall"){for(let v=0;v<5;v++)Cr(f,[d+(v-2)*9*s,p-ye(r,8,14)*s],8*s,10*s,i,r,e.moss);g={...Yi(),...a}}else if(n==="stalagmite"){for(let v=0;v<4;v++){const x=d+ye(r,-14,14)*s,m=ye(r,5,11)*s;f.shape([[x-3*s,p],[x-1*s,p-m],[x+1*s,p-m],[x+3*s,p]],h.ACCENT,{group:5,line:!0,round:i.round})}g=Yi()}else if(n==="web"){const v=[d,p-14*s],x=11*s;for(let m=0;m<8;m++){const M=m/8*Math.PI*2;for(let _=0;_<x;_++)f.px(v[0]+Math.cos(M)*_,v[1]+Math.sin(M)*_,h.WEB,0,0,1)}for(let m=3*s;m<x;m+=3*s)for(let M=0;M<Math.PI*2;M+=.05)f.px(v[0]+Math.cos(M)*m,v[1]+Math.sin(M)*m,h.WEB,0,0,1);g={[h.WEB]:[225,230,240]}}return{sp:f,colours:g}}function Pf(n,e,t,i,r,s){if(e.three)return Ud(n,t,i);if(n==="tree"||n==="log")return ra(n,e,t,i,r,s);const a=Math.round(90*s),o=Math.round(70*s),c=new Mn(a,o),l=a/2,u=o;let f={...Yi(),[h.LEAF]:ge(t.leaf,.55,.5),[h.LEAF2]:ge(t.leaf-.04,.5,.7),[h.TRUNK]:ge(i.trunkHue,.45,.34),[h.BARKD]:ge(i.trunkHue+.03,.5,.17),[h.MAGIC]:ge(i.magicHue,.6,1),[h.MAGIC2]:ge(i.magicHue,.2,1)};if(n==="shrine")c.shape([[l-16*s,u],[l-14*s,u-6*s],[l+14*s,u-6*s],[l+16*s,u]],h.ACCENT,{group:5,line:!0,depth:2}),c.shape([[l-9*s,u-6*s],[l-9*s,u-26*s],[l+9*s,u-26*s],[l+9*s,u-6*s]],h.ACCENT,{group:6,line:!0,depth:2}),c.shape([[l-5*s,u-10*s],[l-5*s,u-20*s],[l,u-23*s],[l+5*s,u-20*s],[l+5*s,u-10*s]],h.NOSE,{group:7}),c.shape([[l-13*s,u-26*s],[l,u-34*s],[l+13*s,u-26*s]],h.BODY2,{group:8,line:!0,depth:2}),c.ellipse(l,u-13*s,2.5*s,2.5*s,h.MAGIC2,{round:.5}),c.mark([[l-14*s,u-36*s],[l+2*s,u-36*s],[l-4*s,u-24*s],[l-14*s,u-24*s]],h.LEAF,[h.BODY2,h.ACCENT]);else if(n==="pavilion"){c.shape([[l-26*s,u],[l-26*s,u-4*s],[l+26*s,u-4*s],[l+26*s,u]],h.ACCENT,{group:5,line:!0,depth:2});for(const d of[-20,-7,7,20])c.limb([[l+d*s,u-4*s,4*s],[l+d*s,u-34*s,4*s]],d===-7||d===7?h.BODY2:h.BELLY,{group:6+(d>0?1:0),line:!0,cap:0,capEnd:0});c.shape([[l-28*s,u-34*s],[l-28*s,u-38*s],[l+28*s,u-38*s],[l+28*s,u-34*s]],h.ACCENT,{group:8,line:!0,depth:2}),c.shape([[l-24*s,u-38*s],[l-16*s,u-54*s],[l,u-60*s],[l+16*s,u-54*s],[l+24*s,u-38*s]],h.BELLY,{group:9,line:!0})}else if(n==="bridge"){const d=ra("water",{w:1.8},t,i,r,s);for(let p=0;p<d.sp.m.length;p++){const g=p%d.sp.w,v=p/d.sp.w|0,x=Math.round(l-d.sp.w/2+g),m=u-d.sp.h+v;d.sp.m[p]&&c.inb(x,m)&&c.px(x,m,d.sp.m[p]===h.BODY?h.IRIS:h.PUPIL,0,-.42,.91)}c.limb([[l-34*s,u-6*s,9*s],[l+34*s,u-10*s,8*s]],h.TRUNK,{group:6,line:!0,cap:.3,capEnd:.3}),f[h.IRIS]=[60,110,150],f[h.PUPIL]=[150,200,220]}else if(n==="outcrop")for(const[d,p,g,v]of[[-18,14,16,13],[12,12,18,12],[-2,28,15,13],[16,34,9,9]])Cr(c,[l+d*s,u-p*s],g*s,v*s,i,r,!0);else if(n==="cave"){for(const[d,p,g,v]of[[-26,16,16,15],[26,16,16,15],[0,40,30,18],[-12,30,14,12],[12,30,14,12]])Cr(c,[l+d*s,u-p*s],g*s,v*s,i,r,p>30);c.shape([[l-15*s,u],[l-14*s,u-18*s],[l-4*s,u-28*s],[l+6*s,u-27*s],[l+14*s,u-16*s],[l+15*s,u]],h.NOSE,{group:9,line:!0})}else if(n==="dam"){const d=ra("water",{w:1.9},t,i,r,s);for(let p=0;p<d.sp.m.length;p++){const g=p%d.sp.w,v=p/d.sp.w|0,x=Math.round(l-d.sp.w/2+g),m=u-d.sp.h+v-10*s;d.sp.m[p]&&c.inb(x,m)&&c.px(x,m,d.sp.m[p]===h.BODY?h.IRIS:h.PUPIL,0,-.42,.91)}for(let p=0;p<26;p++){const g=l+ye(r,-32,32)*s,v=u-ye(r,2,14)*s,x=ye(r,-.5,.5),m=ye(r,8,16)*s;c.limb([[g-Math.cos(x)*m/2,v-Math.sin(x)*m/2,2.6*s],[g+Math.cos(x)*m/2,v+Math.sin(x)*m/2,2*s]],p%3?h.TRUNK:h.BARKD,{group:6+p%2,line:!0})}f[h.IRIS]=[60,110,150],f[h.PUPIL]=[150,200,220]}else if(n==="waterfall"){for(const[d,p,g,v]of[[-22,30,18,30],[22,30,18,30],[0,56,20,12]])Cr(c,[l+d*s,u-p*s],g*s,v*s,i,r,!0);for(let d=l-6*s;d<l+6*s;d++)for(let p=u-50*s;p<u-4*s;p++)c.px(d,p,Pt(d|0,p/3|0,4)<.3?h.PUPIL:h.IRIS,0,-.2,.98);c.shape([[l-18*s,u],[l-14*s,u-6*s],[l+14*s,u-6*s],[l+18*s,u]],h.IRIS,{group:10,round:.2}),f[h.IRIS]=[90,150,190],f[h.PUPIL]=[210,235,245]}return{sp:c,colours:f}}function Df(n,e,{K:t=2/(e.pixel||2),makeCanvas:i=Pl}={}){const r=Tf[n];if(!r)throw new Error(`no area type "${n}"`);const s=Ca(n.split("").reduce((u,f)=>u*31+f.charCodeAt(0),7)>>>0),a=(u,f,d)=>({sp:Ii(u.sp,u.colours,e,"none",i),kind:f,text:d}),o=Lf(r,e),c=u=>(u||[]).map(([f,d])=>a(ra(f,d,r,e,s,t),f,"")),l={def:r,floor:{sp:Ii(o.sp,o.colours,e,"none",i),kind:r.floor[0],text:r.text.floor},walls:c(r.wall),small:c(r.small),big:c(r.big),setPiece:null};if(l.walls.forEach(u=>u.text=r.text.wall),l.small.forEach(u=>u.text=r.text.small),l.big.forEach(u=>u.text=r.text.big),r.set){const u=Pf(r.set[0],r.set[1],r,e,s,t);l.setPiece={...a(u,r.set[0],r.text.set),metres:u.metres}}return l}const If={[h.ACCENT]:[150,145,140],[h.BODY2]:[95,92,100],[h.TRUNK]:[110,70,40],[h.BARKD]:[60,38,24],[h.MAGIC]:[255,130,40],[h.MAGIC2]:[255,228,120],[h.NOSE]:[30,24,26]};function Nf(n){const e=new Xe({blend:.02});for(let r=0;r<9;r++){const s=r/9*Math.PI*2;e.ell([Math.cos(s)*.32,.05,Math.sin(s)*.32],[.09,.06,.08],r%3?h.ACCENT:h.BODY2,{dir:[-Math.sin(s),0,Math.cos(s)],group:1+r})}e.seg([-.22,.06,-.12],[.22,.1,.12],.05,.045,h.TRUNK,{group:20,paint:r=>r[0]>.12?h.BARKD:void 0}),e.seg([-.2,.1,.14],[.2,.06,-.14],.05,.045,h.TRUNK,{group:21,paint:r=>r[0]<-.12?h.BARKD:void 0});const t=[[.42,.3,.34],[.36,.4,.28],[.46,.32,.38]][n%3];[[-.05,0,t[0]],[.08,.06,t[1]],[-.02,-.08,t[2]]].forEach(([r,s,a],o)=>e.flat([r,.1+a*.5,s],[1,0,.3],[((n+o)%3-1)*.1,1,0],a*.38,a*.5,Qi.flame(h.MAGIC,h.MAGIC2),{group:30+o,bend:.1}));const i=Tn(e,{height:34}).sp;for(let r=0;r<4;r++){const s=Math.floor(i.w/2+Math.sin(r*2.3+n)*i.w*.25),a=Math.floor(i.h*(.12+r*.08));i.get(s,a)||i.px(s,a,h.MAGIC2)}return i}const sa={cyan:[[70,230,255],[200,250,255]],violet:[[190,100,255],[235,210,255]],green:[[90,255,140],[215,255,220]]};function Uf(n,e){const t=new Xe({blend:.04}),i=Object.keys(sa).indexOf(n),r=.08,s=.4,a=[Math.cos(s),0,-Math.sin(s)],o=T.norm([Math.sin(s),.22,Math.cos(s)]),c=T.norm(T.cross(o,a)),l=[0,.46,0],u=[[[.2-i*.05,.92],[.14,.8],[.19,.7],[.12,.58]],[[-.22+i*.03,.05],[-.17,.16],[-.21,.25]]],f=(x,m)=>u.some(M=>M.some((_,S)=>{const w=M[S+1];if(!w)return!1;const E=w[0]-_[0],L=w[1]-_[1],b=Math.max(0,Math.min(1,((x-_[0])*E+(m-_[1])*L)/(E*E+L*L)));return Math.hypot(x-_[0]-E*b,m-_[1]-L*b)<.014})),d=x=>{const m=T.sub(x,l),M=[T.dot(m,a),T.dot(m,c)+.46,T.dot(m,o)];if(M[2]>r-.02){const _=(M[0]+.17)/.34,S=(.8-M[1])/.5;if(_>=0&&_<=1&&S>=0&&S<=1&&Hh(_,S,i+1,.1))return h.RUNE}if(f(M[0],M[1]))return h.STONED;if(M[1]>.86&&Pt(Math.floor(M[0]*30),Math.floor(M[2]*30),3)<.3||M[1]<.12&&Pt(Math.floor(M[0]*35),Math.floor(M[1]*35)+Math.floor(M[2]*35)*7,5)<.55)return h.MOSS};t.box(l,[.28,.46,r],h.STONE,{group:1,axes:[a,c,o],round:.06,paint:d}),t.box(T.add(T.add(l,T.mul(c,.53)),T.mul(a,.2)),[.3,.12,.2],h.STONE,{group:1,dir:T.add(a,T.mul(c,.35)),up:c,cut:!0,paint:d});for(const[x,m,M]of[[-.24,.14,.08],[.2,.02,.07],[0,.12,.07]])t.ell([x,.015,m],[M,M*.4,M],h.MOSS,{group:2});for(let x=0;x<9;x++){const m=-.3+x*.07,M=.12+x%3*.025-x*.02,_=.07+x*37%5/60;t.seg([m,0,M],[m+(x%3-1)*.02,_,M+.01],.012,.004,x%3?h.LEAF:h.LEAF2,{group:10+x})}const p={[h.STONE]:[132,134,142],[h.STONED]:[70,70,80],[h.MOSS]:[86,120,62],[h.LEAF]:[80,125,60],[h.LEAF2]:[130,160,80],[h.RUNE]:sa[n][0],[h.MAGIC2]:sa[n][1],[h.LINE]:[40,40,50]},g=Tn(t,{height:44}).sp;let v=0;for(let x=0;x<600&&v<5;x++){const m=Math.floor(Pt(x,i,9)*g.w),M=Math.floor(Pt(x,i,10)*g.h*.8);g.get(m,M)||g.get(m+1,M)||g.get(m-1,M)||g.get(m,M+1)||g.get(m,M-1)||(g.px(m,M,v%2?h.RUNE:h.MAGIC2),v++)}return{sp:g,colours:p}}function Of(){const n=new Xe({blend:.03});n.ell([0,0,0],[.62,.025,.38],h.WATER,{group:1,paint:t=>Math.hypot(t[0]/.62,t[2]/.38)>.88?h.BODY2:void 0});for(let t=0;t<16;t++){const i=Math.PI*(.85+t/15*.9),r=Math.cos(i)*.6,s=Math.sin(i)*.36,a=.18+t*37%10/40;n.seg([r,0,s],[r+(t%3-1)*.02,a,s],.012,.006,t%4?h.LEAF:h.LEAF2,{group:10+t})}for(const[t,i,r]of[[.5,.2,.07],[.45,-.25,.05],[-.2,.35,.06]])n.ell([t,.02,i],[r,r*.5,r],h.ACCENT,{group:30});return{sp:Tn(n,{height:22}).sp,colours:{[h.WATER]:[40,70,95],[h.BODY2]:[70,60,45],[h.LEAF]:[80,125,60],[h.LEAF2]:[130,160,80],[h.ACCENT]:[130,128,125]}}}function Ff(n,{makeCanvas:e=Pl}={}){const t=(l,u)=>Ii(l,u,n,"none",e),i={campfire:[0,1,2].map(l=>t(Nf(l),If)),stones:{},pond:null};for(const l of Object.keys(sa)){const u=Uf(l);i.stones[l]=t(u.sp,u.colours)}const r=Of(),s=t(r.sp,r.colours),a=e(r.sp.w,r.sp.h),o=a.getContext("2d"),c=o.createImageData(r.sp.w,r.sp.h);for(let l=0;l<r.sp.m.length;l++)r.sp.m[l]===h.WATER&&c.data.set([255,255,255,255],l*4);return o.putImageData(c,0,0),s.mask=a,i.pond=s,i}function Bf(n,e){const t=new Map,i=new Map,r=(c,l,u)=>(c*2097152+(l+1048576))*2097152+(u+1048576),s=(c,l,u)=>{const f=r(c,l,u);let d=t.get(f);if(!d){const p=Math.pow(2,-c);d=[p*(l+He(l*7+c,u,n)),p*(u+He(l,u*13+c,n+1))],t.set(f,d)}return d},a=(c,l,u)=>{const f=Math.pow(2,-c),d=Math.floor(l/f),p=Math.floor(u/f);let g=d,v=p,x=1/0;for(let m=-2;m<=2;m++)for(let M=-2;M<=2;M++){const _=s(c,d+m,p+M),S=(_[0]-l)**2+(_[1]-u)**2;S<x&&(x=S,g=d+m,v=p+M)}return[g,v]},o=(c,l,u)=>{const f=r(c,l,u);let d=i.get(f);if(d)return d;if(c===0)d=[l,u];else{const p=s(c,l,u),g=a(c-1,p[0],p[1]);d=o(c-1,g[0],g[1])}return i.set(f,d),d};return{seed:n,depth:e,site:(c,l)=>s(0,c,l),partition(c,l){const u=a(e,c,l);return o(e,u[0],u[1])},centreness(c,l,u){const f=s(0,u[0],u[1]),d=Math.hypot(c-f[0],l-f[1]);let p=1/0;const g=Math.floor(c),v=Math.floor(l);for(let x=-2;x<=2;x++)for(let m=-2;m<=2;m++){const M=g+x,_=v+m;if(M===u[0]&&_===u[1])continue;const S=s(0,M,_);p=Math.min(p,Math.hypot(c-S[0],l-S[1]))}return Math.min(1,2*d/(d+p))},openness(c,l){let u=1/0,f=1/0;const d=Math.floor(c),p=Math.floor(l);for(let g=-2;g<=2;g++)for(let v=-2;v<=2;v++){const x=s(0,d+g,p+v),m=Math.hypot(c-x[0],l-x[1]);m<u?(f=u,u=m):m<f&&(f=m)}return Math.min(1,2*u/(u+f))}}}const zf=gd.types,Cn=gs.map(n=>({id:n.id,name:n.name,creature:n.creature,text:n.text,setPiece:n.set?n.text.set??"a set piece":"",hasWalls:!!n.wall?.length,floor:[n.floor[1],n.floor[2],n.floor[3]],treeDensity:zf[n.id]?.treeDensity??1})),Er=(n,e)=>n+","+e;function kf(n){if(n==null||n.trim()==="")return null;const e=n.trim();if(/^\d{1,9}$/.test(e))return Number(e);let t=2166136261;for(let i=0;i<e.length;i++)t=Math.imul(t^e.charCodeAt(i),16777619);return(t>>>0)%1e9}function Gf(n,e,t,i){const r=new Map,s=(c,l)=>{if(c[0]===l[0]&&c[1]===l[1])return;const u=Er(c[0],c[1]),f=Er(l[0],l[1]);r.has(u)||r.set(u,new Set),r.has(f)||r.set(f,new Set),r.get(u).add(f),r.get(f).add(u)},a=(t-e)*i;let o=[];for(let c=0;c<=a;c++){const l=[];for(let u=0;u<=a;u++){const f=n.partition(e+u/i,e+c/i);l.push(f),u>0&&s(f,l[u-1]),c>0&&s(f,o[u])}o=l}return r}function Hf(n,e){const t=e.mapAreas,i=2,r=e.areaSize*e.areaScale,s=Cn.length,a=3,o=Math.max(0,Math.min(1,e.areaSizeVariance))*a*.3,c=(U,D)=>{const O=U/r,z=D/r;return[O+o*(Rr(O/a,z/a,n+91)-.5)*2,z+o*(Rr(O/a,z/a,n+92)-.5)*2]},l=(U,D)=>{let O=U*r,z=D*r;for(let V=0;V<30;V++){const[Q,Y]=c(O,z);O+=(U-Q)*r,z+=(D-Y)*r}return[O,z]},u=Bf(n,e.borderLayers),f=-i,d=t+i,p=Gf(u,f,d,6),g=new Map,v=Ui(n*5+1);for(let U=f;U<d;U++)for(let D=f;D<d;D++){const O=new Set;for(let Q=-2;Q<=2;Q++)for(let Y=-2;Y<=2;Y++){const te=g.get(Er(D+Y,U+Q));te!==void 0&&O.add(te)}for(const Q of p.get(Er(D,U))??[]){const Y=g.get(Q);Y!==void 0&&O.add(Y)}const z=[...Array(s).keys()].filter(Q=>!O.has(Q)),V=z.length?z:[...Array(s).keys()];g.set(Er(D,U),V[Math.floor(v()*V.length)])}const x=(U,D)=>g.get(Er(U,D))??Math.floor(He(U,D,n+17)*s),m=Math.floor(t/2),M=(U,D)=>{const O=u.site(U,D),z=u.partition(O[0],O[1]);return z[0]===U&&z[1]===D};let _=[m,m];for(const[U,D]of[[0,0],[1,0],[0,1],[-1,0],[0,-1],[1,1],[-1,1],[1,-1],[-1,-1]])if(M(m+U,m+D)){_=[m+U,m+D];break}const S=(U,D)=>{const O=u.site(U,D),z=l(O[0],O[1]);return{x:z[0],z:z[1]}},w=S(_[0],_[1]),E=(U,D)=>{const[O,z]=c(U,D),V=u.partition(O,z);return{cell:V,type:x(V[0],V[1]),openness:u.openness(O,z)}},L=(U,D)=>{const O=Cn[x(U,D)];return O.setPiece&&He(U,D,n+61)<e.setPieceChance?O.setPiece:null},b=e.dancefloor.radius,A=b+e.dancefloor.clearing,P=(U,D)=>{if(Math.hypot(U-w.x,D-w.z)<A)return 0;const[O,z]=c(U,D),V=u.partition(O,z);if(L(V[0],V[1])){const Y=S(V[0],V[1]);if(Math.hypot(U-Y.x,D-(Y.z-4))<e.setPieceClear*e.setPieceScale)return 0}const Q=1-vn((Rr(U/e.gladeScale,D/e.gladeScale,n+61)-(1-e.gladeAmount))/.03);return vn((u.openness(O,z)-e.clearingSize)/Math.max(.01,e.clearingFalloff))*e.treeDensity*Q},C=(U,D)=>Math.min(1,Math.hypot(U-_[0],D-_[1])/(t/2)),N=r*.5;return{seed:n,tuning:e,n:t,margin:i,areaSize:r,partition:u,centreCell:_,dancefloor:{x:w.x,z:w.z,radius:b},start:{x:w.x,z:w.z+2},bounds:{minX:N,maxX:t*r-N,minZ:N,maxZ:t*r-N},extent:{minX:f*r,maxX:d*r,minZ:f*r,maxZ:d*r},typeOf:x,areaAt:E,siteOf:S,treeWeight:P,neighbours:p,setPieceOf:L,remoteness:C}}function Gl(n,e,t,i,r){return Math.hypot(n,e)<i||e>=0?!1:Math.atan2(Math.abs(n),-e)*180/Math.PI<(t?r.facing.awayLeave:r.facing.awayEnter)}function Wf(n,e){return{x:n,z:e,vx:0,vz:0,lift:0,mode:"ground",facing:1,away:!1,lean:!1}}const Or=(n,e)=>Hn(e.groundHeight,e.treetopHeight,vn(n.lift)),Ac=n=>vn(n.lift);function Vf(n,e,t,i,r){let{mode:s,lift:a}=n;e.toggleMode&&(s=s==="ground"||s==="descending"?"rising":"descending"),s==="rising"?(a+=t/Math.max(.001,i.riseTime),a>=1&&(a=1,s="treetop")):s==="descending"&&(a-=t/Math.max(.001,i.descendTime),a<=0&&(a=0,s="ground"));let o=e.moveX,c=e.moveZ;const l=Math.hypot(o,c);l>1&&(o/=l,c/=l);const u=Hn(i.groundSpeed,i.treetopSpeed,vn(a)),f=1-Math.exp(-Hn(i.groundAcceleration,i.acceleration,vn(a))*t);let d=n.vx+(o*u-n.vx)*f,p=n.vz+(c*u-n.vz)*f,g=n.x+d*t,v=n.z+p*t;(g<r.minX||g>r.maxX)&&(g=Oi(g,r.minX,r.maxX),d=0),(v<r.minZ||v>r.maxZ)&&(v=Oi(v,r.minZ,r.maxZ),p=0);const x=d>.3?1:d<-.3?-1:n.facing,m=Math.hypot(d,p),M=Gl(d,p,n.away,Math.max(1,u*.15),i);return{x:g,z:v,vx:d,vz:p,lift:a,mode:s,facing:x,away:M,lean:m>u*i.leanAt}}const Oa=3;function Xf(n,e,t=.5,i=1){const r=n.tuning,s=Oi(e,0,1),a=Math.max(0,Math.round(Hn(r.creaturesNear,r.creaturesFar,Math.pow(s,r.creatureCurve))+(t-.5)*2)),o=a>0&&i<Yf(n,s)?1:0,c=Math.max(0,a-o),l=Math.round(c*r.adultShareFar*vn((s-r.adultsFrom)/Math.max(.01,1-r.adultsFrom))),u=Math.round((c-l)*r.youngShareFar*s);return{babies:Math.max(0,c-l-u),young:u,adults:l,legends:o}}const Yf=(n,e)=>n.tuning.legendChanceFar*vn((e-n.tuning.legendsFrom)/Math.max(.01,1-n.tuning.legendsFrom)),ru=n=>n.areaSize*.75,pa=(n,e,t,i)=>{const r=n.areaAt(e,t).cell;return r[0]===i[0]&&r[1]===i[1]};function su(n,e,t,i,r){if(pa(n,t,i,e))return[t,i];for(let s=2;s<r*1.5;s+=2)for(let a=0;a<16;a++){const o=a/16*Math.PI*2,c=t+Math.cos(o)*s,l=i+Math.sin(o)*s;if(pa(n,c,l,e))return[c,l]}return[t,i]}function ma(n,e,t){for(let i=0;i<12;i++){const r=t()*Math.PI*2,s=Math.sqrt(t())*e.range,a=e.homeX+Math.cos(r)*s,o=e.homeZ+Math.sin(r)*s;if(pa(n,a,o,e.cell))return[a,o]}return[e.anchorX,e.anchorZ]}function Kf(n){const e=[],t=n.tuning;let i=0;const[r,s]=n.centreCell;for(let a=0;a<n.n;a++)for(let o=0;o<n.n;o++){if(o===r&&a===s)continue;const c=Ui(n.seed*7919+o*131+a*977+3),l=Cn[n.typeOf(o,a)],u=n.siteOf(o,a),f=n.remoteness(o,a),d=Xf(n,f,He(o,a,n.seed+43),He(o,a,n.seed+47)),p=v=>{const x=[o,a],m=ru(n),[M,_]=su(n,x,u.x,u.z,m),S={cell:x,homeX:u.x,homeZ:u.z,range:m,anchorX:M,anchorZ:_},[w,E]=ma(n,S,c);return{id:i++,species:l.creature,level:v,...S,x:w,z:E,tx:w,tz:E,rest:c()*3,speed:(v===Oa?t.legendSpeed:t.creatureSpeed)*(.7+c()*.6),facing:c()<.5?1:-1,away:!1,moving:!1,walk:c(),seen:0,leashed:!1,rand:Ui(n.seed*31+i*7+11)}};for(let v=0;v<d.babies;v++)e.push(p(0));for(let v=0;v<d.young;v++)e.push(p(1));for(let v=0;v<d.adults;v++)e.push(p(2));const g=t.legendNextToHome&&o===r+1&&a===s;(d.legends||g)&&e.push(p(3))}return e}function qf(n,e,t){if(n.rest>0){n.rest-=e,n.moving=!1,n.away=!1;return}const i=n.tx-n.x,r=n.tz-n.z,s=Math.hypot(i,r);if(s<.05){[n.tx,n.tz]=ma(t,n,n.rand),n.rest=.8+n.rand()*3.5,n.moving=!1;return}const a=Math.min(s,n.speed*e),o=n.x+i/s*a,c=n.z+r/s*a;if(!pa(t,o,c,n.cell)){n.tx=n.x,n.tz=n.z,n.moving=!1;return}n.x=o,n.z=c,Math.abs(i)>.02&&(n.facing=i>0?1:-1),n.away=Gl(i,r,n.away,0,t.tuning),n.moving=!0,n.walk+=e*(n.level===Oa?1.5:4)}function $f(n,e,t,i,r,s,a){for(const o of n)if(!o.leashed&&!(Math.abs(o.homeX-e)>i||Math.abs(o.homeZ-t)>i)){if(s-o.seen>3){const c=Ui(o.id*7919+Math.floor(s/20)*131+5);[o.x,o.z]=ma(a,o,c),[o.tx,o.tz]=ma(a,o,c),o.rest=c()*2}o.seen=s,qf(o,r,a)}}const au=6,Zf=4,Kt=32;function Jf(n){const e=n.tuning.camera.treetop.angleIn*Math.PI/180;return n.tuning.crownHeight/Math.sin(e)}function ou(n,e,t,i,r,s){const a=n.tuning.areaEdgeBlend,o=n.seed;if(a.width<=0)return n.areaAt(e,t).type;const c=(Rr(e/a.scale,t/a.scale,o+81)-.5)*2*a.width+(He(i,r,s+1)-.5)*a.width*a.stray,l=(Rr(e/a.scale,t/a.scale,o+82)-.5)*2*a.width+(He(i,r,s+2)-.5)*a.width*a.stray;return n.areaAt(e+c,t+l).type}function Qf(n,e,t){const{treeSpacingX:i,treeSpacingZ:r}=n.tuning,s=n.seed,a=[],o=Jf(n),c=n.tuning.crownHalfWidth,l=Math.ceil(t*Kt/r),u=Math.ceil((t+1)*Kt/r);for(let f=l;f<u;f++){const d=f&1?.5:0,p=Math.ceil(e*Kt/i-d),g=Math.ceil((e+1)*Kt/i-d);for(let v=p;v<g;v++){const x=(v+d+(He(v,f,s+101)-.5)*.7)*i,m=(f+(He(v,f,s+102)-.5)*.7)*r,M=ou(n,x,m,v,f,s+106);He(v,f,s+103)>=n.treeWeight(x,m)*Cn[M].treeDensity||n.treeWeight(x,m-o)===0||n.treeWeight(x-c,m-o)===0||n.treeWeight(x+c,m-o)===0||a.push({x,z:m,type:M,variant:Math.floor(He(v,f,s+104)*au),flip:He(v,f,s+105)<.5})}}return a}function jf(n,e,t){const i=n.tuning.bushSpacing,r=n.seed,s=[],a=Math.ceil(t*Kt/i),o=Math.ceil((t+1)*Kt/i),c=Math.ceil(e*Kt/i),l=Math.ceil((e+1)*Kt/i);for(let u=a;u<o;u++)for(let f=c;f<l;f++){const d=(f+He(f,u,r+201)-.5)*i,p=(u+He(f,u,r+202)-.5)*i,g=1+n.tuning.bushClump*(2*vn((Rr(d/13,p/13,r+207)-.35)/.3)-1);He(f,u,r+203)>(.12+Math.min(1,n.treeWeight(d,p))*.3)*n.tuning.bushDensity*g||Math.hypot(d-n.dancefloor.x,p-n.dancefloor.z)<n.dancefloor.radius+2||s.push({x:d,z:p,type:ou(n,d,p,f,u,r+206),variant:Math.floor(He(f,u,r+204)*Zf),flip:He(f,u,r+205)<.5})}return s}function e0(n,e,t){const i=n.tuning.wallSpacing,r=n.seed,s=[],a=Math.ceil(t*Kt/i),o=Math.ceil((t+1)*Kt/i),c=Math.ceil(e*Kt/i),l=Math.ceil((e+1)*Kt/i);for(let u=a;u<o;u++)for(let f=c;f<l;f++){if(He(f,u,r+303)>n.tuning.wallDensity)continue;const d=(f+(He(f,u,r+301)-.5)*.6)*i,p=(u+(He(f,u,r+302)-.5)*.6)*i,g=n.areaAt(d,p);g.openness<.82||!Cn[g.type].hasWalls||Math.hypot(d-n.dancefloor.x,p-n.dancefloor.z)<n.dancefloor.radius+4||s.push({x:d,z:p,type:g.type,variant:Math.floor(He(f,u,r+304)*4),flip:He(f,u,r+305)<.5})}return s}const t0=new Set(["wetland","stream","bog","beaver-pond","moor"]);function n0(n,e,t){const i=n.tuning.lightSources,r=i.spacing,s=n.seed,a=[],o=Math.ceil(t*Kt/r),c=Math.ceil((t+1)*Kt/r),l=Math.ceil(e*Kt/r),u=Math.ceil((e+1)*Kt/r);for(let f=o;f<c;f++)for(let d=l;d<u;d++){const p=(d+(He(d,f,s+401)-.5)*.7)*r,g=(f+(He(d,f,s+402)-.5)*.7)*r;if(Math.hypot(p-n.dancefloor.x,g-n.dancefloor.z)<n.dancefloor.radius+n.tuning.dancefloor.clearing+4)continue;const v=n.areaAt(p,g),x=v.openness<.35||v.openness>.8?1:.25,m=He(d,f,s+403),_=(t0.has(Cn[v.type].id)?i.wetPond:i.pond)*x,S=i.campfire*x,w=i.magicStone*x,E=m<_?"pond":m<_+S?"campfire":m<_+S+w?"stone":null;E&&a.push({x:p,z:g,kind:E,size:.75+He(d,f,s+404)*.5})}return a}class i0{constructor(e){this.map=e}map;trees=new Map;bushes=new Map;walls=new Map;lights=new Map;chunks(e,t,i){const r=[];for(let s=Math.floor((t-i)/Kt);s<=Math.floor((t+i)/Kt);s++)for(let a=Math.floor((e-i)/Kt);a<=Math.floor((e+i)/Kt);a++)r.push([a,s]);return r}gather(e,t,i,r,s){e.size>600&&e.clear();const a=[];for(const[o,c]of this.chunks(i,r,s)){const l=o+","+c;let u=e.get(l);u||(u=t(o,c),e.set(l,u));for(const f of u)Math.abs(f.x-i)<=s&&Math.abs(f.z-r)<=s&&a.push(f)}return a}treesNear(e,t,i){return this.gather(this.trees,(r,s)=>Qf(this.map,r,s),e,t,i)}bushesNear(e,t,i){return this.gather(this.bushes,(r,s)=>jf(this.map,r,s),e,t,i)}lightsNear(e,t,i){return this.gather(this.lights,(r,s)=>n0(this.map,r,s),e,t,i)}wallsNear(e,t,i){return this.gather(this.walls,(r,s)=>e0(this.map,r,s),e,t,i)}setPiecesNear(e,t,i){const r=this.map,s=r.areaSize,a=[];for(let o=Math.floor((t-i)/s)-1;o<=Math.floor((t+i)/s)+1;o++)for(let c=Math.floor((e-i)/s)-1;c<=Math.floor((e+i)/s)+1;c++){if(c===r.centreCell[0]&&o===r.centreCell[1]||!r.setPieceOf(c,o))continue;const l=r.siteOf(c,o);Math.abs(l.x-e)<=i&&Math.abs(l.z-4-t)<=i&&a.push({x:l.x,z:l.z-4,type:r.typeOf(c,o),variant:0,flip:He(c,o,r.seed+71)<.5})}return a}}const r0=()=>({stack:[],placed:[],talk:null,events:[],held:!1,heldInAir:!1}),s0=(n,e)=>e.invite.talkTime[Math.min(n.level,e.invite.talkTime.length-1)],a0=(n,e)=>e.invite.turn[Math.min(n.level,e.invite.turn.length-1)],ko=n=>!n.leashed&&n.level!==Oa;function o0(n,e,t,i){if(n.stack.includes(e))return{x:t,z:i};const r=n.placed.find(s=>s.id===e);return r?{x:r.x,z:r.z}:null}function qa(n,e,t,i,r=!1){let s=null,a=i;for(const o of n){if(o.leashed||!r&&!ko(o))continue;const c=Math.hypot(o.x-e,o.z-t);c<=a&&(a=c,s=o)}return s}function Tc(n,e,t,i,r){e.leashed=!0,e.rest=0,n.stack.push(e.id),n.events.push({kind:"invited",id:e.id,x:t,z:i,at:r})}function l0(n,e,t,i,r,s,a,o){n.events=[],n.held=t.talk,n.heldInAir=t.talk&&!r;const c=o.invite,l=o.leash,u=f=>e[f];if(t.talk&&r){const f=n.talk?u(n.talk.id):null;if(f&&!f.leashed&&Math.hypot(f.x-i.x,f.z-i.z)<=c.cancelDistance)n.talk.t+=a,f.rest=Math.max(f.rest,.2),f.moving=!1,f.facing=i.x>=f.x?1:-1,f.away=i.z<f.z-1,!n.talk.refused&&n.talk.t>=n.talk.total&&(Tc(n,f,f.x,f.z,s),n.talk=null);else{n.talk&&n.events.push({kind:"cancelled",id:n.talk.id,x:i.x,z:i.z,at:s});const d=qa(e,i.x,i.z,c.talkRange)??qa(e,i.x,i.z,c.talkRange,!0);n.talk=d?{id:d.id,refused:!ko(d),t:0,total:ko(d)?s0(d,o):1/0}:null}}else n.talk&&(n.events.push({kind:"cancelled",id:n.talk.id,x:i.x,z:i.z,at:s}),n.talk=null);if(t.inviteNearest){const f=qa(e,i.x,i.z,1/0);f&&Tc(n,f,f.x,f.z,s)}if(t.sigil&&r){let f=-1,d=l.pickRadius;if(n.placed.forEach((p,g)=>{const v=Math.hypot(p.x-i.x,p.z-i.z);v<=d&&(d=v,f=g)}),f>=0){const[p]=n.placed.splice(f,1);n.stack.push(p.id),n.events.push({kind:"picked",id:p.id,x:p.x,z:p.z,at:s})}else if(n.stack.length){const p=n.stack[n.stack.length-1];lu(n,i.x,i.z,o)?n.events.push({kind:"fizzled",id:p,x:i.x,z:i.z,at:s}):(n.stack.pop(),n.placed.push({id:p,x:i.x,z:i.z,at:s}),n.events.push({kind:"placed",id:p,x:i.x,z:i.z,at:s}))}}for(const f of n.stack)Rc(u(f),i.x,i.z,a,o);for(const f of n.placed)Rc(u(f.id),f.x,f.z,a,o)}const lu=(n,e,t,i)=>n.placed.some(r=>Math.hypot(r.x-e,r.z-t)<i.leash.spacing);function Rc(n,e,t,i,r){const s=r.leash,a=s.length,o=Math.hypot(n.x-e,n.z-t)>a;if(o){const p=Math.hypot(n.x-e,n.z-t),g=a*.5/p;n.tx=e+(n.x-e)*g,n.tz=t+(n.z-t)*g,n.rest=0}else if(n.rest>0){n.rest-=i,n.moving=!1,n.away=!1;return}else if(Math.hypot(n.tx-e,n.tz-t)>a*.85||Math.hypot(n.tx-n.x,n.tz-n.z)<.05){Math.hypot(n.tx-n.x,n.tz-n.z)<.05&&(n.rest=.5+n.rand()*2);const p=n.rand()*Math.PI*2,g=Math.sqrt(n.rand())*a*.8;if(n.tx=e+Math.cos(p)*g,n.tz=t+Math.sin(p)*g,n.rest>0){n.moving=!1,n.away=!1;return}}const c=n.tx-n.x,l=n.tz-n.z,u=Math.hypot(c,l);if(u<1e-4){n.moving=!1;return}const f=o?Math.max(n.speed,s.runSpeed*(n.level===Oa?.6:1)):n.speed*1.5,d=Math.min(u,f*i);n.x+=c/u*d,n.z+=l/u*d,Math.abs(c)>.02&&(n.facing=c>0?1:-1),n.away=Gl(c,l,n.away,0,r),n.moving=!0,n.walk+=i*(o?7:4)}const c0=n=>`${n[0]},${n[1]}`;function h0(n){const e={cell:n.centreCell,wave:0,at:0,from:null,soundsystem:null};return{areas:new Map([[c0(n.centreCell),e]]),wave:0,nextAt:n.tuning.party.startDelay+n.tuning.party.interval,paused:!1}}function u0(n,e){const t=n.siteOf(e[0],e[1]),i=Ui(n.seed*17+e[0]*53+e[1]*911),[r,s]=su(n,[e[0],e[1]],t.x,t.z,n.areaSize*.75),a=Math.floor(He(e[0],e[1],n.seed+77)*3)%3;for(let o=0;o<24;o++){const c=i()*Math.PI*2,l=3+i()*4,u=r+Math.cos(c)*l,f=s+Math.sin(c)*l+3,d=n.areaAt(u,f).cell;if(d[0]===e[0]&&d[1]===e[1])return{x:u,z:f,variant:a}}return{x:r,z:s,variant:a}}const d0=(n,e)=>e[0]>=0&&e[1]>=0&&e[0]<n.n&&e[1]<n.n;function cu(n,e,t){const i=n.wave+1,r=[],s=new Map,a=new Map;for(const[l,u]of n.areas)for(const f of e.neighbours.get(l)??[]){if(n.areas.has(f)||s.has(f))continue;const d=f.split(",").map(Number);d0(e,d)&&(s.set(f,d),a.set(f,u.cell))}const o=[...s.entries()].sort((l,u)=>He(l[1][0],l[1][1],e.seed+i)-He(u[1][0],u[1][1],e.seed+i)),c=e.tuning.party.maxPerWave>0?e.tuning.party.maxPerWave:1/0;for(const[l,u]of o.slice(0,c)){const f={cell:u,wave:i,at:t,from:a.get(l)??null,soundsystem:u0(e,u)};n.areas.set(l,f),r.push(f)}return n.wave=i,r}function f0(n,e,t,i){return n.paused?(n.nextAt+=i,[]):t<n.nextAt?[]:(n.nextAt+=e.tuning.party.interval,cu(n,e,t))}function p0(n,e,t){const i=Math.max(0,n.nextAt-t),r=e.tuning.party.interval;return{left:i,gone:1-Math.min(1,i/r)}}function m0(n,e){const t=Hf(n,e),i=Wf(t.start.x,t.start.z);return{seed:n,tuning:e,map:t,forest:new i0(t),creatures:Kf(t),clock:fd(),witch:i,camera:hd(e,i.x,Or(i,e),i.z),party:h0(t),leash:r0()}}function g0(n,e,t){const i=pd(n.clock,t);i!==0&&(n.witch=Vf(n.witch,e,i,n.tuning,n.map.bounds),n.camera=ud(n.camera,e.zoom,{x:n.witch.x,y:Or(n.witch,n.tuning),z:n.witch.z},{x:n.witch.vx,z:n.witch.vz},n.witch.lift,i,n.tuning),e.pauseWaves&&(n.party.paused=!n.party.paused),e.nextWave&&(cu(n.party,n.map,n.clock.time),n.party.nextAt=n.clock.time+n.tuning.party.interval),f0(n.party,n.map,n.clock.time,i),$f(n.creatures,n.witch.x,n.witch.z,x0(n),i,n.clock.time,n.map),l0(n.leash,n.creatures,{talk:!!e.talk,sigil:!!e.sigil,inviteNearest:e.inviteNearest},n.witch,n.witch.mode==="ground",n.clock.time,i,n.tuning))}const x0=n=>Math.max(n.tuning.creatureSimRadius,n.tuning.haze.far+20+ru(n.map)*2.5),Cc=n=>kh(n.camera,n.camera.lift,n.tuning);function hu(n){const e=n.map.areaAt(n.witch.x,n.witch.z),t=n.map.setPieceOf(e.cell[0],e.cell[1]);return Cn[e.type].name+(t?` (set piece: ${t})`:"")}const v0="Witch tuning. Edit the numbers, push, and the playable link rebuilds. Distances are metres, times seconds, angles degrees. Keys starting with _ are notes.",M0="The forest: mapAreas x mapAreas areas cut by the fractal partition. An area is areaSize x areaScale metres across on average (areaScale 4 makes them four times as wide as the first 28 m areas; push it for bigger). areaSizeVariance (0-1) makes areas vary in size, some small, some large. borderLayers sets how wiggly borders are.",_0=20,S0=28,b0=4,y0=.7,w0=4,E0="treeHeight and crownWidth scale the art's trees (1 is the Art Lab's size; crowns widen with treeHeight too, crownWidth is the total). treeDensity (0-1): the chance of a tree on each spot outside the clearings; clearingSize (0-1): how far out from an area's centre the ground stays fully open; clearingFalloff (0-1): over how much of the way to the border trees thicken to full density (small: crisp clearing edges); gladeAmount (0-1) of the woods is open in random glades about gladeScale metres across; trees sit on a staggered grid treeSpacingX by treeSpacingZ metres, so no two crowns pile up. A tree is left out where its crown (crownHalfWidth either side, crownHeight up) would hang over a clearing seen from the treetops.",A0=.8,T0=.2,R0=.12,C0=.25,L0=38,P0="Ragged area edges: each tree and bush takes its look (its area type) from a point up to width metres away, by a smooth noise scale metres across plus a per-plant stray (stray, share of width), so neighbouring areas' plants mix in a band along the border. Only the look: creatures, partifying and the party border keep the exact borders.",D0={width:8,scale:24,stray:.5},I0=.45,N0=.8,U0=2.25,O0=1.7,F0=4.6,B0=2.8,z0=10.5,k0=11.25,G0=3.4,H0=4,W0=.6,V0="Speeds per mode, and how long rising and descending take. acceleration: how quickly she reaches her speed or stops in the treetops (per second; higher is snappier); groundAcceleration: the same on the ground. leanAt: the share of the top speed above which she leans into her flight. facing: she (and every creature) faces the viewer unless clearly heading up the screen, within awayEnter degrees of straight up (and stays turned away until past awayLeave); sideways, down or stopped faces the viewer.",X0=17.5,Y0=32,K0=10,q0=28,$0=.7,Z0={awayEnter:55,awayLeave:65},J0=.7,Q0=.55,j0=1.4,ep=24,tp="Near-isometric on the ground, after Transistor; lower over the treetops, looking toward the horizon to feel the speed. The camera follows the witch on a soft spring (follow: its stiffness; higher keeps her closer to the middle) and looks a little ahead of her: lookAhead seconds of flight, at most lookAheadMax metres, eased in at lookAheadEase. zoomEase and liftEase: how softly zoom and rising change the angle and distance. a narrow field of view (fov, degrees) seen from far off, so there is little perspective. Each mode has its own angle (degrees below horizontal) and distance from the witch, at zoomed-in and zoomed-out. Zoom moves between them in zoomSteps steps, starting at startZoom: with 4 steps and startZoom 1 the start is a third of the way out, so the defaults are ground 32 degrees at 100 m and treetop 36 degrees at 170 m, with one step in and two out from each.",np={fov:20,ground:{angleIn:30,angleOut:36,distanceIn:80,distanceOut:140},treetop:{angleIn:34,angleOut:40,distanceIn:150,distanceOut:210},lookAhead:.1,lookAheadMax:3,lookAheadEase:1.5,zoomEase:5,liftEase:8,zoomSteps:4,startZoom:1,follow:8},ip="Everything the camera can see is drawn, plus viewMargin metres round the view, so nothing appears or vanishes on screen. haze: the twilight haze fades the forest from near to far metres from the witch; nothing is drawn beyond far. lightBudget: how many of the nearest point lights (campfires, magic stones, the dancefloor) light the scene at once. pixelSize: screen pixels per art pixel. glowReach: metres the witch's light reaches. spriteTilt: 1 = sprites face the camera fully, 0 = stand upright.",rp=3,sp=12,ap=1,op=1,lp=16,cp=12,hp=20,up="Light sources placed by seed, on a grid of spacing metres, mostly in clearings and at area edges: the chance per spot of a campfire, a magic stone, or a pond mirroring the moon (wetPond in wet areas: wetland, stream, bog, beaver pond, moor).",dp="How far (reach, metres) and how strongly each kind of light lights its surroundings. glowPower: the witch's own glow (glowReach is its reach). Light falls off smoothly to nothing at its reach: no rings or bands.",fp={campfire:{reach:22,strength:2.6},stone:{reach:16,strength:1.8}},pp=2.2,mp="The music's clock (beats per minute): the lasers sweep to it and party animals dance to it. Later the music itself drives it.",gp={bpm:120},xp="Never lose the witch: tall things (over minHeight metres) standing in front of her fade to fadeOpacity where they cover her, with a soft edge of edge pixels; anything that still hides her shows her silhouette in her glow colour at silhouette opacity.",vp={on:!0,fadeOpacity:.38,edge:6,minHeight:2.5,silhouette:.55},Mp="The sigil stack above the witch's hat: scale (of the sigils' size), offset (the gap between her hat tip and the bottom sigil, in sigil heights), gap (between sigils, in sigil heights). It sways as a chain of springs: stiffness and damping, trail (how far it leans back per m/s of her speed), idleSway (metres of gentle sway when she's still).",_p={offset:.5,scale:.65,gap:.15,stiffness:60,damping:9,trail:.03,idleSway:.1},Sp="Each playing soundsystem's laser show: bursts of blockBars bars, on about duty of the time (seeded per soundsystem), up to maxCount beams stepping on the bars, fanned over spread degrees (no beam tilting more than maxTilt from straight up), swinging sweep degrees once every sweepBeats beats (slow, like searchlights), opening and closing the fan every openBars bars, length metres tall, opacity 0-1, fading in over fadeIn and out over fadeOut seconds, and fading with distance from fadeNear to fadeFar metres. Glow only: no light, nothing from the light budget.",bp={on:!0,maxCount:9,length:420,spread:100,maxTilt:55,sweep:22,sweepBeats:12,openBars:6,opacity:.6,duty:.35,blockBars:4,fadeIn:.12,fadeOut:.4,fadeNear:140,fadeFar:480},yp="A sparkling line round the partified region's outside edge, in each area's sigil colour: width (px), brightness, sparkle (0-1, how much it twinkles and runs), step (metres between its sparks).",wp={on:!0,width:2,brightness:1.2,sparkle:.6,step:1.6},Ep={spacing:10,campfire:.035,magicStone:.025,pond:.02,wetPond:.12},Ap={near:150,far:360},Tp="bloom: a gentle glow round bright things (strength 0 or on false turns it off; threshold: how bright a pixel must be to glow). tiltShift: blurs the top and bottom of the screen so the forest looks like a miniature. strength: the blur at the screen's edges, in pixels; band: the height of the sharp band (0-1 of the screen); centre: where it sits (0 top, 0.5 middle, 1 bottom); where: 'before' blurs at the low resolution, before the pixels are scaled up, 'after' blurs the scaled-up image. Add ?tilt=before, ?tilt=after or ?tilt=off to the link to compare.",Rp="shadows: a small contact shadow under the witch, each bush, creature and prop; trees: a crown-sized shadow under every tree too, cast away from the moon (off: Ed, 2026-10-03). canopyShadow: a dappled shadow from the canopy overhead (height in metres), thinner in clearings, drifting with the wind. mist: a low drifting mist (height in metres above the ground). Each has on and strength.",Cp={on:!0,strength:.7,trees:!1},Lp={on:!0,strength:.45,height:18,cover:.55,wind:.6},Pp={on:!0,strength:.12,height:3,wind:.8},Dp="fx: how the mist, the far haze and the canopy dapple are drawn. smooth: soft gradients (the mist in its own buffer, blurred a little and scaled up smoothly); pixel: dithered steps on the art's pixel grid. In smooth, the moonlight's bands, moonbeams and the soft contact shadows under the witch, creatures, bushes and props are smooth too (no dither anywhere); pixel brings all the dithers back. ?fx=pixel or ?fx=smooth in the URL.",Ip="smooth",Np="Inviting (DESIGN.md, the leash): on the ground, hold Talk within talkRange metres of a creature; you chat in emoji for talkTime seconds (babies, young, adults), taking turns every turn seconds (babies, young, adults), then it is invited and leashed to you. Letting go, rising or moving further than cancelDistance cancels it. Legends can't be invited: they give one unimpressed look. leash.length: how far a leashed creature roams from its leash point (you, or its sigil on the ground); runSpeed: how fast it hurries back when out of range (m/s); pickRadius: how near a placed sigil you must be to pick it up; spacing: how close two sigils may be put down (keep it above pickRadius, or a blocked spot picks up instead of fizzling). bond: how a creature shows its tie to its sigil (rim: a glow at its feet in the sigil's colour; sparks: one spark every sparkEvery seconds from sigil to creature, staggered; thread: a dotted line only under strain).",Up={talkRange:12,cancelDistance:18,talkTime:[3,6,12],turn:[.7,.9,1.3]},Op={length:8,runSpeed:4,pickRadius:2,spacing:4},Fp={rim:!0,sparks:!0,thread:!0,sparkEvery:4},Bp="The party spreads: a wave every interval seconds (the first after startDelay more), partifying every area touching a partified one; maxPerWave caps a wave (0: no cap). transition: seconds an area takes to partify, 0 to skip the show. partyLight: the coloured light at each soundsystem (reach in metres, strength).",zp={interval:30,startDelay:0,maxPerWave:0,transition:2.5,lightReach:30,lightStrength:1.6},kp="Colourful string lights in every partified area, as long garlands: runsPerArea runs (a range), each spansPerRun spans (a range) from tree to tree, every next tree inside a forward cone of coneAngle degrees either side, so a run sweeps across rather than zig-zagging; runs start at least spread metres apart. Each span is spanMin to spanMax metres. No span crosses another and each tree holds at most two ends, except junction trees (junctionChance per tree on a run) where a branch leaves, so three meet. At height metres, sagging sag metres per 8 m of span, a bulb every bulbSpacing metres in the palette's colours, twinkling (twinkle 0-1), a chase running along now and then at chaseSpeed bulbs per second. The bulbs only glow (bloom); they cast no light.",Gp={on:!0,runsPerArea:[3,6],spansPerRun:[4,10],coneAngle:35,junctionChance:.15,spanMin:6,spanMax:20,spread:24,height:6.5,sag:.9,bulbSpacing:.8,palette:["#fff1d6","#ff6fcf","#5fe8ff","#ffe25c","#b48cff","#7dff8a"],twinkle:.35,chaseSpeed:8},Hp="The dancefloor: motes: magic particles drifting up off the circle (count, how high they rise in metres, speed in m/s, column: the share of the circle they rise from); a ring of standing stones (radius in metres, how many stones), a clear space of clearing metres round it, a glowing magic circle (two hues 0-1, pulse per second, runeSpeed in turns per minute) lighting the ground round it (lightReach metres, lightStrength), and a magic disco ball floating discoHeight metres up (discoSize metres across, spin turns per minute) throwing specks of light: specks is the share of the sphere that throws one, speckBrightness how bright, speckReach how far.",Wp={motes:{count:220,rise:110,speed:3.2,column:.8},radius:13.5,stones:27,clearing:9,circleHue:.86,circleHue2:.52,pulse:.35,runeSpeed:1,lightReach:36,lightStrength:2,discoHeight:7.5,discoSize:1.8,spin:4,specks:.22,speckBrightness:.9,speckReach:32},Vp="In ground mode the canopy stays drawn at the screen's edges, so she flies under the forest roof; a dithered hole round her is cut out, screenFraction of the screen's width across, with a soft edge (a fraction of the width). Rising closes the hole.",Xp={screenFraction:.8,edge:.1},Yp="Contrast: ambient scales the twilight fill (lower is darker shade under the canopy); black is the black point and gamma the curve applied to the whole picture, so dark goes near-black and lit stays bright.",Kp={black:.03,gamma:1.35,ambient:.35},qp={on:!0,strength:.7,threshold:.55},$p={on:!0,where:"before",strength:3,band:.4,centre:.55},Zp="Creatures grow more numerous and older with an area's distance from home (0 at the dancefloor, 1 at the map's edge): creaturesNear in the areas round home, creaturesFar at the edge (creatureCurve shapes the rise), youngShareFar of them young at the edge; adults from adultsFrom outward, adultShareFar of them at the edge. Legends are rare: at most one in any area, by a chance rising from 0 at legendsFrom to legendChanceFar at the edge; legendNextToHome puts one next to home, to look at early. Idle creatures roam their whole area. Only creatures whose home is within creatureSimRadius metres of the witch move (never less than the haze far edge plus 2.5 areas, so a creature resuming its roam always does so out of sight).",Jp=2,Qp=20,jp=1.3,em=.5,tm=.35,nm=.35,im=.25,rm=!0,sm=.55,am=600,om=.6,lm="setPieceChance: the share of areas, among the types that have a set piece, that show theirs. Wall objects (an area type's edges: puddles, henges, hedges) stand where areas meet, one per wallSpacing metres with chance wallDensity; they do not block movement.",cm=.25,hm=1.8,um=9,dm=.35,fm={_readme:v0,_map:M0,mapAreas:_0,areaSize:S0,areaScale:b0,areaSizeVariance:y0,borderLayers:w0,_trees:E0,treeDensity:A0,clearingSize:T0,clearingFalloff:R0,gladeAmount:C0,gladeScale:L0,_areaEdgeBlend:P0,areaEdgeBlend:D0,bushDensity:I0,bushClump:N0,treeHeight:U0,crownWidth:O0,treeSpacingX:F0,treeSpacingZ:B0,crownHalfWidth:z0,crownHeight:k0,bushSpacing:G0,wallSpacing:H0,wallDensity:W0,_witch:V0,groundSpeed:X0,treetopSpeed:Y0,acceleration:K0,groundAcceleration:q0,leanAt:$0,facing:Z0,riseTime:J0,descendTime:Q0,groundHeight:j0,treetopHeight:ep,_camera:tp,camera:np,_look:ip,pixelSize:rp,glowReach:sp,glowHeight:ap,spriteTilt:op,artPixelsPerMetre:lp,viewMargin:cp,lightBudget:hp,_lightSources:up,_lights:dp,lights:fp,glowPower:pp,_beat:mp,beat:gp,_occlusion:xp,occlusion:vp,_stack:Mp,stack:_p,_lasers:Sp,lasers:bp,_borders:yp,borders:wp,lightSources:Ep,haze:Ap,_post:Tp,_shadows:Rp,shadows:Cp,canopyShadow:Lp,mist:Pp,_fx:Dp,fx:Ip,_invite:Np,invite:Up,leash:Op,bond:Fp,_party:Bp,party:zp,_stringLights:kp,stringLights:Gp,_dancefloor:Hp,dancefloor:Wp,_canopyCutout:Vp,canopyCutout:Xp,_tone:Yp,tone:Kp,bloom:qp,tiltShift:$p,_creatures:Zp,creaturesNear:Jp,creaturesFar:Qp,creatureCurve:jp,youngShareFar:em,adultsFrom:tm,adultShareFar:nm,legendChanceFar:im,legendNextToHome:rm,legendsFrom:sm,creatureSimRadius:am,creatureSpeed:om,_setPieces:lm,setPieceChance:cm,setPieceScale:hm,setPieceClear:um,legendSpeed:dm},or=fm;class pm{keys=new Set;pressed=new Set;padPrev=[];touch={x:0,y:0,toggle:!1,zoom:0,debug:!1};onAny=null;constructor(e=window){e.addEventListener("keydown",t=>{if(t.repeat){this.isGameKey(t.code)&&t.preventDefault();return}this.keys.add(t.code),this.isGameKey(t.code)&&t.preventDefault(),this.onAny?.()||this.pressed.add(t.code)}),e.addEventListener("keyup",t=>this.keys.delete(t.code)),e.addEventListener("blur",()=>this.keys.clear())}isGameKey(e){return/^(Arrow|Space$|Key[WASDZXENPTIFR]$|Shift|Minus$|Equal$|NumpadAdd$|NumpadSubtract$|Backquote$)/.test(e)}clearPresses(){this.pressed.clear();const e=this.touch;e.toggle=!1,e.zoom=0,e.debug=!1}read(){const e=this.pressed.has("KeyN")||this.touch.nextWave,t=this.pressed.has("KeyP")||this.touch.pauseWaves;this.touch.nextWave=!1,this.touch.pauseWaves=!1;const i=x=>this.keys.has(x)?1:0,r=x=>this.pressed.has(x);let s=i("KeyD")+i("ArrowRight")-i("KeyA")-i("ArrowLeft"),a=i("KeyS")+i("ArrowDown")-i("KeyW")-i("ArrowUp"),o=r("Space"),c=(r("KeyX")||r("Minus")||r("NumpadSubtract")?1:0)-(r("KeyZ")||r("Equal")||r("NumpadAdd")?1:0),l=r("Backquote"),u=i("KeyT")+i("KeyF")+i("ShiftLeft")+i("ShiftRight")>0,f=r("KeyE")||r("KeyR");const d=r("KeyI");this.pressed.clear();const p=typeof navigator<"u"&&navigator.getGamepads?navigator.getGamepads():[];for(const x of p){if(!x)continue;const m=A=>!!x.buttons[A]?.pressed,_=x.buttons.some((A,P)=>A.pressed&&!this.padPrev[P])&&!!this.onAny?.(),S=A=>!_&&m(A)&&!this.padPrev[A];let w=x.axes[0]??0,E=x.axes[1]??0;const L=Math.hypot(w,E),b=.18;if(L<b)w=0,E=0;else{const A=(Math.min(1,L)-b)/(1-b)/L;w*=A,E*=A}w+=(m(15)?1:0)-(m(14)?1:0),E+=(m(13)?1:0)-(m(12)?1:0),s+=w,a+=E,S(3)&&(o=!0),(S(4)||S(6))&&(c+=1),(S(5)||S(7))&&(c-=1),S(8)&&(l=!0),m(0)&&(u=!0),S(2)&&(f=!0),this.padPrev=x.buttons.map(A=>A.pressed);break}const g=this.touch;s+=g.x,a+=g.y,g.toggle&&(o=!0),c+=g.zoom,g.debug&&(l=!0),g.talk&&(u=!0),g.sigil&&(f=!0),g.toggle=!1,g.zoom=0,g.debug=!1,g.sigil=!1;const v=Math.hypot(s,a);return v>1&&(s/=v,a/=v),{moveX:s,moveZ:a,toggleMode:o,zoom:Math.sign(c),debug:l,nextWave:e,pauseWaves:t,talk:u,sigil:f,inviteNearest:d}}}const Hl="186",mm=0,Lc=1,gm=2,aa=1,xm=2,os=3,er=0,xn=1,gi=2,ri=0,Lr=1,Fr=2,Pc=3,Dc=4,Wl=5,wr=100,vm=101,Mm=102,_m=103,Sm=104,Vl=200,bm=201,Xl=202,ym=203,uu=204,du=205,wm=206,Em=207,Am=208,Tm=209,Rm=210,Cm=211,Lm=212,Pm=213,Dm=214,Go=0,Ho=1,Wo=2,us=3,Vo=4,Xo=5,ga=6,Yo=7,fu=0,Im=1,Nm=2,si=0,pu=1,mu=2,gu=3,xu=4,vu=5,Mu=6,_u=7,Su=300,tr=301,Br=302,$a=303,Za=304,Fa=306,Ko=1e3,xi=1001,qo=1002,Ht=1003,Um=1004,As=1005,kt=1006,Ja=1007,$i=1008,wn=1009,bu=1010,yu=1011,ds=1012,Yl=1013,ai=1014,ni=1015,oi=1016,Kl=1017,ql=1018,fs=1020,wu=35902,Eu=35899,Au=1021,Tu=1022,En=1023,_i=1026,Zi=1027,Ru=1028,$l=1029,nr=1030,Zl=1031,Jl=1033,oa=33776,la=33777,ca=33778,ha=33779,$o=35840,Zo=35841,Jo=35842,Qo=35843,jo=36196,el=37492,tl=37496,nl=37488,il=37489,xa=37490,rl=37491,sl=37808,al=37809,ol=37810,ll=37811,cl=37812,hl=37813,ul=37814,dl=37815,fl=37816,pl=37817,ml=37818,gl=37819,xl=37820,vl=37821,Ml=36492,_l=36494,Sl=36495,bl=36283,yl=36284,va=36285,wl=36286,Om=3200,Ic=0,Fm=1,Wn="",In="srgb",ps="srgb-linear",Ma="linear",vt="srgb",Qa=7680,Bm=519,zm=512,km=513,Gm=514,Ql=515,Hm=516,Wm=517,jl=518,Vm=519,Xm=35044,Pr=35048,Nc="300 es",ii=2e3,_a=2001;function Ym(n){for(let e=n.length-1;e>=0;--e)if(n[e]>=65535)return!0;return!1}function Sa(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function Km(){const n=Sa("canvas");return n.style.display="block",n}const Uc={};function Oc(...n){const e="THREE."+n.shift();console.log(e,...n)}function Cu(n){const e=n[0];if(typeof e=="string"&&e.startsWith("TSL:")){const t=n[1];t&&t.isStackTrace?n[0]+=" "+t.getLocation():n[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return n}function Ge(...n){n=Cu(n);const e="THREE."+n.shift();{const t=n[0];t&&t.isStackTrace?console.warn(t.getError(e)):console.warn(e,...n)}}function lt(...n){n=Cu(n);const e="THREE."+n.shift();{const t=n[0];t&&t.isStackTrace?console.error(t.getError(e)):console.error(e,...n)}}function Dr(...n){const e=n.join(" ");e in Uc||(Uc[e]=!0,Ge(...n))}function qm(n,e,t){return new Promise(function(i,r){function s(){switch(n.clientWaitSync(e,n.SYNC_FLUSH_COMMANDS_BIT,0)){case n.WAIT_FAILED:r();break;case n.TIMEOUT_EXPIRED:setTimeout(s,t);break;default:i()}}setTimeout(s,t)})}const $m={[Go]:Ho,[Wo]:ga,[Vo]:Yo,[us]:Xo,[Ho]:Go,[ga]:Wo,[Yo]:Vo,[Xo]:us};class rr{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(t)===-1&&i[e].push(t)}hasEventListener(e,t){const i=this._listeners;return i===void 0?!1:i[e]!==void 0&&i[e].indexOf(t)!==-1}removeEventListener(e,t){const i=this._listeners;if(i===void 0)return;const r=i[e];if(r!==void 0){const s=r.indexOf(t);s!==-1&&r.splice(s,1)}}dispatchEvent(e){const t=this._listeners;if(t===void 0)return;const i=t[e.type];if(i!==void 0){e.target=this;const r=i.slice(0);for(let s=0,a=r.length;s<a;s++)r[s].call(this,e);e.target=null}}}const an=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],ja=Math.PI/180,El=180/Math.PI;function xs(){const n=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(an[n&255]+an[n>>8&255]+an[n>>16&255]+an[n>>24&255]+"-"+an[e&255]+an[e>>8&255]+"-"+an[e>>16&15|64]+an[e>>24&255]+"-"+an[t&63|128]+an[t>>8&255]+"-"+an[t>>16&255]+an[t>>24&255]+an[i&255]+an[i>>8&255]+an[i>>16&255]+an[i>>24&255]).toLowerCase()}function rt(n,e,t){return Math.max(e,Math.min(t,n))}function Zm(n,e){return(n%e+e)%e}function eo(n,e,t){return(1-t)*n+t*e}function Jr(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:case Uint8ClampedArray:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function pn(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:case Uint8ClampedArray:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}class We{static{We.prototype.isVector2=!0}constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("THREE.Vector2: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,i=this.y,r=e.elements;return this.x=r[0]*t+r[3]*i+r[6],this.y=r[1]*t+r[4]*i+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=rt(this.x,e.x,t.x),this.y=rt(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=rt(this.x,e,t),this.y=rt(this.y,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(rt(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(rt(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y;return t*t+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const i=Math.cos(t),r=Math.sin(t),s=this.x-e.x,a=this.y-e.y;return this.x=s*i-a*r+e.x,this.y=s*r+a*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Wr{constructor(e=0,t=0,i=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=i,this._w=r}static slerpFlat(e,t,i,r,s,a,o){let c=i[r+0],l=i[r+1],u=i[r+2],f=i[r+3],d=s[a+0],p=s[a+1],g=s[a+2],v=s[a+3];if(f!==v||c!==d||l!==p||u!==g){let x=c*d+l*p+u*g+f*v;x<0&&(d=-d,p=-p,g=-g,v=-v,x=-x);let m=1-o;if(x<.9995){const M=Math.acos(x),_=Math.sin(M);m=Math.sin(m*M)/_,o=Math.sin(o*M)/_,c=c*m+d*o,l=l*m+p*o,u=u*m+g*o,f=f*m+v*o}else{c=c*m+d*o,l=l*m+p*o,u=u*m+g*o,f=f*m+v*o;const M=1/Math.sqrt(c*c+l*l+u*u+f*f);c*=M,l*=M,u*=M,f*=M}}e[t]=c,e[t+1]=l,e[t+2]=u,e[t+3]=f}static multiplyQuaternionsFlat(e,t,i,r,s,a){const o=i[r],c=i[r+1],l=i[r+2],u=i[r+3],f=s[a],d=s[a+1],p=s[a+2],g=s[a+3];return e[t]=o*g+u*f+c*p-l*d,e[t+1]=c*g+u*d+l*f-o*p,e[t+2]=l*g+u*p+o*d-c*f,e[t+3]=u*g-o*f-c*d-l*p,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,i,r){return this._x=e,this._y=t,this._z=i,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const i=e._x,r=e._y,s=e._z,a=e._order,o=Math.cos,c=Math.sin,l=o(i/2),u=o(r/2),f=o(s/2),d=c(i/2),p=c(r/2),g=c(s/2);switch(a){case"XYZ":this._x=d*u*f+l*p*g,this._y=l*p*f-d*u*g,this._z=l*u*g+d*p*f,this._w=l*u*f-d*p*g;break;case"YXZ":this._x=d*u*f+l*p*g,this._y=l*p*f-d*u*g,this._z=l*u*g-d*p*f,this._w=l*u*f+d*p*g;break;case"ZXY":this._x=d*u*f-l*p*g,this._y=l*p*f+d*u*g,this._z=l*u*g+d*p*f,this._w=l*u*f-d*p*g;break;case"ZYX":this._x=d*u*f-l*p*g,this._y=l*p*f+d*u*g,this._z=l*u*g-d*p*f,this._w=l*u*f+d*p*g;break;case"YZX":this._x=d*u*f+l*p*g,this._y=l*p*f+d*u*g,this._z=l*u*g-d*p*f,this._w=l*u*f-d*p*g;break;case"XZY":this._x=d*u*f-l*p*g,this._y=l*p*f-d*u*g,this._z=l*u*g+d*p*f,this._w=l*u*f+d*p*g;break;default:Ge("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const i=t/2,r=Math.sin(i);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,i=t[0],r=t[4],s=t[8],a=t[1],o=t[5],c=t[9],l=t[2],u=t[6],f=t[10],d=i+o+f;if(d>0){const p=.5/Math.sqrt(d+1);this._w=.25/p,this._x=(u-c)*p,this._y=(s-l)*p,this._z=(a-r)*p}else if(i>o&&i>f){const p=2*Math.sqrt(1+i-o-f);this._w=(u-c)/p,this._x=.25*p,this._y=(r+a)/p,this._z=(s+l)/p}else if(o>f){const p=2*Math.sqrt(1+o-i-f);this._w=(s-l)/p,this._x=(r+a)/p,this._y=.25*p,this._z=(c+u)/p}else{const p=2*Math.sqrt(1+f-i-o);this._w=(a-r)/p,this._x=(s+l)/p,this._y=(c+u)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let i=e.dot(t)+1;return i<1e-8?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(rt(this.dot(e),-1,1)))}rotateTowards(e,t){const i=this.angleTo(e);if(i===0)return this;const r=Math.min(1,t/i);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const i=e._x,r=e._y,s=e._z,a=e._w,o=t._x,c=t._y,l=t._z,u=t._w;return this._x=i*u+a*o+r*l-s*c,this._y=r*u+a*c+s*o-i*l,this._z=s*u+a*l+i*c-r*o,this._w=a*u-i*o-r*c-s*l,this._onChangeCallback(),this}slerp(e,t){let i=e._x,r=e._y,s=e._z,a=e._w,o=this.dot(e);o<0&&(i=-i,r=-r,s=-s,a=-a,o=-o);let c=1-t;if(o<.9995){const l=Math.acos(o),u=Math.sin(l);c=Math.sin(c*l)/u,t=Math.sin(t*l)/u,this._x=this._x*c+i*t,this._y=this._y*c+r*t,this._z=this._z*c+s*t,this._w=this._w*c+a*t,this._onChangeCallback()}else this._x=this._x*c+i*t,this._y=this._y*c+r*t,this._z=this._z*c+s*t,this._w=this._w*c+a*t,this.normalize();return this}slerpQuaternions(e,t,i){return this.copy(e).slerp(t,i)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),i=Math.random(),r=Math.sqrt(1-i),s=Math.sqrt(i);return this.set(r*Math.sin(e),r*Math.cos(e),s*Math.sin(t),s*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class W{static{W.prototype.isVector3=!0}constructor(e=0,t=0,i=0){this.x=e,this.y=t,this.z=i}set(e,t,i){return i===void 0&&(i=this.z),this.x=e,this.y=t,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("THREE.Vector3: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Fc.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Fc.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[3]*i+s[6]*r,this.y=s[1]*t+s[4]*i+s[7]*r,this.z=s[2]*t+s[5]*i+s[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,i=this.y,r=this.z,s=e.elements,a=1/(s[3]*t+s[7]*i+s[11]*r+s[15]);return this.x=(s[0]*t+s[4]*i+s[8]*r+s[12])*a,this.y=(s[1]*t+s[5]*i+s[9]*r+s[13])*a,this.z=(s[2]*t+s[6]*i+s[10]*r+s[14])*a,this}applyQuaternion(e){const t=this.x,i=this.y,r=this.z,s=e.x,a=e.y,o=e.z,c=e.w,l=2*(a*r-o*i),u=2*(o*t-s*r),f=2*(s*i-a*t);return this.x=t+c*l+a*f-o*u,this.y=i+c*u+o*l-s*f,this.z=r+c*f+s*u-a*l,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[4]*i+s[8]*r,this.y=s[1]*t+s[5]*i+s[9]*r,this.z=s[2]*t+s[6]*i+s[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=rt(this.x,e.x,t.x),this.y=rt(this.y,e.y,t.y),this.z=rt(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=rt(this.x,e,t),this.y=rt(this.y,e,t),this.z=rt(this.z,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(rt(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const i=e.x,r=e.y,s=e.z,a=t.x,o=t.y,c=t.z;return this.x=r*c-s*o,this.y=s*a-i*c,this.z=i*o-r*a,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const i=e.dot(this)/t;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return to.copy(this).projectOnVector(e),this.sub(to)}reflect(e){return this.sub(to.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(rt(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y,r=this.z-e.z;return t*t+i*i+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,i){const r=Math.sin(t)*e;return this.x=r*Math.sin(i),this.y=Math.cos(t)*e,this.z=r*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,i){return this.x=e*Math.sin(t),this.y=i,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=i,this.z=r,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,i=Math.sqrt(1-t*t);return this.x=i*Math.cos(e),this.y=t,this.z=i*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const to=new W,Fc=new Wr;class Ve{static{Ve.prototype.isMatrix3=!0}constructor(e,t,i,r,s,a,o,c,l){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,i,r,s,a,o,c,l)}set(e,t,i,r,s,a,o,c,l){const u=this.elements;return u[0]=e,u[1]=r,u[2]=o,u[3]=t,u[4]=s,u[5]=c,u[6]=i,u[7]=a,u[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],this}extractBasis(e,t,i){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,r=t.elements,s=this.elements,a=i[0],o=i[3],c=i[6],l=i[1],u=i[4],f=i[7],d=i[2],p=i[5],g=i[8],v=r[0],x=r[3],m=r[6],M=r[1],_=r[4],S=r[7],w=r[2],E=r[5],L=r[8];return s[0]=a*v+o*M+c*w,s[3]=a*x+o*_+c*E,s[6]=a*m+o*S+c*L,s[1]=l*v+u*M+f*w,s[4]=l*x+u*_+f*E,s[7]=l*m+u*S+f*L,s[2]=d*v+p*M+g*w,s[5]=d*x+p*_+g*E,s[8]=d*m+p*S+g*L,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],a=e[4],o=e[5],c=e[6],l=e[7],u=e[8];return t*a*u-t*o*l-i*s*u+i*o*c+r*s*l-r*a*c}invert(){const e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],a=e[4],o=e[5],c=e[6],l=e[7],u=e[8],f=u*a-o*l,d=o*c-u*s,p=l*s-a*c,g=t*f+i*d+r*p;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const v=1/g;return e[0]=f*v,e[1]=(r*l-u*i)*v,e[2]=(o*i-r*a)*v,e[3]=d*v,e[4]=(u*t-r*c)*v,e[5]=(r*s-o*t)*v,e[6]=p*v,e[7]=(i*c-l*t)*v,e[8]=(a*t-i*s)*v,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,i,r,s,a,o){const c=Math.cos(s),l=Math.sin(s);return this.set(i*c,i*l,-i*(c*a+l*o)+a+e,-r*l,r*c,-r*(-l*a+c*o)+o+t,0,0,1),this}scale(e,t){return Dr("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(no.makeScale(e,t)),this}rotate(e){return Dr("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(no.makeRotation(-e)),this}translate(e,t){return Dr("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(no.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,i,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,i=e.elements;for(let r=0;r<9;r++)if(t[r]!==i[r])return!1;return!0}fromArray(e,t=0){for(let i=0;i<9;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const no=new Ve,Bc=new Ve().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),zc=new Ve().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Jm(){const n={enabled:!0,workingColorSpace:ps,spaces:{},convert:function(r,s,a){return this.enabled===!1||s===a||!s||!a||(this.spaces[s].transfer===vt&&(r.r=Mi(r.r),r.g=Mi(r.g),r.b=Mi(r.b)),this.spaces[s].primaries!==this.spaces[a].primaries&&(r.applyMatrix3(this.spaces[s].toXYZ),r.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===vt&&(r.r=Ir(r.r),r.g=Ir(r.g),r.b=Ir(r.b))),r},workingToColorSpace:function(r,s){return this.convert(r,this.workingColorSpace,s)},colorSpaceToWorking:function(r,s){return this.convert(r,s,this.workingColorSpace)},getPrimaries:function(r){return this.spaces[r].primaries},getTransfer:function(r){return r===Wn?Ma:this.spaces[r].transfer},getToneMappingMode:function(r){return this.spaces[r].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(r,s=this.workingColorSpace){return r.fromArray(this.spaces[s].luminanceCoefficients)},define:function(r){Object.assign(this.spaces,r)},_getMatrix:function(r,s,a){return r.copy(this.spaces[s].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(r){return this.spaces[r].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(r=this.workingColorSpace){return this.spaces[r].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(r,s){return Dr("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),n.workingToColorSpace(r,s)},toWorkingColorSpace:function(r,s){return Dr("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),n.colorSpaceToWorking(r,s)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],i=[.3127,.329];return n.define({[ps]:{primaries:e,whitePoint:i,transfer:Ma,toXYZ:Bc,fromXYZ:zc,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:In},outputColorSpaceConfig:{drawingBufferColorSpace:In}},[In]:{primaries:e,whitePoint:i,transfer:vt,toXYZ:Bc,fromXYZ:zc,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:In}}}),n}const it=Jm();function Mi(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function Ir(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}let lr;class Qm{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let i;if(e instanceof HTMLCanvasElement)i=e;else{lr===void 0&&(lr=Sa("canvas")),lr.width=e.width,lr.height=e.height;const r=lr.getContext("2d");e instanceof ImageData?r.putImageData(e,0,0):r.drawImage(e,0,0,e.width,e.height),i=lr}return i.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=Sa("canvas");t.width=e.width,t.height=e.height;const i=t.getContext("2d");i.drawImage(e,0,0,e.width,e.height);const r=i.getImageData(0,0,e.width,e.height),s=r.data;for(let a=0;a<s.length;a++)s[a]=Mi(s[a]/255)*255;return i.putImageData(r,0,0),t}else if(e.data){const t=e.data.slice(0);for(let i=0;i<t.length;i++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[i]=Math.floor(Mi(t[i]/255)*255):t[i]=Mi(t[i]);return{data:t,width:e.width,height:e.height}}else return Ge("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let jm=0;class ec{constructor(e=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:jm++}),this.uuid=xs(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<"u"&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const i={uuid:this.uuid,url:""},r=this.data;if(r!==null){let s;if(Array.isArray(r)){s=[];for(let a=0,o=r.length;a<o;a++)r[a].isDataTexture?s.push(io(r[a].image)):s.push(io(r[a]))}else s=io(r);i.url=s}return t||(e.images[this.uuid]=i),i}}function io(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?Qm.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(Ge("Texture: Unable to serialize Texture."),{})}let eg=0;const ro=new W;class hn extends rr{constructor(e=hn.DEFAULT_IMAGE,t=hn.DEFAULT_MAPPING,i=xi,r=xi,s=kt,a=$i,o=En,c=wn,l=hn.DEFAULT_ANISOTROPY,u=Wn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:eg++}),this.uuid=xs(),this.name="",this.source=new ec(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=i,this.wrapT=r,this.magFilter=s,this.minFilter=a,this.anisotropy=l,this.format=o,this.internalFormat=null,this.type=c,this.offset=new We(0,0),this.repeat=new We(1,1),this.center=new We(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ve,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(ro).x}get height(){return this.source.getSize(ro).y}get depth(){return this.source.getSize(ro).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const t in e){const i=e[t];if(i===void 0){Ge(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}const r=this[t];if(r===void 0){Ge(`Texture.setValues(): property '${t}' does not exist.`);continue}r&&i&&r.isVector2&&i.isVector2||r&&i&&r.isVector3&&i.isVector3||r&&i&&r.isMatrix3&&i.isMatrix3?r.copy(i):this[t]=i}}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const i={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),t||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Su)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Ko:e.x=e.x-Math.floor(e.x);break;case xi:e.x=e.x<0?0:1;break;case qo:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Ko:e.y=e.y-Math.floor(e.y);break;case xi:e.y=e.y<0?0:1;break;case qo:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}hn.DEFAULT_IMAGE=null;hn.DEFAULT_MAPPING=Su;hn.DEFAULT_ANISOTROPY=1;class st{static{st.prototype.isVector4=!0}constructor(e=0,t=0,i=0,r=1){this.x=e,this.y=t,this.z=i,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,i,r){return this.x=e,this.y=t,this.z=i,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("THREE.Vector4: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,i=this.y,r=this.z,s=this.w,a=e.elements;return this.x=a[0]*t+a[4]*i+a[8]*r+a[12]*s,this.y=a[1]*t+a[5]*i+a[9]*r+a[13]*s,this.z=a[2]*t+a[6]*i+a[10]*r+a[14]*s,this.w=a[3]*t+a[7]*i+a[11]*r+a[15]*s,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,i,r,s;const c=e.elements,l=c[0],u=c[4],f=c[8],d=c[1],p=c[5],g=c[9],v=c[2],x=c[6],m=c[10];if(Math.abs(u-d)<.01&&Math.abs(f-v)<.01&&Math.abs(g-x)<.01){if(Math.abs(u+d)<.1&&Math.abs(f+v)<.1&&Math.abs(g+x)<.1&&Math.abs(l+p+m-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const _=(l+1)/2,S=(p+1)/2,w=(m+1)/2,E=(u+d)/4,L=(f+v)/4,b=(g+x)/4;return _>S&&_>w?_<.01?(i=0,r=.707106781,s=.707106781):(i=Math.sqrt(_),r=E/i,s=L/i):S>w?S<.01?(i=.707106781,r=0,s=.707106781):(r=Math.sqrt(S),i=E/r,s=b/r):w<.01?(i=.707106781,r=.707106781,s=0):(s=Math.sqrt(w),i=L/s,r=b/s),this.set(i,r,s,t),this}let M=Math.sqrt((x-g)*(x-g)+(f-v)*(f-v)+(d-u)*(d-u));return Math.abs(M)<.001&&(M=1),this.x=(x-g)/M,this.y=(f-v)/M,this.z=(d-u)/M,this.w=Math.acos((l+p+m-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=rt(this.x,e.x,t.x),this.y=rt(this.y,e.y,t.y),this.z=rt(this.z,e.z,t.z),this.w=rt(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=rt(this.x,e,t),this.y=rt(this.y,e,t),this.z=rt(this.z,e,t),this.w=rt(this.w,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(rt(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this.w=e.w+(t.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class tg extends rr{constructor(e=1,t=1,i={}){super(),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:kt,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},i),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=i.depth,this.scissor=new st(0,0,e,t),this.scissorTest=!1,this.viewport=new st(0,0,e,t),this.textures=[];const r={width:e,height:t,depth:i.depth},s=new hn(r),a=i.count;for(let o=0;o<a;o++)this.textures[o]=s.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(i),this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveColorBuffer=i.resolveColorBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this.storeMultisampledColorBuffer=i.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=i.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=i.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=i.depthTexture,this.samples=i.samples,this.multiview=i.multiview,this.useArrayDepthTexture=i.useArrayDepthTexture}_setTextureOptions(e={}){const t={minFilter:kt,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let i=0;i<this.textures.length;i++)this.textures[i].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),e!==null&&e.renderTarget===null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,i=1){if(this.width!==e||this.height!==t||this.depth!==i){this.width=e,this.height=t,this.depth=i;for(let r=0,s=this.textures.length;r<s;r++)this.textures[r].image.width=e,this.textures[r].image.height=t,this.textures[r].image.depth=i,this.textures[r].isData3DTexture!==!0&&(this.textures[r].isArrayTexture=this.textures[r].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,i=e.textures.length;t<i;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;const r=Object.assign({},e.textures[t].image);this.textures[t].source=new ec(r)}if(this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveColorBuffer=e.resolveColorBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,this.storeMultisampledColorBuffer=e.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=e.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=e.storeMultisampledStencilBuffer,e.depthTexture!==null)if(e.depthTexture.renderTarget===e){const t=e.depthTexture.clone();t.renderTarget=null,this.depthTexture=t}else this.depthTexture=e.depthTexture;return this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Un extends tg{constructor(e=1,t=1,i={}){super(e,t,i),this.isWebGLRenderTarget=!0}}class Lu extends hn{constructor(e=null,t=1,i=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:i,depth:r},this.magFilter=Ht,this.minFilter=Ht,this.wrapR=xi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class ng extends hn{constructor(e=null,t=1,i=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:i,depth:r},this.magFilter=Ht,this.minFilter=Ht,this.wrapR=xi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}}class Ut{static{Ut.prototype.isMatrix4=!0}constructor(e,t,i,r,s,a,o,c,l,u,f,d,p,g,v,x){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,i,r,s,a,o,c,l,u,f,d,p,g,v,x)}set(e,t,i,r,s,a,o,c,l,u,f,d,p,g,v,x){const m=this.elements;return m[0]=e,m[4]=t,m[8]=i,m[12]=r,m[1]=s,m[5]=a,m[9]=o,m[13]=c,m[2]=l,m[6]=u,m[10]=f,m[14]=d,m[3]=p,m[7]=g,m[11]=v,m[15]=x,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Ut().fromArray(this.elements)}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],t[9]=i[9],t[10]=i[10],t[11]=i[11],t[12]=i[12],t[13]=i[13],t[14]=i[14],t[15]=i[15],this}copyPosition(e){const t=this.elements,i=e.elements;return t[12]=i[12],t[13]=i[13],t[14]=i[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,i){return this.determinantAffine()===0?(e.set(1,0,0),t.set(0,1,0),i.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this)}makeBasis(e,t,i){return this.set(e.x,t.x,i.x,0,e.y,t.y,i.y,0,e.z,t.z,i.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();const t=this.elements,i=e.elements,r=1/cr.setFromMatrixColumn(e,0).length(),s=1/cr.setFromMatrixColumn(e,1).length(),a=1/cr.setFromMatrixColumn(e,2).length();return t[0]=i[0]*r,t[1]=i[1]*r,t[2]=i[2]*r,t[3]=0,t[4]=i[4]*s,t[5]=i[5]*s,t[6]=i[6]*s,t[7]=0,t[8]=i[8]*a,t[9]=i[9]*a,t[10]=i[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,i=e.x,r=e.y,s=e.z,a=Math.cos(i),o=Math.sin(i),c=Math.cos(r),l=Math.sin(r),u=Math.cos(s),f=Math.sin(s);if(e.order==="XYZ"){const d=a*u,p=a*f,g=o*u,v=o*f;t[0]=c*u,t[4]=-c*f,t[8]=l,t[1]=p+g*l,t[5]=d-v*l,t[9]=-o*c,t[2]=v-d*l,t[6]=g+p*l,t[10]=a*c}else if(e.order==="YXZ"){const d=c*u,p=c*f,g=l*u,v=l*f;t[0]=d+v*o,t[4]=g*o-p,t[8]=a*l,t[1]=a*f,t[5]=a*u,t[9]=-o,t[2]=p*o-g,t[6]=v+d*o,t[10]=a*c}else if(e.order==="ZXY"){const d=c*u,p=c*f,g=l*u,v=l*f;t[0]=d-v*o,t[4]=-a*f,t[8]=g+p*o,t[1]=p+g*o,t[5]=a*u,t[9]=v-d*o,t[2]=-a*l,t[6]=o,t[10]=a*c}else if(e.order==="ZYX"){const d=a*u,p=a*f,g=o*u,v=o*f;t[0]=c*u,t[4]=g*l-p,t[8]=d*l+v,t[1]=c*f,t[5]=v*l+d,t[9]=p*l-g,t[2]=-l,t[6]=o*c,t[10]=a*c}else if(e.order==="YZX"){const d=a*c,p=a*l,g=o*c,v=o*l;t[0]=c*u,t[4]=v-d*f,t[8]=g*f+p,t[1]=f,t[5]=a*u,t[9]=-o*u,t[2]=-l*u,t[6]=p*f+g,t[10]=d-v*f}else if(e.order==="XZY"){const d=a*c,p=a*l,g=o*c,v=o*l;t[0]=c*u,t[4]=-f,t[8]=l*u,t[1]=d*f+v,t[5]=a*u,t[9]=p*f-g,t[2]=g*f-p,t[6]=o*u,t[10]=v*f+d}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(ig,e,rg)}lookAt(e,t,i){const r=this.elements;return _n.subVectors(e,t),_n.lengthSq()===0&&(_n.z=1),_n.normalize(),Ei.crossVectors(i,_n),Ei.lengthSq()===0&&(Math.abs(i.z)===1?_n.x+=1e-4:_n.z+=1e-4,_n.normalize(),Ei.crossVectors(i,_n)),Ei.normalize(),Ts.crossVectors(_n,Ei),r[0]=Ei.x,r[4]=Ts.x,r[8]=_n.x,r[1]=Ei.y,r[5]=Ts.y,r[9]=_n.y,r[2]=Ei.z,r[6]=Ts.z,r[10]=_n.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,r=t.elements,s=this.elements,a=i[0],o=i[4],c=i[8],l=i[12],u=i[1],f=i[5],d=i[9],p=i[13],g=i[2],v=i[6],x=i[10],m=i[14],M=i[3],_=i[7],S=i[11],w=i[15],E=r[0],L=r[4],b=r[8],A=r[12],P=r[1],C=r[5],N=r[9],U=r[13],D=r[2],O=r[6],z=r[10],V=r[14],Q=r[3],Y=r[7],te=r[11],F=r[15];return s[0]=a*E+o*P+c*D+l*Q,s[4]=a*L+o*C+c*O+l*Y,s[8]=a*b+o*N+c*z+l*te,s[12]=a*A+o*U+c*V+l*F,s[1]=u*E+f*P+d*D+p*Q,s[5]=u*L+f*C+d*O+p*Y,s[9]=u*b+f*N+d*z+p*te,s[13]=u*A+f*U+d*V+p*F,s[2]=g*E+v*P+x*D+m*Q,s[6]=g*L+v*C+x*O+m*Y,s[10]=g*b+v*N+x*z+m*te,s[14]=g*A+v*U+x*V+m*F,s[3]=M*E+_*P+S*D+w*Q,s[7]=M*L+_*C+S*O+w*Y,s[11]=M*b+_*N+S*z+w*te,s[15]=M*A+_*U+S*V+w*F,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[4],r=e[8],s=e[12],a=e[1],o=e[5],c=e[9],l=e[13],u=e[2],f=e[6],d=e[10],p=e[14],g=e[3],v=e[7],x=e[11],m=e[15],M=c*p-l*d,_=o*p-l*f,S=o*d-c*f,w=a*p-l*u,E=a*d-c*u,L=a*f-o*u;return t*(v*M-x*_+m*S)-i*(g*M-x*w+m*E)+r*(g*_-v*w+m*L)-s*(g*S-v*E+x*L)}determinantAffine(){const e=this.elements,t=e[0],i=e[4],r=e[8],s=e[1],a=e[5],o=e[9],c=e[2],l=e[6],u=e[10];return t*(a*u-o*l)-i*(s*u-o*c)+r*(s*l-a*c)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,i){const r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=i),this}invert(){const e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],a=e[4],o=e[5],c=e[6],l=e[7],u=e[8],f=e[9],d=e[10],p=e[11],g=e[12],v=e[13],x=e[14],m=e[15],M=t*o-i*a,_=t*c-r*a,S=t*l-s*a,w=i*c-r*o,E=i*l-s*o,L=r*l-s*c,b=u*v-f*g,A=u*x-d*g,P=u*m-p*g,C=f*x-d*v,N=f*m-p*v,U=d*m-p*x,D=M*U-_*N+S*C+w*P-E*A+L*b;if(D===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const O=1/D;return e[0]=(o*U-c*N+l*C)*O,e[1]=(r*N-i*U-s*C)*O,e[2]=(v*L-x*E+m*w)*O,e[3]=(d*E-f*L-p*w)*O,e[4]=(c*P-a*U-l*A)*O,e[5]=(t*U-r*P+s*A)*O,e[6]=(x*S-g*L-m*_)*O,e[7]=(u*L-d*S+p*_)*O,e[8]=(a*N-o*P+l*b)*O,e[9]=(i*P-t*N-s*b)*O,e[10]=(g*E-v*S+m*M)*O,e[11]=(f*S-u*E-p*M)*O,e[12]=(o*A-a*C-c*b)*O,e[13]=(t*C-i*A+r*b)*O,e[14]=(v*_-g*w-x*M)*O,e[15]=(u*w-f*_+d*M)*O,this}scale(e){const t=this.elements,i=e.x,r=e.y,s=e.z;return t[0]*=i,t[4]*=r,t[8]*=s,t[1]*=i,t[5]*=r,t[9]*=s,t[2]*=i,t[6]*=r,t[10]*=s,t[3]*=i,t[7]*=r,t[11]*=s,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,i,r))}makeTranslation(e,t,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,i,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,t,-i,0,0,i,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,0,i,0,0,1,0,0,-i,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,0,i,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const i=Math.cos(t),r=Math.sin(t),s=1-i,a=e.x,o=e.y,c=e.z,l=s*a,u=s*o;return this.set(l*a+i,l*o-r*c,l*c+r*o,0,l*o+r*c,u*o+i,u*c-r*a,0,l*c-r*o,u*c+r*a,s*c*c+i,0,0,0,0,1),this}makeScale(e,t,i){return this.set(e,0,0,0,0,t,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,t,i,r,s,a){return this.set(1,i,s,0,e,1,a,0,t,r,1,0,0,0,0,1),this}compose(e,t,i){const r=this.elements,s=t._x,a=t._y,o=t._z,c=t._w,l=s+s,u=a+a,f=o+o,d=s*l,p=s*u,g=s*f,v=a*u,x=a*f,m=o*f,M=c*l,_=c*u,S=c*f,w=i.x,E=i.y,L=i.z;return r[0]=(1-(v+m))*w,r[1]=(p+S)*w,r[2]=(g-_)*w,r[3]=0,r[4]=(p-S)*E,r[5]=(1-(d+m))*E,r[6]=(x+M)*E,r[7]=0,r[8]=(g+_)*L,r[9]=(x-M)*L,r[10]=(1-(d+v))*L,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,i){const r=this.elements;e.x=r[12],e.y=r[13],e.z=r[14];const s=this.determinantAffine();if(s===0)return i.set(1,1,1),t.identity(),this;let a=cr.set(r[0],r[1],r[2]).length();const o=cr.set(r[4],r[5],r[6]).length(),c=cr.set(r[8],r[9],r[10]).length();s<0&&(a=-a),Bn.copy(this);const l=1/a,u=1/o,f=1/c;return Bn.elements[0]*=l,Bn.elements[1]*=l,Bn.elements[2]*=l,Bn.elements[4]*=u,Bn.elements[5]*=u,Bn.elements[6]*=u,Bn.elements[8]*=f,Bn.elements[9]*=f,Bn.elements[10]*=f,t.setFromRotationMatrix(Bn),i.x=a,i.y=o,i.z=c,this}makePerspective(e,t,i,r,s,a,o=ii,c=!1){const l=this.elements,u=2*s/(t-e),f=2*s/(i-r),d=(t+e)/(t-e),p=(i+r)/(i-r);let g,v;if(c)g=s/(a-s),v=a*s/(a-s);else if(o===ii)g=-(a+s)/(a-s),v=-2*a*s/(a-s);else if(o===_a)g=-a/(a-s),v=-a*s/(a-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return l[0]=u,l[4]=0,l[8]=d,l[12]=0,l[1]=0,l[5]=f,l[9]=p,l[13]=0,l[2]=0,l[6]=0,l[10]=g,l[14]=v,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,i,r,s,a,o=ii,c=!1){const l=this.elements,u=2/(t-e),f=2/(i-r),d=-(t+e)/(t-e),p=-(i+r)/(i-r);let g,v;if(c)g=1/(a-s),v=a/(a-s);else if(o===ii)g=-2/(a-s),v=-(a+s)/(a-s);else if(o===_a)g=-1/(a-s),v=-s/(a-s);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return l[0]=u,l[4]=0,l[8]=0,l[12]=d,l[1]=0,l[5]=f,l[9]=0,l[13]=p,l[2]=0,l[6]=0,l[10]=g,l[14]=v,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){const t=this.elements,i=e.elements;for(let r=0;r<16;r++)if(t[r]!==i[r])return!1;return!0}fromArray(e,t=0){for(let i=0;i<16;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e[t+9]=i[9],e[t+10]=i[10],e[t+11]=i[11],e[t+12]=i[12],e[t+13]=i[13],e[t+14]=i[14],e[t+15]=i[15],e}}const cr=new W,Bn=new Ut,ig=new W(0,0,0),rg=new W(1,1,1),Ei=new W,Ts=new W,_n=new W,kc=new Ut,Gc=new Wr;class ir{constructor(e=0,t=0,i=0,r=ir.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=i,this._order=r}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,i,r=this._order){return this._x=e,this._y=t,this._z=i,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,i=!0){const r=e.elements,s=r[0],a=r[4],o=r[8],c=r[1],l=r[5],u=r[9],f=r[2],d=r[6],p=r[10];switch(t){case"XYZ":this._y=Math.asin(rt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-u,p),this._z=Math.atan2(-a,s)):(this._x=Math.atan2(d,l),this._z=0);break;case"YXZ":this._x=Math.asin(-rt(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(o,p),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-f,s),this._z=0);break;case"ZXY":this._x=Math.asin(rt(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-f,p),this._z=Math.atan2(-a,l)):(this._y=0,this._z=Math.atan2(c,s));break;case"ZYX":this._y=Math.asin(-rt(f,-1,1)),Math.abs(f)<.9999999?(this._x=Math.atan2(d,p),this._z=Math.atan2(c,s)):(this._x=0,this._z=Math.atan2(-a,l));break;case"YZX":this._z=Math.asin(rt(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-u,l),this._y=Math.atan2(-f,s)):(this._x=0,this._y=Math.atan2(o,p));break;case"XZY":this._z=Math.asin(-rt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(d,l),this._y=Math.atan2(o,s)):(this._x=Math.atan2(-u,p),this._y=0);break;default:Ge("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,i){return kc.makeRotationFromQuaternion(e),this.setFromRotationMatrix(kc,t,i)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Gc.setFromEuler(this),this.setFromQuaternion(Gc,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}ir.DEFAULT_ORDER="XYZ";class Pu{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let sg=0;const Hc=new W,hr=new Wr,hi=new Ut,Rs=new W,Qr=new W,ag=new W,og=new Wr,Wc=new W(1,0,0),Vc=new W(0,1,0),Xc=new W(0,0,1),Yc={type:"added"},lg={type:"removed"},ur={type:"childadded",child:null},so={type:"childremoved",child:null};class fn extends rr{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:sg++}),this.uuid=xs(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=fn.DEFAULT_UP.clone();const e=new W,t=new ir,i=new Wr,r=new W(1,1,1);function s(){i.setFromEuler(t,!1)}function a(){t.setFromQuaternion(i,void 0,!1)}t._onChange(s),i._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new Ut},normalMatrix:{value:new Ve}}),this.matrix=new Ut,this.matrixWorld=new Ut,this.matrixAutoUpdate=fn.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=fn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Pu,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return hr.setFromAxisAngle(e,t),this.quaternion.multiply(hr),this}rotateOnWorldAxis(e,t){return hr.setFromAxisAngle(e,t),this.quaternion.premultiply(hr),this}rotateX(e){return this.rotateOnAxis(Wc,e)}rotateY(e){return this.rotateOnAxis(Vc,e)}rotateZ(e){return this.rotateOnAxis(Xc,e)}translateOnAxis(e,t){return Hc.copy(e).applyQuaternion(this.quaternion),this.position.add(Hc.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Wc,e)}translateY(e){return this.translateOnAxis(Vc,e)}translateZ(e){return this.translateOnAxis(Xc,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(hi.copy(this.matrixWorld).invert())}lookAt(e,t,i){e.isVector3?Rs.copy(e):Rs.set(e,t,i);const r=this.parent;this.updateWorldMatrix(!0,!1),Qr.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?hi.lookAt(Qr,Rs,this.up):hi.lookAt(Rs,Qr,this.up),this.quaternion.setFromRotationMatrix(hi),r&&(hi.extractRotation(r.matrixWorld),hr.setFromRotationMatrix(hi),this.quaternion.premultiply(hr.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(lt("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Yc),ur.child=e,this.dispatchEvent(ur),ur.child=null):lt("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(lg),so.child=e,this.dispatchEvent(so),so.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),hi.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),hi.multiply(e.parent.matrixWorld)),e.applyMatrix4(hi),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Yc),ur.child=e,this.dispatchEvent(ur),ur.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let i=0,r=this.children.length;i<r;i++){const a=this.children[i].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,i=[]){this[e]===t&&i.push(this);const r=this.children;for(let s=0,a=r.length;s<a;s++)r[s].getObjectsByProperty(e,t,i);return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Qr,e,ag),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Qr,og,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}intersectsFrustum(){}traverse(e){e(this);const t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);const e=this.pivot;if(e!==null){const t=e.x,i=e.y,r=e.z,s=this.matrix.elements;s[12]+=t-s[0]*t-s[4]*i-s[8]*r,s[13]+=i-s[1]*t-s[5]*i-s[9]*r,s[14]+=r-s[2]*t-s[6]*i-s[10]*r}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].updateMatrixWorld(e)}updateWorldMatrix(e,t,i=!1){const r=this.parent;if(e===!0&&r!==null&&r.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||i)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,i=!0),t===!0){const s=this.children;for(let a=0,o=s.length;a<o;a++)s[a].updateWorldMatrix(!1,!0,i)}}toJSON(e){const t=e===void 0||typeof e=="string",i={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const r={};r.uuid=this.uuid,r.type=this.type,r.name=this.name,r.castShadow=this.castShadow,r.receiveShadow=this.receiveShadow,r.visible=this.visible,r.frustumCulled=this.frustumCulled,r.renderOrder=this.renderOrder,r.static=this.static,r.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.pivot!==null&&(r.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(r.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(r.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),r.instanceInfo=this._instanceInfo.map(o=>({...o})),r.availableInstanceIds=this._availableInstanceIds.slice(),r.availableGeometryIds=this._availableGeometryIds.slice(),r.nextIndexStart=this._nextIndexStart,r.nextVertexStart=this._nextVertexStart,r.geometryCount=this._geometryCount,r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.matricesTexture=this._matricesTexture.toJSON(e),r.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(r.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(r.boundingBox=this.boundingBox.toJSON()));function s(o,c){return o[c.uuid]===void 0&&(o[c.uuid]=c.toJSON(e)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=s(e.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const c=o.shapes;if(Array.isArray(c))for(let l=0,u=c.length;l<u;l++){const f=c[l];s(e.shapes,f)}else s(e.shapes,c)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let c=0,l=this.material.length;c<l;c++)o.push(s(e.materials,this.material[c]));r.material=o}else r.material=s(e.materials,this.material);if(this.children.length>0){r.children=[];for(let o=0;o<this.children.length;o++)r.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let o=0;o<this.animations.length;o++){const c=this.animations[o];r.animations.push(s(e.animations,c))}}if(t){const o=a(e.geometries),c=a(e.materials),l=a(e.textures),u=a(e.images),f=a(e.shapes),d=a(e.skeletons),p=a(e.animations),g=a(e.nodes);o.length>0&&(i.geometries=o),c.length>0&&(i.materials=c),l.length>0&&(i.textures=l),u.length>0&&(i.images=u),f.length>0&&(i.shapes=f),d.length>0&&(i.skeletons=d),p.length>0&&(i.animations=p),g.length>0&&(i.nodes=g)}return i.object=r,i;function a(o){const c=[];for(const l in o){const u=o[l];delete u.metadata,c.push(u)}return c}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot!==null?e.pivot.clone():null,this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let i=0;i<e.children.length;i++){const r=e.children[i];this.add(r.clone())}return this}dispose(){this.dispatchEvent({type:"dispose"})}}fn.DEFAULT_UP=new W(0,1,0);fn.DEFAULT_MATRIX_AUTO_UPDATE=!0;fn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class ls extends fn{constructor(){super(),this.isGroup=!0,this.type="Group"}}const cg={type:"move"};class ao{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new ls,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new ls,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new W,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new W),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new ls,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new W,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new W,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const i of e.hand.values())this._getHandJoint(t,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,i){let r=null,s=null,a=null;const o=this._targetRay,c=this._grip,l=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(l&&e.hand){a=!0;for(const v of e.hand.values()){const x=t.getJointPose(v,i),m=this._getHandJoint(l,v);x!==null&&(m.matrix.fromArray(x.transform.matrix),m.matrix.decompose(m.position,m.rotation,m.scale),m.matrixWorldNeedsUpdate=!0,m.jointRadius=x.radius),m.visible=x!==null}const u=l.joints["index-finger-tip"],f=l.joints["thumb-tip"],d=u.position.distanceTo(f.position),p=.02,g=.005;l.inputState.pinching&&d>p+g?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!l.inputState.pinching&&d<=p-g&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else c!==null&&e.gripSpace&&(s=t.getPose(e.gripSpace,i),s!==null&&(c.matrix.fromArray(s.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,s.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(s.linearVelocity)):c.hasLinearVelocity=!1,s.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(s.angularVelocity)):c.hasAngularVelocity=!1,c.eventsEnabled&&c.dispatchEvent({type:"gripUpdated",data:e,target:this})));o!==null&&(r=t.getPose(e.targetRaySpace,i),r===null&&s!==null&&(r=s),r!==null&&(o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,r.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(r.linearVelocity)):o.hasLinearVelocity=!1,r.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(r.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(cg)))}return o!==null&&(o.visible=r!==null),c!==null&&(c.visible=s!==null),l!==null&&(l.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const i=new ls;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[t.jointName]=i,e.add(i)}return e.joints[t.jointName]}}const Du={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Ai={h:0,s:0,l:0},Cs={h:0,s:0,l:0};function oo(n,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?n+(e-n)*6*t:t<1/2?e:t<2/3?n+(e-n)*6*(2/3-t):n}class tt{constructor(e,t,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,i)}set(e,t,i){if(t===void 0&&i===void 0){const r=e;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(e,t,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=In){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,it.colorSpaceToWorking(this,t),this}setRGB(e,t,i,r=it.workingColorSpace){return this.r=e,this.g=t,this.b=i,it.colorSpaceToWorking(this,r),this}setHSL(e,t,i,r=it.workingColorSpace){if(e=Zm(e,1),t=rt(t,0,1),i=rt(i,0,1),t===0)this.r=this.g=this.b=i;else{const s=i<=.5?i*(1+t):i+t-i*t,a=2*i-s;this.r=oo(a,s,e+1/3),this.g=oo(a,s,e),this.b=oo(a,s,e-1/3)}return it.colorSpaceToWorking(this,r),this}setStyle(e,t=In){function i(s){s!==void 0&&parseFloat(s)<1&&Ge("Color: Alpha component of "+e+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let s;const a=r[1],o=r[2];switch(a){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,t);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,t);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,t);break;default:Ge("Color: Unknown color model "+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){const s=r[1],a=s.length;if(a===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(s,16),t);Ge("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=In){const i=Du[e.toLowerCase()];return i!==void 0?this.setHex(i,t):Ge("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Mi(e.r),this.g=Mi(e.g),this.b=Mi(e.b),this}copyLinearToSRGB(e){return this.r=Ir(e.r),this.g=Ir(e.g),this.b=Ir(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=In){return it.workingToColorSpace(on.copy(this),e),Math.round(rt(on.r*255,0,255))*65536+Math.round(rt(on.g*255,0,255))*256+Math.round(rt(on.b*255,0,255))}getHexString(e=In){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=it.workingColorSpace){it.workingToColorSpace(on.copy(this),t);const i=on.r,r=on.g,s=on.b,a=Math.max(i,r,s),o=Math.min(i,r,s);let c,l;const u=(o+a)/2;if(o===a)c=0,l=0;else{const f=a-o;switch(l=u<=.5?f/(a+o):f/(2-a-o),a){case i:c=(r-s)/f+(r<s?6:0);break;case r:c=(s-i)/f+2;break;case s:c=(i-r)/f+4;break}c/=6}return e.h=c,e.s=l,e.l=u,e}getRGB(e,t=it.workingColorSpace){return it.workingToColorSpace(on.copy(this),t),e.r=on.r,e.g=on.g,e.b=on.b,e}getStyle(e=In){it.workingToColorSpace(on.copy(this),e);const t=on.r,i=on.g,r=on.b;return e!==In?`color(${e} ${t.toFixed(3)} ${i.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(i*255)},${Math.round(r*255)})`}offsetHSL(e,t,i){return this.getHSL(Ai),this.setHSL(Ai.h+e,Ai.s+t,Ai.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,i){return this.r=e.r+(t.r-e.r)*i,this.g=e.g+(t.g-e.g)*i,this.b=e.b+(t.b-e.b)*i,this}lerpHSL(e,t){this.getHSL(Ai),e.getHSL(Cs);const i=eo(Ai.h,Cs.h,t),r=eo(Ai.s,Cs.s,t),s=eo(Ai.l,Cs.l,t);return this.setHSL(i,r,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,i=this.g,r=this.b,s=e.elements;return this.r=s[0]*t+s[3]*i+s[6]*r,this.g=s[1]*t+s[4]*i+s[7]*r,this.b=s[2]*t+s[5]*i+s[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const on=new tt;tt.NAMES=Du;class Kc extends fn{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new ir,this.environmentIntensity=1,this.environmentRotation=new ir,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),t.object.backgroundBlurriness=this.backgroundBlurriness,t.object.backgroundIntensity=this.backgroundIntensity,t.object.backgroundRotation=this.backgroundRotation.toArray(),t.object.environmentIntensity=this.environmentIntensity,t.object.environmentRotation=this.environmentRotation.toArray(),t}}const zn=new W,ui=new W,lo=new W,di=new W,dr=new W,fr=new W,qc=new W,co=new W,ho=new W,uo=new W,fo=new st,po=new st,mo=new st;class Vn{constructor(e=new W,t=new W,i=new W){this.a=e,this.b=t,this.c=i}static getNormal(e,t,i,r){r.subVectors(i,t),zn.subVectors(e,t),r.cross(zn);const s=r.lengthSq();return s>0?r.multiplyScalar(1/Math.sqrt(s)):r.set(0,0,0)}static getBarycoord(e,t,i,r,s){zn.subVectors(r,t),ui.subVectors(i,t),lo.subVectors(e,t);const a=zn.dot(zn),o=zn.dot(ui),c=zn.dot(lo),l=ui.dot(ui),u=ui.dot(lo),f=a*l-o*o;if(f===0)return s.set(0,0,0),null;const d=1/f,p=(l*c-o*u)*d,g=(a*u-o*c)*d;return s.set(1-p-g,g,p)}static containsPoint(e,t,i,r){return this.getBarycoord(e,t,i,r,di)===null?!1:di.x>=0&&di.y>=0&&di.x+di.y<=1}static getInterpolation(e,t,i,r,s,a,o,c){return this.getBarycoord(e,t,i,r,di)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(s,di.x),c.addScaledVector(a,di.y),c.addScaledVector(o,di.z),c)}static getInterpolatedAttribute(e,t,i,r,s,a){return fo.setScalar(0),po.setScalar(0),mo.setScalar(0),fo.fromBufferAttribute(e,t),po.fromBufferAttribute(e,i),mo.fromBufferAttribute(e,r),a.setScalar(0),a.addScaledVector(fo,s.x),a.addScaledVector(po,s.y),a.addScaledVector(mo,s.z),a}static isFrontFacing(e,t,i,r){return zn.subVectors(i,t),ui.subVectors(e,t),zn.cross(ui).dot(r)<0}set(e,t,i){return this.a.copy(e),this.b.copy(t),this.c.copy(i),this}setFromPointsAndIndices(e,t,i,r){return this.a.copy(e[t]),this.b.copy(e[i]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,t,i,r){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return zn.subVectors(this.c,this.b),ui.subVectors(this.a,this.b),zn.cross(ui).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return Vn.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return Vn.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,i,r,s){return Vn.getInterpolation(e,this.a,this.b,this.c,t,i,r,s)}containsPoint(e){return Vn.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return Vn.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const i=this.a,r=this.b,s=this.c;let a,o;dr.subVectors(r,i),fr.subVectors(s,i),co.subVectors(e,i);const c=dr.dot(co),l=fr.dot(co);if(c<=0&&l<=0)return t.copy(i);ho.subVectors(e,r);const u=dr.dot(ho),f=fr.dot(ho);if(u>=0&&f<=u)return t.copy(r);const d=c*f-u*l;if(d<=0&&c>=0&&u<=0)return a=c/(c-u),t.copy(i).addScaledVector(dr,a);uo.subVectors(e,s);const p=dr.dot(uo),g=fr.dot(uo);if(g>=0&&p<=g)return t.copy(s);const v=p*l-c*g;if(v<=0&&l>=0&&g<=0)return o=l/(l-g),t.copy(i).addScaledVector(fr,o);const x=u*g-p*f;if(x<=0&&f-u>=0&&p-g>=0)return qc.subVectors(s,r),o=(f-u)/(f-u+(p-g)),t.copy(r).addScaledVector(qc,o);const m=1/(x+v+d);return a=v*m,o=d*m,t.copy(i).addScaledVector(dr,a).addScaledVector(fr,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}class Vr{constructor(e=new W(1/0,1/0,1/0),t=new W(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t+=3)this.expandByPoint(kn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,i=e.count;t<i;t++)this.expandByPoint(kn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const i=kn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const i=e.geometry;if(i!==void 0){const s=i.getAttribute("position");if(t===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=s.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,kn):kn.fromBufferAttribute(s,a),kn.applyMatrix4(e.matrixWorld),this.expandByPoint(kn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Ls.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),Ls.copy(i.boundingBox)),Ls.applyMatrix4(e.matrixWorld),this.union(Ls)}const r=e.children;for(let s=0,a=r.length;s<a;s++)this.expandByObject(r[s],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,kn),kn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,i;return e.normal.x>0?(t=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),t<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(jr),Ps.subVectors(this.max,jr),pr.subVectors(e.a,jr),mr.subVectors(e.b,jr),gr.subVectors(e.c,jr),Ti.subVectors(mr,pr),Ri.subVectors(gr,mr),ki.subVectors(pr,gr);let t=[0,-Ti.z,Ti.y,0,-Ri.z,Ri.y,0,-ki.z,ki.y,Ti.z,0,-Ti.x,Ri.z,0,-Ri.x,ki.z,0,-ki.x,-Ti.y,Ti.x,0,-Ri.y,Ri.x,0,-ki.y,ki.x,0];return!go(t,pr,mr,gr,Ps)||(t=[1,0,0,0,1,0,0,0,1],!go(t,pr,mr,gr,Ps))?!1:(Ds.crossVectors(Ti,Ri),t=[Ds.x,Ds.y,Ds.z],go(t,pr,mr,gr,Ps))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,kn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(kn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(fi[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),fi[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),fi[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),fi[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),fi[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),fi[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),fi[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),fi[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(fi),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const fi=[new W,new W,new W,new W,new W,new W,new W,new W],kn=new W,Ls=new Vr,pr=new W,mr=new W,gr=new W,Ti=new W,Ri=new W,ki=new W,jr=new W,Ps=new W,Ds=new W,Gi=new W;function go(n,e,t,i,r){for(let s=0,a=n.length-3;s<=a;s+=3){Gi.fromArray(n,s);const o=r.x*Math.abs(Gi.x)+r.y*Math.abs(Gi.y)+r.z*Math.abs(Gi.z),c=e.dot(Gi),l=t.dot(Gi),u=i.dot(Gi);if(Math.max(-Math.max(c,l,u),Math.min(c,l,u))>o)return!1}return!0}const Xt=new W,Is=new We;let hg=0;class Rn extends rr{constructor(e,t,i=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:hg++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=i,this.usage=Xm,this.updateRanges=[],this.gpuType=ni,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,i){e*=this.itemSize,i*=t.itemSize;for(let r=0,s=this.itemSize;r<s;r++)this.array[e+r]=t.array[i+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,i=this.count;t<i;t++)Is.fromBufferAttribute(this,t),Is.applyMatrix3(e),this.setXY(t,Is.x,Is.y);else if(this.itemSize===3)for(let t=0,i=this.count;t<i;t++)Xt.fromBufferAttribute(this,t),Xt.applyMatrix3(e),this.setXYZ(t,Xt.x,Xt.y,Xt.z);return this}applyMatrix4(e){for(let t=0,i=this.count;t<i;t++)Xt.fromBufferAttribute(this,t),Xt.applyMatrix4(e),this.setXYZ(t,Xt.x,Xt.y,Xt.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)Xt.fromBufferAttribute(this,t),Xt.applyNormalMatrix(e),this.setXYZ(t,Xt.x,Xt.y,Xt.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)Xt.fromBufferAttribute(this,t),Xt.transformDirection(e),this.setXYZ(t,Xt.x,Xt.y,Xt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let i=this.array[e*this.itemSize+t];return this.normalized&&(i=Jr(i,this.array)),i}setComponent(e,t,i){return this.normalized&&(i=pn(i,this.array)),this.array[e*this.itemSize+t]=i,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Jr(t,this.array)),t}setX(e,t){return this.normalized&&(t=pn(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Jr(t,this.array)),t}setY(e,t){return this.normalized&&(t=pn(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Jr(t,this.array)),t}setZ(e,t){return this.normalized&&(t=pn(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Jr(t,this.array)),t}setW(e,t){return this.normalized&&(t=pn(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,i){return e*=this.itemSize,this.normalized&&(t=pn(t,this.array),i=pn(i,this.array)),this.array[e+0]=t,this.array[e+1]=i,this}setXYZ(e,t,i,r){return e*=this.itemSize,this.normalized&&(t=pn(t,this.array),i=pn(i,this.array),r=pn(r,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=r,this}setXYZW(e,t,i,r,s){return e*=this.itemSize,this.normalized&&(t=pn(t,this.array),i=pn(i,this.array),r=pn(r,this.array),s=pn(s,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=r,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return e.name=this.name,e.usage=this.usage,e.gpuType=this.gpuType,e}dispose(){this.dispatchEvent({type:"dispose"})}}class Iu extends Rn{constructor(e,t,i){super(new Uint16Array(e),t,i)}}class Nu extends Rn{constructor(e,t,i){super(new Uint32Array(e),t,i)}}class Nt extends Rn{constructor(e,t,i){super(new Float32Array(e),t,i)}}const ug=new Vr,es=new W,xo=new W;class vs{constructor(e=new W,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const i=this.center;t!==void 0?i.copy(t):ug.setFromPoints(e).getCenter(i);let r=0;for(let s=0,a=e.length;s<a;s++)r=Math.max(r,i.distanceToSquared(e[s]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const i=this.center.distanceToSquared(e);return t.copy(e),i>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;es.subVectors(e,this.center);const t=es.lengthSq();if(t>this.radius*this.radius){const i=Math.sqrt(t),r=(i-this.radius)*.5;this.center.addScaledVector(es,r/i),this.radius+=r}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(xo.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(es.copy(e.center).add(xo)),this.expandByPoint(es.copy(e.center).sub(xo))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}let dg=0;const Dn=new Ut,vo=new fn,xr=new W,Sn=new Vr,ts=new Vr,jt=new W;class $t extends rr{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:dg++}),this.uuid=xs(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Ym(e)?Nu:Iu)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,i=0){this.groups.push({start:e,count:t,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const s=new Ve().getNormalMatrix(e);i.applyNormalMatrix(s),i.needsUpdate=!0}const r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return Dn.makeRotationFromQuaternion(e),this.applyMatrix4(Dn),this}rotateX(e){return Dn.makeRotationX(e),this.applyMatrix4(Dn),this}rotateY(e){return Dn.makeRotationY(e),this.applyMatrix4(Dn),this}rotateZ(e){return Dn.makeRotationZ(e),this.applyMatrix4(Dn),this}translate(e,t,i){return Dn.makeTranslation(e,t,i),this.applyMatrix4(Dn),this}scale(e,t,i){return Dn.makeScale(e,t,i),this.applyMatrix4(Dn),this}lookAt(e){return vo.lookAt(e),vo.updateMatrix(),this.applyMatrix4(vo.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(xr).negate(),this.translate(xr.x,xr.y,xr.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const i=[];for(let r=0,s=e.length;r<s;r++){const a=e[r];i.push(a.x,a.y,a.z||0)}this.setAttribute("position",new Nt(i,3))}else{const i=Math.min(e.length,t.count);for(let r=0;r<i;r++){const s=e[r];t.setXYZ(r,s.x,s.y,s.z||0)}e.length>t.count&&Ge("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Vr);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){lt("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new W(-1/0,-1/0,-1/0),new W(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let i=0,r=t.length;i<r;i++){const s=t[i];Sn.setFromBufferAttribute(s),this.morphTargetsRelative?(jt.addVectors(this.boundingBox.min,Sn.min),this.boundingBox.expandByPoint(jt),jt.addVectors(this.boundingBox.max,Sn.max),this.boundingBox.expandByPoint(jt)):(this.boundingBox.expandByPoint(Sn.min),this.boundingBox.expandByPoint(Sn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&lt('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new vs);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){lt("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new W,1/0);return}if(e){const i=this.boundingSphere.center;if(Sn.setFromBufferAttribute(e),t)for(let s=0,a=t.length;s<a;s++){const o=t[s];ts.setFromBufferAttribute(o),this.morphTargetsRelative?(jt.addVectors(Sn.min,ts.min),Sn.expandByPoint(jt),jt.addVectors(Sn.max,ts.max),Sn.expandByPoint(jt)):(Sn.expandByPoint(ts.min),Sn.expandByPoint(ts.max))}Sn.getCenter(i);let r=0;for(let s=0,a=e.count;s<a;s++)jt.fromBufferAttribute(e,s),r=Math.max(r,i.distanceToSquared(jt));if(t)for(let s=0,a=t.length;s<a;s++){const o=t[s],c=this.morphTargetsRelative;for(let l=0,u=o.count;l<u;l++)jt.fromBufferAttribute(o,l),c&&(xr.fromBufferAttribute(e,l),jt.add(xr)),r=Math.max(r,i.distanceToSquared(jt))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&lt('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){lt("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=t.position,r=t.normal,s=t.uv;let a=this.getAttribute("tangent");(a===void 0||a.count!==i.count)&&(a=new Rn(new Float32Array(4*i.count),4),this.setAttribute("tangent",a));const o=[],c=[];for(let b=0;b<i.count;b++)o[b]=new W,c[b]=new W;const l=new W,u=new W,f=new W,d=new We,p=new We,g=new We,v=new W,x=new W;function m(b,A,P){l.fromBufferAttribute(i,b),u.fromBufferAttribute(i,A),f.fromBufferAttribute(i,P),d.fromBufferAttribute(s,b),p.fromBufferAttribute(s,A),g.fromBufferAttribute(s,P),u.sub(l),f.sub(l),p.sub(d),g.sub(d);const C=1/(p.x*g.y-g.x*p.y);isFinite(C)&&(v.copy(u).multiplyScalar(g.y).addScaledVector(f,-p.y).multiplyScalar(C),x.copy(f).multiplyScalar(p.x).addScaledVector(u,-g.x).multiplyScalar(C),o[b].add(v),o[A].add(v),o[P].add(v),c[b].add(x),c[A].add(x),c[P].add(x))}let M=this.groups;M.length===0&&(M=[{start:0,count:e.count}]);for(let b=0,A=M.length;b<A;++b){const P=M[b],C=P.start,N=P.count;for(let U=C,D=C+N;U<D;U+=3)m(e.getX(U+0),e.getX(U+1),e.getX(U+2))}const _=new W,S=new W,w=new W,E=new W;function L(b){w.fromBufferAttribute(r,b),E.copy(w);const A=o[b];_.copy(A),_.sub(w.multiplyScalar(w.dot(A))).normalize(),S.crossVectors(E,A);const C=S.dot(c[b])<0?-1:1;a.setXYZW(b,_.x,_.y,_.z,C)}for(let b=0,A=M.length;b<A;++b){const P=M[b],C=P.start,N=P.count;for(let U=C,D=C+N;U<D;U+=3)L(e.getX(U+0)),L(e.getX(U+1)),L(e.getX(U+2))}this._transformed=!0}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let i=this.getAttribute("normal");if(i===void 0||i.count!==t.count)i=new Rn(new Float32Array(t.count*3),3),this.setAttribute("normal",i);else for(let d=0,p=i.count;d<p;d++)i.setXYZ(d,0,0,0);const r=new W,s=new W,a=new W,o=new W,c=new W,l=new W,u=new W,f=new W;if(e)for(let d=0,p=e.count;d<p;d+=3){const g=e.getX(d+0),v=e.getX(d+1),x=e.getX(d+2);r.fromBufferAttribute(t,g),s.fromBufferAttribute(t,v),a.fromBufferAttribute(t,x),u.subVectors(a,s),f.subVectors(r,s),u.cross(f),o.fromBufferAttribute(i,g),c.fromBufferAttribute(i,v),l.fromBufferAttribute(i,x),o.add(u),c.add(u),l.add(u),i.setXYZ(g,o.x,o.y,o.z),i.setXYZ(v,c.x,c.y,c.z),i.setXYZ(x,l.x,l.y,l.z)}else for(let d=0,p=t.count;d<p;d+=3)r.fromBufferAttribute(t,d+0),s.fromBufferAttribute(t,d+1),a.fromBufferAttribute(t,d+2),u.subVectors(a,s),f.subVectors(r,s),u.cross(f),i.setXYZ(d+0,u.x,u.y,u.z),i.setXYZ(d+1,u.x,u.y,u.z),i.setXYZ(d+2,u.x,u.y,u.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,i=e.count;t<i;t++)jt.fromBufferAttribute(e,t),jt.normalize(),e.setXYZ(t,jt.x,jt.y,jt.z)}toNonIndexed(){function e(o,c){const l=o.array,u=o.itemSize,f=o.normalized,d=new l.constructor(c.length*u);let p=0,g=0;for(let v=0,x=c.length;v<x;v++){o.isInterleavedBufferAttribute?p=c[v]*o.data.stride+o.offset:p=c[v]*u;for(let m=0;m<u;m++)d[g++]=l[p++]}return new Rn(d,u,f)}if(this.index===null)return Ge("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new $t,i=this.index.array,r=this.attributes;for(const o in r){const c=r[o],l=e(c,i);t.setAttribute(o,l)}const s=this.morphAttributes;for(const o in s){const c=[],l=s[o];for(let u=0,f=l.length;u<f;u++){const d=l[u],p=e(d,i);c.push(p)}t.morphAttributes[o]=c}t.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,c=a.length;o<c;o++){const l=a[o];t.addGroup(l.start,l.count,l.materialIndex)}return t}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,e.name=this.name,Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){const c=this.parameters;for(const l in c)c[l]!==void 0&&(e[l]=c[l]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const i=this.attributes;for(const c in i){const l=i[c];e.data.attributes[c]=l.toJSON(e.data)}const r={};let s=!1;for(const c in this.morphAttributes){const l=this.morphAttributes[c],u=[];for(let f=0,d=l.length;f<d;f++){const p=l[f];u.push(p.toJSON(e.data))}u.length>0&&(r[c]=u,s=!0)}s&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const i=e.index;i!==null&&this.setIndex(i.clone());const r=e.attributes;for(const l in r){const u=r[l];this.setAttribute(l,u.clone(t))}const s=e.morphAttributes;for(const l in s){const u=[],f=s[l];for(let d=0,p=f.length;d<p;d++)u.push(f[d].clone(t));this.morphAttributes[l]=u}this.morphTargetsRelative=e.morphTargetsRelative;const a=e.groups;for(let l=0,u=a.length;l<u;l++){const f=a[l];this.addGroup(f.start,f.count,f.materialIndex)}const o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());const c=e.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Mo=new W,fg=new W,pg=new Ve;class Pi{constructor(e=new W(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,i,r){return this.normal.set(e,t,i),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,i){const r=Mo.subVectors(i,t).cross(fg.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,i=!0){const r=e.delta(Mo),s=this.normal.dot(r);if(s===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const a=-(e.start.dot(this.normal)+this.constant)/s;return i===!0&&(a<0||a>1)?null:t.copy(e.start).addScaledVector(r,a)}intersectsLine(e){const t=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return t<0&&i>0||i<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const i=t||pg.getNormalMatrix(e),r=this.coplanarPoint(Mo).applyMatrix4(e),s=this.normal.applyMatrix3(i).normalize();return this.constant=-r.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(e){return this.normal.fromArray(e.normal),this.constant=e.constant,this}}let mg=0;class Xr extends rr{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:mg++}),this.uuid=xs(),this.name="",this.type="Material",this.blending=Lr,this.side=er,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=uu,this.blendDst=du,this.blendEquation=wr,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new tt(0,0,0),this.blendAlpha=0,this.depthFunc=us,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Bm,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Qa,this.stencilZFail=Qa,this.stencilZPass=Qa,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const i=e[t];if(i===void 0){Ge(`Material: parameter '${t}' has value of undefined.`);continue}const r=this[t];if(r===void 0){Ge(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(i):r&&r.isVector2&&i&&i.isVector2||r&&r.isEuler&&i&&i.isEuler||r&&r.isVector3&&i&&i.isVector3?r.copy(i):this[t]=i}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const i={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,i.blending=this.blending,i.side=this.side,i.shadowSide=this.shadowSide,i.vertexColors=this.vertexColors,i.opacity=this.opacity,i.transparent=this.transparent,i.blendSrc=this.blendSrc,i.blendDst=this.blendDst,i.blendEquation=this.blendEquation,i.blendSrcAlpha=this.blendSrcAlpha,i.blendDstAlpha=this.blendDstAlpha,i.blendEquationAlpha=this.blendEquationAlpha,i.blendColor=this.blendColor.getHex(),i.blendAlpha=this.blendAlpha,i.depthFunc=this.depthFunc,i.depthTest=this.depthTest,i.depthWrite=this.depthWrite,i.colorWrite=this.colorWrite,i.clipIntersection=this.clipIntersection,i.clipShadows=this.clipShadows,i.stencilWriteMask=this.stencilWriteMask,i.stencilFunc=this.stencilFunc,i.stencilRef=this.stencilRef,i.stencilFuncMask=this.stencilFuncMask,i.stencilFail=this.stencilFail,i.stencilZFail=this.stencilZFail,i.stencilZPass=this.stencilZPass,i.stencilWrite=this.stencilWrite,i.polygonOffset=this.polygonOffset,i.polygonOffsetFactor=this.polygonOffsetFactor,i.polygonOffsetUnits=this.polygonOffsetUnits,i.dithering=this.dithering,i.alphaTest=this.alphaTest,i.alphaHash=this.alphaHash,i.alphaToCoverage=this.alphaToCoverage,i.premultipliedAlpha=this.premultipliedAlpha,i.forceSinglePass=this.forceSinglePass,i.allowOverride=this.allowOverride,i.visible=this.visible,i.toneMapped=this.toneMapped,i.name=this.name,this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(i.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(i.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(i.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(i.clippingPlanes=this.clippingPlanes.map(s=>s.toJSON())),this.rotation!==void 0&&(i.rotation=this.rotation),this.depthPacking!==void 0&&(i.depthPacking=this.depthPacking),this.linewidth!==void 0&&(i.linewidth=this.linewidth),this.linecap!==void 0&&(i.linecap=this.linecap),this.linejoin!==void 0&&(i.linejoin=this.linejoin),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.wireframe!==void 0&&(i.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(i.flatShading=this.flatShading),this.fog!==void 0&&(i.fog=this.fog),Object.keys(this.userData).length>0&&(i.userData=this.userData);function r(s){const a=[];for(const o in s){const c=s[o];delete c.metadata,a.push(c)}return a}if(t){const s=r(e.textures),a=r(e.images);s.length>0&&(i.textures=s),a.length>0&&(i.images=a)}return i}fromJSON(e,t){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new tt().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.retroreflectivity!==void 0&&(this.retroreflectivity=e.retroreflectivity),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=e.iridescenceThicknessRange),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.clippingPlanes!==void 0&&(this.clippingPlanes=e.clippingPlanes.map(i=>new Pi().fromJSON(i))),e.clipIntersection!==void 0&&(this.clipIntersection=e.clipIntersection),e.clipShadows!==void 0&&(this.clipShadows=e.clipShadows),e.depthPacking!==void 0&&(this.depthPacking=e.depthPacking),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.linecap!==void 0&&(this.linecap=e.linecap),e.linejoin!==void 0&&(this.linejoin=e.linejoin),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(typeof e.vertexColors=="number"?this.vertexColors=e.vertexColors>0:this.vertexColors=e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=t[e.map]||null),e.matcap!==void 0&&(this.matcap=t[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=t[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=t[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=t[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let i=e.normalScale;Array.isArray(i)===!1&&(i=[i,i]),this.normalScale=new We().fromArray(i)}return e.displacementMap!==void 0&&(this.displacementMap=t[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=t[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=t[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=t[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=t[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=t[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=t[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=t[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=t[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=t[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=t[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=t[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=t[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=t[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new We().fromArray(e.clearcoatNormalScale)),e.iridescenceMap!==void 0&&(this.iridescenceMap=t[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=t[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=t[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=t[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=t[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=t[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=t[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let i=null;if(t!==null){const r=t.length;i=new Array(r);for(let s=0;s!==r;++s)i[s]=t[s].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}const pi=new W,_o=new W,Ns=new W,Us=new W;class tc{constructor(e=new W,t=new W(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,pi)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const i=t.dot(this.direction);return i<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=pi.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(pi.copy(this.origin).addScaledVector(this.direction,t),pi.distanceToSquared(e))}distanceSqToSegment(e,t,i,r){_o.copy(e).add(t).multiplyScalar(.5),Ns.copy(t).sub(e).normalize(),Us.copy(this.origin).sub(_o);const s=e.distanceTo(t)*.5,a=-this.direction.dot(Ns),o=Us.dot(this.direction),c=-Us.dot(Ns),l=Us.lengthSq(),u=Math.abs(1-a*a);let f,d,p,g;if(u>0)if(f=a*c-o,d=a*o-c,g=s*u,f>=0)if(d>=-g)if(d<=g){const v=1/u;f*=v,d*=v,p=f*(f+a*d+2*o)+d*(a*f+d+2*c)+l}else d=s,f=Math.max(0,-(a*d+o)),p=-f*f+d*(d+2*c)+l;else d=-s,f=Math.max(0,-(a*d+o)),p=-f*f+d*(d+2*c)+l;else d<=-g?(f=Math.max(0,-(-a*s+o)),d=f>0?-s:Math.min(Math.max(-s,-c),s),p=-f*f+d*(d+2*c)+l):d<=g?(f=0,d=Math.min(Math.max(-s,-c),s),p=d*(d+2*c)+l):(f=Math.max(0,-(a*s+o)),d=f>0?s:Math.min(Math.max(-s,-c),s),p=-f*f+d*(d+2*c)+l);else d=a>0?-s:s,f=Math.max(0,-(a*d+o)),p=-f*f+d*(d+2*c)+l;return i&&i.copy(this.origin).addScaledVector(this.direction,f),r&&r.copy(_o).addScaledVector(Ns,d),p}intersectSphere(e,t){if(e.radius<0)return null;pi.subVectors(e.center,this.origin);const i=pi.dot(this.direction),r=pi.dot(pi)-i*i,s=e.radius*e.radius;if(r>s)return null;const a=Math.sqrt(s-r),o=i-a,c=i+a;return c<0?null:o<0?this.at(c,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(e.normal)+e.constant)/t;return i>=0?i:null}intersectPlane(e,t){const i=this.distanceToPlane(e);return i===null?null:this.at(i,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let i,r,s,a,o,c;const l=1/this.direction.x,u=1/this.direction.y,f=1/this.direction.z,d=this.origin;return l>=0?(i=(e.min.x-d.x)*l,r=(e.max.x-d.x)*l):(i=(e.max.x-d.x)*l,r=(e.min.x-d.x)*l),u>=0?(s=(e.min.y-d.y)*u,a=(e.max.y-d.y)*u):(s=(e.max.y-d.y)*u,a=(e.min.y-d.y)*u),i>a||s>r||((s>i||isNaN(i))&&(i=s),(a<r||isNaN(r))&&(r=a),f>=0?(o=(e.min.z-d.z)*f,c=(e.max.z-d.z)*f):(o=(e.max.z-d.z)*f,c=(e.min.z-d.z)*f),i>c||o>r)||((o>i||i!==i)&&(i=o),(c<r||r!==r)&&(r=c),r<0)?null:this.at(i>=0?i:r,t)}intersectsBox(e){return this.intersectBox(e,pi)!==null}intersectTriangle(e,t,i,r,s){const a=this.origin,o=this.direction,c=o.x,l=o.y,u=o.z,f=e.x-a.x,d=e.y-a.y,p=e.z-a.z,g=t.x-a.x,v=t.y-a.y,x=t.z-a.z,m=i.x-a.x,M=i.y-a.y,_=i.z-a.z,S=Math.abs(c),w=Math.abs(l),E=Math.abs(u);let L,b,A,P,C,N,U,D,O,z,V,Q;if(S>=w&&S>=E?(A=c,N=f,O=g,Q=m,c>=0?(L=l,b=u,P=d,C=p,U=v,D=x,z=M,V=_):(L=u,b=l,P=p,C=d,U=x,D=v,z=_,V=M)):w>=E?(A=l,N=d,O=v,Q=M,l>=0?(L=u,b=c,P=p,C=f,U=x,D=g,z=_,V=m):(L=c,b=u,P=f,C=p,U=g,D=x,z=m,V=_)):(A=u,N=p,O=x,Q=_,u>=0?(L=c,b=l,P=f,C=d,U=g,D=v,z=m,V=M):(L=l,b=c,P=d,C=f,U=v,D=g,z=M,V=m)),A===0)return null;const Y=L/A,te=b/A,F=1/A,ne=P-Y*N,ce=C-te*N,be=U-Y*O,Ue=D-te*O,ke=z-Y*Q,ee=V-te*Q,se=ke*Ue-ee*be,X=ne*ee-ce*ke,he=be*ce-Ue*ne;if(r){if(se<0||X<0||he<0)return null}else if((se<0||X<0||he<0)&&(se>0||X>0||he>0))return null;const ae=se+X+he;if(ae===0)return null;const Ee=F*(se*N+X*O+he*Q);return(ae>0?Ee<0:Ee>0)?null:this.at(Ee/ae,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Uu extends Xr{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new tt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new ir,this.combine=fu,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const $c=new Ut,Hi=new tc,Os=new vs,Zc=new W,Fs=new W,Bs=new W,zs=new W,So=new W,ks=new W,Jc=new W,Gs=new W;class qt extends fn{constructor(e=new $t,t=new Uu){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const r=t[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=r.length;s<a;s++){const o=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}getVertexPosition(e,t){const i=this.geometry,r=i.attributes.position,s=i.morphAttributes.position,a=i.morphTargetsRelative;t.fromBufferAttribute(r,e);const o=this.morphTargetInfluences;if(s&&o){ks.set(0,0,0);for(let c=0,l=s.length;c<l;c++){const u=o[c],f=s[c];u!==0&&(So.fromBufferAttribute(f,e),a?ks.addScaledVector(So,u):ks.addScaledVector(So.sub(t),u))}t.add(ks)}return t}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){const i=this.geometry,r=this.material,s=this.matrixWorld;r!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),Os.copy(i.boundingSphere),Os.applyMatrix4(s),Hi.copy(e.ray).recast(e.near),!(Os.containsPoint(Hi.origin)===!1&&(Hi.intersectSphere(Os,Zc)===null||Hi.origin.distanceToSquared(Zc)>(e.far-e.near)**2))&&($c.copy(s).invert(),Hi.copy(e.ray).applyMatrix4($c),!(i.boundingBox!==null&&Hi.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,t,Hi)))}_computeIntersections(e,t,i){let r;const s=this.geometry,a=this.material,o=s.index,c=s.attributes.position,l=s.attributes.uv,u=s.attributes.uv1,f=s.attributes.normal,d=s.groups,p=s.drawRange;if(o!==null)if(Array.isArray(a))for(let g=0,v=d.length;g<v;g++){const x=d[g],m=a[x.materialIndex],M=Math.max(x.start,p.start),_=Math.min(o.count,Math.min(x.start+x.count,p.start+p.count));for(let S=M,w=_;S<w;S+=3){const E=o.getX(S),L=o.getX(S+1),b=o.getX(S+2);r=Hs(this,m,e,i,l,u,f,E,L,b),r&&(r.faceIndex=Math.floor(S/3),r.face.materialIndex=x.materialIndex,t.push(r))}}else{const g=Math.max(0,p.start),v=Math.min(o.count,p.start+p.count);for(let x=g,m=v;x<m;x+=3){const M=o.getX(x),_=o.getX(x+1),S=o.getX(x+2);r=Hs(this,a,e,i,l,u,f,M,_,S),r&&(r.faceIndex=Math.floor(x/3),t.push(r))}}else if(c!==void 0)if(Array.isArray(a))for(let g=0,v=d.length;g<v;g++){const x=d[g],m=a[x.materialIndex],M=Math.max(x.start,p.start),_=Math.min(c.count,Math.min(x.start+x.count,p.start+p.count));for(let S=M,w=_;S<w;S+=3){const E=S,L=S+1,b=S+2;r=Hs(this,m,e,i,l,u,f,E,L,b),r&&(r.faceIndex=Math.floor(S/3),r.face.materialIndex=x.materialIndex,t.push(r))}}else{const g=Math.max(0,p.start),v=Math.min(c.count,p.start+p.count);for(let x=g,m=v;x<m;x+=3){const M=x,_=x+1,S=x+2;r=Hs(this,a,e,i,l,u,f,M,_,S),r&&(r.faceIndex=Math.floor(x/3),t.push(r))}}}}function gg(n,e,t,i,r,s,a,o){let c;if(e.side===xn?c=i.intersectTriangle(a,s,r,!0,o):c=i.intersectTriangle(r,s,a,e.side===er,o),c===null)return null;Gs.copy(o),Gs.applyMatrix4(n.matrixWorld);const l=t.ray.origin.distanceTo(Gs);return l<t.near||l>t.far?null:{distance:l,point:Gs.clone(),object:n}}function Hs(n,e,t,i,r,s,a,o,c,l){n.getVertexPosition(o,Fs),n.getVertexPosition(c,Bs),n.getVertexPosition(l,zs);const u=gg(n,e,t,i,Fs,Bs,zs,Jc);if(u){const f=new W;Vn.getBarycoord(Jc,Fs,Bs,zs,f),r&&(u.uv=Vn.getInterpolatedAttribute(r,o,c,l,f,new We)),s&&(u.uv1=Vn.getInterpolatedAttribute(s,o,c,l,f,new We)),a&&(u.normal=Vn.getInterpolatedAttribute(a,o,c,l,f,new W),u.normal.dot(i.direction)>0&&u.normal.multiplyScalar(-1));const d={a:o,b:c,c:l,normal:new W,materialIndex:0};Vn.getNormal(Fs,Bs,zs,d.normal),u.face=d,u.barycoord=f}return u}class Ar extends hn{constructor(e=null,t=1,i=1,r,s,a,o,c,l=Ht,u=Ht,f,d){super(null,a,o,c,l,u,r,s,f,d),this.isDataTexture=!0,this.image={data:e,width:t,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class nc extends Rn{constructor(e,t,i,r=1){super(e,t,i),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=r}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const Wi=new vs,xg=new We(.5,.5),Ws=new W;class ba{constructor(e=new Pi,t=new Pi,i=new Pi,r=new Pi,s=new Pi,a=new Pi){this.planes=[e,t,i,r,s,a]}set(e,t,i,r,s,a){const o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(i),o[3].copy(r),o[4].copy(s),o[5].copy(a),this}copy(e){const t=this.planes;for(let i=0;i<6;i++)t[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,t=ii,i=!1){const r=this.planes,s=e.elements,a=s[0],o=s[1],c=s[2],l=s[3],u=s[4],f=s[5],d=s[6],p=s[7],g=s[8],v=s[9],x=s[10],m=s[11],M=s[12],_=s[13],S=s[14],w=s[15];if(r[0].setComponents(l-a,p-u,m-g,w-M).normalize(),r[1].setComponents(l+a,p+u,m+g,w+M).normalize(),r[2].setComponents(l+o,p+f,m+v,w+_).normalize(),r[3].setComponents(l-o,p-f,m-v,w-_).normalize(),i)r[4].setComponents(c,d,x,S).normalize(),r[5].setComponents(l-c,p-d,m-x,w-S).normalize();else if(r[4].setComponents(l-c,p-d,m-x,w-S).normalize(),t===ii)r[5].setComponents(l+c,p+d,m+x,w+S).normalize();else if(t===_a)r[5].setComponents(c,d,x,S).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Wi.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Wi.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Wi)}intersectsSprite(e){Wi.center.set(0,0,0);const t=xg.distanceTo(e.center);return Wi.radius=.7071067811865476+t,Wi.applyMatrix4(e.matrixWorld),this.intersectsSphere(Wi)}intersectsSphere(e){const t=this.planes,i=e.center,r=-e.radius;for(let s=0;s<6;s++)if(t[s].distanceToPoint(i)<r)return!1;return!0}intersectsBox(e){const t=this.planes;for(let i=0;i<6;i++){const r=t[i];if(Ws.x=r.normal.x>0?e.max.x:e.min.x,Ws.y=r.normal.y>0?e.max.y:e.min.y,Ws.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(Ws)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let i=0;i<6;i++)if(t[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class Ou extends Xr{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new tt(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const ya=new W,wa=new W,Qc=new Ut,ns=new tc,Vs=new vs,bo=new W,jc=new W;class vg extends fn{constructor(e=new $t,t=new Ou){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,i=[0];for(let r=1,s=t.count;r<s;r++)ya.fromBufferAttribute(t,r-1),wa.fromBufferAttribute(t,r),i[r]=i[r-1],i[r]+=ya.distanceTo(wa);e.setAttribute("lineDistance",new Nt(i,1))}else Ge("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){const i=this.geometry,r=this.matrixWorld,s=e.params.Line.threshold,a=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),Vs.copy(i.boundingSphere),Vs.applyMatrix4(r),Vs.radius+=s,e.ray.intersectsSphere(Vs)===!1)return;Qc.copy(r).invert(),ns.copy(e.ray).applyMatrix4(Qc);const o=s/((this.scale.x+this.scale.y+this.scale.z)/3),c=o*o,l=this.isLineSegments?2:1,u=i.index,d=i.attributes.position;if(u!==null){const p=Math.max(0,a.start),g=Math.min(u.count,a.start+a.count);for(let v=p,x=g-1;v<x;v+=l){const m=u.getX(v),M=u.getX(v+1),_=Xs(this,e,ns,c,m,M,v);_&&t.push(_)}if(this.isLineLoop){const v=u.getX(g-1),x=u.getX(p),m=Xs(this,e,ns,c,v,x,g-1);m&&t.push(m)}}else{const p=Math.max(0,a.start),g=Math.min(d.count,a.start+a.count);for(let v=p,x=g-1;v<x;v+=l){const m=Xs(this,e,ns,c,v,v+1,v);m&&t.push(m)}if(this.isLineLoop){const v=Xs(this,e,ns,c,g-1,p,g-1);v&&t.push(v)}}}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const r=t[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=r.length;s<a;s++){const o=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}}function Xs(n,e,t,i,r,s,a){const o=n.geometry.attributes.position;if(ya.fromBufferAttribute(o,r),wa.fromBufferAttribute(o,s),t.distanceSqToSegment(ya,wa,bo,jc)>i)return;bo.applyMatrix4(n.matrixWorld);const l=e.ray.origin.distanceTo(bo);if(!(l<e.near||l>e.far))return{distance:l,point:jc.clone().applyMatrix4(n.matrixWorld),index:a,face:null,faceIndex:null,barycoord:null,object:n}}const eh=new W,th=new W;class ic extends vg{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,i=[];for(let r=0,s=t.count;r<s;r+=2)eh.fromBufferAttribute(t,r),th.fromBufferAttribute(t,r+1),i[r]=r===0?0:i[r-1],i[r+1]=i[r]+eh.distanceTo(th);e.setAttribute("lineDistance",new Nt(i,1))}else Ge("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class Mg extends Xr{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new tt(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const nh=new Ut,Al=new tc,Ys=new vs,Ks=new W;class Ea extends fn{constructor(e=new $t,t=new Mg){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){const i=this.geometry,r=this.matrixWorld,s=e.params.Points.threshold,a=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),Ys.copy(i.boundingSphere),Ys.applyMatrix4(r),Ys.radius+=s,e.ray.intersectsSphere(Ys)===!1)return;nh.copy(r).invert(),Al.copy(e.ray).applyMatrix4(nh);const o=s/((this.scale.x+this.scale.y+this.scale.z)/3),c=o*o,l=i.index,f=i.attributes.position;if(l!==null){const d=Math.max(0,a.start),p=Math.min(l.count,a.start+a.count);for(let g=d,v=p;g<v;g++){const x=l.getX(g);Ks.fromBufferAttribute(f,x),ih(Ks,x,c,r,e,t,this)}}else{const d=Math.max(0,a.start),p=Math.min(f.count,a.start+a.count);for(let g=d,v=p;g<v;g++)Ks.fromBufferAttribute(f,g),ih(Ks,g,c,r,e,t,this)}}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const r=t[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=r.length;s<a;s++){const o=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}}function ih(n,e,t,i,r,s,a){const o=Al.distanceSqToPoint(n);if(o<t){const c=new W;Al.closestPointToPoint(n,c),c.applyMatrix4(i);const l=r.ray.origin.distanceTo(c);if(l<r.near||l>r.far)return;s.push({distance:l,distanceToRay:Math.sqrt(o),point:c,index:e,face:null,faceIndex:null,barycoord:null,object:a})}}class Fu extends hn{constructor(e=[],t=tr,i,r,s,a,o,c,l,u){super(e,t,i,r,s,a,o,c,l,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class _g extends hn{constructor(e,t,i,r,s,a,o,c,l){super(e,t,i,r,s,a,o,c,l),this.isCanvasTexture=!0,this.needsUpdate=!0}}class zr extends hn{constructor(e,t,i=ai,r,s,a,o=Ht,c=Ht,l,u=_i,f=1){if(u!==_i&&u!==Zi)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const d={width:e,height:t,depth:f};super(d,r,s,a,o,c,u,i,l),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new ec(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return t.compareFunction=this.compareFunction,t}}class Sg extends zr{constructor(e,t=ai,i=tr,r,s,a=Ht,o=Ht,c,l=_i){const u={width:e,height:e,depth:1},f=[u,u,u,u,u,u];super(e,e,t,i,r,s,a,o,c,l),this.image=f,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}}class Bu extends hn{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}}class Ms extends $t{constructor(e=1,t=1,i=1,r=1,s=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:i,widthSegments:r,heightSegments:s,depthSegments:a};const o=this;r=Math.floor(r),s=Math.floor(s),a=Math.floor(a);const c=[],l=[],u=[],f=[];let d=0,p=0;g("z","y","x",-1,-1,i,t,e,a,s,0),g("z","y","x",1,-1,i,t,-e,a,s,1),g("x","z","y",1,1,e,i,t,r,a,2),g("x","z","y",1,-1,e,i,-t,r,a,3),g("x","y","z",1,-1,e,t,i,r,s,4),g("x","y","z",-1,-1,e,t,-i,r,s,5),this.setIndex(c),this.setAttribute("position",new Nt(l,3)),this.setAttribute("normal",new Nt(u,3)),this.setAttribute("uv",new Nt(f,2));function g(v,x,m,M,_,S,w,E,L,b,A){const P=S/L,C=w/b,N=S/2,U=w/2,D=E/2,O=L+1,z=b+1;let V=0,Q=0;const Y=new W;for(let te=0;te<z;te++){const F=te*C-U;for(let ne=0;ne<O;ne++){const ce=ne*P-N;Y[v]=ce*M,Y[x]=F*_,Y[m]=D,l.push(Y.x,Y.y,Y.z),Y[v]=0,Y[x]=0,Y[m]=E>0?1:-1,u.push(Y.x,Y.y,Y.z),f.push(ne/L),f.push(1-te/b),V+=1}}for(let te=0;te<b;te++)for(let F=0;F<L;F++){const ne=d+F+O*te,ce=d+F+O*(te+1),be=d+(F+1)+O*(te+1),Ue=d+(F+1)+O*te;c.push(ne,ce,Ue),c.push(ce,be,Ue),Q+=6}o.addGroup(p,Q,A),p+=Q,d+=V}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ms(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}class Ln extends $t{constructor(e=1,t=1,i=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:i,heightSegments:r};const s=e/2,a=t/2,o=Math.floor(i),c=Math.floor(r),l=o+1,u=c+1,f=e/o,d=t/c,p=[],g=[],v=[],x=[];for(let m=0;m<u;m++){const M=m*d-a;for(let _=0;_<l;_++){const S=_*f-s;g.push(S,-M,0),v.push(0,0,1),x.push(_/o),x.push(1-m/c)}}for(let m=0;m<c;m++)for(let M=0;M<o;M++){const _=M+l*m,S=M+l*(m+1),w=M+1+l*(m+1),E=M+1+l*m;p.push(_,S,E),p.push(S,w,E)}this.setIndex(p),this.setAttribute("position",new Nt(g,3)),this.setAttribute("normal",new Nt(v,3)),this.setAttribute("uv",new Nt(x,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ln(e.width,e.height,e.widthSegments,e.heightSegments)}}function kr(n){const e={};for(const t in n){e[t]={};for(const i in n[t]){const r=n[t][i];if(rh(r))r.isRenderTargetTexture?(Ge("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][i]=null):e[t][i]=r.clone();else if(Array.isArray(r))if(rh(r[0])){const s=[];for(let a=0,o=r.length;a<o;a++)s[a]=r[a].clone();e[t][i]=s}else e[t][i]=r.slice();else e[t][i]=r}}return e}function dn(n){const e={};for(let t=0;t<n.length;t++){const i=kr(n[t]);for(const r in i)e[r]=i[r]}return e}function rh(n){return n&&(n.isColor||n.isMatrix3||n.isMatrix4||n.isVector2||n.isVector3||n.isVector4||n.isTexture||n.isQuaternion)}function bg(n){const e=[];for(let t=0;t<n.length;t++)e.push(n[t].clone());return e}function zu(n){const e=n.getRenderTarget();return e===null?n.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:it.workingColorSpace}const yg={clone:kr,merge:dn};var wg=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Eg=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class yt extends Xr{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=wg,this.fragmentShader=Eg,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=kr(e.uniforms),this.uniformsGroups=bg(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const r in this.uniforms){const a=this.uniforms[r].value;a&&a.isTexture?t.uniforms[r]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[r]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[r]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[r]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[r]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[r]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[r]={type:"m4",value:a.toArray()}:t.uniforms[r]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const i={};for(const r in this.extensions)this.extensions[r]===!0&&(i[r]=!0);return Object.keys(i).length>0&&(t.extensions=i),t}fromJSON(e,t){if(super.fromJSON(e,t),e.uniforms!==void 0)for(const i in e.uniforms){const r=e.uniforms[i];switch(this.uniforms[i]={},r.type){case"t":this.uniforms[i].value=t[r.value]||null;break;case"c":this.uniforms[i].value=new tt().setHex(r.value);break;case"v2":this.uniforms[i].value=new We().fromArray(r.value);break;case"v3":this.uniforms[i].value=new W().fromArray(r.value);break;case"v4":this.uniforms[i].value=new st().fromArray(r.value);break;case"m3":this.uniforms[i].value=new Ve().fromArray(r.value);break;case"m4":this.uniforms[i].value=new Ut().fromArray(r.value);break;default:this.uniforms[i].value=r.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(const i in e.extensions)this.extensions[i]=e.extensions[i];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}}class Ag extends yt{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class Tg extends Xr{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Om,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class Rg extends Xr{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const qs=new W,$s=new Wr,Jn=new W;class ku extends fn{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Ut,this.projectionMatrix=new Ut,this.projectionMatrixInverse=new Ut,this.coordinateSystem=ii,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(qs,$s,Jn),Jn.x===1&&Jn.y===1&&Jn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(qs,$s,Jn.set(1,1,1)).invert()}updateWorldMatrix(e,t,i=!1){super.updateWorldMatrix(e,t,i),this.matrixWorld.decompose(qs,$s,Jn),Jn.x===1&&Jn.y===1&&Jn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(qs,$s,Jn.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}const Ci=new W,sh=new We,ah=new We;class yn extends ku{constructor(e=50,t=1,i=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=El*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(ja*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return El*2*Math.atan(Math.tan(ja*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,i){Ci.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Ci.x,Ci.y).multiplyScalar(-e/Ci.z),Ci.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(Ci.x,Ci.y).multiplyScalar(-e/Ci.z)}getViewSize(e,t){return this.getViewBounds(e,sh,ah),t.subVectors(ah,sh)}setViewOffset(e,t,i,r,s,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(ja*.5*this.fov)/this.zoom,i=2*t,r=this.aspect*i,s=-.5*r;const a=this.view;if(this.view!==null&&this.view.enabled){const c=a.fullWidth,l=a.fullHeight;s+=a.offsetX*r/c,t-=a.offsetY*i/l,r*=a.width/c,i*=a.height/l}const o=this.filmOffset;o!==0&&(s+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+r,t,t-i,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}class rc extends ku{constructor(e=-1,t=1,i=1,r=-1,s=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=i,this.bottom=r,this.near=s,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,i,r,s,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,r=(this.top+this.bottom)/2;let s=i-e,a=i+e,o=r+t,c=r-t;if(this.view!==null&&this.view.enabled){const l=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=l*this.view.offsetX,a=s+l*this.view.width,o-=u*this.view.offsetY,c=o-u*this.view.height}this.projectionMatrix.makeOrthographic(s,a,o,c,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}class sc extends $t{constructor(){super(),this.isInstancedBufferGeometry=!0,this.type="InstancedBufferGeometry",this.instanceCount=1/0}copy(e){return super.copy(e),this.instanceCount=e.instanceCount,this}toJSON(){const e=super.toJSON();return e.instanceCount=this.instanceCount,e.isInstancedBufferGeometry=!0,e}}const vr=-90,Mr=1;class Cg extends fn{constructor(e,t,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const r=new yn(vr,Mr,e,t);r.layers=this.layers,this.add(r);const s=new yn(vr,Mr,e,t);s.layers=this.layers,this.add(s);const a=new yn(vr,Mr,e,t);a.layers=this.layers,this.add(a);const o=new yn(vr,Mr,e,t);o.layers=this.layers,this.add(o);const c=new yn(vr,Mr,e,t);c.layers=this.layers,this.add(c);const l=new yn(vr,Mr,e,t);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[i,r,s,a,o,c]=t;for(const l of t)this.remove(l);if(e===ii)i.up.set(0,1,0),i.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(e===_a)i.up.set(0,-1,0),i.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const l of t)this.add(l),l.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[s,a,o,c,l,u]=this.children,f=e.getRenderTarget(),d=e.getActiveCubeFace(),p=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;const v=i.texture.generateMipmaps;i.texture.generateMipmaps=!1;let x=!1;e.isWebGLRenderer===!0?x=e.state.buffers.depth.getReversed():x=e.reversedDepthBuffer,e.setRenderTarget(i,0,r),x&&e.autoClear===!1&&e.clearDepth(),e.render(t,s),e.setRenderTarget(i,1,r),x&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(i,2,r),x&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(i,3,r),x&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),e.setRenderTarget(i,4,r),x&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),i.texture.generateMipmaps=v,e.setRenderTarget(i,5,r),x&&e.autoClear===!1&&e.clearDepth(),e.render(t,u),e.setRenderTarget(f,d,p),e.xr.enabled=g,i.texture.needsPMREMUpdate=!0}}class Lg extends yn{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}class Gu{static{Gu.prototype.isMatrix2=!0}constructor(e,t,i,r){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,i,r)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let i=0;i<4;i++)this.elements[i]=e[i+t];return this}set(e,t,i,r){const s=this.elements;return s[0]=e,s[2]=t,s[1]=i,s[3]=r,this}}function oh(n,e,t,i){const r=Pg(i);switch(t){case Au:return n*e;case Ru:return n*e/r.components*r.byteLength;case $l:return n*e/r.components*r.byteLength;case nr:return n*e*2/r.components*r.byteLength;case Zl:return n*e*2/r.components*r.byteLength;case Tu:return n*e*3/r.components*r.byteLength;case En:return n*e*4/r.components*r.byteLength;case Jl:return n*e*4/r.components*r.byteLength;case oa:case la:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case ca:case ha:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case Zo:case Qo:return Math.max(n,16)*Math.max(e,8)/4;case $o:case Jo:return Math.max(n,8)*Math.max(e,8)/2;case jo:case el:case nl:case il:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case tl:case xa:case rl:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case sl:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case al:return Math.floor((n+4)/5)*Math.floor((e+3)/4)*16;case ol:return Math.floor((n+4)/5)*Math.floor((e+4)/5)*16;case ll:return Math.floor((n+5)/6)*Math.floor((e+4)/5)*16;case cl:return Math.floor((n+5)/6)*Math.floor((e+5)/6)*16;case hl:return Math.floor((n+7)/8)*Math.floor((e+4)/5)*16;case ul:return Math.floor((n+7)/8)*Math.floor((e+5)/6)*16;case dl:return Math.floor((n+7)/8)*Math.floor((e+7)/8)*16;case fl:return Math.floor((n+9)/10)*Math.floor((e+4)/5)*16;case pl:return Math.floor((n+9)/10)*Math.floor((e+5)/6)*16;case ml:return Math.floor((n+9)/10)*Math.floor((e+7)/8)*16;case gl:return Math.floor((n+9)/10)*Math.floor((e+9)/10)*16;case xl:return Math.floor((n+11)/12)*Math.floor((e+9)/10)*16;case vl:return Math.floor((n+11)/12)*Math.floor((e+11)/12)*16;case Ml:case _l:case Sl:return Math.ceil(n/4)*Math.ceil(e/4)*16;case bl:case yl:return Math.ceil(n/4)*Math.ceil(e/4)*8;case va:case wl:return Math.ceil(n/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function Pg(n){switch(n){case wn:case bu:return{byteLength:1,components:1};case ds:case yu:case oi:return{byteLength:2,components:1};case Kl:case ql:return{byteLength:2,components:4};case ai:case Yl:case ni:return{byteLength:4,components:1};case wu:case Eu:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${n}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Hl}}));typeof window<"u"&&(window.__THREE__?Ge("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Hl);function Hu(){let n=null,e=!1,t=null,i=null;function r(s,a){i=n.requestAnimationFrame(r),t(s,a)}return{start:function(){e!==!0&&t!==null&&n!==null&&(i=n.requestAnimationFrame(r),e=!0)},stop:function(){n!==null&&n.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(s){t=s},setContext:function(s){n=s}}}function Dg(n){const e=new WeakMap;function t(o,c){const l=o.array,u=o.usage,f=l.byteLength,d=n.createBuffer();n.bindBuffer(c,d),n.bufferData(c,l,u),o.onUploadCallback();let p;if(l instanceof Float32Array)p=n.FLOAT;else if(typeof Float16Array<"u"&&l instanceof Float16Array)p=n.HALF_FLOAT;else if(l instanceof Uint16Array)o.isFloat16BufferAttribute?p=n.HALF_FLOAT:p=n.UNSIGNED_SHORT;else if(l instanceof Int16Array)p=n.SHORT;else if(l instanceof Uint32Array)p=n.UNSIGNED_INT;else if(l instanceof Int32Array)p=n.INT;else if(l instanceof Int8Array)p=n.BYTE;else if(l instanceof Uint8Array)p=n.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)p=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:d,type:p,bytesPerElement:l.BYTES_PER_ELEMENT,version:o.version,size:f}}function i(o,c,l){const u=c.array,f=c.updateRanges;if(n.bindBuffer(l,o),f.length===0)n.bufferSubData(l,0,u);else{f.sort((p,g)=>p.start-g.start);let d=0;for(let p=1;p<f.length;p++){const g=f[d],v=f[p];v.start<=g.start+g.count+1?g.count=Math.max(g.count,v.start+v.count-g.start):(++d,f[d]=v)}f.length=d+1;for(let p=0,g=f.length;p<g;p++){const v=f[p];n.bufferSubData(l,v.start*u.BYTES_PER_ELEMENT,u,v.start,v.count)}c.clearUpdateRanges()}c.onUploadCallback()}function r(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function s(o){o.isInterleavedBufferAttribute&&(o=o.data);const c=e.get(o);c&&(n.deleteBuffer(c.buffer),e.delete(o))}function a(o,c){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const u=e.get(o);(!u||u.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const l=e.get(o);if(l===void 0)e.set(o,t(o,c));else if(l.version<o.version){if(l.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(l.buffer,o,c),l.version=o.version}}return{get:r,remove:s,update:a}}var Ig=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Ng=`#ifdef USE_ALPHAHASH
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
#endif`,Ug=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Og=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Fg=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Bg=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,zg=`#ifdef USE_AOMAP
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
#endif`,kg=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Gg=`#ifdef USE_BATCHING
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
#endif`,Hg=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Wg=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Vg=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Xg=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,Yg=`#ifdef USE_IRIDESCENCE
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
#endif`,Kg=`#ifdef USE_BUMPMAP
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
#endif`,qg=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,$g=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Zg=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Jg=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Qg=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,jg=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,e1=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,t1=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
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
#endif`,n1=`#define PI 3.141592653589793
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
} // validated`,i1=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,r1=`vec3 transformedNormal = objectNormal;
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
#endif`,s1=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,a1=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,o1=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,l1=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,c1="gl_FragColor = linearToOutputTexel( gl_FragColor );",h1=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,u1=`#ifdef USE_ENVMAP
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
#endif`,d1=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,f1=`#ifdef USE_ENVMAP
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
#endif`,p1=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,m1=`#ifdef USE_ENVMAP
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
#endif`,g1=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,x1=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,v1=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,M1=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,_1=`#ifdef USE_GRADIENTMAP
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
}`,S1=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,b1=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,y1=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,w1=`uniform bool receiveShadow;
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
#include <lightprobes_pars_fragment>`,E1=`#ifdef USE_ENVMAP
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
#endif`,A1=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,T1=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,R1=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,C1=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,L1=`PhysicalMaterial material;
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
#endif`,P1=`uniform sampler2D dfgLUT;
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
}`,D1=`
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
#endif`,I1=`#if defined( RE_IndirectDiffuse )
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
#endif`,N1=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,U1=`#ifdef USE_LIGHT_PROBES_GRID
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
#endif`,O1=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,F1=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,B1=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,z1=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,k1=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,G1=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,H1=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,W1=`#if defined( USE_POINTS_UV )
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
#endif`,V1=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,X1=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Y1=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,K1=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,q1=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,$1=`#ifdef USE_MORPHTARGETS
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
#endif`,Z1=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,J1=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,Q1=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,j1=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,e2=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,t2=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,n2=`#ifdef USE_NORMALMAP
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
#endif`,i2=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,r2=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,s2=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,a2=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,o2=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,l2=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,c2=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,h2=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,u2=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,d2=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,f2=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,p2=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,m2=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,g2=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,x2=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,v2=`float getShadowMask() {
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
}`,M2=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,_2=`#ifdef USE_SKINNING
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
#endif`,S2=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,b2=`#ifdef USE_SKINNING
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
#endif`,y2=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,w2=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,E2=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,A2=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,T2=`#ifdef USE_TRANSMISSION
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
#endif`,R2=`#ifdef USE_TRANSMISSION
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
#endif`,C2=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,L2=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,P2=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,D2=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const I2=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,N2=`uniform sampler2D t2D;
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
}`,U2=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,O2=`#ifdef ENVMAP_TYPE_CUBE
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
}`,F2=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,B2=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,z2=`#include <common>
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
}`,k2=`#if DEPTH_PACKING == 3200
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
}`,G2=`#define DISTANCE
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
}`,H2=`#define DISTANCE
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
}`,W2=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,V2=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,X2=`uniform float scale;
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
}`,Y2=`uniform vec3 diffuse;
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
}`,K2=`#include <common>
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
}`,q2=`uniform vec3 diffuse;
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
}`,$2=`#define LAMBERT
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
}`,Z2=`#define LAMBERT
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
}`,J2=`#define MATCAP
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
}`,Q2=`#define MATCAP
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
}`,j2=`#define NORMAL
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
}`,ex=`#define NORMAL
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
}`,tx=`#define PHONG
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
}`,nx=`#define PHONG
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
}`,ix=`#define STANDARD
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
}`,rx=`#define STANDARD
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
}`,sx=`#define TOON
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
}`,ax=`#define TOON
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
}`,ox=`uniform float size;
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
}`,lx=`uniform vec3 diffuse;
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
}`,cx=`#include <common>
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
}`,hx=`uniform vec3 color;
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
}`,ux=`uniform float rotation;
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
}`,dx=`uniform vec3 diffuse;
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
}`,et={alphahash_fragment:Ig,alphahash_pars_fragment:Ng,alphamap_fragment:Ug,alphamap_pars_fragment:Og,alphatest_fragment:Fg,alphatest_pars_fragment:Bg,aomap_fragment:zg,aomap_pars_fragment:kg,batching_pars_vertex:Gg,batching_vertex:Hg,begin_vertex:Wg,beginnormal_vertex:Vg,bsdfs:Xg,iridescence_fragment:Yg,bumpmap_pars_fragment:Kg,clipping_planes_fragment:qg,clipping_planes_pars_fragment:$g,clipping_planes_pars_vertex:Zg,clipping_planes_vertex:Jg,color_fragment:Qg,color_pars_fragment:jg,color_pars_vertex:e1,color_vertex:t1,common:n1,cube_uv_reflection_fragment:i1,defaultnormal_vertex:r1,displacementmap_pars_vertex:s1,displacementmap_vertex:a1,emissivemap_fragment:o1,emissivemap_pars_fragment:l1,colorspace_fragment:c1,colorspace_pars_fragment:h1,envmap_fragment:u1,envmap_common_pars_fragment:d1,envmap_pars_fragment:f1,envmap_pars_vertex:p1,envmap_physical_pars_fragment:E1,envmap_vertex:m1,fog_vertex:g1,fog_pars_vertex:x1,fog_fragment:v1,fog_pars_fragment:M1,gradientmap_pars_fragment:_1,lightmap_pars_fragment:S1,lights_lambert_fragment:b1,lights_lambert_pars_fragment:y1,lights_pars_begin:w1,lights_toon_fragment:A1,lights_toon_pars_fragment:T1,lights_phong_fragment:R1,lights_phong_pars_fragment:C1,lights_physical_fragment:L1,lights_physical_pars_fragment:P1,lights_fragment_begin:D1,lights_fragment_maps:I1,lights_fragment_end:N1,lightprobes_pars_fragment:U1,logdepthbuf_fragment:O1,logdepthbuf_pars_fragment:F1,logdepthbuf_pars_vertex:B1,logdepthbuf_vertex:z1,map_fragment:k1,map_pars_fragment:G1,map_particle_fragment:H1,map_particle_pars_fragment:W1,metalnessmap_fragment:V1,metalnessmap_pars_fragment:X1,morphinstance_vertex:Y1,morphcolor_vertex:K1,morphnormal_vertex:q1,morphtarget_pars_vertex:$1,morphtarget_vertex:Z1,normal_fragment_begin:J1,normal_fragment_maps:Q1,normal_pars_fragment:j1,normal_pars_vertex:e2,normal_vertex:t2,normalmap_pars_fragment:n2,clearcoat_normal_fragment_begin:i2,clearcoat_normal_fragment_maps:r2,clearcoat_pars_fragment:s2,iridescence_pars_fragment:a2,opaque_fragment:o2,packing:l2,premultiplied_alpha_fragment:c2,project_vertex:h2,dithering_fragment:u2,dithering_pars_fragment:d2,roughnessmap_fragment:f2,roughnessmap_pars_fragment:p2,shadowmap_pars_fragment:m2,shadowmap_pars_vertex:g2,shadowmap_vertex:x2,shadowmask_pars_fragment:v2,skinbase_vertex:M2,skinning_pars_vertex:_2,skinning_vertex:S2,skinnormal_vertex:b2,specularmap_fragment:y2,specularmap_pars_fragment:w2,tonemapping_fragment:E2,tonemapping_pars_fragment:A2,transmission_fragment:T2,transmission_pars_fragment:R2,uv_pars_fragment:C2,uv_pars_vertex:L2,uv_vertex:P2,worldpos_vertex:D2,background_vert:I2,background_frag:N2,backgroundCube_vert:U2,backgroundCube_frag:O2,cube_vert:F2,cube_frag:B2,depth_vert:z2,depth_frag:k2,distance_vert:G2,distance_frag:H2,equirect_vert:W2,equirect_frag:V2,linedashed_vert:X2,linedashed_frag:Y2,meshbasic_vert:K2,meshbasic_frag:q2,meshlambert_vert:$2,meshlambert_frag:Z2,meshmatcap_vert:J2,meshmatcap_frag:Q2,meshnormal_vert:j2,meshnormal_frag:ex,meshphong_vert:tx,meshphong_frag:nx,meshphysical_vert:ix,meshphysical_frag:rx,meshtoon_vert:sx,meshtoon_frag:ax,points_vert:ox,points_frag:lx,shadow_vert:cx,shadow_frag:hx,sprite_vert:ux,sprite_frag:dx},ve={common:{diffuse:{value:new tt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ve},alphaMap:{value:null},alphaMapTransform:{value:new Ve},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ve}},envmap:{envMap:{value:null},envMapRotation:{value:new Ve},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ve}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ve}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ve},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ve},normalScale:{value:new We(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ve},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ve}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ve}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ve}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new tt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new W},probesMax:{value:new W},probesResolution:{value:new W}},points:{diffuse:{value:new tt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ve},alphaTest:{value:0},uvTransform:{value:new Ve}},sprite:{diffuse:{value:new tt(16777215)},opacity:{value:1},center:{value:new We(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ve},alphaMap:{value:null},alphaMapTransform:{value:new Ve},alphaTest:{value:0}}},ei={basic:{uniforms:dn([ve.common,ve.specularmap,ve.envmap,ve.aomap,ve.lightmap,ve.fog]),vertexShader:et.meshbasic_vert,fragmentShader:et.meshbasic_frag},lambert:{uniforms:dn([ve.common,ve.specularmap,ve.envmap,ve.aomap,ve.lightmap,ve.emissivemap,ve.bumpmap,ve.normalmap,ve.displacementmap,ve.fog,ve.lights,{emissive:{value:new tt(0)},envMapIntensity:{value:1}}]),vertexShader:et.meshlambert_vert,fragmentShader:et.meshlambert_frag},phong:{uniforms:dn([ve.common,ve.specularmap,ve.envmap,ve.aomap,ve.lightmap,ve.emissivemap,ve.bumpmap,ve.normalmap,ve.displacementmap,ve.fog,ve.lights,{emissive:{value:new tt(0)},specular:{value:new tt(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:et.meshphong_vert,fragmentShader:et.meshphong_frag},standard:{uniforms:dn([ve.common,ve.envmap,ve.aomap,ve.lightmap,ve.emissivemap,ve.bumpmap,ve.normalmap,ve.displacementmap,ve.roughnessmap,ve.metalnessmap,ve.fog,ve.lights,{emissive:{value:new tt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:et.meshphysical_vert,fragmentShader:et.meshphysical_frag},toon:{uniforms:dn([ve.common,ve.aomap,ve.lightmap,ve.emissivemap,ve.bumpmap,ve.normalmap,ve.displacementmap,ve.gradientmap,ve.fog,ve.lights,{emissive:{value:new tt(0)}}]),vertexShader:et.meshtoon_vert,fragmentShader:et.meshtoon_frag},matcap:{uniforms:dn([ve.common,ve.bumpmap,ve.normalmap,ve.displacementmap,ve.fog,{matcap:{value:null}}]),vertexShader:et.meshmatcap_vert,fragmentShader:et.meshmatcap_frag},points:{uniforms:dn([ve.points,ve.fog]),vertexShader:et.points_vert,fragmentShader:et.points_frag},dashed:{uniforms:dn([ve.common,ve.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:et.linedashed_vert,fragmentShader:et.linedashed_frag},depth:{uniforms:dn([ve.common,ve.displacementmap]),vertexShader:et.depth_vert,fragmentShader:et.depth_frag},normal:{uniforms:dn([ve.common,ve.bumpmap,ve.normalmap,ve.displacementmap,{opacity:{value:1}}]),vertexShader:et.meshnormal_vert,fragmentShader:et.meshnormal_frag},sprite:{uniforms:dn([ve.sprite,ve.fog]),vertexShader:et.sprite_vert,fragmentShader:et.sprite_frag},background:{uniforms:{uvTransform:{value:new Ve},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:et.background_vert,fragmentShader:et.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Ve}},vertexShader:et.backgroundCube_vert,fragmentShader:et.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:et.cube_vert,fragmentShader:et.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:et.equirect_vert,fragmentShader:et.equirect_frag},distance:{uniforms:dn([ve.common,ve.displacementmap,{referencePosition:{value:new W},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:et.distance_vert,fragmentShader:et.distance_frag},shadow:{uniforms:dn([ve.lights,ve.fog,{color:{value:new tt(0)},opacity:{value:1}}]),vertexShader:et.shadow_vert,fragmentShader:et.shadow_frag}};ei.physical={uniforms:dn([ei.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ve},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ve},clearcoatNormalScale:{value:new We(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ve},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ve},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ve},sheen:{value:0},sheenColor:{value:new tt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ve},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ve},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ve},transmissionSamplerSize:{value:new We},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ve},attenuationDistance:{value:0},attenuationColor:{value:new tt(0)},specularColor:{value:new tt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ve},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ve},anisotropyVector:{value:new We},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ve}}]),vertexShader:et.meshphysical_vert,fragmentShader:et.meshphysical_frag};const Zs={r:0,b:0,g:0},fx=new Ut,Wu=new Ve;Wu.set(-1,0,0,0,1,0,0,0,1);function px(n,e,t,i,r,s){const a=new tt(0);let o=r===!0?0:1,c,l,u=null,f=0,d=null;function p(M){let _=M.isScene===!0?M.background:null;if(_&&_.isTexture){const S=M.backgroundBlurriness>0;_=e.get(_,S)}return _}function g(M){let _=!1;const S=p(M);S===null?x(a,o):S&&S.isColor&&(x(S,1),_=!0);const w=n.xr.getEnvironmentBlendMode();w==="additive"?t.buffers.color.setClear(0,0,0,1,s):w==="alpha-blend"&&t.buffers.color.setClear(0,0,0,0,s),(n.autoClear||_)&&(t.buffers.depth.setTest(!0),t.buffers.depth.setMask(!0),t.buffers.color.setMask(!0),n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil))}function v(M,_){const S=p(_);S&&(S.isCubeTexture||S.mapping===Fa)?(l===void 0&&(l=new qt(new Ms(1,1,1),new yt({name:"BackgroundCubeMaterial",uniforms:kr(ei.backgroundCube.uniforms),vertexShader:ei.backgroundCube.vertexShader,fragmentShader:ei.backgroundCube.fragmentShader,side:xn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),l.geometry.deleteAttribute("uv"),l.onBeforeRender=function(w,E,L){this.matrixWorld.copyPosition(L.matrixWorld)},Object.defineProperty(l.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(l)),l.material.uniforms.envMap.value=S,l.material.uniforms.backgroundBlurriness.value=_.backgroundBlurriness,l.material.uniforms.backgroundIntensity.value=_.backgroundIntensity,l.material.uniforms.backgroundRotation.value.setFromMatrix4(fx.makeRotationFromEuler(_.backgroundRotation)).transpose(),S.isCubeTexture&&S.isRenderTargetTexture===!1&&l.material.uniforms.backgroundRotation.value.premultiply(Wu),l.material.toneMapped=it.getTransfer(S.colorSpace)!==vt,(u!==S||f!==S.version||d!==n.toneMapping)&&(l.material.needsUpdate=!0,u=S,f=S.version,d=n.toneMapping),l.layers.enableAll(),M.unshift(l,l.geometry,l.material,0,0,null)):S&&S.isTexture&&(c===void 0&&(c=new qt(new Ln(2,2),new yt({name:"BackgroundMaterial",uniforms:kr(ei.background.uniforms),vertexShader:ei.background.vertexShader,fragmentShader:ei.background.fragmentShader,side:er,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(c)),c.material.uniforms.t2D.value=S,c.material.uniforms.backgroundIntensity.value=_.backgroundIntensity,c.material.toneMapped=it.getTransfer(S.colorSpace)!==vt,S.matrixAutoUpdate===!0&&S.updateMatrix(),c.material.uniforms.uvTransform.value.copy(S.matrix),(u!==S||f!==S.version||d!==n.toneMapping)&&(c.material.needsUpdate=!0,u=S,f=S.version,d=n.toneMapping),c.layers.enableAll(),M.unshift(c,c.geometry,c.material,0,0,null))}function x(M,_){M.getRGB(Zs,zu(n)),t.buffers.color.setClear(Zs.r,Zs.g,Zs.b,_,s)}function m(){l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return a},setClearColor:function(M,_=1){a.set(M),o=_,x(a,o)},getClearAlpha:function(){return o},setClearAlpha:function(M){o=M,x(a,o)},render:g,addToRenderList:v,dispose:m}}function mx(n,e){const t=n.getParameter(n.MAX_VERTEX_ATTRIBS),i={},r=d(null);let s=r,a=!1;function o(C,N,U,D,O){let z=!1;const V=f(C,D,U,N);s!==V&&(s=V,l(s.object)),z=p(C,D,U,O),z&&g(C,D,U,O),O!==null&&e.update(O,n.ELEMENT_ARRAY_BUFFER),(z||a)&&(a=!1,S(C,N,U,D),O!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,e.get(O).buffer))}function c(){return n.createVertexArray()}function l(C){return n.bindVertexArray(C)}function u(C){return n.deleteVertexArray(C)}function f(C,N,U,D){const O=D.wireframe===!0;let z=i[N.id];z===void 0&&(z={},i[N.id]=z);const V=C.isInstancedMesh===!0?C.id:0;let Q=z[V];Q===void 0&&(Q={},z[V]=Q);let Y=Q[U.id];Y===void 0&&(Y={},Q[U.id]=Y);let te=Y[O];return te===void 0&&(te=d(c()),Y[O]=te),te}function d(C){const N=[],U=[],D=[];for(let O=0;O<t;O++)N[O]=0,U[O]=0,D[O]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:N,enabledAttributes:U,attributeDivisors:D,object:C,attributes:{},index:null}}function p(C,N,U,D){const O=s.attributes,z=N.attributes;let V=0;const Q=U.getAttributes();for(const Y in Q)if(Q[Y].location>=0){const F=O[Y];let ne=z[Y];if(ne===void 0&&(Y==="instanceMatrix"&&C.instanceMatrix&&(ne=C.instanceMatrix),Y==="instanceColor"&&C.instanceColor&&(ne=C.instanceColor)),F===void 0||F.attribute!==ne||ne&&F.data!==ne.data)return!0;V++}return s.attributesNum!==V||s.index!==D}function g(C,N,U,D){const O={},z=N.attributes;let V=0;const Q=U.getAttributes();for(const Y in Q)if(Q[Y].location>=0){let F=z[Y];F===void 0&&(Y==="instanceMatrix"&&C.instanceMatrix&&(F=C.instanceMatrix),Y==="instanceColor"&&C.instanceColor&&(F=C.instanceColor));const ne={};ne.attribute=F,F&&F.data&&(ne.data=F.data),O[Y]=ne,V++}s.attributes=O,s.attributesNum=V,s.index=D}function v(){const C=s.newAttributes;for(let N=0,U=C.length;N<U;N++)C[N]=0}function x(C){m(C,0)}function m(C,N){const U=s.newAttributes,D=s.enabledAttributes,O=s.attributeDivisors;U[C]=1,D[C]===0&&(n.enableVertexAttribArray(C),D[C]=1),O[C]!==N&&(n.vertexAttribDivisor(C,N),O[C]=N)}function M(){const C=s.newAttributes,N=s.enabledAttributes;for(let U=0,D=N.length;U<D;U++)N[U]!==C[U]&&(n.disableVertexAttribArray(U),N[U]=0)}function _(C,N,U,D,O,z,V){V===!0?n.vertexAttribIPointer(C,N,U,O,z):n.vertexAttribPointer(C,N,U,D,O,z)}function S(C,N,U,D){v();const O=D.attributes,z=U.getAttributes(),V=N.defaultAttributeValues;for(const Q in z){const Y=z[Q];if(Y.location>=0){let te=O[Q];if(te===void 0&&(Q==="instanceMatrix"&&C.instanceMatrix&&(te=C.instanceMatrix),Q==="instanceColor"&&C.instanceColor&&(te=C.instanceColor)),te!==void 0){const F=te.normalized,ne=te.itemSize,ce=e.get(te);if(ce===void 0)continue;const be=ce.buffer,Ue=ce.type,ke=ce.bytesPerElement,ee=Ue===n.INT||Ue===n.UNSIGNED_INT||te.gpuType===Yl;if(te.isInterleavedBufferAttribute){const se=te.data,X=se.stride,he=te.offset;if(se.isInstancedInterleavedBuffer){for(let ae=0;ae<Y.locationSize;ae++)m(Y.location+ae,se.meshPerAttribute);C.isInstancedMesh!==!0&&D._maxInstanceCount===void 0&&(D._maxInstanceCount=se.meshPerAttribute*se.count)}else for(let ae=0;ae<Y.locationSize;ae++)x(Y.location+ae);n.bindBuffer(n.ARRAY_BUFFER,be);for(let ae=0;ae<Y.locationSize;ae++)_(Y.location+ae,ne/Y.locationSize,Ue,F,X*ke,(he+ne/Y.locationSize*ae)*ke,ee)}else{if(te.isInstancedBufferAttribute){for(let se=0;se<Y.locationSize;se++)m(Y.location+se,te.meshPerAttribute);C.isInstancedMesh!==!0&&D._maxInstanceCount===void 0&&(D._maxInstanceCount=te.meshPerAttribute*te.count)}else for(let se=0;se<Y.locationSize;se++)x(Y.location+se);n.bindBuffer(n.ARRAY_BUFFER,be);for(let se=0;se<Y.locationSize;se++)_(Y.location+se,ne/Y.locationSize,Ue,F,ne*ke,ne/Y.locationSize*se*ke,ee)}}else if(V!==void 0){const F=V[Q];if(F!==void 0)switch(F.length){case 2:n.vertexAttrib2fv(Y.location,F);break;case 3:n.vertexAttrib3fv(Y.location,F);break;case 4:n.vertexAttrib4fv(Y.location,F);break;default:n.vertexAttrib1fv(Y.location,F)}}}}M()}function w(){A();for(const C in i){const N=i[C];for(const U in N){const D=N[U];for(const O in D){const z=D[O];for(const V in z)u(z[V].object),delete z[V];delete D[O]}}delete i[C]}}function E(C){if(i[C.id]===void 0)return;const N=i[C.id];for(const U in N){const D=N[U];for(const O in D){const z=D[O];for(const V in z)u(z[V].object),delete z[V];delete D[O]}}delete i[C.id]}function L(C){for(const N in i){const U=i[N];for(const D in U){const O=U[D];if(O[C.id]===void 0)continue;const z=O[C.id];for(const V in z)u(z[V].object),delete z[V];delete O[C.id]}}}function b(C){for(const N in i){const U=i[N],D=C.isInstancedMesh===!0?C.id:0,O=U[D];if(O!==void 0){for(const z in O){const V=O[z];for(const Q in V)u(V[Q].object),delete V[Q];delete O[z]}delete U[D],Object.keys(U).length===0&&delete i[N]}}}function A(){P(),a=!0,s!==r&&(s=r,l(s.object))}function P(){r.geometry=null,r.program=null,r.wireframe=!1}return{setup:o,reset:A,resetDefaultState:P,dispose:w,releaseStatesOfGeometry:E,releaseStatesOfObject:b,releaseStatesOfProgram:L,initAttributes:v,enableAttribute:x,disableUnusedAttributes:M}}function gx(n,e,t){let i;function r(c){i=c}function s(c,l){n.drawArrays(i,c,l),t.update(l,i,1)}function a(c,l,u){u!==0&&(n.drawArraysInstanced(i,c,l,u),t.update(l,i,u))}function o(c,l,u){if(u===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,c,0,l,0,u);let d=0;for(let p=0;p<u;p++)d+=l[p];t.update(d,i,1)}this.setMode=r,this.render=s,this.renderInstances=a,this.renderMultiDraw=o}function xx(n,e,t,i){let r;function s(){if(r!==void 0)return r;if(e.has("EXT_texture_filter_anisotropic")===!0){const L=e.get("EXT_texture_filter_anisotropic");r=n.getParameter(L.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else r=0;return r}function a(L){return!(L!==En&&i.convert(L)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(L){const b=L===oi&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(L!==wn&&L!==ni&&!b&&i.convert(L)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_TYPE))}function c(L){if(L==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";L="mediump"}return L==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=t.precision!==void 0?t.precision:"highp";const u=c(l);u!==l&&(Ge("WebGLRenderer:",l,"not supported, using",u,"instead."),l=u);const f=t.logarithmicDepthBuffer===!0,d=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control");t.reversedDepthBuffer===!0&&d===!1&&Ge("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");const p=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),g=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),v=n.getParameter(n.MAX_TEXTURE_SIZE),x=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),m=n.getParameter(n.MAX_VERTEX_ATTRIBS),M=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),_=n.getParameter(n.MAX_VARYING_VECTORS),S=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),w=n.getParameter(n.MAX_SAMPLES),E=n.getParameter(n.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:c,textureFormatReadable:a,textureTypeReadable:o,precision:l,logarithmicDepthBuffer:f,reversedDepthBuffer:d,maxTextures:p,maxVertexTextures:g,maxTextureSize:v,maxCubemapSize:x,maxAttributes:m,maxVertexUniforms:M,maxVaryings:_,maxFragmentUniforms:S,maxSamples:w,samples:E}}function vx(n){const e=this;let t=null,i=0,r=!1,s=!1;const a=new Pi,o=new Ve,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(f,d){const p=f.length!==0||d||i!==0||r;return r=d,i=f.length,p},this.beginShadows=function(){s=!0,u(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(f,d){t=u(f,d,0)},this.setState=function(f,d,p){const g=f.clippingPlanes,v=f.clipIntersection,x=f.clipShadows,m=n.get(f);if(!r||g===null||g.length===0||s&&!x)s?u(null):l();else{const M=s?0:i,_=M*4;let S=m.clippingState||null;c.value=S,S=u(g,d,_,p);for(let w=0;w!==_;++w)S[w]=t[w];m.clippingState=S,this.numIntersection=v?this.numPlanes:0,this.numPlanes+=M}};function l(){c.value!==t&&(c.value=t,c.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function u(f,d,p,g){const v=f!==null?f.length:0;let x=null;if(v!==0){if(x=c.value,g!==!0||x===null){const m=p+v*4,M=d.matrixWorldInverse;o.getNormalMatrix(M),(x===null||x.length<m)&&(x=new Float32Array(m));for(let _=0,S=p;_!==v;++_,S+=4)a.copy(f[_]).applyMatrix4(M,o),a.normal.toArray(x,S),x[S+3]=a.constant}c.value=x,c.needsUpdate=!0}return e.numPlanes=v,e.numIntersection=0,x}}const Tr=4,Mx=6,_x=20,Sx=256,is=new rc,lh=new tt;let yo=null,wo=0,Eo=0,Ao=!1;const bx=new W,Vi=new W;class ch{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,i=.1,r=100,s={}){const{size:a=256,position:o=bx}=s;yo=this._renderer.getRenderTarget(),wo=this._renderer.getActiveCubeFace(),Eo=this._renderer.getActiveMipmapLevel(),Ao=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);const c=this._allocateTargets();return c.depthBuffer=!0,this._sceneToCubeUV(e,i,r,c,o),t>0&&this._blur(c,0,0,t),this._applyPMREM(c),this._cleanup(c),c}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=dh(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=uh(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(yo,wo,Eo),this._renderer.xr.enabled=Ao,e.scissorTest=!1,_r(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===tr||e.mapping===Br?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),yo=this._renderer.getRenderTarget(),wo=this._renderer.getActiveCubeFace(),Eo=this._renderer.getActiveMipmapLevel(),Ao=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=t||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,i={magFilter:kt,minFilter:kt,generateMipmaps:!1,type:oi,format:En,colorSpace:ps,depthBuffer:!1},r=hh(e,t,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=hh(e,t,i);const{_lodMax:s}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods}=yx(s)),this._blurMaterial=Ex(s,e,t),this._ggxMaterial=wx(s,e,t)}return r}_compileMaterial(e){const t=new qt(new $t,e);this._renderer.compile(t,is)}_sceneToCubeUV(e,t,i,r,s){const c=new yn(90,1,t,i),l=[1,-1,1,1,1,1],u=[1,1,1,-1,-1,-1],f=this._renderer,d=f.autoClear,p=f.toneMapping;f.getClearColor(lh),f.toneMapping=si,f.autoClear=!1,f.state.buffers.depth.getReversed()&&(f.setRenderTarget(r),f.clearDepth(),f.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new qt(new Ms,new Uu({name:"PMREM.Background",side:xn,depthWrite:!1,depthTest:!1})));const v=this._backgroundBox,x=v.material;let m=!1;const M=e.background;M?M.isColor&&(x.color.copy(M),e.background=null,m=!0):(x.color.copy(lh),m=!0);for(let _=0;_<6;_++){const S=_%3;S===0?(c.up.set(0,l[_],0),c.position.set(s.x,s.y,s.z),c.lookAt(s.x+u[_],s.y,s.z)):S===1?(c.up.set(0,0,l[_]),c.position.set(s.x,s.y,s.z),c.lookAt(s.x,s.y+u[_],s.z)):(c.up.set(0,l[_],0),c.position.set(s.x,s.y,s.z),c.lookAt(s.x,s.y,s.z+u[_]));const w=this._cubeSize;_r(r,S*w,_>2?w:0,w,w),f.setRenderTarget(r),m&&f.render(v,c),f.render(e,c)}f.toneMapping=p,f.autoClear=d,e.background=M}_textureToCubeUV(e,t){const i=this._renderer,r=e.mapping===tr||e.mapping===Br;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=dh()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=uh());const s=r?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=s;const o=s.uniforms;o.envMap.value=e;const c=this._cubeSize;_r(t,0,0,3*c,2*c),i.setRenderTarget(t),i.render(a,is)}_applyPMREM(e){const t=this._renderer,i=t.autoClear;t.autoClear=!1;const r=this._lodMeshes.length;for(let s=1;s<r;s++)this._applyGGXFilter(e,s-1,s);t.autoClear=i}_applyGGXFilter(e,t,i){const r=this._renderer,s=this._pingPongRenderTarget,a=this._ggxMaterial,o=this._lodMeshes[i];o.material=a;const c=a.uniforms,l=i/(this._lodMeshes.length-1),u=t/(this._lodMeshes.length-1),f=Math.sqrt(l*l-u*u),d=l*1.25,p=f*d,{_lodMax:g}=this,v=this._sizeLods[i],x=3*v*(i>g-Tr?i-g+Tr:0),m=4*(this._cubeSize-v);c.envMap.value=e.texture,c.roughness.value=p,c.mipInt.value=g-t,_r(s,x,m,3*v,2*v),r.setRenderTarget(s),r.render(o,is),c.envMap.value=s.texture,c.roughness.value=0,c.mipInt.value=g-i,_r(e,x,m,3*v,2*v),r.setRenderTarget(e),r.render(o,is)}_blur(e,t,i,r){const s=this._pingPongRenderTarget,a=Math.min(r,Math.PI)/Math.SQRT2;this._blurPass(e,s,t,i,a),this._blurPass(s,e,i,i,a)}_blurPass(e,t,i,r,s){const a=this._renderer,o=this._blurMaterial,c=this._lodMeshes[r];c.material=o;const l=o.uniforms;l.envMap.value=e.texture,l.sigma.value=s,l.mipInt.value=this._lodMax-i;const u=this._sizeLods[r],f=3*u*(r>this._lodMax-Tr?r-this._lodMax+Tr:0),d=4*(this._cubeSize-u);_r(t,f,d,3*u,2*u),a.setRenderTarget(t),a.render(c,is)}}function yx(n){const e=[],t=[];let i=n;const r=n-Tr+1+Mx;for(let s=0;s<r;s++){const a=Math.pow(2,i);e.push(a);const o=1/(a-2),c=-o,l=1+o,u=[c,c,l,c,l,l,c,c,l,l,c,l],f=6,d=6,p=3,g=new Float32Array(p*d*f),v=new Float32Array(p*d*f);for(let m=0;m<f;m++){const M=m%3*2/3-1,_=m>2?0:-1,S=[M,_,0,M+2/3,_,0,M+2/3,_+1,0,M,_,0,M+2/3,_+1,0,M,_+1,0];g.set(S,p*d*m);for(let w=0;w<d;w++){const E=u[w*2]*2-1,L=u[w*2+1]*2-1;m===0?Vi.set(1,L,E):m===1?Vi.set(-E,1,-L):m===2?Vi.set(-E,L,1):m===3?Vi.set(-1,L,-E):m===4?Vi.set(-E,-1,L):Vi.set(E,L,-1),Vi.toArray(v,(m*d+w)*p)}}const x=new $t;x.setAttribute("position",new Rn(g,p)),x.setAttribute("outputDirection",new Rn(v,p)),t.push(new qt(x,null)),i>Tr&&i--}return{lodMeshes:t,sizeLods:e}}function hh(n,e,t){const i=new Un(n,e,t);return i.texture.mapping=Fa,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function _r(n,e,t,i,r){n.viewport.set(e,t,i,r),n.scissor.set(e,t,i,r)}function wx(n,e,t){return new yt({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:Sx,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:Ba(),fragmentShader:`

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
		`,blending:ri,depthTest:!1,depthWrite:!1})}function Ex(n,e,t){return new yt({name:"SphericalGaussianBlur",defines:{SAMPLES:_x,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},sigma:{value:0},mipInt:{value:0}},vertexShader:Ba(),fragmentShader:`

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
		`,blending:ri,depthTest:!1,depthWrite:!1})}function uh(){return new yt({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Ba(),fragmentShader:`

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
		`,blending:ri,depthTest:!1,depthWrite:!1})}function dh(){return new yt({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Ba(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:ri,depthTest:!1,depthWrite:!1})}function Ba(){return`

		precision mediump float;
		precision mediump int;

		attribute vec3 outputDirection;

		varying vec3 vOutputDirection;

		void main() {

			vOutputDirection = outputDirection;
			gl_Position = vec4( position, 1.0 );

		}
	`}class Vu extends Un{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const i={width:e,height:e,depth:1},r=[i,i,i,i,i,i];this.texture=new Fu(r),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},r=new Ms(5,5,5),s=new yt({name:"CubemapFromEquirect",uniforms:kr(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:xn,blending:ri});s.uniforms.tEquirect.value=t;const a=new qt(r,s),o=t.minFilter;return t.minFilter===$i&&(t.minFilter=kt),new Cg(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,i=!0,r=!0){const s=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,i,r);e.setRenderTarget(s)}}function Ax(n){let e=new WeakMap,t=new WeakMap,i=null;function r(d,p=!1){return d==null?null:p?a(d):s(d)}function s(d){if(d&&d.isTexture){const p=d.mapping;if(p===$a||p===Za)if(e.has(d)){const g=e.get(d).texture;return o(g,d.mapping)}else{const g=d.image;if(g&&g.height>0){const v=new Vu(g.height);return v.fromEquirectangularTexture(n,d),e.set(d,v),d.addEventListener("dispose",l),o(v.texture,d.mapping)}else return null}}return d}function a(d){if(d&&d.isTexture){const p=d.mapping,g=p===$a||p===Za,v=p===tr||p===Br;if(g||v){let x=t.get(d);const m=x!==void 0?x.texture.pmremVersion:0;if(d.isRenderTargetTexture&&d.pmremVersion!==m)return i===null&&(i=new ch(n)),x=g?i.fromEquirectangular(d,x):i.fromCubemap(d,x),x.texture.pmremVersion=d.pmremVersion,t.set(d,x),x.texture;if(x!==void 0)return x.texture;{const M=d.image;return g&&M&&M.height>0||v&&M&&c(M)?(i===null&&(i=new ch(n)),x=g?i.fromEquirectangular(d):i.fromCubemap(d),x.texture.pmremVersion=d.pmremVersion,t.set(d,x),d.addEventListener("dispose",u),x.texture):null}}}return d}function o(d,p){return p===$a?d.mapping=tr:p===Za&&(d.mapping=Br),d}function c(d){let p=0;const g=6;for(let v=0;v<g;v++)d[v]!==void 0&&p++;return p===g}function l(d){const p=d.target;p.removeEventListener("dispose",l);const g=e.get(p);g!==void 0&&(e.delete(p),g.dispose())}function u(d){const p=d.target;p.removeEventListener("dispose",u);const g=t.get(p);g!==void 0&&(t.delete(p),g.dispose())}function f(){e=new WeakMap,t=new WeakMap,i!==null&&(i.dispose(),i=null)}return{get:r,dispose:f}}function Tx(n){const e={};function t(i){if(e[i]!==void 0)return e[i];const r=n.getExtension(i);return e[i]=r,r}return{has:function(i){return t(i)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(i){const r=t(i);return r===null&&Dr("WebGLRenderer: "+i+" extension not supported."),r}}}function Rx(n,e,t,i){const r={},s=new WeakMap;function a(f){const d=f.target;d.index!==null&&e.remove(d.index);for(const g in d.attributes)e.remove(d.attributes[g]);d.removeEventListener("dispose",a),delete r[d.id];const p=s.get(d);p&&(e.remove(p),s.delete(d)),i.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,t.memory.geometries--}function o(f,d){return r[d.id]===!0||(d.addEventListener("dispose",a),r[d.id]=!0,t.memory.geometries++),d}function c(f){const d=f.attributes;for(const p in d)e.update(d[p],n.ARRAY_BUFFER)}function l(f){const d=[],p=f.index,g=f.attributes.position;let v=0;if(g===void 0)return;if(p!==null){const M=p.array;v=p.version;for(let _=0,S=M.length;_<S;_+=3){const w=M[_+0],E=M[_+1],L=M[_+2];d.push(w,E,E,L,L,w)}}else{const M=g.array;v=g.version;for(let _=0,S=M.length/3-1;_<S;_+=3){const w=_+0,E=_+1,L=_+2;d.push(w,E,E,L,L,w)}}const x=new(g.count>=65535?Nu:Iu)(d,1);x.version=v;const m=s.get(f);m&&e.remove(m),s.set(f,x)}function u(f){const d=s.get(f);if(d){const p=f.index;p!==null&&d.version<p.version&&l(f)}else l(f);return s.get(f)}return{get:o,update:c,getWireframeAttribute:u}}function Cx(n,e,t){let i;function r(f){i=f}let s,a;function o(f){s=f.type,a=f.bytesPerElement}function c(f,d){n.drawElements(i,d,s,f*a),t.update(d,i,1)}function l(f,d,p){p!==0&&(n.drawElementsInstanced(i,d,s,f*a,p),t.update(d,i,p))}function u(f,d,p){if(p===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,d,0,s,f,0,p);let v=0;for(let x=0;x<p;x++)v+=d[x];t.update(v,i,1)}this.setMode=r,this.setIndex=o,this.render=c,this.renderInstances=l,this.renderMultiDraw=u}function Lx(n){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function i(s,a,o){switch(t.calls++,a){case n.TRIANGLES:t.triangles+=o*(s/3);break;case n.LINES:t.lines+=o*(s/2);break;case n.LINE_STRIP:t.lines+=o*(s-1);break;case n.LINE_LOOP:t.lines+=o*s;break;case n.POINTS:t.points+=o*s;break;default:lt("WebGLInfo: Unknown draw mode:",a);break}}function r(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:r,update:i}}function Px(n,e,t){const i=new WeakMap,r=new st;function s(a,o,c){const l=a.morphTargetInfluences,u=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,f=u!==void 0?u.length:0;let d=i.get(o);if(d===void 0||d.count!==f){let A=function(){L.dispose(),i.delete(o),o.removeEventListener("dispose",A)};d!==void 0&&d.texture.dispose();const p=o.morphAttributes.position!==void 0,g=o.morphAttributes.normal!==void 0,v=o.morphAttributes.color!==void 0,x=o.morphAttributes.position||[],m=o.morphAttributes.normal||[],M=o.morphAttributes.color||[];let _=0;p===!0&&(_=1),g===!0&&(_=2),v===!0&&(_=3);let S=o.attributes.position.count*_,w=1;S>e.maxTextureSize&&(w=Math.ceil(S/e.maxTextureSize),S=e.maxTextureSize);const E=new Float32Array(S*w*4*f),L=new Lu(E,S,w,f);L.type=ni,L.needsUpdate=!0;const b=_*4;for(let P=0;P<f;P++){const C=x[P],N=m[P],U=M[P],D=S*w*4*P;for(let O=0;O<C.count;O++){const z=O*b;p===!0&&(r.fromBufferAttribute(C,O),E[D+z+0]=r.x,E[D+z+1]=r.y,E[D+z+2]=r.z,E[D+z+3]=0),g===!0&&(r.fromBufferAttribute(N,O),E[D+z+4]=r.x,E[D+z+5]=r.y,E[D+z+6]=r.z,E[D+z+7]=0),v===!0&&(r.fromBufferAttribute(U,O),E[D+z+8]=r.x,E[D+z+9]=r.y,E[D+z+10]=r.z,E[D+z+11]=U.itemSize===4?r.w:1)}}d={count:f,texture:L,size:new We(S,w)},i.set(o,d),o.addEventListener("dispose",A)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)c.getUniforms().setValue(n,"morphTexture",a.morphTexture,t);else{let p=0;for(let v=0;v<l.length;v++)p+=l[v];const g=o.morphTargetsRelative?1:1-p;c.getUniforms().setValue(n,"morphTargetBaseInfluence",g),c.getUniforms().setValue(n,"morphTargetInfluences",l)}c.getUniforms().setValue(n,"morphTargetsTexture",d.texture,t),c.getUniforms().setValue(n,"morphTargetsTextureSize",d.size)}return{update:s}}function Dx(n,e,t,i,r){let s=new WeakMap;function a(l){const u=r.render.frame,f=l.geometry,d=e.get(l,f);if(s.get(d)!==u&&(e.update(d),s.set(d,u)),l.isInstancedMesh&&(l.hasEventListener("dispose",c)===!1&&l.addEventListener("dispose",c),s.get(l)!==u&&(t.update(l.instanceMatrix,n.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,n.ARRAY_BUFFER),s.set(l,u))),l.isSkinnedMesh){const p=l.skeleton;s.get(p)!==u&&(p.update(),s.set(p,u))}return d}function o(){s=new WeakMap}function c(l){const u=l.target;u.removeEventListener("dispose",c),i.releaseStatesOfObject(u),t.remove(u.instanceMatrix),u.instanceColor!==null&&t.remove(u.instanceColor)}return{update:a,dispose:o}}const Ix={[pu]:"LINEAR_TONE_MAPPING",[mu]:"REINHARD_TONE_MAPPING",[gu]:"CINEON_TONE_MAPPING",[xu]:"ACES_FILMIC_TONE_MAPPING",[Mu]:"AGX_TONE_MAPPING",[_u]:"NEUTRAL_TONE_MAPPING",[vu]:"CUSTOM_TONE_MAPPING"};function Nx(n,e,t,i,r,s){const a=new Un(e,t,{type:n,depthBuffer:r,stencilBuffer:s,samples:i?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1});let o=null,c=null;const l=new $t;l.setAttribute("position",new Nt([-1,3,0,-1,-1,0,3,-1,0],3)),l.setAttribute("uv",new Nt([0,2,0,0,2,0],2));const u=new Ag({uniforms:{tDiffuse:{value:null}},vertexShader:`
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
			}`,depthTest:!1,depthWrite:!1}),f=new qt(l,u),d=new rc(-1,1,1,-1,0,1);let p=null,g=null,v=!1,x,m=null,M=[],_=!1;this.setSize=function(S,w){a.setSize(S,w),o!==null&&o.setSize(S,w),c!==null&&c.setSize(S,w);for(let E=0;E<M.length;E++){const L=M[E];L.setSize&&L.setSize(S,w)}},this.setEffects=function(S){M=S,_=M.length>0&&M[0].isRenderPass===!0;const w=a.width,E=a.height;M.length>0&&o===null&&(o=new Un(w,E,{type:oi,depthBuffer:!1,stencilBuffer:!1}),c=new Un(w,E,{type:oi,depthBuffer:!1,stencilBuffer:!1}));for(let L=0;L<M.length;L++){const b=M[L];b.setSize&&b.setSize(w,E)}},this.begin=function(S,w){if(v||S.toneMapping===si&&M.length===0)return!1;if(m=w,w!==null){const E=w.width,L=w.height;(a.width!==E||a.height!==L)&&this.setSize(E,L)}return _===!1&&S.setRenderTarget(a),x=S.toneMapping,S.toneMapping=si,!0},this.hasRenderPass=function(){return _},this.end=function(S,w){S.toneMapping=x,v=!0;let E=a,L=o;for(let b=0;b<M.length;b++){const A=M[b];A.enabled!==!1&&(A.render(S,L,E,w),A.needsSwap!==!1&&(E=L,L=L===o?c:o))}if(p!==S.outputColorSpace||g!==S.toneMapping){p=S.outputColorSpace,g=S.toneMapping,u.defines={},it.getTransfer(p)===vt&&(u.defines.SRGB_TRANSFER="");const b=Ix[g];b&&(u.defines[b]=""),u.needsUpdate=!0}u.uniforms.tDiffuse.value=E.texture,S.setRenderTarget(m),S.render(f,d),m=null,v=!1},this.isCompositing=function(){return v},this.dispose=function(){a.dispose(),o!==null&&o.dispose(),c!==null&&c.dispose(),l.dispose(),u.dispose()}}const Xu=new hn,Tl=new zr(1,1),Yu=new Lu,Ku=new ng,qu=new Fu,fh=[],ph=[],mh=new Float32Array(16),gh=new Float32Array(9),xh=new Float32Array(4);function Yr(n,e,t){const i=n[0];if(i<=0||i>0)return n;const r=e*t;let s=fh[r];if(s===void 0&&(s=new Float32Array(r),fh[r]=s),e!==0){i.toArray(s,0);for(let a=1,o=0;a!==e;++a)o+=t,n[a].toArray(s,o)}return s}function Zt(n,e){if(n.length!==e.length)return!1;for(let t=0,i=n.length;t<i;t++)if(n[t]!==e[t])return!1;return!0}function Jt(n,e){for(let t=0,i=e.length;t<i;t++)n[t]=e[t]}function za(n,e){let t=ph[e];t===void 0&&(t=new Int32Array(e),ph[e]=t);for(let i=0;i!==e;++i)t[i]=n.allocateTextureUnit();return t}function Ux(n,e){const t=this.cache;t[0]!==e&&(n.uniform1f(this.addr,e),t[0]=e)}function Ox(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Zt(t,e))return;n.uniform2fv(this.addr,e),Jt(t,e)}}function Fx(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(n.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Zt(t,e))return;n.uniform3fv(this.addr,e),Jt(t,e)}}function Bx(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Zt(t,e))return;n.uniform4fv(this.addr,e),Jt(t,e)}}function zx(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(Zt(t,e))return;n.uniformMatrix2fv(this.addr,!1,e),Jt(t,e)}else{if(Zt(t,i))return;xh.set(i),n.uniformMatrix2fv(this.addr,!1,xh),Jt(t,i)}}function kx(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(Zt(t,e))return;n.uniformMatrix3fv(this.addr,!1,e),Jt(t,e)}else{if(Zt(t,i))return;gh.set(i),n.uniformMatrix3fv(this.addr,!1,gh),Jt(t,i)}}function Gx(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(Zt(t,e))return;n.uniformMatrix4fv(this.addr,!1,e),Jt(t,e)}else{if(Zt(t,i))return;mh.set(i),n.uniformMatrix4fv(this.addr,!1,mh),Jt(t,i)}}function Hx(n,e){const t=this.cache;t[0]!==e&&(n.uniform1i(this.addr,e),t[0]=e)}function Wx(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Zt(t,e))return;n.uniform2iv(this.addr,e),Jt(t,e)}}function Vx(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Zt(t,e))return;n.uniform3iv(this.addr,e),Jt(t,e)}}function Xx(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Zt(t,e))return;n.uniform4iv(this.addr,e),Jt(t,e)}}function Yx(n,e){const t=this.cache;t[0]!==e&&(n.uniform1ui(this.addr,e),t[0]=e)}function Kx(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Zt(t,e))return;n.uniform2uiv(this.addr,e),Jt(t,e)}}function qx(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Zt(t,e))return;n.uniform3uiv(this.addr,e),Jt(t,e)}}function $x(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Zt(t,e))return;n.uniform4uiv(this.addr,e),Jt(t,e)}}function Zx(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r);let s;this.type===n.SAMPLER_2D_SHADOW?(Tl.compareFunction=t.isReversedDepthBuffer()?jl:Ql,s=Tl):s=Xu,t.setTexture2D(e||s,r)}function Jx(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTexture3D(e||Ku,r)}function Qx(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTextureCube(e||qu,r)}function jx(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTexture2DArray(e||Yu,r)}function ev(n){switch(n){case 5126:return Ux;case 35664:return Ox;case 35665:return Fx;case 35666:return Bx;case 35674:return zx;case 35675:return kx;case 35676:return Gx;case 5124:case 35670:return Hx;case 35667:case 35671:return Wx;case 35668:case 35672:return Vx;case 35669:case 35673:return Xx;case 5125:return Yx;case 36294:return Kx;case 36295:return qx;case 36296:return $x;case 35678:case 36198:case 36298:case 36306:case 35682:return Zx;case 35679:case 36299:case 36307:return Jx;case 35680:case 36300:case 36308:case 36293:return Qx;case 36289:case 36303:case 36311:case 36292:return jx}}function tv(n,e){n.uniform1fv(this.addr,e)}function nv(n,e){const t=Yr(e,this.size,2);n.uniform2fv(this.addr,t)}function iv(n,e){const t=Yr(e,this.size,3);n.uniform3fv(this.addr,t)}function rv(n,e){const t=Yr(e,this.size,4);n.uniform4fv(this.addr,t)}function sv(n,e){const t=Yr(e,this.size,4);n.uniformMatrix2fv(this.addr,!1,t)}function av(n,e){const t=Yr(e,this.size,9);n.uniformMatrix3fv(this.addr,!1,t)}function ov(n,e){const t=Yr(e,this.size,16);n.uniformMatrix4fv(this.addr,!1,t)}function lv(n,e){n.uniform1iv(this.addr,e)}function cv(n,e){n.uniform2iv(this.addr,e)}function hv(n,e){n.uniform3iv(this.addr,e)}function uv(n,e){n.uniform4iv(this.addr,e)}function dv(n,e){n.uniform1uiv(this.addr,e)}function fv(n,e){n.uniform2uiv(this.addr,e)}function pv(n,e){n.uniform3uiv(this.addr,e)}function mv(n,e){n.uniform4uiv(this.addr,e)}function gv(n,e,t){const i=this.cache,r=e.length,s=za(t,r);Zt(i,s)||(n.uniform1iv(this.addr,s),Jt(i,s));let a;this.type===n.SAMPLER_2D_SHADOW?a=Tl:a=Xu;for(let o=0;o!==r;++o)t.setTexture2D(e[o]||a,s[o])}function xv(n,e,t){const i=this.cache,r=e.length,s=za(t,r);Zt(i,s)||(n.uniform1iv(this.addr,s),Jt(i,s));for(let a=0;a!==r;++a)t.setTexture3D(e[a]||Ku,s[a])}function vv(n,e,t){const i=this.cache,r=e.length,s=za(t,r);Zt(i,s)||(n.uniform1iv(this.addr,s),Jt(i,s));for(let a=0;a!==r;++a)t.setTextureCube(e[a]||qu,s[a])}function Mv(n,e,t){const i=this.cache,r=e.length,s=za(t,r);Zt(i,s)||(n.uniform1iv(this.addr,s),Jt(i,s));for(let a=0;a!==r;++a)t.setTexture2DArray(e[a]||Yu,s[a])}function _v(n){switch(n){case 5126:return tv;case 35664:return nv;case 35665:return iv;case 35666:return rv;case 35674:return sv;case 35675:return av;case 35676:return ov;case 5124:case 35670:return lv;case 35667:case 35671:return cv;case 35668:case 35672:return hv;case 35669:case 35673:return uv;case 5125:return dv;case 36294:return fv;case 36295:return pv;case 36296:return mv;case 35678:case 36198:case 36298:case 36306:case 35682:return gv;case 35679:case 36299:case 36307:return xv;case 35680:case 36300:case 36308:case 36293:return vv;case 36289:case 36303:case 36311:case 36292:return Mv}}class Sv{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.setValue=ev(t.type)}}class bv{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=_v(t.type)}}class yv{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,i){const r=this.seq;for(let s=0,a=r.length;s!==a;++s){const o=r[s];o.setValue(e,t[o.id],i)}}}const To=/(\w+)(\])?(\[|\.)?/g;function vh(n,e){n.seq.push(e),n.map[e.id]=e}function wv(n,e,t){const i=n.name,r=i.length;for(To.lastIndex=0;;){const s=To.exec(i),a=To.lastIndex;let o=s[1];const c=s[2]==="]",l=s[3];if(c&&(o=o|0),l===void 0||l==="["&&a+2===r){vh(t,l===void 0?new Sv(o,n,e):new bv(o,n,e));break}else{let f=t.map[o];f===void 0&&(f=new yv(o),vh(t,f)),t=f}}}class ua{constructor(e,t){this.seq=[],this.map={};const i=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let a=0;a<i;++a){const o=e.getActiveUniform(t,a),c=e.getUniformLocation(t,o.name);wv(o,c,this)}const r=[],s=[];for(const a of this.seq)a.type===e.SAMPLER_2D_SHADOW||a.type===e.SAMPLER_CUBE_SHADOW||a.type===e.SAMPLER_2D_ARRAY_SHADOW?r.push(a):s.push(a);r.length>0&&(this.seq=r.concat(s))}setValue(e,t,i,r){const s=this.map[t];s!==void 0&&s.setValue(e,i,r)}setOptional(e,t,i){const r=t[i];r!==void 0&&this.setValue(e,i,r)}static upload(e,t,i,r){for(let s=0,a=t.length;s!==a;++s){const o=t[s],c=i[o.id];c.needsUpdate!==!1&&o.setValue(e,c.value,r)}}static seqWithValue(e,t){const i=[];for(let r=0,s=e.length;r!==s;++r){const a=e[r];a.id in t&&i.push(a)}return i}}function Mh(n,e,t){const i=n.createShader(e);return n.shaderSource(i,t),n.compileShader(i),i}const Ev=37297;let Av=0;function Tv(n,e){const t=n.split(`
`),i=[],r=Math.max(e-6,0),s=Math.min(e+6,t.length);for(let a=r;a<s;a++){const o=a+1;i.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return i.join(`
`)}const _h=new Ve;function Rv(n){it._getMatrix(_h,it.workingColorSpace,n);const e=`mat3( ${_h.elements.map(t=>t.toFixed(4))} )`;switch(it.getTransfer(n)){case Ma:return[e,"LinearTransferOETF"];case vt:return[e,"sRGBTransferOETF"];default:return Ge("WebGLProgram: Unsupported color space: ",n),[e,"LinearTransferOETF"]}}function Sh(n,e,t){const i=n.getShaderParameter(e,n.COMPILE_STATUS),s=(n.getShaderInfoLog(e)||"").trim();if(i&&s==="")return"";const a=/ERROR: 0:(\d+)/.exec(s);if(a){const o=parseInt(a[1]);return t.toUpperCase()+`

`+s+`

`+Tv(n.getShaderSource(e),o)}else return s}function Cv(n,e){const t=Rv(e);return[`vec4 ${n}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}const Lv={[pu]:"Linear",[mu]:"Reinhard",[gu]:"Cineon",[xu]:"ACESFilmic",[Mu]:"AgX",[_u]:"Neutral",[vu]:"Custom"};function Pv(n,e){const t=Lv[e];return t===void 0?(Ge("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+n+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+n+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const Js=new W;function Dv(){it.getLuminanceCoefficients(Js);const n=Js.x.toFixed(4),e=Js.y.toFixed(4),t=Js.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${n}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Iv(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",n.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(cs).join(`
`)}function Nv(n){const e=[];for(const t in n){const i=n[t];i!==!1&&e.push("#define "+t+" "+i)}return e.join(`
`)}function Uv(n,e){const t={},i=n.getProgramParameter(e,n.ACTIVE_ATTRIBUTES);for(let r=0;r<i;r++){const s=n.getActiveAttrib(e,r),a=s.name;let o=1;s.type===n.FLOAT_MAT2&&(o=2),s.type===n.FLOAT_MAT3&&(o=3),s.type===n.FLOAT_MAT4&&(o=4),t[a]={type:s.type,location:n.getAttribLocation(e,a),locationSize:o}}return t}function cs(n){return n!==""}function bh(n,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return n.replace(/NUM_SUN_LIGHTS/g,e.numSunLights).replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,e.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function yh(n,e){return n.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const Ov=/^[ \t]*#include +<([\w\d./]+)>/gm;function Rl(n){return n.replace(Ov,Bv)}const Fv=new Map;function Bv(n,e){let t=et[e];if(t===void 0){const i=Fv.get(e);if(i!==void 0)t=et[i],Ge('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,i);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+e+">")}return Rl(t)}const zv=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function wh(n){return n.replace(zv,kv)}function kv(n,e,t,i){let r="";for(let s=parseInt(e);s<parseInt(t);s++)r+=i.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return r}function Eh(n){let e=`precision ${n.precision} float;
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
#define LOW_PRECISION`),e}const Gv={[aa]:"SHADOWMAP_TYPE_PCF",[os]:"SHADOWMAP_TYPE_VSM"};function Hv(n){return Gv[n.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const Wv={[tr]:"ENVMAP_TYPE_CUBE",[Br]:"ENVMAP_TYPE_CUBE",[Fa]:"ENVMAP_TYPE_CUBE_UV"};function Vv(n){return n.envMap===!1?"ENVMAP_TYPE_CUBE":Wv[n.envMapMode]||"ENVMAP_TYPE_CUBE"}const Xv={[Br]:"ENVMAP_MODE_REFRACTION"};function Yv(n){return n.envMap===!1?"ENVMAP_MODE_REFLECTION":Xv[n.envMapMode]||"ENVMAP_MODE_REFLECTION"}const Kv={[fu]:"ENVMAP_BLENDING_MULTIPLY",[Im]:"ENVMAP_BLENDING_MIX",[Nm]:"ENVMAP_BLENDING_ADD"};function qv(n){return n.envMap===!1?"ENVMAP_BLENDING_NONE":Kv[n.combine]||"ENVMAP_BLENDING_NONE"}function $v(n){const e=n.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,i=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:i,maxMip:t}}function Zv(n,e,t,i){const r=n.getContext(),s=t.defines;let a=t.vertexShader,o=t.fragmentShader;const c=Hv(t),l=Vv(t),u=Yv(t),f=qv(t),d=$v(t),p=Iv(t),g=Nv(s),v=r.createProgram();let x,m,M=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(x=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(cs).join(`
`),x.length>0&&(x+=`
`),m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(cs).join(`
`),m.length>0&&(m+=`
`)):(x=[Eh(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexNormals?"#define HAS_NORMAL":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(cs).join(`
`),m=[Eh(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+l:"",t.envMap?"#define "+u:"",t.envMap?"#define "+f:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.retroreflection?"#define USE_RETROREFLECTION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas||t.batchingColor?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==si?"#define TONE_MAPPING":"",t.toneMapping!==si?et.tonemapping_pars_fragment:"",t.toneMapping!==si?Pv("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",et.colorspace_pars_fragment,Cv("linearToOutputTexel",t.outputColorSpace),Dv(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(cs).join(`
`)),a=Rl(a),a=bh(a,t),a=yh(a,t),o=Rl(o),o=bh(o,t),o=yh(o,t),a=wh(a),o=wh(o),t.isRawShaderMaterial!==!0&&(M=`#version 300 es
`,x=[p,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+x,m=["#define varying in",t.glslVersion===Nc?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Nc?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+m);const _=M+x+a,S=M+m+o,w=Mh(r,r.VERTEX_SHADER,_),E=Mh(r,r.FRAGMENT_SHADER,S);r.attachShader(v,w),r.attachShader(v,E),t.index0AttributeName!==void 0?r.bindAttribLocation(v,0,t.index0AttributeName):t.hasPositionAttribute===!0&&r.bindAttribLocation(v,0,"position"),r.linkProgram(v);function L(C){if(n.debug.checkShaderErrors){const N=r.getProgramInfoLog(v)||"",U=r.getShaderInfoLog(w)||"",D=r.getShaderInfoLog(E)||"",O=N.trim(),z=U.trim(),V=D.trim();let Q=!0,Y=!0;if(r.getProgramParameter(v,r.LINK_STATUS)===!1)if(Q=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(r,v,w,E);else{const te=Sh(r,w,"vertex"),F=Sh(r,E,"fragment");lt("WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(v,r.VALIDATE_STATUS)+`

Material Name: `+C.name+`
Material Type: `+C.type+`

Program Info Log: `+O+`
`+te+`
`+F)}else O!==""?Ge("WebGLProgram: Program Info Log:",O):(z===""||V==="")&&(Y=!1);Y&&(C.diagnostics={runnable:Q,programLog:O,vertexShader:{log:z,prefix:x},fragmentShader:{log:V,prefix:m}})}r.deleteShader(w),r.deleteShader(E),b=new ua(r,v),A=Uv(r,v)}let b;this.getUniforms=function(){return b===void 0&&L(this),b};let A;this.getAttributes=function(){return A===void 0&&L(this),A};let P=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return P===!1&&(P=r.getProgramParameter(v,Ev)),P},this.destroy=function(){i.releaseStatesOfProgram(this),r.deleteProgram(v),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=Av++,this.cacheKey=e,this.usedTimes=1,this.program=v,this.vertexShader=w,this.fragmentShader=E,this}let Jv=0;class Qv{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,i){const r=this._getShaderCacheForMaterial(e);return r.has(t)===!1&&(r.add(t),t.usedTimes++),r.has(i)===!1&&(r.add(i),i.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const i of t)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let i=t.get(e);return i===void 0&&(i=new Set,t.set(e,i)),i}_getShaderStage(e){const t=this.shaderCache;let i=t.get(e);return i===void 0&&(i=new jv(e),t.set(e,i)),i}}class jv{constructor(e){this.id=Jv++,this.code=e,this.usedTimes=0}}function eM(n){return n===nr||n===xa||n===va}function tM(n,e,t,i,r,s){const a=new Pu,o=new Qv,c=new Set,l=[],u=new Map,f=i.logarithmicDepthBuffer;let d=i.precision;const p={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function g(b){return c.add(b),b===0?"uv":`uv${b}`}function v(b,A,P,C,N,U){const D=C.fog,O=N.geometry,z=b.isMeshStandardMaterial||b.isMeshLambertMaterial||b.isMeshPhongMaterial?C.environment:null,V=b.isMeshStandardMaterial||b.isMeshLambertMaterial&&!b.envMap||b.isMeshPhongMaterial&&!b.envMap,Q=e.get(b.envMap||z,V),Y=Q&&Q.mapping===Fa?Q.image.height:null,te=p[b.type];b.precision!==null&&(d=i.getMaxPrecision(b.precision),d!==b.precision&&Ge("WebGLProgram.getParameters:",b.precision,"not supported, using",d,"instead."));const F=O.morphAttributes.position||O.morphAttributes.normal||O.morphAttributes.color,ne=F!==void 0?F.length:0;let ce=0;O.morphAttributes.position!==void 0&&(ce=1),O.morphAttributes.normal!==void 0&&(ce=2),O.morphAttributes.color!==void 0&&(ce=3);let be,Ue,ke,ee;if(te){const Tt=ei[te];be=Tt.vertexShader,Ue=Tt.fragmentShader}else{be=b.vertexShader,Ue=b.fragmentShader;const Tt=o.getVertexShaderStage(b),dt=o.getFragmentShaderStage(b);o.update(b,Tt,dt),ke=Tt.id,ee=dt.id}const se=n.getRenderTarget(),X=n.state.buffers.depth.getReversed(),he=N.isInstancedMesh===!0,ae=N.isBatchedMesh===!0,Ee=!!b.map,Je=!!b.matcap,Ce=!!Q,Oe=!!b.aoMap,Ke=!!b.lightMap,Ye=!!b.bumpMap&&b.wireframe===!1,wt=!!b.normalMap,Ot=!!b.displacementMap,Qt=!!b.emissiveMap,_t=!!b.metalnessMap,Et=!!b.roughnessMap,G=b.anisotropy>0,Qe=b.clearcoat>0,ze=b.dispersion>0,I=b.retroreflectivity>0,y=b.iridescence>0,B=b.sheen>0,K=b.transmission>0,Z=G&&!!b.anisotropyMap,le=Qe&&!!b.clearcoatMap,ue=Qe&&!!b.clearcoatNormalMap,j=Qe&&!!b.clearcoatRoughnessMap,ie=y&&!!b.iridescenceMap,de=y&&!!b.iridescenceThicknessMap,Le=B&&!!b.sheenColorMap,xe=B&&!!b.sheenRoughnessMap,fe=!!b.specularMap,Ie=!!b.specularColorMap,Be=!!b.specularIntensityMap,qe=K&&!!b.transmissionMap,H=K&&!!b.thicknessMap,pe=!!b.gradientMap,re=!!b.alphaMap,me=b.alphaTest>0,Se=!!b.alphaHash,oe=!!b.extensions;let Ne=si;b.toneMapped&&(se===null||se.isXRRenderTarget===!0)&&(Ne=n.toneMapping);const Pe={shaderID:te,shaderType:b.type,shaderName:b.name,vertexShader:be,fragmentShader:Ue,defines:b.defines,customVertexShaderID:ke,customFragmentShaderID:ee,isRawShaderMaterial:b.isRawShaderMaterial===!0,glslVersion:b.glslVersion,precision:d,batching:ae,batchingColor:ae&&N._colorsTexture!==null,instancing:he,instancingColor:he&&N.instanceColor!==null,instancingMorph:he&&N.morphTexture!==null,outputColorSpace:se===null?n.outputColorSpace:se.isXRRenderTarget===!0?se.texture.colorSpace:it.workingColorSpace,alphaToCoverage:!!b.alphaToCoverage,map:Ee,matcap:Je,envMap:Ce,envMapMode:Ce&&Q.mapping,envMapCubeUVHeight:Y,aoMap:Oe,lightMap:Ke,bumpMap:Ye,normalMap:wt,displacementMap:Ot,emissiveMap:Qt,normalMapObjectSpace:wt&&b.normalMapType===Fm,normalMapTangentSpace:wt&&b.normalMapType===Ic,packedNormalMap:wt&&b.normalMapType===Ic&&eM(b.normalMap.format),metalnessMap:_t,roughnessMap:Et,anisotropy:G,anisotropyMap:Z,clearcoat:Qe,clearcoatMap:le,clearcoatNormalMap:ue,clearcoatRoughnessMap:j,dispersion:ze,retroreflection:I,iridescence:y,iridescenceMap:ie,iridescenceThicknessMap:de,sheen:B,sheenColorMap:Le,sheenRoughnessMap:xe,specularMap:fe,specularColorMap:Ie,specularIntensityMap:Be,transmission:K,transmissionMap:qe,thicknessMap:H,gradientMap:pe,opaque:b.transparent===!1&&b.blending===Lr&&b.alphaToCoverage===!1,alphaMap:re,alphaTest:me,alphaHash:Se,combine:b.combine,mapUv:Ee&&g(b.map.channel),aoMapUv:Oe&&g(b.aoMap.channel),lightMapUv:Ke&&g(b.lightMap.channel),bumpMapUv:Ye&&g(b.bumpMap.channel),normalMapUv:wt&&g(b.normalMap.channel),displacementMapUv:Ot&&g(b.displacementMap.channel),emissiveMapUv:Qt&&g(b.emissiveMap.channel),metalnessMapUv:_t&&g(b.metalnessMap.channel),roughnessMapUv:Et&&g(b.roughnessMap.channel),anisotropyMapUv:Z&&g(b.anisotropyMap.channel),clearcoatMapUv:le&&g(b.clearcoatMap.channel),clearcoatNormalMapUv:ue&&g(b.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:j&&g(b.clearcoatRoughnessMap.channel),iridescenceMapUv:ie&&g(b.iridescenceMap.channel),iridescenceThicknessMapUv:de&&g(b.iridescenceThicknessMap.channel),sheenColorMapUv:Le&&g(b.sheenColorMap.channel),sheenRoughnessMapUv:xe&&g(b.sheenRoughnessMap.channel),specularMapUv:fe&&g(b.specularMap.channel),specularColorMapUv:Ie&&g(b.specularColorMap.channel),specularIntensityMapUv:Be&&g(b.specularIntensityMap.channel),transmissionMapUv:qe&&g(b.transmissionMap.channel),thicknessMapUv:H&&g(b.thicknessMap.channel),alphaMapUv:re&&g(b.alphaMap.channel),vertexTangents:!!O.attributes.tangent&&(wt||G),vertexNormals:!!O.attributes.normal,vertexColors:b.vertexColors,vertexAlphas:b.vertexColors===!0&&!!O.attributes.color&&O.attributes.color.itemSize===4,pointsUvs:N.isPoints===!0&&!!O.attributes.uv&&(Ee||re),fog:!!D,useFog:b.fog===!0,fogExp2:!!D&&D.isFogExp2,flatShading:b.wireframe===!1&&(b.flatShading===!0||O.attributes.normal===void 0&&wt===!1&&(b.isMeshLambertMaterial||b.isMeshPhongMaterial||b.isMeshStandardMaterial||b.isMeshPhysicalMaterial)),sizeAttenuation:b.sizeAttenuation===!0,logarithmicDepthBuffer:f,reversedDepthBuffer:X,skinning:N.isSkinnedMesh===!0,hasPositionAttribute:O.attributes.position!==void 0,morphTargets:O.morphAttributes.position!==void 0,morphNormals:O.morphAttributes.normal!==void 0,morphColors:O.morphAttributes.color!==void 0,morphTargetsCount:ne,morphTextureStride:ce,numSunLights:A.sun.length,numDirLights:A.directional.length,numPointLights:A.point.length,numSpotLights:A.spot.length,numSpotLightMaps:A.spotLightMap.length,numRectAreaLights:A.rectArea.length,numHemiLights:A.hemi.length,numSunLightShadows:A.sunShadowMap.length,numDirLightShadows:A.directionalShadowMap.length,numPointLightShadows:A.pointShadowMap.length,numSpotLightShadows:A.spotShadowMap.length,numSpotLightShadowsWithMaps:A.numSpotLightShadowsWithMaps,numLightProbes:A.numLightProbes,numLightProbeGrids:U.length,numClippingPlanes:s.numPlanes,numClipIntersection:s.numIntersection,dithering:b.dithering,shadowMapEnabled:n.shadowMap.enabled&&P.length>0,shadowMapType:n.shadowMap.type,toneMapping:Ne,decodeVideoTexture:Ee&&b.map.isVideoTexture===!0&&it.getTransfer(b.map.colorSpace)===vt,decodeVideoTextureEmissive:Qt&&b.emissiveMap.isVideoTexture===!0&&it.getTransfer(b.emissiveMap.colorSpace)===vt,premultipliedAlpha:b.premultipliedAlpha,doubleSided:b.side===gi,flipSided:b.side===xn,useDepthPacking:b.depthPacking>=0,depthPacking:b.depthPacking||0,index0AttributeName:b.index0AttributeName,extensionClipCullDistance:oe&&b.extensions.clipCullDistance===!0&&t.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(oe&&b.extensions.multiDraw===!0||ae)&&t.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:t.has("KHR_parallel_shader_compile"),customProgramCacheKey:b.customProgramCacheKey()};return Pe.vertexUv1s=c.has(1),Pe.vertexUv2s=c.has(2),Pe.vertexUv3s=c.has(3),c.clear(),Pe}function x(b){const A=[];if(b.shaderID?A.push(b.shaderID):(A.push(b.customVertexShaderID),A.push(b.customFragmentShaderID)),b.defines!==void 0)for(const P in b.defines)A.push(P),A.push(b.defines[P]);return b.isRawShaderMaterial===!1&&(m(A,b),M(A,b),A.push(n.outputColorSpace)),A.push(b.customProgramCacheKey),A.join()}function m(b,A){b.push(A.precision),b.push(A.outputColorSpace),b.push(A.envMapMode),b.push(A.envMapCubeUVHeight),b.push(A.mapUv),b.push(A.alphaMapUv),b.push(A.lightMapUv),b.push(A.aoMapUv),b.push(A.bumpMapUv),b.push(A.normalMapUv),b.push(A.displacementMapUv),b.push(A.emissiveMapUv),b.push(A.metalnessMapUv),b.push(A.roughnessMapUv),b.push(A.anisotropyMapUv),b.push(A.clearcoatMapUv),b.push(A.clearcoatNormalMapUv),b.push(A.clearcoatRoughnessMapUv),b.push(A.iridescenceMapUv),b.push(A.iridescenceThicknessMapUv),b.push(A.sheenColorMapUv),b.push(A.sheenRoughnessMapUv),b.push(A.specularMapUv),b.push(A.specularColorMapUv),b.push(A.specularIntensityMapUv),b.push(A.transmissionMapUv),b.push(A.thicknessMapUv),b.push(A.combine),b.push(A.fogExp2),b.push(A.sizeAttenuation),b.push(A.morphTargetsCount),b.push(A.morphAttributeCount),b.push(A.numSunLights),b.push(A.numDirLights),b.push(A.numPointLights),b.push(A.numSpotLights),b.push(A.numSpotLightMaps),b.push(A.numHemiLights),b.push(A.numRectAreaLights),b.push(A.numSunLightShadows),b.push(A.numDirLightShadows),b.push(A.numPointLightShadows),b.push(A.numSpotLightShadows),b.push(A.numSpotLightShadowsWithMaps),b.push(A.numLightProbes),b.push(A.shadowMapType),b.push(A.toneMapping),b.push(A.numClippingPlanes),b.push(A.numClipIntersection),b.push(A.depthPacking)}function M(b,A){a.disableAll(),A.instancing&&a.enable(0),A.instancingColor&&a.enable(1),A.instancingMorph&&a.enable(2),A.matcap&&a.enable(3),A.envMap&&a.enable(4),A.normalMapObjectSpace&&a.enable(5),A.normalMapTangentSpace&&a.enable(6),A.clearcoat&&a.enable(7),A.iridescence&&a.enable(8),A.alphaTest&&a.enable(9),A.vertexColors&&a.enable(10),A.vertexAlphas&&a.enable(11),A.vertexUv1s&&a.enable(12),A.vertexUv2s&&a.enable(13),A.vertexUv3s&&a.enable(14),A.vertexTangents&&a.enable(15),A.anisotropy&&a.enable(16),A.alphaHash&&a.enable(17),A.batching&&a.enable(18),A.dispersion&&a.enable(19),A.retroreflection&&a.enable(24),A.batchingColor&&a.enable(20),A.gradientMap&&a.enable(21),A.packedNormalMap&&a.enable(22),A.vertexNormals&&a.enable(23),b.push(a.mask),a.disableAll(),A.fog&&a.enable(0),A.useFog&&a.enable(1),A.flatShading&&a.enable(2),A.logarithmicDepthBuffer&&a.enable(3),A.reversedDepthBuffer&&a.enable(4),A.skinning&&a.enable(5),A.morphTargets&&a.enable(6),A.morphNormals&&a.enable(7),A.morphColors&&a.enable(8),A.premultipliedAlpha&&a.enable(9),A.shadowMapEnabled&&a.enable(10),A.doubleSided&&a.enable(11),A.flipSided&&a.enable(12),A.useDepthPacking&&a.enable(13),A.dithering&&a.enable(14),A.transmission&&a.enable(15),A.sheen&&a.enable(16),A.opaque&&a.enable(17),A.pointsUvs&&a.enable(18),A.decodeVideoTexture&&a.enable(19),A.decodeVideoTextureEmissive&&a.enable(20),A.alphaToCoverage&&a.enable(21),A.numLightProbeGrids>0&&a.enable(22),A.hasPositionAttribute&&a.enable(23),b.push(a.mask)}function _(b){const A=p[b.type];let P;if(A){const C=ei[A];P=yg.clone(C.uniforms)}else P=b.uniforms;return P}function S(b,A){let P=u.get(A);return P!==void 0?++P.usedTimes:(P=new Zv(n,A,b,r),l.push(P),u.set(A,P)),P}function w(b){if(--b.usedTimes===0){const A=l.indexOf(b);l[A]=l[l.length-1],l.pop(),u.delete(b.cacheKey),b.destroy()}}function E(b){o.remove(b)}function L(){o.dispose()}return{getParameters:v,getProgramCacheKey:x,getUniforms:_,acquireProgram:S,releaseProgram:w,releaseShaderCache:E,programs:l,dispose:L}}function nM(){let n=new WeakMap;function e(a){return n.has(a)}function t(a){let o=n.get(a);return o===void 0&&(o={},n.set(a,o)),o}function i(a){n.delete(a)}function r(a,o,c){n.get(a)[o]=c}function s(){n=new WeakMap}return{has:e,get:t,remove:i,update:r,dispose:s}}function iM(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.material.id!==e.material.id?n.material.id-e.material.id:n.materialVariant!==e.materialVariant?n.materialVariant-e.materialVariant:n.z!==e.z?n.z-e.z:n.id-e.id}function Ah(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.z!==e.z?e.z-n.z:n.id-e.id}function Th(){const n=[];let e=0;const t=[],i=[],r=[];function s(){e=0,t.length=0,i.length=0,r.length=0}function a(d){let p=0;return d.isInstancedMesh&&(p+=2),d.isSkinnedMesh&&(p+=1),p}function o(d,p,g,v,x,m){let M=n[e];return M===void 0?(M={id:d.id,object:d,geometry:p,material:g,materialVariant:a(d),groupOrder:v,renderOrder:d.renderOrder,z:x,group:m},n[e]=M):(M.id=d.id,M.object=d,M.geometry=p,M.material=g,M.materialVariant=a(d),M.groupOrder=v,M.renderOrder=d.renderOrder,M.z=x,M.group=m),e++,M}function c(d,p,g,v,x,m,M){M.reversedDepth===!0&&(x=-x);const _=o(d,p,g,v,x,m);g.transmission>0?i.push(_):g.transparent===!0?r.push(_):t.push(_)}function l(d,p,g,v,x,m){const M=o(d,p,g,v,x,m);g.transmission>0?i.unshift(M):g.transparent===!0?r.unshift(M):t.unshift(M)}function u(d,p){t.length>1&&t.sort(d||iM),i.length>1&&i.sort(p||Ah),r.length>1&&r.sort(p||Ah)}function f(){for(let d=e,p=n.length;d<p;d++){const g=n[d];if(g.id===null)break;g.id=null,g.object=null,g.geometry=null,g.material=null,g.group=null}}return{opaque:t,transmissive:i,transparent:r,init:s,push:c,unshift:l,finish:f,sort:u}}function rM(){let n=new WeakMap;function e(i,r){const s=n.get(i);let a;return s===void 0?(a=new Th,n.set(i,[a])):r>=s.length?(a=new Th,s.push(a)):a=s[r],a}function t(){n=new WeakMap}return{get:e,dispose:t}}function sM(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={direction:new W,color:new tt};break;case"SpotLight":t={position:new W,direction:new W,color:new tt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new W,color:new tt,distance:0,decay:0};break;case"HemisphereLight":t={direction:new W,skyColor:new tt,groundColor:new tt};break;case"RectAreaLight":t={color:new tt,position:new W,halfWidth:new W,halfHeight:new W};break}return n[e.id]=t,t}}}function aM(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new We};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new We};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new We,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[e.id]=t,t}}}let oM=0;function lM(n,e){return(e.castShadow?2:0)-(n.castShadow?2:0)+(e.map?1:0)-(n.map?1:0)}function cM(n){const e=new sM,t=aM(),i={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)i.probe.push(new W);const r=new W,s=new Ut,a=new Ut;function o(l){let u=0,f=0,d=0;for(let N=0;N<9;N++)i.probe[N].set(0,0,0);let p=0,g=0,v=0,x=0,m=0,M=0,_=0,S=0,w=0,E=0,L=0,b=0,A=0,P=0;l.sort(lM);for(let N=0,U=l.length;N<U;N++){const D=l[N],O=D.color,z=D.intensity,V=D.distance;let Q=null;if(D.shadow&&D.shadow.map&&(D.shadow.map.texture.format===nr?Q=D.shadow.map.texture:Q=D.shadow.map.depthTexture||D.shadow.map.texture),D.isAmbientLight)u+=O.r*z,f+=O.g*z,d+=O.b*z;else if(D.isLightProbe){for(let Y=0;Y<9;Y++)i.probe[Y].addScaledVector(D.sh.coefficients[Y],z);P++}else if(D.isSunLight){const Y=e.get(D);if(Y.color.copy(D.color).multiplyScalar(D.intensity),D.castShadow){const te=D.shadow,F=t.get(D);F.shadowIntensity=te.intensity,F.shadowBias=te.bias,F.shadowNormalBias=te.normalBias,F.shadowRadius=te.radius,F.shadowMapSize.copy(te.mapSize).multiply(te.getFrameExtents()),i.sunShadow[g]=F,i.sunShadowMap[g]=Q;const ne=te.getViewportCount();for(let ce=0;ce<ne;ce++)i.sunShadowMatrix[v+ce]=te.getMatrix(ce),i.sunShadowCascade[v+ce]=te._cascadeData[ce];v+=ne,g++}i.sun[p]=Y,p++}else if(D.isDirectionalLight){const Y=e.get(D);if(Y.color.copy(D.color).multiplyScalar(D.intensity),D.castShadow){const te=D.shadow,F=t.get(D);F.shadowIntensity=te.intensity,F.shadowBias=te.bias,F.shadowNormalBias=te.normalBias,F.shadowRadius=te.radius,F.shadowMapSize=te.mapSize,i.directionalShadow[x]=F,i.directionalShadowMap[x]=Q,i.directionalShadowMatrix[x]=D.shadow.matrix,w++}i.directional[x]=Y,x++}else if(D.isSpotLight){const Y=e.get(D);Y.position.setFromMatrixPosition(D.matrixWorld),Y.color.copy(O).multiplyScalar(z),Y.distance=V,Y.coneCos=Math.cos(D.angle),Y.penumbraCos=Math.cos(D.angle*(1-D.penumbra)),Y.decay=D.decay,i.spot[M]=Y;const te=D.shadow;if(D.map&&(i.spotLightMap[b]=D.map,b++,te.updateMatrices(D),D.castShadow&&A++),i.spotLightMatrix[M]=te.matrix,D.castShadow){const F=t.get(D);F.shadowIntensity=te.intensity,F.shadowBias=te.bias,F.shadowNormalBias=te.normalBias,F.shadowRadius=te.radius,F.shadowMapSize=te.mapSize,i.spotShadow[M]=F,i.spotShadowMap[M]=Q,L++}M++}else if(D.isRectAreaLight){const Y=e.get(D);Y.color.copy(O).multiplyScalar(z),Y.halfWidth.set(D.width*.5,0,0),Y.halfHeight.set(0,D.height*.5,0),i.rectArea[_]=Y,_++}else if(D.isPointLight){const Y=e.get(D);if(Y.color.copy(D.color).multiplyScalar(D.intensity),Y.distance=D.distance,Y.decay=D.decay,D.castShadow){const te=D.shadow,F=t.get(D);F.shadowIntensity=te.intensity,F.shadowBias=te.bias,F.shadowNormalBias=te.normalBias,F.shadowRadius=te.radius,F.shadowMapSize=te.mapSize,F.shadowCameraNear=te.camera.near,F.shadowCameraFar=te.camera.far,i.pointShadow[m]=F,i.pointShadowMap[m]=Q,i.pointShadowMatrix[m]=D.shadow.matrix,E++}i.point[m]=Y,m++}else if(D.isHemisphereLight){const Y=e.get(D);Y.skyColor.copy(D.color).multiplyScalar(z),Y.groundColor.copy(D.groundColor).multiplyScalar(z),i.hemi[S]=Y,S++}}_>0&&(n.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=ve.LTC_FLOAT_1,i.rectAreaLTC2=ve.LTC_FLOAT_2):(i.rectAreaLTC1=ve.LTC_HALF_1,i.rectAreaLTC2=ve.LTC_HALF_2)),i.ambient[0]=u,i.ambient[1]=f,i.ambient[2]=d;const C=i.hash;(C.sunLength!==p||C.directionalLength!==x||C.pointLength!==m||C.spotLength!==M||C.rectAreaLength!==_||C.hemiLength!==S||C.numSunShadows!==g||C.numDirectionalShadows!==w||C.numPointShadows!==E||C.numSpotShadows!==L||C.numSpotMaps!==b||C.numLightProbes!==P)&&(i.sun.length=p,i.directional.length=x,i.spot.length=M,i.rectArea.length=_,i.point.length=m,i.hemi.length=S,i.sunShadow.length=g,i.sunShadowMap.length=g,i.sunShadowMatrix.length=v,i.sunShadowCascade.length=v,i.directionalShadow.length=w,i.directionalShadowMap.length=w,i.directionalShadowMatrix.length=w,i.pointShadow.length=E,i.pointShadowMap.length=E,i.pointShadowMatrix.length=E,i.spotShadow.length=L,i.spotShadowMap.length=L,i.spotLightMatrix.length=L+b-A,i.spotLightMap.length=b,i.numSpotLightShadowsWithMaps=A,i.numLightProbes=P,C.sunLength=p,C.directionalLength=x,C.pointLength=m,C.spotLength=M,C.rectAreaLength=_,C.hemiLength=S,C.numSunShadows=g,C.numDirectionalShadows=w,C.numPointShadows=E,C.numSpotShadows=L,C.numSpotMaps=b,C.numLightProbes=P,i.version=oM++)}function c(l,u){let f=0,d=0,p=0,g=0,v=0,x=0;const m=u.matrixWorldInverse;for(let M=0,_=l.length;M<_;M++){const S=l[M];if(S.isSunLight){const w=i.sun[f];w.direction.setFromMatrixPosition(S.matrixWorld),w.direction.transformDirection(m),f++}else if(S.isDirectionalLight){const w=i.directional[d];w.direction.setFromMatrixPosition(S.matrixWorld),r.setFromMatrixPosition(S.target.matrixWorld),w.direction.sub(r),w.direction.transformDirection(m),d++}else if(S.isSpotLight){const w=i.spot[g];w.position.setFromMatrixPosition(S.matrixWorld),w.position.applyMatrix4(m),w.direction.setFromMatrixPosition(S.matrixWorld),r.setFromMatrixPosition(S.target.matrixWorld),w.direction.sub(r),w.direction.transformDirection(m),g++}else if(S.isRectAreaLight){const w=i.rectArea[v];w.position.setFromMatrixPosition(S.matrixWorld),w.position.applyMatrix4(m),a.identity(),s.copy(S.matrixWorld),s.premultiply(m),a.extractRotation(s),w.halfWidth.set(S.width*.5,0,0),w.halfHeight.set(0,S.height*.5,0),w.halfWidth.applyMatrix4(a),w.halfHeight.applyMatrix4(a),v++}else if(S.isPointLight){const w=i.point[p];w.position.setFromMatrixPosition(S.matrixWorld),w.position.applyMatrix4(m),p++}else if(S.isHemisphereLight){const w=i.hemi[x];w.direction.setFromMatrixPosition(S.matrixWorld),w.direction.transformDirection(m),x++}}}return{setup:o,setupView:c,state:i}}function Rh(n){const e=new cM(n),t=[],i=[],r=[];function s(d){f.camera=d,t.length=0,i.length=0,r.length=0}function a(d){t.push(d)}function o(d){i.push(d)}function c(d){r.push(d)}function l(){e.setup(t)}function u(d){e.setupView(t,d)}const f={lightsArray:t,shadowsArray:i,lightProbeGridArray:r,camera:null,lights:e,transmissionRenderTarget:{},textureUnits:0};return{init:s,state:f,setupLights:l,setupLightsView:u,pushLight:a,pushShadow:o,pushLightProbeGrid:c}}function hM(n){let e=new WeakMap;function t(r,s=0){const a=e.get(r);let o;return a===void 0?(o=new Rh(n),e.set(r,[o])):s>=a.length?(o=new Rh(n),a.push(o)):o=a[s],o}function i(){e=new WeakMap}return{get:t,dispose:i}}const uM=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,dM=`uniform sampler2D shadow_pass;
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
}`,fM=[new W(1,0,0),new W(-1,0,0),new W(0,1,0),new W(0,-1,0),new W(0,0,1),new W(0,0,-1)],pM=[new W(0,-1,0),new W(0,-1,0),new W(0,0,1),new W(0,0,-1),new W(0,-1,0),new W(0,-1,0)],Ch=new Ut,rs=new W,Ro=new W;function mM(n,e,t){let i=new ba;const r=new We,s=new We,a=new st,o=new Tg,c=new Rg,l={},u=t.maxTextureSize,f={[er]:xn,[xn]:er,[gi]:gi},d=new yt({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new We},radius:{value:4}},vertexShader:uM,fragmentShader:dM}),p=d.clone();p.defines.HORIZONTAL_PASS=1;const g=new $t;g.setAttribute("position",new Rn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const v=new qt(g,d),x=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=aa;let m=this.type;this.render=function(E,L,b){if(x.enabled===!1||x.autoUpdate===!1&&x.needsUpdate===!1||E.length===0)return;this.type===xm&&(Ge("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."),this.type=aa);const A=n.getRenderTarget(),P=n.getActiveCubeFace(),C=n.getActiveMipmapLevel(),N=n.state;N.setBlending(ri),N.buffers.depth.getReversed()===!0?N.buffers.color.setClear(0,0,0,0):N.buffers.color.setClear(1,1,1,1),N.buffers.depth.setTest(!0),N.setScissorTest(!1);const U=m!==this.type;U&&L.traverse(function(D){D.material&&(Array.isArray(D.material)?D.material.forEach(O=>O.needsUpdate=!0):D.material.needsUpdate=!0)});for(let D=0,O=E.length;D<O;D++){const z=E[D],V=z.shadow;if(V===void 0){Ge("WebGLShadowMap:",z,"has no shadow.");continue}if(V.autoUpdate===!1&&V.needsUpdate===!1)continue;r.copy(V.mapSize);const Q=V.getFrameExtents();r.multiply(Q),s.copy(V.mapSize),(r.x>u||r.y>u)&&(r.x>u&&(s.x=Math.floor(u/Q.x),r.x=s.x*Q.x,V.mapSize.x=s.x),r.y>u&&(s.y=Math.floor(u/Q.y),r.y=s.y*Q.y,V.mapSize.y=s.y));const Y=n.state.buffers.depth.getReversed();if(V.camera._reversedDepth=Y,V.map===null||U===!0){if(V.map!==null&&(V.map.depthTexture!==null&&(V.map.depthTexture.dispose(),V.map.depthTexture=null),V.map.dispose()),this.type===os){if(z.isPointLight){Ge("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}V.map=new Un(r.x,r.y,{format:nr,type:oi,minFilter:kt,magFilter:kt,generateMipmaps:!1}),V.map.texture.name=z.name+".shadowMap",V.map.depthTexture=new zr(r.x,r.y,ni),V.map.depthTexture.name=z.name+".shadowMapDepth",V.map.depthTexture.format=_i,V.map.depthTexture.compareFunction=null,V.map.depthTexture.minFilter=Ht,V.map.depthTexture.magFilter=Ht}else z.isPointLight?(V.map=new Vu(r.x),V.map.depthTexture=new Sg(r.x,ai)):(V.map=new Un(r.x,r.y),V.map.depthTexture=new zr(r.x,r.y,ai)),V.map.depthTexture.name=z.name+".shadowMap",V.map.depthTexture.format=_i,this.type===aa?(V.map.depthTexture.compareFunction=Y?jl:Ql,V.map.depthTexture.minFilter=kt,V.map.depthTexture.magFilter=kt):(V.map.depthTexture.compareFunction=null,V.map.depthTexture.minFilter=Ht,V.map.depthTexture.magFilter=Ht);V.camera.updateProjectionMatrix()}V.map.isWebGLCubeRenderTarget!==!0&&(V.map.width!==r.x||V.map.height!==r.y)&&V.map.setSize(r.x,r.y);const te=V.map.isWebGLCubeRenderTarget?6:V.getViewportCount();z.isPointLight!==!0&&V.updateMatrices(z,b);for(let F=0;F<te;F++){const ne=V.getCamera(F);if(z.isPointLight){const ce=V.camera,be=V.matrix,Ue=z.distance||ce.far;Ue!==ce.far&&(ce.far=Ue,ce.updateProjectionMatrix()),rs.setFromMatrixPosition(z.matrixWorld),ce.position.copy(rs),Ro.copy(ce.position),Ro.add(fM[F]),ce.up.copy(pM[F]),ce.lookAt(Ro),ce.updateMatrixWorld(),be.makeTranslation(-rs.x,-rs.y,-rs.z),Ch.multiplyMatrices(ce.projectionMatrix,ce.matrixWorldInverse),V._frustum.setFromProjectionMatrix(Ch,ce.coordinateSystem,ce.reversedDepth)}if(V.map.isWebGLCubeRenderTarget)n.setRenderTarget(V.map,F),n.clear();else{F===0&&(n.setRenderTarget(V.map),n.clear());const ce=V.getViewport(F);a.set(s.x*ce.x,s.y*ce.y,s.x*ce.z,s.y*ce.w),N.viewport(a)}i=V.getFrustum(F),S(L,b,ne,z,this.type)}V.isPointLightShadow!==!0&&this.type===os&&M(V,b),V.needsUpdate=!1}m=this.type,x.needsUpdate=!1,n.setRenderTarget(A,P,C)};function M(E,L){const b=e.update(v);d.defines.VSM_SAMPLES!==E.blurSamples&&(d.defines.VSM_SAMPLES=E.blurSamples,p.defines.VSM_SAMPLES=E.blurSamples,d.needsUpdate=!0,p.needsUpdate=!0),E.mapPass===null?E.mapPass=new Un(r.x,r.y,{format:nr,type:oi}):(E.mapPass.width!==E.map.width||E.mapPass.height!==E.map.height)&&E.mapPass.setSize(E.map.width,E.map.height),d.uniforms.shadow_pass.value=E.map.depthTexture,d.uniforms.resolution.value.set(E.map.width,E.map.height),d.uniforms.radius.value=E.radius,n.setRenderTarget(E.mapPass),n.clear(),n.renderBufferDirect(L,null,b,d,v,null),p.uniforms.shadow_pass.value=E.mapPass.texture,p.uniforms.resolution.value.set(E.map.width,E.map.height),p.uniforms.radius.value=E.radius,n.setRenderTarget(E.map),n.clear(),n.renderBufferDirect(L,null,b,p,v,null)}function _(E,L,b,A){let P=null;const C=b.isPointLight===!0?E.customDistanceMaterial:E.customDepthMaterial;if(C!==void 0)P=C;else if(P=b.isPointLight===!0?c:o,n.localClippingEnabled&&L.clipShadows===!0&&Array.isArray(L.clippingPlanes)&&L.clippingPlanes.length!==0||L.displacementMap&&L.displacementScale!==0||L.alphaMap&&L.alphaTest>0||L.map&&L.alphaTest>0||L.alphaToCoverage===!0){const N=P.uuid,U=L.uuid;let D=l[N];D===void 0&&(D={},l[N]=D);let O=D[U];O===void 0&&(O=P.clone(),D[U]=O,L.addEventListener("dispose",w)),P=O}if(P.visible=L.visible,P.wireframe=L.wireframe,A===os?P.side=L.shadowSide!==null?L.shadowSide:L.side:P.side=L.shadowSide!==null?L.shadowSide:f[L.side],P.alphaMap=L.alphaMap,P.alphaTest=L.alphaToCoverage===!0?.5:L.alphaTest,P.map=L.map,P.clipShadows=L.clipShadows,P.clippingPlanes=L.clippingPlanes,P.clipIntersection=L.clipIntersection,P.displacementMap=L.displacementMap,P.displacementScale=L.displacementScale,P.displacementBias=L.displacementBias,P.wireframeLinewidth=L.wireframeLinewidth,P.linewidth=L.linewidth,b.isPointLight===!0&&P.isMeshDistanceMaterial===!0){const N=n.properties.get(P);N.light=b}return P}function S(E,L,b,A,P){if(E.visible===!1)return;if(E.layers.test(L.layers)&&(E.isMesh||E.isLine||E.isPoints)&&(E.castShadow||E.receiveShadow&&P===os)&&(!E.frustumCulled||E.intersectsFrustum(i))){E.modelViewMatrix.multiplyMatrices(b.matrixWorldInverse,E.matrixWorld);const U=e.update(E),D=E.material;if(Array.isArray(D)){const O=U.groups;for(let z=0,V=O.length;z<V;z++){const Q=O[z],Y=D[Q.materialIndex];if(Y&&Y.visible){const te=_(E,Y,A,P);E.onBeforeShadow(n,E,L,b,U,te,Q),n.renderBufferDirect(b,null,U,te,E,Q),E.onAfterShadow(n,E,L,b,U,te,Q)}}}else if(D.visible){const O=_(E,D,A,P);E.onBeforeShadow(n,E,L,b,U,O,null),n.renderBufferDirect(b,null,U,O,E,null),E.onAfterShadow(n,E,L,b,U,O,null)}}const N=E.children;for(let U=0,D=N.length;U<D;U++)S(N[U],L,b,A,P)}function w(E){E.target.removeEventListener("dispose",w);for(const b in l){const A=l[b],P=E.target.uuid;P in A&&(A[P].dispose(),delete A[P])}}}function gM(n,e){function t(){let H=!1;const pe=new st;let re=null;const me=new st(0,0,0,0);return{setMask:function(Se){re!==Se&&!H&&(n.colorMask(Se,Se,Se,Se),re=Se)},setLocked:function(Se){H=Se},setClear:function(Se,oe,Ne,Pe,Tt){Tt===!0&&(Se*=Pe,oe*=Pe,Ne*=Pe),pe.set(Se,oe,Ne,Pe),me.equals(pe)===!1&&(n.clearColor(Se,oe,Ne,Pe),me.copy(pe))},reset:function(){H=!1,re=null,me.set(-1,0,0,0)}}}function i(){let H=!1,pe=!1,re=null,me=null,Se=null;return{setReversed:function(oe){if(pe!==oe){const Ne=e.get("EXT_clip_control");oe?Ne.clipControlEXT(Ne.LOWER_LEFT_EXT,Ne.ZERO_TO_ONE_EXT):Ne.clipControlEXT(Ne.LOWER_LEFT_EXT,Ne.NEGATIVE_ONE_TO_ONE_EXT),pe=oe;const Pe=Se;Se=null,this.setClear(Pe)}},getReversed:function(){return pe},setTest:function(oe){oe?se(n.DEPTH_TEST):X(n.DEPTH_TEST)},setMask:function(oe){re!==oe&&!H&&(n.depthMask(oe),re=oe)},setFunc:function(oe){if(pe&&(oe=$m[oe]),me!==oe){switch(oe){case Go:n.depthFunc(n.NEVER);break;case Ho:n.depthFunc(n.ALWAYS);break;case Wo:n.depthFunc(n.LESS);break;case us:n.depthFunc(n.LEQUAL);break;case Vo:n.depthFunc(n.EQUAL);break;case Xo:n.depthFunc(n.GEQUAL);break;case ga:n.depthFunc(n.GREATER);break;case Yo:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}me=oe}},setLocked:function(oe){H=oe},setClear:function(oe){Se!==oe&&(Se=oe,pe&&(oe=1-oe),n.clearDepth(oe))},reset:function(){H=!1,re=null,me=null,Se=null,pe=!1}}}function r(){let H=!1,pe=null,re=null,me=null,Se=null,oe=null,Ne=null,Pe=null,Tt=null;return{setTest:function(dt){H||(dt?se(n.STENCIL_TEST):X(n.STENCIL_TEST))},setMask:function(dt){pe!==dt&&!H&&(n.stencilMask(dt),pe=dt)},setFunc:function(dt,Fn,$n){(re!==dt||me!==Fn||Se!==$n)&&(n.stencilFunc(dt,Fn,$n),re=dt,me=Fn,Se=$n)},setOp:function(dt,Fn,$n){(oe!==dt||Ne!==Fn||Pe!==$n)&&(n.stencilOp(dt,Fn,$n),oe=dt,Ne=Fn,Pe=$n)},setLocked:function(dt){H=dt},setClear:function(dt){Tt!==dt&&(n.clearStencil(dt),Tt=dt)},reset:function(){H=!1,pe=null,re=null,me=null,Se=null,oe=null,Ne=null,Pe=null,Tt=null}}}const s=new t,a=new i,o=new r,c=new WeakMap,l=new WeakMap;let u={},f={},d={},p=new WeakMap,g=[],v=null,x=!1,m=null,M=null,_=null,S=null,w=null,E=null,L=null,b=new tt(0,0,0),A=0,P=!1,C=null,N=null,U=null,D=null,O=null;const z=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let V=!1,Q=0;const Y=n.getParameter(n.VERSION);Y.indexOf("WebGL")!==-1?(Q=parseFloat(/^WebGL (\d)/.exec(Y)[1]),V=Q>=1):Y.indexOf("OpenGL ES")!==-1&&(Q=parseFloat(/^OpenGL ES (\d)/.exec(Y)[1]),V=Q>=2);let te=null,F={};const ne=n.getParameter(n.SCISSOR_BOX),ce=n.getParameter(n.VIEWPORT),be=new st().fromArray(ne),Ue=new st().fromArray(ce);function ke(H,pe,re,me){const Se=new Uint8Array(4),oe=n.createTexture();n.bindTexture(H,oe),n.texParameteri(H,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(H,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let Ne=0;Ne<re;Ne++)H===n.TEXTURE_3D||H===n.TEXTURE_2D_ARRAY?n.texImage3D(pe,0,n.RGBA,1,1,me,0,n.RGBA,n.UNSIGNED_BYTE,Se):n.texImage2D(pe+Ne,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,Se);return oe}const ee={};ee[n.TEXTURE_2D]=ke(n.TEXTURE_2D,n.TEXTURE_2D,1),ee[n.TEXTURE_CUBE_MAP]=ke(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),ee[n.TEXTURE_2D_ARRAY]=ke(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),ee[n.TEXTURE_3D]=ke(n.TEXTURE_3D,n.TEXTURE_3D,1,1),s.setClear(0,0,0,1),a.setClear(1),o.setClear(0),se(n.DEPTH_TEST),a.setFunc(us),Ye(!1),wt(Lc),se(n.CULL_FACE),Oe(ri);function se(H){u[H]!==!0&&(n.enable(H),u[H]=!0)}function X(H){u[H]!==!1&&(n.disable(H),u[H]=!1)}function he(H,pe){return d[H]!==pe?(n.bindFramebuffer(H,pe),d[H]=pe,H===n.DRAW_FRAMEBUFFER&&(d[n.FRAMEBUFFER]=pe),H===n.FRAMEBUFFER&&(d[n.DRAW_FRAMEBUFFER]=pe),!0):!1}function ae(H,pe){let re=g,me=!1;if(H){re=p.get(pe),re===void 0&&(re=[],p.set(pe,re));const Se=H.textures;if(re.length!==Se.length||re[0]!==n.COLOR_ATTACHMENT0){for(let oe=0,Ne=Se.length;oe<Ne;oe++)re[oe]=n.COLOR_ATTACHMENT0+oe;re.length=Se.length,me=!0}}else re[0]!==n.BACK&&(re[0]=n.BACK,me=!0);me&&n.drawBuffers(re)}function Ee(H){return v!==H?(n.useProgram(H),v=H,!0):!1}const Je={[wr]:n.FUNC_ADD,[vm]:n.FUNC_SUBTRACT,[Mm]:n.FUNC_REVERSE_SUBTRACT};Je[_m]=n.MIN,Je[Sm]=n.MAX;const Ce={[Vl]:n.ZERO,[bm]:n.ONE,[Xl]:n.SRC_COLOR,[uu]:n.SRC_ALPHA,[Rm]:n.SRC_ALPHA_SATURATE,[Am]:n.DST_COLOR,[wm]:n.DST_ALPHA,[ym]:n.ONE_MINUS_SRC_COLOR,[du]:n.ONE_MINUS_SRC_ALPHA,[Tm]:n.ONE_MINUS_DST_COLOR,[Em]:n.ONE_MINUS_DST_ALPHA,[Cm]:n.CONSTANT_COLOR,[Lm]:n.ONE_MINUS_CONSTANT_COLOR,[Pm]:n.CONSTANT_ALPHA,[Dm]:n.ONE_MINUS_CONSTANT_ALPHA};function Oe(H,pe,re,me,Se,oe,Ne,Pe,Tt,dt){if(H===ri){x===!0&&(X(n.BLEND),x=!1);return}if(x===!1&&(se(n.BLEND),x=!0),H!==Wl){if(H!==m||dt!==P){if((M!==wr||w!==wr)&&(n.blendEquation(n.FUNC_ADD),M=wr,w=wr),dt)switch(H){case Lr:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case Fr:n.blendFunc(n.ONE,n.ONE);break;case Pc:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case Dc:n.blendFuncSeparate(n.DST_COLOR,n.ONE_MINUS_SRC_ALPHA,n.ZERO,n.ONE);break;default:lt("WebGLState: Invalid blending: ",H);break}else switch(H){case Lr:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case Fr:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE,n.ONE,n.ONE);break;case Pc:lt("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Dc:lt("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:lt("WebGLState: Invalid blending: ",H);break}_=null,S=null,E=null,L=null,b.set(0,0,0),A=0,m=H,P=dt}return}Se=Se||pe,oe=oe||re,Ne=Ne||me,(pe!==M||Se!==w)&&(n.blendEquationSeparate(Je[pe],Je[Se]),M=pe,w=Se),(re!==_||me!==S||oe!==E||Ne!==L)&&(n.blendFuncSeparate(Ce[re],Ce[me],Ce[oe],Ce[Ne]),_=re,S=me,E=oe,L=Ne),(Pe.equals(b)===!1||Tt!==A)&&(n.blendColor(Pe.r,Pe.g,Pe.b,Tt),b.copy(Pe),A=Tt),m=H,P=!1}function Ke(H,pe){H.side===gi?X(n.CULL_FACE):se(n.CULL_FACE);let re=H.side===xn;pe&&(re=!re),Ye(re),H.blending===Lr&&H.transparent===!1?Oe(ri):Oe(H.blending,H.blendEquation,H.blendSrc,H.blendDst,H.blendEquationAlpha,H.blendSrcAlpha,H.blendDstAlpha,H.blendColor,H.blendAlpha,H.premultipliedAlpha),a.setFunc(H.depthFunc),a.setTest(H.depthTest),a.setMask(H.depthWrite),s.setMask(H.colorWrite);const me=H.stencilWrite;o.setTest(me),me&&(o.setMask(H.stencilWriteMask),o.setFunc(H.stencilFunc,H.stencilRef,H.stencilFuncMask),o.setOp(H.stencilFail,H.stencilZFail,H.stencilZPass)),Qt(H.polygonOffset,H.polygonOffsetFactor,H.polygonOffsetUnits),H.alphaToCoverage===!0?se(n.SAMPLE_ALPHA_TO_COVERAGE):X(n.SAMPLE_ALPHA_TO_COVERAGE)}function Ye(H){C!==H&&(H?n.frontFace(n.CW):n.frontFace(n.CCW),C=H)}function wt(H){H!==mm?(se(n.CULL_FACE),H!==N&&(H===Lc?n.cullFace(n.BACK):H===gm?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):X(n.CULL_FACE),N=H}function Ot(H){H!==U&&(V&&n.lineWidth(H),U=H)}function Qt(H,pe,re){H?(se(n.POLYGON_OFFSET_FILL),(D!==pe||O!==re)&&(D=pe,O=re,a.getReversed()&&(pe=-pe),n.polygonOffset(pe,re))):X(n.POLYGON_OFFSET_FILL)}function _t(H){H?se(n.SCISSOR_TEST):X(n.SCISSOR_TEST)}function Et(H){H===void 0&&(H=n.TEXTURE0+z-1),te!==H&&(n.activeTexture(H),te=H)}function G(H,pe,re){re===void 0&&(te===null?re=n.TEXTURE0+z-1:re=te);let me=F[re];me===void 0&&(me={type:void 0,texture:void 0},F[re]=me),(me.type!==H||me.texture!==pe)&&(te!==re&&(n.activeTexture(re),te=re),n.bindTexture(H,pe||ee[H]),me.type=H,me.texture=pe)}function Qe(){const H=F[te];H!==void 0&&H.type!==void 0&&(n.bindTexture(H.type,null),H.type=void 0,H.texture=void 0)}function ze(){try{n.compressedTexImage2D(...arguments)}catch(H){lt("WebGLState:",H)}}function I(){try{n.compressedTexImage3D(...arguments)}catch(H){lt("WebGLState:",H)}}function y(){try{n.texSubImage2D(...arguments)}catch(H){lt("WebGLState:",H)}}function B(){try{n.texSubImage3D(...arguments)}catch(H){lt("WebGLState:",H)}}function K(){try{n.compressedTexSubImage2D(...arguments)}catch(H){lt("WebGLState:",H)}}function Z(){try{n.compressedTexSubImage3D(...arguments)}catch(H){lt("WebGLState:",H)}}function le(){try{n.texStorage2D(...arguments)}catch(H){lt("WebGLState:",H)}}function ue(){try{n.texStorage3D(...arguments)}catch(H){lt("WebGLState:",H)}}function j(){try{n.texImage2D(...arguments)}catch(H){lt("WebGLState:",H)}}function ie(){try{n.texImage3D(...arguments)}catch(H){lt("WebGLState:",H)}}function de(H){return f[H]!==void 0?f[H]:n.getParameter(H)}function Le(H,pe){f[H]!==pe&&(n.pixelStorei(H,pe),f[H]=pe)}function xe(H){be.equals(H)===!1&&(n.scissor(H.x,H.y,H.z,H.w),be.copy(H))}function fe(H){Ue.equals(H)===!1&&(n.viewport(H.x,H.y,H.z,H.w),Ue.copy(H))}function Ie(H,pe){let re=l.get(pe);re===void 0&&(re=new WeakMap,l.set(pe,re));let me=re.get(H);me===void 0&&(me=n.getUniformBlockIndex(pe,H.name),re.set(H,me))}function Be(H,pe){const me=l.get(pe).get(H);c.get(pe)!==me&&(n.uniformBlockBinding(pe,me,H.__bindingPointIndex),c.set(pe,me))}function qe(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),a.setReversed(!1),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),n.pixelStorei(n.PACK_ALIGNMENT,4),n.pixelStorei(n.UNPACK_ALIGNMENT,4),n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,!1),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,n.BROWSER_DEFAULT_WEBGL),n.pixelStorei(n.PACK_ROW_LENGTH,0),n.pixelStorei(n.PACK_SKIP_PIXELS,0),n.pixelStorei(n.PACK_SKIP_ROWS,0),n.pixelStorei(n.UNPACK_ROW_LENGTH,0),n.pixelStorei(n.UNPACK_IMAGE_HEIGHT,0),n.pixelStorei(n.UNPACK_SKIP_PIXELS,0),n.pixelStorei(n.UNPACK_SKIP_ROWS,0),n.pixelStorei(n.UNPACK_SKIP_IMAGES,0),u={},f={},te=null,F={},d={},p=new WeakMap,g=[],v=null,x=!1,m=null,M=null,_=null,S=null,w=null,E=null,L=null,b=new tt(0,0,0),A=0,P=!1,C=null,N=null,U=null,D=null,O=null,be.set(0,0,n.canvas.width,n.canvas.height),Ue.set(0,0,n.canvas.width,n.canvas.height),s.reset(),a.reset(),o.reset()}return{buffers:{color:s,depth:a,stencil:o},enable:se,disable:X,bindFramebuffer:he,drawBuffers:ae,useProgram:Ee,setBlending:Oe,setMaterial:Ke,setFlipSided:Ye,setCullFace:wt,setLineWidth:Ot,setPolygonOffset:Qt,setScissorTest:_t,activeTexture:Et,bindTexture:G,unbindTexture:Qe,compressedTexImage2D:ze,compressedTexImage3D:I,texImage2D:j,texImage3D:ie,pixelStorei:Le,getParameter:de,updateUBOMapping:Ie,uniformBlockBinding:Be,texStorage2D:le,texStorage3D:ue,texSubImage2D:y,texSubImage3D:B,compressedTexSubImage2D:K,compressedTexSubImage3D:Z,scissor:xe,viewport:fe,reset:qe}}function xM(n,e,t,i,r,s,a){const o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new We,u=new WeakMap,f=new Set;let d;const p=new WeakMap;let g=!1;try{g=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function v(I,y){return g?new OffscreenCanvas(I,y):Sa("canvas")}function x(I,y,B){let K=1;const Z=ze(I);if((Z.width>B||Z.height>B)&&(K=B/Math.max(Z.width,Z.height)),K<1)if(typeof HTMLImageElement<"u"&&I instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&I instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&I instanceof ImageBitmap||typeof VideoFrame<"u"&&I instanceof VideoFrame){const le=Math.floor(K*Z.width),ue=Math.floor(K*Z.height);d===void 0&&(d=v(le,ue));const j=y?v(le,ue):d;return j.width=le,j.height=ue,j.getContext("2d").drawImage(I,0,0,le,ue),Ge("WebGLRenderer: Texture has been resized from ("+Z.width+"x"+Z.height+") to ("+le+"x"+ue+")."),j}else return"data"in I&&Ge("WebGLRenderer: Image in DataTexture is too big ("+Z.width+"x"+Z.height+")."),I;return I}function m(I){return I.generateMipmaps}function M(I){n.generateMipmap(I)}function _(I){return I.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:I.isWebGL3DRenderTarget?n.TEXTURE_3D:I.isWebGLArrayRenderTarget||I.isCompressedArrayTexture?n.TEXTURE_2D_ARRAY:n.TEXTURE_2D}function S(I,y,B,K,Z,le=!1){if(I!==null){if(n[I]!==void 0)return n[I];Ge("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+I+"'")}let ue;K&&(ue=e.get("EXT_texture_norm16"),ue||Ge("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let j=y;if(y===n.RED&&(B===n.FLOAT&&(j=n.R32F),B===n.HALF_FLOAT&&(j=n.R16F),B===n.UNSIGNED_BYTE&&(j=n.R8),B===n.UNSIGNED_SHORT&&ue&&(j=ue.R16_EXT),B===n.SHORT&&ue&&(j=ue.R16_SNORM_EXT)),y===n.RED_INTEGER&&(B===n.UNSIGNED_BYTE&&(j=n.R8UI),B===n.UNSIGNED_SHORT&&(j=n.R16UI),B===n.UNSIGNED_INT&&(j=n.R32UI),B===n.BYTE&&(j=n.R8I),B===n.SHORT&&(j=n.R16I),B===n.INT&&(j=n.R32I)),y===n.RG&&(B===n.FLOAT&&(j=n.RG32F),B===n.HALF_FLOAT&&(j=n.RG16F),B===n.UNSIGNED_BYTE&&(j=n.RG8),B===n.UNSIGNED_SHORT&&ue&&(j=ue.RG16_EXT),B===n.SHORT&&ue&&(j=ue.RG16_SNORM_EXT)),y===n.RG_INTEGER&&(B===n.UNSIGNED_BYTE&&(j=n.RG8UI),B===n.UNSIGNED_SHORT&&(j=n.RG16UI),B===n.UNSIGNED_INT&&(j=n.RG32UI),B===n.BYTE&&(j=n.RG8I),B===n.SHORT&&(j=n.RG16I),B===n.INT&&(j=n.RG32I)),y===n.RGB_INTEGER&&(B===n.UNSIGNED_BYTE&&(j=n.RGB8UI),B===n.UNSIGNED_SHORT&&(j=n.RGB16UI),B===n.UNSIGNED_INT&&(j=n.RGB32UI),B===n.BYTE&&(j=n.RGB8I),B===n.SHORT&&(j=n.RGB16I),B===n.INT&&(j=n.RGB32I)),y===n.RGBA_INTEGER&&(B===n.UNSIGNED_BYTE&&(j=n.RGBA8UI),B===n.UNSIGNED_SHORT&&(j=n.RGBA16UI),B===n.UNSIGNED_INT&&(j=n.RGBA32UI),B===n.BYTE&&(j=n.RGBA8I),B===n.SHORT&&(j=n.RGBA16I),B===n.INT&&(j=n.RGBA32I)),y===n.RGB&&(B===n.UNSIGNED_SHORT&&ue&&(j=ue.RGB16_EXT),B===n.SHORT&&ue&&(j=ue.RGB16_SNORM_EXT),B===n.UNSIGNED_INT_5_9_9_9_REV&&(j=n.RGB9_E5),B===n.UNSIGNED_INT_10F_11F_11F_REV&&(j=n.R11F_G11F_B10F)),y===n.RGBA){const ie=le?Ma:it.getTransfer(Z);B===n.FLOAT&&(j=n.RGBA32F),B===n.HALF_FLOAT&&(j=n.RGBA16F),B===n.UNSIGNED_BYTE&&(j=ie===vt?n.SRGB8_ALPHA8:n.RGBA8),B===n.UNSIGNED_SHORT&&ue&&(j=ue.RGBA16_EXT),B===n.SHORT&&ue&&(j=ue.RGBA16_SNORM_EXT),B===n.UNSIGNED_SHORT_4_4_4_4&&(j=n.RGBA4),B===n.UNSIGNED_SHORT_5_5_5_1&&(j=n.RGB5_A1)}return(j===n.R16F||j===n.R32F||j===n.RG16F||j===n.RG32F||j===n.RGBA16F||j===n.RGBA32F)&&e.get("EXT_color_buffer_float"),j}function w(I,y){let B;return I?y===null||y===ai||y===fs?B=n.DEPTH24_STENCIL8:y===ni?B=n.DEPTH32F_STENCIL8:y===ds&&(B=n.DEPTH24_STENCIL8,Ge("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):y===null||y===ai||y===fs?B=n.DEPTH_COMPONENT24:y===ni?B=n.DEPTH_COMPONENT32F:y===ds&&(B=n.DEPTH_COMPONENT16),B}function E(I,y){return m(I)===!0||I.isFramebufferTexture&&I.minFilter!==Ht&&I.minFilter!==kt?Math.log2(Math.max(y.width,y.height))+1:I.mipmaps!==void 0&&I.mipmaps.length>0?I.mipmaps.length:I.isCompressedTexture&&Array.isArray(I.image)?y.mipmaps.length:1}function L(I){const y=I.target;y.removeEventListener("dispose",L),A(y),y.isVideoTexture&&u.delete(y),y.isHTMLTexture&&f.delete(y)}function b(I){const y=I.target;y.removeEventListener("dispose",b),C(y)}function A(I){const y=i.get(I);if(y.__webglInit===void 0)return;const B=I.source,K=p.get(B);if(K){const Z=K[y.__cacheKey];Z.usedTimes--,Z.usedTimes===0&&P(I),Object.keys(K).length===0&&p.delete(B)}i.remove(I)}function P(I){const y=i.get(I);n.deleteTexture(y.__webglTexture);const B=I.source,K=p.get(B);delete K[y.__cacheKey],a.memory.textures--}function C(I){const y=i.get(I);if(I.depthTexture&&(I.depthTexture.dispose(),i.remove(I.depthTexture)),I.isWebGLCubeRenderTarget)for(let K=0;K<6;K++){if(Array.isArray(y.__webglFramebuffer[K]))for(let Z=0;Z<y.__webglFramebuffer[K].length;Z++)n.deleteFramebuffer(y.__webglFramebuffer[K][Z]);else n.deleteFramebuffer(y.__webglFramebuffer[K]);y.__webglDepthbuffer&&n.deleteRenderbuffer(y.__webglDepthbuffer[K])}else{if(Array.isArray(y.__webglFramebuffer))for(let K=0;K<y.__webglFramebuffer.length;K++)n.deleteFramebuffer(y.__webglFramebuffer[K]);else n.deleteFramebuffer(y.__webglFramebuffer);if(y.__webglDepthbuffer&&n.deleteRenderbuffer(y.__webglDepthbuffer),y.__webglMultisampledFramebuffer&&n.deleteFramebuffer(y.__webglMultisampledFramebuffer),y.__webglColorRenderbuffer)for(let K=0;K<y.__webglColorRenderbuffer.length;K++)y.__webglColorRenderbuffer[K]&&n.deleteRenderbuffer(y.__webglColorRenderbuffer[K]);y.__webglDepthRenderbuffer&&n.deleteRenderbuffer(y.__webglDepthRenderbuffer)}const B=I.textures;for(let K=0,Z=B.length;K<Z;K++){const le=i.get(B[K]);le.__webglTexture&&(n.deleteTexture(le.__webglTexture),a.memory.textures--),i.remove(B[K])}i.remove(I)}let N=0;function U(){N=0}function D(){return N}function O(I){N=I}function z(){const I=N;return I>=r.maxTextures&&Ge("WebGLTextures: Trying to use "+(I+1)+" texture units while this GPU supports only "+r.maxTextures),N+=1,I}function V(I){const y=[];return y.push(I.wrapS),y.push(I.wrapT),y.push(I.wrapR||0),y.push(I.magFilter),y.push(I.minFilter),y.push(I.anisotropy),y.push(I.internalFormat),y.push(I.format),y.push(I.type),y.push(I.generateMipmaps),y.push(I.premultiplyAlpha),y.push(I.flipY),y.push(I.unpackAlignment),y.push(I.colorSpace),y.join()}function Q(I,y){const B=i.get(I);if(I.isVideoTexture&&G(I),I.isRenderTargetTexture===!1&&I.isExternalTexture!==!0&&I.version>0&&B.__version!==I.version){const K=I.image;if(K===null)Ge("WebGLRenderer: Texture marked for update but no image data found.");else if(K.complete===!1)Ge("WebGLRenderer: Texture marked for update but image is incomplete");else{X(B,I,y);return}}else I.isExternalTexture&&(B.__webglTexture=I.sourceTexture?I.sourceTexture:null);t.bindTexture(n.TEXTURE_2D,B.__webglTexture,n.TEXTURE0+y)}function Y(I,y){const B=i.get(I);if(I.isRenderTargetTexture===!1&&I.version>0&&B.__version!==I.version){X(B,I,y);return}else I.isExternalTexture&&(B.__webglTexture=I.sourceTexture?I.sourceTexture:null);t.bindTexture(n.TEXTURE_2D_ARRAY,B.__webglTexture,n.TEXTURE0+y)}function te(I,y){const B=i.get(I);if(I.isRenderTargetTexture===!1&&I.version>0&&B.__version!==I.version){X(B,I,y);return}t.bindTexture(n.TEXTURE_3D,B.__webglTexture,n.TEXTURE0+y)}function F(I,y){const B=i.get(I);if(I.isCubeDepthTexture!==!0&&I.version>0&&B.__version!==I.version){he(B,I,y);return}t.bindTexture(n.TEXTURE_CUBE_MAP,B.__webglTexture,n.TEXTURE0+y)}const ne={[Ko]:n.REPEAT,[xi]:n.CLAMP_TO_EDGE,[qo]:n.MIRRORED_REPEAT},ce={[Ht]:n.NEAREST,[Um]:n.NEAREST_MIPMAP_NEAREST,[As]:n.NEAREST_MIPMAP_LINEAR,[kt]:n.LINEAR,[Ja]:n.LINEAR_MIPMAP_NEAREST,[$i]:n.LINEAR_MIPMAP_LINEAR},be={[zm]:n.NEVER,[Vm]:n.ALWAYS,[km]:n.LESS,[Ql]:n.LEQUAL,[Gm]:n.EQUAL,[jl]:n.GEQUAL,[Hm]:n.GREATER,[Wm]:n.NOTEQUAL};function Ue(I,y){if(y.type===ni&&e.has("OES_texture_float_linear")===!1&&(y.magFilter===kt||y.magFilter===Ja||y.magFilter===As||y.magFilter===$i||y.minFilter===kt||y.minFilter===Ja||y.minFilter===As||y.minFilter===$i)&&Ge("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),n.texParameteri(I,n.TEXTURE_WRAP_S,ne[y.wrapS]),n.texParameteri(I,n.TEXTURE_WRAP_T,ne[y.wrapT]),(I===n.TEXTURE_3D||I===n.TEXTURE_2D_ARRAY)&&n.texParameteri(I,n.TEXTURE_WRAP_R,ne[y.wrapR]),n.texParameteri(I,n.TEXTURE_MAG_FILTER,ce[y.magFilter]),n.texParameteri(I,n.TEXTURE_MIN_FILTER,ce[y.minFilter]),y.compareFunction&&(n.texParameteri(I,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(I,n.TEXTURE_COMPARE_FUNC,be[y.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(y.magFilter===Ht||y.minFilter!==As&&y.minFilter!==$i||y.type===ni&&e.has("OES_texture_float_linear")===!1)return;if(y.anisotropy>1||i.get(y).__currentAnisotropy){const B=e.get("EXT_texture_filter_anisotropic");n.texParameterf(I,B.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(y.anisotropy,r.getMaxAnisotropy())),i.get(y).__currentAnisotropy=y.anisotropy}}}function ke(I,y){let B=!1;I.__webglInit===void 0&&(I.__webglInit=!0,y.addEventListener("dispose",L));const K=y.source;let Z=p.get(K);Z===void 0&&(Z={},p.set(K,Z));const le=V(y);if(le!==I.__cacheKey){Z[le]===void 0&&(Z[le]={texture:n.createTexture(),usedTimes:0},a.memory.textures++,B=!0),Z[le].usedTimes++;const ue=Z[I.__cacheKey];ue!==void 0&&(Z[I.__cacheKey].usedTimes--,ue.usedTimes===0&&P(y)),I.__cacheKey=le,I.__webglTexture=Z[le].texture}return B}function ee(I,y,B){return Math.floor(Math.floor(I/B)/y)}function se(I,y,B,K){const le=I.updateRanges;if(le.length===0)t.texSubImage2D(n.TEXTURE_2D,0,0,0,y.width,y.height,B,K,y.data);else{le.sort((Le,xe)=>Le.start-xe.start);let ue=0;for(let Le=1;Le<le.length;Le++){const xe=le[ue],fe=le[Le],Ie=xe.start+xe.count,Be=ee(fe.start,y.width,4),qe=ee(xe.start,y.width,4);fe.start<=Ie+1&&Be===qe&&ee(fe.start+fe.count-1,y.width,4)===Be?xe.count=Math.max(xe.count,fe.start+fe.count-xe.start):(++ue,le[ue]=fe)}le.length=ue+1;const j=t.getParameter(n.UNPACK_ROW_LENGTH),ie=t.getParameter(n.UNPACK_SKIP_PIXELS),de=t.getParameter(n.UNPACK_SKIP_ROWS);t.pixelStorei(n.UNPACK_ROW_LENGTH,y.width);for(let Le=0,xe=le.length;Le<xe;Le++){const fe=le[Le],Ie=Math.floor(fe.start/4),Be=Math.ceil(fe.count/4),qe=Ie%y.width,H=Math.floor(Ie/y.width),pe=Be,re=1;t.pixelStorei(n.UNPACK_SKIP_PIXELS,qe),t.pixelStorei(n.UNPACK_SKIP_ROWS,H),t.texSubImage2D(n.TEXTURE_2D,0,qe,H,pe,re,B,K,y.data)}I.clearUpdateRanges(),t.pixelStorei(n.UNPACK_ROW_LENGTH,j),t.pixelStorei(n.UNPACK_SKIP_PIXELS,ie),t.pixelStorei(n.UNPACK_SKIP_ROWS,de)}}function X(I,y,B){let K=n.TEXTURE_2D;(y.isDataArrayTexture||y.isCompressedArrayTexture)&&(K=n.TEXTURE_2D_ARRAY),y.isData3DTexture&&(K=n.TEXTURE_3D);const Z=ke(I,y),le=y.source;t.bindTexture(K,I.__webglTexture,n.TEXTURE0+B);const ue=i.get(le);if(le.version!==ue.__version||Z===!0){if(t.activeTexture(n.TEXTURE0+B),(typeof ImageBitmap<"u"&&y.image instanceof ImageBitmap)===!1){const re=it.getPrimaries(it.workingColorSpace),me=y.colorSpace===Wn?null:it.getPrimaries(y.colorSpace),Se=y.colorSpace===Wn||re===me?n.NONE:n.BROWSER_DEFAULT_WEBGL;t.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,y.flipY),t.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,y.premultiplyAlpha),t.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,Se)}t.pixelStorei(n.UNPACK_ALIGNMENT,y.unpackAlignment);let ie=x(y.image,!1,r.maxTextureSize);ie=Qe(y,ie);const de=s.convert(y.format,y.colorSpace),Le=s.convert(y.type);let xe=S(y.internalFormat,de,Le,y.normalized,y.colorSpace,y.isVideoTexture);Ue(K,y);let fe;const Ie=y.mipmaps,Be=y.isVideoTexture!==!0,qe=ue.__version===void 0||Z===!0,H=le.dataReady,pe=E(y,ie);if(y.isDepthTexture)xe=w(y.format===Zi,y.type),qe&&(Be?t.texStorage2D(n.TEXTURE_2D,1,xe,ie.width,ie.height):t.texImage2D(n.TEXTURE_2D,0,xe,ie.width,ie.height,0,de,Le,null));else if(y.isDataTexture)if(Ie.length>0){Be&&qe&&t.texStorage2D(n.TEXTURE_2D,pe,xe,Ie[0].width,Ie[0].height);for(let re=0,me=Ie.length;re<me;re++)fe=Ie[re],Be?H&&t.texSubImage2D(n.TEXTURE_2D,re,0,0,fe.width,fe.height,de,Le,fe.data):t.texImage2D(n.TEXTURE_2D,re,xe,fe.width,fe.height,0,de,Le,fe.data);y.generateMipmaps=!1}else Be?(qe&&t.texStorage2D(n.TEXTURE_2D,pe,xe,ie.width,ie.height),H&&se(y,ie,de,Le)):t.texImage2D(n.TEXTURE_2D,0,xe,ie.width,ie.height,0,de,Le,ie.data);else if(y.isCompressedTexture)if(y.isCompressedArrayTexture){Be&&qe&&t.texStorage3D(n.TEXTURE_2D_ARRAY,pe,xe,Ie[0].width,Ie[0].height,ie.depth);for(let re=0,me=Ie.length;re<me;re++)if(fe=Ie[re],y.format!==En)if(de!==null)if(Be){if(H)if(y.layerUpdates.size>0){const Se=oh(fe.width,fe.height,y.format,y.type);for(const oe of y.layerUpdates){const Ne=fe.data.subarray(oe*Se/fe.data.BYTES_PER_ELEMENT,(oe+1)*Se/fe.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,re,0,0,oe,fe.width,fe.height,1,de,Ne)}}else t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,re,0,0,0,fe.width,fe.height,ie.depth,de,fe.data)}else t.compressedTexImage3D(n.TEXTURE_2D_ARRAY,re,xe,fe.width,fe.height,ie.depth,0,fe.data,0,0);else Ge("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Be?H&&t.texSubImage3D(n.TEXTURE_2D_ARRAY,re,0,0,0,fe.width,fe.height,ie.depth,de,Le,fe.data):t.texImage3D(n.TEXTURE_2D_ARRAY,re,xe,fe.width,fe.height,ie.depth,0,de,Le,fe.data);y.layerUpdates.size>0&&y.clearLayerUpdates()}else{Be&&qe&&t.texStorage2D(n.TEXTURE_2D,pe,xe,Ie[0].width,Ie[0].height);for(let re=0,me=Ie.length;re<me;re++)fe=Ie[re],y.format!==En?de!==null?Be?H&&t.compressedTexSubImage2D(n.TEXTURE_2D,re,0,0,fe.width,fe.height,de,fe.data):t.compressedTexImage2D(n.TEXTURE_2D,re,xe,fe.width,fe.height,0,fe.data):Ge("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Be?H&&t.texSubImage2D(n.TEXTURE_2D,re,0,0,fe.width,fe.height,de,Le,fe.data):t.texImage2D(n.TEXTURE_2D,re,xe,fe.width,fe.height,0,de,Le,fe.data)}else if(y.isDataArrayTexture)if(Be){if(qe&&t.texStorage3D(n.TEXTURE_2D_ARRAY,pe,xe,ie.width,ie.height,ie.depth),H)if(y.layerUpdates.size>0){const re=oh(ie.width,ie.height,y.format,y.type);for(const me of y.layerUpdates){const Se=ie.data.subarray(me*re/ie.data.BYTES_PER_ELEMENT,(me+1)*re/ie.data.BYTES_PER_ELEMENT);t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,me,ie.width,ie.height,1,de,Le,Se)}y.clearLayerUpdates()}else t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,ie.width,ie.height,ie.depth,de,Le,ie.data)}else t.texImage3D(n.TEXTURE_2D_ARRAY,0,xe,ie.width,ie.height,ie.depth,0,de,Le,ie.data);else if(y.isData3DTexture)Be?(qe&&t.texStorage3D(n.TEXTURE_3D,pe,xe,ie.width,ie.height,ie.depth),H&&t.texSubImage3D(n.TEXTURE_3D,0,0,0,0,ie.width,ie.height,ie.depth,de,Le,ie.data)):t.texImage3D(n.TEXTURE_3D,0,xe,ie.width,ie.height,ie.depth,0,de,Le,ie.data);else if(y.isFramebufferTexture){if(qe)if(Be)t.texStorage2D(n.TEXTURE_2D,pe,xe,ie.width,ie.height);else{let re=ie.width,me=ie.height;for(let Se=0;Se<pe;Se++)t.texImage2D(n.TEXTURE_2D,Se,xe,re,me,0,de,Le,null),re>>=1,me>>=1}}else if(y.isHTMLTexture){if("texElementImage2D"in n){const re=n.canvas;if(re.hasAttribute("layoutsubtree")||re.setAttribute("layoutsubtree","true"),ie.parentNode!==re){re.appendChild(ie),f.add(y),re.onpaint=me=>{const Se=me.changedElements;for(const oe of f)Se.includes(oe.image)&&(oe.needsUpdate=!0)},re.requestPaint();return}if(n.texElementImage2D.length===3)n.texElementImage2D(n.TEXTURE_2D,n.RGBA8,ie);else{const Se=n.RGBA,oe=n.RGBA,Ne=n.UNSIGNED_BYTE;n.texElementImage2D(n.TEXTURE_2D,0,Se,oe,Ne,ie)}n.texParameteri(n.TEXTURE_2D,n.TEXTURE_MIN_FILTER,n.LINEAR),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_S,n.CLAMP_TO_EDGE),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_T,n.CLAMP_TO_EDGE)}}else if(Ie.length>0){if(Be&&qe){const re=ze(Ie[0]);t.texStorage2D(n.TEXTURE_2D,pe,xe,re.width,re.height)}for(let re=0,me=Ie.length;re<me;re++)fe=Ie[re],Be?H&&t.texSubImage2D(n.TEXTURE_2D,re,0,0,de,Le,fe):t.texImage2D(n.TEXTURE_2D,re,xe,de,Le,fe);y.generateMipmaps=!1}else if(Be){if(qe){const re=ze(ie);t.texStorage2D(n.TEXTURE_2D,pe,xe,re.width,re.height)}H&&t.texSubImage2D(n.TEXTURE_2D,0,0,0,de,Le,ie)}else t.texImage2D(n.TEXTURE_2D,0,xe,de,Le,ie);m(y)&&M(K),ue.__version=le.version,y.onUpdate&&y.onUpdate(y)}I.__version=y.version}function he(I,y,B){if(y.image.length!==6)return;const K=ke(I,y),Z=y.source;t.bindTexture(n.TEXTURE_CUBE_MAP,I.__webglTexture,n.TEXTURE0+B);const le=i.get(Z);if(Z.version!==le.__version||K===!0){t.activeTexture(n.TEXTURE0+B);const ue=it.getPrimaries(it.workingColorSpace),j=y.colorSpace===Wn?null:it.getPrimaries(y.colorSpace),ie=y.colorSpace===Wn||ue===j?n.NONE:n.BROWSER_DEFAULT_WEBGL;t.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,y.flipY),t.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,y.premultiplyAlpha),t.pixelStorei(n.UNPACK_ALIGNMENT,y.unpackAlignment),t.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,ie);const de=y.isCompressedTexture||y.image[0].isCompressedTexture,Le=y.image[0]&&y.image[0].isDataTexture,xe=[];for(let oe=0;oe<6;oe++)!de&&!Le?xe[oe]=x(y.image[oe],!0,r.maxCubemapSize):xe[oe]=Le?y.image[oe].image:y.image[oe],xe[oe]=Qe(y,xe[oe]);const fe=xe[0],Ie=s.convert(y.format,y.colorSpace),Be=s.convert(y.type),qe=S(y.internalFormat,Ie,Be,y.normalized,y.colorSpace),H=y.isVideoTexture!==!0,pe=le.__version===void 0||K===!0,re=Z.dataReady;let me=E(y,fe);Ue(n.TEXTURE_CUBE_MAP,y);let Se;if(de){H&&pe&&t.texStorage2D(n.TEXTURE_CUBE_MAP,me,qe,fe.width,fe.height);for(let oe=0;oe<6;oe++){Se=xe[oe].mipmaps;for(let Ne=0;Ne<Se.length;Ne++){const Pe=Se[Ne];y.format!==En?Ie!==null?H?re&&t.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+oe,Ne,0,0,Pe.width,Pe.height,Ie,Pe.data):t.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+oe,Ne,qe,Pe.width,Pe.height,0,Pe.data):Ge("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):H?re&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+oe,Ne,0,0,Pe.width,Pe.height,Ie,Be,Pe.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+oe,Ne,qe,Pe.width,Pe.height,0,Ie,Be,Pe.data)}}}else{if(Se=y.mipmaps,H&&pe){Se.length>0&&me++;const oe=ze(xe[0]);t.texStorage2D(n.TEXTURE_CUBE_MAP,me,qe,oe.width,oe.height)}for(let oe=0;oe<6;oe++)if(Le){H?re&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+oe,0,0,0,xe[oe].width,xe[oe].height,Ie,Be,xe[oe].data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+oe,0,qe,xe[oe].width,xe[oe].height,0,Ie,Be,xe[oe].data);for(let Ne=0;Ne<Se.length;Ne++){const Tt=Se[Ne].image[oe].image;H?re&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+oe,Ne+1,0,0,Tt.width,Tt.height,Ie,Be,Tt.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+oe,Ne+1,qe,Tt.width,Tt.height,0,Ie,Be,Tt.data)}}else{H?re&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+oe,0,0,0,Ie,Be,xe[oe]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+oe,0,qe,Ie,Be,xe[oe]);for(let Ne=0;Ne<Se.length;Ne++){const Pe=Se[Ne];H?re&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+oe,Ne+1,0,0,Ie,Be,Pe.image[oe]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+oe,Ne+1,qe,Ie,Be,Pe.image[oe])}}}m(y)&&M(n.TEXTURE_CUBE_MAP),le.__version=Z.version,y.onUpdate&&y.onUpdate(y)}I.__version=y.version}function ae(I,y,B,K,Z,le){const ue=s.convert(B.format,B.colorSpace),j=s.convert(B.type),ie=S(B.internalFormat,ue,j,B.normalized,B.colorSpace),de=i.get(y),Le=i.get(B);if(Le.__renderTarget=y,!de.__hasExternalTextures){const xe=Math.max(1,y.width>>le),fe=Math.max(1,y.height>>le);Z===n.TEXTURE_3D||Z===n.TEXTURE_2D_ARRAY?t.texImage3D(Z,le,ie,xe,fe,y.depth,0,ue,j,null):t.texImage2D(Z,le,ie,xe,fe,0,ue,j,null)}t.bindFramebuffer(n.FRAMEBUFFER,I),Et(y)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,K,Z,Le.__webglTexture,0,_t(y)):(Z===n.TEXTURE_2D||Z>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&Z<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,K,Z,Le.__webglTexture,le),t.bindFramebuffer(n.FRAMEBUFFER,null)}function Ee(I,y,B){if(n.bindRenderbuffer(n.RENDERBUFFER,I),y.depthBuffer){const K=y.depthTexture,Z=K&&K.isDepthTexture?K.type:null,le=w(y.stencilBuffer,Z),ue=y.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;Et(y)?o.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,_t(y),le,y.width,y.height):B?n.renderbufferStorageMultisample(n.RENDERBUFFER,_t(y),le,y.width,y.height):n.renderbufferStorage(n.RENDERBUFFER,le,y.width,y.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,ue,n.RENDERBUFFER,I)}else{const K=y.textures;for(let Z=0;Z<K.length;Z++){const le=K[Z],ue=s.convert(le.format,le.colorSpace),j=s.convert(le.type),ie=S(le.internalFormat,ue,j,le.normalized,le.colorSpace);Et(y)?o.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,_t(y),ie,y.width,y.height):B?n.renderbufferStorageMultisample(n.RENDERBUFFER,_t(y),ie,y.width,y.height):n.renderbufferStorage(n.RENDERBUFFER,ie,y.width,y.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function Je(I,y,B){const K=y.isWebGLCubeRenderTarget===!0;if(t.bindFramebuffer(n.FRAMEBUFFER,I),!(y.depthTexture&&y.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");const Z=i.get(y.depthTexture);if(Z.__renderTarget=y,(!Z.__webglTexture||y.depthTexture.image.width!==y.width||y.depthTexture.image.height!==y.height)&&(y.depthTexture.image.width=y.width,y.depthTexture.image.height=y.height,y.depthTexture.needsUpdate=!0),K){if(Z.__webglInit===void 0&&(Z.__webglInit=!0,y.depthTexture.addEventListener("dispose",L)),Z.__webglTexture===void 0){Z.__webglTexture=n.createTexture(),t.bindTexture(n.TEXTURE_CUBE_MAP,Z.__webglTexture),Ue(n.TEXTURE_CUBE_MAP,y.depthTexture);const de=s.convert(y.depthTexture.format),Le=s.convert(y.depthTexture.type);let xe;y.depthTexture.format===_i?xe=n.DEPTH_COMPONENT24:y.depthTexture.format===Zi&&(xe=n.DEPTH24_STENCIL8);for(let fe=0;fe<6;fe++)n.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+fe,0,xe,y.width,y.height,0,de,Le,null)}}else Q(y.depthTexture,0);const le=Z.__webglTexture,ue=_t(y),j=K?n.TEXTURE_CUBE_MAP_POSITIVE_X+B:n.TEXTURE_2D,ie=y.depthTexture.format===Zi?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;if(y.depthTexture.format===_i)Et(y)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,ie,j,le,0,ue):n.framebufferTexture2D(n.FRAMEBUFFER,ie,j,le,0);else if(y.depthTexture.format===Zi)Et(y)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,ie,j,le,0,ue):n.framebufferTexture2D(n.FRAMEBUFFER,ie,j,le,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function Ce(I){const y=i.get(I),B=I.isWebGLCubeRenderTarget===!0;if(y.__boundDepthTexture!==I.depthTexture){const K=I.depthTexture;if(y.__depthDisposeCallback&&y.__depthDisposeCallback(),K){const Z=()=>{delete y.__boundDepthTexture,delete y.__depthDisposeCallback,K.removeEventListener("dispose",Z)};K.addEventListener("dispose",Z),y.__depthDisposeCallback=Z}y.__boundDepthTexture=K}if(I.depthTexture&&!y.__autoAllocateDepthBuffer)if(B)for(let K=0;K<6;K++)Je(y.__webglFramebuffer[K],I,K);else{const K=I.texture.mipmaps;K&&K.length>0?Je(y.__webglFramebuffer[0],I,0):Je(y.__webglFramebuffer,I,0)}else if(B){y.__webglDepthbuffer=[];for(let K=0;K<6;K++)if(t.bindFramebuffer(n.FRAMEBUFFER,y.__webglFramebuffer[K]),y.__webglDepthbuffer[K]===void 0)y.__webglDepthbuffer[K]=n.createRenderbuffer(),Ee(y.__webglDepthbuffer[K],I,!1);else{const Z=I.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,le=y.__webglDepthbuffer[K];n.bindRenderbuffer(n.RENDERBUFFER,le),n.framebufferRenderbuffer(n.FRAMEBUFFER,Z,n.RENDERBUFFER,le)}}else{const K=I.texture.mipmaps;if(K&&K.length>0?t.bindFramebuffer(n.FRAMEBUFFER,y.__webglFramebuffer[0]):t.bindFramebuffer(n.FRAMEBUFFER,y.__webglFramebuffer),y.__webglDepthbuffer===void 0)y.__webglDepthbuffer=n.createRenderbuffer(),Ee(y.__webglDepthbuffer,I,!1);else{const Z=I.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,le=y.__webglDepthbuffer;n.bindRenderbuffer(n.RENDERBUFFER,le),n.framebufferRenderbuffer(n.FRAMEBUFFER,Z,n.RENDERBUFFER,le)}}t.bindFramebuffer(n.FRAMEBUFFER,null)}function Oe(I,y,B){const K=i.get(I);y!==void 0&&ae(K.__webglFramebuffer,I,I.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),B!==void 0&&Ce(I)}function Ke(I){const y=I.texture,B=i.get(I),K=i.get(y);I.addEventListener("dispose",b);const Z=I.textures,le=I.isWebGLCubeRenderTarget===!0,ue=Z.length>1;if(ue||(K.__webglTexture===void 0&&(K.__webglTexture=n.createTexture()),K.__version=y.version,a.memory.textures++),le){B.__webglFramebuffer=[];for(let j=0;j<6;j++)if(y.mipmaps&&y.mipmaps.length>0){B.__webglFramebuffer[j]=[];for(let ie=0;ie<y.mipmaps.length;ie++)B.__webglFramebuffer[j][ie]=n.createFramebuffer()}else B.__webglFramebuffer[j]=n.createFramebuffer()}else{if(y.mipmaps&&y.mipmaps.length>0){B.__webglFramebuffer=[];for(let j=0;j<y.mipmaps.length;j++)B.__webglFramebuffer[j]=n.createFramebuffer()}else B.__webglFramebuffer=n.createFramebuffer();if(ue)for(let j=0,ie=Z.length;j<ie;j++){const de=i.get(Z[j]);de.__webglTexture===void 0&&(de.__webglTexture=n.createTexture(),a.memory.textures++)}if(I.samples>0&&Et(I)===!1){B.__webglMultisampledFramebuffer=n.createFramebuffer(),B.__webglColorRenderbuffer=[],t.bindFramebuffer(n.FRAMEBUFFER,B.__webglMultisampledFramebuffer);for(let j=0;j<Z.length;j++){const ie=Z[j];B.__webglColorRenderbuffer[j]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,B.__webglColorRenderbuffer[j]);const de=s.convert(ie.format,ie.colorSpace),Le=s.convert(ie.type),xe=S(ie.internalFormat,de,Le,ie.normalized,ie.colorSpace,I.isXRRenderTarget===!0),fe=_t(I);n.renderbufferStorageMultisample(n.RENDERBUFFER,fe,xe,I.width,I.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+j,n.RENDERBUFFER,B.__webglColorRenderbuffer[j])}n.bindRenderbuffer(n.RENDERBUFFER,null),I.depthBuffer&&(B.__webglDepthRenderbuffer=n.createRenderbuffer(),Ee(B.__webglDepthRenderbuffer,I,!0)),t.bindFramebuffer(n.FRAMEBUFFER,null)}}if(le){t.bindTexture(n.TEXTURE_CUBE_MAP,K.__webglTexture),Ue(n.TEXTURE_CUBE_MAP,y);for(let j=0;j<6;j++)if(y.mipmaps&&y.mipmaps.length>0)for(let ie=0;ie<y.mipmaps.length;ie++)ae(B.__webglFramebuffer[j][ie],I,y,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+j,ie);else ae(B.__webglFramebuffer[j],I,y,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+j,0);m(y)&&M(n.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(ue){for(let j=0,ie=Z.length;j<ie;j++){const de=Z[j],Le=i.get(de);let xe=n.TEXTURE_2D;(I.isWebGL3DRenderTarget||I.isWebGLArrayRenderTarget)&&(xe=I.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(xe,Le.__webglTexture),Ue(xe,de),ae(B.__webglFramebuffer,I,de,n.COLOR_ATTACHMENT0+j,xe,0),m(de)&&M(xe)}t.unbindTexture()}else{let j=n.TEXTURE_2D;if((I.isWebGL3DRenderTarget||I.isWebGLArrayRenderTarget)&&(j=I.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(j,K.__webglTexture),Ue(j,y),y.mipmaps&&y.mipmaps.length>0)for(let ie=0;ie<y.mipmaps.length;ie++)ae(B.__webglFramebuffer[ie],I,y,n.COLOR_ATTACHMENT0,j,ie);else ae(B.__webglFramebuffer,I,y,n.COLOR_ATTACHMENT0,j,0);m(y)&&M(j),t.unbindTexture()}I.depthBuffer&&Ce(I)}function Ye(I){const y=I.textures;for(let B=0,K=y.length;B<K;B++){const Z=y[B];if(m(Z)){const le=_(I),ue=i.get(Z).__webglTexture;t.bindTexture(le,ue),M(le),t.unbindTexture()}}}const wt=[],Ot=[];function Qt(I){if(I.samples>0){if(Et(I)===!1){const y=I.textures,B=I.width,K=I.height;let Z=n.COLOR_BUFFER_BIT;const le=I.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,ue=i.get(I),j=y.length>1;if(j)for(let de=0;de<y.length;de++)t.bindFramebuffer(n.FRAMEBUFFER,ue.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+de,n.RENDERBUFFER,null),t.bindFramebuffer(n.FRAMEBUFFER,ue.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+de,n.TEXTURE_2D,null,0);t.bindFramebuffer(n.READ_FRAMEBUFFER,ue.__webglMultisampledFramebuffer);const ie=I.texture.mipmaps;ie&&ie.length>0?t.bindFramebuffer(n.DRAW_FRAMEBUFFER,ue.__webglFramebuffer[0]):t.bindFramebuffer(n.DRAW_FRAMEBUFFER,ue.__webglFramebuffer);for(let de=0;de<y.length;de++){if(I.resolveDepthBuffer&&(I.depthBuffer&&(Z|=n.DEPTH_BUFFER_BIT),I.stencilBuffer&&I.resolveStencilBuffer&&(Z|=n.STENCIL_BUFFER_BIT)),j){n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,ue.__webglColorRenderbuffer[de]);const Le=i.get(y[de]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,Le,0)}n.blitFramebuffer(0,0,B,K,0,0,B,K,Z,n.NEAREST),c===!0&&(wt.length=0,Ot.length=0,wt.push(n.COLOR_ATTACHMENT0+de),I.depthBuffer&&I.storeMultisampledDepthBuffer===!1&&(wt.push(le),Ot.push(le),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,Ot)),n.invalidateFramebuffer(n.READ_FRAMEBUFFER,wt))}if(t.bindFramebuffer(n.READ_FRAMEBUFFER,null),t.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),j)for(let de=0;de<y.length;de++){t.bindFramebuffer(n.FRAMEBUFFER,ue.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+de,n.RENDERBUFFER,ue.__webglColorRenderbuffer[de]);const Le=i.get(y[de]).__webglTexture;t.bindFramebuffer(n.FRAMEBUFFER,ue.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+de,n.TEXTURE_2D,Le,0)}t.bindFramebuffer(n.DRAW_FRAMEBUFFER,ue.__webglMultisampledFramebuffer)}else if(I.depthBuffer&&I.storeMultisampledDepthBuffer===!1&&c){const y=I.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[y])}}}function _t(I){return Math.min(r.maxSamples,I.samples)}function Et(I){const y=i.get(I);return I.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&y.__useRenderToTexture!==!1}function G(I){const y=a.render.frame;u.get(I)!==y&&(u.set(I,y),I.update())}function Qe(I,y){const B=I.colorSpace,K=I.format,Z=I.type;return I.isCompressedTexture===!0||I.isVideoTexture===!0||B!==ps&&B!==Wn&&(it.getTransfer(B)===vt?(K!==En||Z!==wn)&&Ge("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):lt("WebGLTextures: Unsupported texture color space:",B)),y}function ze(I){return typeof HTMLImageElement<"u"&&I instanceof HTMLImageElement?(l.width=I.naturalWidth||I.width,l.height=I.naturalHeight||I.height):typeof VideoFrame<"u"&&I instanceof VideoFrame?(l.width=I.displayWidth,l.height=I.displayHeight):(l.width=I.width,l.height=I.height),l}this.allocateTextureUnit=z,this.resetTextureUnits=U,this.getTextureUnits=D,this.setTextureUnits=O,this.setTexture2D=Q,this.setTexture2DArray=Y,this.setTexture3D=te,this.setTextureCube=F,this.rebindTextures=Oe,this.setupRenderTarget=Ke,this.updateRenderTargetMipmap=Ye,this.updateMultisampleRenderTarget=Qt,this.setupDepthRenderbuffer=Ce,this.setupFrameBufferTexture=ae,this.useMultisampledRTT=Et,this.isReversedDepthBuffer=function(){return t.buffers.depth.getReversed()}}function vM(n,e){function t(i,r=Wn){let s;const a=it.getTransfer(r);if(i===wn)return n.UNSIGNED_BYTE;if(i===Kl)return n.UNSIGNED_SHORT_4_4_4_4;if(i===ql)return n.UNSIGNED_SHORT_5_5_5_1;if(i===wu)return n.UNSIGNED_INT_5_9_9_9_REV;if(i===Eu)return n.UNSIGNED_INT_10F_11F_11F_REV;if(i===bu)return n.BYTE;if(i===yu)return n.SHORT;if(i===ds)return n.UNSIGNED_SHORT;if(i===Yl)return n.INT;if(i===ai)return n.UNSIGNED_INT;if(i===ni)return n.FLOAT;if(i===oi)return n.HALF_FLOAT;if(i===Au)return n.ALPHA;if(i===Tu)return n.RGB;if(i===En)return n.RGBA;if(i===_i)return n.DEPTH_COMPONENT;if(i===Zi)return n.DEPTH_STENCIL;if(i===Ru)return n.RED;if(i===$l)return n.RED_INTEGER;if(i===nr)return n.RG;if(i===Zl)return n.RG_INTEGER;if(i===Jl)return n.RGBA_INTEGER;if(i===oa||i===la||i===ca||i===ha)if(a===vt)if(s=e.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(i===oa)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===la)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===ca)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===ha)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=e.get("WEBGL_compressed_texture_s3tc"),s!==null){if(i===oa)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===la)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===ca)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===ha)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===$o||i===Zo||i===Jo||i===Qo)if(s=e.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(i===$o)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===Zo)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===Jo)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===Qo)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===jo||i===el||i===tl||i===nl||i===il||i===xa||i===rl)if(s=e.get("WEBGL_compressed_texture_etc"),s!==null){if(i===jo||i===el)return a===vt?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(i===tl)return a===vt?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC;if(i===nl)return s.COMPRESSED_R11_EAC;if(i===il)return s.COMPRESSED_SIGNED_R11_EAC;if(i===xa)return s.COMPRESSED_RG11_EAC;if(i===rl)return s.COMPRESSED_SIGNED_RG11_EAC}else return null;if(i===sl||i===al||i===ol||i===ll||i===cl||i===hl||i===ul||i===dl||i===fl||i===pl||i===ml||i===gl||i===xl||i===vl)if(s=e.get("WEBGL_compressed_texture_astc"),s!==null){if(i===sl)return a===vt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===al)return a===vt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===ol)return a===vt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===ll)return a===vt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===cl)return a===vt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===hl)return a===vt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===ul)return a===vt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===dl)return a===vt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===fl)return a===vt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===pl)return a===vt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===ml)return a===vt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===gl)return a===vt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===xl)return a===vt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===vl)return a===vt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===Ml||i===_l||i===Sl)if(s=e.get("EXT_texture_compression_bptc"),s!==null){if(i===Ml)return a===vt?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===_l)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===Sl)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===bl||i===yl||i===va||i===wl)if(s=e.get("EXT_texture_compression_rgtc"),s!==null){if(i===bl)return s.COMPRESSED_RED_RGTC1_EXT;if(i===yl)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===va)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===wl)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===fs?n.UNSIGNED_INT_24_8:n[i]!==void 0?n[i]:null}return{convert:t}}const MM=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,_M=`
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

}`;class SM{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){const i=new Bu(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=i}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,i=new yt({vertexShader:MM,fragmentShader:_M,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new qt(new Ln(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class bM extends rr{constructor(e,t){super();const i=this;let r=null,s=1,a=null,o="local-floor",c=1,l=null,u=null,f=null,d=null,p=null,g=null;const v=typeof XRWebGLBinding<"u",x=new SM,m={},M=t.getContextAttributes();let _=null,S=null;const w=[],E=[],L=new We;let b=null,A=null;const P=new yn;P.viewport=new st;const C=new yn;C.viewport=new st;const N=[P,C],U=new Lg;let D=null,O=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(ee){let se=w[ee];return se===void 0&&(se=new ao,w[ee]=se),se.getTargetRaySpace()},this.getControllerGrip=function(ee){let se=w[ee];return se===void 0&&(se=new ao,w[ee]=se),se.getGripSpace()},this.getHand=function(ee){let se=w[ee];return se===void 0&&(se=new ao,w[ee]=se),se.getHandSpace()};function z(ee){const se=E.indexOf(ee.inputSource);if(se===-1)return;const X=w[se];X!==void 0&&(X.update(ee.inputSource,ee.frame,l||a),X.dispatchEvent({type:ee.type,data:ee.inputSource}))}function V(){r.removeEventListener("select",z),r.removeEventListener("selectstart",z),r.removeEventListener("selectend",z),r.removeEventListener("squeeze",z),r.removeEventListener("squeezestart",z),r.removeEventListener("squeezeend",z),r.removeEventListener("end",V),r.removeEventListener("inputsourceschange",Q);for(let ee=0;ee<w.length;ee++){const se=E[ee];se!==null&&(E[ee]=null,w[ee].disconnect(se))}D=null,O=null,x.reset();for(const ee in m)delete m[ee];if(e.setRenderTarget(_),p=null,d=null,f=null,r=null,S=null,ke.stop(),i.isPresenting=!1,e.setPixelRatio(b),e.setSize(L.width,L.height,!1),A!==null){const ee=A.camera;ee.fov=A.fov,ee.zoom=A.zoom,ee.updateProjectionMatrix(),A=null}i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(ee){s=ee,i.isPresenting===!0&&Ge("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(ee){o=ee,i.isPresenting===!0&&Ge("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||a},this.setReferenceSpace=function(ee){l=ee},this.getBaseLayer=function(){return d!==null?d:p},this.getBinding=function(){return f===null&&v&&(f=new XRWebGLBinding(r,t)),f},this.getFrame=function(){return g},this.getSession=function(){return r},this.setSession=async function(ee){if(r=ee,r!==null){if(_=e.getRenderTarget(),r.addEventListener("select",z),r.addEventListener("selectstart",z),r.addEventListener("selectend",z),r.addEventListener("squeeze",z),r.addEventListener("squeezestart",z),r.addEventListener("squeezeend",z),r.addEventListener("end",V),r.addEventListener("inputsourceschange",Q),M.xrCompatible!==!0&&await t.makeXRCompatible(),b=e.getPixelRatio(),e.getSize(L),v&&"createProjectionLayer"in XRWebGLBinding.prototype){let X=null,he=null,ae=null;M.depth&&(ae=M.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,X=M.stencil?Zi:_i,he=M.stencil?fs:ai);const Ee={colorFormat:t.RGBA8,depthFormat:ae,scaleFactor:s};f=this.getBinding(),d=f.createProjectionLayer(Ee),r.updateRenderState({layers:[d]}),e.setPixelRatio(1),e.setSize(d.textureWidth,d.textureHeight,!1),S=new Un(d.textureWidth,d.textureHeight,{format:En,type:wn,depthTexture:new zr(d.textureWidth,d.textureHeight,he,void 0,void 0,void 0,void 0,void 0,void 0,X),stencilBuffer:M.stencil,colorSpace:e.outputColorSpace,samples:M.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1,storeMultisampledDepthBuffer:d.ignoreDepthValues===!1,storeMultisampledStencilBuffer:d.ignoreDepthValues===!1})}else{const X={antialias:M.antialias,alpha:!0,depth:M.depth,stencil:M.stencil,framebufferScaleFactor:s};p=new XRWebGLLayer(r,t,X),r.updateRenderState({baseLayer:p}),e.setPixelRatio(1),e.setSize(p.framebufferWidth,p.framebufferHeight,!1),S=new Un(p.framebufferWidth,p.framebufferHeight,{format:En,type:wn,colorSpace:e.outputColorSpace,stencilBuffer:M.stencil,resolveDepthBuffer:p.ignoreDepthValues===!1,resolveStencilBuffer:p.ignoreDepthValues===!1,storeMultisampledDepthBuffer:p.ignoreDepthValues===!1,storeMultisampledStencilBuffer:p.ignoreDepthValues===!1})}S.isXRRenderTarget=!0,this.setFoveation(c),l=null,a=await r.requestReferenceSpace(o),ke.setContext(r),ke.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return x.getDepthTexture()};function Q(ee){for(let se=0;se<ee.removed.length;se++){const X=ee.removed[se],he=E.indexOf(X);he>=0&&(E[he]=null,w[he].disconnect(X))}for(let se=0;se<ee.added.length;se++){const X=ee.added[se];let he=E.indexOf(X);if(he===-1){for(let Ee=0;Ee<w.length;Ee++)if(Ee>=E.length){E.push(X),he=Ee;break}else if(E[Ee]===null){E[Ee]=X,he=Ee;break}if(he===-1)break}const ae=w[he];ae&&ae.connect(X)}}const Y=new W,te=new W;function F(ee,se,X){Y.setFromMatrixPosition(se.matrixWorld),te.setFromMatrixPosition(X.matrixWorld);const he=Y.distanceTo(te),ae=se.projectionMatrix.elements,Ee=X.projectionMatrix.elements,Je=ae[14]/(ae[10]-1),Ce=ae[14]/(ae[10]+1),Oe=(ae[9]+1)/ae[5],Ke=(ae[9]-1)/ae[5],Ye=(ae[8]-1)/ae[0],wt=(Ee[8]+1)/Ee[0],Ot=Je*Ye,Qt=Je*wt,_t=he/(-Ye+wt),Et=_t*-Ye;if(se.matrixWorld.decompose(ee.position,ee.quaternion,ee.scale),ee.translateX(Et),ee.translateZ(_t),ee.matrixWorld.compose(ee.position,ee.quaternion,ee.scale),ee.matrixWorldInverse.copy(ee.matrixWorld).invert(),ae[10]===-1)ee.projectionMatrix.copy(se.projectionMatrix),ee.projectionMatrixInverse.copy(se.projectionMatrixInverse);else{const G=Je+_t,Qe=Ce+_t,ze=Ot-Et,I=Qt+(he-Et),y=Oe*Ce/Qe*G,B=Ke*Ce/Qe*G;ee.projectionMatrix.makePerspective(ze,I,y,B,G,Qe),ee.projectionMatrixInverse.copy(ee.projectionMatrix).invert()}}function ne(ee,se){se===null?ee.matrixWorld.copy(ee.matrix):ee.matrixWorld.multiplyMatrices(se.matrixWorld,ee.matrix),ee.matrixWorldInverse.copy(ee.matrixWorld).invert()}this.updateCamera=function(ee){if(r===null)return;let se=ee.near,X=ee.far;x.texture!==null&&(x.depthNear>0&&(se=x.depthNear),x.depthFar>0&&(X=x.depthFar)),U.near=C.near=P.near=se,U.far=C.far=P.far=X,(D!==U.near||O!==U.far)&&(r.updateRenderState({depthNear:U.near,depthFar:U.far}),D=U.near,O=U.far),U.layers.mask=ee.layers.mask|6,P.layers.mask=U.layers.mask&-5,C.layers.mask=U.layers.mask&-3;const he=ee.parent,ae=U.cameras;ne(U,he);for(let Ee=0;Ee<ae.length;Ee++)ne(ae[Ee],he);ae.length===2?F(U,P,C):U.projectionMatrix.copy(P.projectionMatrix),A===null&&ee.isPerspectiveCamera&&(A={camera:ee,fov:ee.fov,zoom:ee.zoom}),ce(ee,U,he)};function ce(ee,se,X){X===null?ee.matrix.copy(se.matrixWorld):(ee.matrix.copy(X.matrixWorld),ee.matrix.invert(),ee.matrix.multiply(se.matrixWorld)),ee.matrix.decompose(ee.position,ee.quaternion,ee.scale),ee.updateMatrixWorld(!0),ee.projectionMatrix.copy(se.projectionMatrix),ee.projectionMatrixInverse.copy(se.projectionMatrixInverse),ee.isPerspectiveCamera&&(ee.fov=El*2*Math.atan(1/ee.projectionMatrix.elements[5]),ee.zoom=1)}this.getCamera=function(){return U},this.getFoveation=function(){if(!(d===null&&p===null))return c},this.setFoveation=function(ee){c=ee,d!==null&&(d.fixedFoveation=ee),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=ee)},this.hasDepthSensing=function(){return x.texture!==null},this.getDepthSensingMesh=function(){return x.getMesh(U)},this.getCameraTexture=function(ee){return m[ee]};let be=null;function Ue(ee,se){if(u=se.getViewerPose(l||a),g=se,u!==null){const X=u.views;p!==null&&(e.setRenderTargetFramebuffer(S,p.framebuffer),e.setRenderTarget(S));let he=!1;X.length!==U.cameras.length&&(U.cameras.length=0,he=!0);for(let Ce=0;Ce<X.length;Ce++){const Oe=X[Ce];let Ke=null;if(p!==null)Ke=p.getViewport(Oe);else{const wt=f.getViewSubImage(d,Oe);Ke=wt.viewport,Ce===0&&(e.setRenderTargetTextures(S,wt.colorTexture,wt.depthStencilTexture),e.setRenderTarget(S))}let Ye=N[Ce];Ye===void 0&&(Ye=new yn,Ye.layers.enable(Ce),Ye.viewport=new st,N[Ce]=Ye),Ye.matrix.fromArray(Oe.transform.matrix),Ye.matrix.decompose(Ye.position,Ye.quaternion,Ye.scale),Ye.projectionMatrix.fromArray(Oe.projectionMatrix),Ye.projectionMatrixInverse.copy(Ye.projectionMatrix).invert(),Ye.viewport.set(Ke.x,Ke.y,Ke.width,Ke.height),Ce===0&&(U.matrix.copy(Ye.matrix),U.matrix.decompose(U.position,U.quaternion,U.scale)),he===!0&&U.cameras.push(Ye)}const ae=r.enabledFeatures;if(ae&&ae.includes("depth-sensing")&&r.depthUsage=="gpu-optimized"&&v){f=i.getBinding();const Ce=f.getDepthInformation(X[0]);Ce&&Ce.isValid&&Ce.texture&&x.init(Ce,r.renderState)}if(ae&&ae.includes("camera-access")&&v){e.state.unbindTexture(),f=i.getBinding();for(let Ce=0;Ce<X.length;Ce++){const Oe=X[Ce].camera;if(Oe){let Ke=m[Oe];Ke||(Ke=new Bu,m[Oe]=Ke);const Ye=f.getCameraImage(Oe);Ke.sourceTexture=Ye}}}}for(let X=0;X<w.length;X++){const he=E[X],ae=w[X];he!==null&&ae!==void 0&&ae.update(he,se,l||a)}be&&be(ee,se),se.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:se}),g=null}const ke=new Hu;ke.setAnimationLoop(Ue),this.setAnimationLoop=function(ee){be=ee},this.dispose=function(){}}}const yM=new Ut,$u=new Ve;$u.set(-1,0,0,0,1,0,0,0,1);function wM(n,e){function t(x,m){x.matrixAutoUpdate===!0&&x.updateMatrix(),m.value.copy(x.matrix)}function i(x,m){m.color.getRGB(x.fogColor.value,zu(n)),m.isFog?(x.fogNear.value=m.near,x.fogFar.value=m.far):m.isFogExp2&&(x.fogDensity.value=m.density)}function r(x,m,M,_,S){m.isNodeMaterial?m.uniformsNeedUpdate=!1:m.isMeshBasicMaterial?s(x,m):m.isMeshLambertMaterial?(s(x,m),m.envMap&&(x.envMapIntensity.value=m.envMapIntensity)):m.isMeshToonMaterial?(s(x,m),f(x,m)):m.isMeshPhongMaterial?(s(x,m),u(x,m),m.envMap&&(x.envMapIntensity.value=m.envMapIntensity)):m.isMeshStandardMaterial?(s(x,m),d(x,m),m.isMeshPhysicalMaterial&&p(x,m,S)):m.isMeshMatcapMaterial?(s(x,m),g(x,m)):m.isMeshDepthMaterial?s(x,m):m.isMeshDistanceMaterial?(s(x,m),v(x,m)):m.isMeshNormalMaterial?s(x,m):m.isLineBasicMaterial?(a(x,m),m.isLineDashedMaterial&&o(x,m)):m.isPointsMaterial?c(x,m,M,_):m.isSpriteMaterial?l(x,m):m.isShadowMaterial?(x.color.value.copy(m.color),x.opacity.value=m.opacity):m.isShaderMaterial&&(m.uniformsNeedUpdate=!1)}function s(x,m){x.opacity.value=m.opacity,m.color&&x.diffuse.value.copy(m.color),m.emissive&&x.emissive.value.copy(m.emissive).multiplyScalar(m.emissiveIntensity),m.map&&(x.map.value=m.map,t(m.map,x.mapTransform)),m.alphaMap&&(x.alphaMap.value=m.alphaMap,t(m.alphaMap,x.alphaMapTransform)),m.bumpMap&&(x.bumpMap.value=m.bumpMap,t(m.bumpMap,x.bumpMapTransform),x.bumpScale.value=m.bumpScale,m.side===xn&&(x.bumpScale.value*=-1)),m.normalMap&&(x.normalMap.value=m.normalMap,t(m.normalMap,x.normalMapTransform),x.normalScale.value.copy(m.normalScale),m.side===xn&&x.normalScale.value.negate()),m.displacementMap&&(x.displacementMap.value=m.displacementMap,t(m.displacementMap,x.displacementMapTransform),x.displacementScale.value=m.displacementScale,x.displacementBias.value=m.displacementBias),m.emissiveMap&&(x.emissiveMap.value=m.emissiveMap,t(m.emissiveMap,x.emissiveMapTransform)),m.specularMap&&(x.specularMap.value=m.specularMap,t(m.specularMap,x.specularMapTransform)),m.alphaTest>0&&(x.alphaTest.value=m.alphaTest);const M=e.get(m),_=M.envMap,S=M.envMapRotation;_&&(x.envMap.value=_,x.envMapRotation.value.setFromMatrix4(yM.makeRotationFromEuler(S)).transpose(),_.isCubeTexture&&_.isRenderTargetTexture===!1&&x.envMapRotation.value.premultiply($u),x.reflectivity.value=m.reflectivity,x.ior.value=m.ior,x.refractionRatio.value=m.refractionRatio),m.lightMap&&(x.lightMap.value=m.lightMap,x.lightMapIntensity.value=m.lightMapIntensity,t(m.lightMap,x.lightMapTransform)),m.aoMap&&(x.aoMap.value=m.aoMap,x.aoMapIntensity.value=m.aoMapIntensity,t(m.aoMap,x.aoMapTransform))}function a(x,m){x.diffuse.value.copy(m.color),x.opacity.value=m.opacity,m.map&&(x.map.value=m.map,t(m.map,x.mapTransform))}function o(x,m){x.dashSize.value=m.dashSize,x.totalSize.value=m.dashSize+m.gapSize,x.scale.value=m.scale}function c(x,m,M,_){x.diffuse.value.copy(m.color),x.opacity.value=m.opacity,x.size.value=m.size*M,x.scale.value=_*.5,m.map&&(x.map.value=m.map,t(m.map,x.uvTransform)),m.alphaMap&&(x.alphaMap.value=m.alphaMap,t(m.alphaMap,x.alphaMapTransform)),m.alphaTest>0&&(x.alphaTest.value=m.alphaTest)}function l(x,m){x.diffuse.value.copy(m.color),x.opacity.value=m.opacity,x.rotation.value=m.rotation,m.map&&(x.map.value=m.map,t(m.map,x.mapTransform)),m.alphaMap&&(x.alphaMap.value=m.alphaMap,t(m.alphaMap,x.alphaMapTransform)),m.alphaTest>0&&(x.alphaTest.value=m.alphaTest)}function u(x,m){x.specular.value.copy(m.specular),x.shininess.value=Math.max(m.shininess,1e-4)}function f(x,m){m.gradientMap&&(x.gradientMap.value=m.gradientMap)}function d(x,m){x.metalness.value=m.metalness,m.metalnessMap&&(x.metalnessMap.value=m.metalnessMap,t(m.metalnessMap,x.metalnessMapTransform)),x.roughness.value=m.roughness,m.roughnessMap&&(x.roughnessMap.value=m.roughnessMap,t(m.roughnessMap,x.roughnessMapTransform)),m.envMap&&(x.envMapIntensity.value=m.envMapIntensity)}function p(x,m,M){x.ior.value=m.ior,m.sheen>0&&(x.sheenColor.value.copy(m.sheenColor).multiplyScalar(m.sheen),x.sheenRoughness.value=m.sheenRoughness,m.sheenColorMap&&(x.sheenColorMap.value=m.sheenColorMap,t(m.sheenColorMap,x.sheenColorMapTransform)),m.sheenRoughnessMap&&(x.sheenRoughnessMap.value=m.sheenRoughnessMap,t(m.sheenRoughnessMap,x.sheenRoughnessMapTransform))),m.clearcoat>0&&(x.clearcoat.value=m.clearcoat,x.clearcoatRoughness.value=m.clearcoatRoughness,m.clearcoatMap&&(x.clearcoatMap.value=m.clearcoatMap,t(m.clearcoatMap,x.clearcoatMapTransform)),m.clearcoatRoughnessMap&&(x.clearcoatRoughnessMap.value=m.clearcoatRoughnessMap,t(m.clearcoatRoughnessMap,x.clearcoatRoughnessMapTransform)),m.clearcoatNormalMap&&(x.clearcoatNormalMap.value=m.clearcoatNormalMap,t(m.clearcoatNormalMap,x.clearcoatNormalMapTransform),x.clearcoatNormalScale.value.copy(m.clearcoatNormalScale),m.side===xn&&x.clearcoatNormalScale.value.negate())),m.dispersion>0&&(x.dispersion.value=m.dispersion),m.retroreflectivity>0&&(x.retroreflectivity.value=m.retroreflectivity),m.iridescence>0&&(x.iridescence.value=m.iridescence,x.iridescenceIOR.value=m.iridescenceIOR,x.iridescenceThicknessMinimum.value=m.iridescenceThicknessRange[0],x.iridescenceThicknessMaximum.value=m.iridescenceThicknessRange[1],m.iridescenceMap&&(x.iridescenceMap.value=m.iridescenceMap,t(m.iridescenceMap,x.iridescenceMapTransform)),m.iridescenceThicknessMap&&(x.iridescenceThicknessMap.value=m.iridescenceThicknessMap,t(m.iridescenceThicknessMap,x.iridescenceThicknessMapTransform))),m.transmission>0&&(x.transmission.value=m.transmission,x.transmissionSamplerMap.value=M.texture,x.transmissionSamplerSize.value.set(M.width,M.height),m.transmissionMap&&(x.transmissionMap.value=m.transmissionMap,t(m.transmissionMap,x.transmissionMapTransform)),x.thickness.value=m.thickness,m.thicknessMap&&(x.thicknessMap.value=m.thicknessMap,t(m.thicknessMap,x.thicknessMapTransform)),x.attenuationDistance.value=m.attenuationDistance,x.attenuationColor.value.copy(m.attenuationColor)),m.anisotropy>0&&(x.anisotropyVector.value.set(m.anisotropy*Math.cos(m.anisotropyRotation),m.anisotropy*Math.sin(m.anisotropyRotation)),m.anisotropyMap&&(x.anisotropyMap.value=m.anisotropyMap,t(m.anisotropyMap,x.anisotropyMapTransform))),x.specularIntensity.value=m.specularIntensity,x.specularColor.value.copy(m.specularColor),m.specularColorMap&&(x.specularColorMap.value=m.specularColorMap,t(m.specularColorMap,x.specularColorMapTransform)),m.specularIntensityMap&&(x.specularIntensityMap.value=m.specularIntensityMap,t(m.specularIntensityMap,x.specularIntensityMapTransform))}function g(x,m){m.matcap&&(x.matcap.value=m.matcap)}function v(x,m){const M=e.get(m).light;x.referencePosition.value.setFromMatrixPosition(M.matrixWorld),x.nearDistance.value=M.shadow.camera.near,x.farDistance.value=M.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:r}}function EM(n,e,t,i){let r={},s={},a=[];const o=n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS);function c(S,w){const E=w.program;i.uniformBlockBinding(S,E)}function l(S,w){let E=r[S.id];E===void 0&&(x(S),E=u(S),r[S.id]=E,S.addEventListener("dispose",M));const L=w.program;i.updateUBOMapping(S,L);const b=e.render.frame;s[S.id]!==b&&(d(S),s[S.id]=b)}function u(S){const w=f();S.__bindingPointIndex=w;const E=n.createBuffer(),L=S.__size,b=S.usage;return n.bindBuffer(n.UNIFORM_BUFFER,E),n.bufferData(n.UNIFORM_BUFFER,L,b),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,w,E),E}function f(){for(let S=0;S<o;S++)if(a.indexOf(S)===-1)return a.push(S),S;return lt("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(S){const w=r[S.id],E=S.uniforms,L=S.__cache;n.bindBuffer(n.UNIFORM_BUFFER,w);for(let b=0,A=E.length;b<A;b++){const P=E[b];if(Array.isArray(P))for(let C=0,N=P.length;C<N;C++)p(P[C],b,C,L);else p(P,b,0,L)}n.bindBuffer(n.UNIFORM_BUFFER,null)}function p(S,w,E,L){if(v(S,w,E,L)===!0){const b=S.__offset,A=S.value;if(Array.isArray(A)){let P=0;for(let C=0;C<A.length;C++){const N=A[C],U=m(N);g(N,S.__data,P),typeof N!="number"&&typeof N!="boolean"&&!N.isMatrix3&&!ArrayBuffer.isView(N)&&(P+=U.storage/Float32Array.BYTES_PER_ELEMENT)}}else g(A,S.__data,0);n.bufferSubData(n.UNIFORM_BUFFER,b,S.__data)}}function g(S,w,E){typeof S=="number"||typeof S=="boolean"?w[0]=S:S.isMatrix3?(w[0]=S.elements[0],w[1]=S.elements[1],w[2]=S.elements[2],w[3]=0,w[4]=S.elements[3],w[5]=S.elements[4],w[6]=S.elements[5],w[7]=0,w[8]=S.elements[6],w[9]=S.elements[7],w[10]=S.elements[8],w[11]=0):ArrayBuffer.isView(S)?w.set(new S.constructor(S.buffer,S.byteOffset,w.length)):S.toArray(w,E)}function v(S,w,E,L){const b=S.value,A=w+"_"+E;if(L[A]===void 0)return typeof b=="number"||typeof b=="boolean"?L[A]=b:ArrayBuffer.isView(b)?L[A]=b.slice():L[A]=b.clone(),!0;{const P=L[A];if(typeof b=="number"||typeof b=="boolean"){if(P!==b)return L[A]=b,!0}else{if(ArrayBuffer.isView(b))return!0;if(P.equals(b)===!1)return P.copy(b),!0}}return!1}function x(S){const w=S.uniforms;let E=0;const L=16;for(let A=0,P=w.length;A<P;A++){const C=Array.isArray(w[A])?w[A]:[w[A]];for(let N=0,U=C.length;N<U;N++){const D=C[N],O=Array.isArray(D.value)?D.value:[D.value];for(let z=0,V=O.length;z<V;z++){const Q=O[z],Y=m(Q),te=E%L,F=te%Y.boundary,ne=te+F;E+=F,ne!==0&&L-ne<Y.storage&&(E+=L-ne),D.__data=new Float32Array(Y.storage/Float32Array.BYTES_PER_ELEMENT),D.__offset=E,E+=Y.storage}}}const b=E%L;return b>0&&(E+=L-b),S.__size=E,S.__cache={},this}function m(S){const w={boundary:0,storage:0};return typeof S=="number"||typeof S=="boolean"?(w.boundary=4,w.storage=4):S.isVector2?(w.boundary=8,w.storage=8):S.isVector3||S.isColor?(w.boundary=16,w.storage=12):S.isVector4?(w.boundary=16,w.storage=16):S.isMatrix3?(w.boundary=48,w.storage=48):S.isMatrix4?(w.boundary=64,w.storage=64):S.isTexture?Ge("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(S)?(w.boundary=16,w.storage=S.byteLength):Ge("WebGLRenderer: Unsupported uniform value type.",S),w}function M(S){const w=S.target;w.removeEventListener("dispose",M);const E=a.indexOf(w.__bindingPointIndex);a.splice(E,1),n.deleteBuffer(r[w.id]),delete r[w.id],delete s[w.id]}function _(){for(const S in r)n.deleteBuffer(r[S]);a=[],r={},s={}}return{bind:c,update:l,dispose:_}}const AM=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let Qn=null;function TM(){return Qn===null&&(Qn=new Ar(AM,16,16,nr,oi),Qn.name="DFG_LUT",Qn.minFilter=kt,Qn.magFilter=kt,Qn.wrapS=xi,Qn.wrapT=xi,Qn.generateMipmaps=!1,Qn.needsUpdate=!0),Qn}class RM{constructor(e={}){const{canvas:t=Km(),context:i=null,depth:r=!0,stencil:s=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:f=!1,reversedDepthBuffer:d=!1,outputBufferType:p=wn}=e;this.isWebGLRenderer=!0;let g;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");g=i.getContextAttributes().alpha}else g=a;const v=p,x=new Set([Jl,Zl,$l]),m=new Set([wn,ai,ds,fs,Kl,ql]),M=new Uint32Array(4),_=new Int32Array(4),S=new W;let w=null,E=null;const L=[],b=[];let A=null;this.domElement=t,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=si,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const P=this;let C=!1,N=null,U=null,D=null,O=null;this._outputColorSpace=In;let z=0,V=0,Q=null,Y=-1,te=null;const F=new st,ne=new st;let ce=null;const be=new tt(0);let Ue=0,ke=t.width,ee=t.height,se=1,X=null,he=null;const ae=new st(0,0,ke,ee),Ee=new st(0,0,ke,ee);let Je=!1;const Ce=new ba;let Oe=!1,Ke=!1;const Ye=new Ut,wt=new W,Ot=new st,Qt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let _t=!1;function Et(){return Q===null?se:1}let G=i;function Qe(R,k){return t.getContext(R,k)}let ze,I,y,B,K,Z,le,ue,j,ie,de,Le,xe,fe,Ie,Be,qe,H,pe,re,me,Se,oe;try{const R={alpha:!0,depth:r,stencil:s,antialias:o,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:u,failIfMajorPerformanceCaveat:f};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${Hl}`),t.addEventListener("webglcontextlost",Tt,!1),t.addEventListener("webglcontextrestored",dt,!1),t.addEventListener("webglcontextcreationerror",Fn,!1),G===null){const k="webgl2";if(G=Qe(k,R),G===null)throw Qe(k)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}Ne()}catch(R){throw t.removeEventListener("webglcontextlost",Tt,!1),t.removeEventListener("webglcontextrestored",dt,!1),t.removeEventListener("webglcontextcreationerror",Fn,!1),lt("WebGLRenderer: "+R.message),R}function Ne(){ze=new Tx(G),ze.init(),me=new vM(G,ze),I=new xx(G,ze,e,me),y=new gM(G,ze),I.reversedDepthBuffer&&d&&y.buffers.depth.setReversed(!0),U=G.createFramebuffer(),D=G.createFramebuffer(),O=G.createFramebuffer(),B=new Lx(G),K=new nM,Z=new xM(G,ze,y,K,I,me,B),le=new Ax(P),ue=new Dg(G),Se=new mx(G,ue),j=new Rx(G,ue,B,Se),ie=new Dx(G,j,ue,Se,B),H=new Px(G,I,Z),Ie=new vx(K),de=new tM(P,le,ze,I,Se,Ie),Le=new wM(P,K),xe=new rM,fe=new hM(ze),qe=new px(P,le,y,ie,g,c),Be=new mM(P,ie,I),oe=new EM(G,B,I,y),pe=new gx(G,ze,B),re=new Cx(G,ze,B),B.programs=de.programs,P.capabilities=I,P.extensions=ze,P.properties=K,P.renderLists=xe,P.shadowMap=Be,P.state=y,P.info=B}v!==wn&&(A=new Nx(v,t.width,t.height,o,r,s));const Pe=new bM(P,G);this.xr=Pe,this.getContext=function(){return G},this.getContextAttributes=function(){return G.getContextAttributes()},this.forceContextLoss=function(){const R=ze.get("WEBGL_lose_context");R&&R.loseContext()},this.forceContextRestore=function(){const R=ze.get("WEBGL_lose_context");R&&R.restoreContext()},this.getPixelRatio=function(){return se},this.setPixelRatio=function(R){R!==void 0&&(se=R,this.setSize(ke,ee,!1))},this.getSize=function(R){return R.set(ke,ee)},this.setSize=function(R,k,J=!0){if(Pe.isPresenting){Ge("WebGLRenderer: Can't change size while VR device is presenting.");return}ke=R,ee=k,t.width=Math.floor(R*se),t.height=Math.floor(k*se),J===!0&&(t.style.width=R+"px",t.style.height=k+"px"),A!==null&&A.setSize(t.width,t.height),this.setViewport(0,0,R,k)},this.getDrawingBufferSize=function(R){return R.set(ke*se,ee*se).floor()},this.setDrawingBufferSize=function(R,k,J){ke=R,ee=k,se=J,t.width=Math.floor(R*J),t.height=Math.floor(k*J),this.setViewport(0,0,R,k)},this.setEffects=function(R){if(v===wn){lt("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(R){for(let k=0;k<R.length;k++)if(R[k].isOutputPass===!0){Ge("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}A.setEffects(R||[])},this.getCurrentViewport=function(R){return R.copy(F)},this.getViewport=function(R){return R.copy(ae)},this.setViewport=function(R,k,J,q){R.isVector4?ae.set(R.x,R.y,R.z,R.w):ae.set(R,k,J,q),y.viewport(F.copy(ae).multiplyScalar(se).round())},this.getScissor=function(R){return R.copy(Ee)},this.setScissor=function(R,k,J,q){R.isVector4?Ee.set(R.x,R.y,R.z,R.w):Ee.set(R,k,J,q),y.scissor(ne.copy(Ee).multiplyScalar(se).round())},this.getScissorTest=function(){return Je},this.setScissorTest=function(R){y.setScissorTest(Je=R)},this.setOpaqueSort=function(R){X=R},this.setTransparentSort=function(R){he=R},this.getClearColor=function(R){return R.copy(qe.getClearColor())},this.setClearColor=function(){qe.setClearColor(...arguments)},this.getClearAlpha=function(){return qe.getClearAlpha()},this.setClearAlpha=function(){qe.setClearAlpha(...arguments)},this.clear=function(R=!0,k=!0,J=!0){let q=0;if(R){let $=!1;if(Q!==null){const _e=Q.texture.format;$=x.has(_e)}if($){const _e=Q.texture.type,Ae=m.has(_e),Me=qe.getClearColor(),Te=qe.getClearAlpha(),De=Me.r,je=Me.g,nt=Me.b;Ae?(M[0]=De,M[1]=je,M[2]=nt,M[3]=Te,G.clearBufferuiv(G.COLOR,0,M)):(_[0]=De,_[1]=je,_[2]=nt,_[3]=Te,G.clearBufferiv(G.COLOR,0,_))}else q|=G.COLOR_BUFFER_BIT}k&&(q|=G.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),J&&(q|=G.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),q!==0&&G.clear(q)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(R){R.setRenderer(this),N=R},this.dispose=function(){t.removeEventListener("webglcontextlost",Tt,!1),t.removeEventListener("webglcontextrestored",dt,!1),t.removeEventListener("webglcontextcreationerror",Fn,!1),qe.dispose(),xe.dispose(),fe.dispose(),K.dispose(),le.dispose(),ie.dispose(),Se.dispose(),oe.dispose(),de.dispose(),Pe.dispose(),Pe.removeEventListener("sessionstart",cc),Pe.removeEventListener("sessionend",hc),zi.stop()};function Tt(R){R.preventDefault(),Oc("WebGLRenderer: Context Lost."),C=!0}function dt(){Oc("WebGLRenderer: Context Restored."),C=!1;const R=B.autoReset,k=Be.enabled,J=Be.autoUpdate,q=Be.needsUpdate,$=Be.type;Ne(),B.autoReset=R,Be.enabled=k,Be.autoUpdate=J,Be.needsUpdate=q,Be.type=$}function Fn(R){lt("WebGLRenderer: A WebGL context could not be created. Reason: ",R.statusMessage)}function $n(R){const k=R.target;k.removeEventListener("dispose",$n),id(k)}function id(R){rd(R),K.remove(R)}function rd(R){const k=K.get(R).programs;k!==void 0&&(k.forEach(function(J){de.releaseProgram(J)}),R.isShaderMaterial&&de.releaseShaderCache(R))}this.renderBufferDirect=function(R,k,J,q,$,_e){k===null&&(k=Qt);const Ae=$.isMesh&&$.matrixWorld.determinantAffine()<0,Me=od(R,k,J,q,$);y.setMaterial(q,Ae);let Te=J.index,De=1;if(q.wireframe===!0){if(Te=j.getWireframeAttribute(J),Te===void 0)return;De=2}const je=J.drawRange,nt=J.attributes.position;let Re=je.start*De,ft=(je.start+je.count)*De;_e!==null&&(Re=Math.max(Re,_e.start*De),ft=Math.min(ft,(_e.start+_e.count)*De)),Te!==null?(Re=Math.max(Re,0),ft=Math.min(ft,Te.count)):nt!=null&&(Re=Math.max(Re,0),ft=Math.min(ft,nt.count));const Vt=ft-Re;if(Vt<0||Vt===1/0)return;Se.setup($,q,Me,J,Te);let Lt,At=pe;if(Te!==null&&(Lt=ue.get(Te),At=re,At.setIndex(Lt)),$.isMesh)q.wireframe===!0?(y.setLineWidth(q.wireframeLinewidth*Et()),At.setMode(G.LINES)):At.setMode(G.TRIANGLES);else if($.isLine){let sn=q.linewidth;sn===void 0&&(sn=1),y.setLineWidth(sn*Et()),$.isLineSegments?At.setMode(G.LINES):$.isLineLoop?At.setMode(G.LINE_LOOP):At.setMode(G.LINE_STRIP)}else $.isPoints?At.setMode(G.POINTS):$.isSprite&&At.setMode(G.TRIANGLES);if($.isBatchedMesh)if(ze.get("WEBGL_multi_draw"))At.renderMultiDraw($._multiDrawStarts,$._multiDrawCounts,$._multiDrawCount);else{const sn=$._multiDrawStarts,we=$._multiDrawCounts,un=$._multiDrawCount,ot=Te?ue.get(Te).bytesPerElement:1,Pn=K.get(q).currentProgram.getUniforms();for(let Zn=0;Zn<un;Zn++)Pn.setValue(G,"_gl_DrawID",Zn),At.render(sn[Zn]/ot,we[Zn])}else if($.isInstancedMesh)At.renderInstances(Re,Vt,$.count);else if(J.isInstancedBufferGeometry){const sn=J._maxInstanceCount!==void 0?J._maxInstanceCount:1/0,we=Math.min(J.instanceCount,sn);At.renderInstances(Re,Vt,we)}else At.render(Re,Vt)};function lc(R,k,J,q){N!==null&&R.isNodeMaterial&&N.setObject(q,R),Oe===!0&&Ie.setState(R,J,!1),R.transparent===!0&&R.side===gi&&R.forceSinglePass===!1?(R.side=xn,R.needsUpdate=!0,Ss(R,k,q),R.side=er,R.needsUpdate=!0,Ss(R,k,q),R.side=gi):Ss(R,k,q)}this.compile=function(R,k,J=null){J===null&&(J=R),N!==null&&N.renderStart(R,k,J),E=fe.get(J),E.init(k),b.push(E),J.traverseVisible(function($){$.isLight&&$.layers.test(k.layers)&&(E.pushLight($),$.castShadow&&E.pushShadow($))}),R!==J&&R.traverseVisible(function($){$.isLight&&$.layers.test(k.layers)&&(E.pushLight($),$.castShadow&&E.pushShadow($))}),E.setupLights(),N!==null&&N.updateLights(E.state.lightsArray),Ke=this.localClippingEnabled,Oe=Ie.init(this.clippingPlanes,Ke),Oe===!0&&Ie.setGlobalState(this.clippingPlanes,k),N!==null&&Be.render(E.state.shadowsArray,J,k);const q=new Set;return R.traverse(function($){if(!($.isMesh||$.isPoints||$.isLine||$.isSprite))return;const _e=$.material;if(_e)if(Array.isArray(_e))for(let Ae=0;Ae<_e.length;Ae++){const Me=_e[Ae];lc(Me,J,k,$),q.add(Me)}else lc(_e,J,k,$),q.add(_e)}),E=b.pop(),N!==null&&N.renderEnd(),q},this.compileAsync=function(R,k,J=null){const q=this.compile(R,k,J);return new Promise($=>{function _e(){if(q.forEach(function(Ae){const Te=K.get(Ae).currentProgram;(Te===void 0||Te.isReady())&&q.delete(Ae)}),q.size===0){$(R);return}setTimeout(_e,10)}ze.get("KHR_parallel_shader_compile")!==null?_e():setTimeout(_e,10)})};let Ga=null;function sd(R){Ga&&Ga(R)}function cc(){zi.stop()}function hc(){zi.start()}const zi=new Hu;zi.setAnimationLoop(sd),typeof self<"u"&&zi.setContext(self),this.setAnimationLoop=function(R){Ga=R,Pe.setAnimationLoop(R),R===null?zi.stop():zi.start()},Pe.addEventListener("sessionstart",cc),Pe.addEventListener("sessionend",hc),this.render=function(R,k){if(k!==void 0&&k.isCamera!==!0){lt("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(C===!0)return;N!==null&&N.renderStart(R,k);const J=Pe.enabled===!0&&Pe.isPresenting===!0,q=A!==null&&(Q===null||J)&&A.begin(P,Q);if(R.matrixWorldAutoUpdate===!0&&R.updateMatrixWorld(),k.parent===null&&k.matrixWorldAutoUpdate===!0&&k.updateMatrixWorld(),Pe.enabled===!0&&Pe.isPresenting===!0&&(A===null||A.isCompositing()===!1)&&(Pe.cameraAutoUpdate===!0&&Pe.updateCamera(k),k=Pe.getCamera()),R.isScene===!0&&R.onBeforeRender(P,R,k,Q),E=fe.get(R,b.length),E.init(k),E.state.textureUnits=Z.getTextureUnits(),b.push(E),Ye.multiplyMatrices(k.projectionMatrix,k.matrixWorldInverse),Ce.setFromProjectionMatrix(Ye,ii,k.reversedDepth),Ke=this.localClippingEnabled,Oe=Ie.init(this.clippingPlanes,Ke),w=xe.get(R,L.length),w.init(),L.push(w),Pe.enabled===!0&&Pe.isPresenting===!0){const Ae=P.xr.getDepthSensingMesh();Ae!==null&&Ha(Ae,k,-1/0,P.sortObjects)}Ha(R,k,0,P.sortObjects),w.finish(),N!==null&&N.updateLights(E.state.lightsArray),P.sortObjects===!0&&w.sort(X,he),_t=Pe.enabled===!1||Pe.isPresenting===!1||Pe.hasDepthSensing()===!1,_t&&qe.addToRenderList(w,R),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),Oe===!0&&Ie.beginShadows();const $=E.state.shadowsArray;if(Be.render($,R,k),Oe===!0&&Ie.endShadows(),(q&&A.hasRenderPass())===!1){const Ae=w.opaque,Me=w.transmissive;if(E.setupLights(),k.isArrayCamera){const Te=k.cameras;if(Me.length>0)for(let De=0,je=Te.length;De<je;De++){const nt=Te[De];dc(Ae,Me,R,nt)}_t&&qe.render(R);for(let De=0,je=Te.length;De<je;De++){const nt=Te[De];uc(w,R,nt,nt.viewport)}}else Me.length>0&&dc(Ae,Me,R,k),_t&&qe.render(R),uc(w,R,k)}Q!==null&&V===0&&(Z.updateMultisampleRenderTarget(Q),Z.updateRenderTargetMipmap(Q)),q&&A.end(P),R.isScene===!0&&R.onAfterRender(P,R,k),Se.resetDefaultState(),Y=-1,te=null,b.pop(),b.length>0?(E=b[b.length-1],Z.setTextureUnits(E.state.textureUnits),Oe===!0&&Ie.setGlobalState(P.clippingPlanes,E.state.camera)):E=null,L.pop(),L.length>0?w=L[L.length-1]:w=null,N!==null&&N.renderEnd()};function Ha(R,k,J,q){if(R.visible===!1)return;if(R.layers.test(k.layers)){if(R.isGroup)J=R.renderOrder;else if(R.isLOD)R.autoUpdate===!0&&R.update(k);else if(R.isLightProbeGrid)E.pushLightProbeGrid(R);else if(R.isLight)E.pushLight(R),R.castShadow&&E.pushShadow(R);else if(R.isSprite){if(!R.frustumCulled||R.intersectsFrustum(Ce)){q&&Ot.setFromMatrixPosition(R.matrixWorld).applyMatrix4(Ye);const Ae=ie.update(R),Me=R.material;Me.visible&&w.push(R,Ae,Me,J,Ot.z,null,k)}}else if((R.isMesh||R.isLine||R.isPoints)&&(!R.frustumCulled||R.intersectsFrustum(Ce))){const Ae=ie.update(R),Me=R.material;if(q&&(R.boundingSphere!==void 0?(R.boundingSphere===null&&R.computeBoundingSphere(),Ot.copy(R.boundingSphere.center)):(Ae.boundingSphere===null&&Ae.computeBoundingSphere(),Ot.copy(Ae.boundingSphere.center)),Ot.applyMatrix4(R.matrixWorld).applyMatrix4(Ye)),Array.isArray(Me)){const Te=Ae.groups;for(let De=0,je=Te.length;De<je;De++){const nt=Te[De],Re=Me[nt.materialIndex];Re&&Re.visible&&w.push(R,Ae,Re,J,Ot.z,nt,k)}}else Me.visible&&w.push(R,Ae,Me,J,Ot.z,null,k)}}const _e=R.children;for(let Ae=0,Me=_e.length;Ae<Me;Ae++)Ha(_e[Ae],k,J,q)}function uc(R,k,J,q){const{opaque:$,transmissive:_e,transparent:Ae}=R;E.setupLightsView(J),Oe===!0&&Ie.setGlobalState(P.clippingPlanes,J),q&&y.viewport(F.copy(q)),$.length>0&&_s($,k,J),_e.length>0&&_s(_e,k,J),Ae.length>0&&_s(Ae,k,J),y.buffers.depth.setTest(!0),y.buffers.depth.setMask(!0),y.buffers.color.setMask(!0),y.setPolygonOffset(!1)}function dc(R,k,J,q){if((J.isScene===!0?J.overrideMaterial:null)!==null)return;if(E.state.transmissionRenderTarget[q.id]===void 0){const Re=ze.has("EXT_color_buffer_half_float")||ze.has("EXT_color_buffer_float");E.state.transmissionRenderTarget[q.id]=new Un(1,1,{generateMipmaps:!0,type:Re?oi:wn,minFilter:$i,samples:Math.max(4,I.samples),stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:it.workingColorSpace})}const _e=E.state.transmissionRenderTarget[q.id],Ae=q.viewport||F;_e.setSize(Ae.z*P.transmissionResolutionScale,Ae.w*P.transmissionResolutionScale);const Me=P.getRenderTarget(),Te=P.getActiveCubeFace(),De=P.getActiveMipmapLevel();P.setRenderTarget(_e),P.getClearColor(be),Ue=P.getClearAlpha(),Ue<1&&P.setClearColor(16777215,.5),P.clear(),_t&&qe.render(J);const je=P.toneMapping;P.toneMapping=si;const nt=q.viewport;if(q.viewport!==void 0&&(q.viewport=void 0),E.setupLightsView(q),Oe===!0&&Ie.setGlobalState(P.clippingPlanes,q),_s(R,J,q),Z.updateMultisampleRenderTarget(_e),Z.updateRenderTargetMipmap(_e),ze.has("WEBGL_multisampled_render_to_texture")===!1){let Re=!1;for(let ft=0,Vt=k.length;ft<Vt;ft++){const Lt=k[ft],{object:At,geometry:sn,material:we,group:un}=Lt;if(we.side===gi&&At.layers.test(q.layers)){const ot=we.side;we.side=xn,we.needsUpdate=!0,fc(At,J,q,sn,we,un),we.side=ot,we.needsUpdate=!0,Re=!0}}Re===!0&&(Z.updateMultisampleRenderTarget(_e),Z.updateRenderTargetMipmap(_e))}P.setRenderTarget(Me,Te,De),P.setClearColor(be,Ue),nt!==void 0&&(q.viewport=nt),P.toneMapping=je}function _s(R,k,J){const q=k.isScene===!0?k.overrideMaterial:null;for(let $=0,_e=R.length;$<_e;$++){const Ae=R[$],{object:Me,geometry:Te,group:De}=Ae;let je=Ae.material;je.allowOverride===!0&&q!==null&&(je=q),Me.layers.test(J.layers)&&fc(Me,k,J,Te,je,De)}}function fc(R,k,J,q,$,_e){N!==null&&$.isNodeMaterial&&N.setObject(R,$),R.onBeforeRender(P,k,J,q,$,_e),R.modelViewMatrix.multiplyMatrices(J.matrixWorldInverse,R.matrixWorld),R.normalMatrix.getNormalMatrix(R.modelViewMatrix),$.onBeforeRender(P,k,J,q,R,_e),$.transparent===!0&&$.side===gi&&$.forceSinglePass===!1?($.side=xn,$.needsUpdate=!0,P.renderBufferDirect(J,k,q,$,R,_e),$.side=er,$.needsUpdate=!0,P.renderBufferDirect(J,k,q,$,R,_e),$.side=gi):P.renderBufferDirect(J,k,q,$,R,_e),R.onAfterRender(P,k,J,q,$,_e)}function Ss(R,k,J){k.isScene!==!0&&(k=Qt);const q=K.get(R),$=E.state.lights,_e=E.state.shadowsArray,Ae=$.state.version,Me=de.getParameters(R,$.state,_e,k,J,E.state.lightProbeGridArray),Te=de.getProgramCacheKey(Me);let De=q.programs;q.environment=R.isMeshStandardMaterial||R.isMeshLambertMaterial||R.isMeshPhongMaterial?k.environment:null,q.fog=k.fog;const je=R.isMeshStandardMaterial||R.isMeshLambertMaterial&&!R.envMap||R.isMeshPhongMaterial&&!R.envMap;q.envMap=le.get(R.envMap||q.environment,je),q.envMapRotation=q.environment!==null&&R.envMap===null?k.environmentRotation:R.envMapRotation,De===void 0&&(R.addEventListener("dispose",$n),De=new Map,q.programs=De);let nt=De.get(Te);if(nt!==void 0){if(q.currentProgram===nt&&q.lightsStateVersion===Ae)return mc(R,Me),nt}else Me.uniforms=de.getUniforms(R),N!==null&&R.isNodeMaterial&&N.build(R,J,Me),R.onBeforeCompile(Me,P),nt=de.acquireProgram(Me,Te),De.set(Te,nt),q.uniforms=Me.uniforms;const Re=q.uniforms;return(!R.isShaderMaterial&&!R.isRawShaderMaterial||R.clipping===!0)&&(Re.clippingPlanes=Ie.uniform),mc(R,Me),q.needsLights=cd(R),q.lightsStateVersion=Ae,q.needsLights&&(Re.ambientLightColor.value=$.state.ambient,Re.lightProbe.value=$.state.probe,Re.sunLights.value=$.state.sun,Re.sunLightShadows.value=$.state.sunShadow,Re.directionalLights.value=$.state.directional,Re.directionalLightShadows.value=$.state.directionalShadow,Re.spotLights.value=$.state.spot,Re.spotLightShadows.value=$.state.spotShadow,Re.rectAreaLights.value=$.state.rectArea,Re.ltc_1.value=$.state.rectAreaLTC1,Re.ltc_2.value=$.state.rectAreaLTC2,Re.pointLights.value=$.state.point,Re.pointLightShadows.value=$.state.pointShadow,Re.hemisphereLights.value=$.state.hemi,Re.sunShadowMatrix.value=$.state.sunShadowMatrix,Re.sunShadowCascade.value=$.state.sunShadowCascade,Re.directionalShadowMatrix.value=$.state.directionalShadowMatrix,Re.spotLightMatrix.value=$.state.spotLightMatrix,Re.spotLightMap.value=$.state.spotLightMap,Re.pointShadowMatrix.value=$.state.pointShadowMatrix),q.lightProbeGrid=E.state.lightProbeGridArray.length>0,q.currentProgram=nt,q.uniformsList=null,nt}function pc(R){if(R.uniformsList===null){const k=R.currentProgram.getUniforms();R.uniformsList=ua.seqWithValue(k.seq,R.uniforms)}return R.uniformsList}function mc(R,k){const J=K.get(R);J.outputColorSpace=k.outputColorSpace,J.batching=k.batching,J.batchingColor=k.batchingColor,J.instancing=k.instancing,J.instancingColor=k.instancingColor,J.instancingMorph=k.instancingMorph,J.skinning=k.skinning,J.morphTargets=k.morphTargets,J.morphNormals=k.morphNormals,J.morphColors=k.morphColors,J.morphTargetsCount=k.morphTargetsCount,J.numClippingPlanes=k.numClippingPlanes,J.numIntersection=k.numClipIntersection,J.vertexAlphas=k.vertexAlphas,J.vertexTangents=k.vertexTangents,J.toneMapping=k.toneMapping}function ad(R,k){if(R.length===0)return null;if(R.length===1)return R[0].texture!==null?R[0]:null;S.setFromMatrixPosition(k.matrixWorld);for(let J=0,q=R.length;J<q;J++){const $=R[J];if($.texture!==null&&$.boundingBox.containsPoint(S))return $}return null}function od(R,k,J,q,$){k.isScene!==!0&&(k=Qt),Z.resetTextureUnits();const _e=k.fog,Ae=q.isMeshStandardMaterial||q.isMeshLambertMaterial||q.isMeshPhongMaterial?k.environment:null,Me=Q===null?P.outputColorSpace:Q.isXRRenderTarget===!0?Q.texture.colorSpace:it.workingColorSpace,Te=q.isMeshStandardMaterial||q.isMeshLambertMaterial&&!q.envMap||q.isMeshPhongMaterial&&!q.envMap,De=le.get(q.envMap||Ae,Te),je=q.vertexColors===!0&&!!J.attributes.color&&J.attributes.color.itemSize===4,nt=!!J.attributes.tangent&&(!!q.normalMap||q.anisotropy>0),Re=!!J.morphAttributes.position,ft=!!J.morphAttributes.normal,Vt=!!J.morphAttributes.color;let Lt=si;q.toneMapped&&(Q===null||Q.isXRRenderTarget===!0)&&(Lt=P.toneMapping);const At=J.morphAttributes.position||J.morphAttributes.normal||J.morphAttributes.color,sn=At!==void 0?At.length:0,we=K.get(q),un=E.state.lights;if(Oe===!0&&(Ke===!0||R!==te)){const Rt=R===te&&q.id===Y;Ie.setState(q,R,Rt)}let ot=!1;q.version===we.__version?(we.needsLights&&we.lightsStateVersion!==un.state.version||we.outputColorSpace!==Me||$.isBatchedMesh&&we.batching===!1||!$.isBatchedMesh&&we.batching===!0||$.isBatchedMesh&&we.batchingColor===!0&&$._colorsTexture===null||$.isBatchedMesh&&we.batchingColor===!1&&$._colorsTexture!==null||$.isInstancedMesh&&we.instancing===!1||!$.isInstancedMesh&&we.instancing===!0||$.isSkinnedMesh&&we.skinning===!1||!$.isSkinnedMesh&&we.skinning===!0||$.isInstancedMesh&&we.instancingColor===!0&&$.instanceColor===null||$.isInstancedMesh&&we.instancingColor===!1&&$.instanceColor!==null||$.isInstancedMesh&&we.instancingMorph===!0&&$.morphTexture===null||$.isInstancedMesh&&we.instancingMorph===!1&&$.morphTexture!==null||we.envMap!==De||q.fog===!0&&we.fog!==_e||we.numClippingPlanes!==void 0&&(we.numClippingPlanes!==Ie.numPlanes||we.numIntersection!==Ie.numIntersection)||we.vertexAlphas!==je||we.vertexTangents!==nt||we.morphTargets!==Re||we.morphNormals!==ft||we.morphColors!==Vt||we.toneMapping!==Lt||we.morphTargetsCount!==sn||!!we.lightProbeGrid!=E.state.lightProbeGridArray.length>0)&&(ot=!0):(ot=!0,we.__version=q.version);let Pn=we.currentProgram;ot===!0&&(Pn=Ss(q,k,$),N&&q.isNodeMaterial&&N.onUpdateProgram(q,Pn,we));let Zn=!1,bi=!1,sr=!1;const St=Pn.getUniforms(),Wt=we.uniforms;if(y.useProgram(Pn.program)&&(Zn=!0,bi=!0,sr=!0),q.id!==Y&&(Y=q.id,bi=!0),we.needsLights){const Rt=ad(E.state.lightProbeGridArray,$);we.lightProbeGrid!==Rt&&(we.lightProbeGrid=Rt,bi=!0)}if(Zn||te!==R){y.buffers.depth.getReversed()&&R.reversedDepth!==!0&&(R._reversedDepth=!0,R.updateProjectionMatrix()),St.setValue(G,"projectionMatrix",R.projectionMatrix),St.setValue(G,"viewMatrix",R.matrixWorldInverse);const wi=St.map.cameraPosition;wi!==void 0&&wi.setValue(G,wt.setFromMatrixPosition(R.matrixWorld)),I.logarithmicDepthBuffer&&St.setValue(G,"logDepthBufFC",2/(Math.log(R.far+1)/Math.LN2)),(q.isMeshPhongMaterial||q.isMeshToonMaterial||q.isMeshLambertMaterial||q.isMeshBasicMaterial||q.isMeshStandardMaterial||q.isShaderMaterial)&&St.setValue(G,"isOrthographic",R.isOrthographicCamera===!0),te!==R&&(te=R,bi=!0,sr=!0)}if(we.needsLights&&(un.state.sunShadowMap.length>0&&St.setValue(G,"sunShadowMap",un.state.sunShadowMap,Z),un.state.directionalShadowMap.length>0&&St.setValue(G,"directionalShadowMap",un.state.directionalShadowMap,Z),un.state.spotShadowMap.length>0&&St.setValue(G,"spotShadowMap",un.state.spotShadowMap,Z),un.state.pointShadowMap.length>0&&St.setValue(G,"pointShadowMap",un.state.pointShadowMap,Z)),$.isSkinnedMesh){St.setOptional(G,$,"bindMatrix"),St.setOptional(G,$,"bindMatrixInverse");const Rt=$.skeleton;Rt&&(Rt.boneTexture===null&&Rt.computeBoneTexture(),St.setValue(G,"boneTexture",Rt.boneTexture,Z))}$.isBatchedMesh&&(St.setOptional(G,$,"batchingTexture"),St.setValue(G,"batchingTexture",$._matricesTexture,Z),St.setOptional(G,$,"batchingIdTexture"),St.setValue(G,"batchingIdTexture",$._indirectTexture,Z),St.setOptional(G,$,"batchingColorTexture"),$._colorsTexture!==null&&St.setValue(G,"batchingColorTexture",$._colorsTexture,Z));const yi=J.morphAttributes;if((yi.position!==void 0||yi.normal!==void 0||yi.color!==void 0)&&H.update($,J,Pn),(bi||we.receiveShadow!==$.receiveShadow)&&(we.receiveShadow=$.receiveShadow,St.setValue(G,"receiveShadow",$.receiveShadow)),(q.isMeshStandardMaterial||q.isMeshLambertMaterial||q.isMeshPhongMaterial)&&q.envMap===null&&k.environment!==null&&(Wt.envMapIntensity.value=k.environmentIntensity),Wt.dfgLUT!==void 0&&(Wt.dfgLUT.value=TM()),bi){if(St.setValue(G,"toneMappingExposure",P.toneMappingExposure),we.needsLights&&ld(Wt,sr),_e&&q.fog===!0&&Le.refreshFogUniforms(Wt,_e),Le.refreshMaterialUniforms(Wt,q,se,ee,E.state.transmissionRenderTarget[R.id]),we.needsLights&&we.lightProbeGrid){const Rt=we.lightProbeGrid;Wt.probesSH.value=Rt.texture,Wt.probesMin.value.copy(Rt.boundingBox.min),Wt.probesMax.value.copy(Rt.boundingBox.max),Wt.probesResolution.value.copy(Rt.resolution)}ua.upload(G,pc(we),Wt,Z)}if(q.isShaderMaterial&&q.uniformsNeedUpdate===!0&&(ua.upload(G,pc(we),Wt,Z),q.uniformsNeedUpdate=!1),q.isSpriteMaterial&&St.setValue(G,"center",$.center),St.setValue(G,"modelViewMatrix",$.modelViewMatrix),St.setValue(G,"normalMatrix",$.normalMatrix),St.setValue(G,"modelMatrix",$.matrixWorld),q.uniformsGroups!==void 0){const Rt=q.uniformsGroups;for(let wi=0,ar=Rt.length;wi<ar;wi++){const xc=Rt[wi];oe.update(xc,Pn),oe.bind(xc,Pn)}}return Pn}function ld(R,k){R.ambientLightColor.needsUpdate=k,R.lightProbe.needsUpdate=k,R.sunLights.needsUpdate=k,R.sunLightShadows.needsUpdate=k,R.directionalLights.needsUpdate=k,R.directionalLightShadows.needsUpdate=k,R.pointLights.needsUpdate=k,R.pointLightShadows.needsUpdate=k,R.spotLights.needsUpdate=k,R.spotLightShadows.needsUpdate=k,R.rectAreaLights.needsUpdate=k,R.hemisphereLights.needsUpdate=k}function cd(R){return R.isMeshLambertMaterial||R.isMeshToonMaterial||R.isMeshPhongMaterial||R.isMeshStandardMaterial||R.isShadowMaterial||R.isShaderMaterial&&R.lights===!0}this.getActiveCubeFace=function(){return z},this.getActiveMipmapLevel=function(){return V},this.getRenderTarget=function(){return Q},this.setRenderTargetTextures=function(R,k,J){const q=K.get(R);q.__autoAllocateDepthBuffer=R.resolveDepthBuffer===!1,q.__autoAllocateDepthBuffer===!1&&(q.__useRenderToTexture=!1),K.get(R.texture).__webglTexture=k,K.get(R.depthTexture).__webglTexture=q.__autoAllocateDepthBuffer?void 0:J,q.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(R,k){const J=K.get(R);J.__webglFramebuffer=k,J.__useDefaultFramebuffer=k===void 0},this.setRenderTarget=function(R,k=0,J=0){Q=R,z=k,V=J;let q=null,$=!1,_e=!1;if(R){const Me=K.get(R);if(Me.__useDefaultFramebuffer!==void 0){y.bindFramebuffer(G.FRAMEBUFFER,Me.__webglFramebuffer),F.copy(R.viewport),ne.copy(R.scissor),ce=R.scissorTest,y.viewport(F),y.scissor(ne),y.setScissorTest(ce),Y=-1;return}else if(Me.__webglFramebuffer===void 0)Z.setupRenderTarget(R);else if(Me.__hasExternalTextures)Z.rebindTextures(R,K.get(R.texture).__webglTexture,K.get(R.depthTexture).__webglTexture);else if(R.depthBuffer){const je=R.depthTexture;if(Me.__boundDepthTexture!==je){if(je!==null&&K.has(je)&&(R.width!==je.image.width||R.height!==je.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");Z.setupDepthRenderbuffer(R)}}const Te=R.texture;(Te.isData3DTexture||Te.isDataArrayTexture||Te.isCompressedArrayTexture)&&(_e=!0);const De=K.get(R).__webglFramebuffer;R.isWebGLCubeRenderTarget?(Array.isArray(De[k])?q=De[k][J]:q=De[k],$=!0):R.samples>0&&Z.useMultisampledRTT(R)===!1?q=K.get(R).__webglMultisampledFramebuffer:Array.isArray(De)?q=De[J]:q=De,F.copy(R.viewport),ne.copy(R.scissor),ce=R.scissorTest}else F.copy(ae).multiplyScalar(se).floor(),ne.copy(Ee).multiplyScalar(se).floor(),ce=Je;if(J!==0&&(q=U),y.bindFramebuffer(G.FRAMEBUFFER,q)&&y.drawBuffers(R,q),y.viewport(F),y.scissor(ne),y.setScissorTest(ce),$){const Me=K.get(R.texture);G.framebufferTexture2D(G.FRAMEBUFFER,G.COLOR_ATTACHMENT0,G.TEXTURE_CUBE_MAP_POSITIVE_X+k,Me.__webglTexture,J)}else if(_e){const Me=k;for(let Te=0;Te<R.textures.length;Te++){const De=K.get(R.textures[Te]);G.framebufferTextureLayer(G.FRAMEBUFFER,G.COLOR_ATTACHMENT0+Te,De.__webglTexture,J,Me)}}else if(R!==null&&J!==0){const Me=K.get(R.texture);G.framebufferTexture2D(G.FRAMEBUFFER,G.COLOR_ATTACHMENT0,G.TEXTURE_2D,Me.__webglTexture,J)}Y=-1};function gc(R){const k=K.get(R);return(k.__readFormat!==R.format||k.__readType!==R.type)&&(k.__readFormat=R.format,k.__readType=R.type,k.__formatReadable=I.textureFormatReadable(R.format),k.__typeReadable=I.textureTypeReadable(R.type)),k}this.readRenderTargetPixels=function(R,k,J,q,$,_e,Ae,Me=0){if(!(R&&R.isWebGLRenderTarget)){lt("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Te=K.get(R).__webglFramebuffer;if(R.isWebGLCubeRenderTarget&&Ae!==void 0&&(Te=Te[Ae]),Te){y.bindFramebuffer(G.FRAMEBUFFER,Te);try{const De=R.textures[Me],je=De.format,nt=De.type;R.textures.length>1&&G.readBuffer(G.COLOR_ATTACHMENT0+Me);const Re=gc(De);if(Re.__formatReadable===!1){lt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(Re.__typeReadable===!1){lt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}k>=0&&k<=R.width-q&&J>=0&&J<=R.height-$&&G.readPixels(k,J,q,$,me.convert(je),me.convert(nt),_e)}finally{const De=Q!==null?K.get(Q).__webglFramebuffer:null;y.bindFramebuffer(G.FRAMEBUFFER,De)}}},this.readRenderTargetPixelsAsync=async function(R,k,J,q,$,_e,Ae,Me=0){if(!(R&&R.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Te=K.get(R).__webglFramebuffer;if(R.isWebGLCubeRenderTarget&&Ae!==void 0&&(Te=Te[Ae]),Te)if(k>=0&&k<=R.width-q&&J>=0&&J<=R.height-$){y.bindFramebuffer(G.FRAMEBUFFER,Te);const De=R.textures[Me],je=De.format,nt=De.type;R.textures.length>1&&G.readBuffer(G.COLOR_ATTACHMENT0+Me);const Re=gc(De);if(Re.__formatReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(Re.__typeReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const ft=G.createBuffer();G.bindBuffer(G.PIXEL_PACK_BUFFER,ft),G.bufferData(G.PIXEL_PACK_BUFFER,_e.byteLength,G.STREAM_READ),G.readPixels(k,J,q,$,me.convert(je),me.convert(nt),0),G.bindBuffer(G.PIXEL_PACK_BUFFER,null);const Vt=Q!==null?K.get(Q).__webglFramebuffer:null;y.bindFramebuffer(G.FRAMEBUFFER,Vt);const Lt=G.fenceSync(G.SYNC_GPU_COMMANDS_COMPLETE,0);return G.flush(),await qm(G,Lt,4),G.bindBuffer(G.PIXEL_PACK_BUFFER,ft),G.getBufferSubData(G.PIXEL_PACK_BUFFER,0,_e),G.bindBuffer(G.PIXEL_PACK_BUFFER,null),G.deleteBuffer(ft),G.deleteSync(Lt),_e}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(R,k=null,J=0){const q=Math.pow(2,-J),$=Math.floor(R.image.width*q),_e=Math.floor(R.image.height*q),Ae=k!==null?k.x:0,Me=k!==null?k.y:0;Z.setTexture2D(R,0),G.copyTexSubImage2D(G.TEXTURE_2D,J,0,0,Ae,Me,$,_e),y.unbindTexture()},this.copyTextureToTexture=function(R,k,J=null,q=null,$=0,_e=0){let Ae,Me,Te,De,je,nt,Re,ft,Vt;const Lt=R.isCompressedTexture?R.mipmaps[_e]:R.image;if(J!==null)Ae=J.max.x-J.min.x,Me=J.max.y-J.min.y,Te=J.isBox3?J.max.z-J.min.z:1,De=J.min.x,je=J.min.y,nt=J.isBox3?J.min.z:0;else{const Wt=Math.pow(2,-$);Ae=Math.floor(Lt.width*Wt),Me=Math.floor(Lt.height*Wt),R.isDataArrayTexture?Te=Lt.depth:R.isData3DTexture?Te=Math.floor(Lt.depth*Wt):Te=1,De=0,je=0,nt=0}q!==null?(Re=q.x,ft=q.y,Vt=q.z):(Re=0,ft=0,Vt=0);const At=me.convert(k.format),sn=me.convert(k.type);let we;k.isData3DTexture?(Z.setTexture3D(k,0),we=G.TEXTURE_3D):k.isDataArrayTexture||k.isCompressedArrayTexture?(Z.setTexture2DArray(k,0),we=G.TEXTURE_2D_ARRAY):(Z.setTexture2D(k,0),we=G.TEXTURE_2D),y.activeTexture(G.TEXTURE0),y.pixelStorei(G.UNPACK_FLIP_Y_WEBGL,k.flipY),y.pixelStorei(G.UNPACK_PREMULTIPLY_ALPHA_WEBGL,k.premultiplyAlpha),y.pixelStorei(G.UNPACK_ALIGNMENT,k.unpackAlignment);const un=y.getParameter(G.UNPACK_ROW_LENGTH),ot=y.getParameter(G.UNPACK_IMAGE_HEIGHT),Pn=y.getParameter(G.UNPACK_SKIP_PIXELS),Zn=y.getParameter(G.UNPACK_SKIP_ROWS),bi=y.getParameter(G.UNPACK_SKIP_IMAGES);y.pixelStorei(G.UNPACK_ROW_LENGTH,Lt.width),y.pixelStorei(G.UNPACK_IMAGE_HEIGHT,Lt.height),y.pixelStorei(G.UNPACK_SKIP_PIXELS,De),y.pixelStorei(G.UNPACK_SKIP_ROWS,je),y.pixelStorei(G.UNPACK_SKIP_IMAGES,nt);const sr=R.isDataArrayTexture||R.isData3DTexture,St=k.isDataArrayTexture||k.isData3DTexture;if(R.isDepthTexture){const Wt=K.get(R),yi=K.get(k),Rt=K.get(Wt.__renderTarget),wi=K.get(yi.__renderTarget);y.bindFramebuffer(G.READ_FRAMEBUFFER,Rt.__webglFramebuffer),y.bindFramebuffer(G.DRAW_FRAMEBUFFER,wi.__webglFramebuffer);for(let ar=0;ar<Te;ar++)sr&&(G.framebufferTextureLayer(G.READ_FRAMEBUFFER,G.COLOR_ATTACHMENT0,K.get(R).__webglTexture,$,nt+ar),G.framebufferTextureLayer(G.DRAW_FRAMEBUFFER,G.COLOR_ATTACHMENT0,K.get(k).__webglTexture,_e,Vt+ar)),G.blitFramebuffer(De,je,Ae,Me,Re,ft,Ae,Me,G.DEPTH_BUFFER_BIT,G.NEAREST);y.bindFramebuffer(G.READ_FRAMEBUFFER,null),y.bindFramebuffer(G.DRAW_FRAMEBUFFER,null)}else if($!==0||R.isRenderTargetTexture||K.has(R)){const Wt=K.get(R),yi=K.get(k);y.bindFramebuffer(G.READ_FRAMEBUFFER,D),y.bindFramebuffer(G.DRAW_FRAMEBUFFER,O);for(let Rt=0;Rt<Te;Rt++)sr?G.framebufferTextureLayer(G.READ_FRAMEBUFFER,G.COLOR_ATTACHMENT0,Wt.__webglTexture,$,nt+Rt):G.framebufferTexture2D(G.READ_FRAMEBUFFER,G.COLOR_ATTACHMENT0,G.TEXTURE_2D,Wt.__webglTexture,$),St?G.framebufferTextureLayer(G.DRAW_FRAMEBUFFER,G.COLOR_ATTACHMENT0,yi.__webglTexture,_e,Vt+Rt):G.framebufferTexture2D(G.DRAW_FRAMEBUFFER,G.COLOR_ATTACHMENT0,G.TEXTURE_2D,yi.__webglTexture,_e),$!==0?G.blitFramebuffer(De,je,Ae,Me,Re,ft,Ae,Me,G.COLOR_BUFFER_BIT,G.NEAREST):St?G.copyTexSubImage3D(we,_e,Re,ft,Vt+Rt,De,je,Ae,Me):G.copyTexSubImage2D(we,_e,Re,ft,De,je,Ae,Me);y.bindFramebuffer(G.READ_FRAMEBUFFER,null),y.bindFramebuffer(G.DRAW_FRAMEBUFFER,null)}else St?R.isDataTexture||R.isData3DTexture?G.texSubImage3D(we,_e,Re,ft,Vt,Ae,Me,Te,At,sn,Lt.data):k.isCompressedArrayTexture?G.compressedTexSubImage3D(we,_e,Re,ft,Vt,Ae,Me,Te,At,Lt.data):G.texSubImage3D(we,_e,Re,ft,Vt,Ae,Me,Te,At,sn,Lt):R.isDataTexture?G.texSubImage2D(G.TEXTURE_2D,_e,Re,ft,Ae,Me,At,sn,Lt.data):R.isCompressedTexture?G.compressedTexSubImage2D(G.TEXTURE_2D,_e,Re,ft,Lt.width,Lt.height,At,Lt.data):G.texSubImage2D(G.TEXTURE_2D,_e,Re,ft,Ae,Me,At,sn,Lt);y.pixelStorei(G.UNPACK_ROW_LENGTH,un),y.pixelStorei(G.UNPACK_IMAGE_HEIGHT,ot),y.pixelStorei(G.UNPACK_SKIP_PIXELS,Pn),y.pixelStorei(G.UNPACK_SKIP_ROWS,Zn),y.pixelStorei(G.UNPACK_SKIP_IMAGES,bi),_e===0&&k.generateMipmaps&&G.generateMipmap(we),y.unbindTexture()},this.initRenderTarget=function(R){K.get(R).__webglFramebuffer===void 0&&Z.setupRenderTarget(R)},this.initTexture=function(R){R.isCubeTexture?Z.setTextureCube(R,0):R.isData3DTexture?Z.setTexture3D(R,0):R.isDataArrayTexture||R.isCompressedArrayTexture?Z.setTexture2DArray(R,0):Z.setTexture2D(R,0),y.unbindTexture()},this.resetState=function(){z=0,V=0,Q=null,y.reset(),Se.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return ii}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=it._getDrawingBufferColorSpace(e),t.unpackColorSpace=it._getUnpackColorSpace()}}const Gt=(n,e=0)=>{const t=Math.sin(n*127.1+e*311.7)*43758.5453;return t-Math.floor(t)},Mt=(n,e,t=0)=>Gt(Math.floor(n[0]*e)+Math.floor(n[2]*e)*57+t,Math.floor(n[1]*e)),It=(n=.2,e=.15)=>t=>{const i=Mt(t,16,3);return Mt(t,6,5)<e&&t[1]>.1?h.MOSS:i>1-n*.7?h.BODY2:void 0},zt=(n,e,t,i,r,s=0,a=0)=>{for(let o=0;o<e;o++){const c=Gt(r,o)*6.283,l=t*Math.sqrt(Gt(o,r));n.ell([s+Math.cos(c)*l,.07,a+Math.sin(c)*l*.7],[.07,.1+Gt(o,4)*.08,.07],h.LEAF2,{group:i+o%3,paint:u=>u[1]>.13?h.LEAF:void 0})}},Qs=(n,e,t,i=1)=>{for(let r=0;r<6;r++){const s=r/6*6.283+e[0],a=[Math.cos(s),0,Math.sin(s)];n.chain([[...e,.03*i],[...T.add(e,T.add(T.mul(a,.25*i),[0,.2*i,0])),.025*i],[...T.add(e,T.add(T.mul(a,.5*i),[0,.05*i,0])),.01*i]],r%2?h.LEAF:h.LEAF2,{group:t})}},Xn=(n,e,t,i,r)=>{const s=[];for(let a=0;a<=4;a++)s.push([...T.add(T.lerp(e,t,a/4),[(Gt(r,a)-.5)*.12,0,.02]),.03]);n.chain(s,h.LEAF,{group:i,paint:a=>Mt(a,30)<.3?h.LEAF2:void 0})},Aa=(n,e,t,i)=>n.ell(e,t,h.LEAF,{group:i,rough:.04,paint:r=>{const s=Mt(r,10,2);return r[1]<e[1]-.15||s<.2?h.LEAF3:s>.8?h.LEAF2:void 0}}),Ze=(n,e,t,i,r=.025,s=h.FRAME)=>n.seg(e,t,r,r,s,{group:i,paint:It(.35,.05)}),Gr=(n,e,t,i,r=h.MAGIC)=>n.ell(e,[t,t,t],r,{group:i,extra:!0});function ti(n,e,{yaw:t=0,pitch:i=0,roll:r=0,at:s=[0,0,0]}={}){const a=(f,d,p,g)=>{const v=Math.cos(d),x=Math.sin(d),m=[...f];return m[p]=f[p]*v-f[g]*x,m[g]=f[p]*x+f[g]*v,m},o=f=>a(a(a(f,r,1,2),i,0,1),-t,0,2),c=f=>a(a(a(f,t,0,2),-i,0,1),-r,1,2),l=f=>T.add(o(f),s),u=f=>c(T.sub(f,s));for(const f of n.parts.slice(e))if(f.type==="cone"?(f.a=l(f.a),f.b=l(f.b)):(f.c=l(f.c),f.axes=f.axes.map(o)),f.paint){const d=f.paint;f.paint=(p,g)=>d(u(p),g)}}function Co(n,e,{len:t=1.5,van:i=!1,glow:r=!1,flat:s=!1}={}){const a=i?.62:.3,o=i?.8:.5;n.box([0,o,0],[t,a,.66],h.BODY,{round:.14,group:e,paint:c=>{const l=It(.3,.12)(c);return l||(c[0]>t-.06&&Math.abs(c[1]-(o+a*.2))<.07&&Math.abs(Math.abs(c[2])-.45)<.1?r?h.MAGIC2:h.FRAME:i&&c[1]>o+.1&&Math.abs(c[2])>.6&&Math.abs(c[0]+.2)<.9&&(c[0]+3)*3%1>.15||c[1]<o-a+.1?h.SHADES:void 0)}}),i||n.box([-.2,o+a+.22,0],[t*.6,.24,.6],h.BODY,{round:.14,group:e,paint:c=>Math.abs(c[2])>.52||c[0]>t*.6-.25-.2?Mt(c,9)<.25?h.STONED:h.SHADES:It(.3,.25)(c)});for(const c of[-t*.65,t*.65])for(const l of[-.66,.66])n.ell([c,.3,l],[.3,s?.22:.3,.1],h.BODY3,{group:e+1,paint:u=>Math.hypot(u[0]-c,u[1]-.3)<.12?h.FRAME:void 0});if(r)for(const c of[-.45,.45])Gr(n,[t+.05,o+a*.2,c],.07,e+2,h.MAGIC2)}const CM={"car-nose-down":{desc:"a hatchback nose-down in the earth, ferns round it",build(n){const e=n.parts.length;Co(n,1),ti(n,e,{pitch:-.5,at:[0,.2,0]}),n.ell([1.3,.1,0],[.9,.35,1],h.BARK2,{group:4,rough:.04,paint:t=>t[1]>.25?h.MOSS:void 0}),Qs(n,[.9,.2,.8],5),Qs(n,[-.9,.05,.9],6,.8),n.ell([-.6,1.25,0],[.5,.06,.4],h.MOSS,{group:7})}},"van-tree":{desc:"a camper van with a tree grown up through its roof, its headlights glowing with fairy light",glow:!0,build(n){Co(n,1,{van:!0,len:1.6,flat:!0,glow:!0}),n.chain([[.2,0,0,.22],[.2,1.5,0,.2],[.3,2.6,-.1,.14],[.35,3.3,-.1,.08]],h.TRUNK,{group:4,rough:.015}),Aa(n,[.3,3.4,-.1],[1.1,.7,.9],5),Xn(n,[-1.6,.1,.66],[-1,1.3,.7],6,1),zt(n,14,2.2,7,2)}},"car-on-side":{desc:"a car on its side among ferns",build(n){const e=n.parts.length;Co(n,1),ti(n,e,{roll:Math.PI/2,at:[0,.2,.1]});for(const[t,i]of[[-1.2,.9],[.3,1.1],[1.4,.6],[-.4,-1]])Qs(n,[t,.05,i],5+(t>0?1:0),1.1)}},"trolley-tipped":{desc:"a shopping trolley tipped over, a plant growing in its basket",build(n){const e=n.parts.length;Lh(n,1),Aa(n,[.05,.65,0],[.32,.28,.26],3),ti(n,e,{roll:1.35,at:[0,.32,0]}),zt(n,8,.9,6,3)}},"trolley-nest":{desc:"a shopping trolley standing upright, a bird's nest in its basket",build(n){Lh(n,1),n.ell([0,.78,0],[.2,.08,.17],h.STRAW,{group:3,paint:e=>Math.abs(Math.sin(e[0]*40+e[2]*30))<.3?h.BARK2:void 0});for(const e of[-.05,.05])n.ell([e,.84,.02],[.04,.03,.035],h.BELLY,{group:4});zt(n,8,.9,6,4)}},cone:{desc:"a single traffic cone, faded",build(n){ss(n,[0,0,0],1)}},cones:{desc:"a little cluster of traffic cones, one fallen",build(n){ss(n,[0,0,0],1),ss(n,[.5,0,.2],4);const e=n.parts.length;ss(n,[0,0,0],7),ti(n,e,{roll:1.5,yaw:.6,at:[-.4,.2,.4]}),zt(n,6,.8,10,5)}},"cone-lantern":{desc:"a traffic cone lit from within like a lantern, a ring of mushrooms round it",glow:!0,build(n){ss(n,[0,0,0],1,!0);for(let e=0;e<9;e++){const t=e/9*6.283,i=[Math.cos(t)*.55,0,Math.sin(t)*.45];n.seg(i,T.add(i,[0,.08,0]),.02,.02,h.CLOTH,{group:5}),n.ell(T.add(i,[0,.1,0]),[.06,.035,.06],h.BODY2,{group:6})}}},"highway-slab":{desc:"a slab of tarmac tilted up out of the ground, faded lane markings, a crash-barrier stub",build(n){const e=n.parts.length;n.box([0,0,0],[2.2,.14,1.3],h.STONE,{round:.03,group:1,rough:.01,paint:t=>Mt(t,5,1)<.06||Math.abs(Math.sin(t[0]*3+t[2]*5)*.3+t[2]*.6-.2)<.02?h.STONED:t[1]>.1&&Math.abs(t[2])<.05&&(t[0]+9)*.8%1<.55?Mt(t,12)<.3?h.STONE:h.CLOTH:t[1]>.1&&Math.abs(t[2]-1.1)<.04?h.BELLY:t[1]>.1&&Mt(t,6,4)<.12?h.MOSS:void 0});for(const t of[-1.6,-.4])Ze(n,[t,.1,1.25],[t,.75,1.25],2,.04);n.box([-1,.62,1.3],[.9,.1,.03],h.FRAME,{group:3,paint:t=>Math.abs(t[1]-.62)<.02?h.STONED:It(.5,.1)(t)}),ti(n,e,{pitch:.38,roll:.08,at:[0,.7,0]}),n.ell([-1.8,.1,0],[.6,.2,1.3],h.BARK2,{group:5,rough:.04,paint:t=>t[1]>.2?h.MOSS:void 0}),zt(n,16,2.4,6,6)}},"highway-line":{desc:"a section of cracked road, its white line broken, grass in the cracks",build(n){n.box([0,.02,0],[2,.03,1],h.STONE,{round:.02,group:1,paint:e=>Mt(e,4,9)<.08||Math.abs(Math.sin(e[0]*2.3)*.4-e[2])<.025?Mt(e,20)<.4?h.LEAF2:h.STONED:Math.abs(e[2]+.05)<.05&&(e[0]+9)*.7%1<.6?h.CLOTH:Mt(e,6)<.08?h.MOSS:void 0});for(const[e,t]of[[-1.2,.3],[.4,-.2],[1.3,.5]])zt(n,4,.2,3,e*10+7,e,t)}},"road-sign":{desc:"a fallen road sign, blank but for an abstract arrow",build(n){Ze(n,[-.9,.05,.2],[.6,.1,-.1],1,.03),n.box([.9,.12,-.15],[.62,.05,.46],h.HAT1,{group:2,dir:[1,.25,-.2],round:.02,paint:e=>{const t=e[0]-.9,i=e[2]+.15;return Math.abs(i)<.08&&t>-.36&&t<.2||t>.08&&Math.abs(i)<.28-(t-.08)*.9&&t<.38?h.BELLY:Math.hypot(Math.abs(t)-.56,Math.abs(i)-.4)<.04?h.FRAME:It(.2,.1)(e)}}),zt(n,8,1.2,4,7)}},"phone-box":{desc:"an overgrown phone box, its panes long gone",build(n){n.box([0,1,0],[.42,1,.42],h.ACCENT,{round:.04,group:1,paint:e=>Math.max(Math.abs(e[0]),Math.abs(e[2]))>.38&&e[1]>.5&&e[1]<1.75&&e[1]*5%1>.12&&(Math.abs(e[0])+Math.abs(e[2]))*5%1>.12?h.SHADES:It(.3,.15)(e)}),n.box([0,2.08,0],[.46,.09,.46],h.ACCENT,{round:.06,group:2,paint:It(.3,.3)}),Xn(n,[.43,0,.3],[.4,1.9,.43],3,8),Xn(n,[-.3,0,.43],[-.1,1.4,.43],4,9),zt(n,10,.9,5,8)}},lamppost:{desc:"a lamppost bent over, its lamp hanging near the ground",build(n){n.chain([[0,0,0,.06],[0,1.4,0,.05],[.2,2.1,0,.045],[.8,2.2,0,.04],[1.2,1.7,0,.035]],h.FRAME,{group:1,paint:It(.4,.05)}),n.box([1.25,1.55,0],[.16,.1,.12],h.FRAME,{round:.04,group:2}),n.ell([1.25,1.45,0],[.12,.06,.1],h.SHADES,{group:2}),Xn(n,[0,0,.06],[.05,1.5,.06],3,10),zt(n,6,.7,4,9)}},sofa:{desc:"a sofa left in a clearing, moss on its cushions",build(n){const e=t=>Mt(t,6,5)<.25&&t[1]>.4?h.MOSS:Mt(t,14)>.9?h.STONED:void 0;n.box([0,.3,0],[.9,.2,.4],h.CLOTH,{round:.1,group:1,paint:e}),n.box([-.02,.7,-.32],[.9,.3,.12],h.CLOTH,{round:.1,group:2,paint:e});for(const t of[-.85,.85])n.box([t,.55,0],[.12,.22,.42],h.CLOTH,{round:.1,group:3,paint:e});for(const t of[-.4,.4])n.box([t,.53,.05],[.42,.08,.34],h.CLOTH,{round:.08,group:4,paint:e});zt(n,14,1.6,5,10)}},"washing-machine":{desc:"a washing machine in the undergrowth, a fern in its drum",build(n){n.box([0,.42,0],[.32,.42,.32],h.BELLY,{round:.05,group:1,paint:e=>e[2]>.28&&Math.hypot(e[0],e[1]-.4)<.2?Math.hypot(e[0],e[1]-.4)<.15?h.SHADES:h.FRAME:It(.25,.15)(e)}),Qs(n,[0,.4,.4],2,.55),zt(n,8,.8,3,11)}},"bike-roots":{desc:"a bicycle tangled in tree roots",build(n){for(const e of[-.45,.45])for(let t=0;t<12;t++){const i=t/12*6.283,r=(t+1)/12*6.283;Ze(n,[e+Math.cos(i)*.3,.32+Math.sin(i)*.3,0],[e+Math.cos(r)*.3,.32+Math.sin(r)*.3,0],1+(e>0?1:0),.018)}for(const[e,t]of[[[-.45,.32,0],[0,.35,0]],[[0,.35,0],[.3,.7,0]],[[-.45,.32,0],[-.15,.72,0]],[[-.15,.72,0],[.3,.7,0]],[[.3,.7,0],[.45,.32,0]],[[0,.35,0],[-.15,.72,0]],[[.3,.7,0],[.35,.85,0]]])Ze(n,e,t,3,.022);n.box([-.17,.76,0],[.1,.03,.04],h.SHADES,{group:4}),Ze(n,[.25,.85,-.15],[.42,.87,.15],4,.018);for(let e=0;e<4;e++)n.chain([[-1+e*.2,0,-.4,.09],[-.3+e*.3,.35+e%2*.2,-.05+e*.05,.07],[.4+e*.2,.1,.3,.05]],h.TRUNK,{group:5+e%2,rough:.01})}},"dish-birdbath":{desc:"a satellite dish fallen face-up, full of rainwater, a bird drinking",build(n){n.ell([0,.2,0],[.6,.22,.6],h.BELLY,{group:1,paint:It(.25,.2)}),n.ell([0,.34,0],[.52,.12,.52],h.BELLY,{group:1,cut:!0}),n.ell([0,.28,0],[.48,.02,.48],h.WATER,{group:2}),Ze(n,[0,.25,-.5],[.1,.8,-.6],3,.03);const e=[.5,.45,.3];n.ell(e,[.12,.07,.06],h.BODY3,{group:4,dir:[1,.3,0]}),n.ell(T.add(e,[.1,.07,0]),[.05,.05,.045],h.BODY3,{group:4}),n.seg(T.add(e,[.14,.07,0]),T.add(e,[.2,.04,0]),.012,.004,h.ACCENT,{group:4}),zt(n,8,1,5,12)}},"fridge-fireflies":{desc:"a fridge standing in the woods, its door ajar, fireflies inside",glow:!0,build(n){n.box([0,.85,0],[.36,.85,.32],h.BELLY,{round:.05,group:1,paint:e=>e[2]>.28&&Math.abs(e[0])<.3&&e[1]<1.55&&e[1]>.1?h.SHADES:It(.25,.2)(e)}),n.box([.5,.85,.4],[.03,.78,.3],h.BELLY,{dir:[.5,0,1],round:.03,group:2,paint:It(.25,.15)});for(let e=0;e<7;e++)Gr(n,[(Gt(e)-.5)*.4,.4+Gt(e,2)*1,.2+Gt(e,3)*.3],.03,10+e,e%2?h.MAGIC:h.MAGIC2);Xn(n,[-.36,0,.3],[-.3,1.6,.33],3,13)}}};function Lh(n,e){const t=[[-.35,.45,-.25],[.35,.45,-.25],[.35,.45,.25],[-.35,.45,.25],[-.3,.9,-.28],[.4,.9,-.28],[.4,.9,.28],[-.3,.9,.28]];for(const[i,r]of[[0,1],[1,2],[2,3],[3,0],[4,5],[5,6],[6,7],[7,4],[0,4],[1,5],[2,6],[3,7]])Ze(n,t[i],t[r],e,.015);for(let i=1;i<6;i++){const r=i/6;Ze(n,T.lerp(t[0],t[1],r),T.lerp(t[4],t[5],r),e,.008),Ze(n,T.lerp(t[3],t[2],r),T.lerp(t[7],t[6],r),e,.008)}Ze(n,t[4],[-.45,.95,-.28],e,.015),Ze(n,t[7],[-.45,.95,.28],e,.015),Ze(n,[-.45,.95,-.28],[-.45,.95,.28],e,.025,h.ACCENT);for(const[i,r]of[[-.3,-.22],[.3,-.22],[-.3,.22],[.3,.22]])Ze(n,[i,.45,r],[i,.08,r],e,.012),n.ell([i,.06,r],[.05,.05,.02],h.BODY3,{group:e+1})}function ss(n,e,t,i=!1){n.box(T.add(e,[0,.03,0]),[.24,.03,.24],h.ACCENT,{round:.02,group:t,paint:It(.15,.2)}),n.seg(T.add(e,[0,.05,0]),T.add(e,[0,.72,0]),.2,.03,h.ACCENT,{group:t+1,paint:r=>Math.abs(r[1]-e[1]-.42)<.07?i?h.MAGIC2:h.CLOTH:i&&Mt(r,18)<.2?h.GLOW:It(.15,.1)(r)}),i&&Gr(n,T.add(e,[0,.78,0]),.05,t+2,h.MAGIC2)}const LM={swings:{desc:"a rusty swing set, one swing hanging, one chain broken; the hanging one sways on its own with a faint sparkle",glow:!0,split:1.6,build(n){for(const e of[-1.1,1.1])for(const t of[-.5,.5])Ze(n,[e,0,t],[e*.95,2.1,0],1,.045);Ze(n,[-1.1,2.1,0],[1.1,2.1,0],2,.05);for(const e of[-.12,.12])Ze(n,[-.5,2.08,e],[-.42,.55,e*1.2],3,.012);n.box([-.42,.52,0],[.2,.025,.14],h.BODY3,{round:.02,group:3,dir:[1,-.15,0]});for(let e=0;e<5;e++)Gr(n,[-.42+(Gt(e)-.5)*.5,.6+Gt(e,2)*.7,(Gt(e,3)-.5)*.3],.025,10+e);Ze(n,[.5,2.08,-.12],[.5,1.3,-.12],4,.012),Ze(n,[.5,2.08,.12],[.58,.9,.2],4,.012),n.box([.7,.04,.3],[.2,.025,.14],h.BODY3,{round:.02,group:5,dir:[1,0,.5]}),Xn(n,[1.1,0,.5],[1.05,1.6,.25],6,14),zt(n,14,1.8,7,15)}},slide:{desc:"a slide half-swallowed by brambles, a sapling at its foot",split:1.6,build(n){for(const e of[-.95,-.55])for(const t of[-.3,.3])Ze(n,[e,0,t],[e,1.5,t],1,.035);for(let e=1;e<6;e++)Ze(n,[-.95,e*.27,-.3],[-.95,e*.27,.3],1,.02);n.box([-.75,1.5,0],[.25,.04,.32],h.FRAME,{group:2,paint:It(.4,.1)}),n.box([.35,.78,0],[.95,.03,.26],h.HAT1,{dir:[1,-.75,0],round:.02,group:3,paint:e=>Math.abs(e[2])>.22?h.FRAME:It(.35,.15)(e)});for(let e=0;e<10;e++){const t=Gt(e,3)*6.283;n.chain([[.4+Math.cos(t)*.9,0,Math.sin(t)*.6,.03],[.3+Math.cos(t)*.4,.5+Gt(e)*.5,Math.sin(t)*.3,.025],[.1+Gt(e,4)*.6,.7+Gt(e,5)*.4,(Gt(e,6)-.5)*.4,.015]],h.BARKD,{group:5+e%2}),e%3===0&&n.ell([.3+Gt(e,7)*.6,.5+Gt(e,8)*.4,(Gt(e,9)-.5)*.5],[.2,.14,.16],h.LEAF,{group:7,rough:.03,paint:i=>Mt(i,30)<.1?h.ACCENT:void 0})}n.seg([1.45,0,.2],[1.45,1.2,.2],.03,.02,h.TRUNK,{group:8}),Aa(n,[1.45,1.3,.2],[.25,.2,.22],9)}},roundabout:{desc:"a roundabout tilted in the moss",build(n){const e=n.parts.length;n.ell([0,.2,0],[.9,.05,.9],h.HAT2,{group:1,paint:t=>Math.abs(Math.sin(Math.atan2(t[2],t[0])*3))<.08?h.FRAME:It(.35,.2)(t)});for(let t=0;t<3;t++){const i=t/3*6.283;Ze(n,[Math.cos(i)*.7,.25,Math.sin(i)*.7],[Math.cos(i)*.7,.6,Math.sin(i)*.7],2,.025),Ze(n,[Math.cos(i)*.7,.6,Math.sin(i)*.7],[Math.cos(i)*.1,.6,Math.sin(i)*.1],2,.02)}ti(n,e,{pitch:.18,roll:.1,at:[0,.05,0]}),n.ell([0,.05,0],[1.1,.08,1],h.MOSS,{group:4}),zt(n,10,1.3,5,16)}},seesaw:{desc:"a seesaw stuck at an angle",build(n){n.box([0,.2,0],[.08,.2,.14],h.FRAME,{round:.02,group:1,paint:It(.4,.1)});const e=n.parts.length;n.box([0,0,0],[1.3,.035,.12],h.WOOD,{round:.02,group:2,paint:t=>Mt(t,8)<.2?h.MOSS:void 0});for(const t of[-1.05,1.05])Ze(n,[t,.03,-.12],[t,.03,.12],3,.02);ti(n,e,{pitch:.32,at:[0,.42,0]}),zt(n,10,1.4,5,17)}},"climbing-frame":{desc:"a climbing frame, a dome of bars wound with ivy",split:1.4,build(n){const t=(i,r)=>{const s=i/8*6.283,a=r/4*Math.PI/2;return[Math.cos(s)*Math.cos(a)*1,Math.sin(a)*1*1.5,Math.sin(s)*Math.cos(a)*1]};for(let i=0;i<8;i++)for(let r=0;r<4;r++)Ze(n,t(i,r),t(i,r+1),1,.025),Ze(n,t(i,r),t(i+1,r),1,.025);for(let i=0;i<3;i++)Xn(n,t(i*3,0),t(i*3+1,3),3+i,18+i);zt(n,12,1.4,6,18)}},"spring-rider":{desc:"a spring rider animal, its paint faded (a generic animal, no characters)",build(n){for(let e=0;e<6;e++)n.seg([Math.cos(e*2)*.06,e*.07,Math.sin(e*2)*.06],[Math.cos(e*2+2)*.06,(e+1)*.07,Math.sin(e*2+2)*.06],.022,.022,h.FRAME,{group:1});n.ell([0,.55,0],[.35,.16,.14],h.BODY,{group:2,paint:It(.4,.2)}),n.ell([.32,.72,0],[.12,.11,.1],h.BODY,{group:2,paint:It(.4,.2)});for(const e of[-.05,.05])n.ell([.28,.85,e],[.03,.06,.02],h.BODY,{group:3});n.ell([.43,.74,.06],[.015,.015,.015],h.SHADES,{group:3}),Ze(n,[.25,.68,-.12],[.25,.68,.12],4,.015),n.box([0,.02,0],[.25,.02,.25],h.STONE,{group:5}),zt(n,8,.8,6,19)}}};function PM(n,e,t,i,r,s=1){n.box([0,.015,0],[e,.015,t],i,{round:.01,group:s,paint:a=>Mt(a,3,4)<.05||Math.abs(Math.sin(a[0]*1.3+1)*.5+Math.sin(a[0]*4.1)*.08-a[2]*.3)<.012?Mt(a,18)<.5?h.LEAF2:h.STONED:r(a[0],a[2])?Mt(a,10,2)<.25?i:h.CLOTH:Mt(a,5,7)<.07?h.MOSS:void 0})}const Gn=(n,e,t=.045)=>Math.abs(n-e)<t,DM={"tennis-court":{desc:"a cracked tennis court, faded lines, grass through the cracks",decal:!0,build(n){PM(n,4.4+.5,2+.5,h.HAT2,(i,r)=>Math.abs(i)<=4.4+.05&&Math.abs(r)<=2+.05&&(Gn(Math.abs(i),4.4)||Gn(Math.abs(r),2)||Gn(Math.abs(r),2*.75)||Math.abs(i)<4.4*.54&&(Gn(r,0)||Gn(Math.abs(i),4.4*.54))))}},"tennis-net":{desc:"a sagging tennis net between its posts",build(n){for(const e of[-2.2,2.2])Ze(n,[0,0,e],[0,.55,e],1,.035);n.box([0,.38,0],[.01,.17,2.15],h.CLOTH,{group:2,paint:e=>e[1]>.5?h.CLOTH:e[1]*25%1<.25||(e[2]+5)*25%1<.25?h.SHADES:void 0}),n.box([0,.25,0],[.012,.15,1],h.SHADES,{group:2,cut:!0})}},"umpire-chair":{desc:"a tennis umpire's chair leaning over",split:1.4,build(n){const e=n.parts.length;for(const t of[-.25,.25])for(const i of[-.2,.2])Ze(n,[t*1.4,0,i*1.4],[t,1.5,i],1,.03);for(let t=1;t<5;t++)Ze(n,[-.3,t*.3,-.22],[-.3,t*.3,.22],1,.02);n.box([0,1.55,0],[.28,.04,.25],h.WOOD,{group:2}),n.box([-.26,1.8,0],[.03,.25,.25],h.WOOD,{group:2}),ti(n,e,{roll:.25,pitch:-.1}),zt(n,8,1,4,20)}},"court-fence":{desc:"a chain-link fence section, ivy through it, a gap torn in it",build(n){for(const e of[-1.5,0,1.5])Ze(n,[e,0,0],[e,1.7,0],1,.03);Ze(n,[-1.5,1.7,0],[1.5,1.7,0],1,.025),n.box([0,.85,0],[1.5,.85,.008],h.FRAME,{group:2,paint:e=>(e[0]+e[1]+9)*9%1<.2||(e[0]-e[1]+9)*9%1<.2?Mt(e,5)<.15?h.BODY2:h.FRAME:h.SHADES}),n.ell([.7,.5,0],[.4,.5,.05],h.SHADES,{group:2,cut:!0,rough:.08});for(let e=0;e<3;e++)Xn(n,[-1.3+e*.6,0,.03],[-1.1+e*.5,1.5,.03],3+e,21+e)}},"tennis-balls":{desc:"a few old tennis balls glowing faintly in the grass",glow:!0,build(n){for(let e=0;e<4;e++)Gr(n,[(Gt(e)-.5)*1.2,.06,(Gt(e,2)-.5)*.8],.06,1+e,e%2?h.MAGIC:h.MAGIC2);n.ell([0,.004,0],[.8,.004,.5],h.LEAF3,{group:9}),zt(n,8,.8,5,22)}},"baseball-diamond":{desc:"a baseball diamond: the worn dirt infield, grown-over bases, a pitcher's mound",decal:!0,build(n){n.box([0,.015,0],[2.2*1.6,.015,2.2*1.2],h.LEAF2,{group:1,round:.01,paint:t=>{const i=Math.abs(t[0])/2.2+Math.abs(t[2])/1.6500000000000001;return i<1.08&&i>.78?Mt(t,8)<.2?h.LEAF2:h.BARK2:i<=.78?Mt(t,6)<.15?h.MOSS:void 0:Mt(t,6,3)<.3?h.LEAF:void 0}});for(const[t,i]of[[2.2,0],[0,2.2*.75],[-2.2,0],[0,-2.2*.75]])n.box([t*.93,.04,i*.93],[.12,.02,.1],h.BELLY,{group:2,round:.02,paint:r=>Mt(r,20)<.3?h.LEAF2:void 0});n.ell([0,.02,0],[.35,.08,.28],h.BARK2,{group:3})}},backstop:{desc:"a baseball backstop fence, a dugout bench beside it",build(n){for(let e=0;e<=4;e++){const t=-.8+e*.4;Ze(n,[-Math.cos(t)*.8,0,Math.sin(t)*1.4],[-Math.cos(t)*.8,1.8,Math.sin(t)*1.4],1,.03)}for(let e=0;e<4;e++){const t=-.8+e*.4,i=t+.4,r=[-Math.cos(t)*.8,.9,Math.sin(t)*1.4],s=[-Math.cos(i)*.8,.9,Math.sin(i)*1.4],a=T.lerp(r,s,.5);n.box(a,[Math.hypot(s[0]-r[0],s[2]-r[2])/2,.9,.008],h.FRAME,{dir:T.sub(s,r),group:2,paint:o=>(o[1]+o[0]*2+9)*9%1<.2?Mt(o,5)<.2?h.BODY2:h.FRAME:h.SHADES})}n.box([-.6,.3,2],[.15,.04,.7],h.WOOD,{group:3});for(const e of[1.4,2.6])n.box([-.6,.14,e],[.12,.14,.04],h.WOOD,{group:3});Xn(n,[-.75,0,-.5],[-.7,1.6,-.4],4,25)}},scoreboard:{desc:"a scoreboard frame, panels missing (no text)",split:1.8,build(n){for(const e of[-1,1])Ze(n,[e,0,0],[e,2.6,0],1,.05);for(let e=0;e<3;e++)for(let t=0;t<5;t++)Gt(e,t)>.3&&n.box([-.8+t*.4,1.6+e*.32,0],[.18,.14,.03],h.HAT1,{group:2+e,round:.01,paint:It(.3,.1)});n.box([0,2.62,0],[1.1,.05,.06],h.FRAME,{group:5}),Xn(n,[-1,0,.06],[-.95,2.3,.06],6,26)}},"football-pitch":{desc:"a football pitch: faded lines, a centre circle, mown stripes long grown out",decal:!0,build(n){n.box([0,.015,0],[5.2+.5,.015,3.3+.5],h.LEAF2,{group:1,round:.01,paint:i=>{const r=i[0],s=i[2];return Math.abs(r)<=5.2+.05&&Math.abs(s)<=3.3+.05&&(Gn(Math.abs(r),5.2,.06)||Gn(Math.abs(s),3.3,.06)||Gn(r,0,.06)||Gn(Math.hypot(r,s*1),1,.06)||Math.abs(r)>5.2-1&&Math.abs(s)<1.6&&(Gn(Math.abs(r),5.2-1,.06)||Gn(Math.abs(s),1.6,.06)))?Mt(i,8,2)<.3?h.LEAF2:h.CLOTH:Math.floor((r+20)*.8)%2?Mt(i,6)<.25?h.LEAF2:h.LEAF:Mt(i,5,9)<.1?h.LEAF3:void 0}})}},goal:{desc:"a football goal, its net torn, a sapling grown through it",split:1.1,build(n){Ph(n,1),n.seg([.3,0,.2],[.3,1.5,.2],.035,.025,h.TRUNK,{group:5}),Aa(n,[.3,1.6,.2],[.35,.25,.3],6),zt(n,8,1.2,7,27)}},"goal-tipped":{desc:"a football goal tipped on its back",build(n){const e=n.parts.length;Ph(n,1),ti(n,e,{pitch:-Math.PI/2+.12,at:[-.5,.06,0]}),zt(n,8,1.2,7,28)}},"corner-flag":{desc:"a corner flag, its flag a faded rag",build(n){Ze(n,[0,0,0],[0,.9,0],1,.015),n.box([.12,.8,0],[.12,.08,.006],h.ACCENT,{group:2,dir:[1,-.3,.1],paint:It(.2,0)}),zt(n,5,.4,3,29)}},floodlight:{desc:"a floodlight pylon, one lamp still flickering with fairy light",glow:!0,split:2.4,build(n){for(const[t,i]of[[-.25,-.25],[.25,-.25],[.25,.25],[-.25,.25]])Ze(n,[t*1.6,0,i*1.6],[t*.5,4,i*.5],1,.035);for(let t=1;t<8;t++){const i=t*4/8,r=1.6-1.1*i/4;Ze(n,[-.25*r,i,-.25*r],[.25*r,i+4/8,.25*r],2,.015),Ze(n,[.25*r,i,-.25*r],[-.25*r,i+4/8,.25*r],2,.015)}for(let t=0;t<2;t++)for(let i=0;i<3;i++)n.box([-.3+i*.3,4+.2+t*.25,.1],[.12,.1,.06],h.FRAME,{group:3,round:.02,paint:r=>r[2]>.14?t===1&&i===1?h.MAGIC2:h.SHADES:It(.4,.1)(r)});Gr(n,[0,4+.45,.22],.06,4,h.MAGIC2),Xn(n,[-.4,0,.4],[-.2,2.4,.2],5,30)}},"basketball-hoop":{desc:"a basketball hoop on a leaning post, its net gone",split:1.8,build(n){const e=n.parts.length;Ze(n,[0,0,0],[0,2.4,0],1,.05),n.box([.15,2.5,0],[.03,.3,.45],h.BELLY,{group:2,paint:t=>Math.abs(t[1]-2.4)<.1&&Math.abs(t[2])<.14&&Math.abs(Math.abs(t[2])-.12)<.02?h.ACCENT:It(.25,.1)(t)});for(let t=0;t<8;t++){const i=t/8*6.283,r=(t+1)/8*6.283;Ze(n,[.36+Math.cos(i)*.17,2.32,Math.sin(i)*.17],[.36+Math.cos(r)*.17,2.32,Math.sin(r)*.17],3,.012,h.ACCENT)}ti(n,e,{pitch:-.2}),zt(n,8,1,5,31)}}};function Ph(n,e){for(const t of[-1.4,1.4])Ze(n,[0,0,t],[0,1,t],e,.035,h.BELLY);Ze(n,[0,1,-1.4],[0,1,1.4],e,.035,h.BELLY);for(const t of[-1.4,1.4])Ze(n,[0,1,t],[-.6,0,t],e+1,.02,h.BELLY);n.box([-.3,.5,0],[.012,.55,1.38],h.CLOTH,{dir:[.6,1,0],group:e+2,paint:t=>t[1]*12%1<.3||(t[2]+5)*12%1<.3?h.CLOTH:h.SHADES}),n.ell([-.3,.4,.5],[.2,.3,.4],h.CLOTH,{group:e+2,cut:!0})}const IM=[...Object.entries(CM).map(([n,e])=>({id:n,family:"modern",size:1,split:null,...e})),...Object.entries(LM).map(([n,e])=>({id:n,family:"playground",size:1.1,split:null,...e})),...Object.entries(DM).map(([n,e])=>({id:n,family:"sports",size:1.1,split:null,...e}))];Object.fromEntries(IM.map(n=>[n.id,n]));const Bt=(n,e=0)=>{const t=Math.sin(n*127.1+e*311.7)*43758.5453;return t-Math.floor(t)},Kn=(n,e,t=0)=>Bt(Math.floor(n[0]*e)+Math.floor(n[2]*e)*57+t,Math.floor(n[1]*e)),Cl=n=>{const e=Kn(n,12);return e<.14?h.BARKD:e>.88?h.BARKL:void 0},NM=n=>e=>{const t=Kn(e,10,3);return e[1]<n[1]-.2||t<.2?h.LEAF3:t>.8?h.LEAF2:void 0},ln=(n,e=0)=>t=>{const i=Kn(t,9,7);return t[1]>.05&&i<(n?.34:.12)&&Kn(t,3,1)<(n?.75:.45)?h.MOSS:e&&(t[1]*e%1<.1||((t[0]+t[2])*e*.7+Math.floor(t[1]*e)*.5)%1<.07)||i>.93?h.STONED:void 0},ut=(n,e,t,i,r,s={})=>n.box(e,t,h.STONE,{round:.03,rough:.012,group:i,paint:ln(r,s.courses??5),...s}),mn=(n,e,t,i,r)=>{const s=[];for(let a=0;a<=4;a++){const o=a/4;s.push([...T.add(T.lerp(e,t,o),[(Bt(r,a)-.5)*.15,0,.02]),.03])}n.chain(s,h.LEAF,{group:i,rough:.02,paint:a=>Kn(a,30)<.3?h.LEAF2:void 0})},mi=(n,e,t,i,r)=>{for(let s=0;s<e;s++){const a=Bt(r,s)*6.283,o=t*Math.sqrt(Bt(s,r)),c=Math.cos(a)*o,l=Math.sin(a)*o*.7;n.ell([c,.08,l],[.07,.1+Bt(s,4)*.08,.07],h.LEAF2,{group:i+s%3,paint:u=>u[1]>.14?h.LEAF:void 0})}},jn=(n,e,t,i)=>n.ell(e,t,h.LEAF,{group:i,rough:.04,paint:NM(e)}),bn=(n,e,t)=>n.chain(e,h.TRUNK,{group:t,rough:.012,paint:Cl}),gn=(n,e,t,i,r={})=>n.ell(e,t,h.STONE,{group:i,rough:.03,dir:r.dir,paint:s=>s[1]>e[1]+t[1]*(r.moss??.62)&&Kn(s,5,i)<.7?h.MOSS:Kn(s,14)>.9?h.STONED:void 0}),Dh=(n,e,t,i,r=h.MAGIC)=>n.ell(e,[t,t,t],r,{group:i,extra:!0}),UM={"broken-arch":{desc:"a broken arch, one side fallen, a rune on its keystone",glow:!0,split:null,build(n,e){for(const t of[-1,1])ut(n,[t,t<0?1:.7,0],[.22,t<0?1:.7,.25],1+(t>0?1:0),e);for(let t=0;t<=6;t++){const i=Math.PI*(1-t/9),r=[Math.cos(i)*1,2+Math.sin(i)*.7,0];ut(n,r,[.17,.14,.25],3+t%2,e,{dir:[-Math.sin(i),Math.cos(i),0],courses:0,paint:t===4?(s=>Math.abs(s[0]-r[0])<.05&&Math.abs(s[1]-r[1])<.08?h.RUNE:ln(e)(s)):ln(e)})}for(let t=0;t<4;t++)ut(n,[1.3+t*.3,.14,.4+Bt(t)*.5],[.17,.13,.22],6+t,e,{dir:[1,.3*(Bt(t,2)-.5),Bt(t,3)-.5],courses:0});e&&(mn(n,[-1.15,.1,.26],[-.9,1.9,.26],12,1),mi(n,14,1.8,14,2))}},"tower-stump":{desc:"a fallen tower's stump, a spiral stair climbing round its inside",split:2,build(n,e){for(let t=0;t<14;t++){const i=t/14*Math.PI*2,r=1+(Math.sin(i*2+1)*.5+.5)*1.6*(i>3.6&&i<5.4?1:.55);i>.9&&i<2||ut(n,[Math.cos(i)*1.05,r/2,Math.sin(i)*.95],[.25,r/2,.14],1+t%3,e,{dir:[-Math.sin(i),0,Math.cos(i)]})}for(let t=0;t<9;t++){const i=3.2+t*.42,r=.15+t*.26;ut(n,[Math.cos(i)*.7,r,Math.sin(i)*.6],[.24,.06,.12],5,e,{dir:[Math.cos(i),0,Math.sin(i)],courses:0})}for(let t=0;t<3;t++)ut(n,[.6+t*.35,.14,1.1],[.22,.13,.2],7,e,{dir:[1,0,.4*t],courses:0});e&&(mn(n,[-1.05,.1,-.4],[-1,2.3,-.5],10,3),mn(n,[.9,.1,-.6],[.95,1.7,-.55],11,4),n.ell([0,.2,0],[.55,.2,.5],h.LEAF,{group:12,rough:.04}))}},colonnade:{desc:"a colonnade, two columns standing and the rest toppled",split:null,build(n,e){ut(n,[0,.08,0],[2.2,.08,.55],1,e,{courses:0});for(const[t,i]of[[-1.7,1.9],[-.6,1.4]])n.seg([t,.16,0],[t,i,0],.18,.17,h.STONE,{group:2,rough:.01,paint:r=>Math.abs(Math.sin(Math.atan2(r[2],r[0]-t)*8))<.15?h.STONED:ln(e,0)(r)}),ut(n,[t,i+.07,0],[.26,.07,.26],3,e,{courses:0});for(const[t,i,r]of[[.6,.55,.3],[1.6,.4,-.4]])n.seg([t-Math.cos(r)*.7,.2,i-Math.sin(r)*.7],[t+Math.cos(r)*.7,.2,i+Math.sin(r)*.7],.18,.18,h.STONE,{group:4,paint:ln(e,0)});ut(n,[-1.15,2,0],[.75,.1,.28],5,e,{courses:0}),e&&(mn(n,[-1.7,.2,.18],[-1.65,1.8,.18],8,5),mi(n,16,2.2,10,6))}},"stone-ring":{desc:"a ring of standing-stone stubs",split:null,build(n,e){for(let t=0;t<9;t++){const i=t/9*Math.PI*2,r=.3+Bt(t,9)*(t%3===0?1.2:.45);ut(n,[Math.cos(i)*1.7,r/2,Math.sin(i)*1.35],[.2,r/2,.14],1+t%4,e,{dir:[-Math.sin(i),.1*(Bt(t)-.5),Math.cos(i)],courses:0,round:.07})}ut(n,[0,.1,0],[.55,.1,.35],6,e,{courses:0,round:.05}),e&&mi(n,20,2,10,7)}},"chapel-wall":{desc:"a ruined chapel wall with an empty pointed window, moonlight caught in it",glow:!0,split:2.4,build(n,e){ut(n,[0,1.4,0],[1.4,1.4,.18],1,e,{paint:t=>{const i=t[0],r=t[1];return Math.abs(i)<.38&&r>1.1&&r<2.3-Math.abs(i)*.5?void 0:ln(e,5)(t)}}),n.box([0,1.6,0],[.33,.55,.3],h.NOSE,{group:1,cut:!0}),n.ell([0,1.5,-.05],[.3,.5,.02],h.MAGIC2,{group:2,extra:!0,paint:t=>Kn(t,18)<.5?h.MAGIC:void 0});for(const[t,i]of[[-1.55,2.6],[1.5,1.6]])ut(n,[t,i/2,0],[.22,i/2,.26],3,e);for(let t=0;t<5;t++)ut(n,[-1.2+t*.6,.12,.55+Bt(t)*.3],[.18,.12,.16],4,e,{courses:0,dir:[1,0,Bt(t,5)-.5]});e&&(mn(n,[-1.2,.1,.2],[-.6,2.6,.2],6,8),mn(n,[1,.1,.2],[1.2,2,.2],7,9))}},well:{desc:"an old well with a broken winch, fireflies over the water",glow:!0,split:null,build(n,e){for(let t=0;t<12;t++){const i=t/12*Math.PI*2;ut(n,[Math.cos(i)*.55,.32,Math.sin(i)*.5],[.15,.32,.1],1+t%2,e,{dir:[-Math.sin(i),0,Math.cos(i)],courses:3})}n.ell([0,.55,0],[.42,.02,.38],h.WATER,{group:3});for(const t of[-.6,.6])n.box([t,1,0],[.06,.5,.06],h.WOOD,{group:4,round:.02});n.seg([-.6,1.4,0],[.1,1.25,.05],.04,.04,h.WOOD,{group:5}),n.seg([.1,1.25,.05],[0,.85,.1],.01,.01,h.STRAW,{group:5});for(let t=0;t<4;t++)Dh(n,[(Bt(t)-.5)*.8,.8+Bt(t,2)*.7,(Bt(t,3)-.5)*.6],.03,10+t,t%2?h.MAGIC:h.MAGIC2);e&&(mn(n,[-.55,.05,.5],[-.4,.62,.5],15,10),mi(n,10,1,16,11))}},watchtower:{desc:"a crumbled watchtower, tall enough to see from the treetops",split:2.6,build(n,e){ut(n,[0,1.2,0],[.7,1.2,.7],1,e,{paint:t=>Math.abs(t[1]-1.9)<.16&&Math.abs(t[0])<.07&&t[2]>.6?h.NOSE:ln(e,5)(t)});for(const[t,i,r]of[[-.5,-.5,1.3],[0,-.5,1],[.5,-.5,.7],[-.5,0,.9],[-.5,.5,.5],[.5,0,.3]])ut(n,[t,2.4+r/2,i],[.2,r/2,.2],1,e);n.box([0,.55,.7],[.25,.45,.1],h.NOSE,{group:1,cut:!0});for(let t=0;t<6;t++)ut(n,[.5+Bt(t)*1.2,.13,-.3+Bt(t,4)*1.2],[.17,.12,.15],2+t%2,e,{courses:0,dir:[1,0,Bt(t,5)-.5]});e&&(mn(n,[-.7,.1,.3],[-.7,2.4,.2],4,12),mn(n,[.3,.1,.72],[.5,1.8,.72],5,13),jn(n,[.1,2.6,-.2],[.45,.3,.4],6))}},"sunken-stair":{desc:"a stairway going down into the ground, a dark doorway at its foot",split:null,build(n,e){for(const t of[-.6,.6])ut(n,[0,.2,t],[1.1,.2,.12],1,e,{courses:2});for(let t=0;t<5;t++)ut(n,[.8-t*.32,.3-t*.07,0],[.16,.04,.5],2,e,{courses:0});n.box([-.55,.08,0],[.28,.1,.48],h.NOSE,{group:3}),ut(n,[-1.1,.55,0],[.15,.55,.62],4,e),ut(n,[-1.05,1.15,0],[.2,.1,.7],5,e,{courses:0}),e&&(mi(n,12,1.6,10,14),mn(n,[-1,1.2,.5],[-.9,.3,.62],13,15))}},"statue-head":{desc:"a toppled giant statue head, its eyes still faintly lit",glow:!0,split:null,build(n,e){const t=[0,.8,0],i=.62,r=(s,a)=>[t[0]+a,t[1]+s,t[2]+i];n.ell(t,[.8,1,.7],h.STONE,{group:1,rough:.012,dir:[1,.25,0],paint:ln(e,0)}),n.ell(r(.3,0),[.62,.14,.16],h.STONE,{group:2,paint:ln(e,0)});for(const s of[-.26,.26])n.ell(r(.12,s),[.15,.09,.1],h.STONED,{group:1,cut:!0}),Dh(n,r(.12,s),.05,3+(s>0?1:0),h.MAGIC);n.ell(r(-.08,0),[.11,.24,.14],h.STONE,{group:5,paint:ln(e,0)}),n.ell(r(-.42,0),[.3,.07,.08],h.STONE,{group:6,paint:s=>Math.abs(s[1]-(t[1]-.42))<.015?h.STONED:ln(e,0)(s)});for(const[s,a]of[[-.55,.75],[0,.95],[.5,.8],[-.7,.3],[.75,.3]])n.ell([t[0]+s,t[1]+a,t[2]-.2],[.3,.25,.45],h.STONE,{group:7,rough:.02,paint:ln(e,0)});n.ell([t[0],.05,t[2]+.2],[1,.1,.8],h.STONE,{group:8,paint:ln(e,0)}),e&&(mi(n,14,1.8,10,16),jn(n,T.add(t,[-.2,.95,-.2]),[.5,.25,.45],6))}},hearth:{desc:"a collapsed cottage: its hearth and chimney still standing",split:2.6,build(n,e){ut(n,[0,1.6,-.2],[.45,1.6,.35],1,e),n.box([0,.45,.1],[.3,.3,.3],h.NOSE,{group:1,cut:!0});for(const[t,i,r,s,a]of[[-1.1,.4,.9,.5,0],[1,.5,.7,.35,0],[-1.9,-.2,.12,.35,1]])ut(n,[t,s/2,i],a?[.12,s/2,.7]:[r,s/2,.12],2,e);for(let t=0;t<4;t++)n.seg([-.5+t*.4,.08,.9],[.2+t*.5,.3,.3+t*.1],.05,.05,h.BARKD,{group:3});e&&(mn(n,[-.4,.1,.16],[-.3,2.8,.16],5,17),mi(n,14,1.8,10,18))}},"bridge-span":{desc:"an old bridge span going nowhere, one arch over nothing",split:null,build(n,e){ut(n,[-.9,.7,0],[.35,.7,.5],1,e),ut(n,[.95,.55,0],[.3,.55,.5],2,e);for(let t=0;t<=8;t++){const i=t/8,r=Math.PI*(1-i),s=[Math.cos(r)*.85,.9+Math.sin(r)*.55,0];ut(n,s,[.14,.12,.5],3+t%2,e,{dir:[-Math.sin(r),Math.cos(r),0],courses:0})}ut(n,[-.1,1.62,0],[1.25,.1,.55],5,e,{courses:0,dir:[1,-.08,0]});for(const t of[-.5,.5])ut(n,[-.2,1.85,t],[1,.14,.06],6,e,{courses:0});e&&(mn(n,[-1.2,.1,.5],[-1,1.6,.55],8,19),mi(n,10,1.6,10,20))}},gateway:{desc:"an overgrown gateway, two posts and a rusted gate, a rune glowing on one post",glow:!0,split:null,build(n,e){for(const t of[-.9,.9])ut(n,[t,.9,0],[.22,.9,.22],1+(t>0?1:0),e,{paint:t<0?(i=>i[2]>.2&&Math.abs(i[1]-1.1)<.14&&Math.abs(i[0]-t)<.06?h.RUNE:ln(e,5)(i)):ln(e,5)}),n.ell([t,1.9,0],[.18,.14,.18],h.STONE,{group:3,paint:ln(e,0)});for(let t=0;t<6;t++)n.seg([-.65+t*.12,.1,.1+t*.06],[-.65+t*.12,1.2,.1+t*.06],.015,.015,h.SHADES,{group:4});for(const t of[.25,1.1])n.seg([-.65,t,.1],[-.05,t,.4],.018,.018,h.SHADES,{group:4});for(const t of[-1,1])for(let i=0;i<3;i++)ut(n,[t*(1.3+i*.35),.3-i*.08,0],[.17,.3-i*.08,.14],5,e);e&&(mn(n,[.75,.05,.22],[.85,1.9,.22],7,21),mn(n,[-.9,1.8,.22],[-.3,1,.3],8,22),mi(n,12,1.6,10,23))}}},OM={pebbles:{desc:"a cluster of fist-sized stones",build(n){for(let e=0;e<7;e++)gn(n,[(Bt(e)-.5)*.6,.04,(Bt(e,2)-.5)*.4],[.07+Bt(e,3)*.05,.05,.07],1+e,{moss:.8})}},pair:{desc:"two small rocks",build(n){gn(n,[-.15,.12,0],[.22,.15,.2],1),gn(n,[.2,.08,.12],[.14,.1,.13],2)}},rock:{desc:"a knee-high rock",build(n){gn(n,[0,.22,0],[.45,.3,.38],1,{dir:[1,.15,.2]})}},split:{desc:"a rock split in two, a seedling in the crack",build(n){gn(n,[-.28,.35,0],[.3,.45,.45],1,{dir:[1,.3,0]}),gn(n,[.3,.33,0],[.3,.42,.45],2,{dir:[1,-.3,0]}),n.seg([.02,.2,.1],[0,.6,.1],.015,.01,h.TRUNK,{group:3}),jn(n,[0,.62,.1],[.1,.07,.1],4)}},boulder:{desc:"a big boulder",build(n){gn(n,[0,.55,0],[.85,.75,.7],1,{dir:[1,.1,.3]}),gn(n,[.7,.15,.5],[.22,.15,.2],2)}},"great-boulder":{desc:"a great mossy boulder, a landmark",build(n){gn(n,[0,.9,0],[1.4,1.15,1.1],1,{dir:[1,.2,.1],moss:.2}),gn(n,[-1.1,.3,.6],[.4,.35,.35],2),gn(n,[1.2,.2,.5],[.3,.22,.28],3)}},slab:{desc:"a flat slab of rock",build(n){n.box([0,.12,0],[1,.12,.7],h.STONE,{round:.08,rough:.02,group:1,dir:[1,.04,.2],paint:e=>e[1]>.2&&Kn(e,6)<.3?h.MOSS:Kn(e,14)>.9?h.STONED:void 0})}},"standing-rock":{desc:"a tall natural standing rock",build(n){gn(n,[0,.8,0],[.35,.85,.3],1,{moss:.8}),gn(n,[.35,.1,.25],[.15,.1,.14],2)}}},FM={"spiral-tree":{desc:"a tree whose trunk twists in a spiral",split:2.4,build(n){const e=[];for(let t=0;t<=10;t++){const i=t/10,r=i*Math.PI*4;e.push([Math.cos(r)*.35*(1-i*.4),i*3,Math.sin(r)*.3,.2-i*.12])}bn(n,e,1),jn(n,[0,3.2,0],[.9,.6,.8],2)}},"loop-tree":{desc:"a tree grown into a loop",split:2.4,build(n){const e=[[0,0,0,.22],[.1,.9,0,.18]];for(let t=0;t<=10;t++){const i=-Math.PI/2+t/10*Math.PI*2;e.push([.1+Math.cos(i)*.55+t*.02,1.45+Math.sin(i)*.55,0,.15])}e.push([.3,2.6,0,.1]),bn(n,e,1),jn(n,[.3,2.9,0],[.75,.5,.65],2)}},"split-tree":{desc:"a tree split by lightning, both halves still leafing",split:2,build(n){bn(n,[[0,0,0,.3],[0,.9,0,.26]],1),bn(n,[[-.05,.9,0,.18],[-.6,1.9,0,.13],[-1,2.6,0,.07]],2),bn(n,[[.05,.9,0,.18],[.55,1.8,.05,.13],[.9,2.4,.05,.07]],3),n.ell([0,1,.05],[.08,.25,.2],h.BARKD,{group:1,cut:!0}),jn(n,[-1,2.7,0],[.6,.45,.5],4),jn(n,[.95,2.5,.05],[.55,.4,.5],5)}},"door-tree":{desc:"a fat old tree with a little round door in it, a lit window above",glow:!0,split:2.3,build(n){n.ell([0,1,0],[.8,1.1,.75],h.TRUNK,{group:1,rough:.02,paint:e=>e[2]>.5&&Math.hypot(e[0],e[1]-.45)<.3&&e[1]>.2?Math.hypot(e[0],e[1]-.45)<.25?Math.abs(e[0]%.1)<.015?h.BARKD:h.ACCENT:h.BARKD:e[2]>.45&&Math.hypot(e[0]-.3,e[1]-1.3)<.13?Math.abs(e[0]-.3)<.015||Math.abs(e[1]-1.3)<.015?h.BARKD:h.GLOW:Cl(e)}),n.ell([.12,.45,.72],[.03,.03,.03],h.FRAME,{group:2}),jn(n,[0,2.4,-.1],[1.1,.7,.9],3);for(let e=0;e<5;e++){const t=e/5*Math.PI*2;bn(n,[[Math.cos(t)*.6,.2,Math.sin(t)*.55,.15],[Math.cos(t)*1.1,.02,Math.sin(t)*1,.05]],4)}}},"mushroom-tree":{desc:"an enormous mushroom, tall as a tree",split:2.2,build(n){n.seg([0,0,0],[.1,2.4,0],.3,.22,h.CLOTH,{group:1,paint:e=>e[1]>2&&e[1]<2.15?h.BELLY:void 0}),n.ell([.1,2.55,0],[1.3,.45,1.15],h.ACCENT,{group:2,rough:.01,paint:e=>e[1]<2.35?h.BODY2:Kn(e,8)<.18?h.BELLY:void 0}),n.ell([.1,2.35,0],[1.2,.08,1.05],h.BODY2,{group:3,paint:e=>Math.abs(Math.sin(Math.atan2(e[2],e[0]-.1)*20))<.3?h.STRAW:void 0})}},"root-tree":{desc:"an upside-down-looking tree, its roots raised high like a crown",split:2,build(n){bn(n,[[0,0,0,.35],[0,1.6,0,.25]],1);for(let e=0;e<7;e++){const t=e/7*Math.PI*2;bn(n,[[0,1.6,0,.16],[Math.cos(t)*.7,2.2+Bt(e)*.3,Math.sin(t)*.6,.1],[Math.cos(t)*1.2,2.5+Bt(e,2)*.4,Math.sin(t)*1,.04]],2+e%2)}for(let e=0;e<4;e++){const t=e/4*Math.PI*2+.4;bn(n,[[Math.cos(t)*.25,.3,Math.sin(t)*.25,.14],[Math.cos(t)*.6,.02,Math.sin(t)*.55,.05]],4)}}},"stone-lifter":{desc:"a tree that has lifted great stones up in its roots",split:2.4,build(n){bn(n,[[0,.6,0,.3],[0,2,0,.22],[.1,2.8,0,.12]],1);for(let e=0;e<6;e++){const t=e/6*Math.PI*2;bn(n,[[Math.cos(t)*.2,.6,Math.sin(t)*.2,.15],[Math.cos(t)*.6,.45,Math.sin(t)*.55,.12],[Math.cos(t)*.9,0,Math.sin(t)*.8,.07]],2)}for(const[e,t,i]of[[.5,.45,.9],[-.5,.4,1.1],[.15,-.5,.8]])gn(n,[e,i,t],[.3,.24,.26],3);jn(n,[.1,3,0],[1,.6,.85],4)}},"ring-tree":{desc:"a hollow ring of a tree you could fly through",split:null,build(n){for(let e=0;e<=16;e++){const t=e/16*Math.PI*2,i=[Math.cos(t)*1.2,1.35+Math.sin(t)*1.2,0];n.ell(i,[.3,.3,.3],h.TRUNK,{group:1,rough:.02,paint:Cl})}bn(n,[[-.6,0,.2,.3],[-.5,.3,.1,.3]],2),bn(n,[[.6,0,.2,.3],[.5,.3,.1,.3]],2);for(const[e,t]of[[-.9,2.3],[.3,2.65],[1.1,2]])jn(n,[e,t,-.1],[.45,.3,.35],3)}}},BM=[...Object.entries(UM).map(([n,e])=>({id:n,family:"ruins",size:1.15,variants:2,...e})),...Object.entries(OM).map(([n,e])=>({id:n,family:"rocks",size:1,variants:1,split:null,...e})),...Object.entries(FM).map(([n,e])=>({id:n,family:"freak",size:1.2,variants:1,...e}))];Object.fromEntries(BM.map(n=>[n.id,n]));const Ta=[{id:"stack",crystal:"cyan",tiers:[["bass",4,[.24,.25,.28]],["mid",2,[.46,.15,.25]],["horn",4,[.21,.22,.23]],["tweet",2,[.21,.08,.17]]]},{id:"wall",crystal:"violet",tiers:[["bass",3,[.31,.3,.3]],["mid",2,[.44,.16,.26]],["horn",2,[.3,.25,.24]],["tweet",1,[.26,.09,.18]]]},{id:"tower",crystal:"amber",tiers:[["bass",2,[.28,.27,.29]],["bass",2,[.25,.24,.27]],["horn",2,[.25,.23,.23]],["tweet",3,[.15,.07,.15]]]}],zM={cyan:[[60,220,255],[210,250,255],[150,205,225]],violet:[[175,95,255],[240,215,255],[180,160,225]],amber:[[255,170,50],[255,238,200],[225,190,140]]};function kM(n=0){const[e,t,i]=zM[Ta[n%Ta.length].crystal];return{[h.STONE]:[78,80,94],[h.STONED]:[36,36,48],[h.MOSS]:[72,108,58],[h.CRYSTAL]:i,[h.RUNE]:e,[h.GLOW]:e,[h.MAGIC2]:t,[h.WOOD]:[150,96,52],[h.LINE]:[24,24,34]}}function Ih(n,e,t,i){const r=Ta[n%Ta.length],s=new Xe({blend:.02}),a=t==="damaged",o=a?0:[0,.5,1][e%3],c=b=>a&&Pt(b,e,31)<.5;let l=0,u=1,f=.3,d=0,p=n*7;const g=(b,A,P,C)=>N=>{if(C&&Math.abs(Math.sin(N[0]*37+N[1]*23+Math.sin(N[2]*17)*2))<.07)return h.STONED;if(N[1]>b-.02&&(N[2]>A-.06||Pt(Math.floor(N[0]*30),Math.floor(N[2]*30),P)<.2)&&Pt(Math.floor(N[0]*40),Math.floor(N[2]*40),P+1)<.6)return h.MOSS},v=(b,A,P,C,N,U)=>{const D=c(U),O=1+o*.08;s.ell([b,A,P],[C*1.18,C*1.18,.06],h.STONED,{group:N,cut:!0}),s.ell([b,A,P-.02],[C*O,C*O,.035+o*.025],h.CRYSTAL,{group:900+U,paint:z=>{const V=Math.hypot(z[0]-b,z[1]-A)/(C*O);return D?V<.3?h.GLOW:h.CRYSTAL:V<.2+o*.15?h.MAGIC2:V<.5?h.GLOW:V<.78?h.CRYSTAL:h.GLOW}})},x=(b,A,P,C,N,U,D,O)=>z=>{if(z[0]>b+C-.022){const V=Math.min(P,N)*1.5,Q=(U-N-z[2])/V+.5,Y=(A-z[1])/V+.5;if(Q>=0&&Q<=1&&Y>=0&&Y<=1&&(i?yf(i,Q,Y,.065):Hh(Q,Y,D,.12)))return a&&Pt(D,e,5)<.5?h.STONED:h.RUNE}return O(z)},m=r.tiers,M=m[0][1]*m[0][2][0]+.02,_=.08,S=m[0][2][2];s.box([0,_,f-S],[M,_,S],h.STONE,{group:u,round:.03,rough:.006,paint:g(_*2,f,3,a)}),s.box([0,_*.9,f],[M-.06,_*.45,.12],h.STONED,{group:u,cut:!0,paint:b=>b[2]<f-.07?h.GLOW:void 0});for(let b=1;b<m[0][1];b++)s.box([-M+b*M*2/m[0][1],_*.9,f-.06],[.015,_*.45,.06],h.STONE,{group:u});l=_*2,u++;const w=[];m.forEach(([b,A,[P,C,N]],U)=>{const D=b==="tweet"?.09:0,O=A*P*2+(A-1)*(b==="tweet"?.14:.01),z=f-U*.035,V=l+D+C;for(let Q=0;Q<A;Q++){const Y=-O/2+P+Q*(P*2+(b==="tweet"?.14:.01));if(a&&b==="horn"&&Q===A-1){w.push([Y,P,C,N]);continue}const te=a&&b==="tweet"?[1,.12*(Q%2?1:-1),0]:void 0,F=a&&b==="tweet"?V-.04:V,ne=g(F+C,z-N+N,u,a),ce=Q===A-1-(a&&b==="horn"?1:0)&&b!=="tweet";if(s.box([Y,F,z-N],[P-.005,C,N],h.STONE,{group:u,round:.035,rough:.004,dir:te,paint:ce?x(Y,F,C,P-.005,N,z,p++,ne):ne}),b==="bass"&&v(Y,V+.02,z,Math.min(P,C)*.72,u,d++),b==="mid"&&(s.ell([Y,V,z],[P*.8,C*.7,N*.9],h.STONED,{group:u,cut:!0,paint:be=>be[2]<z-N*.45?c(d)?h.STONED:h.GLOW:void 0}),s.box([Y,V,z-N*.5],[.018,C*.6,N*.45],h.STONE,{group:u}),d++),b==="horn"){const be=V+C*.25;s.seg([Y,be,z-N*1.5],[Y,be,z+.03],.03,Math.min(P,C)*.78,h.STONED,{group:u,cut:!0,paint:Ue=>Ue[2]<z-N*.55?c(d)?h.STONED:h.GLOW:void 0}),v(Y,V-C*.6,z,C*.22,u,d++)}if(b==="tweet")for(const be of[-.5,0,.5])v(Y+be*P*1.15,F,z,C*.55,u,d++);u++}if(b!=="tweet"){const Q=a&&b==="horn"?P:0;s.box([-Q,l+C*2+.012,z-.015],[O/2+.01-Q,.012,.015],h.WOOD,{group:u++,round:.008}),l+=.024}b==="tweet"&&!a&&s.flat([0,l+D/2,z-N],[1,0,0],[0,1,0],O/2,D/2,(Q,Y)=>Math.abs(Y)<.45&&Math.sin(Q*23)>-.4?h.GLOW:null,{group:u++,bend:0}),l+=C*2+D});const E=l;if([[-M-.04,.25,.34,-.3],[M+.02,.2,.3,.35],[-M+.15,.4,.22,-.1],[M-.2,.42,.18,.2],[.1,.45,.16,.15],[-M-.1,-.25,.26,-.4],[M+.08,-.2,.24,.45]].forEach(([b,A,P,C],N)=>{if(a&&N%2){s.seg([b,.03,A],[b+.12,.05,A+.04],.04,.02,h.CRYSTAL,{group:700+N});return}const U=[b+C*P,P,A+.05];s.seg([b,0,A],U,.045+P*.05,.006,h.CRYSTAL,{group:700+N,paint:D=>D[1]>P*(.65-o*.1)&&!a?h.GLOW:void 0}),s.seg([b+.04,0,A-.03],[b+.04+C*P*.5,P*.55,A],.03,.005,h.CRYSTAL,{group:720+N})}),!a)for(const[b,A,P,C]of[[-.55,.1,.1,.03],[.6,.16,0,.025],[.15,.24,-.1,.02]])s.ell([b,E+A-.1,P],[C,C*.8,C],h.STONE,{group:800+Math.round(b*100),extra:!0,rough:.004});for(const[b,A,P,C]of w)s.box([b+.45,A*.75,f+.25],[A,P,C],h.STONE,{group:u++,dir:[.6,.8,.2],round:.035,rough:.007,paint:g(1,0,9,!0)});return{m:s,top:E}}function GM(n){const e=new Xe({blend:.02}),t=(i,r)=>Pt(i,r,n*13+7);e.ell([.1,.1,.62],[.14,.12,.1],h.GLOW,{group:1,paint:i=>i[1]>.16?h.MAGIC2:void 0}),e.seg([.1,.1,.6],[.02,.5,.66],.07,.01,h.GLOW,{group:2,paint:i=>i[1]>.35?h.MAGIC2:h.CRYSTAL});for(let i=0;i<16;i++){const r=i*2.4,s=.15+t(i,1)*.75,a=Math.cos(r)*s,o=Math.sin(r)*s*.6,c=.09+t(i,2)*.1,l=Math.max(.05,(.8-s)*.45)+c*.5;e.box([a,l*.7,o],[c*1.3,c,c*1.1],h.STONE,{group:10+i,dir:[Math.cos(r*1.7),.4+t(i,3),Math.sin(r*2.3)],round:.03,rough:.008,paint:u=>Math.abs(Math.sin(u[0]*41+u[1]*29))<.08?h.STONED:u[1]>l*.7+c*.6&&t(i,4)<.25?h.MOSS:void 0})}for(let i=0;i<4;i++){const r=i*1.7+1,s=Math.cos(r)*.4,a=Math.sin(r)*.25;e.ell([s,.05,a],[.09,.08,.03],h.CRYSTAL,{group:50+i,dir:[Math.cos(r),.5,Math.sin(r)],paint:o=>t(i,5)<.3?h.GLOW:void 0})}for(let i=0;i<4;i++){const r=-.7+i*.45;e.seg([r,0,.4-i*.1],[r+.1,.08+t(i,6)*.1,.42-i*.1],.03,.01,h.CRYSTAL,{group:60+i})}return e}function Nh(n,e,t){let i=0;for(let r=0;r<2e3&&i<e;r++){const s=Math.floor(Pt(r,t,1)*n.w),a=Math.floor(Pt(r,t,2)*n.h*.7);n.get(s,a)||n.get(s+1,a)||n.get(s-1,a)||n.get(s,a+1)||n.get(s,a-1)||n.get(s,a+2)||(n.px(s,a,i%3?h.GLOW:h.MAGIC2),i++)}return n}const HM=n=>Dl(n)*3,Lo=new Map;function WM(n={},{variant:e=0,frame:t=0,state:i="playing",sigil:r}={}){const s=HM(n),a=e+":"+s;Lo.has(a)||Lo.set(a,Tn(Ih(e,0,"playing").m,{height:s}).s);const o=Lo.get(a);if(i==="destroyed")return Nh(Tn(GM(e),{scale:o}).sp,3,e*5+1);const{sp:c}=Tn(Ih(e,t,i,r).m,{scale:o});return Nh(c,i==="damaged"?4:10+t*2,e*5+t)}const VM=[{k:"ambientHue",g:"Night light",label:"Twilight hue",min:0,max:1,step:.01,v:.68,hue:!0},{k:"ambient",g:"Night light",label:"Twilight brightness",min:.05,max:.6,step:.01,v:.22},{k:"moon",g:"Night light",label:"Moonlight",min:0,max:1,step:.01,v:.3},{k:"moonHue",g:"Night light",label:"Moon hue",min:0,max:1,step:.01,v:.58,hue:!0},{k:"glowHue",g:"Night light",label:"Witch glow hue",min:0,max:1,step:.01,v:.13,hue:!0},{k:"glowSat",g:"Night light",label:"Witch glow colour",min:0,max:1,step:.01,v:.35},{k:"glowRadius",g:"Night light",label:"Witch glow reach",min:30,max:200,step:5,v:110},{k:"glowPower",g:"Night light",label:"Witch glow strength",min:.3,max:2.5,step:.05,v:1.4},{k:"bands",g:"Shading",label:"Light steps",min:2,max:7,step:1,v:3},{k:"dither",g:"Shading",label:"Dithering",min:0,max:1,step:.05,v:.35},{k:"round",g:"Shading",label:"Roundness",min:.2,max:1.5,step:.05,v:.9},{k:"outline",g:"Shading",label:"Plant outline",options:["none","dark","tinted"],v:"none"},{k:"cOutline",g:"Shading",label:"Creature outline",options:["dark","tinted","none"],v:"dark"},{k:"shafts",g:"Night light",label:"Moonbeams",min:0,max:1,step:.05,v:.3},{k:"areaContrast",g:"Colour",label:"Difference between areas",min:0,max:1,step:.05,v:.6},{k:"sat",g:"Colour",label:"Saturation",min:.2,max:1.3,step:.01,v:.9},{k:"leafHue",g:"Colour",label:"Leaf hue",min:0,max:1,step:.01,v:.3,hue:!0},{k:"leafVariety",g:"Colour",label:"Leaf colour variety",min:0,max:1,step:.05,v:.3},{k:"trunkHue",g:"Colour",label:"Bark hue",min:0,max:1,step:.01,v:.07,hue:!0},{k:"groundHue",g:"Colour",label:"Ground hue",min:0,max:1,step:.01,v:.27,hue:!0},{k:"groundVal",g:"Colour",label:"Ground brightness",min:.15,max:.7,step:.01,v:.4},{k:"pixel",g:"Shading",label:"Pixel size",min:1,max:5,step:1,v:3},{k:"treeSize",g:"Trees",label:"Tree height",min:.5,max:1.5,step:.05,v:.85},{k:"crownWidth",g:"Trees",label:"Crown width",min:1,max:4,step:.1,v:3},{k:"clearing",g:"Trees",label:"Clearing size",min:0,max:1,step:.05,v:.55},{k:"depth",g:"Map",label:"Border detail (fractal layers)",min:0,max:6,step:1,v:4},{k:"areaScale",g:"Map",label:"Area size (screens)",min:.6,max:2,step:.05,v:1},{k:"areaTypes",g:"Map",label:"Area types",min:4,max:30,step:1,v:30},{k:"density",g:"Trees",label:"Foliage density",min:.2,max:1,step:.05,v:.55},{k:"clump",g:"Trees",label:"Clumpiness",min:0,max:1,step:.05,v:.6},{k:"gnarl",g:"Trees",label:"Gnarliness",min:0,max:1,step:.05,v:.5},{k:"roots",g:"Trees",label:"Roots",min:0,max:1,step:.05,v:.6},{k:"bark",g:"Trees",label:"Bark texture",min:0,max:1,step:.05,v:.6},{k:"trees",g:"Trees",label:"Tree density",min:.2,max:2,step:.05,v:1},{k:"wBroad",g:"Tree mix",label:"Gnarled broadleaf",min:0,max:1,step:.05,v:.8},{k:"wFir",g:"Tree mix",label:"Fir",min:0,max:1,step:.05,v:.6},{k:"wWillow",g:"Tree mix",label:"Willow",min:0,max:1,step:.05,v:.5},{k:"wBirch",g:"Tree mix",label:"Birch",min:0,max:1,step:.05,v:.5},{k:"wPalm",g:"Tree mix",label:"Tree fern",min:0,max:1,step:.05,v:.3},{k:"wFlat",g:"Tree mix",label:"Flat-crowned",min:0,max:1,step:.05,v:.5},{k:"bushes",g:"Undergrowth",label:"Bushes and shrubs",min:0,max:120,step:1,v:55},{k:"bushSize",g:"Undergrowth",label:"Bush size",min:.5,max:1.8,step:.05,v:1},{k:"flowers",g:"Undergrowth",label:"Flowers",min:0,max:1,step:.05,v:.3},{k:"cSat",g:"Creatures",label:"Creature saturation",min:.1,max:1,step:.01,v:.6},{k:"cVal",g:"Creatures",label:"Creature brightness",min:.4,max:1,step:.01,v:.85},{k:"head",g:"Creatures",label:"Baby head size",min:.3,max:.6,step:.01,v:.44},{k:"eye",g:"Creatures",label:"Eye size",min:.5,max:2,step:.05,v:1},{k:"legs",g:"Creatures",label:"Leg length",min:.5,max:1.8,step:.05,v:1},{k:"long",g:"Creatures",label:"Body length",min:.7,max:1.5,step:.05,v:1},{k:"size",g:"Creatures",label:"Baby size (px)",min:5,max:14,step:1,v:8},{k:"growth",g:"Creatures",label:"Legend vs baby height",min:5,max:25,step:1,v:20},{k:"magicHue",g:"Creatures",label:"Magic glow hue",min:0,max:1,step:.01,v:.5,hue:!0},{k:"fur",g:"Creatures",label:"Stripes and spots",min:0,max:1,step:.05,v:.5},{k:"cloakHue",g:"Witch",label:"Jacket hue",min:0,max:1,step:.01,v:.72,hue:!0},{k:"hairHue",g:"Witch",label:"Hair hue",min:0,max:1,step:.01,v:.01,hue:!0},{k:"hatHue",g:"Witch",label:"Hat hue",min:0,max:1,step:.01,v:.74,hue:!0},{k:"topHue",g:"Witch",label:"Top hue",min:0,max:1,step:.01,v:.13,hue:!0},{k:"jeansHue",g:"Witch",label:"Jeans hue",min:0,max:1,step:.01,v:.6,hue:!0},{k:"shoeHue",g:"Witch",label:"Sneakers hue",min:0,max:1,step:.01,v:0,hue:!0},{k:"phonesHue",g:"Witch",label:"Headphones hue",min:0,max:1,step:.01,v:.92,hue:!0}];function XM(){const n={};return VM.forEach(e=>n[e.k]=e.v),n}const YM={broad:eu,fir:zl,willow:tu,birch:nu,flat:iu};function KM(n,e,t,i,r){const s=YM[e.type],a={...t,leafHue:n.leaf+(e.dark?.05:0),gnarl:e.gnarl??t.gnarl,treeBare:e.bare,treeTrunks:e.trunks,treeLean:e.lean,treeThick:e.thick,treeThin:e.thin,treeHollow:e.hollow,treeWebs:e.webs},o=s(i,a,t.treeSize*r*(e.scale||1)*ye(i,.9,1.1)),c=kl(i,a,s);return e.dark&&(c[h.LEAF]=c[h.LEAF3],c[h.LEAF3]=ge(n.leaf+.05,.7,.22)),c[h.NOSE]=[20,16,24],c[h.GLINT]=[235,235,240],{parts:Ef(o),colours:c}}function qM(n,e,t,i,r){const s=Cn[t].id,a=gs.find(p=>p.id===s),o=Df(s,n,{K:i,makeCanvas:r}),c=[],l=p=>c.push(p)-1,u={big:[],small:[],walls:[],set:null},f=(p,g)=>Ii(p,g,n,"none",r),d=(p,g)=>{const{parts:v,colours:x}=KM(a,p,n,Ui(e*13+t*101+g*7+1),i);return{bot:l(f(v.bot,x)),top:l(f(v.top,x))}};a.big.forEach(([p,g],v)=>{if(p!=="tree"){u.big.push({bot:l(o.big[v].sp),top:null});return}const x=Math.max(1,Math.round(au/a.big.length));for(let m=0;m<x;m++)u.big.push(d(g,v*17+m))}),a.small.forEach(([p,g],v)=>u.small.push(p==="tree"?d(g,500+v):{bot:l(o.small[v].sp),top:null}));for(const p of o.walls)u.walls.push(l(p.sp));return o.setPiece&&(u.set=a.set?.[0]==="tree"?d(a.set[1],900):{bot:l(o.setPiece.sp),top:null}),{sprites:c,layout:u,floor:o.floor.sp}}function Uh(n,e,t,i=null){const r=[];for(const s of["towards","away"])for(let a=0;a<4;a++)for(let o=0;o<2;o++)r.push(Ii(hf(e,a,o,n,s,i),of(e,n,i),n,n.cOutline,t));return r}const $M=(n,e,t=!1)=>(t?8:0)+n*2+e;function Ra(n,e,t){return n.getContext("2d").getImageData(0,0,e,t).data}function da(n,e=2048){const i=[];let r=0,s=0,a=0,o=1;for(const d of n)r+d.w+1>e&&(r=0,s+=a+1,a=0),i.push({x:r,y:s}),r+=d.w+1,a=Math.max(a,d.h),o=Math.max(o,r);const c=Math.max(1,s+a),l=new Uint8Array(o*c*4),u=new Uint8Array(o*c*4),f=n.map((d,p)=>{const g=i[p],v=Ra(d.A,d.w,d.h),x=Ra(d.N,d.w,d.h);for(let m=0;m<d.h;m++){const M=m*d.w*4,_=((g.y+m)*o+g.x)*4;l.set(v.subarray(M,M+d.w*4),_),u.set(x.subarray(M,M+d.w*4),_)}return{uv:[g.x/o,g.y/c,(g.x+d.w)/o,(g.y+d.h)/c],w:d.w,h:d.h}});return{albedo:l,normal:u,width:o,height:c,frames:f}}function ZM(n,e){if(n.kind==="creature")return{px:da(Uh(n.style,n.id,e),2048)};if(n.kind==="party")return{px:da(Uh(n.style,n.species,e,{...af(n.seed),collar:n.colour}),2048)};const{sprites:t,layout:i,floor:r}=qM(n.style,n.seed,n.id,n.K,e);return{px:da(t),layout:i,floor:{albedo:new Uint8Array(Ra(r.A,r.w,r.h)),normal:new Uint8Array(Ra(r.N,r.w,r.h)),w:r.w,h:r.h}}}function Oh(n,e,t){const i=new Ar(n,e,t,En,wn);return i.magFilter=Ht,i.minFilter=Ht,i.generateMipmaps=!1,i.flipY=!1,i.colorSpace=Wn,i.needsUpdate=!0,i}function Zu(n){return{albedo:Oh(n.albedo,n.width,n.height),normal:Oh(n.normal,n.width,n.height),frames:n.frames}}const js=(n,e=2048)=>Zu(da(n,e));class JM{constructor(e,t,i){this.style=e,this.seed=t,this.K=2/i;const r=yd(e),s=c=>Ii(Pd(e,c),r,e,e.cOutline);this.witch=js([0,1,2].map(c=>s({frame:c})).concat([0,1,2].map(c=>s({frame:c,facing:"away"})),[s({lean:!0}),s({lean:!0,facing:"away"})],...["rise","descend"].flatMap(c=>["towards","away"].flatMap(l=>[0,1].map(u=>s({pose:c,frame:u,facing:l}))))),1024),this.stones=js([0,1,2,3].map(c=>this.stone(c)));const a=Ff(e);this.props=js([...a.campfire,a.stones.cyan,a.stones.violet,a.stones.green],1024);const o=[];for(let c=0;c<3;c++)for(let l=0;l<3;l++)o.push(Ii(WM(e,{variant:c,frame:l,state:"playing"}),kM(c),e,e.cOutline));if(this.soundsystems=js(o,2048),this.useWorkers=typeof Worker<"u"&&typeof OffscreenCanvas<"u",this.useWorkers){const c=Math.max(1,Math.min(3,(navigator.hardwareConcurrency||2)-1));try{for(let l=0;l<c;l++){const u=new Worker(new URL(""+new URL("artWorker-DacgKhdY.js",import.meta.url).href,import.meta.url),{type:"module"}),f={w:u,busy:!1};u.onmessage=d=>{f.busy=!1,f.job=void 0,this.receive(d.data),this.dispatch()},u.onerror=()=>{this.useWorkers=!1,f.job&&this.queue.unshift(f.job),f.busy=!1,f.job=void 0},this.workers.push(f)}}catch{this.useWorkers=!1}}}style;seed;types=new Map;creatures=new Map;queue=[];inFlight=new Set;workers=[];useWorkers;witch;stones;props;soundsystems;K;version=0;onFloor=()=>{};stone(e){const t=Ui(this.seed*3+e),i=5+Math.floor(t()*3),r=7+Math.floor(t()*5),s=new Mn(i+2,r+1);return s.ellipse((i+2)/2,r/2+1,i/2,r/2+.5,h.BODY,{round:this.style.round}),s.ellipse((i+2)/2-1,r/2,i/3,r/3,h.BODY2,{round:this.style.round,onlyOn:new Set([h.BODY]),density:.5,seed:e}),Ii(s,{[h.BODY]:[178,174,162],[h.BODY2]:[140,138,130]},this.style,"dark")}key=e=>e.kind+":"+e.id;ask(e){const t=this.key(e);this.inFlight.has(t)||(this.inFlight.add(t),this.queue.push(e),this.dispatch())}dispatch(){if(this.useWorkers)for(const e of this.workers)e.busy||!this.queue.length||(e.busy=!0,e.job=this.queue.shift(),e.w.postMessage(e.job))}receive(e){if(!e.result){console.warn("art worker failed, drawing on the page:",e.error),this.useWorkers=!1,this.queue.unshift(e.job);return}const t=Zu(e.result.px);e.job.kind==="type"?(this.types.set(e.job.id,{atlas:t,layout:e.result.layout}),e.result.floor&&this.onFloor(e.job.id,e.result.floor)):this.creatures.set(e.job.id,{atlas:t,frame:$M}),this.inFlight.delete(this.key(e.job)),this.version++}typeArt(e){const t=this.types.get(e);return t||this.ask({kind:"type",id:e,style:this.style,seed:this.seed,K:this.K}),t}creatureArt(e){const t=this.creatures.get(e);return t||this.ask({kind:"creature",id:e,style:this.style}),t}partyArt(e,t,i){const r=`party-${t}`,s=this.creatures.get(r);return s||this.ask({kind:"party",id:r,species:e,seed:t,colour:i,style:this.style}),s}prefetchType(e){this.types.has(e)||this.typeArt(e)}get pending(){return this.inFlight.size}work(e){if(this.useWorkers)return;const t=performance.now();let i=0;for(;this.queue.length&&(i===0||performance.now()-t<e);){const r=this.queue.shift();this.receive({job:r,result:ZM(r,(s,a)=>{const o=document.createElement("canvas");return o.width=s,o.height=a,o})}),i++}}whenIdle(){return new Promise(e=>{const t=()=>{this.work(50),this.pending?setTimeout(t,30):e()};t()})}}const Nr=24,ct={uAmb:{value:new W},uMoon:{value:new W},uMoonDir:{value:new W(-.45,.75,.5).normalize()},uMoonBeam:{value:new W},uBands:{value:4},uDither:{value:.35},uShafts:{value:.3},uShaftScale:{value:1},uGlowPos:{value:new W},uGlowRgb:{value:new W},uGlowR:{value:8},uGlowPower:{value:1.4},uHazeCentre:{value:new We},uHazeRange:{value:new We(70,200)},uHazeColour:{value:new W},uTime:{value:0},uSmooth:{value:1},uLightPos:{value:Array.from({length:Nr},()=>new st)},uLightCol:{value:Array.from({length:Nr},()=>new st)},uLightCount:{value:0},uDisco:{value:new st},uDiscoParams:{value:new st},uDiscoColour:{value:new W(1,1,1)}};function QM(n,e,t,i=1){const r=(s,a)=>new W(s[0]/255*a,s[1]/255*a,s[2]/255*a);ct.uAmb.value.copy(r(ge(n.ambientHue,.55,1),n.ambient*i)),ct.uMoon.value.copy(r(ge(n.moonHue,.35,1),n.moon)),ct.uMoonBeam.value.copy(r(ge(n.moonHue,.35,1),n.shafts*.25)),ct.uBands.value=n.bands,ct.uDither.value=n.dither*.5,ct.uShafts.value=n.shafts,ct.uShaftScale.value=t*2,ct.uGlowRgb.value.copy(r(ge(n.glowHue,n.glowSat,1),1)),ct.uGlowR.value=e,ct.uGlowPower.value=n.glowPower,ct.uHazeColour.value.copy(r(ge(n.ambientHue-.08,.55,1),.16*Math.sqrt(i)))}const Si=`
uniform vec3 uAmb, uMoon, uMoonDir, uMoonBeam, uGlowPos, uGlowRgb;
uniform float uBands, uDither, uShafts, uShaftScale, uGlowR, uGlowPower, uTime, uSmooth;
uniform vec2 uHazeCentre, uHazeRange;
uniform vec3 uHazeColour;
uniform vec4 uLightPos[${Nr}], uLightCol[${Nr}];
uniform int uLightCount;
uniform vec4 uDisco, uDiscoParams;
uniform vec3 uDiscoColour;

// Fade toward the twilight haze with distance, in a few dithered steps so it stays pixel art.
vec3 haze(vec3 c, vec3 P) {
  float h = smoothstep(uHazeRange.x, uHazeRange.y, length(P.xz - uHazeCentre));
  h *= h; // light through the middle distance, full only at the far edge
  if (uSmooth > 0.5) return mix(c, uHazeColour, h);
  float q = h * 4.0, fr = fract(q);
  q = floor(q) + (fr > (mod(floor(gl_FragCoord.x) + floor(gl_FragCoord.y), 2.0) > 0.5 ? 0.66 : 0.33) ? 1.0 : 0.0);
  return mix(c, uHazeColour, q / 4.0);
}

float lightStep(float f) {
  if (uSmooth > 0.5) return max(0.0, f); // smooth light: no bands, no dither
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
    if (uSmooth > 0.5) l += uMoonBeam * smoothstep(0.0, 6.0, s) * (1.0 - smoothstep(28.0, 34.0, s)); // soft-edged beams
    else {
      float chk = mod(floor(gl_FragCoord.x) + floor(gl_FragCoord.y), 2.0);
      if (s < 34.0 && (chk > 0.5 || (s > 4.0 && s < 30.0))) l += uMoonBeam;
    }
  }
  vec3 v = uGlowPos - P;
  float d = length(v);
  if (d < uGlowR) {
    float ndl = max(0.0, dot(N, v / max(d, 1e-4)));
    float fall = 1.0 - d / uGlowR;
    l += uGlowRgb * min(1.0, ndl * fall * fall * uGlowPower); // smooth to nothing at its reach: no ring
  }
  for (int i = 0; i < ${Nr}; i++) {
    if (i >= uLightCount) break;
    vec3 lv = uLightPos[i].xyz - P;
    float ld = length(lv), reach = uLightPos[i].w;
    if (ld >= reach) continue;
    float ndl = max(0.0, dot(N, lv / max(ld, 1e-4))) * 0.7 + 0.3;
    float fall = 1.0 - ld / reach;
    l += uLightCol[i].rgb * min(1.0, ndl * fall * fall * uLightCol[i].w);
  }
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
  return l;
}
vec3 nightLight(vec3 N, vec3 P) { return nightLightShaded(N, P, 1.0); }
`,Li=2,rn=32,Ki=8,jM=`
varying vec3 vWorld;
void main() {
  vec4 w = modelMatrix * vec4(position, 1.0);
  vWorld = w.xyz;
  gl_Position = projectionMatrix * viewMatrix * w;
}
`,e_=`
uniform sampler2D uAreas;
uniform vec4 uExtent; // minX, minZ, width, depth (metres)
uniform float uPixel; // metres per art pixel
uniform vec3 uTypeFloor[32];      // each type's floor colour (hsv), until its tile is drawn
uniform float uFloorReady[32];
uniform sampler2D uFloors;        // every type's floor tile, FLOOR_COLS to a row
uniform vec2 uTile, uFloorsSize;  // one tile's size and the atlas's, in art pixels
uniform float uSat;
uniform vec3 uFloor; // dancefloor x, z, radius
uniform vec4 uCircle;
uniform vec4 uSweeps[4]; // partifying areas: the front's origin x, z, its radius, strength
uniform int uSweepCount; // magic circle: hue, second hue, brightness (pulsing), rune band's turn (radians)

// The magic circle on the dancefloor, in art pixels: rings, a band of rune glyphs that turns,
// and a five-pointed star. Returns 0 (nothing), 1 (lines) or 2 (runes).
float magicCircle(vec2 d, float R, float px) {
  float r = length(d), ang = atan(d.y, d.x);
  if (abs(r - R * 0.9) < px * 0.8 || abs(r - R * 0.76) < px * 0.8 || abs(r - R * 0.36) < px * 0.6) return 1.0;
  if (r > R * 0.78 && r < R * 0.88) {
    float n = 44.0, a = (ang + uCircle.w) * n / 6.2831853, ci = floor(a), u = fract(a), v = (r - R * 0.78) / (R * 0.1);
    if (u > 0.18 && u < 0.82) {
      int gx = int((u - 0.18) / 0.64 * 3.0), gy = int(v * 4.0);
      int bits = int(fract(sin(ci * 91.7 + 3.1) * 43758.5453) * 4095.0) | 18;
      if (((bits >> (gx + gy * 3)) & 1) == 1) return 2.0;
    }
  }
  if (r < R * 0.76) {
    for (int k = 0; k < 5; k++) {
      float a0 = -1.5707963 + float(k) * 2.5132741, a1 = a0 + 2.5132741;
      vec2 p0 = vec2(cos(a0), sin(a0)) * R * 0.76, p1 = vec2(cos(a1), sin(a1)) * R * 0.76, e = p1 - p0;
      float t = clamp(dot(d - p0, e) / dot(e, e), 0.0, 1.0);
      if (length(d - p0 - e * t) < px * 0.7) return 1.0;
    }
  }
  return 0.0;
}
uniform vec4 uCanopy; // canopy shadow: strength (0 off), height, cover, wind speed
uniform vec2 uClearing; // clearingSize, clearingFalloff: where trees, and so canopy, begin
varying vec3 vWorld;
${Si}
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
    vec2 cell = vec2(mod(float(t), ${Ki}.0), floor(float(t) / ${Ki}.0));
    vec2 tp = mod(px, uTile);
    c = texture2D(uFloors, (cell * uTile + tp + 0.5) / uFloorsSize).rgb;
  } else {
    vec3 f = area.a > 0.5 ? uTypeFloor[t] : vec3(0.25, 0.45, 0.4);
    float v = vnoise(px / vec2(9.0, 6.0)) * 0.7 + vnoise(px / vec2(2.5, 2.0)) * 0.3;
    c = hsv(f.x, f.y * uSat, f.z * (v < 0.38 ? 0.8 : v > 0.66 ? 1.15 : 1.0));
  }
  c *= 1.0 + max(0.0, 0.55 - open) * 0.9;        // clearings are paler
  // The dancefloor: worn ground inside the stones, and the glowing magic circle (unlit: it glows).
  float r = length(p - uFloor.xy);
  if (r < uFloor.z) c = mix(c, vec3(0.42, 0.42, 0.38), 0.25);
  if (r < uFloor.z) {
    float mc = magicCircle(p - uFloor.xy, uFloor.z, uPixel);
    if (mc > 0.5) {
      vec3 col = hsv(mc > 1.5 ? uCircle.y : uCircle.x, 0.75, 1.0) * uCircle.z;
      gl_FragColor = vec4(haze(col, vWorld), 1.0);
      return;
    }
  }
  // Ponds: dark water mirroring the moon. The glint is a fake highlight from the view and a
  // moon mirrored into the sky ahead, so it slides as the camera moves, and shimmers.
  {
    if (area.a > 0.5 && area.b > 0.5) {
      vec3 V = normalize(cameraPosition - vec3(p.x, 0.0, p.y));
      vec3 R = reflect(-V, vec3(0.0, 1.0, 0.0));
      vec3 moon = normalize(vec3(uMoonDir.x, uMoonDir.y, -abs(uMoonDir.z)));
      float spec = dot(R, moon) + (vnoise(px * vec2(0.6, 2.5) + vec2(uTime * 1.5, 0.0)) - 0.5) * 0.05;
      vec3 water = vec3(0.015, 0.03, 0.055) * nightLight(vec3(0.0, 1.0, 0.0), vWorld) * 4.0;
      if (spec > 0.985) water = vec3(0.92, 0.95, 1.0);
      else if (spec > 0.965) water = vec3(0.45, 0.55, 0.7);
      else if (mod(px.y, 4.0) < 1.0 && vnoise(px / 3.0 + uTime) > 0.62) water += vec3(0.06, 0.08, 0.12); // ripples
      gl_FragColor = vec4(haze(water, vWorld), 1.0);
      return;
    }
  }
  // The party arriving: a front of glowing runes sweeping across the area, a soft glow behind it.
  for (int i = 0; i < 4; i++) {
    if (i >= uSweepCount) break;
    float d = length(p - uSweeps[i].xy), front = uSweeps[i].z, k = uSweeps[i].w;
    if (k <= 0.0 || d > front + 3.0) continue;
    if (abs(d - front) < 2.2) {
      vec2 cell = floor(px / 3.0);
      if (fract(sin(dot(cell, vec2(12.9898, 78.233))) * 43758.5453) > 0.55 && mod(px.x + px.y, 3.0) < 2.0) {
        vec3 col = mod(cell.x + cell.y, 2.0) > 0.5 ? hsv(uCircle.x, 0.7, 1.0) : hsv(uCircle.y, 0.7, 1.0);
        gl_FragColor = vec4(haze(col * k, vWorld), 1.0);
        return;
      }
    }
    if (d < front) c += hsv(uCircle.x, 0.6, 0.18) * k * (1.0 - smoothstep(0.0, 1.0, (front - d) / 30.0));
  }
  float moonK = 1.0;
  if (uCanopy.x > 0.0) {
    // The canopy's shadow: a dappled layer at canopy height, cast along the moonlight onto the
    // ground, drifting with the wind; thinner where the canopy thins, in the clearings.
    vec2 q = p + uMoonDir.xz / max(0.2, uMoonDir.y) * uCanopy.y + vec2(0.7, 0.3) * uCanopy.w * uTime;
    float leaves = vnoise(q / 2.6) * 0.6 + vnoise(q / 1.1 + 31.0) * 0.4;
    float cover = uCanopy.z * smoothstep(0.0, 1.0, (open - uClearing.x) / max(0.01, uClearing.y));
    float edge = mod(floor(gl_FragCoord.x) + floor(gl_FragCoord.y), 2.0) > 0.5 ? 0.03 : -0.03;
    if (uSmooth > 0.5) moonK = 1.0 - uCanopy.x * smoothstep(-0.07, 0.07, cover - leaves);
    else if (leaves + edge < cover) moonK = 1.0 - uCanopy.x;
  }
  vec3 light = nightLightShaded(vec3(0.0, 1.0, 0.0), vWorld, moonK);
  gl_FragColor = vec4(haze(min(vec3(1.0), c * light * 1.25), vWorld), 1.0);
}
`;class t_{constructor(e,t,i,r){this.map=e,this.forest=t;const s=e.extent,a=s.maxX-s.minX,o=s.maxZ-s.minZ,c=Math.ceil(a*Li/rn)*rn,l=Math.ceil(o*Li/rn)*rn;this.tilesX=c/rn,this.tilesZ=l/rn,this.filled=new Uint8Array(this.tilesX*this.tilesZ);const u=g=>(g.magFilter=g.minFilter=Ht,g.generateMipmaps=!1,g.colorSpace=Wn,g.needsUpdate=!0,g);this.texture=u(new Ar(new Uint8Array(c*l*4),c,l)),u(this.tile),this.floors=u(new Ar(new Uint8Array(64*Ki*48*4*4),64*Ki,192));const f=Array.from({length:32},(g,v)=>new W(...Cn[v]?.floor??[.25,.45,.4])),d=new yt({vertexShader:jM,fragmentShader:e_,uniforms:{...ct,uAreas:{value:this.texture},uExtent:{value:new st(s.minX,s.minZ,c/Li,l/Li)},uPixel:{value:r},uTypeFloor:{value:f},uFloorReady:{value:this.floorReady},uFloors:{value:this.floors},uTile:{value:new We(64,48)},uFloorsSize:{value:new We(64*Ki,192)},uSat:{value:i.sat},uFloor:{value:new W(e.dancefloor.x,e.dancefloor.z,e.dancefloor.radius)},uCanopy:{value:new st},uCircle:{value:new st},uSweeps:{value:Array.from({length:4},()=>new st)},uSweepCount:{value:0},uClearing:{value:new We(e.tuning.clearingSize,e.tuning.clearingFalloff)}}}),p=new Ln(a+400,o+400);p.rotateX(-Math.PI/2),this.mesh=new qt(p,d),this.mesh.position.set((s.minX+s.maxX)/2,0,(s.minZ+s.maxZ)/2)}map;forest;mesh;texture;tile=new Ar(new Uint8Array(rn*rn*4),rn,rn);filled;tilesX;tilesZ;initialised=!1;floorReady=new Array(32).fill(0);floors;pendingFloors=[];setSweeps(e){const t=this.mesh.material.uniforms,i=t.uSweeps.value;e.slice(0,4).forEach((r,s)=>i[s].set(r.x,r.z,r.radius,r.strength)),t.uSweepCount.value=Math.min(4,e.length)}setCircle(e,t,i,r){this.mesh.material.uniforms.uCircle.value.set(e,t,i,r)}setCanopyShadow(e,t,i,r){this.mesh.material.uniforms.uCanopy.value.set(e,t,i,r)}setFloor(e,t){this.pendingFloors.push([e,t])}placeFloors(e){for(const[t,i]of this.pendingFloors){const r=this.mesh.material,s=r.uniforms.uTile.value;if(i.w!==s.x||i.h!==s.y)continue;const a=new Ar(i.albedo,i.w,i.h);a.needsUpdate=!0,e.copyTextureToTexture(a,this.floors,null,new We(t%Ki*i.w,Math.floor(t/Ki)*i.h)),a.dispose(),this.floorReady[t]=1}this.pendingFloors=[]}fill(e,t,i,r,s){this.initialised||(e.initTexture(this.texture),e.initTexture(this.floors),this.initialised=!0),this.pendingFloors.length&&this.placeFloors(e);const a=this.map.extent,o=rn/Li,c=Math.max(0,Math.floor((t.minX-a.minX)/o)),l=Math.min(this.tilesX-1,Math.floor((t.maxX-a.minX)/o)),u=Math.max(0,Math.floor((t.minZ-a.minZ)/o)),f=Math.min(this.tilesZ-1,Math.floor((t.maxZ-a.minZ)/o)),d=(i-a.minX)/o,p=(r-a.minZ)/o,g=[];for(let m=u;m<=f;m++)for(let M=c;M<=l;M++)this.filled[m*this.tilesX+M]||g.push([M,m,(M+.5-d)**2+(m+.5-p)**2]);g.sort((m,M)=>m[2]-M[2]);const v=performance.now();let x=0;for(const[m,M]of g){if(x>0&&performance.now()-v>s)break;this.fillTile(e,m,M),x++}return g.length-x}fillTile(e,t,i){const r=this.map.extent,s=this.tile.image.data,a=rn/Li,o=r.minX+t*a,c=r.minZ+i*a,l=this.forest.lightsNear(o+a/2,c+a/2,a/2+6).filter(u=>u.kind==="pond");for(let u=0;u<rn;u++)for(let f=0;f<rn;f++){const d=o+(f+.5)/Li,p=c+(u+.5)/Li,g=this.map.areaAt(d,p),v=(u*rn+f)*4;let x=0;for(const m of l)Math.hypot(d-m.x,p-m.z)<3*m.size&&(x=255);s[v]=g.type,s[v+1]=Math.round(g.openness*255),s[v+2]=x,s[v+3]=255}this.tile.needsUpdate=!0,e.copyTextureToTexture(this.tile,this.texture,null,new We(t*rn,i*rn)),this.filled[i*this.tilesX+t]=1}dispose(){this.texture.dispose(),this.tile.dispose(),this.mesh.geometry.dispose(),this.mesh.material.dispose()}}const n_="varying vec2 vUv; void main() { vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }",i_=`
uniform sampler2D uScene; uniform float uThreshold; varying vec2 vUv;
void main() {
  vec3 c = texture2D(uScene, vUv).rgb;
  float l = max(c.r, max(c.g, c.b));
  gl_FragColor = vec4(c * smoothstep(uThreshold, uThreshold + 0.25, l), 1.0);
}`,r_=`
uniform sampler2D uSrc; uniform vec2 uStep; varying vec2 vUv;
void main() {
  vec4 c = texture2D(uSrc, vUv) * 0.227;
  c += (texture2D(uSrc, vUv + uStep * 1.38) + texture2D(uSrc, vUv - uStep * 1.38)) * 0.316;
  c += (texture2D(uSrc, vUv + uStep * 3.23) + texture2D(uSrc, vUv - uStep * 3.23)) * 0.070;
  gl_FragColor = c;
}`,s_=`
uniform sampler2D uScene, uBloom, uFx; uniform vec2 uLow; uniform float uBloomStrength, uBlack, uGamma, uFxOn; varying vec2 vUv;
void main() {
  vec2 p = (floor(vUv * uLow) + 0.5) / uLow;
  vec3 c = texture2D(uScene, p).rgb;
  if (uFxOn > 0.5) { vec4 f = texture2D(uFx, vUv); c = c * (1.0 - f.a) + f.rgb; }
  // Levels: a black point and a gamma, so the shade goes near-black and the lit stays bright.
  c = pow(clamp((c - uBlack) / (1.0 - uBlack), 0.0, 1.0), vec3(uGamma));
  c += texture2D(uBloom, vUv).rgb * uBloomStrength;
  gl_FragColor = vec4(min(c, vec3(1.0)), 1.0);
}`,a_=`
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
}`;function Xi(n,e,t,i=!1){const r=new Un(Math.max(1,n),Math.max(1,e),{minFilter:t,magFilter:t,depthBuffer:i,generateMipmaps:!1});return r.texture.colorSpace=Wn,r}class o_{constructor(e,t){this.renderer=e,this.tuning=t,this.scene=Xi(1,1,kt,!0),this.scene.depthTexture=new zr(1,1),this.fx.texture.format=En;const i=(r,s)=>new yt({vertexShader:n_,fragmentShader:r,uniforms:s,depthTest:!1,depthWrite:!1});this.mats={bright:i(i_,{uScene:{value:null},uThreshold:{value:.6}}),blur:i(r_,{uSrc:{value:null},uStep:{value:new We}}),composite:i(s_,{uScene:{value:null},uBloom:{value:null},uLow:{value:new We},uBloomStrength:{value:0},uBlack:{value:0},uGamma:{value:1},uFx:{value:null},uFxOn:{value:0}}),tilt:i(a_,{uSrc:{value:null},uTexel:{value:new We},uDir:{value:new We},uStrength:{value:0},uBand:{value:.4},uCentre:{value:.5}})},this.quad=new qt(new Ln(2,2),this.mats.composite),this.quad.frustumCulled=!1}renderer;tuning;scene;bright=Xi(1,1,kt);bloomB=Xi(1,1,kt);a=Xi(1,1,kt);b=Xi(1,1,kt);fx=Xi(1,1,kt);fxB=Xi(1,1,kt);fxScene=null;quad;cam=new rc(-1,1,1,-1,0,1);mats;low=new We(1,1);out=new We(1,1);get fullResolution(){return this.tuning.tiltShift.on&&this.tuning.tiltShift.where==="after"}get lowSize(){return this.low}resize(e,t,i,r){this.low.set(e,t),this.fx.setSize(e,t),this.fxB.setSize(e,t),this.out.set(i,r),this.scene.setSize(e,t);const s=Math.max(1,Math.round(e/2)),a=Math.max(1,Math.round(t/2));this.bright.setSize(s,a),this.bloomB.setSize(s,a);const o=this.fullResolution?i:e,c=this.fullResolution?r:t;this.a.setSize(o,c),this.b.setSize(o,c)}pass(e,t,i){const r=this.mats[e];i(r.uniforms),this.quad.material=r,this.renderer.setRenderTarget(t),this.renderer.render(this.quad,this.cam)}render(e,t){const i=this.renderer,r=this.tuning;i.setRenderTarget(this.scene),i.render(e,t);const s=r.bloom.on&&r.bloom.strength>0;if(s){const d=this.bright.width,p=this.bright.height;this.pass("bright",this.bright,g=>{g.uScene.value=this.scene.texture,g.uThreshold.value=r.bloom.threshold});for(let g=0;g<2;g++)this.pass("blur",this.bloomB,v=>{v.uSrc.value=this.bright.texture,v.uStep.value.set(1/d,0)}),this.pass("blur",this.bright,v=>{v.uSrc.value=this.bloomB.texture,v.uStep.value.set(0,1/p)})}const a=!!this.fxScene;if(this.fxScene){const d=i.getClearColor(new tt),p=i.getClearAlpha();i.setRenderTarget(this.fx),i.setClearColor(0,0),i.clear(),i.render(this.fxScene,t),i.setClearColor(d,p);const g=this.fx.width,v=this.fx.height;this.pass("blur",this.fxB,x=>{x.uSrc.value=this.fx.texture,x.uStep.value.set(.6/g,0)}),this.pass("blur",this.fx,x=>{x.uSrc.value=this.fxB.texture,x.uStep.value.set(0,.6/v)})}const o=r.tiltShift.on&&r.tiltShift.strength>0;if(this.pass("composite",o?this.a:null,d=>{d.uScene.value=this.scene.texture,d.uBloom.value=this.bright.texture,d.uLow.value.copy(this.low),d.uBloomStrength.value=s?r.bloom.strength:0,d.uBlack.value=r.tone.black,d.uGamma.value=r.tone.gamma,d.uFx.value=this.fx.texture,d.uFxOn.value=a?1:0}),!o)return;const c=this.a.width,l=this.a.height,u=this.fullResolution?this.out.y/this.low.y:1,f=d=>{d.uTexel.value.set(1/c,1/l),d.uStrength.value=r.tiltShift.strength*u,d.uBand.value=r.tiltShift.band,d.uCentre.value=1-r.tiltShift.centre};this.pass("tilt",this.b,d=>{f(d),d.uSrc.value=this.a.texture,d.uDir.value.set(1,0)}),this.pass("tilt",null,d=>{f(d),d.uSrc.value=this.b.texture,d.uDir.value.set(0,1)})}}const l_=`
uniform vec3 uRight, uUp;
uniform float uSize;
varying vec2 vUv;
void main() {
  vUv = uv * 2.0 - 1.0;
  vec3 w = (modelMatrix * vec4(0.0, 0.0, 0.0, 1.0)).xyz + (uRight * position.x + uUp * position.y) * uSize;
  gl_Position = projectionMatrix * viewMatrix * vec4(w, 1.0);
}`,c_=`
uniform float uTime, uSpin, uPixels;
uniform vec3 uTint;
varying vec2 vUv;
float h(vec2 p) { return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453); }
void main() {
  vec2 q = (floor((vUv * 0.5 + 0.5) * uPixels) + 0.5) / uPixels * 2.0 - 1.0; // on the art's pixel grid
  float r2 = dot(q, q);
  if (r2 > 1.0) discard;
  vec3 n = vec3(q.x, q.y, sqrt(1.0 - r2));
  float lon = atan(n.x, n.z) + uTime * uSpin, lat = asin(n.y);
  vec2 g = vec2(lon * 3.0, lat * 4.0), cell = floor(g), f = fract(g);
  float base = 0.3 + 0.35 * h(cell) + 0.25 * n.z;
  if (f.x < 0.14 || f.y < 0.14) base *= 0.45;                         // the mirror tiles' grout
  if (h(cell + floor(uTime * 3.0) * 7.0) > 0.9) base = 1.4;           // a glinting facet
  gl_FragColor = vec4(mix(vec3(base), uTint * base, 0.35), 1.0);
}`,h_=`
uniform vec3 uTint;
void main() {
  if (mod(floor(gl_FragCoord.y), 3.0) > 0.5) discard; // faint: a dotted thread of light
  gl_FragColor = vec4(uTint, 1.0);
}`,u_=`
attribute vec4 aMote; // phase, speed, wobble, ring
uniform float uTime, uRise;
varying float vA;
void main() {
  float y = mod(uTime * aMote.y + aMote.x * uRise, uRise), k = y / uRise;
  vec3 p = position;
  p.x += sin(uTime * 0.9 + aMote.x * 31.0) * aMote.z * (0.3 + k);
  p.z += cos(uTime * 0.7 + aMote.x * 17.0) * aMote.z * (0.3 + k);
  p.y += y;
  vA = smoothstep(0.0, 0.05, k) * (1.0 - smoothstep(0.4, 1.0, k));
  gl_Position = projectionMatrix * viewMatrix * vec4(p, 1.0);
  gl_PointSize = vA > 0.15 ? (k < 0.15 ? 2.0 : 1.0) : 0.0;
}`,d_=`
uniform vec3 uTint;
varying float vA;
void main() { if (vA < 0.15) discard; gl_FragColor = vec4(uTint * (0.5 + vA), 1.0); }`;class f_{constructor(e,t,i,r){this.tuning=t;const s=t.dancefloor,a=e.dancefloor;this.centre=new W(a.x,0,a.z);const o=new W(...ge(s.circleHue2,.4,1).map(x=>x/255));this.ballMat=new yt({vertexShader:l_,fragmentShader:c_,uniforms:{...i,uSize:{value:s.discoSize/2},uTime:ct.uTime,uSpin:{value:s.spin/60*Math.PI*2},uPixels:{value:Math.max(6,Math.round(s.discoSize/r))},uTint:{value:o}}}),this.ball=new qt(new Ln(2,2),this.ballMat),this.ball.frustumCulled=!1;const c=60;this.beam=new qt(new Ln(r,c).translate(0,c/2,0),new yt({fragmentShader:h_,uniforms:{uTint:{value:o.clone().multiplyScalar(.5)}}})),this.beam.frustumCulled=!1;const l=s.motes,u=[],f=[];for(let x=0;x<l.count;x++){const m=S=>{const w=Math.sin(x*12.9898+S*78.233)*43758.5453;return w-Math.floor(w)},M=m(1)*Math.PI*2,_=Math.sqrt(m(2))*a.radius*l.column;u.push(a.x+Math.cos(M)*_,.3,a.z+Math.sin(M)*_),f.push(m(3),l.speed*(.6+m(4)*.8),.4+m(5)*1.2,0)}const d=new $t;d.setAttribute("position",new Nt(u,3)),d.setAttribute("aMote",new Nt(f,4));const p=ge(s.circleHue,.55,1);this.motes=new Ea(d,new yt({vertexShader:u_,fragmentShader:d_,uniforms:{uTime:ct.uTime,uRise:{value:l.rise},uTint:{value:new W(p[0]/255,p[1]/255,p[2]/255)}},transparent:!0,depthWrite:!1,blending:Fr})),this.motes.frustumCulled=!1;const g=ge(s.circleHue,.7,1);this.lightRgb=new W(g[0]/255,g[1]/255,g[2]/255);const v=ct;v.uDiscoParams.value.set(s.spin/60*Math.PI*2,s.specks,s.speckBrightness,s.speckReach),v.uDiscoColour.value.copy(o)}tuning;ball;beam;motes;ballMat;lightRgb;centre;update(e,t){const i=this.tuning.dancefloor,r=.75+.25*Math.sin(e*i.pulse*Math.PI*2);t.setCircle(i.circleHue,i.circleHue2,.7+.3*r,e*i.runeSpeed/60*Math.PI*2);const s=i.discoHeight+Math.sin(e*.8)*.3;return this.ball.position.set(this.centre.x,s,this.centre.z),this.beam.position.set(this.centre.x,s+i.discoSize/2,this.centre.z),ct.uDisco.value.set(this.centre.x,s,this.centre.z,1),{x:this.centre.x,y:2.5,z:this.centre.z,reach:i.lightReach,rgb:this.lightRgb,strength:i.lightStrength*r}}}const p_=[new W(.25,.85,1),new W(.7,.4,1),new W(1,.65,.2)];class m_{constructor(e,t){this.atlas=e,this.metresPerPixel=t}atlas;metresPerPixel;homeSoundsystem(e){const t=e.map.dancefloor;return{x:t.x+t.radius+5,z:t.z+3,variant:0,at:-1/0,from:null}}update(e,t,i,r){const s=e.tuning.party,a=[],o=[],c=[],l=[],u=[this.homeSoundsystem(e)];for(const[,f]of e.party.areas){if(!f.soundsystem)continue;const d=f.from?e.map.siteOf(f.from[0],f.from[1]):null;u.push({...f.soundsystem,at:f.at,from:d})}for(const f of u){const d=s.transition>0?Math.min(1,(t-f.at)/s.transition):1,p=this.atlas.frames[f.variant*3+Math.floor(t*6)%3],g=p.h*this.metresPerPixel,v=vn((d-.55)/.45);if(d<1&&f.from){const m=(f.from.x+f.x)/2,M=(f.from.z+f.z)/2,_=Math.hypot(f.x-m,f.z-M)*1.6;c.push({x:m,z:M,radius:d*_,strength:1-vn((d-.8)/.2)})}if(v>0&&i(f.x,f.z,p.w*this.metresPerPixel,g)){const m=He(Math.round(f.x*10),Math.round(f.z*10),911)<.5;a.push({x:f.x,y:-(1-v)*g,z:f.z,frame:p,flip:m,fresh:r(f.x,f.z,g)})}d>=1&&l.push({x:f.x,y:g*.85,z:f.z,seed:Math.floor(Math.abs(f.x*7.3+f.z*13.1))%1e5,ready:f.at+s.transition});const x=.85+.15*Math.sin(t*8);v>0&&o.push({x:f.x,y:3,z:f.z,reach:s.lightReach,rgb:p_[f.variant%3],strength:s.lightStrength*x*v*(1+(1-d)*2)})}return{items:a,lights:o,sweeps:c,playing:l}}}function g_(n,e,t,i){const r=(a,o)=>Math.abs(a[0]-o[0])<1e-6&&Math.abs(a[1]-o[1])<1e-6;if(r(n,t)||r(n,i)||r(e,t)||r(e,i))return!1;const s=(a,o,c)=>Math.sign((o[0]-a[0])*(c[1]-a[1])-(o[1]-a[1])*(c[0]-a[0]));return s(n,e,t)*s(n,e,i)<0&&s(t,i,n)*s(t,i,e)<0}function x_(n,e,t){const i=n.tuning.stringLights,r=n.siteOf(t[0],t[1]),s=Ui(n.seed*53+t[0]*1031+t[1]*7+509),a=S=>{const w=n.areaAt(S.x,S.z).cell;return w[0]===t[0]&&w[1]===t[1]},o=S=>He(Math.round(S.x*10),Math.round(S.z*10),n.seed+501),c=e.treesNear(r.x,r.z,n.areaSize*1.3).filter(a).sort((S,w)=>o(S)-o(w)),l=new Map,u=new Set,f=[],d=[],p=Math.cos(i.coneAngle*Math.PI/180),g=(S,w=0)=>(l.get(S)??0)+1<=(u.has(S)?3:2)-w,v=(S,w)=>f.some(E=>g_([S.x,S.z],[w.x,w.z],[E.ax,E.az],[E.bx,E.bz])),x=(S,w)=>{f.push({ax:S.x,az:S.z,bx:w.x,bz:w.z,seed:Math.floor(He(Math.round(S.x*10),Math.round(w.z*10),n.seed+503)*1e6)}),l.set(S,(l.get(S)??0)+1),l.set(w,(l.get(w)??0)+1)},m=(S,w,E)=>{let L=S,b=w;const A=[S];for(let P=0;P<E;P++){const C=[];for(const D of c){if(D===L||!g(D))continue;const O=D.x-L.x,z=D.z-L.z,V=Math.hypot(O,z);if(!(V<i.spanMin||V>i.spanMax)&&!(b&&(O*b[0]+z*b[1])/V<p)&&!v(L,D)&&(C.push({b:D,d:V}),C.length>=16))break}if(!C.length)break;C.sort((D,O)=>O.d-D.d);const{b:N,d:U}=C[Math.floor(s()*Math.min(4,C.length))];x(L,N),b=[(N.x-L.x)/U,(N.z-L.z)/U],A.push(N),L=N}return A},M=i.runsPerArea[0]+Math.floor(s()*(i.runsPerArea[1]-i.runsPerArea[0]+1)),_=[];for(const S of c){if(d.length>=M)break;if(l.has(S)||d.some(L=>Math.hypot(L.x-S.x,L.z-S.z)<i.spread))continue;d.push(S);const w=i.spansPerRun[0]+Math.floor(s()*(i.spansPerRun[1]-i.spansPerRun[0]+1)),E=m(S,null,w);for(let L=1;L<E.length-1;L++){if(s()>=i.junctionChance)continue;const b=E[L],A=E[L+1],P=A.x-b.x,C=A.z-b.z,N=Math.hypot(P,C),U=s()<.5?1:-1;u.add(b),_.push({from:b,heading:[-C/N*U,P/N*U]})}}for(const S of _)m(S.from,S.heading,i.spansPerRun[0]+Math.floor(s()*3));return f}const en={uRight:{value:new W(1,0,0)},uUp:{value:new W(0,1,0)},uFacing:{value:new W(0,0,1)},uTopFade:{value:0},uCutout:{value:new st(0,0,0,1)},uDebugCull:{value:0},uRes:{value:new We(1,1)},uWitch:{value:new st(0,0,0,0)},uWitchDepth:{value:0},uOcc:{value:new st(.38,6,2.5,1)}},Po=`
uniform vec3 uRight, uUp;
uniform vec2 uRes;
uniform float uWitchDepth;
uniform vec4 uOcc;
attribute vec3 iPos;
attribute vec2 iSize;
attribute vec4 iUv;
attribute vec3 iFlags;
varying vec2 vUv;
varying vec3 vWorld;
varying vec3 vFlags;
varying float vFront;
void main() {
  // Tall and nearer the camera than the witch: it may stand in front of her.
  vFront = (-(viewMatrix * vec4(iPos, 1.0)).z < uWitchDepth - 0.5 && iSize.y > uOcc.z) ? 1.0 : 0.0;
  vec3 w = iPos + uRight * (position.x * iSize.x) + uUp * (position.y * iSize.y);
  float u = iFlags.x > 0.5 ? 1.0 - uv.x : uv.x;
  vUv = vec2(mix(iUv.x, iUv.z, u), mix(iUv.w, iUv.y, uv.y));
  vFlags = iFlags;
  vWorld = w;
  gl_Position = projectionMatrix * viewMatrix * vec4(w, 1.0);
  // Snap the whole sprite by its base to the pixel grid, so it moves a whole pixel at a time and
  // its small bright details (flowers, eyes) don't shimmer in and out as the camera glides.
  vec4 b = projectionMatrix * viewMatrix * vec4(iPos, 1.0);
  vec2 ndc = b.xy / b.w, snapped = (floor((ndc * 0.5 + 0.5) * uRes) + 0.5) / uRes * 2.0 - 1.0;
  gl_Position.xy += (snapped - ndc) * gl_Position.w;
}
`,Do=`
uniform sampler2D uAlbedo, uNormal;
uniform vec3 uRight, uUp, uFacing;
uniform float uTopFade, uUnlit;
uniform vec4 uCutout;
uniform float uDebugCull;
uniform vec4 uWitch, uOcc, uSilhouette;
uniform float uFadePass;
varying vec2 vUv;
varying vec3 vWorld;
varying vec3 vFlags;
varying float vFront;
${Si}
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
  // The witch's see-through silhouette: where she is hidden, a flat tint in her glow colour.
  if (uSilhouette.a > 0.0) { gl_FragColor = vec4(uSilhouette.rgb, uSilhouette.a); return; }
  // Things standing in front of the witch fade (smoothly) where they cover her: left out of the
  // opaque pass there and drawn in a second, see-through pass after her.
  vec2 o = abs(gl_FragCoord.xy - uWitch.xy) - uWitch.zw;
  float occl = uOcc.w * vFront * (1.0 - smoothstep(0.0, uOcc.y, max(o.x, o.y)));
  if (uFadePass > 0.5 ? occl <= 0.001 : occl > 0.001) discard;
  float alpha = uFadePass > 0.5 ? mix(1.0, uOcc.x, occl) : 1.0;
  if (vFlags.y > 0.5) {
    // Crowns: hidden in a dithered hole round the witch, which closes as she rises.
    float d = length(gl_FragCoord.xy - uCutout.xy);
    float shown = smoothstep(uCutout.z - uCutout.w, uCutout.z, d);
    if (bayer(gl_FragCoord.xy) >= max(shown, uTopFade)) discard;
  }
  // Eye glints, flowers and magic glow: the generator marks them with alpha 254.
  if (uDebugCull > 0.5 && vFlags.z > 0.5) { gl_FragColor = vec4(1.0, 0.0, 0.0, alpha); return; }
  if (uUnlit > 0.5) { gl_FragColor = vec4(a.rgb, alpha); return; }
  if (a.a < 0.999) { gl_FragColor = vec4(haze(a.rgb, vWorld), alpha); return; }
  vec4 n = texture2D(uNormal, vUv);
  float nx = (n.r * 255.0 - 128.0) / 127.0, ny = (n.g * 255.0 - 128.0) / 127.0, nz = n.b;
  if (vFlags.x > 0.5) nx = -nx;
  vec3 N = normalize(uRight * nx - uUp * ny + uFacing * nz);
  gl_FragColor = vec4(haze(min(vec3(1.0), a.rgb * nightLight(N, vWorld) * 1.25), vWorld), alpha);
}
`;class Sr{constructor(e,t,i={}){this.atlas=e,this.metresPerPixel=t;const r=new Ln(1,1);r.translate(0,.5,0),this.geo=new sc,this.geo.index=r.index,this.geo.setAttribute("position",r.getAttribute("position")),this.geo.setAttribute("uv",r.getAttribute("uv")),this.pos=this.size=this.uvs=this.flags=void 0,this.grow(64);const s=o=>({...ct,...en,uAlbedo:{value:e.albedo},uNormal:{value:e.normal},uUnlit:{value:i.unlit?1:0},uFadePass:{value:0},uSilhouette:{value:new st(0,0,0,0)},...o}),a=new yt({vertexShader:Po,fragmentShader:Do,uniforms:s({}),depthTest:!i.onTop,depthWrite:!i.onTop});if(this.mesh=new qt(this.geo,a),this.mesh.frustumCulled=!1,i.onTop&&(this.mesh.renderOrder=10),this.meshes=[this.mesh],i.fade){const o=new qt(this.geo,new yt({vertexShader:Po,fragmentShader:Do,uniforms:s({uFadePass:{value:1}}),transparent:!0,depthWrite:!1}));o.frustumCulled=!1,o.renderOrder=11,this.meshes.push(o)}if(i.silhouette){const o=i.silhouette.colour,c=new qt(this.geo,new yt({vertexShader:Po,fragmentShader:Do,uniforms:s({uSilhouette:{value:new st(o.x,o.y,o.z,i.silhouette.opacity)}}),transparent:!0,depthWrite:!1,depthFunc:ga}));c.frustumCulled=!1,c.renderOrder=12,this.meshes.push(c)}}atlas;metresPerPixel;mesh;meshes;geo;pos;size;uvs;flags;capacity=0;count=0;grow(e){const t=Math.max(e,this.capacity*2);this.geo.dispose();const i=(r,s)=>{const a=new nc(new Float32Array(t*r),r);return a.setUsage(Pr),s&&a.array.set(s.array),a};this.pos=i(3,this.pos),this.size=i(2,this.size),this.uvs=i(4,this.uvs),this.flags=i(3,this.flags),this.geo.setAttribute("iPos",this.pos),this.geo.setAttribute("iSize",this.size),this.geo.setAttribute("iUv",this.uvs),this.geo.setAttribute("iFlags",this.flags),this.capacity=t}set(e){e.length>this.capacity&&this.grow(e.length);const t=this.pos.array,i=this.size.array,r=this.uvs.array,s=this.flags.array;e.forEach((a,o)=>{t[o*3]=a.x,t[o*3+1]=a.y,t[o*3+2]=a.z;const c=a.scale??1;i[o*2]=a.frame.w*this.metresPerPixel*c,i[o*2+1]=a.frame.h*this.metresPerPixel*c,r.set(a.frame.uv,o*4),s[o*3]=a.flip?1:0,s[o*3+1]=a.top?1:0,s[o*3+2]=a.fresh?1:0});for(const a of[this.pos,this.size,this.uvs,this.flags])a.needsUpdate=!0;this.count=e.length,this.geo.instanceCount=e.length;for(const a of this.meshes)a.visible=e.length>0}get dropped(){const e=this.geo._maxInstanceCount;return e===void 0||!this.mesh.visible?0:Math.max(0,this.count-e)}dispose(){this.geo.dispose(),this.mesh.material.dispose(),this.atlas.albedo.dispose(),this.atlas.normal.dispose()}}const v_=`
attribute vec3 aColour;
attribute vec4 aBulb; // phase, index along the line, time it switches on, sway (0 at the ends)
uniform float uWind, uNear, uTime;
uniform vec2 uRes;
varying vec3 vColour;
varying vec3 vWorld;
varying float vOn;
varying vec2 vB;
void main() {
  vec3 p = position;
  p.x += sin(uTime * uWind + aBulb.x * 6.0) * 0.18 * aBulb.w;
  p.z += cos(uTime * uWind * 0.8 + aBulb.x * 4.0) * 0.1 * aBulb.w;
  vec4 mv = viewMatrix * vec4(p, 1.0);
  gl_Position = projectionMatrix * mv;
  vOn = uTime >= aBulb.z ? 1.0 : 0.0;
  float size = vOn > 0.5 ? (-mv.z < uNear ? 2.0 : 1.0) : 0.0;
  gl_PointSize = size;
  // On the pixel grid, so each bulb is a whole square, never a broken fragment.
  vec2 px = (gl_Position.xy / gl_Position.w * 0.5 + 0.5) * uRes;
  px = size > 1.5 ? floor(px + 0.5) : floor(px) + 0.5;
  gl_Position.xy = (px / uRes * 2.0 - 1.0) * gl_Position.w;
  vColour = aColour; vWorld = p; vB = aBulb.xy;
}`,M_=`
uniform float uTwinkle, uChase;
varying vec3 vColour;
varying vec3 vWorld;
varying float vOn;
varying vec2 vB;
${Si}
void main() {
  if (vOn < 0.5) discard;
  float b = 1.0 - uTwinkle * 0.5 * (1.0 + sin(uTime * (1.3 + vB.x) + vB.x * 40.0));
  if (fract((vB.y - uTime * uChase) / 60.0) < 0.06) b = 1.4;  // a chase running along now and then
  gl_FragColor = vec4(haze(vColour * b * 1.6, vWorld), 1.0); // bright enough to bloom
}`,__=`
attribute float aSway;
uniform float uWind, uTime;
varying vec3 vWorld;
void main() {
  vec3 p = position;
  p.x += sin(uTime * uWind + aSway * 6.0) * 0.18 * fract(aSway * 7.0);
  vWorld = p;
  gl_Position = projectionMatrix * viewMatrix * vec4(p, 1.0);
}`,S_=`
varying vec3 vWorld;
${Si}
void main() { gl_FragColor = vec4(haze(vec3(0.03, 0.025, 0.04), vWorld), 1.0); }`,b_=`
attribute vec4 aMote; // phase, rise speed, drift, time it appears
uniform float uTime;
varying vec3 vWorld;
varying float vA;
void main() {
  float t = uTime + aMote.x * 20.0, y = mod(t * aMote.y, 7.0);
  vec3 p = position + vec3(sin(t * 0.7 + aMote.x * 9.0) * aMote.z, y, cos(t * 0.5 + aMote.x * 5.0) * aMote.z);
  vWorld = p;
  vA = (uTime >= aMote.w ? 1.0 : 0.0) * smoothstep(0.0, 1.0, y) * (1.0 - smoothstep(5.0, 7.0, y));
  vec4 mv = viewMatrix * vec4(p, 1.0);
  gl_Position = projectionMatrix * mv;
  gl_PointSize = vA > 0.3 ? 1.0 : 0.0;
}`,y_=`
uniform vec3 uMoteColour;
varying float vA;
varying vec3 vWorld;
${Si}
void main() {
  if (vA < 0.3) discard;
  gl_FragColor = vec4(haze(uMoteColour * (0.6 + 0.6 * vA), vWorld), 1.0);
}`;class w_{constructor(e,t){this.scene=e,this.game=t;const i=t.tuning.stringLights;this.palette=i.palette.map(s=>new tt(s));const r={...ct,uWind:{value:t.tuning.canopyShadow.wind*1.5}};this.bulbMat=new yt({vertexShader:v_,fragmentShader:M_,uniforms:{...r,uRes:en.uRes,uNear:{value:240},uTwinkle:{value:i.twinkle},uChase:{value:i.chaseSpeed}}}),this.wireMat=new yt({vertexShader:__,fragmentShader:S_,uniforms:r}),this.moteMat=new yt({vertexShader:b_,fragmentShader:y_,uniforms:{...ct,uMoteColour:{value:new tt(1,.85,1)}}})}scene;game;built=new Map;palette;bulbMat;wireMat;moteMat;build(e,t,i,r){const s=this.game.tuning.stringLights,a=s.height,o=[],c=[],l=[],u=[],f=[];e.forEach((_,S)=>{const w=Math.hypot(_.bx-_.ax,_.bz-_.az),E=Math.max(2,Math.round(w/s.bulbSpacing)),L=b=>[_.ax+(_.bx-_.ax)*b,a-s.sag*4*b*(1-b)*(w/8),_.az+(_.bz-_.az)*b];for(let b=0;b<=16;b++){const A=L(b/16),P=L((b+1)/16);b<16&&(u.push(...A,...P),f.push(S+b/16,S+(b+1)/16))}for(let b=1;b<E;b++){const A=b/E,P=L(A),C=this.palette[(_.seed+b)%this.palette.length];o.push(...P),c.push(C.r,C.g,C.b),l.push((_.seed*13+b*7)%100/100,S*40+b,t(P[0],P[2])+b*.03,4*A*(1-A))}});const d=new ls,p=new $t;p.setAttribute("position",new Nt(o,3)),p.setAttribute("aColour",new Nt(c,3)),p.setAttribute("aBulb",new Nt(l,4));const g=new $t;g.setAttribute("position",new Nt(u,3)),g.setAttribute("aSway",new Nt(f,1)),d.add(new ic(g,this.wireMat),new Ea(p,this.bulbMat));const v=[],x=[];for(let _=0;_<48;_++){const S=A=>{const P=Math.sin(r*12.9898+_*78.233+A*37.719)*43758.5453;return P-Math.floor(P)},w=S(1)*Math.PI*2,E=2+S(2)*14,L=i.x+Math.cos(w)*E,b=i.z+Math.sin(w)*E;v.push(L,.3,b),x.push(S(3),.4+S(4)*.6,.3+S(5)*.8,t(L,b))}const m=new $t;m.setAttribute("position",new Nt(v,3)),m.setAttribute("aMote",new Nt(x,4));const M=new Ea(m,this.moteMat);return M.frustumCulled=!1,d.add(M),d.traverse(_=>{_.frustumCulled=!1}),d}update(){const e=this.game;if(!e.tuning.stringLights.on)return;this.bulbMat.depthTest=e.witch.lift<.5;let i=0;for(const[r,s]of e.party.areas){let a=this.built.get(r);if(!a){if(i++>=2)break;const o=x_(e.map,e.forest,s.cell),c=e.map.siteOf(s.cell[0],s.cell[1]),l=s.from?e.map.siteOf(s.from[0],s.from[1]):null,u=l?(l.x+c.x)/2:c.x,f=l?(l.z+c.z)/2:c.z,d=l?Math.hypot(c.x-u,c.z-f)*1.6:1,p=e.tuning.party.transition,g=(x,m)=>s.wave===0?-1:s.at+Math.min(1,Math.hypot(x-u,m-f)/d)*p,v=s.soundsystem??(s.wave===0?e.map.dancefloor:c);a={lines:o,group:this.build(o,g,v,s.cell[0]*131+s.cell[1]*17+e.seed),on:s.wave===0?-1:s.at},this.scene.add(a.group),this.built.set(r,a)}}}clear(){for(const[,e]of this.built)this.scene.remove(e.group);this.built.clear()}}const Yt=32,br=16,E_=`
uniform vec3 uRight, uUp;
uniform float uFlat;
attribute vec3 iPos;
attribute float iSize;
attribute vec4 iUv;
attribute vec4 iCol;
attribute float iDraw;
varying vec2 vUv, vP;
varying vec4 vCol;
varying float vDraw;
varying vec3 vWorld;
void main() {
  vec2 p = position.xy;
  vec3 w = uFlat > 0.5 ? iPos + vec3(p.x * iSize, 0.04, -p.y * iSize) : iPos + uRight * (p.x * iSize) + uUp * (p.y * iSize);
  vUv = vec2(mix(iUv.x, iUv.z, uv.x), mix(iUv.w, iUv.y, uv.y));
  vP = p; vCol = iCol; vDraw = iDraw; vWorld = w;
  gl_Position = projectionMatrix * viewMatrix * vec4(w, 1.0);
}`,A_=`
uniform sampler2D uGlyphs;
varying vec2 vUv, vP;
varying vec4 vCol;
varying float vDraw;
varying vec3 vWorld;
${Si}
void main() {
  float a = texture2D(uGlyphs, vUv).a * vCol.a;
  // Written on: revealed clockwise from the top as vDraw goes 0 to 1.
  float ang = fract(atan(vP.x, vP.y) / 6.2831853 + 1.0);
  if (ang > vDraw || a < 0.02) discard;
  gl_FragColor = vec4(haze(vCol.rgb * a, vWorld), 1.0);
}`;class Fh{mesh;geo=new sc;cap=0;n=0;pos;size;uv;col;draw;constructor(e){const t=new Ln(1,1);this.geo.index=t.index,this.geo.setAttribute("position",t.getAttribute("position")),this.geo.setAttribute("uv",t.getAttribute("uv")),this.grow(256),this.mesh=new qt(this.geo,e),this.mesh.frustumCulled=!1,this.mesh.renderOrder=3}grow(e){const t=(r,s)=>{const a=new Float32Array(e*s);return r&&a.set(r),a};this.pos=t(this.pos,3),this.size=t(this.size,1),this.uv=t(this.uv,4),this.col=t(this.col,4),this.draw=t(this.draw,1),this.cap=e,this.geo.dispose();const i=(r,s,a)=>this.geo.setAttribute(r,new nc(s,a).setUsage(Pr));i("iPos",this.pos,3),i("iSize",this.size,1),i("iUv",this.uv,4),i("iCol",this.col,4),i("iDraw",this.draw,1)}begin(){this.n=0}add(e,t,i,r,s,a,o,c,l,u=1){this.n>=this.cap&&this.grow(this.cap*2);const f=this.n++;this.pos.set([e,t,i],f*3),this.size[f]=r,this.uv.set(s,f*4),this.col.set([a,o,c,l],f*4),this.draw[f]=u}end(){this.geo.instanceCount=this.n;for(const e of["iPos","iSize","iUv","iCol","iDraw"])this.geo.getAttribute(e).needsUpdate=!0}}const T_=["🎉","🎈","💃","🎊","🥳","😛","🍉","🍒","🍷","🍸","🍹","🥂","🍺","😁","😆"],R_=[["😴","🫩","🥱","💼"],["😐","😐","🥱"],["😮","🤭","🫢","😛"],["🙂","🍷","🍺","😁"],["🥳","🎉","🎈","😆","🥂","💃"]];class C_{constructor(e,t){this.game=t,this.canvas.width=this.canvas.height=Yt*br;const i=this.canvas.getContext("2d"),r=i.createRadialGradient(Yt/2,Yt/2,0,Yt/2,Yt/2,Yt/2);r.addColorStop(0,"rgba(255,255,255,1)"),r.addColorStop(.35,"rgba(255,255,255,.55)"),r.addColorStop(1,"rgba(255,255,255,0)"),i.fillStyle=r,i.fillRect(0,0,Yt,Yt),this.tex=new _g(this.canvas),this.tex.magFilter=Ht,this.tex.minFilter=Ht,this.tex.generateMipmaps=!1;const s=a=>new yt({vertexShader:E_,fragmentShader:A_,uniforms:{...ct,uRight:en.uRight,uUp:en.uUp,uFlat:{value:a},uGlyphs:{value:this.tex}},transparent:!0,depthWrite:!1,blending:Fr});this.standing=new Fh(s(0)),this.flat=new Fh(s(1)),e.add(this.standing.mesh,this.flat.mesh)}game;canvas=document.createElement("canvas");tex;slots=new Map;colours=new Map;standing;flat;fizzles=[];bursts=[];chain=[];lastTime=0;bubbleWitch=document.getElementById("bubble-witch");bubbleCreature=document.getElementById("bubble-creature");v=new W;slotOf(e,t=0){const i=`${e}:${t}`;let r=this.slots.get(i);if(r!==void 0)return r;r=this.slots.size+1,this.slots.set(i,r);const s=this.canvas.getContext("2d"),a=r%br*Yt,o=Math.floor(r/br)*Yt;s.clearRect(a,o,Yt,Yt),Sf(s,e,{x:a+1,y:o+1,size:Yt-2,level:t,colour:[255,255,255],glow:!1});const c=s.getImageData(a,o,Yt,Yt);for(let u=3;u<c.data.length;u+=4)c.data[u]=c.data[u]>90?255:0;s.putImageData(c,a,o);const l=Ia(e);return this.colours.set(e,new tt(l[0]/255,l[1]/255,l[2]/255)),this.tex.needsUpdate=!0,r}uv(e){const t=Yt*br,i=e%br*Yt,r=Math.floor(e/br)*Yt;return[i/t,1-r/t,(i+Yt)/t,1-(r+Yt)/t]}update(e,t,i,r,s){const a=this.game,o=a.leash,c=a.tuning,l=a.witch,u=c.bond,f=c.leash,d=this.uv(0);this.standing.begin(),this.flat.begin();for(const _ of o.events)_.kind==="fizzled"&&this.fizzles.push({x:_.x,z:_.z,at:e}),_.kind==="invited"&&this.bursts.push({x:_.x,z:_.z,at:e,seed:_.id});this.fizzles=this.fizzles.filter(_=>e-_.at<.7),this.bursts=this.bursts.filter(_=>e-_.at<.9);for(const _ of this.bursts){const S=(e-_.at)/.9;for(let w=0;w<28;w++){const E=He(_.seed,w,3)*Math.PI*2,L=2+He(_.seed,w,5)*3,b=2+He(_.seed,w,7)*3,A=[[1,.4,.8],[.3,.95,1],[1,.9,.3],[.6,1,.4],[1,1,1]][w%5];this.standing.add(_.x+Math.cos(E)*L*S,.6+b*S-4*S*S,_.z+Math.sin(E)*L*S,.3,d,A[0],A[1],A[2],1-S)}}if(o.talk){const _=a.creatures[o.talk.id],S=o.talk.refused?0:Math.min(1,o.talk.t/o.talk.total),w=28;for(let E=0;E<w;E++){const L=Math.PI/2-E/w*Math.PI*2,b=E/w<S;this.flat.add(_.x+Math.cos(L)*1.5,0,_.z+Math.sin(L)*1.1,.35,d,1,b?.6:.9,b?.9:1,b?.9:.18)}}const p=c.stack,g=Math.min(.1,Math.max(0,e-this.lastTime)),v=new Map;for(this.lastTime=e;this.chain.length<o.stack.length;)this.chain.push({x:0,z:0,vx:0,vz:0});let x={x:0,z:0},m=s;for(let _=o.stack.length-1;_>=0;_--){const S=o.stack[_],w=a.creatures[S],E=o.stack.length-1-_,L=this.chain[E],b=(2+w.level*.4)*p.scale,A=Math.sin(e*1.7+E*.9)*p.idleSway*(1+E*.5),P=x.x-l.vx*p.trail+A,C=x.z-l.vz*p.trail;L.vx+=((P-L.x)*p.stiffness-L.vx*p.damping)*g,L.vz+=((C-L.z)*p.stiffness-L.vz*p.damping)*g,L.x+=L.vx*g,L.z+=L.vz*g,x=L,m+=(E===0?p.offset*b:p.gap*b)+b/2;const N=new W(l.x+L.x,m,l.z+L.z);m+=b/2,v.set(S,N);const U=(this.slotOf(w.species,w.level),this.colours.get(w.species));this.standing.add(N.x,N.y,N.z,b,this.uv(this.slotOf(w.species,w.level)),U.r,U.g,U.b,1)}for(const _ of o.placed){const S=a.creatures[_.id],w=this.slotOf(S.species,S.level),E=this.colours.get(S.species),L=.8+.2*Math.sin(e*2+_.id);this.flat.add(_.x,0,_.z,3+S.level*.8,this.uv(w),E.r*L,E.g*L,E.b*L,1,Math.min(1,(e-_.at)/.8)),this.flat.add(_.x,0,_.z,5,d,E.r,E.g,E.b,.25)}if(l.mode==="ground"&&o.stack.length&&!o.placed.some(_=>Math.hypot(_.x-l.x,_.z-l.z)<=f.pickRadius)){const _=a.creatures[o.stack[o.stack.length-1]],S=this.colours.get(_.species),w=lu(o,l.x,l.z,c);this.flat.add(l.x,0,l.z,3+_.level*.8,this.uv(this.slotOf(_.species,_.level)),w?1:S.r,w?.1:S.g,w?.1:S.b,.22)}for(const _ of this.fizzles){const S=1-(e-_.at)/.7;this.flat.add(_.x,0,_.z,3*(1+(1-S)*.6),d,1,.15,.1,S)}const M=[...o.stack,...o.placed.map(_=>_.id)];for(const _ of M){const S=a.creatures[_],w=this.colours.get(S.species);if(!w)continue;const E=o0(o,_,l.x,l.z);u.rim&&this.flat.add(S.x,0,S.z,1.8,d,w.r,w.g,w.b,.35);const L=v.get(_)??new W(E.x,.2,E.z);if(u.sparks){const A=Math.max(.5,u.sparkEvery),P=(e+_*.618%1*A)%A;if(P<.7){const C=P/.7;this.standing.add(L.x+(S.x-L.x)*C,L.y+(.6-L.y)*C+Math.sin(C*Math.PI)*1.2,L.z+(S.z-L.z)*C,.35,d,w.r,w.g,w.b,1)}}const b=Math.hypot(S.x-E.x,S.z-E.z);if(u.thread&&b>f.length*.85){const A=Math.min(1,(b-f.length*.85)/f.length),P=Math.min(60,Math.floor(b/1.2));for(let C=1;C<P;C++){const N=(C+e*2%1)/P;this.standing.add(L.x+(S.x-L.x)*N,L.y+(.5-L.y)*N,L.z+(S.z-L.z)*N,.22,d,w.r,w.g,w.b,.25+.75*A)}}}this.standing.end(),this.flat.end(),this.bubbles(e,t,i,r)}bubbles(e,t,i,r){const s=this.game,a=s.leash.talk,o=this.bubbleWitch,c=this.bubbleCreature;if(!o||!c)return;const l=s.witch,u=(_,S,w,E)=>{this.v.set(S,w,E).project(t),_.style.left=`${(this.v.x+1)/2*i}px`,_.style.top=`${(1-this.v.y)/2*r}px`},f=c.querySelector("span"),d=c.querySelector(".bar");if(!a){d.style.display="none",c.classList.remove("on"),o.classList.toggle("on",s.leash.held),s.leash.held&&(o.textContent=s.leash.heldInAir?"land to talk":"…",u(o,l.x-1.2,Or(l,s.tuning)+2.2,l.z));return}const p=s.creatures[a.id];if(u(o,l.x-1.2,Or(l,s.tuning)+2.2,l.z),u(c,p.x,1.2+p.level*.8,p.z),a.refused){o.classList.remove("on"),f.textContent=He(a.id,1,9)<.5?"😒":"🙄",d.style.display="none",c.classList.toggle("on",a.t<1.6),c.style.opacity="1";return}d.style.display="";const g=Math.floor(a.t/a0(p,s.tuning)),v=Math.min(1,a.t/a.total),x=(_,S)=>_[Math.floor(He(a.id,S,5)*_.length)%_.length],m=[4,2,0][Math.min(2,p.level)],M=Math.round(m+(4-m)*v);o.textContent=x(T_,g-g%2),o.classList.toggle("on",g%2===0),f.textContent=g>=1?x(R_[M],g-(g+1)%2):"…",d.querySelector("i").style.width=`${v*100}%`,c.classList.add("on"),c.style.opacity=g%2===1?"1":"0.6"}}const L_=[1,3,5,7,9],Ju=n=>{const e=60/Math.max(1,n.beat.bpm);return{beat:e,bar:e*4}};function P_(n,e,t,i){const r=i.lasers,{beat:s,bar:a}=Ju(i),o=a*Math.max(1,r.blockBars),c=Math.floor(n/o),l=n-c*o,u=Oi(r.duty*t,0,1),d=He(e,c,311)<u?vn(l/Math.max(.001,r.fadeIn))*vn((o-l)/Math.max(.001,r.fadeOut)):0,p=Math.floor(l/a),g=L_.filter(S=>S<=r.maxCount),v=g[Math.floor(He(e,c*64+p,313)*g.length)%g.length]??1,x=e%97*.37,m=Math.sin(2*Math.PI*n/(s*r.sweepBeats)+x)*(r.sweep*Math.PI)/180,M=.55+.45*Math.sin(2*Math.PI*n/(a*r.openBars)+x*2),_=((e%1e3*.0137+n/(a*8))%1+1)%1;return{on:d,count:v,sweep:m,open:M,hue:_}}const D_=`
attribute vec4 aCol; // rgb, alpha
attribute float aU;  // 0 at the source, 1 at the far end
varying vec4 vCol;
varying float vU;
void main() { vCol = aCol; vU = aU; gl_Position = projectionMatrix * viewMatrix * vec4(position, 1.0); }`,I_=`
varying vec4 vCol;
varying float vU;
void main() { float a = vCol.a * pow(1.0 - vU, 0.6); gl_FragColor = vec4(vCol.rgb * a, 1.0); }`,as=[[.3,.95,1],[.35,.55,1],[.7,.4,1],[1,.3,.85],[.45,1,.55]],N_=n=>{const e=(n%1+1)%1*as.length,t=Math.floor(e),i=e-t,r=as[t%as.length],s=as[(t+1)%as.length];return[r[0]+(s[0]-r[0])*i,r[1]+(s[1]-r[1])*i,r[2]+(s[2]-r[2])*i]};class U_{constructor(e,t){this.game=t,this.mesh=new ic(this.geo,new yt({vertexShader:D_,fragmentShader:I_,transparent:!0,depthWrite:!1,blending:Fr})),this.mesh.frustumCulled=!1,e.add(this.mesh)}game;geo=new $t;pos=new Float32Array(0);col=new Float32Array(0);u=new Float32Array(0);mesh;update(e,t,i,r){const s=this.game.tuning,a=s.lasers,{bar:o}=Ju(s),c=o*a.blockBars,l=[],u=[],f=[];if(a.on)for(const d of t){const p=1-Math.min(1,Math.max(0,(Math.hypot(d.x-i,d.z-r)-a.fadeNear)/Math.max(1,a.fadeFar-a.fadeNear)));if(p<=0)continue;const g=P_(e,d.seed,1,s),v=e-d.ready,x=v>=0&&v<c?Math.min(1,v/a.fadeIn)*Math.min(1,(c-v)/a.fadeOut):0,m=Math.max(g.on,x),M=x>g.on?a.maxCount:g.count;if(m<=.01)continue;const _=a.spread*Math.PI/180*g.open;for(let S=0;S<M;S++){const w=M===1?0:S/(M-1)-.5,E=a.maxTilt*Math.PI/180,L=Math.max(-E,Math.min(E,w*_+g.sweep)),b=Math.sin(L),A=Math.cos(L),P=-.15*Math.cos(L*3+d.seed),C=N_(g.hue+S*.07),N=a.opacity*m*p;l.push(d.x,d.y,d.z,d.x+b*a.length,d.y+A*a.length,d.z+P*a.length),u.push(...C,N,...C,N),f.push(0,1)}}if(l.length>this.pos.length&&(this.pos=new Float32Array(l.length*2),this.col=new Float32Array(u.length*2),this.u=new Float32Array(f.length*2),this.geo.setAttribute("position",new Rn(this.pos,3).setUsage(Pr)),this.geo.setAttribute("aCol",new Rn(this.col,4).setUsage(Pr)),this.geo.setAttribute("aU",new Rn(this.u,1).setUsage(Pr))),!!this.geo.getAttribute("position")){this.pos.set(l),this.col.set(u),this.u.set(f);for(const d of["position","aCol","aU"])this.geo.getAttribute(d).needsUpdate=!0;this.geo.setDrawRange(0,l.length/3)}}}function*O_(n,e,t,i){const r=n.siteOf(e[0],e[1]),s=n.areaSize*1.5,a=Math.max(t*2,8),o=n.bounds,c=(m,M)=>{if(m<o.minX||m>o.maxX||M<o.minZ||M>o.maxZ)return"edge";const _=n.areaAt(m,M).cell;return`${_[0]},${_[1]}`},l=`${e[0]},${e[1]}`,u=Math.ceil(2*s/a),f=r.x-s,d=r.z-s,p=[];for(let m=0;m<=u;m++){for(let M=0;M<=u;M++)p.push(c(f+M*a,d+m*a));yield}const g=new Set,v=Math.max(1,Math.round(a/t)),x=a/v;for(let m=0;m<u;m++,yield)for(let M=0;M<u;M++){const _=[p[m*(u+1)+M],p[m*(u+1)+M+1],p[(m+1)*(u+1)+M],p[(m+1)*(u+1)+M+1]];if(!_.includes(l)||_.every(w=>w===l))continue;const S=[];for(let w=0;w<=v;w++)for(let E=0;E<=v;E++)S.push(c(f+M*a+E*x,d+m*a+w*x));for(let w=0;w<=v;w++)for(let E=0;E<=v;E++){const L=S[w*(v+1)+E],b=f+M*a+E*x,A=d+m*a+w*x;for(const[P,C]of[[1,0],[0,1]]){if(E+P>v||w+C>v)continue;const N=S[(w+C)*(v+1)+E+P];if(L===N||L!==l&&N!==l)continue;const U=b+P*x*.5,D=A+C*x*.5,O=`${Math.round(U*4)},${Math.round(D*4)}`;g.has(O)||(g.add(O),i.push({x:U,z:D,other:L===l?N:L}))}}}}const F_=`
attribute vec3 aColour;
attribute vec2 aSpark; // phase, time it switches on
uniform float uTime, uWidth, uSparkle;
varying vec3 vColour;
varying vec3 vWorld;
varying float vB;
void main() {
  vWorld = position;
  float tw = 0.5 + 0.5 * sin(uTime * (2.0 + aSpark.x * 3.0) + aSpark.x * 40.0);
  float run = pow(0.5 + 0.5 * sin((position.x + position.z) * 0.12 - uTime * 2.5), 8.0);
  vB = mix(1.0, 0.45 + 0.55 * tw + run, uSparkle);
  vColour = aColour;
  gl_Position = projectionMatrix * viewMatrix * vec4(position, 1.0);
  gl_PointSize = uTime >= aSpark.y ? uWidth : 0.0;
}`,B_=`
uniform float uBright;
varying vec3 vColour;
varying vec3 vWorld;
varying float vB;
${Si}
void main() { gl_FragColor = vec4(haze(vColour * vB * uBright, vWorld), 1.0); }`;class z_{constructor(e,t){this.game=t;const i=t.tuning.borders;this.mesh=new Ea(this.geo,new yt({vertexShader:F_,fragmentShader:B_,uniforms:{...ct,uWidth:{value:i.width},uSparkle:{value:i.sparkle},uBright:{value:i.brightness}},transparent:!0,depthWrite:!1,blending:Fr})),this.mesh.frustumCulled=!1,e.add(this.mesh)}game;areas=new Map;jobs=[];geo=new $t;stamp="";mesh;update(){const e=this.game,t=e.tuning.borders;if(!t.on){this.mesh.visible=!1;return}for(const[c,l]of e.party.areas){if(this.areas.has(c))continue;const u=e.map.siteOf(l.cell[0],l.cell[1]),f=l.from?e.map.siteOf(l.from[0],l.from[1]):null,d=f?(f.x+u.x)/2:u.x,p=f?(f.z+u.z)/2:u.z,g=e.map.areaSize*1.6,v=e.tuning.party.transition,x=Ia(Cn[e.map.typeOf(l.cell[0],l.cell[1])].creature),m={points:[],colour:new tt(x[0]/255,x[1]/255,x[2]/255),on:(M,_)=>l.wave===0?-1:l.at+Math.min(1,Math.hypot(M-d,_-p)/g)*v,done:!1};this.areas.set(c,m),this.jobs.push({key:c,gen:O_(e.map,l.cell,t.step,m.points)})}const i=performance.now()+3;for(;this.jobs.length&&performance.now()<i;){const c=this.jobs[0];c.gen.next().done&&(this.areas.get(c.key).done=!0,this.jobs.shift())}const r=`${e.party.areas.size}|${[...this.areas.values()].filter(c=>c.done).length}`;if(r===this.stamp)return;this.stamp=r;const s=[],a=[],o=[];for(const[,c]of this.areas)if(c.done)for(const l of c.points)l.other!=="edge"&&e.party.areas.has(l.other)||(s.push(l.x,.15,l.z),a.push(c.colour.r,c.colour.g,c.colour.b),o.push(((l.x*12.9898+l.z*78.233)%1+1)%1,c.on(l.x,l.z)));this.geo.setAttribute("position",new Nt(s,3)),this.geo.setAttribute("aColour",new Nt(a,3)),this.geo.setAttribute("aSpark",new Nt(o,2))}}const k_=`
varying vec3 vWorld;
void main() {
  vec4 w = modelMatrix * vec4(position, 1.0);
  vWorld = w.xyz;
  gl_Position = projectionMatrix * viewMatrix * w;
}`,G_=`
uniform float uStrength, uWind, uPixel;
uniform sampler2D uDepth; uniform vec2 uLow;
varying vec3 vWorld;
${Si}
float hash(vec2 p) { p = fract(p * vec2(123.34, 456.21)); p += dot(p, p + 45.32); return fract(p.x * p.y); }
float vnoise(vec2 p) {
  vec2 i = floor(p), f = fract(p), u = f * f * (3.0 - 2.0 * f);
  float a = hash(i), b = hash(i + vec2(1, 0)), c = hash(i + vec2(0, 1)), d = hash(i + vec2(1, 1));
  return a + (b - a) * u.x + (c - a) * u.y + (a - b - c + d) * u.x * u.y;
}
void main() {
  vec2 p = uSmooth > 0.5 ? vWorld.xz : (floor(vWorld.xz / uPixel) + 0.5) * uPixel; // pixel: on the art's grid
  vec2 drift = vec2(1.0, 0.35) * uWind * uTime;
  float n = vnoise((p + drift) / 14.0) * 0.65 + vnoise((p - drift * 0.6) / 5.0) * 0.35;
  float far = smoothstep(uHazeRange.x * 0.5, uHazeRange.y, length(vWorld.xz - uHazeCentre));
  float a = uStrength * (smoothstep(0.45, 0.85, n) + far * 0.3);
  vec3 col = mix(uHazeColour * 1.8, uMoon * 0.7 + uAmb * 0.8, 0.5);
  if (uSmooth > 0.5) {
    if (gl_FragCoord.z > texture2D(uDepth, gl_FragCoord.xy / uLow).r) discard; // behind a tree
    a = clamp(a * 1.4, 0.0, 1.0);
    gl_FragColor = vec4(col * a, a); // premultiplied, for the overlay
    return;
  }
  // Ordered dither on the art's pixel grid: pixel art, no smooth alpha.
  vec2 g = mod(floor(gl_FragCoord.xy), 4.0);
  int i = int(g.x) + int(g.y) * 4;
  int m[16] = int[16](0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5);
  if ((float(m[i]) + 0.5) / 16.0 >= a) discard;
  gl_FragColor = vec4(col, 1.0);
}`;class H_{constructor(e,t,i,r,s,a,o){this.height=t,this.mat=new yt({vertexShader:k_,fragmentShader:G_,uniforms:{...ct,uStrength:{value:e},uWind:{value:i},uPixel:{value:r},uDepth:{value:a},uLow:{value:o}},depthWrite:!1,depthTest:!s,blending:s?ri:Lr}),this.mesh=new qt(new Ln(700,700).rotateX(-Math.PI/2),this.mat),this.mesh.frustumCulled=!1,this.mesh.renderOrder=2}height;mesh;mat;follow(e,t){this.mesh.position.set(e,this.height,t-150)}}const W_=`
attribute vec4 iShadow; // x, z, width, depth (metres)
varying vec2 vLocal;
varying vec3 vWorld;
void main() {
  vLocal = position.xz * 2.0;
  vec3 w = vec3(iShadow.x + position.x * iShadow.z, 0.03, iShadow.y + position.z * iShadow.w);
  vWorld = w;
  gl_Position = projectionMatrix * viewMatrix * vec4(w, 1.0);
}`,V_=`
uniform float uStrength;
varying vec2 vLocal;
varying vec3 vWorld;
${Si}
float bayer(vec2 p) {
  int i = int(mod(p.x, 4.0)) + int(mod(p.y, 4.0)) * 4;
  int m[16] = int[16](0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5);
  return (float(m[i]) + 0.5) / 16.0;
}
void main() {
  float r = dot(vLocal, vLocal);
  if (r > 1.0) discard;
  float a = uStrength * (1.0 - r * r);
  if (uSmooth > 0.5) {
    float h = smoothstep(uHazeRange.x, uHazeRange.y, length(vWorld.xz - uHazeCentre));
    gl_FragColor = vec4(mix(vec3(1.0 - a * (1.0 - r)), vec3(1.0), h * h), 1.0); // multiplied over the ground
    return;
  }
  if (bayer(gl_FragCoord.xy) >= a) discard;
  gl_FragColor = vec4(haze(uHazeColour * 0.25, vWorld), 1.0);
}`;class X_{mesh;geo=new sc;attr;capacity=0;constructor(e,t=!0){const i=new Ln(1,1).rotateX(-Math.PI/2);this.geo.index=i.index,this.geo.setAttribute("position",i.getAttribute("position")),this.attr=this.grow(1024);const r=new yt({vertexShader:W_,fragmentShader:V_,uniforms:{...ct,uStrength:{value:e}},depthWrite:!1,...t?{transparent:!0,blending:Wl,blendSrc:Vl,blendDst:Xl}:{}});this.mesh=new qt(this.geo,r),this.mesh.frustumCulled=!1,this.mesh.renderOrder=1}grow(e){return this.capacity=Math.max(e,this.capacity*2),this.geo.dispose(),this.attr=new nc(new Float32Array(this.capacity*4),4),this.attr.setUsage(Pr),this.geo.setAttribute("iShadow",this.attr),this.attr}set(e){e.length>this.capacity&&this.grow(e.length);const t=this.attr.array;e.forEach((i,r)=>{t[r*4]=i.x,t[r*4+1]=i.z,t[r*4+2]=i.w,t[r*4+3]=i.d}),this.attr.needsUpdate=!0,this.geo.instanceCount=e.length,this.mesh.visible=e.length>0}}class Y_{constructor(e,t,i){this.canvas=e,this.game=t,this.style=i;const r=t.tuning;this.renderer=new RM({canvas:e,antialias:!1,powerPreference:"high-performance",preserveDrawingBuffer:!0}),this.renderer.setPixelRatio(1),this.renderer.info.autoReset=!1,this.renderer.outputColorSpace=ps,this.mpp=1/(r.artPixelsPerMetre*(2/r.pixelSize)),this.camera=new yn(r.camera.fov,1,1,900),this.post=new o_(this.renderer,r),this.scene.background=new tt(723478),QM(i,r.glowReach,this.mpp,r.tone.ambient),ct.uGlowPower.value=r.glowPower,this.assets=new JM(i,t.seed,r.pixelSize),this.ground=new t_(t.map,t.forest,i,this.mpp),this.assets.onFloor=(d,p)=>this.ground.setFloor(d,p);const s=r.canopyShadow;this.ground.setCanopyShadow(s.on?s.strength:0,s.height,s.cover,s.wind),this.shadows=new X_(r.shadows.strength,r.fx==="smooth"),this.shadows.mesh.visible=r.shadows.on,this.scene.add(this.shadows.mesh);const a=r.fx==="smooth";ct.uSmooth.value=a?1:0,r.mist.on&&r.mist.strength>0&&(this.mist=new H_(r.mist.strength,r.mist.height,r.mist.wind,this.mpp,a,this.post.scene.depthTexture,this.post.lowSize),a?(this.post.fxScene=new Kc,this.post.fxScene.add(this.mist.mesh)):this.scene.add(this.mist.mesh)),ct.uHazeRange.value.set(r.haze.near,r.haze.far),this.scene.add(this.ground.mesh);const o=r.occlusion;this.witchBatch=new Sr(this.assets.witch,this.mpp,{unlit:!0,silhouette:{colour:ct.uGlowRgb.value.clone(),opacity:o.silhouette}}),this.witchBatch.mesh.renderOrder=10,this.scene.add(...this.witchBatch.meshes),en.uOcc.value.set(o.fadeOpacity,o.edge,o.minHeight,o.on?1:0),this.stoneBatch=new Sr(this.assets.stones,this.mpp,{fade:!0}),this.scene.add(...this.stoneBatch.meshes);const c=t.map.dancefloor,l=[],u=t.tuning.dancefloor.stones;for(let d=0;d<u;d++){const p=d/u*Math.PI*2+.3;l.push({x:c.x+Math.cos(p)*c.radius,y:0,z:c.z+Math.sin(p)*c.radius,frame:this.assets.stones.frames[d%4],flip:d%2===0})}this.stoneBatch.set(l),this.propBatch=new Sr(this.assets.props,this.mpp,{fade:!0}),this.scene.add(...this.propBatch.meshes),this.partyView=new m_(this.assets.soundsystems,this.mpp),this.strings=new w_(this.scene,t),this.leashView=new C_(this.scene,t),this.lasers=new U_(this.scene,t),this.borders=new z_(this.scene,t),this.soundBatch=new Sr(this.assets.soundsystems,this.mpp,{fade:!0}),this.scene.add(...this.soundBatch.meshes),this.dancefloor=new f_(t.map,r,en,this.mpp),this.scene.add(this.dancefloor.ball,this.dancefloor.beam,this.dancefloor.motes);const f=r.fx==="smooth"?new yt({transparent:!0,depthWrite:!1,blending:Wl,blendSrc:Vl,blendDst:Xl,vertexShader:"varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }",fragmentShader:"varying vec2 vUv; void main(){ vec2 p = vUv * 2.0 - 1.0; float r = dot(p, p); if (r > 1.0) discard; gl_FragColor = vec4(vec3(1.0 - 0.75 * (1.0 - r) * (1.0 - r)), 1.0); }"}):new yt({transparent:!1,depthWrite:!1,vertexShader:"varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }",fragmentShader:"varying vec2 vUv; void main(){ vec2 p = vUv * 2.0 - 1.0; if (dot(p, p) > 1.0 || mod(floor(gl_FragCoord.x) + floor(gl_FragCoord.y), 2.0) > 0.5) discard; gl_FragColor = vec4(0.02, 0.02, 0.05, 1.0); }"});this.shadow=new qt(new Ln(1.4,.7).rotateX(-Math.PI/2),f),this.shadow.renderOrder=1,this.scene.add(this.shadow)}canvas;game;style;renderer;scene=new Kc;camera;ground;assets;typeBatches=new Map;creatureBatches=new Map;witchBatch;stoneBatch;shadow;mpp;lastBuild={x:1/0,y:1/0,z:1/0,version:-1};post;dancefloor;propBatch;partyView;strings;leashView;lasers;borders;soundBatch;sources=[];forestLights=[];shadows;shadowList=[];mist=null;width=1;height=1;debugCull=!1;ghosts=[];ghostLines=null;now=0;stats={dropped:0,trees:0,bushes:0,creatures:0,batches:0,drawCalls:0,pendingArt:0,pendingGround:0,lights:0};resize(e,t){const i=this.game.tuning.pixelSize;this.width=Math.max(1,Math.ceil(e/i)),this.height=Math.max(1,Math.ceil(t/i));const r=this.post.fullResolution?i:1;this.renderer.setSize(this.width*r,this.height*r,!1),this.post.resize(this.width,this.height,this.width*r,this.height*r),this.canvas.style.width=this.width*i+"px",this.canvas.style.height=this.height*i+"px",this.camera.aspect=this.width/this.height,this.camera.updateProjectionMatrix(),en.uRes.value.set(this.width,this.height)}async prepare(){this.render(0,!1),this.drawCreatures(),this.ground.fill(this.renderer,this.viewRect(this.game.tuning.haze.near,20),this.game.witch.x,this.game.witch.z,1/0),await this.assets.whenIdle(),this.render(0,!1),this.refresh(!0);for(let e=0;e<Cn.length;e++)this.assets.prefetchType(e);for(const e of Cn)this.assets.creatureArt(e.creature)}batchFor(e,t,i){let r=e.get(t);return r||(r=i(),r&&(e.set(t,r),this.scene.add(...r.meshes))),r}frustum=new ba;frustumTo=new ba;cullCam=new yn;box=new Vr;m4=new Ut;v3=new W;at=new Map;tracks={placed:{now:new Set,before:new Set},moving:{now:new Set,before:new Set}};pops=[];poseCamera(e,t){const i=t.angle*Math.PI/180;e.position.set(t.tx,t.ty+Math.sin(i)*t.distance,t.tz+Math.cos(i)*t.distance),e.up.set(0,1,0),e.lookAt(t.tx,t.ty,t.tz),e.updateMatrixWorld()}updateFrustum(){const e=this.game,t=e.tuning,i=this.camera;i.updateMatrixWorld(),this.m4.multiplyMatrices(i.projectionMatrix,i.matrixWorldInverse),this.frustum.setFromProjectionMatrix(this.m4);const r=Math.max(1,t.camera.zoomSteps),s=e.witch.mode==="rising"||e.witch.mode==="treetop"?1:0,a=kh({...e.camera,zoom:r>1?e.camera.zoomStep/(r-1):0},s,t),o=this.cullCam;o.fov=i.fov,o.aspect=i.aspect,o.near=i.near,o.far=i.far,o.updateProjectionMatrix(),this.poseCamera(o,{...a,ty:Hn(t.groundHeight,t.treetopHeight,s)}),this.m4.multiplyMatrices(o.projectionMatrix,o.matrixWorldInverse),this.frustumTo.setFromProjectionMatrix(this.m4)}viewRect(e,t){const i=this.game.witch,r=[];for(const o of[this.camera,this.cullCam]){const c=o.position,l=e+Math.hypot(c.x-i.x,c.z-i.z)+t;for(const u of[-1,1])for(const f of[-1,1]){const d=this.v3.set(u,f,1).unproject(o).sub(c).normalize();for(const p of[0,25]){let g=d.y<-.001?(p-c.y)/d.y:1/0;g>0||(g=1/0),g=Math.min(g,l),r.push([c.x+d.x*g,c.z+d.z*g])}}r.push([c.x,c.z])}const s=r.map(o=>o[0]),a=r.map(o=>o[1]);return{minX:Math.min(...s)-t,maxX:Math.max(...s)+t,minZ:Math.min(...a)-t,maxZ:Math.max(...a)+t}}inView(e,t,i,r,s){const a=this.game.witch.x,o=this.game.witch.z,c=this.game.tuning.haze.far+s;return(e-a)**2+(t-o)**2>c*c?!1:(this.box.min.set(e-i/2-s,-s,t-r-s),this.box.max.set(e+i/2+s,r+s,t+s),this.frustum.intersectsBox(this.box)||this.frustumTo.intersectsBox(this.box))}inInnerView(e,t,i){const r=this.game.witch,s=this.game.tuning.haze;if(Math.hypot(e-r.x,t-r.z)>s.near+(s.far-s.near)*.6)return!1;for(const a of[0,i*.5,i]){const o=this.v3.set(e,a,t).project(this.camera);if(Math.abs(o.x)<1&&Math.abs(o.y)<1&&o.z<1)return!0}return!1}mark(e,t,i,r,s=""){const a=e==="creature"||e==="prop"?this.tracks.moving:this.tracks.placed,o=e==="creature"?`${e}|${s}`:`${e}|${t.toFixed(1)}|${i.toFixed(1)}|${r.toFixed(1)}|${s}`;return e==="creature"&&this.at.set(o,[t,i,r]),a.now.add(o),!a.before.has(o)}checkPops(e,t=!0){const i=this.tracks[e],r=t&&this.assets.pending===0&&i.before.size>0;if(this.debugCull){for(const s of i.before)if(!i.now.has(s)){const a=this.at.get(s),[,...o]=s.split("|"),[c,l,u]=a??o.map(Number);this.ghosts.push({x:+c,z:+l,h:Math.max(1,+u),until:this.now+1})}}if(r){const s=(a,o)=>{const c=this.at.get(a),[l,...u]=a.split("|"),[f,d,p]=c??u.map(Number);this.inInnerView(+f,+d,+p)&&this.pops.push(`${o} ${l} ${(+f).toFixed(0)},${(+d).toFixed(0)}`)};for(const a of i.now)i.before.has(a)||s(a,"appeared");for(const a of i.before)i.now.has(a)||s(a,"vanished")}i.before=i.now,i.now=new Set}lastPose={distance:0,angle:0,zoomStep:-1,lift:-1};refresh(e=!1){const t=this.game,i=t.tuning,r=this.camera,s=i.viewMargin,a=Cc(t),o={x:r.position.x,y:r.position.y,z:r.position.z},c=this.lastPose,l=t.witch.mode==="rising"||t.witch.mode==="treetop"?1:0,u=Math.hypot(o.x-this.lastBuild.x,o.y-this.lastBuild.y,o.z-this.lastBuild.z)>=s/3,f=Math.abs(a.distance-c.distance)>2||Math.abs(a.angle-c.angle)>.5||t.camera.zoomStep!==c.zoomStep||l!==c.lift;if(!e&&!u&&!f&&this.assets.version===this.lastBuild.version)return;this.lastBuild={...o,version:this.assets.version},this.lastPose={distance:a.distance,angle:a.angle,zoomStep:t.camera.zoomStep,lift:l};const d=this.viewRect(i.haze.far,s),p=(d.minX+d.maxX)/2,g=(d.minZ+d.maxZ)/2,v=Math.max(d.maxX-d.minX,d.maxZ-d.minZ)/2,x=[],m=ct.uMoonDir.value,M=-m.x/Math.max(.2,m.y),_=-m.z/Math.max(.2,m.y),S=new Map,w=(P,C)=>{let N=S.get(P);N||S.set(P,N=[]),N.push(C)},E=this.mpp;let L=0,b=0;for(const P of t.forest.treesNear(p,g,v)){const C=this.assets.typeArt(P.type);if(!C||!C.layout.big.length)continue;const N=C.atlas.frames,U=C.layout.big[P.variant%C.layout.big.length],D=N[U.top??U.bot];if(!this.inView(P.x,P.z,D.w*E,D.h*E,s))continue;const O=this.mark("tree",P.x,P.z,D.h*E);w(P.type,{x:P.x,y:0,z:P.z,frame:N[U.bot],flip:P.flip,fresh:O}),U.top!==null&&w(P.type,{x:P.x,y:0,z:P.z,frame:N[U.top],flip:P.flip,top:!0,fresh:O});const z=D.w*E,V=D.h*E*(U.top===null?.2:.6);i.shadows.trees&&x.push({x:P.x+M*V,z:P.z+_*V,w:z*.8,d:z*.45}),L++}const A=(P,C,N)=>{for(const U of C){const D=this.assets.typeArt(U.type);if(!D)continue;const O=N(D.layout);if(!O.length)continue;const z=O[U.variant%O.length],V=D.atlas.frames,Q=V[z.bot],Y=V[z.top??z.bot],te=P==="setpiece"?i.setPieceScale:1,F=E*te;if(!this.inView(U.x,U.z,Y.w*F,Y.h*F,s))continue;const ne=this.mark(P,U.x,U.z,Y.h*F);w(U.type,{x:U.x,y:0,z:U.z,frame:Q,flip:U.flip,fresh:ne,scale:te}),z.top!==null&&w(U.type,{x:U.x,y:0,z:U.z,frame:V[z.top],flip:U.flip,top:!0,fresh:ne,scale:te}),x.push({x:U.x,z:U.z,w:Q.w*F*.8,d:Q.w*F*.3}),b++}};A("small",t.forest.bushesNear(p,g,v),P=>P.small),A("wall",t.forest.wallsNear(p,g,v),P=>P.walls.map(C=>({bot:C,top:null}))),A("setpiece",t.forest.setPiecesNear(p,g,v),P=>P.set===null?[]:[P.set]);for(const[P,C]of this.typeBatches)S.has(P)||C.set([]);for(const[P,C]of S)this.batchFor(this.typeBatches,P,()=>{const U=this.assets.typeArt(P);return U&&new Sr(U.atlas,E,{fade:!0})})?.set(C);this.checkPops("placed",!e),this.sources=t.forest.lightsNear(t.witch.x,t.witch.z,i.haze.far+s),this.stats.trees=L,this.stats.bushes=b,this.shadowList=x}drawCreatures(e=0){const t=this.game,i=t.tuning.haze.far+20,r=new Map,s=new Map,a=[],o=60/t.tuning.beat.bpm;let c=0;for(const l of t.creatures){if(Math.abs(l.x-t.witch.x)>i||Math.abs(l.z-t.witch.z)>i)continue;const u=l.leashed?this.assets.partyArt(l.species,l.id,Ia(l.species)):void 0,f=u??this.assets.creatureArt(l.species),d=u?`party-${l.id}`:l.species;if(!f)continue;s.set(d,f);const p=f.atlas.frames[f.frame(l.level,l.moving?Math.floor(l.walk)%2:0,l.away)];if(!this.inView(l.x,l.z,p.w*this.mpp,p.h*this.mpp,4))continue;const g=this.mark("creature",l.x,l.z,p.h*this.mpp,l.id);let v=r.get(d);v||r.set(d,v=[]);const x=(e/o+l.id%4*.25)*Math.PI,m=l.leashed?Math.abs(Math.sin(x))*(l.moving?.15:.4):0,M=l.leashed&&!l.moving?Math.sin(x*.5)*.12:0;v.push({x:l.x+M,y:m,z:l.z,frame:p,flip:l.facing<0,fresh:g}),a.push({x:l.x,z:l.z,w:p.w*this.mpp*.7,d:p.w*this.mpp*.25}),c++}for(const[l,u]of this.creatureBatches)r.has(l)||u.set([]);for(const[l,u]of r)this.batchFor(this.creatureBatches,l,()=>{const d=s.get(l);return d&&new Sr(d.atlas,this.mpp)})?.set(u);this.stats.creatures=c,this.game.tuning.shadows.on&&this.shadows.set(this.shadowList.concat(a))}fire=new W(1,.5,.16);runeCyan=new W(.3,.9,1);runeViolet=new W(.75,.45,1);runeGreen=new W(.45,1,.5);updateSources(e){const t=this.assets.props.frames,i=[],r=[];for(const s of this.sources){if(s.kind==="pond")continue;const a=He(Math.round(s.x*10),Math.round(s.z*10),7);if(s.kind==="campfire"){const o=.8+.12*Math.sin(e*11+a*40)+.08*Math.sin(e*23.7+a*13);r.push({x:s.x+Math.sin(e*9+a)*.08,y:1.2,z:s.z,reach:this.game.tuning.lights.campfire.reach*s.size,rgb:this.fire,strength:this.game.tuning.lights.campfire.strength*o});const c=t[Math.floor(e*8+a*10)%3];this.inView(s.x,s.z,c.w*this.mpp,c.h*this.mpp,4)&&i.push({x:s.x,y:0,z:s.z,frame:c,flip:a<.5,fresh:this.mark("prop",s.x,s.z,2)})}else{const o=a<.33?1:a<.66?0:2,c=.7+.3*Math.sin(e*.9+a*20),l=t[3+o];r.push({x:s.x,y:2,z:s.z,reach:this.game.tuning.lights.stone.reach*s.size,rgb:[this.runeCyan,this.runeViolet,this.runeGreen][o],strength:this.game.tuning.lights.stone.strength*c}),this.inView(s.x,s.z,l.w*this.mpp,l.h*this.mpp,4)&&i.push({x:s.x,y:0,z:s.z,frame:l,flip:a<.5,fresh:this.mark("prop",s.x,s.z,2.6)})}}this.propBatch.set(i),this.forestLights=r}setLights(e,t,i){const r=Math.min(Nr,this.game.tuning.lightBudget),s=e.map(l=>({l,d:Math.hypot(l.x-t,l.z-i)-l.reach})).sort((l,u)=>l.d-u.d).slice(0,r+1),a=s.length>r?s[r].d:1/0,o=ct;let c=0;for(const{l,d:u}of s.slice(0,r)){const f=Math.min(1,Math.max(0,(a-u)/15));o.uLightPos.value[c].set(l.x,l.y,l.z,l.reach),o.uLightCol.value[c].set(l.rgb.x,l.rgb.y,l.rgb.z,l.strength*f),c++}o.uLightCount.value=c,this.stats.lights=c}drawGhosts(e){this.now=e,this.ghosts=this.ghosts.filter(a=>a.until>e),this.ghostLines||(this.ghostLines=new ic(new $t,new Ou({color:16719904,depthTest:!1})),this.ghostLines.frustumCulled=!1,this.ghostLines.renderOrder=20,this.scene.add(this.ghostLines));const t=en.uRight.value,i=en.uUp.value,r=[];for(const a of this.ghosts){const o=a.h*.4,c=(p,g)=>[a.x+t.x*p*o+i.x*g*a.h,t.y*p*o+i.y*g*a.h,a.z+t.z*p*o+i.z*g*a.h],l=c(-1,0),u=c(1,0),f=c(1,1),d=c(-1,1);r.push(...l,...u,...u,...f,...f,...d,...d,...l,...l,...f)}const s=this.ghostLines.geometry;s.dispose(),s.setAttribute("position",new Nt(r,3)),s.setDrawRange(0,r.length/3),this.ghostLines.visible=r.length>0}render(e,t=!0){const i=this.game,r=i.tuning,s=Cc(i),a=s.angle*Math.PI/180,o=2*s.distance*Math.tan(r.camera.fov*Math.PI/360)/this.height,c=new W(0,Math.cos(a),-Math.sin(a)),l=new W(s.tx,s.ty,s.tz),u=l.dot(c),f=l.x;l.addScaledVector(c,Math.round(u/o)*o-u),l.x+=Math.round(f/o)*o-f;const d=new W(0,Math.sin(a),Math.cos(a)).multiplyScalar(s.distance);this.camera.position.copy(l).add(d),this.camera.up.set(0,1,0),this.camera.lookAt(l),this.updateFrustum();const p=r.spriteTilt;en.uUp.value.set(0,1,0).lerp(c,p).normalize(),en.uFacing.value.crossVectors(en.uRight.value,en.uUp.value).normalize();const g=Ac(i.witch),v=r.canopyCutout;this.camera.updateMatrixWorld();const x=this.v3.set(i.witch.x,Or(i.witch,r)*.5,i.witch.z).project(this.camera);en.uCutout.value.set((x.x*.5+.5)*this.width,(x.y*.5+.5)*this.height,.5*v.screenFraction*this.width*(1-g),Math.max(1,v.edge*this.width*(1-g))),en.uTopFade.value=g,en.uDebugCull.value=this.debugCull?1:0;const m=i.witch,M=Or(m,r);ct.uGlowPos.value.set(m.x,M+r.glowHeight,m.z),ct.uHazeCentre.value.set(m.x,m.z),this.updateSources(e);const _=this.partyView.update(i,e,(C,N,U,D)=>this.inView(C,N,U,D,4),()=>!1);this.soundBatch.set(_.items),this.ground.setSweeps(_.sweeps),this.lasers.update(e,_.playing,m.x,m.z),this.strings.update(),this.borders.update(),this.setLights([this.dancefloor.update(e,this.ground),..._.lights,...this.forestLights],m.x,m.z),ct.uTime.value=e,this.mist?.follow(s.tx,s.tz);const S=Math.sin(e*2.4)*.12,w=m.mode==="rising"&&m.lift<.9,E=m.mode==="descending"&&m.lift>.1,L=w||E?(w?8:12)+(m.away?2:0)+Math.floor(e*7)%2:m.lean?6+(m.away?1:0):(m.away?3:0)+Math.floor(e*4)%3,b=this.assets.witch.frames[L],A=M+S-.4+b.h*this.mpp;this.witchBatch.set([{x:m.x,y:M+S-.4,z:m.z,frame:b,flip:m.facing<0}]);{const C=(O,z,V)=>{const Q=this.v3.set(O,z,V).project(this.camera);return[(Q.x+1)/2*this.width,(Q.y+1)/2*this.height]},N=C(m.x,M+S-.4,m.z),U=C(m.x,A,m.z),D=C(m.x+b.w*this.mpp/2,M+S-.4,m.z);en.uWitch.value.set((N[0]+U[0])/2,(N[1]+U[1])/2,Math.abs(D[0]-N[0])+1,Math.abs(U[1]-N[1])/2+1),en.uWitchDepth.value=-this.v3.set(m.x,M,m.z).applyMatrix4(this.camera.matrixWorldInverse).z}if(this.shadow.position.set(m.x,.03,m.z),this.shadow.scale.setScalar(1-.5*Ac(m)),this.refresh(),this.drawCreatures(e),this.checkPops("moving"),this.leashView.update(e,this.camera,this.canvas.clientWidth||window.innerWidth,this.canvas.clientHeight||window.innerHeight,A),this.assets.work(6),this.stats.pendingGround=this.ground.fill(this.renderer,this.viewRect(r.haze.far,40),m.x,m.z,4),this.stats.pendingArt=this.assets.pending,this.debugCull&&this.drawGhosts(e),!t)return;this.renderer.info.reset(),this.post.render(this.scene,this.camera);let P=0;for(const C of[...this.typeBatches.values(),...this.creatureBatches.values(),this.propBatch,this.soundBatch])P+=C.dropped;P&&!this.stats.dropped&&console.warn(`view: ${P} sprite instances set but not drawn`),this.stats.dropped=P,this.stats.drawCalls=this.renderer.info.render.calls,this.stats.batches=this.typeBatches.size+this.creatureBatches.size}}const K_="The art style: knobs from the Witch Art Lab. Paste a style saved in the Lab here (its whole saved JSON, or just its style object). Any knob left out follows the Lab's current default, so an empty style means the Lab's default look, and stays up to date as the art changes.",q_="Lab default",$_={},Z_={_readme:K_,name:q_,style:$_};function J_(n=Z_){const e=n??{},t=e.style&&typeof e.style=="object"?e.style:e,i=XM();for(const[r,s]of Object.entries(t))r in i&&(i[r]=s);return i}function Q_(n,e){const t=n.querySelector("#stick"),i=t.querySelector(".knob"),r=56;let s=null,a=0,o=0;const c=()=>n.classList.add("touch"),l=n.querySelector("#stick-zone");l.addEventListener("pointerdown",p=>{if(!(p.pointerType==="mouse"||s!==null)){c(),s=p.pointerId,a=p.clientX,o=p.clientY,t.style.left=a+"px",t.style.top=o+"px",t.classList.add("on");try{l.setPointerCapture(p.pointerId)}catch{}p.preventDefault()}}),l.addEventListener("pointermove",p=>{if(p.pointerId!==s)return;let g=p.clientX-a,v=p.clientY-o;const x=Math.hypot(g,v);x>r&&(g*=r/x,v*=r/x),i.style.transform=`translate(${g}px, ${v}px)`;const m=Math.min(1,x/r),M=.15,_=m<M?0:(m-M)/(1-M)/Math.max(1e-6,m);e.x=g/r*_,e.y=v/r*_});const u=p=>{p.pointerId===s&&(s=null,e.x=0,e.y=0,i.style.transform="",t.classList.remove("on"))};l.addEventListener("pointerup",u),l.addEventListener("pointercancel",u);const f=(p,g)=>{const v=n.querySelector(p);v.addEventListener("pointerdown",x=>{x.preventDefault(),x.stopPropagation(),g(),v.classList.add("down")}),v.addEventListener("pointerup",()=>v.classList.remove("down")),v.addEventListener("pointerleave",()=>v.classList.remove("down"))};f("#rise",()=>e.toggle=!0),f("#zoom-in",()=>e.zoom-=1),f("#zoom-out",()=>e.zoom+=1),f("#sigil",()=>e.sigil=!0);const d=n.querySelector("#talk");d.addEventListener("pointerdown",p=>{p.preventDefault(),p.stopPropagation(),e.talk=!0,d.classList.add("down")});for(const p of["pointerup","pointerleave","pointercancel"])d.addEventListener(p,()=>{e.talk=!1,d.classList.remove("down")});window.addEventListener("touchstart",p=>{c(),p.touches.length===3&&(e.debug=!0)},{passive:!0})}const qn=new URLSearchParams(location.search);let Ji=kf(qn.get("seed"));Ji===null&&(Ji=Math.floor(Math.random()*1e6),qn.set("seed",String(Ji)),history.replaceState(null,"","?"+qn.toString()+location.hash));const An={...or,bloom:{...or.bloom},tiltShift:{...or.tiltShift},shadows:{...or.shadows},canopyShadow:{...or.canopyShadow},mist:{...or.mist}};qn.get("shadows")==="off"&&(An.shadows.on=!1);qn.get("canopy")==="off"&&(An.canopyShadow.on=!1);qn.get("mist")==="off"&&(An.mist.on=!1);const ea=qn.get("tilt");ea==="off"?An.tiltShift.on=!1:(ea==="before"||ea==="after")&&(An.tiltShift.on=!0,An.tiltShift.where=ea);qn.get("bloom")==="off"&&(An.bloom.on=!1);const Io=qn.get("fx");(Io==="pixel"||Io==="smooth")&&(An.fx=Io);const cn=m0(Ji,An),j_=document.getElementById("game"),No=J_(),Hr=new Y_(j_,cn,{...No,pixel:An.pixelSize,treeSize:No.treeSize*An.treeHeight,crownWidth:No.crownWidth*An.crownWidth/An.treeHeight});Hr.debugCull=qn.get("debug")==="cull";const Kr=new pm;document.getElementById("next-wave").addEventListener("pointerdown",n=>{n.preventDefault(),Kr.touch.nextWave=!0});document.getElementById("pause-waves").addEventListener("pointerdown",n=>{n.preventDefault(),Kr.touch.pauseWaves=!0});Q_(document.body,Kr.touch);const Qu=document.getElementById("help");try{localStorage.getItem("witch.help")==="off"&&Qu.classList.add("off")}catch{}window.addEventListener("keydown",n=>{if(n.code!=="KeyH"||n.repeat)return;const e=Qu.classList.toggle("off");try{localStorage.setItem("witch.help",e?"off":"on")}catch{}});document.getElementById("version").textContent="v105 · 2567a18";const eS=document.getElementById("seed");eS.innerHTML=`seed <a href="?seed=${Ji}">${Ji}</a>`;const Ll=document.getElementById("debug"),ac=document.getElementById("start"),ju=document.getElementById("debug-buttons"),oc=document.getElementById("wave"),tS=oc.querySelector(".fill"),nS=oc.querySelector(".label");let qi=qn.has("debug");Ll.classList.toggle("on",qi);ju.classList.toggle("on",qi);const ed=()=>Hr.resize(window.innerWidth,window.innerHeight);window.addEventListener("resize",ed);ed();let ka=!1;requestAnimationFrame(()=>setTimeout(async()=>{await Hr.prepare(),ka=!0,ac.classList.remove("loading")},0));let Bh=null;function td(){if(!ka||!cn.clock.paused)return!1;try{Bh??=new AudioContext,Bh.resume()}catch{}return cn.clock.paused=!1,ac.style.display="none",Kr.clearPresses(),!0}Kr.onAny=td;ac.addEventListener("pointerdown",n=>{n.preventDefault(),td()});document.addEventListener("visibilitychange",()=>{document.hidden&&(fa=0)});let fa=0,zh=60,Uo=0,ta=0;function nd(n){requestAnimationFrame(nd);const e=fa?(n-fa)/1e3:0;fa=n,Uo++,ta+=e,ta>=.5&&(zh=Uo/ta,Uo=0,ta=0);const t=Kr.read();if(t.debug&&(qi=!qi,Ll.classList.toggle("on",qi),ju.classList.toggle("on",qi)),g0(cn,t,e),!ka)return;const i=p0(cn.party,cn.map,cn.clock.time);if(tS.style.height=`${(1-i.gone)*100}%`,nS.textContent=`wave ${cn.party.wave} · ${cn.party.areas.size} areas · ${Math.ceil(i.left)} s`,oc.classList.toggle("paused",cn.party.paused),Hr.render(cn.clock.time),qi){const r=cn.witch,s=Hr.stats;Ll.textContent=[`fps    ${zh.toFixed(0)}`,`seed   ${Ji}`,`area   ${hu(cn)}`,`mode   ${r.mode}`,`at     ${r.x.toFixed(0)}, ${r.z.toFixed(0)} m   zoom ${cn.camera.zoomStep}`,`trees  ${s.trees}  bushes ${s.bushes}  creatures ${s.creatures}`,`draws  ${s.drawCalls}  art queued ${s.pendingArt}  ground tiles ${s.pendingGround}`].join(`
`)}}requestAnimationFrame(nd);window.witch={game:cn,view:Hr,areaUnderWitch:()=>hu(cn),areaTypeId:n=>Cn[n].id,get ready(){return ka}};
