(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);new MutationObserver(r=>{for(const a of r)if(a.type==="childList")for(const o of a.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&i(o)}).observe(document,{childList:!0,subtree:!0});function t(r){const a={};return r.integrity&&(a.integrity=r.integrity),r.referrerPolicy&&(a.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?a.credentials="include":r.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function i(r){if(r.ep)return;r.ep=!0;const a=t(r);fetch(r.href,a)}})();function Aa(n){let e=n>>>0;return()=>{e=e+1831565813>>>0;let t=e;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}}function Nt(n,e,t){let i=Math.imul(n|0,374761393)^Math.imul(e|0,668265263)^Math.imul(t|0,2147483647);return i=Math.imul(i^i>>>13,1274126177),((i^i>>>16)>>>0)/4294967296}function dc(n,e,t){const i=Math.floor(n),r=Math.floor(e),a=n-i,o=e-r,l=a*a*(3-2*a),c=o*o*(3-2*o),u=Nt(i,r,t),h=Nt(i+1,r,t),f=Nt(i,r+1,t),d=Nt(i+1,r+1,t);return u+(h-u)*l+(f-u)*c+(u-h-f+d)*l*c}const li=(n,e,t)=>n+(e-n)*t,Mr=(n,e,t)=>Math.min(t,Math.max(e,n)),ea=n=>{const e=Mr(n,0,1);return e*e*(3-2*e)};function Jh(n,e,t,i){const r=Math.max(1,n.camera.zoomSteps),a=Mr(Math.round(n.camera.startZoom),0,r-1),o=r>1?a/(r-1):0;return{zoomStep:a,zoom:o,tx:e,ty:t,tz:i,vx:0,vy:0,vz:0,ax:0,az:0,lift:0}}function Ks(n,e,t,i,r){const a=i*r,o=Math.exp(-a),l=n-t,c=e+i*l;return[t+(l+c*r)*o,(e-i*c*r)*o]}function Qh(n,e,t,i,r,a,o){const l=o.camera,c=Math.max(1,l.zoomSteps),u=Mr(n.zoomStep+Math.sign(e),0,c-1),h=c>1?u/(c-1):0;let f=i.x*l.lookAhead,d=i.z*l.lookAhead;const p=Math.hypot(f,d);p>l.lookAheadMax&&(f*=l.lookAheadMax/p,d*=l.lookAheadMax/p);const g=1-Math.exp(-l.lookAheadEase*a),x=n.ax+(f-n.ax)*g,M=n.az+(d-n.az)*g,[m,_]=Ks(n.tx,n.vx,t.x+x,l.follow,a),[y,S]=Ks(n.ty,n.vy,t.y,l.follow,a),[R,A]=Ks(n.tz,n.vz,t.z+M,l.follow,a),D=n.zoom+(h-n.zoom)*(1-Math.exp(-l.zoomEase*a)),b=n.lift+(r-n.lift)*(1-Math.exp(-l.liftEase*a));return{zoomStep:u,zoom:D,tx:m,ty:y,tz:R,vx:_,vy:S,vz:A,ax:x,az:M,lift:Mr(b,0,1)}}function jh(n,e,t){const i=t.camera.ground,r=t.camera.treetop,a=ea(e),o=li(li(i.angleIn,i.angleOut,n.zoom),li(r.angleIn,r.angleOut,n.zoom),a),l=li(li(i.distanceIn,i.distanceOut,n.zoom),li(r.distanceIn,r.distanceOut,n.zoom),a),c=o*Math.PI/180;return{angle:o,distance:l,x:n.tx,y:n.ty+Math.sin(c)*l,z:n.tz+Math.cos(c)*l,tx:n.tx,ty:n.ty,tz:n.tz}}const ed=.1,td=()=>({time:0,paused:!0});function nd(n,e){if(n.paused||!(e>0))return 0;const t=Math.min(ed,e);return n.time+=t,t}const id={moor:{treeDensity:.4},"fern-forest":{treeDensity:1},"muddy-forest":{treeDensity:1},"stone-shrine":{treeDensity:.3},"tangly-forest":{treeDensity:1},"wispy-forest":{treeDensity:1},"hazel-forest":{treeDensity:1},garden:{treeDensity:.6},"twiggy-forest":{treeDensity:1},ancient:{treeDensity:.9},norway:{treeDensity:1},"alder-forest":{treeDensity:.9},meadow:{treeDensity:.2},"old-oaks":{treeDensity:.9},"berry-thicket":{treeDensity:1},wetland:{treeDensity:.6},stream:{treeDensity:.7},"rocky-slope":{treeDensity:.6},bog:{treeDensity:.5},deadwood:{treeDensity:.8},"cave-mouth":{treeDensity:.6},grassland:{treeDensity:.2},"beaver-pond":{treeDensity:.8},"log-pile":{treeDensity:.7},heath:{treeDensity:.4},"old-pinewood":{treeDensity:1},ravine:{treeDensity:.6},"bluebell-glade":{treeDensity:.8},"holly-thicket":{treeDensity:1},"honeysuckle-tangle":{treeDensity:1}},rd={types:id};function Pu(n,e){if(typeof document<"u"){const t=document.createElement("canvas");return t.width=n,t.height=e,t}return new OffscreenCanvas(n,e)}function Dl(n){let e=n>>>0;return()=>{e=e+1831565813>>>0;let t=e;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}}const ce=(n,e,t)=>e+(t-e)*n(),Pl=(n,e)=>e[Math.floor(n()*e.length)];function Bt(n,e,t){let i=Math.imul(n|0,374761393)^Math.imul(e|0,668265263)^Math.imul(t|0,2147483647);return i=Math.imul(i^i>>>13,1274126177),((i^i>>>16)>>>0)/4294967296}function di(n,e,t){const i=Math.floor(n),r=Math.floor(e),a=n-i,o=e-r,l=a*a*(3-2*a),c=o*o*(3-2*o),u=Bt(i,r,t),h=Bt(i+1,r,t),f=Bt(i,r+1,t),d=Bt(i+1,r+1,t);return u+(h-u)*l+(f-u)*c+(u-h-f+d)*l*c}function me(n,e,t){n=(n%1+1)%1,e=Math.max(0,Math.min(1,e)),t=Math.max(0,Math.min(1,t));const i=Math.floor(n*6),r=n*6-i,a=t*(1-e),o=t*(1-r*e),l=t*(1-(1-r)*e),[c,u,h]=[[t,l,a],[o,t,a],[a,t,l],[a,o,t],[l,a,t],[t,a,o]][i%6];return[Math.round(c*255),Math.round(u*255),Math.round(h*255)]}const s={BODY:1,BELLY:2,ACCENT:3,EYE:4,GLINT:5,TRUNK:6,LEAF:7,LEAF2:8,CLOTH:9,SKIN:10,HAIR:11,BROOM:12,STRAW:13,BODY2:14,BARK2:15,FLOWER:16,PUPIL:17,MAGIC:18,BARKD:19,LINE:20,IRIS:21,MAGIC2:22,NOSE:23,EAR:24,BODY3:25,LEAF3:26,BARKL:27,HAT:28,PHONES:29,TOP:30,JACKET:31,JEANS:32,SHOES:33,WATER:34,STONE:35,STONED:36,MOSS:37,RUNE:39,GLOW:40,WOOD:41,COLLAR:42,HAT1:43,HAT2:44,POM:45,SHADES:46,FRAME:47,SHOE:48,SOLE:49,WOKEN:50,WEB:51},ad=new Set([s.GLINT,s.MAGIC,s.MAGIC2,s.RUNE,s.GLOW,s.COLLAR,s.WOKEN]);function fc(n,e=!0,t=8){const i=n.length,r=[];if(i<3)return n.slice();const a=l=>e?n[(l+i)%i]:n[Math.max(0,Math.min(i-1,l))],o=e?i:i-1;for(let l=0;l<o;l++){const c=a(l-1),u=a(l),h=a(l+1),f=a(l+2),d=Math.max(2,Math.ceil(Math.hypot(h[0]-u[0],h[1]-u[1])/1.5),t);for(let p=0;p<d;p++){const g=p/d,x=g*g,M=x*g;r.push([0,1].map(m=>.5*(2*u[m]+(-c[m]+h[m])*g+(2*c[m]-5*u[m]+4*h[m]-f[m])*x+(-c[m]+3*u[m]-3*h[m]+f[m])*M)))}}return e||r.push(n[i-1]),r}function sd(n,{cap:e=1,capEnd:t=e}={}){const i=[],r=[],a=n.length;for(let c=0;c<a;c++){const u=n[Math.max(0,c-1)],h=n[Math.min(a-1,c+1)];let f=h[0]-u[0],d=h[1]-u[1];const p=Math.hypot(f,d)||1;f/=p,d/=p;const g=n[c][2]/2;i.push([n[c][0]-d*g,n[c][1]+f*g]),r.push([n[c][0]+d*g,n[c][1]-f*g])}const o=(c,u,h,f)=>{let d=c[0]-u[0],p=c[1]-u[1];const g=Math.hypot(d,p)||1;return[c[0]+d/g*h/2*f,c[1]+p/g*h/2*f]};return[...i,o(n[a-1],n[a-2],n[a-1][2],t),...r.reverse(),o(n[0],n[1],n[0][2],e)]}const mt=(n,e)=>[n[0]+e[0],n[1]+e[1]],En=(n,e,t)=>[n[0]+(e[0]-n[0])*t,n[1]+(e[1]-n[1])*t];function Fs(n,e,t,i,r,a=1){const o=[];for(let l=0;l<n.length;l++){if(o.push(n[l]),l<e||l>=t)continue;const c=n[l],u=n[(l+1)%n.length];let h=u[0]-c[0],f=u[1]-c[1];const d=Math.hypot(h,f)||1,p=f/d*a,g=-h/d*a;for(let x=1;x<=i;x++){const M=(x-.5)/i,m=En(c,u,M),_=[m[0]+p*r-h/d*r*.5,m[1]+g*r-f/d*r*.5];o.push(En(c,u,M-.45/i),_,En(c,u,M+.35/i))}}return o}function pc(n,e,t){const i=new Uint8Array(n*e);let r=1/0,a=-1/0;for(const o of t)r=Math.min(r,o[1]),a=Math.max(a,o[1]);for(let o=Math.max(0,Math.floor(r));o<=Math.min(e-1,Math.ceil(a));o++){const l=o+.5,c=[];for(let u=0,h=t.length-1;u<t.length;h=u++){const[f,d]=t[u],[p,g]=t[h];d>l!=g>l&&c.push(f+(l-d)/(g-d)*(p-f))}c.sort((u,h)=>u-h);for(let u=0;u+1<c.length;u+=2)for(let h=Math.max(0,Math.ceil(c[u]-.5));h<=Math.min(n-1,Math.floor(c[u+1]-.5));h++)i[o*n+h]=1}return i}function od(n,e,t){const r=new Float32Array(n*e),a=new Float32Array(n*e);for(let c=0;c<n*e;c++)t[c]&&(r[c]=1e4,a[c]=1e4);const o=c=>r[c]*r[c]+a[c]*a[c],l=(c,u,h,f,d)=>{const p=u+f,g=h+d;let x,M;if(p<0||g<0||p>=n||g>=e)x=f,M=d;else{const m=g*n+p;x=r[m]+f,M=a[m]+d}x*x+M*M<o(c)&&(r[c]=x,a[c]=M)};for(let c=0;c<e;c++){for(let u=0;u<n;u++){const h=c*n+u;t[h]&&(l(h,u,c,-1,0),l(h,u,c,0,-1),l(h,u,c,-1,-1),l(h,u,c,1,-1))}for(let u=n-1;u>=0;u--){const h=c*n+u;t[h]&&l(h,u,c,1,0)}}for(let c=e-1;c>=0;c--){for(let u=n-1;u>=0;u--){const h=c*n+u;t[h]&&(l(h,u,c,1,0),l(h,u,c,0,1),l(h,u,c,1,1),l(h,u,c,-1,1))}for(let u=0;u<n;u++){const h=c*n+u;t[h]&&l(h,u,c,-1,0)}}return{vx:r,vy:a}}class qt{constructor(e,t,i=1){this.sx=i,this.w=Math.round(e*i),this.h=t|0,this.m=new Uint8Array(this.w*this.h),this.n=new Float32Array(this.w*this.h*3),this.g=new Uint8Array(this.w*this.h)}inb(e,t){return e>=0&&t>=0&&e<this.w&&t<this.h}get(e,t){return e|=0,t|=0,this.inb(e,t)?this.m[t*this.w+e]:0}put(e,t,i,r=0,a=0,o=1){this.px(e*this.sx,t,i,r,a,o)}px(e,t,i,r=0,a=0,o=1){if(e=Math.floor(e),t=Math.floor(t),!this.inb(e,t))return;const l=t*this.w+e;this.m[l]=i,this.n[l*3]=r,this.n[l*3+1]=a,this.n[l*3+2]=o}recolour(e,t,i){e=Math.floor(e),t=Math.floor(t),this.inb(e,t)&&this.m[t*this.w+e]&&(this.m[t*this.w+e]=i)}ellipse(e,t,i,r,a,o={}){const{onlyOn:l,density:c=1,noise:u=0,seed:h=0,round:f=1}=o;e*=this.sx,i*=this.sx;for(let d=Math.max(0,Math.floor(t-r-1));d<Math.min(this.h,t+r+1);d++)for(let p=Math.max(0,Math.floor(e-i-1));p<Math.min(this.w,e+i+1);p++){const g=(p+.5-e)/i,x=(d+.5-t)/r,M=g*g+x*x;if(M>1)continue;const m=d*this.w+p;if(l&&!l.has(this.m[m]))continue;if(c<1){const R=u?di(p/3.2,d/3.2,h)*u+(1-u)*.5:.5;if(Bt(p,d,h+77)>c*(.4+R*1.2)*(1.15-M*.5))continue}const _=g*f,y=x*f,S=Math.hypot(_,y,Math.sqrt(Math.max(0,1-M))+.15);this.px(p,d,a,_/S,y/S,(Math.sqrt(Math.max(0,1-M))+.15)/S)}}line(e,t,i,r,a,o,l,c=1){e*=this.sx,i*=this.sx;const u=Math.max(1,Math.ceil(Math.hypot(i-e,r-t)));for(let h=0;h<=u;h++){const f=h/u,d=e+(i-e)*f,p=t+(r-t)*f,g=Math.max(.5,(a+(o-a)*f)/2);for(let x=Math.floor(p-g);x<=p+g;x++)for(let M=Math.floor(d-g);M<=d+g;M++){const m=(M+.5-d)/g,_=(x+.5-p)/g;if(m*m+_*_>1)continue;const y=m*c,S=Math.hypot(y,_*.3,1);this.px(M,x,l,y/S,_*.3/S,1/S)}}}tri(e,t){let[[i,r],[a,o],[l,c]]=e;i*=this.sx,a*=this.sx,l*=this.sx;const u=(g,x,M,m,_,y)=>(g-_)*(m-y)-(M-_)*(x-y),h=Math.max(0,Math.floor(Math.min(i,a,l))),f=Math.min(this.w,Math.ceil(Math.max(i,a,l))),d=Math.max(0,Math.floor(Math.min(r,o,c))),p=Math.min(this.h,Math.ceil(Math.max(r,o,c)));for(let g=d;g<p;g++)for(let x=h;x<f;x++){const M=x+.5,m=g+.5,_=u(M,m,i,r,a,o),y=u(M,m,a,o,l,c),S=u(M,m,l,c,i,r);(_<0||y<0||S<0)&&(_>0||y>0||S>0)||this.px(x,g,t,0,-.2,.98)}}shape(e,t,i={}){return this.fillMask(pc(this.w,this.h,fc(e,!0,i.per||6)),t,i)}limb(e,t,i={}){return this.shape(sd(e,i),t,i)}fillMask(e,t,{group:i=1,line:r=!1,depth:a=0,round:o=1,onlyOn:l=null,keepNormals:c=!1,tilt:u=[0,0],lineMat:h=s.LINE}={}){const{w:f,h:d}=this;if(l)for(let M=0;M<f*d;M++)e[M]&&!l.has(this.m[M])&&(e[M]=0);const{vx:p,vy:g}=od(f,d,e);let x=a;if(!x){for(let M=0;M<f*d;M++)e[M]&&(x=Math.max(x,Math.hypot(p[M],g[M])));x=Math.max(1.5,Math.min(x*.9,2.5+x*.35))}for(let M=0;M<d;M++)for(let m=0;m<f;m++){const _=M*f+m;if(!e[_])continue;if(c){this.m[_]=t;continue}const y=Math.hypot(p[_],g[_]),S=Math.min(1,Math.max(0,(y-.5)/x)),R=Math.min(2.6,(1-S)/Math.sqrt(Math.max(.02,1-(1-S)*(1-S))))*o;let A=p[_]/(y||1)*R+u[0],D=g[_]/(y||1)*R+u[1];const b=Math.hypot(A,D,1);this.m[_]=t,this.n[_*3]=A/b,this.n[_*3+1]=D/b,this.n[_*3+2]=1/b}if(r&&!c){const M=[];for(let m=0;m<d;m++)for(let _=0;_<f;_++){const y=m*f+_;if(e[y])for(const[S,R]of[[1,0],[-1,0],[0,1],[0,-1]]){const A=_+S,D=m+R;if(A<0||D<0||A>=f||D>=d)continue;const b=D*f+A;if(!e[b]&&this.m[b]&&this.g[b]!==i&&this.m[b]!==h){M.push(y);break}}}for(const m of M)this.m[m]=h}if(!c)for(let M=0;M<f*d;M++)e[M]&&(this.g[M]=i);return e}mark(e,t,i,r={}){return this.fillMask(pc(this.w,this.h,fc(e,!0,6)),t,{...r,onlyOn:new Set(i),keepNormals:!0})}grid(e,t,i=0,r=0,{round:a=1,flipX:o=!1}={}){const l=Math.max(...e.map(h=>h.length)),c=new Uint8Array(this.w*this.h),u=new Map;e.forEach((h,f)=>[...h].forEach((d,p)=>{const g=t[d];if(!g)return;const x=i+(o?l-1-p:p),M=r+f;this.inb(x,M)&&(c[M*this.w+x]=1,u.set(M*this.w+x,g))})),this.fillMask(c,s.BODY,{round:a,depth:2.5});for(const[h,f]of u)this.m[h]=f}}function $r(n,e,t,i=t.outline,r=Pu){const{w:a,h:o}=n,l=()=>r(a,o),c=l(),u=l(),h=l(),f=c.getContext("2d").createImageData(a,o),d=u.getContext("2d").createImageData(a,o),p=h.getContext("2d").createImageData(a,o),g=i==="none"?null:i==="dark"?[22,18,30]:"tint";for(let x=0;x<o;x++)for(let M=0;M<a;M++){const m=x*a+M,_=n.m[m],y=m*4;if(!_){if(!g)continue;const b=[n.get(M+1,x),n.get(M-1,x),n.get(M,x+1),n.get(M,x-1)].find(L=>L);if(!b)continue;const w=g==="tint"?(e[b]||[0,0,0]).map(L=>L*.35|0):g;f.data.set([...w,255],y),d.data.set([128,128,255,255],y),p.data.set([128,128,255,255],y);continue}let S=e[_];_===s.LINE&&!S&&(S=g==="tint"||!g?(e[s.BODY2]||[0,0,0]).map(b=>b*.55|0):g),S=S||[255,0,255],f.data.set([...S,ad.has(_)?254:255],y);const R=n.n[m*3],A=n.n[m*3+1],D=n.n[m*3+2];d.data.set([R*127+128,A*127+128,D*255,255],y),p.data.set([-R*127+128,A*127+128,D*255,255],y)}return c.getContext("2d").putImageData(f,0,0),u.getContext("2d").putImageData(d,0,0),h.getContext("2d").putImageData(p,0,0),{A:c,N:u,NF:h,w:a,h:o}}const ji=n=>{const e=Math.hypot(n[0],n[1],n[2])||1;return[n[0]/e,n[1]/e,n[2]/e]},Ea=(n,e)=>[n[1]*e[2]-n[2]*e[1],n[2]*e[0]-n[0]*e[2],n[0]*e[1]-n[1]*e[0]],Ht=(n,e)=>n[0]*e[0]+n[1]*e[1]+n[2]*e[2],zn=(n,e)=>[n[0]-e[0],n[1]-e[1],n[2]-e[2]],E={add:(n,e)=>[n[0]+e[0],n[1]+e[1],n[2]+e[2]],sub:zn,mul:(n,e)=>[n[0]*e,n[1]*e,n[2]*e],lerp:(n,e,t)=>[n[0]+(e[0]-n[0])*t,n[1]+(e[1]-n[1])*t,n[2]+(e[2]-n[2])*t],norm:ji,cross:Ea,dot:Ht};function gc(n,e=[0,1,0]){const t=ji(n);let i=Ea(e,t);Math.hypot(...i)<1e-4&&(i=Ea([0,0,1],t)),i=ji(i);const r=Ea(t,i);return[t,r,i]}function Ou(n,e){const t=Ht(n,e.axes[0]),i=Ht(n,e.axes[1]),r=Ht(n,e.axes[2]),[a,o,l]=e.r,c=Math.hypot(t/a,i/o,r/l),u=Math.hypot(t/(a*a),i/(o*o),r/(l*l));return u>1e-9?c*(c-1)/u:-Math.min(a,o,l)}function Iu(n,e){const{ba:t,l2:i,rr:r,a2:a,il2:o,r1:l,r2:c}=e,u=Ht(n,t),h=u-i,f=[n[0]*i-t[0]*u,n[1]*i-t[1]*u,n[2]*i-t[2]*u],d=Ht(f,f),p=u*u*i,g=h*h*i,x=Math.sign(r)*r*r*d;return Math.sign(h)*a*g>x?Math.sqrt(d+g)*o-c:Math.sign(u)*a*p<x?Math.sqrt(d+p)*o-l:(Math.sqrt(d*a*o)+u*r)*o-l}function Nu(n,e){const t=Math.abs(Ht(n,e.axes[0]))-e.h[0]+e.round,i=Math.abs(Ht(n,e.axes[1]))-e.h[1]+e.round,r=Math.abs(Ht(n,e.axes[2]))-e.h[2]+e.round;return Math.hypot(Math.max(t,0),Math.max(i,0),Math.max(r,0))+Math.min(Math.max(t,i,r),0)-e.round}const ld=(n,e)=>e*(Math.sin(n[0]*23+n[1]*7)*Math.sin(n[1]*19-n[2]*11)+.5*Math.sin(n[2]*41+n[0]*29)),mc=(n,e)=>n.type==="ell"?Ou(zn(e,n.cw),n):n.type==="box"?Nu(zn(e,n.cw),n):Iu(zn(e,n.aw),n),aa=(n,e)=>n.rough?mc(n,e)+ld(e,n.rough):mc(n,e);class it{constructor({blend:e=.07}={}){this.parts=[],this.flats=[],this.blend=e,this.anchors={feet:[]}}ell(e,t,i,r={}){const a=r.axes||(r.dir?gc(r.dir,r.up):[[1,0,0],[0,1,0],[0,0,1]]);return this.parts.push({type:"ell",c:e,r:t,axes:a,mat:i,group:r.group??1,extra:!!r.extra,paint:r.paint,rough:r.rough,cut:!!r.cut}),this}box(e,t,i,r={}){const a=r.axes||(r.dir?gc(r.dir,r.up):[[1,0,0],[0,1,0],[0,0,1]]);return this.parts.push({type:"box",c:e,h:t,round:Math.min(r.round??.02,...t),axes:a,mat:i,group:r.group??1,extra:!!r.extra,paint:r.paint,rough:r.rough,cut:!!r.cut}),this}seg(e,t,i,r,a,o={}){return this.parts.push({type:"cone",a:e,b:t,r1:i,r2:r,mat:a,group:o.group??1,extra:!!o.extra,paint:o.paint,rough:o.rough,cut:!!o.cut}),this}chain(e,t,i={}){for(let r=0;r+1<e.length;r++)this.seg(e[r].slice(0,3),e[r+1].slice(0,3),e[r][3],e[r+1][3],t,i);return this}flat(e,t,i,r,a,o,l={}){return this.flats.push({c:e,u:ji(t),v:ji(i),su:r,sv:a,mask:o,group:l.group??30,extra:!!l.extra,bend:l.bend??.35}),this}field(e){let t=1/0;for(const i of this.parts){if(i.extra||i.cut)continue;let r;if(i.type==="ell")r=Ou(zn(e,i.c),i);else if(i.type==="box")r=Nu(zn(e,i.c),i);else{const a=zn(i.b,i.a),o=Math.max(1e-9,Ht(a,a)),l=i.r1-i.r2;r=Iu(zn(e,i.a),{ba:a,l2:o,rr:l,a2:o-l*l,il2:1/o,r1:i.r1,r2:i.r2})}r<t&&(t=r)}return t}static surface(e,t,i){const r=1/Math.hypot(i[0]/t[0],i[1]/t[1],i[2]/t[2]);return[e[0]+i[0]*r,e[1]+i[1]*r,e[2]+i[2]*r]}}const Mc={towards:.6,away:-.6},cd=.52;function Ii(n,{height:e,scale:t,facing:i="towards",yaw:r=Mc[i]??Mc.towards,pitch:a=cd,lineGap:o=.12}={}){const l=Math.cos(r),c=Math.sin(r),u=Math.cos(a),h=Math.sin(a),f=G=>[G[0]*l-G[2]*c,G[1],G[0]*c+G[2]*l],d=G=>[G[0]*l+G[2]*c,G[1],-G[0]*c+G[2]*l],p=[0,-h,-u],g=[0,u,-h],x=[1,0,0],M=[0,h,u],m=n.blend,_=n.parts.map(G=>{if(G.type==="ell"){const ze=f(G.c),Je=G.axes.map(f),$e=Math.max(...G.r);return{...G,cw:ze,axes:Je,bc:ze,br:$e+(G.rough||0)*1.5}}if(G.type==="box"){const ze=f(G.c),Je=G.axes.map(f);return{...G,cw:ze,axes:Je,bc:ze,br:Math.hypot(...G.h)+(G.rough||0)*1.5}}const he=f(G.a),se=f(G.b),Ae=zn(se,he),tt=Math.max(1e-9,Ht(Ae,Ae)),Oe=G.r1-G.r2;return{...G,aw:he,ba:Ae,l2:tt,rr:Oe,a2:tt-Oe*Oe,il2:1/tt,bc:E.lerp(he,se,.5),br:Math.sqrt(tt)/2+Math.max(G.r1,G.r2)}}),y=n.flats.map(G=>{const he=f(G.c),se=f(G.u),Ae=f(G.v);return{...G,cw:he,uw:se,vw:Ae,nw:ji(Ea(se,Ae)),bc:he,br:Math.hypot(G.su,G.sv)}}),S=[..._,...y],R=G=>{const he=Ht(G.bc,x),se=Ht(G.bc,g),Ae=G.br+(G.uw?0:m);return[he-Ae,he+Ae,se-Ae,se+Ae]};for(const G of S)[G.x0,G.x1,G.u0,G.u1]=R(G);const A=S.filter(G=>!G.extra&&!G.cut),D=Math.min(...A.map(G=>G.u0+(G.uw?0:m))),b=Math.max(...A.map(G=>G.u1-(G.uw?0:m))),w=t??e/Math.max(1e-6,b-D),L=Math.min(...S.map(G=>G.x0)),C=Math.max(...S.map(G=>G.x1)),I=Math.min(...S.map(G=>G.u0)),N=Math.max(...S.map(G=>G.u1)),O=Math.ceil((C-L)*w)+4,B=Math.ceil((N-I)*w)+2,W=new qt(O,B),$=new Float32Array(O*B).fill(1/0),ae=new Int16Array(O*B).fill(-1),q=8,ee=Math.ceil(O/q),F=Math.ceil(B/q),re=Array.from({length:ee*F},()=>[]);S.forEach((G,he)=>{const se=Math.max(0,Math.floor((G.x0-L)*w/q)),Ae=Math.min(ee-1,Math.floor(((G.x1-L)*w+2)/q)),tt=Math.max(0,Math.floor((N-G.u1)*w/q)),Oe=Math.min(F-1,Math.floor(((N-G.u0)*w+1)/q));for(let ze=tt;ze<=Oe;ze++)for(let Je=se;Je<=Ae;Je++)re[ze*ee+Je].push(he)});const ue=.25/w,Pe=(G,he)=>{const se=Math.max(m-Math.abs(G-he),0)/m;return Math.min(G,he)-se*se*m*.25};for(let G=0;G<B;G++)for(let he=0;he<O;he++){const se=re[Math.floor(G/q)*ee+Math.floor(he/q)];if(!se.length)continue;const Ae=L+(he+.5-1)/w,tt=N-(G+.5)/w,Oe=E.add(E.add(E.mul(x,Ae),E.mul(g,tt)),E.mul(M,50));let ze=1/0,Je=-1/0;const $e=[],Ct=[];for(const rt of se){const Ve=S[rt],P=zn(Oe,Ve.bc),v=Ht(P,p),U=Ve.br+(Ve.uw?0:m),V=Ht(P,P)-U*U,Z=v*v-V;if(Z<0)continue;if(Ve.uw){Ct.push(Ve);continue}if(Ve.cut){$e.push(Ve);continue}const le=Math.sqrt(Z);ze=Math.min(ze,-v-le),Je=Math.max(Je,-v+le),$e.push(Ve)}let zt=1/0,an=-1,At=0,Lt=null;if($e.length){const rt=new Map;for(const v of $e){let U=rt.get(v.group);U||rt.set(v.group,U=[]),U.push(v)}const Ve=(v,U)=>{let V=1/0;for(const Z of v)Z.cut||(V=V===1/0?aa(Z,U):Pe(V,aa(Z,U)));for(const Z of v)Z.cut&&(V=Math.max(V,-aa(Z,U)));return V};let P=Math.max(0,ze);for(let v=0;v<96&&P<Je;v++){const U=E.add(Oe,E.mul(p,P));let V=1/0,Z=null;for(const[le,fe]of rt){const Q=Ve(fe,U);Q<V&&(V=Q,Z=le)}if(V<ue){const le=rt.get(Z),fe=.5/w;Lt=ji([Ve(le,[U[0]+fe,U[1],U[2]])-Ve(le,[U[0]-fe,U[1],U[2]]),Ve(le,[U[0],U[1]+fe,U[2]])-Ve(le,[U[0],U[1]-fe,U[2]]),Ve(le,[U[0],U[1],U[2]+fe])-Ve(le,[U[0],U[1],U[2]-fe])]);let Q=le[0],te=1/0;for(const pe of le){if(pe.cut)continue;const Ie=aa(pe,U);Ie<te&&(te=Ie,Q=pe)}for(const pe of le)if(pe.cut&&-aa(pe,U)>te-ue*2){Q=pe;break}zt=P,an=Z,At=Q.paint?Q.paint(d(U),Q)??Q.mat:Q.mat;break}P+=Math.max(V*.9,ue*.5)}}for(const rt of Ct){const Ve=Ht(p,rt.nw);if(Math.abs(Ve)<1e-4)continue;const P=Ht(zn(rt.cw,Oe),rt.nw)/Ve;if(P>=zt)continue;const v=E.add(Oe,E.mul(p,P)),U=zn(v,rt.cw),V=Ht(U,rt.uw)/rt.su,Z=Ht(U,rt.vw)/rt.sv;if(Math.abs(V)>1||Math.abs(Z)>1)continue;const le=rt.mask(V,Z);if(!le)continue;let fe=Ve>0?E.mul(rt.nw,-1):rt.nw;fe=ji(E.add(fe,E.add(E.mul(rt.uw,V*rt.bend),E.mul(rt.vw,Z*rt.bend*.5)))),zt=P,an=rt.group,At=le,Lt=fe}if(!Lt||!At)continue;const z=G*O+he;$[z]=zt,ae[z]=an,W.px(he,G,At,Ht(Lt,x),-Ht(Lt,g),Ht(Lt,M))}const He=[];for(let G=0;G<B;G++)for(let he=0;he<O;he++){const se=G*O+he;if(W.m[se])for(const[Ae,tt]of[[1,0],[-1,0],[0,1],[0,-1]]){const Oe=he+Ae,ze=G+tt;if(Oe<0||ze<0||Oe>=O||ze>=B)continue;const Je=ze*O+Oe;if(W.m[Je]&&ae[Je]!==ae[se]&&$[Je]-$[se]>o){He.push(se);break}}}for(const G of He)[s.EYE,s.GLINT,s.MAGIC,s.MAGIC2,s.NOSE,s.COLLAR,s.WOKEN,s.RUNE,s.GLOW].includes(W.m[G])||(W.m[G]=s.LINE);for(let G=0;G<B;G++)for(let he=0;he<O;he++){const se=G*O+he;if(W.m[se]!==s.EYE)continue;const Ae=G>0&&W.m[se-O]===s.EYE,tt=he>0&&W.m[se-1]===s.EYE,Oe=he+1<O&&W.m[se+1]===s.EYE&&G+1<B&&W.m[se+O]===s.EYE;!Ae&&!tt&&Oe&&(W.m[se]=s.GLINT)}let Xe=-1;for(let G=B-1;G>=0&&Xe<0;G--)for(let he=0;he<O;he++)if(W.m[G*O+he]){Xe=G;break}const j=Xe>=0&&Xe<B-1?B-1-Xe:0;if(Xe>=0&&Xe<B-1){const G=B-1-Xe;for(let he=B-1;he>=0;he--)for(let se=0;se<O;se++){const Ae=he*O+se,tt=(he-G)*O+se,Oe=he-G>=0;W.m[Ae]=Oe?W.m[tt]:0,W.g[Ae]=Oe?W.g[tt]:0;for(let ze=0;ze<3;ze++)W.n[Ae*3+ze]=Oe?W.n[tt*3+ze]:0}}return W.bodyH=Math.round((b-D)*w),{sp:W,s:w,project:G=>{const he=f(G);return[+((he[0]-L)*w+1).toFixed(1),+((N-Ht(he,g))*w+j).toFixed(1)]}}}const Qn=(n,e=9,t=.3)=>Bt(Math.floor(n[0]*e),Math.floor(n[1]*e)+Math.floor(n[2]*e)*97,7)<t,xr={wing:(n,e)=>(t,i)=>{const r=(t+1)/2,a=1-.35*r*r,o=-1+.55*r+.18*Math.abs(Math.sin(r*Math.PI*6));return i>a||i<o?null:i>a-.35*(1-r*.5)?e:Math.floor(r*9)%2?n:e},ear:(n,e=s.EAR,t=s.BODY3)=>(i,r)=>{const a=(r+1)/2,o=.95*Math.sin(Math.PI*Math.min(1,.15+a*.85))*(1-a*.35);return Math.abs(i)>o?null:a>.82?t:Math.abs(i)<o*.5&&a<.7&&a>.12?e:n},flame:(n,e)=>(t,i)=>{const r=(i+1)/2,a=Math.sin(Math.PI*Math.min(1,r*1.1))*(1-r)*1.4;return Math.abs(t)>a?null:Math.abs(t)<a*.45&&r<.6?e:n},membrane:n=>(e,t)=>{const i=(e+1)/2,r=-1+.35*Math.abs(Math.sin(i*Math.PI*3));return t<r||t>1-.2*i?null:n},spotted:(n,e,t)=>(i,r)=>{if(Math.hypot(i,r*1.2)>1)return null;const o=Math.hypot(i-.35,r-.1);return o<.18?t:o<.3?e:n}},ud={hair:s.HAIR,hat:s.HAT,headphones:s.PHONES,top:s.TOP,jacket:s.JACKET,jeans:s.JEANS,sneakers:s.SHOES,broom:s.BROOM,bristles:s.STRAW,skin:s.SKIN},xc={hair:[.01,.7,.85],hat:[.74,.45,.45],headphones:[.92,.55,.9],top:[.13,.15,.95],jacket:[.72,.45,.7],jeans:[.6,.5,.7],sneakers:[0,0,.95],broom:[.08,.55,.55],bristles:[.12,.55,.9],skin:[.07,.3,.94]};function hd(n,e=xc){const t={...xc,...e},i={hair:n.hairHue,jacket:n.cloakHue,hat:n.hatHue,top:n.topHue,jeans:n.jeansHue,sneakers:n.shoeHue,headphones:n.phonesHue},r={};for(const[a,o]of Object.entries(ud)){const[l,c,u]=t[a];r[o]=me(i[a]??l,c,u)}return r[s.EYE]=[24,18,30],r[s.GLINT]=[255,255,245],r[s.NOSE]=[20,16,24],r[s.MAGIC]=me(n.glowHue??.13,.5,1),r[s.MAGIC2]=me(n.glowHue??.13,.15,1),r[s.BELLY]=[245,245,240],r}const dd={rise:.78,descend:-.66,brake:.44};function fd(n){const e=new it({blend:.03}),t=n%3,i=.5,r=.05,a=[[0,.02,-.01],[.02,-.01,.02],[-.01,.015,.01]][t],o=g=>i-r*(g/.62);e.seg([-.5,o(-.5),0],[.62,o(.62),0],.022,.018,s.BROOM,{group:2}),e.ell([-.64,o(-.64)+.005,0],[.2,.1,.11],s.STRAW,{dir:[1,r*1.6,0],group:3,paint:g=>g[0]<-.76?s.MAGIC2:g[0]>-.5?s.BROOM:void 0});const l=[-1,1].map(g=>[.5,o(.5)+.03,g*.045]),c=[-1,1].map(g=>[.2,i+.24+a[1],g*.1]);for(const g of[0,1]){const x=g?1:-1,M=x>0?7:5;e.seg(c[g],l[g],.04,.03,s.JACKET,{group:M}),e.ell(l[g],[.035,.03,.035],s.SKIN,{group:M})}const u=[.3+a[0],i+.27+a[1],0],h=[.07,i+.28+a[1]*.5,0],f=[-.15,i+.35+a[2],0];e.ell(h,[.17,.1,.11],s.JACKET,{dir:[1,-.25,0],group:1,paint:g=>g[1]<h[1]-.04&&Math.abs(g[2])<.055?s.TOP:void 0}),e.ell(f,[.11,.08,.1],s.JEANS,{dir:[1,-.3,0],group:1}),e.chain([[...E.add(f,[-.02,.06,0]),.07],[...E.add(f,[-.18,.08+a[0]*2,0]),.05],[...E.add(f,[-.34,.05+a[1]*3,.02]),.025]],s.JACKET,{group:12}),[[[-.32,i+.5+a[1]*2,-.07],[-.46,i+.38+a[0]*2,-.08]],[[-.34,i+.33+a[2]*2,.08],[-.55,i+.44-a[1]*3,.1]]].forEach(([g,x],M)=>{const m=M?6:4,_=E.add(f,[-.04,0,M?.06:-.06]);e.seg(_,g,.055,.045,s.JEANS,{group:m}),e.seg(g,x,.045,.04,s.JEANS,{group:m}),e.ell(E.add(x,[-.05,0,0]),[.08,.04,.045],s.SHOES,{dir:[-1,.3,0],group:m,paint:y=>y[1]<x[1]-.03?s.BELLY:void 0})}),e.ell(u,[.11,.115,.1],s.SKIN,{group:8,paint:g=>g[0]<u[0]-.01||g[1]>u[1]+.075?s.HAIR:void 0});for(const g of[-1,1]){const x=it.surface(u,[.11,.115,.1],E.norm([.85,.1,g*.45]));e.ell(x,[.026,.036,.026],s.BELLY,{group:8}),e.ell(E.add(x,[.012,0,g*.004]),[.014,.018,.014],s.EYE,{group:8})}e.ell(it.surface(u,[.11,.115,.1],E.norm([1,-.45,0])),[.012,.016,.04],s.BELLY,{group:8}),e.chain([[...E.add(u,[-.06,.03,0]),.065],[...E.add(u,[-.22,.05+a[1]*2,.01]),.05],[...E.add(u,[-.4,.06+a[2]*3,.02]),.03],[...E.add(u,[-.55,.07+a[0]*3,.02]),.012]],s.HAIR,{group:9});for(const g of[-1,1])e.ell(E.add(u,[-.015,0,g*.105]),[.05,.055,.03],s.PHONES,{group:10});e.chain([[...E.add(u,[-.005,.03,-.095]),.015],[...E.add(u,[-.02,.12,0]),.015],[...E.add(u,[-.005,.03,.095]),.015]],s.PHONES,{group:10});const p=E.add(u,[-.1+a[0],.2+a[1]*2,0]);e.ell(p,[.16,.014,.15],s.HAT,{dir:[1,.9,0],group:11}),e.chain([[...E.add(p,[-.02,.02,0]),.08],[...E.add(p,[-.14,.13,0]),.04],[...E.add(p,[-.3,.14+a[2]*2,0]),.012]],s.HAT,{group:11,paint:g=>Math.hypot(g[0]-p[0],g[1]-p[1])<.06?s.MAGIC:void 0}),e.seg(E.add(p,[.08,-.02,.08]),E.add(u,[.04,-.09,.08]),.008,.008,s.HAT,{group:11}),e.anchors.hand=l[1],e.anchors.hatTip=E.add(p,[-.3,.14+a[2]*2,0]);for(const[g,x,M,m]of[[-.86,o(-.8)+.05,.03,.22],[-.88,o(-.8)-.04,-.04,.16],[-.7,i+.45,.05,.14],[-.2,i+.5,-.04,.12]]){const _=t*.05%.1;e.seg([g-_,x,M],[g-_-m,x,M],.01,.004,s.MAGIC2,{group:30,extra:!0})}return e.ell([.02,.005,0],[.2,.005,.12],s.NOSE,{group:0}),e}const pd={stand:{frames:3,fps:3},land:{frames:3,fps:10},takeoff:{frames:3,fps:10},talk:{frames:4,fps:2.5},placeSigil:{frames:3,fps:6},liftSigil:{frames:3,fps:6},sit:{frames:2,fps:1.5}},Fo=.34,Fu={binding:[-.02,.31,-.2],dir:[.02,1,-.04]},gd={stand:[0,1,2].map(n=>({breathe:[0,.006,.012][n],sway:[0,.02,.035][n],free:[.04,.5+[0,.006,.012][n],.18],hand:"rest",broom:Fu})),land:[{crouch:.2,hop:.01,broom:{astride:!0},sway:.05},{crouch:.1,bend:.1,broom:{binding:[-.28,.26,-.08],dir:[.6,.5,-.06]},legUp:[.18,.24,.12],sway:.03,free:[.2,.58,.2],hand:"rest"},{breathe:.004,broom:{binding:[.06,.31,-.2],dir:[.18,1,-.03]},sway:.015,free:[.06,.52,.19],hand:"rest"}],takeoff:[{crouch:.1,broom:{binding:[-.1,.3,-.17],dir:[.35,.7,-.04]},free:[.16,.58,.2],hand:"rest",sway:.02},{crouch:.15,bend:.1,broom:{binding:[-.3,.28,-.06],dir:[.7,.4,-.04]},legUp:[.1,.26,.13],sway:.04,free:[.24,.55,.17],hand:"rest"},{hop:.1,broom:{astride:!0},toes:!0,sway:.06}],talk:[{free:[.47,.84,.13],hand:"palm",tilt:.35,mouth:!0,sway:.01},{free:[.32,1.18,.12],hand:"point",tilt:-.25,look:.12,sway:.02},{free:[.24,1.16,.3],elbow:[.26,.88,.26],hand:"wave",tilt:.45,mouth:!0,sway:.03},{free:[.15,.76,.1],hand:"chest",tilt:-.35,breathe:.01,sway:.015}],placeSigil:[{free:[.16,1.62,.1],hand:"palm",look:.22,breathe:.01,sway:.02},{free:[.42,1,.12],hand:"palm",look:.08,sway:.03},{crouch:.7,bend:.55,free:[.38,.1,.13],hand:"down",look:-.08,sway:.04}],liftSigil:[{crouch:.7,bend:.55,free:[.36,.08,.13],hand:"down",look:-.08,sway:.02},{crouch:.25,bend:.18,free:[.44,.82,.12],hand:"palm",look:.05,sway:.04},{breathe:.012,free:[.2,1.64,.1],hand:"palm",look:.25,sway:.05,toes:!0}],sit:[0,1].map(n=>({sit:!0,swing:[.06,-.06][n],bend:-.08,look:[.02,.1][n],tilt:[.15,-.2][n],sway:[.01,.03][n],breathe:[0,.008][n],broom:{binding:[-.24,.31,-.3],dir:[.32,1,-.06]},free:[.2,Fo+.14,.15],far:[.18,Fo+.14,-.13],hand:"rest"}))};function md(n,e,t){const i=Math.hypot(e[0]-n[0],e[1]-n[1]),r=E.lerp(n,e,.5);if(i>=2*t)return r;const a=Math.sqrt(t*t-i*i/4),o=(e[0]-n[0])/i,l=(e[1]-n[1])/i;return[r[0]-l*a,r[1]+o*a,r[2]]}function Md(n,e){const t=gd[n],i={crouch:0,bend:0,hop:0,breathe:0,sway:0,tilt:0,look:0,broom:Fu,...t[e%t.length]},r=new it({blend:.03}),a=i.hop,o=i.sway,l=i.sit?Fo+.06:.45-i.crouch*.21+a,c=-i.crouch*.12,u=!!i.broom.astride,h=l-.04,f=u?[1,0,0]:E.norm(i.broom.dir),d=u?[-.36,h,0]:i.broom.binding,p=w=>E.add(d,E.mul(f,w));r.seg(p(0),p(u?.98:1.1),.022,.018,s.BROOM,{group:2}),r.ell(p(-.13),[.17,.07,.08],s.STRAW,{dir:f,group:3,paint:w=>{const L=E.dot(E.sub(w,d),f);return L<-.22?s.MAGIC2:L>-.01?s.BROOM:void 0}});for(const w of[-1,1]){const L=w>0?6:4,C=[c,l,w*.07],I=i.sit?i.swing*w:0,N=i.sit?[.24+I,.09+Math.max(0,I)*.6,w*.1]:w>0&&i.legUp?i.legUp:[(w>0?.05:-.01)+(i.toes?-.03:0),.07+(i.toes?a*.4:a),w*.1],O=i.sit?[.21,l+.01,w*.09]:md(C,N,.21);r.seg(C,O,.055,.045,s.JEANS,{group:L}),r.seg(O,N,.045,.04,s.JEANS,{group:L});const B=i.toes?[.03,-.045,0]:[.05,-.03,0];r.ell(E.add(N,B),[.08,.04,.045],s.SHOES,{dir:i.toes?[1,-.6,0]:[1,0,0],group:L,paint:W=>W[1]<N[1]+B[1]-.015?s.BELLY:void 0})}const g=[Math.sin(i.bend),Math.cos(i.bend),0],x=[Math.cos(i.bend),-Math.sin(i.bend),0],M=[c,l+.03,0];r.ell(M,[.1,.08,.105],s.JEANS,{group:1});const m=E.add(M,E.add(E.mul(g,.19),[0,i.breathe,0]));r.ell(m,[.1,.15+i.breathe*.5,.115],s.JACKET,{dir:x,group:1,paint:w=>E.dot(E.sub(w,m),x)>.045&&Math.abs(w[2])<.05?s.TOP:void 0}),r.chain([[...E.add(m,E.add(E.mul(x,-.07),E.mul(g,-.08))),.07],[...E.add(m,E.add(E.mul(x,-.11-o),E.mul(g,-.2))),.05],[...E.add(m,E.add(E.mul(x,-.13-o*1.6),E.mul(g,-.29))),.025]],s.JACKET,{group:12});const _=E.add(m,E.add(E.mul(g,.27),[i.look*.03,0,i.tilt*.04])),y=w=>E.add(m,E.add(E.mul(g,.1),[0,0,w*.12])),S=u?[.28,h+.03,-.05]:p(Math.max(.12,(Math.min(.62,l+.2)-d[1])/Math.max(.3,f[1]))),R=u?[.28,h+.03,.05]:i.free;for(const w of[-1,1]){const L=w>0?7:5,C=y(w),I=w>0?R:i.far||S,N=w>0&&i.elbow?i.elbow:E.add(E.lerp(C,I,.5),[-.03,-.02,w*.05]);r.seg(C,N,.04,.035,s.JACKET,{group:L}),r.seg(N,I,.035,.03,s.JACKET,{group:L});const O=w>0&&!u?i.hand:"grip";if(O==="palm")r.ell(I,[.045,.02,.04],s.SKIN,{group:L});else if(O==="down")r.ell(I,[.045,.02,.04],s.SKIN,{dir:[1,.15,0],group:L});else if(O==="wave"){r.ell(I,[.03,.045,.04],s.SKIN,{group:L});for(const B of[-1,0,1])r.seg(E.add(I,[0,.03,B*.02]),E.add(I,[B*.01,.065,B*.03]),.01,.008,s.SKIN,{group:L})}else O==="point"?(r.ell(I,[.035,.03,.035],s.SKIN,{group:L}),r.seg(E.add(I,[0,.02,0]),E.add(I,[.01,.08,0]),.012,.01,s.SKIN,{group:L})):r.ell(I,[.035,.03,.035],s.SKIN,{group:L})}r.ell(_,[.11,.115,.1],s.SKIN,{group:8,paint:w=>w[0]<_[0]-.01||w[1]>_[1]+.075?s.HAIR:void 0});for(const w of[-1,1])r.ell(it.surface(_,[.11,.115,.1],E.norm([.85,.05+i.look,w*.45+i.tilt*.1])),[.016,.026,.016],s.EYE,{group:8});i.mouth&&r.ell(it.surface(_,[.11,.115,.1],E.norm([1,-.5+i.look,i.tilt*.1])),[.012,.016,.025],s.NOSE,{group:8}),r.chain([[...E.add(_,[-.06,.02,0]),.06],[...E.add(_,[-.12-o,-.12,.02+i.tilt*.03]),.05],[...E.add(_,[-.13-o*1.5,-.25,.03+i.tilt*.04]),.03]],s.HAIR,{group:9});for(const w of[-1,1])r.ell(E.add(_,[-.015,0,w*.105]),[.05,.055,.03],s.PHONES,{group:10});r.chain([[...E.add(_,[-.005,.03,-.095]),.015],[...E.add(_,[-.005,.11,-.05]),.015],[...E.add(_,[-.005,.125,0]),.015],[...E.add(_,[-.005,.11,.05]),.015],[...E.add(_,[-.005,.03,.095]),.015]],s.PHONES,{group:10});const A=E.add(_,[-.03,.1,i.tilt*.02]),D=i.tilt*.05,b=E.add(A,[-.16-o*.5,.27,D*2]);return r.ell(A,[.16,.014,.15],s.HAT,{dir:[1,.25-i.look*.8,i.tilt*.3],group:11}),r.chain([[...E.add(A,[0,.01,0]),.085],[...E.add(A,[-.05,.17,D]),.045],[...b,.012]],s.HAT,{group:11,paint:w=>w[1]<A[1]+.045?s.MAGIC:void 0}),r.ell([.02,.005,0],[.2,.005,.12],s.NOSE,{group:0}),r.anchors.hand=R,r.anchors.hatTip=b,r}function Uu({frame:n=0,lean:e=!1,pose:t}={}){if(t==="fast")return fd(n);if(pd[t])return Md(t,n);const i=t==="rise",r=t==="descend",a=t==="brake",o=i||r||a,l=new it({blend:.03}),c=o?0:[0,.025,.045][n%3],u=o?0:[0,.015,-.01][n%3]+(e?.08:0),h=.42+c,f=i?.3:r?-.27:a?-.12:e?.1:0,d=Math.min(.1,Math.max(0,f)),p=o?[.02,.06][n%2]:[0,.03,.05][n%3],g=r?1:i?-.6:0;l.seg([-.5,h-u*2,0],[.62,h+u*3,0],.022,.018,s.BROOM,{group:2}),a?l.ell([-.56,h-.08,0],[.17,.07,.09],s.STRAW,{dir:[.55,1,0],group:3,paint:y=>y[1]<h-.18?s.MAGIC2:y[1]>h-.01?s.BROOM:void 0}):l.ell([-.62,h-u*2-.01,0],[.17,.07,.08],s.STRAW,{dir:[1,u,0],group:3,paint:y=>y[0]<-.72?s.MAGIC2:y[0]>-.5?s.BROOM:void 0});for(const y of[-1,1]){const S=[-.04,h+.06,y*.07],R=a?[.18,h-.01,y*.14]:r?[.16,h-.05,y*.14]:i?[.06,h-.07,y*.14]:[.12+f*.5,h-.02,y*.14],A=a?y>0?[.44,h-.02+p,y*.13]:[.3,h-.16,y*.13]:r?[.2,h-.26,y*.13]:i?[-.1,h-.23,y*.13]:[.08+f,h-.2,y*.13];l.seg(S,R,.055,.045,s.JEANS,{group:y>0?6:4}),l.seg(R,A,.045,.04,s.JEANS,{group:y>0?6:4}),l.ell(E.add(A,[.05,-.02,0]),[.08,.04,.045],s.SHOES,{group:y>0?6:4,paint:D=>D[1]<A[1]-.04?s.BELLY:void 0})}l.ell([-.04,h+.08,0],[.11,.07,.1],s.JEANS,{group:1});const x=[0+f*.8,h+.26-Math.abs(f)*.3,0];l.ell(x,[.1,.16,.11],s.JACKET,{dir:[f*2.5,1,0],up:[-1,0,0],group:1,paint:y=>y[0]>x[0]+.04&&Math.abs(y[2])<.055?s.TOP:void 0}),a?l.chain([[...E.add(x,[-.08,-.06,0]),.07],[...E.add(x,[-.02,.12+p,.02]),.05],[...E.add(x,[.14,.18+p,.03]),.025]],s.JACKET,{group:12}):o&&l.chain([[...E.add(x,[-.08,-.1,0]),.07],[...E.add(x,[-.2,-.12+g*(.08+p),0]),.05],[...E.add(x,[-.3,-.12+g*(.16+p*1.5),.02]),.025]],s.JACKET,{group:12});const M=E.add(x,[.03+f*.5,.26,0]),m=E.add(M,[a?.05:r?-.01:-.03,a?.06:.1,0]);for(const y of[-1,1]){const S=E.add(x,[.01,.11,y*.11]),R=r&&y>0?E.add(m,[.1,.01,.1]):a?[.3,h+.03,y*.05]:[.26+f,h+.03,y*.05],A=r&&y>0?E.add(S,[.1,.02,.1]):E.lerp(S,R,.5);l.seg(S,A,.04,.035,s.JACKET,{group:y>0?7:5}),l.seg(A,R,.035,.03,s.JACKET,{group:y>0?7:5}),l.ell(R,[.035,.03,.035],s.SKIN,{group:y>0?7:5}),y>0&&(l.anchors.hand=R)}l.ell(M,[.11,.115,.1],s.SKIN,{group:8,paint:y=>y[0]<M[0]-.01||y[1]>M[1]+.075?s.HAIR:void 0});for(const y of[-1,1])l.ell(it.surface(M,[.11,.115,.1],E.norm([.85,.05,y*.45])),[.016,.026,.016],s.EYE,{group:8});a?l.chain([[...E.add(M,[-.06,.06,0]),.06],[...E.add(M,[.04,.13+p,.03]),.045],[...E.add(M,[.2,.08+p,.04]),.02]],s.HAIR,{group:9}):l.chain([[...E.add(M,[-.06,.02,0]),.06],[...E.add(M,[-.18-d,-.05+p+g*.1,.02]),.045],[...E.add(M,[-.3-d*1.5,-.08+p*1.6+g*.22,.03]),.02]],s.HAIR,{group:9});for(const y of[-1,1])l.ell(E.add(M,[-.015,0,y*.105]),[.05,.055,.03],s.PHONES,{group:10});l.chain([[...E.add(M,[-.005,.03,-.095]),.015],[...E.add(M,[-.005,.11,-.05]),.015],[...E.add(M,[-.005,.125,0]),.015],[...E.add(M,[-.005,.11,.05]),.015],[...E.add(M,[-.005,.03,.095]),.015]],s.PHONES,{group:10});const _=i?.1:0;if(l.ell(m,[.16,.014,.15],s.HAT,{dir:a?[1,-.55,0]:[1,.25+_*3,0],group:11}),l.anchors.hatTip=a?E.add(m,[.2,.22+p*.5,0]):E.add(m,[-.16-d*1.5-_,.27+p*.5-_*.5,0]),l.chain(a?[[...E.add(m,[0,.01,0]),.085],[...E.add(m,[.06,.16,0]),.045],[...E.add(m,[.2,.22+p*.5,0]),.012]]:[[...E.add(m,[0,.01,0]),.085],[...E.add(m,[-.05-d-_*.5,.17-_*.3,0]),.045],[...E.add(m,[-.16-d*1.5-_,.27+p*.5-_*.5,0]),.012]],s.HAT,{group:11,paint:y=>y[1]<m[1]+.045?s.MAGIC:void 0}),o){const y=dd[t]+(a?[0,.06][n%2]:0),S=Math.cos(y),R=Math.sin(y),A=[0,h,0],D=C=>[A[0]+(C[0]-A[0])*S-(C[1]-A[1])*R,A[1]+(C[0]-A[0])*R+(C[1]-A[1])*S,C[2]],b=C=>[A[0]+(C[0]-A[0])*S+(C[1]-A[1])*R,A[1]-(C[0]-A[0])*R+(C[1]-A[1])*S,C[2]],w=C=>[C[0]*S-C[1]*R,C[0]*R+C[1]*S,C[2]];for(const C of l.parts)if(C.type==="ell"?(C.c=D(C.c),C.axes=C.axes.map(w)):(C.a=D(C.a),C.b=D(C.b)),C.paint){const I=C.paint;C.paint=(N,O)=>I(b(N),O)}for(const C of l.flats)C.c=D(C.c),C.u=w(C.u),C.v=w(C.v);l.anchors.hand=D(l.anchors.hand),l.anchors.hatTip=D(l.anchors.hatTip);const L=Math.min(...l.parts.map(C=>C.type==="ell"?C.c[1]-Math.max(...C.r):Math.min(C.a[1]-C.r1,C.b[1]-C.r2)));if(L<.08){for(const C of l.parts){const I=.08-L;C.type==="ell"?C.c=[C.c[0],C.c[1]+I,C.c[2]]:(C.a=[C.a[0],C.a[1]+I,C.a[2]],C.b=[C.b[0],C.b[1]+I,C.b[2]])}for(const C of["hand","hatTip"])l.anchors[C]=E.add(l.anchors[C],[0,.08-L,0])}if(a){const C=D([-.45,h-.24,0]);for(let I=0;I<5;I++){const N=I+n*.5,O=.055-I*.008;l.ell([C[0]+.1+N*.08,Math.max(.04,C[1]-.02+Math.sin(N*1.9)*.04),Math.cos(N*1.3)*.06],[O,O*.8,O],I<2?s.BELLY:I%2?s.MAGIC:s.MAGIC2,{group:25+I,extra:!0})}}if(i){const C=D([-.8,h,0]);for(let I=0;I<5;I++){const N=I+n*.5,O=.05-I*.007;l.ell([C[0]-.02+Math.sin(N*2.1)*.06,Math.max(.04,C[1]-.08-N*.09),Math.cos(N*1.7)*.05],[O,O,O],I%2?s.MAGIC:s.MAGIC2,{group:20+I,extra:!0})}}}return l.ell([.02,.005,0],[.2,.005,.12],s.NOSE,{group:0}),l}const Bu=(n={})=>Math.round((n.size||8)*Math.sqrt(n.growth||20)*(2/(n.pixel||3))*1.9),qs=new Map,Uo=n=>(qs.has(n)||qs.set(n,Ii(Uu({frame:0}),{height:n}).s),qs.get(n)),ku=(n={})=>Uo(Bu(n)),xd={away:-Math.PI/2,towards:Math.PI/2};function _d(n={},{frame:e=0,lean:t=!1,facing:i="towards",pose:r,heading:a="side"}={}){const o=Bu(n),l=xd[a],c=Uu({frame:e,lean:t,pose:r}),{sp:u,project:h,s:f}=l!==void 0?Ii(c,{scale:Uo(o),yaw:l}):r?Ii(c,{scale:Uo(o),facing:i}):Ii(c,{height:o,facing:i});u.scale=f,c.anchors.hand&&(u.anchors={hand:h(c.anchors.hand),hatTip:h(c.anchors.hatTip)});let d=0;for(let p=0;p<400&&d<6;p++){const g=p*37%u.w,x=p*53%Math.floor(u.h*.8);u.get(g,x)||u.get(g+1,x)||u.get(g-1,x)||u.get(g,x+1)||u.get(g,x-1)||(g*7+x*13+e*5)%11||(u.px(g,x,s.MAGIC2),d++)}return u}const ut=(n,e=0)=>{const t=Math.sin(n*127.1+e*311.7)*43758.5453;return t-Math.floor(t)},zr=n=>{const e=ut(Math.floor(n[0]*14)+Math.floor(n[2]*14)*13,Math.floor(n[1]*6));return e<.14?s.BARKD:e>.88?s.BARKL:void 0},vd=n=>e=>{const t=ut(Math.floor(e[0]*10),Math.floor(e[1]*10)+Math.floor(e[2]*10)*7);return e[1]<n[1]-.2||t<.2?s.LEAF3:t>.8?s.LEAF2:void 0},Si=(n,e,t,i,r=!0)=>n.ell(e,t,s.STONE,{group:i,rough:.025,paint:a=>a[1]>e[1]+t[1]*.45&&r?s.MOSS:Math.abs(Math.sin(a[0]*13+a[2]*7))<.06?s.STONED:void 0}),Ba=(n,e,t,i)=>n.ell(e,t,s.LEAF,{group:i,rough:.04,paint:vd(e)}),cn=(n,e,t)=>n.chain(e,s.TRUNK,{group:t,rough:.012,paint:zr}),ka=(n,e,t,i,r,a=.3,o=s.LEAF2)=>{for(let l=0;l<e;l++){const c=ut(r,l)*6.283,u=t*Math.sqrt(ut(l,r)),h=Math.cos(c)*u,f=Math.sin(c)*u*.7;n.ell([h,a*.3,f],[.07,a*(.35+ut(l,4)*.3),.07],o,{group:i+l%3,paint:d=>d[1]>a*.45?s.LEAF:void 0})}},za=(n,e,t,i)=>n.ell(e,[t[0],.015,t[1]],s.WATER,{group:i}),bd={"sleeping-giant"(n){const e=t=>i=>{const r=ut(Math.floor(i[0]*8),Math.floor(i[2]*8)+Math.floor(i[1]*8)*5);return r<.15?s.LEAF3:r>.86?s.LEAF2:void 0};for(const[t,i]of[[[.85,.42,0],[.7,.5,.66]],[[0,.3,0],[.62,.36,.6]],[[-.8,.3,0],[.56,.36,.62]],[[1.85,.5,.02],[.5,.5,.48]],[[-1.55,.72,.3],[.38,.5,.3]],[[-1.55,.72,-.3],[.38,.5,.3]],[[-2.2,.3,.32],[.42,.3,.26]],[[-2.2,.3,-.32],[.42,.3,.26]],[[.6,.2,.78],[.75,.2,.2]],[[.6,.2,-.78],[.75,.2,.2]]])n.ell(t,i,s.MOSS,{group:1,rough:.03,paint:e()});Si(n,[2.25,.75,.12],[.13,.15,.11],2,!1);for(const t of[-.12,.22])n.ell([2.12,.88,t],[.08,.04,.07],s.STONED,{group:3});Si(n,[-.2,.16,.95],[.2,.15,.18],4),Si(n,[-.2,.16,-.95],[.18,.14,.16],5),n.ell([2,.95,.02],[.42,.14,.4],s.LEAF3,{group:6,rough:.03}),ka(n,26,2.8,10,3,.3)},"fern-grotto"(n){n.ell([0,.16,0],[.78,.2,.72],s.STONE,{group:1,rough:.015,paint:e=>e[1]>.3?s.MOSS:void 0}),za(n,[0,.345,0],[.55,.5],2);for(let e=0;e<6;e++){const t=e/6*Math.PI*2+.4,i=1.5+ut(e)*.3,r=[Math.cos(t)*i,0,Math.sin(t)*i*.8],a=1.1+ut(e,2)*.7,o=E.add(r,[0,a,0]);n.seg(r,o,.12,.09,s.TRUNK,{group:3+e,rough:.02,paint:zr});for(let l=0;l<7;l++){const c=l/7*Math.PI*2+e,u=[Math.cos(c),0,Math.sin(c)];n.chain([[...o,.05],[...E.add(o,E.add(E.mul(u,.45),[0,.18,0])),.04],[...E.add(o,E.add(E.mul(u,.9),[0,-.15,0])),.015]],l%2?s.LEAF:s.LEAF2,{group:10+e})}}for(let e=0;e<5;e++){const t=e*1.3;Si(n,[Math.cos(t)*.95,.08,Math.sin(t)*.95],[.16,.12,.14],20+e)}},"sunken-boat"(n){za(n,[.3,.01,.15],[1.9,1.15],1);const e=[0,.12,0],t=E.norm([1,.28,.12]);n.ell(e,[1.3,.45,.55],s.WOOD,{dir:t,group:2,paint:i=>(E.dot(E.sub(i,e),[0,1,0])*9+9)%1<.14?s.BARKD:i[1]>.35&&ut(Math.floor(i[0]*9))<.4?s.MOSS:void 0}),n.ell(E.add(e,[0,.14,0]),[1.2,.4,.47],s.BARKD,{dir:t,group:2,cut:!0});for(let i=-2;i<=2;i++)n.seg(E.add(e,E.add(E.mul(t,i*.4),[0,.1,-.42])),E.add(e,E.add(E.mul(t,i*.4),[0,.1,.42])),.04,.04,s.WOOD,{group:3});n.seg([-.9,.05,.7],[.3,1,.55],.03,.03,s.WOOD,{group:4}),n.box([-.98,.06,.72],[.2,.02,.07],s.WOOD,{dir:[1.2,-.8,-.15],group:4}),ka(n,18,2.2,10,5,.45)},"bramble-wagon"(n){const e=E.norm([1,-.12,0]);n.box([0,.62,0],[1.1,.22,.52],s.WOOD,{dir:e,round:.04,group:1,paint:t=>(t[0]+3)*4%1<.08?s.BARKD:void 0}),n.box([0,.72,0],[1,.2,.43],s.BARKD,{dir:e,group:1,cut:!0});for(const[t,i,r,a]of[[-.72,.55,.4,.4],[-.72,-.55,.4,.4],[.72,-.55,.32,.37]])n.ell([t,r,i],[a,a,.06],s.WOOD,{group:2+(t>0?1:0)+(i>0?2:0),paint:o=>{const l=o[0]-t,c=o[1]-r,u=Math.hypot(l,c),h=Math.atan2(c,l);return u>a*.82||u<a*.18?s.BARKD:Math.abs(Math.sin(h*4))<.2?s.WOOD:s.NOSE}});n.ell([.95,.1,.75],[.37,.06,.37],s.WOOD,{group:7,paint:t=>Math.hypot(t[0]-.95,t[2]-.75)>.3?s.BARKD:void 0});for(const t of[-.3,.3])n.seg([1.05,.55,t],[1.9,.05,t*1.4],.04,.035,s.WOOD,{group:8});for(let t=0;t<14;t++){const i=ut(t,1)*6.283,r=Math.cos(i)*1.5,a=Math.sin(i)*.9,o=[[r,0,a,.03]];for(let l=1;l<4;l++)o.push([r*(1-l*.28)+(ut(t,l)-.5)*.5,.25+l*.25+ut(l,t)*.2,a*(1-l*.3)+(ut(l,t*3)-.5)*.4,.025-l*.004]);if(n.chain(o,s.BARKD,{group:10+t%3}),t%2===0){const l=o[3];n.ell([l[0],l[1],l[2]],[.18,.13,.16],s.LEAF,{group:14,rough:.03,paint:c=>ut(Math.floor(c[0]*30),Math.floor(c[1]*30))<.1?s.ACCENT:void 0})}}},"beehive-tree"(n){for(const[t,i,r]of[[-.2,0,-.25],[.15,-.1,.2],[0,.15,.05]])cn(n,[[t,0,i,.22],[t+r*.8,1.4,i,.16],[t+r*2,2.8,i-.1,.08]],1);for(const[t,i]of[[[-.6,2.9,-.2],[.9,.6,.7]],[[.6,3,-.2],[.85,.6,.7]],[[0,3.4,-.3],[.9,.55,.7]]])Ba(n,t,i,3);cn(n,[[.2,1.9,-.05,.08],[.75,2.05,.15,.05]],2);const e=[.72,1.6,.2];n.ell(e,[.24,.42,.22],s.STRAW,{group:4,paint:t=>{const i=Math.floor((t[1]-e[1])*14),r=Math.floor(Math.atan2(t[2]-e[2],t[0]-e[0])*3+i%2*.5);return ut(i,r)<.3?s.BARK2:void 0}}),n.seg([.75,2.02,.15],[.72,1.9,.2],.05,.1,s.STRAW,{group:4});for(let t=0;t<6;t++){const i=t*1.9;n.ell([e[0]+Math.cos(i)*.45,e[1]+Math.sin(t*2.3)*.35,e[2]+Math.sin(i)*.35],[.03,.025,.03],s.MAGIC,{group:20+t,extra:!0})}},"fairy-ring"(n){n.ell([0,.005,0],[1.9,.005,1.5],s.LEAF3,{group:0});for(let e=0;e<9;e++){const t=e/9*Math.PI*2,i=[Math.cos(t)*1.6,0,Math.sin(t)*1.25],r=.35+ut(e)*.35;n.box(E.add(i,[0,r/2,0]),[.13,r/2,.1],s.STONE,{dir:[-Math.sin(t),0,Math.cos(t)],round:.05,rough:.015,group:1+e,paint:o=>e===2&&Math.abs(o[1]-r*.55)<r*.22&&Math.abs(o[0]-i[0]-0)<.05?s.RUNE:o[1]>r*.85?s.MOSS:void 0});const a=E.add(i,[Math.cos(t+.35)*.25,0,Math.sin(t+.35)*.2]);n.seg(a,E.add(a,[0,.16,0]),.035,.03,s.CLOTH,{group:12}),n.ell(E.add(a,[0,.18,0]),[.1,.06,.1],s.ACCENT,{group:13,paint:o=>ut(Math.floor(o[0]*60),Math.floor(o[2]*60))<.15?s.BELLY:void 0})}},"charcoal-hut"(n){const e=[0,2,0];for(let i=0;i<20;i++){const r=i/20*Math.PI*2;Math.abs(r-1.2)<.35||n.seg([Math.cos(r)*.95,0,Math.sin(r)*.8],E.add(e,[Math.cos(r)*.08,.1+ut(i)*.25,Math.sin(r)*.08]),.05,.03,i%3?s.TRUNK:s.BARKD,{group:1+i%2})}n.ell([0,.6,0],[.85,.6,.7],s.BARKD,{group:3});const t=[1.7,0,.3];n.ell(t,[.85,.42,.7],s.BARKD,{group:4,rough:.03,paint:i=>ut(Math.floor(i[0]*14),Math.floor(i[2]*14)+Math.floor(i[1]*14))<.07?s.GLOW:i[1]>.3?s.SHADES:void 0});for(let i=0;i<4;i++)n.seg([-1.4,.1+i*.14,-.5+i%2*.05],[-1.4,.1+i*.14,.5],.07,.07,s.TRUNK,{group:5+i%2,paint:r=>Math.abs(r[2])>.46?s.BARKL:void 0})},"root-arch"(n){cn(n,[[-1.8,0,.1,.4],[-1.4,1.2,0,.34],[-.4,2.3,-.1,.3],[.6,2.4,0,.28],[1.5,1.4,.1,.32],[1.9,0,.15,.38]],1),cn(n,[[-1.4,0,-.6,.28],[-.6,1.6,-.5,.22],[.5,1.9,-.45,.2],[1.3,.9,-.4,.22],[1.5,0,-.35,.26]],2),cn(n,[[-1.8,.2,.1,.3],[-2.4,.05,.5,.12]],1),cn(n,[[1.9,.2,.15,.3],[2.5,.05,.55,.12]],1);for(const[e,t]of[[[-.2,2.6,-.2],[.7,.35,.5]],[[.8,2.5,-.25],[.55,.3,.45]]])Ba(n,e,t,4);for(let e=0;e<4;e++)Si(n,[-.7+e*.45,.12,(ut(e)-.5)*.5],[.22,.18,.2],6+e);n.box([0,.35,-.2],[.16,.35,.08],s.STONE,{round:.05,rough:.01,group:11,paint:e=>Math.abs(e[1]-.4)<.14&&Math.abs(e[0])<.05?s.MAGIC:e[1]>.62?s.MOSS:void 0})},"turf-hut"(n){n.box([0,.55,0],[1,.55,.7],s.WOOD,{round:.04,group:1,paint:l=>l[1]*7%1<.18?s.BARKD:l[2]>.66&&Math.abs(l[0]+.2)<.2&&l[1]<.85?s.NOSE:l[2]>.66&&Math.abs(l[0]-.5)<.14&&Math.abs(l[1]-.7)<.12?s.SHADES:void 0});const e=1.1,t=1.68,i=.86,r=Math.hypot(i,t-e),a=i/r,o=(t-e)/r;for(const l of[-1,1]){n.box([0,(e+t)/2+.03,l*i/2],[1.12,.06,r/2+.05],s.MOSS,{dir:[1,0,0],up:[0,a,l*o],round:.03,group:2,paint:c=>ut(Math.floor(c[0]*12),Math.floor(c[2]*12))<.25?s.LEAF2:void 0});for(let c=0;c<7;c++)n.ell([-.95+c*.317,e-.02,l*(i+.02)],[.16,.07,.06],s.MOSS,{group:2,paint:u=>u[1]<e-.05?s.LEAF2:void 0})}n.box([0,t+.04,0],[1.1,.05,.06],s.MOSS,{group:2});for(const l of[-1,1])n.flat([l,(e+t)/2,0],[0,0,1],[0,1,0],i,(t-e)/2,(c,u)=>Math.abs(c)<=(1-u)/2+.02?(u+1)*4%1<.14?s.BARKD:s.WOOD:null,{group:1,bend:0});n.seg([.6,.9,0],[.6,t+.45,0],.15,.13,s.STONE,{group:3,rough:.015});for(let l=0;l<5;l++)Si(n,[-1.4+l*.7,.12,.9+ut(l)*.3],[.2,.15,.18],4+l);ka(n,16,1.8,10,9,.25)},"heron-rookery"(n){cn(n,[[0,0,0,.25],[.4,1.4,0,.18],[.9,2.8,-.1,.12],[1.3,3.8,-.2,.06]],1);const e=[[[.6,2,-.05],[-.3,2,-.1]],[[1,3,-.1],[1.8,2.9,0]],[[1.25,3.6,-.2],[.6,3.7,-.3]]];e.forEach(([r,a],o)=>{cn(n,[[...r,.07],[...a,.04]],2),n.ell(E.add(a,[0,.08,0]),[.34,.13,.3],s.BARK2,{group:3+o,rough:.025,paint:l=>Math.abs(Math.sin(l[0]*30+l[2]*20))<.25?s.STRAW:l[1]<a[1]+.02?s.BARKD:void 0})});for(const[r,a]of[[[1.2,4,-.4],[.6,.4,.45]],[[.3,3.1,-.5],[.45,.3,.35]],[[1.9,3.3,-.4],[.4,.3,.35]]])Ba(n,r,a,7);const t=E.add(e[1][1],[0,.42,.05]),i=1.6;n.ell(t,[.18*i,.1*i,.09*i],s.BELLY,{dir:[1,.3,0],group:10,paint:r=>r[1]>t[1]+.06?s.STONE:void 0}),n.chain([[...E.add(t,[.12*i,.06*i,0]),.035*i],[...E.add(t,[.2*i,.22*i,0]),.03*i],[...E.add(t,[.16*i,.32*i,0]),.04*i]],s.BELLY,{group:10}),n.seg(E.add(t,[.18*i,.33*i,0]),E.add(t,[.36*i,.3*i,0]),.015*i,.005*i,s.BODY2,{group:11});for(const r of[-.04,.04])n.seg(E.add(t,[0,-.06*i,r]),E.add(t,[.02,-.42,r]),.012,.012,s.BARKD,{group:12})},sundial(n){n.ell([0,.07,0],[1.05,.09,1],s.STONE,{group:1,rough:.01}),n.ell([0,.2,0],[.72,.09,.68],s.STONE,{group:2,rough:.01,paint:e=>e[1]>.26&&ut(Math.floor(e[0]*8),Math.floor(e[2]*8))<.3?s.MOSS:void 0}),n.seg([0,.28,0],[0,.95,0],.16,.13,s.STONE,{group:3,paint:e=>Math.abs(Math.sin(e[1]*30))<.15?s.STONED:void 0}),n.ell([0,1,0],[.38,.04,.38],s.FRAME,{group:4,paint:e=>{const t=Math.atan2(e[2],e[0]);return Math.abs(Math.sin(t*6))<.12&&Math.hypot(e[0],e[2])>.26?s.BARKD:void 0}}),n.box([0,1.12,0],[.2,.1,.01],s.FRAME,{dir:[1,-.5,0],round:.005,group:5});for(let e=0;e<22;e++){const t=e/22*Math.PI*2,i=1.25+ut(e)*.2,r=[Math.cos(t)*i,0,Math.sin(t)*i*.85];n.seg(r,E.add(r,[0,.18,0]),.015,.012,s.LEAF2,{group:6}),n.ell(E.add(r,[0,.2,0]),[.05,.04,.05],[s.FLOWER,s.BELLY,s.ACCENT][e%3],{group:7})}},"bear-den"(n){const e=[0,.3,-.2];n.ell(e,[1.7,1.15,1.25],s.LEAF,{group:1,rough:.05,paint:t=>{const i=ut(Math.floor(t[0]*16),Math.floor(t[1]*16)+Math.floor(t[2]*16)*3);return i<.06?s.ACCENT:i<.2?s.BARKD:t[1]<.4?s.LEAF3:i>.85?s.LEAF2:void 0}}),n.ell([.35,.35,.95],[.5,.55,.4],s.NOSE,{group:1,cut:!0}),n.seg([2,0,.5],[2,.65,.5],.3,.27,s.TRUNK,{group:3,paint:t=>t[1]>.6?s.BARKL:Math.abs(Math.sin(Math.atan2(t[2]-.5,t[0]-2)*3))<.12&&t[1]>.2?s.BARKD:void 0})},"stilt-hut"(n){za(n,[0,.01,.1],[2.1,1.3],1);for(const[e,t]of[[-.75,-.55],[.75,-.55],[-.75,.55],[.75,.55]])n.seg([e,0,t],[e,1.05,t],.07,.06,s.WOOD,{group:2,paint:i=>i[1]<.15?s.MOSS:void 0});n.box([0,1.1,0],[1.05,.05,.8],s.WOOD,{round:.02,group:3,paint:e=>(e[0]+3)*6%1<.12?s.BARKD:void 0}),n.box([-.1,1.6,-.1],[.7,.45,.55],s.WOOD,{round:.03,group:4,paint:e=>e[2]>.4&&Math.abs(e[0]-.1)<.18&&e[1]<1.85?s.NOSE:void 0});for(const[e,t]of[[2.1,.92],[2.35,.72],[2.58,.48],[2.76,.24]])n.ell([-.1,e,-.1],[t,.16,t*.85],s.STRAW,{group:5,paint:i=>Math.abs(Math.sin(Math.atan2(i[2]+.1,i[0]+.1)*18))<.25?s.BARK2:void 0});for(const e of[.72,.95])n.seg([.9,1.1,e],[1.15,0,e],.02,.02,s.WOOD,{group:6});for(let e=0;e<4;e++)n.seg([.92+e*.06,1-e*.26,.72],[.92+e*.06,1-e*.26,.95],.02,.02,s.WOOD,{group:6});for(let e=0;e<26;e++){const t=ut(e,7)*6.283,i=1.5+ut(e,8)*.7,r=[Math.cos(t)*i,0,Math.sin(t)*i*.7],a=.5+ut(e,9)*.5;n.seg(r,E.add(r,[0,a,0]),.028,.02,s.LEAF2,{group:10+e%3}),e%3===0&&n.ell(E.add(r,[0,a-.05,0]),[.025,.07,.025],s.BARKD,{group:13})}},"bog-shrine"(n){za(n,[.6,.01,.4],[1.4,.9],1),n.seg([0,0,0],[0,1.9,0],.2,.17,s.TRUNK,{group:2,rough:.01,paint:e=>{const t=e[1];return e[2]>.12&&(Math.abs(t-1.6)<.05&&Math.abs(Math.abs(e[0])-.08)<.05||Math.abs(t-1.38)<.04&&Math.abs(e[0])<.1)||t*5%1<.07?s.BARKD:e[1]>1.85?s.MOSS:void 0}}),n.ell([0,1.95,0],[.24,.1,.24],s.MOSS,{group:3});for(let e=0;e<6;e++){const t=e/6*Math.PI*2;n.seg([Math.cos(t)*1,0,Math.sin(t)*.8],[Math.cos(t)*1,.35+ut(e)*.25,Math.sin(t)*.8],.05,.04,s.TRUNK,{group:4})}n.ell([-.25,.06,.3],[.14,.07,.13],s.EAR,{group:5}),Si(n,[.3,.07,.3],[.09,.07,.08],6,!1),Si(n,[.15,.05,.42],[.06,.05,.06],7,!1);for(const[e,t,i]of[[.9,.9,.5],[1.4,1.2,.1],[.4,1.4,.8]])n.ell([e,t,i],[.06,.07,.06],s.MAGIC,{group:20+e*10,extra:!0,paint:r=>Math.hypot(r[0]-e,r[1]-t)<.03?s.MAGIC2:void 0});ka(n,20,2,10,11,.3,s.WEB)},"raven-tree"(n){cn(n,[[0,0,0,.3],[.1,1.3,0,.22],[-.1,2.5,-.1,.16],[.1,3.6,-.15,.07]],1),[[[.1,1.6,0],[1.3,2.3,.1],[1.8,2.2,.1]],[[-.05,2.1,-.05],[-1.2,2.8,-.1],[-1.6,3.2,-.1]],[[0,2.9,-.1],[.8,3.5,-.2]]].forEach((r,a)=>cn(n,r.map((o,l)=>[...o,.12-l*.04]),2+a)),cn(n,[[-.1,.5,0,.22],[-1.1,.1,.5,.08]],5),cn(n,[[.1,.4,0,.2],[.9,.05,-.4,.08]],5);const t=(r,a)=>{n.ell(r,[.12,.07,.06],s.SHADES,{dir:[1,.2,0],group:a}),n.ell(E.add(r,[.11,.07,0]),[.05,.05,.045],s.SHADES,{group:a}),n.seg(E.add(r,[.15,.07,0]),E.add(r,[.22,.05,0]),.015,.004,s.BODY2,{group:a}),n.seg(E.add(r,[-.1,0,0]),E.add(r,[-.22,-.04,0]),.04,.015,s.SHADES,{group:a})};t([1.3,2.42,.1],10),t([-1.2,2.92,-.1],11),t([.8,3.62,-.2],12),t([-.05,3.72,-.15],13);const i=[1.55,1.45,.1];n.seg([1.55,2.25,.1],E.add(i,[0,.3,0]),.01,.01,s.FRAME,{group:14});for(let r=0;r<6;r++){const a=r/6*Math.PI*2;n.seg(E.add(i,[Math.cos(a)*.2,-.25,Math.sin(a)*.2]),E.add(i,[Math.cos(a)*.12,.3,Math.sin(a)*.12]),.012,.012,s.FRAME,{group:14})}n.seg(E.add(i,[0,-.27,0]),E.add(i,[0,-.25,0]),.22,.22,s.FRAME,{group:14})},barrow(n){n.ell([0,0,-.2],[2.3,.95,1.3],s.LEAF2,{group:1,rough:.03,paint:e=>ut(Math.floor(e[0]*10),Math.floor(e[2]*10)+Math.floor(e[1]*10))<.25?s.LEAF:void 0});for(const e of[-.35,.35])n.box([e,.45,.95],[.12,.45,.12],s.STONE,{round:.03,rough:.01,group:2});n.box([0,.95,.95],[.55,.1,.14],s.STONE,{round:.03,rough:.01,group:3,paint:e=>e[1]>1.02?s.MOSS:void 0}),n.box([0,.4,.9],[.23,.4,.3],s.NOSE,{group:1,cut:!0});for(const[e,t,i]of[[-1.6,1,.7],[1.7,.9,.55]])n.box([e,i/2,t],[.12,i/2,.09],s.STONE,{round:.04,rough:.01,group:4})},cairn(n){let e=0;for(let i=0;i<6;i++){const r=.9-i*.14,a=Math.max(3,9-i);for(let o=0;o<a;o++){const l=o/a*Math.PI*2+i;Si(n,[Math.cos(l)*r*.8,e+.14,Math.sin(l)*r*.7],[.24-i*.02,.15,.2-i*.02],1+(i+o)%4,i<2)}e+=.26}const t=[0,e+.1,0];for(let i=0;i<6;i++){const r=i/6*Math.PI*2;n.seg(E.add(t,[Math.cos(r)*.12,0,Math.sin(r)*.12]),E.add(t,[Math.cos(r)*.3,.35,Math.sin(r)*.3]),.02,.02,s.FRAME,{group:6})}n.seg(E.add(t,[0,-.3,0]),t,.05,.05,s.FRAME,{group:6}),n.ell(E.add(t,[0,.14,0]),[.2,.07,.2],s.SHADES,{group:7})},"stump-throne"(n){n.ell([0,.28,0],[.92,.34,.86],s.TRUNK,{group:1,rough:.015,paint:zr}),n.ell([0,.58,0],[.84,.06,.78],s.BARKL,{group:1,paint:e=>Math.abs(Math.sin(Math.hypot(e[0],e[2])*30))<.3?s.BARK2:void 0}),n.box([-.55,1.15,0],[.18,.62,.62],s.TRUNK,{round:.1,rough:.01,group:2,paint:zr});for(const e of[-.6,.6])n.box([-.1,.72,e],[.45,.14,.12],s.TRUNK,{round:.06,group:3,paint:zr});for(let e=0;e<6;e++){const t=e/6*Math.PI*2+.3;cn(n,[[Math.cos(t)*.8,.25,Math.sin(t)*.8,.18],[Math.cos(t)*1.4,.02,Math.sin(t)*1.3,.06]],4)}n.seg([1.5,.18,.8],[1.5,.18,.2],.18,.18,s.TRUNK,{group:5,paint:e=>e[2]>.78||e[2]<.22?s.BARKL:zr(e)}),n.seg([1.5,.3,.5],[1.6,.75,.5],.025,.025,s.WOOD,{group:6}),n.box([1.5,.36,.5],[.1,.06,.015],s.FRAME,{group:6});for(let e=0;e<6;e++){const t=e<3?0:1,i=e%3;n.seg([-1.7+i*.3+t*.15,.15+t*.26,-.7],[-1.7+i*.3+t*.15,.15+t*.26,.2],.14,.14,s.TRUNK,{group:7+e%2,paint:r=>r[2]>.16||r[2]<-.66?s.BARKL:void 0})}},"swing-beech"(n){cn(n,[[0,0,-.3,.45],[0,1.6,-.3,.36],[-.1,2.8,-.4,.26]],1),cn(n,[[0,2.2,-.3,.2],[1,2.6,-.2,.14],[1.9,2.75,-.1,.08]],2),cn(n,[[-.05,2.5,-.35,.18],[-1.2,3,-.4,.1]],3);for(let e=0;e<5;e++){const t=e/5*Math.PI*2;cn(n,[[Math.cos(t)*.35,.3,-.3+Math.sin(t)*.3,.2],[Math.cos(t)*.9,.02,-.3+Math.sin(t)*.8,.07]],4)}for(const[e,t]of[[[0,3.4,-.6],[1.4,.8,1]],[[1.4,3.1,-.4],[.9,.55,.7]],[[-1.3,3.2,-.6],[.9,.6,.7]]])Ba(n,e,t,5);for(const e of[-.12,.12])n.seg([1.3,2.65,e],[1.3,.55,e],.012,.012,s.STRAW,{group:6});n.box([1.3,.53,0],[.08,.025,.18],s.WOOD,{round:.01,group:6});for(let e=0;e<9;e++)n.ell([(ut(e,1)-.5)*3,.05+ut(e,2)*.5,(ut(e,3)-.3)*1.6],[.022,.022,.022],s.MAGIC,{group:20+e,extra:!0})},bower(n){for(const t of[-.9,0,.9])for(const i of[-.6,.6])n.seg([t,0,i],[t,1.2,i],.04,.04,s.WOOD,{group:1});for(const t of[-.9,0,.9])n.chain([[t,1.2,-.6,.04],[t,1.62,-.3,.04],[t,1.72,0,.04],[t,1.62,.3,.04],[t,1.2,.6,.04]],s.WOOD,{group:2});for(const t of[-.6,.6])for(const i of[.5,1])n.seg([-.9,i,t],[.9,i,t],.025,.025,s.WOOD,{group:3});const e=t=>{const i=ut(Math.floor(t[0]*26),Math.floor(t[1]*26)+Math.floor(t[2]*26)*3);return i<.12?s.BELLY:i<.2?s.STRAW:i>.85?s.LEAF2:void 0};for(const[t,i]of[[[-.6,1.6,0],[.6,.3,.75]],[[.5,1.65,0],[.65,.3,.75]],[[-.95,.9,-.55],[.25,.65,.25]],[[.95,.8,-.6],[.25,.55,.25]],[[-.9,.7,.62],[.22,.5,.2]],[[.2,1.3,-.65],[.5,.4,.2]]])n.ell(t,i,s.LEAF,{group:4,rough:.04,paint:e});n.box([0,.4,-.35],[.6,.04,.15],s.WOOD,{round:.02,group:5});for(const t of[-.5,.5])n.seg([t,0,-.35],[t,.38,-.35],.03,.03,s.WOOD,{group:5})}},zu={moor:["sleeping-giant","the sleeping giant, a moss mound like a figure lying on its back",1],"fern-forest":["fern-grotto","a ring of giant tree ferns round a stone basin",1],"muddy-forest":["sunken-boat","an old rowing boat sunk in the mud",1.15],"tangly-forest":["bramble-wagon","an old wagon wrapped in brambles",1.1],"wispy-forest":["beehive-tree","a many-trunked tree with a great wild honeycomb",1],"hazel-forest":["fairy-ring","a ring of fairy stones and toadstools",1.1],"twiggy-forest":["charcoal-hut","a charcoal burner's hut of sticks, its mound smouldering",1],ancient:["root-arch","a great arch of roots over mossy stones",1.1],norway:["turf-hut","a log cabin with a turf roof",1.15],"alder-forest":["heron-rookery","an alder holding herons' stick nests",1],meadow:["sundial","a moonlit sundial on a stone dais in a ring of flowers",1.2],"berry-thicket":["bear-den","a bear's den in a bramble mound",1.1],wetland:["stilt-hut","a fisher's hut on stilts over a pool",1.1],bog:["bog-shrine","a carved post shrine to the bog, will-o'-wisps over the pool",1.1],deadwood:["raven-tree","a dead tree where the ravens gather",1],grassland:["barrow","a barrow with a stone doorway",1],heath:["cairn","a tall cairn with an old beacon basket",1.4],"old-pinewood":["stump-throne","a woodcutter's stump throne",1.1],"bluebell-glade":["swing-beech","a great beech with a rope swing, glowworms beneath",1],"honeysuckle-tangle":["bower","a honeysuckle bower with a bench",1.2]};function Sd(n){let e=n.w,t=-1,i=n.h;for(let a=0;a<n.h;a++)for(let o=0;o<n.w;o++)n.m[a*n.w+o]&&(e=Math.min(e,o),t=Math.max(t,o),i=Math.min(i,a));const r=new qt(t-e+1,n.h-i);for(let a=0;a<r.h;a++)for(let o=0;o<r.w;o++){const l=(a+i)*n.w+o+e;n.m[l]&&r.put(o,a,n.m[l],n.n[l*3],n.n[l*3+1],n.n[l*3+2])}return{sp:r,x0:e,y0:i}}function Ed(n,e){const t=n.leaf,i=e.trunkHue??.07;return{[s.TRUNK]:me(i,.45,.36),[s.BARKD]:me(i+.03,.5,.17),[s.BARKL]:me(i,.35,.55),[s.BARK2]:me(i+.02,.45,.26),[s.LEAF]:me(t,.55,.45),[s.LEAF2]:me(t-.03,.5,.62),[s.LEAF3]:me(t+.03,.6,.26),[s.STONE]:[122,120,128],[s.STONED]:[62,60,70],[s.MOSS]:me(.26,.45,.45),[s.WOOD]:[128,92,58],[s.STRAW]:[190,162,104],[s.CLOTH]:[228,220,200],[s.EAR]:[168,96,66],[s.FRAME]:[150,128,84],[s.SHADES]:[30,28,36],[s.ACCENT]:[196,40,52],[s.BELLY]:[232,228,214],[s.BODY2]:[210,170,60],[s.FLOWER]:[180,140,230],[s.WEB]:[228,228,234],[s.WATER]:[52,78,104],[s.NOSE]:[16,14,20],[s.GLOW]:[255,120,40],[s.MAGIC]:me(e.magicHue??.45,.6,1),[s.MAGIC2]:me(e.magicHue??.45,.2,1),[s.RUNE]:[120,230,255],[s.LINE]:[24,22,30]}}function yd(n,e,t,i=16){const r=new it({blend:.05});bd[n](r),r.ell([0,.004,0],[.01,.004,.01],s.NOSE,{group:0});const a=(Object.values(zu).find(([d])=>d===n)||[,,1])[2],o=Ii(r,{scale:ku(t)*a}),{sp:l,x0:c,y0:u}=Sd(o.sp),[h,f]=o.project([0,0,0]);return{sp:l,colours:Ed(e,t),origin:{x:+(h-c).toFixed(1),y:+(f-u).toFixed(1)},metres:{width:+(l.w/i).toFixed(1),height:+(l.h/i).toFixed(1)}}}const wd=1.3,Ad=n=>[1,Math.sqrt(n.growth),Math.sqrt(n.growth)*wd,n.growth],sa=(n,e,t=1)=>Math.round(e.size*Ad(e)[Math.max(0,Math.min(3,n))]*(2/(e.pixel||2))*1.9*t),Ol=(n,e)=>{const t=Dl(e);for(let i=0;i<9;i++){const r=Math.floor(ce(t,2,n.w-2)),a=Math.floor(ce(t,2,n.h*.6));if(!(n.get(r,a)||n.get(r+1,a)||n.get(r-1,a)||n.get(r,a+1)||n.get(r,a-1))&&(n.px(r,a,s.MAGIC2),i%3===0))for(const[o,l]of[[1,0],[-1,0],[0,1],[0,-1]])n.px(r+o,a+l,s.MAGIC)}};function Us(n,e,t,i,r,a,o,l){const c=E.add(e,[-i*.7,i*(.75+r),t*i*.35]),u=E.norm(E.sub(c,e)),h=E.norm(E.sub([1,0,0],E.mul(u,E.dot([1,0,0],u)))),f=Math.hypot(...E.sub(c,e));n.flat(E.add(E.lerp(e,c,.5),E.mul(h,-i*.14)),u,h,f*.55,i*.34,xr.wing(a,o),{group:l,extra:!0})}const Il=(n,e,t=1)=>n===0?Math.round(Math.max(12,Math.min(30*Math.max(.75,Math.min(1.1,t)),sa(1,e)*t*.72))):n===2?Math.round(Math.max(sa(1,e)*t*1.08,Math.min(sa(2,e,t),sa(1,e)*1.4))):sa(n,e)*t;let Ms=null;function Td(n,e){const t=Ms;Ms=n;try{return e()}finally{Ms=t}}const Rd=(n,e)=>{const t=Math.atan2(e,n);return Math.hypot(n,e)<.55+.4*Math.pow(Math.abs(Math.cos(t*2.5+Math.PI/2)),3)},Cd=(n,e)=>{const t=n*1.2,i=-e*1.2+.25;return Math.pow(t*t+i*i-.6,3)-t*t*i*i*i<0};function Nl(n){const e=Ms,t=n.anchors;if(!e)return;const i=t.head,r=i?Math.max(...i.r):.2;if(e.collar&&(t.neck||i)){const a=t.neck||{c:E.add(i.c,[-i.r[0]*.8,-i.r[1]*.4,0]),r:i.r[1]*.75,dir:E.norm([1,.4,0])},o=E.norm(a.dir),l=E.norm(E.cross(o,Math.abs(o[2])<.9?[0,0,1]:[1,0,0])),c=E.cross(o,l),u=[],h=Math.max(.03,a.r*.2);for(let x=0;x<=16;x++){const M=x/16*Math.PI*2,m=E.add(E.mul(l,Math.cos(M)),E.mul(c,Math.sin(M)));let _=0;for(;_<.8&&n.field(E.add(a.c,E.mul(m,_)))<0;)_+=.01;_>=.8&&(_=a.r),u.push([...E.add(a.c,E.mul(m,_+h*.7)),h])}n.chain(u,s.COLLAR,{group:60,extra:!0});const f=u.reduce((x,M)=>M[0]-M[1]*.6+M[2]*.5>x[0]-x[1]*.6+x[2]*.5?M:x),d=h*1.3*(a.tag||1),p=E.norm(E.add(E.norm(E.sub(f.slice(0,3),a.c)),[.3,-.5,.3]));let g=f.slice(0,3);for(let x=0;x<60&&n.field(g)<d*.4;x++)g=E.add(g,E.mul(p,.01));n.ell(g,[d,d,d*.6],s.COLLAR,{group:60,extra:!0})}if(e.hat!=null&&i){const a=Math.max(r,.13),o=i.top||E.add(it.surface(i.c,i.r,E.norm([-.15,1,.1])),[0,r*.1,0]),l=E.norm([.3,1,.35]),c=a*1.5,u=E.add(o,E.mul(l,c));n.seg(E.add(o,E.mul(l,-a*.1)),u,a*.48,a*.04,s.HAT1,{group:61,extra:!0,paint:h=>Math.floor(E.dot(E.sub(h,o),l)/(c/5)+10)%2?s.HAT2:void 0}),n.ell(u,[a*.17,a*.17,a*.17],s.POM,{group:61,extra:!0})}if(e.glasses&&t.eyes&&i){const[a,o]=t.eyes.pts,l=u=>E.add(u,E.mul(E.norm(E.sub(u,i.c)),t.eyes.size*.45)),c=Math.max(t.eyes.size*1.05,r*.1);if(e.glasses==="bar")n.seg(l(a),l(o),c,c,s.SHADES,{group:62,extra:!0}),n.ell(E.add(l(o),[c*.3,c*.5,c*.2]),[c*.25,c*.25,c*.25],s.GLINT,{group:62,extra:!0});else for(const u of[a,o]){const h=E.norm(E.sub(u,i.c)),f=E.norm(E.cross([0,1,0],h)),d=E.cross(h,f),p=e.glasses==="heart"?Cd:Rd,g=c*1.5;n.flat(l(u),f,d,g,g,(x,M)=>p(x,M)?p(x*1.3,M*1.3)?s.SHADES:s.FRAME:null,{group:62,bend:.1,extra:!0}),n.seg(l(a),l(o),c*.18,c*.18,s.FRAME,{group:62,extra:!0})}}if(e.shoes)for(const a of t.feet){const o=e.shoes==="platform",l=a.r,c=E.add(a.c,[l*.25,l*(o?.35:.15),0]);n.ell(c,[l*1.45,l*(o?1.2:.85),l*1.15],s.SHOE,{group:a.group,extra:!0,paint:u=>u[1]<c[1]-l*(o?.45:.4)?s.SOLE:e.shoes==="glitter"&&Qn(u,60,.28)?s.GLINT:void 0})}}function Ld(n,e,t,i,r="towards"){const a={legW:1,earS:1,hgt:1,bw:.3,...n.q},o=e===3,l=e===1,c=e===0,u=F=>o&&n.legend.includes(F),h=new it,f=a.hr*(c?1.75:l?1.25:1)*(i.head/.44)**.5,d=a.len*(c?.8:l?.9:1.02)*i.long,p=c?.55:l?.9:1.04,g=t?-.04:0,x=1+g,M=a.chest*(o?1.06:1)/p+g,m=a.tuck/p+g,_=a.bw*(c?1.15:e>=2?1.06:1)*(a.legW>1.2?1.15:1),y=.06*a.legW*(o?1.1:c?1.7:1),S=a.back==="hump"?.1:0,R=a.back==="arch"?.1:0,A=M+.12,D=F=>{if(a.belly&&F[1]<A&&F[0]>-d*.5)return s.BELLY;if(a.saddle&&F[1]>x-.18&&F[0]<d*.55)return s.BODY2;if(a.spots&&F[1]>M+.1&&Qn(F,10,.22))return a.spotMat==="belly"||a.spots==="young"&&l?s.BELLY:a.spots==="young"?void 0:s.BODY3;if(a.ridge&&F[1]>x-.08+S*.5)return s.BODY3};if(h.ell([d*.48,(x+M)/2+S*.5,0],[d*.62,(x-M)/2+S*.5,_],s.BODY,{paint:D}),h.ell([-d*.5,(x+m)/2+R*.6,0],[d*.58,(x-m)/2+R*.6,_*.93],s.BODY,{paint:D}),h.ell([0,(x+(M+m)/2)/2+.02,0],[d*.6,(x-(M+m)/2)/2,_*.9],s.BODY,{paint:D}),a.ridge)for(let F=0;F<(o?16:10);F++){const re=-d*.8+F*d*1.75/(o?15:9),ue=(.07+(o?.04:0))*(1+.5*Math.max(0,re/d));h.ell([re,x+.02+S*Math.max(0,1-Math.abs(re/d-.5)*2)+ue*.5,0],[ue,.03,_*.25],s.BODY3,{dir:[-.3,1,0],up:[1,0,0]})}if(a.wool)for(let F=0;F<14;F++){const re=F/14*Math.PI*2;h.ell([d*Math.cos(re)*.7,(x+M)/2+Math.sin(re)*.2,_*(F%2?.5:-.5)],[.16,.14,.14],s.BODY)}const b=[.32,-.32][t],w=(F,re)=>{const ue=re*_*.62,Pe=F?d*.62:-d*.62,He=(F?1:-1)*re*b,Xe=F?M+.1:m+.15,j=(F?re:-re)*(t?1:-1)>0?.06:0,ie=[Pe+Math.sin(He)*.2+(F?.02:.1),Math.max(.3,Xe*.55),ue],G=[Pe+Math.sin(He)*.42,.05+j,ue],he=[Pe,Xe+.12,ue*.8],se=re>0?a.legMat||s.BODY:a.legMat?s.BODY3:s.BODY2,Ae=F?[[...he,y*1.5],[...ie,y*1.05],[...G,y*.9]]:[[...he,y*2*(a.haunch||1)],[...E.add(ie,[-.12,.06,0]),y*1.2],[...E.add(G,[-.06*(a.hindFoot||1),.12,0]),y*.9],[...G,y*.9]];h.chain(Ae,se,{group:re>0?6+(F?1:0):2,paint:a.socks?Oe=>Oe[1]<a.socks?s.BODY3:void 0:void 0});const tt=(a.paw==="hoof"?.07:.09)*a.legW**.5*(F?1:a.hindFoot||1);h.ell(E.add(G,[tt*.5,-.01,0]),[tt,y*.9,y*1.1],a.paw==="hoof"?s.NOSE:se,{group:re>0?6+(F?1:0):2}),h.anchors.feet.push({c:E.add(G,[tt*.5,-.01,0]),r:Math.max(tt,y*1.1),group:re>0?6+(F?1:0):2})};for(const F of[-1,1])w(!0,F),w(!1,F);const L=[d*.82,x-.12,0],C=[L[0]+Math.cos(a.neckAng)*a.neck*.9,L[1]+Math.sin(a.neckAng)*a.neck*.9+(c?.1:0),0];h.seg(L,C,a.neckW*.55,a.neckW*.42,s.BODY,{paint:F=>a.belly&&F[1]<(L[1]+C[1])/2-.05?s.BELLY:a.face==="dark"?s.BODY2:void 0});const I=F=>{if(a.face==="badger")return Math.abs(F[2])<f*.22+(F[0]-C[0])*.1||F[1]<C[1]-f*.1?s.BELLY:s.BODY3;if(a.face==="dark")return s.BODY2;if((a.belly||a.muzzle)&&F[1]<C[1]-f*.35)return s.BELLY};h.ell(C,[f*1.05,f*.92,f*.88],s.BODY,{paint:I});const N=f*a.snout*(c?.55:l?.78:1),O=f*a.snoutD*.55,B=[C[0]+f*.65+N*.5,C[1]-f*.28,0];h.ell(B,[N*.62+f*.2,O,O*.95],s.BODY,{dir:[1,-.25,0],paint:F=>(a.muzzle||a.belly)&&F[1]<B[1]-O*.1?s.BELLY:I(F)});const W=[B[0]+N*.62+f*.1,B[1]-.02,0];h.ell(W,[f*(a.disc?.1:.12),f*(a.disc?.2:.12),f*(a.disc?.2:.15)],s.NOSE,{group:1});for(const F of[-1,1]){const re=it.surface(C,[f*1.05,f*.92,f*.88],E.norm([.75,.32,F*.62]));h.ell(re,[f*.13,f*.16,f*.13].map(ue=>ue*(a.eyeK||1)*(c?1.5:l?1.2:1)),o&&!a.tusks?s.MAGIC2:s.EYE,{group:1})}h.anchors.head={c:C,r:[f*1.05,f*.92,f*.88],top:[C[0]-f*.1,C[1]+f*.82,0]},h.anchors.eyes={pts:[-1,1].map(F=>it.surface(C,[f*1.05,f*.92,f*.88],E.norm([.75,.32,F*.62]))),size:f*.16*(a.eyeK||1)*(c?1.5:l?1.2:1)},h.anchors.neck={c:E.lerp(L,C,c?.05:l?.25:.42),r:a.neckW*.5*(c?1.3:l?1.12:1),dir:E.norm(E.sub(C,L)),tag:c?1.8:l?1.3:1};for(const F of[-1,1]){const re=a.ear,ue=[C[0]-f*.15,C[1]+f*.7,F*f*.5],Pe=a.earS*(c?1.2:1)*(a.ear==="long"?.62:1);if(re==="none")continue;if(re==="round"){h.ell(ue,[f*.22,f*.25*Pe,f*.1],s.BODY,{group:1,paint:Ae=>Ae[0]>ue[0]+f*.02?s.EAR:void 0});continue}const He=re==="long",Xe=re==="small"?-.6:0,j=f*.55*Pe*(re==="big"?1.35:He?2.2:1),ie=f*.3*(re==="big"?1.2:He?1.35:1),G=E.norm([Xe*.6-(He?.3:.12),1,F*.3]),he=E.norm([.55,.2,F]),se=E.norm(E.cross(he,G));h.flat(E.add(ue,E.mul(G,j)),se,G,ie,j,xr.ear(s.BODY,s.EAR,s.BODY3),{group:5+(F>0?0:20),extra:He}),re==="tuft"&&h.seg(E.add(ue,[0,j*1.4,F*.02]),E.add(ue,[0,j*1.85,F*.04]),f*.05,f*.02,s.BODY3,{group:1})}const $=[-d*1.05,x-.1+R*.5,0],ae=t?.04:-.02;if(u("tails")||Dd(h,u("starTail")?"star":a.tail,$,d,x,ae),a.horns)for(const F of[-1,1]){const re=l?.6:c?.35:u("hornsGlow")?1.4:1,ue=[];for(let Pe=0;Pe<=8;Pe++){const He=.3-Pe/8*Math.PI*1.6,Xe=f*.65*re*(1-.45*Pe/8);ue.push([C[0]-f*.1+Math.cos(He)*Xe,C[1]+f*.45+Math.sin(He)*Xe,F*(f*.6+Pe*.015)]),ue[Pe].push(f*.2*re*(1-.6*Pe/8))}h.chain(ue,u("hornsGlow")?s.MAGIC:s.ACCENT,{group:13})}if(a.antlers||u("jackalope"))for(const F of[-1,1])Pd(h,a,[C[0]-f*.05,C[1]+f*.75,F*f*.4],F,e,u);if(a.tusks)for(const F of[-1,1]){const re=l?.4:c?0:u("tusksBig")?1.3:.75;if(!re)continue;const ue=[B[0]+N*.25,B[1]-O*.4,F*O*.8];h.chain([[...ue,.045*re],[...E.add(ue,[.1*re,.1*re,F*.03]),.04*re],[...E.add(ue,[.06*re,.24*re,F*.05]),.02*re]],s.ACCENT,{group:8})}a.teeth&&!c&&h.ell([W[0]-f*.1,W[1]-f*.25,0],[f*.08,f*.14,f*.12],s.ACCENT,{group:1});const q=F=>[-d*.9+F*d*1.65,x+S*Math.max(0,1-Math.abs(F-.8)*3)+R*(1-Math.abs(F-.4)*2),0];if(u("wings"))for(const F of[-1,1])Us(h,[d*.2,x,F*_*.5],F,1.15,t?.1:0,F>0?s.MAGIC2:s.MAGIC,s.MAGIC,40+(F>0?10:0));if(u("mane")||u("flames"))for(let F=0;F<7;F++){const re=F/6,ue=E.lerp(E.add(C,[-f*.5,f*.3,0]),q(.55),re),Pe=[.4,.3,.45,.28,.38,.25,.3][F],He=E.norm([-.35-(t?.1:0),1,0]);h.flat(E.add(ue,E.mul(He,Pe*.5)),[1,0,0],He,Pe*.32,Pe*.55,xr.flame(F%2?s.MAGIC:s.MAGIC2,s.MAGIC2),{group:60+F%2,extra:!0})}if(u("tails"))for(let F=0;F<7;F++){const re=Math.PI*(.55+F*.08),ue=(F-3)*.1,Pe=E.add($,[Math.cos(re)*.9,Math.sin(re)*.85,ue]);h.chain([[...$,.1],[...E.lerp($,Pe,.5),.17],[...Pe,.08]],F%2?s.BODY2:s.BODY,{group:70,extra:!0}),h.ell(Pe,[.09,.09,.09],s.MAGIC2,{group:71,extra:!0})}if(u("crystals")&&[.15,.3,.45,.6,.75].forEach((F,re)=>{const ue=q(F),Pe=[.3,.5,.4,.6,.35][re];h.ell(E.add(ue,[0,Pe*.45,(re%2-.5)*.1]),[Pe*.55,.08,.08],s.MAGIC,{dir:[(re-2)*.12,1,0],group:80+re%2,extra:!0,paint:He=>He[2]>0?s.MAGIC2:void 0})}),u("moss")){for(let F=0;F<6;F++)h.ell(q(.08+F*.15),[d*.22,.07,_*.85],s.LEAF,{group:85,extra:!0});for(const[F,re]of[[.25,.55],[.5,.8],[.75,.45]]){const ue=q(F);h.seg(ue,E.add(ue,[0,re*.7,0]),.04,.025,s.TRUNK,{group:86,extra:!0}),h.ell(E.add(ue,[0,re*.8,0]),[re*.28,re*.26,re*.28],s.LEAF2,{group:87,extra:!0,paint:Pe=>Pe[1]<ue[1]+re*.72?s.LEAF3:void 0})}for(const F of[.12,.4,.65,.9]){const re=q(F);h.ell(E.add(re,[0,.12,_*.3]),[.07,.035,.07],s.MAGIC,{group:89,extra:!0})}}if(u("ribbons"))for(let F=0;F<3;F++){const re=[];for(let ue=0;ue<9;ue++){const Pe=ue/8;re.push([d*(.5-Pe*2.2),x+.05+F*.1+Pe*(.25+F*.12)+Math.sin(Pe*6+t+F)*.07,(F-1)*.18,.04*(1-Pe*.6)])}h.chain(re,F%2?s.MAGIC2:s.MAGIC,{group:90+F,extra:!0})}Nl(h);const{sp:ee}=Ii(h,{height:Il(e,i,a.hgt),facing:r});return o&&Ol(ee,n.id.length*7919),ee}function Dd(n,e,t,i,r,a){const o={group:3},l=c=>-i*c;e==="brush"?n.chain([[...t,.1],[l(1.3),r-.25+a,0,.15],[l(1.4),r-.55,0,.14],[l(1.35),.38+a,0,.09]],s.BODY,{...o,paint:c=>c[1]<.32?s.BODY3:void 0}):e==="bushy"?n.chain([[...t,.1],[l(1.05)-.35,r-.05+a,0,.17],[l(1.05)-.75,r-.2+a,0,.18],[l(1.05)-1,r-.35+a,0,.1]],s.BODY,{...o,paint:c=>c[0]<l(1.05)-.82?s.BELLY:void 0}):e==="stub"||e==="deer"||e==="bob"?n.ell(E.add(t,[-.06,.02+a,0]),[.1,.08,.07],e==="deer"?s.BELLY:s.BODY,{...o,paint:e==="bob"?c=>c[0]<t[0]-.08?s.BODY3:void 0:void 0}):e==="puff"?n.ell(E.add(t,[-.04,.02,0]),[.11,.11,.1],s.BELLY,o):e==="squirrel"||e==="star"?n.chain([[...t,.12],[l(1.3),r+.05+a,0,.25],[l(1.3),r+.6+a,0,.3],[l(1),r+.95+a,0,.27],[l(.65),r+.9+a,0,.16]],e==="star"?s.MAGIC:s.BODY,{...o,extra:!0,paint:e==="star"?c=>Qn(c,14,.12)?s.GLINT:void 0:void 0}):e==="otter"?n.chain([[...t,.17],[l(1.3),r-.45+a,0,.12],[l(1.6),.1,0,.07],[l(1.85),.06+a,0,.03]],s.BODY,o):e==="stoat"?n.chain([[...t,.08],[l(1.3),r-.12+a,0,.07],[l(1.6),r-.05+a,0,.06]],s.BODY,{...o,paint:c=>c[0]<l(1.45)?s.BODY3:void 0}):e==="flat"?(n.seg(t,[l(1.15),.3,0],.08,.07,s.BODY2,o),n.ell([l(1.4),.1+a*.5,0],[.28,.03,.14],s.BODY3,o)):e==="thin"&&(n.chain([[...t,.04],[l(1.1),r-.3,0,.03],[l(1.12)+a,r-.55,0,.025]],s.BODY,o),n.ell([l(1.12)+a,r-.62,0],[.04,.07,.04],s.BODY3,o))}function Pd(n,e,t,i,r,a){const o=!e.antlers,l=o?.45:[0,.5,.95,.95][r]*(a("antlersGlow")?1.15:1),c=a("antlersGlow")?i>0?s.MAGIC2:s.MAGIC:s.ACCENT,u={group:11+(i>0?1:0),extra:!0};if(!l)return;const h=.045*Math.max(.8,l),f=i*.35*l;if(e.antlers==="palm"){const M=E.add(t,[-.06*l,.12*l,f*.3]);n.seg(t,M,h*1.3,h*1.2,c,u);for(let m=0;m<5;m++){const _=.35+m*.3,y=E.norm([-Math.cos(_),Math.sin(_)*.9,i*.55]),S=(.24+.05*(m%2))*l;n.ell(E.add(M,E.mul(y,S*.55)),[S*.6,h*1.5,h*.6],c,{...u,dir:y,up:[0,0,1]})}return}const d=E.add(t,[-.18*l,.3*l,f*.4]),p=E.add(t,[-.25*l,.62*l,f*.8]),g=E.add(t,[-.1*l,.95*l,f]);n.chain([[...t,h*1.2],[...d,h],[...p,h*.85],[...g,h*.4]],c,u);const x=(M,m,_,y)=>n.seg(M,E.add(M,E.mul(E.norm(m),_)),y,y*.35,c,u);x(E.add(t,[-.04*l,.1*l,f*.1]),[1,.6,0],.28*l,h*.8),(l>.4||o)&&x(d,[1,.9,0],.3*l,h*.7),l>.7&&(x(p,[.8,1,0],.28*l,h*.6),x(g,[.3,1,i*.2],.18*l,h*.5))}function Od(n,e,t,i,r="towards"){const a=e===3,o=e===1,l=e===0,c=g=>a&&n.legend.includes(g),u=new it,h=t?.03:0,f=l?.48:o?.42:.36,d=(l?.95:1.08)+h;for(const g of[-1,1]){const x=t&&g>0?.04:0;u.seg([.05,.2,g*.14],[.08,.05+x,g*.15],.07,.06,s.BODY2,{group:2});for(const M of[-.04,0,.04])u.ell([.16,.03+x,g*.15+M],[.06,.025,.02],s.ACCENT,{group:2});u.anchors.feet.push({c:[.13,.04+x,g*.15],r:.08,group:g>0?6:2})}if(u.ell([-.32,.32,0],[.22,.06,.14],s.BODY2,{dir:[-1,-.6,0],group:3}),u.ell([0,.55+h,0],[.36,.52,.36],s.BODY,{paint:g=>g[0]>.12&&g[1]<d-f*.5?Math.floor(g[1]*18)%3===0&&Qn(g,16,.5)?s.BODY2:s.BELLY:void 0}),!c("wings"))for(const g of[-1,1])u.ell([-.06,.58+h,g*.3],[.4,.3,.08],s.BODY2,{dir:[-.3,-1,0],up:[1,0,0],group:g>0?4:2,paint:x=>Qn(x,12,.15)?s.BODY3:void 0});u.ell([0,d,0],[f,f*.9,f],s.BODY);for(const g of[-1,1]){const x=E.norm([.75,-.05,g*.4+.35]),M=E.add(it.surface([0,d,0],[f,f*.9,f],x),E.mul(x,-f*.05));u.ell(M,[f*.22,f*.46,f*.4],s.BELLY,{group:1,dir:x});const m=E.add(M,E.mul(x,f*.14));u.ell(m,[f*.1,f*.26,f*.24].map(_=>_*(l?1.15:1)),a?s.MAGIC:s.IRIS,{group:1,dir:x}),u.ell(E.add(m,E.mul(x,f*.07)),[f*.08,f*.14,f*.13].map(_=>_*(l?1.15:1)),a?s.MAGIC2:s.EYE,{group:1,dir:x}),(u.anchors.eyes||={pts:[],size:f*.22}).pts.push(E.add(m,E.mul(x,f*.07))),l||u.ell([f*.05,d+f*.8,g*f*.6],[f*.32,f*.12,f*.08],s.BODY2,{dir:[-.1,1,g*.7],up:[1,0,0],group:1})}if(u.ell(it.surface([0,d,0],[f,f*.9,f],E.norm([.75,-.35,.35])),[f*.2,f*.12,f*.1],s.ACCENT,{dir:[.6,-1,.3],group:1}),c("wings"))for(const g of[-1,1])Us(u,[-.05,.8+h,g*.3],g,1.3,t?.12:0,g>0?s.MAGIC2:s.MAGIC,s.MAGIC,40+(g>0?10:0));if(c("eyesRing"))for(let g=0;g<7;g++){const x=Math.PI*(.15+g/6*.7);u.ell([Math.cos(x)*.2-.1,d+.1+Math.sin(x)*.6,(g-3)*.15],[.07,.07,.07],s.MAGIC2,{group:95+g,extra:!0}),u.ell([Math.cos(x)*.2-.05,d+.1+Math.sin(x)*.6,(g-3)*.15],[.035,.035,.035],s.EYE,{group:95+g,extra:!0})}u.anchors.head={c:[0,d,0],r:[f,f*.9,f]},u.anchors.neck={c:[0,d-f*.75,0],r:f*.85,dir:[0,1,0]},Nl(u);const{sp:p}=Ii(u,{height:Il(e,i,.95),facing:r});return a&&Ol(p,31),p}const tr=(n,e,t,i,r,a,o=1)=>{for(const l of i)n.ell(it.surface(e,t,E.norm(l)),[r,r*1.2,r],a,{group:o});n.anchors.head||={c:e,r:t},n.anchors.eyes||={pts:i.map(l=>it.surface(e,t,E.norm(l))),size:r}},Hu=(n,e,t)=>n.ell([e,.005,0],[t,.005,t*.6],s.NOSE,{group:0});function Wn(n,e,t,i,r,a){Nl(n);const{sp:o}=Ii(n,{height:Il(t,i,r),facing:a});return t===3&&Ol(o,e.id.length*131),o}const Gu=(n,e,t)=>{n.ell(e,[t,t*.35,t],s.MAGIC,{group:95,extra:!0,paint:i=>i[1]>e[1]?s.MAGIC2:void 0});for(let i=0;i<5;i++){const r=i/5*Math.PI*2;n.ell(E.add(e,[Math.cos(r)*t*.8,t*.55,Math.sin(r)*t*.8]),[t*.38,t*.12,t*.12],s.MAGIC,{dir:[0,1,0],up:[1,0,0],group:96,extra:!0})}},Fl=(n,e)=>e.forEach(([t,i],r)=>n.ell(E.add(t,[0,i*.45,0]),[i*.55,.07,.07],s.MAGIC,{dir:[(r%3-1)*.25,1,(r%2-.5)*.3],group:80+r%2,extra:!0,paint:a=>a[2]>t[2]?s.MAGIC2:void 0}));function Id(n,e,t,i,r="towards"){const a=e===3,o=new it,l=t?.03:0;for(const[f,d]of[[.28,.2],[.28,-.2],[-.28,.2],[-.28,-.2]])o.seg([f,.15,d],[f+(d>0?l:-l),.03,d],.06,.05,s.BODY3,{group:d>0?6:2}),o.anchors.feet.push({c:[f+.03+(d>0?l:-l),.03,d],r:.065,group:d>0?6:2});const c=[0,.32,0],u=[.5,.32,.38];o.ell(c,u,s.BODY2,{paint:f=>Qn(f,22,.3)?s.BODY3:Qn(f,19,.12)?s.BELLY:void 0});for(let f=0;f<46;f++){const d=f*2.399%(Math.PI*2),p=f/46*.9+.05,g=E.norm([Math.cos(d)*Math.sin(p*Math.PI*.5)-.25,Math.cos(p*Math.PI*.5)*.9+.1,Math.sin(d)*Math.sin(p*Math.PI*.5)]);g[0]>.55||o.ell(E.add(it.surface(c,u,g),E.mul(g,.02)),[.1,.025,.025],f%4?s.BODY2:s.BODY3,{dir:E.add(g,[-.4,0,0]),group:1})}const h=[.48,.22,0];return o.ell(h,[.22,.14,.15],s.BELLY,{dir:[1,-.3,0],group:1}),o.ell([.69,.16,0],[.04,.04,.04],s.NOSE,{group:1}),tr(o,h,[.22,.14,.15],[[.3,.6,.55],[.3,.6,-.55]],.035,a?s.MAGIC2:s.EYE),a&&Fl(o,[[[-.3,.55,.1],.35],[[-.05,.62,-.1],.5],[[.2,.55,.12],.4],[[-.15,.58,.2],.3]]),Wn(o,n,e,i,.6,r)}function Nd(n,e,t,i,r="towards"){const a=e===3,o=new it,l=t?.05:0;for(const h of[-1,1])o.ell([-.22,.16,h*.36],[.24,.13,.12],h>0?s.BODY:s.BODY2,{dir:[1,.3,0],group:h>0?6:2,paint:f=>Qn(f,14,.15)?s.BODY3:void 0}),o.ell([.05,.04,h*.4],[.16,.04,.08],h>0?s.BODY:s.BODY2,{group:h>0?6:2}),o.seg([.35,.2+l,h*.24],[.42,.03,h*.3],.05,.04,h>0?s.BODY:s.BODY2,{group:h>0?7:2}),o.anchors.feet.push({c:[.45,.03,h*.3],r:.06,group:h>0?7:2},{c:[.12,.04,h*.4],r:.08,group:h>0?6:2});const c=[0,.3+l,0],u=[.5,.28,.4];o.ell(c,u,s.BODY,{paint:h=>h[1]<c[1]-.12?s.BELLY:h[0]>.38&&Math.abs(h[1]-(c[1]-.02))<.018?s.LINE:Qn(h,14,.22)?s.BODY3:void 0});for(const h of[-1,1]){const f=[.3,.55+l,h*.17];o.ell(f,[.1,.09,.1],s.BODY,{group:1}),o.ell(it.surface(f,[.1,.09,.1],E.norm([.6,.5,h*.5])),[.05,.05,.05],a?s.MAGIC2:s.IRIS,{group:1}),o.ell(it.surface(f,[.11,.1,.11],E.norm([.65,.45,h*.5])),[.03,.015,.03],s.EYE,{group:1})}return o.anchors.head={c:[.22,.45+l,0],r:[.3,.2,.3],top:[.18,.62+l,0]},o.anchors.eyes={pts:[-1,1].map(h=>it.surface([.3,.55+l,h*.17],[.1,.09,.1],E.norm([.6,.5,h*.5]))),size:.05},o.anchors.neck={c:[.32,.3+l,0],r:.25,dir:[1,.3,0]},a&&Gu(o,[.15,.66+l,0],.16),Wn(o,n,e,i,.55,r)}function Fd(n,e,t,i,r="towards"){const a=e===3,o=e===1,l=d=>a&&n.legend.includes(d),c=new it,u=t?.02:0;for(const d of[-1,1]){const p=t&&d>0?.04:0;c.seg([0,.3,d*.08],[.03,.03+p,d*.08],.03,.025,s.NOSE,{group:d>0?7:2}),c.ell([.08,.02+p,d*.08],[.08,.015,.04],s.NOSE,{group:2}),c.anchors.feet.push({c:[.07,.03+p,d*.08],r:.06,group:d>0?7:2})}if(c.ell([-.55,.42,0],[.32,.035,.12],s.BODY2,{dir:[-1,-.25,0],group:3}),c.ell([0,.52+u,0],[.42,.26,.24],s.BODY,{dir:[1,.45,0]}),!l("wings"))for(const d of[-1,1])c.ell([-.1,.55+u,d*.2],[.45,.17,.05],s.BODY2,{dir:[-1,-.25,0],group:d>0?4:2});const h=[.36,.84+u,0],f=o?.19:.16;if(c.ell(h,[f*1.1,f,f*.95],s.BODY,{paint:d=>d[1]>h[1]+f*.55?s.BELLY:void 0}),c.ell(E.add(h,[f*1.5,-f*.25,0]),[f*1,f*.38,f*.3],s.NOSE,{dir:[1,-.2,0],group:1}),tr(c,h,[f*1.1,f,f*.95],[[.55,.35,.65],[.55,.35,-.65]],f*.16,a?s.MAGIC2:s.EYE),l("wings"))for(const d of[-1,1])Us(c,[-.05,.65+u,d*.18],d,1.1,t?.1:0,d>0?s.MAGIC2:s.MAGIC,s.MAGIC,40+(d>0?10:0));if(l("eyesRing"))for(let d=0;d<6;d++){const p=Math.PI*(.2+d/5*.6);c.ell([Math.cos(p)*.25-.1,.95+Math.sin(p)*.45,(d-2.5)*.12],[.06,.06,.06],s.MAGIC2,{group:95+d,extra:!0})}return Wn(c,n,e,i,.75,r)}function Ud(n,e,t,i,r="towards"){const a=e===3,o=d=>a&&n.legend.includes(d),l=new it,c=t===0,u=.55,h=o("wingsBig")?1.5:1;Hu(l,0,.3*h);for(const d of[-1,1]){const p=[0,u+.05,d*.1],g=[.05,u+(c?.35:-.05),d*.45*h],x=[[-.05,u+(c?.45:-.15),d*.85*h],[-.25,u+(c?.2:-.25),d*.75*h],[-.3,u+(c?0:-.25),d*.4*h]],M=o("wingsBig")?s.MAGIC:s.BODY2,m=o("wingsBig")?s.MAGIC2:s.BODY3;l.seg(p,g,.03,.025,m,{group:11});for(const A of x)l.seg(g,A,.02,.012,m,{group:11});const _=E.sub(x[0],p),y=E.norm(_),S=E.norm(E.sub(x[2],g)),R=E.norm(E.sub(S,E.mul(y,E.dot(S,y))));l.flat(E.add(E.lerp(p,x[0],.5),E.mul(R,.12*h)),y,R,Math.hypot(..._)*.55,.3*h,xr.membrane(M),{group:10+(d>0?1:0),bend:.2})}l.ell([0,u,0],[.13,.16,.12],s.BODY,{group:1});const f=[.08,u+.2,0];l.ell(f,[.12,.11,.11],s.BODY,{group:1});for(const d of[-1,1])l.ell(E.add(f,[-.02,.15,d*.07]),[.12,.045,.02],s.BODY,{dir:[.1,1,d*.3],up:[1,0,0],group:1,paint:p=>p[0]>f[0]-.01?s.EAR:void 0});return tr(l,f,[.12,.11,.11],[[.7,.2,.5],[.7,.2,-.5]],.025,a?s.MAGIC2:s.EYE),l.ell(it.surface(f,[.12,.11,.11],[1,-.2,0]),[.025,.02,.03],s.NOSE,{group:1}),Wn(l,n,e,i,.55,r)}function Bd(n,e,t,i,r="towards"){const a=e===3,o=new it,l=t?.03:0;o.seg([-.5,.18,0],[-.62,.12,0],.04,.02,s.SKIN,{group:3});for(const c of[-1,1])o.ell([-.3,.05,c*.2],[.07,.04,.05],s.SKIN,{group:c>0?6:2}),o.anchors.feet.push({c:[-.3,.05,c*.2],r:.07,group:c>0?6:2});o.ell([0,.3,0],[.52,.29,.33],s.BODY,{paint:c=>c[1]>.45?s.BODY2:void 0}),o.ell([.55,.24,0],[.2,.07,.07],s.SKIN,{dir:[1,-.15,0],group:1}),o.ell([.74,.21,0],[.04,.05,.06],s.NOSE,{group:1});for(const c of[-1,1]){const u=[.32,.1-(c>0?l:0),c*.34];o.ell(u,[.13,.035,.12],s.SKIN,{group:c>0?7:2,axes:[[1,0,0],[0,1,0],[0,0,1]]});for(let h=0;h<4;h++)o.ell(E.add(u,[.14,-.01,c*(h-1.5)*.05]),[.05,.015,.015],s.ACCENT,{group:c>0?7:2})}for(const c of[-1,1])o.ell(it.surface([0,.3,0],[.52,.29,.33],E.norm([.85,.3,c*.35])),[.015,.015,.015],a?s.MAGIC2:s.EYE,{group:1});return o.anchors.head={c:[.32,.34,0],r:[.25,.22,.25],top:[.3,.58,0]},o.anchors.eyes={pts:[-1,1].map(c=>it.surface([0,.3,0],[.52,.29,.33],E.norm([.85,.3,c*.35]))),size:.03},o.anchors.neck={c:[.36,.3,0],r:.27,dir:[1,.1,0]},a&&Gu(o,[.15,.62,0],.15),Wn(o,n,e,i,.55,r)}function kd(n,e,t,i,r="towards"){const a=e===3,o=f=>a&&n.legend.includes(f),l=new it;for(const f of[-1,1])for(let d=0;d<3;d++){const p=.25-d*.25,g=(d+(f>0?1:0)+t)%2?.06:-.06,x=[p,.22,f*.2];l.chain([[...x,.03],[p+g+(1-d)*.06,.32,f*.42,.025],[p+g*1.5+(1-d)*.15,.02,f*.55,.015]],f>0?s.BODY2:s.BODY3,{group:f>0?7:2})}l.ell([-.12,.34,0],[.46,.24,.32],s.BODY,{paint:f=>Math.abs(f[2])<.018&&f[1]>.4?s.LINE:f[1]>.5&&f[2]>.05&&f[2]<.17?s.BELLY:void 0}),l.ell([.38,.33,0],[.16,.16,.26],s.BODY,{group:1});const c=[.56,.3,0];l.ell(c,[.1,.1,.17],s.BODY2,{group:1});const u=[.3,.5,.7,.75][e]*(o("horn")?1.3:1),h=o("horn")?s.MAGIC:s.BODY3;for(const f of[-1,1]){const d=E.add(c,[.08,.02,f*.1]),p=E.add(d,[u*.7,u*.45,f*u*.15]),g=E.add(p,[u*.25,-u*.12,-f*u*.12]);l.chain([[...d,.045],[...p,.035],[...g,.015]],h,{group:8+(f>0?1:0)}),l.seg(E.lerp(d,p,.55),E.add(E.lerp(d,p,.55),[0,u*.22,0]),.02,.008,h,{group:8})}for(const f of[-1,1])l.chain([[...E.add(c,[.05,.06,f*.1]),.012],[c[0]+.1,.5,f*.22,.012],[c[0]+.2,.5,f*.26,.012]],s.BODY3,{group:9,extra:!0});return tr(l,c,[.1,.1,.17],[[.4,.3,.85],[.4,.3,-.85]],.032,a?s.MAGIC2:s.EYE,9),o("crystals")&&Fl(l,[[[-.35,.5,.1],.3],[[-.1,.55,-.08],.45],[[.1,.5,.1],.35]]),Wn(l,n,e,i,.5,r)}function zd(n,e,t,i,r="towards"){const a=e===3,o=new it,l=t?.04:0;o.ell([0,.07,0],[.6+l,.07,.17],s.SKIN,{group:1}),o.chain([[.45+l,.08,0,.1],[.6+l,.25,0,.09],[.68+l,.28,0,.08]],s.SKIN,{group:1});for(const h of[-1,1])o.seg([.7+l,.32,h*.04],[.78+l,.55,h*.1],.018,.014,s.SKIN,{group:5}),o.ell([.78+l,.57,h*.1],[.03,.03,.03],a?s.MAGIC2:s.EYE,{group:5});o.anchors.head={c:[.68+l,.3,0],r:[.09,.08,.09],top:[.66+l,.38,0]},o.anchors.eyes={pts:[-1,1].map(h=>[.78+l,.57,h*.1]),size:.03},o.anchors.neck={c:[.55+l,.17,0],r:.1,dir:[1,1.2,0]};const c=[-.12,.4,0],u=a?s.MAGIC:s.BODY;return o.ell(c,[.32,.32,.22],u,{group:3,paint:h=>{const f=Math.atan2(h[1]-c[1],h[0]-c[0]);return((Math.hypot(h[0]-c[0],h[1]-c[1])/.32-f/(Math.PI*2)*.3)%.3+.3)%.3<.06?a?s.MAGIC2:s.BODY3:void 0}}),Wn(o,n,e,i,.45,r)}function Hd(n,e,t,i,r="towards"){const a=e===3,o=new it;for(const l of[-1,1])for(let c=0;c<7;c++){const u=-.45+c*.15,h=(c+t)%2?.03:-.03;o.seg([u,.1,l*.22],[u+h,.01,l*.33],.025,.015,s.BODY3,{group:l>0?7:2})}for(const l of[-1,1])o.chain([[.5,.15,l*.08,.02],[.7,.3,l*.2,.015],[.82,.22,l*.26,.012]],s.BODY3,{group:9,extra:!0});return o.ell([0,.18,0],[.58,.2,.3],s.BODY,{paint:l=>(Math.floor((l[0]+.6)*9)%2&&l[1]>.2?s.BODY2:void 0)||(Math.abs((l[0]+.6)*9%1)<.12?s.LINE:void 0)}),tr(o,[0,.18,0],[.58,.2,.3],[[.92,.3,.25],[.92,.3,-.25]],.02,a?s.MAGIC2:s.EYE),a&&Fl(o,[[[-.3,.32,.05],.3],[[0,.37,-.05],.45],[[.25,.32,.05],.32]]),Wn(o,n,e,i,.4,r)}function Gd(n,e,t,i,r="towards"){const a=e===3,o=e===1,l=p=>a&&n.legend.includes(p),c=new it,u=t?.7:0,h=[];for(let p=0;p<=12;p++){const g=p/12;h.push([-.9+g*1.2,.07,Math.sin(g*Math.PI*2+u)*.25*(1-g*.5),.03+.045*Math.sin(Math.min(1,g*1.4)*Math.PI/2)])}h.push([.38,.25,h[12][2],.07],[.42,.45,h[12][2]*.8,.065]),c.chain(h,s.BODY,{paint:p=>p[1]<.05&&p[0]<.35?s.BELLY:Qn([p[0]*1.5,p[1],p[2]],14,.3)?s.BODY3:void 0});const f=[.5,.5,h[13][2]*.8],d=o?.11:.09;if(c.ell(f,[d*1.5,d*.75,d],s.BODY,{dir:[1,-.15,0],group:1}),tr(c,f,[d*1.5,d*.75,d],[[.5,.5,.7],[.5,.5,-.7]],d*.22,a?s.MAGIC2:s.EYE),t||c.seg(E.add(f,[d*1.4,-d*.2,0]),E.add(f,[d*2.3,-d*.3,0]),.01,.008,s.SKIN,{group:1}),c.anchors.feet.push({c:E.add(h[0].slice(0,3),[-.02,-.01,0]),r:.06,group:3,tail:!0}),c.anchors.neck={c:[.42,.36,h[12][2]*.9],r:.075,dir:[.2,1,0]},l("wings"))for(const p of[-1,1])Us(c,[0,.2,p*.05],p,.9,t?.1:0,p>0?s.MAGIC2:s.MAGIC,s.MAGIC,40+(p>0?10:0));return Wn(c,n,e,i,.45,r)}function Wd(n,e,t,i,r="towards"){const a=e===3,o=d=>a&&n.legend.includes(d),l=new it,c=t===0,u=.55,h=o("wingsBig")?1.45:1,f=o("wingsBig")?s.MAGIC:s.BODY;Hu(l,0,.3*h);for(const d of[-1,1]){const p=c?.5:-.1,g=E.norm([.35,p,d]),x=E.norm([-.3,p*.6,d]);l.flat(E.add([0,u,d*.05],E.mul(g,.38*h)),g,E.norm(E.cross(g,[0,1,0])),.4*h,.24*h,xr.spotted(f,s.BELLY,s.BODY3),{group:10+(d>0?1:0)}),l.flat(E.add([-.05,u,d*.05],E.mul(x,.26*h)),x,E.norm(E.cross(x,[0,1,0])),.27*h,.17*h,xr.spotted(o("wingsBig")?s.MAGIC2:s.BODY2,s.BODY2,s.BODY2),{group:12+(d>0?1:0)}),l.chain([[.12,u+.08,d*.03,.015],[.2,u+.25,d*.1,.025],[.24,u+.32,d*.14,.012]],s.BODY2,{group:11})}return l.ell([0,u,0],[.22,.09,.09],s.BELLY,{group:1,paint:d=>Qn(d,30,.25)?s.BODY2:void 0}),l.ell([.17,u+.03,0],[.07,.07,.07],s.BELLY,{group:1}),tr(l,[.17,u+.03,0],[.07,.07,.07],[[.7,.3,.6],[.7,.3,-.6]],.02,a?s.MAGIC2:s.EYE),Wn(l,n,e,i,.5,r)}function Vd(n,e,t,i,r="towards"){const a=e===3,o=u=>a&&n.legend.includes(u),l=new it,c=t?.05:0;for(let u=0;u<9;u++){const h=u/8,f=-.6+h*1.15;l.ell([f,.12+Math.sin(h*Math.PI)*(.06+c),0],[.08,.1-h*.02,.12-h*.03],u<2?s.MAGIC2:u%2?s.BODY2:s.BODY,{group:1})}o("lantern")&&l.ell([-.75,.3,0],[.22,.22,.22],s.MAGIC2,{group:3,paint:u=>u[1]<.2?s.MAGIC:void 0});for(let u=0;u<6;u++)l.seg([-.2+u*.12,.05,.08],[-.2+u*.12+(u%2?.02:-.02)*(t?-1:1),0,.12],.015,.01,s.BODY3,{group:7});return l.ell([.6,.14,0],[.06,.06,.08],s.BODY3,{group:1}),tr(l,[.6,.14,0],[.06,.06,.08],[[.6,.3,.7],[.6,.3,-.7]],.015,a?s.MAGIC2:s.EYE),Wn(l,n,e,i,.4,r)}function Yd(n,e,t,i,r="towards"){const a=e===3,o=h=>a&&n.legend.includes(h),l=new it,c=[.15,.28,0];for(const h of[-1,1])for(let f=0;f<4;f++){const d=-.6+f*.4,p=(f+(h>0?0:1)+t)%2?.05:-.05,g=E.add(c,[.05-f*.04,0,h*.1]),x=E.add(g,[Math.cos(d)*.3*(f<2?1:-.6)+p,.3,h*.3]),M=E.add(g,[Math.cos(d)*.55*(f<2?1:-.8)+p*1.5,-.28,h*.55]);l.chain([[...g,.03],[...x,.028],[...M,.015]],h>0?s.BODY2:s.BODY3,{group:h>0?7:2})}l.ell([-.28,.38,0],[.34,.28,.3],s.BODY,{paint:h=>(Math.abs(h[2])<.03||Math.abs(h[0]+.28)<.03)&&h[1]>.45?s.BELLY:void 0}),l.ell(c,[.18,.13,.17],s.BODY2,{group:1}),l.anchors.head={c,r:[.18,.13,.17]},l.anchors.eyes={pts:[[.05,.05],[.05,-.05]].map(([h,f])=>it.surface(c,[.18,.13,.17],E.norm([.9,h*6,f*4]))),size:.03},l.anchors.neck={c:[-.02,.32,0],r:.15,dir:[1,0,0]};const u=o("eyesRing");for(const[h,f]of[[.05,.05],[.05,-.05],[.02,.1],[.02,-.1]])l.ell(it.surface(c,[.18,.13,.17],E.norm([.9,h*6,f*4])),[.025,.025,.025],u?s.MAGIC2:s.EYE,{group:1});if(u)for(let h=0;h<5;h++){const f=Math.PI*(.2+h/4*.6);l.ell([-.3+Math.cos(f)*.2,.75+Math.sin(f)*.35,(h-2)*.12],[.06,.06,.06],s.MAGIC2,{group:95+h,extra:!0})}return Wn(l,n,e,i,.5,r)}const Xd=new Map(Object.entries({owl:Od,hedgehog:Id,toad:Nd,raven:Fd,bat:Ud,mole:Bd,beetle:kd,snail:zd,woodlouse:Hd,snake:Gd,moth:Wd,glowworm:Vd,spider:Yd})),Ul=[{id:"wolf",name:"Wolf",plan:"quad",hue:.08,sat:.24,val:.56,legend:["wings","mane"],q:{len:.64,chest:.42,tuck:.6,neck:.32,neckAng:.7,neckW:.42,hr:.26,snout:.82,snoutD:.7,ear:"point",earS:.82,tail:"brush",paw:"paw",legW:1.25,saddle:!0,belly:!0},tail:"up"},{id:"fox",name:"Fox",plan:"quad",q:{hgt:.8,len:.62,chest:.4,tuck:.5,neck:.3,neckAng:.7,neckW:.32,hr:.24,snout:1.05,snoutD:.5,snoutTaper:.6,ear:"point",earS:1.35,tail:"bushy",paw:"paw",legW:.9,belly:!0,socks:.3},hue:.06,sat:.8,val:.9,belly:"white",legend:["tails"]},{id:"badger",name:"Badger",plan:"quad",q:{hgt:.62,len:.78,chest:.2,tuck:.22,neck:.18,neckAng:.1,neckW:.5,hr:.26,snout:1,snoutD:.55,snoutTaper:.55,ear:"round",earS:.7,tail:"stub",paw:"paw",legW:1.35,legMat:s.BODY3,face:"badger",shaggy:!0},hue:.65,sat:.08,val:.45,legend:["crystals"]},{id:"boar",name:"Boar",plan:"quad",hue:.07,sat:.62,val:.5,legend:["tusksBig"],q:{len:.72,chest:.34,tuck:.42,neck:.2,neckAng:-.15,neckW:.55,hr:.27,snout:1.25,snoutD:.62,snoutTaper:.55,ear:"small",earS:.8,tail:"thin",paw:"hoof",legW:1.15,ridge:!0,tusks:!0,back:"hump",disc:!0},ridge:!0},{id:"stag",name:"Stag",plan:"quad",q:{hgt:1.3,len:.6,chest:.6,tuck:.7,neck:.55,neckAng:.95,neckW:.32,hr:.2,snout:1.15,snoutD:.6,snoutTaper:.65,ear:"point",earS:1.1,tail:"deer",paw:"hoof",legW:.75,antlers:"branch",rump:!0,spots:"young",belly:!0},hue:.08,sat:.5,val:.7,legend:["antlersGlow"]},{id:"hare",name:"Hare",plan:"quad",q:{hgt:.72,len:.5,chest:.4,tuck:.45,neck:.2,neckAng:.9,neckW:.35,hr:.27,snout:.65,snoutD:.7,ear:"long",earS:2.4,tail:"puff",paw:"paw",legW:.85,haunch:1.35,hindFoot:1.6,back:"arch",belly:!0,whiskers:!0},hue:.08,sat:.4,val:.72,legend:["jackalope"]},{id:"owl",name:"Owl",plan:"owl",hue:.08,sat:.5,val:.55,legend:["eyesRing","wings"]},{id:"bear",name:"Bear",plan:"quad",q:{hgt:1.15,len:.72,chest:.38,tuck:.4,neck:.25,neckAng:.3,neckW:.55,hr:.28,snout:.7,snoutD:.62,snoutTaper:.7,ear:"round",earS:.8,tail:"stub",paw:"paw",legW:1.55,back:"hump",muzzle:!0,shaggy:!0},hue:.07,sat:.55,val:.42,legend:["moss"]},{id:"hedgehog",name:"Hedgehog",plan:"hedgehog",hue:.08,sat:.4,val:.5,legend:["crystals"]},{id:"squirrel",name:"Squirrel",plan:"quad",q:{hgt:.55,len:.45,chest:.35,tuck:.4,neck:.2,neckAng:.9,neckW:.35,hr:.3,snout:.55,snoutD:.65,ear:"tuft",earS:1.1,tail:"squirrel",paw:"paw",legW:.8,haunch:1.3,back:"arch",belly:!0,whiskers:!0},hue:.03,sat:.75,val:.75,belly:"white",legend:["starTail"]},{id:"toad",name:"Toad",plan:"toad",hue:.2,sat:.5,val:.55,legend:["crown"]},{id:"otter",name:"Otter",plan:"quad",q:{hgt:.55,len:1,chest:.25,tuck:.25,neck:.3,neckAng:.35,neckW:.5,hr:.27,snout:.6,snoutD:.7,ear:"round",earS:.5,tail:"otter",paw:"paw",legW:1.1,muzzle:!0,belly:!0,whiskers:!0},hue:.07,sat:.55,val:.45,belly:"white",legend:["ribbons"]},{id:"lynx",name:"Lynx",plan:"quad",q:{hgt:.9,len:.55,chest:.5,tuck:.55,neck:.25,neckAng:.8,neckW:.4,hr:.27,snout:.5,snoutD:.75,snoutTaper:.8,ear:"tuft",earS:1,tail:"bob",paw:"paw",legW:1.2,cheeks:!0,spots:!0,belly:!0,whiskers:!0},hue:.09,sat:.45,val:.75,legend:["mane"]},{id:"elk",name:"Elk",plan:"quad",q:{hgt:1.4,len:.68,chest:.6,tuck:.66,neck:.45,neckAng:.75,neckW:.42,hr:.24,snout:1.6,snoutD:.9,snoutTaper:.85,ear:"point",earS:.9,tail:"stub",paw:"hoof",legW:.9,back:"hump",antlers:"palm",shaggy:!0},hue:.07,sat:.55,val:.38,legend:["antlersGlow","moss"]},{id:"raven",name:"Raven",plan:"raven",hue:.68,sat:.35,val:.3,legend:["wings","eyesRing"]},{id:"bat",name:"Bat",plan:"bat",hue:.78,sat:.25,val:.45,legend:["wingsBig"]},{id:"mole",name:"Mole",plan:"mole",hue:.7,sat:.15,val:.32,legend:["crown"]},{id:"beaver",name:"Beaver",plan:"quad",q:{hgt:.6,len:.65,chest:.2,tuck:.22,neck:.2,neckAng:.4,neckW:.55,hr:.28,snout:.6,snoutD:.75,ear:"round",earS:.45,tail:"flat",paw:"paw",legW:1.2,back:"arch",teeth:!0,whiskers:!0},hue:.06,sat:.6,val:.45,legend:["moss"]},{id:"stoat",name:"Stoat",plan:"quad",q:{hgt:.5,len:1,chest:.3,tuck:.33,neck:.35,neckAng:.6,neckW:.32,hr:.25,snout:.6,snoutD:.6,ear:"round",earS:.6,tail:"stoat",paw:"paw",legW:.8,belly:!0,back:"arch",whiskers:!0},hue:.1,sat:.25,val:.92,legend:["ribbons","mane"]},{id:"snail",name:"Snail",plan:"snail",hue:.08,sat:.45,val:.55,legend:["glowShell"]},{id:"ram",name:"Ram",plan:"quad",q:{hgt:.95,len:.6,chest:.48,tuck:.52,neck:.22,neckAng:.45,neckW:.48,hr:.25,snout:.85,snoutD:.75,snoutTaper:.8,ear:"small",earS:.7,tail:"stub",paw:"hoof",legW:.9,wool:!0,horns:"curl",face:"dark"},hue:.1,sat:.12,val:.88,legend:["hornsGlow"]},{id:"woodlouse",name:"Woodlouse",plan:"woodlouse",hue:.65,sat:.12,val:.45,legend:["crystals"]},{id:"snake",name:"Snake",plan:"snake",hue:.25,sat:.45,val:.45,legend:["wings"]},{id:"moth",name:"Moth",plan:"moth",hue:.1,sat:.3,val:.7,legend:["wingsBig"]},{id:"marten",name:"Pine marten",plan:"quad",q:{hgt:.55,len:.78,chest:.35,tuck:.38,neck:.3,neckAng:.55,neckW:.35,hr:.25,snout:.65,snoutD:.6,ear:"round",earS:.9,tail:"bushy",paw:"paw",legW:.85,belly:!0,back:"arch"},hue:.07,sat:.6,val:.45,legend:["mane"]},{id:"salamander",name:"Salamander",plan:"quad",q:{hgt:.42,len:.9,chest:.14,tuck:.14,neck:.12,neckAng:.05,neckW:.5,hr:.27,snout:.55,snoutD:.55,ear:"none",tail:"otter",paw:"paw",legW:1,spots:!0,spotMat:"belly"},hue:.1,sat:.1,val:.22,belly:"yellow",legend:["flames"]},{id:"glowworm",name:"Glow-worm",plan:"glowworm",hue:.12,sat:.4,val:.35,legend:["lantern"]},{id:"spider",name:"Spider",plan:"spider",hue:.07,sat:.45,val:.4,legend:["eyesRing"]},{id:"dormouse",name:"Dormouse",plan:"quad",q:{hgt:.38,len:.45,chest:.35,tuck:.38,neck:.15,neckAng:.6,neckW:.4,hr:.34,snout:.45,snoutD:.7,ear:"round",earS:.85,tail:"squirrel",paw:"paw",legW:.8,back:"arch",belly:!0,whiskers:!0,eyeK:1.6},hue:.09,sat:.6,val:.75,belly:"white",legend:["starTail"]},{id:"beetle",name:"Stag beetle",plan:"beetle",hue:.78,sat:.5,val:.35,legend:["horn","crystals"]}],Wu=Object.fromEntries(Ul.map(n=>[n.id,n])),_c=[[[255,70,170],[255,245,250],[255,230,70]],[[40,220,255],[255,236,60],[255,80,180]],[[150,80,255],[175,255,60],[255,255,255]]],vc={sneakers:[[255,70,90],[250,250,245]],glitter:[[215,215,235],[190,190,210]],platform:[[160,60,230],[40,30,52]]};function Kd(n,e,t=null){const i=qd(n,e);if(!t)return i;if(t.collar&&(i[s.COLLAR]=Array.isArray(t.collar)?t.collar:i[s.MAGIC]),t.hat!=null){const[r,a,o]=_c[t.hat%_c.length];i[s.HAT1]=r,i[s.HAT2]=a,i[s.POM]=o}if(t.glasses&&(i[s.SHADES]=[22,18,32],i[s.FRAME]=t.glasses==="heart"?[255,60,110]:[255,90,210]),t.shoes){const[r,a]=vc[t.shoes]||vc.sneakers;i[s.SHOE]=r,i[s.SOLE]=a}if(t.woken){i[s.WOKEN]=[255,40,36];for(const r of[s.BODY,s.BODY2,s.BODY3,s.BELLY,s.ACCENT,s.EAR])i[r]&&(i[r]=i[r].map((a,o)=>Math.round(a*.72+[30,8,12][o]*.1)))}return i}function qd(n,e){const t=Wu[n],i=e.cVal/.85,r=e.cSat/.6,a=me(t.hue,t.sat*r*e.sat,t.val*i),o=t.belly==="yellow"?[240,196,40]:t.belly==="white"||t.q?.face==="badger"?[236,232,222]:me(t.hue+.03,t.sat*.5*r,Math.min(1,t.val*i*1.3+.08)),l=me(e.magicHue+t.hue*.3,.6,1),c=me(e.magicHue+t.hue*.3,.18,1),u=["boar","stag","elk","ram"].includes(t.id);return{[s.BODY]:a,[s.BODY2]:me(t.hue+.02,Math.min(1,t.sat*r*1.2+.05),t.val*i*.66),[s.BODY3]:me(t.hue+.03,Math.min(1,t.sat*r*1.3+.1),t.val*i*.4),[s.BELLY]:o,[s.ACCENT]:u?[236,226,200]:me(t.hue+.05,t.sat*.6,Math.min(1,t.val*i*.5+.25)),[s.MAGIC]:l,[s.MAGIC2]:c,[s.LEAF]:me(.3,.55,.55),[s.LEAF2]:me(.25,.5,.75),[s.LEAF3]:me(.33,.6,.35),[s.TRUNK]:me(.07,.45,.32),[s.EYE]:[24,18,30],[s.PUPIL]:[70,40,90],[s.GLINT]:[255,255,245],[s.NOSE]:[38,28,36],[s.EAR]:me(t.hue+.97,Math.min(1,t.sat*.6+.2),Math.min(1,t.val*i*.55+.2)),[s.IRIS]:t.plan==="owl"?[255,176,40]:me(.12,.7,.85),[s.SKIN]:[238,158,192]}}const Zd=["size","growth","pixel","head","eye","legs","long","fur"],oa=new Map;function $d(n,e,t,i,r="towards",a=null){const o=Wu[n]||Ul[0],l=a&&(a.collar||a.hat!=null||a.glasses||a.shoes||a.woken)?a:null,c=[o.id,e,t,r,...Zd.map(h=>i[h]),l?[!!l.collar,l.hat??"",l.glasses||"",l.shoes||"",!!l.woken].join(","):""].join("|");let u=oa.get(c);if(!u){if(u=Td(l,()=>o.q?Ld(o,e,t,i,r):Xd.get(o.plan)(o,e,t,i,r)),l?.woken)for(let h=0;h<u.m.length;h++)(u.m[h]===s.EYE||u.m[h]===s.IRIS||u.m[h]===s.PUPIL)&&(u.m[h]=s.WOKEN);oa.size>600&&oa.delete(oa.keys().next().value),oa.set(c,u)}return u}const je=(...n)=>({l:n}),Rt=(n,e,t,i,r)=>({a:[n,e,t,i,r]}),un=(n,e)=>({d:[n,e]}),vt=(n,e=.86)=>je([.5,e],[.5,n]),bt=Rt(.5,.76,.13,25,155),Jd=n=>n.l?{l:n.l.map(([e,t])=>[1-e,t])}:n.a?{a:[1-n.a[0],n.a[1],n.a[2],180-n.a[3],180-n.a[4]]}:{d:[1-n.d[0],n.d[1]]},St=(...n)=>n.flatMap(e=>[e,Jd(e)]);function Ei(n,e,t){const i=e[0]-n[0],r=e[1]-n[1],a=Math.hypot(i,r),o=t*a,l=(a*a/4+o*o)/(2*Math.abs(o)),c=(n[0]+e[0])/2,u=(n[1]+e[1])/2,h=r/a,f=-i/a,d=(l-Math.abs(o))*Math.sign(o),p=c-h*d,g=u-f*d,x=Math.atan2(n[1]-g,n[0]-p)*180/Math.PI;let m=Math.atan2(e[1]-g,e[0]-p)*180/Math.PI-x;for(;m>180;)m-=360;for(;m<-180;)m+=360;return Rt(p,g,l,x,x+m)}const Qd=(n,e,t,i,r,a=24)=>je(...Array.from({length:a+1},(o,l)=>[n+i*Math.sin(l/a*r*2*Math.PI),e+(t-e)*l/a])),jd=(n,e,t,i,r,a=0,o=40)=>je(...Array.from({length:o+1},(l,c)=>{const u=c/o,h=(a+u*r*360)*Math.PI/180,f=t+(i-t)*u;return[n+f*Math.cos(h),e+f*Math.sin(h)]})),Ha=(n,e,t,i,r)=>r.map(a=>{const o=Math.cos(a*Math.PI/180),l=Math.sin(a*Math.PI/180);return je([n+t*o,e+t*l],[n+i*o,e+i*l])});vt(.3),je([.28,.08],[.5,.3],[.72,.08]),Rt(.5,.55,.2,-55,55),un(.5+.2*Math.cos(-55*Math.PI/180),.55+.2*Math.sin(-55*Math.PI/180)),vt(.34),je([.36,.06],[.5,.34],[.64,.06]),Rt(.67,.66,.17,180,-80),un(.67+.17*Math.cos(-80*Math.PI/180),.66+.17*Math.sin(-80*Math.PI/180)),[vt(.1),je([.24,.3],[.76,.3]),...St(je([.33,.14],[.33,.56])),...St(un(.24,.3))],[vt(.16),...St(Rt(.36,.24,.15,45,180)),...Ha(.5,.16,0,.1,[-130,-90,-50])],[vt(.42),...St(je([.5,.42],[.34,.26],[.3,.06]),je([.335,.25],[.16,.2]),je([.32,.15],[.18,.07]))],[vt(.44),...St(je([.5,.44],[.4,.34],[.38,.06])),Rt(.62,.66,.09,180,540),...St(un(.38,.06))],[vt(.44),...St(Rt(.33,.3,.13,0,360),je([.24,.18],[.18,.05])),...St(un(.33,.3))],[vt(.24),je([.24,.3],[.76,.3]),...St(Rt(.3,.3,.09,180,360)),...St(je([.36,.5],[.32,.62]))],[vt(.52),Rt(.5,.52,.2,180,360),...Ha(.5,.52,.22,.34,[-160,-125,-90,-55,-20])],vt(.2),je([.5,.2],[.4,.08]),Rt(.66,.4,.16,100,-200),un(.66+.16*Math.cos(-200*Math.PI/180),.4+.16*Math.sin(-200*Math.PI/180)),[vt(.42),je([.16,.54],[.24,.42],[.76,.42],[.84,.54]),...St(Rt(.34,.3,.1,0,360)),...St(un(.16,.54))],vt(.24),Rt(.5,.5,.28,-100,100),un(.5+.28*Math.cos(-100*Math.PI/180),.5+.28*Math.sin(-100*Math.PI/180)),Ei([.18,.64],[.36,.64],.3),[vt(.32),je([.26,.2],[.5,.32],[.74,.2]),...St(je([.26,.2],[.26,.06])),je([.5,.68],[.66,.62]),...St(un(.26,.06))],[vt(.3),...St(je([.5,.3],[.42,.2]),Rt(.3,.16,.12,0,180),je([.18,.16],[.14,.06])),je([.5,.44],[.6,.52])],[vt(.14),je([.5,.14],[.3,.22]),je([.18,.56],[.5,.38],[.82,.56]),un(.58,.17),...St(un(.18,.56))],[vt(.3),Rt(.5,.16,.14,20,160),...St(je([.5,.38],[.12,.26]),Ei([.12,.26],[.24,.46],-.25),Ei([.24,.46],[.38,.5],-.3),Ei([.38,.5],[.5,.52],-.3))],[vt(.44),Rt(.5,.3,.16,0,180),...Ha(.5,.3,.19,.3,[-160,-125,-55,-20]),je([.5,.14],[.5,.04])],[vt(.36),je([.32,.2],[.68,.2]),...St(je([.44,.2],[.44,.34])),je([.5,.56],[.68,.66],[.5,.76],[.32,.66],[.5,.56])],[vt(.18),Rt(.5,.44,.24,180,360),je([.5,.18],[.6,.08]),...St(un(.26,.44))],vt(.52),jd(.5,.33,.03,.2,1.6,90),je([.66,.2],[.76,.06]),un(.76,.06),[vt(.24),...St(Rt(.36,.24,.14,0,-250)),...St(un(.36+.14*Math.cos(-250*Math.PI/180),.24+.14*Math.sin(-250*Math.PI/180)))],[vt(.24),Rt(.5,.52,.22,205,335),Rt(.5,.66,.24,205,335),Rt(.5,.38,.2,205,335),...St(je([.5,.24],[.32,.06]))],[vt(.16),Qd(.5,.82,.2,.2,1.25),je([.5,.2],[.5,.11]),...St(je([.5,.11],[.42,.045]))],[vt(.2),...St(je([.5,.3],[.16,.18],[.24,.5],[.5,.4]),je([.5,.5],[.3,.64],[.5,.66]),Rt(.38,.16,.12,0,-110))],[vt(.32),je([.3,.2],[.5,.32],[.7,.2]),...St(Rt(.3,.14,.07,90,-180)),Rt(.28,.56,.22,0,150),un(.28+.22*Math.cos(150*Math.PI/180),.56+.22*Math.sin(150*Math.PI/180))],[vt(.3),Ei([.5,.3],[.5,.06],.35),Ei([.5,.3],[.5,.06],-.35),...St(je([.5,.42],[.32,.38],[.26,.48]),je([.5,.64],[.32,.6],[.26,.7])),...St(un(.38,.52))],[vt(.4),Rt(.5,.27,.1,90,450),...Ha(.5,.27,.15,.25,[0,60,120,180,240,300])],[je([.5,.05],[.5,.3]),vt(.5),Rt(.5,.4,.11,-90,270),...St(...[-150,-170,170,150].map(n=>je([.5+.12*Math.cos(n*Math.PI/180),.4+.12*Math.sin(n*Math.PI/180)],[.5+.28*Math.cos(n*Math.PI/180),.4+.28*Math.sin(n*Math.PI/180)],[.5+.32*Math.cos(n*Math.PI/180),.4+.28*Math.sin(n*Math.PI/180)+.1]))),un(.5,.05)],[vt(.12),Rt(.5,.46,.24,-60,250),...St(Rt(.34,.16,.08,90,-180)),Ei([.56,.38],[.7,.38],-.4)],[vt(.36),...St(Rt(.66,.26,.2,160,250)),Ei([.5,.38],[.5,.82],.25),Ei([.5,.38],[.5,.82],-.25)];Ul.map(n=>n.id);const xa=new Set([s.TRUNK,s.BARK2,s.BARKD,s.BARKL,s.BELLY]);function _n(n,e,t,i,r,a,{mat:o=s.LEAF,group:l=30,ragged:c=1}={}){const h=[];for(let m=0;m<9;m++){const _=m/9*Math.PI*2,y=1+(a()-.5)*.35*(r.clump+.3);h.push([e[0]+Math.cos(_)*t*y,e[1]+Math.sin(_)*i*y*(Math.sin(_)>0?.8:1)])}const f=Math.max(1,Math.round(Math.min(t,i)/3.5));n.shape(Fs(h,0,9,f,Math.max(1.2,Math.min(t,i)*.14)*c,1),o,{group:l,line:!1,round:r.round}),n.mark([mt(e,[-t*1.1,i*.15]),mt(e,[t*1.1,i*.1]),mt(e,[t*1.1,i*1.2]),mt(e,[-t*1.1,i*1.2])],s.LEAF3,[o]),n.mark([mt(e,[-t*.75,-i*.55]),mt(e,[t*.25,-i*.95]),mt(e,[t*.55,-i*.35]),mt(e,[-t*.2,-i*.05])],s.LEAF2,[o]);const d=Math.floor(e[0]-t*1.2),p=Math.ceil(e[0]+t*1.2),g=Math.floor(e[1]-i*1.2),x=Math.ceil(e[1]+i*1.2),M=a()*1e4|0;for(let m=g;m<=x;m++)for(let _=d;_<=p;_++){const y=n.get(_,m);if(y!==o&&y!==s.LEAF2&&y!==s.LEAF3)continue;const S=Bt(_,m,M),R=di(_/2,m/2,M)*.5+S*.5;R<.16*r.density?n.recolour(_,m,y===s.LEAF2?o:s.LEAF2):R>1-.16*r.density&&n.recolour(_,m,y===s.LEAF3?o:s.LEAF3)}}function dn(n,e,t,i,r,a,o,l,{mat:c=s.TRUNK,bend:u=1,group:h=10,line:f=!1}={}){const d=[e],p=4;let g=t,x=e;for(let M=1;M<=p;M++)g+=(l()-.5)*.7*o.gnarl*u,x=mt(x,[Math.cos(g)*i/p,Math.sin(g)*i/p]),d.push(x);return n.limb(d.map((M,m)=>[...M,r+(a-r)*m/p]),c,{group:h,line:f,round:o.round,cap:.6,capEnd:1}),{end:x,ang:g,pts:d}}function Gi(n,e,t,i,r,a,o){if(n.shape([[e-i*1.05,t],[e-i*.62,t-i*.5],[e-i*.45,t-i*1.4],[e+i*.45,t-i*1.4],[e+i*.62,t-i*.5],[e+i*1.05,t]],s.TRUNK,{group:10,round:r.round}),r.roots<=0)return;const l=Math.round(2+r.roots*4);for(let c=0;c<l;c++){const u=c%2?1:-1,h=(8+a()*16)*o*(.4+r.roots),f=(2+a()*3)*o,d=[e+u*i*.2,t-i*.5],p=[e+u*(i*.55+h*.4),t-f],g=[e+u*(i*.5+h),t-.5];n.limb([[...d,i*.55],[...p,i*.28],[...g,1.2]],s.TRUNK,{group:11,round:r.round,cap:.5,capEnd:.6})}}function nr(n,e,t=!0){if(!(e.bark<=0))for(let i=0;i<n.h;i++)for(let r=0;r<n.w;r++){const a=i*n.w+r;if(n.m[a]!==s.TRUNK)continue;const o=t?di(r/1.3,i/6,21):di(r/6,i/1.3,21);o>1-e.bark*.42||Bt(r,i,4)<e.bark*.05?n.m[a]=s.BARKD:o>1-e.bark*.62&&n.n[a*3]<-.1&&(n.m[a]=s.BARKL)}}function Nn(n,e,t){let i=n.w,r=-1,a=n.h;for(let d=0;d<n.h;d++)for(let p=0;p<n.w;p++)n.m[d*n.w+p]&&(i=Math.min(i,p),r=Math.max(r,p),a=Math.min(a,d));if(r<0)return{sp:n,crownY:t};const o=Math.max(e-i,r-e)+2,l=Math.max(0,Math.floor(e-o)),c=Math.min(n.w-l,Math.ceil(o*2)+1),u=Math.max(0,a-1),h=n.h-u,f=new qt(c,h);for(let d=0;d<h;d++)for(let p=0;p<c;p++){const g=(d+u)*n.w+p+l,x=d*c+p;f.m[x]=n.m[g],f.g[x]=n.g[g],f.n[x*3]=n.n[g*3],f.n[x*3+1]=n.n[g*3+1],f.n[x*3+2]=n.n[g*3+2]}return{sp:f,crownY:t-u}}const ei=n=>(n.crownWidth||3)/3;function ef(n,e,t){const i=ei(e),r=Math.round(220*t*i+60*t),a=Math.round(140*t),o=new qt(r,a),l=r/2,c=a,u=e.treeTrunks||1,h=12*t*(e.treeThick||1)*(e.treeThin?.55:1)/Math.sqrt(u),f=(n()-.5)*.5*e.gnarl+(e.treeLean||0),d=[];let p=a;const g=(x,M,m,_,y)=>{const S=dn(o,x,M,m,_,_*.65,e,n,{group:12});if(y===0){d.push(S.end);return}const R=n()<.35?3:2;for(let A=0;A<R;A++){const D=(A-(R-1)/2)*ce(n,.5,.85)*(y===3?1.4:1);g(S.end,S.ang+D+(n()-.5)*.25,m*ce(n,.6,.78),_*.62,y-1)}y<=2&&d.push(En(x,S.end,.7))};for(let x=0;x<u;x++){const M=f+(u>1?(x/(u-1)-.5)*.8:0),m=[l+(x-(u-1)/2)*h*.6,c],_=dn(o,m,-Math.PI/2+M,a*.36*(u>1?ce(n,.75,1.15):1),h,h*.72,e,n,{bend:1.4});p=Math.min(p,_.end[1]);for(const y of[-1,1])g(_.end,-Math.PI/2+M*.5+y*ce(n,.55,.95)*(.7+.3*i)*(u>1?.6:1),a*.22*(.75+.25*i)*(u>1?.7:1),h*.7,u>2?2:3);if(u===1&&n()<.7&&g(_.end,-Math.PI/2+(n()-.5)*.3,a*.18,h*.55,2),x===0&&e.treeHollow){const y=En(m,_.end,.38);o.ellipse(y[0],y[1],h*.28,h*.5,s.NOSE,{round:.3})}}if(Gi(o,l,c,h*Math.sqrt(u),e,n,t),nr(o,e),e.treeWebs)for(let x=0;x+1<d.length;x+=2){const M=d[x],m=d[x+1],_=Math.hypot(m[0]-M[0],m[1]-M[1]);if(_<40*t)for(let y=0;y<=_;y++){const S=En(M,m,y/_);o.px(S[0],S[1]+Math.sin(y/_*Math.PI)*_*.15,s.WEB,0,0,1)}}if(e.treeBare)return Nn(o,l,p+4*t);d.sort((x,M)=>x[1]-M[1]);for(const x of d)_n(o,mt(x,[0,-3*t]),ce(n,14,21)*t,ce(n,10,14)*t,e,n,{mat:n()<.35?s.LEAF3:s.LEAF});for(const x of d)n()<.75&&_n(o,mt(x,[ce(n,-9,9)*t,ce(n,-12,-3)*t]),ce(n,10,15)*t,ce(n,7,10)*t,e,n);return Nn(o,l,p+4*t)}function tf(n,e,t){const i=.8+.2*ei(e),r=Math.round(90*t*i),a=Math.round(160*t),o=new qt(r,a),l=r/2,c=a;o.limb([[l,c,6*t],[l,c-a*.5,4*t],[l,6*t,1.5]],s.TRUNK,{group:10,round:e.round}),Gi(o,l,c,6*t,e,n,t*.6),nr(o,e);const u=Math.round(ce(n,9,12));for(let h=u-1;h>=0;h--){const f=h/(u-1),d=6*t+f*a*.7,p=(5+f*36)*t*i*ce(n,.9,1.1),g=(5+f*13)*t,x=[[l,d-4*t],[l+p*.5,d+g*.3],[l+p,d+g],[l+p*.7,d+g*1.15],[l,d+g*.7],[l-p*.7,d+g*1.15],[l-p,d+g],[l-p*.5,d+g*.3]];o.shape(Fs(x,1,7,Math.max(2,Math.round(p/(3*t))),2*t,1),s.LEAF,{group:30+h,line:!1,round:e.round}),o.mark([[l-p,d+g*.55],[l+p,d+g*.55],[l+p,d+g*1.4],[l-p,d+g*1.4]],s.LEAF3,[s.LEAF]),o.mark([[l-p*.55,d-2*t],[l+p*.1,d-3*t],[l+p*.1,d+g*.45],[l-p*.7,d+g*.7]],s.LEAF2,[s.LEAF])}return Nn(o,l,a*.82)}function nf(n,e,t){const i=ei(e),r=Math.round(200*t*i+50*t),a=Math.round(130*t),o=new qt(r,a),l=r/2,c=a,u=13*t,h=dn(o,[l,c],-Math.PI/2+(n()-.5)*.3,a*.3,u,u*.8,e,n,{bend:1.6}),f=[];for(let g=0;g<5;g++){const x=g%2?1:-1,M=-Math.PI/2+x*ce(n,.55,1.25)*(.7+.3*i),m=dn(o,h.end,M,a*ce(n,.3,.42)*(.8+.2*i),u*.55,u*.3,e,n,{group:12});f.push(m.end)}Gi(o,l,c,u,e,n,t),nr(o,e);for(const g of f)_n(o,mt(g,[0,-2*t]),ce(n,20,28)*t,ce(n,9,12)*t,e,n);_n(o,mt(h.end,[0,-8*t]),24*t,11*t,e,n);let d=r,p=0;for(const g of f)d=Math.min(d,g[0]-22*t),p=Math.max(p,g[0]+22*t);for(let g=d;g<p;g+=ce(n,1,1.7)){let x=a;for(let y=0;y<a;y++)if(o.get(g,y)===s.LEAF||o.get(g,y)===s.LEAF2||o.get(g,y)===s.LEAF3){x=y;break}if(x>=a)continue;const M=Math.abs(g-l)/(r/2),m=(c-x)*ce(n,.5,.9)*(1-M*.3),_=Bt(g|0,1,9)<.4?s.LEAF2:s.LEAF;for(let y=x+2;y<Math.min(c-2,x+m);y++){const S=Math.round(Math.sin(y*.12+g)*.7);Bt(g|0,y,5)<.2+e.density*.8&&o.px(g+S,y,(y-x)/m>.8?s.LEAF3:_,S*.3,.2,.95)}}return Nn(o,l,h.end[1]+6*t)}function Vu(n,e,t){const i=.7+.3*ei(e),r=Math.round(110*t*i),a=Math.round(155*t),o=new qt(r,a),l=r/2,c=a,u=(n()-.5)*.25+(e.treeLean||0),h=dn(o,[l,c],-Math.PI/2+u,a*.85,5*t,2*t,e,n,{mat:s.BARK2,bend:.4});for(let d=0;d<h.pts.length-1;d++)for(let p=0;p<1;p+=1/8){const g=En(h.pts[d],h.pts[d+1],p+n()*.1);if(n()<.55)for(let x=-3;x<=3;x++)o.get(g[0]+x,g[1])===s.BARK2&&n()<.8&&o.recolour(g[0]+x,g[1],s.BARKD)}const f=[h.end];for(let d=0;d<7;d++){const p=ce(n,.35,.9),g=En(h.pts[0],h.end,p),x=d%2?1:-1,M=dn(o,g,-Math.PI/2+x*ce(n,.5,1),a*ce(n,.12,.2)*i,2*t,1,e,n,{mat:s.BARKD,group:12});f.push(M.end)}for(const d of f)_n(o,d,ce(n,9,13)*t*i,ce(n,7,10)*t,e,n,{mat:s.LEAF2,ragged:1.3});return Nn(o,l,a*.55)}function rf(n,e,t){const i=ei(e),r=Math.round(220*t*i+50*t),a=Math.round(120*t),o=new qt(r,a),l=r/2,c=a,u=10*t,h=dn(o,[l,c],-Math.PI/2+(n()-.5)*.4*(e.gnarl+.3),a*.4,u,u*.75,e,n,{bend:1.2}),f=[];for(const g of[-1,1,-1,1]){const x=dn(o,h.end,-Math.PI/2+g*ce(n,.7,1.15)*(.7+.3*i),a*ce(n,.3,.42)*(.7+.3*i),u*.55,u*.25,e,n,{group:12});f.push(x.end,En(h.end,x.end,.55))}Gi(o,l,c,u,e,n,t),nr(o,e);const d=Math.round(ce(n,2,3)),p=Math.min(...f.map(g=>g[1]));for(let g=0;g<d;g++){const x=p-6*t+g*9*t,M=(95-g*12)*t*(.65+.35*i);for(let m=0;m<5;m++)_n(o,[l+(m-2)*M*.36+ce(n,-5,5)*t,x+ce(n,-3,3)*t],M*ce(n,.2,.26),7*t,e,n,{mat:g===d-1?s.LEAF:s.LEAF3})}return Nn(o,l,h.end[1]+4*t)}function ta(n,e,t,i,r,{grain:a=2,holes:o=0,flecks:l=.16,dots:c=0,dot:u=s.FLOWER,dotTall:h=!1,mats:f=[s.LEAF,s.LEAF2,s.LEAF3]}={}){const d=Math.floor(e[0]-t*1.3),p=Math.ceil(e[0]+t*1.3),g=Math.floor(e[1]-i*1.3),x=Math.ceil(e[1]+i*1.3),M=r()*1e4|0;for(let m=g;m<=x;m++)for(let _=d;_<=p;_++){const y=n.get(_,m);if(!f.includes(y))continue;const S=di(_/a,m/a,M),R=Bt(_,m,M);o&&S<o?n.recolour(_,m,s.LEAF3):S>1-l&&n.recolour(_,m,s.LEAF2),c&&R<c&&y!==s.LEAF3&&(n.recolour(_,m,u),h&&n.recolour(_,m-1,u))}}function Wi(n,e,t,i){const r=ei(e)*(i.wide||1),a=Math.round(240*t*r+70*t),o=Math.round((i.tall||140)*t),l=new qt(a,o),c=a/2,u=o,h=e.treeTrunks||i.trunks||1,f=(i.tw||12)*t*(e.treeThick||1)*(e.treeThin?.55:1)/Math.sqrt(h),d=(n()-.5)*.4*e.gnarl+(e.treeLean||0)+(i.lean||0),p=[];let g=o;const x=(R,A,D,b,w)=>{const L=dn(l,R,A,D,b,b*.65,e,n,{group:12,mat:i.limbMat||s.TRUNK,bend:i.bend??1});if(w===0){p.push(L.end);return}const C=n()<(i.fork??.35)?3:2;for(let I=0;I<C;I++)x(L.end,L.ang+(I-(C-1)/2)*ce(n,.45,.8)*(i.splay||1)+(n()-.5)*.25,D*ce(n,.6,.78),b*.62,w-1);w<=2&&p.push(En(R,L.end,.7))};for(let R=0;R<h;R++){const A=d+(h>1?(R/(h-1)-.5)*(i.fan||.8):0),D=[c+(R-(h-1)/2)*f*.6,u],b=dn(l,D,-Math.PI/2+A,o*(i.trunk||.36)*(h>1?ce(n,.8,1.1):1),f,f*.72,e,n,{bend:i.trunkBend??1.2,mat:i.trunkMat||s.TRUNK});g=Math.min(g,b.end[1]);for(let w=0;w<(i.limbs||2);w++){const L=w%2?1:-1;x(b.end,-Math.PI/2+A*.5+L*ce(n,.5,1)*(i.spreadA||.8)*(h>1?.7:1),o*(i.limb||.22)*(h>1?.75:1),f*.7,i.depth??3)}if(i.leader&&x(b.end,-Math.PI/2+(n()-.5)*.2,o*(i.limb||.22)*i.leader,f*.55,2),R===0&&e.treeHollow){const w=En(D,b.end,.38);l.ellipse(w[0],w[1],f*.28,f*.5,s.NOSE,{round:.3})}}if(i.noRoots||Gi(l,c,u,f*Math.sqrt(h),e,n,t*(i.rootK||1)),i.smooth||nr(l,e),e.treeBare)return Nn(l,c,g+4*t);p.sort((R,A)=>R[1]-A[1]);const[M,m]=i.clumpR||[12,18],_=i.flat||.7,y=[],S=(R,A,D,b)=>{_n(l,R,A,D,e,n,{mat:b,ragged:i.ragged||1}),y.push([R,A,D])};for(const R of p)S(mt(R,[0,-3*t]),ce(n,M,m)*t,ce(n,M,m)*t*_,n()<(i.darkBack??.35)?s.LEAF3:s.LEAF);for(const R of p)n()<(i.extra??.7)&&S(mt(R,[ce(n,-9,9)*t,ce(n,-12,-3)*t]),ce(n,M,m)*t*.7,ce(n,M,m)*t*_*.7,s.LEAF);if(i.dome){const R=Math.min(...p.map(w=>w[1])),A=p.map(w=>w[0]),D=(Math.min(...A)+Math.max(...A))/2,b=(Math.max(...A)-Math.min(...A))/2;for(let w=0;w<i.dome;w++){const L=w/Math.max(1,i.dome-1)-.5;S([D+L*b*1.1,R-(1-4*L*L)*14*t-ce(n,2,6)*t],ce(n,M,m)*t*1.1,ce(n,M,m)*t*_,s.LEAF)}}if(i.layers)for(const[R,A,D]of y)for(let b=-D;b<D;b+=Math.max(3,i.layers*t))for(let w=-A;w<A;w++)l.get(R[0]+w,R[1]+b)===s.LEAF&&l.recolour(R[0]+w,R[1]+b,s.LEAF3);for(const[R,A,D]of y)ta(l,R,A,D,n,i.tex||{});return Nn(l,c,g+4*t)}function af(n,e,t){return Wi(n,{...e,gnarl:Math.max(e.gnarl,.8)},t,{trunk:.26,tw:15,limbs:3,spreadA:1.05,limb:.26,depth:3,wide:1.15,clumpR:[10,15],flat:.75,extra:.9,dome:5,bend:1.4,tex:{grain:1.6,holes:.12,flecks:.18}})}function sf(n,e,t){return Wi(n,{...e,gnarl:e.gnarl*.4},t,{trunk:.4,tw:11,limbs:2,leader:1.3,spreadA:.6,limb:.22,depth:3,clumpR:[15,21],flat:.5,extra:1,dome:7,smooth:1,layers:3.5,trunkMat:s.BARK2,limbMat:s.BARK2,tall:155,tex:{grain:3.5,holes:0,flecks:.1}})}function of(n,e,t){return Wi(n,{...e,gnarl:e.gnarl*.6},t,{trunk:.4,tw:9,limbs:3,spreadA:.45,limb:.26,depth:3,splay:.6,clumpR:[7,10],flat:.8,extra:.35,ragged:1.8,tall:160,wide:.8,darkBack:.1,tex:{grain:1.2,holes:.3,flecks:.26}})}function lf(n,e,t){return Wi(n,{...e,gnarl:e.gnarl*.4},t,{trunk:.38,tw:11,limbs:2,spreadA:.55,limb:.24,depth:3,leader:1.1,clumpR:[9,12],flat:.85,extra:1,dome:5,tall:170,wide:.75,darkBack:.15,tex:{grain:1.4,holes:.05,flecks:.22}})}function cf(n,e,t){return Wi(n,e,t,{trunk:.34,tw:12,limbs:2,spreadA:.8,limb:.24,depth:2,clumpR:[20,27],flat:.7,extra:.8,dome:2,darkBack:.5,tex:{grain:4,holes:.16,flecks:.12}})}function uf(n,e,t){return Wi(n,e,t,{trunk:.32,tw:14,limbs:2,spreadA:.85,limb:.25,depth:2,clumpR:[22,30],flat:.78,extra:.9,dome:3,darkBack:.25,tall:150,tex:{grain:6,holes:.04,flecks:.16,dots:.025,dotTall:!0}})}function hf(n,e,t){return Wi(n,{...e,gnarl:e.gnarl*.7},t,{trunk:.45,tw:7,limbs:3,spreadA:.55,limb:.2,depth:2,clumpR:[8,11],flat:.7,extra:.5,ragged:1.7,wide:.6,tall:120,smooth:1,trunkMat:s.BARK2,limbMat:s.BARK2,darkBack:.1,tex:{grain:1.1,holes:.26,flecks:.22,dots:.05}})}function df(n,e,t){const i=.7+.3*ei(e),r=Math.round(110*t*i),a=Math.round(165*t),o=new qt(r,a),l=r/2,c=a,u=e.treeTrunks||1,h=(n()-.5)*.2+(e.treeLean||0),f=[];for(let p=0;p<u;p++){const g=dn(o,[l+(p-(u-1)/2)*5*t,c],-Math.PI/2+h+(u>1?(p/(u-1)-.5)*.3:0),a*.92,6*t/Math.sqrt(u),1.5,e,n,{bend:.5});for(let x=0;x<16;x++){const M=ce(n,.3,.97),m=En(g.pts[0],g.end,M),_=x%2?1:-1,y=(1-M*.6)*a*.12*i,S=dn(o,m,-Math.PI/2+_*ce(n,.7,1.2),y,2*t,1,e,n,{group:12,mat:s.BARKD});f.push([S.end,(8+(1-M)*6)*t*i],[En(m,S.end,.4),(7+(1-M)*4)*t*i])}f.push([g.end,7*t])}Gi(o,l,c,6*t,e,n,t*.6),nr(o,e);for(const[p,g]of f)_n(o,p,g,g*.8,e,n,{mat:n()<.5?s.LEAF3:s.LEAF});for(const[p,g]of f)ta(o,p,g,g*.8,n,{grain:1.3,holes:.2,flecks:.1,dots:.03,dot:s.BARKD});const d=Math.min(...f.map(([p])=>p[1]));return Nn(o,l,d+(c-d)*.45)}function ff(n,e,t){const i=.8+.2*ei(e),r=Math.round(150*t*i),a=Math.round(175*t),o=new qt(r,a),l=r/2,c=a,u=dn(o,[l,c],-Math.PI/2+(n()-.5)*.25+(e.treeLean||0),a*.78,8*t,3*t,e,n,{bend:.7});nr(o,e);for(let f=0;f<o.h*.55;f++)for(let d=0;d<r;d++)(o.get(d,f)===s.TRUNK||o.get(d,f)===s.BARKD)&&o.recolour(d,f,Bt(d,f,3)<.15?s.BARKD:s.BELLY);Gi(o,l,c,8*t,e,n,t*.7);const h=[];for(let f=0;f<6;f++){const d=ce(n,.55,1),p=En(u.pts[0],u.end,d),g=f%2?1:-1,x=dn(o,p,-Math.PI/2+g*ce(n,.6,1.3),a*ce(n,.12,.22)*i,3*t,1.5,e,n,{group:12,bend:1.6,mat:s.BELLY});h.push(x.end)}h.push(u.end);for(const f of h)_n(o,mt(f,[0,-2*t]),ce(n,13,19)*t*i,ce(n,4,6)*t,e,n,{mat:s.LEAF,ragged:1.3});for(const f of h)ta(o,mt(f,[0,-2*t]),19*t*i,6*t,n,{grain:1,holes:.25,flecks:.14});return Nn(o,l,Math.min(...h.map(f=>f[1]))+8*t)}function pf(n,e,t){const i=ei(e),r=Math.round(200*t*i+50*t),a=Math.round(120*t),o=new qt(r,a),l=r/2,c=a,u=e.treeTrunks||3,h=9*t*(e.treeThick||1.2);for(let p=0;p<u;p++)dn(o,[l+(p-(u-1)/2)*h*.5,c],-Math.PI/2+(p-(u-1)/2)*.35+(e.treeLean||0),a*.3,h,h*.6,e,n,{mat:s.BELLY,bend:1.6});for(let p=0;p<a;p++)for(let g=0;g<r;g++)o.get(g,p)===s.BELLY&&(g+Math.round(p/6))%4===0&&o.recolour(g,p,s.BARKD);Gi(o,l,c,h*1.4,e,n,t);const f=c-a*.3,d=[];for(let p=0;p<9;p++){const g=Math.PI+p/8*Math.PI,x=(40+20*i)*t;d.push([[l+Math.cos(g)*x,f+Math.sin(g)*x*.55+10*t],ce(n,16,22)*t])}for(let p=0;p<7;p++)d.push([[l+(p/6-.5)*(60+30*i)*t,f-ce(n,4,22)*t],ce(n,20,26)*t]);d.push([[l,f-24*t],26*t]);for(const[p,g]of d)_n(o,p,g,g*.7,e,n,{mat:s.LEAF3,ragged:.6});for(const[p,g]of d)ta(o,p,g,g*.7,n,{grain:.7,holes:0,flecks:.08,mats:[s.LEAF,s.LEAF2,s.LEAF3]});return Nn(o,l,f+4*t)}function gf(n,e,t){return Wi(n,{...e,gnarl:1},t,{trunk:.3,tw:8,limbs:3,spreadA:.9,limb:.3,depth:3,fork:.6,bend:2,lean:.45,clumpR:[7,10],flat:.65,extra:.8,wide:.7,tall:90,ragged:1.4,darkBack:.3,tex:{grain:1,holes:.1,flecks:.14,dots:.035}})}function mf(n,e,t){const i=.8+.2*ei(e),r=Math.round(110*t*i),a=Math.round(130*t),o=new qt(r,a),l=r/2,c=a;o.limb([[l,c,5*t],[l,c-a*.5,3*t],[l,10*t,1.5]],s.BARK2,{group:10,round:e.round});const u=[];for(let h=0;h<10;h++){const f=h/9,d=10*t+f*a*.72,p=(5+f*28)*t*i,g=1+Math.round(f*3);for(let x=0;x<g;x++)u.push([[l+(g>1?(x/(g-1)-.5)*p*1.3:0)+ce(n,-2,2)*t,d+ce(n,-2,2)*t],(6+f*5)*t])}for(const[h,f]of u)_n(o,h,f*1.2,f,e,n,{mat:s.LEAF3,ragged:.7});for(const[h,f]of u)ta(o,h,f*1.2,f,n,{grain:1.1,holes:0,flecks:.2,dots:.035,mats:[s.LEAF,s.LEAF2,s.LEAF3]});return Nn(o,l,a*.85)}function Mf(n,e,t){return Wi(n,{...e,gnarl:e.gnarl*.5,treeTrunks:e.treeTrunks||6},t,{trunk:.5,tw:9,limbs:1,spreadA:.5,limb:.18,depth:1,fan:1.3,trunkBend:.8,clumpR:[11,15],flat:.8,extra:1,wide:.8,tall:110,noRoots:!1,rootK:.4,smooth:1,trunkMat:s.BARK2,limbMat:s.BARK2,darkBack:.2,tex:{grain:3.6,holes:.14,flecks:.2}})}function xf(n,e,t){const i=Vu(n,{...e,treeLean:e.treeLean||0},t),r=i.sp;for(let a=0;a<r.w;a++){let o=-1;for(let c=0;c<r.h;c++)if([s.LEAF,s.LEAF2,s.LEAF3].includes(r.get(a,c))){o=c;break}if(o<0||Bt(a,1,7)<.35)continue;const l=(r.h-o)*ce(n,.25,.5);for(let c=o+1;c<Math.min(r.h-3,o+l);c++)(!r.get(a,c)||r.get(a,c)===s.LEAF3)&&r.px(a+Math.round(Math.sin(c*.2+a)*.6),c,Bt(a,c,2)<.3?s.LEAF:s.LEAF2,0,.2,.95)}return i}function _f(n,e,t){const i=.8+.2*ei(e),r=Math.round(100*t*i),a=Math.round(170*t),o=new qt(r,a),l=r/2,c=a;o.limb([[l,c,6*t],[l,c-a*.5,3.5*t],[l,6*t,1.2]],s.TRUNK,{group:10,round:e.round}),Gi(o,l,c,6*t,e,n,t*.5),nr(o,e);const u=14;for(let h=0;h<u;h++){const f=h/(u-1),d=8*t+f*a*.68,p=(4+f*30)*t*i;for(let g=0;g<4;g++){const x=[l+(g/3-.5)*p*1.6,d+Math.abs(g/3-.5)*6*t];_n(o,x,p*.35+2*t,4*t,e,n,{mat:s.LEAF2,ragged:1.6}),ta(o,x,p*.35+2*t,4*t,n,{grain:1,holes:.32,flecks:.1,mats:[s.LEAF,s.LEAF2]})}}return Nn(o,l,a*.8)}const vf=6;function bf(n,e,t,i,r){const{sp:a,crownY:o}=n,l=a.w,c=a.h,u=a.low||(a.low=new Uint8Array(l*c)),h=Math.ceil(o+vf*i);if(h>=c-2)return n;const f=i/(t.treeSize*2/(t.pixel||2)),d=Math.max(0,Math.min(1,(1-f)/.5)),p=!!t.treeBare,g=w=>{const L=[];let C=-1;for(let I=0;I<=l;I++){const N=I<l&&xa.has(a.m[w*l+I]);N&&C<0&&(C=I),!N&&C>=0&&(L.push([C,I-1]),C=-1)}return L},x=(w,L)=>w.reduce((C,I)=>!C||Math.abs((I[0]+I[1])/2-L)<Math.abs((C[0]+C[1])/2-L)?I:C,null),M=w=>{const L=a.m.slice(),C=a.n.slice();w();for(let I=0;I<L.length;I++)a.m[I]!==L[I]&&((I/l|0)<h||L[I]&&!xa.has(L[I])&&!u[I]?(a.m[I]=L[I],a.n[I*3]=C[I*3],a.n[I*3+1]=C[I*3+1],a.n[I*3+2]=C[I*3+2]):u[I]=1)},m=()=>{for(let w=0;w<8;w++){const L=Math.round(ce(e,h,c-3)),C=g(L);if(C.length){const I=Pl(e,C),N=e()<.5?-1:1;return{x:N<0?I[0]:I[1],y:L,side:N}}}return null},_=p?0:1,y=c-1;let S=l,R=0;for(let w=0;w<h*l;w++)if(a.m[w]&&!xa.has(a.m[w])){const L=w%l;S=Math.min(S,L),R=Math.max(R,L)}const A=Math.max(6*i,(R-S)*.22);r.moss&&M(()=>{for(let w=Math.max(h,Math.round(c-(c-h)*.4));w<c;w++)for(let L=0;L<l;L++){const C=w*l+L;if(!xa.has(a.m[C]))continue;const I=w>0&&!a.m[C-l];(di(L/2.5,w/2.5,41)>1-r.moss*(.35+.4*(w-h)/(c-h))||I&&Bt(L,w,9)<r.moss*.6)&&(a.m[C]=Bt(L,w,5)<.3?s.LEAF2:s.LEAF)}}),r.ivy&&e()<.35+r.ivy*.6&&M(()=>{let w=l/2;const L=y-(y-h)*ce(e,.45,.95)*Math.min(1,r.ivy+.3),C=e()*6;for(let I=y-1;I>L;I--){const N=x(g(I),w);if(!N)break;if(w=N[0]+(N[1]-N[0])*(.5+.48*Math.sin(I*.22+C)),a.px(w,I,s.LEAF3,0,0,1),Bt(Math.round(w),I,13)<.45){const O=Bt(I,3,2)<.5?-1:1;a.px(w+O,I,s.LEAF,O*.5,-.3,.8),a.px(w+O*2,I,s.LEAF3,O*.6,0,.8),a.px(w+O,I-1,Bt(w,I,4)<.4?s.LEAF2:s.LEAF3,0,-.6,.8)}}});const D=Math.round(r.sprigs*_*(5+8*d)*(c-h)/(40*i));for(let w=0;w<D;w++){const L=m();if(!L)break;const C=ce(e,3,5.5)*i;M(()=>_n(a,[L.x+L.side*C*.6,L.y],C,C*.75,t,e,{mat:e()<.4?s.LEAF3:s.LEAF,ragged:.8}))}const b=Math.round(r.boughs*_*(3+4*d)*(c-h)/(45*i)+(e()<r.boughs*_?1:0));for(let w=0;w<b;w++){const L=m();if(!L)break;M(()=>{const C=dn(a,[L.x,L.y],-Math.PI/2+L.side*ce(e,.9,1.35),Math.min(A,ce(e,10,20)*i),2*i,1,t,e,{group:12,mat:s.TRUNK}),I=ce(e,6,9.5)*i;_n(a,mt(C.end,[0,-1*i]),I,I*.65,t,e,{mat:e()<.4?s.LEAF3:s.LEAF})})}if(r.skirt&&_){const w=Math.round(3+r.skirt*5+d*3);for(let L=0;L<w;L++)M(()=>{const C=Math.round(ce(e,Math.max(h,c-(c-h)*.8),c-4*i)),I=x(g(C),l/2);if(!I)return;const N=L%2?1:-1,O=N<0?I[0]:I[1],B=Math.min(A*1.3,ce(e,14,24)*i*(.6+r.skirt*.5)),W=dn(a,[O,C],-Math.PI/2+N*ce(e,1.6,1.95),B,1.6*i,1,t,e,{group:12,mat:s.BARKD});_n(a,En([O,C],W.end,.6),B*.5,3.5*i,t,e,{mat:e()<.5?s.LEAF3:s.LEAF,ragged:1.2})})}return n}const Sf={broad:{ivy:.4,moss:.6,sprigs:.5,boughs:.3},fir:{moss:.3,skirt:1},willow:{moss:.5,sprigs:.3},birch:{sprigs:.3,boughs:.2},flat:{ivy:.3,sprigs:.4,boughs:.3},oak:{ivy:.5,moss:.5,sprigs:.9,boughs:.4},beech:{moss:.3,boughs:.3},ash:{ivy:.6,sprigs:.3,boughs:.2},lime:{moss:.3,sprigs:1},sycamore:{ivy:.4,moss:.4,boughs:.4},chestnut:{sprigs:.3,boughs:.5},rowan:{sprigs:.3,boughs:.3},alder:{moss:.6,sprigs:.4},pine:{ivy:.3,moss:.3,boughs:.15},yew:{moss:.4,skirt:1},hawthorn:{moss:.5,sprigs:.6,boughs:.5},holly:{skirt:.7},hazel:{moss:.4,sprigs:.8},weepingBirch:{sprigs:.3},larch:{skirt:.5,boughs:.2}},Ef=(n,e)=>(t,i,r)=>bf(n(t,i,r),t,i,r,e),Ts={broad:{fn:ef,name:"gnarled broadleaf",grow:"normal"},fir:{fn:tf,name:"spruce",grow:"narrow",hue:.06},willow:{fn:nf,name:"willow",grow:"willow",hue:-.02,val:1.05},birch:{fn:Vu,name:"silver birch",grow:"narrow",hue:-.02,val:1.08},flat:{fn:rf,name:"field maple",grow:"normal",hue:.01},oak:{fn:af,name:"oak",grow:"wide",hue:.01,val:.92},beech:{fn:sf,name:"beech",grow:"normal",hue:-.03,sat:1.05,val:1.02,trunk:[.62,.08,.62]},ash:{fn:of,name:"ash",grow:"narrow",hue:-.04,sat:.85,val:1.12},lime:{fn:lf,name:"lime",grow:"narrow",hue:-.05,sat:1.1,val:1.12},sycamore:{fn:cf,name:"sycamore",grow:"wide",hue:.03,sat:1.1,val:.72},chestnut:{fn:uf,name:"horse chestnut",grow:"wide",hue:-.01,val:1,dot:[244,238,226]},rowan:{fn:hf,name:"rowan",grow:"small",hue:-.01,val:1.05,trunk:[.08,.12,.52],dot:[210,40,34]},alder:{fn:df,name:"alder",grow:"narrow",hue:.04,sat:.9,val:.72},pine:{fn:ff,name:"Scots pine",grow:"narrow",hue:.1,sat:.7,val:.78,upper:[.06,.6,.72]},yew:{fn:pf,name:"yew",grow:"wide",hue:.07,sat:.8,val:.55,upper:[.02,.55,.45]},hawthorn:{fn:gf,name:"hawthorn",grow:"small",hue:.025,val:.8,dot:[176,30,40]},holly:{fn:mf,name:"holly",grow:"narrow",hue:.06,sat:.85,val:.6,trunk:[.1,.08,.55],dot:[214,28,36]},hazel:{fn:Mf,name:"hazel coppice",grow:"small",hue:0,val:.94,trunk:[.07,.3,.45]},weepingBirch:{fn:xf,name:"weeping birch",grow:"narrow",hue:-.04,val:1.12},larch:{fn:_f,name:"larch",grow:"narrow",hue:-.07,sat:.8,val:1.15}};for(const[n,e]of Object.entries(Ts))e.bare=e.fn,e.fn=Ef(e.fn,Sf[n]||{});const yf=new Map(Object.entries(Ts).flatMap(([n,e])=>[[e.fn,{id:n,...e}],[e.bare,{id:n,...e}]])),Yu=n=>Ts[n]||Ts.broad;function Bl(n,e,t){const i=yf.get(t),r=i?.sat||1,a=i?.val||1,o=i?.hue||0,l=o<0?o*Math.max(0,Math.min(1,(e.leafHue-.17)/.09)):o,c=e.leafHue+(n()-.5)*e.leafVariety*.7+l,u={[s.TRUNK]:me(e.trunkHue,.45*e.sat,.34),[s.BARKD]:me(e.trunkHue+.03,.5*e.sat,.17),[s.BARKL]:me(e.trunkHue-.01,.38*e.sat,.5),[s.BARK2]:[222,220,212],[s.LEAF]:me(c,Math.min(1,.62*e.sat*r),Math.min(1,.58*a)),[s.LEAF2]:me(c-.05,Math.min(1,.55*e.sat*r),Math.min(1,.8*a)),[s.LEAF3]:me(c+.03,Math.min(1,.66*e.sat*r),.38*a),[s.WEB]:[225,225,232]};return i?.trunk&&(u[s.BARK2]=me(...i.trunk)),i?.upper&&(u[s.BELLY]=me(...i.upper)),i?.dot&&(u[s.FLOWER]=i.dot),u}function wf(n){const{sp:e,crownY:t}=n,i=new qt(e.w,e.h),r=new qt(e.w,e.h);for(let a=0;a<e.h;a++)for(let o=0;o<e.w;o++){const l=a*e.w+o,c=e.m[l];if(!c)continue;(xa.has(c)&&a>=t||e.low?.[l]?r:i).put(o,a,c,e.n[l*3],e.n[l*3+1],e.n[l*3+2])}return{top:i,bot:r}}function Af(n,e){const t=e.bushSize,i=Pl(n,["round","round","fern","grass","shrub"]),r=Math.round(40*t),a=Math.round(28*t),o=new qt(r,a);if(i==="round"||i==="shrub"){const c=i==="shrub"?5:3;for(let u=0;u<c;u++)_n(o,[r/2+ce(n,-9,9)*t,a-8*t+ce(n,-4,2)*t],ce(n,7,10)*t,ce(n,5,8)*t,e,n);if(i==="shrub"||n()<e.flowers)for(let u=0;u<18*e.flowers+3;u++){const h=r/2+ce(n,-12,12)*t,f=a-ce(n,5,17)*t;o.get(h,f)&&o.recolour(h,f,s.FLOWER)}}else if(i==="fern")for(let c=0;c<7;c++){const u=-Math.PI/2+(c/6-.5)*2.4;let h=r/2,f=a-1;for(let d=0;d<15*t;d++)h+=Math.cos(u)*.9,f+=Math.sin(u)*.9+d*.06,o.put(h,f,c%2?s.LEAF3:s.LEAF,Math.cos(u)*.4,-.2,.9),d%2&&(o.put(h,f-1,s.LEAF2,0,-.5,.85),o.put(h+Math.sign(Math.cos(u)),f+1,s.LEAF,0,.3,.9))}else for(let c=0;c<18*t;c++){const u=r/2+ce(n,-13,13)*t,h=ce(n,5,15)*t,f=ce(n,-3,3);for(let d=0;d<h;d++)o.put(u+f*d/h*(d/h),a-1-d,d>h*.65?s.LEAF2:d<h*.3?s.LEAF3:s.LEAF,f*.1,-.3,.9)}const l=Bl(n,e,null);return l[s.FLOWER]=me(n(),.55,.95),{sp:o,colours:l}}const Tf=["snag","cairn","standingstone","pillar","spire","stalagmite"],Ni=(n,e=0,t=0)=>Bt(Math.floor(n*1e3),Math.floor(e*1e3),4401+t);function Rf(n){let e=n.w,t=-1,i=n.h;for(let a=0;a<n.h;a++)for(let o=0;o<n.w;o++)n.m[a*n.w+o]&&(e=Math.min(e,o),t=Math.max(t,o),i=Math.min(i,a));const r=new qt(t-e+1,n.h-i);for(let a=0;a<r.h;a++)for(let o=0;o<r.w;o++){const l=(a+i)*n.w+o+e;n.m[l]&&r.put(o,a,n.m[l],n.n[l*3],n.n[l*3+1],n.n[l*3+2])}return r}const Xu=n=>e=>[e[0]*Math.cos(n)+e[1]*Math.sin(n),-e[0]*Math.sin(n)+e[1]*Math.cos(n),e[2]];function Cf(n,e,t){const i=Xu(t.lean||0),r=3.3+e()*.6,a=l=>{const c=Math.atan2(l[2],l[0]),u=Math.sin(c*11+l[1]*1.3);return u>.55?s.BARKD:u<-.75?s.BARKL:void 0},o=[[0,0,0,.34],[.05,r*.45,.02,.27],[-.03,r*.85,0,.21],[.02,r,0,.19]];n.chain(o.map(([l,c,u,h])=>[...i([l,c,u]),h]),s.TRUNK,{group:1,rough:.03,paint:l=>t.hollow&&l[2]>.1&&Math.abs(l[0]-i([0,1.1,0])[0])<.14&&Math.abs(l[1]-1.1)<.32?s.NOSE:a(l)});for(let l=0;l<5;l++){const c=l/5*Math.PI*2+e();n.seg(i([Math.cos(c)*.12,r+.05,Math.sin(c)*.12]),i([Math.cos(c)*.16,r+.2+e()*.35,Math.sin(c)*.16]),.07,.015,s.BELLY,{group:2})}for(let l=0;l<5;l++){const c=l/5*Math.PI*2+.4;n.chain([[Math.cos(c)*.28,.3,Math.sin(c)*.28,.14],[Math.cos(c)*.7,.03,Math.sin(c)*.7,.05]],s.TRUNK,{group:1,rough:.02,paint:a})}n.seg(i([.15,r*.62,.05]),i([.75,r*.78,.15]),.09,.05,s.TRUNK,{group:3,paint:a});for(let l=0;l<7;l++){const c=.5+e()*(r-.9),u=(l%2?1.2:2.4)+e()*.8-.4,h=i([Math.cos(u)*.27,c,Math.sin(u)*.27]);n.ell(h,[.16,.035,.12],s.FLOWER,{dir:[Math.cos(u),0,Math.sin(u)],group:10+l,paint:f=>f[1]>h[1]+.02?s.BELLY:void 0})}for(let l=0;l<4;l++)n.ell([Math.cos(l*1.7)*.35,.06,Math.sin(l*1.7)*.35],[.2,.07,.16],s.MOSS,{group:4})}function Lf(n,e,t){const i=t.tall?10:8;let r=0;for(let a=0;a<i;a++){const o=a/(i-1),l=.55-.38*o,c=.16+e()*.06,u=[(e()-.5)*.06,r+c,(e()-.5)*.06];n.ell(u,[l*(1+e()*.15),c,l*(.9+e()*.2)],s.STONE,{group:1+a%3,rough:.03,dir:[1,(e()-.5)*.3,(e()-.5)*.3],paint:h=>Ni(h[0]*3,h[1]*5,a)<(o<.4?.3:.1)?s.MOSS:Ni(h[0]*7,h[2]*7,a)<.12?s.BELLY:void 0}),r+=c*1.75}n.box([0,r+.32,0],[.09,.36,.06],s.STONE,{round:.03,rough:.015,group:5,dir:[.2,1,0],up:[0,0,1]});for(let a=0;a<5;a++){const o=a*1.3;n.ell([Math.cos(o)*.7,.07,Math.sin(o)*.65],[.13,.09,.11],s.STONE,{group:6,rough:.02})}}function Df(n,e,t){const i=t.lean||0,r=1.55+e()*.25,a=[Math.sin(i),Math.cos(i),0],o=.4+e()*.1,l=c=>c[1]>Math.cos(i)*r*1.8?s.MOSS:Ni(Math.floor(c[0]*4),Math.floor(c[1]*3),1)<.12?s.BELLY:c[1]<.5&&Ni(Math.floor(c[0]*5),Math.floor(c[2]*5),2)<.35?s.MOSS:void 0;n.ell([Math.sin(i)*r*.9,Math.cos(i)*r*.9,0],[o,r*.98,.22],s.STONE,{rough:.06,group:1,dir:[Math.cos(i),-Math.sin(i),0],up:a,paint:l}),n.ell([Math.sin(i)*.5-o*.4,.55,.02],[o*.75,.6,.2],s.STONE,{rough:.05,group:1,paint:l}),n.ell([Math.sin(i)*r*1.6+.08,Math.cos(i)*r*1.65,0],[o*.6,.32,.18],s.STONE,{rough:.05,group:1,dir:[1,.4,0],paint:l}),n.ell([.5,.1,.25],[.22,.12,.18],s.STONE,{group:2,rough:.02});for(let c=0;c<6;c++)n.seg([Math.cos(c)*.45,0,Math.sin(c)*.3+.1],[Math.cos(c)*.5,.18+e()*.12,Math.sin(c)*.3+.1],.03,.005,s.LEAF,{group:3})}function Pf(n,e,t){const i=Xu(t.lean||0),r=t.broken?2.2:3.2;if(n.box([0,.14,0],[.48,.14,.48],s.STONE,{round:.03,rough:.01,group:1,paint:a=>Ni(a[0]*9,a[2]*9,3)<.2?s.MOSS:void 0}),n.seg(i([0,.28,0]),i([0,r,0]),.32,.28,s.STONE,{group:2,rough:.012,paint:a=>{const o=Math.atan2(a[2],a[0]);return Math.sin(o*10)>.7?s.STONED:Ni(Math.floor(o*4),Math.floor(a[1]*3),4)<.18?s.BELLY:a[1]<.9&&Ni(Math.floor(o*6),Math.floor(a[1]*6),5)<.3?s.MOSS:void 0}}),t.broken){for(let a=0;a<4;a++){const o=a*1.6+.3;n.seg(i([Math.cos(o)*.15,r,Math.sin(o)*.15]),i([Math.cos(o)*.2,r+.2+e()*.2,Math.sin(o)*.2]),.12,.03,s.STONE,{group:3})}n.seg([1,.26,.3],[1.05,.26,-.35],.27,.27,s.STONE,{group:4,rough:.015})}else n.box(i([0,r+.08,0]),[.4,.08,.4],s.STONE,{round:.02,group:3,dir:[Math.cos(t.lean||0),-Math.sin(t.lean||0),0]}),n.box(i([0,r+.22,0]),[.46,.06,.46],s.STONE,{round:.02,group:3,dir:[Math.cos(t.lean||0),-Math.sin(t.lean||0),0],paint:()=>s.MOSS})}function Of(n,e,t){const i=(r,a,o,l,c)=>{const u=[];for(let f=0;f<=5;f++){const d=f/5;u.push([r+(e()-.5)*.2*d,d*o,a+(e()-.5)*.15*d,l*(1-.55*d)*(.85+e()*.3)])}const h=f=>{const d=(f[1]*1.3+Math.sin(f[0]*3+f[2]*2)*.15)%1;return d<.06?s.STONED:d>.94?s.MOSS:Math.sin(Math.atan2(f[2]-a,f[0]-r)*5+f[1])>.93?s.STONED:Ni(Math.floor(f[0]*5),Math.floor(f[1]*5),c)<.07?s.BELLY:void 0};n.chain(u,s.STONE,{group:c,rough:.07,paint:h});for(let f=0;f<4;f++){const d=.15+f*.2+e()*.1,p=e()*Math.PI*2,g=l*(1-.55*d);n.ell([r+Math.cos(p)*g*.7,d*o,a+Math.sin(p)*g*.7],[g*.55,g*.4,g*.5],s.STONE,{group:c,rough:.06,paint:h})}for(let f=0;f<6;f++){const d=f/6*Math.PI*2+e(),p=[r+Math.cos(d)*.12,o+.05,a+Math.sin(d)*.12];n.seg(p,[p[0]+Math.cos(d)*.45,p[1]+.35,p[2]+Math.sin(d)*.45],.06,.01,f%2?s.LEAF2:s.LEAF,{group:c+10})}n.ell([r,o-.05,a],[l*.5,.12,l*.45],s.MOSS,{group:c+10})};i(0,0,4.4+e()*.8,.85,1),t.twin&&i(1.2,-.4,2.8+e()*.5,.6,2);for(let r=0;r<5;r++){const a=r*1.25;n.ell([Math.cos(a)*1.1,.12,Math.sin(a)*.9],[.25,.16,.2],s.STONE,{group:5,rough:.03})}}function If(n,e,t){const i=r=>{const a=Math.atan2(r[2],r[0]);return Math.sin(a*9+r[1]*.8)>.65?s.STONED:Ni(Math.floor(a*7),Math.floor(r[1]*8),6)<.06?s.BELLY:void 0};n.chain([[0,0,0,.62],[.03,1.1,0,.42],[-.02,2.2,.02,.22],[0,3+e()*.5,0,.04]],s.STONE,{group:1,rough:.025,paint:i});for(const[r,a,o]of[[.75,.3,1.1],[-.7,.2,.8],[.4,-.6,.6],[-.3,.65,.45]])n.chain([[r,0,a,.22],[r,o*.6,a,.12],[r,o,a,.02]],s.STONE,{group:2,rough:.02,paint:i});n.ell([0,.03,0],[.95,.04,.8],s.BODY2,{group:3})}const Nf={snag:Cf,cairn:Lf,standingstone:Df,pillar:Pf,spire:Of,stalagmite:If};function Ff(n,e,t,i,r,a=16){const o=new it({blend:.05});Nf[n](o,r,e);const l=Rf(Ii(o,{scale:ku(i)}).sp),c=t.leaf??.28,u={[s.STONE]:me(.09,.07,.58),[s.STONED]:me(.62,.1,.34),[s.BELLY]:me(.14,.15,.78),[s.MOSS]:me(c,.5,.4),[s.LEAF]:me(c,.55,.45),[s.LEAF2]:me(c-.03,.5,.6),[s.TRUNK]:me(.07,.2,.36),[s.BARKD]:me(.06,.25,.18),[s.BARKL]:me(.08,.15,.52),[s.FLOWER]:[196,150,96],[s.BODY2]:[52,70,86],[s.NOSE]:[20,16,24],[s.LINE]:[24,22,30]};return n==="snag"&&(u[s.BELLY]=[214,196,160]),{sp:l,colours:u,metres:{height:+(l.h/a).toFixed(1),width:+(l.w/a).toFixed(1)}}}const Ge=(n,e={})=>["tree",{type:n,...e}],Re=(n,e={})=>[n,e],Oa=[{id:"moor",name:"Moor",creature:"badger",by:"Ed",leaf:.24,floor:["moss",.26,.45,.42],text:{floor:"moss",wall:"puddles, a lake",small:"long grass",big:"moss mounds"},wall:[Re("water",{w:1.6})],small:[Re("grass",{h:1.4})],big:[Re("mound",{moss:!0}),Re("cairn",{sparse:.12}),Re("standingstone",{sparse:.12})]},{id:"fern-forest",name:"Fern forest",creature:"boar",by:"Ed",leaf:.3,floor:["needles",.08,.45,.32],text:{floor:"pine needles",small:"ferns",big:"pine trees"},small:[Re("fern")],big:[Ge("larch",{scale:1.1}),Ge("fir",{minor:!0})]},{id:"muddy-forest",name:"Muddy forest",creature:"snail",by:"Ed",leaf:.22,floor:["mud",.07,.5,.28],text:{floor:"mud and leaves",small:"short trunks with broken branches",big:"trees with many trunks and branches"},small:[Re("stump",{snag:!0})],big:[Ge("sycamore",{trunks:3,gnarl:.9}),Ge("alder",{minor:!0})]},{id:"stone-shrine",name:"Stone shrine",creature:"fox",by:"Ed",leaf:.28,floor:["stony",.25,.3,.45],text:{floor:"grassy, stony",wall:"mossy henges",small:"little stones",big:"big stones",set:"a shrine"},wall:[Re("henge")],small:[Re("stones")],big:[Re("boulder"),Re("pillar",{sparse:.1}),Re("pillar",{sparse:.08,broken:!0,lean:.14}),Re("cairn",{sparse:.08,tall:!0})],set:Re("shrine")},{id:"tangly-forest",name:"Tangly forest",creature:"ram",by:"Ed",leaf:.27,floor:["nettles",.28,.5,.3],text:{floor:"nettles and earth",small:"tangled branches",big:"fairly short tangly trees"},small:[Re("bramble",{bare:!0})],big:[Ge("hawthorn",{scale:.9,gnarl:1})]},{id:"wispy-forest",name:"Wispy forest",creature:"woodlouse",by:"Ed",leaf:.2,floor:["leaves",.09,.55,.45],text:{floor:"dry leaves",small:"tall thin wispy trees",big:"thick trees with several trunks"},small:[Ge("birch",{scale:.75})],big:[Ge("lime",{trunks:3,thick:1.4}),Ge("birch",{minor:!0})]},{id:"hazel-forest",name:"Hazel forest",creature:"hedgehog",by:"Ed",leaf:.26,floor:["grass",.24,.45,.45],text:{floor:"short grass",small:"brown lumps",big:"crooked trees with many branches"},small:[Re("mound",{brown:!0})],big:[Ge("hazel",{gnarl:1,scale:.95}),Ge("oak",{minor:!0,scale:.9})]},{id:"garden",name:"Garden",creature:"squirrel",by:"Ed",leaf:.3,floor:["lawn",.27,.5,.5],text:{floor:"uniform grass",wall:"ornate stone wall",small:"manicured flower beds",big:"willows",set:"a stone pavilion"},wall:[Re("wall")],small:[Re("flowerbed")],big:[Ge("willow")],set:Re("pavilion")},{id:"twiggy-forest",name:"Twiggy forest",creature:"wolf",by:"Ed",leaf:.29,floor:["plants",.3,.5,.38],text:{floor:"small leafy plants",small:"small trees with many thin trunks",big:"straight but slanted trees with many trunks"},small:[Ge("broad",{trunks:4,scale:.5,thin:!0})],big:[Ge("ash",{trunks:3,lean:.3,gnarl:.1})]},{id:"ancient",name:"Ancient",creature:"stag",by:"Ed",leaf:.31,floor:["roots",.1,.25,.35],text:{floor:"mossy roots over rocks",small:"sorrel",big:"giant gnarly slanted trees"},small:[Re("flowers",{hue:.98,leafy:!0})],big:[Ge("yew",{scale:1.4,gnarl:1,lean:.35}),Ge("oak",{minor:!0,scale:1.3,gnarl:1})]},{id:"norway",name:"Norway",creature:"stoat",by:"Ed",leaf:.36,floor:["slate",.6,.15,.35],text:{floor:"pine needles and slate",small:"rocks",big:"straight pines"},small:[Re("stones",{big:!0})],big:[Ge("fir",{scale:1.2}),Ge("birch",{minor:!0})]},{id:"alder-forest",name:"Alder forest",creature:"snake",by:"Ed",leaf:.23,floor:["tallgrass",.22,.45,.42],text:{floor:"tall and short grass",small:"tree stumps with tall grass around",big:"tall slanted trees with thin leaves at different heights"},small:[Re("stump",{grass:!0})],big:[Ge("alder",{lean:.3,scale:1.2,dark:!0})]},{id:"meadow",name:"Meadow",creature:"hare",by:"draft",leaf:.25,floor:["flowers",.25,.5,.5],text:{floor:"grass and wildflowers",small:"scattered hawthorn",big:"lone oaks"},small:[Re("shrub",{flower:[250,245,235]})],big:[Ge("chestnut",{scale:1.1}),Ge("hawthorn",{minor:!0,scale:.8})]},{id:"old-oaks",name:"Old oaks",creature:"owl",by:"draft",leaf:.22,floor:["leaves",.07,.5,.35],text:{floor:"leaf litter",small:"acorns, fallen branches",big:"ancient gnarled oaks with hollow trunks",set:"a great hollow oak"},small:[Re("cones",{acorn:!0}),Re("log",{branch:!0})],big:[Ge("oak",{gnarl:.9,hollow:!0}),Ge("holly",{minor:!0,scale:.8})],set:Ge("broad",{scale:1.6,gnarl:1,hollow:!0})},{id:"berry-thicket",name:"Berry thicket",creature:"bear",by:"draft",leaf:.32,floor:["needles",.08,.45,.3],text:{floor:"pine needles",wall:"bramble thickets",small:"berry bushes",big:"tall pines"},wall:[Re("bramble")],small:[Re("shrub",{flower:[200,30,60]})],big:[Ge("pine",{scale:1.2}),Ge("rowan",{minor:!0})]},{id:"wetland",name:"Wetland",creature:"toad",by:"draft",leaf:.2,floor:["mud",.15,.45,.3],text:{floor:"wet mud",wall:"puddles, reeds",small:"reeds and rushes",big:"willows"},wall:[Re("water"),Re("reeds",{tall:!0})],small:[Re("reeds")],big:[Ge("willow"),Ge("alder",{minor:!0,scale:.9})]},{id:"stream",name:"Stream",creature:"otter",by:"draft",leaf:.27,floor:["pebbles",.25,.3,.45],text:{floor:"pebbles and grass",wall:"a stream or pond",small:"alder saplings",big:"alders",set:"a fallen-log bridge"},wall:[Re("water",{w:2})],small:[Ge("broad",{scale:.45})],big:[Ge("alder",{scale:.95,gnarl:.3}),Ge("willow",{minor:!0,scale:.8})],set:Re("bridge")},{id:"rocky-slope",name:"Rocky slope",creature:"lynx",by:"draft",leaf:.34,floor:["scree",.2,.2,.42],text:{floor:"scree and moss",wall:"boulders",small:"rocks",big:"pines",set:"a rocky outcrop"},wall:[Re("boulder",{big:!0})],small:[Re("stones",{big:!0})],big:[Ge("rowan",{scale:1.1}),Ge("pine",{minor:!0})],set:Re("outcrop")},{id:"bog",name:"Bog",creature:"elk",by:"draft",leaf:.38,floor:["moss",.18,.55,.4],text:{floor:"sphagnum moss",wall:"bog pools",small:"cotton grass",big:"spruce"},wall:[Re("water",{bog:!0})],small:[Re("reeds",{cotton:!0})],big:[Ge("birch",{scale:.8,dark:!0}),Ge("pine",{minor:!0,scale:.7})]},{id:"deadwood",name:"Deadwood",creature:"raven",by:"draft",leaf:.15,floor:["earth",.07,.35,.3],text:{floor:"bare earth",small:"broken branches",big:"blasted dead trees"},small:[Re("log",{branch:!0})],big:[Ge("broad",{bare:!0,gnarl:1})]},{id:"cave-mouth",name:"Cave mouth",creature:"bat",by:"draft",leaf:.2,floor:["stone",.08,.15,.35],text:{floor:"stone and roots",wall:"rock walls",small:"stalagmite stubs",big:"dead trees",set:"a cave mouth"},wall:[Re("rockwall")],small:[Re("stalagmite")],big:[Ge("broad",{bare:!0}),Ge("yew",{minor:!0,scale:.8})],set:Re("cave")},{id:"grassland",name:"Grassland",creature:"mole",by:"draft",leaf:.25,floor:["grass",.26,.5,.48],text:{floor:"short turf",small:"molehills",big:"lone birches"},small:[Re("mound",{brown:!0,small:!0})],big:[Ge("flat",{scale:1.1}),Ge("weepingBirch",{minor:!0})]},{id:"beaver-pond",name:"Beaver pond",creature:"beaver",by:"draft",leaf:.17,floor:["leaves",.13,.6,.5],text:{floor:"birch leaves",wall:"a pond",small:"stumps",big:"birch and aspen",set:"a beaver dam"},wall:[Re("water",{w:2})],small:[Re("stump",{gnawed:!0})],big:[Ge("weepingBirch"),Ge("alder",{minor:!0,scale:.8})],set:Re("dam")},{id:"log-pile",name:"Log pile",creature:"beetle",by:"draft",leaf:.22,floor:["leaves",.06,.5,.3],text:{floor:"rotting leaves",small:"fungi",big:"rotting logs",set:"a fallen giant"},small:[Re("fungi")],big:[Re("log",{rot:!0}),Re("snag",{sparse:.12}),Re("snag",{sparse:.1,hollow:!0,lean:.12})],set:Re("log",{rot:!0,giant:!0})},{id:"heath",name:"Heath",creature:"moth",by:"draft",leaf:.27,floor:["heather",.85,.35,.4],text:{floor:"heather",small:"gorse",big:"wind-bent birches"},small:[Re("shrub",{flower:[250,205,40],spiky:!0})],big:[Ge("birch",{lean:.45,scale:.75}),Ge("hawthorn",{minor:!0,scale:.7,lean:.45})]},{id:"old-pinewood",name:"Old pinewood",creature:"marten",by:"draft",leaf:.35,floor:["needles",.07,.4,.3],text:{floor:"pine needles",small:"pine cones",big:"tall old pines with knotholes"},small:[Re("cones")],big:[Ge("pine",{scale:1.35}),Ge("rowan",{minor:!0,scale:.8})]},{id:"ravine",name:"Ravine",creature:"salamander",by:"draft",leaf:.3,floor:["stone",.3,.3,.32],text:{floor:"wet moss and rock",wall:"rock walls",small:"ferns",big:"mossy boulders",set:"a waterfall"},wall:[Re("rockwall",{moss:!0})],small:[Re("fern")],big:[Re("boulder",{moss:!0,big:!0}),Re("spire",{sparse:.1}),Re("spire",{sparse:.06,twin:!0}),Re("stalagmite",{sparse:.1})],set:Re("waterfall")},{id:"bluebell-glade",name:"Bluebell glade",creature:"glowworm",by:"draft",leaf:.26,floor:["bluebells",.27,.45,.4],text:{floor:"bluebells",small:"ferns",big:"beeches"},small:[Re("fern")],big:[Ge("beech",{gnarl:.2,scale:1.1}),Ge("holly",{minor:!0,scale:.7})]},{id:"holly-thicket",name:"Holly thicket",creature:"spider",by:"draft",leaf:.36,floor:["leaves",.08,.35,.28],text:{floor:"dead leaves",wall:"holly hedges",small:"cobwebs",big:"hollies",set:"a web-hung dead tree"},wall:[Re("hedge",{berries:!0})],small:[Re("web")],big:[Ge("holly",{scale:.9}),Ge("yew",{minor:!0,scale:.7})],set:Ge("broad",{bare:!0,webs:!0})},{id:"honeysuckle-tangle",name:"Honeysuckle tangle",creature:"dormouse",by:"draft",leaf:.25,floor:["clover",.27,.45,.45],text:{floor:"grass and clover",wall:"bramble",small:"honeysuckle",big:"hazel coppice"},wall:[Re("bramble")],small:[Re("shrub",{flower:[250,230,170]})],big:[Ge("hazel",{trunks:5,scale:.9,thin:!0}),Ge("rowan",{minor:!0,scale:.8})]}];for(const[n,[e,t]]of Object.entries(zu)){const i=Oa.find(r=>r.id===n);i&&!i.set&&(i.set=Re(e,{three:!0}),i.text={...i.text,set:t})}const Uf=Object.fromEntries(Oa.map(n=>[n.id,n])),Bf=["ruins","rocks","freak","lake","modern"],Et=(n,e,t,i,r,a,o,l,c,u,h={})=>({pattern:n,...h,density:e,clump:t,glades:{count:i[0],size:i[1]||[0,0]},heightMix:r&&{sapling:r[0],mature:r[1],tall:r[2],giant:r[3]},undergrowth:a,lean:{dir:o[0],amount:o[1]},terrain:l,decor:{rate:c[0],...Object.fromEntries(Bf.map((f,d)=>[f,c[1][d]]))},feel:u}),Ft=[0,0],kf={moor:Et("scatter",.2,.6,[2,[14,24]],null,.7,[30,.2],["pools","mounds","hollows"],[.5,[.3,.4,0,.3,0]],"Open rolling moss, low mounds and dark pools, long grass combed one way by the wind; you can see a long way."),"fern-forest":Et("groves",.65,.6,[2,[8,12]],[.2,.5,.25,.05],.9,Ft,["hollows","paths"],[.25,[.4,.3,.3,0,0]],"Pine groves standing waist-deep in ferns, with green sunken hollows between them."),"muddy-forest":Et("scatter",.7,.3,[1,[6,9]],[.25,.55,.17,.03],.4,Ft,["pools","paths"],[.3,[.3,.1,.2,.1,.3]],"Squelching mud between many-trunked trees, puddled ruts winding through, broken stumps everywhere."),"stone-shrine":Et("rings",.35,.8,[1,[10,14]],null,.3,Ft,["rocky","mounds"],[.5,[.6,.4,0,0,0]],"Big stones stand in rings round the shrine on stony grass; it feels deliberate and old."),"tangly-forest":Et("thicket",.9,.2,[1,[5,8]],[.35,.55,.1,0],.9,Ft,["hollows"],[.2,[.2,0,.6,0,.2]],"Short tangled trees packed close over nettles, low and claustrophobic, with one small clearing."),"wispy-forest":Et("stands",.55,.7,[2,[6,10]],[.15,.45,.3,.1],.5,Ft,["ridges"],[.3,[.4,.2,.3,0,.1]],"Stands of thick many-trunked trees, thin wispy saplings drifting between them over dry leaves."),"hazel-forest":Et("rings",.6,.6,[2,[6,9]],[.3,.55,.12,.03],.5,Ft,["mounds","paths"],[.3,[.4,.3,.3,0,0]],"Crooked hazels grown in loose fairy rings on short grass, lumpy little mounds in the middle of each."),garden:Et("rows",.45,0,[3,[6,10]],[.1,.7,.2,0],.6,Ft,["paths","pools"],[.4,[.7,0,0,.2,.1]],"A lost formal garden: willows in avenues along straight paths, lawns and flower beds, a pavilion at the heart.",{along:"paths"}),"twiggy-forest":Et("scatter",.75,.3,[1,[6,10]],[.25,.5,.2,.05],.6,[60,.5],["paths"],[.25,[.3,.2,.3,0,.2]],"Straight many-trunked trees all slanting the same way, like a wood frozen in a gale."),ancient:Et("lone",.4,.2,[1,[12,18]],[.05,.35,.4,.2],.4,[150,.25],["rocky","mounds","hollows"],[.45,[.5,.2,.3,0,0]],"Giant gnarled trees far apart, roots heaving over mossy rocks; every tree is a landmark."),norway:Et("stands",.8,.5,[1,[8,12]],[.15,.45,.35,.05],.2,Ft,["rocky","ridges"],[.3,[.2,.6,0,.2,0]],"Dense stands of straight pines on slate ridges, bare rock between; dark, vertical and cold."),"alder-forest":Et("scatter",.55,.4,[2,[6,10]],[.2,.4,.35,.05],.6,[120,.35],["stream","hollows"],[.3,[.3,.1,.2,.3,.1]],"Tall slanted alders at every height over long grass and stumps, a little stream wandering through."),meadow:Et("lone",.12,.1,[0],[.2,.5,.25,.05],.3,Ft,["mounds","paths"],[.35,[.3,.3,0,.2,.2]],"Wide-open wildflower grass with a lone oak here and there and scattered hawthorn; the sky does the work."),"old-oaks":Et("groves",.5,.5,[2,[10,16]],[.1,.35,.4,.15],.5,Ft,["mounds","hollows"],[.4,[.5,.1,.4,0,0]],"Groves of huge hollow oaks with broad clearings of leaf litter between; slow and grand."),"berry-thicket":Et("thicket",.85,.5,[2,[4,7]],[.2,.4,.35,.05],1,Ft,["paths"],[.15,[.3,0,.4,0,.3]],"Tall pines over solid berry bushes and brambles, only narrow animal paths and a couple of pockets of space."),wetland:Et("edgeOnly",.5,.5,[1,[16,24]],[.25,.55,.15,.05],.8,Ft,["pools","stream"],[.35,[.2,0,0,.6,.2]],"Open reedy water and mud in the middle, willows crowding the rim; wet and echoing."),stream:Et("rows",.5,.2,[1,[6,10]],[.3,.45,.2,.05],.5,Ft,["stream","pools"],[.3,[.3,.3,0,.3,.1]],"Alders lining both banks of a pebbly stream, saplings at the water's edge, open grass away from it.",{along:"stream"}),"rocky-slope":Et("scatter",.35,.6,[1,[8,12]],[.3,.5,.18,.02],.2,[90,.15],["rocky","ridges"],[.5,[.3,.7,0,0,0]],"Scree and boulders with pines clinging in clumps, everything leaning slightly uphill."),bog:Et("stands",.25,.85,[3,[10,20]],[.4,.5,.1,0],.6,Ft,["pools","mounds"],[.35,[.2,0,0,.5,.3]],"Sphagnum and bog pools, stunted spruce in tight dark stands, cotton grass pale between them."),deadwood:Et("scatter",.25,.2,[2,[8,14]],[.05,.3,.45,.2],.15,Ft,["ridges","hollows"],[.45,[.3,.1,.3,0,.3]],"Sparse tall blasted snags on bare ridges; bleak, quiet, with long sightlines."),"cave-mouth":Et("edgeOnly",.4,.5,[1,[10,14]],[.2,.5,.3,0],.2,Ft,["rocky","ridges"],[.4,[.3,.6,0,0,.1]],"Rock walls and dead trees ring an open stone floor that leads to the cave's dark mouth."),grassland:Et("lone",.1,.5,[0],[.3,.5,.2,0],.2,Ft,["mounds"],[.35,[.3,.2,0,.1,.4]],"Short turf to the horizon, molehills, birches alone or in twos and threes."),"beaver-pond":Et("edgeOnly",.55,.4,[1,[14,20]],[.4,.45,.15,0],.4,Ft,["pools","stream"],[.4,[.1,0,0,.7,.2]],"A pond in the middle, young birch and aspen round it, gnawed stumps where the big ones were felled."),"log-pile":Et("groves",.5,.7,[2,[6,10]],null,.7,Ft,["hollows","mounds"],[.3,[.3,0,.4,0,.3]],"Rotting logs heaped in piles, fungi everywhere, damp hollows between the heaps."),heath:Et("scatter",.2,.3,[1,[12,18]],[.5,.45,.05,0],.8,[30,.6],["ridges","paths"],[.4,[.4,.4,0,0,.2]],"Purple heather and gorse, small birches bent hard by the wind, all the same way."),"old-pinewood":Et("scatter",.5,.3,[2,[8,14]],[.1,.35,.4,.15],.15,Ft,["mounds","paths"],[.35,[.4,.3,.3,0,0]],"Cathedral-tall old pines on a clear floor of needles; you can see between the trunks a long way."),ravine:Et("edgeOnly",.55,.6,[1,[6,9]],null,.8,Ft,["stream","ridges","rocky"],[.4,[.3,.5,0,.2,0]],"A deep wet cleft: rock walls and mossy boulders either side, ferns, a stream down the middle."),"bluebell-glade":Et("groves",.45,.5,[3,[8,14]],[.1,.5,.35,.05],.3,Ft,["hollows"],[.35,[.4,0,.3,.3,0]],"Beech groves round open glades carpeted in bluebells; soft, bright and airy."),"holly-thicket":Et("thicket",.9,.3,[1,[6,9]],[.3,.6,.1,0],.7,Ft,["hollows"],[.25,[.3,0,.5,0,.2]],"Dark hollies packed close, cobwebs strung between, one clearing round the web-hung tree."),"honeysuckle-tangle":Et("stands",.6,.7,[2,[5,8]],[.45,.5,.05,0],.8,Ft,["paths","mounds"],[.3,[.3,0,.3,0,.4]],"Hazel coppice stools in clumps, honeysuckle and bramble between, clover paths winding through.")};for(const n of Oa)n.layout=kf[n.id];function zf(n,e,t=64,i=48){const[r,a,o,l]=n.floor,c=new qt(t,i),u=n.id.length*131;for(let x=0;x<i;x++)for(let M=0;M<t;M++){const m=(di(M/7,x/5,u)*(t-M)*(i-x)+di((M-t)/7,x/5,u)*M*(i-x)+di(M/7,(x-i)/5,u)*(t-M)*x+di((M-t)/7,(x-i)/5,u)*M*x)/(t*i),_=m<.38?s.BODY2:m>.64?s.BELLY:s.BODY;c.px(M,x,_,0,-.42,.91)}const h=Dl(u),f=(x,M,m)=>c.px((x%t+t)%t,(M%i+i)%i,m,0,-.42,.91),d={moss:0,needles:70,mud:25,stony:30,nettles:60,leaves:80,grass:70,lawn:30,plants:60,roots:30,slate:40,tallgrass:90,flowers:70,pebbles:60,scree:70,earth:15,stone:40,heather:90,bluebells:90,clover:60}[r]??40;for(let x=0;x<d;x++){const M=Math.floor(h()*t),m=Math.floor(h()*i);if(r==="needles"){const _=h()<.5?1:-1;for(let y=0;y<3;y++)f(M+y*_,m+(y>>1),h()<.5?s.BODY2:s.ACCENT)}else if(["grass","lawn","tallgrass","plants","nettles","clover","flowers","bluebells","heather"].includes(r)){const _=r==="tallgrass"?4:r==="lawn"?1:2;for(let y=0;y<_;y++)f(M,m-y,y===_-1?s.LEAF2:s.LEAF);(r==="flowers"||r==="bluebells"||r==="heather"||r==="clover")&&h()<.5&&f(M+1,m-_,s.FLOWER)}else if(["stony","pebbles","scree","slate","stone","roots"].includes(r)){if(f(M,m,s.ACCENT),h()<.6&&f(M+1,m,s.ACCENT),h()<.4&&f(M,m+1,s.BODY2),r==="roots"&&h()<.5)for(let _=0;_<5;_++)f(M+_,m+(_>2?1:0),s.TRUNK)}else if(r==="leaves")f(M,m,s.FLOWER),f(M+1,m,s.FLOWER),h()<.5&&f(M,m+1,s.ACCENT);else if(r==="mud"||r==="earth")for(let _=0;_<3;_++)f(M+_,m,s.BODY2)}const p={flowers:me(.13,.6,.95),bluebells:[90,110,230],heather:[180,90,170],clover:[240,235,240],leaves:me(a+.02,.65,.6)}[r]||me(a,.3,.6),g={[s.BODY]:me(a,o*e.sat,l),[s.BODY2]:me(a+.02,o*e.sat*1.1,l*.78),[s.BELLY]:me(a-.02,o*e.sat*.9,Math.min(1,l*1.15)),[s.ACCENT]:r==="needles"?me(.07,.5,.5):me(.1,.08,.62),[s.FLOWER]:p,[s.LEAF]:me(n.leaf,.55*e.sat,.45),[s.LEAF2]:me(n.leaf-.03,.5*e.sat,.62),[s.TRUNK]:me(e.trunkHue,.4,.3)};return{sp:c,colours:g}}const hr=n=>({[s.ACCENT]:me(.1,.06,.6),[s.BODY2]:me(.62,.08,.4),[s.BELLY]:me(.1,.05,.78),[s.LEAF]:me(.27,.5,.45),[s.LEAF2]:me(.25,.45,.62),[s.NOSE]:[20,16,24]});function Kr(n,e,t,i,r,a,o){const l=[];for(let c=0;c<8;c++){const u=c/8*Math.PI*2,h=1+(a()-.5)*.3;l.push([e[0]+Math.cos(u)*t*h,e[1]+Math.sin(u)*i*h*(Math.sin(u)>0?.5:1)])}n.shape(l,s.ACCENT,{group:5,line:!0,round:r.round}),n.mark([mt(e,[-t,i*.1]),mt(e,[t,i*.1]),mt(e,[t,i]),mt(e,[-t,i])],s.BODY2,[s.ACCENT]),n.mark([mt(e,[-t*.6,-i*.8]),mt(e,[t*.1,-i*1.1]),mt(e,[t*.3,-i*.5]),mt(e,[-t*.3,-i*.3])],s.BELLY,[s.ACCENT]),o&&n.mark(Fs([mt(e,[-t*1.1,-i*.55]),mt(e,[0,-i*1.3]),mt(e,[t*1.1,-i*.5]),mt(e,[t*.6,-i*.2]),mt(e,[-t*.6,-i*.2])],0,3,3,i*.15,1),s.LEAF,[s.ACCENT,s.BELLY,s.BODY2])}function xs(n,e,t,i,r,a){if(Tf.includes(n))return Ff(n,e,t,i,r);const o={[s.LEAF]:me(t.leaf,.6*i.sat,.55),[s.LEAF2]:me(t.leaf-.05,.55*i.sat,.78),[s.LEAF3]:me(t.leaf+.03,.66*i.sat,.36)},l={[s.TRUNK]:me(i.trunkHue,.45*i.sat,.34),[s.BARKD]:me(i.trunkHue+.03,.5*i.sat,.17),[s.BARKL]:me(i.trunkHue-.01,.38*i.sat,.5),[s.BELLY]:me(i.trunkHue+.02,.3,.7)},c={[s.MAGIC]:[60,110,150],[s.MAGIC2]:[150,200,220],[s.BODY2]:[35,70,100]};if(n==="tree"){const x=Yu(e.type).fn,M={...i,leafHue:t.leaf+(e.dark?.05:0),gnarl:e.gnarl??i.gnarl,treeBare:e.bare,treeTrunks:e.trunks,treeLean:e.lean,treeThick:e.thick,treeThin:e.thin,treeHollow:e.hollow,treeWebs:e.webs},m=x(r,M,i.treeSize*a*(e.scale||1)*ce(r,.9,1.1)),_=Bl(r,M,x);return e.dark&&(_[s.LEAF]=_[s.LEAF3],_[s.LEAF3]=me(t.leaf+.05,.7,.22)),_[s.NOSE]=[20,16,24],_[s.WEB]=[225,225,232],{sp:m.sp,colours:_}}if(n==="shrub"){const x=Af(r,{...i,leafHue:t.leaf,bushSize:i.bushSize*a,flowers:1});for(let M=0;M<x.sp.m.length;M++)x.sp.m[M]&&Bt(M,1,3)<(e.spiky?.18:.1)&&x.sp.m[M]!==s.TRUNK&&(x.sp.m[M]=s.FLOWER);return x.colours[s.FLOWER]=e.flower,x}const u=Math.round(48*a*(e.w||1)),h=Math.round(32*a),f=new qt(u,h),d=u/2,p=h;let g={};if(n==="grass"||n==="reeds"||n==="fern"||n==="flowers"||n==="flowerbed"){const x=n==="flowerbed"?40:24,M=(n==="reeds"?e.tall?26:20:n==="fern"?14:10*(e.h||1))*a;n==="flowerbed"&&f.shape([[d-20*a,p-2],[d-18*a,p-6*a],[d+18*a,p-6*a],[d+20*a,p-2],[d+20*a,p],[d-20*a,p]],s.ACCENT,{group:2,line:!0});for(let m=0;m<x;m++){const _=d+ce(r,-16,16)*a,y=M*ce(r,.5,1),S=n==="fern"?ce(r,-6,6)*a:ce(r,-2,2)*a,R=p-1-(n==="flowerbed"?5*a:0);for(let A=0;A<y;A++){const D=A/y;f.px(_+S*D*D,R-A,D>.7?s.LEAF2:D<.3?s.LEAF3:s.LEAF,S*.05,-.3,.9),n==="fern"&&A%2&&f.px(_+S*D*D+(S>0?1:-1),R-A+1,s.LEAF2,0,-.3,.9)}if(n==="reeds"&&(e.cotton||r()<.5))for(let A=0;A<(e.cotton?2:3);A++)f.px(_+S,R-y-A,e.cotton?s.WEB:s.TRUNK,0,-.5,.85);(n==="flowers"||n==="flowerbed")&&r()<.7&&(f.px(_+S,R-y,s.FLOWER,0,-.5,.85),f.px(_+S+1,R-y,s.FLOWER,0,-.5,.85))}if(g={...o,[s.FLOWER]:n==="flowerbed"?Pl(r,[[230,80,120],[250,210,60],[150,110,230]]):me(e.hue??.95,.6,.85),[s.TRUNK]:me(.07,.5,.35),[s.WEB]:[240,240,235],[s.ACCENT]:me(.08,.1,.55)},n==="flowerbed"){for(let m=0;m<f.m.length;m++)f.m[m]===s.FLOWER&&Bt(m,2,7)<.5&&(f.m[m]=s.BELLY);g[s.BELLY]=[250,245,240]}}else if(n==="stones"){for(let x=0;x<(e.big?3:6);x++)Kr(f,[d+ce(r,-14,14)*a,p-(e.big?5:2.5)*a],(e.big?6:3)*a*ce(r,.7,1.2),(e.big?5:2.5)*a,i,r);g=hr()}else if(n==="boulder")Kr(f,[d,p-(e.big?11:8)*a],(e.big?18:13)*a,(e.big?12:9)*a,i,r,e.moss),g={...hr(),...o,[s.ACCENT]:me(.1,.06,.6)};else if(n==="henge")f.shape([[d-7*a,p],[d-8*a,p-18*a],[d-4*a,p-28*a],[d+5*a,p-27*a],[d+8*a,p-14*a],[d+7*a,p]],s.ACCENT,{group:5,line:!0,round:i.round}),f.mark([[d-9*a,p-30*a],[d+9*a,p-30*a],[d+9*a,p-22*a],[d-9*a,p-18*a]],s.LEAF,[s.ACCENT]),g={...hr(),...o};else if(n==="mound"){const x=(e.small?8:14)*a,M=(e.small?5:8)*a;f.shape(Fs([[d-x,p],[d-x*.6,p-M*.8],[d,p-M],[d+x*.6,p-M*.8],[d+x,p]],0,4,e.moss?3:1,(e.moss?1.5:.8)*a,1),e.moss?s.LEAF:s.TRUNK,{group:5,round:i.round}),f.mark([[d-x,p-M*.45],[d+x,p-M*.45],[d+x,p],[d-x,p]],e.moss?s.LEAF3:s.BARKD,[e.moss?s.LEAF:s.TRUNK]),g={...o,...l,[s.TRUNK]:me(.07,.45,e.brown?.35:.3)}}else if(n==="stump"){const x=6*a;if(f.limb([[d,p,x*2.2],[d,p-8*a,x*1.6]],s.TRUNK,{group:5,round:i.round,cap:0,capEnd:0}),f.shape([[d-x*.8,p-8*a],[d,p-10*a-(e.gnawed?4*a:0)],[d+x*.8,p-8*a],[d,p-7*a]],s.BELLY,{group:6,round:i.round}),e.snag&&f.limb([[d+x*.4,p-8*a,2.5*a],[d+x*1.6,p-15*a,1.5*a]],s.TRUNK,{group:7,round:i.round}),e.grass)for(let M=0;M<20;M++){const m=d+ce(r,-14,14)*a,_=ce(r,6,13)*a;for(let y=0;y<_;y++)f.px(m,p-1-y,y>_*.6?s.LEAF2:s.LEAF,0,-.3,.9)}g={...o,...l}}else if(n==="log"){const x=(e.giant?46:e.branch?18:30)*a,M=(e.giant?14:e.branch?3:8)*a;if(f.limb([[d-x/2,p-M/2,M],[d+x/2,p-M/2-(e.branch?2*a:0),M*.9]],s.TRUNK,{group:5,round:i.round,cap:.3,capEnd:.3}),e.branch||f.shape([[d+x/2-M*.1,p-M],[d+x/2+M*.2,p-M/2],[d+x/2-M*.1,p],[d+x/2-M*.3,p-M/2]],s.BELLY,{group:6,round:i.round}),e.rot)for(let m=0;m<(e.giant?6:3);m++){const _=d+ce(r,-x/2,x/3);f.shape([[_-3*a,p-M*.9],[_,p-M-3*a],[_+3*a,p-M*.9]],s.FLOWER,{group:7,line:!0,round:i.round})}e.branch&&f.limb([[d,p-M,M*.7],[d+5*a,p-M-6*a,M*.4]],s.TRUNK,{group:6,round:i.round}),g={...l,[s.FLOWER]:[230,190,120]}}else if(n==="fungi"){for(let x=0;x<5;x++){const M=d+ce(r,-12,12)*a,m=ce(r,3,7)*a,_=ce(r,3,5)*a;f.limb([[M,p,1.6*a],[M,p-m,1.4*a]],s.BELLY,{group:5}),f.shape([[M-_,p-m],[M,p-m-_*.8],[M+_,p-m]],x%2?s.FLOWER:s.MAGIC,{group:6+x%2,line:!0,round:i.round})}g={[s.BELLY]:[225,215,195],[s.FLOWER]:[190,80,50],[s.MAGIC]:[120,230,200]}}else if(n==="cones"){for(let x=0;x<6;x++){const M=d+ce(r,-14,14)*a,m=p-2*a;f.ellipse(M,m,(e.acorn?1.6:2)*a,(e.acorn?2:2.8)*a,s.TRUNK,{round:i.round}),e.acorn?f.ellipse(M,m-1.6*a,1.8*a,1*a,s.BARKD,{round:i.round}):f.px(M,m-1,s.BARKL)}g=l}else if(n==="water"){const x=22*a*(e.w||1),M=6*a;f.shape([[d-x,p-M],[d-x*.3,p-M*1.5],[d+x*.6,p-M*1.2],[d+x,p-M*.5],[d+x*.4,p],[d-x*.7,p-M*.2]],s.MAGIC,{group:5,round:.2});for(let m=0;m<6;m++){const _=d+ce(r,-x*.6,x*.6),y=p-M*ce(r,.4,1.1);for(let S=0;S<3*a;S++)f.recolour(_+S,y,s.MAGIC2)}g=e.bog?{[s.MAGIC]:[60,70,50],[s.MAGIC2]:[120,130,90]}:c;for(let m=0;m<f.m.length;m++)f.m[m]===s.MAGIC?f.m[m]=s.BODY:f.m[m]===s.MAGIC2&&(f.m[m]=s.BELLY);g={[s.BODY]:g[s.MAGIC],[s.BELLY]:g[s.MAGIC2]}}else if(n==="bramble"||n==="hedge"){const x=22*a,M=(n==="hedge"?18:12)*a;for(let m=0;m<(n==="hedge"?6:4);m++){const _=d+ce(r,-x*.8,x*.8),y=p-M*ce(r,.4,.7);f.ellipse(_,y,ce(r,6,9)*a,M*.45,n==="hedge"?s.LEAF3:s.LEAF,{round:i.round,density:e.bare?.5:.95,noise:.5,seed:m})}for(let m=0;m<8;m++){let y=d+ce(r,-x,x),S=p;for(let R=0;R<M*1.2;R++)y+=Math.sin(R*.3+m)*.8,S-=.8,f.px(y,S,s.TRUNK,0,-.3,.9)}if(n==="hedge"||e.berries||n==="bramble")for(let m=0;m<f.m.length;m++)f.m[m]&&f.m[m]!==s.TRUNK&&Bt(m,5,9)<.05&&(f.m[m]=s.FLOWER);g={...o,...l,[s.FLOWER]:n==="hedge"?[210,30,40]:[70,30,70]}}else if(n==="wall"){const x=22*a,M=12*a;f.shape([[d-x,p],[d-x,p-M],[d+x,p-M],[d+x,p]],s.ACCENT,{group:5,line:!0,depth:2}),f.shape([[d-x-1,p-M],[d-x-1,p-M-2*a],[d+x+1,p-M-2*a],[d+x+1,p-M]],s.BELLY,{group:6,line:!0,depth:2}),f.shape([[d+x-6*a,p-M-2*a],[d+x-6*a,p-M-7*a],[d+x,p-M-7*a],[d+x,p-M-2*a]],s.ACCENT,{group:7,line:!0,depth:2}),f.ellipse(d+x-3*a,p-M-9*a,3*a,2.5*a,s.BELLY,{round:i.round});for(let m=p-M+3*a;m<p;m+=4*a)for(let _=d-x;_<d+x;_++)f.recolour(_,m,s.BODY2);g=hr()}else if(n==="rockwall"){for(let x=0;x<5;x++)Kr(f,[d+(x-2)*9*a,p-ce(r,8,14)*a],8*a,10*a,i,r,e.moss);g={...hr(),...o}}else if(n==="stalagmite"){for(let x=0;x<4;x++){const M=d+ce(r,-14,14)*a,m=ce(r,5,11)*a;f.shape([[M-3*a,p],[M-1*a,p-m],[M+1*a,p-m],[M+3*a,p]],s.ACCENT,{group:5,line:!0,round:i.round})}g=hr()}else if(n==="web"){const x=[d,p-14*a],M=11*a;for(let m=0;m<8;m++){const _=m/8*Math.PI*2;for(let y=0;y<M;y++)f.px(x[0]+Math.cos(_)*y,x[1]+Math.sin(_)*y,s.WEB,0,0,1)}for(let m=3*a;m<M;m+=3*a)for(let _=0;_<Math.PI*2;_+=.05)f.px(x[0]+Math.cos(_)*m,x[1]+Math.sin(_)*m,s.WEB,0,0,1);g={[s.WEB]:[225,230,240]}}return{sp:f,colours:g}}function Hf(n,e,t,i,r,a){if(e.three)return yd(n,t,i);if(n==="tree"||n==="log")return xs(n,e,t,i,r,a);const o=Math.round(90*a),l=Math.round(70*a),c=new qt(o,l),u=o/2,h=l;let f={...hr(),[s.LEAF]:me(t.leaf,.55,.5),[s.LEAF2]:me(t.leaf-.04,.5,.7),[s.TRUNK]:me(i.trunkHue,.45,.34),[s.BARKD]:me(i.trunkHue+.03,.5,.17),[s.MAGIC]:me(i.magicHue,.6,1),[s.MAGIC2]:me(i.magicHue,.2,1)};if(n==="shrine")c.shape([[u-16*a,h],[u-14*a,h-6*a],[u+14*a,h-6*a],[u+16*a,h]],s.ACCENT,{group:5,line:!0,depth:2}),c.shape([[u-9*a,h-6*a],[u-9*a,h-26*a],[u+9*a,h-26*a],[u+9*a,h-6*a]],s.ACCENT,{group:6,line:!0,depth:2}),c.shape([[u-5*a,h-10*a],[u-5*a,h-20*a],[u,h-23*a],[u+5*a,h-20*a],[u+5*a,h-10*a]],s.NOSE,{group:7}),c.shape([[u-13*a,h-26*a],[u,h-34*a],[u+13*a,h-26*a]],s.BODY2,{group:8,line:!0,depth:2}),c.ellipse(u,h-13*a,2.5*a,2.5*a,s.MAGIC2,{round:.5}),c.mark([[u-14*a,h-36*a],[u+2*a,h-36*a],[u-4*a,h-24*a],[u-14*a,h-24*a]],s.LEAF,[s.BODY2,s.ACCENT]);else if(n==="pavilion"){c.shape([[u-26*a,h],[u-26*a,h-4*a],[u+26*a,h-4*a],[u+26*a,h]],s.ACCENT,{group:5,line:!0,depth:2});for(const d of[-20,-7,7,20])c.limb([[u+d*a,h-4*a,4*a],[u+d*a,h-34*a,4*a]],d===-7||d===7?s.BODY2:s.BELLY,{group:6+(d>0?1:0),line:!0,cap:0,capEnd:0});c.shape([[u-28*a,h-34*a],[u-28*a,h-38*a],[u+28*a,h-38*a],[u+28*a,h-34*a]],s.ACCENT,{group:8,line:!0,depth:2}),c.shape([[u-24*a,h-38*a],[u-16*a,h-54*a],[u,h-60*a],[u+16*a,h-54*a],[u+24*a,h-38*a]],s.BELLY,{group:9,line:!0})}else if(n==="bridge"){const d=xs("water",{w:1.8},t,i,r,a);for(let p=0;p<d.sp.m.length;p++){const g=p%d.sp.w,x=p/d.sp.w|0,M=Math.round(u-d.sp.w/2+g),m=h-d.sp.h+x;d.sp.m[p]&&c.inb(M,m)&&c.px(M,m,d.sp.m[p]===s.BODY?s.IRIS:s.PUPIL,0,-.42,.91)}c.limb([[u-34*a,h-6*a,9*a],[u+34*a,h-10*a,8*a]],s.TRUNK,{group:6,line:!0,cap:.3,capEnd:.3}),f[s.IRIS]=[60,110,150],f[s.PUPIL]=[150,200,220]}else if(n==="outcrop")for(const[d,p,g,x]of[[-18,14,16,13],[12,12,18,12],[-2,28,15,13],[16,34,9,9]])Kr(c,[u+d*a,h-p*a],g*a,x*a,i,r,!0);else if(n==="cave"){for(const[d,p,g,x]of[[-26,16,16,15],[26,16,16,15],[0,40,30,18],[-12,30,14,12],[12,30,14,12]])Kr(c,[u+d*a,h-p*a],g*a,x*a,i,r,p>30);c.shape([[u-15*a,h],[u-14*a,h-18*a],[u-4*a,h-28*a],[u+6*a,h-27*a],[u+14*a,h-16*a],[u+15*a,h]],s.NOSE,{group:9,line:!0})}else if(n==="dam"){const d=xs("water",{w:1.9},t,i,r,a);for(let p=0;p<d.sp.m.length;p++){const g=p%d.sp.w,x=p/d.sp.w|0,M=Math.round(u-d.sp.w/2+g),m=h-d.sp.h+x-10*a;d.sp.m[p]&&c.inb(M,m)&&c.px(M,m,d.sp.m[p]===s.BODY?s.IRIS:s.PUPIL,0,-.42,.91)}for(let p=0;p<26;p++){const g=u+ce(r,-32,32)*a,x=h-ce(r,2,14)*a,M=ce(r,-.5,.5),m=ce(r,8,16)*a;c.limb([[g-Math.cos(M)*m/2,x-Math.sin(M)*m/2,2.6*a],[g+Math.cos(M)*m/2,x+Math.sin(M)*m/2,2*a]],p%3?s.TRUNK:s.BARKD,{group:6+p%2,line:!0})}f[s.IRIS]=[60,110,150],f[s.PUPIL]=[150,200,220]}else if(n==="waterfall"){for(const[d,p,g,x]of[[-22,30,18,30],[22,30,18,30],[0,56,20,12]])Kr(c,[u+d*a,h-p*a],g*a,x*a,i,r,!0);for(let d=u-6*a;d<u+6*a;d++)for(let p=h-50*a;p<h-4*a;p++)c.px(d,p,Bt(d|0,p/3|0,4)<.3?s.PUPIL:s.IRIS,0,-.2,.98);c.shape([[u-18*a,h],[u-14*a,h-6*a],[u+14*a,h-6*a],[u+18*a,h]],s.IRIS,{group:10,round:.2}),f[s.IRIS]=[90,150,190],f[s.PUPIL]=[210,235,245]}return{sp:c,colours:f}}function Gf(n,e,{K:t=2/(e.pixel||2),makeCanvas:i=Pu}={}){const r=Uf[n];if(!r)throw new Error(`no area type "${n}"`);const a=Dl(n.split("").reduce((h,f)=>h*31+f.charCodeAt(0),7)>>>0),o=(h,f,d)=>({sp:$r(h.sp,h.colours,e,"none",i),kind:f,text:d}),l=zf(r,e),c=h=>(h||[]).map(([f,d])=>{const p=xs(f,d,r,e,a,t),g=o(p,f,"");return p.metres&&(g.metres=p.metres),d.sparse&&(g.sparse=d.sparse),g}),u={def:r,floor:{sp:$r(l.sp,l.colours,e,"none",i),kind:r.floor[0],text:r.text.floor},walls:c(r.wall),small:c(r.small),big:c(r.big),setPiece:null};if(u.walls.forEach(h=>h.text=r.text.wall),u.small.forEach(h=>h.text=r.text.small),u.big.forEach(h=>h.text=r.text.big),r.set){const h=Hf(r.set[0],r.set[1],r,e,a,t);u.setPiece={...o(h,r.set[0],r.text.set),metres:h.metres,origin:h.origin}}return u}function Wf(n,e){const t=new Map,i=new Map,r=(c,u,h)=>(c*2097152+(u+1048576))*2097152+(h+1048576),a=(c,u,h)=>{const f=r(c,u,h);let d=t.get(f);if(!d){const p=Math.pow(2,-c);d=[p*(u+Nt(u*7+c,h,n)),p*(h+Nt(u,h*13+c,n+1))],t.set(f,d)}return d},o=(c,u,h)=>{const f=Math.pow(2,-c),d=Math.floor(u/f),p=Math.floor(h/f);let g=d,x=p,M=1/0;for(let m=-2;m<=2;m++)for(let _=-2;_<=2;_++){const y=a(c,d+m,p+_),S=(y[0]-u)**2+(y[1]-h)**2;S<M&&(M=S,g=d+m,x=p+_)}return[g,x]},l=(c,u,h)=>{const f=r(c,u,h);let d=i.get(f);if(d)return d;if(c===0)d=[u,h];else{const p=a(c,u,h),g=o(c-1,p[0],p[1]);d=l(c-1,g[0],g[1])}return i.set(f,d),d};return{seed:n,depth:e,site:(c,u)=>a(0,c,u),partition(c,u){const h=o(e,c,u);return l(e,h[0],h[1])},centreness(c,u,h){const f=a(0,h[0],h[1]),d=Math.hypot(c-f[0],u-f[1]);let p=1/0;const g=Math.floor(c),x=Math.floor(u);for(let M=-2;M<=2;M++)for(let m=-2;m<=2;m++){const _=g+M,y=x+m;if(_===h[0]&&y===h[1])continue;const S=a(0,_,y);p=Math.min(p,Math.hypot(c-S[0],u-S[1]))}return Math.min(1,2*d/(d+p))},openness(c,u){let h=1/0,f=1/0;const d=Math.floor(c),p=Math.floor(u);for(let g=-2;g<=2;g++)for(let x=-2;x<=2;x++){const M=a(0,d+g,p+x),m=Math.hypot(c-M[0],u-M[1]);m<h?(f=h,h=m):m<f&&(f=m)}return Math.min(1,2*h/(h+f))}}}const Vf=rd.types,Mi=Oa.map(n=>({id:n.id,name:n.name,creature:n.creature,text:n.text,setPiece:n.set?n.text.set??"a set piece":"",hasWalls:!!n.wall?.length,floor:[n.floor[1],n.floor[2],n.floor[3]],treeDensity:Vf[n.id]?.treeDensity??1})),Vr=(n,e)=>n+","+e;function Yf(n){if(n==null||n.trim()==="")return null;const e=n.trim();if(/^\d{1,9}$/.test(e))return Number(e);let t=2166136261;for(let i=0;i<e.length;i++)t=Math.imul(t^e.charCodeAt(i),16777619);return(t>>>0)%1e9}function Xf(n,e,t,i){const r=new Map,a=(c,u)=>{if(c[0]===u[0]&&c[1]===u[1])return;const h=Vr(c[0],c[1]),f=Vr(u[0],u[1]);r.has(h)||r.set(h,new Set),r.has(f)||r.set(f,new Set),r.get(h).add(f),r.get(f).add(h)},o=(t-e)*i;let l=[];for(let c=0;c<=o;c++){const u=[];for(let h=0;h<=o;h++){const f=n.partition(e+h/i,e+c/i);u.push(f),h>0&&a(f,u[h-1]),c>0&&a(f,l[h])}l=u}return r}function Kf(n,e){const t=e.mapAreas,i=2,r=e.areaSize*e.areaScale,a=Mi.length,o=3,l=Math.max(0,Math.min(1,e.areaSizeVariance))*o*.3,c=(N,O)=>{const B=N/r,W=O/r;return[B+l*(dc(B/o,W/o,n+91)-.5)*2,W+l*(dc(B/o,W/o,n+92)-.5)*2]},u=(N,O)=>{let B=N*r,W=O*r;for(let $=0;$<30;$++){const[ae,q]=c(B,W);B+=(N-ae)*r,W+=(O-q)*r}return[B,W]},h=Wf(n,e.borderLayers),f=-i,d=t+i,p=Xf(h,f,d,6),g=new Map,x=Aa(n*5+1);for(let N=f;N<d;N++)for(let O=f;O<d;O++){const B=new Set;for(let ae=-2;ae<=2;ae++)for(let q=-2;q<=2;q++){const ee=g.get(Vr(O+q,N+ae));ee!==void 0&&B.add(ee)}for(const ae of p.get(Vr(O,N))??[]){const q=g.get(ae);q!==void 0&&B.add(q)}const W=[...Array(a).keys()].filter(ae=>!B.has(ae)),$=W.length?W:[...Array(a).keys()];g.set(Vr(O,N),$[Math.floor(x()*$.length)])}const M=(N,O)=>g.get(Vr(N,O))??Math.floor(Nt(N,O,n+17)*a),m=Math.floor(t/2),_=(N,O)=>{const B=h.site(N,O),W=h.partition(B[0],B[1]);return W[0]===N&&W[1]===O};let y=[m,m];for(const[N,O]of[[0,0],[1,0],[0,1],[-1,0],[0,-1],[1,1],[-1,1],[1,-1],[-1,-1]])if(_(m+N,m+O)){y=[m+N,m+O];break}const S=(N,O)=>{const B=h.site(N,O),W=u(B[0],B[1]);return{x:W[0],z:W[1]}},R=S(y[0],y[1]),A=(N,O)=>{const[B,W]=c(N,O),$=h.partition(B,W);return{cell:$,type:M($[0],$[1]),openness:h.openness(B,W)}},D=4.5,b=D*2.2,w=(N,O)=>{if(Math.hypot(N-R.x,O-R.z)<b)return 0;const[B,W]=c(N,O);return ea((h.openness(B,W)-e.clearingSize)/Math.max(.01,e.clearingFalloff))*e.treeDensity},L=(N,O)=>{const B=Mi[M(N,O)];return B.setPiece&&Nt(N,O,n+61)<e.setPieceChance?B.setPiece:null},C=(N,O)=>Math.min(1,Math.hypot(N-y[0],O-y[1])/(t/2)),I=r*.5;return{seed:n,tuning:e,n:t,margin:i,areaSize:r,partition:h,centreCell:y,dancefloor:{x:R.x,z:R.z,radius:D},start:{x:R.x,z:R.z+2},bounds:{minX:I,maxX:t*r-I,minZ:I,maxZ:t*r-I},extent:{minX:f*r,maxX:d*r,minZ:f*r,maxZ:d*r},typeOf:M,areaAt:A,siteOf:S,treeWeight:w,neighbours:p,setPieceOf:L,remoteness:C}}function qf(n,e,t=.5){const i=n.tuning,r=Mr(e,0,1),a=Math.round(li(i.creaturesNear,i.creaturesFar,Math.pow(r,i.creatureCurve))+(t-.5)*2),o=Math.min(Math.max(0,a),Math.round(i.legendsFar*ea((r-i.legendsFrom)/Math.max(.01,1-i.legendsFrom))+(t-.5)*.8)),l=Math.round(Math.max(0,a-o)*i.youngShareFar*r);return{babies:Math.max(0,a-o-l),young:l,legends:o}}const Zf=(n,e,t=0)=>(n.tuning.clearingSize+n.tuning.clearingFalloff*.3)*n.areaSize*.5*(e===2?.55:.8)*(1+t);function $f(n){const e=[],t=n.tuning;let i=0;const[r,a]=n.centreCell;for(let o=0;o<n.n;o++)for(let l=0;l<n.n;l++){if(l===r&&o===a)continue;const c=Aa(n.seed*7919+l*131+o*977+3),u=Mi[n.typeOf(l,o)],h=n.siteOf(l,o),f=n.remoteness(l,o),d=qf(n,f,Nt(l,o,n.seed+43)),p=x=>{const M=Zf(n,x,f),m=c()*Math.PI*2,_=Math.sqrt(c())*M,y=h.x+Math.cos(m)*_,S=h.z+Math.sin(m)*_;return{id:i++,species:u.creature,cell:[l,o],level:x,homeX:h.x,homeZ:h.z,range:M,x:y,z:S,tx:y,tz:S,rest:c()*3,speed:(x===2?t.legendSpeed:t.creatureSpeed)*(.7+c()*.6),facing:c()<.5?1:-1,moving:!1,walk:c(),rand:Aa(n.seed*31+i*7+11)}};for(let x=0;x<d.babies;x++)e.push(p(0));for(let x=0;x<d.young;x++)e.push(p(1));const g=l===r+1&&o===a?Math.max(1,d.legends):d.legends;for(let x=0;x<g;x++)e.push(p(2))}return e}function Jf(n,e){if(n.rest>0){n.rest-=e,n.moving=!1;return}const t=n.tx-n.x,i=n.tz-n.z,r=Math.hypot(t,i);if(r<.05){const o=n.rand()*Math.PI*2,l=Math.sqrt(n.rand())*n.range;n.tx=n.homeX+Math.cos(o)*l,n.tz=n.homeZ+Math.sin(o)*l,n.rest=.8+n.rand()*3.5,n.moving=!1;return}const a=Math.min(r,n.speed*e);n.x+=t/r*a,n.z+=i/r*a,Math.abs(t)>.02&&(n.facing=t>0?1:-1),n.moving=!0,n.walk+=e*(n.level===2?1.5:4)}function Qf(n,e,t,i,r){for(const a of n)Math.abs(a.homeX-e)<i&&Math.abs(a.homeZ-t)<i&&Jf(a,r)}const Ku=6,jf=4,xn=32;function e0(n){const e=n.tuning.camera.treetop.angleIn*Math.PI/180;return n.tuning.crownHeight/Math.sin(e)}function t0(n,e,t){const{treeSpacingX:i,treeSpacingZ:r}=n.tuning,a=n.seed,o=[],l=e0(n),c=n.tuning.crownHalfWidth,u=Math.ceil(t*xn/r),h=Math.ceil((t+1)*xn/r);for(let f=u;f<h;f++){const d=f&1?.5:0,p=Math.ceil(e*xn/i-d),g=Math.ceil((e+1)*xn/i-d);for(let x=p;x<g;x++){const M=(x+d+(Nt(x,f,a+101)-.5)*.7)*i,m=(f+(Nt(x,f,a+102)-.5)*.7)*r,_=n.areaAt(M,m);Nt(x,f,a+103)>=n.treeWeight(M,m)*Mi[_.type].treeDensity||n.treeWeight(M,m-l)===0||n.treeWeight(M-c,m-l)===0||n.treeWeight(M+c,m-l)===0||o.push({x:M,z:m,type:_.type,variant:Math.floor(Nt(x,f,a+104)*Ku),flip:Nt(x,f,a+105)<.5})}}return o}function n0(n,e,t){const i=n.tuning.bushSpacing,r=n.seed,a=[],o=Math.ceil(t*xn/i),l=Math.ceil((t+1)*xn/i),c=Math.ceil(e*xn/i),u=Math.ceil((e+1)*xn/i);for(let h=o;h<l;h++)for(let f=c;f<u;f++){const d=(f+(Nt(f,h,r+201)-.5)*.9)*i,p=(h+(Nt(f,h,r+202)-.5)*.9)*i;Nt(f,h,r+203)>(.12+Math.min(1,n.treeWeight(d,p))*.3)*n.tuning.bushDensity||a.push({x:d,z:p,type:n.areaAt(d,p).type,variant:Math.floor(Nt(f,h,r+204)*jf),flip:Nt(f,h,r+205)<.5})}return a}function i0(n,e,t){const i=n.tuning.wallSpacing,r=n.seed,a=[],o=Math.ceil(t*xn/i),l=Math.ceil((t+1)*xn/i),c=Math.ceil(e*xn/i),u=Math.ceil((e+1)*xn/i);for(let h=o;h<l;h++)for(let f=c;f<u;f++){if(Nt(f,h,r+303)>n.tuning.wallDensity)continue;const d=(f+(Nt(f,h,r+301)-.5)*.6)*i,p=(h+(Nt(f,h,r+302)-.5)*.6)*i,g=n.areaAt(d,p);g.openness<.82||!Mi[g.type].hasWalls||a.push({x:d,z:p,type:g.type,variant:Math.floor(Nt(f,h,r+304)*4),flip:Nt(f,h,r+305)<.5})}return a}class r0{constructor(e){this.map=e}map;trees=new Map;bushes=new Map;walls=new Map;chunks(e,t,i){const r=[];for(let a=Math.floor((t-i)/xn);a<=Math.floor((t+i)/xn);a++)for(let o=Math.floor((e-i)/xn);o<=Math.floor((e+i)/xn);o++)r.push([o,a]);return r}gather(e,t,i,r,a){e.size>600&&e.clear();const o=[];for(const[l,c]of this.chunks(i,r,a)){const u=l+","+c;let h=e.get(u);h||(h=t(l,c),e.set(u,h));for(const f of h)Math.abs(f.x-i)<=a&&Math.abs(f.z-r)<=a&&o.push(f)}return o}treesNear(e,t,i){return this.gather(this.trees,(r,a)=>t0(this.map,r,a),e,t,i)}bushesNear(e,t,i){return this.gather(this.bushes,(r,a)=>n0(this.map,r,a),e,t,i)}wallsNear(e,t,i){return this.gather(this.walls,(r,a)=>i0(this.map,r,a),e,t,i)}setPiecesNear(e,t,i){const r=this.map,a=r.areaSize,o=[];for(let l=Math.floor((t-i)/a)-1;l<=Math.floor((t+i)/a)+1;l++)for(let c=Math.floor((e-i)/a)-1;c<=Math.floor((e+i)/a)+1;c++){if(c===r.centreCell[0]&&l===r.centreCell[1]||!r.setPieceOf(c,l))continue;const u=r.siteOf(c,l);Math.abs(u.x-e)<=i&&Math.abs(u.z-4-t)<=i&&o.push({x:u.x,z:u.z-4,type:r.typeOf(c,l),variant:0,flip:Nt(c,l,r.seed+71)<.5})}return o}}function a0(n,e){return{x:n,z:e,vx:0,vz:0,lift:0,mode:"ground",facing:1}}const kl=(n,e)=>li(e.groundHeight,e.treetopHeight,ea(n.lift)),Zs=n=>ea(n.lift);function s0(n,e,t,i,r){let{mode:a,lift:o}=n;e.toggleMode&&(a=a==="ground"||a==="descending"?"rising":"descending"),a==="rising"?(o+=t/Math.max(.001,i.riseTime),o>=1&&(o=1,a="treetop")):a==="descending"&&(o-=t/Math.max(.001,i.descendTime),o<=0&&(o=0,a="ground"));let l=e.moveX,c=e.moveZ;const u=Math.hypot(l,c);u>1&&(l/=u,c/=u);const h=li(i.groundSpeed,i.treetopSpeed,ea(o)),f=1-Math.exp(-i.acceleration*t);let d=n.vx+(l*h-n.vx)*f,p=n.vz+(c*h-n.vz)*f,g=n.x+d*t,x=n.z+p*t;(g<r.minX||g>r.maxX)&&(g=Mr(g,r.minX,r.maxX),d=0),(x<r.minZ||x>r.maxZ)&&(x=Mr(x,r.minZ,r.maxZ),p=0);const M=d>.3?1:d<-.3?-1:n.facing;return{x:g,z:x,vx:d,vz:p,lift:o,mode:a,facing:M}}function o0(n,e){const t=Kf(n,e),i=a0(t.start.x,t.start.z);return{seed:n,tuning:e,map:t,forest:new r0(t),creatures:$f(t),clock:td(),witch:i,camera:Jh(e,i.x,kl(i,e),i.z)}}function l0(n,e,t){const i=nd(n.clock,t);i!==0&&(n.witch=s0(n.witch,e,i,n.tuning,n.map.bounds),n.camera=Qh(n.camera,e.zoom,{x:n.witch.x,y:kl(n.witch,n.tuning),z:n.witch.z},{x:n.witch.vx,z:n.witch.vz},n.witch.lift,i,n.tuning),Qf(n.creatures,n.witch.x,n.witch.z,n.tuning.creatureSimRadius,i))}const c0=n=>jh(n.camera,n.camera.lift,n.tuning);function qu(n){const e=n.map.areaAt(n.witch.x,n.witch.z),t=n.map.setPieceOf(e.cell[0],e.cell[1]);return Mi[e.type].name+(t?` (set piece: ${t})`:"")}const u0="Witch tuning. Edit the numbers, push, and the playable link rebuilds. Distances are metres, times seconds, angles degrees. Keys starting with _ are notes.",h0="The forest: mapAreas x mapAreas areas cut by the fractal partition. An area is areaSize x areaScale metres across on average (areaScale 1.4 doubles the ground of the first 28 m areas; push it for bigger). areaSizeVariance (0-1) makes areas vary in size, some small, some large. borderLayers sets how wiggly borders are.",d0=20,f0=28,p0=1.4,g0=.7,m0=4,M0="treeDensity (0-1): the chance of a tree on each spot outside the clearings; clearingSize (0-1): how far out from an area's centre the ground stays fully open; clearingFalloff (0-1): over how much of the way to the border trees thicken, smoothly, to full density; trees sit on a staggered grid treeSpacingX by treeSpacingZ metres, so no two crowns pile up. A tree is left out where its crown (crownHalfWidth either side, crownHeight up) would hang over a clearing seen from the treetops.",x0=.9,_0=.1,v0=.5,b0=1,S0=5,E0=3,y0=4.5,w0=5,A0=3.4,T0=4,R0=.6,C0="Speeds per mode, and how long rising and descending take.",L0=14,D0=32,P0=10,O0=.7,I0=.55,N0=1.4,F0=11,U0="Near-isometric on the ground, after Transistor; lower over the treetops, looking toward the horizon to feel the speed. The camera follows the witch on a soft spring (follow: its stiffness; higher keeps her closer to the middle) and looks a little ahead of her: lookAhead seconds of flight, at most lookAheadMax metres, eased in at lookAheadEase. zoomEase and liftEase: how softly zoom and rising change the angle and distance. a narrow field of view (fov, degrees) seen from far off, so there is little perspective. Each mode has its own angle (degrees below horizontal) and distance from the witch, at zoomed-in and zoomed-out. Zoom moves between them in zoomSteps steps.",B0={fov:20,ground:{angleIn:38,angleOut:46,distanceIn:42,distanceOut:84},treetop:{angleIn:32,angleOut:36,distanceIn:70,distanceOut:120},lookAhead:.1,lookAheadMax:3,lookAheadEase:1.5,zoomEase:5,liftEase:8,zoomSteps:4,startZoom:1,follow:8},k0="Everything the camera can see is drawn, plus viewMargin metres round the view, so nothing appears or vanishes on screen. haze: the twilight haze fades the forest from near to far metres from the witch; nothing is drawn beyond far. pixelSize: screen pixels per art pixel. glowReach: metres the witch's light reaches. spriteTilt: 1 = sprites face the camera fully, 0 = stand upright.",z0=3,H0=8,G0=1,W0=1,V0=16,Y0=12,X0={near:90,far:220},K0="bloom: a gentle glow round bright things (strength 0 or on false turns it off; threshold: how bright a pixel must be to glow). tiltShift: blurs the top and bottom of the screen so the forest looks like a miniature. strength: the blur at the screen's edges, in pixels; band: the height of the sharp band (0-1 of the screen); centre: where it sits (0 top, 0.5 middle, 1 bottom); where: 'before' blurs at the low resolution, before the pixels are scaled up, 'after' blurs the scaled-up image. Add ?tilt=before, ?tilt=after or ?tilt=off to the link to compare.",q0="shadows: a flat shadow under every tree (cast away from the moon), bush and creature. canopyShadow: a dappled shadow from the canopy overhead (height in metres), thinner in clearings, drifting with the wind. mist: a low drifting mist (height in metres above the ground). Each has on and strength.",Z0={on:!0,strength:.7},$0={on:!0,strength:.45,height:8,cover:.55,wind:.6},J0={on:!0,strength:.12,height:3,wind:.8},Q0={on:!0,strength:.7,threshold:.55},j0={on:!0,where:"before",strength:3,band:.4,centre:.55},ep="Creatures grow more numerous and older with an area's distance from home (0 at the dancefloor, 1 at the map's edge): creaturesNear in the areas round home, creaturesFar at the edge (creatureCurve shapes the rise), youngShareFar of them young at the edge, and legendsFar legends from legendsFrom outward. Only creatures within creatureSimRadius metres of the witch move.",tp=2,np=20,ip=1.3,rp=.5,ap=2,sp=.55,op=110,lp=.6,cp="setPieceChance: the share of areas, among the types that have a set piece, that show theirs. Wall objects (an area type's edges: puddles, henges, hedges) stand where areas meet, one per wallSpacing metres with chance wallDensity; they do not block movement.",up=.25,hp=.35,dp={_readme:u0,_map:h0,mapAreas:d0,areaSize:f0,areaScale:p0,areaSizeVariance:g0,borderLayers:m0,_trees:M0,treeDensity:x0,clearingSize:_0,clearingFalloff:v0,bushDensity:b0,treeSpacingX:S0,treeSpacingZ:E0,crownHalfWidth:y0,crownHeight:w0,bushSpacing:A0,wallSpacing:T0,wallDensity:R0,_witch:C0,groundSpeed:L0,treetopSpeed:D0,acceleration:P0,riseTime:O0,descendTime:I0,groundHeight:N0,treetopHeight:F0,_camera:U0,camera:B0,_look:k0,pixelSize:z0,glowReach:H0,glowHeight:G0,spriteTilt:W0,artPixelsPerMetre:V0,viewMargin:Y0,haze:X0,_post:K0,_shadows:q0,shadows:Z0,canopyShadow:$0,mist:J0,bloom:Q0,tiltShift:j0,_creatures:ep,creaturesNear:tp,creaturesFar:np,creatureCurve:ip,youngShareFar:rp,legendsFar:ap,legendsFrom:sp,creatureSimRadius:op,creatureSpeed:lp,_setPieces:cp,setPieceChance:up,legendSpeed:hp},Ar=dp;class fp{keys=new Set;pressed=new Set;padPrev=[];touch={x:0,y:0,toggle:!1,zoom:0,debug:!1};onAny=null;constructor(e=window){e.addEventListener("keydown",t=>{if(t.repeat){this.isGameKey(t.code)&&t.preventDefault();return}this.keys.add(t.code),this.isGameKey(t.code)&&t.preventDefault(),this.onAny?.()||this.pressed.add(t.code)}),e.addEventListener("keyup",t=>this.keys.delete(t.code)),e.addEventListener("blur",()=>this.keys.clear())}isGameKey(e){return/^(Arrow|Space$|Key[WASDQE]$|Minus$|Equal$|NumpadAdd$|NumpadSubtract$|Backquote$)/.test(e)}clearPresses(){this.pressed.clear();const e=this.touch;e.toggle=!1,e.zoom=0,e.debug=!1}read(){const e=f=>this.keys.has(f)?1:0,t=f=>this.pressed.has(f);let i=e("KeyD")+e("ArrowRight")-e("KeyA")-e("ArrowLeft"),r=e("KeyS")+e("ArrowDown")-e("KeyW")-e("ArrowUp"),a=t("Space"),o=(t("KeyQ")||t("Minus")||t("NumpadSubtract")?1:0)-(t("KeyE")||t("Equal")||t("NumpadAdd")?1:0),l=t("Backquote");this.pressed.clear();const c=typeof navigator<"u"&&navigator.getGamepads?navigator.getGamepads():[];for(const f of c){if(!f)continue;const d=S=>!!f.buttons[S]?.pressed,g=f.buttons.some((S,R)=>S.pressed&&!this.padPrev[R])&&!!this.onAny?.(),x=S=>!g&&d(S)&&!this.padPrev[S];let M=f.axes[0]??0,m=f.axes[1]??0;const _=Math.hypot(M,m),y=.18;if(_<y)M=0,m=0;else{const S=(Math.min(1,_)-y)/(1-y)/_;M*=S,m*=S}M+=(d(15)?1:0)-(d(14)?1:0),m+=(d(13)?1:0)-(d(12)?1:0),i+=M,r+=m,x(0)&&(a=!0),(x(4)||x(6))&&(o+=1),(x(5)||x(7))&&(o-=1),x(8)&&(l=!0),this.padPrev=f.buttons.map(S=>S.pressed);break}const u=this.touch;i+=u.x,r+=u.y,u.toggle&&(a=!0),o+=u.zoom,u.debug&&(l=!0),u.toggle=!1,u.zoom=0,u.debug=!1;const h=Math.hypot(i,r);return h>1&&(i/=h,r/=h),{moveX:i,moveZ:r,toggleMode:a,zoom:Math.sign(o),debug:l}}}const zl="186",pp=0,bc=1,gp=2,_s=1,mp=2,_a=3,_r=0,Cn=1,Li=2,Fi=0,ya=1,Sc=2,Ec=3,yc=4,Mp=5,Hr=100,xp=101,_p=102,vp=103,bp=104,Sp=200,Ep=201,yp=202,wp=203,Zu=204,$u=205,Ap=206,Tp=207,Rp=208,Cp=209,Lp=210,Dp=211,Pp=212,Op=213,Ip=214,Bo=0,ko=1,zo=2,Ta=3,Ho=4,Go=5,Wo=6,Vo=7,Ju=0,Np=1,Fp=2,gi=0,Qu=1,ju=2,eh=3,th=4,nh=5,ih=6,rh=7,ah=300,vr=301,Jr=302,$s=303,Js=304,Bs=306,Yo=1e3,Di=1001,Xo=1002,tn=1003,Up=1004,Ga=1005,$t=1006,Qs=1007,fr=1008,On=1009,sh=1010,oh=1011,Ra=1012,Hl=1013,xi=1014,fi=1015,_i=1016,Gl=1017,Wl=1018,Ca=1020,lh=35902,ch=35899,uh=1021,hh=1022,Hn=1023,zi=1026,pr=1027,dh=1028,Vl=1029,br=1030,Yl=1031,Xl=1033,vs=33776,bs=33777,Ss=33778,Es=33779,Ko=35840,qo=35841,Zo=35842,$o=35843,Jo=36196,Qo=37492,jo=37496,el=37488,tl=37489,Rs=37490,nl=37491,il=37808,rl=37809,al=37810,sl=37811,ol=37812,ll=37813,cl=37814,ul=37815,hl=37816,dl=37817,fl=37818,pl=37819,gl=37820,ml=37821,Ml=36492,xl=36494,_l=36495,vl=36283,bl=36284,Cs=36285,Sl=36286,Bp=3200,wc=0,kp=1,Zn="",Bn="srgb",La="srgb-linear",Ls="linear",yt="srgb",js=7680,zp=519,Hp=512,Gp=513,Wp=514,Kl=515,Vp=516,Yp=517,ql=518,Xp=519,Kp=35044,fh=35048,Ac="300 es",pi=2e3,Ds=2001;function qp(n){for(let e=n.length-1;e>=0;--e)if(n[e]>=65535)return!0;return!1}function Ps(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function Zp(){const n=Ps("canvas");return n.style.display="block",n}const Tc={};function Rc(...n){const e="THREE."+n.shift();console.log(e,...n)}function ph(n){const e=n[0];if(typeof e=="string"&&e.startsWith("TSL:")){const t=n[1];t&&t.isStackTrace?n[0]+=" "+t.getLocation():n[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return n}function Ke(...n){n=ph(n);const e="THREE."+n.shift();{const t=n[0];t&&t.isStackTrace?console.warn(t.getError(e)):console.warn(e,...n)}}function pt(...n){n=ph(n);const e="THREE."+n.shift();{const t=n[0];t&&t.isStackTrace?console.error(t.getError(e)):console.error(e,...n)}}function qr(...n){const e=n.join(" ");e in Tc||(Tc[e]=!0,Ke(...n))}function $p(n,e,t){return new Promise(function(i,r){function a(){switch(n.clientWaitSync(e,n.SYNC_FLUSH_COMMANDS_BIT,0)){case n.WAIT_FAILED:r();break;case n.TIMEOUT_EXPIRED:setTimeout(a,t);break;default:i()}}setTimeout(a,t)})}const Jp={[Bo]:ko,[zo]:Wo,[Ho]:Vo,[Ta]:Go,[ko]:Bo,[Wo]:zo,[Vo]:Ho,[Go]:Ta};class Er{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(t)===-1&&i[e].push(t)}hasEventListener(e,t){const i=this._listeners;return i===void 0?!1:i[e]!==void 0&&i[e].indexOf(t)!==-1}removeEventListener(e,t){const i=this._listeners;if(i===void 0)return;const r=i[e];if(r!==void 0){const a=r.indexOf(t);a!==-1&&r.splice(a,1)}}dispatchEvent(e){const t=this._listeners;if(t===void 0)return;const i=t[e.type];if(i!==void 0){e.target=this;const r=i.slice(0);for(let a=0,o=r.length;a<o;a++)r[a].call(this,e);e.target=null}}}const pn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],eo=Math.PI/180,El=180/Math.PI;function Ia(){const n=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(pn[n&255]+pn[n>>8&255]+pn[n>>16&255]+pn[n>>24&255]+"-"+pn[e&255]+pn[e>>8&255]+"-"+pn[e>>16&15|64]+pn[e>>24&255]+"-"+pn[t&63|128]+pn[t>>8&255]+"-"+pn[t>>16&255]+pn[t>>24&255]+pn[i&255]+pn[i>>8&255]+pn[i>>16&255]+pn[i>>24&255]).toLowerCase()}function ct(n,e,t){return Math.max(e,Math.min(t,n))}function Qp(n,e){return(n%e+e)%e}function to(n,e,t){return(1-t)*n+t*e}function la(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:case Uint8ClampedArray:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function An(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:case Uint8ClampedArray:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}class Ze{static{Ze.prototype.isVector2=!0}constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("THREE.Vector2: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,i=this.y,r=e.elements;return this.x=r[0]*t+r[3]*i+r[6],this.y=r[1]*t+r[4]*i+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=ct(this.x,e.x,t.x),this.y=ct(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=ct(this.x,e,t),this.y=ct(this.y,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(ct(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(ct(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y;return t*t+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const i=Math.cos(t),r=Math.sin(t),a=this.x-e.x,o=this.y-e.y;return this.x=a*i-o*r+e.x,this.y=a*r+o*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class na{constructor(e=0,t=0,i=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=i,this._w=r}static slerpFlat(e,t,i,r,a,o,l){let c=i[r+0],u=i[r+1],h=i[r+2],f=i[r+3],d=a[o+0],p=a[o+1],g=a[o+2],x=a[o+3];if(f!==x||c!==d||u!==p||h!==g){let M=c*d+u*p+h*g+f*x;M<0&&(d=-d,p=-p,g=-g,x=-x,M=-M);let m=1-l;if(M<.9995){const _=Math.acos(M),y=Math.sin(_);m=Math.sin(m*_)/y,l=Math.sin(l*_)/y,c=c*m+d*l,u=u*m+p*l,h=h*m+g*l,f=f*m+x*l}else{c=c*m+d*l,u=u*m+p*l,h=h*m+g*l,f=f*m+x*l;const _=1/Math.sqrt(c*c+u*u+h*h+f*f);c*=_,u*=_,h*=_,f*=_}}e[t]=c,e[t+1]=u,e[t+2]=h,e[t+3]=f}static multiplyQuaternionsFlat(e,t,i,r,a,o){const l=i[r],c=i[r+1],u=i[r+2],h=i[r+3],f=a[o],d=a[o+1],p=a[o+2],g=a[o+3];return e[t]=l*g+h*f+c*p-u*d,e[t+1]=c*g+h*d+u*f-l*p,e[t+2]=u*g+h*p+l*d-c*f,e[t+3]=h*g-l*f-c*d-u*p,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,i,r){return this._x=e,this._y=t,this._z=i,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const i=e._x,r=e._y,a=e._z,o=e._order,l=Math.cos,c=Math.sin,u=l(i/2),h=l(r/2),f=l(a/2),d=c(i/2),p=c(r/2),g=c(a/2);switch(o){case"XYZ":this._x=d*h*f+u*p*g,this._y=u*p*f-d*h*g,this._z=u*h*g+d*p*f,this._w=u*h*f-d*p*g;break;case"YXZ":this._x=d*h*f+u*p*g,this._y=u*p*f-d*h*g,this._z=u*h*g-d*p*f,this._w=u*h*f+d*p*g;break;case"ZXY":this._x=d*h*f-u*p*g,this._y=u*p*f+d*h*g,this._z=u*h*g+d*p*f,this._w=u*h*f-d*p*g;break;case"ZYX":this._x=d*h*f-u*p*g,this._y=u*p*f+d*h*g,this._z=u*h*g-d*p*f,this._w=u*h*f+d*p*g;break;case"YZX":this._x=d*h*f+u*p*g,this._y=u*p*f+d*h*g,this._z=u*h*g-d*p*f,this._w=u*h*f-d*p*g;break;case"XZY":this._x=d*h*f-u*p*g,this._y=u*p*f-d*h*g,this._z=u*h*g+d*p*f,this._w=u*h*f+d*p*g;break;default:Ke("Quaternion: .setFromEuler() encountered an unknown order: "+o)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const i=t/2,r=Math.sin(i);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,i=t[0],r=t[4],a=t[8],o=t[1],l=t[5],c=t[9],u=t[2],h=t[6],f=t[10],d=i+l+f;if(d>0){const p=.5/Math.sqrt(d+1);this._w=.25/p,this._x=(h-c)*p,this._y=(a-u)*p,this._z=(o-r)*p}else if(i>l&&i>f){const p=2*Math.sqrt(1+i-l-f);this._w=(h-c)/p,this._x=.25*p,this._y=(r+o)/p,this._z=(a+u)/p}else if(l>f){const p=2*Math.sqrt(1+l-i-f);this._w=(a-u)/p,this._x=(r+o)/p,this._y=.25*p,this._z=(c+h)/p}else{const p=2*Math.sqrt(1+f-i-l);this._w=(o-r)/p,this._x=(a+u)/p,this._y=(c+h)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let i=e.dot(t)+1;return i<1e-8?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(ct(this.dot(e),-1,1)))}rotateTowards(e,t){const i=this.angleTo(e);if(i===0)return this;const r=Math.min(1,t/i);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const i=e._x,r=e._y,a=e._z,o=e._w,l=t._x,c=t._y,u=t._z,h=t._w;return this._x=i*h+o*l+r*u-a*c,this._y=r*h+o*c+a*l-i*u,this._z=a*h+o*u+i*c-r*l,this._w=o*h-i*l-r*c-a*u,this._onChangeCallback(),this}slerp(e,t){let i=e._x,r=e._y,a=e._z,o=e._w,l=this.dot(e);l<0&&(i=-i,r=-r,a=-a,o=-o,l=-l);let c=1-t;if(l<.9995){const u=Math.acos(l),h=Math.sin(u);c=Math.sin(c*u)/h,t=Math.sin(t*u)/h,this._x=this._x*c+i*t,this._y=this._y*c+r*t,this._z=this._z*c+a*t,this._w=this._w*c+o*t,this._onChangeCallback()}else this._x=this._x*c+i*t,this._y=this._y*c+r*t,this._z=this._z*c+a*t,this._w=this._w*c+o*t,this.normalize();return this}slerpQuaternions(e,t,i){return this.copy(e).slerp(t,i)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),i=Math.random(),r=Math.sqrt(1-i),a=Math.sqrt(i);return this.set(r*Math.sin(e),r*Math.cos(e),a*Math.sin(t),a*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class Y{static{Y.prototype.isVector3=!0}constructor(e=0,t=0,i=0){this.x=e,this.y=t,this.z=i}set(e,t,i){return i===void 0&&(i=this.z),this.x=e,this.y=t,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("THREE.Vector3: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Cc.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Cc.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,i=this.y,r=this.z,a=e.elements;return this.x=a[0]*t+a[3]*i+a[6]*r,this.y=a[1]*t+a[4]*i+a[7]*r,this.z=a[2]*t+a[5]*i+a[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,i=this.y,r=this.z,a=e.elements,o=1/(a[3]*t+a[7]*i+a[11]*r+a[15]);return this.x=(a[0]*t+a[4]*i+a[8]*r+a[12])*o,this.y=(a[1]*t+a[5]*i+a[9]*r+a[13])*o,this.z=(a[2]*t+a[6]*i+a[10]*r+a[14])*o,this}applyQuaternion(e){const t=this.x,i=this.y,r=this.z,a=e.x,o=e.y,l=e.z,c=e.w,u=2*(o*r-l*i),h=2*(l*t-a*r),f=2*(a*i-o*t);return this.x=t+c*u+o*f-l*h,this.y=i+c*h+l*u-a*f,this.z=r+c*f+a*h-o*u,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,i=this.y,r=this.z,a=e.elements;return this.x=a[0]*t+a[4]*i+a[8]*r,this.y=a[1]*t+a[5]*i+a[9]*r,this.z=a[2]*t+a[6]*i+a[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=ct(this.x,e.x,t.x),this.y=ct(this.y,e.y,t.y),this.z=ct(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=ct(this.x,e,t),this.y=ct(this.y,e,t),this.z=ct(this.z,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(ct(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const i=e.x,r=e.y,a=e.z,o=t.x,l=t.y,c=t.z;return this.x=r*c-a*l,this.y=a*o-i*c,this.z=i*l-r*o,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const i=e.dot(this)/t;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return no.copy(this).projectOnVector(e),this.sub(no)}reflect(e){return this.sub(no.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(ct(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y,r=this.z-e.z;return t*t+i*i+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,i){const r=Math.sin(t)*e;return this.x=r*Math.sin(i),this.y=Math.cos(t)*e,this.z=r*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,i){return this.x=e*Math.sin(t),this.y=i,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=i,this.z=r,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,i=Math.sqrt(1-t*t);return this.x=i*Math.cos(e),this.y=t,this.z=i*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const no=new Y,Cc=new na;class qe{static{qe.prototype.isMatrix3=!0}constructor(e,t,i,r,a,o,l,c,u){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,i,r,a,o,l,c,u)}set(e,t,i,r,a,o,l,c,u){const h=this.elements;return h[0]=e,h[1]=r,h[2]=l,h[3]=t,h[4]=a,h[5]=c,h[6]=i,h[7]=o,h[8]=u,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],this}extractBasis(e,t,i){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,r=t.elements,a=this.elements,o=i[0],l=i[3],c=i[6],u=i[1],h=i[4],f=i[7],d=i[2],p=i[5],g=i[8],x=r[0],M=r[3],m=r[6],_=r[1],y=r[4],S=r[7],R=r[2],A=r[5],D=r[8];return a[0]=o*x+l*_+c*R,a[3]=o*M+l*y+c*A,a[6]=o*m+l*S+c*D,a[1]=u*x+h*_+f*R,a[4]=u*M+h*y+f*A,a[7]=u*m+h*S+f*D,a[2]=d*x+p*_+g*R,a[5]=d*M+p*y+g*A,a[8]=d*m+p*S+g*D,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[1],r=e[2],a=e[3],o=e[4],l=e[5],c=e[6],u=e[7],h=e[8];return t*o*h-t*l*u-i*a*h+i*l*c+r*a*u-r*o*c}invert(){const e=this.elements,t=e[0],i=e[1],r=e[2],a=e[3],o=e[4],l=e[5],c=e[6],u=e[7],h=e[8],f=h*o-l*u,d=l*c-h*a,p=u*a-o*c,g=t*f+i*d+r*p;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const x=1/g;return e[0]=f*x,e[1]=(r*u-h*i)*x,e[2]=(l*i-r*o)*x,e[3]=d*x,e[4]=(h*t-r*c)*x,e[5]=(r*a-l*t)*x,e[6]=p*x,e[7]=(i*c-u*t)*x,e[8]=(o*t-i*a)*x,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,i,r,a,o,l){const c=Math.cos(a),u=Math.sin(a);return this.set(i*c,i*u,-i*(c*o+u*l)+o+e,-r*u,r*c,-r*(-u*o+c*l)+l+t,0,0,1),this}scale(e,t){return qr("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(io.makeScale(e,t)),this}rotate(e){return qr("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(io.makeRotation(-e)),this}translate(e,t){return qr("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(io.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,i,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,i=e.elements;for(let r=0;r<9;r++)if(t[r]!==i[r])return!1;return!0}fromArray(e,t=0){for(let i=0;i<9;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const io=new qe,Lc=new qe().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Dc=new qe().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function jp(){const n={enabled:!0,workingColorSpace:La,spaces:{},convert:function(r,a,o){return this.enabled===!1||a===o||!a||!o||(this.spaces[a].transfer===yt&&(r.r=Ui(r.r),r.g=Ui(r.g),r.b=Ui(r.b)),this.spaces[a].primaries!==this.spaces[o].primaries&&(r.applyMatrix3(this.spaces[a].toXYZ),r.applyMatrix3(this.spaces[o].fromXYZ)),this.spaces[o].transfer===yt&&(r.r=Zr(r.r),r.g=Zr(r.g),r.b=Zr(r.b))),r},workingToColorSpace:function(r,a){return this.convert(r,this.workingColorSpace,a)},colorSpaceToWorking:function(r,a){return this.convert(r,a,this.workingColorSpace)},getPrimaries:function(r){return this.spaces[r].primaries},getTransfer:function(r){return r===Zn?Ls:this.spaces[r].transfer},getToneMappingMode:function(r){return this.spaces[r].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(r,a=this.workingColorSpace){return r.fromArray(this.spaces[a].luminanceCoefficients)},define:function(r){Object.assign(this.spaces,r)},_getMatrix:function(r,a,o){return r.copy(this.spaces[a].toXYZ).multiply(this.spaces[o].fromXYZ)},_getDrawingBufferColorSpace:function(r){return this.spaces[r].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(r=this.workingColorSpace){return this.spaces[r].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(r,a){return qr("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),n.workingToColorSpace(r,a)},toWorkingColorSpace:function(r,a){return qr("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),n.colorSpaceToWorking(r,a)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],i=[.3127,.329];return n.define({[La]:{primaries:e,whitePoint:i,transfer:Ls,toXYZ:Lc,fromXYZ:Dc,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:Bn},outputColorSpaceConfig:{drawingBufferColorSpace:Bn}},[Bn]:{primaries:e,whitePoint:i,transfer:yt,toXYZ:Lc,fromXYZ:Dc,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:Bn}}}),n}const lt=jp();function Ui(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function Zr(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}let Tr;class e1{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let i;if(e instanceof HTMLCanvasElement)i=e;else{Tr===void 0&&(Tr=Ps("canvas")),Tr.width=e.width,Tr.height=e.height;const r=Tr.getContext("2d");e instanceof ImageData?r.putImageData(e,0,0):r.drawImage(e,0,0,e.width,e.height),i=Tr}return i.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=Ps("canvas");t.width=e.width,t.height=e.height;const i=t.getContext("2d");i.drawImage(e,0,0,e.width,e.height);const r=i.getImageData(0,0,e.width,e.height),a=r.data;for(let o=0;o<a.length;o++)a[o]=Ui(a[o]/255)*255;return i.putImageData(r,0,0),t}else if(e.data){const t=e.data.slice(0);for(let i=0;i<t.length;i++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[i]=Math.floor(Ui(t[i]/255)*255):t[i]=Ui(t[i]);return{data:t,width:e.width,height:e.height}}else return Ke("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let t1=0;class Zl{constructor(e=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:t1++}),this.uuid=Ia(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<"u"&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const i={uuid:this.uuid,url:""},r=this.data;if(r!==null){let a;if(Array.isArray(r)){a=[];for(let o=0,l=r.length;o<l;o++)r[o].isDataTexture?a.push(ro(r[o].image)):a.push(ro(r[o]))}else a=ro(r);i.url=a}return t||(e.images[this.uuid]=i),i}}function ro(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?e1.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(Ke("Texture: Unable to serialize Texture."),{})}let n1=0;const ao=new Y;class yn extends Er{constructor(e=yn.DEFAULT_IMAGE,t=yn.DEFAULT_MAPPING,i=Di,r=Di,a=$t,o=fr,l=Hn,c=On,u=yn.DEFAULT_ANISOTROPY,h=Zn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:n1++}),this.uuid=Ia(),this.name="",this.source=new Zl(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=i,this.wrapT=r,this.magFilter=a,this.minFilter=o,this.anisotropy=u,this.format=l,this.internalFormat=null,this.type=c,this.offset=new Ze(0,0),this.repeat=new Ze(1,1),this.center=new Ze(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new qe,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(ao).x}get height(){return this.source.getSize(ao).y}get depth(){return this.source.getSize(ao).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const t in e){const i=e[t];if(i===void 0){Ke(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}const r=this[t];if(r===void 0){Ke(`Texture.setValues(): property '${t}' does not exist.`);continue}r&&i&&r.isVector2&&i.isVector2||r&&i&&r.isVector3&&i.isVector3||r&&i&&r.isMatrix3&&i.isMatrix3?r.copy(i):this[t]=i}}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const i={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),t||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==ah)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Yo:e.x=e.x-Math.floor(e.x);break;case Di:e.x=e.x<0?0:1;break;case Xo:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Yo:e.y=e.y-Math.floor(e.y);break;case Di:e.y=e.y<0?0:1;break;case Xo:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}yn.DEFAULT_IMAGE=null;yn.DEFAULT_MAPPING=ah;yn.DEFAULT_ANISOTROPY=1;class kt{static{kt.prototype.isVector4=!0}constructor(e=0,t=0,i=0,r=1){this.x=e,this.y=t,this.z=i,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,i,r){return this.x=e,this.y=t,this.z=i,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("THREE.Vector4: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,i=this.y,r=this.z,a=this.w,o=e.elements;return this.x=o[0]*t+o[4]*i+o[8]*r+o[12]*a,this.y=o[1]*t+o[5]*i+o[9]*r+o[13]*a,this.z=o[2]*t+o[6]*i+o[10]*r+o[14]*a,this.w=o[3]*t+o[7]*i+o[11]*r+o[15]*a,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,i,r,a;const c=e.elements,u=c[0],h=c[4],f=c[8],d=c[1],p=c[5],g=c[9],x=c[2],M=c[6],m=c[10];if(Math.abs(h-d)<.01&&Math.abs(f-x)<.01&&Math.abs(g-M)<.01){if(Math.abs(h+d)<.1&&Math.abs(f+x)<.1&&Math.abs(g+M)<.1&&Math.abs(u+p+m-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const y=(u+1)/2,S=(p+1)/2,R=(m+1)/2,A=(h+d)/4,D=(f+x)/4,b=(g+M)/4;return y>S&&y>R?y<.01?(i=0,r=.707106781,a=.707106781):(i=Math.sqrt(y),r=A/i,a=D/i):S>R?S<.01?(i=.707106781,r=0,a=.707106781):(r=Math.sqrt(S),i=A/r,a=b/r):R<.01?(i=.707106781,r=.707106781,a=0):(a=Math.sqrt(R),i=D/a,r=b/a),this.set(i,r,a,t),this}let _=Math.sqrt((M-g)*(M-g)+(f-x)*(f-x)+(d-h)*(d-h));return Math.abs(_)<.001&&(_=1),this.x=(M-g)/_,this.y=(f-x)/_,this.z=(d-h)/_,this.w=Math.acos((u+p+m-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=ct(this.x,e.x,t.x),this.y=ct(this.y,e.y,t.y),this.z=ct(this.z,e.z,t.z),this.w=ct(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=ct(this.x,e,t),this.y=ct(this.y,e,t),this.z=ct(this.z,e,t),this.w=ct(this.w,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(ct(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this.w=e.w+(t.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class i1 extends Er{constructor(e=1,t=1,i={}){super(),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:$t,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},i),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=i.depth,this.scissor=new kt(0,0,e,t),this.scissorTest=!1,this.viewport=new kt(0,0,e,t),this.textures=[];const r={width:e,height:t,depth:i.depth},a=new yn(r),o=i.count;for(let l=0;l<o;l++)this.textures[l]=a.clone(),this.textures[l].isRenderTargetTexture=!0,this.textures[l].renderTarget=this;this._setTextureOptions(i),this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveColorBuffer=i.resolveColorBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this.storeMultisampledColorBuffer=i.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=i.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=i.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=i.depthTexture,this.samples=i.samples,this.multiview=i.multiview,this.useArrayDepthTexture=i.useArrayDepthTexture}_setTextureOptions(e={}){const t={minFilter:$t,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let i=0;i<this.textures.length;i++)this.textures[i].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),e!==null&&e.renderTarget===null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,i=1){if(this.width!==e||this.height!==t||this.depth!==i){this.width=e,this.height=t,this.depth=i;for(let r=0,a=this.textures.length;r<a;r++)this.textures[r].image.width=e,this.textures[r].image.height=t,this.textures[r].image.depth=i,this.textures[r].isData3DTexture!==!0&&(this.textures[r].isArrayTexture=this.textures[r].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,i=e.textures.length;t<i;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;const r=Object.assign({},e.textures[t].image);this.textures[t].source=new Zl(r)}if(this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveColorBuffer=e.resolveColorBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,this.storeMultisampledColorBuffer=e.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=e.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=e.storeMultisampledStencilBuffer,e.depthTexture!==null)if(e.depthTexture.renderTarget===e){const t=e.depthTexture.clone();t.renderTarget=null,this.depthTexture=t}else this.depthTexture=e.depthTexture;return this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Gn extends i1{constructor(e=1,t=1,i={}){super(e,t,i),this.isWebGLRenderTarget=!0}}class gh extends yn{constructor(e=null,t=1,i=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:i,depth:r},this.magFilter=tn,this.minFilter=tn,this.wrapR=Di,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class r1 extends yn{constructor(e=null,t=1,i=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:i,depth:r},this.magFilter=tn,this.minFilter=tn,this.wrapR=Di,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}}class Kt{static{Kt.prototype.isMatrix4=!0}constructor(e,t,i,r,a,o,l,c,u,h,f,d,p,g,x,M){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,i,r,a,o,l,c,u,h,f,d,p,g,x,M)}set(e,t,i,r,a,o,l,c,u,h,f,d,p,g,x,M){const m=this.elements;return m[0]=e,m[4]=t,m[8]=i,m[12]=r,m[1]=a,m[5]=o,m[9]=l,m[13]=c,m[2]=u,m[6]=h,m[10]=f,m[14]=d,m[3]=p,m[7]=g,m[11]=x,m[15]=M,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Kt().fromArray(this.elements)}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],t[9]=i[9],t[10]=i[10],t[11]=i[11],t[12]=i[12],t[13]=i[13],t[14]=i[14],t[15]=i[15],this}copyPosition(e){const t=this.elements,i=e.elements;return t[12]=i[12],t[13]=i[13],t[14]=i[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,i){return this.determinantAffine()===0?(e.set(1,0,0),t.set(0,1,0),i.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this)}makeBasis(e,t,i){return this.set(e.x,t.x,i.x,0,e.y,t.y,i.y,0,e.z,t.z,i.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();const t=this.elements,i=e.elements,r=1/Rr.setFromMatrixColumn(e,0).length(),a=1/Rr.setFromMatrixColumn(e,1).length(),o=1/Rr.setFromMatrixColumn(e,2).length();return t[0]=i[0]*r,t[1]=i[1]*r,t[2]=i[2]*r,t[3]=0,t[4]=i[4]*a,t[5]=i[5]*a,t[6]=i[6]*a,t[7]=0,t[8]=i[8]*o,t[9]=i[9]*o,t[10]=i[10]*o,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,i=e.x,r=e.y,a=e.z,o=Math.cos(i),l=Math.sin(i),c=Math.cos(r),u=Math.sin(r),h=Math.cos(a),f=Math.sin(a);if(e.order==="XYZ"){const d=o*h,p=o*f,g=l*h,x=l*f;t[0]=c*h,t[4]=-c*f,t[8]=u,t[1]=p+g*u,t[5]=d-x*u,t[9]=-l*c,t[2]=x-d*u,t[6]=g+p*u,t[10]=o*c}else if(e.order==="YXZ"){const d=c*h,p=c*f,g=u*h,x=u*f;t[0]=d+x*l,t[4]=g*l-p,t[8]=o*u,t[1]=o*f,t[5]=o*h,t[9]=-l,t[2]=p*l-g,t[6]=x+d*l,t[10]=o*c}else if(e.order==="ZXY"){const d=c*h,p=c*f,g=u*h,x=u*f;t[0]=d-x*l,t[4]=-o*f,t[8]=g+p*l,t[1]=p+g*l,t[5]=o*h,t[9]=x-d*l,t[2]=-o*u,t[6]=l,t[10]=o*c}else if(e.order==="ZYX"){const d=o*h,p=o*f,g=l*h,x=l*f;t[0]=c*h,t[4]=g*u-p,t[8]=d*u+x,t[1]=c*f,t[5]=x*u+d,t[9]=p*u-g,t[2]=-u,t[6]=l*c,t[10]=o*c}else if(e.order==="YZX"){const d=o*c,p=o*u,g=l*c,x=l*u;t[0]=c*h,t[4]=x-d*f,t[8]=g*f+p,t[1]=f,t[5]=o*h,t[9]=-l*h,t[2]=-u*h,t[6]=p*f+g,t[10]=d-x*f}else if(e.order==="XZY"){const d=o*c,p=o*u,g=l*c,x=l*u;t[0]=c*h,t[4]=-f,t[8]=u*h,t[1]=d*f+x,t[5]=o*h,t[9]=p*f-g,t[2]=g*f-p,t[6]=l*h,t[10]=x*f+d}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(a1,e,s1)}lookAt(e,t,i){const r=this.elements;return Ln.subVectors(e,t),Ln.lengthSq()===0&&(Ln.z=1),Ln.normalize(),Ki.crossVectors(i,Ln),Ki.lengthSq()===0&&(Math.abs(i.z)===1?Ln.x+=1e-4:Ln.z+=1e-4,Ln.normalize(),Ki.crossVectors(i,Ln)),Ki.normalize(),Wa.crossVectors(Ln,Ki),r[0]=Ki.x,r[4]=Wa.x,r[8]=Ln.x,r[1]=Ki.y,r[5]=Wa.y,r[9]=Ln.y,r[2]=Ki.z,r[6]=Wa.z,r[10]=Ln.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,r=t.elements,a=this.elements,o=i[0],l=i[4],c=i[8],u=i[12],h=i[1],f=i[5],d=i[9],p=i[13],g=i[2],x=i[6],M=i[10],m=i[14],_=i[3],y=i[7],S=i[11],R=i[15],A=r[0],D=r[4],b=r[8],w=r[12],L=r[1],C=r[5],I=r[9],N=r[13],O=r[2],B=r[6],W=r[10],$=r[14],ae=r[3],q=r[7],ee=r[11],F=r[15];return a[0]=o*A+l*L+c*O+u*ae,a[4]=o*D+l*C+c*B+u*q,a[8]=o*b+l*I+c*W+u*ee,a[12]=o*w+l*N+c*$+u*F,a[1]=h*A+f*L+d*O+p*ae,a[5]=h*D+f*C+d*B+p*q,a[9]=h*b+f*I+d*W+p*ee,a[13]=h*w+f*N+d*$+p*F,a[2]=g*A+x*L+M*O+m*ae,a[6]=g*D+x*C+M*B+m*q,a[10]=g*b+x*I+M*W+m*ee,a[14]=g*w+x*N+M*$+m*F,a[3]=_*A+y*L+S*O+R*ae,a[7]=_*D+y*C+S*B+R*q,a[11]=_*b+y*I+S*W+R*ee,a[15]=_*w+y*N+S*$+R*F,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[4],r=e[8],a=e[12],o=e[1],l=e[5],c=e[9],u=e[13],h=e[2],f=e[6],d=e[10],p=e[14],g=e[3],x=e[7],M=e[11],m=e[15],_=c*p-u*d,y=l*p-u*f,S=l*d-c*f,R=o*p-u*h,A=o*d-c*h,D=o*f-l*h;return t*(x*_-M*y+m*S)-i*(g*_-M*R+m*A)+r*(g*y-x*R+m*D)-a*(g*S-x*A+M*D)}determinantAffine(){const e=this.elements,t=e[0],i=e[4],r=e[8],a=e[1],o=e[5],l=e[9],c=e[2],u=e[6],h=e[10];return t*(o*h-l*u)-i*(a*h-l*c)+r*(a*u-o*c)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,i){const r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=i),this}invert(){const e=this.elements,t=e[0],i=e[1],r=e[2],a=e[3],o=e[4],l=e[5],c=e[6],u=e[7],h=e[8],f=e[9],d=e[10],p=e[11],g=e[12],x=e[13],M=e[14],m=e[15],_=t*l-i*o,y=t*c-r*o,S=t*u-a*o,R=i*c-r*l,A=i*u-a*l,D=r*u-a*c,b=h*x-f*g,w=h*M-d*g,L=h*m-p*g,C=f*M-d*x,I=f*m-p*x,N=d*m-p*M,O=_*N-y*I+S*C+R*L-A*w+D*b;if(O===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const B=1/O;return e[0]=(l*N-c*I+u*C)*B,e[1]=(r*I-i*N-a*C)*B,e[2]=(x*D-M*A+m*R)*B,e[3]=(d*A-f*D-p*R)*B,e[4]=(c*L-o*N-u*w)*B,e[5]=(t*N-r*L+a*w)*B,e[6]=(M*S-g*D-m*y)*B,e[7]=(h*D-d*S+p*y)*B,e[8]=(o*I-l*L+u*b)*B,e[9]=(i*L-t*I-a*b)*B,e[10]=(g*A-x*S+m*_)*B,e[11]=(f*S-h*A-p*_)*B,e[12]=(l*w-o*C-c*b)*B,e[13]=(t*C-i*w+r*b)*B,e[14]=(x*y-g*R-M*_)*B,e[15]=(h*R-f*y+d*_)*B,this}scale(e){const t=this.elements,i=e.x,r=e.y,a=e.z;return t[0]*=i,t[4]*=r,t[8]*=a,t[1]*=i,t[5]*=r,t[9]*=a,t[2]*=i,t[6]*=r,t[10]*=a,t[3]*=i,t[7]*=r,t[11]*=a,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,i,r))}makeTranslation(e,t,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,i,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,t,-i,0,0,i,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,0,i,0,0,1,0,0,-i,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,0,i,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const i=Math.cos(t),r=Math.sin(t),a=1-i,o=e.x,l=e.y,c=e.z,u=a*o,h=a*l;return this.set(u*o+i,u*l-r*c,u*c+r*l,0,u*l+r*c,h*l+i,h*c-r*o,0,u*c-r*l,h*c+r*o,a*c*c+i,0,0,0,0,1),this}makeScale(e,t,i){return this.set(e,0,0,0,0,t,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,t,i,r,a,o){return this.set(1,i,a,0,e,1,o,0,t,r,1,0,0,0,0,1),this}compose(e,t,i){const r=this.elements,a=t._x,o=t._y,l=t._z,c=t._w,u=a+a,h=o+o,f=l+l,d=a*u,p=a*h,g=a*f,x=o*h,M=o*f,m=l*f,_=c*u,y=c*h,S=c*f,R=i.x,A=i.y,D=i.z;return r[0]=(1-(x+m))*R,r[1]=(p+S)*R,r[2]=(g-y)*R,r[3]=0,r[4]=(p-S)*A,r[5]=(1-(d+m))*A,r[6]=(M+_)*A,r[7]=0,r[8]=(g+y)*D,r[9]=(M-_)*D,r[10]=(1-(d+x))*D,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,i){const r=this.elements;e.x=r[12],e.y=r[13],e.z=r[14];const a=this.determinantAffine();if(a===0)return i.set(1,1,1),t.identity(),this;let o=Rr.set(r[0],r[1],r[2]).length();const l=Rr.set(r[4],r[5],r[6]).length(),c=Rr.set(r[8],r[9],r[10]).length();a<0&&(o=-o),Yn.copy(this);const u=1/o,h=1/l,f=1/c;return Yn.elements[0]*=u,Yn.elements[1]*=u,Yn.elements[2]*=u,Yn.elements[4]*=h,Yn.elements[5]*=h,Yn.elements[6]*=h,Yn.elements[8]*=f,Yn.elements[9]*=f,Yn.elements[10]*=f,t.setFromRotationMatrix(Yn),i.x=o,i.y=l,i.z=c,this}makePerspective(e,t,i,r,a,o,l=pi,c=!1){const u=this.elements,h=2*a/(t-e),f=2*a/(i-r),d=(t+e)/(t-e),p=(i+r)/(i-r);let g,x;if(c)g=a/(o-a),x=o*a/(o-a);else if(l===pi)g=-(o+a)/(o-a),x=-2*o*a/(o-a);else if(l===Ds)g=-o/(o-a),x=-o*a/(o-a);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+l);return u[0]=h,u[4]=0,u[8]=d,u[12]=0,u[1]=0,u[5]=f,u[9]=p,u[13]=0,u[2]=0,u[6]=0,u[10]=g,u[14]=x,u[3]=0,u[7]=0,u[11]=-1,u[15]=0,this}makeOrthographic(e,t,i,r,a,o,l=pi,c=!1){const u=this.elements,h=2/(t-e),f=2/(i-r),d=-(t+e)/(t-e),p=-(i+r)/(i-r);let g,x;if(c)g=1/(o-a),x=o/(o-a);else if(l===pi)g=-2/(o-a),x=-(o+a)/(o-a);else if(l===Ds)g=-1/(o-a),x=-a/(o-a);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+l);return u[0]=h,u[4]=0,u[8]=0,u[12]=d,u[1]=0,u[5]=f,u[9]=0,u[13]=p,u[2]=0,u[6]=0,u[10]=g,u[14]=x,u[3]=0,u[7]=0,u[11]=0,u[15]=1,this}equals(e){const t=this.elements,i=e.elements;for(let r=0;r<16;r++)if(t[r]!==i[r])return!1;return!0}fromArray(e,t=0){for(let i=0;i<16;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e[t+9]=i[9],e[t+10]=i[10],e[t+11]=i[11],e[t+12]=i[12],e[t+13]=i[13],e[t+14]=i[14],e[t+15]=i[15],e}}const Rr=new Y,Yn=new Kt,a1=new Y(0,0,0),s1=new Y(1,1,1),Ki=new Y,Wa=new Y,Ln=new Y,Pc=new Kt,Oc=new na;class Sr{constructor(e=0,t=0,i=0,r=Sr.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=i,this._order=r}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,i,r=this._order){return this._x=e,this._y=t,this._z=i,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,i=!0){const r=e.elements,a=r[0],o=r[4],l=r[8],c=r[1],u=r[5],h=r[9],f=r[2],d=r[6],p=r[10];switch(t){case"XYZ":this._y=Math.asin(ct(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,p),this._z=Math.atan2(-o,a)):(this._x=Math.atan2(d,u),this._z=0);break;case"YXZ":this._x=Math.asin(-ct(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(l,p),this._z=Math.atan2(c,u)):(this._y=Math.atan2(-f,a),this._z=0);break;case"ZXY":this._x=Math.asin(ct(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-f,p),this._z=Math.atan2(-o,u)):(this._y=0,this._z=Math.atan2(c,a));break;case"ZYX":this._y=Math.asin(-ct(f,-1,1)),Math.abs(f)<.9999999?(this._x=Math.atan2(d,p),this._z=Math.atan2(c,a)):(this._x=0,this._z=Math.atan2(-o,u));break;case"YZX":this._z=Math.asin(ct(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-h,u),this._y=Math.atan2(-f,a)):(this._x=0,this._y=Math.atan2(l,p));break;case"XZY":this._z=Math.asin(-ct(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(d,u),this._y=Math.atan2(l,a)):(this._x=Math.atan2(-h,p),this._y=0);break;default:Ke("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,i){return Pc.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Pc,t,i)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Oc.setFromEuler(this),this.setFromQuaternion(Oc,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Sr.DEFAULT_ORDER="XYZ";class mh{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let o1=0;const Ic=new Y,Cr=new na,yi=new Kt,Va=new Y,ca=new Y,l1=new Y,c1=new na,Nc=new Y(1,0,0),Fc=new Y(0,1,0),Uc=new Y(0,0,1),Bc={type:"added"},u1={type:"removed"},Lr={type:"childadded",child:null},so={type:"childremoved",child:null};class In extends Er{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:o1++}),this.uuid=Ia(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=In.DEFAULT_UP.clone();const e=new Y,t=new Sr,i=new na,r=new Y(1,1,1);function a(){i.setFromEuler(t,!1)}function o(){t.setFromQuaternion(i,void 0,!1)}t._onChange(a),i._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new Kt},normalMatrix:{value:new qe}}),this.matrix=new Kt,this.matrixWorld=new Kt,this.matrixAutoUpdate=In.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=In.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new mh,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Cr.setFromAxisAngle(e,t),this.quaternion.multiply(Cr),this}rotateOnWorldAxis(e,t){return Cr.setFromAxisAngle(e,t),this.quaternion.premultiply(Cr),this}rotateX(e){return this.rotateOnAxis(Nc,e)}rotateY(e){return this.rotateOnAxis(Fc,e)}rotateZ(e){return this.rotateOnAxis(Uc,e)}translateOnAxis(e,t){return Ic.copy(e).applyQuaternion(this.quaternion),this.position.add(Ic.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Nc,e)}translateY(e){return this.translateOnAxis(Fc,e)}translateZ(e){return this.translateOnAxis(Uc,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(yi.copy(this.matrixWorld).invert())}lookAt(e,t,i){e.isVector3?Va.copy(e):Va.set(e,t,i);const r=this.parent;this.updateWorldMatrix(!0,!1),ca.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?yi.lookAt(ca,Va,this.up):yi.lookAt(Va,ca,this.up),this.quaternion.setFromRotationMatrix(yi),r&&(yi.extractRotation(r.matrixWorld),Cr.setFromRotationMatrix(yi),this.quaternion.premultiply(Cr.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(pt("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Bc),Lr.child=e,this.dispatchEvent(Lr),Lr.child=null):pt("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(u1),so.child=e,this.dispatchEvent(so),so.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),yi.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),yi.multiply(e.parent.matrixWorld)),e.applyMatrix4(yi),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Bc),Lr.child=e,this.dispatchEvent(Lr),Lr.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let i=0,r=this.children.length;i<r;i++){const o=this.children[i].getObjectByProperty(e,t);if(o!==void 0)return o}}getObjectsByProperty(e,t,i=[]){this[e]===t&&i.push(this);const r=this.children;for(let a=0,o=r.length;a<o;a++)r[a].getObjectsByProperty(e,t,i);return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ca,e,l1),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ca,c1,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}intersectsFrustum(){}traverse(e){e(this);const t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);const e=this.pivot;if(e!==null){const t=e.x,i=e.y,r=e.z,a=this.matrix.elements;a[12]+=t-a[0]*t-a[4]*i-a[8]*r,a[13]+=i-a[1]*t-a[5]*i-a[9]*r,a[14]+=r-a[2]*t-a[6]*i-a[10]*r}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].updateMatrixWorld(e)}updateWorldMatrix(e,t,i=!1){const r=this.parent;if(e===!0&&r!==null&&r.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||i)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,i=!0),t===!0){const a=this.children;for(let o=0,l=a.length;o<l;o++)a[o].updateWorldMatrix(!1,!0,i)}}toJSON(e){const t=e===void 0||typeof e=="string",i={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const r={};r.uuid=this.uuid,r.type=this.type,r.name=this.name,r.castShadow=this.castShadow,r.receiveShadow=this.receiveShadow,r.visible=this.visible,r.frustumCulled=this.frustumCulled,r.renderOrder=this.renderOrder,r.static=this.static,r.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.pivot!==null&&(r.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(r.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(r.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.geometryInfo=this._geometryInfo.map(l=>({...l,boundingBox:l.boundingBox?l.boundingBox.toJSON():void 0,boundingSphere:l.boundingSphere?l.boundingSphere.toJSON():void 0})),r.instanceInfo=this._instanceInfo.map(l=>({...l})),r.availableInstanceIds=this._availableInstanceIds.slice(),r.availableGeometryIds=this._availableGeometryIds.slice(),r.nextIndexStart=this._nextIndexStart,r.nextVertexStart=this._nextVertexStart,r.geometryCount=this._geometryCount,r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.matricesTexture=this._matricesTexture.toJSON(e),r.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(r.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(r.boundingBox=this.boundingBox.toJSON()));function a(l,c){return l[c.uuid]===void 0&&(l[c.uuid]=c.toJSON(e)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=a(e.geometries,this.geometry);const l=this.geometry.parameters;if(l!==void 0&&l.shapes!==void 0){const c=l.shapes;if(Array.isArray(c))for(let u=0,h=c.length;u<h;u++){const f=c[u];a(e.shapes,f)}else a(e.shapes,c)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(a(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const l=[];for(let c=0,u=this.material.length;c<u;c++)l.push(a(e.materials,this.material[c]));r.material=l}else r.material=a(e.materials,this.material);if(this.children.length>0){r.children=[];for(let l=0;l<this.children.length;l++)r.children.push(this.children[l].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let l=0;l<this.animations.length;l++){const c=this.animations[l];r.animations.push(a(e.animations,c))}}if(t){const l=o(e.geometries),c=o(e.materials),u=o(e.textures),h=o(e.images),f=o(e.shapes),d=o(e.skeletons),p=o(e.animations),g=o(e.nodes);l.length>0&&(i.geometries=l),c.length>0&&(i.materials=c),u.length>0&&(i.textures=u),h.length>0&&(i.images=h),f.length>0&&(i.shapes=f),d.length>0&&(i.skeletons=d),p.length>0&&(i.animations=p),g.length>0&&(i.nodes=g)}return i.object=r,i;function o(l){const c=[];for(const u in l){const h=l[u];delete h.metadata,c.push(h)}return c}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot!==null?e.pivot.clone():null,this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let i=0;i<e.children.length;i++){const r=e.children[i];this.add(r.clone())}return this}dispose(){this.dispatchEvent({type:"dispose"})}}In.DEFAULT_UP=new Y(0,1,0);In.DEFAULT_MATRIX_AUTO_UPDATE=!0;In.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class Ya extends In{constructor(){super(),this.isGroup=!0,this.type="Group"}}const h1={type:"move"};class oo{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Ya,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Ya,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new Y,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new Y),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Ya,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new Y,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new Y,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const i of e.hand.values())this._getHandJoint(t,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,i){let r=null,a=null,o=null;const l=this._targetRay,c=this._grip,u=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(u&&e.hand){o=!0;for(const x of e.hand.values()){const M=t.getJointPose(x,i),m=this._getHandJoint(u,x);M!==null&&(m.matrix.fromArray(M.transform.matrix),m.matrix.decompose(m.position,m.rotation,m.scale),m.matrixWorldNeedsUpdate=!0,m.jointRadius=M.radius),m.visible=M!==null}const h=u.joints["index-finger-tip"],f=u.joints["thumb-tip"],d=h.position.distanceTo(f.position),p=.02,g=.005;u.inputState.pinching&&d>p+g?(u.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!u.inputState.pinching&&d<=p-g&&(u.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else c!==null&&e.gripSpace&&(a=t.getPose(e.gripSpace,i),a!==null&&(c.matrix.fromArray(a.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,a.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(a.linearVelocity)):c.hasLinearVelocity=!1,a.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(a.angularVelocity)):c.hasAngularVelocity=!1,c.eventsEnabled&&c.dispatchEvent({type:"gripUpdated",data:e,target:this})));l!==null&&(r=t.getPose(e.targetRaySpace,i),r===null&&a!==null&&(r=a),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1,this.dispatchEvent(h1)))}return l!==null&&(l.visible=r!==null),c!==null&&(c.visible=a!==null),u!==null&&(u.visible=o!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const i=new Ya;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[t.jointName]=i,e.add(i)}return e.joints[t.jointName]}}const Mh={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},qi={h:0,s:0,l:0},Xa={h:0,s:0,l:0};function lo(n,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?n+(e-n)*6*t:t<1/2?e:t<2/3?n+(e-n)*6*(2/3-t):n}class Mt{constructor(e,t,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,i)}set(e,t,i){if(t===void 0&&i===void 0){const r=e;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(e,t,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Bn){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,lt.colorSpaceToWorking(this,t),this}setRGB(e,t,i,r=lt.workingColorSpace){return this.r=e,this.g=t,this.b=i,lt.colorSpaceToWorking(this,r),this}setHSL(e,t,i,r=lt.workingColorSpace){if(e=Qp(e,1),t=ct(t,0,1),i=ct(i,0,1),t===0)this.r=this.g=this.b=i;else{const a=i<=.5?i*(1+t):i+t-i*t,o=2*i-a;this.r=lo(o,a,e+1/3),this.g=lo(o,a,e),this.b=lo(o,a,e-1/3)}return lt.colorSpaceToWorking(this,r),this}setStyle(e,t=Bn){function i(a){a!==void 0&&parseFloat(a)<1&&Ke("Color: Alpha component of "+e+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let a;const o=r[1],l=r[2];switch(o){case"rgb":case"rgba":if(a=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(l))return i(a[4]),this.setRGB(Math.min(255,parseInt(a[1],10))/255,Math.min(255,parseInt(a[2],10))/255,Math.min(255,parseInt(a[3],10))/255,t);if(a=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(l))return i(a[4]),this.setRGB(Math.min(100,parseInt(a[1],10))/100,Math.min(100,parseInt(a[2],10))/100,Math.min(100,parseInt(a[3],10))/100,t);break;case"hsl":case"hsla":if(a=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(l))return i(a[4]),this.setHSL(parseFloat(a[1])/360,parseFloat(a[2])/100,parseFloat(a[3])/100,t);break;default:Ke("Color: Unknown color model "+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){const a=r[1],o=a.length;if(o===3)return this.setRGB(parseInt(a.charAt(0),16)/15,parseInt(a.charAt(1),16)/15,parseInt(a.charAt(2),16)/15,t);if(o===6)return this.setHex(parseInt(a,16),t);Ke("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Bn){const i=Mh[e.toLowerCase()];return i!==void 0?this.setHex(i,t):Ke("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Ui(e.r),this.g=Ui(e.g),this.b=Ui(e.b),this}copyLinearToSRGB(e){return this.r=Zr(e.r),this.g=Zr(e.g),this.b=Zr(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Bn){return lt.workingToColorSpace(gn.copy(this),e),Math.round(ct(gn.r*255,0,255))*65536+Math.round(ct(gn.g*255,0,255))*256+Math.round(ct(gn.b*255,0,255))}getHexString(e=Bn){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=lt.workingColorSpace){lt.workingToColorSpace(gn.copy(this),t);const i=gn.r,r=gn.g,a=gn.b,o=Math.max(i,r,a),l=Math.min(i,r,a);let c,u;const h=(l+o)/2;if(l===o)c=0,u=0;else{const f=o-l;switch(u=h<=.5?f/(o+l):f/(2-o-l),o){case i:c=(r-a)/f+(r<a?6:0);break;case r:c=(a-i)/f+2;break;case a:c=(i-r)/f+4;break}c/=6}return e.h=c,e.s=u,e.l=h,e}getRGB(e,t=lt.workingColorSpace){return lt.workingToColorSpace(gn.copy(this),t),e.r=gn.r,e.g=gn.g,e.b=gn.b,e}getStyle(e=Bn){lt.workingToColorSpace(gn.copy(this),e);const t=gn.r,i=gn.g,r=gn.b;return e!==Bn?`color(${e} ${t.toFixed(3)} ${i.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(i*255)},${Math.round(r*255)})`}offsetHSL(e,t,i){return this.getHSL(qi),this.setHSL(qi.h+e,qi.s+t,qi.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,i){return this.r=e.r+(t.r-e.r)*i,this.g=e.g+(t.g-e.g)*i,this.b=e.b+(t.b-e.b)*i,this}lerpHSL(e,t){this.getHSL(qi),e.getHSL(Xa);const i=to(qi.h,Xa.h,t),r=to(qi.s,Xa.s,t),a=to(qi.l,Xa.l,t);return this.setHSL(i,r,a),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,i=this.g,r=this.b,a=e.elements;return this.r=a[0]*t+a[3]*i+a[6]*r,this.g=a[1]*t+a[4]*i+a[7]*r,this.b=a[2]*t+a[5]*i+a[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const gn=new Mt;Mt.NAMES=Mh;class d1 extends In{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Sr,this.environmentIntensity=1,this.environmentRotation=new Sr,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),t.object.backgroundBlurriness=this.backgroundBlurriness,t.object.backgroundIntensity=this.backgroundIntensity,t.object.backgroundRotation=this.backgroundRotation.toArray(),t.object.environmentIntensity=this.environmentIntensity,t.object.environmentRotation=this.environmentRotation.toArray(),t}}const Xn=new Y,wi=new Y,co=new Y,Ai=new Y,Dr=new Y,Pr=new Y,kc=new Y,uo=new Y,ho=new Y,fo=new Y,po=new kt,go=new kt,mo=new kt;class $n{constructor(e=new Y,t=new Y,i=new Y){this.a=e,this.b=t,this.c=i}static getNormal(e,t,i,r){r.subVectors(i,t),Xn.subVectors(e,t),r.cross(Xn);const a=r.lengthSq();return a>0?r.multiplyScalar(1/Math.sqrt(a)):r.set(0,0,0)}static getBarycoord(e,t,i,r,a){Xn.subVectors(r,t),wi.subVectors(i,t),co.subVectors(e,t);const o=Xn.dot(Xn),l=Xn.dot(wi),c=Xn.dot(co),u=wi.dot(wi),h=wi.dot(co),f=o*u-l*l;if(f===0)return a.set(0,0,0),null;const d=1/f,p=(u*c-l*h)*d,g=(o*h-l*c)*d;return a.set(1-p-g,g,p)}static containsPoint(e,t,i,r){return this.getBarycoord(e,t,i,r,Ai)===null?!1:Ai.x>=0&&Ai.y>=0&&Ai.x+Ai.y<=1}static getInterpolation(e,t,i,r,a,o,l,c){return this.getBarycoord(e,t,i,r,Ai)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(a,Ai.x),c.addScaledVector(o,Ai.y),c.addScaledVector(l,Ai.z),c)}static getInterpolatedAttribute(e,t,i,r,a,o){return po.setScalar(0),go.setScalar(0),mo.setScalar(0),po.fromBufferAttribute(e,t),go.fromBufferAttribute(e,i),mo.fromBufferAttribute(e,r),o.setScalar(0),o.addScaledVector(po,a.x),o.addScaledVector(go,a.y),o.addScaledVector(mo,a.z),o}static isFrontFacing(e,t,i,r){return Xn.subVectors(i,t),wi.subVectors(e,t),Xn.cross(wi).dot(r)<0}set(e,t,i){return this.a.copy(e),this.b.copy(t),this.c.copy(i),this}setFromPointsAndIndices(e,t,i,r){return this.a.copy(e[t]),this.b.copy(e[i]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,t,i,r){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Xn.subVectors(this.c,this.b),wi.subVectors(this.a,this.b),Xn.cross(wi).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return $n.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return $n.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,i,r,a){return $n.getInterpolation(e,this.a,this.b,this.c,t,i,r,a)}containsPoint(e){return $n.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return $n.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const i=this.a,r=this.b,a=this.c;let o,l;Dr.subVectors(r,i),Pr.subVectors(a,i),uo.subVectors(e,i);const c=Dr.dot(uo),u=Pr.dot(uo);if(c<=0&&u<=0)return t.copy(i);ho.subVectors(e,r);const h=Dr.dot(ho),f=Pr.dot(ho);if(h>=0&&f<=h)return t.copy(r);const d=c*f-h*u;if(d<=0&&c>=0&&h<=0)return o=c/(c-h),t.copy(i).addScaledVector(Dr,o);fo.subVectors(e,a);const p=Dr.dot(fo),g=Pr.dot(fo);if(g>=0&&p<=g)return t.copy(a);const x=p*u-c*g;if(x<=0&&u>=0&&g<=0)return l=u/(u-g),t.copy(i).addScaledVector(Pr,l);const M=h*g-p*f;if(M<=0&&f-h>=0&&p-g>=0)return kc.subVectors(a,r),l=(f-h)/(f-h+(p-g)),t.copy(r).addScaledVector(kc,l);const m=1/(M+x+d);return o=x*m,l=d*m,t.copy(i).addScaledVector(Dr,o).addScaledVector(Pr,l)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}class ia{constructor(e=new Y(1/0,1/0,1/0),t=new Y(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t+=3)this.expandByPoint(Kn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,i=e.count;t<i;t++)this.expandByPoint(Kn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const i=Kn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const i=e.geometry;if(i!==void 0){const a=i.getAttribute("position");if(t===!0&&a!==void 0&&e.isInstancedMesh!==!0)for(let o=0,l=a.count;o<l;o++)e.isMesh===!0?e.getVertexPosition(o,Kn):Kn.fromBufferAttribute(a,o),Kn.applyMatrix4(e.matrixWorld),this.expandByPoint(Kn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Ka.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),Ka.copy(i.boundingBox)),Ka.applyMatrix4(e.matrixWorld),this.union(Ka)}const r=e.children;for(let a=0,o=r.length;a<o;a++)this.expandByObject(r[a],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Kn),Kn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,i;return e.normal.x>0?(t=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),t<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(ua),qa.subVectors(this.max,ua),Or.subVectors(e.a,ua),Ir.subVectors(e.b,ua),Nr.subVectors(e.c,ua),Zi.subVectors(Ir,Or),$i.subVectors(Nr,Ir),rr.subVectors(Or,Nr);let t=[0,-Zi.z,Zi.y,0,-$i.z,$i.y,0,-rr.z,rr.y,Zi.z,0,-Zi.x,$i.z,0,-$i.x,rr.z,0,-rr.x,-Zi.y,Zi.x,0,-$i.y,$i.x,0,-rr.y,rr.x,0];return!Mo(t,Or,Ir,Nr,qa)||(t=[1,0,0,0,1,0,0,0,1],!Mo(t,Or,Ir,Nr,qa))?!1:(Za.crossVectors(Zi,$i),t=[Za.x,Za.y,Za.z],Mo(t,Or,Ir,Nr,qa))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Kn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Kn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Ti[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Ti[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Ti[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Ti[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Ti[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Ti[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Ti[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Ti[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Ti),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const Ti=[new Y,new Y,new Y,new Y,new Y,new Y,new Y,new Y],Kn=new Y,Ka=new ia,Or=new Y,Ir=new Y,Nr=new Y,Zi=new Y,$i=new Y,rr=new Y,ua=new Y,qa=new Y,Za=new Y,ar=new Y;function Mo(n,e,t,i,r){for(let a=0,o=n.length-3;a<=o;a+=3){ar.fromArray(n,a);const l=r.x*Math.abs(ar.x)+r.y*Math.abs(ar.y)+r.z*Math.abs(ar.z),c=e.dot(ar),u=t.dot(ar),h=i.dot(ar);if(Math.max(-Math.max(c,u,h),Math.min(c,u,h))>l)return!1}return!0}const Qt=new Y,$a=new Ze;let f1=0;class mi extends Er{constructor(e,t,i=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:f1++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=i,this.usage=Kp,this.updateRanges=[],this.gpuType=fi,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,i){e*=this.itemSize,i*=t.itemSize;for(let r=0,a=this.itemSize;r<a;r++)this.array[e+r]=t.array[i+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,i=this.count;t<i;t++)$a.fromBufferAttribute(this,t),$a.applyMatrix3(e),this.setXY(t,$a.x,$a.y);else if(this.itemSize===3)for(let t=0,i=this.count;t<i;t++)Qt.fromBufferAttribute(this,t),Qt.applyMatrix3(e),this.setXYZ(t,Qt.x,Qt.y,Qt.z);return this}applyMatrix4(e){for(let t=0,i=this.count;t<i;t++)Qt.fromBufferAttribute(this,t),Qt.applyMatrix4(e),this.setXYZ(t,Qt.x,Qt.y,Qt.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)Qt.fromBufferAttribute(this,t),Qt.applyNormalMatrix(e),this.setXYZ(t,Qt.x,Qt.y,Qt.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)Qt.fromBufferAttribute(this,t),Qt.transformDirection(e),this.setXYZ(t,Qt.x,Qt.y,Qt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let i=this.array[e*this.itemSize+t];return this.normalized&&(i=la(i,this.array)),i}setComponent(e,t,i){return this.normalized&&(i=An(i,this.array)),this.array[e*this.itemSize+t]=i,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=la(t,this.array)),t}setX(e,t){return this.normalized&&(t=An(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=la(t,this.array)),t}setY(e,t){return this.normalized&&(t=An(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=la(t,this.array)),t}setZ(e,t){return this.normalized&&(t=An(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=la(t,this.array)),t}setW(e,t){return this.normalized&&(t=An(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,i){return e*=this.itemSize,this.normalized&&(t=An(t,this.array),i=An(i,this.array)),this.array[e+0]=t,this.array[e+1]=i,this}setXYZ(e,t,i,r){return e*=this.itemSize,this.normalized&&(t=An(t,this.array),i=An(i,this.array),r=An(r,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=r,this}setXYZW(e,t,i,r,a){return e*=this.itemSize,this.normalized&&(t=An(t,this.array),i=An(i,this.array),r=An(r,this.array),a=An(a,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=r,this.array[e+3]=a,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return e.name=this.name,e.usage=this.usage,e.gpuType=this.gpuType,e}dispose(){this.dispatchEvent({type:"dispose"})}}class xh extends mi{constructor(e,t,i){super(new Uint16Array(e),t,i)}}class _h extends mi{constructor(e,t,i){super(new Uint32Array(e),t,i)}}class Bi extends mi{constructor(e,t,i){super(new Float32Array(e),t,i)}}const p1=new ia,ha=new Y,xo=new Y;class $l{constructor(e=new Y,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const i=this.center;t!==void 0?i.copy(t):p1.setFromPoints(e).getCenter(i);let r=0;for(let a=0,o=e.length;a<o;a++)r=Math.max(r,i.distanceToSquared(e[a]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const i=this.center.distanceToSquared(e);return t.copy(e),i>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;ha.subVectors(e,this.center);const t=ha.lengthSq();if(t>this.radius*this.radius){const i=Math.sqrt(t),r=(i-this.radius)*.5;this.center.addScaledVector(ha,r/i),this.radius+=r}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(xo.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(ha.copy(e.center).add(xo)),this.expandByPoint(ha.copy(e.center).sub(xo))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}let g1=0;const Un=new Kt,_o=new In,Fr=new Y,Dn=new ia,da=new ia,sn=new Y;class vi extends Er{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:g1++}),this.uuid=Ia(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(qp(e)?_h:xh)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,i=0){this.groups.push({start:e,count:t,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const a=new qe().getNormalMatrix(e);i.applyNormalMatrix(a),i.needsUpdate=!0}const r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return Un.makeRotationFromQuaternion(e),this.applyMatrix4(Un),this}rotateX(e){return Un.makeRotationX(e),this.applyMatrix4(Un),this}rotateY(e){return Un.makeRotationY(e),this.applyMatrix4(Un),this}rotateZ(e){return Un.makeRotationZ(e),this.applyMatrix4(Un),this}translate(e,t,i){return Un.makeTranslation(e,t,i),this.applyMatrix4(Un),this}scale(e,t,i){return Un.makeScale(e,t,i),this.applyMatrix4(Un),this}lookAt(e){return _o.lookAt(e),_o.updateMatrix(),this.applyMatrix4(_o.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Fr).negate(),this.translate(Fr.x,Fr.y,Fr.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const i=[];for(let r=0,a=e.length;r<a;r++){const o=e[r];i.push(o.x,o.y,o.z||0)}this.setAttribute("position",new Bi(i,3))}else{const i=Math.min(e.length,t.count);for(let r=0;r<i;r++){const a=e[r];t.setXYZ(r,a.x,a.y,a.z||0)}e.length>t.count&&Ke("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new ia);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){pt("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new Y(-1/0,-1/0,-1/0),new Y(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let i=0,r=t.length;i<r;i++){const a=t[i];Dn.setFromBufferAttribute(a),this.morphTargetsRelative?(sn.addVectors(this.boundingBox.min,Dn.min),this.boundingBox.expandByPoint(sn),sn.addVectors(this.boundingBox.max,Dn.max),this.boundingBox.expandByPoint(sn)):(this.boundingBox.expandByPoint(Dn.min),this.boundingBox.expandByPoint(Dn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&pt('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new $l);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){pt("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new Y,1/0);return}if(e){const i=this.boundingSphere.center;if(Dn.setFromBufferAttribute(e),t)for(let a=0,o=t.length;a<o;a++){const l=t[a];da.setFromBufferAttribute(l),this.morphTargetsRelative?(sn.addVectors(Dn.min,da.min),Dn.expandByPoint(sn),sn.addVectors(Dn.max,da.max),Dn.expandByPoint(sn)):(Dn.expandByPoint(da.min),Dn.expandByPoint(da.max))}Dn.getCenter(i);let r=0;for(let a=0,o=e.count;a<o;a++)sn.fromBufferAttribute(e,a),r=Math.max(r,i.distanceToSquared(sn));if(t)for(let a=0,o=t.length;a<o;a++){const l=t[a],c=this.morphTargetsRelative;for(let u=0,h=l.count;u<h;u++)sn.fromBufferAttribute(l,u),c&&(Fr.fromBufferAttribute(e,u),sn.add(Fr)),r=Math.max(r,i.distanceToSquared(sn))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&pt('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){pt("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=t.position,r=t.normal,a=t.uv;let o=this.getAttribute("tangent");(o===void 0||o.count!==i.count)&&(o=new mi(new Float32Array(4*i.count),4),this.setAttribute("tangent",o));const l=[],c=[];for(let b=0;b<i.count;b++)l[b]=new Y,c[b]=new Y;const u=new Y,h=new Y,f=new Y,d=new Ze,p=new Ze,g=new Ze,x=new Y,M=new Y;function m(b,w,L){u.fromBufferAttribute(i,b),h.fromBufferAttribute(i,w),f.fromBufferAttribute(i,L),d.fromBufferAttribute(a,b),p.fromBufferAttribute(a,w),g.fromBufferAttribute(a,L),h.sub(u),f.sub(u),p.sub(d),g.sub(d);const C=1/(p.x*g.y-g.x*p.y);isFinite(C)&&(x.copy(h).multiplyScalar(g.y).addScaledVector(f,-p.y).multiplyScalar(C),M.copy(f).multiplyScalar(p.x).addScaledVector(h,-g.x).multiplyScalar(C),l[b].add(x),l[w].add(x),l[L].add(x),c[b].add(M),c[w].add(M),c[L].add(M))}let _=this.groups;_.length===0&&(_=[{start:0,count:e.count}]);for(let b=0,w=_.length;b<w;++b){const L=_[b],C=L.start,I=L.count;for(let N=C,O=C+I;N<O;N+=3)m(e.getX(N+0),e.getX(N+1),e.getX(N+2))}const y=new Y,S=new Y,R=new Y,A=new Y;function D(b){R.fromBufferAttribute(r,b),A.copy(R);const w=l[b];y.copy(w),y.sub(R.multiplyScalar(R.dot(w))).normalize(),S.crossVectors(A,w);const C=S.dot(c[b])<0?-1:1;o.setXYZW(b,y.x,y.y,y.z,C)}for(let b=0,w=_.length;b<w;++b){const L=_[b],C=L.start,I=L.count;for(let N=C,O=C+I;N<O;N+=3)D(e.getX(N+0)),D(e.getX(N+1)),D(e.getX(N+2))}this._transformed=!0}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let i=this.getAttribute("normal");if(i===void 0||i.count!==t.count)i=new mi(new Float32Array(t.count*3),3),this.setAttribute("normal",i);else for(let d=0,p=i.count;d<p;d++)i.setXYZ(d,0,0,0);const r=new Y,a=new Y,o=new Y,l=new Y,c=new Y,u=new Y,h=new Y,f=new Y;if(e)for(let d=0,p=e.count;d<p;d+=3){const g=e.getX(d+0),x=e.getX(d+1),M=e.getX(d+2);r.fromBufferAttribute(t,g),a.fromBufferAttribute(t,x),o.fromBufferAttribute(t,M),h.subVectors(o,a),f.subVectors(r,a),h.cross(f),l.fromBufferAttribute(i,g),c.fromBufferAttribute(i,x),u.fromBufferAttribute(i,M),l.add(h),c.add(h),u.add(h),i.setXYZ(g,l.x,l.y,l.z),i.setXYZ(x,c.x,c.y,c.z),i.setXYZ(M,u.x,u.y,u.z)}else for(let d=0,p=t.count;d<p;d+=3)r.fromBufferAttribute(t,d+0),a.fromBufferAttribute(t,d+1),o.fromBufferAttribute(t,d+2),h.subVectors(o,a),f.subVectors(r,a),h.cross(f),i.setXYZ(d+0,h.x,h.y,h.z),i.setXYZ(d+1,h.x,h.y,h.z),i.setXYZ(d+2,h.x,h.y,h.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,i=e.count;t<i;t++)sn.fromBufferAttribute(e,t),sn.normalize(),e.setXYZ(t,sn.x,sn.y,sn.z)}toNonIndexed(){function e(l,c){const u=l.array,h=l.itemSize,f=l.normalized,d=new u.constructor(c.length*h);let p=0,g=0;for(let x=0,M=c.length;x<M;x++){l.isInterleavedBufferAttribute?p=c[x]*l.data.stride+l.offset:p=c[x]*h;for(let m=0;m<h;m++)d[g++]=u[p++]}return new mi(d,h,f)}if(this.index===null)return Ke("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new vi,i=this.index.array,r=this.attributes;for(const l in r){const c=r[l],u=e(c,i);t.setAttribute(l,u)}const a=this.morphAttributes;for(const l in a){const c=[],u=a[l];for(let h=0,f=u.length;h<f;h++){const d=u[h],p=e(d,i);c.push(p)}t.morphAttributes[l]=c}t.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let l=0,c=o.length;l<c;l++){const u=o[l];t.addGroup(u.start,u.count,u.materialIndex)}return t}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,e.name=this.name,Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){const c=this.parameters;for(const u in c)c[u]!==void 0&&(e[u]=c[u]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const i=this.attributes;for(const c in i){const u=i[c];e.data.attributes[c]=u.toJSON(e.data)}const r={};let a=!1;for(const c in this.morphAttributes){const u=this.morphAttributes[c],h=[];for(let f=0,d=u.length;f<d;f++){const p=u[f];h.push(p.toJSON(e.data))}h.length>0&&(r[c]=h,a=!0)}a&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));const l=this.boundingSphere;return l!==null&&(e.data.boundingSphere=l.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const i=e.index;i!==null&&this.setIndex(i.clone());const r=e.attributes;for(const u in r){const h=r[u];this.setAttribute(u,h.clone(t))}const a=e.morphAttributes;for(const u in a){const h=[],f=a[u];for(let d=0,p=f.length;d<p;d++)h.push(f[d].clone(t));this.morphAttributes[u]=h}this.morphTargetsRelative=e.morphTargetsRelative;const o=e.groups;for(let u=0,h=o.length;u<h;u++){const f=o[u];this.addGroup(f.start,f.count,f.materialIndex)}const l=e.boundingBox;l!==null&&(this.boundingBox=l.clone());const c=e.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}}const vo=new Y,m1=new Y,M1=new qe;class Qi{constructor(e=new Y(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,i,r){return this.normal.set(e,t,i),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,i){const r=vo.subVectors(i,t).cross(m1.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,i=!0){const r=e.delta(vo),a=this.normal.dot(r);if(a===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const o=-(e.start.dot(this.normal)+this.constant)/a;return i===!0&&(o<0||o>1)?null:t.copy(e.start).addScaledVector(r,o)}intersectsLine(e){const t=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return t<0&&i>0||i<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const i=t||M1.getNormalMatrix(e),r=this.coplanarPoint(vo).applyMatrix4(e),a=this.normal.applyMatrix3(i).normalize();return this.constant=-r.dot(a),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(e){return this.normal.fromArray(e.normal),this.constant=e.constant,this}}let x1=0;class ks extends Er{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:x1++}),this.uuid=Ia(),this.name="",this.type="Material",this.blending=ya,this.side=_r,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Zu,this.blendDst=$u,this.blendEquation=Hr,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Mt(0,0,0),this.blendAlpha=0,this.depthFunc=Ta,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=zp,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=js,this.stencilZFail=js,this.stencilZPass=js,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const i=e[t];if(i===void 0){Ke(`Material: parameter '${t}' has value of undefined.`);continue}const r=this[t];if(r===void 0){Ke(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(i):r&&r.isVector2&&i&&i.isVector2||r&&r.isEuler&&i&&i.isEuler||r&&r.isVector3&&i&&i.isVector3?r.copy(i):this[t]=i}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const i={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,i.blending=this.blending,i.side=this.side,i.shadowSide=this.shadowSide,i.vertexColors=this.vertexColors,i.opacity=this.opacity,i.transparent=this.transparent,i.blendSrc=this.blendSrc,i.blendDst=this.blendDst,i.blendEquation=this.blendEquation,i.blendSrcAlpha=this.blendSrcAlpha,i.blendDstAlpha=this.blendDstAlpha,i.blendEquationAlpha=this.blendEquationAlpha,i.blendColor=this.blendColor.getHex(),i.blendAlpha=this.blendAlpha,i.depthFunc=this.depthFunc,i.depthTest=this.depthTest,i.depthWrite=this.depthWrite,i.colorWrite=this.colorWrite,i.clipIntersection=this.clipIntersection,i.clipShadows=this.clipShadows,i.stencilWriteMask=this.stencilWriteMask,i.stencilFunc=this.stencilFunc,i.stencilRef=this.stencilRef,i.stencilFuncMask=this.stencilFuncMask,i.stencilFail=this.stencilFail,i.stencilZFail=this.stencilZFail,i.stencilZPass=this.stencilZPass,i.stencilWrite=this.stencilWrite,i.polygonOffset=this.polygonOffset,i.polygonOffsetFactor=this.polygonOffsetFactor,i.polygonOffsetUnits=this.polygonOffsetUnits,i.dithering=this.dithering,i.alphaTest=this.alphaTest,i.alphaHash=this.alphaHash,i.alphaToCoverage=this.alphaToCoverage,i.premultipliedAlpha=this.premultipliedAlpha,i.forceSinglePass=this.forceSinglePass,i.allowOverride=this.allowOverride,i.visible=this.visible,i.toneMapped=this.toneMapped,i.name=this.name,this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(i.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(i.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(i.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(i.clippingPlanes=this.clippingPlanes.map(a=>a.toJSON())),this.rotation!==void 0&&(i.rotation=this.rotation),this.depthPacking!==void 0&&(i.depthPacking=this.depthPacking),this.linewidth!==void 0&&(i.linewidth=this.linewidth),this.linecap!==void 0&&(i.linecap=this.linecap),this.linejoin!==void 0&&(i.linejoin=this.linejoin),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.wireframe!==void 0&&(i.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(i.flatShading=this.flatShading),this.fog!==void 0&&(i.fog=this.fog),Object.keys(this.userData).length>0&&(i.userData=this.userData);function r(a){const o=[];for(const l in a){const c=a[l];delete c.metadata,o.push(c)}return o}if(t){const a=r(e.textures),o=r(e.images);a.length>0&&(i.textures=a),o.length>0&&(i.images=o)}return i}fromJSON(e,t){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new Mt().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.retroreflectivity!==void 0&&(this.retroreflectivity=e.retroreflectivity),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=e.iridescenceThicknessRange),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.clippingPlanes!==void 0&&(this.clippingPlanes=e.clippingPlanes.map(i=>new Qi().fromJSON(i))),e.clipIntersection!==void 0&&(this.clipIntersection=e.clipIntersection),e.clipShadows!==void 0&&(this.clipShadows=e.clipShadows),e.depthPacking!==void 0&&(this.depthPacking=e.depthPacking),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.linecap!==void 0&&(this.linecap=e.linecap),e.linejoin!==void 0&&(this.linejoin=e.linejoin),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(typeof e.vertexColors=="number"?this.vertexColors=e.vertexColors>0:this.vertexColors=e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=t[e.map]||null),e.matcap!==void 0&&(this.matcap=t[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=t[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=t[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=t[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let i=e.normalScale;Array.isArray(i)===!1&&(i=[i,i]),this.normalScale=new Ze().fromArray(i)}return e.displacementMap!==void 0&&(this.displacementMap=t[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=t[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=t[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=t[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=t[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=t[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=t[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=t[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=t[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=t[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=t[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=t[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=t[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=t[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new Ze().fromArray(e.clearcoatNormalScale)),e.iridescenceMap!==void 0&&(this.iridescenceMap=t[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=t[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=t[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=t[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=t[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=t[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=t[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let i=null;if(t!==null){const r=t.length;i=new Array(r);for(let a=0;a!==r;++a)i[a]=t[a].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}const Ri=new Y,bo=new Y,Ja=new Y,Qa=new Y;class _1{constructor(e=new Y,t=new Y(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Ri)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const i=t.dot(this.direction);return i<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=Ri.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Ri.copy(this.origin).addScaledVector(this.direction,t),Ri.distanceToSquared(e))}distanceSqToSegment(e,t,i,r){bo.copy(e).add(t).multiplyScalar(.5),Ja.copy(t).sub(e).normalize(),Qa.copy(this.origin).sub(bo);const a=e.distanceTo(t)*.5,o=-this.direction.dot(Ja),l=Qa.dot(this.direction),c=-Qa.dot(Ja),u=Qa.lengthSq(),h=Math.abs(1-o*o);let f,d,p,g;if(h>0)if(f=o*c-l,d=o*l-c,g=a*h,f>=0)if(d>=-g)if(d<=g){const x=1/h;f*=x,d*=x,p=f*(f+o*d+2*l)+d*(o*f+d+2*c)+u}else d=a,f=Math.max(0,-(o*d+l)),p=-f*f+d*(d+2*c)+u;else d=-a,f=Math.max(0,-(o*d+l)),p=-f*f+d*(d+2*c)+u;else d<=-g?(f=Math.max(0,-(-o*a+l)),d=f>0?-a:Math.min(Math.max(-a,-c),a),p=-f*f+d*(d+2*c)+u):d<=g?(f=0,d=Math.min(Math.max(-a,-c),a),p=d*(d+2*c)+u):(f=Math.max(0,-(o*a+l)),d=f>0?a:Math.min(Math.max(-a,-c),a),p=-f*f+d*(d+2*c)+u);else d=o>0?-a:a,f=Math.max(0,-(o*d+l)),p=-f*f+d*(d+2*c)+u;return i&&i.copy(this.origin).addScaledVector(this.direction,f),r&&r.copy(bo).addScaledVector(Ja,d),p}intersectSphere(e,t){if(e.radius<0)return null;Ri.subVectors(e.center,this.origin);const i=Ri.dot(this.direction),r=Ri.dot(Ri)-i*i,a=e.radius*e.radius;if(r>a)return null;const o=Math.sqrt(a-r),l=i-o,c=i+o;return c<0?null:l<0?this.at(c,t):this.at(l,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(e.normal)+e.constant)/t;return i>=0?i:null}intersectPlane(e,t){const i=this.distanceToPlane(e);return i===null?null:this.at(i,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let i,r,a,o,l,c;const u=1/this.direction.x,h=1/this.direction.y,f=1/this.direction.z,d=this.origin;return u>=0?(i=(e.min.x-d.x)*u,r=(e.max.x-d.x)*u):(i=(e.max.x-d.x)*u,r=(e.min.x-d.x)*u),h>=0?(a=(e.min.y-d.y)*h,o=(e.max.y-d.y)*h):(a=(e.max.y-d.y)*h,o=(e.min.y-d.y)*h),i>o||a>r||((a>i||isNaN(i))&&(i=a),(o<r||isNaN(r))&&(r=o),f>=0?(l=(e.min.z-d.z)*f,c=(e.max.z-d.z)*f):(l=(e.max.z-d.z)*f,c=(e.min.z-d.z)*f),i>c||l>r)||((l>i||i!==i)&&(i=l),(c<r||r!==r)&&(r=c),r<0)?null:this.at(i>=0?i:r,t)}intersectsBox(e){return this.intersectBox(e,Ri)!==null}intersectTriangle(e,t,i,r,a){const o=this.origin,l=this.direction,c=l.x,u=l.y,h=l.z,f=e.x-o.x,d=e.y-o.y,p=e.z-o.z,g=t.x-o.x,x=t.y-o.y,M=t.z-o.z,m=i.x-o.x,_=i.y-o.y,y=i.z-o.z,S=Math.abs(c),R=Math.abs(u),A=Math.abs(h);let D,b,w,L,C,I,N,O,B,W,$,ae;if(S>=R&&S>=A?(w=c,I=f,B=g,ae=m,c>=0?(D=u,b=h,L=d,C=p,N=x,O=M,W=_,$=y):(D=h,b=u,L=p,C=d,N=M,O=x,W=y,$=_)):R>=A?(w=u,I=d,B=x,ae=_,u>=0?(D=h,b=c,L=p,C=f,N=M,O=g,W=y,$=m):(D=c,b=h,L=f,C=p,N=g,O=M,W=m,$=y)):(w=h,I=p,B=M,ae=y,h>=0?(D=c,b=u,L=f,C=d,N=g,O=x,W=m,$=_):(D=u,b=c,L=d,C=f,N=x,O=g,W=_,$=m)),w===0)return null;const q=D/w,ee=b/w,F=1/w,re=L-q*I,ue=C-ee*I,Pe=N-q*B,He=O-ee*B,Xe=W-q*ae,j=$-ee*ae,ie=Xe*He-j*Pe,G=re*j-ue*Xe,he=Pe*ue-He*re;if(r){if(ie<0||G<0||he<0)return null}else if((ie<0||G<0||he<0)&&(ie>0||G>0||he>0))return null;const se=ie+G+he;if(se===0)return null;const Ae=F*(ie*I+G*B+he*ae);return(se>0?Ae<0:Ae>0)?null:this.at(Ae/se,a)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class vh extends ks{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Mt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Sr,this.combine=Ju,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const zc=new Kt,sr=new _1,ja=new $l,Hc=new Y,es=new Y,ts=new Y,ns=new Y,So=new Y,is=new Y,Gc=new Y,rs=new Y;class wn extends In{constructor(e=new vi,t=new vh){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const r=t[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let a=0,o=r.length;a<o;a++){const l=r[a].name||String(a);this.morphTargetInfluences.push(0),this.morphTargetDictionary[l]=a}}}}getVertexPosition(e,t){const i=this.geometry,r=i.attributes.position,a=i.morphAttributes.position,o=i.morphTargetsRelative;t.fromBufferAttribute(r,e);const l=this.morphTargetInfluences;if(a&&l){is.set(0,0,0);for(let c=0,u=a.length;c<u;c++){const h=l[c],f=a[c];h!==0&&(So.fromBufferAttribute(f,e),o?is.addScaledVector(So,h):is.addScaledVector(So.sub(t),h))}t.add(is)}return t}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){const i=this.geometry,r=this.material,a=this.matrixWorld;r!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),ja.copy(i.boundingSphere),ja.applyMatrix4(a),sr.copy(e.ray).recast(e.near),!(ja.containsPoint(sr.origin)===!1&&(sr.intersectSphere(ja,Hc)===null||sr.origin.distanceToSquared(Hc)>(e.far-e.near)**2))&&(zc.copy(a).invert(),sr.copy(e.ray).applyMatrix4(zc),!(i.boundingBox!==null&&sr.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,t,sr)))}_computeIntersections(e,t,i){let r;const a=this.geometry,o=this.material,l=a.index,c=a.attributes.position,u=a.attributes.uv,h=a.attributes.uv1,f=a.attributes.normal,d=a.groups,p=a.drawRange;if(l!==null)if(Array.isArray(o))for(let g=0,x=d.length;g<x;g++){const M=d[g],m=o[M.materialIndex],_=Math.max(M.start,p.start),y=Math.min(l.count,Math.min(M.start+M.count,p.start+p.count));for(let S=_,R=y;S<R;S+=3){const A=l.getX(S),D=l.getX(S+1),b=l.getX(S+2);r=as(this,m,e,i,u,h,f,A,D,b),r&&(r.faceIndex=Math.floor(S/3),r.face.materialIndex=M.materialIndex,t.push(r))}}else{const g=Math.max(0,p.start),x=Math.min(l.count,p.start+p.count);for(let M=g,m=x;M<m;M+=3){const _=l.getX(M),y=l.getX(M+1),S=l.getX(M+2);r=as(this,o,e,i,u,h,f,_,y,S),r&&(r.faceIndex=Math.floor(M/3),t.push(r))}}else if(c!==void 0)if(Array.isArray(o))for(let g=0,x=d.length;g<x;g++){const M=d[g],m=o[M.materialIndex],_=Math.max(M.start,p.start),y=Math.min(c.count,Math.min(M.start+M.count,p.start+p.count));for(let S=_,R=y;S<R;S+=3){const A=S,D=S+1,b=S+2;r=as(this,m,e,i,u,h,f,A,D,b),r&&(r.faceIndex=Math.floor(S/3),r.face.materialIndex=M.materialIndex,t.push(r))}}else{const g=Math.max(0,p.start),x=Math.min(c.count,p.start+p.count);for(let M=g,m=x;M<m;M+=3){const _=M,y=M+1,S=M+2;r=as(this,o,e,i,u,h,f,_,y,S),r&&(r.faceIndex=Math.floor(M/3),t.push(r))}}}}function v1(n,e,t,i,r,a,o,l){let c;if(e.side===Cn?c=i.intersectTriangle(o,a,r,!0,l):c=i.intersectTriangle(r,a,o,e.side===_r,l),c===null)return null;rs.copy(l),rs.applyMatrix4(n.matrixWorld);const u=t.ray.origin.distanceTo(rs);return u<t.near||u>t.far?null:{distance:u,point:rs.clone(),object:n}}function as(n,e,t,i,r,a,o,l,c,u){n.getVertexPosition(l,es),n.getVertexPosition(c,ts),n.getVertexPosition(u,ns);const h=v1(n,e,t,i,es,ts,ns,Gc);if(h){const f=new Y;$n.getBarycoord(Gc,es,ts,ns,f),r&&(h.uv=$n.getInterpolatedAttribute(r,l,c,u,f,new Ze)),a&&(h.uv1=$n.getInterpolatedAttribute(a,l,c,u,f,new Ze)),o&&(h.normal=$n.getInterpolatedAttribute(o,l,c,u,f,new Y),h.normal.dot(i.direction)>0&&h.normal.multiplyScalar(-1));const d={a:l,b:c,c:u,normal:new Y,materialIndex:0};$n.getNormal(es,ts,ns,d.normal),h.face=d,h.barycoord=f}return h}class Yr extends yn{constructor(e=null,t=1,i=1,r,a,o,l,c,u=tn,h=tn,f,d){super(null,o,l,c,u,h,r,a,f,d),this.isDataTexture=!0,this.image={data:e,width:t,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class bh extends mi{constructor(e,t,i,r=1){super(e,t,i),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=r}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const or=new $l,b1=new Ze(.5,.5),ss=new Y;class Jl{constructor(e=new Qi,t=new Qi,i=new Qi,r=new Qi,a=new Qi,o=new Qi){this.planes=[e,t,i,r,a,o]}set(e,t,i,r,a,o){const l=this.planes;return l[0].copy(e),l[1].copy(t),l[2].copy(i),l[3].copy(r),l[4].copy(a),l[5].copy(o),this}copy(e){const t=this.planes;for(let i=0;i<6;i++)t[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,t=pi,i=!1){const r=this.planes,a=e.elements,o=a[0],l=a[1],c=a[2],u=a[3],h=a[4],f=a[5],d=a[6],p=a[7],g=a[8],x=a[9],M=a[10],m=a[11],_=a[12],y=a[13],S=a[14],R=a[15];if(r[0].setComponents(u-o,p-h,m-g,R-_).normalize(),r[1].setComponents(u+o,p+h,m+g,R+_).normalize(),r[2].setComponents(u+l,p+f,m+x,R+y).normalize(),r[3].setComponents(u-l,p-f,m-x,R-y).normalize(),i)r[4].setComponents(c,d,M,S).normalize(),r[5].setComponents(u-c,p-d,m-M,R-S).normalize();else if(r[4].setComponents(u-c,p-d,m-M,R-S).normalize(),t===pi)r[5].setComponents(u+c,p+d,m+M,R+S).normalize();else if(t===Ds)r[5].setComponents(c,d,M,S).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),or.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),or.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(or)}intersectsSprite(e){or.center.set(0,0,0);const t=b1.distanceTo(e.center);return or.radius=.7071067811865476+t,or.applyMatrix4(e.matrixWorld),this.intersectsSphere(or)}intersectsSphere(e){const t=this.planes,i=e.center,r=-e.radius;for(let a=0;a<6;a++)if(t[a].distanceToPoint(i)<r)return!1;return!0}intersectsBox(e){const t=this.planes;for(let i=0;i<6;i++){const r=t[i];if(ss.x=r.normal.x>0?e.max.x:e.min.x,ss.y=r.normal.y>0?e.max.y:e.min.y,ss.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(ss)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let i=0;i<6;i++)if(t[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class Sh extends yn{constructor(e=[],t=vr,i,r,a,o,l,c,u,h){super(e,t,i,r,a,o,l,c,u,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class Da extends yn{constructor(e,t,i=xi,r,a,o,l=tn,c=tn,u,h=zi,f=1){if(h!==zi&&h!==pr)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const d={width:e,height:t,depth:f};super(d,r,a,o,l,c,h,i,u),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new Zl(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return t.compareFunction=this.compareFunction,t}}class S1 extends Da{constructor(e,t=xi,i=vr,r,a,o=tn,l=tn,c,u=zi){const h={width:e,height:e,depth:1},f=[h,h,h,h,h,h];super(e,e,t,i,r,a,o,l,c,u),this.image=f,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}}class Eh extends yn{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}}class Na extends vi{constructor(e=1,t=1,i=1,r=1,a=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:i,widthSegments:r,heightSegments:a,depthSegments:o};const l=this;r=Math.floor(r),a=Math.floor(a),o=Math.floor(o);const c=[],u=[],h=[],f=[];let d=0,p=0;g("z","y","x",-1,-1,i,t,e,o,a,0),g("z","y","x",1,-1,i,t,-e,o,a,1),g("x","z","y",1,1,e,i,t,r,o,2),g("x","z","y",1,-1,e,i,-t,r,o,3),g("x","y","z",1,-1,e,t,i,r,a,4),g("x","y","z",-1,-1,e,t,-i,r,a,5),this.setIndex(c),this.setAttribute("position",new Bi(u,3)),this.setAttribute("normal",new Bi(h,3)),this.setAttribute("uv",new Bi(f,2));function g(x,M,m,_,y,S,R,A,D,b,w){const L=S/D,C=R/b,I=S/2,N=R/2,O=A/2,B=D+1,W=b+1;let $=0,ae=0;const q=new Y;for(let ee=0;ee<W;ee++){const F=ee*C-N;for(let re=0;re<B;re++){const ue=re*L-I;q[x]=ue*_,q[M]=F*y,q[m]=O,u.push(q.x,q.y,q.z),q[x]=0,q[M]=0,q[m]=A>0?1:-1,h.push(q.x,q.y,q.z),f.push(re/D),f.push(1-ee/b),$+=1}}for(let ee=0;ee<b;ee++)for(let F=0;F<D;F++){const re=d+F+B*ee,ue=d+F+B*(ee+1),Pe=d+(F+1)+B*(ee+1),He=d+(F+1)+B*ee;c.push(re,ue,He),c.push(ue,Pe,He),ae+=6}l.addGroup(p,ae,w),p+=ae,d+=$}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Na(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}class bi extends vi{constructor(e=1,t=1,i=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:i,heightSegments:r};const a=e/2,o=t/2,l=Math.floor(i),c=Math.floor(r),u=l+1,h=c+1,f=e/l,d=t/c,p=[],g=[],x=[],M=[];for(let m=0;m<h;m++){const _=m*d-o;for(let y=0;y<u;y++){const S=y*f-a;g.push(S,-_,0),x.push(0,0,1),M.push(y/l),M.push(1-m/c)}}for(let m=0;m<c;m++)for(let _=0;_<l;_++){const y=_+u*m,S=_+u*(m+1),R=_+1+u*(m+1),A=_+1+u*m;p.push(y,S,A),p.push(S,R,A)}this.setIndex(p),this.setAttribute("position",new Bi(g,3)),this.setAttribute("normal",new Bi(x,3)),this.setAttribute("uv",new Bi(M,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new bi(e.width,e.height,e.widthSegments,e.heightSegments)}}function Qr(n){const e={};for(const t in n){e[t]={};for(const i in n[t]){const r=n[t][i];if(Wc(r))r.isRenderTargetTexture?(Ke("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][i]=null):e[t][i]=r.clone();else if(Array.isArray(r))if(Wc(r[0])){const a=[];for(let o=0,l=r.length;o<l;o++)a[o]=r[o].clone();e[t][i]=a}else e[t][i]=r.slice();else e[t][i]=r}}return e}function Sn(n){const e={};for(let t=0;t<n.length;t++){const i=Qr(n[t]);for(const r in i)e[r]=i[r]}return e}function Wc(n){return n&&(n.isColor||n.isMatrix3||n.isMatrix4||n.isVector2||n.isVector3||n.isVector4||n.isTexture||n.isQuaternion)}function E1(n){const e=[];for(let t=0;t<n.length;t++)e.push(n[t].clone());return e}function yh(n){const e=n.getRenderTarget();return e===null?n.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:lt.workingColorSpace}const y1={clone:Qr,merge:Sn};var w1=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,A1=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class vn extends ks{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=w1,this.fragmentShader=A1,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Qr(e.uniforms),this.uniformsGroups=E1(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const r in this.uniforms){const o=this.uniforms[r].value;o&&o.isTexture?t.uniforms[r]={type:"t",value:o.toJSON(e).uuid}:o&&o.isColor?t.uniforms[r]={type:"c",value:o.getHex()}:o&&o.isVector2?t.uniforms[r]={type:"v2",value:o.toArray()}:o&&o.isVector3?t.uniforms[r]={type:"v3",value:o.toArray()}:o&&o.isVector4?t.uniforms[r]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?t.uniforms[r]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?t.uniforms[r]={type:"m4",value:o.toArray()}:t.uniforms[r]={value:o}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const i={};for(const r in this.extensions)this.extensions[r]===!0&&(i[r]=!0);return Object.keys(i).length>0&&(t.extensions=i),t}fromJSON(e,t){if(super.fromJSON(e,t),e.uniforms!==void 0)for(const i in e.uniforms){const r=e.uniforms[i];switch(this.uniforms[i]={},r.type){case"t":this.uniforms[i].value=t[r.value]||null;break;case"c":this.uniforms[i].value=new Mt().setHex(r.value);break;case"v2":this.uniforms[i].value=new Ze().fromArray(r.value);break;case"v3":this.uniforms[i].value=new Y().fromArray(r.value);break;case"v4":this.uniforms[i].value=new kt().fromArray(r.value);break;case"m3":this.uniforms[i].value=new qe().fromArray(r.value);break;case"m4":this.uniforms[i].value=new Kt().fromArray(r.value);break;default:this.uniforms[i].value=r.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(const i in e.extensions)this.extensions[i]=e.extensions[i];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}}class T1 extends vn{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class R1 extends ks{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Bp,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class C1 extends ks{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const os=new Y,ls=new na,ii=new Y;class wh extends In{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Kt,this.projectionMatrix=new Kt,this.projectionMatrixInverse=new Kt,this.coordinateSystem=pi,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(os,ls,ii),ii.x===1&&ii.y===1&&ii.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(os,ls,ii.set(1,1,1)).invert()}updateWorldMatrix(e,t,i=!1){super.updateWorldMatrix(e,t,i),this.matrixWorld.decompose(os,ls,ii),ii.x===1&&ii.y===1&&ii.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(os,ls,ii.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}const Ji=new Y,Vc=new Ze,Yc=new Ze;class kn extends wh{constructor(e=50,t=1,i=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=El*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(eo*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return El*2*Math.atan(Math.tan(eo*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,i){Ji.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Ji.x,Ji.y).multiplyScalar(-e/Ji.z),Ji.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(Ji.x,Ji.y).multiplyScalar(-e/Ji.z)}getViewSize(e,t){return this.getViewBounds(e,Vc,Yc),t.subVectors(Yc,Vc)}setViewOffset(e,t,i,r,a,o){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=r,this.view.width=a,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(eo*.5*this.fov)/this.zoom,i=2*t,r=this.aspect*i,a=-.5*r;const o=this.view;if(this.view!==null&&this.view.enabled){const c=o.fullWidth,u=o.fullHeight;a+=o.offsetX*r/c,t-=o.offsetY*i/u,r*=o.width/c,i*=o.height/u}const l=this.filmOffset;l!==0&&(a+=e*l/this.getFilmWidth()),this.projectionMatrix.makePerspective(a,a+r,t,t-i,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}class Ql extends wh{constructor(e=-1,t=1,i=1,r=-1,a=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=i,this.bottom=r,this.near=a,this.far=o,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,i,r,a,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=r,this.view.width=a,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,r=(this.top+this.bottom)/2;let a=i-e,o=i+e,l=r+t,c=r-t;if(this.view!==null&&this.view.enabled){const u=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;a+=u*this.view.offsetX,o=a+u*this.view.width,l-=h*this.view.offsetY,c=l-h*this.view.height}this.projectionMatrix.makeOrthographic(a,o,l,c,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}class Ah extends vi{constructor(){super(),this.isInstancedBufferGeometry=!0,this.type="InstancedBufferGeometry",this.instanceCount=1/0}copy(e){return super.copy(e),this.instanceCount=e.instanceCount,this}toJSON(){const e=super.toJSON();return e.instanceCount=this.instanceCount,e.isInstancedBufferGeometry=!0,e}}const Ur=-90,Br=1;class L1 extends In{constructor(e,t,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const r=new kn(Ur,Br,e,t);r.layers=this.layers,this.add(r);const a=new kn(Ur,Br,e,t);a.layers=this.layers,this.add(a);const o=new kn(Ur,Br,e,t);o.layers=this.layers,this.add(o);const l=new kn(Ur,Br,e,t);l.layers=this.layers,this.add(l);const c=new kn(Ur,Br,e,t);c.layers=this.layers,this.add(c);const u=new kn(Ur,Br,e,t);u.layers=this.layers,this.add(u)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[i,r,a,o,l,c]=t;for(const u of t)this.remove(u);if(e===pi)i.up.set(0,1,0),i.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),a.up.set(0,0,-1),a.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),l.up.set(0,1,0),l.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(e===Ds)i.up.set(0,-1,0),i.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),a.up.set(0,0,1),a.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),l.up.set(0,-1,0),l.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const u of t)this.add(u),u.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[a,o,l,c,u,h]=this.children,f=e.getRenderTarget(),d=e.getActiveCubeFace(),p=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;const x=i.texture.generateMipmaps;i.texture.generateMipmaps=!1;let M=!1;e.isWebGLRenderer===!0?M=e.state.buffers.depth.getReversed():M=e.reversedDepthBuffer,e.setRenderTarget(i,0,r),M&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(i,1,r),M&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(i,2,r),M&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),e.setRenderTarget(i,3,r),M&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),e.setRenderTarget(i,4,r),M&&e.autoClear===!1&&e.clearDepth(),e.render(t,u),i.texture.generateMipmaps=x,e.setRenderTarget(i,5,r),M&&e.autoClear===!1&&e.clearDepth(),e.render(t,h),e.setRenderTarget(f,d,p),e.xr.enabled=g,i.texture.needsPMREMUpdate=!0}}class D1 extends kn{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}class Th{static{Th.prototype.isMatrix2=!0}constructor(e,t,i,r){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,i,r)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let i=0;i<4;i++)this.elements[i]=e[i+t];return this}set(e,t,i,r){const a=this.elements;return a[0]=e,a[2]=t,a[1]=i,a[3]=r,this}}function Xc(n,e,t,i){const r=P1(i);switch(t){case uh:return n*e;case dh:return n*e/r.components*r.byteLength;case Vl:return n*e/r.components*r.byteLength;case br:return n*e*2/r.components*r.byteLength;case Yl:return n*e*2/r.components*r.byteLength;case hh:return n*e*3/r.components*r.byteLength;case Hn:return n*e*4/r.components*r.byteLength;case Xl:return n*e*4/r.components*r.byteLength;case vs:case bs:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case Ss:case Es:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case qo:case $o:return Math.max(n,16)*Math.max(e,8)/4;case Ko:case Zo:return Math.max(n,8)*Math.max(e,8)/2;case Jo:case Qo:case el:case tl:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case jo:case Rs:case nl:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case il:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case rl:return Math.floor((n+4)/5)*Math.floor((e+3)/4)*16;case al:return Math.floor((n+4)/5)*Math.floor((e+4)/5)*16;case sl:return Math.floor((n+5)/6)*Math.floor((e+4)/5)*16;case ol:return Math.floor((n+5)/6)*Math.floor((e+5)/6)*16;case ll:return Math.floor((n+7)/8)*Math.floor((e+4)/5)*16;case cl:return Math.floor((n+7)/8)*Math.floor((e+5)/6)*16;case ul:return Math.floor((n+7)/8)*Math.floor((e+7)/8)*16;case hl:return Math.floor((n+9)/10)*Math.floor((e+4)/5)*16;case dl:return Math.floor((n+9)/10)*Math.floor((e+5)/6)*16;case fl:return Math.floor((n+9)/10)*Math.floor((e+7)/8)*16;case pl:return Math.floor((n+9)/10)*Math.floor((e+9)/10)*16;case gl:return Math.floor((n+11)/12)*Math.floor((e+9)/10)*16;case ml:return Math.floor((n+11)/12)*Math.floor((e+11)/12)*16;case Ml:case xl:case _l:return Math.ceil(n/4)*Math.ceil(e/4)*16;case vl:case bl:return Math.ceil(n/4)*Math.ceil(e/4)*8;case Cs:case Sl:return Math.ceil(n/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function P1(n){switch(n){case On:case sh:return{byteLength:1,components:1};case Ra:case oh:case _i:return{byteLength:2,components:1};case Gl:case Wl:return{byteLength:2,components:4};case xi:case Hl:case fi:return{byteLength:4,components:1};case lh:case ch:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${n}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:zl}}));typeof window<"u"&&(window.__THREE__?Ke("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=zl);function Rh(){let n=null,e=!1,t=null,i=null;function r(a,o){i=n.requestAnimationFrame(r),t(a,o)}return{start:function(){e!==!0&&t!==null&&n!==null&&(i=n.requestAnimationFrame(r),e=!0)},stop:function(){n!==null&&n.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(a){t=a},setContext:function(a){n=a}}}function O1(n){const e=new WeakMap;function t(l,c){const u=l.array,h=l.usage,f=u.byteLength,d=n.createBuffer();n.bindBuffer(c,d),n.bufferData(c,u,h),l.onUploadCallback();let p;if(u instanceof Float32Array)p=n.FLOAT;else if(typeof Float16Array<"u"&&u instanceof Float16Array)p=n.HALF_FLOAT;else if(u instanceof Uint16Array)l.isFloat16BufferAttribute?p=n.HALF_FLOAT:p=n.UNSIGNED_SHORT;else if(u instanceof Int16Array)p=n.SHORT;else if(u instanceof Uint32Array)p=n.UNSIGNED_INT;else if(u instanceof Int32Array)p=n.INT;else if(u instanceof Int8Array)p=n.BYTE;else if(u instanceof Uint8Array)p=n.UNSIGNED_BYTE;else if(u instanceof Uint8ClampedArray)p=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+u);return{buffer:d,type:p,bytesPerElement:u.BYTES_PER_ELEMENT,version:l.version,size:f}}function i(l,c,u){const h=c.array,f=c.updateRanges;if(n.bindBuffer(u,l),f.length===0)n.bufferSubData(u,0,h);else{f.sort((p,g)=>p.start-g.start);let d=0;for(let p=1;p<f.length;p++){const g=f[d],x=f[p];x.start<=g.start+g.count+1?g.count=Math.max(g.count,x.start+x.count-g.start):(++d,f[d]=x)}f.length=d+1;for(let p=0,g=f.length;p<g;p++){const x=f[p];n.bufferSubData(u,x.start*h.BYTES_PER_ELEMENT,h,x.start,x.count)}c.clearUpdateRanges()}c.onUploadCallback()}function r(l){return l.isInterleavedBufferAttribute&&(l=l.data),e.get(l)}function a(l){l.isInterleavedBufferAttribute&&(l=l.data);const c=e.get(l);c&&(n.deleteBuffer(c.buffer),e.delete(l))}function o(l,c){if(l.isInterleavedBufferAttribute&&(l=l.data),l.isGLBufferAttribute){const h=e.get(l);(!h||h.version<l.version)&&e.set(l,{buffer:l.buffer,type:l.type,bytesPerElement:l.elementSize,version:l.version});return}const u=e.get(l);if(u===void 0)e.set(l,t(l,c));else if(u.version<l.version){if(u.size!==l.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(u.buffer,l,c),u.version=l.version}}return{get:r,remove:a,update:o}}var I1=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,N1=`#ifdef USE_ALPHAHASH
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
#endif`,F1=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,U1=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,B1=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,k1=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,z1=`#ifdef USE_AOMAP
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
#endif`,H1=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,G1=`#ifdef USE_BATCHING
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
#endif`,W1=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,V1=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Y1=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,X1=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,K1=`#ifdef USE_IRIDESCENCE
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
#endif`,q1=`#ifdef USE_BUMPMAP
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
#endif`,Z1=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,$1=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,J1=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Q1=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,j1=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,eg=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,tg=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,ng=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
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
#endif`,ig=`#define PI 3.141592653589793
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
} // validated`,rg=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,ag=`vec3 transformedNormal = objectNormal;
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
#endif`,sg=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,og=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,lg=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,cg=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,ug="gl_FragColor = linearToOutputTexel( gl_FragColor );",hg=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,dg=`#ifdef USE_ENVMAP
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
#endif`,fg=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,pg=`#ifdef USE_ENVMAP
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
#endif`,gg=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,mg=`#ifdef USE_ENVMAP
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
#endif`,Mg=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,xg=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,_g=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,vg=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,bg=`#ifdef USE_GRADIENTMAP
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
}`,Sg=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Eg=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,yg=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,wg=`uniform bool receiveShadow;
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
#include <lightprobes_pars_fragment>`,Ag=`#ifdef USE_ENVMAP
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
#endif`,Tg=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Rg=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Cg=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Lg=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Dg=`PhysicalMaterial material;
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
#endif`,Pg=`uniform sampler2D dfgLUT;
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
}`,Og=`
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
#endif`,Ig=`#if defined( RE_IndirectDiffuse )
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
#endif`,Ng=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Fg=`#ifdef USE_LIGHT_PROBES_GRID
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
#endif`,Ug=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Bg=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,kg=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,zg=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Hg=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Gg=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Wg=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,Vg=`#if defined( USE_POINTS_UV )
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
#endif`,Yg=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Xg=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Kg=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,qg=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Zg=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,$g=`#ifdef USE_MORPHTARGETS
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
#endif`,Jg=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Qg=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,jg=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,em=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,tm=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,nm=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,im=`#ifdef USE_NORMALMAP
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
#endif`,rm=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,am=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,sm=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,om=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,lm=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,cm=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,um=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,hm=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,dm=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,fm=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,pm=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,gm=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,mm=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Mm=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,xm=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,_m=`float getShadowMask() {
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
}`,vm=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,bm=`#ifdef USE_SKINNING
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
#endif`,Sm=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Em=`#ifdef USE_SKINNING
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
#endif`,ym=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,wm=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Am=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Tm=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,Rm=`#ifdef USE_TRANSMISSION
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
#endif`,Cm=`#ifdef USE_TRANSMISSION
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
#endif`,Lm=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Dm=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Pm=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Om=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Im=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Nm=`uniform sampler2D t2D;
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
}`,Fm=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Um=`#ifdef ENVMAP_TYPE_CUBE
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
}`,Bm=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,km=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,zm=`#include <common>
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
}`,Hm=`#if DEPTH_PACKING == 3200
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
}`,Gm=`#define DISTANCE
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
}`,Wm=`#define DISTANCE
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
}`,Vm=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Ym=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Xm=`uniform float scale;
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
}`,Km=`uniform vec3 diffuse;
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
}`,qm=`#include <common>
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
}`,Zm=`uniform vec3 diffuse;
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
}`,$m=`#define LAMBERT
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
}`,Jm=`#define LAMBERT
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
}`,Qm=`#define MATCAP
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
}`,jm=`#define MATCAP
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
}`,e2=`#define NORMAL
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
}`,t2=`#define NORMAL
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
}`,n2=`#define PHONG
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
}`,i2=`#define PHONG
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
}`,r2=`#define STANDARD
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
}`,a2=`#define STANDARD
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
}`,s2=`#define TOON
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
}`,o2=`#define TOON
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
}`,l2=`uniform float size;
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
}`,c2=`uniform vec3 diffuse;
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
}`,u2=`#include <common>
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
}`,h2=`uniform vec3 color;
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
}`,d2=`uniform float rotation;
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
}`,f2=`uniform vec3 diffuse;
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
}`,st={alphahash_fragment:I1,alphahash_pars_fragment:N1,alphamap_fragment:F1,alphamap_pars_fragment:U1,alphatest_fragment:B1,alphatest_pars_fragment:k1,aomap_fragment:z1,aomap_pars_fragment:H1,batching_pars_vertex:G1,batching_vertex:W1,begin_vertex:V1,beginnormal_vertex:Y1,bsdfs:X1,iridescence_fragment:K1,bumpmap_pars_fragment:q1,clipping_planes_fragment:Z1,clipping_planes_pars_fragment:$1,clipping_planes_pars_vertex:J1,clipping_planes_vertex:Q1,color_fragment:j1,color_pars_fragment:eg,color_pars_vertex:tg,color_vertex:ng,common:ig,cube_uv_reflection_fragment:rg,defaultnormal_vertex:ag,displacementmap_pars_vertex:sg,displacementmap_vertex:og,emissivemap_fragment:lg,emissivemap_pars_fragment:cg,colorspace_fragment:ug,colorspace_pars_fragment:hg,envmap_fragment:dg,envmap_common_pars_fragment:fg,envmap_pars_fragment:pg,envmap_pars_vertex:gg,envmap_physical_pars_fragment:Ag,envmap_vertex:mg,fog_vertex:Mg,fog_pars_vertex:xg,fog_fragment:_g,fog_pars_fragment:vg,gradientmap_pars_fragment:bg,lightmap_pars_fragment:Sg,lights_lambert_fragment:Eg,lights_lambert_pars_fragment:yg,lights_pars_begin:wg,lights_toon_fragment:Tg,lights_toon_pars_fragment:Rg,lights_phong_fragment:Cg,lights_phong_pars_fragment:Lg,lights_physical_fragment:Dg,lights_physical_pars_fragment:Pg,lights_fragment_begin:Og,lights_fragment_maps:Ig,lights_fragment_end:Ng,lightprobes_pars_fragment:Fg,logdepthbuf_fragment:Ug,logdepthbuf_pars_fragment:Bg,logdepthbuf_pars_vertex:kg,logdepthbuf_vertex:zg,map_fragment:Hg,map_pars_fragment:Gg,map_particle_fragment:Wg,map_particle_pars_fragment:Vg,metalnessmap_fragment:Yg,metalnessmap_pars_fragment:Xg,morphinstance_vertex:Kg,morphcolor_vertex:qg,morphnormal_vertex:Zg,morphtarget_pars_vertex:$g,morphtarget_vertex:Jg,normal_fragment_begin:Qg,normal_fragment_maps:jg,normal_pars_fragment:em,normal_pars_vertex:tm,normal_vertex:nm,normalmap_pars_fragment:im,clearcoat_normal_fragment_begin:rm,clearcoat_normal_fragment_maps:am,clearcoat_pars_fragment:sm,iridescence_pars_fragment:om,opaque_fragment:lm,packing:cm,premultiplied_alpha_fragment:um,project_vertex:hm,dithering_fragment:dm,dithering_pars_fragment:fm,roughnessmap_fragment:pm,roughnessmap_pars_fragment:gm,shadowmap_pars_fragment:mm,shadowmap_pars_vertex:Mm,shadowmap_vertex:xm,shadowmask_pars_fragment:_m,skinbase_vertex:vm,skinning_pars_vertex:bm,skinning_vertex:Sm,skinnormal_vertex:Em,specularmap_fragment:ym,specularmap_pars_fragment:wm,tonemapping_fragment:Am,tonemapping_pars_fragment:Tm,transmission_fragment:Rm,transmission_pars_fragment:Cm,uv_pars_fragment:Lm,uv_pars_vertex:Dm,uv_vertex:Pm,worldpos_vertex:Om,background_vert:Im,background_frag:Nm,backgroundCube_vert:Fm,backgroundCube_frag:Um,cube_vert:Bm,cube_frag:km,depth_vert:zm,depth_frag:Hm,distance_vert:Gm,distance_frag:Wm,equirect_vert:Vm,equirect_frag:Ym,linedashed_vert:Xm,linedashed_frag:Km,meshbasic_vert:qm,meshbasic_frag:Zm,meshlambert_vert:$m,meshlambert_frag:Jm,meshmatcap_vert:Qm,meshmatcap_frag:jm,meshnormal_vert:e2,meshnormal_frag:t2,meshphong_vert:n2,meshphong_frag:i2,meshphysical_vert:r2,meshphysical_frag:a2,meshtoon_vert:s2,meshtoon_frag:o2,points_vert:l2,points_frag:c2,shadow_vert:u2,shadow_frag:h2,sprite_vert:d2,sprite_frag:f2},be={common:{diffuse:{value:new Mt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new qe},alphaMap:{value:null},alphaMapTransform:{value:new qe},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new qe}},envmap:{envMap:{value:null},envMapRotation:{value:new qe},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new qe}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new qe}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new qe},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new qe},normalScale:{value:new Ze(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new qe},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new qe}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new qe}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new qe}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Mt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new Y},probesMax:{value:new Y},probesResolution:{value:new Y}},points:{diffuse:{value:new Mt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new qe},alphaTest:{value:0},uvTransform:{value:new qe}},sprite:{diffuse:{value:new Mt(16777215)},opacity:{value:1},center:{value:new Ze(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new qe},alphaMap:{value:null},alphaMapTransform:{value:new qe},alphaTest:{value:0}}},ci={basic:{uniforms:Sn([be.common,be.specularmap,be.envmap,be.aomap,be.lightmap,be.fog]),vertexShader:st.meshbasic_vert,fragmentShader:st.meshbasic_frag},lambert:{uniforms:Sn([be.common,be.specularmap,be.envmap,be.aomap,be.lightmap,be.emissivemap,be.bumpmap,be.normalmap,be.displacementmap,be.fog,be.lights,{emissive:{value:new Mt(0)},envMapIntensity:{value:1}}]),vertexShader:st.meshlambert_vert,fragmentShader:st.meshlambert_frag},phong:{uniforms:Sn([be.common,be.specularmap,be.envmap,be.aomap,be.lightmap,be.emissivemap,be.bumpmap,be.normalmap,be.displacementmap,be.fog,be.lights,{emissive:{value:new Mt(0)},specular:{value:new Mt(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:st.meshphong_vert,fragmentShader:st.meshphong_frag},standard:{uniforms:Sn([be.common,be.envmap,be.aomap,be.lightmap,be.emissivemap,be.bumpmap,be.normalmap,be.displacementmap,be.roughnessmap,be.metalnessmap,be.fog,be.lights,{emissive:{value:new Mt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:st.meshphysical_vert,fragmentShader:st.meshphysical_frag},toon:{uniforms:Sn([be.common,be.aomap,be.lightmap,be.emissivemap,be.bumpmap,be.normalmap,be.displacementmap,be.gradientmap,be.fog,be.lights,{emissive:{value:new Mt(0)}}]),vertexShader:st.meshtoon_vert,fragmentShader:st.meshtoon_frag},matcap:{uniforms:Sn([be.common,be.bumpmap,be.normalmap,be.displacementmap,be.fog,{matcap:{value:null}}]),vertexShader:st.meshmatcap_vert,fragmentShader:st.meshmatcap_frag},points:{uniforms:Sn([be.points,be.fog]),vertexShader:st.points_vert,fragmentShader:st.points_frag},dashed:{uniforms:Sn([be.common,be.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:st.linedashed_vert,fragmentShader:st.linedashed_frag},depth:{uniforms:Sn([be.common,be.displacementmap]),vertexShader:st.depth_vert,fragmentShader:st.depth_frag},normal:{uniforms:Sn([be.common,be.bumpmap,be.normalmap,be.displacementmap,{opacity:{value:1}}]),vertexShader:st.meshnormal_vert,fragmentShader:st.meshnormal_frag},sprite:{uniforms:Sn([be.sprite,be.fog]),vertexShader:st.sprite_vert,fragmentShader:st.sprite_frag},background:{uniforms:{uvTransform:{value:new qe},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:st.background_vert,fragmentShader:st.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new qe}},vertexShader:st.backgroundCube_vert,fragmentShader:st.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:st.cube_vert,fragmentShader:st.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:st.equirect_vert,fragmentShader:st.equirect_frag},distance:{uniforms:Sn([be.common,be.displacementmap,{referencePosition:{value:new Y},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:st.distance_vert,fragmentShader:st.distance_frag},shadow:{uniforms:Sn([be.lights,be.fog,{color:{value:new Mt(0)},opacity:{value:1}}]),vertexShader:st.shadow_vert,fragmentShader:st.shadow_frag}};ci.physical={uniforms:Sn([ci.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new qe},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new qe},clearcoatNormalScale:{value:new Ze(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new qe},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new qe},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new qe},sheen:{value:0},sheenColor:{value:new Mt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new qe},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new qe},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new qe},transmissionSamplerSize:{value:new Ze},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new qe},attenuationDistance:{value:0},attenuationColor:{value:new Mt(0)},specularColor:{value:new Mt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new qe},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new qe},anisotropyVector:{value:new Ze},anisotropyMap:{value:null},anisotropyMapTransform:{value:new qe}}]),vertexShader:st.meshphysical_vert,fragmentShader:st.meshphysical_frag};const cs={r:0,b:0,g:0},p2=new Kt,Ch=new qe;Ch.set(-1,0,0,0,1,0,0,0,1);function g2(n,e,t,i,r,a){const o=new Mt(0);let l=r===!0?0:1,c,u,h=null,f=0,d=null;function p(_){let y=_.isScene===!0?_.background:null;if(y&&y.isTexture){const S=_.backgroundBlurriness>0;y=e.get(y,S)}return y}function g(_){let y=!1;const S=p(_);S===null?M(o,l):S&&S.isColor&&(M(S,1),y=!0);const R=n.xr.getEnvironmentBlendMode();R==="additive"?t.buffers.color.setClear(0,0,0,1,a):R==="alpha-blend"&&t.buffers.color.setClear(0,0,0,0,a),(n.autoClear||y)&&(t.buffers.depth.setTest(!0),t.buffers.depth.setMask(!0),t.buffers.color.setMask(!0),n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil))}function x(_,y){const S=p(y);S&&(S.isCubeTexture||S.mapping===Bs)?(u===void 0&&(u=new wn(new Na(1,1,1),new vn({name:"BackgroundCubeMaterial",uniforms:Qr(ci.backgroundCube.uniforms),vertexShader:ci.backgroundCube.vertexShader,fragmentShader:ci.backgroundCube.fragmentShader,side:Cn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),u.geometry.deleteAttribute("normal"),u.geometry.deleteAttribute("uv"),u.onBeforeRender=function(R,A,D){this.matrixWorld.copyPosition(D.matrixWorld)},Object.defineProperty(u.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(u)),u.material.uniforms.envMap.value=S,u.material.uniforms.backgroundBlurriness.value=y.backgroundBlurriness,u.material.uniforms.backgroundIntensity.value=y.backgroundIntensity,u.material.uniforms.backgroundRotation.value.setFromMatrix4(p2.makeRotationFromEuler(y.backgroundRotation)).transpose(),S.isCubeTexture&&S.isRenderTargetTexture===!1&&u.material.uniforms.backgroundRotation.value.premultiply(Ch),u.material.toneMapped=lt.getTransfer(S.colorSpace)!==yt,(h!==S||f!==S.version||d!==n.toneMapping)&&(u.material.needsUpdate=!0,h=S,f=S.version,d=n.toneMapping),u.layers.enableAll(),_.unshift(u,u.geometry,u.material,0,0,null)):S&&S.isTexture&&(c===void 0&&(c=new wn(new bi(2,2),new vn({name:"BackgroundMaterial",uniforms:Qr(ci.background.uniforms),vertexShader:ci.background.vertexShader,fragmentShader:ci.background.fragmentShader,side:_r,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(c)),c.material.uniforms.t2D.value=S,c.material.uniforms.backgroundIntensity.value=y.backgroundIntensity,c.material.toneMapped=lt.getTransfer(S.colorSpace)!==yt,S.matrixAutoUpdate===!0&&S.updateMatrix(),c.material.uniforms.uvTransform.value.copy(S.matrix),(h!==S||f!==S.version||d!==n.toneMapping)&&(c.material.needsUpdate=!0,h=S,f=S.version,d=n.toneMapping),c.layers.enableAll(),_.unshift(c,c.geometry,c.material,0,0,null))}function M(_,y){_.getRGB(cs,yh(n)),t.buffers.color.setClear(cs.r,cs.g,cs.b,y,a)}function m(){u!==void 0&&(u.geometry.dispose(),u.material.dispose(),u=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return o},setClearColor:function(_,y=1){o.set(_),l=y,M(o,l)},getClearAlpha:function(){return l},setClearAlpha:function(_){l=_,M(o,l)},render:g,addToRenderList:x,dispose:m}}function m2(n,e){const t=n.getParameter(n.MAX_VERTEX_ATTRIBS),i={},r=d(null);let a=r,o=!1;function l(C,I,N,O,B){let W=!1;const $=f(C,O,N,I);a!==$&&(a=$,u(a.object)),W=p(C,O,N,B),W&&g(C,O,N,B),B!==null&&e.update(B,n.ELEMENT_ARRAY_BUFFER),(W||o)&&(o=!1,S(C,I,N,O),B!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,e.get(B).buffer))}function c(){return n.createVertexArray()}function u(C){return n.bindVertexArray(C)}function h(C){return n.deleteVertexArray(C)}function f(C,I,N,O){const B=O.wireframe===!0;let W=i[I.id];W===void 0&&(W={},i[I.id]=W);const $=C.isInstancedMesh===!0?C.id:0;let ae=W[$];ae===void 0&&(ae={},W[$]=ae);let q=ae[N.id];q===void 0&&(q={},ae[N.id]=q);let ee=q[B];return ee===void 0&&(ee=d(c()),q[B]=ee),ee}function d(C){const I=[],N=[],O=[];for(let B=0;B<t;B++)I[B]=0,N[B]=0,O[B]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:I,enabledAttributes:N,attributeDivisors:O,object:C,attributes:{},index:null}}function p(C,I,N,O){const B=a.attributes,W=I.attributes;let $=0;const ae=N.getAttributes();for(const q in ae)if(ae[q].location>=0){const F=B[q];let re=W[q];if(re===void 0&&(q==="instanceMatrix"&&C.instanceMatrix&&(re=C.instanceMatrix),q==="instanceColor"&&C.instanceColor&&(re=C.instanceColor)),F===void 0||F.attribute!==re||re&&F.data!==re.data)return!0;$++}return a.attributesNum!==$||a.index!==O}function g(C,I,N,O){const B={},W=I.attributes;let $=0;const ae=N.getAttributes();for(const q in ae)if(ae[q].location>=0){let F=W[q];F===void 0&&(q==="instanceMatrix"&&C.instanceMatrix&&(F=C.instanceMatrix),q==="instanceColor"&&C.instanceColor&&(F=C.instanceColor));const re={};re.attribute=F,F&&F.data&&(re.data=F.data),B[q]=re,$++}a.attributes=B,a.attributesNum=$,a.index=O}function x(){const C=a.newAttributes;for(let I=0,N=C.length;I<N;I++)C[I]=0}function M(C){m(C,0)}function m(C,I){const N=a.newAttributes,O=a.enabledAttributes,B=a.attributeDivisors;N[C]=1,O[C]===0&&(n.enableVertexAttribArray(C),O[C]=1),B[C]!==I&&(n.vertexAttribDivisor(C,I),B[C]=I)}function _(){const C=a.newAttributes,I=a.enabledAttributes;for(let N=0,O=I.length;N<O;N++)I[N]!==C[N]&&(n.disableVertexAttribArray(N),I[N]=0)}function y(C,I,N,O,B,W,$){$===!0?n.vertexAttribIPointer(C,I,N,B,W):n.vertexAttribPointer(C,I,N,O,B,W)}function S(C,I,N,O){x();const B=O.attributes,W=N.getAttributes(),$=I.defaultAttributeValues;for(const ae in W){const q=W[ae];if(q.location>=0){let ee=B[ae];if(ee===void 0&&(ae==="instanceMatrix"&&C.instanceMatrix&&(ee=C.instanceMatrix),ae==="instanceColor"&&C.instanceColor&&(ee=C.instanceColor)),ee!==void 0){const F=ee.normalized,re=ee.itemSize,ue=e.get(ee);if(ue===void 0)continue;const Pe=ue.buffer,He=ue.type,Xe=ue.bytesPerElement,j=He===n.INT||He===n.UNSIGNED_INT||ee.gpuType===Hl;if(ee.isInterleavedBufferAttribute){const ie=ee.data,G=ie.stride,he=ee.offset;if(ie.isInstancedInterleavedBuffer){for(let se=0;se<q.locationSize;se++)m(q.location+se,ie.meshPerAttribute);C.isInstancedMesh!==!0&&O._maxInstanceCount===void 0&&(O._maxInstanceCount=ie.meshPerAttribute*ie.count)}else for(let se=0;se<q.locationSize;se++)M(q.location+se);n.bindBuffer(n.ARRAY_BUFFER,Pe);for(let se=0;se<q.locationSize;se++)y(q.location+se,re/q.locationSize,He,F,G*Xe,(he+re/q.locationSize*se)*Xe,j)}else{if(ee.isInstancedBufferAttribute){for(let ie=0;ie<q.locationSize;ie++)m(q.location+ie,ee.meshPerAttribute);C.isInstancedMesh!==!0&&O._maxInstanceCount===void 0&&(O._maxInstanceCount=ee.meshPerAttribute*ee.count)}else for(let ie=0;ie<q.locationSize;ie++)M(q.location+ie);n.bindBuffer(n.ARRAY_BUFFER,Pe);for(let ie=0;ie<q.locationSize;ie++)y(q.location+ie,re/q.locationSize,He,F,re*Xe,re/q.locationSize*ie*Xe,j)}}else if($!==void 0){const F=$[ae];if(F!==void 0)switch(F.length){case 2:n.vertexAttrib2fv(q.location,F);break;case 3:n.vertexAttrib3fv(q.location,F);break;case 4:n.vertexAttrib4fv(q.location,F);break;default:n.vertexAttrib1fv(q.location,F)}}}}_()}function R(){w();for(const C in i){const I=i[C];for(const N in I){const O=I[N];for(const B in O){const W=O[B];for(const $ in W)h(W[$].object),delete W[$];delete O[B]}}delete i[C]}}function A(C){if(i[C.id]===void 0)return;const I=i[C.id];for(const N in I){const O=I[N];for(const B in O){const W=O[B];for(const $ in W)h(W[$].object),delete W[$];delete O[B]}}delete i[C.id]}function D(C){for(const I in i){const N=i[I];for(const O in N){const B=N[O];if(B[C.id]===void 0)continue;const W=B[C.id];for(const $ in W)h(W[$].object),delete W[$];delete B[C.id]}}}function b(C){for(const I in i){const N=i[I],O=C.isInstancedMesh===!0?C.id:0,B=N[O];if(B!==void 0){for(const W in B){const $=B[W];for(const ae in $)h($[ae].object),delete $[ae];delete B[W]}delete N[O],Object.keys(N).length===0&&delete i[I]}}}function w(){L(),o=!0,a!==r&&(a=r,u(a.object))}function L(){r.geometry=null,r.program=null,r.wireframe=!1}return{setup:l,reset:w,resetDefaultState:L,dispose:R,releaseStatesOfGeometry:A,releaseStatesOfObject:b,releaseStatesOfProgram:D,initAttributes:x,enableAttribute:M,disableUnusedAttributes:_}}function M2(n,e,t){let i;function r(c){i=c}function a(c,u){n.drawArrays(i,c,u),t.update(u,i,1)}function o(c,u,h){h!==0&&(n.drawArraysInstanced(i,c,u,h),t.update(u,i,h))}function l(c,u,h){if(h===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,c,0,u,0,h);let d=0;for(let p=0;p<h;p++)d+=u[p];t.update(d,i,1)}this.setMode=r,this.render=a,this.renderInstances=o,this.renderMultiDraw=l}function x2(n,e,t,i){let r;function a(){if(r!==void 0)return r;if(e.has("EXT_texture_filter_anisotropic")===!0){const D=e.get("EXT_texture_filter_anisotropic");r=n.getParameter(D.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else r=0;return r}function o(D){return!(D!==Hn&&i.convert(D)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_FORMAT))}function l(D){const b=D===_i&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(D!==On&&D!==fi&&!b&&i.convert(D)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_TYPE))}function c(D){if(D==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";D="mediump"}return D==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let u=t.precision!==void 0?t.precision:"highp";const h=c(u);h!==u&&(Ke("WebGLRenderer:",u,"not supported, using",h,"instead."),u=h);const f=t.logarithmicDepthBuffer===!0,d=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control");t.reversedDepthBuffer===!0&&d===!1&&Ke("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");const p=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),g=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),x=n.getParameter(n.MAX_TEXTURE_SIZE),M=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),m=n.getParameter(n.MAX_VERTEX_ATTRIBS),_=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),y=n.getParameter(n.MAX_VARYING_VECTORS),S=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),R=n.getParameter(n.MAX_SAMPLES),A=n.getParameter(n.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:a,getMaxPrecision:c,textureFormatReadable:o,textureTypeReadable:l,precision:u,logarithmicDepthBuffer:f,reversedDepthBuffer:d,maxTextures:p,maxVertexTextures:g,maxTextureSize:x,maxCubemapSize:M,maxAttributes:m,maxVertexUniforms:_,maxVaryings:y,maxFragmentUniforms:S,maxSamples:R,samples:A}}function _2(n){const e=this;let t=null,i=0,r=!1,a=!1;const o=new Qi,l=new qe,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(f,d){const p=f.length!==0||d||i!==0||r;return r=d,i=f.length,p},this.beginShadows=function(){a=!0,h(null)},this.endShadows=function(){a=!1},this.setGlobalState=function(f,d){t=h(f,d,0)},this.setState=function(f,d,p){const g=f.clippingPlanes,x=f.clipIntersection,M=f.clipShadows,m=n.get(f);if(!r||g===null||g.length===0||a&&!M)a?h(null):u();else{const _=a?0:i,y=_*4;let S=m.clippingState||null;c.value=S,S=h(g,d,y,p);for(let R=0;R!==y;++R)S[R]=t[R];m.clippingState=S,this.numIntersection=x?this.numPlanes:0,this.numPlanes+=_}};function u(){c.value!==t&&(c.value=t,c.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function h(f,d,p,g){const x=f!==null?f.length:0;let M=null;if(x!==0){if(M=c.value,g!==!0||M===null){const m=p+x*4,_=d.matrixWorldInverse;l.getNormalMatrix(_),(M===null||M.length<m)&&(M=new Float32Array(m));for(let y=0,S=p;y!==x;++y,S+=4)o.copy(f[y]).applyMatrix4(_,l),o.normal.toArray(M,S),M[S+3]=o.constant}c.value=M,c.needsUpdate=!0}return e.numPlanes=x,e.numIntersection=0,M}}const Xr=4,v2=6,b2=20,S2=256,fa=new Ql,Kc=new Mt;let Eo=null,yo=0,wo=0,Ao=!1;const E2=new Y,lr=new Y;class qc{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,i=.1,r=100,a={}){const{size:o=256,position:l=E2}=a;Eo=this._renderer.getRenderTarget(),yo=this._renderer.getActiveCubeFace(),wo=this._renderer.getActiveMipmapLevel(),Ao=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(o);const c=this._allocateTargets();return c.depthBuffer=!0,this._sceneToCubeUV(e,i,r,c,l),t>0&&this._blur(c,0,0,t),this._applyPMREM(c),this._cleanup(c),c}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Jc(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=$c(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(Eo,yo,wo),this._renderer.xr.enabled=Ao,e.scissorTest=!1,kr(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===vr||e.mapping===Jr?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Eo=this._renderer.getRenderTarget(),yo=this._renderer.getActiveCubeFace(),wo=this._renderer.getActiveMipmapLevel(),Ao=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=t||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,i={magFilter:$t,minFilter:$t,generateMipmaps:!1,type:_i,format:Hn,colorSpace:La,depthBuffer:!1},r=Zc(e,t,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Zc(e,t,i);const{_lodMax:a}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods}=y2(a)),this._blurMaterial=A2(a,e,t),this._ggxMaterial=w2(a,e,t)}return r}_compileMaterial(e){const t=new wn(new vi,e);this._renderer.compile(t,fa)}_sceneToCubeUV(e,t,i,r,a){const c=new kn(90,1,t,i),u=[1,-1,1,1,1,1],h=[1,1,1,-1,-1,-1],f=this._renderer,d=f.autoClear,p=f.toneMapping;f.getClearColor(Kc),f.toneMapping=gi,f.autoClear=!1,f.state.buffers.depth.getReversed()&&(f.setRenderTarget(r),f.clearDepth(),f.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new wn(new Na,new vh({name:"PMREM.Background",side:Cn,depthWrite:!1,depthTest:!1})));const x=this._backgroundBox,M=x.material;let m=!1;const _=e.background;_?_.isColor&&(M.color.copy(_),e.background=null,m=!0):(M.color.copy(Kc),m=!0);for(let y=0;y<6;y++){const S=y%3;S===0?(c.up.set(0,u[y],0),c.position.set(a.x,a.y,a.z),c.lookAt(a.x+h[y],a.y,a.z)):S===1?(c.up.set(0,0,u[y]),c.position.set(a.x,a.y,a.z),c.lookAt(a.x,a.y+h[y],a.z)):(c.up.set(0,u[y],0),c.position.set(a.x,a.y,a.z),c.lookAt(a.x,a.y,a.z+h[y]));const R=this._cubeSize;kr(r,S*R,y>2?R:0,R,R),f.setRenderTarget(r),m&&f.render(x,c),f.render(e,c)}f.toneMapping=p,f.autoClear=d,e.background=_}_textureToCubeUV(e,t){const i=this._renderer,r=e.mapping===vr||e.mapping===Jr;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=Jc()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=$c());const a=r?this._cubemapMaterial:this._equirectMaterial,o=this._lodMeshes[0];o.material=a;const l=a.uniforms;l.envMap.value=e;const c=this._cubeSize;kr(t,0,0,3*c,2*c),i.setRenderTarget(t),i.render(o,fa)}_applyPMREM(e){const t=this._renderer,i=t.autoClear;t.autoClear=!1;const r=this._lodMeshes.length;for(let a=1;a<r;a++)this._applyGGXFilter(e,a-1,a);t.autoClear=i}_applyGGXFilter(e,t,i){const r=this._renderer,a=this._pingPongRenderTarget,o=this._ggxMaterial,l=this._lodMeshes[i];l.material=o;const c=o.uniforms,u=i/(this._lodMeshes.length-1),h=t/(this._lodMeshes.length-1),f=Math.sqrt(u*u-h*h),d=u*1.25,p=f*d,{_lodMax:g}=this,x=this._sizeLods[i],M=3*x*(i>g-Xr?i-g+Xr:0),m=4*(this._cubeSize-x);c.envMap.value=e.texture,c.roughness.value=p,c.mipInt.value=g-t,kr(a,M,m,3*x,2*x),r.setRenderTarget(a),r.render(l,fa),c.envMap.value=a.texture,c.roughness.value=0,c.mipInt.value=g-i,kr(e,M,m,3*x,2*x),r.setRenderTarget(e),r.render(l,fa)}_blur(e,t,i,r){const a=this._pingPongRenderTarget,o=Math.min(r,Math.PI)/Math.SQRT2;this._blurPass(e,a,t,i,o),this._blurPass(a,e,i,i,o)}_blurPass(e,t,i,r,a){const o=this._renderer,l=this._blurMaterial,c=this._lodMeshes[r];c.material=l;const u=l.uniforms;u.envMap.value=e.texture,u.sigma.value=a,u.mipInt.value=this._lodMax-i;const h=this._sizeLods[r],f=3*h*(r>this._lodMax-Xr?r-this._lodMax+Xr:0),d=4*(this._cubeSize-h);kr(t,f,d,3*h,2*h),o.setRenderTarget(t),o.render(c,fa)}}function y2(n){const e=[],t=[];let i=n;const r=n-Xr+1+v2;for(let a=0;a<r;a++){const o=Math.pow(2,i);e.push(o);const l=1/(o-2),c=-l,u=1+l,h=[c,c,u,c,u,u,c,c,u,u,c,u],f=6,d=6,p=3,g=new Float32Array(p*d*f),x=new Float32Array(p*d*f);for(let m=0;m<f;m++){const _=m%3*2/3-1,y=m>2?0:-1,S=[_,y,0,_+2/3,y,0,_+2/3,y+1,0,_,y,0,_+2/3,y+1,0,_,y+1,0];g.set(S,p*d*m);for(let R=0;R<d;R++){const A=h[R*2]*2-1,D=h[R*2+1]*2-1;m===0?lr.set(1,D,A):m===1?lr.set(-A,1,-D):m===2?lr.set(-A,D,1):m===3?lr.set(-1,D,-A):m===4?lr.set(-A,-1,D):lr.set(A,D,-1),lr.toArray(x,(m*d+R)*p)}}const M=new vi;M.setAttribute("position",new mi(g,p)),M.setAttribute("outputDirection",new mi(x,p)),t.push(new wn(M,null)),i>Xr&&i--}return{lodMeshes:t,sizeLods:e}}function Zc(n,e,t){const i=new Gn(n,e,t);return i.texture.mapping=Bs,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function kr(n,e,t,i,r){n.viewport.set(e,t,i,r),n.scissor.set(e,t,i,r)}function w2(n,e,t){return new vn({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:S2,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:zs(),fragmentShader:`

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
		`,blending:Fi,depthTest:!1,depthWrite:!1})}function A2(n,e,t){return new vn({name:"SphericalGaussianBlur",defines:{SAMPLES:b2,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},sigma:{value:0},mipInt:{value:0}},vertexShader:zs(),fragmentShader:`

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
		`,blending:Fi,depthTest:!1,depthWrite:!1})}function $c(){return new vn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:zs(),fragmentShader:`

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
		`,blending:Fi,depthTest:!1,depthWrite:!1})}function Jc(){return new vn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:zs(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Fi,depthTest:!1,depthWrite:!1})}function zs(){return`

		precision mediump float;
		precision mediump int;

		attribute vec3 outputDirection;

		varying vec3 vOutputDirection;

		void main() {

			vOutputDirection = outputDirection;
			gl_Position = vec4( position, 1.0 );

		}
	`}class Lh extends Gn{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const i={width:e,height:e,depth:1},r=[i,i,i,i,i,i];this.texture=new Sh(r),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},r=new Na(5,5,5),a=new vn({name:"CubemapFromEquirect",uniforms:Qr(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:Cn,blending:Fi});a.uniforms.tEquirect.value=t;const o=new wn(r,a),l=t.minFilter;return t.minFilter===fr&&(t.minFilter=$t),new L1(1,10,this).update(e,o),t.minFilter=l,o.geometry.dispose(),o.material.dispose(),this}clear(e,t=!0,i=!0,r=!0){const a=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(t,i,r);e.setRenderTarget(a)}}function T2(n){let e=new WeakMap,t=new WeakMap,i=null;function r(d,p=!1){return d==null?null:p?o(d):a(d)}function a(d){if(d&&d.isTexture){const p=d.mapping;if(p===$s||p===Js)if(e.has(d)){const g=e.get(d).texture;return l(g,d.mapping)}else{const g=d.image;if(g&&g.height>0){const x=new Lh(g.height);return x.fromEquirectangularTexture(n,d),e.set(d,x),d.addEventListener("dispose",u),l(x.texture,d.mapping)}else return null}}return d}function o(d){if(d&&d.isTexture){const p=d.mapping,g=p===$s||p===Js,x=p===vr||p===Jr;if(g||x){let M=t.get(d);const m=M!==void 0?M.texture.pmremVersion:0;if(d.isRenderTargetTexture&&d.pmremVersion!==m)return i===null&&(i=new qc(n)),M=g?i.fromEquirectangular(d,M):i.fromCubemap(d,M),M.texture.pmremVersion=d.pmremVersion,t.set(d,M),M.texture;if(M!==void 0)return M.texture;{const _=d.image;return g&&_&&_.height>0||x&&_&&c(_)?(i===null&&(i=new qc(n)),M=g?i.fromEquirectangular(d):i.fromCubemap(d),M.texture.pmremVersion=d.pmremVersion,t.set(d,M),d.addEventListener("dispose",h),M.texture):null}}}return d}function l(d,p){return p===$s?d.mapping=vr:p===Js&&(d.mapping=Jr),d}function c(d){let p=0;const g=6;for(let x=0;x<g;x++)d[x]!==void 0&&p++;return p===g}function u(d){const p=d.target;p.removeEventListener("dispose",u);const g=e.get(p);g!==void 0&&(e.delete(p),g.dispose())}function h(d){const p=d.target;p.removeEventListener("dispose",h);const g=t.get(p);g!==void 0&&(t.delete(p),g.dispose())}function f(){e=new WeakMap,t=new WeakMap,i!==null&&(i.dispose(),i=null)}return{get:r,dispose:f}}function R2(n){const e={};function t(i){if(e[i]!==void 0)return e[i];const r=n.getExtension(i);return e[i]=r,r}return{has:function(i){return t(i)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(i){const r=t(i);return r===null&&qr("WebGLRenderer: "+i+" extension not supported."),r}}}function C2(n,e,t,i){const r={},a=new WeakMap;function o(f){const d=f.target;d.index!==null&&e.remove(d.index);for(const g in d.attributes)e.remove(d.attributes[g]);d.removeEventListener("dispose",o),delete r[d.id];const p=a.get(d);p&&(e.remove(p),a.delete(d)),i.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,t.memory.geometries--}function l(f,d){return r[d.id]===!0||(d.addEventListener("dispose",o),r[d.id]=!0,t.memory.geometries++),d}function c(f){const d=f.attributes;for(const p in d)e.update(d[p],n.ARRAY_BUFFER)}function u(f){const d=[],p=f.index,g=f.attributes.position;let x=0;if(g===void 0)return;if(p!==null){const _=p.array;x=p.version;for(let y=0,S=_.length;y<S;y+=3){const R=_[y+0],A=_[y+1],D=_[y+2];d.push(R,A,A,D,D,R)}}else{const _=g.array;x=g.version;for(let y=0,S=_.length/3-1;y<S;y+=3){const R=y+0,A=y+1,D=y+2;d.push(R,A,A,D,D,R)}}const M=new(g.count>=65535?_h:xh)(d,1);M.version=x;const m=a.get(f);m&&e.remove(m),a.set(f,M)}function h(f){const d=a.get(f);if(d){const p=f.index;p!==null&&d.version<p.version&&u(f)}else u(f);return a.get(f)}return{get:l,update:c,getWireframeAttribute:h}}function L2(n,e,t){let i;function r(f){i=f}let a,o;function l(f){a=f.type,o=f.bytesPerElement}function c(f,d){n.drawElements(i,d,a,f*o),t.update(d,i,1)}function u(f,d,p){p!==0&&(n.drawElementsInstanced(i,d,a,f*o,p),t.update(d,i,p))}function h(f,d,p){if(p===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,d,0,a,f,0,p);let x=0;for(let M=0;M<p;M++)x+=d[M];t.update(x,i,1)}this.setMode=r,this.setIndex=l,this.render=c,this.renderInstances=u,this.renderMultiDraw=h}function D2(n){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function i(a,o,l){switch(t.calls++,o){case n.TRIANGLES:t.triangles+=l*(a/3);break;case n.LINES:t.lines+=l*(a/2);break;case n.LINE_STRIP:t.lines+=l*(a-1);break;case n.LINE_LOOP:t.lines+=l*a;break;case n.POINTS:t.points+=l*a;break;default:pt("WebGLInfo: Unknown draw mode:",o);break}}function r(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:r,update:i}}function P2(n,e,t){const i=new WeakMap,r=new kt;function a(o,l,c){const u=o.morphTargetInfluences,h=l.morphAttributes.position||l.morphAttributes.normal||l.morphAttributes.color,f=h!==void 0?h.length:0;let d=i.get(l);if(d===void 0||d.count!==f){let w=function(){D.dispose(),i.delete(l),l.removeEventListener("dispose",w)};d!==void 0&&d.texture.dispose();const p=l.morphAttributes.position!==void 0,g=l.morphAttributes.normal!==void 0,x=l.morphAttributes.color!==void 0,M=l.morphAttributes.position||[],m=l.morphAttributes.normal||[],_=l.morphAttributes.color||[];let y=0;p===!0&&(y=1),g===!0&&(y=2),x===!0&&(y=3);let S=l.attributes.position.count*y,R=1;S>e.maxTextureSize&&(R=Math.ceil(S/e.maxTextureSize),S=e.maxTextureSize);const A=new Float32Array(S*R*4*f),D=new gh(A,S,R,f);D.type=fi,D.needsUpdate=!0;const b=y*4;for(let L=0;L<f;L++){const C=M[L],I=m[L],N=_[L],O=S*R*4*L;for(let B=0;B<C.count;B++){const W=B*b;p===!0&&(r.fromBufferAttribute(C,B),A[O+W+0]=r.x,A[O+W+1]=r.y,A[O+W+2]=r.z,A[O+W+3]=0),g===!0&&(r.fromBufferAttribute(I,B),A[O+W+4]=r.x,A[O+W+5]=r.y,A[O+W+6]=r.z,A[O+W+7]=0),x===!0&&(r.fromBufferAttribute(N,B),A[O+W+8]=r.x,A[O+W+9]=r.y,A[O+W+10]=r.z,A[O+W+11]=N.itemSize===4?r.w:1)}}d={count:f,texture:D,size:new Ze(S,R)},i.set(l,d),l.addEventListener("dispose",w)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)c.getUniforms().setValue(n,"morphTexture",o.morphTexture,t);else{let p=0;for(let x=0;x<u.length;x++)p+=u[x];const g=l.morphTargetsRelative?1:1-p;c.getUniforms().setValue(n,"morphTargetBaseInfluence",g),c.getUniforms().setValue(n,"morphTargetInfluences",u)}c.getUniforms().setValue(n,"morphTargetsTexture",d.texture,t),c.getUniforms().setValue(n,"morphTargetsTextureSize",d.size)}return{update:a}}function O2(n,e,t,i,r){let a=new WeakMap;function o(u){const h=r.render.frame,f=u.geometry,d=e.get(u,f);if(a.get(d)!==h&&(e.update(d),a.set(d,h)),u.isInstancedMesh&&(u.hasEventListener("dispose",c)===!1&&u.addEventListener("dispose",c),a.get(u)!==h&&(t.update(u.instanceMatrix,n.ARRAY_BUFFER),u.instanceColor!==null&&t.update(u.instanceColor,n.ARRAY_BUFFER),a.set(u,h))),u.isSkinnedMesh){const p=u.skeleton;a.get(p)!==h&&(p.update(),a.set(p,h))}return d}function l(){a=new WeakMap}function c(u){const h=u.target;h.removeEventListener("dispose",c),i.releaseStatesOfObject(h),t.remove(h.instanceMatrix),h.instanceColor!==null&&t.remove(h.instanceColor)}return{update:o,dispose:l}}const I2={[Qu]:"LINEAR_TONE_MAPPING",[ju]:"REINHARD_TONE_MAPPING",[eh]:"CINEON_TONE_MAPPING",[th]:"ACES_FILMIC_TONE_MAPPING",[ih]:"AGX_TONE_MAPPING",[rh]:"NEUTRAL_TONE_MAPPING",[nh]:"CUSTOM_TONE_MAPPING"};function N2(n,e,t,i,r,a){const o=new Gn(e,t,{type:n,depthBuffer:r,stencilBuffer:a,samples:i?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1});let l=null,c=null;const u=new vi;u.setAttribute("position",new Bi([-1,3,0,-1,-1,0,3,-1,0],3)),u.setAttribute("uv",new Bi([0,2,0,0,2,0],2));const h=new T1({uniforms:{tDiffuse:{value:null}},vertexShader:`
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
			}`,depthTest:!1,depthWrite:!1}),f=new wn(u,h),d=new Ql(-1,1,1,-1,0,1);let p=null,g=null,x=!1,M,m=null,_=[],y=!1;this.setSize=function(S,R){o.setSize(S,R),l!==null&&l.setSize(S,R),c!==null&&c.setSize(S,R);for(let A=0;A<_.length;A++){const D=_[A];D.setSize&&D.setSize(S,R)}},this.setEffects=function(S){_=S,y=_.length>0&&_[0].isRenderPass===!0;const R=o.width,A=o.height;_.length>0&&l===null&&(l=new Gn(R,A,{type:_i,depthBuffer:!1,stencilBuffer:!1}),c=new Gn(R,A,{type:_i,depthBuffer:!1,stencilBuffer:!1}));for(let D=0;D<_.length;D++){const b=_[D];b.setSize&&b.setSize(R,A)}},this.begin=function(S,R){if(x||S.toneMapping===gi&&_.length===0)return!1;if(m=R,R!==null){const A=R.width,D=R.height;(o.width!==A||o.height!==D)&&this.setSize(A,D)}return y===!1&&S.setRenderTarget(o),M=S.toneMapping,S.toneMapping=gi,!0},this.hasRenderPass=function(){return y},this.end=function(S,R){S.toneMapping=M,x=!0;let A=o,D=l;for(let b=0;b<_.length;b++){const w=_[b];w.enabled!==!1&&(w.render(S,D,A,R),w.needsSwap!==!1&&(A=D,D=D===l?c:l))}if(p!==S.outputColorSpace||g!==S.toneMapping){p=S.outputColorSpace,g=S.toneMapping,h.defines={},lt.getTransfer(p)===yt&&(h.defines.SRGB_TRANSFER="");const b=I2[g];b&&(h.defines[b]=""),h.needsUpdate=!0}h.uniforms.tDiffuse.value=A.texture,S.setRenderTarget(m),S.render(f,d),m=null,x=!1},this.isCompositing=function(){return x},this.dispose=function(){o.dispose(),l!==null&&l.dispose(),c!==null&&c.dispose(),u.dispose(),h.dispose()}}const Dh=new yn,yl=new Da(1,1),Ph=new gh,Oh=new r1,Ih=new Sh,Qc=[],jc=[],eu=new Float32Array(16),tu=new Float32Array(9),nu=new Float32Array(4);function ra(n,e,t){const i=n[0];if(i<=0||i>0)return n;const r=e*t;let a=Qc[r];if(a===void 0&&(a=new Float32Array(r),Qc[r]=a),e!==0){i.toArray(a,0);for(let o=1,l=0;o!==e;++o)l+=t,n[o].toArray(a,l)}return a}function nn(n,e){if(n.length!==e.length)return!1;for(let t=0,i=n.length;t<i;t++)if(n[t]!==e[t])return!1;return!0}function rn(n,e){for(let t=0,i=e.length;t<i;t++)n[t]=e[t]}function Hs(n,e){let t=jc[e];t===void 0&&(t=new Int32Array(e),jc[e]=t);for(let i=0;i!==e;++i)t[i]=n.allocateTextureUnit();return t}function F2(n,e){const t=this.cache;t[0]!==e&&(n.uniform1f(this.addr,e),t[0]=e)}function U2(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(nn(t,e))return;n.uniform2fv(this.addr,e),rn(t,e)}}function B2(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(n.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(nn(t,e))return;n.uniform3fv(this.addr,e),rn(t,e)}}function k2(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(nn(t,e))return;n.uniform4fv(this.addr,e),rn(t,e)}}function z2(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(nn(t,e))return;n.uniformMatrix2fv(this.addr,!1,e),rn(t,e)}else{if(nn(t,i))return;nu.set(i),n.uniformMatrix2fv(this.addr,!1,nu),rn(t,i)}}function H2(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(nn(t,e))return;n.uniformMatrix3fv(this.addr,!1,e),rn(t,e)}else{if(nn(t,i))return;tu.set(i),n.uniformMatrix3fv(this.addr,!1,tu),rn(t,i)}}function G2(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(nn(t,e))return;n.uniformMatrix4fv(this.addr,!1,e),rn(t,e)}else{if(nn(t,i))return;eu.set(i),n.uniformMatrix4fv(this.addr,!1,eu),rn(t,i)}}function W2(n,e){const t=this.cache;t[0]!==e&&(n.uniform1i(this.addr,e),t[0]=e)}function V2(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(nn(t,e))return;n.uniform2iv(this.addr,e),rn(t,e)}}function Y2(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(nn(t,e))return;n.uniform3iv(this.addr,e),rn(t,e)}}function X2(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(nn(t,e))return;n.uniform4iv(this.addr,e),rn(t,e)}}function K2(n,e){const t=this.cache;t[0]!==e&&(n.uniform1ui(this.addr,e),t[0]=e)}function q2(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(nn(t,e))return;n.uniform2uiv(this.addr,e),rn(t,e)}}function Z2(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(nn(t,e))return;n.uniform3uiv(this.addr,e),rn(t,e)}}function $2(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(nn(t,e))return;n.uniform4uiv(this.addr,e),rn(t,e)}}function J2(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r);let a;this.type===n.SAMPLER_2D_SHADOW?(yl.compareFunction=t.isReversedDepthBuffer()?ql:Kl,a=yl):a=Dh,t.setTexture2D(e||a,r)}function Q2(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTexture3D(e||Oh,r)}function j2(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTextureCube(e||Ih,r)}function eM(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTexture2DArray(e||Ph,r)}function tM(n){switch(n){case 5126:return F2;case 35664:return U2;case 35665:return B2;case 35666:return k2;case 35674:return z2;case 35675:return H2;case 35676:return G2;case 5124:case 35670:return W2;case 35667:case 35671:return V2;case 35668:case 35672:return Y2;case 35669:case 35673:return X2;case 5125:return K2;case 36294:return q2;case 36295:return Z2;case 36296:return $2;case 35678:case 36198:case 36298:case 36306:case 35682:return J2;case 35679:case 36299:case 36307:return Q2;case 35680:case 36300:case 36308:case 36293:return j2;case 36289:case 36303:case 36311:case 36292:return eM}}function nM(n,e){n.uniform1fv(this.addr,e)}function iM(n,e){const t=ra(e,this.size,2);n.uniform2fv(this.addr,t)}function rM(n,e){const t=ra(e,this.size,3);n.uniform3fv(this.addr,t)}function aM(n,e){const t=ra(e,this.size,4);n.uniform4fv(this.addr,t)}function sM(n,e){const t=ra(e,this.size,4);n.uniformMatrix2fv(this.addr,!1,t)}function oM(n,e){const t=ra(e,this.size,9);n.uniformMatrix3fv(this.addr,!1,t)}function lM(n,e){const t=ra(e,this.size,16);n.uniformMatrix4fv(this.addr,!1,t)}function cM(n,e){n.uniform1iv(this.addr,e)}function uM(n,e){n.uniform2iv(this.addr,e)}function hM(n,e){n.uniform3iv(this.addr,e)}function dM(n,e){n.uniform4iv(this.addr,e)}function fM(n,e){n.uniform1uiv(this.addr,e)}function pM(n,e){n.uniform2uiv(this.addr,e)}function gM(n,e){n.uniform3uiv(this.addr,e)}function mM(n,e){n.uniform4uiv(this.addr,e)}function MM(n,e,t){const i=this.cache,r=e.length,a=Hs(t,r);nn(i,a)||(n.uniform1iv(this.addr,a),rn(i,a));let o;this.type===n.SAMPLER_2D_SHADOW?o=yl:o=Dh;for(let l=0;l!==r;++l)t.setTexture2D(e[l]||o,a[l])}function xM(n,e,t){const i=this.cache,r=e.length,a=Hs(t,r);nn(i,a)||(n.uniform1iv(this.addr,a),rn(i,a));for(let o=0;o!==r;++o)t.setTexture3D(e[o]||Oh,a[o])}function _M(n,e,t){const i=this.cache,r=e.length,a=Hs(t,r);nn(i,a)||(n.uniform1iv(this.addr,a),rn(i,a));for(let o=0;o!==r;++o)t.setTextureCube(e[o]||Ih,a[o])}function vM(n,e,t){const i=this.cache,r=e.length,a=Hs(t,r);nn(i,a)||(n.uniform1iv(this.addr,a),rn(i,a));for(let o=0;o!==r;++o)t.setTexture2DArray(e[o]||Ph,a[o])}function bM(n){switch(n){case 5126:return nM;case 35664:return iM;case 35665:return rM;case 35666:return aM;case 35674:return sM;case 35675:return oM;case 35676:return lM;case 5124:case 35670:return cM;case 35667:case 35671:return uM;case 35668:case 35672:return hM;case 35669:case 35673:return dM;case 5125:return fM;case 36294:return pM;case 36295:return gM;case 36296:return mM;case 35678:case 36198:case 36298:case 36306:case 35682:return MM;case 35679:case 36299:case 36307:return xM;case 35680:case 36300:case 36308:case 36293:return _M;case 36289:case 36303:case 36311:case 36292:return vM}}class SM{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.setValue=tM(t.type)}}class EM{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=bM(t.type)}}class yM{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,i){const r=this.seq;for(let a=0,o=r.length;a!==o;++a){const l=r[a];l.setValue(e,t[l.id],i)}}}const To=/(\w+)(\])?(\[|\.)?/g;function iu(n,e){n.seq.push(e),n.map[e.id]=e}function wM(n,e,t){const i=n.name,r=i.length;for(To.lastIndex=0;;){const a=To.exec(i),o=To.lastIndex;let l=a[1];const c=a[2]==="]",u=a[3];if(c&&(l=l|0),u===void 0||u==="["&&o+2===r){iu(t,u===void 0?new SM(l,n,e):new EM(l,n,e));break}else{let f=t.map[l];f===void 0&&(f=new yM(l),iu(t,f)),t=f}}}class ys{constructor(e,t){this.seq=[],this.map={};const i=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let o=0;o<i;++o){const l=e.getActiveUniform(t,o),c=e.getUniformLocation(t,l.name);wM(l,c,this)}const r=[],a=[];for(const o of this.seq)o.type===e.SAMPLER_2D_SHADOW||o.type===e.SAMPLER_CUBE_SHADOW||o.type===e.SAMPLER_2D_ARRAY_SHADOW?r.push(o):a.push(o);r.length>0&&(this.seq=r.concat(a))}setValue(e,t,i,r){const a=this.map[t];a!==void 0&&a.setValue(e,i,r)}setOptional(e,t,i){const r=t[i];r!==void 0&&this.setValue(e,i,r)}static upload(e,t,i,r){for(let a=0,o=t.length;a!==o;++a){const l=t[a],c=i[l.id];c.needsUpdate!==!1&&l.setValue(e,c.value,r)}}static seqWithValue(e,t){const i=[];for(let r=0,a=e.length;r!==a;++r){const o=e[r];o.id in t&&i.push(o)}return i}}function ru(n,e,t){const i=n.createShader(e);return n.shaderSource(i,t),n.compileShader(i),i}const AM=37297;let TM=0;function RM(n,e){const t=n.split(`
`),i=[],r=Math.max(e-6,0),a=Math.min(e+6,t.length);for(let o=r;o<a;o++){const l=o+1;i.push(`${l===e?">":" "} ${l}: ${t[o]}`)}return i.join(`
`)}const au=new qe;function CM(n){lt._getMatrix(au,lt.workingColorSpace,n);const e=`mat3( ${au.elements.map(t=>t.toFixed(4))} )`;switch(lt.getTransfer(n)){case Ls:return[e,"LinearTransferOETF"];case yt:return[e,"sRGBTransferOETF"];default:return Ke("WebGLProgram: Unsupported color space: ",n),[e,"LinearTransferOETF"]}}function su(n,e,t){const i=n.getShaderParameter(e,n.COMPILE_STATUS),a=(n.getShaderInfoLog(e)||"").trim();if(i&&a==="")return"";const o=/ERROR: 0:(\d+)/.exec(a);if(o){const l=parseInt(o[1]);return t.toUpperCase()+`

`+a+`

`+RM(n.getShaderSource(e),l)}else return a}function LM(n,e){const t=CM(e);return[`vec4 ${n}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}const DM={[Qu]:"Linear",[ju]:"Reinhard",[eh]:"Cineon",[th]:"ACESFilmic",[ih]:"AgX",[rh]:"Neutral",[nh]:"Custom"};function PM(n,e){const t=DM[e];return t===void 0?(Ke("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+n+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+n+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const us=new Y;function OM(){lt.getLuminanceCoefficients(us);const n=us.x.toFixed(4),e=us.y.toFixed(4),t=us.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${n}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function IM(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",n.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(va).join(`
`)}function NM(n){const e=[];for(const t in n){const i=n[t];i!==!1&&e.push("#define "+t+" "+i)}return e.join(`
`)}function FM(n,e){const t={},i=n.getProgramParameter(e,n.ACTIVE_ATTRIBUTES);for(let r=0;r<i;r++){const a=n.getActiveAttrib(e,r),o=a.name;let l=1;a.type===n.FLOAT_MAT2&&(l=2),a.type===n.FLOAT_MAT3&&(l=3),a.type===n.FLOAT_MAT4&&(l=4),t[o]={type:a.type,location:n.getAttribLocation(e,o),locationSize:l}}return t}function va(n){return n!==""}function ou(n,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return n.replace(/NUM_SUN_LIGHTS/g,e.numSunLights).replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,e.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function lu(n,e){return n.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const UM=/^[ \t]*#include +<([\w\d./]+)>/gm;function wl(n){return n.replace(UM,kM)}const BM=new Map;function kM(n,e){let t=st[e];if(t===void 0){const i=BM.get(e);if(i!==void 0)t=st[i],Ke('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,i);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+e+">")}return wl(t)}const zM=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function cu(n){return n.replace(zM,HM)}function HM(n,e,t,i){let r="";for(let a=parseInt(e);a<parseInt(t);a++)r+=i.replace(/\[\s*i\s*\]/g,"[ "+a+" ]").replace(/UNROLLED_LOOP_INDEX/g,a);return r}function uu(n){let e=`precision ${n.precision} float;
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
#define LOW_PRECISION`),e}const GM={[_s]:"SHADOWMAP_TYPE_PCF",[_a]:"SHADOWMAP_TYPE_VSM"};function WM(n){return GM[n.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const VM={[vr]:"ENVMAP_TYPE_CUBE",[Jr]:"ENVMAP_TYPE_CUBE",[Bs]:"ENVMAP_TYPE_CUBE_UV"};function YM(n){return n.envMap===!1?"ENVMAP_TYPE_CUBE":VM[n.envMapMode]||"ENVMAP_TYPE_CUBE"}const XM={[Jr]:"ENVMAP_MODE_REFRACTION"};function KM(n){return n.envMap===!1?"ENVMAP_MODE_REFLECTION":XM[n.envMapMode]||"ENVMAP_MODE_REFLECTION"}const qM={[Ju]:"ENVMAP_BLENDING_MULTIPLY",[Np]:"ENVMAP_BLENDING_MIX",[Fp]:"ENVMAP_BLENDING_ADD"};function ZM(n){return n.envMap===!1?"ENVMAP_BLENDING_NONE":qM[n.combine]||"ENVMAP_BLENDING_NONE"}function $M(n){const e=n.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,i=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:i,maxMip:t}}function JM(n,e,t,i){const r=n.getContext(),a=t.defines;let o=t.vertexShader,l=t.fragmentShader;const c=WM(t),u=YM(t),h=KM(t),f=ZM(t),d=$M(t),p=IM(t),g=NM(a),x=r.createProgram();let M,m,_=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(M=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(va).join(`
`),M.length>0&&(M+=`
`),m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(va).join(`
`),m.length>0&&(m+=`
`)):(M=[uu(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexNormals?"#define HAS_NORMAL":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(va).join(`
`),m=[uu(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.envMap?"#define "+h:"",t.envMap?"#define "+f:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.retroreflection?"#define USE_RETROREFLECTION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas||t.batchingColor?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==gi?"#define TONE_MAPPING":"",t.toneMapping!==gi?st.tonemapping_pars_fragment:"",t.toneMapping!==gi?PM("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",st.colorspace_pars_fragment,LM("linearToOutputTexel",t.outputColorSpace),OM(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(va).join(`
`)),o=wl(o),o=ou(o,t),o=lu(o,t),l=wl(l),l=ou(l,t),l=lu(l,t),o=cu(o),l=cu(l),t.isRawShaderMaterial!==!0&&(_=`#version 300 es
`,M=[p,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+M,m=["#define varying in",t.glslVersion===Ac?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Ac?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+m);const y=_+M+o,S=_+m+l,R=ru(r,r.VERTEX_SHADER,y),A=ru(r,r.FRAGMENT_SHADER,S);r.attachShader(x,R),r.attachShader(x,A),t.index0AttributeName!==void 0?r.bindAttribLocation(x,0,t.index0AttributeName):t.hasPositionAttribute===!0&&r.bindAttribLocation(x,0,"position"),r.linkProgram(x);function D(C){if(n.debug.checkShaderErrors){const I=r.getProgramInfoLog(x)||"",N=r.getShaderInfoLog(R)||"",O=r.getShaderInfoLog(A)||"",B=I.trim(),W=N.trim(),$=O.trim();let ae=!0,q=!0;if(r.getProgramParameter(x,r.LINK_STATUS)===!1)if(ae=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(r,x,R,A);else{const ee=su(r,R,"vertex"),F=su(r,A,"fragment");pt("WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(x,r.VALIDATE_STATUS)+`

Material Name: `+C.name+`
Material Type: `+C.type+`

Program Info Log: `+B+`
`+ee+`
`+F)}else B!==""?Ke("WebGLProgram: Program Info Log:",B):(W===""||$==="")&&(q=!1);q&&(C.diagnostics={runnable:ae,programLog:B,vertexShader:{log:W,prefix:M},fragmentShader:{log:$,prefix:m}})}r.deleteShader(R),r.deleteShader(A),b=new ys(r,x),w=FM(r,x)}let b;this.getUniforms=function(){return b===void 0&&D(this),b};let w;this.getAttributes=function(){return w===void 0&&D(this),w};let L=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return L===!1&&(L=r.getProgramParameter(x,AM)),L},this.destroy=function(){i.releaseStatesOfProgram(this),r.deleteProgram(x),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=TM++,this.cacheKey=e,this.usedTimes=1,this.program=x,this.vertexShader=R,this.fragmentShader=A,this}let QM=0;class jM{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,i){const r=this._getShaderCacheForMaterial(e);return r.has(t)===!1&&(r.add(t),t.usedTimes++),r.has(i)===!1&&(r.add(i),i.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const i of t)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let i=t.get(e);return i===void 0&&(i=new Set,t.set(e,i)),i}_getShaderStage(e){const t=this.shaderCache;let i=t.get(e);return i===void 0&&(i=new ex(e),t.set(e,i)),i}}class ex{constructor(e){this.id=QM++,this.code=e,this.usedTimes=0}}function tx(n){return n===br||n===Rs||n===Cs}function nx(n,e,t,i,r,a){const o=new mh,l=new jM,c=new Set,u=[],h=new Map,f=i.logarithmicDepthBuffer;let d=i.precision;const p={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function g(b){return c.add(b),b===0?"uv":`uv${b}`}function x(b,w,L,C,I,N){const O=C.fog,B=I.geometry,W=b.isMeshStandardMaterial||b.isMeshLambertMaterial||b.isMeshPhongMaterial?C.environment:null,$=b.isMeshStandardMaterial||b.isMeshLambertMaterial&&!b.envMap||b.isMeshPhongMaterial&&!b.envMap,ae=e.get(b.envMap||W,$),q=ae&&ae.mapping===Bs?ae.image.height:null,ee=p[b.type];b.precision!==null&&(d=i.getMaxPrecision(b.precision),d!==b.precision&&Ke("WebGLProgram.getParameters:",b.precision,"not supported, using",d,"instead."));const F=B.morphAttributes.position||B.morphAttributes.normal||B.morphAttributes.color,re=F!==void 0?F.length:0;let ue=0;B.morphAttributes.position!==void 0&&(ue=1),B.morphAttributes.normal!==void 0&&(ue=2),B.morphAttributes.color!==void 0&&(ue=3);let Pe,He,Xe,j;if(ee){const Pt=ci[ee];Pe=Pt.vertexShader,He=Pt.fragmentShader}else{Pe=b.vertexShader,He=b.fragmentShader;const Pt=l.getVertexShaderStage(b),xt=l.getFragmentShaderStage(b);l.update(b,Pt,xt),Xe=Pt.id,j=xt.id}const ie=n.getRenderTarget(),G=n.state.buffers.depth.getReversed(),he=I.isInstancedMesh===!0,se=I.isBatchedMesh===!0,Ae=!!b.map,tt=!!b.matcap,Oe=!!ae,ze=!!b.aoMap,Je=!!b.lightMap,$e=!!b.bumpMap&&b.wireframe===!1,Ct=!!b.normalMap,zt=!!b.displacementMap,an=!!b.emissiveMap,At=!!b.metalnessMap,Lt=!!b.roughnessMap,z=b.anisotropy>0,rt=b.clearcoat>0,Ve=b.dispersion>0,P=b.retroreflectivity>0,v=b.iridescence>0,U=b.sheen>0,V=b.transmission>0,Z=z&&!!b.anisotropyMap,le=rt&&!!b.clearcoatMap,fe=rt&&!!b.clearcoatNormalMap,Q=rt&&!!b.clearcoatRoughnessMap,te=v&&!!b.iridescenceMap,pe=v&&!!b.iridescenceThicknessMap,Ie=U&&!!b.sheenColorMap,ve=U&&!!b.sheenRoughnessMap,Me=!!b.specularMap,Be=!!b.specularColorMap,We=!!b.specularIntensityMap,Qe=V&&!!b.transmissionMap,H=V&&!!b.thicknessMap,xe=!!b.gradientMap,ne=!!b.alphaMap,_e=b.alphaTest>0,ye=!!b.alphaHash,oe=!!b.extensions;let ke=gi;b.toneMapped&&(ie===null||ie.isXRRenderTarget===!0)&&(ke=n.toneMapping);const Ne={shaderID:ee,shaderType:b.type,shaderName:b.name,vertexShader:Pe,fragmentShader:He,defines:b.defines,customVertexShaderID:Xe,customFragmentShaderID:j,isRawShaderMaterial:b.isRawShaderMaterial===!0,glslVersion:b.glslVersion,precision:d,batching:se,batchingColor:se&&I._colorsTexture!==null,instancing:he,instancingColor:he&&I.instanceColor!==null,instancingMorph:he&&I.morphTexture!==null,outputColorSpace:ie===null?n.outputColorSpace:ie.isXRRenderTarget===!0?ie.texture.colorSpace:lt.workingColorSpace,alphaToCoverage:!!b.alphaToCoverage,map:Ae,matcap:tt,envMap:Oe,envMapMode:Oe&&ae.mapping,envMapCubeUVHeight:q,aoMap:ze,lightMap:Je,bumpMap:$e,normalMap:Ct,displacementMap:zt,emissiveMap:an,normalMapObjectSpace:Ct&&b.normalMapType===kp,normalMapTangentSpace:Ct&&b.normalMapType===wc,packedNormalMap:Ct&&b.normalMapType===wc&&tx(b.normalMap.format),metalnessMap:At,roughnessMap:Lt,anisotropy:z,anisotropyMap:Z,clearcoat:rt,clearcoatMap:le,clearcoatNormalMap:fe,clearcoatRoughnessMap:Q,dispersion:Ve,retroreflection:P,iridescence:v,iridescenceMap:te,iridescenceThicknessMap:pe,sheen:U,sheenColorMap:Ie,sheenRoughnessMap:ve,specularMap:Me,specularColorMap:Be,specularIntensityMap:We,transmission:V,transmissionMap:Qe,thicknessMap:H,gradientMap:xe,opaque:b.transparent===!1&&b.blending===ya&&b.alphaToCoverage===!1,alphaMap:ne,alphaTest:_e,alphaHash:ye,combine:b.combine,mapUv:Ae&&g(b.map.channel),aoMapUv:ze&&g(b.aoMap.channel),lightMapUv:Je&&g(b.lightMap.channel),bumpMapUv:$e&&g(b.bumpMap.channel),normalMapUv:Ct&&g(b.normalMap.channel),displacementMapUv:zt&&g(b.displacementMap.channel),emissiveMapUv:an&&g(b.emissiveMap.channel),metalnessMapUv:At&&g(b.metalnessMap.channel),roughnessMapUv:Lt&&g(b.roughnessMap.channel),anisotropyMapUv:Z&&g(b.anisotropyMap.channel),clearcoatMapUv:le&&g(b.clearcoatMap.channel),clearcoatNormalMapUv:fe&&g(b.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Q&&g(b.clearcoatRoughnessMap.channel),iridescenceMapUv:te&&g(b.iridescenceMap.channel),iridescenceThicknessMapUv:pe&&g(b.iridescenceThicknessMap.channel),sheenColorMapUv:Ie&&g(b.sheenColorMap.channel),sheenRoughnessMapUv:ve&&g(b.sheenRoughnessMap.channel),specularMapUv:Me&&g(b.specularMap.channel),specularColorMapUv:Be&&g(b.specularColorMap.channel),specularIntensityMapUv:We&&g(b.specularIntensityMap.channel),transmissionMapUv:Qe&&g(b.transmissionMap.channel),thicknessMapUv:H&&g(b.thicknessMap.channel),alphaMapUv:ne&&g(b.alphaMap.channel),vertexTangents:!!B.attributes.tangent&&(Ct||z),vertexNormals:!!B.attributes.normal,vertexColors:b.vertexColors,vertexAlphas:b.vertexColors===!0&&!!B.attributes.color&&B.attributes.color.itemSize===4,pointsUvs:I.isPoints===!0&&!!B.attributes.uv&&(Ae||ne),fog:!!O,useFog:b.fog===!0,fogExp2:!!O&&O.isFogExp2,flatShading:b.wireframe===!1&&(b.flatShading===!0||B.attributes.normal===void 0&&Ct===!1&&(b.isMeshLambertMaterial||b.isMeshPhongMaterial||b.isMeshStandardMaterial||b.isMeshPhysicalMaterial)),sizeAttenuation:b.sizeAttenuation===!0,logarithmicDepthBuffer:f,reversedDepthBuffer:G,skinning:I.isSkinnedMesh===!0,hasPositionAttribute:B.attributes.position!==void 0,morphTargets:B.morphAttributes.position!==void 0,morphNormals:B.morphAttributes.normal!==void 0,morphColors:B.morphAttributes.color!==void 0,morphTargetsCount:re,morphTextureStride:ue,numSunLights:w.sun.length,numDirLights:w.directional.length,numPointLights:w.point.length,numSpotLights:w.spot.length,numSpotLightMaps:w.spotLightMap.length,numRectAreaLights:w.rectArea.length,numHemiLights:w.hemi.length,numSunLightShadows:w.sunShadowMap.length,numDirLightShadows:w.directionalShadowMap.length,numPointLightShadows:w.pointShadowMap.length,numSpotLightShadows:w.spotShadowMap.length,numSpotLightShadowsWithMaps:w.numSpotLightShadowsWithMaps,numLightProbes:w.numLightProbes,numLightProbeGrids:N.length,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:b.dithering,shadowMapEnabled:n.shadowMap.enabled&&L.length>0,shadowMapType:n.shadowMap.type,toneMapping:ke,decodeVideoTexture:Ae&&b.map.isVideoTexture===!0&&lt.getTransfer(b.map.colorSpace)===yt,decodeVideoTextureEmissive:an&&b.emissiveMap.isVideoTexture===!0&&lt.getTransfer(b.emissiveMap.colorSpace)===yt,premultipliedAlpha:b.premultipliedAlpha,doubleSided:b.side===Li,flipSided:b.side===Cn,useDepthPacking:b.depthPacking>=0,depthPacking:b.depthPacking||0,index0AttributeName:b.index0AttributeName,extensionClipCullDistance:oe&&b.extensions.clipCullDistance===!0&&t.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(oe&&b.extensions.multiDraw===!0||se)&&t.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:t.has("KHR_parallel_shader_compile"),customProgramCacheKey:b.customProgramCacheKey()};return Ne.vertexUv1s=c.has(1),Ne.vertexUv2s=c.has(2),Ne.vertexUv3s=c.has(3),c.clear(),Ne}function M(b){const w=[];if(b.shaderID?w.push(b.shaderID):(w.push(b.customVertexShaderID),w.push(b.customFragmentShaderID)),b.defines!==void 0)for(const L in b.defines)w.push(L),w.push(b.defines[L]);return b.isRawShaderMaterial===!1&&(m(w,b),_(w,b),w.push(n.outputColorSpace)),w.push(b.customProgramCacheKey),w.join()}function m(b,w){b.push(w.precision),b.push(w.outputColorSpace),b.push(w.envMapMode),b.push(w.envMapCubeUVHeight),b.push(w.mapUv),b.push(w.alphaMapUv),b.push(w.lightMapUv),b.push(w.aoMapUv),b.push(w.bumpMapUv),b.push(w.normalMapUv),b.push(w.displacementMapUv),b.push(w.emissiveMapUv),b.push(w.metalnessMapUv),b.push(w.roughnessMapUv),b.push(w.anisotropyMapUv),b.push(w.clearcoatMapUv),b.push(w.clearcoatNormalMapUv),b.push(w.clearcoatRoughnessMapUv),b.push(w.iridescenceMapUv),b.push(w.iridescenceThicknessMapUv),b.push(w.sheenColorMapUv),b.push(w.sheenRoughnessMapUv),b.push(w.specularMapUv),b.push(w.specularColorMapUv),b.push(w.specularIntensityMapUv),b.push(w.transmissionMapUv),b.push(w.thicknessMapUv),b.push(w.combine),b.push(w.fogExp2),b.push(w.sizeAttenuation),b.push(w.morphTargetsCount),b.push(w.morphAttributeCount),b.push(w.numSunLights),b.push(w.numDirLights),b.push(w.numPointLights),b.push(w.numSpotLights),b.push(w.numSpotLightMaps),b.push(w.numHemiLights),b.push(w.numRectAreaLights),b.push(w.numSunLightShadows),b.push(w.numDirLightShadows),b.push(w.numPointLightShadows),b.push(w.numSpotLightShadows),b.push(w.numSpotLightShadowsWithMaps),b.push(w.numLightProbes),b.push(w.shadowMapType),b.push(w.toneMapping),b.push(w.numClippingPlanes),b.push(w.numClipIntersection),b.push(w.depthPacking)}function _(b,w){o.disableAll(),w.instancing&&o.enable(0),w.instancingColor&&o.enable(1),w.instancingMorph&&o.enable(2),w.matcap&&o.enable(3),w.envMap&&o.enable(4),w.normalMapObjectSpace&&o.enable(5),w.normalMapTangentSpace&&o.enable(6),w.clearcoat&&o.enable(7),w.iridescence&&o.enable(8),w.alphaTest&&o.enable(9),w.vertexColors&&o.enable(10),w.vertexAlphas&&o.enable(11),w.vertexUv1s&&o.enable(12),w.vertexUv2s&&o.enable(13),w.vertexUv3s&&o.enable(14),w.vertexTangents&&o.enable(15),w.anisotropy&&o.enable(16),w.alphaHash&&o.enable(17),w.batching&&o.enable(18),w.dispersion&&o.enable(19),w.retroreflection&&o.enable(24),w.batchingColor&&o.enable(20),w.gradientMap&&o.enable(21),w.packedNormalMap&&o.enable(22),w.vertexNormals&&o.enable(23),b.push(o.mask),o.disableAll(),w.fog&&o.enable(0),w.useFog&&o.enable(1),w.flatShading&&o.enable(2),w.logarithmicDepthBuffer&&o.enable(3),w.reversedDepthBuffer&&o.enable(4),w.skinning&&o.enable(5),w.morphTargets&&o.enable(6),w.morphNormals&&o.enable(7),w.morphColors&&o.enable(8),w.premultipliedAlpha&&o.enable(9),w.shadowMapEnabled&&o.enable(10),w.doubleSided&&o.enable(11),w.flipSided&&o.enable(12),w.useDepthPacking&&o.enable(13),w.dithering&&o.enable(14),w.transmission&&o.enable(15),w.sheen&&o.enable(16),w.opaque&&o.enable(17),w.pointsUvs&&o.enable(18),w.decodeVideoTexture&&o.enable(19),w.decodeVideoTextureEmissive&&o.enable(20),w.alphaToCoverage&&o.enable(21),w.numLightProbeGrids>0&&o.enable(22),w.hasPositionAttribute&&o.enable(23),b.push(o.mask)}function y(b){const w=p[b.type];let L;if(w){const C=ci[w];L=y1.clone(C.uniforms)}else L=b.uniforms;return L}function S(b,w){let L=h.get(w);return L!==void 0?++L.usedTimes:(L=new JM(n,w,b,r),u.push(L),h.set(w,L)),L}function R(b){if(--b.usedTimes===0){const w=u.indexOf(b);u[w]=u[u.length-1],u.pop(),h.delete(b.cacheKey),b.destroy()}}function A(b){l.remove(b)}function D(){l.dispose()}return{getParameters:x,getProgramCacheKey:M,getUniforms:y,acquireProgram:S,releaseProgram:R,releaseShaderCache:A,programs:u,dispose:D}}function ix(){let n=new WeakMap;function e(o){return n.has(o)}function t(o){let l=n.get(o);return l===void 0&&(l={},n.set(o,l)),l}function i(o){n.delete(o)}function r(o,l,c){n.get(o)[l]=c}function a(){n=new WeakMap}return{has:e,get:t,remove:i,update:r,dispose:a}}function rx(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.material.id!==e.material.id?n.material.id-e.material.id:n.materialVariant!==e.materialVariant?n.materialVariant-e.materialVariant:n.z!==e.z?n.z-e.z:n.id-e.id}function hu(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.z!==e.z?e.z-n.z:n.id-e.id}function du(){const n=[];let e=0;const t=[],i=[],r=[];function a(){e=0,t.length=0,i.length=0,r.length=0}function o(d){let p=0;return d.isInstancedMesh&&(p+=2),d.isSkinnedMesh&&(p+=1),p}function l(d,p,g,x,M,m){let _=n[e];return _===void 0?(_={id:d.id,object:d,geometry:p,material:g,materialVariant:o(d),groupOrder:x,renderOrder:d.renderOrder,z:M,group:m},n[e]=_):(_.id=d.id,_.object=d,_.geometry=p,_.material=g,_.materialVariant=o(d),_.groupOrder=x,_.renderOrder=d.renderOrder,_.z=M,_.group=m),e++,_}function c(d,p,g,x,M,m,_){_.reversedDepth===!0&&(M=-M);const y=l(d,p,g,x,M,m);g.transmission>0?i.push(y):g.transparent===!0?r.push(y):t.push(y)}function u(d,p,g,x,M,m){const _=l(d,p,g,x,M,m);g.transmission>0?i.unshift(_):g.transparent===!0?r.unshift(_):t.unshift(_)}function h(d,p){t.length>1&&t.sort(d||rx),i.length>1&&i.sort(p||hu),r.length>1&&r.sort(p||hu)}function f(){for(let d=e,p=n.length;d<p;d++){const g=n[d];if(g.id===null)break;g.id=null,g.object=null,g.geometry=null,g.material=null,g.group=null}}return{opaque:t,transmissive:i,transparent:r,init:a,push:c,unshift:u,finish:f,sort:h}}function ax(){let n=new WeakMap;function e(i,r){const a=n.get(i);let o;return a===void 0?(o=new du,n.set(i,[o])):r>=a.length?(o=new du,a.push(o)):o=a[r],o}function t(){n=new WeakMap}return{get:e,dispose:t}}function sx(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={direction:new Y,color:new Mt};break;case"SpotLight":t={position:new Y,direction:new Y,color:new Mt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new Y,color:new Mt,distance:0,decay:0};break;case"HemisphereLight":t={direction:new Y,skyColor:new Mt,groundColor:new Mt};break;case"RectAreaLight":t={color:new Mt,position:new Y,halfWidth:new Y,halfHeight:new Y};break}return n[e.id]=t,t}}}function ox(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ze};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ze};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ze,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[e.id]=t,t}}}let lx=0;function cx(n,e){return(e.castShadow?2:0)-(n.castShadow?2:0)+(e.map?1:0)-(n.map?1:0)}function ux(n){const e=new sx,t=ox(),i={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let u=0;u<9;u++)i.probe.push(new Y);const r=new Y,a=new Kt,o=new Kt;function l(u){let h=0,f=0,d=0;for(let I=0;I<9;I++)i.probe[I].set(0,0,0);let p=0,g=0,x=0,M=0,m=0,_=0,y=0,S=0,R=0,A=0,D=0,b=0,w=0,L=0;u.sort(cx);for(let I=0,N=u.length;I<N;I++){const O=u[I],B=O.color,W=O.intensity,$=O.distance;let ae=null;if(O.shadow&&O.shadow.map&&(O.shadow.map.texture.format===br?ae=O.shadow.map.texture:ae=O.shadow.map.depthTexture||O.shadow.map.texture),O.isAmbientLight)h+=B.r*W,f+=B.g*W,d+=B.b*W;else if(O.isLightProbe){for(let q=0;q<9;q++)i.probe[q].addScaledVector(O.sh.coefficients[q],W);L++}else if(O.isSunLight){const q=e.get(O);if(q.color.copy(O.color).multiplyScalar(O.intensity),O.castShadow){const ee=O.shadow,F=t.get(O);F.shadowIntensity=ee.intensity,F.shadowBias=ee.bias,F.shadowNormalBias=ee.normalBias,F.shadowRadius=ee.radius,F.shadowMapSize.copy(ee.mapSize).multiply(ee.getFrameExtents()),i.sunShadow[g]=F,i.sunShadowMap[g]=ae;const re=ee.getViewportCount();for(let ue=0;ue<re;ue++)i.sunShadowMatrix[x+ue]=ee.getMatrix(ue),i.sunShadowCascade[x+ue]=ee._cascadeData[ue];x+=re,g++}i.sun[p]=q,p++}else if(O.isDirectionalLight){const q=e.get(O);if(q.color.copy(O.color).multiplyScalar(O.intensity),O.castShadow){const ee=O.shadow,F=t.get(O);F.shadowIntensity=ee.intensity,F.shadowBias=ee.bias,F.shadowNormalBias=ee.normalBias,F.shadowRadius=ee.radius,F.shadowMapSize=ee.mapSize,i.directionalShadow[M]=F,i.directionalShadowMap[M]=ae,i.directionalShadowMatrix[M]=O.shadow.matrix,R++}i.directional[M]=q,M++}else if(O.isSpotLight){const q=e.get(O);q.position.setFromMatrixPosition(O.matrixWorld),q.color.copy(B).multiplyScalar(W),q.distance=$,q.coneCos=Math.cos(O.angle),q.penumbraCos=Math.cos(O.angle*(1-O.penumbra)),q.decay=O.decay,i.spot[_]=q;const ee=O.shadow;if(O.map&&(i.spotLightMap[b]=O.map,b++,ee.updateMatrices(O),O.castShadow&&w++),i.spotLightMatrix[_]=ee.matrix,O.castShadow){const F=t.get(O);F.shadowIntensity=ee.intensity,F.shadowBias=ee.bias,F.shadowNormalBias=ee.normalBias,F.shadowRadius=ee.radius,F.shadowMapSize=ee.mapSize,i.spotShadow[_]=F,i.spotShadowMap[_]=ae,D++}_++}else if(O.isRectAreaLight){const q=e.get(O);q.color.copy(B).multiplyScalar(W),q.halfWidth.set(O.width*.5,0,0),q.halfHeight.set(0,O.height*.5,0),i.rectArea[y]=q,y++}else if(O.isPointLight){const q=e.get(O);if(q.color.copy(O.color).multiplyScalar(O.intensity),q.distance=O.distance,q.decay=O.decay,O.castShadow){const ee=O.shadow,F=t.get(O);F.shadowIntensity=ee.intensity,F.shadowBias=ee.bias,F.shadowNormalBias=ee.normalBias,F.shadowRadius=ee.radius,F.shadowMapSize=ee.mapSize,F.shadowCameraNear=ee.camera.near,F.shadowCameraFar=ee.camera.far,i.pointShadow[m]=F,i.pointShadowMap[m]=ae,i.pointShadowMatrix[m]=O.shadow.matrix,A++}i.point[m]=q,m++}else if(O.isHemisphereLight){const q=e.get(O);q.skyColor.copy(O.color).multiplyScalar(W),q.groundColor.copy(O.groundColor).multiplyScalar(W),i.hemi[S]=q,S++}}y>0&&(n.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=be.LTC_FLOAT_1,i.rectAreaLTC2=be.LTC_FLOAT_2):(i.rectAreaLTC1=be.LTC_HALF_1,i.rectAreaLTC2=be.LTC_HALF_2)),i.ambient[0]=h,i.ambient[1]=f,i.ambient[2]=d;const C=i.hash;(C.sunLength!==p||C.directionalLength!==M||C.pointLength!==m||C.spotLength!==_||C.rectAreaLength!==y||C.hemiLength!==S||C.numSunShadows!==g||C.numDirectionalShadows!==R||C.numPointShadows!==A||C.numSpotShadows!==D||C.numSpotMaps!==b||C.numLightProbes!==L)&&(i.sun.length=p,i.directional.length=M,i.spot.length=_,i.rectArea.length=y,i.point.length=m,i.hemi.length=S,i.sunShadow.length=g,i.sunShadowMap.length=g,i.sunShadowMatrix.length=x,i.sunShadowCascade.length=x,i.directionalShadow.length=R,i.directionalShadowMap.length=R,i.directionalShadowMatrix.length=R,i.pointShadow.length=A,i.pointShadowMap.length=A,i.pointShadowMatrix.length=A,i.spotShadow.length=D,i.spotShadowMap.length=D,i.spotLightMatrix.length=D+b-w,i.spotLightMap.length=b,i.numSpotLightShadowsWithMaps=w,i.numLightProbes=L,C.sunLength=p,C.directionalLength=M,C.pointLength=m,C.spotLength=_,C.rectAreaLength=y,C.hemiLength=S,C.numSunShadows=g,C.numDirectionalShadows=R,C.numPointShadows=A,C.numSpotShadows=D,C.numSpotMaps=b,C.numLightProbes=L,i.version=lx++)}function c(u,h){let f=0,d=0,p=0,g=0,x=0,M=0;const m=h.matrixWorldInverse;for(let _=0,y=u.length;_<y;_++){const S=u[_];if(S.isSunLight){const R=i.sun[f];R.direction.setFromMatrixPosition(S.matrixWorld),R.direction.transformDirection(m),f++}else if(S.isDirectionalLight){const R=i.directional[d];R.direction.setFromMatrixPosition(S.matrixWorld),r.setFromMatrixPosition(S.target.matrixWorld),R.direction.sub(r),R.direction.transformDirection(m),d++}else if(S.isSpotLight){const R=i.spot[g];R.position.setFromMatrixPosition(S.matrixWorld),R.position.applyMatrix4(m),R.direction.setFromMatrixPosition(S.matrixWorld),r.setFromMatrixPosition(S.target.matrixWorld),R.direction.sub(r),R.direction.transformDirection(m),g++}else if(S.isRectAreaLight){const R=i.rectArea[x];R.position.setFromMatrixPosition(S.matrixWorld),R.position.applyMatrix4(m),o.identity(),a.copy(S.matrixWorld),a.premultiply(m),o.extractRotation(a),R.halfWidth.set(S.width*.5,0,0),R.halfHeight.set(0,S.height*.5,0),R.halfWidth.applyMatrix4(o),R.halfHeight.applyMatrix4(o),x++}else if(S.isPointLight){const R=i.point[p];R.position.setFromMatrixPosition(S.matrixWorld),R.position.applyMatrix4(m),p++}else if(S.isHemisphereLight){const R=i.hemi[M];R.direction.setFromMatrixPosition(S.matrixWorld),R.direction.transformDirection(m),M++}}}return{setup:l,setupView:c,state:i}}function fu(n){const e=new ux(n),t=[],i=[],r=[];function a(d){f.camera=d,t.length=0,i.length=0,r.length=0}function o(d){t.push(d)}function l(d){i.push(d)}function c(d){r.push(d)}function u(){e.setup(t)}function h(d){e.setupView(t,d)}const f={lightsArray:t,shadowsArray:i,lightProbeGridArray:r,camera:null,lights:e,transmissionRenderTarget:{},textureUnits:0};return{init:a,state:f,setupLights:u,setupLightsView:h,pushLight:o,pushShadow:l,pushLightProbeGrid:c}}function hx(n){let e=new WeakMap;function t(r,a=0){const o=e.get(r);let l;return o===void 0?(l=new fu(n),e.set(r,[l])):a>=o.length?(l=new fu(n),o.push(l)):l=o[a],l}function i(){e=new WeakMap}return{get:t,dispose:i}}const dx=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,fx=`uniform sampler2D shadow_pass;
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
}`,px=[new Y(1,0,0),new Y(-1,0,0),new Y(0,1,0),new Y(0,-1,0),new Y(0,0,1),new Y(0,0,-1)],gx=[new Y(0,-1,0),new Y(0,-1,0),new Y(0,0,1),new Y(0,0,-1),new Y(0,-1,0),new Y(0,-1,0)],pu=new Kt,pa=new Y,Ro=new Y;function mx(n,e,t){let i=new Jl;const r=new Ze,a=new Ze,o=new kt,l=new R1,c=new C1,u={},h=t.maxTextureSize,f={[_r]:Cn,[Cn]:_r,[Li]:Li},d=new vn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Ze},radius:{value:4}},vertexShader:dx,fragmentShader:fx}),p=d.clone();p.defines.HORIZONTAL_PASS=1;const g=new vi;g.setAttribute("position",new mi(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const x=new wn(g,d),M=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=_s;let m=this.type;this.render=function(A,D,b){if(M.enabled===!1||M.autoUpdate===!1&&M.needsUpdate===!1||A.length===0)return;this.type===mp&&(Ke("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."),this.type=_s);const w=n.getRenderTarget(),L=n.getActiveCubeFace(),C=n.getActiveMipmapLevel(),I=n.state;I.setBlending(Fi),I.buffers.depth.getReversed()===!0?I.buffers.color.setClear(0,0,0,0):I.buffers.color.setClear(1,1,1,1),I.buffers.depth.setTest(!0),I.setScissorTest(!1);const N=m!==this.type;N&&D.traverse(function(O){O.material&&(Array.isArray(O.material)?O.material.forEach(B=>B.needsUpdate=!0):O.material.needsUpdate=!0)});for(let O=0,B=A.length;O<B;O++){const W=A[O],$=W.shadow;if($===void 0){Ke("WebGLShadowMap:",W,"has no shadow.");continue}if($.autoUpdate===!1&&$.needsUpdate===!1)continue;r.copy($.mapSize);const ae=$.getFrameExtents();r.multiply(ae),a.copy($.mapSize),(r.x>h||r.y>h)&&(r.x>h&&(a.x=Math.floor(h/ae.x),r.x=a.x*ae.x,$.mapSize.x=a.x),r.y>h&&(a.y=Math.floor(h/ae.y),r.y=a.y*ae.y,$.mapSize.y=a.y));const q=n.state.buffers.depth.getReversed();if($.camera._reversedDepth=q,$.map===null||N===!0){if($.map!==null&&($.map.depthTexture!==null&&($.map.depthTexture.dispose(),$.map.depthTexture=null),$.map.dispose()),this.type===_a){if(W.isPointLight){Ke("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}$.map=new Gn(r.x,r.y,{format:br,type:_i,minFilter:$t,magFilter:$t,generateMipmaps:!1}),$.map.texture.name=W.name+".shadowMap",$.map.depthTexture=new Da(r.x,r.y,fi),$.map.depthTexture.name=W.name+".shadowMapDepth",$.map.depthTexture.format=zi,$.map.depthTexture.compareFunction=null,$.map.depthTexture.minFilter=tn,$.map.depthTexture.magFilter=tn}else W.isPointLight?($.map=new Lh(r.x),$.map.depthTexture=new S1(r.x,xi)):($.map=new Gn(r.x,r.y),$.map.depthTexture=new Da(r.x,r.y,xi)),$.map.depthTexture.name=W.name+".shadowMap",$.map.depthTexture.format=zi,this.type===_s?($.map.depthTexture.compareFunction=q?ql:Kl,$.map.depthTexture.minFilter=$t,$.map.depthTexture.magFilter=$t):($.map.depthTexture.compareFunction=null,$.map.depthTexture.minFilter=tn,$.map.depthTexture.magFilter=tn);$.camera.updateProjectionMatrix()}$.map.isWebGLCubeRenderTarget!==!0&&($.map.width!==r.x||$.map.height!==r.y)&&$.map.setSize(r.x,r.y);const ee=$.map.isWebGLCubeRenderTarget?6:$.getViewportCount();W.isPointLight!==!0&&$.updateMatrices(W,b);for(let F=0;F<ee;F++){const re=$.getCamera(F);if(W.isPointLight){const ue=$.camera,Pe=$.matrix,He=W.distance||ue.far;He!==ue.far&&(ue.far=He,ue.updateProjectionMatrix()),pa.setFromMatrixPosition(W.matrixWorld),ue.position.copy(pa),Ro.copy(ue.position),Ro.add(px[F]),ue.up.copy(gx[F]),ue.lookAt(Ro),ue.updateMatrixWorld(),Pe.makeTranslation(-pa.x,-pa.y,-pa.z),pu.multiplyMatrices(ue.projectionMatrix,ue.matrixWorldInverse),$._frustum.setFromProjectionMatrix(pu,ue.coordinateSystem,ue.reversedDepth)}if($.map.isWebGLCubeRenderTarget)n.setRenderTarget($.map,F),n.clear();else{F===0&&(n.setRenderTarget($.map),n.clear());const ue=$.getViewport(F);o.set(a.x*ue.x,a.y*ue.y,a.x*ue.z,a.y*ue.w),I.viewport(o)}i=$.getFrustum(F),S(D,b,re,W,this.type)}$.isPointLightShadow!==!0&&this.type===_a&&_($,b),$.needsUpdate=!1}m=this.type,M.needsUpdate=!1,n.setRenderTarget(w,L,C)};function _(A,D){const b=e.update(x);d.defines.VSM_SAMPLES!==A.blurSamples&&(d.defines.VSM_SAMPLES=A.blurSamples,p.defines.VSM_SAMPLES=A.blurSamples,d.needsUpdate=!0,p.needsUpdate=!0),A.mapPass===null?A.mapPass=new Gn(r.x,r.y,{format:br,type:_i}):(A.mapPass.width!==A.map.width||A.mapPass.height!==A.map.height)&&A.mapPass.setSize(A.map.width,A.map.height),d.uniforms.shadow_pass.value=A.map.depthTexture,d.uniforms.resolution.value.set(A.map.width,A.map.height),d.uniforms.radius.value=A.radius,n.setRenderTarget(A.mapPass),n.clear(),n.renderBufferDirect(D,null,b,d,x,null),p.uniforms.shadow_pass.value=A.mapPass.texture,p.uniforms.resolution.value.set(A.map.width,A.map.height),p.uniforms.radius.value=A.radius,n.setRenderTarget(A.map),n.clear(),n.renderBufferDirect(D,null,b,p,x,null)}function y(A,D,b,w){let L=null;const C=b.isPointLight===!0?A.customDistanceMaterial:A.customDepthMaterial;if(C!==void 0)L=C;else if(L=b.isPointLight===!0?c:l,n.localClippingEnabled&&D.clipShadows===!0&&Array.isArray(D.clippingPlanes)&&D.clippingPlanes.length!==0||D.displacementMap&&D.displacementScale!==0||D.alphaMap&&D.alphaTest>0||D.map&&D.alphaTest>0||D.alphaToCoverage===!0){const I=L.uuid,N=D.uuid;let O=u[I];O===void 0&&(O={},u[I]=O);let B=O[N];B===void 0&&(B=L.clone(),O[N]=B,D.addEventListener("dispose",R)),L=B}if(L.visible=D.visible,L.wireframe=D.wireframe,w===_a?L.side=D.shadowSide!==null?D.shadowSide:D.side:L.side=D.shadowSide!==null?D.shadowSide:f[D.side],L.alphaMap=D.alphaMap,L.alphaTest=D.alphaToCoverage===!0?.5:D.alphaTest,L.map=D.map,L.clipShadows=D.clipShadows,L.clippingPlanes=D.clippingPlanes,L.clipIntersection=D.clipIntersection,L.displacementMap=D.displacementMap,L.displacementScale=D.displacementScale,L.displacementBias=D.displacementBias,L.wireframeLinewidth=D.wireframeLinewidth,L.linewidth=D.linewidth,b.isPointLight===!0&&L.isMeshDistanceMaterial===!0){const I=n.properties.get(L);I.light=b}return L}function S(A,D,b,w,L){if(A.visible===!1)return;if(A.layers.test(D.layers)&&(A.isMesh||A.isLine||A.isPoints)&&(A.castShadow||A.receiveShadow&&L===_a)&&(!A.frustumCulled||A.intersectsFrustum(i))){A.modelViewMatrix.multiplyMatrices(b.matrixWorldInverse,A.matrixWorld);const N=e.update(A),O=A.material;if(Array.isArray(O)){const B=N.groups;for(let W=0,$=B.length;W<$;W++){const ae=B[W],q=O[ae.materialIndex];if(q&&q.visible){const ee=y(A,q,w,L);A.onBeforeShadow(n,A,D,b,N,ee,ae),n.renderBufferDirect(b,null,N,ee,A,ae),A.onAfterShadow(n,A,D,b,N,ee,ae)}}}else if(O.visible){const B=y(A,O,w,L);A.onBeforeShadow(n,A,D,b,N,B,null),n.renderBufferDirect(b,null,N,B,A,null),A.onAfterShadow(n,A,D,b,N,B,null)}}const I=A.children;for(let N=0,O=I.length;N<O;N++)S(I[N],D,b,w,L)}function R(A){A.target.removeEventListener("dispose",R);for(const b in u){const w=u[b],L=A.target.uuid;L in w&&(w[L].dispose(),delete w[L])}}}function Mx(n,e){function t(){let H=!1;const xe=new kt;let ne=null;const _e=new kt(0,0,0,0);return{setMask:function(ye){ne!==ye&&!H&&(n.colorMask(ye,ye,ye,ye),ne=ye)},setLocked:function(ye){H=ye},setClear:function(ye,oe,ke,Ne,Pt){Pt===!0&&(ye*=Ne,oe*=Ne,ke*=Ne),xe.set(ye,oe,ke,Ne),_e.equals(xe)===!1&&(n.clearColor(ye,oe,ke,Ne),_e.copy(xe))},reset:function(){H=!1,ne=null,_e.set(-1,0,0,0)}}}function i(){let H=!1,xe=!1,ne=null,_e=null,ye=null;return{setReversed:function(oe){if(xe!==oe){const ke=e.get("EXT_clip_control");oe?ke.clipControlEXT(ke.LOWER_LEFT_EXT,ke.ZERO_TO_ONE_EXT):ke.clipControlEXT(ke.LOWER_LEFT_EXT,ke.NEGATIVE_ONE_TO_ONE_EXT),xe=oe;const Ne=ye;ye=null,this.setClear(Ne)}},getReversed:function(){return xe},setTest:function(oe){oe?ie(n.DEPTH_TEST):G(n.DEPTH_TEST)},setMask:function(oe){ne!==oe&&!H&&(n.depthMask(oe),ne=oe)},setFunc:function(oe){if(xe&&(oe=Jp[oe]),_e!==oe){switch(oe){case Bo:n.depthFunc(n.NEVER);break;case ko:n.depthFunc(n.ALWAYS);break;case zo:n.depthFunc(n.LESS);break;case Ta:n.depthFunc(n.LEQUAL);break;case Ho:n.depthFunc(n.EQUAL);break;case Go:n.depthFunc(n.GEQUAL);break;case Wo:n.depthFunc(n.GREATER);break;case Vo:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}_e=oe}},setLocked:function(oe){H=oe},setClear:function(oe){ye!==oe&&(ye=oe,xe&&(oe=1-oe),n.clearDepth(oe))},reset:function(){H=!1,ne=null,_e=null,ye=null,xe=!1}}}function r(){let H=!1,xe=null,ne=null,_e=null,ye=null,oe=null,ke=null,Ne=null,Pt=null;return{setTest:function(xt){H||(xt?ie(n.STENCIL_TEST):G(n.STENCIL_TEST))},setMask:function(xt){xe!==xt&&!H&&(n.stencilMask(xt),xe=xt)},setFunc:function(xt,Vn,ti){(ne!==xt||_e!==Vn||ye!==ti)&&(n.stencilFunc(xt,Vn,ti),ne=xt,_e=Vn,ye=ti)},setOp:function(xt,Vn,ti){(oe!==xt||ke!==Vn||Ne!==ti)&&(n.stencilOp(xt,Vn,ti),oe=xt,ke=Vn,Ne=ti)},setLocked:function(xt){H=xt},setClear:function(xt){Pt!==xt&&(n.clearStencil(xt),Pt=xt)},reset:function(){H=!1,xe=null,ne=null,_e=null,ye=null,oe=null,ke=null,Ne=null,Pt=null}}}const a=new t,o=new i,l=new r,c=new WeakMap,u=new WeakMap;let h={},f={},d={},p=new WeakMap,g=[],x=null,M=!1,m=null,_=null,y=null,S=null,R=null,A=null,D=null,b=new Mt(0,0,0),w=0,L=!1,C=null,I=null,N=null,O=null,B=null;const W=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let $=!1,ae=0;const q=n.getParameter(n.VERSION);q.indexOf("WebGL")!==-1?(ae=parseFloat(/^WebGL (\d)/.exec(q)[1]),$=ae>=1):q.indexOf("OpenGL ES")!==-1&&(ae=parseFloat(/^OpenGL ES (\d)/.exec(q)[1]),$=ae>=2);let ee=null,F={};const re=n.getParameter(n.SCISSOR_BOX),ue=n.getParameter(n.VIEWPORT),Pe=new kt().fromArray(re),He=new kt().fromArray(ue);function Xe(H,xe,ne,_e){const ye=new Uint8Array(4),oe=n.createTexture();n.bindTexture(H,oe),n.texParameteri(H,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(H,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let ke=0;ke<ne;ke++)H===n.TEXTURE_3D||H===n.TEXTURE_2D_ARRAY?n.texImage3D(xe,0,n.RGBA,1,1,_e,0,n.RGBA,n.UNSIGNED_BYTE,ye):n.texImage2D(xe+ke,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,ye);return oe}const j={};j[n.TEXTURE_2D]=Xe(n.TEXTURE_2D,n.TEXTURE_2D,1),j[n.TEXTURE_CUBE_MAP]=Xe(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),j[n.TEXTURE_2D_ARRAY]=Xe(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),j[n.TEXTURE_3D]=Xe(n.TEXTURE_3D,n.TEXTURE_3D,1,1),a.setClear(0,0,0,1),o.setClear(1),l.setClear(0),ie(n.DEPTH_TEST),o.setFunc(Ta),$e(!1),Ct(bc),ie(n.CULL_FACE),ze(Fi);function ie(H){h[H]!==!0&&(n.enable(H),h[H]=!0)}function G(H){h[H]!==!1&&(n.disable(H),h[H]=!1)}function he(H,xe){return d[H]!==xe?(n.bindFramebuffer(H,xe),d[H]=xe,H===n.DRAW_FRAMEBUFFER&&(d[n.FRAMEBUFFER]=xe),H===n.FRAMEBUFFER&&(d[n.DRAW_FRAMEBUFFER]=xe),!0):!1}function se(H,xe){let ne=g,_e=!1;if(H){ne=p.get(xe),ne===void 0&&(ne=[],p.set(xe,ne));const ye=H.textures;if(ne.length!==ye.length||ne[0]!==n.COLOR_ATTACHMENT0){for(let oe=0,ke=ye.length;oe<ke;oe++)ne[oe]=n.COLOR_ATTACHMENT0+oe;ne.length=ye.length,_e=!0}}else ne[0]!==n.BACK&&(ne[0]=n.BACK,_e=!0);_e&&n.drawBuffers(ne)}function Ae(H){return x!==H?(n.useProgram(H),x=H,!0):!1}const tt={[Hr]:n.FUNC_ADD,[xp]:n.FUNC_SUBTRACT,[_p]:n.FUNC_REVERSE_SUBTRACT};tt[vp]=n.MIN,tt[bp]=n.MAX;const Oe={[Sp]:n.ZERO,[Ep]:n.ONE,[yp]:n.SRC_COLOR,[Zu]:n.SRC_ALPHA,[Lp]:n.SRC_ALPHA_SATURATE,[Rp]:n.DST_COLOR,[Ap]:n.DST_ALPHA,[wp]:n.ONE_MINUS_SRC_COLOR,[$u]:n.ONE_MINUS_SRC_ALPHA,[Cp]:n.ONE_MINUS_DST_COLOR,[Tp]:n.ONE_MINUS_DST_ALPHA,[Dp]:n.CONSTANT_COLOR,[Pp]:n.ONE_MINUS_CONSTANT_COLOR,[Op]:n.CONSTANT_ALPHA,[Ip]:n.ONE_MINUS_CONSTANT_ALPHA};function ze(H,xe,ne,_e,ye,oe,ke,Ne,Pt,xt){if(H===Fi){M===!0&&(G(n.BLEND),M=!1);return}if(M===!1&&(ie(n.BLEND),M=!0),H!==Mp){if(H!==m||xt!==L){if((_!==Hr||R!==Hr)&&(n.blendEquation(n.FUNC_ADD),_=Hr,R=Hr),xt)switch(H){case ya:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case Sc:n.blendFunc(n.ONE,n.ONE);break;case Ec:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case yc:n.blendFuncSeparate(n.DST_COLOR,n.ONE_MINUS_SRC_ALPHA,n.ZERO,n.ONE);break;default:pt("WebGLState: Invalid blending: ",H);break}else switch(H){case ya:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case Sc:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE,n.ONE,n.ONE);break;case Ec:pt("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case yc:pt("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:pt("WebGLState: Invalid blending: ",H);break}y=null,S=null,A=null,D=null,b.set(0,0,0),w=0,m=H,L=xt}return}ye=ye||xe,oe=oe||ne,ke=ke||_e,(xe!==_||ye!==R)&&(n.blendEquationSeparate(tt[xe],tt[ye]),_=xe,R=ye),(ne!==y||_e!==S||oe!==A||ke!==D)&&(n.blendFuncSeparate(Oe[ne],Oe[_e],Oe[oe],Oe[ke]),y=ne,S=_e,A=oe,D=ke),(Ne.equals(b)===!1||Pt!==w)&&(n.blendColor(Ne.r,Ne.g,Ne.b,Pt),b.copy(Ne),w=Pt),m=H,L=!1}function Je(H,xe){H.side===Li?G(n.CULL_FACE):ie(n.CULL_FACE);let ne=H.side===Cn;xe&&(ne=!ne),$e(ne),H.blending===ya&&H.transparent===!1?ze(Fi):ze(H.blending,H.blendEquation,H.blendSrc,H.blendDst,H.blendEquationAlpha,H.blendSrcAlpha,H.blendDstAlpha,H.blendColor,H.blendAlpha,H.premultipliedAlpha),o.setFunc(H.depthFunc),o.setTest(H.depthTest),o.setMask(H.depthWrite),a.setMask(H.colorWrite);const _e=H.stencilWrite;l.setTest(_e),_e&&(l.setMask(H.stencilWriteMask),l.setFunc(H.stencilFunc,H.stencilRef,H.stencilFuncMask),l.setOp(H.stencilFail,H.stencilZFail,H.stencilZPass)),an(H.polygonOffset,H.polygonOffsetFactor,H.polygonOffsetUnits),H.alphaToCoverage===!0?ie(n.SAMPLE_ALPHA_TO_COVERAGE):G(n.SAMPLE_ALPHA_TO_COVERAGE)}function $e(H){C!==H&&(H?n.frontFace(n.CW):n.frontFace(n.CCW),C=H)}function Ct(H){H!==pp?(ie(n.CULL_FACE),H!==I&&(H===bc?n.cullFace(n.BACK):H===gp?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):G(n.CULL_FACE),I=H}function zt(H){H!==N&&($&&n.lineWidth(H),N=H)}function an(H,xe,ne){H?(ie(n.POLYGON_OFFSET_FILL),(O!==xe||B!==ne)&&(O=xe,B=ne,o.getReversed()&&(xe=-xe),n.polygonOffset(xe,ne))):G(n.POLYGON_OFFSET_FILL)}function At(H){H?ie(n.SCISSOR_TEST):G(n.SCISSOR_TEST)}function Lt(H){H===void 0&&(H=n.TEXTURE0+W-1),ee!==H&&(n.activeTexture(H),ee=H)}function z(H,xe,ne){ne===void 0&&(ee===null?ne=n.TEXTURE0+W-1:ne=ee);let _e=F[ne];_e===void 0&&(_e={type:void 0,texture:void 0},F[ne]=_e),(_e.type!==H||_e.texture!==xe)&&(ee!==ne&&(n.activeTexture(ne),ee=ne),n.bindTexture(H,xe||j[H]),_e.type=H,_e.texture=xe)}function rt(){const H=F[ee];H!==void 0&&H.type!==void 0&&(n.bindTexture(H.type,null),H.type=void 0,H.texture=void 0)}function Ve(){try{n.compressedTexImage2D(...arguments)}catch(H){pt("WebGLState:",H)}}function P(){try{n.compressedTexImage3D(...arguments)}catch(H){pt("WebGLState:",H)}}function v(){try{n.texSubImage2D(...arguments)}catch(H){pt("WebGLState:",H)}}function U(){try{n.texSubImage3D(...arguments)}catch(H){pt("WebGLState:",H)}}function V(){try{n.compressedTexSubImage2D(...arguments)}catch(H){pt("WebGLState:",H)}}function Z(){try{n.compressedTexSubImage3D(...arguments)}catch(H){pt("WebGLState:",H)}}function le(){try{n.texStorage2D(...arguments)}catch(H){pt("WebGLState:",H)}}function fe(){try{n.texStorage3D(...arguments)}catch(H){pt("WebGLState:",H)}}function Q(){try{n.texImage2D(...arguments)}catch(H){pt("WebGLState:",H)}}function te(){try{n.texImage3D(...arguments)}catch(H){pt("WebGLState:",H)}}function pe(H){return f[H]!==void 0?f[H]:n.getParameter(H)}function Ie(H,xe){f[H]!==xe&&(n.pixelStorei(H,xe),f[H]=xe)}function ve(H){Pe.equals(H)===!1&&(n.scissor(H.x,H.y,H.z,H.w),Pe.copy(H))}function Me(H){He.equals(H)===!1&&(n.viewport(H.x,H.y,H.z,H.w),He.copy(H))}function Be(H,xe){let ne=u.get(xe);ne===void 0&&(ne=new WeakMap,u.set(xe,ne));let _e=ne.get(H);_e===void 0&&(_e=n.getUniformBlockIndex(xe,H.name),ne.set(H,_e))}function We(H,xe){const _e=u.get(xe).get(H);c.get(xe)!==_e&&(n.uniformBlockBinding(xe,_e,H.__bindingPointIndex),c.set(xe,_e))}function Qe(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),o.setReversed(!1),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),n.pixelStorei(n.PACK_ALIGNMENT,4),n.pixelStorei(n.UNPACK_ALIGNMENT,4),n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,!1),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,n.BROWSER_DEFAULT_WEBGL),n.pixelStorei(n.PACK_ROW_LENGTH,0),n.pixelStorei(n.PACK_SKIP_PIXELS,0),n.pixelStorei(n.PACK_SKIP_ROWS,0),n.pixelStorei(n.UNPACK_ROW_LENGTH,0),n.pixelStorei(n.UNPACK_IMAGE_HEIGHT,0),n.pixelStorei(n.UNPACK_SKIP_PIXELS,0),n.pixelStorei(n.UNPACK_SKIP_ROWS,0),n.pixelStorei(n.UNPACK_SKIP_IMAGES,0),h={},f={},ee=null,F={},d={},p=new WeakMap,g=[],x=null,M=!1,m=null,_=null,y=null,S=null,R=null,A=null,D=null,b=new Mt(0,0,0),w=0,L=!1,C=null,I=null,N=null,O=null,B=null,Pe.set(0,0,n.canvas.width,n.canvas.height),He.set(0,0,n.canvas.width,n.canvas.height),a.reset(),o.reset(),l.reset()}return{buffers:{color:a,depth:o,stencil:l},enable:ie,disable:G,bindFramebuffer:he,drawBuffers:se,useProgram:Ae,setBlending:ze,setMaterial:Je,setFlipSided:$e,setCullFace:Ct,setLineWidth:zt,setPolygonOffset:an,setScissorTest:At,activeTexture:Lt,bindTexture:z,unbindTexture:rt,compressedTexImage2D:Ve,compressedTexImage3D:P,texImage2D:Q,texImage3D:te,pixelStorei:Ie,getParameter:pe,updateUBOMapping:Be,uniformBlockBinding:We,texStorage2D:le,texStorage3D:fe,texSubImage2D:v,texSubImage3D:U,compressedTexSubImage2D:V,compressedTexSubImage3D:Z,scissor:ve,viewport:Me,reset:Qe}}function xx(n,e,t,i,r,a,o){const l=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),u=new Ze,h=new WeakMap,f=new Set;let d;const p=new WeakMap;let g=!1;try{g=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function x(P,v){return g?new OffscreenCanvas(P,v):Ps("canvas")}function M(P,v,U){let V=1;const Z=Ve(P);if((Z.width>U||Z.height>U)&&(V=U/Math.max(Z.width,Z.height)),V<1)if(typeof HTMLImageElement<"u"&&P instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&P instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&P instanceof ImageBitmap||typeof VideoFrame<"u"&&P instanceof VideoFrame){const le=Math.floor(V*Z.width),fe=Math.floor(V*Z.height);d===void 0&&(d=x(le,fe));const Q=v?x(le,fe):d;return Q.width=le,Q.height=fe,Q.getContext("2d").drawImage(P,0,0,le,fe),Ke("WebGLRenderer: Texture has been resized from ("+Z.width+"x"+Z.height+") to ("+le+"x"+fe+")."),Q}else return"data"in P&&Ke("WebGLRenderer: Image in DataTexture is too big ("+Z.width+"x"+Z.height+")."),P;return P}function m(P){return P.generateMipmaps}function _(P){n.generateMipmap(P)}function y(P){return P.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:P.isWebGL3DRenderTarget?n.TEXTURE_3D:P.isWebGLArrayRenderTarget||P.isCompressedArrayTexture?n.TEXTURE_2D_ARRAY:n.TEXTURE_2D}function S(P,v,U,V,Z,le=!1){if(P!==null){if(n[P]!==void 0)return n[P];Ke("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+P+"'")}let fe;V&&(fe=e.get("EXT_texture_norm16"),fe||Ke("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let Q=v;if(v===n.RED&&(U===n.FLOAT&&(Q=n.R32F),U===n.HALF_FLOAT&&(Q=n.R16F),U===n.UNSIGNED_BYTE&&(Q=n.R8),U===n.UNSIGNED_SHORT&&fe&&(Q=fe.R16_EXT),U===n.SHORT&&fe&&(Q=fe.R16_SNORM_EXT)),v===n.RED_INTEGER&&(U===n.UNSIGNED_BYTE&&(Q=n.R8UI),U===n.UNSIGNED_SHORT&&(Q=n.R16UI),U===n.UNSIGNED_INT&&(Q=n.R32UI),U===n.BYTE&&(Q=n.R8I),U===n.SHORT&&(Q=n.R16I),U===n.INT&&(Q=n.R32I)),v===n.RG&&(U===n.FLOAT&&(Q=n.RG32F),U===n.HALF_FLOAT&&(Q=n.RG16F),U===n.UNSIGNED_BYTE&&(Q=n.RG8),U===n.UNSIGNED_SHORT&&fe&&(Q=fe.RG16_EXT),U===n.SHORT&&fe&&(Q=fe.RG16_SNORM_EXT)),v===n.RG_INTEGER&&(U===n.UNSIGNED_BYTE&&(Q=n.RG8UI),U===n.UNSIGNED_SHORT&&(Q=n.RG16UI),U===n.UNSIGNED_INT&&(Q=n.RG32UI),U===n.BYTE&&(Q=n.RG8I),U===n.SHORT&&(Q=n.RG16I),U===n.INT&&(Q=n.RG32I)),v===n.RGB_INTEGER&&(U===n.UNSIGNED_BYTE&&(Q=n.RGB8UI),U===n.UNSIGNED_SHORT&&(Q=n.RGB16UI),U===n.UNSIGNED_INT&&(Q=n.RGB32UI),U===n.BYTE&&(Q=n.RGB8I),U===n.SHORT&&(Q=n.RGB16I),U===n.INT&&(Q=n.RGB32I)),v===n.RGBA_INTEGER&&(U===n.UNSIGNED_BYTE&&(Q=n.RGBA8UI),U===n.UNSIGNED_SHORT&&(Q=n.RGBA16UI),U===n.UNSIGNED_INT&&(Q=n.RGBA32UI),U===n.BYTE&&(Q=n.RGBA8I),U===n.SHORT&&(Q=n.RGBA16I),U===n.INT&&(Q=n.RGBA32I)),v===n.RGB&&(U===n.UNSIGNED_SHORT&&fe&&(Q=fe.RGB16_EXT),U===n.SHORT&&fe&&(Q=fe.RGB16_SNORM_EXT),U===n.UNSIGNED_INT_5_9_9_9_REV&&(Q=n.RGB9_E5),U===n.UNSIGNED_INT_10F_11F_11F_REV&&(Q=n.R11F_G11F_B10F)),v===n.RGBA){const te=le?Ls:lt.getTransfer(Z);U===n.FLOAT&&(Q=n.RGBA32F),U===n.HALF_FLOAT&&(Q=n.RGBA16F),U===n.UNSIGNED_BYTE&&(Q=te===yt?n.SRGB8_ALPHA8:n.RGBA8),U===n.UNSIGNED_SHORT&&fe&&(Q=fe.RGBA16_EXT),U===n.SHORT&&fe&&(Q=fe.RGBA16_SNORM_EXT),U===n.UNSIGNED_SHORT_4_4_4_4&&(Q=n.RGBA4),U===n.UNSIGNED_SHORT_5_5_5_1&&(Q=n.RGB5_A1)}return(Q===n.R16F||Q===n.R32F||Q===n.RG16F||Q===n.RG32F||Q===n.RGBA16F||Q===n.RGBA32F)&&e.get("EXT_color_buffer_float"),Q}function R(P,v){let U;return P?v===null||v===xi||v===Ca?U=n.DEPTH24_STENCIL8:v===fi?U=n.DEPTH32F_STENCIL8:v===Ra&&(U=n.DEPTH24_STENCIL8,Ke("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):v===null||v===xi||v===Ca?U=n.DEPTH_COMPONENT24:v===fi?U=n.DEPTH_COMPONENT32F:v===Ra&&(U=n.DEPTH_COMPONENT16),U}function A(P,v){return m(P)===!0||P.isFramebufferTexture&&P.minFilter!==tn&&P.minFilter!==$t?Math.log2(Math.max(v.width,v.height))+1:P.mipmaps!==void 0&&P.mipmaps.length>0?P.mipmaps.length:P.isCompressedTexture&&Array.isArray(P.image)?v.mipmaps.length:1}function D(P){const v=P.target;v.removeEventListener("dispose",D),w(v),v.isVideoTexture&&h.delete(v),v.isHTMLTexture&&f.delete(v)}function b(P){const v=P.target;v.removeEventListener("dispose",b),C(v)}function w(P){const v=i.get(P);if(v.__webglInit===void 0)return;const U=P.source,V=p.get(U);if(V){const Z=V[v.__cacheKey];Z.usedTimes--,Z.usedTimes===0&&L(P),Object.keys(V).length===0&&p.delete(U)}i.remove(P)}function L(P){const v=i.get(P);n.deleteTexture(v.__webglTexture);const U=P.source,V=p.get(U);delete V[v.__cacheKey],o.memory.textures--}function C(P){const v=i.get(P);if(P.depthTexture&&(P.depthTexture.dispose(),i.remove(P.depthTexture)),P.isWebGLCubeRenderTarget)for(let V=0;V<6;V++){if(Array.isArray(v.__webglFramebuffer[V]))for(let Z=0;Z<v.__webglFramebuffer[V].length;Z++)n.deleteFramebuffer(v.__webglFramebuffer[V][Z]);else n.deleteFramebuffer(v.__webglFramebuffer[V]);v.__webglDepthbuffer&&n.deleteRenderbuffer(v.__webglDepthbuffer[V])}else{if(Array.isArray(v.__webglFramebuffer))for(let V=0;V<v.__webglFramebuffer.length;V++)n.deleteFramebuffer(v.__webglFramebuffer[V]);else n.deleteFramebuffer(v.__webglFramebuffer);if(v.__webglDepthbuffer&&n.deleteRenderbuffer(v.__webglDepthbuffer),v.__webglMultisampledFramebuffer&&n.deleteFramebuffer(v.__webglMultisampledFramebuffer),v.__webglColorRenderbuffer)for(let V=0;V<v.__webglColorRenderbuffer.length;V++)v.__webglColorRenderbuffer[V]&&n.deleteRenderbuffer(v.__webglColorRenderbuffer[V]);v.__webglDepthRenderbuffer&&n.deleteRenderbuffer(v.__webglDepthRenderbuffer)}const U=P.textures;for(let V=0,Z=U.length;V<Z;V++){const le=i.get(U[V]);le.__webglTexture&&(n.deleteTexture(le.__webglTexture),o.memory.textures--),i.remove(U[V])}i.remove(P)}let I=0;function N(){I=0}function O(){return I}function B(P){I=P}function W(){const P=I;return P>=r.maxTextures&&Ke("WebGLTextures: Trying to use "+(P+1)+" texture units while this GPU supports only "+r.maxTextures),I+=1,P}function $(P){const v=[];return v.push(P.wrapS),v.push(P.wrapT),v.push(P.wrapR||0),v.push(P.magFilter),v.push(P.minFilter),v.push(P.anisotropy),v.push(P.internalFormat),v.push(P.format),v.push(P.type),v.push(P.generateMipmaps),v.push(P.premultiplyAlpha),v.push(P.flipY),v.push(P.unpackAlignment),v.push(P.colorSpace),v.join()}function ae(P,v){const U=i.get(P);if(P.isVideoTexture&&z(P),P.isRenderTargetTexture===!1&&P.isExternalTexture!==!0&&P.version>0&&U.__version!==P.version){const V=P.image;if(V===null)Ke("WebGLRenderer: Texture marked for update but no image data found.");else if(V.complete===!1)Ke("WebGLRenderer: Texture marked for update but image is incomplete");else{G(U,P,v);return}}else P.isExternalTexture&&(U.__webglTexture=P.sourceTexture?P.sourceTexture:null);t.bindTexture(n.TEXTURE_2D,U.__webglTexture,n.TEXTURE0+v)}function q(P,v){const U=i.get(P);if(P.isRenderTargetTexture===!1&&P.version>0&&U.__version!==P.version){G(U,P,v);return}else P.isExternalTexture&&(U.__webglTexture=P.sourceTexture?P.sourceTexture:null);t.bindTexture(n.TEXTURE_2D_ARRAY,U.__webglTexture,n.TEXTURE0+v)}function ee(P,v){const U=i.get(P);if(P.isRenderTargetTexture===!1&&P.version>0&&U.__version!==P.version){G(U,P,v);return}t.bindTexture(n.TEXTURE_3D,U.__webglTexture,n.TEXTURE0+v)}function F(P,v){const U=i.get(P);if(P.isCubeDepthTexture!==!0&&P.version>0&&U.__version!==P.version){he(U,P,v);return}t.bindTexture(n.TEXTURE_CUBE_MAP,U.__webglTexture,n.TEXTURE0+v)}const re={[Yo]:n.REPEAT,[Di]:n.CLAMP_TO_EDGE,[Xo]:n.MIRRORED_REPEAT},ue={[tn]:n.NEAREST,[Up]:n.NEAREST_MIPMAP_NEAREST,[Ga]:n.NEAREST_MIPMAP_LINEAR,[$t]:n.LINEAR,[Qs]:n.LINEAR_MIPMAP_NEAREST,[fr]:n.LINEAR_MIPMAP_LINEAR},Pe={[Hp]:n.NEVER,[Xp]:n.ALWAYS,[Gp]:n.LESS,[Kl]:n.LEQUAL,[Wp]:n.EQUAL,[ql]:n.GEQUAL,[Vp]:n.GREATER,[Yp]:n.NOTEQUAL};function He(P,v){if(v.type===fi&&e.has("OES_texture_float_linear")===!1&&(v.magFilter===$t||v.magFilter===Qs||v.magFilter===Ga||v.magFilter===fr||v.minFilter===$t||v.minFilter===Qs||v.minFilter===Ga||v.minFilter===fr)&&Ke("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),n.texParameteri(P,n.TEXTURE_WRAP_S,re[v.wrapS]),n.texParameteri(P,n.TEXTURE_WRAP_T,re[v.wrapT]),(P===n.TEXTURE_3D||P===n.TEXTURE_2D_ARRAY)&&n.texParameteri(P,n.TEXTURE_WRAP_R,re[v.wrapR]),n.texParameteri(P,n.TEXTURE_MAG_FILTER,ue[v.magFilter]),n.texParameteri(P,n.TEXTURE_MIN_FILTER,ue[v.minFilter]),v.compareFunction&&(n.texParameteri(P,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(P,n.TEXTURE_COMPARE_FUNC,Pe[v.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(v.magFilter===tn||v.minFilter!==Ga&&v.minFilter!==fr||v.type===fi&&e.has("OES_texture_float_linear")===!1)return;if(v.anisotropy>1||i.get(v).__currentAnisotropy){const U=e.get("EXT_texture_filter_anisotropic");n.texParameterf(P,U.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(v.anisotropy,r.getMaxAnisotropy())),i.get(v).__currentAnisotropy=v.anisotropy}}}function Xe(P,v){let U=!1;P.__webglInit===void 0&&(P.__webglInit=!0,v.addEventListener("dispose",D));const V=v.source;let Z=p.get(V);Z===void 0&&(Z={},p.set(V,Z));const le=$(v);if(le!==P.__cacheKey){Z[le]===void 0&&(Z[le]={texture:n.createTexture(),usedTimes:0},o.memory.textures++,U=!0),Z[le].usedTimes++;const fe=Z[P.__cacheKey];fe!==void 0&&(Z[P.__cacheKey].usedTimes--,fe.usedTimes===0&&L(v)),P.__cacheKey=le,P.__webglTexture=Z[le].texture}return U}function j(P,v,U){return Math.floor(Math.floor(P/U)/v)}function ie(P,v,U,V){const le=P.updateRanges;if(le.length===0)t.texSubImage2D(n.TEXTURE_2D,0,0,0,v.width,v.height,U,V,v.data);else{le.sort((Ie,ve)=>Ie.start-ve.start);let fe=0;for(let Ie=1;Ie<le.length;Ie++){const ve=le[fe],Me=le[Ie],Be=ve.start+ve.count,We=j(Me.start,v.width,4),Qe=j(ve.start,v.width,4);Me.start<=Be+1&&We===Qe&&j(Me.start+Me.count-1,v.width,4)===We?ve.count=Math.max(ve.count,Me.start+Me.count-ve.start):(++fe,le[fe]=Me)}le.length=fe+1;const Q=t.getParameter(n.UNPACK_ROW_LENGTH),te=t.getParameter(n.UNPACK_SKIP_PIXELS),pe=t.getParameter(n.UNPACK_SKIP_ROWS);t.pixelStorei(n.UNPACK_ROW_LENGTH,v.width);for(let Ie=0,ve=le.length;Ie<ve;Ie++){const Me=le[Ie],Be=Math.floor(Me.start/4),We=Math.ceil(Me.count/4),Qe=Be%v.width,H=Math.floor(Be/v.width),xe=We,ne=1;t.pixelStorei(n.UNPACK_SKIP_PIXELS,Qe),t.pixelStorei(n.UNPACK_SKIP_ROWS,H),t.texSubImage2D(n.TEXTURE_2D,0,Qe,H,xe,ne,U,V,v.data)}P.clearUpdateRanges(),t.pixelStorei(n.UNPACK_ROW_LENGTH,Q),t.pixelStorei(n.UNPACK_SKIP_PIXELS,te),t.pixelStorei(n.UNPACK_SKIP_ROWS,pe)}}function G(P,v,U){let V=n.TEXTURE_2D;(v.isDataArrayTexture||v.isCompressedArrayTexture)&&(V=n.TEXTURE_2D_ARRAY),v.isData3DTexture&&(V=n.TEXTURE_3D);const Z=Xe(P,v),le=v.source;t.bindTexture(V,P.__webglTexture,n.TEXTURE0+U);const fe=i.get(le);if(le.version!==fe.__version||Z===!0){if(t.activeTexture(n.TEXTURE0+U),(typeof ImageBitmap<"u"&&v.image instanceof ImageBitmap)===!1){const ne=lt.getPrimaries(lt.workingColorSpace),_e=v.colorSpace===Zn?null:lt.getPrimaries(v.colorSpace),ye=v.colorSpace===Zn||ne===_e?n.NONE:n.BROWSER_DEFAULT_WEBGL;t.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,v.flipY),t.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,v.premultiplyAlpha),t.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,ye)}t.pixelStorei(n.UNPACK_ALIGNMENT,v.unpackAlignment);let te=M(v.image,!1,r.maxTextureSize);te=rt(v,te);const pe=a.convert(v.format,v.colorSpace),Ie=a.convert(v.type);let ve=S(v.internalFormat,pe,Ie,v.normalized,v.colorSpace,v.isVideoTexture);He(V,v);let Me;const Be=v.mipmaps,We=v.isVideoTexture!==!0,Qe=fe.__version===void 0||Z===!0,H=le.dataReady,xe=A(v,te);if(v.isDepthTexture)ve=R(v.format===pr,v.type),Qe&&(We?t.texStorage2D(n.TEXTURE_2D,1,ve,te.width,te.height):t.texImage2D(n.TEXTURE_2D,0,ve,te.width,te.height,0,pe,Ie,null));else if(v.isDataTexture)if(Be.length>0){We&&Qe&&t.texStorage2D(n.TEXTURE_2D,xe,ve,Be[0].width,Be[0].height);for(let ne=0,_e=Be.length;ne<_e;ne++)Me=Be[ne],We?H&&t.texSubImage2D(n.TEXTURE_2D,ne,0,0,Me.width,Me.height,pe,Ie,Me.data):t.texImage2D(n.TEXTURE_2D,ne,ve,Me.width,Me.height,0,pe,Ie,Me.data);v.generateMipmaps=!1}else We?(Qe&&t.texStorage2D(n.TEXTURE_2D,xe,ve,te.width,te.height),H&&ie(v,te,pe,Ie)):t.texImage2D(n.TEXTURE_2D,0,ve,te.width,te.height,0,pe,Ie,te.data);else if(v.isCompressedTexture)if(v.isCompressedArrayTexture){We&&Qe&&t.texStorage3D(n.TEXTURE_2D_ARRAY,xe,ve,Be[0].width,Be[0].height,te.depth);for(let ne=0,_e=Be.length;ne<_e;ne++)if(Me=Be[ne],v.format!==Hn)if(pe!==null)if(We){if(H)if(v.layerUpdates.size>0){const ye=Xc(Me.width,Me.height,v.format,v.type);for(const oe of v.layerUpdates){const ke=Me.data.subarray(oe*ye/Me.data.BYTES_PER_ELEMENT,(oe+1)*ye/Me.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,ne,0,0,oe,Me.width,Me.height,1,pe,ke)}}else t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,ne,0,0,0,Me.width,Me.height,te.depth,pe,Me.data)}else t.compressedTexImage3D(n.TEXTURE_2D_ARRAY,ne,ve,Me.width,Me.height,te.depth,0,Me.data,0,0);else Ke("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else We?H&&t.texSubImage3D(n.TEXTURE_2D_ARRAY,ne,0,0,0,Me.width,Me.height,te.depth,pe,Ie,Me.data):t.texImage3D(n.TEXTURE_2D_ARRAY,ne,ve,Me.width,Me.height,te.depth,0,pe,Ie,Me.data);v.layerUpdates.size>0&&v.clearLayerUpdates()}else{We&&Qe&&t.texStorage2D(n.TEXTURE_2D,xe,ve,Be[0].width,Be[0].height);for(let ne=0,_e=Be.length;ne<_e;ne++)Me=Be[ne],v.format!==Hn?pe!==null?We?H&&t.compressedTexSubImage2D(n.TEXTURE_2D,ne,0,0,Me.width,Me.height,pe,Me.data):t.compressedTexImage2D(n.TEXTURE_2D,ne,ve,Me.width,Me.height,0,Me.data):Ke("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):We?H&&t.texSubImage2D(n.TEXTURE_2D,ne,0,0,Me.width,Me.height,pe,Ie,Me.data):t.texImage2D(n.TEXTURE_2D,ne,ve,Me.width,Me.height,0,pe,Ie,Me.data)}else if(v.isDataArrayTexture)if(We){if(Qe&&t.texStorage3D(n.TEXTURE_2D_ARRAY,xe,ve,te.width,te.height,te.depth),H)if(v.layerUpdates.size>0){const ne=Xc(te.width,te.height,v.format,v.type);for(const _e of v.layerUpdates){const ye=te.data.subarray(_e*ne/te.data.BYTES_PER_ELEMENT,(_e+1)*ne/te.data.BYTES_PER_ELEMENT);t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,_e,te.width,te.height,1,pe,Ie,ye)}v.clearLayerUpdates()}else t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,te.width,te.height,te.depth,pe,Ie,te.data)}else t.texImage3D(n.TEXTURE_2D_ARRAY,0,ve,te.width,te.height,te.depth,0,pe,Ie,te.data);else if(v.isData3DTexture)We?(Qe&&t.texStorage3D(n.TEXTURE_3D,xe,ve,te.width,te.height,te.depth),H&&t.texSubImage3D(n.TEXTURE_3D,0,0,0,0,te.width,te.height,te.depth,pe,Ie,te.data)):t.texImage3D(n.TEXTURE_3D,0,ve,te.width,te.height,te.depth,0,pe,Ie,te.data);else if(v.isFramebufferTexture){if(Qe)if(We)t.texStorage2D(n.TEXTURE_2D,xe,ve,te.width,te.height);else{let ne=te.width,_e=te.height;for(let ye=0;ye<xe;ye++)t.texImage2D(n.TEXTURE_2D,ye,ve,ne,_e,0,pe,Ie,null),ne>>=1,_e>>=1}}else if(v.isHTMLTexture){if("texElementImage2D"in n){const ne=n.canvas;if(ne.hasAttribute("layoutsubtree")||ne.setAttribute("layoutsubtree","true"),te.parentNode!==ne){ne.appendChild(te),f.add(v),ne.onpaint=_e=>{const ye=_e.changedElements;for(const oe of f)ye.includes(oe.image)&&(oe.needsUpdate=!0)},ne.requestPaint();return}if(n.texElementImage2D.length===3)n.texElementImage2D(n.TEXTURE_2D,n.RGBA8,te);else{const ye=n.RGBA,oe=n.RGBA,ke=n.UNSIGNED_BYTE;n.texElementImage2D(n.TEXTURE_2D,0,ye,oe,ke,te)}n.texParameteri(n.TEXTURE_2D,n.TEXTURE_MIN_FILTER,n.LINEAR),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_S,n.CLAMP_TO_EDGE),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_T,n.CLAMP_TO_EDGE)}}else if(Be.length>0){if(We&&Qe){const ne=Ve(Be[0]);t.texStorage2D(n.TEXTURE_2D,xe,ve,ne.width,ne.height)}for(let ne=0,_e=Be.length;ne<_e;ne++)Me=Be[ne],We?H&&t.texSubImage2D(n.TEXTURE_2D,ne,0,0,pe,Ie,Me):t.texImage2D(n.TEXTURE_2D,ne,ve,pe,Ie,Me);v.generateMipmaps=!1}else if(We){if(Qe){const ne=Ve(te);t.texStorage2D(n.TEXTURE_2D,xe,ve,ne.width,ne.height)}H&&t.texSubImage2D(n.TEXTURE_2D,0,0,0,pe,Ie,te)}else t.texImage2D(n.TEXTURE_2D,0,ve,pe,Ie,te);m(v)&&_(V),fe.__version=le.version,v.onUpdate&&v.onUpdate(v)}P.__version=v.version}function he(P,v,U){if(v.image.length!==6)return;const V=Xe(P,v),Z=v.source;t.bindTexture(n.TEXTURE_CUBE_MAP,P.__webglTexture,n.TEXTURE0+U);const le=i.get(Z);if(Z.version!==le.__version||V===!0){t.activeTexture(n.TEXTURE0+U);const fe=lt.getPrimaries(lt.workingColorSpace),Q=v.colorSpace===Zn?null:lt.getPrimaries(v.colorSpace),te=v.colorSpace===Zn||fe===Q?n.NONE:n.BROWSER_DEFAULT_WEBGL;t.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,v.flipY),t.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,v.premultiplyAlpha),t.pixelStorei(n.UNPACK_ALIGNMENT,v.unpackAlignment),t.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,te);const pe=v.isCompressedTexture||v.image[0].isCompressedTexture,Ie=v.image[0]&&v.image[0].isDataTexture,ve=[];for(let oe=0;oe<6;oe++)!pe&&!Ie?ve[oe]=M(v.image[oe],!0,r.maxCubemapSize):ve[oe]=Ie?v.image[oe].image:v.image[oe],ve[oe]=rt(v,ve[oe]);const Me=ve[0],Be=a.convert(v.format,v.colorSpace),We=a.convert(v.type),Qe=S(v.internalFormat,Be,We,v.normalized,v.colorSpace),H=v.isVideoTexture!==!0,xe=le.__version===void 0||V===!0,ne=Z.dataReady;let _e=A(v,Me);He(n.TEXTURE_CUBE_MAP,v);let ye;if(pe){H&&xe&&t.texStorage2D(n.TEXTURE_CUBE_MAP,_e,Qe,Me.width,Me.height);for(let oe=0;oe<6;oe++){ye=ve[oe].mipmaps;for(let ke=0;ke<ye.length;ke++){const Ne=ye[ke];v.format!==Hn?Be!==null?H?ne&&t.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+oe,ke,0,0,Ne.width,Ne.height,Be,Ne.data):t.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+oe,ke,Qe,Ne.width,Ne.height,0,Ne.data):Ke("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):H?ne&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+oe,ke,0,0,Ne.width,Ne.height,Be,We,Ne.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+oe,ke,Qe,Ne.width,Ne.height,0,Be,We,Ne.data)}}}else{if(ye=v.mipmaps,H&&xe){ye.length>0&&_e++;const oe=Ve(ve[0]);t.texStorage2D(n.TEXTURE_CUBE_MAP,_e,Qe,oe.width,oe.height)}for(let oe=0;oe<6;oe++)if(Ie){H?ne&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+oe,0,0,0,ve[oe].width,ve[oe].height,Be,We,ve[oe].data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+oe,0,Qe,ve[oe].width,ve[oe].height,0,Be,We,ve[oe].data);for(let ke=0;ke<ye.length;ke++){const Pt=ye[ke].image[oe].image;H?ne&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+oe,ke+1,0,0,Pt.width,Pt.height,Be,We,Pt.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+oe,ke+1,Qe,Pt.width,Pt.height,0,Be,We,Pt.data)}}else{H?ne&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+oe,0,0,0,Be,We,ve[oe]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+oe,0,Qe,Be,We,ve[oe]);for(let ke=0;ke<ye.length;ke++){const Ne=ye[ke];H?ne&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+oe,ke+1,0,0,Be,We,Ne.image[oe]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+oe,ke+1,Qe,Be,We,Ne.image[oe])}}}m(v)&&_(n.TEXTURE_CUBE_MAP),le.__version=Z.version,v.onUpdate&&v.onUpdate(v)}P.__version=v.version}function se(P,v,U,V,Z,le){const fe=a.convert(U.format,U.colorSpace),Q=a.convert(U.type),te=S(U.internalFormat,fe,Q,U.normalized,U.colorSpace),pe=i.get(v),Ie=i.get(U);if(Ie.__renderTarget=v,!pe.__hasExternalTextures){const ve=Math.max(1,v.width>>le),Me=Math.max(1,v.height>>le);Z===n.TEXTURE_3D||Z===n.TEXTURE_2D_ARRAY?t.texImage3D(Z,le,te,ve,Me,v.depth,0,fe,Q,null):t.texImage2D(Z,le,te,ve,Me,0,fe,Q,null)}t.bindFramebuffer(n.FRAMEBUFFER,P),Lt(v)?l.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,V,Z,Ie.__webglTexture,0,At(v)):(Z===n.TEXTURE_2D||Z>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&Z<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,V,Z,Ie.__webglTexture,le),t.bindFramebuffer(n.FRAMEBUFFER,null)}function Ae(P,v,U){if(n.bindRenderbuffer(n.RENDERBUFFER,P),v.depthBuffer){const V=v.depthTexture,Z=V&&V.isDepthTexture?V.type:null,le=R(v.stencilBuffer,Z),fe=v.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;Lt(v)?l.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,At(v),le,v.width,v.height):U?n.renderbufferStorageMultisample(n.RENDERBUFFER,At(v),le,v.width,v.height):n.renderbufferStorage(n.RENDERBUFFER,le,v.width,v.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,fe,n.RENDERBUFFER,P)}else{const V=v.textures;for(let Z=0;Z<V.length;Z++){const le=V[Z],fe=a.convert(le.format,le.colorSpace),Q=a.convert(le.type),te=S(le.internalFormat,fe,Q,le.normalized,le.colorSpace);Lt(v)?l.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,At(v),te,v.width,v.height):U?n.renderbufferStorageMultisample(n.RENDERBUFFER,At(v),te,v.width,v.height):n.renderbufferStorage(n.RENDERBUFFER,te,v.width,v.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function tt(P,v,U){const V=v.isWebGLCubeRenderTarget===!0;if(t.bindFramebuffer(n.FRAMEBUFFER,P),!(v.depthTexture&&v.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");const Z=i.get(v.depthTexture);if(Z.__renderTarget=v,(!Z.__webglTexture||v.depthTexture.image.width!==v.width||v.depthTexture.image.height!==v.height)&&(v.depthTexture.image.width=v.width,v.depthTexture.image.height=v.height,v.depthTexture.needsUpdate=!0),V){if(Z.__webglInit===void 0&&(Z.__webglInit=!0,v.depthTexture.addEventListener("dispose",D)),Z.__webglTexture===void 0){Z.__webglTexture=n.createTexture(),t.bindTexture(n.TEXTURE_CUBE_MAP,Z.__webglTexture),He(n.TEXTURE_CUBE_MAP,v.depthTexture);const pe=a.convert(v.depthTexture.format),Ie=a.convert(v.depthTexture.type);let ve;v.depthTexture.format===zi?ve=n.DEPTH_COMPONENT24:v.depthTexture.format===pr&&(ve=n.DEPTH24_STENCIL8);for(let Me=0;Me<6;Me++)n.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Me,0,ve,v.width,v.height,0,pe,Ie,null)}}else ae(v.depthTexture,0);const le=Z.__webglTexture,fe=At(v),Q=V?n.TEXTURE_CUBE_MAP_POSITIVE_X+U:n.TEXTURE_2D,te=v.depthTexture.format===pr?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;if(v.depthTexture.format===zi)Lt(v)?l.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,te,Q,le,0,fe):n.framebufferTexture2D(n.FRAMEBUFFER,te,Q,le,0);else if(v.depthTexture.format===pr)Lt(v)?l.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,te,Q,le,0,fe):n.framebufferTexture2D(n.FRAMEBUFFER,te,Q,le,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function Oe(P){const v=i.get(P),U=P.isWebGLCubeRenderTarget===!0;if(v.__boundDepthTexture!==P.depthTexture){const V=P.depthTexture;if(v.__depthDisposeCallback&&v.__depthDisposeCallback(),V){const Z=()=>{delete v.__boundDepthTexture,delete v.__depthDisposeCallback,V.removeEventListener("dispose",Z)};V.addEventListener("dispose",Z),v.__depthDisposeCallback=Z}v.__boundDepthTexture=V}if(P.depthTexture&&!v.__autoAllocateDepthBuffer)if(U)for(let V=0;V<6;V++)tt(v.__webglFramebuffer[V],P,V);else{const V=P.texture.mipmaps;V&&V.length>0?tt(v.__webglFramebuffer[0],P,0):tt(v.__webglFramebuffer,P,0)}else if(U){v.__webglDepthbuffer=[];for(let V=0;V<6;V++)if(t.bindFramebuffer(n.FRAMEBUFFER,v.__webglFramebuffer[V]),v.__webglDepthbuffer[V]===void 0)v.__webglDepthbuffer[V]=n.createRenderbuffer(),Ae(v.__webglDepthbuffer[V],P,!1);else{const Z=P.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,le=v.__webglDepthbuffer[V];n.bindRenderbuffer(n.RENDERBUFFER,le),n.framebufferRenderbuffer(n.FRAMEBUFFER,Z,n.RENDERBUFFER,le)}}else{const V=P.texture.mipmaps;if(V&&V.length>0?t.bindFramebuffer(n.FRAMEBUFFER,v.__webglFramebuffer[0]):t.bindFramebuffer(n.FRAMEBUFFER,v.__webglFramebuffer),v.__webglDepthbuffer===void 0)v.__webglDepthbuffer=n.createRenderbuffer(),Ae(v.__webglDepthbuffer,P,!1);else{const Z=P.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,le=v.__webglDepthbuffer;n.bindRenderbuffer(n.RENDERBUFFER,le),n.framebufferRenderbuffer(n.FRAMEBUFFER,Z,n.RENDERBUFFER,le)}}t.bindFramebuffer(n.FRAMEBUFFER,null)}function ze(P,v,U){const V=i.get(P);v!==void 0&&se(V.__webglFramebuffer,P,P.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),U!==void 0&&Oe(P)}function Je(P){const v=P.texture,U=i.get(P),V=i.get(v);P.addEventListener("dispose",b);const Z=P.textures,le=P.isWebGLCubeRenderTarget===!0,fe=Z.length>1;if(fe||(V.__webglTexture===void 0&&(V.__webglTexture=n.createTexture()),V.__version=v.version,o.memory.textures++),le){U.__webglFramebuffer=[];for(let Q=0;Q<6;Q++)if(v.mipmaps&&v.mipmaps.length>0){U.__webglFramebuffer[Q]=[];for(let te=0;te<v.mipmaps.length;te++)U.__webglFramebuffer[Q][te]=n.createFramebuffer()}else U.__webglFramebuffer[Q]=n.createFramebuffer()}else{if(v.mipmaps&&v.mipmaps.length>0){U.__webglFramebuffer=[];for(let Q=0;Q<v.mipmaps.length;Q++)U.__webglFramebuffer[Q]=n.createFramebuffer()}else U.__webglFramebuffer=n.createFramebuffer();if(fe)for(let Q=0,te=Z.length;Q<te;Q++){const pe=i.get(Z[Q]);pe.__webglTexture===void 0&&(pe.__webglTexture=n.createTexture(),o.memory.textures++)}if(P.samples>0&&Lt(P)===!1){U.__webglMultisampledFramebuffer=n.createFramebuffer(),U.__webglColorRenderbuffer=[],t.bindFramebuffer(n.FRAMEBUFFER,U.__webglMultisampledFramebuffer);for(let Q=0;Q<Z.length;Q++){const te=Z[Q];U.__webglColorRenderbuffer[Q]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,U.__webglColorRenderbuffer[Q]);const pe=a.convert(te.format,te.colorSpace),Ie=a.convert(te.type),ve=S(te.internalFormat,pe,Ie,te.normalized,te.colorSpace,P.isXRRenderTarget===!0),Me=At(P);n.renderbufferStorageMultisample(n.RENDERBUFFER,Me,ve,P.width,P.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+Q,n.RENDERBUFFER,U.__webglColorRenderbuffer[Q])}n.bindRenderbuffer(n.RENDERBUFFER,null),P.depthBuffer&&(U.__webglDepthRenderbuffer=n.createRenderbuffer(),Ae(U.__webglDepthRenderbuffer,P,!0)),t.bindFramebuffer(n.FRAMEBUFFER,null)}}if(le){t.bindTexture(n.TEXTURE_CUBE_MAP,V.__webglTexture),He(n.TEXTURE_CUBE_MAP,v);for(let Q=0;Q<6;Q++)if(v.mipmaps&&v.mipmaps.length>0)for(let te=0;te<v.mipmaps.length;te++)se(U.__webglFramebuffer[Q][te],P,v,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+Q,te);else se(U.__webglFramebuffer[Q],P,v,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+Q,0);m(v)&&_(n.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(fe){for(let Q=0,te=Z.length;Q<te;Q++){const pe=Z[Q],Ie=i.get(pe);let ve=n.TEXTURE_2D;(P.isWebGL3DRenderTarget||P.isWebGLArrayRenderTarget)&&(ve=P.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(ve,Ie.__webglTexture),He(ve,pe),se(U.__webglFramebuffer,P,pe,n.COLOR_ATTACHMENT0+Q,ve,0),m(pe)&&_(ve)}t.unbindTexture()}else{let Q=n.TEXTURE_2D;if((P.isWebGL3DRenderTarget||P.isWebGLArrayRenderTarget)&&(Q=P.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(Q,V.__webglTexture),He(Q,v),v.mipmaps&&v.mipmaps.length>0)for(let te=0;te<v.mipmaps.length;te++)se(U.__webglFramebuffer[te],P,v,n.COLOR_ATTACHMENT0,Q,te);else se(U.__webglFramebuffer,P,v,n.COLOR_ATTACHMENT0,Q,0);m(v)&&_(Q),t.unbindTexture()}P.depthBuffer&&Oe(P)}function $e(P){const v=P.textures;for(let U=0,V=v.length;U<V;U++){const Z=v[U];if(m(Z)){const le=y(P),fe=i.get(Z).__webglTexture;t.bindTexture(le,fe),_(le),t.unbindTexture()}}}const Ct=[],zt=[];function an(P){if(P.samples>0){if(Lt(P)===!1){const v=P.textures,U=P.width,V=P.height;let Z=n.COLOR_BUFFER_BIT;const le=P.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,fe=i.get(P),Q=v.length>1;if(Q)for(let pe=0;pe<v.length;pe++)t.bindFramebuffer(n.FRAMEBUFFER,fe.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+pe,n.RENDERBUFFER,null),t.bindFramebuffer(n.FRAMEBUFFER,fe.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+pe,n.TEXTURE_2D,null,0);t.bindFramebuffer(n.READ_FRAMEBUFFER,fe.__webglMultisampledFramebuffer);const te=P.texture.mipmaps;te&&te.length>0?t.bindFramebuffer(n.DRAW_FRAMEBUFFER,fe.__webglFramebuffer[0]):t.bindFramebuffer(n.DRAW_FRAMEBUFFER,fe.__webglFramebuffer);for(let pe=0;pe<v.length;pe++){if(P.resolveDepthBuffer&&(P.depthBuffer&&(Z|=n.DEPTH_BUFFER_BIT),P.stencilBuffer&&P.resolveStencilBuffer&&(Z|=n.STENCIL_BUFFER_BIT)),Q){n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,fe.__webglColorRenderbuffer[pe]);const Ie=i.get(v[pe]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,Ie,0)}n.blitFramebuffer(0,0,U,V,0,0,U,V,Z,n.NEAREST),c===!0&&(Ct.length=0,zt.length=0,Ct.push(n.COLOR_ATTACHMENT0+pe),P.depthBuffer&&P.storeMultisampledDepthBuffer===!1&&(Ct.push(le),zt.push(le),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,zt)),n.invalidateFramebuffer(n.READ_FRAMEBUFFER,Ct))}if(t.bindFramebuffer(n.READ_FRAMEBUFFER,null),t.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),Q)for(let pe=0;pe<v.length;pe++){t.bindFramebuffer(n.FRAMEBUFFER,fe.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+pe,n.RENDERBUFFER,fe.__webglColorRenderbuffer[pe]);const Ie=i.get(v[pe]).__webglTexture;t.bindFramebuffer(n.FRAMEBUFFER,fe.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+pe,n.TEXTURE_2D,Ie,0)}t.bindFramebuffer(n.DRAW_FRAMEBUFFER,fe.__webglMultisampledFramebuffer)}else if(P.depthBuffer&&P.storeMultisampledDepthBuffer===!1&&c){const v=P.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[v])}}}function At(P){return Math.min(r.maxSamples,P.samples)}function Lt(P){const v=i.get(P);return P.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&v.__useRenderToTexture!==!1}function z(P){const v=o.render.frame;h.get(P)!==v&&(h.set(P,v),P.update())}function rt(P,v){const U=P.colorSpace,V=P.format,Z=P.type;return P.isCompressedTexture===!0||P.isVideoTexture===!0||U!==La&&U!==Zn&&(lt.getTransfer(U)===yt?(V!==Hn||Z!==On)&&Ke("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):pt("WebGLTextures: Unsupported texture color space:",U)),v}function Ve(P){return typeof HTMLImageElement<"u"&&P instanceof HTMLImageElement?(u.width=P.naturalWidth||P.width,u.height=P.naturalHeight||P.height):typeof VideoFrame<"u"&&P instanceof VideoFrame?(u.width=P.displayWidth,u.height=P.displayHeight):(u.width=P.width,u.height=P.height),u}this.allocateTextureUnit=W,this.resetTextureUnits=N,this.getTextureUnits=O,this.setTextureUnits=B,this.setTexture2D=ae,this.setTexture2DArray=q,this.setTexture3D=ee,this.setTextureCube=F,this.rebindTextures=ze,this.setupRenderTarget=Je,this.updateRenderTargetMipmap=$e,this.updateMultisampleRenderTarget=an,this.setupDepthRenderbuffer=Oe,this.setupFrameBufferTexture=se,this.useMultisampledRTT=Lt,this.isReversedDepthBuffer=function(){return t.buffers.depth.getReversed()}}function _x(n,e){function t(i,r=Zn){let a;const o=lt.getTransfer(r);if(i===On)return n.UNSIGNED_BYTE;if(i===Gl)return n.UNSIGNED_SHORT_4_4_4_4;if(i===Wl)return n.UNSIGNED_SHORT_5_5_5_1;if(i===lh)return n.UNSIGNED_INT_5_9_9_9_REV;if(i===ch)return n.UNSIGNED_INT_10F_11F_11F_REV;if(i===sh)return n.BYTE;if(i===oh)return n.SHORT;if(i===Ra)return n.UNSIGNED_SHORT;if(i===Hl)return n.INT;if(i===xi)return n.UNSIGNED_INT;if(i===fi)return n.FLOAT;if(i===_i)return n.HALF_FLOAT;if(i===uh)return n.ALPHA;if(i===hh)return n.RGB;if(i===Hn)return n.RGBA;if(i===zi)return n.DEPTH_COMPONENT;if(i===pr)return n.DEPTH_STENCIL;if(i===dh)return n.RED;if(i===Vl)return n.RED_INTEGER;if(i===br)return n.RG;if(i===Yl)return n.RG_INTEGER;if(i===Xl)return n.RGBA_INTEGER;if(i===vs||i===bs||i===Ss||i===Es)if(o===yt)if(a=e.get("WEBGL_compressed_texture_s3tc_srgb"),a!==null){if(i===vs)return a.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===bs)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===Ss)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===Es)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(a=e.get("WEBGL_compressed_texture_s3tc"),a!==null){if(i===vs)return a.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===bs)return a.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===Ss)return a.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===Es)return a.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===Ko||i===qo||i===Zo||i===$o)if(a=e.get("WEBGL_compressed_texture_pvrtc"),a!==null){if(i===Ko)return a.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===qo)return a.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===Zo)return a.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===$o)return a.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===Jo||i===Qo||i===jo||i===el||i===tl||i===Rs||i===nl)if(a=e.get("WEBGL_compressed_texture_etc"),a!==null){if(i===Jo||i===Qo)return o===yt?a.COMPRESSED_SRGB8_ETC2:a.COMPRESSED_RGB8_ETC2;if(i===jo)return o===yt?a.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:a.COMPRESSED_RGBA8_ETC2_EAC;if(i===el)return a.COMPRESSED_R11_EAC;if(i===tl)return a.COMPRESSED_SIGNED_R11_EAC;if(i===Rs)return a.COMPRESSED_RG11_EAC;if(i===nl)return a.COMPRESSED_SIGNED_RG11_EAC}else return null;if(i===il||i===rl||i===al||i===sl||i===ol||i===ll||i===cl||i===ul||i===hl||i===dl||i===fl||i===pl||i===gl||i===ml)if(a=e.get("WEBGL_compressed_texture_astc"),a!==null){if(i===il)return o===yt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:a.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===rl)return o===yt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:a.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===al)return o===yt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:a.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===sl)return o===yt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:a.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===ol)return o===yt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:a.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===ll)return o===yt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:a.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===cl)return o===yt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:a.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===ul)return o===yt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:a.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===hl)return o===yt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:a.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===dl)return o===yt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:a.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===fl)return o===yt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:a.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===pl)return o===yt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:a.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===gl)return o===yt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:a.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===ml)return o===yt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:a.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===Ml||i===xl||i===_l)if(a=e.get("EXT_texture_compression_bptc"),a!==null){if(i===Ml)return o===yt?a.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:a.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===xl)return a.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===_l)return a.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===vl||i===bl||i===Cs||i===Sl)if(a=e.get("EXT_texture_compression_rgtc"),a!==null){if(i===vl)return a.COMPRESSED_RED_RGTC1_EXT;if(i===bl)return a.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===Cs)return a.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===Sl)return a.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===Ca?n.UNSIGNED_INT_24_8:n[i]!==void 0?n[i]:null}return{convert:t}}const vx=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,bx=`
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

}`;class Sx{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){const i=new Eh(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=i}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,i=new vn({vertexShader:vx,fragmentShader:bx,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new wn(new bi(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class Ex extends Er{constructor(e,t){super();const i=this;let r=null,a=1,o=null,l="local-floor",c=1,u=null,h=null,f=null,d=null,p=null,g=null;const x=typeof XRWebGLBinding<"u",M=new Sx,m={},_=t.getContextAttributes();let y=null,S=null;const R=[],A=[],D=new Ze;let b=null,w=null;const L=new kn;L.viewport=new kt;const C=new kn;C.viewport=new kt;const I=[L,C],N=new D1;let O=null,B=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(j){let ie=R[j];return ie===void 0&&(ie=new oo,R[j]=ie),ie.getTargetRaySpace()},this.getControllerGrip=function(j){let ie=R[j];return ie===void 0&&(ie=new oo,R[j]=ie),ie.getGripSpace()},this.getHand=function(j){let ie=R[j];return ie===void 0&&(ie=new oo,R[j]=ie),ie.getHandSpace()};function W(j){const ie=A.indexOf(j.inputSource);if(ie===-1)return;const G=R[ie];G!==void 0&&(G.update(j.inputSource,j.frame,u||o),G.dispatchEvent({type:j.type,data:j.inputSource}))}function $(){r.removeEventListener("select",W),r.removeEventListener("selectstart",W),r.removeEventListener("selectend",W),r.removeEventListener("squeeze",W),r.removeEventListener("squeezestart",W),r.removeEventListener("squeezeend",W),r.removeEventListener("end",$),r.removeEventListener("inputsourceschange",ae);for(let j=0;j<R.length;j++){const ie=A[j];ie!==null&&(A[j]=null,R[j].disconnect(ie))}O=null,B=null,M.reset();for(const j in m)delete m[j];if(e.setRenderTarget(y),p=null,d=null,f=null,r=null,S=null,Xe.stop(),i.isPresenting=!1,e.setPixelRatio(b),e.setSize(D.width,D.height,!1),w!==null){const j=w.camera;j.fov=w.fov,j.zoom=w.zoom,j.updateProjectionMatrix(),w=null}i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(j){a=j,i.isPresenting===!0&&Ke("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(j){l=j,i.isPresenting===!0&&Ke("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return u||o},this.setReferenceSpace=function(j){u=j},this.getBaseLayer=function(){return d!==null?d:p},this.getBinding=function(){return f===null&&x&&(f=new XRWebGLBinding(r,t)),f},this.getFrame=function(){return g},this.getSession=function(){return r},this.setSession=async function(j){if(r=j,r!==null){if(y=e.getRenderTarget(),r.addEventListener("select",W),r.addEventListener("selectstart",W),r.addEventListener("selectend",W),r.addEventListener("squeeze",W),r.addEventListener("squeezestart",W),r.addEventListener("squeezeend",W),r.addEventListener("end",$),r.addEventListener("inputsourceschange",ae),_.xrCompatible!==!0&&await t.makeXRCompatible(),b=e.getPixelRatio(),e.getSize(D),x&&"createProjectionLayer"in XRWebGLBinding.prototype){let G=null,he=null,se=null;_.depth&&(se=_.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,G=_.stencil?pr:zi,he=_.stencil?Ca:xi);const Ae={colorFormat:t.RGBA8,depthFormat:se,scaleFactor:a};f=this.getBinding(),d=f.createProjectionLayer(Ae),r.updateRenderState({layers:[d]}),e.setPixelRatio(1),e.setSize(d.textureWidth,d.textureHeight,!1),S=new Gn(d.textureWidth,d.textureHeight,{format:Hn,type:On,depthTexture:new Da(d.textureWidth,d.textureHeight,he,void 0,void 0,void 0,void 0,void 0,void 0,G),stencilBuffer:_.stencil,colorSpace:e.outputColorSpace,samples:_.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1,storeMultisampledDepthBuffer:d.ignoreDepthValues===!1,storeMultisampledStencilBuffer:d.ignoreDepthValues===!1})}else{const G={antialias:_.antialias,alpha:!0,depth:_.depth,stencil:_.stencil,framebufferScaleFactor:a};p=new XRWebGLLayer(r,t,G),r.updateRenderState({baseLayer:p}),e.setPixelRatio(1),e.setSize(p.framebufferWidth,p.framebufferHeight,!1),S=new Gn(p.framebufferWidth,p.framebufferHeight,{format:Hn,type:On,colorSpace:e.outputColorSpace,stencilBuffer:_.stencil,resolveDepthBuffer:p.ignoreDepthValues===!1,resolveStencilBuffer:p.ignoreDepthValues===!1,storeMultisampledDepthBuffer:p.ignoreDepthValues===!1,storeMultisampledStencilBuffer:p.ignoreDepthValues===!1})}S.isXRRenderTarget=!0,this.setFoveation(c),u=null,o=await r.requestReferenceSpace(l),Xe.setContext(r),Xe.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return M.getDepthTexture()};function ae(j){for(let ie=0;ie<j.removed.length;ie++){const G=j.removed[ie],he=A.indexOf(G);he>=0&&(A[he]=null,R[he].disconnect(G))}for(let ie=0;ie<j.added.length;ie++){const G=j.added[ie];let he=A.indexOf(G);if(he===-1){for(let Ae=0;Ae<R.length;Ae++)if(Ae>=A.length){A.push(G),he=Ae;break}else if(A[Ae]===null){A[Ae]=G,he=Ae;break}if(he===-1)break}const se=R[he];se&&se.connect(G)}}const q=new Y,ee=new Y;function F(j,ie,G){q.setFromMatrixPosition(ie.matrixWorld),ee.setFromMatrixPosition(G.matrixWorld);const he=q.distanceTo(ee),se=ie.projectionMatrix.elements,Ae=G.projectionMatrix.elements,tt=se[14]/(se[10]-1),Oe=se[14]/(se[10]+1),ze=(se[9]+1)/se[5],Je=(se[9]-1)/se[5],$e=(se[8]-1)/se[0],Ct=(Ae[8]+1)/Ae[0],zt=tt*$e,an=tt*Ct,At=he/(-$e+Ct),Lt=At*-$e;if(ie.matrixWorld.decompose(j.position,j.quaternion,j.scale),j.translateX(Lt),j.translateZ(At),j.matrixWorld.compose(j.position,j.quaternion,j.scale),j.matrixWorldInverse.copy(j.matrixWorld).invert(),se[10]===-1)j.projectionMatrix.copy(ie.projectionMatrix),j.projectionMatrixInverse.copy(ie.projectionMatrixInverse);else{const z=tt+At,rt=Oe+At,Ve=zt-Lt,P=an+(he-Lt),v=ze*Oe/rt*z,U=Je*Oe/rt*z;j.projectionMatrix.makePerspective(Ve,P,v,U,z,rt),j.projectionMatrixInverse.copy(j.projectionMatrix).invert()}}function re(j,ie){ie===null?j.matrixWorld.copy(j.matrix):j.matrixWorld.multiplyMatrices(ie.matrixWorld,j.matrix),j.matrixWorldInverse.copy(j.matrixWorld).invert()}this.updateCamera=function(j){if(r===null)return;let ie=j.near,G=j.far;M.texture!==null&&(M.depthNear>0&&(ie=M.depthNear),M.depthFar>0&&(G=M.depthFar)),N.near=C.near=L.near=ie,N.far=C.far=L.far=G,(O!==N.near||B!==N.far)&&(r.updateRenderState({depthNear:N.near,depthFar:N.far}),O=N.near,B=N.far),N.layers.mask=j.layers.mask|6,L.layers.mask=N.layers.mask&-5,C.layers.mask=N.layers.mask&-3;const he=j.parent,se=N.cameras;re(N,he);for(let Ae=0;Ae<se.length;Ae++)re(se[Ae],he);se.length===2?F(N,L,C):N.projectionMatrix.copy(L.projectionMatrix),w===null&&j.isPerspectiveCamera&&(w={camera:j,fov:j.fov,zoom:j.zoom}),ue(j,N,he)};function ue(j,ie,G){G===null?j.matrix.copy(ie.matrixWorld):(j.matrix.copy(G.matrixWorld),j.matrix.invert(),j.matrix.multiply(ie.matrixWorld)),j.matrix.decompose(j.position,j.quaternion,j.scale),j.updateMatrixWorld(!0),j.projectionMatrix.copy(ie.projectionMatrix),j.projectionMatrixInverse.copy(ie.projectionMatrixInverse),j.isPerspectiveCamera&&(j.fov=El*2*Math.atan(1/j.projectionMatrix.elements[5]),j.zoom=1)}this.getCamera=function(){return N},this.getFoveation=function(){if(!(d===null&&p===null))return c},this.setFoveation=function(j){c=j,d!==null&&(d.fixedFoveation=j),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=j)},this.hasDepthSensing=function(){return M.texture!==null},this.getDepthSensingMesh=function(){return M.getMesh(N)},this.getCameraTexture=function(j){return m[j]};let Pe=null;function He(j,ie){if(h=ie.getViewerPose(u||o),g=ie,h!==null){const G=h.views;p!==null&&(e.setRenderTargetFramebuffer(S,p.framebuffer),e.setRenderTarget(S));let he=!1;G.length!==N.cameras.length&&(N.cameras.length=0,he=!0);for(let Oe=0;Oe<G.length;Oe++){const ze=G[Oe];let Je=null;if(p!==null)Je=p.getViewport(ze);else{const Ct=f.getViewSubImage(d,ze);Je=Ct.viewport,Oe===0&&(e.setRenderTargetTextures(S,Ct.colorTexture,Ct.depthStencilTexture),e.setRenderTarget(S))}let $e=I[Oe];$e===void 0&&($e=new kn,$e.layers.enable(Oe),$e.viewport=new kt,I[Oe]=$e),$e.matrix.fromArray(ze.transform.matrix),$e.matrix.decompose($e.position,$e.quaternion,$e.scale),$e.projectionMatrix.fromArray(ze.projectionMatrix),$e.projectionMatrixInverse.copy($e.projectionMatrix).invert(),$e.viewport.set(Je.x,Je.y,Je.width,Je.height),Oe===0&&(N.matrix.copy($e.matrix),N.matrix.decompose(N.position,N.quaternion,N.scale)),he===!0&&N.cameras.push($e)}const se=r.enabledFeatures;if(se&&se.includes("depth-sensing")&&r.depthUsage=="gpu-optimized"&&x){f=i.getBinding();const Oe=f.getDepthInformation(G[0]);Oe&&Oe.isValid&&Oe.texture&&M.init(Oe,r.renderState)}if(se&&se.includes("camera-access")&&x){e.state.unbindTexture(),f=i.getBinding();for(let Oe=0;Oe<G.length;Oe++){const ze=G[Oe].camera;if(ze){let Je=m[ze];Je||(Je=new Eh,m[ze]=Je);const $e=f.getCameraImage(ze);Je.sourceTexture=$e}}}}for(let G=0;G<R.length;G++){const he=A[G],se=R[G];he!==null&&se!==void 0&&se.update(he,ie,u||o)}Pe&&Pe(j,ie),ie.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:ie}),g=null}const Xe=new Rh;Xe.setAnimationLoop(He),this.setAnimationLoop=function(j){Pe=j},this.dispose=function(){}}}const yx=new Kt,Nh=new qe;Nh.set(-1,0,0,0,1,0,0,0,1);function wx(n,e){function t(M,m){M.matrixAutoUpdate===!0&&M.updateMatrix(),m.value.copy(M.matrix)}function i(M,m){m.color.getRGB(M.fogColor.value,yh(n)),m.isFog?(M.fogNear.value=m.near,M.fogFar.value=m.far):m.isFogExp2&&(M.fogDensity.value=m.density)}function r(M,m,_,y,S){m.isNodeMaterial?m.uniformsNeedUpdate=!1:m.isMeshBasicMaterial?a(M,m):m.isMeshLambertMaterial?(a(M,m),m.envMap&&(M.envMapIntensity.value=m.envMapIntensity)):m.isMeshToonMaterial?(a(M,m),f(M,m)):m.isMeshPhongMaterial?(a(M,m),h(M,m),m.envMap&&(M.envMapIntensity.value=m.envMapIntensity)):m.isMeshStandardMaterial?(a(M,m),d(M,m),m.isMeshPhysicalMaterial&&p(M,m,S)):m.isMeshMatcapMaterial?(a(M,m),g(M,m)):m.isMeshDepthMaterial?a(M,m):m.isMeshDistanceMaterial?(a(M,m),x(M,m)):m.isMeshNormalMaterial?a(M,m):m.isLineBasicMaterial?(o(M,m),m.isLineDashedMaterial&&l(M,m)):m.isPointsMaterial?c(M,m,_,y):m.isSpriteMaterial?u(M,m):m.isShadowMaterial?(M.color.value.copy(m.color),M.opacity.value=m.opacity):m.isShaderMaterial&&(m.uniformsNeedUpdate=!1)}function a(M,m){M.opacity.value=m.opacity,m.color&&M.diffuse.value.copy(m.color),m.emissive&&M.emissive.value.copy(m.emissive).multiplyScalar(m.emissiveIntensity),m.map&&(M.map.value=m.map,t(m.map,M.mapTransform)),m.alphaMap&&(M.alphaMap.value=m.alphaMap,t(m.alphaMap,M.alphaMapTransform)),m.bumpMap&&(M.bumpMap.value=m.bumpMap,t(m.bumpMap,M.bumpMapTransform),M.bumpScale.value=m.bumpScale,m.side===Cn&&(M.bumpScale.value*=-1)),m.normalMap&&(M.normalMap.value=m.normalMap,t(m.normalMap,M.normalMapTransform),M.normalScale.value.copy(m.normalScale),m.side===Cn&&M.normalScale.value.negate()),m.displacementMap&&(M.displacementMap.value=m.displacementMap,t(m.displacementMap,M.displacementMapTransform),M.displacementScale.value=m.displacementScale,M.displacementBias.value=m.displacementBias),m.emissiveMap&&(M.emissiveMap.value=m.emissiveMap,t(m.emissiveMap,M.emissiveMapTransform)),m.specularMap&&(M.specularMap.value=m.specularMap,t(m.specularMap,M.specularMapTransform)),m.alphaTest>0&&(M.alphaTest.value=m.alphaTest);const _=e.get(m),y=_.envMap,S=_.envMapRotation;y&&(M.envMap.value=y,M.envMapRotation.value.setFromMatrix4(yx.makeRotationFromEuler(S)).transpose(),y.isCubeTexture&&y.isRenderTargetTexture===!1&&M.envMapRotation.value.premultiply(Nh),M.reflectivity.value=m.reflectivity,M.ior.value=m.ior,M.refractionRatio.value=m.refractionRatio),m.lightMap&&(M.lightMap.value=m.lightMap,M.lightMapIntensity.value=m.lightMapIntensity,t(m.lightMap,M.lightMapTransform)),m.aoMap&&(M.aoMap.value=m.aoMap,M.aoMapIntensity.value=m.aoMapIntensity,t(m.aoMap,M.aoMapTransform))}function o(M,m){M.diffuse.value.copy(m.color),M.opacity.value=m.opacity,m.map&&(M.map.value=m.map,t(m.map,M.mapTransform))}function l(M,m){M.dashSize.value=m.dashSize,M.totalSize.value=m.dashSize+m.gapSize,M.scale.value=m.scale}function c(M,m,_,y){M.diffuse.value.copy(m.color),M.opacity.value=m.opacity,M.size.value=m.size*_,M.scale.value=y*.5,m.map&&(M.map.value=m.map,t(m.map,M.uvTransform)),m.alphaMap&&(M.alphaMap.value=m.alphaMap,t(m.alphaMap,M.alphaMapTransform)),m.alphaTest>0&&(M.alphaTest.value=m.alphaTest)}function u(M,m){M.diffuse.value.copy(m.color),M.opacity.value=m.opacity,M.rotation.value=m.rotation,m.map&&(M.map.value=m.map,t(m.map,M.mapTransform)),m.alphaMap&&(M.alphaMap.value=m.alphaMap,t(m.alphaMap,M.alphaMapTransform)),m.alphaTest>0&&(M.alphaTest.value=m.alphaTest)}function h(M,m){M.specular.value.copy(m.specular),M.shininess.value=Math.max(m.shininess,1e-4)}function f(M,m){m.gradientMap&&(M.gradientMap.value=m.gradientMap)}function d(M,m){M.metalness.value=m.metalness,m.metalnessMap&&(M.metalnessMap.value=m.metalnessMap,t(m.metalnessMap,M.metalnessMapTransform)),M.roughness.value=m.roughness,m.roughnessMap&&(M.roughnessMap.value=m.roughnessMap,t(m.roughnessMap,M.roughnessMapTransform)),m.envMap&&(M.envMapIntensity.value=m.envMapIntensity)}function p(M,m,_){M.ior.value=m.ior,m.sheen>0&&(M.sheenColor.value.copy(m.sheenColor).multiplyScalar(m.sheen),M.sheenRoughness.value=m.sheenRoughness,m.sheenColorMap&&(M.sheenColorMap.value=m.sheenColorMap,t(m.sheenColorMap,M.sheenColorMapTransform)),m.sheenRoughnessMap&&(M.sheenRoughnessMap.value=m.sheenRoughnessMap,t(m.sheenRoughnessMap,M.sheenRoughnessMapTransform))),m.clearcoat>0&&(M.clearcoat.value=m.clearcoat,M.clearcoatRoughness.value=m.clearcoatRoughness,m.clearcoatMap&&(M.clearcoatMap.value=m.clearcoatMap,t(m.clearcoatMap,M.clearcoatMapTransform)),m.clearcoatRoughnessMap&&(M.clearcoatRoughnessMap.value=m.clearcoatRoughnessMap,t(m.clearcoatRoughnessMap,M.clearcoatRoughnessMapTransform)),m.clearcoatNormalMap&&(M.clearcoatNormalMap.value=m.clearcoatNormalMap,t(m.clearcoatNormalMap,M.clearcoatNormalMapTransform),M.clearcoatNormalScale.value.copy(m.clearcoatNormalScale),m.side===Cn&&M.clearcoatNormalScale.value.negate())),m.dispersion>0&&(M.dispersion.value=m.dispersion),m.retroreflectivity>0&&(M.retroreflectivity.value=m.retroreflectivity),m.iridescence>0&&(M.iridescence.value=m.iridescence,M.iridescenceIOR.value=m.iridescenceIOR,M.iridescenceThicknessMinimum.value=m.iridescenceThicknessRange[0],M.iridescenceThicknessMaximum.value=m.iridescenceThicknessRange[1],m.iridescenceMap&&(M.iridescenceMap.value=m.iridescenceMap,t(m.iridescenceMap,M.iridescenceMapTransform)),m.iridescenceThicknessMap&&(M.iridescenceThicknessMap.value=m.iridescenceThicknessMap,t(m.iridescenceThicknessMap,M.iridescenceThicknessMapTransform))),m.transmission>0&&(M.transmission.value=m.transmission,M.transmissionSamplerMap.value=_.texture,M.transmissionSamplerSize.value.set(_.width,_.height),m.transmissionMap&&(M.transmissionMap.value=m.transmissionMap,t(m.transmissionMap,M.transmissionMapTransform)),M.thickness.value=m.thickness,m.thicknessMap&&(M.thicknessMap.value=m.thicknessMap,t(m.thicknessMap,M.thicknessMapTransform)),M.attenuationDistance.value=m.attenuationDistance,M.attenuationColor.value.copy(m.attenuationColor)),m.anisotropy>0&&(M.anisotropyVector.value.set(m.anisotropy*Math.cos(m.anisotropyRotation),m.anisotropy*Math.sin(m.anisotropyRotation)),m.anisotropyMap&&(M.anisotropyMap.value=m.anisotropyMap,t(m.anisotropyMap,M.anisotropyMapTransform))),M.specularIntensity.value=m.specularIntensity,M.specularColor.value.copy(m.specularColor),m.specularColorMap&&(M.specularColorMap.value=m.specularColorMap,t(m.specularColorMap,M.specularColorMapTransform)),m.specularIntensityMap&&(M.specularIntensityMap.value=m.specularIntensityMap,t(m.specularIntensityMap,M.specularIntensityMapTransform))}function g(M,m){m.matcap&&(M.matcap.value=m.matcap)}function x(M,m){const _=e.get(m).light;M.referencePosition.value.setFromMatrixPosition(_.matrixWorld),M.nearDistance.value=_.shadow.camera.near,M.farDistance.value=_.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:r}}function Ax(n,e,t,i){let r={},a={},o=[];const l=n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS);function c(S,R){const A=R.program;i.uniformBlockBinding(S,A)}function u(S,R){let A=r[S.id];A===void 0&&(M(S),A=h(S),r[S.id]=A,S.addEventListener("dispose",_));const D=R.program;i.updateUBOMapping(S,D);const b=e.render.frame;a[S.id]!==b&&(d(S),a[S.id]=b)}function h(S){const R=f();S.__bindingPointIndex=R;const A=n.createBuffer(),D=S.__size,b=S.usage;return n.bindBuffer(n.UNIFORM_BUFFER,A),n.bufferData(n.UNIFORM_BUFFER,D,b),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,R,A),A}function f(){for(let S=0;S<l;S++)if(o.indexOf(S)===-1)return o.push(S),S;return pt("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(S){const R=r[S.id],A=S.uniforms,D=S.__cache;n.bindBuffer(n.UNIFORM_BUFFER,R);for(let b=0,w=A.length;b<w;b++){const L=A[b];if(Array.isArray(L))for(let C=0,I=L.length;C<I;C++)p(L[C],b,C,D);else p(L,b,0,D)}n.bindBuffer(n.UNIFORM_BUFFER,null)}function p(S,R,A,D){if(x(S,R,A,D)===!0){const b=S.__offset,w=S.value;if(Array.isArray(w)){let L=0;for(let C=0;C<w.length;C++){const I=w[C],N=m(I);g(I,S.__data,L),typeof I!="number"&&typeof I!="boolean"&&!I.isMatrix3&&!ArrayBuffer.isView(I)&&(L+=N.storage/Float32Array.BYTES_PER_ELEMENT)}}else g(w,S.__data,0);n.bufferSubData(n.UNIFORM_BUFFER,b,S.__data)}}function g(S,R,A){typeof S=="number"||typeof S=="boolean"?R[0]=S:S.isMatrix3?(R[0]=S.elements[0],R[1]=S.elements[1],R[2]=S.elements[2],R[3]=0,R[4]=S.elements[3],R[5]=S.elements[4],R[6]=S.elements[5],R[7]=0,R[8]=S.elements[6],R[9]=S.elements[7],R[10]=S.elements[8],R[11]=0):ArrayBuffer.isView(S)?R.set(new S.constructor(S.buffer,S.byteOffset,R.length)):S.toArray(R,A)}function x(S,R,A,D){const b=S.value,w=R+"_"+A;if(D[w]===void 0)return typeof b=="number"||typeof b=="boolean"?D[w]=b:ArrayBuffer.isView(b)?D[w]=b.slice():D[w]=b.clone(),!0;{const L=D[w];if(typeof b=="number"||typeof b=="boolean"){if(L!==b)return D[w]=b,!0}else{if(ArrayBuffer.isView(b))return!0;if(L.equals(b)===!1)return L.copy(b),!0}}return!1}function M(S){const R=S.uniforms;let A=0;const D=16;for(let w=0,L=R.length;w<L;w++){const C=Array.isArray(R[w])?R[w]:[R[w]];for(let I=0,N=C.length;I<N;I++){const O=C[I],B=Array.isArray(O.value)?O.value:[O.value];for(let W=0,$=B.length;W<$;W++){const ae=B[W],q=m(ae),ee=A%D,F=ee%q.boundary,re=ee+F;A+=F,re!==0&&D-re<q.storage&&(A+=D-re),O.__data=new Float32Array(q.storage/Float32Array.BYTES_PER_ELEMENT),O.__offset=A,A+=q.storage}}}const b=A%D;return b>0&&(A+=D-b),S.__size=A,S.__cache={},this}function m(S){const R={boundary:0,storage:0};return typeof S=="number"||typeof S=="boolean"?(R.boundary=4,R.storage=4):S.isVector2?(R.boundary=8,R.storage=8):S.isVector3||S.isColor?(R.boundary=16,R.storage=12):S.isVector4?(R.boundary=16,R.storage=16):S.isMatrix3?(R.boundary=48,R.storage=48):S.isMatrix4?(R.boundary=64,R.storage=64):S.isTexture?Ke("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(S)?(R.boundary=16,R.storage=S.byteLength):Ke("WebGLRenderer: Unsupported uniform value type.",S),R}function _(S){const R=S.target;R.removeEventListener("dispose",_);const A=o.indexOf(R.__bindingPointIndex);o.splice(A,1),n.deleteBuffer(r[R.id]),delete r[R.id],delete a[R.id]}function y(){for(const S in r)n.deleteBuffer(r[S]);o=[],r={},a={}}return{bind:c,update:u,dispose:y}}const Tx=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let ri=null;function Rx(){return ri===null&&(ri=new Yr(Tx,16,16,br,_i),ri.name="DFG_LUT",ri.minFilter=$t,ri.magFilter=$t,ri.wrapS=Di,ri.wrapT=Di,ri.generateMipmaps=!1,ri.needsUpdate=!0),ri}class Cx{constructor(e={}){const{canvas:t=Zp(),context:i=null,depth:r=!0,stencil:a=!1,alpha:o=!1,antialias:l=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:u=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:f=!1,reversedDepthBuffer:d=!1,outputBufferType:p=On}=e;this.isWebGLRenderer=!0;let g;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");g=i.getContextAttributes().alpha}else g=o;const x=p,M=new Set([Xl,Yl,Vl]),m=new Set([On,xi,Ra,Ca,Gl,Wl]),_=new Uint32Array(4),y=new Int32Array(4),S=new Y;let R=null,A=null;const D=[],b=[];let w=null;this.domElement=t,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=gi,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const L=this;let C=!1,I=null,N=null,O=null,B=null;this._outputColorSpace=Bn;let W=0,$=0,ae=null,q=-1,ee=null;const F=new kt,re=new kt;let ue=null;const Pe=new Mt(0);let He=0,Xe=t.width,j=t.height,ie=1,G=null,he=null;const se=new kt(0,0,Xe,j),Ae=new kt(0,0,Xe,j);let tt=!1;const Oe=new Jl;let ze=!1,Je=!1;const $e=new Kt,Ct=new Y,zt=new kt,an={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let At=!1;function Lt(){return ae===null?ie:1}let z=i;function rt(T,k){return t.getContext(T,k)}let Ve,P,v,U,V,Z,le,fe,Q,te,pe,Ie,ve,Me,Be,We,Qe,H,xe,ne,_e,ye,oe;try{const T={alpha:!0,depth:r,stencil:a,antialias:l,premultipliedAlpha:c,preserveDrawingBuffer:u,powerPreference:h,failIfMajorPerformanceCaveat:f};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${zl}`),t.addEventListener("webglcontextlost",Pt,!1),t.addEventListener("webglcontextrestored",xt,!1),t.addEventListener("webglcontextcreationerror",Vn,!1),z===null){const k="webgl2";if(z=rt(k,T),z===null)throw rt(k)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}ke()}catch(T){throw t.removeEventListener("webglcontextlost",Pt,!1),t.removeEventListener("webglcontextrestored",xt,!1),t.removeEventListener("webglcontextcreationerror",Vn,!1),pt("WebGLRenderer: "+T.message),T}function ke(){Ve=new R2(z),Ve.init(),_e=new _x(z,Ve),P=new x2(z,Ve,e,_e),v=new Mx(z,Ve),P.reversedDepthBuffer&&d&&v.buffers.depth.setReversed(!0),N=z.createFramebuffer(),O=z.createFramebuffer(),B=z.createFramebuffer(),U=new D2(z),V=new ix,Z=new xx(z,Ve,v,V,P,_e,U),le=new T2(L),fe=new O1(z),ye=new m2(z,fe),Q=new C2(z,fe,U,ye),te=new O2(z,Q,fe,ye,U),H=new P2(z,P,Z),Be=new _2(V),pe=new nx(L,le,Ve,P,ye,Be),Ie=new wx(L,V),ve=new ax,Me=new hx(Ve),Qe=new g2(L,le,v,te,g,c),We=new mx(L,te,P),oe=new Ax(z,U,P,v),xe=new M2(z,Ve,U),ne=new L2(z,Ve,U),U.programs=pe.programs,L.capabilities=P,L.extensions=Ve,L.properties=V,L.renderLists=ve,L.shadowMap=We,L.state=v,L.info=U}x!==On&&(w=new N2(x,t.width,t.height,l,r,a));const Ne=new Ex(L,z);this.xr=Ne,this.getContext=function(){return z},this.getContextAttributes=function(){return z.getContextAttributes()},this.forceContextLoss=function(){const T=Ve.get("WEBGL_lose_context");T&&T.loseContext()},this.forceContextRestore=function(){const T=Ve.get("WEBGL_lose_context");T&&T.restoreContext()},this.getPixelRatio=function(){return ie},this.setPixelRatio=function(T){T!==void 0&&(ie=T,this.setSize(Xe,j,!1))},this.getSize=function(T){return T.set(Xe,j)},this.setSize=function(T,k,J=!0){if(Ne.isPresenting){Ke("WebGLRenderer: Can't change size while VR device is presenting.");return}Xe=T,j=k,t.width=Math.floor(T*ie),t.height=Math.floor(k*ie),J===!0&&(t.style.width=T+"px",t.style.height=k+"px"),w!==null&&w.setSize(t.width,t.height),this.setViewport(0,0,T,k)},this.getDrawingBufferSize=function(T){return T.set(Xe*ie,j*ie).floor()},this.setDrawingBufferSize=function(T,k,J){Xe=T,j=k,ie=J,t.width=Math.floor(T*J),t.height=Math.floor(k*J),this.setViewport(0,0,T,k)},this.setEffects=function(T){if(x===On){pt("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(T){for(let k=0;k<T.length;k++)if(T[k].isOutputPass===!0){Ke("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}w.setEffects(T||[])},this.getCurrentViewport=function(T){return T.copy(F)},this.getViewport=function(T){return T.copy(se)},this.setViewport=function(T,k,J,X){T.isVector4?se.set(T.x,T.y,T.z,T.w):se.set(T,k,J,X),v.viewport(F.copy(se).multiplyScalar(ie).round())},this.getScissor=function(T){return T.copy(Ae)},this.setScissor=function(T,k,J,X){T.isVector4?Ae.set(T.x,T.y,T.z,T.w):Ae.set(T,k,J,X),v.scissor(re.copy(Ae).multiplyScalar(ie).round())},this.getScissorTest=function(){return tt},this.setScissorTest=function(T){v.setScissorTest(tt=T)},this.setOpaqueSort=function(T){G=T},this.setTransparentSort=function(T){he=T},this.getClearColor=function(T){return T.copy(Qe.getClearColor())},this.setClearColor=function(){Qe.setClearColor(...arguments)},this.getClearAlpha=function(){return Qe.getClearAlpha()},this.setClearAlpha=function(){Qe.setClearAlpha(...arguments)},this.clear=function(T=!0,k=!0,J=!0){let X=0;if(T){let K=!1;if(ae!==null){const Ee=ae.texture.format;K=M.has(Ee)}if(K){const Ee=ae.texture.type,Te=m.has(Ee),Se=Qe.getClearColor(),Le=Qe.getClearAlpha(),Fe=Se.r,at=Se.g,ot=Se.b;Te?(_[0]=Fe,_[1]=at,_[2]=ot,_[3]=Le,z.clearBufferuiv(z.COLOR,0,_)):(y[0]=Fe,y[1]=at,y[2]=ot,y[3]=Le,z.clearBufferiv(z.COLOR,0,y))}else X|=z.COLOR_BUFFER_BIT}k&&(X|=z.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),J&&(X|=z.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),X!==0&&z.clear(X)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(T){T.setRenderer(this),I=T},this.dispose=function(){t.removeEventListener("webglcontextlost",Pt,!1),t.removeEventListener("webglcontextrestored",xt,!1),t.removeEventListener("webglcontextcreationerror",Vn,!1),Qe.dispose(),ve.dispose(),Me.dispose(),V.dispose(),le.dispose(),te.dispose(),ye.dispose(),oe.dispose(),pe.dispose(),Ne.dispose(),Ne.removeEventListener("sessionstart",ic),Ne.removeEventListener("sessionend",rc),ir.stop()};function Pt(T){T.preventDefault(),Rc("WebGLRenderer: Context Lost."),C=!0}function xt(){Rc("WebGLRenderer: Context Restored."),C=!1;const T=U.autoReset,k=We.enabled,J=We.autoUpdate,X=We.needsUpdate,K=We.type;ke(),U.autoReset=T,We.enabled=k,We.autoUpdate=J,We.needsUpdate=X,We.type=K}function Vn(T){pt("WebGLRenderer: A WebGL context could not be created. Reason: ",T.statusMessage)}function ti(T){const k=T.target;k.removeEventListener("dispose",ti),Vh(k)}function Vh(T){Yh(T),V.remove(T)}function Yh(T){const k=V.get(T).programs;k!==void 0&&(k.forEach(function(J){pe.releaseProgram(J)}),T.isShaderMaterial&&pe.releaseShaderCache(T))}this.renderBufferDirect=function(T,k,J,X,K,Ee){k===null&&(k=an);const Te=K.isMesh&&K.matrixWorld.determinantAffine()<0,Se=qh(T,k,J,X,K);v.setMaterial(X,Te);let Le=J.index,Fe=1;if(X.wireframe===!0){if(Le=Q.getWireframeAttribute(J),Le===void 0)return;Fe=2}const at=J.drawRange,ot=J.attributes.position;let De=at.start*Fe,_t=(at.start+at.count)*Fe;Ee!==null&&(De=Math.max(De,Ee.start*Fe),_t=Math.min(_t,(Ee.start+Ee.count)*Fe)),Le!==null?(De=Math.max(De,0),_t=Math.min(_t,Le.count)):ot!=null&&(De=Math.max(De,0),_t=Math.min(_t,ot.count));const Jt=_t-De;if(Jt<0||Jt===1/0)return;ye.setup(K,X,Se,J,Le);let It,Dt=xe;if(Le!==null&&(It=fe.get(Le),Dt=ne,Dt.setIndex(It)),K.isMesh)X.wireframe===!0?(v.setLineWidth(X.wireframeLinewidth*Lt()),Dt.setMode(z.LINES)):Dt.setMode(z.TRIANGLES);else if(K.isLine){let fn=X.linewidth;fn===void 0&&(fn=1),v.setLineWidth(fn*Lt()),K.isLineSegments?Dt.setMode(z.LINES):K.isLineLoop?Dt.setMode(z.LINE_LOOP):Dt.setMode(z.LINE_STRIP)}else K.isPoints?Dt.setMode(z.POINTS):K.isSprite&&Dt.setMode(z.TRIANGLES);if(K.isBatchedMesh)if(Ve.get("WEBGL_multi_draw"))Dt.renderMultiDraw(K._multiDrawStarts,K._multiDrawCounts,K._multiDrawCount);else{const fn=K._multiDrawStarts,we=K._multiDrawCounts,bn=K._multiDrawCount,dt=Le?fe.get(Le).bytesPerElement:1,Fn=V.get(X).currentProgram.getUniforms();for(let ni=0;ni<bn;ni++)Fn.setValue(z,"_gl_DrawID",ni),Dt.render(fn[ni]/dt,we[ni])}else if(K.isInstancedMesh)Dt.renderInstances(De,Jt,K.count);else if(J.isInstancedBufferGeometry){const fn=J._maxInstanceCount!==void 0?J._maxInstanceCount:1/0,we=Math.min(J.instanceCount,fn);Dt.renderInstances(De,Jt,we)}else Dt.render(De,Jt)};function nc(T,k,J,X){I!==null&&T.isNodeMaterial&&I.setObject(X,T),ze===!0&&Be.setState(T,J,!1),T.transparent===!0&&T.side===Li&&T.forceSinglePass===!1?(T.side=Cn,T.needsUpdate=!0,Ua(T,k,X),T.side=_r,T.needsUpdate=!0,Ua(T,k,X),T.side=Li):Ua(T,k,X)}this.compile=function(T,k,J=null){J===null&&(J=T),I!==null&&I.renderStart(T,k,J),A=Me.get(J),A.init(k),b.push(A),J.traverseVisible(function(K){K.isLight&&K.layers.test(k.layers)&&(A.pushLight(K),K.castShadow&&A.pushShadow(K))}),T!==J&&T.traverseVisible(function(K){K.isLight&&K.layers.test(k.layers)&&(A.pushLight(K),K.castShadow&&A.pushShadow(K))}),A.setupLights(),I!==null&&I.updateLights(A.state.lightsArray),Je=this.localClippingEnabled,ze=Be.init(this.clippingPlanes,Je),ze===!0&&Be.setGlobalState(this.clippingPlanes,k),I!==null&&We.render(A.state.shadowsArray,J,k);const X=new Set;return T.traverse(function(K){if(!(K.isMesh||K.isPoints||K.isLine||K.isSprite))return;const Ee=K.material;if(Ee)if(Array.isArray(Ee))for(let Te=0;Te<Ee.length;Te++){const Se=Ee[Te];nc(Se,J,k,K),X.add(Se)}else nc(Ee,J,k,K),X.add(Ee)}),A=b.pop(),I!==null&&I.renderEnd(),X},this.compileAsync=function(T,k,J=null){const X=this.compile(T,k,J);return new Promise(K=>{function Ee(){if(X.forEach(function(Te){const Le=V.get(Te).currentProgram;(Le===void 0||Le.isReady())&&X.delete(Te)}),X.size===0){K(T);return}setTimeout(Ee,10)}Ve.get("KHR_parallel_shader_compile")!==null?Ee():setTimeout(Ee,10)})};let Ys=null;function Xh(T){Ys&&Ys(T)}function ic(){ir.stop()}function rc(){ir.start()}const ir=new Rh;ir.setAnimationLoop(Xh),typeof self<"u"&&ir.setContext(self),this.setAnimationLoop=function(T){Ys=T,Ne.setAnimationLoop(T),T===null?ir.stop():ir.start()},Ne.addEventListener("sessionstart",ic),Ne.addEventListener("sessionend",rc),this.render=function(T,k){if(k!==void 0&&k.isCamera!==!0){pt("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(C===!0)return;I!==null&&I.renderStart(T,k);const J=Ne.enabled===!0&&Ne.isPresenting===!0,X=w!==null&&(ae===null||J)&&w.begin(L,ae);if(T.matrixWorldAutoUpdate===!0&&T.updateMatrixWorld(),k.parent===null&&k.matrixWorldAutoUpdate===!0&&k.updateMatrixWorld(),Ne.enabled===!0&&Ne.isPresenting===!0&&(w===null||w.isCompositing()===!1)&&(Ne.cameraAutoUpdate===!0&&Ne.updateCamera(k),k=Ne.getCamera()),T.isScene===!0&&T.onBeforeRender(L,T,k,ae),A=Me.get(T,b.length),A.init(k),A.state.textureUnits=Z.getTextureUnits(),b.push(A),$e.multiplyMatrices(k.projectionMatrix,k.matrixWorldInverse),Oe.setFromProjectionMatrix($e,pi,k.reversedDepth),Je=this.localClippingEnabled,ze=Be.init(this.clippingPlanes,Je),R=ve.get(T,D.length),R.init(),D.push(R),Ne.enabled===!0&&Ne.isPresenting===!0){const Te=L.xr.getDepthSensingMesh();Te!==null&&Xs(Te,k,-1/0,L.sortObjects)}Xs(T,k,0,L.sortObjects),R.finish(),I!==null&&I.updateLights(A.state.lightsArray),L.sortObjects===!0&&R.sort(G,he),At=Ne.enabled===!1||Ne.isPresenting===!1||Ne.hasDepthSensing()===!1,At&&Qe.addToRenderList(R,T),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),ze===!0&&Be.beginShadows();const K=A.state.shadowsArray;if(We.render(K,T,k),ze===!0&&Be.endShadows(),(X&&w.hasRenderPass())===!1){const Te=R.opaque,Se=R.transmissive;if(A.setupLights(),k.isArrayCamera){const Le=k.cameras;if(Se.length>0)for(let Fe=0,at=Le.length;Fe<at;Fe++){const ot=Le[Fe];sc(Te,Se,T,ot)}At&&Qe.render(T);for(let Fe=0,at=Le.length;Fe<at;Fe++){const ot=Le[Fe];ac(R,T,ot,ot.viewport)}}else Se.length>0&&sc(Te,Se,T,k),At&&Qe.render(T),ac(R,T,k)}ae!==null&&$===0&&(Z.updateMultisampleRenderTarget(ae),Z.updateRenderTargetMipmap(ae)),X&&w.end(L),T.isScene===!0&&T.onAfterRender(L,T,k),ye.resetDefaultState(),q=-1,ee=null,b.pop(),b.length>0?(A=b[b.length-1],Z.setTextureUnits(A.state.textureUnits),ze===!0&&Be.setGlobalState(L.clippingPlanes,A.state.camera)):A=null,D.pop(),D.length>0?R=D[D.length-1]:R=null,I!==null&&I.renderEnd()};function Xs(T,k,J,X){if(T.visible===!1)return;if(T.layers.test(k.layers)){if(T.isGroup)J=T.renderOrder;else if(T.isLOD)T.autoUpdate===!0&&T.update(k);else if(T.isLightProbeGrid)A.pushLightProbeGrid(T);else if(T.isLight)A.pushLight(T),T.castShadow&&A.pushShadow(T);else if(T.isSprite){if(!T.frustumCulled||T.intersectsFrustum(Oe)){X&&zt.setFromMatrixPosition(T.matrixWorld).applyMatrix4($e);const Te=te.update(T),Se=T.material;Se.visible&&R.push(T,Te,Se,J,zt.z,null,k)}}else if((T.isMesh||T.isLine||T.isPoints)&&(!T.frustumCulled||T.intersectsFrustum(Oe))){const Te=te.update(T),Se=T.material;if(X&&(T.boundingSphere!==void 0?(T.boundingSphere===null&&T.computeBoundingSphere(),zt.copy(T.boundingSphere.center)):(Te.boundingSphere===null&&Te.computeBoundingSphere(),zt.copy(Te.boundingSphere.center)),zt.applyMatrix4(T.matrixWorld).applyMatrix4($e)),Array.isArray(Se)){const Le=Te.groups;for(let Fe=0,at=Le.length;Fe<at;Fe++){const ot=Le[Fe],De=Se[ot.materialIndex];De&&De.visible&&R.push(T,Te,De,J,zt.z,ot,k)}}else Se.visible&&R.push(T,Te,Se,J,zt.z,null,k)}}const Ee=T.children;for(let Te=0,Se=Ee.length;Te<Se;Te++)Xs(Ee[Te],k,J,X)}function ac(T,k,J,X){const{opaque:K,transmissive:Ee,transparent:Te}=T;A.setupLightsView(J),ze===!0&&Be.setGlobalState(L.clippingPlanes,J),X&&v.viewport(F.copy(X)),K.length>0&&Fa(K,k,J),Ee.length>0&&Fa(Ee,k,J),Te.length>0&&Fa(Te,k,J),v.buffers.depth.setTest(!0),v.buffers.depth.setMask(!0),v.buffers.color.setMask(!0),v.setPolygonOffset(!1)}function sc(T,k,J,X){if((J.isScene===!0?J.overrideMaterial:null)!==null)return;if(A.state.transmissionRenderTarget[X.id]===void 0){const De=Ve.has("EXT_color_buffer_half_float")||Ve.has("EXT_color_buffer_float");A.state.transmissionRenderTarget[X.id]=new Gn(1,1,{generateMipmaps:!0,type:De?_i:On,minFilter:fr,samples:Math.max(4,P.samples),stencilBuffer:a,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:lt.workingColorSpace})}const Ee=A.state.transmissionRenderTarget[X.id],Te=X.viewport||F;Ee.setSize(Te.z*L.transmissionResolutionScale,Te.w*L.transmissionResolutionScale);const Se=L.getRenderTarget(),Le=L.getActiveCubeFace(),Fe=L.getActiveMipmapLevel();L.setRenderTarget(Ee),L.getClearColor(Pe),He=L.getClearAlpha(),He<1&&L.setClearColor(16777215,.5),L.clear(),At&&Qe.render(J);const at=L.toneMapping;L.toneMapping=gi;const ot=X.viewport;if(X.viewport!==void 0&&(X.viewport=void 0),A.setupLightsView(X),ze===!0&&Be.setGlobalState(L.clippingPlanes,X),Fa(T,J,X),Z.updateMultisampleRenderTarget(Ee),Z.updateRenderTargetMipmap(Ee),Ve.has("WEBGL_multisampled_render_to_texture")===!1){let De=!1;for(let _t=0,Jt=k.length;_t<Jt;_t++){const It=k[_t],{object:Dt,geometry:fn,material:we,group:bn}=It;if(we.side===Li&&Dt.layers.test(X.layers)){const dt=we.side;we.side=Cn,we.needsUpdate=!0,oc(Dt,J,X,fn,we,bn),we.side=dt,we.needsUpdate=!0,De=!0}}De===!0&&(Z.updateMultisampleRenderTarget(Ee),Z.updateRenderTargetMipmap(Ee))}L.setRenderTarget(Se,Le,Fe),L.setClearColor(Pe,He),ot!==void 0&&(X.viewport=ot),L.toneMapping=at}function Fa(T,k,J){const X=k.isScene===!0?k.overrideMaterial:null;for(let K=0,Ee=T.length;K<Ee;K++){const Te=T[K],{object:Se,geometry:Le,group:Fe}=Te;let at=Te.material;at.allowOverride===!0&&X!==null&&(at=X),Se.layers.test(J.layers)&&oc(Se,k,J,Le,at,Fe)}}function oc(T,k,J,X,K,Ee){I!==null&&K.isNodeMaterial&&I.setObject(T,K),T.onBeforeRender(L,k,J,X,K,Ee),T.modelViewMatrix.multiplyMatrices(J.matrixWorldInverse,T.matrixWorld),T.normalMatrix.getNormalMatrix(T.modelViewMatrix),K.onBeforeRender(L,k,J,X,T,Ee),K.transparent===!0&&K.side===Li&&K.forceSinglePass===!1?(K.side=Cn,K.needsUpdate=!0,L.renderBufferDirect(J,k,X,K,T,Ee),K.side=_r,K.needsUpdate=!0,L.renderBufferDirect(J,k,X,K,T,Ee),K.side=Li):L.renderBufferDirect(J,k,X,K,T,Ee),T.onAfterRender(L,k,J,X,K,Ee)}function Ua(T,k,J){k.isScene!==!0&&(k=an);const X=V.get(T),K=A.state.lights,Ee=A.state.shadowsArray,Te=K.state.version,Se=pe.getParameters(T,K.state,Ee,k,J,A.state.lightProbeGridArray),Le=pe.getProgramCacheKey(Se);let Fe=X.programs;X.environment=T.isMeshStandardMaterial||T.isMeshLambertMaterial||T.isMeshPhongMaterial?k.environment:null,X.fog=k.fog;const at=T.isMeshStandardMaterial||T.isMeshLambertMaterial&&!T.envMap||T.isMeshPhongMaterial&&!T.envMap;X.envMap=le.get(T.envMap||X.environment,at),X.envMapRotation=X.environment!==null&&T.envMap===null?k.environmentRotation:T.envMapRotation,Fe===void 0&&(T.addEventListener("dispose",ti),Fe=new Map,X.programs=Fe);let ot=Fe.get(Le);if(ot!==void 0){if(X.currentProgram===ot&&X.lightsStateVersion===Te)return cc(T,Se),ot}else Se.uniforms=pe.getUniforms(T),I!==null&&T.isNodeMaterial&&I.build(T,J,Se),T.onBeforeCompile(Se,L),ot=pe.acquireProgram(Se,Le),Fe.set(Le,ot),X.uniforms=Se.uniforms;const De=X.uniforms;return(!T.isShaderMaterial&&!T.isRawShaderMaterial||T.clipping===!0)&&(De.clippingPlanes=Be.uniform),cc(T,Se),X.needsLights=$h(T),X.lightsStateVersion=Te,X.needsLights&&(De.ambientLightColor.value=K.state.ambient,De.lightProbe.value=K.state.probe,De.sunLights.value=K.state.sun,De.sunLightShadows.value=K.state.sunShadow,De.directionalLights.value=K.state.directional,De.directionalLightShadows.value=K.state.directionalShadow,De.spotLights.value=K.state.spot,De.spotLightShadows.value=K.state.spotShadow,De.rectAreaLights.value=K.state.rectArea,De.ltc_1.value=K.state.rectAreaLTC1,De.ltc_2.value=K.state.rectAreaLTC2,De.pointLights.value=K.state.point,De.pointLightShadows.value=K.state.pointShadow,De.hemisphereLights.value=K.state.hemi,De.sunShadowMatrix.value=K.state.sunShadowMatrix,De.sunShadowCascade.value=K.state.sunShadowCascade,De.directionalShadowMatrix.value=K.state.directionalShadowMatrix,De.spotLightMatrix.value=K.state.spotLightMatrix,De.spotLightMap.value=K.state.spotLightMap,De.pointShadowMatrix.value=K.state.pointShadowMatrix),X.lightProbeGrid=A.state.lightProbeGridArray.length>0,X.currentProgram=ot,X.uniformsList=null,ot}function lc(T){if(T.uniformsList===null){const k=T.currentProgram.getUniforms();T.uniformsList=ys.seqWithValue(k.seq,T.uniforms)}return T.uniformsList}function cc(T,k){const J=V.get(T);J.outputColorSpace=k.outputColorSpace,J.batching=k.batching,J.batchingColor=k.batchingColor,J.instancing=k.instancing,J.instancingColor=k.instancingColor,J.instancingMorph=k.instancingMorph,J.skinning=k.skinning,J.morphTargets=k.morphTargets,J.morphNormals=k.morphNormals,J.morphColors=k.morphColors,J.morphTargetsCount=k.morphTargetsCount,J.numClippingPlanes=k.numClippingPlanes,J.numIntersection=k.numClipIntersection,J.vertexAlphas=k.vertexAlphas,J.vertexTangents=k.vertexTangents,J.toneMapping=k.toneMapping}function Kh(T,k){if(T.length===0)return null;if(T.length===1)return T[0].texture!==null?T[0]:null;S.setFromMatrixPosition(k.matrixWorld);for(let J=0,X=T.length;J<X;J++){const K=T[J];if(K.texture!==null&&K.boundingBox.containsPoint(S))return K}return null}function qh(T,k,J,X,K){k.isScene!==!0&&(k=an),Z.resetTextureUnits();const Ee=k.fog,Te=X.isMeshStandardMaterial||X.isMeshLambertMaterial||X.isMeshPhongMaterial?k.environment:null,Se=ae===null?L.outputColorSpace:ae.isXRRenderTarget===!0?ae.texture.colorSpace:lt.workingColorSpace,Le=X.isMeshStandardMaterial||X.isMeshLambertMaterial&&!X.envMap||X.isMeshPhongMaterial&&!X.envMap,Fe=le.get(X.envMap||Te,Le),at=X.vertexColors===!0&&!!J.attributes.color&&J.attributes.color.itemSize===4,ot=!!J.attributes.tangent&&(!!X.normalMap||X.anisotropy>0),De=!!J.morphAttributes.position,_t=!!J.morphAttributes.normal,Jt=!!J.morphAttributes.color;let It=gi;X.toneMapped&&(ae===null||ae.isXRRenderTarget===!0)&&(It=L.toneMapping);const Dt=J.morphAttributes.position||J.morphAttributes.normal||J.morphAttributes.color,fn=Dt!==void 0?Dt.length:0,we=V.get(X),bn=A.state.lights;if(ze===!0&&(Je===!0||T!==ee)){const Ot=T===ee&&X.id===q;Be.setState(X,T,Ot)}let dt=!1;X.version===we.__version?(we.needsLights&&we.lightsStateVersion!==bn.state.version||we.outputColorSpace!==Se||K.isBatchedMesh&&we.batching===!1||!K.isBatchedMesh&&we.batching===!0||K.isBatchedMesh&&we.batchingColor===!0&&K._colorsTexture===null||K.isBatchedMesh&&we.batchingColor===!1&&K._colorsTexture!==null||K.isInstancedMesh&&we.instancing===!1||!K.isInstancedMesh&&we.instancing===!0||K.isSkinnedMesh&&we.skinning===!1||!K.isSkinnedMesh&&we.skinning===!0||K.isInstancedMesh&&we.instancingColor===!0&&K.instanceColor===null||K.isInstancedMesh&&we.instancingColor===!1&&K.instanceColor!==null||K.isInstancedMesh&&we.instancingMorph===!0&&K.morphTexture===null||K.isInstancedMesh&&we.instancingMorph===!1&&K.morphTexture!==null||we.envMap!==Fe||X.fog===!0&&we.fog!==Ee||we.numClippingPlanes!==void 0&&(we.numClippingPlanes!==Be.numPlanes||we.numIntersection!==Be.numIntersection)||we.vertexAlphas!==at||we.vertexTangents!==ot||we.morphTargets!==De||we.morphNormals!==_t||we.morphColors!==Jt||we.toneMapping!==It||we.morphTargetsCount!==fn||!!we.lightProbeGrid!=A.state.lightProbeGridArray.length>0)&&(dt=!0):(dt=!0,we.__version=X.version);let Fn=we.currentProgram;dt===!0&&(Fn=Ua(X,k,K),I&&X.isNodeMaterial&&I.onUpdateProgram(X,Fn,we));let ni=!1,Vi=!1,yr=!1;const Tt=Fn.getUniforms(),Zt=we.uniforms;if(v.useProgram(Fn.program)&&(ni=!0,Vi=!0,yr=!0),X.id!==q&&(q=X.id,Vi=!0),we.needsLights){const Ot=Kh(A.state.lightProbeGridArray,K);we.lightProbeGrid!==Ot&&(we.lightProbeGrid=Ot,Vi=!0)}if(ni||ee!==T){v.buffers.depth.getReversed()&&T.reversedDepth!==!0&&(T._reversedDepth=!0,T.updateProjectionMatrix()),Tt.setValue(z,"projectionMatrix",T.projectionMatrix),Tt.setValue(z,"viewMatrix",T.matrixWorldInverse);const Xi=Tt.map.cameraPosition;Xi!==void 0&&Xi.setValue(z,Ct.setFromMatrixPosition(T.matrixWorld)),P.logarithmicDepthBuffer&&Tt.setValue(z,"logDepthBufFC",2/(Math.log(T.far+1)/Math.LN2)),(X.isMeshPhongMaterial||X.isMeshToonMaterial||X.isMeshLambertMaterial||X.isMeshBasicMaterial||X.isMeshStandardMaterial||X.isShaderMaterial)&&Tt.setValue(z,"isOrthographic",T.isOrthographicCamera===!0),ee!==T&&(ee=T,Vi=!0,yr=!0)}if(we.needsLights&&(bn.state.sunShadowMap.length>0&&Tt.setValue(z,"sunShadowMap",bn.state.sunShadowMap,Z),bn.state.directionalShadowMap.length>0&&Tt.setValue(z,"directionalShadowMap",bn.state.directionalShadowMap,Z),bn.state.spotShadowMap.length>0&&Tt.setValue(z,"spotShadowMap",bn.state.spotShadowMap,Z),bn.state.pointShadowMap.length>0&&Tt.setValue(z,"pointShadowMap",bn.state.pointShadowMap,Z)),K.isSkinnedMesh){Tt.setOptional(z,K,"bindMatrix"),Tt.setOptional(z,K,"bindMatrixInverse");const Ot=K.skeleton;Ot&&(Ot.boneTexture===null&&Ot.computeBoneTexture(),Tt.setValue(z,"boneTexture",Ot.boneTexture,Z))}K.isBatchedMesh&&(Tt.setOptional(z,K,"batchingTexture"),Tt.setValue(z,"batchingTexture",K._matricesTexture,Z),Tt.setOptional(z,K,"batchingIdTexture"),Tt.setValue(z,"batchingIdTexture",K._indirectTexture,Z),Tt.setOptional(z,K,"batchingColorTexture"),K._colorsTexture!==null&&Tt.setValue(z,"batchingColorTexture",K._colorsTexture,Z));const Yi=J.morphAttributes;if((Yi.position!==void 0||Yi.normal!==void 0||Yi.color!==void 0)&&H.update(K,J,Fn),(Vi||we.receiveShadow!==K.receiveShadow)&&(we.receiveShadow=K.receiveShadow,Tt.setValue(z,"receiveShadow",K.receiveShadow)),(X.isMeshStandardMaterial||X.isMeshLambertMaterial||X.isMeshPhongMaterial)&&X.envMap===null&&k.environment!==null&&(Zt.envMapIntensity.value=k.environmentIntensity),Zt.dfgLUT!==void 0&&(Zt.dfgLUT.value=Rx()),Vi){if(Tt.setValue(z,"toneMappingExposure",L.toneMappingExposure),we.needsLights&&Zh(Zt,yr),Ee&&X.fog===!0&&Ie.refreshFogUniforms(Zt,Ee),Ie.refreshMaterialUniforms(Zt,X,ie,j,A.state.transmissionRenderTarget[T.id]),we.needsLights&&we.lightProbeGrid){const Ot=we.lightProbeGrid;Zt.probesSH.value=Ot.texture,Zt.probesMin.value.copy(Ot.boundingBox.min),Zt.probesMax.value.copy(Ot.boundingBox.max),Zt.probesResolution.value.copy(Ot.resolution)}ys.upload(z,lc(we),Zt,Z)}if(X.isShaderMaterial&&X.uniformsNeedUpdate===!0&&(ys.upload(z,lc(we),Zt,Z),X.uniformsNeedUpdate=!1),X.isSpriteMaterial&&Tt.setValue(z,"center",K.center),Tt.setValue(z,"modelViewMatrix",K.modelViewMatrix),Tt.setValue(z,"normalMatrix",K.normalMatrix),Tt.setValue(z,"modelMatrix",K.matrixWorld),X.uniformsGroups!==void 0){const Ot=X.uniformsGroups;for(let Xi=0,wr=Ot.length;Xi<wr;Xi++){const hc=Ot[Xi];oe.update(hc,Fn),oe.bind(hc,Fn)}}return Fn}function Zh(T,k){T.ambientLightColor.needsUpdate=k,T.lightProbe.needsUpdate=k,T.sunLights.needsUpdate=k,T.sunLightShadows.needsUpdate=k,T.directionalLights.needsUpdate=k,T.directionalLightShadows.needsUpdate=k,T.pointLights.needsUpdate=k,T.pointLightShadows.needsUpdate=k,T.spotLights.needsUpdate=k,T.spotLightShadows.needsUpdate=k,T.rectAreaLights.needsUpdate=k,T.hemisphereLights.needsUpdate=k}function $h(T){return T.isMeshLambertMaterial||T.isMeshToonMaterial||T.isMeshPhongMaterial||T.isMeshStandardMaterial||T.isShadowMaterial||T.isShaderMaterial&&T.lights===!0}this.getActiveCubeFace=function(){return W},this.getActiveMipmapLevel=function(){return $},this.getRenderTarget=function(){return ae},this.setRenderTargetTextures=function(T,k,J){const X=V.get(T);X.__autoAllocateDepthBuffer=T.resolveDepthBuffer===!1,X.__autoAllocateDepthBuffer===!1&&(X.__useRenderToTexture=!1),V.get(T.texture).__webglTexture=k,V.get(T.depthTexture).__webglTexture=X.__autoAllocateDepthBuffer?void 0:J,X.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(T,k){const J=V.get(T);J.__webglFramebuffer=k,J.__useDefaultFramebuffer=k===void 0},this.setRenderTarget=function(T,k=0,J=0){ae=T,W=k,$=J;let X=null,K=!1,Ee=!1;if(T){const Se=V.get(T);if(Se.__useDefaultFramebuffer!==void 0){v.bindFramebuffer(z.FRAMEBUFFER,Se.__webglFramebuffer),F.copy(T.viewport),re.copy(T.scissor),ue=T.scissorTest,v.viewport(F),v.scissor(re),v.setScissorTest(ue),q=-1;return}else if(Se.__webglFramebuffer===void 0)Z.setupRenderTarget(T);else if(Se.__hasExternalTextures)Z.rebindTextures(T,V.get(T.texture).__webglTexture,V.get(T.depthTexture).__webglTexture);else if(T.depthBuffer){const at=T.depthTexture;if(Se.__boundDepthTexture!==at){if(at!==null&&V.has(at)&&(T.width!==at.image.width||T.height!==at.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");Z.setupDepthRenderbuffer(T)}}const Le=T.texture;(Le.isData3DTexture||Le.isDataArrayTexture||Le.isCompressedArrayTexture)&&(Ee=!0);const Fe=V.get(T).__webglFramebuffer;T.isWebGLCubeRenderTarget?(Array.isArray(Fe[k])?X=Fe[k][J]:X=Fe[k],K=!0):T.samples>0&&Z.useMultisampledRTT(T)===!1?X=V.get(T).__webglMultisampledFramebuffer:Array.isArray(Fe)?X=Fe[J]:X=Fe,F.copy(T.viewport),re.copy(T.scissor),ue=T.scissorTest}else F.copy(se).multiplyScalar(ie).floor(),re.copy(Ae).multiplyScalar(ie).floor(),ue=tt;if(J!==0&&(X=N),v.bindFramebuffer(z.FRAMEBUFFER,X)&&v.drawBuffers(T,X),v.viewport(F),v.scissor(re),v.setScissorTest(ue),K){const Se=V.get(T.texture);z.framebufferTexture2D(z.FRAMEBUFFER,z.COLOR_ATTACHMENT0,z.TEXTURE_CUBE_MAP_POSITIVE_X+k,Se.__webglTexture,J)}else if(Ee){const Se=k;for(let Le=0;Le<T.textures.length;Le++){const Fe=V.get(T.textures[Le]);z.framebufferTextureLayer(z.FRAMEBUFFER,z.COLOR_ATTACHMENT0+Le,Fe.__webglTexture,J,Se)}}else if(T!==null&&J!==0){const Se=V.get(T.texture);z.framebufferTexture2D(z.FRAMEBUFFER,z.COLOR_ATTACHMENT0,z.TEXTURE_2D,Se.__webglTexture,J)}q=-1};function uc(T){const k=V.get(T);return(k.__readFormat!==T.format||k.__readType!==T.type)&&(k.__readFormat=T.format,k.__readType=T.type,k.__formatReadable=P.textureFormatReadable(T.format),k.__typeReadable=P.textureTypeReadable(T.type)),k}this.readRenderTargetPixels=function(T,k,J,X,K,Ee,Te,Se=0){if(!(T&&T.isWebGLRenderTarget)){pt("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Le=V.get(T).__webglFramebuffer;if(T.isWebGLCubeRenderTarget&&Te!==void 0&&(Le=Le[Te]),Le){v.bindFramebuffer(z.FRAMEBUFFER,Le);try{const Fe=T.textures[Se],at=Fe.format,ot=Fe.type;T.textures.length>1&&z.readBuffer(z.COLOR_ATTACHMENT0+Se);const De=uc(Fe);if(De.__formatReadable===!1){pt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(De.__typeReadable===!1){pt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}k>=0&&k<=T.width-X&&J>=0&&J<=T.height-K&&z.readPixels(k,J,X,K,_e.convert(at),_e.convert(ot),Ee)}finally{const Fe=ae!==null?V.get(ae).__webglFramebuffer:null;v.bindFramebuffer(z.FRAMEBUFFER,Fe)}}},this.readRenderTargetPixelsAsync=async function(T,k,J,X,K,Ee,Te,Se=0){if(!(T&&T.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Le=V.get(T).__webglFramebuffer;if(T.isWebGLCubeRenderTarget&&Te!==void 0&&(Le=Le[Te]),Le)if(k>=0&&k<=T.width-X&&J>=0&&J<=T.height-K){v.bindFramebuffer(z.FRAMEBUFFER,Le);const Fe=T.textures[Se],at=Fe.format,ot=Fe.type;T.textures.length>1&&z.readBuffer(z.COLOR_ATTACHMENT0+Se);const De=uc(Fe);if(De.__formatReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(De.__typeReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const _t=z.createBuffer();z.bindBuffer(z.PIXEL_PACK_BUFFER,_t),z.bufferData(z.PIXEL_PACK_BUFFER,Ee.byteLength,z.STREAM_READ),z.readPixels(k,J,X,K,_e.convert(at),_e.convert(ot),0),z.bindBuffer(z.PIXEL_PACK_BUFFER,null);const Jt=ae!==null?V.get(ae).__webglFramebuffer:null;v.bindFramebuffer(z.FRAMEBUFFER,Jt);const It=z.fenceSync(z.SYNC_GPU_COMMANDS_COMPLETE,0);return z.flush(),await $p(z,It,4),z.bindBuffer(z.PIXEL_PACK_BUFFER,_t),z.getBufferSubData(z.PIXEL_PACK_BUFFER,0,Ee),z.bindBuffer(z.PIXEL_PACK_BUFFER,null),z.deleteBuffer(_t),z.deleteSync(It),Ee}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(T,k=null,J=0){const X=Math.pow(2,-J),K=Math.floor(T.image.width*X),Ee=Math.floor(T.image.height*X),Te=k!==null?k.x:0,Se=k!==null?k.y:0;Z.setTexture2D(T,0),z.copyTexSubImage2D(z.TEXTURE_2D,J,0,0,Te,Se,K,Ee),v.unbindTexture()},this.copyTextureToTexture=function(T,k,J=null,X=null,K=0,Ee=0){let Te,Se,Le,Fe,at,ot,De,_t,Jt;const It=T.isCompressedTexture?T.mipmaps[Ee]:T.image;if(J!==null)Te=J.max.x-J.min.x,Se=J.max.y-J.min.y,Le=J.isBox3?J.max.z-J.min.z:1,Fe=J.min.x,at=J.min.y,ot=J.isBox3?J.min.z:0;else{const Zt=Math.pow(2,-K);Te=Math.floor(It.width*Zt),Se=Math.floor(It.height*Zt),T.isDataArrayTexture?Le=It.depth:T.isData3DTexture?Le=Math.floor(It.depth*Zt):Le=1,Fe=0,at=0,ot=0}X!==null?(De=X.x,_t=X.y,Jt=X.z):(De=0,_t=0,Jt=0);const Dt=_e.convert(k.format),fn=_e.convert(k.type);let we;k.isData3DTexture?(Z.setTexture3D(k,0),we=z.TEXTURE_3D):k.isDataArrayTexture||k.isCompressedArrayTexture?(Z.setTexture2DArray(k,0),we=z.TEXTURE_2D_ARRAY):(Z.setTexture2D(k,0),we=z.TEXTURE_2D),v.activeTexture(z.TEXTURE0),v.pixelStorei(z.UNPACK_FLIP_Y_WEBGL,k.flipY),v.pixelStorei(z.UNPACK_PREMULTIPLY_ALPHA_WEBGL,k.premultiplyAlpha),v.pixelStorei(z.UNPACK_ALIGNMENT,k.unpackAlignment);const bn=v.getParameter(z.UNPACK_ROW_LENGTH),dt=v.getParameter(z.UNPACK_IMAGE_HEIGHT),Fn=v.getParameter(z.UNPACK_SKIP_PIXELS),ni=v.getParameter(z.UNPACK_SKIP_ROWS),Vi=v.getParameter(z.UNPACK_SKIP_IMAGES);v.pixelStorei(z.UNPACK_ROW_LENGTH,It.width),v.pixelStorei(z.UNPACK_IMAGE_HEIGHT,It.height),v.pixelStorei(z.UNPACK_SKIP_PIXELS,Fe),v.pixelStorei(z.UNPACK_SKIP_ROWS,at),v.pixelStorei(z.UNPACK_SKIP_IMAGES,ot);const yr=T.isDataArrayTexture||T.isData3DTexture,Tt=k.isDataArrayTexture||k.isData3DTexture;if(T.isDepthTexture){const Zt=V.get(T),Yi=V.get(k),Ot=V.get(Zt.__renderTarget),Xi=V.get(Yi.__renderTarget);v.bindFramebuffer(z.READ_FRAMEBUFFER,Ot.__webglFramebuffer),v.bindFramebuffer(z.DRAW_FRAMEBUFFER,Xi.__webglFramebuffer);for(let wr=0;wr<Le;wr++)yr&&(z.framebufferTextureLayer(z.READ_FRAMEBUFFER,z.COLOR_ATTACHMENT0,V.get(T).__webglTexture,K,ot+wr),z.framebufferTextureLayer(z.DRAW_FRAMEBUFFER,z.COLOR_ATTACHMENT0,V.get(k).__webglTexture,Ee,Jt+wr)),z.blitFramebuffer(Fe,at,Te,Se,De,_t,Te,Se,z.DEPTH_BUFFER_BIT,z.NEAREST);v.bindFramebuffer(z.READ_FRAMEBUFFER,null),v.bindFramebuffer(z.DRAW_FRAMEBUFFER,null)}else if(K!==0||T.isRenderTargetTexture||V.has(T)){const Zt=V.get(T),Yi=V.get(k);v.bindFramebuffer(z.READ_FRAMEBUFFER,O),v.bindFramebuffer(z.DRAW_FRAMEBUFFER,B);for(let Ot=0;Ot<Le;Ot++)yr?z.framebufferTextureLayer(z.READ_FRAMEBUFFER,z.COLOR_ATTACHMENT0,Zt.__webglTexture,K,ot+Ot):z.framebufferTexture2D(z.READ_FRAMEBUFFER,z.COLOR_ATTACHMENT0,z.TEXTURE_2D,Zt.__webglTexture,K),Tt?z.framebufferTextureLayer(z.DRAW_FRAMEBUFFER,z.COLOR_ATTACHMENT0,Yi.__webglTexture,Ee,Jt+Ot):z.framebufferTexture2D(z.DRAW_FRAMEBUFFER,z.COLOR_ATTACHMENT0,z.TEXTURE_2D,Yi.__webglTexture,Ee),K!==0?z.blitFramebuffer(Fe,at,Te,Se,De,_t,Te,Se,z.COLOR_BUFFER_BIT,z.NEAREST):Tt?z.copyTexSubImage3D(we,Ee,De,_t,Jt+Ot,Fe,at,Te,Se):z.copyTexSubImage2D(we,Ee,De,_t,Fe,at,Te,Se);v.bindFramebuffer(z.READ_FRAMEBUFFER,null),v.bindFramebuffer(z.DRAW_FRAMEBUFFER,null)}else Tt?T.isDataTexture||T.isData3DTexture?z.texSubImage3D(we,Ee,De,_t,Jt,Te,Se,Le,Dt,fn,It.data):k.isCompressedArrayTexture?z.compressedTexSubImage3D(we,Ee,De,_t,Jt,Te,Se,Le,Dt,It.data):z.texSubImage3D(we,Ee,De,_t,Jt,Te,Se,Le,Dt,fn,It):T.isDataTexture?z.texSubImage2D(z.TEXTURE_2D,Ee,De,_t,Te,Se,Dt,fn,It.data):T.isCompressedTexture?z.compressedTexSubImage2D(z.TEXTURE_2D,Ee,De,_t,It.width,It.height,Dt,It.data):z.texSubImage2D(z.TEXTURE_2D,Ee,De,_t,Te,Se,Dt,fn,It);v.pixelStorei(z.UNPACK_ROW_LENGTH,bn),v.pixelStorei(z.UNPACK_IMAGE_HEIGHT,dt),v.pixelStorei(z.UNPACK_SKIP_PIXELS,Fn),v.pixelStorei(z.UNPACK_SKIP_ROWS,ni),v.pixelStorei(z.UNPACK_SKIP_IMAGES,Vi),Ee===0&&k.generateMipmaps&&z.generateMipmap(we),v.unbindTexture()},this.initRenderTarget=function(T){V.get(T).__webglFramebuffer===void 0&&Z.setupRenderTarget(T)},this.initTexture=function(T){T.isCubeTexture?Z.setTextureCube(T,0):T.isData3DTexture?Z.setTexture3D(T,0):T.isDataArrayTexture||T.isCompressedArrayTexture?Z.setTexture2DArray(T,0):Z.setTexture2D(T,0),v.unbindTexture()},this.resetState=function(){W=0,$=0,ae=null,v.reset(),ye.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return pi}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=lt._getDrawingBufferColorSpace(e),t.unpackColorSpace=lt._getUnpackColorSpace()}}const Xt=(n,e=0)=>{const t=Math.sin(n*127.1+e*311.7)*43758.5453;return t-Math.floor(t)},wt=(n,e,t=0)=>Xt(Math.floor(n[0]*e)+Math.floor(n[2]*e)*57+t,Math.floor(n[1]*e)),Ut=(n=.2,e=.15)=>t=>{const i=wt(t,16,3);return wt(t,6,5)<e&&t[1]>.1?s.MOSS:i>1-n*.7?s.BODY2:void 0},Wt=(n,e,t,i,r,a=0,o=0)=>{for(let l=0;l<e;l++){const c=Xt(r,l)*6.283,u=t*Math.sqrt(Xt(l,r));n.ell([a+Math.cos(c)*u,.07,o+Math.sin(c)*u*.7],[.07,.1+Xt(l,4)*.08,.07],s.LEAF2,{group:i+l%3,paint:h=>h[1]>.13?s.LEAF:void 0})}},hs=(n,e,t,i=1)=>{for(let r=0;r<6;r++){const a=r/6*6.283+e[0],o=[Math.cos(a),0,Math.sin(a)];n.chain([[...e,.03*i],[...E.add(e,E.add(E.mul(o,.25*i),[0,.2*i,0])),.025*i],[...E.add(e,E.add(E.mul(o,.5*i),[0,.05*i,0])),.01*i]],r%2?s.LEAF:s.LEAF2,{group:t})}},Jn=(n,e,t,i,r)=>{const a=[];for(let o=0;o<=4;o++)a.push([...E.add(E.lerp(e,t,o/4),[(Xt(r,o)-.5)*.12,0,.02]),.03]);n.chain(a,s.LEAF,{group:i,paint:o=>wt(o,30)<.3?s.LEAF2:void 0})},Os=(n,e,t,i)=>n.ell(e,t,s.LEAF,{group:i,rough:.04,paint:r=>{const a=wt(r,10,2);return r[1]<e[1]-.15||a<.2?s.LEAF3:a>.8?s.LEAF2:void 0}}),et=(n,e,t,i,r=.025,a=s.FRAME)=>n.seg(e,t,r,r,a,{group:i,paint:Ut(.35,.05)}),jr=(n,e,t,i,r=s.MAGIC)=>n.ell(e,[t,t,t],r,{group:i,extra:!0});function hi(n,e,{yaw:t=0,pitch:i=0,roll:r=0,at:a=[0,0,0]}={}){const o=(f,d,p,g)=>{const x=Math.cos(d),M=Math.sin(d),m=[...f];return m[p]=f[p]*x-f[g]*M,m[g]=f[p]*M+f[g]*x,m},l=f=>o(o(o(f,r,1,2),i,0,1),-t,0,2),c=f=>o(o(o(f,t,0,2),-i,0,1),-r,1,2),u=f=>E.add(l(f),a),h=f=>c(E.sub(f,a));for(const f of n.parts.slice(e))if(f.type==="cone"?(f.a=u(f.a),f.b=u(f.b)):(f.c=u(f.c),f.axes=f.axes.map(l)),f.paint){const d=f.paint;f.paint=(p,g)=>d(h(p),g)}}function ws(n,e,{len:t=1.5,van:i=!1,glow:r=!1,flat:a=!1}={}){const o=i?.62:.3,l=i?.8:.5;n.box([0,l,0],[t,o,.66],s.BODY,{round:.14,group:e,paint:c=>{const u=Ut(.3,.12)(c);return u||(c[0]>t-.06&&Math.abs(c[1]-(l+o*.2))<.07&&Math.abs(Math.abs(c[2])-.45)<.1?r?s.MAGIC2:s.FRAME:i&&c[1]>l+.1&&Math.abs(c[2])>.6&&Math.abs(c[0]+.2)<.9&&(c[0]+3)*3%1>.15||c[1]<l-o+.1?s.SHADES:void 0)}}),i||n.box([-.2,l+o+.22,0],[t*.6,.24,.6],s.BODY,{round:.14,group:e,paint:c=>Math.abs(c[2])>.52||c[0]>t*.6-.25-.2?wt(c,9)<.25?s.STONED:s.SHADES:Ut(.3,.25)(c)});for(const c of[-t*.65,t*.65])for(const u of[-.66,.66])n.ell([c,.3,u],[.3,a?.22:.3,.1],s.BODY3,{group:e+1,paint:h=>Math.hypot(h[0]-c,h[1]-.3)<.12?s.FRAME:void 0});if(r)for(const c of[-.45,.45])jr(n,[t+.05,l+o*.2,c],.07,e+2,s.MAGIC2)}const Fh=(n,e,t)=>ws(n,e,t),Lx={"car-nose-down":{desc:"a hatchback nose-down in the earth, ferns round it",build(n){const e=n.parts.length;ws(n,1),hi(n,e,{pitch:-.5,at:[0,.2,0]}),n.ell([1.3,.1,0],[.9,.35,1],s.BARK2,{group:4,rough:.04,paint:t=>t[1]>.25?s.MOSS:void 0}),hs(n,[.9,.2,.8],5),hs(n,[-.9,.05,.9],6,.8),n.ell([-.6,1.25,0],[.5,.06,.4],s.MOSS,{group:7})}},"van-tree":{desc:"a camper van with a tree grown up through its roof, its headlights glowing with fairy light",glow:!0,build(n){ws(n,1,{van:!0,len:1.6,flat:!0,glow:!0}),n.chain([[.2,0,0,.22],[.2,1.5,0,.2],[.3,2.6,-.1,.14],[.35,3.3,-.1,.08]],s.TRUNK,{group:4,rough:.015}),Os(n,[.3,3.4,-.1],[1.1,.7,.9],5),Jn(n,[-1.6,.1,.66],[-1,1.3,.7],6,1),Wt(n,14,2.2,7,2)}},"car-on-side":{desc:"a car on its side among ferns",build(n){const e=n.parts.length;ws(n,1),hi(n,e,{roll:Math.PI/2,at:[0,.2,.1]});for(const[t,i]of[[-1.2,.9],[.3,1.1],[1.4,.6],[-.4,-1]])hs(n,[t,.05,i],5+(t>0?1:0),1.1)}},"trolley-tipped":{desc:"a shopping trolley tipped over, a plant growing in its basket",build(n){const e=n.parts.length;gu(n,1),Os(n,[.05,.65,0],[.32,.28,.26],3),hi(n,e,{roll:1.35,at:[0,.32,0]}),Wt(n,8,.9,6,3)}},"trolley-nest":{desc:"a shopping trolley standing upright, a bird's nest in its basket",build(n){gu(n,1),n.ell([0,.78,0],[.2,.08,.17],s.STRAW,{group:3,paint:e=>Math.abs(Math.sin(e[0]*40+e[2]*30))<.3?s.BARK2:void 0});for(const e of[-.05,.05])n.ell([e,.84,.02],[.04,.03,.035],s.BELLY,{group:4});Wt(n,8,.9,6,4)}},cone:{desc:"a single traffic cone, faded",build(n){ga(n,[0,0,0],1)}},cones:{desc:"a little cluster of traffic cones, one fallen",build(n){ga(n,[0,0,0],1),ga(n,[.5,0,.2],4);const e=n.parts.length;ga(n,[0,0,0],7),hi(n,e,{roll:1.5,yaw:.6,at:[-.4,.2,.4]}),Wt(n,6,.8,10,5)}},"cone-lantern":{desc:"a traffic cone lit from within like a lantern, a ring of mushrooms round it",glow:!0,build(n){ga(n,[0,0,0],1,!0);for(let e=0;e<9;e++){const t=e/9*6.283,i=[Math.cos(t)*.55,0,Math.sin(t)*.45];n.seg(i,E.add(i,[0,.08,0]),.02,.02,s.CLOTH,{group:5}),n.ell(E.add(i,[0,.1,0]),[.06,.035,.06],s.BODY2,{group:6})}}},"highway-slab":{desc:"a slab of tarmac tilted up out of the ground, faded lane markings, a crash-barrier stub",build(n){const e=n.parts.length;n.box([0,0,0],[2.2,.14,1.3],s.STONE,{round:.03,group:1,rough:.01,paint:t=>wt(t,5,1)<.06||Math.abs(Math.sin(t[0]*3+t[2]*5)*.3+t[2]*.6-.2)<.02?s.STONED:t[1]>.1&&Math.abs(t[2])<.05&&(t[0]+9)*.8%1<.55?wt(t,12)<.3?s.STONE:s.CLOTH:t[1]>.1&&Math.abs(t[2]-1.1)<.04?s.BELLY:t[1]>.1&&wt(t,6,4)<.12?s.MOSS:void 0});for(const t of[-1.6,-.4])et(n,[t,.1,1.25],[t,.75,1.25],2,.04);n.box([-1,.62,1.3],[.9,.1,.03],s.FRAME,{group:3,paint:t=>Math.abs(t[1]-.62)<.02?s.STONED:Ut(.5,.1)(t)}),hi(n,e,{pitch:.38,roll:.08,at:[0,.7,0]}),n.ell([-1.8,.1,0],[.6,.2,1.3],s.BARK2,{group:5,rough:.04,paint:t=>t[1]>.2?s.MOSS:void 0}),Wt(n,16,2.4,6,6)}},"highway-line":{desc:"a section of cracked road, its white line broken, grass in the cracks",build(n){n.box([0,.02,0],[2,.03,1],s.STONE,{round:.02,group:1,paint:e=>wt(e,4,9)<.08||Math.abs(Math.sin(e[0]*2.3)*.4-e[2])<.025?wt(e,20)<.4?s.LEAF2:s.STONED:Math.abs(e[2]+.05)<.05&&(e[0]+9)*.7%1<.6?s.CLOTH:wt(e,6)<.08?s.MOSS:void 0});for(const[e,t]of[[-1.2,.3],[.4,-.2],[1.3,.5]])Wt(n,4,.2,3,e*10+7,e,t)}},"road-sign":{desc:"a fallen road sign, blank but for an abstract arrow",build(n){et(n,[-.9,.05,.2],[.6,.1,-.1],1,.03),n.box([.9,.12,-.15],[.62,.05,.46],s.HAT1,{group:2,dir:[1,.25,-.2],round:.02,paint:e=>{const t=e[0]-.9,i=e[2]+.15;return Math.abs(i)<.08&&t>-.36&&t<.2||t>.08&&Math.abs(i)<.28-(t-.08)*.9&&t<.38?s.BELLY:Math.hypot(Math.abs(t)-.56,Math.abs(i)-.4)<.04?s.FRAME:Ut(.2,.1)(e)}}),Wt(n,8,1.2,4,7)}},"phone-box":{desc:"an overgrown phone box, its panes long gone",build(n){n.box([0,1,0],[.42,1,.42],s.ACCENT,{round:.04,group:1,paint:e=>Math.max(Math.abs(e[0]),Math.abs(e[2]))>.38&&e[1]>.5&&e[1]<1.75&&e[1]*5%1>.12&&(Math.abs(e[0])+Math.abs(e[2]))*5%1>.12?s.SHADES:Ut(.3,.15)(e)}),n.box([0,2.08,0],[.46,.09,.46],s.ACCENT,{round:.06,group:2,paint:Ut(.3,.3)}),Jn(n,[.43,0,.3],[.4,1.9,.43],3,8),Jn(n,[-.3,0,.43],[-.1,1.4,.43],4,9),Wt(n,10,.9,5,8)}},lamppost:{desc:"a lamppost bent over, its lamp hanging near the ground",build(n){n.chain([[0,0,0,.06],[0,1.4,0,.05],[.2,2.1,0,.045],[.8,2.2,0,.04],[1.2,1.7,0,.035]],s.FRAME,{group:1,paint:Ut(.4,.05)}),n.box([1.25,1.55,0],[.16,.1,.12],s.FRAME,{round:.04,group:2}),n.ell([1.25,1.45,0],[.12,.06,.1],s.SHADES,{group:2}),Jn(n,[0,0,.06],[.05,1.5,.06],3,10),Wt(n,6,.7,4,9)}},sofa:{desc:"a sofa left in a clearing, moss on its cushions",build(n){const e=t=>wt(t,6,5)<.25&&t[1]>.4?s.MOSS:wt(t,14)>.9?s.STONED:void 0;n.box([0,.3,0],[.9,.2,.4],s.CLOTH,{round:.1,group:1,paint:e}),n.box([-.02,.7,-.32],[.9,.3,.12],s.CLOTH,{round:.1,group:2,paint:e});for(const t of[-.85,.85])n.box([t,.55,0],[.12,.22,.42],s.CLOTH,{round:.1,group:3,paint:e});for(const t of[-.4,.4])n.box([t,.53,.05],[.42,.08,.34],s.CLOTH,{round:.08,group:4,paint:e});Wt(n,14,1.6,5,10)}},"washing-machine":{desc:"a washing machine in the undergrowth, a fern in its drum",build(n){n.box([0,.42,0],[.32,.42,.32],s.BELLY,{round:.05,group:1,paint:e=>e[2]>.28&&Math.hypot(e[0],e[1]-.4)<.2?Math.hypot(e[0],e[1]-.4)<.15?s.SHADES:s.FRAME:Ut(.25,.15)(e)}),hs(n,[0,.4,.4],2,.55),Wt(n,8,.8,3,11)}},"bike-roots":{desc:"a bicycle tangled in tree roots",build(n){for(const e of[-.45,.45])for(let t=0;t<12;t++){const i=t/12*6.283,r=(t+1)/12*6.283;et(n,[e+Math.cos(i)*.3,.32+Math.sin(i)*.3,0],[e+Math.cos(r)*.3,.32+Math.sin(r)*.3,0],1+(e>0?1:0),.018)}for(const[e,t]of[[[-.45,.32,0],[0,.35,0]],[[0,.35,0],[.3,.7,0]],[[-.45,.32,0],[-.15,.72,0]],[[-.15,.72,0],[.3,.7,0]],[[.3,.7,0],[.45,.32,0]],[[0,.35,0],[-.15,.72,0]],[[.3,.7,0],[.35,.85,0]]])et(n,e,t,3,.022);n.box([-.17,.76,0],[.1,.03,.04],s.SHADES,{group:4}),et(n,[.25,.85,-.15],[.42,.87,.15],4,.018);for(let e=0;e<4;e++)n.chain([[-1+e*.2,0,-.4,.09],[-.3+e*.3,.35+e%2*.2,-.05+e*.05,.07],[.4+e*.2,.1,.3,.05]],s.TRUNK,{group:5+e%2,rough:.01})}},"dish-birdbath":{desc:"a satellite dish fallen face-up, full of rainwater, a bird drinking",build(n){n.ell([0,.2,0],[.6,.22,.6],s.BELLY,{group:1,paint:Ut(.25,.2)}),n.ell([0,.34,0],[.52,.12,.52],s.BELLY,{group:1,cut:!0}),n.ell([0,.28,0],[.48,.02,.48],s.WATER,{group:2}),et(n,[0,.25,-.5],[.1,.8,-.6],3,.03);const e=[.5,.45,.3];n.ell(e,[.12,.07,.06],s.BODY3,{group:4,dir:[1,.3,0]}),n.ell(E.add(e,[.1,.07,0]),[.05,.05,.045],s.BODY3,{group:4}),n.seg(E.add(e,[.14,.07,0]),E.add(e,[.2,.04,0]),.012,.004,s.ACCENT,{group:4}),Wt(n,8,1,5,12)}},"fridge-fireflies":{desc:"a fridge standing in the woods, its door ajar, fireflies inside",glow:!0,build(n){n.box([0,.85,0],[.36,.85,.32],s.BELLY,{round:.05,group:1,paint:e=>e[2]>.28&&Math.abs(e[0])<.3&&e[1]<1.55&&e[1]>.1?s.SHADES:Ut(.25,.2)(e)}),n.box([.5,.85,.4],[.03,.78,.3],s.BELLY,{dir:[.5,0,1],round:.03,group:2,paint:Ut(.25,.15)});for(let e=0;e<7;e++)jr(n,[(Xt(e)-.5)*.4,.4+Xt(e,2)*1,.2+Xt(e,3)*.3],.03,10+e,e%2?s.MAGIC:s.MAGIC2);Jn(n,[-.36,0,.3],[-.3,1.6,.33],3,13)}}};function gu(n,e){const t=[[-.35,.45,-.25],[.35,.45,-.25],[.35,.45,.25],[-.35,.45,.25],[-.3,.9,-.28],[.4,.9,-.28],[.4,.9,.28],[-.3,.9,.28]];for(const[i,r]of[[0,1],[1,2],[2,3],[3,0],[4,5],[5,6],[6,7],[7,4],[0,4],[1,5],[2,6],[3,7]])et(n,t[i],t[r],e,.015);for(let i=1;i<6;i++){const r=i/6;et(n,E.lerp(t[0],t[1],r),E.lerp(t[4],t[5],r),e,.008),et(n,E.lerp(t[3],t[2],r),E.lerp(t[7],t[6],r),e,.008)}et(n,t[4],[-.45,.95,-.28],e,.015),et(n,t[7],[-.45,.95,.28],e,.015),et(n,[-.45,.95,-.28],[-.45,.95,.28],e,.025,s.ACCENT);for(const[i,r]of[[-.3,-.22],[.3,-.22],[-.3,.22],[.3,.22]])et(n,[i,.45,r],[i,.08,r],e,.012),n.ell([i,.06,r],[.05,.05,.02],s.BODY3,{group:e+1})}function ga(n,e,t,i=!1){n.box(E.add(e,[0,.03,0]),[.24,.03,.24],s.ACCENT,{round:.02,group:t,paint:Ut(.15,.2)}),n.seg(E.add(e,[0,.05,0]),E.add(e,[0,.72,0]),.2,.03,s.ACCENT,{group:t+1,paint:r=>Math.abs(r[1]-e[1]-.42)<.07?i?s.MAGIC2:s.CLOTH:i&&wt(r,18)<.2?s.GLOW:Ut(.15,.1)(r)}),i&&jr(n,E.add(e,[0,.78,0]),.05,t+2,s.MAGIC2)}const Dx={swings:{desc:"a rusty swing set, one swing hanging, one chain broken; the hanging one sways on its own with a faint sparkle",glow:!0,split:1.6,build(n){for(const e of[-1.1,1.1])for(const t of[-.5,.5])et(n,[e,0,t],[e*.95,2.1,0],1,.045);et(n,[-1.1,2.1,0],[1.1,2.1,0],2,.05);for(const e of[-.12,.12])et(n,[-.5,2.08,e],[-.42,.55,e*1.2],3,.012);n.box([-.42,.52,0],[.2,.025,.14],s.BODY3,{round:.02,group:3,dir:[1,-.15,0]});for(let e=0;e<5;e++)jr(n,[-.42+(Xt(e)-.5)*.5,.6+Xt(e,2)*.7,(Xt(e,3)-.5)*.3],.025,10+e);et(n,[.5,2.08,-.12],[.5,1.3,-.12],4,.012),et(n,[.5,2.08,.12],[.58,.9,.2],4,.012),n.box([.7,.04,.3],[.2,.025,.14],s.BODY3,{round:.02,group:5,dir:[1,0,.5]}),Jn(n,[1.1,0,.5],[1.05,1.6,.25],6,14),Wt(n,14,1.8,7,15)}},slide:{desc:"a slide half-swallowed by brambles, a sapling at its foot",split:1.6,build(n){for(const e of[-.95,-.55])for(const t of[-.3,.3])et(n,[e,0,t],[e,1.5,t],1,.035);for(let e=1;e<6;e++)et(n,[-.95,e*.27,-.3],[-.95,e*.27,.3],1,.02);n.box([-.75,1.5,0],[.25,.04,.32],s.FRAME,{group:2,paint:Ut(.4,.1)}),n.box([.35,.78,0],[.95,.03,.26],s.HAT1,{dir:[1,-.75,0],round:.02,group:3,paint:e=>Math.abs(e[2])>.22?s.FRAME:Ut(.35,.15)(e)});for(let e=0;e<10;e++){const t=Xt(e,3)*6.283;n.chain([[.4+Math.cos(t)*.9,0,Math.sin(t)*.6,.03],[.3+Math.cos(t)*.4,.5+Xt(e)*.5,Math.sin(t)*.3,.025],[.1+Xt(e,4)*.6,.7+Xt(e,5)*.4,(Xt(e,6)-.5)*.4,.015]],s.BARKD,{group:5+e%2}),e%3===0&&n.ell([.3+Xt(e,7)*.6,.5+Xt(e,8)*.4,(Xt(e,9)-.5)*.5],[.2,.14,.16],s.LEAF,{group:7,rough:.03,paint:i=>wt(i,30)<.1?s.ACCENT:void 0})}n.seg([1.45,0,.2],[1.45,1.2,.2],.03,.02,s.TRUNK,{group:8}),Os(n,[1.45,1.3,.2],[.25,.2,.22],9)}},roundabout:{desc:"a roundabout tilted in the moss",build(n){const e=n.parts.length;n.ell([0,.2,0],[.9,.05,.9],s.HAT2,{group:1,paint:t=>Math.abs(Math.sin(Math.atan2(t[2],t[0])*3))<.08?s.FRAME:Ut(.35,.2)(t)});for(let t=0;t<3;t++){const i=t/3*6.283;et(n,[Math.cos(i)*.7,.25,Math.sin(i)*.7],[Math.cos(i)*.7,.6,Math.sin(i)*.7],2,.025),et(n,[Math.cos(i)*.7,.6,Math.sin(i)*.7],[Math.cos(i)*.1,.6,Math.sin(i)*.1],2,.02)}hi(n,e,{pitch:.18,roll:.1,at:[0,.05,0]}),n.ell([0,.05,0],[1.1,.08,1],s.MOSS,{group:4}),Wt(n,10,1.3,5,16)}},seesaw:{desc:"a seesaw stuck at an angle",build(n){n.box([0,.2,0],[.08,.2,.14],s.FRAME,{round:.02,group:1,paint:Ut(.4,.1)});const e=n.parts.length;n.box([0,0,0],[1.3,.035,.12],s.WOOD,{round:.02,group:2,paint:t=>wt(t,8)<.2?s.MOSS:void 0});for(const t of[-1.05,1.05])et(n,[t,.03,-.12],[t,.03,.12],3,.02);hi(n,e,{pitch:.32,at:[0,.42,0]}),Wt(n,10,1.4,5,17)}},"climbing-frame":{desc:"a climbing frame, a dome of bars wound with ivy",split:1.4,build(n){const t=(i,r)=>{const a=i/8*6.283,o=r/4*Math.PI/2;return[Math.cos(a)*Math.cos(o)*1,Math.sin(o)*1*1.5,Math.sin(a)*Math.cos(o)*1]};for(let i=0;i<8;i++)for(let r=0;r<4;r++)et(n,t(i,r),t(i,r+1),1,.025),et(n,t(i,r),t(i+1,r),1,.025);for(let i=0;i<3;i++)Jn(n,t(i*3,0),t(i*3+1,3),3+i,18+i);Wt(n,12,1.4,6,18)}},"spring-rider":{desc:"a spring rider animal, its paint faded (a generic animal, no characters)",build(n){for(let e=0;e<6;e++)n.seg([Math.cos(e*2)*.06,e*.07,Math.sin(e*2)*.06],[Math.cos(e*2+2)*.06,(e+1)*.07,Math.sin(e*2+2)*.06],.022,.022,s.FRAME,{group:1});n.ell([0,.55,0],[.35,.16,.14],s.BODY,{group:2,paint:Ut(.4,.2)}),n.ell([.32,.72,0],[.12,.11,.1],s.BODY,{group:2,paint:Ut(.4,.2)});for(const e of[-.05,.05])n.ell([.28,.85,e],[.03,.06,.02],s.BODY,{group:3});n.ell([.43,.74,.06],[.015,.015,.015],s.SHADES,{group:3}),et(n,[.25,.68,-.12],[.25,.68,.12],4,.015),n.box([0,.02,0],[.25,.02,.25],s.STONE,{group:5}),Wt(n,8,.8,6,19)}}};function Px(n,e,t,i,r,a=1){n.box([0,.015,0],[e,.015,t],i,{round:.01,group:a,paint:o=>wt(o,3,4)<.05||Math.abs(Math.sin(o[0]*1.3+1)*.5+Math.sin(o[0]*4.1)*.08-o[2]*.3)<.012?wt(o,18)<.5?s.LEAF2:s.STONED:r(o[0],o[2])?wt(o,10,2)<.25?i:s.CLOTH:wt(o,5,7)<.07?s.MOSS:void 0})}const qn=(n,e,t=.045)=>Math.abs(n-e)<t,Ox={"tennis-court":{desc:"a cracked tennis court, faded lines, grass through the cracks",decal:!0,build(n){Px(n,4.4+.5,2+.5,s.HAT2,(i,r)=>Math.abs(i)<=4.4+.05&&Math.abs(r)<=2+.05&&(qn(Math.abs(i),4.4)||qn(Math.abs(r),2)||qn(Math.abs(r),2*.75)||Math.abs(i)<4.4*.54&&(qn(r,0)||qn(Math.abs(i),4.4*.54))))}},"tennis-net":{desc:"a sagging tennis net between its posts",build(n){for(const e of[-2.2,2.2])et(n,[0,0,e],[0,.55,e],1,.035);n.box([0,.38,0],[.01,.17,2.15],s.CLOTH,{group:2,paint:e=>e[1]>.5?s.CLOTH:e[1]*25%1<.25||(e[2]+5)*25%1<.25?s.SHADES:void 0}),n.box([0,.25,0],[.012,.15,1],s.SHADES,{group:2,cut:!0})}},"umpire-chair":{desc:"a tennis umpire's chair leaning over",split:1.4,build(n){const e=n.parts.length;for(const t of[-.25,.25])for(const i of[-.2,.2])et(n,[t*1.4,0,i*1.4],[t,1.5,i],1,.03);for(let t=1;t<5;t++)et(n,[-.3,t*.3,-.22],[-.3,t*.3,.22],1,.02);n.box([0,1.55,0],[.28,.04,.25],s.WOOD,{group:2}),n.box([-.26,1.8,0],[.03,.25,.25],s.WOOD,{group:2}),hi(n,e,{roll:.25,pitch:-.1}),Wt(n,8,1,4,20)}},"court-fence":{desc:"a chain-link fence section, ivy through it, a gap torn in it",build(n){for(const e of[-1.5,0,1.5])et(n,[e,0,0],[e,1.7,0],1,.03);et(n,[-1.5,1.7,0],[1.5,1.7,0],1,.025),n.box([0,.85,0],[1.5,.85,.008],s.FRAME,{group:2,paint:e=>(e[0]+e[1]+9)*9%1<.2||(e[0]-e[1]+9)*9%1<.2?wt(e,5)<.15?s.BODY2:s.FRAME:s.SHADES}),n.ell([.7,.5,0],[.4,.5,.05],s.SHADES,{group:2,cut:!0,rough:.08});for(let e=0;e<3;e++)Jn(n,[-1.3+e*.6,0,.03],[-1.1+e*.5,1.5,.03],3+e,21+e)}},"tennis-balls":{desc:"a few old tennis balls glowing faintly in the grass",glow:!0,build(n){for(let e=0;e<4;e++)jr(n,[(Xt(e)-.5)*1.2,.06,(Xt(e,2)-.5)*.8],.06,1+e,e%2?s.MAGIC:s.MAGIC2);n.ell([0,.004,0],[.8,.004,.5],s.LEAF3,{group:9}),Wt(n,8,.8,5,22)}},"baseball-diamond":{desc:"a baseball diamond: the worn dirt infield, grown-over bases, a pitcher's mound",decal:!0,build(n){n.box([0,.015,0],[2.2*1.6,.015,2.2*1.2],s.LEAF2,{group:1,round:.01,paint:t=>{const i=Math.abs(t[0])/2.2+Math.abs(t[2])/1.6500000000000001;return i<1.08&&i>.78?wt(t,8)<.2?s.LEAF2:s.BARK2:i<=.78?wt(t,6)<.15?s.MOSS:void 0:wt(t,6,3)<.3?s.LEAF:void 0}});for(const[t,i]of[[2.2,0],[0,2.2*.75],[-2.2,0],[0,-2.2*.75]])n.box([t*.93,.04,i*.93],[.12,.02,.1],s.BELLY,{group:2,round:.02,paint:r=>wt(r,20)<.3?s.LEAF2:void 0});n.ell([0,.02,0],[.35,.08,.28],s.BARK2,{group:3})}},backstop:{desc:"a baseball backstop fence, a dugout bench beside it",build(n){for(let e=0;e<=4;e++){const t=-.8+e*.4;et(n,[-Math.cos(t)*.8,0,Math.sin(t)*1.4],[-Math.cos(t)*.8,1.8,Math.sin(t)*1.4],1,.03)}for(let e=0;e<4;e++){const t=-.8+e*.4,i=t+.4,r=[-Math.cos(t)*.8,.9,Math.sin(t)*1.4],a=[-Math.cos(i)*.8,.9,Math.sin(i)*1.4],o=E.lerp(r,a,.5);n.box(o,[Math.hypot(a[0]-r[0],a[2]-r[2])/2,.9,.008],s.FRAME,{dir:E.sub(a,r),group:2,paint:l=>(l[1]+l[0]*2+9)*9%1<.2?wt(l,5)<.2?s.BODY2:s.FRAME:s.SHADES})}n.box([-.6,.3,2],[.15,.04,.7],s.WOOD,{group:3});for(const e of[1.4,2.6])n.box([-.6,.14,e],[.12,.14,.04],s.WOOD,{group:3});Jn(n,[-.75,0,-.5],[-.7,1.6,-.4],4,25)}},scoreboard:{desc:"a scoreboard frame, panels missing (no text)",split:1.8,build(n){for(const e of[-1,1])et(n,[e,0,0],[e,2.6,0],1,.05);for(let e=0;e<3;e++)for(let t=0;t<5;t++)Xt(e,t)>.3&&n.box([-.8+t*.4,1.6+e*.32,0],[.18,.14,.03],s.HAT1,{group:2+e,round:.01,paint:Ut(.3,.1)});n.box([0,2.62,0],[1.1,.05,.06],s.FRAME,{group:5}),Jn(n,[-1,0,.06],[-.95,2.3,.06],6,26)}},"football-pitch":{desc:"a football pitch: faded lines, a centre circle, mown stripes long grown out",decal:!0,build(n){n.box([0,.015,0],[5.2+.5,.015,3.3+.5],s.LEAF2,{group:1,round:.01,paint:i=>{const r=i[0],a=i[2];return Math.abs(r)<=5.2+.05&&Math.abs(a)<=3.3+.05&&(qn(Math.abs(r),5.2,.06)||qn(Math.abs(a),3.3,.06)||qn(r,0,.06)||qn(Math.hypot(r,a*1),1,.06)||Math.abs(r)>5.2-1&&Math.abs(a)<1.6&&(qn(Math.abs(r),5.2-1,.06)||qn(Math.abs(a),1.6,.06)))?wt(i,8,2)<.3?s.LEAF2:s.CLOTH:Math.floor((r+20)*.8)%2?wt(i,6)<.25?s.LEAF2:s.LEAF:wt(i,5,9)<.1?s.LEAF3:void 0}})}},goal:{desc:"a football goal, its net torn, a sapling grown through it",split:1.1,build(n){mu(n,1),n.seg([.3,0,.2],[.3,1.5,.2],.035,.025,s.TRUNK,{group:5}),Os(n,[.3,1.6,.2],[.35,.25,.3],6),Wt(n,8,1.2,7,27)}},"goal-tipped":{desc:"a football goal tipped on its back",build(n){const e=n.parts.length;mu(n,1),hi(n,e,{pitch:-Math.PI/2+.12,at:[-.5,.06,0]}),Wt(n,8,1.2,7,28)}},"corner-flag":{desc:"a corner flag, its flag a faded rag",build(n){et(n,[0,0,0],[0,.9,0],1,.015),n.box([.12,.8,0],[.12,.08,.006],s.ACCENT,{group:2,dir:[1,-.3,.1],paint:Ut(.2,0)}),Wt(n,5,.4,3,29)}},floodlight:{desc:"a floodlight pylon, one lamp still flickering with fairy light",glow:!0,split:2.4,build(n){for(const[t,i]of[[-.25,-.25],[.25,-.25],[.25,.25],[-.25,.25]])et(n,[t*1.6,0,i*1.6],[t*.5,4,i*.5],1,.035);for(let t=1;t<8;t++){const i=t*4/8,r=1.6-1.1*i/4;et(n,[-.25*r,i,-.25*r],[.25*r,i+4/8,.25*r],2,.015),et(n,[.25*r,i,-.25*r],[-.25*r,i+4/8,.25*r],2,.015)}for(let t=0;t<2;t++)for(let i=0;i<3;i++)n.box([-.3+i*.3,4+.2+t*.25,.1],[.12,.1,.06],s.FRAME,{group:3,round:.02,paint:r=>r[2]>.14?t===1&&i===1?s.MAGIC2:s.SHADES:Ut(.4,.1)(r)});jr(n,[0,4+.45,.22],.06,4,s.MAGIC2),Jn(n,[-.4,0,.4],[-.2,2.4,.2],5,30)}},"basketball-hoop":{desc:"a basketball hoop on a leaning post, its net gone",split:1.8,build(n){const e=n.parts.length;et(n,[0,0,0],[0,2.4,0],1,.05),n.box([.15,2.5,0],[.03,.3,.45],s.BELLY,{group:2,paint:t=>Math.abs(t[1]-2.4)<.1&&Math.abs(t[2])<.14&&Math.abs(Math.abs(t[2])-.12)<.02?s.ACCENT:Ut(.25,.1)(t)});for(let t=0;t<8;t++){const i=t/8*6.283,r=(t+1)/8*6.283;et(n,[.36+Math.cos(i)*.17,2.32,Math.sin(i)*.17],[.36+Math.cos(r)*.17,2.32,Math.sin(r)*.17],3,.012,s.ACCENT)}hi(n,e,{pitch:-.2}),Wt(n,8,1,5,31)}}};function mu(n,e){for(const t of[-1.4,1.4])et(n,[0,0,t],[0,1,t],e,.035,s.BELLY);et(n,[0,1,-1.4],[0,1,1.4],e,.035,s.BELLY);for(const t of[-1.4,1.4])et(n,[0,1,t],[-.6,0,t],e+1,.02,s.BELLY);n.box([-.3,.5,0],[.012,.55,1.38],s.CLOTH,{dir:[.6,1,0],group:e+2,paint:t=>t[1]*12%1<.3||(t[2]+5)*12%1<.3?s.CLOTH:s.SHADES}),n.ell([-.3,.4,.5],[.2,.3,.4],s.CLOTH,{group:e+2,cut:!0})}const Ix=[...Object.entries(Lx).map(([n,e])=>({id:n,family:"modern",size:1,split:null,...e})),...Object.entries(Dx).map(([n,e])=>({id:n,family:"playground",size:1.1,split:null,...e})),...Object.entries(Ox).map(([n,e])=>({id:n,family:"sports",size:1.1,split:null,...e}))];Object.fromEntries(Ix.map(n=>[n.id,n]));const Gt=(n,e=0)=>{const t=Math.sin(n*127.1+e*311.7)*43758.5453;return t-Math.floor(t)},jn=(n,e,t=0)=>Gt(Math.floor(n[0]*e)+Math.floor(n[2]*e)*57+t,Math.floor(n[1]*e)),Al=n=>{const e=jn(n,12);return e<.14?s.BARKD:e>.88?s.BARKL:void 0},Nx=n=>e=>{const t=jn(e,10,3);return e[1]<n[1]-.2||t<.2?s.LEAF3:t>.8?s.LEAF2:void 0},mn=(n,e=0)=>t=>{const i=jn(t,9,7);return t[1]>.05&&i<(n?.34:.12)&&jn(t,3,1)<(n?.75:.45)?s.MOSS:e&&(t[1]*e%1<.1||((t[0]+t[2])*e*.7+Math.floor(t[1]*e)*.5)%1<.07)||i>.93?s.STONED:void 0},gt=(n,e,t,i,r,a={})=>n.box(e,t,s.STONE,{round:.03,rough:.012,group:i,paint:mn(r,a.courses??5),...a}),Tn=(n,e,t,i,r)=>{const a=[];for(let o=0;o<=4;o++){const l=o/4;a.push([...E.add(E.lerp(e,t,l),[(Gt(r,o)-.5)*.15,0,.02]),.03])}n.chain(a,s.LEAF,{group:i,rough:.02,paint:o=>jn(o,30)<.3?s.LEAF2:void 0})},Ci=(n,e,t,i,r)=>{for(let a=0;a<e;a++){const o=Gt(r,a)*6.283,l=t*Math.sqrt(Gt(a,r)),c=Math.cos(o)*l,u=Math.sin(o)*l*.7;n.ell([c,.08,u],[.07,.1+Gt(a,4)*.08,.07],s.LEAF2,{group:i+a%3,paint:h=>h[1]>.14?s.LEAF:void 0})}},oi=(n,e,t,i)=>n.ell(e,t,s.LEAF,{group:i,rough:.04,paint:Nx(e)}),Pn=(n,e,t)=>n.chain(e,s.TRUNK,{group:t,rough:.012,paint:Al}),Rn=(n,e,t,i,r={})=>n.ell(e,t,s.STONE,{group:i,rough:.03,dir:r.dir,paint:a=>a[1]>e[1]+t[1]*(r.moss??.62)&&jn(a,5,i)<.7?s.MOSS:jn(a,14)>.9?s.STONED:void 0}),Mu=(n,e,t,i,r=s.MAGIC)=>n.ell(e,[t,t,t],r,{group:i,extra:!0}),Fx={"broken-arch":{desc:"a broken arch, one side fallen, a rune on its keystone",glow:!0,split:null,build(n,e){for(const t of[-1,1])gt(n,[t,t<0?1:.7,0],[.22,t<0?1:.7,.25],1+(t>0?1:0),e);for(let t=0;t<=6;t++){const i=Math.PI*(1-t/9),r=[Math.cos(i)*1,2+Math.sin(i)*.7,0];gt(n,r,[.17,.14,.25],3+t%2,e,{dir:[-Math.sin(i),Math.cos(i),0],courses:0,paint:t===4?(a=>Math.abs(a[0]-r[0])<.05&&Math.abs(a[1]-r[1])<.08?s.RUNE:mn(e)(a)):mn(e)})}for(let t=0;t<4;t++)gt(n,[1.3+t*.3,.14,.4+Gt(t)*.5],[.17,.13,.22],6+t,e,{dir:[1,.3*(Gt(t,2)-.5),Gt(t,3)-.5],courses:0});e&&(Tn(n,[-1.15,.1,.26],[-.9,1.9,.26],12,1),Ci(n,14,1.8,14,2))}},"tower-stump":{desc:"a fallen tower's stump, a spiral stair climbing round its inside",split:2,build(n,e){for(let t=0;t<14;t++){const i=t/14*Math.PI*2,r=1+(Math.sin(i*2+1)*.5+.5)*1.6*(i>3.6&&i<5.4?1:.55);i>.9&&i<2||gt(n,[Math.cos(i)*1.05,r/2,Math.sin(i)*.95],[.25,r/2,.14],1+t%3,e,{dir:[-Math.sin(i),0,Math.cos(i)]})}for(let t=0;t<9;t++){const i=3.2+t*.42,r=.15+t*.26;gt(n,[Math.cos(i)*.7,r,Math.sin(i)*.6],[.24,.06,.12],5,e,{dir:[Math.cos(i),0,Math.sin(i)],courses:0})}for(let t=0;t<3;t++)gt(n,[.6+t*.35,.14,1.1],[.22,.13,.2],7,e,{dir:[1,0,.4*t],courses:0});e&&(Tn(n,[-1.05,.1,-.4],[-1,2.3,-.5],10,3),Tn(n,[.9,.1,-.6],[.95,1.7,-.55],11,4),n.ell([0,.2,0],[.55,.2,.5],s.LEAF,{group:12,rough:.04}))}},colonnade:{desc:"a colonnade, two columns standing and the rest toppled",split:null,build(n,e){gt(n,[0,.08,0],[2.2,.08,.55],1,e,{courses:0});for(const[t,i]of[[-1.7,1.9],[-.6,1.4]])n.seg([t,.16,0],[t,i,0],.18,.17,s.STONE,{group:2,rough:.01,paint:r=>Math.abs(Math.sin(Math.atan2(r[2],r[0]-t)*8))<.15?s.STONED:mn(e,0)(r)}),gt(n,[t,i+.07,0],[.26,.07,.26],3,e,{courses:0});for(const[t,i,r]of[[.6,.55,.3],[1.6,.4,-.4]])n.seg([t-Math.cos(r)*.7,.2,i-Math.sin(r)*.7],[t+Math.cos(r)*.7,.2,i+Math.sin(r)*.7],.18,.18,s.STONE,{group:4,paint:mn(e,0)});gt(n,[-1.15,2,0],[.75,.1,.28],5,e,{courses:0}),e&&(Tn(n,[-1.7,.2,.18],[-1.65,1.8,.18],8,5),Ci(n,16,2.2,10,6))}},"stone-ring":{desc:"a ring of standing-stone stubs",split:null,build(n,e){for(let t=0;t<9;t++){const i=t/9*Math.PI*2,r=.3+Gt(t,9)*(t%3===0?1.2:.45);gt(n,[Math.cos(i)*1.7,r/2,Math.sin(i)*1.35],[.2,r/2,.14],1+t%4,e,{dir:[-Math.sin(i),.1*(Gt(t)-.5),Math.cos(i)],courses:0,round:.07})}gt(n,[0,.1,0],[.55,.1,.35],6,e,{courses:0,round:.05}),e&&Ci(n,20,2,10,7)}},"chapel-wall":{desc:"a ruined chapel wall with an empty pointed window, moonlight caught in it",glow:!0,split:2.4,build(n,e){gt(n,[0,1.4,0],[1.4,1.4,.18],1,e,{paint:t=>{const i=t[0],r=t[1];return Math.abs(i)<.38&&r>1.1&&r<2.3-Math.abs(i)*.5?void 0:mn(e,5)(t)}}),n.box([0,1.6,0],[.33,.55,.3],s.NOSE,{group:1,cut:!0}),n.ell([0,1.5,-.05],[.3,.5,.02],s.MAGIC2,{group:2,extra:!0,paint:t=>jn(t,18)<.5?s.MAGIC:void 0});for(const[t,i]of[[-1.55,2.6],[1.5,1.6]])gt(n,[t,i/2,0],[.22,i/2,.26],3,e);for(let t=0;t<5;t++)gt(n,[-1.2+t*.6,.12,.55+Gt(t)*.3],[.18,.12,.16],4,e,{courses:0,dir:[1,0,Gt(t,5)-.5]});e&&(Tn(n,[-1.2,.1,.2],[-.6,2.6,.2],6,8),Tn(n,[1,.1,.2],[1.2,2,.2],7,9))}},well:{desc:"an old well with a broken winch, fireflies over the water",glow:!0,split:null,build(n,e){for(let t=0;t<12;t++){const i=t/12*Math.PI*2;gt(n,[Math.cos(i)*.55,.32,Math.sin(i)*.5],[.15,.32,.1],1+t%2,e,{dir:[-Math.sin(i),0,Math.cos(i)],courses:3})}n.ell([0,.55,0],[.42,.02,.38],s.WATER,{group:3});for(const t of[-.6,.6])n.box([t,1,0],[.06,.5,.06],s.WOOD,{group:4,round:.02});n.seg([-.6,1.4,0],[.1,1.25,.05],.04,.04,s.WOOD,{group:5}),n.seg([.1,1.25,.05],[0,.85,.1],.01,.01,s.STRAW,{group:5});for(let t=0;t<4;t++)Mu(n,[(Gt(t)-.5)*.8,.8+Gt(t,2)*.7,(Gt(t,3)-.5)*.6],.03,10+t,t%2?s.MAGIC:s.MAGIC2);e&&(Tn(n,[-.55,.05,.5],[-.4,.62,.5],15,10),Ci(n,10,1,16,11))}},watchtower:{desc:"a crumbled watchtower, tall enough to see from the treetops",split:2.6,build(n,e){gt(n,[0,1.2,0],[.7,1.2,.7],1,e,{paint:t=>Math.abs(t[1]-1.9)<.16&&Math.abs(t[0])<.07&&t[2]>.6?s.NOSE:mn(e,5)(t)});for(const[t,i,r]of[[-.5,-.5,1.3],[0,-.5,1],[.5,-.5,.7],[-.5,0,.9],[-.5,.5,.5],[.5,0,.3]])gt(n,[t,2.4+r/2,i],[.2,r/2,.2],1,e);n.box([0,.55,.7],[.25,.45,.1],s.NOSE,{group:1,cut:!0});for(let t=0;t<6;t++)gt(n,[.5+Gt(t)*1.2,.13,-.3+Gt(t,4)*1.2],[.17,.12,.15],2+t%2,e,{courses:0,dir:[1,0,Gt(t,5)-.5]});e&&(Tn(n,[-.7,.1,.3],[-.7,2.4,.2],4,12),Tn(n,[.3,.1,.72],[.5,1.8,.72],5,13),oi(n,[.1,2.6,-.2],[.45,.3,.4],6))}},"sunken-stair":{desc:"a stairway going down into the ground, a dark doorway at its foot",split:null,build(n,e){for(const t of[-.6,.6])gt(n,[0,.2,t],[1.1,.2,.12],1,e,{courses:2});for(let t=0;t<5;t++)gt(n,[.8-t*.32,.3-t*.07,0],[.16,.04,.5],2,e,{courses:0});n.box([-.55,.08,0],[.28,.1,.48],s.NOSE,{group:3}),gt(n,[-1.1,.55,0],[.15,.55,.62],4,e),gt(n,[-1.05,1.15,0],[.2,.1,.7],5,e,{courses:0}),e&&(Ci(n,12,1.6,10,14),Tn(n,[-1,1.2,.5],[-.9,.3,.62],13,15))}},"statue-head":{desc:"a toppled giant statue head, its eyes still faintly lit",glow:!0,split:null,build(n,e){const t=[0,.8,0],i=.62,r=(a,o)=>[t[0]+o,t[1]+a,t[2]+i];n.ell(t,[.8,1,.7],s.STONE,{group:1,rough:.012,dir:[1,.25,0],paint:mn(e,0)}),n.ell(r(.3,0),[.62,.14,.16],s.STONE,{group:2,paint:mn(e,0)});for(const a of[-.26,.26])n.ell(r(.12,a),[.15,.09,.1],s.STONED,{group:1,cut:!0}),Mu(n,r(.12,a),.05,3+(a>0?1:0),s.MAGIC);n.ell(r(-.08,0),[.11,.24,.14],s.STONE,{group:5,paint:mn(e,0)}),n.ell(r(-.42,0),[.3,.07,.08],s.STONE,{group:6,paint:a=>Math.abs(a[1]-(t[1]-.42))<.015?s.STONED:mn(e,0)(a)});for(const[a,o]of[[-.55,.75],[0,.95],[.5,.8],[-.7,.3],[.75,.3]])n.ell([t[0]+a,t[1]+o,t[2]-.2],[.3,.25,.45],s.STONE,{group:7,rough:.02,paint:mn(e,0)});n.ell([t[0],.05,t[2]+.2],[1,.1,.8],s.STONE,{group:8,paint:mn(e,0)}),e&&(Ci(n,14,1.8,10,16),oi(n,E.add(t,[-.2,.95,-.2]),[.5,.25,.45],6))}},hearth:{desc:"a collapsed cottage: its hearth and chimney still standing",split:2.6,build(n,e){gt(n,[0,1.6,-.2],[.45,1.6,.35],1,e),n.box([0,.45,.1],[.3,.3,.3],s.NOSE,{group:1,cut:!0});for(const[t,i,r,a,o]of[[-1.1,.4,.9,.5,0],[1,.5,.7,.35,0],[-1.9,-.2,.12,.35,1]])gt(n,[t,a/2,i],o?[.12,a/2,.7]:[r,a/2,.12],2,e);for(let t=0;t<4;t++)n.seg([-.5+t*.4,.08,.9],[.2+t*.5,.3,.3+t*.1],.05,.05,s.BARKD,{group:3});e&&(Tn(n,[-.4,.1,.16],[-.3,2.8,.16],5,17),Ci(n,14,1.8,10,18))}},"bridge-span":{desc:"an old bridge span going nowhere, one arch over nothing",split:null,build(n,e){gt(n,[-.9,.7,0],[.35,.7,.5],1,e),gt(n,[.95,.55,0],[.3,.55,.5],2,e);for(let t=0;t<=8;t++){const i=t/8,r=Math.PI*(1-i),a=[Math.cos(r)*.85,.9+Math.sin(r)*.55,0];gt(n,a,[.14,.12,.5],3+t%2,e,{dir:[-Math.sin(r),Math.cos(r),0],courses:0})}gt(n,[-.1,1.62,0],[1.25,.1,.55],5,e,{courses:0,dir:[1,-.08,0]});for(const t of[-.5,.5])gt(n,[-.2,1.85,t],[1,.14,.06],6,e,{courses:0});e&&(Tn(n,[-1.2,.1,.5],[-1,1.6,.55],8,19),Ci(n,10,1.6,10,20))}},gateway:{desc:"an overgrown gateway, two posts and a rusted gate, a rune glowing on one post",glow:!0,split:null,build(n,e){for(const t of[-.9,.9])gt(n,[t,.9,0],[.22,.9,.22],1+(t>0?1:0),e,{paint:t<0?(i=>i[2]>.2&&Math.abs(i[1]-1.1)<.14&&Math.abs(i[0]-t)<.06?s.RUNE:mn(e,5)(i)):mn(e,5)}),n.ell([t,1.9,0],[.18,.14,.18],s.STONE,{group:3,paint:mn(e,0)});for(let t=0;t<6;t++)n.seg([-.65+t*.12,.1,.1+t*.06],[-.65+t*.12,1.2,.1+t*.06],.015,.015,s.SHADES,{group:4});for(const t of[.25,1.1])n.seg([-.65,t,.1],[-.05,t,.4],.018,.018,s.SHADES,{group:4});for(const t of[-1,1])for(let i=0;i<3;i++)gt(n,[t*(1.3+i*.35),.3-i*.08,0],[.17,.3-i*.08,.14],5,e);e&&(Tn(n,[.75,.05,.22],[.85,1.9,.22],7,21),Tn(n,[-.9,1.8,.22],[-.3,1,.3],8,22),Ci(n,12,1.6,10,23))}}},Ux={pebbles:{desc:"a cluster of fist-sized stones",build(n){for(let e=0;e<7;e++)Rn(n,[(Gt(e)-.5)*.6,.04,(Gt(e,2)-.5)*.4],[.07+Gt(e,3)*.05,.05,.07],1+e,{moss:.8})}},pair:{desc:"two small rocks",build(n){Rn(n,[-.15,.12,0],[.22,.15,.2],1),Rn(n,[.2,.08,.12],[.14,.1,.13],2)}},rock:{desc:"a knee-high rock",build(n){Rn(n,[0,.22,0],[.45,.3,.38],1,{dir:[1,.15,.2]})}},split:{desc:"a rock split in two, a seedling in the crack",build(n){Rn(n,[-.28,.35,0],[.3,.45,.45],1,{dir:[1,.3,0]}),Rn(n,[.3,.33,0],[.3,.42,.45],2,{dir:[1,-.3,0]}),n.seg([.02,.2,.1],[0,.6,.1],.015,.01,s.TRUNK,{group:3}),oi(n,[0,.62,.1],[.1,.07,.1],4)}},boulder:{desc:"a big boulder",build(n){Rn(n,[0,.55,0],[.85,.75,.7],1,{dir:[1,.1,.3]}),Rn(n,[.7,.15,.5],[.22,.15,.2],2)}},"great-boulder":{desc:"a great mossy boulder, a landmark",build(n){Rn(n,[0,.9,0],[1.4,1.15,1.1],1,{dir:[1,.2,.1],moss:.2}),Rn(n,[-1.1,.3,.6],[.4,.35,.35],2),Rn(n,[1.2,.2,.5],[.3,.22,.28],3)}},slab:{desc:"a flat slab of rock",build(n){n.box([0,.12,0],[1,.12,.7],s.STONE,{round:.08,rough:.02,group:1,dir:[1,.04,.2],paint:e=>e[1]>.2&&jn(e,6)<.3?s.MOSS:jn(e,14)>.9?s.STONED:void 0})}},"standing-rock":{desc:"a tall natural standing rock",build(n){Rn(n,[0,.8,0],[.35,.85,.3],1,{moss:.8}),Rn(n,[.35,.1,.25],[.15,.1,.14],2)}}},Bx={"spiral-tree":{desc:"a tree whose trunk twists in a spiral",split:2.4,build(n){const e=[];for(let t=0;t<=10;t++){const i=t/10,r=i*Math.PI*4;e.push([Math.cos(r)*.35*(1-i*.4),i*3,Math.sin(r)*.3,.2-i*.12])}Pn(n,e,1),oi(n,[0,3.2,0],[.9,.6,.8],2)}},"loop-tree":{desc:"a tree grown into a loop",split:2.4,build(n){const e=[[0,0,0,.22],[.1,.9,0,.18]];for(let t=0;t<=10;t++){const i=-Math.PI/2+t/10*Math.PI*2;e.push([.1+Math.cos(i)*.55+t*.02,1.45+Math.sin(i)*.55,0,.15])}e.push([.3,2.6,0,.1]),Pn(n,e,1),oi(n,[.3,2.9,0],[.75,.5,.65],2)}},"split-tree":{desc:"a tree split by lightning, both halves still leafing",split:2,build(n){Pn(n,[[0,0,0,.3],[0,.9,0,.26]],1),Pn(n,[[-.05,.9,0,.18],[-.6,1.9,0,.13],[-1,2.6,0,.07]],2),Pn(n,[[.05,.9,0,.18],[.55,1.8,.05,.13],[.9,2.4,.05,.07]],3),n.ell([0,1,.05],[.08,.25,.2],s.BARKD,{group:1,cut:!0}),oi(n,[-1,2.7,0],[.6,.45,.5],4),oi(n,[.95,2.5,.05],[.55,.4,.5],5)}},"door-tree":{desc:"a fat old tree with a little round door in it, a lit window above",glow:!0,split:2.3,build(n){n.ell([0,1,0],[.8,1.1,.75],s.TRUNK,{group:1,rough:.02,paint:e=>e[2]>.5&&Math.hypot(e[0],e[1]-.45)<.3&&e[1]>.2?Math.hypot(e[0],e[1]-.45)<.25?Math.abs(e[0]%.1)<.015?s.BARKD:s.ACCENT:s.BARKD:e[2]>.45&&Math.hypot(e[0]-.3,e[1]-1.3)<.13?Math.abs(e[0]-.3)<.015||Math.abs(e[1]-1.3)<.015?s.BARKD:s.GLOW:Al(e)}),n.ell([.12,.45,.72],[.03,.03,.03],s.FRAME,{group:2}),oi(n,[0,2.4,-.1],[1.1,.7,.9],3);for(let e=0;e<5;e++){const t=e/5*Math.PI*2;Pn(n,[[Math.cos(t)*.6,.2,Math.sin(t)*.55,.15],[Math.cos(t)*1.1,.02,Math.sin(t)*1,.05]],4)}}},"mushroom-tree":{desc:"an enormous mushroom, tall as a tree",split:2.2,build(n){n.seg([0,0,0],[.1,2.4,0],.3,.22,s.CLOTH,{group:1,paint:e=>e[1]>2&&e[1]<2.15?s.BELLY:void 0}),n.ell([.1,2.55,0],[1.3,.45,1.15],s.ACCENT,{group:2,rough:.01,paint:e=>e[1]<2.35?s.BODY2:jn(e,8)<.18?s.BELLY:void 0}),n.ell([.1,2.35,0],[1.2,.08,1.05],s.BODY2,{group:3,paint:e=>Math.abs(Math.sin(Math.atan2(e[2],e[0]-.1)*20))<.3?s.STRAW:void 0})}},"root-tree":{desc:"an upside-down-looking tree, its roots raised high like a crown",split:2,build(n){Pn(n,[[0,0,0,.35],[0,1.6,0,.25]],1);for(let e=0;e<7;e++){const t=e/7*Math.PI*2;Pn(n,[[0,1.6,0,.16],[Math.cos(t)*.7,2.2+Gt(e)*.3,Math.sin(t)*.6,.1],[Math.cos(t)*1.2,2.5+Gt(e,2)*.4,Math.sin(t)*1,.04]],2+e%2)}for(let e=0;e<4;e++){const t=e/4*Math.PI*2+.4;Pn(n,[[Math.cos(t)*.25,.3,Math.sin(t)*.25,.14],[Math.cos(t)*.6,.02,Math.sin(t)*.55,.05]],4)}}},"stone-lifter":{desc:"a tree that has lifted great stones up in its roots",split:2.4,build(n){Pn(n,[[0,.6,0,.3],[0,2,0,.22],[.1,2.8,0,.12]],1);for(let e=0;e<6;e++){const t=e/6*Math.PI*2;Pn(n,[[Math.cos(t)*.2,.6,Math.sin(t)*.2,.15],[Math.cos(t)*.6,.45,Math.sin(t)*.55,.12],[Math.cos(t)*.9,0,Math.sin(t)*.8,.07]],2)}for(const[e,t,i]of[[.5,.45,.9],[-.5,.4,1.1],[.15,-.5,.8]])Rn(n,[e,i,t],[.3,.24,.26],3);oi(n,[.1,3,0],[1,.6,.85],4)}},"ring-tree":{desc:"a hollow ring of a tree you could fly through",split:null,build(n){for(let e=0;e<=16;e++){const t=e/16*Math.PI*2,i=[Math.cos(t)*1.2,1.35+Math.sin(t)*1.2,0];n.ell(i,[.3,.3,.3],s.TRUNK,{group:1,rough:.02,paint:Al})}Pn(n,[[-.6,0,.2,.3],[-.5,.3,.1,.3]],2),Pn(n,[[.6,0,.2,.3],[.5,.3,.1,.3]],2);for(const[e,t]of[[-.9,2.3],[.3,2.65],[1.1,2]])oi(n,[e,t,-.1],[.45,.3,.35],3)}}},kx=[...Object.entries(Fx).map(([n,e])=>({id:n,family:"ruins",size:1.15,variants:2,...e})),...Object.entries(Ux).map(([n,e])=>({id:n,family:"rocks",size:1,variants:1,split:null,...e})),...Object.entries(Bx).map(([n,e])=>({id:n,family:"freak",size:1.2,variants:1,...e}))];Object.fromEntries(kx.map(n=>[n.id,n]));const Ce=(n,e=0)=>{const t=Math.sin(n*127.1+e*311.7)*43758.5453;return t-Math.floor(t)},de=(n,e,t=0)=>Ce(Math.floor(n[0]*e)+Math.floor(n[2]*e)*57+t,Math.floor(n[1]*e)),Ue=(n=.2,e=.15)=>t=>{const i=de(t,16,3);return de(t,6,5)<e&&t[1]>.1?s.MOSS:i>1-n*.7?s.BODY2:void 0},ft=(n=7,e=.15)=>t=>de(t,6,9)<e&&t[1]>.15?s.MOSS:Math.abs(Math.sin(t[1]*60+Math.sin(t[0]*9)*1.5))>.97?s.BARK2:de(t,n*3,2)>.9?s.BARKD:void 0,ge=(n,e,t,i,r,a=0,o=0)=>{for(let l=0;l<e;l++){const c=Ce(r,l)*6.283,u=t*Math.sqrt(Ce(l,r));n.ell([a+Math.cos(c)*u,.07,o+Math.sin(c)*u*.7],[.07,.1+Ce(l,4)*.08,.07],s.LEAF2,{group:i+l%3,paint:h=>h[1]>.13?s.LEAF:void 0})}},Pi=(n,e,t,i=1)=>{for(let r=0;r<6;r++){const a=r/6*6.283+e[0],o=[Math.cos(a),0,Math.sin(a)];n.chain([[...e,.03*i],[...E.add(e,E.add(E.mul(o,.25*i),[0,.2*i,0])),.025*i],[...E.add(e,E.add(E.mul(o,.5*i),[0,.05*i,0])),.01*i]],r%2?s.LEAF:s.LEAF2,{group:t})}},ht=(n,e,t,i,r)=>{const a=[];for(let o=0;o<=4;o++)a.push([...E.add(E.lerp(e,t,o/4),[(Ce(r,o)-.5)*.12,0,.02]),.03]);n.chain(a,s.LEAF,{group:i,paint:o=>de(o,30)<.3?s.LEAF2:void 0})},jl=(n,e,t,i)=>n.ell(e,t,s.LEAF,{group:i,rough:.04,paint:r=>{const a=de(r,10,2);return r[1]<e[1]-.15||a<.2?s.LEAF3:a>.8?s.LEAF2:void 0}}),Ye=(n,e,t,i,r=.025,a=s.FRAME,o=Ue(.35,.05))=>n.seg(e,t,r,r,a,{group:i,paint:o}),Uh=(n,e,t,i,r=s.MAGIC)=>n.ell(e,[t,t,t],r,{group:i,extra:!0}),ec=(n,e,t,i)=>n.ell(e,t,s.MOSS,{group:i,rough:.03,paint:r=>de(r,12,4)<.25?s.LEAF2:de(r,9,6)<.15?s.LEAF3:void 0});function ln(n,e,t,i,r,a,o={}){const l=E.norm(E.sub(t,e)),c=typeof o.end=="function"?o.end:void 0,u=typeof o.end=="number"?o.end:r;n.seg(e,t,i,i,r,{group:a,paint:o.paint});for(const[h,f]of[[t,1],[e,-1]])n.box(E.add(h,E.mul(l,f*i*.75)),[i*.75,i*1.25,i*1.25],u,{dir:E.mul(l,f),up:Math.abs(l[1])>.9?[1,0,0]:[0,1,0],round:.005,group:a,cut:!0,paint:c})}const Tl=(n,e)=>t=>{const i=[0,1,2].filter(a=>a!==e);return Math.hypot(t[i[0]]-n[i[0]],t[i[1]]-n[i[1]])*34%1<.22?s.BARK2:de(t,30)<.05?s.BARKD:s.STRAW},Gr=(n,e,t,i,r,a=!1)=>n.ell(e,[t,a?t*.8:t,i],s.BODY3,{group:r,paint:o=>{const l=Math.hypot(o[0]-e[0],o[1]-e[1]);return l<t*.45?de(o,20)<.3?s.BODY2:s.FRAME:l>t*.8&&Math.abs(Math.sin(Math.atan2(o[1]-e[1],o[0]-e[0])*14))<.3?s.NOSE:void 0}});function zx(n,e,{yaw:t=0,pitch:i=0,roll:r=0,at:a=[0,0,0]}={},o=n.flats.length){const l=(d,p,g,x)=>{const M=Math.cos(p),m=Math.sin(p),_=[...d];return _[g]=d[g]*M-d[x]*m,_[x]=d[g]*m+d[x]*M,_},c=d=>l(l(l(d,r,1,2),i,0,1),-t,0,2),u=d=>l(l(l(d,t,0,2),-i,0,1),-r,1,2),h=d=>E.add(c(d),a),f=d=>u(E.sub(d,a));for(const d of n.parts.slice(e))if(d.type==="cone"?(d.a=h(d.a),d.b=h(d.b)):(d.c=h(d.c),d.axes=d.axes.map(c)),d.paint){const p=d.paint;d.paint=(g,x)=>p(f(g),x)}for(const d of n.flats.slice(o))d.c=h(d.c),d.u=c(d.u),d.v=c(d.v)}const Vt=n=>[n.parts.length,n.flats.length],Yt=(n,[e,t],i)=>zx(n,e,i,t);function Co(n,e,{broken:t=!1,len:i=1}={}){for(const r of[-i,i])n.box([r,.45,0],[.06,.47,.06],s.WOOD,{round:.02,group:e,rough:.006,paint:ft(7,.3)});for(const[r,a]of[.3,.55,.8].entries()){if(t&&r===1){n.box([-i*.55,a-.12,.03],[i*.48,.04,.022],s.WOOD,{dir:[1,-.35,0],round:.015,group:e+1,paint:ft()}),n.box([i*.7,a-.2,.04],[i*.34,.04,.022],s.WOOD,{dir:[1,.8,0],round:.015,group:e+2,paint:ft()});continue}t&&r===2||n.box([0,a,.07],[i+.06,.045,.022],s.WOOD,{round:.015,group:e+1,paint:ft()})}}function Lo(n,e,t,{mould:i=!1,along:r=2}={}){const l=[...e],c=[...e];l[1]=c[1]=e[1]+.56,l[r]-=.44,c[r]+=.44;const u=f=>{if(i&&(de(f,5,11)<.32||f[1]<e[1]+.25&&de(f,9,3)<.6))return de(f,14)<.4?s.BODY3:s.SKIN;const d=de(f,22,1);return d<.18?s.BARK2:d>.85?s.BELLY:void 0},h=f=>{const d=r===2?[f[0]-e[0],f[1]-l[1]]:[f[2]-e[2],f[1]-l[1]],p=Math.hypot(...d),g=Math.atan2(d[1],d[0])/6.283;return i&&de(f,6,2)<.35?s.SKIN:(p*12+g)%1<.3?s.BARK2:s.STRAW};if(ln(n,l,c,.56,s.STRAW,t,{paint:u,end:h}),!i)for(const f of[-.25,.25]){const d=[...e];d[r]+=f,n.ell([d[0],e[1]+.56,d[2]],r===2?[.56+.012,.56+.012,.012]:[.012,.56+.012,.56+.012],s.CLOTH,{group:t+1})}}function ma(n,e,t,{mould:i=!1,yaw:r=0}={}){const a=[Math.cos(r),0,Math.sin(r)];n.box(E.add(e,[0,.19,0]),[.4,.19,.23],s.STRAW,{dir:a,round:.05,group:t,rough:.008,paint:o=>{if(i&&de(o,5,7)<.35)return de(o,13)<.4?s.BODY3:s.SKIN;const l=(o[0]-e[0])*a[0]+(o[2]-e[2])*a[2];if(Math.abs(Math.abs(l)-.2)<.02)return s.BARK2;const c=de(o,22,1);return c<.16?s.BARK2:c>.86?s.BELLY:void 0}})}const xu=(n,e,t,i,r)=>ln(n,e,t,i,s.TRUNK,r,{paint:a=>{const o=de(a,14,2);return o<.15?s.BARKD:o>.88?s.BARKL:de(a,5,8)<.12&&a[1]>e[1]?s.MOSS:void 0},end:Tl(e,E.sub(t,e).map(Math.abs).indexOf(Math.max(...E.sub(t,e).map(Math.abs))))}),Do=(n,e,t,i={})=>{n.ell(e,[.3,.1,.3],s.BODY3,{group:t,axes:i.axes,paint:r=>Math.abs(Math.sin(Math.atan2(r[2]-e[2],r[0]-e[0])*16))<.25?s.NOSE:de(r,9,4)<.1?s.MOSS:void 0}),n.ell(e,[.15,.2,.15],s.NOSE,{group:t,axes:i.axes,cut:!0})},Rl=(n,e,t,i,r,{cap:a=s.EAR,k:o=1}={})=>{for(let l=0;l<t;l++){const c=Ce(r,l)*6.283,u=.16*o*Math.sqrt(Ce(l,r)),h=e[0]+Math.cos(c)*u,f=e[2]+Math.sin(c)*u,d=(.06+Ce(l,3)*.09)*o;n.seg([h,e[1],f],[h,e[1]+d,f],.012*o,.01*o,s.CLOTH,{group:i}),n.ell([h,e[1]+d,f],[.04*o,.022*o,.04*o],a,{group:i+1})}},_u=(n,e,t,i=.35)=>(r,a)=>{const o=(r+1)/2*n,l=(a+1)/2*e;if(o%1<.07||o%1>.93||l%1<.07||l%1>.93)return s.FRAME;const c=Math.floor(o)+Math.floor(l)*7;return Ce(c,t)<i?null:Math.abs(Math.sin((o+l*.7)*9+c))<.06?s.STONED:s.SHADES},Hx=(n,e,t)=>(i,r)=>{const a=(1-r)/2;return r<-1||Math.abs(i)>a?null:Math.min(a-Math.abs(i),r+1)<.17?n:t(i,r)?s.NOSE:e},Bh={tractor:{desc:"an old tractor rusted through and sunk to its axles in moss, a sapling up through its cab",split:2.2,build(n){for(const t of[-.62,.62])Gr(n,[-.6,.58+-.2,t],.58,.17,1+(t>0?1:0));for(const t of[-.5,.5])Gr(n,[.95,.34+-.2,t],.34,.11,3,!0);n.box([.5,.64+-.2,0],[.62,.2,.25],s.BODY,{round:.08,group:4,paint:t=>Math.abs(t[2])>.2&&t[0]>.2&&t[0]*12%1<.35&&Math.abs(t[1]-.64- -.2)<.1?s.SHADES:Ue(.5,.2)(t)}),n.box([1.1,.66+-.2,0],[.06,.2,.22],s.FRAME,{round:.04,group:4,paint:t=>t[1]*18%1<.4?s.SHADES:Ue(.5,.1)(t)}),n.box([.35,.38+-.2,0],[.75,.13,.17],s.FRAME,{round:.05,group:5,paint:Ue(.55,.1)}),n.box([-.55,.74+-.2,0],[.32,.16,.42],s.BODY,{round:.06,group:6,paint:Ue(.55,.25)});for(const t of[-.62,.62])n.ell([-.6,.58+-.2,t],[.66,.66,.2],s.BODY,{group:7+(t>0?1:0),paint:Ue(.6,.3)}),n.ell([-.6,.58+-.2,t],[.6,.6,.3],s.BODY2,{group:7+(t>0?1:0),cut:!0}),n.box([-.6,.1+-.2,t],[.8,.55,.3],s.BODY2,{group:7+(t>0?1:0),cut:!0});n.box([-.62,1+-.2,0],[.17,.04,.17],s.BODY3,{round:.03,group:9}),n.box([-.78,1.17+-.2,0],[.03,.17,.16],s.BODY3,{round:.03,group:9}),Ye(n,[-.25,.9+-.2,0],[-.05,1.2+-.2,0],10,.02),n.flat([-.04,1.22+-.2,0],[0,0,1],[.5,.87,0],.13,.13,(t,i)=>Math.abs(Math.hypot(t,i)-.85)<.17?s.BODY3:null,{group:10,bend:.1});for(const[t,i]of[[-1.05,-.55],[-1.05,.55],[-.2,-.55],[-.2,.55]])Ye(n,[t,.9+-.2,i],[t*.95,2+-.2,i*.95],11,.03,s.BODY,Ue(.6,.05));n.box([-.62,2.03+-.2,-.2],[.5,.035,.5],s.BODY,{round:.02,group:12,dir:[1,0,.25],paint:t=>t[1]>2.03+-.2&&de(t,6,2)<.5?s.MOSS:Ue(.7,.3)(t)}),Ye(n,[.8,.8+-.2,.18],[.8,1.55+-.2,.18],13,.035,s.BODY3),n.seg([-.45,0,.05],[-.38,2.5,.1],.06,.035,s.TRUNK,{group:14,rough:.01}),jl(n,[-.36,2.6,.1],[.5,.38,.45],15),ec(n,[-.1,0,0],[1.75,.26,1.05],16),Pi(n,[1.2,.05,.7],17),Pi(n,[-1.3,.05,.8],18,.8),ge(n,14,2.2,19,1)}},trailer:{desc:"a farm trailer, its boards silver with age, its tailgate dropped, a fern in its bed",build(n){n.box([0,.58,0],[1.15,.05,.6],s.WOOD,{round:.02,group:1,paint:ft()});for(const e of[-.6,.6])n.box([0,.78,e],[1.15,.2,.03],s.WOOD,{round:.02,group:2,paint:ft(7,.25)});n.box([-1.15,.78,0],[.03,.2,.6],s.WOOD,{round:.02,group:3,paint:ft()}),n.box([1.32,.38,0],[.03,.2,.58],s.WOOD,{round:.02,group:4,dir:[.25,-1,0],up:[1,.25,0],paint:ft(7,.3)});for(const e of[-.7,.7])Gr(n,[0,.33,e],.33,.11,5,e>0);n.box([0,.45,0],[1,.06,.5],s.FRAME,{round:.03,group:6,paint:Ue(.6,.1)});for(const e of[-.3,.3])Ye(n,[-1.1,.5,e],[-1.8,.4,0],7,.035,s.FRAME,Ue(.6,.1));Ye(n,[-1.75,.4,0],[-1.75,0,0],7,.03,s.FRAME,Ue(.6,.1)),Pi(n,[.3,.62,0],8,.9),ge(n,12,2,9,2)}},"trailer-hay":{desc:"a trailer still loaded with hay bales, the top ones slumped and mouldy",build(n){Bh.trailer.build(n);for(const[e,t,i,r,a]of[[-.7,-.3,.63,0,0],[-.7,.3,.63,0,0],[0,-.3,.63,0,0],[0,.3,.63,1,0],[.7,-.3,.63,0,0],[-.4,0,1.01,1,.2],[.35,-.1,1.01,1,-.3]])ma(n,[e,i,t],20+Math.round((e+1)*3)+(i>.9?9:0),{mould:!!r,yaw:a})}},"hay-round":{desc:"a round hay bale on its end, its net wrap perished",build(n){Lo(n,[0,0,0],1),ge(n,8,1,4,3)}},"hay-round-side":{desc:"a round hay bale lying along the ground",build(n){Lo(n,[0,0,0],1,{along:0}),ge(n,8,1,4,4)}},"hay-round-mouldy":{desc:"a round bale gone black with mould and sagging, mushrooms at its foot",build(n){const e=Vt(n);Lo(n,[0,0,0],1,{mould:!0}),Yt(n,e,{roll:.06,at:[0,-.06,0]}),Rl(n,[.5,0,.35],6,3,1),ge(n,10,1.1,5,5)}},"hay-square":{desc:"a small square hay bale",build(n){ma(n,[0,0,0],1),ge(n,5,.6,3,6)}},"hay-square-mouldy":{desc:"a square bale gone soft and mouldy",build(n){ma(n,[0,0,0],1,{mould:!0,yaw:.3}),ge(n,6,.6,3,7)}},"hay-stack":{desc:"square bales stacked three high, the stack slumping, one fallen",build(n){[[-.42,0,-.25],[.42,0,-.25],[-.42,0,.25],[.42,0,.25],[0,.38,-.25],[0,.38,.25],[-.05,.76,0]].forEach(([i,r,a],o)=>ma(n,[i,r,a],1+o,{mould:o===6||o===2,yaw:(Ce(o,9)-.5)*.25}));const t=Vt(n);ma(n,[0,0,0],10,{mould:!0}),Yt(n,t,{roll:1.2,yaw:.8,at:[1.1,.15,.45]}),ge(n,10,1.4,12,8)}},fence:{desc:"a post-and-rail fence section, grey with age",build(n){Co(n,1),ge(n,6,1,4,9)}},"fence-broken":{desc:"a fence section, its top rail gone and its middle rail snapped",build(n){Co(n,1,{broken:!0}),ge(n,8,1,4,10)}},"fence-leaning":{desc:"a fence section leaning over, ivy through its rails",build(n){const e=Vt(n);Co(n,1),Yt(n,e,{roll:-.45}),ht(n,[-.8,0,.1],[.4,.55,-.2],5,11),ge(n,8,1,6,11)}},gate:{desc:"a five-bar field gate hanging open on its post, its latch post fallen",split:null,build(n){n.box([0,.62,0],[.08,.64,.08],s.WOOD,{round:.02,group:1,paint:ft(7,.35)});const e=Vt(n),t=2;for(let r=0;r<5;r++)n.box([t/2,.22+r*.17,0],[t/2,.03,.02],s.WOOD,{round:.012,group:2,paint:ft()});for(const r of[.05,t-.05])n.box([r,.56,0],[.04,.4,.025],s.WOOD,{round:.012,group:3,paint:ft()});n.box([t/2,.56,.02],[t/2*1.04,.025,.02],s.WOOD,{dir:[t,.66,0],round:.01,group:4,paint:ft()}),Ye(n,[.1,.9,.03],[.1,.3,.03],4,.015,s.FRAME),Yt(n,e,{yaw:.55,pitch:-.04,at:[0,0,.08]});const i=Vt(n);n.box([0,.62,0],[.08,.64,.08],s.WOOD,{round:.02,group:5,paint:ft(7,.4)}),Yt(n,i,{roll:1.45,at:[2,.08,.3]}),ge(n,12,1.8,6,12)}},trough:{desc:"a galvanised feed trough on short legs, rainwater and leaves in it",build(n){n.box([0,.36,0],[.72,.17,.24],s.FRAME,{round:.07,group:1,paint:Ue(.5,.15)}),n.box([0,.52,0],[.68,.15,.2],s.FRAME,{round:.06,group:1,cut:!0}),n.box([0,.43,0],[.67,.01,.19],s.WATER,{group:2,paint:e=>de(e,11)<.2?s.LEAF3:de(e,9,3)<.12?s.BARK2:void 0});for(const e of[-.6,.6])for(const t of[-.16,.16])Ye(n,[e,.2,t],[e,0,t*1.3],3,.025);ge(n,10,1.1,4,13)}},"water-butt":{desc:"a water butt on two bricks, moss down its side, its lid cracked",build(n){for(const e of[-.18,.18])n.box([e,.08,0],[.1,.08,.2],s.STONE,{round:.02,group:1,paint:t=>de(t,8)<.3?s.MOSS:void 0});ln(n,[0,.16,0],[0,1,0],.3,s.HAT2,2,{paint:e=>Math.abs(Math.sin(e[1]*22))>.94?s.LEAF3:de(e,7,2)<.22&&e[2]>0?s.MOSS:void 0}),ln(n,[0,.99,0],[0,1.05,0],.32,s.HAT2,3,{end:e=>Math.abs(e[0]-e[2]*.4)<.015?s.NOSE:de(e,10,3)<.3?s.MOSS:s.HAT2}),Ye(n,[.1,.3,.28],[.1,.3,.38],4,.03,s.FRAME),ge(n,8,.8,5,14)}},scarecrow:{desc:"a scarecrow in a ragged coat and straw hat, a crow on its arm",split:1.6,build(n){n.seg([0,0,0],[0,1.9,0],.04,.035,s.WOOD,{group:1}),n.seg([-.6,1.48,0],[.6,1.5,0],.03,.03,s.WOOD,{group:1}),n.box([0,1.25,0],[.22,.36,.13],s.JACKET,{round:.08,group:2,rough:.01,paint:t=>Math.hypot(t[0]+.08,t[1]-1.12)<.07?s.ACCENT:Math.hypot(t[0]-.1,t[1]-1.35)<.06?s.HAT1:void 0});for(const t of[-1,1]){n.seg([t*.18,1.46,0],[t*.55,1.47,0],.085,.07,s.JACKET,{group:3,rough:.01});for(let i=0;i<4;i++)n.seg([t*.58,1.47,0],[t*(.66+Ce(i,t)*.08),1.4+i*.04,(Ce(t,i)-.5)*.1],.015,.005,s.STRAW,{group:4})}for(let t=0;t<5;t++)n.seg([(t-2)*.07,.92,0],[(t-2)*.09,.78-Ce(t)*.1,.02],.015,.006,s.STRAW,{group:4});n.ell([0,1.78,0],[.15,.17,.14],s.CLOTH,{group:5,paint:t=>t[2]>.1&&Math.abs(t[1]-1.8)<.03&&Math.abs(Math.abs(t[0])-.06)<.03?s.NOSE:Math.abs(t[1]-1.66)<.02?s.BARK2:void 0}),n.ell([0,1.9,0],[.3,.025,.28],s.STRAW,{group:6,rough:.006}),n.ell([0,1.97,0],[.14,.09,.13],s.STRAW,{group:6,paint:t=>Math.abs(t[1]-1.93)<.02?s.ACCENT:void 0});const e=[.5,1.6,.02];n.ell(e,[.1,.06,.05],s.NOSE,{group:7,dir:[1,.3,0]}),n.ell(E.add(e,[.09,.06,0]),[.045,.045,.04],s.NOSE,{group:7}),n.seg(E.add(e,[.12,.06,0]),E.add(e,[.18,.04,0]),.012,.003,s.STONED,{group:7}),n.seg(E.add(e,[-.06,0,0]),E.add(e,[-.18,-.04,0]),.03,.01,s.NOSE,{group:7}),ge(n,8,.8,8,15)}},"milk-churn":{desc:"an old milk churn, dented, moss on its shoulder",build(n){ln(n,[0,0,0],[0,.52,0],.2,s.FRAME,1,{paint:e=>Math.abs(e[1]-.08)<.02||Math.abs(e[1]-.45)<.02?s.STONED:Ue(.3,.1)(e)}),n.seg([0,.52,0],[0,.7,0],.2,.1,s.FRAME,{group:1,paint:e=>de(e,8,2)<.4?s.MOSS:Ue(.3,0)(e)}),ln(n,[0,.68,0],[0,.8,0],.1,s.FRAME,1),ln(n,[0,.79,0],[0,.84,0],.125,s.FRAME,2,{paint:Ue(.5,0)});for(const e of[-1,1])Ye(n,[e*.16,.62,0],[e*.2,.7,0],3,.015)}},wheelbarrow:{desc:"a rusted wheelbarrow, a flat tyre, a fern growing in its tray",build(n){const e=Vt(n);n.box([0,.42,0],[.45,.16,.3],s.HAT1,{round:.06,group:1,paint:Ue(.6,.15)}),n.box([0,.55,0],[.41,.15,.26],s.BODY2,{round:.05,group:1,cut:!0}),Gr(n,[.62,.17,0],.17,.05,2,!0);for(const t of[-.12,.12])Ye(n,[.62,.17,t],[-.2,.3,t*2],3,.02);for(const t of[-.24,.24])Ye(n,[.3,.3,t*.8],[-.95,.5,t*1.15],4,.022),Ye(n,[-.35,.3,t],[-.4,0,t],4,.02);Yt(n,e,{pitch:-.05}),Pi(n,[0,.35,0],6,.75),ge(n,8,1,7,16)}},plough:{desc:"a horse plough left in the grass, its shares rusted, bindweed over it",build(n){Ye(n,[-1,.62,0],[.9,.26,0],1,.045,s.FRAME,Ue(.7,.1));for(const[e,t]of[[-.4,-.08],[.15,.08],[.65,.02]])Ye(n,[e,.52-e*.2,t],[e+.1,.18,t],2,.03,s.FRAME,Ue(.7,0)),n.ell([e+.18,.16,t+.1],[.22,.13,.03],s.BODY2,{dir:[1,-.2,.7],group:3,paint:i=>de(i,14)<.3?s.BODY3:void 0});Gr(n,[1.05,.22,0],.22,.04,4);for(const e of[-.18,.18])Ye(n,[-.9,.6,0],[-1.45,.9,e],5,.025,s.WOOD,ft());ht(n,[-.6,0,.2],[.5,.4,.1],6,17),ge(n,12,1.5,7,18)}}};function vu(n,e){n.box([0,.18,0],[.12,.18,.12],s.HAT2,{round:.04,group:1,paint:Ue(.4,.2)}),n.seg([0,.3,0],[0,3.3,0],.07,.05,s.HAT2,{group:1,paint:Ue(.4,.05)}),n.chain([[0,3.3,0,.05],[.12,3.5,0,.045],[.45,3.58,0,.04],[.68,3.55,0,.035]],s.HAT2,{group:2,paint:Ue(.4,0)}),n.box([.74,3.5,0],[.22,.05,.14],s.HAT2,{round:.04,group:3,paint:Ue(.5,.3)}),n.ell([.74,3.42,0],[.17,.07,.11],e?s.GLOW:s.SHADES,{group:3}),e&&Uh(n,[.74,3.38,0],.07,4,s.MAGIC2),ht(n,[0,0,.07],[.02,2.1,.06],5,e?19:20),ht(n,[-.06,0,0],[-.05,1.3,.04],6,21),ge(n,8,.8,7,22)}const Po=(n,e,t,i,r,a,o={})=>{const l=Vt(n);Ye(n,[0,0,0],[0,1.55,0],a,.03,s.FRAME,Ue(.4,.1)),n.flat([0,1.55+i*.7,.04],[1,0,0],[0,1,0],t,i,e,{group:a+1,bend:.05}),n.box([0,1.55+i*.7,.02],[t*.6,i*.6,.012],s.FRAME,{group:a+2,round:.01}),Yt(n,l,{at:r,...o})},Gx={lamppost:{desc:"a street lamp still standing, dark, ivy up its post",split:2.2,build(n){vu(n,!1)}},"lamppost-lit":{desc:"a street lamp still standing, its lamp flickering warm after all these years",glow:!0,split:2.2,build(n){vu(n,!0)}},"sign-blank":{desc:"a road sign leaning, its plate weathered blank",build(n){Po(n,(e,t)=>Math.abs(e)>.88||Math.abs(t)>.82?s.BELLY:de([e*3,t*3,0],4)<.2?s.STONED:s.HAT1,.45,.32,[0,0,0],1,{roll:.22,yaw:-.15}),ge(n,8,.8,5,23)}},"sign-triangle":{desc:"a warning sign leaning, a leaping deer on it (no words)",build(n){Po(n,Hx(s.ACCENT,s.BELLY,(e,t)=>{const i=((e-.02)/.3)**2+((t+.38)/.09)**2<1,r=Math.hypot(e-.3,t+.22)<.07,a=(Math.abs(e+.2+(t+.5)*.5)<.03||Math.abs(e-.2-(t+.5)*.4)<.03)&&t<-.4&&t>-.62,o=Math.abs(e-.32+(t+.1)*.3)<.025&&t>-.18&&t<-.02;return i||r||a||o}),.38,.36,[0,0,0],1,{roll:-.18,pitch:.1}),ge(n,8,.8,5,24)}},"sign-round":{desc:"a round sign bent on its pole, a plain white arrow on blue",build(n){Po(n,(e,t)=>{const i=Math.hypot(e,t);return i>1?null:i>.88||Math.abs(t)<.13&&e>-.55&&e<.2||e>=.1&&e<.55&&Math.abs(t)<.5-(e-.1)*1.1?s.BELLY:de([e*3,t*3,0],5)<.15?s.STONED:s.HAT1},.3,.3,[0,0,0],1,{roll:.12,pitch:-.3}),ge(n,8,.8,5,25)}},bench:{desc:"a park bench, cast-iron ends and rotting slats, one slat gone, moss on its seat",build(n){for(const e of[-.8,.8])n.box([e,.23,0],[.04,.23,.22],s.FRAME,{round:.02,group:1,paint:Ue(.5,.05)}),n.box([e,.55,-.2],[.04,.28,.04],s.FRAME,{round:.02,group:1,dir:[0,1,-.25],paint:Ue(.5,0)}),n.box([e,.52,.1],[.04,.03,.17],s.FRAME,{round:.015,group:1});for(const e of[-.15,0,.15])e!==0&&n.box([0,.46,e],[.88,.025,.06],s.WOOD,{round:.015,group:2,paint:ft(7,.4)});for(const e of[.62,.76])n.box([0,e,-.22-(e-.62)*.25],[.88,.045,.02],s.WOOD,{round:.012,group:3,dir:[1,0,0],up:[0,1,-.25],paint:ft(7,.3)});n.box([.45,.2,.2],[.4,.02,.05],s.WOOD,{dir:[1,-.6,.3],round:.012,group:4,paint:ft(7,.5)}),ge(n,12,1.2,5,26)}},"bin-bags":{desc:"a heap of bin bags, long faded and split, moss creeping over them",build(n){[[-.35,.22,-.1,.3],[.25,.2,-.2,.28],[0,.24,.25,.3],[-.05,.5,-.05,.26],[.5,.16,.25,.22],[-.6,.15,.3,.2]].forEach(([t,i,r,a],o)=>{n.ell([t,i,r],[a*1.1,a*.9,a],s.JACKET,{group:1+o,rough:.015,paint:l=>de(l,7,o)<.18?s.MOSS:de(l,16,o+3)>.93?s.STONED:void 0}),n.ell([t+.05,i+a*.9,r],[.06,.07,.05],s.JACKET,{group:1+o})});for(let t=0;t<6;t++)n.box([.8+Ce(t)*.5,.02,-.1+Ce(t,2)*.5],[.06,.015,.04],t%2?s.BELLY:s.CLOTH,{dir:[Ce(t,3)-.5,0,Ce(t,4)-.5],group:8+t});ge(n,10,1.2,15,27)}},"bus-shelter":{desc:"a bus shelter, most of its glass gone, ivy over its roof, a bench inside",split:1.7,build(n){for(const[e,t]of[[-1.15,-.5],[1.15,-.5],[-1.15,.45],[1.15,.45]])Ye(n,[e,0,t],[e,1.85-t*.1,t],1,.035);n.box([0,1.9,-.02],[1.25,.04,.6],s.FRAME,{dir:[1,0,0],up:[0,1,.12],round:.02,group:2,paint:e=>de(e,4,6)<.45&&e[1]>1.9?s.MOSS:Ue(.5,.1)(e)}),n.flat([0,.98,-.5],[1,0,0],[0,1,0],1.12,.82,_u(4,2,1,.45),{group:3,bend:.02}),n.flat([1.15,.98,-.02],[0,0,1],[0,1,0],.45,.82,_u(2,2,3,.55),{group:4,bend:.02}),n.box([0,.45,-.38],[.9,.03,.1],s.FRAME,{round:.02,group:5});for(const e of[-.8,.8])Ye(n,[e,0,-.38],[e,.44,-.38],5,.02);ht(n,[-1.15,0,.46],[-.6,1.95,.3],6,28),ht(n,[-.5,1.95,.5],[.6,1.95,.1],7,29),n.ell([-.3,1.98,0],[.7,.1,.45],s.LEAF,{group:8,rough:.03,paint:e=>de(e,9)<.3?s.LEAF3:void 0}),ge(n,14,1.8,9,30)}},"bus-stop-sign":{desc:"a bus stop pole, its plate a blank disc, a timetable case long empty",split:1.6,build(n){Ye(n,[0,0,0],[0,2.3,0],1,.035,s.FRAME,Ue(.4,.1)),n.flat([0,2.4,.04],[1,0,0],[0,1,0],.24,.24,(e,t)=>{const i=Math.hypot(e,t);return i>1?null:i>.8||i<.5&&Math.abs(t)<.15?s.HAT1:s.BELLY},{group:2,bend:.05}),n.box([0,1.45,.06],[.16,.22,.03],s.FRAME,{round:.02,group:3,paint:e=>e[2]>.07&&Math.abs(e[0])<.12&&Math.abs(e[1]-1.45)<.18?s.SHADES:Ue(.5,.2)(e)}),ht(n,[0,0,.04],[.02,1.2,.04],4,31),ge(n,6,.6,5,32)}},"litter-bin":{desc:"a litter bin on its post, rusted through, a bag spilling out",build(n){Ye(n,[0,0,-.2],[0,1,-.2],1,.03,s.FRAME),ln(n,[0,.45,0],[0,.95,0],.19,s.HAT2,2,{paint:e=>(Math.atan2(e[2],e[0])*4%1+1)%1<.12?s.LEAF3:Ue(.5,.2)(e),end:s.NOSE}),n.ell([.12,.98,.08],[.14,.1,.12],s.JACKET,{group:3}),ge(n,6,.6,4,33)}},"car-parked":{desc:"a car still parked where it was left, tyres flat, moss on its roof",build(n){Fh(n,1,{flat:!0}),n.ell([-.25,1.22,0],[.55,.05,.4],s.MOSS,{group:4,rough:.02}),ec(n,[0,0,0],[1.9,.14,1],5),Pi(n,[1.4,.05,.8],6),ge(n,14,2.2,7,34)}}},Wx={"picnic-table":{desc:"a picnic table, its planks soft with rot, bracket fungus on its legs",build(n){for(const e of[-.12,0,.12])n.box([0,.6,e*2],[.78,.025,.11],s.WOOD,{round:.012,group:1,paint:ft(7,.3)});for(const e of[-.5,.5])n.box([0,.36,e],[.78,.025,.11],s.WOOD,{round:.012,group:2,paint:ft(7,.3)});for(const e of[-.6,.6])for(const t of[-1,1])n.box([e,.3,t*.22],[.03,.32,.04],s.WOOD,{dir:[0,1,-t*.75],round:.012,group:3,paint:ft()}),n.box([e,.34,0],[.03,.03,.6],s.WOOD,{round:.01,group:3});for(const[e,t,i]of[[-.6,.25,.2],[-.6,.17,.25],[.6,.4,-.15]])n.ell([e+.04,t,i],[.07,.02,.06],s.EAR,{group:4});ge(n,12,1.3,5,35)}},"picnic-blanket":{desc:"a picnic blanket on the ground, its check faded, mushrooms grown up through it, plates and a bottle",build(n){n.box([0,.02,0],[.62,.015,.5],s.CLOTH,{round:.01,rough:.01,group:1,dir:[1,0,.15],paint:e=>de(e,6,3)<.15?s.MOSS:(Math.floor((e[0]+5)*6)+Math.floor((e[2]+5)*6))%2?s.ACCENT:void 0});for(const[e,t]of[[-.3,-.15],[.2,.25]])n.ell([e,.04,t],[.11,.015,.1],s.BELLY,{group:2});n.seg([.3,.08,-.2],[.55,.08,-.32],.06,.03,s.HAT2,{group:3}),Rl(n,[-.05,.02,.05],9,4,2,{k:1.4}),Rl(n,[.4,.02,.2],5,6,3),ge(n,8,1,8,36)}},hamper:{desc:"a wicker hamper, its lid fallen open, ivy through the weave",build(n){n.box([0,.18,0],[.3,.17,.2],s.STRAW,{round:.04,group:1,paint:t=>(Math.floor(t[0]*30)+Math.floor(t[1]*30))%2?s.BARK2:de(t,6,2)<.2?s.MOSS:void 0}),n.box([0,.3,0],[.27,.16,.17],s.BARK2,{round:.03,group:1,cut:!0});const e=Vt(n);n.box([0,0,0],[.3,.02,.2],s.STRAW,{round:.02,group:2,paint:t=>(Math.floor(t[0]*30)+Math.floor(t[2]*30))%2?s.BARK2:void 0}),Yt(n,e,{roll:-1.2,at:[0,.4,-.32]}),n.box([.15,.3,.1],[.12,.02,.08],s.ACCENT,{dir:[1,.5,.5],group:3}),ht(n,[-.3,0,.2],[.1,.32,.2],4,37),ge(n,6,.7,5,38)}},"fungi-glow":{desc:"a clump of tall pale fungi glowing faintly, grown out of a rotted basket",glow:!0,build(n){for(let e=0;e<7;e++){const t=e*2.4,i=.05+Ce(e,5)*.18,r=Math.cos(t)*i,a=Math.sin(t)*i,o=.2+Ce(e,6)*.3;n.seg([r,0,a],[r*1.3,o,a*1.3],.02,.014,s.CLOTH,{group:1+e%2}),n.ell([r*1.3,o+.02,a*1.3],[.07,.035,.07],s.MAGIC,{group:3+e%2,paint:l=>l[1]<o+.01?s.MAGIC2:void 0})}n.ell([0,.05,0],[.28,.06,.24],s.BARK2,{group:6,rough:.02,paint:e=>de(e,9)<.4?s.MOSS:void 0}),ge(n,6,.6,7,39)}},"raised-bed":{desc:"a raised bed bolted to seed: leggy kale gone to flower, a cabbage split",build(n){n.box([0,.14,0],[.8,.14,.4],s.WOOD,{round:.02,group:1,paint:ft(7,.3)}),n.box([0,.26,0],[.76,.12,.36],s.BARK2,{round:.02,group:1,cut:!0}),n.box([0,.2,0],[.75,.02,.35],s.BARK2,{group:2});for(let e=0;e<5;e++){const t=-.6+e*.3,i=(Ce(e,3)-.5)*.3,r=.5+Ce(e)*.4;n.seg([t,.2,i],[t+.04,r,i],.025,.015,s.LEAF2,{group:3}),n.ell([t+.04,r-.1,i],[.16,.1,.14],s.LEAF,{group:4+e%2,rough:.02,paint:a=>de(a,16)<.25?s.LEAF3:void 0});for(let a=0;a<4;a++)n.ell([t+.04+(Ce(e,a)-.5)*.2,r+.02+Ce(a,e)*.08,i+(Ce(a,e+4)-.5)*.15],[.025,.025,.025],s.FLOWER,{group:6})}ge(n,10,1.3,7,40)}},"bean-wigwam":{desc:"a wigwam of bean canes buried in runner-bean vines, red flowers in it",split:1.4,build(n){const e=[0,1.75,0];for(let t=0;t<6;t++){const i=t/6*6.283;Ye(n,[Math.cos(i)*.42,0,Math.sin(i)*.42],E.add(e,[Math.cos(i)*.04,.1,Math.sin(i)*.04]),1,.015,s.STRAW,void 0)}for(let t=0;t<3;t++){const i=[];for(let r=0;r<=12;r++){const a=r/12,o=a*9+t*2.1,l=.42*(1-a*.92);i.push([Math.cos(o)*l,a*1.7,Math.sin(o)*l,.05*(1-a*.6)])}n.chain(i,s.LEAF,{group:2+t,rough:.02,paint:r=>de(r,22,t)<.08?s.ACCENT:de(r,12)<.3?s.LEAF3:void 0})}ge(n,8,.8,6,41)}},"garden-shed":{desc:"a garden shed, its door hanging open, its felt roof furred with moss, a window gone",split:1.6,build(n){n.box([0,.7,0],[.7,.7,.55],s.WOOD,{round:.02,group:1,paint:e=>e[2]>.5&&Math.abs(e[0]+.3)<.22&&Math.abs(e[1]-.95)<.18?s.SHADES:e[2]>.5&&e[0]>.05&&e[0]<.6&&e[1]<1.25?s.NOSE:Math.abs(Math.sin(e[0]*30))>.96||Math.abs(Math.sin(e[2]*30))>.96?s.BARK2:de(e,6,4)<.12?s.MOSS:void 0});for(const e of[-1,1])n.box([0,1.58,e*.32],[.78,.03,.38],s.JACKET,{dir:[1,0,0],up:[0,1,e*.9],round:.01,group:2+(e>0?1:0),paint:t=>de(t,5,2)<.6?s.MOSS:de(t,12)<.2?s.LEAF2:void 0});n.box([.62,.62,.78],[.25,.58,.02],s.WOOD,{dir:[1,0,.9],round:.01,group:4,paint:ft(7,.2)}),ht(n,[-.7,0,.55],[-.55,1.5,.5],5,42),ht(n,[.7,0,-.3],[.68,1.3,.2],6,43),Pi(n,[-.9,.05,.6],7),ge(n,12,1.4,8,44)}},"compost-heap":{desc:"a slatted compost bay, a marrow vine sprawling out of it, its fruit swollen",build(n){for(const e of[-1,1])n.box([e*.5,.32,0],[.03,.32,.45],s.WOOD,{round:.01,group:1,paint:t=>t[1]*9%1<.2?s.NOSE:ft(7,.3)(t)});n.box([0,.32,-.45],[.5,.32,.03],s.WOOD,{round:.01,group:1,paint:e=>e[1]*9%1<.2?s.NOSE:ft(7,.3)(e)}),n.ell([0,.35,0],[.48,.3,.44],s.BARK2,{group:2,rough:.03,paint:e=>de(e,12)<.25?s.LEAF3:de(e,9,3)<.15?s.STRAW:void 0}),n.chain([[0,.6,0,.03],[.4,.5,.4,.03],[.8,.1,.5,.025],[1.2,.05,.2,.02]],s.LEAF2,{group:3});for(const[e,t,i]of[[.85,.45,.14],[1.15,.1,.11]])n.ell([e,i*.9,t],[i*1.4,i,i],s.POM,{group:4,dir:[1,0,.4],paint:r=>(Math.atan2(r[2]-t,r[1]-i)*3%1+1)%1<.15?s.BODY2:void 0});for(let e=0;e<4;e++)n.ell([.3+e*.25,.15,.45-e*.08],[.14,.03,.12],s.LEAF,{group:5+e%2});ge(n,8,1.2,7,45)}},"watering-can":{desc:"a watering can on its side, its rose gone",build(n){const e=Vt(n);ln(n,[0,0,0],[0,.32,0],.14,s.HAT2,1,{paint:Ue(.3,.2)}),Ye(n,[.1,.1,0],[.38,.36,0],2,.025,s.HAT2,Ue(.3,0)),Ye(n,[-.12,.3,0],[-.05,.4,0],3,.015,s.HAT2),Yt(n,e,{roll:1.5,yaw:.4,at:[0,.14,0]}),ge(n,5,.5,4,46)}},"snack-van":{desc:"a roadside snack trailer, its hatch propped open on nothing, shutters rusted down (no signs)",split:1.6,build(n){n.box([0,.95,0],[1,.6,.6],s.BELLY,{round:.1,group:1,paint:e=>e[2]>.55&&Math.abs(e[0]-.05)<.6&&Math.abs(e[1]-1.05)<.25?e[1]*18%1<.3?s.STONED:s.FRAME:Ue(.15,.08)(e)}),n.box([.05,1.42,.7],[.62,.02,.18],s.BELLY,{dir:[1,0,0],up:[0,1,-.6],round:.01,group:2,paint:Ue(.4,.3)}),Ye(n,[-.5,1.3,.62],[-.5,1.5,.8],2,.012),n.box([.05,.82,.66],[.6,.025,.08],s.FRAME,{round:.01,group:3,paint:Ue(.4,.2)});for(const e of[-.6,.6])Gr(n,[0,.28,e],.28,.09,4,!0);Ye(n,[1,.45,0],[1.6,.38,0],5,.035),Ye(n,[1.55,.4,0],[1.55,0,0],5,.03),ht(n,[-1,0,.6],[-.7,1.4,.62],6,47),ge(n,12,1.8,7,48)}},"tent-frame":{desc:"a dome tent's bent poles, a few rags of its fabric still caught on them",build(n){for(const e of[.6,-.6]){const t=[];for(let i=0;i<=10;i++){const r=i/10*Math.PI,a=.85;t.push([Math.cos(r)*a*Math.cos(e),Math.sin(r)*.95+(i===6?-.08:0),Math.cos(r)*a*Math.sin(e),.02])}n.chain(t,s.FRAME,{group:1})}for(const[e,t,i,r,a,o]of[[[-.4,.6,.3],[1,.3,0],[.4,-1,.3],.28,.25,s.HAT1],[[.35,.75,-.3],[1,-.2,0],[0,-.6,-1],.3,.22,s.ACCENT],[[.05,.9,0],[1,0,0],[0,.2,1],.2,.25,s.HAT1]])n.flat(e,t,i,r,a,(l,c)=>c<-1+.4*Math.abs(Math.sin(l*7))+.3*Ce(Math.floor(l*5))?null:o,{group:2,bend:.2});for(const[e,t]of[[-.85,.2],[.85,-.2]])Ye(n,[e,.02,t],[e*1.4,0,t*1.6],3,.006,s.CLOTH,void 0);ge(n,12,1.3,4,49)}},bunting:{desc:"a string of faded bunting sagging between two poles, one pole leaning",split:1.4,build(n){Ye(n,[-1.3,0,0],[-1.3,2,0],1,.03,s.WOOD,ft()),Ye(n,[1.3,0,0],[1.05,1.75,.15],1,.03,s.WOOD,ft());const e=r=>[-1.3+r*2.35,1.95-Math.sin(r*Math.PI)*.55-r*.2,r*.15],t=[s.ACCENT,s.HAT1,s.POM,s.HAT2,s.TOP],i=[];for(let r=0;r<=12;r++)i.push([...e(r/12),.01]);n.chain(i,s.CLOTH,{group:2});for(let r=1;r<12;r++){if(Ce(r,7)<.2)continue;const a=e(r/12);n.flat(E.add(a,[0,-.11,0]),[1,0,.1],[0,1,0],.08,.11,(o,l)=>Math.abs(o)<(l+1)/2?t[r%5]:null,{group:3,bend:.1})}ge(n,10,1.6,4,50)}},"fire-pit":{desc:"a cold fire pit: a ring of stones, charred logs, grey ash",build(n){for(let e=0;e<9;e++){const t=e/9*6.283;n.ell([Math.cos(t)*.5,.08,Math.sin(t)*.42],[.12,.09+Ce(e)*.04,.1],s.STONE,{group:1+e%3,rough:.02,paint:i=>de(i,9,e)<.25?s.MOSS:i[1]>.1&&de(i,14)<.3?s.STONED:void 0})}n.ell([0,.02,0],[.38,.025,.32],s.STONED,{group:5,paint:e=>de(e,18)<.3?s.CLOTH:void 0});for(const[e,t]of[[[-.25,.05,-.1],[.25,.12,.08]],[[-.1,.05,.2],[.2,.1,-.18]]])n.seg(e,t,.05,.04,s.BARKD,{group:6,paint:i=>de(i,20)<.4?s.NOSE:void 0});ge(n,8,1,7,51)}},crates:{desc:"a stack of slatted crates, one fallen and split",build(n){const e=(i,r)=>n.box(i,[.25,.18,.2],s.WOOD,{round:.015,group:r,paint:a=>(a[1]-i[1]+1)*9%1<.22&&Math.abs(a[1]-i[1])<.15?s.NOSE:ft(7,.25)(a)});e([0,.18,0],1),e([.5,.18,.1],2),e([.2,.54,.02],3);const t=Vt(n);e([0,0,0],4),Yt(n,t,{roll:.9,yaw:.5,at:[-.5,.2,.35]}),ge(n,8,1,6,52)}},"glow-sticks":{desc:"glow sticks scattered in the grass, somehow still glowing",glow:!0,build(n){for(let e=0;e<7;e++){const t=(Ce(e)-.5)*1,i=(Ce(e,2)-.5)*.7,r=Ce(e,3)*6.283;n.seg([t,.02,i],[t+Math.cos(r)*.12,.03,i+Math.sin(r)*.12],.014,.014,e%3?s.MAGIC:s.COLLAR,{group:1+e})}Ye(n,[.2,.25,-.1],[.2,.02,-.1],9,.012,s.MAGIC2,void 0),ge(n,10,.8,10,53)}},"camp-chair":{desc:"a folding camp chair tipped over, its fabric sagging",build(n){const e=Vt(n);for(const t of[-1,1])Ye(n,[-.2,0,t*.22],[.2,.45,t*.22],1,.015),Ye(n,[.2,0,t*.22],[-.2,.45,t*.22],1,.015),Ye(n,[-.22,.45,t*.22],[-.3,.85,t*.22],1,.015);n.box([0,.42,0],[.22,.02,.22],s.HAT1,{round:.01,group:2,paint:Ue(0,.2)}),n.box([-.27,.65,0],[.02,.2,.22],s.HAT1,{dir:[0,1,0],up:[1,.2,0],round:.01,group:2}),Yt(n,e,{roll:1.4,yaw:.3,at:[0,.22,0]}),ge(n,6,.7,4,54)}},"log-pile":{desc:"a woodpile of cut logs, ends to the viewer, moss on the top ones",build(n){let e=1;for(let t=0;t<3;t++)for(let i=0;i<4-t;i++){const r=(i-(3-t)/2)*.38,a=.17+t*.3;xu(n,[r,a,-.5],[r,a,.5],.17+Ce(i,t)*.02,e++)}ge(n,10,1.3,20,55)}},"chopping-block":{desc:"a chopping block with an axe left in it, chips in the grass",build(n){ln(n,[0,0,0],[0,.45,0],.26,s.TRUNK,1,{paint:e=>de(e,14,2)<.15?s.BARKD:de(e,5,3)<.15?s.MOSS:void 0,end:Tl([0,.45,0],1)}),Ye(n,[.02,.45,.05],[-.35,.95,.2],2,.025,s.WOOD,void 0),n.box([.04,.47,.04],[.1,.06,.02],s.FRAME,{dir:[1,-.5,0],up:[0,1,0],round:.01,group:3,paint:Ue(.5,0)});for(let e=0;e<8;e++)n.box([(Ce(e)-.5)*1,.015,(Ce(e,2)-.5)*.8],[.05,.012,.025],s.STRAW,{dir:[Ce(e,3)-.5,0,Ce(e,4)-.5],group:4+e%2});ge(n,8,.9,6,56)}},sawhorse:{desc:"a sawhorse with a log still across it, a bow saw hung on it",build(n){for(const e of[-.4,.4])for(const t of[-1,1])Ye(n,[e,0,t*.3],[e,.62,-t*.1],1,.03,s.WOOD,ft());Ye(n,[-.4,.3,0],[.4,.3,0],1,.025,s.WOOD,ft()),xu(n,[-.8,.7,0],[.7,.72,0],.14,2),Ye(n,[-.25,.55,.22],[.25,.55,.22],3,.01,s.FRAME,void 0),n.chain([[-.25,.55,.22,.015],[-.2,.35,.22,.015],[.2,.35,.22,.015],[.25,.55,.22,.015]],s.ACCENT,{group:3,paint:Ue(.5,0)}),ge(n,8,1,5,57)}},stumps:{desc:"two sawn stumps, bracket fungus on one",build(n){for(const[e,t,i,r,a]of[[-.3,-.1,.3,.32,1],[.45,.25,.22,.22,3]]){ln(n,[e,0,t],[e,r,t],i,s.TRUNK,a,{paint:o=>de(o,14,2)<.15?s.BARKD:de(o,5,3)<.2?s.MOSS:void 0,end:Tl([e,r,t],1)});for(let o=0;o<4;o++){const l=o*1.6;n.ell([e+Math.cos(l)*(i+.1),.05,t+Math.sin(l)*(i+.1)],[.12,.06,.1],s.TRUNK,{group:a+1,dir:[Math.cos(l),-.3,Math.sin(l)]})}}for(const e of[.12,.2])n.ell([-.05,e,.12],[.1,.02,.08],s.EAR,{group:5});ge(n,8,1,6,58)}},mattress:{desc:"a mattress dumped in the bracken, stained and sprung, a fern through it",build(n){const e=Vt(n);n.box([0,0,0],[.75,.1,.5],s.BELLY,{round:.07,group:1,rough:.01,paint:t=>de(t,4,2)<.3?s.STRAW:de(t,6,3)<.15?s.MOSS:Math.abs(Math.sin(t[0]*20))>.93?s.CLOTH:void 0}),Yt(n,e,{roll:.2,pitch:.1,at:[0,.15,0]});for(let t=0;t<3;t++)n.chain([[-.3+t*.25,.26,.1,.012],[-.28+t*.25,.34,.12,.012],[-.3+t*.25,.38,.1,.01]],s.FRAME,{group:3});Pi(n,[.4,.2,.1],4,.8),ge(n,10,1.2,5,59)}},"tyre-pile":{desc:"a pile of old tyres, one rolled away, rainwater and moss in them",build(n){for(let t=0;t<4;t++)Do(n,[(Ce(t)-.5)*.06,.1+t*.2,(Ce(t,2)-.5)*.06],1+t);Do(n,[.65,.1,.3],6);const e=Vt(n);Do(n,[0,0,0],8),Yt(n,e,{roll:1.4,yaw:.9,at:[-.6,.3,.35]}),ge(n,10,1.1,10,60)}},beehive:{desc:"a white-painted beehive, its boxes askew, its roof slid off, comb in the grass",build(n){n.box([0,.15,0],[.3,.15,.3],s.WOOD,{round:.01,group:1});for(const[t,i,r]of[[.45,0,2],[.75,.04,3],[1.02,-.05,4]])n.box([i,t,0],[.3,.13,.3],s.BELLY,{dir:[1,0,i*3],round:.015,group:r,paint:a=>Math.abs(a[1]-t+.1)<.015&&a[2]>.28&&Math.abs(a[0]-i)<.15?s.NOSE:de(a,6,r)<.18?s.MOSS:de(a,15)>.9?s.STONED:void 0});const e=Vt(n);n.box([0,0,0],[.36,.05,.36],s.FRAME,{round:.02,group:5,paint:Ue(.4,.3)}),Yt(n,e,{roll:.5,yaw:.3,at:[.5,.2,.35]}),n.box([-.5,.04,.3],[.18,.025,.1],s.STRAW,{group:6,dir:[1,0,.5],paint:t=>de(t,30)<.5?s.BODY2:void 0}),ge(n,10,1,7,61)}}},Vx=[...Object.entries(Bh).map(([n,e])=>({id:n,family:"farm",size:1,split:null,...e})),...Object.entries(Gx).map(([n,e])=>({id:n,family:"street",size:1,split:null,...e})),...Object.entries(Wx).map(([n,e])=>({id:n,family:"scene",size:1,split:null,...e}))];Object.fromEntries(Vx.map(n=>[n.id,n]));const en=(n=4,e=.14)=>t=>{const i=de(t,8,7);return i<e&&de(t,3,1)<.6?s.MOSS:n&&(t[1]*n%1<.08||((t[0]+t[2])*n*.6+Math.floor(t[1]*n)*.5)%1<.05)||i>.94?s.STONED:void 0},nt=(n,e,t,i,r={})=>n.box(e,t,r.mat??s.STONE,{round:.025,rough:.01,group:i,paint:en(r.courses??4,r.moss??.14),...r}),ui=(n,e,t,i,r,a,o=s.STONE)=>{for(let l=0;l<t;l++){const c=Ce(a,l)*6.283,u=i*Math.sqrt(Ce(l,a)),h=.08+Ce(l,a+2)*.12;n.box([e[0]+Math.cos(c)*u,h*.7,e[2]+Math.sin(c)*u*.8],[h*1.3,h*.7,h],o,{dir:[Math.cos(c*3),(Ce(l,3)-.5)*.5,Math.sin(c*3)],round:.02,rough:.008,group:r+l%3,paint:en(0,.3)})}},Mn=(n,e,t,i,r,a,{pointed:o=!1,mat:l=s.STONED}={})=>{n.box(e,r===0?[.6,i,t]:[t,i,.6],l,{group:a,cut:!0,round:.005}),n.ell(E.add(e,[0,i,0]),r===0?[.6,o?t*1.8:t,t]:[t,o?t*1.8:t,.6],l,{group:a,cut:!0})},gr=(n,e=6,t=0,i=0)=>(r,a)=>{const o=(1-a)/2;return Math.abs(r)>o||t&&Ce(Math.floor((r+1)*4),Math.floor((a+1)*4)+i)<t&&a>-.6?null:e&&(a+1)*e%1<.1?s.STONED:n},ds=(n,e,t,i,r,a={})=>{n.ell(e,[t,t*(a.tall??1),t],r,{group:i,paint:a.paint??en(0,.35)}),n.ell(e,[t*.88,t*(a.tall??1)*.88,t*.88],s.STONED,{group:i,cut:!0}),n.box(E.add(e,[0,-t,0]),[t*1.1,t,t*1.1],s.STONED,{group:i,cut:!0}),a.crack&&n.box(E.add(e,a.crack[0]),a.crack[1],s.STONED,{group:i,cut:!0,dir:a.crack[2],round:.02})},Is=(n,e,t,i,r,{capital:a=!0,mat:o=s.BELLY}={})=>{n.box(E.add(e,[0,.06,0]),[i*1.35,.06,i*1.35],o,{round:.015,group:r,paint:en(0,.3)}),n.seg(E.add(e,[0,.1,0]),E.add(e,[0,t,0]),i,i*.85,o,{group:r,paint:l=>Math.abs(Math.sin(Math.atan2(l[2]-e[2],l[0]-e[0])*9))>.9?s.STONED:en(0,.2)(l)}),a&&n.box(E.add(e,[0,t+.06,0]),[i*1.4,.07,i*1.4],o,{round:.02,group:r,paint:en(0,.4)})},Yx=(n,e,t,i=1)=>{for(let r=0;r<4;r++){const a=r*1.6;n.chain([[e[0]+Math.cos(a)*.2*i,0,e[2]+Math.sin(a)*.2*i,.2*i],[e[0]+Math.cos(a)*.1*i,1*i,e[2]+Math.sin(a)*.1*i,.14*i],[e[0]+Math.cos(a)*.4*i,1.8*i,e[2]+Math.sin(a)*.35*i,.08*i]],s.BARK2,{group:t,rough:.015,paint:o=>de(o,12)<.2?s.BARKD:void 0})}for(const[r,a,o,l]of[[0,2.3,0,1.1],[-.6,1.8,.3,.7],[.7,1.9,-.2,.75],[.1,3,.1,.7],[.5,1.5,.6,.6]])n.ell([e[0]+r*i,a*i,e[2]+o*i],[l*i,l*.8*i,l*i],s.LEAF3,{group:t+1,rough:.05,paint:c=>de(c,9,2)<.2?s.LEAF:de(c,15,3)<.006?s.ACCENT:void 0})},wa=(n,e,t,i,r,a,o,l,c=.25)=>{for(let u=e+.12,h=0;u<t;u+=.36,h++)Ce(l,h)>c&&nt(n,[u,i+.12,r],[.11,.12,a],o,{courses:0})},Oo=(n,{lean:e=0,sunk:t=0,yaw:i=0,seed:r=0}={})=>{const a=Vt(n),o=l=>Math.abs(l[0])<.18&&l[2]>.04&&(l[1]-.1)*14%1<.18&&l[1]>.25&&l[1]<.6?s.STONED:en(0,.25)(l);n.box([0,.35,0],[.26,.35,.055],s.STONE,{round:.02,rough:.006,group:1,paint:o}),n.ell([0,.7,0],[.26,.13,.055],s.STONE,{group:1,paint:o}),Yt(n,a,{roll:e,yaw:i,at:[0,-t,0]}),ge(n,5,.45,3,70+r)},Xx={headstone:{desc:"a headstone, its carving worn smooth, lichen on its shoulders",build(n){Oo(n,{lean:.08})}},"headstone-lean":{desc:"a headstone leaning hard back into the grass",build(n){Oo(n,{lean:-.38,yaw:.2,seed:1})}},"headstone-sunk":{desc:"a headstone sunk to its shoulders and tipped, ivy over it",build(n){Oo(n,{lean:.3,sunk:.25,yaw:-.3,seed:2}),ht(n,[-.3,0,.1],[.15,.4,.1],5,71)}},"grave-cross":{desc:"a plain stone cross on a stepped base, lichen-covered",build(n){nt(n,[0,.08,0],[.3,.08,.2],1,{courses:0}),nt(n,[0,.2,0],[.2,.05,.13],1,{courses:0});const e=Vt(n);n.box([0,.7,0],[.06,.45,.06],s.STONE,{round:.015,group:2,paint:en(0,.3)}),n.box([0,.92,0],[.24,.06,.06],s.STONE,{round:.015,group:2,paint:en(0,.3)}),Yt(n,e,{roll:.12,at:[0,0,0]}),ge(n,6,.5,3,72)}},obelisk:{desc:"a tall memorial obelisk on a plinth, cracked, moss up one side",build(n){nt(n,[0,.15,0],[.32,.15,.32],1,{courses:0}),nt(n,[0,.42,0],[.22,.12,.22],1,{courses:0}),n.seg([0,.54,0],[0,1.9,0],.15,.08,s.STONE,{group:2,paint:e=>e[0]<-.05&&de(e,6)<.5?s.MOSS:Math.abs(e[0]*3-e[1]+1.2)<.02?s.STONED:void 0}),n.ell([0,1.92,0],[.07,.1,.07],s.STONE,{group:2}),ge(n,8,.7,3,73)}},"stone-angel":{desc:"a stone angel on a plinth, head bowed, hands folded, wings mossed over",split:1.6,build(n){nt(n,[0,.3,0],[.38,.3,.32],1,{courses:2}),n.seg([0,.6,0],[0,1.55,0],.3,.15,s.BELLY,{group:2,rough:.006,paint:e=>Math.abs(Math.sin(Math.atan2(e[2],e[0])*7+e[1]*2))>.93?s.STONED:de(e,7,3)<.12?s.MOSS:void 0}),n.ell([0,1.55,0],[.17,.14,.13],s.BELLY,{group:2}),n.ell([.04,1.78,.03],[.1,.12,.1],s.BELLY,{group:3,paint:e=>e[1]>1.84&&de(e,20)<.4?s.STONED:void 0}),n.ell([.03,1.5,.15],[.07,.1,.06],s.BELLY,{group:4});for(const e of[-1,1])n.flat([-.18,1.55,e*.2],[-.25,.97,e*.3],[-1,-.1,-e*.1],.55,.3,(t,i)=>{const r=xr.wing(s.BELLY,s.STONE)(t,i);return r&&Ce(Math.floor(t*8),Math.floor(i*5)+e)<.25?s.MOSS:r},{group:5+(e>0?1:0),bend:.2});ht(n,[-.38,0,.3],[-.3,.7,.3],7,74),ge(n,10,1,8,75)}},mausoleum:{desc:"a family mausoleum: columns, a pediment, its iron door rusted half open, ivy over its roof",split:2,build(n){nt(n,[0,.1,0],[1.25,.1,1],1,{courses:0}),nt(n,[0,.25,.1],[1.15,.06,.95],1,{courses:0}),nt(n,[0,1,-.15],[.95,.7,.7],2,{courses:5});for(const e of[-.75,-.25,.25,.75])Is(n,[e,.31,.78],1.2,.09,3,{mat:s.STONE});nt(n,[0,1.65,.12],[1,.1,.9],4,{courses:0}),n.flat([0,2.03,.97],[1,0,0],[0,1,0],1,.3,gr(s.STONE,3),{group:5,bend:.02});for(const e of[-1,1])n.box([0,1.95,.1+e*.48],[1.02,.03,.52],s.STONE,{dir:[1,0,0],up:[0,1,e*.55],round:.01,group:6+(e>0?1:0),paint:t=>de(t,4,e+3)<.55?s.LEAF:en(0,.3)(t)});n.box([0,.85,.56],[.3,.55,.03],s.NOSE,{group:8}),n.box([.32,.85,.72],[.02,.5,.27],s.JACKET,{dir:[.5,0,1],round:.01,group:9,paint:e=>e[1]*10%1<.15?s.BODY2:Ue(.5,.1)(e)}),ht(n,[-.95,.3,.55],[-.8,1.9,.6],10,76),ht(n,[.95,.3,-.2],[.6,2,.2],11,77),ge(n,12,1.6,12,78)}},"iron-railing":{desc:"a run of spear-topped iron railing round an old plot, bent at one end",build(n){for(const e of[.15,.75])Ye(n,[-1,e,0],[1,e,0],1,.018,s.JACKET);for(let e=0;e<=12;e++){const t=-1+e/12*2,i=t>.55?(t-.55)*.9:0;Ye(n,[t,0,0],[t+i*.3,.95-i*.3,i],2,.014,s.JACKET),n.seg([t+i*.3,.95-i*.3,i],[t+i*.35,1.02-i*.3,i*1.05],.03,.002,s.JACKET,{group:3})}ht(n,[-.9,0,.05],[-.3,.8,.05],4,79),ge(n,10,1.1,5,80)}},lychgate:{desc:"a lychgate: a little roofed gateway of oak, its shingles mossed, one gate leaf open",split:1.8,build(n){for(const t of[-.75,.75])for(const i of[-.55,.55])n.box([t,.85,i],[.07,.85,.07],s.WOOD,{round:.02,group:1,paint:ft(7,.3)});for(const t of[-.55,.55])n.box([0,1.72,t],[.9,.06,.06],s.WOOD,{round:.02,group:2,paint:ft()});for(const t of[-1,1])n.box([0,2.05,t*.42],[1.05,.04,.5],s.BARK2,{dir:[1,0,0],up:[0,1,t*.9],round:.015,group:3+(t>0?1:0),paint:i=>de(i,5,t+4)<.5?s.MOSS:(i[0]+3)*8%1<.12?s.BARKD:void 0});for(const t of[-1.05,1.05])n.flat([t*.97,2,0],[0,0,1],[0,1,0],.6,.35,gr(s.WOOD,0),{group:5,bend:.02});const e=Vt(n);for(let t=0;t<4;t++)n.box([.32,.25+t*.22,0],[.32,.025,.02],s.WOOD,{round:.01,group:6,paint:ft()});for(const t of[.02,.62])n.box([t,.55,0],[.03,.38,.02],s.WOOD,{round:.01,group:6});Yt(n,e,{yaw:-1,at:[-.68,0,0]});for(const t of[-.75,.75])nt(n,[t*.5+(t>0?.2:0),.2,.62],[.1,.2,.1],7,{courses:0});ge(n,12,1.4,8,81)}},yew:{desc:"an old churchyard yew, its red trunk fluted and split, its crown nearly black",split:1.3,build(n){Yx(n,[0,0,0],1,1.1),ge(n,8,1.2,4,82)}},"grave-lantern":{desc:"a little lantern on a grave, its candle somehow still flickering",glow:!0,build(n){nt(n,[0,.06,0],[.2,.06,.14],1,{courses:0});for(const[e,t]of[[-.07,-.07],[.07,-.07],[-.07,.07],[.07,.07]])Ye(n,[e,.12,t],[e,.4,t],2,.008,s.JACKET);n.seg([0,.4,0],[0,.5,0],.1,.02,s.JACKET,{group:2}),n.seg([0,.13,0],[0,.2,0],.025,.025,s.BELLY,{group:3}),n.ell([0,.23,0],[.015,.035,.015],s.GLOW,{group:4}),Uh(n,[0,.24,0],.05,5,s.MAGIC2),ge(n,5,.4,6,83)}}},Kx={"carpark-tarmac":{desc:"a car park's cracked tarmac, its bay lines faded, grass and saplings up through the cracks",decal:!0,build(n){n.box([0,.015,0],[5.6,.015,3.6],s.JACKET,{round:.01,group:1,paint:i=>{const r=i[0],a=i[2],o=Math.abs(Math.sin(r*1.1+1)*.9+Math.sin(r*3.7)*.15-a*.5)<.025||Math.abs(Math.sin(a*1.4)*.7-r*.4+1.5)<.025;return de(i,2.2,4)<.08||o?de(i,16)<.5?s.LEAF2:s.NOSE:de(i,1.4,8)<.06?de(i,10)<.5?s.MOSS:s.LEAF2:Math.abs(a)>1&&Math.abs(a)<3.3&&Math.abs((r+30)%1.25-.625)>.6||Math.abs(Math.abs(a)-1)<.04&&Math.abs(r)<5.2?de(i,9,2)<.35?s.JACKET:s.CLOTH:de(i,20,1)>.93?s.NOSE:de(i,20,2)>.95?s.STONED:void 0}});for(let i=0;i<12;i++){const r=(Ce(i,40)-.5)*2*5.6*.9,a=(Ce(40,i)-.5)*2*3.6*.9;n.ell([r,.06,a],[.09,.06+Ce(i)*.05,.09],s.LEAF2,{group:2+i%3,paint:o=>o[1]>.08?s.LEAF:void 0})}}},"ticket-machine":{desc:"a pay-and-display machine on its plinth, its screen dark and blank, a fern at its foot",build(n){nt(n,[0,.06,0],[.25,.06,.2],1,{courses:0}),n.box([0,.7,0],[.2,.58,.15],s.FRAME,{round:.04,group:2,paint:e=>e[2]>.12&&Math.abs(e[0])<.12&&Math.abs(e[1]-1)<.08?s.SHADES:e[2]>.12&&Math.abs(e[0]-.08)<.03&&Math.abs(e[1]-.8)<.05?s.NOSE:Ue(.35,.15)(e)}),n.box([0,1.3,-.02],[.24,.04,.19],s.FRAME,{round:.02,group:3,paint:Ue(.4,.4)}),Pi(n,[-.2,.05,.25],4,.7),ge(n,6,.6,5,84)}},barrier:{desc:"a car park barrier, its striped arm snapped and drooping to the ground",build(n){n.box([0,.55,0],[.16,.55,.16],s.BELLY,{round:.04,group:1,paint:Ue(.3,.2)});const e=t=>Math.floor((t[0]+t[1]+9)*3)%2?s.ACCENT:de(t,12)<.15?s.BODY2:s.BELLY;n.seg([.15,1,0],[1.4,1.02,0],.045,.04,s.BELLY,{group:2,paint:e}),n.seg([1.45,.98,.02],[2.4,.05,.1],.04,.035,s.BELLY,{group:3,paint:e}),n.box([-.35,1,0],[.18,.08,.08],s.FRAME,{round:.03,group:4,paint:Ue(.5,0)}),ge(n,10,1.4,5,85)}},"car-bonnet-up":{desc:"a car left with its bonnet up, a bramble growing out of the engine",build(n){Fh(n,1,{flat:!0});const e=Vt(n);n.box([0,0,0],[.48,.03,.62],s.BODY,{round:.03,group:4,paint:Ue(.4,.2)}),Yt(n,e,{pitch:1,at:[1.05,1.18,0]});for(let t=0;t<6;t++)n.chain([[1,.7,(t-2.5)*.15,.03],[1.2+Ce(t)*.4,1.1+Ce(t,2)*.4,(t-2.5)*.22,.025],[1.5+Ce(t,3)*.5,.4+Ce(t,4)*.5,(t-2.5)*.3,.015]],s.LEAF2,{group:5+t%2,paint:i=>de(i,25)<.2?s.LEAF3:void 0});ec(n,[0,0,0],[1.9,.14,1],7),ge(n,12,2,8,86)}}},qx={"crushed-cars":{desc:"crushed cars stacked four high, their colours faded under rust, moss on the top one",split:1.6,build(n){[[s.BODY,0,.03],[s.HAT1,.06,-.04],[s.HAT2,-.05,.05],[s.BELLY,.1,-.02]].forEach(([e,t,i],r)=>n.box([t,.2+r*.38,0],[.95,.18,.48],e,{dir:[1,(Ce(r)-.5)*.06,i],round:.05,rough:.025,group:1+r,paint:a=>{const o=Ue(.55,r===3?.4:.05)(a);return o||(Math.abs(a[1]-.2-r*.38)<.05&&Math.abs(a[0])<.5?s.SHADES:de(a,9,r)<.1?s.BODY3:void 0)}})),ge(n,10,1.4,6,87)}},"oil-drums":{desc:"oil drums, rust-eaten, one tipped and spilling dark into the grass",build(n){[[0,-.2,s.HAT1],[.42,-.05,s.BODY],[-.1,.25,s.HAT2]].forEach(([t,i,r],a)=>ln(n,[t,0,i],[t,.58,i],.19,r,1+a,{paint:o=>Math.abs(o[1]-.2)<.02||Math.abs(o[1]-.4)<.02?s.BODY3:Ue(.6,.15)(o),end:s.BODY3}));const e=Vt(n);ln(n,[0,0,0],[0,.58,0],.19,s.POM,5,{paint:Ue(.6,.1),end:s.BODY3}),Yt(n,e,{roll:1.55,yaw:.7,at:[-.6,.19,-.1]}),n.ell([-.5,.01,.45],[.35,.01,.25],s.NOSE,{group:7}),ge(n,8,1.1,8,88)}},"grab-crane":{desc:"a scrap yard's grab crane on its tracks, its arm still raised, the grab hanging open over nothing",split:2.4,build(n){for(const r of[-.5,.5])n.box([0,.2,r],[.9,.2,.18],s.BODY3,{round:.12,group:1,paint:a=>(a[0]+5)*8%1<.25?s.NOSE:de(a,6,2)<.15?s.MOSS:void 0});n.box([0,.55,0],[.65,.15,.55],s.POM,{round:.05,group:2,paint:Ue(.6,.2)}),n.box([-.15,1.05,.1],[.38,.38,.3],s.POM,{round:.05,group:3,paint:r=>r[2]>.35&&r[1]>1.05||r[0]>.2&&r[1]>1.05?s.SHADES:Ue(.6,.2)(r)}),n.box([-.6,.85,-.1],[.3,.25,.4],s.POM,{round:.04,group:4,paint:Ue(.6,.2)});const e=[.3,.8,-.15],t=[2,3.9,-.15],i=[3,3.5,-.15];for(const r of[-.08,.08])Ye(n,E.add(e,[0,0,r]),E.add(t,[0,0,r]),5,.05,s.POM,Ue(.6,.05)),Ye(n,E.add(t,[0,0,r]),E.add(i,[0,0,r]),6,.04,s.POM,Ue(.6,.05));for(let r=1;r<8;r++)Ye(n,E.lerp(e,t,r/8),E.lerp(e,t,(r+.5)/8),5,.02,s.POM,Ue(.6,0));Ye(n,[.3,.9,-.15],[1.2,2.4,-.15],7,.045,s.FRAME,Ue(.3,0)),Ye(n,i,[3,2,-.15],8,.012,s.JACKET);for(let r=0;r<4;r++){const a=r/4*6.283;n.chain([[3,2,-.15,.04],[3+Math.cos(a)*.3,1.75,-.15+Math.sin(a)*.3,.035],[3+Math.cos(a)*.22,1.45,-.15+Math.sin(a)*.22,.02]],s.FRAME,{group:9,paint:Ue(.6,0)})}ht(n,[.3,.6,.3],[1,2,-.07],10,89),ge(n,14,2,11,90)}},shack:{desc:"a corrugated iron shack, its roof sagging, its door off, a stovepipe leaning",split:1.8,build(n){const e=t=>{const i=Ue(.3,.06)(t);return i||(Math.abs(Math.sin((t[0]+t[2])*40))>.8?s.STONED:void 0)};n.box([0,.8,0],[1,.8,.7],s.FRAME,{round:.02,group:1,paint:t=>t[2]>.65&&Math.abs(t[0]-.45)<.25&&t[1]<1.3?s.NOSE:t[2]>.65&&Math.abs(t[0]+.45)<.2&&Math.abs(t[1]-1)<.18?s.SHADES:e(t)}),n.box([0,1.72,0],[1.15,.03,.85],s.FRAME,{dir:[1,0,0],up:[.1,1,.25],round:.01,group:2,paint:t=>de(t,5,4)<.4?s.MOSS:e(t)}),n.box([.95,.45,.9],[.02,.45,.26],s.FRAME,{dir:[0,0,1],up:[.5,1,0],round:.01,group:3,paint:e}),Ye(n,[-.7,1.6,-.3],[-.8,2.5,-.35],4,.05,s.BODY3),ht(n,[-1,0,.7],[-.8,1.6,.7],5,91),ge(n,14,1.8,6,92)}}},Zx={"stave-church":{desc:"a wooden stave church: tiers of steep shingled roofs, carved finials, tarred plank walls; its nave roof fallen in and open to the sky, its spire still standing",halves:1,split:2.4,build(n){const e=t=>de(t,5,6)<.15&&t[1]<1.2?s.MOSS:Math.abs(Math.sin(t[0]*22+t[2]*22))>.9?s.NOSE:de(t,14)>.9?s.WOOD:void 0;nt(n,[0,.08,0],[1.9,.08,1.3],1,{courses:0,moss:.4});for(const t of[-1.1,1.1])n.box([0,t>0?.7:1,t],[1.6,t>0?.55:.85,.07],s.BARKD,{round:.02,group:2+(t>0?1:0),paint:e});for(const t of[-1.6,1.6])n.box([t,1,0],[.07,.85,1.1],s.BARKD,{round:.02,group:4,paint:e});n.box([1.6,.55,.1],[.3,.5,.25],s.NOSE,{group:4,cut:!0}),n.box([0,2.12,-.62],[1.7,.04,.7],s.BARKD,{dir:[1,0,0],up:[0,1,-.95],round:.01,group:5,paint:t=>Ce(Math.floor((t[0]+3)*2.5),9)<.35?s.MOSS:(t[0]+3)*10%1<.15?s.NOSE:void 0});for(let t=0;t<5;t++){const i=-1.4+t*.7;Ye(n,[i,1.85,1.1],[i,2.6,0],6,.035,s.BARKD,void 0)}n.box([0,2.6,0],[1.8,.04,.04],s.BARKD,{round:.02,group:6});for(const t of[-1.6,1.6])n.flat([t,2.18,0],[0,0,1],[0,1,0],1.15,.45,gr(s.BARKD,0,.2,t>0?1:2),{group:7,bend:.02});for(const t of[-1.75,1.75])n.chain([[t,2.6,0,.04],[t*1.08,2.95,0,.03],[t*1.04,3.15,0,.02]],s.BARKD,{group:8});n.box([0,2.95,0],[.55,.35,.55],s.BARKD,{round:.02,group:9,paint:e});for(const t of[-1,1])n.box([0,3.45,t*.35],[.65,.03,.42],s.BARKD,{dir:[1,0,0],up:[0,1,t*1.1],round:.01,group:10+(t>0?1:0),paint:i=>(i[0]+3)*12%1<.15?s.NOSE:de(i,6,3)<.2?s.MOSS:void 0});n.box([0,3.75,0],[.3,.2,.3],s.BARKD,{round:.02,group:12}),n.seg([0,3.9,0],[0,5.2,0],.3,.02,s.BARKD,{group:13,paint:t=>t[1]*12%1<.2?s.NOSE:void 0});for(let t=0;t<4;t++)n.box([-.8+t*.5,.12,1.55+Ce(t)*.3],[.3,.03,.06],s.BARKD,{dir:[1,0,Ce(t,2)-.5],round:.01,group:14+t%2});ht(n,[-1.6,.2,1.15],[-1,1.5,1.15],16,93),Pi(n,[.5,.16,.2],17,1.2),ge(n,18,2.6,18,94)}},"parish-church":{desc:"a stone parish church: a roofless nave with empty pointed windows, its gables still standing, a square tower with broken battlements",halves:1,split:2.6,build(n){nt(n,[0,1.9/2,-.95],[2,1.9/2,.14],1,{courses:6});for(const[a,o,l]of[[-2,-.4,1.9],[-.4,.5,.9],[.5,2,1.5]])nt(n,[(a+o)/2,l/2,.95],[(o-a)/2,l/2,.14],2,{courses:6});for(const a of[-1.3,.2,1.3])Mn(n,[a,1.15,-.95],.17,.35,2,1,{pointed:!0}),a!==.2&&Mn(n,[a,a>1?.95:1.15,.95],.17,a>1?.2:.35,2,2,{pointed:!0});nt(n,[2,1.9/2,0],[.14,1.9/2,.95+.14],3,{courses:6}),Mn(n,[2,1.3,0],.25,.45,0,3,{pointed:!0}),n.flat([2+.12,1.9+.55,0],[0,0,1],[0,1,0],.95+.14,.55,gr(s.STONE,5),{group:4,bend:.02});const r=-2-.55;nt(n,[r,2.2,0],[.6,2.2,.6],5,{courses:9});for(const a of[-.6,.6])for(const o of[r-.6,r+.6])nt(n,[o,1,a],[.1,1,.1],5,{courses:0});Mn(n,[r,3.6,.6],.14,.25,2,5,{pointed:!0}),Mn(n,[r+.6,3.6,0],.14,.25,0,5,{pointed:!0}),Mn(n,[r,.55,.6],.22,.4,2,5,{pointed:!0}),wa(n,r-.55,r+.6,4.4,.55,.07,6,1,.35),wa(n,r-.55,r+.6,4.4,-.55,.07,6,2,.2);for(let a=0;a<3;a++)Ye(n,[-1.2+a*1,.1,-.5+a*.3],[-.6+a*.9,.9,.2],7,.05,s.BARK2,void 0);ui(n,[0,0,.95+.3],12,.8,8,95),ht(n,[2,.1,.95+.15],[2-.2,1.6,.95+.15],11,96),ht(n,[r+.6,.1,.6],[r+.5,3.2,.62],12,97),ge(n,18,2.8,13,98)}},"baroque-church":{desc:"a baroque church: a pale curving facade with scrolls and a broken pediment, pilasters, and behind it a great dome cracked open to the sky",halves:1.1,split:2.8,build(n){const e=(i=4)=>r=>{const a=en(i,.1)(r);return a||(de(r,4,3)<.07?s.STRAW:void 0)};for(const i of[-1.4,1.4])n.box([0,1.1,i*.85],[1.3,1.1,.14],s.BELLY,{round:.03,group:1,paint:e()});n.box([-1.3,1.1,0],[.14,1.1,1.2],s.BELLY,{round:.03,group:1,paint:e()}),Mn(n,[0,1,-1.19],.2,.45,2,1),Mn(n,[-1.3,1,0],.2,.45,0,1),ln(n,[0,2.2,0],[0,2.75,0],1,s.BELLY,2,{paint:i=>(Math.atan2(i[2],i[0])*8/6.283%1+1)%1<.08?s.STONED:e(0)(i)}),n.seg([0,2.1,0],[0,2.85,0],.88,.88,s.STONED,{group:2,cut:!0}),ds(n,[0,2.75,0],1.02,3,s.STONE,{tall:.95,crack:[[.55,.6,.55],[.55,.7,.45],[1,.3,1]],paint:i=>(Math.atan2(i[2],i[0])*12/6.283%1+1)%1<.07?s.BELLY:de(i,5,6)<.2?s.MOSS:void 0});const t=1.35;n.box([0,1.25,t],[1.45,1.25,.16],s.BELLY,{round:.03,group:4,paint:e(5)}),Mn(n,[0,.6,t],.3,.6,2,4),Mn(n,[-.85,1.45,t],.14,.26,2,4),Mn(n,[.85,1.45,t],.14,.26,2,4);for(const i of[-1.35,-.55,.55,1.35])n.box([i,1.25,t+.17],[.07,1.2,.04],s.BELLY,{round:.02,group:5,paint:e(0)});n.box([0,2.6,t],[.75,.3,.15],s.BELLY,{round:.03,group:6,paint:e(0)});for(const i of[-1,1])n.ell([i*.95,2.45,t],[.28,.22,.1],s.BELLY,{group:7,paint:r=>Math.abs(Math.hypot(r[0]-i*.95,r[1]-2.45)-.14)<.03?s.STONED:e(0)(r)});n.flat([-.3,3.08,t+.02],[1,0,0],[0,1,0],.75,.2,gr(s.BELLY,0,.45,3),{group:8,bend:.02}),n.ell([1.7,.2,1],[.25,.18,.25],s.STONE,{group:9,paint:en(0,.4)}),n.seg([1.6,.2,.7],[2.1,.25,1.4],.1,.06,s.STONE,{group:9}),ui(n,[.6,0,.3],10,.7,10,99),ht(n,[-1.45,.1,t+.2],[-1.2,2.2,t+.2],13,100),ht(n,[1.3,2.2,-.5],[.6,3.5,-.2],14,101),ge(n,18,2.8,15,102)}},"coptic-basilica":{desc:"a domed Coptic basilica: whitewashed walls, a row of small domes, a rounded apse, a square bell tower with arched openings; one dome fallen in",halves:.9,split:2.6,build(n){const e=(i=0)=>r=>{const a=en(i,.08)(r);return a||(de(r,3,5)<.07?s.STRAW:void 0)};for(const i of[-1,1])n.box([0,i>0?.7:.9,i],[1.8,i>0?.7:.9,.13],s.BELLY,{round:.03,group:1+(i>0?1:0),paint:e()});for(const i of[-1,0,1])Mn(n,[i,1.1,-1],.14,.2,2,1),i&&Mn(n,[i,.9,1],.14,.2,2,2);n.box([1.8,.9,0],[.13,.9,1],s.BELLY,{round:.03,group:3,paint:e()}),Mn(n,[1.8,.55,0],.25,.35,0,3),n.seg([-1.8,0,0],[-1.8,1.6,0],.95,.95,s.BELLY,{group:4,paint:e()}),n.box([-1.2,.8,0],[.6,1,1.2],s.BELLY,{group:4,cut:!0}),n.seg([-1.8,.1,0],[-1.8,1.7,0],.82,.82,s.STONED,{group:4,cut:!0}),ds(n,[-1.8,1.65,0],.95,5,s.BELLY,{paint:e()}),n.box([-1.3,1.6,0],[.5,1.2,1.2],s.STONED,{group:5,cut:!0});for(const[i,r]of[[-.9,0],[0,1],[.9,0]]){if(r){ui(n,[i,0,0],8,.5,6,103);continue}ln(n,[i,1.8,-.2],[i,2.1,-.2],.45,s.BELLY,7+Math.round(i),{paint:e()}),ds(n,[i,2.1,-.2],.45,10+Math.round(i),s.BELLY,{paint:e()})}const t=[2.5,0,-.7];nt(n,E.add(t,[0,1.7,0]),[.4,1.7,.4],13,{mat:s.BELLY,courses:0,paint:e(0)});for(const[i,r,a]of[[0,.4,2],[.4,0,0]])for(const o of[2.6,3.05])Mn(n,E.add(t,[i,o,r]),.1,.16,a,13);ds(n,E.add(t,[0,3.4,0]),.38,14,s.BELLY,{paint:e()}),n.seg(E.add(t,[0,3.75,0]),E.add(t,[0,3.95,0]),.04,.02,s.STONE,{group:14}),ht(n,[1.8,.1,1.05],[1.4,1.3,1.05],15,104),ht(n,E.add(t,[-.4,.1,.4]),E.add(t,[-.3,2.2,.42]),16,105),ge(n,18,2.8,17,106)}},"pagoda-temple":{desc:"a tiered wooden temple on a stone plinth: three roofs with upturned eaves, red-lacquered posts faded to brown; its top tier leaning and its spire fallen beside it",split:2.2,build(n){nt(n,[0,.12,0],[1.4,.12,1.2],1,{courses:0,moss:.35});for(let r=0;r<3;r++)nt(n,[0,.04+r*.08,1.25+(2-r)*.12],[.5,.04+r*.04,.1],1,{courses:0});const e=(r,a,o,l)=>{for(const h of[-a,a])for(const f of[-a*.85,a*.85])n.seg([h,r,f],[h,r+o,f],.06,.06,s.ACCENT,{group:l,paint:d=>de(d,10)<.3?s.BARK2:void 0});n.box([0,r+o*.5,-a*.8],[a*.95,o*.5,.04],s.WOOD,{round:.01,group:l,paint:ft(7,.2)});const c=h=>Math.abs(Math.sin(Math.atan2(h[2],h[0])*18))>.85?s.NOSE:de(h,4,l)<.22?s.MOSS:void 0,u=a+.5;n.ell([0,r+o+.06,0],[u*1.05,.06,u*1.05],s.JACKET,{group:l+1,paint:c}),n.ell([0,r+o+.08,0],[u*.78,.34,u*.78],s.JACKET,{group:l+1,paint:c}),n.box([0,r+o-.3,0],[u*1.2,.36,u*1.2],s.NOSE,{group:l+1,cut:!0}),n.ell([0,r+o+.06,0],[u*1.05,.05,u*1.05],s.JACKET,{group:l+3,paint:c});for(const h of[-1,1])for(const f of[-1,1])n.seg([h*u*.6,r+o+.08,f*u*.6],[h*u*.85,r+o+.24,f*u*.85],.05,.015,s.JACKET,{group:l+2})};e(.24,.95,1,2),e(1.85,.65,.65,6);const t=Vt(n);e(0,.5,.45,14),Yt(n,t,{roll:.14,at:[.1,3.08,0]});const i=Vt(n);n.seg([0,0,0],[0,1,0],.06,.02,s.FRAME,{group:18,paint:Ue(.6,0)});for(let r=0;r<4;r++)n.ell([0,.25+r*.18,0],[.12-r*.02,.025,.12-r*.02],s.FRAME,{group:18,paint:Ue(.6,0)});Yt(n,i,{roll:1.45,yaw:.5,at:[1.8,.1,1.1]}),ht(n,[-.95,.25,.8],[-.8,1.5,.85],19,107),ge(n,16,2.4,20,108)}},stupa:{desc:"a stupa: a great domed mound on square terraces, its spire of rings broken, a tree rooted in its dome",split:2.4,build(n){nt(n,[0,.15,0],[1.6,.15,1.6],1,{courses:0,moss:.35}),nt(n,[0,.42,0],[1.3,.12,1.3],1,{courses:0,moss:.35}),ln(n,[0,.54,0],[0,.8,0],1.1,s.BELLY,2,{paint:en(0,.3)}),n.ell([0,.8,0],[1.05,1,1.05],s.BELLY,{group:3,paint:e=>de(e,9,2)<.16?s.MOSS:de(e,14,5)<.06?s.STONED:void 0}),n.box([0,.3,0],[1.2,.5,1.2],s.BELLY,{group:3,cut:!0}),nt(n,[0,1.92,0],[.22,.14,.22],4,{mat:s.BELLY,courses:0});for(let e=0;e<4;e++)ln(n,[0,2.06+e*.17,0],[0,2.12+e*.17,0],.2-e*.035,s.STONE,5,{paint:en(0,.3)});n.seg([0,2.06,0],[0,2.7,0],.04,.03,s.STONE,{group:5});for(let e=0;e<3;e++)ln(n,[1.6+e*.25,.05,.9-e*.3],[1.6+e*.25,.11,.9-e*.3],.14-e*.02,s.STONE,6+e);n.chain([[-.55,1.4,.5,.07],[-.75,2,.6,.05],[-.8,2.4,.5,.03]],s.TRUNK,{group:9,rough:.01}),jl(n,[-.8,2.5,.5],[.45,.32,.4],10),n.chain([[-.55,1.4,.5,.04],[-.3,.9,.9,.03],[-.1,.6,1.1,.02]],s.TRUNK,{group:9}),ge(n,18,2.6,11,109)}},"greek-temple":{desc:"a Greek temple: a stepped base, a peristyle of fluted columns, some fallen in drums, a broken architrave and the corner of a pediment",halves:.9,split:2.4,build(n){for(let r=0;r<3;r++)nt(n,[0,.06+r*.12,0],[2.4-r*.12,.06,1.4-r*.12],1,{mat:s.BELLY,courses:0,moss:.25});const e=.36,t=1.9,i=[];for(let r=0;r<7;r++)for(const a of[-1.05,1.05])i.push([-1.95+r*.65,a]);for(const r of[-1.95,1.95])for(const a of[-.35,.35])i.push([r,a]);i.forEach(([r,a],o)=>{const l=Ce(o,11),c=l<.22,u=l>.8;c||Is(n,[r,e,a],u?t*(.35+Ce(o,12)*.3):t,.15,2+(a>0?1:0),{capital:!u})}),nt(n,[-1.3,e+t+.2,-1.05],[.85,.12,.17],4,{mat:s.BELLY,courses:0}),nt(n,[-1.95,e+t+.2,0],[.17,.12,1],4,{mat:s.BELLY,courses:0}),n.flat([-2.05,e+t+.65,-.25],[0,0,1],[0,1,0],.85,.33,(r,a)=>r>.3-a*.2?null:gr(s.BELLY,0)(r,a),{group:5,bend:.02}),nt(n,[.2,.65,-.3],[.6,.3,.1],6,{mat:s.BELLY,courses:3});for(let r=0;r<4;r++)n.seg([.3+r*.38,.55,1.6+r*.05],[.3+r*.38+.3,.55,1.62+r*.05],.15,.15,s.BELLY,{group:7+r%2,paint:en(0,.3)});ht(n,[-1.95,e,1.2],[-1.9,1.8,1.2],9,110),ge(n,18,2.8,10,111)}}},$x={"curtain-wall":{desc:"a stretch of curtain wall, its battlements gapped, arrow slits, ivy up its face",split:2.2,build(n){nt(n,[0,1.25,0],[1.7,1.25,.3],1,{courses:8}),wa(n,-1.7,1.7,2.5,0,.3,2,3);for(const e of[-.9,.2,1.1])n.box([e,1.3,.3],[.04,.25,.4],s.NOSE,{group:1,cut:!0});ui(n,[0,0,.7],8,.9,3,112),ht(n,[-1.4,0,.32],[-1,2.3,.32],6,113),ge(n,14,2,7,114)}},"curtain-wall-breach":{desc:"a curtain wall breached: a ragged gap down to the ground, its stones spilled out",split:2.2,build(n){for(const[e,t]of[[-1.15,2.5],[1.2,1.9]])nt(n,[e,t/2,0],[.55,t/2,.3],1,{courses:8});wa(n,-1.7,-.6,2.5,0,.3,2,4),nt(n,[0,.2,0],[.6,.2,.3],3,{courses:2});for(let e=0;e<5;e++)nt(n,[-.5+e*.25,.35+Ce(e)*.2,-.05],[.12,.12+Ce(e,2)*.1,.25],4,{courses:0});ui(n,[0,0,.9],16,1.3,5,115),ge(n,14,2.2,8,116)}},"round-tower":{desc:"a round tower, hollow and roofless, its top broken off on a slant, arrow slits round it",split:2.4,build(n){n.seg([0,0,0],[0,4.2,0],1,1,s.STONE,{group:1,rough:.01,paint:en(9,.18)}),n.seg([0,.3,0],[0,5,0],.78,.78,s.STONED,{group:1,cut:!0}),n.box([0,4.5,0],[1.6,.8,1.6],s.STONED,{dir:[1,.45,.2],group:1,cut:!0}),n.box([0,-.8,0],[1.4,.8,1.4],s.STONED,{group:1,cut:!0});for(const[e,t]of[[.4,1.2],[1.6,2.2],[-.6,2.6],[.9,3.2]])n.box([Math.cos(e)*1,t,Math.sin(e)*1],[.6,.22,.035],s.NOSE,{dir:[Math.cos(e),0,Math.sin(e)],group:1,cut:!0});Mn(n,[.25,.5,1],.22,.35,2,1),ui(n,[1.3,0,.6],12,.9,3,117),ht(n,[-.8,0,.6],[-.6,3,.75],6,118),ht(n,[.3,0,.97],[.5,2,.9],7,119),ge(n,14,2,8,120)}},gatehouse:{desc:"a gatehouse: two square towers and the arch between, its portcullis fallen flat in the gateway",split:2.6,build(n){for(const t of[-1.25,1.25])nt(n,[t,1.6,0],[.6,1.6,.65],1+(t>0?1:0),{courses:10}),wa(n,t-.6,t+.6,3.2,.55,.08,3,t>0?5:6,.3),n.box([t,1.8,.65],[.04,.25,.3],s.NOSE,{group:1+(t>0?1:0),cut:!0});nt(n,[0,2.45,0],[.7,.4,.55],4,{courses:3}),n.ell([0,2.05,0],[.66,.35,.8],s.STONED,{group:4,cut:!0});const e=Vt(n);for(let t=0;t<7;t++)Ye(n,[-.55+t*.18,0,0],[-.55+t*.18,0,1.5],5,.03,s.JACKET);for(let t=0;t<6;t++)Ye(n,[-.6,0,t*.28],[.6,0,t*.28],5,.03,s.JACKET);Yt(n,e,{roll:-.08,at:[0,.06,-.2]}),ui(n,[0,0,1.4],10,.8,6,121),ht(n,[-1.85,0,.66],[-1.6,2.8,.66],9,122),ge(n,14,2.4,10,123)}},"steps-to-nowhere":{desc:"a stone stair climbing the stub of a fallen wall and ending in the air",build(n){nt(n,[-.3,.9,-.35],[1,.9,.25],1,{courses:6});for(let e=0;e<8;e++)nt(n,[-1.1+e*.23,(.2+e*.2)/2,0],[.12,(.2+e*.2)/2,.3],2,{courses:0,moss:.35});ui(n,[1,0,.3],8,.6,3,124),ge(n,12,1.8,6,125)}},rubble:{desc:"a heap of fallen dressed stone, grass and a sapling through it",build(n){ui(n,[0,0,0],22,1,1,126),n.seg([.2,0,.1],[.25,1.1,.1],.03,.02,s.TRUNK,{group:4}),jl(n,[.25,1.2,.1],[.3,.22,.25],5),ge(n,12,1.4,6,127)}}},Jx={column:{desc:"a fluted marble column still standing, its capital chipped",split:2,build(n){Is(n,[0,0,0],2.5,.2,1),ht(n,[-.18,0,.1],[-.1,1.4,.18],3,128),ge(n,8,.8,4,129)}},"column-broken":{desc:"a column snapped off at a man's height, its top jagged",build(n){Is(n,[0,0,0],1.1,.2,1,{capital:!1}),n.ell([.05,1.1,0],[.18,.1,.18],s.BELLY,{group:1,rough:.03}),ge(n,8,.8,4,130)}},"column-drums":{desc:"a column fallen in a line of drums, its capital at the end",build(n){for(let e=0;e<4;e++)n.seg([-1.2+e*.62,.2,(Ce(e)-.5)*.12],[-.75+e*.62,.2,(Ce(e+1)-.5)*.12],.2,.2,s.BELLY,{group:1+e%2,paint:t=>Math.abs(Math.sin(Math.atan2(t[2],t[1]-.2)*9))>.9?s.STONED:en(0,.3)(t)});n.box([1.4,.12,0],[.28,.12,.28],s.BELLY,{round:.02,group:3,dir:[1,0,.3],paint:en(0,.4)}),ge(n,10,1.5,4,131)}},"pediment-fragment":{desc:"a fallen corner of pediment, its moulding still crisp, half in the grass",build(n){const e=Vt(n);n.box([0,0,0],[1,.12,.3],s.BELLY,{round:.02,group:1,paint:en(0,.3)}),n.flat([0,.5,0],[1,0,0],[0,1,0],1,.38,(t,i)=>t<-.1+i*.3?null:gr(s.BELLY,0)(t,i),{group:2,bend:.02}),Yt(n,e,{roll:-.5,yaw:.3,at:[0,.15,0]}),ge(n,10,1.3,3,132)}},"mosaic-floor":{desc:"a mosaic floor: a border of waves round a ring of rosettes, tesserae lost in patches, grass through the cracks",decal:!0,build(n){n.box([0,.015,0],[2.4,.015,1.8],s.BELLY,{round:.01,group:1,paint:i=>{const r=i[0],a=i[2],o=Math.floor(r*14),l=Math.floor(a*14);if(de(i,1.6,9)<.18||Math.abs(Math.sin(r*1.6+.5)*.7-a*.6)<.02)return de(i,12)<.5?s.LEAF2:s.BARK2;if((o+l)%7===0&&Ce(o,l)<.3)return s.STONED;const c=2.4-Math.abs(r),u=1.8-Math.abs(a),h=Math.min(c,u);if(h<.12)return s.STONED;if(h<.42)return Math.sin((c<u?r:a)*9)*.12+.27>h?s.HAT1:s.BELLY;const f=Math.hypot(r,a*1.2),d=Math.atan2(a,r);return Math.abs(f-1)<.06?s.ACCENT:f<.5?Math.abs(Math.sin(d*4))*.4>f-.1?s.STRAW:f<.1?s.ACCENT:s.BELLY:(o+l)%2===0&&f<1?s.STRAW:void 0}});for(let i=0;i<8;i++)n.ell([(Ce(i,50)-.5)*4,.06,(Ce(50,i)-.5)*3],[.08,.06,.08],s.LEAF2,{group:2+i%3})}},"statue-headless":{desc:"a draped statue on its plinth, its head long gone, one arm broken at the elbow",build(n){nt(n,[0,.3,0],[.38,.3,.32],1,{mat:s.BELLY,courses:0}),n.seg([0,.6,0],[0,1.6,0],.3,.19,s.BELLY,{group:2,rough:.006,paint:e=>Math.abs(Math.sin(e[0]*18+e[1]*3))>.92?s.STONED:de(e,6,3)<.12?s.MOSS:void 0}),n.ell([0,1.62,0],[.24,.14,.16],s.BELLY,{group:2}),n.seg([0,1.7,0],[0,1.78,0],.08,.07,s.BELLY,{group:3,paint:e=>e[1]>1.75?s.STONED:void 0}),n.seg([.22,1.6,.05],[.3,1.3,.15],.07,.06,s.BELLY,{group:4}),n.seg([-.22,1.6,0],[-.3,1.15,.05],.07,.06,s.BELLY,{group:4}),n.seg([-.3,1.15,.05],[-.2,1,.25],.06,.05,s.BELLY,{group:4}),n.seg([.6,.06,.5],[.85,.07,.7],.06,.05,s.BELLY,{group:5}),ht(n,[-.38,0,.32],[-.2,1.2,.32],6,133),ge(n,10,1,7,134)}},"arch-ruin":{desc:"a single arch of a fallen arcade, its keystone slipped",split:2.2,build(n){for(const e of[-1,1])nt(n,[e,1,0],[.25,1,.3],1,{mat:s.BELLY,courses:5});for(let e=0;e<=8;e++){const t=Math.PI*(1-e/8),i=[Math.cos(t)*1,2+Math.sin(t)*.85-(e===4?.12:0),0];nt(n,i,[.2,.14,.3],2+e%2,{mat:s.BELLY,courses:0,dir:[-Math.sin(t),Math.cos(t),0]})}nt(n,[-.4,3,0],[.8,.1,.32],4,{mat:s.BELLY,courses:0}),ui(n,[.8,0,.6],8,.6,5,135,s.BELLY),ht(n,[-1.2,0,.3],[-.9,2.2,.3],8,136),ge(n,12,1.8,9,137)}}},kh=[...Object.entries(Xx).map(([n,e])=>({id:n,family:"cemetery",...e})),...Object.entries(Kx).map(([n,e])=>({id:n,family:"carpark",...e})),...Object.entries(qx).map(([n,e])=>({id:n,family:"scrap",...e})),...Object.entries(Zx).map(([n,e])=>({id:n,family:"worship",...e})),...Object.entries($x).map(([n,e])=>({id:n,family:"castle",...e})),...Object.entries(Jx).map(([n,e])=>({id:n,family:"classical",...e}))],Qx=kh.flatMap(n=>{const e={size:1,split:null,...n};return n.halves?["far","near"].map(t=>({...e,id:`${n.id}-${t}`,building:n.id,half:t,offset:t==="far"?-n.halves:n.halves,desc:`${n.desc} (its ${t} half)`,build:jx(n.build,t==="near",t==="far"?-n.halves:n.halves)})):[e]});Object.fromEntries(Qx.map(n=>[n.id,n]));const bu=Object.fromEntries(kh.filter(n=>n.halves).map(n=>[n.id,n.halves]));function jx(n,e,t){return i=>{const r=new it({blend:.04});n(r);const a=l=>l.type==="cone"?(l.a[2]+l.b[2])/2:l.c[2],o=l=>[l[0],l[1],l[2]-t];for(const l of r.parts)if(a(l)>0===e){if(l.type==="cone"?(l.a=o(l.a),l.b=o(l.b)):l.c=o(l.c),l.paint){const c=l.paint;l.paint=(u,h)=>c([u[0],u[1],u[2]+t],h)}l.group+=100,i.parts.push(l)}for(const l of r.flats)l.c[2]>0===e&&(l.c=o(l.c),i.flats.push(l))}}const e5={"farmyard-corner":{desc:"an abandoned farmyard corner: the tractor sunk in moss, bales gone to mould, a broken fence, a trough, churns and a barrow",suits:["meadow","grassland","honeysuckle-tangle","muddy-forest"],pieces:[["tractor",0,0],["hay-round",2.8,-1.3],["hay-round-mouldy",3.7,.1],["fence",-1.3,-2.5],["fence-broken",1,-2.6],["trough",-2.5,1.2],["milk-churn",1.9,1.8],["milk-churn",2.25,2.1],["milk-churn",1.7,2.35,"left"],["wheelbarrow",-.7,2.3,"left"]]},"bus-stop":{desc:"a bus stop on a road long gone: the shelter, its stop sign, a bench, a lamppost still flickering warm, a heap of bin bags",suits:["grassland","meadow","twiggy-forest","wispy-forest"],pieces:[["bus-shelter",0,0],["bus-stop-sign",1.9,.6],["bench",-2.4,.8],["lamppost-lit",-1.9,-.4],["bin-bags",2.5,-.7],["litter-bin",1.3,1.3]]},"picnic-gone-wild":{desc:"a picnic left behind and gone wild: a rotting table, the blanket with mushrooms through it, a hamper, a clump of glowing fungi",suits:["bluebell-glade","old-oaks","log-pile","meadow"],pieces:[["picnic-table",0,-.7],["picnic-blanket",.5,.9],["hamper",-1.2,.8],["fungi-glow",1.5,.2],["camp-chair",-1.5,-.4,"left"]]},"allotment-feral":{desc:"an allotment gone feral: a shed with its door hanging, beds bolted to seed, a bean wigwam, a compost bay, a scarecrow",suits:["garden","honeysuckle-tangle","meadow"],pieces:[["garden-shed",-1.7,-1.7],["raised-bed",.6,-.9],["raised-bed",.8,.6,"left"],["bean-wigwam",2.5,-.6],["compost-heap",-1.9,1],["watering-can",-.4,1.9],["scarecrow",2.7,1.5]]},"lay-by":{desc:"a lay-by: a car still parked, a snack trailer shuttered, a litter bin, a picnic table, cones and a sign",suits:["grassland","twiggy-forest","norway","wispy-forest"],pieces:[["car-parked",0,0],["snack-van",-3.3,-1.4],["litter-bin",2.2,-.9],["picnic-table",2.7,1],["relic:cones",-1.3,1.7],["sign-round",-3,1.4]]},"festival-remnants":{desc:"festival remnants: tent frames with rags of fabric, faded bunting, a cold fire pit, crates, a camp chair, glow sticks still glowing",suits:["meadow","heath","grassland","bluebell-glade"],pieces:[["bunting",0,-2.3],["tent-frame",-1.6,-.7],["tent-frame",.9,-1.3,"left"],["fire-pit",.4,.6],["crates",-1.9,1.2],["camp-chair",1.7,.1,"left"],["glow-sticks",1.2,1.5]]},"woodcutters-clearing":{desc:"a woodcutter's clearing: a woodpile, a chopping block with the axe left in it, a sawhorse, sawn stumps, a barrow",suits:["log-pile","old-oaks","alder-forest","norway","old-pinewood"],pieces:[["log-pile",-1.4,-1.1],["chopping-block",.4,.2],["sawhorse",1.9,-.9],["stumps",-.9,1.4],["stumps",2.1,1.2,"left"],["wheelbarrow",-2.5,.5]]},"fly-tip":{desc:"a fly-tip in the bracken: a sofa, a washing machine, a mattress, bin bags, a pile of tyres",suits:["fern-forest","muddy-forest","tangly-forest","berry-thicket"],pieces:[["relic:sofa",0,-.6],["relic:washing-machine",1.7,-.7],["mattress",-1.5,.6],["bin-bags",.6,.9],["tyre-pile",2.3,.7]]},apiary:{desc:"an abandoned apiary: hives askew, one roof slid off, a bench and a water butt",suits:["meadow","heath","honeysuckle-tangle","garden"],pieces:[["beehive",-1.1,-.5],["beehive",.2,-.9,"left"],["beehive",1.3,-.2],["bench",-.4,1.2],["water-butt",2.2,1]]},"hay-bales":{desc:"bales left in a field: round bales, one gone black, a slumping stack of square ones",suits:["meadow","grassland","heath","moor"],pieces:[["hay-round",-1.3,0],["hay-round-side",.2,-.9],["hay-round",1.5,.2,"left"],["hay-stack",-.2,1.3],["hay-round-mouldy",2.6,-1.1],["hay-square-mouldy",1.6,1.6]]},"fence-line":{desc:"a run of field fence: whole sections, a broken one, a gate hanging open, one leaning over",suits:["meadow","grassland","moor","heath","honeysuckle-tangle"],pieces:[["fence",-4.3,0],["fence",-2.2,0],["fence-broken",-.1,0],["gate",1.05,0],["fence-leaning",4.3,.05]]},"road-signs":{desc:"where a road forked: signs leaning every way, a dark lamppost, a cone",suits:["grassland","twiggy-forest","wispy-forest","rocky-slope"],pieces:[["sign-triangle",-.8,-.4],["sign-round",.6,-.7],["sign-blank",1.5,.4],["lamppost",-1.7,.3],["relic:cone",.3,.9]]},"scarecrow-field":{desc:"a field going back to forest: a scarecrow still standing guard, a plough in the grass, a mouldy bale, a broken fence",suits:["meadow","grassland","heath"],pieces:[["scarecrow",0,0],["plough",-2.1,.8],["hay-round-mouldy",2.1,-.8],["fence-broken",-.6,-2.1],["trailer",2.8,1.6,"left"]]}},Su=(n,e,t,i,r,a=()=>!1,o=[n])=>r.flatMap((l,c)=>{const u=[];for(let h=e,f=0;h<=t+1e-6;h+=i,f++)a(h,l)||u.push([o[(f*7+c*3)%o.length],+(h+((f*37+c*11)%5-2)*.04).toFixed(2),+(l+((f*13+c*7)%5-2)*.05).toFixed(2),(f+c)%3?void 0:"left"]);return u}),Eu=["headstone","headstone","headstone-lean","grave-cross","headstone-sunk","headstone"],t5={cemetery:{desc:"a cemetery gone back to the wood: rows of leaning headstones and crosses, a stone angel, a mausoleum, iron railings round an old plot, a lychgate, a yew, a lantern or two still flickering",suits:["old-oaks","holly-thicket","ancient","deadwood","wispy-forest"],pieces:[["lychgate",0,4.4],["mausoleum",-3.4,-3.4],["yew",3.6,-3.2],["stone-angel",.2,-.7],["obelisk",2.6,1],...Su("headstone",-3.6,3.6,.9,[-1.9,.5,2.4],(n,e)=>Math.abs(n-.2)<.9&&Math.abs(e+.7)<1.5||Math.abs(n-2.6)<.6&&Math.abs(e-1)<.8||n<-2.3&&e>1.5,Eu),["iron-railing",-3.4,1.4],["iron-railing",-3.4,3.3],["grave-lantern",-1.7,.7],["grave-lantern",1,2.6]]},"car-park":{desc:"a car park lost in the trees: cracked tarmac and faded bays, cars where they were left (one with a tree through it), a ticket machine, a snapped barrier, lampposts, trolleys",suits:["grassland","twiggy-forest","norway","wispy-forest"],pieces:[["carpark-tarmac",0,0],["car-parked",-2.7,-1.8],["car-parked",1.7,1.9,"left"],["car-bonnet-up",3.6,-1.8],["relic:van-tree",-1,2],["ticket-machine",5,.3],["barrier",-6.2,.4],["lamppost",-4.8,-3.1],["lamppost",4.6,-3.2,"left"],["relic:trolley-tipped",.6,-1.3],["relic:trolley-nest",4.4,2.5]]},"scrap-yard":{desc:"a scrap yard: stacks of crushed cars, tyre piles, a grab crane with its arm still up, oil drums, a chain-link fence torn open, a corrugated shack",suits:["muddy-forest","deadwood","rocky-slope","tangly-forest"],pieces:[["crushed-cars",-2.8,-2.1],["crushed-cars",-1,-2.8,"left"],["grab-crane",1.4,-1.6],["shack",3.8,-.4],["tyre-pile",-3.2,.8],["tyre-pile",2.2,1.8,"left"],["oil-drums",.2,.9],["relic:car-on-side",-1,2.1],["relic:court-fence",-3,3.6],["relic:court-fence",.2,3.7,"left"]]},"stave-church":{desc:"a ruined wooden stave church in a clearing, its nave open to the sky and its spire still up, a few sunken graves round it",suits:["norway","old-pinewood","fern-forest","rocky-slope"],pieces:[["@stave-church",0,0],["headstone-sunk",-2.8,1.8],["grave-cross",-2,2.6,"left"],["headstone-lean",2.9,2],["yew",3.8,-2.6]]},"parish-church":{desc:"a roofless stone parish church with its square tower, a churchyard of leaning stones, a yew by the gate",suits:["old-oaks","bluebell-glade","meadow","ancient"],pieces:[["@parish-church",0,0],["yew",3.6,2.4],...Su("headstone",-2.6,1.6,1.05,[2.6],()=>!1,Eu),["grave-cross",2.6,-2.2],["headstone-sunk",-.8,-2.4]]},"baroque-church":{desc:"a baroque church with its dome cracked open, its fallen lantern in the grass, a stone angel and rubble before its facade",suits:["garden","old-oaks","ancient"],pieces:[["@baroque-church",0,0],["stone-angel",-2.6,2.6,"left"],["rubble",2.4,2.8],["column-broken",3.3,.6]]},"coptic-basilica":{desc:"a domed Coptic basilica, one dome fallen in, its bell tower standing, rubble round it",suits:["rocky-slope","heath","grassland","cave-mouth"],pieces:[["@coptic-basilica",0,0],["rubble",-1,2.4],["rubble",3.4,1.6,"left"],["decor:split",-3.4,1.8]]},"pagoda-temple":{desc:"a tiered wooden temple on its plinth, its top tier leaning and its spire fallen, mossed rocks round it",suits:["bluebell-glade","fern-forest","ravine","stream"],pieces:[["pagoda-temple",0,0],["decor:pair",-2.8,1.6],["decor:rock",2.9,-1.4],["rubble",-2.4,-1.8,"left"]]},stupa:{desc:"a stupa on its terraces with a tree rooted in its dome, its spire's rings fallen at its foot, standing stones near",suits:["heath","moor","rocky-slope","grassland"],pieces:[["stupa",0,0],["decor:standing-rock",-3.2,-1],["decor:pair",3,1.8,"left"]]},"greek-temple":{desc:"a Greek temple on its stepped base, a peristyle of columns half fallen, drums in the grass, a headless statue",suits:["meadow","grassland","garden","heath"],pieces:[["@greek-temple",0,0],["column-drums",1.6,2.9],["statue-headless",-3.4,2.3],["pediment-fragment",3.8,-1.6,"left"]]},"castle-ruins":{desc:"castle ruins: curtain walls (one breached), a round tower open to the sky, a gatehouse with its portcullis fallen, steps to nowhere, rubble",suits:["rocky-slope","moor","norway","deadwood","cave-mouth"],pieces:[["curtain-wall",-4.2,-1.2],["round-tower",-1.7,-2.6],["gatehouse",1.6,-2.3],["curtain-wall-breach",4.7,-1.4,"left"],["steps-to-nowhere",-3.4,2],["rubble",2.6,1.7],["rubble",-.4,1.2,"left"]]},"classical-ruins":{desc:"classical ruins: a row of columns, some fallen in drums, a pediment fragment, a cracked mosaic floor, a headless statue, a broken arch, and the statue's toppled head, its eyes still faintly lit",suits:["meadow","garden","grassland","ancient"],pieces:[["mosaic-floor",0,0],["column",-2.2,-2.3],["column",-.8,-2.4],["column-broken",.6,-2.3],["column",2,-2.4],["column-drums",1.8,2.4],["pediment-fragment",-2.8,2.1],["statue-headless",3.2,-.6],["arch-ruin",-4.4,-.6],["decor:statue-head",4,1.6,"left"]]}},n5=n=>n.flatMap(([e,t,i,r])=>e[0]==="@"?[[`${e.slice(1)}-far`,t,i-bu[e.slice(1)],r],[`${e.slice(1)}-near`,t,i+bu[e.slice(1)],r]]:[[e,t,i,r]]),i5=[...Object.entries(e5).map(([n,e])=>({id:n,size:"small",...e})),...Object.entries(t5).map(([n,e])=>({id:n,size:"large",...e,pieces:n5(e.pieces)}))];Object.fromEntries(i5.map(n=>[n.id,n]));const er=(n,e=0)=>{const t=Math.sin(n*127.1+e*311.7)*43758.5453;return t-Math.floor(t)},hn=(n,e,t=0)=>er(Math.floor(n[0]*e)+Math.floor(n[2]*e)*57+t,Math.floor(n[1]*e)),si=(n=.25,e=.15)=>t=>{const i=hn(t,16,3);return hn(t,6,5)<e&&t[1]>.1?s.MOSS:i>1-n*.7?s.BODY2:void 0},ai=(n,e,t,i,r=.025,a=s.FRAME)=>n.seg(e,t,r,r,a,{group:i,paint:si(.4,.05)}),yu=(n,e,t,i)=>n.ell(e,t,s.STONE,{group:i,rough:.025,paint:r=>r[1]>e[1]+t[1]*.5&&hn(r,5,i)<.6?s.MOSS:hn(r,14)>.9?s.STONED:void 0}),cr=(n,e,t,i,r)=>{for(let a=0;a<e;a++){const o=er(r,a)*6.283,l=t*Math.sqrt(er(a,r));n.ell([Math.cos(o)*l,.07,Math.sin(o)*l*.7],[.07,.1+er(a,4)*.08,.07],s.LEAF2,{group:i+a%3,paint:c=>c[1]>.13?s.LEAF:void 0})}},Io=(n,e,t,i)=>n.ell(e,t,s.LEAF,{group:i,rough:.04,paint:r=>{const a=hn(r,10,2);return r[1]<e[1]-.15||a<.2?s.LEAF3:a>.8?s.LEAF2:void 0}}),fs=(n,e,t,i,r)=>{const a=[];for(let o=0;o<=4;o++)a.push([...E.add(E.lerp(e,t,o/4),[(er(r,o)-.5)*.12,0,.02]),.03]);n.chain(a,s.LEAF,{group:i,paint:o=>hn(o,30)<.3?s.LEAF2:void 0})};function wu(n,e,{pitch:t=0,roll:i=0,at:r=[0,0,0]}={}){const a=(h,f,d,p)=>{const g=Math.cos(f),x=Math.sin(f),M=[...h];return M[d]=h[d]*g-h[p]*x,M[p]=h[d]*x+h[p]*g,M},o=h=>a(a(h,i,1,2),t,0,1),l=h=>a(a(h,-t,0,1),-i,1,2),c=h=>E.add(o(h),r),u=h=>l(E.sub(h,r));for(const h of n.parts.slice(e))if(h.type==="cone"?(h.a=c(h.a),h.b=c(h.b)):(h.c=c(h.c),h.axes=h.axes.map(o)),h.paint){const f=h.paint;h.paint=(d,p)=>f(u(d),p)}}const r5={"verge-post":{family:"prop",path:"tarmac",desc:"a road's verge post, leaning, its band faded",build(n){const e=n.parts.length;n.box([0,.4,0],[.06,.4,.06],s.BELLY,{round:.02,group:1,paint:t=>Math.abs(t[1]-.62)<.06?s.SHADES:si(.1,.2)(t)}),wu(n,e,{roll:.15,pitch:.1}),cr(n,4,.25,3,1)}},"cats-eye":{family:"prop",path:"tarmac",desc:"a cat's-eye stud in the road (unlit)",build(n){n.box([0,.02,0],[.09,.02,.05],s.SHADES,{round:.01,group:1});for(const e of[-.04,.04])n.ell([e,.04,.03],[.025,.015,.015],s.FRAME,{group:2})}},"stepping-stone":{family:"prop",path:"stepping",desc:"a stepping stone, flat-topped and mossy",build(n){yu(n,[0,.08,0],[.38,.12,.3],1)}},"boardwalk-post":{family:"prop",path:"boardwalk",desc:"a boardwalk's post, standing in the water",build(n){n.seg([0,0,0],[0,.55,0],.06,.055,s.WOOD,{group:1,paint:e=>e[1]<.12?s.MOSS:e[1]>.5?s.BARK2:void 0})}},"sleeper-sapling":{family:"prop",path:"railway",desc:"a sapling grown up between the sleepers",build(n){n.seg([0,0,0],[0,.9,0],.025,.015,s.TRUNK,{group:1}),Io(n,[0,.95,0],[.22,.18,.2],2),cr(n,4,.2,3,2)}},"glow-mushrooms":{family:"prop",path:"magic",glow:!0,desc:"a cluster of softly glowing mushrooms",build(n){for(let e=0;e<4;e++){const t=[(er(e)-.5)*.3,0,(er(e,2)-.5)*.2],i=.08+er(e,3)*.1;n.seg(t,E.add(t,[0,i,0]),.015,.012,s.CLOTH,{group:1}),n.ell(E.add(t,[0,i+.02,0]),[.05,.03,.05],s.MAGIC,{group:2+e,paint:r=>r[1]>t[1]+i+.035?s.MAGIC2:void 0})}}},"fairy-stone":{family:"prop",path:"magic",glow:!0,desc:"a small fairy stone with a glowing rune",build(n){n.box([0,.18,0],[.09,.18,.06],s.STONE,{round:.04,group:1,paint:e=>e[2]>.04&&Math.abs(e[1]-.2)<.07&&Math.abs(e[0])<.025?s.RUNE:e[1]>.32?s.MOSS:void 0})}},"signal-post":{family:"prop",path:"railway",desc:"a rusty old signal post, its arm dropped (unlit)",build(n){ai(n,[0,0,0],[0,2.2,0],1,.04),n.box([.25,2,0],[.25,.05,.02],s.ACCENT,{dir:[1,-.6,0],group:2,paint:e=>e[0]>.38?s.BELLY:si(.4,0)(e)}),n.ell([0,2.05,.05],[.06,.06,.03],s.SHADES,{group:3}),fs(n,[0,0,.04],[.02,1.4,.04],4,3)}},stairs:{family:"piece",path:"stairs",desc:"a short flight of mossy stone stairs, for ruins and hollows",build(n){for(let e=0;e<5;e++)n.box([0,.1+e*.2,-e*.3],[.6,.1+e*.2,.15],s.STONE,{round:.03,rough:.01,group:1+e%2,paint:t=>t[1]>.16+e*.4&&hn(t,6,e)<.35?s.MOSS:hn(t,14)>.9?s.STONED:void 0});for(const e of[-.7,.7])yu(n,[e,.3,-.6],[.15,.35,.7],5)}},"stairs-turn":{family:"piece",path:"stairs",desc:"stone stairs turning on a landing",build(n){for(let e=0;e<3;e++)n.box([0,.1+e*.2,-e*.3],[.5,.1+e*.2,.15],s.STONE,{round:.03,rough:.01,group:1+e%2,paint:t=>hn(t,6,e)<.3&&t[1]>.2+e*.4?s.MOSS:void 0});n.box([0,.35,-1.1],[.55,.35,.5],s.STONE,{round:.03,group:3,paint:e=>hn(e,6)<.3&&e[1]>.6?s.MOSS:void 0});for(let e=0;e<3;e++)n.box([.65+e*.3,.8+e*.2,-1.1],[.15,.1+e*.1,.5],s.STONE,{round:.03,group:4+e%2})}},"root-bridge":{family:"piece",path:"roots",desc:"a bridge of gnarled roots over a stream",build(n){n.ell([0,.01,0],[1.4,.015,.6],s.WATER,{group:1});for(let e=0;e<4;e++)n.chain([[-1.8,0,-.4+e*.27,.14],[-.8,.45,-.35+e*.25,.1],[.6,.5,-.3+e*.22,.1],[1.8,0,-.25+e*.2,.13]],s.TRUNK,{group:2+e%2,rough:.015,paint:t=>hn(t,12)<.12?s.BARKD:t[1]>.55&&hn(t,5)<.3?s.MOSS:void 0});Io(n,[-1.7,.25,-.5],[.3,.2,.25],5)}},footbridge:{family:"piece",path:"bridges",desc:"a little wooden footbridge over a stream",build(n){n.ell([0,.01,0],[1.2,.015,.7],s.WATER,{group:1});for(let e=-6;e<=6;e++){const t=e*.2,i=.35-t*t*.1;n.box([t,i,0],[.09,.03,.5],s.WOOD,{round:.01,group:2+(e&1),paint:r=>hn(r,10)<.15?s.MOSS:void 0})}for(const e of[-.5,.5]){for(const t of[-1.1,0,1.1])n.seg([t,.3-t*t*.1,e],[t,.85-t*t*.1,e],.03,.03,s.WOOD,{group:4});n.chain([[-1.1,.85-.121,e,.025],[0,.85,e,.025],[1.1,.85-.121,e,.025]],s.WOOD,{group:4})}}},"rope-bridge":{family:"piece",path:"bridges",desc:"a rope bridge over a stream, planks sagging, one missing",build(n){n.ell([0,.01,0],[1.3,.015,.7],s.WATER,{group:1});for(const e of[-1.6,1.6])for(const t of[-.45,.45])n.seg([e,0,t],[e,1.1,t],.05,.045,s.WOOD,{group:2});for(let e=-7;e<=7;e++){if(e===3)continue;const t=e*.2,i=.55-(1-(t/1.6)**2)*.3;n.box([t,i,0],[.08,.02,.38],s.WOOD,{round:.01,group:3+(e&1)})}for(const e of[-.45,.45])for(const t of[0,1]){const i=[];for(let r=0;r<=8;r++){const a=-1.6+r*.4,o=(t?1.05:.55)-(1-(a/1.6)**2)*(t?.25:.3);i.push([a,o,e,.015])}n.chain(i,s.STRAW,{group:5})}}},"goods-wagon":{family:"landmark",path:"railway",desc:"an abandoned goods wagon tipped on its side (no livery)",build(n){const e=n.parts.length;n.box([0,.75,0],[1.6,.65,.6],s.BODY2,{round:.05,group:1,paint:t=>(t[0]+9)*4%1<.08?s.SHADES:si(.6,.2)(t)});for(const t of[-1.1,1.1])for(const i of[-.55,.55])n.ell([t,.22,i],[.22,.22,.06],s.SHADES,{group:2,paint:r=>Math.hypot(r[0]-t,r[1]-.22)<.08?s.FRAME:void 0});wu(n,e,{roll:1.4,at:[0,.3,.3]}),cr(n,14,2.2,4,5),fs(n,[-1.2,0,1],[-.6,1,1.1],7,6)}},carriage:{family:"landmark",path:"railway",glow:!0,desc:"an old passenger carriage, mossy roof, a tree grown through it, its windows glowing",build(n){n.box([0,.95,0],[2.4,.65,.62],s.HAT1,{round:.08,group:1,paint:e=>Math.abs(e[2])>.58&&e[1]>1&&e[1]<1.35&&(e[0]+9)*1.6%1>.25?hn(e,9)<.2?s.SHADES:s.GLOW:si(.4,.15)(e)}),n.ell([0,1.62,0],[2.4,.14,.62],s.MOSS,{group:2,paint:e=>hn(e,6)<.3?s.LEAF2:void 0});for(const e of[-1.8,1.8])for(const t of[-.5,.5])n.ell([e,.25,t],[.24,.24,.06],s.SHADES,{group:3});n.chain([[.6,0,0,.2],[.6,1.8,0,.16],[.7,2.9,-.1,.09]],s.TRUNK,{group:4,rough:.015}),Io(n,[.7,3.1,-.1],[1,.6,.8],5),cr(n,16,2.8,6,7)}},platform:{family:"landmark",path:"railway",desc:"a little station platform, a bench and a lamp post (no name board)",build(n){n.box([0,.35,0],[2.4,.35,.7],s.STONE,{round:.02,rough:.008,group:1,paint:e=>e[2]>.62&&e[1]>.6?s.BELLY:e[1]>.66&&hn(e,5)<.25?s.MOSS:(e[0]+9)*2.5%1<.06?s.STONED:void 0}),n.box([-.6,.95,-.3],[.6,.04,.16],s.WOOD,{group:2}),n.box([-.6,1.2,-.44],[.6,.18,.03],s.WOOD,{group:2});for(const e of[-1.1,-.1])n.box([e,.82,-.3],[.04,.12,.14],s.FRAME,{group:2});ai(n,[1.4,.7,-.4],[1.4,2.4,-.4],3,.035),n.box([1.4,2.5,-.4],[.12,.12,.12],s.FRAME,{round:.03,group:4,paint:e=>Math.abs(e[1]-2.5)<.07?s.SHADES:void 0}),fs(n,[1.4,.7,-.36],[1.42,2.2,-.36],5,8),cr(n,10,2.4,6,9)}},"level-crossing":{family:"landmark",path:"railway",desc:"a level crossing's barrier post, its boom broken off and lying in the grass",build(n){n.box([0,.55,0],[.15,.55,.15],s.BELLY,{round:.03,group:1,paint:si(.3,.15)}),n.box([.6,1.05,0],[.6,.05,.04],s.BELLY,{group:2,paint:e=>(e[0]+9)*2.5%1<.5?s.ACCENT:si(.3,0)(e)}),n.box([1.6,.05,.4],[.7,.05,.04],s.BELLY,{dir:[1,0,.5],group:3,paint:e=>(e[0]+9)*2.5%1<.5?s.ACCENT:si(.3,.15)(e)}),ai(n,[-.5,0,0],[-.5,1.6,0],4,.03);for(const e of[-1,1])n.box([-.5,1.6,0],[.35,.04,.015],s.BELLY,{dir:[1,e,0],group:5});cr(n,10,1.6,6,10)}},"buffer-stop":{family:"landmark",path:"railway",desc:"a buffer stop at the end of the line: a timber beam on rusty posts, its buffers worn, grass round its short stub of track",build(n){for(const e of[-.45,.45])ai(n,[-.2,0,e],[0,.75,e],1,.05),ai(n,[.35,0,e],[0,.7,e],1,.04),n.seg([0,.62,e],[.22,.62,e],.07,.07,s.FRAME,{group:2,paint:si(.5,0)}),n.ell([.25,.62,e],[.03,.1,.1],s.SHADES,{group:2});n.box([0,.7,0],[.08,.1,.75],s.ACCENT,{round:.02,group:3,paint:e=>(e[2]+9)*4%1<.5?s.BELLY:si(.4,.1)(e)});for(const e of[-.3,.3])n.seg([.2,.03,e],[2,.03,e],.03,.03,s.SHADES,{group:4,paint:t=>t[1]>.05?s.FRAME:void 0});for(let e=0;e<4;e++)n.box([.5+e*.45,.02,0],[.07,.02,.45],s.WOOD,{group:5,paint:t=>hn(t,9)<.3?s.MOSS:void 0});cr(n,12,1.4,6,12)}},"signal-gantry":{family:"landmark",path:"railway",desc:"a rusty signal gantry spanning the line, its signals dark",build(n){for(const e of[-2,2])for(const t of[-.15,.15])ai(n,[e,0,t],[e,3,t],1,.04);for(let e=0;e<8;e++){const t=-2+e*.5;ai(n,[t,2.8,0],[t+.5,3.1,0],2,.02),ai(n,[t,3.1,0],[t+.5,2.8,0],2,.02)}for(const e of[2.8,3.1])ai(n,[-2,e,0],[2,e,0],3,.035);for(const e of[-.8,.8])ai(n,[e,2.8,.05],[e,2.3,.05],4,.02),n.box([e,2.2,.08],[.12,.2,.05],s.SHADES,{round:.03,group:5,paint:t=>Math.hypot(t[0]-e,t[1]-2.27)<.05||Math.hypot(t[0]-e,t[1]-2.13)<.05?s.FRAME:void 0});fs(n,[-2,0,.2],[-1.95,2.4,.2],6,11)}}},a5=Object.entries(r5).map(([n,e])=>({id:n,...e}));Object.fromEntries(a5.map(n=>[n.id,n]));const ba=32,Au=15,Tu=ba/2,s5=(n,e)=>(n+.5-Tu)**2+(e+.5-Tu)**2<=Au*Au;Uint8Array.from({length:ba*ba},(n,e)=>s5(e%ba,e/ba|0)?1:0);const o5=[{k:"ambientHue",g:"Night light",label:"Twilight hue",min:0,max:1,step:.01,v:.68,hue:!0},{k:"ambient",g:"Night light",label:"Twilight brightness",min:.05,max:.6,step:.01,v:.22},{k:"moon",g:"Night light",label:"Moonlight",min:0,max:1,step:.01,v:.3},{k:"moonHue",g:"Night light",label:"Moon hue",min:0,max:1,step:.01,v:.58,hue:!0},{k:"glowHue",g:"Night light",label:"Witch glow hue",min:0,max:1,step:.01,v:.13,hue:!0},{k:"glowSat",g:"Night light",label:"Witch glow colour",min:0,max:1,step:.01,v:.35},{k:"glowRadius",g:"Night light",label:"Witch glow reach",min:30,max:200,step:5,v:110},{k:"glowPower",g:"Night light",label:"Witch glow strength",min:.3,max:2.5,step:.05,v:1.4},{k:"bands",g:"Shading",label:"Light steps",min:2,max:7,step:1,v:3},{k:"dither",g:"Shading",label:"Dithering",min:0,max:1,step:.05,v:.35},{k:"round",g:"Shading",label:"Roundness",min:.2,max:1.5,step:.05,v:.9},{k:"outline",g:"Shading",label:"Plant outline",options:["none","dark","tinted"],v:"none"},{k:"cOutline",g:"Shading",label:"Creature outline",options:["dark","tinted","none"],v:"dark"},{k:"shafts",g:"Night light",label:"Moonbeams",min:0,max:1,step:.05,v:.3},{k:"areaContrast",g:"Colour",label:"Difference between areas",min:0,max:1,step:.05,v:.6},{k:"sat",g:"Colour",label:"Saturation",min:.2,max:1.3,step:.01,v:.9},{k:"leafHue",g:"Colour",label:"Leaf hue",min:0,max:1,step:.01,v:.3,hue:!0},{k:"leafVariety",g:"Colour",label:"Leaf colour variety",min:0,max:1,step:.05,v:.3},{k:"trunkHue",g:"Colour",label:"Bark hue",min:0,max:1,step:.01,v:.07,hue:!0},{k:"groundHue",g:"Colour",label:"Ground hue",min:0,max:1,step:.01,v:.27,hue:!0},{k:"groundVal",g:"Colour",label:"Ground brightness",min:.15,max:.7,step:.01,v:.4},{k:"pixel",g:"Shading",label:"Pixel size",min:1,max:5,step:1,v:3},{k:"treeSize",g:"Trees",label:"Tree height",min:.5,max:1.5,step:.05,v:.85},{k:"crownWidth",g:"Trees",label:"Crown width",min:1,max:4,step:.1,v:3},{k:"clearing",g:"Trees",label:"Clearing size",min:0,max:1,step:.05,v:.55},{k:"depth",g:"Map",label:"Border detail (fractal layers)",min:0,max:6,step:1,v:4},{k:"areaScale",g:"Map",label:"Area size (screens)",min:.6,max:2,step:.05,v:1},{k:"areaTypes",g:"Map",label:"Area types",min:4,max:30,step:1,v:30},{k:"density",g:"Trees",label:"Foliage density",min:.2,max:1,step:.05,v:.55},{k:"clump",g:"Trees",label:"Clumpiness",min:0,max:1,step:.05,v:.6},{k:"gnarl",g:"Trees",label:"Gnarliness",min:0,max:1,step:.05,v:.5},{k:"roots",g:"Trees",label:"Roots",min:0,max:1,step:.05,v:.6},{k:"bark",g:"Trees",label:"Bark texture",min:0,max:1,step:.05,v:.6},{k:"trees",g:"Trees",label:"Tree density",min:.2,max:2,step:.05,v:1},{k:"wBroad",g:"Tree mix",label:"Gnarled broadleaf",min:0,max:1,step:.05,v:.8},{k:"wFir",g:"Tree mix",label:"Fir",min:0,max:1,step:.05,v:.6},{k:"wWillow",g:"Tree mix",label:"Willow",min:0,max:1,step:.05,v:.5},{k:"wBirch",g:"Tree mix",label:"Birch",min:0,max:1,step:.05,v:.5},{k:"wPalm",g:"Tree mix",label:"Tree fern",min:0,max:1,step:.05,v:.3},{k:"wFlat",g:"Tree mix",label:"Flat-crowned",min:0,max:1,step:.05,v:.5},{k:"bushes",g:"Undergrowth",label:"Bushes and shrubs",min:0,max:120,step:1,v:55},{k:"bushSize",g:"Undergrowth",label:"Bush size",min:.5,max:1.8,step:.05,v:1},{k:"flowers",g:"Undergrowth",label:"Flowers",min:0,max:1,step:.05,v:.3},{k:"cSat",g:"Creatures",label:"Creature saturation",min:.1,max:1,step:.01,v:.6},{k:"cVal",g:"Creatures",label:"Creature brightness",min:.4,max:1,step:.01,v:.85},{k:"head",g:"Creatures",label:"Baby head size",min:.3,max:.6,step:.01,v:.44},{k:"eye",g:"Creatures",label:"Eye size",min:.5,max:2,step:.05,v:1},{k:"legs",g:"Creatures",label:"Leg length",min:.5,max:1.8,step:.05,v:1},{k:"long",g:"Creatures",label:"Body length",min:.7,max:1.5,step:.05,v:1},{k:"size",g:"Creatures",label:"Baby size (px)",min:5,max:14,step:1,v:8},{k:"growth",g:"Creatures",label:"Legend vs baby height",min:5,max:25,step:1,v:20},{k:"magicHue",g:"Creatures",label:"Magic glow hue",min:0,max:1,step:.01,v:.5,hue:!0},{k:"fur",g:"Creatures",label:"Stripes and spots",min:0,max:1,step:.05,v:.5},{k:"cloakHue",g:"Witch",label:"Jacket hue",min:0,max:1,step:.01,v:.72,hue:!0},{k:"hairHue",g:"Witch",label:"Hair hue",min:0,max:1,step:.01,v:.01,hue:!0},{k:"hatHue",g:"Witch",label:"Hat hue",min:0,max:1,step:.01,v:.74,hue:!0},{k:"topHue",g:"Witch",label:"Top hue",min:0,max:1,step:.01,v:.13,hue:!0},{k:"jeansHue",g:"Witch",label:"Jeans hue",min:0,max:1,step:.01,v:.6,hue:!0},{k:"shoeHue",g:"Witch",label:"Sneakers hue",min:0,max:1,step:.01,v:0,hue:!0},{k:"phonesHue",g:"Witch",label:"Headphones hue",min:0,max:1,step:.01,v:.92,hue:!0}];function l5(){const n={};return o5.forEach(e=>n[e.k]=e.v),n}function c5(n,e,t,i,r){const a=Yu(e.type).fn,o={...t,leafHue:n.leaf+(e.dark?.05:0),gnarl:e.gnarl??t.gnarl,treeBare:e.bare,treeTrunks:e.trunks,treeLean:e.lean,treeThick:e.thick,treeThin:e.thin,treeHollow:e.hollow,treeWebs:e.webs},l=a(i,o,t.treeSize*r*(e.scale||1)*ce(i,.9,1.1)),c=Bl(i,o,a);return e.dark&&(c[s.LEAF]=c[s.LEAF3],c[s.LEAF3]=me(n.leaf+.05,.7,.22)),c[s.NOSE]=[20,16,24],c[s.GLINT]=[235,235,240],{parts:wf(l),colours:c}}function u5(n,e,t,i,r){const a=Mi[t].id,o=Oa.find(p=>p.id===a),l=Gf(a,n,{K:i,makeCanvas:r}),c=[],u=p=>c.push(p)-1,h={big:[],small:[],walls:[],set:null},f=(p,g)=>$r(p,g,n,"none",r),d=(p,g)=>{const{parts:x,colours:M}=c5(o,p,n,Aa(e*13+t*101+g*7+1),i);return{bot:u(f(x.bot,M)),top:u(f(x.top,M))}};o.big.forEach(([p,g],x)=>{if(p!=="tree"){h.big.push({bot:u(l.big[x].sp),top:null});return}const M=g.minor,m=o.big.filter(([,y])=>!y.minor).length||1,_=M?1:Math.max(1,Math.round(Ku/m));for(let y=0;y<_;y++)h.big.push(d(g,x*17+y))}),o.small.forEach(([p,g],x)=>h.small.push(p==="tree"?d(g,500+x):{bot:u(l.small[x].sp),top:null}));for(const p of l.walls)h.walls.push(u(p.sp));return l.setPiece&&(h.set=o.set?.[0]==="tree"?d(o.set[1],900):{bot:u(l.setPiece.sp),top:null}),{sprites:c,layout:h,floor:l.floor.sp}}function h5(n,e,t){const i=[];for(let r=0;r<3;r++)for(let a=0;a<2;a++)i.push($r($d(e,r,a,n),Kd(e,n),n,n.cOutline,t));return i}const d5=(n,e)=>n*2+e;function Ns(n,e,t){return n.getContext("2d").getImageData(0,0,e,t).data}function Cl(n,e=2048){const i=[];let r=0,a=0,o=0,l=1;for(const d of n)r+d.w+1>e&&(r=0,a+=o+1,o=0),i.push({x:r,y:a}),r+=d.w+1,o=Math.max(o,d.h),l=Math.max(l,r);const c=Math.max(1,a+o),u=new Uint8Array(l*c*4),h=new Uint8Array(l*c*4),f=n.map((d,p)=>{const g=i[p],x=Ns(d.A,d.w,d.h),M=Ns(d.N,d.w,d.h);for(let m=0;m<d.h;m++){const _=m*d.w*4,y=((g.y+m)*l+g.x)*4;u.set(x.subarray(_,_+d.w*4),y),h.set(M.subarray(_,_+d.w*4),y)}return{uv:[g.x/l,g.y/c,(g.x+d.w)/l,(g.y+d.h)/c],w:d.w,h:d.h}});return{albedo:u,normal:h,width:l,height:c,frames:f}}function f5(n,e){if(n.kind==="creature")return{px:Cl(h5(n.style,n.id,e),1024)};const{sprites:t,layout:i,floor:r}=u5(n.style,n.seed,n.id,n.K,e);return{px:Cl(t),layout:i,floor:{albedo:new Uint8Array(Ns(r.A,r.w,r.h)),normal:new Uint8Array(Ns(r.N,r.w,r.h)),w:r.w,h:r.h}}}function Ru(n,e,t){const i=new Yr(n,e,t,Hn,On);return i.magFilter=tn,i.minFilter=tn,i.generateMipmaps=!1,i.flipY=!1,i.colorSpace=Zn,i.needsUpdate=!0,i}function zh(n){return{albedo:Ru(n.albedo,n.width,n.height),normal:Ru(n.normal,n.width,n.height),frames:n.frames}}const Cu=(n,e=2048)=>zh(Cl(n,e));class p5{constructor(e,t,i){if(this.style=e,this.seed=t,this.K=2/i,this.witch=Cu([$r(_d(),hd(e),e,"dark")]),this.stones=Cu([0,1,2,3].map(r=>this.stone(r))),this.useWorkers=typeof Worker<"u"&&typeof OffscreenCanvas<"u",this.useWorkers){const r=Math.max(1,Math.min(3,(navigator.hardwareConcurrency||2)-1));try{for(let a=0;a<r;a++){const o=new Worker(new URL(""+new URL("artWorker-nzZuBRk8.js",import.meta.url).href,import.meta.url),{type:"module"}),l={w:o,busy:!1};o.onmessage=c=>{l.busy=!1,l.job=void 0,this.receive(c.data),this.dispatch()},o.onerror=()=>{this.useWorkers=!1,l.job&&this.queue.unshift(l.job),l.busy=!1,l.job=void 0},this.workers.push(l)}}catch{this.useWorkers=!1}}}style;seed;types=new Map;creatures=new Map;queue=[];inFlight=new Set;workers=[];useWorkers;witch;stones;K;version=0;onFloor=()=>{};stone(e){const t=Aa(this.seed*3+e),i=5+Math.floor(t()*3),r=7+Math.floor(t()*5),a=new qt(i+2,r+1);return a.ellipse((i+2)/2,r/2+1,i/2,r/2+.5,s.BODY,{round:this.style.round}),a.ellipse((i+2)/2-1,r/2,i/3,r/3,s.BODY2,{round:this.style.round,onlyOn:new Set([s.BODY]),density:.5,seed:e}),$r(a,{[s.BODY]:[178,174,162],[s.BODY2]:[140,138,130]},this.style,"dark")}key=e=>e.kind+":"+e.id;ask(e){const t=this.key(e);this.inFlight.has(t)||(this.inFlight.add(t),this.queue.push(e),this.dispatch())}dispatch(){if(this.useWorkers)for(const e of this.workers)e.busy||!this.queue.length||(e.busy=!0,e.job=this.queue.shift(),e.w.postMessage(e.job))}receive(e){if(!e.result){console.warn("art worker failed, drawing on the page:",e.error),this.useWorkers=!1,this.queue.unshift(e.job);return}const t=zh(e.result.px);e.job.kind==="type"?(this.types.set(e.job.id,{atlas:t,layout:e.result.layout}),e.result.floor&&this.onFloor(e.job.id,e.result.floor)):this.creatures.set(e.job.id,{atlas:t,frame:d5}),this.inFlight.delete(this.key(e.job)),this.version++}typeArt(e){const t=this.types.get(e);return t||this.ask({kind:"type",id:e,style:this.style,seed:this.seed,K:this.K}),t}creatureArt(e){const t=this.creatures.get(e);return t||this.ask({kind:"creature",id:e,style:this.style}),t}prefetchType(e){this.types.has(e)||this.typeArt(e)}get pending(){return this.inFlight.size}work(e){if(this.useWorkers)return;const t=performance.now();let i=0;for(;this.queue.length&&(i===0||performance.now()-t<e);){const r=this.queue.shift();this.receive({job:r,result:f5(r,(a,o)=>{const l=document.createElement("canvas");return l.width=a,l.height=o,l})}),i++}}whenIdle(){return new Promise(e=>{const t=()=>{this.work(50),this.pending?setTimeout(t,30):e()};t()})}}const jt={uAmb:{value:new Y},uMoon:{value:new Y},uMoonDir:{value:new Y(-.45,.75,.5).normalize()},uMoonBeam:{value:new Y},uBands:{value:4},uDither:{value:.35},uShafts:{value:.3},uShaftScale:{value:1},uGlowPos:{value:new Y},uGlowRgb:{value:new Y},uGlowR:{value:8},uGlowPower:{value:1.4},uHazeCentre:{value:new Ze},uHazeRange:{value:new Ze(70,200)},uHazeColour:{value:new Y},uTime:{value:0}};function g5(n,e,t){const i=(r,a)=>new Y(r[0]/255*a,r[1]/255*a,r[2]/255*a);jt.uAmb.value.copy(i(me(n.ambientHue,.55,1),n.ambient)),jt.uMoon.value.copy(i(me(n.moonHue,.35,1),n.moon)),jt.uMoonBeam.value.copy(i(me(n.moonHue,.35,1),n.shafts*.25)),jt.uBands.value=n.bands,jt.uDither.value=n.dither*.5,jt.uShafts.value=n.shafts,jt.uShaftScale.value=t*2,jt.uGlowRgb.value.copy(i(me(n.glowHue,n.glowSat,1),1)),jt.uGlowR.value=e,jt.uGlowPower.value=n.glowPower,jt.uHazeColour.value.copy(i(me(n.ambientHue,.45,1),.16))}const Gs=`
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
`,ur=2,on=32,dr=8,m5=`
varying vec3 vWorld;
void main() {
  vec4 w = modelMatrix * vec4(position, 1.0);
  vWorld = w.xyz;
  gl_Position = projectionMatrix * viewMatrix * w;
}
`,M5=`
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
${Gs}
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
    vec2 cell = vec2(mod(float(t), ${dr}.0), floor(float(t) / ${dr}.0));
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
`;class x5{constructor(e,t,i){this.map=e;const r=e.extent,a=r.maxX-r.minX,o=r.maxZ-r.minZ,l=Math.ceil(a*ur/on)*on,c=Math.ceil(o*ur/on)*on;this.tilesX=l/on,this.tilesZ=c/on,this.filled=new Uint8Array(this.tilesX*this.tilesZ);const u=p=>(p.magFilter=p.minFilter=tn,p.generateMipmaps=!1,p.colorSpace=Zn,p.needsUpdate=!0,p);this.texture=u(new Yr(new Uint8Array(l*c*4),l,c)),u(this.tile),this.floors=u(new Yr(new Uint8Array(64*dr*48*4*4),64*dr,192));const h=Array.from({length:32},(p,g)=>new Y(...Mi[g]?.floor??[.25,.45,.4])),f=new vn({vertexShader:m5,fragmentShader:M5,uniforms:{...jt,uAreas:{value:this.texture},uExtent:{value:new kt(r.minX,r.minZ,l/ur,c/ur)},uPixel:{value:i},uTypeFloor:{value:h},uFloorReady:{value:this.floorReady},uFloors:{value:this.floors},uTile:{value:new Ze(64,48)},uFloorsSize:{value:new Ze(64*dr,192)},uSat:{value:t.sat},uFloor:{value:new Y(e.dancefloor.x,e.dancefloor.z,e.dancefloor.radius)},uCanopy:{value:new kt},uClearing:{value:new Ze(e.tuning.clearingSize,e.tuning.clearingFalloff)}}}),d=new bi(a+400,o+400);d.rotateX(-Math.PI/2),this.mesh=new wn(d,f),this.mesh.position.set((r.minX+r.maxX)/2,0,(r.minZ+r.maxZ)/2)}map;mesh;texture;tile=new Yr(new Uint8Array(on*on*4),on,on);filled;tilesX;tilesZ;initialised=!1;floorReady=new Array(32).fill(0);floors;pendingFloors=[];setCanopyShadow(e,t,i,r){this.mesh.material.uniforms.uCanopy.value.set(e,t,i,r)}setFloor(e,t){this.pendingFloors.push([e,t])}placeFloors(e){for(const[t,i]of this.pendingFloors){const r=this.mesh.material,a=r.uniforms.uTile.value;if(i.w!==a.x||i.h!==a.y)continue;const o=new Yr(i.albedo,i.w,i.h);o.needsUpdate=!0,e.copyTextureToTexture(o,this.floors,null,new Ze(t%dr*i.w,Math.floor(t/dr)*i.h)),o.dispose(),this.floorReady[t]=1}this.pendingFloors=[]}fill(e,t,i,r,a){this.initialised||(e.initTexture(this.texture),e.initTexture(this.floors),this.initialised=!0),this.pendingFloors.length&&this.placeFloors(e);const o=this.map.extent,l=on/ur,c=(t-o.minX)/l,u=(i-o.minZ)/l,h=Math.ceil(r/l),f=[];for(let g=Math.max(0,Math.floor(u)-h);g<=Math.min(this.tilesZ-1,Math.floor(u)+h);g++)for(let x=Math.max(0,Math.floor(c)-h);x<=Math.min(this.tilesX-1,Math.floor(c)+h);x++)this.filled[g*this.tilesX+x]||f.push([x,g,(x+.5-c)**2+(g+.5-u)**2]);f.sort((g,x)=>g[2]-x[2]);const d=performance.now();let p=0;for(const[g,x]of f){if(p>0&&performance.now()-d>a)break;this.fillTile(e,g,x),p++}return f.length-p}fillTile(e,t,i){const r=this.map.extent,a=this.tile.image.data;for(let o=0;o<on;o++)for(let l=0;l<on;l++){const c=r.minX+(t*on+l+.5)/ur,u=r.minZ+(i*on+o+.5)/ur,h=this.map.areaAt(c,u),f=(o*on+l)*4;a[f]=h.type,a[f+1]=Math.round(h.openness*255),a[f+2]=0,a[f+3]=255}this.tile.needsUpdate=!0,e.copyTextureToTexture(this.tile,this.texture,null,new Ze(t*on,i*on)),this.filled[i*this.tilesX+t]=1}dispose(){this.texture.dispose(),this.tile.dispose(),this.mesh.geometry.dispose(),this.mesh.material.dispose()}}const _5="varying vec2 vUv; void main() { vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }",v5=`
uniform sampler2D uScene; uniform float uThreshold; varying vec2 vUv;
void main() {
  vec3 c = texture2D(uScene, vUv).rgb;
  float l = max(c.r, max(c.g, c.b));
  gl_FragColor = vec4(c * smoothstep(uThreshold, uThreshold + 0.25, l), 1.0);
}`,b5=`
uniform sampler2D uSrc; uniform vec2 uStep; varying vec2 vUv;
void main() {
  vec3 c = texture2D(uSrc, vUv).rgb * 0.227;
  c += (texture2D(uSrc, vUv + uStep * 1.38).rgb + texture2D(uSrc, vUv - uStep * 1.38).rgb) * 0.316;
  c += (texture2D(uSrc, vUv + uStep * 3.23).rgb + texture2D(uSrc, vUv - uStep * 3.23).rgb) * 0.070;
  gl_FragColor = vec4(c, 1.0);
}`,S5=`
uniform sampler2D uScene, uBloom; uniform vec2 uLow; uniform float uBloomStrength; varying vec2 vUv;
void main() {
  vec2 p = (floor(vUv * uLow) + 0.5) / uLow;
  vec3 c = texture2D(uScene, p).rgb + texture2D(uBloom, vUv).rgb * uBloomStrength;
  gl_FragColor = vec4(min(c, vec3(1.0)), 1.0);
}`,E5=`
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
}`;function Ma(n,e,t,i=!1){const r=new Gn(Math.max(1,n),Math.max(1,e),{minFilter:t,magFilter:t,depthBuffer:i,generateMipmaps:!1});return r.texture.colorSpace=Zn,r}class y5{constructor(e,t){this.renderer=e,this.tuning=t,this.scene=Ma(1,1,$t,!0);const i=(r,a)=>new vn({vertexShader:_5,fragmentShader:r,uniforms:a,depthTest:!1,depthWrite:!1});this.mats={bright:i(v5,{uScene:{value:null},uThreshold:{value:.6}}),blur:i(b5,{uSrc:{value:null},uStep:{value:new Ze}}),composite:i(S5,{uScene:{value:null},uBloom:{value:null},uLow:{value:new Ze},uBloomStrength:{value:0}}),tilt:i(E5,{uSrc:{value:null},uTexel:{value:new Ze},uDir:{value:new Ze},uStrength:{value:0},uBand:{value:.4},uCentre:{value:.5}})},this.quad=new wn(new bi(2,2),this.mats.composite),this.quad.frustumCulled=!1}renderer;tuning;scene;bright=Ma(1,1,$t);bloomB=Ma(1,1,$t);a=Ma(1,1,$t);b=Ma(1,1,$t);quad;cam=new Ql(-1,1,1,-1,0,1);mats;low=new Ze(1,1);out=new Ze(1,1);get fullResolution(){return this.tuning.tiltShift.on&&this.tuning.tiltShift.where==="after"}resize(e,t,i,r){this.low.set(e,t),this.out.set(i,r),this.scene.setSize(e,t);const a=Math.max(1,Math.round(e/2)),o=Math.max(1,Math.round(t/2));this.bright.setSize(a,o),this.bloomB.setSize(a,o);const l=this.fullResolution?i:e,c=this.fullResolution?r:t;this.a.setSize(l,c),this.b.setSize(l,c)}pass(e,t,i){const r=this.mats[e];i(r.uniforms),this.quad.material=r,this.renderer.setRenderTarget(t),this.renderer.render(this.quad,this.cam)}render(e,t){const i=this.renderer,r=this.tuning;i.setRenderTarget(this.scene),i.render(e,t);const a=r.bloom.on&&r.bloom.strength>0;if(a){const f=this.bright.width,d=this.bright.height;this.pass("bright",this.bright,p=>{p.uScene.value=this.scene.texture,p.uThreshold.value=r.bloom.threshold});for(let p=0;p<2;p++)this.pass("blur",this.bloomB,g=>{g.uSrc.value=this.bright.texture,g.uStep.value.set(1/f,0)}),this.pass("blur",this.bright,g=>{g.uSrc.value=this.bloomB.texture,g.uStep.value.set(0,1/d)})}const o=r.tiltShift.on&&r.tiltShift.strength>0;if(this.pass("composite",o?this.a:null,f=>{f.uScene.value=this.scene.texture,f.uBloom.value=this.bright.texture,f.uLow.value.copy(this.low),f.uBloomStrength.value=a?r.bloom.strength:0}),!o)return;const l=this.a.width,c=this.a.height,u=this.fullResolution?this.out.y/this.low.y:1,h=f=>{f.uTexel.value.set(1/l,1/c),f.uStrength.value=r.tiltShift.strength*u,f.uBand.value=r.tiltShift.band,f.uCentre.value=1-r.tiltShift.centre};this.pass("tilt",this.b,f=>{h(f),f.uSrc.value=this.a.texture,f.uDir.value.set(1,0)}),this.pass("tilt",null,f=>{h(f),f.uSrc.value=this.b.texture,f.uDir.value.set(0,1)})}}const w5=`
varying vec3 vWorld;
void main() {
  vec4 w = modelMatrix * vec4(position, 1.0);
  vWorld = w.xyz;
  gl_Position = projectionMatrix * viewMatrix * w;
}`,A5=`
uniform float uStrength, uWind, uPixel;
varying vec3 vWorld;
${Gs}
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
}`;class T5{constructor(e,t,i,r){this.height=t,this.mat=new vn({vertexShader:w5,fragmentShader:A5,uniforms:{...jt,uStrength:{value:e},uWind:{value:i},uPixel:{value:r}},depthWrite:!1}),this.mesh=new wn(new bi(700,700).rotateX(-Math.PI/2),this.mat),this.mesh.frustumCulled=!1,this.mesh.renderOrder=2}height;mesh;mat;follow(e,t){this.mesh.position.set(e,this.height,t-150)}}const R5=`
attribute vec4 iShadow; // x, z, width, depth (metres)
varying vec2 vLocal;
varying vec3 vWorld;
void main() {
  vLocal = position.xz * 2.0;
  vec3 w = vec3(iShadow.x + position.x * iShadow.z, 0.03, iShadow.y + position.z * iShadow.w);
  vWorld = w;
  gl_Position = projectionMatrix * viewMatrix * vec4(w, 1.0);
}`,C5=`
uniform float uStrength;
varying vec2 vLocal;
varying vec3 vWorld;
${Gs}
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
}`;class L5{mesh;geo=new Ah;attr;capacity=0;constructor(e){const t=new bi(1,1).rotateX(-Math.PI/2);this.geo.index=t.index,this.geo.setAttribute("position",t.getAttribute("position")),this.attr=this.grow(1024);const i=new vn({vertexShader:R5,fragmentShader:C5,uniforms:{...jt,uStrength:{value:e}},depthWrite:!1});this.mesh=new wn(this.geo,i),this.mesh.frustumCulled=!1,this.mesh.renderOrder=1}grow(e){return this.capacity=Math.max(e,this.capacity*2),this.attr=new bh(new Float32Array(this.capacity*4),4),this.attr.setUsage(fh),this.geo.setAttribute("iShadow",this.attr),this.attr}set(e){e.length>this.capacity&&this.grow(e.length);const t=this.attr.array;e.forEach((i,r)=>{t[r*4]=i.x,t[r*4+1]=i.z,t[r*4+2]=i.w,t[r*4+3]=i.d}),this.attr.needsUpdate=!0,this.geo.instanceCount=e.length,this.mesh.visible=e.length>0}}const Wr={uRight:{value:new Y(1,0,0)},uUp:{value:new Y(0,1,0)},uFacing:{value:new Y(0,0,1)},uTopFade:{value:0}},D5=`
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
`,P5=`
uniform sampler2D uAlbedo, uNormal;
uniform vec3 uRight, uUp, uFacing;
uniform float uTopFade, uUnlit;
varying vec2 vUv;
varying vec3 vWorld;
varying vec2 vFlags;
${Gs}
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
`;class ps{constructor(e,t,i={}){this.atlas=e,this.metresPerPixel=t;const r=new bi(1,1);r.translate(0,.5,0),this.geo=new Ah,this.geo.index=r.index,this.geo.setAttribute("position",r.getAttribute("position")),this.geo.setAttribute("uv",r.getAttribute("uv")),this.pos=this.size=this.uvs=this.flags=void 0,this.grow(64);const a=new vn({vertexShader:D5,fragmentShader:P5,uniforms:{...jt,...Wr,uAlbedo:{value:e.albedo},uNormal:{value:e.normal},uUnlit:{value:i.unlit?1:0}},depthTest:!i.onTop,depthWrite:!i.onTop});this.mesh=new wn(this.geo,a),this.mesh.frustumCulled=!1,i.onTop&&(this.mesh.renderOrder=10)}atlas;metresPerPixel;mesh;geo;pos;size;uvs;flags;capacity=0;count=0;grow(e){const t=Math.max(e,this.capacity*2),i=(r,a)=>{const o=new bh(new Float32Array(t*r),r);return o.setUsage(fh),a&&o.array.set(a.array),o};this.pos=i(3,this.pos),this.size=i(2,this.size),this.uvs=i(4,this.uvs),this.flags=i(2,this.flags),this.geo.setAttribute("iPos",this.pos),this.geo.setAttribute("iSize",this.size),this.geo.setAttribute("iUv",this.uvs),this.geo.setAttribute("iFlags",this.flags),this.capacity=t}set(e){e.length>this.capacity&&this.grow(e.length);const t=this.pos.array,i=this.size.array,r=this.uvs.array,a=this.flags.array;e.forEach((o,l)=>{t[l*3]=o.x,t[l*3+1]=o.y,t[l*3+2]=o.z,i[l*2]=o.frame.w*this.metresPerPixel,i[l*2+1]=o.frame.h*this.metresPerPixel,r.set(o.frame.uv,l*4),a[l*2]=o.flip?1:0,a[l*2+1]=o.top?1:0});for(const o of[this.pos,this.size,this.uvs,this.flags])o.needsUpdate=!0;this.count=e.length,this.geo.instanceCount=e.length,this.mesh.visible=e.length>0}dispose(){this.geo.dispose(),this.mesh.material.dispose(),this.atlas.albedo.dispose(),this.atlas.normal.dispose()}}class O5{constructor(e,t,i){this.canvas=e,this.game=t,this.style=i;const r=t.tuning;this.renderer=new Cx({canvas:e,antialias:!1,powerPreference:"high-performance",preserveDrawingBuffer:!0}),this.renderer.setPixelRatio(1),this.renderer.info.autoReset=!1,this.renderer.outputColorSpace=La,this.mpp=1/(r.artPixelsPerMetre*(2/r.pixelSize)),this.camera=new kn(r.camera.fov,1,1,900),this.post=new y5(this.renderer,r),this.scene.background=new Mt(723478),g5(i,r.glowReach,this.mpp),this.assets=new p5(i,t.seed,r.pixelSize),this.ground=new x5(t.map,i,this.mpp),this.assets.onFloor=(u,h)=>this.ground.setFloor(u,h);const a=r.canopyShadow;this.ground.setCanopyShadow(a.on?a.strength:0,a.height,a.cover,a.wind),this.shadows=new L5(r.shadows.strength),this.shadows.mesh.visible=r.shadows.on,this.scene.add(this.shadows.mesh),r.mist.on&&r.mist.strength>0&&(this.mist=new T5(r.mist.strength,r.mist.height,r.mist.wind,this.mpp),this.scene.add(this.mist.mesh)),jt.uHazeRange.value.set(r.haze.near,r.haze.far),this.scene.add(this.ground.mesh),this.witchBatch=new ps(this.assets.witch,this.mpp,{unlit:!0,onTop:!0}),this.scene.add(this.witchBatch.mesh),this.stoneBatch=new ps(this.assets.stones,this.mpp),this.scene.add(this.stoneBatch.mesh);const o=t.map.dancefloor,l=[];for(let u=0;u<9;u++){const h=u/9*Math.PI*2+.3;l.push({x:o.x+Math.cos(h)*o.radius,y:0,z:o.z+Math.sin(h)*o.radius,frame:this.assets.stones.frames[u%4],flip:u%2===0})}this.stoneBatch.set(l);const c=new vn({transparent:!1,depthWrite:!1,vertexShader:"varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }",fragmentShader:"varying vec2 vUv; void main(){ vec2 p = vUv * 2.0 - 1.0; if (dot(p, p) > 1.0 || mod(floor(gl_FragCoord.x) + floor(gl_FragCoord.y), 2.0) > 0.5) discard; gl_FragColor = vec4(0.02, 0.02, 0.05, 1.0); }"});this.shadow=new wn(new bi(1.4,.7).rotateX(-Math.PI/2),c),this.shadow.renderOrder=1,this.scene.add(this.shadow)}canvas;game;style;renderer;scene=new d1;camera;ground;assets;typeBatches=new Map;creatureBatches=new Map;witchBatch;stoneBatch;shadow;mpp;lastBuild={x:1/0,y:1/0,z:1/0,version:-1};post;shadows;shadowList=[];mist=null;width=1;height=1;stats={trees:0,bushes:0,creatures:0,batches:0,drawCalls:0,pendingArt:0,pendingGround:0};resize(e,t){const i=this.game.tuning.pixelSize;this.width=Math.max(1,Math.ceil(e/i)),this.height=Math.max(1,Math.ceil(t/i));const r=this.post.fullResolution?i:1;this.renderer.setSize(this.width*r,this.height*r,!1),this.post.resize(this.width,this.height,this.width*r,this.height*r),this.canvas.style.width=this.width*i+"px",this.canvas.style.height=this.height*i+"px",this.camera.aspect=this.width/this.height,this.camera.updateProjectionMatrix()}async prepare(){this.render(0,!1),this.drawCreatures(),this.ground.fill(this.renderer,this.game.witch.x,this.game.witch.z,50,1/0),await this.assets.whenIdle(),this.updateFrustum(),this.refresh(!0);for(let e=0;e<Mi.length;e++)this.assets.prefetchType(e);for(const e of Mi)this.assets.creatureArt(e.creature)}batchFor(e,t,i){let r=e.get(t);return r||(r=i(),r&&(e.set(t,r),this.scene.add(r.mesh))),r}frustum=new Jl;box=new ia;m4=new Kt;v3=new Y;drawn=new Set;pops=[];updateFrustum(){this.camera.updateMatrixWorld(),this.m4.multiplyMatrices(this.camera.projectionMatrix,this.camera.matrixWorldInverse),this.frustum.setFromProjectionMatrix(this.m4)}viewRect(e,t){const i=this.camera,r=i.position,a=this.game.witch,o=[];for(const u of[-1,1])for(const h of[-1,1]){const f=this.v3.set(u,h,1).unproject(i).sub(r).normalize();for(const d of[0,25]){let p=f.y<-.001?(d-r.y)/f.y:1/0;p>0||(p=1/0),p=Math.min(p,e+r.distanceTo(new Y(a.x,r.y,a.z))+t),o.push([r.x+f.x*p,r.z+f.z*p])}}o.push([r.x,r.z]);const l=o.map(u=>u[0]),c=o.map(u=>u[1]);return{minX:Math.min(...l)-t,maxX:Math.max(...l)+t,minZ:Math.min(...c)-t,maxZ:Math.max(...c)+t}}inView(e,t,i,r,a){const o=this.game.witch.x,l=this.game.witch.z,c=this.game.tuning.haze.far+a;return(e-o)**2+(t-l)**2>c*c?!1:(this.box.min.set(e-i/2-a,-a,t-r-a),this.box.max.set(e+i/2+a,r+a,t+a),this.frustum.intersectsBox(this.box))}inInnerView(e,t,i){const r=this.game.witch;if(Math.hypot(e-r.x,t-r.z)>this.game.tuning.haze.near)return!1;for(const a of[0,i]){const o=this.v3.set(e,a,t).project(this.camera);if(Math.abs(o.x)<.85&&Math.abs(o.y)<.85&&o.z<1)return!0}return!1}refresh(e=!1){const t=this.game,i=t.tuning,r=this.camera,a=i.viewMargin,o={x:r.position.x,y:r.position.y,z:r.position.z};if(!e&&Math.hypot(o.x-this.lastBuild.x,o.y-this.lastBuild.y,o.z-this.lastBuild.z)<a/3&&this.assets.version===this.lastBuild.version)return;this.lastBuild={...o,version:this.assets.version};const l=this.viewRect(i.haze.far,a),c=(l.minX+l.maxX)/2,u=(l.minZ+l.maxZ)/2,h=Math.max(l.maxX-l.minX,l.maxZ-l.minZ)/2,f=[],d=jt.uMoonDir.value,p=-d.x/Math.max(.2,d.y),g=-d.z/Math.max(.2,d.y),x=new Map,M=new Set,m=(A,D)=>{let b=x.get(A);b||x.set(A,b=[]),b.push(D)},_=this.mpp;let y=0,S=0;for(const A of t.forest.treesNear(c,u,h)){const D=this.assets.typeArt(A.type);if(!D||!D.layout.big.length)continue;const b=D.atlas.frames,w=D.layout.big[A.variant%D.layout.big.length],L=b[w.top??w.bot];if(!this.inView(A.x,A.z,L.w*_,L.h*_,a))continue;m(A.type,{x:A.x,y:0,z:A.z,frame:b[w.bot],flip:A.flip}),w.top!==null&&m(A.type,{x:A.x,y:0,z:A.z,frame:b[w.top],flip:A.flip,top:!0});const C=L.w*_,I=L.h*_*(w.top===null?.2:.6);f.push({x:A.x+p*I,z:A.z+g*I,w:C*.8,d:C*.45}),M.add(`${A.x.toFixed(2)},${A.z.toFixed(2)},${L.h*_}`),y++}const R=(A,D)=>{for(const b of A){const w=this.assets.typeArt(b.type);if(!w)continue;const L=D(w.layout);if(!L.length)continue;const C=L[b.variant%L.length],I=w.atlas.frames,N=I[C.bot],O=I[C.top??C.bot];this.inView(b.x,b.z,O.w*_,O.h*_,a)&&(m(b.type,{x:b.x,y:0,z:b.z,frame:N,flip:b.flip}),C.top!==null&&m(b.type,{x:b.x,y:0,z:b.z,frame:I[C.top],flip:b.flip,top:!0}),f.push({x:b.x,z:b.z,w:N.w*_*.8,d:N.w*_*.3}),S++)}};R(t.forest.bushesNear(c,u,h),A=>A.small),R(t.forest.wallsNear(c,u,h),A=>A.walls.map(D=>({bot:D,top:null}))),R(t.forest.setPiecesNear(c,u,h),A=>A.set===null?[]:[A.set]);for(const[A,D]of this.typeBatches)x.has(A)||D.set([]);for(const[A,D]of x)this.batchFor(this.typeBatches,A,()=>{const w=this.assets.typeArt(A);return w&&new ps(w.atlas,_)})?.set(D);if(!e&&this.assets.pending===0){const A=(D,b)=>{const[w,L,C]=D.split(",").map(Number);this.inInnerView(w,L,C)&&this.pops.push(`${b} ${w.toFixed(0)},${L.toFixed(0)}`)};for(const D of M)this.drawn.has(D)||A(D,"appeared");for(const D of this.drawn)M.has(D)||A(D,"vanished")}this.drawn=M,this.stats.trees=y,this.stats.bushes=S,this.shadowList=f}drawCreatures(){const e=this.game,t=e.camera,i=e.tuning.haze.far,r=new Map,a=[];let o=0;for(const l of e.creatures){if(Math.abs(l.x-t.tx)>i||Math.abs(l.z-t.tz)>i)continue;const c=this.assets.creatureArt(l.species);if(!c)continue;const u=c.atlas.frames[c.frame(l.level,l.moving?Math.floor(l.walk)%2:0)];if(!this.inView(l.x,l.z,u.w*this.mpp,u.h*this.mpp,4))continue;let h=r.get(l.species);h||r.set(l.species,h=[]),h.push({x:l.x,y:0,z:l.z,frame:u,flip:l.facing<0}),a.push({x:l.x,z:l.z,w:u.w*this.mpp*.7,d:u.w*this.mpp*.25}),o++}for(const[l,c]of this.creatureBatches)r.has(l)||c.set([]);for(const[l,c]of r)this.batchFor(this.creatureBatches,l,()=>{const h=this.assets.creatureArt(l);return h&&new ps(h.atlas,this.mpp)})?.set(c);this.stats.creatures=o,this.game.tuning.shadows.on&&this.shadows.set(this.shadowList.concat(a))}render(e,t=!0){const i=this.game,r=i.tuning,a=c0(i),o=a.angle*Math.PI/180,l=2*a.distance*Math.tan(r.camera.fov*Math.PI/360)/this.height,c=new Y(0,Math.cos(o),-Math.sin(o)),u=new Y(a.tx,a.ty,a.tz),h=u.dot(c),f=u.x;u.addScaledVector(c,Math.round(h/l)*l-h),u.x+=Math.round(f/l)*l-f;const d=new Y(0,Math.sin(o),Math.cos(o)).multiplyScalar(a.distance);this.camera.position.copy(u).add(d),this.camera.up.set(0,1,0),this.camera.lookAt(u);const p=r.spriteTilt;Wr.uUp.value.set(0,1,0).lerp(c,p).normalize(),Wr.uFacing.value.crossVectors(Wr.uRight.value,Wr.uUp.value).normalize(),Wr.uTopFade.value=Zs(i.witch);const g=i.witch,x=kl(g,r);jt.uGlowPos.value.set(g.x,x+r.glowHeight,g.z),jt.uHazeCentre.value.set(g.x,g.z),jt.uTime.value=e,this.mist?.follow(a.tx,a.tz);const M=Math.sin(e*2.4)*.12;this.witchBatch.set([{x:g.x,y:x+M-.4,z:g.z,frame:this.assets.witch.frames[0],flip:g.facing<0}]),this.shadow.position.set(g.x,.03,g.z),this.shadow.scale.setScalar(1-.5*Zs(g)),this.updateFrustum(),this.refresh(),this.drawCreatures(),this.assets.work(6);const m=li(r.haze.near,r.haze.far,Zs(g))*.8;this.stats.pendingGround=this.ground.fill(this.renderer,a.tx,a.tz-m*.5,m,3),this.stats.pendingArt=this.assets.pending,t&&(this.renderer.info.reset(),this.post.render(this.scene,this.camera),this.stats.drawCalls=this.renderer.info.render.calls,this.stats.batches=this.typeBatches.size+this.creatureBatches.size)}}const I5="The art style: knobs from the Witch Art Lab. Paste a style saved in the Lab here (its whole saved JSON, or just its style object). Any knob left out follows the Lab's current default, so an empty style means the Lab's default look, and stays up to date as the art changes.",N5="Lab default",F5={},U5={_readme:I5,name:N5,style:F5};function B5(n=U5){const e=n??{},t=e.style&&typeof e.style=="object"?e.style:e,i=l5();for(const[r,a]of Object.entries(t))r in i&&(i[r]=a);return i}function k5(n,e){const t=n.querySelector("#stick"),i=t.querySelector(".knob"),r=56;let a=null,o=0,l=0;const c=()=>n.classList.add("touch"),u=n.querySelector("#stick-zone");u.addEventListener("pointerdown",d=>{if(!(d.pointerType==="mouse"||a!==null)){c(),a=d.pointerId,o=d.clientX,l=d.clientY,t.style.left=o+"px",t.style.top=l+"px",t.classList.add("on");try{u.setPointerCapture(d.pointerId)}catch{}d.preventDefault()}}),u.addEventListener("pointermove",d=>{if(d.pointerId!==a)return;let p=d.clientX-o,g=d.clientY-l;const x=Math.hypot(p,g);x>r&&(p*=r/x,g*=r/x),i.style.transform=`translate(${p}px, ${g}px)`;const M=Math.min(1,x/r),m=.15,_=M<m?0:(M-m)/(1-m)/Math.max(1e-6,M);e.x=p/r*_,e.y=g/r*_});const h=d=>{d.pointerId===a&&(a=null,e.x=0,e.y=0,i.style.transform="",t.classList.remove("on"))};u.addEventListener("pointerup",h),u.addEventListener("pointercancel",h);const f=(d,p)=>{const g=n.querySelector(d);g.addEventListener("pointerdown",x=>{x.preventDefault(),x.stopPropagation(),p(),g.classList.add("down")}),g.addEventListener("pointerup",()=>g.classList.remove("down")),g.addEventListener("pointerleave",()=>g.classList.remove("down"))};f("#rise",()=>e.toggle=!0),f("#zoom-in",()=>e.zoom-=1),f("#zoom-out",()=>e.zoom+=1),window.addEventListener("touchstart",d=>{c(),d.touches.length===3&&(e.debug=!0)},{passive:!0})}const Hi=new URLSearchParams(location.search);let mr=Yf(Hi.get("seed"));mr===null&&(mr=Math.floor(Math.random()*1e6),Hi.set("seed",String(mr)),history.replaceState(null,"","?"+Hi.toString()+location.hash));const ki={...Ar,bloom:{...Ar.bloom},tiltShift:{...Ar.tiltShift},shadows:{...Ar.shadows},canopyShadow:{...Ar.canopyShadow},mist:{...Ar.mist}};Hi.get("shadows")==="off"&&(ki.shadows.on=!1);Hi.get("canopy")==="off"&&(ki.canopyShadow.on=!1);Hi.get("mist")==="off"&&(ki.mist.on=!1);const gs=Hi.get("tilt");gs==="off"?ki.tiltShift.on=!1:(gs==="before"||gs==="after")&&(ki.tiltShift.on=!0,ki.tiltShift.where=gs);Hi.get("bloom")==="off"&&(ki.bloom.on=!1);const Oi=o0(mr,ki),z5=document.getElementById("game"),Pa=new O5(z5,Oi,{...B5(),pixel:ki.pixelSize}),Ws=new fp;k5(document.body,Ws.touch);document.getElementById("version").textContent="v228 · d013dc8";const H5=document.getElementById("seed");H5.innerHTML=`seed <a href="?seed=${mr}">${mr}</a>`;const Ll=document.getElementById("debug"),tc=document.getElementById("start");let Sa=Hi.has("debug");Ll.classList.toggle("on",Sa);const Hh=()=>Pa.resize(window.innerWidth,window.innerHeight);window.addEventListener("resize",Hh);Hh();let Vs=!1;requestAnimationFrame(()=>setTimeout(async()=>{await Pa.prepare(),Vs=!0,tc.classList.remove("loading")},0));let Lu=null;function Gh(){if(!Vs||!Oi.clock.paused)return!1;try{Lu??=new AudioContext,Lu.resume()}catch{}return Oi.clock.paused=!1,tc.style.display="none",Ws.clearPresses(),!0}Ws.onAny=Gh;tc.addEventListener("pointerdown",n=>{n.preventDefault(),Gh()});document.addEventListener("visibilitychange",()=>{document.hidden&&(As=0)});let As=0,Du=60,No=0,ms=0;function Wh(n){requestAnimationFrame(Wh);const e=As?(n-As)/1e3:0;As=n,No++,ms+=e,ms>=.5&&(Du=No/ms,No=0,ms=0);const t=Ws.read();if(t.debug&&(Sa=!Sa,Ll.classList.toggle("on",Sa)),l0(Oi,t,e),!!Vs&&(Pa.render(n/1e3),Sa)){const i=Oi.witch,r=Pa.stats;Ll.textContent=[`fps    ${Du.toFixed(0)}`,`seed   ${mr}`,`area   ${qu(Oi)}`,`mode   ${i.mode}`,`at     ${i.x.toFixed(0)}, ${i.z.toFixed(0)} m   zoom ${Oi.camera.zoomStep}`,`trees  ${r.trees}  bushes ${r.bushes}  creatures ${r.creatures}`,`draws  ${r.drawCalls}  art queued ${r.pendingArt}  ground tiles ${r.pendingGround}`].join(`
`)}}requestAnimationFrame(Wh);window.witch={game:Oi,view:Pa,areaUnderWitch:()=>qu(Oi),get ready(){return Vs}};
