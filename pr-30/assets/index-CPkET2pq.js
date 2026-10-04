(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function t(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(s){if(s.ep)return;s.ep=!0;const r=t(s);fetch(s.href,r)}})();function Ii(n){let e=n>>>0;return()=>{e=e+1831565813>>>0;let t=e;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}}function we(n,e,t){let i=Math.imul(n|0,374761393)^Math.imul(e|0,668265263)^Math.imul(t|0,2147483647);return i=Math.imul(i^i>>>13,1274126177),((i^i>>>16)>>>0)/4294967296}function pi(n,e,t){const i=Math.floor(n),s=Math.floor(e),r=n-i,a=e-s,o=r*r*(3-2*r),h=a*a*(3-2*a),c=we(i,s,t),d=we(i+1,s,t),f=we(i,s+1,t),u=we(i+1,s+1,t);return c+(d-c)*o+(f-c)*h+(c-d-f+u)*o*h}const Gn=(n,e,t)=>n+(e-n)*t,Dn=(n,e,t)=>Math.min(t,Math.max(e,n)),ln=n=>{const e=Dn(n,0,1);return e*e*(3-2*e)};function O0(n,e,t,i){const s=Math.max(1,n.camera.zoomSteps),r=Dn(Math.round(n.camera.startZoom),0,s-1),a=s>1?r/(s-1):0;return{zoomStep:r,zoom:a,tx:e,ty:t,tz:i,vx:0,vy:0,vz:0,ax:0,az:0,lift:0,intro:1}}function Yo(n,e,t,i,s){const r=i*s,a=Math.exp(-r),o=n-t,h=e+i*o;return[t+(o+h*s)*a,(e-i*h*s)*a]}function N0(n,e,t,i,s,r,a,o=!1,h){const c=a.camera,d=Math.max(1,c.zoomSteps),f=o?n.intro??0:Math.max(0,(n.intro??0)-r/Math.max(.05,c.intro.ease));o&&h&&(t=h);const u=Dn(n.zoomStep+Math.sign(e),0,d-1),p=d>1?u/(d-1):0;let g=i.x*c.lookAhead,M=i.z*c.lookAhead;const x=Math.hypot(g,M);x>c.lookAheadMax&&(g*=c.lookAheadMax/x,M*=c.lookAheadMax/x);const m=1-Math.exp(-c.lookAheadEase*r),v=n.ax+(g-n.ax)*m,_=n.az+(M-n.az)*m,[w,A]=Yo(n.tx,n.vx,t.x+v,c.follow,r),[y,S]=Yo(n.ty,n.vy,t.y,c.follow,r),[b,E]=Yo(n.tz,n.vz,t.z+_,c.follow,r),C=n.zoom+(p-n.zoom)*(1-Math.exp(-c.zoomEase*r)),T=n.lift+(s-n.lift)*(1-Math.exp(-c.liftEase*r)),R=a.treetop,O=Dn((Math.hypot(i.x,i.z)-a.treetopSpeed)/Math.max(1,a.treetopSpeed*(R.boost-1)),0,1),I=(n.pull??0)+(R.cameraPull*O*ln(T)-(n.pull??0))*(1-Math.exp(-1.5*r));return{zoomStep:u,zoom:C,tx:w,ty:y,tz:b,vx:A,vy:S,vz:E,ax:v,az:_,lift:Dn(T,0,1),pull:I,intro:f}}function Gd(n,e,t){const i=t.camera.ground,s=t.camera.treetop,r=ln(e);let a=Gn(Gn(i.angleIn,i.angleOut,n.zoom),Gn(s.angleIn,s.angleOut,n.zoom),r),o=Gn(Gn(i.distanceIn,i.distanceOut,n.zoom),Gn(s.distanceIn,s.distanceOut,n.zoom),r)*(1+(n.pull??0));const h=ln(n.intro??0),c=t.camera.intro;a=Gn(a,c.angle,h),o=Gn(o,c.distance,h);const d=a*Math.PI/180;return{angle:a,distance:o,x:n.tx,y:n.ty+Math.sin(d)*o,z:n.tz+Math.cos(d)*o,tx:n.tx,ty:n.ty,tz:n.tz}}const F0=.1,k0=()=>({time:0,paused:!0});function U0(n,e){if(n.paused||!(e>0))return 0;const t=Math.min(F0,e);return n.time+=t,t}const B0={moor:{treeDensity:.65},"fern-forest":{treeDensity:1},"muddy-forest":{treeDensity:1},"stone-shrine":{treeDensity:.6},"tangly-forest":{treeDensity:1},"wispy-forest":{treeDensity:1},"hazel-forest":{treeDensity:1},garden:{treeDensity:.75},"twiggy-forest":{treeDensity:1},ancient:{treeDensity:.9},norway:{treeDensity:1},"alder-forest":{treeDensity:.9},meadow:{treeDensity:.55},"old-oaks":{treeDensity:.9},"berry-thicket":{treeDensity:1},wetland:{treeDensity:.75},stream:{treeDensity:.8},"rocky-slope":{treeDensity:.75},bog:{treeDensity:.7},deadwood:{treeDensity:.8},"cave-mouth":{treeDensity:.75},grassland:{treeDensity:.55},"beaver-pond":{treeDensity:.8},"log-pile":{treeDensity:.7},heath:{treeDensity:.65},"old-pinewood":{treeDensity:1},ravine:{treeDensity:.75},"bluebell-glade":{treeDensity:.8},"holly-thicket":{treeDensity:1},"honeysuckle-tangle":{treeDensity:1}},z0={types:B0};function ca(n,e){if(typeof document<"u"){const t=document.createElement("canvas");return t.width=n,t.height=e,t}return new OffscreenCanvas(n,e)}function ha(n){let e=n>>>0;return()=>{e=e+1831565813>>>0;let t=e;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}}const xe=(n,e,t)=>e+(t-e)*n(),Jc=(n,e)=>e[Math.floor(n()*e.length)];function je(n,e,t){let i=Math.imul(n|0,374761393)^Math.imul(e|0,668265263)^Math.imul(t|0,2147483647);return i=Math.imul(i^i>>>13,1274126177),((i^i>>>16)>>>0)/4294967296}function Ri(n,e,t){const i=Math.floor(n),s=Math.floor(e),r=n-i,a=e-s,o=r*r*(3-2*r),h=a*a*(3-2*a),c=je(i,s,t),d=je(i+1,s,t),f=je(i,s+1,t),u=je(i+1,s+1,t);return c+(d-c)*o+(f-c)*h+(c-d-f+u)*o*h}function me(n,e,t){n=(n%1+1)%1,e=Math.max(0,Math.min(1,e)),t=Math.max(0,Math.min(1,t));const i=Math.floor(n*6),s=n*6-i,r=t*(1-e),a=t*(1-s*e),o=t*(1-(1-s)*e),[h,c,d]=[[t,o,r],[a,t,r],[r,t,o],[r,a,t],[o,r,t],[t,r,a]][i%6];return[Math.round(h*255),Math.round(c*255),Math.round(d*255)]}const l={BODY:1,BELLY:2,ACCENT:3,EYE:4,GLINT:5,TRUNK:6,LEAF:7,LEAF2:8,CLOTH:9,SKIN:10,HAIR:11,BROOM:12,STRAW:13,BODY2:14,BARK2:15,FLOWER:16,PUPIL:17,MAGIC:18,BARKD:19,LINE:20,IRIS:21,MAGIC2:22,NOSE:23,EAR:24,BODY3:25,LEAF3:26,BARKL:27,HAT:28,PHONES:29,TOP:30,JACKET:31,JEANS:32,SHOES:33,WATER:34,STONE:35,STONED:36,MOSS:37,CRYSTAL:38,RUNE:39,GLOW:40,WOOD:41,COLLAR:42,HAT1:43,HAT2:44,POM:45,SHADES:46,FRAME:47,SHOE:48,SOLE:49,WOKEN:50,WEB:51},Xo=4;function Rr(n,e,t,i=.12){const s=(r,a,o,h)=>{const c=o-r,d=h-a,f=Math.max(0,Math.min(1,((n-r)*c+(e-a)*d)/(c*c+d*d)));return Math.hypot(n-r-c*f,e-a-d*f)<i};switch((t%Xo+Xo)%Xo){case 0:return s(.5,.08,.5,.92)||s(.5,.1,.18,.4)||s(.5,.1,.82,.4);case 1:return s(.5,.08,.5,.92)||s(.5,.5,.18,.18)||s(.5,.5,.82,.18);case 2:return s(.2,.1,.8,.9)||s(.8,.1,.2,.9)||s(.5,.08,.5,.92);default:return s(.3,.08,.3,.92)||s(.3,.12,.75,.35)||s(.75,.35,.3,.55)||s(.3,.55,.78,.92)}}const G0=new Set([l.GLINT,l.MAGIC,l.MAGIC2,l.RUNE,l.GLOW,l.COLLAR,l.WOKEN]);function Zh(n,e=!0,t=8){const i=n.length,s=[];if(i<3)return n.slice();const r=o=>e?n[(o+i)%i]:n[Math.max(0,Math.min(i-1,o))],a=e?i:i-1;for(let o=0;o<a;o++){const h=r(o-1),c=r(o),d=r(o+1),f=r(o+2),u=Math.max(2,Math.ceil(Math.hypot(d[0]-c[0],d[1]-c[1])/1.5),t);for(let p=0;p<u;p++){const g=p/u,M=g*g,x=M*g;s.push([0,1].map(m=>.5*(2*c[m]+(-h[m]+d[m])*g+(2*h[m]-5*c[m]+4*d[m]-f[m])*M+(-h[m]+3*c[m]-3*d[m]+f[m])*x)))}}return e||s.push(n[i-1]),s}function H0(n,{cap:e=1,capEnd:t=e}={}){const i=[],s=[],r=n.length;for(let h=0;h<r;h++){const c=n[Math.max(0,h-1)],d=n[Math.min(r-1,h+1)];let f=d[0]-c[0],u=d[1]-c[1];const p=Math.hypot(f,u)||1;f/=p,u/=p;const g=n[h][2]/2;i.push([n[h][0]-u*g,n[h][1]+f*g]),s.push([n[h][0]+u*g,n[h][1]-f*g])}const a=(h,c,d,f)=>{let u=h[0]-c[0],p=h[1]-c[1];const g=Math.hypot(u,p)||1;return[h[0]+u/g*d/2*f,h[1]+p/g*d/2*f]};return[...i,a(n[r-1],n[r-2],n[r-1][2],t),...s.reverse(),a(n[0],n[1],n[0][2],e)]}const wt=(n,e)=>[n[0]+e[0],n[1]+e[1]],In=(n,e,t)=>[n[0]+(e[0]-n[0])*t,n[1]+(e[1]-n[1])*t];function Do(n,e,t,i,s,r=1){const a=[];for(let o=0;o<n.length;o++){if(a.push(n[o]),o<e||o>=t)continue;const h=n[o],c=n[(o+1)%n.length];let d=c[0]-h[0],f=c[1]-h[1];const u=Math.hypot(d,f)||1,p=f/u*r,g=-d/u*r;for(let M=1;M<=i;M++){const x=(M-.5)/i,m=In(h,c,x),v=[m[0]+p*s-d/u*s*.5,m[1]+g*s-f/u*s*.5];a.push(In(h,c,x-.45/i),v,In(h,c,x+.35/i))}}return a}function Jh(n,e,t){const i=new Uint8Array(n*e);let s=1/0,r=-1/0;for(const a of t)s=Math.min(s,a[1]),r=Math.max(r,a[1]);for(let a=Math.max(0,Math.floor(s));a<=Math.min(e-1,Math.ceil(r));a++){const o=a+.5,h=[];for(let c=0,d=t.length-1;c<t.length;d=c++){const[f,u]=t[c],[p,g]=t[d];u>o!=g>o&&h.push(f+(o-u)/(g-u)*(p-f))}h.sort((c,d)=>c-d);for(let c=0;c+1<h.length;c+=2)for(let d=Math.max(0,Math.ceil(h[c]-.5));d<=Math.min(n-1,Math.floor(h[c+1]-.5));d++)i[a*n+d]=1}return i}function W0(n,e,t){const s=new Float32Array(n*e),r=new Float32Array(n*e);for(let h=0;h<n*e;h++)t[h]&&(s[h]=1e4,r[h]=1e4);const a=h=>s[h]*s[h]+r[h]*r[h],o=(h,c,d,f,u)=>{const p=c+f,g=d+u;let M,x;if(p<0||g<0||p>=n||g>=e)M=f,x=u;else{const m=g*n+p;M=s[m]+f,x=r[m]+u}M*M+x*x<a(h)&&(s[h]=M,r[h]=x)};for(let h=0;h<e;h++){for(let c=0;c<n;c++){const d=h*n+c;t[d]&&(o(d,c,h,-1,0),o(d,c,h,0,-1),o(d,c,h,-1,-1),o(d,c,h,1,-1))}for(let c=n-1;c>=0;c--){const d=h*n+c;t[d]&&o(d,c,h,1,0)}}for(let h=e-1;h>=0;h--){for(let c=n-1;c>=0;c--){const d=h*n+c;t[d]&&(o(d,c,h,1,0),o(d,c,h,0,1),o(d,c,h,1,1),o(d,c,h,-1,1))}for(let c=0;c<n;c++){const d=h*n+c;t[d]&&o(d,c,h,-1,0)}}return{vx:s,vy:r}}class dt{constructor(e,t,i=1){this.sx=i,this.w=Math.round(e*i),this.h=t|0,this.m=new Uint8Array(this.w*this.h),this.n=new Float32Array(this.w*this.h*3),this.g=new Uint8Array(this.w*this.h)}inb(e,t){return e>=0&&t>=0&&e<this.w&&t<this.h}get(e,t){return e|=0,t|=0,this.inb(e,t)?this.m[t*this.w+e]:0}put(e,t,i,s=0,r=0,a=1){this.px(e*this.sx,t,i,s,r,a)}px(e,t,i,s=0,r=0,a=1){if(e=Math.floor(e),t=Math.floor(t),!this.inb(e,t))return;const o=t*this.w+e;this.m[o]=i,this.n[o*3]=s,this.n[o*3+1]=r,this.n[o*3+2]=a}recolour(e,t,i){e=Math.floor(e),t=Math.floor(t),this.inb(e,t)&&this.m[t*this.w+e]&&(this.m[t*this.w+e]=i)}ellipse(e,t,i,s,r,a={}){const{onlyOn:o,density:h=1,noise:c=0,seed:d=0,round:f=1}=a;e*=this.sx,i*=this.sx;for(let u=Math.max(0,Math.floor(t-s-1));u<Math.min(this.h,t+s+1);u++)for(let p=Math.max(0,Math.floor(e-i-1));p<Math.min(this.w,e+i+1);p++){const g=(p+.5-e)/i,M=(u+.5-t)/s,x=g*g+M*M;if(x>1)continue;const m=u*this.w+p;if(o&&!o.has(this.m[m]))continue;if(h<1){const A=c?Ri(p/3.2,u/3.2,d)*c+(1-c)*.5:.5;if(je(p,u,d+77)>h*(.4+A*1.2)*(1.15-x*.5))continue}const v=g*f,_=M*f,w=Math.hypot(v,_,Math.sqrt(Math.max(0,1-x))+.15);this.px(p,u,r,v/w,_/w,(Math.sqrt(Math.max(0,1-x))+.15)/w)}}line(e,t,i,s,r,a,o,h=1){e*=this.sx,i*=this.sx;const c=Math.max(1,Math.ceil(Math.hypot(i-e,s-t)));for(let d=0;d<=c;d++){const f=d/c,u=e+(i-e)*f,p=t+(s-t)*f,g=Math.max(.5,(r+(a-r)*f)/2);for(let M=Math.floor(p-g);M<=p+g;M++)for(let x=Math.floor(u-g);x<=u+g;x++){const m=(x+.5-u)/g,v=(M+.5-p)/g;if(m*m+v*v>1)continue;const _=m*h,w=Math.hypot(_,v*.3,1);this.px(x,M,o,_/w,v*.3/w,1/w)}}}tri(e,t){let[[i,s],[r,a],[o,h]]=e;i*=this.sx,r*=this.sx,o*=this.sx;const c=(g,M,x,m,v,_)=>(g-v)*(m-_)-(x-v)*(M-_),d=Math.max(0,Math.floor(Math.min(i,r,o))),f=Math.min(this.w,Math.ceil(Math.max(i,r,o))),u=Math.max(0,Math.floor(Math.min(s,a,h))),p=Math.min(this.h,Math.ceil(Math.max(s,a,h)));for(let g=u;g<p;g++)for(let M=d;M<f;M++){const x=M+.5,m=g+.5,v=c(x,m,i,s,r,a),_=c(x,m,r,a,o,h),w=c(x,m,o,h,i,s);(v<0||_<0||w<0)&&(v>0||_>0||w>0)||this.px(M,g,t,0,-.2,.98)}}shape(e,t,i={}){return this.fillMask(Jh(this.w,this.h,Zh(e,!0,i.per||6)),t,i)}limb(e,t,i={}){return this.shape(H0(e,i),t,i)}fillMask(e,t,{group:i=1,line:s=!1,depth:r=0,round:a=1,onlyOn:o=null,keepNormals:h=!1,tilt:c=[0,0],lineMat:d=l.LINE}={}){const{w:f,h:u}=this;if(o)for(let x=0;x<f*u;x++)e[x]&&!o.has(this.m[x])&&(e[x]=0);const{vx:p,vy:g}=W0(f,u,e);let M=r;if(!M){for(let x=0;x<f*u;x++)e[x]&&(M=Math.max(M,Math.hypot(p[x],g[x])));M=Math.max(1.5,Math.min(M*.9,2.5+M*.35))}for(let x=0;x<u;x++)for(let m=0;m<f;m++){const v=x*f+m;if(!e[v])continue;if(h){this.m[v]=t;continue}const _=Math.hypot(p[v],g[v]),w=Math.min(1,Math.max(0,(_-.5)/M)),A=Math.min(2.6,(1-w)/Math.sqrt(Math.max(.02,1-(1-w)*(1-w))))*a;let y=p[v]/(_||1)*A+c[0],S=g[v]/(_||1)*A+c[1];const b=Math.hypot(y,S,1);this.m[v]=t,this.n[v*3]=y/b,this.n[v*3+1]=S/b,this.n[v*3+2]=1/b}if(s&&!h){const x=[];for(let m=0;m<u;m++)for(let v=0;v<f;v++){const _=m*f+v;if(e[_])for(const[w,A]of[[1,0],[-1,0],[0,1],[0,-1]]){const y=v+w,S=m+A;if(y<0||S<0||y>=f||S>=u)continue;const b=S*f+y;if(!e[b]&&this.m[b]&&this.g[b]!==i&&this.m[b]!==d){x.push(_);break}}}for(const m of x)this.m[m]=d}if(!h)for(let x=0;x<f*u;x++)e[x]&&(this.g[x]=i);return e}mark(e,t,i,s={}){return this.fillMask(Jh(this.w,this.h,Zh(e,!0,6)),t,{...s,onlyOn:new Set(i),keepNormals:!0})}grid(e,t,i=0,s=0,{round:r=1,flipX:a=!1}={}){const o=Math.max(...e.map(d=>d.length)),h=new Uint8Array(this.w*this.h),c=new Map;e.forEach((d,f)=>[...d].forEach((u,p)=>{const g=t[u];if(!g)return;const M=i+(a?o-1-p:p),x=s+f;this.inb(M,x)&&(h[x*this.w+M]=1,c.set(x*this.w+M,g))})),this.fillMask(h,l.BODY,{round:r,depth:2.5});for(const[d,f]of c)this.m[d]=f}}function un(n,e,t,i=t.outline,s=ca){const{w:r,h:a}=n,o=()=>s(r,a),h=o(),c=o(),d=o(),f=h.getContext("2d").createImageData(r,a),u=c.getContext("2d").createImageData(r,a),p=d.getContext("2d").createImageData(r,a),g=i==="none"?null:i==="dark"?[22,18,30]:"tint";for(let M=0;M<a;M++)for(let x=0;x<r;x++){const m=M*r+x,v=n.m[m],_=m*4;if(!v){if(!g)continue;const b=[n.get(x+1,M),n.get(x-1,M),n.get(x,M+1),n.get(x,M-1)].find(C=>C);if(!b)continue;const E=g==="tint"?(e[b]||[0,0,0]).map(C=>C*.35|0):g;f.data.set([...E,255],_),u.data.set([128,128,255,255],_),p.data.set([128,128,255,255],_);continue}let w=e[v];v===l.LINE&&!w&&(w=g==="tint"||!g?(e[l.BODY2]||[0,0,0]).map(b=>b*.55|0):g),w=w||[255,0,255],f.data.set([...w,G0.has(v)?254:255],_);const A=n.n[m*3],y=n.n[m*3+1],S=n.n[m*3+2];u.data.set([A*127+128,y*127+128,S*255,255],_),p.data.set([-A*127+128,y*127+128,S*255,255],_)}return h.getContext("2d").putImageData(f,0,0),c.getContext("2d").putImageData(u,0,0),d.getContext("2d").putImageData(p,0,0),{A:h,N:c,NF:d,w:r,h:a}}const ds=n=>{const e=Math.hypot(n[0],n[1],n[2])||1;return[n[0]/e,n[1]/e,n[2]/e]},ta=(n,e)=>[n[1]*e[2]-n[2]*e[1],n[2]*e[0]-n[0]*e[2],n[0]*e[1]-n[1]*e[0]],qt=(n,e)=>n[0]*e[0]+n[1]*e[1]+n[2]*e[2],ni=(n,e)=>[n[0]-e[0],n[1]-e[1],n[2]-e[2]],P={add:(n,e)=>[n[0]+e[0],n[1]+e[1],n[2]+e[2]],sub:ni,mul:(n,e)=>[n[0]*e,n[1]*e,n[2]*e],lerp:(n,e,t)=>[n[0]+(e[0]-n[0])*t,n[1]+(e[1]-n[1])*t,n[2]+(e[2]-n[2])*t],norm:ds,cross:ta,dot:qt};function Qh(n,e=[0,1,0]){const t=ds(n);let i=ta(e,t);Math.hypot(...i)<1e-4&&(i=ta([0,0,1],t)),i=ds(i);const s=ta(t,i);return[t,s,i]}function Hd(n,e){const t=qt(n,e.axes[0]),i=qt(n,e.axes[1]),s=qt(n,e.axes[2]),[r,a,o]=e.r,h=Math.hypot(t/r,i/a,s/o),c=Math.hypot(t/(r*r),i/(a*a),s/(o*o));return c>1e-9?h*(h-1)/c:-Math.min(r,a,o)}function Wd(n,e){const{ba:t,l2:i,rr:s,a2:r,il2:a,r1:o,r2:h}=e,c=qt(n,t),d=c-i,f=[n[0]*i-t[0]*c,n[1]*i-t[1]*c,n[2]*i-t[2]*c],u=qt(f,f),p=c*c*i,g=d*d*i,M=Math.sign(s)*s*s*u;return Math.sign(d)*r*g>M?Math.sqrt(u+g)*a-h:Math.sign(c)*r*p<M?Math.sqrt(u+p)*a-o:(Math.sqrt(u*r*a)+c*s)*a-o}function Vd(n,e){const t=Math.abs(qt(n,e.axes[0]))-e.h[0]+e.round,i=Math.abs(qt(n,e.axes[1]))-e.h[1]+e.round,s=Math.abs(qt(n,e.axes[2]))-e.h[2]+e.round;return Math.hypot(Math.max(t,0),Math.max(i,0),Math.max(s,0))+Math.min(Math.max(t,i,s),0)-e.round}const V0=(n,e)=>e*(Math.sin(n[0]*23+n[1]*7)*Math.sin(n[1]*19-n[2]*11)+.5*Math.sin(n[2]*41+n[0]*29)),jh=(n,e)=>n.type==="ell"?Hd(ni(e,n.cw),n):n.type==="box"?Vd(ni(e,n.cw),n):Wd(ni(e,n.aw),n),Fr=(n,e)=>n.rough?jh(n,e)+V0(e,n.rough):jh(n,e);class Qe{constructor({blend:e=.07}={}){this.parts=[],this.flats=[],this.blend=e,this.anchors={feet:[]}}ell(e,t,i,s={}){const r=s.axes||(s.dir?Qh(s.dir,s.up):[[1,0,0],[0,1,0],[0,0,1]]);return this.parts.push({type:"ell",c:e,r:t,axes:r,mat:i,group:s.group??1,extra:!!s.extra,paint:s.paint,rough:s.rough,cut:!!s.cut}),this}box(e,t,i,s={}){const r=s.axes||(s.dir?Qh(s.dir,s.up):[[1,0,0],[0,1,0],[0,0,1]]);return this.parts.push({type:"box",c:e,h:t,round:Math.min(s.round??.02,...t),axes:r,mat:i,group:s.group??1,extra:!!s.extra,paint:s.paint,rough:s.rough,cut:!!s.cut}),this}seg(e,t,i,s,r,a={}){return this.parts.push({type:"cone",a:e,b:t,r1:i,r2:s,mat:r,group:a.group??1,extra:!!a.extra,paint:a.paint,rough:a.rough,cut:!!a.cut}),this}chain(e,t,i={}){for(let s=0;s+1<e.length;s++)this.seg(e[s].slice(0,3),e[s+1].slice(0,3),e[s][3],e[s+1][3],t,i);return this}flat(e,t,i,s,r,a,o={}){return this.flats.push({c:e,u:ds(t),v:ds(i),su:s,sv:r,mask:a,group:o.group??30,extra:!!o.extra,bend:o.bend??.35}),this}field(e){let t=1/0;for(const i of this.parts){if(i.extra||i.cut)continue;let s;if(i.type==="ell")s=Hd(ni(e,i.c),i);else if(i.type==="box")s=Vd(ni(e,i.c),i);else{const r=ni(i.b,i.a),a=Math.max(1e-9,qt(r,r)),o=i.r1-i.r2;s=Wd(ni(e,i.a),{ba:r,l2:a,rr:o,a2:a-o*o,il2:1/a,r1:i.r1,r2:i.r2})}s<t&&(t=s)}return t}static surface(e,t,i){const s=1/Math.hypot(i[0]/t[0],i[1]/t[1],i[2]/t[2]);return[e[0]+i[0]*s,e[1]+i[1]*s,e[2]+i[2]*s]}}const eu={towards:.6,away:-.6},Y0=.52;function cn(n,{height:e,scale:t,facing:i="towards",yaw:s=eu[i]??eu.towards,pitch:r=Y0,lineGap:a=.12}={}){const o=Math.cos(s),h=Math.sin(s),c=Math.cos(r),d=Math.sin(r),f=B=>[B[0]*o-B[2]*h,B[1],B[0]*h+B[2]*o],u=B=>[B[0]*o+B[2]*h,B[1],-B[0]*h+B[2]*o],p=[0,-d,-c],g=[0,c,-d],M=[1,0,0],x=[0,d,c],m=n.blend,v=n.parts.map(B=>{if(B.type==="ell"){const $=f(B.c),le=B.axes.map(f),ve=Math.max(...B.r);return{...B,cw:$,axes:le,bc:$,br:ve+(B.rough||0)*1.5}}if(B.type==="box"){const $=f(B.c),le=B.axes.map(f);return{...B,cw:$,axes:le,bc:$,br:Math.hypot(...B.h)+(B.rough||0)*1.5}}const ce=f(B.a),H=f(B.b),Z=ni(H,ce),fe=Math.max(1e-9,qt(Z,Z)),he=B.r1-B.r2;return{...B,aw:ce,ba:Z,l2:fe,rr:he,a2:fe-he*he,il2:1/fe,bc:P.lerp(ce,H,.5),br:Math.sqrt(fe)/2+Math.max(B.r1,B.r2)}}),_=n.flats.map(B=>{const ce=f(B.c),H=f(B.u),Z=f(B.v);return{...B,cw:ce,uw:H,vw:Z,nw:ds(ta(H,Z)),bc:ce,br:Math.hypot(B.su,B.sv)}}),w=[...v,..._],A=B=>{const ce=qt(B.bc,M),H=qt(B.bc,g),Z=B.br+(B.uw?0:m);return[ce-Z,ce+Z,H-Z,H+Z]};for(const B of w)[B.x0,B.x1,B.u0,B.u1]=A(B);const y=w.filter(B=>!B.extra&&!B.cut),S=Math.min(...y.map(B=>B.u0+(B.uw?0:m))),b=Math.max(...y.map(B=>B.u1-(B.uw?0:m))),E=t??e/Math.max(1e-6,b-S),C=Math.min(...w.map(B=>B.x0)),T=Math.max(...w.map(B=>B.x1)),R=Math.min(...w.map(B=>B.u0)),O=Math.max(...w.map(B=>B.u1)),I=Math.ceil((T-C)*E)+4,k=Math.ceil((O-R)*E)+2,U=new dt(I,k),W=new Float32Array(I*k).fill(1/0),ne=new Int16Array(I*k).fill(-1),K=8,re=Math.ceil(I/K),N=Math.ceil(k/K),te=Array.from({length:re*N},()=>[]);w.forEach((B,ce)=>{const H=Math.max(0,Math.floor((B.x0-C)*E/K)),Z=Math.min(re-1,Math.floor(((B.x1-C)*E+2)/K)),fe=Math.max(0,Math.floor((O-B.u1)*E/K)),he=Math.min(N-1,Math.floor(((O-B.u0)*E+1)/K));for(let $=fe;$<=he;$++)for(let le=H;le<=Z;le++)te[$*re+le].push(ce)});const ae=.25/E,pe=(B,ce)=>{const H=Math.max(m-Math.abs(B-ce),0)/m;return Math.min(B,ce)-H*H*m*.25};for(let B=0;B<k;B++)for(let ce=0;ce<I;ce++){const H=te[Math.floor(B/K)*re+Math.floor(ce/K)];if(!H.length)continue;const Z=C+(ce+.5-1)/E,fe=O-(B+.5)/E,he=P.add(P.add(P.mul(M,Z),P.mul(g,fe)),P.mul(x,50));let $=1/0,le=-1/0;const ve=[],Ie=[];for(const $e of H){const Be=w[$e],F=ni(he,Be.bc),L=qt(F,p),G=Be.br+(Be.uw?0:m),J=qt(F,F)-G*G,ie=L*L-J;if(ie<0)continue;if(Be.uw){Ie.push(Be);continue}if(Be.cut){ve.push(Be);continue}const Me=Math.sqrt(ie);$=Math.min($,-L-Me),le=Math.max(le,-L+Me),ve.push(Be)}let Ve=1/0,Ke=-1,Fe=0,He=null;if(ve.length){const $e=new Map;for(const L of ve){let G=$e.get(L.group);G||$e.set(L.group,G=[]),G.push(L)}const Be=(L,G)=>{let J=1/0;for(const ie of L)ie.cut||(J=J===1/0?Fr(ie,G):pe(J,Fr(ie,G)));for(const ie of L)ie.cut&&(J=Math.max(J,-Fr(ie,G)));return J};let F=Math.max(0,$);for(let L=0;L<96&&F<le;L++){const G=P.add(he,P.mul(p,F));let J=1/0,ie=null;for(const[Me,ye]of $e){const oe=Be(ye,G);oe<J&&(J=oe,ie=Me)}if(J<ae){const Me=$e.get(ie),ye=.5/E;He=ds([Be(Me,[G[0]+ye,G[1],G[2]])-Be(Me,[G[0]-ye,G[1],G[2]]),Be(Me,[G[0],G[1]+ye,G[2]])-Be(Me,[G[0],G[1]-ye,G[2]]),Be(Me,[G[0],G[1],G[2]+ye])-Be(Me,[G[0],G[1],G[2]-ye])]);let oe=Me[0],ue=1/0;for(const _e of Me){if(_e.cut)continue;const ze=Fr(_e,G);ze<ue&&(ue=ze,oe=_e)}for(const _e of Me)if(_e.cut&&-Fr(_e,G)>ue-ae*2){oe=_e;break}Ve=F,Ke=ie,Fe=oe.paint?oe.paint(u(G),oe)??oe.mat:oe.mat;break}F+=Math.max(J*.9,ae*.5)}}for(const $e of Ie){const Be=qt(p,$e.nw);if(Math.abs(Be)<1e-4)continue;const F=qt(ni($e.cw,he),$e.nw)/Be;if(F>=Ve)continue;const L=P.add(he,P.mul(p,F)),G=ni(L,$e.cw),J=qt(G,$e.uw)/$e.su,ie=qt(G,$e.vw)/$e.sv;if(Math.abs(J)>1||Math.abs(ie)>1)continue;const Me=$e.mask(J,ie);if(!Me)continue;let ye=Be>0?P.mul($e.nw,-1):$e.nw;ye=ds(P.add(ye,P.add(P.mul($e.uw,J*$e.bend),P.mul($e.vw,ie*$e.bend*.5)))),Ve=F,Ke=$e.group,Fe=Me,He=ye}if(!He||!Fe)continue;const z=B*I+ce;W[z]=Ve,ne[z]=Ke,U.px(ce,B,Fe,qt(He,M),-qt(He,g),qt(He,x))}const be=[];for(let B=0;B<k;B++)for(let ce=0;ce<I;ce++){const H=B*I+ce;if(U.m[H])for(const[Z,fe]of[[1,0],[-1,0],[0,1],[0,-1]]){const he=ce+Z,$=B+fe;if(he<0||$<0||he>=I||$>=k)continue;const le=$*I+he;if(U.m[le]&&ne[le]!==ne[H]&&W[le]-W[H]>a){be.push(H);break}}}for(const B of be)[l.EYE,l.GLINT,l.MAGIC,l.MAGIC2,l.NOSE,l.COLLAR,l.WOKEN,l.RUNE,l.GLOW].includes(U.m[B])||(U.m[B]=l.LINE);for(let B=0;B<k;B++)for(let ce=0;ce<I;ce++){const H=B*I+ce;if(U.m[H]!==l.EYE)continue;const Z=B>0&&U.m[H-I]===l.EYE,fe=ce>0&&U.m[H-1]===l.EYE,he=ce+1<I&&U.m[H+1]===l.EYE&&B+1<k&&U.m[H+I]===l.EYE;!Z&&!fe&&he&&(U.m[H]=l.GLINT)}let Pe=-1;for(let B=k-1;B>=0&&Pe<0;B--)for(let ce=0;ce<I;ce++)if(U.m[B*I+ce]){Pe=B;break}const q=Pe>=0&&Pe<k-1?k-1-Pe:0;if(Pe>=0&&Pe<k-1){const B=k-1-Pe;for(let ce=k-1;ce>=0;ce--)for(let H=0;H<I;H++){const Z=ce*I+H,fe=(ce-B)*I+H,he=ce-B>=0;U.m[Z]=he?U.m[fe]:0,U.g[Z]=he?U.g[fe]:0;for(let $=0;$<3;$++)U.n[Z*3+$]=he?U.n[fe*3+$]:0}}return U.bodyH=Math.round((b-S)*E),{sp:U,s:E,project:B=>{const ce=f(B);return[+((ce[0]-C)*E+1).toFixed(1),+((O-qt(ce,g))*E+q).toFixed(1)]}}}const mi=(n,e=9,t=.3)=>je(Math.floor(n[0]*e),Math.floor(n[1]*e)+Math.floor(n[2]*e)*97,7)<t,Fs={wing:(n,e)=>(t,i)=>{const s=(t+1)/2,r=1-.35*s*s,a=-1+.55*s+.18*Math.abs(Math.sin(s*Math.PI*6));return i>r||i<a?null:i>r-.35*(1-s*.5)?e:Math.floor(s*9)%2?n:e},ear:(n,e=l.EAR,t=l.BODY3)=>(i,s)=>{const r=(s+1)/2,a=.95*Math.sin(Math.PI*Math.min(1,.15+r*.85))*(1-r*.35);return Math.abs(i)>a?null:r>.82?t:Math.abs(i)<a*.5&&r<.7&&r>.12?e:n},flame:(n,e)=>(t,i)=>{const s=(i+1)/2,r=Math.sin(Math.PI*Math.min(1,s*1.1))*(1-s)*1.4;return Math.abs(t)>r?null:Math.abs(t)<r*.45&&s<.6?e:n},membrane:n=>(e,t)=>{const i=(e+1)/2,s=-1+.35*Math.abs(Math.sin(i*Math.PI*3));return t<s||t>1-.2*i?null:n},spotted:(n,e,t)=>(i,s)=>{if(Math.hypot(i,s*1.2)>1)return null;const a=Math.hypot(i-.35,s-.1);return a<.18?t:a<.3?e:n}},X0={hair:l.HAIR,hat:l.HAT,headphones:l.PHONES,top:l.TOP,jacket:l.JACKET,jeans:l.JEANS,sneakers:l.SHOES,broom:l.BROOM,bristles:l.STRAW,skin:l.SKIN},tu={hair:[.01,.7,.85],hat:[.74,.45,.45],headphones:[.92,.55,.9],top:[.13,.15,.95],jacket:[.72,.45,.7],jeans:[.6,.5,.7],sneakers:[0,0,.95],broom:[.08,.55,.55],bristles:[.12,.55,.9],skin:[.07,.3,.94]};function K0(n,e=tu){const t={...tu,...e},i={hair:n.hairHue,jacket:n.cloakHue,hat:n.hatHue,top:n.topHue,jeans:n.jeansHue,sneakers:n.shoeHue,headphones:n.phonesHue},s={};for(const[r,a]of Object.entries(X0)){const[o,h,c]=t[r];s[a]=me(i[r]??o,h,c)}return s[l.EYE]=[24,18,30],s[l.GLINT]=[255,255,245],s[l.NOSE]=[20,16,24],s[l.MAGIC]=me(n.glowHue??.13,.5,1),s[l.MAGIC2]=me(n.glowHue??.13,.15,1),s[l.BELLY]=[245,245,240],s}const q0={rise:.78,descend:-.66,brake:.44};function $0(n){const e=new Qe({blend:.03}),t=n%3,i=.5,s=.05,r=[[0,.02,-.01],[.02,-.01,.02],[-.01,.015,.01]][t],a=g=>i-s*(g/.62);e.seg([-.5,a(-.5),0],[.62,a(.62),0],.022,.018,l.BROOM,{group:2}),e.ell([-.64,a(-.64)+.005,0],[.2,.1,.11],l.STRAW,{dir:[1,s*1.6,0],group:3,paint:g=>g[0]<-.76?l.MAGIC2:g[0]>-.5?l.BROOM:void 0});const o=[-1,1].map(g=>[.5,a(.5)+.03,g*.045]),h=[-1,1].map(g=>[.2,i+.24+r[1],g*.1]);for(const g of[0,1]){const M=g?1:-1,x=M>0?7:5;e.seg(h[g],o[g],.04,.03,l.JACKET,{group:x}),e.ell(o[g],[.035,.03,.035],l.SKIN,{group:x})}const c=[.3+r[0],i+.27+r[1],0],d=[.07,i+.28+r[1]*.5,0],f=[-.15,i+.35+r[2],0];e.ell(d,[.17,.1,.11],l.JACKET,{dir:[1,-.25,0],group:1,paint:g=>g[1]<d[1]-.04&&Math.abs(g[2])<.055?l.TOP:void 0}),e.ell(f,[.11,.08,.1],l.JEANS,{dir:[1,-.3,0],group:1}),e.chain([[...P.add(f,[-.02,.06,0]),.07],[...P.add(f,[-.18,.08+r[0]*2,0]),.05],[...P.add(f,[-.34,.05+r[1]*3,.02]),.025]],l.JACKET,{group:12}),[[[-.32,i+.5+r[1]*2,-.07],[-.46,i+.38+r[0]*2,-.08]],[[-.34,i+.33+r[2]*2,.08],[-.55,i+.44-r[1]*3,.1]]].forEach(([g,M],x)=>{const m=x?6:4,v=P.add(f,[-.04,0,x?.06:-.06]);e.seg(v,g,.055,.045,l.JEANS,{group:m}),e.seg(g,M,.045,.04,l.JEANS,{group:m}),e.ell(P.add(M,[-.05,0,0]),[.08,.04,.045],l.SHOES,{dir:[-1,.3,0],group:m,paint:_=>_[1]<M[1]-.03?l.BELLY:void 0})}),e.ell(c,[.11,.115,.1],l.SKIN,{group:8,paint:g=>g[0]<c[0]-.01||g[1]>c[1]+.075?l.HAIR:void 0});for(const g of[-1,1]){const M=Qe.surface(c,[.11,.115,.1],P.norm([.85,.1,g*.45]));e.ell(M,[.026,.036,.026],l.BELLY,{group:8}),e.ell(P.add(M,[.012,0,g*.004]),[.014,.018,.014],l.EYE,{group:8})}e.ell(Qe.surface(c,[.11,.115,.1],P.norm([1,-.45,0])),[.012,.016,.04],l.BELLY,{group:8}),e.chain([[...P.add(c,[-.06,.03,0]),.065],[...P.add(c,[-.22,.05+r[1]*2,.01]),.05],[...P.add(c,[-.4,.06+r[2]*3,.02]),.03],[...P.add(c,[-.55,.07+r[0]*3,.02]),.012]],l.HAIR,{group:9});for(const g of[-1,1])e.ell(P.add(c,[-.015,0,g*.105]),[.05,.055,.03],l.PHONES,{group:10});e.chain([[...P.add(c,[-.005,.03,-.095]),.015],[...P.add(c,[-.02,.12,0]),.015],[...P.add(c,[-.005,.03,.095]),.015]],l.PHONES,{group:10});const p=P.add(c,[-.1+r[0],.2+r[1]*2,0]);e.ell(p,[.16,.014,.15],l.HAT,{dir:[1,.9,0],group:11}),e.chain([[...P.add(p,[-.02,.02,0]),.08],[...P.add(p,[-.14,.13,0]),.04],[...P.add(p,[-.3,.14+r[2]*2,0]),.012]],l.HAT,{group:11,paint:g=>Math.hypot(g[0]-p[0],g[1]-p[1])<.06?l.MAGIC:void 0}),e.seg(P.add(p,[.08,-.02,.08]),P.add(c,[.04,-.09,.08]),.008,.008,l.HAT,{group:11}),e.anchors.hand=o[1],e.anchors.hatTip=P.add(p,[-.3,.14+r[2]*2,0]);for(const[g,M,x,m]of[[-.86,a(-.8)+.05,.03,.22],[-.88,a(-.8)-.04,-.04,.16],[-.7,i+.45,.05,.14],[-.2,i+.5,-.04,.12]]){const v=t*.05%.1;e.seg([g-v,M,x],[g-v-m,M,x],.01,.004,l.MAGIC2,{group:30,extra:!0})}return e.ell([.02,.005,0],[.2,.005,.12],l.NOSE,{group:0}),e}const Yd={stand:{frames:3,fps:3},land:{frames:3,fps:10},takeoff:{frames:3,fps:10},talk:{frames:4,fps:2.5},placeSigil:{frames:3,fps:6},liftSigil:{frames:3,fps:6},sit:{frames:2,fps:1.5}},fr=.34,Xd={binding:[-.02,.31,-.2],dir:[.02,1,-.04]},Z0={stand:[0,1,2].map(n=>({breathe:[0,.006,.012][n],sway:[0,.02,.035][n],free:[.04,.5+[0,.006,.012][n],.18],hand:"rest",broom:Xd})),land:[{crouch:.2,hop:.01,broom:{astride:!0},sway:.05},{crouch:.1,bend:.1,broom:{binding:[-.28,.26,-.08],dir:[.6,.5,-.06]},legUp:[.18,.24,.12],sway:.03,free:[.2,.58,.2],hand:"rest"},{breathe:.004,broom:{binding:[.06,.31,-.2],dir:[.18,1,-.03]},sway:.015,free:[.06,.52,.19],hand:"rest"}],takeoff:[{crouch:.1,broom:{binding:[-.1,.3,-.17],dir:[.35,.7,-.04]},free:[.16,.58,.2],hand:"rest",sway:.02},{crouch:.15,bend:.1,broom:{binding:[-.3,.28,-.06],dir:[.7,.4,-.04]},legUp:[.1,.26,.13],sway:.04,free:[.24,.55,.17],hand:"rest"},{hop:.1,broom:{astride:!0},toes:!0,sway:.06}],talk:[{free:[.47,.84,.13],hand:"palm",tilt:.35,mouth:!0,sway:.01},{free:[.32,1.18,.12],hand:"point",tilt:-.25,look:.12,sway:.02},{free:[.24,1.16,.3],elbow:[.26,.88,.26],hand:"wave",tilt:.45,mouth:!0,sway:.03},{free:[.15,.76,.1],hand:"chest",tilt:-.35,breathe:.01,sway:.015}],placeSigil:[{free:[.16,1.62,.1],hand:"palm",look:.22,breathe:.01,sway:.02},{free:[.42,1,.12],hand:"palm",look:.08,sway:.03},{crouch:.7,bend:.55,free:[.38,.1,.13],hand:"down",look:-.08,sway:.04}],liftSigil:[{crouch:.7,bend:.55,free:[.36,.08,.13],hand:"down",look:-.08,sway:.02},{crouch:.25,bend:.18,free:[.44,.82,.12],hand:"palm",look:.05,sway:.04},{breathe:.012,free:[.2,1.64,.1],hand:"palm",look:.25,sway:.05,toes:!0}],sit:[0,1].map(n=>({sit:!0,swing:[.06,-.06][n],bend:-.08,look:[.02,.1][n],tilt:[.15,-.2][n],sway:[.01,.03][n],breathe:[0,.008][n],broom:{binding:[-.24,.31,-.3],dir:[.32,1,-.06]},free:[.2,fr+.14,.15],far:[.18,fr+.14,-.13],hand:"rest"}))};function J0(n,e,t){const i=Math.hypot(e[0]-n[0],e[1]-n[1]),s=P.lerp(n,e,.5);if(i>=2*t)return s;const r=Math.sqrt(t*t-i*i/4),a=(e[0]-n[0])/i,o=(e[1]-n[1])/i;return[s[0]-o*r,s[1]+a*r,s[2]]}function Q0(n,e){const t=Z0[n],i={crouch:0,bend:0,hop:0,breathe:0,sway:0,tilt:0,look:0,broom:Xd,...t[e%t.length]},s=new Qe({blend:.03}),r=i.hop,a=i.sway,o=i.sit?fr+.06:.45-i.crouch*.21+r,h=-i.crouch*.12,c=!!i.broom.astride,d=o-.04,f=c?[1,0,0]:P.norm(i.broom.dir),u=c?[-.36,d,0]:i.broom.binding,p=E=>P.add(u,P.mul(f,E));s.seg(p(0),p(c?.98:1.1),.022,.018,l.BROOM,{group:2}),s.ell(p(-.13),[.17,.07,.08],l.STRAW,{dir:f,group:3,paint:E=>{const C=P.dot(P.sub(E,u),f);return C<-.22?l.MAGIC2:C>-.01?l.BROOM:void 0}});for(const E of[-1,1]){const C=E>0?6:4,T=[h,o,E*.07],R=i.sit?i.swing*E:0,O=i.sit?[.24+R,.09+Math.max(0,R)*.6,E*.1]:E>0&&i.legUp?i.legUp:[(E>0?.05:-.01)+(i.toes?-.03:0),.07+(i.toes?r*.4:r),E*.1],I=i.sit?[.21,o+.01,E*.09]:J0(T,O,.21);s.seg(T,I,.055,.045,l.JEANS,{group:C}),s.seg(I,O,.045,.04,l.JEANS,{group:C});const k=i.toes?[.03,-.045,0]:[.05,-.03,0];s.ell(P.add(O,k),[.08,.04,.045],l.SHOES,{dir:i.toes?[1,-.6,0]:[1,0,0],group:C,paint:U=>U[1]<O[1]+k[1]-.015?l.BELLY:void 0})}const g=[Math.sin(i.bend),Math.cos(i.bend),0],M=[Math.cos(i.bend),-Math.sin(i.bend),0],x=[h,o+.03,0];s.ell(x,[.1,.08,.105],l.JEANS,{group:1});const m=P.add(x,P.add(P.mul(g,.19),[0,i.breathe,0]));s.ell(m,[.1,.15+i.breathe*.5,.115],l.JACKET,{dir:M,group:1,paint:E=>P.dot(P.sub(E,m),M)>.045&&Math.abs(E[2])<.05?l.TOP:void 0}),s.chain([[...P.add(m,P.add(P.mul(M,-.07),P.mul(g,-.08))),.07],[...P.add(m,P.add(P.mul(M,-.11-a),P.mul(g,-.2))),.05],[...P.add(m,P.add(P.mul(M,-.13-a*1.6),P.mul(g,-.29))),.025]],l.JACKET,{group:12});const v=P.add(m,P.add(P.mul(g,.27),[i.look*.03,0,i.tilt*.04])),_=E=>P.add(m,P.add(P.mul(g,.1),[0,0,E*.12])),w=c?[.28,d+.03,-.05]:p(Math.max(.12,(Math.min(.62,o+.2)-u[1])/Math.max(.3,f[1]))),A=c?[.28,d+.03,.05]:i.free;for(const E of[-1,1]){const C=E>0?7:5,T=_(E),R=E>0?A:i.far||w,O=E>0&&i.elbow?i.elbow:P.add(P.lerp(T,R,.5),[-.03,-.02,E*.05]);s.seg(T,O,.04,.035,l.JACKET,{group:C}),s.seg(O,R,.035,.03,l.JACKET,{group:C});const I=E>0&&!c?i.hand:"grip";if(I==="palm")s.ell(R,[.045,.02,.04],l.SKIN,{group:C});else if(I==="down")s.ell(R,[.045,.02,.04],l.SKIN,{dir:[1,.15,0],group:C});else if(I==="wave"){s.ell(R,[.03,.045,.04],l.SKIN,{group:C});for(const k of[-1,0,1])s.seg(P.add(R,[0,.03,k*.02]),P.add(R,[k*.01,.065,k*.03]),.01,.008,l.SKIN,{group:C})}else I==="point"?(s.ell(R,[.035,.03,.035],l.SKIN,{group:C}),s.seg(P.add(R,[0,.02,0]),P.add(R,[.01,.08,0]),.012,.01,l.SKIN,{group:C})):s.ell(R,[.035,.03,.035],l.SKIN,{group:C})}s.ell(v,[.11,.115,.1],l.SKIN,{group:8,paint:E=>E[0]<v[0]-.01||E[1]>v[1]+.075?l.HAIR:void 0});for(const E of[-1,1])s.ell(Qe.surface(v,[.11,.115,.1],P.norm([.85,.05+i.look,E*.45+i.tilt*.1])),[.016,.026,.016],l.EYE,{group:8});i.mouth&&s.ell(Qe.surface(v,[.11,.115,.1],P.norm([1,-.5+i.look,i.tilt*.1])),[.012,.016,.025],l.NOSE,{group:8}),s.chain([[...P.add(v,[-.06,.02,0]),.06],[...P.add(v,[-.12-a,-.12,.02+i.tilt*.03]),.05],[...P.add(v,[-.13-a*1.5,-.25,.03+i.tilt*.04]),.03]],l.HAIR,{group:9});for(const E of[-1,1])s.ell(P.add(v,[-.015,0,E*.105]),[.05,.055,.03],l.PHONES,{group:10});s.chain([[...P.add(v,[-.005,.03,-.095]),.015],[...P.add(v,[-.005,.11,-.05]),.015],[...P.add(v,[-.005,.125,0]),.015],[...P.add(v,[-.005,.11,.05]),.015],[...P.add(v,[-.005,.03,.095]),.015]],l.PHONES,{group:10});const y=P.add(v,[-.03,.1,i.tilt*.02]),S=i.tilt*.05,b=P.add(y,[-.16-a*.5,.27,S*2]);return s.ell(y,[.16,.014,.15],l.HAT,{dir:[1,.25-i.look*.8,i.tilt*.3],group:11}),s.chain([[...P.add(y,[0,.01,0]),.085],[...P.add(y,[-.05,.17,S]),.045],[...b,.012]],l.HAT,{group:11,paint:E=>E[1]<y[1]+.045?l.MAGIC:void 0}),s.ell([.02,.005,0],[.2,.005,.12],l.NOSE,{group:0}),s.anchors.hand=A,s.anchors.hatTip=b,s}function Kd({frame:n=0,lean:e=!1,pose:t}={}){if(t==="fast")return $0(n);if(Yd[t])return Q0(t,n);const i=t==="rise",s=t==="descend",r=t==="brake",a=i||s||r,o=new Qe({blend:.03}),h=a?0:[0,.025,.045][n%3],c=a?0:[0,.015,-.01][n%3]+(e?.08:0),d=.42+h,f=i?.3:s?-.27:r?-.12:e?.1:0,u=Math.min(.1,Math.max(0,f)),p=a?[.02,.06][n%2]:[0,.03,.05][n%3],g=s?1:i?-.6:0;o.seg([-.5,d-c*2,0],[.62,d+c*3,0],.022,.018,l.BROOM,{group:2}),r?o.ell([-.56,d-.08,0],[.17,.07,.09],l.STRAW,{dir:[.55,1,0],group:3,paint:_=>_[1]<d-.18?l.MAGIC2:_[1]>d-.01?l.BROOM:void 0}):o.ell([-.62,d-c*2-.01,0],[.17,.07,.08],l.STRAW,{dir:[1,c,0],group:3,paint:_=>_[0]<-.72?l.MAGIC2:_[0]>-.5?l.BROOM:void 0});for(const _ of[-1,1]){const w=[-.04,d+.06,_*.07],A=r?[.18,d-.01,_*.14]:s?[.16,d-.05,_*.14]:i?[.06,d-.07,_*.14]:[.12+f*.5,d-.02,_*.14],y=r?_>0?[.44,d-.02+p,_*.13]:[.3,d-.16,_*.13]:s?[.2,d-.26,_*.13]:i?[-.1,d-.23,_*.13]:[.08+f,d-.2,_*.13];o.seg(w,A,.055,.045,l.JEANS,{group:_>0?6:4}),o.seg(A,y,.045,.04,l.JEANS,{group:_>0?6:4}),o.ell(P.add(y,[.05,-.02,0]),[.08,.04,.045],l.SHOES,{group:_>0?6:4,paint:S=>S[1]<y[1]-.04?l.BELLY:void 0})}o.ell([-.04,d+.08,0],[.11,.07,.1],l.JEANS,{group:1});const M=[0+f*.8,d+.26-Math.abs(f)*.3,0];o.ell(M,[.1,.16,.11],l.JACKET,{dir:[f*2.5,1,0],up:[-1,0,0],group:1,paint:_=>_[0]>M[0]+.04&&Math.abs(_[2])<.055?l.TOP:void 0}),r?o.chain([[...P.add(M,[-.08,-.06,0]),.07],[...P.add(M,[-.02,.12+p,.02]),.05],[...P.add(M,[.14,.18+p,.03]),.025]],l.JACKET,{group:12}):a&&o.chain([[...P.add(M,[-.08,-.1,0]),.07],[...P.add(M,[-.2,-.12+g*(.08+p),0]),.05],[...P.add(M,[-.3,-.12+g*(.16+p*1.5),.02]),.025]],l.JACKET,{group:12});const x=P.add(M,[.03+f*.5,.26,0]),m=P.add(x,[r?.05:s?-.01:-.03,r?.06:.1,0]);for(const _ of[-1,1]){const w=P.add(M,[.01,.11,_*.11]),A=s&&_>0?P.add(m,[.1,.01,.1]):r?[.3,d+.03,_*.05]:[.26+f,d+.03,_*.05],y=s&&_>0?P.add(w,[.1,.02,.1]):P.lerp(w,A,.5);o.seg(w,y,.04,.035,l.JACKET,{group:_>0?7:5}),o.seg(y,A,.035,.03,l.JACKET,{group:_>0?7:5}),o.ell(A,[.035,.03,.035],l.SKIN,{group:_>0?7:5}),_>0&&(o.anchors.hand=A)}o.ell(x,[.11,.115,.1],l.SKIN,{group:8,paint:_=>_[0]<x[0]-.01||_[1]>x[1]+.075?l.HAIR:void 0});for(const _ of[-1,1])o.ell(Qe.surface(x,[.11,.115,.1],P.norm([.85,.05,_*.45])),[.016,.026,.016],l.EYE,{group:8});r?o.chain([[...P.add(x,[-.06,.06,0]),.06],[...P.add(x,[.04,.13+p,.03]),.045],[...P.add(x,[.2,.08+p,.04]),.02]],l.HAIR,{group:9}):o.chain([[...P.add(x,[-.06,.02,0]),.06],[...P.add(x,[-.18-u,-.05+p+g*.1,.02]),.045],[...P.add(x,[-.3-u*1.5,-.08+p*1.6+g*.22,.03]),.02]],l.HAIR,{group:9});for(const _ of[-1,1])o.ell(P.add(x,[-.015,0,_*.105]),[.05,.055,.03],l.PHONES,{group:10});o.chain([[...P.add(x,[-.005,.03,-.095]),.015],[...P.add(x,[-.005,.11,-.05]),.015],[...P.add(x,[-.005,.125,0]),.015],[...P.add(x,[-.005,.11,.05]),.015],[...P.add(x,[-.005,.03,.095]),.015]],l.PHONES,{group:10});const v=i?.1:0;if(o.ell(m,[.16,.014,.15],l.HAT,{dir:r?[1,-.55,0]:[1,.25+v*3,0],group:11}),o.anchors.hatTip=r?P.add(m,[.2,.22+p*.5,0]):P.add(m,[-.16-u*1.5-v,.27+p*.5-v*.5,0]),o.chain(r?[[...P.add(m,[0,.01,0]),.085],[...P.add(m,[.06,.16,0]),.045],[...P.add(m,[.2,.22+p*.5,0]),.012]]:[[...P.add(m,[0,.01,0]),.085],[...P.add(m,[-.05-u-v*.5,.17-v*.3,0]),.045],[...P.add(m,[-.16-u*1.5-v,.27+p*.5-v*.5,0]),.012]],l.HAT,{group:11,paint:_=>_[1]<m[1]+.045?l.MAGIC:void 0}),a){const _=q0[t]+(r?[0,.06][n%2]:0),w=Math.cos(_),A=Math.sin(_),y=[0,d,0],S=T=>[y[0]+(T[0]-y[0])*w-(T[1]-y[1])*A,y[1]+(T[0]-y[0])*A+(T[1]-y[1])*w,T[2]],b=T=>[y[0]+(T[0]-y[0])*w+(T[1]-y[1])*A,y[1]-(T[0]-y[0])*A+(T[1]-y[1])*w,T[2]],E=T=>[T[0]*w-T[1]*A,T[0]*A+T[1]*w,T[2]];for(const T of o.parts)if(T.type==="ell"?(T.c=S(T.c),T.axes=T.axes.map(E)):(T.a=S(T.a),T.b=S(T.b)),T.paint){const R=T.paint;T.paint=(O,I)=>R(b(O),I)}for(const T of o.flats)T.c=S(T.c),T.u=E(T.u),T.v=E(T.v);o.anchors.hand=S(o.anchors.hand),o.anchors.hatTip=S(o.anchors.hatTip);const C=Math.min(...o.parts.map(T=>T.type==="ell"?T.c[1]-Math.max(...T.r):Math.min(T.a[1]-T.r1,T.b[1]-T.r2)));if(C<.08){for(const T of o.parts){const R=.08-C;T.type==="ell"?T.c=[T.c[0],T.c[1]+R,T.c[2]]:(T.a=[T.a[0],T.a[1]+R,T.a[2]],T.b=[T.b[0],T.b[1]+R,T.b[2]])}for(const T of["hand","hatTip"])o.anchors[T]=P.add(o.anchors[T],[0,.08-C,0])}if(r){const T=S([-.45,d-.24,0]);for(let R=0;R<5;R++){const O=R+n*.5,I=.055-R*.008;o.ell([T[0]+.1+O*.08,Math.max(.04,T[1]-.02+Math.sin(O*1.9)*.04),Math.cos(O*1.3)*.06],[I,I*.8,I],R<2?l.BELLY:R%2?l.MAGIC:l.MAGIC2,{group:25+R,extra:!0})}}if(i){const T=S([-.8,d,0]);for(let R=0;R<5;R++){const O=R+n*.5,I=.05-R*.007;o.ell([T[0]-.02+Math.sin(O*2.1)*.06,Math.max(.04,T[1]-.08-O*.09),Math.cos(O*1.7)*.05],[I,I,I],R%2?l.MAGIC:l.MAGIC2,{group:20+R,extra:!0})}}}return o.ell([.02,.005,0],[.2,.005,.12],l.NOSE,{group:0}),o}const Io=(n={})=>Math.round((n.size||8)*Math.sqrt(n.growth||20)*(2/(n.pixel||3))*1.9),Ko=new Map,Zl=n=>(Ko.has(n)||Ko.set(n,cn(Kd({frame:0}),{height:n}).s),Ko.get(n)),Cr=(n={})=>Zl(Io(n)),j0={away:-Math.PI/2,towards:Math.PI/2};function ep(n={},{frame:e=0,lean:t=!1,facing:i="towards",pose:s,heading:r="side"}={}){const a=Io(n),o=j0[r],h=Kd({frame:e,lean:t,pose:s}),{sp:c,project:d,s:f}=o!==void 0?cn(h,{scale:Zl(a),yaw:o}):s?cn(h,{scale:Zl(a),facing:i}):cn(h,{height:a,facing:i});c.scale=f,h.anchors.hand&&(c.anchors={hand:d(h.anchors.hand),hatTip:d(h.anchors.hatTip)});let u=0;for(let p=0;p<400&&u<6;p++){const g=p*37%c.w,M=p*53%Math.floor(c.h*.8);c.get(g,M)||c.get(g+1,M)||c.get(g-1,M)||c.get(g,M+1)||c.get(g,M-1)||(g*7+M*13+e*5)%11||(c.px(g,M,l.MAGIC2),u++)}return c}const mt=(n,e=0)=>{const t=Math.sin(n*127.1+e*311.7)*43758.5453;return t-Math.floor(t)},cr=n=>{const e=mt(Math.floor(n[0]*14)+Math.floor(n[2]*14)*13,Math.floor(n[1]*6));return e<.14?l.BARKD:e>.88?l.BARKL:void 0},tp=n=>e=>{const t=mt(Math.floor(e[0]*10),Math.floor(e[1]*10)+Math.floor(e[2]*10)*7);return e[1]<n[1]-.2||t<.2?l.LEAF3:t>.8?l.LEAF2:void 0},Fi=(n,e,t,i,s=!0)=>n.ell(e,t,l.STONE,{group:i,rough:.025,paint:r=>r[1]>e[1]+t[1]*.45&&s?l.MOSS:Math.abs(Math.sin(r[0]*13+r[2]*7))<.06?l.STONED:void 0}),ga=(n,e,t,i)=>n.ell(e,t,l.LEAF,{group:i,rough:.04,paint:tp(e)}),xn=(n,e,t)=>n.chain(e,l.TRUNK,{group:t,rough:.012,paint:cr}),xa=(n,e,t,i,s,r=.3,a=l.LEAF2)=>{for(let o=0;o<e;o++){const h=mt(s,o)*6.283,c=t*Math.sqrt(mt(o,s)),d=Math.cos(h)*c,f=Math.sin(h)*c*.7;n.ell([d,r*.3,f],[.07,r*(.35+mt(o,4)*.3),.07],a,{group:i+o%3,paint:u=>u[1]>r*.45?l.LEAF:void 0})}},Ma=(n,e,t,i)=>n.ell(e,[t[0],.015,t[1]],l.WATER,{group:i}),np={"sleeping-giant"(n){const e=t=>i=>{const s=mt(Math.floor(i[0]*8),Math.floor(i[2]*8)+Math.floor(i[1]*8)*5);return s<.15?l.LEAF3:s>.86?l.LEAF2:void 0};for(const[t,i]of[[[.85,.42,0],[.7,.5,.66]],[[0,.3,0],[.62,.36,.6]],[[-.8,.3,0],[.56,.36,.62]],[[1.85,.5,.02],[.5,.5,.48]],[[-1.55,.72,.3],[.38,.5,.3]],[[-1.55,.72,-.3],[.38,.5,.3]],[[-2.2,.3,.32],[.42,.3,.26]],[[-2.2,.3,-.32],[.42,.3,.26]],[[.6,.2,.78],[.75,.2,.2]],[[.6,.2,-.78],[.75,.2,.2]]])n.ell(t,i,l.MOSS,{group:1,rough:.03,paint:e()});Fi(n,[2.25,.75,.12],[.13,.15,.11],2,!1);for(const t of[-.12,.22])n.ell([2.12,.88,t],[.08,.04,.07],l.STONED,{group:3});Fi(n,[-.2,.16,.95],[.2,.15,.18],4),Fi(n,[-.2,.16,-.95],[.18,.14,.16],5),n.ell([2,.95,.02],[.42,.14,.4],l.LEAF3,{group:6,rough:.03}),xa(n,26,2.8,10,3,.3)},"fern-grotto"(n){n.ell([0,.16,0],[.78,.2,.72],l.STONE,{group:1,rough:.015,paint:e=>e[1]>.3?l.MOSS:void 0}),Ma(n,[0,.345,0],[.55,.5],2);for(let e=0;e<6;e++){const t=e/6*Math.PI*2+.4,i=1.5+mt(e)*.3,s=[Math.cos(t)*i,0,Math.sin(t)*i*.8],r=1.1+mt(e,2)*.7,a=P.add(s,[0,r,0]);n.seg(s,a,.12,.09,l.TRUNK,{group:3+e,rough:.02,paint:cr});for(let o=0;o<7;o++){const h=o/7*Math.PI*2+e,c=[Math.cos(h),0,Math.sin(h)];n.chain([[...a,.05],[...P.add(a,P.add(P.mul(c,.45),[0,.18,0])),.04],[...P.add(a,P.add(P.mul(c,.9),[0,-.15,0])),.015]],o%2?l.LEAF:l.LEAF2,{group:10+e})}}for(let e=0;e<5;e++){const t=e*1.3;Fi(n,[Math.cos(t)*.95,.08,Math.sin(t)*.95],[.16,.12,.14],20+e)}},"sunken-boat"(n){Ma(n,[.3,.01,.15],[1.9,1.15],1);const e=[0,.12,0],t=P.norm([1,.28,.12]);n.ell(e,[1.3,.45,.55],l.WOOD,{dir:t,group:2,paint:i=>(P.dot(P.sub(i,e),[0,1,0])*9+9)%1<.14?l.BARKD:i[1]>.35&&mt(Math.floor(i[0]*9))<.4?l.MOSS:void 0}),n.ell(P.add(e,[0,.14,0]),[1.2,.4,.47],l.BARKD,{dir:t,group:2,cut:!0});for(let i=-2;i<=2;i++)n.seg(P.add(e,P.add(P.mul(t,i*.4),[0,.1,-.42])),P.add(e,P.add(P.mul(t,i*.4),[0,.1,.42])),.04,.04,l.WOOD,{group:3});n.seg([-.9,.05,.7],[.3,1,.55],.03,.03,l.WOOD,{group:4}),n.box([-.98,.06,.72],[.2,.02,.07],l.WOOD,{dir:[1.2,-.8,-.15],group:4}),xa(n,18,2.2,10,5,.45)},"bramble-wagon"(n){const e=P.norm([1,-.12,0]);n.box([0,.62,0],[1.1,.22,.52],l.WOOD,{dir:e,round:.04,group:1,paint:t=>(t[0]+3)*4%1<.08?l.BARKD:void 0}),n.box([0,.72,0],[1,.2,.43],l.BARKD,{dir:e,group:1,cut:!0});for(const[t,i,s,r]of[[-.72,.55,.4,.4],[-.72,-.55,.4,.4],[.72,-.55,.32,.37]])n.ell([t,s,i],[r,r,.06],l.WOOD,{group:2+(t>0?1:0)+(i>0?2:0),paint:a=>{const o=a[0]-t,h=a[1]-s,c=Math.hypot(o,h),d=Math.atan2(h,o);return c>r*.82||c<r*.18?l.BARKD:Math.abs(Math.sin(d*4))<.2?l.WOOD:l.NOSE}});n.ell([.95,.1,.75],[.37,.06,.37],l.WOOD,{group:7,paint:t=>Math.hypot(t[0]-.95,t[2]-.75)>.3?l.BARKD:void 0});for(const t of[-.3,.3])n.seg([1.05,.55,t],[1.9,.05,t*1.4],.04,.035,l.WOOD,{group:8});for(let t=0;t<14;t++){const i=mt(t,1)*6.283,s=Math.cos(i)*1.5,r=Math.sin(i)*.9,a=[[s,0,r,.03]];for(let o=1;o<4;o++)a.push([s*(1-o*.28)+(mt(t,o)-.5)*.5,.25+o*.25+mt(o,t)*.2,r*(1-o*.3)+(mt(o,t*3)-.5)*.4,.025-o*.004]);if(n.chain(a,l.BARKD,{group:10+t%3}),t%2===0){const o=a[3];n.ell([o[0],o[1],o[2]],[.18,.13,.16],l.LEAF,{group:14,rough:.03,paint:h=>mt(Math.floor(h[0]*30),Math.floor(h[1]*30))<.1?l.ACCENT:void 0})}}},"beehive-tree"(n){for(const[t,i,s]of[[-.2,0,-.25],[.15,-.1,.2],[0,.15,.05]])xn(n,[[t,0,i,.22],[t+s*.8,1.4,i,.16],[t+s*2,2.8,i-.1,.08]],1);for(const[t,i]of[[[-.6,2.9,-.2],[.9,.6,.7]],[[.6,3,-.2],[.85,.6,.7]],[[0,3.4,-.3],[.9,.55,.7]]])ga(n,t,i,3);xn(n,[[.2,1.9,-.05,.08],[.75,2.05,.15,.05]],2);const e=[.72,1.6,.2];n.ell(e,[.24,.42,.22],l.STRAW,{group:4,paint:t=>{const i=Math.floor((t[1]-e[1])*14),s=Math.floor(Math.atan2(t[2]-e[2],t[0]-e[0])*3+i%2*.5);return mt(i,s)<.3?l.BARK2:void 0}}),n.seg([.75,2.02,.15],[.72,1.9,.2],.05,.1,l.STRAW,{group:4});for(let t=0;t<6;t++){const i=t*1.9;n.ell([e[0]+Math.cos(i)*.45,e[1]+Math.sin(t*2.3)*.35,e[2]+Math.sin(i)*.35],[.03,.025,.03],l.MAGIC,{group:20+t,extra:!0})}},"fairy-ring"(n){for(let e=0;e<9;e++){const t=e/9*Math.PI*2,i=[Math.cos(t)*1.6,0,Math.sin(t)*1.25],s=.35+mt(e)*.35;n.box(P.add(i,[0,s/2,0]),[.13,s/2,.1],l.STONE,{dir:[-Math.sin(t),0,Math.cos(t)],round:.05,rough:.015,group:1+e,paint:a=>e===2&&Math.abs(a[1]-s*.55)<s*.22&&Math.abs(a[0]-i[0]-0)<.05?l.RUNE:a[1]>s*.85?l.MOSS:void 0});const r=P.add(i,[Math.cos(t+.35)*.25,0,Math.sin(t+.35)*.2]);n.seg(r,P.add(r,[0,.16,0]),.035,.03,l.CLOTH,{group:12}),n.ell(P.add(r,[0,.18,0]),[.1,.06,.1],l.ACCENT,{group:13,paint:a=>mt(Math.floor(a[0]*60),Math.floor(a[2]*60))<.15?l.BELLY:void 0})}},"charcoal-hut"(n){const e=[0,2,0];for(let i=0;i<20;i++){const s=i/20*Math.PI*2;Math.abs(s-1.2)<.35||n.seg([Math.cos(s)*.95,0,Math.sin(s)*.8],P.add(e,[Math.cos(s)*.08,.1+mt(i)*.25,Math.sin(s)*.08]),.05,.03,i%3?l.TRUNK:l.BARKD,{group:1+i%2})}n.ell([0,.6,0],[.85,.6,.7],l.BARKD,{group:3});const t=[1.7,0,.3];n.ell(t,[.85,.42,.7],l.BARKD,{group:4,rough:.03,paint:i=>mt(Math.floor(i[0]*14),Math.floor(i[2]*14)+Math.floor(i[1]*14))<.07?l.GLOW:i[1]>.3?l.SHADES:void 0});for(let i=0;i<4;i++)n.seg([-1.4,.1+i*.14,-.5+i%2*.05],[-1.4,.1+i*.14,.5],.07,.07,l.TRUNK,{group:5+i%2,paint:s=>Math.abs(s[2])>.46?l.BARKL:void 0})},"root-arch"(n){xn(n,[[-1.8,0,.1,.4],[-1.4,1.2,0,.34],[-.4,2.3,-.1,.3],[.6,2.4,0,.28],[1.5,1.4,.1,.32],[1.9,0,.15,.38]],1),xn(n,[[-1.4,0,-.6,.28],[-.6,1.6,-.5,.22],[.5,1.9,-.45,.2],[1.3,.9,-.4,.22],[1.5,0,-.35,.26]],2),xn(n,[[-1.8,.2,.1,.3],[-2.4,.05,.5,.12]],1),xn(n,[[1.9,.2,.15,.3],[2.5,.05,.55,.12]],1);for(const[e,t]of[[[-.2,2.6,-.2],[.7,.35,.5]],[[.8,2.5,-.25],[.55,.3,.45]]])ga(n,e,t,4);for(let e=0;e<4;e++)Fi(n,[-.7+e*.45,.12,(mt(e)-.5)*.5],[.22,.18,.2],6+e);n.box([0,.35,-.2],[.16,.35,.08],l.STONE,{round:.05,rough:.01,group:11,paint:e=>Math.abs(e[1]-.4)<.14&&Math.abs(e[0])<.05?l.MAGIC:e[1]>.62?l.MOSS:void 0})},"turf-hut"(n){n.box([0,.55,0],[1,.55,.7],l.WOOD,{round:.04,group:1,paint:e=>e[1]*7%1<.18?l.BARKD:e[2]>.66&&Math.abs(e[0]+.2)<.2&&e[1]<.85?l.NOSE:e[2]>.66&&Math.abs(e[0]-.5)<.14&&Math.abs(e[1]-.7)<.12?l.SHADES:void 0});for(const e of[-1,1])n.box([0,1.3,e*.4],[1.15,.05,.5],l.MOSS,{dir:[1,0,0],up:[0,1,-e*.75],round:.03,group:2,paint:t=>mt(Math.floor(t[0]*12),Math.floor(t[2]*12))<.25?l.LEAF2:void 0});n.seg([.65,1.2,-.3],[.65,1.9,-.3],.15,.13,l.STONE,{group:3,rough:.015});for(let e=0;e<5;e++)Fi(n,[-1.4+e*.7,.12,.9+mt(e)*.3],[.2,.15,.18],4+e);xa(n,16,1.8,10,9,.25)},"heron-rookery"(n){xn(n,[[0,0,0,.25],[.4,1.4,0,.18],[.9,2.8,-.1,.12],[1.3,3.8,-.2,.06]],1);const e=[[[.6,2,-.05],[-.3,2,-.1]],[[1,3,-.1],[1.8,2.9,0]],[[1.25,3.6,-.2],[.6,3.7,-.3]]];e.forEach(([s,r],a)=>{xn(n,[[...s,.07],[...r,.04]],2),n.ell(P.add(r,[0,.08,0]),[.34,.13,.3],l.BARK2,{group:3+a,rough:.025,paint:o=>Math.abs(Math.sin(o[0]*30+o[2]*20))<.25?l.STRAW:o[1]<r[1]+.02?l.BARKD:void 0})});for(const[s,r]of[[[1.2,4,-.4],[.6,.4,.45]],[[.3,3.1,-.5],[.45,.3,.35]],[[1.9,3.3,-.4],[.4,.3,.35]]])ga(n,s,r,7);const t=P.add(e[1][1],[0,.42,.05]),i=1.6;n.ell(t,[.18*i,.1*i,.09*i],l.BELLY,{dir:[1,.3,0],group:10,paint:s=>s[1]>t[1]+.06?l.STONE:void 0}),n.chain([[...P.add(t,[.12*i,.06*i,0]),.035*i],[...P.add(t,[.2*i,.22*i,0]),.03*i],[...P.add(t,[.16*i,.32*i,0]),.04*i]],l.BELLY,{group:10}),n.seg(P.add(t,[.18*i,.33*i,0]),P.add(t,[.36*i,.3*i,0]),.015*i,.005*i,l.BODY2,{group:11});for(const s of[-.04,.04])n.seg(P.add(t,[0,-.06*i,s]),P.add(t,[.02,-.42,s]),.012,.012,l.BARKD,{group:12})},sundial(n){n.ell([0,.07,0],[1.05,.09,1],l.STONE,{group:1,rough:.01}),n.ell([0,.2,0],[.72,.09,.68],l.STONE,{group:2,rough:.01,paint:e=>e[1]>.26&&mt(Math.floor(e[0]*8),Math.floor(e[2]*8))<.3?l.MOSS:void 0}),n.seg([0,.28,0],[0,.95,0],.16,.13,l.STONE,{group:3,paint:e=>Math.abs(Math.sin(e[1]*30))<.15?l.STONED:void 0}),n.ell([0,1,0],[.38,.04,.38],l.FRAME,{group:4,paint:e=>{const t=Math.atan2(e[2],e[0]);return Math.abs(Math.sin(t*6))<.12&&Math.hypot(e[0],e[2])>.26?l.BARKD:void 0}}),n.box([0,1.12,0],[.2,.1,.01],l.FRAME,{dir:[1,-.5,0],round:.005,group:5});for(let e=0;e<22;e++){const t=e/22*Math.PI*2,i=1.25+mt(e)*.2,s=[Math.cos(t)*i,0,Math.sin(t)*i*.85];n.seg(s,P.add(s,[0,.18,0]),.015,.012,l.LEAF2,{group:6}),n.ell(P.add(s,[0,.2,0]),[.05,.04,.05],[l.FLOWER,l.BELLY,l.ACCENT][e%3],{group:7})}},"bear-den"(n){const e=[0,.3,-.2];n.ell(e,[1.7,1.15,1.25],l.LEAF,{group:1,rough:.05,paint:t=>{const i=mt(Math.floor(t[0]*16),Math.floor(t[1]*16)+Math.floor(t[2]*16)*3);return i<.06?l.ACCENT:i<.2?l.BARKD:t[1]<.4?l.LEAF3:i>.85?l.LEAF2:void 0}}),n.ell([.35,.35,.95],[.5,.55,.4],l.NOSE,{group:1,cut:!0}),n.seg([2,0,.5],[2,.65,.5],.3,.27,l.TRUNK,{group:3,paint:t=>t[1]>.6?l.BARKL:Math.abs(Math.sin(Math.atan2(t[2]-.5,t[0]-2)*3))<.12&&t[1]>.2?l.BARKD:void 0})},"stilt-hut"(n){Ma(n,[0,.01,.1],[2.1,1.3],1);for(const[e,t]of[[-.75,-.55],[.75,-.55],[-.75,.55],[.75,.55]])n.seg([e,0,t],[e,1.05,t],.07,.06,l.WOOD,{group:2,paint:i=>i[1]<.15?l.MOSS:void 0});n.box([0,1.1,0],[1.05,.05,.8],l.WOOD,{round:.02,group:3,paint:e=>(e[0]+3)*6%1<.12?l.BARKD:void 0}),n.box([-.1,1.6,-.1],[.7,.45,.55],l.WOOD,{round:.03,group:4,paint:e=>e[2]>.4&&Math.abs(e[0]-.1)<.18&&e[1]<1.85?l.NOSE:void 0});for(const[e,t]of[[2.1,.92],[2.35,.72],[2.58,.48],[2.76,.24]])n.ell([-.1,e,-.1],[t,.16,t*.85],l.STRAW,{group:5,paint:i=>Math.abs(Math.sin(Math.atan2(i[2]+.1,i[0]+.1)*18))<.25?l.BARK2:void 0});for(const e of[.72,.95])n.seg([.9,1.1,e],[1.15,0,e],.02,.02,l.WOOD,{group:6});for(let e=0;e<4;e++)n.seg([.92+e*.06,1-e*.26,.72],[.92+e*.06,1-e*.26,.95],.02,.02,l.WOOD,{group:6});for(let e=0;e<26;e++){const t=mt(e,7)*6.283,i=1.5+mt(e,8)*.7,s=[Math.cos(t)*i,0,Math.sin(t)*i*.7],r=.5+mt(e,9)*.5;n.seg(s,P.add(s,[0,r,0]),.028,.02,l.LEAF2,{group:10+e%3}),e%3===0&&n.ell(P.add(s,[0,r-.05,0]),[.025,.07,.025],l.BARKD,{group:13})}},"bog-shrine"(n){Ma(n,[.6,.01,.4],[1.4,.9],1),n.seg([0,0,0],[0,1.9,0],.2,.17,l.TRUNK,{group:2,rough:.01,paint:e=>{const t=e[1];return e[2]>.12&&(Math.abs(t-1.6)<.05&&Math.abs(Math.abs(e[0])-.08)<.05||Math.abs(t-1.38)<.04&&Math.abs(e[0])<.1)||t*5%1<.07?l.BARKD:e[1]>1.85?l.MOSS:void 0}}),n.ell([0,1.95,0],[.24,.1,.24],l.MOSS,{group:3});for(let e=0;e<6;e++){const t=e/6*Math.PI*2;n.seg([Math.cos(t)*1,0,Math.sin(t)*.8],[Math.cos(t)*1,.35+mt(e)*.25,Math.sin(t)*.8],.05,.04,l.TRUNK,{group:4})}n.ell([-.25,.06,.3],[.14,.07,.13],l.EAR,{group:5}),Fi(n,[.3,.07,.3],[.09,.07,.08],6,!1),Fi(n,[.15,.05,.42],[.06,.05,.06],7,!1);for(const[e,t,i]of[[.9,.9,.5],[1.4,1.2,.1],[.4,1.4,.8]])n.ell([e,t,i],[.06,.07,.06],l.MAGIC,{group:20+e*10,extra:!0,paint:s=>Math.hypot(s[0]-e,s[1]-t)<.03?l.MAGIC2:void 0});xa(n,20,2,10,11,.3,l.WEB)},"raven-tree"(n){xn(n,[[0,0,0,.3],[.1,1.3,0,.22],[-.1,2.5,-.1,.16],[.1,3.6,-.15,.07]],1),[[[.1,1.6,0],[1.3,2.3,.1],[1.8,2.2,.1]],[[-.05,2.1,-.05],[-1.2,2.8,-.1],[-1.6,3.2,-.1]],[[0,2.9,-.1],[.8,3.5,-.2]]].forEach((s,r)=>xn(n,s.map((a,o)=>[...a,.12-o*.04]),2+r)),xn(n,[[-.1,.5,0,.22],[-1.1,.1,.5,.08]],5),xn(n,[[.1,.4,0,.2],[.9,.05,-.4,.08]],5);const t=(s,r)=>{n.ell(s,[.12,.07,.06],l.SHADES,{dir:[1,.2,0],group:r}),n.ell(P.add(s,[.11,.07,0]),[.05,.05,.045],l.SHADES,{group:r}),n.seg(P.add(s,[.15,.07,0]),P.add(s,[.22,.05,0]),.015,.004,l.BODY2,{group:r}),n.seg(P.add(s,[-.1,0,0]),P.add(s,[-.22,-.04,0]),.04,.015,l.SHADES,{group:r})};t([1.3,2.42,.1],10),t([-1.2,2.92,-.1],11),t([.8,3.62,-.2],12),t([-.05,3.72,-.15],13);const i=[1.55,1.45,.1];n.seg([1.55,2.25,.1],P.add(i,[0,.3,0]),.01,.01,l.FRAME,{group:14});for(let s=0;s<6;s++){const r=s/6*Math.PI*2;n.seg(P.add(i,[Math.cos(r)*.2,-.25,Math.sin(r)*.2]),P.add(i,[Math.cos(r)*.12,.3,Math.sin(r)*.12]),.012,.012,l.FRAME,{group:14})}n.seg(P.add(i,[0,-.27,0]),P.add(i,[0,-.25,0]),.22,.22,l.FRAME,{group:14})},barrow(n){n.ell([0,0,-.2],[2.3,.95,1.3],l.LEAF2,{group:1,rough:.03,paint:e=>mt(Math.floor(e[0]*10),Math.floor(e[2]*10)+Math.floor(e[1]*10))<.25?l.LEAF:void 0});for(const e of[-.35,.35])n.box([e,.45,.95],[.12,.45,.12],l.STONE,{round:.03,rough:.01,group:2});n.box([0,.95,.95],[.55,.1,.14],l.STONE,{round:.03,rough:.01,group:3,paint:e=>e[1]>1.02?l.MOSS:void 0}),n.box([0,.4,.9],[.23,.4,.3],l.NOSE,{group:1,cut:!0});for(const[e,t,i]of[[-1.6,1,.7],[1.7,.9,.55]])n.box([e,i/2,t],[.12,i/2,.09],l.STONE,{round:.04,rough:.01,group:4})},cairn(n){let e=0;for(let i=0;i<6;i++){const s=.9-i*.14,r=Math.max(3,9-i);for(let a=0;a<r;a++){const o=a/r*Math.PI*2+i;Fi(n,[Math.cos(o)*s*.8,e+.14,Math.sin(o)*s*.7],[.24-i*.02,.15,.2-i*.02],1+(i+a)%4,i<2)}e+=.26}const t=[0,e+.1,0];for(let i=0;i<6;i++){const s=i/6*Math.PI*2;n.seg(P.add(t,[Math.cos(s)*.12,0,Math.sin(s)*.12]),P.add(t,[Math.cos(s)*.3,.35,Math.sin(s)*.3]),.02,.02,l.FRAME,{group:6})}n.seg(P.add(t,[0,-.3,0]),t,.05,.05,l.FRAME,{group:6}),n.ell(P.add(t,[0,.14,0]),[.2,.07,.2],l.SHADES,{group:7})},"stump-throne"(n){n.ell([0,.28,0],[.92,.34,.86],l.TRUNK,{group:1,rough:.015,paint:cr}),n.ell([0,.58,0],[.84,.06,.78],l.BARKL,{group:1,paint:e=>Math.abs(Math.sin(Math.hypot(e[0],e[2])*30))<.3?l.BARK2:void 0}),n.box([-.55,1.15,0],[.18,.62,.62],l.TRUNK,{round:.1,rough:.01,group:2,paint:cr});for(const e of[-.6,.6])n.box([-.1,.72,e],[.45,.14,.12],l.TRUNK,{round:.06,group:3,paint:cr});for(let e=0;e<6;e++){const t=e/6*Math.PI*2+.3;xn(n,[[Math.cos(t)*.8,.25,Math.sin(t)*.8,.18],[Math.cos(t)*1.4,.02,Math.sin(t)*1.3,.06]],4)}n.seg([1.5,.18,.8],[1.5,.18,.2],.18,.18,l.TRUNK,{group:5,paint:e=>e[2]>.78||e[2]<.22?l.BARKL:cr(e)}),n.seg([1.5,.3,.5],[1.6,.75,.5],.025,.025,l.WOOD,{group:6}),n.box([1.5,.36,.5],[.1,.06,.015],l.FRAME,{group:6});for(let e=0;e<6;e++){const t=e<3?0:1,i=e%3;n.seg([-1.7+i*.3+t*.15,.15+t*.26,-.7],[-1.7+i*.3+t*.15,.15+t*.26,.2],.14,.14,l.TRUNK,{group:7+e%2,paint:s=>s[2]>.16||s[2]<-.66?l.BARKL:void 0})}},"swing-beech"(n){xn(n,[[0,0,-.3,.45],[0,1.6,-.3,.36],[-.1,2.8,-.4,.26]],1),xn(n,[[0,2.2,-.3,.2],[1,2.6,-.2,.14],[1.9,2.75,-.1,.08]],2),xn(n,[[-.05,2.5,-.35,.18],[-1.2,3,-.4,.1]],3);for(let e=0;e<5;e++){const t=e/5*Math.PI*2;xn(n,[[Math.cos(t)*.35,.3,-.3+Math.sin(t)*.3,.2],[Math.cos(t)*.9,.02,-.3+Math.sin(t)*.8,.07]],4)}for(const[e,t]of[[[0,3.4,-.6],[1.4,.8,1]],[[1.4,3.1,-.4],[.9,.55,.7]],[[-1.3,3.2,-.6],[.9,.6,.7]]])ga(n,e,t,5);for(const e of[-.12,.12])n.seg([1.3,2.65,e],[1.3,.55,e],.012,.012,l.STRAW,{group:6});n.box([1.3,.53,0],[.08,.025,.18],l.WOOD,{round:.01,group:6});for(let e=0;e<9;e++)n.ell([(mt(e,1)-.5)*3,.05+mt(e,2)*.5,(mt(e,3)-.3)*1.6],[.022,.022,.022],l.MAGIC,{group:20+e,extra:!0})},bower(n){for(const t of[-.9,0,.9])for(const i of[-.6,.6])n.seg([t,0,i],[t,1.2,i],.04,.04,l.WOOD,{group:1});for(const t of[-.9,0,.9])n.chain([[t,1.2,-.6,.04],[t,1.62,-.3,.04],[t,1.72,0,.04],[t,1.62,.3,.04],[t,1.2,.6,.04]],l.WOOD,{group:2});for(const t of[-.6,.6])for(const i of[.5,1])n.seg([-.9,i,t],[.9,i,t],.025,.025,l.WOOD,{group:3});const e=t=>{const i=mt(Math.floor(t[0]*26),Math.floor(t[1]*26)+Math.floor(t[2]*26)*3);return i<.12?l.BELLY:i<.2?l.STRAW:i>.85?l.LEAF2:void 0};for(const[t,i]of[[[-.6,1.6,0],[.6,.3,.75]],[[.5,1.65,0],[.65,.3,.75]],[[-.95,.9,-.55],[.25,.65,.25]],[[.95,.8,-.6],[.25,.55,.25]],[[-.9,.7,.62],[.22,.5,.2]],[[.2,1.3,-.65],[.5,.4,.2]]])n.ell(t,i,l.LEAF,{group:4,rough:.04,paint:e});n.box([0,.4,-.35],[.6,.04,.15],l.WOOD,{round:.02,group:5});for(const t of[-.5,.5])n.seg([t,0,-.35],[t,.38,-.35],.03,.03,l.WOOD,{group:5})}},qd={moor:["sleeping-giant","the sleeping giant, a moss mound like a figure lying on its back",1],"fern-forest":["fern-grotto","a ring of giant tree ferns round a stone basin",1],"muddy-forest":["sunken-boat","an old rowing boat sunk in the mud",1.15],"tangly-forest":["bramble-wagon","an old wagon wrapped in brambles",1.1],"wispy-forest":["beehive-tree","a many-trunked tree with a great wild honeycomb",1],"hazel-forest":["fairy-ring","a ring of fairy stones and toadstools",1.1],"twiggy-forest":["charcoal-hut","a charcoal burner's hut of sticks, its mound smouldering",1],ancient:["root-arch","a great arch of roots over mossy stones",1.1],norway:["turf-hut","a log cabin with a turf roof",1.15],"alder-forest":["heron-rookery","an alder holding herons' stick nests",1],meadow:["sundial","a moonlit sundial on a stone dais in a ring of flowers",1.2],"berry-thicket":["bear-den","a bear's den in a bramble mound",1.1],wetland:["stilt-hut","a fisher's hut on stilts over a pool",1.1],bog:["bog-shrine","a carved post shrine to the bog, will-o'-wisps over the pool",1.1],deadwood:["raven-tree","a dead tree where the ravens gather",1],grassland:["barrow","a barrow with a stone doorway",1],heath:["cairn","a tall cairn with an old beacon basket",1.4],"old-pinewood":["stump-throne","a woodcutter's stump throne",1.1],"bluebell-glade":["swing-beech","a great beech with a rope swing, glowworms beneath",1],"honeysuckle-tangle":["bower","a honeysuckle bower with a bench",1.2]};function ip(n){let e=n.w,t=-1,i=n.h;for(let r=0;r<n.h;r++)for(let a=0;a<n.w;a++)n.m[r*n.w+a]&&(e=Math.min(e,a),t=Math.max(t,a),i=Math.min(i,r));const s=new dt(t-e+1,n.h-i);for(let r=0;r<s.h;r++)for(let a=0;a<s.w;a++){const o=(r+i)*n.w+a+e;n.m[o]&&s.put(a,r,n.m[o],n.n[o*3],n.n[o*3+1],n.n[o*3+2])}return{sp:s,x0:e,y0:i}}function sp(n,e){const t=n.leaf,i=e.trunkHue??.07;return{[l.TRUNK]:me(i,.45,.36),[l.BARKD]:me(i+.03,.5,.17),[l.BARKL]:me(i,.35,.55),[l.BARK2]:me(i+.02,.45,.26),[l.LEAF]:me(t,.55,.45),[l.LEAF2]:me(t-.03,.5,.62),[l.LEAF3]:me(t+.03,.6,.26),[l.STONE]:[122,120,128],[l.STONED]:[62,60,70],[l.MOSS]:me(.26,.45,.45),[l.WOOD]:[128,92,58],[l.STRAW]:[190,162,104],[l.CLOTH]:[228,220,200],[l.EAR]:[168,96,66],[l.FRAME]:[150,128,84],[l.SHADES]:[30,28,36],[l.ACCENT]:[196,40,52],[l.BELLY]:[232,228,214],[l.BODY2]:[210,170,60],[l.FLOWER]:[180,140,230],[l.WEB]:[228,228,234],[l.WATER]:[52,78,104],[l.NOSE]:[16,14,20],[l.GLOW]:[255,120,40],[l.MAGIC]:me(e.magicHue??.45,.6,1),[l.MAGIC2]:me(e.magicHue??.45,.2,1),[l.RUNE]:[120,230,255],[l.LINE]:[24,22,30]}}function rp(n,e,t,i=16){const s=new Qe({blend:.05});np[n](s),s.ell([0,.004,0],[.01,.004,.01],l.NOSE,{group:0});const r=(Object.values(qd).find(([u])=>u===n)||[,,1])[2],a=cn(s,{scale:Cr(t)*r}),{sp:o,x0:h,y0:c}=ip(a.sp),[d,f]=a.project([0,0,0]);return{sp:o,colours:sp(e,t),origin:{x:+(d-h).toFixed(1),y:+(f-c).toFixed(1)},metres:{width:+(o.w/i).toFixed(1),height:+(o.h/i).toFixed(1)}}}const ap=1.3,op=n=>[1,Math.sqrt(n.growth),Math.sqrt(n.growth)*ap,n.growth],kr=(n,e,t=1)=>Math.round(e.size*op(e)[Math.max(0,Math.min(3,n))]*(2/(e.pixel||2))*1.9*t),Qc=(n,e)=>{const t=ha(e);for(let i=0;i<9;i++){const s=Math.floor(xe(t,2,n.w-2)),r=Math.floor(xe(t,2,n.h*.6));if(!(n.get(s,r)||n.get(s+1,r)||n.get(s-1,r)||n.get(s,r+1)||n.get(s,r-1))&&(n.px(s,r,l.MAGIC2),i%3===0))for(const[a,o]of[[1,0],[-1,0],[0,1],[0,-1]])n.px(s+a,r+o,l.MAGIC)}};function Oo(n,e,t,i,s,r,a,o){const h=P.add(e,[-i*.7,i*(.75+s),t*i*.35]),c=P.norm(P.sub(h,e)),d=P.norm(P.sub([1,0,0],P.mul(c,P.dot([1,0,0],c)))),f=Math.hypot(...P.sub(h,e));n.flat(P.add(P.lerp(e,h,.5),P.mul(d,-i*.14)),c,d,f*.55,i*.34,Fs.wing(r,a),{group:o,extra:!0})}const jc=(n,e,t=1)=>n===0?Math.round(Math.max(12,Math.min(30*Math.max(.75,Math.min(1.1,t)),kr(1,e)*t*.72))):n===2?Math.round(Math.max(kr(1,e)*t*1.08,Math.min(kr(2,e,t),kr(1,e)*1.4))):kr(n,e)*t;let Qa=null;function lp(n,e){const t=Qa;Qa=n;try{return e()}finally{Qa=t}}const cp=(n,e)=>{const t=Math.atan2(e,n);return Math.hypot(n,e)<.55+.4*Math.pow(Math.abs(Math.cos(t*2.5+Math.PI/2)),3)},hp=(n,e)=>{const t=n*1.2,i=-e*1.2+.25;return Math.pow(t*t+i*i-.6,3)-t*t*i*i*i<0};function eh(n){const e=Qa,t=n.anchors;if(!e)return;const i=t.head,s=i?Math.max(...i.r):.2;if(e.collar&&(t.neck||i)){const r=t.neck||{c:P.add(i.c,[-i.r[0]*.8,-i.r[1]*.4,0]),r:i.r[1]*.75,dir:P.norm([1,.4,0])},a=P.norm(r.dir),o=P.norm(P.cross(a,Math.abs(a[2])<.9?[0,0,1]:[1,0,0])),h=P.cross(a,o),c=[],d=Math.max(.03,r.r*.2);for(let M=0;M<=16;M++){const x=M/16*Math.PI*2,m=P.add(P.mul(o,Math.cos(x)),P.mul(h,Math.sin(x)));let v=0;for(;v<.8&&n.field(P.add(r.c,P.mul(m,v)))<0;)v+=.01;v>=.8&&(v=r.r),c.push([...P.add(r.c,P.mul(m,v+d*.7)),d])}n.chain(c,l.COLLAR,{group:60,extra:!0});const f=c.reduce((M,x)=>x[0]-x[1]*.6+x[2]*.5>M[0]-M[1]*.6+M[2]*.5?x:M),u=d*1.3*(r.tag||1),p=P.norm(P.add(P.norm(P.sub(f.slice(0,3),r.c)),[.3,-.5,.3]));let g=f.slice(0,3);for(let M=0;M<60&&n.field(g)<u*.4;M++)g=P.add(g,P.mul(p,.01));n.ell(g,[u,u,u*.6],l.COLLAR,{group:60,extra:!0})}if(e.hat!=null&&i){const r=Math.max(s,.13),a=i.top||P.add(Qe.surface(i.c,i.r,P.norm([-.15,1,.1])),[0,s*.1,0]),o=P.norm([.3,1,.35]),h=r*1.5,c=P.add(a,P.mul(o,h));n.seg(P.add(a,P.mul(o,-r*.1)),c,r*.48,r*.04,l.HAT1,{group:61,extra:!0,paint:d=>Math.floor(P.dot(P.sub(d,a),o)/(h/5)+10)%2?l.HAT2:void 0}),n.ell(c,[r*.17,r*.17,r*.17],l.POM,{group:61,extra:!0})}if(e.glasses&&t.eyes&&i){const[r,a]=t.eyes.pts,o=c=>P.add(c,P.mul(P.norm(P.sub(c,i.c)),t.eyes.size*.45)),h=Math.max(t.eyes.size*1.05,s*.1);if(e.glasses==="bar")n.seg(o(r),o(a),h,h,l.SHADES,{group:62,extra:!0}),n.ell(P.add(o(a),[h*.3,h*.5,h*.2]),[h*.25,h*.25,h*.25],l.GLINT,{group:62,extra:!0});else for(const c of[r,a]){const d=P.norm(P.sub(c,i.c)),f=P.norm(P.cross([0,1,0],d)),u=P.cross(d,f),p=e.glasses==="heart"?hp:cp,g=h*1.5;n.flat(o(c),f,u,g,g,(M,x)=>p(M,x)?p(M*1.3,x*1.3)?l.SHADES:l.FRAME:null,{group:62,bend:.1,extra:!0}),n.seg(o(r),o(a),h*.18,h*.18,l.FRAME,{group:62,extra:!0})}}if(e.shoes)for(const r of t.feet){const a=e.shoes==="platform",o=r.r,h=P.add(r.c,[o*.25,o*(a?.35:.15),0]);n.ell(h,[o*1.45,o*(a?1.2:.85),o*1.15],l.SHOE,{group:r.group,extra:!0,paint:c=>c[1]<h[1]-o*(a?.45:.4)?l.SOLE:e.shoes==="glitter"&&mi(c,60,.28)?l.GLINT:void 0})}}function up(n,e,t,i,s="towards"){const r={legW:1,earS:1,hgt:1,bw:.3,...n.q},a=e===3,o=e===1,h=e===0,c=N=>a&&n.legend.includes(N),d=new Qe,f=r.hr*(h?1.75:o?1.25:1)*(i.head/.44)**.5,u=r.len*(h?.8:o?.9:1.02)*i.long,p=h?.55:o?.9:1.04,g=t?-.04:0,M=1+g,x=r.chest*(a?1.06:1)/p+g,m=r.tuck/p+g,v=r.bw*(h?1.15:e>=2?1.06:1)*(r.legW>1.2?1.15:1),_=.06*r.legW*(a?1.1:h?1.7:1),w=r.back==="hump"?.1:0,A=r.back==="arch"?.1:0,y=x+.12,S=N=>{if(r.belly&&N[1]<y&&N[0]>-u*.5)return l.BELLY;if(r.saddle&&N[1]>M-.18&&N[0]<u*.55)return l.BODY2;if(r.spots&&N[1]>x+.1&&mi(N,10,.22))return r.spotMat==="belly"||r.spots==="young"&&o?l.BELLY:r.spots==="young"?void 0:l.BODY3;if(r.ridge&&N[1]>M-.08+w*.5)return l.BODY3};if(d.ell([u*.48,(M+x)/2+w*.5,0],[u*.62,(M-x)/2+w*.5,v],l.BODY,{paint:S}),d.ell([-u*.5,(M+m)/2+A*.6,0],[u*.58,(M-m)/2+A*.6,v*.93],l.BODY,{paint:S}),d.ell([0,(M+(x+m)/2)/2+.02,0],[u*.6,(M-(x+m)/2)/2,v*.9],l.BODY,{paint:S}),r.ridge)for(let N=0;N<(a?16:10);N++){const te=-u*.8+N*u*1.75/(a?15:9),ae=(.07+(a?.04:0))*(1+.5*Math.max(0,te/u));d.ell([te,M+.02+w*Math.max(0,1-Math.abs(te/u-.5)*2)+ae*.5,0],[ae,.03,v*.25],l.BODY3,{dir:[-.3,1,0],up:[1,0,0]})}if(r.wool)for(let N=0;N<14;N++){const te=N/14*Math.PI*2;d.ell([u*Math.cos(te)*.7,(M+x)/2+Math.sin(te)*.2,v*(N%2?.5:-.5)],[.16,.14,.14],l.BODY)}const b=[.32,-.32][t],E=(N,te)=>{const ae=te*v*.62,pe=N?u*.62:-u*.62,be=(N?1:-1)*te*b,Pe=N?x+.1:m+.15,q=(N?te:-te)*(t?1:-1)>0?.06:0,ee=[pe+Math.sin(be)*.2+(N?.02:.1),Math.max(.3,Pe*.55),ae],B=[pe+Math.sin(be)*.42,.05+q,ae],ce=[pe,Pe+.12,ae*.8],H=te>0?r.legMat||l.BODY:r.legMat?l.BODY3:l.BODY2,Z=N?[[...ce,_*1.5],[...ee,_*1.05],[...B,_*.9]]:[[...ce,_*2*(r.haunch||1)],[...P.add(ee,[-.12,.06,0]),_*1.2],[...P.add(B,[-.06*(r.hindFoot||1),.12,0]),_*.9],[...B,_*.9]];d.chain(Z,H,{group:te>0?6+(N?1:0):2,paint:r.socks?he=>he[1]<r.socks?l.BODY3:void 0:void 0});const fe=(r.paw==="hoof"?.07:.09)*r.legW**.5*(N?1:r.hindFoot||1);d.ell(P.add(B,[fe*.5,-.01,0]),[fe,_*.9,_*1.1],r.paw==="hoof"?l.NOSE:H,{group:te>0?6+(N?1:0):2}),d.anchors.feet.push({c:P.add(B,[fe*.5,-.01,0]),r:Math.max(fe,_*1.1),group:te>0?6+(N?1:0):2})};for(const N of[-1,1])E(!0,N),E(!1,N);const C=[u*.82,M-.12,0],T=[C[0]+Math.cos(r.neckAng)*r.neck*.9,C[1]+Math.sin(r.neckAng)*r.neck*.9+(h?.1:0),0];d.seg(C,T,r.neckW*.55,r.neckW*.42,l.BODY,{paint:N=>r.belly&&N[1]<(C[1]+T[1])/2-.05?l.BELLY:r.face==="dark"?l.BODY2:void 0});const R=N=>{if(r.face==="badger")return Math.abs(N[2])<f*.22+(N[0]-T[0])*.1||N[1]<T[1]-f*.1?l.BELLY:l.BODY3;if(r.face==="dark")return l.BODY2;if((r.belly||r.muzzle)&&N[1]<T[1]-f*.35)return l.BELLY};d.ell(T,[f*1.05,f*.92,f*.88],l.BODY,{paint:R});const O=f*r.snout*(h?.55:o?.78:1),I=f*r.snoutD*.55,k=[T[0]+f*.65+O*.5,T[1]-f*.28,0];d.ell(k,[O*.62+f*.2,I,I*.95],l.BODY,{dir:[1,-.25,0],paint:N=>(r.muzzle||r.belly)&&N[1]<k[1]-I*.1?l.BELLY:R(N)});const U=[k[0]+O*.62+f*.1,k[1]-.02,0];d.ell(U,[f*(r.disc?.1:.12),f*(r.disc?.2:.12),f*(r.disc?.2:.15)],l.NOSE,{group:1});for(const N of[-1,1]){const te=Qe.surface(T,[f*1.05,f*.92,f*.88],P.norm([.75,.32,N*.62]));d.ell(te,[f*.13,f*.16,f*.13].map(ae=>ae*(r.eyeK||1)*(h?1.5:o?1.2:1)),a&&!r.tusks?l.MAGIC2:l.EYE,{group:1})}d.anchors.head={c:T,r:[f*1.05,f*.92,f*.88],top:[T[0]-f*.1,T[1]+f*.82,0]},d.anchors.eyes={pts:[-1,1].map(N=>Qe.surface(T,[f*1.05,f*.92,f*.88],P.norm([.75,.32,N*.62]))),size:f*.16*(r.eyeK||1)*(h?1.5:o?1.2:1)},d.anchors.neck={c:P.lerp(C,T,h?.05:o?.25:.42),r:r.neckW*.5*(h?1.3:o?1.12:1),dir:P.norm(P.sub(T,C)),tag:h?1.8:o?1.3:1};for(const N of[-1,1]){const te=r.ear,ae=[T[0]-f*.15,T[1]+f*.7,N*f*.5],pe=r.earS*(h?1.2:1)*(r.ear==="long"?.62:1);if(te==="none")continue;if(te==="round"){d.ell(ae,[f*.22,f*.25*pe,f*.1],l.BODY,{group:1,paint:Z=>Z[0]>ae[0]+f*.02?l.EAR:void 0});continue}const be=te==="long",Pe=te==="small"?-.6:0,q=f*.55*pe*(te==="big"?1.35:be?2.2:1),ee=f*.3*(te==="big"?1.2:be?1.35:1),B=P.norm([Pe*.6-(be?.3:.12),1,N*.3]),ce=P.norm([.55,.2,N]),H=P.norm(P.cross(ce,B));d.flat(P.add(ae,P.mul(B,q)),H,B,ee,q,Fs.ear(l.BODY,l.EAR,l.BODY3),{group:5+(N>0?0:20),extra:be}),te==="tuft"&&d.seg(P.add(ae,[0,q*1.4,N*.02]),P.add(ae,[0,q*1.85,N*.04]),f*.05,f*.02,l.BODY3,{group:1})}const W=[-u*1.05,M-.1+A*.5,0],ne=t?.04:-.02;if(c("tails")||dp(d,c("starTail")?"star":r.tail,W,u,M,ne),r.horns)for(const N of[-1,1]){const te=o?.6:h?.35:c("hornsGlow")?1.4:1,ae=[];for(let pe=0;pe<=8;pe++){const be=.3-pe/8*Math.PI*1.6,Pe=f*.65*te*(1-.45*pe/8);ae.push([T[0]-f*.1+Math.cos(be)*Pe,T[1]+f*.45+Math.sin(be)*Pe,N*(f*.6+pe*.015)]),ae[pe].push(f*.2*te*(1-.6*pe/8))}d.chain(ae,c("hornsGlow")?l.MAGIC:l.ACCENT,{group:13})}if(r.antlers||c("jackalope"))for(const N of[-1,1])fp(d,r,[T[0]-f*.05,T[1]+f*.75,N*f*.4],N,e,c);if(r.tusks)for(const N of[-1,1]){const te=o?.4:h?0:c("tusksBig")?1.3:.75;if(!te)continue;const ae=[k[0]+O*.25,k[1]-I*.4,N*I*.8];d.chain([[...ae,.045*te],[...P.add(ae,[.1*te,.1*te,N*.03]),.04*te],[...P.add(ae,[.06*te,.24*te,N*.05]),.02*te]],l.ACCENT,{group:8})}r.teeth&&!h&&d.ell([U[0]-f*.1,U[1]-f*.25,0],[f*.08,f*.14,f*.12],l.ACCENT,{group:1});const K=N=>[-u*.9+N*u*1.65,M+w*Math.max(0,1-Math.abs(N-.8)*3)+A*(1-Math.abs(N-.4)*2),0];if(c("wings"))for(const N of[-1,1])Oo(d,[u*.2,M,N*v*.5],N,1.15,t?.1:0,N>0?l.MAGIC2:l.MAGIC,l.MAGIC,40+(N>0?10:0));if(c("mane")||c("flames"))for(let N=0;N<7;N++){const te=N/6,ae=P.lerp(P.add(T,[-f*.5,f*.3,0]),K(.55),te),pe=[.4,.3,.45,.28,.38,.25,.3][N],be=P.norm([-.35-(t?.1:0),1,0]);d.flat(P.add(ae,P.mul(be,pe*.5)),[1,0,0],be,pe*.32,pe*.55,Fs.flame(N%2?l.MAGIC:l.MAGIC2,l.MAGIC2),{group:60+N%2,extra:!0})}if(c("tails"))for(let N=0;N<7;N++){const te=Math.PI*(.55+N*.08),ae=(N-3)*.1,pe=P.add(W,[Math.cos(te)*.9,Math.sin(te)*.85,ae]);d.chain([[...W,.1],[...P.lerp(W,pe,.5),.17],[...pe,.08]],N%2?l.BODY2:l.BODY,{group:70,extra:!0}),d.ell(pe,[.09,.09,.09],l.MAGIC2,{group:71,extra:!0})}if(c("crystals")&&[.15,.3,.45,.6,.75].forEach((N,te)=>{const ae=K(N),pe=[.3,.5,.4,.6,.35][te];d.ell(P.add(ae,[0,pe*.45,(te%2-.5)*.1]),[pe*.55,.08,.08],l.MAGIC,{dir:[(te-2)*.12,1,0],group:80+te%2,extra:!0,paint:be=>be[2]>0?l.MAGIC2:void 0})}),c("moss")){for(let N=0;N<6;N++)d.ell(K(.08+N*.15),[u*.22,.07,v*.85],l.LEAF,{group:85,extra:!0});for(const[N,te]of[[.25,.55],[.5,.8],[.75,.45]]){const ae=K(N);d.seg(ae,P.add(ae,[0,te*.7,0]),.04,.025,l.TRUNK,{group:86,extra:!0}),d.ell(P.add(ae,[0,te*.8,0]),[te*.28,te*.26,te*.28],l.LEAF2,{group:87,extra:!0,paint:pe=>pe[1]<ae[1]+te*.72?l.LEAF3:void 0})}for(const N of[.12,.4,.65,.9]){const te=K(N);d.ell(P.add(te,[0,.12,v*.3]),[.07,.035,.07],l.MAGIC,{group:89,extra:!0})}}if(c("ribbons"))for(let N=0;N<3;N++){const te=[];for(let ae=0;ae<9;ae++){const pe=ae/8;te.push([u*(.5-pe*2.2),M+.05+N*.1+pe*(.25+N*.12)+Math.sin(pe*6+t+N)*.07,(N-1)*.18,.04*(1-pe*.6)])}d.chain(te,N%2?l.MAGIC2:l.MAGIC,{group:90+N,extra:!0})}eh(d);const{sp:re}=cn(d,{height:jc(e,i,r.hgt),facing:s});return a&&Qc(re,n.id.length*7919),re}function dp(n,e,t,i,s,r){const a={group:3},o=h=>-i*h;e==="brush"?n.chain([[...t,.1],[o(1.3),s-.25+r,0,.15],[o(1.4),s-.55,0,.14],[o(1.35),.38+r,0,.09]],l.BODY,{...a,paint:h=>h[1]<.32?l.BODY3:void 0}):e==="bushy"?n.chain([[...t,.1],[o(1.05)-.35,s-.05+r,0,.17],[o(1.05)-.75,s-.2+r,0,.18],[o(1.05)-1,s-.35+r,0,.1]],l.BODY,{...a,paint:h=>h[0]<o(1.05)-.82?l.BELLY:void 0}):e==="stub"||e==="deer"||e==="bob"?n.ell(P.add(t,[-.06,.02+r,0]),[.1,.08,.07],e==="deer"?l.BELLY:l.BODY,{...a,paint:e==="bob"?h=>h[0]<t[0]-.08?l.BODY3:void 0:void 0}):e==="puff"?n.ell(P.add(t,[-.04,.02,0]),[.11,.11,.1],l.BELLY,a):e==="squirrel"||e==="star"?n.chain([[...t,.12],[o(1.3),s+.05+r,0,.25],[o(1.3),s+.6+r,0,.3],[o(1),s+.95+r,0,.27],[o(.65),s+.9+r,0,.16]],e==="star"?l.MAGIC:l.BODY,{...a,extra:!0,paint:e==="star"?h=>mi(h,14,.12)?l.GLINT:void 0:void 0}):e==="otter"?n.chain([[...t,.17],[o(1.3),s-.45+r,0,.12],[o(1.6),.1,0,.07],[o(1.85),.06+r,0,.03]],l.BODY,a):e==="stoat"?n.chain([[...t,.08],[o(1.3),s-.12+r,0,.07],[o(1.6),s-.05+r,0,.06]],l.BODY,{...a,paint:h=>h[0]<o(1.45)?l.BODY3:void 0}):e==="flat"?(n.seg(t,[o(1.15),.3,0],.08,.07,l.BODY2,a),n.ell([o(1.4),.1+r*.5,0],[.28,.03,.14],l.BODY3,a)):e==="thin"&&(n.chain([[...t,.04],[o(1.1),s-.3,0,.03],[o(1.12)+r,s-.55,0,.025]],l.BODY,a),n.ell([o(1.12)+r,s-.62,0],[.04,.07,.04],l.BODY3,a))}function fp(n,e,t,i,s,r){const a=!e.antlers,o=a?.45:[0,.5,.95,.95][s]*(r("antlersGlow")?1.15:1),h=r("antlersGlow")?i>0?l.MAGIC2:l.MAGIC:l.ACCENT,c={group:11+(i>0?1:0),extra:!0};if(!o)return;const d=.045*Math.max(.8,o),f=i*.35*o;if(e.antlers==="palm"){const x=P.add(t,[-.06*o,.12*o,f*.3]);n.seg(t,x,d*1.3,d*1.2,h,c);for(let m=0;m<5;m++){const v=.35+m*.3,_=P.norm([-Math.cos(v),Math.sin(v)*.9,i*.55]),w=(.24+.05*(m%2))*o;n.ell(P.add(x,P.mul(_,w*.55)),[w*.6,d*1.5,d*.6],h,{...c,dir:_,up:[0,0,1]})}return}const u=P.add(t,[-.18*o,.3*o,f*.4]),p=P.add(t,[-.25*o,.62*o,f*.8]),g=P.add(t,[-.1*o,.95*o,f]);n.chain([[...t,d*1.2],[...u,d],[...p,d*.85],[...g,d*.4]],h,c);const M=(x,m,v,_)=>n.seg(x,P.add(x,P.mul(P.norm(m),v)),_,_*.35,h,c);M(P.add(t,[-.04*o,.1*o,f*.1]),[1,.6,0],.28*o,d*.8),(o>.4||a)&&M(u,[1,.9,0],.3*o,d*.7),o>.7&&(M(p,[.8,1,0],.28*o,d*.6),M(g,[.3,1,i*.2],.18*o,d*.5))}function pp(n,e,t,i,s="towards"){const r=e===3,a=e===1,o=e===0,h=g=>r&&n.legend.includes(g),c=new Qe,d=t?.03:0,f=o?.48:a?.42:.36,u=(o?.95:1.08)+d;for(const g of[-1,1]){const M=t&&g>0?.04:0;c.seg([.05,.2,g*.14],[.08,.05+M,g*.15],.07,.06,l.BODY2,{group:2});for(const x of[-.04,0,.04])c.ell([.16,.03+M,g*.15+x],[.06,.025,.02],l.ACCENT,{group:2});c.anchors.feet.push({c:[.13,.04+M,g*.15],r:.08,group:g>0?6:2})}if(c.ell([-.32,.32,0],[.22,.06,.14],l.BODY2,{dir:[-1,-.6,0],group:3}),c.ell([0,.55+d,0],[.36,.52,.36],l.BODY,{paint:g=>g[0]>.12&&g[1]<u-f*.5?Math.floor(g[1]*18)%3===0&&mi(g,16,.5)?l.BODY2:l.BELLY:void 0}),!h("wings"))for(const g of[-1,1])c.ell([-.06,.58+d,g*.3],[.4,.3,.08],l.BODY2,{dir:[-.3,-1,0],up:[1,0,0],group:g>0?4:2,paint:M=>mi(M,12,.15)?l.BODY3:void 0});c.ell([0,u,0],[f,f*.9,f],l.BODY);for(const g of[-1,1]){const M=P.norm([.75,-.05,g*.4+.35]),x=P.add(Qe.surface([0,u,0],[f,f*.9,f],M),P.mul(M,-f*.05));c.ell(x,[f*.22,f*.46,f*.4],l.BELLY,{group:1,dir:M});const m=P.add(x,P.mul(M,f*.14));c.ell(m,[f*.1,f*.26,f*.24].map(v=>v*(o?1.15:1)),r?l.MAGIC:l.IRIS,{group:1,dir:M}),c.ell(P.add(m,P.mul(M,f*.07)),[f*.08,f*.14,f*.13].map(v=>v*(o?1.15:1)),r?l.MAGIC2:l.EYE,{group:1,dir:M}),(c.anchors.eyes||={pts:[],size:f*.22}).pts.push(P.add(m,P.mul(M,f*.07))),o||c.ell([f*.05,u+f*.8,g*f*.6],[f*.32,f*.12,f*.08],l.BODY2,{dir:[-.1,1,g*.7],up:[1,0,0],group:1})}if(c.ell(Qe.surface([0,u,0],[f,f*.9,f],P.norm([.75,-.35,.35])),[f*.2,f*.12,f*.1],l.ACCENT,{dir:[.6,-1,.3],group:1}),h("wings"))for(const g of[-1,1])Oo(c,[-.05,.8+d,g*.3],g,1.3,t?.12:0,g>0?l.MAGIC2:l.MAGIC,l.MAGIC,40+(g>0?10:0));if(h("eyesRing"))for(let g=0;g<7;g++){const M=Math.PI*(.15+g/6*.7);c.ell([Math.cos(M)*.2-.1,u+.1+Math.sin(M)*.6,(g-3)*.15],[.07,.07,.07],l.MAGIC2,{group:95+g,extra:!0}),c.ell([Math.cos(M)*.2-.05,u+.1+Math.sin(M)*.6,(g-3)*.15],[.035,.035,.035],l.EYE,{group:95+g,extra:!0})}c.anchors.head={c:[0,u,0],r:[f,f*.9,f]},c.anchors.neck={c:[0,u-f*.75,0],r:f*.85,dir:[0,1,0]},eh(c);const{sp:p}=cn(c,{height:jc(e,i,.95),facing:s});return r&&Qc(p,31),p}const ps=(n,e,t,i,s,r,a=1)=>{for(const o of i)n.ell(Qe.surface(e,t,P.norm(o)),[s,s*1.2,s],r,{group:a});n.anchors.head||={c:e,r:t},n.anchors.eyes||={pts:i.map(o=>Qe.surface(e,t,P.norm(o))),size:s}},$d=(n,e,t)=>n.ell([e,.005,0],[t,.005,t*.6],l.NOSE,{group:0});function si(n,e,t,i,s,r){eh(n);const{sp:a}=cn(n,{height:jc(t,i,s),facing:r});return t===3&&Qc(a,e.id.length*131),a}const Zd=(n,e,t)=>{n.ell(e,[t,t*.35,t],l.MAGIC,{group:95,extra:!0,paint:i=>i[1]>e[1]?l.MAGIC2:void 0});for(let i=0;i<5;i++){const s=i/5*Math.PI*2;n.ell(P.add(e,[Math.cos(s)*t*.8,t*.55,Math.sin(s)*t*.8]),[t*.38,t*.12,t*.12],l.MAGIC,{dir:[0,1,0],up:[1,0,0],group:96,extra:!0})}},th=(n,e)=>e.forEach(([t,i],s)=>n.ell(P.add(t,[0,i*.45,0]),[i*.55,.07,.07],l.MAGIC,{dir:[(s%3-1)*.25,1,(s%2-.5)*.3],group:80+s%2,extra:!0,paint:r=>r[2]>t[2]?l.MAGIC2:void 0}));function mp(n,e,t,i,s="towards"){const r=e===3,a=new Qe,o=t?.03:0;for(const[f,u]of[[.28,.2],[.28,-.2],[-.28,.2],[-.28,-.2]])a.seg([f,.15,u],[f+(u>0?o:-o),.03,u],.06,.05,l.BODY3,{group:u>0?6:2}),a.anchors.feet.push({c:[f+.03+(u>0?o:-o),.03,u],r:.065,group:u>0?6:2});const h=[0,.32,0],c=[.5,.32,.38];a.ell(h,c,l.BODY2,{paint:f=>mi(f,22,.3)?l.BODY3:mi(f,19,.12)?l.BELLY:void 0});for(let f=0;f<46;f++){const u=f*2.399%(Math.PI*2),p=f/46*.9+.05,g=P.norm([Math.cos(u)*Math.sin(p*Math.PI*.5)-.25,Math.cos(p*Math.PI*.5)*.9+.1,Math.sin(u)*Math.sin(p*Math.PI*.5)]);g[0]>.55||a.ell(P.add(Qe.surface(h,c,g),P.mul(g,.02)),[.1,.025,.025],f%4?l.BODY2:l.BODY3,{dir:P.add(g,[-.4,0,0]),group:1})}const d=[.48,.22,0];return a.ell(d,[.22,.14,.15],l.BELLY,{dir:[1,-.3,0],group:1}),a.ell([.69,.16,0],[.04,.04,.04],l.NOSE,{group:1}),ps(a,d,[.22,.14,.15],[[.3,.6,.55],[.3,.6,-.55]],.035,r?l.MAGIC2:l.EYE),r&&th(a,[[[-.3,.55,.1],.35],[[-.05,.62,-.1],.5],[[.2,.55,.12],.4],[[-.15,.58,.2],.3]]),si(a,n,e,i,.6,s)}function gp(n,e,t,i,s="towards"){const r=e===3,a=new Qe,o=t?.05:0;for(const d of[-1,1])a.ell([-.22,.16,d*.36],[.24,.13,.12],d>0?l.BODY:l.BODY2,{dir:[1,.3,0],group:d>0?6:2,paint:f=>mi(f,14,.15)?l.BODY3:void 0}),a.ell([.05,.04,d*.4],[.16,.04,.08],d>0?l.BODY:l.BODY2,{group:d>0?6:2}),a.seg([.35,.2+o,d*.24],[.42,.03,d*.3],.05,.04,d>0?l.BODY:l.BODY2,{group:d>0?7:2}),a.anchors.feet.push({c:[.45,.03,d*.3],r:.06,group:d>0?7:2},{c:[.12,.04,d*.4],r:.08,group:d>0?6:2});const h=[0,.3+o,0],c=[.5,.28,.4];a.ell(h,c,l.BODY,{paint:d=>d[1]<h[1]-.12?l.BELLY:d[0]>.38&&Math.abs(d[1]-(h[1]-.02))<.018?l.LINE:mi(d,14,.22)?l.BODY3:void 0});for(const d of[-1,1]){const f=[.3,.55+o,d*.17];a.ell(f,[.1,.09,.1],l.BODY,{group:1}),a.ell(Qe.surface(f,[.1,.09,.1],P.norm([.6,.5,d*.5])),[.05,.05,.05],r?l.MAGIC2:l.IRIS,{group:1}),a.ell(Qe.surface(f,[.11,.1,.11],P.norm([.65,.45,d*.5])),[.03,.015,.03],l.EYE,{group:1})}return a.anchors.head={c:[.22,.45+o,0],r:[.3,.2,.3],top:[.18,.62+o,0]},a.anchors.eyes={pts:[-1,1].map(d=>Qe.surface([.3,.55+o,d*.17],[.1,.09,.1],P.norm([.6,.5,d*.5]))),size:.05},a.anchors.neck={c:[.32,.3+o,0],r:.25,dir:[1,.3,0]},r&&Zd(a,[.15,.66+o,0],.16),si(a,n,e,i,.55,s)}function xp(n,e,t,i,s="towards"){const r=e===3,a=e===1,o=u=>r&&n.legend.includes(u),h=new Qe,c=t?.02:0;for(const u of[-1,1]){const p=t&&u>0?.04:0;h.seg([0,.3,u*.08],[.03,.03+p,u*.08],.03,.025,l.NOSE,{group:u>0?7:2}),h.ell([.08,.02+p,u*.08],[.08,.015,.04],l.NOSE,{group:2}),h.anchors.feet.push({c:[.07,.03+p,u*.08],r:.06,group:u>0?7:2})}if(h.ell([-.55,.42,0],[.32,.035,.12],l.BODY2,{dir:[-1,-.25,0],group:3}),h.ell([0,.52+c,0],[.42,.26,.24],l.BODY,{dir:[1,.45,0]}),!o("wings"))for(const u of[-1,1])h.ell([-.1,.55+c,u*.2],[.45,.17,.05],l.BODY2,{dir:[-1,-.25,0],group:u>0?4:2});const d=[.36,.84+c,0],f=a?.19:.16;if(h.ell(d,[f*1.1,f,f*.95],l.BODY,{paint:u=>u[1]>d[1]+f*.55?l.BELLY:void 0}),h.ell(P.add(d,[f*1.5,-f*.25,0]),[f*1,f*.38,f*.3],l.NOSE,{dir:[1,-.2,0],group:1}),ps(h,d,[f*1.1,f,f*.95],[[.55,.35,.65],[.55,.35,-.65]],f*.16,r?l.MAGIC2:l.EYE),o("wings"))for(const u of[-1,1])Oo(h,[-.05,.65+c,u*.18],u,1.1,t?.1:0,u>0?l.MAGIC2:l.MAGIC,l.MAGIC,40+(u>0?10:0));if(o("eyesRing"))for(let u=0;u<6;u++){const p=Math.PI*(.2+u/5*.6);h.ell([Math.cos(p)*.25-.1,.95+Math.sin(p)*.45,(u-2.5)*.12],[.06,.06,.06],l.MAGIC2,{group:95+u,extra:!0})}return si(h,n,e,i,.75,s)}function Mp(n,e,t,i,s="towards"){const r=e===3,a=u=>r&&n.legend.includes(u),o=new Qe,h=t===0,c=.55,d=a("wingsBig")?1.5:1;$d(o,0,.3*d);for(const u of[-1,1]){const p=[0,c+.05,u*.1],g=[.05,c+(h?.35:-.05),u*.45*d],M=[[-.05,c+(h?.45:-.15),u*.85*d],[-.25,c+(h?.2:-.25),u*.75*d],[-.3,c+(h?0:-.25),u*.4*d]],x=a("wingsBig")?l.MAGIC:l.BODY2,m=a("wingsBig")?l.MAGIC2:l.BODY3;o.seg(p,g,.03,.025,m,{group:11});for(const y of M)o.seg(g,y,.02,.012,m,{group:11});const v=P.sub(M[0],p),_=P.norm(v),w=P.norm(P.sub(M[2],g)),A=P.norm(P.sub(w,P.mul(_,P.dot(w,_))));o.flat(P.add(P.lerp(p,M[0],.5),P.mul(A,.12*d)),_,A,Math.hypot(...v)*.55,.3*d,Fs.membrane(x),{group:10+(u>0?1:0),bend:.2})}o.ell([0,c,0],[.13,.16,.12],l.BODY,{group:1});const f=[.08,c+.2,0];o.ell(f,[.12,.11,.11],l.BODY,{group:1});for(const u of[-1,1])o.ell(P.add(f,[-.02,.15,u*.07]),[.12,.045,.02],l.BODY,{dir:[.1,1,u*.3],up:[1,0,0],group:1,paint:p=>p[0]>f[0]-.01?l.EAR:void 0});return ps(o,f,[.12,.11,.11],[[.7,.2,.5],[.7,.2,-.5]],.025,r?l.MAGIC2:l.EYE),o.ell(Qe.surface(f,[.12,.11,.11],[1,-.2,0]),[.025,.02,.03],l.NOSE,{group:1}),si(o,n,e,i,.55,s)}function vp(n,e,t,i,s="towards"){const r=e===3,a=new Qe,o=t?.03:0;a.seg([-.5,.18,0],[-.62,.12,0],.04,.02,l.SKIN,{group:3});for(const h of[-1,1])a.ell([-.3,.05,h*.2],[.07,.04,.05],l.SKIN,{group:h>0?6:2}),a.anchors.feet.push({c:[-.3,.05,h*.2],r:.07,group:h>0?6:2});a.ell([0,.3,0],[.52,.29,.33],l.BODY,{paint:h=>h[1]>.45?l.BODY2:void 0}),a.ell([.55,.24,0],[.2,.07,.07],l.SKIN,{dir:[1,-.15,0],group:1}),a.ell([.74,.21,0],[.04,.05,.06],l.NOSE,{group:1});for(const h of[-1,1]){const c=[.32,.1-(h>0?o:0),h*.34];a.ell(c,[.13,.035,.12],l.SKIN,{group:h>0?7:2,axes:[[1,0,0],[0,1,0],[0,0,1]]});for(let d=0;d<4;d++)a.ell(P.add(c,[.14,-.01,h*(d-1.5)*.05]),[.05,.015,.015],l.ACCENT,{group:h>0?7:2})}for(const h of[-1,1])a.ell(Qe.surface([0,.3,0],[.52,.29,.33],P.norm([.85,.3,h*.35])),[.015,.015,.015],r?l.MAGIC2:l.EYE,{group:1});return a.anchors.head={c:[.32,.34,0],r:[.25,.22,.25],top:[.3,.58,0]},a.anchors.eyes={pts:[-1,1].map(h=>Qe.surface([0,.3,0],[.52,.29,.33],P.norm([.85,.3,h*.35]))),size:.03},a.anchors.neck={c:[.36,.3,0],r:.27,dir:[1,.1,0]},r&&Zd(a,[.15,.62,0],.15),si(a,n,e,i,.55,s)}function bp(n,e,t,i,s="towards"){const r=e===3,a=f=>r&&n.legend.includes(f),o=new Qe;for(const f of[-1,1])for(let u=0;u<3;u++){const p=.25-u*.25,g=(u+(f>0?1:0)+t)%2?.06:-.06,M=[p,.22,f*.2];o.chain([[...M,.03],[p+g+(1-u)*.06,.32,f*.42,.025],[p+g*1.5+(1-u)*.15,.02,f*.55,.015]],f>0?l.BODY2:l.BODY3,{group:f>0?7:2})}o.ell([-.12,.34,0],[.46,.24,.32],l.BODY,{paint:f=>Math.abs(f[2])<.018&&f[1]>.4?l.LINE:f[1]>.5&&f[2]>.05&&f[2]<.17?l.BELLY:void 0}),o.ell([.38,.33,0],[.16,.16,.26],l.BODY,{group:1});const h=[.56,.3,0];o.ell(h,[.1,.1,.17],l.BODY2,{group:1});const c=[.3,.5,.7,.75][e]*(a("horn")?1.3:1),d=a("horn")?l.MAGIC:l.BODY3;for(const f of[-1,1]){const u=P.add(h,[.08,.02,f*.1]),p=P.add(u,[c*.7,c*.45,f*c*.15]),g=P.add(p,[c*.25,-c*.12,-f*c*.12]);o.chain([[...u,.045],[...p,.035],[...g,.015]],d,{group:8+(f>0?1:0)}),o.seg(P.lerp(u,p,.55),P.add(P.lerp(u,p,.55),[0,c*.22,0]),.02,.008,d,{group:8})}for(const f of[-1,1])o.chain([[...P.add(h,[.05,.06,f*.1]),.012],[h[0]+.1,.5,f*.22,.012],[h[0]+.2,.5,f*.26,.012]],l.BODY3,{group:9,extra:!0});return ps(o,h,[.1,.1,.17],[[.4,.3,.85],[.4,.3,-.85]],.032,r?l.MAGIC2:l.EYE,9),a("crystals")&&th(o,[[[-.35,.5,.1],.3],[[-.1,.55,-.08],.45],[[.1,.5,.1],.35]]),si(o,n,e,i,.5,s)}function yp(n,e,t,i,s="towards"){const r=e===3,a=new Qe,o=t?.04:0;a.ell([0,.07,0],[.6+o,.07,.17],l.SKIN,{group:1}),a.chain([[.45+o,.08,0,.1],[.6+o,.25,0,.09],[.68+o,.28,0,.08]],l.SKIN,{group:1});for(const d of[-1,1])a.seg([.7+o,.32,d*.04],[.78+o,.55,d*.1],.018,.014,l.SKIN,{group:5}),a.ell([.78+o,.57,d*.1],[.03,.03,.03],r?l.MAGIC2:l.EYE,{group:5});a.anchors.head={c:[.68+o,.3,0],r:[.09,.08,.09],top:[.66+o,.38,0]},a.anchors.eyes={pts:[-1,1].map(d=>[.78+o,.57,d*.1]),size:.03},a.anchors.neck={c:[.55+o,.17,0],r:.1,dir:[1,1.2,0]};const h=[-.12,.4,0],c=r?l.MAGIC:l.BODY;return a.ell(h,[.32,.32,.22],c,{group:3,paint:d=>{const f=Math.atan2(d[1]-h[1],d[0]-h[0]);return((Math.hypot(d[0]-h[0],d[1]-h[1])/.32-f/(Math.PI*2)*.3)%.3+.3)%.3<.06?r?l.MAGIC2:l.BODY3:void 0}}),si(a,n,e,i,.45,s)}function _p(n,e,t,i,s="towards"){const r=e===3,a=new Qe;for(const o of[-1,1])for(let h=0;h<7;h++){const c=-.45+h*.15,d=(h+t)%2?.03:-.03;a.seg([c,.1,o*.22],[c+d,.01,o*.33],.025,.015,l.BODY3,{group:o>0?7:2})}for(const o of[-1,1])a.chain([[.5,.15,o*.08,.02],[.7,.3,o*.2,.015],[.82,.22,o*.26,.012]],l.BODY3,{group:9,extra:!0});return a.ell([0,.18,0],[.58,.2,.3],l.BODY,{paint:o=>(Math.floor((o[0]+.6)*9)%2&&o[1]>.2?l.BODY2:void 0)||(Math.abs((o[0]+.6)*9%1)<.12?l.LINE:void 0)}),ps(a,[0,.18,0],[.58,.2,.3],[[.92,.3,.25],[.92,.3,-.25]],.02,r?l.MAGIC2:l.EYE),r&&th(a,[[[-.3,.32,.05],.3],[[0,.37,-.05],.45],[[.25,.32,.05],.32]]),si(a,n,e,i,.4,s)}function wp(n,e,t,i,s="towards"){const r=e===3,a=e===1,o=p=>r&&n.legend.includes(p),h=new Qe,c=t?.7:0,d=[];for(let p=0;p<=12;p++){const g=p/12;d.push([-.9+g*1.2,.07,Math.sin(g*Math.PI*2+c)*.25*(1-g*.5),.03+.045*Math.sin(Math.min(1,g*1.4)*Math.PI/2)])}d.push([.38,.25,d[12][2],.07],[.42,.45,d[12][2]*.8,.065]),h.chain(d,l.BODY,{paint:p=>p[1]<.05&&p[0]<.35?l.BELLY:mi([p[0]*1.5,p[1],p[2]],14,.3)?l.BODY3:void 0});const f=[.5,.5,d[13][2]*.8],u=a?.11:.09;if(h.ell(f,[u*1.5,u*.75,u],l.BODY,{dir:[1,-.15,0],group:1}),ps(h,f,[u*1.5,u*.75,u],[[.5,.5,.7],[.5,.5,-.7]],u*.22,r?l.MAGIC2:l.EYE),t||h.seg(P.add(f,[u*1.4,-u*.2,0]),P.add(f,[u*2.3,-u*.3,0]),.01,.008,l.SKIN,{group:1}),h.anchors.feet.push({c:P.add(d[0].slice(0,3),[-.02,-.01,0]),r:.06,group:3,tail:!0}),h.anchors.neck={c:[.42,.36,d[12][2]*.9],r:.075,dir:[.2,1,0]},o("wings"))for(const p of[-1,1])Oo(h,[0,.2,p*.05],p,.9,t?.1:0,p>0?l.MAGIC2:l.MAGIC,l.MAGIC,40+(p>0?10:0));return si(h,n,e,i,.45,s)}function Sp(n,e,t,i,s="towards"){const r=e===3,a=u=>r&&n.legend.includes(u),o=new Qe,h=t===0,c=.55,d=a("wingsBig")?1.45:1,f=a("wingsBig")?l.MAGIC:l.BODY;$d(o,0,.3*d);for(const u of[-1,1]){const p=h?.5:-.1,g=P.norm([.35,p,u]),M=P.norm([-.3,p*.6,u]);o.flat(P.add([0,c,u*.05],P.mul(g,.38*d)),g,P.norm(P.cross(g,[0,1,0])),.4*d,.24*d,Fs.spotted(f,l.BELLY,l.BODY3),{group:10+(u>0?1:0)}),o.flat(P.add([-.05,c,u*.05],P.mul(M,.26*d)),M,P.norm(P.cross(M,[0,1,0])),.27*d,.17*d,Fs.spotted(a("wingsBig")?l.MAGIC2:l.BODY2,l.BODY2,l.BODY2),{group:12+(u>0?1:0)}),o.chain([[.12,c+.08,u*.03,.015],[.2,c+.25,u*.1,.025],[.24,c+.32,u*.14,.012]],l.BODY2,{group:11})}return o.ell([0,c,0],[.22,.09,.09],l.BELLY,{group:1,paint:u=>mi(u,30,.25)?l.BODY2:void 0}),o.ell([.17,c+.03,0],[.07,.07,.07],l.BELLY,{group:1}),ps(o,[.17,c+.03,0],[.07,.07,.07],[[.7,.3,.6],[.7,.3,-.6]],.02,r?l.MAGIC2:l.EYE),si(o,n,e,i,.5,s)}function Ep(n,e,t,i,s="towards"){const r=e===3,a=c=>r&&n.legend.includes(c),o=new Qe,h=t?.05:0;for(let c=0;c<9;c++){const d=c/8,f=-.6+d*1.15;o.ell([f,.12+Math.sin(d*Math.PI)*(.06+h),0],[.08,.1-d*.02,.12-d*.03],c<2?l.MAGIC2:c%2?l.BODY2:l.BODY,{group:1})}a("lantern")&&o.ell([-.75,.3,0],[.22,.22,.22],l.MAGIC2,{group:3,paint:c=>c[1]<.2?l.MAGIC:void 0});for(let c=0;c<6;c++)o.seg([-.2+c*.12,.05,.08],[-.2+c*.12+(c%2?.02:-.02)*(t?-1:1),0,.12],.015,.01,l.BODY3,{group:7});return o.ell([.6,.14,0],[.06,.06,.08],l.BODY3,{group:1}),ps(o,[.6,.14,0],[.06,.06,.08],[[.6,.3,.7],[.6,.3,-.7]],.015,r?l.MAGIC2:l.EYE),si(o,n,e,i,.4,s)}function Ap(n,e,t,i,s="towards"){const r=e===3,a=d=>r&&n.legend.includes(d),o=new Qe,h=[.15,.28,0];for(const d of[-1,1])for(let f=0;f<4;f++){const u=-.6+f*.4,p=(f+(d>0?0:1)+t)%2?.05:-.05,g=P.add(h,[.05-f*.04,0,d*.1]),M=P.add(g,[Math.cos(u)*.3*(f<2?1:-.6)+p,.3,d*.3]),x=P.add(g,[Math.cos(u)*.55*(f<2?1:-.8)+p*1.5,-.28,d*.55]);o.chain([[...g,.03],[...M,.028],[...x,.015]],d>0?l.BODY2:l.BODY3,{group:d>0?7:2})}o.ell([-.28,.38,0],[.34,.28,.3],l.BODY,{paint:d=>(Math.abs(d[2])<.03||Math.abs(d[0]+.28)<.03)&&d[1]>.45?l.BELLY:void 0}),o.ell(h,[.18,.13,.17],l.BODY2,{group:1}),o.anchors.head={c:h,r:[.18,.13,.17]},o.anchors.eyes={pts:[[.05,.05],[.05,-.05]].map(([d,f])=>Qe.surface(h,[.18,.13,.17],P.norm([.9,d*6,f*4]))),size:.03},o.anchors.neck={c:[-.02,.32,0],r:.15,dir:[1,0,0]};const c=a("eyesRing");for(const[d,f]of[[.05,.05],[.05,-.05],[.02,.1],[.02,-.1]])o.ell(Qe.surface(h,[.18,.13,.17],P.norm([.9,d*6,f*4])),[.025,.025,.025],c?l.MAGIC2:l.EYE,{group:1});if(c)for(let d=0;d<5;d++){const f=Math.PI*(.2+d/4*.6);o.ell([-.3+Math.cos(f)*.2,.75+Math.sin(f)*.35,(d-2)*.12],[.06,.06,.06],l.MAGIC2,{group:95+d,extra:!0})}return si(o,n,e,i,.5,s)}const Tp=new Map(Object.entries({owl:pp,hedgehog:mp,toad:gp,raven:xp,bat:Mp,mole:vp,beetle:bp,snail:yp,woodlouse:_p,snake:wp,moth:Sp,glowworm:Ep,spider:Ap})),nh=[{id:"wolf",name:"Wolf",plan:"quad",hue:.08,sat:.24,val:.56,legend:["wings","mane"],q:{len:.64,chest:.42,tuck:.6,neck:.32,neckAng:.7,neckW:.42,hr:.26,snout:.82,snoutD:.7,ear:"point",earS:.82,tail:"brush",paw:"paw",legW:1.25,saddle:!0,belly:!0},tail:"up"},{id:"fox",name:"Fox",plan:"quad",q:{hgt:.8,len:.62,chest:.4,tuck:.5,neck:.3,neckAng:.7,neckW:.32,hr:.24,snout:1.05,snoutD:.5,snoutTaper:.6,ear:"point",earS:1.35,tail:"bushy",paw:"paw",legW:.9,belly:!0,socks:.3},hue:.06,sat:.8,val:.9,belly:"white",legend:["tails"]},{id:"badger",name:"Badger",plan:"quad",q:{hgt:.62,len:.78,chest:.2,tuck:.22,neck:.18,neckAng:.1,neckW:.5,hr:.26,snout:1,snoutD:.55,snoutTaper:.55,ear:"round",earS:.7,tail:"stub",paw:"paw",legW:1.35,legMat:l.BODY3,face:"badger",shaggy:!0},hue:.65,sat:.08,val:.45,legend:["crystals"]},{id:"boar",name:"Boar",plan:"quad",hue:.07,sat:.62,val:.5,legend:["tusksBig"],q:{len:.72,chest:.34,tuck:.42,neck:.2,neckAng:-.15,neckW:.55,hr:.27,snout:1.25,snoutD:.62,snoutTaper:.55,ear:"small",earS:.8,tail:"thin",paw:"hoof",legW:1.15,ridge:!0,tusks:!0,back:"hump",disc:!0},ridge:!0},{id:"stag",name:"Stag",plan:"quad",q:{hgt:1.3,len:.6,chest:.6,tuck:.7,neck:.55,neckAng:.95,neckW:.32,hr:.2,snout:1.15,snoutD:.6,snoutTaper:.65,ear:"point",earS:1.1,tail:"deer",paw:"hoof",legW:.75,antlers:"branch",rump:!0,spots:"young",belly:!0},hue:.08,sat:.5,val:.7,legend:["antlersGlow"]},{id:"hare",name:"Hare",plan:"quad",q:{hgt:.72,len:.5,chest:.4,tuck:.45,neck:.2,neckAng:.9,neckW:.35,hr:.27,snout:.65,snoutD:.7,ear:"long",earS:2.4,tail:"puff",paw:"paw",legW:.85,haunch:1.35,hindFoot:1.6,back:"arch",belly:!0,whiskers:!0},hue:.08,sat:.4,val:.72,legend:["jackalope"]},{id:"owl",name:"Owl",plan:"owl",hue:.08,sat:.5,val:.55,legend:["eyesRing","wings"]},{id:"bear",name:"Bear",plan:"quad",q:{hgt:1.15,len:.72,chest:.38,tuck:.4,neck:.25,neckAng:.3,neckW:.55,hr:.28,snout:.7,snoutD:.62,snoutTaper:.7,ear:"round",earS:.8,tail:"stub",paw:"paw",legW:1.55,back:"hump",muzzle:!0,shaggy:!0},hue:.07,sat:.55,val:.42,legend:["moss"]},{id:"hedgehog",name:"Hedgehog",plan:"hedgehog",hue:.08,sat:.4,val:.5,legend:["crystals"]},{id:"squirrel",name:"Squirrel",plan:"quad",q:{hgt:.55,len:.45,chest:.35,tuck:.4,neck:.2,neckAng:.9,neckW:.35,hr:.3,snout:.55,snoutD:.65,ear:"tuft",earS:1.1,tail:"squirrel",paw:"paw",legW:.8,haunch:1.3,back:"arch",belly:!0,whiskers:!0},hue:.03,sat:.75,val:.75,belly:"white",legend:["starTail"]},{id:"toad",name:"Toad",plan:"toad",hue:.2,sat:.5,val:.55,legend:["crown"]},{id:"otter",name:"Otter",plan:"quad",q:{hgt:.55,len:1,chest:.25,tuck:.25,neck:.3,neckAng:.35,neckW:.5,hr:.27,snout:.6,snoutD:.7,ear:"round",earS:.5,tail:"otter",paw:"paw",legW:1.1,muzzle:!0,belly:!0,whiskers:!0},hue:.07,sat:.55,val:.45,belly:"white",legend:["ribbons"]},{id:"lynx",name:"Lynx",plan:"quad",q:{hgt:.9,len:.55,chest:.5,tuck:.55,neck:.25,neckAng:.8,neckW:.4,hr:.27,snout:.5,snoutD:.75,snoutTaper:.8,ear:"tuft",earS:1,tail:"bob",paw:"paw",legW:1.2,cheeks:!0,spots:!0,belly:!0,whiskers:!0},hue:.09,sat:.45,val:.75,legend:["mane"]},{id:"elk",name:"Elk",plan:"quad",q:{hgt:1.4,len:.68,chest:.6,tuck:.66,neck:.45,neckAng:.75,neckW:.42,hr:.24,snout:1.6,snoutD:.9,snoutTaper:.85,ear:"point",earS:.9,tail:"stub",paw:"hoof",legW:.9,back:"hump",antlers:"palm",shaggy:!0},hue:.07,sat:.55,val:.38,legend:["antlersGlow","moss"]},{id:"raven",name:"Raven",plan:"raven",hue:.68,sat:.35,val:.3,legend:["wings","eyesRing"]},{id:"bat",name:"Bat",plan:"bat",hue:.78,sat:.25,val:.45,legend:["wingsBig"]},{id:"mole",name:"Mole",plan:"mole",hue:.7,sat:.15,val:.32,legend:["crown"]},{id:"beaver",name:"Beaver",plan:"quad",q:{hgt:.6,len:.65,chest:.2,tuck:.22,neck:.2,neckAng:.4,neckW:.55,hr:.28,snout:.6,snoutD:.75,ear:"round",earS:.45,tail:"flat",paw:"paw",legW:1.2,back:"arch",teeth:!0,whiskers:!0},hue:.06,sat:.6,val:.45,legend:["moss"]},{id:"stoat",name:"Stoat",plan:"quad",q:{hgt:.5,len:1,chest:.3,tuck:.33,neck:.35,neckAng:.6,neckW:.32,hr:.25,snout:.6,snoutD:.6,ear:"round",earS:.6,tail:"stoat",paw:"paw",legW:.8,belly:!0,back:"arch",whiskers:!0},hue:.1,sat:.25,val:.92,legend:["ribbons","mane"]},{id:"snail",name:"Snail",plan:"snail",hue:.08,sat:.45,val:.55,legend:["glowShell"]},{id:"ram",name:"Ram",plan:"quad",q:{hgt:.95,len:.6,chest:.48,tuck:.52,neck:.22,neckAng:.45,neckW:.48,hr:.25,snout:.85,snoutD:.75,snoutTaper:.8,ear:"small",earS:.7,tail:"stub",paw:"hoof",legW:.9,wool:!0,horns:"curl",face:"dark"},hue:.1,sat:.12,val:.88,legend:["hornsGlow"]},{id:"woodlouse",name:"Woodlouse",plan:"woodlouse",hue:.65,sat:.12,val:.45,legend:["crystals"]},{id:"snake",name:"Snake",plan:"snake",hue:.25,sat:.45,val:.45,legend:["wings"]},{id:"moth",name:"Moth",plan:"moth",hue:.1,sat:.3,val:.7,legend:["wingsBig"]},{id:"marten",name:"Pine marten",plan:"quad",q:{hgt:.55,len:.78,chest:.35,tuck:.38,neck:.3,neckAng:.55,neckW:.35,hr:.25,snout:.65,snoutD:.6,ear:"round",earS:.9,tail:"bushy",paw:"paw",legW:.85,belly:!0,back:"arch"},hue:.07,sat:.6,val:.45,legend:["mane"]},{id:"salamander",name:"Salamander",plan:"quad",q:{hgt:.42,len:.9,chest:.14,tuck:.14,neck:.12,neckAng:.05,neckW:.5,hr:.27,snout:.55,snoutD:.55,ear:"none",tail:"otter",paw:"paw",legW:1,spots:!0,spotMat:"belly"},hue:.1,sat:.1,val:.22,belly:"yellow",legend:["flames"]},{id:"glowworm",name:"Glow-worm",plan:"glowworm",hue:.12,sat:.4,val:.35,legend:["lantern"]},{id:"spider",name:"Spider",plan:"spider",hue:.07,sat:.45,val:.4,legend:["eyesRing"]},{id:"dormouse",name:"Dormouse",plan:"quad",q:{hgt:.38,len:.45,chest:.35,tuck:.38,neck:.15,neckAng:.6,neckW:.4,hr:.34,snout:.45,snoutD:.7,ear:"round",earS:.85,tail:"squirrel",paw:"paw",legW:.8,back:"arch",belly:!0,whiskers:!0,eyeK:1.6},hue:.09,sat:.6,val:.75,belly:"white",legend:["starTail"]},{id:"beetle",name:"Stag beetle",plan:"beetle",hue:.78,sat:.5,val:.35,legend:["horn","crystals"]}],Jd=Object.fromEntries(nh.map(n=>[n.id,n])),Jl=[[[255,70,170],[255,245,250],[255,230,70]],[[40,220,255],[255,236,60],[255,80,180]],[[150,80,255],[175,255,60],[255,255,255]]],Ql={sneakers:[[255,70,90],[250,250,245]],glitter:[[215,215,235],[190,190,210]],platform:[[160,60,230],[40,30,52]]},Rp=["bar","star","heart"];function Cp(n,e=!0){const t=ha((n|0)*7919+17),i=t()<.12;return{collar:e,hat:i||t()<.45?Math.floor(t()*Jl.length):null,glasses:i||t()<.4?Rp[t()<.6?0:t()<.5?1:2]:null,shoes:i||t()<.4?Object.keys(Ql)[Math.floor(t()*3)]:null}}function Lp(n,e,t=null){const i=Pp(n,e);if(!t)return i;if(t.collar&&(i[l.COLLAR]=Array.isArray(t.collar)?t.collar:i[l.MAGIC]),t.hat!=null){const[s,r,a]=Jl[t.hat%Jl.length];i[l.HAT1]=s,i[l.HAT2]=r,i[l.POM]=a}if(t.glasses&&(i[l.SHADES]=[22,18,32],i[l.FRAME]=t.glasses==="heart"?[255,60,110]:[255,90,210]),t.shoes){const[s,r]=Ql[t.shoes]||Ql.sneakers;i[l.SHOE]=s,i[l.SOLE]=r}if(t.woken){i[l.WOKEN]=[255,40,36];for(const s of[l.BODY,l.BODY2,l.BODY3,l.BELLY,l.ACCENT,l.EAR])i[s]&&(i[s]=i[s].map((r,a)=>Math.round(r*.72+[30,8,12][a]*.1)))}return i}function Pp(n,e){const t=Jd[n],i=e.cVal/.85,s=e.cSat/.6,r=me(t.hue,t.sat*s*e.sat,t.val*i),a=t.belly==="yellow"?[240,196,40]:t.belly==="white"||t.q?.face==="badger"?[236,232,222]:me(t.hue+.03,t.sat*.5*s,Math.min(1,t.val*i*1.3+.08)),o=me(e.magicHue+t.hue*.3,.6,1),h=me(e.magicHue+t.hue*.3,.18,1),c=["boar","stag","elk","ram"].includes(t.id);return{[l.BODY]:r,[l.BODY2]:me(t.hue+.02,Math.min(1,t.sat*s*1.2+.05),t.val*i*.66),[l.BODY3]:me(t.hue+.03,Math.min(1,t.sat*s*1.3+.1),t.val*i*.4),[l.BELLY]:a,[l.ACCENT]:c?[236,226,200]:me(t.hue+.05,t.sat*.6,Math.min(1,t.val*i*.5+.25)),[l.MAGIC]:o,[l.MAGIC2]:h,[l.LEAF]:me(.3,.55,.55),[l.LEAF2]:me(.25,.5,.75),[l.LEAF3]:me(.33,.6,.35),[l.TRUNK]:me(.07,.45,.32),[l.EYE]:[24,18,30],[l.PUPIL]:[70,40,90],[l.GLINT]:[255,255,245],[l.NOSE]:[38,28,36],[l.EAR]:me(t.hue+.97,Math.min(1,t.sat*.6+.2),Math.min(1,t.val*i*.55+.2)),[l.IRIS]:t.plan==="owl"?[255,176,40]:me(.12,.7,.85),[l.SKIN]:[238,158,192]}}const Dp=["size","growth","pixel","head","eye","legs","long","fur"],Ur=new Map;function Ip(n,e,t,i,s="towards",r=null){const a=Jd[n]||nh[0],o=r&&(r.collar||r.hat!=null||r.glasses||r.shoes||r.woken)?r:null,h=[a.id,e,t,s,...Dp.map(d=>i[d]),o?[!!o.collar,o.hat??"",o.glasses||"",o.shoes||"",!!o.woken].join(","):""].join("|");let c=Ur.get(h);if(!c){if(c=lp(o,()=>a.q?up(a,e,t,i,s):Tp.get(a.plan)(a,e,t,i,s)),o?.woken)for(let d=0;d<c.m.length;d++)(c.m[d]===l.EYE||c.m[d]===l.IRIS||c.m[d]===l.PUPIL)&&(c.m[d]=l.WOKEN);Ur.size>600&&Ur.delete(Ur.keys().next().value),Ur.set(h,c)}return c}const ua=.07,ih=.048,st=(...n)=>({l:n}),Ft=(n,e,t,i,s)=>({a:[n,e,t,i,s]}),Mn=(n,e)=>({d:[n,e]}),Tt=(n,e=.86)=>st([.5,e],[.5,n]),Rt=Ft(.5,.76,.13,25,155),Op=n=>n.l?{l:n.l.map(([e,t])=>[1-e,t])}:n.a?{a:[1-n.a[0],n.a[1],n.a[2],180-n.a[3],180-n.a[4]]}:{d:[1-n.d[0],n.d[1]]},Ct=(...n)=>n.flatMap(e=>[e,Op(e)]);function ki(n,e,t){const i=e[0]-n[0],s=e[1]-n[1],r=Math.hypot(i,s),a=t*r,o=(r*r/4+a*a)/(2*Math.abs(a)),h=(n[0]+e[0])/2,c=(n[1]+e[1])/2,d=s/r,f=-i/r,u=(o-Math.abs(a))*Math.sign(a),p=h-d*u,g=c-f*u,M=Math.atan2(n[1]-g,n[0]-p)*180/Math.PI;let m=Math.atan2(e[1]-g,e[0]-p)*180/Math.PI-M;for(;m>180;)m-=360;for(;m<-180;)m+=360;return Ft(p,g,o,M,M+m)}const Np=(n,e,t,i,s,r=24)=>st(...Array.from({length:r+1},(a,o)=>[n+i*Math.sin(o/r*s*2*Math.PI),e+(t-e)*o/r])),Fp=(n,e,t,i,s,r=0,a=40)=>st(...Array.from({length:a+1},(o,h)=>{const c=h/a,d=(r+c*s*360)*Math.PI/180,f=t+(i-t)*c;return[n+f*Math.cos(d),e+f*Math.sin(d)]})),va=(n,e,t,i,s)=>s.map(r=>{const a=Math.cos(r*Math.PI/180),o=Math.sin(r*Math.PI/180);return st([n+t*a,e+t*o],[n+i*a,e+i*o])}),kp={wolf:[Tt(.3),st([.28,.08],[.5,.3],[.72,.08]),Ft(.5,.55,.2,-55,55),Rt,Mn(.5+.2*Math.cos(-55*Math.PI/180),.55+.2*Math.sin(-55*Math.PI/180))],fox:[Tt(.34),st([.36,.06],[.5,.34],[.64,.06]),Ft(.67,.66,.17,180,-80),Mn(.67+.17*Math.cos(-80*Math.PI/180),.66+.17*Math.sin(-80*Math.PI/180)),Rt],badger:[Tt(.1),st([.24,.3],[.76,.3]),...Ct(st([.33,.14],[.33,.56])),Rt,...Ct(Mn(.24,.3))],boar:[Tt(.16),...Ct(Ft(.36,.24,.15,45,180)),...va(.5,.16,0,.1,[-130,-90,-50]),Rt],stag:[Tt(.42),...Ct(st([.5,.42],[.34,.26],[.3,.06]),st([.335,.25],[.16,.2]),st([.32,.15],[.18,.07])),Rt],hare:[Tt(.44),...Ct(st([.5,.44],[.4,.34],[.38,.06])),Ft(.62,.66,.09,180,540),Rt,...Ct(Mn(.38,.06))],owl:[Tt(.44),...Ct(Ft(.33,.3,.13,0,360),st([.24,.18],[.18,.05])),Rt,...Ct(Mn(.33,.3))],bear:[Tt(.24),st([.24,.3],[.76,.3]),...Ct(Ft(.3,.3,.09,180,360)),...Ct(st([.36,.5],[.32,.62])),Rt],hedgehog:[Tt(.52),Ft(.5,.52,.2,180,360),...va(.5,.52,.22,.34,[-160,-125,-90,-55,-20]),Rt],squirrel:[Tt(.2),st([.5,.2],[.4,.08]),Ft(.66,.4,.16,100,-200),Mn(.66+.16*Math.cos(-200*Math.PI/180),.4+.16*Math.sin(-200*Math.PI/180)),Rt],toad:[Tt(.42),st([.16,.54],[.24,.42],[.76,.42],[.84,.54]),...Ct(Ft(.34,.3,.1,0,360)),Rt,...Ct(Mn(.16,.54))],otter:[Tt(.24),Ft(.5,.5,.28,-100,100),Mn(.5+.28*Math.cos(-100*Math.PI/180),.5+.28*Math.sin(-100*Math.PI/180)),ki([.18,.64],[.36,.64],.3),Rt],lynx:[Tt(.32),st([.26,.2],[.5,.32],[.74,.2]),...Ct(st([.26,.2],[.26,.06])),st([.5,.68],[.66,.62]),Rt,...Ct(Mn(.26,.06))],elk:[Tt(.3),...Ct(st([.5,.3],[.42,.2]),Ft(.3,.16,.12,0,180),st([.18,.16],[.14,.06])),st([.5,.44],[.6,.52]),Rt],raven:[Tt(.14),st([.5,.14],[.3,.22]),st([.18,.56],[.5,.38],[.82,.56]),Rt,Mn(.58,.17),...Ct(Mn(.18,.56))],bat:[Tt(.3),Ft(.5,.16,.14,20,160),...Ct(st([.5,.38],[.12,.26]),ki([.12,.26],[.24,.46],-.25),ki([.24,.46],[.38,.5],-.3),ki([.38,.5],[.5,.52],-.3)),Rt],mole:[Tt(.44),Ft(.5,.3,.16,0,180),...va(.5,.3,.19,.3,[-160,-125,-55,-20]),st([.5,.14],[.5,.04]),Rt],beaver:[Tt(.36),st([.32,.2],[.68,.2]),...Ct(st([.44,.2],[.44,.34])),st([.5,.56],[.68,.66],[.5,.76],[.32,.66],[.5,.56]),Rt],stoat:[Tt(.18),Ft(.5,.44,.24,180,360),st([.5,.18],[.6,.08]),Rt,...Ct(Mn(.26,.44))],snail:[Tt(.52),Fp(.5,.33,.03,.2,1.6,90),st([.66,.2],[.76,.06]),Rt,Mn(.76,.06)],ram:[Tt(.24),...Ct(Ft(.36,.24,.14,0,-250)),Rt,...Ct(Mn(.36+.14*Math.cos(-250*Math.PI/180),.24+.14*Math.sin(-250*Math.PI/180)))],woodlouse:[Tt(.24),Ft(.5,.52,.22,205,335),Ft(.5,.66,.24,205,335),Ft(.5,.38,.2,205,335),...Ct(st([.5,.24],[.32,.06])),Rt],snake:[Tt(.16),Np(.5,.82,.2,.2,1.25),st([.5,.2],[.5,.11]),...Ct(st([.5,.11],[.42,.045])),Rt],moth:[Tt(.2),...Ct(st([.5,.3],[.16,.18],[.24,.5],[.5,.4]),st([.5,.5],[.3,.64],[.5,.66]),Ft(.38,.16,.12,0,-110)),Rt],marten:[Tt(.32),st([.3,.2],[.5,.32],[.7,.2]),...Ct(Ft(.3,.14,.07,90,-180)),Ft(.28,.56,.22,0,150),Mn(.28+.22*Math.cos(150*Math.PI/180),.56+.22*Math.sin(150*Math.PI/180)),Rt],salamander:[Tt(.3),ki([.5,.3],[.5,.06],.35),ki([.5,.3],[.5,.06],-.35),...Ct(st([.5,.42],[.32,.38],[.26,.48]),st([.5,.64],[.32,.6],[.26,.7])),Rt,...Ct(Mn(.38,.52))],glowworm:[Tt(.4),Ft(.5,.27,.1,90,450),...va(.5,.27,.15,.25,[0,60,120,180,240,300]),Rt],spider:[st([.5,.05],[.5,.3]),Tt(.5),Ft(.5,.4,.11,-90,270),...Ct(...[-150,-170,170,150].map(n=>st([.5+.12*Math.cos(n*Math.PI/180),.4+.12*Math.sin(n*Math.PI/180)],[.5+.28*Math.cos(n*Math.PI/180),.4+.28*Math.sin(n*Math.PI/180)],[.5+.32*Math.cos(n*Math.PI/180),.4+.28*Math.sin(n*Math.PI/180)+.1]))),Rt,Mn(.5,.05)],dormouse:[Tt(.12),Ft(.5,.46,.24,-60,250),...Ct(Ft(.34,.16,.08,90,-180)),ki([.56,.38],[.7,.38],-.4),Rt],beetle:[Tt(.36),...Ct(Ft(.66,.26,.2,160,250)),ki([.5,.38],[.5,.82],.25),ki([.5,.38],[.5,.82],-.25),Rt]},jl={pink:[255,64,200],cyan:[50,235,255],acid:[175,255,45],violet:[165,95,255],orange:[255,135,35],lemon:[255,238,70],red:[255,55,95],mint:[70,255,175],blue:[70,145,255],magenta:[235,70,255]},No={badger:"pink",boar:"cyan",snail:"acid",fox:"violet",ram:"orange",woodlouse:"lemon",hedgehog:"red",squirrel:"mint",wolf:"blue",stag:"magenta",stoat:"pink",snake:"cyan",hare:"acid",owl:"violet",bear:"orange",toad:"lemon",otter:"red",lynx:"mint",elk:"blue",raven:"magenta",bat:"pink",mole:"cyan",beaver:"acid",beetle:"violet",moth:"orange",marten:"lemon",salamander:"red",glowworm:"mint",spider:"blue",dormouse:"magenta"},br=n=>jl[No[n]]||jl.cyan,Up=[255,255,250],Bp=(n,e,t)=>n.map((i,s)=>Math.round(i+(e[s]-i)*t)),nu=n=>`rgb(${n.join(",")})`;function zp(n=0){const e=Math.max(0,n);return{level:e,metres:2+e+Math.max(0,e-2)*.5,core:1+.2*e,halo:Math.min(1,.45+.19*e),rings:e>=4?3:e>=3?2:e>=2?1:0,dots:e>=1&&e<2?12:0,band:e>=3,rays:e>=4?8:e>=3?4:0,shimmer:e>=3}}function ja(n){if(n.d)return{dot:!0,pts:[n.d],len:ih*2};let e=n.l;if(n.a){const[i,s,r,a,o]=n.a,h=Math.max(6,Math.ceil(Math.abs(o-a)/8));e=Array.from({length:h+1},(c,d)=>{const f=(a+(o-a)*d/h)*Math.PI/180;return[i+r*Math.cos(f),s+r*Math.sin(f)]})}let t=0;for(let i=1;i<e.length;i++)t+=Math.hypot(e[i][0]-e[i-1][0],e[i][1]-e[i-1][1]);return{dot:!1,pts:e,len:t}}const ec=(n,e=0,t=1)=>{const i=n.reduce((r,a)=>r+a.len,0)||1;let s=0;for(const r of n)r.start=e+(t-e)*s/i,s+=r.len,r.end=e+(t-e)*s/i;return n},qo=new Map;function sh(n){return qo.has(n)||qo.set(n,ec((kp[n]||[]).map(e=>({...ja(e),w:ua,part:"sigil"})))),qo.get(n)}const $o=new Map;function Gp(n,e=0){const t=n+":"+e;if($o.has(t))return $o.get(t);const i=e===null?null:zp(e),s=i?i.rings>=2?.6:i.rings||i.dots?.66:.8:1,r=(1-s)/2,a=i?i.core:1,o=ua*.55*((i?.level??0)<3?1:Math.min(1.6,.8+.25*i.level)),h=[];if(i){const p=g=>ja({a:[.5,.5,g,90,450]});for(let g=0;g<i.rings;g++)h.push({...p(.44-g*.06),w:o,part:"ring"});for(let g=0;g<i.dots;g++){const M=(90+g*360/i.dots)*Math.PI/180;h.push({dot:!0,pts:[[.5+.44*Math.cos(M),.5+.44*Math.sin(M)]],len:.05,r:.042,w:o,part:"ring"})}if(i.band&&i.rings>=2)for(let g=0;g<16;g++){const M=(90+g*22.5)*Math.PI/180,x=.44-.06+.014,m=.44-.014;h.push({...ja({l:[[.5+x*Math.cos(M),.5+x*Math.sin(M)],[.5+m*Math.cos(M),.5+m*Math.sin(M)]]}),w:o*.8,part:"band"})}for(let g=0;g<i.rays;g++){const M=(90+g*360/i.rays)*Math.PI/180,x=.44+.02,m=.5-o/2;h.push({...ja({l:[[.5+x*Math.cos(M),.5+x*Math.sin(M)],[.5+m*Math.cos(M),.5+m*Math.sin(M)]]}),w:o*1.3,part:"ray"})}}const c=Math.min(1.25,a),d=sh(n).map(u=>({dot:u.dot,len:u.len*s,pts:u.pts.map(([p,g])=>[r+p*s,r+g*s]),w:u.w*s*c,r:ih*s*c,part:"sigil"})),f={level:e,frame:i,k:s,strokes:[...ec(h,0,h.length?.15:0),...ec(d,h.length?.15:0,1)]};return $o.set(t,f),f}function Hp(n,e){if(e>=n.end)return n.pts;if(e<=n.start)return null;if(n.dot)return n.pts;let t=(e-n.start)/(n.end-n.start)*n.len;const i=[n.pts[0]];for(let s=1;s<n.pts.length;s++){const r=n.pts[s-1],a=n.pts[s],o=Math.hypot(a[0]-r[0],a[1]-r[1]);if(t<=o){i.push([r[0]+(a[0]-r[0])*t/o,r[1]+(a[1]-r[1])*t/o]);break}i.push(a),t-=o}return i}function Wp(n,e,{x:t=0,y:i=0,size:s=64,level:r=null,colour:a=br(e),progress:o=1,glow:h=!0}={}){const c=Gp(e,r),d=c.frame?c.frame.halo:.7;n.save(),n.translate(t,i),n.scale(s,s),n.lineCap="round",n.lineJoin="round";const f=(u,p,g,M)=>{n.globalAlpha=g,n.strokeStyle=n.fillStyle=nu(u),n.shadowColor=nu(a),n.shadowBlur=M;for(const x of c.strokes){const m=Hp(x,o);if(m){if(n.beginPath(),x.dot){n.arc(m[0][0],m[0][1],x.r*(p>1?1.5:1),0,Math.PI*2),n.fill();continue}n.lineWidth=x.w*p,m.forEach((v,_)=>_?n.lineTo(v[0],v[1]):n.moveTo(v[0],v[1])),n.stroke()}}};h?(f(a,2.4,Math.min(d,.7)*.55,s/12),f(Bp(a,Up,.72),.62,1,s/30)):f(a,1,1,0),n.restore()}function Qd(n,e,t,i){let s=1/0;for(const r of n){if(r.start>=s)break;if(r.dot){Math.hypot(e-r.pts[0][0],t-r.pts[0][1])<ih+i-ua/2&&(s=r.start);continue}let a=0;for(let o=1;o<r.pts.length;o++){const h=r.pts[o-1],c=r.pts[o],d=c[0]-h[0],f=c[1]-h[1],u=d*d+f*f,p=Math.sqrt(u),g=u?Math.max(0,Math.min(1,((e-h[0])*d+(t-h[1])*f)/u)):0;if(Math.hypot(e-h[0]-d*g,t-h[1]-f*g)<i){const M=r.start+(a+g*p)/r.len*(r.end-r.start);M<s&&(s=M)}a+=p}}return s}function jd(n,e,t,i=ua/2){return Qd(sh(n),e,t,i)<1/0}function Vp(n,e=16,{progress:t=1}={}){const i=sh(n),s=new Uint8Array(e*e),r=Math.max(ua/2,.62/e);for(let a=0;a<e;a++)for(let o=0;o<e;o++)Qd(i,(o+.5)/e,(a+.5)/e,r)<=t&&(s[a*e+o]=1);return{w:e,h:e,m:s}}nh.map(n=>n.id);const Jr=new Set([l.TRUNK,l.BARK2,l.BARKD,l.BARKL,l.BELLY]);function Tn(n,e,t,i,s,r,{mat:a=l.LEAF,group:o=30,ragged:h=1}={}){const d=[];for(let m=0;m<9;m++){const v=m/9*Math.PI*2,_=1+(r()-.5)*.35*(s.clump+.3);d.push([e[0]+Math.cos(v)*t*_,e[1]+Math.sin(v)*i*_*(Math.sin(v)>0?.8:1)])}const f=Math.max(1,Math.round(Math.min(t,i)/3.5));n.shape(Do(d,0,9,f,Math.max(1.2,Math.min(t,i)*.14)*h,1),a,{group:o,line:!1,round:s.round}),n.mark([wt(e,[-t*1.1,i*.15]),wt(e,[t*1.1,i*.1]),wt(e,[t*1.1,i*1.2]),wt(e,[-t*1.1,i*1.2])],l.LEAF3,[a]),n.mark([wt(e,[-t*.75,-i*.55]),wt(e,[t*.25,-i*.95]),wt(e,[t*.55,-i*.35]),wt(e,[-t*.2,-i*.05])],l.LEAF2,[a]);const u=Math.floor(e[0]-t*1.2),p=Math.ceil(e[0]+t*1.2),g=Math.floor(e[1]-i*1.2),M=Math.ceil(e[1]+i*1.2),x=r()*1e4|0;for(let m=g;m<=M;m++)for(let v=u;v<=p;v++){const _=n.get(v,m);if(_!==a&&_!==l.LEAF2&&_!==l.LEAF3)continue;const w=je(v,m,x),A=Ri(v/2,m/2,x)*.5+w*.5;A<.16*s.density?n.recolour(v,m,_===l.LEAF2?a:l.LEAF2):A>1-.16*s.density&&n.recolour(v,m,_===l.LEAF3?a:l.LEAF3)}}function _n(n,e,t,i,s,r,a,o,{mat:h=l.TRUNK,bend:c=1,group:d=10,line:f=!1}={}){const u=[e],p=4;let g=t,M=e;for(let x=1;x<=p;x++)g+=(o()-.5)*.7*a.gnarl*c,M=wt(M,[Math.cos(g)*i/p,Math.sin(g)*i/p]),u.push(M);return n.limb(u.map((x,m)=>[...x,s+(r-s)*m/p]),h,{group:d,line:f,round:a.round,cap:.6,capEnd:1}),{end:M,ang:g,pts:u}}function qi(n,e,t,i,s,r,a){if(n.shape([[e-i*1.05,t],[e-i*.62,t-i*.5],[e-i*.45,t-i*1.4],[e+i*.45,t-i*1.4],[e+i*.62,t-i*.5],[e+i*1.05,t]],l.TRUNK,{group:10,round:s.round}),s.roots<=0)return;const o=Math.round(2+s.roots*4);for(let h=0;h<o;h++){const c=h%2?1:-1,d=(8+r()*16)*a*(.4+s.roots),f=(2+r()*3)*a,u=[e+c*i*.2,t-i*.5],p=[e+c*(i*.55+d*.4),t-f],g=[e+c*(i*.5+d),t-.5];n.limb([[...u,i*.55],[...p,i*.28],[...g,1.2]],l.TRUNK,{group:11,round:s.round,cap:.5,capEnd:.6})}}function ms(n,e,t=!0){if(!(e.bark<=0))for(let i=0;i<n.h;i++)for(let s=0;s<n.w;s++){const r=i*n.w+s;if(n.m[r]!==l.TRUNK)continue;const a=t?Ri(s/1.3,i/6,21):Ri(s/6,i/1.3,21);a>1-e.bark*.42||je(s,i,4)<e.bark*.05?n.m[r]=l.BARKD:a>1-e.bark*.62&&n.n[r*3]<-.1&&(n.m[r]=l.BARKL)}}function $n(n,e,t){let i=n.w,s=-1,r=n.h;for(let u=0;u<n.h;u++)for(let p=0;p<n.w;p++)n.m[u*n.w+p]&&(i=Math.min(i,p),s=Math.max(s,p),r=Math.min(r,u));if(s<0)return{sp:n,crownY:t};const a=Math.max(e-i,s-e)+2,o=Math.max(0,Math.floor(e-a)),h=Math.min(n.w-o,Math.ceil(a*2)+1),c=Math.max(0,r-1),d=n.h-c,f=new dt(h,d);for(let u=0;u<d;u++)for(let p=0;p<h;p++){const g=(u+c)*n.w+p+o,M=u*h+p;f.m[M]=n.m[g],f.g[M]=n.g[g],f.n[M*3]=n.n[g*3],f.n[M*3+1]=n.n[g*3+1],f.n[M*3+2]=n.n[g*3+2]}return{sp:f,crownY:t-c}}const xi=n=>(n.crownWidth||3)/3;function Yp(n,e,t){const i=xi(e),s=Math.round(220*t*i+60*t),r=Math.round(140*t),a=new dt(s,r),o=s/2,h=r,c=e.treeTrunks||1,d=12*t*(e.treeThick||1)*(e.treeThin?.55:1)/Math.sqrt(c),f=(n()-.5)*.5*e.gnarl+(e.treeLean||0),u=[];let p=r;const g=(M,x,m,v,_)=>{const w=_n(a,M,x,m,v,v*.65,e,n,{group:12});if(_===0){u.push(w.end);return}const A=n()<.35?3:2;for(let y=0;y<A;y++){const S=(y-(A-1)/2)*xe(n,.5,.85)*(_===3?1.4:1);g(w.end,w.ang+S+(n()-.5)*.25,m*xe(n,.6,.78),v*.62,_-1)}_<=2&&u.push(In(M,w.end,.7))};for(let M=0;M<c;M++){const x=f+(c>1?(M/(c-1)-.5)*.8:0),m=[o+(M-(c-1)/2)*d*.6,h],v=_n(a,m,-Math.PI/2+x,r*.36*(c>1?xe(n,.75,1.15):1),d,d*.72,e,n,{bend:1.4});p=Math.min(p,v.end[1]);for(const _ of[-1,1])g(v.end,-Math.PI/2+x*.5+_*xe(n,.55,.95)*(.7+.3*i)*(c>1?.6:1),r*.22*(.75+.25*i)*(c>1?.7:1),d*.7,c>2?2:3);if(c===1&&n()<.7&&g(v.end,-Math.PI/2+(n()-.5)*.3,r*.18,d*.55,2),M===0&&e.treeHollow){const _=In(m,v.end,.38);a.ellipse(_[0],_[1],d*.28,d*.5,l.NOSE,{round:.3})}}if(qi(a,o,h,d*Math.sqrt(c),e,n,t),ms(a,e),e.treeWebs)for(let M=0;M+1<u.length;M+=2){const x=u[M],m=u[M+1],v=Math.hypot(m[0]-x[0],m[1]-x[1]);if(v<40*t)for(let _=0;_<=v;_++){const w=In(x,m,_/v);a.px(w[0],w[1]+Math.sin(_/v*Math.PI)*v*.15,l.WEB,0,0,1)}}if(e.treeBare)return $n(a,o,p+4*t);u.sort((M,x)=>M[1]-x[1]);for(const M of u)Tn(a,wt(M,[0,-3*t]),xe(n,14,21)*t,xe(n,10,14)*t,e,n,{mat:n()<.35?l.LEAF3:l.LEAF});for(const M of u)n()<.75&&Tn(a,wt(M,[xe(n,-9,9)*t,xe(n,-12,-3)*t]),xe(n,10,15)*t,xe(n,7,10)*t,e,n);return $n(a,o,p+4*t)}function Xp(n,e,t){const i=.8+.2*xi(e),s=Math.round(90*t*i),r=Math.round(160*t),a=new dt(s,r),o=s/2,h=r;a.limb([[o,h,6*t],[o,h-r*.5,4*t],[o,6*t,1.5]],l.TRUNK,{group:10,round:e.round}),qi(a,o,h,6*t,e,n,t*.6),ms(a,e);const c=Math.round(xe(n,9,12));for(let d=c-1;d>=0;d--){const f=d/(c-1),u=6*t+f*r*.7,p=(5+f*36)*t*i*xe(n,.9,1.1),g=(5+f*13)*t,M=[[o,u-4*t],[o+p*.5,u+g*.3],[o+p,u+g],[o+p*.7,u+g*1.15],[o,u+g*.7],[o-p*.7,u+g*1.15],[o-p,u+g],[o-p*.5,u+g*.3]];a.shape(Do(M,1,7,Math.max(2,Math.round(p/(3*t))),2*t,1),l.LEAF,{group:30+d,line:!1,round:e.round}),a.mark([[o-p,u+g*.55],[o+p,u+g*.55],[o+p,u+g*1.4],[o-p,u+g*1.4]],l.LEAF3,[l.LEAF]),a.mark([[o-p*.55,u-2*t],[o+p*.1,u-3*t],[o+p*.1,u+g*.45],[o-p*.7,u+g*.7]],l.LEAF2,[l.LEAF])}return $n(a,o,r*.82)}function Kp(n,e,t){const i=xi(e),s=Math.round(200*t*i+50*t),r=Math.round(130*t),a=new dt(s,r),o=s/2,h=r,c=13*t,d=_n(a,[o,h],-Math.PI/2+(n()-.5)*.3,r*.3,c,c*.8,e,n,{bend:1.6}),f=[];for(let g=0;g<5;g++){const M=g%2?1:-1,x=-Math.PI/2+M*xe(n,.55,1.25)*(.7+.3*i),m=_n(a,d.end,x,r*xe(n,.3,.42)*(.8+.2*i),c*.55,c*.3,e,n,{group:12});f.push(m.end)}qi(a,o,h,c,e,n,t),ms(a,e);for(const g of f)Tn(a,wt(g,[0,-2*t]),xe(n,20,28)*t,xe(n,9,12)*t,e,n);Tn(a,wt(d.end,[0,-8*t]),24*t,11*t,e,n);let u=s,p=0;for(const g of f)u=Math.min(u,g[0]-22*t),p=Math.max(p,g[0]+22*t);for(let g=u;g<p;g+=xe(n,1,1.7)){let M=r;for(let _=0;_<r;_++)if(a.get(g,_)===l.LEAF||a.get(g,_)===l.LEAF2||a.get(g,_)===l.LEAF3){M=_;break}if(M>=r)continue;const x=Math.abs(g-o)/(s/2),m=(h-M)*xe(n,.5,.9)*(1-x*.3),v=je(g|0,1,9)<.4?l.LEAF2:l.LEAF;for(let _=M+2;_<Math.min(h-2,M+m);_++){const w=Math.round(Math.sin(_*.12+g)*.7);je(g|0,_,5)<.2+e.density*.8&&a.px(g+w,_,(_-M)/m>.8?l.LEAF3:v,w*.3,.2,.95)}}return $n(a,o,d.end[1]+6*t)}function ef(n,e,t){const i=.7+.3*xi(e),s=Math.round(110*t*i),r=Math.round(155*t),a=new dt(s,r),o=s/2,h=r,c=(n()-.5)*.25+(e.treeLean||0),d=_n(a,[o,h],-Math.PI/2+c,r*.85,5*t,2*t,e,n,{mat:l.BARK2,bend:.4});for(let u=0;u<d.pts.length-1;u++)for(let p=0;p<1;p+=1/8){const g=In(d.pts[u],d.pts[u+1],p+n()*.1);if(n()<.55)for(let M=-3;M<=3;M++)a.get(g[0]+M,g[1])===l.BARK2&&n()<.8&&a.recolour(g[0]+M,g[1],l.BARKD)}const f=[d.end];for(let u=0;u<7;u++){const p=xe(n,.35,.9),g=In(d.pts[0],d.end,p),M=u%2?1:-1,x=_n(a,g,-Math.PI/2+M*xe(n,.5,1),r*xe(n,.12,.2)*i,2*t,1,e,n,{mat:l.BARKD,group:12});f.push(x.end)}for(const u of f)Tn(a,u,xe(n,9,13)*t*i,xe(n,7,10)*t,e,n,{mat:l.LEAF2,ragged:1.3});return $n(a,o,r*.55)}function qp(n,e,t){const i=xi(e),s=Math.round(220*t*i+50*t),r=Math.round(120*t),a=new dt(s,r),o=s/2,h=r,c=10*t,d=_n(a,[o,h],-Math.PI/2+(n()-.5)*.4*(e.gnarl+.3),r*.4,c,c*.75,e,n,{bend:1.2}),f=[];for(const g of[-1,1,-1,1]){const M=_n(a,d.end,-Math.PI/2+g*xe(n,.7,1.15)*(.7+.3*i),r*xe(n,.3,.42)*(.7+.3*i),c*.55,c*.25,e,n,{group:12});f.push(M.end,In(d.end,M.end,.55))}qi(a,o,h,c,e,n,t),ms(a,e);const u=Math.round(xe(n,2,3)),p=Math.min(...f.map(g=>g[1]));for(let g=0;g<u;g++){const M=p-6*t+g*9*t,x=(95-g*12)*t*(.65+.35*i);for(let m=0;m<5;m++)Tn(a,[o+(m-2)*x*.36+xe(n,-5,5)*t,M+xe(n,-3,3)*t],x*xe(n,.2,.26),7*t,e,n,{mat:g===u-1?l.LEAF:l.LEAF3})}return $n(a,o,d.end[1]+4*t)}function Lr(n,e,t,i,s,{grain:r=2,holes:a=0,flecks:o=.16,dots:h=0,dot:c=l.FLOWER,dotTall:d=!1,mats:f=[l.LEAF,l.LEAF2,l.LEAF3]}={}){const u=Math.floor(e[0]-t*1.3),p=Math.ceil(e[0]+t*1.3),g=Math.floor(e[1]-i*1.3),M=Math.ceil(e[1]+i*1.3),x=s()*1e4|0;for(let m=g;m<=M;m++)for(let v=u;v<=p;v++){const _=n.get(v,m);if(!f.includes(_))continue;const w=Ri(v/r,m/r,x),A=je(v,m,x);a&&w<a?n.recolour(v,m,l.LEAF3):w>1-o&&n.recolour(v,m,l.LEAF2),h&&A<h&&_!==l.LEAF3&&(n.recolour(v,m,c),d&&n.recolour(v,m-1,c))}}function $i(n,e,t,i){const s=xi(e)*(i.wide||1),r=Math.round(240*t*s+70*t),a=Math.round((i.tall||140)*t),o=new dt(r,a),h=r/2,c=a,d=e.treeTrunks||i.trunks||1,f=(i.tw||12)*t*(e.treeThick||1)*(e.treeThin?.55:1)/Math.sqrt(d),u=(n()-.5)*.4*e.gnarl+(e.treeLean||0)+(i.lean||0),p=[];let g=a;const M=(A,y,S,b,E)=>{const C=_n(o,A,y,S,b,b*.65,e,n,{group:12,mat:i.limbMat||l.TRUNK,bend:i.bend??1});if(E===0){p.push(C.end);return}const T=n()<(i.fork??.35)?3:2;for(let R=0;R<T;R++)M(C.end,C.ang+(R-(T-1)/2)*xe(n,.45,.8)*(i.splay||1)+(n()-.5)*.25,S*xe(n,.6,.78),b*.62,E-1);E<=2&&p.push(In(A,C.end,.7))};for(let A=0;A<d;A++){const y=u+(d>1?(A/(d-1)-.5)*(i.fan||.8):0),S=[h+(A-(d-1)/2)*f*.6,c],b=_n(o,S,-Math.PI/2+y,a*(i.trunk||.36)*(d>1?xe(n,.8,1.1):1),f,f*.72,e,n,{bend:i.trunkBend??1.2,mat:i.trunkMat||l.TRUNK});g=Math.min(g,b.end[1]);for(let E=0;E<(i.limbs||2);E++){const C=E%2?1:-1;M(b.end,-Math.PI/2+y*.5+C*xe(n,.5,1)*(i.spreadA||.8)*(d>1?.7:1),a*(i.limb||.22)*(d>1?.75:1),f*.7,i.depth??3)}if(i.leader&&M(b.end,-Math.PI/2+(n()-.5)*.2,a*(i.limb||.22)*i.leader,f*.55,2),A===0&&e.treeHollow){const E=In(S,b.end,.38);o.ellipse(E[0],E[1],f*.28,f*.5,l.NOSE,{round:.3})}}if(i.noRoots||qi(o,h,c,f*Math.sqrt(d),e,n,t*(i.rootK||1)),i.smooth||ms(o,e),e.treeBare)return $n(o,h,g+4*t);p.sort((A,y)=>A[1]-y[1]);const[x,m]=i.clumpR||[12,18],v=i.flat||.7,_=[],w=(A,y,S,b)=>{Tn(o,A,y,S,e,n,{mat:b,ragged:i.ragged||1}),_.push([A,y,S])};for(const A of p)w(wt(A,[0,-3*t]),xe(n,x,m)*t,xe(n,x,m)*t*v,n()<(i.darkBack??.35)?l.LEAF3:l.LEAF);for(const A of p)n()<(i.extra??.7)&&w(wt(A,[xe(n,-9,9)*t,xe(n,-12,-3)*t]),xe(n,x,m)*t*.7,xe(n,x,m)*t*v*.7,l.LEAF);if(i.dome){const A=Math.min(...p.map(E=>E[1])),y=p.map(E=>E[0]),S=(Math.min(...y)+Math.max(...y))/2,b=(Math.max(...y)-Math.min(...y))/2;for(let E=0;E<i.dome;E++){const C=E/Math.max(1,i.dome-1)-.5;w([S+C*b*1.1,A-(1-4*C*C)*14*t-xe(n,2,6)*t],xe(n,x,m)*t*1.1,xe(n,x,m)*t*v,l.LEAF)}}if(i.layers)for(const[A,y,S]of _)for(let b=-S;b<S;b+=Math.max(3,i.layers*t))for(let E=-y;E<y;E++)o.get(A[0]+E,A[1]+b)===l.LEAF&&o.recolour(A[0]+E,A[1]+b,l.LEAF3);for(const[A,y,S]of _)Lr(o,A,y,S,n,i.tex||{});return $n(o,h,g+4*t)}function $p(n,e,t){return $i(n,{...e,gnarl:Math.max(e.gnarl,.8)},t,{trunk:.26,tw:15,limbs:3,spreadA:1.05,limb:.26,depth:3,wide:1.15,clumpR:[10,15],flat:.75,extra:.9,dome:5,bend:1.4,tex:{grain:1.6,holes:.12,flecks:.18}})}function Zp(n,e,t){return $i(n,{...e,gnarl:e.gnarl*.4},t,{trunk:.4,tw:11,limbs:2,leader:1.3,spreadA:.6,limb:.22,depth:3,clumpR:[15,21],flat:.5,extra:1,dome:7,smooth:1,layers:3.5,trunkMat:l.BARK2,limbMat:l.BARK2,tall:155,tex:{grain:3.5,holes:0,flecks:.1}})}function Jp(n,e,t){return $i(n,{...e,gnarl:e.gnarl*.6},t,{trunk:.4,tw:9,limbs:3,spreadA:.45,limb:.26,depth:3,splay:.6,clumpR:[7,10],flat:.8,extra:.35,ragged:1.8,tall:160,wide:.8,darkBack:.1,tex:{grain:1.2,holes:.3,flecks:.26}})}function Qp(n,e,t){return $i(n,{...e,gnarl:e.gnarl*.4},t,{trunk:.38,tw:11,limbs:2,spreadA:.55,limb:.24,depth:3,leader:1.1,clumpR:[9,12],flat:.85,extra:1,dome:5,tall:170,wide:.75,darkBack:.15,tex:{grain:1.4,holes:.05,flecks:.22}})}function jp(n,e,t){return $i(n,e,t,{trunk:.34,tw:12,limbs:2,spreadA:.8,limb:.24,depth:2,clumpR:[20,27],flat:.7,extra:.8,dome:2,darkBack:.5,tex:{grain:4,holes:.16,flecks:.12}})}function em(n,e,t){return $i(n,e,t,{trunk:.32,tw:14,limbs:2,spreadA:.85,limb:.25,depth:2,clumpR:[22,30],flat:.78,extra:.9,dome:3,darkBack:.25,tall:150,tex:{grain:6,holes:.04,flecks:.16,dots:.025,dotTall:!0}})}function tm(n,e,t){return $i(n,{...e,gnarl:e.gnarl*.7},t,{trunk:.45,tw:7,limbs:3,spreadA:.55,limb:.2,depth:2,clumpR:[8,11],flat:.7,extra:.5,ragged:1.7,wide:.6,tall:120,smooth:1,trunkMat:l.BARK2,limbMat:l.BARK2,darkBack:.1,tex:{grain:1.1,holes:.26,flecks:.22,dots:.05}})}function nm(n,e,t){const i=.7+.3*xi(e),s=Math.round(110*t*i),r=Math.round(165*t),a=new dt(s,r),o=s/2,h=r,c=e.treeTrunks||1,d=(n()-.5)*.2+(e.treeLean||0),f=[];for(let p=0;p<c;p++){const g=_n(a,[o+(p-(c-1)/2)*5*t,h],-Math.PI/2+d+(c>1?(p/(c-1)-.5)*.3:0),r*.92,6*t/Math.sqrt(c),1.5,e,n,{bend:.5});for(let M=0;M<16;M++){const x=xe(n,.3,.97),m=In(g.pts[0],g.end,x),v=M%2?1:-1,_=(1-x*.6)*r*.12*i,w=_n(a,m,-Math.PI/2+v*xe(n,.7,1.2),_,2*t,1,e,n,{group:12,mat:l.BARKD});f.push([w.end,(8+(1-x)*6)*t*i],[In(m,w.end,.4),(7+(1-x)*4)*t*i])}f.push([g.end,7*t])}qi(a,o,h,6*t,e,n,t*.6),ms(a,e);for(const[p,g]of f)Tn(a,p,g,g*.8,e,n,{mat:n()<.5?l.LEAF3:l.LEAF});for(const[p,g]of f)Lr(a,p,g,g*.8,n,{grain:1.3,holes:.2,flecks:.1,dots:.03,dot:l.BARKD});const u=Math.min(...f.map(([p])=>p[1]));return $n(a,o,u+(h-u)*.45)}function im(n,e,t){const i=.8+.2*xi(e),s=Math.round(150*t*i),r=Math.round(175*t),a=new dt(s,r),o=s/2,h=r,c=_n(a,[o,h],-Math.PI/2+(n()-.5)*.25+(e.treeLean||0),r*.78,8*t,3*t,e,n,{bend:.7});ms(a,e);for(let f=0;f<a.h*.55;f++)for(let u=0;u<s;u++)(a.get(u,f)===l.TRUNK||a.get(u,f)===l.BARKD)&&a.recolour(u,f,je(u,f,3)<.15?l.BARKD:l.BELLY);qi(a,o,h,8*t,e,n,t*.7);const d=[];for(let f=0;f<6;f++){const u=xe(n,.55,1),p=In(c.pts[0],c.end,u),g=f%2?1:-1,M=_n(a,p,-Math.PI/2+g*xe(n,.6,1.3),r*xe(n,.12,.22)*i,3*t,1.5,e,n,{group:12,bend:1.6,mat:l.BELLY});d.push(M.end)}d.push(c.end);for(const f of d)Tn(a,wt(f,[0,-2*t]),xe(n,13,19)*t*i,xe(n,4,6)*t,e,n,{mat:l.LEAF,ragged:1.3});for(const f of d)Lr(a,wt(f,[0,-2*t]),19*t*i,6*t,n,{grain:1,holes:.25,flecks:.14});return $n(a,o,Math.min(...d.map(f=>f[1]))+8*t)}function sm(n,e,t){const i=xi(e),s=Math.round(200*t*i+50*t),r=Math.round(120*t),a=new dt(s,r),o=s/2,h=r,c=e.treeTrunks||3,d=9*t*(e.treeThick||1.2);for(let p=0;p<c;p++)_n(a,[o+(p-(c-1)/2)*d*.5,h],-Math.PI/2+(p-(c-1)/2)*.35+(e.treeLean||0),r*.3,d,d*.6,e,n,{mat:l.BELLY,bend:1.6});for(let p=0;p<r;p++)for(let g=0;g<s;g++)a.get(g,p)===l.BELLY&&(g+Math.round(p/6))%4===0&&a.recolour(g,p,l.BARKD);qi(a,o,h,d*1.4,e,n,t);const f=h-r*.3,u=[];for(let p=0;p<9;p++){const g=Math.PI+p/8*Math.PI,M=(40+20*i)*t;u.push([[o+Math.cos(g)*M,f+Math.sin(g)*M*.55+10*t],xe(n,16,22)*t])}for(let p=0;p<7;p++)u.push([[o+(p/6-.5)*(60+30*i)*t,f-xe(n,4,22)*t],xe(n,20,26)*t]);u.push([[o,f-24*t],26*t]);for(const[p,g]of u)Tn(a,p,g,g*.7,e,n,{mat:l.LEAF3,ragged:.6});for(const[p,g]of u)Lr(a,p,g,g*.7,n,{grain:.7,holes:0,flecks:.08,mats:[l.LEAF,l.LEAF2,l.LEAF3]});return $n(a,o,f+4*t)}function rm(n,e,t){return $i(n,{...e,gnarl:1},t,{trunk:.3,tw:8,limbs:3,spreadA:.9,limb:.3,depth:3,fork:.6,bend:2,lean:.45,clumpR:[7,10],flat:.65,extra:.8,wide:.7,tall:90,ragged:1.4,darkBack:.3,tex:{grain:1,holes:.1,flecks:.14,dots:.035}})}function am(n,e,t){const i=.8+.2*xi(e),s=Math.round(110*t*i),r=Math.round(130*t),a=new dt(s,r),o=s/2,h=r;a.limb([[o,h,5*t],[o,h-r*.5,3*t],[o,10*t,1.5]],l.BARK2,{group:10,round:e.round});const c=[];for(let d=0;d<10;d++){const f=d/9,u=10*t+f*r*.72,p=(5+f*28)*t*i,g=1+Math.round(f*3);for(let M=0;M<g;M++)c.push([[o+(g>1?(M/(g-1)-.5)*p*1.3:0)+xe(n,-2,2)*t,u+xe(n,-2,2)*t],(6+f*5)*t])}for(const[d,f]of c)Tn(a,d,f*1.2,f,e,n,{mat:l.LEAF3,ragged:.7});for(const[d,f]of c)Lr(a,d,f*1.2,f,n,{grain:1.1,holes:0,flecks:.2,dots:.035,mats:[l.LEAF,l.LEAF2,l.LEAF3]});return $n(a,o,r*.85)}function om(n,e,t){return $i(n,{...e,gnarl:e.gnarl*.5,treeTrunks:e.treeTrunks||6},t,{trunk:.5,tw:9,limbs:1,spreadA:.5,limb:.18,depth:1,fan:1.3,trunkBend:.8,clumpR:[11,15],flat:.8,extra:1,wide:.8,tall:110,noRoots:!1,rootK:.4,smooth:1,trunkMat:l.BARK2,limbMat:l.BARK2,darkBack:.2,tex:{grain:3.6,holes:.14,flecks:.2}})}function lm(n,e,t){const i=ef(n,{...e,treeLean:e.treeLean||0},t),s=i.sp;for(let r=0;r<s.w;r++){let a=-1;for(let h=0;h<s.h;h++)if([l.LEAF,l.LEAF2,l.LEAF3].includes(s.get(r,h))){a=h;break}if(a<0||je(r,1,7)<.35)continue;const o=(s.h-a)*xe(n,.25,.5);for(let h=a+1;h<Math.min(s.h-3,a+o);h++)(!s.get(r,h)||s.get(r,h)===l.LEAF3)&&s.px(r+Math.round(Math.sin(h*.2+r)*.6),h,je(r,h,2)<.3?l.LEAF:l.LEAF2,0,.2,.95)}return i}function cm(n,e,t){const i=.8+.2*xi(e),s=Math.round(100*t*i),r=Math.round(170*t),a=new dt(s,r),o=s/2,h=r;a.limb([[o,h,6*t],[o,h-r*.5,3.5*t],[o,6*t,1.2]],l.TRUNK,{group:10,round:e.round}),qi(a,o,h,6*t,e,n,t*.5),ms(a,e);const c=14;for(let d=0;d<c;d++){const f=d/(c-1),u=8*t+f*r*.68,p=(4+f*30)*t*i;for(let g=0;g<4;g++){const M=[o+(g/3-.5)*p*1.6,u+Math.abs(g/3-.5)*6*t];Tn(a,M,p*.35+2*t,4*t,e,n,{mat:l.LEAF2,ragged:1.6}),Lr(a,M,p*.35+2*t,4*t,n,{grain:1,holes:.32,flecks:.1,mats:[l.LEAF,l.LEAF2]})}}return $n(a,o,r*.8)}const hm=6;function um(n,e,t,i,s){const{sp:r,crownY:a}=n,o=r.w,h=r.h,c=r.low||(r.low=new Uint8Array(o*h)),d=Math.ceil(a+hm*i);if(d>=h-2)return n;const f=i/(t.treeSize*2/(t.pixel||2)),u=Math.max(0,Math.min(1,(1-f)/.5)),p=!!t.treeBare,g=E=>{const C=[];let T=-1;for(let R=0;R<=o;R++){const O=R<o&&Jr.has(r.m[E*o+R]);O&&T<0&&(T=R),!O&&T>=0&&(C.push([T,R-1]),T=-1)}return C},M=(E,C)=>E.reduce((T,R)=>!T||Math.abs((R[0]+R[1])/2-C)<Math.abs((T[0]+T[1])/2-C)?R:T,null),x=E=>{const C=r.m.slice(),T=r.n.slice();E();for(let R=0;R<C.length;R++)r.m[R]!==C[R]&&((R/o|0)<d||C[R]&&!Jr.has(C[R])&&!c[R]?(r.m[R]=C[R],r.n[R*3]=T[R*3],r.n[R*3+1]=T[R*3+1],r.n[R*3+2]=T[R*3+2]):c[R]=1)},m=()=>{for(let E=0;E<8;E++){const C=Math.round(xe(e,d,h-3)),T=g(C);if(T.length){const R=Jc(e,T),O=e()<.5?-1:1;return{x:O<0?R[0]:R[1],y:C,side:O}}}return null},v=p?0:1,_=h-1;let w=o,A=0;for(let E=0;E<d*o;E++)if(r.m[E]&&!Jr.has(r.m[E])){const C=E%o;w=Math.min(w,C),A=Math.max(A,C)}const y=Math.max(6*i,(A-w)*.22);s.moss&&x(()=>{for(let E=Math.max(d,Math.round(h-(h-d)*.4));E<h;E++)for(let C=0;C<o;C++){const T=E*o+C;if(!Jr.has(r.m[T]))continue;const R=E>0&&!r.m[T-o];(Ri(C/2.5,E/2.5,41)>1-s.moss*(.35+.4*(E-d)/(h-d))||R&&je(C,E,9)<s.moss*.6)&&(r.m[T]=je(C,E,5)<.3?l.LEAF2:l.LEAF)}}),s.ivy&&e()<.35+s.ivy*.6&&x(()=>{let E=o/2;const C=_-(_-d)*xe(e,.45,.95)*Math.min(1,s.ivy+.3),T=e()*6;for(let R=_-1;R>C;R--){const O=M(g(R),E);if(!O)break;if(E=O[0]+(O[1]-O[0])*(.5+.48*Math.sin(R*.22+T)),r.px(E,R,l.LEAF3,0,0,1),je(Math.round(E),R,13)<.45){const I=je(R,3,2)<.5?-1:1;r.px(E+I,R,l.LEAF,I*.5,-.3,.8),r.px(E+I*2,R,l.LEAF3,I*.6,0,.8),r.px(E+I,R-1,je(E,R,4)<.4?l.LEAF2:l.LEAF3,0,-.6,.8)}}});const S=Math.round(s.sprigs*v*(5+8*u)*(h-d)/(40*i));for(let E=0;E<S;E++){const C=m();if(!C)break;const T=xe(e,3,5.5)*i;x(()=>Tn(r,[C.x+C.side*T*.6,C.y],T,T*.75,t,e,{mat:e()<.4?l.LEAF3:l.LEAF,ragged:.8}))}const b=Math.round(s.boughs*v*(3+4*u)*(h-d)/(45*i)+(e()<s.boughs*v?1:0));for(let E=0;E<b;E++){const C=m();if(!C)break;x(()=>{const T=_n(r,[C.x,C.y],-Math.PI/2+C.side*xe(e,.9,1.35),Math.min(y,xe(e,10,20)*i),2*i,1,t,e,{group:12,mat:l.TRUNK}),R=xe(e,6,9.5)*i;Tn(r,wt(T.end,[0,-1*i]),R,R*.65,t,e,{mat:e()<.4?l.LEAF3:l.LEAF})})}if(s.skirt&&v){const E=Math.round(3+s.skirt*5+u*3);for(let C=0;C<E;C++)x(()=>{const T=Math.round(xe(e,Math.max(d,h-(h-d)*.8),h-4*i)),R=M(g(T),o/2);if(!R)return;const O=C%2?1:-1,I=O<0?R[0]:R[1],k=Math.min(y*1.3,xe(e,14,24)*i*(.6+s.skirt*.5)),U=_n(r,[I,T],-Math.PI/2+O*xe(e,1.6,1.95),k,1.6*i,1,t,e,{group:12,mat:l.BARKD});Tn(r,In([I,T],U.end,.6),k*.5,3.5*i,t,e,{mat:e()<.5?l.LEAF3:l.LEAF,ragged:1.2})})}return n}const dm={broad:{ivy:.4,moss:.6,sprigs:.5,boughs:.3},fir:{moss:.3,skirt:1},willow:{moss:.5,sprigs:.3},birch:{sprigs:.3,boughs:.2},flat:{ivy:.3,sprigs:.4,boughs:.3},oak:{ivy:.5,moss:.5,sprigs:.9,boughs:.4},beech:{moss:.3,boughs:.3},ash:{ivy:.6,sprigs:.3,boughs:.2},lime:{moss:.3,sprigs:1},sycamore:{ivy:.4,moss:.4,boughs:.4},chestnut:{sprigs:.3,boughs:.5},rowan:{sprigs:.3,boughs:.3},alder:{moss:.6,sprigs:.4},pine:{ivy:.3,moss:.3,boughs:.15},yew:{moss:.4,skirt:1},hawthorn:{moss:.5,sprigs:.6,boughs:.5},holly:{skirt:.7},hazel:{moss:.4,sprigs:.8},weepingBirch:{sprigs:.3},larch:{skirt:.5,boughs:.2}},fm=(n,e)=>(t,i,s)=>um(n(t,i,s),t,i,s,e),ho={broad:{fn:Yp,name:"gnarled broadleaf",grow:"normal"},fir:{fn:Xp,name:"spruce",grow:"narrow",hue:.06},willow:{fn:Kp,name:"willow",grow:"willow",hue:-.02,val:1.05},birch:{fn:ef,name:"silver birch",grow:"narrow",hue:-.02,val:1.08},flat:{fn:qp,name:"field maple",grow:"normal",hue:.01},oak:{fn:$p,name:"oak",grow:"wide",hue:.01,val:.92},beech:{fn:Zp,name:"beech",grow:"normal",hue:-.03,sat:1.05,val:1.02,trunk:[.62,.08,.62]},ash:{fn:Jp,name:"ash",grow:"narrow",hue:-.04,sat:.85,val:1.12},lime:{fn:Qp,name:"lime",grow:"narrow",hue:-.05,sat:1.1,val:1.12},sycamore:{fn:jp,name:"sycamore",grow:"wide",hue:.03,sat:1.1,val:.72},chestnut:{fn:em,name:"horse chestnut",grow:"wide",hue:-.01,val:1,dot:[244,238,226]},rowan:{fn:tm,name:"rowan",grow:"small",hue:-.01,val:1.05,trunk:[.08,.12,.52],dot:[210,40,34]},alder:{fn:nm,name:"alder",grow:"narrow",hue:.04,sat:.9,val:.72},pine:{fn:im,name:"Scots pine",grow:"narrow",hue:.1,sat:.7,val:.78,upper:[.06,.6,.72]},yew:{fn:sm,name:"yew",grow:"wide",hue:.07,sat:.8,val:.55,upper:[.02,.55,.45]},hawthorn:{fn:rm,name:"hawthorn",grow:"small",hue:.025,val:.8,dot:[176,30,40]},holly:{fn:am,name:"holly",grow:"narrow",hue:.06,sat:.85,val:.6,trunk:[.1,.08,.55],dot:[214,28,36]},hazel:{fn:om,name:"hazel coppice",grow:"small",hue:0,val:.94,trunk:[.07,.3,.45]},weepingBirch:{fn:lm,name:"weeping birch",grow:"narrow",hue:-.04,val:1.12},larch:{fn:cm,name:"larch",grow:"narrow",hue:-.07,sat:.8,val:1.15}};for(const[n,e]of Object.entries(ho))e.bare=e.fn,e.fn=fm(e.fn,dm[n]||{});const pm=new Map(Object.entries(ho).flatMap(([n,e])=>[[e.fn,{id:n,...e}],[e.bare,{id:n,...e}]])),rh=n=>ho[n]||ho.broad;function Fo(n,e,t){const i=pm.get(t),s=i?.sat||1,r=i?.val||1,a=i?.hue||0,o=a<0?a*Math.max(0,Math.min(1,(e.leafHue-.17)/.09)):a,h=e.leafHue+(n()-.5)*e.leafVariety*.7+o,c={[l.TRUNK]:me(e.trunkHue,.45*e.sat,.34),[l.BARKD]:me(e.trunkHue+.03,.5*e.sat,.17),[l.BARKL]:me(e.trunkHue-.01,.38*e.sat,.5),[l.BARK2]:[222,220,212],[l.LEAF]:me(h,Math.min(1,.62*e.sat*s),Math.min(1,.58*r)),[l.LEAF2]:me(h-.05,Math.min(1,.55*e.sat*s),Math.min(1,.8*r)),[l.LEAF3]:me(h+.03,Math.min(1,.66*e.sat*s),.38*r),[l.WEB]:[225,225,232]};return i?.trunk&&(c[l.BARK2]=me(...i.trunk)),i?.upper&&(c[l.BELLY]=me(...i.upper)),i?.dot&&(c[l.FLOWER]=i.dot),c}function tf(n){const{sp:e,crownY:t}=n,i=new dt(e.w,e.h),s=new dt(e.w,e.h);for(let r=0;r<e.h;r++)for(let a=0;a<e.w;a++){const o=r*e.w+a,h=e.m[o];if(!h)continue;(Jr.has(h)&&r>=t||e.low?.[o]?s:i).put(a,r,h,e.n[o*3],e.n[o*3+1],e.n[o*3+2])}return{top:i,bot:s}}function mm(n,e){const t=e.bushSize,i=Jc(n,["round","round","fern","grass","shrub"]),s=Math.round(40*t),r=Math.round(28*t),a=new dt(s,r);if(i==="round"||i==="shrub"){const h=i==="shrub"?5:3;for(let c=0;c<h;c++)Tn(a,[s/2+xe(n,-9,9)*t,r-8*t+xe(n,-4,2)*t],xe(n,7,10)*t,xe(n,5,8)*t,e,n);if(i==="shrub"||n()<e.flowers)for(let c=0;c<18*e.flowers+3;c++){const d=s/2+xe(n,-12,12)*t,f=r-xe(n,5,17)*t;a.get(d,f)&&a.recolour(d,f,l.FLOWER)}}else if(i==="fern")for(let h=0;h<7;h++){const c=-Math.PI/2+(h/6-.5)*2.4;let d=s/2,f=r-1;for(let u=0;u<15*t;u++)d+=Math.cos(c)*.9,f+=Math.sin(c)*.9+u*.06,a.put(d,f,h%2?l.LEAF3:l.LEAF,Math.cos(c)*.4,-.2,.9),u%2&&(a.put(d,f-1,l.LEAF2,0,-.5,.85),a.put(d+Math.sign(Math.cos(c)),f+1,l.LEAF,0,.3,.9))}else for(let h=0;h<18*t;h++){const c=s/2+xe(n,-13,13)*t,d=xe(n,5,15)*t,f=xe(n,-3,3);for(let u=0;u<d;u++)a.put(c+f*u/d*(u/d),r-1-u,u>d*.65?l.LEAF2:u<d*.3?l.LEAF3:l.LEAF,f*.1,-.3,.9)}const o=Fo(n,e,null);return o[l.FLOWER]=me(n(),.55,.95),{sp:a,colours:o}}const Ze=(n,e={})=>["tree",{type:n,...e}],qe=(n,e={})=>[n,e],Hs=[{id:"moor",name:"Moor",creature:"badger",by:"Ed",leaf:.24,floor:["moss",.26,.45,.42],text:{floor:"moss",wall:"puddles, a lake",small:"long grass",big:"moss mounds"},wall:[qe("water",{w:1.6})],small:[qe("grass",{h:1.4})],big:[qe("mound",{moss:!0})]},{id:"fern-forest",name:"Fern forest",creature:"boar",by:"Ed",leaf:.3,floor:["needles",.08,.45,.32],text:{floor:"pine needles",small:"ferns",big:"pine trees"},small:[qe("fern")],big:[Ze("larch",{scale:1.1}),Ze("fir",{minor:!0})]},{id:"muddy-forest",name:"Muddy forest",creature:"snail",by:"Ed",leaf:.22,floor:["mud",.07,.5,.28],text:{floor:"mud and leaves",small:"short trunks with broken branches",big:"trees with many trunks and branches"},small:[qe("stump",{snag:!0})],big:[Ze("sycamore",{trunks:3,gnarl:.9}),Ze("alder",{minor:!0})]},{id:"stone-shrine",name:"Stone shrine",creature:"fox",by:"Ed",leaf:.28,floor:["stony",.25,.3,.45],text:{floor:"grassy, stony",wall:"mossy henges",small:"little stones",big:"big stones",set:"a shrine"},wall:[qe("henge")],small:[qe("stones")],big:[qe("boulder")],set:qe("shrine")},{id:"tangly-forest",name:"Tangly forest",creature:"ram",by:"Ed",leaf:.27,floor:["nettles",.28,.5,.3],text:{floor:"nettles and earth",small:"tangled branches",big:"fairly short tangly trees"},small:[qe("bramble",{bare:!0})],big:[Ze("hawthorn",{scale:.9,gnarl:1})]},{id:"wispy-forest",name:"Wispy forest",creature:"woodlouse",by:"Ed",leaf:.2,floor:["leaves",.09,.55,.45],text:{floor:"dry leaves",small:"tall thin wispy trees",big:"thick trees with several trunks"},small:[Ze("birch",{scale:.75})],big:[Ze("lime",{trunks:3,thick:1.4}),Ze("birch",{minor:!0})]},{id:"hazel-forest",name:"Hazel forest",creature:"hedgehog",by:"Ed",leaf:.26,floor:["grass",.24,.45,.45],text:{floor:"short grass",small:"brown lumps",big:"crooked trees with many branches"},small:[qe("mound",{brown:!0})],big:[Ze("hazel",{gnarl:1,scale:.95}),Ze("oak",{minor:!0,scale:.9})]},{id:"garden",name:"Garden",creature:"squirrel",by:"Ed",leaf:.3,floor:["lawn",.27,.5,.5],text:{floor:"uniform grass",wall:"ornate stone wall",small:"manicured flower beds",big:"willows",set:"a stone pavilion"},wall:[qe("wall")],small:[qe("flowerbed")],big:[Ze("willow")],set:qe("pavilion")},{id:"twiggy-forest",name:"Twiggy forest",creature:"wolf",by:"Ed",leaf:.29,floor:["plants",.3,.5,.38],text:{floor:"small leafy plants",small:"small trees with many thin trunks",big:"straight but slanted trees with many trunks"},small:[Ze("broad",{trunks:4,scale:.5,thin:!0})],big:[Ze("ash",{trunks:3,lean:.3,gnarl:.1})]},{id:"ancient",name:"Ancient",creature:"stag",by:"Ed",leaf:.31,floor:["roots",.1,.25,.35],text:{floor:"mossy roots over rocks",small:"sorrel",big:"giant gnarly slanted trees"},small:[qe("flowers",{hue:.98,leafy:!0})],big:[Ze("yew",{scale:1.4,gnarl:1,lean:.35}),Ze("oak",{minor:!0,scale:1.3,gnarl:1})]},{id:"norway",name:"Norway",creature:"stoat",by:"Ed",leaf:.36,floor:["slate",.6,.15,.35],text:{floor:"pine needles and slate",small:"rocks",big:"straight pines"},small:[qe("stones",{big:!0})],big:[Ze("fir",{scale:1.2}),Ze("birch",{minor:!0})]},{id:"alder-forest",name:"Alder forest",creature:"snake",by:"Ed",leaf:.23,floor:["tallgrass",.22,.45,.42],text:{floor:"tall and short grass",small:"tree stumps with tall grass around",big:"tall slanted trees with thin leaves at different heights"},small:[qe("stump",{grass:!0})],big:[Ze("alder",{lean:.3,scale:1.2,dark:!0})]},{id:"meadow",name:"Meadow",creature:"hare",by:"draft",leaf:.25,floor:["flowers",.25,.5,.5],text:{floor:"grass and wildflowers",small:"scattered hawthorn",big:"lone oaks"},small:[qe("shrub",{flower:[250,245,235]})],big:[Ze("chestnut",{scale:1.1}),Ze("hawthorn",{minor:!0,scale:.8})]},{id:"old-oaks",name:"Old oaks",creature:"owl",by:"draft",leaf:.22,floor:["leaves",.07,.5,.35],text:{floor:"leaf litter",small:"acorns, fallen branches",big:"ancient gnarled oaks with hollow trunks",set:"a great hollow oak"},small:[qe("cones",{acorn:!0}),qe("log",{branch:!0})],big:[Ze("oak",{gnarl:.9,hollow:!0}),Ze("holly",{minor:!0,scale:.8})],set:Ze("broad",{scale:1.6,gnarl:1,hollow:!0})},{id:"berry-thicket",name:"Berry thicket",creature:"bear",by:"draft",leaf:.32,floor:["needles",.08,.45,.3],text:{floor:"pine needles",wall:"bramble thickets",small:"berry bushes",big:"tall pines"},wall:[qe("bramble")],small:[qe("shrub",{flower:[200,30,60]})],big:[Ze("pine",{scale:1.2}),Ze("rowan",{minor:!0})]},{id:"wetland",name:"Wetland",creature:"toad",by:"draft",leaf:.2,floor:["mud",.15,.45,.3],text:{floor:"wet mud",wall:"puddles, reeds",small:"reeds and rushes",big:"willows"},wall:[qe("water"),qe("reeds",{tall:!0})],small:[qe("reeds")],big:[Ze("willow"),Ze("alder",{minor:!0,scale:.9})]},{id:"stream",name:"Stream",creature:"otter",by:"draft",leaf:.27,floor:["pebbles",.25,.3,.45],text:{floor:"pebbles and grass",wall:"a stream or pond",small:"alder saplings",big:"alders",set:"a fallen-log bridge"},wall:[qe("water",{w:2})],small:[Ze("broad",{scale:.45})],big:[Ze("alder",{scale:.95,gnarl:.3}),Ze("willow",{minor:!0,scale:.8})],set:qe("bridge")},{id:"rocky-slope",name:"Rocky slope",creature:"lynx",by:"draft",leaf:.34,floor:["scree",.2,.2,.42],text:{floor:"scree and moss",wall:"boulders",small:"rocks",big:"pines",set:"a rocky outcrop"},wall:[qe("boulder",{big:!0})],small:[qe("stones",{big:!0})],big:[Ze("rowan",{scale:1.1}),Ze("pine",{minor:!0})],set:qe("outcrop")},{id:"bog",name:"Bog",creature:"elk",by:"draft",leaf:.38,floor:["moss",.18,.55,.4],text:{floor:"sphagnum moss",wall:"bog pools",small:"cotton grass",big:"spruce"},wall:[qe("water",{bog:!0})],small:[qe("reeds",{cotton:!0})],big:[Ze("birch",{scale:.8,dark:!0}),Ze("pine",{minor:!0,scale:.7})]},{id:"deadwood",name:"Deadwood",creature:"raven",by:"draft",leaf:.15,floor:["earth",.07,.35,.3],text:{floor:"bare earth",small:"broken branches",big:"blasted dead trees"},small:[qe("log",{branch:!0})],big:[Ze("broad",{bare:!0,gnarl:1})]},{id:"cave-mouth",name:"Cave mouth",creature:"bat",by:"draft",leaf:.2,floor:["stone",.08,.15,.35],text:{floor:"stone and roots",wall:"rock walls",small:"stalagmite stubs",big:"dead trees",set:"a cave mouth"},wall:[qe("rockwall")],small:[qe("stalagmite")],big:[Ze("broad",{bare:!0}),Ze("yew",{minor:!0,scale:.8})],set:qe("cave")},{id:"grassland",name:"Grassland",creature:"mole",by:"draft",leaf:.25,floor:["grass",.26,.5,.48],text:{floor:"short turf",small:"molehills",big:"lone birches"},small:[qe("mound",{brown:!0,small:!0})],big:[Ze("flat",{scale:1.1}),Ze("weepingBirch",{minor:!0})]},{id:"beaver-pond",name:"Beaver pond",creature:"beaver",by:"draft",leaf:.17,floor:["leaves",.13,.6,.5],text:{floor:"birch leaves",wall:"a pond",small:"stumps",big:"birch and aspen",set:"a beaver dam"},wall:[qe("water",{w:2})],small:[qe("stump",{gnawed:!0})],big:[Ze("weepingBirch"),Ze("alder",{minor:!0,scale:.8})],set:qe("dam")},{id:"log-pile",name:"Log pile",creature:"beetle",by:"draft",leaf:.22,floor:["leaves",.06,.5,.3],text:{floor:"rotting leaves",small:"fungi",big:"rotting logs",set:"a fallen giant"},small:[qe("fungi")],big:[qe("log",{rot:!0})],set:qe("log",{rot:!0,giant:!0})},{id:"heath",name:"Heath",creature:"moth",by:"draft",leaf:.27,floor:["heather",.85,.35,.4],text:{floor:"heather",small:"gorse",big:"wind-bent birches"},small:[qe("shrub",{flower:[250,205,40],spiky:!0})],big:[Ze("birch",{lean:.45,scale:.75}),Ze("hawthorn",{minor:!0,scale:.7,lean:.45})]},{id:"old-pinewood",name:"Old pinewood",creature:"marten",by:"draft",leaf:.35,floor:["needles",.07,.4,.3],text:{floor:"pine needles",small:"pine cones",big:"tall old pines with knotholes"},small:[qe("cones")],big:[Ze("pine",{scale:1.35}),Ze("rowan",{minor:!0,scale:.8})]},{id:"ravine",name:"Ravine",creature:"salamander",by:"draft",leaf:.3,floor:["stone",.3,.3,.32],text:{floor:"wet moss and rock",wall:"rock walls",small:"ferns",big:"mossy boulders",set:"a waterfall"},wall:[qe("rockwall",{moss:!0})],small:[qe("fern")],big:[qe("boulder",{moss:!0,big:!0})],set:qe("waterfall")},{id:"bluebell-glade",name:"Bluebell glade",creature:"glowworm",by:"draft",leaf:.26,floor:["bluebells",.27,.45,.4],text:{floor:"bluebells",small:"ferns",big:"beeches"},small:[qe("fern")],big:[Ze("beech",{gnarl:.2,scale:1.1}),Ze("holly",{minor:!0,scale:.7})]},{id:"holly-thicket",name:"Holly thicket",creature:"spider",by:"draft",leaf:.36,floor:["leaves",.08,.35,.28],text:{floor:"dead leaves",wall:"holly hedges",small:"cobwebs",big:"hollies",set:"a web-hung dead tree"},wall:[qe("hedge",{berries:!0})],small:[qe("web")],big:[Ze("holly",{scale:.9}),Ze("yew",{minor:!0,scale:.7})],set:Ze("broad",{bare:!0,webs:!0})},{id:"honeysuckle-tangle",name:"Honeysuckle tangle",creature:"dormouse",by:"draft",leaf:.25,floor:["clover",.27,.45,.45],text:{floor:"grass and clover",wall:"bramble",small:"honeysuckle",big:"hazel coppice"},wall:[qe("bramble")],small:[qe("shrub",{flower:[250,230,170]})],big:[Ze("hazel",{trunks:5,scale:.7,thin:!0}),Ze("rowan",{minor:!0,scale:.7})]}];for(const[n,[e,t]]of Object.entries(qd)){const i=Hs.find(s=>s.id===n);i&&!i.set&&(i.set=qe(e,{three:!0}),i.text={...i.text,set:t})}const nf=Object.fromEntries(Hs.map(n=>[n.id,n])),gm=["ruins","rocks","freak","lake","modern"],Lt=(n,e,t,i,s,r,a,o,h,c,d={})=>({pattern:n,...d,density:e,clump:t,glades:{count:i[0],size:i[1]||[0,0]},heightMix:s&&{sapling:s[0],mature:s[1],tall:s[2],giant:s[3]},undergrowth:r,lean:{dir:a[0],amount:a[1]},terrain:o,decor:{rate:h[0],...Object.fromEntries(gm.map((f,u)=>[f,h[1][u]]))},feel:c}),Xt=[0,0],xm={moor:Lt("scatter",.2,.6,[2,[14,24]],null,.7,[30,.2],["pools","mounds","hollows"],[.5,[.3,.4,0,.3,0]],"Open rolling moss, low mounds and dark pools, long grass combed one way by the wind; you can see a long way."),"fern-forest":Lt("groves",.65,.6,[2,[8,12]],[.2,.5,.25,.05],.9,Xt,["hollows","paths"],[.25,[.4,.3,.3,0,0]],"Pine groves standing waist-deep in ferns, with green sunken hollows between them."),"muddy-forest":Lt("scatter",.7,.3,[1,[6,9]],[.25,.55,.17,.03],.4,Xt,["pools","paths"],[.3,[.3,.1,.2,.1,.3]],"Squelching mud between many-trunked trees, puddled ruts winding through, broken stumps everywhere."),"stone-shrine":Lt("rings",.35,.8,[1,[10,14]],null,.3,Xt,["rocky","mounds"],[.5,[.6,.4,0,0,0]],"Big stones stand in rings round the shrine on stony grass; it feels deliberate and old."),"tangly-forest":Lt("thicket",.9,.2,[1,[5,8]],[.35,.55,.1,0],.9,Xt,["hollows"],[.2,[.2,0,.6,0,.2]],"Short tangled trees packed close over nettles, low and claustrophobic, with one small clearing."),"wispy-forest":Lt("stands",.55,.7,[2,[6,10]],[.15,.45,.3,.1],.5,Xt,["ridges"],[.3,[.4,.2,.3,0,.1]],"Stands of thick many-trunked trees, thin wispy saplings drifting between them over dry leaves."),"hazel-forest":Lt("rings",.6,.6,[2,[6,9]],[.3,.55,.12,.03],.5,Xt,["mounds","paths"],[.3,[.4,.3,.3,0,0]],"Crooked hazels grown in loose fairy rings on short grass, lumpy little mounds in the middle of each."),garden:Lt("rows",.45,0,[3,[6,10]],[.1,.7,.2,0],.6,Xt,["paths","pools"],[.4,[.7,0,0,.2,.1]],"A lost formal garden: willows in avenues along straight paths, lawns and flower beds, a pavilion at the heart.",{along:"paths"}),"twiggy-forest":Lt("scatter",.75,.3,[1,[6,10]],[.25,.5,.2,.05],.6,[60,.5],["paths"],[.25,[.3,.2,.3,0,.2]],"Straight many-trunked trees all slanting the same way, like a wood frozen in a gale."),ancient:Lt("lone",.4,.2,[1,[12,18]],[.05,.35,.4,.2],.4,[150,.25],["rocky","mounds","hollows"],[.45,[.5,.2,.3,0,0]],"Giant gnarled trees far apart, roots heaving over mossy rocks; every tree is a landmark."),norway:Lt("stands",.8,.5,[1,[8,12]],[.15,.45,.35,.05],.2,Xt,["rocky","ridges"],[.3,[.2,.6,0,.2,0]],"Dense stands of straight pines on slate ridges, bare rock between; dark, vertical and cold."),"alder-forest":Lt("scatter",.55,.4,[2,[6,10]],[.2,.4,.35,.05],.6,[120,.35],["stream","hollows"],[.3,[.3,.1,.2,.3,.1]],"Tall slanted alders at every height over long grass and stumps, a little stream wandering through."),meadow:Lt("lone",.12,.1,[0],[.2,.5,.25,.05],.3,Xt,["mounds","paths"],[.35,[.3,.3,0,.2,.2]],"Wide-open wildflower grass with a lone oak here and there and scattered hawthorn; the sky does the work."),"old-oaks":Lt("groves",.5,.5,[2,[10,16]],[.1,.35,.4,.15],.5,Xt,["mounds","hollows"],[.4,[.5,.1,.4,0,0]],"Groves of huge hollow oaks with broad clearings of leaf litter between; slow and grand."),"berry-thicket":Lt("thicket",.85,.5,[2,[4,7]],[.2,.4,.35,.05],1,Xt,["paths"],[.15,[.3,0,.4,0,.3]],"Tall pines over solid berry bushes and brambles, only narrow animal paths and a couple of pockets of space."),wetland:Lt("edgeOnly",.5,.5,[1,[16,24]],[.25,.55,.15,.05],.8,Xt,["pools","stream"],[.35,[.2,0,0,.6,.2]],"Open reedy water and mud in the middle, willows crowding the rim; wet and echoing."),stream:Lt("rows",.5,.2,[1,[6,10]],[.3,.45,.2,.05],.5,Xt,["stream","pools"],[.3,[.3,.3,0,.3,.1]],"Alders lining both banks of a pebbly stream, saplings at the water's edge, open grass away from it.",{along:"stream"}),"rocky-slope":Lt("scatter",.35,.6,[1,[8,12]],[.3,.5,.18,.02],.2,[90,.15],["rocky","ridges"],[.5,[.3,.7,0,0,0]],"Scree and boulders with pines clinging in clumps, everything leaning slightly uphill."),bog:Lt("stands",.25,.85,[3,[10,20]],[.4,.5,.1,0],.6,Xt,["pools","mounds"],[.35,[.2,0,0,.5,.3]],"Sphagnum and bog pools, stunted spruce in tight dark stands, cotton grass pale between them."),deadwood:Lt("scatter",.25,.2,[2,[8,14]],[.05,.3,.45,.2],.15,Xt,["ridges","hollows"],[.45,[.3,.1,.3,0,.3]],"Sparse tall blasted snags on bare ridges; bleak, quiet, with long sightlines."),"cave-mouth":Lt("edgeOnly",.4,.5,[1,[10,14]],[.2,.5,.3,0],.2,Xt,["rocky","ridges"],[.4,[.3,.6,0,0,.1]],"Rock walls and dead trees ring an open stone floor that leads to the cave's dark mouth."),grassland:Lt("lone",.1,.5,[0],[.3,.5,.2,0],.2,Xt,["mounds"],[.35,[.3,.2,0,.1,.4]],"Short turf to the horizon, molehills, birches alone or in twos and threes."),"beaver-pond":Lt("edgeOnly",.55,.4,[1,[14,20]],[.4,.45,.15,0],.4,Xt,["pools","stream"],[.4,[.1,0,0,.7,.2]],"A pond in the middle, young birch and aspen round it, gnawed stumps where the big ones were felled."),"log-pile":Lt("groves",.5,.7,[2,[6,10]],null,.7,Xt,["hollows","mounds"],[.3,[.3,0,.4,0,.3]],"Rotting logs heaped in piles, fungi everywhere, damp hollows between the heaps."),heath:Lt("scatter",.2,.3,[1,[12,18]],[.5,.45,.05,0],.8,[30,.6],["ridges","paths"],[.4,[.4,.4,0,0,.2]],"Purple heather and gorse, small birches bent hard by the wind, all the same way."),"old-pinewood":Lt("scatter",.5,.3,[2,[8,14]],[.1,.35,.4,.15],.15,Xt,["mounds","paths"],[.35,[.4,.3,.3,0,0]],"Cathedral-tall old pines on a clear floor of needles; you can see between the trunks a long way."),ravine:Lt("edgeOnly",.55,.6,[1,[6,9]],null,.8,Xt,["stream","ridges","rocky"],[.4,[.3,.5,0,.2,0]],"A deep wet cleft: rock walls and mossy boulders either side, ferns, a stream down the middle."),"bluebell-glade":Lt("groves",.45,.5,[3,[8,14]],[.1,.5,.35,.05],.3,Xt,["hollows"],[.35,[.4,0,.3,.3,0]],"Beech groves round open glades carpeted in bluebells; soft, bright and airy."),"holly-thicket":Lt("thicket",.9,.3,[1,[6,9]],[.3,.6,.1,0],.7,Xt,["hollows"],[.25,[.3,0,.5,0,.2]],"Dark hollies packed close, cobwebs strung between, one clearing round the web-hung tree."),"honeysuckle-tangle":Lt("stands",.6,.7,[2,[5,8]],[.45,.5,.05,0],.8,Xt,["paths","mounds"],[.3,[.3,0,.3,0,.4]],"Hazel coppice stools in clumps, honeysuckle and bramble between, clover paths winding through.")};for(const n of Hs)n.layout=xm[n.id];function Mm(n,e,t=64,i=48){const[s,r,a,o]=n.floor,h=new dt(t,i),c=n.id.length*131;for(let M=0;M<i;M++)for(let x=0;x<t;x++){const m=(Ri(x/7,M/5,c)*(t-x)*(i-M)+Ri((x-t)/7,M/5,c)*x*(i-M)+Ri(x/7,(M-i)/5,c)*(t-x)*M+Ri((x-t)/7,(M-i)/5,c)*x*M)/(t*i),v=m<.38?l.BODY2:m>.64?l.BELLY:l.BODY;h.px(x,M,v,0,-.42,.91)}const d=ha(c),f=(M,x,m)=>h.px((M%t+t)%t,(x%i+i)%i,m,0,-.42,.91),u={moss:0,needles:70,mud:25,stony:30,nettles:60,leaves:80,grass:70,lawn:30,plants:60,roots:30,slate:40,tallgrass:90,flowers:70,pebbles:60,scree:70,earth:15,stone:40,heather:90,bluebells:90,clover:60}[s]??40;for(let M=0;M<u;M++){const x=Math.floor(d()*t),m=Math.floor(d()*i);if(s==="needles"){const v=d()<.5?1:-1;for(let _=0;_<3;_++)f(x+_*v,m+(_>>1),d()<.5?l.BODY2:l.ACCENT)}else if(["grass","lawn","tallgrass","plants","nettles","clover","flowers","bluebells","heather"].includes(s)){const v=s==="tallgrass"?4:s==="lawn"?1:2;for(let _=0;_<v;_++)f(x,m-_,_===v-1?l.LEAF2:l.LEAF);(s==="flowers"||s==="bluebells"||s==="heather"||s==="clover")&&d()<.5&&f(x+1,m-v,l.FLOWER)}else if(["stony","pebbles","scree","slate","stone","roots"].includes(s)){if(f(x,m,l.ACCENT),d()<.6&&f(x+1,m,l.ACCENT),d()<.4&&f(x,m+1,l.BODY2),s==="roots"&&d()<.5)for(let v=0;v<5;v++)f(x+v,m+(v>2?1:0),l.TRUNK)}else if(s==="leaves")f(x,m,l.FLOWER),f(x+1,m,l.FLOWER),d()<.5&&f(x,m+1,l.ACCENT);else if(s==="mud"||s==="earth")for(let v=0;v<3;v++)f(x+v,m,l.BODY2)}const p={flowers:me(.13,.6,.95),bluebells:[90,110,230],heather:[180,90,170],clover:[240,235,240],leaves:me(r+.02,.65,.6)}[s]||me(r,.3,.6),g={[l.BODY]:me(r,a*e.sat,o),[l.BODY2]:me(r+.02,a*e.sat*1.1,o*.78),[l.BELLY]:me(r-.02,a*e.sat*.9,Math.min(1,o*1.15)),[l.ACCENT]:s==="needles"?me(.07,.5,.5):me(.1,.08,.62),[l.FLOWER]:p,[l.LEAF]:me(n.leaf,.55*e.sat,.45),[l.LEAF2]:me(n.leaf-.03,.5*e.sat,.62),[l.TRUNK]:me(e.trunkHue,.4,.3)};return{sp:h,colours:g}}const Ts=n=>({[l.ACCENT]:me(.1,.06,.6),[l.BODY2]:me(.62,.08,.4),[l.BELLY]:me(.1,.05,.78),[l.LEAF]:me(.27,.5,.45),[l.LEAF2]:me(.25,.45,.62),[l.NOSE]:[20,16,24]});function pr(n,e,t,i,s,r,a){const o=[];for(let h=0;h<8;h++){const c=h/8*Math.PI*2,d=1+(r()-.5)*.3;o.push([e[0]+Math.cos(c)*t*d,e[1]+Math.sin(c)*i*d*(Math.sin(c)>0?.5:1)])}n.shape(o,l.ACCENT,{group:5,line:!0,round:s.round}),n.mark([wt(e,[-t,i*.1]),wt(e,[t,i*.1]),wt(e,[t,i]),wt(e,[-t,i])],l.BODY2,[l.ACCENT]),n.mark([wt(e,[-t*.6,-i*.8]),wt(e,[t*.1,-i*1.1]),wt(e,[t*.3,-i*.5]),wt(e,[-t*.3,-i*.3])],l.BELLY,[l.ACCENT]),a&&n.mark(Do([wt(e,[-t*1.1,-i*.55]),wt(e,[0,-i*1.3]),wt(e,[t*1.1,-i*.5]),wt(e,[t*.6,-i*.2]),wt(e,[-t*.6,-i*.2])],0,3,3,i*.15,1),l.LEAF,[l.ACCENT,l.BELLY,l.BODY2])}function eo(n,e,t,i,s,r){const a={[l.LEAF]:me(t.leaf,.6*i.sat,.55),[l.LEAF2]:me(t.leaf-.05,.55*i.sat,.78),[l.LEAF3]:me(t.leaf+.03,.66*i.sat,.36)},o={[l.TRUNK]:me(i.trunkHue,.45*i.sat,.34),[l.BARKD]:me(i.trunkHue+.03,.5*i.sat,.17),[l.BARKL]:me(i.trunkHue-.01,.38*i.sat,.5),[l.BELLY]:me(i.trunkHue+.02,.3,.7)},h={[l.MAGIC]:[60,110,150],[l.MAGIC2]:[150,200,220],[l.BODY2]:[35,70,100]};if(n==="tree"){const M=rh(e.type).fn,x={...i,leafHue:t.leaf+(e.dark?.05:0),gnarl:e.gnarl??i.gnarl,treeBare:e.bare,treeTrunks:e.trunks,treeLean:e.lean,treeThick:e.thick,treeThin:e.thin,treeHollow:e.hollow,treeWebs:e.webs},m=M(s,x,i.treeSize*r*(e.scale||1)*xe(s,.9,1.1)),v=Fo(s,x,M);return e.dark&&(v[l.LEAF]=v[l.LEAF3],v[l.LEAF3]=me(t.leaf+.05,.7,.22)),v[l.NOSE]=[20,16,24],v[l.WEB]=[225,225,232],{sp:m.sp,colours:v}}if(n==="shrub"){const M=mm(s,{...i,leafHue:t.leaf,bushSize:i.bushSize*r,flowers:1});for(let x=0;x<M.sp.m.length;x++)M.sp.m[x]&&je(x,1,3)<(e.spiky?.18:.1)&&M.sp.m[x]!==l.TRUNK&&(M.sp.m[x]=l.FLOWER);return M.colours[l.FLOWER]=e.flower,M}const c=Math.round(48*r*(e.w||1)),d=Math.round(32*r),f=new dt(c,d),u=c/2,p=d;let g={};if(n==="grass"||n==="reeds"||n==="fern"||n==="flowers"||n==="flowerbed"){const M=n==="flowerbed"?40:24,x=(n==="reeds"?e.tall?26:20:n==="fern"?14:10*(e.h||1))*r;n==="flowerbed"&&f.shape([[u-20*r,p-2],[u-18*r,p-6*r],[u+18*r,p-6*r],[u+20*r,p-2],[u+20*r,p],[u-20*r,p]],l.ACCENT,{group:2,line:!0});for(let m=0;m<M;m++){const v=u+xe(s,-16,16)*r,_=x*xe(s,.5,1),w=n==="fern"?xe(s,-6,6)*r:xe(s,-2,2)*r,A=p-1-(n==="flowerbed"?5*r:0);for(let y=0;y<_;y++){const S=y/_;f.px(v+w*S*S,A-y,S>.7?l.LEAF2:S<.3?l.LEAF3:l.LEAF,w*.05,-.3,.9),n==="fern"&&y%2&&f.px(v+w*S*S+(w>0?1:-1),A-y+1,l.LEAF2,0,-.3,.9)}if(n==="reeds"&&(e.cotton||s()<.5))for(let y=0;y<(e.cotton?2:3);y++)f.px(v+w,A-_-y,e.cotton?l.WEB:l.TRUNK,0,-.5,.85);(n==="flowers"||n==="flowerbed")&&s()<.7&&(f.px(v+w,A-_,l.FLOWER,0,-.5,.85),f.px(v+w+1,A-_,l.FLOWER,0,-.5,.85))}if(g={...a,[l.FLOWER]:n==="flowerbed"?Jc(s,[[230,80,120],[250,210,60],[150,110,230]]):me(e.hue??.95,.6,.85),[l.TRUNK]:me(.07,.5,.35),[l.WEB]:[240,240,235],[l.ACCENT]:me(.08,.1,.55)},n==="flowerbed"){for(let m=0;m<f.m.length;m++)f.m[m]===l.FLOWER&&je(m,2,7)<.5&&(f.m[m]=l.BELLY);g[l.BELLY]=[250,245,240]}}else if(n==="stones"){for(let M=0;M<(e.big?3:6);M++)pr(f,[u+xe(s,-14,14)*r,p-(e.big?5:2.5)*r],(e.big?6:3)*r*xe(s,.7,1.2),(e.big?5:2.5)*r,i,s);g=Ts()}else if(n==="boulder")pr(f,[u,p-(e.big?11:8)*r],(e.big?18:13)*r,(e.big?12:9)*r,i,s,e.moss),g={...Ts(),...a,[l.ACCENT]:me(.1,.06,.6)};else if(n==="henge")f.shape([[u-7*r,p],[u-8*r,p-18*r],[u-4*r,p-28*r],[u+5*r,p-27*r],[u+8*r,p-14*r],[u+7*r,p]],l.ACCENT,{group:5,line:!0,round:i.round}),f.mark([[u-9*r,p-30*r],[u+9*r,p-30*r],[u+9*r,p-22*r],[u-9*r,p-18*r]],l.LEAF,[l.ACCENT]),g={...Ts(),...a};else if(n==="mound"){const M=(e.small?8:14)*r,x=(e.small?5:8)*r;f.shape(Do([[u-M,p],[u-M*.6,p-x*.8],[u,p-x],[u+M*.6,p-x*.8],[u+M,p]],0,4,e.moss?3:1,(e.moss?1.5:.8)*r,1),e.moss?l.LEAF:l.TRUNK,{group:5,round:i.round}),f.mark([[u-M,p-x*.45],[u+M,p-x*.45],[u+M,p],[u-M,p]],e.moss?l.LEAF3:l.BARKD,[e.moss?l.LEAF:l.TRUNK]),g={...a,...o,[l.TRUNK]:me(.07,.45,e.brown?.35:.3)}}else if(n==="stump"){const M=6*r;if(f.limb([[u,p,M*2.2],[u,p-8*r,M*1.6]],l.TRUNK,{group:5,round:i.round,cap:0,capEnd:0}),f.shape([[u-M*.8,p-8*r],[u,p-10*r-(e.gnawed?4*r:0)],[u+M*.8,p-8*r],[u,p-7*r]],l.BELLY,{group:6,round:i.round}),e.snag&&f.limb([[u+M*.4,p-8*r,2.5*r],[u+M*1.6,p-15*r,1.5*r]],l.TRUNK,{group:7,round:i.round}),e.grass)for(let x=0;x<20;x++){const m=u+xe(s,-14,14)*r,v=xe(s,6,13)*r;for(let _=0;_<v;_++)f.px(m,p-1-_,_>v*.6?l.LEAF2:l.LEAF,0,-.3,.9)}g={...a,...o}}else if(n==="log"){const M=(e.giant?46:e.branch?18:30)*r,x=(e.giant?14:e.branch?3:8)*r;if(f.limb([[u-M/2,p-x/2,x],[u+M/2,p-x/2-(e.branch?2*r:0),x*.9]],l.TRUNK,{group:5,round:i.round,cap:.3,capEnd:.3}),e.branch||f.shape([[u+M/2-x*.1,p-x],[u+M/2+x*.2,p-x/2],[u+M/2-x*.1,p],[u+M/2-x*.3,p-x/2]],l.BELLY,{group:6,round:i.round}),e.rot)for(let m=0;m<(e.giant?6:3);m++){const v=u+xe(s,-M/2,M/3);f.shape([[v-3*r,p-x*.9],[v,p-x-3*r],[v+3*r,p-x*.9]],l.FLOWER,{group:7,line:!0,round:i.round})}e.branch&&f.limb([[u,p-x,x*.7],[u+5*r,p-x-6*r,x*.4]],l.TRUNK,{group:6,round:i.round}),g={...o,[l.FLOWER]:[230,190,120]}}else if(n==="fungi"){for(let M=0;M<5;M++){const x=u+xe(s,-12,12)*r,m=xe(s,3,7)*r,v=xe(s,3,5)*r;f.limb([[x,p,1.6*r],[x,p-m,1.4*r]],l.BELLY,{group:5}),f.shape([[x-v,p-m],[x,p-m-v*.8],[x+v,p-m]],M%2?l.FLOWER:l.MAGIC,{group:6+M%2,line:!0,round:i.round})}g={[l.BELLY]:[225,215,195],[l.FLOWER]:[190,80,50],[l.MAGIC]:[120,230,200]}}else if(n==="cones"){for(let M=0;M<6;M++){const x=u+xe(s,-14,14)*r,m=p-2*r;f.ellipse(x,m,(e.acorn?1.6:2)*r,(e.acorn?2:2.8)*r,l.TRUNK,{round:i.round}),e.acorn?f.ellipse(x,m-1.6*r,1.8*r,1*r,l.BARKD,{round:i.round}):f.px(x,m-1,l.BARKL)}g=o}else if(n==="water"){const M=22*r*(e.w||1),x=6*r;f.shape([[u-M,p-x],[u-M*.3,p-x*1.5],[u+M*.6,p-x*1.2],[u+M,p-x*.5],[u+M*.4,p],[u-M*.7,p-x*.2]],l.MAGIC,{group:5,round:.2});for(let m=0;m<6;m++){const v=u+xe(s,-M*.6,M*.6),_=p-x*xe(s,.4,1.1);for(let w=0;w<3*r;w++)f.recolour(v+w,_,l.MAGIC2)}g=e.bog?{[l.MAGIC]:[60,70,50],[l.MAGIC2]:[120,130,90]}:h;for(let m=0;m<f.m.length;m++)f.m[m]===l.MAGIC?f.m[m]=l.BODY:f.m[m]===l.MAGIC2&&(f.m[m]=l.BELLY);g={[l.BODY]:g[l.MAGIC],[l.BELLY]:g[l.MAGIC2]}}else if(n==="bramble"||n==="hedge"){const M=22*r,x=(n==="hedge"?18:12)*r;for(let m=0;m<(n==="hedge"?6:4);m++){const v=u+xe(s,-M*.8,M*.8),_=p-x*xe(s,.4,.7);f.ellipse(v,_,xe(s,6,9)*r,x*.45,n==="hedge"?l.LEAF3:l.LEAF,{round:i.round,density:e.bare?.5:.95,noise:.5,seed:m})}for(let m=0;m<8;m++){let _=u+xe(s,-M,M),w=p;for(let A=0;A<x*1.2;A++)_+=Math.sin(A*.3+m)*.8,w-=.8,f.px(_,w,l.TRUNK,0,-.3,.9)}if(n==="hedge"||e.berries||n==="bramble")for(let m=0;m<f.m.length;m++)f.m[m]&&f.m[m]!==l.TRUNK&&je(m,5,9)<.05&&(f.m[m]=l.FLOWER);g={...a,...o,[l.FLOWER]:n==="hedge"?[210,30,40]:[70,30,70]}}else if(n==="wall"){const M=22*r,x=12*r;f.shape([[u-M,p],[u-M,p-x],[u+M,p-x],[u+M,p]],l.ACCENT,{group:5,line:!0,depth:2}),f.shape([[u-M-1,p-x],[u-M-1,p-x-2*r],[u+M+1,p-x-2*r],[u+M+1,p-x]],l.BELLY,{group:6,line:!0,depth:2}),f.shape([[u+M-6*r,p-x-2*r],[u+M-6*r,p-x-7*r],[u+M,p-x-7*r],[u+M,p-x-2*r]],l.ACCENT,{group:7,line:!0,depth:2}),f.ellipse(u+M-3*r,p-x-9*r,3*r,2.5*r,l.BELLY,{round:i.round});for(let m=p-x+3*r;m<p;m+=4*r)for(let v=u-M;v<u+M;v++)f.recolour(v,m,l.BODY2);g=Ts()}else if(n==="rockwall"){for(let M=0;M<5;M++)pr(f,[u+(M-2)*9*r,p-xe(s,8,14)*r],8*r,10*r,i,s,e.moss);g={...Ts(),...a}}else if(n==="stalagmite"){for(let M=0;M<4;M++){const x=u+xe(s,-14,14)*r,m=xe(s,5,11)*r;f.shape([[x-3*r,p],[x-1*r,p-m],[x+1*r,p-m],[x+3*r,p]],l.ACCENT,{group:5,line:!0,round:i.round})}g=Ts()}else if(n==="web"){const M=[u,p-14*r],x=11*r;for(let m=0;m<8;m++){const v=m/8*Math.PI*2;for(let _=0;_<x;_++)f.px(M[0]+Math.cos(v)*_,M[1]+Math.sin(v)*_,l.WEB,0,0,1)}for(let m=3*r;m<x;m+=3*r)for(let v=0;v<Math.PI*2;v+=.05)f.px(M[0]+Math.cos(v)*m,M[1]+Math.sin(v)*m,l.WEB,0,0,1);g={[l.WEB]:[225,230,240]}}return{sp:f,colours:g}}function vm(n,e,t,i,s,r){if(e.three)return rp(n,t,i);if(n==="tree"||n==="log")return eo(n,e,t,i,s,r);const a=Math.round(90*r),o=Math.round(70*r),h=new dt(a,o),c=a/2,d=o;let f={...Ts(),[l.LEAF]:me(t.leaf,.55,.5),[l.LEAF2]:me(t.leaf-.04,.5,.7),[l.TRUNK]:me(i.trunkHue,.45,.34),[l.BARKD]:me(i.trunkHue+.03,.5,.17),[l.MAGIC]:me(i.magicHue,.6,1),[l.MAGIC2]:me(i.magicHue,.2,1)};if(n==="shrine")h.shape([[c-16*r,d],[c-14*r,d-6*r],[c+14*r,d-6*r],[c+16*r,d]],l.ACCENT,{group:5,line:!0,depth:2}),h.shape([[c-9*r,d-6*r],[c-9*r,d-26*r],[c+9*r,d-26*r],[c+9*r,d-6*r]],l.ACCENT,{group:6,line:!0,depth:2}),h.shape([[c-5*r,d-10*r],[c-5*r,d-20*r],[c,d-23*r],[c+5*r,d-20*r],[c+5*r,d-10*r]],l.NOSE,{group:7}),h.shape([[c-13*r,d-26*r],[c,d-34*r],[c+13*r,d-26*r]],l.BODY2,{group:8,line:!0,depth:2}),h.ellipse(c,d-13*r,2.5*r,2.5*r,l.MAGIC2,{round:.5}),h.mark([[c-14*r,d-36*r],[c+2*r,d-36*r],[c-4*r,d-24*r],[c-14*r,d-24*r]],l.LEAF,[l.BODY2,l.ACCENT]);else if(n==="pavilion"){h.shape([[c-26*r,d],[c-26*r,d-4*r],[c+26*r,d-4*r],[c+26*r,d]],l.ACCENT,{group:5,line:!0,depth:2});for(const u of[-20,-7,7,20])h.limb([[c+u*r,d-4*r,4*r],[c+u*r,d-34*r,4*r]],u===-7||u===7?l.BODY2:l.BELLY,{group:6+(u>0?1:0),line:!0,cap:0,capEnd:0});h.shape([[c-28*r,d-34*r],[c-28*r,d-38*r],[c+28*r,d-38*r],[c+28*r,d-34*r]],l.ACCENT,{group:8,line:!0,depth:2}),h.shape([[c-24*r,d-38*r],[c-16*r,d-54*r],[c,d-60*r],[c+16*r,d-54*r],[c+24*r,d-38*r]],l.BELLY,{group:9,line:!0})}else if(n==="bridge"){const u=eo("water",{w:1.8},t,i,s,r);for(let p=0;p<u.sp.m.length;p++){const g=p%u.sp.w,M=p/u.sp.w|0,x=Math.round(c-u.sp.w/2+g),m=d-u.sp.h+M;u.sp.m[p]&&h.inb(x,m)&&h.px(x,m,u.sp.m[p]===l.BODY?l.IRIS:l.PUPIL,0,-.42,.91)}h.limb([[c-34*r,d-6*r,9*r],[c+34*r,d-10*r,8*r]],l.TRUNK,{group:6,line:!0,cap:.3,capEnd:.3}),f[l.IRIS]=[60,110,150],f[l.PUPIL]=[150,200,220]}else if(n==="outcrop")for(const[u,p,g,M]of[[-18,14,16,13],[12,12,18,12],[-2,28,15,13],[16,34,9,9]])pr(h,[c+u*r,d-p*r],g*r,M*r,i,s,!0);else if(n==="cave"){for(const[u,p,g,M]of[[-26,16,16,15],[26,16,16,15],[0,40,30,18],[-12,30,14,12],[12,30,14,12]])pr(h,[c+u*r,d-p*r],g*r,M*r,i,s,p>30);h.shape([[c-15*r,d],[c-14*r,d-18*r],[c-4*r,d-28*r],[c+6*r,d-27*r],[c+14*r,d-16*r],[c+15*r,d]],l.NOSE,{group:9,line:!0})}else if(n==="dam"){const u=eo("water",{w:1.9},t,i,s,r);for(let p=0;p<u.sp.m.length;p++){const g=p%u.sp.w,M=p/u.sp.w|0,x=Math.round(c-u.sp.w/2+g),m=d-u.sp.h+M-10*r;u.sp.m[p]&&h.inb(x,m)&&h.px(x,m,u.sp.m[p]===l.BODY?l.IRIS:l.PUPIL,0,-.42,.91)}for(let p=0;p<26;p++){const g=c+xe(s,-32,32)*r,M=d-xe(s,2,14)*r,x=xe(s,-.5,.5),m=xe(s,8,16)*r;h.limb([[g-Math.cos(x)*m/2,M-Math.sin(x)*m/2,2.6*r],[g+Math.cos(x)*m/2,M+Math.sin(x)*m/2,2*r]],p%3?l.TRUNK:l.BARKD,{group:6+p%2,line:!0})}f[l.IRIS]=[60,110,150],f[l.PUPIL]=[150,200,220]}else if(n==="waterfall"){for(const[u,p,g,M]of[[-22,30,18,30],[22,30,18,30],[0,56,20,12]])pr(h,[c+u*r,d-p*r],g*r,M*r,i,s,!0);for(let u=c-6*r;u<c+6*r;u++)for(let p=d-50*r;p<d-4*r;p++)h.px(u,p,je(u|0,p/3|0,4)<.3?l.PUPIL:l.IRIS,0,-.2,.98);h.shape([[c-18*r,d],[c-14*r,d-6*r],[c+14*r,d-6*r],[c+18*r,d]],l.IRIS,{group:10,round:.2}),f[l.IRIS]=[90,150,190],f[l.PUPIL]=[210,235,245]}return{sp:h,colours:f}}function bm(n,e,{K:t=2/(e.pixel||2),makeCanvas:i=ca}={}){const s=nf[n];if(!s)throw new Error(`no area type "${n}"`);const r=ha(n.split("").reduce((d,f)=>d*31+f.charCodeAt(0),7)>>>0),a=(d,f,u)=>({sp:un(d.sp,d.colours,e,"none",i),kind:f,text:u}),o=Mm(s,e),h=d=>(d||[]).map(([f,u])=>a(eo(f,u,s,e,r,t),f,"")),c={def:s,floor:{sp:un(o.sp,o.colours,e,"none",i),kind:s.floor[0],text:s.text.floor},walls:h(s.wall),small:h(s.small),big:h(s.big),setPiece:null};if(c.walls.forEach(d=>d.text=s.text.wall),c.small.forEach(d=>d.text=s.text.small),c.big.forEach(d=>d.text=s.text.big),s.set){const d=vm(s.set[0],s.set[1],s,e,r,t);c.setPiece={...a(d,s.set[0],s.text.set),metres:d.metres,origin:d.origin}}return c}const ym=[{id:"sapling",range:[.45,.7],weight:.25,count:3},{id:"mature",range:[.85,1.15],weight:.5,count:4},{id:"tall",range:[1.3,1.6],weight:.2,count:2},{id:"giant",range:[1.8,2.2],weight:.05,count:1}],_m=16;function wm(n,e,{K:t=2/(e.pixel||2),makeCanvas:i=ca,ppm:s=_m}={}){const r=nf[n];if(!r)throw new Error(`no area type "${n}"`);const a=(r.big||[]).filter(([u])=>u==="tree").map(([,u])=>u),o=a.filter(u=>!u.minor),h=a.filter(u=>u.minor);if(!a.length)return[];const c=n.split("").reduce((u,p)=>u*31+p.charCodeAt(0),11)>>>0,d=[];let f=0;for(const u of ym)for(let p=0;p<u.count;p++,f++){const g=h.length&&(f===2||f===6)?h[(f===6?1:0)%h.length]:o[f%o.length],M=rh(g.type),x=M.fn,m=ha(c*7+f*131+3),v=u.count>1?u.range[0]+(u.range[1]-u.range[0])*p/(u.count-1):(u.range[0]+u.range[1])/2,_=u.id==="sapling",w=u.id==="tall"||u.id==="giant",A=M.grow,y=A==="willow",S=A==="narrow"||g.bare,b=A==="wide",C=y?1+(v-1)*.45:A==="small"?1+(v-1)*.5:b?1+(v-1)*.75:v,T=(_?.78:1)*(y?1+Math.max(0,v-1)*.55:b?1+Math.max(0,v-1)*.45:S&&w?g.bare?.6:.85:w?1.06:1),R={...e,crownWidth:(e.crownWidth||3)*T,leafHue:r.leaf+(g.dark?.05:0),gnarl:Math.min(1,(g.gnarl??e.gnarl)+(u.id==="giant"?.2:0)),treeBare:g.bare,treeTrunks:_?1:g.trunks,treeLean:g.lean,treeThick:_?void 0:w&&g.thick?g.thick*1.1:g.thick,treeThin:_||g.thin,treeHollow:w&&g.hollow,treeWebs:g.webs},O=x(m,R,e.treeSize*t*(g.scale||1)*C*xe(m,.95,1.05)),I=Fo(m,R,x);g.dark&&(I[l.LEAF]=I[l.LEAF3],I[l.LEAF3]=me(r.leaf+.05,.7,.22)),I[l.NOSE]=[20,16,24],I[l.WEB]=[225,225,232];const k=tf(O),U=ne=>un(ne,I,e,"none",i),W=ne=>+(ne/s).toFixed(2);d.push({heightClass:u.id,species:g.type,scale:+C.toFixed(2),weight:+(u.weight/u.count).toFixed(4),whole:U(O.sp),top:U(k.top),bot:U(k.bot),crownY:O.crownY,metres:{height:W(O.sp.h),crownBase:W(O.sp.h-O.crownY),crownHeight:W(O.crownY),crownRadius:W(O.sp.w/2)}})}return d}const Sm={[l.ACCENT]:[150,145,140],[l.BODY2]:[95,92,100],[l.TRUNK]:[110,70,40],[l.BARKD]:[60,38,24],[l.MAGIC]:[255,130,40],[l.MAGIC2]:[255,228,120],[l.NOSE]:[30,24,26]};function Em(n){const e=new Qe({blend:.02});for(let s=0;s<9;s++){const r=s/9*Math.PI*2;e.ell([Math.cos(r)*.32,.05,Math.sin(r)*.32],[.09,.06,.08],s%3?l.ACCENT:l.BODY2,{dir:[-Math.sin(r),0,Math.cos(r)],group:1+s})}e.seg([-.22,.06,-.12],[.22,.1,.12],.05,.045,l.TRUNK,{group:20,paint:s=>s[0]>.12?l.BARKD:void 0}),e.seg([-.2,.1,.14],[.2,.06,-.14],.05,.045,l.TRUNK,{group:21,paint:s=>s[0]<-.12?l.BARKD:void 0});const t=[[.42,.3,.34],[.36,.4,.28],[.46,.32,.38]][n%3];[[-.05,0,t[0]],[.08,.06,t[1]],[-.02,-.08,t[2]]].forEach(([s,r,a],o)=>e.flat([s,.1+a*.5,r],[1,0,.3],[((n+o)%3-1)*.1,1,0],a*.38,a*.5,Fs.flame(l.MAGIC,l.MAGIC2),{group:30+o,bend:.1}));const i=cn(e,{height:34}).sp;for(let s=0;s<4;s++){const r=Math.floor(i.w/2+Math.sin(s*2.3+n)*i.w*.25),a=Math.floor(i.h*(.12+s*.08));i.get(r,a)||i.px(r,a,l.MAGIC2)}return i}const to={cyan:[[70,230,255],[200,250,255]],violet:[[190,100,255],[235,210,255]],green:[[90,255,140],[215,255,220]]};function sf(n,e){const t=new Qe({blend:.04}),i=Object.keys(to).indexOf(n),s=.08,r=.4,a=[Math.cos(r),0,-Math.sin(r)],o=P.norm([Math.sin(r),.22,Math.cos(r)]),h=P.norm(P.cross(o,a)),c=[0,.46,0],d=[[[.2-i*.05,.92],[.14,.8],[.19,.7],[.12,.58]],[[-.22+i*.03,.05],[-.17,.16],[-.21,.25]]],f=(x,m)=>d.some(v=>v.some((_,w)=>{const A=v[w+1];if(!A)return!1;const y=A[0]-_[0],S=A[1]-_[1],b=Math.max(0,Math.min(1,((x-_[0])*y+(m-_[1])*S)/(y*y+S*S)));return Math.hypot(x-_[0]-y*b,m-_[1]-S*b)<.014})),u=x=>{const m=P.sub(x,c),v=[P.dot(m,a),P.dot(m,h)+.46,P.dot(m,o)];if(v[2]>s-.02){const _=(v[0]+.17)/.34,w=(.8-v[1])/.5;if(e){const A=(v[0]+.27)/.54,y=(.8-v[1])/.58;if(A>=0&&A<=1&&y>=0&&y<=1&&jd(e,A,y,.055))return l.RUNE}else if(_>=0&&_<=1&&w>=0&&w<=1&&Rr(_,w,i+1,.1))return l.RUNE}if(f(v[0],v[1]))return l.STONED;if(v[1]>.86&&je(Math.floor(v[0]*30),Math.floor(v[2]*30),3)<.3||v[1]<.12&&je(Math.floor(v[0]*35),Math.floor(v[1]*35)+Math.floor(v[2]*35)*7,5)<.55)return l.MOSS};t.box(c,[.28,.46,s],l.STONE,{group:1,axes:[a,h,o],round:.06,paint:u}),t.box(P.add(P.add(c,P.mul(h,.53)),P.mul(a,.2)),[.3,.12,.2],l.STONE,{group:1,dir:P.add(a,P.mul(h,.35)),up:h,cut:!0,paint:u});for(const[x,m,v]of[[-.24,.14,.08],[.2,.02,.07],[0,.12,.07]])t.ell([x,.015,m],[v,v*.4,v],l.MOSS,{group:2});for(let x=0;x<9;x++){const m=-.3+x*.07,v=.12+x%3*.025-x*.02,_=.07+x*37%5/60;t.seg([m,0,v],[m+(x%3-1)*.02,_,v+.01],.012,.004,x%3?l.LEAF:l.LEAF2,{group:10+x})}const p={[l.STONE]:[132,134,142],[l.STONED]:[70,70,80],[l.MOSS]:[86,120,62],[l.LEAF]:[80,125,60],[l.LEAF2]:[130,160,80],[l.RUNE]:to[n][0],[l.MAGIC2]:to[n][1],[l.LINE]:[40,40,50]},g=cn(t,{height:44}).sp;let M=0;for(let x=0;x<600&&M<5;x++){const m=Math.floor(je(x,i,9)*g.w),v=Math.floor(je(x,i,10)*g.h*.8);g.get(m,v)||g.get(m+1,v)||g.get(m-1,v)||g.get(m,v+1)||g.get(m,v-1)||(g.px(m,v,M%2?l.RUNE:l.MAGIC2),M++)}return{sp:g,colours:p}}function Am(){const n=new Qe({blend:.03});n.ell([0,0,0],[.62,.025,.38],l.WATER,{group:1,paint:t=>Math.hypot(t[0]/.62,t[2]/.38)>.88?l.BODY2:void 0});for(let t=0;t<16;t++){const i=Math.PI*(.85+t/15*.9),s=Math.cos(i)*.6,r=Math.sin(i)*.36,a=.18+t*37%10/40;n.seg([s,0,r],[s+(t%3-1)*.02,a,r],.012,.006,t%4?l.LEAF:l.LEAF2,{group:10+t})}for(const[t,i,s]of[[.5,.2,.07],[.45,-.25,.05],[-.2,.35,.06]])n.ell([t,.02,i],[s,s*.5,s],l.ACCENT,{group:30});return{sp:cn(n,{height:22}).sp,colours:{[l.WATER]:[40,70,95],[l.BODY2]:[70,60,45],[l.LEAF]:[80,125,60],[l.LEAF2]:[130,160,80],[l.ACCENT]:[130,128,125]}}}function Tm(n,{glow:e="cyan",sigil:t,makeCanvas:i=ca}={}){const s=sf(e,t);return un(s.sp,s.colours,n,"none",i)}function Rm(n,{makeCanvas:e=ca}={}){const t=(c,d)=>un(c,d,n,"none",e),i={campfire:[0,1,2].map(c=>t(Em(c),Sm)),stones:{},pond:null};for(const c of Object.keys(to)){const d=sf(c);i.stones[c]=t(d.sp,d.colours)}const s=Am(),r=t(s.sp,s.colours),a=e(s.sp.w,s.sp.h),o=a.getContext("2d"),h=o.createImageData(s.sp.w,s.sp.h);for(let c=0;c<s.sp.m.length;c++)s.sp.m[c]===l.WATER&&h.data.set([255,255,255,255],c*4);return o.putImageData(h,0,0),r.mask=a,i.pond=r,i}function Cm(n,e){const t=new Map,i=new Map,s=(h,c,d)=>(h*2097152+(c+1048576))*2097152+(d+1048576),r=(h,c,d)=>{const f=s(h,c,d);let u=t.get(f);if(!u){const p=Math.pow(2,-h);u=[p*(c+we(c*7+h,d,n)),p*(d+we(c,d*13+h,n+1))],t.set(f,u)}return u},a=(h,c,d)=>{const f=Math.pow(2,-h),u=Math.floor(c/f),p=Math.floor(d/f);let g=u,M=p,x=1/0;for(let m=-2;m<=2;m++)for(let v=-2;v<=2;v++){const _=r(h,u+m,p+v),w=(_[0]-c)**2+(_[1]-d)**2;w<x&&(x=w,g=u+m,M=p+v)}return[g,M]},o=(h,c,d)=>{const f=s(h,c,d);let u=i.get(f);if(u)return u;if(h===0)u=[c,d];else{const p=r(h,c,d),g=a(h-1,p[0],p[1]);u=o(h-1,g[0],g[1])}return i.set(f,u),u};return{seed:n,depth:e,site:(h,c)=>r(0,h,c),partition(h,c){const d=a(e,h,c);return o(e,d[0],d[1])},centreness(h,c,d){const f=r(0,d[0],d[1]),u=Math.hypot(h-f[0],c-f[1]);let p=1/0;const g=Math.floor(h),M=Math.floor(c);for(let x=-2;x<=2;x++)for(let m=-2;m<=2;m++){const v=g+x,_=M+m;if(v===d[0]&&_===d[1])continue;const w=r(0,v,_);p=Math.min(p,Math.hypot(h-w[0],c-w[1]))}return Math.min(1,2*u/(u+p))},openness(h,c){let d=1/0,f=1/0;const u=Math.floor(h),p=Math.floor(c);for(let g=-2;g<=2;g++)for(let M=-2;M<=2;M++){const x=r(0,u+g,p+M),m=Math.hypot(h-x[0],c-x[1]);m<d?(f=d,d=m):m<f&&(f=m)}return Math.min(1,2*d/(d+f))}}}const Zo=["playing","damaged","destroyed"],rf=n=>n.dancefloor.radius*n.dancefloor.speakers.radiusFactor,Ws=n=>rf(n)+n.dancefloor.speakers.footprint+n.dancefloor.clearing;function Lm(n,e){const t=e.dancefloor.speakers,i=rf(e),s=[];for(let r=0;r<t.count;r++){const a=t.start+360/t.count*r,o=a*Math.PI/180;s.push({x:n.x+Math.sin(o)*i,z:n.z+Math.cos(o)*i,ring:a})}return s}const Pm=n=>Zo[(Zo.indexOf(n)+1)%Zo.length];function iu(n,e){const t=[],i=[n[0],...n,n[n.length-1]];for(let s=1;s<i.length-2;s++){const[r,a,o,h]=[i[s-1],i[s],i[s+1],i[s+2]],c=Math.hypot(o[0]-a[0],o[1]-a[1]),d=Math.max(1,Math.ceil(c/e));for(let f=0;f<d;f++){const u=f/d,p=u*u,g=p*u,M=(x,m,v,_)=>.5*(2*m+(-x+v)*u+(2*x-5*m+4*v-_)*p+(-x+3*m-3*v+_)*g);t.push([M(r[0],a[0],o[0],h[0]),M(r[1],a[1],o[1],h[1])])}}return t.push(n[n.length-1]),t}const Dm=new Set(["stream","wetland","bog","beaver-pond"]);class Im{constructor(e){this.map=e;const t=e.tuning.paths,i=e.extent,s=Ii(e.seed*7+4242),r=i.maxX-i.minX,a=i.maxZ-i.minZ,o=(g,M)=>g===0?[i.minX+M*r,i.minZ]:g===1?[i.maxX,i.minZ+M*a]:g===2?[i.minX+M*r,i.maxZ]:[i.minX,i.minZ+M*a],h=(g,M,x,m)=>{const v=M[0]-g[0],_=M[1]-g[1],w=Math.hypot(v,_),A=Math.max(2,Math.round(w/x)),y=[g];let S=0;for(let b=1;b<A;b++){S=Dn(S+(s()-.5)*m,-m,m);const E=b/A;y.push([Dn(g[0]+v*E-_/w*S,i.minX,i.maxX),Dn(g[1]+_*E+v/w*S,i.minZ,i.maxZ)])}return y.push(M),iu(y,3)},c=t.rails[0]+Math.floor(s()*(t.rails[1]-t.rails[0]+1));for(let g=0;g<c;g++){const M=Math.floor(s()*4),x=(M+2+(s()<.3?s()<.5?1:-1:0)+4)%4,m=h(o(M,.15+s()*.7),o(x,.15+s()*.7),320,140);if(this.lines.push({kind:"rail",pts:m,half:t.railHalf}),g===0&&m.length>20){const v=Math.floor(m.length*(.3+s()*.4)),_=m[v],w=Math.floor(s()*4),A=h(_,o(w,.2+s()*.6),300,120);this.lines.push({kind:"rail",pts:A,half:t.railHalf});const y=m[v+1][0]-_[0],S=m[v+1][1]-_[1],b=Math.hypot(y,S)||1,E=A[Math.min(A.length-1,6)],C=y*(E[1]-_[1])-S*(E[0]-_[0]);this.junctions.push({x:_[0],z:_[1],dx:y/b,dz:S/b,side:C>=0?1:-1,line:this.lines.length-2})}}const d=t.roads[0]+Math.floor(s()*(t.roads[1]-t.roads[0]+1));for(let g=0;g<d;g++){const M=Math.floor(s()*4),x=(M+2)%4;this.lines.push({kind:"road",pts:h(o(M,.1+s()*.8),o(x,.1+s()*.8),240,110),half:t.roadHalf})}const f=t.streams[0]+Math.floor(s()*(t.streams[1]-t.streams[0]+1));for(let g=0;g<f;g++){const M=Math.floor(s()*4),x=(M+2)%4;this.lines.push({kind:"stream",pts:h(o(M,.1+s()*.8),o(x,.1+s()*.8),90,70),half:t.streamHalf})}const u=(g,M)=>Dm.has(vt[e.typeOf(g,M)].id);for(const[g,M]of e.neighbours){const[x,m]=g.split(",").map(Number);if(u(x,m))for(const v of M){const[_,w]=v.split(",").map(Number);if(g>v||!u(_,w))continue;const[A,y]=this.trim(e.siteOf(x,m),e.siteOf(_,w),this.clearOf(x,m),this.clearOf(_,w));A&&this.lines.push({kind:"stream",pts:this.meander(A,y,s),half:t.streamHalf})}}const p=new Set;for(const[g,M]of e.neighbours){const[x,m]=g.split(",").map(Number);for(const v of M){const _=g<v?`${g}|${v}`:`${v}|${g}`;if(p.has(_))continue;p.add(_);const[w,A]=v.split(",").map(Number);if(w<0||A<0||w>=e.n||A>=e.n||we(x*31+w,m*31+A,e.seed+811)>t.linkChance)continue;const[y,S]=this.trim(e.siteOf(x,m),e.siteOf(w,A),this.clearOf(x,m),this.clearOf(w,A));y&&this.lines.push({kind:"path",pts:this.meander(y,S,s),half:t.pathHalf})}if(we(x,m,e.seed+813)<t.deadEndChance){const v=e.siteOf(x,m),_=s()*Math.PI*2,w=30+s()*40,A=this.clearOf(x,m),y={x:v.x+Math.cos(_)*A,z:v.z+Math.sin(_)*A};this.lines.push({kind:"path",pts:this.meander(y,{x:y.x+Math.cos(_)*w,z:y.z+Math.sin(_)*w},s),half:t.pathHalf,deadEnd:!0})}}this.lines.forEach((g,M)=>{const x=e.areaAt(g.pts[0][0],g.pts[0][1]);g.area={cell:[x.cell[0],x.cell[1]],type:x.type};for(let m=0;m<g.pts.length-1;m++){const[v,_]=[g.pts[m],g.pts[m+1]],w=g.half+4;for(let A=Math.floor((Math.min(v[0],_[0])-w)/this.cell);A<=Math.floor((Math.max(v[0],_[0])+w)/this.cell);A++)for(let y=Math.floor((Math.min(v[1],_[1])-w)/this.cell);y<=Math.floor((Math.max(v[1],_[1])+w)/this.cell);y++){const S=`${A},${y}`;let b=this.grid.get(S);b||this.grid.set(S,b=[]),b.push([M,m])}}})}map;lines=[];pieces=[];junctions=[];pieceGrid=new Map;grid=new Map;cell=24;placePieces(){const e=this.map,t=e.seed,i=e.tuning.paths,s=(f,u,p,g)=>{if(e.hardClear(u,p)||e.reserved(u,p,g)||this.pieces.some(v=>Math.hypot(v.x-u,v.z-p)<Math.max(i.pieceGap,v.r+g)))return;const M={id:f,x:u,z:p,r:g};this.pieces.push(M);const x=`${Math.floor(u/this.cell)},${Math.floor(p/this.cell)}`;let m=this.pieceGrid.get(x);m||this.pieceGrid.set(x,m=[]),m.push(M)},r=(f,u,p)=>{const g=f.pts[u],M=f.pts[Math.min(f.pts.length-1,u+1)],x=M[0]-g[0],m=M[1]-g[1],v=Math.hypot(x,m)||1;return[g[0]-m/v*p,g[1]+x/v*p]};this.lines.forEach((f,u)=>{let p=0,g=!1;for(let M=1;M<f.pts.length;M++){const[x,m]=f.pts[M],v=Math.hypot(x-f.pts[M-1][0],m-f.pts[M-1][1]);if(p+=v,f.kind==="rail"){const _=this.railBroken(x,m);if(_&&!g&&we(u,M,t+841)<.5&&s("buffer-stop",x,m,4),g=_,p>=i.landmarkSpacing){p=0;const w=we(u,M,t+843);if(w<i.landmarkChance){const A=["goods-wagon","carriage","platform","signal-gantry"];s(A[Math.floor(we(u,M,t+845)*A.length)],x,m,7)}else w<i.landmarkChance+.3&&!_&&s("signal-post",...r(f,M,f.half-.6),1.2)}}else f.kind==="road"&&p>=i.vergeSpacing&&(p=0,s("verge-post",...r(f,M,(we(u,M,t+847)<.5?1:-1)*(f.half-.7)),.8))}});const a=new Set(["ravine","rocky-slope","cave-mouth","stone-shrine"]),o=[];for(let f=0;f<e.n;f++)for(let u=0;u<e.n;u++)a.has(vt[e.typeOf(u,f)].id)&&o.push([u,f,we(u,f,t+849)]);o.sort((f,u)=>f[2]-u[2]);let h=0;const c=["stairs","stairs-turn"];for(const[f,u]of o){if(h>=c.length)break;const p=e.siteOf(f,u),g=we(f,u,t+851)*Math.PI*2,M=this.clearOf(f,u)+4;for(let x=0;x<12;x++){const m=g+x/12*Math.PI*2,v=p.x+Math.cos(m)*M,_=p.z+Math.sin(m)*M,w=e.areaAt(v,_).cell;if(w[0]!==f||w[1]!==u||this.at(v,_,3))continue;const A=this.pieces.length;if(s(c[h],v,_,3),this.pieces.length>A){h++;break}}}const d=new Set;this.lines.forEach((f,u)=>{if(!(f.kind!=="path"&&f.kind!=="road"))for(let p=0;p<f.pts.length-1;p++){const g=f.pts[p],M=f.pts[p+1],x=`${Math.floor(g[0]/this.cell)},${Math.floor(g[1]/this.cell)}`;for(const[m,v]of this.grid.get(x)??[]){const _=this.lines[m];if(_.kind!=="stream"&&!(_.kind==="rail"&&f.kind==="road"))continue;const w=_.pts[v],A=_.pts[v+1],y=Om(g,M,w,A);if(!y)continue;const S=`${u}|${m}|${Math.round(y[0]/20)},${Math.round(y[1]/20)}`;d.has(S)||(d.add(S),_.kind==="stream"?s(f.kind==="road"||we(u,m,t+853)<.5?"footbridge":"rope-bridge",y[0],y[1],4):s("level-crossing",...r(f,p,f.half+.8),2))}}})}pieceAt(e,t){for(const i of this.pieceGrid.get(`${Math.floor(e/this.cell)},${Math.floor(t/this.cell)}`)??[])if(Math.hypot(i.x-e,i.z-t)<i.r)return i;for(let i=-1;i<=1;i++)for(let s=-1;s<=1;s++)if(!(!i&&!s)){for(const r of this.pieceGrid.get(`${Math.floor(e/this.cell)+i},${Math.floor(t/this.cell)+s}`)??[])if(Math.hypot(r.x-e,r.z-t)<r.r)return r}return null}clearOf(e,t){const i=this.map;return e===i.centreCell[0]&&t===i.centreCell[1]?Ws(i.tuning)+2:i.tuning.setPieceClear*i.tuning.setPieceScale+2}trim(e,t,i,s){const r=t.x-e.x,a=t.z-e.z,o=Math.hypot(r,a);return o<i+s+10?[null,t]:[{x:e.x+r/o*i,z:e.z+a/o*i},{x:t.x-r/o*s,z:t.z-a/o*s}]}meander(e,t,i){const s=t.x-e.x,r=t.z-e.z,a=Math.max(1,Math.hypot(s,r)),o=Math.max(2,Math.round(a/25)),h=[[e.x,e.z]],c=Math.min(18,a*.15),d=i()<.5?1:-1;for(let f=1;f<o;f++){const u=f/o,p=c*(.4+.6*i())*(f%2?d:-d);h.push([e.x+s*u-r/a*p,e.z+r*u+s/a*p])}return h.push([t.x,t.z]),iu(h,2)}at(e,t,i=0){const s=this.grid.get(`${Math.floor(e/this.cell)},${Math.floor(t/this.cell)}`);if(!s)return null;let r=null;for(const[a,o]of s){const h=this.lines[a],[c,d]=[h.pts[o],h.pts[o+1]],f=d[0]-c[0],u=d[1]-c[1],p=f*f+u*u||1,g=Dn(((e-c[0])*f+(t-c[1])*u)/p,0,1),M=Math.hypot(e-c[0]-f*g,t-c[1]-u*g);M>h.half+i||(!r||M-h.half<r.d-this.lines[r.line].half)&&(r={kind:h.kind,line:a,d:M,seg:o})}return r}clearance(e,t){if(this.pieces.length&&this.pieceAt(e,t))return{trees:0,bushes:0};const i=this.map.tuning.paths,s=this.at(e,t,i.edgeBushes);if(!s)return{trees:1,bushes:1};const r=this.lines[s.line].half;return s.d>r?{trees:1,bushes:i.bushBoost}:s.kind==="rail"&&this.railBroken(e,t)?{trees:i.treesOnBroken,bushes:1}:{trees:0,bushes:0}}railBroken(e,t){return pi(e/60,t/60,this.map.seed+817)<this.map.tuning.paths.railBroken}}function Om(n,e,t,i){const s=[e[0]-n[0],e[1]-n[1]],r=[i[0]-t[0],i[1]-t[1]],a=s[0]*r[1]-s[1]*r[0];if(Math.abs(a)<1e-9)return null;const o=((t[0]-n[0])*r[1]-(t[1]-n[1])*r[0])/a,h=((t[0]-n[0])*s[1]-(t[1]-n[1])*s[0])/a;return o>=0&&o<=1&&h>=0&&h<=1?[n[0]+s[0]*o,n[1]+s[1]*o]:null}const Nm=z0.types,vt=Hs.map(n=>({id:n.id,name:n.name,creature:n.creature,text:n.text,setPiece:n.set?n.text.set??"a set piece":"",hasWalls:!!n.wall?.length,floor:[n.floor[1],n.floor[2],n.floor[3]],treeDensity:Nm[n.id]?.treeDensity??1,layout:n.layout??{pattern:"scatter",density:.6,clump:.3,undergrowth:.5}})),zn=(n,e)=>n+","+e;function Fm(n){if(n==null||n.trim()==="")return null;const e=n.trim();if(/^\d{1,9}$/.test(e))return Number(e);let t=2166136261;for(let i=0;i<e.length;i++)t=Math.imul(t^e.charCodeAt(i),16777619);return(t>>>0)%1e9}function km(n,e,t,i){const s=new Map,r=(h,c)=>{if(h[0]===c[0]&&h[1]===c[1])return;const d=zn(h[0],h[1]),f=zn(c[0],c[1]);s.has(d)||s.set(d,new Set),s.has(f)||s.set(f,new Set),s.get(d).add(f),s.get(f).add(d)},a=(t-e)*i;let o=[];for(let h=0;h<=a;h++){const c=[];for(let d=0;d<=a;d++){const f=n.partition(e+d/i,e+h/i);c.push(f),d>0&&r(f,c[d-1]),h>0&&r(f,o[d])}o=c}return s}function Um(n,e){const t=e.mapAreas,i=2,s=e.areaSize*e.areaScale,r=vt.length,a=3,o=Math.max(0,Math.min(1,e.areaSizeVariance))*a*.3,h=(H,Z)=>{const fe=H/s,he=Z/s;return[fe+o*(pi(fe/a,he/a,n+91)-.5)*2,he+o*(pi(fe/a,he/a,n+92)-.5)*2]},c=(H,Z)=>{let fe=H*s,he=Z*s;for(let $=0;$<30;$++){const[le,ve]=h(fe,he);fe+=(H-le)*s,he+=(Z-ve)*s}return[fe,he]},d=Cm(n,e.borderLayers),f=-i,u=t+i,p=km(d,f,u,6),g=new Map,M=Ii(n*5+1);for(let H=f;H<u;H++)for(let Z=f;Z<u;Z++){const fe=new Set;for(let le=-2;le<=2;le++)for(let ve=-2;ve<=2;ve++){const Ie=g.get(zn(Z+ve,H+le));Ie!==void 0&&fe.add(Ie)}for(const le of p.get(zn(Z,H))??[]){const ve=g.get(le);ve!==void 0&&fe.add(ve)}const he=[...Array(r).keys()].filter(le=>!fe.has(le)),$=he.length?he:[...Array(r).keys()];g.set(zn(Z,H),$[Math.floor(M()*$.length)])}const x=(H,Z)=>g.get(zn(H,Z))??Math.floor(we(H,Z,n+17)*r),m=Math.floor(t/2),v=(H,Z)=>{const fe=d.site(H,Z),he=d.partition(fe[0],fe[1]);return he[0]===H&&he[1]===Z};let _=[m,m];for(const[H,Z]of[[0,0],[1,0],[0,1],[-1,0],[0,-1],[1,1],[-1,1],[1,-1],[-1,-1]])if(v(m+H,m+Z)){_=[m+H,m+Z];break}const w=(H,Z)=>{const fe=d.site(H,Z),he=c(fe[0],fe[1]);return{x:he[0],z:he[1]}},A=w(_[0],_[1]),y=(H,Z)=>{const[fe,he]=h(H,Z),$=d.partition(fe,he);return{cell:$,type:x($[0],$[1]),openness:d.openness(fe,he)}},S=(H,Z)=>!!vt[x(H,Z)].setPiece&&!(H===_[0]&&Z===_[1])&&we(H,Z,n+61)<e.setPieceChance;let b=null;const E=(H,Z)=>{if(!b){b=new Map;const he=[];for(let $=0;$<t;$++)for(let le=0;le<t;le++)S(le,$)&&he.push([le,$,Math.hypot(le-_[0],$-_[1])+we(le,$,n+63)*.5]);he.sort(($,le)=>$[2]-le[2]);for(const[$,le]of he){const ve=x($,le);!b.has(ve)&&re($,le)&&b.set(ve,zn($,le))}}const fe=x(H,Z);return b.get(fe)===zn(H,Z)?vt[fe].setPiece:null},C=e.dancefloor.radius,T=Ws(e),R=(H,Z,fe,he)=>{const $=y(H,Z).cell;return $[0]===fe&&$[1]===he},O=new Map,I=(H,Z)=>{const fe=zn(H,Z),he=O.get(fe);if(he)return he;const $=w(H,Z),le=Ii(n*17+H*53+Z*911);let[ve,Ie]=[$.x,$.z];if(!R($.x,$.z,H,Z))e:for(let Fe=2;Fe<s*.75*1.5;Fe+=2)for(let He=0;He<16;He++){const z=He/16*Math.PI*2,$e=$.x+Math.cos(z)*Fe,Be=$.z+Math.sin(z)*Fe;if(R($e,Be,H,Z)){[ve,Ie]=[$e,Be];break e}}let Ve={x:ve,z:Ie};for(let Fe=0;Fe<24;Fe++){const He=le()*Math.PI*2,z=3+le()*4,$e=ve+Math.cos(He)*z,Be=Ie+Math.sin(He)*z+3;if(R($e,Be,H,Z)){Ve={x:$e,z:Be};break}}const Ke=(Fe,He)=>!!ee.paths.at(Fe,He,e.soundsystemFootprint+1);if(Ke(Ve.x,Ve.z))e:for(let Fe=3;Fe<s*.3;Fe+=3)for(let He=0;He<16;He++){const z=He/16*Math.PI*2,$e=Ve.x+Math.cos(z)*Fe,Be=Ve.z+Math.sin(z)*Fe;if(R($e,Be,H,Z)&&!Ke($e,Be)){Ve={x:$e,z:Be};break e}}return O.set(fe,Ve),Ve},k=e.treehouse,U=k.angle*Math.PI/180,W={x:A.x+Math.cos(U)*(T+k.distance),z:A.z+Math.sin(U)*(T+k.distance)},ne=new Map,K=(H,Z)=>E(H,Z)?re(H,Z):null,re=(H,Z)=>{const fe=zn(H,Z);if(ne.has(fe))return ne.get(fe);let he=null;if(S(H,Z)){const $=e.setPieceFootprint*e.setPieceScale,le=e.reserveMargin,ve=[zn(H,Z),...p.get(zn(H,Z))??[]].map(Ke=>{const[Fe,He]=Ke.split(",").map(Number);return I(Fe,He)}),Ie=(Ke,Fe)=>R(Ke,Fe,H,Z)&&ve.every(He=>Math.hypot(Ke-He.x,Fe-He.z)>=$+e.soundsystemFootprint+le)&&Math.hypot(Ke-A.x,Fe-A.z)>=$+T+le&&Math.hypot(Ke-W.x,Fe-W.z)>=$+k.clear+le&&!ee.paths.at(Ke,Fe,$),Ve=w(H,Z);e:for(let Ke=0;Ke<=s*.35;Ke+=3)for(let Fe=0;Fe<(Ke?16:1);Fe++){const He=Fe/16*Math.PI*2,z=Ve.x+Math.cos(He)*Ke,$e=Ve.z-4+Math.sin(He)*Ke;if(Ie(z,$e)){he={x:z,z:$e};break e}}}return ne.set(fe,he),he},N=[],te=(H,Z,fe)=>{const he=e.reserveMargin,$=y(H,Z).cell;if(Math.hypot(H-A.x,Z-A.z)<fe+T+he||Math.hypot(H-W.x,Z-W.z)<fe+k.clear+he)return!0;for(const le of N)if(Math.hypot(H-le.x,Z-le.z)<fe+le.r+he)return!0;for(const le of[zn($[0],$[1]),...p.get(zn($[0],$[1]))??[]]){const[ve,Ie]=le.split(",").map(Number);if(!(ve===_[0]&&Ie===_[1])){const Ke=I(ve,Ie);if(Math.hypot(H-Ke.x,Z-Ke.z)<fe+e.soundsystemFootprint+he)return!0}const Ve=K(ve,Ie);if(Ve&&Math.hypot(H-Ve.x,Z-Ve.z)<fe+e.setPieceFootprint*e.setPieceScale+he)return!0}return!1},ae=(H,Z,fe)=>{if(Math.hypot(H-A.x,Z-A.z)<T||Math.hypot(H-W.x,Z-W.z)<k.clear)return!0;for(const le of N)if(Math.abs(H-le.x)<le.r&&Math.abs(Z-le.z)<le.r&&Math.hypot(H-le.x,Z-le.z)<le.r)return!0;const he=K(fe[0],fe[1]);if(he&&Math.hypot(H-he.x,Z-he.z)<e.setPieceClear*e.setPieceScale)return!0;if(fe[0]===_[0]&&fe[1]===_[1])return!1;const $=I(fe[0],fe[1]);return Math.hypot(H-$.x,Z-$.z)<e.soundsystemFootprint+e.treeMarginFromSoundsystem},pe=(H,Z)=>{const[fe,he]=h(H,Z);return ae(H,Z,d.partition(fe,he))},be=(H,Z)=>{const[fe,he]=h(H,Z);if(ae(H,Z,d.partition(fe,he)))return 0;const $=1-ln((pi(H/e.gladeScale,Z/e.gladeScale,n+61)-(1-e.gladeAmount))/.12);return ln((d.openness(fe,he)-e.clearingSize)/Math.max(.01,e.clearingFalloff))*$},Pe=(H,Z)=>Math.min(1,Math.hypot(H-_[0],Z-_[1])/(t/2)),q=s*.5,ee={seed:n,tuning:e,n:t,margin:i,areaSize:s,partition:d,centreCell:_,dancefloor:{x:A.x,z:A.z,radius:C,speakers:Lm(A,e)},treehouse:W,grounds:N,start:{x:W.x,z:W.z+1},bounds:{minX:q,maxX:t*s-q,minZ:q,maxZ:t*s-q},extent:{minX:f*s,maxX:u*s,minZ:f*s,maxZ:u*s},typeOf:x,areaAt:y,siteOf:w,treeWeight:be,hardClear:pe,neighbours:p,setPieceOf:E,soundsystemSpot:I,setPieceSpot:K,reserved:te,remoteness:Pe,paths:null};ee.paths=new Im(ee);const B=e.grounds,ce=new Set;for(let H=0;H<t;H++)for(let Z=0;Z<t;Z++){if(Z===_[0]&&H===_[1]||we(Z,H,n+871)>=B.chance)continue;let fe=Math.floor(we(Z,H,n+873)*B.kinds.length),he=0;for(;ce.has(B.kinds[fe])&&he++<B.kinds.length;)fe=(fe+1)%B.kinds.length;if(ce.has(B.kinds[fe]))continue;const $=B.kinds[fe],le=B.radius[$]??8,ve=we(Z,H,n+875)*Math.PI*2,Ie=w(Z,H);e:for(const Ve of[le+6,le+14,le+24])for(let Ke=0;Ke<12;Ke++){const Fe=ve+Ke/12*Math.PI*2,He=Ie.x+Math.cos(Fe)*Ve,z=Ie.z+Math.sin(Fe)*Ve;if(R(He,z,Z,H)&&!te(He,z,le)){N.push({kind:$,x:He,z,r:le,flip:we(Z,H,n+877)<.5}),ce.add($);break e}}}return ee.paths.placePieces(),ee}function ah(n,e,t,i,s){return Math.hypot(n,e)<i||e>=0?!1:Math.atan2(Math.abs(n),-e)*180/Math.PI<(t?s.facing.awayLeave:s.facing.awayEnter)}function Bm(n,e){return{x:n,z:e,vx:0,vz:0,lift:0,mode:"ground",facing:1,away:!1,lean:!1}}const yr=(n,e)=>Gn(e.groundHeight,e.treetopHeight,ln(n.lift)),Jo=n=>ln(n.lift);function zm(n,e,t,i,s){if(n.seated){if(!e.toggleMode&&Math.hypot(e.moveX,e.moveZ)<.1)return n;n={...n,seated:!1}}let{mode:r,lift:a}=n;e.toggleMode&&(r=r==="ground"||r==="descending"?"rising":"descending"),r==="rising"?(a+=t/Math.max(.001,i.riseTime),a>=1&&(a=1,r="treetop")):r==="descending"&&(a-=t/Math.max(.001,i.descendTime),a<=0&&(a=0,r="ground"));let o=e.moveX,h=e.moveZ;const c=Math.hypot(o,h);c>1&&(o/=c,h/=c);const d=ln(a),f=Gn(i.groundSpeed,i.treetopSpeed,d),u=1-Math.exp(-i.groundAcceleration*t),p=n.vx+(o*i.groundSpeed-n.vx)*u,g=n.vz+(h*i.groundSpeed-n.vz)*u,M=Gm(n,o,h,t,i);let x=Gn(p,M.vx,d),m=Gn(g,M.vz,d);const v=M.boost*d,_=M.braking&&d>.5;let w=n.x+x*t,A=n.z+m*t;(w<s.minX||w>s.maxX)&&(w=Dn(w,s.minX,s.maxX),x=0),(A<s.minZ||A>s.maxZ)&&(A=Dn(A,s.minZ,s.maxZ),m=0);const y=x>.3?1:x<-.3?-1:n.facing,S=Math.hypot(x,m),b=ah(x,m,n.away,Math.max(1,f*.15),i);return{x:w,z:A,vx:x,vz:m,lift:a,mode:r,facing:y,away:b,lean:S>f*i.leanAt,boost:v,braking:_}}function Gm(n,e,t,i,s){const r=s.treetop,a=Math.min(1,Math.hypot(e,t)),o=Math.hypot(n.vx,n.vz);let h=n.boost??0,c=!1;if(a<.1){const _=Math.exp(-3*i/Math.max(.05,r.glideTime));return{vx:n.vx*_,vz:n.vz*_,boost:h*_,braking:!1}}const d=e/a,f=t/a;let u=d,p=f,g=0;if(o>2){const _=n.vx/o,w=n.vz/o;g=Math.acos(Dn(_*d+w*f,-1,1));const A=Dn((o/s.treetopSpeed-r.sharpTurnSpeed)/Math.max(.05,1-r.sharpTurnSpeed),0,1),y=r.turnRateSlow+(r.turnRate-r.turnRateSlow)*A,S=_*f-w*d,b=y*(1-.5*h)*Math.PI/180,E=Math.min(g,b*i)*(S>=0?1:-1),C=Math.cos(E),T=Math.sin(E);u=_*C-w*T,p=_*T+w*C}const M=g*180/Math.PI;M<=r.boostAngle?h=Math.min(1,h+i/Math.max(.05,r.boostTime)):M>=90?(h=Math.max(0,h-i*r.sharpTurnBleed),c=o>s.treetopSpeed*r.brakeAt):h=Math.max(0,h-i*Math.max(.5,r.sharpTurnBleed*(M-r.boostAngle)/(90-r.boostAngle)));const x=M>=90?Math.min(o,s.treetopSpeed*(1+(r.boost-1)*h)*a):s.treetopSpeed*(1+(r.boost-1)*h)*a,m=1-Math.exp(-s.acceleration*i*(M>=90?r.sharpTurnBleed:1)),v=o+(x-o)*m;return{vx:u*v,vz:p*v,boost:h,braking:c}}const ko=3;function Hm(n,e,t=.5,i=1){const s=n.tuning,r=Dn(e,0,1),a=Math.max(0,Math.round(Gn(s.creaturesNear,s.creaturesFar,Math.pow(r,s.creatureCurve))+(t-.5)*2)),o=a>0&&i<Wm(n,r)?1:0,h=Math.max(0,a-o),c=Math.round(h*s.adultShareFar*ln((r-s.adultsFrom)/Math.max(.01,1-s.adultsFrom))),d=Math.round((h-c)*s.youngShareFar*r);return{babies:Math.max(0,h-c-d),young:d,adults:c,legends:o}}const Wm=(n,e)=>n.tuning.legendChanceFar*ln((e-n.tuning.legendsFrom)/Math.max(.01,1-n.tuning.legendsFrom)),af=n=>n.areaSize*.75,uo=(n,e,t,i)=>{const s=n.areaAt(e,t).cell;return s[0]===i[0]&&s[1]===i[1]};function Vm(n,e,t,i,s){if(uo(n,t,i,e))return[t,i];for(let r=2;r<s*1.5;r+=2)for(let a=0;a<16;a++){const o=a/16*Math.PI*2,h=t+Math.cos(o)*r,c=i+Math.sin(o)*r;if(uo(n,h,c,e))return[h,c]}return[t,i]}function fo(n,e,t){for(let i=0;i<12;i++){const s=t()*Math.PI*2,r=Math.sqrt(t())*e.range,a=e.homeX+Math.cos(s)*r,o=e.homeZ+Math.sin(s)*r;if(uo(n,a,o,e.cell))return[a,o]}return[e.anchorX,e.anchorZ]}function Ym(n){const e=[],t=n.tuning;let i=0;const[s,r]=n.centreCell;for(let a=0;a<n.n;a++)for(let o=0;o<n.n;o++){if(o===s&&a===r)continue;const h=Ii(n.seed*7919+o*131+a*977+3),c=vt[n.typeOf(o,a)],d=n.siteOf(o,a),f=n.remoteness(o,a),u=Hm(n,f,we(o,a,n.seed+43),we(o,a,n.seed+47)),p=M=>{const x=[o,a],m=af(n),[v,_]=Vm(n,x,d.x,d.z,m),w={cell:x,homeX:d.x,homeZ:d.z,range:m,anchorX:v,anchorZ:_},[A,y]=fo(n,w,h);return{id:i++,species:c.creature,level:M,...w,x:A,z:y,tx:A,tz:y,rest:h()*3,speed:(M===ko?t.legendSpeed:t.creatureSpeed)*(.7+h()*.6),facing:h()<.5?1:-1,away:!1,moving:!1,walk:h(),seen:0,leashed:!1,rand:Ii(n.seed*31+i*7+11)}};for(let M=0;M<u.babies;M++)e.push(p(0));for(let M=0;M<u.young;M++)e.push(p(1));for(let M=0;M<u.adults;M++)e.push(p(2));const g=t.legendNextToHome&&o===s+1&&a===r;(u.legends||g)&&e.push(p(3))}return e}function Xm(n,e,t){if(n.rest>0){n.rest-=e,n.moving=!1,n.away=!1;return}const i=n.tx-n.x,s=n.tz-n.z,r=Math.hypot(i,s);if(r<.05){[n.tx,n.tz]=fo(t,n,n.rand),n.rest=.8+n.rand()*3.5,n.moving=!1;return}const a=Math.min(r,n.speed*e),o=n.x+i/r*a,h=n.z+s/r*a;if(!uo(t,o,h,n.cell)){n.tx=n.x,n.tz=n.z,n.moving=!1;return}n.x=o,n.z=h,Math.abs(i)>.02&&(n.facing=i>0?1:-1),n.away=ah(i,s,n.away,0,t.tuning),n.moving=!0,n.walk+=e*(n.level===ko?1.5:4)}function Km(n,e,t,i,s,r,a){for(const o of n)if(!o.leashed&&!(Math.abs(o.homeX-e)>i||Math.abs(o.homeZ-t)>i)){if(r-o.seen>3){const h=Ii(o.id*7919+Math.floor(r/20)*131+5);[o.x,o.z]=fo(a,o,h),[o.tx,o.tz]=fo(a,o,h),o.rest=h()*2}o.seen=r,Xm(o,s,a)}}const qm={wall:"run",hedge:"run",bramble:"run",rockwall:"run",henge:"ring",water:"clump",reeds:"clump",boulder:"clump"},$m={wall:2.4,hedge:2.2,bramble:2,rockwall:2.8},of=new Map(Hs.map(n=>[n.id,{wall:n.wall?.[0]?.[0]??null,beds:n.small?.[0]?.[0]==="flowerbed"}]));function Zm(n,e,t){const i=n.typeOf(e,t),s=vt[i],r=n.tuning.walls,a={walls:[],beds:[]},o=of.get(s.id);if(!o?.wall)return a;const h=qm[o.wall]??"clump",c=Ii(n.seed*97+e*7919+t*104729+17),d=n.siteOf(e,t),f=n.areaSize;let u=0;const p=(m,v)=>{const _=n.areaAt(m,v).cell;return _[0]===e&&_[1]===t},g=(m,v)=>p(m,v)&&!n.hardClear(m,v)&&!n.reserved(m,v,1.5)&&n.paths.clearance(m,v).bushes!==0,M=(m,v,_)=>g(v,_)?(m.push({x:v,z:_,type:i,variant:Math.floor(we(e*131+u,t*37+u++,n.seed+311)*1e6),flip:c()<.5}),!0):!1,x=()=>{let m={x:d.x,z:d.z};for(let v=0;v<10;v++){const _=c()*Math.PI*2,w=f*(.12+c()*.3);if(m={x:d.x+Math.cos(_)*w,z:d.z+Math.sin(_)*w},g(m.x,m.z))break}return m};if(h==="run"){const m=r.runs[0]+Math.floor(c()*(r.runs[1]-r.runs[0]+1)),v=$m[o.wall]??2.4;for(let _=0;_<m;_++){const w=x(),A=n.paths.at(w.x,w.z,18);let y=Math.cos(c()*Math.PI*2),S=0;S=Math.sqrt(1-y*y)*(c()<.5?1:-1);let b=w.x,E=w.z;if(A){const R=n.paths.lines[A.line],O=R.pts[A.seg],I=R.pts[A.seg+1],k=Math.hypot(I[0]-O[0],I[1]-O[1])||1;y=(I[0]-O[0])/k,S=(I[1]-O[1])/k;const U=c()<.5?1:-1,W=R.half+2.5;b=O[0]-S*W*U,E=O[1]+y*W*U}const C=r.runLength[0]+Math.floor(c()*(r.runLength[1]-r.runLength[0]+1)),T=c()<r.gateChance?Math.floor(C/2):-1;for(let R=0;R<C;R++){if(R===T||R===T+1)continue;const O=b+y*v*R,I=E+S*v*R;M(a.walls,O,I)&&o.beds&&R%2===0&&M(a.beds,O-S*1.8,I+y*1.8)}}}else if(h==="ring"){const m=r.rings[0]+Math.floor(c()*(r.rings[1]-r.rings[0]+1));for(let v=0;v<m;v++){let _=v===0?n.setPieceSpot(e,t):null,w=_??x(),A=0;for(let y=0;y<6;y++){const S=r.ringStones[0]+Math.floor(c()*(r.ringStones[1]-r.ringStones[0]+1)),b=c()*Math.PI*2;A=_?n.tuning.setPieceFootprint*n.tuning.setPieceScale+3+c()*3:r.ringRadius[0]+c()*(r.ringRadius[1]-r.ringRadius[0]);const E=Array.from({length:S},(C,T)=>{const R=b+T/S*Math.PI*2+(c()-.5)*.15;return[w.x+Math.cos(R)*A,w.z+Math.sin(R)*A]});if(E.filter(([C,T])=>g(C,T)).length*2>=S){for(const[C,T]of E)M(a.walls,C,T);break}_=null,w=x()}if(c()<r.avenueChance){const y=c()*Math.PI*2,S=Math.cos(y),b=Math.sin(y);for(let E=1;E<=4;E++)for(const C of[-1,1])M(a.walls,w.x+S*(A+E*4)-b*C*2.5,w.z+b*(A+E*4)+S*C*2.5)}}if(c()<r.loneChance){const v=x();M(a.walls,v.x,v.z)}}else{const m=r.clumps[0]+Math.floor(c()*(r.clumps[1]-r.clumps[0]+1));for(let v=0;v<m;v++){const _=x(),w=r.clumpSize[0]+Math.floor(c()*(r.clumpSize[1]-r.clumpSize[0]+1));for(let A=0;A<w;A++){const y=c()*Math.PI*2,S=Math.sqrt(c())*r.clumpRadius;M(a.walls,_.x+Math.cos(y)*S,_.z+Math.sin(y)*S)}}}return a}function Jm(n,e){return!!of.get(vt[e].id)?.beds}const $t=(n,e=0)=>{const t=Math.sin(n*127.1+e*311.7)*43758.5453;return t-Math.floor(t)},gi=(n,e,t=0)=>$t(Math.floor(n[0]*e)+Math.floor(n[2]*e)*57+t,Math.floor(n[1]*e)),tc=n=>{const e=gi(n,12);return e<.14?l.BARKD:e>.88?l.BARKL:void 0},Qm=n=>e=>{const t=gi(e,10,3);return e[1]<n[1]-.2||t<.2?l.LEAF3:t>.8?l.LEAF2:void 0},An=(n,e=0)=>t=>{const i=gi(t,9,7);return t[1]>.05&&i<(n?.34:.12)&&gi(t,3,1)<(n?.75:.45)?l.MOSS:e&&(t[1]*e%1<.1||((t[0]+t[2])*e*.7+Math.floor(t[1]*e)*.5)%1<.07)||i>.93?l.STONED:void 0},yt=(n,e,t,i,s,r={})=>n.box(e,t,l.STONE,{round:.03,rough:.012,group:i,paint:An(s,r.courses??5),...r}),kn=(n,e,t,i,s)=>{const r=[];for(let a=0;a<=4;a++){const o=a/4;r.push([...P.add(P.lerp(e,t,o),[($t(s,a)-.5)*.15,0,.02]),.03])}n.chain(r,l.LEAF,{group:i,rough:.02,paint:a=>gi(a,30)<.3?l.LEAF2:void 0})},Ui=(n,e,t,i,s)=>{for(let r=0;r<e;r++){const a=$t(s,r)*6.283,o=t*Math.sqrt($t(r,s)),h=Math.cos(a)*o,c=Math.sin(a)*o*.7;n.ell([h,.08,c],[.07,.1+$t(r,4)*.08,.07],l.LEAF2,{group:i+r%3,paint:d=>d[1]>.14?l.LEAF:void 0})}},Ei=(n,e,t,i)=>n.ell(e,t,l.LEAF,{group:i,rough:.04,paint:Qm(e)}),Wn=(n,e,t)=>n.chain(e,l.TRUNK,{group:t,rough:.012,paint:tc}),Bn=(n,e,t,i,s={})=>n.ell(e,t,l.STONE,{group:i,rough:.03,dir:s.dir,paint:r=>r[1]>e[1]+t[1]*(s.moss??.62)&&gi(r,5,i)<.7?l.MOSS:gi(r,14)>.9?l.STONED:void 0}),su=(n,e,t,i,s=l.MAGIC)=>n.ell(e,[t,t,t],s,{group:i,extra:!0}),jm={"broken-arch":{desc:"a broken arch, one side fallen, a rune on its keystone",glow:!0,split:null,build(n,e){for(const t of[-1,1])yt(n,[t,t<0?1:.7,0],[.22,t<0?1:.7,.25],1+(t>0?1:0),e);for(let t=0;t<=6;t++){const i=Math.PI*(1-t/9),s=[Math.cos(i)*1,2+Math.sin(i)*.7,0];yt(n,s,[.17,.14,.25],3+t%2,e,{dir:[-Math.sin(i),Math.cos(i),0],courses:0,paint:t===4?(r=>Math.abs(r[0]-s[0])<.05&&Math.abs(r[1]-s[1])<.08?l.RUNE:An(e)(r)):An(e)})}for(let t=0;t<4;t++)yt(n,[1.3+t*.3,.14,.4+$t(t)*.5],[.17,.13,.22],6+t,e,{dir:[1,.3*($t(t,2)-.5),$t(t,3)-.5],courses:0});e&&(kn(n,[-1.15,.1,.26],[-.9,1.9,.26],12,1),Ui(n,14,1.8,14,2))}},"tower-stump":{desc:"a fallen tower's stump, a spiral stair climbing round its inside",split:2,build(n,e){for(let t=0;t<14;t++){const i=t/14*Math.PI*2,s=1+(Math.sin(i*2+1)*.5+.5)*1.6*(i>3.6&&i<5.4?1:.55);i>.9&&i<2||yt(n,[Math.cos(i)*1.05,s/2,Math.sin(i)*.95],[.25,s/2,.14],1+t%3,e,{dir:[-Math.sin(i),0,Math.cos(i)]})}for(let t=0;t<9;t++){const i=3.2+t*.42,s=.15+t*.26;yt(n,[Math.cos(i)*.7,s,Math.sin(i)*.6],[.24,.06,.12],5,e,{dir:[Math.cos(i),0,Math.sin(i)],courses:0})}for(let t=0;t<3;t++)yt(n,[.6+t*.35,.14,1.1],[.22,.13,.2],7,e,{dir:[1,0,.4*t],courses:0});e&&(kn(n,[-1.05,.1,-.4],[-1,2.3,-.5],10,3),kn(n,[.9,.1,-.6],[.95,1.7,-.55],11,4),n.ell([0,.2,0],[.55,.2,.5],l.LEAF,{group:12,rough:.04}))}},colonnade:{desc:"a colonnade, two columns standing and the rest toppled",split:null,build(n,e){yt(n,[0,.08,0],[2.2,.08,.55],1,e,{courses:0});for(const[t,i]of[[-1.7,1.9],[-.6,1.4]])n.seg([t,.16,0],[t,i,0],.18,.17,l.STONE,{group:2,rough:.01,paint:s=>Math.abs(Math.sin(Math.atan2(s[2],s[0]-t)*8))<.15?l.STONED:An(e,0)(s)}),yt(n,[t,i+.07,0],[.26,.07,.26],3,e,{courses:0});for(const[t,i,s]of[[.6,.55,.3],[1.6,.4,-.4]])n.seg([t-Math.cos(s)*.7,.2,i-Math.sin(s)*.7],[t+Math.cos(s)*.7,.2,i+Math.sin(s)*.7],.18,.18,l.STONE,{group:4,paint:An(e,0)});yt(n,[-1.15,2,0],[.75,.1,.28],5,e,{courses:0}),e&&(kn(n,[-1.7,.2,.18],[-1.65,1.8,.18],8,5),Ui(n,16,2.2,10,6))}},"stone-ring":{desc:"a ring of standing-stone stubs",split:null,build(n,e){for(let t=0;t<9;t++){const i=t/9*Math.PI*2,s=.3+$t(t,9)*(t%3===0?1.2:.45);yt(n,[Math.cos(i)*1.7,s/2,Math.sin(i)*1.35],[.2,s/2,.14],1+t%4,e,{dir:[-Math.sin(i),.1*($t(t)-.5),Math.cos(i)],courses:0,round:.07})}yt(n,[0,.1,0],[.55,.1,.35],6,e,{courses:0,round:.05}),e&&Ui(n,20,2,10,7)}},"chapel-wall":{desc:"a ruined chapel wall with an empty pointed window, moonlight caught in it",glow:!0,split:2.4,build(n,e){yt(n,[0,1.4,0],[1.4,1.4,.18],1,e,{paint:t=>{const i=t[0],s=t[1];return Math.abs(i)<.38&&s>1.1&&s<2.3-Math.abs(i)*.5?void 0:An(e,5)(t)}}),n.box([0,1.6,0],[.33,.55,.3],l.NOSE,{group:1,cut:!0}),n.ell([0,1.5,-.05],[.3,.5,.02],l.MAGIC2,{group:2,extra:!0,paint:t=>gi(t,18)<.5?l.MAGIC:void 0});for(const[t,i]of[[-1.55,2.6],[1.5,1.6]])yt(n,[t,i/2,0],[.22,i/2,.26],3,e);for(let t=0;t<5;t++)yt(n,[-1.2+t*.6,.12,.55+$t(t)*.3],[.18,.12,.16],4,e,{courses:0,dir:[1,0,$t(t,5)-.5]});e&&(kn(n,[-1.2,.1,.2],[-.6,2.6,.2],6,8),kn(n,[1,.1,.2],[1.2,2,.2],7,9))}},well:{desc:"an old well with a broken winch, fireflies over the water",glow:!0,split:null,build(n,e){for(let t=0;t<12;t++){const i=t/12*Math.PI*2;yt(n,[Math.cos(i)*.55,.32,Math.sin(i)*.5],[.15,.32,.1],1+t%2,e,{dir:[-Math.sin(i),0,Math.cos(i)],courses:3})}n.ell([0,.55,0],[.42,.02,.38],l.WATER,{group:3});for(const t of[-.6,.6])n.box([t,1,0],[.06,.5,.06],l.WOOD,{group:4,round:.02});n.seg([-.6,1.4,0],[.1,1.25,.05],.04,.04,l.WOOD,{group:5}),n.seg([.1,1.25,.05],[0,.85,.1],.01,.01,l.STRAW,{group:5});for(let t=0;t<4;t++)su(n,[($t(t)-.5)*.8,.8+$t(t,2)*.7,($t(t,3)-.5)*.6],.03,10+t,t%2?l.MAGIC:l.MAGIC2);e&&(kn(n,[-.55,.05,.5],[-.4,.62,.5],15,10),Ui(n,10,1,16,11))}},watchtower:{desc:"a crumbled watchtower, tall enough to see from the treetops",split:2.6,build(n,e){yt(n,[0,1.2,0],[.7,1.2,.7],1,e,{paint:t=>Math.abs(t[1]-1.9)<.16&&Math.abs(t[0])<.07&&t[2]>.6?l.NOSE:An(e,5)(t)});for(const[t,i,s]of[[-.5,-.5,1.3],[0,-.5,1],[.5,-.5,.7],[-.5,0,.9],[-.5,.5,.5],[.5,0,.3]])yt(n,[t,2.4+s/2,i],[.2,s/2,.2],1,e);n.box([0,.55,.7],[.25,.45,.1],l.NOSE,{group:1,cut:!0});for(let t=0;t<6;t++)yt(n,[.5+$t(t)*1.2,.13,-.3+$t(t,4)*1.2],[.17,.12,.15],2+t%2,e,{courses:0,dir:[1,0,$t(t,5)-.5]});e&&(kn(n,[-.7,.1,.3],[-.7,2.4,.2],4,12),kn(n,[.3,.1,.72],[.5,1.8,.72],5,13),Ei(n,[.1,2.6,-.2],[.45,.3,.4],6))}},"sunken-stair":{desc:"a stairway going down into the ground, a dark doorway at its foot",split:null,build(n,e){for(const t of[-.6,.6])yt(n,[0,.2,t],[1.1,.2,.12],1,e,{courses:2});for(let t=0;t<5;t++)yt(n,[.8-t*.32,.3-t*.07,0],[.16,.04,.5],2,e,{courses:0});n.box([-.55,.08,0],[.28,.1,.48],l.NOSE,{group:3}),yt(n,[-1.1,.55,0],[.15,.55,.62],4,e),yt(n,[-1.05,1.15,0],[.2,.1,.7],5,e,{courses:0}),e&&(Ui(n,12,1.6,10,14),kn(n,[-1,1.2,.5],[-.9,.3,.62],13,15))}},"statue-head":{desc:"a toppled giant statue head, its eyes still faintly lit",glow:!0,split:null,build(n,e){const t=[0,.8,0],i=.62,s=(r,a)=>[t[0]+a,t[1]+r,t[2]+i];n.ell(t,[.8,1,.7],l.STONE,{group:1,rough:.012,dir:[1,.25,0],paint:An(e,0)}),n.ell(s(.3,0),[.62,.14,.16],l.STONE,{group:2,paint:An(e,0)});for(const r of[-.26,.26])n.ell(s(.12,r),[.15,.09,.1],l.STONED,{group:1,cut:!0}),su(n,s(.12,r),.05,3+(r>0?1:0),l.MAGIC);n.ell(s(-.08,0),[.11,.24,.14],l.STONE,{group:5,paint:An(e,0)}),n.ell(s(-.42,0),[.3,.07,.08],l.STONE,{group:6,paint:r=>Math.abs(r[1]-(t[1]-.42))<.015?l.STONED:An(e,0)(r)});for(const[r,a]of[[-.55,.75],[0,.95],[.5,.8],[-.7,.3],[.75,.3]])n.ell([t[0]+r,t[1]+a,t[2]-.2],[.3,.25,.45],l.STONE,{group:7,rough:.02,paint:An(e,0)});n.ell([t[0],.05,t[2]+.2],[1,.1,.8],l.STONE,{group:8,paint:An(e,0)}),e&&(Ui(n,14,1.8,10,16),Ei(n,P.add(t,[-.2,.95,-.2]),[.5,.25,.45],6))}},hearth:{desc:"a collapsed cottage: its hearth and chimney still standing",split:2.6,build(n,e){yt(n,[0,1.6,-.2],[.45,1.6,.35],1,e),n.box([0,.45,.1],[.3,.3,.3],l.NOSE,{group:1,cut:!0});for(const[t,i,s,r,a]of[[-1.1,.4,.9,.5,0],[1,.5,.7,.35,0],[-1.9,-.2,.12,.35,1]])yt(n,[t,r/2,i],a?[.12,r/2,.7]:[s,r/2,.12],2,e);for(let t=0;t<4;t++)n.seg([-.5+t*.4,.08,.9],[.2+t*.5,.3,.3+t*.1],.05,.05,l.BARKD,{group:3});e&&(kn(n,[-.4,.1,.16],[-.3,2.8,.16],5,17),Ui(n,14,1.8,10,18))}},"bridge-span":{desc:"an old bridge span going nowhere, one arch over nothing",split:null,build(n,e){yt(n,[-.9,.7,0],[.35,.7,.5],1,e),yt(n,[.95,.55,0],[.3,.55,.5],2,e);for(let t=0;t<=8;t++){const i=t/8,s=Math.PI*(1-i),r=[Math.cos(s)*.85,.9+Math.sin(s)*.55,0];yt(n,r,[.14,.12,.5],3+t%2,e,{dir:[-Math.sin(s),Math.cos(s),0],courses:0})}yt(n,[-.1,1.62,0],[1.25,.1,.55],5,e,{courses:0,dir:[1,-.08,0]});for(const t of[-.5,.5])yt(n,[-.2,1.85,t],[1,.14,.06],6,e,{courses:0});e&&(kn(n,[-1.2,.1,.5],[-1,1.6,.55],8,19),Ui(n,10,1.6,10,20))}},gateway:{desc:"an overgrown gateway, two posts and a rusted gate, a rune glowing on one post",glow:!0,split:null,build(n,e){for(const t of[-.9,.9])yt(n,[t,.9,0],[.22,.9,.22],1+(t>0?1:0),e,{paint:t<0?(i=>i[2]>.2&&Math.abs(i[1]-1.1)<.14&&Math.abs(i[0]-t)<.06?l.RUNE:An(e,5)(i)):An(e,5)}),n.ell([t,1.9,0],[.18,.14,.18],l.STONE,{group:3,paint:An(e,0)});for(let t=0;t<6;t++)n.seg([-.65+t*.12,.1,.1+t*.06],[-.65+t*.12,1.2,.1+t*.06],.015,.015,l.SHADES,{group:4});for(const t of[.25,1.1])n.seg([-.65,t,.1],[-.05,t,.4],.018,.018,l.SHADES,{group:4});for(const t of[-1,1])for(let i=0;i<3;i++)yt(n,[t*(1.3+i*.35),.3-i*.08,0],[.17,.3-i*.08,.14],5,e);e&&(kn(n,[.75,.05,.22],[.85,1.9,.22],7,21),kn(n,[-.9,1.8,.22],[-.3,1,.3],8,22),Ui(n,12,1.6,10,23))}}},eg={pebbles:{desc:"a cluster of fist-sized stones",build(n){for(let e=0;e<7;e++)Bn(n,[($t(e)-.5)*.6,.04,($t(e,2)-.5)*.4],[.07+$t(e,3)*.05,.05,.07],1+e,{moss:.8})}},pair:{desc:"two small rocks",build(n){Bn(n,[-.15,.12,0],[.22,.15,.2],1),Bn(n,[.2,.08,.12],[.14,.1,.13],2)}},rock:{desc:"a knee-high rock",build(n){Bn(n,[0,.22,0],[.45,.3,.38],1,{dir:[1,.15,.2]})}},split:{desc:"a rock split in two, a seedling in the crack",build(n){Bn(n,[-.28,.35,0],[.3,.45,.45],1,{dir:[1,.3,0]}),Bn(n,[.3,.33,0],[.3,.42,.45],2,{dir:[1,-.3,0]}),n.seg([.02,.2,.1],[0,.6,.1],.015,.01,l.TRUNK,{group:3}),Ei(n,[0,.62,.1],[.1,.07,.1],4)}},boulder:{desc:"a big boulder",build(n){Bn(n,[0,.55,0],[.85,.75,.7],1,{dir:[1,.1,.3]}),Bn(n,[.7,.15,.5],[.22,.15,.2],2)}},"great-boulder":{desc:"a great mossy boulder, a landmark",build(n){Bn(n,[0,.9,0],[1.4,1.15,1.1],1,{dir:[1,.2,.1],moss:.2}),Bn(n,[-1.1,.3,.6],[.4,.35,.35],2),Bn(n,[1.2,.2,.5],[.3,.22,.28],3)}},slab:{desc:"a flat slab of rock",build(n){n.box([0,.12,0],[1,.12,.7],l.STONE,{round:.08,rough:.02,group:1,dir:[1,.04,.2],paint:e=>e[1]>.2&&gi(e,6)<.3?l.MOSS:gi(e,14)>.9?l.STONED:void 0})}},"standing-rock":{desc:"a tall natural standing rock",build(n){Bn(n,[0,.8,0],[.35,.85,.3],1,{moss:.8}),Bn(n,[.35,.1,.25],[.15,.1,.14],2)}}},tg={"spiral-tree":{desc:"a tree whose trunk twists in a spiral",split:2.4,build(n){const e=[];for(let t=0;t<=10;t++){const i=t/10,s=i*Math.PI*4;e.push([Math.cos(s)*.35*(1-i*.4),i*3,Math.sin(s)*.3,.2-i*.12])}Wn(n,e,1),Ei(n,[0,3.2,0],[.9,.6,.8],2)}},"loop-tree":{desc:"a tree grown into a loop",split:2.4,build(n){const e=[[0,0,0,.22],[.1,.9,0,.18]];for(let t=0;t<=10;t++){const i=-Math.PI/2+t/10*Math.PI*2;e.push([.1+Math.cos(i)*.55+t*.02,1.45+Math.sin(i)*.55,0,.15])}e.push([.3,2.6,0,.1]),Wn(n,e,1),Ei(n,[.3,2.9,0],[.75,.5,.65],2)}},"split-tree":{desc:"a tree split by lightning, both halves still leafing",split:2,build(n){Wn(n,[[0,0,0,.3],[0,.9,0,.26]],1),Wn(n,[[-.05,.9,0,.18],[-.6,1.9,0,.13],[-1,2.6,0,.07]],2),Wn(n,[[.05,.9,0,.18],[.55,1.8,.05,.13],[.9,2.4,.05,.07]],3),n.ell([0,1,.05],[.08,.25,.2],l.BARKD,{group:1,cut:!0}),Ei(n,[-1,2.7,0],[.6,.45,.5],4),Ei(n,[.95,2.5,.05],[.55,.4,.5],5)}},"door-tree":{desc:"a fat old tree with a little round door in it, a lit window above",glow:!0,split:2.3,build(n){n.ell([0,1,0],[.8,1.1,.75],l.TRUNK,{group:1,rough:.02,paint:e=>e[2]>.5&&Math.hypot(e[0],e[1]-.45)<.3&&e[1]>.2?Math.hypot(e[0],e[1]-.45)<.25?Math.abs(e[0]%.1)<.015?l.BARKD:l.ACCENT:l.BARKD:e[2]>.45&&Math.hypot(e[0]-.3,e[1]-1.3)<.13?Math.abs(e[0]-.3)<.015||Math.abs(e[1]-1.3)<.015?l.BARKD:l.GLOW:tc(e)}),n.ell([.12,.45,.72],[.03,.03,.03],l.FRAME,{group:2}),Ei(n,[0,2.4,-.1],[1.1,.7,.9],3);for(let e=0;e<5;e++){const t=e/5*Math.PI*2;Wn(n,[[Math.cos(t)*.6,.2,Math.sin(t)*.55,.15],[Math.cos(t)*1.1,.02,Math.sin(t)*1,.05]],4)}}},"mushroom-tree":{desc:"an enormous mushroom, tall as a tree",split:2.2,build(n){n.seg([0,0,0],[.1,2.4,0],.3,.22,l.CLOTH,{group:1,paint:e=>e[1]>2&&e[1]<2.15?l.BELLY:void 0}),n.ell([.1,2.55,0],[1.3,.45,1.15],l.ACCENT,{group:2,rough:.01,paint:e=>e[1]<2.35?l.BODY2:gi(e,8)<.18?l.BELLY:void 0}),n.ell([.1,2.35,0],[1.2,.08,1.05],l.BODY2,{group:3,paint:e=>Math.abs(Math.sin(Math.atan2(e[2],e[0]-.1)*20))<.3?l.STRAW:void 0})}},"root-tree":{desc:"an upside-down-looking tree, its roots raised high like a crown",split:2,build(n){Wn(n,[[0,0,0,.35],[0,1.6,0,.25]],1);for(let e=0;e<7;e++){const t=e/7*Math.PI*2;Wn(n,[[0,1.6,0,.16],[Math.cos(t)*.7,2.2+$t(e)*.3,Math.sin(t)*.6,.1],[Math.cos(t)*1.2,2.5+$t(e,2)*.4,Math.sin(t)*1,.04]],2+e%2)}for(let e=0;e<4;e++){const t=e/4*Math.PI*2+.4;Wn(n,[[Math.cos(t)*.25,.3,Math.sin(t)*.25,.14],[Math.cos(t)*.6,.02,Math.sin(t)*.55,.05]],4)}}},"stone-lifter":{desc:"a tree that has lifted great stones up in its roots",split:2.4,build(n){Wn(n,[[0,.6,0,.3],[0,2,0,.22],[.1,2.8,0,.12]],1);for(let e=0;e<6;e++){const t=e/6*Math.PI*2;Wn(n,[[Math.cos(t)*.2,.6,Math.sin(t)*.2,.15],[Math.cos(t)*.6,.45,Math.sin(t)*.55,.12],[Math.cos(t)*.9,0,Math.sin(t)*.8,.07]],2)}for(const[e,t,i]of[[.5,.45,.9],[-.5,.4,1.1],[.15,-.5,.8]])Bn(n,[e,i,t],[.3,.24,.26],3);Ei(n,[.1,3,0],[1,.6,.85],4)}},"ring-tree":{desc:"a hollow ring of a tree you could fly through",split:null,build(n){for(let e=0;e<=16;e++){const t=e/16*Math.PI*2,i=[Math.cos(t)*1.2,1.35+Math.sin(t)*1.2,0];n.ell(i,[.3,.3,.3],l.TRUNK,{group:1,rough:.02,paint:tc})}Wn(n,[[-.6,0,.2,.3],[-.5,.3,.1,.3]],2),Wn(n,[[.6,0,.2,.3],[.5,.3,.1,.3]],2);for(const[e,t]of[[-.9,2.3],[.3,2.65],[1.1,2]])Ei(n,[e,t,-.1],[.45,.3,.35],3)}}},Is=[...Object.entries(jm).map(([n,e])=>({id:n,family:"ruins",size:1.15,variants:2,...e})),...Object.entries(eg).map(([n,e])=>({id:n,family:"rocks",size:1,variants:1,split:null,...e})),...Object.entries(tg).map(([n,e])=>({id:n,family:"freak",size:1.2,variants:1,...e}))],ng=Object.fromEntries(Is.map(n=>[n.id,n]));function ig(n={},e=[1,1,1]){const t=n.leafHue??.3,i=n.trunkHue??.07,s=r=>r.map((a,o)=>Math.min(255,Math.round(a*e[o])));return{[l.STONE]:s([128,126,134]),[l.STONED]:s([64,62,72]),[l.MOSS]:me(.26,.45,.45),[l.TRUNK]:me(i,.45,.36),[l.BARKD]:me(i+.03,.5,.17),[l.BARKL]:me(i,.35,.55),[l.LEAF]:me(t,.55,.45),[l.LEAF2]:me(t-.03,.5,.62),[l.LEAF3]:me(t+.03,.6,.26),[l.WOOD]:[120,88,56],[l.STRAW]:[180,156,104],[l.SHADES]:[70,46,36],[l.FRAME]:[190,160,90],[l.NOSE]:[14,12,18],[l.CLOTH]:[226,216,196],[l.BELLY]:[240,236,226],[l.ACCENT]:[176,52,60],[l.BODY2]:[150,110,90],[l.WATER]:[44,70,96],[l.RUNE]:[120,230,255],[l.MAGIC]:me(n.magicHue??.45,.6,1),[l.MAGIC2]:me(n.magicHue??.45,.2,1),[l.GLOW]:[255,190,96],[l.LINE]:[24,22,30]}}function sg(n,e={},{variant:t=0,ppm:i=16}={}){const s=ng[n];if(!s)throw new Error(`no decoration "${n}"`);const r=new Qe({blend:.05});s.build(r,t%s.variants),r.ell([0,.004,0],[.01,.004,.01],l.NOSE,{group:0});const a=Cr(e)*s.size,{sp:o,project:h}=cn(r,{scale:a});let c=0;for(const w of r.parts){if(w.extra)continue;const A=w.type==="cone"?[[w.a,w.r1],[w.b,w.r2]]:[[w.c,w.r?Math.max(...w.r):Math.max(w.h[0],w.h[2])]];for(const[y,S]of A)y[1]-S<.3&&(c=Math.max(c,Math.hypot(y[0],y[2])+S))}let d=o.w,f=-1,u=o.h;for(let w=0;w<o.h;w++)for(let A=0;A<o.w;A++)o.m[w*o.w+A]&&(d=Math.min(d,A),f=Math.max(f,A),u=Math.min(u,w));const p=f-d+1,g=o.h-u,M=new dt(p,g),x=new dt(p,g),m=new dt(p,g),v=s.split==null?0:Math.max(0,Math.round(h([0,s.split,0])[1])-u);for(let w=0;w<g;w++)for(let A=0;A<p;A++){const y=(w+u)*o.w+A+d,S=o.m[y];if(!S)continue;const b=[o.n[y*3],o.n[y*3+1],o.n[y*3+2]];M.put(A,w,S,...b),(w<v?x:m).put(A,w,S,...b)}const _=a/i;return{whole:M,top:x,bot:m,crownY:v,metres:{width:+(p/i).toFixed(1),height:+(g/i).toFixed(1),footprint:+(c*_).toFixed(1)}}}const jt=(n,e=0)=>{const t=Math.sin(n*127.1+e*311.7)*43758.5453;return t-Math.floor(t)},It=(n,e,t=0)=>jt(Math.floor(n[0]*e)+Math.floor(n[2]*e)*57+t,Math.floor(n[1]*e)),Kt=(n=.2,e=.15)=>t=>{const i=It(t,16,3);return It(t,6,5)<e&&t[1]>.1?l.MOSS:i>1-n*.7?l.BODY2:void 0},Zt=(n,e,t,i,s,r=0,a=0)=>{for(let o=0;o<e;o++){const h=jt(s,o)*6.283,c=t*Math.sqrt(jt(o,s));n.ell([r+Math.cos(h)*c,.07,a+Math.sin(h)*c*.7],[.07,.1+jt(o,4)*.08,.07],l.LEAF2,{group:i+o%3,paint:d=>d[1]>.13?l.LEAF:void 0})}},ba=(n,e,t,i=1)=>{for(let s=0;s<6;s++){const r=s/6*6.283+e[0],a=[Math.cos(r),0,Math.sin(r)];n.chain([[...e,.03*i],[...P.add(e,P.add(P.mul(a,.25*i),[0,.2*i,0])),.025*i],[...P.add(e,P.add(P.mul(a,.5*i),[0,.05*i,0])),.01*i]],s%2?l.LEAF:l.LEAF2,{group:t})}},ui=(n,e,t,i,s)=>{const r=[];for(let a=0;a<=4;a++)r.push([...P.add(P.lerp(e,t,a/4),[(jt(s,a)-.5)*.12,0,.02]),.03]);n.chain(r,l.LEAF,{group:i,paint:a=>It(a,30)<.3?l.LEAF2:void 0})},po=(n,e,t,i)=>n.ell(e,t,l.LEAF,{group:i,rough:.04,paint:s=>{const r=It(s,10,2);return s[1]<e[1]-.15||r<.2?l.LEAF3:r>.8?l.LEAF2:void 0}}),rt=(n,e,t,i,s=.025,r=l.FRAME)=>n.seg(e,t,s,s,r,{group:i,paint:Kt(.35,.05)}),_r=(n,e,t,i,s=l.MAGIC)=>n.ell(e,[t,t,t],s,{group:i,extra:!0});function Ti(n,e,{yaw:t=0,pitch:i=0,roll:s=0,at:r=[0,0,0]}={}){const a=(f,u,p,g)=>{const M=Math.cos(u),x=Math.sin(u),m=[...f];return m[p]=f[p]*M-f[g]*x,m[g]=f[p]*x+f[g]*M,m},o=f=>a(a(a(f,s,1,2),i,0,1),-t,0,2),h=f=>a(a(a(f,t,0,2),-i,0,1),-s,1,2),c=f=>P.add(o(f),r),d=f=>h(P.sub(f,r));for(const f of n.parts.slice(e))if(f.type==="cone"?(f.a=c(f.a),f.b=c(f.b)):(f.c=c(f.c),f.axes=f.axes.map(o)),f.paint){const u=f.paint;f.paint=(p,g)=>u(d(p),g)}}function Qo(n,e,{len:t=1.5,van:i=!1,glow:s=!1,flat:r=!1}={}){const a=i?.62:.3,o=i?.8:.5;n.box([0,o,0],[t,a,.66],l.BODY,{round:.14,group:e,paint:h=>{const c=Kt(.3,.12)(h);return c||(h[0]>t-.06&&Math.abs(h[1]-(o+a*.2))<.07&&Math.abs(Math.abs(h[2])-.45)<.1?s?l.MAGIC2:l.FRAME:i&&h[1]>o+.1&&Math.abs(h[2])>.6&&Math.abs(h[0]+.2)<.9&&(h[0]+3)*3%1>.15||h[1]<o-a+.1?l.SHADES:void 0)}}),i||n.box([-.2,o+a+.22,0],[t*.6,.24,.6],l.BODY,{round:.14,group:e,paint:h=>Math.abs(h[2])>.52||h[0]>t*.6-.25-.2?It(h,9)<.25?l.STONED:l.SHADES:Kt(.3,.25)(h)});for(const h of[-t*.65,t*.65])for(const c of[-.66,.66])n.ell([h,.3,c],[.3,r?.22:.3,.1],l.BODY3,{group:e+1,paint:d=>Math.hypot(d[0]-h,d[1]-.3)<.12?l.FRAME:void 0});if(s)for(const h of[-.45,.45])_r(n,[t+.05,o+a*.2,h],.07,e+2,l.MAGIC2)}const rg={"car-nose-down":{desc:"a hatchback nose-down in the earth, ferns round it",build(n){const e=n.parts.length;Qo(n,1),Ti(n,e,{pitch:-.5,at:[0,.2,0]}),n.ell([1.3,.1,0],[.9,.35,1],l.BARK2,{group:4,rough:.04,paint:t=>t[1]>.25?l.MOSS:void 0}),ba(n,[.9,.2,.8],5),ba(n,[-.9,.05,.9],6,.8),n.ell([-.6,1.25,0],[.5,.06,.4],l.MOSS,{group:7})}},"van-tree":{desc:"a camper van with a tree grown up through its roof, its headlights glowing with fairy light",glow:!0,build(n){Qo(n,1,{van:!0,len:1.6,flat:!0,glow:!0}),n.chain([[.2,0,0,.22],[.2,1.5,0,.2],[.3,2.6,-.1,.14],[.35,3.3,-.1,.08]],l.TRUNK,{group:4,rough:.015}),po(n,[.3,3.4,-.1],[1.1,.7,.9],5),ui(n,[-1.6,.1,.66],[-1,1.3,.7],6,1),Zt(n,14,2.2,7,2)}},"car-on-side":{desc:"a car on its side among ferns",build(n){const e=n.parts.length;Qo(n,1),Ti(n,e,{roll:Math.PI/2,at:[0,.2,.1]});for(const[t,i]of[[-1.2,.9],[.3,1.1],[1.4,.6],[-.4,-1]])ba(n,[t,.05,i],5+(t>0?1:0),1.1)}},"trolley-tipped":{desc:"a shopping trolley tipped over, a plant growing in its basket",build(n){const e=n.parts.length;ru(n,1),po(n,[.05,.65,0],[.32,.28,.26],3),Ti(n,e,{roll:1.35,at:[0,.32,0]}),Zt(n,8,.9,6,3)}},"trolley-nest":{desc:"a shopping trolley standing upright, a bird's nest in its basket",build(n){ru(n,1),n.ell([0,.78,0],[.2,.08,.17],l.STRAW,{group:3,paint:e=>Math.abs(Math.sin(e[0]*40+e[2]*30))<.3?l.BARK2:void 0});for(const e of[-.05,.05])n.ell([e,.84,.02],[.04,.03,.035],l.BELLY,{group:4});Zt(n,8,.9,6,4)}},cone:{desc:"a single traffic cone, faded",build(n){Br(n,[0,0,0],1)}},cones:{desc:"a little cluster of traffic cones, one fallen",build(n){Br(n,[0,0,0],1),Br(n,[.5,0,.2],4);const e=n.parts.length;Br(n,[0,0,0],7),Ti(n,e,{roll:1.5,yaw:.6,at:[-.4,.2,.4]}),Zt(n,6,.8,10,5)}},"cone-lantern":{desc:"a traffic cone lit from within like a lantern, a ring of mushrooms round it",glow:!0,build(n){Br(n,[0,0,0],1,!0);for(let e=0;e<9;e++){const t=e/9*6.283,i=[Math.cos(t)*.55,0,Math.sin(t)*.45];n.seg(i,P.add(i,[0,.08,0]),.02,.02,l.CLOTH,{group:5}),n.ell(P.add(i,[0,.1,0]),[.06,.035,.06],l.BODY2,{group:6})}}},"highway-slab":{desc:"a slab of tarmac tilted up out of the ground, faded lane markings, a crash-barrier stub",build(n){const e=n.parts.length;n.box([0,0,0],[2.2,.14,1.3],l.STONE,{round:.03,group:1,rough:.01,paint:t=>It(t,5,1)<.06||Math.abs(Math.sin(t[0]*3+t[2]*5)*.3+t[2]*.6-.2)<.02?l.STONED:t[1]>.1&&Math.abs(t[2])<.05&&(t[0]+9)*.8%1<.55?It(t,12)<.3?l.STONE:l.CLOTH:t[1]>.1&&Math.abs(t[2]-1.1)<.04?l.BELLY:t[1]>.1&&It(t,6,4)<.12?l.MOSS:void 0});for(const t of[-1.6,-.4])rt(n,[t,.1,1.25],[t,.75,1.25],2,.04);n.box([-1,.62,1.3],[.9,.1,.03],l.FRAME,{group:3,paint:t=>Math.abs(t[1]-.62)<.02?l.STONED:Kt(.5,.1)(t)}),Ti(n,e,{pitch:.38,roll:.08,at:[0,.7,0]}),n.ell([-1.8,.1,0],[.6,.2,1.3],l.BARK2,{group:5,rough:.04,paint:t=>t[1]>.2?l.MOSS:void 0}),Zt(n,16,2.4,6,6)}},"highway-line":{desc:"a section of cracked road, its white line broken, grass in the cracks",build(n){n.box([0,.02,0],[2,.03,1],l.STONE,{round:.02,group:1,paint:e=>It(e,4,9)<.08||Math.abs(Math.sin(e[0]*2.3)*.4-e[2])<.025?It(e,20)<.4?l.LEAF2:l.STONED:Math.abs(e[2]+.05)<.05&&(e[0]+9)*.7%1<.6?l.CLOTH:It(e,6)<.08?l.MOSS:void 0});for(const[e,t]of[[-1.2,.3],[.4,-.2],[1.3,.5]])Zt(n,4,.2,3,e*10+7,e,t)}},"road-sign":{desc:"a fallen road sign, blank but for an abstract arrow",build(n){rt(n,[-.9,.05,.2],[.6,.1,-.1],1,.03),n.box([.9,.12,-.15],[.62,.05,.46],l.HAT1,{group:2,dir:[1,.25,-.2],round:.02,paint:e=>{const t=e[0]-.9,i=e[2]+.15;return Math.abs(i)<.08&&t>-.36&&t<.2||t>.08&&Math.abs(i)<.28-(t-.08)*.9&&t<.38?l.BELLY:Math.hypot(Math.abs(t)-.56,Math.abs(i)-.4)<.04?l.FRAME:Kt(.2,.1)(e)}}),Zt(n,8,1.2,4,7)}},"phone-box":{desc:"an overgrown phone box, its panes long gone",build(n){n.box([0,1,0],[.42,1,.42],l.ACCENT,{round:.04,group:1,paint:e=>Math.max(Math.abs(e[0]),Math.abs(e[2]))>.38&&e[1]>.5&&e[1]<1.75&&e[1]*5%1>.12&&(Math.abs(e[0])+Math.abs(e[2]))*5%1>.12?l.SHADES:Kt(.3,.15)(e)}),n.box([0,2.08,0],[.46,.09,.46],l.ACCENT,{round:.06,group:2,paint:Kt(.3,.3)}),ui(n,[.43,0,.3],[.4,1.9,.43],3,8),ui(n,[-.3,0,.43],[-.1,1.4,.43],4,9),Zt(n,10,.9,5,8)}},lamppost:{desc:"a lamppost bent over, its lamp hanging near the ground",build(n){n.chain([[0,0,0,.06],[0,1.4,0,.05],[.2,2.1,0,.045],[.8,2.2,0,.04],[1.2,1.7,0,.035]],l.FRAME,{group:1,paint:Kt(.4,.05)}),n.box([1.25,1.55,0],[.16,.1,.12],l.FRAME,{round:.04,group:2}),n.ell([1.25,1.45,0],[.12,.06,.1],l.SHADES,{group:2}),ui(n,[0,0,.06],[.05,1.5,.06],3,10),Zt(n,6,.7,4,9)}},sofa:{desc:"a sofa left in a clearing, moss on its cushions",build(n){const e=t=>It(t,6,5)<.25&&t[1]>.4?l.MOSS:It(t,14)>.9?l.STONED:void 0;n.box([0,.3,0],[.9,.2,.4],l.CLOTH,{round:.1,group:1,paint:e}),n.box([-.02,.7,-.32],[.9,.3,.12],l.CLOTH,{round:.1,group:2,paint:e});for(const t of[-.85,.85])n.box([t,.55,0],[.12,.22,.42],l.CLOTH,{round:.1,group:3,paint:e});for(const t of[-.4,.4])n.box([t,.53,.05],[.42,.08,.34],l.CLOTH,{round:.08,group:4,paint:e});Zt(n,14,1.6,5,10)}},"washing-machine":{desc:"a washing machine in the undergrowth, a fern in its drum",build(n){n.box([0,.42,0],[.32,.42,.32],l.BELLY,{round:.05,group:1,paint:e=>e[2]>.28&&Math.hypot(e[0],e[1]-.4)<.2?Math.hypot(e[0],e[1]-.4)<.15?l.SHADES:l.FRAME:Kt(.25,.15)(e)}),ba(n,[0,.4,.4],2,.55),Zt(n,8,.8,3,11)}},"bike-roots":{desc:"a bicycle tangled in tree roots",build(n){for(const e of[-.45,.45])for(let t=0;t<12;t++){const i=t/12*6.283,s=(t+1)/12*6.283;rt(n,[e+Math.cos(i)*.3,.32+Math.sin(i)*.3,0],[e+Math.cos(s)*.3,.32+Math.sin(s)*.3,0],1+(e>0?1:0),.018)}for(const[e,t]of[[[-.45,.32,0],[0,.35,0]],[[0,.35,0],[.3,.7,0]],[[-.45,.32,0],[-.15,.72,0]],[[-.15,.72,0],[.3,.7,0]],[[.3,.7,0],[.45,.32,0]],[[0,.35,0],[-.15,.72,0]],[[.3,.7,0],[.35,.85,0]]])rt(n,e,t,3,.022);n.box([-.17,.76,0],[.1,.03,.04],l.SHADES,{group:4}),rt(n,[.25,.85,-.15],[.42,.87,.15],4,.018);for(let e=0;e<4;e++)n.chain([[-1+e*.2,0,-.4,.09],[-.3+e*.3,.35+e%2*.2,-.05+e*.05,.07],[.4+e*.2,.1,.3,.05]],l.TRUNK,{group:5+e%2,rough:.01})}},"dish-birdbath":{desc:"a satellite dish fallen face-up, full of rainwater, a bird drinking",build(n){n.ell([0,.2,0],[.6,.22,.6],l.BELLY,{group:1,paint:Kt(.25,.2)}),n.ell([0,.34,0],[.52,.12,.52],l.BELLY,{group:1,cut:!0}),n.ell([0,.28,0],[.48,.02,.48],l.WATER,{group:2}),rt(n,[0,.25,-.5],[.1,.8,-.6],3,.03);const e=[.5,.45,.3];n.ell(e,[.12,.07,.06],l.BODY3,{group:4,dir:[1,.3,0]}),n.ell(P.add(e,[.1,.07,0]),[.05,.05,.045],l.BODY3,{group:4}),n.seg(P.add(e,[.14,.07,0]),P.add(e,[.2,.04,0]),.012,.004,l.ACCENT,{group:4}),Zt(n,8,1,5,12)}},"fridge-fireflies":{desc:"a fridge standing in the woods, its door ajar, fireflies inside",glow:!0,build(n){n.box([0,.85,0],[.36,.85,.32],l.BELLY,{round:.05,group:1,paint:e=>e[2]>.28&&Math.abs(e[0])<.3&&e[1]<1.55&&e[1]>.1?l.SHADES:Kt(.25,.2)(e)}),n.box([.5,.85,.4],[.03,.78,.3],l.BELLY,{dir:[.5,0,1],round:.03,group:2,paint:Kt(.25,.15)});for(let e=0;e<7;e++)_r(n,[(jt(e)-.5)*.4,.4+jt(e,2)*1,.2+jt(e,3)*.3],.03,10+e,e%2?l.MAGIC:l.MAGIC2);ui(n,[-.36,0,.3],[-.3,1.6,.33],3,13)}}};function ru(n,e){const t=[[-.35,.45,-.25],[.35,.45,-.25],[.35,.45,.25],[-.35,.45,.25],[-.3,.9,-.28],[.4,.9,-.28],[.4,.9,.28],[-.3,.9,.28]];for(const[i,s]of[[0,1],[1,2],[2,3],[3,0],[4,5],[5,6],[6,7],[7,4],[0,4],[1,5],[2,6],[3,7]])rt(n,t[i],t[s],e,.015);for(let i=1;i<6;i++){const s=i/6;rt(n,P.lerp(t[0],t[1],s),P.lerp(t[4],t[5],s),e,.008),rt(n,P.lerp(t[3],t[2],s),P.lerp(t[7],t[6],s),e,.008)}rt(n,t[4],[-.45,.95,-.28],e,.015),rt(n,t[7],[-.45,.95,.28],e,.015),rt(n,[-.45,.95,-.28],[-.45,.95,.28],e,.025,l.ACCENT);for(const[i,s]of[[-.3,-.22],[.3,-.22],[-.3,.22],[.3,.22]])rt(n,[i,.45,s],[i,.08,s],e,.012),n.ell([i,.06,s],[.05,.05,.02],l.BODY3,{group:e+1})}function Br(n,e,t,i=!1){n.box(P.add(e,[0,.03,0]),[.24,.03,.24],l.ACCENT,{round:.02,group:t,paint:Kt(.15,.2)}),n.seg(P.add(e,[0,.05,0]),P.add(e,[0,.72,0]),.2,.03,l.ACCENT,{group:t+1,paint:s=>Math.abs(s[1]-e[1]-.42)<.07?i?l.MAGIC2:l.CLOTH:i&&It(s,18)<.2?l.GLOW:Kt(.15,.1)(s)}),i&&_r(n,P.add(e,[0,.78,0]),.05,t+2,l.MAGIC2)}const ag={swings:{desc:"a rusty swing set, one swing hanging, one chain broken; the hanging one sways on its own with a faint sparkle",glow:!0,split:1.6,build(n){for(const e of[-1.1,1.1])for(const t of[-.5,.5])rt(n,[e,0,t],[e*.95,2.1,0],1,.045);rt(n,[-1.1,2.1,0],[1.1,2.1,0],2,.05);for(const e of[-.12,.12])rt(n,[-.5,2.08,e],[-.42,.55,e*1.2],3,.012);n.box([-.42,.52,0],[.2,.025,.14],l.BODY3,{round:.02,group:3,dir:[1,-.15,0]});for(let e=0;e<5;e++)_r(n,[-.42+(jt(e)-.5)*.5,.6+jt(e,2)*.7,(jt(e,3)-.5)*.3],.025,10+e);rt(n,[.5,2.08,-.12],[.5,1.3,-.12],4,.012),rt(n,[.5,2.08,.12],[.58,.9,.2],4,.012),n.box([.7,.04,.3],[.2,.025,.14],l.BODY3,{round:.02,group:5,dir:[1,0,.5]}),ui(n,[1.1,0,.5],[1.05,1.6,.25],6,14),Zt(n,14,1.8,7,15)}},slide:{desc:"a slide half-swallowed by brambles, a sapling at its foot",split:1.6,build(n){for(const e of[-.95,-.55])for(const t of[-.3,.3])rt(n,[e,0,t],[e,1.5,t],1,.035);for(let e=1;e<6;e++)rt(n,[-.95,e*.27,-.3],[-.95,e*.27,.3],1,.02);n.box([-.75,1.5,0],[.25,.04,.32],l.FRAME,{group:2,paint:Kt(.4,.1)}),n.box([.35,.78,0],[.95,.03,.26],l.HAT1,{dir:[1,-.75,0],round:.02,group:3,paint:e=>Math.abs(e[2])>.22?l.FRAME:Kt(.35,.15)(e)});for(let e=0;e<10;e++){const t=jt(e,3)*6.283;n.chain([[.4+Math.cos(t)*.9,0,Math.sin(t)*.6,.03],[.3+Math.cos(t)*.4,.5+jt(e)*.5,Math.sin(t)*.3,.025],[.1+jt(e,4)*.6,.7+jt(e,5)*.4,(jt(e,6)-.5)*.4,.015]],l.BARKD,{group:5+e%2}),e%3===0&&n.ell([.3+jt(e,7)*.6,.5+jt(e,8)*.4,(jt(e,9)-.5)*.5],[.2,.14,.16],l.LEAF,{group:7,rough:.03,paint:i=>It(i,30)<.1?l.ACCENT:void 0})}n.seg([1.45,0,.2],[1.45,1.2,.2],.03,.02,l.TRUNK,{group:8}),po(n,[1.45,1.3,.2],[.25,.2,.22],9)}},roundabout:{desc:"a roundabout tilted in the moss",build(n){const e=n.parts.length;n.ell([0,.2,0],[.9,.05,.9],l.HAT2,{group:1,paint:t=>Math.abs(Math.sin(Math.atan2(t[2],t[0])*3))<.08?l.FRAME:Kt(.35,.2)(t)});for(let t=0;t<3;t++){const i=t/3*6.283;rt(n,[Math.cos(i)*.7,.25,Math.sin(i)*.7],[Math.cos(i)*.7,.6,Math.sin(i)*.7],2,.025),rt(n,[Math.cos(i)*.7,.6,Math.sin(i)*.7],[Math.cos(i)*.1,.6,Math.sin(i)*.1],2,.02)}Ti(n,e,{pitch:.18,roll:.1,at:[0,.05,0]}),n.ell([0,.05,0],[1.1,.08,1],l.MOSS,{group:4}),Zt(n,10,1.3,5,16)}},seesaw:{desc:"a seesaw stuck at an angle",build(n){n.box([0,.2,0],[.08,.2,.14],l.FRAME,{round:.02,group:1,paint:Kt(.4,.1)});const e=n.parts.length;n.box([0,0,0],[1.3,.035,.12],l.WOOD,{round:.02,group:2,paint:t=>It(t,8)<.2?l.MOSS:void 0});for(const t of[-1.05,1.05])rt(n,[t,.03,-.12],[t,.03,.12],3,.02);Ti(n,e,{pitch:.32,at:[0,.42,0]}),Zt(n,10,1.4,5,17)}},"climbing-frame":{desc:"a climbing frame, a dome of bars wound with ivy",split:1.4,build(n){const t=(i,s)=>{const r=i/8*6.283,a=s/4*Math.PI/2;return[Math.cos(r)*Math.cos(a)*1,Math.sin(a)*1*1.5,Math.sin(r)*Math.cos(a)*1]};for(let i=0;i<8;i++)for(let s=0;s<4;s++)rt(n,t(i,s),t(i,s+1),1,.025),rt(n,t(i,s),t(i+1,s),1,.025);for(let i=0;i<3;i++)ui(n,t(i*3,0),t(i*3+1,3),3+i,18+i);Zt(n,12,1.4,6,18)}},"spring-rider":{desc:"a spring rider animal, its paint faded (a generic animal, no characters)",build(n){for(let e=0;e<6;e++)n.seg([Math.cos(e*2)*.06,e*.07,Math.sin(e*2)*.06],[Math.cos(e*2+2)*.06,(e+1)*.07,Math.sin(e*2+2)*.06],.022,.022,l.FRAME,{group:1});n.ell([0,.55,0],[.35,.16,.14],l.BODY,{group:2,paint:Kt(.4,.2)}),n.ell([.32,.72,0],[.12,.11,.1],l.BODY,{group:2,paint:Kt(.4,.2)});for(const e of[-.05,.05])n.ell([.28,.85,e],[.03,.06,.02],l.BODY,{group:3});n.ell([.43,.74,.06],[.015,.015,.015],l.SHADES,{group:3}),rt(n,[.25,.68,-.12],[.25,.68,.12],4,.015),n.box([0,.02,0],[.25,.02,.25],l.STONE,{group:5}),Zt(n,8,.8,6,19)}}},og=[["swings",-2.6,-2],["slide",2.4,-2.2],["climbing-frame",2.6,1.6],["roundabout",-.3,.4],["seesaw",-3.2,2],["spring-rider",.2,2.9]];function lg(n,e,t,i,s,r=1){n.box([0,.015,0],[e,.015,t],i,{round:.01,group:r,paint:a=>It(a,3,4)<.05||Math.abs(Math.sin(a[0]*1.3+1)*.5+Math.sin(a[0]*4.1)*.08-a[2]*.3)<.012?It(a,18)<.5?l.LEAF2:l.STONED:s(a[0],a[2])?It(a,10,2)<.25?i:l.CLOTH:It(a,5,7)<.07?l.MOSS:void 0})}const ai=(n,e,t=.045)=>Math.abs(n-e)<t,cg={"tennis-court":{desc:"a cracked tennis court, faded lines, grass through the cracks",decal:!0,build(n){lg(n,4.4+.5,2+.5,l.HAT2,(i,s)=>Math.abs(i)<=4.4+.05&&Math.abs(s)<=2+.05&&(ai(Math.abs(i),4.4)||ai(Math.abs(s),2)||ai(Math.abs(s),2*.75)||Math.abs(i)<4.4*.54&&(ai(s,0)||ai(Math.abs(i),4.4*.54))))}},"tennis-net":{desc:"a sagging tennis net between its posts",build(n){for(const e of[-2.2,2.2])rt(n,[0,0,e],[0,.55,e],1,.035);n.box([0,.38,0],[.01,.17,2.15],l.CLOTH,{group:2,paint:e=>e[1]>.5?l.CLOTH:e[1]*25%1<.25||(e[2]+5)*25%1<.25?l.SHADES:void 0}),n.box([0,.25,0],[.012,.15,1],l.SHADES,{group:2,cut:!0})}},"umpire-chair":{desc:"a tennis umpire's chair leaning over",split:1.4,build(n){const e=n.parts.length;for(const t of[-.25,.25])for(const i of[-.2,.2])rt(n,[t*1.4,0,i*1.4],[t,1.5,i],1,.03);for(let t=1;t<5;t++)rt(n,[-.3,t*.3,-.22],[-.3,t*.3,.22],1,.02);n.box([0,1.55,0],[.28,.04,.25],l.WOOD,{group:2}),n.box([-.26,1.8,0],[.03,.25,.25],l.WOOD,{group:2}),Ti(n,e,{roll:.25,pitch:-.1}),Zt(n,8,1,4,20)}},"court-fence":{desc:"a chain-link fence section, ivy through it, a gap torn in it",build(n){for(const e of[-1.5,0,1.5])rt(n,[e,0,0],[e,1.7,0],1,.03);rt(n,[-1.5,1.7,0],[1.5,1.7,0],1,.025),n.box([0,.85,0],[1.5,.85,.008],l.FRAME,{group:2,paint:e=>(e[0]+e[1]+9)*9%1<.2||(e[0]-e[1]+9)*9%1<.2?It(e,5)<.15?l.BODY2:l.FRAME:l.SHADES}),n.ell([.7,.5,0],[.4,.5,.05],l.SHADES,{group:2,cut:!0,rough:.08});for(let e=0;e<3;e++)ui(n,[-1.3+e*.6,0,.03],[-1.1+e*.5,1.5,.03],3+e,21+e)}},"tennis-balls":{desc:"a few old tennis balls glowing faintly in the grass",glow:!0,build(n){for(let e=0;e<4;e++)_r(n,[(jt(e)-.5)*1.2,.06,(jt(e,2)-.5)*.8],.06,1+e,e%2?l.MAGIC:l.MAGIC2);n.ell([0,.004,0],[.8,.004,.5],l.LEAF3,{group:9}),Zt(n,8,.8,5,22)}},"baseball-diamond":{desc:"a baseball diamond: the worn dirt infield, grown-over bases, a pitcher's mound",decal:!0,build(n){n.box([0,.015,0],[2.2*1.6,.015,2.2*1.2],l.LEAF2,{group:1,round:.01,paint:t=>{const i=Math.abs(t[0])/2.2+Math.abs(t[2])/1.6500000000000001;return i<1.08&&i>.78?It(t,8)<.2?l.LEAF2:l.BARK2:i<=.78?It(t,6)<.15?l.MOSS:void 0:It(t,6,3)<.3?l.LEAF:void 0}});for(const[t,i]of[[2.2,0],[0,2.2*.75],[-2.2,0],[0,-2.2*.75]])n.box([t*.93,.04,i*.93],[.12,.02,.1],l.BELLY,{group:2,round:.02,paint:s=>It(s,20)<.3?l.LEAF2:void 0});n.ell([0,.02,0],[.35,.08,.28],l.BARK2,{group:3})}},backstop:{desc:"a baseball backstop fence, a dugout bench beside it",build(n){for(let e=0;e<=4;e++){const t=-.8+e*.4;rt(n,[-Math.cos(t)*.8,0,Math.sin(t)*1.4],[-Math.cos(t)*.8,1.8,Math.sin(t)*1.4],1,.03)}for(let e=0;e<4;e++){const t=-.8+e*.4,i=t+.4,s=[-Math.cos(t)*.8,.9,Math.sin(t)*1.4],r=[-Math.cos(i)*.8,.9,Math.sin(i)*1.4],a=P.lerp(s,r,.5);n.box(a,[Math.hypot(r[0]-s[0],r[2]-s[2])/2,.9,.008],l.FRAME,{dir:P.sub(r,s),group:2,paint:o=>(o[1]+o[0]*2+9)*9%1<.2?It(o,5)<.2?l.BODY2:l.FRAME:l.SHADES})}n.box([-.6,.3,2],[.15,.04,.7],l.WOOD,{group:3});for(const e of[1.4,2.6])n.box([-.6,.14,e],[.12,.14,.04],l.WOOD,{group:3});ui(n,[-.75,0,-.5],[-.7,1.6,-.4],4,25)}},scoreboard:{desc:"a scoreboard frame, panels missing (no text)",split:1.8,build(n){for(const e of[-1,1])rt(n,[e,0,0],[e,2.6,0],1,.05);for(let e=0;e<3;e++)for(let t=0;t<5;t++)jt(e,t)>.3&&n.box([-.8+t*.4,1.6+e*.32,0],[.18,.14,.03],l.HAT1,{group:2+e,round:.01,paint:Kt(.3,.1)});n.box([0,2.62,0],[1.1,.05,.06],l.FRAME,{group:5}),ui(n,[-1,0,.06],[-.95,2.3,.06],6,26)}},"football-pitch":{desc:"a football pitch: faded lines, a centre circle, mown stripes long grown out",decal:!0,build(n){n.box([0,.015,0],[5.2+.5,.015,3.3+.5],l.LEAF2,{group:1,round:.01,paint:i=>{const s=i[0],r=i[2];return Math.abs(s)<=5.2+.05&&Math.abs(r)<=3.3+.05&&(ai(Math.abs(s),5.2,.06)||ai(Math.abs(r),3.3,.06)||ai(s,0,.06)||ai(Math.hypot(s,r*1),1,.06)||Math.abs(s)>5.2-1&&Math.abs(r)<1.6&&(ai(Math.abs(s),5.2-1,.06)||ai(Math.abs(r),1.6,.06)))?It(i,8,2)<.3?l.LEAF2:l.CLOTH:Math.floor((s+20)*.8)%2?It(i,6)<.25?l.LEAF2:l.LEAF:It(i,5,9)<.1?l.LEAF3:void 0}})}},goal:{desc:"a football goal, its net torn, a sapling grown through it",split:1.1,build(n){au(n,1),n.seg([.3,0,.2],[.3,1.5,.2],.035,.025,l.TRUNK,{group:5}),po(n,[.3,1.6,.2],[.35,.25,.3],6),Zt(n,8,1.2,7,27)}},"goal-tipped":{desc:"a football goal tipped on its back",build(n){const e=n.parts.length;au(n,1),Ti(n,e,{pitch:-Math.PI/2+.12,at:[-.5,.06,0]}),Zt(n,8,1.2,7,28)}},"corner-flag":{desc:"a corner flag, its flag a faded rag",build(n){rt(n,[0,0,0],[0,.9,0],1,.015),n.box([.12,.8,0],[.12,.08,.006],l.ACCENT,{group:2,dir:[1,-.3,.1],paint:Kt(.2,0)}),Zt(n,5,.4,3,29)}},floodlight:{desc:"a floodlight pylon, one lamp still flickering with fairy light",glow:!0,split:2.4,build(n){for(const[t,i]of[[-.25,-.25],[.25,-.25],[.25,.25],[-.25,.25]])rt(n,[t*1.6,0,i*1.6],[t*.5,4,i*.5],1,.035);for(let t=1;t<8;t++){const i=t*4/8,s=1.6-1.1*i/4;rt(n,[-.25*s,i,-.25*s],[.25*s,i+4/8,.25*s],2,.015),rt(n,[.25*s,i,-.25*s],[-.25*s,i+4/8,.25*s],2,.015)}for(let t=0;t<2;t++)for(let i=0;i<3;i++)n.box([-.3+i*.3,4+.2+t*.25,.1],[.12,.1,.06],l.FRAME,{group:3,round:.02,paint:s=>s[2]>.14?t===1&&i===1?l.MAGIC2:l.SHADES:Kt(.4,.1)(s)});_r(n,[0,4+.45,.22],.06,4,l.MAGIC2),ui(n,[-.4,0,.4],[-.2,2.4,.2],5,30)}},"basketball-hoop":{desc:"a basketball hoop on a leaning post, its net gone",split:1.8,build(n){const e=n.parts.length;rt(n,[0,0,0],[0,2.4,0],1,.05),n.box([.15,2.5,0],[.03,.3,.45],l.BELLY,{group:2,paint:t=>Math.abs(t[1]-2.4)<.1&&Math.abs(t[2])<.14&&Math.abs(Math.abs(t[2])-.12)<.02?l.ACCENT:Kt(.25,.1)(t)});for(let t=0;t<8;t++){const i=t/8*6.283,s=(t+1)/8*6.283;rt(n,[.36+Math.cos(i)*.17,2.32,Math.sin(i)*.17],[.36+Math.cos(s)*.17,2.32,Math.sin(s)*.17],3,.012,l.ACCENT)}Ti(n,e,{pitch:-.2}),Zt(n,8,1,5,31)}}};function au(n,e){for(const t of[-1.4,1.4])rt(n,[0,0,t],[0,1,t],e,.035,l.BELLY);rt(n,[0,1,-1.4],[0,1,1.4],e,.035,l.BELLY);for(const t of[-1.4,1.4])rt(n,[0,1,t],[-.6,0,t],e+1,.02,l.BELLY);n.box([-.3,.5,0],[.012,.55,1.38],l.CLOTH,{dir:[.6,1,0],group:e+2,paint:t=>t[1]*12%1<.3||(t[2]+5)*12%1<.3?l.CLOTH:l.SHADES}),n.ell([-.3,.4,.5],[.2,.3,.4],l.CLOTH,{group:e+2,cut:!0})}const hg={tennis:[["tennis-court",0,0],["tennis-net",0,0],["umpire-chair",0,-2.6],["court-fence",-2.5,-2.9],["court-fence",2.5,-2.9],["tennis-balls",3.5,1.8]],baseball:[["baseball-diamond",0,0],["backstop",-2.9,0],["scoreboard",3.5,-2.6]],football:[["football-pitch",0,0],["goal",-5.2,0],["goal-tipped",5.2,0],["corner-flag",-5.2,-3.3],["corner-flag",5.2,3.3],["floodlight",6.2,-4]],basketball:[["basketball-hoop",0,0]]};function ug(n={},e=16){const t=s=>Cr(n)*lf[s].size/e,i=s=>s.map(([r,a,o])=>({id:r,x:+(a*t(r)).toFixed(1),z:+(o*t(r)).toFixed(1)}));return{playground:i(og),...Object.fromEntries(Object.entries(hg).map(([s,r])=>[s,i(r)]))}}const oh=[...Object.entries(rg).map(([n,e])=>({id:n,family:"modern",size:1,split:null,...e})),...Object.entries(ag).map(([n,e])=>({id:n,family:"playground",size:1.1,split:null,...e})),...Object.entries(cg).map(([n,e])=>({id:n,family:"sports",size:1.1,split:null,...e}))],lf=Object.fromEntries(oh.map(n=>[n.id,n]));function dg(n={}){const e=n.leafHue??.3,t=n.trunkHue??.07;return{[l.BODY]:[92,118,140],[l.BODY2]:[132,74,42],[l.BODY3]:[34,32,38],[l.FRAME]:[150,152,158],[l.SHADES]:[24,24,30],[l.STONE]:[72,72,80],[l.STONED]:[34,34,40],[l.CLOTH]:[214,210,196],[l.BELLY]:[222,218,206],[l.ACCENT]:[214,92,40],[l.HAT1]:[54,84,120],[l.HAT2]:[86,112,92],[l.MOSS]:me(.26,.45,.45),[l.TRUNK]:me(t,.45,.36),[l.BARK2]:[98,74,52],[l.BARKD]:me(t+.03,.5,.17),[l.LEAF]:me(e,.55,.45),[l.LEAF2]:me(e-.03,.5,.6),[l.LEAF3]:me(e+.03,.6,.28),[l.WOOD]:[120,88,56],[l.STRAW]:[180,156,104],[l.WATER]:[44,70,96],[l.NOSE]:[14,12,18],[l.GLOW]:[255,170,80],[l.MAGIC]:me(n.magicHue??.2,.55,1),[l.MAGIC2]:me(n.magicHue??.2,.15,1),[l.LINE]:[24,22,30]}}function fg(n,e={},{ppm:t=16}={}){const i=lf[n];if(!i)throw new Error(`no relic "${n}"`);const s=new Qe({blend:.04});i.build(s),s.ell([0,.004,0],[.01,.004,.01],l.NOSE,{group:0});const r=Cr(e)*i.size,{sp:a,project:o}=cn(s,{scale:r});let h=0;for(const S of s.parts){if(S.extra||S.cut)continue;const b=S.type==="cone"?[[S.a,S.r1],[S.b,S.r2]]:[[S.c,S.r?Math.max(...S.r):Math.max(S.h[0],S.h[2])]];for(const[E,C]of b)E[1]-C<.3&&(h=Math.max(h,Math.hypot(E[0],E[2])+C))}let c=a.w,d=-1,f=a.h;for(let S=0;S<a.h;S++)for(let b=0;b<a.w;b++)a.m[S*a.w+b]&&(c=Math.min(c,b),d=Math.max(d,b),f=Math.min(f,S));const u=d-c+1,p=a.h-f,g=new dt(u,p),M=new dt(u,p),x=new dt(u,p),m=i.split==null?0:Math.max(0,Math.round(o([0,i.split,0])[1])-f);for(let S=0;S<p;S++)for(let b=0;b<u;b++){const E=(S+f)*a.w+b+c,C=a.m[E];if(!C)continue;const T=[a.n[E*3],a.n[E*3+1],a.n[E*3+2]];g.put(b,S,C,...T),(S<m?M:x).put(b,S,C,...T)}g.bodyH=a.bodyH;const v=r/t,[_,w]=o([0,0,0]),A=+(_-c).toFixed(1),y=+(w-f).toFixed(1);return{whole:g,top:M,bot:x,crownY:m,origin:{x:A,y},metres:{width:+(u/t).toFixed(1),height:+(p/t).toFixed(1),footprint:+(h*v).toFixed(1)}}}const pg=4,Ot=32;function mg(n){const e=n.tuning.camera.treetop.angleIn*Math.PI/180;return n.tuning.crownHeight/Math.sin(e)}function cf(n,e,t,i,s,r){const a=n.tuning.areaEdgeBlend,o=n.seed;if(a.width<=0)return n.areaAt(e,t).type;const h=(pi(e/a.scale,t/a.scale,o+81)-.5)*2*a.width+(we(i,s,r+1)-.5)*a.width*a.stray,c=(pi(e/a.scale,t/a.scale,o+82)-.5)*2*a.width+(we(i,s,r+2)-.5)*a.width*a.stray;return n.areaAt(e+h,t+c).type}function lh(n,e,t,i){const s=n.tuning,r=s.density,a=vt[i].layout,o=n.seed;if(n.hardClear(e,t))return 0;const h=n.paths.clearance(e,t).trees;if(h===0)return 0;const c=pi(e/r.patchScale,t/r.patchScale,o+91),d=r.patchMin+(r.patchMax-r.patchMin)*ln((c-.25)/.5),f=n.treeWeight(e,t)*a.density*d*gg(n,e,t,a)*s.treeDensity;return Math.max(f,r.lone)*h}function gg(n,e,t,i){const s=n.seed,r=i.clump;switch(i.pattern){case"groves":case"stands":{const a=i.pattern==="groves"?18:10,o=pi(e/a,t/a,s+93);return 1+r*(2.2*ln((o-.45)/.2)-1)}case"thicket":return 1.25;case"rows":{const o=((typeof i.along=="number"?i.along:(i.lean?.dir??0)+20)+90)*Math.PI/180,h=e*Math.cos(o)+t*Math.sin(o);return .25+1.5*ln((Math.cos(h/5*Math.PI*2)-.2)/.6)}case"rings":{const a=n.areaAt(e,t).openness;return .3+1.4*ln((Math.cos(a*Math.PI*7)-.1)/.6)}case"edgeOnly":return 1.6*ln((n.areaAt(e,t).openness-.45)/.35);default:return 1}}function ou(n,e,t){const{treeSpacingX:i,treeSpacingZ:s}=n.tuning,r=n.seed,a=[],o=mg(n),h=n.tuning.crownHalfWidth,c=Math.ceil(t*Ot/s),d=Math.ceil((t+1)*Ot/s);for(let f=c;f<d;f++){const u=f&1?.5:0,p=Math.ceil(e*Ot/i-u),g=Math.ceil((e+1)*Ot/i-u);for(let M=p;M<g;M++){const x=(M+u+(we(M,f,r+101)-.5)*.7)*i,m=(f+(we(M,f,r+102)-.5)*.7)*s,v=cf(n,x,m,M,f,r+106),_=lh(n,x,m,v);we(M,f,r+103)>=_||n.hardClear(x,m-o)||n.hardClear(x-h,m-o)||n.hardClear(x+h,m-o)||a.push({x,z:m,type:v,variant:Math.floor(we(M,f,r+104)*1000003),flip:we(M,f,r+105)<.5})}}return a}function lu(n,e,t){const i=n.tuning.bushSpacing,s=n.seed,r=[],a=Math.ceil(t*Ot/i),o=Math.ceil((t+1)*Ot/i),h=Math.ceil(e*Ot/i),c=Math.ceil((e+1)*Ot/i);for(let d=a;d<o;d++)for(let f=h;f<c;f++){const u=(f+we(f,d,s+201)-.5)*i,p=(d+we(f,d,s+202)-.5)*i,g=1+n.tuning.bushClump*(2*ln((pi(u/13,p/13,s+207)-.35)/.3)-1),M=n.paths.clearance(u,p).bushes;if(M===0)continue;const x=cf(n,u,p,f,d,s+206);if(Jm(n,x))continue;const m=1-Math.min(1,lh(n,u,p,x)/.8);we(f,d,s+203)>(.15+.85*m)*vt[x].layout.undergrowth*n.tuning.bushDensity*g*M||Math.hypot(u-n.dancefloor.x,p-n.dancefloor.z)<Ws(n.tuning)||n.hardClear(u,p)||r.push({x:u,z:p,type:x,variant:Math.floor(we(f,d,s+204)*pg),flip:we(f,d,s+205)<.5})}return r}const cu=new WeakMap;function xg(n){let e=cu.get(n);if(e===void 0){const t=n.tuning.decor;e=(t.ruins+t.rocks+t.freak)*1.5*Math.max(1,...vt.map(i=>i.layout.decor?i.layout.decor.rate/.3:1)),cu.set(n,e)}return e}function hf(n,e,t){const i=n.tuning.decor,s=i.spacing,r=n.seed,a=we(e,t,r+503);if(a>=xg(n))return null;const o=(e+(we(e,t,r+501)-.5)*.8)*s,h=(t+(we(e,t,r+502)-.5)*.8)*s,c=n.areaAt(o,h),d=vt[c.type].layout,f=d.decor,u=f?f.rate/.3:1,p=d.terrain?.includes("rocky")?2:1,g=f?[f.ruins,f.rocks*p,f.freak]:[i.ruins,i.rocks*p,i.freak],M=g[0]+g[1]+g[2]||1,x=(i.ruins+i.rocks+i.freak)*u*(f?(f.ruins+f.rocks+f.freak)/Math.max(.01,f.ruins+f.rocks+f.freak+f.lake+f.modern):1)*(p>1?1.5:1);if(a>=x||c.openness<i.clearing||n.hardClear(o,h)||n.paths.at(o,h,i.pathGap)||n.reserved(o,h,i.footprint)||Math.hypot(o-n.dancefloor.x,h-n.dancefloor.z)<Ws(n.tuning)+6)return null;const m=1-Math.min(1,lh(n,o,h,c.type)/.8);if(we(e,t,r+504)>.35+.65*m)return null;const v=a/x*M,_=v<g[0]?"ruins":v<g[0]+g[1]?"rocks":"freak";return{x:o,z:h,family:_,variant:Math.floor(we(e,t,r+505)*1e6),flip:we(e,t,r+506)<.5,rank:we(e,t,r+507),i:e,j:t}}function ch(n,e,t,i,s,r,a){const o=[],h=Math.ceil(t/e)+1;for(let c=r;c<a;c++)for(let d=i;d<s;d++){const f=n(d,c);if(!f)continue;let u=!0;for(let p=-h;p<=h&&u;p++)for(let g=-h;g<=h;g++){if(!g&&!p)continue;const M=n(d+g,c+p);if(M&&M.rank>f.rank&&Math.hypot(M.x-f.x,M.z-f.z)<t){u=!1;break}}u&&o.push(f)}return o}function hu(n,e,t){const i=n.tuning.decor,s=i.spacing,r=hh(n).decor,a=[];for(const{rank:o,i:h,j:c,...d}of ch((f,u)=>hf(n,f,u),s,i.minGap,Math.ceil(e*Ot/s),Math.ceil((e+1)*Ot/s),Math.ceil(t*Ot/s),Math.ceil((t+1)*Ot/s))){if(d.family==="rocks"){a.push(d);continue}const f=r.get(h+","+c);f!==void 0&&a.push({...d,variant:f})}return a}function uf(n,e,t){const i=n.tuning.relics,s=i.spacing,r=n.seed;if(we(e,t,r+883)>=i.chance*5.5*Math.max(1,i.nearRoad))return null;const a=(e+(we(e,t,r+881)-.5)*.8)*s,o=(t+(we(e,t,r+882)-.5)*.8)*s,h=n.areaAt(a,o),c=vt[h.type].layout.decor,d=c?c.modern/Math.max(.01,c.ruins+c.rocks+c.freak+c.lake+c.modern):.1,f=we(e,t,r+883),u=i.chance*(.5+5*d);if(f>=u*Math.max(1,i.nearRoad))return null;const p=n.paths.at(a,o,20),g=p&&(p.kind==="road"||p.kind==="rail")?i.nearRoad:1;return f>=u*g||h.openness<n.tuning.decor.clearing||n.hardClear(a,o)||n.paths.at(a,o,2)||n.paths.pieceAt(a,o)||n.reserved(a,o,n.tuning.decor.footprint)||Math.hypot(a-n.dancefloor.x,o-n.dancefloor.z)<Ws(n.tuning)+6?null:{x:a,z:o,variant:Math.floor(we(e,t,r+884)*1e6),flip:we(e,t,r+885)<.5,rank:we(e,t,r+886),i:e,j:t}}function uu(n,e,t){const i=n.tuning.relics,s=i.spacing,r=hh(n).relics,a=[];for(const{rank:o,i:h,j:c,...d}of ch((f,u)=>uf(n,f,u),s,i.minGap,Math.ceil(e*Ot/s),Math.ceil((e+1)*Ot/s),Math.ceil(t*Ot/s),Math.ceil((t+1)*Ot/s))){const f=r.get(h+","+c);f!==void 0&&a.push({...d,variant:f})}return a}const du=new WeakMap,nc=[],Mg=Is.filter(n=>n.family==="freak").length;for(let n=0,e=0;n<Is.length;n++)Is[n].family==="ruins"&&(nc.push(e),e+=Is[n].variants);const vg=Is.filter(n=>n.family==="ruins").map(n=>n.variants),bg=oh.filter(n=>n.family==="modern").length;function hh(n){let e=du.get(n);if(e)return e;const t=n.extent,i=n.seed,s=(o,h,c,d,f)=>{const u=new Map,g=ch((m,v)=>{const _=m+","+v;let w=u.get(_);return w===void 0&&u.set(_,w=o(m,v)),w},h,c,Math.floor(t.minX/h),Math.ceil(t.maxX/h)+1,Math.floor(t.minZ/h),Math.ceil(t.maxZ/h)+1).sort((m,v)=>v.rank-m.rank),M=new Map,x=new Map;for(const m of g){const v=d(m);if(!v)continue;const[_,w]=v,A=M.get(_)??new Set;if(M.set(_,A),A.size>=w)continue;let y=Math.floor(we(m.i,m.j,i+509)*w);for(;A.has(y);)y=(y+1)%w;A.add(y),x.set(m.i+","+m.j,f(m,y))}return x},r=n.tuning.decor,a=n.tuning.relics;return e={decor:s((o,h)=>hf(n,o,h),r.spacing,r.minGap,o=>o.family==="ruins"?["ruins",nc.length]:o.family==="freak"?["freak",Mg]:null,(o,h)=>o.family==="ruins"?nc[h]+o.variant%vg[h]:h),relics:s((o,h)=>uf(n,o,h),a.spacing,a.minGap,()=>["modern",bg],(o,h)=>h)},du.set(n,e),e}const yg=new Set(["wetland","stream","bog","beaver-pond","moor"]);function fu(n,e,t){const i=n.tuning.lightSources,s=i.spacing,r=n.seed,a=[],o=Math.ceil(t*Ot/s),h=Math.ceil((t+1)*Ot/s),c=Math.ceil(e*Ot/s),d=Math.ceil((e+1)*Ot/s);for(let f=o;f<h;f++)for(let u=c;u<d;u++){const p=(u+(we(u,f,r+401)-.5)*.7)*s,g=(f+(we(u,f,r+402)-.5)*.7)*s;if(Math.hypot(p-n.dancefloor.x,g-n.dancefloor.z)<Ws(n.tuning)+4)continue;const M=n.areaAt(p,g),x=M.openness<.35||M.openness>.8?1:.25,m=we(u,f,r+403),_=(yg.has(vt[M.type].id)||!!vt[M.type].layout.terrain?.includes("pools")?i.wetPond:i.pond)*x,w=i.campfire*x,A=i.magicStone*x,y=m<_?"pond":m<_+w?"campfire":m<_+w+A?"stone":null;y&&a.push({x:p,z:g,kind:y,size:.75+we(u,f,r+404)*.5})}return a}class uh{constructor(e){this.map=e,hh(e)}map;trees=new Map;bushes=new Map;wallFeatureCache=new Map;lights=new Map;decor=new Map;relics=new Map;buildMs=0;static KEEP=2500;centre={x:0,z:0};chunks(e,t,i){const s=[];for(let r=Math.floor((t-i)/Ot);r<=Math.floor((t+i)/Ot);r++)for(let a=Math.floor((e-i)/Ot);a<=Math.floor((e+i)/Ot);a++)s.push([a,r]);return s}evict(e,t=uh.KEEP,i=Ot){if(e.size<=t)return;const s=this.centre,r=[...e.keys()].map(a=>{const[o,h]=a.split(",").map(Number);return[a,((o+.5)*i-s.x)**2+((h+.5)*i-s.z)**2]});r.sort((a,o)=>o[1]-a[1]);for(const[a]of r.slice(0,e.size-Math.floor(t*.8)))e.delete(a)}chunk(e,t,i,s){const r=i+","+s;let a=e.get(r);if(!a){const o=performance.now();a=t(i,s),this.buildMs+=performance.now()-o,e.set(r,a)}return a}gather(e,t,i,s,r){this.centre={x:i,z:s},this.evict(e);const a=[];for(const[o,h]of this.chunks(i,s,r))for(const c of this.chunk(e,t,o,h))Math.abs(c.x-i)<=r&&Math.abs(c.z-s)<=r&&a.push(c);return a}kinds(){const e=this.map;return[[this.trees,(t,i)=>ou(e,t,i)],[this.bushes,(t,i)=>lu(e,t,i)],[this.decor,(t,i)=>hu(e,t,i)],[this.relics,(t,i)=>uu(e,t,i)],[this.lights,(t,i)=>fu(e,t,i)]]}prefetch(e,t,i,s){const r=performance.now(),a=this.kinds(),o=this.chunks(e,t,i).filter(([u,p])=>a.some(([g])=>!g.has(u+","+p)));o.sort((u,p)=>((u[0]+.5)*Ot-e)**2+((u[1]+.5)*Ot-t)**2-(((p[0]+.5)*Ot-e)**2+((p[1]+.5)*Ot-t)**2));let h=0;for(const[u,p]of o){if(h>0&&performance.now()-r>s)break;for(const[g,M]of a)this.chunk(g,M,u,p);h++}const c=this.map.areaSize,d=[];for(let u=Math.floor((t-i)/c)-1;u<=Math.floor((t+i)/c)+1;u++)for(let p=Math.floor((e-i)/c)-1;p<=Math.floor((e+i)/c)+1;p++)this.wallFeatureCache.has(p+","+u)||d.push([p,u,((p+.5)*c-e)**2+((u+.5)*c-t)**2]);d.sort((u,p)=>u[2]-p[2]);let f=0;for(const[u,p]of d){if(performance.now()-r>s)break;this.featuresOf(u,p),f++}return o.length-h+d.length-f}treesNear(e,t,i){return this.gather(this.trees,(s,r)=>ou(this.map,s,r),e,t,i)}bushesNear(e,t,i){return this.gather(this.bushes,(s,r)=>lu(this.map,s,r),e,t,i)}lightsNear(e,t,i){return this.gather(this.lights,(s,r)=>fu(this.map,s,r),e,t,i)}decorNear(e,t,i){return this.gather(this.decor,(s,r)=>hu(this.map,s,r),e,t,i)}relicsNear(e,t,i){return this.gather(this.relics,(s,r)=>uu(this.map,s,r),e,t,i)}features(e,t,i,s){const r=this.map.areaSize,a=[];this.centre={x:e,z:t},this.evict(this.wallFeatureCache,400,r);for(let o=Math.floor((t-i)/r)-1;o<=Math.floor((t+i)/r)+1;o++)for(let h=Math.floor((e-i)/r)-1;h<=Math.floor((e+i)/r)+1;h++)for(const c of s(this.featuresOf(h,o)))Math.abs(c.x-e)<=i&&Math.abs(c.z-t)<=i&&a.push(c);return a}featuresOf(e,t){const i=e+","+t;let s=this.wallFeatureCache.get(i);if(!s){const r=performance.now();s=Zm(this.map,e,t),this.buildMs+=performance.now()-r,this.wallFeatureCache.set(i,s)}return s}wallsNear(e,t,i){return this.features(e,t,i,s=>s.walls)}bedsNear(e,t,i){return this.features(e,t,i,s=>s.beds)}setPiecesNear(e,t,i){const s=this.map,r=s.areaSize,a=[];for(let o=Math.floor((t-i)/r)-1;o<=Math.floor((t+i)/r)+1;o++)for(let h=Math.floor((e-i)/r)-1;h<=Math.floor((e+i)/r)+1;h++){const c=s.setPieceSpot(h,o);c&&Math.abs(c.x-e)<=i&&Math.abs(c.z-t)<=i&&a.push({x:c.x,z:c.z,type:s.typeOf(h,o),variant:0,flip:we(h,o,s.seed+71)<.5})}return a}}const _g=()=>({stack:[],placed:[],talk:null,progress:new Map,events:[],held:!1,heldInAir:!1}),df=(n,e)=>e.invite.talkTime[Math.min(n.level,e.invite.talkTime.length-1)],wg=(n,e)=>e.invite.turn[Math.min(n.level,e.invite.turn.length-1)],ic=n=>!n.leashed&&n.level!==ko;function Sg(n,e,t,i){if(n.stack.includes(e))return{x:t,z:i};const s=n.placed.find(r=>r.id===e);return s?{x:s.x,z:s.z}:null}function jo(n,e,t,i,s=!1){let r=null,a=i;for(const o of n){if(o.leashed||!s&&!ic(o))continue;const h=Math.hypot(o.x-e,o.z-t);h<=a&&(a=h,r=o)}return r}function pu(n,e,t,i,s){e.leashed=!0,e.rest=0,n.stack.push(e.id),n.events.push({kind:"invited",id:e.id,x:t,z:i,at:s})}function Eg(n,e,t,i,s,r,a,o){n.events=[],n.held=t.talk,n.heldInAir=t.talk&&!s;const h=o.invite,c=o.leash,d=f=>e[f];if(t.talk&&s){const f=n.talk?d(n.talk.id):null;if(f&&!f.leashed&&Math.hypot(f.x-i.x,f.z-i.z)<=h.cancelDistance)n.talk.t+=a,n.progress.set(f.id,n.talk.t),f.rest=Math.max(f.rest,.2),f.moving=!1,f.facing=i.x>=f.x?1:-1,f.away=i.z<f.z-1,!n.talk.refused&&n.talk.t>=n.talk.total&&(pu(n,f,f.x,f.z,r),n.progress.delete(f.id),n.talk=null);else{n.talk&&n.events.push({kind:"cancelled",id:n.talk.id,x:i.x,z:i.z,at:r});const u=jo(e,i.x,i.z,h.talkRange)??jo(e,i.x,i.z,h.talkRange,!0);n.talk=u?{id:u.id,refused:!ic(u),t:n.progress.get(u.id)??0,total:ic(u)?df(u,o):1/0}:null}}else n.talk&&(n.events.push({kind:"cancelled",id:n.talk.id,x:i.x,z:i.z,at:r}),n.talk=null);for(const[f,u]of n.progress){if(n.talk?.id===f)continue;const p=u-a*h.decayRate;p<=0||e[f].leashed?n.progress.delete(f):n.progress.set(f,p)}if(t.inviteNearest){const f=jo(e,i.x,i.z,1/0);f&&pu(n,f,f.x,f.z,r)}if(t.sigil&&s){let f=-1,u=c.pickRadius;if(n.placed.forEach((p,g)=>{const M=Math.hypot(p.x-i.x,p.z-i.z);M<=u&&(u=M,f=g)}),f>=0){const[p]=n.placed.splice(f,1);n.stack.push(p.id),n.events.push({kind:"picked",id:p.id,x:p.x,z:p.z,at:r})}else if(n.stack.length){const p=n.stack[n.stack.length-1];ff(n,i.x,i.z,o)?n.events.push({kind:"fizzled",id:p,x:i.x,z:i.z,at:r}):(n.stack.pop(),n.placed.push({id:p,x:i.x,z:i.z,at:r}),n.events.push({kind:"placed",id:p,x:i.x,z:i.z,at:r}))}}for(const f of n.stack)mu(d(f),i.x,i.z,a,o);for(const f of n.placed)mu(d(f.id),f.x,f.z,a,o)}const ff=(n,e,t,i)=>n.placed.some(s=>Math.hypot(s.x-e,s.z-t)<i.leash.spacing);function mu(n,e,t,i,s){const r=s.leash,a=r.length,o=Math.hypot(n.x-e,n.z-t)>a;if(o){const p=Math.hypot(n.x-e,n.z-t),g=a*.5/p;n.tx=e+(n.x-e)*g,n.tz=t+(n.z-t)*g,n.rest=0}else if(n.rest>0){n.rest-=i,n.moving=!1,n.away=!1;return}else if(Math.hypot(n.tx-e,n.tz-t)>a*.85||Math.hypot(n.tx-n.x,n.tz-n.z)<.05){Math.hypot(n.tx-n.x,n.tz-n.z)<.05&&(n.rest=.5+n.rand()*2);const p=n.rand()*Math.PI*2,g=Math.sqrt(n.rand())*a*.8;if(n.tx=e+Math.cos(p)*g,n.tz=t+Math.sin(p)*g,n.rest>0){n.moving=!1,n.away=!1;return}}const h=n.tx-n.x,c=n.tz-n.z,d=Math.hypot(h,c);if(d<1e-4){n.moving=!1;return}const f=o?Math.max(n.speed,r.runSpeed*(n.level===ko?.6:1)):n.speed*1.5,u=Math.min(d,f*i);n.x+=h/d*u,n.z+=c/d*u,Math.abs(h)>.02&&(n.facing=h>0?1:-1),n.away=ah(h,c,n.away,0,s),n.moving=!0,n.walk+=i*(o?7:4)}const dh=n=>`${n[0]},${n[1]}`;function Ag(n){const e={cell:n.centreCell,wave:0,at:0,from:null,soundsystem:null},t={areas:new Map([[dh(n.centreCell),e]]),wave:0,nextAt:n.tuning.party.startDelay+n.tuning.party.interval,paused:!1,next:null,last:null};return t.next=fh(t,n),t}function fh(n,e,t=e.tuning.party.picker,i){const s=e.dancefloor,r=e.tuning.party.noisy,a=Ii(e.seed*131+n.wave*7919+3),o=new Set;for(const u of n.areas.keys())for(const p of e.neighbours.get(u)??[])n.areas.has(p)||o.add(p);const h=[];for(let u=0;u<e.n;u++)for(let p=0;p<e.n;p++){const g=`${p},${u}`;if(n.areas.has(g))continue;const M=e.soundsystemSpot(p,u);h.push({key:g,cell:[p,u],dist:Math.hypot(M.x-s.x,M.z-s.z)})}const c=h.filter(u=>o.has(u.key)),d=t==="near3"?h:c.length?c:h;if(!d.length)return null;if(t==="nearest"){const u=[...d].sort((p,g)=>p.dist-g.dist)[0].cell;return i?.push(u),u}if(t==="noisy"){const u=r.lobeSize,p=e.seed+911,g=x=>{const m=e.siteOf(x.cell[0],x.cell[1]),v=.65*pi(m.x/u,m.z/u,p)+.35*pi(m.x/(u/2.3),m.z/(u/2.3),p+1);return x.dist*(1+r.wobble*(v-.5)*2)};let M=[...d].sort((x,m)=>g(x)-g(m)).slice(0,Math.max(1,r.candidates));if(r.spreadFromLast&&n.last){const x=e.neighbours.get(dh(n.last))??new Set,m=M.filter(v=>!x.has(v.key));m.length&&(M=m)}return i?.push(...M.map(x=>x.cell)),M[Math.floor(a()*M.length)].cell}const f=[...d].sort((u,p)=>u.dist-p.dist).slice(0,3);return i?.push(...f.map(u=>u.cell)),f[Math.floor(a()*f.length)].cell}function Tg(n,e){const t=Math.floor(we(e[0],e[1],n.seed+77)*3)%3;return{...n.soundsystemSpot(e[0],e[1]),variant:t}}function pf(n,e){if(!n.next)return[];const t=dh(n.next),i=e.siteOf(n.next[0],n.next[1]);let s=e.centreCell,r=1/0;for(const a of e.neighbours.get(t)??[]){const o=n.areas.get(a);if(!o)continue;const h=e.siteOf(o.cell[0],o.cell[1]),c=Math.hypot(h.x-i.x,h.z-i.z);c<r&&(r=c,s=o.cell)}return[{key:t,cell:n.next,from:s}]}function mf(n,e,t){const i=n.wave+1,s=[];for(const{key:r,cell:a,from:o}of pf(n,e)){const h={cell:a,wave:i,at:t,from:o,soundsystem:Tg(e,a)};n.areas.set(r,h),s.push(h)}return n.wave=i,s.length&&(n.last=s[s.length-1].cell),n.next=fh(n,e),s}function Rg(n,e,t,i){return n.paused?(n.nextAt+=i,[]):t<n.nextAt?[]:(n.nextAt+=e.tuning.party.interval,mf(n,e,t))}function sc(n,e,t){const i=Math.max(0,n.nextAt-t),s=e.tuning.party.interval;return{left:i,gone:1-Math.min(1,i/s)}}function Cg(n,e){const t=new Set(pf(n,e).map(s=>s.key)),i=[];for(let s=0;s<e.n;s++)for(let r=0;r<e.n;r++){const a=`${r},${s}`;if(n.areas.has(a))continue;const o=e.soundsystemSpot(r,s);i.push({key:a,cell:[r,s],x:o.x,z:o.z,awake:t.has(a)})}return i}const tn=32,wr=15,fs=tn/2,Lg=(n,e)=>(n+.5-fs)**2+(e+.5-fs)**2<=wr*wr,ph=Uint8Array.from({length:tn*tn},(n,e)=>Lg(e%tn,e/tn|0)?1:0);function Pg(n){const e=new Uint8Array(tn*tn);for(let t=0;t<tn;t++)for(let i=0;i<tn;i++)ph[t*tn+i]&&(e[t*tn+i]=n(i+.5-fs,t+.5-fs)||0);return e}const mo=(n,e,t,i)=>{const s=i[0]-t[0],r=i[1]-t[1],a=Math.max(0,Math.min(1,((n-t[0])*s+(e-t[1])*r)/(s*s+r*r||1)));return Math.hypot(n-t[0]-s*a,e-t[1]-r*a)},gf=(n,e,t)=>{let i=!1;for(let s=0,r=t.length-1;s<t.length;r=s++)t[s][1]>e!=t[r][1]>e&&n<(t[r][0]-t[s][0])*(e-t[s][1])/(t[r][1]-t[s][1])+t[s][0]&&(i=!i);return i},Pr=(n,e)=>Math.atan2(e,n),Dg=n=>(n%(Math.PI*2)+Math.PI*3)%(Math.PI*2)-Math.PI,xf=(n,e,t)=>[n*Math.cos(t)+e*Math.sin(t),-n*Math.sin(t)+e*Math.cos(t)],Ig=(n,e,t,i=-Math.PI/2,s=0,r=0)=>Array.from({length:n*2},(a,o)=>{const h=o%2?t:e,c=i+o*Math.PI/n;return[s+Math.cos(c)*h,r+Math.sin(c)*h]});function Wt(n,e,t,i,s,r,a,o,h={}){const c=s*r,d=Array.from({length:c},(u,p)=>Pg(o(p,c))),f=d.map(u=>u.reduce((p,g)=>p+(g?1:0),0));return{id:n,name:e,kind:t,level:i,beats:s,fpb:r,palette:a,frames:d,key:f.indexOf(Math.max(...f)),...h}}function Og(){const n=Array.from({length:5},(e,t)=>[Math.cos(-Math.PI/2+t*4*Math.PI/5)*12,Math.sin(-Math.PI/2+t*4*Math.PI/5)*12]);return Wt("pentagram","Pentagram","shape",2,4,2,["violet","magenta"],e=>(t,i)=>{const s=Math.min(5,e+1.5),r=Math.hypot(t,i);for(let a=0;a<5;a++)if(a<s&&mo(t,i,n[a],n[(a+1)%5])<.75)return e>=4&&e%2?2:1;if(e>=3&&Math.abs(r-13.4)<.7)return e>=4&&e%2?1:2})}function Ng(){return Wt("moon","Waxing moon","shape",1,8,1,["lemon","cyan"],n=>(e,t)=>{const i=n/7,s=Math.hypot(e,t),r=21*(1-i)+.01;if(s<10&&(i>=1||Math.hypot(e+r,t)>10))return 1;if(n%2===0&&Math.abs(s-12.5)<.6)return 2})}function Fg(){const n=[0,.25,.6,1,1,1,1,1,1,1,.4,0,.4,1,1,1];return Wt("eye","Opening eye","shape",2,4,4,["mint","violet","magenta"],e=>(t,i)=>{const s=n[e],r=7.5*(1-(t/13.5)**2),a=Math.sin(e*.8)*3;if(Math.abs(t)>13.5)return;if(Math.abs(Math.abs(i)-s*r)<.6||s<.05&&Math.abs(i)<.6)return 1;if(Math.abs(i)<s*r){const h=Math.hypot(t-a,i);if(h<2)return 3;if(h<5)return 2}})}function kg(){return Wt("spiral","Turning spiral","loop",3,4,4,["cyan","pink"],(n,e)=>(t,i)=>{const s=Math.hypot(t,i),r=((Pr(t,i)-s*.42+n/e*Math.PI*2)/Math.PI+4)%2;if(!(s<1.2)){if(r<.42)return 1;if(r>=1&&r<1.42)return 2}})}function Ug(){return Wt("ripples","Ripples","loop",1,4,2,["blue","cyan","mint"],(n,e)=>(t,i)=>{const s=Math.hypot(t,i),r=n/2%1*5,a=Math.floor((s-r)/5+10);if(((s-r)%5+5)%5<1.25)return 1+a%3})}function Bg(){return Wt("rune-band","Rune band","loop",2,8,2,["orange","lemon"],(n,e)=>(t,i)=>{const s=Math.hypot(t,i);if(s>10&&s<14.5){const r=((Pr(t,i)/(Math.PI*2)+.5)*9+n/e*9)%9,a=r%1,o=(s-10.2)/4.1;if(Rr(a,o,Math.floor(r)+5,.16))return 1}if(Math.abs(s-9.5)<.5||Math.abs(s-14.6)<.45||Math.abs(s-(n%2?3:2))<.6)return 2})}function zg(){return Wt("sun","Sunburst","shape",3,4,2,["lemon","orange","red"],(n,e)=>(t,i)=>{const s=Math.hypot(t,i),r=Pr(t,i)+n/e*Math.PI/3,a=(r/(Math.PI*2)*12%1+1)%1,o=Math.floor((r/(Math.PI*2)+1)*12)%2;if(s<4.6)return 1;if(s>6&&s<14.5&&Math.abs(a-.5)<.2*(1-(s-6)/12))return o?2:3})}function Gg(){const n=[0,1,2].map(e=>{const t=-Math.PI/2+e*Math.PI*2/3;return[Math.cos(t)*5.6,Math.sin(t)*5.6]});return Wt("triquetra","Triquetra","shape",2,3,1,["acid","cyan","violet"],e=>(t,i)=>{for(let s=0;s<3;s++){const r=Math.hypot(t-n[s][0],i-n[s][1]);if(Math.abs(r-9.4)<.75&&n.some((a,o)=>o!==s&&Math.hypot(t-a[0],i-a[1])<9.4))return 1+(s+e)%3}if(Math.abs(Math.hypot(t,i)-14.2)<.6)return 1+(e+1)%3})}function Hg(){return Wt("mushroom-ring","Mushroom ring","shape",1,4,2,["red","lemon","acid"],n=>(e,t)=>{for(let i=0;i<8;i++){const s=i*Math.PI/4,r=Math.cos(s)*10,a=Math.sin(s)*10-((i+n)%2?.8:0),o=e-r,h=t-a;if(h<0&&o*o/7+h*h/4<1)return Math.abs(o-.8)<.5&&Math.abs(h+1)<.5?2:1;if(h>=0&&h<2.3&&Math.abs(o)<.7)return 2}if(Math.hypot(e,t)<1.2&&n%2)return 3})}function Wg(){const n=Array.from({length:8},(t,i)=>{const s=i/7,r=i%2?1:-1;return[-10.5+s*21+r*2.6,9-s*18+r*2.6]}),e=(t,i,s)=>{const r=(t-s[0])/1.5,a=(i-s[1])/1.5;return r*r/2.6+(a-.6)**2/2<1?!0:[[-1.6,-1.3],[-.55,-2.2],[.55,-2.2],[1.6,-1.3]].some(([o,h])=>Math.hypot(r-o,a-h)<.62)};return Wt("paws","Paw prints","loop",2,8,1,["acid","mint"],t=>(i,s)=>{for(let r=t;r>=Math.max(0,t-1);r--)if(e(i,s,n[r]))return r===t?1:2})}function Vg(){const n=[[-3,-14],[2,-6],[-2,-4],[4,5],[0,6],[5,14]],e=[[2,-6],[8,-2],[10,1]],t=[1,0,1,1,0,0,1,0];return Wt("lightning","Lightning","shape",4,2,4,["lemon","cyan"],i=>(s,r)=>{if(!t[i])return 0;for(let a=0;a+1<n.length;a++)if(mo(s,r,n[a],n[a+1])<(i===0?1.2:.8))return 1;for(let a=0;a+1<e.length;a++)if(mo(s,r,e[a],e[a+1])<.6)return 2})}function Yg(){return Wt("heart","Heart","shape",1,2,2,["red","pink"],n=>(e,t)=>{const i=n%2?9.5:11.5,s=e/i*1.25,r=-(t+1)/i*1.25;if((s*s+r*r-1)**3-s*s*r**3<=0)return(h=>(h*h+(r/.8)**2-1)**3-h*h*(r/.8)**3)(s/.8)<=0?2:1})}function Xg(){return Wt("hand","Hand","shape",2,4,1,["magenta","pink"],n=>(e,t)=>{const[i,s]=xf(e,t,(n%2?1:-1)*.15),r=[[-10,-5,-6,1.5],[-5.6,-12,-4.2,-3],[-1.8,-13,-1.4,-3.5],[1.9,-12.5,1.4,-3.5],[5.4,-10.5,4.2,-3]],a=(i/5.6)**2+((s-3)/6.2)**2;if(a<1)return Math.hypot(i,s-3)<2||a>.62?1:2;for(const[o,h,c,d]of r)if(mo(i,s,[o,h],[c,d])<1.05)return 1})}function Kg(){return Wt("key","Key","shape",1,4,1,["lemon","orange"],n=>(e,t)=>{const[i,s]=xf(e,t,n*Math.PI/2*.25),r=Math.hypot(i+6.5,s);if(r<4.6&&r>2.4)return 1;if(r<=1.2)return 2;if(i>-2.2&&i<10.5&&Math.abs(s)<.8)return 1;if(i>6.6&&i<7.8&&s>0&&s<3.2||i>9&&i<10.5&&s>0&&s<2.4)return 2})}function qg(){const n=[[-5.5,4],[5.5,4],[1.5,-6],[5.5,-12],[-1.5,-7]];return Wt("witch-hat","Witch's hat","shape",1,4,1,["violet","acid","lemon"],e=>(t,i)=>{if(Math.abs(i-3.2)<1.2&&Math.abs(t)<4.6&&Math.abs(t-(e%2?0:.5))<1)return 3;if(Math.abs(i-3.2)<1.1&&Math.abs(t)<5.2)return 2;if(gf(t,i,n)||(t/11)**2+((i-5)/2.2)**2<1)return 1})}function $g(){return Wt("rosette","Rosette","shape",2,4,2,["pink","mint","lemon"],(n,e)=>(t,i)=>{if(Math.hypot(t,i)<2.6)return 3;for(let r=0;r<6;r++){const a=r*Math.PI/3+n/e*Math.PI/3,o=Math.hypot(t-Math.cos(a)*8,i-Math.sin(a)*8);if(o<4.6)return o>3.3||r===n%6?1:2}})}function Zg(){const n=[[-7,-6],[6,-8],[8,4],[-5,8],[0,0]];return Wt("stars","Twinkling stars","fill",2,4,2,["lemon","cyan","pink"],e=>(t,i)=>{for(let s=0;s<n.length;s++){if((s+e)%3===0)continue;const r=(s+e)%2?3.2:4.2;if(gf(t,i,Ig(5,r,r*.42,-Math.PI/2,n[s][0],n[s][1])))return 1+s%3}})}const Jg=()=>Wt("checker","Checkerboard","fill",1,2,1,["cyan","magenta"],n=>(e,t)=>1+(Math.floor((e+16)/2)+Math.floor((t+16)/2)+n)%2),Qg=()=>Wt("sparkle","Sparkle","fill",3,4,4,["lemon","cyan","pink"],n=>(e,t)=>{const i=je(Math.floor(e+16),Math.floor(t+16),400+n);return i<.09?1+Math.floor(i/.03):0});function jg(){return Wt("sweep","Radar sweep","loop",3,4,4,["acid","mint"],(n,e)=>(t,i)=>{const s=((n/e*Math.PI*2-Pr(t,i)-Math.PI/2)%(Math.PI*2)+Math.PI*2)%(Math.PI*2);if(s<.3)return 1;if(s<1.1||Math.abs(Math.hypot(t,i)-7)<.5)return 2})}const e1=()=>Wt("waves","Waves","loop",2,4,2,["blue","cyan","violet"],(n,e)=>(t,i)=>{const s=i+Math.sin(t*.42+n/e*Math.PI*2)*2.4,r=Math.floor((s+16)/4);return((s+16)%4+4)%4<1.6?1+r%3:0});function t1(){return Wt("kaleidoscope","Kaleidoscope","loop",4,4,1,["magenta","lemon","cyan","acid"],n=>(e,t)=>{let i=Math.abs(Dg(Pr(e,t)))%(Math.PI/4);i>Math.PI/8&&(i=Math.PI/4-i);const s=Math.hypot(e,t),r=Math.cos(i)*s,a=Math.sin(i)*s,o=je(Math.floor(r/2.2),Math.floor(a/2.2),77+n);return o<.5?1+Math.floor(o*8)%4:0})}const n1=()=>Wt("strobe","Strobe rings","fill",4,1,4,["pink","cyan"],n=>(e,t)=>{const i=Math.hypot(e,t);return n%2?Math.floor(i/3)%2?1:2:Math.floor(i/3)%2?0:1});function i1(){return Wt("pulse","Pulse","fill",4,2,4,["violet","pink"],n=>(e,t)=>{const i=Math.hypot(e,t),s=(n%4+1)*3.8;return i<s?i>s-3.8?1:2:0})}function s1(){const n=(e,t)=>(e<0?0:1)+(t<0?0:2);return Wt("switch-on","Switch-on","boot",1,8,4,["cyan","pink","lemon","acid"],e=>(t,i)=>{const s=Math.hypot(t,i);if(e<8){const r=(e+1)*2;return s<r&&s>r-1.6?1:(s<r-1.6&&e>5,0)}return e<16?(((e-8)/8*Math.PI*2-Math.PI/2-Pr(t,i))%(Math.PI*2)+Math.PI*2)%(Math.PI*2)<(e-8+1)/8*Math.PI*2?1+n(t,i):0:e<20?Math.floor(t+16)%4===0||Math.floor(i+16)%4===0?1+e%2*2:0:e<24?(Math.floor(t+16)+Math.floor(i+16)+e)%2?2:0:e<28?e%2?1:3:je(Math.floor(t+16),Math.floor(i+16),e)<.12*(32-e)?1+Math.floor(je(Math.floor(t+16),Math.floor(i+16),3)*4):0})}const r1=n=>({lemon:"violet",acid:"magenta",mint:"pink",cyan:"orange",blue:"lemon"})[n]||"lemon";function a1(n){const e=No[n.creature]||"cyan",t=22,i=(tn-t)/2,s=Array.from({length:8},(h,c)=>Vp(n.creature,t,{progress:(c+1)/8})),r=s[7],a=(h,c,d)=>{const f=Math.floor(c+fs-i),u=Math.floor(d+fs-i);return f>=0&&u>=0&&f<t&&u<t&&h.m[u*t+f]},o=(h,c)=>[[1,0],[-1,0],[0,1],[0,-1]].some(([d,f])=>a(r,h+d,c+f));return Wt("area-"+n.id,n.name,"area",2,4,4,[e,r1(e)],h=>(c,d)=>{if(h<8)return a(s[h],c,d)?1:0;if(a(r,c,d))return 1;if(h%2&&o(c,d)||h%4===0&&Math.abs(Math.hypot(c,d)-14.3)<.55)return 2},{area:n.id,creature:n.creature})}let ya=null;function Mf(){return ya||(ya=[...[Og,Ng,Fg,kg,Ug,Bg,zg,Gg,Hg,Wg,Vg,Yg,Xg,Kg,qg,$g,Zg,Jg,Qg,jg,e1,t1,n1,i1].map(e=>e()),s1(),...Hs.map(a1)],ya)}const gu=[{id:"wipe",beats:1,onBar:!1,desc:"a straight edge sweeps across (angle in the options, default left to right), a bright line along it"},{id:"iris",beats:1,onBar:!1,desc:"a circle opens from the centre (or closes: in), a bright ring at its edge"},{id:"dissolve",beats:2,onBar:!1,desc:"tiles change over one by one in a fixed random order"},{id:"burst",beats:1,onBar:!0,desc:"on a bar line: the whole floor flashes in the new colour and the new pattern bursts out from the centre"}];function o1(n,e,t={}){const i=new Uint8Array(tn*tn),s=wr+.8;for(let r=0;r<tn;r++)for(let a=0;a<tn;a++){const o=r*tn+a;if(!ph[o])continue;const h=a+.5-fs,c=r+.5-fs;if(e>=1){i[o]=1;continue}if(!(e<=0)){if(n==="wipe"){const d=t.angle||0,f=(h*Math.cos(d)+c*Math.sin(d))/s,u=-1+e*2.2;i[o]=f<u-.1?1:f<u?2:0}else if(n==="iris"){const d=Math.hypot(h,c)/s,f=t.in?1-e*1.1:e*1.1;i[o]=t.in?d>f+.08?1:d>f?2:0:d<f-.08?1:d<f?2:0}else if(n==="dissolve")i[o]=je(a,r,913)<e?1:0;else if(n==="burst"){const d=Math.hypot(h,c)/s;i[o]=e<.15?2:d<(e-.15)/.85*1.1-.1?1:d<(e-.15)/.85*1.1?2:0}}}return i}const rc=14,l1=15,os={width:22,period:64},hi={glass:[24,20,40],glassLit:[52,46,80],rune:[40,33,64],grout:[12,10,18],rim:[92,90,100],rimDark:[44,42,54],rimRune:[140,120,255],moss:[70,104,58]};function xu(n=3){const e=[0,.5,.75,1][n],t=i=>[Math.round(i*e),Math.round(i*e),Math.round(i*e)];return{[l.STONED]:hi.glass,[l.LINE]:hi.rune,[l.STONE]:hi.glassLit,[l.BARKD]:hi.grout,[l.GLINT]:t(255),[l.MAGIC2]:t(235),[l.GLOW]:t(200),[l.MAGIC]:t(140),[l.RUNE]:hi.rimRune,[l.MOSS]:hi.moss}}const c1=()=>({[l.BODY]:hi.rim,[l.BODY2]:hi.rimDark,[l.RUNE]:hi.rimRune,[l.MOSS]:hi.moss,[l.BARKD]:hi.grout}),ac=[0,0,1];function vf(n="unlit",{level:e=3,rune:t=3}={}){const i=rc,s=new dt(i,i);for(let r=0;r<i;r++)for(let a=0;a<i;a++){const o=Math.min(a,r,i-1-a,i-1-r),h=a+r<i-1,c=a===0?-.5:a===i-1?.5:0,d=r===0?-.5:r===i-1?.5:0,f=[c,d,1];if(n==="unlit"){const u=(a-2.5)/(i-5),p=(r-2.5)/(i-5),g=u>=0&&u<=1&&p>=0&&p<=1&&Rr(u,p,t,.1);s.px(a,r,o===0&&h?l.STONE:g?l.LINE:l.STONED,...f)}else{const u=Math.hypot(a-i*.38,r-i*.38)<i*.16,p=o===0?h?l.MAGIC2:l.MAGIC:o===1&&!h?l.MAGIC:u&&e>=2?l.GLINT:l.GLOW;s.px(a,r,p,...f)}}return s}function h1(n=os.period*2){const{width:e,period:t}=os,i=new dt(n,e),s=t/2;for(let r=0;r<e;r++)for(let a=0;a<n;a++){const o=a%t,h=o%s,c=Math.floor(o/s),d=h===0||r===0||r===e-1||r===Math.round(e*.2),f=(h-s/2+5.5)/11,u=(r-e*.2-4)/(e*.8-8),p=!d&&f>=0&&f<=1&&u>=0&&u<=1&&Rr(f,u,3+c*5,.11),g=r===1?[0,-.6,.8]:r===e-2?[0,.6,.8]:h===1?[-.6,0,.8]:h===s-1?[.6,0,.8]:ac,M=d&&r>0&&je(Math.floor(a/2)%(t/2),r,7)<.35;i.px(a,r,p?l.RUNE:M?l.MOSS:d||je(o,r,3)<.06?l.BODY2:l.BODY,...g)}return i}function u1(){const n=l1,e=tn*n,t=os.width,i=(wr+.5)*n,s=Math.ceil((i+t)*2)+2,r=s/2,a=new dt(s,s),o=Array.from({length:8},(u,p)=>vf("unlit",{rune:3+p*7})),h=r-e/2,c=h1(os.period),d=2*Math.PI*(i+t/2),f=Math.round(d/os.period);for(let u=0;u<s;u++)for(let p=0;p<s;p++){const g=p+.5-r,M=u+.5-r,x=Math.hypot(g,M);if(x<i){const m=p-h,v=u-h,_=Math.floor(m/n),w=Math.floor(v/n),A=Math.floor(m-_*n)-1,y=Math.floor(v-w*n)-1;if(_<0||w<0||_>=tn||w>=tn||A<0||y<0||A>=rc||y>=rc||x>i-1){a.px(p,u,l.BARKD,...ac);continue}const S=o[Math.floor(je(_,w,17)*o.length)].get(A,y);a.px(p,u,S,...ac);continue}if(x<i+t){const m=(Math.atan2(M,g)/(Math.PI*2)+1)%1*f*os.period,v=Math.min(t-1,Math.floor(x-i)),_=c.get(Math.floor(m)%os.period,v),w=(v*c.w+Math.floor(m)%os.period)*3,A=g/x,y=M/x,S=c.n[w],b=c.n[w+1];a.px(p,u,_,S*-y+b*A,S*A+b*y,c.n[w+2])}}return{sp:a,size:s,centre:r,pitch:n,gridOrigin:h,rimInner:i,rimOuter:i+t}}const Pt=tn,Rs=ph,us=Pt/2,oc=wr,bf=n=>jl[n??""]??[50,235,255],Mu=(n,e)=>Math.atan2(e,n),d1=[{id:"gen-rings",kind:"loop",level:1,beats:8,fpb:4,palette:["cyan","pink"],gen:(n,e,t)=>((Math.hypot(n,e)-t*2)%6+6)%6<1.2?1+Math.floor(t)%2:0},{id:"gen-spokes",kind:"loop",level:2,beats:8,fpb:4,palette:["lemon","violet"],gen:(n,e,t)=>{const i=(Mu(n,e)+t*.4)/(Math.PI/4);return Math.abs(i-Math.round(i))<.12?1+(Math.round(i)&1):0}},{id:"gen-sweep",kind:"loop",level:1,beats:4,fpb:4,palette:["acid","mint"],gen:(n,e,t)=>{const i=((Mu(n,e)-t*(Math.PI/2))%(Math.PI*2)+Math.PI*4)%(Math.PI*2);return i<.5?1:i<1.1?2:0}},{id:"gen-chequer",kind:"fill",level:2,beats:4,fpb:1,palette:["pink","blue"],gen:(n,e,t)=>Math.floor(n/2)+Math.floor(e/2)+Math.floor(t)&1?1:2},{id:"gen-sparkle",kind:"fill",level:3,beats:8,fpb:4,palette:["cyan","magenta","lemon"],gen:(n,e,t)=>{const i=we(Math.floor(n+us),Math.floor(e+us),Math.floor(t*4));return i<.18?1+Math.floor(i*16.6)%3:0}},{id:"gen-stripes",kind:"loop",level:2,beats:8,fpb:4,palette:["orange","violet"],gen:(n,e,t)=>{const i=((n+e+t*3)%8+8)%8;return i<2?1:i<3?2:0}}];let el=null;function mh(){return el||(el=[...Mf().filter(n=>n.kind!=="boot"),...d1]),el}const yf=()=>Mf().find(n=>n.kind==="boot");function f1(){return{on:null,pattern:0,from:0,next:null,transition:null,played:0,ripples:[],trail:[],events:[],last:null}}function p1(n,e){let t=1;for(const i of e.dancefloor.levels)n>=i&&t++;return Math.min(4,t)}function m1(n,e,t,i,s){const r=s/oc;return{x:(n-t)/r+us,y:(e-i)/r+us}}const go=(n,e)=>n*e.beat.bpm/60,_f=()=>yf().beats;function g1(n,e){n.on===null&&(n.on=e)}function vu(n,e,t,i,s){const r=mh(),a=[];return r.forEach((o,h)=>{h===n||o.level>t||o.kind==="area"&&!(o.area&&i.has(o.area))||a.push(h)}),a.length?a[Math.floor(we(e,s,977)*a.length)]:n}function x1(n,e,t){const i=t.dancefloor.tiles,s=go(e.time,t);if(n.on===null)return;const r=go(n.on,t)+_f();if(s<r){n.from=Math.ceil(r/4)*4,n.pattern=vu(-1,0,e.level,e.partifiedAreas,e.seed);return}const a=mh(),o=a[n.pattern],h=o.beats*(e.level>=4?1:e.level>=2?2:3),c=Math.floor(s/4)*4;if(!n.transition&&s>=n.from&&c>=n.from+Math.max(4,h)&&c===Math.floor(s/4)*4){const u=vu(n.pattern,n.played+1,e.level,e.partifiedAreas,e.seed),p=gu[Math.floor(we(n.played,e.seed,979)*gu.length)];n.next=u,n.transition={id:p.id,start:c,beats:p.beats,angle:we(n.played,e.seed,981)*Math.PI*2}}n.transition&&s>=n.transition.start+n.transition.beats&&(n.pattern=n.next,n.from=n.transition.start,n.next=null,n.transition=null,n.played++);const d=e.witch;if(d.lift<i.witchLift&&no(d.x,d.y)){const u=n.last;u&&u.lift>=i.witchLift*.5&&d.lift<.05&&n.ripples.push({x:d.x,y:d.y,at:e.time,big:!0}),(!u||Math.floor(s)!==u.beat)&&n.ripples.push({x:d.x,y:d.y,at:e.time,big:!1}),d.lift<.05&&(!u||Math.floor(u.x)!==Math.floor(d.x)||Math.floor(u.y)!==Math.floor(d.y))&&n.trail.push({x:d.x,y:d.y,at:e.time})}n.last={x:d.x,y:d.y,lift:d.lift,beat:Math.floor(s)},n.ripples=n.ripples.filter(u=>e.time-u.at<i.rippleTime*(u.big?2:1)),n.trail=n.trail.filter(u=>e.time-u.at<i.trailTime).slice(-48),n.events=n.events.filter(u=>e.time-u.at<i.eventTime)}function bu(n,e){n.on!==null&&n.events.push(e)}const no=(n,e)=>{const t=Math.floor(n),i=Math.floor(e);return t>=0&&i>=0&&t<Pt&&i<Pt&&Rs[i*Pt+t]===1};function M1(n,e,t,i){const s=t.dancefloor.tiles,r=i??new Uint8Array(Pt*Pt*4),a=e.level,o=e.time,h=go(o,t);if(r.fill(0),n.on===null)return{rgbi:r,average:[0,0,0],lit:0};const c=(R,O,I,k=!1)=>{if(!Rs[R]||I<=0)return;const U=R*4,W=r[U+3];if(k&&W){for(let ne=0;ne<3;ne++)r[U+ne]=Math.min(255,r[U+ne]+O[ne]*.6);r[U+3]=Math.min(3,W+I);return}I<W&&!k||(r[U]=O[0],r[U+1]=O[1],r[U+2]=O[2],r[U+3]=Math.min(3,I))},d=Math.max(1,Math.min(3,Math.round(a*.75))),f=a>=3?4:2,u=(R,O,I)=>{const k=Math.max(0,h-O);if(R.gen){const ne=I%Pt+.5-us,K=Math.floor(I/Pt)+.5-us;return R.gen(ne,K,k*(.6+.2*a))}const U=R.frames,W=Math.floor(k*R.fpb)%U.length;return U[W][I]},p=(R,O)=>bf(R.palette[Math.min(O,f,R.palette.length)-1]??R.palette[0]),g=go(n.on,t),M=h<g+_f(),x=mh(),m=M?yf():x[n.pattern],v=M?g:n.from,_=!M&&n.transition&&n.next!==null?n.transition:null,w=_?o1(_.id,Math.min(1,Math.max(0,(h-_.start)/_.beats)),{angle:_.angle}):null,A=_?x[n.next]:null;for(let R=0;R<Pt*Pt;R++){if(!Rs[R])continue;const O=w?w[R]:0;if(O===2){c(R,p(A,1),3);continue}const I=O?A:m,k=u(I,O?_.start:v,R);k?c(R,p(I,k),M?2:Math.min(3,d+(k===1&&a>=3?1:0))):a>=4&&we(R,Math.floor(h*2),51)<.03&&c(R,p(I,1+R%I.palette.length),1)}for(const R of n.events){const O=(o-R.at)/s.eventTime,I=O*(oc+2);for(let k=0;k<Pt*Pt;k++){if(!Rs[k])continue;const U=k%Pt+.5-us,W=Math.floor(k/Pt)+.5-us,ne=Math.hypot(U,W);if(!(Math.abs(ne-I)>1.2)){if(R.kind==="wave"){let K=Math.abs(Math.atan2(W,U)-R.dir);if(K=Math.min(K,Math.PI*2-K),K>.7)continue}c(k,R.rgb,3)}}}for(const R of e.dancers){const O=Math.floor(R.x),I=Math.floor(R.y);no(R.x,R.y)&&c(I*Pt+O,R.rgb,2+Math.floor(h)%2)}const y=e.witch;for(const R of n.trail){const O=1-(o-R.at)/s.trailTime;no(R.x,R.y)&&c(Math.floor(R.y)*Pt+Math.floor(R.x),y.rgb,Math.ceil(O*2))}for(const R of n.ripples){const O=s.rippleTime*(R.big?2:1),I=(o-R.at)/O,k=I*(R.big?oc*1.6:7);for(let U=0;U<Pt*Pt;U++){if(!Rs[U])continue;const W=Math.hypot(U%Pt+.5-R.x,Math.floor(U/Pt)+.5-R.y);Math.abs(W-k)<.7&&c(U,y.rgb,Math.max(1,Math.round((1-I)*3)))}}if(y.lift<s.witchLift&&no(y.x,y.y))for(let R=0;R<Pt*Pt;R++){if(!Rs[R])continue;const O=Math.hypot(R%Pt+.5-y.x,Math.floor(R/Pt)+.5-y.y);O<2.6&&c(R,y.rgb,O<1?3:O<1.9?2:1)}if(a<=1)for(let R=0;R<Pt*Pt;R++)r[R*4+3]&&we(R,Math.floor(h/2),53)>s.lowLevelShare&&(r[R*4+3]=0);let S=0,b=0,E=0,C=0,T=0;for(let R=0;R<Pt*Pt;R++){if(!Rs[R])continue;T++;const O=r[R*4+3];O&&(S+=r[R*4]*O,b+=r[R*4+1]*O,E+=r[R*4+2]*O,C+=O)}return{rgbi:r,average:C?[S/C/255,b/C/255,E/C/255]:[0,0,0],lit:C/(T*3)}}function v1(n,e){const t=Um(n,e),i={...Bm(t.start.x,t.start.z),seated:!0};return{seed:n,tuning:e,map:t,forest:new uh(t),creatures:Ym(t),clock:k0(),witch:i,camera:O0(e,i.x,yr(i,e),i.z),party:Ag(t),leash:_g(),speakers:t.dancefloor.speakers.map(()=>"playing"),floor:f1()}}function b1(n,e,t){e.cycleSpeakers&&(n.speakers=n.speakers.map(Pm));const i=U0(n.clock,t);if(i===0)return;const s=n.party.wave,r=n.witch.seated;n.witch=zm(n.witch,e,i,n.tuning,n.map.bounds),n.camera=N0(n.camera,e.zoom,{x:n.witch.x,y:yr(n.witch,n.tuning),z:n.witch.z},{x:n.witch.vx,z:n.witch.vz},n.witch.lift,i,n.tuning,!!n.witch.seated,n.introFocus),e.pauseWaves&&(n.party.paused=!n.party.paused),e.nextWave&&(mf(n.party,n.map,n.clock.time),n.party.nextAt=n.clock.time+n.tuning.party.interval),Rg(n.party,n.map,n.clock.time,i),Km(n.creatures,n.witch.x,n.witch.z,_1(n),i,n.clock.time,n.map),Eg(n.leash,n.creatures,{talk:!!e.talk,sigil:!!e.sigil,inviteNearest:e.inviteNearest},n.witch,n.witch.mode==="ground",n.clock.time,i,n.tuning),y1(n,s,r)}const xo=bf;function wf(n){const e=n.map.dancefloor,t=(a,o)=>m1(a,o,e.x,e.z,e.radius),i=t(n.witch.x,n.witch.z),s=new Set,r=[];for(const a of n.party.areas.values())s.add(vt[n.map.typeOf(a.cell[0],a.cell[1])].id);for(const a of n.creatures){if(!a.leashed||Math.hypot(a.x-e.x,a.z-e.z)>e.radius)continue;const o=t(a.x,a.z);r.push({x:o.x,y:o.y,rgb:xo(No[a.species])})}return{time:n.clock.time,seed:n.seed,level:p1(n.party.areas.size,n.tuning),partifiedAreas:s,witch:{x:i.x,y:i.y,lift:n.witch.lift,rgb:xo(n.tuning.dancefloor.tiles.witchColour)},dancers:r}}function y1(n,e,t){const i=n.floor,s=n.clock.time,r=n.map.dancefloor;if(t!==!1&&!n.witch.seated&&g1(i,s),n.party.wave>e&&n.party.last){const a=n.map.soundsystemSpot(n.party.last[0],n.party.last[1]),o=vt[n.map.typeOf(n.party.last[0],n.party.last[1])].creature;bu(i,{kind:"wave",at:s,dir:Math.atan2(a.z-r.z,a.x-r.x),rgb:xo(No[o])})}for(const a of n.leash.events)a.kind==="placed"&&bu(i,{kind:"sigil",at:s,dir:0,rgb:xo(n.tuning.dancefloor.tiles.witchColour)});x1(i,wf(n),n.tuning)}const _1=n=>Math.max(n.tuning.creatureSimRadius,n.tuning.haze.far+20+af(n.map)*2.5),yu=n=>Gd(n.camera,n.camera.lift,n.tuning);function Sf(n){const e=n.map.areaAt(n.witch.x,n.witch.z),t=n.map.setPieceOf(e.cell[0],e.cell[1]);return vt[e.type].name+(t?` (set piece: ${t})`:"")}const w1="Witch tuning. Edit the numbers, push, and the playable link rebuilds. Distances are metres, times seconds, angles degrees. Keys starting with _ are notes.",S1="The forest: mapAreas x mapAreas areas cut by the fractal partition. An area is areaSize x areaScale metres across on average (areaScale 4 makes them four times as wide as the first 28 m areas; push it for bigger). areaSizeVariance (0-1) makes areas vary in size, some small, some large. borderLayers sets how wiggly borders are.",E1=20,A1=28,T1=4,R1=.7,C1=4,L1="treeHeight and crownWidth scale the art's trees (1 is the Art Lab's size; crowns widen with treeHeight too, crownWidth is the total). treeDensity (0-1): the chance of a tree on each spot outside the clearings; clearingSize (0-1): how far out from an area's centre the ground stays fully open; clearingFalloff (0-1): over how much of the way to the border trees thicken to full density (small: crisp clearing edges); gladeAmount (0-1) of the woods is open in random glades about gladeScale metres across; trees sit on a staggered grid treeSpacingX by treeSpacingZ metres, so no two crowns pile up. A tree is left out where its crown (crownHalfWidth either side, crownHeight up) would hang over a clearing seen from the treetops.",P1=1,D1=.2,I1=.18,O1=.25,N1=38,F1="Ragged area edges: each tree and bush takes its look (its area type) from a point up to width metres away, by a smooth noise scale metres across plus a per-plant stray (stray, share of width), so neighbouring areas' plants mix in a band along the border. Only the look: creatures, partifying and the party border keep the exact borders.",k1={width:20,scale:40,stray:.5},U1="How neighbouring areas' floor textures meet (Ed, v160): the border is warped by noise in two octaves (up to warp metres over about 40 m, and fine metres over about 6 m), so it meanders rather than following the texture's grid; across a band metres wide the two floors mix pixel by pixel, by noise and (dither) an ordered dither, like grass creeping into dirt. Visual only. ?blend=off turns it off.",B1={on:!0,warp:8,fine:1.5,band:5,dither:!0},z1="Tree density is a field, not two states (Ed, 2026-10-03): each area's own density (its layout in art/areas.js) times a patch noise patchScale metres across, from patchMin to patchMax times (dense patches, sparse patches, glades), times the area's pattern (groves, stands, rings, rows, thicket, edges only), times the clearings (soft edges); and lone trees at lone density almost everywhere, so open ground isn't empty. treeDensity scales it all.",G1={patchScale:45,patchMin:.1,patchMax:1.3,lone:.03},H1=.16,W1=.8,V1=2.25,Y1="The tallest tree variants (tall, giant) are drawn squeezed so the treetop flight (treetopHeight) stays above the canopy: any height over from metres keeps only keep of the rest (so a 45 m giant shows about 29 m: still over the canopy, not burying her).",X1={from:20,keep:.35},K1=1.7,q1=4.6,$1=2.8,Z1=10.5,J1=11.25,Q1=3.4,j1="Speeds per mode, and how long rising and descending take. acceleration: how quickly she reaches her speed or stops in the treetops (per second; higher is snappier); groundAcceleration: the same on the ground. leanAt: the share of the top speed above which she leans into her flight. facing: she (and every creature) faces the viewer unless clearly heading up the screen, within awayEnter degrees of straight up (and stays turned away until past awayLeave); sideways, down or stopped faces the viewer.",e2=19.25,t2=32,n2=10,i2="Treetop flight (Ed: a high top speed and momentum; the ground stays snappy): pressing a direction reaches treetopSpeed in about 0.3 s (acceleration); holding it within boostAngle degrees builds boost over boostTime seconds, up to boost times treetopSpeed; her heading turns toward the input at turnRateSlow degrees a second below sharpTurnSpeed of cruise, falling to turnRate at cruise (half that at full boost), so the size of her swoop grows with her speed (Ed); a turn of 90 degrees or more bleeds boost sharpTurnBleed times a second, and above brakeAt of cruise she skids in the brake pose; letting go, she glides to a stop over about glideTime seconds. cameraPull: how far the camera draws back at full boost (a share of its distance).",s2={boost:1.7,boostTime:2,boostAngle:25,turnRate:150,turnRateSlow:720,sharpTurnSpeed:.4,brakeAt:.9,glideTime:1,sharpTurnBleed:3,cameraPull:.06},r2=28,a2=.7,o2={awayEnter:55,awayLeave:65},l2=.7,c2=.55,h2=1.4,u2=24,d2="Near-isometric on the ground, after Transistor; the game opens close in on the witch in her seat on the treehouse (intro: distance metres, angle degrees), easing out to the normal view over intro.ease seconds once she moves or rises (Ed, v171); lower over the treetops, looking toward the horizon to feel the speed. The camera follows the witch on a soft spring (follow: its stiffness; higher keeps her closer to the middle) and looks a little ahead of her: lookAhead seconds of flight, at most lookAheadMax metres, eased in at lookAheadEase. zoomEase and liftEase: how softly zoom and rising change the angle and distance. a narrow field of view (fov, degrees) seen from far off, so there is little perspective. Each mode has its own angle (degrees below horizontal) and distance from the witch, at zoomed-in and zoomed-out. Zoom moves between them in zoomSteps steps, starting at startZoom: with 4 steps and startZoom 1 the start is a third of the way out, so the defaults are ground 32 degrees at 100 m and treetop 36 degrees at 170 m, with one step in and two out from each.",f2={fov:20,ground:{angleIn:30,angleOut:36,distanceIn:80,distanceOut:140},treetop:{angleIn:34,angleOut:40,distanceIn:150,distanceOut:210},lookAhead:.1,lookAheadMax:3,lookAheadEase:1.5,zoomEase:5,liftEase:8,zoomSteps:4,startZoom:1,follow:8,intro:{distance:34,angle:22,ease:1.3}},p2="Everything the camera can see is drawn, plus viewMargin metres round the view, so nothing appears or vanishes on screen. haze: the twilight haze fades the forest from near to far metres from the witch; nothing is drawn beyond far. lightBudget: how many of the nearest point lights (campfires, magic stones, the dancefloor) light the scene at once. pixelSize: screen pixels per art pixel. The witch's light reaches as far as the canopy hole round her in ground mode (its radius plus its soft edge, in metres at her depth, times glowToCutout), so beyond it the forest is dark (Ed, v149); glowFalloff: how fast it falls off, as (1 - distance/reach)^glowFalloff. ?glow=<reach>,<falloff> in the URL fixes the reach (glowReach metres) and the falloff, to try values live. spriteTilt: 1 = sprites face the camera fully, 0 = stand upright.",m2=3,g2=50,x2=1.5,M2=1,v2=8,b2=1,y2=16,_2=12,w2=20,S2="Light sources placed by seed, on a grid of spacing metres, mostly in clearings and at area edges: the chance per spot of a campfire, a magic stone, or a pond mirroring the moon (wetPond in wet areas: wetland, stream, bog, beaver pond, moor).",E2="How far (reach, metres) and how strongly each kind of light lights its surroundings. glowPower: the witch's own glow at its brightest (0-1; 0.65 lights without blowing out), full under her, falling off as glowFalloff says out to glowReach metres, lit from a source glowHeight metres above her. Light falls off smoothly to nothing at its reach: no rings or bands.",A2={campfire:{reach:22,strength:2.6},stone:{reach:16,strength:1.8}},T2=.65,R2="The music's clock (beats per minute): the lasers sweep to it and party animals dance to it. Later the music itself drives it.",C2={bpm:120},L2=`The witch is lit by the world's lights like everything else (Ed: "I can go near a coloured light source and not change colour"), but not by her own glow: never darker than lightFloor times her old unlit look, so she reads in the dark; coloured lights (soundsystems, campfires, rune stones, the dancefloor) tint her by lightTint and rim the edge of her facing them by lightRim.`,P2={lightFloor:.75,lightTint:1,lightRim:.6},D2="Never lose the witch: tall things (over minHeight metres) standing in front of her fade to fadeOpacity where they cover her, in a soft circle round her body (a little bigger than her sprite) that eases from see-through at the centre to opaque past edge (a share of its radius), and eases in over a few metres as she moves behind; anything that still hides her shows her silhouette in her glow colour at silhouette opacity.",I2="From the treetops, each placed sigil shows above the canopy over its spot: height metres above the crowns, opacity, size (times the ground rune), and a faint column of light (beam opacity) from the rune up to it. Fades in as she rises.",O2={height:3,opacity:.65,beam:.25,size:1},N2={on:!0,fadeOpacity:.38,edge:.8,minHeight:2.5,silhouette:.55},F2="The sigil stack above the witch's hat: scale (of the sigils' size), offset (the gap between her hat tip and the bottom sigil, in sigil heights), gap (between sigils, in sigil heights). It sways as a chain of springs: stiffness and damping, trail (how far it leans back per m/s of her speed), idleSway (metres of gentle sway when she's still).",k2={offset:.5,scale:.65,gap:.15,stiffness:60,damping:9,trail:.03,idleSway:.1},U2="Each playing soundsystem's laser show: bursts of blockBars bars, on about duty of the time (seeded per soundsystem), up to maxCount beams stepping on the bars, fanned over spread degrees (no beam tilting more than maxTilt from straight up), swinging sweep degrees once every sweepBeats beats (slow, like searchlights), opening and closing the fan every openBars bars, length metres tall, opacity 0-1, fading in over fadeIn and out over fadeOut seconds, and fading with distance from fadeNear to fadeFar metres. Glow only: no light, nothing from the light budget.",B2={on:!0,maxCount:9,length:420,spread:100,maxTilt:55,sweep:22,sweepBeats:36,openBars:18,opacity:.6,duty:.35,blockBars:4,fadeIn:.12,fadeOut:.4,fadeNear:140,fadeFar:480},z2="A sparkling line round the partified region's outside edge, in each area's sigil colour: width (px), brightness, sparkle (0-1, how much it twinkles and runs), step (metres between its sparks).",G2={on:!0,width:2,brightness:1.2,sparkle:.6,step:1.6},H2={spacing:10,campfire:.012,magicStone:0,pond:.02,wetPond:.12},W2={near:150,far:360},V2="The scenery budget (Ed, 2026-10-03: gameplay always drawn, scenery as much as we can). Creatures, sigils, soundsystems, the dancefloor, the party border, campfires and stones are always drawn. Scenery (trees, bushes, wall objects, set pieces, string lights) is drawn out to a radius round the witch, at most the haze's far edge, fading out over its last fade metres so nothing pops. With adaptive on, the radius follows the frame rate: if it stays under fps minus hysteresis for sustain seconds the radius shrinks by shrink metres a second, never below minRadius; if it stays at fps or more, it grows back by grow metres a second. ?scenery=<metres> fixes the radius (for testing).",Y2={adaptive:!0,fps:55,hysteresis:8,sustain:1.5,minRadius:110,shrink:40,grow:15,fade:40},X2="bloom: a gentle glow round bright things (strength 0 or on false turns it off; threshold: how bright a pixel must be to glow). tiltShift: blurs the top and bottom of the screen so the forest looks like a miniature. strength: the blur at the screen's edges, in pixels; band: the height of the sharp band (0-1 of the screen); centre: where it sits (0 top, 0.5 middle, 1 bottom); treetop: the strength and band over the treetops (Ed, v160: a stronger miniature look there), blended in as she rises; ?tilt=<strength>,<band> tries treetop values live; where: 'before' blurs at the low resolution, before the pixels are scaled up, 'after' blurs the scaled-up image. Add ?tilt=before, ?tilt=after or ?tilt=off to the link to compare.",K2="shadows: a small contact shadow under the witch, each bush, creature and prop; trees: a crown-sized shadow under every tree too, cast away from the moon (off: Ed, 2026-10-03). canopyShadow: a dappled shadow from the canopy overhead (height in metres), thinner in clearings, drifting with the wind. mist: a low drifting mist (height in metres above the ground). Each has on and strength.",q2={on:!0,strength:.7,trees:!1},$2={on:!0,strength:.45,height:18,cover:.55,wind:.6},Z2={on:!0,strength:.12,height:3,wind:.8},J2="fx: how the mist, the far haze and the canopy dapple are drawn. smooth: soft gradients (the mist in its own buffer, blurred a little and scaled up smoothly); pixel: dithered steps on the art's pixel grid. In smooth, the moonlight's bands, moonbeams and the soft contact shadows under the witch, creatures, bushes and props are smooth too (no dither anywhere); pixel brings all the dithers back. ?fx=pixel or ?fx=smooth in the URL.",Q2="smooth",j2="How strong the diagonal moonbeam bands are, times the style's Moonbeams knob: 0 is off (Ed, v108: they read as stripes over a dense canopy). ?moonbeams=on brings them back at 1.",ex=0,tx="The witch's treehouse, home (Ed): it stands distance metres beyond the dancefloor's clearing (which reaches past the speaker ring, so however many speakers or how far out, the treehouse stays outside them), at angle degrees (-90 is straight up the screen), and keeps a clearing of clear metres round its foot; its lantern and fairy lights light lightReach metres round at lightStrength. The game starts with her sitting on its terrace; the first move or rise takes her off.",nx={distance:6,angle:-115,clear:8,lightReach:16,lightStrength:.6},ix="The talk's speech bubbles (Ed): an outline only, no fill. The emoji in them are pixel sprites emojiPixels across, each pixel scale times the game's pixel size on screen (the outline's colour and thickness are in index.html's .bubble).",sx={emojiPixels:11,scale:1},rx="Old playgrounds and sports grounds (the relics art's arrangements): an area has one with chance (not home), off to the side of its centre, keeping a clearing of radius metres (per kind) where nothing grows.",ax={chance:.035,kinds:["playground","tennis","baseball","football","basketball"],radius:{playground:12,tennis:14,baseball:14,football:21,basketball:5}},ox="Modern relics (cars, trolleys, cones, highway slabs, a phone box, a sofa...): one chance per spacing-metre cell (chance, steered by the area's decor share of modern), nearRoad times as likely within 20 m of a road or railway; never on a path, in a central clearing or a ground; at least minGap metres from the next relic (Ed, v147: too numerous).",lx={spacing:34,chance:.0067,nearRoad:4,minGap:80},cx="Wall objects as features (Ed, v147), per area: man-made and linear ones (garden walls, hedges, brambles, rock walls) as runs [min,max] of runLength [min,max] pieces joined end to end, along a path where one passes (with a gateway gap gateChance of the time; a garden's flower beds in a row along them); henge stones as rings [min,max] of ringStones [min,max] (the first round the shrine, others ringRadius [min,max] metres across in a glade), an avenue leading in avenueChance of the time, and a lone stone loneChance; water, reeds and boulders as clumps [min,max] of clumpSize [min,max] within clumpRadius metres. Open ground between.",hx={runs:[3,5],runLength:[5,10],gateChance:.5,rings:[1,2],ringStones:[6,12],ringRadius:[6,11],avenueChance:.35,loneChance:.3,clumps:[2,4],clumpSize:[3,6],clumpRadius:5},ux=`Spawn markers (Ed, v147): a rune stone on every spot where a soundsystem will come, scale times the old rune stone's size. Dormant (not the next wave): the rune glows steadily at dormant.glow (0-1), a modest light (light strength, reach metres) and a faint beacon above the canopy (beam opacity). Awake (the next wave comes here): the rune, its light and its motes pulse on the beat, from awake.glow[0] to [1], light strength plus lightBuild as the wave's countdown runs out, motes rising (motes per stone, plus moteBuild near the end), a stronger beam. beamHeight: the beacon's height (metres); lightRange: stones within this many metres light the scene. When the party comes, the stone flares (flare.light) and sinks over flare.time seconds as its soundsystem arrives. awakeStyle (Ed, v149: "let's see both"): an awake stone shows a column of light above the canopy ("column"), a thin laser straight up like the disco ball's ("beam": laser opacity, width and length in metres; glow only, no light), or both; ?rune=beam|column|both in the URL.`,dx={awakeStyle:"both",laser:{opacity:.55,width:.25,length:70},scale:2.25,beamHeight:46,lightRange:160,dormant:{glow:.5,light:.55,reach:12,beam:.1},awake:{glow:[.7,1],light:.9,lightBuild:1,reach:18,beam:.3,motes:8,moteBuild:12},flare:{time:1.6,light:3.5}},fx="Every end of a path, road, railway or stream (where it stops, peters out or is broken) frays out over its last metres in an ordered dither on the art's pixel grid, broken up by noise (Ed, v149).",px={metres:6,dither:!0},mx="In ground mode, where the crowns are hidden, each tree's trunk fades out over its top metres in an ordered dither on the art's pixel grid (Ed, v149), instead of ending in a flat cut.",gx={metres:2.5,dither:!0},xx="Decorations scattered as discoveries: one chance per spacing-metre cell, of a ruin (ruins), a rock (rocks) or a freak tree (freak), each at least minGap metres from the next (Ed, v147: too numerous); fewer under dense canopy; never in an area's central clearing (openness under clearing), on or within pathGap metres of a path, or by the dancefloor. footprint: metres round a decoration kept clear of soundsystems, the dancefloor, the treehouse and set pieces (plus reserveMargin).",Mx={spacing:26,ruins:.01,rocks:.03,freak:.004,minGap:80,clearing:.3,pathGap:2,footprint:4},vx="Paths, roads and railways (Ed): rails [min,max] railway lines edge to edge in wide curves (one with a branch); roads [min,max] broad sweeping old roads; linkChance: the share of neighbouring areas joined by a meandering path; deadEndChance: the share of areas with a path out to nothing; pathHalf, roadHalf, railHalf: half each corridor's width (metres), kept clear of trees, with bushes thick along the edges for edgeBushes metres (bushBoost times as many); streams [min,max] long streams winding across the map (and short ones join wet areas that touch), streamHalf metres half-wide; along a railway, every landmarkSpacing metres, a landmarkChance of a landmark (a wagon, a carriage, a platform, a gantry) and otherwise sometimes a signal post; verge posts along roads every vergeSpacing metres; every 3D piece at least pieceGap metres from the next; the two flights of stairs are finds, each at most once per map, by the clearing of a ravine, rocky slope, cave mouth or stone shrine; railBroken: the share of the railway that's broken, where trees grow between the sleepers (treesOnBroken times the usual chance).",bx={rails:[2,4],roads:[1,2],linkChance:.55,deadEndChance:.3,pathHalf:2.2,roadHalf:6,railHalf:3,railBroken:.3,streams:[1,2],streamHalf:2.5,landmarkSpacing:260,landmarkChance:.35,vergeSpacing:45,pieceGap:40,treesOnBroken:.35,edgeBushes:3,bushBoost:3},yx="Inviting (DESIGN.md, the leash): on the ground, hold Talk within talkRange metres of a creature; you chat in emoji for talkTime seconds (babies, young, adults), taking turns every turn seconds (babies, young, adults), then it is invited and leashed to you. Letting go, rising or moving further than cancelDistance stops it, and the chat's progress drains at decayRate of the rate it filled (0.5: half), so coming back soon picks up where it left off. Legends can't be invited: they give one unimpressed look. leash.length: how far a leashed creature roams from its leash point (you, or its sigil on the ground); runSpeed: how fast it hurries back when out of range (m/s); pickRadius: how near a placed sigil you must be to pick it up; spacing: how close two sigils may be put down (keep it above pickRadius, or a blocked spot picks up instead of fizzling). bond: how a creature shows its tie to its sigil (rim: a glow at its feet in the sigil's colour; sparks: one spark every sparkEvery seconds from sigil to creature, staggered; thread: a dotted line only under strain).",_x={talkRange:12,cancelDistance:18,talkTime:[3,6,12],turn:[.7,.9,1.3],decayRate:.5},wx={length:8,runSpeed:4,pickRadius:2,spacing:4},Sx={rim:!0,sparks:!0,thread:!0,sparkEvery:4,threadArc:.12,threadArcMax:2.5},Ex="motes: sparse glowing motes over every partified area, perPatch per 20 x 20 m, rising from from to to metres (under the crowns to above them) at about speed m/s. uplight: crowns in partified areas catch a faint glow from below in the area's colour (strength at its brightest, pulse on the beat, fading over edge metres toward the border). The party spreads: a wave every interval seconds (the first after startDelay more), partifying every area touching a partified one; maxPerWave caps a wave (0: no cap). transition: seconds an area takes to partify, 0 to skip the show. partyLight: the coloured light at each soundsystem (reach in metres, strength).",Ax={motes:{perPatch:4,from:10,to:34,speed:1.2},uplight:{strength:.13,pulse:.04,edge:10},interval:300,startDelay:0,maxPerWave:0,picker:"noisy",noisy:{wobble:.8,lobeSize:500,candidates:3,spreadFromLast:!0},transition:2.5,lightReach:30,lightStrength:1.6},Tx="Colourful string lights in every partified area, as long garlands: runsPerArea runs (a range), each spansPerRun spans (a range) from tree to tree, every next tree inside a forward cone of coneAngle degrees either side, so a run sweeps across rather than zig-zagging; runs start at least spread metres apart. Each span is spanMin to spanMax metres. No span crosses another and each tree holds at most two ends, except junction trees (junctionChance per tree on a run) where a branch leaves, so three meet. At height metres, sagging sag metres per 8 m of span, a bulb every bulbSpacing metres in the palette's colours, twinkling (twinkle 0-1), a chase running along now and then at chaseSpeed bulbs per second. The bulbs only glow (bloom); they cast no light.",Rx={on:!0,runsPerArea:[3,6],spansPerRun:[4,10],coneAngle:35,junctionChance:.15,spanMin:6,spanMax:20,spread:24,height:6.5,sag:.9,bulbSpacing:.8,palette:["#fff1d6","#ff6fcf","#5fe8ff","#ffe25c","#b48cff","#7dff8a"],twinkle:.35,chaseSpeed:8},Cx="The dancefloor: motes: magic particles drifting up off the circle (count, how high they rise in metres, speed in m/s, column: the share of the circle they rise from); its radius in metres; a ring of speakers.count stone speakers (Ed, v160), the first at speakers.start degrees round from the camera side and the rest evenly spaced, speakers.radiusFactor times the radius out, each speakers.footprint metres round; a clear space of clearing metres beyond the speakers' feet (the treehouse stands outside that); the floor's glass tiles light up (Ed, v160): levels: how many areas must have the party for each level of intensity above 1 (up to 4, a full rave); tiles: the witch lights the tiles under her (in witchColour, from the neon) when below witchLift, with a ripple each beat lasting rippleTime seconds (a landing's twice as long), footsteps fading over trailTime, events (a wave arriving, a sigil placed) over eventTime, and at level 1 only lowLevelShare of the lit tiles show; a glowing magic circle (two hues 0-1, pulse per second, runeSpeed in turns per minute) lighting the ground round it (lightReach metres, lightStrength), and a magic disco ball floating discoHeight metres up (discoSize metres across, spin turns per minute) throwing specks of light: specks is the share of the sphere that throws one, speckBrightness how bright, speckReach how far.",Lx={motes:{count:220,rise:110,speed:3.2,column:.8},radius:13.5,clearing:9,speakers:{count:12,start:15,radiusFactor:2,footprint:1.5},levels:[3,8,15],tiles:{witchLift:.3,witchColour:"lemon",rippleTime:.8,trailTime:1.5,eventTime:1.6,lowLevelShare:.6},circleHue:.86,circleHue2:.52,pulse:.35,runeSpeed:1,lightReach:36,lightStrength:2,discoHeight:7.5,discoSize:1.8,spin:4,specks:.22,speckBrightness:.9,speckReach:32},Px="In ground mode the canopy stays drawn at the screen's edges, so she flies under the forest roof; a dithered hole round her is cut out, screenFraction of the screen's width across, with a soft edge (a fraction of the width). Rising closes the hole.",Dx={screenFraction:.8,edge:.1},Ix="Contrast: ambient scales the twilight fill (lower is darker shade under the canopy), moon the moonlight (both lowered for Ed's dark forest, v149); black is the black point and gamma the curve applied to the whole picture, so dark goes near-black and lit stays bright.",Ox={black:.03,gamma:1.35,ambient:.22,moon:.7},Nx={on:!0,strength:.7,threshold:.55},Fx={on:!0,where:"before",strength:3,band:.4,centre:.55,treetop:{strength:6,band:.28}},kx="Creatures grow more numerous and older with an area's distance from home (0 at the dancefloor, 1 at the map's edge): creaturesNear in the areas round home, creaturesFar at the edge (creatureCurve shapes the rise), youngShareFar of them young at the edge; adults from adultsFrom outward, adultShareFar of them at the edge. Legends are rare: at most one in any area, by a chance rising from 0 at legendsFrom to legendChanceFar at the edge; legendNextToHome puts one next to home, to look at early. Idle creatures roam their whole area. Only creatures whose home is within creatureSimRadius metres of the witch move (never less than the haze far edge plus 2.5 areas, so a creature resuming its roam always does so out of sight).",Ux=2,Bx=20,zx=1.3,Gx=.5,Hx=.35,Wx=.35,Vx=.25,Yx=!0,Xx=.55,Kx=600,qx=.6,$x="setPieceChance: the share of areas, among the types that have a set piece, that show theirs. Wall objects are laid out as features (see walls); they do not block movement.",Zx=.25,Jx=1.8,Qx=9,jx="Gameplay is placed first, then scenery keeps clear of it: a set piece's footprint (setPieceFootprint metres round its middle, times setPieceScale) stays reserveMargin metres clear of every soundsystem's spot (soundsystemFootprint metres round it, reserved from the start) and of the dancefloor's clearing; a set piece with no room left is left out. Trees keep treeMarginFromSoundsystem metres from a soundsystem's footprint.",eM=7,tM=6,nM=3,iM=1.5,sM=.35,rM={_readme:w1,_map:S1,mapAreas:E1,areaSize:A1,areaScale:T1,areaSizeVariance:R1,borderLayers:C1,_trees:L1,treeDensity:P1,clearingSize:D1,clearingFalloff:I1,gladeAmount:O1,gladeScale:N1,_areaEdgeBlend:F1,areaEdgeBlend:k1,_groundBlend:U1,groundBlend:B1,_density:z1,density:G1,bushDensity:H1,bushClump:W1,treeHeight:V1,_treeCap:Y1,treeCap:X1,crownWidth:K1,treeSpacingX:q1,treeSpacingZ:$1,crownHalfWidth:Z1,crownHeight:J1,bushSpacing:Q1,_witch:j1,groundSpeed:e2,treetopSpeed:t2,acceleration:n2,_treetop:i2,treetop:s2,groundAcceleration:r2,leanAt:a2,facing:o2,riseTime:l2,descendTime:c2,groundHeight:h2,treetopHeight:u2,_camera:d2,camera:f2,_look:p2,pixelSize:m2,glowReach:g2,glowFalloff:x2,glowToCutout:M2,glowHeight:v2,spriteTilt:b2,artPixelsPerMetre:y2,viewMargin:_2,lightBudget:w2,_lightSources:S2,_lights:E2,lights:A2,glowPower:T2,_beat:R2,beat:C2,_witchLight:L2,witch:P2,_occlusion:D2,_sigilProjection:I2,sigilProjection:O2,occlusion:N2,_stack:F2,stack:k2,_lasers:U2,lasers:B2,_borders:z2,borders:G2,lightSources:H2,haze:W2,_scenery:V2,scenery:Y2,_post:X2,_shadows:K2,shadows:q2,canopyShadow:$2,mist:Z2,_fx:J2,fx:Q2,_moonbeams:j2,moonbeams:ex,_treehouse:tx,treehouse:nx,_bubbles:ix,bubbles:sx,_grounds:rx,grounds:ax,_relics:ox,relics:lx,_walls:cx,walls:hx,_runeMarkers:ux,runeMarkers:dx,_pathFade:fx,pathFade:px,_trunkFade:mx,trunkFade:gx,_decor:xx,decor:Mx,_paths:vx,paths:bx,_invite:yx,invite:_x,leash:wx,bond:Sx,_party:Ex,party:Ax,_stringLights:Tx,stringLights:Rx,_dancefloor:Cx,dancefloor:Lx,_canopyCutout:Px,canopyCutout:Dx,_tone:Ix,tone:Ox,bloom:Nx,tiltShift:Fx,_creatures:kx,creaturesNear:Ux,creaturesFar:Bx,creatureCurve:zx,youngShareFar:Gx,adultsFrom:Hx,adultShareFar:Wx,legendChanceFar:Vx,legendNextToHome:Yx,legendsFrom:Xx,creatureSimRadius:Kx,creatureSpeed:qx,_setPieces:$x,setPieceChance:Zx,setPieceScale:Jx,setPieceClear:Qx,_placement:jx,setPieceFootprint:eM,soundsystemFootprint:tM,reserveMargin:nM,treeMarginFromSoundsystem:iM,legendSpeed:sM},ji=rM;class aM{keys=new Set;pressed=new Set;padPrev=[];touch={x:0,y:0,toggle:!1,zoom:0,debug:!1};onAny=null;constructor(e=window){e.addEventListener("keydown",t=>{if(t.repeat){this.isGameKey(t.code)&&t.preventDefault();return}this.keys.add(t.code),this.isGameKey(t.code)&&t.preventDefault(),this.onAny?.()||this.pressed.add(t.code)}),e.addEventListener("keyup",t=>this.keys.delete(t.code)),e.addEventListener("blur",()=>this.keys.clear())}isGameKey(e){return/^(Arrow|Space$|Key[WASDZXENPTIFRK]$|Shift|Minus$|Equal$|NumpadAdd$|NumpadSubtract$|Backquote$)/.test(e)}clearPresses(){this.pressed.clear();const e=this.touch;e.toggle=!1,e.zoom=0,e.debug=!1}read(){const e=this.pressed.has("KeyN")||this.touch.nextWave,t=this.pressed.has("KeyP")||this.touch.pauseWaves,i=this.pressed.has("KeyK");this.touch.nextWave=!1,this.touch.pauseWaves=!1;const s=m=>this.keys.has(m)?1:0,r=m=>this.pressed.has(m);let a=s("KeyD")+s("ArrowRight")-s("KeyA")-s("ArrowLeft"),o=s("KeyS")+s("ArrowDown")-s("KeyW")-s("ArrowUp"),h=r("Space"),c=(r("KeyX")||r("Minus")||r("NumpadSubtract")?1:0)-(r("KeyZ")||r("Equal")||r("NumpadAdd")?1:0),d=r("Backquote"),f=s("KeyT")+s("KeyF")+s("ShiftLeft")+s("ShiftRight")>0,u=r("KeyE")||r("KeyR");const p=r("KeyI");this.pressed.clear();const g=typeof navigator<"u"&&navigator.getGamepads?navigator.getGamepads():[];for(const m of g){if(!m)continue;const v=C=>!!m.buttons[C]?.pressed,w=m.buttons.some((C,T)=>C.pressed&&!this.padPrev[T])&&!!this.onAny?.(),A=C=>!w&&v(C)&&!this.padPrev[C];let y=m.axes[0]??0,S=m.axes[1]??0;const b=Math.hypot(y,S),E=.18;if(b<E)y=0,S=0;else{const C=(Math.min(1,b)-E)/(1-E)/b;y*=C,S*=C}y+=(v(15)?1:0)-(v(14)?1:0),S+=(v(13)?1:0)-(v(12)?1:0),a+=y,o+=S,A(3)&&(h=!0),(A(4)||A(6))&&(c+=1),(A(5)||A(7))&&(c-=1),A(8)&&(d=!0),v(0)&&(f=!0),A(2)&&(u=!0),this.padPrev=m.buttons.map(C=>C.pressed);break}const M=this.touch;a+=M.x,o+=M.y,M.toggle&&(h=!0),c+=M.zoom,M.debug&&(d=!0),M.talk&&(f=!0),M.sigil&&(u=!0),M.toggle=!1,M.zoom=0,M.debug=!1,M.sigil=!1;const x=Math.hypot(a,o);return x>1&&(a/=x,o/=x),{moveX:a,moveZ:o,toggleMode:h,zoom:Math.sign(c),debug:d,nextWave:e,pauseWaves:t,cycleSpeakers:i,talk:f,sigil:u,inviteNearest:p}}}const gh="186",oM=0,_u=1,lM=2,io=1,cM=2,Qr=3,ks=0,Hn=1,ti=2,Li=0,mr=1,Pi=2,wu=3,Su=4,Uo=5,hr=100,hM=101,uM=102,dM=103,fM=104,xh=200,pM=201,Mh=202,mM=203,vh=204,bh=205,gM=206,xM=207,MM=208,vM=209,bM=210,yM=211,_M=212,wM=213,SM=214,lc=0,cc=1,hc=2,ia=3,uc=4,dc=5,Mo=6,fc=7,Ef=0,EM=1,AM=2,Di=0,Af=1,Tf=2,Rf=3,Cf=4,Lf=5,Pf=6,Df=7,If=300,Us=301,Sr=302,tl=303,nl=304,Bo=306,vo=1e3,Vi=1001,pc=1002,Ht=1003,TM=1004,_a=1005,Jt=1006,il=1007,Ls=1008,Kn=1009,Of=1010,Nf=1011,sa=1012,yh=1013,Oi=1014,fi=1015,Ni=1016,_h=1017,wh=1018,ra=1020,Ff=35902,kf=35899,Uf=1021,Bf=1022,qn=1023,Ki=1026,Ps=1027,Sh=1028,Eh=1029,Bs=1030,Ah=1031,Th=1033,so=33776,ro=33777,ao=33778,oo=33779,mc=35840,gc=35841,xc=35842,Mc=35843,vc=36196,bc=37492,yc=37496,_c=37488,wc=37489,bo=37490,Sc=37491,Ec=37808,Ac=37809,Tc=37810,Rc=37811,Cc=37812,Lc=37813,Pc=37814,Dc=37815,Ic=37816,Oc=37817,Nc=37818,Fc=37819,kc=37820,Uc=37821,Bc=36492,zc=36494,Gc=36495,Hc=36283,Wc=36284,yo=36285,Vc=36286,RM=3200,Eu=0,CM=1,Pn="",ei="srgb",aa="srgb-linear",_o="linear",Dt="srgb",sl=7680,LM=519,PM=512,DM=513,IM=514,Rh=515,OM=516,NM=517,Ch=518,FM=519,kM=35044,gr=35048,Au="300 es",Ci=2e3,wo=2001;function UM(n){for(let e=n.length-1;e>=0;--e)if(n[e]>=65535)return!0;return!1}function So(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function BM(){const n=So("canvas");return n.style.display="block",n}const Tu={};function Ru(...n){const e="THREE."+n.shift();console.log(e,...n)}function zf(n){const e=n[0];if(typeof e=="string"&&e.startsWith("TSL:")){const t=n[1];t&&t.isStackTrace?n[0]+=" "+t.getLocation():n[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return n}function et(...n){n=zf(n);const e="THREE."+n.shift();{const t=n[0];t&&t.isStackTrace?console.warn(t.getError(e)):console.warn(e,...n)}}function Mt(...n){n=zf(n);const e="THREE."+n.shift();{const t=n[0];t&&t.isStackTrace?console.error(t.getError(e)):console.error(e,...n)}}function xr(...n){const e=n.join(" ");e in Tu||(Tu[e]=!0,et(...n))}function zM(n,e,t){return new Promise(function(i,s){function r(){switch(n.clientWaitSync(e,n.SYNC_FLUSH_COMMANDS_BIT,0)){case n.WAIT_FAILED:s();break;case n.TIMEOUT_EXPIRED:setTimeout(r,t);break;default:i()}}setTimeout(r,t)})}const GM={[lc]:cc,[hc]:Mo,[uc]:fc,[ia]:dc,[cc]:lc,[Mo]:hc,[fc]:uc,[dc]:ia};class Vs{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(t)===-1&&i[e].push(t)}hasEventListener(e,t){const i=this._listeners;return i===void 0?!1:i[e]!==void 0&&i[e].indexOf(t)!==-1}removeEventListener(e,t){const i=this._listeners;if(i===void 0)return;const s=i[e];if(s!==void 0){const r=s.indexOf(t);r!==-1&&s.splice(r,1)}}dispatchEvent(e){const t=this._listeners;if(t===void 0)return;const i=t[e.type];if(i!==void 0){e.target=this;const s=i.slice(0);for(let r=0,a=s.length;r<a;r++)s[r].call(this,e);e.target=null}}}const Sn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],rl=Math.PI/180,Yc=180/Math.PI;function da(){const n=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(Sn[n&255]+Sn[n>>8&255]+Sn[n>>16&255]+Sn[n>>24&255]+"-"+Sn[e&255]+Sn[e>>8&255]+"-"+Sn[e>>16&15|64]+Sn[e>>24&255]+"-"+Sn[t&63|128]+Sn[t>>8&255]+"-"+Sn[t>>16&255]+Sn[t>>24&255]+Sn[i&255]+Sn[i>>8&255]+Sn[i>>16&255]+Sn[i>>24&255]).toLowerCase()}function pt(n,e,t){return Math.max(e,Math.min(t,n))}function HM(n,e){return(n%e+e)%e}function al(n,e,t){return(1-t)*n+t*e}function zr(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:case Uint8ClampedArray:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function Un(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:case Uint8ClampedArray:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}class tt{static{tt.prototype.isVector2=!0}constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("THREE.Vector2: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,i=this.y,s=e.elements;return this.x=s[0]*t+s[3]*i+s[6],this.y=s[1]*t+s[4]*i+s[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=pt(this.x,e.x,t.x),this.y=pt(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=pt(this.x,e,t),this.y=pt(this.y,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(pt(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(pt(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y;return t*t+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const i=Math.cos(t),s=Math.sin(t),r=this.x-e.x,a=this.y-e.y;return this.x=r*i-a*s+e.x,this.y=r*s+a*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Dr{constructor(e=0,t=0,i=0,s=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=i,this._w=s}static slerpFlat(e,t,i,s,r,a,o){let h=i[s+0],c=i[s+1],d=i[s+2],f=i[s+3],u=r[a+0],p=r[a+1],g=r[a+2],M=r[a+3];if(f!==M||h!==u||c!==p||d!==g){let x=h*u+c*p+d*g+f*M;x<0&&(u=-u,p=-p,g=-g,M=-M,x=-x);let m=1-o;if(x<.9995){const v=Math.acos(x),_=Math.sin(v);m=Math.sin(m*v)/_,o=Math.sin(o*v)/_,h=h*m+u*o,c=c*m+p*o,d=d*m+g*o,f=f*m+M*o}else{h=h*m+u*o,c=c*m+p*o,d=d*m+g*o,f=f*m+M*o;const v=1/Math.sqrt(h*h+c*c+d*d+f*f);h*=v,c*=v,d*=v,f*=v}}e[t]=h,e[t+1]=c,e[t+2]=d,e[t+3]=f}static multiplyQuaternionsFlat(e,t,i,s,r,a){const o=i[s],h=i[s+1],c=i[s+2],d=i[s+3],f=r[a],u=r[a+1],p=r[a+2],g=r[a+3];return e[t]=o*g+d*f+h*p-c*u,e[t+1]=h*g+d*u+c*f-o*p,e[t+2]=c*g+d*p+o*u-h*f,e[t+3]=d*g-o*f-h*u-c*p,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,i,s){return this._x=e,this._y=t,this._z=i,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const i=e._x,s=e._y,r=e._z,a=e._order,o=Math.cos,h=Math.sin,c=o(i/2),d=o(s/2),f=o(r/2),u=h(i/2),p=h(s/2),g=h(r/2);switch(a){case"XYZ":this._x=u*d*f+c*p*g,this._y=c*p*f-u*d*g,this._z=c*d*g+u*p*f,this._w=c*d*f-u*p*g;break;case"YXZ":this._x=u*d*f+c*p*g,this._y=c*p*f-u*d*g,this._z=c*d*g-u*p*f,this._w=c*d*f+u*p*g;break;case"ZXY":this._x=u*d*f-c*p*g,this._y=c*p*f+u*d*g,this._z=c*d*g+u*p*f,this._w=c*d*f-u*p*g;break;case"ZYX":this._x=u*d*f-c*p*g,this._y=c*p*f+u*d*g,this._z=c*d*g-u*p*f,this._w=c*d*f+u*p*g;break;case"YZX":this._x=u*d*f+c*p*g,this._y=c*p*f+u*d*g,this._z=c*d*g-u*p*f,this._w=c*d*f-u*p*g;break;case"XZY":this._x=u*d*f-c*p*g,this._y=c*p*f-u*d*g,this._z=c*d*g+u*p*f,this._w=c*d*f+u*p*g;break;default:et("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const i=t/2,s=Math.sin(i);return this._x=e.x*s,this._y=e.y*s,this._z=e.z*s,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,i=t[0],s=t[4],r=t[8],a=t[1],o=t[5],h=t[9],c=t[2],d=t[6],f=t[10],u=i+o+f;if(u>0){const p=.5/Math.sqrt(u+1);this._w=.25/p,this._x=(d-h)*p,this._y=(r-c)*p,this._z=(a-s)*p}else if(i>o&&i>f){const p=2*Math.sqrt(1+i-o-f);this._w=(d-h)/p,this._x=.25*p,this._y=(s+a)/p,this._z=(r+c)/p}else if(o>f){const p=2*Math.sqrt(1+o-i-f);this._w=(r-c)/p,this._x=(s+a)/p,this._y=.25*p,this._z=(h+d)/p}else{const p=2*Math.sqrt(1+f-i-o);this._w=(a-s)/p,this._x=(r+c)/p,this._y=(h+d)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let i=e.dot(t)+1;return i<1e-8?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(pt(this.dot(e),-1,1)))}rotateTowards(e,t){const i=this.angleTo(e);if(i===0)return this;const s=Math.min(1,t/i);return this.slerp(e,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const i=e._x,s=e._y,r=e._z,a=e._w,o=t._x,h=t._y,c=t._z,d=t._w;return this._x=i*d+a*o+s*c-r*h,this._y=s*d+a*h+r*o-i*c,this._z=r*d+a*c+i*h-s*o,this._w=a*d-i*o-s*h-r*c,this._onChangeCallback(),this}slerp(e,t){let i=e._x,s=e._y,r=e._z,a=e._w,o=this.dot(e);o<0&&(i=-i,s=-s,r=-r,a=-a,o=-o);let h=1-t;if(o<.9995){const c=Math.acos(o),d=Math.sin(c);h=Math.sin(h*c)/d,t=Math.sin(t*c)/d,this._x=this._x*h+i*t,this._y=this._y*h+s*t,this._z=this._z*h+r*t,this._w=this._w*h+a*t,this._onChangeCallback()}else this._x=this._x*h+i*t,this._y=this._y*h+s*t,this._z=this._z*h+r*t,this._w=this._w*h+a*t,this.normalize();return this}slerpQuaternions(e,t,i){return this.copy(e).slerp(t,i)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),i=Math.random(),s=Math.sqrt(1-i),r=Math.sqrt(i);return this.set(s*Math.sin(e),s*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class V{static{V.prototype.isVector3=!0}constructor(e=0,t=0,i=0){this.x=e,this.y=t,this.z=i}set(e,t,i){return i===void 0&&(i=this.z),this.x=e,this.y=t,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("THREE.Vector3: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Cu.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Cu.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,i=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[3]*i+r[6]*s,this.y=r[1]*t+r[4]*i+r[7]*s,this.z=r[2]*t+r[5]*i+r[8]*s,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,i=this.y,s=this.z,r=e.elements,a=1/(r[3]*t+r[7]*i+r[11]*s+r[15]);return this.x=(r[0]*t+r[4]*i+r[8]*s+r[12])*a,this.y=(r[1]*t+r[5]*i+r[9]*s+r[13])*a,this.z=(r[2]*t+r[6]*i+r[10]*s+r[14])*a,this}applyQuaternion(e){const t=this.x,i=this.y,s=this.z,r=e.x,a=e.y,o=e.z,h=e.w,c=2*(a*s-o*i),d=2*(o*t-r*s),f=2*(r*i-a*t);return this.x=t+h*c+a*f-o*d,this.y=i+h*d+o*c-r*f,this.z=s+h*f+r*d-a*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,i=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[4]*i+r[8]*s,this.y=r[1]*t+r[5]*i+r[9]*s,this.z=r[2]*t+r[6]*i+r[10]*s,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=pt(this.x,e.x,t.x),this.y=pt(this.y,e.y,t.y),this.z=pt(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=pt(this.x,e,t),this.y=pt(this.y,e,t),this.z=pt(this.z,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(pt(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const i=e.x,s=e.y,r=e.z,a=t.x,o=t.y,h=t.z;return this.x=s*h-r*o,this.y=r*a-i*h,this.z=i*o-s*a,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const i=e.dot(this)/t;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return ol.copy(this).projectOnVector(e),this.sub(ol)}reflect(e){return this.sub(ol.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(pt(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y,s=this.z-e.z;return t*t+i*i+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,i){const s=Math.sin(t)*e;return this.x=s*Math.sin(i),this.y=Math.cos(t)*e,this.z=s*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,i){return this.x=e*Math.sin(t),this.y=i,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),s=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=i,this.z=s,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,i=Math.sqrt(1-t*t);return this.x=i*Math.cos(e),this.y=t,this.z=i*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const ol=new V,Cu=new Dr;class nt{static{nt.prototype.isMatrix3=!0}constructor(e,t,i,s,r,a,o,h,c){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,i,s,r,a,o,h,c)}set(e,t,i,s,r,a,o,h,c){const d=this.elements;return d[0]=e,d[1]=s,d[2]=o,d[3]=t,d[4]=r,d[5]=h,d[6]=i,d[7]=a,d[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],this}extractBasis(e,t,i){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,s=t.elements,r=this.elements,a=i[0],o=i[3],h=i[6],c=i[1],d=i[4],f=i[7],u=i[2],p=i[5],g=i[8],M=s[0],x=s[3],m=s[6],v=s[1],_=s[4],w=s[7],A=s[2],y=s[5],S=s[8];return r[0]=a*M+o*v+h*A,r[3]=a*x+o*_+h*y,r[6]=a*m+o*w+h*S,r[1]=c*M+d*v+f*A,r[4]=c*x+d*_+f*y,r[7]=c*m+d*w+f*S,r[2]=u*M+p*v+g*A,r[5]=u*x+p*_+g*y,r[8]=u*m+p*w+g*S,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[1],s=e[2],r=e[3],a=e[4],o=e[5],h=e[6],c=e[7],d=e[8];return t*a*d-t*o*c-i*r*d+i*o*h+s*r*c-s*a*h}invert(){const e=this.elements,t=e[0],i=e[1],s=e[2],r=e[3],a=e[4],o=e[5],h=e[6],c=e[7],d=e[8],f=d*a-o*c,u=o*h-d*r,p=c*r-a*h,g=t*f+i*u+s*p;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const M=1/g;return e[0]=f*M,e[1]=(s*c-d*i)*M,e[2]=(o*i-s*a)*M,e[3]=u*M,e[4]=(d*t-s*h)*M,e[5]=(s*r-o*t)*M,e[6]=p*M,e[7]=(i*h-c*t)*M,e[8]=(a*t-i*r)*M,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,i,s,r,a,o){const h=Math.cos(r),c=Math.sin(r);return this.set(i*h,i*c,-i*(h*a+c*o)+a+e,-s*c,s*h,-s*(-c*a+h*o)+o+t,0,0,1),this}scale(e,t){return xr("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(ll.makeScale(e,t)),this}rotate(e){return xr("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(ll.makeRotation(-e)),this}translate(e,t){return xr("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(ll.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,i,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,i=e.elements;for(let s=0;s<9;s++)if(t[s]!==i[s])return!1;return!0}fromArray(e,t=0){for(let i=0;i<9;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const ll=new nt,Lu=new nt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Pu=new nt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function WM(){const n={enabled:!0,workingColorSpace:aa,spaces:{},convert:function(s,r,a){return this.enabled===!1||r===a||!r||!a||(this.spaces[r].transfer===Dt&&(s.r=Yi(s.r),s.g=Yi(s.g),s.b=Yi(s.b)),this.spaces[r].primaries!==this.spaces[a].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===Dt&&(s.r=Mr(s.r),s.g=Mr(s.g),s.b=Mr(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===Pn?_o:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,a){return s.copy(this.spaces[r].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(s,r){return xr("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),n.workingToColorSpace(s,r)},toWorkingColorSpace:function(s,r){return xr("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),n.colorSpaceToWorking(s,r)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],i=[.3127,.329];return n.define({[aa]:{primaries:e,whitePoint:i,transfer:_o,toXYZ:Lu,fromXYZ:Pu,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:ei},outputColorSpaceConfig:{drawingBufferColorSpace:ei}},[ei]:{primaries:e,whitePoint:i,transfer:Dt,toXYZ:Lu,fromXYZ:Pu,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:ei}}}),n}const ft=WM();function Yi(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function Mr(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}let qs;class VM{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let i;if(e instanceof HTMLCanvasElement)i=e;else{qs===void 0&&(qs=So("canvas")),qs.width=e.width,qs.height=e.height;const s=qs.getContext("2d");e instanceof ImageData?s.putImageData(e,0,0):s.drawImage(e,0,0,e.width,e.height),i=qs}return i.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=So("canvas");t.width=e.width,t.height=e.height;const i=t.getContext("2d");i.drawImage(e,0,0,e.width,e.height);const s=i.getImageData(0,0,e.width,e.height),r=s.data;for(let a=0;a<r.length;a++)r[a]=Yi(r[a]/255)*255;return i.putImageData(s,0,0),t}else if(e.data){const t=e.data.slice(0);for(let i=0;i<t.length;i++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[i]=Math.floor(Yi(t[i]/255)*255):t[i]=Yi(t[i]);return{data:t,width:e.width,height:e.height}}else return et("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let YM=0;class Lh{constructor(e=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:YM++}),this.uuid=da(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<"u"&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const i={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let a=0,o=s.length;a<o;a++)s[a].isDataTexture?r.push(cl(s[a].image)):r.push(cl(s[a]))}else r=cl(s);i.url=r}return t||(e.images[this.uuid]=i),i}}function cl(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?VM.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(et("Texture: Unable to serialize Texture."),{})}let XM=0;const hl=new V;class Rn extends Vs{constructor(e=Rn.DEFAULT_IMAGE,t=Rn.DEFAULT_MAPPING,i=Vi,s=Vi,r=Jt,a=Ls,o=qn,h=Kn,c=Rn.DEFAULT_ANISOTROPY,d=Pn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:XM++}),this.uuid=da(),this.name="",this.source=new Lh(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=i,this.wrapT=s,this.magFilter=r,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=h,this.offset=new tt(0,0),this.repeat=new tt(1,1),this.center=new tt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new nt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=d,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(hl).x}get height(){return this.source.getSize(hl).y}get depth(){return this.source.getSize(hl).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const t in e){const i=e[t];if(i===void 0){et(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}const s=this[t];if(s===void 0){et(`Texture.setValues(): property '${t}' does not exist.`);continue}s&&i&&s.isVector2&&i.isVector2||s&&i&&s.isVector3&&i.isVector3||s&&i&&s.isMatrix3&&i.isMatrix3?s.copy(i):this[t]=i}}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const i={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),t||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==If)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case vo:e.x=e.x-Math.floor(e.x);break;case Vi:e.x=e.x<0?0:1;break;case pc:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case vo:e.y=e.y-Math.floor(e.y);break;case Vi:e.y=e.y<0?0:1;break;case pc:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}Rn.DEFAULT_IMAGE=null;Rn.DEFAULT_MAPPING=If;Rn.DEFAULT_ANISOTROPY=1;class at{static{at.prototype.isVector4=!0}constructor(e=0,t=0,i=0,s=1){this.x=e,this.y=t,this.z=i,this.w=s}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,i,s){return this.x=e,this.y=t,this.z=i,this.w=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("THREE.Vector4: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,i=this.y,s=this.z,r=this.w,a=e.elements;return this.x=a[0]*t+a[4]*i+a[8]*s+a[12]*r,this.y=a[1]*t+a[5]*i+a[9]*s+a[13]*r,this.z=a[2]*t+a[6]*i+a[10]*s+a[14]*r,this.w=a[3]*t+a[7]*i+a[11]*s+a[15]*r,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,i,s,r;const h=e.elements,c=h[0],d=h[4],f=h[8],u=h[1],p=h[5],g=h[9],M=h[2],x=h[6],m=h[10];if(Math.abs(d-u)<.01&&Math.abs(f-M)<.01&&Math.abs(g-x)<.01){if(Math.abs(d+u)<.1&&Math.abs(f+M)<.1&&Math.abs(g+x)<.1&&Math.abs(c+p+m-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const _=(c+1)/2,w=(p+1)/2,A=(m+1)/2,y=(d+u)/4,S=(f+M)/4,b=(g+x)/4;return _>w&&_>A?_<.01?(i=0,s=.707106781,r=.707106781):(i=Math.sqrt(_),s=y/i,r=S/i):w>A?w<.01?(i=.707106781,s=0,r=.707106781):(s=Math.sqrt(w),i=y/s,r=b/s):A<.01?(i=.707106781,s=.707106781,r=0):(r=Math.sqrt(A),i=S/r,s=b/r),this.set(i,s,r,t),this}let v=Math.sqrt((x-g)*(x-g)+(f-M)*(f-M)+(u-d)*(u-d));return Math.abs(v)<.001&&(v=1),this.x=(x-g)/v,this.y=(f-M)/v,this.z=(u-d)/v,this.w=Math.acos((c+p+m-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=pt(this.x,e.x,t.x),this.y=pt(this.y,e.y,t.y),this.z=pt(this.z,e.z,t.z),this.w=pt(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=pt(this.x,e,t),this.y=pt(this.y,e,t),this.z=pt(this.z,e,t),this.w=pt(this.w,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(pt(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this.w=e.w+(t.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class KM extends Vs{constructor(e=1,t=1,i={}){super(),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Jt,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},i),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=i.depth,this.scissor=new at(0,0,e,t),this.scissorTest=!1,this.viewport=new at(0,0,e,t),this.textures=[];const s={width:e,height:t,depth:i.depth},r=new Rn(s),a=i.count;for(let o=0;o<a;o++)this.textures[o]=r.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(i),this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveColorBuffer=i.resolveColorBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this.storeMultisampledColorBuffer=i.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=i.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=i.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=i.depthTexture,this.samples=i.samples,this.multiview=i.multiview,this.useArrayDepthTexture=i.useArrayDepthTexture}_setTextureOptions(e={}){const t={minFilter:Jt,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let i=0;i<this.textures.length;i++)this.textures[i].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),e!==null&&e.renderTarget===null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,i=1){if(this.width!==e||this.height!==t||this.depth!==i){this.width=e,this.height=t,this.depth=i;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=e,this.textures[s].image.height=t,this.textures[s].image.depth=i,this.textures[s].isData3DTexture!==!0&&(this.textures[s].isArrayTexture=this.textures[s].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,i=e.textures.length;t<i;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;const s=Object.assign({},e.textures[t].image);this.textures[t].source=new Lh(s)}if(this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveColorBuffer=e.resolveColorBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,this.storeMultisampledColorBuffer=e.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=e.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=e.storeMultisampledStencilBuffer,e.depthTexture!==null)if(e.depthTexture.renderTarget===e){const t=e.depthTexture.clone();t.renderTarget=null,this.depthTexture=t}else this.depthTexture=e.depthTexture;return this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}}class ii extends KM{constructor(e=1,t=1,i={}){super(e,t,i),this.isWebGLRenderTarget=!0}}class Gf extends Rn{constructor(e=null,t=1,i=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:i,depth:s},this.magFilter=Ht,this.minFilter=Ht,this.wrapR=Vi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class qM extends Rn{constructor(e=null,t=1,i=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:i,depth:s},this.magFilter=Ht,this.minFilter=Ht,this.wrapR=Vi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}}class kt{static{kt.prototype.isMatrix4=!0}constructor(e,t,i,s,r,a,o,h,c,d,f,u,p,g,M,x){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,i,s,r,a,o,h,c,d,f,u,p,g,M,x)}set(e,t,i,s,r,a,o,h,c,d,f,u,p,g,M,x){const m=this.elements;return m[0]=e,m[4]=t,m[8]=i,m[12]=s,m[1]=r,m[5]=a,m[9]=o,m[13]=h,m[2]=c,m[6]=d,m[10]=f,m[14]=u,m[3]=p,m[7]=g,m[11]=M,m[15]=x,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new kt().fromArray(this.elements)}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],t[9]=i[9],t[10]=i[10],t[11]=i[11],t[12]=i[12],t[13]=i[13],t[14]=i[14],t[15]=i[15],this}copyPosition(e){const t=this.elements,i=e.elements;return t[12]=i[12],t[13]=i[13],t[14]=i[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,i){return this.determinantAffine()===0?(e.set(1,0,0),t.set(0,1,0),i.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this)}makeBasis(e,t,i){return this.set(e.x,t.x,i.x,0,e.y,t.y,i.y,0,e.z,t.z,i.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();const t=this.elements,i=e.elements,s=1/$s.setFromMatrixColumn(e,0).length(),r=1/$s.setFromMatrixColumn(e,1).length(),a=1/$s.setFromMatrixColumn(e,2).length();return t[0]=i[0]*s,t[1]=i[1]*s,t[2]=i[2]*s,t[3]=0,t[4]=i[4]*r,t[5]=i[5]*r,t[6]=i[6]*r,t[7]=0,t[8]=i[8]*a,t[9]=i[9]*a,t[10]=i[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,i=e.x,s=e.y,r=e.z,a=Math.cos(i),o=Math.sin(i),h=Math.cos(s),c=Math.sin(s),d=Math.cos(r),f=Math.sin(r);if(e.order==="XYZ"){const u=a*d,p=a*f,g=o*d,M=o*f;t[0]=h*d,t[4]=-h*f,t[8]=c,t[1]=p+g*c,t[5]=u-M*c,t[9]=-o*h,t[2]=M-u*c,t[6]=g+p*c,t[10]=a*h}else if(e.order==="YXZ"){const u=h*d,p=h*f,g=c*d,M=c*f;t[0]=u+M*o,t[4]=g*o-p,t[8]=a*c,t[1]=a*f,t[5]=a*d,t[9]=-o,t[2]=p*o-g,t[6]=M+u*o,t[10]=a*h}else if(e.order==="ZXY"){const u=h*d,p=h*f,g=c*d,M=c*f;t[0]=u-M*o,t[4]=-a*f,t[8]=g+p*o,t[1]=p+g*o,t[5]=a*d,t[9]=M-u*o,t[2]=-a*c,t[6]=o,t[10]=a*h}else if(e.order==="ZYX"){const u=a*d,p=a*f,g=o*d,M=o*f;t[0]=h*d,t[4]=g*c-p,t[8]=u*c+M,t[1]=h*f,t[5]=M*c+u,t[9]=p*c-g,t[2]=-c,t[6]=o*h,t[10]=a*h}else if(e.order==="YZX"){const u=a*h,p=a*c,g=o*h,M=o*c;t[0]=h*d,t[4]=M-u*f,t[8]=g*f+p,t[1]=f,t[5]=a*d,t[9]=-o*d,t[2]=-c*d,t[6]=p*f+g,t[10]=u-M*f}else if(e.order==="XZY"){const u=a*h,p=a*c,g=o*h,M=o*c;t[0]=h*d,t[4]=-f,t[8]=c*d,t[1]=u*f+M,t[5]=a*d,t[9]=p*f-g,t[2]=g*f-p,t[6]=o*d,t[10]=M*f+u}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose($M,e,ZM)}lookAt(e,t,i){const s=this.elements;return Vn.subVectors(e,t),Vn.lengthSq()===0&&(Vn.z=1),Vn.normalize(),es.crossVectors(i,Vn),es.lengthSq()===0&&(Math.abs(i.z)===1?Vn.x+=1e-4:Vn.z+=1e-4,Vn.normalize(),es.crossVectors(i,Vn)),es.normalize(),wa.crossVectors(Vn,es),s[0]=es.x,s[4]=wa.x,s[8]=Vn.x,s[1]=es.y,s[5]=wa.y,s[9]=Vn.y,s[2]=es.z,s[6]=wa.z,s[10]=Vn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,s=t.elements,r=this.elements,a=i[0],o=i[4],h=i[8],c=i[12],d=i[1],f=i[5],u=i[9],p=i[13],g=i[2],M=i[6],x=i[10],m=i[14],v=i[3],_=i[7],w=i[11],A=i[15],y=s[0],S=s[4],b=s[8],E=s[12],C=s[1],T=s[5],R=s[9],O=s[13],I=s[2],k=s[6],U=s[10],W=s[14],ne=s[3],K=s[7],re=s[11],N=s[15];return r[0]=a*y+o*C+h*I+c*ne,r[4]=a*S+o*T+h*k+c*K,r[8]=a*b+o*R+h*U+c*re,r[12]=a*E+o*O+h*W+c*N,r[1]=d*y+f*C+u*I+p*ne,r[5]=d*S+f*T+u*k+p*K,r[9]=d*b+f*R+u*U+p*re,r[13]=d*E+f*O+u*W+p*N,r[2]=g*y+M*C+x*I+m*ne,r[6]=g*S+M*T+x*k+m*K,r[10]=g*b+M*R+x*U+m*re,r[14]=g*E+M*O+x*W+m*N,r[3]=v*y+_*C+w*I+A*ne,r[7]=v*S+_*T+w*k+A*K,r[11]=v*b+_*R+w*U+A*re,r[15]=v*E+_*O+w*W+A*N,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[4],s=e[8],r=e[12],a=e[1],o=e[5],h=e[9],c=e[13],d=e[2],f=e[6],u=e[10],p=e[14],g=e[3],M=e[7],x=e[11],m=e[15],v=h*p-c*u,_=o*p-c*f,w=o*u-h*f,A=a*p-c*d,y=a*u-h*d,S=a*f-o*d;return t*(M*v-x*_+m*w)-i*(g*v-x*A+m*y)+s*(g*_-M*A+m*S)-r*(g*w-M*y+x*S)}determinantAffine(){const e=this.elements,t=e[0],i=e[4],s=e[8],r=e[1],a=e[5],o=e[9],h=e[2],c=e[6],d=e[10];return t*(a*d-o*c)-i*(r*d-o*h)+s*(r*c-a*h)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,i){const s=this.elements;return e.isVector3?(s[12]=e.x,s[13]=e.y,s[14]=e.z):(s[12]=e,s[13]=t,s[14]=i),this}invert(){const e=this.elements,t=e[0],i=e[1],s=e[2],r=e[3],a=e[4],o=e[5],h=e[6],c=e[7],d=e[8],f=e[9],u=e[10],p=e[11],g=e[12],M=e[13],x=e[14],m=e[15],v=t*o-i*a,_=t*h-s*a,w=t*c-r*a,A=i*h-s*o,y=i*c-r*o,S=s*c-r*h,b=d*M-f*g,E=d*x-u*g,C=d*m-p*g,T=f*x-u*M,R=f*m-p*M,O=u*m-p*x,I=v*O-_*R+w*T+A*C-y*E+S*b;if(I===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const k=1/I;return e[0]=(o*O-h*R+c*T)*k,e[1]=(s*R-i*O-r*T)*k,e[2]=(M*S-x*y+m*A)*k,e[3]=(u*y-f*S-p*A)*k,e[4]=(h*C-a*O-c*E)*k,e[5]=(t*O-s*C+r*E)*k,e[6]=(x*w-g*S-m*_)*k,e[7]=(d*S-u*w+p*_)*k,e[8]=(a*R-o*C+c*b)*k,e[9]=(i*C-t*R-r*b)*k,e[10]=(g*y-M*w+m*v)*k,e[11]=(f*w-d*y-p*v)*k,e[12]=(o*E-a*T-h*b)*k,e[13]=(t*T-i*E+s*b)*k,e[14]=(M*_-g*A-x*v)*k,e[15]=(d*A-f*_+u*v)*k,this}scale(e){const t=this.elements,i=e.x,s=e.y,r=e.z;return t[0]*=i,t[4]*=s,t[8]*=r,t[1]*=i,t[5]*=s,t[9]*=r,t[2]*=i,t[6]*=s,t[10]*=r,t[3]*=i,t[7]*=s,t[11]*=r,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],s=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,i,s))}makeTranslation(e,t,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,i,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,t,-i,0,0,i,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,0,i,0,0,1,0,0,-i,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,0,i,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const i=Math.cos(t),s=Math.sin(t),r=1-i,a=e.x,o=e.y,h=e.z,c=r*a,d=r*o;return this.set(c*a+i,c*o-s*h,c*h+s*o,0,c*o+s*h,d*o+i,d*h-s*a,0,c*h-s*o,d*h+s*a,r*h*h+i,0,0,0,0,1),this}makeScale(e,t,i){return this.set(e,0,0,0,0,t,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,t,i,s,r,a){return this.set(1,i,r,0,e,1,a,0,t,s,1,0,0,0,0,1),this}compose(e,t,i){const s=this.elements,r=t._x,a=t._y,o=t._z,h=t._w,c=r+r,d=a+a,f=o+o,u=r*c,p=r*d,g=r*f,M=a*d,x=a*f,m=o*f,v=h*c,_=h*d,w=h*f,A=i.x,y=i.y,S=i.z;return s[0]=(1-(M+m))*A,s[1]=(p+w)*A,s[2]=(g-_)*A,s[3]=0,s[4]=(p-w)*y,s[5]=(1-(u+m))*y,s[6]=(x+v)*y,s[7]=0,s[8]=(g+_)*S,s[9]=(x-v)*S,s[10]=(1-(u+M))*S,s[11]=0,s[12]=e.x,s[13]=e.y,s[14]=e.z,s[15]=1,this}decompose(e,t,i){const s=this.elements;e.x=s[12],e.y=s[13],e.z=s[14];const r=this.determinantAffine();if(r===0)return i.set(1,1,1),t.identity(),this;let a=$s.set(s[0],s[1],s[2]).length();const o=$s.set(s[4],s[5],s[6]).length(),h=$s.set(s[8],s[9],s[10]).length();r<0&&(a=-a),oi.copy(this);const c=1/a,d=1/o,f=1/h;return oi.elements[0]*=c,oi.elements[1]*=c,oi.elements[2]*=c,oi.elements[4]*=d,oi.elements[5]*=d,oi.elements[6]*=d,oi.elements[8]*=f,oi.elements[9]*=f,oi.elements[10]*=f,t.setFromRotationMatrix(oi),i.x=a,i.y=o,i.z=h,this}makePerspective(e,t,i,s,r,a,o=Ci,h=!1){const c=this.elements,d=2*r/(t-e),f=2*r/(i-s),u=(t+e)/(t-e),p=(i+s)/(i-s);let g,M;if(h)g=r/(a-r),M=a*r/(a-r);else if(o===Ci)g=-(a+r)/(a-r),M=-2*a*r/(a-r);else if(o===wo)g=-a/(a-r),M=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=d,c[4]=0,c[8]=u,c[12]=0,c[1]=0,c[5]=f,c[9]=p,c[13]=0,c[2]=0,c[6]=0,c[10]=g,c[14]=M,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,i,s,r,a,o=Ci,h=!1){const c=this.elements,d=2/(t-e),f=2/(i-s),u=-(t+e)/(t-e),p=-(i+s)/(i-s);let g,M;if(h)g=1/(a-r),M=a/(a-r);else if(o===Ci)g=-2/(a-r),M=-(a+r)/(a-r);else if(o===wo)g=-1/(a-r),M=-r/(a-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=d,c[4]=0,c[8]=0,c[12]=u,c[1]=0,c[5]=f,c[9]=0,c[13]=p,c[2]=0,c[6]=0,c[10]=g,c[14]=M,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){const t=this.elements,i=e.elements;for(let s=0;s<16;s++)if(t[s]!==i[s])return!1;return!0}fromArray(e,t=0){for(let i=0;i<16;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e[t+9]=i[9],e[t+10]=i[10],e[t+11]=i[11],e[t+12]=i[12],e[t+13]=i[13],e[t+14]=i[14],e[t+15]=i[15],e}}const $s=new V,oi=new kt,$M=new V(0,0,0),ZM=new V(1,1,1),es=new V,wa=new V,Vn=new V,Du=new kt,Iu=new Dr;class zs{constructor(e=0,t=0,i=0,s=zs.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=i,this._order=s}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,i,s=this._order){return this._x=e,this._y=t,this._z=i,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,i=!0){const s=e.elements,r=s[0],a=s[4],o=s[8],h=s[1],c=s[5],d=s[9],f=s[2],u=s[6],p=s[10];switch(t){case"XYZ":this._y=Math.asin(pt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-d,p),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(u,c),this._z=0);break;case"YXZ":this._x=Math.asin(-pt(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(o,p),this._z=Math.atan2(h,c)):(this._y=Math.atan2(-f,r),this._z=0);break;case"ZXY":this._x=Math.asin(pt(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(-f,p),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(h,r));break;case"ZYX":this._y=Math.asin(-pt(f,-1,1)),Math.abs(f)<.9999999?(this._x=Math.atan2(u,p),this._z=Math.atan2(h,r)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(pt(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(-d,c),this._y=Math.atan2(-f,r)):(this._x=0,this._y=Math.atan2(o,p));break;case"XZY":this._z=Math.asin(-pt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(u,c),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-d,p),this._y=0);break;default:et("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,i){return Du.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Du,t,i)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Iu.setFromEuler(this),this.setFromQuaternion(Iu,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}zs.DEFAULT_ORDER="XYZ";class Hf{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let JM=0;const Ou=new V,Zs=new Dr,Bi=new kt,Sa=new V,Gr=new V,QM=new V,jM=new Dr,Nu=new V(1,0,0),Fu=new V(0,1,0),ku=new V(0,0,1),Uu={type:"added"},ev={type:"removed"},Js={type:"childadded",child:null},ul={type:"childremoved",child:null};class On extends Vs{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:JM++}),this.uuid=da(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=On.DEFAULT_UP.clone();const e=new V,t=new zs,i=new Dr,s=new V(1,1,1);function r(){i.setFromEuler(t,!1)}function a(){t.setFromQuaternion(i,void 0,!1)}t._onChange(r),i._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new kt},normalMatrix:{value:new nt}}),this.matrix=new kt,this.matrixWorld=new kt,this.matrixAutoUpdate=On.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=On.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Hf,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Zs.setFromAxisAngle(e,t),this.quaternion.multiply(Zs),this}rotateOnWorldAxis(e,t){return Zs.setFromAxisAngle(e,t),this.quaternion.premultiply(Zs),this}rotateX(e){return this.rotateOnAxis(Nu,e)}rotateY(e){return this.rotateOnAxis(Fu,e)}rotateZ(e){return this.rotateOnAxis(ku,e)}translateOnAxis(e,t){return Ou.copy(e).applyQuaternion(this.quaternion),this.position.add(Ou.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Nu,e)}translateY(e){return this.translateOnAxis(Fu,e)}translateZ(e){return this.translateOnAxis(ku,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Bi.copy(this.matrixWorld).invert())}lookAt(e,t,i){e.isVector3?Sa.copy(e):Sa.set(e,t,i);const s=this.parent;this.updateWorldMatrix(!0,!1),Gr.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Bi.lookAt(Gr,Sa,this.up):Bi.lookAt(Sa,Gr,this.up),this.quaternion.setFromRotationMatrix(Bi),s&&(Bi.extractRotation(s.matrixWorld),Zs.setFromRotationMatrix(Bi),this.quaternion.premultiply(Zs.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(Mt("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Uu),Js.child=e,this.dispatchEvent(Js),Js.child=null):Mt("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(ev),ul.child=e,this.dispatchEvent(ul),ul.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Bi.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Bi.multiply(e.parent.matrixWorld)),e.applyMatrix4(Bi),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Uu),Js.child=e,this.dispatchEvent(Js),Js.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let i=0,s=this.children.length;i<s;i++){const a=this.children[i].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,i=[]){this[e]===t&&i.push(this);const s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].getObjectsByProperty(e,t,i);return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Gr,e,QM),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Gr,jM,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}intersectsFrustum(){}traverse(e){e(this);const t=this.children;for(let i=0,s=t.length;i<s;i++)t[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let i=0,s=t.length;i<s;i++)t[i].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);const e=this.pivot;if(e!==null){const t=e.x,i=e.y,s=e.z,r=this.matrix.elements;r[12]+=t-r[0]*t-r[4]*i-r[8]*s,r[13]+=i-r[1]*t-r[5]*i-r[9]*s,r[14]+=s-r[2]*t-r[6]*i-r[10]*s}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let i=0,s=t.length;i<s;i++)t[i].updateMatrixWorld(e)}updateWorldMatrix(e,t,i=!1){const s=this.parent;if(e===!0&&s!==null&&s.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||i)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,i=!0),t===!0){const r=this.children;for(let a=0,o=r.length;a<o;a++)r[a].updateWorldMatrix(!1,!0,i)}}toJSON(e){const t=e===void 0||typeof e=="string",i={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,s.name=this.name,s.castShadow=this.castShadow,s.receiveShadow=this.receiveShadow,s.visible=this.visible,s.frustumCulled=this.frustumCulled,s.renderOrder=this.renderOrder,s.static=this.static,s.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.pivot!==null&&(s.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(s.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(s.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(o=>({...o})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(e),s.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(o,h){return o[h.uuid]===void 0&&(o[h.uuid]=h.toJSON(e)),h.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(e.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const h=o.shapes;if(Array.isArray(h))for(let c=0,d=h.length;c<d;c++){const f=h[c];r(e.shapes,f)}else r(e.shapes,h)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let h=0,c=this.material.length;h<c;h++)o.push(r(e.materials,this.material[h]));s.material=o}else s.material=r(e.materials,this.material);if(this.children.length>0){s.children=[];for(let o=0;o<this.children.length;o++)s.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){s.animations=[];for(let o=0;o<this.animations.length;o++){const h=this.animations[o];s.animations.push(r(e.animations,h))}}if(t){const o=a(e.geometries),h=a(e.materials),c=a(e.textures),d=a(e.images),f=a(e.shapes),u=a(e.skeletons),p=a(e.animations),g=a(e.nodes);o.length>0&&(i.geometries=o),h.length>0&&(i.materials=h),c.length>0&&(i.textures=c),d.length>0&&(i.images=d),f.length>0&&(i.shapes=f),u.length>0&&(i.skeletons=u),p.length>0&&(i.animations=p),g.length>0&&(i.nodes=g)}return i.object=s,i;function a(o){const h=[];for(const c in o){const d=o[c];delete d.metadata,h.push(d)}return h}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot!==null?e.pivot.clone():null,this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let i=0;i<e.children.length;i++){const s=e.children[i];this.add(s.clone())}return this}dispose(){this.dispatchEvent({type:"dispose"})}}On.DEFAULT_UP=new V(0,1,0);On.DEFAULT_MATRIX_AUTO_UPDATE=!0;On.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class Ds extends On{constructor(){super(),this.isGroup=!0,this.type="Group"}}const tv={type:"move"};class dl{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Ds,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Ds,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new V,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new V),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Ds,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new V,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new V,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const i of e.hand.values())this._getHandJoint(t,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,i){let s=null,r=null,a=null;const o=this._targetRay,h=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){a=!0;for(const M of e.hand.values()){const x=t.getJointPose(M,i),m=this._getHandJoint(c,M);x!==null&&(m.matrix.fromArray(x.transform.matrix),m.matrix.decompose(m.position,m.rotation,m.scale),m.matrixWorldNeedsUpdate=!0,m.jointRadius=x.radius),m.visible=x!==null}const d=c.joints["index-finger-tip"],f=c.joints["thumb-tip"],u=d.position.distanceTo(f.position),p=.02,g=.005;c.inputState.pinching&&u>p+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&u<=p-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else h!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,i),r!==null&&(h.matrix.fromArray(r.transform.matrix),h.matrix.decompose(h.position,h.rotation,h.scale),h.matrixWorldNeedsUpdate=!0,r.linearVelocity?(h.hasLinearVelocity=!0,h.linearVelocity.copy(r.linearVelocity)):h.hasLinearVelocity=!1,r.angularVelocity?(h.hasAngularVelocity=!0,h.angularVelocity.copy(r.angularVelocity)):h.hasAngularVelocity=!1,h.eventsEnabled&&h.dispatchEvent({type:"gripUpdated",data:e,target:this})));o!==null&&(s=t.getPose(e.targetRaySpace,i),s===null&&r!==null&&(s=r),s!==null&&(o.matrix.fromArray(s.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,s.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(s.linearVelocity)):o.hasLinearVelocity=!1,s.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(s.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(tv)))}return o!==null&&(o.visible=s!==null),h!==null&&(h.visible=r!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const i=new Ds;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[t.jointName]=i,e.add(i)}return e.joints[t.jointName]}}const Wf={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},ts={h:0,s:0,l:0},Ea={h:0,s:0,l:0};function fl(n,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?n+(e-n)*6*t:t<1/2?e:t<2/3?n+(e-n)*6*(2/3-t):n}class ht{constructor(e,t,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,i)}set(e,t,i){if(t===void 0&&i===void 0){const s=e;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(e,t,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=ei){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,ft.colorSpaceToWorking(this,t),this}setRGB(e,t,i,s=ft.workingColorSpace){return this.r=e,this.g=t,this.b=i,ft.colorSpaceToWorking(this,s),this}setHSL(e,t,i,s=ft.workingColorSpace){if(e=HM(e,1),t=pt(t,0,1),i=pt(i,0,1),t===0)this.r=this.g=this.b=i;else{const r=i<=.5?i*(1+t):i+t-i*t,a=2*i-r;this.r=fl(a,r,e+1/3),this.g=fl(a,r,e),this.b=fl(a,r,e-1/3)}return ft.colorSpaceToWorking(this,s),this}setStyle(e,t=ei){function i(r){r!==void 0&&parseFloat(r)<1&&et("Color: Alpha component of "+e+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(e)){let r;const a=s[1],o=s[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:et("Color: Unknown color model "+e)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(e)){const r=s[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(r,16),t);et("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=ei){const i=Wf[e.toLowerCase()];return i!==void 0?this.setHex(i,t):et("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Yi(e.r),this.g=Yi(e.g),this.b=Yi(e.b),this}copyLinearToSRGB(e){return this.r=Mr(e.r),this.g=Mr(e.g),this.b=Mr(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=ei){return ft.workingToColorSpace(En.copy(this),e),Math.round(pt(En.r*255,0,255))*65536+Math.round(pt(En.g*255,0,255))*256+Math.round(pt(En.b*255,0,255))}getHexString(e=ei){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=ft.workingColorSpace){ft.workingToColorSpace(En.copy(this),t);const i=En.r,s=En.g,r=En.b,a=Math.max(i,s,r),o=Math.min(i,s,r);let h,c;const d=(o+a)/2;if(o===a)h=0,c=0;else{const f=a-o;switch(c=d<=.5?f/(a+o):f/(2-a-o),a){case i:h=(s-r)/f+(s<r?6:0);break;case s:h=(r-i)/f+2;break;case r:h=(i-s)/f+4;break}h/=6}return e.h=h,e.s=c,e.l=d,e}getRGB(e,t=ft.workingColorSpace){return ft.workingToColorSpace(En.copy(this),t),e.r=En.r,e.g=En.g,e.b=En.b,e}getStyle(e=ei){ft.workingToColorSpace(En.copy(this),e);const t=En.r,i=En.g,s=En.b;return e!==ei?`color(${e} ${t.toFixed(3)} ${i.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(i*255)},${Math.round(s*255)})`}offsetHSL(e,t,i){return this.getHSL(ts),this.setHSL(ts.h+e,ts.s+t,ts.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,i){return this.r=e.r+(t.r-e.r)*i,this.g=e.g+(t.g-e.g)*i,this.b=e.b+(t.b-e.b)*i,this}lerpHSL(e,t){this.getHSL(ts),e.getHSL(Ea);const i=al(ts.h,Ea.h,t),s=al(ts.s,Ea.s,t),r=al(ts.l,Ea.l,t);return this.setHSL(i,s,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,i=this.g,s=this.b,r=e.elements;return this.r=r[0]*t+r[3]*i+r[6]*s,this.g=r[1]*t+r[4]*i+r[7]*s,this.b=r[2]*t+r[5]*i+r[8]*s,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const En=new ht;ht.NAMES=Wf;class Bu extends On{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new zs,this.environmentIntensity=1,this.environmentRotation=new zs,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),t.object.backgroundBlurriness=this.backgroundBlurriness,t.object.backgroundIntensity=this.backgroundIntensity,t.object.backgroundRotation=this.backgroundRotation.toArray(),t.object.environmentIntensity=this.environmentIntensity,t.object.environmentRotation=this.environmentRotation.toArray(),t}}const li=new V,zi=new V,pl=new V,Gi=new V,Qs=new V,js=new V,zu=new V,ml=new V,gl=new V,xl=new V,Ml=new at,vl=new at,bl=new at;class di{constructor(e=new V,t=new V,i=new V){this.a=e,this.b=t,this.c=i}static getNormal(e,t,i,s){s.subVectors(i,t),li.subVectors(e,t),s.cross(li);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(e,t,i,s,r){li.subVectors(s,t),zi.subVectors(i,t),pl.subVectors(e,t);const a=li.dot(li),o=li.dot(zi),h=li.dot(pl),c=zi.dot(zi),d=zi.dot(pl),f=a*c-o*o;if(f===0)return r.set(0,0,0),null;const u=1/f,p=(c*h-o*d)*u,g=(a*d-o*h)*u;return r.set(1-p-g,g,p)}static containsPoint(e,t,i,s){return this.getBarycoord(e,t,i,s,Gi)===null?!1:Gi.x>=0&&Gi.y>=0&&Gi.x+Gi.y<=1}static getInterpolation(e,t,i,s,r,a,o,h){return this.getBarycoord(e,t,i,s,Gi)===null?(h.x=0,h.y=0,"z"in h&&(h.z=0),"w"in h&&(h.w=0),null):(h.setScalar(0),h.addScaledVector(r,Gi.x),h.addScaledVector(a,Gi.y),h.addScaledVector(o,Gi.z),h)}static getInterpolatedAttribute(e,t,i,s,r,a){return Ml.setScalar(0),vl.setScalar(0),bl.setScalar(0),Ml.fromBufferAttribute(e,t),vl.fromBufferAttribute(e,i),bl.fromBufferAttribute(e,s),a.setScalar(0),a.addScaledVector(Ml,r.x),a.addScaledVector(vl,r.y),a.addScaledVector(bl,r.z),a}static isFrontFacing(e,t,i,s){return li.subVectors(i,t),zi.subVectors(e,t),li.cross(zi).dot(s)<0}set(e,t,i){return this.a.copy(e),this.b.copy(t),this.c.copy(i),this}setFromPointsAndIndices(e,t,i,s){return this.a.copy(e[t]),this.b.copy(e[i]),this.c.copy(e[s]),this}setFromAttributeAndIndices(e,t,i,s){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,s),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return li.subVectors(this.c,this.b),zi.subVectors(this.a,this.b),li.cross(zi).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return di.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return di.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,i,s,r){return di.getInterpolation(e,this.a,this.b,this.c,t,i,s,r)}containsPoint(e){return di.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return di.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const i=this.a,s=this.b,r=this.c;let a,o;Qs.subVectors(s,i),js.subVectors(r,i),ml.subVectors(e,i);const h=Qs.dot(ml),c=js.dot(ml);if(h<=0&&c<=0)return t.copy(i);gl.subVectors(e,s);const d=Qs.dot(gl),f=js.dot(gl);if(d>=0&&f<=d)return t.copy(s);const u=h*f-d*c;if(u<=0&&h>=0&&d<=0)return a=h/(h-d),t.copy(i).addScaledVector(Qs,a);xl.subVectors(e,r);const p=Qs.dot(xl),g=js.dot(xl);if(g>=0&&p<=g)return t.copy(r);const M=p*c-h*g;if(M<=0&&c>=0&&g<=0)return o=c/(c-g),t.copy(i).addScaledVector(js,o);const x=d*g-p*f;if(x<=0&&f-d>=0&&p-g>=0)return zu.subVectors(r,s),o=(f-d)/(f-d+(p-g)),t.copy(s).addScaledVector(zu,o);const m=1/(x+M+u);return a=M*m,o=u*m,t.copy(i).addScaledVector(Qs,a).addScaledVector(js,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}class gs{constructor(e=new V(1/0,1/0,1/0),t=new V(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t+=3)this.expandByPoint(ci.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,i=e.count;t<i;t++)this.expandByPoint(ci.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const i=ci.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const i=e.geometry;if(i!==void 0){const r=i.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,ci):ci.fromBufferAttribute(r,a),ci.applyMatrix4(e.matrixWorld),this.expandByPoint(ci);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Aa.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),Aa.copy(i.boundingBox)),Aa.applyMatrix4(e.matrixWorld),this.union(Aa)}const s=e.children;for(let r=0,a=s.length;r<a;r++)this.expandByObject(s[r],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,ci),ci.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,i;return e.normal.x>0?(t=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),t<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Hr),Ta.subVectors(this.max,Hr),er.subVectors(e.a,Hr),tr.subVectors(e.b,Hr),nr.subVectors(e.c,Hr),ns.subVectors(tr,er),is.subVectors(nr,tr),Ms.subVectors(er,nr);let t=[0,-ns.z,ns.y,0,-is.z,is.y,0,-Ms.z,Ms.y,ns.z,0,-ns.x,is.z,0,-is.x,Ms.z,0,-Ms.x,-ns.y,ns.x,0,-is.y,is.x,0,-Ms.y,Ms.x,0];return!yl(t,er,tr,nr,Ta)||(t=[1,0,0,0,1,0,0,0,1],!yl(t,er,tr,nr,Ta))?!1:(Ra.crossVectors(ns,is),t=[Ra.x,Ra.y,Ra.z],yl(t,er,tr,nr,Ta))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,ci).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(ci).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Hi[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Hi[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Hi[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Hi[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Hi[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Hi[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Hi[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Hi[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Hi),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const Hi=[new V,new V,new V,new V,new V,new V,new V,new V],ci=new V,Aa=new gs,er=new V,tr=new V,nr=new V,ns=new V,is=new V,Ms=new V,Hr=new V,Ta=new V,Ra=new V,vs=new V;function yl(n,e,t,i,s){for(let r=0,a=n.length-3;r<=a;r+=3){vs.fromArray(n,r);const o=s.x*Math.abs(vs.x)+s.y*Math.abs(vs.y)+s.z*Math.abs(vs.z),h=e.dot(vs),c=t.dot(vs),d=i.dot(vs);if(Math.max(-Math.max(h,c,d),Math.min(h,c,d))>o)return!1}return!0}const rn=new V,Ca=new tt;let nv=0;class Nn extends Vs{constructor(e,t,i=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:nv++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=i,this.usage=kM,this.updateRanges=[],this.gpuType=fi,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,i){e*=this.itemSize,i*=t.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[e+s]=t.array[i+s];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,i=this.count;t<i;t++)Ca.fromBufferAttribute(this,t),Ca.applyMatrix3(e),this.setXY(t,Ca.x,Ca.y);else if(this.itemSize===3)for(let t=0,i=this.count;t<i;t++)rn.fromBufferAttribute(this,t),rn.applyMatrix3(e),this.setXYZ(t,rn.x,rn.y,rn.z);return this}applyMatrix4(e){for(let t=0,i=this.count;t<i;t++)rn.fromBufferAttribute(this,t),rn.applyMatrix4(e),this.setXYZ(t,rn.x,rn.y,rn.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)rn.fromBufferAttribute(this,t),rn.applyNormalMatrix(e),this.setXYZ(t,rn.x,rn.y,rn.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)rn.fromBufferAttribute(this,t),rn.transformDirection(e),this.setXYZ(t,rn.x,rn.y,rn.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let i=this.array[e*this.itemSize+t];return this.normalized&&(i=zr(i,this.array)),i}setComponent(e,t,i){return this.normalized&&(i=Un(i,this.array)),this.array[e*this.itemSize+t]=i,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=zr(t,this.array)),t}setX(e,t){return this.normalized&&(t=Un(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=zr(t,this.array)),t}setY(e,t){return this.normalized&&(t=Un(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=zr(t,this.array)),t}setZ(e,t){return this.normalized&&(t=Un(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=zr(t,this.array)),t}setW(e,t){return this.normalized&&(t=Un(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,i){return e*=this.itemSize,this.normalized&&(t=Un(t,this.array),i=Un(i,this.array)),this.array[e+0]=t,this.array[e+1]=i,this}setXYZ(e,t,i,s){return e*=this.itemSize,this.normalized&&(t=Un(t,this.array),i=Un(i,this.array),s=Un(s,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=s,this}setXYZW(e,t,i,s,r){return e*=this.itemSize,this.normalized&&(t=Un(t,this.array),i=Un(i,this.array),s=Un(s,this.array),r=Un(r,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=s,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return e.name=this.name,e.usage=this.usage,e.gpuType=this.gpuType,e}dispose(){this.dispatchEvent({type:"dispose"})}}class Vf extends Nn{constructor(e,t,i){super(new Uint16Array(e),t,i)}}class Yf extends Nn{constructor(e,t,i){super(new Uint32Array(e),t,i)}}class St extends Nn{constructor(e,t,i){super(new Float32Array(e),t,i)}}const iv=new gs,Wr=new V,_l=new V;class Ys{constructor(e=new V,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const i=this.center;t!==void 0?i.copy(t):iv.setFromPoints(e).getCenter(i);let s=0;for(let r=0,a=e.length;r<a;r++)s=Math.max(s,i.distanceToSquared(e[r]));return this.radius=Math.sqrt(s),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const i=this.center.distanceToSquared(e);return t.copy(e),i>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Wr.subVectors(e,this.center);const t=Wr.lengthSq();if(t>this.radius*this.radius){const i=Math.sqrt(t),s=(i-this.radius)*.5;this.center.addScaledVector(Wr,s/i),this.radius+=s}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(_l.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Wr.copy(e.center).add(_l)),this.expandByPoint(Wr.copy(e.center).sub(_l))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}let sv=0;const Qn=new kt,wl=new On,ir=new V,Yn=new gs,Vr=new gs,pn=new V;class Qt extends Vs{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:sv++}),this.uuid=da(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(UM(e)?Yf:Vf)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,i=0){this.groups.push({start:e,count:t,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const r=new nt().getNormalMatrix(e);i.applyNormalMatrix(r),i.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(e),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return Qn.makeRotationFromQuaternion(e),this.applyMatrix4(Qn),this}rotateX(e){return Qn.makeRotationX(e),this.applyMatrix4(Qn),this}rotateY(e){return Qn.makeRotationY(e),this.applyMatrix4(Qn),this}rotateZ(e){return Qn.makeRotationZ(e),this.applyMatrix4(Qn),this}translate(e,t,i){return Qn.makeTranslation(e,t,i),this.applyMatrix4(Qn),this}scale(e,t,i){return Qn.makeScale(e,t,i),this.applyMatrix4(Qn),this}lookAt(e){return wl.lookAt(e),wl.updateMatrix(),this.applyMatrix4(wl.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(ir).negate(),this.translate(ir.x,ir.y,ir.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const i=[];for(let s=0,r=e.length;s<r;s++){const a=e[s];i.push(a.x,a.y,a.z||0)}this.setAttribute("position",new St(i,3))}else{const i=Math.min(e.length,t.count);for(let s=0;s<i;s++){const r=e[s];t.setXYZ(s,r.x,r.y,r.z||0)}e.length>t.count&&et("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new gs);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Mt("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new V(-1/0,-1/0,-1/0),new V(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let i=0,s=t.length;i<s;i++){const r=t[i];Yn.setFromBufferAttribute(r),this.morphTargetsRelative?(pn.addVectors(this.boundingBox.min,Yn.min),this.boundingBox.expandByPoint(pn),pn.addVectors(this.boundingBox.max,Yn.max),this.boundingBox.expandByPoint(pn)):(this.boundingBox.expandByPoint(Yn.min),this.boundingBox.expandByPoint(Yn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&Mt('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Ys);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Mt("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new V,1/0);return}if(e){const i=this.boundingSphere.center;if(Yn.setFromBufferAttribute(e),t)for(let r=0,a=t.length;r<a;r++){const o=t[r];Vr.setFromBufferAttribute(o),this.morphTargetsRelative?(pn.addVectors(Yn.min,Vr.min),Yn.expandByPoint(pn),pn.addVectors(Yn.max,Vr.max),Yn.expandByPoint(pn)):(Yn.expandByPoint(Vr.min),Yn.expandByPoint(Vr.max))}Yn.getCenter(i);let s=0;for(let r=0,a=e.count;r<a;r++)pn.fromBufferAttribute(e,r),s=Math.max(s,i.distanceToSquared(pn));if(t)for(let r=0,a=t.length;r<a;r++){const o=t[r],h=this.morphTargetsRelative;for(let c=0,d=o.count;c<d;c++)pn.fromBufferAttribute(o,c),h&&(ir.fromBufferAttribute(e,c),pn.add(ir)),s=Math.max(s,i.distanceToSquared(pn))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&Mt('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){Mt("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=t.position,s=t.normal,r=t.uv;let a=this.getAttribute("tangent");(a===void 0||a.count!==i.count)&&(a=new Nn(new Float32Array(4*i.count),4),this.setAttribute("tangent",a));const o=[],h=[];for(let b=0;b<i.count;b++)o[b]=new V,h[b]=new V;const c=new V,d=new V,f=new V,u=new tt,p=new tt,g=new tt,M=new V,x=new V;function m(b,E,C){c.fromBufferAttribute(i,b),d.fromBufferAttribute(i,E),f.fromBufferAttribute(i,C),u.fromBufferAttribute(r,b),p.fromBufferAttribute(r,E),g.fromBufferAttribute(r,C),d.sub(c),f.sub(c),p.sub(u),g.sub(u);const T=1/(p.x*g.y-g.x*p.y);isFinite(T)&&(M.copy(d).multiplyScalar(g.y).addScaledVector(f,-p.y).multiplyScalar(T),x.copy(f).multiplyScalar(p.x).addScaledVector(d,-g.x).multiplyScalar(T),o[b].add(M),o[E].add(M),o[C].add(M),h[b].add(x),h[E].add(x),h[C].add(x))}let v=this.groups;v.length===0&&(v=[{start:0,count:e.count}]);for(let b=0,E=v.length;b<E;++b){const C=v[b],T=C.start,R=C.count;for(let O=T,I=T+R;O<I;O+=3)m(e.getX(O+0),e.getX(O+1),e.getX(O+2))}const _=new V,w=new V,A=new V,y=new V;function S(b){A.fromBufferAttribute(s,b),y.copy(A);const E=o[b];_.copy(E),_.sub(A.multiplyScalar(A.dot(E))).normalize(),w.crossVectors(y,E);const T=w.dot(h[b])<0?-1:1;a.setXYZW(b,_.x,_.y,_.z,T)}for(let b=0,E=v.length;b<E;++b){const C=v[b],T=C.start,R=C.count;for(let O=T,I=T+R;O<I;O+=3)S(e.getX(O+0)),S(e.getX(O+1)),S(e.getX(O+2))}this._transformed=!0}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let i=this.getAttribute("normal");if(i===void 0||i.count!==t.count)i=new Nn(new Float32Array(t.count*3),3),this.setAttribute("normal",i);else for(let u=0,p=i.count;u<p;u++)i.setXYZ(u,0,0,0);const s=new V,r=new V,a=new V,o=new V,h=new V,c=new V,d=new V,f=new V;if(e)for(let u=0,p=e.count;u<p;u+=3){const g=e.getX(u+0),M=e.getX(u+1),x=e.getX(u+2);s.fromBufferAttribute(t,g),r.fromBufferAttribute(t,M),a.fromBufferAttribute(t,x),d.subVectors(a,r),f.subVectors(s,r),d.cross(f),o.fromBufferAttribute(i,g),h.fromBufferAttribute(i,M),c.fromBufferAttribute(i,x),o.add(d),h.add(d),c.add(d),i.setXYZ(g,o.x,o.y,o.z),i.setXYZ(M,h.x,h.y,h.z),i.setXYZ(x,c.x,c.y,c.z)}else for(let u=0,p=t.count;u<p;u+=3)s.fromBufferAttribute(t,u+0),r.fromBufferAttribute(t,u+1),a.fromBufferAttribute(t,u+2),d.subVectors(a,r),f.subVectors(s,r),d.cross(f),i.setXYZ(u+0,d.x,d.y,d.z),i.setXYZ(u+1,d.x,d.y,d.z),i.setXYZ(u+2,d.x,d.y,d.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,i=e.count;t<i;t++)pn.fromBufferAttribute(e,t),pn.normalize(),e.setXYZ(t,pn.x,pn.y,pn.z)}toNonIndexed(){function e(o,h){const c=o.array,d=o.itemSize,f=o.normalized,u=new c.constructor(h.length*d);let p=0,g=0;for(let M=0,x=h.length;M<x;M++){o.isInterleavedBufferAttribute?p=h[M]*o.data.stride+o.offset:p=h[M]*d;for(let m=0;m<d;m++)u[g++]=c[p++]}return new Nn(u,d,f)}if(this.index===null)return et("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new Qt,i=this.index.array,s=this.attributes;for(const o in s){const h=s[o],c=e(h,i);t.setAttribute(o,c)}const r=this.morphAttributes;for(const o in r){const h=[],c=r[o];for(let d=0,f=c.length;d<f;d++){const u=c[d],p=e(u,i);h.push(p)}t.morphAttributes[o]=h}t.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,h=a.length;o<h;o++){const c=a[o];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,e.name=this.name,Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){const h=this.parameters;for(const c in h)h[c]!==void 0&&(e[c]=h[c]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const i=this.attributes;for(const h in i){const c=i[h];e.data.attributes[h]=c.toJSON(e.data)}const s={};let r=!1;for(const h in this.morphAttributes){const c=this.morphAttributes[h],d=[];for(let f=0,u=c.length;f<u;f++){const p=c[f];d.push(p.toJSON(e.data))}d.length>0&&(s[h]=d,r=!0)}r&&(e.data.morphAttributes=s,e.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const i=e.index;i!==null&&this.setIndex(i.clone());const s=e.attributes;for(const c in s){const d=s[c];this.setAttribute(c,d.clone(t))}const r=e.morphAttributes;for(const c in r){const d=[],f=r[c];for(let u=0,p=f.length;u<p;u++)d.push(f[u].clone(t));this.morphAttributes[c]=d}this.morphTargetsRelative=e.morphTargetsRelative;const a=e.groups;for(let c=0,d=a.length;c<d;c++){const f=a[c];this.addGroup(f.start,f.count,f.materialIndex)}const o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());const h=e.boundingSphere;return h!==null&&(this.boundingSphere=h.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Sl=new V,rv=new V,av=new nt;class ls{constructor(e=new V(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,i,s){return this.normal.set(e,t,i),this.constant=s,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,i){const s=Sl.subVectors(i,t).cross(rv.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(s,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,i=!0){const s=e.delta(Sl),r=this.normal.dot(s);if(r===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const a=-(e.start.dot(this.normal)+this.constant)/r;return i===!0&&(a<0||a>1)?null:t.copy(e.start).addScaledVector(s,a)}intersectsLine(e){const t=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return t<0&&i>0||i<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const i=t||av.getNormalMatrix(e),s=this.coplanarPoint(Sl).applyMatrix4(e),r=this.normal.applyMatrix3(i).normalize();return this.constant=-s.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(e){return this.normal.fromArray(e.normal),this.constant=e.constant,this}}let ov=0;class Ir extends Vs{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:ov++}),this.uuid=da(),this.name="",this.type="Material",this.blending=mr,this.side=ks,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=vh,this.blendDst=bh,this.blendEquation=hr,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new ht(0,0,0),this.blendAlpha=0,this.depthFunc=ia,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=LM,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=sl,this.stencilZFail=sl,this.stencilZPass=sl,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const i=e[t];if(i===void 0){et(`Material: parameter '${t}' has value of undefined.`);continue}const s=this[t];if(s===void 0){et(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(i):s&&s.isVector2&&i&&i.isVector2||s&&s.isEuler&&i&&i.isEuler||s&&s.isVector3&&i&&i.isVector3?s.copy(i):this[t]=i}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const i={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,i.blending=this.blending,i.side=this.side,i.shadowSide=this.shadowSide,i.vertexColors=this.vertexColors,i.opacity=this.opacity,i.transparent=this.transparent,i.blendSrc=this.blendSrc,i.blendDst=this.blendDst,i.blendEquation=this.blendEquation,i.blendSrcAlpha=this.blendSrcAlpha,i.blendDstAlpha=this.blendDstAlpha,i.blendEquationAlpha=this.blendEquationAlpha,i.blendColor=this.blendColor.getHex(),i.blendAlpha=this.blendAlpha,i.depthFunc=this.depthFunc,i.depthTest=this.depthTest,i.depthWrite=this.depthWrite,i.colorWrite=this.colorWrite,i.clipIntersection=this.clipIntersection,i.clipShadows=this.clipShadows,i.stencilWriteMask=this.stencilWriteMask,i.stencilFunc=this.stencilFunc,i.stencilRef=this.stencilRef,i.stencilFuncMask=this.stencilFuncMask,i.stencilFail=this.stencilFail,i.stencilZFail=this.stencilZFail,i.stencilZPass=this.stencilZPass,i.stencilWrite=this.stencilWrite,i.polygonOffset=this.polygonOffset,i.polygonOffsetFactor=this.polygonOffsetFactor,i.polygonOffsetUnits=this.polygonOffsetUnits,i.dithering=this.dithering,i.alphaTest=this.alphaTest,i.alphaHash=this.alphaHash,i.alphaToCoverage=this.alphaToCoverage,i.premultipliedAlpha=this.premultipliedAlpha,i.forceSinglePass=this.forceSinglePass,i.allowOverride=this.allowOverride,i.visible=this.visible,i.toneMapped=this.toneMapped,i.name=this.name,this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(i.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(i.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(i.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(i.clippingPlanes=this.clippingPlanes.map(r=>r.toJSON())),this.rotation!==void 0&&(i.rotation=this.rotation),this.depthPacking!==void 0&&(i.depthPacking=this.depthPacking),this.linewidth!==void 0&&(i.linewidth=this.linewidth),this.linecap!==void 0&&(i.linecap=this.linecap),this.linejoin!==void 0&&(i.linejoin=this.linejoin),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.wireframe!==void 0&&(i.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(i.flatShading=this.flatShading),this.fog!==void 0&&(i.fog=this.fog),Object.keys(this.userData).length>0&&(i.userData=this.userData);function s(r){const a=[];for(const o in r){const h=r[o];delete h.metadata,a.push(h)}return a}if(t){const r=s(e.textures),a=s(e.images);r.length>0&&(i.textures=r),a.length>0&&(i.images=a)}return i}fromJSON(e,t){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new ht().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.retroreflectivity!==void 0&&(this.retroreflectivity=e.retroreflectivity),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=e.iridescenceThicknessRange),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.clippingPlanes!==void 0&&(this.clippingPlanes=e.clippingPlanes.map(i=>new ls().fromJSON(i))),e.clipIntersection!==void 0&&(this.clipIntersection=e.clipIntersection),e.clipShadows!==void 0&&(this.clipShadows=e.clipShadows),e.depthPacking!==void 0&&(this.depthPacking=e.depthPacking),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.linecap!==void 0&&(this.linecap=e.linecap),e.linejoin!==void 0&&(this.linejoin=e.linejoin),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(typeof e.vertexColors=="number"?this.vertexColors=e.vertexColors>0:this.vertexColors=e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=t[e.map]||null),e.matcap!==void 0&&(this.matcap=t[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=t[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=t[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=t[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let i=e.normalScale;Array.isArray(i)===!1&&(i=[i,i]),this.normalScale=new tt().fromArray(i)}return e.displacementMap!==void 0&&(this.displacementMap=t[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=t[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=t[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=t[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=t[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=t[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=t[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=t[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=t[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=t[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=t[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=t[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=t[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=t[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new tt().fromArray(e.clearcoatNormalScale)),e.iridescenceMap!==void 0&&(this.iridescenceMap=t[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=t[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=t[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=t[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=t[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=t[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=t[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let i=null;if(t!==null){const s=t.length;i=new Array(s);for(let r=0;r!==s;++r)i[r]=t[r].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}const Wi=new V,El=new V,La=new V,Pa=new V;class Ph{constructor(e=new V,t=new V(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Wi)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const i=t.dot(this.direction);return i<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=Wi.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Wi.copy(this.origin).addScaledVector(this.direction,t),Wi.distanceToSquared(e))}distanceSqToSegment(e,t,i,s){El.copy(e).add(t).multiplyScalar(.5),La.copy(t).sub(e).normalize(),Pa.copy(this.origin).sub(El);const r=e.distanceTo(t)*.5,a=-this.direction.dot(La),o=Pa.dot(this.direction),h=-Pa.dot(La),c=Pa.lengthSq(),d=Math.abs(1-a*a);let f,u,p,g;if(d>0)if(f=a*h-o,u=a*o-h,g=r*d,f>=0)if(u>=-g)if(u<=g){const M=1/d;f*=M,u*=M,p=f*(f+a*u+2*o)+u*(a*f+u+2*h)+c}else u=r,f=Math.max(0,-(a*u+o)),p=-f*f+u*(u+2*h)+c;else u=-r,f=Math.max(0,-(a*u+o)),p=-f*f+u*(u+2*h)+c;else u<=-g?(f=Math.max(0,-(-a*r+o)),u=f>0?-r:Math.min(Math.max(-r,-h),r),p=-f*f+u*(u+2*h)+c):u<=g?(f=0,u=Math.min(Math.max(-r,-h),r),p=u*(u+2*h)+c):(f=Math.max(0,-(a*r+o)),u=f>0?r:Math.min(Math.max(-r,-h),r),p=-f*f+u*(u+2*h)+c);else u=a>0?-r:r,f=Math.max(0,-(a*u+o)),p=-f*f+u*(u+2*h)+c;return i&&i.copy(this.origin).addScaledVector(this.direction,f),s&&s.copy(El).addScaledVector(La,u),p}intersectSphere(e,t){if(e.radius<0)return null;Wi.subVectors(e.center,this.origin);const i=Wi.dot(this.direction),s=Wi.dot(Wi)-i*i,r=e.radius*e.radius;if(s>r)return null;const a=Math.sqrt(r-s),o=i-a,h=i+a;return h<0?null:o<0?this.at(h,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(e.normal)+e.constant)/t;return i>=0?i:null}intersectPlane(e,t){const i=this.distanceToPlane(e);return i===null?null:this.at(i,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let i,s,r,a,o,h;const c=1/this.direction.x,d=1/this.direction.y,f=1/this.direction.z,u=this.origin;return c>=0?(i=(e.min.x-u.x)*c,s=(e.max.x-u.x)*c):(i=(e.max.x-u.x)*c,s=(e.min.x-u.x)*c),d>=0?(r=(e.min.y-u.y)*d,a=(e.max.y-u.y)*d):(r=(e.max.y-u.y)*d,a=(e.min.y-u.y)*d),i>a||r>s||((r>i||isNaN(i))&&(i=r),(a<s||isNaN(s))&&(s=a),f>=0?(o=(e.min.z-u.z)*f,h=(e.max.z-u.z)*f):(o=(e.max.z-u.z)*f,h=(e.min.z-u.z)*f),i>h||o>s)||((o>i||i!==i)&&(i=o),(h<s||s!==s)&&(s=h),s<0)?null:this.at(i>=0?i:s,t)}intersectsBox(e){return this.intersectBox(e,Wi)!==null}intersectTriangle(e,t,i,s,r){const a=this.origin,o=this.direction,h=o.x,c=o.y,d=o.z,f=e.x-a.x,u=e.y-a.y,p=e.z-a.z,g=t.x-a.x,M=t.y-a.y,x=t.z-a.z,m=i.x-a.x,v=i.y-a.y,_=i.z-a.z,w=Math.abs(h),A=Math.abs(c),y=Math.abs(d);let S,b,E,C,T,R,O,I,k,U,W,ne;if(w>=A&&w>=y?(E=h,R=f,k=g,ne=m,h>=0?(S=c,b=d,C=u,T=p,O=M,I=x,U=v,W=_):(S=d,b=c,C=p,T=u,O=x,I=M,U=_,W=v)):A>=y?(E=c,R=u,k=M,ne=v,c>=0?(S=d,b=h,C=p,T=f,O=x,I=g,U=_,W=m):(S=h,b=d,C=f,T=p,O=g,I=x,U=m,W=_)):(E=d,R=p,k=x,ne=_,d>=0?(S=h,b=c,C=f,T=u,O=g,I=M,U=m,W=v):(S=c,b=h,C=u,T=f,O=M,I=g,U=v,W=m)),E===0)return null;const K=S/E,re=b/E,N=1/E,te=C-K*R,ae=T-re*R,pe=O-K*k,be=I-re*k,Pe=U-K*ne,q=W-re*ne,ee=Pe*be-q*pe,B=te*q-ae*Pe,ce=pe*ae-be*te;if(s){if(ee<0||B<0||ce<0)return null}else if((ee<0||B<0||ce<0)&&(ee>0||B>0||ce>0))return null;const H=ee+B+ce;if(H===0)return null;const Z=N*(ee*R+B*k+ce*ne);return(H>0?Z<0:Z>0)?null:this.at(Z/H,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Xf extends Ir{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new ht(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new zs,this.combine=Ef,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const Gu=new kt,bs=new Ph,Da=new Ys,Hu=new V,Ia=new V,Oa=new V,Na=new V,Al=new V,Fa=new V,Wu=new V,ka=new V;class Yt extends On{constructor(e=new Qt,t=new Xf){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const s=t[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(e,t){const i=this.geometry,s=i.attributes.position,r=i.morphAttributes.position,a=i.morphTargetsRelative;t.fromBufferAttribute(s,e);const o=this.morphTargetInfluences;if(r&&o){Fa.set(0,0,0);for(let h=0,c=r.length;h<c;h++){const d=o[h],f=r[h];d!==0&&(Al.fromBufferAttribute(f,e),a?Fa.addScaledVector(Al,d):Fa.addScaledVector(Al.sub(t),d))}t.add(Fa)}return t}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){const i=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),Da.copy(i.boundingSphere),Da.applyMatrix4(r),bs.copy(e.ray).recast(e.near),!(Da.containsPoint(bs.origin)===!1&&(bs.intersectSphere(Da,Hu)===null||bs.origin.distanceToSquared(Hu)>(e.far-e.near)**2))&&(Gu.copy(r).invert(),bs.copy(e.ray).applyMatrix4(Gu),!(i.boundingBox!==null&&bs.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,t,bs)))}_computeIntersections(e,t,i){let s;const r=this.geometry,a=this.material,o=r.index,h=r.attributes.position,c=r.attributes.uv,d=r.attributes.uv1,f=r.attributes.normal,u=r.groups,p=r.drawRange;if(o!==null)if(Array.isArray(a))for(let g=0,M=u.length;g<M;g++){const x=u[g],m=a[x.materialIndex],v=Math.max(x.start,p.start),_=Math.min(o.count,Math.min(x.start+x.count,p.start+p.count));for(let w=v,A=_;w<A;w+=3){const y=o.getX(w),S=o.getX(w+1),b=o.getX(w+2);s=Ua(this,m,e,i,c,d,f,y,S,b),s&&(s.faceIndex=Math.floor(w/3),s.face.materialIndex=x.materialIndex,t.push(s))}}else{const g=Math.max(0,p.start),M=Math.min(o.count,p.start+p.count);for(let x=g,m=M;x<m;x+=3){const v=o.getX(x),_=o.getX(x+1),w=o.getX(x+2);s=Ua(this,a,e,i,c,d,f,v,_,w),s&&(s.faceIndex=Math.floor(x/3),t.push(s))}}else if(h!==void 0)if(Array.isArray(a))for(let g=0,M=u.length;g<M;g++){const x=u[g],m=a[x.materialIndex],v=Math.max(x.start,p.start),_=Math.min(h.count,Math.min(x.start+x.count,p.start+p.count));for(let w=v,A=_;w<A;w+=3){const y=w,S=w+1,b=w+2;s=Ua(this,m,e,i,c,d,f,y,S,b),s&&(s.faceIndex=Math.floor(w/3),s.face.materialIndex=x.materialIndex,t.push(s))}}else{const g=Math.max(0,p.start),M=Math.min(h.count,p.start+p.count);for(let x=g,m=M;x<m;x+=3){const v=x,_=x+1,w=x+2;s=Ua(this,a,e,i,c,d,f,v,_,w),s&&(s.faceIndex=Math.floor(x/3),t.push(s))}}}}function lv(n,e,t,i,s,r,a,o){let h;if(e.side===Hn?h=i.intersectTriangle(a,r,s,!0,o):h=i.intersectTriangle(s,r,a,e.side===ks,o),h===null)return null;ka.copy(o),ka.applyMatrix4(n.matrixWorld);const c=t.ray.origin.distanceTo(ka);return c<t.near||c>t.far?null:{distance:c,point:ka.clone(),object:n}}function Ua(n,e,t,i,s,r,a,o,h,c){n.getVertexPosition(o,Ia),n.getVertexPosition(h,Oa),n.getVertexPosition(c,Na);const d=lv(n,e,t,i,Ia,Oa,Na,Wu);if(d){const f=new V;di.getBarycoord(Wu,Ia,Oa,Na,f),s&&(d.uv=di.getInterpolatedAttribute(s,o,h,c,f,new tt)),r&&(d.uv1=di.getInterpolatedAttribute(r,o,h,c,f,new tt)),a&&(d.normal=di.getInterpolatedAttribute(a,o,h,c,f,new V),d.normal.dot(i.direction)>0&&d.normal.multiplyScalar(-1));const u={a:o,b:h,c,normal:new V,materialIndex:0};di.getNormal(Ia,Oa,Na,u.normal),d.face=u,d.barycoord=f}return d}class hs extends Rn{constructor(e=null,t=1,i=1,s,r,a,o,h,c=Ht,d=Ht,f,u){super(null,a,o,h,c,d,s,r,f,u),this.isDataTexture=!0,this.image={data:e,width:t,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Gs extends Nn{constructor(e,t,i,s=1){super(e,t,i),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const sr=new kt,Vu=new kt,Ba=[],Yu=new gs,cv=new kt,Yr=new Yt,Xr=new Ys;class Xu extends Yt{constructor(e,t,i){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new Gs(new Float32Array(i*16),16),this.instanceColor=null,this.morphTexture=null,this.count=i,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<i;s++)this.setMatrixAt(s,cv)}computeBoundingBox(){const e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new gs),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let i=0;i<t;i++)this.getMatrixAt(i,sr),Yu.copy(e.boundingBox).applyMatrix4(sr),this.boundingBox.union(Yu)}computeBoundingSphere(){const e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new Ys),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let i=0;i<t;i++)this.getMatrixAt(i,sr),Xr.copy(e.boundingSphere).applyMatrix4(sr),this.boundingSphere.union(Xr)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){return this.instanceColor===null?t.setRGB(1,1,1):t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){return t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){const i=t.morphTargetInfluences,s=this.morphTexture.source.data.data,r=i.length+1,a=e*r+1;for(let o=0;o<i.length;o++)i[o]=s[a+o]}raycast(e,t){const i=this.matrixWorld,s=this.count;if(Yr.geometry=this.geometry,Yr.material=this.material,Yr.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Xr.copy(this.boundingSphere),Xr.applyMatrix4(i),e.ray.intersectsSphere(Xr)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,sr),Vu.multiplyMatrices(i,sr),Yr.matrixWorld=Vu,Yr.raycast(e,Ba);for(let a=0,o=Ba.length;a<o;a++){const h=Ba[a];h.instanceId=r,h.object=this,t.push(h)}Ba.length=0}}setColorAt(e,t){return this.instanceColor===null&&(this.instanceColor=new Gs(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3),this}setMatrixAt(e,t){return t.toArray(this.instanceMatrix.array,e*16),this}setMorphAt(e,t){const i=t.morphTargetInfluences,s=i.length+1;this.morphTexture===null&&(this.morphTexture=new hs(new Float32Array(s*this.count),s,this.count,Sh,fi));const r=this.morphTexture.source.data.data;let a=0;for(let c=0;c<i.length;c++)a+=i[c];const o=this.geometry.morphTargetsRelative?1:1-a,h=s*e;return r[h]=o,r.set(i,h+1),this}updateMorphTargets(){}dispose(){super.dispose(),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}}const ys=new Ys,hv=new tt(.5,.5),za=new V;class Eo{constructor(e=new ls,t=new ls,i=new ls,s=new ls,r=new ls,a=new ls){this.planes=[e,t,i,s,r,a]}set(e,t,i,s,r,a){const o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(i),o[3].copy(s),o[4].copy(r),o[5].copy(a),this}copy(e){const t=this.planes;for(let i=0;i<6;i++)t[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,t=Ci,i=!1){const s=this.planes,r=e.elements,a=r[0],o=r[1],h=r[2],c=r[3],d=r[4],f=r[5],u=r[6],p=r[7],g=r[8],M=r[9],x=r[10],m=r[11],v=r[12],_=r[13],w=r[14],A=r[15];if(s[0].setComponents(c-a,p-d,m-g,A-v).normalize(),s[1].setComponents(c+a,p+d,m+g,A+v).normalize(),s[2].setComponents(c+o,p+f,m+M,A+_).normalize(),s[3].setComponents(c-o,p-f,m-M,A-_).normalize(),i)s[4].setComponents(h,u,x,w).normalize(),s[5].setComponents(c-h,p-u,m-x,A-w).normalize();else if(s[4].setComponents(c-h,p-u,m-x,A-w).normalize(),t===Ci)s[5].setComponents(c+h,p+u,m+x,A+w).normalize();else if(t===wo)s[5].setComponents(h,u,x,w).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),ys.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),ys.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(ys)}intersectsSprite(e){ys.center.set(0,0,0);const t=hv.distanceTo(e.center);return ys.radius=.7071067811865476+t,ys.applyMatrix4(e.matrixWorld),this.intersectsSphere(ys)}intersectsSphere(e){const t=this.planes,i=e.center,s=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(i)<s)return!1;return!0}intersectsBox(e){const t=this.planes;for(let i=0;i<6;i++){const s=t[i];if(za.x=s.normal.x>0?e.max.x:e.min.x,za.y=s.normal.y>0?e.max.y:e.min.y,za.z=s.normal.z>0?e.max.z:e.min.z,s.distanceToPoint(za)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let i=0;i<6;i++)if(t[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class Kf extends Ir{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new ht(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const Ao=new V,To=new V,Ku=new kt,Kr=new Ph,Ga=new Ys,Tl=new V,qu=new V;class uv extends On{constructor(e=new Qt,t=new Kf){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,i=[0];for(let s=1,r=t.count;s<r;s++)Ao.fromBufferAttribute(t,s-1),To.fromBufferAttribute(t,s),i[s]=i[s-1],i[s]+=Ao.distanceTo(To);e.setAttribute("lineDistance",new St(i,1))}else et("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){const i=this.geometry,s=this.matrixWorld,r=e.params.Line.threshold,a=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),Ga.copy(i.boundingSphere),Ga.applyMatrix4(s),Ga.radius+=r,e.ray.intersectsSphere(Ga)===!1)return;Ku.copy(s).invert(),Kr.copy(e.ray).applyMatrix4(Ku);const o=r/((this.scale.x+this.scale.y+this.scale.z)/3),h=o*o,c=this.isLineSegments?2:1,d=i.index,u=i.attributes.position;if(d!==null){const p=Math.max(0,a.start),g=Math.min(d.count,a.start+a.count);for(let M=p,x=g-1;M<x;M+=c){const m=d.getX(M),v=d.getX(M+1),_=Ha(this,e,Kr,h,m,v,M);_&&t.push(_)}if(this.isLineLoop){const M=d.getX(g-1),x=d.getX(p),m=Ha(this,e,Kr,h,M,x,g-1);m&&t.push(m)}}else{const p=Math.max(0,a.start),g=Math.min(u.count,a.start+a.count);for(let M=p,x=g-1;M<x;M+=c){const m=Ha(this,e,Kr,h,M,M+1,M);m&&t.push(m)}if(this.isLineLoop){const M=Ha(this,e,Kr,h,g-1,p,g-1);M&&t.push(M)}}}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const s=t[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}}function Ha(n,e,t,i,s,r,a){const o=n.geometry.attributes.position;if(Ao.fromBufferAttribute(o,s),To.fromBufferAttribute(o,r),t.distanceSqToSegment(Ao,To,Tl,qu)>i)return;Tl.applyMatrix4(n.matrixWorld);const c=e.ray.origin.distanceTo(Tl);if(!(c<e.near||c>e.far))return{distance:c,point:qu.clone().applyMatrix4(n.matrixWorld),index:a,face:null,faceIndex:null,barycoord:null,object:n}}const $u=new V,Zu=new V;class Dh extends uv{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,i=[];for(let s=0,r=t.count;s<r;s+=2)$u.fromBufferAttribute(t,s),Zu.fromBufferAttribute(t,s+1),i[s]=s===0?0:i[s-1],i[s+1]=i[s]+$u.distanceTo(Zu);e.setAttribute("lineDistance",new St(i,1))}else et("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class qf extends Ir{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new ht(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const Ju=new kt,Xc=new Ph,Wa=new Ys,Va=new V;class oa extends On{constructor(e=new Qt,t=new qf){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){const i=this.geometry,s=this.matrixWorld,r=e.params.Points.threshold,a=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),Wa.copy(i.boundingSphere),Wa.applyMatrix4(s),Wa.radius+=r,e.ray.intersectsSphere(Wa)===!1)return;Ju.copy(s).invert(),Xc.copy(e.ray).applyMatrix4(Ju);const o=r/((this.scale.x+this.scale.y+this.scale.z)/3),h=o*o,c=i.index,f=i.attributes.position;if(c!==null){const u=Math.max(0,a.start),p=Math.min(c.count,a.start+a.count);for(let g=u,M=p;g<M;g++){const x=c.getX(g);Va.fromBufferAttribute(f,x),Qu(Va,x,h,s,e,t,this)}}else{const u=Math.max(0,a.start),p=Math.min(f.count,a.start+a.count);for(let g=u,M=p;g<M;g++)Va.fromBufferAttribute(f,g),Qu(Va,g,h,s,e,t,this)}}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const s=t[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}}function Qu(n,e,t,i,s,r,a){const o=Xc.distanceSqToPoint(n);if(o<t){const h=new V;Xc.closestPointToPoint(n,h),h.applyMatrix4(i);const c=s.ray.origin.distanceTo(h);if(c<s.near||c>s.far)return;r.push({distance:c,distanceToRay:Math.sqrt(o),point:h,index:e,face:null,faceIndex:null,barycoord:null,object:a})}}class $f extends Rn{constructor(e=[],t=Us,i,s,r,a,o,h,c,d){super(e,t,i,s,r,a,o,h,c,d),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class Ro extends Rn{constructor(e,t,i,s,r,a,o,h,c){super(e,t,i,s,r,a,o,h,c),this.isCanvasTexture=!0,this.needsUpdate=!0}}class Er extends Rn{constructor(e,t,i=Oi,s,r,a,o=Ht,h=Ht,c,d=Ki,f=1){if(d!==Ki&&d!==Ps)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const u={width:e,height:t,depth:f};super(u,s,r,a,o,h,d,i,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new Lh(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return t.compareFunction=this.compareFunction,t}}class dv extends Er{constructor(e,t=Oi,i=Us,s,r,a=Ht,o=Ht,h,c=Ki){const d={width:e,height:e,depth:1},f=[d,d,d,d,d,d];super(e,e,t,i,s,r,a,o,h,c),this.image=f,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}}class Zf extends Rn{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}}class fa extends Qt{constructor(e=1,t=1,i=1,s=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:i,widthSegments:s,heightSegments:r,depthSegments:a};const o=this;s=Math.floor(s),r=Math.floor(r),a=Math.floor(a);const h=[],c=[],d=[],f=[];let u=0,p=0;g("z","y","x",-1,-1,i,t,e,a,r,0),g("z","y","x",1,-1,i,t,-e,a,r,1),g("x","z","y",1,1,e,i,t,s,a,2),g("x","z","y",1,-1,e,i,-t,s,a,3),g("x","y","z",1,-1,e,t,i,s,r,4),g("x","y","z",-1,-1,e,t,-i,s,r,5),this.setIndex(h),this.setAttribute("position",new St(c,3)),this.setAttribute("normal",new St(d,3)),this.setAttribute("uv",new St(f,2));function g(M,x,m,v,_,w,A,y,S,b,E){const C=w/S,T=A/b,R=w/2,O=A/2,I=y/2,k=S+1,U=b+1;let W=0,ne=0;const K=new V;for(let re=0;re<U;re++){const N=re*T-O;for(let te=0;te<k;te++){const ae=te*C-R;K[M]=ae*v,K[x]=N*_,K[m]=I,c.push(K.x,K.y,K.z),K[M]=0,K[x]=0,K[m]=y>0?1:-1,d.push(K.x,K.y,K.z),f.push(te/S),f.push(1-re/b),W+=1}}for(let re=0;re<b;re++)for(let N=0;N<S;N++){const te=u+N+k*re,ae=u+N+k*(re+1),pe=u+(N+1)+k*(re+1),be=u+(N+1)+k*re;h.push(te,ae,be),h.push(ae,pe,be),ne+=6}o.addGroup(p,ne,E),p+=ne,u+=W}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new fa(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}class Co extends Qt{constructor(e=1,t=1,i=1,s=32,r=1,a=!1,o=0,h=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:i,radialSegments:s,heightSegments:r,openEnded:a,thetaStart:o,thetaLength:h};const c=this;s=Math.floor(s),r=Math.floor(r);const d=[],f=[],u=[],p=[];let g=0;const M=[],x=i/2;let m=0;v(),a===!1&&(e>0&&_(!0),t>0&&_(!1)),this.setIndex(d),this.setAttribute("position",new St(f,3)),this.setAttribute("normal",new St(u,3)),this.setAttribute("uv",new St(p,2));function v(){const w=new V,A=new V;let y=0;const S=(t-e)/i;for(let b=0;b<=r;b++){const E=[],C=b/r,T=C*(t-e)+e;for(let R=0;R<=s;R++){const O=R/s,I=O*h+o,k=Math.sin(I),U=Math.cos(I);A.x=T*k,A.y=-C*i+x,A.z=T*U,f.push(A.x,A.y,A.z),w.set(k,S,U).normalize(),u.push(w.x,w.y,w.z),p.push(O,1-C),E.push(g++)}M.push(E)}for(let b=0;b<s;b++)for(let E=0;E<r;E++){const C=M[E][b],T=M[E+1][b],R=M[E+1][b+1],O=M[E][b+1];(e>0||E!==0)&&(d.push(C,T,O),y+=3),(t>0||E!==r-1)&&(d.push(T,R,O),y+=3)}c.addGroup(m,y,0),m+=y}function _(w){const A=g,y=new tt,S=new V;let b=0;const E=w===!0?e:t,C=w===!0?1:-1;for(let R=1;R<=s;R++)f.push(0,x*C,0),u.push(0,C,0),p.push(.5,.5),g++;const T=g;for(let R=0;R<=s;R++){const I=R/s*h+o,k=Math.cos(I),U=Math.sin(I);S.x=E*U,S.y=x*C,S.z=E*k,f.push(S.x,S.y,S.z),u.push(0,C,0),y.x=k*.5+.5,y.y=U*.5*C+.5,p.push(y.x,y.y),g++}for(let R=0;R<s;R++){const O=A+R,I=T+R;w===!0?d.push(I,I+1,O):d.push(I+1,I,O),b+=3}c.addGroup(m,b,w===!0?1:2),m+=b}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Co(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class Zn extends Qt{constructor(e=1,t=1,i=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:i,heightSegments:s};const r=e/2,a=t/2,o=Math.floor(i),h=Math.floor(s),c=o+1,d=h+1,f=e/o,u=t/h,p=[],g=[],M=[],x=[];for(let m=0;m<d;m++){const v=m*u-a;for(let _=0;_<c;_++){const w=_*f-r;g.push(w,-v,0),M.push(0,0,1),x.push(_/o),x.push(1-m/h)}}for(let m=0;m<h;m++)for(let v=0;v<o;v++){const _=v+c*m,w=v+c*(m+1),A=v+1+c*(m+1),y=v+1+c*m;p.push(_,w,y),p.push(w,A,y)}this.setIndex(p),this.setAttribute("position",new St(g,3)),this.setAttribute("normal",new St(M,3)),this.setAttribute("uv",new St(x,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Zn(e.width,e.height,e.widthSegments,e.heightSegments)}}function Ar(n){const e={};for(const t in n){e[t]={};for(const i in n[t]){const s=n[t][i];if(ju(s))s.isRenderTargetTexture?(et("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][i]=null):e[t][i]=s.clone();else if(Array.isArray(s))if(ju(s[0])){const r=[];for(let a=0,o=s.length;a<o;a++)r[a]=s[a].clone();e[t][i]=r}else e[t][i]=s.slice();else e[t][i]=s}}return e}function Ln(n){const e={};for(let t=0;t<n.length;t++){const i=Ar(n[t]);for(const s in i)e[s]=i[s]}return e}function ju(n){return n&&(n.isColor||n.isMatrix3||n.isMatrix4||n.isVector2||n.isVector3||n.isVector4||n.isTexture||n.isQuaternion)}function fv(n){const e=[];for(let t=0;t<n.length;t++)e.push(n[t].clone());return e}function Jf(n){const e=n.getRenderTarget();return e===null?n.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:ft.workingColorSpace}const pv={clone:Ar,merge:Ln};var mv=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,gv=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class xt extends Ir{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=mv,this.fragmentShader=gv,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Ar(e.uniforms),this.uniformsGroups=fv(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const s in this.uniforms){const a=this.uniforms[s].value;a&&a.isTexture?t.uniforms[s]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[s]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[s]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[s]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[s]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[s]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[s]={type:"m4",value:a.toArray()}:t.uniforms[s]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const i={};for(const s in this.extensions)this.extensions[s]===!0&&(i[s]=!0);return Object.keys(i).length>0&&(t.extensions=i),t}fromJSON(e,t){if(super.fromJSON(e,t),e.uniforms!==void 0)for(const i in e.uniforms){const s=e.uniforms[i];switch(this.uniforms[i]={},s.type){case"t":this.uniforms[i].value=t[s.value]||null;break;case"c":this.uniforms[i].value=new ht().setHex(s.value);break;case"v2":this.uniforms[i].value=new tt().fromArray(s.value);break;case"v3":this.uniforms[i].value=new V().fromArray(s.value);break;case"v4":this.uniforms[i].value=new at().fromArray(s.value);break;case"m3":this.uniforms[i].value=new nt().fromArray(s.value);break;case"m4":this.uniforms[i].value=new kt().fromArray(s.value);break;default:this.uniforms[i].value=s.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(const i in e.extensions)this.extensions[i]=e.extensions[i];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}}class xv extends xt{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class Mv extends Ir{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=RM,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class vv extends Ir{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const Ya=new V,Xa=new Dr,yi=new V;class Qf extends On{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new kt,this.projectionMatrix=new kt,this.projectionMatrixInverse=new kt,this.coordinateSystem=Ci,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(Ya,Xa,yi),yi.x===1&&yi.y===1&&yi.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Ya,Xa,yi.set(1,1,1)).invert()}updateWorldMatrix(e,t,i=!1){super.updateWorldMatrix(e,t,i),this.matrixWorld.decompose(Ya,Xa,yi),yi.x===1&&yi.y===1&&yi.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Ya,Xa,yi.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}const ss=new V,ed=new tt,td=new tt;class Xn extends Qf{constructor(e=50,t=1,i=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=s,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=Yc*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(rl*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Yc*2*Math.atan(Math.tan(rl*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,i){ss.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(ss.x,ss.y).multiplyScalar(-e/ss.z),ss.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(ss.x,ss.y).multiplyScalar(-e/ss.z)}getViewSize(e,t){return this.getViewBounds(e,ed,td),t.subVectors(td,ed)}setViewOffset(e,t,i,s,r,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(rl*.5*this.fov)/this.zoom,i=2*t,s=this.aspect*i,r=-.5*s;const a=this.view;if(this.view!==null&&this.view.enabled){const h=a.fullWidth,c=a.fullHeight;r+=a.offsetX*s/h,t-=a.offsetY*i/c,s*=a.width/h,i*=a.height/c}const o=this.filmOffset;o!==0&&(r+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,t,t-i,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}class Ih extends Qf{constructor(e=-1,t=1,i=1,s=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=i,this.bottom=s,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,i,s,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=i-e,a=i+e,o=s+t,h=s-t;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,d=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,a=r+c*this.view.width,o-=d*this.view.offsetY,h=o-d*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,h,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}class Oh extends Qt{constructor(){super(),this.isInstancedBufferGeometry=!0,this.type="InstancedBufferGeometry",this.instanceCount=1/0}copy(e){return super.copy(e),this.instanceCount=e.instanceCount,this}toJSON(){const e=super.toJSON();return e.instanceCount=this.instanceCount,e.isInstancedBufferGeometry=!0,e}}const rr=-90,ar=1;class bv extends On{constructor(e,t,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new Xn(rr,ar,e,t);s.layers=this.layers,this.add(s);const r=new Xn(rr,ar,e,t);r.layers=this.layers,this.add(r);const a=new Xn(rr,ar,e,t);a.layers=this.layers,this.add(a);const o=new Xn(rr,ar,e,t);o.layers=this.layers,this.add(o);const h=new Xn(rr,ar,e,t);h.layers=this.layers,this.add(h);const c=new Xn(rr,ar,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[i,s,r,a,o,h]=t;for(const c of t)this.remove(c);if(e===Ci)i.up.set(0,1,0),i.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),h.up.set(0,1,0),h.lookAt(0,0,-1);else if(e===wo)i.up.set(0,-1,0),i.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),h.up.set(0,-1,0),h.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:s}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[r,a,o,h,c,d]=this.children,f=e.getRenderTarget(),u=e.getActiveCubeFace(),p=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;const M=i.texture.generateMipmaps;i.texture.generateMipmaps=!1;let x=!1;e.isWebGLRenderer===!0?x=e.state.buffers.depth.getReversed():x=e.reversedDepthBuffer,e.setRenderTarget(i,0,s),x&&e.autoClear===!1&&e.clearDepth(),e.render(t,r),e.setRenderTarget(i,1,s),x&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(i,2,s),x&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(i,3,s),x&&e.autoClear===!1&&e.clearDepth(),e.render(t,h),e.setRenderTarget(i,4,s),x&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),i.texture.generateMipmaps=M,e.setRenderTarget(i,5,s),x&&e.autoClear===!1&&e.clearDepth(),e.render(t,d),e.setRenderTarget(f,u,p),e.xr.enabled=g,i.texture.needsPMREMUpdate=!0}}class yv extends Xn{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}class jf{static{jf.prototype.isMatrix2=!0}constructor(e,t,i,s){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,i,s)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let i=0;i<4;i++)this.elements[i]=e[i+t];return this}set(e,t,i,s){const r=this.elements;return r[0]=e,r[2]=t,r[1]=i,r[3]=s,this}}function nd(n,e,t,i){const s=_v(i);switch(t){case Uf:return n*e;case Sh:return n*e/s.components*s.byteLength;case Eh:return n*e/s.components*s.byteLength;case Bs:return n*e*2/s.components*s.byteLength;case Ah:return n*e*2/s.components*s.byteLength;case Bf:return n*e*3/s.components*s.byteLength;case qn:return n*e*4/s.components*s.byteLength;case Th:return n*e*4/s.components*s.byteLength;case so:case ro:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case ao:case oo:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case gc:case Mc:return Math.max(n,16)*Math.max(e,8)/4;case mc:case xc:return Math.max(n,8)*Math.max(e,8)/2;case vc:case bc:case _c:case wc:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case yc:case bo:case Sc:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case Ec:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case Ac:return Math.floor((n+4)/5)*Math.floor((e+3)/4)*16;case Tc:return Math.floor((n+4)/5)*Math.floor((e+4)/5)*16;case Rc:return Math.floor((n+5)/6)*Math.floor((e+4)/5)*16;case Cc:return Math.floor((n+5)/6)*Math.floor((e+5)/6)*16;case Lc:return Math.floor((n+7)/8)*Math.floor((e+4)/5)*16;case Pc:return Math.floor((n+7)/8)*Math.floor((e+5)/6)*16;case Dc:return Math.floor((n+7)/8)*Math.floor((e+7)/8)*16;case Ic:return Math.floor((n+9)/10)*Math.floor((e+4)/5)*16;case Oc:return Math.floor((n+9)/10)*Math.floor((e+5)/6)*16;case Nc:return Math.floor((n+9)/10)*Math.floor((e+7)/8)*16;case Fc:return Math.floor((n+9)/10)*Math.floor((e+9)/10)*16;case kc:return Math.floor((n+11)/12)*Math.floor((e+9)/10)*16;case Uc:return Math.floor((n+11)/12)*Math.floor((e+11)/12)*16;case Bc:case zc:case Gc:return Math.ceil(n/4)*Math.ceil(e/4)*16;case Hc:case Wc:return Math.ceil(n/4)*Math.ceil(e/4)*8;case yo:case Vc:return Math.ceil(n/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function _v(n){switch(n){case Kn:case Of:return{byteLength:1,components:1};case sa:case Nf:case Ni:return{byteLength:2,components:1};case _h:case wh:return{byteLength:2,components:4};case Oi:case yh:case fi:return{byteLength:4,components:1};case Ff:case kf:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${n}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:gh}}));typeof window<"u"&&(window.__THREE__?et("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=gh);function e0(){let n=null,e=!1,t=null,i=null;function s(r,a){i=n.requestAnimationFrame(s),t(r,a)}return{start:function(){e!==!0&&t!==null&&n!==null&&(i=n.requestAnimationFrame(s),e=!0)},stop:function(){n!==null&&n.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){n=r}}}function wv(n){const e=new WeakMap;function t(o,h){const c=o.array,d=o.usage,f=c.byteLength,u=n.createBuffer();n.bindBuffer(h,u),n.bufferData(h,c,d),o.onUploadCallback();let p;if(c instanceof Float32Array)p=n.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)p=n.HALF_FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?p=n.HALF_FLOAT:p=n.UNSIGNED_SHORT;else if(c instanceof Int16Array)p=n.SHORT;else if(c instanceof Uint32Array)p=n.UNSIGNED_INT;else if(c instanceof Int32Array)p=n.INT;else if(c instanceof Int8Array)p=n.BYTE;else if(c instanceof Uint8Array)p=n.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)p=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:u,type:p,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:f}}function i(o,h,c){const d=h.array,f=h.updateRanges;if(n.bindBuffer(c,o),f.length===0)n.bufferSubData(c,0,d);else{f.sort((p,g)=>p.start-g.start);let u=0;for(let p=1;p<f.length;p++){const g=f[u],M=f[p];M.start<=g.start+g.count+1?g.count=Math.max(g.count,M.start+M.count-g.start):(++u,f[u]=M)}f.length=u+1;for(let p=0,g=f.length;p<g;p++){const M=f[p];n.bufferSubData(c,M.start*d.BYTES_PER_ELEMENT,d,M.start,M.count)}h.clearUpdateRanges()}h.onUploadCallback()}function s(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);const h=e.get(o);h&&(n.deleteBuffer(h.buffer),e.delete(o))}function a(o,h){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const d=e.get(o);(!d||d.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const c=e.get(o);if(c===void 0)e.set(o,t(o,h));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(c.buffer,o,h),c.version=o.version}}return{get:s,remove:r,update:a}}var Sv=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Ev=`#ifdef USE_ALPHAHASH
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
#endif`,Av=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Tv=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Rv=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Cv=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Lv=`#ifdef USE_AOMAP
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
#endif`,Pv=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Dv=`#ifdef USE_BATCHING
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
#endif`,Iv=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Ov=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Nv=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Fv=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,kv=`#ifdef USE_IRIDESCENCE
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
#endif`,Uv=`#ifdef USE_BUMPMAP
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
#endif`,Bv=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,zv=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Gv=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Hv=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Wv=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,Vv=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,Yv=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,Xv=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
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
#endif`,Kv=`#define PI 3.141592653589793
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
} // validated`,qv=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,$v=`vec3 transformedNormal = objectNormal;
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
#endif`,Zv=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Jv=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Qv=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,jv=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,eb="gl_FragColor = linearToOutputTexel( gl_FragColor );",tb=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,nb=`#ifdef USE_ENVMAP
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
#endif`,ib=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,sb=`#ifdef USE_ENVMAP
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
#endif`,rb=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,ab=`#ifdef USE_ENVMAP
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
#endif`,ob=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,lb=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,cb=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,hb=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,ub=`#ifdef USE_GRADIENTMAP
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
}`,db=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,fb=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,pb=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,mb=`uniform bool receiveShadow;
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
#include <lightprobes_pars_fragment>`,gb=`#ifdef USE_ENVMAP
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
#endif`,xb=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Mb=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,vb=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,bb=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,yb=`PhysicalMaterial material;
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
#endif`,_b=`uniform sampler2D dfgLUT;
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
}`,wb=`
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
#endif`,Sb=`#if defined( RE_IndirectDiffuse )
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
#endif`,Eb=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Ab=`#ifdef USE_LIGHT_PROBES_GRID
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
#endif`,Tb=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Rb=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Cb=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Lb=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Pb=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Db=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Ib=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,Ob=`#if defined( USE_POINTS_UV )
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
#endif`,Nb=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Fb=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,kb=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Ub=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Bb=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,zb=`#ifdef USE_MORPHTARGETS
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
#endif`,Gb=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Hb=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,Wb=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,Vb=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Yb=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Xb=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,Kb=`#ifdef USE_NORMALMAP
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
#endif`,qb=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,$b=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Zb=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Jb=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Qb=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,jb=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,e5=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,t5=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,n5=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,i5=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,s5=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,r5=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,a5=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,o5=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,l5=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,c5=`float getShadowMask() {
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
}`,h5=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,u5=`#ifdef USE_SKINNING
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
#endif`,d5=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,f5=`#ifdef USE_SKINNING
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
#endif`,p5=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,m5=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,g5=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,x5=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,M5=`#ifdef USE_TRANSMISSION
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
#endif`,v5=`#ifdef USE_TRANSMISSION
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
#endif`,b5=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,y5=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,_5=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,w5=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const S5=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,E5=`uniform sampler2D t2D;
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
}`,A5=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,T5=`#ifdef ENVMAP_TYPE_CUBE
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
}`,R5=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,C5=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,L5=`#include <common>
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
}`,P5=`#if DEPTH_PACKING == 3200
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
}`,D5=`#define DISTANCE
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
}`,I5=`#define DISTANCE
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
}`,O5=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,N5=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,F5=`uniform float scale;
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
}`,k5=`uniform vec3 diffuse;
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
}`,U5=`#include <common>
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
}`,B5=`uniform vec3 diffuse;
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
}`,z5=`#define LAMBERT
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
}`,G5=`#define LAMBERT
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
}`,H5=`#define MATCAP
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
}`,W5=`#define MATCAP
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
}`,V5=`#define NORMAL
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
}`,Y5=`#define NORMAL
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
}`,X5=`#define PHONG
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
}`,K5=`#define PHONG
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
}`,q5=`#define STANDARD
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
}`,$5=`#define STANDARD
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
}`,Z5=`#define TOON
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
}`,J5=`#define TOON
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
}`,Q5=`uniform float size;
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
}`,j5=`uniform vec3 diffuse;
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
}`,ey=`#include <common>
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
}`,ty=`uniform vec3 color;
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
}`,ny=`uniform float rotation;
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
}`,iy=`uniform vec3 diffuse;
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
}`,lt={alphahash_fragment:Sv,alphahash_pars_fragment:Ev,alphamap_fragment:Av,alphamap_pars_fragment:Tv,alphatest_fragment:Rv,alphatest_pars_fragment:Cv,aomap_fragment:Lv,aomap_pars_fragment:Pv,batching_pars_vertex:Dv,batching_vertex:Iv,begin_vertex:Ov,beginnormal_vertex:Nv,bsdfs:Fv,iridescence_fragment:kv,bumpmap_pars_fragment:Uv,clipping_planes_fragment:Bv,clipping_planes_pars_fragment:zv,clipping_planes_pars_vertex:Gv,clipping_planes_vertex:Hv,color_fragment:Wv,color_pars_fragment:Vv,color_pars_vertex:Yv,color_vertex:Xv,common:Kv,cube_uv_reflection_fragment:qv,defaultnormal_vertex:$v,displacementmap_pars_vertex:Zv,displacementmap_vertex:Jv,emissivemap_fragment:Qv,emissivemap_pars_fragment:jv,colorspace_fragment:eb,colorspace_pars_fragment:tb,envmap_fragment:nb,envmap_common_pars_fragment:ib,envmap_pars_fragment:sb,envmap_pars_vertex:rb,envmap_physical_pars_fragment:gb,envmap_vertex:ab,fog_vertex:ob,fog_pars_vertex:lb,fog_fragment:cb,fog_pars_fragment:hb,gradientmap_pars_fragment:ub,lightmap_pars_fragment:db,lights_lambert_fragment:fb,lights_lambert_pars_fragment:pb,lights_pars_begin:mb,lights_toon_fragment:xb,lights_toon_pars_fragment:Mb,lights_phong_fragment:vb,lights_phong_pars_fragment:bb,lights_physical_fragment:yb,lights_physical_pars_fragment:_b,lights_fragment_begin:wb,lights_fragment_maps:Sb,lights_fragment_end:Eb,lightprobes_pars_fragment:Ab,logdepthbuf_fragment:Tb,logdepthbuf_pars_fragment:Rb,logdepthbuf_pars_vertex:Cb,logdepthbuf_vertex:Lb,map_fragment:Pb,map_pars_fragment:Db,map_particle_fragment:Ib,map_particle_pars_fragment:Ob,metalnessmap_fragment:Nb,metalnessmap_pars_fragment:Fb,morphinstance_vertex:kb,morphcolor_vertex:Ub,morphnormal_vertex:Bb,morphtarget_pars_vertex:zb,morphtarget_vertex:Gb,normal_fragment_begin:Hb,normal_fragment_maps:Wb,normal_pars_fragment:Vb,normal_pars_vertex:Yb,normal_vertex:Xb,normalmap_pars_fragment:Kb,clearcoat_normal_fragment_begin:qb,clearcoat_normal_fragment_maps:$b,clearcoat_pars_fragment:Zb,iridescence_pars_fragment:Jb,opaque_fragment:Qb,packing:jb,premultiplied_alpha_fragment:e5,project_vertex:t5,dithering_fragment:n5,dithering_pars_fragment:i5,roughnessmap_fragment:s5,roughnessmap_pars_fragment:r5,shadowmap_pars_fragment:a5,shadowmap_pars_vertex:o5,shadowmap_vertex:l5,shadowmask_pars_fragment:c5,skinbase_vertex:h5,skinning_pars_vertex:u5,skinning_vertex:d5,skinnormal_vertex:f5,specularmap_fragment:p5,specularmap_pars_fragment:m5,tonemapping_fragment:g5,tonemapping_pars_fragment:x5,transmission_fragment:M5,transmission_pars_fragment:v5,uv_pars_fragment:b5,uv_pars_vertex:y5,uv_vertex:_5,worldpos_vertex:w5,background_vert:S5,background_frag:E5,backgroundCube_vert:A5,backgroundCube_frag:T5,cube_vert:R5,cube_frag:C5,depth_vert:L5,depth_frag:P5,distance_vert:D5,distance_frag:I5,equirect_vert:O5,equirect_frag:N5,linedashed_vert:F5,linedashed_frag:k5,meshbasic_vert:U5,meshbasic_frag:B5,meshlambert_vert:z5,meshlambert_frag:G5,meshmatcap_vert:H5,meshmatcap_frag:W5,meshnormal_vert:V5,meshnormal_frag:Y5,meshphong_vert:X5,meshphong_frag:K5,meshphysical_vert:q5,meshphysical_frag:$5,meshtoon_vert:Z5,meshtoon_frag:J5,points_vert:Q5,points_frag:j5,shadow_vert:ey,shadow_frag:ty,sprite_vert:ny,sprite_frag:iy},Re={common:{diffuse:{value:new ht(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new nt},alphaMap:{value:null},alphaMapTransform:{value:new nt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new nt}},envmap:{envMap:{value:null},envMapRotation:{value:new nt},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new nt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new nt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new nt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new nt},normalScale:{value:new tt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new nt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new nt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new nt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new nt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new ht(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new V},probesMax:{value:new V},probesResolution:{value:new V}},points:{diffuse:{value:new ht(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new nt},alphaTest:{value:0},uvTransform:{value:new nt}},sprite:{diffuse:{value:new ht(16777215)},opacity:{value:1},center:{value:new tt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new nt},alphaMap:{value:null},alphaMapTransform:{value:new nt},alphaTest:{value:0}}},Ai={basic:{uniforms:Ln([Re.common,Re.specularmap,Re.envmap,Re.aomap,Re.lightmap,Re.fog]),vertexShader:lt.meshbasic_vert,fragmentShader:lt.meshbasic_frag},lambert:{uniforms:Ln([Re.common,Re.specularmap,Re.envmap,Re.aomap,Re.lightmap,Re.emissivemap,Re.bumpmap,Re.normalmap,Re.displacementmap,Re.fog,Re.lights,{emissive:{value:new ht(0)},envMapIntensity:{value:1}}]),vertexShader:lt.meshlambert_vert,fragmentShader:lt.meshlambert_frag},phong:{uniforms:Ln([Re.common,Re.specularmap,Re.envmap,Re.aomap,Re.lightmap,Re.emissivemap,Re.bumpmap,Re.normalmap,Re.displacementmap,Re.fog,Re.lights,{emissive:{value:new ht(0)},specular:{value:new ht(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:lt.meshphong_vert,fragmentShader:lt.meshphong_frag},standard:{uniforms:Ln([Re.common,Re.envmap,Re.aomap,Re.lightmap,Re.emissivemap,Re.bumpmap,Re.normalmap,Re.displacementmap,Re.roughnessmap,Re.metalnessmap,Re.fog,Re.lights,{emissive:{value:new ht(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:lt.meshphysical_vert,fragmentShader:lt.meshphysical_frag},toon:{uniforms:Ln([Re.common,Re.aomap,Re.lightmap,Re.emissivemap,Re.bumpmap,Re.normalmap,Re.displacementmap,Re.gradientmap,Re.fog,Re.lights,{emissive:{value:new ht(0)}}]),vertexShader:lt.meshtoon_vert,fragmentShader:lt.meshtoon_frag},matcap:{uniforms:Ln([Re.common,Re.bumpmap,Re.normalmap,Re.displacementmap,Re.fog,{matcap:{value:null}}]),vertexShader:lt.meshmatcap_vert,fragmentShader:lt.meshmatcap_frag},points:{uniforms:Ln([Re.points,Re.fog]),vertexShader:lt.points_vert,fragmentShader:lt.points_frag},dashed:{uniforms:Ln([Re.common,Re.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:lt.linedashed_vert,fragmentShader:lt.linedashed_frag},depth:{uniforms:Ln([Re.common,Re.displacementmap]),vertexShader:lt.depth_vert,fragmentShader:lt.depth_frag},normal:{uniforms:Ln([Re.common,Re.bumpmap,Re.normalmap,Re.displacementmap,{opacity:{value:1}}]),vertexShader:lt.meshnormal_vert,fragmentShader:lt.meshnormal_frag},sprite:{uniforms:Ln([Re.sprite,Re.fog]),vertexShader:lt.sprite_vert,fragmentShader:lt.sprite_frag},background:{uniforms:{uvTransform:{value:new nt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:lt.background_vert,fragmentShader:lt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new nt}},vertexShader:lt.backgroundCube_vert,fragmentShader:lt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:lt.cube_vert,fragmentShader:lt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:lt.equirect_vert,fragmentShader:lt.equirect_frag},distance:{uniforms:Ln([Re.common,Re.displacementmap,{referencePosition:{value:new V},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:lt.distance_vert,fragmentShader:lt.distance_frag},shadow:{uniforms:Ln([Re.lights,Re.fog,{color:{value:new ht(0)},opacity:{value:1}}]),vertexShader:lt.shadow_vert,fragmentShader:lt.shadow_frag}};Ai.physical={uniforms:Ln([Ai.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new nt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new nt},clearcoatNormalScale:{value:new tt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new nt},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new nt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new nt},sheen:{value:0},sheenColor:{value:new ht(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new nt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new nt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new nt},transmissionSamplerSize:{value:new tt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new nt},attenuationDistance:{value:0},attenuationColor:{value:new ht(0)},specularColor:{value:new ht(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new nt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new nt},anisotropyVector:{value:new tt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new nt}}]),vertexShader:lt.meshphysical_vert,fragmentShader:lt.meshphysical_frag};const Ka={r:0,b:0,g:0},sy=new kt,t0=new nt;t0.set(-1,0,0,0,1,0,0,0,1);function ry(n,e,t,i,s,r){const a=new ht(0);let o=s===!0?0:1,h,c,d=null,f=0,u=null;function p(v){let _=v.isScene===!0?v.background:null;if(_&&_.isTexture){const w=v.backgroundBlurriness>0;_=e.get(_,w)}return _}function g(v){let _=!1;const w=p(v);w===null?x(a,o):w&&w.isColor&&(x(w,1),_=!0);const A=n.xr.getEnvironmentBlendMode();A==="additive"?t.buffers.color.setClear(0,0,0,1,r):A==="alpha-blend"&&t.buffers.color.setClear(0,0,0,0,r),(n.autoClear||_)&&(t.buffers.depth.setTest(!0),t.buffers.depth.setMask(!0),t.buffers.color.setMask(!0),n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil))}function M(v,_){const w=p(_);w&&(w.isCubeTexture||w.mapping===Bo)?(c===void 0&&(c=new Yt(new fa(1,1,1),new xt({name:"BackgroundCubeMaterial",uniforms:Ar(Ai.backgroundCube.uniforms),vertexShader:Ai.backgroundCube.vertexShader,fragmentShader:Ai.backgroundCube.fragmentShader,side:Hn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(A,y,S){this.matrixWorld.copyPosition(S.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(c)),c.material.uniforms.envMap.value=w,c.material.uniforms.backgroundBlurriness.value=_.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=_.backgroundIntensity,c.material.uniforms.backgroundRotation.value.setFromMatrix4(sy.makeRotationFromEuler(_.backgroundRotation)).transpose(),w.isCubeTexture&&w.isRenderTargetTexture===!1&&c.material.uniforms.backgroundRotation.value.premultiply(t0),c.material.toneMapped=ft.getTransfer(w.colorSpace)!==Dt,(d!==w||f!==w.version||u!==n.toneMapping)&&(c.material.needsUpdate=!0,d=w,f=w.version,u=n.toneMapping),c.layers.enableAll(),v.unshift(c,c.geometry,c.material,0,0,null)):w&&w.isTexture&&(h===void 0&&(h=new Yt(new Zn(2,2),new xt({name:"BackgroundMaterial",uniforms:Ar(Ai.background.uniforms),vertexShader:Ai.background.vertexShader,fragmentShader:Ai.background.fragmentShader,side:ks,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),h.geometry.deleteAttribute("normal"),Object.defineProperty(h.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(h)),h.material.uniforms.t2D.value=w,h.material.uniforms.backgroundIntensity.value=_.backgroundIntensity,h.material.toneMapped=ft.getTransfer(w.colorSpace)!==Dt,w.matrixAutoUpdate===!0&&w.updateMatrix(),h.material.uniforms.uvTransform.value.copy(w.matrix),(d!==w||f!==w.version||u!==n.toneMapping)&&(h.material.needsUpdate=!0,d=w,f=w.version,u=n.toneMapping),h.layers.enableAll(),v.unshift(h,h.geometry,h.material,0,0,null))}function x(v,_){v.getRGB(Ka,Jf(n)),t.buffers.color.setClear(Ka.r,Ka.g,Ka.b,_,r)}function m(){c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0),h!==void 0&&(h.geometry.dispose(),h.material.dispose(),h=void 0)}return{getClearColor:function(){return a},setClearColor:function(v,_=1){a.set(v),o=_,x(a,o)},getClearAlpha:function(){return o},setClearAlpha:function(v){o=v,x(a,o)},render:g,addToRenderList:M,dispose:m}}function ay(n,e){const t=n.getParameter(n.MAX_VERTEX_ATTRIBS),i={},s=u(null);let r=s,a=!1;function o(T,R,O,I,k){let U=!1;const W=f(T,I,O,R);r!==W&&(r=W,c(r.object)),U=p(T,I,O,k),U&&g(T,I,O,k),k!==null&&e.update(k,n.ELEMENT_ARRAY_BUFFER),(U||a)&&(a=!1,w(T,R,O,I),k!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,e.get(k).buffer))}function h(){return n.createVertexArray()}function c(T){return n.bindVertexArray(T)}function d(T){return n.deleteVertexArray(T)}function f(T,R,O,I){const k=I.wireframe===!0;let U=i[R.id];U===void 0&&(U={},i[R.id]=U);const W=T.isInstancedMesh===!0?T.id:0;let ne=U[W];ne===void 0&&(ne={},U[W]=ne);let K=ne[O.id];K===void 0&&(K={},ne[O.id]=K);let re=K[k];return re===void 0&&(re=u(h()),K[k]=re),re}function u(T){const R=[],O=[],I=[];for(let k=0;k<t;k++)R[k]=0,O[k]=0,I[k]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:R,enabledAttributes:O,attributeDivisors:I,object:T,attributes:{},index:null}}function p(T,R,O,I){const k=r.attributes,U=R.attributes;let W=0;const ne=O.getAttributes();for(const K in ne)if(ne[K].location>=0){const N=k[K];let te=U[K];if(te===void 0&&(K==="instanceMatrix"&&T.instanceMatrix&&(te=T.instanceMatrix),K==="instanceColor"&&T.instanceColor&&(te=T.instanceColor)),N===void 0||N.attribute!==te||te&&N.data!==te.data)return!0;W++}return r.attributesNum!==W||r.index!==I}function g(T,R,O,I){const k={},U=R.attributes;let W=0;const ne=O.getAttributes();for(const K in ne)if(ne[K].location>=0){let N=U[K];N===void 0&&(K==="instanceMatrix"&&T.instanceMatrix&&(N=T.instanceMatrix),K==="instanceColor"&&T.instanceColor&&(N=T.instanceColor));const te={};te.attribute=N,N&&N.data&&(te.data=N.data),k[K]=te,W++}r.attributes=k,r.attributesNum=W,r.index=I}function M(){const T=r.newAttributes;for(let R=0,O=T.length;R<O;R++)T[R]=0}function x(T){m(T,0)}function m(T,R){const O=r.newAttributes,I=r.enabledAttributes,k=r.attributeDivisors;O[T]=1,I[T]===0&&(n.enableVertexAttribArray(T),I[T]=1),k[T]!==R&&(n.vertexAttribDivisor(T,R),k[T]=R)}function v(){const T=r.newAttributes,R=r.enabledAttributes;for(let O=0,I=R.length;O<I;O++)R[O]!==T[O]&&(n.disableVertexAttribArray(O),R[O]=0)}function _(T,R,O,I,k,U,W){W===!0?n.vertexAttribIPointer(T,R,O,k,U):n.vertexAttribPointer(T,R,O,I,k,U)}function w(T,R,O,I){M();const k=I.attributes,U=O.getAttributes(),W=R.defaultAttributeValues;for(const ne in U){const K=U[ne];if(K.location>=0){let re=k[ne];if(re===void 0&&(ne==="instanceMatrix"&&T.instanceMatrix&&(re=T.instanceMatrix),ne==="instanceColor"&&T.instanceColor&&(re=T.instanceColor)),re!==void 0){const N=re.normalized,te=re.itemSize,ae=e.get(re);if(ae===void 0)continue;const pe=ae.buffer,be=ae.type,Pe=ae.bytesPerElement,q=be===n.INT||be===n.UNSIGNED_INT||re.gpuType===yh;if(re.isInterleavedBufferAttribute){const ee=re.data,B=ee.stride,ce=re.offset;if(ee.isInstancedInterleavedBuffer){for(let H=0;H<K.locationSize;H++)m(K.location+H,ee.meshPerAttribute);T.isInstancedMesh!==!0&&I._maxInstanceCount===void 0&&(I._maxInstanceCount=ee.meshPerAttribute*ee.count)}else for(let H=0;H<K.locationSize;H++)x(K.location+H);n.bindBuffer(n.ARRAY_BUFFER,pe);for(let H=0;H<K.locationSize;H++)_(K.location+H,te/K.locationSize,be,N,B*Pe,(ce+te/K.locationSize*H)*Pe,q)}else{if(re.isInstancedBufferAttribute){for(let ee=0;ee<K.locationSize;ee++)m(K.location+ee,re.meshPerAttribute);T.isInstancedMesh!==!0&&I._maxInstanceCount===void 0&&(I._maxInstanceCount=re.meshPerAttribute*re.count)}else for(let ee=0;ee<K.locationSize;ee++)x(K.location+ee);n.bindBuffer(n.ARRAY_BUFFER,pe);for(let ee=0;ee<K.locationSize;ee++)_(K.location+ee,te/K.locationSize,be,N,te*Pe,te/K.locationSize*ee*Pe,q)}}else if(W!==void 0){const N=W[ne];if(N!==void 0)switch(N.length){case 2:n.vertexAttrib2fv(K.location,N);break;case 3:n.vertexAttrib3fv(K.location,N);break;case 4:n.vertexAttrib4fv(K.location,N);break;default:n.vertexAttrib1fv(K.location,N)}}}}v()}function A(){E();for(const T in i){const R=i[T];for(const O in R){const I=R[O];for(const k in I){const U=I[k];for(const W in U)d(U[W].object),delete U[W];delete I[k]}}delete i[T]}}function y(T){if(i[T.id]===void 0)return;const R=i[T.id];for(const O in R){const I=R[O];for(const k in I){const U=I[k];for(const W in U)d(U[W].object),delete U[W];delete I[k]}}delete i[T.id]}function S(T){for(const R in i){const O=i[R];for(const I in O){const k=O[I];if(k[T.id]===void 0)continue;const U=k[T.id];for(const W in U)d(U[W].object),delete U[W];delete k[T.id]}}}function b(T){for(const R in i){const O=i[R],I=T.isInstancedMesh===!0?T.id:0,k=O[I];if(k!==void 0){for(const U in k){const W=k[U];for(const ne in W)d(W[ne].object),delete W[ne];delete k[U]}delete O[I],Object.keys(O).length===0&&delete i[R]}}}function E(){C(),a=!0,r!==s&&(r=s,c(r.object))}function C(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:o,reset:E,resetDefaultState:C,dispose:A,releaseStatesOfGeometry:y,releaseStatesOfObject:b,releaseStatesOfProgram:S,initAttributes:M,enableAttribute:x,disableUnusedAttributes:v}}function oy(n,e,t){let i;function s(h){i=h}function r(h,c){n.drawArrays(i,h,c),t.update(c,i,1)}function a(h,c,d){d!==0&&(n.drawArraysInstanced(i,h,c,d),t.update(c,i,d))}function o(h,c,d){if(d===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,h,0,c,0,d);let u=0;for(let p=0;p<d;p++)u+=c[p];t.update(u,i,1)}this.setMode=s,this.render=r,this.renderInstances=a,this.renderMultiDraw=o}function ly(n,e,t,i){let s;function r(){if(s!==void 0)return s;if(e.has("EXT_texture_filter_anisotropic")===!0){const S=e.get("EXT_texture_filter_anisotropic");s=n.getParameter(S.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function a(S){return!(S!==qn&&i.convert(S)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(S){const b=S===Ni&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(S!==Kn&&S!==fi&&!b&&i.convert(S)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_TYPE))}function h(S){if(S==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";S="mediump"}return S==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp";const d=h(c);d!==c&&(et("WebGLRenderer:",c,"not supported, using",d,"instead."),c=d);const f=t.logarithmicDepthBuffer===!0,u=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control");t.reversedDepthBuffer===!0&&u===!1&&et("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");const p=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),g=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),M=n.getParameter(n.MAX_TEXTURE_SIZE),x=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),m=n.getParameter(n.MAX_VERTEX_ATTRIBS),v=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),_=n.getParameter(n.MAX_VARYING_VECTORS),w=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),A=n.getParameter(n.MAX_SAMPLES),y=n.getParameter(n.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:h,textureFormatReadable:a,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:f,reversedDepthBuffer:u,maxTextures:p,maxVertexTextures:g,maxTextureSize:M,maxCubemapSize:x,maxAttributes:m,maxVertexUniforms:v,maxVaryings:_,maxFragmentUniforms:w,maxSamples:A,samples:y}}function cy(n){const e=this;let t=null,i=0,s=!1,r=!1;const a=new ls,o=new nt,h={value:null,needsUpdate:!1};this.uniform=h,this.numPlanes=0,this.numIntersection=0,this.init=function(f,u){const p=f.length!==0||u||i!==0||s;return s=u,i=f.length,p},this.beginShadows=function(){r=!0,d(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(f,u){t=d(f,u,0)},this.setState=function(f,u,p){const g=f.clippingPlanes,M=f.clipIntersection,x=f.clipShadows,m=n.get(f);if(!s||g===null||g.length===0||r&&!x)r?d(null):c();else{const v=r?0:i,_=v*4;let w=m.clippingState||null;h.value=w,w=d(g,u,_,p);for(let A=0;A!==_;++A)w[A]=t[A];m.clippingState=w,this.numIntersection=M?this.numPlanes:0,this.numPlanes+=v}};function c(){h.value!==t&&(h.value=t,h.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function d(f,u,p,g){const M=f!==null?f.length:0;let x=null;if(M!==0){if(x=h.value,g!==!0||x===null){const m=p+M*4,v=u.matrixWorldInverse;o.getNormalMatrix(v),(x===null||x.length<m)&&(x=new Float32Array(m));for(let _=0,w=p;_!==M;++_,w+=4)a.copy(f[_]).applyMatrix4(v,o),a.normal.toArray(x,w),x[w+3]=a.constant}h.value=x,h.needsUpdate=!0}return e.numPlanes=M,e.numIntersection=0,x}}const ur=4,hy=6,uy=20,dy=256,qr=new Ih,id=new ht;let Rl=null,Cl=0,Ll=0,Pl=!1;const fy=new V,_s=new V;class sd{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,i=.1,s=100,r={}){const{size:a=256,position:o=fy}=r;Rl=this._renderer.getRenderTarget(),Cl=this._renderer.getActiveCubeFace(),Ll=this._renderer.getActiveMipmapLevel(),Pl=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);const h=this._allocateTargets();return h.depthBuffer=!0,this._sceneToCubeUV(e,i,s,h,o),t>0&&this._blur(h,0,0,t),this._applyPMREM(h),this._cleanup(h),h}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=od(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=ad(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(Rl,Cl,Ll),this._renderer.xr.enabled=Pl,e.scissorTest=!1,or(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===Us||e.mapping===Sr?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Rl=this._renderer.getRenderTarget(),Cl=this._renderer.getActiveCubeFace(),Ll=this._renderer.getActiveMipmapLevel(),Pl=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=t||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,i={magFilter:Jt,minFilter:Jt,generateMipmaps:!1,type:Ni,format:qn,colorSpace:aa,depthBuffer:!1},s=rd(e,t,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=rd(e,t,i);const{_lodMax:r}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods}=py(r)),this._blurMaterial=gy(r,e,t),this._ggxMaterial=my(r,e,t)}return s}_compileMaterial(e){const t=new Yt(new Qt,e);this._renderer.compile(t,qr)}_sceneToCubeUV(e,t,i,s,r){const h=new Xn(90,1,t,i),c=[1,-1,1,1,1,1],d=[1,1,1,-1,-1,-1],f=this._renderer,u=f.autoClear,p=f.toneMapping;f.getClearColor(id),f.toneMapping=Di,f.autoClear=!1,f.state.buffers.depth.getReversed()&&(f.setRenderTarget(s),f.clearDepth(),f.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new Yt(new fa,new Xf({name:"PMREM.Background",side:Hn,depthWrite:!1,depthTest:!1})));const M=this._backgroundBox,x=M.material;let m=!1;const v=e.background;v?v.isColor&&(x.color.copy(v),e.background=null,m=!0):(x.color.copy(id),m=!0);for(let _=0;_<6;_++){const w=_%3;w===0?(h.up.set(0,c[_],0),h.position.set(r.x,r.y,r.z),h.lookAt(r.x+d[_],r.y,r.z)):w===1?(h.up.set(0,0,c[_]),h.position.set(r.x,r.y,r.z),h.lookAt(r.x,r.y+d[_],r.z)):(h.up.set(0,c[_],0),h.position.set(r.x,r.y,r.z),h.lookAt(r.x,r.y,r.z+d[_]));const A=this._cubeSize;or(s,w*A,_>2?A:0,A,A),f.setRenderTarget(s),m&&f.render(M,h),f.render(e,h)}f.toneMapping=p,f.autoClear=u,e.background=v}_textureToCubeUV(e,t){const i=this._renderer,s=e.mapping===Us||e.mapping===Sr;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=od()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=ad());const r=s?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=r;const o=r.uniforms;o.envMap.value=e;const h=this._cubeSize;or(t,0,0,3*h,2*h),i.setRenderTarget(t),i.render(a,qr)}_applyPMREM(e){const t=this._renderer,i=t.autoClear;t.autoClear=!1;const s=this._lodMeshes.length;for(let r=1;r<s;r++)this._applyGGXFilter(e,r-1,r);t.autoClear=i}_applyGGXFilter(e,t,i){const s=this._renderer,r=this._pingPongRenderTarget,a=this._ggxMaterial,o=this._lodMeshes[i];o.material=a;const h=a.uniforms,c=i/(this._lodMeshes.length-1),d=t/(this._lodMeshes.length-1),f=Math.sqrt(c*c-d*d),u=c*1.25,p=f*u,{_lodMax:g}=this,M=this._sizeLods[i],x=3*M*(i>g-ur?i-g+ur:0),m=4*(this._cubeSize-M);h.envMap.value=e.texture,h.roughness.value=p,h.mipInt.value=g-t,or(r,x,m,3*M,2*M),s.setRenderTarget(r),s.render(o,qr),h.envMap.value=r.texture,h.roughness.value=0,h.mipInt.value=g-i,or(e,x,m,3*M,2*M),s.setRenderTarget(e),s.render(o,qr)}_blur(e,t,i,s){const r=this._pingPongRenderTarget,a=Math.min(s,Math.PI)/Math.SQRT2;this._blurPass(e,r,t,i,a),this._blurPass(r,e,i,i,a)}_blurPass(e,t,i,s,r){const a=this._renderer,o=this._blurMaterial,h=this._lodMeshes[s];h.material=o;const c=o.uniforms;c.envMap.value=e.texture,c.sigma.value=r,c.mipInt.value=this._lodMax-i;const d=this._sizeLods[s],f=3*d*(s>this._lodMax-ur?s-this._lodMax+ur:0),u=4*(this._cubeSize-d);or(t,f,u,3*d,2*d),a.setRenderTarget(t),a.render(h,qr)}}function py(n){const e=[],t=[];let i=n;const s=n-ur+1+hy;for(let r=0;r<s;r++){const a=Math.pow(2,i);e.push(a);const o=1/(a-2),h=-o,c=1+o,d=[h,h,c,h,c,c,h,h,c,c,h,c],f=6,u=6,p=3,g=new Float32Array(p*u*f),M=new Float32Array(p*u*f);for(let m=0;m<f;m++){const v=m%3*2/3-1,_=m>2?0:-1,w=[v,_,0,v+2/3,_,0,v+2/3,_+1,0,v,_,0,v+2/3,_+1,0,v,_+1,0];g.set(w,p*u*m);for(let A=0;A<u;A++){const y=d[A*2]*2-1,S=d[A*2+1]*2-1;m===0?_s.set(1,S,y):m===1?_s.set(-y,1,-S):m===2?_s.set(-y,S,1):m===3?_s.set(-1,S,-y):m===4?_s.set(-y,-1,S):_s.set(y,S,-1),_s.toArray(M,(m*u+A)*p)}}const x=new Qt;x.setAttribute("position",new Nn(g,p)),x.setAttribute("outputDirection",new Nn(M,p)),t.push(new Yt(x,null)),i>ur&&i--}return{lodMeshes:t,sizeLods:e}}function rd(n,e,t){const i=new ii(n,e,t);return i.texture.mapping=Bo,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function or(n,e,t,i,s){n.viewport.set(e,t,i,s),n.scissor.set(e,t,i,s)}function my(n,e,t){return new xt({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:dy,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:zo(),fragmentShader:`

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
		`,blending:Li,depthTest:!1,depthWrite:!1})}function gy(n,e,t){return new xt({name:"SphericalGaussianBlur",defines:{SAMPLES:uy,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},sigma:{value:0},mipInt:{value:0}},vertexShader:zo(),fragmentShader:`

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
		`,blending:Li,depthTest:!1,depthWrite:!1})}function ad(){return new xt({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:zo(),fragmentShader:`

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
		`,blending:Li,depthTest:!1,depthWrite:!1})}function od(){return new xt({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:zo(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Li,depthTest:!1,depthWrite:!1})}function zo(){return`

		precision mediump float;
		precision mediump int;

		attribute vec3 outputDirection;

		varying vec3 vOutputDirection;

		void main() {

			vOutputDirection = outputDirection;
			gl_Position = vec4( position, 1.0 );

		}
	`}class n0 extends ii{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const i={width:e,height:e,depth:1},s=[i,i,i,i,i,i];this.texture=new $f(s),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new fa(5,5,5),r=new xt({name:"CubemapFromEquirect",uniforms:Ar(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:Hn,blending:Li});r.uniforms.tEquirect.value=t;const a=new Yt(s,r),o=t.minFilter;return t.minFilter===Ls&&(t.minFilter=Jt),new bv(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,i=!0,s=!0){const r=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,i,s);e.setRenderTarget(r)}}function xy(n){let e=new WeakMap,t=new WeakMap,i=null;function s(u,p=!1){return u==null?null:p?a(u):r(u)}function r(u){if(u&&u.isTexture){const p=u.mapping;if(p===tl||p===nl)if(e.has(u)){const g=e.get(u).texture;return o(g,u.mapping)}else{const g=u.image;if(g&&g.height>0){const M=new n0(g.height);return M.fromEquirectangularTexture(n,u),e.set(u,M),u.addEventListener("dispose",c),o(M.texture,u.mapping)}else return null}}return u}function a(u){if(u&&u.isTexture){const p=u.mapping,g=p===tl||p===nl,M=p===Us||p===Sr;if(g||M){let x=t.get(u);const m=x!==void 0?x.texture.pmremVersion:0;if(u.isRenderTargetTexture&&u.pmremVersion!==m)return i===null&&(i=new sd(n)),x=g?i.fromEquirectangular(u,x):i.fromCubemap(u,x),x.texture.pmremVersion=u.pmremVersion,t.set(u,x),x.texture;if(x!==void 0)return x.texture;{const v=u.image;return g&&v&&v.height>0||M&&v&&h(v)?(i===null&&(i=new sd(n)),x=g?i.fromEquirectangular(u):i.fromCubemap(u),x.texture.pmremVersion=u.pmremVersion,t.set(u,x),u.addEventListener("dispose",d),x.texture):null}}}return u}function o(u,p){return p===tl?u.mapping=Us:p===nl&&(u.mapping=Sr),u}function h(u){let p=0;const g=6;for(let M=0;M<g;M++)u[M]!==void 0&&p++;return p===g}function c(u){const p=u.target;p.removeEventListener("dispose",c);const g=e.get(p);g!==void 0&&(e.delete(p),g.dispose())}function d(u){const p=u.target;p.removeEventListener("dispose",d);const g=t.get(p);g!==void 0&&(t.delete(p),g.dispose())}function f(){e=new WeakMap,t=new WeakMap,i!==null&&(i.dispose(),i=null)}return{get:s,dispose:f}}function My(n){const e={};function t(i){if(e[i]!==void 0)return e[i];const s=n.getExtension(i);return e[i]=s,s}return{has:function(i){return t(i)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(i){const s=t(i);return s===null&&xr("WebGLRenderer: "+i+" extension not supported."),s}}}function vy(n,e,t,i){const s={},r=new WeakMap;function a(f){const u=f.target;u.index!==null&&e.remove(u.index);for(const g in u.attributes)e.remove(u.attributes[g]);u.removeEventListener("dispose",a),delete s[u.id];const p=r.get(u);p&&(e.remove(p),r.delete(u)),i.releaseStatesOfGeometry(u),u.isInstancedBufferGeometry===!0&&delete u._maxInstanceCount,t.memory.geometries--}function o(f,u){return s[u.id]===!0||(u.addEventListener("dispose",a),s[u.id]=!0,t.memory.geometries++),u}function h(f){const u=f.attributes;for(const p in u)e.update(u[p],n.ARRAY_BUFFER)}function c(f){const u=[],p=f.index,g=f.attributes.position;let M=0;if(g===void 0)return;if(p!==null){const v=p.array;M=p.version;for(let _=0,w=v.length;_<w;_+=3){const A=v[_+0],y=v[_+1],S=v[_+2];u.push(A,y,y,S,S,A)}}else{const v=g.array;M=g.version;for(let _=0,w=v.length/3-1;_<w;_+=3){const A=_+0,y=_+1,S=_+2;u.push(A,y,y,S,S,A)}}const x=new(g.count>=65535?Yf:Vf)(u,1);x.version=M;const m=r.get(f);m&&e.remove(m),r.set(f,x)}function d(f){const u=r.get(f);if(u){const p=f.index;p!==null&&u.version<p.version&&c(f)}else c(f);return r.get(f)}return{get:o,update:h,getWireframeAttribute:d}}function by(n,e,t){let i;function s(f){i=f}let r,a;function o(f){r=f.type,a=f.bytesPerElement}function h(f,u){n.drawElements(i,u,r,f*a),t.update(u,i,1)}function c(f,u,p){p!==0&&(n.drawElementsInstanced(i,u,r,f*a,p),t.update(u,i,p))}function d(f,u,p){if(p===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,u,0,r,f,0,p);let M=0;for(let x=0;x<p;x++)M+=u[x];t.update(M,i,1)}this.setMode=s,this.setIndex=o,this.render=h,this.renderInstances=c,this.renderMultiDraw=d}function yy(n){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function i(r,a,o){switch(t.calls++,a){case n.TRIANGLES:t.triangles+=o*(r/3);break;case n.LINES:t.lines+=o*(r/2);break;case n.LINE_STRIP:t.lines+=o*(r-1);break;case n.LINE_LOOP:t.lines+=o*r;break;case n.POINTS:t.points+=o*r;break;default:Mt("WebGLInfo: Unknown draw mode:",a);break}}function s(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:s,update:i}}function _y(n,e,t){const i=new WeakMap,s=new at;function r(a,o,h){const c=a.morphTargetInfluences,d=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,f=d!==void 0?d.length:0;let u=i.get(o);if(u===void 0||u.count!==f){let E=function(){S.dispose(),i.delete(o),o.removeEventListener("dispose",E)};u!==void 0&&u.texture.dispose();const p=o.morphAttributes.position!==void 0,g=o.morphAttributes.normal!==void 0,M=o.morphAttributes.color!==void 0,x=o.morphAttributes.position||[],m=o.morphAttributes.normal||[],v=o.morphAttributes.color||[];let _=0;p===!0&&(_=1),g===!0&&(_=2),M===!0&&(_=3);let w=o.attributes.position.count*_,A=1;w>e.maxTextureSize&&(A=Math.ceil(w/e.maxTextureSize),w=e.maxTextureSize);const y=new Float32Array(w*A*4*f),S=new Gf(y,w,A,f);S.type=fi,S.needsUpdate=!0;const b=_*4;for(let C=0;C<f;C++){const T=x[C],R=m[C],O=v[C],I=w*A*4*C;for(let k=0;k<T.count;k++){const U=k*b;p===!0&&(s.fromBufferAttribute(T,k),y[I+U+0]=s.x,y[I+U+1]=s.y,y[I+U+2]=s.z,y[I+U+3]=0),g===!0&&(s.fromBufferAttribute(R,k),y[I+U+4]=s.x,y[I+U+5]=s.y,y[I+U+6]=s.z,y[I+U+7]=0),M===!0&&(s.fromBufferAttribute(O,k),y[I+U+8]=s.x,y[I+U+9]=s.y,y[I+U+10]=s.z,y[I+U+11]=O.itemSize===4?s.w:1)}}u={count:f,texture:S,size:new tt(w,A)},i.set(o,u),o.addEventListener("dispose",E)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)h.getUniforms().setValue(n,"morphTexture",a.morphTexture,t);else{let p=0;for(let M=0;M<c.length;M++)p+=c[M];const g=o.morphTargetsRelative?1:1-p;h.getUniforms().setValue(n,"morphTargetBaseInfluence",g),h.getUniforms().setValue(n,"morphTargetInfluences",c)}h.getUniforms().setValue(n,"morphTargetsTexture",u.texture,t),h.getUniforms().setValue(n,"morphTargetsTextureSize",u.size)}return{update:r}}function wy(n,e,t,i,s){let r=new WeakMap;function a(c){const d=s.render.frame,f=c.geometry,u=e.get(c,f);if(r.get(u)!==d&&(e.update(u),r.set(u,d)),c.isInstancedMesh&&(c.hasEventListener("dispose",h)===!1&&c.addEventListener("dispose",h),r.get(c)!==d&&(t.update(c.instanceMatrix,n.ARRAY_BUFFER),c.instanceColor!==null&&t.update(c.instanceColor,n.ARRAY_BUFFER),r.set(c,d))),c.isSkinnedMesh){const p=c.skeleton;r.get(p)!==d&&(p.update(),r.set(p,d))}return u}function o(){r=new WeakMap}function h(c){const d=c.target;d.removeEventListener("dispose",h),i.releaseStatesOfObject(d),t.remove(d.instanceMatrix),d.instanceColor!==null&&t.remove(d.instanceColor)}return{update:a,dispose:o}}const Sy={[Af]:"LINEAR_TONE_MAPPING",[Tf]:"REINHARD_TONE_MAPPING",[Rf]:"CINEON_TONE_MAPPING",[Cf]:"ACES_FILMIC_TONE_MAPPING",[Pf]:"AGX_TONE_MAPPING",[Df]:"NEUTRAL_TONE_MAPPING",[Lf]:"CUSTOM_TONE_MAPPING"};function Ey(n,e,t,i,s,r){const a=new ii(e,t,{type:n,depthBuffer:s,stencilBuffer:r,samples:i?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1});let o=null,h=null;const c=new Qt;c.setAttribute("position",new St([-1,3,0,-1,-1,0,3,-1,0],3)),c.setAttribute("uv",new St([0,2,0,0,2,0],2));const d=new xv({uniforms:{tDiffuse:{value:null}},vertexShader:`
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
			}`,depthTest:!1,depthWrite:!1}),f=new Yt(c,d),u=new Ih(-1,1,1,-1,0,1);let p=null,g=null,M=!1,x,m=null,v=[],_=!1;this.setSize=function(w,A){a.setSize(w,A),o!==null&&o.setSize(w,A),h!==null&&h.setSize(w,A);for(let y=0;y<v.length;y++){const S=v[y];S.setSize&&S.setSize(w,A)}},this.setEffects=function(w){v=w,_=v.length>0&&v[0].isRenderPass===!0;const A=a.width,y=a.height;v.length>0&&o===null&&(o=new ii(A,y,{type:Ni,depthBuffer:!1,stencilBuffer:!1}),h=new ii(A,y,{type:Ni,depthBuffer:!1,stencilBuffer:!1}));for(let S=0;S<v.length;S++){const b=v[S];b.setSize&&b.setSize(A,y)}},this.begin=function(w,A){if(M||w.toneMapping===Di&&v.length===0)return!1;if(m=A,A!==null){const y=A.width,S=A.height;(a.width!==y||a.height!==S)&&this.setSize(y,S)}return _===!1&&w.setRenderTarget(a),x=w.toneMapping,w.toneMapping=Di,!0},this.hasRenderPass=function(){return _},this.end=function(w,A){w.toneMapping=x,M=!0;let y=a,S=o;for(let b=0;b<v.length;b++){const E=v[b];E.enabled!==!1&&(E.render(w,S,y,A),E.needsSwap!==!1&&(y=S,S=S===o?h:o))}if(p!==w.outputColorSpace||g!==w.toneMapping){p=w.outputColorSpace,g=w.toneMapping,d.defines={},ft.getTransfer(p)===Dt&&(d.defines.SRGB_TRANSFER="");const b=Sy[g];b&&(d.defines[b]=""),d.needsUpdate=!0}d.uniforms.tDiffuse.value=y.texture,w.setRenderTarget(m),w.render(f,u),m=null,M=!1},this.isCompositing=function(){return M},this.dispose=function(){a.dispose(),o!==null&&o.dispose(),h!==null&&h.dispose(),c.dispose(),d.dispose()}}const i0=new Rn,Kc=new Er(1,1),s0=new Gf,r0=new qM,a0=new $f,ld=[],cd=[],hd=new Float32Array(16),ud=new Float32Array(9),dd=new Float32Array(4);function Or(n,e,t){const i=n[0];if(i<=0||i>0)return n;const s=e*t;let r=ld[s];if(r===void 0&&(r=new Float32Array(s),ld[s]=r),e!==0){i.toArray(r,0);for(let a=1,o=0;a!==e;++a)o+=t,n[a].toArray(r,o)}return r}function dn(n,e){if(n.length!==e.length)return!1;for(let t=0,i=n.length;t<i;t++)if(n[t]!==e[t])return!1;return!0}function fn(n,e){for(let t=0,i=e.length;t<i;t++)n[t]=e[t]}function Go(n,e){let t=cd[e];t===void 0&&(t=new Int32Array(e),cd[e]=t);for(let i=0;i!==e;++i)t[i]=n.allocateTextureUnit();return t}function Ay(n,e){const t=this.cache;t[0]!==e&&(n.uniform1f(this.addr,e),t[0]=e)}function Ty(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(dn(t,e))return;n.uniform2fv(this.addr,e),fn(t,e)}}function Ry(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(n.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(dn(t,e))return;n.uniform3fv(this.addr,e),fn(t,e)}}function Cy(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(dn(t,e))return;n.uniform4fv(this.addr,e),fn(t,e)}}function Ly(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(dn(t,e))return;n.uniformMatrix2fv(this.addr,!1,e),fn(t,e)}else{if(dn(t,i))return;dd.set(i),n.uniformMatrix2fv(this.addr,!1,dd),fn(t,i)}}function Py(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(dn(t,e))return;n.uniformMatrix3fv(this.addr,!1,e),fn(t,e)}else{if(dn(t,i))return;ud.set(i),n.uniformMatrix3fv(this.addr,!1,ud),fn(t,i)}}function Dy(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(dn(t,e))return;n.uniformMatrix4fv(this.addr,!1,e),fn(t,e)}else{if(dn(t,i))return;hd.set(i),n.uniformMatrix4fv(this.addr,!1,hd),fn(t,i)}}function Iy(n,e){const t=this.cache;t[0]!==e&&(n.uniform1i(this.addr,e),t[0]=e)}function Oy(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(dn(t,e))return;n.uniform2iv(this.addr,e),fn(t,e)}}function Ny(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(dn(t,e))return;n.uniform3iv(this.addr,e),fn(t,e)}}function Fy(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(dn(t,e))return;n.uniform4iv(this.addr,e),fn(t,e)}}function ky(n,e){const t=this.cache;t[0]!==e&&(n.uniform1ui(this.addr,e),t[0]=e)}function Uy(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(dn(t,e))return;n.uniform2uiv(this.addr,e),fn(t,e)}}function By(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(dn(t,e))return;n.uniform3uiv(this.addr,e),fn(t,e)}}function zy(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(dn(t,e))return;n.uniform4uiv(this.addr,e),fn(t,e)}}function Gy(n,e,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s);let r;this.type===n.SAMPLER_2D_SHADOW?(Kc.compareFunction=t.isReversedDepthBuffer()?Ch:Rh,r=Kc):r=i0,t.setTexture2D(e||r,s)}function Hy(n,e,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),t.setTexture3D(e||r0,s)}function Wy(n,e,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),t.setTextureCube(e||a0,s)}function Vy(n,e,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),t.setTexture2DArray(e||s0,s)}function Yy(n){switch(n){case 5126:return Ay;case 35664:return Ty;case 35665:return Ry;case 35666:return Cy;case 35674:return Ly;case 35675:return Py;case 35676:return Dy;case 5124:case 35670:return Iy;case 35667:case 35671:return Oy;case 35668:case 35672:return Ny;case 35669:case 35673:return Fy;case 5125:return ky;case 36294:return Uy;case 36295:return By;case 36296:return zy;case 35678:case 36198:case 36298:case 36306:case 35682:return Gy;case 35679:case 36299:case 36307:return Hy;case 35680:case 36300:case 36308:case 36293:return Wy;case 36289:case 36303:case 36311:case 36292:return Vy}}function Xy(n,e){n.uniform1fv(this.addr,e)}function Ky(n,e){const t=Or(e,this.size,2);n.uniform2fv(this.addr,t)}function qy(n,e){const t=Or(e,this.size,3);n.uniform3fv(this.addr,t)}function $y(n,e){const t=Or(e,this.size,4);n.uniform4fv(this.addr,t)}function Zy(n,e){const t=Or(e,this.size,4);n.uniformMatrix2fv(this.addr,!1,t)}function Jy(n,e){const t=Or(e,this.size,9);n.uniformMatrix3fv(this.addr,!1,t)}function Qy(n,e){const t=Or(e,this.size,16);n.uniformMatrix4fv(this.addr,!1,t)}function jy(n,e){n.uniform1iv(this.addr,e)}function e_(n,e){n.uniform2iv(this.addr,e)}function t_(n,e){n.uniform3iv(this.addr,e)}function n_(n,e){n.uniform4iv(this.addr,e)}function i_(n,e){n.uniform1uiv(this.addr,e)}function s_(n,e){n.uniform2uiv(this.addr,e)}function r_(n,e){n.uniform3uiv(this.addr,e)}function a_(n,e){n.uniform4uiv(this.addr,e)}function o_(n,e,t){const i=this.cache,s=e.length,r=Go(t,s);dn(i,r)||(n.uniform1iv(this.addr,r),fn(i,r));let a;this.type===n.SAMPLER_2D_SHADOW?a=Kc:a=i0;for(let o=0;o!==s;++o)t.setTexture2D(e[o]||a,r[o])}function l_(n,e,t){const i=this.cache,s=e.length,r=Go(t,s);dn(i,r)||(n.uniform1iv(this.addr,r),fn(i,r));for(let a=0;a!==s;++a)t.setTexture3D(e[a]||r0,r[a])}function c_(n,e,t){const i=this.cache,s=e.length,r=Go(t,s);dn(i,r)||(n.uniform1iv(this.addr,r),fn(i,r));for(let a=0;a!==s;++a)t.setTextureCube(e[a]||a0,r[a])}function h_(n,e,t){const i=this.cache,s=e.length,r=Go(t,s);dn(i,r)||(n.uniform1iv(this.addr,r),fn(i,r));for(let a=0;a!==s;++a)t.setTexture2DArray(e[a]||s0,r[a])}function u_(n){switch(n){case 5126:return Xy;case 35664:return Ky;case 35665:return qy;case 35666:return $y;case 35674:return Zy;case 35675:return Jy;case 35676:return Qy;case 5124:case 35670:return jy;case 35667:case 35671:return e_;case 35668:case 35672:return t_;case 35669:case 35673:return n_;case 5125:return i_;case 36294:return s_;case 36295:return r_;case 36296:return a_;case 35678:case 36198:case 36298:case 36306:case 35682:return o_;case 35679:case 36299:case 36307:return l_;case 35680:case 36300:case 36308:case 36293:return c_;case 36289:case 36303:case 36311:case 36292:return h_}}class d_{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.setValue=Yy(t.type)}}class f_{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=u_(t.type)}}class p_{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,i){const s=this.seq;for(let r=0,a=s.length;r!==a;++r){const o=s[r];o.setValue(e,t[o.id],i)}}}const Dl=/(\w+)(\])?(\[|\.)?/g;function fd(n,e){n.seq.push(e),n.map[e.id]=e}function m_(n,e,t){const i=n.name,s=i.length;for(Dl.lastIndex=0;;){const r=Dl.exec(i),a=Dl.lastIndex;let o=r[1];const h=r[2]==="]",c=r[3];if(h&&(o=o|0),c===void 0||c==="["&&a+2===s){fd(t,c===void 0?new d_(o,n,e):new f_(o,n,e));break}else{let f=t.map[o];f===void 0&&(f=new p_(o),fd(t,f)),t=f}}}class lo{constructor(e,t){this.seq=[],this.map={};const i=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let a=0;a<i;++a){const o=e.getActiveUniform(t,a),h=e.getUniformLocation(t,o.name);m_(o,h,this)}const s=[],r=[];for(const a of this.seq)a.type===e.SAMPLER_2D_SHADOW||a.type===e.SAMPLER_CUBE_SHADOW||a.type===e.SAMPLER_2D_ARRAY_SHADOW?s.push(a):r.push(a);s.length>0&&(this.seq=s.concat(r))}setValue(e,t,i,s){const r=this.map[t];r!==void 0&&r.setValue(e,i,s)}setOptional(e,t,i){const s=t[i];s!==void 0&&this.setValue(e,i,s)}static upload(e,t,i,s){for(let r=0,a=t.length;r!==a;++r){const o=t[r],h=i[o.id];h.needsUpdate!==!1&&o.setValue(e,h.value,s)}}static seqWithValue(e,t){const i=[];for(let s=0,r=e.length;s!==r;++s){const a=e[s];a.id in t&&i.push(a)}return i}}function pd(n,e,t){const i=n.createShader(e);return n.shaderSource(i,t),n.compileShader(i),i}const g_=37297;let x_=0;function M_(n,e){const t=n.split(`
`),i=[],s=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let a=s;a<r;a++){const o=a+1;i.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return i.join(`
`)}const md=new nt;function v_(n){ft._getMatrix(md,ft.workingColorSpace,n);const e=`mat3( ${md.elements.map(t=>t.toFixed(4))} )`;switch(ft.getTransfer(n)){case _o:return[e,"LinearTransferOETF"];case Dt:return[e,"sRGBTransferOETF"];default:return et("WebGLProgram: Unsupported color space: ",n),[e,"LinearTransferOETF"]}}function gd(n,e,t){const i=n.getShaderParameter(e,n.COMPILE_STATUS),r=(n.getShaderInfoLog(e)||"").trim();if(i&&r==="")return"";const a=/ERROR: 0:(\d+)/.exec(r);if(a){const o=parseInt(a[1]);return t.toUpperCase()+`

`+r+`

`+M_(n.getShaderSource(e),o)}else return r}function b_(n,e){const t=v_(e);return[`vec4 ${n}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}const y_={[Af]:"Linear",[Tf]:"Reinhard",[Rf]:"Cineon",[Cf]:"ACESFilmic",[Pf]:"AgX",[Df]:"Neutral",[Lf]:"Custom"};function __(n,e){const t=y_[e];return t===void 0?(et("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+n+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+n+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const qa=new V;function w_(){ft.getLuminanceCoefficients(qa);const n=qa.x.toFixed(4),e=qa.y.toFixed(4),t=qa.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${n}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function S_(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",n.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(jr).join(`
`)}function E_(n){const e=[];for(const t in n){const i=n[t];i!==!1&&e.push("#define "+t+" "+i)}return e.join(`
`)}function A_(n,e){const t={},i=n.getProgramParameter(e,n.ACTIVE_ATTRIBUTES);for(let s=0;s<i;s++){const r=n.getActiveAttrib(e,s),a=r.name;let o=1;r.type===n.FLOAT_MAT2&&(o=2),r.type===n.FLOAT_MAT3&&(o=3),r.type===n.FLOAT_MAT4&&(o=4),t[a]={type:r.type,location:n.getAttribLocation(e,a),locationSize:o}}return t}function jr(n){return n!==""}function xd(n,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return n.replace(/NUM_SUN_LIGHTS/g,e.numSunLights).replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,e.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Md(n,e){return n.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const T_=/^[ \t]*#include +<([\w\d./]+)>/gm;function qc(n){return n.replace(T_,C_)}const R_=new Map;function C_(n,e){let t=lt[e];if(t===void 0){const i=R_.get(e);if(i!==void 0)t=lt[i],et('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,i);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+e+">")}return qc(t)}const L_=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function vd(n){return n.replace(L_,P_)}function P_(n,e,t,i){let s="";for(let r=parseInt(e);r<parseInt(t);r++)s+=i.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function bd(n){let e=`precision ${n.precision} float;
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
#define LOW_PRECISION`),e}const D_={[io]:"SHADOWMAP_TYPE_PCF",[Qr]:"SHADOWMAP_TYPE_VSM"};function I_(n){return D_[n.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const O_={[Us]:"ENVMAP_TYPE_CUBE",[Sr]:"ENVMAP_TYPE_CUBE",[Bo]:"ENVMAP_TYPE_CUBE_UV"};function N_(n){return n.envMap===!1?"ENVMAP_TYPE_CUBE":O_[n.envMapMode]||"ENVMAP_TYPE_CUBE"}const F_={[Sr]:"ENVMAP_MODE_REFRACTION"};function k_(n){return n.envMap===!1?"ENVMAP_MODE_REFLECTION":F_[n.envMapMode]||"ENVMAP_MODE_REFLECTION"}const U_={[Ef]:"ENVMAP_BLENDING_MULTIPLY",[EM]:"ENVMAP_BLENDING_MIX",[AM]:"ENVMAP_BLENDING_ADD"};function B_(n){return n.envMap===!1?"ENVMAP_BLENDING_NONE":U_[n.combine]||"ENVMAP_BLENDING_NONE"}function z_(n){const e=n.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,i=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:i,maxMip:t}}function G_(n,e,t,i){const s=n.getContext(),r=t.defines;let a=t.vertexShader,o=t.fragmentShader;const h=I_(t),c=N_(t),d=k_(t),f=B_(t),u=z_(t),p=S_(t),g=E_(r),M=s.createProgram();let x,m,v=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(x=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(jr).join(`
`),x.length>0&&(x+=`
`),m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(jr).join(`
`),m.length>0&&(m+=`
`)):(x=[bd(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+d:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexNormals?"#define HAS_NORMAL":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+h:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(jr).join(`
`),m=[bd(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+d:"",t.envMap?"#define "+f:"",u?"#define CUBEUV_TEXEL_WIDTH "+u.texelWidth:"",u?"#define CUBEUV_TEXEL_HEIGHT "+u.texelHeight:"",u?"#define CUBEUV_MAX_MIP "+u.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.retroreflection?"#define USE_RETROREFLECTION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas||t.batchingColor?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+h:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Di?"#define TONE_MAPPING":"",t.toneMapping!==Di?lt.tonemapping_pars_fragment:"",t.toneMapping!==Di?__("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",lt.colorspace_pars_fragment,b_("linearToOutputTexel",t.outputColorSpace),w_(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(jr).join(`
`)),a=qc(a),a=xd(a,t),a=Md(a,t),o=qc(o),o=xd(o,t),o=Md(o,t),a=vd(a),o=vd(o),t.isRawShaderMaterial!==!0&&(v=`#version 300 es
`,x=[p,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+x,m=["#define varying in",t.glslVersion===Au?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Au?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+m);const _=v+x+a,w=v+m+o,A=pd(s,s.VERTEX_SHADER,_),y=pd(s,s.FRAGMENT_SHADER,w);s.attachShader(M,A),s.attachShader(M,y),t.index0AttributeName!==void 0?s.bindAttribLocation(M,0,t.index0AttributeName):t.hasPositionAttribute===!0&&s.bindAttribLocation(M,0,"position"),s.linkProgram(M);function S(T){if(n.debug.checkShaderErrors){const R=s.getProgramInfoLog(M)||"",O=s.getShaderInfoLog(A)||"",I=s.getShaderInfoLog(y)||"",k=R.trim(),U=O.trim(),W=I.trim();let ne=!0,K=!0;if(s.getProgramParameter(M,s.LINK_STATUS)===!1)if(ne=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(s,M,A,y);else{const re=gd(s,A,"vertex"),N=gd(s,y,"fragment");Mt("WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(M,s.VALIDATE_STATUS)+`

Material Name: `+T.name+`
Material Type: `+T.type+`

Program Info Log: `+k+`
`+re+`
`+N)}else k!==""?et("WebGLProgram: Program Info Log:",k):(U===""||W==="")&&(K=!1);K&&(T.diagnostics={runnable:ne,programLog:k,vertexShader:{log:U,prefix:x},fragmentShader:{log:W,prefix:m}})}s.deleteShader(A),s.deleteShader(y),b=new lo(s,M),E=A_(s,M)}let b;this.getUniforms=function(){return b===void 0&&S(this),b};let E;this.getAttributes=function(){return E===void 0&&S(this),E};let C=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return C===!1&&(C=s.getProgramParameter(M,g_)),C},this.destroy=function(){i.releaseStatesOfProgram(this),s.deleteProgram(M),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=x_++,this.cacheKey=e,this.usedTimes=1,this.program=M,this.vertexShader=A,this.fragmentShader=y,this}let H_=0;class W_{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,i){const s=this._getShaderCacheForMaterial(e);return s.has(t)===!1&&(s.add(t),t.usedTimes++),s.has(i)===!1&&(s.add(i),i.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const i of t)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let i=t.get(e);return i===void 0&&(i=new Set,t.set(e,i)),i}_getShaderStage(e){const t=this.shaderCache;let i=t.get(e);return i===void 0&&(i=new V_(e),t.set(e,i)),i}}class V_{constructor(e){this.id=H_++,this.code=e,this.usedTimes=0}}function Y_(n){return n===Bs||n===bo||n===yo}function X_(n,e,t,i,s,r){const a=new Hf,o=new W_,h=new Set,c=[],d=new Map,f=i.logarithmicDepthBuffer;let u=i.precision;const p={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function g(b){return h.add(b),b===0?"uv":`uv${b}`}function M(b,E,C,T,R,O){const I=T.fog,k=R.geometry,U=b.isMeshStandardMaterial||b.isMeshLambertMaterial||b.isMeshPhongMaterial?T.environment:null,W=b.isMeshStandardMaterial||b.isMeshLambertMaterial&&!b.envMap||b.isMeshPhongMaterial&&!b.envMap,ne=e.get(b.envMap||U,W),K=ne&&ne.mapping===Bo?ne.image.height:null,re=p[b.type];b.precision!==null&&(u=i.getMaxPrecision(b.precision),u!==b.precision&&et("WebGLProgram.getParameters:",b.precision,"not supported, using",u,"instead."));const N=k.morphAttributes.position||k.morphAttributes.normal||k.morphAttributes.color,te=N!==void 0?N.length:0;let ae=0;k.morphAttributes.position!==void 0&&(ae=1),k.morphAttributes.normal!==void 0&&(ae=2),k.morphAttributes.color!==void 0&&(ae=3);let pe,be,Pe,q;if(re){const Bt=Ai[re];pe=Bt.vertexShader,be=Bt.fragmentShader}else{pe=b.vertexShader,be=b.fragmentShader;const Bt=o.getVertexShaderStage(b),Et=o.getFragmentShaderStage(b);o.update(b,Bt,Et),Pe=Bt.id,q=Et.id}const ee=n.getRenderTarget(),B=n.state.buffers.depth.getReversed(),ce=R.isInstancedMesh===!0,H=R.isBatchedMesh===!0,Z=!!b.map,fe=!!b.matcap,he=!!ne,$=!!b.aoMap,le=!!b.lightMap,ve=!!b.bumpMap&&b.wireframe===!1,Ie=!!b.normalMap,Ve=!!b.displacementMap,Ke=!!b.emissiveMap,Fe=!!b.metalnessMap,He=!!b.roughnessMap,z=b.anisotropy>0,$e=b.clearcoat>0,Be=b.dispersion>0,F=b.retroreflectivity>0,L=b.iridescence>0,G=b.sheen>0,J=b.transmission>0,ie=z&&!!b.anisotropyMap,Me=$e&&!!b.clearcoatMap,ye=$e&&!!b.clearcoatNormalMap,oe=$e&&!!b.clearcoatRoughnessMap,ue=L&&!!b.iridescenceMap,_e=L&&!!b.iridescenceThicknessMap,ze=G&&!!b.sheenColorMap,Te=G&&!!b.sheenRoughnessMap,Se=!!b.specularMap,Ye=!!b.specularColorMap,Je=!!b.specularIntensityMap,it=J&&!!b.transmissionMap,X=J&&!!b.thicknessMap,Ee=!!b.gradientMap,de=!!b.alphaMap,Ae=b.alphaTest>0,De=!!b.alphaHash,ge=!!b.extensions;let Xe=Di;b.toneMapped&&(ee===null||ee.isXRRenderTarget===!0)&&(Xe=n.toneMapping);const Ge={shaderID:re,shaderType:b.type,shaderName:b.name,vertexShader:pe,fragmentShader:be,defines:b.defines,customVertexShaderID:Pe,customFragmentShaderID:q,isRawShaderMaterial:b.isRawShaderMaterial===!0,glslVersion:b.glslVersion,precision:u,batching:H,batchingColor:H&&R._colorsTexture!==null,instancing:ce,instancingColor:ce&&R.instanceColor!==null,instancingMorph:ce&&R.morphTexture!==null,outputColorSpace:ee===null?n.outputColorSpace:ee.isXRRenderTarget===!0?ee.texture.colorSpace:ft.workingColorSpace,alphaToCoverage:!!b.alphaToCoverage,map:Z,matcap:fe,envMap:he,envMapMode:he&&ne.mapping,envMapCubeUVHeight:K,aoMap:$,lightMap:le,bumpMap:ve,normalMap:Ie,displacementMap:Ve,emissiveMap:Ke,normalMapObjectSpace:Ie&&b.normalMapType===CM,normalMapTangentSpace:Ie&&b.normalMapType===Eu,packedNormalMap:Ie&&b.normalMapType===Eu&&Y_(b.normalMap.format),metalnessMap:Fe,roughnessMap:He,anisotropy:z,anisotropyMap:ie,clearcoat:$e,clearcoatMap:Me,clearcoatNormalMap:ye,clearcoatRoughnessMap:oe,dispersion:Be,retroreflection:F,iridescence:L,iridescenceMap:ue,iridescenceThicknessMap:_e,sheen:G,sheenColorMap:ze,sheenRoughnessMap:Te,specularMap:Se,specularColorMap:Ye,specularIntensityMap:Je,transmission:J,transmissionMap:it,thicknessMap:X,gradientMap:Ee,opaque:b.transparent===!1&&b.blending===mr&&b.alphaToCoverage===!1,alphaMap:de,alphaTest:Ae,alphaHash:De,combine:b.combine,mapUv:Z&&g(b.map.channel),aoMapUv:$&&g(b.aoMap.channel),lightMapUv:le&&g(b.lightMap.channel),bumpMapUv:ve&&g(b.bumpMap.channel),normalMapUv:Ie&&g(b.normalMap.channel),displacementMapUv:Ve&&g(b.displacementMap.channel),emissiveMapUv:Ke&&g(b.emissiveMap.channel),metalnessMapUv:Fe&&g(b.metalnessMap.channel),roughnessMapUv:He&&g(b.roughnessMap.channel),anisotropyMapUv:ie&&g(b.anisotropyMap.channel),clearcoatMapUv:Me&&g(b.clearcoatMap.channel),clearcoatNormalMapUv:ye&&g(b.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:oe&&g(b.clearcoatRoughnessMap.channel),iridescenceMapUv:ue&&g(b.iridescenceMap.channel),iridescenceThicknessMapUv:_e&&g(b.iridescenceThicknessMap.channel),sheenColorMapUv:ze&&g(b.sheenColorMap.channel),sheenRoughnessMapUv:Te&&g(b.sheenRoughnessMap.channel),specularMapUv:Se&&g(b.specularMap.channel),specularColorMapUv:Ye&&g(b.specularColorMap.channel),specularIntensityMapUv:Je&&g(b.specularIntensityMap.channel),transmissionMapUv:it&&g(b.transmissionMap.channel),thicknessMapUv:X&&g(b.thicknessMap.channel),alphaMapUv:de&&g(b.alphaMap.channel),vertexTangents:!!k.attributes.tangent&&(Ie||z),vertexNormals:!!k.attributes.normal,vertexColors:b.vertexColors,vertexAlphas:b.vertexColors===!0&&!!k.attributes.color&&k.attributes.color.itemSize===4,pointsUvs:R.isPoints===!0&&!!k.attributes.uv&&(Z||de),fog:!!I,useFog:b.fog===!0,fogExp2:!!I&&I.isFogExp2,flatShading:b.wireframe===!1&&(b.flatShading===!0||k.attributes.normal===void 0&&Ie===!1&&(b.isMeshLambertMaterial||b.isMeshPhongMaterial||b.isMeshStandardMaterial||b.isMeshPhysicalMaterial)),sizeAttenuation:b.sizeAttenuation===!0,logarithmicDepthBuffer:f,reversedDepthBuffer:B,skinning:R.isSkinnedMesh===!0,hasPositionAttribute:k.attributes.position!==void 0,morphTargets:k.morphAttributes.position!==void 0,morphNormals:k.morphAttributes.normal!==void 0,morphColors:k.morphAttributes.color!==void 0,morphTargetsCount:te,morphTextureStride:ae,numSunLights:E.sun.length,numDirLights:E.directional.length,numPointLights:E.point.length,numSpotLights:E.spot.length,numSpotLightMaps:E.spotLightMap.length,numRectAreaLights:E.rectArea.length,numHemiLights:E.hemi.length,numSunLightShadows:E.sunShadowMap.length,numDirLightShadows:E.directionalShadowMap.length,numPointLightShadows:E.pointShadowMap.length,numSpotLightShadows:E.spotShadowMap.length,numSpotLightShadowsWithMaps:E.numSpotLightShadowsWithMaps,numLightProbes:E.numLightProbes,numLightProbeGrids:O.length,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:b.dithering,shadowMapEnabled:n.shadowMap.enabled&&C.length>0,shadowMapType:n.shadowMap.type,toneMapping:Xe,decodeVideoTexture:Z&&b.map.isVideoTexture===!0&&ft.getTransfer(b.map.colorSpace)===Dt,decodeVideoTextureEmissive:Ke&&b.emissiveMap.isVideoTexture===!0&&ft.getTransfer(b.emissiveMap.colorSpace)===Dt,premultipliedAlpha:b.premultipliedAlpha,doubleSided:b.side===ti,flipSided:b.side===Hn,useDepthPacking:b.depthPacking>=0,depthPacking:b.depthPacking||0,index0AttributeName:b.index0AttributeName,extensionClipCullDistance:ge&&b.extensions.clipCullDistance===!0&&t.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(ge&&b.extensions.multiDraw===!0||H)&&t.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:t.has("KHR_parallel_shader_compile"),customProgramCacheKey:b.customProgramCacheKey()};return Ge.vertexUv1s=h.has(1),Ge.vertexUv2s=h.has(2),Ge.vertexUv3s=h.has(3),h.clear(),Ge}function x(b){const E=[];if(b.shaderID?E.push(b.shaderID):(E.push(b.customVertexShaderID),E.push(b.customFragmentShaderID)),b.defines!==void 0)for(const C in b.defines)E.push(C),E.push(b.defines[C]);return b.isRawShaderMaterial===!1&&(m(E,b),v(E,b),E.push(n.outputColorSpace)),E.push(b.customProgramCacheKey),E.join()}function m(b,E){b.push(E.precision),b.push(E.outputColorSpace),b.push(E.envMapMode),b.push(E.envMapCubeUVHeight),b.push(E.mapUv),b.push(E.alphaMapUv),b.push(E.lightMapUv),b.push(E.aoMapUv),b.push(E.bumpMapUv),b.push(E.normalMapUv),b.push(E.displacementMapUv),b.push(E.emissiveMapUv),b.push(E.metalnessMapUv),b.push(E.roughnessMapUv),b.push(E.anisotropyMapUv),b.push(E.clearcoatMapUv),b.push(E.clearcoatNormalMapUv),b.push(E.clearcoatRoughnessMapUv),b.push(E.iridescenceMapUv),b.push(E.iridescenceThicknessMapUv),b.push(E.sheenColorMapUv),b.push(E.sheenRoughnessMapUv),b.push(E.specularMapUv),b.push(E.specularColorMapUv),b.push(E.specularIntensityMapUv),b.push(E.transmissionMapUv),b.push(E.thicknessMapUv),b.push(E.combine),b.push(E.fogExp2),b.push(E.sizeAttenuation),b.push(E.morphTargetsCount),b.push(E.morphAttributeCount),b.push(E.numSunLights),b.push(E.numDirLights),b.push(E.numPointLights),b.push(E.numSpotLights),b.push(E.numSpotLightMaps),b.push(E.numHemiLights),b.push(E.numRectAreaLights),b.push(E.numSunLightShadows),b.push(E.numDirLightShadows),b.push(E.numPointLightShadows),b.push(E.numSpotLightShadows),b.push(E.numSpotLightShadowsWithMaps),b.push(E.numLightProbes),b.push(E.shadowMapType),b.push(E.toneMapping),b.push(E.numClippingPlanes),b.push(E.numClipIntersection),b.push(E.depthPacking)}function v(b,E){a.disableAll(),E.instancing&&a.enable(0),E.instancingColor&&a.enable(1),E.instancingMorph&&a.enable(2),E.matcap&&a.enable(3),E.envMap&&a.enable(4),E.normalMapObjectSpace&&a.enable(5),E.normalMapTangentSpace&&a.enable(6),E.clearcoat&&a.enable(7),E.iridescence&&a.enable(8),E.alphaTest&&a.enable(9),E.vertexColors&&a.enable(10),E.vertexAlphas&&a.enable(11),E.vertexUv1s&&a.enable(12),E.vertexUv2s&&a.enable(13),E.vertexUv3s&&a.enable(14),E.vertexTangents&&a.enable(15),E.anisotropy&&a.enable(16),E.alphaHash&&a.enable(17),E.batching&&a.enable(18),E.dispersion&&a.enable(19),E.retroreflection&&a.enable(24),E.batchingColor&&a.enable(20),E.gradientMap&&a.enable(21),E.packedNormalMap&&a.enable(22),E.vertexNormals&&a.enable(23),b.push(a.mask),a.disableAll(),E.fog&&a.enable(0),E.useFog&&a.enable(1),E.flatShading&&a.enable(2),E.logarithmicDepthBuffer&&a.enable(3),E.reversedDepthBuffer&&a.enable(4),E.skinning&&a.enable(5),E.morphTargets&&a.enable(6),E.morphNormals&&a.enable(7),E.morphColors&&a.enable(8),E.premultipliedAlpha&&a.enable(9),E.shadowMapEnabled&&a.enable(10),E.doubleSided&&a.enable(11),E.flipSided&&a.enable(12),E.useDepthPacking&&a.enable(13),E.dithering&&a.enable(14),E.transmission&&a.enable(15),E.sheen&&a.enable(16),E.opaque&&a.enable(17),E.pointsUvs&&a.enable(18),E.decodeVideoTexture&&a.enable(19),E.decodeVideoTextureEmissive&&a.enable(20),E.alphaToCoverage&&a.enable(21),E.numLightProbeGrids>0&&a.enable(22),E.hasPositionAttribute&&a.enable(23),b.push(a.mask)}function _(b){const E=p[b.type];let C;if(E){const T=Ai[E];C=pv.clone(T.uniforms)}else C=b.uniforms;return C}function w(b,E){let C=d.get(E);return C!==void 0?++C.usedTimes:(C=new G_(n,E,b,s),c.push(C),d.set(E,C)),C}function A(b){if(--b.usedTimes===0){const E=c.indexOf(b);c[E]=c[c.length-1],c.pop(),d.delete(b.cacheKey),b.destroy()}}function y(b){o.remove(b)}function S(){o.dispose()}return{getParameters:M,getProgramCacheKey:x,getUniforms:_,acquireProgram:w,releaseProgram:A,releaseShaderCache:y,programs:c,dispose:S}}function K_(){let n=new WeakMap;function e(a){return n.has(a)}function t(a){let o=n.get(a);return o===void 0&&(o={},n.set(a,o)),o}function i(a){n.delete(a)}function s(a,o,h){n.get(a)[o]=h}function r(){n=new WeakMap}return{has:e,get:t,remove:i,update:s,dispose:r}}function q_(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.material.id!==e.material.id?n.material.id-e.material.id:n.materialVariant!==e.materialVariant?n.materialVariant-e.materialVariant:n.z!==e.z?n.z-e.z:n.id-e.id}function yd(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.z!==e.z?e.z-n.z:n.id-e.id}function _d(){const n=[];let e=0;const t=[],i=[],s=[];function r(){e=0,t.length=0,i.length=0,s.length=0}function a(u){let p=0;return u.isInstancedMesh&&(p+=2),u.isSkinnedMesh&&(p+=1),p}function o(u,p,g,M,x,m){let v=n[e];return v===void 0?(v={id:u.id,object:u,geometry:p,material:g,materialVariant:a(u),groupOrder:M,renderOrder:u.renderOrder,z:x,group:m},n[e]=v):(v.id=u.id,v.object=u,v.geometry=p,v.material=g,v.materialVariant=a(u),v.groupOrder=M,v.renderOrder=u.renderOrder,v.z=x,v.group=m),e++,v}function h(u,p,g,M,x,m,v){v.reversedDepth===!0&&(x=-x);const _=o(u,p,g,M,x,m);g.transmission>0?i.push(_):g.transparent===!0?s.push(_):t.push(_)}function c(u,p,g,M,x,m){const v=o(u,p,g,M,x,m);g.transmission>0?i.unshift(v):g.transparent===!0?s.unshift(v):t.unshift(v)}function d(u,p){t.length>1&&t.sort(u||q_),i.length>1&&i.sort(p||yd),s.length>1&&s.sort(p||yd)}function f(){for(let u=e,p=n.length;u<p;u++){const g=n[u];if(g.id===null)break;g.id=null,g.object=null,g.geometry=null,g.material=null,g.group=null}}return{opaque:t,transmissive:i,transparent:s,init:r,push:h,unshift:c,finish:f,sort:d}}function $_(){let n=new WeakMap;function e(i,s){const r=n.get(i);let a;return r===void 0?(a=new _d,n.set(i,[a])):s>=r.length?(a=new _d,r.push(a)):a=r[s],a}function t(){n=new WeakMap}return{get:e,dispose:t}}function Z_(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={direction:new V,color:new ht};break;case"SpotLight":t={position:new V,direction:new V,color:new ht,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new V,color:new ht,distance:0,decay:0};break;case"HemisphereLight":t={direction:new V,skyColor:new ht,groundColor:new ht};break;case"RectAreaLight":t={color:new ht,position:new V,halfWidth:new V,halfHeight:new V};break}return n[e.id]=t,t}}}function J_(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new tt};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new tt};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new tt,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[e.id]=t,t}}}let Q_=0;function j_(n,e){return(e.castShadow?2:0)-(n.castShadow?2:0)+(e.map?1:0)-(n.map?1:0)}function ew(n){const e=new Z_,t=J_(),i={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)i.probe.push(new V);const s=new V,r=new kt,a=new kt;function o(c){let d=0,f=0,u=0;for(let R=0;R<9;R++)i.probe[R].set(0,0,0);let p=0,g=0,M=0,x=0,m=0,v=0,_=0,w=0,A=0,y=0,S=0,b=0,E=0,C=0;c.sort(j_);for(let R=0,O=c.length;R<O;R++){const I=c[R],k=I.color,U=I.intensity,W=I.distance;let ne=null;if(I.shadow&&I.shadow.map&&(I.shadow.map.texture.format===Bs?ne=I.shadow.map.texture:ne=I.shadow.map.depthTexture||I.shadow.map.texture),I.isAmbientLight)d+=k.r*U,f+=k.g*U,u+=k.b*U;else if(I.isLightProbe){for(let K=0;K<9;K++)i.probe[K].addScaledVector(I.sh.coefficients[K],U);C++}else if(I.isSunLight){const K=e.get(I);if(K.color.copy(I.color).multiplyScalar(I.intensity),I.castShadow){const re=I.shadow,N=t.get(I);N.shadowIntensity=re.intensity,N.shadowBias=re.bias,N.shadowNormalBias=re.normalBias,N.shadowRadius=re.radius,N.shadowMapSize.copy(re.mapSize).multiply(re.getFrameExtents()),i.sunShadow[g]=N,i.sunShadowMap[g]=ne;const te=re.getViewportCount();for(let ae=0;ae<te;ae++)i.sunShadowMatrix[M+ae]=re.getMatrix(ae),i.sunShadowCascade[M+ae]=re._cascadeData[ae];M+=te,g++}i.sun[p]=K,p++}else if(I.isDirectionalLight){const K=e.get(I);if(K.color.copy(I.color).multiplyScalar(I.intensity),I.castShadow){const re=I.shadow,N=t.get(I);N.shadowIntensity=re.intensity,N.shadowBias=re.bias,N.shadowNormalBias=re.normalBias,N.shadowRadius=re.radius,N.shadowMapSize=re.mapSize,i.directionalShadow[x]=N,i.directionalShadowMap[x]=ne,i.directionalShadowMatrix[x]=I.shadow.matrix,A++}i.directional[x]=K,x++}else if(I.isSpotLight){const K=e.get(I);K.position.setFromMatrixPosition(I.matrixWorld),K.color.copy(k).multiplyScalar(U),K.distance=W,K.coneCos=Math.cos(I.angle),K.penumbraCos=Math.cos(I.angle*(1-I.penumbra)),K.decay=I.decay,i.spot[v]=K;const re=I.shadow;if(I.map&&(i.spotLightMap[b]=I.map,b++,re.updateMatrices(I),I.castShadow&&E++),i.spotLightMatrix[v]=re.matrix,I.castShadow){const N=t.get(I);N.shadowIntensity=re.intensity,N.shadowBias=re.bias,N.shadowNormalBias=re.normalBias,N.shadowRadius=re.radius,N.shadowMapSize=re.mapSize,i.spotShadow[v]=N,i.spotShadowMap[v]=ne,S++}v++}else if(I.isRectAreaLight){const K=e.get(I);K.color.copy(k).multiplyScalar(U),K.halfWidth.set(I.width*.5,0,0),K.halfHeight.set(0,I.height*.5,0),i.rectArea[_]=K,_++}else if(I.isPointLight){const K=e.get(I);if(K.color.copy(I.color).multiplyScalar(I.intensity),K.distance=I.distance,K.decay=I.decay,I.castShadow){const re=I.shadow,N=t.get(I);N.shadowIntensity=re.intensity,N.shadowBias=re.bias,N.shadowNormalBias=re.normalBias,N.shadowRadius=re.radius,N.shadowMapSize=re.mapSize,N.shadowCameraNear=re.camera.near,N.shadowCameraFar=re.camera.far,i.pointShadow[m]=N,i.pointShadowMap[m]=ne,i.pointShadowMatrix[m]=I.shadow.matrix,y++}i.point[m]=K,m++}else if(I.isHemisphereLight){const K=e.get(I);K.skyColor.copy(I.color).multiplyScalar(U),K.groundColor.copy(I.groundColor).multiplyScalar(U),i.hemi[w]=K,w++}}_>0&&(n.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=Re.LTC_FLOAT_1,i.rectAreaLTC2=Re.LTC_FLOAT_2):(i.rectAreaLTC1=Re.LTC_HALF_1,i.rectAreaLTC2=Re.LTC_HALF_2)),i.ambient[0]=d,i.ambient[1]=f,i.ambient[2]=u;const T=i.hash;(T.sunLength!==p||T.directionalLength!==x||T.pointLength!==m||T.spotLength!==v||T.rectAreaLength!==_||T.hemiLength!==w||T.numSunShadows!==g||T.numDirectionalShadows!==A||T.numPointShadows!==y||T.numSpotShadows!==S||T.numSpotMaps!==b||T.numLightProbes!==C)&&(i.sun.length=p,i.directional.length=x,i.spot.length=v,i.rectArea.length=_,i.point.length=m,i.hemi.length=w,i.sunShadow.length=g,i.sunShadowMap.length=g,i.sunShadowMatrix.length=M,i.sunShadowCascade.length=M,i.directionalShadow.length=A,i.directionalShadowMap.length=A,i.directionalShadowMatrix.length=A,i.pointShadow.length=y,i.pointShadowMap.length=y,i.pointShadowMatrix.length=y,i.spotShadow.length=S,i.spotShadowMap.length=S,i.spotLightMatrix.length=S+b-E,i.spotLightMap.length=b,i.numSpotLightShadowsWithMaps=E,i.numLightProbes=C,T.sunLength=p,T.directionalLength=x,T.pointLength=m,T.spotLength=v,T.rectAreaLength=_,T.hemiLength=w,T.numSunShadows=g,T.numDirectionalShadows=A,T.numPointShadows=y,T.numSpotShadows=S,T.numSpotMaps=b,T.numLightProbes=C,i.version=Q_++)}function h(c,d){let f=0,u=0,p=0,g=0,M=0,x=0;const m=d.matrixWorldInverse;for(let v=0,_=c.length;v<_;v++){const w=c[v];if(w.isSunLight){const A=i.sun[f];A.direction.setFromMatrixPosition(w.matrixWorld),A.direction.transformDirection(m),f++}else if(w.isDirectionalLight){const A=i.directional[u];A.direction.setFromMatrixPosition(w.matrixWorld),s.setFromMatrixPosition(w.target.matrixWorld),A.direction.sub(s),A.direction.transformDirection(m),u++}else if(w.isSpotLight){const A=i.spot[g];A.position.setFromMatrixPosition(w.matrixWorld),A.position.applyMatrix4(m),A.direction.setFromMatrixPosition(w.matrixWorld),s.setFromMatrixPosition(w.target.matrixWorld),A.direction.sub(s),A.direction.transformDirection(m),g++}else if(w.isRectAreaLight){const A=i.rectArea[M];A.position.setFromMatrixPosition(w.matrixWorld),A.position.applyMatrix4(m),a.identity(),r.copy(w.matrixWorld),r.premultiply(m),a.extractRotation(r),A.halfWidth.set(w.width*.5,0,0),A.halfHeight.set(0,w.height*.5,0),A.halfWidth.applyMatrix4(a),A.halfHeight.applyMatrix4(a),M++}else if(w.isPointLight){const A=i.point[p];A.position.setFromMatrixPosition(w.matrixWorld),A.position.applyMatrix4(m),p++}else if(w.isHemisphereLight){const A=i.hemi[x];A.direction.setFromMatrixPosition(w.matrixWorld),A.direction.transformDirection(m),x++}}}return{setup:o,setupView:h,state:i}}function wd(n){const e=new ew(n),t=[],i=[],s=[];function r(u){f.camera=u,t.length=0,i.length=0,s.length=0}function a(u){t.push(u)}function o(u){i.push(u)}function h(u){s.push(u)}function c(){e.setup(t)}function d(u){e.setupView(t,u)}const f={lightsArray:t,shadowsArray:i,lightProbeGridArray:s,camera:null,lights:e,transmissionRenderTarget:{},textureUnits:0};return{init:r,state:f,setupLights:c,setupLightsView:d,pushLight:a,pushShadow:o,pushLightProbeGrid:h}}function tw(n){let e=new WeakMap;function t(s,r=0){const a=e.get(s);let o;return a===void 0?(o=new wd(n),e.set(s,[o])):r>=a.length?(o=new wd(n),a.push(o)):o=a[r],o}function i(){e=new WeakMap}return{get:t,dispose:i}}const nw=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,iw=`uniform sampler2D shadow_pass;
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
}`,sw=[new V(1,0,0),new V(-1,0,0),new V(0,1,0),new V(0,-1,0),new V(0,0,1),new V(0,0,-1)],rw=[new V(0,-1,0),new V(0,-1,0),new V(0,0,1),new V(0,0,-1),new V(0,-1,0),new V(0,-1,0)],Sd=new kt,$r=new V,Il=new V;function aw(n,e,t){let i=new Eo;const s=new tt,r=new tt,a=new at,o=new Mv,h=new vv,c={},d=t.maxTextureSize,f={[ks]:Hn,[Hn]:ks,[ti]:ti},u=new xt({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new tt},radius:{value:4}},vertexShader:nw,fragmentShader:iw}),p=u.clone();p.defines.HORIZONTAL_PASS=1;const g=new Qt;g.setAttribute("position",new Nn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const M=new Yt(g,u),x=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=io;let m=this.type;this.render=function(y,S,b){if(x.enabled===!1||x.autoUpdate===!1&&x.needsUpdate===!1||y.length===0)return;this.type===cM&&(et("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."),this.type=io);const E=n.getRenderTarget(),C=n.getActiveCubeFace(),T=n.getActiveMipmapLevel(),R=n.state;R.setBlending(Li),R.buffers.depth.getReversed()===!0?R.buffers.color.setClear(0,0,0,0):R.buffers.color.setClear(1,1,1,1),R.buffers.depth.setTest(!0),R.setScissorTest(!1);const O=m!==this.type;O&&S.traverse(function(I){I.material&&(Array.isArray(I.material)?I.material.forEach(k=>k.needsUpdate=!0):I.material.needsUpdate=!0)});for(let I=0,k=y.length;I<k;I++){const U=y[I],W=U.shadow;if(W===void 0){et("WebGLShadowMap:",U,"has no shadow.");continue}if(W.autoUpdate===!1&&W.needsUpdate===!1)continue;s.copy(W.mapSize);const ne=W.getFrameExtents();s.multiply(ne),r.copy(W.mapSize),(s.x>d||s.y>d)&&(s.x>d&&(r.x=Math.floor(d/ne.x),s.x=r.x*ne.x,W.mapSize.x=r.x),s.y>d&&(r.y=Math.floor(d/ne.y),s.y=r.y*ne.y,W.mapSize.y=r.y));const K=n.state.buffers.depth.getReversed();if(W.camera._reversedDepth=K,W.map===null||O===!0){if(W.map!==null&&(W.map.depthTexture!==null&&(W.map.depthTexture.dispose(),W.map.depthTexture=null),W.map.dispose()),this.type===Qr){if(U.isPointLight){et("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}W.map=new ii(s.x,s.y,{format:Bs,type:Ni,minFilter:Jt,magFilter:Jt,generateMipmaps:!1}),W.map.texture.name=U.name+".shadowMap",W.map.depthTexture=new Er(s.x,s.y,fi),W.map.depthTexture.name=U.name+".shadowMapDepth",W.map.depthTexture.format=Ki,W.map.depthTexture.compareFunction=null,W.map.depthTexture.minFilter=Ht,W.map.depthTexture.magFilter=Ht}else U.isPointLight?(W.map=new n0(s.x),W.map.depthTexture=new dv(s.x,Oi)):(W.map=new ii(s.x,s.y),W.map.depthTexture=new Er(s.x,s.y,Oi)),W.map.depthTexture.name=U.name+".shadowMap",W.map.depthTexture.format=Ki,this.type===io?(W.map.depthTexture.compareFunction=K?Ch:Rh,W.map.depthTexture.minFilter=Jt,W.map.depthTexture.magFilter=Jt):(W.map.depthTexture.compareFunction=null,W.map.depthTexture.minFilter=Ht,W.map.depthTexture.magFilter=Ht);W.camera.updateProjectionMatrix()}W.map.isWebGLCubeRenderTarget!==!0&&(W.map.width!==s.x||W.map.height!==s.y)&&W.map.setSize(s.x,s.y);const re=W.map.isWebGLCubeRenderTarget?6:W.getViewportCount();U.isPointLight!==!0&&W.updateMatrices(U,b);for(let N=0;N<re;N++){const te=W.getCamera(N);if(U.isPointLight){const ae=W.camera,pe=W.matrix,be=U.distance||ae.far;be!==ae.far&&(ae.far=be,ae.updateProjectionMatrix()),$r.setFromMatrixPosition(U.matrixWorld),ae.position.copy($r),Il.copy(ae.position),Il.add(sw[N]),ae.up.copy(rw[N]),ae.lookAt(Il),ae.updateMatrixWorld(),pe.makeTranslation(-$r.x,-$r.y,-$r.z),Sd.multiplyMatrices(ae.projectionMatrix,ae.matrixWorldInverse),W._frustum.setFromProjectionMatrix(Sd,ae.coordinateSystem,ae.reversedDepth)}if(W.map.isWebGLCubeRenderTarget)n.setRenderTarget(W.map,N),n.clear();else{N===0&&(n.setRenderTarget(W.map),n.clear());const ae=W.getViewport(N);a.set(r.x*ae.x,r.y*ae.y,r.x*ae.z,r.y*ae.w),R.viewport(a)}i=W.getFrustum(N),w(S,b,te,U,this.type)}W.isPointLightShadow!==!0&&this.type===Qr&&v(W,b),W.needsUpdate=!1}m=this.type,x.needsUpdate=!1,n.setRenderTarget(E,C,T)};function v(y,S){const b=e.update(M);u.defines.VSM_SAMPLES!==y.blurSamples&&(u.defines.VSM_SAMPLES=y.blurSamples,p.defines.VSM_SAMPLES=y.blurSamples,u.needsUpdate=!0,p.needsUpdate=!0),y.mapPass===null?y.mapPass=new ii(s.x,s.y,{format:Bs,type:Ni}):(y.mapPass.width!==y.map.width||y.mapPass.height!==y.map.height)&&y.mapPass.setSize(y.map.width,y.map.height),u.uniforms.shadow_pass.value=y.map.depthTexture,u.uniforms.resolution.value.set(y.map.width,y.map.height),u.uniforms.radius.value=y.radius,n.setRenderTarget(y.mapPass),n.clear(),n.renderBufferDirect(S,null,b,u,M,null),p.uniforms.shadow_pass.value=y.mapPass.texture,p.uniforms.resolution.value.set(y.map.width,y.map.height),p.uniforms.radius.value=y.radius,n.setRenderTarget(y.map),n.clear(),n.renderBufferDirect(S,null,b,p,M,null)}function _(y,S,b,E){let C=null;const T=b.isPointLight===!0?y.customDistanceMaterial:y.customDepthMaterial;if(T!==void 0)C=T;else if(C=b.isPointLight===!0?h:o,n.localClippingEnabled&&S.clipShadows===!0&&Array.isArray(S.clippingPlanes)&&S.clippingPlanes.length!==0||S.displacementMap&&S.displacementScale!==0||S.alphaMap&&S.alphaTest>0||S.map&&S.alphaTest>0||S.alphaToCoverage===!0){const R=C.uuid,O=S.uuid;let I=c[R];I===void 0&&(I={},c[R]=I);let k=I[O];k===void 0&&(k=C.clone(),I[O]=k,S.addEventListener("dispose",A)),C=k}if(C.visible=S.visible,C.wireframe=S.wireframe,E===Qr?C.side=S.shadowSide!==null?S.shadowSide:S.side:C.side=S.shadowSide!==null?S.shadowSide:f[S.side],C.alphaMap=S.alphaMap,C.alphaTest=S.alphaToCoverage===!0?.5:S.alphaTest,C.map=S.map,C.clipShadows=S.clipShadows,C.clippingPlanes=S.clippingPlanes,C.clipIntersection=S.clipIntersection,C.displacementMap=S.displacementMap,C.displacementScale=S.displacementScale,C.displacementBias=S.displacementBias,C.wireframeLinewidth=S.wireframeLinewidth,C.linewidth=S.linewidth,b.isPointLight===!0&&C.isMeshDistanceMaterial===!0){const R=n.properties.get(C);R.light=b}return C}function w(y,S,b,E,C){if(y.visible===!1)return;if(y.layers.test(S.layers)&&(y.isMesh||y.isLine||y.isPoints)&&(y.castShadow||y.receiveShadow&&C===Qr)&&(!y.frustumCulled||y.intersectsFrustum(i))){y.modelViewMatrix.multiplyMatrices(b.matrixWorldInverse,y.matrixWorld);const O=e.update(y),I=y.material;if(Array.isArray(I)){const k=O.groups;for(let U=0,W=k.length;U<W;U++){const ne=k[U],K=I[ne.materialIndex];if(K&&K.visible){const re=_(y,K,E,C);y.onBeforeShadow(n,y,S,b,O,re,ne),n.renderBufferDirect(b,null,O,re,y,ne),y.onAfterShadow(n,y,S,b,O,re,ne)}}}else if(I.visible){const k=_(y,I,E,C);y.onBeforeShadow(n,y,S,b,O,k,null),n.renderBufferDirect(b,null,O,k,y,null),y.onAfterShadow(n,y,S,b,O,k,null)}}const R=y.children;for(let O=0,I=R.length;O<I;O++)w(R[O],S,b,E,C)}function A(y){y.target.removeEventListener("dispose",A);for(const b in c){const E=c[b],C=y.target.uuid;C in E&&(E[C].dispose(),delete E[C])}}}function ow(n,e){function t(){let X=!1;const Ee=new at;let de=null;const Ae=new at(0,0,0,0);return{setMask:function(De){de!==De&&!X&&(n.colorMask(De,De,De,De),de=De)},setLocked:function(De){X=De},setClear:function(De,ge,Xe,Ge,Bt){Bt===!0&&(De*=Ge,ge*=Ge,Xe*=Ge),Ee.set(De,ge,Xe,Ge),Ae.equals(Ee)===!1&&(n.clearColor(De,ge,Xe,Ge),Ae.copy(Ee))},reset:function(){X=!1,de=null,Ae.set(-1,0,0,0)}}}function i(){let X=!1,Ee=!1,de=null,Ae=null,De=null;return{setReversed:function(ge){if(Ee!==ge){const Xe=e.get("EXT_clip_control");ge?Xe.clipControlEXT(Xe.LOWER_LEFT_EXT,Xe.ZERO_TO_ONE_EXT):Xe.clipControlEXT(Xe.LOWER_LEFT_EXT,Xe.NEGATIVE_ONE_TO_ONE_EXT),Ee=ge;const Ge=De;De=null,this.setClear(Ge)}},getReversed:function(){return Ee},setTest:function(ge){ge?ee(n.DEPTH_TEST):B(n.DEPTH_TEST)},setMask:function(ge){de!==ge&&!X&&(n.depthMask(ge),de=ge)},setFunc:function(ge){if(Ee&&(ge=GM[ge]),Ae!==ge){switch(ge){case lc:n.depthFunc(n.NEVER);break;case cc:n.depthFunc(n.ALWAYS);break;case hc:n.depthFunc(n.LESS);break;case ia:n.depthFunc(n.LEQUAL);break;case uc:n.depthFunc(n.EQUAL);break;case dc:n.depthFunc(n.GEQUAL);break;case Mo:n.depthFunc(n.GREATER);break;case fc:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}Ae=ge}},setLocked:function(ge){X=ge},setClear:function(ge){De!==ge&&(De=ge,Ee&&(ge=1-ge),n.clearDepth(ge))},reset:function(){X=!1,de=null,Ae=null,De=null,Ee=!1}}}function s(){let X=!1,Ee=null,de=null,Ae=null,De=null,ge=null,Xe=null,Ge=null,Bt=null;return{setTest:function(Et){X||(Et?ee(n.STENCIL_TEST):B(n.STENCIL_TEST))},setMask:function(Et){Ee!==Et&&!X&&(n.stencilMask(Et),Ee=Et)},setFunc:function(Et,ri,vi){(de!==Et||Ae!==ri||De!==vi)&&(n.stencilFunc(Et,ri,vi),de=Et,Ae=ri,De=vi)},setOp:function(Et,ri,vi){(ge!==Et||Xe!==ri||Ge!==vi)&&(n.stencilOp(Et,ri,vi),ge=Et,Xe=ri,Ge=vi)},setLocked:function(Et){X=Et},setClear:function(Et){Bt!==Et&&(n.clearStencil(Et),Bt=Et)},reset:function(){X=!1,Ee=null,de=null,Ae=null,De=null,ge=null,Xe=null,Ge=null,Bt=null}}}const r=new t,a=new i,o=new s,h=new WeakMap,c=new WeakMap;let d={},f={},u={},p=new WeakMap,g=[],M=null,x=!1,m=null,v=null,_=null,w=null,A=null,y=null,S=null,b=new ht(0,0,0),E=0,C=!1,T=null,R=null,O=null,I=null,k=null;const U=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let W=!1,ne=0;const K=n.getParameter(n.VERSION);K.indexOf("WebGL")!==-1?(ne=parseFloat(/^WebGL (\d)/.exec(K)[1]),W=ne>=1):K.indexOf("OpenGL ES")!==-1&&(ne=parseFloat(/^OpenGL ES (\d)/.exec(K)[1]),W=ne>=2);let re=null,N={};const te=n.getParameter(n.SCISSOR_BOX),ae=n.getParameter(n.VIEWPORT),pe=new at().fromArray(te),be=new at().fromArray(ae);function Pe(X,Ee,de,Ae){const De=new Uint8Array(4),ge=n.createTexture();n.bindTexture(X,ge),n.texParameteri(X,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(X,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let Xe=0;Xe<de;Xe++)X===n.TEXTURE_3D||X===n.TEXTURE_2D_ARRAY?n.texImage3D(Ee,0,n.RGBA,1,1,Ae,0,n.RGBA,n.UNSIGNED_BYTE,De):n.texImage2D(Ee+Xe,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,De);return ge}const q={};q[n.TEXTURE_2D]=Pe(n.TEXTURE_2D,n.TEXTURE_2D,1),q[n.TEXTURE_CUBE_MAP]=Pe(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),q[n.TEXTURE_2D_ARRAY]=Pe(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),q[n.TEXTURE_3D]=Pe(n.TEXTURE_3D,n.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),o.setClear(0),ee(n.DEPTH_TEST),a.setFunc(ia),ve(!1),Ie(_u),ee(n.CULL_FACE),$(Li);function ee(X){d[X]!==!0&&(n.enable(X),d[X]=!0)}function B(X){d[X]!==!1&&(n.disable(X),d[X]=!1)}function ce(X,Ee){return u[X]!==Ee?(n.bindFramebuffer(X,Ee),u[X]=Ee,X===n.DRAW_FRAMEBUFFER&&(u[n.FRAMEBUFFER]=Ee),X===n.FRAMEBUFFER&&(u[n.DRAW_FRAMEBUFFER]=Ee),!0):!1}function H(X,Ee){let de=g,Ae=!1;if(X){de=p.get(Ee),de===void 0&&(de=[],p.set(Ee,de));const De=X.textures;if(de.length!==De.length||de[0]!==n.COLOR_ATTACHMENT0){for(let ge=0,Xe=De.length;ge<Xe;ge++)de[ge]=n.COLOR_ATTACHMENT0+ge;de.length=De.length,Ae=!0}}else de[0]!==n.BACK&&(de[0]=n.BACK,Ae=!0);Ae&&n.drawBuffers(de)}function Z(X){return M!==X?(n.useProgram(X),M=X,!0):!1}const fe={[hr]:n.FUNC_ADD,[hM]:n.FUNC_SUBTRACT,[uM]:n.FUNC_REVERSE_SUBTRACT};fe[dM]=n.MIN,fe[fM]=n.MAX;const he={[xh]:n.ZERO,[pM]:n.ONE,[Mh]:n.SRC_COLOR,[vh]:n.SRC_ALPHA,[bM]:n.SRC_ALPHA_SATURATE,[MM]:n.DST_COLOR,[gM]:n.DST_ALPHA,[mM]:n.ONE_MINUS_SRC_COLOR,[bh]:n.ONE_MINUS_SRC_ALPHA,[vM]:n.ONE_MINUS_DST_COLOR,[xM]:n.ONE_MINUS_DST_ALPHA,[yM]:n.CONSTANT_COLOR,[_M]:n.ONE_MINUS_CONSTANT_COLOR,[wM]:n.CONSTANT_ALPHA,[SM]:n.ONE_MINUS_CONSTANT_ALPHA};function $(X,Ee,de,Ae,De,ge,Xe,Ge,Bt,Et){if(X===Li){x===!0&&(B(n.BLEND),x=!1);return}if(x===!1&&(ee(n.BLEND),x=!0),X!==Uo){if(X!==m||Et!==C){if((v!==hr||A!==hr)&&(n.blendEquation(n.FUNC_ADD),v=hr,A=hr),Et)switch(X){case mr:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case Pi:n.blendFunc(n.ONE,n.ONE);break;case wu:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case Su:n.blendFuncSeparate(n.DST_COLOR,n.ONE_MINUS_SRC_ALPHA,n.ZERO,n.ONE);break;default:Mt("WebGLState: Invalid blending: ",X);break}else switch(X){case mr:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case Pi:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE,n.ONE,n.ONE);break;case wu:Mt("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Su:Mt("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:Mt("WebGLState: Invalid blending: ",X);break}_=null,w=null,y=null,S=null,b.set(0,0,0),E=0,m=X,C=Et}return}De=De||Ee,ge=ge||de,Xe=Xe||Ae,(Ee!==v||De!==A)&&(n.blendEquationSeparate(fe[Ee],fe[De]),v=Ee,A=De),(de!==_||Ae!==w||ge!==y||Xe!==S)&&(n.blendFuncSeparate(he[de],he[Ae],he[ge],he[Xe]),_=de,w=Ae,y=ge,S=Xe),(Ge.equals(b)===!1||Bt!==E)&&(n.blendColor(Ge.r,Ge.g,Ge.b,Bt),b.copy(Ge),E=Bt),m=X,C=!1}function le(X,Ee){X.side===ti?B(n.CULL_FACE):ee(n.CULL_FACE);let de=X.side===Hn;Ee&&(de=!de),ve(de),X.blending===mr&&X.transparent===!1?$(Li):$(X.blending,X.blendEquation,X.blendSrc,X.blendDst,X.blendEquationAlpha,X.blendSrcAlpha,X.blendDstAlpha,X.blendColor,X.blendAlpha,X.premultipliedAlpha),a.setFunc(X.depthFunc),a.setTest(X.depthTest),a.setMask(X.depthWrite),r.setMask(X.colorWrite);const Ae=X.stencilWrite;o.setTest(Ae),Ae&&(o.setMask(X.stencilWriteMask),o.setFunc(X.stencilFunc,X.stencilRef,X.stencilFuncMask),o.setOp(X.stencilFail,X.stencilZFail,X.stencilZPass)),Ke(X.polygonOffset,X.polygonOffsetFactor,X.polygonOffsetUnits),X.alphaToCoverage===!0?ee(n.SAMPLE_ALPHA_TO_COVERAGE):B(n.SAMPLE_ALPHA_TO_COVERAGE)}function ve(X){T!==X&&(X?n.frontFace(n.CW):n.frontFace(n.CCW),T=X)}function Ie(X){X!==oM?(ee(n.CULL_FACE),X!==R&&(X===_u?n.cullFace(n.BACK):X===lM?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):B(n.CULL_FACE),R=X}function Ve(X){X!==O&&(W&&n.lineWidth(X),O=X)}function Ke(X,Ee,de){X?(ee(n.POLYGON_OFFSET_FILL),(I!==Ee||k!==de)&&(I=Ee,k=de,a.getReversed()&&(Ee=-Ee),n.polygonOffset(Ee,de))):B(n.POLYGON_OFFSET_FILL)}function Fe(X){X?ee(n.SCISSOR_TEST):B(n.SCISSOR_TEST)}function He(X){X===void 0&&(X=n.TEXTURE0+U-1),re!==X&&(n.activeTexture(X),re=X)}function z(X,Ee,de){de===void 0&&(re===null?de=n.TEXTURE0+U-1:de=re);let Ae=N[de];Ae===void 0&&(Ae={type:void 0,texture:void 0},N[de]=Ae),(Ae.type!==X||Ae.texture!==Ee)&&(re!==de&&(n.activeTexture(de),re=de),n.bindTexture(X,Ee||q[X]),Ae.type=X,Ae.texture=Ee)}function $e(){const X=N[re];X!==void 0&&X.type!==void 0&&(n.bindTexture(X.type,null),X.type=void 0,X.texture=void 0)}function Be(){try{n.compressedTexImage2D(...arguments)}catch(X){Mt("WebGLState:",X)}}function F(){try{n.compressedTexImage3D(...arguments)}catch(X){Mt("WebGLState:",X)}}function L(){try{n.texSubImage2D(...arguments)}catch(X){Mt("WebGLState:",X)}}function G(){try{n.texSubImage3D(...arguments)}catch(X){Mt("WebGLState:",X)}}function J(){try{n.compressedTexSubImage2D(...arguments)}catch(X){Mt("WebGLState:",X)}}function ie(){try{n.compressedTexSubImage3D(...arguments)}catch(X){Mt("WebGLState:",X)}}function Me(){try{n.texStorage2D(...arguments)}catch(X){Mt("WebGLState:",X)}}function ye(){try{n.texStorage3D(...arguments)}catch(X){Mt("WebGLState:",X)}}function oe(){try{n.texImage2D(...arguments)}catch(X){Mt("WebGLState:",X)}}function ue(){try{n.texImage3D(...arguments)}catch(X){Mt("WebGLState:",X)}}function _e(X){return f[X]!==void 0?f[X]:n.getParameter(X)}function ze(X,Ee){f[X]!==Ee&&(n.pixelStorei(X,Ee),f[X]=Ee)}function Te(X){pe.equals(X)===!1&&(n.scissor(X.x,X.y,X.z,X.w),pe.copy(X))}function Se(X){be.equals(X)===!1&&(n.viewport(X.x,X.y,X.z,X.w),be.copy(X))}function Ye(X,Ee){let de=c.get(Ee);de===void 0&&(de=new WeakMap,c.set(Ee,de));let Ae=de.get(X);Ae===void 0&&(Ae=n.getUniformBlockIndex(Ee,X.name),de.set(X,Ae))}function Je(X,Ee){const Ae=c.get(Ee).get(X);h.get(Ee)!==Ae&&(n.uniformBlockBinding(Ee,Ae,X.__bindingPointIndex),h.set(Ee,Ae))}function it(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),a.setReversed(!1),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),n.pixelStorei(n.PACK_ALIGNMENT,4),n.pixelStorei(n.UNPACK_ALIGNMENT,4),n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,!1),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,n.BROWSER_DEFAULT_WEBGL),n.pixelStorei(n.PACK_ROW_LENGTH,0),n.pixelStorei(n.PACK_SKIP_PIXELS,0),n.pixelStorei(n.PACK_SKIP_ROWS,0),n.pixelStorei(n.UNPACK_ROW_LENGTH,0),n.pixelStorei(n.UNPACK_IMAGE_HEIGHT,0),n.pixelStorei(n.UNPACK_SKIP_PIXELS,0),n.pixelStorei(n.UNPACK_SKIP_ROWS,0),n.pixelStorei(n.UNPACK_SKIP_IMAGES,0),d={},f={},re=null,N={},u={},p=new WeakMap,g=[],M=null,x=!1,m=null,v=null,_=null,w=null,A=null,y=null,S=null,b=new ht(0,0,0),E=0,C=!1,T=null,R=null,O=null,I=null,k=null,pe.set(0,0,n.canvas.width,n.canvas.height),be.set(0,0,n.canvas.width,n.canvas.height),r.reset(),a.reset(),o.reset()}return{buffers:{color:r,depth:a,stencil:o},enable:ee,disable:B,bindFramebuffer:ce,drawBuffers:H,useProgram:Z,setBlending:$,setMaterial:le,setFlipSided:ve,setCullFace:Ie,setLineWidth:Ve,setPolygonOffset:Ke,setScissorTest:Fe,activeTexture:He,bindTexture:z,unbindTexture:$e,compressedTexImage2D:Be,compressedTexImage3D:F,texImage2D:oe,texImage3D:ue,pixelStorei:ze,getParameter:_e,updateUBOMapping:Ye,uniformBlockBinding:Je,texStorage2D:Me,texStorage3D:ye,texSubImage2D:L,texSubImage3D:G,compressedTexSubImage2D:J,compressedTexSubImage3D:ie,scissor:Te,viewport:Se,reset:it}}function lw(n,e,t,i,s,r,a){const o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,h=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new tt,d=new WeakMap,f=new Set;let u;const p=new WeakMap;let g=!1;try{g=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function M(F,L){return g?new OffscreenCanvas(F,L):So("canvas")}function x(F,L,G){let J=1;const ie=Be(F);if((ie.width>G||ie.height>G)&&(J=G/Math.max(ie.width,ie.height)),J<1)if(typeof HTMLImageElement<"u"&&F instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&F instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&F instanceof ImageBitmap||typeof VideoFrame<"u"&&F instanceof VideoFrame){const Me=Math.floor(J*ie.width),ye=Math.floor(J*ie.height);u===void 0&&(u=M(Me,ye));const oe=L?M(Me,ye):u;return oe.width=Me,oe.height=ye,oe.getContext("2d").drawImage(F,0,0,Me,ye),et("WebGLRenderer: Texture has been resized from ("+ie.width+"x"+ie.height+") to ("+Me+"x"+ye+")."),oe}else return"data"in F&&et("WebGLRenderer: Image in DataTexture is too big ("+ie.width+"x"+ie.height+")."),F;return F}function m(F){return F.generateMipmaps}function v(F){n.generateMipmap(F)}function _(F){return F.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:F.isWebGL3DRenderTarget?n.TEXTURE_3D:F.isWebGLArrayRenderTarget||F.isCompressedArrayTexture?n.TEXTURE_2D_ARRAY:n.TEXTURE_2D}function w(F,L,G,J,ie,Me=!1){if(F!==null){if(n[F]!==void 0)return n[F];et("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+F+"'")}let ye;J&&(ye=e.get("EXT_texture_norm16"),ye||et("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let oe=L;if(L===n.RED&&(G===n.FLOAT&&(oe=n.R32F),G===n.HALF_FLOAT&&(oe=n.R16F),G===n.UNSIGNED_BYTE&&(oe=n.R8),G===n.UNSIGNED_SHORT&&ye&&(oe=ye.R16_EXT),G===n.SHORT&&ye&&(oe=ye.R16_SNORM_EXT)),L===n.RED_INTEGER&&(G===n.UNSIGNED_BYTE&&(oe=n.R8UI),G===n.UNSIGNED_SHORT&&(oe=n.R16UI),G===n.UNSIGNED_INT&&(oe=n.R32UI),G===n.BYTE&&(oe=n.R8I),G===n.SHORT&&(oe=n.R16I),G===n.INT&&(oe=n.R32I)),L===n.RG&&(G===n.FLOAT&&(oe=n.RG32F),G===n.HALF_FLOAT&&(oe=n.RG16F),G===n.UNSIGNED_BYTE&&(oe=n.RG8),G===n.UNSIGNED_SHORT&&ye&&(oe=ye.RG16_EXT),G===n.SHORT&&ye&&(oe=ye.RG16_SNORM_EXT)),L===n.RG_INTEGER&&(G===n.UNSIGNED_BYTE&&(oe=n.RG8UI),G===n.UNSIGNED_SHORT&&(oe=n.RG16UI),G===n.UNSIGNED_INT&&(oe=n.RG32UI),G===n.BYTE&&(oe=n.RG8I),G===n.SHORT&&(oe=n.RG16I),G===n.INT&&(oe=n.RG32I)),L===n.RGB_INTEGER&&(G===n.UNSIGNED_BYTE&&(oe=n.RGB8UI),G===n.UNSIGNED_SHORT&&(oe=n.RGB16UI),G===n.UNSIGNED_INT&&(oe=n.RGB32UI),G===n.BYTE&&(oe=n.RGB8I),G===n.SHORT&&(oe=n.RGB16I),G===n.INT&&(oe=n.RGB32I)),L===n.RGBA_INTEGER&&(G===n.UNSIGNED_BYTE&&(oe=n.RGBA8UI),G===n.UNSIGNED_SHORT&&(oe=n.RGBA16UI),G===n.UNSIGNED_INT&&(oe=n.RGBA32UI),G===n.BYTE&&(oe=n.RGBA8I),G===n.SHORT&&(oe=n.RGBA16I),G===n.INT&&(oe=n.RGBA32I)),L===n.RGB&&(G===n.UNSIGNED_SHORT&&ye&&(oe=ye.RGB16_EXT),G===n.SHORT&&ye&&(oe=ye.RGB16_SNORM_EXT),G===n.UNSIGNED_INT_5_9_9_9_REV&&(oe=n.RGB9_E5),G===n.UNSIGNED_INT_10F_11F_11F_REV&&(oe=n.R11F_G11F_B10F)),L===n.RGBA){const ue=Me?_o:ft.getTransfer(ie);G===n.FLOAT&&(oe=n.RGBA32F),G===n.HALF_FLOAT&&(oe=n.RGBA16F),G===n.UNSIGNED_BYTE&&(oe=ue===Dt?n.SRGB8_ALPHA8:n.RGBA8),G===n.UNSIGNED_SHORT&&ye&&(oe=ye.RGBA16_EXT),G===n.SHORT&&ye&&(oe=ye.RGBA16_SNORM_EXT),G===n.UNSIGNED_SHORT_4_4_4_4&&(oe=n.RGBA4),G===n.UNSIGNED_SHORT_5_5_5_1&&(oe=n.RGB5_A1)}return(oe===n.R16F||oe===n.R32F||oe===n.RG16F||oe===n.RG32F||oe===n.RGBA16F||oe===n.RGBA32F)&&e.get("EXT_color_buffer_float"),oe}function A(F,L){let G;return F?L===null||L===Oi||L===ra?G=n.DEPTH24_STENCIL8:L===fi?G=n.DEPTH32F_STENCIL8:L===sa&&(G=n.DEPTH24_STENCIL8,et("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):L===null||L===Oi||L===ra?G=n.DEPTH_COMPONENT24:L===fi?G=n.DEPTH_COMPONENT32F:L===sa&&(G=n.DEPTH_COMPONENT16),G}function y(F,L){return m(F)===!0||F.isFramebufferTexture&&F.minFilter!==Ht&&F.minFilter!==Jt?Math.log2(Math.max(L.width,L.height))+1:F.mipmaps!==void 0&&F.mipmaps.length>0?F.mipmaps.length:F.isCompressedTexture&&Array.isArray(F.image)?L.mipmaps.length:1}function S(F){const L=F.target;L.removeEventListener("dispose",S),E(L),L.isVideoTexture&&d.delete(L),L.isHTMLTexture&&f.delete(L)}function b(F){const L=F.target;L.removeEventListener("dispose",b),T(L)}function E(F){const L=i.get(F);if(L.__webglInit===void 0)return;const G=F.source,J=p.get(G);if(J){const ie=J[L.__cacheKey];ie.usedTimes--,ie.usedTimes===0&&C(F),Object.keys(J).length===0&&p.delete(G)}i.remove(F)}function C(F){const L=i.get(F);n.deleteTexture(L.__webglTexture);const G=F.source,J=p.get(G);delete J[L.__cacheKey],a.memory.textures--}function T(F){const L=i.get(F);if(F.depthTexture&&(F.depthTexture.dispose(),i.remove(F.depthTexture)),F.isWebGLCubeRenderTarget)for(let J=0;J<6;J++){if(Array.isArray(L.__webglFramebuffer[J]))for(let ie=0;ie<L.__webglFramebuffer[J].length;ie++)n.deleteFramebuffer(L.__webglFramebuffer[J][ie]);else n.deleteFramebuffer(L.__webglFramebuffer[J]);L.__webglDepthbuffer&&n.deleteRenderbuffer(L.__webglDepthbuffer[J])}else{if(Array.isArray(L.__webglFramebuffer))for(let J=0;J<L.__webglFramebuffer.length;J++)n.deleteFramebuffer(L.__webglFramebuffer[J]);else n.deleteFramebuffer(L.__webglFramebuffer);if(L.__webglDepthbuffer&&n.deleteRenderbuffer(L.__webglDepthbuffer),L.__webglMultisampledFramebuffer&&n.deleteFramebuffer(L.__webglMultisampledFramebuffer),L.__webglColorRenderbuffer)for(let J=0;J<L.__webglColorRenderbuffer.length;J++)L.__webglColorRenderbuffer[J]&&n.deleteRenderbuffer(L.__webglColorRenderbuffer[J]);L.__webglDepthRenderbuffer&&n.deleteRenderbuffer(L.__webglDepthRenderbuffer)}const G=F.textures;for(let J=0,ie=G.length;J<ie;J++){const Me=i.get(G[J]);Me.__webglTexture&&(n.deleteTexture(Me.__webglTexture),a.memory.textures--),i.remove(G[J])}i.remove(F)}let R=0;function O(){R=0}function I(){return R}function k(F){R=F}function U(){const F=R;return F>=s.maxTextures&&et("WebGLTextures: Trying to use "+(F+1)+" texture units while this GPU supports only "+s.maxTextures),R+=1,F}function W(F){const L=[];return L.push(F.wrapS),L.push(F.wrapT),L.push(F.wrapR||0),L.push(F.magFilter),L.push(F.minFilter),L.push(F.anisotropy),L.push(F.internalFormat),L.push(F.format),L.push(F.type),L.push(F.generateMipmaps),L.push(F.premultiplyAlpha),L.push(F.flipY),L.push(F.unpackAlignment),L.push(F.colorSpace),L.join()}function ne(F,L){const G=i.get(F);if(F.isVideoTexture&&z(F),F.isRenderTargetTexture===!1&&F.isExternalTexture!==!0&&F.version>0&&G.__version!==F.version){const J=F.image;if(J===null)et("WebGLRenderer: Texture marked for update but no image data found.");else if(J.complete===!1)et("WebGLRenderer: Texture marked for update but image is incomplete");else{B(G,F,L);return}}else F.isExternalTexture&&(G.__webglTexture=F.sourceTexture?F.sourceTexture:null);t.bindTexture(n.TEXTURE_2D,G.__webglTexture,n.TEXTURE0+L)}function K(F,L){const G=i.get(F);if(F.isRenderTargetTexture===!1&&F.version>0&&G.__version!==F.version){B(G,F,L);return}else F.isExternalTexture&&(G.__webglTexture=F.sourceTexture?F.sourceTexture:null);t.bindTexture(n.TEXTURE_2D_ARRAY,G.__webglTexture,n.TEXTURE0+L)}function re(F,L){const G=i.get(F);if(F.isRenderTargetTexture===!1&&F.version>0&&G.__version!==F.version){B(G,F,L);return}t.bindTexture(n.TEXTURE_3D,G.__webglTexture,n.TEXTURE0+L)}function N(F,L){const G=i.get(F);if(F.isCubeDepthTexture!==!0&&F.version>0&&G.__version!==F.version){ce(G,F,L);return}t.bindTexture(n.TEXTURE_CUBE_MAP,G.__webglTexture,n.TEXTURE0+L)}const te={[vo]:n.REPEAT,[Vi]:n.CLAMP_TO_EDGE,[pc]:n.MIRRORED_REPEAT},ae={[Ht]:n.NEAREST,[TM]:n.NEAREST_MIPMAP_NEAREST,[_a]:n.NEAREST_MIPMAP_LINEAR,[Jt]:n.LINEAR,[il]:n.LINEAR_MIPMAP_NEAREST,[Ls]:n.LINEAR_MIPMAP_LINEAR},pe={[PM]:n.NEVER,[FM]:n.ALWAYS,[DM]:n.LESS,[Rh]:n.LEQUAL,[IM]:n.EQUAL,[Ch]:n.GEQUAL,[OM]:n.GREATER,[NM]:n.NOTEQUAL};function be(F,L){if(L.type===fi&&e.has("OES_texture_float_linear")===!1&&(L.magFilter===Jt||L.magFilter===il||L.magFilter===_a||L.magFilter===Ls||L.minFilter===Jt||L.minFilter===il||L.minFilter===_a||L.minFilter===Ls)&&et("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),n.texParameteri(F,n.TEXTURE_WRAP_S,te[L.wrapS]),n.texParameteri(F,n.TEXTURE_WRAP_T,te[L.wrapT]),(F===n.TEXTURE_3D||F===n.TEXTURE_2D_ARRAY)&&n.texParameteri(F,n.TEXTURE_WRAP_R,te[L.wrapR]),n.texParameteri(F,n.TEXTURE_MAG_FILTER,ae[L.magFilter]),n.texParameteri(F,n.TEXTURE_MIN_FILTER,ae[L.minFilter]),L.compareFunction&&(n.texParameteri(F,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(F,n.TEXTURE_COMPARE_FUNC,pe[L.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(L.magFilter===Ht||L.minFilter!==_a&&L.minFilter!==Ls||L.type===fi&&e.has("OES_texture_float_linear")===!1)return;if(L.anisotropy>1||i.get(L).__currentAnisotropy){const G=e.get("EXT_texture_filter_anisotropic");n.texParameterf(F,G.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(L.anisotropy,s.getMaxAnisotropy())),i.get(L).__currentAnisotropy=L.anisotropy}}}function Pe(F,L){let G=!1;F.__webglInit===void 0&&(F.__webglInit=!0,L.addEventListener("dispose",S));const J=L.source;let ie=p.get(J);ie===void 0&&(ie={},p.set(J,ie));const Me=W(L);if(Me!==F.__cacheKey){ie[Me]===void 0&&(ie[Me]={texture:n.createTexture(),usedTimes:0},a.memory.textures++,G=!0),ie[Me].usedTimes++;const ye=ie[F.__cacheKey];ye!==void 0&&(ie[F.__cacheKey].usedTimes--,ye.usedTimes===0&&C(L)),F.__cacheKey=Me,F.__webglTexture=ie[Me].texture}return G}function q(F,L,G){return Math.floor(Math.floor(F/G)/L)}function ee(F,L,G,J){const Me=F.updateRanges;if(Me.length===0)t.texSubImage2D(n.TEXTURE_2D,0,0,0,L.width,L.height,G,J,L.data);else{Me.sort((ze,Te)=>ze.start-Te.start);let ye=0;for(let ze=1;ze<Me.length;ze++){const Te=Me[ye],Se=Me[ze],Ye=Te.start+Te.count,Je=q(Se.start,L.width,4),it=q(Te.start,L.width,4);Se.start<=Ye+1&&Je===it&&q(Se.start+Se.count-1,L.width,4)===Je?Te.count=Math.max(Te.count,Se.start+Se.count-Te.start):(++ye,Me[ye]=Se)}Me.length=ye+1;const oe=t.getParameter(n.UNPACK_ROW_LENGTH),ue=t.getParameter(n.UNPACK_SKIP_PIXELS),_e=t.getParameter(n.UNPACK_SKIP_ROWS);t.pixelStorei(n.UNPACK_ROW_LENGTH,L.width);for(let ze=0,Te=Me.length;ze<Te;ze++){const Se=Me[ze],Ye=Math.floor(Se.start/4),Je=Math.ceil(Se.count/4),it=Ye%L.width,X=Math.floor(Ye/L.width),Ee=Je,de=1;t.pixelStorei(n.UNPACK_SKIP_PIXELS,it),t.pixelStorei(n.UNPACK_SKIP_ROWS,X),t.texSubImage2D(n.TEXTURE_2D,0,it,X,Ee,de,G,J,L.data)}F.clearUpdateRanges(),t.pixelStorei(n.UNPACK_ROW_LENGTH,oe),t.pixelStorei(n.UNPACK_SKIP_PIXELS,ue),t.pixelStorei(n.UNPACK_SKIP_ROWS,_e)}}function B(F,L,G){let J=n.TEXTURE_2D;(L.isDataArrayTexture||L.isCompressedArrayTexture)&&(J=n.TEXTURE_2D_ARRAY),L.isData3DTexture&&(J=n.TEXTURE_3D);const ie=Pe(F,L),Me=L.source;t.bindTexture(J,F.__webglTexture,n.TEXTURE0+G);const ye=i.get(Me);if(Me.version!==ye.__version||ie===!0){if(t.activeTexture(n.TEXTURE0+G),(typeof ImageBitmap<"u"&&L.image instanceof ImageBitmap)===!1){const de=ft.getPrimaries(ft.workingColorSpace),Ae=L.colorSpace===Pn?null:ft.getPrimaries(L.colorSpace),De=L.colorSpace===Pn||de===Ae?n.NONE:n.BROWSER_DEFAULT_WEBGL;t.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,L.flipY),t.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,L.premultiplyAlpha),t.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,De)}t.pixelStorei(n.UNPACK_ALIGNMENT,L.unpackAlignment);let ue=x(L.image,!1,s.maxTextureSize);ue=$e(L,ue);const _e=r.convert(L.format,L.colorSpace),ze=r.convert(L.type);let Te=w(L.internalFormat,_e,ze,L.normalized,L.colorSpace,L.isVideoTexture);be(J,L);let Se;const Ye=L.mipmaps,Je=L.isVideoTexture!==!0,it=ye.__version===void 0||ie===!0,X=Me.dataReady,Ee=y(L,ue);if(L.isDepthTexture)Te=A(L.format===Ps,L.type),it&&(Je?t.texStorage2D(n.TEXTURE_2D,1,Te,ue.width,ue.height):t.texImage2D(n.TEXTURE_2D,0,Te,ue.width,ue.height,0,_e,ze,null));else if(L.isDataTexture)if(Ye.length>0){Je&&it&&t.texStorage2D(n.TEXTURE_2D,Ee,Te,Ye[0].width,Ye[0].height);for(let de=0,Ae=Ye.length;de<Ae;de++)Se=Ye[de],Je?X&&t.texSubImage2D(n.TEXTURE_2D,de,0,0,Se.width,Se.height,_e,ze,Se.data):t.texImage2D(n.TEXTURE_2D,de,Te,Se.width,Se.height,0,_e,ze,Se.data);L.generateMipmaps=!1}else Je?(it&&t.texStorage2D(n.TEXTURE_2D,Ee,Te,ue.width,ue.height),X&&ee(L,ue,_e,ze)):t.texImage2D(n.TEXTURE_2D,0,Te,ue.width,ue.height,0,_e,ze,ue.data);else if(L.isCompressedTexture)if(L.isCompressedArrayTexture){Je&&it&&t.texStorage3D(n.TEXTURE_2D_ARRAY,Ee,Te,Ye[0].width,Ye[0].height,ue.depth);for(let de=0,Ae=Ye.length;de<Ae;de++)if(Se=Ye[de],L.format!==qn)if(_e!==null)if(Je){if(X)if(L.layerUpdates.size>0){const De=nd(Se.width,Se.height,L.format,L.type);for(const ge of L.layerUpdates){const Xe=Se.data.subarray(ge*De/Se.data.BYTES_PER_ELEMENT,(ge+1)*De/Se.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,de,0,0,ge,Se.width,Se.height,1,_e,Xe)}}else t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,de,0,0,0,Se.width,Se.height,ue.depth,_e,Se.data)}else t.compressedTexImage3D(n.TEXTURE_2D_ARRAY,de,Te,Se.width,Se.height,ue.depth,0,Se.data,0,0);else et("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Je?X&&t.texSubImage3D(n.TEXTURE_2D_ARRAY,de,0,0,0,Se.width,Se.height,ue.depth,_e,ze,Se.data):t.texImage3D(n.TEXTURE_2D_ARRAY,de,Te,Se.width,Se.height,ue.depth,0,_e,ze,Se.data);L.layerUpdates.size>0&&L.clearLayerUpdates()}else{Je&&it&&t.texStorage2D(n.TEXTURE_2D,Ee,Te,Ye[0].width,Ye[0].height);for(let de=0,Ae=Ye.length;de<Ae;de++)Se=Ye[de],L.format!==qn?_e!==null?Je?X&&t.compressedTexSubImage2D(n.TEXTURE_2D,de,0,0,Se.width,Se.height,_e,Se.data):t.compressedTexImage2D(n.TEXTURE_2D,de,Te,Se.width,Se.height,0,Se.data):et("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Je?X&&t.texSubImage2D(n.TEXTURE_2D,de,0,0,Se.width,Se.height,_e,ze,Se.data):t.texImage2D(n.TEXTURE_2D,de,Te,Se.width,Se.height,0,_e,ze,Se.data)}else if(L.isDataArrayTexture)if(Je){if(it&&t.texStorage3D(n.TEXTURE_2D_ARRAY,Ee,Te,ue.width,ue.height,ue.depth),X)if(L.layerUpdates.size>0){const de=nd(ue.width,ue.height,L.format,L.type);for(const Ae of L.layerUpdates){const De=ue.data.subarray(Ae*de/ue.data.BYTES_PER_ELEMENT,(Ae+1)*de/ue.data.BYTES_PER_ELEMENT);t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,Ae,ue.width,ue.height,1,_e,ze,De)}L.clearLayerUpdates()}else t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,ue.width,ue.height,ue.depth,_e,ze,ue.data)}else t.texImage3D(n.TEXTURE_2D_ARRAY,0,Te,ue.width,ue.height,ue.depth,0,_e,ze,ue.data);else if(L.isData3DTexture)Je?(it&&t.texStorage3D(n.TEXTURE_3D,Ee,Te,ue.width,ue.height,ue.depth),X&&t.texSubImage3D(n.TEXTURE_3D,0,0,0,0,ue.width,ue.height,ue.depth,_e,ze,ue.data)):t.texImage3D(n.TEXTURE_3D,0,Te,ue.width,ue.height,ue.depth,0,_e,ze,ue.data);else if(L.isFramebufferTexture){if(it)if(Je)t.texStorage2D(n.TEXTURE_2D,Ee,Te,ue.width,ue.height);else{let de=ue.width,Ae=ue.height;for(let De=0;De<Ee;De++)t.texImage2D(n.TEXTURE_2D,De,Te,de,Ae,0,_e,ze,null),de>>=1,Ae>>=1}}else if(L.isHTMLTexture){if("texElementImage2D"in n){const de=n.canvas;if(de.hasAttribute("layoutsubtree")||de.setAttribute("layoutsubtree","true"),ue.parentNode!==de){de.appendChild(ue),f.add(L),de.onpaint=Ae=>{const De=Ae.changedElements;for(const ge of f)De.includes(ge.image)&&(ge.needsUpdate=!0)},de.requestPaint();return}if(n.texElementImage2D.length===3)n.texElementImage2D(n.TEXTURE_2D,n.RGBA8,ue);else{const De=n.RGBA,ge=n.RGBA,Xe=n.UNSIGNED_BYTE;n.texElementImage2D(n.TEXTURE_2D,0,De,ge,Xe,ue)}n.texParameteri(n.TEXTURE_2D,n.TEXTURE_MIN_FILTER,n.LINEAR),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_S,n.CLAMP_TO_EDGE),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_T,n.CLAMP_TO_EDGE)}}else if(Ye.length>0){if(Je&&it){const de=Be(Ye[0]);t.texStorage2D(n.TEXTURE_2D,Ee,Te,de.width,de.height)}for(let de=0,Ae=Ye.length;de<Ae;de++)Se=Ye[de],Je?X&&t.texSubImage2D(n.TEXTURE_2D,de,0,0,_e,ze,Se):t.texImage2D(n.TEXTURE_2D,de,Te,_e,ze,Se);L.generateMipmaps=!1}else if(Je){if(it){const de=Be(ue);t.texStorage2D(n.TEXTURE_2D,Ee,Te,de.width,de.height)}X&&t.texSubImage2D(n.TEXTURE_2D,0,0,0,_e,ze,ue)}else t.texImage2D(n.TEXTURE_2D,0,Te,_e,ze,ue);m(L)&&v(J),ye.__version=Me.version,L.onUpdate&&L.onUpdate(L)}F.__version=L.version}function ce(F,L,G){if(L.image.length!==6)return;const J=Pe(F,L),ie=L.source;t.bindTexture(n.TEXTURE_CUBE_MAP,F.__webglTexture,n.TEXTURE0+G);const Me=i.get(ie);if(ie.version!==Me.__version||J===!0){t.activeTexture(n.TEXTURE0+G);const ye=ft.getPrimaries(ft.workingColorSpace),oe=L.colorSpace===Pn?null:ft.getPrimaries(L.colorSpace),ue=L.colorSpace===Pn||ye===oe?n.NONE:n.BROWSER_DEFAULT_WEBGL;t.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,L.flipY),t.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,L.premultiplyAlpha),t.pixelStorei(n.UNPACK_ALIGNMENT,L.unpackAlignment),t.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,ue);const _e=L.isCompressedTexture||L.image[0].isCompressedTexture,ze=L.image[0]&&L.image[0].isDataTexture,Te=[];for(let ge=0;ge<6;ge++)!_e&&!ze?Te[ge]=x(L.image[ge],!0,s.maxCubemapSize):Te[ge]=ze?L.image[ge].image:L.image[ge],Te[ge]=$e(L,Te[ge]);const Se=Te[0],Ye=r.convert(L.format,L.colorSpace),Je=r.convert(L.type),it=w(L.internalFormat,Ye,Je,L.normalized,L.colorSpace),X=L.isVideoTexture!==!0,Ee=Me.__version===void 0||J===!0,de=ie.dataReady;let Ae=y(L,Se);be(n.TEXTURE_CUBE_MAP,L);let De;if(_e){X&&Ee&&t.texStorage2D(n.TEXTURE_CUBE_MAP,Ae,it,Se.width,Se.height);for(let ge=0;ge<6;ge++){De=Te[ge].mipmaps;for(let Xe=0;Xe<De.length;Xe++){const Ge=De[Xe];L.format!==qn?Ye!==null?X?de&&t.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ge,Xe,0,0,Ge.width,Ge.height,Ye,Ge.data):t.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ge,Xe,it,Ge.width,Ge.height,0,Ge.data):et("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):X?de&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ge,Xe,0,0,Ge.width,Ge.height,Ye,Je,Ge.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ge,Xe,it,Ge.width,Ge.height,0,Ye,Je,Ge.data)}}}else{if(De=L.mipmaps,X&&Ee){De.length>0&&Ae++;const ge=Be(Te[0]);t.texStorage2D(n.TEXTURE_CUBE_MAP,Ae,it,ge.width,ge.height)}for(let ge=0;ge<6;ge++)if(ze){X?de&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ge,0,0,0,Te[ge].width,Te[ge].height,Ye,Je,Te[ge].data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ge,0,it,Te[ge].width,Te[ge].height,0,Ye,Je,Te[ge].data);for(let Xe=0;Xe<De.length;Xe++){const Bt=De[Xe].image[ge].image;X?de&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ge,Xe+1,0,0,Bt.width,Bt.height,Ye,Je,Bt.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ge,Xe+1,it,Bt.width,Bt.height,0,Ye,Je,Bt.data)}}else{X?de&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ge,0,0,0,Ye,Je,Te[ge]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ge,0,it,Ye,Je,Te[ge]);for(let Xe=0;Xe<De.length;Xe++){const Ge=De[Xe];X?de&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ge,Xe+1,0,0,Ye,Je,Ge.image[ge]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ge,Xe+1,it,Ye,Je,Ge.image[ge])}}}m(L)&&v(n.TEXTURE_CUBE_MAP),Me.__version=ie.version,L.onUpdate&&L.onUpdate(L)}F.__version=L.version}function H(F,L,G,J,ie,Me){const ye=r.convert(G.format,G.colorSpace),oe=r.convert(G.type),ue=w(G.internalFormat,ye,oe,G.normalized,G.colorSpace),_e=i.get(L),ze=i.get(G);if(ze.__renderTarget=L,!_e.__hasExternalTextures){const Te=Math.max(1,L.width>>Me),Se=Math.max(1,L.height>>Me);ie===n.TEXTURE_3D||ie===n.TEXTURE_2D_ARRAY?t.texImage3D(ie,Me,ue,Te,Se,L.depth,0,ye,oe,null):t.texImage2D(ie,Me,ue,Te,Se,0,ye,oe,null)}t.bindFramebuffer(n.FRAMEBUFFER,F),He(L)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,J,ie,ze.__webglTexture,0,Fe(L)):(ie===n.TEXTURE_2D||ie>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&ie<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,J,ie,ze.__webglTexture,Me),t.bindFramebuffer(n.FRAMEBUFFER,null)}function Z(F,L,G){if(n.bindRenderbuffer(n.RENDERBUFFER,F),L.depthBuffer){const J=L.depthTexture,ie=J&&J.isDepthTexture?J.type:null,Me=A(L.stencilBuffer,ie),ye=L.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;He(L)?o.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,Fe(L),Me,L.width,L.height):G?n.renderbufferStorageMultisample(n.RENDERBUFFER,Fe(L),Me,L.width,L.height):n.renderbufferStorage(n.RENDERBUFFER,Me,L.width,L.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,ye,n.RENDERBUFFER,F)}else{const J=L.textures;for(let ie=0;ie<J.length;ie++){const Me=J[ie],ye=r.convert(Me.format,Me.colorSpace),oe=r.convert(Me.type),ue=w(Me.internalFormat,ye,oe,Me.normalized,Me.colorSpace);He(L)?o.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,Fe(L),ue,L.width,L.height):G?n.renderbufferStorageMultisample(n.RENDERBUFFER,Fe(L),ue,L.width,L.height):n.renderbufferStorage(n.RENDERBUFFER,ue,L.width,L.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function fe(F,L,G){const J=L.isWebGLCubeRenderTarget===!0;if(t.bindFramebuffer(n.FRAMEBUFFER,F),!(L.depthTexture&&L.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");const ie=i.get(L.depthTexture);if(ie.__renderTarget=L,(!ie.__webglTexture||L.depthTexture.image.width!==L.width||L.depthTexture.image.height!==L.height)&&(L.depthTexture.image.width=L.width,L.depthTexture.image.height=L.height,L.depthTexture.needsUpdate=!0),J){if(ie.__webglInit===void 0&&(ie.__webglInit=!0,L.depthTexture.addEventListener("dispose",S)),ie.__webglTexture===void 0){ie.__webglTexture=n.createTexture(),t.bindTexture(n.TEXTURE_CUBE_MAP,ie.__webglTexture),be(n.TEXTURE_CUBE_MAP,L.depthTexture);const _e=r.convert(L.depthTexture.format),ze=r.convert(L.depthTexture.type);let Te;L.depthTexture.format===Ki?Te=n.DEPTH_COMPONENT24:L.depthTexture.format===Ps&&(Te=n.DEPTH24_STENCIL8);for(let Se=0;Se<6;Se++)n.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Se,0,Te,L.width,L.height,0,_e,ze,null)}}else ne(L.depthTexture,0);const Me=ie.__webglTexture,ye=Fe(L),oe=J?n.TEXTURE_CUBE_MAP_POSITIVE_X+G:n.TEXTURE_2D,ue=L.depthTexture.format===Ps?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;if(L.depthTexture.format===Ki)He(L)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,ue,oe,Me,0,ye):n.framebufferTexture2D(n.FRAMEBUFFER,ue,oe,Me,0);else if(L.depthTexture.format===Ps)He(L)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,ue,oe,Me,0,ye):n.framebufferTexture2D(n.FRAMEBUFFER,ue,oe,Me,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function he(F){const L=i.get(F),G=F.isWebGLCubeRenderTarget===!0;if(L.__boundDepthTexture!==F.depthTexture){const J=F.depthTexture;if(L.__depthDisposeCallback&&L.__depthDisposeCallback(),J){const ie=()=>{delete L.__boundDepthTexture,delete L.__depthDisposeCallback,J.removeEventListener("dispose",ie)};J.addEventListener("dispose",ie),L.__depthDisposeCallback=ie}L.__boundDepthTexture=J}if(F.depthTexture&&!L.__autoAllocateDepthBuffer)if(G)for(let J=0;J<6;J++)fe(L.__webglFramebuffer[J],F,J);else{const J=F.texture.mipmaps;J&&J.length>0?fe(L.__webglFramebuffer[0],F,0):fe(L.__webglFramebuffer,F,0)}else if(G){L.__webglDepthbuffer=[];for(let J=0;J<6;J++)if(t.bindFramebuffer(n.FRAMEBUFFER,L.__webglFramebuffer[J]),L.__webglDepthbuffer[J]===void 0)L.__webglDepthbuffer[J]=n.createRenderbuffer(),Z(L.__webglDepthbuffer[J],F,!1);else{const ie=F.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,Me=L.__webglDepthbuffer[J];n.bindRenderbuffer(n.RENDERBUFFER,Me),n.framebufferRenderbuffer(n.FRAMEBUFFER,ie,n.RENDERBUFFER,Me)}}else{const J=F.texture.mipmaps;if(J&&J.length>0?t.bindFramebuffer(n.FRAMEBUFFER,L.__webglFramebuffer[0]):t.bindFramebuffer(n.FRAMEBUFFER,L.__webglFramebuffer),L.__webglDepthbuffer===void 0)L.__webglDepthbuffer=n.createRenderbuffer(),Z(L.__webglDepthbuffer,F,!1);else{const ie=F.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,Me=L.__webglDepthbuffer;n.bindRenderbuffer(n.RENDERBUFFER,Me),n.framebufferRenderbuffer(n.FRAMEBUFFER,ie,n.RENDERBUFFER,Me)}}t.bindFramebuffer(n.FRAMEBUFFER,null)}function $(F,L,G){const J=i.get(F);L!==void 0&&H(J.__webglFramebuffer,F,F.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),G!==void 0&&he(F)}function le(F){const L=F.texture,G=i.get(F),J=i.get(L);F.addEventListener("dispose",b);const ie=F.textures,Me=F.isWebGLCubeRenderTarget===!0,ye=ie.length>1;if(ye||(J.__webglTexture===void 0&&(J.__webglTexture=n.createTexture()),J.__version=L.version,a.memory.textures++),Me){G.__webglFramebuffer=[];for(let oe=0;oe<6;oe++)if(L.mipmaps&&L.mipmaps.length>0){G.__webglFramebuffer[oe]=[];for(let ue=0;ue<L.mipmaps.length;ue++)G.__webglFramebuffer[oe][ue]=n.createFramebuffer()}else G.__webglFramebuffer[oe]=n.createFramebuffer()}else{if(L.mipmaps&&L.mipmaps.length>0){G.__webglFramebuffer=[];for(let oe=0;oe<L.mipmaps.length;oe++)G.__webglFramebuffer[oe]=n.createFramebuffer()}else G.__webglFramebuffer=n.createFramebuffer();if(ye)for(let oe=0,ue=ie.length;oe<ue;oe++){const _e=i.get(ie[oe]);_e.__webglTexture===void 0&&(_e.__webglTexture=n.createTexture(),a.memory.textures++)}if(F.samples>0&&He(F)===!1){G.__webglMultisampledFramebuffer=n.createFramebuffer(),G.__webglColorRenderbuffer=[],t.bindFramebuffer(n.FRAMEBUFFER,G.__webglMultisampledFramebuffer);for(let oe=0;oe<ie.length;oe++){const ue=ie[oe];G.__webglColorRenderbuffer[oe]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,G.__webglColorRenderbuffer[oe]);const _e=r.convert(ue.format,ue.colorSpace),ze=r.convert(ue.type),Te=w(ue.internalFormat,_e,ze,ue.normalized,ue.colorSpace,F.isXRRenderTarget===!0),Se=Fe(F);n.renderbufferStorageMultisample(n.RENDERBUFFER,Se,Te,F.width,F.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+oe,n.RENDERBUFFER,G.__webglColorRenderbuffer[oe])}n.bindRenderbuffer(n.RENDERBUFFER,null),F.depthBuffer&&(G.__webglDepthRenderbuffer=n.createRenderbuffer(),Z(G.__webglDepthRenderbuffer,F,!0)),t.bindFramebuffer(n.FRAMEBUFFER,null)}}if(Me){t.bindTexture(n.TEXTURE_CUBE_MAP,J.__webglTexture),be(n.TEXTURE_CUBE_MAP,L);for(let oe=0;oe<6;oe++)if(L.mipmaps&&L.mipmaps.length>0)for(let ue=0;ue<L.mipmaps.length;ue++)H(G.__webglFramebuffer[oe][ue],F,L,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+oe,ue);else H(G.__webglFramebuffer[oe],F,L,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+oe,0);m(L)&&v(n.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(ye){for(let oe=0,ue=ie.length;oe<ue;oe++){const _e=ie[oe],ze=i.get(_e);let Te=n.TEXTURE_2D;(F.isWebGL3DRenderTarget||F.isWebGLArrayRenderTarget)&&(Te=F.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(Te,ze.__webglTexture),be(Te,_e),H(G.__webglFramebuffer,F,_e,n.COLOR_ATTACHMENT0+oe,Te,0),m(_e)&&v(Te)}t.unbindTexture()}else{let oe=n.TEXTURE_2D;if((F.isWebGL3DRenderTarget||F.isWebGLArrayRenderTarget)&&(oe=F.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(oe,J.__webglTexture),be(oe,L),L.mipmaps&&L.mipmaps.length>0)for(let ue=0;ue<L.mipmaps.length;ue++)H(G.__webglFramebuffer[ue],F,L,n.COLOR_ATTACHMENT0,oe,ue);else H(G.__webglFramebuffer,F,L,n.COLOR_ATTACHMENT0,oe,0);m(L)&&v(oe),t.unbindTexture()}F.depthBuffer&&he(F)}function ve(F){const L=F.textures;for(let G=0,J=L.length;G<J;G++){const ie=L[G];if(m(ie)){const Me=_(F),ye=i.get(ie).__webglTexture;t.bindTexture(Me,ye),v(Me),t.unbindTexture()}}}const Ie=[],Ve=[];function Ke(F){if(F.samples>0){if(He(F)===!1){const L=F.textures,G=F.width,J=F.height;let ie=n.COLOR_BUFFER_BIT;const Me=F.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,ye=i.get(F),oe=L.length>1;if(oe)for(let _e=0;_e<L.length;_e++)t.bindFramebuffer(n.FRAMEBUFFER,ye.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+_e,n.RENDERBUFFER,null),t.bindFramebuffer(n.FRAMEBUFFER,ye.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+_e,n.TEXTURE_2D,null,0);t.bindFramebuffer(n.READ_FRAMEBUFFER,ye.__webglMultisampledFramebuffer);const ue=F.texture.mipmaps;ue&&ue.length>0?t.bindFramebuffer(n.DRAW_FRAMEBUFFER,ye.__webglFramebuffer[0]):t.bindFramebuffer(n.DRAW_FRAMEBUFFER,ye.__webglFramebuffer);for(let _e=0;_e<L.length;_e++){if(F.resolveDepthBuffer&&(F.depthBuffer&&(ie|=n.DEPTH_BUFFER_BIT),F.stencilBuffer&&F.resolveStencilBuffer&&(ie|=n.STENCIL_BUFFER_BIT)),oe){n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,ye.__webglColorRenderbuffer[_e]);const ze=i.get(L[_e]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,ze,0)}n.blitFramebuffer(0,0,G,J,0,0,G,J,ie,n.NEAREST),h===!0&&(Ie.length=0,Ve.length=0,Ie.push(n.COLOR_ATTACHMENT0+_e),F.depthBuffer&&F.storeMultisampledDepthBuffer===!1&&(Ie.push(Me),Ve.push(Me),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,Ve)),n.invalidateFramebuffer(n.READ_FRAMEBUFFER,Ie))}if(t.bindFramebuffer(n.READ_FRAMEBUFFER,null),t.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),oe)for(let _e=0;_e<L.length;_e++){t.bindFramebuffer(n.FRAMEBUFFER,ye.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+_e,n.RENDERBUFFER,ye.__webglColorRenderbuffer[_e]);const ze=i.get(L[_e]).__webglTexture;t.bindFramebuffer(n.FRAMEBUFFER,ye.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+_e,n.TEXTURE_2D,ze,0)}t.bindFramebuffer(n.DRAW_FRAMEBUFFER,ye.__webglMultisampledFramebuffer)}else if(F.depthBuffer&&F.storeMultisampledDepthBuffer===!1&&h){const L=F.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[L])}}}function Fe(F){return Math.min(s.maxSamples,F.samples)}function He(F){const L=i.get(F);return F.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&L.__useRenderToTexture!==!1}function z(F){const L=a.render.frame;d.get(F)!==L&&(d.set(F,L),F.update())}function $e(F,L){const G=F.colorSpace,J=F.format,ie=F.type;return F.isCompressedTexture===!0||F.isVideoTexture===!0||G!==aa&&G!==Pn&&(ft.getTransfer(G)===Dt?(J!==qn||ie!==Kn)&&et("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):Mt("WebGLTextures: Unsupported texture color space:",G)),L}function Be(F){return typeof HTMLImageElement<"u"&&F instanceof HTMLImageElement?(c.width=F.naturalWidth||F.width,c.height=F.naturalHeight||F.height):typeof VideoFrame<"u"&&F instanceof VideoFrame?(c.width=F.displayWidth,c.height=F.displayHeight):(c.width=F.width,c.height=F.height),c}this.allocateTextureUnit=U,this.resetTextureUnits=O,this.getTextureUnits=I,this.setTextureUnits=k,this.setTexture2D=ne,this.setTexture2DArray=K,this.setTexture3D=re,this.setTextureCube=N,this.rebindTextures=$,this.setupRenderTarget=le,this.updateRenderTargetMipmap=ve,this.updateMultisampleRenderTarget=Ke,this.setupDepthRenderbuffer=he,this.setupFrameBufferTexture=H,this.useMultisampledRTT=He,this.isReversedDepthBuffer=function(){return t.buffers.depth.getReversed()}}function cw(n,e){function t(i,s=Pn){let r;const a=ft.getTransfer(s);if(i===Kn)return n.UNSIGNED_BYTE;if(i===_h)return n.UNSIGNED_SHORT_4_4_4_4;if(i===wh)return n.UNSIGNED_SHORT_5_5_5_1;if(i===Ff)return n.UNSIGNED_INT_5_9_9_9_REV;if(i===kf)return n.UNSIGNED_INT_10F_11F_11F_REV;if(i===Of)return n.BYTE;if(i===Nf)return n.SHORT;if(i===sa)return n.UNSIGNED_SHORT;if(i===yh)return n.INT;if(i===Oi)return n.UNSIGNED_INT;if(i===fi)return n.FLOAT;if(i===Ni)return n.HALF_FLOAT;if(i===Uf)return n.ALPHA;if(i===Bf)return n.RGB;if(i===qn)return n.RGBA;if(i===Ki)return n.DEPTH_COMPONENT;if(i===Ps)return n.DEPTH_STENCIL;if(i===Sh)return n.RED;if(i===Eh)return n.RED_INTEGER;if(i===Bs)return n.RG;if(i===Ah)return n.RG_INTEGER;if(i===Th)return n.RGBA_INTEGER;if(i===so||i===ro||i===ao||i===oo)if(a===Dt)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(i===so)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===ro)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===ao)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===oo)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(i===so)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===ro)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===ao)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===oo)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===mc||i===gc||i===xc||i===Mc)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(i===mc)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===gc)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===xc)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===Mc)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===vc||i===bc||i===yc||i===_c||i===wc||i===bo||i===Sc)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(i===vc||i===bc)return a===Dt?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(i===yc)return a===Dt?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC;if(i===_c)return r.COMPRESSED_R11_EAC;if(i===wc)return r.COMPRESSED_SIGNED_R11_EAC;if(i===bo)return r.COMPRESSED_RG11_EAC;if(i===Sc)return r.COMPRESSED_SIGNED_RG11_EAC}else return null;if(i===Ec||i===Ac||i===Tc||i===Rc||i===Cc||i===Lc||i===Pc||i===Dc||i===Ic||i===Oc||i===Nc||i===Fc||i===kc||i===Uc)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(i===Ec)return a===Dt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===Ac)return a===Dt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===Tc)return a===Dt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===Rc)return a===Dt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===Cc)return a===Dt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===Lc)return a===Dt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===Pc)return a===Dt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===Dc)return a===Dt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===Ic)return a===Dt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===Oc)return a===Dt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===Nc)return a===Dt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===Fc)return a===Dt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===kc)return a===Dt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===Uc)return a===Dt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===Bc||i===zc||i===Gc)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(i===Bc)return a===Dt?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===zc)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===Gc)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===Hc||i===Wc||i===yo||i===Vc)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(i===Hc)return r.COMPRESSED_RED_RGTC1_EXT;if(i===Wc)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===yo)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===Vc)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===ra?n.UNSIGNED_INT_24_8:n[i]!==void 0?n[i]:null}return{convert:t}}const hw=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,uw=`
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

}`;class dw{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){const i=new Zf(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=i}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,i=new xt({vertexShader:hw,fragmentShader:uw,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new Yt(new Zn(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class fw extends Vs{constructor(e,t){super();const i=this;let s=null,r=1,a=null,o="local-floor",h=1,c=null,d=null,f=null,u=null,p=null,g=null;const M=typeof XRWebGLBinding<"u",x=new dw,m={},v=t.getContextAttributes();let _=null,w=null;const A=[],y=[],S=new tt;let b=null,E=null;const C=new Xn;C.viewport=new at;const T=new Xn;T.viewport=new at;const R=[C,T],O=new yv;let I=null,k=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(q){let ee=A[q];return ee===void 0&&(ee=new dl,A[q]=ee),ee.getTargetRaySpace()},this.getControllerGrip=function(q){let ee=A[q];return ee===void 0&&(ee=new dl,A[q]=ee),ee.getGripSpace()},this.getHand=function(q){let ee=A[q];return ee===void 0&&(ee=new dl,A[q]=ee),ee.getHandSpace()};function U(q){const ee=y.indexOf(q.inputSource);if(ee===-1)return;const B=A[ee];B!==void 0&&(B.update(q.inputSource,q.frame,c||a),B.dispatchEvent({type:q.type,data:q.inputSource}))}function W(){s.removeEventListener("select",U),s.removeEventListener("selectstart",U),s.removeEventListener("selectend",U),s.removeEventListener("squeeze",U),s.removeEventListener("squeezestart",U),s.removeEventListener("squeezeend",U),s.removeEventListener("end",W),s.removeEventListener("inputsourceschange",ne);for(let q=0;q<A.length;q++){const ee=y[q];ee!==null&&(y[q]=null,A[q].disconnect(ee))}I=null,k=null,x.reset();for(const q in m)delete m[q];if(e.setRenderTarget(_),p=null,u=null,f=null,s=null,w=null,Pe.stop(),i.isPresenting=!1,e.setPixelRatio(b),e.setSize(S.width,S.height,!1),E!==null){const q=E.camera;q.fov=E.fov,q.zoom=E.zoom,q.updateProjectionMatrix(),E=null}i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(q){r=q,i.isPresenting===!0&&et("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(q){o=q,i.isPresenting===!0&&et("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(q){c=q},this.getBaseLayer=function(){return u!==null?u:p},this.getBinding=function(){return f===null&&M&&(f=new XRWebGLBinding(s,t)),f},this.getFrame=function(){return g},this.getSession=function(){return s},this.setSession=async function(q){if(s=q,s!==null){if(_=e.getRenderTarget(),s.addEventListener("select",U),s.addEventListener("selectstart",U),s.addEventListener("selectend",U),s.addEventListener("squeeze",U),s.addEventListener("squeezestart",U),s.addEventListener("squeezeend",U),s.addEventListener("end",W),s.addEventListener("inputsourceschange",ne),v.xrCompatible!==!0&&await t.makeXRCompatible(),b=e.getPixelRatio(),e.getSize(S),M&&"createProjectionLayer"in XRWebGLBinding.prototype){let B=null,ce=null,H=null;v.depth&&(H=v.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,B=v.stencil?Ps:Ki,ce=v.stencil?ra:Oi);const Z={colorFormat:t.RGBA8,depthFormat:H,scaleFactor:r};f=this.getBinding(),u=f.createProjectionLayer(Z),s.updateRenderState({layers:[u]}),e.setPixelRatio(1),e.setSize(u.textureWidth,u.textureHeight,!1),w=new ii(u.textureWidth,u.textureHeight,{format:qn,type:Kn,depthTexture:new Er(u.textureWidth,u.textureHeight,ce,void 0,void 0,void 0,void 0,void 0,void 0,B),stencilBuffer:v.stencil,colorSpace:e.outputColorSpace,samples:v.antialias?4:0,resolveDepthBuffer:u.ignoreDepthValues===!1,resolveStencilBuffer:u.ignoreDepthValues===!1,storeMultisampledDepthBuffer:u.ignoreDepthValues===!1,storeMultisampledStencilBuffer:u.ignoreDepthValues===!1})}else{const B={antialias:v.antialias,alpha:!0,depth:v.depth,stencil:v.stencil,framebufferScaleFactor:r};p=new XRWebGLLayer(s,t,B),s.updateRenderState({baseLayer:p}),e.setPixelRatio(1),e.setSize(p.framebufferWidth,p.framebufferHeight,!1),w=new ii(p.framebufferWidth,p.framebufferHeight,{format:qn,type:Kn,colorSpace:e.outputColorSpace,stencilBuffer:v.stencil,resolveDepthBuffer:p.ignoreDepthValues===!1,resolveStencilBuffer:p.ignoreDepthValues===!1,storeMultisampledDepthBuffer:p.ignoreDepthValues===!1,storeMultisampledStencilBuffer:p.ignoreDepthValues===!1})}w.isXRRenderTarget=!0,this.setFoveation(h),c=null,a=await s.requestReferenceSpace(o),Pe.setContext(s),Pe.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return x.getDepthTexture()};function ne(q){for(let ee=0;ee<q.removed.length;ee++){const B=q.removed[ee],ce=y.indexOf(B);ce>=0&&(y[ce]=null,A[ce].disconnect(B))}for(let ee=0;ee<q.added.length;ee++){const B=q.added[ee];let ce=y.indexOf(B);if(ce===-1){for(let Z=0;Z<A.length;Z++)if(Z>=y.length){y.push(B),ce=Z;break}else if(y[Z]===null){y[Z]=B,ce=Z;break}if(ce===-1)break}const H=A[ce];H&&H.connect(B)}}const K=new V,re=new V;function N(q,ee,B){K.setFromMatrixPosition(ee.matrixWorld),re.setFromMatrixPosition(B.matrixWorld);const ce=K.distanceTo(re),H=ee.projectionMatrix.elements,Z=B.projectionMatrix.elements,fe=H[14]/(H[10]-1),he=H[14]/(H[10]+1),$=(H[9]+1)/H[5],le=(H[9]-1)/H[5],ve=(H[8]-1)/H[0],Ie=(Z[8]+1)/Z[0],Ve=fe*ve,Ke=fe*Ie,Fe=ce/(-ve+Ie),He=Fe*-ve;if(ee.matrixWorld.decompose(q.position,q.quaternion,q.scale),q.translateX(He),q.translateZ(Fe),q.matrixWorld.compose(q.position,q.quaternion,q.scale),q.matrixWorldInverse.copy(q.matrixWorld).invert(),H[10]===-1)q.projectionMatrix.copy(ee.projectionMatrix),q.projectionMatrixInverse.copy(ee.projectionMatrixInverse);else{const z=fe+Fe,$e=he+Fe,Be=Ve-He,F=Ke+(ce-He),L=$*he/$e*z,G=le*he/$e*z;q.projectionMatrix.makePerspective(Be,F,L,G,z,$e),q.projectionMatrixInverse.copy(q.projectionMatrix).invert()}}function te(q,ee){ee===null?q.matrixWorld.copy(q.matrix):q.matrixWorld.multiplyMatrices(ee.matrixWorld,q.matrix),q.matrixWorldInverse.copy(q.matrixWorld).invert()}this.updateCamera=function(q){if(s===null)return;let ee=q.near,B=q.far;x.texture!==null&&(x.depthNear>0&&(ee=x.depthNear),x.depthFar>0&&(B=x.depthFar)),O.near=T.near=C.near=ee,O.far=T.far=C.far=B,(I!==O.near||k!==O.far)&&(s.updateRenderState({depthNear:O.near,depthFar:O.far}),I=O.near,k=O.far),O.layers.mask=q.layers.mask|6,C.layers.mask=O.layers.mask&-5,T.layers.mask=O.layers.mask&-3;const ce=q.parent,H=O.cameras;te(O,ce);for(let Z=0;Z<H.length;Z++)te(H[Z],ce);H.length===2?N(O,C,T):O.projectionMatrix.copy(C.projectionMatrix),E===null&&q.isPerspectiveCamera&&(E={camera:q,fov:q.fov,zoom:q.zoom}),ae(q,O,ce)};function ae(q,ee,B){B===null?q.matrix.copy(ee.matrixWorld):(q.matrix.copy(B.matrixWorld),q.matrix.invert(),q.matrix.multiply(ee.matrixWorld)),q.matrix.decompose(q.position,q.quaternion,q.scale),q.updateMatrixWorld(!0),q.projectionMatrix.copy(ee.projectionMatrix),q.projectionMatrixInverse.copy(ee.projectionMatrixInverse),q.isPerspectiveCamera&&(q.fov=Yc*2*Math.atan(1/q.projectionMatrix.elements[5]),q.zoom=1)}this.getCamera=function(){return O},this.getFoveation=function(){if(!(u===null&&p===null))return h},this.setFoveation=function(q){h=q,u!==null&&(u.fixedFoveation=q),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=q)},this.hasDepthSensing=function(){return x.texture!==null},this.getDepthSensingMesh=function(){return x.getMesh(O)},this.getCameraTexture=function(q){return m[q]};let pe=null;function be(q,ee){if(d=ee.getViewerPose(c||a),g=ee,d!==null){const B=d.views;p!==null&&(e.setRenderTargetFramebuffer(w,p.framebuffer),e.setRenderTarget(w));let ce=!1;B.length!==O.cameras.length&&(O.cameras.length=0,ce=!0);for(let he=0;he<B.length;he++){const $=B[he];let le=null;if(p!==null)le=p.getViewport($);else{const Ie=f.getViewSubImage(u,$);le=Ie.viewport,he===0&&(e.setRenderTargetTextures(w,Ie.colorTexture,Ie.depthStencilTexture),e.setRenderTarget(w))}let ve=R[he];ve===void 0&&(ve=new Xn,ve.layers.enable(he),ve.viewport=new at,R[he]=ve),ve.matrix.fromArray($.transform.matrix),ve.matrix.decompose(ve.position,ve.quaternion,ve.scale),ve.projectionMatrix.fromArray($.projectionMatrix),ve.projectionMatrixInverse.copy(ve.projectionMatrix).invert(),ve.viewport.set(le.x,le.y,le.width,le.height),he===0&&(O.matrix.copy(ve.matrix),O.matrix.decompose(O.position,O.quaternion,O.scale)),ce===!0&&O.cameras.push(ve)}const H=s.enabledFeatures;if(H&&H.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&M){f=i.getBinding();const he=f.getDepthInformation(B[0]);he&&he.isValid&&he.texture&&x.init(he,s.renderState)}if(H&&H.includes("camera-access")&&M){e.state.unbindTexture(),f=i.getBinding();for(let he=0;he<B.length;he++){const $=B[he].camera;if($){let le=m[$];le||(le=new Zf,m[$]=le);const ve=f.getCameraImage($);le.sourceTexture=ve}}}}for(let B=0;B<A.length;B++){const ce=y[B],H=A[B];ce!==null&&H!==void 0&&H.update(ce,ee,c||a)}pe&&pe(q,ee),ee.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:ee}),g=null}const Pe=new e0;Pe.setAnimationLoop(be),this.setAnimationLoop=function(q){pe=q},this.dispose=function(){}}}const pw=new kt,o0=new nt;o0.set(-1,0,0,0,1,0,0,0,1);function mw(n,e){function t(x,m){x.matrixAutoUpdate===!0&&x.updateMatrix(),m.value.copy(x.matrix)}function i(x,m){m.color.getRGB(x.fogColor.value,Jf(n)),m.isFog?(x.fogNear.value=m.near,x.fogFar.value=m.far):m.isFogExp2&&(x.fogDensity.value=m.density)}function s(x,m,v,_,w){m.isNodeMaterial?m.uniformsNeedUpdate=!1:m.isMeshBasicMaterial?r(x,m):m.isMeshLambertMaterial?(r(x,m),m.envMap&&(x.envMapIntensity.value=m.envMapIntensity)):m.isMeshToonMaterial?(r(x,m),f(x,m)):m.isMeshPhongMaterial?(r(x,m),d(x,m),m.envMap&&(x.envMapIntensity.value=m.envMapIntensity)):m.isMeshStandardMaterial?(r(x,m),u(x,m),m.isMeshPhysicalMaterial&&p(x,m,w)):m.isMeshMatcapMaterial?(r(x,m),g(x,m)):m.isMeshDepthMaterial?r(x,m):m.isMeshDistanceMaterial?(r(x,m),M(x,m)):m.isMeshNormalMaterial?r(x,m):m.isLineBasicMaterial?(a(x,m),m.isLineDashedMaterial&&o(x,m)):m.isPointsMaterial?h(x,m,v,_):m.isSpriteMaterial?c(x,m):m.isShadowMaterial?(x.color.value.copy(m.color),x.opacity.value=m.opacity):m.isShaderMaterial&&(m.uniformsNeedUpdate=!1)}function r(x,m){x.opacity.value=m.opacity,m.color&&x.diffuse.value.copy(m.color),m.emissive&&x.emissive.value.copy(m.emissive).multiplyScalar(m.emissiveIntensity),m.map&&(x.map.value=m.map,t(m.map,x.mapTransform)),m.alphaMap&&(x.alphaMap.value=m.alphaMap,t(m.alphaMap,x.alphaMapTransform)),m.bumpMap&&(x.bumpMap.value=m.bumpMap,t(m.bumpMap,x.bumpMapTransform),x.bumpScale.value=m.bumpScale,m.side===Hn&&(x.bumpScale.value*=-1)),m.normalMap&&(x.normalMap.value=m.normalMap,t(m.normalMap,x.normalMapTransform),x.normalScale.value.copy(m.normalScale),m.side===Hn&&x.normalScale.value.negate()),m.displacementMap&&(x.displacementMap.value=m.displacementMap,t(m.displacementMap,x.displacementMapTransform),x.displacementScale.value=m.displacementScale,x.displacementBias.value=m.displacementBias),m.emissiveMap&&(x.emissiveMap.value=m.emissiveMap,t(m.emissiveMap,x.emissiveMapTransform)),m.specularMap&&(x.specularMap.value=m.specularMap,t(m.specularMap,x.specularMapTransform)),m.alphaTest>0&&(x.alphaTest.value=m.alphaTest);const v=e.get(m),_=v.envMap,w=v.envMapRotation;_&&(x.envMap.value=_,x.envMapRotation.value.setFromMatrix4(pw.makeRotationFromEuler(w)).transpose(),_.isCubeTexture&&_.isRenderTargetTexture===!1&&x.envMapRotation.value.premultiply(o0),x.reflectivity.value=m.reflectivity,x.ior.value=m.ior,x.refractionRatio.value=m.refractionRatio),m.lightMap&&(x.lightMap.value=m.lightMap,x.lightMapIntensity.value=m.lightMapIntensity,t(m.lightMap,x.lightMapTransform)),m.aoMap&&(x.aoMap.value=m.aoMap,x.aoMapIntensity.value=m.aoMapIntensity,t(m.aoMap,x.aoMapTransform))}function a(x,m){x.diffuse.value.copy(m.color),x.opacity.value=m.opacity,m.map&&(x.map.value=m.map,t(m.map,x.mapTransform))}function o(x,m){x.dashSize.value=m.dashSize,x.totalSize.value=m.dashSize+m.gapSize,x.scale.value=m.scale}function h(x,m,v,_){x.diffuse.value.copy(m.color),x.opacity.value=m.opacity,x.size.value=m.size*v,x.scale.value=_*.5,m.map&&(x.map.value=m.map,t(m.map,x.uvTransform)),m.alphaMap&&(x.alphaMap.value=m.alphaMap,t(m.alphaMap,x.alphaMapTransform)),m.alphaTest>0&&(x.alphaTest.value=m.alphaTest)}function c(x,m){x.diffuse.value.copy(m.color),x.opacity.value=m.opacity,x.rotation.value=m.rotation,m.map&&(x.map.value=m.map,t(m.map,x.mapTransform)),m.alphaMap&&(x.alphaMap.value=m.alphaMap,t(m.alphaMap,x.alphaMapTransform)),m.alphaTest>0&&(x.alphaTest.value=m.alphaTest)}function d(x,m){x.specular.value.copy(m.specular),x.shininess.value=Math.max(m.shininess,1e-4)}function f(x,m){m.gradientMap&&(x.gradientMap.value=m.gradientMap)}function u(x,m){x.metalness.value=m.metalness,m.metalnessMap&&(x.metalnessMap.value=m.metalnessMap,t(m.metalnessMap,x.metalnessMapTransform)),x.roughness.value=m.roughness,m.roughnessMap&&(x.roughnessMap.value=m.roughnessMap,t(m.roughnessMap,x.roughnessMapTransform)),m.envMap&&(x.envMapIntensity.value=m.envMapIntensity)}function p(x,m,v){x.ior.value=m.ior,m.sheen>0&&(x.sheenColor.value.copy(m.sheenColor).multiplyScalar(m.sheen),x.sheenRoughness.value=m.sheenRoughness,m.sheenColorMap&&(x.sheenColorMap.value=m.sheenColorMap,t(m.sheenColorMap,x.sheenColorMapTransform)),m.sheenRoughnessMap&&(x.sheenRoughnessMap.value=m.sheenRoughnessMap,t(m.sheenRoughnessMap,x.sheenRoughnessMapTransform))),m.clearcoat>0&&(x.clearcoat.value=m.clearcoat,x.clearcoatRoughness.value=m.clearcoatRoughness,m.clearcoatMap&&(x.clearcoatMap.value=m.clearcoatMap,t(m.clearcoatMap,x.clearcoatMapTransform)),m.clearcoatRoughnessMap&&(x.clearcoatRoughnessMap.value=m.clearcoatRoughnessMap,t(m.clearcoatRoughnessMap,x.clearcoatRoughnessMapTransform)),m.clearcoatNormalMap&&(x.clearcoatNormalMap.value=m.clearcoatNormalMap,t(m.clearcoatNormalMap,x.clearcoatNormalMapTransform),x.clearcoatNormalScale.value.copy(m.clearcoatNormalScale),m.side===Hn&&x.clearcoatNormalScale.value.negate())),m.dispersion>0&&(x.dispersion.value=m.dispersion),m.retroreflectivity>0&&(x.retroreflectivity.value=m.retroreflectivity),m.iridescence>0&&(x.iridescence.value=m.iridescence,x.iridescenceIOR.value=m.iridescenceIOR,x.iridescenceThicknessMinimum.value=m.iridescenceThicknessRange[0],x.iridescenceThicknessMaximum.value=m.iridescenceThicknessRange[1],m.iridescenceMap&&(x.iridescenceMap.value=m.iridescenceMap,t(m.iridescenceMap,x.iridescenceMapTransform)),m.iridescenceThicknessMap&&(x.iridescenceThicknessMap.value=m.iridescenceThicknessMap,t(m.iridescenceThicknessMap,x.iridescenceThicknessMapTransform))),m.transmission>0&&(x.transmission.value=m.transmission,x.transmissionSamplerMap.value=v.texture,x.transmissionSamplerSize.value.set(v.width,v.height),m.transmissionMap&&(x.transmissionMap.value=m.transmissionMap,t(m.transmissionMap,x.transmissionMapTransform)),x.thickness.value=m.thickness,m.thicknessMap&&(x.thicknessMap.value=m.thicknessMap,t(m.thicknessMap,x.thicknessMapTransform)),x.attenuationDistance.value=m.attenuationDistance,x.attenuationColor.value.copy(m.attenuationColor)),m.anisotropy>0&&(x.anisotropyVector.value.set(m.anisotropy*Math.cos(m.anisotropyRotation),m.anisotropy*Math.sin(m.anisotropyRotation)),m.anisotropyMap&&(x.anisotropyMap.value=m.anisotropyMap,t(m.anisotropyMap,x.anisotropyMapTransform))),x.specularIntensity.value=m.specularIntensity,x.specularColor.value.copy(m.specularColor),m.specularColorMap&&(x.specularColorMap.value=m.specularColorMap,t(m.specularColorMap,x.specularColorMapTransform)),m.specularIntensityMap&&(x.specularIntensityMap.value=m.specularIntensityMap,t(m.specularIntensityMap,x.specularIntensityMapTransform))}function g(x,m){m.matcap&&(x.matcap.value=m.matcap)}function M(x,m){const v=e.get(m).light;x.referencePosition.value.setFromMatrixPosition(v.matrixWorld),x.nearDistance.value=v.shadow.camera.near,x.farDistance.value=v.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:s}}function gw(n,e,t,i){let s={},r={},a=[];const o=n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS);function h(w,A){const y=A.program;i.uniformBlockBinding(w,y)}function c(w,A){let y=s[w.id];y===void 0&&(x(w),y=d(w),s[w.id]=y,w.addEventListener("dispose",v));const S=A.program;i.updateUBOMapping(w,S);const b=e.render.frame;r[w.id]!==b&&(u(w),r[w.id]=b)}function d(w){const A=f();w.__bindingPointIndex=A;const y=n.createBuffer(),S=w.__size,b=w.usage;return n.bindBuffer(n.UNIFORM_BUFFER,y),n.bufferData(n.UNIFORM_BUFFER,S,b),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,A,y),y}function f(){for(let w=0;w<o;w++)if(a.indexOf(w)===-1)return a.push(w),w;return Mt("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function u(w){const A=s[w.id],y=w.uniforms,S=w.__cache;n.bindBuffer(n.UNIFORM_BUFFER,A);for(let b=0,E=y.length;b<E;b++){const C=y[b];if(Array.isArray(C))for(let T=0,R=C.length;T<R;T++)p(C[T],b,T,S);else p(C,b,0,S)}n.bindBuffer(n.UNIFORM_BUFFER,null)}function p(w,A,y,S){if(M(w,A,y,S)===!0){const b=w.__offset,E=w.value;if(Array.isArray(E)){let C=0;for(let T=0;T<E.length;T++){const R=E[T],O=m(R);g(R,w.__data,C),typeof R!="number"&&typeof R!="boolean"&&!R.isMatrix3&&!ArrayBuffer.isView(R)&&(C+=O.storage/Float32Array.BYTES_PER_ELEMENT)}}else g(E,w.__data,0);n.bufferSubData(n.UNIFORM_BUFFER,b,w.__data)}}function g(w,A,y){typeof w=="number"||typeof w=="boolean"?A[0]=w:w.isMatrix3?(A[0]=w.elements[0],A[1]=w.elements[1],A[2]=w.elements[2],A[3]=0,A[4]=w.elements[3],A[5]=w.elements[4],A[6]=w.elements[5],A[7]=0,A[8]=w.elements[6],A[9]=w.elements[7],A[10]=w.elements[8],A[11]=0):ArrayBuffer.isView(w)?A.set(new w.constructor(w.buffer,w.byteOffset,A.length)):w.toArray(A,y)}function M(w,A,y,S){const b=w.value,E=A+"_"+y;if(S[E]===void 0)return typeof b=="number"||typeof b=="boolean"?S[E]=b:ArrayBuffer.isView(b)?S[E]=b.slice():S[E]=b.clone(),!0;{const C=S[E];if(typeof b=="number"||typeof b=="boolean"){if(C!==b)return S[E]=b,!0}else{if(ArrayBuffer.isView(b))return!0;if(C.equals(b)===!1)return C.copy(b),!0}}return!1}function x(w){const A=w.uniforms;let y=0;const S=16;for(let E=0,C=A.length;E<C;E++){const T=Array.isArray(A[E])?A[E]:[A[E]];for(let R=0,O=T.length;R<O;R++){const I=T[R],k=Array.isArray(I.value)?I.value:[I.value];for(let U=0,W=k.length;U<W;U++){const ne=k[U],K=m(ne),re=y%S,N=re%K.boundary,te=re+N;y+=N,te!==0&&S-te<K.storage&&(y+=S-te),I.__data=new Float32Array(K.storage/Float32Array.BYTES_PER_ELEMENT),I.__offset=y,y+=K.storage}}}const b=y%S;return b>0&&(y+=S-b),w.__size=y,w.__cache={},this}function m(w){const A={boundary:0,storage:0};return typeof w=="number"||typeof w=="boolean"?(A.boundary=4,A.storage=4):w.isVector2?(A.boundary=8,A.storage=8):w.isVector3||w.isColor?(A.boundary=16,A.storage=12):w.isVector4?(A.boundary=16,A.storage=16):w.isMatrix3?(A.boundary=48,A.storage=48):w.isMatrix4?(A.boundary=64,A.storage=64):w.isTexture?et("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(w)?(A.boundary=16,A.storage=w.byteLength):et("WebGLRenderer: Unsupported uniform value type.",w),A}function v(w){const A=w.target;A.removeEventListener("dispose",v);const y=a.indexOf(A.__bindingPointIndex);a.splice(y,1),n.deleteBuffer(s[A.id]),delete s[A.id],delete r[A.id]}function _(){for(const w in s)n.deleteBuffer(s[w]);a=[],s={},r={}}return{bind:h,update:c,dispose:_}}const xw=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let _i=null;function Mw(){return _i===null&&(_i=new hs(xw,16,16,Bs,Ni),_i.name="DFG_LUT",_i.minFilter=Jt,_i.magFilter=Jt,_i.wrapS=Vi,_i.wrapT=Vi,_i.generateMipmaps=!1,_i.needsUpdate=!0),_i}class vw{constructor(e={}){const{canvas:t=BM(),context:i=null,depth:s=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:h=!0,preserveDrawingBuffer:c=!1,powerPreference:d="default",failIfMajorPerformanceCaveat:f=!1,reversedDepthBuffer:u=!1,outputBufferType:p=Kn}=e;this.isWebGLRenderer=!0;let g;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");g=i.getContextAttributes().alpha}else g=a;const M=p,x=new Set([Th,Ah,Eh]),m=new Set([Kn,Oi,sa,ra,_h,wh]),v=new Uint32Array(4),_=new Int32Array(4),w=new V;let A=null,y=null;const S=[],b=[];let E=null;this.domElement=t,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Di,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const C=this;let T=!1,R=null,O=null,I=null,k=null;this._outputColorSpace=ei;let U=0,W=0,ne=null,K=-1,re=null;const N=new at,te=new at;let ae=null;const pe=new ht(0);let be=0,Pe=t.width,q=t.height,ee=1,B=null,ce=null;const H=new at(0,0,Pe,q),Z=new at(0,0,Pe,q);let fe=!1;const he=new Eo;let $=!1,le=!1;const ve=new kt,Ie=new V,Ve=new at,Ke={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Fe=!1;function He(){return ne===null?ee:1}let z=i;function $e(D,Y){return t.getContext(D,Y)}let Be,F,L,G,J,ie,Me,ye,oe,ue,_e,ze,Te,Se,Ye,Je,it,X,Ee,de,Ae,De,ge;try{const D={alpha:!0,depth:s,stencil:r,antialias:o,premultipliedAlpha:h,preserveDrawingBuffer:c,powerPreference:d,failIfMajorPerformanceCaveat:f};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${gh}`),t.addEventListener("webglcontextlost",Bt,!1),t.addEventListener("webglcontextrestored",Et,!1),t.addEventListener("webglcontextcreationerror",ri,!1),z===null){const Y="webgl2";if(z=$e(Y,D),z===null)throw $e(Y)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}Xe()}catch(D){throw t.removeEventListener("webglcontextlost",Bt,!1),t.removeEventListener("webglcontextrestored",Et,!1),t.removeEventListener("webglcontextcreationerror",ri,!1),Mt("WebGLRenderer: "+D.message),D}function Xe(){Be=new My(z),Be.init(),Ae=new cw(z,Be),F=new ly(z,Be,e,Ae),L=new ow(z,Be),F.reversedDepthBuffer&&u&&L.buffers.depth.setReversed(!0),O=z.createFramebuffer(),I=z.createFramebuffer(),k=z.createFramebuffer(),G=new yy(z),J=new K_,ie=new lw(z,Be,L,J,F,Ae,G),Me=new xy(C),ye=new wv(z),De=new ay(z,ye),oe=new vy(z,ye,G,De),ue=new wy(z,oe,ye,De,G),X=new _y(z,F,ie),Ye=new cy(J),_e=new X_(C,Me,Be,F,De,Ye),ze=new mw(C,J),Te=new $_,Se=new tw(Be),it=new ry(C,Me,L,ue,g,h),Je=new aw(C,ue,F),ge=new gw(z,G,F,L),Ee=new oy(z,Be,G),de=new by(z,Be,G),G.programs=_e.programs,C.capabilities=F,C.extensions=Be,C.properties=J,C.renderLists=Te,C.shadowMap=Je,C.state=L,C.info=G}M!==Kn&&(E=new Ey(M,t.width,t.height,o,s,r));const Ge=new fw(C,z);this.xr=Ge,this.getContext=function(){return z},this.getContextAttributes=function(){return z.getContextAttributes()},this.forceContextLoss=function(){const D=Be.get("WEBGL_lose_context");D&&D.loseContext()},this.forceContextRestore=function(){const D=Be.get("WEBGL_lose_context");D&&D.restoreContext()},this.getPixelRatio=function(){return ee},this.setPixelRatio=function(D){D!==void 0&&(ee=D,this.setSize(Pe,q,!1))},this.getSize=function(D){return D.set(Pe,q)},this.setSize=function(D,Y,se=!0){if(Ge.isPresenting){et("WebGLRenderer: Can't change size while VR device is presenting.");return}Pe=D,q=Y,t.width=Math.floor(D*ee),t.height=Math.floor(Y*ee),se===!0&&(t.style.width=D+"px",t.style.height=Y+"px"),E!==null&&E.setSize(t.width,t.height),this.setViewport(0,0,D,Y)},this.getDrawingBufferSize=function(D){return D.set(Pe*ee,q*ee).floor()},this.setDrawingBufferSize=function(D,Y,se){Pe=D,q=Y,ee=se,t.width=Math.floor(D*se),t.height=Math.floor(Y*se),this.setViewport(0,0,D,Y)},this.setEffects=function(D){if(M===Kn){Mt("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(D){for(let Y=0;Y<D.length;Y++)if(D[Y].isOutputPass===!0){et("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}E.setEffects(D||[])},this.getCurrentViewport=function(D){return D.copy(N)},this.getViewport=function(D){return D.copy(H)},this.setViewport=function(D,Y,se,Q){D.isVector4?H.set(D.x,D.y,D.z,D.w):H.set(D,Y,se,Q),L.viewport(N.copy(H).multiplyScalar(ee).round())},this.getScissor=function(D){return D.copy(Z)},this.setScissor=function(D,Y,se,Q){D.isVector4?Z.set(D.x,D.y,D.z,D.w):Z.set(D,Y,se,Q),L.scissor(te.copy(Z).multiplyScalar(ee).round())},this.getScissorTest=function(){return fe},this.setScissorTest=function(D){L.setScissorTest(fe=D)},this.setOpaqueSort=function(D){B=D},this.setTransparentSort=function(D){ce=D},this.getClearColor=function(D){return D.copy(it.getClearColor())},this.setClearColor=function(){it.setClearColor(...arguments)},this.getClearAlpha=function(){return it.getClearAlpha()},this.setClearAlpha=function(){it.setClearAlpha(...arguments)},this.clear=function(D=!0,Y=!0,se=!0){let Q=0;if(D){let j=!1;if(ne!==null){const Le=ne.texture.format;j=x.has(Le)}if(j){const Le=ne.texture.type,Ne=m.has(Le),Ce=it.getClearColor(),ke=it.getClearAlpha(),We=Ce.r,ot=Ce.g,ut=Ce.b;Ne?(v[0]=We,v[1]=ot,v[2]=ut,v[3]=ke,z.clearBufferuiv(z.COLOR,0,v)):(_[0]=We,_[1]=ot,_[2]=ut,_[3]=ke,z.clearBufferiv(z.COLOR,0,_))}else Q|=z.COLOR_BUFFER_BIT}Y&&(Q|=z.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),se&&(Q|=z.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),Q!==0&&z.clear(Q)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(D){D.setRenderer(this),R=D},this.dispose=function(){t.removeEventListener("webglcontextlost",Bt,!1),t.removeEventListener("webglcontextrestored",Et,!1),t.removeEventListener("webglcontextcreationerror",ri,!1),it.dispose(),Te.dispose(),Se.dispose(),J.dispose(),Me.dispose(),ue.dispose(),De.dispose(),ge.dispose(),_e.dispose(),Ge.dispose(),Ge.removeEventListener("sessionstart",Gh),Ge.removeEventListener("sessionend",Hh),xs.stop()};function Bt(D){D.preventDefault(),Ru("WebGLRenderer: Context Lost."),T=!0}function Et(){Ru("WebGLRenderer: Context Restored."),T=!1;const D=G.autoReset,Y=Je.enabled,se=Je.autoUpdate,Q=Je.needsUpdate,j=Je.type;Xe(),G.autoReset=D,Je.enabled=Y,Je.autoUpdate=se,Je.needsUpdate=Q,Je.type=j}function ri(D){Mt("WebGLRenderer: A WebGL context could not be created. Reason: ",D.statusMessage)}function vi(D){const Y=D.target;Y.removeEventListener("dispose",vi),T0(Y)}function T0(D){R0(D),J.remove(D)}function R0(D){const Y=J.get(D).programs;Y!==void 0&&(Y.forEach(function(se){_e.releaseProgram(se)}),D.isShaderMaterial&&_e.releaseShaderCache(D))}this.renderBufferDirect=function(D,Y,se,Q,j,Le){Y===null&&(Y=Ke);const Ne=j.isMesh&&j.matrixWorld.determinantAffine()<0,Ce=P0(D,Y,se,Q,j);L.setMaterial(Q,Ne);let ke=se.index,We=1;if(Q.wireframe===!0){if(ke=oe.getWireframeAttribute(se),ke===void 0)return;We=2}const ot=se.drawRange,ut=se.attributes.position;let Ue=ot.start*We,At=(ot.start+ot.count)*We;Le!==null&&(Ue=Math.max(Ue,Le.start*We),At=Math.min(At,(Le.start+Le.count)*We)),ke!==null?(Ue=Math.max(Ue,0),At=Math.min(At,ke.count)):ut!=null&&(Ue=Math.max(Ue,0),At=Math.min(At,ut.count));const sn=At-Ue;if(sn<0||sn===1/0)return;De.setup(j,Q,Ce,se,ke);let Vt,Ut=Ee;if(ke!==null&&(Vt=ye.get(ke),Ut=de,Ut.setIndex(Vt)),j.isMesh)Q.wireframe===!0?(L.setLineWidth(Q.wireframeLinewidth*He()),Ut.setMode(z.LINES)):Ut.setMode(z.TRIANGLES);else if(j.isLine){let wn=Q.linewidth;wn===void 0&&(wn=1),L.setLineWidth(wn*He()),j.isLineSegments?Ut.setMode(z.LINES):j.isLineLoop?Ut.setMode(z.LINE_LOOP):Ut.setMode(z.LINE_STRIP)}else j.isPoints?Ut.setMode(z.POINTS):j.isSprite&&Ut.setMode(z.TRIANGLES);if(j.isBatchedMesh)if(Be.get("WEBGL_multi_draw"))Ut.renderMultiDraw(j._multiDrawStarts,j._multiDrawCounts,j._multiDrawCount);else{const wn=j._multiDrawStarts,Oe=j._multiDrawCounts,Cn=j._multiDrawCount,gt=ke?ye.get(ke).bytesPerElement:1,Jn=J.get(Q).currentProgram.getUniforms();for(let bi=0;bi<Cn;bi++)Jn.setValue(z,"_gl_DrawID",bi),Ut.render(wn[bi]/gt,Oe[bi])}else if(j.isInstancedMesh)Ut.renderInstances(Ue,sn,j.count);else if(se.isInstancedBufferGeometry){const wn=se._maxInstanceCount!==void 0?se._maxInstanceCount:1/0,Oe=Math.min(se.instanceCount,wn);Ut.renderInstances(Ue,sn,Oe)}else Ut.render(Ue,sn)};function zh(D,Y,se,Q){R!==null&&D.isNodeMaterial&&R.setObject(Q,D),$===!0&&Ye.setState(D,se,!1),D.transparent===!0&&D.side===ti&&D.forceSinglePass===!1?(D.side=Hn,D.needsUpdate=!0,ma(D,Y,Q),D.side=ks,D.needsUpdate=!0,ma(D,Y,Q),D.side=ti):ma(D,Y,Q)}this.compile=function(D,Y,se=null){se===null&&(se=D),R!==null&&R.renderStart(D,Y,se),y=Se.get(se),y.init(Y),b.push(y),se.traverseVisible(function(j){j.isLight&&j.layers.test(Y.layers)&&(y.pushLight(j),j.castShadow&&y.pushShadow(j))}),D!==se&&D.traverseVisible(function(j){j.isLight&&j.layers.test(Y.layers)&&(y.pushLight(j),j.castShadow&&y.pushShadow(j))}),y.setupLights(),R!==null&&R.updateLights(y.state.lightsArray),le=this.localClippingEnabled,$=Ye.init(this.clippingPlanes,le),$===!0&&Ye.setGlobalState(this.clippingPlanes,Y),R!==null&&Je.render(y.state.shadowsArray,se,Y);const Q=new Set;return D.traverse(function(j){if(!(j.isMesh||j.isPoints||j.isLine||j.isSprite))return;const Le=j.material;if(Le)if(Array.isArray(Le))for(let Ne=0;Ne<Le.length;Ne++){const Ce=Le[Ne];zh(Ce,se,Y,j),Q.add(Ce)}else zh(Le,se,Y,j),Q.add(Le)}),y=b.pop(),R!==null&&R.renderEnd(),Q},this.compileAsync=function(D,Y,se=null){const Q=this.compile(D,Y,se);return new Promise(j=>{function Le(){if(Q.forEach(function(Ne){const ke=J.get(Ne).currentProgram;(ke===void 0||ke.isReady())&&Q.delete(Ne)}),Q.size===0){j(D);return}setTimeout(Le,10)}Be.get("KHR_parallel_shader_compile")!==null?Le():setTimeout(Le,10)})};let Wo=null;function C0(D){Wo&&Wo(D)}function Gh(){xs.stop()}function Hh(){xs.start()}const xs=new e0;xs.setAnimationLoop(C0),typeof self<"u"&&xs.setContext(self),this.setAnimationLoop=function(D){Wo=D,Ge.setAnimationLoop(D),D===null?xs.stop():xs.start()},Ge.addEventListener("sessionstart",Gh),Ge.addEventListener("sessionend",Hh),this.render=function(D,Y){if(Y!==void 0&&Y.isCamera!==!0){Mt("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(T===!0)return;R!==null&&R.renderStart(D,Y);const se=Ge.enabled===!0&&Ge.isPresenting===!0,Q=E!==null&&(ne===null||se)&&E.begin(C,ne);if(D.matrixWorldAutoUpdate===!0&&D.updateMatrixWorld(),Y.parent===null&&Y.matrixWorldAutoUpdate===!0&&Y.updateMatrixWorld(),Ge.enabled===!0&&Ge.isPresenting===!0&&(E===null||E.isCompositing()===!1)&&(Ge.cameraAutoUpdate===!0&&Ge.updateCamera(Y),Y=Ge.getCamera()),D.isScene===!0&&D.onBeforeRender(C,D,Y,ne),y=Se.get(D,b.length),y.init(Y),y.state.textureUnits=ie.getTextureUnits(),b.push(y),ve.multiplyMatrices(Y.projectionMatrix,Y.matrixWorldInverse),he.setFromProjectionMatrix(ve,Ci,Y.reversedDepth),le=this.localClippingEnabled,$=Ye.init(this.clippingPlanes,le),A=Te.get(D,S.length),A.init(),S.push(A),Ge.enabled===!0&&Ge.isPresenting===!0){const Ne=C.xr.getDepthSensingMesh();Ne!==null&&Vo(Ne,Y,-1/0,C.sortObjects)}Vo(D,Y,0,C.sortObjects),A.finish(),R!==null&&R.updateLights(y.state.lightsArray),C.sortObjects===!0&&A.sort(B,ce),Fe=Ge.enabled===!1||Ge.isPresenting===!1||Ge.hasDepthSensing()===!1,Fe&&it.addToRenderList(A,D),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),$===!0&&Ye.beginShadows();const j=y.state.shadowsArray;if(Je.render(j,D,Y),$===!0&&Ye.endShadows(),(Q&&E.hasRenderPass())===!1){const Ne=A.opaque,Ce=A.transmissive;if(y.setupLights(),Y.isArrayCamera){const ke=Y.cameras;if(Ce.length>0)for(let We=0,ot=ke.length;We<ot;We++){const ut=ke[We];Vh(Ne,Ce,D,ut)}Fe&&it.render(D);for(let We=0,ot=ke.length;We<ot;We++){const ut=ke[We];Wh(A,D,ut,ut.viewport)}}else Ce.length>0&&Vh(Ne,Ce,D,Y),Fe&&it.render(D),Wh(A,D,Y)}ne!==null&&W===0&&(ie.updateMultisampleRenderTarget(ne),ie.updateRenderTargetMipmap(ne)),Q&&E.end(C),D.isScene===!0&&D.onAfterRender(C,D,Y),De.resetDefaultState(),K=-1,re=null,b.pop(),b.length>0?(y=b[b.length-1],ie.setTextureUnits(y.state.textureUnits),$===!0&&Ye.setGlobalState(C.clippingPlanes,y.state.camera)):y=null,S.pop(),S.length>0?A=S[S.length-1]:A=null,R!==null&&R.renderEnd()};function Vo(D,Y,se,Q){if(D.visible===!1)return;if(D.layers.test(Y.layers)){if(D.isGroup)se=D.renderOrder;else if(D.isLOD)D.autoUpdate===!0&&D.update(Y);else if(D.isLightProbeGrid)y.pushLightProbeGrid(D);else if(D.isLight)y.pushLight(D),D.castShadow&&y.pushShadow(D);else if(D.isSprite){if(!D.frustumCulled||D.intersectsFrustum(he)){Q&&Ve.setFromMatrixPosition(D.matrixWorld).applyMatrix4(ve);const Ne=ue.update(D),Ce=D.material;Ce.visible&&A.push(D,Ne,Ce,se,Ve.z,null,Y)}}else if((D.isMesh||D.isLine||D.isPoints)&&(!D.frustumCulled||D.intersectsFrustum(he))){const Ne=ue.update(D),Ce=D.material;if(Q&&(D.boundingSphere!==void 0?(D.boundingSphere===null&&D.computeBoundingSphere(),Ve.copy(D.boundingSphere.center)):(Ne.boundingSphere===null&&Ne.computeBoundingSphere(),Ve.copy(Ne.boundingSphere.center)),Ve.applyMatrix4(D.matrixWorld).applyMatrix4(ve)),Array.isArray(Ce)){const ke=Ne.groups;for(let We=0,ot=ke.length;We<ot;We++){const ut=ke[We],Ue=Ce[ut.materialIndex];Ue&&Ue.visible&&A.push(D,Ne,Ue,se,Ve.z,ut,Y)}}else Ce.visible&&A.push(D,Ne,Ce,se,Ve.z,null,Y)}}const Le=D.children;for(let Ne=0,Ce=Le.length;Ne<Ce;Ne++)Vo(Le[Ne],Y,se,Q)}function Wh(D,Y,se,Q){const{opaque:j,transmissive:Le,transparent:Ne}=D;y.setupLightsView(se),$===!0&&Ye.setGlobalState(C.clippingPlanes,se),Q&&L.viewport(N.copy(Q)),j.length>0&&pa(j,Y,se),Le.length>0&&pa(Le,Y,se),Ne.length>0&&pa(Ne,Y,se),L.buffers.depth.setTest(!0),L.buffers.depth.setMask(!0),L.buffers.color.setMask(!0),L.setPolygonOffset(!1)}function Vh(D,Y,se,Q){if((se.isScene===!0?se.overrideMaterial:null)!==null)return;if(y.state.transmissionRenderTarget[Q.id]===void 0){const Ue=Be.has("EXT_color_buffer_half_float")||Be.has("EXT_color_buffer_float");y.state.transmissionRenderTarget[Q.id]=new ii(1,1,{generateMipmaps:!0,type:Ue?Ni:Kn,minFilter:Ls,samples:Math.max(4,F.samples),stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:ft.workingColorSpace})}const Le=y.state.transmissionRenderTarget[Q.id],Ne=Q.viewport||N;Le.setSize(Ne.z*C.transmissionResolutionScale,Ne.w*C.transmissionResolutionScale);const Ce=C.getRenderTarget(),ke=C.getActiveCubeFace(),We=C.getActiveMipmapLevel();C.setRenderTarget(Le),C.getClearColor(pe),be=C.getClearAlpha(),be<1&&C.setClearColor(16777215,.5),C.clear(),Fe&&it.render(se);const ot=C.toneMapping;C.toneMapping=Di;const ut=Q.viewport;if(Q.viewport!==void 0&&(Q.viewport=void 0),y.setupLightsView(Q),$===!0&&Ye.setGlobalState(C.clippingPlanes,Q),pa(D,se,Q),ie.updateMultisampleRenderTarget(Le),ie.updateRenderTargetMipmap(Le),Be.has("WEBGL_multisampled_render_to_texture")===!1){let Ue=!1;for(let At=0,sn=Y.length;At<sn;At++){const Vt=Y[At],{object:Ut,geometry:wn,material:Oe,group:Cn}=Vt;if(Oe.side===ti&&Ut.layers.test(Q.layers)){const gt=Oe.side;Oe.side=Hn,Oe.needsUpdate=!0,Yh(Ut,se,Q,wn,Oe,Cn),Oe.side=gt,Oe.needsUpdate=!0,Ue=!0}}Ue===!0&&(ie.updateMultisampleRenderTarget(Le),ie.updateRenderTargetMipmap(Le))}C.setRenderTarget(Ce,ke,We),C.setClearColor(pe,be),ut!==void 0&&(Q.viewport=ut),C.toneMapping=ot}function pa(D,Y,se){const Q=Y.isScene===!0?Y.overrideMaterial:null;for(let j=0,Le=D.length;j<Le;j++){const Ne=D[j],{object:Ce,geometry:ke,group:We}=Ne;let ot=Ne.material;ot.allowOverride===!0&&Q!==null&&(ot=Q),Ce.layers.test(se.layers)&&Yh(Ce,Y,se,ke,ot,We)}}function Yh(D,Y,se,Q,j,Le){R!==null&&j.isNodeMaterial&&R.setObject(D,j),D.onBeforeRender(C,Y,se,Q,j,Le),D.modelViewMatrix.multiplyMatrices(se.matrixWorldInverse,D.matrixWorld),D.normalMatrix.getNormalMatrix(D.modelViewMatrix),j.onBeforeRender(C,Y,se,Q,D,Le),j.transparent===!0&&j.side===ti&&j.forceSinglePass===!1?(j.side=Hn,j.needsUpdate=!0,C.renderBufferDirect(se,Y,Q,j,D,Le),j.side=ks,j.needsUpdate=!0,C.renderBufferDirect(se,Y,Q,j,D,Le),j.side=ti):C.renderBufferDirect(se,Y,Q,j,D,Le),D.onAfterRender(C,Y,se,Q,j,Le)}function ma(D,Y,se){Y.isScene!==!0&&(Y=Ke);const Q=J.get(D),j=y.state.lights,Le=y.state.shadowsArray,Ne=j.state.version,Ce=_e.getParameters(D,j.state,Le,Y,se,y.state.lightProbeGridArray),ke=_e.getProgramCacheKey(Ce);let We=Q.programs;Q.environment=D.isMeshStandardMaterial||D.isMeshLambertMaterial||D.isMeshPhongMaterial?Y.environment:null,Q.fog=Y.fog;const ot=D.isMeshStandardMaterial||D.isMeshLambertMaterial&&!D.envMap||D.isMeshPhongMaterial&&!D.envMap;Q.envMap=Me.get(D.envMap||Q.environment,ot),Q.envMapRotation=Q.environment!==null&&D.envMap===null?Y.environmentRotation:D.envMapRotation,We===void 0&&(D.addEventListener("dispose",vi),We=new Map,Q.programs=We);let ut=We.get(ke);if(ut!==void 0){if(Q.currentProgram===ut&&Q.lightsStateVersion===Ne)return Kh(D,Ce),ut}else Ce.uniforms=_e.getUniforms(D),R!==null&&D.isNodeMaterial&&R.build(D,se,Ce),D.onBeforeCompile(Ce,C),ut=_e.acquireProgram(Ce,ke),We.set(ke,ut),Q.uniforms=Ce.uniforms;const Ue=Q.uniforms;return(!D.isShaderMaterial&&!D.isRawShaderMaterial||D.clipping===!0)&&(Ue.clippingPlanes=Ye.uniform),Kh(D,Ce),Q.needsLights=I0(D),Q.lightsStateVersion=Ne,Q.needsLights&&(Ue.ambientLightColor.value=j.state.ambient,Ue.lightProbe.value=j.state.probe,Ue.sunLights.value=j.state.sun,Ue.sunLightShadows.value=j.state.sunShadow,Ue.directionalLights.value=j.state.directional,Ue.directionalLightShadows.value=j.state.directionalShadow,Ue.spotLights.value=j.state.spot,Ue.spotLightShadows.value=j.state.spotShadow,Ue.rectAreaLights.value=j.state.rectArea,Ue.ltc_1.value=j.state.rectAreaLTC1,Ue.ltc_2.value=j.state.rectAreaLTC2,Ue.pointLights.value=j.state.point,Ue.pointLightShadows.value=j.state.pointShadow,Ue.hemisphereLights.value=j.state.hemi,Ue.sunShadowMatrix.value=j.state.sunShadowMatrix,Ue.sunShadowCascade.value=j.state.sunShadowCascade,Ue.directionalShadowMatrix.value=j.state.directionalShadowMatrix,Ue.spotLightMatrix.value=j.state.spotLightMatrix,Ue.spotLightMap.value=j.state.spotLightMap,Ue.pointShadowMatrix.value=j.state.pointShadowMatrix),Q.lightProbeGrid=y.state.lightProbeGridArray.length>0,Q.currentProgram=ut,Q.uniformsList=null,ut}function Xh(D){if(D.uniformsList===null){const Y=D.currentProgram.getUniforms();D.uniformsList=lo.seqWithValue(Y.seq,D.uniforms)}return D.uniformsList}function Kh(D,Y){const se=J.get(D);se.outputColorSpace=Y.outputColorSpace,se.batching=Y.batching,se.batchingColor=Y.batchingColor,se.instancing=Y.instancing,se.instancingColor=Y.instancingColor,se.instancingMorph=Y.instancingMorph,se.skinning=Y.skinning,se.morphTargets=Y.morphTargets,se.morphNormals=Y.morphNormals,se.morphColors=Y.morphColors,se.morphTargetsCount=Y.morphTargetsCount,se.numClippingPlanes=Y.numClippingPlanes,se.numIntersection=Y.numClipIntersection,se.vertexAlphas=Y.vertexAlphas,se.vertexTangents=Y.vertexTangents,se.toneMapping=Y.toneMapping}function L0(D,Y){if(D.length===0)return null;if(D.length===1)return D[0].texture!==null?D[0]:null;w.setFromMatrixPosition(Y.matrixWorld);for(let se=0,Q=D.length;se<Q;se++){const j=D[se];if(j.texture!==null&&j.boundingBox.containsPoint(w))return j}return null}function P0(D,Y,se,Q,j){Y.isScene!==!0&&(Y=Ke),ie.resetTextureUnits();const Le=Y.fog,Ne=Q.isMeshStandardMaterial||Q.isMeshLambertMaterial||Q.isMeshPhongMaterial?Y.environment:null,Ce=ne===null?C.outputColorSpace:ne.isXRRenderTarget===!0?ne.texture.colorSpace:ft.workingColorSpace,ke=Q.isMeshStandardMaterial||Q.isMeshLambertMaterial&&!Q.envMap||Q.isMeshPhongMaterial&&!Q.envMap,We=Me.get(Q.envMap||Ne,ke),ot=Q.vertexColors===!0&&!!se.attributes.color&&se.attributes.color.itemSize===4,ut=!!se.attributes.tangent&&(!!Q.normalMap||Q.anisotropy>0),Ue=!!se.morphAttributes.position,At=!!se.morphAttributes.normal,sn=!!se.morphAttributes.color;let Vt=Di;Q.toneMapped&&(ne===null||ne.isXRRenderTarget===!0)&&(Vt=C.toneMapping);const Ut=se.morphAttributes.position||se.morphAttributes.normal||se.morphAttributes.color,wn=Ut!==void 0?Ut.length:0,Oe=J.get(Q),Cn=y.state.lights;if($===!0&&(le===!0||D!==re)){const zt=D===re&&Q.id===K;Ye.setState(Q,D,zt)}let gt=!1;Q.version===Oe.__version?(Oe.needsLights&&Oe.lightsStateVersion!==Cn.state.version||Oe.outputColorSpace!==Ce||j.isBatchedMesh&&Oe.batching===!1||!j.isBatchedMesh&&Oe.batching===!0||j.isBatchedMesh&&Oe.batchingColor===!0&&j._colorsTexture===null||j.isBatchedMesh&&Oe.batchingColor===!1&&j._colorsTexture!==null||j.isInstancedMesh&&Oe.instancing===!1||!j.isInstancedMesh&&Oe.instancing===!0||j.isSkinnedMesh&&Oe.skinning===!1||!j.isSkinnedMesh&&Oe.skinning===!0||j.isInstancedMesh&&Oe.instancingColor===!0&&j.instanceColor===null||j.isInstancedMesh&&Oe.instancingColor===!1&&j.instanceColor!==null||j.isInstancedMesh&&Oe.instancingMorph===!0&&j.morphTexture===null||j.isInstancedMesh&&Oe.instancingMorph===!1&&j.morphTexture!==null||Oe.envMap!==We||Q.fog===!0&&Oe.fog!==Le||Oe.numClippingPlanes!==void 0&&(Oe.numClippingPlanes!==Ye.numPlanes||Oe.numIntersection!==Ye.numIntersection)||Oe.vertexAlphas!==ot||Oe.vertexTangents!==ut||Oe.morphTargets!==Ue||Oe.morphNormals!==At||Oe.morphColors!==sn||Oe.toneMapping!==Vt||Oe.morphTargetsCount!==wn||!!Oe.lightProbeGrid!=y.state.lightProbeGridArray.length>0)&&(gt=!0):(gt=!0,Oe.__version=Q.version);let Jn=Oe.currentProgram;gt===!0&&(Jn=ma(Q,Y,j),R&&Q.isNodeMaterial&&R.onUpdateProgram(Q,Jn,Oe));let bi=!1,Zi=!1,Xs=!1;const Nt=Jn.getUniforms(),en=Oe.uniforms;if(L.useProgram(Jn.program)&&(bi=!0,Zi=!0,Xs=!0),Q.id!==K&&(K=Q.id,Zi=!0),Oe.needsLights){const zt=L0(y.state.lightProbeGridArray,j);Oe.lightProbeGrid!==zt&&(Oe.lightProbeGrid=zt,Zi=!0)}if(bi||re!==D){L.buffers.depth.getReversed()&&D.reversedDepth!==!0&&(D._reversedDepth=!0,D.updateProjectionMatrix()),Nt.setValue(z,"projectionMatrix",D.projectionMatrix),Nt.setValue(z,"viewMatrix",D.matrixWorldInverse);const Qi=Nt.map.cameraPosition;Qi!==void 0&&Qi.setValue(z,Ie.setFromMatrixPosition(D.matrixWorld)),F.logarithmicDepthBuffer&&Nt.setValue(z,"logDepthBufFC",2/(Math.log(D.far+1)/Math.LN2)),(Q.isMeshPhongMaterial||Q.isMeshToonMaterial||Q.isMeshLambertMaterial||Q.isMeshBasicMaterial||Q.isMeshStandardMaterial||Q.isShaderMaterial)&&Nt.setValue(z,"isOrthographic",D.isOrthographicCamera===!0),re!==D&&(re=D,Zi=!0,Xs=!0)}if(Oe.needsLights&&(Cn.state.sunShadowMap.length>0&&Nt.setValue(z,"sunShadowMap",Cn.state.sunShadowMap,ie),Cn.state.directionalShadowMap.length>0&&Nt.setValue(z,"directionalShadowMap",Cn.state.directionalShadowMap,ie),Cn.state.spotShadowMap.length>0&&Nt.setValue(z,"spotShadowMap",Cn.state.spotShadowMap,ie),Cn.state.pointShadowMap.length>0&&Nt.setValue(z,"pointShadowMap",Cn.state.pointShadowMap,ie)),j.isSkinnedMesh){Nt.setOptional(z,j,"bindMatrix"),Nt.setOptional(z,j,"bindMatrixInverse");const zt=j.skeleton;zt&&(zt.boneTexture===null&&zt.computeBoneTexture(),Nt.setValue(z,"boneTexture",zt.boneTexture,ie))}j.isBatchedMesh&&(Nt.setOptional(z,j,"batchingTexture"),Nt.setValue(z,"batchingTexture",j._matricesTexture,ie),Nt.setOptional(z,j,"batchingIdTexture"),Nt.setValue(z,"batchingIdTexture",j._indirectTexture,ie),Nt.setOptional(z,j,"batchingColorTexture"),j._colorsTexture!==null&&Nt.setValue(z,"batchingColorTexture",j._colorsTexture,ie));const Ji=se.morphAttributes;if((Ji.position!==void 0||Ji.normal!==void 0||Ji.color!==void 0)&&X.update(j,se,Jn),(Zi||Oe.receiveShadow!==j.receiveShadow)&&(Oe.receiveShadow=j.receiveShadow,Nt.setValue(z,"receiveShadow",j.receiveShadow)),(Q.isMeshStandardMaterial||Q.isMeshLambertMaterial||Q.isMeshPhongMaterial)&&Q.envMap===null&&Y.environment!==null&&(en.envMapIntensity.value=Y.environmentIntensity),en.dfgLUT!==void 0&&(en.dfgLUT.value=Mw()),Zi){if(Nt.setValue(z,"toneMappingExposure",C.toneMappingExposure),Oe.needsLights&&D0(en,Xs),Le&&Q.fog===!0&&ze.refreshFogUniforms(en,Le),ze.refreshMaterialUniforms(en,Q,ee,q,y.state.transmissionRenderTarget[D.id]),Oe.needsLights&&Oe.lightProbeGrid){const zt=Oe.lightProbeGrid;en.probesSH.value=zt.texture,en.probesMin.value.copy(zt.boundingBox.min),en.probesMax.value.copy(zt.boundingBox.max),en.probesResolution.value.copy(zt.resolution)}lo.upload(z,Xh(Oe),en,ie)}if(Q.isShaderMaterial&&Q.uniformsNeedUpdate===!0&&(lo.upload(z,Xh(Oe),en,ie),Q.uniformsNeedUpdate=!1),Q.isSpriteMaterial&&Nt.setValue(z,"center",j.center),Nt.setValue(z,"modelViewMatrix",j.modelViewMatrix),Nt.setValue(z,"normalMatrix",j.normalMatrix),Nt.setValue(z,"modelMatrix",j.matrixWorld),Q.uniformsGroups!==void 0){const zt=Q.uniformsGroups;for(let Qi=0,Ks=zt.length;Qi<Ks;Qi++){const $h=zt[Qi];ge.update($h,Jn),ge.bind($h,Jn)}}return Jn}function D0(D,Y){D.ambientLightColor.needsUpdate=Y,D.lightProbe.needsUpdate=Y,D.sunLights.needsUpdate=Y,D.sunLightShadows.needsUpdate=Y,D.directionalLights.needsUpdate=Y,D.directionalLightShadows.needsUpdate=Y,D.pointLights.needsUpdate=Y,D.pointLightShadows.needsUpdate=Y,D.spotLights.needsUpdate=Y,D.spotLightShadows.needsUpdate=Y,D.rectAreaLights.needsUpdate=Y,D.hemisphereLights.needsUpdate=Y}function I0(D){return D.isMeshLambertMaterial||D.isMeshToonMaterial||D.isMeshPhongMaterial||D.isMeshStandardMaterial||D.isShadowMaterial||D.isShaderMaterial&&D.lights===!0}this.getActiveCubeFace=function(){return U},this.getActiveMipmapLevel=function(){return W},this.getRenderTarget=function(){return ne},this.setRenderTargetTextures=function(D,Y,se){const Q=J.get(D);Q.__autoAllocateDepthBuffer=D.resolveDepthBuffer===!1,Q.__autoAllocateDepthBuffer===!1&&(Q.__useRenderToTexture=!1),J.get(D.texture).__webglTexture=Y,J.get(D.depthTexture).__webglTexture=Q.__autoAllocateDepthBuffer?void 0:se,Q.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(D,Y){const se=J.get(D);se.__webglFramebuffer=Y,se.__useDefaultFramebuffer=Y===void 0},this.setRenderTarget=function(D,Y=0,se=0){ne=D,U=Y,W=se;let Q=null,j=!1,Le=!1;if(D){const Ce=J.get(D);if(Ce.__useDefaultFramebuffer!==void 0){L.bindFramebuffer(z.FRAMEBUFFER,Ce.__webglFramebuffer),N.copy(D.viewport),te.copy(D.scissor),ae=D.scissorTest,L.viewport(N),L.scissor(te),L.setScissorTest(ae),K=-1;return}else if(Ce.__webglFramebuffer===void 0)ie.setupRenderTarget(D);else if(Ce.__hasExternalTextures)ie.rebindTextures(D,J.get(D.texture).__webglTexture,J.get(D.depthTexture).__webglTexture);else if(D.depthBuffer){const ot=D.depthTexture;if(Ce.__boundDepthTexture!==ot){if(ot!==null&&J.has(ot)&&(D.width!==ot.image.width||D.height!==ot.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");ie.setupDepthRenderbuffer(D)}}const ke=D.texture;(ke.isData3DTexture||ke.isDataArrayTexture||ke.isCompressedArrayTexture)&&(Le=!0);const We=J.get(D).__webglFramebuffer;D.isWebGLCubeRenderTarget?(Array.isArray(We[Y])?Q=We[Y][se]:Q=We[Y],j=!0):D.samples>0&&ie.useMultisampledRTT(D)===!1?Q=J.get(D).__webglMultisampledFramebuffer:Array.isArray(We)?Q=We[se]:Q=We,N.copy(D.viewport),te.copy(D.scissor),ae=D.scissorTest}else N.copy(H).multiplyScalar(ee).floor(),te.copy(Z).multiplyScalar(ee).floor(),ae=fe;if(se!==0&&(Q=O),L.bindFramebuffer(z.FRAMEBUFFER,Q)&&L.drawBuffers(D,Q),L.viewport(N),L.scissor(te),L.setScissorTest(ae),j){const Ce=J.get(D.texture);z.framebufferTexture2D(z.FRAMEBUFFER,z.COLOR_ATTACHMENT0,z.TEXTURE_CUBE_MAP_POSITIVE_X+Y,Ce.__webglTexture,se)}else if(Le){const Ce=Y;for(let ke=0;ke<D.textures.length;ke++){const We=J.get(D.textures[ke]);z.framebufferTextureLayer(z.FRAMEBUFFER,z.COLOR_ATTACHMENT0+ke,We.__webglTexture,se,Ce)}}else if(D!==null&&se!==0){const Ce=J.get(D.texture);z.framebufferTexture2D(z.FRAMEBUFFER,z.COLOR_ATTACHMENT0,z.TEXTURE_2D,Ce.__webglTexture,se)}K=-1};function qh(D){const Y=J.get(D);return(Y.__readFormat!==D.format||Y.__readType!==D.type)&&(Y.__readFormat=D.format,Y.__readType=D.type,Y.__formatReadable=F.textureFormatReadable(D.format),Y.__typeReadable=F.textureTypeReadable(D.type)),Y}this.readRenderTargetPixels=function(D,Y,se,Q,j,Le,Ne,Ce=0){if(!(D&&D.isWebGLRenderTarget)){Mt("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let ke=J.get(D).__webglFramebuffer;if(D.isWebGLCubeRenderTarget&&Ne!==void 0&&(ke=ke[Ne]),ke){L.bindFramebuffer(z.FRAMEBUFFER,ke);try{const We=D.textures[Ce],ot=We.format,ut=We.type;D.textures.length>1&&z.readBuffer(z.COLOR_ATTACHMENT0+Ce);const Ue=qh(We);if(Ue.__formatReadable===!1){Mt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(Ue.__typeReadable===!1){Mt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}Y>=0&&Y<=D.width-Q&&se>=0&&se<=D.height-j&&z.readPixels(Y,se,Q,j,Ae.convert(ot),Ae.convert(ut),Le)}finally{const We=ne!==null?J.get(ne).__webglFramebuffer:null;L.bindFramebuffer(z.FRAMEBUFFER,We)}}},this.readRenderTargetPixelsAsync=async function(D,Y,se,Q,j,Le,Ne,Ce=0){if(!(D&&D.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let ke=J.get(D).__webglFramebuffer;if(D.isWebGLCubeRenderTarget&&Ne!==void 0&&(ke=ke[Ne]),ke)if(Y>=0&&Y<=D.width-Q&&se>=0&&se<=D.height-j){L.bindFramebuffer(z.FRAMEBUFFER,ke);const We=D.textures[Ce],ot=We.format,ut=We.type;D.textures.length>1&&z.readBuffer(z.COLOR_ATTACHMENT0+Ce);const Ue=qh(We);if(Ue.__formatReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(Ue.__typeReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const At=z.createBuffer();z.bindBuffer(z.PIXEL_PACK_BUFFER,At),z.bufferData(z.PIXEL_PACK_BUFFER,Le.byteLength,z.STREAM_READ),z.readPixels(Y,se,Q,j,Ae.convert(ot),Ae.convert(ut),0),z.bindBuffer(z.PIXEL_PACK_BUFFER,null);const sn=ne!==null?J.get(ne).__webglFramebuffer:null;L.bindFramebuffer(z.FRAMEBUFFER,sn);const Vt=z.fenceSync(z.SYNC_GPU_COMMANDS_COMPLETE,0);return z.flush(),await zM(z,Vt,4),z.bindBuffer(z.PIXEL_PACK_BUFFER,At),z.getBufferSubData(z.PIXEL_PACK_BUFFER,0,Le),z.bindBuffer(z.PIXEL_PACK_BUFFER,null),z.deleteBuffer(At),z.deleteSync(Vt),Le}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(D,Y=null,se=0){const Q=Math.pow(2,-se),j=Math.floor(D.image.width*Q),Le=Math.floor(D.image.height*Q),Ne=Y!==null?Y.x:0,Ce=Y!==null?Y.y:0;ie.setTexture2D(D,0),z.copyTexSubImage2D(z.TEXTURE_2D,se,0,0,Ne,Ce,j,Le),L.unbindTexture()},this.copyTextureToTexture=function(D,Y,se=null,Q=null,j=0,Le=0){let Ne,Ce,ke,We,ot,ut,Ue,At,sn;const Vt=D.isCompressedTexture?D.mipmaps[Le]:D.image;if(se!==null)Ne=se.max.x-se.min.x,Ce=se.max.y-se.min.y,ke=se.isBox3?se.max.z-se.min.z:1,We=se.min.x,ot=se.min.y,ut=se.isBox3?se.min.z:0;else{const en=Math.pow(2,-j);Ne=Math.floor(Vt.width*en),Ce=Math.floor(Vt.height*en),D.isDataArrayTexture?ke=Vt.depth:D.isData3DTexture?ke=Math.floor(Vt.depth*en):ke=1,We=0,ot=0,ut=0}Q!==null?(Ue=Q.x,At=Q.y,sn=Q.z):(Ue=0,At=0,sn=0);const Ut=Ae.convert(Y.format),wn=Ae.convert(Y.type);let Oe;Y.isData3DTexture?(ie.setTexture3D(Y,0),Oe=z.TEXTURE_3D):Y.isDataArrayTexture||Y.isCompressedArrayTexture?(ie.setTexture2DArray(Y,0),Oe=z.TEXTURE_2D_ARRAY):(ie.setTexture2D(Y,0),Oe=z.TEXTURE_2D),L.activeTexture(z.TEXTURE0),L.pixelStorei(z.UNPACK_FLIP_Y_WEBGL,Y.flipY),L.pixelStorei(z.UNPACK_PREMULTIPLY_ALPHA_WEBGL,Y.premultiplyAlpha),L.pixelStorei(z.UNPACK_ALIGNMENT,Y.unpackAlignment);const Cn=L.getParameter(z.UNPACK_ROW_LENGTH),gt=L.getParameter(z.UNPACK_IMAGE_HEIGHT),Jn=L.getParameter(z.UNPACK_SKIP_PIXELS),bi=L.getParameter(z.UNPACK_SKIP_ROWS),Zi=L.getParameter(z.UNPACK_SKIP_IMAGES);L.pixelStorei(z.UNPACK_ROW_LENGTH,Vt.width),L.pixelStorei(z.UNPACK_IMAGE_HEIGHT,Vt.height),L.pixelStorei(z.UNPACK_SKIP_PIXELS,We),L.pixelStorei(z.UNPACK_SKIP_ROWS,ot),L.pixelStorei(z.UNPACK_SKIP_IMAGES,ut);const Xs=D.isDataArrayTexture||D.isData3DTexture,Nt=Y.isDataArrayTexture||Y.isData3DTexture;if(D.isDepthTexture){const en=J.get(D),Ji=J.get(Y),zt=J.get(en.__renderTarget),Qi=J.get(Ji.__renderTarget);L.bindFramebuffer(z.READ_FRAMEBUFFER,zt.__webglFramebuffer),L.bindFramebuffer(z.DRAW_FRAMEBUFFER,Qi.__webglFramebuffer);for(let Ks=0;Ks<ke;Ks++)Xs&&(z.framebufferTextureLayer(z.READ_FRAMEBUFFER,z.COLOR_ATTACHMENT0,J.get(D).__webglTexture,j,ut+Ks),z.framebufferTextureLayer(z.DRAW_FRAMEBUFFER,z.COLOR_ATTACHMENT0,J.get(Y).__webglTexture,Le,sn+Ks)),z.blitFramebuffer(We,ot,Ne,Ce,Ue,At,Ne,Ce,z.DEPTH_BUFFER_BIT,z.NEAREST);L.bindFramebuffer(z.READ_FRAMEBUFFER,null),L.bindFramebuffer(z.DRAW_FRAMEBUFFER,null)}else if(j!==0||D.isRenderTargetTexture||J.has(D)){const en=J.get(D),Ji=J.get(Y);L.bindFramebuffer(z.READ_FRAMEBUFFER,I),L.bindFramebuffer(z.DRAW_FRAMEBUFFER,k);for(let zt=0;zt<ke;zt++)Xs?z.framebufferTextureLayer(z.READ_FRAMEBUFFER,z.COLOR_ATTACHMENT0,en.__webglTexture,j,ut+zt):z.framebufferTexture2D(z.READ_FRAMEBUFFER,z.COLOR_ATTACHMENT0,z.TEXTURE_2D,en.__webglTexture,j),Nt?z.framebufferTextureLayer(z.DRAW_FRAMEBUFFER,z.COLOR_ATTACHMENT0,Ji.__webglTexture,Le,sn+zt):z.framebufferTexture2D(z.DRAW_FRAMEBUFFER,z.COLOR_ATTACHMENT0,z.TEXTURE_2D,Ji.__webglTexture,Le),j!==0?z.blitFramebuffer(We,ot,Ne,Ce,Ue,At,Ne,Ce,z.COLOR_BUFFER_BIT,z.NEAREST):Nt?z.copyTexSubImage3D(Oe,Le,Ue,At,sn+zt,We,ot,Ne,Ce):z.copyTexSubImage2D(Oe,Le,Ue,At,We,ot,Ne,Ce);L.bindFramebuffer(z.READ_FRAMEBUFFER,null),L.bindFramebuffer(z.DRAW_FRAMEBUFFER,null)}else Nt?D.isDataTexture||D.isData3DTexture?z.texSubImage3D(Oe,Le,Ue,At,sn,Ne,Ce,ke,Ut,wn,Vt.data):Y.isCompressedArrayTexture?z.compressedTexSubImage3D(Oe,Le,Ue,At,sn,Ne,Ce,ke,Ut,Vt.data):z.texSubImage3D(Oe,Le,Ue,At,sn,Ne,Ce,ke,Ut,wn,Vt):D.isDataTexture?z.texSubImage2D(z.TEXTURE_2D,Le,Ue,At,Ne,Ce,Ut,wn,Vt.data):D.isCompressedTexture?z.compressedTexSubImage2D(z.TEXTURE_2D,Le,Ue,At,Vt.width,Vt.height,Ut,Vt.data):z.texSubImage2D(z.TEXTURE_2D,Le,Ue,At,Ne,Ce,Ut,wn,Vt);L.pixelStorei(z.UNPACK_ROW_LENGTH,Cn),L.pixelStorei(z.UNPACK_IMAGE_HEIGHT,gt),L.pixelStorei(z.UNPACK_SKIP_PIXELS,Jn),L.pixelStorei(z.UNPACK_SKIP_ROWS,bi),L.pixelStorei(z.UNPACK_SKIP_IMAGES,Zi),Le===0&&Y.generateMipmaps&&z.generateMipmap(Oe),L.unbindTexture()},this.initRenderTarget=function(D){J.get(D).__webglFramebuffer===void 0&&ie.setupRenderTarget(D)},this.initTexture=function(D){D.isCubeTexture?ie.setTextureCube(D,0):D.isData3DTexture?ie.setTexture3D(D,0):D.isDataArrayTexture||D.isCompressedArrayTexture?ie.setTexture2DArray(D,0):ie.setTexture2D(D,0),L.unbindTexture()},this.resetState=function(){U=0,W=0,ne=null,L.reset(),De.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Ci}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=ft._getDrawingBufferColorSpace(e),t.unpackColorSpace=ft._getUnpackColorSpace()}}const bw=new Set([l.LEAF,l.LEAF2,l.LEAF3]);function yw(n={}){const e=n.leafHue??.3,t=n.vanHue??.03;return{[l.TRUNK]:[92,66,48],[l.BARK2]:[70,50,38],[l.BARKD]:[44,32,28],[l.BARKL]:[124,94,68],[l.LEAF]:me(e,.55,.42),[l.LEAF2]:me(e+.02,.5,.55),[l.LEAF3]:me(e+.04,.6,.26),[l.BODY]:me(t,.62,.72),[l.BELLY]:[236,226,204],[l.BODY2]:me(t+.5,.45,.6),[l.BODY3]:[40,36,46],[l.FRAME]:[196,200,210],[l.SHADES]:[28,26,32],[l.HAT1]:[74,70,96],[l.HAT2]:[96,88,122],[l.STONE]:[118,116,124],[l.STONED]:[64,62,72],[l.MOSS]:[80,112,60],[l.WOOD]:[148,104,62],[l.STRAW]:[196,168,112],[l.CLOTH]:[232,220,196],[l.ACCENT]:me(.95,.6,.85),[l.EAR]:[176,96,64],[l.GLOW]:[255,190,96],[l.MAGIC2]:[255,236,190],[l.COLLAR]:[255,80,200],[l.RUNE]:[80,230,255],[l.WOKEN]:[255,214,80],[l.MAGIC]:[180,110,255],[l.LINE]:[24,22,30],[l.NOSE]:[14,12,18]}}const mn=2.5,_w=[2.2,mn,.3],Ol=[l.COLLAR,l.RUNE,l.WOKEN,l.MAGIC];function ww(){const n=new Qe({blend:.05}),e=[],t=(y,S)=>{const b=Math.sin(y*127.1+S*311.7)*43758.5453;return b-Math.floor(b)},i=y=>{const S=Math.sin(Math.atan2(y[2],y[0])*9+y[1]*2.3);return S>.75?l.BARKD:S<-.6?l.BARKL:S>.35?l.BARK2:void 0};n.chain([[0,-.05,-.2,.62],[.05,1.4,-.22,.5],[.1,2.4,-.3,.44],[-.05,3.6,-.45,.34],[-.15,4.7,-.55,.24]],l.TRUNK,{group:1,rough:.025,paint:i});for(let y=0;y<7;y++){const S=y/7*Math.PI*2+.3,b=.45,E=1.05+t(y,1)*.45;n.chain([[Math.cos(S)*b,.45,-.2+Math.sin(S)*b,.2],[Math.cos(S)*(b+E)*.55,.16,-.2+Math.sin(S)*(b+E)*.55,.13],[Math.cos(S)*E,.02,-.2+Math.sin(S)*E,.05]],l.TRUNK,{group:1,rough:.015,paint:i})}const s=(y,S=1)=>n.chain(y,l.TRUNK,{group:S,rough:.015,paint:i});s([[.1,2,-.25,.26],[.9,2.12,0,.18],[1.6,2.2,.1,.13],[2.9,2.35,.2,.07]]),s([[0,2.1,-.3,.25],[-.9,2.25,-.05,.17],[-1.7,2.45,.05,.1],[-2.2,2.75,.05,.05]]),s([[-.05,3.6,-.45,.2],[.9,4.3,-.55,.14],[1.8,4.9,-.6,.07]],2),s([[-.1,4,-.5,.18],[-1.1,4.6,-.7,.12],[-1.9,5,-.8,.06]],2),s([[-.15,4.6,-.55,.14],[.2,5.4,-.85,.08]],2);const r=y=>S=>{const b=t(Math.floor(S[0]*9),Math.floor(S[1]*9)+Math.floor(S[2]*9)*7);return S[1]<y[1]-.25||b<.18?l.LEAF3:b>.82?l.LEAF2:void 0};for(const[y,S]of[[[-1.7,5.15,-.9],[.95,.6,.75]],[[1.6,5.2,-.8],[.95,.62,.75]],[[.1,5.85,-1],[1.15,.7,.85]],[[-.7,4.65,-1.25],[.85,.55,.6]],[[.95,4.6,-1.3],[.8,.5,.6]],[[-2.4,4.6,-.7],[.55,.45,.5]],[[2.5,4.75,-.6],[.6,.45,.5]]])n.ell(y,S,l.LEAF,{group:40,rough:.05,paint:r(y)});const a=[-.15,2.92,.15],o=P.norm([1,.07,0]),h=[1.25,.52,.58],c=y=>P.dot(P.sub(y,a),o),d=y=>P.dot(P.sub(y,a),[-o[1],o[0],0]);n.box(a,h,l.BODY,{dir:o,round:.22,group:3,paint:y=>{const S=c(y),b=d(y),E=y[2]>a[2]+h[2]-.04;return E&&Math.hypot(S+.85,b-.02)<.15?Math.hypot(S+.85,b-.02)<.11?l.GLOW:l.FRAME:E&&S>.35&&S<.8&&b>-.42&&b<.38?b>.02&&b<.3&&S>.42&&S<.73?l.GLOW:Math.abs(S-.575)<.2&&b<-.38?l.FRAME:l.BODY2:E&&b>.06&&b<.32&&S>-.6&&S<.25?Math.abs(S+.17)<.02?l.BELLY:l.GLOW:S>h[0]-.05&&b>.05&&b<.35&&Math.abs(y[2]-a[2])<.45?l.MAGIC2:S>h[0]-.06&&Math.abs(b+.2)<.07&&Math.abs(Math.abs(y[2]-a[2])-.38)<.08?l.FRAME:b>.02?l.BELLY:b<-.42?l.SHADES:void 0}}),e.push({at:P.add(a,[-.15,.2,h[2]+.1]),rgb:[255,190,96],kind:"window"},{at:P.add(a,[-.9,.05,h[2]+.1]),rgb:[255,190,96],kind:"porthole"},{at:P.add(a,[1.3,.25,0]),rgb:[255,236,190],kind:"windscreen"});for(const y of[-.75,.75]){const S=P.add(P.add(a,P.mul(o,y)),[0,-.5,h[2]-.02]);n.ell(S,[.21,.21,.08],l.SHADES,{group:4,paint:b=>Math.hypot(b[0]-S[0],b[1]-S[1])<.1?l.FRAME:void 0})}n.seg(P.add(a,[1.05,.3,h[2]-.02]),P.add(a,[1.2,.32,h[2]+.14]),.015,.015,l.FRAME,{group:5}),n.box(P.add(a,[1.22,.34,h[2]+.16]),[.04,.06,.02],l.FRAME,{group:5,round:.015});const f=P.add(a,[-.25,h[1]+.14,0]);n.box(f,[.95,.1,.5],l.CLOTH,{dir:o,round:.05,group:6,paint:y=>Math.floor((c(y)+2)*6)%2?l.BODY2:void 0}),n.box(P.add(f,[0,.14,0]),[1,.05,.54],l.BELLY,{dir:P.norm([1,.14,0]),round:.04,group:6});for(const y of[-.18,.18])n.seg(P.add(a,[-1.33,-.45,y]),P.add(a,[-1.3,.62,y]),.02,.02,l.FRAME,{group:7});for(let y=0;y<5;y++)n.seg(P.add(a,[-1.33,-.32+y*.22,-.18]),P.add(a,[-1.33,-.32+y*.22,.18]),.014,.014,l.FRAME,{group:7});const u=[-.75,3.25,-.05],p=.44,g=1.45;n.seg(u,P.add(u,[0,g,0]),p,p-.04,l.STONE,{group:8,rough:.012,paint:y=>{const S=y[1]-u[1],b=Math.atan2(y[2]-u[2],y[0]-u[0]),E=Math.floor(S*6),C=Math.floor((b+Math.PI)*4+E%2*.5);return Math.abs(b-Math.PI/2+.35)<.07&&S>.75&&S<1.15?l.GLOW:S*6%1<.12||((b+Math.PI)*4+E%2*.5)%1<.1?l.STONED:t(E,C)<.15&&S<.5?l.MOSS:void 0}}),e.push({at:P.add(u,[.2,.95,p+.1]),rgb:[255,190,96],kind:"arrow slit"});for(let y=0;y<8;y++){const S=y/8*Math.PI*2;n.box(P.add(u,[Math.cos(S)*(p-.05),g+.1,Math.sin(S)*(p-.05)]),[.1,.1,.08],l.STONE,{dir:[-Math.sin(S),0,Math.cos(S)],round:.02,group:9,rough:.008})}const M=P.add(u,[0,g+.1,0]),x=P.add(M,[.08,1.05,-.04]);n.seg(M,x,p-.1,.02,l.HAT1,{group:10,paint:y=>Math.floor((y[1]-M[1])*7)%2?l.HAT2:void 0}),n.seg(x,P.add(x,[0,.45,0]),.015,.012,l.FRAME,{group:11}),n.box(P.add(x,[.17,.37,0]),[.16,.06,.01],l.ACCENT,{dir:[1,-.15,.1],round:.005,group:11}),n.box([-1.35,2.45,.3],[.28,.2,.22],l.STONE,{dir:[1,.3,.2],round:.05,rough:.01,group:12,paint:y=>y[1]>2.58?l.MOSS:void 0}),n.box(P.add(a,[-.35,-.33,h[2]+.01]),[.3,.05,.02],l.WOOD,{dir:[1,.12,0],round:.01,group:13}),n.box(P.add(a,[-.3,-.22,h[2]+.01]),[.26,.045,.02],l.WOOD,{dir:[1,-.08,0],round:.01,group:13});for(const y of[-.9,.95]){const S=P.add(a,[y,-.55,0]);for(const b of[-1,1])n.seg(P.add(S,[b*.04,-.08,h[2]+.03]),P.add(S,[b*.04,.1,h[2]+.03]),.025,.025,l.STRAW,{group:14})}const m=[2.05,mn-.05,.3],v=[.85,.05,.62];n.box(m,v,l.WOOD,{round:.02,group:15,paint:y=>(y[2]-m[2]+2)*9%1<.12?l.BARKD:void 0});for(const[y,S]of[[1.3,-.25],[2.8,-.25],[2.8,.85],[1.3,.85]])n.seg([y,mn-.1,S],[y,mn-.7,S*.3],.04,.04,l.WOOD,{group:16});const _=[[1.25,.9],[2.88,.9],[2.88,-.3]];for(let y=0;y+1<_.length;y++){const[S,b]=[_[y],_[y+1]],E=Math.ceil(Math.hypot(b[0]-S[0],b[1]-S[1])/.32);n.seg([S[0],mn+.42,S[1]],[b[0],mn+.42,b[1]],.025,.025,l.WOOD,{group:17});for(let C=0;C<=E;C++){const T=C/E,R=S[0]+(b[0]-S[0])*T,O=S[1]+(b[1]-S[1])*T;n.seg([R,mn,O],[R,mn+.42,O],.02,.02,l.WOOD,{group:17})}}const w=_w;n.box([w[0],w[1]+fr-.02,w[2]],[.2,.025,.2],l.CLOTH,{round:.02,group:18,paint:y=>Math.floor((y[2]+2)*10)%2?l.BODY2:void 0}),n.box([w[0]-.2,w[1]+fr+.22,w[2]],[.025,.24,.2],l.CLOTH,{dir:[1,-.15,0],round:.02,group:18,paint:y=>Math.floor((y[2]+2)*10)%2?l.BODY2:void 0});for(const[y,S]of[[-.18,-.18],[.18,-.18],[-.18,.18],[.18,.18]])n.seg([w[0]+y,w[1],w[2]+S],[w[0]-y*.6,w[1]+fr-.03,w[2]-S*.2],.015,.015,l.FRAME,{group:19});for(const[y,S,b]of[[2.65,-.15,1],[1.45,.7,.8],[2.7,.7,.7]])n.seg([y,mn,S],[y,mn+.2*b,S],.1*b,.13*b,l.EAR,{group:20}),n.ell([y,mn+.3*b,S],[.16*b,.14*b,.16*b],l.LEAF2,{group:21,rough:.02,paint:E=>t(Math.floor(E[0]*30),Math.floor(E[1]*30))<.25?l.LEAF:void 0});n.box([1.62,3.55,.5],[.42,.02,.5],l.CLOTH,{dir:[1,-.35,0],round:.01,group:22,paint:y=>Math.floor((y[2]+2)*5)%2?l.BODY2:void 0});for(const y of[.05,.95])n.seg([1.98,3.4,y],[1.98,mn,y],.02,.02,l.WOOD,{group:23});n.seg([1.95,3.42,.5],[1.95,3.28,.5],.006,.006,l.FRAME,{group:24}),n.ell([1.95,3.2,.5],[.05,.07,.05],l.MAGIC2,{group:24}),e.push({at:[1.95,3.2,.5],rgb:[255,220,150],kind:"lantern"});for(const y of[.18,.48])n.seg([1.2,mn-.05,y],[1,.06,y+.12],.018,.018,l.STRAW,{group:25});for(let y=1;y<8;y++){const S=y/8,b=mn-.05-(mn-.11)*S,E=1.2-.2*S;n.seg([E,b,.18+.12*S],[E,b,.48+.12*S],.02,.02,l.WOOD,{group:25})}const A=(y,S,b,E,C)=>{for(let T=0;T<=E;T++){const R=T/E,O=P.lerp(y,S,R);O[1]-=Math.sin(R*Math.PI)*b,C(O,T)}};return A([-.55,3.95,.45],[1.95,3.42,1],.35,9,(y,S)=>{n.ell(y,[.035,.035,.035],Ol[S%4],{group:26+S%2,extra:!0})}),A([-.75,4.7,.42],[1.6,3.65,1],.2,7,(y,S)=>{n.ell(y,[.03,.03,.03],Ol[(S+2)%4],{group:28+S%2,extra:!0})}),A([2.88,mn+.45,.9],[2.88,mn+.45,-.3],.08,5,(y,S)=>{n.ell(y,[.03,.03,.03],Ol[(S+1)%4],{group:30+S%2,extra:!0})}),A([-2,2.8,.1],[-.9,3.6,.5],.15,5,(y,S)=>{n.box(y,[.05,.06,.01],[l.ACCENT,l.BODY2,l.CLOTH][S%3],{dir:[1,0,.2],round:.005,group:32+S%2})}),e.push({at:[.7,3.4,.75],rgb:[255,120,220],kind:"fairy lights"},{at:[2.88,mn+.4,.3],rgb:[120,230,255],kind:"fairy lights"}),n.ell([.2,.005,-.15],[1.5,.005,1],l.NOSE,{group:0}),{m:n,lights:e,seat:[w[0],w[1],w[2]],door:P.add(a,[.57,-.45,h[2]]),splitY:a[1]+h[1]+.5}}function Sw(n={},{facing:e="towards",ppm:t=16}={}){const i=ww(),s=cn(i.m,{scale:Cr(n),facing:e}),r=s.sp;let a=r.w,o=-1,h=r.h;for(let M=0;M<r.h;M++)for(let x=0;x<r.w;x++)r.m[M*r.w+x]&&(a=Math.min(a,x),o=Math.max(o,x),h=Math.min(h,M));const c=new dt(o-a+1,r.h-h);for(let M=0;M<c.h;M++)for(let x=0;x<c.w;x++){const m=(M+h)*r.w+x+a;r.m[m]&&c.put(x,M,r.m[m],r.n[m*3],r.n[m*3+1],r.n[m*3+2])}const d=M=>{const[x,m]=s.project(M);return[+(x-a).toFixed(1),+(m-h).toFixed(1)]},f=Math.round(d([0,i.splitY,0])[1]),u=new dt(c.w,c.h),p=new dt(c.w,c.h);for(let M=0;M<c.h;M++)for(let x=0;x<c.w;x++){const m=M*c.w+x,v=c.m[m];v&&(bw.has(v)||M<f?u:p).put(x,M,v,c.n[m*3],c.n[m*3+1],c.n[m*3+2])}const g=M=>{const[x,m]=d(M);return{x,y:m}};return{whole:c,top:u,bot:p,crownY:f,anchors:{base:g([0,0,-.2]),seat:g(i.seat),door:g(i.door),lights:i.lights.map(M=>({...g(M.at),rgb:M.rgb,kind:M.kind}))},metres:{height:+(c.h/t).toFixed(1),width:+(c.w/t).toFixed(1)}}}const yn=16,gn=(n,e=0)=>{const t=Math.sin(n*127.1+e*311.7)*43758.5453;return t-Math.floor(t)},Xi=[0,-.42,.9],hn=(n,e,t,i=0)=>{i&&(t=Math.max(1,Math.round(i*t))/i);const s=n*t,r=e*t,a=Math.floor(s),o=Math.floor(r),h=s-a,c=r-o,d=i?Math.round(i*t):0,f=g=>d?(g%d+d)%d:g,u=(g,M)=>gn(g,f(M)),p=g=>g*g*(3-2*g);return(u(a,o)*(1-p(h))+u(a+1,o)*p(h))*(1-p(c))+(u(a,o+1)*(1-p(h))+u(a+1,o+1)*p(h))*p(c)};function Ed(n,e,t,i){t=Math.max(1,Math.round(i*t))/i;const s=n*t,r=e*t,a=Math.floor(s),o=Math.floor(r),h=Math.round(i*t);let c=9,d=9,f=0;for(let u=-1;u<=1;u++)for(let p=-1;p<=1;p++){const g=a+p,M=o+u,x=(M%h+h)%h,m=g+gn(g,x*3+1),v=M+gn(g*7+2,x),_=Math.hypot(m-s,v-r);_<c?(d=c,c=_,f=gn(g,x)):_<d&&(d=_)}return{edge:d-c,id:f}}const ws=(n,e,t,i=.14)=>Math.abs(n)>1-i*hn(n>0?3:7,e,1.4,t)*1.6,Ho={dirt:{width:3,period:4,desc:"a dirt track: worn earth, grass at its edges, puddles in its ruts",moods:["muddy-forest","hazel-forest","twiggy-forest","alder-forest","meadow","grassland","beaver-pond","wispy-forest"],surface(n,e){if(ws(n,e,4,.3))return 0;const i=hn(n*3,e,2.2,4);if(Math.abs(n)>.8-i*.15)return[i>.5?l.LEAF2:l.LEAF,.1];const s=Math.abs(Math.abs(n)-.45)<.1+i*.05;return s&&hn(n*2,e,.9,4)>.68?[l.WATER,0]:[s?i<.5?l.BARK2:l.BARKD:i<.3?l.BARK2:i>.8?l.LEAF3:l.BODY2,.15]}},animal:{width:1.2,period:4,desc:"an animal track: a faint, narrow trail through the undergrowth",moods:["berry-thicket","tangly-forest","holly-thicket","fern-forest","honeysuckle-tangle","ancient","bog"],surface(n,e){if(ws(n,e,4,.5))return 0;const i=hn(n*2,e,3,4);return i<.35?0:[i>.75?l.BARK2:l.LEAF3,.1]}},flagstones:{width:2.5,period:4,desc:"mossy flagstones: an old stone path, gaps between the slabs",moods:["garden","stone-shrine","ancient","bluebell-glade","old-oaks"],surface(n,e){if(ws(n,e,4,.1))return 0;const i=Ed(n*1.25,e,1.3,4);return i.edge<.12?i.edge<.05?0:[l.MOSS,.1]:i.id<.08?0:[i.id<.25?l.STONED:hn(n,e,4,4)<.2?l.MOSS:l.STONE,.25]}},cobbles:{width:4,period:4,desc:"cobbles: a stretch of old village lane",moods:["garden","old-oaks","meadow","stone-shrine"],surface(n,e){if(ws(n,e,4,.08))return 0;const i=Ed(n*2,e,2.2,4);return i.edge<.16?[hn(n,e,3,4)<.3?l.MOSS:l.STONED,.05]:[i.id<.2?l.STONED:i.id>.85?l.BELLY:l.STONE,.35]}},stepping:{width:2,period:4,desc:"stepping stones across water or bog (each also a 3D prop)",moods:["stream","wetland","bog","ravine","beaver-pond"],surface(n,e){const i=1.3333333333333333,s=Math.floor(e/i),r=e-s*i-i/2,a=n*1-(gn(s%3,9)-.5)*.5,o=Math.hypot(a*.9,r/.55);return o>.55+hn(n,e,4,4)*.1?0:[o>.45?l.MOSS:l.STONE,.4]}},boardwalk:{width:2.5,period:4,desc:"a boardwalk: planks on posts over bog or pools, a few boards missing (posts are 3D props)",moods:["bog","wetland","moor","beaver-pond"],surface(n,e){const i=Math.floor(e/.5),s=e/.5-i;if(Math.abs(n)>.97)return[l.BARKD,.1];if(gn(i%8,3)<.1||s<.1)return 0;const r=Math.abs(Math.sin(n*40+i%8*3))<.12;return[hn(n,e,3,4)<.15?l.MOSS:r?l.BARKD:gn(i%8,5)<.4?l.BARK2:l.WOOD,.1]}},tarmac:{width:10,period:8,desc:"an overgrown tarmac road: cracked, faded centre lines, verge posts and a cat's-eye or two (3D props)",moods:["grassland","deadwood","heath","muddy-forest","moor"],surface(n,e,t){if(ws(n,e,8,.06))return 0;const s=hn(n*4,e,1.1,8);return Math.abs(hn(n*6,e,.7,8)-.5)<.02||Math.abs(hn(n*3+9,e,1.6,8)-.5)<.012?[hn(n,e,6,8)<.5?l.LEAF2:l.STONED,0]:Math.abs(n)>.9?[s<.5?l.LEAF2:l.LEAF,.1]:!t&&Math.abs(n)<.025&&e%4<2.2&&s>.3?[l.CLOTH,.05]:!t&&Math.abs(Math.abs(n)-.84)<.015&&s>.35?[l.BELLY,.05]:[s<.2?l.MOSS:s>.85?l.STONED:l.STONE,.05]}},railway:{width:4,period:4,desc:"an old railway line: rusty rails, sleepers half-buried in grass",moods:["grassland","heath","deadwood","moor","norway","rocky-slope"],variants:["plain","half-buried","overgrown"],surface(n,e,t,i=0){const r=hn(n*3,e,2.5,4),a=[0,.35,.6][i];if(ws(n,e,4,.2))return 0;const o=Math.abs(Math.abs(n)-.3);if(o<.05)return[hn(n,e,8,4)<a*.5?l.LEAF2:o<.018?l.FRAME:l.SHADES,.3];const h=Math.floor(e*6/4),c=e*6/4-h;return Math.abs(n)<.55&&c<.38&&hn(n,e,6,4)>a*.8?[gn(h%6,2)<.25||c<.06||c>.32?l.BARKD:l.BARK2,.2]:r<a?[r<a*.5?l.LEAF:l.LEAF2,.1]:[r>.7?l.STONED:l.STONE,.3]}},roots:{width:2.5,period:4,desc:"a root path: gnarled roots across it, worn into steps",moods:["ancient","old-oaks","old-pinewood","log-pile","fern-forest"],surface(n,e){if(ws(n,e,4,.25))return 0;const i=Math.floor(e/.8),s=Math.sin(n*3+i%5*2)*.12,r=e/.8-i+s;return Math.abs(r-.5)<.14+hn(n,e,3,4)*.06?[Math.abs(r-.5)<.05?l.BARKL:l.TRUNK,.6]:[hn(n,e,2,4)<.4?l.BARKD:l.BARK2,.1]}},magic:{width:2,period:4,desc:"a magic trail: a line of softly glowing mushrooms and fairy stones (the one glowing kind; use rarely, leading to a set piece)",glow:!0,moods:["bluebell-glade","hazel-forest","stone-shrine","wispy-forest","ancient"],surface(n,e){const i=Math.floor(e),s=i%2?1:-1,r=e-i-.5,a=Math.hypot((n-s*.8)*2.2,r*3);if(a<.45)return[a<.22?l.MAGIC2:l.MAGIC,0];const o=Math.floor((e+.5)/2);return Math.hypot(n*2.2,(e+.5-o*2-1)*3)<.3?[l.RUNE,0]:Math.abs(n)<.4&&hn(n,e,3,4)>.62?[l.LEAF3,.1]:0}}};function Nl(n,e,t){const i=new dt(n,e);for(let s=0;s<e;s++)for(let r=0;r<n;r++){const a=t(r+.5,s+.5);a&&i.px(r,s,a[0],Xi[0]+(a[1]?(gn(r,s)-.5)*a[1]:0),Xi[1]+(a[1]?(gn(s,r)-.5)*a[1]*.5:0),Xi[2])}return i}function Ew(n,{variant:e=0}={}){const t=Ho[n],i=Math.round(t.width*yn),s=Math.round(t.period*yn);t.width/2;const r=(u,p,g)=>t.surface(u,p,g,e),a=Nl(i,s,(u,p)=>r(u/i*2-1,p/yn)),o=Math.round(Math.max(1.5,t.width*.8)*yn),h=Nl(i,o,(u,p)=>{const g=p/o,M=(u/i*2-1)/Math.max(.05,Math.sqrt(g));return Math.abs(M)>1||hn(u/yn,p/yn,2)>.25+g?0:r(M,p/yn)}),c=Math.round(t.width*2.4*yn),d=c/2,f=u=>Nl(c,c,(p,g)=>{let M=null;for(const x of u){const m=Math.cos(x),v=Math.sin(x),_=(p-d)*m+(g-d)*v,w=-(p-d)*v+(g-d)*m;if(_<-t.width*yn*.5)continue;const A=w/(i/2);Math.abs(A)<=1&&(!M||Math.abs(A)<Math.abs(M.u))&&(M={u:A,v:(d-_)/yn})}return M?r(M.u,(M.v%t.period+t.period)%t.period,Math.hypot(p-d,g-d)<i*.6):0});return{strip:a,end:h,y:f([-Math.PI/2,Math.PI/6,Math.PI*5/6]),t:f([Math.PI,0,Math.PI/2]),width:t.width,period:t.period}}function Ad(n,e,{variant:t=0,pad:i=2}={}){const s=Ho[n],r=s.width/2,a=Array.isArray(e[0][0])?e:[e],o=a.flat(),h=o.map(x=>x[0]),c=o.map(x=>x[1]),d=Math.min(...h)-r-i,f=Math.min(...c)-r-i,u=Math.ceil((Math.max(...h)+r+i-d)*yn),p=Math.ceil((Math.max(...c)+r+i-f)*yn),g=[];for(const x of a){let m=0;for(let v=0;v+1<x.length;v++){const _=x[v],w=x[v+1],A=Math.hypot(w[0]-_[0],w[1]-_[1]);g.push({a:_,b:w,l:A,s:m,first:v===0,last:v+2===x.length}),m+=A}}const M=new dt(u,p);for(let x=0;x<p;x++)for(let m=0;m<u;m++){const v=d+(m+.5)/yn,_=f+(x+.5)/yn;let w=null;for(const y of g){const S=y.b[0]-y.a[0],b=y.b[1]-y.a[1],E=((v-y.a[0])*S+(_-y.a[1])*b)/(y.l*y.l);if(E<0&&y.first||E>1&&y.last)continue;const C=Math.max(0,Math.min(1,E)),T=y.a[0]+S*C,R=y.a[1]+b*C,O=Math.hypot(v-T,_-R);O<=r&&(!w||O<w.d)&&(w={d:O,u:((v-T)*-b+(_-R)*S)/y.l/r,v:y.s+C*y.l})}if(!w)continue;const A=s.surface(w.u,(w.v%s.period+s.period)%s.period,!1,t);A&&M.px(m,x,A[0],Xi[0],Xi[1],Xi[2])}return{sp:M,origin:[-d*yn,-f*yn]}}function Aw({variant:n=0,length:e=16,radius:t=30}={}){const i=[[0,0],[e,0]],s=[];for(let f=0;f<=12;f++){const u=f/12*(e/t);s.push([Math.sin(u)*t,(1-Math.cos(u))*t])}const r=Ad("railway",i,{variant:n,pad:0}),a=Ad("railway",s,{variant:n,pad:0}),o=Math.max(r.sp.w,a.sp.w+Math.round(a.origin[0]-r.origin[0])),h=Math.max(r.origin[1],a.origin[1]),c=Math.max(r.sp.h-r.origin[1],a.sp.h-a.origin[1])+h,d=new dt(o,Math.ceil(c));for(const f of[a,r])for(let u=0;u<f.sp.h;u++)for(let p=0;p<f.sp.w;p++){const g=f.sp.m[u*f.sp.w+p];if(!g)continue;const M=p+Math.round(r.origin[0]-f.origin[0]),x=u+Math.round(h-f.origin[1]);d.inb(M,x)&&!(d.m[x*o+M]===l.FRAME&&g!==l.FRAME)&&d.px(M,x,g,Xi[0],Xi[1],Xi[2])}return d}const bn=(n,e,t=0)=>gn(Math.floor(n[0]*e)+Math.floor(n[2]*e)*57+t,Math.floor(n[1]*e)),Si=(n=.25,e=.15)=>t=>{const i=bn(t,16,3);return bn(t,6,5)<e&&t[1]>.1?l.MOSS:i>1-n*.7?l.BODY2:void 0},wi=(n,e,t,i,s=.025,r=l.FRAME)=>n.seg(e,t,s,s,r,{group:i,paint:Si(.4,.05)}),Td=(n,e,t,i)=>n.ell(e,t,l.STONE,{group:i,rough:.025,paint:s=>s[1]>e[1]+t[1]*.5&&bn(s,5,i)<.6?l.MOSS:bn(s,14)>.9?l.STONED:void 0}),Ss=(n,e,t,i,s)=>{for(let r=0;r<e;r++){const a=gn(s,r)*6.283,o=t*Math.sqrt(gn(r,s));n.ell([Math.cos(a)*o,.07,Math.sin(a)*o*.7],[.07,.1+gn(r,4)*.08,.07],l.LEAF2,{group:i+r%3,paint:h=>h[1]>.13?l.LEAF:void 0})}},Fl=(n,e,t,i)=>n.ell(e,t,l.LEAF,{group:i,rough:.04,paint:s=>{const r=bn(s,10,2);return s[1]<e[1]-.15||r<.2?l.LEAF3:r>.8?l.LEAF2:void 0}}),$a=(n,e,t,i,s)=>{const r=[];for(let a=0;a<=4;a++)r.push([...P.add(P.lerp(e,t,a/4),[(gn(s,a)-.5)*.12,0,.02]),.03]);n.chain(r,l.LEAF,{group:i,paint:a=>bn(a,30)<.3?l.LEAF2:void 0})};function Rd(n,e,{pitch:t=0,roll:i=0,at:s=[0,0,0]}={}){const r=(d,f,u,p)=>{const g=Math.cos(f),M=Math.sin(f),x=[...d];return x[u]=d[u]*g-d[p]*M,x[p]=d[u]*M+d[p]*g,x},a=d=>r(r(d,i,1,2),t,0,1),o=d=>r(r(d,-t,0,1),-i,1,2),h=d=>P.add(a(d),s),c=d=>o(P.sub(d,s));for(const d of n.parts.slice(e))if(d.type==="cone"?(d.a=h(d.a),d.b=h(d.b)):(d.c=h(d.c),d.axes=d.axes.map(a)),d.paint){const f=d.paint;d.paint=(u,p)=>f(c(u),p)}}const Tw={"verge-post":{family:"prop",path:"tarmac",desc:"a road's verge post, leaning, its band faded",build(n){const e=n.parts.length;n.box([0,.4,0],[.06,.4,.06],l.BELLY,{round:.02,group:1,paint:t=>Math.abs(t[1]-.62)<.06?l.SHADES:Si(.1,.2)(t)}),Rd(n,e,{roll:.15,pitch:.1}),Ss(n,4,.25,3,1)}},"cats-eye":{family:"prop",path:"tarmac",desc:"a cat's-eye stud in the road (unlit)",build(n){n.box([0,.02,0],[.09,.02,.05],l.SHADES,{round:.01,group:1});for(const e of[-.04,.04])n.ell([e,.04,.03],[.025,.015,.015],l.FRAME,{group:2})}},"stepping-stone":{family:"prop",path:"stepping",desc:"a stepping stone, flat-topped and mossy",build(n){Td(n,[0,.08,0],[.38,.12,.3],1)}},"boardwalk-post":{family:"prop",path:"boardwalk",desc:"a boardwalk's post, standing in the water",build(n){n.seg([0,0,0],[0,.55,0],.06,.055,l.WOOD,{group:1,paint:e=>e[1]<.12?l.MOSS:e[1]>.5?l.BARK2:void 0})}},"sleeper-sapling":{family:"prop",path:"railway",desc:"a sapling grown up between the sleepers",build(n){n.seg([0,0,0],[0,.9,0],.025,.015,l.TRUNK,{group:1}),Fl(n,[0,.95,0],[.22,.18,.2],2),Ss(n,4,.2,3,2)}},"glow-mushrooms":{family:"prop",path:"magic",glow:!0,desc:"a cluster of softly glowing mushrooms",build(n){for(let e=0;e<4;e++){const t=[(gn(e)-.5)*.3,0,(gn(e,2)-.5)*.2],i=.08+gn(e,3)*.1;n.seg(t,P.add(t,[0,i,0]),.015,.012,l.CLOTH,{group:1}),n.ell(P.add(t,[0,i+.02,0]),[.05,.03,.05],l.MAGIC,{group:2+e,paint:s=>s[1]>t[1]+i+.035?l.MAGIC2:void 0})}}},"fairy-stone":{family:"prop",path:"magic",glow:!0,desc:"a small fairy stone with a glowing rune",build(n){n.box([0,.18,0],[.09,.18,.06],l.STONE,{round:.04,group:1,paint:e=>e[2]>.04&&Math.abs(e[1]-.2)<.07&&Math.abs(e[0])<.025?l.RUNE:e[1]>.32?l.MOSS:void 0})}},"signal-post":{family:"prop",path:"railway",desc:"a rusty old signal post, its arm dropped (unlit)",build(n){wi(n,[0,0,0],[0,2.2,0],1,.04),n.box([.25,2,0],[.25,.05,.02],l.ACCENT,{dir:[1,-.6,0],group:2,paint:e=>e[0]>.38?l.BELLY:Si(.4,0)(e)}),n.ell([0,2.05,.05],[.06,.06,.03],l.SHADES,{group:3}),$a(n,[0,0,.04],[.02,1.4,.04],4,3)}},stairs:{family:"piece",path:"stairs",desc:"a short flight of mossy stone stairs, for ruins and hollows",build(n){for(let e=0;e<5;e++)n.box([0,.1+e*.2,-e*.3],[.6,.1+e*.2,.15],l.STONE,{round:.03,rough:.01,group:1+e%2,paint:t=>t[1]>.16+e*.4&&bn(t,6,e)<.35?l.MOSS:bn(t,14)>.9?l.STONED:void 0});for(const e of[-.7,.7])Td(n,[e,.3,-.6],[.15,.35,.7],5)}},"stairs-turn":{family:"piece",path:"stairs",desc:"stone stairs turning on a landing",build(n){for(let e=0;e<3;e++)n.box([0,.1+e*.2,-e*.3],[.5,.1+e*.2,.15],l.STONE,{round:.03,rough:.01,group:1+e%2,paint:t=>bn(t,6,e)<.3&&t[1]>.2+e*.4?l.MOSS:void 0});n.box([0,.35,-1.1],[.55,.35,.5],l.STONE,{round:.03,group:3,paint:e=>bn(e,6)<.3&&e[1]>.6?l.MOSS:void 0});for(let e=0;e<3;e++)n.box([.65+e*.3,.8+e*.2,-1.1],[.15,.1+e*.1,.5],l.STONE,{round:.03,group:4+e%2})}},"root-bridge":{family:"piece",path:"roots",desc:"a bridge of gnarled roots over a stream",build(n){n.ell([0,.01,0],[1.4,.015,.6],l.WATER,{group:1});for(let e=0;e<4;e++)n.chain([[-1.8,0,-.4+e*.27,.14],[-.8,.45,-.35+e*.25,.1],[.6,.5,-.3+e*.22,.1],[1.8,0,-.25+e*.2,.13]],l.TRUNK,{group:2+e%2,rough:.015,paint:t=>bn(t,12)<.12?l.BARKD:t[1]>.55&&bn(t,5)<.3?l.MOSS:void 0});Fl(n,[-1.7,.25,-.5],[.3,.2,.25],5)}},footbridge:{family:"piece",path:"bridges",desc:"a little wooden footbridge over a stream",build(n){n.ell([0,.01,0],[1.2,.015,.7],l.WATER,{group:1});for(let e=-6;e<=6;e++){const t=e*.2,i=.35-t*t*.1;n.box([t,i,0],[.09,.03,.5],l.WOOD,{round:.01,group:2+(e&1),paint:s=>bn(s,10)<.15?l.MOSS:void 0})}for(const e of[-.5,.5]){for(const t of[-1.1,0,1.1])n.seg([t,.3-t*t*.1,e],[t,.85-t*t*.1,e],.03,.03,l.WOOD,{group:4});n.chain([[-1.1,.85-.121,e,.025],[0,.85,e,.025],[1.1,.85-.121,e,.025]],l.WOOD,{group:4})}}},"rope-bridge":{family:"piece",path:"bridges",desc:"a rope bridge over a stream, planks sagging, one missing",build(n){n.ell([0,.01,0],[1.3,.015,.7],l.WATER,{group:1});for(const e of[-1.6,1.6])for(const t of[-.45,.45])n.seg([e,0,t],[e,1.1,t],.05,.045,l.WOOD,{group:2});for(let e=-7;e<=7;e++){if(e===3)continue;const t=e*.2,i=.55-(1-(t/1.6)**2)*.3;n.box([t,i,0],[.08,.02,.38],l.WOOD,{round:.01,group:3+(e&1)})}for(const e of[-.45,.45])for(const t of[0,1]){const i=[];for(let s=0;s<=8;s++){const r=-1.6+s*.4,a=(t?1.05:.55)-(1-(r/1.6)**2)*(t?.25:.3);i.push([r,a,e,.015])}n.chain(i,l.STRAW,{group:5})}}},"goods-wagon":{family:"landmark",path:"railway",desc:"an abandoned goods wagon tipped on its side (no livery)",build(n){const e=n.parts.length;n.box([0,.75,0],[1.6,.65,.6],l.BODY2,{round:.05,group:1,paint:t=>(t[0]+9)*4%1<.08?l.SHADES:Si(.6,.2)(t)});for(const t of[-1.1,1.1])for(const i of[-.55,.55])n.ell([t,.22,i],[.22,.22,.06],l.SHADES,{group:2,paint:s=>Math.hypot(s[0]-t,s[1]-.22)<.08?l.FRAME:void 0});Rd(n,e,{roll:1.4,at:[0,.3,.3]}),Ss(n,14,2.2,4,5),$a(n,[-1.2,0,1],[-.6,1,1.1],7,6)}},carriage:{family:"landmark",path:"railway",glow:!0,desc:"an old passenger carriage, mossy roof, a tree grown through it, its windows glowing",build(n){n.box([0,.95,0],[2.4,.65,.62],l.HAT1,{round:.08,group:1,paint:e=>Math.abs(e[2])>.58&&e[1]>1&&e[1]<1.35&&(e[0]+9)*1.6%1>.25?bn(e,9)<.2?l.SHADES:l.GLOW:Si(.4,.15)(e)}),n.ell([0,1.62,0],[2.4,.14,.62],l.MOSS,{group:2,paint:e=>bn(e,6)<.3?l.LEAF2:void 0});for(const e of[-1.8,1.8])for(const t of[-.5,.5])n.ell([e,.25,t],[.24,.24,.06],l.SHADES,{group:3});n.chain([[.6,0,0,.2],[.6,1.8,0,.16],[.7,2.9,-.1,.09]],l.TRUNK,{group:4,rough:.015}),Fl(n,[.7,3.1,-.1],[1,.6,.8],5),Ss(n,16,2.8,6,7)}},platform:{family:"landmark",path:"railway",desc:"a little station platform, a bench and a lamp post (no name board)",build(n){n.box([0,.35,0],[2.4,.35,.7],l.STONE,{round:.02,rough:.008,group:1,paint:e=>e[2]>.62&&e[1]>.6?l.BELLY:e[1]>.66&&bn(e,5)<.25?l.MOSS:(e[0]+9)*2.5%1<.06?l.STONED:void 0}),n.box([-.6,.95,-.3],[.6,.04,.16],l.WOOD,{group:2}),n.box([-.6,1.2,-.44],[.6,.18,.03],l.WOOD,{group:2});for(const e of[-1.1,-.1])n.box([e,.82,-.3],[.04,.12,.14],l.FRAME,{group:2});wi(n,[1.4,.7,-.4],[1.4,2.4,-.4],3,.035),n.box([1.4,2.5,-.4],[.12,.12,.12],l.FRAME,{round:.03,group:4,paint:e=>Math.abs(e[1]-2.5)<.07?l.SHADES:void 0}),$a(n,[1.4,.7,-.36],[1.42,2.2,-.36],5,8),Ss(n,10,2.4,6,9)}},"level-crossing":{family:"landmark",path:"railway",desc:"a level crossing's barrier post, its boom broken off and lying in the grass",build(n){n.box([0,.55,0],[.15,.55,.15],l.BELLY,{round:.03,group:1,paint:Si(.3,.15)}),n.box([.6,1.05,0],[.6,.05,.04],l.BELLY,{group:2,paint:e=>(e[0]+9)*2.5%1<.5?l.ACCENT:Si(.3,0)(e)}),n.box([1.6,.05,.4],[.7,.05,.04],l.BELLY,{dir:[1,0,.5],group:3,paint:e=>(e[0]+9)*2.5%1<.5?l.ACCENT:Si(.3,.15)(e)}),wi(n,[-.5,0,0],[-.5,1.6,0],4,.03);for(const e of[-1,1])n.box([-.5,1.6,0],[.35,.04,.015],l.BELLY,{dir:[1,e,0],group:5});Ss(n,10,1.6,6,10)}},"buffer-stop":{family:"landmark",path:"railway",desc:"a buffer stop at the end of the line: a timber beam on rusty posts, its buffers worn, grass round its short stub of track",build(n){for(const e of[-.45,.45])wi(n,[-.2,0,e],[0,.75,e],1,.05),wi(n,[.35,0,e],[0,.7,e],1,.04),n.seg([0,.62,e],[.22,.62,e],.07,.07,l.FRAME,{group:2,paint:Si(.5,0)}),n.ell([.25,.62,e],[.03,.1,.1],l.SHADES,{group:2});n.box([0,.7,0],[.08,.1,.75],l.ACCENT,{round:.02,group:3,paint:e=>(e[2]+9)*4%1<.5?l.BELLY:Si(.4,.1)(e)});for(const e of[-.3,.3])n.seg([.2,.03,e],[2,.03,e],.03,.03,l.SHADES,{group:4,paint:t=>t[1]>.05?l.FRAME:void 0});for(let e=0;e<4;e++)n.box([.5+e*.45,.02,0],[.07,.02,.45],l.WOOD,{group:5,paint:t=>bn(t,9)<.3?l.MOSS:void 0});Ss(n,12,1.4,6,12)}},"signal-gantry":{family:"landmark",path:"railway",desc:"a rusty signal gantry spanning the line, its signals dark",build(n){for(const e of[-2,2])for(const t of[-.15,.15])wi(n,[e,0,t],[e,3,t],1,.04);for(let e=0;e<8;e++){const t=-2+e*.5;wi(n,[t,2.8,0],[t+.5,3.1,0],2,.02),wi(n,[t,3.1,0],[t+.5,2.8,0],2,.02)}for(const e of[2.8,3.1])wi(n,[-2,e,0],[2,e,0],3,.035);for(const e of[-.8,.8])wi(n,[e,2.8,.05],[e,2.3,.05],4,.02),n.box([e,2.2,.08],[.12,.2,.05],l.SHADES,{round:.03,group:5,paint:t=>Math.hypot(t[0]-e,t[1]-2.27)<.05||Math.hypot(t[0]-e,t[1]-2.13)<.05?l.FRAME:void 0});$a(n,[-2,0,.2],[-1.95,2.4,.2],6,11)}}},l0=Object.entries(Tw).map(([n,e])=>({id:n,...e})),Rw=Object.fromEntries(l0.map(n=>[n.id,n]));function c0(n={}){const e=n.leafHue??.3,t=n.trunkHue??.07;return{[l.STONE]:[118,116,124],[l.STONED]:[58,56,66],[l.MOSS]:me(.26,.45,.45),[l.BELLY]:[220,216,204],[l.CLOTH]:[208,204,188],[l.BARK2]:[104,80,56],[l.BARKD]:me(t+.03,.5,.17),[l.BODY2]:[128,98,70],[l.BARKL]:me(t,.35,.55),[l.TRUNK]:me(t,.45,.36),[l.LEAF]:me(e,.55,.45),[l.LEAF2]:me(e-.03,.5,.6),[l.LEAF3]:me(e+.03,.6,.28),[l.WOOD]:[128,94,60],[l.STRAW]:[180,156,104],[l.FRAME]:[168,120,92],[l.SHADES]:[26,26,32],[l.ACCENT]:[176,52,46],[l.HAT1]:[66,92,74],[l.WATER]:[44,70,96],[l.NOSE]:[14,12,18],[l.GLOW]:[255,196,110],[l.MAGIC]:me(n.magicHue??.5,.55,1),[l.MAGIC2]:me(n.magicHue??.5,.15,1),[l.RUNE]:[150,240,255],[l.LINE]:[24,22,30]}}function Cw(n,e={},t=16){const i=Rw[n];if(!i)throw new Error(`no path piece "${n}"`);const s=new Qe({blend:.04});i.build(s),s.ell([0,.004,0],[.01,.004,.01],l.NOSE,{group:0});const r=Cr(e)*1.1,a=cn(s,{scale:r}),o=a.sp;let h=o.w,c=-1,d=o.h;for(let g=0;g<o.h;g++)for(let M=0;M<o.w;M++)o.m[g*o.w+M]&&(h=Math.min(h,M),c=Math.max(c,M),d=Math.min(d,g));const f=new dt(c-h+1,o.h-d);for(let g=0;g<f.h;g++)for(let M=0;M<f.w;M++){const x=(g+d)*o.w+M+h;o.m[x]&&f.put(M,g,o.m[x],o.n[x*3],o.n[x*3+1],o.n[x*3+2])}const[u,p]=a.project([0,0,0]);return{sp:f,origin:{x:+(u-h).toFixed(1),y:+(p-d).toFixed(1)},metres:{width:+(f.w/t).toFixed(1),height:+(f.h/t).toFixed(1)}}}function Lw(){const n={};for(const[e,t]of Object.entries(Ho))for(const i of t.moods)(n[i]=n[i]||[]).push(e);return n.ravine=[...n.ravine||[],"stairs"],n["rocky-slope"]=[...n["rocky-slope"]||[],"stairs"],n["cave-mouth"]=[...n["cave-mouth"]||[],"stairs"],n.stream=[...n.stream||[],"bridges"],n}const Lo=[{id:"stack",crystal:"cyan",tiers:[["bass",4,[.24,.25,.28]],["mid",2,[.46,.15,.25]],["horn",4,[.21,.22,.23]],["tweet",2,[.21,.08,.17]]]},{id:"wall",crystal:"violet",tiers:[["bass",3,[.31,.3,.3]],["mid",2,[.44,.16,.26]],["horn",2,[.3,.25,.24]],["tweet",1,[.26,.09,.18]]]},{id:"tower",crystal:"amber",tiers:[["bass",2,[.28,.27,.29]],["bass",2,[.25,.24,.27]],["horn",2,[.25,.23,.23]],["tweet",3,[.15,.07,.15]]]}],Pw={cyan:[[60,220,255],[210,250,255],[150,205,225]],violet:[[175,95,255],[240,215,255],[180,160,225]],amber:[[255,170,50],[255,238,200],[225,190,140]]};function h0(n=0){const[e,t,i]=Pw[Lo[n%Lo.length].crystal];return{[l.STONE]:[78,80,94],[l.STONED]:[36,36,48],[l.MOSS]:[72,108,58],[l.CRYSTAL]:i,[l.RUNE]:e,[l.GLOW]:e,[l.MAGIC2]:t,[l.WOOD]:[150,96,52],[l.LINE]:[24,24,34]}}function Cd(n,e,t,i){const s=Lo[n%Lo.length],r=new Qe({blend:.02}),a=t==="damaged",o=a?0:[0,.5,1][e%3],h=b=>a&&je(b,e,31)<.5;let c=0,d=1,f=.3,u=0,p=n*7;const g=(b,E,C,T)=>R=>{if(T&&Math.abs(Math.sin(R[0]*37+R[1]*23+Math.sin(R[2]*17)*2))<.07)return l.STONED;if(R[1]>b-.02&&(R[2]>E-.06||je(Math.floor(R[0]*30),Math.floor(R[2]*30),C)<.2)&&je(Math.floor(R[0]*40),Math.floor(R[2]*40),C+1)<.6)return l.MOSS},M=(b,E,C,T,R,O)=>{const I=h(O),k=1+o*.08;r.ell([b,E,C],[T*1.18,T*1.18,.06],l.STONED,{group:R,cut:!0}),r.ell([b,E,C-.02],[T*k,T*k,.035+o*.025],l.CRYSTAL,{group:900+O,paint:U=>{const W=Math.hypot(U[0]-b,U[1]-E)/(T*k);return I?W<.3?l.GLOW:l.CRYSTAL:W<.2+o*.15?l.MAGIC2:W<.5?l.GLOW:W<.78?l.CRYSTAL:l.GLOW}})},x=(b,E,C,T,R,O,I,k)=>U=>{if(U[0]>b+T-.022){const W=Math.min(C,R)*1.5,ne=(O-R-U[2])/W+.5,K=(E-U[1])/W+.5;if(ne>=0&&ne<=1&&K>=0&&K<=1&&(i?jd(i,ne,K,.065):Rr(ne,K,I,.12)))return a&&je(I,e,5)<.5?l.STONED:l.RUNE}return k(U)},m=s.tiers,v=m[0][1]*m[0][2][0]+.02,_=.08,w=m[0][2][2];r.box([0,_,f-w],[v,_,w],l.STONE,{group:d,round:.03,rough:.006,paint:g(_*2,f,3,a)}),r.box([0,_*.9,f],[v-.06,_*.45,.12],l.STONED,{group:d,cut:!0,paint:b=>b[2]<f-.07?l.GLOW:void 0});for(let b=1;b<m[0][1];b++)r.box([-v+b*v*2/m[0][1],_*.9,f-.06],[.015,_*.45,.06],l.STONE,{group:d});c=_*2,d++;const A=[];m.forEach(([b,E,[C,T,R]],O)=>{const I=b==="tweet"?.09:0,k=E*C*2+(E-1)*(b==="tweet"?.14:.01),U=f-O*.035,W=c+I+T;for(let ne=0;ne<E;ne++){const K=-k/2+C+ne*(C*2+(b==="tweet"?.14:.01));if(a&&b==="horn"&&ne===E-1){A.push([K,C,T,R]);continue}const re=a&&b==="tweet"?[1,.12*(ne%2?1:-1),0]:void 0,N=a&&b==="tweet"?W-.04:W,te=g(N+T,U-R+R,d,a),ae=ne===E-1-(a&&b==="horn"?1:0)&&b!=="tweet";if(r.box([K,N,U-R],[C-.005,T,R],l.STONE,{group:d,round:.035,rough:.004,dir:re,paint:ae?x(K,N,T,C-.005,R,U,p++,te):te}),b==="bass"&&M(K,W+.02,U,Math.min(C,T)*.72,d,u++),b==="mid"&&(r.ell([K,W,U],[C*.8,T*.7,R*.9],l.STONED,{group:d,cut:!0,paint:pe=>pe[2]<U-R*.45?h(u)?l.STONED:l.GLOW:void 0}),r.box([K,W,U-R*.5],[.018,T*.6,R*.45],l.STONE,{group:d}),u++),b==="horn"){const pe=W+T*.25;r.seg([K,pe,U-R*1.5],[K,pe,U+.03],.03,Math.min(C,T)*.78,l.STONED,{group:d,cut:!0,paint:be=>be[2]<U-R*.55?h(u)?l.STONED:l.GLOW:void 0}),M(K,W-T*.6,U,T*.22,d,u++)}if(b==="tweet")for(const pe of[-.5,0,.5])M(K+pe*C*1.15,N,U,T*.55,d,u++);d++}if(b!=="tweet"){const ne=a&&b==="horn"?C:0;r.box([-ne,c+T*2+.012,U-.015],[k/2+.01-ne,.012,.015],l.WOOD,{group:d++,round:.008}),c+=.024}b==="tweet"&&!a&&r.flat([0,c+I/2,U-R],[1,0,0],[0,1,0],k/2,I/2,(ne,K)=>Math.abs(K)<.45&&Math.sin(ne*23)>-.4?l.GLOW:null,{group:d++,bend:0}),c+=T*2+I});const y=c;if([[-v-.04,.25,.34,-.3],[v+.02,.2,.3,.35],[-v+.15,.4,.22,-.1],[v-.2,.42,.18,.2],[.1,.45,.16,.15],[-v-.1,-.25,.26,-.4],[v+.08,-.2,.24,.45]].forEach(([b,E,C,T],R)=>{if(a&&R%2){r.seg([b,.03,E],[b+.12,.05,E+.04],.04,.02,l.CRYSTAL,{group:700+R});return}const O=[b+T*C,C,E+.05];r.seg([b,0,E],O,.045+C*.05,.006,l.CRYSTAL,{group:700+R,paint:I=>I[1]>C*(.65-o*.1)&&!a?l.GLOW:void 0}),r.seg([b+.04,0,E-.03],[b+.04+T*C*.5,C*.55,E],.03,.005,l.CRYSTAL,{group:720+R})}),!a)for(const[b,E,C,T]of[[-.55,.1,.1,.03],[.6,.16,0,.025],[.15,.24,-.1,.02]])r.ell([b,y+E-.1,C],[T,T*.8,T],l.STONE,{group:800+Math.round(b*100),extra:!0,rough:.004});for(const[b,E,C,T]of A)r.box([b+.45,E*.75,f+.25],[E,C,T],l.STONE,{group:d++,dir:[.6,.8,.2],round:.035,rough:.007,paint:g(1,0,9,!0)});return{m:r,top:y}}function Dw(n){const e=new Qe({blend:.02}),t=(i,s)=>je(i,s,n*13+7);e.ell([.1,.1,.62],[.14,.12,.1],l.GLOW,{group:1,paint:i=>i[1]>.16?l.MAGIC2:void 0}),e.seg([.1,.1,.6],[.02,.5,.66],.07,.01,l.GLOW,{group:2,paint:i=>i[1]>.35?l.MAGIC2:l.CRYSTAL});for(let i=0;i<16;i++){const s=i*2.4,r=.15+t(i,1)*.75,a=Math.cos(s)*r,o=Math.sin(s)*r*.6,h=.09+t(i,2)*.1,c=Math.max(.05,(.8-r)*.45)+h*.5;e.box([a,c*.7,o],[h*1.3,h,h*1.1],l.STONE,{group:10+i,dir:[Math.cos(s*1.7),.4+t(i,3),Math.sin(s*2.3)],round:.03,rough:.008,paint:d=>Math.abs(Math.sin(d[0]*41+d[1]*29))<.08?l.STONED:d[1]>c*.7+h*.6&&t(i,4)<.25?l.MOSS:void 0})}for(let i=0;i<4;i++){const s=i*1.7+1,r=Math.cos(s)*.4,a=Math.sin(s)*.25;e.ell([r,.05,a],[.09,.08,.03],l.CRYSTAL,{group:50+i,dir:[Math.cos(s),.5,Math.sin(s)],paint:o=>t(i,5)<.3?l.GLOW:void 0})}for(let i=0;i<4;i++){const s=-.7+i*.45;e.seg([s,0,.4-i*.1],[s+.1,.08+t(i,6)*.1,.42-i*.1],.03,.01,l.CRYSTAL,{group:60+i})}return e}function $c(n,e,t){let i=0;for(let s=0;s<2e3&&i<e;s++){const r=Math.floor(je(s,t,1)*n.w),a=Math.floor(je(s,t,2)*n.h*.7);n.get(r,a)||n.get(r+1,a)||n.get(r-1,a)||n.get(r,a+1)||n.get(r,a-1)||n.get(r,a+2)||(n.px(r,a,i%3?l.GLOW:l.MAGIC2),i++)}return n}const Iw=n=>Io(n)*3,kl=new Map;function Ow(n={},{variant:e=0,frame:t=0,state:i="playing",sigil:s}={}){const r=Iw(n),a=e+":"+r;kl.has(a)||kl.set(a,cn(Cd(e,0,"playing").m,{height:r}).s);const o=kl.get(a);if(i==="destroyed")return $c(cn(Dw(e),{scale:o}).sp,3,e*5+1);const{sp:h}=cn(Cd(e,t,i,s).m,{scale:o});return $c(h,i==="damaged"?4:10+t*2,e*5+t)}const u0=[15,45,75],Nw={playing:3,damaged:2,destroyed:1};function Fw(n){const e=n*Math.PI/180,t=Math.cos(e)>0;let i=t?-n:180-n;i=((i+180)%360+360)%360-180;const s=u0.reduce((r,a)=>Math.abs(a-Math.abs(i))<Math.abs(r-Math.abs(i))?a:r);return{yaw:i,angle:s,flip:i<0,outward:t}}const kw=n=>Io(n)*2.6,Uw=()=>h0(0);function Ld(n,e){const t=new Qe({blend:.02}),i=e==="damaged",s=i?0:[0,.5,1][n%3],r=x=>i&&je(x,n,37)<.5,a=.2,o=.2,h=o;let c=0,d=1,f=0;const u=x=>Math.abs(Math.sin(x[0]*37+x[1]*23+Math.sin(x[2]*17)*2))<.07,p=(x,m,v)=>_=>{if(i&&u(_))return l.STONED;const w=_[2]<-o+.025;if(w&&v){const A=v.s,y=(_[0]-v.x)/A+.5,S=(v.y-_[1])/A+.5;if(y>=0&&y<=1&&S>=0&&S<=1&&Rr(1-y,S,v.k,.12))return i&&je(v.k,n,5)<.5?l.STONED:l.RUNE}if(_[1]>x-.02&&je(Math.floor(_[0]*40),Math.floor(_[2]*40),m+1)<.55)return l.MOSS;if(w){const A=Math.floor(_[0]*26);if(je(A,0,m+2)<.3&&Math.sin(_[1]*7+je(A,1,m)*6)>.1)return l.MOSS}},g=(x,m,v,_)=>{const w=r(_),A=1+s*.08;t.ell([x,m,h],[v*1.18,v*1.18,.06],l.STONED,{group:d,cut:!0}),t.ell([x,m,h-.02],[v*A,v*A,.035+s*.025],l.CRYSTAL,{group:900+_,paint:y=>{const S=Math.hypot(y[0]-x,y[1]-m)/(v*A);return w?S<.3?l.GLOW:l.CRYSTAL:S<.2+s*.15?l.MAGIC2:S<.5?l.GLOW:S<.78?l.CRYSTAL:l.GLOW}})},M=()=>{t.box([0,c+.012,h-.015],[a+.01,.012,.015],l.WOOD,{group:d++,round:.008}),c+=.024};t.box([0,.055,0],[a+.06,.055,o+.05],l.STONE,{group:d,round:.03,rough:.006,paint:p(.11,3)}),t.box([0,.05,h+.05],[a-.02,.025,.1],l.STONED,{group:d,cut:!0,paint:x=>x[2]<h-.03&&!(i&&je(n,1,9)<.5)?l.GLOW:void 0}),c=.11,d++;for(let x=0;x<2;x++){const v=c+.22;t.box([0,v,0],[a,.22,o],l.STONE,{group:d,round:.035,rough:.004,paint:p(v+.22,d,x===0?{x:0,y:v,s:.3,k:11}:null)}),g(0,v+.02,.15,f++),c+=.22*2,d++,M()}{const m=c+.2,v=i?[.08,1,0]:void 0;t.box([0,m,0],[a-.005,.2,o],l.STONE,{group:d,round:.035,rough:.004,dir:v,paint:p(m+.2,d,{x:0,y:m+.03,s:.26,k:17})});const _=m+.2*.25;t.seg([0,_,h-o*1.5],[0,_,h+.03],.03,.15,l.STONED,{group:d,cut:!0,paint:w=>w[2]<h-o*.55?r(f)?l.STONED:l.GLOW:void 0}),g(0,m-.2*.62,.045,f++),c+=.2*2,d++,M()}{const m=c+.12;t.box([0,m,0],[a-.01,.12,o],l.STONE,{group:d,round:.03,rough:.004,paint:p(m+.12,d)}),t.ell([0,m,h],[a*.8,.12*.7,o*.9],l.STONED,{group:d,cut:!0,paint:v=>v[2]<h-o*.45?r(f)?l.STONED:l.GLOW:void 0}),t.box([0,m,h-o*.5],[.018,.12*.6,o*.45],l.STONE,{group:d}),f++,c+=.12*2,d++}for(let x=0;x<2;x++){const _=c+.07+.06;if(i&&x===1){t.box([.34,.07,.3],[.15,.06,.12],l.STONE,{group:d++,dir:[.5,.85,.2],round:.03,rough:.006,paint:p(1,9)});continue}i||t.flat([0,c+.07/2,0],[1,0,0],[0,1,0],a*.7,.07/2,(w,A)=>Math.abs(A)<.45&&Math.sin(w*31)>-.4?l.GLOW:null,{group:d++,bend:0}),t.box([0,_,0],[.15,.06,.13],l.STONE,{group:d,round:.03,rough:.004,dir:i?[.12,1,0]:void 0,paint:p(_+.06,d)});for(const w of[-.5,.5]){const A=w*.15,y=.13;t.ell([A,_,y],[.045,.045,.05],l.STONED,{group:d,cut:!0}),t.ell([A,_,y-.015],[.035*(1+s*.08),.035*(1+s*.08),.03],l.CRYSTAL,{group:900+f,paint:S=>r(f)?l.CRYSTAL:Math.hypot(S[0]-A,S[1]-_)<.015+s*.008?l.MAGIC2:l.GLOW}),f++}c=_+.06,d++}if([[-.3,.2,.22,-.3],[.3,.16,.2,.35],[-.26,-.22,.18,-.35],[.27,-.18,.16,.3]].forEach(([x,m,v,_],w)=>{if(i&&w%2){t.seg([x,.03,m],[x+.1,.05,m+.04],.035,.018,l.CRYSTAL,{group:700+w});return}t.seg([x,0,m],[x+_*v,v,m+.04],.04+v*.05,.006,l.CRYSTAL,{group:700+w,paint:A=>A[1]>v*(.65-s*.1)&&!i?l.GLOW:void 0})}),!i)for(const[x,m,v,_]of[[-.32,.06,.05,.025],[.3,.13,-.05,.02]])t.ell([x,c+m-.1,v],[_,_*.8,_],l.STONE,{group:800+Math.round(x*100),extra:!0,rough:.004});return t}function Bw(){const n=new Qe({blend:.02}),e=(t,i)=>je(t,i,71);n.box([0,.055,0],[.26,.055,.25],l.STONE,{group:1,round:.03,rough:.006}),n.box([0,.2,0],[.2,.1,.2],l.STONE,{group:2,round:.03,rough:.01,dir:[.1,1,.05],paint:t=>t[1]>.26&&Math.sin(t[0]*50+t[2]*30)>0?l.STONED:void 0}),n.ell([.02,.3,.12],[.08,.05,.05],l.GLOW,{group:3,paint:t=>t[1]>.32?l.MAGIC2:void 0}),n.seg([-.05,.25,.05],[-.12,.52,.1],.05,.008,l.CRYSTAL,{group:4,paint:t=>t[1]>.42?l.GLOW:void 0});for(let t=0;t<9;t++){const i=t*2.3+.4,s=.3+e(t,1)*.3,r=Math.cos(i)*s,a=Math.sin(i)*s*.8,o=.06+e(t,2)*.07;n.box([r,o*.9,a],[o*1.3,o,o*1.1],l.STONE,{group:10+t,dir:[Math.cos(i*1.7),.4+e(t,3),Math.sin(i*2.3)],round:.025,rough:.008,paint:h=>Math.abs(Math.sin(h[0]*41+h[1]*29))<.08?l.STONED:e(t,4)<.3&&h[1]>o*1.4?l.MOSS:void 0})}for(let t=0;t<3;t++){const i=t*2.1+1,s=Math.cos(i)*.42,r=Math.sin(i)*.3;n.ell([s,.04,r],[.08,.07,.025],l.CRYSTAL,{group:50+t,dir:[Math.cos(i),.5,Math.sin(i)],paint:()=>e(t,5)<.4?l.GLOW:void 0})}return n}const Ul=new Map;function zw(n={},{angle:e=15,state:t="playing",frame:i=0}={}){const s=kw(n);Ul.has(s)||Ul.set(s,cn(Ld(0,"playing"),{height:s,yaw:15*Math.PI/180}).s);const r=Ul.get(s),a=e*Math.PI/180,o=cn(t==="destroyed"?Bw():Ld(i,t),{scale:r,yaw:a}),[h,c]=o.project([0,0,0]);return $c(o.sp,t==="destroyed"?2:t==="damaged"?3:6+i*2,e+i),{sp:o.sp,origin:{x:+h.toFixed(1),y:+c.toFixed(1)},angle:e}}const Gw=[{k:"ambientHue",g:"Night light",label:"Twilight hue",min:0,max:1,step:.01,v:.68,hue:!0},{k:"ambient",g:"Night light",label:"Twilight brightness",min:.05,max:.6,step:.01,v:.22},{k:"moon",g:"Night light",label:"Moonlight",min:0,max:1,step:.01,v:.3},{k:"moonHue",g:"Night light",label:"Moon hue",min:0,max:1,step:.01,v:.58,hue:!0},{k:"glowHue",g:"Night light",label:"Witch glow hue",min:0,max:1,step:.01,v:.13,hue:!0},{k:"glowSat",g:"Night light",label:"Witch glow colour",min:0,max:1,step:.01,v:.35},{k:"glowRadius",g:"Night light",label:"Witch glow reach",min:30,max:200,step:5,v:110},{k:"glowPower",g:"Night light",label:"Witch glow strength",min:.3,max:2.5,step:.05,v:1.4},{k:"bands",g:"Shading",label:"Light steps",min:2,max:7,step:1,v:3},{k:"dither",g:"Shading",label:"Dithering",min:0,max:1,step:.05,v:.35},{k:"round",g:"Shading",label:"Roundness",min:.2,max:1.5,step:.05,v:.9},{k:"outline",g:"Shading",label:"Plant outline",options:["none","dark","tinted"],v:"none"},{k:"cOutline",g:"Shading",label:"Creature outline",options:["dark","tinted","none"],v:"dark"},{k:"shafts",g:"Night light",label:"Moonbeams",min:0,max:1,step:.05,v:.3},{k:"areaContrast",g:"Colour",label:"Difference between areas",min:0,max:1,step:.05,v:.6},{k:"sat",g:"Colour",label:"Saturation",min:.2,max:1.3,step:.01,v:.9},{k:"leafHue",g:"Colour",label:"Leaf hue",min:0,max:1,step:.01,v:.3,hue:!0},{k:"leafVariety",g:"Colour",label:"Leaf colour variety",min:0,max:1,step:.05,v:.3},{k:"trunkHue",g:"Colour",label:"Bark hue",min:0,max:1,step:.01,v:.07,hue:!0},{k:"groundHue",g:"Colour",label:"Ground hue",min:0,max:1,step:.01,v:.27,hue:!0},{k:"groundVal",g:"Colour",label:"Ground brightness",min:.15,max:.7,step:.01,v:.4},{k:"pixel",g:"Shading",label:"Pixel size",min:1,max:5,step:1,v:3},{k:"treeSize",g:"Trees",label:"Tree height",min:.5,max:1.5,step:.05,v:.85},{k:"crownWidth",g:"Trees",label:"Crown width",min:1,max:4,step:.1,v:3},{k:"clearing",g:"Trees",label:"Clearing size",min:0,max:1,step:.05,v:.55},{k:"depth",g:"Map",label:"Border detail (fractal layers)",min:0,max:6,step:1,v:4},{k:"areaScale",g:"Map",label:"Area size (screens)",min:.6,max:2,step:.05,v:1},{k:"areaTypes",g:"Map",label:"Area types",min:4,max:30,step:1,v:30},{k:"density",g:"Trees",label:"Foliage density",min:.2,max:1,step:.05,v:.55},{k:"clump",g:"Trees",label:"Clumpiness",min:0,max:1,step:.05,v:.6},{k:"gnarl",g:"Trees",label:"Gnarliness",min:0,max:1,step:.05,v:.5},{k:"roots",g:"Trees",label:"Roots",min:0,max:1,step:.05,v:.6},{k:"bark",g:"Trees",label:"Bark texture",min:0,max:1,step:.05,v:.6},{k:"trees",g:"Trees",label:"Tree density",min:.2,max:2,step:.05,v:1},{k:"wBroad",g:"Tree mix",label:"Gnarled broadleaf",min:0,max:1,step:.05,v:.8},{k:"wFir",g:"Tree mix",label:"Fir",min:0,max:1,step:.05,v:.6},{k:"wWillow",g:"Tree mix",label:"Willow",min:0,max:1,step:.05,v:.5},{k:"wBirch",g:"Tree mix",label:"Birch",min:0,max:1,step:.05,v:.5},{k:"wPalm",g:"Tree mix",label:"Tree fern",min:0,max:1,step:.05,v:.3},{k:"wFlat",g:"Tree mix",label:"Flat-crowned",min:0,max:1,step:.05,v:.5},{k:"bushes",g:"Undergrowth",label:"Bushes and shrubs",min:0,max:120,step:1,v:55},{k:"bushSize",g:"Undergrowth",label:"Bush size",min:.5,max:1.8,step:.05,v:1},{k:"flowers",g:"Undergrowth",label:"Flowers",min:0,max:1,step:.05,v:.3},{k:"cSat",g:"Creatures",label:"Creature saturation",min:.1,max:1,step:.01,v:.6},{k:"cVal",g:"Creatures",label:"Creature brightness",min:.4,max:1,step:.01,v:.85},{k:"head",g:"Creatures",label:"Baby head size",min:.3,max:.6,step:.01,v:.44},{k:"eye",g:"Creatures",label:"Eye size",min:.5,max:2,step:.05,v:1},{k:"legs",g:"Creatures",label:"Leg length",min:.5,max:1.8,step:.05,v:1},{k:"long",g:"Creatures",label:"Body length",min:.7,max:1.5,step:.05,v:1},{k:"size",g:"Creatures",label:"Baby size (px)",min:5,max:14,step:1,v:8},{k:"growth",g:"Creatures",label:"Legend vs baby height",min:5,max:25,step:1,v:20},{k:"magicHue",g:"Creatures",label:"Magic glow hue",min:0,max:1,step:.01,v:.5,hue:!0},{k:"fur",g:"Creatures",label:"Stripes and spots",min:0,max:1,step:.05,v:.5},{k:"cloakHue",g:"Witch",label:"Jacket hue",min:0,max:1,step:.01,v:.72,hue:!0},{k:"hairHue",g:"Witch",label:"Hair hue",min:0,max:1,step:.01,v:.01,hue:!0},{k:"hatHue",g:"Witch",label:"Hat hue",min:0,max:1,step:.01,v:.74,hue:!0},{k:"topHue",g:"Witch",label:"Top hue",min:0,max:1,step:.01,v:.13,hue:!0},{k:"jeansHue",g:"Witch",label:"Jeans hue",min:0,max:1,step:.01,v:.6,hue:!0},{k:"shoeHue",g:"Witch",label:"Sneakers hue",min:0,max:1,step:.01,v:0,hue:!0},{k:"phonesHue",g:"Witch",label:"Headphones hue",min:0,max:1,step:.01,v:.92,hue:!0}];function Hw(){const n={};return Gw.forEach(e=>n[e.k]=e.v),n}function Ww(n,e,t,i,s){const r=rh(e.type).fn,a={...t,leafHue:n.leaf+(e.dark?.05:0),gnarl:e.gnarl??t.gnarl,treeBare:e.bare,treeTrunks:e.trunks,treeLean:e.lean,treeThick:e.thick,treeThin:e.thin,treeHollow:e.hollow,treeWebs:e.webs},o=r(i,a,t.treeSize*s*(e.scale||1)*xe(i,.9,1.1)),h=Fo(i,a,r);return e.dark&&(h[l.LEAF]=h[l.LEAF3],h[l.LEAF3]=me(n.leaf+.05,.7,.22)),h[l.NOSE]=[20,16,24],h[l.GLINT]=[235,235,240],{parts:tf(o),colours:h}}function Vw(n,e,t,i,s){const r=vt[t].id,a=Hs.find(x=>x.id===r),o=bm(r,n,{K:i,makeCanvas:s}),h=[],c=x=>h.push(x)-1,d={big:[],bigWeight:[],small:[],walls:[],set:null},f=(x,m)=>un(x,m,n,"none",s),u=(x,m)=>{const{parts:v,colours:_}=Ww(a,x,n,Ii(e*13+t*101+m*7+1),i);return{bot:c(f(v.bot,_)),top:c(f(v.top,_))}},p=wm(r,n,{K:i,makeCanvas:s}),g=vt[t].layout.heightMix,M=x=>p.filter(m=>m.heightClass===x).length||1;for(const x of p)d.big.push({bot:c(x.bot),top:c(x.top)}),d.bigWeight.push(g?g[x.heightClass]/M(x.heightClass):x.weight);a.big.forEach(([x],m)=>{x==="tree"&&p.length||(d.big.push({bot:c(o.big[m].sp),top:null}),d.bigWeight.push(p.length?.1:1))}),a.small.forEach(([x,m],v)=>d.small.push(x==="tree"?u(m,500+v):{bot:c(o.small[v].sp),top:null}));for(const x of o.walls)d.walls.push(c(x.sp));return o.setPiece&&(d.set=a.set?.[0]==="tree"?u(a.set[1],900):{bot:c(o.setPiece.sp),top:null,origin:o.setPiece.origin}),{sprites:h,layout:d,floor:o.floor.sp}}function Pd(n,e,t,i=null){const s=[];for(const r of["towards","away"])for(let a=0;a<4;a++)for(let o=0;o<2;o++)s.push(un(Ip(e,a,o,n,r,i),Lp(e,n,i),n,n.cOutline,t));return s}const Yw=(n,e,t=!1)=>(t?8:0)+n*2+e;function Po(n,e,t){return n.getContext("2d").getImageData(0,0,e,t).data}function as(n,e=2048){const i=[];let s=0,r=0,a=0,o=1;for(const u of n)s+u.w+1>e&&(s=0,r+=a+1,a=0),i.push({x:s,y:r}),s+=u.w+1,a=Math.max(a,u.h),o=Math.max(o,s);const h=Math.max(1,r+a),c=new Uint8Array(o*h*4),d=new Uint8Array(o*h*4),f=n.map((u,p)=>{const g=i[p],M=Po(u.A,u.w,u.h),x=Po(u.N,u.w,u.h);for(let v=0;v<u.h;v++){const _=v*u.w*4,w=((g.y+v)*o+g.x)*4;c.set(M.subarray(_,_+u.w*4),w),d.set(x.subarray(_,_+u.w*4),w)}let m=0;e:for(let v=u.h-1;v>=0;v--,m++)for(let _=0;_<u.w;_++)if(M[(v*u.w+_)*4+3]>=128)break e;return{uv:[g.x/o,g.y/h,(g.x+u.w)/o,(g.y+u.h)/h],w:u.w,h:u.h,pad:Math.min(m,u.h)}});return{albedo:c,normal:d,width:o,height:h,frames:f}}function Xw(n,e){const t=[],i={frames:{},origin:{}},s=Uw();for(const r of u0)for(const[a,o]of Object.entries(Nw))for(let h=0;h<o;h++){const c=zw(n,{angle:r,state:a,frame:h});i.frames[`${r}:${a}:${h}`]=t.push(un(c.sp,s,n,n.cOutline,e))-1,i.origin[r]||(i.origin[r]=c.origin)}return{sprites:t,speakers:i}}function Kw(n,e){const t=[],i=[],s=dg(n);for(const r of oh){const a=fg(r.id,n);i.push({id:r.id,family:r.family,decal:!!r.decal,frame:t.push(un(a.whole,s,n,"none",e))-1,originX:a.origin.x,originY:a.origin.y})}return{sprites:t,relics:i,layouts:ug(n)}}function qw(n,e){const t=[],i=[],s=c0(n);for(const r of l0){const a=Cw(r.id,n);i.push({id:r.id,frame:t.push(un(a.sp,s,n,"none",e))-1,originX:a.origin.x,originY:a.origin.y})}return{sprites:t,pieces:i}}function $w(n,e){const t=[],i=[],s=ig(n),r=a=>{for(let o=0;o<a.m.length;o++)if(a.m[o])return!1;return!0};for(const a of Is)for(let o=0;o<a.variants;o++){const h=sg(a.id,n,{variant:o}),c=h.crownY>0&&!r(h.top),d=t.push(un(c?h.bot:h.whole,s,n,"none",e))-1,f=c?t.push(un(h.top,s,n,"none",e))-1:null;i.push({id:a.id,family:a.family,bot:d,top:f,footprint:h.metres.footprint})}return{sprites:t,decor:i}}function Zw(n,e){if(n.kind==="creature")return{px:as(Pd(n.style,n.id,e),2048)};if(n.kind==="relics"){const{sprites:r,relics:a,layouts:o}=Kw(n.style,e);return{px:as(r,2048),relics:a,layouts:o}}if(n.kind==="pathPieces"){const{sprites:r,pieces:a}=qw(n.style,e);return{px:as(r,2048),pieces:a}}if(n.kind==="speakers"){const{sprites:r,speakers:a}=Xw(n.style,e);return{px:as(r,2048),speakers:a}}if(n.kind==="decor"){const{sprites:r,decor:a}=$w(n.style,e);return{px:as(r,2048),decor:a}}if(n.kind==="party")return{px:as(Pd(n.style,n.species,e,{...Cp(n.seed),collar:n.colour}),2048)};const{sprites:t,layout:i,floor:s}=Vw(n.style,n.seed,n.id,n.K,e);return{px:as(t),layout:i,floor:{albedo:new Uint8Array(Po(s.A,s.w,s.h)),normal:new Uint8Array(Po(s.N,s.w,s.h)),w:s.w,h:s.h}}}function Dd(n,e,t){const i=new hs(n,e,t,qn,Kn);return i.magFilter=Ht,i.minFilter=Ht,i.generateMipmaps=!1,i.flipY=!1,i.colorSpace=Pn,i.needsUpdate=!0,i}function d0(n){return{albedo:Dd(n.albedo,n.width,n.height),normal:Dd(n.normal,n.width,n.height),frames:n.frames}}const ea=(n,e=2048)=>d0(as(n,e)),Jw="1d9f6321bce5",Qw="witch-art",la="sets";let Za=null;function f0(){return Za||(Za=new Promise(n=>{try{if(typeof indexedDB>"u")return n(null);const e=indexedDB.open(Qw,1);e.onupgradeneeded=()=>{try{e.result.createObjectStore(la)}catch{}},e.onsuccess=()=>n(e.result),e.onerror=()=>n(null),e.onblocked=()=>n(null)}catch{n(null)}}),Za)}async function jw(n){try{const e=await f0();return e?await new Promise(t=>{try{const i=e.transaction(la,"readonly").objectStore(la).get(n);i.onsuccess=()=>t(i.result??null),i.onerror=()=>t(null)}catch{t(null)}}):null}catch{return null}}function e3(n,e){f0().then(t=>{if(t)try{const i=t.transaction(la,"readwrite");i.onerror=s=>s.preventDefault(),i.objectStore(la).put(e,n)}catch{}}).catch(()=>{})}function t3(n){let e=2166136261;for(let t=0;t<n.length;t++)e=Math.imul(e^n.charCodeAt(t),16777619);return(e>>>0).toString(36)}class n3{constructor(e,t,i){this.style=e,this.seed=t,this.K=2/i,this.styleHash=t3(JSON.stringify(e));const s=K0(e),r=u=>un(ep(e,u),s,e,e.cOutline),a=[0,1,2].map(u=>r({frame:u})).concat([0,1,2].map(u=>r({frame:u,facing:"away"})),[r({lean:!0}),r({lean:!0,facing:"away"})],...["rise","descend"].flatMap(u=>["towards","away"].flatMap(p=>[0,1].map(g=>r({pose:u,frame:g,facing:p}))))),o=Yd;for(const u of["stand","land","takeoff","talk","placeSigil","liftSigil","sit"]){const p=o[u].frames,g={towards:[],away:[],fps:o[u].fps};for(const M of["towards","away"])for(let x=0;x<p;x++)g[M].push(a.length),a.push(r({pose:u,frame:x,facing:M}));this.witchFoot[u]=g}for(const[u,p]of[["fast",3],["brake",2]]){const g={towards:[],away:[],fps:u==="fast"?10:8};for(const M of["towards","away"])for(let x=0;x<p;x++)g[M].push(a.length),a.push(r({pose:u,frame:x,facing:M}));this.witchFly[u]=g}this.witch=ea(a,2048);const h=Rm(e);this.props=ea([...h.campfire,h.stones.cyan,h.stones.violet,h.stones.green],1024);const c=[];for(let u=0;u<3;u++)for(let p=0;p<3;p++)c.push(un(Ow(e,{variant:u,frame:p,state:"playing"}),h0(u),e,e.cOutline));this.soundsystems=ea(c,2048);const d=Sw(e),f=yw(e);for(const u of[d.bot,d.top])for(let p=Math.max(0,Math.floor(d.anchors.base.y-14));p<u.h;p++)for(let g=0;g<u.w;g++)u.m[p*u.w+g]===l.NOSE&&(u.m[p*u.w+g]=0);if(this.treehouse={atlas:ea([d.bot,d.top].map(u=>un(u,f,e,"none")),2048),...d.anchors},this.useWorkers=typeof Worker<"u"&&typeof OffscreenCanvas<"u",this.useWorkers){const u=Math.max(1,Math.min(6,(navigator.hardwareConcurrency||2)-1));try{for(let p=0;p<u;p++){const g=new Worker(new URL(""+new URL("artWorker-BFXz2maq.js",import.meta.url).href,import.meta.url),{type:"module"}),M={w:g,busy:!1};g.onmessage=x=>{M.busy=!1,M.job=void 0,this.receive(x.data),this.dispatch()},g.onerror=()=>{this.useWorkers=!1,M.job&&this.queue.unshift(M.job),M.busy=!1,M.job=void 0},this.workers.push(M)}}catch{this.useWorkers=!1}}}style;seed;types=new Map;creatures=new Map;decor;speakers;pieces;relicSet;queue=[];inFlight=new Set;workers=[];useWorkers;witch;witchFoot={};witchFly={};props;soundsystems;treehouse;K;version=0;timings=[];get done(){return this.timings.length}styleHash;onFloor=()=>{};key=e=>e.kind+":"+e.id;cacheKey=e=>e.kind==="party"?null:[Jw,this.styleHash,this.key(e),e.kind==="type"?`${e.seed}|${e.K}`:""].join("|");ask(e,t=!1){const i=this.key(e);if(this.inFlight.has(i)){const a=t?this.queue.findIndex(o=>this.key(o)===i):-1;a>0&&this.queue.unshift(...this.queue.splice(a,1));return}this.inFlight.add(i);const s=this.cacheKey(e),r=()=>{t?this.queue.unshift(e):this.queue.push(e),this.dispatch()};if(!s){r();return}jw(s).then(a=>{a&&a.px?this.receive({job:e,result:a,ms:0,cached:!0}):r()},r)}dispatch(){if(this.useWorkers)for(const e of this.workers)e.busy||!this.queue.length||(e.busy=!0,e.job=this.queue.shift(),e.w.postMessage(e.job))}receive(e){if(!e.result){console.warn("art worker failed, drawing on the page:",e.error),this.useWorkers=!1,this.queue.unshift(e.job);return}if(!e.cached){const i=this.cacheKey(e.job);i&&e3(i,e.result)}const t=d0(e.result.px);if(this.timings.push({set:this.key(e.job),ms:e.ms??0,at:performance.now(),cached:!!e.cached}),e.job.kind==="relics"){const i=e.result.relics;this.relicSet={atlas:t,byId:Object.fromEntries(i.map(s=>[s.id,s])),modern:i.filter(s=>s.family==="modern"),layouts:e.result.layouts}}else if(e.job.kind==="speakers")this.speakers={atlas:t,...e.result.speakers};else if(e.job.kind==="pathPieces")this.pieces={atlas:t,byId:Object.fromEntries(e.result.pieces.map(i=>[i.id,i]))};else if(e.job.kind==="decor"){const i=e.result.decor,s={};for(const r of i)(s[r.family]??=[]).push(r);this.decor={atlas:t,pieces:i,families:s}}else if(e.job.kind==="type"){const i=e.result.px,s=new Map;for(const r of e.result.layout.big){if(r.top===null)continue;const a=i.frames[r.top],o=Math.round(a.uv[0]*i.width),h=Math.round(a.uv[1]*i.height);let c=-1;for(let d=a.h-1;d>=0&&c<0;d--)for(let f=0;f<a.w;f++)if(i.albedo[((h+d)*i.width+o+f)*4+3]>0){c=d;break}c>=0&&s.set(r.bot,(c+1)/a.h)}this.types.set(e.job.id,{atlas:t,layout:e.result.layout,cut:s}),e.result.floor&&this.onFloor(e.job.id,e.result.floor)}else this.creatures.set(e.job.id,{atlas:t,frame:Yw});this.inFlight.delete(this.key(e.job)),this.version++}typeArt(e){const t=this.types.get(e);return t||this.ask({kind:"type",id:e,style:this.style,seed:this.seed,K:this.K},!0),t}decorArt(){return this.decor||this.ask({kind:"decor",id:"all",style:this.style}),this.decor}relicArt(){return this.relicSet||this.ask({kind:"relics",id:"all",style:this.style}),this.relicSet}speakerArt(){return this.speakers||this.ask({kind:"speakers",id:"all",style:this.style},!0),this.speakers}pathPieceArt(){return this.pieces||this.ask({kind:"pathPieces",id:"all",style:this.style}),this.pieces}creatureArt(e){const t=this.creatures.get(e);return t||this.ask({kind:"creature",id:e,style:this.style}),t}partyArt(e,t,i){const s=`party-${t}`,r=this.creatures.get(s);return r||this.ask({kind:"party",id:s,species:e,seed:t,colour:i,style:this.style}),r}prefetchType(e){this.types.has(e)||this.ask({kind:"type",id:e,style:this.style,seed:this.seed,K:this.K})}get pending(){return this.inFlight.size}work(e){if(this.useWorkers)return;const t=performance.now();let i=0;for(;this.queue.length&&(i===0||performance.now()-t<e);){const s=this.queue.shift(),r=performance.now(),a=Zw(s,(o,h)=>{const c=document.createElement("canvas");return c.width=o,c.height=h,c});this.receive({job:s,result:a,ms:performance.now()-r}),i++}}whenIdle(){return new Promise(e=>{const t=()=>{this.work(50),this.pending?setTimeout(t,30):e()};t()})}}const Os=24,ct={uAmb:{value:new V},uMoon:{value:new V},uMoonDir:{value:new V(-.45,.75,.5).normalize()},uMoonBeam:{value:new V},uBands:{value:4},uDither:{value:.35},uShafts:{value:.3},uShaftScale:{value:1},uGlowPos:{value:new V},uGlowRgb:{value:new V},uGlowR:{value:8},uGlowFalloff:{value:2.5},uGlowPower:{value:1.4},uHazeCentre:{value:new tt},uHazeRange:{value:new tt(70,200)},uHazeColour:{value:new V},uTime:{value:0},uSmooth:{value:1},uLightPos:{value:Array.from({length:Os},()=>new at)},uLightCol:{value:Array.from({length:Os},()=>new at)},uLightCount:{value:0},uDisco:{value:new at},uDiscoParams:{value:new at},uDiscoColour:{value:new V(1,1,1)},uScenery:{value:new tt(1e6,1)}};function i3(n,e,t,i=1,s=2.5,r=1){const a=(o,h)=>new V(o[0]/255*h,o[1]/255*h,o[2]/255*h);ct.uAmb.value.copy(a(me(n.ambientHue,.55,1),n.ambient*i)),ct.uMoon.value.copy(a(me(n.moonHue,.35,1),n.moon*r)),ct.uMoonBeam.value.copy(a(me(n.moonHue,.35,1),n.shafts*.25)),ct.uBands.value=n.bands,ct.uDither.value=n.dither*.5,ct.uShafts.value=n.shafts,ct.uShaftScale.value=t*2,ct.uGlowRgb.value.copy(a(me(n.glowHue,n.glowSat,1),1)),ct.uGlowR.value=e,ct.uGlowFalloff.value=s,ct.uGlowPower.value=n.glowPower,ct.uHazeColour.value.copy(a(me(n.ambientHue-.08,.55,1),.16*Math.sqrt(i)))}const Mi=`
uniform vec3 uAmb, uMoon, uMoonDir, uMoonBeam, uGlowPos, uGlowRgb;
uniform float uBands, uDither, uShafts, uShaftScale, uGlowR, uGlowFalloff, uGlowPower, uTime, uSmooth;
uniform vec2 uHazeCentre, uHazeRange;
uniform vec3 uHazeColour;
uniform vec4 uLightPos[${Os}], uLightCol[${Os}];
uniform int uLightCount;
uniform vec4 uDisco, uDiscoParams;
uniform vec3 uDiscoColour;
uniform vec2 uScenery;

// How much of a piece of scenery at P is drawn (1 well inside the scenery radius, 0 beyond it).
float sceneryFade(vec3 P) {
  return 1.0 - smoothstep(uScenery.x - uScenery.y, uScenery.x, length(P.xz - uHazeCentre));
}

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
  // The witch's glow (Ed, v147: "should fall off faster"): full under her, falling off with the
  // distance along the ground as (1 - d/reach)^falloff (about half at 12 m, a faint tail, nothing
  // at the reach); lit from a source above her, so there's no hot spot under her.
  vec3 v = uGlowPos - P;
  float dg = length(v.xz);
  if (dg < uGlowR) {
    float ndl = max(0.0, dot(N, normalize(v + vec3(0.0, 1e-4, 0.0)))) * 0.35 + 0.65;
    float fall = pow(1.0 - dg / uGlowR, uGlowFalloff);
    l += uGlowRgb * min(1.0, ndl * fall * uGlowPower);
  }
  for (int i = 0; i < ${Os}; i++) {
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
`,rs=2,vn=32,Cs=8,s3=`
varying vec3 vWorld;
void main() {
  vec4 w = modelMatrix * vec4(position, 1.0);
  vWorld = w.xyz;
  gl_Position = projectionMatrix * viewMatrix * w;
}
`,r3=`
uniform sampler2D uAreas;
uniform vec4 uExtent; // minX, minZ, width, depth (metres)
uniform float uPixel; // metres per art pixel
uniform vec3 uTypeFloor[32];      // each type's floor colour (hsv), until its tile is drawn
uniform float uFloorReady[32];
uniform vec3 uTerrain[32];        // each type's ground features: mounds, hollows, ridges (0 or 1)
uniform sampler2D uFloors;        // every type's floor tile, FLOOR_COLS to a row
uniform vec2 uTile, uFloorsSize;  // one tile's size and the atlas's, in art pixels
uniform float uSat;
uniform vec3 uFloor; // dancefloor x, z, radius
uniform vec4 uCircle;
uniform vec4 uSweeps[4]; // partifying areas: the front's origin x, z, its radius, strength
uniform int uSweepCount; // magic circle: hue, second hue, brightness (pulsing), rune band's turn (radians)

uniform vec4 uCanopy; // canopy shadow: strength (0 off), height, cover, wind speed
uniform vec2 uClearing; // clearingSize, clearingFalloff: where trees, and so canopy, begin
uniform vec4 uBlend; // ground blend: warp, fine (metres), band (metres), dither (0 or 1)
// The dancefloor's glass tiles (Ed, v160): the art's unlit floor (tiles, grout, rim) from above, the
// lit tile's look at intensities 1 to 3 side by side, and this frame's tiles from the engine
// (rgb, and intensity x 85 in alpha); geometry: metres a tile, art px a tile (pitch), the floor
// texture's size, the grid's origin in it (px); and the rim's outer radius (px).
uniform sampler2D uDiscoBase, uDiscoLit, uDiscoTiles;
uniform vec4 uDiscoGeom;
uniform float uDiscoRim;
varying vec3 vWorld;
${Mi}
float hash(vec2 p) { p = fract(p * vec2(123.34, 456.21)); p += dot(p, p + 45.32); return fract(p.x * p.y); }
float vnoise(vec2 p) {
  vec2 i = floor(p), f = fract(p), u = f * f * (3.0 - 2.0 * f);
  float a = hash(i), b = hash(i + vec2(1, 0)), c = hash(i + vec2(0, 1)), d = hash(i + vec2(1, 1));
  return a + (b - a) * u.x + (c - a) * u.y + (a - b - c + d) * u.x * u.y;
}
// An ordered (Bayer) threshold on the art's pixel grid, 0 to 1.
float bayer2(vec2 a) { a = floor(a); return fract(a.x / 2.0 + a.y * a.y * 0.75); }
float bayer4(vec2 a) { return bayer2(0.5 * a) * 0.25 + bayer2(a); }
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
  // Which floor shows (Ed, v160: blend the ground textures): the area lookup warped in two
  // octaves, so borders meander instead of following the texture's grid, then a second lookup a
  // little way off; where the two disagree (near a border), each art pixel takes one or the other
  // by noise and an ordered dither, a speckled band of grass creeping into dirt. Visual only:
  // openness and ponds keep the plain lookup, and gameplay's partition is untouched.
  if (uBlend.x + uBlend.y > 0.0) {
    vec2 w1 = vec2(vnoise(p / 40.0), vnoise(p / 40.0 + 31.0)) - 0.5, w2 = vec2(vnoise(p / 6.0 + 7.0), vnoise(p / 6.0 + 53.0)) - 0.5;
    vec2 q = p + w1 * 2.0 * uBlend.x + w2 * 2.0 * uBlend.y;
    vec4 a1 = texture2D(uAreas, (q - uExtent.xy) / uExtent.zw);
    vec2 off = (vec2(vnoise(px / 3.0 + 91.0), vnoise(px / 3.0 + 37.0)) - 0.5) * uBlend.z;
    vec4 a2 = texture2D(uAreas, (q + off - uExtent.xy) / uExtent.zw);
    int t1 = int(a1.r * 255.0 + 0.5), t2 = int(a2.r * 255.0 + 0.5);
    if (a1.a > 0.5) t = t1;
    if (a2.a > 0.5 && t2 != t1) {
      float k = uBlend.w > 0.5 ? vnoise(px / 2.0) * 0.6 + bayer4(px) * 0.4 : vnoise(px / 2.0);
      if (k < 0.5) t = t2;
    }
  }
  vec3 c;
  if (area.a > 0.5 && uFloorReady[t] > 0.5) {
    // The area's floor tile, repeated on the art's pixel grid.
    vec2 cell = vec2(mod(float(t), ${Cs}.0), floor(float(t) / ${Cs}.0));
    vec2 tp = mod(px, uTile);
    c = texture2D(uFloors, (cell * uTile + tp + 0.5) / uFloorsSize).rgb;
  } else {
    vec3 f = area.a > 0.5 ? uTypeFloor[t] : vec3(0.25, 0.45, 0.4);
    float v = vnoise(px / vec2(9.0, 6.0)) * 0.7 + vnoise(px / vec2(2.5, 2.0)) * 0.3;
    c = hsv(f.x, f.y * uSat, f.z * (v < 0.38 ? 0.8 : v > 0.66 ? 1.15 : 1.0));
  }
  c *= 1.0 + max(0.0, 0.55 - open) * 0.9;        // clearings are paler
  // The ground's features (its type's terrain): low mounds lit on the moon's side and shaded on
  // the other, sunken hollows darker at the bottom, and ridges in long ripples. Shading only.
  if (area.a > 0.5) {
    vec3 T = uTerrain[t];
    if (T.x + T.y + T.z > 0.0) {
      vec2 md = normalize(uMoonDir.xz + vec2(1e-4));
      float k = 11.0, e = 1.5;
      float n0 = vnoise(p / k), gx = vnoise((p + vec2(e, 0.0)) / k) - n0, gz = vnoise((p + vec2(0.0, e)) / k) - n0;
      float slope = dot(vec2(gx, gz), md) / e * k;  // + where the ground faces the moon
      float bump = T.x * smoothstep(0.45, 0.75, n0) - T.y * smoothstep(0.5, 0.8, 1.0 - n0);
      c *= 1.0 + bump * slope * 0.45 - T.y * smoothstep(0.62, 0.9, 1.0 - n0) * 0.3;
      if (T.z > 0.0) c *= 1.0 + T.z * 0.14 * sin((p.x * 0.55 + p.y) / 4.0 + vnoise(p / 30.0) * 6.0);
    }
  }
  // The dancefloor: the art's floor of glass tiles inside its stone rim; a lit tile glows in its
  // colour (unlit by the night: it is the light), the rest is lit like the ground.
  {
    vec2 fd = p - uFloor.xy;
    if (length(fd) / uDiscoGeom.x * uDiscoGeom.y < uDiscoRim) {
      vec2 bpx = floor(fd / uDiscoGeom.x * uDiscoGeom.y + uDiscoGeom.z * 0.5);
      vec4 base = texture2D(uDiscoBase, (bpx + 0.5) / uDiscoGeom.z);
      vec2 g = bpx - uDiscoGeom.w, tile = floor(g / uDiscoGeom.y), tp = g - tile * uDiscoGeom.y - 1.0;
      if (tile.x >= 0.0 && tile.y >= 0.0 && tile.x < 32.0 && tile.y < 32.0 && tp.x >= 0.0 && tp.y >= 0.0 && tp.x < 14.0 && tp.y < 14.0) {
        vec4 cell = texture2D(uDiscoTiles, (tile + 0.5) / 32.0);
        float k = floor(cell.a * 3.0 + 0.5);
        if (k > 0.5) {
          vec3 look = texture2D(uDiscoLit, (vec2(tp.x + (k - 1.0) * 14.0, tp.y) + 0.5) / vec2(42.0, 14.0)).rgb;
          gl_FragColor = vec4(haze(look * cell.rgb * 1.25, vWorld), 1.0);
          return;
        }
      }
      if (base.a > 0.5) c = base.rgb;
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
`;class a3{constructor(e,t,i,s){this.map=e,this.forest=t;const r=e.extent,a=r.maxX-r.minX,o=r.maxZ-r.minZ,h=Math.ceil(a*rs/vn)*vn,c=Math.ceil(o*rs/vn)*vn;this.tilesX=h/vn,this.tilesZ=c/vn,this.filled=new Uint8Array(this.tilesX*this.tilesZ);const d=M=>(M.magFilter=M.minFilter=Ht,M.generateMipmaps=!1,M.colorSpace=Pn,M.needsUpdate=!0,M);this.texture=d(new hs(new Uint8Array(h*c*4),h,c)),d(this.tile),this.floors=d(new hs(new Uint8Array(64*Cs*48*4*4),64*Cs,192));const f=Array.from({length:32},(M,x)=>new V(...vt[x]?.floor??[.25,.45,.4])),u=o3(i,e.dancefloor.radius),p=new xt({vertexShader:s3,fragmentShader:r3,uniforms:{...ct,uAreas:{value:this.texture},uExtent:{value:new at(r.minX,r.minZ,h/rs,c/rs)},uPixel:{value:s},uTypeFloor:{value:f},uFloorReady:{value:this.floorReady},uTerrain:{value:Array.from({length:32},(M,x)=>{const m=vt[x]?.layout.terrain??[];return new V(+m.includes("mounds"),+m.includes("hollows"),+m.includes("ridges"))})},uFloors:{value:this.floors},uTile:{value:new tt(64,48)},uFloorsSize:{value:new tt(64*Cs,192)},uSat:{value:i.sat},uFloor:{value:new V(e.dancefloor.x,e.dancefloor.z,e.dancefloor.radius)},uCanopy:{value:new at},uCircle:{value:new at},uSweeps:{value:Array.from({length:4},()=>new at)},uSweepCount:{value:0},uClearing:{value:new tt(e.tuning.clearingSize,e.tuning.clearingFalloff)},uDiscoBase:{value:u.base},uDiscoLit:{value:u.lit},uDiscoTiles:{value:this.discoTiles},uDiscoGeom:{value:new at(u.tileM,u.pitch,u.size,u.gridOrigin)},uDiscoRim:{value:u.rimOuter},uBlend:{value:(M=>M.on?new at(M.warp,M.fine,M.band,M.dither?1:0):new at)(e.tuning.groundBlend)}}}),g=new Zn(a+400,o+400);g.rotateX(-Math.PI/2),this.mesh=new Yt(g,p),this.mesh.position.set((r.minX+r.maxX)/2,0,(r.minZ+r.maxZ)/2)}map;forest;mesh;texture;tile=new hs(new Uint8Array(vn*vn*4),vn,vn);filled;tilesX;tilesZ;initialised=!1;floorReady=new Array(32).fill(0);floors;discoTiles=(e=>(e.magFilter=e.minFilter=Ht,e.generateMipmaps=!1,e.colorSpace=Pn,e))(new hs(new Uint8Array(1024*4),32,32));pendingFloors=[];setFloorTiles(e){const t=this.discoTiles.image.data;for(let i=0;i<t.length;i+=4)t[i]=e[i],t[i+1]=e[i+1],t[i+2]=e[i+2],t[i+3]=Math.min(255,e[i+3]*85);this.discoTiles.needsUpdate=!0}setSweeps(e){const t=this.mesh.material.uniforms,i=t.uSweeps.value;e.slice(0,4).forEach((s,r)=>i[r].set(s.x,s.z,s.radius,s.strength)),t.uSweepCount.value=Math.min(4,e.length)}setCircle(e,t,i,s){this.mesh.material.uniforms.uCircle.value.set(e,t,i,s)}setCanopyShadow(e,t,i,s){this.mesh.material.uniforms.uCanopy.value.set(e,t,i,s)}setFloor(e,t){this.pendingFloors.push([e,t])}placeFloors(e){for(const[t,i]of this.pendingFloors){const s=this.mesh.material,r=s.uniforms.uTile.value;if(i.w!==r.x||i.h!==r.y)continue;const a=new hs(i.albedo,i.w,i.h);a.needsUpdate=!0,e.copyTextureToTexture(a,this.floors,null,new tt(t%Cs*i.w,Math.floor(t/Cs)*i.h)),a.dispose(),this.floorReady[t]=1}this.pendingFloors=[]}fill(e,t,i,s,r){this.initialised||(e.initTexture(this.texture),e.initTexture(this.floors),this.initialised=!0),this.pendingFloors.length&&this.placeFloors(e);const a=this.map.extent,o=vn/rs,h=Math.max(0,Math.floor((t.minX-a.minX)/o)),c=Math.min(this.tilesX-1,Math.floor((t.maxX-a.minX)/o)),d=Math.max(0,Math.floor((t.minZ-a.minZ)/o)),f=Math.min(this.tilesZ-1,Math.floor((t.maxZ-a.minZ)/o)),u=(i-a.minX)/o,p=(s-a.minZ)/o,g=[];for(let m=d;m<=f;m++)for(let v=h;v<=c;v++)this.filled[m*this.tilesX+v]||g.push([v,m,(v+.5-u)**2+(m+.5-p)**2]);g.sort((m,v)=>m[2]-v[2]);const M=performance.now();let x=0;for(const[m,v]of g){if(x>0&&performance.now()-M>r)break;this.fillTile(e,m,v),x++}return g.length-x}fillTile(e,t,i){const s=this.map.extent,r=this.tile.image.data,a=vn/rs,o=s.minX+t*a,h=s.minZ+i*a,c=this.forest.lightsNear(o+a/2,h+a/2,a/2+6).filter(d=>d.kind==="pond");for(let d=0;d<vn;d++)for(let f=0;f<vn;f++){const u=o+(f+.5)/rs,p=h+(d+.5)/rs,g=this.map.areaAt(u,p),M=(d*vn+f)*4;let x=0;for(const m of c)Math.hypot(u-m.x,p-m.z)<3*m.size&&(x=255);r[M]=g.type,r[M+1]=Math.round(g.openness*255),r[M+2]=x,r[M+3]=255}this.tile.needsUpdate=!0,e.copyTextureToTexture(this.tile,this.texture,null,new tt(t*vn,i*vn)),this.filled[i*this.tilesX+t]=1}dispose(){this.texture.dispose(),this.tile.dispose(),this.mesh.geometry.dispose(),this.mesh.material.dispose()}}function o3(n,e){const t=o=>{const h=new Ro(o);return h.magFilter=h.minFilter=Ht,h.generateMipmaps=!1,h.flipY=!1,h.colorSpace=Pn,h},i=u1(),s=un(i.sp,{...xu(3),...c1()},n,"none").A,r=document.createElement("canvas");r.width=42,r.height=14;const a=r.getContext("2d");for(let o=1;o<=3;o++)a.drawImage(un(vf("lit",{level:o}),xu(o),n,"none").A,(o-1)*14,0);return{base:t(s),lit:t(r),tileM:e/wr,pitch:i.pitch,size:i.size,gridOrigin:i.gridOrigin,rimOuter:i.rimOuter}}const Bl=Ho,l3=new Set(["tarmac","railway","stairs","bridges"]),zl=`
attribute vec3 uvw; // across (0-1), along (in periods), metres to the nearer end of its stretch
varying vec3 vWorld;
varying vec2 vUv;
varying float vEnd;
void main() {
  vWorld = position;
  vUv = uvw.xy;
  vEnd = uvw.z;
  gl_Position = projectionMatrix * viewMatrix * vec4(position, 1.0);
}
`,p0=`
uniform float uPathFade; // metres over which a path's end fades out
varying float vEnd;
float pbayer(vec2 p) {
  int x = int(mod(p.x, 4.0)), y = int(mod(p.y, 4.0));
  int m[16] = int[16](0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5);
  return (float(m[x + y * 4]) + 0.5) / 16.0;
}
float phash(vec2 p) { return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453); }
// Ends fray out (Ed, v149): over the last uPathFade metres pixels drop away in an ordered dither on
// the art's pixel grid, broken up by noise so the end crumbles into the grass, not in a line.
bool pathEndGone(vec2 px) {
  if (uPathFade <= 0.0) return false;
  float n = phash(floor(px / 3.0)) * 0.5 + phash(px) * 0.5;
  float e = clamp(vEnd / uPathFade + (n - 0.5) * 0.45, 0.0, 1.0);
  return pbayer(px) >= e;
}
`,Id=`
uniform sampler2D uStrip;
uniform float uPixel;
varying vec3 vWorld;
varying vec2 vUv;
${Mi}
${p0}
void main() {
  // Sample at the centre of the art pixel this fragment is in, as the floor does, so the path's
  // pixels line up with the ground's.
  vec2 p = (floor(vWorld.xz / uPixel) + 0.5) * uPixel;
  mat2 dw = mat2(dFdx(vWorld.xz), dFdy(vWorld.xz)), du = mat2(dFdx(vUv), dFdy(vUv));
  vec2 uv = vUv;
  if (abs(determinant(dw)) > 1e-9) uv += du * inverse(dw) * (p - vWorld.xz);
  if (uv.x < 0.0 || uv.x > 1.0) discard;
  if (pathEndGone(floor(vWorld.xz / uPixel))) discard;
  vec4 c = texture2D(uStrip, vec2(uv.x, fract(uv.y)));
  if (c.a < 0.5) discard;
  if (c.a < 0.999) { gl_FragColor = vec4(haze(c.rgb, vWorld), sceneryFade(vWorld)); return; } // the magic trail glows
  vec3 light = nightLightShaded(vec3(0.0, 1.0, 0.0), vec3(p.x, 0.0, p.y), 1.0);
  gl_FragColor = vec4(haze(min(vec3(1.0), c.rgb * light * 1.25), vWorld), sceneryFade(vWorld));
}
`,c3=`
uniform float uPixel;
varying vec3 vWorld;
varying vec2 vUv;
${Mi}
${p0}
float h21(vec2 p) { return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453); }
float vn(vec2 p) { vec2 i = floor(p), f = fract(p), u = f * f * (3.0 - 2.0 * f); return mix(mix(h21(i), h21(i + vec2(1, 0)), u.x), mix(h21(i + vec2(0, 1)), h21(i + vec2(1, 1)), u.x), u.y); }
void main() {
  vec2 px = floor(vWorld.xz / uPixel), p = (px + 0.5) * uPixel;
  float across = abs(vUv.x * 2.0 - 1.0), bank = 1.0 - 0.35 * vn(vec2(vUv.y * 3.0, vUv.x > 0.5 ? 3.0 : 9.0));
  if (across > bank || pathEndGone(px)) discard;
  vec3 V = normalize(cameraPosition - vec3(p.x, 0.0, p.y));
  vec3 R = reflect(-V, vec3(0.0, 1.0, 0.0));
  vec3 moon = normalize(vec3(uMoonDir.x, uMoonDir.y, -abs(uMoonDir.z)));
  float spec = dot(R, moon) + (vn(px * vec2(0.6, 2.5) + vec2(0.0, uTime * 1.5)) - 0.5) * 0.06;
  vec3 water = vec3(0.015, 0.03, 0.055) * nightLight(vec3(0.0, 1.0, 0.0), vec3(p.x, 0.0, p.y)) * 4.0;
  if (across > bank - 0.12) water = mix(water, vec3(0.05, 0.06, 0.05), 0.6); // the muddy margin
  else if (spec > 0.985) water = vec3(0.92, 0.95, 1.0);
  else if (spec > 0.965) water = vec3(0.45, 0.55, 0.7);
  else if (vn(vec2(vUv.y * 4.0 - uTime * 0.8, vUv.x * 6.0)) > 0.72) water += vec3(0.05, 0.07, 0.1); // ripples
  gl_FragColor = vec4(haze(water, vWorld), sceneryFade(vWorld));
}
`;class h3{group=new Ds;constructor(e,t,i,s=6){const r=e.paths,a=e.seed,o=Lw(),h=new Map,c=u=>{const p=u.cell.join(",");let g=h.get(p);if(!g){const M=(o[vt[u.type].id]??[]).filter(x=>!l3.has(x)&&Bl[x]&&(x!=="magic"||we(u.cell[0],u.cell[1],a+831)<.15));g=M.length?M[Math.floor(we(u.cell[0],u.cell[1],a+833)*M.length)]:"dirt",h.set(p,g)}return g},d=new Map;r.lines.forEach((u,p)=>{const g=u.kind==="rail"?Math.floor(we(p,1,a+835)*3):0,M=u.kind==="path"?c(u.area??e.areaAt(u.pts[0][0],u.pts[0][1])):"dirt",x=u.pts,m=x.length,v=[0];for(let b=1;b<m;b++)v.push(v[b-1]+Math.hypot(x[b][0]-x[b-1][0],x[b][1]-x[b-1][1]));const _=x.map((b,E)=>{const C=x[Math.max(0,E-1)],T=x[Math.min(m-1,E+1)],R=T[0]-C[0],O=T[1]-C[1],I=Math.hypot(R,O)||1;return[-O/I,R/I]}),w=v[m-1],A=Array.from({length:m-1},(b,E)=>{const C=(x[E][0]+x[E+1][0])/2,T=(x[E][1]+x[E+1][1])/2;return!(u.kind==="rail"&&r.railBroken(C,T))&&Math.hypot(C-e.dancefloor.x,T-e.dancefloor.z)>Ws(e.tuning)}),y=[],S=[];for(let b=0,E=0;b<m-1;b++)A[b]&&((b===0||!A[b-1])&&(E=v[b]),y[b]=E);for(let b=m-2,E=0;b>=0;b--)A[b]&&((b===m-2||!A[b+1])&&(E=v[b+1]),S[b]=E);for(let b=0;b<m-1;b++){if(!A[b])continue;const E=u.kind==="stream"?{width:u.half*2,period:4}:null,C=u.kind==="stream"?"stream":u.kind==="rail"?"railway":u.kind==="road"?"tarmac":M,T=E??Bl[C],R=C+":"+g;let O=d.get(R);O||d.set(R,O={pos:[],uv:[]});const I=U=>T.width/2*(u.deadEnd?Math.min(1,(w-v[U])/6):1),k=(U,W)=>{const ne=I(U)*W;O.pos.push(x[U][0]+_[U][0]*ne,.02,x[U][1]+_[U][1]*ne),O.uv.push(W>0?1:0,v[U]/T.period,Math.min(v[U]-y[b],S[b]-v[U]))};k(b,-1),k(b,1),k(b+1,1),k(b,-1),k(b+1,1),k(b+1,-1)}});const f=c0(t);for(const u of r.junctions){const p=Aw({variant:Math.floor(we(u.line,1,a+835)*3)}),g=yn,M=p.w/g,x=p.h/g,m=Bl.railway.width/2,v=u.side>0?-u.dz:u.dz,_=u.side>0?u.dx:-u.dx,w=(C,T)=>[u.x+u.dx*(C-m)+v*(T-m),.03,u.z+u.dz*(C-m)+_*(T-m)],A=[w(0,0),w(M,0),w(M,x),w(0,0),w(M,x),w(0,x)].flat(),y=[0,0,1e3,1,0,1e3,1,1,1e3,0,0,1e3,1,1,1e3,0,1,1e3],S=new Ro(un(p,f,t,"none").A);S.magFilter=S.minFilter=Ht,S.generateMipmaps=!1,S.flipY=!1,S.colorSpace=Pn;const b=new Qt;b.setAttribute("position",new St(A,3)),b.setAttribute("uvw",new St(y,3));const E=new Yt(b,new xt({vertexShader:zl,fragmentShader:Id,transparent:!0,depthWrite:!1,side:ti,polygonOffset:!0,polygonOffsetFactor:-2,polygonOffsetUnits:-6,uniforms:{...ct,uStrip:{value:S},uPixel:{value:i},uPathFade:{value:s}}}));E.renderOrder=.55,this.group.add(E)}for(const[u,p]of d){const[g,M]=u.split(":"),x=new Qt;if(x.setAttribute("position",new St(p.pos,3)),x.setAttribute("uvw",new St(p.uv,3)),g==="stream"){const y=new xt({vertexShader:zl,fragmentShader:c3,transparent:!0,depthWrite:!1,polygonOffset:!0,polygonOffsetFactor:-1,polygonOffsetUnits:-2,uniforms:{...ct,uPixel:{value:i},uPathFade:{value:s}}}),S=new Yt(x,y);S.frustumCulled=!1,S.renderOrder=.4,this.group.add(S);continue}const m=Ew(g,{variant:+M}).strip,v=un(m,f,t,"none"),_=new Ro(v.A);_.magFilter=_.minFilter=Ht,_.generateMipmaps=!1,_.flipY=!1,_.wrapT=vo,_.colorSpace=Pn;const w=new xt({vertexShader:zl,fragmentShader:Id,transparent:!0,depthWrite:!1,polygonOffset:!0,polygonOffsetFactor:-1,polygonOffsetUnits:-4,uniforms:{...ct,uStrip:{value:_},uPixel:{value:i},uPathFade:{value:s}}}),A=new Yt(x,w);A.frustumCulled=!1,A.renderOrder=.5,this.group.add(A)}}}const u3="varying vec2 vUv; void main() { vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }",d3=`
uniform sampler2D uScene; uniform float uThreshold; varying vec2 vUv;
void main() {
  vec3 c = texture2D(uScene, vUv).rgb;
  float l = max(c.r, max(c.g, c.b));
  gl_FragColor = vec4(c * smoothstep(uThreshold, uThreshold + 0.25, l), 1.0);
}`,f3=`
uniform sampler2D uSrc; uniform vec2 uStep; varying vec2 vUv;
void main() {
  vec4 c = texture2D(uSrc, vUv) * 0.227;
  c += (texture2D(uSrc, vUv + uStep * 1.38) + texture2D(uSrc, vUv - uStep * 1.38)) * 0.316;
  c += (texture2D(uSrc, vUv + uStep * 3.23) + texture2D(uSrc, vUv - uStep * 3.23)) * 0.070;
  gl_FragColor = c;
}`,p3=`
uniform sampler2D uScene, uBloom, uFx; uniform vec2 uLow; uniform float uBloomStrength, uBlack, uGamma, uFxOn; varying vec2 vUv;
void main() {
  vec2 p = (floor(vUv * uLow) + 0.5) / uLow;
  vec3 c = texture2D(uScene, p).rgb;
  if (uFxOn > 0.5) { vec4 f = texture2D(uFx, vUv); c = c * (1.0 - f.a) + f.rgb; }
  // Levels: a black point and a gamma, so the shade goes near-black and the lit stays bright.
  c = pow(clamp((c - uBlack) / (1.0 - uBlack), 0.0, 1.0), vec3(uGamma));
  c += texture2D(uBloom, vUv).rgb * uBloomStrength;
  gl_FragColor = vec4(min(c, vec3(1.0)), 1.0);
}`,m3=`
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
}`;function Es(n,e,t,i=!1){const s=new ii(Math.max(1,n),Math.max(1,e),{minFilter:t,magFilter:t,depthBuffer:i,generateMipmaps:!1});return s.texture.colorSpace=Pn,s}class g3{constructor(e,t){this.renderer=e,this.tuning=t,this.scene=Es(1,1,Jt,!0),this.scene.depthTexture=new Er(1,1),this.fx.texture.format=qn;const i=(s,r)=>new xt({vertexShader:u3,fragmentShader:s,uniforms:r,depthTest:!1,depthWrite:!1});this.mats={bright:i(d3,{uScene:{value:null},uThreshold:{value:.6}}),blur:i(f3,{uSrc:{value:null},uStep:{value:new tt}}),composite:i(p3,{uScene:{value:null},uBloom:{value:null},uLow:{value:new tt},uBloomStrength:{value:0},uBlack:{value:0},uGamma:{value:1},uFx:{value:null},uFxOn:{value:0}}),tilt:i(m3,{uSrc:{value:null},uTexel:{value:new tt},uDir:{value:new tt},uStrength:{value:0},uBand:{value:.4},uCentre:{value:.5}})},this.quad=new Yt(new Zn(2,2),this.mats.composite),this.quad.frustumCulled=!1}renderer;tuning;scene;bright=Es(1,1,Jt);bloomB=Es(1,1,Jt);a=Es(1,1,Jt);b=Es(1,1,Jt);fx=Es(1,1,Jt);fxB=Es(1,1,Jt);fxScene=null;quad;cam=new Ih(-1,1,1,-1,0,1);mats;low=new tt(1,1);out=new tt(1,1);lift=0;get fullResolution(){return this.tuning.tiltShift.on&&this.tuning.tiltShift.where==="after"}get lowSize(){return this.low}resize(e,t,i,s){this.low.set(e,t),this.fx.setSize(e,t),this.fxB.setSize(e,t),this.out.set(i,s),this.scene.setSize(e,t);const r=Math.max(1,Math.round(e/2)),a=Math.max(1,Math.round(t/2));this.bright.setSize(r,a),this.bloomB.setSize(r,a);const o=this.fullResolution?i:e,h=this.fullResolution?s:t;this.a.setSize(o,h),this.b.setSize(o,h)}pass(e,t,i){const s=this.mats[e];i(s.uniforms),this.quad.material=s,this.renderer.setRenderTarget(t),this.renderer.render(this.quad,this.cam)}render(e,t){const i=this.renderer,s=this.tuning;i.setRenderTarget(this.scene),i.render(e,t);const r=s.bloom.on&&s.bloom.strength>0;if(r){const u=this.bright.width,p=this.bright.height;this.pass("bright",this.bright,g=>{g.uScene.value=this.scene.texture,g.uThreshold.value=s.bloom.threshold});for(let g=0;g<2;g++)this.pass("blur",this.bloomB,M=>{M.uSrc.value=this.bright.texture,M.uStep.value.set(1/u,0)}),this.pass("blur",this.bright,M=>{M.uSrc.value=this.bloomB.texture,M.uStep.value.set(0,1/p)})}const a=!!this.fxScene;if(this.fxScene){const u=i.getClearColor(new ht),p=i.getClearAlpha();i.setRenderTarget(this.fx),i.setClearColor(0,0),i.clear(),i.render(this.fxScene,t),i.setClearColor(u,p);const g=this.fx.width,M=this.fx.height;this.pass("blur",this.fxB,x=>{x.uSrc.value=this.fx.texture,x.uStep.value.set(.6/g,0)}),this.pass("blur",this.fx,x=>{x.uSrc.value=this.fxB.texture,x.uStep.value.set(0,.6/M)})}const o=s.tiltShift.on&&s.tiltShift.strength>0;if(this.pass("composite",o?this.a:null,u=>{u.uScene.value=this.scene.texture,u.uBloom.value=this.bright.texture,u.uLow.value.copy(this.low),u.uBloomStrength.value=r?s.bloom.strength:0,u.uBlack.value=s.tone.black,u.uGamma.value=s.tone.gamma,u.uFx.value=this.fx.texture,u.uFxOn.value=a?1:0}),!o)return;const h=this.a.width,c=this.a.height,d=this.fullResolution?this.out.y/this.low.y:1,f=u=>{const p=s.tiltShift,g=Math.max(0,Math.min(1,this.lift)),M=g*g*(3-2*g);u.uTexel.value.set(1/h,1/c),u.uStrength.value=(p.strength+(p.treetop.strength-p.strength)*M)*d,u.uBand.value=p.band+(p.treetop.band-p.band)*M,u.uCentre.value=1-p.centre};this.pass("tilt",this.b,u=>{f(u),u.uSrc.value=this.a.texture,u.uDir.value.set(1,0)}),this.pass("tilt",null,u=>{f(u),u.uSrc.value=this.b.texture,u.uDir.value.set(0,1)})}}const x3=`
uniform vec3 uRight, uUp;
uniform float uSize;
varying vec2 vUv;
void main() {
  vUv = uv * 2.0 - 1.0;
  vec3 w = (modelMatrix * vec4(0.0, 0.0, 0.0, 1.0)).xyz + (uRight * position.x + uUp * position.y) * uSize;
  gl_Position = projectionMatrix * viewMatrix * vec4(w, 1.0);
}`,M3=`
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
}`,v3=`
uniform vec3 uTint;
void main() {
  if (mod(floor(gl_FragCoord.y), 3.0) > 0.5) discard; // faint: a dotted thread of light
  gl_FragColor = vec4(uTint, 1.0);
}`,b3=`
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
}`,y3=`
uniform vec3 uTint;
varying float vA;
void main() { if (vA < 0.15) discard; gl_FragColor = vec4(uTint * (0.5 + vA), 1.0); }`;class _3{constructor(e,t,i,s){this.tuning=t;const r=t.dancefloor,a=e.dancefloor;this.centre=new V(a.x,0,a.z);const o=new V(...me(r.circleHue2,.4,1).map(x=>x/255));this.ballMat=new xt({vertexShader:x3,fragmentShader:M3,uniforms:{...i,uSize:{value:r.discoSize/2},uTime:ct.uTime,uSpin:{value:r.spin/60*Math.PI*2},uPixels:{value:Math.max(6,Math.round(r.discoSize/s))},uTint:{value:o}}}),this.ball=new Yt(new Zn(2,2),this.ballMat),this.ball.frustumCulled=!1;const h=60;this.beam=new Yt(new Zn(s,h).translate(0,h/2,0),new xt({fragmentShader:v3,uniforms:{uTint:{value:o.clone().multiplyScalar(.5)}}})),this.beam.frustumCulled=!1;const c=r.motes,d=[],f=[];for(let x=0;x<c.count;x++){const m=w=>{const A=Math.sin(x*12.9898+w*78.233)*43758.5453;return A-Math.floor(A)},v=m(1)*Math.PI*2,_=Math.sqrt(m(2))*a.radius*c.column;d.push(a.x+Math.cos(v)*_,.3,a.z+Math.sin(v)*_),f.push(m(3),c.speed*(.6+m(4)*.8),.4+m(5)*1.2,0)}const u=new Qt;u.setAttribute("position",new St(d,3)),u.setAttribute("aMote",new St(f,4));const p=me(r.circleHue,.55,1);this.motes=new oa(u,new xt({vertexShader:b3,fragmentShader:y3,uniforms:{uTime:ct.uTime,uRise:{value:c.rise},uTint:{value:new V(p[0]/255,p[1]/255,p[2]/255)}},transparent:!0,depthWrite:!1,blending:Pi})),this.motes.frustumCulled=!1,this.moteCount=c.count;const g=me(r.circleHue,.7,1);this.lightRgb=new V(g[0]/255,g[1]/255,g[2]/255);const M=ct;M.uDiscoParams.value.set(r.spin/60*Math.PI*2,r.specks,r.speckBrightness,r.speckReach),M.uDiscoColour.value.copy(o)}tuning;ball;beam;motes;ballMat;lightRgb;tiles=new Uint8Array(Pt*Pt*4);moteCount;centre;update(e,t,i){const s=this.tuning.dancefloor,r=wf(i),a=M1(i.floor,r,this.tuning,this.tiles),o=i.floor.on!==null;t.setFloorTiles(a.rgbi);const h=.75+.25*Math.sin(e*s.pulse*Math.PI*2);t.setCircle(s.circleHue,s.circleHue2,.7+.3*h,e*s.runeSpeed/60*Math.PI*2);const c=s.discoHeight+Math.sin(e*.8)*.3;this.ball.position.set(this.centre.x,c,this.centre.z),this.beam.position.set(this.centre.x,c+s.discoSize/2,this.centre.z),this.ball.visible=this.beam.visible=o,ct.uDisco.value.set(this.centre.x,c,this.centre.z,o?1:0),this.motes.geometry.setDrawRange(0,o?Math.round(this.moteCount*(.25+.25*r.level)):0),a.lit>0&&this.lightRgb.set(...a.average).multiplyScalar(1/Math.max(.3,...a.average));const d=o?s.lightStrength*(.35+.65*Math.min(1,a.lit*3))*(.6+.15*r.level):0;return{x:this.centre.x,y:2.5,z:this.centre.z,reach:s.lightReach,rgb:this.lightRgb,strength:d}}}const w3=[new V(.25,.85,1),new V(.7,.4,1),new V(1,.65,.2)];class S3{constructor(e,t){this.atlas=e,this.metresPerPixel=t}atlas;metresPerPixel;homeSoundsystem(e){const t=e.map.dancefloor;return{x:t.x+t.radius+5,z:t.z+3,variant:0,at:-1/0,from:null}}update(e,t,i,s){const r=e.tuning.party,a=[],o=[],h=[],c=[],d=[this.homeSoundsystem(e)];for(const[,f]of e.party.areas){if(!f.soundsystem)continue;const u=f.from?e.map.siteOf(f.from[0],f.from[1]):null;d.push({...f.soundsystem,at:f.at,from:u})}for(const f of d){const u=r.transition>0?Math.min(1,(t-f.at)/r.transition):1,p=this.atlas.frames[f.variant*3+Math.floor(t*6)%3],g=p.h*this.metresPerPixel,M=ln((u-.55)/.45);if(u<1&&f.from){const m=(f.from.x+f.x)/2,v=(f.from.z+f.z)/2,_=Math.hypot(f.x-m,f.z-v)*1.6;h.push({x:m,z:v,radius:u*_,strength:1-ln((u-.8)/.2)})}if(M>0&&i(f.x,f.z,p.w*this.metresPerPixel,g)){const m=we(Math.round(f.x*10),Math.round(f.z*10),911)<.5;a.push({x:f.x,y:-(1-M)*g,z:f.z,frame:p,flip:m,fresh:s(f.x,f.z,g)})}u>=1&&c.push({x:f.x,y:g*.85,z:f.z,seed:Math.floor(Math.abs(f.x*7.3+f.z*13.1))%1e5,ready:f.at+r.transition});const x=.85+.15*Math.sin(t*8);M>0&&o.push({x:f.x,y:3,z:f.z,reach:r.lightReach,rgb:w3[f.variant%3],strength:r.lightStrength*x*M*(1+(1-u)*2)})}return{items:a,lights:o,sweeps:h,playing:c}}}const na=4;class E3{atlas;index=new Map;colour=new Map;height=new Map;constructor(e,t){const i=t.runeMarkers,s=[],r=[...new Set(vt.map(o=>o.creature))],a=[i.dormant.glow,...Array.from({length:na-1},(o,h)=>i.awake.glow[0]+(i.awake.glow[1]-i.awake.glow[0])*h/(na-2))];for(const o of r){const h=Tm(e,{glow:"cyan",sigil:o}),c=br(o);this.index.set(o,s.length),this.height.set(o,A3(h.A)),this.colour.set(o,new V(c[0]/255,c[1]/255,c[2]/255));for(const d of a)s.push(T3(h,c,d))}this.atlas=ea(s,2048)}frame(e,t){return(this.index.get(e)??0)+Math.max(0,Math.min(na-1,t))}}function A3(n){const e=n.getContext("2d").getImageData(0,0,n.width,n.height).data;let t=-1,i=-1;for(let s=3;s<e.length;s+=4)if(e[s]>0){const r=Math.floor((s>>2)/n.width);t<0&&(t=r),i=r}return t<0?0:i-t+1}function T3(n,e,t){const i=document.createElement("canvas");i.width=n.w,i.height=n.h;const s=i.getContext("2d");s.drawImage(n.A,0,0);const r=s.getImageData(0,0,n.w,n.h),a=r.data;for(let o=0;o<a.length;o+=4){if(a[o+3]!==254)continue;const h=Math.max(a[o],a[o+1],a[o+2])/255,c=Math.max(0,h-.75)*2.4;for(let d=0;d<3;d++)a[o+d]=Math.min(255,(e[d]*(1-c)+255*c)*h*t)}return s.putImageData(r,0,0),{...n,A:i}}const Od=`
attribute vec4 iBeam; // colour rgb, strength
varying vec4 vBeam;
varying float vY;
void main() {
  vBeam = iBeam;
  vY = position.y + 0.5;
  gl_Position = projectionMatrix * viewMatrix * modelMatrix * instanceMatrix * vec4(position, 1.0);
}
`,Nd=`
uniform float uShown;
varying vec4 vBeam;
varying float vY;
void main() {
  float a = vBeam.a * uShown * (1.0 - vY) * smoothstep(0.0, 0.08, vY);
  if (a < 0.003) discard;
  gl_FragColor = vec4(vBeam.rgb * a, 1.0);
}
`;class R3{constructor(e=64,t=600){this.maxBeams=e,this.maxMotes=t;const i=new Co(.5,.5,1,8,1,!0);this.beamAttr=new Gs(new Float32Array(e*4),4),i.setAttribute("iBeam",this.beamAttr),this.beams=new Xu(i,new xt({vertexShader:Od,fragmentShader:Nd,uniforms:{uShown:{value:0}},transparent:!0,depthWrite:!1,blending:Pi,side:ti}),e),this.beams.frustumCulled=!1,this.beams.renderOrder=9;const s=new Co(.5,.5,1,6,1,!0);this.laserAttr=new Gs(new Float32Array(e*4),4),s.setAttribute("iBeam",this.laserAttr),this.lasers=new Xu(s,new xt({vertexShader:Od,fragmentShader:Nd,uniforms:{uShown:{value:1}},transparent:!0,depthWrite:!1,blending:Pi,side:ti}),e),this.lasers.frustumCulled=!1,this.lasers.renderOrder=9,this.mPos=new Float32Array(t*3),this.mCol=new Float32Array(t*4);const r=new Qt;r.setAttribute("position",new Nn(this.mPos,3)),r.setAttribute("color",new Nn(this.mCol,4)),this.motes=new oa(r,new qf({size:3,sizeAttenuation:!1,vertexColors:!0,transparent:!0,depthWrite:!1,blending:Pi})),this.motes.frustumCulled=!1,this.group.add(this.beams,this.lasers,this.motes)}maxBeams;maxMotes;group=new Ds;beams;beamAttr;lasers;laserAttr;motes;mPos;mCol;m4=new kt;update(e,t,i,s,r=[]){const a=Math.min(this.maxBeams,r.length);for(let d=0;d<a;d++){const f=r[d];this.m4.makeScale(f.width,f.height,f.width).setPosition(f.x,f.height/2+(f.base??1.5),f.z),this.lasers.setMatrixAt(d,this.m4),this.laserAttr.setXYZW(d,f.colour.x,f.colour.y,f.colour.z,f.strength)}this.lasers.count=a,this.lasers.instanceMatrix.needsUpdate=!0,this.laserAttr.needsUpdate=!0;const o=Math.min(this.maxBeams,e.length);for(let d=0;d<o;d++){const f=e[d];this.m4.makeScale(1.2,t,1.2).setPosition(f.x,t/2+(f.base??0),f.z),this.beams.setMatrixAt(d,this.m4),this.beamAttr.setXYZW(d,f.colour.x,f.colour.y,f.colour.z,f.strength)}this.beams.count=o,this.beams.instanceMatrix.needsUpdate=!0,this.beamAttr.needsUpdate=!0,this.beams.material.uniforms.uShown.value=i;const h=Math.min(this.maxMotes,s.length);for(let d=0;d<h;d++){const f=s[d];this.mPos.set([f.x,f.y,f.z],d*3),this.mCol.set([f.colour.x,f.colour.y,f.colour.z,f.alpha],d*4)}const c=this.motes.geometry;c.setDrawRange(0,h),c.getAttribute("position").needsUpdate=!0,c.getAttribute("color").needsUpdate=!0}}function C3(n,e,t,i){const s=(a,o)=>Math.abs(a[0]-o[0])<1e-6&&Math.abs(a[1]-o[1])<1e-6;if(s(n,t)||s(n,i)||s(e,t)||s(e,i))return!1;const r=(a,o,h)=>Math.sign((o[0]-a[0])*(h[1]-a[1])-(o[1]-a[1])*(h[0]-a[0]));return r(n,e,t)*r(n,e,i)<0&&r(t,i,n)*r(t,i,e)<0}function L3(n,e,t){const i=n.tuning.stringLights,s=n.siteOf(t[0],t[1]),r=Ii(n.seed*53+t[0]*1031+t[1]*7+509),a=w=>{const A=n.areaAt(w.x,w.z).cell;return A[0]===t[0]&&A[1]===t[1]},o=w=>we(Math.round(w.x*10),Math.round(w.z*10),n.seed+501),h=e.treesNear(s.x,s.z,n.areaSize*1.3).filter(a).sort((w,A)=>o(w)-o(A)),c=new Map,d=new Set,f=[],u=[],p=Math.cos(i.coneAngle*Math.PI/180),g=(w,A=0)=>(c.get(w)??0)+1<=(d.has(w)?3:2)-A,M=(w,A)=>f.some(y=>C3([w.x,w.z],[A.x,A.z],[y.ax,y.az],[y.bx,y.bz])),x=(w,A)=>{f.push({ax:w.x,az:w.z,bx:A.x,bz:A.z,seed:Math.floor(we(Math.round(w.x*10),Math.round(A.z*10),n.seed+503)*1e6)}),c.set(w,(c.get(w)??0)+1),c.set(A,(c.get(A)??0)+1)},m=(w,A,y)=>{let S=w,b=A;const E=[w];for(let C=0;C<y&&g(S);C++){const T=[];for(const I of h){if(I===S||!g(I))continue;const k=I.x-S.x,U=I.z-S.z,W=Math.hypot(k,U);if(!(W<i.spanMin||W>i.spanMax)&&!(b&&(k*b[0]+U*b[1])/W<p)&&!M(S,I)&&(T.push({b:I,d:W}),T.length>=16))break}if(!T.length)break;T.sort((I,k)=>k.d-I.d);const{b:R,d:O}=T[Math.floor(r()*Math.min(4,T.length))];x(S,R),b=[(R.x-S.x)/O,(R.z-S.z)/O],E.push(R),S=R}return E},v=i.runsPerArea[0]+Math.floor(r()*(i.runsPerArea[1]-i.runsPerArea[0]+1)),_=[];for(const w of h){if(u.length>=v)break;if(c.has(w)||u.some(S=>Math.hypot(S.x-w.x,S.z-w.z)<i.spread))continue;u.push(w);const A=i.spansPerRun[0]+Math.floor(r()*(i.spansPerRun[1]-i.spansPerRun[0]+1)),y=m(w,null,A);for(let S=1;S<y.length-1;S++){if(r()>=i.junctionChance)continue;const b=y[S],E=y[S+1],C=E.x-b.x,T=E.z-b.z,R=Math.hypot(C,T),O=r()<.5?1:-1;d.add(b),_.push({from:b,heading:[-T/R*O,C/R*O]})}}for(const w of _)m(w.from,w.heading,i.spansPerRun[0]+Math.floor(r()*3));return f}function P3(n){return{value:n?new at(1,n.lightFloor,n.lightTint,n.lightRim):new at}}const D3=`
uniform vec4 uWitchLight; // on, floor, tint, rim
vec3 witchShade(vec3 base, vec3 N, vec3 F, vec3 P) {
  vec3 env = uAmb + uMoon * lightStep(max(0.0, dot(N, uMoonDir)));
  vec3 col = base * max(vec3(uWitchLight.y), env * 1.25);
  vec3 tint = vec3(0.0), rim = vec3(0.0);
  float edge = 1.0 - clamp(dot(N, F), 0.0, 1.0); // her outline's pixels face sideways
  for (int i = 0; i < ${Os}; i++) {
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
`,_t={uRight:{value:new V(1,0,0)},uUp:{value:new V(0,1,0)},uFacing:{value:new V(0,0,1)},uTopFade:{value:0},uCutout:{value:new at(0,0,0,1)},uDebugCull:{value:0},uRes:{value:new tt(1,1)},uWitch:{value:new at(0,0,0,0)},uWitchDepth:{value:0},uOcc:{value:new at(.38,6,2.5,1)},uParty:{value:Array.from({length:16},()=>new at)},uPartyCol:{value:Array.from({length:16},()=>new V)},uPartyCount:{value:0},uUplight:{value:new at},uTrunkFade:{value:new tt(0,.125)}},Gl=`
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
varying vec2 vLocal;
varying float vSizeY;
void main() {
  // Tall and nearer the camera than the witch: it may stand in front of her.
  // Eased over a few metres of depth and of height, so nothing snaps into the fade as she moves.
  vFront = smoothstep(0.0, 3.0, uWitchDepth - 0.5 + (viewMatrix * vec4(iPos, 1.0)).z) * smoothstep(uOcc.z * 0.7, uOcc.z * 1.3, iSize.y);
  vec3 w = iPos + uRight * (position.x * iSize.x) + uUp * (position.y * iSize.y);
  float u = iFlags.x > 0.5 ? 1.0 - uv.x : uv.x;
  vUv = vec2(mix(iUv.x, iUv.z, u), mix(iUv.w, iUv.y, uv.y));
  vFlags = iFlags;
  vLocal = uv;
  vSizeY = iSize.y;
  vWorld = w;
  gl_Position = projectionMatrix * viewMatrix * vec4(w, 1.0);
  // Snap the whole sprite by its base to the pixel grid, so it moves a whole pixel at a time and
  // its small bright details (flowers, eyes) don't shimmer in and out as the camera glides.
  vec4 b = projectionMatrix * viewMatrix * vec4(iPos, 1.0);
  vec2 ndc = b.xy / b.w, snapped = (floor((ndc * 0.5 + 0.5) * uRes) + 0.5) / uRes * 2.0 - 1.0;
  gl_Position.xy += (snapped - ndc) * gl_Position.w;
}
`,Hl=`
uniform sampler2D uAlbedo, uNormal;
uniform vec3 uRight, uUp, uFacing;
uniform float uTopFade, uUnlit;
uniform vec4 uCutout;
uniform float uDebugCull, uIsScenery, uAppear;
uniform vec4 uWitch, uOcc, uSilhouette;
uniform float uFadePass;
uniform float uFlat; // lies flat on the ground (a court's decal), or gameplay that stays solid: never cut away round her
uniform vec4 uParty[16];
uniform vec3 uPartyCol[16];
uniform int uPartyCount;
uniform vec4 uUplight;
varying vec2 vUv;
varying vec3 vWorld;
varying vec3 vFlags;
varying float vFront;
varying vec2 vLocal;
varying float vSizeY;
uniform vec2 uTrunkFade; // metres of trunk the fade covers, metres per art pixel
${Mi}
${D3}
// 4x4 ordered dither, for fading the canopy in pixel-art style.
float bayer(vec2 p) {
  int x = int(mod(p.x, 4.0)), y = int(mod(p.y, 4.0));
  int i = x + y * 4;
  int m[16] = int[16](0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5);
  return (float(m[i]) + 0.5) / 16.0;
}
void shade() {
  vec4 a = texture2D(uAlbedo, vUv);
  if (a.a < 0.5) discard;
  // The witch's see-through silhouette: where she is hidden, a flat tint in her glow colour.
  if (uSilhouette.a > 0.0) { gl_FragColor = vec4(uSilhouette.rgb, uSilhouette.a); return; }
  // Things standing in front of the witch fade (smoothly) where they cover her: left out of the
  // opaque pass there and drawn in a second, see-through pass after her.
  // A soft circle round her body, a little bigger than her sprite: fully see-through at the
  // centre, easing smoothly to opaque at the edge (uOcc.y: how far the edge reaches, a share of it).
  float e = length(gl_FragCoord.xy - uWitch.xy) / max(max(uWitch.z, uWitch.w) * 1.2, 1.0);
  float occl = uFlat > 0.5 ? 0.0 : uOcc.w * vFront * (1.0 - smoothstep(0.3, 1.0 + uOcc.y, e));
  if (uFadePass > 0.5 ? occl <= 0.001 : occl > 0.001) discard;
  float alpha = uFadePass > 0.5 ? mix(1.0, uOcc.x, occl) : 1.0;
  if (vFlags.y > 0.5) {
    // Crowns: hidden in a hole round the witch, which closes as she rises; its edge a smooth fade
    // (Ed: no dithering), or dithered steps with ?fx=pixel.
    float d = length(gl_FragCoord.xy - uCutout.xy);
    float shown = max(smoothstep(uCutout.z - uCutout.w, uCutout.z, d), uTopFade);
    if (uSmooth > 0.5) { if (shown < 0.004) discard; alpha *= shown; }
    else if (bayer(gl_FragCoord.xy) >= shown) discard;
  }
  if (vFlags.y < -0.001 && uTrunkFade.x > 0.0) {
    // A trunk cut from its crown (Ed, v149: "fade out instead of just stop"): where the crowns are
    // hidden, its top fades out over uTrunkFade.x metres in an ordered dither on the art's own
    // pixel grid; where the crowns show, it stays whole under them.
    float d = length(gl_FragCoord.xy - uCutout.xy);
    float crown = max(smoothstep(uCutout.z - uCutout.w, uCutout.z, d), uTopFade);
    float topY = 1.0 + vFlags.y, band = uTrunkFade.x / max(vSizeY, 0.01);
    float t = clamp((topY - vLocal.y) / band, 0.0, 1.0);
    vec2 artPx = vec2(floor(vUv.x * float(textureSize(uAlbedo, 0).x)), floor(vLocal.y * vSizeY / uTrunkFade.y));
    if (bayer(artPx) >= max(t, crown)) discard;
  }
  // Eye glints, flowers and magic glow: the generator marks them with alpha 254.
  if (uDebugCull > 0.5 && vFlags.z > 0.5) { gl_FragColor = vec4(1.0, 0.0, 0.0, alpha); return; }
  if (uUnlit > 0.5) { gl_FragColor = vec4(a.rgb, alpha); return; }
  if (a.a < 0.999) { gl_FragColor = vec4(haze(a.rgb, vWorld), alpha); return; }
  vec4 n = texture2D(uNormal, vUv);
  float nx = (n.r * 255.0 - 128.0) / 127.0, ny = (n.g * 255.0 - 128.0) / 127.0, nz = n.b;
  if (vFlags.x > 0.5) nx = -nx;
  vec3 N = normalize(uRight * nx - uUp * ny + uFacing * nz);
  if (uWitchLight.x > 0.5) { gl_FragColor = vec4(witchShade(a.rgb, N, uFacing, vWorld), alpha); return; }
  vec3 col = min(vec3(1.0), a.rgb * nightLight(N, vWorld) * 1.25);
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
  gl_FragColor = vec4(haze(min(vec3(1.0), col), vWorld), alpha);
}
void main() {
  shade();
  // Scenery past the budget's radius fades out smoothly (alpha), from the far edge inward.
  if (uIsScenery > 0.5) {
    float k = sceneryFade(vWorld) * uAppear; // and a set just drawn fades in
    if (k < 0.004) discard;
    gl_FragColor.a *= k;
  }
}
`;class jn{constructor(e,t,i={}){this.atlas=e,this.metresPerPixel=t;const s=new Zn(1,1);s.translate(0,.5,0),this.geo=new Oh,this.geo.index=s.index,this.geo.setAttribute("position",s.getAttribute("position")),this.geo.setAttribute("uv",s.getAttribute("uv")),this.pos=this.size=this.uvs=this.flags=void 0,this.grow(64);const r=h=>({...ct,..._t,uAlbedo:{value:e.albedo},uNormal:{value:e.normal},uUnlit:{value:i.unlit?1:0},uIsScenery:{value:i.scenery?1:0},uAppear:this.appearU,uFadePass:{value:0},uFlat:{value:i.flat||i.solid?1:0},uSilhouette:{value:new at(0,0,0,0)},uWitchLight:P3(i.witchLight),...h}),a=i.scenery?{blending:Uo,blendSrc:vh,blendDst:bh}:{},o=new xt({vertexShader:Gl,fragmentShader:Hl,uniforms:r({}),depthTest:!i.onTop,depthWrite:!i.onTop,...a});if(this.mesh=new Yt(this.geo,o),this.mesh.frustumCulled=!1,i.onTop&&(this.mesh.renderOrder=10),i.scenery&&(this.mesh.renderOrder=.5),this.meshes=[this.mesh],i.fade){const h=new Yt(this.geo,new xt({vertexShader:Gl,fragmentShader:Hl,uniforms:r({uFadePass:{value:1}}),transparent:!0,depthWrite:!1}));h.frustumCulled=!1,h.renderOrder=11,this.meshes.push(h)}if(i.silhouette){const h=i.silhouette.colour,c=new Yt(this.geo,new xt({vertexShader:Gl,fragmentShader:Hl,uniforms:r({uSilhouette:{value:new at(h.x,h.y,h.z,i.silhouette.opacity)}}),transparent:!0,depthWrite:!1,depthFunc:Mo}));c.frustumCulled=!1,c.renderOrder=12,this.meshes.push(c)}}atlas;metresPerPixel;mesh;meshes;geo;pos;size;uvs;flags;capacity=0;count=0;grow(e){const t=Math.max(e,this.capacity*2);this.geo.dispose();const i=(s,r)=>{const a=new Gs(new Float32Array(t*s),s);return a.setUsage(gr),r&&a.array.set(r.array),a};this.pos=i(3,this.pos),this.size=i(2,this.size),this.uvs=i(4,this.uvs),this.flags=i(3,this.flags),this.geo.setAttribute("iPos",this.pos),this.geo.setAttribute("iSize",this.size),this.geo.setAttribute("iUv",this.uvs),this.geo.setAttribute("iFlags",this.flags),this.capacity=t}appearU={value:1};items=[];set(e){this.items=e,e.length>this.capacity&&this.grow(e.length);const t=this.pos.array,i=this.size.array,s=this.uvs.array,r=this.flags.array;e.forEach((a,o)=>{t[o*3]=a.x,t[o*3+1]=a.y,t[o*3+2]=a.z;const h=a.scale??1;i[o*2]=a.frame.w*this.metresPerPixel*h,i[o*2+1]=a.frame.h*this.metresPerPixel*h,s.set(a.frame.uv,o*4),r[o*3]=a.flip?1:0,r[o*3+1]=a.top?1:a.cut?-a.cut:0,r[o*3+2]=a.fresh?1:0});for(const a of[this.pos,this.size,this.uvs,this.flags])a.needsUpdate=!0;this.count=e.length,this.geo.instanceCount=e.length;for(const a of this.meshes)a.visible=e.length>0}get dropped(){const e=this.geo._maxInstanceCount;return e===void 0||!this.mesh.visible?0:Math.max(0,this.count-e)}dispose(){this.geo.dispose(),this.mesh.material.dispose(),this.atlas.albedo.dispose(),this.atlas.normal.dispose()}}const I3=`
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
}`,O3=`
uniform float uTwinkle, uChase;
varying vec3 vColour;
varying vec3 vWorld;
varying float vOn;
varying vec2 vB;
${Mi}
void main() {
  if (vOn < 0.5 || sceneryFade(vWorld) < 0.5) discard; // scenery: gone past the scenery budget's edge
  float b = 1.0 - uTwinkle * 0.5 * (1.0 + sin(uTime * (1.3 + vB.x) + vB.x * 40.0));
  if (fract((vB.y - uTime * uChase) / 60.0) < 0.06) b = 1.4;  // a chase running along now and then
  gl_FragColor = vec4(haze(vColour * b * 1.6, vWorld), 1.0); // bright enough to bloom
}`,N3=`
attribute float aSway;
uniform float uWind, uTime;
varying vec3 vWorld;
void main() {
  vec3 p = position;
  p.x += sin(uTime * uWind + aSway * 6.0) * 0.18 * fract(aSway * 7.0);
  vWorld = p;
  gl_Position = projectionMatrix * viewMatrix * vec4(p, 1.0);
}`,F3=`
varying vec3 vWorld;
${Mi}
void main() {
  if (sceneryFade(vWorld) < 0.5) discard;
  gl_FragColor = vec4(haze(vec3(0.03, 0.025, 0.04), vWorld), 1.0);
}`,k3=`
attribute vec4 aMote; // phase, rise speed, drift, time it appears
uniform float uTime, uRise;
varying vec3 vWorld;
varying float vA;
void main() {
  float t = uTime + aMote.x * 20.0, y = mod(t * aMote.y + aMote.x * uRise, uRise), k = y / uRise;
  vec3 p = position + vec3(sin(t * 0.7 + aMote.x * 9.0) * aMote.z, y, cos(t * 0.5 + aMote.x * 5.0) * aMote.z);
  vWorld = p;
  vA = (uTime >= aMote.w ? 1.0 : 0.0) * smoothstep(0.0, 0.15, k) * (1.0 - smoothstep(0.7, 1.0, k));
  vec4 mv = viewMatrix * vec4(p, 1.0);
  gl_Position = projectionMatrix * mv;
  gl_PointSize = vA > 0.3 ? 1.0 : 0.0;
}`,U3=`
uniform vec3 uMoteColour;
varying float vA;
varying vec3 vWorld;
${Mi}
void main() {
  if (vA < 0.3) discard;
  gl_FragColor = vec4(haze(uMoteColour * (0.6 + 0.6 * vA), vWorld), 1.0);
}`;class B3{constructor(e,t){this.scene=e,this.game=t;const i=t.tuning.stringLights;this.palette=i.palette.map(r=>new ht(r));const s={...ct,uWind:{value:t.tuning.canopyShadow.wind*1.5}};this.bulbMat=new xt({vertexShader:I3,fragmentShader:O3,uniforms:{...s,uRes:_t.uRes,uNear:{value:240},uTwinkle:{value:i.twinkle},uChase:{value:i.chaseSpeed}}}),this.wireMat=new xt({vertexShader:N3,fragmentShader:F3,uniforms:s}),this.moteMat=new xt({vertexShader:k3,fragmentShader:U3,uniforms:{...ct,uMoteColour:{value:new ht(1,.85,1)},uRise:{value:t.tuning.party.motes.to-t.tuning.party.motes.from}},transparent:!0,depthWrite:!1,blending:Pi})}scene;game;built=new Map;palette;bulbMat;wireMat;moteMat;build(e,t,i,s,r){const a=this.game.tuning.stringLights,o=a.height,h=[],c=[],d=[],f=[],u=[];e.forEach((b,E)=>{const C=Math.hypot(b.bx-b.ax,b.bz-b.az),T=Math.max(2,Math.round(C/a.bulbSpacing)),R=O=>[b.ax+(b.bx-b.ax)*O,o-a.sag*4*O*(1-O)*(C/8),b.az+(b.bz-b.az)*O];for(let O=0;O<=16;O++){const I=R(O/16),k=R((O+1)/16);O<16&&(f.push(...I,...k),u.push(E+O/16,E+(O+1)/16))}for(let O=1;O<T;O++){const I=O/T,k=R(I),U=this.palette[(b.seed+O)%this.palette.length];h.push(...k),c.push(U.r,U.g,U.b),d.push((b.seed*13+O*7)%100/100,E*40+O,t(k[0],k[2])+O*.03,4*I*(1-I))}});const p=new Ds,g=new Qt;g.setAttribute("position",new St(h,3)),g.setAttribute("aColour",new St(c,3)),g.setAttribute("aBulb",new St(d,4));const M=new Qt;M.setAttribute("position",new St(f,3)),M.setAttribute("aSway",new St(u,1)),p.add(new Dh(M,this.wireMat),new oa(g,this.bulbMat));const x=this.game.tuning.party.motes,m=this.game.map,v=[],_=[],w=m.areaSize*1.1,A=Math.round(Math.PI*w*w/400*x.perPatch);for(let b=0;b<A;b++){const E=k=>{const U=Math.sin(s*12.9898+b*78.233+k*37.719)*43758.5453;return U-Math.floor(U)},C=E(1)*Math.PI*2,T=Math.sqrt(E(2))*w,R=i.x+Math.cos(C)*T,O=i.z+Math.sin(C)*T,I=m.areaAt(R,O).cell;I[0]!==r[0]||I[1]!==r[1]||(v.push(R,x.from,O),_.push(E(3),x.speed*(.6+E(4)*.8),.3+E(5)*.8,t(R,O)))}const y=new Qt;y.setAttribute("position",new St(v,3)),y.setAttribute("aMote",new St(_,4));const S=new oa(y,this.moteMat);return S.frustumCulled=!1,p.add(S),p.traverse(b=>{b.frustumCulled=!1}),p}update(){const e=this.game;if(!e.tuning.stringLights.on)return;this.bulbMat.depthTest=e.witch.lift<.5;let i=0;for(const[s,r]of e.party.areas){let a=this.built.get(s);if(!a){if(i++>=2)break;const o=L3(e.map,e.forest,r.cell),h=e.map.siteOf(r.cell[0],r.cell[1]),c=r.from?e.map.siteOf(r.from[0],r.from[1]):null,d=c?(c.x+h.x)/2:h.x,f=c?(c.z+h.z)/2:h.z,u=c?Math.hypot(h.x-d,h.z-f)*1.6:1,p=e.tuning.party.transition,g=(M,x)=>r.wave===0?-1:r.at+Math.min(1,Math.hypot(M-d,x-f)/u)*p;a={lines:o,group:this.build(o,g,h,r.cell[0]*131+r.cell[1]*17+e.seed,r.cell),on:r.wave===0?-1:r.at},this.scene.add(a.group),this.built.set(s,a)}}}clear(){for(const[,e]of this.built)this.scene.remove(e.group);this.built.clear()}}const an=32,lr=16,z3=`
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
}`,G3=`
uniform sampler2D uGlyphs;
varying vec2 vUv, vP;
varying vec4 vCol;
varying float vDraw;
varying vec3 vWorld;
${Mi}
void main() {
  float a = texture2D(uGlyphs, vUv).a * vCol.a;
  // Written on: revealed clockwise from the top as vDraw goes 0 to 1.
  float ang = fract(atan(vP.x, vP.y) / 6.2831853 + 1.0);
  if (ang > vDraw || a < 0.02) discard;
  gl_FragColor = vec4(haze(vCol.rgb * a, vWorld), 1.0);
}`;class Fd{mesh;geo=new Oh;cap=0;n=0;pos;size;uv;col;draw;constructor(e){const t=new Zn(1,1);this.geo.index=t.index,this.geo.setAttribute("position",t.getAttribute("position")),this.geo.setAttribute("uv",t.getAttribute("uv")),this.grow(256),this.mesh=new Yt(this.geo,e),this.mesh.frustumCulled=!1,this.mesh.renderOrder=3}grow(e){const t=(s,r)=>{const a=new Float32Array(e*r);return s&&a.set(s),a};this.pos=t(this.pos,3),this.size=t(this.size,1),this.uv=t(this.uv,4),this.col=t(this.col,4),this.draw=t(this.draw,1),this.cap=e,this.geo.dispose();const i=(s,r,a)=>this.geo.setAttribute(s,new Gs(r,a).setUsage(gr));i("iPos",this.pos,3),i("iSize",this.size,1),i("iUv",this.uv,4),i("iCol",this.col,4),i("iDraw",this.draw,1)}begin(){this.n=0}add(e,t,i,s,r,a,o,h,c,d=1){this.n>=this.cap&&this.grow(this.cap*2);const f=this.n++;this.pos.set([e,t,i],f*3),this.size[f]=s,this.uv.set(r,f*4),this.col.set([a,o,h,c],f*4),this.draw[f]=d}end(){this.geo.instanceCount=this.n;for(const e of["iPos","iSize","iUv","iCol","iDraw"])this.geo.getAttribute(e).needsUpdate=!0}}const H3=["🎉","🎈","💃","🎊","🥳","😛","🍉","🍒","🍷","🍸","🍹","🥂","🍺","😁","😆"],W3=[["😴","🫩","🥱","💼"],["😐","😐","🥱"],["😮","🤭","🫢","😛"],["🙂","🍷","🍺","😁"],["🥳","🎉","🎈","😆","🥂","💃"]];class V3{constructor(e,t){this.game=t,this.canvas.width=this.canvas.height=an*lr;const i=this.canvas.getContext("2d"),s=i.createRadialGradient(an/2,an/2,0,an/2,an/2,an/2);s.addColorStop(0,"rgba(255,255,255,1)"),s.addColorStop(.35,"rgba(255,255,255,.55)"),s.addColorStop(1,"rgba(255,255,255,0)"),i.fillStyle=s,i.fillRect(0,0,an,an),this.tex=new Ro(this.canvas),this.tex.magFilter=Ht,this.tex.minFilter=Ht,this.tex.generateMipmaps=!1;const r=a=>new xt({vertexShader:z3,fragmentShader:G3,uniforms:{...ct,uRight:_t.uRight,uUp:_t.uUp,uFlat:{value:a},uGlyphs:{value:this.tex}},transparent:!0,depthWrite:!1,blending:Pi});this.standing=new Fd(r(0)),this.flat=new Fd(r(1)),e.add(this.standing.mesh,this.flat.mesh)}game;canvas=document.createElement("canvas");tex;slots=new Map;colours=new Map;standing;flat;fizzles=[];bursts=[];chain=[];lastTime=0;bubbleWitch=document.getElementById("bubble-witch");bubbleCreature=document.getElementById("bubble-creature");v=new V;slotOf(e,t=0){const i=`${e}:${t}`;let s=this.slots.get(i);if(s!==void 0)return s;s=this.slots.size+1,this.slots.set(i,s);const r=this.canvas.getContext("2d"),a=s%lr*an,o=Math.floor(s/lr)*an;r.clearRect(a,o,an,an),Wp(r,e,{x:a+1,y:o+1,size:an-2,level:t,colour:[255,255,255],glow:!1});const h=r.getImageData(a,o,an,an);for(let d=3;d<h.data.length;d+=4)h.data[d]=h.data[d]>90?255:0;r.putImageData(h,a,o);const c=br(e);return this.colours.set(e,new ht(c[0]/255,c[1]/255,c[2]/255)),this.tex.needsUpdate=!0,s}uv(e){const t=an*lr,i=e%lr*an,s=Math.floor(e/lr)*an;return[i/t,1-s/t,(i+an)/t,1-(s+an)/t]}update(e,t,i,s,r){const a=this.game,o=a.leash,h=a.tuning,c=a.witch,d=h.bond,f=h.leash,u=this.uv(0);this.standing.begin(),this.flat.begin();for(const y of o.events)y.kind==="fizzled"&&this.fizzles.push({x:y.x,z:y.z,at:e}),y.kind==="invited"&&this.bursts.push({x:y.x,z:y.z,at:e,seed:y.id});this.fizzles=this.fizzles.filter(y=>e-y.at<.7),this.bursts=this.bursts.filter(y=>e-y.at<.9);for(const y of this.bursts){const S=(e-y.at)/.9;for(let b=0;b<28;b++){const E=we(y.seed,b,3)*Math.PI*2,C=2+we(y.seed,b,5)*3,T=2+we(y.seed,b,7)*3,R=[[1,.4,.8],[.3,.95,1],[1,.9,.3],[.6,1,.4],[1,1,1]][b%5];this.standing.add(y.x+Math.cos(E)*C*S,.6+T*S-4*S*S,y.z+Math.sin(E)*C*S,.3,u,R[0],R[1],R[2],1-S)}}const p=(y,S,b)=>{const E=a.creatures[y],C=28,T=b?1:.45;for(let R=0;R<C;R++){const O=Math.PI/2-R/C*Math.PI*2,I=R/C<S;!b&&!I||this.flat.add(E.x+Math.cos(O)*1.5,0,E.z+Math.sin(O)*1.1,.35,u,1,I?.6:.9,I?.9:1,(I?.9:.18)*T)}};o.talk&&p(o.talk.id,o.talk.refused?0:Math.min(1,o.talk.t/o.talk.total),!0);for(const[y,S]of o.progress)o.talk?.id!==y&&p(y,Math.min(1,S/df(a.creatures[y],h)),!1);const g=h.stack,M=Math.min(.1,Math.max(0,e-this.lastTime)),x=new Map;for(this.lastTime=e;this.chain.length<o.stack.length;)this.chain.push({x:0,z:0,vx:0,vz:0});let m={x:0,z:0},v=r;for(let y=o.stack.length-1;y>=0;y--){const S=o.stack[y],b=a.creatures[S],E=o.stack.length-1-y,C=this.chain[E],T=(2+b.level*.4)*g.scale,R=Math.sin(e*1.7+E*.9)*g.idleSway*(1+E*.5),O=m.x-c.vx*g.trail+R,I=m.z-c.vz*g.trail;C.vx+=((O-C.x)*g.stiffness-C.vx*g.damping)*M,C.vz+=((I-C.z)*g.stiffness-C.vz*g.damping)*M,C.x+=C.vx*M,C.z+=C.vz*M,m=C,v+=(E===0?g.offset*T:g.gap*T)+T/2;const k=new V(c.x+C.x,v,c.z+C.z);v+=T/2,x.set(S,k);const U=(this.slotOf(b.species,b.level),this.colours.get(b.species));this.standing.add(k.x,k.y,k.z,T,this.uv(this.slotOf(b.species,b.level)),U.r,U.g,U.b,1)}for(const y of o.placed){const S=a.creatures[y.id],b=this.slotOf(S.species,S.level),E=this.colours.get(S.species),C=.8+.2*Math.sin(e*2+y.id);this.flat.add(y.x,0,y.z,3+S.level*.8,this.uv(b),E.r*C,E.g*C,E.b*C,1,Math.min(1,(e-y.at)/.8)),this.flat.add(y.x,0,y.z,5,u,E.r,E.g,E.b,.25)}const _=h.sigilProjection,w=c.lift*c.lift*(3-2*c.lift);if(w>.01)for(const y of o.placed){const S=a.creatures[y.id],b=this.colours.get(S.species),E=h.treetopHeight-4+_.height,C=.85+.15*Math.sin(e*1.3+y.id);this.flat.add(y.x,E,y.z,(3+S.level*.8)*_.size,this.uv(this.slotOf(S.species,S.level)),b.r,b.g,b.b,_.opacity*w*C);for(let T=1;T<E;T+=1.5)this.standing.add(y.x,T,y.z,.3,u,b.r,b.g,b.b,_.beam*w*C*(.6+.4*Math.sin(T*.8-e*3)))}if(c.mode==="ground"&&o.stack.length&&!o.placed.some(y=>Math.hypot(y.x-c.x,y.z-c.z)<=f.pickRadius)){const y=a.creatures[o.stack[o.stack.length-1]],S=this.colours.get(y.species),b=ff(o,c.x,c.z,h);this.flat.add(c.x,0,c.z,3+y.level*.8,this.uv(this.slotOf(y.species,y.level)),b?1:S.r,b?.1:S.g,b?.1:S.b,.22)}for(const y of this.fizzles){const S=1-(e-y.at)/.7;this.flat.add(y.x,0,y.z,3*(1+(1-S)*.6),u,1,.15,.1,S)}const A=[...o.stack,...o.placed.map(y=>y.id)];for(const y of A){const S=a.creatures[y],b=this.colours.get(S.species);if(!b)continue;const E=Sg(o,y,c.x,c.z);d.rim&&this.flat.add(S.x,0,S.z,1.8,u,b.r,b.g,b.b,.35);const C=x.get(y)??new V(E.x,.2,E.z);if(d.sparks){const R=Math.max(.5,d.sparkEvery),O=(e+y*.618%1*R)%R;if(O<.7){const I=1-O/.7;this.standing.add(C.x+(S.x-C.x)*I,C.y+(.6-C.y)*I+Math.sin(I*Math.PI)*1.2,C.z+(S.z-C.z)*I,.35,u,b.r,b.g,b.b,1)}}const T=Math.hypot(S.x-E.x,S.z-E.z);if(d.thread&&T>f.length*.85){const R=Math.min(1,(T-f.length*.85)/f.length),O=Math.min(60,Math.floor(T/1.2)),I=Math.min(d.threadArcMax,d.threadArc*T);for(let k=1;k<O;k++){const U=(k+1-e*2%1)/O;U>=1||this.standing.add(C.x+(S.x-C.x)*U,C.y+(.5-C.y)*U+Math.sin(U*Math.PI)*I,C.z+(S.z-C.z)*U,.22,u,b.r,b.g,b.b,.25+.75*R)}}}this.standing.end(),this.flat.end(),this.bubbles(e,t,i,s)}emoji(e,t){if(e.dataset.e===t)return;e.dataset.e=t;const i=this.game.tuning.bubbles,s=i.emojiPixels,r=this.game.tuning.pixelSize*i.scale,a=document.createElement("canvas");a.width=a.height=s,a.style.width=a.style.height=`${s*r}px`;const o=a.getContext("2d");if(o){o.font=`${s-1}px sans-serif`,o.textAlign="center",o.textBaseline="middle",o.fillText(t,s/2,s/2+.5);const h=o.getImageData(0,0,s,s);for(let c=3;c<h.data.length;c+=4)h.data[c]=h.data[c]<110?0:255;o.putImageData(h,0,0)}e.replaceChildren(a)}say(e,t){e.dataset.e!==t&&(e.dataset.e=t,e.textContent=t)}bubbles(e,t,i,s){const r=this.game,a=r.leash.talk,o=this.bubbleWitch,h=this.bubbleCreature;if(!o||!h)return;const c=r.witch,d=(_,w,A,y)=>{this.v.set(w,A,y).project(t),_.style.left=`${(this.v.x+1)/2*i}px`,_.style.top=`${(1-this.v.y)/2*s}px`},f=h.querySelector("span"),u=h.querySelector(".bar");if(!a){u.style.display="none",h.classList.remove("on"),o.classList.toggle("on",r.leash.held),r.leash.held&&(this.say(o,r.leash.heldInAir?"land to talk":"…"),d(o,c.x-1.2,yr(c,r.tuning)+2.2,c.z));return}const p=r.creatures[a.id];if(d(o,c.x-1.2,yr(c,r.tuning)+2.2,c.z),d(h,p.x,1.2+p.level*.8,p.z),a.refused){o.classList.remove("on"),this.emoji(f,we(a.id,1,9)<.5?"😒":"🙄"),u.style.display="none",h.classList.toggle("on",a.t<1.6),h.style.opacity="1";return}u.style.display="";const g=Math.floor(a.t/wg(p,r.tuning)),M=Math.min(1,a.t/a.total),x=(_,w)=>_[Math.floor(we(a.id,w,5)*_.length)%_.length],m=[4,2,0][Math.min(2,p.level)],v=Math.round(m+(4-m)*M);this.emoji(o,x(H3,g-g%2)),o.classList.toggle("on",g%2===0),g>=1?this.emoji(f,x(W3[v],g-(g+1)%2)):this.say(f,"…"),u.querySelector("i").style.width=`${M*100}%`,h.classList.add("on"),h.style.opacity=g%2===1?"1":"0.6"}}const Y3=[1,3,5,7,9],m0=n=>{const e=60/Math.max(1,n.beat.bpm);return{beat:e,bar:e*4}};function X3(n,e,t,i){const s=i.lasers,{beat:r,bar:a}=m0(i),o=a*Math.max(1,s.blockBars),h=Math.floor(n/o),c=n-h*o,d=Dn(s.duty*t,0,1),u=we(e,h,311)<d?ln(c/Math.max(.001,s.fadeIn))*ln((o-c)/Math.max(.001,s.fadeOut)):0,p=Math.floor(c/a),g=Y3.filter(w=>w<=s.maxCount),M=g[Math.floor(we(e,h*64+p,313)*g.length)%g.length]??1,x=e%97*.37,m=Math.sin(2*Math.PI*n/(r*s.sweepBeats)+x)*(s.sweep*Math.PI)/180,v=.55+.45*Math.sin(2*Math.PI*n/(a*s.openBars)+x*2),_=((e%1e3*.0137+n/(a*8))%1+1)%1;return{on:u,count:M,sweep:m,open:v,hue:_}}const K3=`
attribute vec4 aCol; // rgb, alpha
attribute float aU;  // 0 at the source, 1 at the far end
varying vec4 vCol;
varying float vU;
void main() { vCol = aCol; vU = aU; gl_Position = projectionMatrix * viewMatrix * vec4(position, 1.0); }`,q3=`
varying vec4 vCol;
varying float vU;
void main() { float a = vCol.a * pow(1.0 - vU, 0.6); gl_FragColor = vec4(vCol.rgb * a, 1.0); }`,Zr=[[.3,.95,1],[.35,.55,1],[.7,.4,1],[1,.3,.85],[.45,1,.55]],$3=n=>{const e=(n%1+1)%1*Zr.length,t=Math.floor(e),i=e-t,s=Zr[t%Zr.length],r=Zr[(t+1)%Zr.length];return[s[0]+(r[0]-s[0])*i,s[1]+(r[1]-s[1])*i,s[2]+(r[2]-s[2])*i]};class Z3{constructor(e,t){this.game=t,this.mesh=new Dh(this.geo,new xt({vertexShader:K3,fragmentShader:q3,transparent:!0,depthWrite:!1,blending:Pi})),this.mesh.frustumCulled=!1,e.add(this.mesh)}game;geo=new Qt;pos=new Float32Array(0);col=new Float32Array(0);u=new Float32Array(0);mesh;update(e,t,i,s){const r=this.game.tuning,a=r.lasers,{bar:o}=m0(r),h=o*a.blockBars,c=[],d=[],f=[];if(a.on)for(const u of t){const p=1-Math.min(1,Math.max(0,(Math.hypot(u.x-i,u.z-s)-a.fadeNear)/Math.max(1,a.fadeFar-a.fadeNear)));if(p<=0)continue;const g=X3(e,u.seed,1,r),M=e-u.ready,x=M>=0&&M<h?Math.min(1,M/a.fadeIn)*Math.min(1,(h-M)/a.fadeOut):0,m=Math.max(g.on,x),v=x>g.on?a.maxCount:g.count;if(m<=.01)continue;const _=a.spread*Math.PI/180*g.open;for(let w=0;w<v;w++){const A=v===1?0:w/(v-1)-.5,y=a.maxTilt*Math.PI/180,S=Math.max(-y,Math.min(y,A*_+g.sweep)),b=Math.sin(S),E=Math.cos(S),C=-.15*Math.cos(S*3+u.seed),T=$3(g.hue+w*.07),R=a.opacity*m*p;c.push(u.x,u.y,u.z,u.x+b*a.length,u.y+E*a.length,u.z+C*a.length),d.push(...T,R,...T,R),f.push(0,1)}}if(c.length>this.pos.length&&(this.pos=new Float32Array(c.length*2),this.col=new Float32Array(d.length*2),this.u=new Float32Array(f.length*2),this.geo.setAttribute("position",new Nn(this.pos,3).setUsage(gr)),this.geo.setAttribute("aCol",new Nn(this.col,4).setUsage(gr)),this.geo.setAttribute("aU",new Nn(this.u,1).setUsage(gr))),!!this.geo.getAttribute("position")){this.pos.set(c),this.col.set(d),this.u.set(f);for(const u of["position","aCol","aU"])this.geo.getAttribute(u).needsUpdate=!0;this.geo.setDrawRange(0,c.length/3)}}}function*J3(n,e,t,i){const s=n.siteOf(e[0],e[1]),r=n.areaSize*1.5,a=Math.max(t*2,8),o=n.bounds,h=(m,v)=>{if(m<o.minX||m>o.maxX||v<o.minZ||v>o.maxZ)return"edge";const _=n.areaAt(m,v).cell;return`${_[0]},${_[1]}`},c=`${e[0]},${e[1]}`,d=Math.ceil(2*r/a),f=s.x-r,u=s.z-r,p=[];for(let m=0;m<=d;m++){for(let v=0;v<=d;v++)p.push(h(f+v*a,u+m*a));yield}const g=new Set,M=Math.max(1,Math.round(a/t)),x=a/M;for(let m=0;m<d;m++,yield)for(let v=0;v<d;v++){const _=[p[m*(d+1)+v],p[m*(d+1)+v+1],p[(m+1)*(d+1)+v],p[(m+1)*(d+1)+v+1]];if(!_.includes(c)||_.every(A=>A===c))continue;const w=[];for(let A=0;A<=M;A++)for(let y=0;y<=M;y++)w.push(h(f+v*a+y*x,u+m*a+A*x));for(let A=0;A<=M;A++)for(let y=0;y<=M;y++){const S=w[A*(M+1)+y],b=f+v*a+y*x,E=u+m*a+A*x;for(const[C,T]of[[1,0],[0,1]]){if(y+C>M||A+T>M)continue;const R=w[(A+T)*(M+1)+y+C];if(S===R||S!==c&&R!==c)continue;const O=b+C*x*.5,I=E+T*x*.5,k=`${Math.round(O*4)},${Math.round(I*4)}`;g.has(k)||(g.add(k),i.push({x:O,z:I,other:S===c?R:S}))}}}}const Q3=`
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
}`,j3=`
uniform float uBright;
varying vec3 vColour;
varying vec3 vWorld;
varying float vB;
${Mi}
void main() { gl_FragColor = vec4(haze(vColour * vB * uBright, vWorld), 1.0); }`;class eS{constructor(e,t){this.game=t;const i=t.tuning.borders;this.mesh=new oa(this.geo,new xt({vertexShader:Q3,fragmentShader:j3,uniforms:{...ct,uWidth:{value:i.width},uSparkle:{value:i.sparkle},uBright:{value:i.brightness}},transparent:!0,depthWrite:!1,blending:Pi})),this.mesh.frustumCulled=!1,e.add(this.mesh)}game;areas=new Map;jobs=[];geo=new Qt;stamp="";mesh;update(){const e=this.game,t=e.tuning.borders;if(!t.on){this.mesh.visible=!1;return}for(const[h,c]of e.party.areas){if(this.areas.has(h))continue;const d=e.map.siteOf(c.cell[0],c.cell[1]),f=c.from?e.map.siteOf(c.from[0],c.from[1]):null,u=f?(f.x+d.x)/2:d.x,p=f?(f.z+d.z)/2:d.z,g=e.map.areaSize*1.6,M=e.tuning.party.transition,x=br(vt[e.map.typeOf(c.cell[0],c.cell[1])].creature),m={points:[],colour:new ht(x[0]/255,x[1]/255,x[2]/255),on:(v,_)=>c.wave===0?-1:c.at+Math.min(1,Math.hypot(v-u,_-p)/g)*M,done:!1};this.areas.set(h,m),this.jobs.push({key:h,gen:J3(e.map,c.cell,t.step,m.points)})}const i=performance.now()+3;for(;this.jobs.length&&performance.now()<i;){const h=this.jobs[0];h.gen.next().done&&(this.areas.get(h.key).done=!0,this.jobs.shift())}const s=`${e.party.areas.size}|${[...this.areas.values()].filter(h=>h.done).length}`;if(s===this.stamp)return;this.stamp=s;const r=[],a=[],o=[];for(const[,h]of this.areas)if(h.done)for(const c of h.points)c.other!=="edge"&&e.party.areas.has(c.other)||(r.push(c.x,.15,c.z),a.push(h.colour.r,h.colour.g,h.colour.b),o.push(((c.x*12.9898+c.z*78.233)%1+1)%1,h.on(c.x,c.z)));this.geo.setAttribute("position",new St(r,3)),this.geo.setAttribute("aColour",new St(a,3)),this.geo.setAttribute("aSpark",new St(o,2))}}const Gt=40,dr=4;function g0(n,e,t,i,s,r){const a=n.set(s,1,r).project(e),o=Math.max(Math.abs(a.x),Math.abs(a.y)),h=a.z<1?Math.min(1,Math.max(0,(o-.9)/.25)):1;let c=a.x,d=a.y;a.z>=1&&(c=-c,d=-d);const f=1/Math.max(Math.abs(c)/.84,Math.abs(d)/.76,1e-6);return{show:h,sx:(c*f+1)/2*t,sy:(1-d*f)/2*i,angle:Math.atan2(-d,c)}}class x0{canvas=document.createElement("canvas");label=document.createElement("div");g;img;constructor(e){this.canvas.width=this.canvas.height=Gt,Object.assign(this.canvas.style,{position:"fixed",width:`${Gt*dr}px`,height:`${Gt*dr}px`,imageRendering:"pixelated",pointerEvents:"none",zIndex:"2",display:"none"}),Object.assign(this.label.style,{position:"fixed",pointerEvents:"none",zIndex:"2",display:"none",font:"bold 12px monospace",color:"#fff",textShadow:"0 1px 0 #000, 1px 0 0 #000",transform:"translate(-50%, 0)"}),e.append(this.canvas,this.label),this.g=this.canvas.getContext("2d"),this.img=this.g.createImageData(Gt,Gt)}hide(){this.canvas.style.display="none",this.label.style.display="none"}place(e,t){this.canvas.style.display="block",this.canvas.style.left=`${e-Gt*dr/2}px`,this.canvas.style.top=`${t-Gt*dr/2}px`}clear(){this.img.data.fill(0)}dot(e,t,i,s){if(e=Math.round(e),t=Math.round(t),e<0||t<0||e>=Gt||t>=Gt||s<=.02)return;const r=(t*Gt+e)*4;this.img.data[r+3]>=s*255||this.img.data.set([i[0],i[1],i[2],Math.round(Math.min(1,s)*255)],r)}flush(){this.g.putImageData(this.img,0,0)}}const tS=[[255,111,207],[95,232,255],[255,226,92]];class nS{cue;v=new V;constructor(e){this.cue=new x0(e)}update(e,t,i,s,r,a,o,h,c,d){const f=g0(this.v,e,t,i,s,r),u=this.cue;if(f.show<=.01){u.hide();return}const p=Math.hypot(s-a,r-o),g=Math.max(.35,Math.min(1,1-p/900));u.place(f.sx,f.sy),u.clear();const M=h*c/60,x=M-Math.floor(M),m=Math.cos(-f.angle),v=Math.sin(-f.angle);for(let _=0;_<Gt;_++)for(let w=0;w<Gt;w++){const A=(w-Gt/2+.5)*m-(_-Gt/2+.5)*v,y=(w-Gt/2+.5)*v+(_-Gt/2+.5)*m,S=A-11,b=Math.hypot(S,y);if(!(Math.abs(Math.atan2(y,-S))>.75))for(let C=0;C<3;C++){const T=(4+C*4+x*4)*(.75+.25*g);Math.abs(b-T)<.62&&u.dot(w,_,tS[C],f.show*g*(1-(C+x)/3.2))}}u.flush(),u.label.style.display=d?"block":"none",d&&(u.label.textContent=`${Math.round(p)} m`,u.label.style.left=`${f.sx}px`,u.label.style.top=`${f.sy+Gt*dr/2-18}px`)}}const iS=["  ####   "," ######  "," ####### ","#########","####r####","###rrr###","####r####","###r#r###","#########","#########","#########"," ####### ","#########","#########"];class sS{cue;v=new V;constructor(e){this.cue=new x0(e)}update(e,t,i,s,r,a,o,h,c){const d=this.cue;if(!s){d.hide();return}const f=g0(this.v,e,t,i,s.x,s.z);if(f.show<=.01){d.hide();return}d.place(f.sx,f.sy),d.clear();const u=o*h/60,p=Math.pow(.5+.5*Math.cos(u%1*Math.PI*2),2)*(.5+.5*c),g=[s.colour.x*255,s.colour.y*255,s.colour.z*255],M=[150,150,165],x=Gt/2-4,m=Gt/2-8;iS.forEach((v,_)=>[...v].forEach((w,A)=>{w==="#"?d.dot(x+A,m+_,M,f.show*.95):w==="r"&&d.dot(x+A,m+_,g.map(y=>Math.min(255,y*(.7+.6*p))),f.show)}));for(let v=0;v<Gt;v++)for(let _=0;_<Gt;_++){const w=Math.hypot(_-Gt/2+.5,v-Gt/2+.5),A=11+p*3;Math.abs(w-A)<.6&&d.dot(_,v,g,f.show*(.45+.55*p))}for(let v=0;v<4;v++)for(let _=-v;_<=v;_++){const w=17-v,A=Gt/2+Math.cos(f.angle)*w-Math.sin(f.angle)*_,y=Gt/2-Math.sin(f.angle)*w-Math.cos(f.angle)*_;d.dot(A,y,g,f.show)}d.flush(),d.label.style.display="block",d.label.textContent=`${Math.round(Math.hypot(s.x-r,s.z-a))} m`,d.label.style.color=`rgb(${g.map(Math.round).join(",")})`,d.label.style.left=`${f.sx}px`,d.label.style.top=`${f.sy+Gt*dr/2-22}px`}}class rS{constructor(e,t){this.map=t;const i=t.n,s=Math.max(4,Math.floor(220/i));this.canvas.width=this.canvas.height=i*s,Object.assign(this.canvas.style,{position:"fixed",left:"12px",bottom:"48px",imageRendering:"pixelated",border:"1px solid #3a2f5c",background:"rgba(8,6,18,.85)",zIndex:"3",display:"none",pointerEvents:"none"}),e.appendChild(this.canvas),this.g=this.canvas.getContext("2d")}map;on=!1;canvas=document.createElement("canvas");g;key="";update(e,t,i){if(this.canvas.style.display=this.on?"block":"none",!this.on)return;const s=this.map,r=s.n,a=this.canvas.width/r,o=`${e.wave}|${e.areas.size}|${Math.round(t/20)},${Math.round(i/20)}`;if(o===this.key)return;this.key=o;const h=[];fh(e,s,void 0,h);const c=this.g,d=new Set(h.map(p=>`${p[0]},${p[1]}`)),f=e.next?`${e.next[0]},${e.next[1]}`:"";c.clearRect(0,0,r*a,r*a);for(let p=0;p<r;p++)for(let g=0;g<r;g++){const M=`${g},${p}`,x=e.areas.get(M);c.fillStyle=M===`${s.centreCell[0]},${s.centreCell[1]}`?"#ff6fcf":x?`hsl(${300-Math.min(200,x.wave*12)},80%,55%)`:M===f?"#ffe25c":d.has(M)?"#6a5a20":"#1d1830",c.fillRect(g*a+.5,p*a+.5,a-1,a-1)}const u=s.areaSize;c.fillStyle="#fff",c.fillRect(Math.floor(t/u*a)-1,Math.floor(i/u*a)-1,3,3)}}class aS{canvas=document.createElement("canvas");g;v=new V;d=new V;on=!1;constructor(e){Object.assign(this.canvas.style,{position:"fixed",left:"0",top:"0",pointerEvents:"none",zIndex:"3",display:"none"}),e.appendChild(this.canvas),this.g=this.canvas.getContext("2d")}ground(e,t,i){const s=e.position;return this.d.set(t,i,.5).unproject(e).sub(s),this.d.y>=-1e-6?null:s.clone().addScaledVector(this.d,-s.y/this.d.y)}update(e,t,i,s,r){if(this.canvas.style.display=this.on?"block":"none",!this.on)return;(this.canvas.width!==t||this.canvas.height!==i)&&(this.canvas.width=t,this.canvas.height=i);const a=this.g,o=(T,R)=>{const O=this.v.set(T,0,R).project(e);return[(O.x+1)/2*t,(1-O.y)/2*i,O.z]};a.clearRect(0,0,t,i);const h=(T,R,O,I,k)=>{a.strokeStyle="rgba(0,0,0,0.6)",a.lineWidth=3,a.beginPath(),a.moveTo(T,R),a.lineTo(O,I),a.stroke(),a.strokeStyle=`rgba(255,255,255,${k})`,a.lineWidth=1,a.beginPath(),a.moveTo(T,R),a.lineTo(O,I),a.stroke()},c=(T,R,O,I)=>{a.font="10px ui-monospace, monospace",a.textAlign=I,a.textBaseline="middle",a.fillStyle="rgba(0,0,0,0.8)",a.fillText(T,R+1,O+1),a.fillStyle="rgba(255,255,255,0.85)",a.fillText(T,R,O)},d=this.ground(e,0,-.98),f=this.ground(e,0,.98)??this.ground(e,0,.3);if(!d||!f)return;const u=this.ground(e,-1,-1),p=this.ground(e,1,-1),g=this.ground(e,-1,.98)??u,M=this.ground(e,1,.98)??p,x=Math.min(u.x,g.x),m=Math.max(p.x,M.x),v=Math.min(f.z,g.z),_=d.z;for(let T=Math.ceil(x/10)*10;T<=m;T+=10){const R=o(T,v),O=o(T,_);h(R[0],R[1],O[0],O[1],T%50===0?.28:.1)}for(let T=Math.ceil(v/10)*10;T<=_;T+=10){const R=o(x,T),O=o(m,T);h(R[0],R[1],O[0],O[1],T%50===0?.28:.1)}const w=i-6;h(0,w,t,w,.6);for(let T=Math.ceil((u.x-s)/2)*2;s+T<=p.x;T+=2){const R=o(s+T,d.z)[0],O=T%10===0;h(R,w,R,w-(O?10:5),.6),O&&c(`${T}`,R,w-18,"center")}const A=6;h(A,0,A,i,.6);for(let T=Math.ceil((r-d.z)/2)*2;r-T>=f.z-1e-6&&T<400;T+=2){const R=o(s,r-T)[1],O=T%10===0;R<0||R>i||(h(A,R,A+(O?10:5),R,.6),O&&c(`${T}`,A+14,R,"left"))}const y=o(s,r),S=this.ground(e,-1,1-y[1]/i*2),b=this.ground(e,1,1-y[1]/i*2),E=S&&b?Math.round(b.x-S.x):0,C=Math.round(e.position.y);c(`camera ${C} m up · ${E} m across at the witch`,t-12,i-24,"right")}}const oS=`
varying vec3 vWorld;
void main() {
  vec4 w = modelMatrix * vec4(position, 1.0);
  vWorld = w.xyz;
  gl_Position = projectionMatrix * viewMatrix * w;
}`,lS=`
uniform float uStrength, uWind, uPixel;
uniform sampler2D uDepth; uniform vec2 uLow;
varying vec3 vWorld;
${Mi}
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
}`;class cS{constructor(e,t,i,s,r,a,o){this.height=t,this.mat=new xt({vertexShader:oS,fragmentShader:lS,uniforms:{...ct,uStrength:{value:e},uWind:{value:i},uPixel:{value:s},uDepth:{value:a},uLow:{value:o}},depthWrite:!1,depthTest:!r,blending:r?Li:mr}),this.mesh=new Yt(new Zn(700,700).rotateX(-Math.PI/2),this.mat),this.mesh.frustumCulled=!1,this.mesh.renderOrder=2}height;mesh;mat;follow(e,t){this.mesh.position.set(e,this.height,t-150)}}const hS=`
attribute vec4 iShadow; // x, z, width, depth (metres); a negative width marks scenery's
varying vec2 vLocal;
varying vec3 vWorld;
varying float vScenery;
void main() {
  vLocal = position.xz * 2.0;
  vScenery = iShadow.z < 0.0 ? 1.0 : 0.0;
  vec3 w = vec3(iShadow.x + position.x * abs(iShadow.z), 0.03, iShadow.y + position.z * iShadow.w);
  vWorld = w;
  gl_Position = projectionMatrix * viewMatrix * vec4(w, 1.0);
}`,uS=`
uniform float uStrength;
varying vec2 vLocal;
varying vec3 vWorld;
varying float vScenery;
${Mi}
float bayer(vec2 p) {
  int i = int(mod(p.x, 4.0)) + int(mod(p.y, 4.0)) * 4;
  int m[16] = int[16](0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5);
  return (float(m[i]) + 0.5) / 16.0;
}
void main() {
  float r = dot(vLocal, vLocal);
  if (r > 1.0) discard;
  float a = uStrength * (1.0 - r * r) * (vScenery > 0.5 ? sceneryFade(vWorld) : 1.0); // fading with its scenery
  if (uSmooth > 0.5) {
    float h = smoothstep(uHazeRange.x, uHazeRange.y, length(vWorld.xz - uHazeCentre));
    gl_FragColor = vec4(mix(vec3(1.0 - a * (1.0 - r)), vec3(1.0), h * h), 1.0); // multiplied over the ground
    return;
  }
  if (bayer(gl_FragCoord.xy) >= a) discard;
  gl_FragColor = vec4(haze(uHazeColour * 0.25, vWorld), 1.0);
}`;class dS{mesh;geo=new Oh;attr;capacity=0;constructor(e,t=!0){const i=new Zn(1,1).rotateX(-Math.PI/2);this.geo.index=i.index,this.geo.setAttribute("position",i.getAttribute("position")),this.attr=this.grow(1024);const s=new xt({vertexShader:hS,fragmentShader:uS,uniforms:{...ct,uStrength:{value:e}},depthWrite:!1,...t?{transparent:!0,blending:Uo,blendSrc:xh,blendDst:Mh}:{}});this.mesh=new Yt(this.geo,s),this.mesh.frustumCulled=!1,this.mesh.renderOrder=1}grow(e){return this.capacity=Math.max(e,this.capacity*2),this.geo.dispose(),this.attr=new Gs(new Float32Array(this.capacity*4),4),this.attr.setUsage(gr),this.geo.setAttribute("iShadow",this.attr),this.attr}set(e){e.length>this.capacity&&this.grow(e.length);const t=this.attr.array;e.forEach((i,s)=>{t[s*4]=i.x,t[s*4+1]=i.z,t[s*4+2]=i.scenery?-i.w:i.w,t[s*4+3]=i.d}),this.attr.needsUpdate=!0,this.geo.instanceCount=e.length,this.mesh.visible=e.length>0}}const fS=n=>({radius:n.haze.far,fps:n.scenery.fps,slowFor:0,fastFor:0});function pS(n,e,t){const i=t.scenery;if(!i.adaptive||!(e>0)||e>.25)return n;const s=n.fps+(1/e-n.fps)*Math.min(1,e*4),r=s<i.fps-i.hysteresis?n.slowFor+e:0,a=s>=i.fps?n.fastFor+e:0;let o=n.radius;return r>i.sustain?o-=i.shrink*e:a>i.sustain&&(o+=i.grow*e),o=Math.min(t.haze.far,Math.max(Math.min(i.minRadius,t.haze.far),o)),{radius:o,fps:s,slowFor:r,fastFor:a}}function mS(n,e){let t=0;for(const s of n)t+=s;let i=e%1000003/1000003*t;for(let s=0;s<n.length;s++)if(i-=n[s],i<0)return s;return Math.max(0,n.length-1)}class gS{constructor(e,t,i){this.canvas=e,this.game=t,this.style=i;const s=t.tuning;this.budget=fS(s),this.renderer=new vw({canvas:e,antialias:!1,powerPreference:"high-performance",preserveDrawingBuffer:!0}),this.renderer.setPixelRatio(1),this.renderer.info.autoReset=!1,this.renderer.outputColorSpace=aa,this.mpp=1/(s.artPixelsPerMetre*(2/s.pixelSize)),this.camera=new Xn(s.camera.fov,1,1,900),this.post=new g3(this.renderer,s),this.scene.background=new ht(723478),i3({...i,shafts:i.shafts*s.moonbeams},s.glowReach,this.mpp,s.tone.ambient,s.glowFalloff,s.tone.moon),ct.uGlowPower.value=s.glowPower,this.assets=new n3(i,t.seed,s.pixelSize),this.ground=new a3(t.map,t.forest,i,this.mpp),this.assets.onFloor=(c,d)=>this.ground.setFloor(c,d);const r=s.canopyShadow;this.ground.setCanopyShadow(r.on?r.strength:0,r.height,r.cover,r.wind),this.shadows=new dS(s.shadows.strength,s.fx==="smooth"),this.shadows.mesh.visible=s.shadows.on,this.scene.add(this.shadows.mesh);const a=s.fx==="smooth";ct.uSmooth.value=a?1:0,s.mist.on&&s.mist.strength>0&&(this.mist=new cS(s.mist.strength,s.mist.height,s.mist.wind,this.mpp,a,this.post.scene.depthTexture,this.post.lowSize),a?(this.post.fxScene=new Bu,this.post.fxScene.add(this.mist.mesh)):this.scene.add(this.mist.mesh)),ct.uHazeRange.value.set(s.haze.near,s.haze.far),this.ground.mesh.renderOrder=-1,this.scene.add(this.ground.mesh),this.scene.add(new h3(t.map,i,this.mpp,s.pathFade.metres).group);const o=s.occlusion;this.witchBatch=new jn(this.assets.witch,this.mpp,{witchLight:s.witch,silhouette:{colour:ct.uGlowRgb.value.clone(),opacity:o.silhouette}}),this.witchBatch.mesh.renderOrder=10,this.scene.add(...this.witchBatch.meshes),_t.uOcc.value.set(o.fadeOpacity,o.edge,o.minHeight,o.on?1:0),this.treehouseBatch=new jn(this.assets.treehouse.atlas,this.mpp,{fade:!0}),this.scene.add(...this.treehouseBatch.meshes),this.minimap=new rS(document.body,t.map),this.markerArt=new E3(i,s),this.markerBatch=new jn(this.markerArt.atlas,this.mpp,{solid:!0}),this.scene.add(...this.markerBatch.meshes,this.markerFx.group),this.assets.speakerArt(),this.propBatch=new jn(this.assets.props,this.mpp,{fade:!0}),this.scene.add(...this.propBatch.meshes),this.partyView=new S3(this.assets.soundsystems,this.mpp),this.strings=new B3(this.scene,t),this.leashView=new V3(this.scene,t),this.lasers=new Z3(this.scene,t),this.borders=new eS(this.scene,t),this.soundBatch=new jn(this.assets.soundsystems,this.mpp,{solid:!0}),this.scene.add(...this.soundBatch.meshes),this.dancefloor=new _3(t.map,s,_t,this.mpp),this.scene.add(this.dancefloor.ball,this.dancefloor.beam,this.dancefloor.motes);const h=s.fx==="smooth"?new xt({transparent:!0,depthWrite:!1,blending:Uo,blendSrc:xh,blendDst:Mh,vertexShader:"varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }",fragmentShader:"varying vec2 vUv; void main(){ vec2 p = vUv * 2.0 - 1.0; float r = dot(p, p); if (r > 1.0) discard; gl_FragColor = vec4(vec3(1.0 - 0.75 * (1.0 - r) * (1.0 - r)), 1.0); }"}):new xt({transparent:!1,depthWrite:!1,vertexShader:"varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }",fragmentShader:"varying vec2 vUv; void main(){ vec2 p = vUv * 2.0 - 1.0; if (dot(p, p) > 1.0 || mod(floor(gl_FragCoord.x) + floor(gl_FragCoord.y), 2.0) > 0.5) discard; gl_FragColor = vec4(0.02, 0.02, 0.05, 1.0); }"});this.shadow=new Yt(new Zn(1.4,.7).rotateX(-Math.PI/2),h),this.shadow.renderOrder=1,this.scene.add(this.shadow)}canvas;game;style;renderer;scene=new Bu;camera;ground;assets;typeBatches=new Map;decorBatches=new Map;creatureBatches=new Map;witchBatch;treehouseBatch;markerArt;markerBatch;markerFx=new R3;markerCache={wave:-1,n:-1,list:[]};seatK=1;seatTime=0;speakerBatch=null;shadow;mpp;lastBuild={x:1/0,y:1/0,z:1/0,version:-1,radius:-1};budget;sceneryFixed=null;lastReal=0;post;dancefloor;propBatch;partyView;strings;leashView;lasers;borders;music=new nS(document.body);nextStone=new sS(document.body);minimap;rulers=new aS(document.body);debugReadouts=!1;soundBatch;sources=[];forestLights=[];shadows;shadowList=[];mist=null;width=1;height=1;debugCull=!1;quick=!1;ghosts=[];ghostLines=null;now=0;stats={forestMs:0,forestMissing:0,sceneryRadius:0,fps:0,gameplay:0,scenery:0,dropped:0,trees:0,bushes:0,creatures:0,batches:0,drawCalls:0,pendingArt:0,pendingGround:0,lights:0};resize(e,t){const i=this.game.tuning.pixelSize;this.width=Math.max(1,Math.ceil(e/i)),this.height=Math.max(1,Math.ceil(t/i));const s=this.post.fullResolution?i:1;this.renderer.setSize(this.width*s,this.height*s,!1),this.post.resize(this.width,this.height,this.width*s,this.height*s),this.canvas.style.width=this.width*i+"px",this.canvas.style.height=this.height*i+"px",this.camera.aspect=this.width/this.height,this.camera.updateProjectionMatrix(),_t.uRes.value.set(this.width,this.height)}async prepare(){this.render(0,!1),this.drawCreatures(),this.ground.fill(this.renderer,this.viewRect(this.game.tuning.haze.near,20),this.game.witch.x,this.game.witch.z,1/0),await this.assets.whenIdle(),this.render(0,!1),this.refresh(!0);const e=this.game.map,t=this.game.witch,i=new Map;for(let s=0;s<e.n;s++)for(let r=0;r<e.n;r++){const a=e.siteOf(r,s),o=e.typeOf(r,s),h=Math.hypot(a.x-t.x,a.z-t.z);i.get(o)<=h||i.set(o,h)}for(let s=0;s<vt.length;s++)i.has(s)||i.set(s,1/0);if(this.prepared=!0,!this.quick){for(const[s]of[...i].sort((r,a)=>r[1]-a[1]))this.assets.prefetchType(s);for(const s of vt)this.assets.creatureArt(s.creature)}}batchFor(e,t,i){let s=e.get(t);return s||(s=i(),s&&(e.set(t,s),this.scene.add(...s.meshes),this.prepared&&(s.appearU.value=0,this.appearing.set(s,performance.now())))),s}appearing=new Map;prepared=!1;easeAppearing(){const e=performance.now();for(const[t,i]of this.appearing){const s=Math.min(1,(e-i)/800);t.appearU.value=s*s*(3-2*s),s>=1&&this.appearing.delete(t)}}frustum=new Eo;frustumTo=new Eo;cullCam=new Xn;box=new gs;m4=new kt;v3=new V;v3b=new V;v3c=new V;at=new Map;tracks={placed:{now:new Set,before:new Set},moving:{now:new Set,before:new Set}};pops=[];poseCamera(e,t){const i=t.angle*Math.PI/180;e.position.set(t.tx,t.ty+Math.sin(i)*t.distance,t.tz+Math.cos(i)*t.distance),e.up.set(0,1,0),e.lookAt(t.tx,t.ty,t.tz),e.updateMatrixWorld()}updateFrustum(){const e=this.game,t=e.tuning,i=this.camera;i.updateMatrixWorld(),this.m4.multiplyMatrices(i.projectionMatrix,i.matrixWorldInverse),this.frustum.setFromProjectionMatrix(this.m4);const s=Math.max(1,t.camera.zoomSteps),r=e.witch.mode==="rising"||e.witch.mode==="treetop"?1:0,a=Gd({...e.camera,zoom:s>1?e.camera.zoomStep/(s-1):0},r,t),o=this.cullCam;o.fov=i.fov,o.aspect=i.aspect,o.near=i.near,o.far=i.far,o.updateProjectionMatrix(),this.poseCamera(o,{...a,ty:Gn(t.groundHeight,t.treetopHeight,r)}),this.m4.multiplyMatrices(o.projectionMatrix,o.matrixWorldInverse),this.frustumTo.setFromProjectionMatrix(this.m4)}viewRect(e,t){const i=this.game.witch,s=[];for(const o of[this.camera,this.cullCam]){const h=o.position,c=e+Math.hypot(h.x-i.x,h.z-i.z)+t;for(const d of[-1,1])for(const f of[-1,1]){const u=this.v3.set(d,f,1).unproject(o).sub(h).normalize();for(const p of[0,25]){let g=u.y<-.001?(p-h.y)/u.y:1/0;g>0||(g=1/0),g=Math.min(g,c),s.push([h.x+u.x*g,h.z+u.z*g])}}s.push([h.x,h.z])}const r=s.map(o=>o[0]),a=s.map(o=>o[1]);return{minX:Math.min(...r)-t,maxX:Math.max(...r)+t,minZ:Math.min(...a)-t,maxZ:Math.max(...a)+t}}inView(e,t,i,s,r,a=this.game.tuning.haze.far){const o=this.game.witch.x,h=this.game.witch.z,c=a+r;return(e-o)**2+(t-h)**2>c*c?!1:(this.box.min.set(e-i/2-r,-r,t-s-r),this.box.max.set(e+i/2+r,s+r,t+r),this.frustum.intersectsBox(this.box)||this.frustumTo.intersectsBox(this.box))}inInnerView(e,t,i){const s=this.game.witch,r=this.game.tuning.haze;if(Math.hypot(e-s.x,t-s.z)>r.near+(r.far-r.near)*.6)return!1;for(const a of[0,i*.5,i]){const o=this.v3.set(e,a,t).project(this.camera);if(Math.abs(o.x)<1&&Math.abs(o.y)<1&&o.z<1)return!0}return!1}mark(e,t,i,s,r=""){const a=e==="creature"||e==="prop"?this.tracks.moving:this.tracks.placed,o=e==="creature"?`${e}|${r}`:`${e}|${t.toFixed(1)}|${i.toFixed(1)}|${s.toFixed(1)}|${r}`;return e==="creature"&&this.at.set(o,[t,i,s]),a.now.add(o),!a.before.has(o)}checkPops(e,t=!0){const i=this.tracks[e],s=t&&this.assets.pending===0&&i.before.size>0;if(this.debugCull){for(const r of i.before)if(!i.now.has(r)){const a=this.at.get(r),[,...o]=r.split("|"),[h,c,d]=a??o.map(Number);this.ghosts.push({x:+h,z:+c,h:Math.max(1,+d),until:this.now+1})}}if(s){const r=(a,o)=>{const h=this.at.get(a),[c,...d]=a.split("|"),[f,u,p]=h??d.map(Number),g=this.game.witch;!(e==="placed"&&Math.hypot(+f-g.x,+u-g.z)>this.budget.radius-this.game.tuning.scenery.fade)&&this.inInnerView(+f,+u,+p)&&this.pops.push(`${o} ${c} ${(+f).toFixed(0)},${(+u).toFixed(0)}`)};if(e!=="placed"||!this.appearing.size)for(const a of i.now)i.before.has(a)||r(a,"appeared");for(const a of i.before)i.now.has(a)||r(a,"vanished")}i.before=i.now,i.now=new Set}foot=0;footTime=0;footAct=null;lastView=null;lastPose={distance:0,angle:0,zoomStep:-1,lift:-1};refresh(e=!1){const t=this.game,i=t.tuning,s=this.camera,r=i.viewMargin,a=yu(t),o={x:s.position.x,y:s.position.y,z:s.position.z},h=this.lastPose,c=t.witch.mode==="rising"||t.witch.mode==="treetop"?1:0,d=Math.hypot(o.x-this.lastBuild.x,o.y-this.lastBuild.y,o.z-this.lastBuild.z)>=r/3,f=this.budget.radius,u=Math.min(i.haze.far,f+r/2),p=Math.abs(f-this.lastBuild.radius)>=r/3,g=Math.abs(a.distance-h.distance)>2||Math.abs(a.angle-h.angle)>.5||t.camera.zoomStep!==h.zoomStep||c!==h.lift;if(!e&&!d&&!g&&!p&&this.assets.version===this.lastBuild.version)return;this.lastBuild={...o,version:this.assets.version,radius:f},this.lastPose={distance:a.distance,angle:a.angle,zoomStep:t.camera.zoomStep,lift:c};const M=this.viewRect(u,r),x=(M.minX+M.maxX)/2,m=(M.minZ+M.maxZ)/2,v=Math.max(M.maxX-M.minX,M.maxZ-M.minZ)/2;this.lastView={x,z:m,half:v};const _=[],w=ct.uMoonDir.value,A=-w.x/Math.max(.2,w.y),y=-w.z/Math.max(.2,w.y),S=new Map,b=(N,te)=>{let ae=S.get(N);ae||S.set(N,ae=[]),ae.push(te)},E=this.mpp,C=a.angle*Math.PI/180,T=_t.uUp.value.dot(this.v3.set(0,Math.cos(C),-Math.sin(C))),R=_t.uUp.value,O=(N,te,ae,pe)=>{const be=(ae.pad??0)*pe;return{x:N-R.x*be,y:-R.y*be,z:te-R.z*be}};let I=0,k=0;for(const N of t.forest.treesNear(x,m,v)){const te=this.assets.typeArt(N.type);if(!te||!te.layout.big.length)continue;const ae=te.atlas.frames,pe=te.layout.big[mS(te.layout.bigWeight,N.variant)],be=ae[pe.top??pe.bot];if(!this.inView(N.x,N.z,be.w*E,be.h*E,r,u))continue;const Pe=be.h*E,q=i.treeCap,ee=Pe>q.from?(q.from+(Pe-q.from)*q.keep)/Pe:1,B=this.mark("tree",N.x,N.z,Pe*ee),ce=O(N.x,N.z,ae[pe.bot],E*ee);b(N.type,{...ce,frame:ae[pe.bot],flip:N.flip,fresh:B,scale:ee,cut:pe.top!==null?te.cut.get(pe.bot):void 0}),pe.top!==null&&b(N.type,{...ce,frame:ae[pe.top],flip:N.flip,top:!0,fresh:B,scale:ee});const H=be.w*E,Z=be.h*E*(pe.top===null?.2:.6);i.shadows.trees&&_.push({x:N.x+A*Z,z:N.z+y*Z,w:H*.8,d:H*.45,scenery:!0}),I++}const U=(N,te,ae)=>{for(const pe of te){const be=this.assets.typeArt(pe.type);if(!be)continue;const Pe=ae(be.layout);if(!Pe.length)continue;const q=Pe[pe.variant%Pe.length],ee=be.atlas.frames,B=ee[q.bot],ce=ee[q.top??q.bot],H=N==="setpiece"?i.setPieceScale:1,Z=E*H;let fe=pe.x,he=pe.z;if(q.origin){const Ie=pe.flip?B.w-q.origin.x:q.origin.x;fe+=(B.w/2-Ie)*Z,he+=(B.h-(B.pad??0)-q.origin.y)*Z*T/Math.max(.2,Math.sin(C))}if(!this.inView(fe,he,ce.w*Z,ce.h*Z,r,u))continue;const $=this.mark(N,pe.x,pe.z,ce.h*Z),le=O(fe,he,B,Z);b(pe.type,{...le,frame:B,flip:pe.flip,fresh:$,scale:H}),q.top!==null&&b(pe.type,{...le,frame:ee[q.top],flip:pe.flip,top:!0,fresh:$,scale:H});const ve=B.w*Z*.3;N!=="setpiece"&&_.push({x:pe.x,z:pe.z-ve*.4,w:B.w*Z*.8,d:ve,scenery:!0}),k++}};U("small",t.forest.bushesNear(x,m,v),N=>N.small),U("small",t.forest.bedsNear(x,m,v),N=>N.small),U("wall",t.forest.wallsNear(x,m,v),N=>N.walls.map(te=>({bot:te,top:null}))),U("setpiece",t.forest.setPiecesNear(x,m,v),N=>N.set===null?[]:[N.set]);const W=this.assets.decorArt(),ne=[];if(W)for(const N of t.forest.decorNear(x,m,v)){const te=W.families[N.family];if(!te?.length)continue;const ae=te[N.variant%te.length],pe=W.atlas.frames,be=pe[ae.bot],Pe=pe[ae.top??ae.bot];if(!this.inView(N.x,N.z,Pe.w*E,Pe.h*E,r,u))continue;const q=this.mark("decor",N.x,N.z,Pe.h*E),ee=O(N.x,N.z,be,E);ne.push({...ee,frame:be,flip:N.flip,fresh:q}),ae.top!==null&&ne.push({...ee,frame:pe[ae.top],flip:N.flip,top:!0,fresh:q});const B=be.w*E*.3;_.push({x:N.x,z:N.z-B*.4,w:be.w*E*.8,d:B,scenery:!0}),k++}const K=this.assets.pathPieceArt();if(K){const N=[],te=_t.uRight.value;for(const ae of t.map.paths.pieces){if(Math.abs(ae.x-x)>v||Math.abs(ae.z-m)>v)continue;const pe=K.byId[ae.id];if(!pe)continue;const be=K.atlas.frames[pe.frame],Pe=(pe.originX-be.w/2)*E,q=Math.max(0,be.h-(be.pad??0)-pe.originY)*E,ee=O(ae.x-te.x*Pe,ae.z-te.z*Pe+q*T/Math.max(.2,Math.sin(C)),be,E);if(!this.inView(ee.x,ee.z,be.w*E,be.h*E,r,u))continue;N.push({...ee,frame:be,flip:!1,fresh:this.mark("pathpiece",ae.x,ae.z,be.h*E)});const B=be.w*E*.25;_.push({x:ae.x,z:ae.z,w:be.w*E*.7,d:B,scenery:!0}),k++}this.batchFor(this.decorBatches,"pieces",()=>new jn(K.atlas,E,{scenery:!0,fade:!0}))?.set(N)}const re=this.assets.relicArt();if(re){const N=this.camera.getWorldDirection(this.v3b),te=this.v3c.set(0,1,0).applyQuaternion(this.camera.quaternion),ae=_t.uUp.value,pe=_t.uRight.value,be=ae.dot(te)/Math.max(.2,-N.y),Pe=[],q=[],ee=(B,ce,H,Z)=>{const fe=re.atlas.frames[B.frame],he=B.decal?0:fe.pad??0,$=(B.originX-fe.w/2)*E*(Z?-1:1),le=Math.max(0,fe.h-he-B.originY)*E*be,ve=B.decal?{x:ce-pe.x*$,y:0,z:H-pe.z*$+le}:O(ce-pe.x*$,H-pe.z*$+le,fe,E);this.inView(ve.x,ve.z,fe.w*E,fe.h*E,r,u)&&((B.decal?q:Pe).push({...ve,frame:fe,flip:Z,fresh:this.mark("relic",ce,H,fe.h*E)}),B.decal||_.push({x:ce,z:H,w:fe.w*E*.6,d:fe.w*E*.22,scenery:!0}),k++)};if(re.modern.length)for(const B of t.forest.relicsNear(x,m,v))ee(re.modern[B.variant%re.modern.length],B.x,B.z,B.flip);for(const B of t.map.grounds)if(!(Math.abs(B.x-x)>v+B.r||Math.abs(B.z-m)>v+B.r))for(const ce of re.layouts[B.kind]??[]){const H=re.byId[ce.id];H&&ee(H,B.x+(B.flip?-ce.x:ce.x),B.z+ce.z,B.flip)}this.batchFor(this.decorBatches,"relics",()=>new jn(re.atlas,E,{scenery:!0,fade:!0}))?.set(Pe),this.batchFor(this.decorBatches,"decals",()=>{const B=new jn(re.atlas,E,{scenery:!0,flat:!0});for(const ce of B.meshes)ce.renderOrder=-.5,ce.material.depthWrite=!1;return B})?.set(q)}W&&this.batchFor(this.decorBatches,"all",()=>new jn(W.atlas,E,{scenery:!0,fade:!0}))?.set(ne);for(const[N,te]of this.typeBatches)S.has(N)||te.set([]);for(const[N,te]of S)this.batchFor(this.typeBatches,N,()=>{const pe=this.assets.typeArt(N);return pe&&new jn(pe.atlas,E,{scenery:!0,fade:!0})})?.set(te);{const N=t.map.treehouse;_.push({x:N.x,z:N.z,w:7,d:3.5,scenery:!1})}this.checkPops("placed",!e),this.sources=t.forest.lightsNear(t.witch.x,t.witch.z,i.haze.far+r),this.stats.trees=I,this.stats.bushes=k,this.shadowList=_}drawMarkers(e){const t=this.game,i=t.tuning,s=i.runeMarkers,r=t.witch,a=i.haze.far+20,o=this.markerCache;(o.wave!==t.party.wave||o.n!==t.party.areas.size)&&(o.wave=t.party.wave,o.n=t.party.areas.size,o.list=Cg(t.party,t.map));const h=sc(t.party,t.map,e),c=t.party.paused?0:h.gone,d=e*i.beat.bpm/60,f=Math.pow(.5+.5*Math.cos(d*Math.PI*2),2),u=[],p=[],g=[],M=[],x=[],m=s.awakeStyle,v=m!=="beam",_=m!=="column",w=s.scale,A=(S,b,E,C,T=0)=>{const R=this.markerArt.atlas.frames[this.markerArt.frame(E,C)];return this.inView(S,b,R.w*this.mpp*w,R.h*this.mpp*w,6)?(u.push({x:S,y:T,z:b,frame:R,flip:!1,scale:w,fresh:this.mark("marker",S,b,R.h*this.mpp*w)}),!0):!1},y=[];for(const S of o.list){const b=Math.hypot(S.x-r.x,S.z-r.z);if(b>a)continue;const E=vt[t.map.typeOf(S.cell[0],S.cell[1])].creature,C=this.markerArt.colour.get(E),T=S.awake?1+Math.round(Math.min(1,f*(.4+.6*c))*(na-2)):0;A(S.x,S.z,E,T);const R=(this.markerArt.height.get(E)??0)*this.mpp*w,O=s.awake,I=s.dormant,k=S.awake?(O.light+O.lightBuild*c)*(.55+.45*f):I.light;if(b<s.lightRange&&y.push({d:b,l:{x:S.x,y:.5,z:S.z+1.5,reach:S.awake?O.reach:I.reach,rgb:C,strength:k}}),(!S.awake||v)&&g.push({x:S.x,z:S.z,colour:C,strength:S.awake?O.beam*(.6+.4*f)*(1+c):I.beam,base:R}),S.awake&&_&&x.push({x:S.x,z:S.z,colour:C,strength:s.laser.opacity*(.55+.45*f)*(.7+.6*c),width:s.laser.width,height:s.laser.length,base:R}),S.awake){const U=Math.round(O.motes+O.moteBuild*c);for(let W=0;W<U;W++){const ne=(S.cell[0]*31+S.cell[1]*17+W*7.3)%1||.37*(W+1)%1,K=(e*(.25+.15*(W*.618%1))+W/U)%1,re=W*2.399+S.cell[0];M.push({x:S.x+Math.cos(re)*(.6+K*1.4),y:.6+K*7,z:S.z+Math.sin(re)*(.6+K*1.4),colour:C,alpha:(1-K)*(.5+.5*f)*(.6+ne*.4)})}}}for(const S of t.party.areas.values()){if(!S.soundsystem||e-S.at>s.flare.time||e<S.at)continue;const b=(e-S.at)/s.flare.time,E=vt[t.map.typeOf(S.cell[0],S.cell[1])].creature,C=this.markerArt.colour.get(E),T=t.map.soundsystemSpot(S.cell[0],S.cell[1]);A(T.x,T.z,E,na-1,-b*b*4*w),y.push({d:0,l:{x:T.x,y:2.5,z:T.z,reach:s.awake.reach*1.5,rgb:C,strength:s.flare.light*(1-b)}})}y.sort((S,b)=>S.d-b.d);for(const S of y.slice(0,8))p.push(S.l);return this.markerBatch.set(u),this.markerFx.update(g,s.beamHeight,Jo(r),M,x),p}drawCreatures(e=0){const t=this.game,i=t.tuning.haze.far+20,s=new Map,r=new Map,a=[],o=60/t.tuning.beat.bpm;let h=0;for(const c of t.creatures){if(Math.abs(c.x-t.witch.x)>i||Math.abs(c.z-t.witch.z)>i)continue;const d=c.leashed?this.assets.partyArt(c.species,c.id,br(c.species)):void 0,f=d??this.assets.creatureArt(c.species),u=d?`party-${c.id}`:c.species;if(!f)continue;r.set(u,f);const p=f.atlas.frames[f.frame(c.level,c.moving?Math.floor(c.walk)%2:0,c.away)];if(!this.inView(c.x,c.z,p.w*this.mpp,p.h*this.mpp,4))continue;const g=this.mark("creature",c.x,c.z,p.h*this.mpp,c.id);let M=s.get(u);M||s.set(u,M=[]);const x=(e/o+c.id%4*.25)*Math.PI,m=c.leashed?Math.abs(Math.sin(x))*(c.moving?.15:.4):0,v=c.leashed&&!c.moving?Math.sin(x*.5)*.12:0;M.push({x:c.x+v,y:m,z:c.z,frame:p,flip:c.facing<0,fresh:g}),a.push({x:c.x,z:c.z,w:p.w*this.mpp*.7,d:p.w*this.mpp*.25}),h++}for(const[c,d]of this.creatureBatches)s.has(c)||d.set([]);for(const[c,d]of s)this.batchFor(this.creatureBatches,c,()=>{const u=r.get(c);return u&&new jn(u.atlas,this.mpp,{solid:!0})})?.set(d);this.stats.creatures=h,this.game.tuning.shadows.on&&this.shadows.set(this.shadowList.concat(a))}fire=new V(1,.5,.16);runeCyan=new V(.3,.9,1);runeViolet=new V(.75,.45,1);runeGreen=new V(.45,1,.5);updateSources(e){const t=this.assets.props.frames,i=[],s=[];for(const r of this.sources){if(r.kind==="pond")continue;const a=we(Math.round(r.x*10),Math.round(r.z*10),7);if(r.kind==="campfire"){const o=.8+.12*Math.sin(e*11+a*40)+.08*Math.sin(e*23.7+a*13);s.push({x:r.x+Math.sin(e*9+a)*.08,y:1.2,z:r.z,reach:this.game.tuning.lights.campfire.reach*r.size,rgb:this.fire,strength:this.game.tuning.lights.campfire.strength*o});const h=t[Math.floor(e*8+a*10)%3];this.inView(r.x,r.z,h.w*this.mpp,h.h*this.mpp,4)&&i.push({x:r.x,y:0,z:r.z,frame:h,flip:a<.5,fresh:this.mark("prop",r.x,r.z,2)})}else{const o=a<.33?1:a<.66?0:2,h=.7+.3*Math.sin(e*.9+a*20),c=t[3+o];s.push({x:r.x,y:2,z:r.z,reach:this.game.tuning.lights.stone.reach*r.size,rgb:[this.runeCyan,this.runeViolet,this.runeGreen][o],strength:this.game.tuning.lights.stone.strength*h}),this.inView(r.x,r.z,c.w*this.mpp,c.h*this.mpp,4)&&i.push({x:r.x,y:0,z:r.z,frame:c,flip:a<.5,fresh:this.mark("prop",r.x,r.z,2.6)})}}this.propBatch.set(i),this.forestLights=s}setLights(e,t,i){const s=Math.min(Os,this.game.tuning.lightBudget),r=e.map(c=>({l:c,d:Math.hypot(c.x-t,c.z-i)-c.reach})).sort((c,d)=>c.d-d.d).slice(0,s+1),a=r.length>s?r[s].d:1/0,o=ct;let h=0;for(const{l:c,d}of r.slice(0,s)){const f=Math.min(1,Math.max(0,(a-d)/15));o.uLightPos.value[h].set(c.x,c.y,c.z,c.reach),o.uLightCol.value[h].set(c.rgb.x,c.rgb.y,c.rgb.z,c.strength*f),h++}o.uLightCount.value=h,this.stats.lights=h}drawGhosts(e){this.now=e,this.ghosts=this.ghosts.filter(a=>a.until>e),this.ghostLines||(this.ghostLines=new Dh(new Qt,new Kf({color:16719904,depthTest:!1})),this.ghostLines.frustumCulled=!1,this.ghostLines.renderOrder=20,this.scene.add(this.ghostLines));const t=_t.uRight.value,i=_t.uUp.value,s=[];for(const a of this.ghosts){const o=a.h*.4,h=(p,g)=>[a.x+t.x*p*o+i.x*g*a.h,t.y*p*o+i.y*g*a.h,a.z+t.z*p*o+i.z*g*a.h],c=h(-1,0),d=h(1,0),f=h(1,1),u=h(-1,1);s.push(...c,...d,...d,...f,...f,...u,...u,...c,...c,...f)}const r=this.ghostLines.geometry;r.dispose(),r.setAttribute("position",new St(s,3)),r.setDrawRange(0,s.length/3),this.ghostLines.visible=s.length>0}drawSpeakers(e,t){const i=this.assets.speakerArt(),s=this.game;if(!i)return;this.speakerBatch||(this.speakerBatch=new jn(i.atlas,this.mpp,{solid:!0}),this.scene.add(...this.speakerBatch.meshes));const r=this.mpp,a=_t.uUp.value,o=_t.uRight.value,h=t*Math.PI/180,c=a.dot(this.v3.set(0,Math.cos(h),-Math.sin(h))),d=e*s.tuning.beat.bpm/60,f=d-Math.floor(d),u=[];s.map.dancefloor.speakers.forEach((p,g)=>{const M=Fw(p.ring),x=s.speakers[g]??"playing",m=x==="playing"?f<.12?2:f<.3?1:0:x==="damaged"?Math.floor(e*2.5+g)%2:0,v=i.frames[`${M.angle}:${x}:${m}`];if(v===void 0)return;const _=i.atlas.frames[v],w=i.origin[M.angle],y=((M.flip?_.w-w.x:w.x)-_.w/2)*r,S=Math.max(0,_.h-(_.pad??0)-w.y)*r,b=(_.pad??0)*r,E=p.x-o.x*y,C=p.z-o.z*y+S*c/Math.max(.2,Math.sin(h));this.inView(E,C,_.w*r,_.h*r,6)&&u.push({x:E-a.x*b,y:-a.y*b,z:C-a.z*b,frame:_,flip:M.flip,fresh:this.mark("speaker",p.x,p.z,_.h*r)})}),this.speakerBatch.set(u)}placeTreehouse(e){const t=this.assets.treehouse,i=t.atlas.frames,s=this.game.map.treehouse,r=this.mpp,a=_t.uUp.value,o=e*Math.PI/180,h=a.dot(this.v3.set(0,Math.cos(o),-Math.sin(o))),c=i[0].pad??0,d=Math.max(0,i[0].h-c-t.base.y)*r,f=c*r,u=s.x-(t.base.x-i[0].w/2)*r,p=s.z+d*h/Math.max(.2,Math.sin(o)),g={x:u-a.x*f,y:-a.y*f,z:p-a.z*f};return this.treehouseBatch.set([{...g,frame:i[0],flip:!1},{...g,frame:i[1],flip:!1,top:!0}]),g}render(e,t=!0){const i=this.game,s=i.tuning,r=yu(i);if(t){const $=performance.now();this.lastReal&&(this.budget=pS(this.budget,($-this.lastReal)/1e3,s)),this.lastReal=$}this.sceneryFixed!==null&&(this.budget.radius=Math.min(s.haze.far,Math.max(1,this.sceneryFixed))),ct.uScenery.value.set(this.budget.radius,Math.max(1,s.scenery.fade));const a=r.angle*Math.PI/180,o=2*r.distance*Math.tan(s.camera.fov*Math.PI/360)/this.height,h=new V(0,Math.cos(a),-Math.sin(a)),c=new V(r.tx,r.ty,r.tz),d=c.dot(h),f=c.x;c.addScaledVector(h,Math.round(d/o)*o-d),c.x+=Math.round(f/o)*o-f;const u=new V(0,Math.sin(a),Math.cos(a)).multiplyScalar(r.distance);this.camera.position.copy(c).add(u),this.camera.up.set(0,1,0),this.camera.lookAt(c),this.updateFrustum();const p=s.spriteTilt;_t.uUp.value.set(0,1,0).lerp(h,p).normalize(),_t.uFacing.value.crossVectors(_t.uRight.value,_t.uUp.value).normalize();const g=Jo(i.witch),M=s.canopyCutout;this.camera.updateMatrixWorld();const x=this.v3.set(i.witch.x,yr(i.witch,s)*.5,i.witch.z).project(this.camera);if(_t.uCutout.value.set((x.x*.5+.5)*this.width,(x.y*.5+.5)*this.height,.5*M.screenFraction*this.width*(1-g),Math.max(1,M.edge*this.width*(1-g))),_t.uTopFade.value=g,_t.uTrunkFade.value.set(s.trunkFade.metres,this.mpp),!s.glowFixed){const $=i.witch.x,le=i.witch.z,ve=_t.uRight.value,Ie=this.v3.set($,0,le).project(this.camera).x,Ve=this.v3.set($+ve.x*10,0,le+ve.z*10).project(this.camera).x,Ke=Math.max(.001,Math.abs(Ve-Ie)*.5*this.width/10);ct.uGlowR.value=(.5*M.screenFraction+M.edge)*this.width/Ke*s.glowToCutout}_t.uDebugCull.value=this.debugCull?1:0;const m=i.witch,v=yr(m,s);ct.uGlowPos.value.set(m.x,v+s.glowHeight,m.z),ct.uHazeCentre.value.set(m.x,m.z),this.updateSources(e);const _=this.partyView.update(i,e,($,le,ve,Ie)=>this.inView($,le,ve,Ie,4),()=>!1);this.soundBatch.set(_.items),this.ground.setSweeps(_.sweeps),this.lasers.update(e,_.playing,m.x,m.z);{const $=_t,le=s.party,ve=[...i.party.areas.values()].map(Ie=>({a:Ie,s:i.map.siteOf(Ie.cell[0],Ie.cell[1])})).sort((Ie,Ve)=>Math.hypot(Ie.s.x-m.x,Ie.s.z-m.z)-Math.hypot(Ve.s.x-m.x,Ve.s.z-m.z)).slice(0,16);ve.forEach(({a:Ie,s:Ve},Ke)=>{const Fe=Ie.wave===0?1:Math.min(1,Math.max(0,(e-Ie.at)/Math.max(.01,le.transition)));$.uParty.value[Ke].set(Ve.x,Ve.z,i.map.areaSize*.85,Fe);const He=br(vt[i.map.typeOf(Ie.cell[0],Ie.cell[1])].creature);$.uPartyCol.value[Ke].set(He[0]/255,He[1]/255,He[2]/255)}),$.uPartyCount.value=ve.length,$.uUplight.value.set(le.uplight.strength,le.uplight.pulse,le.uplight.edge,e*s.beat.bpm/60*Math.PI*2)}this.strings.update(),this.borders.update();const w=this.assets.treehouse,A=w.atlas.frames[0],y=this.placeTreehouse(r.angle),S=_t,b=($,le)=>{const ve=S.uRight.value,Ie=S.uUp.value,Ve=($-A.w/2)*this.mpp,Ke=(A.h-le)*this.mpp;return{x:y.x+ve.x*Ve+Ie.x*Ke,y:y.y+ve.y*Ve+Ie.y*Ke,z:y.z+ve.z*Ve+Ie.z*Ke}},E=w.lights.filter($=>$.kind==="lantern"||$.kind==="window").slice(0,2).map($=>({...b($.x,$.y),reach:s.treehouse.lightReach,rgb:new V($.rgb[0]/255,$.rgb[1]/255,$.rgb[2]/255),strength:s.treehouse.lightStrength*(.92+.08*Math.sin(e*3+$.x))})),C=this.drawMarkers(e);this.drawSpeakers(e,r.angle),this.setLights([this.dancefloor.update(e,this.ground,i),..._.lights,...E,...C,...this.forestLights],m.x,m.z),ct.uTime.value=e,this.mist?.follow(r.tx,r.tz);const T=Math.sin(e*2.4)*.12,R=m.mode==="rising"&&m.lift<.9,O=m.mode==="descending"&&m.lift>.1;let I=R||O?(R?8:12)+(m.away?2:0)+Math.floor(e*7)%2:m.lean?6+(m.away?1:0):(m.away?3:0)+Math.floor(e*4)%3;if(!R&&!O){const $=this.assets.witchFly,le=m.away?"away":"towards";m.braking?I=$.brake[le][Math.floor(e*$.brake.fps)%$.brake[le].length]:(m.boost??0)>.7&&(I=$.fast[le][Math.floor(e*$.fast.fps)%$.fast[le].length])}const k=i.leash,U=this.assets.witchFoot,W=m.away?"away":"towards";for(const $ of k.events)$.kind==="placed"||$.kind==="fizzled"?this.footAct={pose:"placeSigil",at:e}:$.kind==="picked"&&(this.footAct={pose:"liftSigil",at:e});const ne=this.footAct?U[this.footAct.pose].towards.length/U[this.footAct.pose].fps:0,K=!!this.footAct&&e-this.footAct.at<ne+.3,re=m.mode==="ground"&&(k.talk||k.held||K)?1:0,N=Math.min(.1,Math.max(0,e-this.footTime)),te=this.foot;this.footTime=e,this.foot+=(re-this.foot)*Math.min(1,N*8),Math.abs(re-this.foot)<.01&&(this.foot=re);const ae=($,le)=>{const ve=U[$][W];return ve[Math.max(0,Math.min(ve.length-1,le))]};this.foot>.6?K&&this.footAct?I=ae(this.footAct.pose,Math.floor((e-this.footAct.at)*U[this.footAct.pose].fps)):k.talk?I=ae("talk",Math.floor(e*U.talk.fps)%U.talk[W].length):I=ae("stand",Math.floor(e*U.stand.fps)%U.stand[W].length):this.foot>.02&&(I=this.foot>=te?ae("land",Math.floor(this.foot*3)):ae("takeoff",Math.floor((1-this.foot)*3)));const pe=this.foot*this.foot*(3-2*this.foot),be=(v+T-.4)*(1-pe),Pe=Math.min(.1,Math.max(0,e-this.seatTime));this.seatTime=e,this.seatK=m.seated?1:Math.max(0,this.seatK-Pe/.6);let q=m.x,ee=m.z,B=be;if(this.seatK>0){const $=b(w.seat.x,w.seat.y),le=this.seatK*this.seatK*(3-2*this.seatK);i.introFocus={x:$.x,y:$.y+1,z:$.z};const ve=this.camera.getWorldDirection(this.v3);q+=($.x-ve.x*.6-q)*le,B+=($.y-ve.y*.6-B)*le,ee+=($.z-ve.z*.6-ee)*le,m.seated&&(I=U.sit.towards[Math.floor(e*U.sit.fps)%U.sit.towards.length])}const ce=this.assets.witch.frames[I],H=B+ce.h*this.mpp;this.witchBatch.set([{x:q,y:B,z:ee,frame:ce,flip:m.seated?!1:m.facing<0}]);{const $=(Ve,Ke,Fe)=>{const He=this.v3.set(Ve,Ke,Fe).project(this.camera);return[(He.x+1)/2*this.width,(He.y+1)/2*this.height]},le=$(q,B,ee),ve=$(q,H,ee),Ie=$(q+ce.w*this.mpp/2,B,ee);_t.uWitch.value.set((le[0]+ve[0])/2,(le[1]+ve[1])/2,Math.abs(Ie[0]-le[0])+1,Math.abs(ve[1]-le[1])/2+1),_t.uWitchDepth.value=-this.v3.set(q,this.seatK>0?B:v,ee).applyMatrix4(this.camera.matrixWorldInverse).z}this.shadow.position.set(q,.03,ee),this.shadow.scale.setScalar((1-.5*Jo(m))*(1-this.seatK)+.001),this.refresh(),this.easeAppearing();const Z=this.lastView;Z&&(this.stats.forestMissing=i.forest.prefetch(Z.x+m.vx*2,Z.z+m.vz*2,Z.half+64,4)),this.stats.forestMs=i.forest.buildMs,i.forest.buildMs=0,this.drawCreatures(e),this.checkPops("moving"),this.rulers.update(this.camera,this.canvas.clientWidth||window.innerWidth,this.canvas.clientHeight||window.innerHeight,m.x,m.z);const fe=i.map.dancefloor;this.music.update(this.camera,this.canvas.clientWidth||window.innerWidth,this.canvas.clientHeight||window.innerHeight,fe.x,fe.z,m.x,m.z,e,s.beat.bpm,this.debugReadouts),this.minimap.update(i.party,m.x,m.z);{const $=i.party.next,le=this.canvas.clientWidth||window.innerWidth,ve=this.canvas.clientHeight||window.innerHeight;if($){const Ie=i.map.soundsystemSpot($[0],$[1]),Ve=vt[i.map.typeOf($[0],$[1])].creature,Ke=sc(i.party,i.map,e);this.nextStone.update(this.camera,le,ve,{x:Ie.x,z:Ie.z,colour:this.markerArt.colour.get(Ve)},m.x,m.z,e,s.beat.bpm,i.party.paused?0:Ke.gone)}else this.nextStone.update(this.camera,le,ve,null,m.x,m.z,e,s.beat.bpm,0)}if(this.leashView.update(e,this.camera,this.canvas.clientWidth||window.innerWidth,this.canvas.clientHeight||window.innerHeight,H),this.assets.work(6),this.stats.pendingGround=this.ground.fill(this.renderer,this.viewRect(s.haze.far,40),m.x,m.z,4),this.stats.pendingArt=this.assets.pending,this.debugCull&&this.drawGhosts(e),!t)return;this.renderer.info.reset(),this.post.lift=this.game.witch.lift,this.post.render(this.scene,this.camera);let he=0;for(const $ of[...this.typeBatches.values(),...this.creatureBatches.values(),this.propBatch,this.soundBatch,...this.speakerBatch?[this.speakerBatch]:[]])he+=$.dropped;he&&!this.stats.dropped&&console.warn(`view: ${he} sprite instances set but not drawn`),this.stats.dropped=he,this.stats.drawCalls=this.renderer.info.render.calls,this.stats.batches=this.typeBatches.size+this.creatureBatches.size,this.stats.sceneryRadius=this.budget.radius,this.stats.fps=this.budget.fps,this.stats.scenery=this.stats.trees+this.stats.bushes,this.stats.gameplay=this.stats.creatures+this.propBatch.count+this.soundBatch.count}}const xS="The art style: knobs from the Witch Art Lab. Paste a style saved in the Lab here (its whole saved JSON, or just its style object). Any knob left out follows the Lab's current default, so an empty style means the Lab's default look, and stays up to date as the art changes.",MS="Lab default",vS={},bS={_readme:xS,name:MS,style:vS};function yS(n=bS){const e=n??{},t=e.style&&typeof e.style=="object"?e.style:e,i=Hw();for(const[s,r]of Object.entries(t))s in i&&(i[s]=r);return i}function _S(n,e){const t=n.querySelector("#stick"),i=t.querySelector(".knob"),s=56;let r=null,a=0,o=0;const h=()=>n.classList.add("touch"),c=n.querySelector("#stick-zone");c.addEventListener("pointerdown",p=>{if(!(p.pointerType==="mouse"||r!==null)){h(),r=p.pointerId,a=p.clientX,o=p.clientY,t.style.left=a+"px",t.style.top=o+"px",t.classList.add("on");try{c.setPointerCapture(p.pointerId)}catch{}p.preventDefault()}}),c.addEventListener("pointermove",p=>{if(p.pointerId!==r)return;let g=p.clientX-a,M=p.clientY-o;const x=Math.hypot(g,M);x>s&&(g*=s/x,M*=s/x),i.style.transform=`translate(${g}px, ${M}px)`;const m=Math.min(1,x/s),v=.15,_=m<v?0:(m-v)/(1-v)/Math.max(1e-6,m);e.x=g/s*_,e.y=M/s*_});const d=p=>{p.pointerId===r&&(r=null,e.x=0,e.y=0,i.style.transform="",t.classList.remove("on"))};c.addEventListener("pointerup",d),c.addEventListener("pointercancel",d);const f=(p,g)=>{const M=n.querySelector(p);M.addEventListener("pointerdown",x=>{x.preventDefault(),x.stopPropagation(),g(),M.classList.add("down")}),M.addEventListener("pointerup",()=>M.classList.remove("down")),M.addEventListener("pointerleave",()=>M.classList.remove("down"))};f("#rise",()=>e.toggle=!0),f("#zoom-in",()=>e.zoom-=1),f("#zoom-out",()=>e.zoom+=1),f("#sigil",()=>e.sigil=!0);const u=n.querySelector("#talk");u.addEventListener("pointerdown",p=>{p.preventDefault(),p.stopPropagation(),e.talk=!0,u.classList.add("down")});for(const p of["pointerup","pointerleave","pointercancel"])u.addEventListener(p,()=>{e.talk=!1,u.classList.remove("down")});window.addEventListener("touchstart",p=>{h(),p.touches.length===3&&(e.debug=!0)},{passive:!0})}const wS=[{version:null,items:["The witch is lit by the lights around her: she turns red by a red soundsystem, warm by a campfire, and catches a coloured rim on the side facing a light, while staying easy to see in the dark","Railways and paths no longer run across the dancefloor: they stop, frayed, at the edge of its clearing"]},{version:181,items:["Stronger tilt-shift over the treetops","The game opens close in on the witch in her seat on the treehouse, and eases out as she sets off"]},{version:177,items:["The dancefloor is a magic disco floor of glass tiles: dark until you step off the terrace, then it switches on and plays shapes and patterns to the beat, changing on the bar","The floor lights up under you, rippling out on each beat and leaving footprints; landing on it sends a big ripple","It grows wilder as the party spreads: more tiles, more colours, faster changes, more motes; a pulse runs out towards each area the party reaches, and areas with the party add their own shapes"]},{version:175,items:["Where two areas meet, their ground textures meander and speckle into each other instead of meeting on a blocky edge (?blend=off to compare)"]},{version:174,items:["The standing stones round the dancefloor are now twelve stone speakers, twice as far out, thumping on the beat: the ones beyond the floor face in, the near ones face out, so you always see their fronts (K cycles them through damaged and destroyed, for testing)","The dancefloor's clearing is wider, and the treehouse stands outside the speaker ring"]},{version:171,items:["The forest is dark again: the witch's light only reaches as far as the gap in the canopy round her, and the moonlight and twilight fill are lower","Tree trunks fade out at the top in pixel steps where the crowns are hidden, instead of ending in a flat cut","Paths, roads, tracks and streams fray out at their ends instead of stopping square","Creatures, soundsystems and the rune stones are never made see-through round the witch; only the scenery is","Each wave now wakes just one area, chosen as soon as the last one woke, bordering the party and spreading in lobes rather than a circle; its rune stone is the one that wakes","A new pixel cue at the screen's edge points to the next stone to wake, with its distance; the music cue is bigger and pixelled","Awake rune stones can show a thin laser straight up, a column of light, or both (?rune=beam|column|both)","M shows a minimap of the party's spread (debug)","Witch walks 10% faster","Leashes arc gently and their dots flow back towards you","Treetop turns are tight when you're slow; the big skid only comes at speed","The rune stones' beam and laser now rise from the top of the stone","Paths keep one look for their whole length, and run on unbroken past clearings","Every ruin, freak tree, relic, set piece and playground or sports ground is one of a kind: you'll find each at most once per map, facing either way","Stone stairs are a rare find by ravines, rocky slopes, cave mouths and stone shrines, not a path fitting","Soundsystems and set pieces stand clear of the paths"]},{version:154,items:["Nothing floats any more: trees, rocks, ruins, the treehouse and set pieces all stand on the ground, and big scenery keeps clear of the soundsystems","Fewer ruins, rocks, relics, stairs and bridges: each is a find now, not clutter","The witch's own light is a tighter pool round her that fades out within about 40 m (try ?glow=50,2.5 to tune it)","Garden walls stand in joined runs along the paths, with flower beds in rows beside them; shrine stones stand in circles; hedges, brambles and rock walls run in lines; water, reeds and boulders gather in clumps, with open ground between","The edge of the see-through hole in the treetops round the witch fades smoothly (no dither)","Big rune stones now mark where every soundsystem will come, glowing with their area's creature's sigil. The next wave's stones wake: they pulse to the beat, throw light and motes, brighter as the wave nears, and send a beam above the trees; when the party arrives the stone flares and sinks as its soundsystem appears. The random rune stones are gone"]},{version:144,items:["Points where a branch line leaves the railway"]},{version:136,items:["Tapping the start screen on a phone starts the game again, wherever you tap","Along the railways: old wagons, a carriage with a tree through it, little platforms, signal gantries and posts, and buffer stops where the track ends; bridges where paths cross streams, level crossings, stairs into rocky hollows, and verge posts along the roads","Relics of the modern world turn up now and then, more by the roads and railways: a car nose-down in the moss, shopping trolleys, cones, broken highway, a phone box, a sofa, a fridge full of fireflies","A few overgrown playgrounds and sports grounds (tennis, football, baseball, basketball) lie in clearings of their own"]},{version:127,items:["Each kind of area has its own mix of tree heights and its own ruins, rocks and odd trees","The ground has shape: moonlit mounds, dark hollows and ridges where the area has them, and more pools in the boggy ones"]},{version:125,items:["Each forest now has its own kind of UK tree (oak, beech, Scots pine, yew…), in a range of heights, with leafy trunks"]},{version:124,items:["Speech bubbles are pixel outlines, and the emoji in them are bigger pixel art","Above the treetops she has momentum: hold a direction to build up to a boost (the camera draws back a little), swoop round in arcs, skid on a sharp turn, and glide when you let go. The ground stays snappy"]},{version:123,items:["Paths wind between the areas, their look changing with each area (dirt tracks, flagstones, root paths, boardwalks...), and some peter out","Old roads sweep across the forest, and two to four railway lines curve across it, broken in places with trees growing between the sleepers","Bushes crowd along the edges of paths and tracks","Streams wind through the forest, and join the wet areas","Ruins, rocks and strange trees turn up here and there to discover","You start sitting on the terrace of the witch's treehouse, by the dancefloor; move or rise to take off"]},{version:117,items:["Removed the diagonal stripes across the forest (moonbeams are off; ?moonbeams=on brings them back)","When a tree stands in front of the witch, you now see her through a soft round window that fades in gently, not a square"]},{version:116,items:["Land first to talk or to put down and pick up sigils, with new poses","Talking to a creature keeps its progress for a while if you break off","Placed sigils show above the canopy from the treetops","Waves every 5 minutes by default; pick how often on this screen","A small arrow points the way to the music","Slower lasers, party motes drifting over whole areas, and party light on the treetops","Woods have groves, thickets, glades and lone trees, and areas blend into each other","G shows metre rulers and a ground grid"]},{version:111,items:["The witch's glow lights up a much wider pool of forest round her","Fewer bushes"]},{version:108,items:["Trees no longer pop in and out as you fly","The witch is never lost: tall things in front of her fade, and her silhouette shows through"]},{version:105,items:["No more speech icons over every creature in range"]},{version:99,items:["String lights hang in long garlands from tree to tree","Soundsystems face different ways","Set pieces are bigger, and areas have ragged edges"]},{version:93,items:["The witch has rise and descend poses","Sigils show rings, and creatures show when they're ready to talk"]}],SS={entries:wS},nn=new URLSearchParams(location.search);let Ns=Fm(nn.get("seed"));Ns===null&&(Ns=Math.floor(Math.random()*1e6),nn.set("seed",String(Ns)),history.replaceState(null,"","?"+nn.toString()+location.hash));const bt={...ji,bloom:{...ji.bloom},tiltShift:{...ji.tiltShift,treetop:{...ji.tiltShift.treetop}},shadows:{...ji.shadows},canopyShadow:{...ji.canopyShadow},mist:{...ji.mist},party:{...ji.party}};nn.get("shadows")==="off"&&(bt.shadows.on=!1);nn.get("canopy")==="off"&&(bt.canopyShadow.on=!1);nn.get("mist")==="off"&&(bt.mist.on=!1);const As=nn.get("tilt");if(As==="off")bt.tiltShift.on=!1;else if(As==="before"||As==="after")bt.tiltShift.on=!0,bt.tiltShift.where=As;else if(As&&/^[\d.]+(,[\d.]+)?$/.test(As)){const[n,e]=As.split(",").map(Number);bt.tiltShift.on=!0,bt.tiltShift.treetop.strength=n,e>0&&(bt.tiltShift.treetop.band=e)}nn.get("bloom")==="off"&&(bt.bloom.on=!1);nn.get("moonbeams")==="on"&&(bt.moonbeams=1);const Wl=nn.get("rune");Wl&&["beam","column","both"].includes(Wl)&&(bt.runeMarkers={...bt.runeMarkers,awakeStyle:Wl});const Vl=nn.get("picker");Vl&&["noisy","near3","near3touch","nearest"].includes(Vl)&&(bt.party.picker=Vl);const vr=nn.get("glow")?.split(",").map(Number);vr&&vr[0]>0&&(bt.glowReach=vr[0],bt.glowFixed=!0);vr&&vr[1]>0&&(bt.glowFalloff=vr[1]);const Yl=nn.get("blend");if(Yl==="off")bt.groundBlend={...bt.groundBlend,on:!1};else if(Yl){const[n,e,t]=Yl.split(",").map(Number);bt.groundBlend={...bt.groundBlend,warp:n||0,fine:e||0,band:t||0}}const Xl=nn.get("fx");(Xl==="pixel"||Xl==="smooth")&&(bt.fx=Xl);const on=v1(Ns,bt),M0=[30,60,120,300,600,0];function v0(n){bt.party.interval=n>0?n:1e9,on.party.paused=n===0,on.party.nextAt=on.clock.time+bt.party.startDelay+bt.party.interval,document.querySelectorAll("#waves button").forEach(e=>e.classList.toggle("on",+e.dataset.s===n))}let Nh=bt.party.interval;try{const n=localStorage.getItem("witch.wave");n!==null&&M0.includes(+n)&&(Nh=+n)}catch{}const Kl=nn.get("wave");Kl!==null&&(Nh=Kl==="off"?0:Math.max(0,+Kl||0));const ES=document.getElementById("game"),ql=yS(),Fh={viewStart:performance.now(),view:0,ready:0},Fn=new gS(ES,on,{...ql,pixel:bt.pixelSize,treeSize:ql.treeSize*bt.treeHeight,crownWidth:ql.crownWidth*bt.crownWidth/bt.treeHeight});Fh.view=performance.now();Fn.debugCull=nn.get("debug")==="cull";Fn.quick=nn.get("quick")==="1";const kd=Number(nn.get("scenery"));nn.has("scenery")&&kd>0&&(Fn.sceneryFixed=kd);const Nr=new aM;document.getElementById("next-wave").addEventListener("pointerdown",n=>{n.preventDefault(),Nr.touch.nextWave=!0});document.getElementById("pause-waves").addEventListener("pointerdown",n=>{n.preventDefault(),Nr.touch.pauseWaves=!0});_S(document.body,Nr.touch);Fn.rulers.on=nn.has("debug");const b0=()=>{Fn.rulers.on=!Fn.rulers.on};window.addEventListener("keydown",n=>{n.code==="KeyG"&&!n.repeat&&b0()});window.addEventListener("keydown",n=>{n.code==="KeyM"&&!n.repeat&&(Fn.minimap.on=!Fn.minimap.on)});document.getElementById("rulers").addEventListener("pointerdown",n=>{n.preventDefault(),b0()});const y0=document.getElementById("help");try{localStorage.getItem("witch.help")==="off"&&y0.classList.add("off")}catch{}window.addEventListener("keydown",n=>{if(n.code!=="KeyH"||n.repeat)return;const e=y0.classList.toggle("off");try{localStorage.setItem("witch.help",e?"off":"on")}catch{}});document.getElementById("version").textContent="v186 · bc10102";const AS=document.getElementById("news"),TS="v186 · bc10102".split(" ")[0],RS=n=>n.replace(/[&<>]/g,e=>({"&":"&amp;","<":"&lt;",">":"&gt;"})[e]);AS.innerHTML="<b>What's new</b>"+SS.entries.filter(n=>n.items.length).slice(0,3).map(n=>`<div>${n.version===null?`${TS} (this version)`:"v"+n.version}</div><ul>${n.items.map(e=>`<li>${RS(e)}</li>`).join("")}</ul>`).join("");const CS=document.getElementById("seed");CS.innerHTML=`seed <a href="?seed=${Ns}">${Ns}</a>`;const Zc=document.getElementById("debug"),kh=document.getElementById("start"),_0=document.getElementById("debug-buttons"),Uh=document.getElementById("wave"),LS=Uh.querySelector(".fill"),PS=Uh.querySelector(".label");let cs=nn.has("debug");Zc.classList.toggle("on",cs);_0.classList.toggle("on",cs);const w0=()=>Fn.resize(window.innerWidth,window.innerHeight);window.addEventListener("resize",w0);w0();let Tr=!1;const Bh=document.getElementById("progress"),DS=Bh.querySelector(".fill"),IS=Bh.querySelector(".label"),OS=setInterval(()=>{const n=Fn.assets,e=n.done,t=e+n.pending;DS.style.width=`${t?100*e/t:0}%`,IS.textContent=Tr?`the rest of the forest, in the background: ${e} of ${t}`:`growing the forest: ${e} of ${t}`,Tr&&!n.pending&&(Bh.classList.add("done"),clearInterval(OS))},250);requestAnimationFrame(()=>setTimeout(async()=>{await Fn.prepare(),Tr=!0,Fh.ready=performance.now(),kh.classList.remove("loading")},0));let Ud=null;function S0(){if(!Tr||!on.clock.paused)return!1;try{Ud??=new AudioContext,Ud.resume()}catch{}return on.clock.paused=!1,kh.style.display="none",Nr.clearPresses(),!0}Nr.onAny=S0;kh.addEventListener("pointerdown",n=>{n.preventDefault(),S0()});const E0=document.getElementById("waves");E0.innerHTML="waves every "+M0.map(n=>`<button type="button" data-s="${n}">${n===0?"off":n<60?n+" s":n/60+" min"}</button>`).join("");E0.addEventListener("pointerdown",n=>{n.stopPropagation();const e=n.target.closest("button");if(!e)return;const t=+e.dataset.s;v0(t);try{localStorage.setItem("witch.wave",String(t))}catch{}});v0(Nh);document.addEventListener("visibilitychange",()=>{document.hidden&&(co=0)});let Bd=0,co=0,zd=60,$l=0,Ja=0;function A0(n){requestAnimationFrame(A0);const e=co?(n-co)/1e3:0;co=n,$l++,Ja+=e,Ja>=.5&&(zd=$l/Ja,$l=0,Ja=0);const t=Nr.read();if(t.debug&&(cs=!cs,Zc.classList.toggle("on",cs),_0.classList.toggle("on",cs)),Fn.debugReadouts=cs,b1(on,t,e),!Tr)return;const i=sc(on.party,on.map,on.clock.time);LS.style.height=`${(1-i.gone)*100}%`;const s=bt.party.interval>=1e9?"waves off":i.left>=60?`${Math.floor(i.left/60)}:${String(Math.ceil(i.left)%60).padStart(2,"0")}`:`${Math.ceil(i.left)} s`;if(PS.textContent=`wave ${on.party.wave} · ${on.party.areas.size} areas · ${s}`,Uh.classList.toggle("paused",on.party.paused),!(on.clock.paused&&n-Bd<300)&&(Bd=n,Fn.render(on.clock.time),cs)){const r=on.witch,a=Fn.stats;Zc.textContent=[`fps    ${zd.toFixed(0)}`,`seed   ${Ns}`,`area   ${Sf(on)}`,`mode   ${r.mode}`,`at     ${r.x.toFixed(0)}, ${r.z.toFixed(0)} m   zoom ${on.camera.zoomStep}`,`trees  ${a.trees}  bushes ${a.bushes}  creatures ${a.creatures}`,`budget scenery to ${a.sceneryRadius.toFixed(0)} m (${a.scenery})  gameplay ${a.gameplay}  dropped ${a.dropped}`,`draws  ${a.drawCalls}  art queued ${a.pendingArt}  ground tiles ${a.pendingGround}`].join(`
`)}}requestAnimationFrame(A0);window.witch={game:on,view:Fn,areaUnderWitch:()=>Sf(on),areaTypeId:n=>vt[n].id,spriteUp:()=>_t.uUp.value,loadTimes:Fh,get ready(){return Tr}};
