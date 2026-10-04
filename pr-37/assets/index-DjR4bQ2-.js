(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);new MutationObserver(r=>{for(const a of r)if(a.type==="childList")for(const o of a.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&i(o)}).observe(document,{childList:!0,subtree:!0});function t(r){const a={};return r.integrity&&(a.integrity=r.integrity),r.referrerPolicy&&(a.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?a.credentials="include":r.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function i(r){if(r.ep)return;r.ep=!0;const a=t(r);fetch(r.href,a)}})();function Aa(n){let e=n>>>0;return()=>{e=e+1831565813>>>0;let t=e;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}}function Nt(n,e,t){let i=Math.imul(n|0,374761393)^Math.imul(e|0,668265263)^Math.imul(t|0,2147483647);return i=Math.imul(i^i>>>13,1274126177),((i^i>>>16)>>>0)/4294967296}function gc(n,e,t){const i=Math.floor(n),r=Math.floor(e),a=n-i,o=e-r,l=a*a*(3-2*a),c=o*o*(3-2*o),h=Nt(i,r,t),u=Nt(i+1,r,t),f=Nt(i,r+1,t),d=Nt(i+1,r+1,t);return h+(u-h)*l+(f-h)*c+(h-u-f+d)*l*c}const li=(n,e,t)=>n+(e-n)*t,Mr=(n,e,t)=>Math.min(t,Math.max(e,n)),ea=n=>{const e=Mr(n,0,1);return e*e*(3-2*e)};function cd(n,e,t,i){const r=Math.max(1,n.camera.zoomSteps),a=Mr(Math.round(n.camera.startZoom),0,r-1),o=r>1?a/(r-1):0;return{zoomStep:a,zoom:o,tx:e,ty:t,tz:i,vx:0,vy:0,vz:0,ax:0,az:0,lift:0}}function Ks(n,e,t,i,r){const a=i*r,o=Math.exp(-a),l=n-t,c=e+i*l;return[t+(l+c*r)*o,(e-i*c*r)*o]}function ud(n,e,t,i,r,a,o){const l=o.camera,c=Math.max(1,l.zoomSteps),h=Mr(n.zoomStep+Math.sign(e),0,c-1),u=c>1?h/(c-1):0;let f=i.x*l.lookAhead,d=i.z*l.lookAhead;const p=Math.hypot(f,d);p>l.lookAheadMax&&(f*=l.lookAheadMax/p,d*=l.lookAheadMax/p);const g=1-Math.exp(-l.lookAheadEase*a),x=n.ax+(f-n.ax)*g,m=n.az+(d-n.az)*g,[M,_]=Ks(n.tx,n.vx,t.x+x,l.follow,a),[A,E]=Ks(n.ty,n.vy,t.y,l.follow,a),[R,T]=Ks(n.tz,n.vz,t.z+m,l.follow,a),P=n.zoom+(u-n.zoom)*(1-Math.exp(-l.zoomEase*a)),S=n.lift+(r-n.lift)*(1-Math.exp(-l.liftEase*a));return{zoomStep:h,zoom:P,tx:M,ty:A,tz:R,vx:_,vy:E,vz:T,ax:x,az:m,lift:Mr(S,0,1)}}function hd(n,e,t){const i=t.camera.ground,r=t.camera.treetop,a=ea(e),o=li(li(i.angleIn,i.angleOut,n.zoom),li(r.angleIn,r.angleOut,n.zoom),a),l=li(li(i.distanceIn,i.distanceOut,n.zoom),li(r.distanceIn,r.distanceOut,n.zoom),a),c=o*Math.PI/180;return{angle:o,distance:l,x:n.tx,y:n.ty+Math.sin(c)*l,z:n.tz+Math.cos(c)*l,tx:n.tx,ty:n.ty,tz:n.tz}}const dd=.1,fd=()=>({time:0,paused:!0});function pd(n,e){if(n.paused||!(e>0))return 0;const t=Math.min(dd,e);return n.time+=t,t}const gd={moor:{treeDensity:.4},"fern-forest":{treeDensity:1},"muddy-forest":{treeDensity:1},"stone-shrine":{treeDensity:.3},"tangly-forest":{treeDensity:1},"wispy-forest":{treeDensity:1},"hazel-forest":{treeDensity:1},garden:{treeDensity:.6},"twiggy-forest":{treeDensity:1},ancient:{treeDensity:.9},norway:{treeDensity:1},"alder-forest":{treeDensity:.9},meadow:{treeDensity:.2},"old-oaks":{treeDensity:.9},"berry-thicket":{treeDensity:1},wetland:{treeDensity:.6},stream:{treeDensity:.7},"rocky-slope":{treeDensity:.6},bog:{treeDensity:.5},deadwood:{treeDensity:.8},"cave-mouth":{treeDensity:.6},grassland:{treeDensity:.2},"beaver-pond":{treeDensity:.8},"log-pile":{treeDensity:.7},heath:{treeDensity:.4},"old-pinewood":{treeDensity:1},ravine:{treeDensity:.6},"bluebell-glade":{treeDensity:.8},"holly-thicket":{treeDensity:1},"honeysuckle-tangle":{treeDensity:1}},md={types:gd};function Ol(n,e){if(typeof document<"u"){const t=document.createElement("canvas");return t.width=n,t.height=e,t}return new OffscreenCanvas(n,e)}function Il(n){let e=n>>>0;return()=>{e=e+1831565813>>>0;let t=e;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}}const ce=(n,e,t)=>e+(t-e)*n(),Nl=(n,e)=>e[Math.floor(n()*e.length)];function Ft(n,e,t){let i=Math.imul(n|0,374761393)^Math.imul(e|0,668265263)^Math.imul(t|0,2147483647);return i=Math.imul(i^i>>>13,1274126177),((i^i>>>16)>>>0)/4294967296}function di(n,e,t){const i=Math.floor(n),r=Math.floor(e),a=n-i,o=e-r,l=a*a*(3-2*a),c=o*o*(3-2*o),h=Ft(i,r,t),u=Ft(i+1,r,t),f=Ft(i,r+1,t),d=Ft(i+1,r+1,t);return h+(u-h)*l+(f-h)*c+(h-u-f+d)*l*c}function me(n,e,t){n=(n%1+1)%1,e=Math.max(0,Math.min(1,e)),t=Math.max(0,Math.min(1,t));const i=Math.floor(n*6),r=n*6-i,a=t*(1-e),o=t*(1-r*e),l=t*(1-(1-r)*e),[c,h,u]=[[t,l,a],[o,t,a],[a,t,l],[a,o,t],[l,a,t],[t,a,o]][i%6];return[Math.round(c*255),Math.round(h*255),Math.round(u*255)]}const s={BODY:1,BELLY:2,ACCENT:3,EYE:4,GLINT:5,TRUNK:6,LEAF:7,LEAF2:8,CLOTH:9,SKIN:10,HAIR:11,BROOM:12,STRAW:13,BODY2:14,BARK2:15,FLOWER:16,PUPIL:17,MAGIC:18,BARKD:19,LINE:20,IRIS:21,MAGIC2:22,NOSE:23,EAR:24,BODY3:25,LEAF3:26,BARKL:27,HAT:28,PHONES:29,TOP:30,JACKET:31,JEANS:32,SHOES:33,WATER:34,STONE:35,STONED:36,MOSS:37,RUNE:39,GLOW:40,WOOD:41,COLLAR:42,HAT1:43,HAT2:44,POM:45,SHADES:46,FRAME:47,SHOE:48,SOLE:49,WOKEN:50,WEB:51},Md=new Set([s.GLINT,s.MAGIC,s.MAGIC2,s.RUNE,s.GLOW,s.COLLAR,s.WOKEN]);function mc(n,e=!0,t=8){const i=n.length,r=[];if(i<3)return n.slice();const a=l=>e?n[(l+i)%i]:n[Math.max(0,Math.min(i-1,l))],o=e?i:i-1;for(let l=0;l<o;l++){const c=a(l-1),h=a(l),u=a(l+1),f=a(l+2),d=Math.max(2,Math.ceil(Math.hypot(u[0]-h[0],u[1]-h[1])/1.5),t);for(let p=0;p<d;p++){const g=p/d,x=g*g,m=x*g;r.push([0,1].map(M=>.5*(2*h[M]+(-c[M]+u[M])*g+(2*c[M]-5*h[M]+4*u[M]-f[M])*x+(-c[M]+3*h[M]-3*u[M]+f[M])*m)))}}return e||r.push(n[i-1]),r}function xd(n,{cap:e=1,capEnd:t=e}={}){const i=[],r=[],a=n.length;for(let c=0;c<a;c++){const h=n[Math.max(0,c-1)],u=n[Math.min(a-1,c+1)];let f=u[0]-h[0],d=u[1]-h[1];const p=Math.hypot(f,d)||1;f/=p,d/=p;const g=n[c][2]/2;i.push([n[c][0]-d*g,n[c][1]+f*g]),r.push([n[c][0]+d*g,n[c][1]-f*g])}const o=(c,h,u,f)=>{let d=c[0]-h[0],p=c[1]-h[1];const g=Math.hypot(d,p)||1;return[c[0]+d/g*u/2*f,c[1]+p/g*u/2*f]};return[...i,o(n[a-1],n[a-2],n[a-1][2],t),...r.reverse(),o(n[0],n[1],n[0][2],e)]}const mt=(n,e)=>[n[0]+e[0],n[1]+e[1]],En=(n,e,t)=>[n[0]+(e[0]-n[0])*t,n[1]+(e[1]-n[1])*t];function Fs(n,e,t,i,r,a=1){const o=[];for(let l=0;l<n.length;l++){if(o.push(n[l]),l<e||l>=t)continue;const c=n[l],h=n[(l+1)%n.length];let u=h[0]-c[0],f=h[1]-c[1];const d=Math.hypot(u,f)||1,p=f/d*a,g=-u/d*a;for(let x=1;x<=i;x++){const m=(x-.5)/i,M=En(c,h,m),_=[M[0]+p*r-u/d*r*.5,M[1]+g*r-f/d*r*.5];o.push(En(c,h,m-.45/i),_,En(c,h,m+.35/i))}}return o}function Mc(n,e,t){const i=new Uint8Array(n*e);let r=1/0,a=-1/0;for(const o of t)r=Math.min(r,o[1]),a=Math.max(a,o[1]);for(let o=Math.max(0,Math.floor(r));o<=Math.min(e-1,Math.ceil(a));o++){const l=o+.5,c=[];for(let h=0,u=t.length-1;h<t.length;u=h++){const[f,d]=t[h],[p,g]=t[u];d>l!=g>l&&c.push(f+(l-d)/(g-d)*(p-f))}c.sort((h,u)=>h-u);for(let h=0;h+1<c.length;h+=2)for(let u=Math.max(0,Math.ceil(c[h]-.5));u<=Math.min(n-1,Math.floor(c[h+1]-.5));u++)i[o*n+u]=1}return i}function _d(n,e,t){const r=new Float32Array(n*e),a=new Float32Array(n*e);for(let c=0;c<n*e;c++)t[c]&&(r[c]=1e4,a[c]=1e4);const o=c=>r[c]*r[c]+a[c]*a[c],l=(c,h,u,f,d)=>{const p=h+f,g=u+d;let x,m;if(p<0||g<0||p>=n||g>=e)x=f,m=d;else{const M=g*n+p;x=r[M]+f,m=a[M]+d}x*x+m*m<o(c)&&(r[c]=x,a[c]=m)};for(let c=0;c<e;c++){for(let h=0;h<n;h++){const u=c*n+h;t[u]&&(l(u,h,c,-1,0),l(u,h,c,0,-1),l(u,h,c,-1,-1),l(u,h,c,1,-1))}for(let h=n-1;h>=0;h--){const u=c*n+h;t[u]&&l(u,h,c,1,0)}}for(let c=e-1;c>=0;c--){for(let h=n-1;h>=0;h--){const u=c*n+h;t[u]&&(l(u,h,c,1,0),l(u,h,c,0,1),l(u,h,c,1,1),l(u,h,c,-1,1))}for(let h=0;h<n;h++){const u=c*n+h;t[u]&&l(u,h,c,-1,0)}}return{vx:r,vy:a}}class qt{constructor(e,t,i=1){this.sx=i,this.w=Math.round(e*i),this.h=t|0,this.m=new Uint8Array(this.w*this.h),this.n=new Float32Array(this.w*this.h*3),this.g=new Uint8Array(this.w*this.h)}inb(e,t){return e>=0&&t>=0&&e<this.w&&t<this.h}get(e,t){return e|=0,t|=0,this.inb(e,t)?this.m[t*this.w+e]:0}put(e,t,i,r=0,a=0,o=1){this.px(e*this.sx,t,i,r,a,o)}px(e,t,i,r=0,a=0,o=1){if(e=Math.floor(e),t=Math.floor(t),!this.inb(e,t))return;const l=t*this.w+e;this.m[l]=i,this.n[l*3]=r,this.n[l*3+1]=a,this.n[l*3+2]=o}recolour(e,t,i){e=Math.floor(e),t=Math.floor(t),this.inb(e,t)&&this.m[t*this.w+e]&&(this.m[t*this.w+e]=i)}ellipse(e,t,i,r,a,o={}){const{onlyOn:l,density:c=1,noise:h=0,seed:u=0,round:f=1}=o;e*=this.sx,i*=this.sx;for(let d=Math.max(0,Math.floor(t-r-1));d<Math.min(this.h,t+r+1);d++)for(let p=Math.max(0,Math.floor(e-i-1));p<Math.min(this.w,e+i+1);p++){const g=(p+.5-e)/i,x=(d+.5-t)/r,m=g*g+x*x;if(m>1)continue;const M=d*this.w+p;if(l&&!l.has(this.m[M]))continue;if(c<1){const R=h?di(p/3.2,d/3.2,u)*h+(1-h)*.5:.5;if(Ft(p,d,u+77)>c*(.4+R*1.2)*(1.15-m*.5))continue}const _=g*f,A=x*f,E=Math.hypot(_,A,Math.sqrt(Math.max(0,1-m))+.15);this.px(p,d,a,_/E,A/E,(Math.sqrt(Math.max(0,1-m))+.15)/E)}}line(e,t,i,r,a,o,l,c=1){e*=this.sx,i*=this.sx;const h=Math.max(1,Math.ceil(Math.hypot(i-e,r-t)));for(let u=0;u<=h;u++){const f=u/h,d=e+(i-e)*f,p=t+(r-t)*f,g=Math.max(.5,(a+(o-a)*f)/2);for(let x=Math.floor(p-g);x<=p+g;x++)for(let m=Math.floor(d-g);m<=d+g;m++){const M=(m+.5-d)/g,_=(x+.5-p)/g;if(M*M+_*_>1)continue;const A=M*c,E=Math.hypot(A,_*.3,1);this.px(m,x,l,A/E,_*.3/E,1/E)}}}tri(e,t){let[[i,r],[a,o],[l,c]]=e;i*=this.sx,a*=this.sx,l*=this.sx;const h=(g,x,m,M,_,A)=>(g-_)*(M-A)-(m-_)*(x-A),u=Math.max(0,Math.floor(Math.min(i,a,l))),f=Math.min(this.w,Math.ceil(Math.max(i,a,l))),d=Math.max(0,Math.floor(Math.min(r,o,c))),p=Math.min(this.h,Math.ceil(Math.max(r,o,c)));for(let g=d;g<p;g++)for(let x=u;x<f;x++){const m=x+.5,M=g+.5,_=h(m,M,i,r,a,o),A=h(m,M,a,o,l,c),E=h(m,M,l,c,i,r);(_<0||A<0||E<0)&&(_>0||A>0||E>0)||this.px(x,g,t,0,-.2,.98)}}shape(e,t,i={}){return this.fillMask(Mc(this.w,this.h,mc(e,!0,i.per||6)),t,i)}limb(e,t,i={}){return this.shape(xd(e,i),t,i)}fillMask(e,t,{group:i=1,line:r=!1,depth:a=0,round:o=1,onlyOn:l=null,keepNormals:c=!1,tilt:h=[0,0],lineMat:u=s.LINE}={}){const{w:f,h:d}=this;if(l)for(let m=0;m<f*d;m++)e[m]&&!l.has(this.m[m])&&(e[m]=0);const{vx:p,vy:g}=_d(f,d,e);let x=a;if(!x){for(let m=0;m<f*d;m++)e[m]&&(x=Math.max(x,Math.hypot(p[m],g[m])));x=Math.max(1.5,Math.min(x*.9,2.5+x*.35))}for(let m=0;m<d;m++)for(let M=0;M<f;M++){const _=m*f+M;if(!e[_])continue;if(c){this.m[_]=t;continue}const A=Math.hypot(p[_],g[_]),E=Math.min(1,Math.max(0,(A-.5)/x)),R=Math.min(2.6,(1-E)/Math.sqrt(Math.max(.02,1-(1-E)*(1-E))))*o;let T=p[_]/(A||1)*R+h[0],P=g[_]/(A||1)*R+h[1];const S=Math.hypot(T,P,1);this.m[_]=t,this.n[_*3]=T/S,this.n[_*3+1]=P/S,this.n[_*3+2]=1/S}if(r&&!c){const m=[];for(let M=0;M<d;M++)for(let _=0;_<f;_++){const A=M*f+_;if(e[A])for(const[E,R]of[[1,0],[-1,0],[0,1],[0,-1]]){const T=_+E,P=M+R;if(T<0||P<0||T>=f||P>=d)continue;const S=P*f+T;if(!e[S]&&this.m[S]&&this.g[S]!==i&&this.m[S]!==u){m.push(A);break}}}for(const M of m)this.m[M]=u}if(!c)for(let m=0;m<f*d;m++)e[m]&&(this.g[m]=i);return e}mark(e,t,i,r={}){return this.fillMask(Mc(this.w,this.h,mc(e,!0,6)),t,{...r,onlyOn:new Set(i),keepNormals:!0})}grid(e,t,i=0,r=0,{round:a=1,flipX:o=!1}={}){const l=Math.max(...e.map(u=>u.length)),c=new Uint8Array(this.w*this.h),h=new Map;e.forEach((u,f)=>[...u].forEach((d,p)=>{const g=t[d];if(!g)return;const x=i+(o?l-1-p:p),m=r+f;this.inb(x,m)&&(c[m*this.w+x]=1,h.set(m*this.w+x,g))})),this.fillMask(c,s.BODY,{round:a,depth:2.5});for(const[u,f]of h)this.m[u]=f}}function $r(n,e,t,i=t.outline,r=Ol){const{w:a,h:o}=n,l=()=>r(a,o),c=l(),h=l(),u=l(),f=c.getContext("2d").createImageData(a,o),d=h.getContext("2d").createImageData(a,o),p=u.getContext("2d").createImageData(a,o),g=i==="none"?null:i==="dark"?[22,18,30]:"tint";for(let x=0;x<o;x++)for(let m=0;m<a;m++){const M=x*a+m,_=n.m[M],A=M*4;if(!_){if(!g)continue;const S=[n.get(m+1,x),n.get(m-1,x),n.get(m,x+1),n.get(m,x-1)].find(C=>C);if(!S)continue;const y=g==="tint"?(e[S]||[0,0,0]).map(C=>C*.35|0):g;f.data.set([...y,255],A),d.data.set([128,128,255,255],A),p.data.set([128,128,255,255],A);continue}let E=e[_];_===s.LINE&&!E&&(E=g==="tint"||!g?(e[s.BODY2]||[0,0,0]).map(S=>S*.55|0):g),E=E||[255,0,255],f.data.set([...E,Md.has(_)?254:255],A);const R=n.n[M*3],T=n.n[M*3+1],P=n.n[M*3+2];d.data.set([R*127+128,T*127+128,P*255,255],A),p.data.set([-R*127+128,T*127+128,P*255,255],A)}return c.getContext("2d").putImageData(f,0,0),h.getContext("2d").putImageData(d,0,0),u.getContext("2d").putImageData(p,0,0),{A:c,N:h,NF:u,w:a,h:o}}const ji=n=>{const e=Math.hypot(n[0],n[1],n[2])||1;return[n[0]/e,n[1]/e,n[2]/e]},Ea=(n,e)=>[n[1]*e[2]-n[2]*e[1],n[2]*e[0]-n[0]*e[2],n[0]*e[1]-n[1]*e[0]],Ht=(n,e)=>n[0]*e[0]+n[1]*e[1]+n[2]*e[2],zn=(n,e)=>[n[0]-e[0],n[1]-e[1],n[2]-e[2]],v={add:(n,e)=>[n[0]+e[0],n[1]+e[1],n[2]+e[2]],sub:zn,mul:(n,e)=>[n[0]*e,n[1]*e,n[2]*e],lerp:(n,e,t)=>[n[0]+(e[0]-n[0])*t,n[1]+(e[1]-n[1])*t,n[2]+(e[2]-n[2])*t],norm:ji,cross:Ea,dot:Ht};function xc(n,e=[0,1,0]){const t=ji(n);let i=Ea(e,t);Math.hypot(...i)<1e-4&&(i=Ea([0,0,1],t)),i=ji(i);const r=Ea(t,i);return[t,r,i]}function Bu(n,e){const t=Ht(n,e.axes[0]),i=Ht(n,e.axes[1]),r=Ht(n,e.axes[2]),[a,o,l]=e.r,c=Math.hypot(t/a,i/o,r/l),h=Math.hypot(t/(a*a),i/(o*o),r/(l*l));return h>1e-9?c*(c-1)/h:-Math.min(a,o,l)}function ku(n,e){const{ba:t,l2:i,rr:r,a2:a,il2:o,r1:l,r2:c}=e,h=Ht(n,t),u=h-i,f=[n[0]*i-t[0]*h,n[1]*i-t[1]*h,n[2]*i-t[2]*h],d=Ht(f,f),p=h*h*i,g=u*u*i,x=Math.sign(r)*r*r*d;return Math.sign(u)*a*g>x?Math.sqrt(d+g)*o-c:Math.sign(h)*a*p<x?Math.sqrt(d+p)*o-l:(Math.sqrt(d*a*o)+h*r)*o-l}function zu(n,e){const t=Math.abs(Ht(n,e.axes[0]))-e.h[0]+e.round,i=Math.abs(Ht(n,e.axes[1]))-e.h[1]+e.round,r=Math.abs(Ht(n,e.axes[2]))-e.h[2]+e.round;return Math.hypot(Math.max(t,0),Math.max(i,0),Math.max(r,0))+Math.min(Math.max(t,i,r),0)-e.round}const vd=(n,e)=>e*(Math.sin(n[0]*23+n[1]*7)*Math.sin(n[1]*19-n[2]*11)+.5*Math.sin(n[2]*41+n[0]*29)),_c=(n,e)=>n.type==="ell"?Bu(zn(e,n.cw),n):n.type==="box"?zu(zn(e,n.cw),n):ku(zn(e,n.aw),n),aa=(n,e)=>n.rough?_c(n,e)+vd(e,n.rough):_c(n,e);class st{constructor({blend:e=.07}={}){this.parts=[],this.flats=[],this.blend=e,this.anchors={feet:[]}}ell(e,t,i,r={}){const a=r.axes||(r.dir?xc(r.dir,r.up):[[1,0,0],[0,1,0],[0,0,1]]);return this.parts.push({type:"ell",c:e,r:t,axes:a,mat:i,group:r.group??1,extra:!!r.extra,paint:r.paint,rough:r.rough,cut:!!r.cut}),this}box(e,t,i,r={}){const a=r.axes||(r.dir?xc(r.dir,r.up):[[1,0,0],[0,1,0],[0,0,1]]);return this.parts.push({type:"box",c:e,h:t,round:Math.min(r.round??.02,...t),axes:a,mat:i,group:r.group??1,extra:!!r.extra,paint:r.paint,rough:r.rough,cut:!!r.cut}),this}seg(e,t,i,r,a,o={}){return this.parts.push({type:"cone",a:e,b:t,r1:i,r2:r,mat:a,group:o.group??1,extra:!!o.extra,paint:o.paint,rough:o.rough,cut:!!o.cut}),this}chain(e,t,i={}){for(let r=0;r+1<e.length;r++)this.seg(e[r].slice(0,3),e[r+1].slice(0,3),e[r][3],e[r+1][3],t,i);return this}flat(e,t,i,r,a,o,l={}){return this.flats.push({c:e,u:ji(t),v:ji(i),su:r,sv:a,mask:o,group:l.group??30,extra:!!l.extra,bend:l.bend??.35}),this}field(e){let t=1/0;for(const i of this.parts){if(i.extra||i.cut)continue;let r;if(i.type==="ell")r=Bu(zn(e,i.c),i);else if(i.type==="box")r=zu(zn(e,i.c),i);else{const a=zn(i.b,i.a),o=Math.max(1e-9,Ht(a,a)),l=i.r1-i.r2;r=ku(zn(e,i.a),{ba:a,l2:o,rr:l,a2:o-l*l,il2:1/o,r1:i.r1,r2:i.r2})}r<t&&(t=r)}return t}static surface(e,t,i){const r=1/Math.hypot(i[0]/t[0],i[1]/t[1],i[2]/t[2]);return[e[0]+i[0]*r,e[1]+i[1]*r,e[2]+i[2]*r]}}const vc={towards:.6,away:-.6},bd=.52;function Ii(n,{height:e,scale:t,facing:i="towards",yaw:r=vc[i]??vc.towards,pitch:a=bd,lineGap:o=.12}={}){const l=Math.cos(r),c=Math.sin(r),h=Math.cos(a),u=Math.sin(a),f=V=>[V[0]*l-V[2]*c,V[1],V[0]*c+V[2]*l],d=V=>[V[0]*l+V[2]*c,V[1],-V[0]*c+V[2]*l],p=[0,-u,-h],g=[0,h,-u],x=[1,0,0],m=[0,u,h],M=n.blend,_=n.parts.map(V=>{if(V.type==="ell"){const ze=f(V.c),Je=V.axes.map(f),$e=Math.max(...V.r);return{...V,cw:ze,axes:Je,bc:ze,br:$e+(V.rough||0)*1.5}}if(V.type==="box"){const ze=f(V.c),Je=V.axes.map(f);return{...V,cw:ze,axes:Je,bc:ze,br:Math.hypot(...V.h)+(V.rough||0)*1.5}}const he=f(V.a),se=f(V.b),Ae=zn(se,he),tt=Math.max(1e-9,Ht(Ae,Ae)),Oe=V.r1-V.r2;return{...V,aw:he,ba:Ae,l2:tt,rr:Oe,a2:tt-Oe*Oe,il2:1/tt,bc:v.lerp(he,se,.5),br:Math.sqrt(tt)/2+Math.max(V.r1,V.r2)}}),A=n.flats.map(V=>{const he=f(V.c),se=f(V.u),Ae=f(V.v);return{...V,cw:he,uw:se,vw:Ae,nw:ji(Ea(se,Ae)),bc:he,br:Math.hypot(V.su,V.sv)}}),E=[..._,...A],R=V=>{const he=Ht(V.bc,x),se=Ht(V.bc,g),Ae=V.br+(V.uw?0:M);return[he-Ae,he+Ae,se-Ae,se+Ae]};for(const V of E)[V.x0,V.x1,V.u0,V.u1]=R(V);const T=E.filter(V=>!V.extra&&!V.cut),P=Math.min(...T.map(V=>V.u0+(V.uw?0:M))),S=Math.max(...T.map(V=>V.u1-(V.uw?0:M))),y=t??e/Math.max(1e-6,S-P),C=Math.min(...E.map(V=>V.x0)),I=Math.max(...E.map(V=>V.x1)),L=Math.min(...E.map(V=>V.u0)),N=Math.max(...E.map(V=>V.u1)),O=Math.ceil((I-C)*y)+4,U=Math.ceil((N-L)*y)+2,W=new qt(O,U),F=new Float32Array(O*U).fill(1/0),Q=new Int16Array(O*U).fill(-1),X=8,te=Math.ceil(O/X),B=Math.ceil(U/X),ae=Array.from({length:te*B},()=>[]);E.forEach((V,he)=>{const se=Math.max(0,Math.floor((V.x0-C)*y/X)),Ae=Math.min(te-1,Math.floor(((V.x1-C)*y+2)/X)),tt=Math.max(0,Math.floor((N-V.u1)*y/X)),Oe=Math.min(B-1,Math.floor(((N-V.u0)*y+1)/X));for(let ze=tt;ze<=Oe;ze++)for(let Je=se;Je<=Ae;Je++)ae[ze*te+Je].push(he)});const ue=.25/y,Pe=(V,he)=>{const se=Math.max(M-Math.abs(V-he),0)/M;return Math.min(V,he)-se*se*M*.25};for(let V=0;V<U;V++)for(let he=0;he<O;he++){const se=ae[Math.floor(V/X)*te+Math.floor(he/X)];if(!se.length)continue;const Ae=C+(he+.5-1)/y,tt=N-(V+.5)/y,Oe=v.add(v.add(v.mul(x,Ae),v.mul(g,tt)),v.mul(m,50));let ze=1/0,Je=-1/0;const $e=[],Ct=[];for(const it of se){const Ve=E[it],D=zn(Oe,Ve.bc),b=Ht(D,p),k=Ve.br+(Ve.uw?0:M),Y=Ht(D,D)-k*k,$=b*b-Y;if($<0)continue;if(Ve.uw){Ct.push(Ve);continue}if(Ve.cut){$e.push(Ve);continue}const le=Math.sqrt($);ze=Math.min(ze,-b-le),Je=Math.max(Je,-b+le),$e.push(Ve)}let zt=1/0,an=-1,At=0,Lt=null;if($e.length){const it=new Map;for(const b of $e){let k=it.get(b.group);k||it.set(b.group,k=[]),k.push(b)}const Ve=(b,k)=>{let Y=1/0;for(const $ of b)$.cut||(Y=Y===1/0?aa($,k):Pe(Y,aa($,k)));for(const $ of b)$.cut&&(Y=Math.max(Y,-aa($,k)));return Y};let D=Math.max(0,ze);for(let b=0;b<96&&D<Je;b++){const k=v.add(Oe,v.mul(p,D));let Y=1/0,$=null;for(const[le,fe]of it){const j=Ve(fe,k);j<Y&&(Y=j,$=le)}if(Y<ue){const le=it.get($),fe=.5/y;Lt=ji([Ve(le,[k[0]+fe,k[1],k[2]])-Ve(le,[k[0]-fe,k[1],k[2]]),Ve(le,[k[0],k[1]+fe,k[2]])-Ve(le,[k[0],k[1]-fe,k[2]]),Ve(le,[k[0],k[1],k[2]+fe])-Ve(le,[k[0],k[1],k[2]-fe])]);let j=le[0],ne=1/0;for(const pe of le){if(pe.cut)continue;const Ie=aa(pe,k);Ie<ne&&(ne=Ie,j=pe)}for(const pe of le)if(pe.cut&&-aa(pe,k)>ne-ue*2){j=pe;break}zt=D,an=$,At=j.paint?j.paint(d(k),j)??j.mat:j.mat;break}D+=Math.max(Y*.9,ue*.5)}}for(const it of Ct){const Ve=Ht(p,it.nw);if(Math.abs(Ve)<1e-4)continue;const D=Ht(zn(it.cw,Oe),it.nw)/Ve;if(D>=zt)continue;const b=v.add(Oe,v.mul(p,D)),k=zn(b,it.cw),Y=Ht(k,it.uw)/it.su,$=Ht(k,it.vw)/it.sv;if(Math.abs(Y)>1||Math.abs($)>1)continue;const le=it.mask(Y,$);if(!le)continue;let fe=Ve>0?v.mul(it.nw,-1):it.nw;fe=ji(v.add(fe,v.add(v.mul(it.uw,Y*it.bend),v.mul(it.vw,$*it.bend*.5)))),zt=D,an=it.group,At=le,Lt=fe}if(!Lt||!At)continue;const H=V*O+he;F[H]=zt,Q[H]=an,W.px(he,V,At,Ht(Lt,x),-Ht(Lt,g),Ht(Lt,m))}const He=[];for(let V=0;V<U;V++)for(let he=0;he<O;he++){const se=V*O+he;if(W.m[se])for(const[Ae,tt]of[[1,0],[-1,0],[0,1],[0,-1]]){const Oe=he+Ae,ze=V+tt;if(Oe<0||ze<0||Oe>=O||ze>=U)continue;const Je=ze*O+Oe;if(W.m[Je]&&Q[Je]!==Q[se]&&F[Je]-F[se]>o){He.push(se);break}}}for(const V of He)[s.EYE,s.GLINT,s.MAGIC,s.MAGIC2,s.NOSE,s.COLLAR,s.WOKEN,s.RUNE,s.GLOW].includes(W.m[V])||(W.m[V]=s.LINE);for(let V=0;V<U;V++)for(let he=0;he<O;he++){const se=V*O+he;if(W.m[se]!==s.EYE)continue;const Ae=V>0&&W.m[se-O]===s.EYE,tt=he>0&&W.m[se-1]===s.EYE,Oe=he+1<O&&W.m[se+1]===s.EYE&&V+1<U&&W.m[se+O]===s.EYE;!Ae&&!tt&&Oe&&(W.m[se]=s.GLINT)}let Xe=-1;for(let V=U-1;V>=0&&Xe<0;V--)for(let he=0;he<O;he++)if(W.m[V*O+he]){Xe=V;break}const ee=Xe>=0&&Xe<U-1?U-1-Xe:0;if(Xe>=0&&Xe<U-1){const V=U-1-Xe;for(let he=U-1;he>=0;he--)for(let se=0;se<O;se++){const Ae=he*O+se,tt=(he-V)*O+se,Oe=he-V>=0;W.m[Ae]=Oe?W.m[tt]:0,W.g[Ae]=Oe?W.g[tt]:0;for(let ze=0;ze<3;ze++)W.n[Ae*3+ze]=Oe?W.n[tt*3+ze]:0}}return W.bodyH=Math.round((S-P)*y),{sp:W,s:y,project:V=>{const he=f(V);return[+((he[0]-C)*y+1).toFixed(1),+((N-Ht(he,g))*y+ee).toFixed(1)]}}}const Qn=(n,e=9,t=.3)=>Ft(Math.floor(n[0]*e),Math.floor(n[1]*e)+Math.floor(n[2]*e)*97,7)<t,xr={wing:(n,e)=>(t,i)=>{const r=(t+1)/2,a=1-.35*r*r,o=-1+.55*r+.18*Math.abs(Math.sin(r*Math.PI*6));return i>a||i<o?null:i>a-.35*(1-r*.5)?e:Math.floor(r*9)%2?n:e},ear:(n,e=s.EAR,t=s.BODY3)=>(i,r)=>{const a=(r+1)/2,o=.95*Math.sin(Math.PI*Math.min(1,.15+a*.85))*(1-a*.35);return Math.abs(i)>o?null:a>.82?t:Math.abs(i)<o*.5&&a<.7&&a>.12?e:n},flame:(n,e)=>(t,i)=>{const r=(i+1)/2,a=Math.sin(Math.PI*Math.min(1,r*1.1))*(1-r)*1.4;return Math.abs(t)>a?null:Math.abs(t)<a*.45&&r<.6?e:n},membrane:n=>(e,t)=>{const i=(e+1)/2,r=-1+.35*Math.abs(Math.sin(i*Math.PI*3));return t<r||t>1-.2*i?null:n},spotted:(n,e,t)=>(i,r)=>{if(Math.hypot(i,r*1.2)>1)return null;const o=Math.hypot(i-.35,r-.1);return o<.18?t:o<.3?e:n}},Sd={hair:s.HAIR,hat:s.HAT,headphones:s.PHONES,top:s.TOP,jacket:s.JACKET,jeans:s.JEANS,sneakers:s.SHOES,broom:s.BROOM,bristles:s.STRAW,skin:s.SKIN,pattern:s.HAT2,trim:s.HAT1,flower:s.FLOWER,flower2:s.POM,cup:s.ACCENT,glow:s.COLLAR,glow2:s.GLOW,shades:s.SHADES,frame:s.FRAME},bc={hair:[.01,.7,.85],hat:[.74,.45,.45],headphones:[.92,.55,.9],top:[.13,.15,.95],jacket:[.72,.45,.7],jeans:[.6,.5,.7],sneakers:[0,0,.95],broom:[.08,.55,.55],bristles:[.12,.55,.9],skin:[.07,.3,.94],pattern:[.13,.1,1],trim:[0,.6,.8],flower:[.95,.45,.98],flower2:[.15,.6,1],cup:[.99,.75,.85],glow:[.88,.75,1],glow2:[.33,.8,1],shades:[.7,.4,.14],frame:[.13,.6,.9]};function Ed(n,e=bc,{styleHues:t=!0}={}){const i={...bc,...e},r=t?{hair:n.hairHue,jacket:n.cloakHue,hat:n.hatHue,top:n.topHue,jeans:n.jeansHue,sneakers:n.shoeHue,headphones:n.phonesHue}:{},a={};for(const[o,l]of Object.entries(Sd)){const[c,h,u]=i[o];a[l]=me(r[o]??c,h,u)}return a[s.EYE]=[24,18,30],a[s.GLINT]=[255,255,245],a[s.NOSE]=[20,16,24],a[s.MAGIC]=me(n.glowHue??.13,.5,1),a[s.MAGIC2]=me(n.glowHue??.13,.15,1),a[s.BELLY]=[245,245,240],a}const Fo={hat:"classic",hair:"long",top:"jacket",phones:!0,shades:!1,glowsticks:!1};function Hu(n,e,t,i,r,a){const o=c=>c[1]<t[1]+(e.hat==="classic"?.045:.065)?s.MAGIC:void 0,l=(c,h,u=[0,0,0])=>v.add(v.add(t,v.mul(v.sub(c,t),h)),u);if(e.hat==="bucket"){const c=v.add(t,[-.01,.05,0]);n.ell(t,[.15,.016,.145],s.HAT,{dir:i,group:11}),n.ell(c,[.115,.07,.11],s.HAT,{group:11,paint:h=>h[1]<t[1]+.07&&h[1]>t[1]+.02?s.MAGIC:void 0});for(const h of[-1,1])n.seg(v.add(c,[-.01,.04,h*.065]),v.add(c,[-.02,.15,h*.085]),.04,.012,s.HAT,{group:11});return v.add(c,[-.02,.16,0])}if(e.hat==="small"){const c=v.add(t,[.01,.015,.065]),h=v.add(c,[-.07,.17,.07]);return n.ell(c,[.1,.013,.095],s.HAT,{dir:[1,.25,.45],group:11}),n.chain([[...v.add(c,[0,.01,.005]),.055],[...v.add(c,[-.03,.09,.035]),.032],[...h,.011]],s.HAT,{group:11,paint:u=>u[1]<c[1]+.055?s.MAGIC:void 0}),h}if(e.hat==="floppy"){n.ell(t,[.22,.016,.2],s.HAT,{dir:i,group:11}),n.chain([...Array(13).keys()].map(h=>{const u=h/12*Math.PI*2;return[...v.add(t,[Math.cos(u)*.2,-.02-.015*Math.cos(u),Math.sin(u)*.185]),.024]}),s.HAT,{group:11});const c=l(a,.72,[-.02,-.01,0]);return n.chain([[...v.add(t,[0,.01,0]),.095],[...l(r,.8),.055],[...c,.015]],s.HAT,{group:11,paint:o}),c}if(e.hat==="crooked"){const c=l(r,1.3,[0,0,.025]),h=l(a,1.45,[-.02,.03,.05]),u=v.add(h,[.1,-.06,.03]);return n.ell(t,[.16,.014,.15],s.HAT,{dir:i,group:11}),n.chain([[...v.add(t,[0,.01,0]),.085],[...c,.05],[...h,.027],[...u,.012]],s.HAT,{group:11,paint:o}),u}if(n.ell(t,[.16,.014,.15],s.HAT,{dir:i,group:11}),n.chain([[...v.add(t,[0,.01,0]),.085],[...r,.045],[...a,.012]],s.HAT,{group:11,paint:o}),e.hat==="flowers")for(let c=0;c<7;c++){const h=c/7*Math.PI*2+.3;n.ell(v.add(t,[Math.cos(h)*.135,.018,Math.sin(h)*.13]),[.032,.026,.032],c%2?s.POM:s.FLOWER,{group:11})}return a}function Gu(n,e,t,i){if(e.hair==="bob")n.ell(v.add(t,[-.035,-.03,0]),[.115,.1,.128],s.HAIR,{group:9});else if(e.hair==="buns")for(const r of[-1,1])n.ell(v.add(t,[-.1,.035,r*.065]),[.055,.055,.055],s.HAIR,{group:9});else e.hair==="mohawk"?n.chain([[...v.add(t,[.07,.1,0]),.028],[...v.add(t,[-.03,.16,0]),.04],[...v.add(t,[-.13,.11,0]),.028]],s.HAIR,{group:9}):n.chain(i,s.HAIR,{group:9})}function Wu(n,e,t,i=0,r=0,a=!1){const o=[.11,.115,.1],l=c=>st.surface(t,o,v.norm(c));if(e.shades){const c=[-1,1].map(u=>l([.85,.08+i,u*.42+r*.1])),h=v.add(l([1,.08+i,r*.1]),[.01,0,0]);for(const u of c)n.ell(v.add(u,[.008,0,0]),[.022,.024,.034],s.SHADES,{group:8});for(const u of c)n.seg(v.add(u,[.008,0,0]),h,.011,.011,s.FRAME,{group:8});return}for(const c of[-1,1])n.ell(l([.85,.05+i,c*.45+r*.1]),a?[.016,.011,.02]:[.016,.026,.016],s.EYE,{group:8})}function yd(n,e,t,i){if(e==="palm")n.ell(t,[.045,.02,.04],s.SKIN,{group:i});else if(e==="down")n.ell(t,[.045,.02,.04],s.SKIN,{dir:[1,.15,0],group:i});else if(e==="wave"){n.ell(t,[.03,.045,.04],s.SKIN,{group:i});for(const r of[-1,0,1])n.seg(v.add(t,[0,.03,r*.02]),v.add(t,[r*.01,.065,r*.03]),.01,.008,s.SKIN,{group:i})}else e==="point"?(n.ell(t,[.035,.03,.035],s.SKIN,{group:i}),n.seg(v.add(t,[0,.02,0]),v.add(t,[.01,.08,0]),.012,.01,s.SKIN,{group:i})):n.ell(t,[.035,.03,.035],s.SKIN,{group:i})}function Vu(n,e,t,i,r,a){if(!e.glowsticks)return;const o=v.sub(i,t);for(const l of r>0?[.62,.82]:[.78])n.ell(v.lerp(t,i,l),[.026,.05,.05],l>.7?s.COLLAR:s.GLOW,{dir:o,group:a})}function Yu(n,e,t){const i=r=>v.dot(v.sub(r,e),t);return n.top==="sequins"?r=>i(r)>.03&&Math.abs(r[2])<.075?Ft(Math.floor(r[0]*15),Math.floor(r[1]*15)+Math.floor(r[2]*15)*31,5)<.4?s.HAT2:s.TOP:void 0:n.top==="mesh"?r=>i(r)>.03&&Math.abs(r[2])<.08?((r[0]+r[2])*9%1+1)%1<.4||(r[1]*9%1+1)%1<.4?s.TOP:s.SKIN:void 0:r=>i(r)>.045&&Math.abs(r[2])<.05?s.TOP:void 0}function Xu(n,e,t,i,r,a){e.top==="poncho"&&n.ell(v.add(t,v.mul(r,.06)),[.17,.11,.2],s.JACKET,{dir:i,up:r,group:13,paint:o=>{const l=Math.floor((o[1]-t[1])*16)&3;return l===0?s.HAT1:l===2?s.HAT2:void 0}}),e.top==="cape"&&(a?n.ell(v.add(t,[-.24,-.02,0]),[.3,.035,.16],s.JACKET,{dir:[1,-.2,0],up:[0,1,0],group:12}):n.ell(v.add(t,v.add(v.mul(i,-.11),v.mul(r,-.12))),[.3,.035,.16],s.JACKET,{dir:v.add(r,v.mul(i,.12)),up:i,group:12}))}function Sc(n,e,t,i){const r=Math.cos(t),a=Math.sin(t),o=e==="y"?u=>[u[0]*r+u[2]*a,u[1],-u[0]*a+u[2]*r]:u=>[u[0]*r-u[1]*a,u[0]*a+u[1]*r,u[2]],l=e==="y"?u=>[u[0]*r-u[2]*a,u[1],u[0]*a+u[2]*r]:u=>[u[0]*r+u[1]*a,-u[0]*a+u[1]*r,u[2]],c=u=>v.add(i,o(v.sub(u,i))),h=u=>v.add(i,l(v.sub(u,i)));for(const u of n.parts)if(u.type==="cone"?(u.a=c(u.a),u.b=c(u.b)):(u.c=c(u.c),u.axes=u.axes.map(o)),u.paint){const f=u.paint;u.paint=(d,p)=>f(h(d),p)}for(const u of n.flats)u.c=c(u.c),u.u=o(u.u),u.v=o(u.v);for(const u of Object.keys(n.anchors))u!=="feet"&&(n.anchors[u]=c(n.anchors[u]))}function wd(n,e){const t=Math.min(...n.parts.filter(r=>!r.extra).map(r=>r.type==="cone"?Math.min(r.a[1]-r.r1,r.b[1]-r.r2):r.c[1]-Math.max(...r.r||r.h))),i=e-t;for(const r of n.parts)r.type==="cone"?(r.a=v.add(r.a,[0,i,0]),r.b=v.add(r.b,[0,i,0])):r.c=v.add(r.c,[0,i,0]);for(const r of Object.keys(n.anchors))r!=="feet"&&(n.anchors[r]=v.add(n.anchors[r],[0,i,0]))}const Ad={rise:.78,descend:-.66,brake:.44};function Td(n){const e=new st({blend:.03}),t=n%3,i=.5,r=.05,a=[[0,.02,-.01],[.02,-.01,.02],[-.01,.015,.01]][t],o=g=>i-r*(g/.62);e.seg([-.5,o(-.5),0],[.62,o(.62),0],.022,.018,s.BROOM,{group:2}),e.ell([-.64,o(-.64)+.005,0],[.2,.1,.11],s.STRAW,{dir:[1,r*1.6,0],group:3,paint:g=>g[0]<-.76?s.MAGIC2:g[0]>-.5?s.BROOM:void 0});const l=[-1,1].map(g=>[.5,o(.5)+.03,g*.045]),c=[-1,1].map(g=>[.2,i+.24+a[1],g*.1]);for(const g of[0,1]){const x=g?1:-1,m=x>0?7:5;e.seg(c[g],l[g],.04,.03,s.JACKET,{group:m}),e.ell(l[g],[.035,.03,.035],s.SKIN,{group:m})}const h=[.3+a[0],i+.27+a[1],0],u=[.07,i+.28+a[1]*.5,0],f=[-.15,i+.35+a[2],0];e.ell(u,[.17,.1,.11],s.JACKET,{dir:[1,-.25,0],group:1,paint:g=>g[1]<u[1]-.04&&Math.abs(g[2])<.055?s.TOP:void 0}),e.ell(f,[.11,.08,.1],s.JEANS,{dir:[1,-.3,0],group:1}),e.chain([[...v.add(f,[-.02,.06,0]),.07],[...v.add(f,[-.18,.08+a[0]*2,0]),.05],[...v.add(f,[-.34,.05+a[1]*3,.02]),.025]],s.JACKET,{group:12}),[[[-.32,i+.5+a[1]*2,-.07],[-.46,i+.38+a[0]*2,-.08]],[[-.34,i+.33+a[2]*2,.08],[-.55,i+.44-a[1]*3,.1]]].forEach(([g,x],m)=>{const M=m?6:4,_=v.add(f,[-.04,0,m?.06:-.06]);e.seg(_,g,.055,.045,s.JEANS,{group:M}),e.seg(g,x,.045,.04,s.JEANS,{group:M}),e.ell(v.add(x,[-.05,0,0]),[.08,.04,.045],s.SHOES,{dir:[-1,.3,0],group:M,paint:A=>A[1]<x[1]-.03?s.BELLY:void 0})}),e.ell(h,[.11,.115,.1],s.SKIN,{group:8,paint:g=>g[0]<h[0]-.01||g[1]>h[1]+.075?s.HAIR:void 0});for(const g of[-1,1]){const x=st.surface(h,[.11,.115,.1],v.norm([.85,.1,g*.45]));e.ell(x,[.026,.036,.026],s.BELLY,{group:8}),e.ell(v.add(x,[.012,0,g*.004]),[.014,.018,.014],s.EYE,{group:8})}e.ell(st.surface(h,[.11,.115,.1],v.norm([1,-.45,0])),[.012,.016,.04],s.BELLY,{group:8}),e.chain([[...v.add(h,[-.06,.03,0]),.065],[...v.add(h,[-.22,.05+a[1]*2,.01]),.05],[...v.add(h,[-.4,.06+a[2]*3,.02]),.03],[...v.add(h,[-.55,.07+a[0]*3,.02]),.012]],s.HAIR,{group:9});for(const g of[-1,1])e.ell(v.add(h,[-.015,0,g*.105]),[.05,.055,.03],s.PHONES,{group:10});e.chain([[...v.add(h,[-.005,.03,-.095]),.015],[...v.add(h,[-.02,.12,0]),.015],[...v.add(h,[-.005,.03,.095]),.015]],s.PHONES,{group:10});const p=v.add(h,[-.1+a[0],.2+a[1]*2,0]);e.ell(p,[.16,.014,.15],s.HAT,{dir:[1,.9,0],group:11}),e.chain([[...v.add(p,[-.02,.02,0]),.08],[...v.add(p,[-.14,.13,0]),.04],[...v.add(p,[-.3,.14+a[2]*2,0]),.012]],s.HAT,{group:11,paint:g=>Math.hypot(g[0]-p[0],g[1]-p[1])<.06?s.MAGIC:void 0}),e.seg(v.add(p,[.08,-.02,.08]),v.add(h,[.04,-.09,.08]),.008,.008,s.HAT,{group:11}),e.anchors.hand=l[1],e.anchors.hatTip=v.add(p,[-.3,.14+a[2]*2,0]);for(const[g,x,m,M]of[[-.86,o(-.8)+.05,.03,.22],[-.88,o(-.8)-.04,-.04,.16],[-.7,i+.45,.05,.14],[-.2,i+.5,-.04,.12]]){const _=t*.05%.1;e.seg([g-_,x,m],[g-_-M,x,m],.01,.004,s.MAGIC2,{group:30,extra:!0})}return e.ell([.02,.005,0],[.2,.005,.12],s.NOSE,{group:0}),e}const Rd={stand:{frames:3,fps:3},land:{frames:3,fps:10},takeoff:{frames:3,fps:10},talk:{frames:4,fps:2.5},placeSigil:{frames:3,fps:6},liftSigil:{frames:3,fps:6},sit:{frames:2,fps:1.5},twoStep:{frames:4,fps:4,party:"dance"},bounce:{frames:2,fps:4,party:"dance"},shuffle:{frames:4,fps:6,party:"dance"},spin:{frames:4,fps:6,party:"dance"},headbang:{frames:2,fps:4,party:"dance"},jump:{frames:3,fps:5,party:"dance"},dancePair:{frames:4,fps:4,party:"pair"},holdHands:{frames:2,fps:2,party:"pair"},hug:{frames:2,fps:1.5,party:"pair"},highFive:{frames:2,fps:3,party:"pair"},laugh:{frames:3,fps:4,party:"social"},drink:{frames:4,fps:1.5,party:"social"},run:{frames:4,fps:10,party:"move"},sitGround:{frames:2,fps:1,party:"rest"},stargaze:{frames:2,fps:1,party:"rest"},conga:{frames:4,fps:4,party:"pair"}},Uo=.34,Ku={binding:[-.02,.31,-.2],dir:[.02,1,-.04]},Ec=Math.PI/2,Cd={stand:[0,1,2].map(n=>({breathe:[0,.006,.012][n],sway:[0,.02,.035][n],free:[.04,.5+[0,.006,.012][n],.18],hand:"rest",broom:Ku})),land:[{crouch:.2,hop:.01,broom:{astride:!0},sway:.05},{crouch:.1,bend:.1,broom:{binding:[-.28,.26,-.08],dir:[.6,.5,-.06]},legUp:[.18,.24,.12],sway:.03,free:[.2,.58,.2],hand:"rest"},{breathe:.004,broom:{binding:[.06,.31,-.2],dir:[.18,1,-.03]},sway:.015,free:[.06,.52,.19],hand:"rest"}],takeoff:[{crouch:.1,broom:{binding:[-.1,.3,-.17],dir:[.35,.7,-.04]},free:[.16,.58,.2],hand:"rest",sway:.02},{crouch:.15,bend:.1,broom:{binding:[-.3,.28,-.06],dir:[.7,.4,-.04]},legUp:[.1,.26,.13],sway:.04,free:[.24,.55,.17],hand:"rest"},{hop:.1,broom:{astride:!0},toes:!0,sway:.06}],talk:[{free:[.47,.84,.13],hand:"palm",tilt:.35,mouth:!0,sway:.01},{free:[.32,1.18,.12],hand:"point",tilt:-.25,look:.12,sway:.02},{free:[.24,1.16,.3],elbow:[.26,.88,.26],hand:"wave",tilt:.45,mouth:!0,sway:.03},{free:[.15,.76,.1],hand:"chest",tilt:-.35,breathe:.01,sway:.015}],placeSigil:[{free:[.16,1.62,.1],hand:"palm",look:.22,breathe:.01,sway:.02},{free:[.42,1,.12],hand:"palm",look:.08,sway:.03},{crouch:.7,bend:.55,free:[.38,.1,.13],hand:"down",look:-.08,sway:.04}],liftSigil:[{crouch:.7,bend:.55,free:[.36,.08,.13],hand:"down",look:-.08,sway:.02},{crouch:.25,bend:.18,free:[.44,.82,.12],hand:"palm",look:.05,sway:.04},{breathe:.012,free:[.2,1.64,.1],hand:"palm",look:.25,sway:.05,toes:!0}],sit:[0,1].map(n=>({sit:!0,swing:[.06,-.06][n],bend:-.08,look:[.02,.1][n],tilt:[.15,-.2][n],sway:[.01,.03][n],breathe:[0,.008][n],broom:{binding:[-.24,.31,-.3],dir:[.32,1,-.06]},free:[.2,Uo+.14,.15],far:[.18,Uo+.14,-.13],hand:"rest"})),twoStep:[0,1,2,3].map(n=>{const e=[1,0,-1,0][n];return{broom:null,crouch:[.12,0,.12,0][n],hop:[0,.02,0,.02][n],roll:e*.08,tilt:e*.3,sway:[.02,.035,.02,.035][n],look:.05,feet:[[0,.07,-.1-(e<0?.12:0)],[.04,.07,.1+(e>0?.12:0)]],free:[.18,.64+(e>0?.08:0),.19],elbow:[-.02,.6,.24],far:[.16,.64+(e<0?.08:0),-.19],farElbow:[-.02,.6,-.24]}}),bounce:[0,1].map(n=>({broom:null,crouch:[.16,0][n],hop:[0,.05][n],look:.18,mouth:!!n,sway:[.01,.04][n],toes:!!n,free:[.08,1.15+n*.12,.22],hand:"wave",far:[.08,1.15+n*.12,-.22],farHand:"wave"})),shuffle:[0,1,2,3].map(n=>{const e=[1,0,-1,0][n];return{broom:null,hop:[0,.025,0,.025][n],roll:e*.06,hipX:e*.03,tilt:-e*.2,sway:.02+Math.abs(e)*.02,feet:[[e<0?.12:e>0?-.06:.02,.07+(e?0:.03),-.1],[e>0?.12:e<0?-.06:.02,.07,.1]],free:[.14-e*.08,.56,.19],far:[.14+e*.08,.56,-.19]}}),spin:[0,1,2,3].map(n=>({broom:null,turn:n*Ec,toes:!0,hop:.01,sway:.06,look:.1,mouth:n===0,feet:[[.02,.07,-.06],[.02,.07,.06]],free:[.02,.8,.44],hand:"palm",far:[.02,.8,-.44],farHand:"palm"})),headbang:[0,1].map(n=>({broom:null,crouch:.1,bend:[.32,.02][n],nod:[1,-.3][n],look:[-.1,.15][n],sway:[-.06,.04][n],mouth:!n,free:[.25,[1,1.14][n],.15],hand:"point",far:[.12,.6,-.18]})),jump:[{broom:null,crouch:.35,bend:.2,free:[-.12,.42,.18],far:[-.12,.42,-.18],look:.05,sway:.01},{broom:null,hop:.2,toes:!0,free:[.1,1.3,.26],hand:"wave",far:[.1,1.3,-.26],farHand:"wave",look:.2,mouth:!0,sway:.06},{broom:null,crouch:.2,free:[.2,.95,.26],hand:"wave",far:[.2,.95,-.26],farHand:"wave",look:.1,mouth:!0,sway:.03}],dancePair:[0,1,2,3].map(n=>{const e=[1,0,-1,0][n],t=[.86,.92,.86,.8][n];return{broom:null,crouch:[.1,0,.1,.04][n],roll:e*.06,tilt:e*.25,sway:.03,look:.06,mouth:n===1,feet:[[e<0?.06:0,.07,-.1],[e>0?.06:0,.07,.1]],free:[.3,t,.14],hand:"wave",far:[.3,t,-.14],farHand:"wave",pair:[.32,t,0]}}),holdHands:[0,1].map(n=>({crouch:[0,.05][n],roll:[.03,-.02][n],tilt:[.2,-.1][n],sway:[.02,.035][n],look:.04,mouth:!!n,free:[.02,.5,.34],elbow:[0,.62,.25],hand:"rest",pair:[.02,.5,.36]})),hug:[0,1].map(n=>({broom:null,bend:.1,roll:[.03,-.03][n],tilt:[.3,.2][n],shut:!0,sway:[.02,.03][n],free:[.3,.84,.16],elbow:[.14,.78,.25],far:[.3,.84,-.16],farElbow:[.14,.78,-.25],pairAt:"chest"})),highFive:[{free:[-.05,1.08,.18],elbow:[-.06,.86,.22],hand:"wave",tilt:-.2,look:.15,sway:.02},{free:[.27,1.12,.12],hand:"wave",tilt:.2,look:.12,mouth:!0,sway:.04,pair:[.3,1.14,.12]}].map(n=>({...n,pair:n.pair||n.free})),laugh:[{bend:-.12,look:.2,shut:!0,mouth:"laugh",free:[.13,.62,.12],hand:"chest",tilt:.2,sway:.02},{bend:.3,crouch:.1,look:-.05,shut:!0,mouth:"laugh",free:[.2,.42,.14],tilt:-.1,sway:.04},{bend:.05,look:.1,shut:!0,mouth:"laugh",free:[.1,.44,.17],hand:"down",tilt:.4,sway:.03}],drink:[{cup:!0,free:[.2,.68,.16],hand:"rest",sway:.01,tilt:.1},{cup:!0,cupTip:.9,free:[.15,.9,.07],hand:"rest",look:.18,sway:.02},{cup:!0,free:[.22,.7,.17],hand:"rest",mouth:!0,tilt:-.25,sway:.015},{cup:!0,free:[.33,.96,.12],hand:"rest",look:.12,mouth:!0,sway:.03,pairAt:"cup"}],run:[0,1,2,3].map(n=>({bend:.25,crouch:[.1,0,.1,0][n],hop:[0,.04,0,.04][n],sway:[.05,.07,.05,.07][n],look:-.04,mouth:n===1,feet:[[[-.2,.2,-.1],[.08,.28,-.1],[.22,.07,-.1],[.02,.07,-.1]][n],[[.22,.07,.1],[.02,.07,.1],[-.2,.2,.1],[.08,.28,.1]][n]],free:[[-.1,.6,.17],[.05,.62,.17],[.2,.7,.17],[.05,.62,.17]][n],far:[[.2,.66,-.17],[.06,.62,-.17],[-.08,.6,-.17],[.06,.62,-.17]][n],broom:{dir:[1,.3,0],held:.55}})),sitGround:[0,1].map(n=>({sit:!0,seat:.02,bend:-.35,look:[.08,.16][n],tilt:[.1,-.15][n],sway:[.01,.025][n],breathe:[0,.008][n],feet:[[.34,.06,-.1],[.36+n*.03,.06+n*.02,.1]],free:[-.2,.06,.2],hand:"down",far:[-.2,.06,-.2],broom:{binding:[.72,.03,-.3],dir:[-1,0,.02]}})),stargaze:[0,1].map(n=>({broom:null,lie:Ec,look:[.08,.02][n],tilt:[.15,-.1][n],sway:.01,breathe:[0,.008][n],feet:[[-.06,.2,-.1],[-.06+n*.02,.2+n*.05,.1]],free:[-.12,1,.12],elbow:[.02,.98,.27],far:[-.12,1,-.12],farElbow:[.02,.98,-.27]})),conga:[0,1,2,3].map(n=>{const e=[0,1,0,-1][n];return{broom:null,hop:[.02,0,.02,0][n],roll:e*.07,tilt:e*.2,sway:.03,mouth:n===0,look:.05,feet:[[0,.07+(e<0?.14:0),-.1-(e<0?.2:0)],[0,.07+(e>0?.14:0),.1+(e>0?.2:0)]],free:[.36,.82,.13],far:[.36,.82,-.13],pair:[.36,.82,0],backAt:!0}})};function Ld(n,e,t){const i=Math.hypot(e[0]-n[0],e[1]-n[1]),r=v.lerp(n,e,.5);if(i>=2*t)return r;const a=Math.sqrt(t*t-i*i/4),o=(e[0]-n[0])/i,l=(e[1]-n[1])/i;return[r[0]-l*a,r[1]+o*a,r[2]]}function Dd(n,e,t=Fo){const i=Cd[n],r={crouch:0,bend:0,roll:0,hop:0,breathe:0,sway:0,tilt:0,look:0,nod:0,broom:Ku,...i[e%i.length]},a=new st({blend:.03}),o=r.hop,l=r.sway,c=r.sit?(r.seat??Uo)+.06:.45-r.crouch*.21+o,h=-r.crouch*.12+(r.hipX||0),u=r.broom,f=!!(u&&u.astride),d=c-.04,p=!u||f?[1,0,0]:v.norm(u.dir),g=f?[-.36,d,0]:u?u.held!==void 0?v.sub(r.far,v.mul(p,u.held)):u.binding:null,x=L=>v.add(g,v.mul(p,L));u&&(a.seg(x(0),x(f?.98:1.1),.022,.018,s.BROOM,{group:2}),a.ell(x(-.13),[.17,.07,.08],s.STRAW,{dir:p,group:3,paint:L=>{const N=v.dot(v.sub(L,g),p);return N<-.22?s.MAGIC2:N>-.01?s.BROOM:void 0}}));for(const L of[-1,1]){const N=L>0?6:4,O=[h,c,L*.07],U=r.feet&&r.feet[L>0?1:0],W=r.sit?r.swing*L:0,F=U?[U[0],U[1]+o,U[2]]:r.sit?[.24+W,.09+Math.max(0,W)*.6,L*.1]:L>0&&r.legUp?r.legUp:[(L>0?.05:-.01)+(r.toes?-.03:0),.07+(r.toes?o*.4:o),L*.1],Q=r.sit&&!U?[.21,c+.01,L*.09]:Ld(O,F,.21);a.seg(O,Q,.055,.045,s.JEANS,{group:N}),a.seg(Q,F,.045,.04,s.JEANS,{group:N});const X=r.toes?[.03,-.045,0]:[.05,-.03,0];a.ell(v.add(F,X),[.08,.04,.045],s.SHOES,{dir:r.toes?[1,-.6,0]:[1,0,0],group:N,paint:te=>te[1]<F[1]+X[1]-.015?s.BELLY:void 0})}const m=v.norm([Math.sin(r.bend),Math.cos(r.bend),Math.sin(r.roll)]),M=[Math.cos(r.bend),-Math.sin(r.bend),0],_=[h,c+.03,0];a.ell(_,[.1,.08,.105],s.JEANS,{group:1});const A=v.add(_,v.add(v.mul(m,.19),[0,r.breathe,0]));a.ell(A,[.1,.15+r.breathe*.5,.115],s.JACKET,{dir:M,group:1,paint:Yu(t,A,M)}),t.top!=="poncho"&&t.top!=="cape"&&a.chain([[...v.add(A,v.add(v.mul(M,-.07),v.mul(m,-.08))),.07],[...v.add(A,v.add(v.mul(M,-.11-l),v.mul(m,-.2))),.05],[...v.add(A,v.add(v.mul(M,-.13-l*1.6),v.mul(m,-.29))),.025]],s.JACKET,{group:12}),Xu(a,t,A,M,m,!1);const E=v.add(A,v.add(v.mul(m,.27),[r.look*.03+r.nod*.07,-r.nod*.05,r.tilt*.04])),R=L=>v.add(A,v.add(v.mul(m,.1),[0,0,L*.12])),T=f?[.28,d+.03,-.05]:u?x(Math.max(.12,(Math.min(.62,c+.2)-g[1])/Math.max(.3,p[1]))):null,P=f?[.28,d+.03,.05]:r.free;for(const L of[-1,1]){const N=L>0?7:5,O=R(L),U=L>0?P:r.far||T,W=L>0&&r.elbow?r.elbow:L<0&&r.farElbow?r.farElbow:v.add(v.lerp(O,U,.5),[-.03,-.02,L*.05]);a.seg(O,W,.04,.035,s.JACKET,{group:N}),a.seg(W,U,.035,.03,s.JACKET,{group:N}),yd(a,L>0?f?"grip":r.hand:r.farHand||"grip",U,N),Vu(a,t,W,U,L,N)}if(r.cup){const L=v.norm([-(r.cupTip||0),1,0]),N=v.add(P,v.mul(L,-.03)),O=v.add(N,v.mul(L,.12));a.seg(N,O,.034,.046,s.ACCENT,{group:14}),a.ell(O,[.046,.01,.046],s.BELLY,{dir:[L[1],-L[0],0],up:L,group:14}),a.anchors.cup=O}a.ell(E,[.11,.115,.1],s.SKIN,{group:8,paint:L=>L[0]<E[0]-.01||L[1]>E[1]+.075?s.HAIR:void 0}),Wu(a,t,E,r.look,r.tilt,r.shut),r.mouth&&a.ell(st.surface(E,[.11,.115,.1],v.norm([1,-.5+r.look,r.tilt*.1])),r.mouth==="laugh"?[.014,.026,.035]:[.012,.016,.025],s.NOSE,{group:8});const S=Math.max(0,r.nod);if(Gu(a,t,E,[[...v.add(E,[-.06,.02,0]),.06],[...v.add(E,[-.12-l+S*.2,-.12+S*.04,.02+r.tilt*.03]),.05],[...v.add(E,[-.13-l*1.5+S*.38,-.25+S*.08,.03+r.tilt*.04]),.03]]),t.phones){for(const L of[-1,1])a.ell(v.add(E,[-.015,0,L*.105]),[.05,.055,.03],s.PHONES,{group:10});a.chain([[...v.add(E,[-.005,.03,-.095]),.015],[...v.add(E,[-.005,.11,-.05]),.015],[...v.add(E,[-.005,.125,0]),.015],[...v.add(E,[-.005,.11,.05]),.015],[...v.add(E,[-.005,.03,.095]),.015]],s.PHONES,{group:10})}const y=v.add(E,[-.03+r.nod*.03,.1-r.nod*.02,r.tilt*.02]),C=r.tilt*.05,I=Hu(a,t,y,[1,.25-r.look*.8-r.nod*.7,r.tilt*.3],v.add(y,[-.05+r.nod*.05,.17,C]),v.add(y,[-.16-l*.5+r.nod*.12,.27-r.nod*.04,C*2]));return a.anchors.hand=P,a.anchors.hatTip=I,r.pair&&(a.anchors.pair=r.pair),r.pairAt==="chest"&&(a.anchors.pair=v.add(A,v.mul(M,.11))),r.pairAt==="cup"&&(a.anchors.pair=a.anchors.cup),r.backAt&&(a.anchors.back=[R(1)[0],r.free[1],0]),r.turn&&Sc(a,"y",r.turn,[h,0,0]),r.lie&&(Sc(a,"z",r.lie,_),wd(a,.015)),a.ell([.02,.005,0],[.2,.005,.12],s.NOSE,{group:0}),r.lie&&Object.assign(a.parts[a.parts.length-1],{c:[-.18,.005,0],r:[.45,.005,.14]}),a}function qu({frame:n=0,lean:e=!1,pose:t,look:i=Fo}={}){const r={...Fo,...i};if(t==="fast")return Td(n);if(Rd[t])return Dd(t,n,r);const a=t==="lean"?n%4:-1;a>=0&&(e=!0,t=void 0);const o=t==="rise",l=t==="descend",c=t==="brake",h=o||l||c,u=new st({blend:.03}),f=h?0:a>=0?[0,.012,.02,.01][a]:[0,.025,.045][n%3],d=h?0:a>=0?.08+[0,.012,.004,-.006][a]:[0,.015,-.01][n%3]+(e?.08:0),p=.42+f,g=o?.3:l?-.27:c?-.12:e?.1:0,x=Math.min(.1,Math.max(0,g)),m=h?[.02,.06][n%2]:a>=0?[.01,.04,.06,.03][a]:[0,.03,.05][n%3],M=l?1:o?-.6:0;if(u.seg([-.5,p-d*2,0],[.62,p+d*3,0],.022,.018,s.BROOM,{group:2}),c)u.ell([-.56,p-.08,0],[.17,.07,.09],s.STRAW,{dir:[.55,1,0],group:3,paint:y=>y[1]<p-.18?s.MAGIC2:y[1]>p-.01?s.BROOM:void 0});else{const y=a>=0?[0,.035,-.015,.05][a]:0;u.ell([-.62,p-d*2-.01,0],[.17,.07,.08],s.STRAW,{dir:[1,d,0],group:3,paint:C=>C[0]<-.72+y?s.MAGIC2:a>=0&&C[0]<-.66+y?s.MAGIC:C[0]>-.5?s.BROOM:void 0})}for(const y of[-1,1]){const C=a>=0?[[0,0],[.07,.04],[.01,.015],[-.06,-.015]][(a+(y>0?0:2))%4]:[0,0],I=[-.04,p+.06,y*.07],L=c?[.18,p-.01,y*.14]:l?[.16,p-.05,y*.14]:o?[.06,p-.07,y*.14]:[.12+g*.5,p-.02,y*.14],N=c?y>0?[.44,p-.02+m,y*.13]:[.3,p-.16,y*.13]:l?[.2,p-.26,y*.13]:o?[-.1,p-.23,y*.13]:[.08+g+C[0],p-.2+C[1],y*.13];u.seg(I,L,.055,.045,s.JEANS,{group:y>0?6:4}),u.seg(L,N,.045,.04,s.JEANS,{group:y>0?6:4}),u.ell(v.add(N,[.05,-.02,0]),[.08,.04,.045],s.SHOES,{group:y>0?6:4,paint:O=>O[1]<N[1]-.04?s.BELLY:void 0})}u.ell([-.04,p+.08,0],[.11,.07,.1],s.JEANS,{group:1});const _=[0+g*.8,p+.26-Math.abs(g)*.3,0],A=r.top==="jacket"||r.top==="poncho"||r.top==="cape"?y=>y[0]>_[0]+.04&&Math.abs(y[2])<.055?s.TOP:void 0:Yu(r,_,[1,0,0]);u.ell(_,[.1,.16,.11],s.JACKET,{dir:[g*2.5,1,0],up:[-1,0,0],group:1,paint:A}),Xu(u,r,_,[1,0,0],v.norm([g,1,0]),!0);const E=a>=0?[-.02,.05,.09,.03][a]:0;c?u.chain([[...v.add(_,[-.08,-.06,0]),.07],[...v.add(_,[-.02,.12+m,.02]),.05],[...v.add(_,[.14,.18+m,.03]),.025]],s.JACKET,{group:12}):(h||a>=0)&&r.top!=="cape"&&u.chain([[...v.add(_,[-.08,-.1,0]),.07],[...v.add(_,[-.2,-.12+(a>=0?E*.5:M*(.08+m)),0]),.05],[...v.add(_,[-.3-(a>=0?.03:0),-.12+(a>=0?E:M*(.16+m*1.5)),.02]),.025]],s.JACKET,{group:12});const R=v.add(_,[.03+g*.5,.26,0]),T=v.add(R,[c?.05:l?-.01:-.03,c?.06:.1,0]);for(const y of[-1,1]){const C=v.add(_,[.01,.11,y*.11]),I=l&&y>0?v.add(T,[.1,.01,.1]):c?[.3,p+.03,y*.05]:[.26+g,p+.03,y*.05],L=l&&y>0?v.add(C,[.1,.02,.1]):v.lerp(C,I,.5);u.seg(C,L,.04,.035,s.JACKET,{group:y>0?7:5}),u.seg(L,I,.035,.03,s.JACKET,{group:y>0?7:5}),u.ell(I,[.035,.03,.035],s.SKIN,{group:y>0?7:5}),Vu(u,r,L,I,y,y>0?7:5),y>0&&(u.anchors.hand=I)}u.ell(R,[.11,.115,.1],s.SKIN,{group:8,paint:y=>y[0]<R[0]-.01||y[1]>R[1]+.075?s.HAIR:void 0}),Wu(u,r,R);const P=c?[[...v.add(R,[-.06,.06,0]),.06],[...v.add(R,[.04,.13+m,.03]),.045],[...v.add(R,[.2,.08+m,.04]),.02]]:[[...v.add(R,[-.06,.02,0]),.06],[...v.add(R,[-.18-x,-.05+m+M*.1,.02]),.045],[...v.add(R,[-.3-x*1.5,-.08+m*1.6+M*.22,.03]),.02]];if(Gu(u,r,R,P),r.phones){for(const y of[-1,1])u.ell(v.add(R,[-.015,0,y*.105]),[.05,.055,.03],s.PHONES,{group:10});u.chain([[...v.add(R,[-.005,.03,-.095]),.015],[...v.add(R,[-.005,.11,-.05]),.015],[...v.add(R,[-.005,.125,0]),.015],[...v.add(R,[-.005,.11,.05]),.015],[...v.add(R,[-.005,.03,.095]),.015]],s.PHONES,{group:10})}const S=o?.1:0;if(u.anchors.hatTip=Hu(u,r,T,c?[1,-.55,0]:[1,.25+S*3,0],c?v.add(T,[.06,.16,0]):v.add(T,[-.05-x-S*.5,.17-S*.3,0]),c?v.add(T,[.2,.22+m*.5,0]):v.add(T,[-.16-x*1.5-S,.27+m*.5-S*.5,0])),h){const y=Ad[t]+(c?[0,.06][n%2]:0),C=Math.cos(y),I=Math.sin(y),L=[0,p,0],N=F=>[L[0]+(F[0]-L[0])*C-(F[1]-L[1])*I,L[1]+(F[0]-L[0])*I+(F[1]-L[1])*C,F[2]],O=F=>[L[0]+(F[0]-L[0])*C+(F[1]-L[1])*I,L[1]-(F[0]-L[0])*I+(F[1]-L[1])*C,F[2]],U=F=>[F[0]*C-F[1]*I,F[0]*I+F[1]*C,F[2]];for(const F of u.parts)if(F.type==="ell"?(F.c=N(F.c),F.axes=F.axes.map(U)):(F.a=N(F.a),F.b=N(F.b)),F.paint){const Q=F.paint;F.paint=(X,te)=>Q(O(X),te)}for(const F of u.flats)F.c=N(F.c),F.u=U(F.u),F.v=U(F.v);u.anchors.hand=N(u.anchors.hand),u.anchors.hatTip=N(u.anchors.hatTip);const W=Math.min(...u.parts.map(F=>F.type==="ell"?F.c[1]-Math.max(...F.r):Math.min(F.a[1]-F.r1,F.b[1]-F.r2)));if(W<.08){for(const F of u.parts){const Q=.08-W;F.type==="ell"?F.c=[F.c[0],F.c[1]+Q,F.c[2]]:(F.a=[F.a[0],F.a[1]+Q,F.a[2]],F.b=[F.b[0],F.b[1]+Q,F.b[2]])}for(const F of["hand","hatTip"])u.anchors[F]=v.add(u.anchors[F],[0,.08-W,0])}if(c){const F=N([-.45,p-.24,0]);for(let Q=0;Q<5;Q++){const X=Q+n*.5,te=.055-Q*.008;u.ell([F[0]+.1+X*.08,Math.max(.04,F[1]-.02+Math.sin(X*1.9)*.04),Math.cos(X*1.3)*.06],[te,te*.8,te],Q<2?s.BELLY:Q%2?s.MAGIC:s.MAGIC2,{group:25+Q,extra:!0})}}if(o){const F=N([-.8,p,0]);for(let Q=0;Q<5;Q++){const X=Q+n*.5,te=.05-Q*.007;u.ell([F[0]-.02+Math.sin(X*2.1)*.06,Math.max(.04,F[1]-.08-X*.09),Math.cos(X*1.7)*.05],[te,te,te],Q%2?s.MAGIC:s.MAGIC2,{group:20+Q,extra:!0})}}}return u.ell([.02,.005,0],[.2,.005,.12],s.NOSE,{group:0}),u}const Zu=(n={})=>Math.round((n.size||8)*Math.sqrt(n.growth||20)*(2/(n.pixel||3))*1.9),qs=new Map,Bo=n=>(qs.has(n)||qs.set(n,Ii(qu({frame:0}),{height:n}).s),qs.get(n)),$u=(n={})=>Bo(Zu(n)),Pd={away:-Math.PI/2,towards:Math.PI/2};function Od(n={},{frame:e=0,lean:t=!1,facing:i="towards",pose:r,heading:a="side",look:o}={}){const l=Zu(n),c=Pd[a],h=qu({frame:e,lean:t,pose:r,look:o}),{sp:u,project:f,s:d}=c!==void 0?Ii(h,{scale:Bo(l),yaw:c}):r?Ii(h,{scale:Bo(l),facing:i}):Ii(h,{height:l,facing:i});return u.scale=d,h.anchors.hand&&(u.anchors=Object.fromEntries(Object.entries(h.anchors).filter(([p])=>p!=="feet").map(([p,g])=>[p,f(g)]))),Id(u),u}const ko=new Set([s.EYE,s.GLINT,s.NOSE]);function Id(n){let e=0;for(let t=0;t<3;t++){const i=Nd(n)+Fd(n);if(e+=i,!i)break}return e}function Ju(n,e,t,i,r,a){const o=new Map;let l=0,c=0;for(let h=-1;h<=1;h++)for(let u=-1;u<=1;u++){const f=i+u,d=r+h;if(!u&&!h||f<0||d<0||f>=e||d>=t)continue;const p=n[d*e+f];p&&!a(p)&&o.set(p,(o.get(p)||0)+1)}for(const[h,u]of o)u>c&&(l=h,c=u);return l}function Nd(n){const{w:e,h:t}=n,i=n.m.slice(),r=new Uint8Array(e*t);let a=0;for(let o=0;o<e*t;o++){if(i[o]!==s.LINE||r[o])continue;const l=[o],c=[o];for(r[o]=1;c.length;){const h=c.pop(),u=h%e,f=h/e|0;for(let d=-1;d<=1;d++)for(let p=-1;p<=1;p++){const g=u+p,x=f+d,m=x*e+g;g>=0&&x>=0&&g<e&&x<t&&!r[m]&&i[m]===s.LINE&&(r[m]=1,l.push(m),c.push(m))}}if(!(l.length>2))for(const h of l){const u=Ju(i,e,t,h%e,h/e|0,f=>f===s.LINE||ko.has(f));u&&(n.m[h]=u,a++)}}return a}function Fd(n){const{w:e,h:t}=n,i=n.m.slice();let r=0;const a=(o,l)=>[[1,0],[-1,0],[0,1],[0,-1]].filter(([c,h])=>{const u=o+c,f=l+h;return u<0||f<0||u>=e||f>=t||!i[f*e+u]}).length;for(let o=0;o<t;o++)for(let l=0;l<e;l++){const c=o*e+l,h=i[c];if(!h)continue;const u=h===s.EYE&&a(l,o)>=2;if(ko.has(h)&&!u)continue;let f=!1;for(let p=-1;p<=1&&!f;p++)for(let g=-1;g<=1;g++){const x=l+g,m=o+p;if((g||p)&&x>=0&&m>=0&&x<e&&m<t&&i[m*e+x]===h){f=!0;break}}if(f&&!u)continue;if(a(l,o)===4){n.m[c]=0,n.g[c]=0,n.n.fill(0,c*3,c*3+3),r++;continue}const d=Ju(i,e,t,l,o,p=>ko.has(p)||p===h);d&&(n.m[c]=d,r++)}return r}const Ud=[{id:"raver",name:"Raver",look:{hat:"crooked",hair:"long",top:"mesh",shades:!0,glowsticks:!0},outfit:{hat:[.86,.7,.55],top:[0,0,.12],jacket:[.86,.6,.7],jeans:[.62,.3,.25],sneakers:[.52,.5,.95],headphones:[.33,.7,.9],shades:[0,0,.1],frame:[.86,.7,1]}},{id:"flowerChild",name:"Flower child",look:{hat:"flowers",hair:"long",top:"poncho",phones:!1},outfit:{hat:[.08,.45,.5],jacket:[.07,.5,.75],trim:[.95,.55,.85],pattern:[.15,.55,.95],jeans:[.58,.35,.75],sneakers:[.08,.35,.6],flower:[.95,.45,.98],flower2:[.15,.6,1]}},{id:"disco",name:"Disco",look:{hat:"classic",hair:"bob",top:"sequins",shades:!0},outfit:{hat:[.75,.5,.35],top:[.12,.55,.8],pattern:[.13,.2,1],jacket:[.12,.45,.65],jeans:[.75,.4,.5],sneakers:[.13,.6,.9],frame:[.13,.6,.95]}},{id:"punk",name:"Punk",look:{hat:"small",hair:"mohawk",top:"jacket",glowsticks:!0},outfit:{hat:[0,0,.15],top:[0,0,.9],jacket:[0,.05,.18],jeans:[0,.7,.55],sneakers:[0,0,.12],headphones:[0,.75,.85]},hair:[.88,.7,.95]},{id:"festival",name:"Festival",look:{hat:"floppy",hair:"buns",top:"cape"},outfit:{hat:[.1,.35,.6],top:[.5,.35,.9],jacket:[.55,.55,.55],jeans:[.62,.25,.8],sneakers:[.1,.3,.45]}},{id:"catHat",name:"Cat hat",look:{hat:"bucket",hair:"bob",top:"jacket",glowsticks:!0},outfit:{hat:[.82,.35,.75],top:[0,0,.95],jacket:[.52,.4,.75],jeans:[.62,.45,.35],sneakers:[.82,.4,.95],headphones:[.13,.7,1]}},{id:"glam",name:"Glam",look:{hat:"crooked",hair:"buns",top:"sequins",phones:!1},outfit:{hat:[.62,.1,.85],top:[.6,.08,.78],pattern:[.6,.02,1],jacket:[.62,.12,.6],jeans:[.62,.1,.35],sneakers:[.62,.05,.95]},hair:[.6,.05,.92]},{id:"goth",name:"Goth",look:{hat:"classic",hair:"long",top:"cape",shades:!0},outfit:{hat:[.78,.4,.2],top:[.95,.65,.45],jacket:[.8,.55,.25],jeans:[.78,.3,.15],sneakers:[0,0,.12],headphones:[.95,.6,.7],shades:[.95,.5,.15],frame:[0,0,.7]},hair:[.75,.3,.12]},{id:"candy",name:"Candy",look:{hat:"small",hair:"buns",top:"mesh",glowsticks:!0},outfit:{hat:[.92,.45,.95],top:[.5,.45,.95],jacket:[.92,.35,.95],jeans:[.5,.3,.9],sneakers:[.15,.5,1]},hair:[.92,.35,1]},{id:"boho",name:"Boho",look:{hat:"floppy",hair:"long",top:"poncho",shades:!0},outfit:{hat:[.06,.55,.4],jacket:[.03,.55,.6],trim:[.12,.6,.9],pattern:[.45,.4,.7],jeans:[.6,.45,.55],sneakers:[.07,.45,.5],frame:[.07,.5,.5]}}];Object.fromEntries(Ud.map(n=>[n.id,n]));const ut=(n,e=0)=>{const t=Math.sin(n*127.1+e*311.7)*43758.5453;return t-Math.floor(t)},zr=n=>{const e=ut(Math.floor(n[0]*14)+Math.floor(n[2]*14)*13,Math.floor(n[1]*6));return e<.14?s.BARKD:e>.88?s.BARKL:void 0},Bd=n=>e=>{const t=ut(Math.floor(e[0]*10),Math.floor(e[1]*10)+Math.floor(e[2]*10)*7);return e[1]<n[1]-.2||t<.2?s.LEAF3:t>.8?s.LEAF2:void 0},Si=(n,e,t,i,r=!0)=>n.ell(e,t,s.STONE,{group:i,rough:.025,paint:a=>a[1]>e[1]+t[1]*.45&&r?s.MOSS:Math.abs(Math.sin(a[0]*13+a[2]*7))<.06?s.STONED:void 0}),Ba=(n,e,t,i)=>n.ell(e,t,s.LEAF,{group:i,rough:.04,paint:Bd(e)}),cn=(n,e,t)=>n.chain(e,s.TRUNK,{group:t,rough:.012,paint:zr}),ka=(n,e,t,i,r,a=.3,o=s.LEAF2)=>{for(let l=0;l<e;l++){const c=ut(r,l)*6.283,h=t*Math.sqrt(ut(l,r)),u=Math.cos(c)*h,f=Math.sin(c)*h*.7;n.ell([u,a*.3,f],[.07,a*(.35+ut(l,4)*.3),.07],o,{group:i+l%3,paint:d=>d[1]>a*.45?s.LEAF:void 0})}},za=(n,e,t,i)=>n.ell(e,[t[0],.015,t[1]],s.WATER,{group:i}),kd={"sleeping-giant"(n){const e=t=>i=>{const r=ut(Math.floor(i[0]*8),Math.floor(i[2]*8)+Math.floor(i[1]*8)*5);return r<.15?s.LEAF3:r>.86?s.LEAF2:void 0};for(const[t,i]of[[[.85,.42,0],[.7,.5,.66]],[[0,.3,0],[.62,.36,.6]],[[-.8,.3,0],[.56,.36,.62]],[[1.85,.5,.02],[.5,.5,.48]],[[-1.55,.72,.3],[.38,.5,.3]],[[-1.55,.72,-.3],[.38,.5,.3]],[[-2.2,.3,.32],[.42,.3,.26]],[[-2.2,.3,-.32],[.42,.3,.26]],[[.6,.2,.78],[.75,.2,.2]],[[.6,.2,-.78],[.75,.2,.2]]])n.ell(t,i,s.MOSS,{group:1,rough:.03,paint:e()});Si(n,[2.25,.75,.12],[.13,.15,.11],2,!1);for(const t of[-.12,.22])n.ell([2.12,.88,t],[.08,.04,.07],s.STONED,{group:3});Si(n,[-.2,.16,.95],[.2,.15,.18],4),Si(n,[-.2,.16,-.95],[.18,.14,.16],5),n.ell([2,.95,.02],[.42,.14,.4],s.LEAF3,{group:6,rough:.03}),ka(n,26,2.8,10,3,.3)},"fern-grotto"(n){n.ell([0,.16,0],[.78,.2,.72],s.STONE,{group:1,rough:.015,paint:e=>e[1]>.3?s.MOSS:void 0}),za(n,[0,.345,0],[.55,.5],2);for(let e=0;e<6;e++){const t=e/6*Math.PI*2+.4,i=1.5+ut(e)*.3,r=[Math.cos(t)*i,0,Math.sin(t)*i*.8],a=1.1+ut(e,2)*.7,o=v.add(r,[0,a,0]);n.seg(r,o,.12,.09,s.TRUNK,{group:3+e,rough:.02,paint:zr});for(let l=0;l<7;l++){const c=l/7*Math.PI*2+e,h=[Math.cos(c),0,Math.sin(c)];n.chain([[...o,.05],[...v.add(o,v.add(v.mul(h,.45),[0,.18,0])),.04],[...v.add(o,v.add(v.mul(h,.9),[0,-.15,0])),.015]],l%2?s.LEAF:s.LEAF2,{group:10+e})}}for(let e=0;e<5;e++){const t=e*1.3;Si(n,[Math.cos(t)*.95,.08,Math.sin(t)*.95],[.16,.12,.14],20+e)}},"sunken-boat"(n){za(n,[.3,.01,.15],[1.9,1.15],1);const e=[0,.12,0],t=v.norm([1,.28,.12]);n.ell(e,[1.3,.45,.55],s.WOOD,{dir:t,group:2,paint:i=>(v.dot(v.sub(i,e),[0,1,0])*9+9)%1<.14?s.BARKD:i[1]>.35&&ut(Math.floor(i[0]*9))<.4?s.MOSS:void 0}),n.ell(v.add(e,[0,.14,0]),[1.2,.4,.47],s.BARKD,{dir:t,group:2,cut:!0});for(let i=-2;i<=2;i++)n.seg(v.add(e,v.add(v.mul(t,i*.4),[0,.1,-.42])),v.add(e,v.add(v.mul(t,i*.4),[0,.1,.42])),.04,.04,s.WOOD,{group:3});n.seg([-.9,.05,.7],[.3,1,.55],.03,.03,s.WOOD,{group:4}),n.box([-.98,.06,.72],[.2,.02,.07],s.WOOD,{dir:[1.2,-.8,-.15],group:4}),ka(n,18,2.2,10,5,.45)},"bramble-wagon"(n){const e=v.norm([1,-.12,0]);n.box([0,.62,0],[1.1,.22,.52],s.WOOD,{dir:e,round:.04,group:1,paint:t=>(t[0]+3)*4%1<.08?s.BARKD:void 0}),n.box([0,.72,0],[1,.2,.43],s.BARKD,{dir:e,group:1,cut:!0});for(const[t,i,r,a]of[[-.72,.55,.4,.4],[-.72,-.55,.4,.4],[.72,-.55,.32,.37]])n.ell([t,r,i],[a,a,.06],s.WOOD,{group:2+(t>0?1:0)+(i>0?2:0),paint:o=>{const l=o[0]-t,c=o[1]-r,h=Math.hypot(l,c),u=Math.atan2(c,l);return h>a*.82||h<a*.18?s.BARKD:Math.abs(Math.sin(u*4))<.2?s.WOOD:s.NOSE}});n.ell([.95,.1,.75],[.37,.06,.37],s.WOOD,{group:7,paint:t=>Math.hypot(t[0]-.95,t[2]-.75)>.3?s.BARKD:void 0});for(const t of[-.3,.3])n.seg([1.05,.55,t],[1.9,.05,t*1.4],.04,.035,s.WOOD,{group:8});for(let t=0;t<14;t++){const i=ut(t,1)*6.283,r=Math.cos(i)*1.5,a=Math.sin(i)*.9,o=[[r,0,a,.03]];for(let l=1;l<4;l++)o.push([r*(1-l*.28)+(ut(t,l)-.5)*.5,.25+l*.25+ut(l,t)*.2,a*(1-l*.3)+(ut(l,t*3)-.5)*.4,.025-l*.004]);if(n.chain(o,s.BARKD,{group:10+t%3}),t%2===0){const l=o[3];n.ell([l[0],l[1],l[2]],[.18,.13,.16],s.LEAF,{group:14,rough:.03,paint:c=>ut(Math.floor(c[0]*30),Math.floor(c[1]*30))<.1?s.ACCENT:void 0})}}},"beehive-tree"(n){for(const[t,i,r]of[[-.2,0,-.25],[.15,-.1,.2],[0,.15,.05]])cn(n,[[t,0,i,.22],[t+r*.8,1.4,i,.16],[t+r*2,2.8,i-.1,.08]],1);for(const[t,i]of[[[-.6,2.9,-.2],[.9,.6,.7]],[[.6,3,-.2],[.85,.6,.7]],[[0,3.4,-.3],[.9,.55,.7]]])Ba(n,t,i,3);cn(n,[[.2,1.9,-.05,.08],[.75,2.05,.15,.05]],2);const e=[.72,1.6,.2];n.ell(e,[.24,.42,.22],s.STRAW,{group:4,paint:t=>{const i=Math.floor((t[1]-e[1])*14),r=Math.floor(Math.atan2(t[2]-e[2],t[0]-e[0])*3+i%2*.5);return ut(i,r)<.3?s.BARK2:void 0}}),n.seg([.75,2.02,.15],[.72,1.9,.2],.05,.1,s.STRAW,{group:4});for(let t=0;t<6;t++){const i=t*1.9;n.ell([e[0]+Math.cos(i)*.45,e[1]+Math.sin(t*2.3)*.35,e[2]+Math.sin(i)*.35],[.03,.025,.03],s.MAGIC,{group:20+t,extra:!0})}},"fairy-ring"(n){n.ell([0,.005,0],[1.9,.005,1.5],s.LEAF3,{group:0});for(let e=0;e<9;e++){const t=e/9*Math.PI*2,i=[Math.cos(t)*1.6,0,Math.sin(t)*1.25],r=.35+ut(e)*.35;n.box(v.add(i,[0,r/2,0]),[.13,r/2,.1],s.STONE,{dir:[-Math.sin(t),0,Math.cos(t)],round:.05,rough:.015,group:1+e,paint:o=>e===2&&Math.abs(o[1]-r*.55)<r*.22&&Math.abs(o[0]-i[0]-0)<.05?s.RUNE:o[1]>r*.85?s.MOSS:void 0});const a=v.add(i,[Math.cos(t+.35)*.25,0,Math.sin(t+.35)*.2]);n.seg(a,v.add(a,[0,.16,0]),.035,.03,s.CLOTH,{group:12}),n.ell(v.add(a,[0,.18,0]),[.1,.06,.1],s.ACCENT,{group:13,paint:o=>ut(Math.floor(o[0]*60),Math.floor(o[2]*60))<.15?s.BELLY:void 0})}},"charcoal-hut"(n){const e=[0,2,0];for(let i=0;i<20;i++){const r=i/20*Math.PI*2;Math.abs(r-1.2)<.35||n.seg([Math.cos(r)*.95,0,Math.sin(r)*.8],v.add(e,[Math.cos(r)*.08,.1+ut(i)*.25,Math.sin(r)*.08]),.05,.03,i%3?s.TRUNK:s.BARKD,{group:1+i%2})}n.ell([0,.6,0],[.85,.6,.7],s.BARKD,{group:3});const t=[1.7,0,.3];n.ell(t,[.85,.42,.7],s.BARKD,{group:4,rough:.03,paint:i=>ut(Math.floor(i[0]*14),Math.floor(i[2]*14)+Math.floor(i[1]*14))<.07?s.GLOW:i[1]>.3?s.SHADES:void 0});for(let i=0;i<4;i++)n.seg([-1.4,.1+i*.14,-.5+i%2*.05],[-1.4,.1+i*.14,.5],.07,.07,s.TRUNK,{group:5+i%2,paint:r=>Math.abs(r[2])>.46?s.BARKL:void 0})},"root-arch"(n){cn(n,[[-1.8,0,.1,.4],[-1.4,1.2,0,.34],[-.4,2.3,-.1,.3],[.6,2.4,0,.28],[1.5,1.4,.1,.32],[1.9,0,.15,.38]],1),cn(n,[[-1.4,0,-.6,.28],[-.6,1.6,-.5,.22],[.5,1.9,-.45,.2],[1.3,.9,-.4,.22],[1.5,0,-.35,.26]],2),cn(n,[[-1.8,.2,.1,.3],[-2.4,.05,.5,.12]],1),cn(n,[[1.9,.2,.15,.3],[2.5,.05,.55,.12]],1);for(const[e,t]of[[[-.2,2.6,-.2],[.7,.35,.5]],[[.8,2.5,-.25],[.55,.3,.45]]])Ba(n,e,t,4);for(let e=0;e<4;e++)Si(n,[-.7+e*.45,.12,(ut(e)-.5)*.5],[.22,.18,.2],6+e);n.box([0,.35,-.2],[.16,.35,.08],s.STONE,{round:.05,rough:.01,group:11,paint:e=>Math.abs(e[1]-.4)<.14&&Math.abs(e[0])<.05?s.MAGIC:e[1]>.62?s.MOSS:void 0})},"turf-hut"(n){n.box([0,.55,0],[1,.55,.7],s.WOOD,{round:.04,group:1,paint:l=>l[1]*7%1<.18?s.BARKD:l[2]>.66&&Math.abs(l[0]+.2)<.2&&l[1]<.85?s.NOSE:l[2]>.66&&Math.abs(l[0]-.5)<.14&&Math.abs(l[1]-.7)<.12?s.SHADES:void 0});const e=1.1,t=1.68,i=.86,r=Math.hypot(i,t-e),a=i/r,o=(t-e)/r;for(const l of[-1,1]){n.box([0,(e+t)/2+.03,l*i/2],[1.12,.06,r/2+.05],s.MOSS,{dir:[1,0,0],up:[0,a,l*o],round:.03,group:2,paint:c=>ut(Math.floor(c[0]*12),Math.floor(c[2]*12))<.25?s.LEAF2:void 0});for(let c=0;c<7;c++)n.ell([-.95+c*.317,e-.02,l*(i+.02)],[.16,.07,.06],s.MOSS,{group:2,paint:h=>h[1]<e-.05?s.LEAF2:void 0})}n.box([0,t+.04,0],[1.1,.05,.06],s.MOSS,{group:2});for(const l of[-1,1])n.flat([l,(e+t)/2,0],[0,0,1],[0,1,0],i,(t-e)/2,(c,h)=>Math.abs(c)<=(1-h)/2+.02?(h+1)*4%1<.14?s.BARKD:s.WOOD:null,{group:1,bend:0});n.seg([.6,.9,0],[.6,t+.45,0],.15,.13,s.STONE,{group:3,rough:.015});for(let l=0;l<5;l++)Si(n,[-1.4+l*.7,.12,.9+ut(l)*.3],[.2,.15,.18],4+l);ka(n,16,1.8,10,9,.25)},"heron-rookery"(n){cn(n,[[0,0,0,.25],[.4,1.4,0,.18],[.9,2.8,-.1,.12],[1.3,3.8,-.2,.06]],1);const e=[[[.6,2,-.05],[-.3,2,-.1]],[[1,3,-.1],[1.8,2.9,0]],[[1.25,3.6,-.2],[.6,3.7,-.3]]];e.forEach(([r,a],o)=>{cn(n,[[...r,.07],[...a,.04]],2),n.ell(v.add(a,[0,.08,0]),[.34,.13,.3],s.BARK2,{group:3+o,rough:.025,paint:l=>Math.abs(Math.sin(l[0]*30+l[2]*20))<.25?s.STRAW:l[1]<a[1]+.02?s.BARKD:void 0})});for(const[r,a]of[[[1.2,4,-.4],[.6,.4,.45]],[[.3,3.1,-.5],[.45,.3,.35]],[[1.9,3.3,-.4],[.4,.3,.35]]])Ba(n,r,a,7);const t=v.add(e[1][1],[0,.42,.05]),i=1.6;n.ell(t,[.18*i,.1*i,.09*i],s.BELLY,{dir:[1,.3,0],group:10,paint:r=>r[1]>t[1]+.06?s.STONE:void 0}),n.chain([[...v.add(t,[.12*i,.06*i,0]),.035*i],[...v.add(t,[.2*i,.22*i,0]),.03*i],[...v.add(t,[.16*i,.32*i,0]),.04*i]],s.BELLY,{group:10}),n.seg(v.add(t,[.18*i,.33*i,0]),v.add(t,[.36*i,.3*i,0]),.015*i,.005*i,s.BODY2,{group:11});for(const r of[-.04,.04])n.seg(v.add(t,[0,-.06*i,r]),v.add(t,[.02,-.42,r]),.012,.012,s.BARKD,{group:12})},sundial(n){n.ell([0,.07,0],[1.05,.09,1],s.STONE,{group:1,rough:.01}),n.ell([0,.2,0],[.72,.09,.68],s.STONE,{group:2,rough:.01,paint:e=>e[1]>.26&&ut(Math.floor(e[0]*8),Math.floor(e[2]*8))<.3?s.MOSS:void 0}),n.seg([0,.28,0],[0,.95,0],.16,.13,s.STONE,{group:3,paint:e=>Math.abs(Math.sin(e[1]*30))<.15?s.STONED:void 0}),n.ell([0,1,0],[.38,.04,.38],s.FRAME,{group:4,paint:e=>{const t=Math.atan2(e[2],e[0]);return Math.abs(Math.sin(t*6))<.12&&Math.hypot(e[0],e[2])>.26?s.BARKD:void 0}}),n.box([0,1.12,0],[.2,.1,.01],s.FRAME,{dir:[1,-.5,0],round:.005,group:5});for(let e=0;e<22;e++){const t=e/22*Math.PI*2,i=1.25+ut(e)*.2,r=[Math.cos(t)*i,0,Math.sin(t)*i*.85];n.seg(r,v.add(r,[0,.18,0]),.015,.012,s.LEAF2,{group:6}),n.ell(v.add(r,[0,.2,0]),[.05,.04,.05],[s.FLOWER,s.BELLY,s.ACCENT][e%3],{group:7})}},"bear-den"(n){const e=[0,.3,-.2];n.ell(e,[1.7,1.15,1.25],s.LEAF,{group:1,rough:.05,paint:t=>{const i=ut(Math.floor(t[0]*16),Math.floor(t[1]*16)+Math.floor(t[2]*16)*3);return i<.06?s.ACCENT:i<.2?s.BARKD:t[1]<.4?s.LEAF3:i>.85?s.LEAF2:void 0}}),n.ell([.35,.35,.95],[.5,.55,.4],s.NOSE,{group:1,cut:!0}),n.seg([2,0,.5],[2,.65,.5],.3,.27,s.TRUNK,{group:3,paint:t=>t[1]>.6?s.BARKL:Math.abs(Math.sin(Math.atan2(t[2]-.5,t[0]-2)*3))<.12&&t[1]>.2?s.BARKD:void 0})},"stilt-hut"(n){za(n,[0,.01,.1],[2.1,1.3],1);for(const[e,t]of[[-.75,-.55],[.75,-.55],[-.75,.55],[.75,.55]])n.seg([e,0,t],[e,1.05,t],.07,.06,s.WOOD,{group:2,paint:i=>i[1]<.15?s.MOSS:void 0});n.box([0,1.1,0],[1.05,.05,.8],s.WOOD,{round:.02,group:3,paint:e=>(e[0]+3)*6%1<.12?s.BARKD:void 0}),n.box([-.1,1.6,-.1],[.7,.45,.55],s.WOOD,{round:.03,group:4,paint:e=>e[2]>.4&&Math.abs(e[0]-.1)<.18&&e[1]<1.85?s.NOSE:void 0});for(const[e,t]of[[2.1,.92],[2.35,.72],[2.58,.48],[2.76,.24]])n.ell([-.1,e,-.1],[t,.16,t*.85],s.STRAW,{group:5,paint:i=>Math.abs(Math.sin(Math.atan2(i[2]+.1,i[0]+.1)*18))<.25?s.BARK2:void 0});for(const e of[.72,.95])n.seg([.9,1.1,e],[1.15,0,e],.02,.02,s.WOOD,{group:6});for(let e=0;e<4;e++)n.seg([.92+e*.06,1-e*.26,.72],[.92+e*.06,1-e*.26,.95],.02,.02,s.WOOD,{group:6});for(let e=0;e<26;e++){const t=ut(e,7)*6.283,i=1.5+ut(e,8)*.7,r=[Math.cos(t)*i,0,Math.sin(t)*i*.7],a=.5+ut(e,9)*.5;n.seg(r,v.add(r,[0,a,0]),.028,.02,s.LEAF2,{group:10+e%3}),e%3===0&&n.ell(v.add(r,[0,a-.05,0]),[.025,.07,.025],s.BARKD,{group:13})}},"bog-shrine"(n){za(n,[.6,.01,.4],[1.4,.9],1),n.seg([0,0,0],[0,1.9,0],.2,.17,s.TRUNK,{group:2,rough:.01,paint:e=>{const t=e[1];return e[2]>.12&&(Math.abs(t-1.6)<.05&&Math.abs(Math.abs(e[0])-.08)<.05||Math.abs(t-1.38)<.04&&Math.abs(e[0])<.1)||t*5%1<.07?s.BARKD:e[1]>1.85?s.MOSS:void 0}}),n.ell([0,1.95,0],[.24,.1,.24],s.MOSS,{group:3});for(let e=0;e<6;e++){const t=e/6*Math.PI*2;n.seg([Math.cos(t)*1,0,Math.sin(t)*.8],[Math.cos(t)*1,.35+ut(e)*.25,Math.sin(t)*.8],.05,.04,s.TRUNK,{group:4})}n.ell([-.25,.06,.3],[.14,.07,.13],s.EAR,{group:5}),Si(n,[.3,.07,.3],[.09,.07,.08],6,!1),Si(n,[.15,.05,.42],[.06,.05,.06],7,!1);for(const[e,t,i]of[[.9,.9,.5],[1.4,1.2,.1],[.4,1.4,.8]])n.ell([e,t,i],[.06,.07,.06],s.MAGIC,{group:20+e*10,extra:!0,paint:r=>Math.hypot(r[0]-e,r[1]-t)<.03?s.MAGIC2:void 0});ka(n,20,2,10,11,.3,s.WEB)},"raven-tree"(n){cn(n,[[0,0,0,.3],[.1,1.3,0,.22],[-.1,2.5,-.1,.16],[.1,3.6,-.15,.07]],1),[[[.1,1.6,0],[1.3,2.3,.1],[1.8,2.2,.1]],[[-.05,2.1,-.05],[-1.2,2.8,-.1],[-1.6,3.2,-.1]],[[0,2.9,-.1],[.8,3.5,-.2]]].forEach((r,a)=>cn(n,r.map((o,l)=>[...o,.12-l*.04]),2+a)),cn(n,[[-.1,.5,0,.22],[-1.1,.1,.5,.08]],5),cn(n,[[.1,.4,0,.2],[.9,.05,-.4,.08]],5);const t=(r,a)=>{n.ell(r,[.12,.07,.06],s.SHADES,{dir:[1,.2,0],group:a}),n.ell(v.add(r,[.11,.07,0]),[.05,.05,.045],s.SHADES,{group:a}),n.seg(v.add(r,[.15,.07,0]),v.add(r,[.22,.05,0]),.015,.004,s.BODY2,{group:a}),n.seg(v.add(r,[-.1,0,0]),v.add(r,[-.22,-.04,0]),.04,.015,s.SHADES,{group:a})};t([1.3,2.42,.1],10),t([-1.2,2.92,-.1],11),t([.8,3.62,-.2],12),t([-.05,3.72,-.15],13);const i=[1.55,1.45,.1];n.seg([1.55,2.25,.1],v.add(i,[0,.3,0]),.01,.01,s.FRAME,{group:14});for(let r=0;r<6;r++){const a=r/6*Math.PI*2;n.seg(v.add(i,[Math.cos(a)*.2,-.25,Math.sin(a)*.2]),v.add(i,[Math.cos(a)*.12,.3,Math.sin(a)*.12]),.012,.012,s.FRAME,{group:14})}n.seg(v.add(i,[0,-.27,0]),v.add(i,[0,-.25,0]),.22,.22,s.FRAME,{group:14})},barrow(n){n.ell([0,0,-.2],[2.3,.95,1.3],s.LEAF2,{group:1,rough:.03,paint:e=>ut(Math.floor(e[0]*10),Math.floor(e[2]*10)+Math.floor(e[1]*10))<.25?s.LEAF:void 0});for(const e of[-.35,.35])n.box([e,.45,.95],[.12,.45,.12],s.STONE,{round:.03,rough:.01,group:2});n.box([0,.95,.95],[.55,.1,.14],s.STONE,{round:.03,rough:.01,group:3,paint:e=>e[1]>1.02?s.MOSS:void 0}),n.box([0,.4,.9],[.23,.4,.3],s.NOSE,{group:1,cut:!0});for(const[e,t,i]of[[-1.6,1,.7],[1.7,.9,.55]])n.box([e,i/2,t],[.12,i/2,.09],s.STONE,{round:.04,rough:.01,group:4})},cairn(n){let e=0;for(let i=0;i<6;i++){const r=.9-i*.14,a=Math.max(3,9-i);for(let o=0;o<a;o++){const l=o/a*Math.PI*2+i;Si(n,[Math.cos(l)*r*.8,e+.14,Math.sin(l)*r*.7],[.24-i*.02,.15,.2-i*.02],1+(i+o)%4,i<2)}e+=.26}const t=[0,e+.1,0];for(let i=0;i<6;i++){const r=i/6*Math.PI*2;n.seg(v.add(t,[Math.cos(r)*.12,0,Math.sin(r)*.12]),v.add(t,[Math.cos(r)*.3,.35,Math.sin(r)*.3]),.02,.02,s.FRAME,{group:6})}n.seg(v.add(t,[0,-.3,0]),t,.05,.05,s.FRAME,{group:6}),n.ell(v.add(t,[0,.14,0]),[.2,.07,.2],s.SHADES,{group:7})},"stump-throne"(n){n.ell([0,.28,0],[.92,.34,.86],s.TRUNK,{group:1,rough:.015,paint:zr}),n.ell([0,.58,0],[.84,.06,.78],s.BARKL,{group:1,paint:e=>Math.abs(Math.sin(Math.hypot(e[0],e[2])*30))<.3?s.BARK2:void 0}),n.box([-.55,1.15,0],[.18,.62,.62],s.TRUNK,{round:.1,rough:.01,group:2,paint:zr});for(const e of[-.6,.6])n.box([-.1,.72,e],[.45,.14,.12],s.TRUNK,{round:.06,group:3,paint:zr});for(let e=0;e<6;e++){const t=e/6*Math.PI*2+.3;cn(n,[[Math.cos(t)*.8,.25,Math.sin(t)*.8,.18],[Math.cos(t)*1.4,.02,Math.sin(t)*1.3,.06]],4)}n.seg([1.5,.18,.8],[1.5,.18,.2],.18,.18,s.TRUNK,{group:5,paint:e=>e[2]>.78||e[2]<.22?s.BARKL:zr(e)}),n.seg([1.5,.3,.5],[1.6,.75,.5],.025,.025,s.WOOD,{group:6}),n.box([1.5,.36,.5],[.1,.06,.015],s.FRAME,{group:6});for(let e=0;e<6;e++){const t=e<3?0:1,i=e%3;n.seg([-1.7+i*.3+t*.15,.15+t*.26,-.7],[-1.7+i*.3+t*.15,.15+t*.26,.2],.14,.14,s.TRUNK,{group:7+e%2,paint:r=>r[2]>.16||r[2]<-.66?s.BARKL:void 0})}},"swing-beech"(n){cn(n,[[0,0,-.3,.45],[0,1.6,-.3,.36],[-.1,2.8,-.4,.26]],1),cn(n,[[0,2.2,-.3,.2],[1,2.6,-.2,.14],[1.9,2.75,-.1,.08]],2),cn(n,[[-.05,2.5,-.35,.18],[-1.2,3,-.4,.1]],3);for(let e=0;e<5;e++){const t=e/5*Math.PI*2;cn(n,[[Math.cos(t)*.35,.3,-.3+Math.sin(t)*.3,.2],[Math.cos(t)*.9,.02,-.3+Math.sin(t)*.8,.07]],4)}for(const[e,t]of[[[0,3.4,-.6],[1.4,.8,1]],[[1.4,3.1,-.4],[.9,.55,.7]],[[-1.3,3.2,-.6],[.9,.6,.7]]])Ba(n,e,t,5);for(const e of[-.12,.12])n.seg([1.3,2.65,e],[1.3,.55,e],.012,.012,s.STRAW,{group:6});n.box([1.3,.53,0],[.08,.025,.18],s.WOOD,{round:.01,group:6});for(let e=0;e<9;e++)n.ell([(ut(e,1)-.5)*3,.05+ut(e,2)*.5,(ut(e,3)-.3)*1.6],[.022,.022,.022],s.MAGIC,{group:20+e,extra:!0})},bower(n){for(const t of[-.9,0,.9])for(const i of[-.6,.6])n.seg([t,0,i],[t,1.2,i],.04,.04,s.WOOD,{group:1});for(const t of[-.9,0,.9])n.chain([[t,1.2,-.6,.04],[t,1.62,-.3,.04],[t,1.72,0,.04],[t,1.62,.3,.04],[t,1.2,.6,.04]],s.WOOD,{group:2});for(const t of[-.6,.6])for(const i of[.5,1])n.seg([-.9,i,t],[.9,i,t],.025,.025,s.WOOD,{group:3});const e=t=>{const i=ut(Math.floor(t[0]*26),Math.floor(t[1]*26)+Math.floor(t[2]*26)*3);return i<.12?s.BELLY:i<.2?s.STRAW:i>.85?s.LEAF2:void 0};for(const[t,i]of[[[-.6,1.6,0],[.6,.3,.75]],[[.5,1.65,0],[.65,.3,.75]],[[-.95,.9,-.55],[.25,.65,.25]],[[.95,.8,-.6],[.25,.55,.25]],[[-.9,.7,.62],[.22,.5,.2]],[[.2,1.3,-.65],[.5,.4,.2]]])n.ell(t,i,s.LEAF,{group:4,rough:.04,paint:e});n.box([0,.4,-.35],[.6,.04,.15],s.WOOD,{round:.02,group:5});for(const t of[-.5,.5])n.seg([t,0,-.35],[t,.38,-.35],.03,.03,s.WOOD,{group:5})}},Qu={moor:["sleeping-giant","the sleeping giant, a moss mound like a figure lying on its back",1],"fern-forest":["fern-grotto","a ring of giant tree ferns round a stone basin",1],"muddy-forest":["sunken-boat","an old rowing boat sunk in the mud",1.15],"tangly-forest":["bramble-wagon","an old wagon wrapped in brambles",1.1],"wispy-forest":["beehive-tree","a many-trunked tree with a great wild honeycomb",1],"hazel-forest":["fairy-ring","a ring of fairy stones and toadstools",1.1],"twiggy-forest":["charcoal-hut","a charcoal burner's hut of sticks, its mound smouldering",1],ancient:["root-arch","a great arch of roots over mossy stones",1.1],norway:["turf-hut","a log cabin with a turf roof",1.15],"alder-forest":["heron-rookery","an alder holding herons' stick nests",1],meadow:["sundial","a moonlit sundial on a stone dais in a ring of flowers",1.2],"berry-thicket":["bear-den","a bear's den in a bramble mound",1.1],wetland:["stilt-hut","a fisher's hut on stilts over a pool",1.1],bog:["bog-shrine","a carved post shrine to the bog, will-o'-wisps over the pool",1.1],deadwood:["raven-tree","a dead tree where the ravens gather",1],grassland:["barrow","a barrow with a stone doorway",1],heath:["cairn","a tall cairn with an old beacon basket",1.4],"old-pinewood":["stump-throne","a woodcutter's stump throne",1.1],"bluebell-glade":["swing-beech","a great beech with a rope swing, glowworms beneath",1],"honeysuckle-tangle":["bower","a honeysuckle bower with a bench",1.2]};function zd(n){let e=n.w,t=-1,i=n.h;for(let a=0;a<n.h;a++)for(let o=0;o<n.w;o++)n.m[a*n.w+o]&&(e=Math.min(e,o),t=Math.max(t,o),i=Math.min(i,a));const r=new qt(t-e+1,n.h-i);for(let a=0;a<r.h;a++)for(let o=0;o<r.w;o++){const l=(a+i)*n.w+o+e;n.m[l]&&r.put(o,a,n.m[l],n.n[l*3],n.n[l*3+1],n.n[l*3+2])}return{sp:r,x0:e,y0:i}}function Hd(n,e){const t=n.leaf,i=e.trunkHue??.07;return{[s.TRUNK]:me(i,.45,.36),[s.BARKD]:me(i+.03,.5,.17),[s.BARKL]:me(i,.35,.55),[s.BARK2]:me(i+.02,.45,.26),[s.LEAF]:me(t,.55,.45),[s.LEAF2]:me(t-.03,.5,.62),[s.LEAF3]:me(t+.03,.6,.26),[s.STONE]:[122,120,128],[s.STONED]:[62,60,70],[s.MOSS]:me(.26,.45,.45),[s.WOOD]:[128,92,58],[s.STRAW]:[190,162,104],[s.CLOTH]:[228,220,200],[s.EAR]:[168,96,66],[s.FRAME]:[150,128,84],[s.SHADES]:[30,28,36],[s.ACCENT]:[196,40,52],[s.BELLY]:[232,228,214],[s.BODY2]:[210,170,60],[s.FLOWER]:[180,140,230],[s.WEB]:[228,228,234],[s.WATER]:[52,78,104],[s.NOSE]:[16,14,20],[s.GLOW]:[255,120,40],[s.MAGIC]:me(e.magicHue??.45,.6,1),[s.MAGIC2]:me(e.magicHue??.45,.2,1),[s.RUNE]:[120,230,255],[s.LINE]:[24,22,30]}}function Gd(n,e,t,i=16){const r=new st({blend:.05});kd[n](r),r.ell([0,.004,0],[.01,.004,.01],s.NOSE,{group:0});const a=(Object.values(Qu).find(([d])=>d===n)||[,,1])[2],o=Ii(r,{scale:$u(t)*a}),{sp:l,x0:c,y0:h}=zd(o.sp),[u,f]=o.project([0,0,0]);return{sp:l,colours:Hd(e,t),origin:{x:+(u-c).toFixed(1),y:+(f-h).toFixed(1)},metres:{width:+(l.w/i).toFixed(1),height:+(l.h/i).toFixed(1)}}}const Wd=1.3,Vd=n=>[1,Math.sqrt(n.growth),Math.sqrt(n.growth)*Wd,n.growth],sa=(n,e,t=1)=>Math.round(e.size*Vd(e)[Math.max(0,Math.min(3,n))]*(2/(e.pixel||2))*1.9*t),Fl=(n,e)=>{const t=Il(e);for(let i=0;i<9;i++){const r=Math.floor(ce(t,2,n.w-2)),a=Math.floor(ce(t,2,n.h*.6));if(!(n.get(r,a)||n.get(r+1,a)||n.get(r-1,a)||n.get(r,a+1)||n.get(r,a-1))&&(n.px(r,a,s.MAGIC2),i%3===0))for(const[o,l]of[[1,0],[-1,0],[0,1],[0,-1]])n.px(r+o,a+l,s.MAGIC)}};function Us(n,e,t,i,r,a,o,l){const c=v.add(e,[-i*.7,i*(.75+r),t*i*.35]),h=v.norm(v.sub(c,e)),u=v.norm(v.sub([1,0,0],v.mul(h,v.dot([1,0,0],h)))),f=Math.hypot(...v.sub(c,e));n.flat(v.add(v.lerp(e,c,.5),v.mul(u,-i*.14)),h,u,f*.55,i*.34,xr.wing(a,o),{group:l,extra:!0})}const Ul=(n,e,t=1)=>n===0?Math.round(Math.max(12,Math.min(30*Math.max(.75,Math.min(1.1,t)),sa(1,e)*t*.72))):n===2?Math.round(Math.max(sa(1,e)*t*1.08,Math.min(sa(2,e,t),sa(1,e)*1.4))):sa(n,e)*t;let Ms=null;function Yd(n,e){const t=Ms;Ms=n;try{return e()}finally{Ms=t}}const Xd=(n,e)=>{const t=Math.atan2(e,n);return Math.hypot(n,e)<.55+.4*Math.pow(Math.abs(Math.cos(t*2.5+Math.PI/2)),3)},Kd=(n,e)=>{const t=n*1.2,i=-e*1.2+.25;return Math.pow(t*t+i*i-.6,3)-t*t*i*i*i<0};function Bl(n){const e=Ms,t=n.anchors;if(!e)return;const i=t.head,r=i?Math.max(...i.r):.2;if(e.collar&&(t.neck||i)){const a=t.neck||{c:v.add(i.c,[-i.r[0]*.8,-i.r[1]*.4,0]),r:i.r[1]*.75,dir:v.norm([1,.4,0])},o=v.norm(a.dir),l=v.norm(v.cross(o,Math.abs(o[2])<.9?[0,0,1]:[1,0,0])),c=v.cross(o,l),h=[],u=Math.max(.03,a.r*.2);for(let x=0;x<=16;x++){const m=x/16*Math.PI*2,M=v.add(v.mul(l,Math.cos(m)),v.mul(c,Math.sin(m)));let _=0;for(;_<.8&&n.field(v.add(a.c,v.mul(M,_)))<0;)_+=.01;_>=.8&&(_=a.r),h.push([...v.add(a.c,v.mul(M,_+u*.7)),u])}n.chain(h,s.COLLAR,{group:60,extra:!0});const f=h.reduce((x,m)=>m[0]-m[1]*.6+m[2]*.5>x[0]-x[1]*.6+x[2]*.5?m:x),d=u*1.3*(a.tag||1),p=v.norm(v.add(v.norm(v.sub(f.slice(0,3),a.c)),[.3,-.5,.3]));let g=f.slice(0,3);for(let x=0;x<60&&n.field(g)<d*.4;x++)g=v.add(g,v.mul(p,.01));n.ell(g,[d,d,d*.6],s.COLLAR,{group:60,extra:!0})}if(e.hat!=null&&i){const a=Math.max(r,.13),o=i.top||v.add(st.surface(i.c,i.r,v.norm([-.15,1,.1])),[0,r*.1,0]),l=v.norm([.3,1,.35]),c=a*1.5,h=v.add(o,v.mul(l,c));n.seg(v.add(o,v.mul(l,-a*.1)),h,a*.48,a*.04,s.HAT1,{group:61,extra:!0,paint:u=>Math.floor(v.dot(v.sub(u,o),l)/(c/5)+10)%2?s.HAT2:void 0}),n.ell(h,[a*.17,a*.17,a*.17],s.POM,{group:61,extra:!0})}if(e.glasses&&t.eyes&&i){const[a,o]=t.eyes.pts,l=h=>v.add(h,v.mul(v.norm(v.sub(h,i.c)),t.eyes.size*.45)),c=Math.max(t.eyes.size*1.05,r*.1);if(e.glasses==="bar")n.seg(l(a),l(o),c,c,s.SHADES,{group:62,extra:!0}),n.ell(v.add(l(o),[c*.3,c*.5,c*.2]),[c*.25,c*.25,c*.25],s.GLINT,{group:62,extra:!0});else for(const h of[a,o]){const u=v.norm(v.sub(h,i.c)),f=v.norm(v.cross([0,1,0],u)),d=v.cross(u,f),p=e.glasses==="heart"?Kd:Xd,g=c*1.5;n.flat(l(h),f,d,g,g,(x,m)=>p(x,m)?p(x*1.3,m*1.3)?s.SHADES:s.FRAME:null,{group:62,bend:.1,extra:!0}),n.seg(l(a),l(o),c*.18,c*.18,s.FRAME,{group:62,extra:!0})}}if(e.shoes)for(const a of t.feet){const o=e.shoes==="platform",l=a.r,c=v.add(a.c,[l*.25,l*(o?.35:.15),0]);n.ell(c,[l*1.45,l*(o?1.2:.85),l*1.15],s.SHOE,{group:a.group,extra:!0,paint:h=>h[1]<c[1]-l*(o?.45:.4)?s.SOLE:e.shoes==="glitter"&&Qn(h,60,.28)?s.GLINT:void 0})}}function qd(n,e,t,i,r="towards"){const a={legW:1,earS:1,hgt:1,bw:.3,...n.q},o=e===3,l=e===1,c=e===0,h=B=>o&&n.legend.includes(B),u=new st,f=a.hr*(c?1.75:l?1.25:1)*(i.head/.44)**.5,d=a.len*(c?.8:l?.9:1.02)*i.long,p=c?.55:l?.9:1.04,g=t?-.04:0,x=1+g,m=a.chest*(o?1.06:1)/p+g,M=a.tuck/p+g,_=a.bw*(c?1.15:e>=2?1.06:1)*(a.legW>1.2?1.15:1),A=.06*a.legW*(o?1.1:c?1.7:1),E=a.back==="hump"?.1:0,R=a.back==="arch"?.1:0,T=m+.12,P=B=>{if(a.belly&&B[1]<T&&B[0]>-d*.5)return s.BELLY;if(a.saddle&&B[1]>x-.18&&B[0]<d*.55)return s.BODY2;if(a.spots&&B[1]>m+.1&&Qn(B,10,.22))return a.spotMat==="belly"||a.spots==="young"&&l?s.BELLY:a.spots==="young"?void 0:s.BODY3;if(a.ridge&&B[1]>x-.08+E*.5)return s.BODY3};if(u.ell([d*.48,(x+m)/2+E*.5,0],[d*.62,(x-m)/2+E*.5,_],s.BODY,{paint:P}),u.ell([-d*.5,(x+M)/2+R*.6,0],[d*.58,(x-M)/2+R*.6,_*.93],s.BODY,{paint:P}),u.ell([0,(x+(m+M)/2)/2+.02,0],[d*.6,(x-(m+M)/2)/2,_*.9],s.BODY,{paint:P}),a.ridge)for(let B=0;B<(o?16:10);B++){const ae=-d*.8+B*d*1.75/(o?15:9),ue=(.07+(o?.04:0))*(1+.5*Math.max(0,ae/d));u.ell([ae,x+.02+E*Math.max(0,1-Math.abs(ae/d-.5)*2)+ue*.5,0],[ue,.03,_*.25],s.BODY3,{dir:[-.3,1,0],up:[1,0,0]})}if(a.wool)for(let B=0;B<14;B++){const ae=B/14*Math.PI*2;u.ell([d*Math.cos(ae)*.7,(x+m)/2+Math.sin(ae)*.2,_*(B%2?.5:-.5)],[.16,.14,.14],s.BODY)}const S=[.32,-.32][t],y=(B,ae)=>{const ue=ae*_*.62,Pe=B?d*.62:-d*.62,He=(B?1:-1)*ae*S,Xe=B?m+.1:M+.15,ee=(B?ae:-ae)*(t?1:-1)>0?.06:0,re=[Pe+Math.sin(He)*.2+(B?.02:.1),Math.max(.3,Xe*.55),ue],V=[Pe+Math.sin(He)*.42,.05+ee,ue],he=[Pe,Xe+.12,ue*.8],se=ae>0?a.legMat||s.BODY:a.legMat?s.BODY3:s.BODY2,Ae=B?[[...he,A*1.5],[...re,A*1.05],[...V,A*.9]]:[[...he,A*2*(a.haunch||1)],[...v.add(re,[-.12,.06,0]),A*1.2],[...v.add(V,[-.06*(a.hindFoot||1),.12,0]),A*.9],[...V,A*.9]];u.chain(Ae,se,{group:ae>0?6+(B?1:0):2,paint:a.socks?Oe=>Oe[1]<a.socks?s.BODY3:void 0:void 0});const tt=(a.paw==="hoof"?.07:.09)*a.legW**.5*(B?1:a.hindFoot||1);u.ell(v.add(V,[tt*.5,-.01,0]),[tt,A*.9,A*1.1],a.paw==="hoof"?s.NOSE:se,{group:ae>0?6+(B?1:0):2}),u.anchors.feet.push({c:v.add(V,[tt*.5,-.01,0]),r:Math.max(tt,A*1.1),group:ae>0?6+(B?1:0):2})};for(const B of[-1,1])y(!0,B),y(!1,B);const C=[d*.82,x-.12,0],I=[C[0]+Math.cos(a.neckAng)*a.neck*.9,C[1]+Math.sin(a.neckAng)*a.neck*.9+(c?.1:0),0];u.seg(C,I,a.neckW*.55,a.neckW*.42,s.BODY,{paint:B=>a.belly&&B[1]<(C[1]+I[1])/2-.05?s.BELLY:a.face==="dark"?s.BODY2:void 0});const L=B=>{if(a.face==="badger")return Math.abs(B[2])<f*.22+(B[0]-I[0])*.1||B[1]<I[1]-f*.1?s.BELLY:s.BODY3;if(a.face==="dark")return s.BODY2;if((a.belly||a.muzzle)&&B[1]<I[1]-f*.35)return s.BELLY};u.ell(I,[f*1.05,f*.92,f*.88],s.BODY,{paint:L});const N=f*a.snout*(c?.55:l?.78:1),O=f*a.snoutD*.55,U=[I[0]+f*.65+N*.5,I[1]-f*.28,0];u.ell(U,[N*.62+f*.2,O,O*.95],s.BODY,{dir:[1,-.25,0],paint:B=>(a.muzzle||a.belly)&&B[1]<U[1]-O*.1?s.BELLY:L(B)});const W=[U[0]+N*.62+f*.1,U[1]-.02,0];u.ell(W,[f*(a.disc?.1:.12),f*(a.disc?.2:.12),f*(a.disc?.2:.15)],s.NOSE,{group:1});for(const B of[-1,1]){const ae=st.surface(I,[f*1.05,f*.92,f*.88],v.norm([.75,.32,B*.62]));u.ell(ae,[f*.13,f*.16,f*.13].map(ue=>ue*(a.eyeK||1)*(c?1.5:l?1.2:1)),o&&!a.tusks?s.MAGIC2:s.EYE,{group:1})}u.anchors.head={c:I,r:[f*1.05,f*.92,f*.88],top:[I[0]-f*.1,I[1]+f*.82,0]},u.anchors.eyes={pts:[-1,1].map(B=>st.surface(I,[f*1.05,f*.92,f*.88],v.norm([.75,.32,B*.62]))),size:f*.16*(a.eyeK||1)*(c?1.5:l?1.2:1)},u.anchors.neck={c:v.lerp(C,I,c?.05:l?.25:.42),r:a.neckW*.5*(c?1.3:l?1.12:1),dir:v.norm(v.sub(I,C)),tag:c?1.8:l?1.3:1};for(const B of[-1,1]){const ae=a.ear,ue=[I[0]-f*.15,I[1]+f*.7,B*f*.5],Pe=a.earS*(c?1.2:1)*(a.ear==="long"?.62:1);if(ae==="none")continue;if(ae==="round"){u.ell(ue,[f*.22,f*.25*Pe,f*.1],s.BODY,{group:1,paint:Ae=>Ae[0]>ue[0]+f*.02?s.EAR:void 0});continue}const He=ae==="long",Xe=ae==="small"?-.6:0,ee=f*.55*Pe*(ae==="big"?1.35:He?2.2:1),re=f*.3*(ae==="big"?1.2:He?1.35:1),V=v.norm([Xe*.6-(He?.3:.12),1,B*.3]),he=v.norm([.55,.2,B]),se=v.norm(v.cross(he,V));u.flat(v.add(ue,v.mul(V,ee)),se,V,re,ee,xr.ear(s.BODY,s.EAR,s.BODY3),{group:5+(B>0?0:20),extra:He}),ae==="tuft"&&u.seg(v.add(ue,[0,ee*1.4,B*.02]),v.add(ue,[0,ee*1.85,B*.04]),f*.05,f*.02,s.BODY3,{group:1})}const F=[-d*1.05,x-.1+R*.5,0],Q=t?.04:-.02;if(h("tails")||Zd(u,h("starTail")?"star":a.tail,F,d,x,Q),a.horns)for(const B of[-1,1]){const ae=l?.6:c?.35:h("hornsGlow")?1.4:1,ue=[];for(let Pe=0;Pe<=8;Pe++){const He=.3-Pe/8*Math.PI*1.6,Xe=f*.65*ae*(1-.45*Pe/8);ue.push([I[0]-f*.1+Math.cos(He)*Xe,I[1]+f*.45+Math.sin(He)*Xe,B*(f*.6+Pe*.015)]),ue[Pe].push(f*.2*ae*(1-.6*Pe/8))}u.chain(ue,h("hornsGlow")?s.MAGIC:s.ACCENT,{group:13})}if(a.antlers||h("jackalope"))for(const B of[-1,1])$d(u,a,[I[0]-f*.05,I[1]+f*.75,B*f*.4],B,e,h);if(a.tusks)for(const B of[-1,1]){const ae=l?.4:c?0:h("tusksBig")?1.3:.75;if(!ae)continue;const ue=[U[0]+N*.25,U[1]-O*.4,B*O*.8];u.chain([[...ue,.045*ae],[...v.add(ue,[.1*ae,.1*ae,B*.03]),.04*ae],[...v.add(ue,[.06*ae,.24*ae,B*.05]),.02*ae]],s.ACCENT,{group:8})}a.teeth&&!c&&u.ell([W[0]-f*.1,W[1]-f*.25,0],[f*.08,f*.14,f*.12],s.ACCENT,{group:1});const X=B=>[-d*.9+B*d*1.65,x+E*Math.max(0,1-Math.abs(B-.8)*3)+R*(1-Math.abs(B-.4)*2),0];if(h("wings"))for(const B of[-1,1])Us(u,[d*.2,x,B*_*.5],B,1.15,t?.1:0,B>0?s.MAGIC2:s.MAGIC,s.MAGIC,40+(B>0?10:0));if(h("mane")||h("flames"))for(let B=0;B<7;B++){const ae=B/6,ue=v.lerp(v.add(I,[-f*.5,f*.3,0]),X(.55),ae),Pe=[.4,.3,.45,.28,.38,.25,.3][B],He=v.norm([-.35-(t?.1:0),1,0]);u.flat(v.add(ue,v.mul(He,Pe*.5)),[1,0,0],He,Pe*.32,Pe*.55,xr.flame(B%2?s.MAGIC:s.MAGIC2,s.MAGIC2),{group:60+B%2,extra:!0})}if(h("tails"))for(let B=0;B<7;B++){const ae=Math.PI*(.55+B*.08),ue=(B-3)*.1,Pe=v.add(F,[Math.cos(ae)*.9,Math.sin(ae)*.85,ue]);u.chain([[...F,.1],[...v.lerp(F,Pe,.5),.17],[...Pe,.08]],B%2?s.BODY2:s.BODY,{group:70,extra:!0}),u.ell(Pe,[.09,.09,.09],s.MAGIC2,{group:71,extra:!0})}if(h("crystals")&&[.15,.3,.45,.6,.75].forEach((B,ae)=>{const ue=X(B),Pe=[.3,.5,.4,.6,.35][ae];u.ell(v.add(ue,[0,Pe*.45,(ae%2-.5)*.1]),[Pe*.55,.08,.08],s.MAGIC,{dir:[(ae-2)*.12,1,0],group:80+ae%2,extra:!0,paint:He=>He[2]>0?s.MAGIC2:void 0})}),h("moss")){for(let B=0;B<6;B++)u.ell(X(.08+B*.15),[d*.22,.07,_*.85],s.LEAF,{group:85,extra:!0});for(const[B,ae]of[[.25,.55],[.5,.8],[.75,.45]]){const ue=X(B);u.seg(ue,v.add(ue,[0,ae*.7,0]),.04,.025,s.TRUNK,{group:86,extra:!0}),u.ell(v.add(ue,[0,ae*.8,0]),[ae*.28,ae*.26,ae*.28],s.LEAF2,{group:87,extra:!0,paint:Pe=>Pe[1]<ue[1]+ae*.72?s.LEAF3:void 0})}for(const B of[.12,.4,.65,.9]){const ae=X(B);u.ell(v.add(ae,[0,.12,_*.3]),[.07,.035,.07],s.MAGIC,{group:89,extra:!0})}}if(h("ribbons"))for(let B=0;B<3;B++){const ae=[];for(let ue=0;ue<9;ue++){const Pe=ue/8;ae.push([d*(.5-Pe*2.2),x+.05+B*.1+Pe*(.25+B*.12)+Math.sin(Pe*6+t+B)*.07,(B-1)*.18,.04*(1-Pe*.6)])}u.chain(ae,B%2?s.MAGIC2:s.MAGIC,{group:90+B,extra:!0})}Bl(u);const{sp:te}=Ii(u,{height:Ul(e,i,a.hgt),facing:r});return o&&Fl(te,n.id.length*7919),te}function Zd(n,e,t,i,r,a){const o={group:3},l=c=>-i*c;e==="brush"?n.chain([[...t,.1],[l(1.3),r-.25+a,0,.15],[l(1.4),r-.55,0,.14],[l(1.35),.38+a,0,.09]],s.BODY,{...o,paint:c=>c[1]<.32?s.BODY3:void 0}):e==="bushy"?n.chain([[...t,.1],[l(1.05)-.35,r-.05+a,0,.17],[l(1.05)-.75,r-.2+a,0,.18],[l(1.05)-1,r-.35+a,0,.1]],s.BODY,{...o,paint:c=>c[0]<l(1.05)-.82?s.BELLY:void 0}):e==="stub"||e==="deer"||e==="bob"?n.ell(v.add(t,[-.06,.02+a,0]),[.1,.08,.07],e==="deer"?s.BELLY:s.BODY,{...o,paint:e==="bob"?c=>c[0]<t[0]-.08?s.BODY3:void 0:void 0}):e==="puff"?n.ell(v.add(t,[-.04,.02,0]),[.11,.11,.1],s.BELLY,o):e==="squirrel"||e==="star"?n.chain([[...t,.12],[l(1.3),r+.05+a,0,.25],[l(1.3),r+.6+a,0,.3],[l(1),r+.95+a,0,.27],[l(.65),r+.9+a,0,.16]],e==="star"?s.MAGIC:s.BODY,{...o,extra:!0,paint:e==="star"?c=>Qn(c,14,.12)?s.GLINT:void 0:void 0}):e==="otter"?n.chain([[...t,.17],[l(1.3),r-.45+a,0,.12],[l(1.6),.1,0,.07],[l(1.85),.06+a,0,.03]],s.BODY,o):e==="stoat"?n.chain([[...t,.08],[l(1.3),r-.12+a,0,.07],[l(1.6),r-.05+a,0,.06]],s.BODY,{...o,paint:c=>c[0]<l(1.45)?s.BODY3:void 0}):e==="flat"?(n.seg(t,[l(1.15),.3,0],.08,.07,s.BODY2,o),n.ell([l(1.4),.1+a*.5,0],[.28,.03,.14],s.BODY3,o)):e==="thin"&&(n.chain([[...t,.04],[l(1.1),r-.3,0,.03],[l(1.12)+a,r-.55,0,.025]],s.BODY,o),n.ell([l(1.12)+a,r-.62,0],[.04,.07,.04],s.BODY3,o))}function $d(n,e,t,i,r,a){const o=!e.antlers,l=o?.45:[0,.5,.95,.95][r]*(a("antlersGlow")?1.15:1),c=a("antlersGlow")?i>0?s.MAGIC2:s.MAGIC:s.ACCENT,h={group:11+(i>0?1:0),extra:!0};if(!l)return;const u=.045*Math.max(.8,l),f=i*.35*l;if(e.antlers==="palm"){const m=v.add(t,[-.06*l,.12*l,f*.3]);n.seg(t,m,u*1.3,u*1.2,c,h);for(let M=0;M<5;M++){const _=.35+M*.3,A=v.norm([-Math.cos(_),Math.sin(_)*.9,i*.55]),E=(.24+.05*(M%2))*l;n.ell(v.add(m,v.mul(A,E*.55)),[E*.6,u*1.5,u*.6],c,{...h,dir:A,up:[0,0,1]})}return}const d=v.add(t,[-.18*l,.3*l,f*.4]),p=v.add(t,[-.25*l,.62*l,f*.8]),g=v.add(t,[-.1*l,.95*l,f]);n.chain([[...t,u*1.2],[...d,u],[...p,u*.85],[...g,u*.4]],c,h);const x=(m,M,_,A)=>n.seg(m,v.add(m,v.mul(v.norm(M),_)),A,A*.35,c,h);x(v.add(t,[-.04*l,.1*l,f*.1]),[1,.6,0],.28*l,u*.8),(l>.4||o)&&x(d,[1,.9,0],.3*l,u*.7),l>.7&&(x(p,[.8,1,0],.28*l,u*.6),x(g,[.3,1,i*.2],.18*l,u*.5))}function Jd(n,e,t,i,r="towards"){const a=e===3,o=e===1,l=e===0,c=g=>a&&n.legend.includes(g),h=new st,u=t?.03:0,f=l?.48:o?.42:.36,d=(l?.95:1.08)+u;for(const g of[-1,1]){const x=t&&g>0?.04:0;h.seg([.05,.2,g*.14],[.08,.05+x,g*.15],.07,.06,s.BODY2,{group:2});for(const m of[-.04,0,.04])h.ell([.16,.03+x,g*.15+m],[.06,.025,.02],s.ACCENT,{group:2});h.anchors.feet.push({c:[.13,.04+x,g*.15],r:.08,group:g>0?6:2})}if(h.ell([-.32,.32,0],[.22,.06,.14],s.BODY2,{dir:[-1,-.6,0],group:3}),h.ell([0,.55+u,0],[.36,.52,.36],s.BODY,{paint:g=>g[0]>.12&&g[1]<d-f*.5?Math.floor(g[1]*18)%3===0&&Qn(g,16,.5)?s.BODY2:s.BELLY:void 0}),!c("wings"))for(const g of[-1,1])h.ell([-.06,.58+u,g*.3],[.4,.3,.08],s.BODY2,{dir:[-.3,-1,0],up:[1,0,0],group:g>0?4:2,paint:x=>Qn(x,12,.15)?s.BODY3:void 0});h.ell([0,d,0],[f,f*.9,f],s.BODY);for(const g of[-1,1]){const x=v.norm([.75,-.05,g*.4+.35]),m=v.add(st.surface([0,d,0],[f,f*.9,f],x),v.mul(x,-f*.05));h.ell(m,[f*.22,f*.46,f*.4],s.BELLY,{group:1,dir:x});const M=v.add(m,v.mul(x,f*.14));h.ell(M,[f*.1,f*.26,f*.24].map(_=>_*(l?1.15:1)),a?s.MAGIC:s.IRIS,{group:1,dir:x}),h.ell(v.add(M,v.mul(x,f*.07)),[f*.08,f*.14,f*.13].map(_=>_*(l?1.15:1)),a?s.MAGIC2:s.EYE,{group:1,dir:x}),(h.anchors.eyes||={pts:[],size:f*.22}).pts.push(v.add(M,v.mul(x,f*.07))),l||h.ell([f*.05,d+f*.8,g*f*.6],[f*.32,f*.12,f*.08],s.BODY2,{dir:[-.1,1,g*.7],up:[1,0,0],group:1})}if(h.ell(st.surface([0,d,0],[f,f*.9,f],v.norm([.75,-.35,.35])),[f*.2,f*.12,f*.1],s.ACCENT,{dir:[.6,-1,.3],group:1}),c("wings"))for(const g of[-1,1])Us(h,[-.05,.8+u,g*.3],g,1.3,t?.12:0,g>0?s.MAGIC2:s.MAGIC,s.MAGIC,40+(g>0?10:0));if(c("eyesRing"))for(let g=0;g<7;g++){const x=Math.PI*(.15+g/6*.7);h.ell([Math.cos(x)*.2-.1,d+.1+Math.sin(x)*.6,(g-3)*.15],[.07,.07,.07],s.MAGIC2,{group:95+g,extra:!0}),h.ell([Math.cos(x)*.2-.05,d+.1+Math.sin(x)*.6,(g-3)*.15],[.035,.035,.035],s.EYE,{group:95+g,extra:!0})}h.anchors.head={c:[0,d,0],r:[f,f*.9,f]},h.anchors.neck={c:[0,d-f*.75,0],r:f*.85,dir:[0,1,0]},Bl(h);const{sp:p}=Ii(h,{height:Ul(e,i,.95),facing:r});return a&&Fl(p,31),p}const tr=(n,e,t,i,r,a,o=1)=>{for(const l of i)n.ell(st.surface(e,t,v.norm(l)),[r,r*1.2,r],a,{group:o});n.anchors.head||={c:e,r:t},n.anchors.eyes||={pts:i.map(l=>st.surface(e,t,v.norm(l))),size:r}},ju=(n,e,t)=>n.ell([e,.005,0],[t,.005,t*.6],s.NOSE,{group:0});function Wn(n,e,t,i,r,a){Bl(n);const{sp:o}=Ii(n,{height:Ul(t,i,r),facing:a});return t===3&&Fl(o,e.id.length*131),o}const eh=(n,e,t)=>{n.ell(e,[t,t*.35,t],s.MAGIC,{group:95,extra:!0,paint:i=>i[1]>e[1]?s.MAGIC2:void 0});for(let i=0;i<5;i++){const r=i/5*Math.PI*2;n.ell(v.add(e,[Math.cos(r)*t*.8,t*.55,Math.sin(r)*t*.8]),[t*.38,t*.12,t*.12],s.MAGIC,{dir:[0,1,0],up:[1,0,0],group:96,extra:!0})}},kl=(n,e)=>e.forEach(([t,i],r)=>n.ell(v.add(t,[0,i*.45,0]),[i*.55,.07,.07],s.MAGIC,{dir:[(r%3-1)*.25,1,(r%2-.5)*.3],group:80+r%2,extra:!0,paint:a=>a[2]>t[2]?s.MAGIC2:void 0}));function Qd(n,e,t,i,r="towards"){const a=e===3,o=new st,l=t?.03:0;for(const[f,d]of[[.28,.2],[.28,-.2],[-.28,.2],[-.28,-.2]])o.seg([f,.15,d],[f+(d>0?l:-l),.03,d],.06,.05,s.BODY3,{group:d>0?6:2}),o.anchors.feet.push({c:[f+.03+(d>0?l:-l),.03,d],r:.065,group:d>0?6:2});const c=[0,.32,0],h=[.5,.32,.38];o.ell(c,h,s.BODY2,{paint:f=>Qn(f,22,.3)?s.BODY3:Qn(f,19,.12)?s.BELLY:void 0});for(let f=0;f<46;f++){const d=f*2.399%(Math.PI*2),p=f/46*.9+.05,g=v.norm([Math.cos(d)*Math.sin(p*Math.PI*.5)-.25,Math.cos(p*Math.PI*.5)*.9+.1,Math.sin(d)*Math.sin(p*Math.PI*.5)]);g[0]>.55||o.ell(v.add(st.surface(c,h,g),v.mul(g,.02)),[.1,.025,.025],f%4?s.BODY2:s.BODY3,{dir:v.add(g,[-.4,0,0]),group:1})}const u=[.48,.22,0];return o.ell(u,[.22,.14,.15],s.BELLY,{dir:[1,-.3,0],group:1}),o.ell([.69,.16,0],[.04,.04,.04],s.NOSE,{group:1}),tr(o,u,[.22,.14,.15],[[.3,.6,.55],[.3,.6,-.55]],.035,a?s.MAGIC2:s.EYE),a&&kl(o,[[[-.3,.55,.1],.35],[[-.05,.62,-.1],.5],[[.2,.55,.12],.4],[[-.15,.58,.2],.3]]),Wn(o,n,e,i,.6,r)}function jd(n,e,t,i,r="towards"){const a=e===3,o=new st,l=t?.05:0;for(const u of[-1,1])o.ell([-.22,.16,u*.36],[.24,.13,.12],u>0?s.BODY:s.BODY2,{dir:[1,.3,0],group:u>0?6:2,paint:f=>Qn(f,14,.15)?s.BODY3:void 0}),o.ell([.05,.04,u*.4],[.16,.04,.08],u>0?s.BODY:s.BODY2,{group:u>0?6:2}),o.seg([.35,.2+l,u*.24],[.42,.03,u*.3],.05,.04,u>0?s.BODY:s.BODY2,{group:u>0?7:2}),o.anchors.feet.push({c:[.45,.03,u*.3],r:.06,group:u>0?7:2},{c:[.12,.04,u*.4],r:.08,group:u>0?6:2});const c=[0,.3+l,0],h=[.5,.28,.4];o.ell(c,h,s.BODY,{paint:u=>u[1]<c[1]-.12?s.BELLY:u[0]>.38&&Math.abs(u[1]-(c[1]-.02))<.018?s.LINE:Qn(u,14,.22)?s.BODY3:void 0});for(const u of[-1,1]){const f=[.3,.55+l,u*.17];o.ell(f,[.1,.09,.1],s.BODY,{group:1}),o.ell(st.surface(f,[.1,.09,.1],v.norm([.6,.5,u*.5])),[.05,.05,.05],a?s.MAGIC2:s.IRIS,{group:1}),o.ell(st.surface(f,[.11,.1,.11],v.norm([.65,.45,u*.5])),[.03,.015,.03],s.EYE,{group:1})}return o.anchors.head={c:[.22,.45+l,0],r:[.3,.2,.3],top:[.18,.62+l,0]},o.anchors.eyes={pts:[-1,1].map(u=>st.surface([.3,.55+l,u*.17],[.1,.09,.1],v.norm([.6,.5,u*.5]))),size:.05},o.anchors.neck={c:[.32,.3+l,0],r:.25,dir:[1,.3,0]},a&&eh(o,[.15,.66+l,0],.16),Wn(o,n,e,i,.55,r)}function ef(n,e,t,i,r="towards"){const a=e===3,o=e===1,l=d=>a&&n.legend.includes(d),c=new st,h=t?.02:0;for(const d of[-1,1]){const p=t&&d>0?.04:0;c.seg([0,.3,d*.08],[.03,.03+p,d*.08],.03,.025,s.NOSE,{group:d>0?7:2}),c.ell([.08,.02+p,d*.08],[.08,.015,.04],s.NOSE,{group:2}),c.anchors.feet.push({c:[.07,.03+p,d*.08],r:.06,group:d>0?7:2})}if(c.ell([-.55,.42,0],[.32,.035,.12],s.BODY2,{dir:[-1,-.25,0],group:3}),c.ell([0,.52+h,0],[.42,.26,.24],s.BODY,{dir:[1,.45,0]}),!l("wings"))for(const d of[-1,1])c.ell([-.1,.55+h,d*.2],[.45,.17,.05],s.BODY2,{dir:[-1,-.25,0],group:d>0?4:2});const u=[.36,.84+h,0],f=o?.19:.16;if(c.ell(u,[f*1.1,f,f*.95],s.BODY,{paint:d=>d[1]>u[1]+f*.55?s.BELLY:void 0}),c.ell(v.add(u,[f*1.5,-f*.25,0]),[f*1,f*.38,f*.3],s.NOSE,{dir:[1,-.2,0],group:1}),tr(c,u,[f*1.1,f,f*.95],[[.55,.35,.65],[.55,.35,-.65]],f*.16,a?s.MAGIC2:s.EYE),l("wings"))for(const d of[-1,1])Us(c,[-.05,.65+h,d*.18],d,1.1,t?.1:0,d>0?s.MAGIC2:s.MAGIC,s.MAGIC,40+(d>0?10:0));if(l("eyesRing"))for(let d=0;d<6;d++){const p=Math.PI*(.2+d/5*.6);c.ell([Math.cos(p)*.25-.1,.95+Math.sin(p)*.45,(d-2.5)*.12],[.06,.06,.06],s.MAGIC2,{group:95+d,extra:!0})}return Wn(c,n,e,i,.75,r)}function tf(n,e,t,i,r="towards"){const a=e===3,o=d=>a&&n.legend.includes(d),l=new st,c=t===0,h=.55,u=o("wingsBig")?1.5:1;ju(l,0,.3*u);for(const d of[-1,1]){const p=[0,h+.05,d*.1],g=[.05,h+(c?.35:-.05),d*.45*u],x=[[-.05,h+(c?.45:-.15),d*.85*u],[-.25,h+(c?.2:-.25),d*.75*u],[-.3,h+(c?0:-.25),d*.4*u]],m=o("wingsBig")?s.MAGIC:s.BODY2,M=o("wingsBig")?s.MAGIC2:s.BODY3;l.seg(p,g,.03,.025,M,{group:11});for(const T of x)l.seg(g,T,.02,.012,M,{group:11});const _=v.sub(x[0],p),A=v.norm(_),E=v.norm(v.sub(x[2],g)),R=v.norm(v.sub(E,v.mul(A,v.dot(E,A))));l.flat(v.add(v.lerp(p,x[0],.5),v.mul(R,.12*u)),A,R,Math.hypot(..._)*.55,.3*u,xr.membrane(m),{group:10+(d>0?1:0),bend:.2})}l.ell([0,h,0],[.13,.16,.12],s.BODY,{group:1});const f=[.08,h+.2,0];l.ell(f,[.12,.11,.11],s.BODY,{group:1});for(const d of[-1,1])l.ell(v.add(f,[-.02,.15,d*.07]),[.12,.045,.02],s.BODY,{dir:[.1,1,d*.3],up:[1,0,0],group:1,paint:p=>p[0]>f[0]-.01?s.EAR:void 0});return tr(l,f,[.12,.11,.11],[[.7,.2,.5],[.7,.2,-.5]],.025,a?s.MAGIC2:s.EYE),l.ell(st.surface(f,[.12,.11,.11],[1,-.2,0]),[.025,.02,.03],s.NOSE,{group:1}),Wn(l,n,e,i,.55,r)}function nf(n,e,t,i,r="towards"){const a=e===3,o=new st,l=t?.03:0;o.seg([-.5,.18,0],[-.62,.12,0],.04,.02,s.SKIN,{group:3});for(const c of[-1,1])o.ell([-.3,.05,c*.2],[.07,.04,.05],s.SKIN,{group:c>0?6:2}),o.anchors.feet.push({c:[-.3,.05,c*.2],r:.07,group:c>0?6:2});o.ell([0,.3,0],[.52,.29,.33],s.BODY,{paint:c=>c[1]>.45?s.BODY2:void 0}),o.ell([.55,.24,0],[.2,.07,.07],s.SKIN,{dir:[1,-.15,0],group:1}),o.ell([.74,.21,0],[.04,.05,.06],s.NOSE,{group:1});for(const c of[-1,1]){const h=[.32,.1-(c>0?l:0),c*.34];o.ell(h,[.13,.035,.12],s.SKIN,{group:c>0?7:2,axes:[[1,0,0],[0,1,0],[0,0,1]]});for(let u=0;u<4;u++)o.ell(v.add(h,[.14,-.01,c*(u-1.5)*.05]),[.05,.015,.015],s.ACCENT,{group:c>0?7:2})}for(const c of[-1,1])o.ell(st.surface([0,.3,0],[.52,.29,.33],v.norm([.85,.3,c*.35])),[.015,.015,.015],a?s.MAGIC2:s.EYE,{group:1});return o.anchors.head={c:[.32,.34,0],r:[.25,.22,.25],top:[.3,.58,0]},o.anchors.eyes={pts:[-1,1].map(c=>st.surface([0,.3,0],[.52,.29,.33],v.norm([.85,.3,c*.35]))),size:.03},o.anchors.neck={c:[.36,.3,0],r:.27,dir:[1,.1,0]},a&&eh(o,[.15,.62,0],.15),Wn(o,n,e,i,.55,r)}function rf(n,e,t,i,r="towards"){const a=e===3,o=f=>a&&n.legend.includes(f),l=new st;for(const f of[-1,1])for(let d=0;d<3;d++){const p=.25-d*.25,g=(d+(f>0?1:0)+t)%2?.06:-.06,x=[p,.22,f*.2];l.chain([[...x,.03],[p+g+(1-d)*.06,.32,f*.42,.025],[p+g*1.5+(1-d)*.15,.02,f*.55,.015]],f>0?s.BODY2:s.BODY3,{group:f>0?7:2})}l.ell([-.12,.34,0],[.46,.24,.32],s.BODY,{paint:f=>Math.abs(f[2])<.018&&f[1]>.4?s.LINE:f[1]>.5&&f[2]>.05&&f[2]<.17?s.BELLY:void 0}),l.ell([.38,.33,0],[.16,.16,.26],s.BODY,{group:1});const c=[.56,.3,0];l.ell(c,[.1,.1,.17],s.BODY2,{group:1});const h=[.3,.5,.7,.75][e]*(o("horn")?1.3:1),u=o("horn")?s.MAGIC:s.BODY3;for(const f of[-1,1]){const d=v.add(c,[.08,.02,f*.1]),p=v.add(d,[h*.7,h*.45,f*h*.15]),g=v.add(p,[h*.25,-h*.12,-f*h*.12]);l.chain([[...d,.045],[...p,.035],[...g,.015]],u,{group:8+(f>0?1:0)}),l.seg(v.lerp(d,p,.55),v.add(v.lerp(d,p,.55),[0,h*.22,0]),.02,.008,u,{group:8})}for(const f of[-1,1])l.chain([[...v.add(c,[.05,.06,f*.1]),.012],[c[0]+.1,.5,f*.22,.012],[c[0]+.2,.5,f*.26,.012]],s.BODY3,{group:9,extra:!0});return tr(l,c,[.1,.1,.17],[[.4,.3,.85],[.4,.3,-.85]],.032,a?s.MAGIC2:s.EYE,9),o("crystals")&&kl(l,[[[-.35,.5,.1],.3],[[-.1,.55,-.08],.45],[[.1,.5,.1],.35]]),Wn(l,n,e,i,.5,r)}function af(n,e,t,i,r="towards"){const a=e===3,o=new st,l=t?.04:0;o.ell([0,.07,0],[.6+l,.07,.17],s.SKIN,{group:1}),o.chain([[.45+l,.08,0,.1],[.6+l,.25,0,.09],[.68+l,.28,0,.08]],s.SKIN,{group:1});for(const u of[-1,1])o.seg([.7+l,.32,u*.04],[.78+l,.55,u*.1],.018,.014,s.SKIN,{group:5}),o.ell([.78+l,.57,u*.1],[.03,.03,.03],a?s.MAGIC2:s.EYE,{group:5});o.anchors.head={c:[.68+l,.3,0],r:[.09,.08,.09],top:[.66+l,.38,0]},o.anchors.eyes={pts:[-1,1].map(u=>[.78+l,.57,u*.1]),size:.03},o.anchors.neck={c:[.55+l,.17,0],r:.1,dir:[1,1.2,0]};const c=[-.12,.4,0],h=a?s.MAGIC:s.BODY;return o.ell(c,[.32,.32,.22],h,{group:3,paint:u=>{const f=Math.atan2(u[1]-c[1],u[0]-c[0]);return((Math.hypot(u[0]-c[0],u[1]-c[1])/.32-f/(Math.PI*2)*.3)%.3+.3)%.3<.06?a?s.MAGIC2:s.BODY3:void 0}}),Wn(o,n,e,i,.45,r)}function sf(n,e,t,i,r="towards"){const a=e===3,o=new st;for(const l of[-1,1])for(let c=0;c<7;c++){const h=-.45+c*.15,u=(c+t)%2?.03:-.03;o.seg([h,.1,l*.22],[h+u,.01,l*.33],.025,.015,s.BODY3,{group:l>0?7:2})}for(const l of[-1,1])o.chain([[.5,.15,l*.08,.02],[.7,.3,l*.2,.015],[.82,.22,l*.26,.012]],s.BODY3,{group:9,extra:!0});return o.ell([0,.18,0],[.58,.2,.3],s.BODY,{paint:l=>(Math.floor((l[0]+.6)*9)%2&&l[1]>.2?s.BODY2:void 0)||(Math.abs((l[0]+.6)*9%1)<.12?s.LINE:void 0)}),tr(o,[0,.18,0],[.58,.2,.3],[[.92,.3,.25],[.92,.3,-.25]],.02,a?s.MAGIC2:s.EYE),a&&kl(o,[[[-.3,.32,.05],.3],[[0,.37,-.05],.45],[[.25,.32,.05],.32]]),Wn(o,n,e,i,.4,r)}function of(n,e,t,i,r="towards"){const a=e===3,o=e===1,l=p=>a&&n.legend.includes(p),c=new st,h=t?.7:0,u=[];for(let p=0;p<=12;p++){const g=p/12;u.push([-.9+g*1.2,.07,Math.sin(g*Math.PI*2+h)*.25*(1-g*.5),.03+.045*Math.sin(Math.min(1,g*1.4)*Math.PI/2)])}u.push([.38,.25,u[12][2],.07],[.42,.45,u[12][2]*.8,.065]),c.chain(u,s.BODY,{paint:p=>p[1]<.05&&p[0]<.35?s.BELLY:Qn([p[0]*1.5,p[1],p[2]],14,.3)?s.BODY3:void 0});const f=[.5,.5,u[13][2]*.8],d=o?.11:.09;if(c.ell(f,[d*1.5,d*.75,d],s.BODY,{dir:[1,-.15,0],group:1}),tr(c,f,[d*1.5,d*.75,d],[[.5,.5,.7],[.5,.5,-.7]],d*.22,a?s.MAGIC2:s.EYE),t||c.seg(v.add(f,[d*1.4,-d*.2,0]),v.add(f,[d*2.3,-d*.3,0]),.01,.008,s.SKIN,{group:1}),c.anchors.feet.push({c:v.add(u[0].slice(0,3),[-.02,-.01,0]),r:.06,group:3,tail:!0}),c.anchors.neck={c:[.42,.36,u[12][2]*.9],r:.075,dir:[.2,1,0]},l("wings"))for(const p of[-1,1])Us(c,[0,.2,p*.05],p,.9,t?.1:0,p>0?s.MAGIC2:s.MAGIC,s.MAGIC,40+(p>0?10:0));return Wn(c,n,e,i,.45,r)}function lf(n,e,t,i,r="towards"){const a=e===3,o=d=>a&&n.legend.includes(d),l=new st,c=t===0,h=.55,u=o("wingsBig")?1.45:1,f=o("wingsBig")?s.MAGIC:s.BODY;ju(l,0,.3*u);for(const d of[-1,1]){const p=c?.5:-.1,g=v.norm([.35,p,d]),x=v.norm([-.3,p*.6,d]);l.flat(v.add([0,h,d*.05],v.mul(g,.38*u)),g,v.norm(v.cross(g,[0,1,0])),.4*u,.24*u,xr.spotted(f,s.BELLY,s.BODY3),{group:10+(d>0?1:0)}),l.flat(v.add([-.05,h,d*.05],v.mul(x,.26*u)),x,v.norm(v.cross(x,[0,1,0])),.27*u,.17*u,xr.spotted(o("wingsBig")?s.MAGIC2:s.BODY2,s.BODY2,s.BODY2),{group:12+(d>0?1:0)}),l.chain([[.12,h+.08,d*.03,.015],[.2,h+.25,d*.1,.025],[.24,h+.32,d*.14,.012]],s.BODY2,{group:11})}return l.ell([0,h,0],[.22,.09,.09],s.BELLY,{group:1,paint:d=>Qn(d,30,.25)?s.BODY2:void 0}),l.ell([.17,h+.03,0],[.07,.07,.07],s.BELLY,{group:1}),tr(l,[.17,h+.03,0],[.07,.07,.07],[[.7,.3,.6],[.7,.3,-.6]],.02,a?s.MAGIC2:s.EYE),Wn(l,n,e,i,.5,r)}function cf(n,e,t,i,r="towards"){const a=e===3,o=h=>a&&n.legend.includes(h),l=new st,c=t?.05:0;for(let h=0;h<9;h++){const u=h/8,f=-.6+u*1.15;l.ell([f,.12+Math.sin(u*Math.PI)*(.06+c),0],[.08,.1-u*.02,.12-u*.03],h<2?s.MAGIC2:h%2?s.BODY2:s.BODY,{group:1})}o("lantern")&&l.ell([-.75,.3,0],[.22,.22,.22],s.MAGIC2,{group:3,paint:h=>h[1]<.2?s.MAGIC:void 0});for(let h=0;h<6;h++)l.seg([-.2+h*.12,.05,.08],[-.2+h*.12+(h%2?.02:-.02)*(t?-1:1),0,.12],.015,.01,s.BODY3,{group:7});return l.ell([.6,.14,0],[.06,.06,.08],s.BODY3,{group:1}),tr(l,[.6,.14,0],[.06,.06,.08],[[.6,.3,.7],[.6,.3,-.7]],.015,a?s.MAGIC2:s.EYE),Wn(l,n,e,i,.4,r)}function uf(n,e,t,i,r="towards"){const a=e===3,o=u=>a&&n.legend.includes(u),l=new st,c=[.15,.28,0];for(const u of[-1,1])for(let f=0;f<4;f++){const d=-.6+f*.4,p=(f+(u>0?0:1)+t)%2?.05:-.05,g=v.add(c,[.05-f*.04,0,u*.1]),x=v.add(g,[Math.cos(d)*.3*(f<2?1:-.6)+p,.3,u*.3]),m=v.add(g,[Math.cos(d)*.55*(f<2?1:-.8)+p*1.5,-.28,u*.55]);l.chain([[...g,.03],[...x,.028],[...m,.015]],u>0?s.BODY2:s.BODY3,{group:u>0?7:2})}l.ell([-.28,.38,0],[.34,.28,.3],s.BODY,{paint:u=>(Math.abs(u[2])<.03||Math.abs(u[0]+.28)<.03)&&u[1]>.45?s.BELLY:void 0}),l.ell(c,[.18,.13,.17],s.BODY2,{group:1}),l.anchors.head={c,r:[.18,.13,.17]},l.anchors.eyes={pts:[[.05,.05],[.05,-.05]].map(([u,f])=>st.surface(c,[.18,.13,.17],v.norm([.9,u*6,f*4]))),size:.03},l.anchors.neck={c:[-.02,.32,0],r:.15,dir:[1,0,0]};const h=o("eyesRing");for(const[u,f]of[[.05,.05],[.05,-.05],[.02,.1],[.02,-.1]])l.ell(st.surface(c,[.18,.13,.17],v.norm([.9,u*6,f*4])),[.025,.025,.025],h?s.MAGIC2:s.EYE,{group:1});if(h)for(let u=0;u<5;u++){const f=Math.PI*(.2+u/4*.6);l.ell([-.3+Math.cos(f)*.2,.75+Math.sin(f)*.35,(u-2)*.12],[.06,.06,.06],s.MAGIC2,{group:95+u,extra:!0})}return Wn(l,n,e,i,.5,r)}const hf=new Map(Object.entries({owl:Jd,hedgehog:Qd,toad:jd,raven:ef,bat:tf,mole:nf,beetle:rf,snail:af,woodlouse:sf,snake:of,moth:lf,glowworm:cf,spider:uf})),zl=[{id:"wolf",name:"Wolf",plan:"quad",hue:.08,sat:.24,val:.56,legend:["wings","mane"],q:{len:.64,chest:.42,tuck:.6,neck:.32,neckAng:.7,neckW:.42,hr:.26,snout:.82,snoutD:.7,ear:"point",earS:.82,tail:"brush",paw:"paw",legW:1.25,saddle:!0,belly:!0},tail:"up"},{id:"fox",name:"Fox",plan:"quad",q:{hgt:.8,len:.62,chest:.4,tuck:.5,neck:.3,neckAng:.7,neckW:.32,hr:.24,snout:1.05,snoutD:.5,snoutTaper:.6,ear:"point",earS:1.35,tail:"bushy",paw:"paw",legW:.9,belly:!0,socks:.3},hue:.06,sat:.8,val:.9,belly:"white",legend:["tails"]},{id:"badger",name:"Badger",plan:"quad",q:{hgt:.62,len:.78,chest:.2,tuck:.22,neck:.18,neckAng:.1,neckW:.5,hr:.26,snout:1,snoutD:.55,snoutTaper:.55,ear:"round",earS:.7,tail:"stub",paw:"paw",legW:1.35,legMat:s.BODY3,face:"badger",shaggy:!0},hue:.65,sat:.08,val:.45,legend:["crystals"]},{id:"boar",name:"Boar",plan:"quad",hue:.07,sat:.62,val:.5,legend:["tusksBig"],q:{len:.72,chest:.34,tuck:.42,neck:.2,neckAng:-.15,neckW:.55,hr:.27,snout:1.25,snoutD:.62,snoutTaper:.55,ear:"small",earS:.8,tail:"thin",paw:"hoof",legW:1.15,ridge:!0,tusks:!0,back:"hump",disc:!0},ridge:!0},{id:"stag",name:"Stag",plan:"quad",q:{hgt:1.3,len:.6,chest:.6,tuck:.7,neck:.55,neckAng:.95,neckW:.32,hr:.2,snout:1.15,snoutD:.6,snoutTaper:.65,ear:"point",earS:1.1,tail:"deer",paw:"hoof",legW:.75,antlers:"branch",rump:!0,spots:"young",belly:!0},hue:.08,sat:.5,val:.7,legend:["antlersGlow"]},{id:"hare",name:"Hare",plan:"quad",q:{hgt:.72,len:.5,chest:.4,tuck:.45,neck:.2,neckAng:.9,neckW:.35,hr:.27,snout:.65,snoutD:.7,ear:"long",earS:2.4,tail:"puff",paw:"paw",legW:.85,haunch:1.35,hindFoot:1.6,back:"arch",belly:!0,whiskers:!0},hue:.08,sat:.4,val:.72,legend:["jackalope"]},{id:"owl",name:"Owl",plan:"owl",hue:.08,sat:.5,val:.55,legend:["eyesRing","wings"]},{id:"bear",name:"Bear",plan:"quad",q:{hgt:1.15,len:.72,chest:.38,tuck:.4,neck:.25,neckAng:.3,neckW:.55,hr:.28,snout:.7,snoutD:.62,snoutTaper:.7,ear:"round",earS:.8,tail:"stub",paw:"paw",legW:1.55,back:"hump",muzzle:!0,shaggy:!0},hue:.07,sat:.55,val:.42,legend:["moss"]},{id:"hedgehog",name:"Hedgehog",plan:"hedgehog",hue:.08,sat:.4,val:.5,legend:["crystals"]},{id:"squirrel",name:"Squirrel",plan:"quad",q:{hgt:.55,len:.45,chest:.35,tuck:.4,neck:.2,neckAng:.9,neckW:.35,hr:.3,snout:.55,snoutD:.65,ear:"tuft",earS:1.1,tail:"squirrel",paw:"paw",legW:.8,haunch:1.3,back:"arch",belly:!0,whiskers:!0},hue:.03,sat:.75,val:.75,belly:"white",legend:["starTail"]},{id:"toad",name:"Toad",plan:"toad",hue:.2,sat:.5,val:.55,legend:["crown"]},{id:"otter",name:"Otter",plan:"quad",q:{hgt:.55,len:1,chest:.25,tuck:.25,neck:.3,neckAng:.35,neckW:.5,hr:.27,snout:.6,snoutD:.7,ear:"round",earS:.5,tail:"otter",paw:"paw",legW:1.1,muzzle:!0,belly:!0,whiskers:!0},hue:.07,sat:.55,val:.45,belly:"white",legend:["ribbons"]},{id:"lynx",name:"Lynx",plan:"quad",q:{hgt:.9,len:.55,chest:.5,tuck:.55,neck:.25,neckAng:.8,neckW:.4,hr:.27,snout:.5,snoutD:.75,snoutTaper:.8,ear:"tuft",earS:1,tail:"bob",paw:"paw",legW:1.2,cheeks:!0,spots:!0,belly:!0,whiskers:!0},hue:.09,sat:.45,val:.75,legend:["mane"]},{id:"elk",name:"Elk",plan:"quad",q:{hgt:1.4,len:.68,chest:.6,tuck:.66,neck:.45,neckAng:.75,neckW:.42,hr:.24,snout:1.6,snoutD:.9,snoutTaper:.85,ear:"point",earS:.9,tail:"stub",paw:"hoof",legW:.9,back:"hump",antlers:"palm",shaggy:!0},hue:.07,sat:.55,val:.38,legend:["antlersGlow","moss"]},{id:"raven",name:"Raven",plan:"raven",hue:.68,sat:.35,val:.3,legend:["wings","eyesRing"]},{id:"bat",name:"Bat",plan:"bat",hue:.78,sat:.25,val:.45,legend:["wingsBig"]},{id:"mole",name:"Mole",plan:"mole",hue:.7,sat:.15,val:.32,legend:["crown"]},{id:"beaver",name:"Beaver",plan:"quad",q:{hgt:.6,len:.65,chest:.2,tuck:.22,neck:.2,neckAng:.4,neckW:.55,hr:.28,snout:.6,snoutD:.75,ear:"round",earS:.45,tail:"flat",paw:"paw",legW:1.2,back:"arch",teeth:!0,whiskers:!0},hue:.06,sat:.6,val:.45,legend:["moss"]},{id:"stoat",name:"Stoat",plan:"quad",q:{hgt:.5,len:1,chest:.3,tuck:.33,neck:.35,neckAng:.6,neckW:.32,hr:.25,snout:.6,snoutD:.6,ear:"round",earS:.6,tail:"stoat",paw:"paw",legW:.8,belly:!0,back:"arch",whiskers:!0},hue:.1,sat:.25,val:.92,legend:["ribbons","mane"]},{id:"snail",name:"Snail",plan:"snail",hue:.08,sat:.45,val:.55,legend:["glowShell"]},{id:"ram",name:"Ram",plan:"quad",q:{hgt:.95,len:.6,chest:.48,tuck:.52,neck:.22,neckAng:.45,neckW:.48,hr:.25,snout:.85,snoutD:.75,snoutTaper:.8,ear:"small",earS:.7,tail:"stub",paw:"hoof",legW:.9,wool:!0,horns:"curl",face:"dark"},hue:.1,sat:.12,val:.88,legend:["hornsGlow"]},{id:"woodlouse",name:"Woodlouse",plan:"woodlouse",hue:.65,sat:.12,val:.45,legend:["crystals"]},{id:"snake",name:"Snake",plan:"snake",hue:.25,sat:.45,val:.45,legend:["wings"]},{id:"moth",name:"Moth",plan:"moth",hue:.1,sat:.3,val:.7,legend:["wingsBig"]},{id:"marten",name:"Pine marten",plan:"quad",q:{hgt:.55,len:.78,chest:.35,tuck:.38,neck:.3,neckAng:.55,neckW:.35,hr:.25,snout:.65,snoutD:.6,ear:"round",earS:.9,tail:"bushy",paw:"paw",legW:.85,belly:!0,back:"arch"},hue:.07,sat:.6,val:.45,legend:["mane"]},{id:"salamander",name:"Salamander",plan:"quad",q:{hgt:.42,len:.9,chest:.14,tuck:.14,neck:.12,neckAng:.05,neckW:.5,hr:.27,snout:.55,snoutD:.55,ear:"none",tail:"otter",paw:"paw",legW:1,spots:!0,spotMat:"belly"},hue:.1,sat:.1,val:.22,belly:"yellow",legend:["flames"]},{id:"glowworm",name:"Glow-worm",plan:"glowworm",hue:.12,sat:.4,val:.35,legend:["lantern"]},{id:"spider",name:"Spider",plan:"spider",hue:.07,sat:.45,val:.4,legend:["eyesRing"]},{id:"dormouse",name:"Dormouse",plan:"quad",q:{hgt:.38,len:.45,chest:.35,tuck:.38,neck:.15,neckAng:.6,neckW:.4,hr:.34,snout:.45,snoutD:.7,ear:"round",earS:.85,tail:"squirrel",paw:"paw",legW:.8,back:"arch",belly:!0,whiskers:!0,eyeK:1.6},hue:.09,sat:.6,val:.75,belly:"white",legend:["starTail"]},{id:"beetle",name:"Stag beetle",plan:"beetle",hue:.78,sat:.5,val:.35,legend:["horn","crystals"]}],th=Object.fromEntries(zl.map(n=>[n.id,n])),yc=[[[255,70,170],[255,245,250],[255,230,70]],[[40,220,255],[255,236,60],[255,80,180]],[[150,80,255],[175,255,60],[255,255,255]]],wc={sneakers:[[255,70,90],[250,250,245]],glitter:[[215,215,235],[190,190,210]],platform:[[160,60,230],[40,30,52]]};function df(n,e,t=null){const i=ff(n,e);if(!t)return i;if(t.collar&&(i[s.COLLAR]=Array.isArray(t.collar)?t.collar:i[s.MAGIC]),t.hat!=null){const[r,a,o]=yc[t.hat%yc.length];i[s.HAT1]=r,i[s.HAT2]=a,i[s.POM]=o}if(t.glasses&&(i[s.SHADES]=[22,18,32],i[s.FRAME]=t.glasses==="heart"?[255,60,110]:[255,90,210]),t.shoes){const[r,a]=wc[t.shoes]||wc.sneakers;i[s.SHOE]=r,i[s.SOLE]=a}if(t.woken){i[s.WOKEN]=[255,40,36];for(const r of[s.BODY,s.BODY2,s.BODY3,s.BELLY,s.ACCENT,s.EAR])i[r]&&(i[r]=i[r].map((a,o)=>Math.round(a*.72+[30,8,12][o]*.1)))}return i}function ff(n,e){const t=th[n],i=e.cVal/.85,r=e.cSat/.6,a=me(t.hue,t.sat*r*e.sat,t.val*i),o=t.belly==="yellow"?[240,196,40]:t.belly==="white"||t.q?.face==="badger"?[236,232,222]:me(t.hue+.03,t.sat*.5*r,Math.min(1,t.val*i*1.3+.08)),l=me(e.magicHue+t.hue*.3,.6,1),c=me(e.magicHue+t.hue*.3,.18,1),h=["boar","stag","elk","ram"].includes(t.id);return{[s.BODY]:a,[s.BODY2]:me(t.hue+.02,Math.min(1,t.sat*r*1.2+.05),t.val*i*.66),[s.BODY3]:me(t.hue+.03,Math.min(1,t.sat*r*1.3+.1),t.val*i*.4),[s.BELLY]:o,[s.ACCENT]:h?[236,226,200]:me(t.hue+.05,t.sat*.6,Math.min(1,t.val*i*.5+.25)),[s.MAGIC]:l,[s.MAGIC2]:c,[s.LEAF]:me(.3,.55,.55),[s.LEAF2]:me(.25,.5,.75),[s.LEAF3]:me(.33,.6,.35),[s.TRUNK]:me(.07,.45,.32),[s.EYE]:[24,18,30],[s.PUPIL]:[70,40,90],[s.GLINT]:[255,255,245],[s.NOSE]:[38,28,36],[s.EAR]:me(t.hue+.97,Math.min(1,t.sat*.6+.2),Math.min(1,t.val*i*.55+.2)),[s.IRIS]:t.plan==="owl"?[255,176,40]:me(.12,.7,.85),[s.SKIN]:[238,158,192]}}const pf=["size","growth","pixel","head","eye","legs","long","fur"],oa=new Map;function gf(n,e,t,i,r="towards",a=null){const o=th[n]||zl[0],l=a&&(a.collar||a.hat!=null||a.glasses||a.shoes||a.woken)?a:null,c=[o.id,e,t,r,...pf.map(u=>i[u]),l?[!!l.collar,l.hat??"",l.glasses||"",l.shoes||"",!!l.woken].join(","):""].join("|");let h=oa.get(c);if(!h){if(h=Yd(l,()=>o.q?qd(o,e,t,i,r):hf.get(o.plan)(o,e,t,i,r)),l?.woken)for(let u=0;u<h.m.length;u++)(h.m[u]===s.EYE||h.m[u]===s.IRIS||h.m[u]===s.PUPIL)&&(h.m[u]=s.WOKEN);oa.size>600&&oa.delete(oa.keys().next().value),oa.set(c,h)}return h}const je=(...n)=>({l:n}),Rt=(n,e,t,i,r)=>({a:[n,e,t,i,r]}),un=(n,e)=>({d:[n,e]}),vt=(n,e=.86)=>je([.5,e],[.5,n]),bt=Rt(.5,.76,.13,25,155),mf=n=>n.l?{l:n.l.map(([e,t])=>[1-e,t])}:n.a?{a:[1-n.a[0],n.a[1],n.a[2],180-n.a[3],180-n.a[4]]}:{d:[1-n.d[0],n.d[1]]},St=(...n)=>n.flatMap(e=>[e,mf(e)]);function Ei(n,e,t){const i=e[0]-n[0],r=e[1]-n[1],a=Math.hypot(i,r),o=t*a,l=(a*a/4+o*o)/(2*Math.abs(o)),c=(n[0]+e[0])/2,h=(n[1]+e[1])/2,u=r/a,f=-i/a,d=(l-Math.abs(o))*Math.sign(o),p=c-u*d,g=h-f*d,x=Math.atan2(n[1]-g,n[0]-p)*180/Math.PI;let M=Math.atan2(e[1]-g,e[0]-p)*180/Math.PI-x;for(;M>180;)M-=360;for(;M<-180;)M+=360;return Rt(p,g,l,x,x+M)}const Mf=(n,e,t,i,r,a=24)=>je(...Array.from({length:a+1},(o,l)=>[n+i*Math.sin(l/a*r*2*Math.PI),e+(t-e)*l/a])),xf=(n,e,t,i,r,a=0,o=40)=>je(...Array.from({length:o+1},(l,c)=>{const h=c/o,u=(a+h*r*360)*Math.PI/180,f=t+(i-t)*h;return[n+f*Math.cos(u),e+f*Math.sin(u)]})),Ha=(n,e,t,i,r)=>r.map(a=>{const o=Math.cos(a*Math.PI/180),l=Math.sin(a*Math.PI/180);return je([n+t*o,e+t*l],[n+i*o,e+i*l])});vt(.3),je([.28,.08],[.5,.3],[.72,.08]),Rt(.5,.55,.2,-55,55),un(.5+.2*Math.cos(-55*Math.PI/180),.55+.2*Math.sin(-55*Math.PI/180)),vt(.34),je([.36,.06],[.5,.34],[.64,.06]),Rt(.67,.66,.17,180,-80),un(.67+.17*Math.cos(-80*Math.PI/180),.66+.17*Math.sin(-80*Math.PI/180)),[vt(.1),je([.24,.3],[.76,.3]),...St(je([.33,.14],[.33,.56])),...St(un(.24,.3))],[vt(.16),...St(Rt(.36,.24,.15,45,180)),...Ha(.5,.16,0,.1,[-130,-90,-50])],[vt(.42),...St(je([.5,.42],[.34,.26],[.3,.06]),je([.335,.25],[.16,.2]),je([.32,.15],[.18,.07]))],[vt(.44),...St(je([.5,.44],[.4,.34],[.38,.06])),Rt(.62,.66,.09,180,540),...St(un(.38,.06))],[vt(.44),...St(Rt(.33,.3,.13,0,360),je([.24,.18],[.18,.05])),...St(un(.33,.3))],[vt(.24),je([.24,.3],[.76,.3]),...St(Rt(.3,.3,.09,180,360)),...St(je([.36,.5],[.32,.62]))],[vt(.52),Rt(.5,.52,.2,180,360),...Ha(.5,.52,.22,.34,[-160,-125,-90,-55,-20])],vt(.2),je([.5,.2],[.4,.08]),Rt(.66,.4,.16,100,-200),un(.66+.16*Math.cos(-200*Math.PI/180),.4+.16*Math.sin(-200*Math.PI/180)),[vt(.42),je([.16,.54],[.24,.42],[.76,.42],[.84,.54]),...St(Rt(.34,.3,.1,0,360)),...St(un(.16,.54))],vt(.24),Rt(.5,.5,.28,-100,100),un(.5+.28*Math.cos(-100*Math.PI/180),.5+.28*Math.sin(-100*Math.PI/180)),Ei([.18,.64],[.36,.64],.3),[vt(.32),je([.26,.2],[.5,.32],[.74,.2]),...St(je([.26,.2],[.26,.06])),je([.5,.68],[.66,.62]),...St(un(.26,.06))],[vt(.3),...St(je([.5,.3],[.42,.2]),Rt(.3,.16,.12,0,180),je([.18,.16],[.14,.06])),je([.5,.44],[.6,.52])],[vt(.14),je([.5,.14],[.3,.22]),je([.18,.56],[.5,.38],[.82,.56]),un(.58,.17),...St(un(.18,.56))],[vt(.3),Rt(.5,.16,.14,20,160),...St(je([.5,.38],[.12,.26]),Ei([.12,.26],[.24,.46],-.25),Ei([.24,.46],[.38,.5],-.3),Ei([.38,.5],[.5,.52],-.3))],[vt(.44),Rt(.5,.3,.16,0,180),...Ha(.5,.3,.19,.3,[-160,-125,-55,-20]),je([.5,.14],[.5,.04])],[vt(.36),je([.32,.2],[.68,.2]),...St(je([.44,.2],[.44,.34])),je([.5,.56],[.68,.66],[.5,.76],[.32,.66],[.5,.56])],[vt(.18),Rt(.5,.44,.24,180,360),je([.5,.18],[.6,.08]),...St(un(.26,.44))],vt(.52),xf(.5,.33,.03,.2,1.6,90),je([.66,.2],[.76,.06]),un(.76,.06),[vt(.24),...St(Rt(.36,.24,.14,0,-250)),...St(un(.36+.14*Math.cos(-250*Math.PI/180),.24+.14*Math.sin(-250*Math.PI/180)))],[vt(.24),Rt(.5,.52,.22,205,335),Rt(.5,.66,.24,205,335),Rt(.5,.38,.2,205,335),...St(je([.5,.24],[.32,.06]))],[vt(.16),Mf(.5,.82,.2,.2,1.25),je([.5,.2],[.5,.11]),...St(je([.5,.11],[.42,.045]))],[vt(.2),...St(je([.5,.3],[.16,.18],[.24,.5],[.5,.4]),je([.5,.5],[.3,.64],[.5,.66]),Rt(.38,.16,.12,0,-110))],[vt(.32),je([.3,.2],[.5,.32],[.7,.2]),...St(Rt(.3,.14,.07,90,-180)),Rt(.28,.56,.22,0,150),un(.28+.22*Math.cos(150*Math.PI/180),.56+.22*Math.sin(150*Math.PI/180))],[vt(.3),Ei([.5,.3],[.5,.06],.35),Ei([.5,.3],[.5,.06],-.35),...St(je([.5,.42],[.32,.38],[.26,.48]),je([.5,.64],[.32,.6],[.26,.7])),...St(un(.38,.52))],[vt(.4),Rt(.5,.27,.1,90,450),...Ha(.5,.27,.15,.25,[0,60,120,180,240,300])],[je([.5,.05],[.5,.3]),vt(.5),Rt(.5,.4,.11,-90,270),...St(...[-150,-170,170,150].map(n=>je([.5+.12*Math.cos(n*Math.PI/180),.4+.12*Math.sin(n*Math.PI/180)],[.5+.28*Math.cos(n*Math.PI/180),.4+.28*Math.sin(n*Math.PI/180)],[.5+.32*Math.cos(n*Math.PI/180),.4+.28*Math.sin(n*Math.PI/180)+.1]))),un(.5,.05)],[vt(.12),Rt(.5,.46,.24,-60,250),...St(Rt(.34,.16,.08,90,-180)),Ei([.56,.38],[.7,.38],-.4)],[vt(.36),...St(Rt(.66,.26,.2,160,250)),Ei([.5,.38],[.5,.82],.25),Ei([.5,.38],[.5,.82],-.25)];zl.map(n=>n.id);const xa=new Set([s.TRUNK,s.BARK2,s.BARKD,s.BARKL,s.BELLY]);function _n(n,e,t,i,r,a,{mat:o=s.LEAF,group:l=30,ragged:c=1}={}){const u=[];for(let M=0;M<9;M++){const _=M/9*Math.PI*2,A=1+(a()-.5)*.35*(r.clump+.3);u.push([e[0]+Math.cos(_)*t*A,e[1]+Math.sin(_)*i*A*(Math.sin(_)>0?.8:1)])}const f=Math.max(1,Math.round(Math.min(t,i)/3.5));n.shape(Fs(u,0,9,f,Math.max(1.2,Math.min(t,i)*.14)*c,1),o,{group:l,line:!1,round:r.round}),n.mark([mt(e,[-t*1.1,i*.15]),mt(e,[t*1.1,i*.1]),mt(e,[t*1.1,i*1.2]),mt(e,[-t*1.1,i*1.2])],s.LEAF3,[o]),n.mark([mt(e,[-t*.75,-i*.55]),mt(e,[t*.25,-i*.95]),mt(e,[t*.55,-i*.35]),mt(e,[-t*.2,-i*.05])],s.LEAF2,[o]);const d=Math.floor(e[0]-t*1.2),p=Math.ceil(e[0]+t*1.2),g=Math.floor(e[1]-i*1.2),x=Math.ceil(e[1]+i*1.2),m=a()*1e4|0;for(let M=g;M<=x;M++)for(let _=d;_<=p;_++){const A=n.get(_,M);if(A!==o&&A!==s.LEAF2&&A!==s.LEAF3)continue;const E=Ft(_,M,m),R=di(_/2,M/2,m)*.5+E*.5;R<.16*r.density?n.recolour(_,M,A===s.LEAF2?o:s.LEAF2):R>1-.16*r.density&&n.recolour(_,M,A===s.LEAF3?o:s.LEAF3)}}function dn(n,e,t,i,r,a,o,l,{mat:c=s.TRUNK,bend:h=1,group:u=10,line:f=!1}={}){const d=[e],p=4;let g=t,x=e;for(let m=1;m<=p;m++)g+=(l()-.5)*.7*o.gnarl*h,x=mt(x,[Math.cos(g)*i/p,Math.sin(g)*i/p]),d.push(x);return n.limb(d.map((m,M)=>[...m,r+(a-r)*M/p]),c,{group:u,line:f,round:o.round,cap:.6,capEnd:1}),{end:x,ang:g,pts:d}}function Gi(n,e,t,i,r,a,o){if(n.shape([[e-i*1.05,t],[e-i*.62,t-i*.5],[e-i*.45,t-i*1.4],[e+i*.45,t-i*1.4],[e+i*.62,t-i*.5],[e+i*1.05,t]],s.TRUNK,{group:10,round:r.round}),r.roots<=0)return;const l=Math.round(2+r.roots*4);for(let c=0;c<l;c++){const h=c%2?1:-1,u=(8+a()*16)*o*(.4+r.roots),f=(2+a()*3)*o,d=[e+h*i*.2,t-i*.5],p=[e+h*(i*.55+u*.4),t-f],g=[e+h*(i*.5+u),t-.5];n.limb([[...d,i*.55],[...p,i*.28],[...g,1.2]],s.TRUNK,{group:11,round:r.round,cap:.5,capEnd:.6})}}function nr(n,e,t=!0){if(!(e.bark<=0))for(let i=0;i<n.h;i++)for(let r=0;r<n.w;r++){const a=i*n.w+r;if(n.m[a]!==s.TRUNK)continue;const o=t?di(r/1.3,i/6,21):di(r/6,i/1.3,21);o>1-e.bark*.42||Ft(r,i,4)<e.bark*.05?n.m[a]=s.BARKD:o>1-e.bark*.62&&n.n[a*3]<-.1&&(n.m[a]=s.BARKL)}}function Nn(n,e,t){let i=n.w,r=-1,a=n.h;for(let d=0;d<n.h;d++)for(let p=0;p<n.w;p++)n.m[d*n.w+p]&&(i=Math.min(i,p),r=Math.max(r,p),a=Math.min(a,d));if(r<0)return{sp:n,crownY:t};const o=Math.max(e-i,r-e)+2,l=Math.max(0,Math.floor(e-o)),c=Math.min(n.w-l,Math.ceil(o*2)+1),h=Math.max(0,a-1),u=n.h-h,f=new qt(c,u);for(let d=0;d<u;d++)for(let p=0;p<c;p++){const g=(d+h)*n.w+p+l,x=d*c+p;f.m[x]=n.m[g],f.g[x]=n.g[g],f.n[x*3]=n.n[g*3],f.n[x*3+1]=n.n[g*3+1],f.n[x*3+2]=n.n[g*3+2]}return{sp:f,crownY:t-h}}const ei=n=>(n.crownWidth||3)/3;function _f(n,e,t){const i=ei(e),r=Math.round(220*t*i+60*t),a=Math.round(140*t),o=new qt(r,a),l=r/2,c=a,h=e.treeTrunks||1,u=12*t*(e.treeThick||1)*(e.treeThin?.55:1)/Math.sqrt(h),f=(n()-.5)*.5*e.gnarl+(e.treeLean||0),d=[];let p=a;const g=(x,m,M,_,A)=>{const E=dn(o,x,m,M,_,_*.65,e,n,{group:12});if(A===0){d.push(E.end);return}const R=n()<.35?3:2;for(let T=0;T<R;T++){const P=(T-(R-1)/2)*ce(n,.5,.85)*(A===3?1.4:1);g(E.end,E.ang+P+(n()-.5)*.25,M*ce(n,.6,.78),_*.62,A-1)}A<=2&&d.push(En(x,E.end,.7))};for(let x=0;x<h;x++){const m=f+(h>1?(x/(h-1)-.5)*.8:0),M=[l+(x-(h-1)/2)*u*.6,c],_=dn(o,M,-Math.PI/2+m,a*.36*(h>1?ce(n,.75,1.15):1),u,u*.72,e,n,{bend:1.4});p=Math.min(p,_.end[1]);for(const A of[-1,1])g(_.end,-Math.PI/2+m*.5+A*ce(n,.55,.95)*(.7+.3*i)*(h>1?.6:1),a*.22*(.75+.25*i)*(h>1?.7:1),u*.7,h>2?2:3);if(h===1&&n()<.7&&g(_.end,-Math.PI/2+(n()-.5)*.3,a*.18,u*.55,2),x===0&&e.treeHollow){const A=En(M,_.end,.38);o.ellipse(A[0],A[1],u*.28,u*.5,s.NOSE,{round:.3})}}if(Gi(o,l,c,u*Math.sqrt(h),e,n,t),nr(o,e),e.treeWebs)for(let x=0;x+1<d.length;x+=2){const m=d[x],M=d[x+1],_=Math.hypot(M[0]-m[0],M[1]-m[1]);if(_<40*t)for(let A=0;A<=_;A++){const E=En(m,M,A/_);o.px(E[0],E[1]+Math.sin(A/_*Math.PI)*_*.15,s.WEB,0,0,1)}}if(e.treeBare)return Nn(o,l,p+4*t);d.sort((x,m)=>x[1]-m[1]);for(const x of d)_n(o,mt(x,[0,-3*t]),ce(n,14,21)*t,ce(n,10,14)*t,e,n,{mat:n()<.35?s.LEAF3:s.LEAF});for(const x of d)n()<.75&&_n(o,mt(x,[ce(n,-9,9)*t,ce(n,-12,-3)*t]),ce(n,10,15)*t,ce(n,7,10)*t,e,n);return Nn(o,l,p+4*t)}function vf(n,e,t){const i=.8+.2*ei(e),r=Math.round(90*t*i),a=Math.round(160*t),o=new qt(r,a),l=r/2,c=a;o.limb([[l,c,6*t],[l,c-a*.5,4*t],[l,6*t,1.5]],s.TRUNK,{group:10,round:e.round}),Gi(o,l,c,6*t,e,n,t*.6),nr(o,e);const h=Math.round(ce(n,9,12));for(let u=h-1;u>=0;u--){const f=u/(h-1),d=6*t+f*a*.7,p=(5+f*36)*t*i*ce(n,.9,1.1),g=(5+f*13)*t,x=[[l,d-4*t],[l+p*.5,d+g*.3],[l+p,d+g],[l+p*.7,d+g*1.15],[l,d+g*.7],[l-p*.7,d+g*1.15],[l-p,d+g],[l-p*.5,d+g*.3]];o.shape(Fs(x,1,7,Math.max(2,Math.round(p/(3*t))),2*t,1),s.LEAF,{group:30+u,line:!1,round:e.round}),o.mark([[l-p,d+g*.55],[l+p,d+g*.55],[l+p,d+g*1.4],[l-p,d+g*1.4]],s.LEAF3,[s.LEAF]),o.mark([[l-p*.55,d-2*t],[l+p*.1,d-3*t],[l+p*.1,d+g*.45],[l-p*.7,d+g*.7]],s.LEAF2,[s.LEAF])}return Nn(o,l,a*.82)}function bf(n,e,t){const i=ei(e),r=Math.round(200*t*i+50*t),a=Math.round(130*t),o=new qt(r,a),l=r/2,c=a,h=13*t,u=dn(o,[l,c],-Math.PI/2+(n()-.5)*.3,a*.3,h,h*.8,e,n,{bend:1.6}),f=[];for(let g=0;g<5;g++){const x=g%2?1:-1,m=-Math.PI/2+x*ce(n,.55,1.25)*(.7+.3*i),M=dn(o,u.end,m,a*ce(n,.3,.42)*(.8+.2*i),h*.55,h*.3,e,n,{group:12});f.push(M.end)}Gi(o,l,c,h,e,n,t),nr(o,e);for(const g of f)_n(o,mt(g,[0,-2*t]),ce(n,20,28)*t,ce(n,9,12)*t,e,n);_n(o,mt(u.end,[0,-8*t]),24*t,11*t,e,n);let d=r,p=0;for(const g of f)d=Math.min(d,g[0]-22*t),p=Math.max(p,g[0]+22*t);for(let g=d;g<p;g+=ce(n,1,1.7)){let x=a;for(let A=0;A<a;A++)if(o.get(g,A)===s.LEAF||o.get(g,A)===s.LEAF2||o.get(g,A)===s.LEAF3){x=A;break}if(x>=a)continue;const m=Math.abs(g-l)/(r/2),M=(c-x)*ce(n,.5,.9)*(1-m*.3),_=Ft(g|0,1,9)<.4?s.LEAF2:s.LEAF;for(let A=x+2;A<Math.min(c-2,x+M);A++){const E=Math.round(Math.sin(A*.12+g)*.7);Ft(g|0,A,5)<.2+e.density*.8&&o.px(g+E,A,(A-x)/M>.8?s.LEAF3:_,E*.3,.2,.95)}}return Nn(o,l,u.end[1]+6*t)}function nh(n,e,t){const i=.7+.3*ei(e),r=Math.round(110*t*i),a=Math.round(155*t),o=new qt(r,a),l=r/2,c=a,h=(n()-.5)*.25+(e.treeLean||0),u=dn(o,[l,c],-Math.PI/2+h,a*.85,5*t,2*t,e,n,{mat:s.BARK2,bend:.4});for(let d=0;d<u.pts.length-1;d++)for(let p=0;p<1;p+=1/8){const g=En(u.pts[d],u.pts[d+1],p+n()*.1);if(n()<.55)for(let x=-3;x<=3;x++)o.get(g[0]+x,g[1])===s.BARK2&&n()<.8&&o.recolour(g[0]+x,g[1],s.BARKD)}const f=[u.end];for(let d=0;d<7;d++){const p=ce(n,.35,.9),g=En(u.pts[0],u.end,p),x=d%2?1:-1,m=dn(o,g,-Math.PI/2+x*ce(n,.5,1),a*ce(n,.12,.2)*i,2*t,1,e,n,{mat:s.BARKD,group:12});f.push(m.end)}for(const d of f)_n(o,d,ce(n,9,13)*t*i,ce(n,7,10)*t,e,n,{mat:s.LEAF2,ragged:1.3});return Nn(o,l,a*.55)}function Sf(n,e,t){const i=ei(e),r=Math.round(220*t*i+50*t),a=Math.round(120*t),o=new qt(r,a),l=r/2,c=a,h=10*t,u=dn(o,[l,c],-Math.PI/2+(n()-.5)*.4*(e.gnarl+.3),a*.4,h,h*.75,e,n,{bend:1.2}),f=[];for(const g of[-1,1,-1,1]){const x=dn(o,u.end,-Math.PI/2+g*ce(n,.7,1.15)*(.7+.3*i),a*ce(n,.3,.42)*(.7+.3*i),h*.55,h*.25,e,n,{group:12});f.push(x.end,En(u.end,x.end,.55))}Gi(o,l,c,h,e,n,t),nr(o,e);const d=Math.round(ce(n,2,3)),p=Math.min(...f.map(g=>g[1]));for(let g=0;g<d;g++){const x=p-6*t+g*9*t,m=(95-g*12)*t*(.65+.35*i);for(let M=0;M<5;M++)_n(o,[l+(M-2)*m*.36+ce(n,-5,5)*t,x+ce(n,-3,3)*t],m*ce(n,.2,.26),7*t,e,n,{mat:g===d-1?s.LEAF:s.LEAF3})}return Nn(o,l,u.end[1]+4*t)}function ta(n,e,t,i,r,{grain:a=2,holes:o=0,flecks:l=.16,dots:c=0,dot:h=s.FLOWER,dotTall:u=!1,mats:f=[s.LEAF,s.LEAF2,s.LEAF3]}={}){const d=Math.floor(e[0]-t*1.3),p=Math.ceil(e[0]+t*1.3),g=Math.floor(e[1]-i*1.3),x=Math.ceil(e[1]+i*1.3),m=r()*1e4|0;for(let M=g;M<=x;M++)for(let _=d;_<=p;_++){const A=n.get(_,M);if(!f.includes(A))continue;const E=di(_/a,M/a,m),R=Ft(_,M,m);o&&E<o?n.recolour(_,M,s.LEAF3):E>1-l&&n.recolour(_,M,s.LEAF2),c&&R<c&&A!==s.LEAF3&&(n.recolour(_,M,h),u&&n.recolour(_,M-1,h))}}function Wi(n,e,t,i){const r=ei(e)*(i.wide||1),a=Math.round(240*t*r+70*t),o=Math.round((i.tall||140)*t),l=new qt(a,o),c=a/2,h=o,u=e.treeTrunks||i.trunks||1,f=(i.tw||12)*t*(e.treeThick||1)*(e.treeThin?.55:1)/Math.sqrt(u),d=(n()-.5)*.4*e.gnarl+(e.treeLean||0)+(i.lean||0),p=[];let g=o;const x=(R,T,P,S,y)=>{const C=dn(l,R,T,P,S,S*.65,e,n,{group:12,mat:i.limbMat||s.TRUNK,bend:i.bend??1});if(y===0){p.push(C.end);return}const I=n()<(i.fork??.35)?3:2;for(let L=0;L<I;L++)x(C.end,C.ang+(L-(I-1)/2)*ce(n,.45,.8)*(i.splay||1)+(n()-.5)*.25,P*ce(n,.6,.78),S*.62,y-1);y<=2&&p.push(En(R,C.end,.7))};for(let R=0;R<u;R++){const T=d+(u>1?(R/(u-1)-.5)*(i.fan||.8):0),P=[c+(R-(u-1)/2)*f*.6,h],S=dn(l,P,-Math.PI/2+T,o*(i.trunk||.36)*(u>1?ce(n,.8,1.1):1),f,f*.72,e,n,{bend:i.trunkBend??1.2,mat:i.trunkMat||s.TRUNK});g=Math.min(g,S.end[1]);for(let y=0;y<(i.limbs||2);y++){const C=y%2?1:-1;x(S.end,-Math.PI/2+T*.5+C*ce(n,.5,1)*(i.spreadA||.8)*(u>1?.7:1),o*(i.limb||.22)*(u>1?.75:1),f*.7,i.depth??3)}if(i.leader&&x(S.end,-Math.PI/2+(n()-.5)*.2,o*(i.limb||.22)*i.leader,f*.55,2),R===0&&e.treeHollow){const y=En(P,S.end,.38);l.ellipse(y[0],y[1],f*.28,f*.5,s.NOSE,{round:.3})}}if(i.noRoots||Gi(l,c,h,f*Math.sqrt(u),e,n,t*(i.rootK||1)),i.smooth||nr(l,e),e.treeBare)return Nn(l,c,g+4*t);p.sort((R,T)=>R[1]-T[1]);const[m,M]=i.clumpR||[12,18],_=i.flat||.7,A=[],E=(R,T,P,S)=>{_n(l,R,T,P,e,n,{mat:S,ragged:i.ragged||1}),A.push([R,T,P])};for(const R of p)E(mt(R,[0,-3*t]),ce(n,m,M)*t,ce(n,m,M)*t*_,n()<(i.darkBack??.35)?s.LEAF3:s.LEAF);for(const R of p)n()<(i.extra??.7)&&E(mt(R,[ce(n,-9,9)*t,ce(n,-12,-3)*t]),ce(n,m,M)*t*.7,ce(n,m,M)*t*_*.7,s.LEAF);if(i.dome){const R=Math.min(...p.map(y=>y[1])),T=p.map(y=>y[0]),P=(Math.min(...T)+Math.max(...T))/2,S=(Math.max(...T)-Math.min(...T))/2;for(let y=0;y<i.dome;y++){const C=y/Math.max(1,i.dome-1)-.5;E([P+C*S*1.1,R-(1-4*C*C)*14*t-ce(n,2,6)*t],ce(n,m,M)*t*1.1,ce(n,m,M)*t*_,s.LEAF)}}if(i.layers)for(const[R,T,P]of A)for(let S=-P;S<P;S+=Math.max(3,i.layers*t))for(let y=-T;y<T;y++)l.get(R[0]+y,R[1]+S)===s.LEAF&&l.recolour(R[0]+y,R[1]+S,s.LEAF3);for(const[R,T,P]of A)ta(l,R,T,P,n,i.tex||{});return Nn(l,c,g+4*t)}function Ef(n,e,t){return Wi(n,{...e,gnarl:Math.max(e.gnarl,.8)},t,{trunk:.26,tw:15,limbs:3,spreadA:1.05,limb:.26,depth:3,wide:1.15,clumpR:[10,15],flat:.75,extra:.9,dome:5,bend:1.4,tex:{grain:1.6,holes:.12,flecks:.18}})}function yf(n,e,t){return Wi(n,{...e,gnarl:e.gnarl*.4},t,{trunk:.4,tw:11,limbs:2,leader:1.3,spreadA:.6,limb:.22,depth:3,clumpR:[15,21],flat:.5,extra:1,dome:7,smooth:1,layers:3.5,trunkMat:s.BARK2,limbMat:s.BARK2,tall:155,tex:{grain:3.5,holes:0,flecks:.1}})}function wf(n,e,t){return Wi(n,{...e,gnarl:e.gnarl*.6},t,{trunk:.4,tw:9,limbs:3,spreadA:.45,limb:.26,depth:3,splay:.6,clumpR:[7,10],flat:.8,extra:.35,ragged:1.8,tall:160,wide:.8,darkBack:.1,tex:{grain:1.2,holes:.3,flecks:.26}})}function Af(n,e,t){return Wi(n,{...e,gnarl:e.gnarl*.4},t,{trunk:.38,tw:11,limbs:2,spreadA:.55,limb:.24,depth:3,leader:1.1,clumpR:[9,12],flat:.85,extra:1,dome:5,tall:170,wide:.75,darkBack:.15,tex:{grain:1.4,holes:.05,flecks:.22}})}function Tf(n,e,t){return Wi(n,e,t,{trunk:.34,tw:12,limbs:2,spreadA:.8,limb:.24,depth:2,clumpR:[20,27],flat:.7,extra:.8,dome:2,darkBack:.5,tex:{grain:4,holes:.16,flecks:.12}})}function Rf(n,e,t){return Wi(n,e,t,{trunk:.32,tw:14,limbs:2,spreadA:.85,limb:.25,depth:2,clumpR:[22,30],flat:.78,extra:.9,dome:3,darkBack:.25,tall:150,tex:{grain:6,holes:.04,flecks:.16,dots:.025,dotTall:!0}})}function Cf(n,e,t){return Wi(n,{...e,gnarl:e.gnarl*.7},t,{trunk:.45,tw:7,limbs:3,spreadA:.55,limb:.2,depth:2,clumpR:[8,11],flat:.7,extra:.5,ragged:1.7,wide:.6,tall:120,smooth:1,trunkMat:s.BARK2,limbMat:s.BARK2,darkBack:.1,tex:{grain:1.1,holes:.26,flecks:.22,dots:.05}})}function Lf(n,e,t){const i=.7+.3*ei(e),r=Math.round(110*t*i),a=Math.round(165*t),o=new qt(r,a),l=r/2,c=a,h=e.treeTrunks||1,u=(n()-.5)*.2+(e.treeLean||0),f=[];for(let p=0;p<h;p++){const g=dn(o,[l+(p-(h-1)/2)*5*t,c],-Math.PI/2+u+(h>1?(p/(h-1)-.5)*.3:0),a*.92,6*t/Math.sqrt(h),1.5,e,n,{bend:.5});for(let x=0;x<16;x++){const m=ce(n,.3,.97),M=En(g.pts[0],g.end,m),_=x%2?1:-1,A=(1-m*.6)*a*.12*i,E=dn(o,M,-Math.PI/2+_*ce(n,.7,1.2),A,2*t,1,e,n,{group:12,mat:s.BARKD});f.push([E.end,(8+(1-m)*6)*t*i],[En(M,E.end,.4),(7+(1-m)*4)*t*i])}f.push([g.end,7*t])}Gi(o,l,c,6*t,e,n,t*.6),nr(o,e);for(const[p,g]of f)_n(o,p,g,g*.8,e,n,{mat:n()<.5?s.LEAF3:s.LEAF});for(const[p,g]of f)ta(o,p,g,g*.8,n,{grain:1.3,holes:.2,flecks:.1,dots:.03,dot:s.BARKD});const d=Math.min(...f.map(([p])=>p[1]));return Nn(o,l,d+(c-d)*.45)}function Df(n,e,t){const i=.8+.2*ei(e),r=Math.round(150*t*i),a=Math.round(175*t),o=new qt(r,a),l=r/2,c=a,h=dn(o,[l,c],-Math.PI/2+(n()-.5)*.25+(e.treeLean||0),a*.78,8*t,3*t,e,n,{bend:.7});nr(o,e);for(let f=0;f<o.h*.55;f++)for(let d=0;d<r;d++)(o.get(d,f)===s.TRUNK||o.get(d,f)===s.BARKD)&&o.recolour(d,f,Ft(d,f,3)<.15?s.BARKD:s.BELLY);Gi(o,l,c,8*t,e,n,t*.7);const u=[];for(let f=0;f<6;f++){const d=ce(n,.55,1),p=En(h.pts[0],h.end,d),g=f%2?1:-1,x=dn(o,p,-Math.PI/2+g*ce(n,.6,1.3),a*ce(n,.12,.22)*i,3*t,1.5,e,n,{group:12,bend:1.6,mat:s.BELLY});u.push(x.end)}u.push(h.end);for(const f of u)_n(o,mt(f,[0,-2*t]),ce(n,13,19)*t*i,ce(n,4,6)*t,e,n,{mat:s.LEAF,ragged:1.3});for(const f of u)ta(o,mt(f,[0,-2*t]),19*t*i,6*t,n,{grain:1,holes:.25,flecks:.14});return Nn(o,l,Math.min(...u.map(f=>f[1]))+8*t)}function Pf(n,e,t){const i=ei(e),r=Math.round(200*t*i+50*t),a=Math.round(120*t),o=new qt(r,a),l=r/2,c=a,h=e.treeTrunks||3,u=9*t*(e.treeThick||1.2);for(let p=0;p<h;p++)dn(o,[l+(p-(h-1)/2)*u*.5,c],-Math.PI/2+(p-(h-1)/2)*.35+(e.treeLean||0),a*.3,u,u*.6,e,n,{mat:s.BELLY,bend:1.6});for(let p=0;p<a;p++)for(let g=0;g<r;g++)o.get(g,p)===s.BELLY&&(g+Math.round(p/6))%4===0&&o.recolour(g,p,s.BARKD);Gi(o,l,c,u*1.4,e,n,t);const f=c-a*.3,d=[];for(let p=0;p<9;p++){const g=Math.PI+p/8*Math.PI,x=(40+20*i)*t;d.push([[l+Math.cos(g)*x,f+Math.sin(g)*x*.55+10*t],ce(n,16,22)*t])}for(let p=0;p<7;p++)d.push([[l+(p/6-.5)*(60+30*i)*t,f-ce(n,4,22)*t],ce(n,20,26)*t]);d.push([[l,f-24*t],26*t]);for(const[p,g]of d)_n(o,p,g,g*.7,e,n,{mat:s.LEAF3,ragged:.6});for(const[p,g]of d)ta(o,p,g,g*.7,n,{grain:.7,holes:0,flecks:.08,mats:[s.LEAF,s.LEAF2,s.LEAF3]});return Nn(o,l,f+4*t)}function Of(n,e,t){return Wi(n,{...e,gnarl:1},t,{trunk:.3,tw:8,limbs:3,spreadA:.9,limb:.3,depth:3,fork:.6,bend:2,lean:.45,clumpR:[7,10],flat:.65,extra:.8,wide:.7,tall:90,ragged:1.4,darkBack:.3,tex:{grain:1,holes:.1,flecks:.14,dots:.035}})}function If(n,e,t){const i=.8+.2*ei(e),r=Math.round(110*t*i),a=Math.round(130*t),o=new qt(r,a),l=r/2,c=a;o.limb([[l,c,5*t],[l,c-a*.5,3*t],[l,10*t,1.5]],s.BARK2,{group:10,round:e.round});const h=[];for(let u=0;u<10;u++){const f=u/9,d=10*t+f*a*.72,p=(5+f*28)*t*i,g=1+Math.round(f*3);for(let x=0;x<g;x++)h.push([[l+(g>1?(x/(g-1)-.5)*p*1.3:0)+ce(n,-2,2)*t,d+ce(n,-2,2)*t],(6+f*5)*t])}for(const[u,f]of h)_n(o,u,f*1.2,f,e,n,{mat:s.LEAF3,ragged:.7});for(const[u,f]of h)ta(o,u,f*1.2,f,n,{grain:1.1,holes:0,flecks:.2,dots:.035,mats:[s.LEAF,s.LEAF2,s.LEAF3]});return Nn(o,l,a*.85)}function Nf(n,e,t){return Wi(n,{...e,gnarl:e.gnarl*.5,treeTrunks:e.treeTrunks||6},t,{trunk:.5,tw:9,limbs:1,spreadA:.5,limb:.18,depth:1,fan:1.3,trunkBend:.8,clumpR:[11,15],flat:.8,extra:1,wide:.8,tall:110,noRoots:!1,rootK:.4,smooth:1,trunkMat:s.BARK2,limbMat:s.BARK2,darkBack:.2,tex:{grain:3.6,holes:.14,flecks:.2}})}function Ff(n,e,t){const i=nh(n,{...e,treeLean:e.treeLean||0},t),r=i.sp;for(let a=0;a<r.w;a++){let o=-1;for(let c=0;c<r.h;c++)if([s.LEAF,s.LEAF2,s.LEAF3].includes(r.get(a,c))){o=c;break}if(o<0||Ft(a,1,7)<.35)continue;const l=(r.h-o)*ce(n,.25,.5);for(let c=o+1;c<Math.min(r.h-3,o+l);c++)(!r.get(a,c)||r.get(a,c)===s.LEAF3)&&r.px(a+Math.round(Math.sin(c*.2+a)*.6),c,Ft(a,c,2)<.3?s.LEAF:s.LEAF2,0,.2,.95)}return i}function Uf(n,e,t){const i=.8+.2*ei(e),r=Math.round(100*t*i),a=Math.round(170*t),o=new qt(r,a),l=r/2,c=a;o.limb([[l,c,6*t],[l,c-a*.5,3.5*t],[l,6*t,1.2]],s.TRUNK,{group:10,round:e.round}),Gi(o,l,c,6*t,e,n,t*.5),nr(o,e);const h=14;for(let u=0;u<h;u++){const f=u/(h-1),d=8*t+f*a*.68,p=(4+f*30)*t*i;for(let g=0;g<4;g++){const x=[l+(g/3-.5)*p*1.6,d+Math.abs(g/3-.5)*6*t];_n(o,x,p*.35+2*t,4*t,e,n,{mat:s.LEAF2,ragged:1.6}),ta(o,x,p*.35+2*t,4*t,n,{grain:1,holes:.32,flecks:.1,mats:[s.LEAF,s.LEAF2]})}}return Nn(o,l,a*.8)}const Bf=6;function kf(n,e,t,i,r){const{sp:a,crownY:o}=n,l=a.w,c=a.h,h=a.low||(a.low=new Uint8Array(l*c)),u=Math.ceil(o+Bf*i);if(u>=c-2)return n;const f=i/(t.treeSize*2/(t.pixel||2)),d=Math.max(0,Math.min(1,(1-f)/.5)),p=!!t.treeBare,g=y=>{const C=[];let I=-1;for(let L=0;L<=l;L++){const N=L<l&&xa.has(a.m[y*l+L]);N&&I<0&&(I=L),!N&&I>=0&&(C.push([I,L-1]),I=-1)}return C},x=(y,C)=>y.reduce((I,L)=>!I||Math.abs((L[0]+L[1])/2-C)<Math.abs((I[0]+I[1])/2-C)?L:I,null),m=y=>{const C=a.m.slice(),I=a.n.slice();y();for(let L=0;L<C.length;L++)a.m[L]!==C[L]&&((L/l|0)<u||C[L]&&!xa.has(C[L])&&!h[L]?(a.m[L]=C[L],a.n[L*3]=I[L*3],a.n[L*3+1]=I[L*3+1],a.n[L*3+2]=I[L*3+2]):h[L]=1)},M=()=>{for(let y=0;y<8;y++){const C=Math.round(ce(e,u,c-3)),I=g(C);if(I.length){const L=Nl(e,I),N=e()<.5?-1:1;return{x:N<0?L[0]:L[1],y:C,side:N}}}return null},_=p?0:1,A=c-1;let E=l,R=0;for(let y=0;y<u*l;y++)if(a.m[y]&&!xa.has(a.m[y])){const C=y%l;E=Math.min(E,C),R=Math.max(R,C)}const T=Math.max(6*i,(R-E)*.22);r.moss&&m(()=>{for(let y=Math.max(u,Math.round(c-(c-u)*.4));y<c;y++)for(let C=0;C<l;C++){const I=y*l+C;if(!xa.has(a.m[I]))continue;const L=y>0&&!a.m[I-l];(di(C/2.5,y/2.5,41)>1-r.moss*(.35+.4*(y-u)/(c-u))||L&&Ft(C,y,9)<r.moss*.6)&&(a.m[I]=Ft(C,y,5)<.3?s.LEAF2:s.LEAF)}}),r.ivy&&e()<.35+r.ivy*.6&&m(()=>{let y=l/2;const C=A-(A-u)*ce(e,.45,.95)*Math.min(1,r.ivy+.3),I=e()*6;for(let L=A-1;L>C;L--){const N=x(g(L),y);if(!N)break;if(y=N[0]+(N[1]-N[0])*(.5+.48*Math.sin(L*.22+I)),a.px(y,L,s.LEAF3,0,0,1),Ft(Math.round(y),L,13)<.45){const O=Ft(L,3,2)<.5?-1:1;a.px(y+O,L,s.LEAF,O*.5,-.3,.8),a.px(y+O*2,L,s.LEAF3,O*.6,0,.8),a.px(y+O,L-1,Ft(y,L,4)<.4?s.LEAF2:s.LEAF3,0,-.6,.8)}}});const P=Math.round(r.sprigs*_*(5+8*d)*(c-u)/(40*i));for(let y=0;y<P;y++){const C=M();if(!C)break;const I=ce(e,3,5.5)*i;m(()=>_n(a,[C.x+C.side*I*.6,C.y],I,I*.75,t,e,{mat:e()<.4?s.LEAF3:s.LEAF,ragged:.8}))}const S=Math.round(r.boughs*_*(3+4*d)*(c-u)/(45*i)+(e()<r.boughs*_?1:0));for(let y=0;y<S;y++){const C=M();if(!C)break;m(()=>{const I=dn(a,[C.x,C.y],-Math.PI/2+C.side*ce(e,.9,1.35),Math.min(T,ce(e,10,20)*i),2*i,1,t,e,{group:12,mat:s.TRUNK}),L=ce(e,6,9.5)*i;_n(a,mt(I.end,[0,-1*i]),L,L*.65,t,e,{mat:e()<.4?s.LEAF3:s.LEAF})})}if(r.skirt&&_){const y=Math.round(3+r.skirt*5+d*3);for(let C=0;C<y;C++)m(()=>{const I=Math.round(ce(e,Math.max(u,c-(c-u)*.8),c-4*i)),L=x(g(I),l/2);if(!L)return;const N=C%2?1:-1,O=N<0?L[0]:L[1],U=Math.min(T*1.3,ce(e,14,24)*i*(.6+r.skirt*.5)),W=dn(a,[O,I],-Math.PI/2+N*ce(e,1.6,1.95),U,1.6*i,1,t,e,{group:12,mat:s.BARKD});_n(a,En([O,I],W.end,.6),U*.5,3.5*i,t,e,{mat:e()<.5?s.LEAF3:s.LEAF,ragged:1.2})})}return n}const zf={broad:{ivy:.4,moss:.6,sprigs:.5,boughs:.3},fir:{moss:.3,skirt:1},willow:{moss:.5,sprigs:.3},birch:{sprigs:.3,boughs:.2},flat:{ivy:.3,sprigs:.4,boughs:.3},oak:{ivy:.5,moss:.5,sprigs:.9,boughs:.4},beech:{moss:.3,boughs:.3},ash:{ivy:.6,sprigs:.3,boughs:.2},lime:{moss:.3,sprigs:1},sycamore:{ivy:.4,moss:.4,boughs:.4},chestnut:{sprigs:.3,boughs:.5},rowan:{sprigs:.3,boughs:.3},alder:{moss:.6,sprigs:.4},pine:{ivy:.3,moss:.3,boughs:.15},yew:{moss:.4,skirt:1},hawthorn:{moss:.5,sprigs:.6,boughs:.5},holly:{skirt:.7},hazel:{moss:.4,sprigs:.8},weepingBirch:{sprigs:.3},larch:{skirt:.5,boughs:.2}},Hf=(n,e)=>(t,i,r)=>kf(n(t,i,r),t,i,r,e),Ts={broad:{fn:_f,name:"gnarled broadleaf",grow:"normal"},fir:{fn:vf,name:"spruce",grow:"narrow",hue:.06},willow:{fn:bf,name:"willow",grow:"willow",hue:-.02,val:1.05},birch:{fn:nh,name:"silver birch",grow:"narrow",hue:-.02,val:1.08},flat:{fn:Sf,name:"field maple",grow:"normal",hue:.01},oak:{fn:Ef,name:"oak",grow:"wide",hue:.01,val:.92},beech:{fn:yf,name:"beech",grow:"normal",hue:-.03,sat:1.05,val:1.02,trunk:[.62,.08,.62]},ash:{fn:wf,name:"ash",grow:"narrow",hue:-.04,sat:.85,val:1.12},lime:{fn:Af,name:"lime",grow:"narrow",hue:-.05,sat:1.1,val:1.12},sycamore:{fn:Tf,name:"sycamore",grow:"wide",hue:.03,sat:1.1,val:.72},chestnut:{fn:Rf,name:"horse chestnut",grow:"wide",hue:-.01,val:1,dot:[244,238,226]},rowan:{fn:Cf,name:"rowan",grow:"small",hue:-.01,val:1.05,trunk:[.08,.12,.52],dot:[210,40,34]},alder:{fn:Lf,name:"alder",grow:"narrow",hue:.04,sat:.9,val:.72},pine:{fn:Df,name:"Scots pine",grow:"narrow",hue:.1,sat:.7,val:.78,upper:[.06,.6,.72]},yew:{fn:Pf,name:"yew",grow:"wide",hue:.07,sat:.8,val:.55,upper:[.02,.55,.45]},hawthorn:{fn:Of,name:"hawthorn",grow:"small",hue:.025,val:.8,dot:[176,30,40]},holly:{fn:If,name:"holly",grow:"narrow",hue:.06,sat:.85,val:.6,trunk:[.1,.08,.55],dot:[214,28,36]},hazel:{fn:Nf,name:"hazel coppice",grow:"small",hue:0,val:.94,trunk:[.07,.3,.45]},weepingBirch:{fn:Ff,name:"weeping birch",grow:"narrow",hue:-.04,val:1.12},larch:{fn:Uf,name:"larch",grow:"narrow",hue:-.07,sat:.8,val:1.15}};for(const[n,e]of Object.entries(Ts))e.bare=e.fn,e.fn=Hf(e.fn,zf[n]||{});const Gf=new Map(Object.entries(Ts).flatMap(([n,e])=>[[e.fn,{id:n,...e}],[e.bare,{id:n,...e}]])),ih=n=>Ts[n]||Ts.broad;function Hl(n,e,t){const i=Gf.get(t),r=i?.sat||1,a=i?.val||1,o=i?.hue||0,l=o<0?o*Math.max(0,Math.min(1,(e.leafHue-.17)/.09)):o,c=e.leafHue+(n()-.5)*e.leafVariety*.7+l,h={[s.TRUNK]:me(e.trunkHue,.45*e.sat,.34),[s.BARKD]:me(e.trunkHue+.03,.5*e.sat,.17),[s.BARKL]:me(e.trunkHue-.01,.38*e.sat,.5),[s.BARK2]:[222,220,212],[s.LEAF]:me(c,Math.min(1,.62*e.sat*r),Math.min(1,.58*a)),[s.LEAF2]:me(c-.05,Math.min(1,.55*e.sat*r),Math.min(1,.8*a)),[s.LEAF3]:me(c+.03,Math.min(1,.66*e.sat*r),.38*a),[s.WEB]:[225,225,232]};return i?.trunk&&(h[s.BARK2]=me(...i.trunk)),i?.upper&&(h[s.BELLY]=me(...i.upper)),i?.dot&&(h[s.FLOWER]=i.dot),h}function Wf(n){const{sp:e,crownY:t}=n,i=new qt(e.w,e.h),r=new qt(e.w,e.h);for(let a=0;a<e.h;a++)for(let o=0;o<e.w;o++){const l=a*e.w+o,c=e.m[l];if(!c)continue;(xa.has(c)&&a>=t||e.low?.[l]?r:i).put(o,a,c,e.n[l*3],e.n[l*3+1],e.n[l*3+2])}return{top:i,bot:r}}function Vf(n,e){const t=e.bushSize,i=Nl(n,["round","round","fern","grass","shrub"]),r=Math.round(40*t),a=Math.round(28*t),o=new qt(r,a);if(i==="round"||i==="shrub"){const c=i==="shrub"?5:3;for(let h=0;h<c;h++)_n(o,[r/2+ce(n,-9,9)*t,a-8*t+ce(n,-4,2)*t],ce(n,7,10)*t,ce(n,5,8)*t,e,n);if(i==="shrub"||n()<e.flowers)for(let h=0;h<18*e.flowers+3;h++){const u=r/2+ce(n,-12,12)*t,f=a-ce(n,5,17)*t;o.get(u,f)&&o.recolour(u,f,s.FLOWER)}}else if(i==="fern")for(let c=0;c<7;c++){const h=-Math.PI/2+(c/6-.5)*2.4;let u=r/2,f=a-1;for(let d=0;d<15*t;d++)u+=Math.cos(h)*.9,f+=Math.sin(h)*.9+d*.06,o.put(u,f,c%2?s.LEAF3:s.LEAF,Math.cos(h)*.4,-.2,.9),d%2&&(o.put(u,f-1,s.LEAF2,0,-.5,.85),o.put(u+Math.sign(Math.cos(h)),f+1,s.LEAF,0,.3,.9))}else for(let c=0;c<18*t;c++){const h=r/2+ce(n,-13,13)*t,u=ce(n,5,15)*t,f=ce(n,-3,3);for(let d=0;d<u;d++)o.put(h+f*d/u*(d/u),a-1-d,d>u*.65?s.LEAF2:d<u*.3?s.LEAF3:s.LEAF,f*.1,-.3,.9)}const l=Hl(n,e,null);return l[s.FLOWER]=me(n(),.55,.95),{sp:o,colours:l}}const Yf=new Set([s.LEAF,s.LEAF2,s.LEAF3,s.FLOWER,s.WEB,s.STRAW]),Ac=new Set([s.TRUNK,s.BARK2,s.BARKD,s.BARKL]);function Xf(n){const{w:e,h:t}=n,i=new Uint8Array(e*t);let r=0;for(let o=t-1;o>=0&&!r;o--)for(let l=0;l<e;l++)if(n.m[o*e+l]){r=o+1;break}const a=Math.max(1,r);for(let o=0;o<t;o++)for(let l=0;l<e;l++){const c=o*e+l,h=n.m[c];if(!h)continue;const u=1-o/a;if(Yf.has(h)){let f=0;for(let d=1;d<=2&&!f;d++)(!n.get(l+d,o)||!n.get(l-d,o)||!n.get(l,o-d)||!n.get(l,o+d))&&(f=d===1?1:.5);i[c]=Math.round(255*Math.min(1,.2+.6*Math.pow(Math.max(0,u),.8)+.2*f))}else if(Ac.has(h)){let f=0;for(const[d,p]of[[1,0],[-1,0],[0,1],[0,-1],[2,0],[-2,0]])Ac.has(n.get(l+d,o+p))&&f++;i[c]=f<=2&&u>.33?Math.round(255*.35*u):0}}return i}function Kf(n,e=Ol){const t=Xf(n),i=e(n.w,n.h),r=i.getContext("2d"),a=r.createImageData(n.w,n.h);for(let o=0;o<t.length;o++)n.m[o]&&a.data.set([t[o],t[o],t[o],255],o*4);return r.putImageData(a,0,0),i}const qf=["snag","cairn","standingstone","pillar","spire","stalagmite"],Ni=(n,e=0,t=0)=>Ft(Math.floor(n*1e3),Math.floor(e*1e3),4401+t);function Zf(n){let e=n.w,t=-1,i=n.h;for(let a=0;a<n.h;a++)for(let o=0;o<n.w;o++)n.m[a*n.w+o]&&(e=Math.min(e,o),t=Math.max(t,o),i=Math.min(i,a));const r=new qt(t-e+1,n.h-i);for(let a=0;a<r.h;a++)for(let o=0;o<r.w;o++){const l=(a+i)*n.w+o+e;n.m[l]&&r.put(o,a,n.m[l],n.n[l*3],n.n[l*3+1],n.n[l*3+2])}return r}const rh=n=>e=>[e[0]*Math.cos(n)+e[1]*Math.sin(n),-e[0]*Math.sin(n)+e[1]*Math.cos(n),e[2]];function $f(n,e,t){const i=rh(t.lean||0),r=3.3+e()*.6,a=l=>{const c=Math.atan2(l[2],l[0]),h=Math.sin(c*11+l[1]*1.3);return h>.55?s.BARKD:h<-.75?s.BARKL:void 0},o=[[0,0,0,.34],[.05,r*.45,.02,.27],[-.03,r*.85,0,.21],[.02,r,0,.19]];n.chain(o.map(([l,c,h,u])=>[...i([l,c,h]),u]),s.TRUNK,{group:1,rough:.03,paint:l=>t.hollow&&l[2]>.1&&Math.abs(l[0]-i([0,1.1,0])[0])<.14&&Math.abs(l[1]-1.1)<.32?s.NOSE:a(l)});for(let l=0;l<5;l++){const c=l/5*Math.PI*2+e();n.seg(i([Math.cos(c)*.12,r+.05,Math.sin(c)*.12]),i([Math.cos(c)*.16,r+.2+e()*.35,Math.sin(c)*.16]),.07,.015,s.BELLY,{group:2})}for(let l=0;l<5;l++){const c=l/5*Math.PI*2+.4;n.chain([[Math.cos(c)*.28,.3,Math.sin(c)*.28,.14],[Math.cos(c)*.7,.03,Math.sin(c)*.7,.05]],s.TRUNK,{group:1,rough:.02,paint:a})}n.seg(i([.15,r*.62,.05]),i([.75,r*.78,.15]),.09,.05,s.TRUNK,{group:3,paint:a});for(let l=0;l<7;l++){const c=.5+e()*(r-.9),h=(l%2?1.2:2.4)+e()*.8-.4,u=i([Math.cos(h)*.27,c,Math.sin(h)*.27]);n.ell(u,[.16,.035,.12],s.FLOWER,{dir:[Math.cos(h),0,Math.sin(h)],group:10+l,paint:f=>f[1]>u[1]+.02?s.BELLY:void 0})}for(let l=0;l<4;l++)n.ell([Math.cos(l*1.7)*.35,.06,Math.sin(l*1.7)*.35],[.2,.07,.16],s.MOSS,{group:4})}function Jf(n,e,t){const i=t.tall?10:8;let r=0;for(let a=0;a<i;a++){const o=a/(i-1),l=.55-.38*o,c=.16+e()*.06,h=[(e()-.5)*.06,r+c,(e()-.5)*.06];n.ell(h,[l*(1+e()*.15),c,l*(.9+e()*.2)],s.STONE,{group:1+a%3,rough:.03,dir:[1,(e()-.5)*.3,(e()-.5)*.3],paint:u=>Ni(u[0]*3,u[1]*5,a)<(o<.4?.3:.1)?s.MOSS:Ni(u[0]*7,u[2]*7,a)<.12?s.BELLY:void 0}),r+=c*1.75}n.box([0,r+.32,0],[.09,.36,.06],s.STONE,{round:.03,rough:.015,group:5,dir:[.2,1,0],up:[0,0,1]});for(let a=0;a<5;a++){const o=a*1.3;n.ell([Math.cos(o)*.7,.07,Math.sin(o)*.65],[.13,.09,.11],s.STONE,{group:6,rough:.02})}}function Qf(n,e,t){const i=t.lean||0,r=1.55+e()*.25,a=[Math.sin(i),Math.cos(i),0],o=.4+e()*.1,l=c=>c[1]>Math.cos(i)*r*1.8?s.MOSS:Ni(Math.floor(c[0]*4),Math.floor(c[1]*3),1)<.12?s.BELLY:c[1]<.5&&Ni(Math.floor(c[0]*5),Math.floor(c[2]*5),2)<.35?s.MOSS:void 0;n.ell([Math.sin(i)*r*.9,Math.cos(i)*r*.9,0],[o,r*.98,.22],s.STONE,{rough:.06,group:1,dir:[Math.cos(i),-Math.sin(i),0],up:a,paint:l}),n.ell([Math.sin(i)*.5-o*.4,.55,.02],[o*.75,.6,.2],s.STONE,{rough:.05,group:1,paint:l}),n.ell([Math.sin(i)*r*1.6+.08,Math.cos(i)*r*1.65,0],[o*.6,.32,.18],s.STONE,{rough:.05,group:1,dir:[1,.4,0],paint:l}),n.ell([.5,.1,.25],[.22,.12,.18],s.STONE,{group:2,rough:.02});for(let c=0;c<6;c++)n.seg([Math.cos(c)*.45,0,Math.sin(c)*.3+.1],[Math.cos(c)*.5,.18+e()*.12,Math.sin(c)*.3+.1],.03,.005,s.LEAF,{group:3})}function jf(n,e,t){const i=rh(t.lean||0),r=t.broken?2.2:3.2;if(n.box([0,.14,0],[.48,.14,.48],s.STONE,{round:.03,rough:.01,group:1,paint:a=>Ni(a[0]*9,a[2]*9,3)<.2?s.MOSS:void 0}),n.seg(i([0,.28,0]),i([0,r,0]),.32,.28,s.STONE,{group:2,rough:.012,paint:a=>{const o=Math.atan2(a[2],a[0]);return Math.sin(o*10)>.7?s.STONED:Ni(Math.floor(o*4),Math.floor(a[1]*3),4)<.18?s.BELLY:a[1]<.9&&Ni(Math.floor(o*6),Math.floor(a[1]*6),5)<.3?s.MOSS:void 0}}),t.broken){for(let a=0;a<4;a++){const o=a*1.6+.3;n.seg(i([Math.cos(o)*.15,r,Math.sin(o)*.15]),i([Math.cos(o)*.2,r+.2+e()*.2,Math.sin(o)*.2]),.12,.03,s.STONE,{group:3})}n.seg([1,.26,.3],[1.05,.26,-.35],.27,.27,s.STONE,{group:4,rough:.015})}else n.box(i([0,r+.08,0]),[.4,.08,.4],s.STONE,{round:.02,group:3,dir:[Math.cos(t.lean||0),-Math.sin(t.lean||0),0]}),n.box(i([0,r+.22,0]),[.46,.06,.46],s.STONE,{round:.02,group:3,dir:[Math.cos(t.lean||0),-Math.sin(t.lean||0),0],paint:()=>s.MOSS})}function e0(n,e,t){const i=(r,a,o,l,c)=>{const h=[];for(let f=0;f<=5;f++){const d=f/5;h.push([r+(e()-.5)*.2*d,d*o,a+(e()-.5)*.15*d,l*(1-.55*d)*(.85+e()*.3)])}const u=f=>{const d=(f[1]*1.3+Math.sin(f[0]*3+f[2]*2)*.15)%1;return d<.06?s.STONED:d>.94?s.MOSS:Math.sin(Math.atan2(f[2]-a,f[0]-r)*5+f[1])>.93?s.STONED:Ni(Math.floor(f[0]*5),Math.floor(f[1]*5),c)<.07?s.BELLY:void 0};n.chain(h,s.STONE,{group:c,rough:.07,paint:u});for(let f=0;f<4;f++){const d=.15+f*.2+e()*.1,p=e()*Math.PI*2,g=l*(1-.55*d);n.ell([r+Math.cos(p)*g*.7,d*o,a+Math.sin(p)*g*.7],[g*.55,g*.4,g*.5],s.STONE,{group:c,rough:.06,paint:u})}for(let f=0;f<6;f++){const d=f/6*Math.PI*2+e(),p=[r+Math.cos(d)*.12,o+.05,a+Math.sin(d)*.12];n.seg(p,[p[0]+Math.cos(d)*.45,p[1]+.35,p[2]+Math.sin(d)*.45],.06,.01,f%2?s.LEAF2:s.LEAF,{group:c+10})}n.ell([r,o-.05,a],[l*.5,.12,l*.45],s.MOSS,{group:c+10})};i(0,0,4.4+e()*.8,.85,1),t.twin&&i(1.2,-.4,2.8+e()*.5,.6,2);for(let r=0;r<5;r++){const a=r*1.25;n.ell([Math.cos(a)*1.1,.12,Math.sin(a)*.9],[.25,.16,.2],s.STONE,{group:5,rough:.03})}}function t0(n,e,t){const i=r=>{const a=Math.atan2(r[2],r[0]);return Math.sin(a*9+r[1]*.8)>.65?s.STONED:Ni(Math.floor(a*7),Math.floor(r[1]*8),6)<.06?s.BELLY:void 0};n.chain([[0,0,0,.62],[.03,1.1,0,.42],[-.02,2.2,.02,.22],[0,3+e()*.5,0,.04]],s.STONE,{group:1,rough:.025,paint:i});for(const[r,a,o]of[[.75,.3,1.1],[-.7,.2,.8],[.4,-.6,.6],[-.3,.65,.45]])n.chain([[r,0,a,.22],[r,o*.6,a,.12],[r,o,a,.02]],s.STONE,{group:2,rough:.02,paint:i});n.ell([0,.03,0],[.95,.04,.8],s.BODY2,{group:3})}const n0={snag:$f,cairn:Jf,standingstone:Qf,pillar:jf,spire:e0,stalagmite:t0};function i0(n,e,t,i,r,a=16){const o=new st({blend:.05});n0[n](o,r,e);const l=Zf(Ii(o,{scale:$u(i)}).sp),c=t.leaf??.28,h={[s.STONE]:me(.09,.07,.58),[s.STONED]:me(.62,.1,.34),[s.BELLY]:me(.14,.15,.78),[s.MOSS]:me(c,.5,.4),[s.LEAF]:me(c,.55,.45),[s.LEAF2]:me(c-.03,.5,.6),[s.TRUNK]:me(.07,.2,.36),[s.BARKD]:me(.06,.25,.18),[s.BARKL]:me(.08,.15,.52),[s.FLOWER]:[196,150,96],[s.BODY2]:[52,70,86],[s.NOSE]:[20,16,24],[s.LINE]:[24,22,30]};return n==="snag"&&(h[s.BELLY]=[214,196,160]),{sp:l,colours:h,metres:{height:+(l.h/a).toFixed(1),width:+(l.w/a).toFixed(1)}}}const r0=new Set(["tree","shrub","grass","reeds","fern","flowers","flowerbed","bramble","hedge"]),Ge=(n,e={})=>["tree",{type:n,...e}],Re=(n,e={})=>[n,e],Oa=[{id:"moor",name:"Moor",creature:"badger",by:"Ed",leaf:.24,floor:["moss",.26,.45,.42],text:{floor:"moss",wall:"puddles, a lake",small:"long grass",big:"moss mounds"},wall:[Re("water",{w:1.6})],small:[Re("grass",{h:1.4})],big:[Re("mound",{moss:!0}),Re("cairn",{sparse:.12}),Re("standingstone",{sparse:.12})]},{id:"fern-forest",name:"Fern forest",creature:"boar",by:"Ed",leaf:.3,floor:["needles",.08,.45,.32],text:{floor:"pine needles",small:"ferns",big:"pine trees"},small:[Re("fern")],big:[Ge("larch",{scale:1.1}),Ge("fir",{minor:!0})]},{id:"muddy-forest",name:"Muddy forest",creature:"snail",by:"Ed",leaf:.22,floor:["mud",.07,.5,.28],text:{floor:"mud and leaves",small:"short trunks with broken branches",big:"trees with many trunks and branches"},small:[Re("stump",{snag:!0})],big:[Ge("sycamore",{trunks:3,gnarl:.9}),Ge("alder",{minor:!0})]},{id:"stone-shrine",name:"Stone shrine",creature:"fox",by:"Ed",leaf:.28,floor:["stony",.25,.3,.45],text:{floor:"grassy, stony",wall:"mossy henges",small:"little stones",big:"big stones",set:"a shrine"},wall:[Re("henge")],small:[Re("stones")],big:[Re("boulder"),Re("pillar",{sparse:.1}),Re("pillar",{sparse:.08,broken:!0,lean:.14}),Re("cairn",{sparse:.08,tall:!0})],set:Re("shrine")},{id:"tangly-forest",name:"Tangly forest",creature:"ram",by:"Ed",leaf:.27,floor:["nettles",.28,.5,.3],text:{floor:"nettles and earth",small:"tangled branches",big:"fairly short tangly trees"},small:[Re("bramble",{bare:!0})],big:[Ge("hawthorn",{scale:.9,gnarl:1})]},{id:"wispy-forest",name:"Wispy forest",creature:"woodlouse",by:"Ed",leaf:.2,floor:["leaves",.09,.55,.45],text:{floor:"dry leaves",small:"tall thin wispy trees",big:"thick trees with several trunks"},small:[Ge("birch",{scale:.75})],big:[Ge("lime",{trunks:3,thick:1.4}),Ge("birch",{minor:!0})]},{id:"hazel-forest",name:"Hazel forest",creature:"hedgehog",by:"Ed",leaf:.26,floor:["grass",.24,.45,.45],text:{floor:"short grass",small:"brown lumps",big:"crooked trees with many branches"},small:[Re("mound",{brown:!0})],big:[Ge("hazel",{gnarl:1,scale:.95}),Ge("oak",{minor:!0,scale:.9})]},{id:"garden",name:"Garden",creature:"squirrel",by:"Ed",leaf:.3,floor:["lawn",.27,.5,.5],text:{floor:"uniform grass",wall:"ornate stone wall",small:"manicured flower beds",big:"willows",set:"a stone pavilion"},wall:[Re("wall")],small:[Re("flowerbed")],big:[Ge("willow")],set:Re("pavilion")},{id:"twiggy-forest",name:"Twiggy forest",creature:"wolf",by:"Ed",leaf:.29,floor:["plants",.3,.5,.38],text:{floor:"small leafy plants",small:"small trees with many thin trunks",big:"straight but slanted trees with many trunks"},small:[Ge("broad",{trunks:4,scale:.5,thin:!0})],big:[Ge("ash",{trunks:3,lean:.3,gnarl:.1})]},{id:"ancient",name:"Ancient",creature:"stag",by:"Ed",leaf:.31,floor:["roots",.1,.25,.35],text:{floor:"mossy roots over rocks",small:"sorrel",big:"giant gnarly slanted trees"},small:[Re("flowers",{hue:.98,leafy:!0})],big:[Ge("yew",{scale:1.4,gnarl:1,lean:.35}),Ge("oak",{minor:!0,scale:1.3,gnarl:1})]},{id:"norway",name:"Norway",creature:"stoat",by:"Ed",leaf:.36,floor:["slate",.6,.15,.35],text:{floor:"pine needles and slate",small:"rocks",big:"straight pines"},small:[Re("stones",{big:!0})],big:[Ge("fir",{scale:1.2}),Ge("birch",{minor:!0})]},{id:"alder-forest",name:"Alder forest",creature:"snake",by:"Ed",leaf:.23,floor:["tallgrass",.22,.45,.42],text:{floor:"tall and short grass",small:"tree stumps with tall grass around",big:"tall slanted trees with thin leaves at different heights"},small:[Re("stump",{grass:!0})],big:[Ge("alder",{lean:.3,scale:1.2,dark:!0})]},{id:"meadow",name:"Meadow",creature:"hare",by:"draft",leaf:.25,floor:["flowers",.25,.5,.5],text:{floor:"grass and wildflowers",small:"scattered hawthorn",big:"lone oaks"},small:[Re("shrub",{flower:[250,245,235]})],big:[Ge("chestnut",{scale:1.1}),Ge("hawthorn",{minor:!0,scale:.8})]},{id:"old-oaks",name:"Old oaks",creature:"owl",by:"draft",leaf:.22,floor:["leaves",.07,.5,.35],text:{floor:"leaf litter",small:"acorns, fallen branches",big:"ancient gnarled oaks with hollow trunks",set:"a great hollow oak"},small:[Re("cones",{acorn:!0}),Re("log",{branch:!0})],big:[Ge("oak",{gnarl:.9,hollow:!0}),Ge("holly",{minor:!0,scale:.8})],set:Ge("broad",{scale:1.6,gnarl:1,hollow:!0})},{id:"berry-thicket",name:"Berry thicket",creature:"bear",by:"draft",leaf:.32,floor:["needles",.08,.45,.3],text:{floor:"pine needles",wall:"bramble thickets",small:"berry bushes",big:"tall pines"},wall:[Re("bramble")],small:[Re("shrub",{flower:[200,30,60]})],big:[Ge("pine",{scale:1.2}),Ge("rowan",{minor:!0})]},{id:"wetland",name:"Wetland",creature:"toad",by:"draft",leaf:.2,floor:["mud",.15,.45,.3],text:{floor:"wet mud",wall:"puddles, reeds",small:"reeds and rushes",big:"willows"},wall:[Re("water"),Re("reeds",{tall:!0})],small:[Re("reeds")],big:[Ge("willow"),Ge("alder",{minor:!0,scale:.9})]},{id:"stream",name:"Stream",creature:"otter",by:"draft",leaf:.27,floor:["pebbles",.25,.3,.45],text:{floor:"pebbles and grass",wall:"a stream or pond",small:"alder saplings",big:"alders",set:"a fallen-log bridge"},wall:[Re("water",{w:2})],small:[Ge("broad",{scale:.45})],big:[Ge("alder",{scale:.95,gnarl:.3}),Ge("willow",{minor:!0,scale:.8})],set:Re("bridge")},{id:"rocky-slope",name:"Rocky slope",creature:"lynx",by:"draft",leaf:.34,floor:["scree",.2,.2,.42],text:{floor:"scree and moss",wall:"boulders",small:"rocks",big:"pines",set:"a rocky outcrop"},wall:[Re("boulder",{big:!0})],small:[Re("stones",{big:!0})],big:[Ge("rowan",{scale:1.1}),Ge("pine",{minor:!0})],set:Re("outcrop")},{id:"bog",name:"Bog",creature:"elk",by:"draft",leaf:.38,floor:["moss",.18,.55,.4],text:{floor:"sphagnum moss",wall:"bog pools",small:"cotton grass",big:"spruce"},wall:[Re("water",{bog:!0})],small:[Re("reeds",{cotton:!0})],big:[Ge("birch",{scale:.8,dark:!0}),Ge("pine",{minor:!0,scale:.7})]},{id:"deadwood",name:"Deadwood",creature:"raven",by:"draft",leaf:.15,floor:["earth",.07,.35,.3],text:{floor:"bare earth",small:"broken branches",big:"blasted dead trees"},small:[Re("log",{branch:!0})],big:[Ge("broad",{bare:!0,gnarl:1})]},{id:"cave-mouth",name:"Cave mouth",creature:"bat",by:"draft",leaf:.2,floor:["stone",.08,.15,.35],text:{floor:"stone and roots",wall:"rock walls",small:"stalagmite stubs",big:"dead trees",set:"a cave mouth"},wall:[Re("rockwall")],small:[Re("stalagmite")],big:[Ge("broad",{bare:!0}),Ge("yew",{minor:!0,scale:.8})],set:Re("cave")},{id:"grassland",name:"Grassland",creature:"mole",by:"draft",leaf:.25,floor:["grass",.26,.5,.48],text:{floor:"short turf",small:"molehills",big:"lone birches"},small:[Re("mound",{brown:!0,small:!0})],big:[Ge("flat",{scale:1.1}),Ge("weepingBirch",{minor:!0})]},{id:"beaver-pond",name:"Beaver pond",creature:"beaver",by:"draft",leaf:.17,floor:["leaves",.13,.6,.5],text:{floor:"birch leaves",wall:"a pond",small:"stumps",big:"birch and aspen",set:"a beaver dam"},wall:[Re("water",{w:2})],small:[Re("stump",{gnawed:!0})],big:[Ge("weepingBirch"),Ge("alder",{minor:!0,scale:.8})],set:Re("dam")},{id:"log-pile",name:"Log pile",creature:"beetle",by:"draft",leaf:.22,floor:["leaves",.06,.5,.3],text:{floor:"rotting leaves",small:"fungi",big:"rotting logs",set:"a fallen giant"},small:[Re("fungi")],big:[Re("log",{rot:!0}),Re("snag",{sparse:.12}),Re("snag",{sparse:.1,hollow:!0,lean:.12})],set:Re("log",{rot:!0,giant:!0})},{id:"heath",name:"Heath",creature:"moth",by:"draft",leaf:.27,floor:["heather",.85,.35,.4],text:{floor:"heather",small:"gorse",big:"wind-bent birches"},small:[Re("shrub",{flower:[250,205,40],spiky:!0})],big:[Ge("birch",{lean:.45,scale:.75}),Ge("hawthorn",{minor:!0,scale:.7,lean:.45})]},{id:"old-pinewood",name:"Old pinewood",creature:"marten",by:"draft",leaf:.35,floor:["needles",.07,.4,.3],text:{floor:"pine needles",small:"pine cones",big:"tall old pines with knotholes"},small:[Re("cones")],big:[Ge("pine",{scale:1.35}),Ge("rowan",{minor:!0,scale:.8})]},{id:"ravine",name:"Ravine",creature:"salamander",by:"draft",leaf:.3,floor:["stone",.3,.3,.32],text:{floor:"wet moss and rock",wall:"rock walls",small:"ferns",big:"mossy boulders",set:"a waterfall"},wall:[Re("rockwall",{moss:!0})],small:[Re("fern")],big:[Re("boulder",{moss:!0,big:!0}),Re("spire",{sparse:.1}),Re("spire",{sparse:.06,twin:!0}),Re("stalagmite",{sparse:.1})],set:Re("waterfall")},{id:"bluebell-glade",name:"Bluebell glade",creature:"glowworm",by:"draft",leaf:.26,floor:["bluebells",.27,.45,.4],text:{floor:"bluebells",small:"ferns",big:"beeches"},small:[Re("fern")],big:[Ge("beech",{gnarl:.2,scale:1.1}),Ge("holly",{minor:!0,scale:.7})]},{id:"holly-thicket",name:"Holly thicket",creature:"spider",by:"draft",leaf:.36,floor:["leaves",.08,.35,.28],text:{floor:"dead leaves",wall:"holly hedges",small:"cobwebs",big:"hollies",set:"a web-hung dead tree"},wall:[Re("hedge",{berries:!0})],small:[Re("web")],big:[Ge("holly",{scale:.9}),Ge("yew",{minor:!0,scale:.7})],set:Ge("broad",{bare:!0,webs:!0})},{id:"honeysuckle-tangle",name:"Honeysuckle tangle",creature:"dormouse",by:"draft",leaf:.25,floor:["clover",.27,.45,.45],text:{floor:"grass and clover",wall:"bramble",small:"honeysuckle",big:"hazel coppice"},wall:[Re("bramble")],small:[Re("shrub",{flower:[250,230,170]})],big:[Ge("hazel",{trunks:5,scale:.9,thin:!0}),Ge("rowan",{minor:!0,scale:.8})]}];for(const[n,[e,t]]of Object.entries(Qu)){const i=Oa.find(r=>r.id===n);i&&!i.set&&(i.set=Re(e,{three:!0}),i.text={...i.text,set:t})}const a0=Object.fromEntries(Oa.map(n=>[n.id,n])),s0=["ruins","rocks","freak","lake","modern"],Et=(n,e,t,i,r,a,o,l,c,h,u={})=>({pattern:n,...u,density:e,clump:t,glades:{count:i[0],size:i[1]||[0,0]},heightMix:r&&{sapling:r[0],mature:r[1],tall:r[2],giant:r[3]},undergrowth:a,lean:{dir:o[0],amount:o[1]},terrain:l,decor:{rate:c[0],...Object.fromEntries(s0.map((f,d)=>[f,c[1][d]]))},feel:h}),Ut=[0,0],o0={moor:Et("scatter",.2,.6,[2,[14,24]],null,.7,[30,.2],["pools","mounds","hollows"],[.5,[.3,.4,0,.3,0]],"Open rolling moss, low mounds and dark pools, long grass combed one way by the wind; you can see a long way."),"fern-forest":Et("groves",.65,.6,[2,[8,12]],[.2,.5,.25,.05],.9,Ut,["hollows","paths"],[.25,[.4,.3,.3,0,0]],"Pine groves standing waist-deep in ferns, with green sunken hollows between them."),"muddy-forest":Et("scatter",.7,.3,[1,[6,9]],[.25,.55,.17,.03],.4,Ut,["pools","paths"],[.3,[.3,.1,.2,.1,.3]],"Squelching mud between many-trunked trees, puddled ruts winding through, broken stumps everywhere."),"stone-shrine":Et("rings",.35,.8,[1,[10,14]],null,.3,Ut,["rocky","mounds"],[.5,[.6,.4,0,0,0]],"Big stones stand in rings round the shrine on stony grass; it feels deliberate and old."),"tangly-forest":Et("thicket",.9,.2,[1,[5,8]],[.35,.55,.1,0],.9,Ut,["hollows"],[.2,[.2,0,.6,0,.2]],"Short tangled trees packed close over nettles, low and claustrophobic, with one small clearing."),"wispy-forest":Et("stands",.55,.7,[2,[6,10]],[.15,.45,.3,.1],.5,Ut,["ridges"],[.3,[.4,.2,.3,0,.1]],"Stands of thick many-trunked trees, thin wispy saplings drifting between them over dry leaves."),"hazel-forest":Et("rings",.6,.6,[2,[6,9]],[.3,.55,.12,.03],.5,Ut,["mounds","paths"],[.3,[.4,.3,.3,0,0]],"Crooked hazels grown in loose fairy rings on short grass, lumpy little mounds in the middle of each."),garden:Et("rows",.45,0,[3,[6,10]],[.1,.7,.2,0],.6,Ut,["paths","pools"],[.4,[.7,0,0,.2,.1]],"A lost formal garden: willows in avenues along straight paths, lawns and flower beds, a pavilion at the heart.",{along:"paths"}),"twiggy-forest":Et("scatter",.75,.3,[1,[6,10]],[.25,.5,.2,.05],.6,[60,.5],["paths"],[.25,[.3,.2,.3,0,.2]],"Straight many-trunked trees all slanting the same way, like a wood frozen in a gale."),ancient:Et("lone",.4,.2,[1,[12,18]],[.05,.35,.4,.2],.4,[150,.25],["rocky","mounds","hollows"],[.45,[.5,.2,.3,0,0]],"Giant gnarled trees far apart, roots heaving over mossy rocks; every tree is a landmark."),norway:Et("stands",.8,.5,[1,[8,12]],[.15,.45,.35,.05],.2,Ut,["rocky","ridges"],[.3,[.2,.6,0,.2,0]],"Dense stands of straight pines on slate ridges, bare rock between; dark, vertical and cold."),"alder-forest":Et("scatter",.55,.4,[2,[6,10]],[.2,.4,.35,.05],.6,[120,.35],["stream","hollows"],[.3,[.3,.1,.2,.3,.1]],"Tall slanted alders at every height over long grass and stumps, a little stream wandering through."),meadow:Et("lone",.12,.1,[0],[.2,.5,.25,.05],.3,Ut,["mounds","paths"],[.35,[.3,.3,0,.2,.2]],"Wide-open wildflower grass with a lone oak here and there and scattered hawthorn; the sky does the work."),"old-oaks":Et("groves",.5,.5,[2,[10,16]],[.1,.35,.4,.15],.5,Ut,["mounds","hollows"],[.4,[.5,.1,.4,0,0]],"Groves of huge hollow oaks with broad clearings of leaf litter between; slow and grand."),"berry-thicket":Et("thicket",.85,.5,[2,[4,7]],[.2,.4,.35,.05],1,Ut,["paths"],[.15,[.3,0,.4,0,.3]],"Tall pines over solid berry bushes and brambles, only narrow animal paths and a couple of pockets of space."),wetland:Et("edgeOnly",.5,.5,[1,[16,24]],[.25,.55,.15,.05],.8,Ut,["pools","stream"],[.35,[.2,0,0,.6,.2]],"Open reedy water and mud in the middle, willows crowding the rim; wet and echoing."),stream:Et("rows",.5,.2,[1,[6,10]],[.3,.45,.2,.05],.5,Ut,["stream","pools"],[.3,[.3,.3,0,.3,.1]],"Alders lining both banks of a pebbly stream, saplings at the water's edge, open grass away from it.",{along:"stream"}),"rocky-slope":Et("scatter",.35,.6,[1,[8,12]],[.3,.5,.18,.02],.2,[90,.15],["rocky","ridges"],[.5,[.3,.7,0,0,0]],"Scree and boulders with pines clinging in clumps, everything leaning slightly uphill."),bog:Et("stands",.25,.85,[3,[10,20]],[.4,.5,.1,0],.6,Ut,["pools","mounds"],[.35,[.2,0,0,.5,.3]],"Sphagnum and bog pools, stunted spruce in tight dark stands, cotton grass pale between them."),deadwood:Et("scatter",.25,.2,[2,[8,14]],[.05,.3,.45,.2],.15,Ut,["ridges","hollows"],[.45,[.3,.1,.3,0,.3]],"Sparse tall blasted snags on bare ridges; bleak, quiet, with long sightlines."),"cave-mouth":Et("edgeOnly",.4,.5,[1,[10,14]],[.2,.5,.3,0],.2,Ut,["rocky","ridges"],[.4,[.3,.6,0,0,.1]],"Rock walls and dead trees ring an open stone floor that leads to the cave's dark mouth."),grassland:Et("lone",.1,.5,[0],[.3,.5,.2,0],.2,Ut,["mounds"],[.35,[.3,.2,0,.1,.4]],"Short turf to the horizon, molehills, birches alone or in twos and threes."),"beaver-pond":Et("edgeOnly",.55,.4,[1,[14,20]],[.4,.45,.15,0],.4,Ut,["pools","stream"],[.4,[.1,0,0,.7,.2]],"A pond in the middle, young birch and aspen round it, gnawed stumps where the big ones were felled."),"log-pile":Et("groves",.5,.7,[2,[6,10]],null,.7,Ut,["hollows","mounds"],[.3,[.3,0,.4,0,.3]],"Rotting logs heaped in piles, fungi everywhere, damp hollows between the heaps."),heath:Et("scatter",.2,.3,[1,[12,18]],[.5,.45,.05,0],.8,[30,.6],["ridges","paths"],[.4,[.4,.4,0,0,.2]],"Purple heather and gorse, small birches bent hard by the wind, all the same way."),"old-pinewood":Et("scatter",.5,.3,[2,[8,14]],[.1,.35,.4,.15],.15,Ut,["mounds","paths"],[.35,[.4,.3,.3,0,0]],"Cathedral-tall old pines on a clear floor of needles; you can see between the trunks a long way."),ravine:Et("edgeOnly",.55,.6,[1,[6,9]],null,.8,Ut,["stream","ridges","rocky"],[.4,[.3,.5,0,.2,0]],"A deep wet cleft: rock walls and mossy boulders either side, ferns, a stream down the middle."),"bluebell-glade":Et("groves",.45,.5,[3,[8,14]],[.1,.5,.35,.05],.3,Ut,["hollows"],[.35,[.4,0,.3,.3,0]],"Beech groves round open glades carpeted in bluebells; soft, bright and airy."),"holly-thicket":Et("thicket",.9,.3,[1,[6,9]],[.3,.6,.1,0],.7,Ut,["hollows"],[.25,[.3,0,.5,0,.2]],"Dark hollies packed close, cobwebs strung between, one clearing round the web-hung tree."),"honeysuckle-tangle":Et("stands",.6,.7,[2,[5,8]],[.45,.5,.05,0],.8,Ut,["paths","mounds"],[.3,[.3,0,.3,0,.4]],"Hazel coppice stools in clumps, honeysuckle and bramble between, clover paths winding through.")};for(const n of Oa)n.layout=o0[n.id];function l0(n,e,t=64,i=48){const[r,a,o,l]=n.floor,c=new qt(t,i),h=n.id.length*131;for(let x=0;x<i;x++)for(let m=0;m<t;m++){const M=(di(m/7,x/5,h)*(t-m)*(i-x)+di((m-t)/7,x/5,h)*m*(i-x)+di(m/7,(x-i)/5,h)*(t-m)*x+di((m-t)/7,(x-i)/5,h)*m*x)/(t*i),_=M<.38?s.BODY2:M>.64?s.BELLY:s.BODY;c.px(m,x,_,0,-.42,.91)}const u=Il(h),f=(x,m,M)=>c.px((x%t+t)%t,(m%i+i)%i,M,0,-.42,.91),d={moss:0,needles:70,mud:25,stony:30,nettles:60,leaves:80,grass:70,lawn:30,plants:60,roots:30,slate:40,tallgrass:90,flowers:70,pebbles:60,scree:70,earth:15,stone:40,heather:90,bluebells:90,clover:60}[r]??40;for(let x=0;x<d;x++){const m=Math.floor(u()*t),M=Math.floor(u()*i);if(r==="needles"){const _=u()<.5?1:-1;for(let A=0;A<3;A++)f(m+A*_,M+(A>>1),u()<.5?s.BODY2:s.ACCENT)}else if(["grass","lawn","tallgrass","plants","nettles","clover","flowers","bluebells","heather"].includes(r)){const _=r==="tallgrass"?4:r==="lawn"?1:2;for(let A=0;A<_;A++)f(m,M-A,A===_-1?s.LEAF2:s.LEAF);(r==="flowers"||r==="bluebells"||r==="heather"||r==="clover")&&u()<.5&&f(m+1,M-_,s.FLOWER)}else if(["stony","pebbles","scree","slate","stone","roots"].includes(r)){if(f(m,M,s.ACCENT),u()<.6&&f(m+1,M,s.ACCENT),u()<.4&&f(m,M+1,s.BODY2),r==="roots"&&u()<.5)for(let _=0;_<5;_++)f(m+_,M+(_>2?1:0),s.TRUNK)}else if(r==="leaves")f(m,M,s.FLOWER),f(m+1,M,s.FLOWER),u()<.5&&f(m,M+1,s.ACCENT);else if(r==="mud"||r==="earth")for(let _=0;_<3;_++)f(m+_,M,s.BODY2)}const p={flowers:me(.13,.6,.95),bluebells:[90,110,230],heather:[180,90,170],clover:[240,235,240],leaves:me(a+.02,.65,.6)}[r]||me(a,.3,.6),g={[s.BODY]:me(a,o*e.sat,l),[s.BODY2]:me(a+.02,o*e.sat*1.1,l*.78),[s.BELLY]:me(a-.02,o*e.sat*.9,Math.min(1,l*1.15)),[s.ACCENT]:r==="needles"?me(.07,.5,.5):me(.1,.08,.62),[s.FLOWER]:p,[s.LEAF]:me(n.leaf,.55*e.sat,.45),[s.LEAF2]:me(n.leaf-.03,.5*e.sat,.62),[s.TRUNK]:me(e.trunkHue,.4,.3)};return{sp:c,colours:g}}const hr=n=>({[s.ACCENT]:me(.1,.06,.6),[s.BODY2]:me(.62,.08,.4),[s.BELLY]:me(.1,.05,.78),[s.LEAF]:me(.27,.5,.45),[s.LEAF2]:me(.25,.45,.62),[s.NOSE]:[20,16,24]});function Kr(n,e,t,i,r,a,o){const l=[];for(let c=0;c<8;c++){const h=c/8*Math.PI*2,u=1+(a()-.5)*.3;l.push([e[0]+Math.cos(h)*t*u,e[1]+Math.sin(h)*i*u*(Math.sin(h)>0?.5:1)])}n.shape(l,s.ACCENT,{group:5,line:!0,round:r.round}),n.mark([mt(e,[-t,i*.1]),mt(e,[t,i*.1]),mt(e,[t,i]),mt(e,[-t,i])],s.BODY2,[s.ACCENT]),n.mark([mt(e,[-t*.6,-i*.8]),mt(e,[t*.1,-i*1.1]),mt(e,[t*.3,-i*.5]),mt(e,[-t*.3,-i*.3])],s.BELLY,[s.ACCENT]),o&&n.mark(Fs([mt(e,[-t*1.1,-i*.55]),mt(e,[0,-i*1.3]),mt(e,[t*1.1,-i*.5]),mt(e,[t*.6,-i*.2]),mt(e,[-t*.6,-i*.2])],0,3,3,i*.15,1),s.LEAF,[s.ACCENT,s.BELLY,s.BODY2])}function xs(n,e,t,i,r,a){if(qf.includes(n))return i0(n,e,t,i,r);const o={[s.LEAF]:me(t.leaf,.6*i.sat,.55),[s.LEAF2]:me(t.leaf-.05,.55*i.sat,.78),[s.LEAF3]:me(t.leaf+.03,.66*i.sat,.36)},l={[s.TRUNK]:me(i.trunkHue,.45*i.sat,.34),[s.BARKD]:me(i.trunkHue+.03,.5*i.sat,.17),[s.BARKL]:me(i.trunkHue-.01,.38*i.sat,.5),[s.BELLY]:me(i.trunkHue+.02,.3,.7)},c={[s.MAGIC]:[60,110,150],[s.MAGIC2]:[150,200,220],[s.BODY2]:[35,70,100]};if(n==="tree"){const x=ih(e.type).fn,m={...i,leafHue:t.leaf+(e.dark?.05:0),gnarl:e.gnarl??i.gnarl,treeBare:e.bare,treeTrunks:e.trunks,treeLean:e.lean,treeThick:e.thick,treeThin:e.thin,treeHollow:e.hollow,treeWebs:e.webs},M=x(r,m,i.treeSize*a*(e.scale||1)*ce(r,.9,1.1)),_=Hl(r,m,x);return e.dark&&(_[s.LEAF]=_[s.LEAF3],_[s.LEAF3]=me(t.leaf+.05,.7,.22)),_[s.NOSE]=[20,16,24],_[s.WEB]=[225,225,232],{sp:M.sp,colours:_}}if(n==="shrub"){const x=Vf(r,{...i,leafHue:t.leaf,bushSize:i.bushSize*a,flowers:1});for(let m=0;m<x.sp.m.length;m++)x.sp.m[m]&&Ft(m,1,3)<(e.spiky?.18:.1)&&x.sp.m[m]!==s.TRUNK&&(x.sp.m[m]=s.FLOWER);return x.colours[s.FLOWER]=e.flower,x}const h=Math.round(48*a*(e.w||1)),u=Math.round(32*a),f=new qt(h,u),d=h/2,p=u;let g={};if(n==="grass"||n==="reeds"||n==="fern"||n==="flowers"||n==="flowerbed"){const x=n==="flowerbed"?40:24,m=(n==="reeds"?e.tall?26:20:n==="fern"?14:10*(e.h||1))*a;n==="flowerbed"&&f.shape([[d-20*a,p-2],[d-18*a,p-6*a],[d+18*a,p-6*a],[d+20*a,p-2],[d+20*a,p],[d-20*a,p]],s.ACCENT,{group:2,line:!0});for(let M=0;M<x;M++){const _=d+ce(r,-16,16)*a,A=m*ce(r,.5,1),E=n==="fern"?ce(r,-6,6)*a:ce(r,-2,2)*a,R=p-1-(n==="flowerbed"?5*a:0);for(let T=0;T<A;T++){const P=T/A;f.px(_+E*P*P,R-T,P>.7?s.LEAF2:P<.3?s.LEAF3:s.LEAF,E*.05,-.3,.9),n==="fern"&&T%2&&f.px(_+E*P*P+(E>0?1:-1),R-T+1,s.LEAF2,0,-.3,.9)}if(n==="reeds"&&(e.cotton||r()<.5))for(let T=0;T<(e.cotton?2:3);T++)f.px(_+E,R-A-T,e.cotton?s.WEB:s.TRUNK,0,-.5,.85);(n==="flowers"||n==="flowerbed")&&r()<.7&&(f.px(_+E,R-A,s.FLOWER,0,-.5,.85),f.px(_+E+1,R-A,s.FLOWER,0,-.5,.85))}if(g={...o,[s.FLOWER]:n==="flowerbed"?Nl(r,[[230,80,120],[250,210,60],[150,110,230]]):me(e.hue??.95,.6,.85),[s.TRUNK]:me(.07,.5,.35),[s.WEB]:[240,240,235],[s.ACCENT]:me(.08,.1,.55)},n==="flowerbed"){for(let M=0;M<f.m.length;M++)f.m[M]===s.FLOWER&&Ft(M,2,7)<.5&&(f.m[M]=s.BELLY);g[s.BELLY]=[250,245,240]}}else if(n==="stones"){for(let x=0;x<(e.big?3:6);x++)Kr(f,[d+ce(r,-14,14)*a,p-(e.big?5:2.5)*a],(e.big?6:3)*a*ce(r,.7,1.2),(e.big?5:2.5)*a,i,r);g=hr()}else if(n==="boulder")Kr(f,[d,p-(e.big?11:8)*a],(e.big?18:13)*a,(e.big?12:9)*a,i,r,e.moss),g={...hr(),...o,[s.ACCENT]:me(.1,.06,.6)};else if(n==="henge")f.shape([[d-7*a,p],[d-8*a,p-18*a],[d-4*a,p-28*a],[d+5*a,p-27*a],[d+8*a,p-14*a],[d+7*a,p]],s.ACCENT,{group:5,line:!0,round:i.round}),f.mark([[d-9*a,p-30*a],[d+9*a,p-30*a],[d+9*a,p-22*a],[d-9*a,p-18*a]],s.LEAF,[s.ACCENT]),g={...hr(),...o};else if(n==="mound"){const x=(e.small?8:14)*a,m=(e.small?5:8)*a;f.shape(Fs([[d-x,p],[d-x*.6,p-m*.8],[d,p-m],[d+x*.6,p-m*.8],[d+x,p]],0,4,e.moss?3:1,(e.moss?1.5:.8)*a,1),e.moss?s.LEAF:s.TRUNK,{group:5,round:i.round}),f.mark([[d-x,p-m*.45],[d+x,p-m*.45],[d+x,p],[d-x,p]],e.moss?s.LEAF3:s.BARKD,[e.moss?s.LEAF:s.TRUNK]),g={...o,...l,[s.TRUNK]:me(.07,.45,e.brown?.35:.3)}}else if(n==="stump"){const x=6*a;if(f.limb([[d,p,x*2.2],[d,p-8*a,x*1.6]],s.TRUNK,{group:5,round:i.round,cap:0,capEnd:0}),f.shape([[d-x*.8,p-8*a],[d,p-10*a-(e.gnawed?4*a:0)],[d+x*.8,p-8*a],[d,p-7*a]],s.BELLY,{group:6,round:i.round}),e.snag&&f.limb([[d+x*.4,p-8*a,2.5*a],[d+x*1.6,p-15*a,1.5*a]],s.TRUNK,{group:7,round:i.round}),e.grass)for(let m=0;m<20;m++){const M=d+ce(r,-14,14)*a,_=ce(r,6,13)*a;for(let A=0;A<_;A++)f.px(M,p-1-A,A>_*.6?s.LEAF2:s.LEAF,0,-.3,.9)}g={...o,...l}}else if(n==="log"){const x=(e.giant?46:e.branch?18:30)*a,m=(e.giant?14:e.branch?3:8)*a;if(f.limb([[d-x/2,p-m/2,m],[d+x/2,p-m/2-(e.branch?2*a:0),m*.9]],s.TRUNK,{group:5,round:i.round,cap:.3,capEnd:.3}),e.branch||f.shape([[d+x/2-m*.1,p-m],[d+x/2+m*.2,p-m/2],[d+x/2-m*.1,p],[d+x/2-m*.3,p-m/2]],s.BELLY,{group:6,round:i.round}),e.rot)for(let M=0;M<(e.giant?6:3);M++){const _=d+ce(r,-x/2,x/3);f.shape([[_-3*a,p-m*.9],[_,p-m-3*a],[_+3*a,p-m*.9]],s.FLOWER,{group:7,line:!0,round:i.round})}e.branch&&f.limb([[d,p-m,m*.7],[d+5*a,p-m-6*a,m*.4]],s.TRUNK,{group:6,round:i.round}),g={...l,[s.FLOWER]:[230,190,120]}}else if(n==="fungi"){for(let x=0;x<5;x++){const m=d+ce(r,-12,12)*a,M=ce(r,3,7)*a,_=ce(r,3,5)*a;f.limb([[m,p,1.6*a],[m,p-M,1.4*a]],s.BELLY,{group:5}),f.shape([[m-_,p-M],[m,p-M-_*.8],[m+_,p-M]],x%2?s.FLOWER:s.MAGIC,{group:6+x%2,line:!0,round:i.round})}g={[s.BELLY]:[225,215,195],[s.FLOWER]:[190,80,50],[s.MAGIC]:[120,230,200]}}else if(n==="cones"){for(let x=0;x<6;x++){const m=d+ce(r,-14,14)*a,M=p-2*a;f.ellipse(m,M,(e.acorn?1.6:2)*a,(e.acorn?2:2.8)*a,s.TRUNK,{round:i.round}),e.acorn?f.ellipse(m,M-1.6*a,1.8*a,1*a,s.BARKD,{round:i.round}):f.px(m,M-1,s.BARKL)}g=l}else if(n==="water"){const x=22*a*(e.w||1),m=6*a;f.shape([[d-x,p-m],[d-x*.3,p-m*1.5],[d+x*.6,p-m*1.2],[d+x,p-m*.5],[d+x*.4,p],[d-x*.7,p-m*.2]],s.MAGIC,{group:5,round:.2});for(let M=0;M<6;M++){const _=d+ce(r,-x*.6,x*.6),A=p-m*ce(r,.4,1.1);for(let E=0;E<3*a;E++)f.recolour(_+E,A,s.MAGIC2)}g=e.bog?{[s.MAGIC]:[60,70,50],[s.MAGIC2]:[120,130,90]}:c;for(let M=0;M<f.m.length;M++)f.m[M]===s.MAGIC?f.m[M]=s.BODY:f.m[M]===s.MAGIC2&&(f.m[M]=s.BELLY);g={[s.BODY]:g[s.MAGIC],[s.BELLY]:g[s.MAGIC2]}}else if(n==="bramble"||n==="hedge"){const x=22*a,m=(n==="hedge"?18:12)*a;for(let M=0;M<(n==="hedge"?6:4);M++){const _=d+ce(r,-x*.8,x*.8),A=p-m*ce(r,.4,.7);f.ellipse(_,A,ce(r,6,9)*a,m*.45,n==="hedge"?s.LEAF3:s.LEAF,{round:i.round,density:e.bare?.5:.95,noise:.5,seed:M})}for(let M=0;M<8;M++){let A=d+ce(r,-x,x),E=p;for(let R=0;R<m*1.2;R++)A+=Math.sin(R*.3+M)*.8,E-=.8,f.px(A,E,s.TRUNK,0,-.3,.9)}if(n==="hedge"||e.berries||n==="bramble")for(let M=0;M<f.m.length;M++)f.m[M]&&f.m[M]!==s.TRUNK&&Ft(M,5,9)<.05&&(f.m[M]=s.FLOWER);g={...o,...l,[s.FLOWER]:n==="hedge"?[210,30,40]:[70,30,70]}}else if(n==="wall"){const x=22*a,m=12*a;f.shape([[d-x,p],[d-x,p-m],[d+x,p-m],[d+x,p]],s.ACCENT,{group:5,line:!0,depth:2}),f.shape([[d-x-1,p-m],[d-x-1,p-m-2*a],[d+x+1,p-m-2*a],[d+x+1,p-m]],s.BELLY,{group:6,line:!0,depth:2}),f.shape([[d+x-6*a,p-m-2*a],[d+x-6*a,p-m-7*a],[d+x,p-m-7*a],[d+x,p-m-2*a]],s.ACCENT,{group:7,line:!0,depth:2}),f.ellipse(d+x-3*a,p-m-9*a,3*a,2.5*a,s.BELLY,{round:i.round});for(let M=p-m+3*a;M<p;M+=4*a)for(let _=d-x;_<d+x;_++)f.recolour(_,M,s.BODY2);g=hr()}else if(n==="rockwall"){for(let x=0;x<5;x++)Kr(f,[d+(x-2)*9*a,p-ce(r,8,14)*a],8*a,10*a,i,r,e.moss);g={...hr(),...o}}else if(n==="stalagmite"){for(let x=0;x<4;x++){const m=d+ce(r,-14,14)*a,M=ce(r,5,11)*a;f.shape([[m-3*a,p],[m-1*a,p-M],[m+1*a,p-M],[m+3*a,p]],s.ACCENT,{group:5,line:!0,round:i.round})}g=hr()}else if(n==="web"){const x=[d,p-14*a],m=11*a;for(let M=0;M<8;M++){const _=M/8*Math.PI*2;for(let A=0;A<m;A++)f.px(x[0]+Math.cos(_)*A,x[1]+Math.sin(_)*A,s.WEB,0,0,1)}for(let M=3*a;M<m;M+=3*a)for(let _=0;_<Math.PI*2;_+=.05)f.px(x[0]+Math.cos(_)*M,x[1]+Math.sin(_)*M,s.WEB,0,0,1);g={[s.WEB]:[225,230,240]}}return{sp:f,colours:g}}function c0(n,e,t,i,r,a){if(e.three)return Gd(n,t,i);if(n==="tree"||n==="log")return xs(n,e,t,i,r,a);const o=Math.round(90*a),l=Math.round(70*a),c=new qt(o,l),h=o/2,u=l;let f={...hr(),[s.LEAF]:me(t.leaf,.55,.5),[s.LEAF2]:me(t.leaf-.04,.5,.7),[s.TRUNK]:me(i.trunkHue,.45,.34),[s.BARKD]:me(i.trunkHue+.03,.5,.17),[s.MAGIC]:me(i.magicHue,.6,1),[s.MAGIC2]:me(i.magicHue,.2,1)};if(n==="shrine")c.shape([[h-16*a,u],[h-14*a,u-6*a],[h+14*a,u-6*a],[h+16*a,u]],s.ACCENT,{group:5,line:!0,depth:2}),c.shape([[h-9*a,u-6*a],[h-9*a,u-26*a],[h+9*a,u-26*a],[h+9*a,u-6*a]],s.ACCENT,{group:6,line:!0,depth:2}),c.shape([[h-5*a,u-10*a],[h-5*a,u-20*a],[h,u-23*a],[h+5*a,u-20*a],[h+5*a,u-10*a]],s.NOSE,{group:7}),c.shape([[h-13*a,u-26*a],[h,u-34*a],[h+13*a,u-26*a]],s.BODY2,{group:8,line:!0,depth:2}),c.ellipse(h,u-13*a,2.5*a,2.5*a,s.MAGIC2,{round:.5}),c.mark([[h-14*a,u-36*a],[h+2*a,u-36*a],[h-4*a,u-24*a],[h-14*a,u-24*a]],s.LEAF,[s.BODY2,s.ACCENT]);else if(n==="pavilion"){c.shape([[h-26*a,u],[h-26*a,u-4*a],[h+26*a,u-4*a],[h+26*a,u]],s.ACCENT,{group:5,line:!0,depth:2});for(const d of[-20,-7,7,20])c.limb([[h+d*a,u-4*a,4*a],[h+d*a,u-34*a,4*a]],d===-7||d===7?s.BODY2:s.BELLY,{group:6+(d>0?1:0),line:!0,cap:0,capEnd:0});c.shape([[h-28*a,u-34*a],[h-28*a,u-38*a],[h+28*a,u-38*a],[h+28*a,u-34*a]],s.ACCENT,{group:8,line:!0,depth:2}),c.shape([[h-24*a,u-38*a],[h-16*a,u-54*a],[h,u-60*a],[h+16*a,u-54*a],[h+24*a,u-38*a]],s.BELLY,{group:9,line:!0})}else if(n==="bridge"){const d=xs("water",{w:1.8},t,i,r,a);for(let p=0;p<d.sp.m.length;p++){const g=p%d.sp.w,x=p/d.sp.w|0,m=Math.round(h-d.sp.w/2+g),M=u-d.sp.h+x;d.sp.m[p]&&c.inb(m,M)&&c.px(m,M,d.sp.m[p]===s.BODY?s.IRIS:s.PUPIL,0,-.42,.91)}c.limb([[h-34*a,u-6*a,9*a],[h+34*a,u-10*a,8*a]],s.TRUNK,{group:6,line:!0,cap:.3,capEnd:.3}),f[s.IRIS]=[60,110,150],f[s.PUPIL]=[150,200,220]}else if(n==="outcrop")for(const[d,p,g,x]of[[-18,14,16,13],[12,12,18,12],[-2,28,15,13],[16,34,9,9]])Kr(c,[h+d*a,u-p*a],g*a,x*a,i,r,!0);else if(n==="cave"){for(const[d,p,g,x]of[[-26,16,16,15],[26,16,16,15],[0,40,30,18],[-12,30,14,12],[12,30,14,12]])Kr(c,[h+d*a,u-p*a],g*a,x*a,i,r,p>30);c.shape([[h-15*a,u],[h-14*a,u-18*a],[h-4*a,u-28*a],[h+6*a,u-27*a],[h+14*a,u-16*a],[h+15*a,u]],s.NOSE,{group:9,line:!0})}else if(n==="dam"){const d=xs("water",{w:1.9},t,i,r,a);for(let p=0;p<d.sp.m.length;p++){const g=p%d.sp.w,x=p/d.sp.w|0,m=Math.round(h-d.sp.w/2+g),M=u-d.sp.h+x-10*a;d.sp.m[p]&&c.inb(m,M)&&c.px(m,M,d.sp.m[p]===s.BODY?s.IRIS:s.PUPIL,0,-.42,.91)}for(let p=0;p<26;p++){const g=h+ce(r,-32,32)*a,x=u-ce(r,2,14)*a,m=ce(r,-.5,.5),M=ce(r,8,16)*a;c.limb([[g-Math.cos(m)*M/2,x-Math.sin(m)*M/2,2.6*a],[g+Math.cos(m)*M/2,x+Math.sin(m)*M/2,2*a]],p%3?s.TRUNK:s.BARKD,{group:6+p%2,line:!0})}f[s.IRIS]=[60,110,150],f[s.PUPIL]=[150,200,220]}else if(n==="waterfall"){for(const[d,p,g,x]of[[-22,30,18,30],[22,30,18,30],[0,56,20,12]])Kr(c,[h+d*a,u-p*a],g*a,x*a,i,r,!0);for(let d=h-6*a;d<h+6*a;d++)for(let p=u-50*a;p<u-4*a;p++)c.px(d,p,Ft(d|0,p/3|0,4)<.3?s.PUPIL:s.IRIS,0,-.2,.98);c.shape([[h-18*a,u],[h-14*a,u-6*a],[h+14*a,u-6*a],[h+18*a,u]],s.IRIS,{group:10,round:.2}),f[s.IRIS]=[90,150,190],f[s.PUPIL]=[210,235,245]}return{sp:c,colours:f}}function u0(n,e,{K:t=2/(e.pixel||2),makeCanvas:i=Ol}={}){const r=a0[n];if(!r)throw new Error(`no area type "${n}"`);const a=Il(n.split("").reduce((u,f)=>u*31+f.charCodeAt(0),7)>>>0),o=(u,f,d)=>({sp:$r(u.sp,u.colours,e,"none",i),kind:f,text:d}),l=l0(r,e),c=u=>(u||[]).map(([f,d])=>{const p=xs(f,d,r,e,a,t),g=o(p,f,"");return r0.has(f)&&(g.sway=Kf(p.sp,i)),p.metres&&(g.metres=p.metres),d.sparse&&(g.sparse=d.sparse),g}),h={def:r,floor:{sp:$r(l.sp,l.colours,e,"none",i),kind:r.floor[0],text:r.text.floor},walls:c(r.wall),small:c(r.small),big:c(r.big),setPiece:null};if(h.walls.forEach(u=>u.text=r.text.wall),h.small.forEach(u=>u.text=r.text.small),h.big.forEach(u=>u.text=r.text.big),r.set){const u=c0(r.set[0],r.set[1],r,e,a,t);h.setPiece={...o(u,r.set[0],r.text.set),metres:u.metres,origin:u.origin}}return h}function h0(n,e){const t=new Map,i=new Map,r=(c,h,u)=>(c*2097152+(h+1048576))*2097152+(u+1048576),a=(c,h,u)=>{const f=r(c,h,u);let d=t.get(f);if(!d){const p=Math.pow(2,-c);d=[p*(h+Nt(h*7+c,u,n)),p*(u+Nt(h,u*13+c,n+1))],t.set(f,d)}return d},o=(c,h,u)=>{const f=Math.pow(2,-c),d=Math.floor(h/f),p=Math.floor(u/f);let g=d,x=p,m=1/0;for(let M=-2;M<=2;M++)for(let _=-2;_<=2;_++){const A=a(c,d+M,p+_),E=(A[0]-h)**2+(A[1]-u)**2;E<m&&(m=E,g=d+M,x=p+_)}return[g,x]},l=(c,h,u)=>{const f=r(c,h,u);let d=i.get(f);if(d)return d;if(c===0)d=[h,u];else{const p=a(c,h,u),g=o(c-1,p[0],p[1]);d=l(c-1,g[0],g[1])}return i.set(f,d),d};return{seed:n,depth:e,site:(c,h)=>a(0,c,h),partition(c,h){const u=o(e,c,h);return l(e,u[0],u[1])},centreness(c,h,u){const f=a(0,u[0],u[1]),d=Math.hypot(c-f[0],h-f[1]);let p=1/0;const g=Math.floor(c),x=Math.floor(h);for(let m=-2;m<=2;m++)for(let M=-2;M<=2;M++){const _=g+m,A=x+M;if(_===u[0]&&A===u[1])continue;const E=a(0,_,A);p=Math.min(p,Math.hypot(c-E[0],h-E[1]))}return Math.min(1,2*d/(d+p))},openness(c,h){let u=1/0,f=1/0;const d=Math.floor(c),p=Math.floor(h);for(let g=-2;g<=2;g++)for(let x=-2;x<=2;x++){const m=a(0,d+g,p+x),M=Math.hypot(c-m[0],h-m[1]);M<u?(f=u,u=M):M<f&&(f=M)}return Math.min(1,2*u/(u+f))}}}const d0=md.types,Mi=Oa.map(n=>({id:n.id,name:n.name,creature:n.creature,text:n.text,setPiece:n.set?n.text.set??"a set piece":"",hasWalls:!!n.wall?.length,floor:[n.floor[1],n.floor[2],n.floor[3]],treeDensity:d0[n.id]?.treeDensity??1})),Vr=(n,e)=>n+","+e;function f0(n){if(n==null||n.trim()==="")return null;const e=n.trim();if(/^\d{1,9}$/.test(e))return Number(e);let t=2166136261;for(let i=0;i<e.length;i++)t=Math.imul(t^e.charCodeAt(i),16777619);return(t>>>0)%1e9}function p0(n,e,t,i){const r=new Map,a=(c,h)=>{if(c[0]===h[0]&&c[1]===h[1])return;const u=Vr(c[0],c[1]),f=Vr(h[0],h[1]);r.has(u)||r.set(u,new Set),r.has(f)||r.set(f,new Set),r.get(u).add(f),r.get(f).add(u)},o=(t-e)*i;let l=[];for(let c=0;c<=o;c++){const h=[];for(let u=0;u<=o;u++){const f=n.partition(e+u/i,e+c/i);h.push(f),u>0&&a(f,h[u-1]),c>0&&a(f,l[u])}l=h}return r}function g0(n,e){const t=e.mapAreas,i=2,r=e.areaSize*e.areaScale,a=Mi.length,o=3,l=Math.max(0,Math.min(1,e.areaSizeVariance))*o*.3,c=(N,O)=>{const U=N/r,W=O/r;return[U+l*(gc(U/o,W/o,n+91)-.5)*2,W+l*(gc(U/o,W/o,n+92)-.5)*2]},h=(N,O)=>{let U=N*r,W=O*r;for(let F=0;F<30;F++){const[Q,X]=c(U,W);U+=(N-Q)*r,W+=(O-X)*r}return[U,W]},u=h0(n,e.borderLayers),f=-i,d=t+i,p=p0(u,f,d,6),g=new Map,x=Aa(n*5+1);for(let N=f;N<d;N++)for(let O=f;O<d;O++){const U=new Set;for(let Q=-2;Q<=2;Q++)for(let X=-2;X<=2;X++){const te=g.get(Vr(O+X,N+Q));te!==void 0&&U.add(te)}for(const Q of p.get(Vr(O,N))??[]){const X=g.get(Q);X!==void 0&&U.add(X)}const W=[...Array(a).keys()].filter(Q=>!U.has(Q)),F=W.length?W:[...Array(a).keys()];g.set(Vr(O,N),F[Math.floor(x()*F.length)])}const m=(N,O)=>g.get(Vr(N,O))??Math.floor(Nt(N,O,n+17)*a),M=Math.floor(t/2),_=(N,O)=>{const U=u.site(N,O),W=u.partition(U[0],U[1]);return W[0]===N&&W[1]===O};let A=[M,M];for(const[N,O]of[[0,0],[1,0],[0,1],[-1,0],[0,-1],[1,1],[-1,1],[1,-1],[-1,-1]])if(_(M+N,M+O)){A=[M+N,M+O];break}const E=(N,O)=>{const U=u.site(N,O),W=h(U[0],U[1]);return{x:W[0],z:W[1]}},R=E(A[0],A[1]),T=(N,O)=>{const[U,W]=c(N,O),F=u.partition(U,W);return{cell:F,type:m(F[0],F[1]),openness:u.openness(U,W)}},P=4.5,S=P*2.2,y=(N,O)=>{if(Math.hypot(N-R.x,O-R.z)<S)return 0;const[U,W]=c(N,O);return ea((u.openness(U,W)-e.clearingSize)/Math.max(.01,e.clearingFalloff))*e.treeDensity},C=(N,O)=>{const U=Mi[m(N,O)];return U.setPiece&&Nt(N,O,n+61)<e.setPieceChance?U.setPiece:null},I=(N,O)=>Math.min(1,Math.hypot(N-A[0],O-A[1])/(t/2)),L=r*.5;return{seed:n,tuning:e,n:t,margin:i,areaSize:r,partition:u,centreCell:A,dancefloor:{x:R.x,z:R.z,radius:P},start:{x:R.x,z:R.z+2},bounds:{minX:L,maxX:t*r-L,minZ:L,maxZ:t*r-L},extent:{minX:f*r,maxX:d*r,minZ:f*r,maxZ:d*r},typeOf:m,areaAt:T,siteOf:E,treeWeight:y,neighbours:p,setPieceOf:C,remoteness:I}}function m0(n,e,t=.5){const i=n.tuning,r=Mr(e,0,1),a=Math.round(li(i.creaturesNear,i.creaturesFar,Math.pow(r,i.creatureCurve))+(t-.5)*2),o=Math.min(Math.max(0,a),Math.round(i.legendsFar*ea((r-i.legendsFrom)/Math.max(.01,1-i.legendsFrom))+(t-.5)*.8)),l=Math.round(Math.max(0,a-o)*i.youngShareFar*r);return{babies:Math.max(0,a-o-l),young:l,legends:o}}const M0=(n,e,t=0)=>(n.tuning.clearingSize+n.tuning.clearingFalloff*.3)*n.areaSize*.5*(e===2?.55:.8)*(1+t);function x0(n){const e=[],t=n.tuning;let i=0;const[r,a]=n.centreCell;for(let o=0;o<n.n;o++)for(let l=0;l<n.n;l++){if(l===r&&o===a)continue;const c=Aa(n.seed*7919+l*131+o*977+3),h=Mi[n.typeOf(l,o)],u=n.siteOf(l,o),f=n.remoteness(l,o),d=m0(n,f,Nt(l,o,n.seed+43)),p=x=>{const m=M0(n,x,f),M=c()*Math.PI*2,_=Math.sqrt(c())*m,A=u.x+Math.cos(M)*_,E=u.z+Math.sin(M)*_;return{id:i++,species:h.creature,cell:[l,o],level:x,homeX:u.x,homeZ:u.z,range:m,x:A,z:E,tx:A,tz:E,rest:c()*3,speed:(x===2?t.legendSpeed:t.creatureSpeed)*(.7+c()*.6),facing:c()<.5?1:-1,moving:!1,walk:c(),rand:Aa(n.seed*31+i*7+11)}};for(let x=0;x<d.babies;x++)e.push(p(0));for(let x=0;x<d.young;x++)e.push(p(1));const g=l===r+1&&o===a?Math.max(1,d.legends):d.legends;for(let x=0;x<g;x++)e.push(p(2))}return e}function _0(n,e){if(n.rest>0){n.rest-=e,n.moving=!1;return}const t=n.tx-n.x,i=n.tz-n.z,r=Math.hypot(t,i);if(r<.05){const o=n.rand()*Math.PI*2,l=Math.sqrt(n.rand())*n.range;n.tx=n.homeX+Math.cos(o)*l,n.tz=n.homeZ+Math.sin(o)*l,n.rest=.8+n.rand()*3.5,n.moving=!1;return}const a=Math.min(r,n.speed*e);n.x+=t/r*a,n.z+=i/r*a,Math.abs(t)>.02&&(n.facing=t>0?1:-1),n.moving=!0,n.walk+=e*(n.level===2?1.5:4)}function v0(n,e,t,i,r){for(const a of n)Math.abs(a.homeX-e)<i&&Math.abs(a.homeZ-t)<i&&_0(a,r)}const ah=6,b0=4,xn=32;function S0(n){const e=n.tuning.camera.treetop.angleIn*Math.PI/180;return n.tuning.crownHeight/Math.sin(e)}function E0(n,e,t){const{treeSpacingX:i,treeSpacingZ:r}=n.tuning,a=n.seed,o=[],l=S0(n),c=n.tuning.crownHalfWidth,h=Math.ceil(t*xn/r),u=Math.ceil((t+1)*xn/r);for(let f=h;f<u;f++){const d=f&1?.5:0,p=Math.ceil(e*xn/i-d),g=Math.ceil((e+1)*xn/i-d);for(let x=p;x<g;x++){const m=(x+d+(Nt(x,f,a+101)-.5)*.7)*i,M=(f+(Nt(x,f,a+102)-.5)*.7)*r,_=n.areaAt(m,M);Nt(x,f,a+103)>=n.treeWeight(m,M)*Mi[_.type].treeDensity||n.treeWeight(m,M-l)===0||n.treeWeight(m-c,M-l)===0||n.treeWeight(m+c,M-l)===0||o.push({x:m,z:M,type:_.type,variant:Math.floor(Nt(x,f,a+104)*ah),flip:Nt(x,f,a+105)<.5})}}return o}function y0(n,e,t){const i=n.tuning.bushSpacing,r=n.seed,a=[],o=Math.ceil(t*xn/i),l=Math.ceil((t+1)*xn/i),c=Math.ceil(e*xn/i),h=Math.ceil((e+1)*xn/i);for(let u=o;u<l;u++)for(let f=c;f<h;f++){const d=(f+(Nt(f,u,r+201)-.5)*.9)*i,p=(u+(Nt(f,u,r+202)-.5)*.9)*i;Nt(f,u,r+203)>(.12+Math.min(1,n.treeWeight(d,p))*.3)*n.tuning.bushDensity||a.push({x:d,z:p,type:n.areaAt(d,p).type,variant:Math.floor(Nt(f,u,r+204)*b0),flip:Nt(f,u,r+205)<.5})}return a}function w0(n,e,t){const i=n.tuning.wallSpacing,r=n.seed,a=[],o=Math.ceil(t*xn/i),l=Math.ceil((t+1)*xn/i),c=Math.ceil(e*xn/i),h=Math.ceil((e+1)*xn/i);for(let u=o;u<l;u++)for(let f=c;f<h;f++){if(Nt(f,u,r+303)>n.tuning.wallDensity)continue;const d=(f+(Nt(f,u,r+301)-.5)*.6)*i,p=(u+(Nt(f,u,r+302)-.5)*.6)*i,g=n.areaAt(d,p);g.openness<.82||!Mi[g.type].hasWalls||a.push({x:d,z:p,type:g.type,variant:Math.floor(Nt(f,u,r+304)*4),flip:Nt(f,u,r+305)<.5})}return a}class A0{constructor(e){this.map=e}map;trees=new Map;bushes=new Map;walls=new Map;chunks(e,t,i){const r=[];for(let a=Math.floor((t-i)/xn);a<=Math.floor((t+i)/xn);a++)for(let o=Math.floor((e-i)/xn);o<=Math.floor((e+i)/xn);o++)r.push([o,a]);return r}gather(e,t,i,r,a){e.size>600&&e.clear();const o=[];for(const[l,c]of this.chunks(i,r,a)){const h=l+","+c;let u=e.get(h);u||(u=t(l,c),e.set(h,u));for(const f of u)Math.abs(f.x-i)<=a&&Math.abs(f.z-r)<=a&&o.push(f)}return o}treesNear(e,t,i){return this.gather(this.trees,(r,a)=>E0(this.map,r,a),e,t,i)}bushesNear(e,t,i){return this.gather(this.bushes,(r,a)=>y0(this.map,r,a),e,t,i)}wallsNear(e,t,i){return this.gather(this.walls,(r,a)=>w0(this.map,r,a),e,t,i)}setPiecesNear(e,t,i){const r=this.map,a=r.areaSize,o=[];for(let l=Math.floor((t-i)/a)-1;l<=Math.floor((t+i)/a)+1;l++)for(let c=Math.floor((e-i)/a)-1;c<=Math.floor((e+i)/a)+1;c++){if(c===r.centreCell[0]&&l===r.centreCell[1]||!r.setPieceOf(c,l))continue;const h=r.siteOf(c,l);Math.abs(h.x-e)<=i&&Math.abs(h.z-4-t)<=i&&o.push({x:h.x,z:h.z-4,type:r.typeOf(c,l),variant:0,flip:Nt(c,l,r.seed+71)<.5})}return o}}function T0(n,e){return{x:n,z:e,vx:0,vz:0,lift:0,mode:"ground",facing:1}}const Gl=(n,e)=>li(e.groundHeight,e.treetopHeight,ea(n.lift)),Zs=n=>ea(n.lift);function R0(n,e,t,i,r){let{mode:a,lift:o}=n;e.toggleMode&&(a=a==="ground"||a==="descending"?"rising":"descending"),a==="rising"?(o+=t/Math.max(.001,i.riseTime),o>=1&&(o=1,a="treetop")):a==="descending"&&(o-=t/Math.max(.001,i.descendTime),o<=0&&(o=0,a="ground"));let l=e.moveX,c=e.moveZ;const h=Math.hypot(l,c);h>1&&(l/=h,c/=h);const u=li(i.groundSpeed,i.treetopSpeed,ea(o)),f=1-Math.exp(-i.acceleration*t);let d=n.vx+(l*u-n.vx)*f,p=n.vz+(c*u-n.vz)*f,g=n.x+d*t,x=n.z+p*t;(g<r.minX||g>r.maxX)&&(g=Mr(g,r.minX,r.maxX),d=0),(x<r.minZ||x>r.maxZ)&&(x=Mr(x,r.minZ,r.maxZ),p=0);const m=d>.3?1:d<-.3?-1:n.facing;return{x:g,z:x,vx:d,vz:p,lift:o,mode:a,facing:m}}function C0(n,e){const t=g0(n,e),i=T0(t.start.x,t.start.z);return{seed:n,tuning:e,map:t,forest:new A0(t),creatures:x0(t),clock:fd(),witch:i,camera:cd(e,i.x,Gl(i,e),i.z)}}function L0(n,e,t){const i=pd(n.clock,t);i!==0&&(n.witch=R0(n.witch,e,i,n.tuning,n.map.bounds),n.camera=ud(n.camera,e.zoom,{x:n.witch.x,y:Gl(n.witch,n.tuning),z:n.witch.z},{x:n.witch.vx,z:n.witch.vz},n.witch.lift,i,n.tuning),v0(n.creatures,n.witch.x,n.witch.z,n.tuning.creatureSimRadius,i))}const D0=n=>hd(n.camera,n.camera.lift,n.tuning);function sh(n){const e=n.map.areaAt(n.witch.x,n.witch.z),t=n.map.setPieceOf(e.cell[0],e.cell[1]);return Mi[e.type].name+(t?` (set piece: ${t})`:"")}const P0="Witch tuning. Edit the numbers, push, and the playable link rebuilds. Distances are metres, times seconds, angles degrees. Keys starting with _ are notes.",O0="The forest: mapAreas x mapAreas areas cut by the fractal partition. An area is areaSize x areaScale metres across on average (areaScale 1.4 doubles the ground of the first 28 m areas; push it for bigger). areaSizeVariance (0-1) makes areas vary in size, some small, some large. borderLayers sets how wiggly borders are.",I0=20,N0=28,F0=1.4,U0=.7,B0=4,k0="treeDensity (0-1): the chance of a tree on each spot outside the clearings; clearingSize (0-1): how far out from an area's centre the ground stays fully open; clearingFalloff (0-1): over how much of the way to the border trees thicken, smoothly, to full density; trees sit on a staggered grid treeSpacingX by treeSpacingZ metres, so no two crowns pile up. A tree is left out where its crown (crownHalfWidth either side, crownHeight up) would hang over a clearing seen from the treetops.",z0=.9,H0=.1,G0=.5,W0=1,V0=5,Y0=3,X0=4.5,K0=5,q0=3.4,Z0=4,$0=.6,J0="Speeds per mode, and how long rising and descending take.",Q0=14,j0=32,ep=10,tp=.7,np=.55,ip=1.4,rp=11,ap="Near-isometric on the ground, after Transistor; lower over the treetops, looking toward the horizon to feel the speed. The camera follows the witch on a soft spring (follow: its stiffness; higher keeps her closer to the middle) and looks a little ahead of her: lookAhead seconds of flight, at most lookAheadMax metres, eased in at lookAheadEase. zoomEase and liftEase: how softly zoom and rising change the angle and distance. a narrow field of view (fov, degrees) seen from far off, so there is little perspective. Each mode has its own angle (degrees below horizontal) and distance from the witch, at zoomed-in and zoomed-out. Zoom moves between them in zoomSteps steps.",sp={fov:20,ground:{angleIn:38,angleOut:46,distanceIn:42,distanceOut:84},treetop:{angleIn:32,angleOut:36,distanceIn:70,distanceOut:120},lookAhead:.1,lookAheadMax:3,lookAheadEase:1.5,zoomEase:5,liftEase:8,zoomSteps:4,startZoom:1,follow:8},op="Everything the camera can see is drawn, plus viewMargin metres round the view, so nothing appears or vanishes on screen. haze: the twilight haze fades the forest from near to far metres from the witch; nothing is drawn beyond far. pixelSize: screen pixels per art pixel. glowReach: metres the witch's light reaches. spriteTilt: 1 = sprites face the camera fully, 0 = stand upright.",lp=3,cp=8,up=1,hp=1,dp=16,fp=12,pp={near:90,far:220},gp="bloom: a gentle glow round bright things (strength 0 or on false turns it off; threshold: how bright a pixel must be to glow). tiltShift: blurs the top and bottom of the screen so the forest looks like a miniature. strength: the blur at the screen's edges, in pixels; band: the height of the sharp band (0-1 of the screen); centre: where it sits (0 top, 0.5 middle, 1 bottom); where: 'before' blurs at the low resolution, before the pixels are scaled up, 'after' blurs the scaled-up image. Add ?tilt=before, ?tilt=after or ?tilt=off to the link to compare.",mp="shadows: a flat shadow under every tree (cast away from the moon), bush and creature. canopyShadow: a dappled shadow from the canopy overhead (height in metres), thinner in clearings, drifting with the wind. mist: a low drifting mist (height in metres above the ground). Each has on and strength.",Mp={on:!0,strength:.7},xp={on:!0,strength:.45,height:8,cover:.55,wind:.6},_p={on:!0,strength:.12,height:3,wind:.8},vp={on:!0,strength:.7,threshold:.55},bp={on:!0,where:"before",strength:3,band:.4,centre:.55},Sp="Creatures grow more numerous and older with an area's distance from home (0 at the dancefloor, 1 at the map's edge): creaturesNear in the areas round home, creaturesFar at the edge (creatureCurve shapes the rise), youngShareFar of them young at the edge, and legendsFar legends from legendsFrom outward. Only creatures within creatureSimRadius metres of the witch move.",Ep=2,yp=20,wp=1.3,Ap=.5,Tp=2,Rp=.55,Cp=110,Lp=.6,Dp="setPieceChance: the share of areas, among the types that have a set piece, that show theirs. Wall objects (an area type's edges: puddles, henges, hedges) stand where areas meet, one per wallSpacing metres with chance wallDensity; they do not block movement.",Pp=.25,Op=.35,Ip={_readme:P0,_map:O0,mapAreas:I0,areaSize:N0,areaScale:F0,areaSizeVariance:U0,borderLayers:B0,_trees:k0,treeDensity:z0,clearingSize:H0,clearingFalloff:G0,bushDensity:W0,treeSpacingX:V0,treeSpacingZ:Y0,crownHalfWidth:X0,crownHeight:K0,bushSpacing:q0,wallSpacing:Z0,wallDensity:$0,_witch:J0,groundSpeed:Q0,treetopSpeed:j0,acceleration:ep,riseTime:tp,descendTime:np,groundHeight:ip,treetopHeight:rp,_camera:ap,camera:sp,_look:op,pixelSize:lp,glowReach:cp,glowHeight:up,spriteTilt:hp,artPixelsPerMetre:dp,viewMargin:fp,haze:pp,_post:gp,_shadows:mp,shadows:Mp,canopyShadow:xp,mist:_p,bloom:vp,tiltShift:bp,_creatures:Sp,creaturesNear:Ep,creaturesFar:yp,creatureCurve:wp,youngShareFar:Ap,legendsFar:Tp,legendsFrom:Rp,creatureSimRadius:Cp,creatureSpeed:Lp,_setPieces:Dp,setPieceChance:Pp,legendSpeed:Op},Ar=Ip;class Np{keys=new Set;pressed=new Set;padPrev=[];touch={x:0,y:0,toggle:!1,zoom:0,debug:!1};onAny=null;constructor(e=window){e.addEventListener("keydown",t=>{if(t.repeat){this.isGameKey(t.code)&&t.preventDefault();return}this.keys.add(t.code),this.isGameKey(t.code)&&t.preventDefault(),this.onAny?.()||this.pressed.add(t.code)}),e.addEventListener("keyup",t=>this.keys.delete(t.code)),e.addEventListener("blur",()=>this.keys.clear())}isGameKey(e){return/^(Arrow|Space$|Key[WASDQE]$|Minus$|Equal$|NumpadAdd$|NumpadSubtract$|Backquote$)/.test(e)}clearPresses(){this.pressed.clear();const e=this.touch;e.toggle=!1,e.zoom=0,e.debug=!1}read(){const e=f=>this.keys.has(f)?1:0,t=f=>this.pressed.has(f);let i=e("KeyD")+e("ArrowRight")-e("KeyA")-e("ArrowLeft"),r=e("KeyS")+e("ArrowDown")-e("KeyW")-e("ArrowUp"),a=t("Space"),o=(t("KeyQ")||t("Minus")||t("NumpadSubtract")?1:0)-(t("KeyE")||t("Equal")||t("NumpadAdd")?1:0),l=t("Backquote");this.pressed.clear();const c=typeof navigator<"u"&&navigator.getGamepads?navigator.getGamepads():[];for(const f of c){if(!f)continue;const d=E=>!!f.buttons[E]?.pressed,g=f.buttons.some((E,R)=>E.pressed&&!this.padPrev[R])&&!!this.onAny?.(),x=E=>!g&&d(E)&&!this.padPrev[E];let m=f.axes[0]??0,M=f.axes[1]??0;const _=Math.hypot(m,M),A=.18;if(_<A)m=0,M=0;else{const E=(Math.min(1,_)-A)/(1-A)/_;m*=E,M*=E}m+=(d(15)?1:0)-(d(14)?1:0),M+=(d(13)?1:0)-(d(12)?1:0),i+=m,r+=M,x(0)&&(a=!0),(x(4)||x(6))&&(o+=1),(x(5)||x(7))&&(o-=1),x(8)&&(l=!0),this.padPrev=f.buttons.map(E=>E.pressed);break}const h=this.touch;i+=h.x,r+=h.y,h.toggle&&(a=!0),o+=h.zoom,h.debug&&(l=!0),h.toggle=!1,h.zoom=0,h.debug=!1;const u=Math.hypot(i,r);return u>1&&(i/=u,r/=u),{moveX:i,moveZ:r,toggleMode:a,zoom:Math.sign(o),debug:l}}}const Wl="186",Fp=0,Tc=1,Up=2,_s=1,Bp=2,_a=3,_r=0,Cn=1,Li=2,Fi=0,ya=1,Rc=2,Cc=3,Lc=4,kp=5,Hr=100,zp=101,Hp=102,Gp=103,Wp=104,Vp=200,Yp=201,Xp=202,Kp=203,oh=204,lh=205,qp=206,Zp=207,$p=208,Jp=209,Qp=210,jp=211,e1=212,t1=213,n1=214,zo=0,Ho=1,Go=2,Ta=3,Wo=4,Vo=5,Yo=6,Xo=7,ch=0,i1=1,r1=2,gi=0,uh=1,hh=2,dh=3,fh=4,ph=5,gh=6,mh=7,Mh=300,vr=301,Jr=302,$s=303,Js=304,Bs=306,Ko=1e3,Di=1001,qo=1002,tn=1003,a1=1004,Ga=1005,$t=1006,Qs=1007,fr=1008,On=1009,xh=1010,_h=1011,Ra=1012,Vl=1013,xi=1014,fi=1015,_i=1016,Yl=1017,Xl=1018,Ca=1020,vh=35902,bh=35899,Sh=1021,Eh=1022,Hn=1023,zi=1026,pr=1027,yh=1028,Kl=1029,br=1030,ql=1031,Zl=1033,vs=33776,bs=33777,Ss=33778,Es=33779,Zo=35840,$o=35841,Jo=35842,Qo=35843,jo=36196,el=37492,tl=37496,nl=37488,il=37489,Rs=37490,rl=37491,al=37808,sl=37809,ol=37810,ll=37811,cl=37812,ul=37813,hl=37814,dl=37815,fl=37816,pl=37817,gl=37818,ml=37819,Ml=37820,xl=37821,_l=36492,vl=36494,bl=36495,Sl=36283,El=36284,Cs=36285,yl=36286,s1=3200,Dc=0,o1=1,Zn="",Bn="srgb",La="srgb-linear",Ls="linear",yt="srgb",js=7680,l1=519,c1=512,u1=513,h1=514,$l=515,d1=516,f1=517,Jl=518,p1=519,g1=35044,wh=35048,Pc="300 es",pi=2e3,Ds=2001;function m1(n){for(let e=n.length-1;e>=0;--e)if(n[e]>=65535)return!0;return!1}function Ps(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function M1(){const n=Ps("canvas");return n.style.display="block",n}const Oc={};function Ic(...n){const e="THREE."+n.shift();console.log(e,...n)}function Ah(n){const e=n[0];if(typeof e=="string"&&e.startsWith("TSL:")){const t=n[1];t&&t.isStackTrace?n[0]+=" "+t.getLocation():n[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return n}function Ke(...n){n=Ah(n);const e="THREE."+n.shift();{const t=n[0];t&&t.isStackTrace?console.warn(t.getError(e)):console.warn(e,...n)}}function pt(...n){n=Ah(n);const e="THREE."+n.shift();{const t=n[0];t&&t.isStackTrace?console.error(t.getError(e)):console.error(e,...n)}}function qr(...n){const e=n.join(" ");e in Oc||(Oc[e]=!0,Ke(...n))}function x1(n,e,t){return new Promise(function(i,r){function a(){switch(n.clientWaitSync(e,n.SYNC_FLUSH_COMMANDS_BIT,0)){case n.WAIT_FAILED:r();break;case n.TIMEOUT_EXPIRED:setTimeout(a,t);break;default:i()}}setTimeout(a,t)})}const _1={[zo]:Ho,[Go]:Yo,[Wo]:Xo,[Ta]:Vo,[Ho]:zo,[Yo]:Go,[Xo]:Wo,[Vo]:Ta};class Er{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(t)===-1&&i[e].push(t)}hasEventListener(e,t){const i=this._listeners;return i===void 0?!1:i[e]!==void 0&&i[e].indexOf(t)!==-1}removeEventListener(e,t){const i=this._listeners;if(i===void 0)return;const r=i[e];if(r!==void 0){const a=r.indexOf(t);a!==-1&&r.splice(a,1)}}dispatchEvent(e){const t=this._listeners;if(t===void 0)return;const i=t[e.type];if(i!==void 0){e.target=this;const r=i.slice(0);for(let a=0,o=r.length;a<o;a++)r[a].call(this,e);e.target=null}}}const pn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],eo=Math.PI/180,wl=180/Math.PI;function Ia(){const n=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(pn[n&255]+pn[n>>8&255]+pn[n>>16&255]+pn[n>>24&255]+"-"+pn[e&255]+pn[e>>8&255]+"-"+pn[e>>16&15|64]+pn[e>>24&255]+"-"+pn[t&63|128]+pn[t>>8&255]+"-"+pn[t>>16&255]+pn[t>>24&255]+pn[i&255]+pn[i>>8&255]+pn[i>>16&255]+pn[i>>24&255]).toLowerCase()}function ct(n,e,t){return Math.max(e,Math.min(t,n))}function v1(n,e){return(n%e+e)%e}function to(n,e,t){return(1-t)*n+t*e}function la(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:case Uint8ClampedArray:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function An(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:case Uint8ClampedArray:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}class Ze{static{Ze.prototype.isVector2=!0}constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("THREE.Vector2: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,i=this.y,r=e.elements;return this.x=r[0]*t+r[3]*i+r[6],this.y=r[1]*t+r[4]*i+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=ct(this.x,e.x,t.x),this.y=ct(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=ct(this.x,e,t),this.y=ct(this.y,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(ct(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(ct(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y;return t*t+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const i=Math.cos(t),r=Math.sin(t),a=this.x-e.x,o=this.y-e.y;return this.x=a*i-o*r+e.x,this.y=a*r+o*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class na{constructor(e=0,t=0,i=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=i,this._w=r}static slerpFlat(e,t,i,r,a,o,l){let c=i[r+0],h=i[r+1],u=i[r+2],f=i[r+3],d=a[o+0],p=a[o+1],g=a[o+2],x=a[o+3];if(f!==x||c!==d||h!==p||u!==g){let m=c*d+h*p+u*g+f*x;m<0&&(d=-d,p=-p,g=-g,x=-x,m=-m);let M=1-l;if(m<.9995){const _=Math.acos(m),A=Math.sin(_);M=Math.sin(M*_)/A,l=Math.sin(l*_)/A,c=c*M+d*l,h=h*M+p*l,u=u*M+g*l,f=f*M+x*l}else{c=c*M+d*l,h=h*M+p*l,u=u*M+g*l,f=f*M+x*l;const _=1/Math.sqrt(c*c+h*h+u*u+f*f);c*=_,h*=_,u*=_,f*=_}}e[t]=c,e[t+1]=h,e[t+2]=u,e[t+3]=f}static multiplyQuaternionsFlat(e,t,i,r,a,o){const l=i[r],c=i[r+1],h=i[r+2],u=i[r+3],f=a[o],d=a[o+1],p=a[o+2],g=a[o+3];return e[t]=l*g+u*f+c*p-h*d,e[t+1]=c*g+u*d+h*f-l*p,e[t+2]=h*g+u*p+l*d-c*f,e[t+3]=u*g-l*f-c*d-h*p,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,i,r){return this._x=e,this._y=t,this._z=i,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const i=e._x,r=e._y,a=e._z,o=e._order,l=Math.cos,c=Math.sin,h=l(i/2),u=l(r/2),f=l(a/2),d=c(i/2),p=c(r/2),g=c(a/2);switch(o){case"XYZ":this._x=d*u*f+h*p*g,this._y=h*p*f-d*u*g,this._z=h*u*g+d*p*f,this._w=h*u*f-d*p*g;break;case"YXZ":this._x=d*u*f+h*p*g,this._y=h*p*f-d*u*g,this._z=h*u*g-d*p*f,this._w=h*u*f+d*p*g;break;case"ZXY":this._x=d*u*f-h*p*g,this._y=h*p*f+d*u*g,this._z=h*u*g+d*p*f,this._w=h*u*f-d*p*g;break;case"ZYX":this._x=d*u*f-h*p*g,this._y=h*p*f+d*u*g,this._z=h*u*g-d*p*f,this._w=h*u*f+d*p*g;break;case"YZX":this._x=d*u*f+h*p*g,this._y=h*p*f+d*u*g,this._z=h*u*g-d*p*f,this._w=h*u*f-d*p*g;break;case"XZY":this._x=d*u*f-h*p*g,this._y=h*p*f-d*u*g,this._z=h*u*g+d*p*f,this._w=h*u*f+d*p*g;break;default:Ke("Quaternion: .setFromEuler() encountered an unknown order: "+o)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const i=t/2,r=Math.sin(i);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,i=t[0],r=t[4],a=t[8],o=t[1],l=t[5],c=t[9],h=t[2],u=t[6],f=t[10],d=i+l+f;if(d>0){const p=.5/Math.sqrt(d+1);this._w=.25/p,this._x=(u-c)*p,this._y=(a-h)*p,this._z=(o-r)*p}else if(i>l&&i>f){const p=2*Math.sqrt(1+i-l-f);this._w=(u-c)/p,this._x=.25*p,this._y=(r+o)/p,this._z=(a+h)/p}else if(l>f){const p=2*Math.sqrt(1+l-i-f);this._w=(a-h)/p,this._x=(r+o)/p,this._y=.25*p,this._z=(c+u)/p}else{const p=2*Math.sqrt(1+f-i-l);this._w=(o-r)/p,this._x=(a+h)/p,this._y=(c+u)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let i=e.dot(t)+1;return i<1e-8?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(ct(this.dot(e),-1,1)))}rotateTowards(e,t){const i=this.angleTo(e);if(i===0)return this;const r=Math.min(1,t/i);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const i=e._x,r=e._y,a=e._z,o=e._w,l=t._x,c=t._y,h=t._z,u=t._w;return this._x=i*u+o*l+r*h-a*c,this._y=r*u+o*c+a*l-i*h,this._z=a*u+o*h+i*c-r*l,this._w=o*u-i*l-r*c-a*h,this._onChangeCallback(),this}slerp(e,t){let i=e._x,r=e._y,a=e._z,o=e._w,l=this.dot(e);l<0&&(i=-i,r=-r,a=-a,o=-o,l=-l);let c=1-t;if(l<.9995){const h=Math.acos(l),u=Math.sin(h);c=Math.sin(c*h)/u,t=Math.sin(t*h)/u,this._x=this._x*c+i*t,this._y=this._y*c+r*t,this._z=this._z*c+a*t,this._w=this._w*c+o*t,this._onChangeCallback()}else this._x=this._x*c+i*t,this._y=this._y*c+r*t,this._z=this._z*c+a*t,this._w=this._w*c+o*t,this.normalize();return this}slerpQuaternions(e,t,i){return this.copy(e).slerp(t,i)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),i=Math.random(),r=Math.sqrt(1-i),a=Math.sqrt(i);return this.set(r*Math.sin(e),r*Math.cos(e),a*Math.sin(t),a*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class K{static{K.prototype.isVector3=!0}constructor(e=0,t=0,i=0){this.x=e,this.y=t,this.z=i}set(e,t,i){return i===void 0&&(i=this.z),this.x=e,this.y=t,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("THREE.Vector3: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Nc.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Nc.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,i=this.y,r=this.z,a=e.elements;return this.x=a[0]*t+a[3]*i+a[6]*r,this.y=a[1]*t+a[4]*i+a[7]*r,this.z=a[2]*t+a[5]*i+a[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,i=this.y,r=this.z,a=e.elements,o=1/(a[3]*t+a[7]*i+a[11]*r+a[15]);return this.x=(a[0]*t+a[4]*i+a[8]*r+a[12])*o,this.y=(a[1]*t+a[5]*i+a[9]*r+a[13])*o,this.z=(a[2]*t+a[6]*i+a[10]*r+a[14])*o,this}applyQuaternion(e){const t=this.x,i=this.y,r=this.z,a=e.x,o=e.y,l=e.z,c=e.w,h=2*(o*r-l*i),u=2*(l*t-a*r),f=2*(a*i-o*t);return this.x=t+c*h+o*f-l*u,this.y=i+c*u+l*h-a*f,this.z=r+c*f+a*u-o*h,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,i=this.y,r=this.z,a=e.elements;return this.x=a[0]*t+a[4]*i+a[8]*r,this.y=a[1]*t+a[5]*i+a[9]*r,this.z=a[2]*t+a[6]*i+a[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=ct(this.x,e.x,t.x),this.y=ct(this.y,e.y,t.y),this.z=ct(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=ct(this.x,e,t),this.y=ct(this.y,e,t),this.z=ct(this.z,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(ct(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const i=e.x,r=e.y,a=e.z,o=t.x,l=t.y,c=t.z;return this.x=r*c-a*l,this.y=a*o-i*c,this.z=i*l-r*o,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const i=e.dot(this)/t;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return no.copy(this).projectOnVector(e),this.sub(no)}reflect(e){return this.sub(no.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(ct(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y,r=this.z-e.z;return t*t+i*i+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,i){const r=Math.sin(t)*e;return this.x=r*Math.sin(i),this.y=Math.cos(t)*e,this.z=r*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,i){return this.x=e*Math.sin(t),this.y=i,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=i,this.z=r,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,i=Math.sqrt(1-t*t);return this.x=i*Math.cos(e),this.y=t,this.z=i*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const no=new K,Nc=new na;class qe{static{qe.prototype.isMatrix3=!0}constructor(e,t,i,r,a,o,l,c,h){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,i,r,a,o,l,c,h)}set(e,t,i,r,a,o,l,c,h){const u=this.elements;return u[0]=e,u[1]=r,u[2]=l,u[3]=t,u[4]=a,u[5]=c,u[6]=i,u[7]=o,u[8]=h,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],this}extractBasis(e,t,i){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,r=t.elements,a=this.elements,o=i[0],l=i[3],c=i[6],h=i[1],u=i[4],f=i[7],d=i[2],p=i[5],g=i[8],x=r[0],m=r[3],M=r[6],_=r[1],A=r[4],E=r[7],R=r[2],T=r[5],P=r[8];return a[0]=o*x+l*_+c*R,a[3]=o*m+l*A+c*T,a[6]=o*M+l*E+c*P,a[1]=h*x+u*_+f*R,a[4]=h*m+u*A+f*T,a[7]=h*M+u*E+f*P,a[2]=d*x+p*_+g*R,a[5]=d*m+p*A+g*T,a[8]=d*M+p*E+g*P,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[1],r=e[2],a=e[3],o=e[4],l=e[5],c=e[6],h=e[7],u=e[8];return t*o*u-t*l*h-i*a*u+i*l*c+r*a*h-r*o*c}invert(){const e=this.elements,t=e[0],i=e[1],r=e[2],a=e[3],o=e[4],l=e[5],c=e[6],h=e[7],u=e[8],f=u*o-l*h,d=l*c-u*a,p=h*a-o*c,g=t*f+i*d+r*p;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const x=1/g;return e[0]=f*x,e[1]=(r*h-u*i)*x,e[2]=(l*i-r*o)*x,e[3]=d*x,e[4]=(u*t-r*c)*x,e[5]=(r*a-l*t)*x,e[6]=p*x,e[7]=(i*c-h*t)*x,e[8]=(o*t-i*a)*x,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,i,r,a,o,l){const c=Math.cos(a),h=Math.sin(a);return this.set(i*c,i*h,-i*(c*o+h*l)+o+e,-r*h,r*c,-r*(-h*o+c*l)+l+t,0,0,1),this}scale(e,t){return qr("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(io.makeScale(e,t)),this}rotate(e){return qr("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(io.makeRotation(-e)),this}translate(e,t){return qr("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(io.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,i,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,i=e.elements;for(let r=0;r<9;r++)if(t[r]!==i[r])return!1;return!0}fromArray(e,t=0){for(let i=0;i<9;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const io=new qe,Fc=new qe().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Uc=new qe().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function b1(){const n={enabled:!0,workingColorSpace:La,spaces:{},convert:function(r,a,o){return this.enabled===!1||a===o||!a||!o||(this.spaces[a].transfer===yt&&(r.r=Ui(r.r),r.g=Ui(r.g),r.b=Ui(r.b)),this.spaces[a].primaries!==this.spaces[o].primaries&&(r.applyMatrix3(this.spaces[a].toXYZ),r.applyMatrix3(this.spaces[o].fromXYZ)),this.spaces[o].transfer===yt&&(r.r=Zr(r.r),r.g=Zr(r.g),r.b=Zr(r.b))),r},workingToColorSpace:function(r,a){return this.convert(r,this.workingColorSpace,a)},colorSpaceToWorking:function(r,a){return this.convert(r,a,this.workingColorSpace)},getPrimaries:function(r){return this.spaces[r].primaries},getTransfer:function(r){return r===Zn?Ls:this.spaces[r].transfer},getToneMappingMode:function(r){return this.spaces[r].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(r,a=this.workingColorSpace){return r.fromArray(this.spaces[a].luminanceCoefficients)},define:function(r){Object.assign(this.spaces,r)},_getMatrix:function(r,a,o){return r.copy(this.spaces[a].toXYZ).multiply(this.spaces[o].fromXYZ)},_getDrawingBufferColorSpace:function(r){return this.spaces[r].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(r=this.workingColorSpace){return this.spaces[r].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(r,a){return qr("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),n.workingToColorSpace(r,a)},toWorkingColorSpace:function(r,a){return qr("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),n.colorSpaceToWorking(r,a)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],i=[.3127,.329];return n.define({[La]:{primaries:e,whitePoint:i,transfer:Ls,toXYZ:Fc,fromXYZ:Uc,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:Bn},outputColorSpaceConfig:{drawingBufferColorSpace:Bn}},[Bn]:{primaries:e,whitePoint:i,transfer:yt,toXYZ:Fc,fromXYZ:Uc,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:Bn}}}),n}const lt=b1();function Ui(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function Zr(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}let Tr;class S1{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let i;if(e instanceof HTMLCanvasElement)i=e;else{Tr===void 0&&(Tr=Ps("canvas")),Tr.width=e.width,Tr.height=e.height;const r=Tr.getContext("2d");e instanceof ImageData?r.putImageData(e,0,0):r.drawImage(e,0,0,e.width,e.height),i=Tr}return i.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=Ps("canvas");t.width=e.width,t.height=e.height;const i=t.getContext("2d");i.drawImage(e,0,0,e.width,e.height);const r=i.getImageData(0,0,e.width,e.height),a=r.data;for(let o=0;o<a.length;o++)a[o]=Ui(a[o]/255)*255;return i.putImageData(r,0,0),t}else if(e.data){const t=e.data.slice(0);for(let i=0;i<t.length;i++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[i]=Math.floor(Ui(t[i]/255)*255):t[i]=Ui(t[i]);return{data:t,width:e.width,height:e.height}}else return Ke("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let E1=0;class Ql{constructor(e=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:E1++}),this.uuid=Ia(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<"u"&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const i={uuid:this.uuid,url:""},r=this.data;if(r!==null){let a;if(Array.isArray(r)){a=[];for(let o=0,l=r.length;o<l;o++)r[o].isDataTexture?a.push(ro(r[o].image)):a.push(ro(r[o]))}else a=ro(r);i.url=a}return t||(e.images[this.uuid]=i),i}}function ro(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?S1.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(Ke("Texture: Unable to serialize Texture."),{})}let y1=0;const ao=new K;class yn extends Er{constructor(e=yn.DEFAULT_IMAGE,t=yn.DEFAULT_MAPPING,i=Di,r=Di,a=$t,o=fr,l=Hn,c=On,h=yn.DEFAULT_ANISOTROPY,u=Zn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:y1++}),this.uuid=Ia(),this.name="",this.source=new Ql(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=i,this.wrapT=r,this.magFilter=a,this.minFilter=o,this.anisotropy=h,this.format=l,this.internalFormat=null,this.type=c,this.offset=new Ze(0,0),this.repeat=new Ze(1,1),this.center=new Ze(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new qe,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(ao).x}get height(){return this.source.getSize(ao).y}get depth(){return this.source.getSize(ao).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const t in e){const i=e[t];if(i===void 0){Ke(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}const r=this[t];if(r===void 0){Ke(`Texture.setValues(): property '${t}' does not exist.`);continue}r&&i&&r.isVector2&&i.isVector2||r&&i&&r.isVector3&&i.isVector3||r&&i&&r.isMatrix3&&i.isMatrix3?r.copy(i):this[t]=i}}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const i={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),t||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Mh)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Ko:e.x=e.x-Math.floor(e.x);break;case Di:e.x=e.x<0?0:1;break;case qo:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Ko:e.y=e.y-Math.floor(e.y);break;case Di:e.y=e.y<0?0:1;break;case qo:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}yn.DEFAULT_IMAGE=null;yn.DEFAULT_MAPPING=Mh;yn.DEFAULT_ANISOTROPY=1;class kt{static{kt.prototype.isVector4=!0}constructor(e=0,t=0,i=0,r=1){this.x=e,this.y=t,this.z=i,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,i,r){return this.x=e,this.y=t,this.z=i,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("THREE.Vector4: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,i=this.y,r=this.z,a=this.w,o=e.elements;return this.x=o[0]*t+o[4]*i+o[8]*r+o[12]*a,this.y=o[1]*t+o[5]*i+o[9]*r+o[13]*a,this.z=o[2]*t+o[6]*i+o[10]*r+o[14]*a,this.w=o[3]*t+o[7]*i+o[11]*r+o[15]*a,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,i,r,a;const c=e.elements,h=c[0],u=c[4],f=c[8],d=c[1],p=c[5],g=c[9],x=c[2],m=c[6],M=c[10];if(Math.abs(u-d)<.01&&Math.abs(f-x)<.01&&Math.abs(g-m)<.01){if(Math.abs(u+d)<.1&&Math.abs(f+x)<.1&&Math.abs(g+m)<.1&&Math.abs(h+p+M-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const A=(h+1)/2,E=(p+1)/2,R=(M+1)/2,T=(u+d)/4,P=(f+x)/4,S=(g+m)/4;return A>E&&A>R?A<.01?(i=0,r=.707106781,a=.707106781):(i=Math.sqrt(A),r=T/i,a=P/i):E>R?E<.01?(i=.707106781,r=0,a=.707106781):(r=Math.sqrt(E),i=T/r,a=S/r):R<.01?(i=.707106781,r=.707106781,a=0):(a=Math.sqrt(R),i=P/a,r=S/a),this.set(i,r,a,t),this}let _=Math.sqrt((m-g)*(m-g)+(f-x)*(f-x)+(d-u)*(d-u));return Math.abs(_)<.001&&(_=1),this.x=(m-g)/_,this.y=(f-x)/_,this.z=(d-u)/_,this.w=Math.acos((h+p+M-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=ct(this.x,e.x,t.x),this.y=ct(this.y,e.y,t.y),this.z=ct(this.z,e.z,t.z),this.w=ct(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=ct(this.x,e,t),this.y=ct(this.y,e,t),this.z=ct(this.z,e,t),this.w=ct(this.w,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(ct(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this.w=e.w+(t.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class w1 extends Er{constructor(e=1,t=1,i={}){super(),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:$t,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},i),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=i.depth,this.scissor=new kt(0,0,e,t),this.scissorTest=!1,this.viewport=new kt(0,0,e,t),this.textures=[];const r={width:e,height:t,depth:i.depth},a=new yn(r),o=i.count;for(let l=0;l<o;l++)this.textures[l]=a.clone(),this.textures[l].isRenderTargetTexture=!0,this.textures[l].renderTarget=this;this._setTextureOptions(i),this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveColorBuffer=i.resolveColorBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this.storeMultisampledColorBuffer=i.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=i.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=i.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=i.depthTexture,this.samples=i.samples,this.multiview=i.multiview,this.useArrayDepthTexture=i.useArrayDepthTexture}_setTextureOptions(e={}){const t={minFilter:$t,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let i=0;i<this.textures.length;i++)this.textures[i].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),e!==null&&e.renderTarget===null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,i=1){if(this.width!==e||this.height!==t||this.depth!==i){this.width=e,this.height=t,this.depth=i;for(let r=0,a=this.textures.length;r<a;r++)this.textures[r].image.width=e,this.textures[r].image.height=t,this.textures[r].image.depth=i,this.textures[r].isData3DTexture!==!0&&(this.textures[r].isArrayTexture=this.textures[r].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,i=e.textures.length;t<i;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;const r=Object.assign({},e.textures[t].image);this.textures[t].source=new Ql(r)}if(this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveColorBuffer=e.resolveColorBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,this.storeMultisampledColorBuffer=e.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=e.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=e.storeMultisampledStencilBuffer,e.depthTexture!==null)if(e.depthTexture.renderTarget===e){const t=e.depthTexture.clone();t.renderTarget=null,this.depthTexture=t}else this.depthTexture=e.depthTexture;return this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Gn extends w1{constructor(e=1,t=1,i={}){super(e,t,i),this.isWebGLRenderTarget=!0}}class Th extends yn{constructor(e=null,t=1,i=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:i,depth:r},this.magFilter=tn,this.minFilter=tn,this.wrapR=Di,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class A1 extends yn{constructor(e=null,t=1,i=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:i,depth:r},this.magFilter=tn,this.minFilter=tn,this.wrapR=Di,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}}class Kt{static{Kt.prototype.isMatrix4=!0}constructor(e,t,i,r,a,o,l,c,h,u,f,d,p,g,x,m){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,i,r,a,o,l,c,h,u,f,d,p,g,x,m)}set(e,t,i,r,a,o,l,c,h,u,f,d,p,g,x,m){const M=this.elements;return M[0]=e,M[4]=t,M[8]=i,M[12]=r,M[1]=a,M[5]=o,M[9]=l,M[13]=c,M[2]=h,M[6]=u,M[10]=f,M[14]=d,M[3]=p,M[7]=g,M[11]=x,M[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Kt().fromArray(this.elements)}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],t[9]=i[9],t[10]=i[10],t[11]=i[11],t[12]=i[12],t[13]=i[13],t[14]=i[14],t[15]=i[15],this}copyPosition(e){const t=this.elements,i=e.elements;return t[12]=i[12],t[13]=i[13],t[14]=i[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,i){return this.determinantAffine()===0?(e.set(1,0,0),t.set(0,1,0),i.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this)}makeBasis(e,t,i){return this.set(e.x,t.x,i.x,0,e.y,t.y,i.y,0,e.z,t.z,i.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();const t=this.elements,i=e.elements,r=1/Rr.setFromMatrixColumn(e,0).length(),a=1/Rr.setFromMatrixColumn(e,1).length(),o=1/Rr.setFromMatrixColumn(e,2).length();return t[0]=i[0]*r,t[1]=i[1]*r,t[2]=i[2]*r,t[3]=0,t[4]=i[4]*a,t[5]=i[5]*a,t[6]=i[6]*a,t[7]=0,t[8]=i[8]*o,t[9]=i[9]*o,t[10]=i[10]*o,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,i=e.x,r=e.y,a=e.z,o=Math.cos(i),l=Math.sin(i),c=Math.cos(r),h=Math.sin(r),u=Math.cos(a),f=Math.sin(a);if(e.order==="XYZ"){const d=o*u,p=o*f,g=l*u,x=l*f;t[0]=c*u,t[4]=-c*f,t[8]=h,t[1]=p+g*h,t[5]=d-x*h,t[9]=-l*c,t[2]=x-d*h,t[6]=g+p*h,t[10]=o*c}else if(e.order==="YXZ"){const d=c*u,p=c*f,g=h*u,x=h*f;t[0]=d+x*l,t[4]=g*l-p,t[8]=o*h,t[1]=o*f,t[5]=o*u,t[9]=-l,t[2]=p*l-g,t[6]=x+d*l,t[10]=o*c}else if(e.order==="ZXY"){const d=c*u,p=c*f,g=h*u,x=h*f;t[0]=d-x*l,t[4]=-o*f,t[8]=g+p*l,t[1]=p+g*l,t[5]=o*u,t[9]=x-d*l,t[2]=-o*h,t[6]=l,t[10]=o*c}else if(e.order==="ZYX"){const d=o*u,p=o*f,g=l*u,x=l*f;t[0]=c*u,t[4]=g*h-p,t[8]=d*h+x,t[1]=c*f,t[5]=x*h+d,t[9]=p*h-g,t[2]=-h,t[6]=l*c,t[10]=o*c}else if(e.order==="YZX"){const d=o*c,p=o*h,g=l*c,x=l*h;t[0]=c*u,t[4]=x-d*f,t[8]=g*f+p,t[1]=f,t[5]=o*u,t[9]=-l*u,t[2]=-h*u,t[6]=p*f+g,t[10]=d-x*f}else if(e.order==="XZY"){const d=o*c,p=o*h,g=l*c,x=l*h;t[0]=c*u,t[4]=-f,t[8]=h*u,t[1]=d*f+x,t[5]=o*u,t[9]=p*f-g,t[2]=g*f-p,t[6]=l*u,t[10]=x*f+d}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(T1,e,R1)}lookAt(e,t,i){const r=this.elements;return Ln.subVectors(e,t),Ln.lengthSq()===0&&(Ln.z=1),Ln.normalize(),Ki.crossVectors(i,Ln),Ki.lengthSq()===0&&(Math.abs(i.z)===1?Ln.x+=1e-4:Ln.z+=1e-4,Ln.normalize(),Ki.crossVectors(i,Ln)),Ki.normalize(),Wa.crossVectors(Ln,Ki),r[0]=Ki.x,r[4]=Wa.x,r[8]=Ln.x,r[1]=Ki.y,r[5]=Wa.y,r[9]=Ln.y,r[2]=Ki.z,r[6]=Wa.z,r[10]=Ln.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,r=t.elements,a=this.elements,o=i[0],l=i[4],c=i[8],h=i[12],u=i[1],f=i[5],d=i[9],p=i[13],g=i[2],x=i[6],m=i[10],M=i[14],_=i[3],A=i[7],E=i[11],R=i[15],T=r[0],P=r[4],S=r[8],y=r[12],C=r[1],I=r[5],L=r[9],N=r[13],O=r[2],U=r[6],W=r[10],F=r[14],Q=r[3],X=r[7],te=r[11],B=r[15];return a[0]=o*T+l*C+c*O+h*Q,a[4]=o*P+l*I+c*U+h*X,a[8]=o*S+l*L+c*W+h*te,a[12]=o*y+l*N+c*F+h*B,a[1]=u*T+f*C+d*O+p*Q,a[5]=u*P+f*I+d*U+p*X,a[9]=u*S+f*L+d*W+p*te,a[13]=u*y+f*N+d*F+p*B,a[2]=g*T+x*C+m*O+M*Q,a[6]=g*P+x*I+m*U+M*X,a[10]=g*S+x*L+m*W+M*te,a[14]=g*y+x*N+m*F+M*B,a[3]=_*T+A*C+E*O+R*Q,a[7]=_*P+A*I+E*U+R*X,a[11]=_*S+A*L+E*W+R*te,a[15]=_*y+A*N+E*F+R*B,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[4],r=e[8],a=e[12],o=e[1],l=e[5],c=e[9],h=e[13],u=e[2],f=e[6],d=e[10],p=e[14],g=e[3],x=e[7],m=e[11],M=e[15],_=c*p-h*d,A=l*p-h*f,E=l*d-c*f,R=o*p-h*u,T=o*d-c*u,P=o*f-l*u;return t*(x*_-m*A+M*E)-i*(g*_-m*R+M*T)+r*(g*A-x*R+M*P)-a*(g*E-x*T+m*P)}determinantAffine(){const e=this.elements,t=e[0],i=e[4],r=e[8],a=e[1],o=e[5],l=e[9],c=e[2],h=e[6],u=e[10];return t*(o*u-l*h)-i*(a*u-l*c)+r*(a*h-o*c)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,i){const r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=i),this}invert(){const e=this.elements,t=e[0],i=e[1],r=e[2],a=e[3],o=e[4],l=e[5],c=e[6],h=e[7],u=e[8],f=e[9],d=e[10],p=e[11],g=e[12],x=e[13],m=e[14],M=e[15],_=t*l-i*o,A=t*c-r*o,E=t*h-a*o,R=i*c-r*l,T=i*h-a*l,P=r*h-a*c,S=u*x-f*g,y=u*m-d*g,C=u*M-p*g,I=f*m-d*x,L=f*M-p*x,N=d*M-p*m,O=_*N-A*L+E*I+R*C-T*y+P*S;if(O===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const U=1/O;return e[0]=(l*N-c*L+h*I)*U,e[1]=(r*L-i*N-a*I)*U,e[2]=(x*P-m*T+M*R)*U,e[3]=(d*T-f*P-p*R)*U,e[4]=(c*C-o*N-h*y)*U,e[5]=(t*N-r*C+a*y)*U,e[6]=(m*E-g*P-M*A)*U,e[7]=(u*P-d*E+p*A)*U,e[8]=(o*L-l*C+h*S)*U,e[9]=(i*C-t*L-a*S)*U,e[10]=(g*T-x*E+M*_)*U,e[11]=(f*E-u*T-p*_)*U,e[12]=(l*y-o*I-c*S)*U,e[13]=(t*I-i*y+r*S)*U,e[14]=(x*A-g*R-m*_)*U,e[15]=(u*R-f*A+d*_)*U,this}scale(e){const t=this.elements,i=e.x,r=e.y,a=e.z;return t[0]*=i,t[4]*=r,t[8]*=a,t[1]*=i,t[5]*=r,t[9]*=a,t[2]*=i,t[6]*=r,t[10]*=a,t[3]*=i,t[7]*=r,t[11]*=a,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,i,r))}makeTranslation(e,t,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,i,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,t,-i,0,0,i,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,0,i,0,0,1,0,0,-i,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,0,i,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const i=Math.cos(t),r=Math.sin(t),a=1-i,o=e.x,l=e.y,c=e.z,h=a*o,u=a*l;return this.set(h*o+i,h*l-r*c,h*c+r*l,0,h*l+r*c,u*l+i,u*c-r*o,0,h*c-r*l,u*c+r*o,a*c*c+i,0,0,0,0,1),this}makeScale(e,t,i){return this.set(e,0,0,0,0,t,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,t,i,r,a,o){return this.set(1,i,a,0,e,1,o,0,t,r,1,0,0,0,0,1),this}compose(e,t,i){const r=this.elements,a=t._x,o=t._y,l=t._z,c=t._w,h=a+a,u=o+o,f=l+l,d=a*h,p=a*u,g=a*f,x=o*u,m=o*f,M=l*f,_=c*h,A=c*u,E=c*f,R=i.x,T=i.y,P=i.z;return r[0]=(1-(x+M))*R,r[1]=(p+E)*R,r[2]=(g-A)*R,r[3]=0,r[4]=(p-E)*T,r[5]=(1-(d+M))*T,r[6]=(m+_)*T,r[7]=0,r[8]=(g+A)*P,r[9]=(m-_)*P,r[10]=(1-(d+x))*P,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,i){const r=this.elements;e.x=r[12],e.y=r[13],e.z=r[14];const a=this.determinantAffine();if(a===0)return i.set(1,1,1),t.identity(),this;let o=Rr.set(r[0],r[1],r[2]).length();const l=Rr.set(r[4],r[5],r[6]).length(),c=Rr.set(r[8],r[9],r[10]).length();a<0&&(o=-o),Yn.copy(this);const h=1/o,u=1/l,f=1/c;return Yn.elements[0]*=h,Yn.elements[1]*=h,Yn.elements[2]*=h,Yn.elements[4]*=u,Yn.elements[5]*=u,Yn.elements[6]*=u,Yn.elements[8]*=f,Yn.elements[9]*=f,Yn.elements[10]*=f,t.setFromRotationMatrix(Yn),i.x=o,i.y=l,i.z=c,this}makePerspective(e,t,i,r,a,o,l=pi,c=!1){const h=this.elements,u=2*a/(t-e),f=2*a/(i-r),d=(t+e)/(t-e),p=(i+r)/(i-r);let g,x;if(c)g=a/(o-a),x=o*a/(o-a);else if(l===pi)g=-(o+a)/(o-a),x=-2*o*a/(o-a);else if(l===Ds)g=-o/(o-a),x=-o*a/(o-a);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+l);return h[0]=u,h[4]=0,h[8]=d,h[12]=0,h[1]=0,h[5]=f,h[9]=p,h[13]=0,h[2]=0,h[6]=0,h[10]=g,h[14]=x,h[3]=0,h[7]=0,h[11]=-1,h[15]=0,this}makeOrthographic(e,t,i,r,a,o,l=pi,c=!1){const h=this.elements,u=2/(t-e),f=2/(i-r),d=-(t+e)/(t-e),p=-(i+r)/(i-r);let g,x;if(c)g=1/(o-a),x=o/(o-a);else if(l===pi)g=-2/(o-a),x=-(o+a)/(o-a);else if(l===Ds)g=-1/(o-a),x=-a/(o-a);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+l);return h[0]=u,h[4]=0,h[8]=0,h[12]=d,h[1]=0,h[5]=f,h[9]=0,h[13]=p,h[2]=0,h[6]=0,h[10]=g,h[14]=x,h[3]=0,h[7]=0,h[11]=0,h[15]=1,this}equals(e){const t=this.elements,i=e.elements;for(let r=0;r<16;r++)if(t[r]!==i[r])return!1;return!0}fromArray(e,t=0){for(let i=0;i<16;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e[t+9]=i[9],e[t+10]=i[10],e[t+11]=i[11],e[t+12]=i[12],e[t+13]=i[13],e[t+14]=i[14],e[t+15]=i[15],e}}const Rr=new K,Yn=new Kt,T1=new K(0,0,0),R1=new K(1,1,1),Ki=new K,Wa=new K,Ln=new K,Bc=new Kt,kc=new na;class Sr{constructor(e=0,t=0,i=0,r=Sr.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=i,this._order=r}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,i,r=this._order){return this._x=e,this._y=t,this._z=i,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,i=!0){const r=e.elements,a=r[0],o=r[4],l=r[8],c=r[1],h=r[5],u=r[9],f=r[2],d=r[6],p=r[10];switch(t){case"XYZ":this._y=Math.asin(ct(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-u,p),this._z=Math.atan2(-o,a)):(this._x=Math.atan2(d,h),this._z=0);break;case"YXZ":this._x=Math.asin(-ct(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(l,p),this._z=Math.atan2(c,h)):(this._y=Math.atan2(-f,a),this._z=0);break;case"ZXY":this._x=Math.asin(ct(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-f,p),this._z=Math.atan2(-o,h)):(this._y=0,this._z=Math.atan2(c,a));break;case"ZYX":this._y=Math.asin(-ct(f,-1,1)),Math.abs(f)<.9999999?(this._x=Math.atan2(d,p),this._z=Math.atan2(c,a)):(this._x=0,this._z=Math.atan2(-o,h));break;case"YZX":this._z=Math.asin(ct(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-u,h),this._y=Math.atan2(-f,a)):(this._x=0,this._y=Math.atan2(l,p));break;case"XZY":this._z=Math.asin(-ct(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(d,h),this._y=Math.atan2(l,a)):(this._x=Math.atan2(-u,p),this._y=0);break;default:Ke("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,i){return Bc.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Bc,t,i)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return kc.setFromEuler(this),this.setFromQuaternion(kc,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Sr.DEFAULT_ORDER="XYZ";class Rh{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let C1=0;const zc=new K,Cr=new na,yi=new Kt,Va=new K,ca=new K,L1=new K,D1=new na,Hc=new K(1,0,0),Gc=new K(0,1,0),Wc=new K(0,0,1),Vc={type:"added"},P1={type:"removed"},Lr={type:"childadded",child:null},so={type:"childremoved",child:null};class In extends Er{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:C1++}),this.uuid=Ia(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=In.DEFAULT_UP.clone();const e=new K,t=new Sr,i=new na,r=new K(1,1,1);function a(){i.setFromEuler(t,!1)}function o(){t.setFromQuaternion(i,void 0,!1)}t._onChange(a),i._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new Kt},normalMatrix:{value:new qe}}),this.matrix=new Kt,this.matrixWorld=new Kt,this.matrixAutoUpdate=In.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=In.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Rh,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Cr.setFromAxisAngle(e,t),this.quaternion.multiply(Cr),this}rotateOnWorldAxis(e,t){return Cr.setFromAxisAngle(e,t),this.quaternion.premultiply(Cr),this}rotateX(e){return this.rotateOnAxis(Hc,e)}rotateY(e){return this.rotateOnAxis(Gc,e)}rotateZ(e){return this.rotateOnAxis(Wc,e)}translateOnAxis(e,t){return zc.copy(e).applyQuaternion(this.quaternion),this.position.add(zc.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Hc,e)}translateY(e){return this.translateOnAxis(Gc,e)}translateZ(e){return this.translateOnAxis(Wc,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(yi.copy(this.matrixWorld).invert())}lookAt(e,t,i){e.isVector3?Va.copy(e):Va.set(e,t,i);const r=this.parent;this.updateWorldMatrix(!0,!1),ca.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?yi.lookAt(ca,Va,this.up):yi.lookAt(Va,ca,this.up),this.quaternion.setFromRotationMatrix(yi),r&&(yi.extractRotation(r.matrixWorld),Cr.setFromRotationMatrix(yi),this.quaternion.premultiply(Cr.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(pt("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Vc),Lr.child=e,this.dispatchEvent(Lr),Lr.child=null):pt("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(P1),so.child=e,this.dispatchEvent(so),so.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),yi.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),yi.multiply(e.parent.matrixWorld)),e.applyMatrix4(yi),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Vc),Lr.child=e,this.dispatchEvent(Lr),Lr.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let i=0,r=this.children.length;i<r;i++){const o=this.children[i].getObjectByProperty(e,t);if(o!==void 0)return o}}getObjectsByProperty(e,t,i=[]){this[e]===t&&i.push(this);const r=this.children;for(let a=0,o=r.length;a<o;a++)r[a].getObjectsByProperty(e,t,i);return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ca,e,L1),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ca,D1,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}intersectsFrustum(){}traverse(e){e(this);const t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);const e=this.pivot;if(e!==null){const t=e.x,i=e.y,r=e.z,a=this.matrix.elements;a[12]+=t-a[0]*t-a[4]*i-a[8]*r,a[13]+=i-a[1]*t-a[5]*i-a[9]*r,a[14]+=r-a[2]*t-a[6]*i-a[10]*r}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].updateMatrixWorld(e)}updateWorldMatrix(e,t,i=!1){const r=this.parent;if(e===!0&&r!==null&&r.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||i)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,i=!0),t===!0){const a=this.children;for(let o=0,l=a.length;o<l;o++)a[o].updateWorldMatrix(!1,!0,i)}}toJSON(e){const t=e===void 0||typeof e=="string",i={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const r={};r.uuid=this.uuid,r.type=this.type,r.name=this.name,r.castShadow=this.castShadow,r.receiveShadow=this.receiveShadow,r.visible=this.visible,r.frustumCulled=this.frustumCulled,r.renderOrder=this.renderOrder,r.static=this.static,r.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.pivot!==null&&(r.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(r.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(r.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.geometryInfo=this._geometryInfo.map(l=>({...l,boundingBox:l.boundingBox?l.boundingBox.toJSON():void 0,boundingSphere:l.boundingSphere?l.boundingSphere.toJSON():void 0})),r.instanceInfo=this._instanceInfo.map(l=>({...l})),r.availableInstanceIds=this._availableInstanceIds.slice(),r.availableGeometryIds=this._availableGeometryIds.slice(),r.nextIndexStart=this._nextIndexStart,r.nextVertexStart=this._nextVertexStart,r.geometryCount=this._geometryCount,r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.matricesTexture=this._matricesTexture.toJSON(e),r.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(r.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(r.boundingBox=this.boundingBox.toJSON()));function a(l,c){return l[c.uuid]===void 0&&(l[c.uuid]=c.toJSON(e)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=a(e.geometries,this.geometry);const l=this.geometry.parameters;if(l!==void 0&&l.shapes!==void 0){const c=l.shapes;if(Array.isArray(c))for(let h=0,u=c.length;h<u;h++){const f=c[h];a(e.shapes,f)}else a(e.shapes,c)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(a(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const l=[];for(let c=0,h=this.material.length;c<h;c++)l.push(a(e.materials,this.material[c]));r.material=l}else r.material=a(e.materials,this.material);if(this.children.length>0){r.children=[];for(let l=0;l<this.children.length;l++)r.children.push(this.children[l].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let l=0;l<this.animations.length;l++){const c=this.animations[l];r.animations.push(a(e.animations,c))}}if(t){const l=o(e.geometries),c=o(e.materials),h=o(e.textures),u=o(e.images),f=o(e.shapes),d=o(e.skeletons),p=o(e.animations),g=o(e.nodes);l.length>0&&(i.geometries=l),c.length>0&&(i.materials=c),h.length>0&&(i.textures=h),u.length>0&&(i.images=u),f.length>0&&(i.shapes=f),d.length>0&&(i.skeletons=d),p.length>0&&(i.animations=p),g.length>0&&(i.nodes=g)}return i.object=r,i;function o(l){const c=[];for(const h in l){const u=l[h];delete u.metadata,c.push(u)}return c}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot!==null?e.pivot.clone():null,this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let i=0;i<e.children.length;i++){const r=e.children[i];this.add(r.clone())}return this}dispose(){this.dispatchEvent({type:"dispose"})}}In.DEFAULT_UP=new K(0,1,0);In.DEFAULT_MATRIX_AUTO_UPDATE=!0;In.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class Ya extends In{constructor(){super(),this.isGroup=!0,this.type="Group"}}const O1={type:"move"};class oo{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Ya,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Ya,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new K,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new K),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Ya,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new K,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new K,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const i of e.hand.values())this._getHandJoint(t,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,i){let r=null,a=null,o=null;const l=this._targetRay,c=this._grip,h=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(h&&e.hand){o=!0;for(const x of e.hand.values()){const m=t.getJointPose(x,i),M=this._getHandJoint(h,x);m!==null&&(M.matrix.fromArray(m.transform.matrix),M.matrix.decompose(M.position,M.rotation,M.scale),M.matrixWorldNeedsUpdate=!0,M.jointRadius=m.radius),M.visible=m!==null}const u=h.joints["index-finger-tip"],f=h.joints["thumb-tip"],d=u.position.distanceTo(f.position),p=.02,g=.005;h.inputState.pinching&&d>p+g?(h.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!h.inputState.pinching&&d<=p-g&&(h.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else c!==null&&e.gripSpace&&(a=t.getPose(e.gripSpace,i),a!==null&&(c.matrix.fromArray(a.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,a.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(a.linearVelocity)):c.hasLinearVelocity=!1,a.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(a.angularVelocity)):c.hasAngularVelocity=!1,c.eventsEnabled&&c.dispatchEvent({type:"gripUpdated",data:e,target:this})));l!==null&&(r=t.getPose(e.targetRaySpace,i),r===null&&a!==null&&(r=a),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1,this.dispatchEvent(O1)))}return l!==null&&(l.visible=r!==null),c!==null&&(c.visible=a!==null),h!==null&&(h.visible=o!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const i=new Ya;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[t.jointName]=i,e.add(i)}return e.joints[t.jointName]}}const Ch={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},qi={h:0,s:0,l:0},Xa={h:0,s:0,l:0};function lo(n,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?n+(e-n)*6*t:t<1/2?e:t<2/3?n+(e-n)*6*(2/3-t):n}class Mt{constructor(e,t,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,i)}set(e,t,i){if(t===void 0&&i===void 0){const r=e;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(e,t,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Bn){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,lt.colorSpaceToWorking(this,t),this}setRGB(e,t,i,r=lt.workingColorSpace){return this.r=e,this.g=t,this.b=i,lt.colorSpaceToWorking(this,r),this}setHSL(e,t,i,r=lt.workingColorSpace){if(e=v1(e,1),t=ct(t,0,1),i=ct(i,0,1),t===0)this.r=this.g=this.b=i;else{const a=i<=.5?i*(1+t):i+t-i*t,o=2*i-a;this.r=lo(o,a,e+1/3),this.g=lo(o,a,e),this.b=lo(o,a,e-1/3)}return lt.colorSpaceToWorking(this,r),this}setStyle(e,t=Bn){function i(a){a!==void 0&&parseFloat(a)<1&&Ke("Color: Alpha component of "+e+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let a;const o=r[1],l=r[2];switch(o){case"rgb":case"rgba":if(a=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(l))return i(a[4]),this.setRGB(Math.min(255,parseInt(a[1],10))/255,Math.min(255,parseInt(a[2],10))/255,Math.min(255,parseInt(a[3],10))/255,t);if(a=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(l))return i(a[4]),this.setRGB(Math.min(100,parseInt(a[1],10))/100,Math.min(100,parseInt(a[2],10))/100,Math.min(100,parseInt(a[3],10))/100,t);break;case"hsl":case"hsla":if(a=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(l))return i(a[4]),this.setHSL(parseFloat(a[1])/360,parseFloat(a[2])/100,parseFloat(a[3])/100,t);break;default:Ke("Color: Unknown color model "+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){const a=r[1],o=a.length;if(o===3)return this.setRGB(parseInt(a.charAt(0),16)/15,parseInt(a.charAt(1),16)/15,parseInt(a.charAt(2),16)/15,t);if(o===6)return this.setHex(parseInt(a,16),t);Ke("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Bn){const i=Ch[e.toLowerCase()];return i!==void 0?this.setHex(i,t):Ke("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Ui(e.r),this.g=Ui(e.g),this.b=Ui(e.b),this}copyLinearToSRGB(e){return this.r=Zr(e.r),this.g=Zr(e.g),this.b=Zr(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Bn){return lt.workingToColorSpace(gn.copy(this),e),Math.round(ct(gn.r*255,0,255))*65536+Math.round(ct(gn.g*255,0,255))*256+Math.round(ct(gn.b*255,0,255))}getHexString(e=Bn){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=lt.workingColorSpace){lt.workingToColorSpace(gn.copy(this),t);const i=gn.r,r=gn.g,a=gn.b,o=Math.max(i,r,a),l=Math.min(i,r,a);let c,h;const u=(l+o)/2;if(l===o)c=0,h=0;else{const f=o-l;switch(h=u<=.5?f/(o+l):f/(2-o-l),o){case i:c=(r-a)/f+(r<a?6:0);break;case r:c=(a-i)/f+2;break;case a:c=(i-r)/f+4;break}c/=6}return e.h=c,e.s=h,e.l=u,e}getRGB(e,t=lt.workingColorSpace){return lt.workingToColorSpace(gn.copy(this),t),e.r=gn.r,e.g=gn.g,e.b=gn.b,e}getStyle(e=Bn){lt.workingToColorSpace(gn.copy(this),e);const t=gn.r,i=gn.g,r=gn.b;return e!==Bn?`color(${e} ${t.toFixed(3)} ${i.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(i*255)},${Math.round(r*255)})`}offsetHSL(e,t,i){return this.getHSL(qi),this.setHSL(qi.h+e,qi.s+t,qi.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,i){return this.r=e.r+(t.r-e.r)*i,this.g=e.g+(t.g-e.g)*i,this.b=e.b+(t.b-e.b)*i,this}lerpHSL(e,t){this.getHSL(qi),e.getHSL(Xa);const i=to(qi.h,Xa.h,t),r=to(qi.s,Xa.s,t),a=to(qi.l,Xa.l,t);return this.setHSL(i,r,a),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,i=this.g,r=this.b,a=e.elements;return this.r=a[0]*t+a[3]*i+a[6]*r,this.g=a[1]*t+a[4]*i+a[7]*r,this.b=a[2]*t+a[5]*i+a[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const gn=new Mt;Mt.NAMES=Ch;class I1 extends In{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Sr,this.environmentIntensity=1,this.environmentRotation=new Sr,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),t.object.backgroundBlurriness=this.backgroundBlurriness,t.object.backgroundIntensity=this.backgroundIntensity,t.object.backgroundRotation=this.backgroundRotation.toArray(),t.object.environmentIntensity=this.environmentIntensity,t.object.environmentRotation=this.environmentRotation.toArray(),t}}const Xn=new K,wi=new K,co=new K,Ai=new K,Dr=new K,Pr=new K,Yc=new K,uo=new K,ho=new K,fo=new K,po=new kt,go=new kt,mo=new kt;class $n{constructor(e=new K,t=new K,i=new K){this.a=e,this.b=t,this.c=i}static getNormal(e,t,i,r){r.subVectors(i,t),Xn.subVectors(e,t),r.cross(Xn);const a=r.lengthSq();return a>0?r.multiplyScalar(1/Math.sqrt(a)):r.set(0,0,0)}static getBarycoord(e,t,i,r,a){Xn.subVectors(r,t),wi.subVectors(i,t),co.subVectors(e,t);const o=Xn.dot(Xn),l=Xn.dot(wi),c=Xn.dot(co),h=wi.dot(wi),u=wi.dot(co),f=o*h-l*l;if(f===0)return a.set(0,0,0),null;const d=1/f,p=(h*c-l*u)*d,g=(o*u-l*c)*d;return a.set(1-p-g,g,p)}static containsPoint(e,t,i,r){return this.getBarycoord(e,t,i,r,Ai)===null?!1:Ai.x>=0&&Ai.y>=0&&Ai.x+Ai.y<=1}static getInterpolation(e,t,i,r,a,o,l,c){return this.getBarycoord(e,t,i,r,Ai)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(a,Ai.x),c.addScaledVector(o,Ai.y),c.addScaledVector(l,Ai.z),c)}static getInterpolatedAttribute(e,t,i,r,a,o){return po.setScalar(0),go.setScalar(0),mo.setScalar(0),po.fromBufferAttribute(e,t),go.fromBufferAttribute(e,i),mo.fromBufferAttribute(e,r),o.setScalar(0),o.addScaledVector(po,a.x),o.addScaledVector(go,a.y),o.addScaledVector(mo,a.z),o}static isFrontFacing(e,t,i,r){return Xn.subVectors(i,t),wi.subVectors(e,t),Xn.cross(wi).dot(r)<0}set(e,t,i){return this.a.copy(e),this.b.copy(t),this.c.copy(i),this}setFromPointsAndIndices(e,t,i,r){return this.a.copy(e[t]),this.b.copy(e[i]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,t,i,r){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Xn.subVectors(this.c,this.b),wi.subVectors(this.a,this.b),Xn.cross(wi).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return $n.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return $n.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,i,r,a){return $n.getInterpolation(e,this.a,this.b,this.c,t,i,r,a)}containsPoint(e){return $n.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return $n.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const i=this.a,r=this.b,a=this.c;let o,l;Dr.subVectors(r,i),Pr.subVectors(a,i),uo.subVectors(e,i);const c=Dr.dot(uo),h=Pr.dot(uo);if(c<=0&&h<=0)return t.copy(i);ho.subVectors(e,r);const u=Dr.dot(ho),f=Pr.dot(ho);if(u>=0&&f<=u)return t.copy(r);const d=c*f-u*h;if(d<=0&&c>=0&&u<=0)return o=c/(c-u),t.copy(i).addScaledVector(Dr,o);fo.subVectors(e,a);const p=Dr.dot(fo),g=Pr.dot(fo);if(g>=0&&p<=g)return t.copy(a);const x=p*h-c*g;if(x<=0&&h>=0&&g<=0)return l=h/(h-g),t.copy(i).addScaledVector(Pr,l);const m=u*g-p*f;if(m<=0&&f-u>=0&&p-g>=0)return Yc.subVectors(a,r),l=(f-u)/(f-u+(p-g)),t.copy(r).addScaledVector(Yc,l);const M=1/(m+x+d);return o=x*M,l=d*M,t.copy(i).addScaledVector(Dr,o).addScaledVector(Pr,l)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}class ia{constructor(e=new K(1/0,1/0,1/0),t=new K(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t+=3)this.expandByPoint(Kn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,i=e.count;t<i;t++)this.expandByPoint(Kn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const i=Kn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const i=e.geometry;if(i!==void 0){const a=i.getAttribute("position");if(t===!0&&a!==void 0&&e.isInstancedMesh!==!0)for(let o=0,l=a.count;o<l;o++)e.isMesh===!0?e.getVertexPosition(o,Kn):Kn.fromBufferAttribute(a,o),Kn.applyMatrix4(e.matrixWorld),this.expandByPoint(Kn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Ka.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),Ka.copy(i.boundingBox)),Ka.applyMatrix4(e.matrixWorld),this.union(Ka)}const r=e.children;for(let a=0,o=r.length;a<o;a++)this.expandByObject(r[a],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Kn),Kn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,i;return e.normal.x>0?(t=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),t<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(ua),qa.subVectors(this.max,ua),Or.subVectors(e.a,ua),Ir.subVectors(e.b,ua),Nr.subVectors(e.c,ua),Zi.subVectors(Ir,Or),$i.subVectors(Nr,Ir),rr.subVectors(Or,Nr);let t=[0,-Zi.z,Zi.y,0,-$i.z,$i.y,0,-rr.z,rr.y,Zi.z,0,-Zi.x,$i.z,0,-$i.x,rr.z,0,-rr.x,-Zi.y,Zi.x,0,-$i.y,$i.x,0,-rr.y,rr.x,0];return!Mo(t,Or,Ir,Nr,qa)||(t=[1,0,0,0,1,0,0,0,1],!Mo(t,Or,Ir,Nr,qa))?!1:(Za.crossVectors(Zi,$i),t=[Za.x,Za.y,Za.z],Mo(t,Or,Ir,Nr,qa))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Kn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Kn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Ti[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Ti[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Ti[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Ti[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Ti[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Ti[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Ti[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Ti[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Ti),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const Ti=[new K,new K,new K,new K,new K,new K,new K,new K],Kn=new K,Ka=new ia,Or=new K,Ir=new K,Nr=new K,Zi=new K,$i=new K,rr=new K,ua=new K,qa=new K,Za=new K,ar=new K;function Mo(n,e,t,i,r){for(let a=0,o=n.length-3;a<=o;a+=3){ar.fromArray(n,a);const l=r.x*Math.abs(ar.x)+r.y*Math.abs(ar.y)+r.z*Math.abs(ar.z),c=e.dot(ar),h=t.dot(ar),u=i.dot(ar);if(Math.max(-Math.max(c,h,u),Math.min(c,h,u))>l)return!1}return!0}const Qt=new K,$a=new Ze;let N1=0;class mi extends Er{constructor(e,t,i=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:N1++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=i,this.usage=g1,this.updateRanges=[],this.gpuType=fi,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,i){e*=this.itemSize,i*=t.itemSize;for(let r=0,a=this.itemSize;r<a;r++)this.array[e+r]=t.array[i+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,i=this.count;t<i;t++)$a.fromBufferAttribute(this,t),$a.applyMatrix3(e),this.setXY(t,$a.x,$a.y);else if(this.itemSize===3)for(let t=0,i=this.count;t<i;t++)Qt.fromBufferAttribute(this,t),Qt.applyMatrix3(e),this.setXYZ(t,Qt.x,Qt.y,Qt.z);return this}applyMatrix4(e){for(let t=0,i=this.count;t<i;t++)Qt.fromBufferAttribute(this,t),Qt.applyMatrix4(e),this.setXYZ(t,Qt.x,Qt.y,Qt.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)Qt.fromBufferAttribute(this,t),Qt.applyNormalMatrix(e),this.setXYZ(t,Qt.x,Qt.y,Qt.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)Qt.fromBufferAttribute(this,t),Qt.transformDirection(e),this.setXYZ(t,Qt.x,Qt.y,Qt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let i=this.array[e*this.itemSize+t];return this.normalized&&(i=la(i,this.array)),i}setComponent(e,t,i){return this.normalized&&(i=An(i,this.array)),this.array[e*this.itemSize+t]=i,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=la(t,this.array)),t}setX(e,t){return this.normalized&&(t=An(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=la(t,this.array)),t}setY(e,t){return this.normalized&&(t=An(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=la(t,this.array)),t}setZ(e,t){return this.normalized&&(t=An(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=la(t,this.array)),t}setW(e,t){return this.normalized&&(t=An(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,i){return e*=this.itemSize,this.normalized&&(t=An(t,this.array),i=An(i,this.array)),this.array[e+0]=t,this.array[e+1]=i,this}setXYZ(e,t,i,r){return e*=this.itemSize,this.normalized&&(t=An(t,this.array),i=An(i,this.array),r=An(r,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=r,this}setXYZW(e,t,i,r,a){return e*=this.itemSize,this.normalized&&(t=An(t,this.array),i=An(i,this.array),r=An(r,this.array),a=An(a,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=r,this.array[e+3]=a,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return e.name=this.name,e.usage=this.usage,e.gpuType=this.gpuType,e}dispose(){this.dispatchEvent({type:"dispose"})}}class Lh extends mi{constructor(e,t,i){super(new Uint16Array(e),t,i)}}class Dh extends mi{constructor(e,t,i){super(new Uint32Array(e),t,i)}}class Bi extends mi{constructor(e,t,i){super(new Float32Array(e),t,i)}}const F1=new ia,ha=new K,xo=new K;class jl{constructor(e=new K,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const i=this.center;t!==void 0?i.copy(t):F1.setFromPoints(e).getCenter(i);let r=0;for(let a=0,o=e.length;a<o;a++)r=Math.max(r,i.distanceToSquared(e[a]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const i=this.center.distanceToSquared(e);return t.copy(e),i>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;ha.subVectors(e,this.center);const t=ha.lengthSq();if(t>this.radius*this.radius){const i=Math.sqrt(t),r=(i-this.radius)*.5;this.center.addScaledVector(ha,r/i),this.radius+=r}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(xo.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(ha.copy(e.center).add(xo)),this.expandByPoint(ha.copy(e.center).sub(xo))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}let U1=0;const Un=new Kt,_o=new In,Fr=new K,Dn=new ia,da=new ia,sn=new K;class vi extends Er{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:U1++}),this.uuid=Ia(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(m1(e)?Dh:Lh)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,i=0){this.groups.push({start:e,count:t,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const a=new qe().getNormalMatrix(e);i.applyNormalMatrix(a),i.needsUpdate=!0}const r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return Un.makeRotationFromQuaternion(e),this.applyMatrix4(Un),this}rotateX(e){return Un.makeRotationX(e),this.applyMatrix4(Un),this}rotateY(e){return Un.makeRotationY(e),this.applyMatrix4(Un),this}rotateZ(e){return Un.makeRotationZ(e),this.applyMatrix4(Un),this}translate(e,t,i){return Un.makeTranslation(e,t,i),this.applyMatrix4(Un),this}scale(e,t,i){return Un.makeScale(e,t,i),this.applyMatrix4(Un),this}lookAt(e){return _o.lookAt(e),_o.updateMatrix(),this.applyMatrix4(_o.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Fr).negate(),this.translate(Fr.x,Fr.y,Fr.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const i=[];for(let r=0,a=e.length;r<a;r++){const o=e[r];i.push(o.x,o.y,o.z||0)}this.setAttribute("position",new Bi(i,3))}else{const i=Math.min(e.length,t.count);for(let r=0;r<i;r++){const a=e[r];t.setXYZ(r,a.x,a.y,a.z||0)}e.length>t.count&&Ke("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new ia);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){pt("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new K(-1/0,-1/0,-1/0),new K(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let i=0,r=t.length;i<r;i++){const a=t[i];Dn.setFromBufferAttribute(a),this.morphTargetsRelative?(sn.addVectors(this.boundingBox.min,Dn.min),this.boundingBox.expandByPoint(sn),sn.addVectors(this.boundingBox.max,Dn.max),this.boundingBox.expandByPoint(sn)):(this.boundingBox.expandByPoint(Dn.min),this.boundingBox.expandByPoint(Dn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&pt('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new jl);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){pt("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new K,1/0);return}if(e){const i=this.boundingSphere.center;if(Dn.setFromBufferAttribute(e),t)for(let a=0,o=t.length;a<o;a++){const l=t[a];da.setFromBufferAttribute(l),this.morphTargetsRelative?(sn.addVectors(Dn.min,da.min),Dn.expandByPoint(sn),sn.addVectors(Dn.max,da.max),Dn.expandByPoint(sn)):(Dn.expandByPoint(da.min),Dn.expandByPoint(da.max))}Dn.getCenter(i);let r=0;for(let a=0,o=e.count;a<o;a++)sn.fromBufferAttribute(e,a),r=Math.max(r,i.distanceToSquared(sn));if(t)for(let a=0,o=t.length;a<o;a++){const l=t[a],c=this.morphTargetsRelative;for(let h=0,u=l.count;h<u;h++)sn.fromBufferAttribute(l,h),c&&(Fr.fromBufferAttribute(e,h),sn.add(Fr)),r=Math.max(r,i.distanceToSquared(sn))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&pt('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){pt("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=t.position,r=t.normal,a=t.uv;let o=this.getAttribute("tangent");(o===void 0||o.count!==i.count)&&(o=new mi(new Float32Array(4*i.count),4),this.setAttribute("tangent",o));const l=[],c=[];for(let S=0;S<i.count;S++)l[S]=new K,c[S]=new K;const h=new K,u=new K,f=new K,d=new Ze,p=new Ze,g=new Ze,x=new K,m=new K;function M(S,y,C){h.fromBufferAttribute(i,S),u.fromBufferAttribute(i,y),f.fromBufferAttribute(i,C),d.fromBufferAttribute(a,S),p.fromBufferAttribute(a,y),g.fromBufferAttribute(a,C),u.sub(h),f.sub(h),p.sub(d),g.sub(d);const I=1/(p.x*g.y-g.x*p.y);isFinite(I)&&(x.copy(u).multiplyScalar(g.y).addScaledVector(f,-p.y).multiplyScalar(I),m.copy(f).multiplyScalar(p.x).addScaledVector(u,-g.x).multiplyScalar(I),l[S].add(x),l[y].add(x),l[C].add(x),c[S].add(m),c[y].add(m),c[C].add(m))}let _=this.groups;_.length===0&&(_=[{start:0,count:e.count}]);for(let S=0,y=_.length;S<y;++S){const C=_[S],I=C.start,L=C.count;for(let N=I,O=I+L;N<O;N+=3)M(e.getX(N+0),e.getX(N+1),e.getX(N+2))}const A=new K,E=new K,R=new K,T=new K;function P(S){R.fromBufferAttribute(r,S),T.copy(R);const y=l[S];A.copy(y),A.sub(R.multiplyScalar(R.dot(y))).normalize(),E.crossVectors(T,y);const I=E.dot(c[S])<0?-1:1;o.setXYZW(S,A.x,A.y,A.z,I)}for(let S=0,y=_.length;S<y;++S){const C=_[S],I=C.start,L=C.count;for(let N=I,O=I+L;N<O;N+=3)P(e.getX(N+0)),P(e.getX(N+1)),P(e.getX(N+2))}this._transformed=!0}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let i=this.getAttribute("normal");if(i===void 0||i.count!==t.count)i=new mi(new Float32Array(t.count*3),3),this.setAttribute("normal",i);else for(let d=0,p=i.count;d<p;d++)i.setXYZ(d,0,0,0);const r=new K,a=new K,o=new K,l=new K,c=new K,h=new K,u=new K,f=new K;if(e)for(let d=0,p=e.count;d<p;d+=3){const g=e.getX(d+0),x=e.getX(d+1),m=e.getX(d+2);r.fromBufferAttribute(t,g),a.fromBufferAttribute(t,x),o.fromBufferAttribute(t,m),u.subVectors(o,a),f.subVectors(r,a),u.cross(f),l.fromBufferAttribute(i,g),c.fromBufferAttribute(i,x),h.fromBufferAttribute(i,m),l.add(u),c.add(u),h.add(u),i.setXYZ(g,l.x,l.y,l.z),i.setXYZ(x,c.x,c.y,c.z),i.setXYZ(m,h.x,h.y,h.z)}else for(let d=0,p=t.count;d<p;d+=3)r.fromBufferAttribute(t,d+0),a.fromBufferAttribute(t,d+1),o.fromBufferAttribute(t,d+2),u.subVectors(o,a),f.subVectors(r,a),u.cross(f),i.setXYZ(d+0,u.x,u.y,u.z),i.setXYZ(d+1,u.x,u.y,u.z),i.setXYZ(d+2,u.x,u.y,u.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,i=e.count;t<i;t++)sn.fromBufferAttribute(e,t),sn.normalize(),e.setXYZ(t,sn.x,sn.y,sn.z)}toNonIndexed(){function e(l,c){const h=l.array,u=l.itemSize,f=l.normalized,d=new h.constructor(c.length*u);let p=0,g=0;for(let x=0,m=c.length;x<m;x++){l.isInterleavedBufferAttribute?p=c[x]*l.data.stride+l.offset:p=c[x]*u;for(let M=0;M<u;M++)d[g++]=h[p++]}return new mi(d,u,f)}if(this.index===null)return Ke("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new vi,i=this.index.array,r=this.attributes;for(const l in r){const c=r[l],h=e(c,i);t.setAttribute(l,h)}const a=this.morphAttributes;for(const l in a){const c=[],h=a[l];for(let u=0,f=h.length;u<f;u++){const d=h[u],p=e(d,i);c.push(p)}t.morphAttributes[l]=c}t.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let l=0,c=o.length;l<c;l++){const h=o[l];t.addGroup(h.start,h.count,h.materialIndex)}return t}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,e.name=this.name,Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){const c=this.parameters;for(const h in c)c[h]!==void 0&&(e[h]=c[h]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const i=this.attributes;for(const c in i){const h=i[c];e.data.attributes[c]=h.toJSON(e.data)}const r={};let a=!1;for(const c in this.morphAttributes){const h=this.morphAttributes[c],u=[];for(let f=0,d=h.length;f<d;f++){const p=h[f];u.push(p.toJSON(e.data))}u.length>0&&(r[c]=u,a=!0)}a&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));const l=this.boundingSphere;return l!==null&&(e.data.boundingSphere=l.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const i=e.index;i!==null&&this.setIndex(i.clone());const r=e.attributes;for(const h in r){const u=r[h];this.setAttribute(h,u.clone(t))}const a=e.morphAttributes;for(const h in a){const u=[],f=a[h];for(let d=0,p=f.length;d<p;d++)u.push(f[d].clone(t));this.morphAttributes[h]=u}this.morphTargetsRelative=e.morphTargetsRelative;const o=e.groups;for(let h=0,u=o.length;h<u;h++){const f=o[h];this.addGroup(f.start,f.count,f.materialIndex)}const l=e.boundingBox;l!==null&&(this.boundingBox=l.clone());const c=e.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}}const vo=new K,B1=new K,k1=new qe;class Qi{constructor(e=new K(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,i,r){return this.normal.set(e,t,i),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,i){const r=vo.subVectors(i,t).cross(B1.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,i=!0){const r=e.delta(vo),a=this.normal.dot(r);if(a===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const o=-(e.start.dot(this.normal)+this.constant)/a;return i===!0&&(o<0||o>1)?null:t.copy(e.start).addScaledVector(r,o)}intersectsLine(e){const t=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return t<0&&i>0||i<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const i=t||k1.getNormalMatrix(e),r=this.coplanarPoint(vo).applyMatrix4(e),a=this.normal.applyMatrix3(i).normalize();return this.constant=-r.dot(a),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(e){return this.normal.fromArray(e.normal),this.constant=e.constant,this}}let z1=0;class ks extends Er{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:z1++}),this.uuid=Ia(),this.name="",this.type="Material",this.blending=ya,this.side=_r,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=oh,this.blendDst=lh,this.blendEquation=Hr,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Mt(0,0,0),this.blendAlpha=0,this.depthFunc=Ta,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=l1,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=js,this.stencilZFail=js,this.stencilZPass=js,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const i=e[t];if(i===void 0){Ke(`Material: parameter '${t}' has value of undefined.`);continue}const r=this[t];if(r===void 0){Ke(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(i):r&&r.isVector2&&i&&i.isVector2||r&&r.isEuler&&i&&i.isEuler||r&&r.isVector3&&i&&i.isVector3?r.copy(i):this[t]=i}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const i={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,i.blending=this.blending,i.side=this.side,i.shadowSide=this.shadowSide,i.vertexColors=this.vertexColors,i.opacity=this.opacity,i.transparent=this.transparent,i.blendSrc=this.blendSrc,i.blendDst=this.blendDst,i.blendEquation=this.blendEquation,i.blendSrcAlpha=this.blendSrcAlpha,i.blendDstAlpha=this.blendDstAlpha,i.blendEquationAlpha=this.blendEquationAlpha,i.blendColor=this.blendColor.getHex(),i.blendAlpha=this.blendAlpha,i.depthFunc=this.depthFunc,i.depthTest=this.depthTest,i.depthWrite=this.depthWrite,i.colorWrite=this.colorWrite,i.clipIntersection=this.clipIntersection,i.clipShadows=this.clipShadows,i.stencilWriteMask=this.stencilWriteMask,i.stencilFunc=this.stencilFunc,i.stencilRef=this.stencilRef,i.stencilFuncMask=this.stencilFuncMask,i.stencilFail=this.stencilFail,i.stencilZFail=this.stencilZFail,i.stencilZPass=this.stencilZPass,i.stencilWrite=this.stencilWrite,i.polygonOffset=this.polygonOffset,i.polygonOffsetFactor=this.polygonOffsetFactor,i.polygonOffsetUnits=this.polygonOffsetUnits,i.dithering=this.dithering,i.alphaTest=this.alphaTest,i.alphaHash=this.alphaHash,i.alphaToCoverage=this.alphaToCoverage,i.premultipliedAlpha=this.premultipliedAlpha,i.forceSinglePass=this.forceSinglePass,i.allowOverride=this.allowOverride,i.visible=this.visible,i.toneMapped=this.toneMapped,i.name=this.name,this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(i.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(i.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(i.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(i.clippingPlanes=this.clippingPlanes.map(a=>a.toJSON())),this.rotation!==void 0&&(i.rotation=this.rotation),this.depthPacking!==void 0&&(i.depthPacking=this.depthPacking),this.linewidth!==void 0&&(i.linewidth=this.linewidth),this.linecap!==void 0&&(i.linecap=this.linecap),this.linejoin!==void 0&&(i.linejoin=this.linejoin),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.wireframe!==void 0&&(i.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(i.flatShading=this.flatShading),this.fog!==void 0&&(i.fog=this.fog),Object.keys(this.userData).length>0&&(i.userData=this.userData);function r(a){const o=[];for(const l in a){const c=a[l];delete c.metadata,o.push(c)}return o}if(t){const a=r(e.textures),o=r(e.images);a.length>0&&(i.textures=a),o.length>0&&(i.images=o)}return i}fromJSON(e,t){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new Mt().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.retroreflectivity!==void 0&&(this.retroreflectivity=e.retroreflectivity),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=e.iridescenceThicknessRange),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.clippingPlanes!==void 0&&(this.clippingPlanes=e.clippingPlanes.map(i=>new Qi().fromJSON(i))),e.clipIntersection!==void 0&&(this.clipIntersection=e.clipIntersection),e.clipShadows!==void 0&&(this.clipShadows=e.clipShadows),e.depthPacking!==void 0&&(this.depthPacking=e.depthPacking),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.linecap!==void 0&&(this.linecap=e.linecap),e.linejoin!==void 0&&(this.linejoin=e.linejoin),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(typeof e.vertexColors=="number"?this.vertexColors=e.vertexColors>0:this.vertexColors=e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=t[e.map]||null),e.matcap!==void 0&&(this.matcap=t[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=t[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=t[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=t[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let i=e.normalScale;Array.isArray(i)===!1&&(i=[i,i]),this.normalScale=new Ze().fromArray(i)}return e.displacementMap!==void 0&&(this.displacementMap=t[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=t[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=t[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=t[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=t[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=t[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=t[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=t[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=t[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=t[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=t[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=t[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=t[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=t[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new Ze().fromArray(e.clearcoatNormalScale)),e.iridescenceMap!==void 0&&(this.iridescenceMap=t[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=t[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=t[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=t[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=t[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=t[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=t[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let i=null;if(t!==null){const r=t.length;i=new Array(r);for(let a=0;a!==r;++a)i[a]=t[a].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}const Ri=new K,bo=new K,Ja=new K,Qa=new K;class H1{constructor(e=new K,t=new K(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Ri)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const i=t.dot(this.direction);return i<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=Ri.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Ri.copy(this.origin).addScaledVector(this.direction,t),Ri.distanceToSquared(e))}distanceSqToSegment(e,t,i,r){bo.copy(e).add(t).multiplyScalar(.5),Ja.copy(t).sub(e).normalize(),Qa.copy(this.origin).sub(bo);const a=e.distanceTo(t)*.5,o=-this.direction.dot(Ja),l=Qa.dot(this.direction),c=-Qa.dot(Ja),h=Qa.lengthSq(),u=Math.abs(1-o*o);let f,d,p,g;if(u>0)if(f=o*c-l,d=o*l-c,g=a*u,f>=0)if(d>=-g)if(d<=g){const x=1/u;f*=x,d*=x,p=f*(f+o*d+2*l)+d*(o*f+d+2*c)+h}else d=a,f=Math.max(0,-(o*d+l)),p=-f*f+d*(d+2*c)+h;else d=-a,f=Math.max(0,-(o*d+l)),p=-f*f+d*(d+2*c)+h;else d<=-g?(f=Math.max(0,-(-o*a+l)),d=f>0?-a:Math.min(Math.max(-a,-c),a),p=-f*f+d*(d+2*c)+h):d<=g?(f=0,d=Math.min(Math.max(-a,-c),a),p=d*(d+2*c)+h):(f=Math.max(0,-(o*a+l)),d=f>0?a:Math.min(Math.max(-a,-c),a),p=-f*f+d*(d+2*c)+h);else d=o>0?-a:a,f=Math.max(0,-(o*d+l)),p=-f*f+d*(d+2*c)+h;return i&&i.copy(this.origin).addScaledVector(this.direction,f),r&&r.copy(bo).addScaledVector(Ja,d),p}intersectSphere(e,t){if(e.radius<0)return null;Ri.subVectors(e.center,this.origin);const i=Ri.dot(this.direction),r=Ri.dot(Ri)-i*i,a=e.radius*e.radius;if(r>a)return null;const o=Math.sqrt(a-r),l=i-o,c=i+o;return c<0?null:l<0?this.at(c,t):this.at(l,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(e.normal)+e.constant)/t;return i>=0?i:null}intersectPlane(e,t){const i=this.distanceToPlane(e);return i===null?null:this.at(i,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let i,r,a,o,l,c;const h=1/this.direction.x,u=1/this.direction.y,f=1/this.direction.z,d=this.origin;return h>=0?(i=(e.min.x-d.x)*h,r=(e.max.x-d.x)*h):(i=(e.max.x-d.x)*h,r=(e.min.x-d.x)*h),u>=0?(a=(e.min.y-d.y)*u,o=(e.max.y-d.y)*u):(a=(e.max.y-d.y)*u,o=(e.min.y-d.y)*u),i>o||a>r||((a>i||isNaN(i))&&(i=a),(o<r||isNaN(r))&&(r=o),f>=0?(l=(e.min.z-d.z)*f,c=(e.max.z-d.z)*f):(l=(e.max.z-d.z)*f,c=(e.min.z-d.z)*f),i>c||l>r)||((l>i||i!==i)&&(i=l),(c<r||r!==r)&&(r=c),r<0)?null:this.at(i>=0?i:r,t)}intersectsBox(e){return this.intersectBox(e,Ri)!==null}intersectTriangle(e,t,i,r,a){const o=this.origin,l=this.direction,c=l.x,h=l.y,u=l.z,f=e.x-o.x,d=e.y-o.y,p=e.z-o.z,g=t.x-o.x,x=t.y-o.y,m=t.z-o.z,M=i.x-o.x,_=i.y-o.y,A=i.z-o.z,E=Math.abs(c),R=Math.abs(h),T=Math.abs(u);let P,S,y,C,I,L,N,O,U,W,F,Q;if(E>=R&&E>=T?(y=c,L=f,U=g,Q=M,c>=0?(P=h,S=u,C=d,I=p,N=x,O=m,W=_,F=A):(P=u,S=h,C=p,I=d,N=m,O=x,W=A,F=_)):R>=T?(y=h,L=d,U=x,Q=_,h>=0?(P=u,S=c,C=p,I=f,N=m,O=g,W=A,F=M):(P=c,S=u,C=f,I=p,N=g,O=m,W=M,F=A)):(y=u,L=p,U=m,Q=A,u>=0?(P=c,S=h,C=f,I=d,N=g,O=x,W=M,F=_):(P=h,S=c,C=d,I=f,N=x,O=g,W=_,F=M)),y===0)return null;const X=P/y,te=S/y,B=1/y,ae=C-X*L,ue=I-te*L,Pe=N-X*U,He=O-te*U,Xe=W-X*Q,ee=F-te*Q,re=Xe*He-ee*Pe,V=ae*ee-ue*Xe,he=Pe*ue-He*ae;if(r){if(re<0||V<0||he<0)return null}else if((re<0||V<0||he<0)&&(re>0||V>0||he>0))return null;const se=re+V+he;if(se===0)return null;const Ae=B*(re*L+V*U+he*Q);return(se>0?Ae<0:Ae>0)?null:this.at(Ae/se,a)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Ph extends ks{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Mt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Sr,this.combine=ch,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const Xc=new Kt,sr=new H1,ja=new jl,Kc=new K,es=new K,ts=new K,ns=new K,So=new K,is=new K,qc=new K,rs=new K;class wn extends In{constructor(e=new vi,t=new Ph){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const r=t[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let a=0,o=r.length;a<o;a++){const l=r[a].name||String(a);this.morphTargetInfluences.push(0),this.morphTargetDictionary[l]=a}}}}getVertexPosition(e,t){const i=this.geometry,r=i.attributes.position,a=i.morphAttributes.position,o=i.morphTargetsRelative;t.fromBufferAttribute(r,e);const l=this.morphTargetInfluences;if(a&&l){is.set(0,0,0);for(let c=0,h=a.length;c<h;c++){const u=l[c],f=a[c];u!==0&&(So.fromBufferAttribute(f,e),o?is.addScaledVector(So,u):is.addScaledVector(So.sub(t),u))}t.add(is)}return t}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){const i=this.geometry,r=this.material,a=this.matrixWorld;r!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),ja.copy(i.boundingSphere),ja.applyMatrix4(a),sr.copy(e.ray).recast(e.near),!(ja.containsPoint(sr.origin)===!1&&(sr.intersectSphere(ja,Kc)===null||sr.origin.distanceToSquared(Kc)>(e.far-e.near)**2))&&(Xc.copy(a).invert(),sr.copy(e.ray).applyMatrix4(Xc),!(i.boundingBox!==null&&sr.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,t,sr)))}_computeIntersections(e,t,i){let r;const a=this.geometry,o=this.material,l=a.index,c=a.attributes.position,h=a.attributes.uv,u=a.attributes.uv1,f=a.attributes.normal,d=a.groups,p=a.drawRange;if(l!==null)if(Array.isArray(o))for(let g=0,x=d.length;g<x;g++){const m=d[g],M=o[m.materialIndex],_=Math.max(m.start,p.start),A=Math.min(l.count,Math.min(m.start+m.count,p.start+p.count));for(let E=_,R=A;E<R;E+=3){const T=l.getX(E),P=l.getX(E+1),S=l.getX(E+2);r=as(this,M,e,i,h,u,f,T,P,S),r&&(r.faceIndex=Math.floor(E/3),r.face.materialIndex=m.materialIndex,t.push(r))}}else{const g=Math.max(0,p.start),x=Math.min(l.count,p.start+p.count);for(let m=g,M=x;m<M;m+=3){const _=l.getX(m),A=l.getX(m+1),E=l.getX(m+2);r=as(this,o,e,i,h,u,f,_,A,E),r&&(r.faceIndex=Math.floor(m/3),t.push(r))}}else if(c!==void 0)if(Array.isArray(o))for(let g=0,x=d.length;g<x;g++){const m=d[g],M=o[m.materialIndex],_=Math.max(m.start,p.start),A=Math.min(c.count,Math.min(m.start+m.count,p.start+p.count));for(let E=_,R=A;E<R;E+=3){const T=E,P=E+1,S=E+2;r=as(this,M,e,i,h,u,f,T,P,S),r&&(r.faceIndex=Math.floor(E/3),r.face.materialIndex=m.materialIndex,t.push(r))}}else{const g=Math.max(0,p.start),x=Math.min(c.count,p.start+p.count);for(let m=g,M=x;m<M;m+=3){const _=m,A=m+1,E=m+2;r=as(this,o,e,i,h,u,f,_,A,E),r&&(r.faceIndex=Math.floor(m/3),t.push(r))}}}}function G1(n,e,t,i,r,a,o,l){let c;if(e.side===Cn?c=i.intersectTriangle(o,a,r,!0,l):c=i.intersectTriangle(r,a,o,e.side===_r,l),c===null)return null;rs.copy(l),rs.applyMatrix4(n.matrixWorld);const h=t.ray.origin.distanceTo(rs);return h<t.near||h>t.far?null:{distance:h,point:rs.clone(),object:n}}function as(n,e,t,i,r,a,o,l,c,h){n.getVertexPosition(l,es),n.getVertexPosition(c,ts),n.getVertexPosition(h,ns);const u=G1(n,e,t,i,es,ts,ns,qc);if(u){const f=new K;$n.getBarycoord(qc,es,ts,ns,f),r&&(u.uv=$n.getInterpolatedAttribute(r,l,c,h,f,new Ze)),a&&(u.uv1=$n.getInterpolatedAttribute(a,l,c,h,f,new Ze)),o&&(u.normal=$n.getInterpolatedAttribute(o,l,c,h,f,new K),u.normal.dot(i.direction)>0&&u.normal.multiplyScalar(-1));const d={a:l,b:c,c:h,normal:new K,materialIndex:0};$n.getNormal(es,ts,ns,d.normal),u.face=d,u.barycoord=f}return u}class Yr extends yn{constructor(e=null,t=1,i=1,r,a,o,l,c,h=tn,u=tn,f,d){super(null,o,l,c,h,u,r,a,f,d),this.isDataTexture=!0,this.image={data:e,width:t,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Oh extends mi{constructor(e,t,i,r=1){super(e,t,i),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=r}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const or=new jl,W1=new Ze(.5,.5),ss=new K;class ec{constructor(e=new Qi,t=new Qi,i=new Qi,r=new Qi,a=new Qi,o=new Qi){this.planes=[e,t,i,r,a,o]}set(e,t,i,r,a,o){const l=this.planes;return l[0].copy(e),l[1].copy(t),l[2].copy(i),l[3].copy(r),l[4].copy(a),l[5].copy(o),this}copy(e){const t=this.planes;for(let i=0;i<6;i++)t[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,t=pi,i=!1){const r=this.planes,a=e.elements,o=a[0],l=a[1],c=a[2],h=a[3],u=a[4],f=a[5],d=a[6],p=a[7],g=a[8],x=a[9],m=a[10],M=a[11],_=a[12],A=a[13],E=a[14],R=a[15];if(r[0].setComponents(h-o,p-u,M-g,R-_).normalize(),r[1].setComponents(h+o,p+u,M+g,R+_).normalize(),r[2].setComponents(h+l,p+f,M+x,R+A).normalize(),r[3].setComponents(h-l,p-f,M-x,R-A).normalize(),i)r[4].setComponents(c,d,m,E).normalize(),r[5].setComponents(h-c,p-d,M-m,R-E).normalize();else if(r[4].setComponents(h-c,p-d,M-m,R-E).normalize(),t===pi)r[5].setComponents(h+c,p+d,M+m,R+E).normalize();else if(t===Ds)r[5].setComponents(c,d,m,E).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),or.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),or.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(or)}intersectsSprite(e){or.center.set(0,0,0);const t=W1.distanceTo(e.center);return or.radius=.7071067811865476+t,or.applyMatrix4(e.matrixWorld),this.intersectsSphere(or)}intersectsSphere(e){const t=this.planes,i=e.center,r=-e.radius;for(let a=0;a<6;a++)if(t[a].distanceToPoint(i)<r)return!1;return!0}intersectsBox(e){const t=this.planes;for(let i=0;i<6;i++){const r=t[i];if(ss.x=r.normal.x>0?e.max.x:e.min.x,ss.y=r.normal.y>0?e.max.y:e.min.y,ss.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(ss)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let i=0;i<6;i++)if(t[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class Ih extends yn{constructor(e=[],t=vr,i,r,a,o,l,c,h,u){super(e,t,i,r,a,o,l,c,h,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class Da extends yn{constructor(e,t,i=xi,r,a,o,l=tn,c=tn,h,u=zi,f=1){if(u!==zi&&u!==pr)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const d={width:e,height:t,depth:f};super(d,r,a,o,l,c,u,i,h),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new Ql(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return t.compareFunction=this.compareFunction,t}}class V1 extends Da{constructor(e,t=xi,i=vr,r,a,o=tn,l=tn,c,h=zi){const u={width:e,height:e,depth:1},f=[u,u,u,u,u,u];super(e,e,t,i,r,a,o,l,c,h),this.image=f,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}}class Nh extends yn{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}}class Na extends vi{constructor(e=1,t=1,i=1,r=1,a=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:i,widthSegments:r,heightSegments:a,depthSegments:o};const l=this;r=Math.floor(r),a=Math.floor(a),o=Math.floor(o);const c=[],h=[],u=[],f=[];let d=0,p=0;g("z","y","x",-1,-1,i,t,e,o,a,0),g("z","y","x",1,-1,i,t,-e,o,a,1),g("x","z","y",1,1,e,i,t,r,o,2),g("x","z","y",1,-1,e,i,-t,r,o,3),g("x","y","z",1,-1,e,t,i,r,a,4),g("x","y","z",-1,-1,e,t,-i,r,a,5),this.setIndex(c),this.setAttribute("position",new Bi(h,3)),this.setAttribute("normal",new Bi(u,3)),this.setAttribute("uv",new Bi(f,2));function g(x,m,M,_,A,E,R,T,P,S,y){const C=E/P,I=R/S,L=E/2,N=R/2,O=T/2,U=P+1,W=S+1;let F=0,Q=0;const X=new K;for(let te=0;te<W;te++){const B=te*I-N;for(let ae=0;ae<U;ae++){const ue=ae*C-L;X[x]=ue*_,X[m]=B*A,X[M]=O,h.push(X.x,X.y,X.z),X[x]=0,X[m]=0,X[M]=T>0?1:-1,u.push(X.x,X.y,X.z),f.push(ae/P),f.push(1-te/S),F+=1}}for(let te=0;te<S;te++)for(let B=0;B<P;B++){const ae=d+B+U*te,ue=d+B+U*(te+1),Pe=d+(B+1)+U*(te+1),He=d+(B+1)+U*te;c.push(ae,ue,He),c.push(ue,Pe,He),Q+=6}l.addGroup(p,Q,y),p+=Q,d+=F}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Na(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}class bi extends vi{constructor(e=1,t=1,i=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:i,heightSegments:r};const a=e/2,o=t/2,l=Math.floor(i),c=Math.floor(r),h=l+1,u=c+1,f=e/l,d=t/c,p=[],g=[],x=[],m=[];for(let M=0;M<u;M++){const _=M*d-o;for(let A=0;A<h;A++){const E=A*f-a;g.push(E,-_,0),x.push(0,0,1),m.push(A/l),m.push(1-M/c)}}for(let M=0;M<c;M++)for(let _=0;_<l;_++){const A=_+h*M,E=_+h*(M+1),R=_+1+h*(M+1),T=_+1+h*M;p.push(A,E,T),p.push(E,R,T)}this.setIndex(p),this.setAttribute("position",new Bi(g,3)),this.setAttribute("normal",new Bi(x,3)),this.setAttribute("uv",new Bi(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new bi(e.width,e.height,e.widthSegments,e.heightSegments)}}function Qr(n){const e={};for(const t in n){e[t]={};for(const i in n[t]){const r=n[t][i];if(Zc(r))r.isRenderTargetTexture?(Ke("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][i]=null):e[t][i]=r.clone();else if(Array.isArray(r))if(Zc(r[0])){const a=[];for(let o=0,l=r.length;o<l;o++)a[o]=r[o].clone();e[t][i]=a}else e[t][i]=r.slice();else e[t][i]=r}}return e}function Sn(n){const e={};for(let t=0;t<n.length;t++){const i=Qr(n[t]);for(const r in i)e[r]=i[r]}return e}function Zc(n){return n&&(n.isColor||n.isMatrix3||n.isMatrix4||n.isVector2||n.isVector3||n.isVector4||n.isTexture||n.isQuaternion)}function Y1(n){const e=[];for(let t=0;t<n.length;t++)e.push(n[t].clone());return e}function Fh(n){const e=n.getRenderTarget();return e===null?n.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:lt.workingColorSpace}const X1={clone:Qr,merge:Sn};var K1=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,q1=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class vn extends ks{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=K1,this.fragmentShader=q1,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Qr(e.uniforms),this.uniformsGroups=Y1(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const r in this.uniforms){const o=this.uniforms[r].value;o&&o.isTexture?t.uniforms[r]={type:"t",value:o.toJSON(e).uuid}:o&&o.isColor?t.uniforms[r]={type:"c",value:o.getHex()}:o&&o.isVector2?t.uniforms[r]={type:"v2",value:o.toArray()}:o&&o.isVector3?t.uniforms[r]={type:"v3",value:o.toArray()}:o&&o.isVector4?t.uniforms[r]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?t.uniforms[r]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?t.uniforms[r]={type:"m4",value:o.toArray()}:t.uniforms[r]={value:o}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const i={};for(const r in this.extensions)this.extensions[r]===!0&&(i[r]=!0);return Object.keys(i).length>0&&(t.extensions=i),t}fromJSON(e,t){if(super.fromJSON(e,t),e.uniforms!==void 0)for(const i in e.uniforms){const r=e.uniforms[i];switch(this.uniforms[i]={},r.type){case"t":this.uniforms[i].value=t[r.value]||null;break;case"c":this.uniforms[i].value=new Mt().setHex(r.value);break;case"v2":this.uniforms[i].value=new Ze().fromArray(r.value);break;case"v3":this.uniforms[i].value=new K().fromArray(r.value);break;case"v4":this.uniforms[i].value=new kt().fromArray(r.value);break;case"m3":this.uniforms[i].value=new qe().fromArray(r.value);break;case"m4":this.uniforms[i].value=new Kt().fromArray(r.value);break;default:this.uniforms[i].value=r.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(const i in e.extensions)this.extensions[i]=e.extensions[i];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}}class Z1 extends vn{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class $1 extends ks{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=s1,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class J1 extends ks{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const os=new K,ls=new na,ii=new K;class Uh extends In{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Kt,this.projectionMatrix=new Kt,this.projectionMatrixInverse=new Kt,this.coordinateSystem=pi,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(os,ls,ii),ii.x===1&&ii.y===1&&ii.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(os,ls,ii.set(1,1,1)).invert()}updateWorldMatrix(e,t,i=!1){super.updateWorldMatrix(e,t,i),this.matrixWorld.decompose(os,ls,ii),ii.x===1&&ii.y===1&&ii.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(os,ls,ii.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}const Ji=new K,$c=new Ze,Jc=new Ze;class kn extends Uh{constructor(e=50,t=1,i=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=wl*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(eo*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return wl*2*Math.atan(Math.tan(eo*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,i){Ji.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Ji.x,Ji.y).multiplyScalar(-e/Ji.z),Ji.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(Ji.x,Ji.y).multiplyScalar(-e/Ji.z)}getViewSize(e,t){return this.getViewBounds(e,$c,Jc),t.subVectors(Jc,$c)}setViewOffset(e,t,i,r,a,o){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=r,this.view.width=a,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(eo*.5*this.fov)/this.zoom,i=2*t,r=this.aspect*i,a=-.5*r;const o=this.view;if(this.view!==null&&this.view.enabled){const c=o.fullWidth,h=o.fullHeight;a+=o.offsetX*r/c,t-=o.offsetY*i/h,r*=o.width/c,i*=o.height/h}const l=this.filmOffset;l!==0&&(a+=e*l/this.getFilmWidth()),this.projectionMatrix.makePerspective(a,a+r,t,t-i,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}class tc extends Uh{constructor(e=-1,t=1,i=1,r=-1,a=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=i,this.bottom=r,this.near=a,this.far=o,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,i,r,a,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=r,this.view.width=a,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,r=(this.top+this.bottom)/2;let a=i-e,o=i+e,l=r+t,c=r-t;if(this.view!==null&&this.view.enabled){const h=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;a+=h*this.view.offsetX,o=a+h*this.view.width,l-=u*this.view.offsetY,c=l-u*this.view.height}this.projectionMatrix.makeOrthographic(a,o,l,c,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}class Bh extends vi{constructor(){super(),this.isInstancedBufferGeometry=!0,this.type="InstancedBufferGeometry",this.instanceCount=1/0}copy(e){return super.copy(e),this.instanceCount=e.instanceCount,this}toJSON(){const e=super.toJSON();return e.instanceCount=this.instanceCount,e.isInstancedBufferGeometry=!0,e}}const Ur=-90,Br=1;class Q1 extends In{constructor(e,t,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const r=new kn(Ur,Br,e,t);r.layers=this.layers,this.add(r);const a=new kn(Ur,Br,e,t);a.layers=this.layers,this.add(a);const o=new kn(Ur,Br,e,t);o.layers=this.layers,this.add(o);const l=new kn(Ur,Br,e,t);l.layers=this.layers,this.add(l);const c=new kn(Ur,Br,e,t);c.layers=this.layers,this.add(c);const h=new kn(Ur,Br,e,t);h.layers=this.layers,this.add(h)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[i,r,a,o,l,c]=t;for(const h of t)this.remove(h);if(e===pi)i.up.set(0,1,0),i.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),a.up.set(0,0,-1),a.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),l.up.set(0,1,0),l.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(e===Ds)i.up.set(0,-1,0),i.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),a.up.set(0,0,1),a.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),l.up.set(0,-1,0),l.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const h of t)this.add(h),h.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[a,o,l,c,h,u]=this.children,f=e.getRenderTarget(),d=e.getActiveCubeFace(),p=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;const x=i.texture.generateMipmaps;i.texture.generateMipmaps=!1;let m=!1;e.isWebGLRenderer===!0?m=e.state.buffers.depth.getReversed():m=e.reversedDepthBuffer,e.setRenderTarget(i,0,r),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(i,1,r),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(i,2,r),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),e.setRenderTarget(i,3,r),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),e.setRenderTarget(i,4,r),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,h),i.texture.generateMipmaps=x,e.setRenderTarget(i,5,r),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,u),e.setRenderTarget(f,d,p),e.xr.enabled=g,i.texture.needsPMREMUpdate=!0}}class j1 extends kn{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}class kh{static{kh.prototype.isMatrix2=!0}constructor(e,t,i,r){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,i,r)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let i=0;i<4;i++)this.elements[i]=e[i+t];return this}set(e,t,i,r){const a=this.elements;return a[0]=e,a[2]=t,a[1]=i,a[3]=r,this}}function Qc(n,e,t,i){const r=eg(i);switch(t){case Sh:return n*e;case yh:return n*e/r.components*r.byteLength;case Kl:return n*e/r.components*r.byteLength;case br:return n*e*2/r.components*r.byteLength;case ql:return n*e*2/r.components*r.byteLength;case Eh:return n*e*3/r.components*r.byteLength;case Hn:return n*e*4/r.components*r.byteLength;case Zl:return n*e*4/r.components*r.byteLength;case vs:case bs:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case Ss:case Es:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case $o:case Qo:return Math.max(n,16)*Math.max(e,8)/4;case Zo:case Jo:return Math.max(n,8)*Math.max(e,8)/2;case jo:case el:case nl:case il:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case tl:case Rs:case rl:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case al:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case sl:return Math.floor((n+4)/5)*Math.floor((e+3)/4)*16;case ol:return Math.floor((n+4)/5)*Math.floor((e+4)/5)*16;case ll:return Math.floor((n+5)/6)*Math.floor((e+4)/5)*16;case cl:return Math.floor((n+5)/6)*Math.floor((e+5)/6)*16;case ul:return Math.floor((n+7)/8)*Math.floor((e+4)/5)*16;case hl:return Math.floor((n+7)/8)*Math.floor((e+5)/6)*16;case dl:return Math.floor((n+7)/8)*Math.floor((e+7)/8)*16;case fl:return Math.floor((n+9)/10)*Math.floor((e+4)/5)*16;case pl:return Math.floor((n+9)/10)*Math.floor((e+5)/6)*16;case gl:return Math.floor((n+9)/10)*Math.floor((e+7)/8)*16;case ml:return Math.floor((n+9)/10)*Math.floor((e+9)/10)*16;case Ml:return Math.floor((n+11)/12)*Math.floor((e+9)/10)*16;case xl:return Math.floor((n+11)/12)*Math.floor((e+11)/12)*16;case _l:case vl:case bl:return Math.ceil(n/4)*Math.ceil(e/4)*16;case Sl:case El:return Math.ceil(n/4)*Math.ceil(e/4)*8;case Cs:case yl:return Math.ceil(n/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function eg(n){switch(n){case On:case xh:return{byteLength:1,components:1};case Ra:case _h:case _i:return{byteLength:2,components:1};case Yl:case Xl:return{byteLength:2,components:4};case xi:case Vl:case fi:return{byteLength:4,components:1};case vh:case bh:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${n}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Wl}}));typeof window<"u"&&(window.__THREE__?Ke("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Wl);function zh(){let n=null,e=!1,t=null,i=null;function r(a,o){i=n.requestAnimationFrame(r),t(a,o)}return{start:function(){e!==!0&&t!==null&&n!==null&&(i=n.requestAnimationFrame(r),e=!0)},stop:function(){n!==null&&n.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(a){t=a},setContext:function(a){n=a}}}function tg(n){const e=new WeakMap;function t(l,c){const h=l.array,u=l.usage,f=h.byteLength,d=n.createBuffer();n.bindBuffer(c,d),n.bufferData(c,h,u),l.onUploadCallback();let p;if(h instanceof Float32Array)p=n.FLOAT;else if(typeof Float16Array<"u"&&h instanceof Float16Array)p=n.HALF_FLOAT;else if(h instanceof Uint16Array)l.isFloat16BufferAttribute?p=n.HALF_FLOAT:p=n.UNSIGNED_SHORT;else if(h instanceof Int16Array)p=n.SHORT;else if(h instanceof Uint32Array)p=n.UNSIGNED_INT;else if(h instanceof Int32Array)p=n.INT;else if(h instanceof Int8Array)p=n.BYTE;else if(h instanceof Uint8Array)p=n.UNSIGNED_BYTE;else if(h instanceof Uint8ClampedArray)p=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+h);return{buffer:d,type:p,bytesPerElement:h.BYTES_PER_ELEMENT,version:l.version,size:f}}function i(l,c,h){const u=c.array,f=c.updateRanges;if(n.bindBuffer(h,l),f.length===0)n.bufferSubData(h,0,u);else{f.sort((p,g)=>p.start-g.start);let d=0;for(let p=1;p<f.length;p++){const g=f[d],x=f[p];x.start<=g.start+g.count+1?g.count=Math.max(g.count,x.start+x.count-g.start):(++d,f[d]=x)}f.length=d+1;for(let p=0,g=f.length;p<g;p++){const x=f[p];n.bufferSubData(h,x.start*u.BYTES_PER_ELEMENT,u,x.start,x.count)}c.clearUpdateRanges()}c.onUploadCallback()}function r(l){return l.isInterleavedBufferAttribute&&(l=l.data),e.get(l)}function a(l){l.isInterleavedBufferAttribute&&(l=l.data);const c=e.get(l);c&&(n.deleteBuffer(c.buffer),e.delete(l))}function o(l,c){if(l.isInterleavedBufferAttribute&&(l=l.data),l.isGLBufferAttribute){const u=e.get(l);(!u||u.version<l.version)&&e.set(l,{buffer:l.buffer,type:l.type,bytesPerElement:l.elementSize,version:l.version});return}const h=e.get(l);if(h===void 0)e.set(l,t(l,c));else if(h.version<l.version){if(h.size!==l.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(h.buffer,l,c),h.version=l.version}}return{get:r,remove:a,update:o}}var ng=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,ig=`#ifdef USE_ALPHAHASH
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
#endif`,rg=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,ag=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,sg=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,og=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,lg=`#ifdef USE_AOMAP
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
#endif`,cg=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,ug=`#ifdef USE_BATCHING
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
#endif`,hg=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,dg=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,fg=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,pg=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,gg=`#ifdef USE_IRIDESCENCE
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
#endif`,mg=`#ifdef USE_BUMPMAP
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
#endif`,Mg=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,xg=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,_g=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,vg=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,bg=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,Sg=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,Eg=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,yg=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
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
#endif`,wg=`#define PI 3.141592653589793
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
} // validated`,Ag=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,Tg=`vec3 transformedNormal = objectNormal;
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
#endif`,Rg=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Cg=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Lg=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Dg=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Pg="gl_FragColor = linearToOutputTexel( gl_FragColor );",Og=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Ig=`#ifdef USE_ENVMAP
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
#endif`,Ng=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,Fg=`#ifdef USE_ENVMAP
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
#endif`,Ug=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Bg=`#ifdef USE_ENVMAP
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
#endif`,kg=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,zg=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Hg=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Gg=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Wg=`#ifdef USE_GRADIENTMAP
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
}`,Vg=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Yg=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Xg=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Kg=`uniform bool receiveShadow;
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
#include <lightprobes_pars_fragment>`,qg=`#ifdef USE_ENVMAP
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
#endif`,Zg=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,$g=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Jg=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Qg=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,jg=`PhysicalMaterial material;
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
#endif`,em=`uniform sampler2D dfgLUT;
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
}`,tm=`
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
#endif`,nm=`#if defined( RE_IndirectDiffuse )
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
#endif`,im=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,rm=`#ifdef USE_LIGHT_PROBES_GRID
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
#endif`,am=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,sm=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,om=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,lm=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,cm=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,um=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,hm=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,dm=`#if defined( USE_POINTS_UV )
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
#endif`,fm=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,pm=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,gm=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,mm=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Mm=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,xm=`#ifdef USE_MORPHTARGETS
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
#endif`,_m=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,vm=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,bm=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,Sm=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Em=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,ym=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,wm=`#ifdef USE_NORMALMAP
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
#endif`,Am=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Tm=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Rm=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Cm=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Lm=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Dm=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,Pm=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Om=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Im=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Nm=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Fm=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Um=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Bm=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,km=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,zm=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,Hm=`float getShadowMask() {
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
}`,Gm=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Wm=`#ifdef USE_SKINNING
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
#endif`,Vm=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Ym=`#ifdef USE_SKINNING
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
#endif`,Xm=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Km=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,qm=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Zm=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,$m=`#ifdef USE_TRANSMISSION
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
#endif`,Jm=`#ifdef USE_TRANSMISSION
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
#endif`,Qm=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,jm=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,e2=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,t2=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const n2=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,i2=`uniform sampler2D t2D;
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
}`,r2=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,a2=`#ifdef ENVMAP_TYPE_CUBE
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
}`,s2=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,o2=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,l2=`#include <common>
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
}`,c2=`#if DEPTH_PACKING == 3200
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
}`,u2=`#define DISTANCE
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
}`,h2=`#define DISTANCE
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
}`,d2=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,f2=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,p2=`uniform float scale;
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
}`,g2=`uniform vec3 diffuse;
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
}`,m2=`#include <common>
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
}`,M2=`uniform vec3 diffuse;
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
}`,x2=`#define LAMBERT
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
}`,_2=`#define LAMBERT
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
}`,v2=`#define MATCAP
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
}`,b2=`#define MATCAP
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
}`,S2=`#define NORMAL
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
}`,E2=`#define NORMAL
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
}`,y2=`#define PHONG
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
}`,w2=`#define PHONG
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
}`,A2=`#define STANDARD
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
}`,T2=`#define STANDARD
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
}`,R2=`#define TOON
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
}`,C2=`#define TOON
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
}`,L2=`uniform float size;
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
}`,D2=`uniform vec3 diffuse;
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
}`,P2=`#include <common>
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
}`,O2=`uniform vec3 color;
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
}`,I2=`uniform float rotation;
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
}`,N2=`uniform vec3 diffuse;
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
}`,at={alphahash_fragment:ng,alphahash_pars_fragment:ig,alphamap_fragment:rg,alphamap_pars_fragment:ag,alphatest_fragment:sg,alphatest_pars_fragment:og,aomap_fragment:lg,aomap_pars_fragment:cg,batching_pars_vertex:ug,batching_vertex:hg,begin_vertex:dg,beginnormal_vertex:fg,bsdfs:pg,iridescence_fragment:gg,bumpmap_pars_fragment:mg,clipping_planes_fragment:Mg,clipping_planes_pars_fragment:xg,clipping_planes_pars_vertex:_g,clipping_planes_vertex:vg,color_fragment:bg,color_pars_fragment:Sg,color_pars_vertex:Eg,color_vertex:yg,common:wg,cube_uv_reflection_fragment:Ag,defaultnormal_vertex:Tg,displacementmap_pars_vertex:Rg,displacementmap_vertex:Cg,emissivemap_fragment:Lg,emissivemap_pars_fragment:Dg,colorspace_fragment:Pg,colorspace_pars_fragment:Og,envmap_fragment:Ig,envmap_common_pars_fragment:Ng,envmap_pars_fragment:Fg,envmap_pars_vertex:Ug,envmap_physical_pars_fragment:qg,envmap_vertex:Bg,fog_vertex:kg,fog_pars_vertex:zg,fog_fragment:Hg,fog_pars_fragment:Gg,gradientmap_pars_fragment:Wg,lightmap_pars_fragment:Vg,lights_lambert_fragment:Yg,lights_lambert_pars_fragment:Xg,lights_pars_begin:Kg,lights_toon_fragment:Zg,lights_toon_pars_fragment:$g,lights_phong_fragment:Jg,lights_phong_pars_fragment:Qg,lights_physical_fragment:jg,lights_physical_pars_fragment:em,lights_fragment_begin:tm,lights_fragment_maps:nm,lights_fragment_end:im,lightprobes_pars_fragment:rm,logdepthbuf_fragment:am,logdepthbuf_pars_fragment:sm,logdepthbuf_pars_vertex:om,logdepthbuf_vertex:lm,map_fragment:cm,map_pars_fragment:um,map_particle_fragment:hm,map_particle_pars_fragment:dm,metalnessmap_fragment:fm,metalnessmap_pars_fragment:pm,morphinstance_vertex:gm,morphcolor_vertex:mm,morphnormal_vertex:Mm,morphtarget_pars_vertex:xm,morphtarget_vertex:_m,normal_fragment_begin:vm,normal_fragment_maps:bm,normal_pars_fragment:Sm,normal_pars_vertex:Em,normal_vertex:ym,normalmap_pars_fragment:wm,clearcoat_normal_fragment_begin:Am,clearcoat_normal_fragment_maps:Tm,clearcoat_pars_fragment:Rm,iridescence_pars_fragment:Cm,opaque_fragment:Lm,packing:Dm,premultiplied_alpha_fragment:Pm,project_vertex:Om,dithering_fragment:Im,dithering_pars_fragment:Nm,roughnessmap_fragment:Fm,roughnessmap_pars_fragment:Um,shadowmap_pars_fragment:Bm,shadowmap_pars_vertex:km,shadowmap_vertex:zm,shadowmask_pars_fragment:Hm,skinbase_vertex:Gm,skinning_pars_vertex:Wm,skinning_vertex:Vm,skinnormal_vertex:Ym,specularmap_fragment:Xm,specularmap_pars_fragment:Km,tonemapping_fragment:qm,tonemapping_pars_fragment:Zm,transmission_fragment:$m,transmission_pars_fragment:Jm,uv_pars_fragment:Qm,uv_pars_vertex:jm,uv_vertex:e2,worldpos_vertex:t2,background_vert:n2,background_frag:i2,backgroundCube_vert:r2,backgroundCube_frag:a2,cube_vert:s2,cube_frag:o2,depth_vert:l2,depth_frag:c2,distance_vert:u2,distance_frag:h2,equirect_vert:d2,equirect_frag:f2,linedashed_vert:p2,linedashed_frag:g2,meshbasic_vert:m2,meshbasic_frag:M2,meshlambert_vert:x2,meshlambert_frag:_2,meshmatcap_vert:v2,meshmatcap_frag:b2,meshnormal_vert:S2,meshnormal_frag:E2,meshphong_vert:y2,meshphong_frag:w2,meshphysical_vert:A2,meshphysical_frag:T2,meshtoon_vert:R2,meshtoon_frag:C2,points_vert:L2,points_frag:D2,shadow_vert:P2,shadow_frag:O2,sprite_vert:I2,sprite_frag:N2},be={common:{diffuse:{value:new Mt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new qe},alphaMap:{value:null},alphaMapTransform:{value:new qe},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new qe}},envmap:{envMap:{value:null},envMapRotation:{value:new qe},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new qe}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new qe}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new qe},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new qe},normalScale:{value:new Ze(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new qe},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new qe}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new qe}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new qe}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Mt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new K},probesMax:{value:new K},probesResolution:{value:new K}},points:{diffuse:{value:new Mt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new qe},alphaTest:{value:0},uvTransform:{value:new qe}},sprite:{diffuse:{value:new Mt(16777215)},opacity:{value:1},center:{value:new Ze(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new qe},alphaMap:{value:null},alphaMapTransform:{value:new qe},alphaTest:{value:0}}},ci={basic:{uniforms:Sn([be.common,be.specularmap,be.envmap,be.aomap,be.lightmap,be.fog]),vertexShader:at.meshbasic_vert,fragmentShader:at.meshbasic_frag},lambert:{uniforms:Sn([be.common,be.specularmap,be.envmap,be.aomap,be.lightmap,be.emissivemap,be.bumpmap,be.normalmap,be.displacementmap,be.fog,be.lights,{emissive:{value:new Mt(0)},envMapIntensity:{value:1}}]),vertexShader:at.meshlambert_vert,fragmentShader:at.meshlambert_frag},phong:{uniforms:Sn([be.common,be.specularmap,be.envmap,be.aomap,be.lightmap,be.emissivemap,be.bumpmap,be.normalmap,be.displacementmap,be.fog,be.lights,{emissive:{value:new Mt(0)},specular:{value:new Mt(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:at.meshphong_vert,fragmentShader:at.meshphong_frag},standard:{uniforms:Sn([be.common,be.envmap,be.aomap,be.lightmap,be.emissivemap,be.bumpmap,be.normalmap,be.displacementmap,be.roughnessmap,be.metalnessmap,be.fog,be.lights,{emissive:{value:new Mt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:at.meshphysical_vert,fragmentShader:at.meshphysical_frag},toon:{uniforms:Sn([be.common,be.aomap,be.lightmap,be.emissivemap,be.bumpmap,be.normalmap,be.displacementmap,be.gradientmap,be.fog,be.lights,{emissive:{value:new Mt(0)}}]),vertexShader:at.meshtoon_vert,fragmentShader:at.meshtoon_frag},matcap:{uniforms:Sn([be.common,be.bumpmap,be.normalmap,be.displacementmap,be.fog,{matcap:{value:null}}]),vertexShader:at.meshmatcap_vert,fragmentShader:at.meshmatcap_frag},points:{uniforms:Sn([be.points,be.fog]),vertexShader:at.points_vert,fragmentShader:at.points_frag},dashed:{uniforms:Sn([be.common,be.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:at.linedashed_vert,fragmentShader:at.linedashed_frag},depth:{uniforms:Sn([be.common,be.displacementmap]),vertexShader:at.depth_vert,fragmentShader:at.depth_frag},normal:{uniforms:Sn([be.common,be.bumpmap,be.normalmap,be.displacementmap,{opacity:{value:1}}]),vertexShader:at.meshnormal_vert,fragmentShader:at.meshnormal_frag},sprite:{uniforms:Sn([be.sprite,be.fog]),vertexShader:at.sprite_vert,fragmentShader:at.sprite_frag},background:{uniforms:{uvTransform:{value:new qe},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:at.background_vert,fragmentShader:at.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new qe}},vertexShader:at.backgroundCube_vert,fragmentShader:at.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:at.cube_vert,fragmentShader:at.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:at.equirect_vert,fragmentShader:at.equirect_frag},distance:{uniforms:Sn([be.common,be.displacementmap,{referencePosition:{value:new K},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:at.distance_vert,fragmentShader:at.distance_frag},shadow:{uniforms:Sn([be.lights,be.fog,{color:{value:new Mt(0)},opacity:{value:1}}]),vertexShader:at.shadow_vert,fragmentShader:at.shadow_frag}};ci.physical={uniforms:Sn([ci.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new qe},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new qe},clearcoatNormalScale:{value:new Ze(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new qe},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new qe},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new qe},sheen:{value:0},sheenColor:{value:new Mt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new qe},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new qe},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new qe},transmissionSamplerSize:{value:new Ze},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new qe},attenuationDistance:{value:0},attenuationColor:{value:new Mt(0)},specularColor:{value:new Mt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new qe},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new qe},anisotropyVector:{value:new Ze},anisotropyMap:{value:null},anisotropyMapTransform:{value:new qe}}]),vertexShader:at.meshphysical_vert,fragmentShader:at.meshphysical_frag};const cs={r:0,b:0,g:0},F2=new Kt,Hh=new qe;Hh.set(-1,0,0,0,1,0,0,0,1);function U2(n,e,t,i,r,a){const o=new Mt(0);let l=r===!0?0:1,c,h,u=null,f=0,d=null;function p(_){let A=_.isScene===!0?_.background:null;if(A&&A.isTexture){const E=_.backgroundBlurriness>0;A=e.get(A,E)}return A}function g(_){let A=!1;const E=p(_);E===null?m(o,l):E&&E.isColor&&(m(E,1),A=!0);const R=n.xr.getEnvironmentBlendMode();R==="additive"?t.buffers.color.setClear(0,0,0,1,a):R==="alpha-blend"&&t.buffers.color.setClear(0,0,0,0,a),(n.autoClear||A)&&(t.buffers.depth.setTest(!0),t.buffers.depth.setMask(!0),t.buffers.color.setMask(!0),n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil))}function x(_,A){const E=p(A);E&&(E.isCubeTexture||E.mapping===Bs)?(h===void 0&&(h=new wn(new Na(1,1,1),new vn({name:"BackgroundCubeMaterial",uniforms:Qr(ci.backgroundCube.uniforms),vertexShader:ci.backgroundCube.vertexShader,fragmentShader:ci.backgroundCube.fragmentShader,side:Cn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(R,T,P){this.matrixWorld.copyPosition(P.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(h)),h.material.uniforms.envMap.value=E,h.material.uniforms.backgroundBlurriness.value=A.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=A.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4(F2.makeRotationFromEuler(A.backgroundRotation)).transpose(),E.isCubeTexture&&E.isRenderTargetTexture===!1&&h.material.uniforms.backgroundRotation.value.premultiply(Hh),h.material.toneMapped=lt.getTransfer(E.colorSpace)!==yt,(u!==E||f!==E.version||d!==n.toneMapping)&&(h.material.needsUpdate=!0,u=E,f=E.version,d=n.toneMapping),h.layers.enableAll(),_.unshift(h,h.geometry,h.material,0,0,null)):E&&E.isTexture&&(c===void 0&&(c=new wn(new bi(2,2),new vn({name:"BackgroundMaterial",uniforms:Qr(ci.background.uniforms),vertexShader:ci.background.vertexShader,fragmentShader:ci.background.fragmentShader,side:_r,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(c)),c.material.uniforms.t2D.value=E,c.material.uniforms.backgroundIntensity.value=A.backgroundIntensity,c.material.toneMapped=lt.getTransfer(E.colorSpace)!==yt,E.matrixAutoUpdate===!0&&E.updateMatrix(),c.material.uniforms.uvTransform.value.copy(E.matrix),(u!==E||f!==E.version||d!==n.toneMapping)&&(c.material.needsUpdate=!0,u=E,f=E.version,d=n.toneMapping),c.layers.enableAll(),_.unshift(c,c.geometry,c.material,0,0,null))}function m(_,A){_.getRGB(cs,Fh(n)),t.buffers.color.setClear(cs.r,cs.g,cs.b,A,a)}function M(){h!==void 0&&(h.geometry.dispose(),h.material.dispose(),h=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return o},setClearColor:function(_,A=1){o.set(_),l=A,m(o,l)},getClearAlpha:function(){return l},setClearAlpha:function(_){l=_,m(o,l)},render:g,addToRenderList:x,dispose:M}}function B2(n,e){const t=n.getParameter(n.MAX_VERTEX_ATTRIBS),i={},r=d(null);let a=r,o=!1;function l(I,L,N,O,U){let W=!1;const F=f(I,O,N,L);a!==F&&(a=F,h(a.object)),W=p(I,O,N,U),W&&g(I,O,N,U),U!==null&&e.update(U,n.ELEMENT_ARRAY_BUFFER),(W||o)&&(o=!1,E(I,L,N,O),U!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,e.get(U).buffer))}function c(){return n.createVertexArray()}function h(I){return n.bindVertexArray(I)}function u(I){return n.deleteVertexArray(I)}function f(I,L,N,O){const U=O.wireframe===!0;let W=i[L.id];W===void 0&&(W={},i[L.id]=W);const F=I.isInstancedMesh===!0?I.id:0;let Q=W[F];Q===void 0&&(Q={},W[F]=Q);let X=Q[N.id];X===void 0&&(X={},Q[N.id]=X);let te=X[U];return te===void 0&&(te=d(c()),X[U]=te),te}function d(I){const L=[],N=[],O=[];for(let U=0;U<t;U++)L[U]=0,N[U]=0,O[U]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:L,enabledAttributes:N,attributeDivisors:O,object:I,attributes:{},index:null}}function p(I,L,N,O){const U=a.attributes,W=L.attributes;let F=0;const Q=N.getAttributes();for(const X in Q)if(Q[X].location>=0){const B=U[X];let ae=W[X];if(ae===void 0&&(X==="instanceMatrix"&&I.instanceMatrix&&(ae=I.instanceMatrix),X==="instanceColor"&&I.instanceColor&&(ae=I.instanceColor)),B===void 0||B.attribute!==ae||ae&&B.data!==ae.data)return!0;F++}return a.attributesNum!==F||a.index!==O}function g(I,L,N,O){const U={},W=L.attributes;let F=0;const Q=N.getAttributes();for(const X in Q)if(Q[X].location>=0){let B=W[X];B===void 0&&(X==="instanceMatrix"&&I.instanceMatrix&&(B=I.instanceMatrix),X==="instanceColor"&&I.instanceColor&&(B=I.instanceColor));const ae={};ae.attribute=B,B&&B.data&&(ae.data=B.data),U[X]=ae,F++}a.attributes=U,a.attributesNum=F,a.index=O}function x(){const I=a.newAttributes;for(let L=0,N=I.length;L<N;L++)I[L]=0}function m(I){M(I,0)}function M(I,L){const N=a.newAttributes,O=a.enabledAttributes,U=a.attributeDivisors;N[I]=1,O[I]===0&&(n.enableVertexAttribArray(I),O[I]=1),U[I]!==L&&(n.vertexAttribDivisor(I,L),U[I]=L)}function _(){const I=a.newAttributes,L=a.enabledAttributes;for(let N=0,O=L.length;N<O;N++)L[N]!==I[N]&&(n.disableVertexAttribArray(N),L[N]=0)}function A(I,L,N,O,U,W,F){F===!0?n.vertexAttribIPointer(I,L,N,U,W):n.vertexAttribPointer(I,L,N,O,U,W)}function E(I,L,N,O){x();const U=O.attributes,W=N.getAttributes(),F=L.defaultAttributeValues;for(const Q in W){const X=W[Q];if(X.location>=0){let te=U[Q];if(te===void 0&&(Q==="instanceMatrix"&&I.instanceMatrix&&(te=I.instanceMatrix),Q==="instanceColor"&&I.instanceColor&&(te=I.instanceColor)),te!==void 0){const B=te.normalized,ae=te.itemSize,ue=e.get(te);if(ue===void 0)continue;const Pe=ue.buffer,He=ue.type,Xe=ue.bytesPerElement,ee=He===n.INT||He===n.UNSIGNED_INT||te.gpuType===Vl;if(te.isInterleavedBufferAttribute){const re=te.data,V=re.stride,he=te.offset;if(re.isInstancedInterleavedBuffer){for(let se=0;se<X.locationSize;se++)M(X.location+se,re.meshPerAttribute);I.isInstancedMesh!==!0&&O._maxInstanceCount===void 0&&(O._maxInstanceCount=re.meshPerAttribute*re.count)}else for(let se=0;se<X.locationSize;se++)m(X.location+se);n.bindBuffer(n.ARRAY_BUFFER,Pe);for(let se=0;se<X.locationSize;se++)A(X.location+se,ae/X.locationSize,He,B,V*Xe,(he+ae/X.locationSize*se)*Xe,ee)}else{if(te.isInstancedBufferAttribute){for(let re=0;re<X.locationSize;re++)M(X.location+re,te.meshPerAttribute);I.isInstancedMesh!==!0&&O._maxInstanceCount===void 0&&(O._maxInstanceCount=te.meshPerAttribute*te.count)}else for(let re=0;re<X.locationSize;re++)m(X.location+re);n.bindBuffer(n.ARRAY_BUFFER,Pe);for(let re=0;re<X.locationSize;re++)A(X.location+re,ae/X.locationSize,He,B,ae*Xe,ae/X.locationSize*re*Xe,ee)}}else if(F!==void 0){const B=F[Q];if(B!==void 0)switch(B.length){case 2:n.vertexAttrib2fv(X.location,B);break;case 3:n.vertexAttrib3fv(X.location,B);break;case 4:n.vertexAttrib4fv(X.location,B);break;default:n.vertexAttrib1fv(X.location,B)}}}}_()}function R(){y();for(const I in i){const L=i[I];for(const N in L){const O=L[N];for(const U in O){const W=O[U];for(const F in W)u(W[F].object),delete W[F];delete O[U]}}delete i[I]}}function T(I){if(i[I.id]===void 0)return;const L=i[I.id];for(const N in L){const O=L[N];for(const U in O){const W=O[U];for(const F in W)u(W[F].object),delete W[F];delete O[U]}}delete i[I.id]}function P(I){for(const L in i){const N=i[L];for(const O in N){const U=N[O];if(U[I.id]===void 0)continue;const W=U[I.id];for(const F in W)u(W[F].object),delete W[F];delete U[I.id]}}}function S(I){for(const L in i){const N=i[L],O=I.isInstancedMesh===!0?I.id:0,U=N[O];if(U!==void 0){for(const W in U){const F=U[W];for(const Q in F)u(F[Q].object),delete F[Q];delete U[W]}delete N[O],Object.keys(N).length===0&&delete i[L]}}}function y(){C(),o=!0,a!==r&&(a=r,h(a.object))}function C(){r.geometry=null,r.program=null,r.wireframe=!1}return{setup:l,reset:y,resetDefaultState:C,dispose:R,releaseStatesOfGeometry:T,releaseStatesOfObject:S,releaseStatesOfProgram:P,initAttributes:x,enableAttribute:m,disableUnusedAttributes:_}}function k2(n,e,t){let i;function r(c){i=c}function a(c,h){n.drawArrays(i,c,h),t.update(h,i,1)}function o(c,h,u){u!==0&&(n.drawArraysInstanced(i,c,h,u),t.update(h,i,u))}function l(c,h,u){if(u===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,c,0,h,0,u);let d=0;for(let p=0;p<u;p++)d+=h[p];t.update(d,i,1)}this.setMode=r,this.render=a,this.renderInstances=o,this.renderMultiDraw=l}function z2(n,e,t,i){let r;function a(){if(r!==void 0)return r;if(e.has("EXT_texture_filter_anisotropic")===!0){const P=e.get("EXT_texture_filter_anisotropic");r=n.getParameter(P.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else r=0;return r}function o(P){return!(P!==Hn&&i.convert(P)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_FORMAT))}function l(P){const S=P===_i&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(P!==On&&P!==fi&&!S&&i.convert(P)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_TYPE))}function c(P){if(P==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";P="mediump"}return P==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let h=t.precision!==void 0?t.precision:"highp";const u=c(h);u!==h&&(Ke("WebGLRenderer:",h,"not supported, using",u,"instead."),h=u);const f=t.logarithmicDepthBuffer===!0,d=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control");t.reversedDepthBuffer===!0&&d===!1&&Ke("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");const p=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),g=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),x=n.getParameter(n.MAX_TEXTURE_SIZE),m=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),M=n.getParameter(n.MAX_VERTEX_ATTRIBS),_=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),A=n.getParameter(n.MAX_VARYING_VECTORS),E=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),R=n.getParameter(n.MAX_SAMPLES),T=n.getParameter(n.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:a,getMaxPrecision:c,textureFormatReadable:o,textureTypeReadable:l,precision:h,logarithmicDepthBuffer:f,reversedDepthBuffer:d,maxTextures:p,maxVertexTextures:g,maxTextureSize:x,maxCubemapSize:m,maxAttributes:M,maxVertexUniforms:_,maxVaryings:A,maxFragmentUniforms:E,maxSamples:R,samples:T}}function H2(n){const e=this;let t=null,i=0,r=!1,a=!1;const o=new Qi,l=new qe,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(f,d){const p=f.length!==0||d||i!==0||r;return r=d,i=f.length,p},this.beginShadows=function(){a=!0,u(null)},this.endShadows=function(){a=!1},this.setGlobalState=function(f,d){t=u(f,d,0)},this.setState=function(f,d,p){const g=f.clippingPlanes,x=f.clipIntersection,m=f.clipShadows,M=n.get(f);if(!r||g===null||g.length===0||a&&!m)a?u(null):h();else{const _=a?0:i,A=_*4;let E=M.clippingState||null;c.value=E,E=u(g,d,A,p);for(let R=0;R!==A;++R)E[R]=t[R];M.clippingState=E,this.numIntersection=x?this.numPlanes:0,this.numPlanes+=_}};function h(){c.value!==t&&(c.value=t,c.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function u(f,d,p,g){const x=f!==null?f.length:0;let m=null;if(x!==0){if(m=c.value,g!==!0||m===null){const M=p+x*4,_=d.matrixWorldInverse;l.getNormalMatrix(_),(m===null||m.length<M)&&(m=new Float32Array(M));for(let A=0,E=p;A!==x;++A,E+=4)o.copy(f[A]).applyMatrix4(_,l),o.normal.toArray(m,E),m[E+3]=o.constant}c.value=m,c.needsUpdate=!0}return e.numPlanes=x,e.numIntersection=0,m}}const Xr=4,G2=6,W2=20,V2=256,fa=new tc,jc=new Mt;let Eo=null,yo=0,wo=0,Ao=!1;const Y2=new K,lr=new K;class eu{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,i=.1,r=100,a={}){const{size:o=256,position:l=Y2}=a;Eo=this._renderer.getRenderTarget(),yo=this._renderer.getActiveCubeFace(),wo=this._renderer.getActiveMipmapLevel(),Ao=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(o);const c=this._allocateTargets();return c.depthBuffer=!0,this._sceneToCubeUV(e,i,r,c,l),t>0&&this._blur(c,0,0,t),this._applyPMREM(c),this._cleanup(c),c}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=iu(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=nu(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(Eo,yo,wo),this._renderer.xr.enabled=Ao,e.scissorTest=!1,kr(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===vr||e.mapping===Jr?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Eo=this._renderer.getRenderTarget(),yo=this._renderer.getActiveCubeFace(),wo=this._renderer.getActiveMipmapLevel(),Ao=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=t||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,i={magFilter:$t,minFilter:$t,generateMipmaps:!1,type:_i,format:Hn,colorSpace:La,depthBuffer:!1},r=tu(e,t,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=tu(e,t,i);const{_lodMax:a}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods}=X2(a)),this._blurMaterial=q2(a,e,t),this._ggxMaterial=K2(a,e,t)}return r}_compileMaterial(e){const t=new wn(new vi,e);this._renderer.compile(t,fa)}_sceneToCubeUV(e,t,i,r,a){const c=new kn(90,1,t,i),h=[1,-1,1,1,1,1],u=[1,1,1,-1,-1,-1],f=this._renderer,d=f.autoClear,p=f.toneMapping;f.getClearColor(jc),f.toneMapping=gi,f.autoClear=!1,f.state.buffers.depth.getReversed()&&(f.setRenderTarget(r),f.clearDepth(),f.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new wn(new Na,new Ph({name:"PMREM.Background",side:Cn,depthWrite:!1,depthTest:!1})));const x=this._backgroundBox,m=x.material;let M=!1;const _=e.background;_?_.isColor&&(m.color.copy(_),e.background=null,M=!0):(m.color.copy(jc),M=!0);for(let A=0;A<6;A++){const E=A%3;E===0?(c.up.set(0,h[A],0),c.position.set(a.x,a.y,a.z),c.lookAt(a.x+u[A],a.y,a.z)):E===1?(c.up.set(0,0,h[A]),c.position.set(a.x,a.y,a.z),c.lookAt(a.x,a.y+u[A],a.z)):(c.up.set(0,h[A],0),c.position.set(a.x,a.y,a.z),c.lookAt(a.x,a.y,a.z+u[A]));const R=this._cubeSize;kr(r,E*R,A>2?R:0,R,R),f.setRenderTarget(r),M&&f.render(x,c),f.render(e,c)}f.toneMapping=p,f.autoClear=d,e.background=_}_textureToCubeUV(e,t){const i=this._renderer,r=e.mapping===vr||e.mapping===Jr;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=iu()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=nu());const a=r?this._cubemapMaterial:this._equirectMaterial,o=this._lodMeshes[0];o.material=a;const l=a.uniforms;l.envMap.value=e;const c=this._cubeSize;kr(t,0,0,3*c,2*c),i.setRenderTarget(t),i.render(o,fa)}_applyPMREM(e){const t=this._renderer,i=t.autoClear;t.autoClear=!1;const r=this._lodMeshes.length;for(let a=1;a<r;a++)this._applyGGXFilter(e,a-1,a);t.autoClear=i}_applyGGXFilter(e,t,i){const r=this._renderer,a=this._pingPongRenderTarget,o=this._ggxMaterial,l=this._lodMeshes[i];l.material=o;const c=o.uniforms,h=i/(this._lodMeshes.length-1),u=t/(this._lodMeshes.length-1),f=Math.sqrt(h*h-u*u),d=h*1.25,p=f*d,{_lodMax:g}=this,x=this._sizeLods[i],m=3*x*(i>g-Xr?i-g+Xr:0),M=4*(this._cubeSize-x);c.envMap.value=e.texture,c.roughness.value=p,c.mipInt.value=g-t,kr(a,m,M,3*x,2*x),r.setRenderTarget(a),r.render(l,fa),c.envMap.value=a.texture,c.roughness.value=0,c.mipInt.value=g-i,kr(e,m,M,3*x,2*x),r.setRenderTarget(e),r.render(l,fa)}_blur(e,t,i,r){const a=this._pingPongRenderTarget,o=Math.min(r,Math.PI)/Math.SQRT2;this._blurPass(e,a,t,i,o),this._blurPass(a,e,i,i,o)}_blurPass(e,t,i,r,a){const o=this._renderer,l=this._blurMaterial,c=this._lodMeshes[r];c.material=l;const h=l.uniforms;h.envMap.value=e.texture,h.sigma.value=a,h.mipInt.value=this._lodMax-i;const u=this._sizeLods[r],f=3*u*(r>this._lodMax-Xr?r-this._lodMax+Xr:0),d=4*(this._cubeSize-u);kr(t,f,d,3*u,2*u),o.setRenderTarget(t),o.render(c,fa)}}function X2(n){const e=[],t=[];let i=n;const r=n-Xr+1+G2;for(let a=0;a<r;a++){const o=Math.pow(2,i);e.push(o);const l=1/(o-2),c=-l,h=1+l,u=[c,c,h,c,h,h,c,c,h,h,c,h],f=6,d=6,p=3,g=new Float32Array(p*d*f),x=new Float32Array(p*d*f);for(let M=0;M<f;M++){const _=M%3*2/3-1,A=M>2?0:-1,E=[_,A,0,_+2/3,A,0,_+2/3,A+1,0,_,A,0,_+2/3,A+1,0,_,A+1,0];g.set(E,p*d*M);for(let R=0;R<d;R++){const T=u[R*2]*2-1,P=u[R*2+1]*2-1;M===0?lr.set(1,P,T):M===1?lr.set(-T,1,-P):M===2?lr.set(-T,P,1):M===3?lr.set(-1,P,-T):M===4?lr.set(-T,-1,P):lr.set(T,P,-1),lr.toArray(x,(M*d+R)*p)}}const m=new vi;m.setAttribute("position",new mi(g,p)),m.setAttribute("outputDirection",new mi(x,p)),t.push(new wn(m,null)),i>Xr&&i--}return{lodMeshes:t,sizeLods:e}}function tu(n,e,t){const i=new Gn(n,e,t);return i.texture.mapping=Bs,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function kr(n,e,t,i,r){n.viewport.set(e,t,i,r),n.scissor.set(e,t,i,r)}function K2(n,e,t){return new vn({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:V2,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:zs(),fragmentShader:`

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
		`,blending:Fi,depthTest:!1,depthWrite:!1})}function q2(n,e,t){return new vn({name:"SphericalGaussianBlur",defines:{SAMPLES:W2,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},sigma:{value:0},mipInt:{value:0}},vertexShader:zs(),fragmentShader:`

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
		`,blending:Fi,depthTest:!1,depthWrite:!1})}function nu(){return new vn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:zs(),fragmentShader:`

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
		`,blending:Fi,depthTest:!1,depthWrite:!1})}function iu(){return new vn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:zs(),fragmentShader:`

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
	`}class Gh extends Gn{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const i={width:e,height:e,depth:1},r=[i,i,i,i,i,i];this.texture=new Ih(r),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},r=new Na(5,5,5),a=new vn({name:"CubemapFromEquirect",uniforms:Qr(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:Cn,blending:Fi});a.uniforms.tEquirect.value=t;const o=new wn(r,a),l=t.minFilter;return t.minFilter===fr&&(t.minFilter=$t),new Q1(1,10,this).update(e,o),t.minFilter=l,o.geometry.dispose(),o.material.dispose(),this}clear(e,t=!0,i=!0,r=!0){const a=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(t,i,r);e.setRenderTarget(a)}}function Z2(n){let e=new WeakMap,t=new WeakMap,i=null;function r(d,p=!1){return d==null?null:p?o(d):a(d)}function a(d){if(d&&d.isTexture){const p=d.mapping;if(p===$s||p===Js)if(e.has(d)){const g=e.get(d).texture;return l(g,d.mapping)}else{const g=d.image;if(g&&g.height>0){const x=new Gh(g.height);return x.fromEquirectangularTexture(n,d),e.set(d,x),d.addEventListener("dispose",h),l(x.texture,d.mapping)}else return null}}return d}function o(d){if(d&&d.isTexture){const p=d.mapping,g=p===$s||p===Js,x=p===vr||p===Jr;if(g||x){let m=t.get(d);const M=m!==void 0?m.texture.pmremVersion:0;if(d.isRenderTargetTexture&&d.pmremVersion!==M)return i===null&&(i=new eu(n)),m=g?i.fromEquirectangular(d,m):i.fromCubemap(d,m),m.texture.pmremVersion=d.pmremVersion,t.set(d,m),m.texture;if(m!==void 0)return m.texture;{const _=d.image;return g&&_&&_.height>0||x&&_&&c(_)?(i===null&&(i=new eu(n)),m=g?i.fromEquirectangular(d):i.fromCubemap(d),m.texture.pmremVersion=d.pmremVersion,t.set(d,m),d.addEventListener("dispose",u),m.texture):null}}}return d}function l(d,p){return p===$s?d.mapping=vr:p===Js&&(d.mapping=Jr),d}function c(d){let p=0;const g=6;for(let x=0;x<g;x++)d[x]!==void 0&&p++;return p===g}function h(d){const p=d.target;p.removeEventListener("dispose",h);const g=e.get(p);g!==void 0&&(e.delete(p),g.dispose())}function u(d){const p=d.target;p.removeEventListener("dispose",u);const g=t.get(p);g!==void 0&&(t.delete(p),g.dispose())}function f(){e=new WeakMap,t=new WeakMap,i!==null&&(i.dispose(),i=null)}return{get:r,dispose:f}}function $2(n){const e={};function t(i){if(e[i]!==void 0)return e[i];const r=n.getExtension(i);return e[i]=r,r}return{has:function(i){return t(i)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(i){const r=t(i);return r===null&&qr("WebGLRenderer: "+i+" extension not supported."),r}}}function J2(n,e,t,i){const r={},a=new WeakMap;function o(f){const d=f.target;d.index!==null&&e.remove(d.index);for(const g in d.attributes)e.remove(d.attributes[g]);d.removeEventListener("dispose",o),delete r[d.id];const p=a.get(d);p&&(e.remove(p),a.delete(d)),i.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,t.memory.geometries--}function l(f,d){return r[d.id]===!0||(d.addEventListener("dispose",o),r[d.id]=!0,t.memory.geometries++),d}function c(f){const d=f.attributes;for(const p in d)e.update(d[p],n.ARRAY_BUFFER)}function h(f){const d=[],p=f.index,g=f.attributes.position;let x=0;if(g===void 0)return;if(p!==null){const _=p.array;x=p.version;for(let A=0,E=_.length;A<E;A+=3){const R=_[A+0],T=_[A+1],P=_[A+2];d.push(R,T,T,P,P,R)}}else{const _=g.array;x=g.version;for(let A=0,E=_.length/3-1;A<E;A+=3){const R=A+0,T=A+1,P=A+2;d.push(R,T,T,P,P,R)}}const m=new(g.count>=65535?Dh:Lh)(d,1);m.version=x;const M=a.get(f);M&&e.remove(M),a.set(f,m)}function u(f){const d=a.get(f);if(d){const p=f.index;p!==null&&d.version<p.version&&h(f)}else h(f);return a.get(f)}return{get:l,update:c,getWireframeAttribute:u}}function Q2(n,e,t){let i;function r(f){i=f}let a,o;function l(f){a=f.type,o=f.bytesPerElement}function c(f,d){n.drawElements(i,d,a,f*o),t.update(d,i,1)}function h(f,d,p){p!==0&&(n.drawElementsInstanced(i,d,a,f*o,p),t.update(d,i,p))}function u(f,d,p){if(p===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,d,0,a,f,0,p);let x=0;for(let m=0;m<p;m++)x+=d[m];t.update(x,i,1)}this.setMode=r,this.setIndex=l,this.render=c,this.renderInstances=h,this.renderMultiDraw=u}function j2(n){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function i(a,o,l){switch(t.calls++,o){case n.TRIANGLES:t.triangles+=l*(a/3);break;case n.LINES:t.lines+=l*(a/2);break;case n.LINE_STRIP:t.lines+=l*(a-1);break;case n.LINE_LOOP:t.lines+=l*a;break;case n.POINTS:t.points+=l*a;break;default:pt("WebGLInfo: Unknown draw mode:",o);break}}function r(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:r,update:i}}function eM(n,e,t){const i=new WeakMap,r=new kt;function a(o,l,c){const h=o.morphTargetInfluences,u=l.morphAttributes.position||l.morphAttributes.normal||l.morphAttributes.color,f=u!==void 0?u.length:0;let d=i.get(l);if(d===void 0||d.count!==f){let y=function(){P.dispose(),i.delete(l),l.removeEventListener("dispose",y)};d!==void 0&&d.texture.dispose();const p=l.morphAttributes.position!==void 0,g=l.morphAttributes.normal!==void 0,x=l.morphAttributes.color!==void 0,m=l.morphAttributes.position||[],M=l.morphAttributes.normal||[],_=l.morphAttributes.color||[];let A=0;p===!0&&(A=1),g===!0&&(A=2),x===!0&&(A=3);let E=l.attributes.position.count*A,R=1;E>e.maxTextureSize&&(R=Math.ceil(E/e.maxTextureSize),E=e.maxTextureSize);const T=new Float32Array(E*R*4*f),P=new Th(T,E,R,f);P.type=fi,P.needsUpdate=!0;const S=A*4;for(let C=0;C<f;C++){const I=m[C],L=M[C],N=_[C],O=E*R*4*C;for(let U=0;U<I.count;U++){const W=U*S;p===!0&&(r.fromBufferAttribute(I,U),T[O+W+0]=r.x,T[O+W+1]=r.y,T[O+W+2]=r.z,T[O+W+3]=0),g===!0&&(r.fromBufferAttribute(L,U),T[O+W+4]=r.x,T[O+W+5]=r.y,T[O+W+6]=r.z,T[O+W+7]=0),x===!0&&(r.fromBufferAttribute(N,U),T[O+W+8]=r.x,T[O+W+9]=r.y,T[O+W+10]=r.z,T[O+W+11]=N.itemSize===4?r.w:1)}}d={count:f,texture:P,size:new Ze(E,R)},i.set(l,d),l.addEventListener("dispose",y)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)c.getUniforms().setValue(n,"morphTexture",o.morphTexture,t);else{let p=0;for(let x=0;x<h.length;x++)p+=h[x];const g=l.morphTargetsRelative?1:1-p;c.getUniforms().setValue(n,"morphTargetBaseInfluence",g),c.getUniforms().setValue(n,"morphTargetInfluences",h)}c.getUniforms().setValue(n,"morphTargetsTexture",d.texture,t),c.getUniforms().setValue(n,"morphTargetsTextureSize",d.size)}return{update:a}}function tM(n,e,t,i,r){let a=new WeakMap;function o(h){const u=r.render.frame,f=h.geometry,d=e.get(h,f);if(a.get(d)!==u&&(e.update(d),a.set(d,u)),h.isInstancedMesh&&(h.hasEventListener("dispose",c)===!1&&h.addEventListener("dispose",c),a.get(h)!==u&&(t.update(h.instanceMatrix,n.ARRAY_BUFFER),h.instanceColor!==null&&t.update(h.instanceColor,n.ARRAY_BUFFER),a.set(h,u))),h.isSkinnedMesh){const p=h.skeleton;a.get(p)!==u&&(p.update(),a.set(p,u))}return d}function l(){a=new WeakMap}function c(h){const u=h.target;u.removeEventListener("dispose",c),i.releaseStatesOfObject(u),t.remove(u.instanceMatrix),u.instanceColor!==null&&t.remove(u.instanceColor)}return{update:o,dispose:l}}const nM={[uh]:"LINEAR_TONE_MAPPING",[hh]:"REINHARD_TONE_MAPPING",[dh]:"CINEON_TONE_MAPPING",[fh]:"ACES_FILMIC_TONE_MAPPING",[gh]:"AGX_TONE_MAPPING",[mh]:"NEUTRAL_TONE_MAPPING",[ph]:"CUSTOM_TONE_MAPPING"};function iM(n,e,t,i,r,a){const o=new Gn(e,t,{type:n,depthBuffer:r,stencilBuffer:a,samples:i?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1});let l=null,c=null;const h=new vi;h.setAttribute("position",new Bi([-1,3,0,-1,-1,0,3,-1,0],3)),h.setAttribute("uv",new Bi([0,2,0,0,2,0],2));const u=new Z1({uniforms:{tDiffuse:{value:null}},vertexShader:`
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
			}`,depthTest:!1,depthWrite:!1}),f=new wn(h,u),d=new tc(-1,1,1,-1,0,1);let p=null,g=null,x=!1,m,M=null,_=[],A=!1;this.setSize=function(E,R){o.setSize(E,R),l!==null&&l.setSize(E,R),c!==null&&c.setSize(E,R);for(let T=0;T<_.length;T++){const P=_[T];P.setSize&&P.setSize(E,R)}},this.setEffects=function(E){_=E,A=_.length>0&&_[0].isRenderPass===!0;const R=o.width,T=o.height;_.length>0&&l===null&&(l=new Gn(R,T,{type:_i,depthBuffer:!1,stencilBuffer:!1}),c=new Gn(R,T,{type:_i,depthBuffer:!1,stencilBuffer:!1}));for(let P=0;P<_.length;P++){const S=_[P];S.setSize&&S.setSize(R,T)}},this.begin=function(E,R){if(x||E.toneMapping===gi&&_.length===0)return!1;if(M=R,R!==null){const T=R.width,P=R.height;(o.width!==T||o.height!==P)&&this.setSize(T,P)}return A===!1&&E.setRenderTarget(o),m=E.toneMapping,E.toneMapping=gi,!0},this.hasRenderPass=function(){return A},this.end=function(E,R){E.toneMapping=m,x=!0;let T=o,P=l;for(let S=0;S<_.length;S++){const y=_[S];y.enabled!==!1&&(y.render(E,P,T,R),y.needsSwap!==!1&&(T=P,P=P===l?c:l))}if(p!==E.outputColorSpace||g!==E.toneMapping){p=E.outputColorSpace,g=E.toneMapping,u.defines={},lt.getTransfer(p)===yt&&(u.defines.SRGB_TRANSFER="");const S=nM[g];S&&(u.defines[S]=""),u.needsUpdate=!0}u.uniforms.tDiffuse.value=T.texture,E.setRenderTarget(M),E.render(f,d),M=null,x=!1},this.isCompositing=function(){return x},this.dispose=function(){o.dispose(),l!==null&&l.dispose(),c!==null&&c.dispose(),h.dispose(),u.dispose()}}const Wh=new yn,Al=new Da(1,1),Vh=new Th,Yh=new A1,Xh=new Ih,ru=[],au=[],su=new Float32Array(16),ou=new Float32Array(9),lu=new Float32Array(4);function ra(n,e,t){const i=n[0];if(i<=0||i>0)return n;const r=e*t;let a=ru[r];if(a===void 0&&(a=new Float32Array(r),ru[r]=a),e!==0){i.toArray(a,0);for(let o=1,l=0;o!==e;++o)l+=t,n[o].toArray(a,l)}return a}function nn(n,e){if(n.length!==e.length)return!1;for(let t=0,i=n.length;t<i;t++)if(n[t]!==e[t])return!1;return!0}function rn(n,e){for(let t=0,i=e.length;t<i;t++)n[t]=e[t]}function Hs(n,e){let t=au[e];t===void 0&&(t=new Int32Array(e),au[e]=t);for(let i=0;i!==e;++i)t[i]=n.allocateTextureUnit();return t}function rM(n,e){const t=this.cache;t[0]!==e&&(n.uniform1f(this.addr,e),t[0]=e)}function aM(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(nn(t,e))return;n.uniform2fv(this.addr,e),rn(t,e)}}function sM(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(n.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(nn(t,e))return;n.uniform3fv(this.addr,e),rn(t,e)}}function oM(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(nn(t,e))return;n.uniform4fv(this.addr,e),rn(t,e)}}function lM(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(nn(t,e))return;n.uniformMatrix2fv(this.addr,!1,e),rn(t,e)}else{if(nn(t,i))return;lu.set(i),n.uniformMatrix2fv(this.addr,!1,lu),rn(t,i)}}function cM(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(nn(t,e))return;n.uniformMatrix3fv(this.addr,!1,e),rn(t,e)}else{if(nn(t,i))return;ou.set(i),n.uniformMatrix3fv(this.addr,!1,ou),rn(t,i)}}function uM(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(nn(t,e))return;n.uniformMatrix4fv(this.addr,!1,e),rn(t,e)}else{if(nn(t,i))return;su.set(i),n.uniformMatrix4fv(this.addr,!1,su),rn(t,i)}}function hM(n,e){const t=this.cache;t[0]!==e&&(n.uniform1i(this.addr,e),t[0]=e)}function dM(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(nn(t,e))return;n.uniform2iv(this.addr,e),rn(t,e)}}function fM(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(nn(t,e))return;n.uniform3iv(this.addr,e),rn(t,e)}}function pM(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(nn(t,e))return;n.uniform4iv(this.addr,e),rn(t,e)}}function gM(n,e){const t=this.cache;t[0]!==e&&(n.uniform1ui(this.addr,e),t[0]=e)}function mM(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(nn(t,e))return;n.uniform2uiv(this.addr,e),rn(t,e)}}function MM(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(nn(t,e))return;n.uniform3uiv(this.addr,e),rn(t,e)}}function xM(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(nn(t,e))return;n.uniform4uiv(this.addr,e),rn(t,e)}}function _M(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r);let a;this.type===n.SAMPLER_2D_SHADOW?(Al.compareFunction=t.isReversedDepthBuffer()?Jl:$l,a=Al):a=Wh,t.setTexture2D(e||a,r)}function vM(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTexture3D(e||Yh,r)}function bM(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTextureCube(e||Xh,r)}function SM(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTexture2DArray(e||Vh,r)}function EM(n){switch(n){case 5126:return rM;case 35664:return aM;case 35665:return sM;case 35666:return oM;case 35674:return lM;case 35675:return cM;case 35676:return uM;case 5124:case 35670:return hM;case 35667:case 35671:return dM;case 35668:case 35672:return fM;case 35669:case 35673:return pM;case 5125:return gM;case 36294:return mM;case 36295:return MM;case 36296:return xM;case 35678:case 36198:case 36298:case 36306:case 35682:return _M;case 35679:case 36299:case 36307:return vM;case 35680:case 36300:case 36308:case 36293:return bM;case 36289:case 36303:case 36311:case 36292:return SM}}function yM(n,e){n.uniform1fv(this.addr,e)}function wM(n,e){const t=ra(e,this.size,2);n.uniform2fv(this.addr,t)}function AM(n,e){const t=ra(e,this.size,3);n.uniform3fv(this.addr,t)}function TM(n,e){const t=ra(e,this.size,4);n.uniform4fv(this.addr,t)}function RM(n,e){const t=ra(e,this.size,4);n.uniformMatrix2fv(this.addr,!1,t)}function CM(n,e){const t=ra(e,this.size,9);n.uniformMatrix3fv(this.addr,!1,t)}function LM(n,e){const t=ra(e,this.size,16);n.uniformMatrix4fv(this.addr,!1,t)}function DM(n,e){n.uniform1iv(this.addr,e)}function PM(n,e){n.uniform2iv(this.addr,e)}function OM(n,e){n.uniform3iv(this.addr,e)}function IM(n,e){n.uniform4iv(this.addr,e)}function NM(n,e){n.uniform1uiv(this.addr,e)}function FM(n,e){n.uniform2uiv(this.addr,e)}function UM(n,e){n.uniform3uiv(this.addr,e)}function BM(n,e){n.uniform4uiv(this.addr,e)}function kM(n,e,t){const i=this.cache,r=e.length,a=Hs(t,r);nn(i,a)||(n.uniform1iv(this.addr,a),rn(i,a));let o;this.type===n.SAMPLER_2D_SHADOW?o=Al:o=Wh;for(let l=0;l!==r;++l)t.setTexture2D(e[l]||o,a[l])}function zM(n,e,t){const i=this.cache,r=e.length,a=Hs(t,r);nn(i,a)||(n.uniform1iv(this.addr,a),rn(i,a));for(let o=0;o!==r;++o)t.setTexture3D(e[o]||Yh,a[o])}function HM(n,e,t){const i=this.cache,r=e.length,a=Hs(t,r);nn(i,a)||(n.uniform1iv(this.addr,a),rn(i,a));for(let o=0;o!==r;++o)t.setTextureCube(e[o]||Xh,a[o])}function GM(n,e,t){const i=this.cache,r=e.length,a=Hs(t,r);nn(i,a)||(n.uniform1iv(this.addr,a),rn(i,a));for(let o=0;o!==r;++o)t.setTexture2DArray(e[o]||Vh,a[o])}function WM(n){switch(n){case 5126:return yM;case 35664:return wM;case 35665:return AM;case 35666:return TM;case 35674:return RM;case 35675:return CM;case 35676:return LM;case 5124:case 35670:return DM;case 35667:case 35671:return PM;case 35668:case 35672:return OM;case 35669:case 35673:return IM;case 5125:return NM;case 36294:return FM;case 36295:return UM;case 36296:return BM;case 35678:case 36198:case 36298:case 36306:case 35682:return kM;case 35679:case 36299:case 36307:return zM;case 35680:case 36300:case 36308:case 36293:return HM;case 36289:case 36303:case 36311:case 36292:return GM}}class VM{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.setValue=EM(t.type)}}class YM{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=WM(t.type)}}class XM{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,i){const r=this.seq;for(let a=0,o=r.length;a!==o;++a){const l=r[a];l.setValue(e,t[l.id],i)}}}const To=/(\w+)(\])?(\[|\.)?/g;function cu(n,e){n.seq.push(e),n.map[e.id]=e}function KM(n,e,t){const i=n.name,r=i.length;for(To.lastIndex=0;;){const a=To.exec(i),o=To.lastIndex;let l=a[1];const c=a[2]==="]",h=a[3];if(c&&(l=l|0),h===void 0||h==="["&&o+2===r){cu(t,h===void 0?new VM(l,n,e):new YM(l,n,e));break}else{let f=t.map[l];f===void 0&&(f=new XM(l),cu(t,f)),t=f}}}class ys{constructor(e,t){this.seq=[],this.map={};const i=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let o=0;o<i;++o){const l=e.getActiveUniform(t,o),c=e.getUniformLocation(t,l.name);KM(l,c,this)}const r=[],a=[];for(const o of this.seq)o.type===e.SAMPLER_2D_SHADOW||o.type===e.SAMPLER_CUBE_SHADOW||o.type===e.SAMPLER_2D_ARRAY_SHADOW?r.push(o):a.push(o);r.length>0&&(this.seq=r.concat(a))}setValue(e,t,i,r){const a=this.map[t];a!==void 0&&a.setValue(e,i,r)}setOptional(e,t,i){const r=t[i];r!==void 0&&this.setValue(e,i,r)}static upload(e,t,i,r){for(let a=0,o=t.length;a!==o;++a){const l=t[a],c=i[l.id];c.needsUpdate!==!1&&l.setValue(e,c.value,r)}}static seqWithValue(e,t){const i=[];for(let r=0,a=e.length;r!==a;++r){const o=e[r];o.id in t&&i.push(o)}return i}}function uu(n,e,t){const i=n.createShader(e);return n.shaderSource(i,t),n.compileShader(i),i}const qM=37297;let ZM=0;function $M(n,e){const t=n.split(`
`),i=[],r=Math.max(e-6,0),a=Math.min(e+6,t.length);for(let o=r;o<a;o++){const l=o+1;i.push(`${l===e?">":" "} ${l}: ${t[o]}`)}return i.join(`
`)}const hu=new qe;function JM(n){lt._getMatrix(hu,lt.workingColorSpace,n);const e=`mat3( ${hu.elements.map(t=>t.toFixed(4))} )`;switch(lt.getTransfer(n)){case Ls:return[e,"LinearTransferOETF"];case yt:return[e,"sRGBTransferOETF"];default:return Ke("WebGLProgram: Unsupported color space: ",n),[e,"LinearTransferOETF"]}}function du(n,e,t){const i=n.getShaderParameter(e,n.COMPILE_STATUS),a=(n.getShaderInfoLog(e)||"").trim();if(i&&a==="")return"";const o=/ERROR: 0:(\d+)/.exec(a);if(o){const l=parseInt(o[1]);return t.toUpperCase()+`

`+a+`

`+$M(n.getShaderSource(e),l)}else return a}function QM(n,e){const t=JM(e);return[`vec4 ${n}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}const jM={[uh]:"Linear",[hh]:"Reinhard",[dh]:"Cineon",[fh]:"ACESFilmic",[gh]:"AgX",[mh]:"Neutral",[ph]:"Custom"};function e5(n,e){const t=jM[e];return t===void 0?(Ke("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+n+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+n+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const us=new K;function t5(){lt.getLuminanceCoefficients(us);const n=us.x.toFixed(4),e=us.y.toFixed(4),t=us.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${n}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function n5(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",n.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(va).join(`
`)}function i5(n){const e=[];for(const t in n){const i=n[t];i!==!1&&e.push("#define "+t+" "+i)}return e.join(`
`)}function r5(n,e){const t={},i=n.getProgramParameter(e,n.ACTIVE_ATTRIBUTES);for(let r=0;r<i;r++){const a=n.getActiveAttrib(e,r),o=a.name;let l=1;a.type===n.FLOAT_MAT2&&(l=2),a.type===n.FLOAT_MAT3&&(l=3),a.type===n.FLOAT_MAT4&&(l=4),t[o]={type:a.type,location:n.getAttribLocation(e,o),locationSize:l}}return t}function va(n){return n!==""}function fu(n,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return n.replace(/NUM_SUN_LIGHTS/g,e.numSunLights).replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,e.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function pu(n,e){return n.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const a5=/^[ \t]*#include +<([\w\d./]+)>/gm;function Tl(n){return n.replace(a5,o5)}const s5=new Map;function o5(n,e){let t=at[e];if(t===void 0){const i=s5.get(e);if(i!==void 0)t=at[i],Ke('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,i);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+e+">")}return Tl(t)}const l5=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function gu(n){return n.replace(l5,c5)}function c5(n,e,t,i){let r="";for(let a=parseInt(e);a<parseInt(t);a++)r+=i.replace(/\[\s*i\s*\]/g,"[ "+a+" ]").replace(/UNROLLED_LOOP_INDEX/g,a);return r}function mu(n){let e=`precision ${n.precision} float;
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
#define LOW_PRECISION`),e}const u5={[_s]:"SHADOWMAP_TYPE_PCF",[_a]:"SHADOWMAP_TYPE_VSM"};function h5(n){return u5[n.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const d5={[vr]:"ENVMAP_TYPE_CUBE",[Jr]:"ENVMAP_TYPE_CUBE",[Bs]:"ENVMAP_TYPE_CUBE_UV"};function f5(n){return n.envMap===!1?"ENVMAP_TYPE_CUBE":d5[n.envMapMode]||"ENVMAP_TYPE_CUBE"}const p5={[Jr]:"ENVMAP_MODE_REFRACTION"};function g5(n){return n.envMap===!1?"ENVMAP_MODE_REFLECTION":p5[n.envMapMode]||"ENVMAP_MODE_REFLECTION"}const m5={[ch]:"ENVMAP_BLENDING_MULTIPLY",[i1]:"ENVMAP_BLENDING_MIX",[r1]:"ENVMAP_BLENDING_ADD"};function M5(n){return n.envMap===!1?"ENVMAP_BLENDING_NONE":m5[n.combine]||"ENVMAP_BLENDING_NONE"}function x5(n){const e=n.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,i=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:i,maxMip:t}}function _5(n,e,t,i){const r=n.getContext(),a=t.defines;let o=t.vertexShader,l=t.fragmentShader;const c=h5(t),h=f5(t),u=g5(t),f=M5(t),d=x5(t),p=n5(t),g=i5(a),x=r.createProgram();let m,M,_=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(va).join(`
`),m.length>0&&(m+=`
`),M=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(va).join(`
`),M.length>0&&(M+=`
`)):(m=[mu(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexNormals?"#define HAS_NORMAL":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(va).join(`
`),M=[mu(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.envMap?"#define "+u:"",t.envMap?"#define "+f:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.retroreflection?"#define USE_RETROREFLECTION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas||t.batchingColor?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==gi?"#define TONE_MAPPING":"",t.toneMapping!==gi?at.tonemapping_pars_fragment:"",t.toneMapping!==gi?e5("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",at.colorspace_pars_fragment,QM("linearToOutputTexel",t.outputColorSpace),t5(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(va).join(`
`)),o=Tl(o),o=fu(o,t),o=pu(o,t),l=Tl(l),l=fu(l,t),l=pu(l,t),o=gu(o),l=gu(l),t.isRawShaderMaterial!==!0&&(_=`#version 300 es
`,m=[p,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,M=["#define varying in",t.glslVersion===Pc?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Pc?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+M);const A=_+m+o,E=_+M+l,R=uu(r,r.VERTEX_SHADER,A),T=uu(r,r.FRAGMENT_SHADER,E);r.attachShader(x,R),r.attachShader(x,T),t.index0AttributeName!==void 0?r.bindAttribLocation(x,0,t.index0AttributeName):t.hasPositionAttribute===!0&&r.bindAttribLocation(x,0,"position"),r.linkProgram(x);function P(I){if(n.debug.checkShaderErrors){const L=r.getProgramInfoLog(x)||"",N=r.getShaderInfoLog(R)||"",O=r.getShaderInfoLog(T)||"",U=L.trim(),W=N.trim(),F=O.trim();let Q=!0,X=!0;if(r.getProgramParameter(x,r.LINK_STATUS)===!1)if(Q=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(r,x,R,T);else{const te=du(r,R,"vertex"),B=du(r,T,"fragment");pt("WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(x,r.VALIDATE_STATUS)+`

Material Name: `+I.name+`
Material Type: `+I.type+`

Program Info Log: `+U+`
`+te+`
`+B)}else U!==""?Ke("WebGLProgram: Program Info Log:",U):(W===""||F==="")&&(X=!1);X&&(I.diagnostics={runnable:Q,programLog:U,vertexShader:{log:W,prefix:m},fragmentShader:{log:F,prefix:M}})}r.deleteShader(R),r.deleteShader(T),S=new ys(r,x),y=r5(r,x)}let S;this.getUniforms=function(){return S===void 0&&P(this),S};let y;this.getAttributes=function(){return y===void 0&&P(this),y};let C=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return C===!1&&(C=r.getProgramParameter(x,qM)),C},this.destroy=function(){i.releaseStatesOfProgram(this),r.deleteProgram(x),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=ZM++,this.cacheKey=e,this.usedTimes=1,this.program=x,this.vertexShader=R,this.fragmentShader=T,this}let v5=0;class b5{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,i){const r=this._getShaderCacheForMaterial(e);return r.has(t)===!1&&(r.add(t),t.usedTimes++),r.has(i)===!1&&(r.add(i),i.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const i of t)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let i=t.get(e);return i===void 0&&(i=new Set,t.set(e,i)),i}_getShaderStage(e){const t=this.shaderCache;let i=t.get(e);return i===void 0&&(i=new S5(e),t.set(e,i)),i}}class S5{constructor(e){this.id=v5++,this.code=e,this.usedTimes=0}}function E5(n){return n===br||n===Rs||n===Cs}function y5(n,e,t,i,r,a){const o=new Rh,l=new b5,c=new Set,h=[],u=new Map,f=i.logarithmicDepthBuffer;let d=i.precision;const p={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function g(S){return c.add(S),S===0?"uv":`uv${S}`}function x(S,y,C,I,L,N){const O=I.fog,U=L.geometry,W=S.isMeshStandardMaterial||S.isMeshLambertMaterial||S.isMeshPhongMaterial?I.environment:null,F=S.isMeshStandardMaterial||S.isMeshLambertMaterial&&!S.envMap||S.isMeshPhongMaterial&&!S.envMap,Q=e.get(S.envMap||W,F),X=Q&&Q.mapping===Bs?Q.image.height:null,te=p[S.type];S.precision!==null&&(d=i.getMaxPrecision(S.precision),d!==S.precision&&Ke("WebGLProgram.getParameters:",S.precision,"not supported, using",d,"instead."));const B=U.morphAttributes.position||U.morphAttributes.normal||U.morphAttributes.color,ae=B!==void 0?B.length:0;let ue=0;U.morphAttributes.position!==void 0&&(ue=1),U.morphAttributes.normal!==void 0&&(ue=2),U.morphAttributes.color!==void 0&&(ue=3);let Pe,He,Xe,ee;if(te){const Pt=ci[te];Pe=Pt.vertexShader,He=Pt.fragmentShader}else{Pe=S.vertexShader,He=S.fragmentShader;const Pt=l.getVertexShaderStage(S),xt=l.getFragmentShaderStage(S);l.update(S,Pt,xt),Xe=Pt.id,ee=xt.id}const re=n.getRenderTarget(),V=n.state.buffers.depth.getReversed(),he=L.isInstancedMesh===!0,se=L.isBatchedMesh===!0,Ae=!!S.map,tt=!!S.matcap,Oe=!!Q,ze=!!S.aoMap,Je=!!S.lightMap,$e=!!S.bumpMap&&S.wireframe===!1,Ct=!!S.normalMap,zt=!!S.displacementMap,an=!!S.emissiveMap,At=!!S.metalnessMap,Lt=!!S.roughnessMap,H=S.anisotropy>0,it=S.clearcoat>0,Ve=S.dispersion>0,D=S.retroreflectivity>0,b=S.iridescence>0,k=S.sheen>0,Y=S.transmission>0,$=H&&!!S.anisotropyMap,le=it&&!!S.clearcoatMap,fe=it&&!!S.clearcoatNormalMap,j=it&&!!S.clearcoatRoughnessMap,ne=b&&!!S.iridescenceMap,pe=b&&!!S.iridescenceThicknessMap,Ie=k&&!!S.sheenColorMap,ve=k&&!!S.sheenRoughnessMap,Me=!!S.specularMap,Be=!!S.specularColorMap,We=!!S.specularIntensityMap,Qe=Y&&!!S.transmissionMap,G=Y&&!!S.thicknessMap,xe=!!S.gradientMap,ie=!!S.alphaMap,_e=S.alphaTest>0,ye=!!S.alphaHash,oe=!!S.extensions;let ke=gi;S.toneMapped&&(re===null||re.isXRRenderTarget===!0)&&(ke=n.toneMapping);const Ne={shaderID:te,shaderType:S.type,shaderName:S.name,vertexShader:Pe,fragmentShader:He,defines:S.defines,customVertexShaderID:Xe,customFragmentShaderID:ee,isRawShaderMaterial:S.isRawShaderMaterial===!0,glslVersion:S.glslVersion,precision:d,batching:se,batchingColor:se&&L._colorsTexture!==null,instancing:he,instancingColor:he&&L.instanceColor!==null,instancingMorph:he&&L.morphTexture!==null,outputColorSpace:re===null?n.outputColorSpace:re.isXRRenderTarget===!0?re.texture.colorSpace:lt.workingColorSpace,alphaToCoverage:!!S.alphaToCoverage,map:Ae,matcap:tt,envMap:Oe,envMapMode:Oe&&Q.mapping,envMapCubeUVHeight:X,aoMap:ze,lightMap:Je,bumpMap:$e,normalMap:Ct,displacementMap:zt,emissiveMap:an,normalMapObjectSpace:Ct&&S.normalMapType===o1,normalMapTangentSpace:Ct&&S.normalMapType===Dc,packedNormalMap:Ct&&S.normalMapType===Dc&&E5(S.normalMap.format),metalnessMap:At,roughnessMap:Lt,anisotropy:H,anisotropyMap:$,clearcoat:it,clearcoatMap:le,clearcoatNormalMap:fe,clearcoatRoughnessMap:j,dispersion:Ve,retroreflection:D,iridescence:b,iridescenceMap:ne,iridescenceThicknessMap:pe,sheen:k,sheenColorMap:Ie,sheenRoughnessMap:ve,specularMap:Me,specularColorMap:Be,specularIntensityMap:We,transmission:Y,transmissionMap:Qe,thicknessMap:G,gradientMap:xe,opaque:S.transparent===!1&&S.blending===ya&&S.alphaToCoverage===!1,alphaMap:ie,alphaTest:_e,alphaHash:ye,combine:S.combine,mapUv:Ae&&g(S.map.channel),aoMapUv:ze&&g(S.aoMap.channel),lightMapUv:Je&&g(S.lightMap.channel),bumpMapUv:$e&&g(S.bumpMap.channel),normalMapUv:Ct&&g(S.normalMap.channel),displacementMapUv:zt&&g(S.displacementMap.channel),emissiveMapUv:an&&g(S.emissiveMap.channel),metalnessMapUv:At&&g(S.metalnessMap.channel),roughnessMapUv:Lt&&g(S.roughnessMap.channel),anisotropyMapUv:$&&g(S.anisotropyMap.channel),clearcoatMapUv:le&&g(S.clearcoatMap.channel),clearcoatNormalMapUv:fe&&g(S.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:j&&g(S.clearcoatRoughnessMap.channel),iridescenceMapUv:ne&&g(S.iridescenceMap.channel),iridescenceThicknessMapUv:pe&&g(S.iridescenceThicknessMap.channel),sheenColorMapUv:Ie&&g(S.sheenColorMap.channel),sheenRoughnessMapUv:ve&&g(S.sheenRoughnessMap.channel),specularMapUv:Me&&g(S.specularMap.channel),specularColorMapUv:Be&&g(S.specularColorMap.channel),specularIntensityMapUv:We&&g(S.specularIntensityMap.channel),transmissionMapUv:Qe&&g(S.transmissionMap.channel),thicknessMapUv:G&&g(S.thicknessMap.channel),alphaMapUv:ie&&g(S.alphaMap.channel),vertexTangents:!!U.attributes.tangent&&(Ct||H),vertexNormals:!!U.attributes.normal,vertexColors:S.vertexColors,vertexAlphas:S.vertexColors===!0&&!!U.attributes.color&&U.attributes.color.itemSize===4,pointsUvs:L.isPoints===!0&&!!U.attributes.uv&&(Ae||ie),fog:!!O,useFog:S.fog===!0,fogExp2:!!O&&O.isFogExp2,flatShading:S.wireframe===!1&&(S.flatShading===!0||U.attributes.normal===void 0&&Ct===!1&&(S.isMeshLambertMaterial||S.isMeshPhongMaterial||S.isMeshStandardMaterial||S.isMeshPhysicalMaterial)),sizeAttenuation:S.sizeAttenuation===!0,logarithmicDepthBuffer:f,reversedDepthBuffer:V,skinning:L.isSkinnedMesh===!0,hasPositionAttribute:U.attributes.position!==void 0,morphTargets:U.morphAttributes.position!==void 0,morphNormals:U.morphAttributes.normal!==void 0,morphColors:U.morphAttributes.color!==void 0,morphTargetsCount:ae,morphTextureStride:ue,numSunLights:y.sun.length,numDirLights:y.directional.length,numPointLights:y.point.length,numSpotLights:y.spot.length,numSpotLightMaps:y.spotLightMap.length,numRectAreaLights:y.rectArea.length,numHemiLights:y.hemi.length,numSunLightShadows:y.sunShadowMap.length,numDirLightShadows:y.directionalShadowMap.length,numPointLightShadows:y.pointShadowMap.length,numSpotLightShadows:y.spotShadowMap.length,numSpotLightShadowsWithMaps:y.numSpotLightShadowsWithMaps,numLightProbes:y.numLightProbes,numLightProbeGrids:N.length,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:S.dithering,shadowMapEnabled:n.shadowMap.enabled&&C.length>0,shadowMapType:n.shadowMap.type,toneMapping:ke,decodeVideoTexture:Ae&&S.map.isVideoTexture===!0&&lt.getTransfer(S.map.colorSpace)===yt,decodeVideoTextureEmissive:an&&S.emissiveMap.isVideoTexture===!0&&lt.getTransfer(S.emissiveMap.colorSpace)===yt,premultipliedAlpha:S.premultipliedAlpha,doubleSided:S.side===Li,flipSided:S.side===Cn,useDepthPacking:S.depthPacking>=0,depthPacking:S.depthPacking||0,index0AttributeName:S.index0AttributeName,extensionClipCullDistance:oe&&S.extensions.clipCullDistance===!0&&t.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(oe&&S.extensions.multiDraw===!0||se)&&t.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:t.has("KHR_parallel_shader_compile"),customProgramCacheKey:S.customProgramCacheKey()};return Ne.vertexUv1s=c.has(1),Ne.vertexUv2s=c.has(2),Ne.vertexUv3s=c.has(3),c.clear(),Ne}function m(S){const y=[];if(S.shaderID?y.push(S.shaderID):(y.push(S.customVertexShaderID),y.push(S.customFragmentShaderID)),S.defines!==void 0)for(const C in S.defines)y.push(C),y.push(S.defines[C]);return S.isRawShaderMaterial===!1&&(M(y,S),_(y,S),y.push(n.outputColorSpace)),y.push(S.customProgramCacheKey),y.join()}function M(S,y){S.push(y.precision),S.push(y.outputColorSpace),S.push(y.envMapMode),S.push(y.envMapCubeUVHeight),S.push(y.mapUv),S.push(y.alphaMapUv),S.push(y.lightMapUv),S.push(y.aoMapUv),S.push(y.bumpMapUv),S.push(y.normalMapUv),S.push(y.displacementMapUv),S.push(y.emissiveMapUv),S.push(y.metalnessMapUv),S.push(y.roughnessMapUv),S.push(y.anisotropyMapUv),S.push(y.clearcoatMapUv),S.push(y.clearcoatNormalMapUv),S.push(y.clearcoatRoughnessMapUv),S.push(y.iridescenceMapUv),S.push(y.iridescenceThicknessMapUv),S.push(y.sheenColorMapUv),S.push(y.sheenRoughnessMapUv),S.push(y.specularMapUv),S.push(y.specularColorMapUv),S.push(y.specularIntensityMapUv),S.push(y.transmissionMapUv),S.push(y.thicknessMapUv),S.push(y.combine),S.push(y.fogExp2),S.push(y.sizeAttenuation),S.push(y.morphTargetsCount),S.push(y.morphAttributeCount),S.push(y.numSunLights),S.push(y.numDirLights),S.push(y.numPointLights),S.push(y.numSpotLights),S.push(y.numSpotLightMaps),S.push(y.numHemiLights),S.push(y.numRectAreaLights),S.push(y.numSunLightShadows),S.push(y.numDirLightShadows),S.push(y.numPointLightShadows),S.push(y.numSpotLightShadows),S.push(y.numSpotLightShadowsWithMaps),S.push(y.numLightProbes),S.push(y.shadowMapType),S.push(y.toneMapping),S.push(y.numClippingPlanes),S.push(y.numClipIntersection),S.push(y.depthPacking)}function _(S,y){o.disableAll(),y.instancing&&o.enable(0),y.instancingColor&&o.enable(1),y.instancingMorph&&o.enable(2),y.matcap&&o.enable(3),y.envMap&&o.enable(4),y.normalMapObjectSpace&&o.enable(5),y.normalMapTangentSpace&&o.enable(6),y.clearcoat&&o.enable(7),y.iridescence&&o.enable(8),y.alphaTest&&o.enable(9),y.vertexColors&&o.enable(10),y.vertexAlphas&&o.enable(11),y.vertexUv1s&&o.enable(12),y.vertexUv2s&&o.enable(13),y.vertexUv3s&&o.enable(14),y.vertexTangents&&o.enable(15),y.anisotropy&&o.enable(16),y.alphaHash&&o.enable(17),y.batching&&o.enable(18),y.dispersion&&o.enable(19),y.retroreflection&&o.enable(24),y.batchingColor&&o.enable(20),y.gradientMap&&o.enable(21),y.packedNormalMap&&o.enable(22),y.vertexNormals&&o.enable(23),S.push(o.mask),o.disableAll(),y.fog&&o.enable(0),y.useFog&&o.enable(1),y.flatShading&&o.enable(2),y.logarithmicDepthBuffer&&o.enable(3),y.reversedDepthBuffer&&o.enable(4),y.skinning&&o.enable(5),y.morphTargets&&o.enable(6),y.morphNormals&&o.enable(7),y.morphColors&&o.enable(8),y.premultipliedAlpha&&o.enable(9),y.shadowMapEnabled&&o.enable(10),y.doubleSided&&o.enable(11),y.flipSided&&o.enable(12),y.useDepthPacking&&o.enable(13),y.dithering&&o.enable(14),y.transmission&&o.enable(15),y.sheen&&o.enable(16),y.opaque&&o.enable(17),y.pointsUvs&&o.enable(18),y.decodeVideoTexture&&o.enable(19),y.decodeVideoTextureEmissive&&o.enable(20),y.alphaToCoverage&&o.enable(21),y.numLightProbeGrids>0&&o.enable(22),y.hasPositionAttribute&&o.enable(23),S.push(o.mask)}function A(S){const y=p[S.type];let C;if(y){const I=ci[y];C=X1.clone(I.uniforms)}else C=S.uniforms;return C}function E(S,y){let C=u.get(y);return C!==void 0?++C.usedTimes:(C=new _5(n,y,S,r),h.push(C),u.set(y,C)),C}function R(S){if(--S.usedTimes===0){const y=h.indexOf(S);h[y]=h[h.length-1],h.pop(),u.delete(S.cacheKey),S.destroy()}}function T(S){l.remove(S)}function P(){l.dispose()}return{getParameters:x,getProgramCacheKey:m,getUniforms:A,acquireProgram:E,releaseProgram:R,releaseShaderCache:T,programs:h,dispose:P}}function w5(){let n=new WeakMap;function e(o){return n.has(o)}function t(o){let l=n.get(o);return l===void 0&&(l={},n.set(o,l)),l}function i(o){n.delete(o)}function r(o,l,c){n.get(o)[l]=c}function a(){n=new WeakMap}return{has:e,get:t,remove:i,update:r,dispose:a}}function A5(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.material.id!==e.material.id?n.material.id-e.material.id:n.materialVariant!==e.materialVariant?n.materialVariant-e.materialVariant:n.z!==e.z?n.z-e.z:n.id-e.id}function Mu(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.z!==e.z?e.z-n.z:n.id-e.id}function xu(){const n=[];let e=0;const t=[],i=[],r=[];function a(){e=0,t.length=0,i.length=0,r.length=0}function o(d){let p=0;return d.isInstancedMesh&&(p+=2),d.isSkinnedMesh&&(p+=1),p}function l(d,p,g,x,m,M){let _=n[e];return _===void 0?(_={id:d.id,object:d,geometry:p,material:g,materialVariant:o(d),groupOrder:x,renderOrder:d.renderOrder,z:m,group:M},n[e]=_):(_.id=d.id,_.object=d,_.geometry=p,_.material=g,_.materialVariant=o(d),_.groupOrder=x,_.renderOrder=d.renderOrder,_.z=m,_.group=M),e++,_}function c(d,p,g,x,m,M,_){_.reversedDepth===!0&&(m=-m);const A=l(d,p,g,x,m,M);g.transmission>0?i.push(A):g.transparent===!0?r.push(A):t.push(A)}function h(d,p,g,x,m,M){const _=l(d,p,g,x,m,M);g.transmission>0?i.unshift(_):g.transparent===!0?r.unshift(_):t.unshift(_)}function u(d,p){t.length>1&&t.sort(d||A5),i.length>1&&i.sort(p||Mu),r.length>1&&r.sort(p||Mu)}function f(){for(let d=e,p=n.length;d<p;d++){const g=n[d];if(g.id===null)break;g.id=null,g.object=null,g.geometry=null,g.material=null,g.group=null}}return{opaque:t,transmissive:i,transparent:r,init:a,push:c,unshift:h,finish:f,sort:u}}function T5(){let n=new WeakMap;function e(i,r){const a=n.get(i);let o;return a===void 0?(o=new xu,n.set(i,[o])):r>=a.length?(o=new xu,a.push(o)):o=a[r],o}function t(){n=new WeakMap}return{get:e,dispose:t}}function R5(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={direction:new K,color:new Mt};break;case"SpotLight":t={position:new K,direction:new K,color:new Mt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new K,color:new Mt,distance:0,decay:0};break;case"HemisphereLight":t={direction:new K,skyColor:new Mt,groundColor:new Mt};break;case"RectAreaLight":t={color:new Mt,position:new K,halfWidth:new K,halfHeight:new K};break}return n[e.id]=t,t}}}function C5(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ze};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ze};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ze,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[e.id]=t,t}}}let L5=0;function D5(n,e){return(e.castShadow?2:0)-(n.castShadow?2:0)+(e.map?1:0)-(n.map?1:0)}function P5(n){const e=new R5,t=C5(),i={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let h=0;h<9;h++)i.probe.push(new K);const r=new K,a=new Kt,o=new Kt;function l(h){let u=0,f=0,d=0;for(let L=0;L<9;L++)i.probe[L].set(0,0,0);let p=0,g=0,x=0,m=0,M=0,_=0,A=0,E=0,R=0,T=0,P=0,S=0,y=0,C=0;h.sort(D5);for(let L=0,N=h.length;L<N;L++){const O=h[L],U=O.color,W=O.intensity,F=O.distance;let Q=null;if(O.shadow&&O.shadow.map&&(O.shadow.map.texture.format===br?Q=O.shadow.map.texture:Q=O.shadow.map.depthTexture||O.shadow.map.texture),O.isAmbientLight)u+=U.r*W,f+=U.g*W,d+=U.b*W;else if(O.isLightProbe){for(let X=0;X<9;X++)i.probe[X].addScaledVector(O.sh.coefficients[X],W);C++}else if(O.isSunLight){const X=e.get(O);if(X.color.copy(O.color).multiplyScalar(O.intensity),O.castShadow){const te=O.shadow,B=t.get(O);B.shadowIntensity=te.intensity,B.shadowBias=te.bias,B.shadowNormalBias=te.normalBias,B.shadowRadius=te.radius,B.shadowMapSize.copy(te.mapSize).multiply(te.getFrameExtents()),i.sunShadow[g]=B,i.sunShadowMap[g]=Q;const ae=te.getViewportCount();for(let ue=0;ue<ae;ue++)i.sunShadowMatrix[x+ue]=te.getMatrix(ue),i.sunShadowCascade[x+ue]=te._cascadeData[ue];x+=ae,g++}i.sun[p]=X,p++}else if(O.isDirectionalLight){const X=e.get(O);if(X.color.copy(O.color).multiplyScalar(O.intensity),O.castShadow){const te=O.shadow,B=t.get(O);B.shadowIntensity=te.intensity,B.shadowBias=te.bias,B.shadowNormalBias=te.normalBias,B.shadowRadius=te.radius,B.shadowMapSize=te.mapSize,i.directionalShadow[m]=B,i.directionalShadowMap[m]=Q,i.directionalShadowMatrix[m]=O.shadow.matrix,R++}i.directional[m]=X,m++}else if(O.isSpotLight){const X=e.get(O);X.position.setFromMatrixPosition(O.matrixWorld),X.color.copy(U).multiplyScalar(W),X.distance=F,X.coneCos=Math.cos(O.angle),X.penumbraCos=Math.cos(O.angle*(1-O.penumbra)),X.decay=O.decay,i.spot[_]=X;const te=O.shadow;if(O.map&&(i.spotLightMap[S]=O.map,S++,te.updateMatrices(O),O.castShadow&&y++),i.spotLightMatrix[_]=te.matrix,O.castShadow){const B=t.get(O);B.shadowIntensity=te.intensity,B.shadowBias=te.bias,B.shadowNormalBias=te.normalBias,B.shadowRadius=te.radius,B.shadowMapSize=te.mapSize,i.spotShadow[_]=B,i.spotShadowMap[_]=Q,P++}_++}else if(O.isRectAreaLight){const X=e.get(O);X.color.copy(U).multiplyScalar(W),X.halfWidth.set(O.width*.5,0,0),X.halfHeight.set(0,O.height*.5,0),i.rectArea[A]=X,A++}else if(O.isPointLight){const X=e.get(O);if(X.color.copy(O.color).multiplyScalar(O.intensity),X.distance=O.distance,X.decay=O.decay,O.castShadow){const te=O.shadow,B=t.get(O);B.shadowIntensity=te.intensity,B.shadowBias=te.bias,B.shadowNormalBias=te.normalBias,B.shadowRadius=te.radius,B.shadowMapSize=te.mapSize,B.shadowCameraNear=te.camera.near,B.shadowCameraFar=te.camera.far,i.pointShadow[M]=B,i.pointShadowMap[M]=Q,i.pointShadowMatrix[M]=O.shadow.matrix,T++}i.point[M]=X,M++}else if(O.isHemisphereLight){const X=e.get(O);X.skyColor.copy(O.color).multiplyScalar(W),X.groundColor.copy(O.groundColor).multiplyScalar(W),i.hemi[E]=X,E++}}A>0&&(n.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=be.LTC_FLOAT_1,i.rectAreaLTC2=be.LTC_FLOAT_2):(i.rectAreaLTC1=be.LTC_HALF_1,i.rectAreaLTC2=be.LTC_HALF_2)),i.ambient[0]=u,i.ambient[1]=f,i.ambient[2]=d;const I=i.hash;(I.sunLength!==p||I.directionalLength!==m||I.pointLength!==M||I.spotLength!==_||I.rectAreaLength!==A||I.hemiLength!==E||I.numSunShadows!==g||I.numDirectionalShadows!==R||I.numPointShadows!==T||I.numSpotShadows!==P||I.numSpotMaps!==S||I.numLightProbes!==C)&&(i.sun.length=p,i.directional.length=m,i.spot.length=_,i.rectArea.length=A,i.point.length=M,i.hemi.length=E,i.sunShadow.length=g,i.sunShadowMap.length=g,i.sunShadowMatrix.length=x,i.sunShadowCascade.length=x,i.directionalShadow.length=R,i.directionalShadowMap.length=R,i.directionalShadowMatrix.length=R,i.pointShadow.length=T,i.pointShadowMap.length=T,i.pointShadowMatrix.length=T,i.spotShadow.length=P,i.spotShadowMap.length=P,i.spotLightMatrix.length=P+S-y,i.spotLightMap.length=S,i.numSpotLightShadowsWithMaps=y,i.numLightProbes=C,I.sunLength=p,I.directionalLength=m,I.pointLength=M,I.spotLength=_,I.rectAreaLength=A,I.hemiLength=E,I.numSunShadows=g,I.numDirectionalShadows=R,I.numPointShadows=T,I.numSpotShadows=P,I.numSpotMaps=S,I.numLightProbes=C,i.version=L5++)}function c(h,u){let f=0,d=0,p=0,g=0,x=0,m=0;const M=u.matrixWorldInverse;for(let _=0,A=h.length;_<A;_++){const E=h[_];if(E.isSunLight){const R=i.sun[f];R.direction.setFromMatrixPosition(E.matrixWorld),R.direction.transformDirection(M),f++}else if(E.isDirectionalLight){const R=i.directional[d];R.direction.setFromMatrixPosition(E.matrixWorld),r.setFromMatrixPosition(E.target.matrixWorld),R.direction.sub(r),R.direction.transformDirection(M),d++}else if(E.isSpotLight){const R=i.spot[g];R.position.setFromMatrixPosition(E.matrixWorld),R.position.applyMatrix4(M),R.direction.setFromMatrixPosition(E.matrixWorld),r.setFromMatrixPosition(E.target.matrixWorld),R.direction.sub(r),R.direction.transformDirection(M),g++}else if(E.isRectAreaLight){const R=i.rectArea[x];R.position.setFromMatrixPosition(E.matrixWorld),R.position.applyMatrix4(M),o.identity(),a.copy(E.matrixWorld),a.premultiply(M),o.extractRotation(a),R.halfWidth.set(E.width*.5,0,0),R.halfHeight.set(0,E.height*.5,0),R.halfWidth.applyMatrix4(o),R.halfHeight.applyMatrix4(o),x++}else if(E.isPointLight){const R=i.point[p];R.position.setFromMatrixPosition(E.matrixWorld),R.position.applyMatrix4(M),p++}else if(E.isHemisphereLight){const R=i.hemi[m];R.direction.setFromMatrixPosition(E.matrixWorld),R.direction.transformDirection(M),m++}}}return{setup:l,setupView:c,state:i}}function _u(n){const e=new P5(n),t=[],i=[],r=[];function a(d){f.camera=d,t.length=0,i.length=0,r.length=0}function o(d){t.push(d)}function l(d){i.push(d)}function c(d){r.push(d)}function h(){e.setup(t)}function u(d){e.setupView(t,d)}const f={lightsArray:t,shadowsArray:i,lightProbeGridArray:r,camera:null,lights:e,transmissionRenderTarget:{},textureUnits:0};return{init:a,state:f,setupLights:h,setupLightsView:u,pushLight:o,pushShadow:l,pushLightProbeGrid:c}}function O5(n){let e=new WeakMap;function t(r,a=0){const o=e.get(r);let l;return o===void 0?(l=new _u(n),e.set(r,[l])):a>=o.length?(l=new _u(n),o.push(l)):l=o[a],l}function i(){e=new WeakMap}return{get:t,dispose:i}}const I5=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,N5=`uniform sampler2D shadow_pass;
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
}`,F5=[new K(1,0,0),new K(-1,0,0),new K(0,1,0),new K(0,-1,0),new K(0,0,1),new K(0,0,-1)],U5=[new K(0,-1,0),new K(0,-1,0),new K(0,0,1),new K(0,0,-1),new K(0,-1,0),new K(0,-1,0)],vu=new Kt,pa=new K,Ro=new K;function B5(n,e,t){let i=new ec;const r=new Ze,a=new Ze,o=new kt,l=new $1,c=new J1,h={},u=t.maxTextureSize,f={[_r]:Cn,[Cn]:_r,[Li]:Li},d=new vn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Ze},radius:{value:4}},vertexShader:I5,fragmentShader:N5}),p=d.clone();p.defines.HORIZONTAL_PASS=1;const g=new vi;g.setAttribute("position",new mi(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const x=new wn(g,d),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=_s;let M=this.type;this.render=function(T,P,S){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||T.length===0)return;this.type===Bp&&(Ke("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."),this.type=_s);const y=n.getRenderTarget(),C=n.getActiveCubeFace(),I=n.getActiveMipmapLevel(),L=n.state;L.setBlending(Fi),L.buffers.depth.getReversed()===!0?L.buffers.color.setClear(0,0,0,0):L.buffers.color.setClear(1,1,1,1),L.buffers.depth.setTest(!0),L.setScissorTest(!1);const N=M!==this.type;N&&P.traverse(function(O){O.material&&(Array.isArray(O.material)?O.material.forEach(U=>U.needsUpdate=!0):O.material.needsUpdate=!0)});for(let O=0,U=T.length;O<U;O++){const W=T[O],F=W.shadow;if(F===void 0){Ke("WebGLShadowMap:",W,"has no shadow.");continue}if(F.autoUpdate===!1&&F.needsUpdate===!1)continue;r.copy(F.mapSize);const Q=F.getFrameExtents();r.multiply(Q),a.copy(F.mapSize),(r.x>u||r.y>u)&&(r.x>u&&(a.x=Math.floor(u/Q.x),r.x=a.x*Q.x,F.mapSize.x=a.x),r.y>u&&(a.y=Math.floor(u/Q.y),r.y=a.y*Q.y,F.mapSize.y=a.y));const X=n.state.buffers.depth.getReversed();if(F.camera._reversedDepth=X,F.map===null||N===!0){if(F.map!==null&&(F.map.depthTexture!==null&&(F.map.depthTexture.dispose(),F.map.depthTexture=null),F.map.dispose()),this.type===_a){if(W.isPointLight){Ke("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}F.map=new Gn(r.x,r.y,{format:br,type:_i,minFilter:$t,magFilter:$t,generateMipmaps:!1}),F.map.texture.name=W.name+".shadowMap",F.map.depthTexture=new Da(r.x,r.y,fi),F.map.depthTexture.name=W.name+".shadowMapDepth",F.map.depthTexture.format=zi,F.map.depthTexture.compareFunction=null,F.map.depthTexture.minFilter=tn,F.map.depthTexture.magFilter=tn}else W.isPointLight?(F.map=new Gh(r.x),F.map.depthTexture=new V1(r.x,xi)):(F.map=new Gn(r.x,r.y),F.map.depthTexture=new Da(r.x,r.y,xi)),F.map.depthTexture.name=W.name+".shadowMap",F.map.depthTexture.format=zi,this.type===_s?(F.map.depthTexture.compareFunction=X?Jl:$l,F.map.depthTexture.minFilter=$t,F.map.depthTexture.magFilter=$t):(F.map.depthTexture.compareFunction=null,F.map.depthTexture.minFilter=tn,F.map.depthTexture.magFilter=tn);F.camera.updateProjectionMatrix()}F.map.isWebGLCubeRenderTarget!==!0&&(F.map.width!==r.x||F.map.height!==r.y)&&F.map.setSize(r.x,r.y);const te=F.map.isWebGLCubeRenderTarget?6:F.getViewportCount();W.isPointLight!==!0&&F.updateMatrices(W,S);for(let B=0;B<te;B++){const ae=F.getCamera(B);if(W.isPointLight){const ue=F.camera,Pe=F.matrix,He=W.distance||ue.far;He!==ue.far&&(ue.far=He,ue.updateProjectionMatrix()),pa.setFromMatrixPosition(W.matrixWorld),ue.position.copy(pa),Ro.copy(ue.position),Ro.add(F5[B]),ue.up.copy(U5[B]),ue.lookAt(Ro),ue.updateMatrixWorld(),Pe.makeTranslation(-pa.x,-pa.y,-pa.z),vu.multiplyMatrices(ue.projectionMatrix,ue.matrixWorldInverse),F._frustum.setFromProjectionMatrix(vu,ue.coordinateSystem,ue.reversedDepth)}if(F.map.isWebGLCubeRenderTarget)n.setRenderTarget(F.map,B),n.clear();else{B===0&&(n.setRenderTarget(F.map),n.clear());const ue=F.getViewport(B);o.set(a.x*ue.x,a.y*ue.y,a.x*ue.z,a.y*ue.w),L.viewport(o)}i=F.getFrustum(B),E(P,S,ae,W,this.type)}F.isPointLightShadow!==!0&&this.type===_a&&_(F,S),F.needsUpdate=!1}M=this.type,m.needsUpdate=!1,n.setRenderTarget(y,C,I)};function _(T,P){const S=e.update(x);d.defines.VSM_SAMPLES!==T.blurSamples&&(d.defines.VSM_SAMPLES=T.blurSamples,p.defines.VSM_SAMPLES=T.blurSamples,d.needsUpdate=!0,p.needsUpdate=!0),T.mapPass===null?T.mapPass=new Gn(r.x,r.y,{format:br,type:_i}):(T.mapPass.width!==T.map.width||T.mapPass.height!==T.map.height)&&T.mapPass.setSize(T.map.width,T.map.height),d.uniforms.shadow_pass.value=T.map.depthTexture,d.uniforms.resolution.value.set(T.map.width,T.map.height),d.uniforms.radius.value=T.radius,n.setRenderTarget(T.mapPass),n.clear(),n.renderBufferDirect(P,null,S,d,x,null),p.uniforms.shadow_pass.value=T.mapPass.texture,p.uniforms.resolution.value.set(T.map.width,T.map.height),p.uniforms.radius.value=T.radius,n.setRenderTarget(T.map),n.clear(),n.renderBufferDirect(P,null,S,p,x,null)}function A(T,P,S,y){let C=null;const I=S.isPointLight===!0?T.customDistanceMaterial:T.customDepthMaterial;if(I!==void 0)C=I;else if(C=S.isPointLight===!0?c:l,n.localClippingEnabled&&P.clipShadows===!0&&Array.isArray(P.clippingPlanes)&&P.clippingPlanes.length!==0||P.displacementMap&&P.displacementScale!==0||P.alphaMap&&P.alphaTest>0||P.map&&P.alphaTest>0||P.alphaToCoverage===!0){const L=C.uuid,N=P.uuid;let O=h[L];O===void 0&&(O={},h[L]=O);let U=O[N];U===void 0&&(U=C.clone(),O[N]=U,P.addEventListener("dispose",R)),C=U}if(C.visible=P.visible,C.wireframe=P.wireframe,y===_a?C.side=P.shadowSide!==null?P.shadowSide:P.side:C.side=P.shadowSide!==null?P.shadowSide:f[P.side],C.alphaMap=P.alphaMap,C.alphaTest=P.alphaToCoverage===!0?.5:P.alphaTest,C.map=P.map,C.clipShadows=P.clipShadows,C.clippingPlanes=P.clippingPlanes,C.clipIntersection=P.clipIntersection,C.displacementMap=P.displacementMap,C.displacementScale=P.displacementScale,C.displacementBias=P.displacementBias,C.wireframeLinewidth=P.wireframeLinewidth,C.linewidth=P.linewidth,S.isPointLight===!0&&C.isMeshDistanceMaterial===!0){const L=n.properties.get(C);L.light=S}return C}function E(T,P,S,y,C){if(T.visible===!1)return;if(T.layers.test(P.layers)&&(T.isMesh||T.isLine||T.isPoints)&&(T.castShadow||T.receiveShadow&&C===_a)&&(!T.frustumCulled||T.intersectsFrustum(i))){T.modelViewMatrix.multiplyMatrices(S.matrixWorldInverse,T.matrixWorld);const N=e.update(T),O=T.material;if(Array.isArray(O)){const U=N.groups;for(let W=0,F=U.length;W<F;W++){const Q=U[W],X=O[Q.materialIndex];if(X&&X.visible){const te=A(T,X,y,C);T.onBeforeShadow(n,T,P,S,N,te,Q),n.renderBufferDirect(S,null,N,te,T,Q),T.onAfterShadow(n,T,P,S,N,te,Q)}}}else if(O.visible){const U=A(T,O,y,C);T.onBeforeShadow(n,T,P,S,N,U,null),n.renderBufferDirect(S,null,N,U,T,null),T.onAfterShadow(n,T,P,S,N,U,null)}}const L=T.children;for(let N=0,O=L.length;N<O;N++)E(L[N],P,S,y,C)}function R(T){T.target.removeEventListener("dispose",R);for(const S in h){const y=h[S],C=T.target.uuid;C in y&&(y[C].dispose(),delete y[C])}}}function k5(n,e){function t(){let G=!1;const xe=new kt;let ie=null;const _e=new kt(0,0,0,0);return{setMask:function(ye){ie!==ye&&!G&&(n.colorMask(ye,ye,ye,ye),ie=ye)},setLocked:function(ye){G=ye},setClear:function(ye,oe,ke,Ne,Pt){Pt===!0&&(ye*=Ne,oe*=Ne,ke*=Ne),xe.set(ye,oe,ke,Ne),_e.equals(xe)===!1&&(n.clearColor(ye,oe,ke,Ne),_e.copy(xe))},reset:function(){G=!1,ie=null,_e.set(-1,0,0,0)}}}function i(){let G=!1,xe=!1,ie=null,_e=null,ye=null;return{setReversed:function(oe){if(xe!==oe){const ke=e.get("EXT_clip_control");oe?ke.clipControlEXT(ke.LOWER_LEFT_EXT,ke.ZERO_TO_ONE_EXT):ke.clipControlEXT(ke.LOWER_LEFT_EXT,ke.NEGATIVE_ONE_TO_ONE_EXT),xe=oe;const Ne=ye;ye=null,this.setClear(Ne)}},getReversed:function(){return xe},setTest:function(oe){oe?re(n.DEPTH_TEST):V(n.DEPTH_TEST)},setMask:function(oe){ie!==oe&&!G&&(n.depthMask(oe),ie=oe)},setFunc:function(oe){if(xe&&(oe=_1[oe]),_e!==oe){switch(oe){case zo:n.depthFunc(n.NEVER);break;case Ho:n.depthFunc(n.ALWAYS);break;case Go:n.depthFunc(n.LESS);break;case Ta:n.depthFunc(n.LEQUAL);break;case Wo:n.depthFunc(n.EQUAL);break;case Vo:n.depthFunc(n.GEQUAL);break;case Yo:n.depthFunc(n.GREATER);break;case Xo:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}_e=oe}},setLocked:function(oe){G=oe},setClear:function(oe){ye!==oe&&(ye=oe,xe&&(oe=1-oe),n.clearDepth(oe))},reset:function(){G=!1,ie=null,_e=null,ye=null,xe=!1}}}function r(){let G=!1,xe=null,ie=null,_e=null,ye=null,oe=null,ke=null,Ne=null,Pt=null;return{setTest:function(xt){G||(xt?re(n.STENCIL_TEST):V(n.STENCIL_TEST))},setMask:function(xt){xe!==xt&&!G&&(n.stencilMask(xt),xe=xt)},setFunc:function(xt,Vn,ti){(ie!==xt||_e!==Vn||ye!==ti)&&(n.stencilFunc(xt,Vn,ti),ie=xt,_e=Vn,ye=ti)},setOp:function(xt,Vn,ti){(oe!==xt||ke!==Vn||Ne!==ti)&&(n.stencilOp(xt,Vn,ti),oe=xt,ke=Vn,Ne=ti)},setLocked:function(xt){G=xt},setClear:function(xt){Pt!==xt&&(n.clearStencil(xt),Pt=xt)},reset:function(){G=!1,xe=null,ie=null,_e=null,ye=null,oe=null,ke=null,Ne=null,Pt=null}}}const a=new t,o=new i,l=new r,c=new WeakMap,h=new WeakMap;let u={},f={},d={},p=new WeakMap,g=[],x=null,m=!1,M=null,_=null,A=null,E=null,R=null,T=null,P=null,S=new Mt(0,0,0),y=0,C=!1,I=null,L=null,N=null,O=null,U=null;const W=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let F=!1,Q=0;const X=n.getParameter(n.VERSION);X.indexOf("WebGL")!==-1?(Q=parseFloat(/^WebGL (\d)/.exec(X)[1]),F=Q>=1):X.indexOf("OpenGL ES")!==-1&&(Q=parseFloat(/^OpenGL ES (\d)/.exec(X)[1]),F=Q>=2);let te=null,B={};const ae=n.getParameter(n.SCISSOR_BOX),ue=n.getParameter(n.VIEWPORT),Pe=new kt().fromArray(ae),He=new kt().fromArray(ue);function Xe(G,xe,ie,_e){const ye=new Uint8Array(4),oe=n.createTexture();n.bindTexture(G,oe),n.texParameteri(G,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(G,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let ke=0;ke<ie;ke++)G===n.TEXTURE_3D||G===n.TEXTURE_2D_ARRAY?n.texImage3D(xe,0,n.RGBA,1,1,_e,0,n.RGBA,n.UNSIGNED_BYTE,ye):n.texImage2D(xe+ke,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,ye);return oe}const ee={};ee[n.TEXTURE_2D]=Xe(n.TEXTURE_2D,n.TEXTURE_2D,1),ee[n.TEXTURE_CUBE_MAP]=Xe(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),ee[n.TEXTURE_2D_ARRAY]=Xe(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),ee[n.TEXTURE_3D]=Xe(n.TEXTURE_3D,n.TEXTURE_3D,1,1),a.setClear(0,0,0,1),o.setClear(1),l.setClear(0),re(n.DEPTH_TEST),o.setFunc(Ta),$e(!1),Ct(Tc),re(n.CULL_FACE),ze(Fi);function re(G){u[G]!==!0&&(n.enable(G),u[G]=!0)}function V(G){u[G]!==!1&&(n.disable(G),u[G]=!1)}function he(G,xe){return d[G]!==xe?(n.bindFramebuffer(G,xe),d[G]=xe,G===n.DRAW_FRAMEBUFFER&&(d[n.FRAMEBUFFER]=xe),G===n.FRAMEBUFFER&&(d[n.DRAW_FRAMEBUFFER]=xe),!0):!1}function se(G,xe){let ie=g,_e=!1;if(G){ie=p.get(xe),ie===void 0&&(ie=[],p.set(xe,ie));const ye=G.textures;if(ie.length!==ye.length||ie[0]!==n.COLOR_ATTACHMENT0){for(let oe=0,ke=ye.length;oe<ke;oe++)ie[oe]=n.COLOR_ATTACHMENT0+oe;ie.length=ye.length,_e=!0}}else ie[0]!==n.BACK&&(ie[0]=n.BACK,_e=!0);_e&&n.drawBuffers(ie)}function Ae(G){return x!==G?(n.useProgram(G),x=G,!0):!1}const tt={[Hr]:n.FUNC_ADD,[zp]:n.FUNC_SUBTRACT,[Hp]:n.FUNC_REVERSE_SUBTRACT};tt[Gp]=n.MIN,tt[Wp]=n.MAX;const Oe={[Vp]:n.ZERO,[Yp]:n.ONE,[Xp]:n.SRC_COLOR,[oh]:n.SRC_ALPHA,[Qp]:n.SRC_ALPHA_SATURATE,[$p]:n.DST_COLOR,[qp]:n.DST_ALPHA,[Kp]:n.ONE_MINUS_SRC_COLOR,[lh]:n.ONE_MINUS_SRC_ALPHA,[Jp]:n.ONE_MINUS_DST_COLOR,[Zp]:n.ONE_MINUS_DST_ALPHA,[jp]:n.CONSTANT_COLOR,[e1]:n.ONE_MINUS_CONSTANT_COLOR,[t1]:n.CONSTANT_ALPHA,[n1]:n.ONE_MINUS_CONSTANT_ALPHA};function ze(G,xe,ie,_e,ye,oe,ke,Ne,Pt,xt){if(G===Fi){m===!0&&(V(n.BLEND),m=!1);return}if(m===!1&&(re(n.BLEND),m=!0),G!==kp){if(G!==M||xt!==C){if((_!==Hr||R!==Hr)&&(n.blendEquation(n.FUNC_ADD),_=Hr,R=Hr),xt)switch(G){case ya:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case Rc:n.blendFunc(n.ONE,n.ONE);break;case Cc:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case Lc:n.blendFuncSeparate(n.DST_COLOR,n.ONE_MINUS_SRC_ALPHA,n.ZERO,n.ONE);break;default:pt("WebGLState: Invalid blending: ",G);break}else switch(G){case ya:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case Rc:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE,n.ONE,n.ONE);break;case Cc:pt("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Lc:pt("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:pt("WebGLState: Invalid blending: ",G);break}A=null,E=null,T=null,P=null,S.set(0,0,0),y=0,M=G,C=xt}return}ye=ye||xe,oe=oe||ie,ke=ke||_e,(xe!==_||ye!==R)&&(n.blendEquationSeparate(tt[xe],tt[ye]),_=xe,R=ye),(ie!==A||_e!==E||oe!==T||ke!==P)&&(n.blendFuncSeparate(Oe[ie],Oe[_e],Oe[oe],Oe[ke]),A=ie,E=_e,T=oe,P=ke),(Ne.equals(S)===!1||Pt!==y)&&(n.blendColor(Ne.r,Ne.g,Ne.b,Pt),S.copy(Ne),y=Pt),M=G,C=!1}function Je(G,xe){G.side===Li?V(n.CULL_FACE):re(n.CULL_FACE);let ie=G.side===Cn;xe&&(ie=!ie),$e(ie),G.blending===ya&&G.transparent===!1?ze(Fi):ze(G.blending,G.blendEquation,G.blendSrc,G.blendDst,G.blendEquationAlpha,G.blendSrcAlpha,G.blendDstAlpha,G.blendColor,G.blendAlpha,G.premultipliedAlpha),o.setFunc(G.depthFunc),o.setTest(G.depthTest),o.setMask(G.depthWrite),a.setMask(G.colorWrite);const _e=G.stencilWrite;l.setTest(_e),_e&&(l.setMask(G.stencilWriteMask),l.setFunc(G.stencilFunc,G.stencilRef,G.stencilFuncMask),l.setOp(G.stencilFail,G.stencilZFail,G.stencilZPass)),an(G.polygonOffset,G.polygonOffsetFactor,G.polygonOffsetUnits),G.alphaToCoverage===!0?re(n.SAMPLE_ALPHA_TO_COVERAGE):V(n.SAMPLE_ALPHA_TO_COVERAGE)}function $e(G){I!==G&&(G?n.frontFace(n.CW):n.frontFace(n.CCW),I=G)}function Ct(G){G!==Fp?(re(n.CULL_FACE),G!==L&&(G===Tc?n.cullFace(n.BACK):G===Up?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):V(n.CULL_FACE),L=G}function zt(G){G!==N&&(F&&n.lineWidth(G),N=G)}function an(G,xe,ie){G?(re(n.POLYGON_OFFSET_FILL),(O!==xe||U!==ie)&&(O=xe,U=ie,o.getReversed()&&(xe=-xe),n.polygonOffset(xe,ie))):V(n.POLYGON_OFFSET_FILL)}function At(G){G?re(n.SCISSOR_TEST):V(n.SCISSOR_TEST)}function Lt(G){G===void 0&&(G=n.TEXTURE0+W-1),te!==G&&(n.activeTexture(G),te=G)}function H(G,xe,ie){ie===void 0&&(te===null?ie=n.TEXTURE0+W-1:ie=te);let _e=B[ie];_e===void 0&&(_e={type:void 0,texture:void 0},B[ie]=_e),(_e.type!==G||_e.texture!==xe)&&(te!==ie&&(n.activeTexture(ie),te=ie),n.bindTexture(G,xe||ee[G]),_e.type=G,_e.texture=xe)}function it(){const G=B[te];G!==void 0&&G.type!==void 0&&(n.bindTexture(G.type,null),G.type=void 0,G.texture=void 0)}function Ve(){try{n.compressedTexImage2D(...arguments)}catch(G){pt("WebGLState:",G)}}function D(){try{n.compressedTexImage3D(...arguments)}catch(G){pt("WebGLState:",G)}}function b(){try{n.texSubImage2D(...arguments)}catch(G){pt("WebGLState:",G)}}function k(){try{n.texSubImage3D(...arguments)}catch(G){pt("WebGLState:",G)}}function Y(){try{n.compressedTexSubImage2D(...arguments)}catch(G){pt("WebGLState:",G)}}function $(){try{n.compressedTexSubImage3D(...arguments)}catch(G){pt("WebGLState:",G)}}function le(){try{n.texStorage2D(...arguments)}catch(G){pt("WebGLState:",G)}}function fe(){try{n.texStorage3D(...arguments)}catch(G){pt("WebGLState:",G)}}function j(){try{n.texImage2D(...arguments)}catch(G){pt("WebGLState:",G)}}function ne(){try{n.texImage3D(...arguments)}catch(G){pt("WebGLState:",G)}}function pe(G){return f[G]!==void 0?f[G]:n.getParameter(G)}function Ie(G,xe){f[G]!==xe&&(n.pixelStorei(G,xe),f[G]=xe)}function ve(G){Pe.equals(G)===!1&&(n.scissor(G.x,G.y,G.z,G.w),Pe.copy(G))}function Me(G){He.equals(G)===!1&&(n.viewport(G.x,G.y,G.z,G.w),He.copy(G))}function Be(G,xe){let ie=h.get(xe);ie===void 0&&(ie=new WeakMap,h.set(xe,ie));let _e=ie.get(G);_e===void 0&&(_e=n.getUniformBlockIndex(xe,G.name),ie.set(G,_e))}function We(G,xe){const _e=h.get(xe).get(G);c.get(xe)!==_e&&(n.uniformBlockBinding(xe,_e,G.__bindingPointIndex),c.set(xe,_e))}function Qe(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),o.setReversed(!1),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),n.pixelStorei(n.PACK_ALIGNMENT,4),n.pixelStorei(n.UNPACK_ALIGNMENT,4),n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,!1),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,n.BROWSER_DEFAULT_WEBGL),n.pixelStorei(n.PACK_ROW_LENGTH,0),n.pixelStorei(n.PACK_SKIP_PIXELS,0),n.pixelStorei(n.PACK_SKIP_ROWS,0),n.pixelStorei(n.UNPACK_ROW_LENGTH,0),n.pixelStorei(n.UNPACK_IMAGE_HEIGHT,0),n.pixelStorei(n.UNPACK_SKIP_PIXELS,0),n.pixelStorei(n.UNPACK_SKIP_ROWS,0),n.pixelStorei(n.UNPACK_SKIP_IMAGES,0),u={},f={},te=null,B={},d={},p=new WeakMap,g=[],x=null,m=!1,M=null,_=null,A=null,E=null,R=null,T=null,P=null,S=new Mt(0,0,0),y=0,C=!1,I=null,L=null,N=null,O=null,U=null,Pe.set(0,0,n.canvas.width,n.canvas.height),He.set(0,0,n.canvas.width,n.canvas.height),a.reset(),o.reset(),l.reset()}return{buffers:{color:a,depth:o,stencil:l},enable:re,disable:V,bindFramebuffer:he,drawBuffers:se,useProgram:Ae,setBlending:ze,setMaterial:Je,setFlipSided:$e,setCullFace:Ct,setLineWidth:zt,setPolygonOffset:an,setScissorTest:At,activeTexture:Lt,bindTexture:H,unbindTexture:it,compressedTexImage2D:Ve,compressedTexImage3D:D,texImage2D:j,texImage3D:ne,pixelStorei:Ie,getParameter:pe,updateUBOMapping:Be,uniformBlockBinding:We,texStorage2D:le,texStorage3D:fe,texSubImage2D:b,texSubImage3D:k,compressedTexSubImage2D:Y,compressedTexSubImage3D:$,scissor:ve,viewport:Me,reset:Qe}}function z5(n,e,t,i,r,a,o){const l=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),h=new Ze,u=new WeakMap,f=new Set;let d;const p=new WeakMap;let g=!1;try{g=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function x(D,b){return g?new OffscreenCanvas(D,b):Ps("canvas")}function m(D,b,k){let Y=1;const $=Ve(D);if(($.width>k||$.height>k)&&(Y=k/Math.max($.width,$.height)),Y<1)if(typeof HTMLImageElement<"u"&&D instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&D instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&D instanceof ImageBitmap||typeof VideoFrame<"u"&&D instanceof VideoFrame){const le=Math.floor(Y*$.width),fe=Math.floor(Y*$.height);d===void 0&&(d=x(le,fe));const j=b?x(le,fe):d;return j.width=le,j.height=fe,j.getContext("2d").drawImage(D,0,0,le,fe),Ke("WebGLRenderer: Texture has been resized from ("+$.width+"x"+$.height+") to ("+le+"x"+fe+")."),j}else return"data"in D&&Ke("WebGLRenderer: Image in DataTexture is too big ("+$.width+"x"+$.height+")."),D;return D}function M(D){return D.generateMipmaps}function _(D){n.generateMipmap(D)}function A(D){return D.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:D.isWebGL3DRenderTarget?n.TEXTURE_3D:D.isWebGLArrayRenderTarget||D.isCompressedArrayTexture?n.TEXTURE_2D_ARRAY:n.TEXTURE_2D}function E(D,b,k,Y,$,le=!1){if(D!==null){if(n[D]!==void 0)return n[D];Ke("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+D+"'")}let fe;Y&&(fe=e.get("EXT_texture_norm16"),fe||Ke("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let j=b;if(b===n.RED&&(k===n.FLOAT&&(j=n.R32F),k===n.HALF_FLOAT&&(j=n.R16F),k===n.UNSIGNED_BYTE&&(j=n.R8),k===n.UNSIGNED_SHORT&&fe&&(j=fe.R16_EXT),k===n.SHORT&&fe&&(j=fe.R16_SNORM_EXT)),b===n.RED_INTEGER&&(k===n.UNSIGNED_BYTE&&(j=n.R8UI),k===n.UNSIGNED_SHORT&&(j=n.R16UI),k===n.UNSIGNED_INT&&(j=n.R32UI),k===n.BYTE&&(j=n.R8I),k===n.SHORT&&(j=n.R16I),k===n.INT&&(j=n.R32I)),b===n.RG&&(k===n.FLOAT&&(j=n.RG32F),k===n.HALF_FLOAT&&(j=n.RG16F),k===n.UNSIGNED_BYTE&&(j=n.RG8),k===n.UNSIGNED_SHORT&&fe&&(j=fe.RG16_EXT),k===n.SHORT&&fe&&(j=fe.RG16_SNORM_EXT)),b===n.RG_INTEGER&&(k===n.UNSIGNED_BYTE&&(j=n.RG8UI),k===n.UNSIGNED_SHORT&&(j=n.RG16UI),k===n.UNSIGNED_INT&&(j=n.RG32UI),k===n.BYTE&&(j=n.RG8I),k===n.SHORT&&(j=n.RG16I),k===n.INT&&(j=n.RG32I)),b===n.RGB_INTEGER&&(k===n.UNSIGNED_BYTE&&(j=n.RGB8UI),k===n.UNSIGNED_SHORT&&(j=n.RGB16UI),k===n.UNSIGNED_INT&&(j=n.RGB32UI),k===n.BYTE&&(j=n.RGB8I),k===n.SHORT&&(j=n.RGB16I),k===n.INT&&(j=n.RGB32I)),b===n.RGBA_INTEGER&&(k===n.UNSIGNED_BYTE&&(j=n.RGBA8UI),k===n.UNSIGNED_SHORT&&(j=n.RGBA16UI),k===n.UNSIGNED_INT&&(j=n.RGBA32UI),k===n.BYTE&&(j=n.RGBA8I),k===n.SHORT&&(j=n.RGBA16I),k===n.INT&&(j=n.RGBA32I)),b===n.RGB&&(k===n.UNSIGNED_SHORT&&fe&&(j=fe.RGB16_EXT),k===n.SHORT&&fe&&(j=fe.RGB16_SNORM_EXT),k===n.UNSIGNED_INT_5_9_9_9_REV&&(j=n.RGB9_E5),k===n.UNSIGNED_INT_10F_11F_11F_REV&&(j=n.R11F_G11F_B10F)),b===n.RGBA){const ne=le?Ls:lt.getTransfer($);k===n.FLOAT&&(j=n.RGBA32F),k===n.HALF_FLOAT&&(j=n.RGBA16F),k===n.UNSIGNED_BYTE&&(j=ne===yt?n.SRGB8_ALPHA8:n.RGBA8),k===n.UNSIGNED_SHORT&&fe&&(j=fe.RGBA16_EXT),k===n.SHORT&&fe&&(j=fe.RGBA16_SNORM_EXT),k===n.UNSIGNED_SHORT_4_4_4_4&&(j=n.RGBA4),k===n.UNSIGNED_SHORT_5_5_5_1&&(j=n.RGB5_A1)}return(j===n.R16F||j===n.R32F||j===n.RG16F||j===n.RG32F||j===n.RGBA16F||j===n.RGBA32F)&&e.get("EXT_color_buffer_float"),j}function R(D,b){let k;return D?b===null||b===xi||b===Ca?k=n.DEPTH24_STENCIL8:b===fi?k=n.DEPTH32F_STENCIL8:b===Ra&&(k=n.DEPTH24_STENCIL8,Ke("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):b===null||b===xi||b===Ca?k=n.DEPTH_COMPONENT24:b===fi?k=n.DEPTH_COMPONENT32F:b===Ra&&(k=n.DEPTH_COMPONENT16),k}function T(D,b){return M(D)===!0||D.isFramebufferTexture&&D.minFilter!==tn&&D.minFilter!==$t?Math.log2(Math.max(b.width,b.height))+1:D.mipmaps!==void 0&&D.mipmaps.length>0?D.mipmaps.length:D.isCompressedTexture&&Array.isArray(D.image)?b.mipmaps.length:1}function P(D){const b=D.target;b.removeEventListener("dispose",P),y(b),b.isVideoTexture&&u.delete(b),b.isHTMLTexture&&f.delete(b)}function S(D){const b=D.target;b.removeEventListener("dispose",S),I(b)}function y(D){const b=i.get(D);if(b.__webglInit===void 0)return;const k=D.source,Y=p.get(k);if(Y){const $=Y[b.__cacheKey];$.usedTimes--,$.usedTimes===0&&C(D),Object.keys(Y).length===0&&p.delete(k)}i.remove(D)}function C(D){const b=i.get(D);n.deleteTexture(b.__webglTexture);const k=D.source,Y=p.get(k);delete Y[b.__cacheKey],o.memory.textures--}function I(D){const b=i.get(D);if(D.depthTexture&&(D.depthTexture.dispose(),i.remove(D.depthTexture)),D.isWebGLCubeRenderTarget)for(let Y=0;Y<6;Y++){if(Array.isArray(b.__webglFramebuffer[Y]))for(let $=0;$<b.__webglFramebuffer[Y].length;$++)n.deleteFramebuffer(b.__webglFramebuffer[Y][$]);else n.deleteFramebuffer(b.__webglFramebuffer[Y]);b.__webglDepthbuffer&&n.deleteRenderbuffer(b.__webglDepthbuffer[Y])}else{if(Array.isArray(b.__webglFramebuffer))for(let Y=0;Y<b.__webglFramebuffer.length;Y++)n.deleteFramebuffer(b.__webglFramebuffer[Y]);else n.deleteFramebuffer(b.__webglFramebuffer);if(b.__webglDepthbuffer&&n.deleteRenderbuffer(b.__webglDepthbuffer),b.__webglMultisampledFramebuffer&&n.deleteFramebuffer(b.__webglMultisampledFramebuffer),b.__webglColorRenderbuffer)for(let Y=0;Y<b.__webglColorRenderbuffer.length;Y++)b.__webglColorRenderbuffer[Y]&&n.deleteRenderbuffer(b.__webglColorRenderbuffer[Y]);b.__webglDepthRenderbuffer&&n.deleteRenderbuffer(b.__webglDepthRenderbuffer)}const k=D.textures;for(let Y=0,$=k.length;Y<$;Y++){const le=i.get(k[Y]);le.__webglTexture&&(n.deleteTexture(le.__webglTexture),o.memory.textures--),i.remove(k[Y])}i.remove(D)}let L=0;function N(){L=0}function O(){return L}function U(D){L=D}function W(){const D=L;return D>=r.maxTextures&&Ke("WebGLTextures: Trying to use "+(D+1)+" texture units while this GPU supports only "+r.maxTextures),L+=1,D}function F(D){const b=[];return b.push(D.wrapS),b.push(D.wrapT),b.push(D.wrapR||0),b.push(D.magFilter),b.push(D.minFilter),b.push(D.anisotropy),b.push(D.internalFormat),b.push(D.format),b.push(D.type),b.push(D.generateMipmaps),b.push(D.premultiplyAlpha),b.push(D.flipY),b.push(D.unpackAlignment),b.push(D.colorSpace),b.join()}function Q(D,b){const k=i.get(D);if(D.isVideoTexture&&H(D),D.isRenderTargetTexture===!1&&D.isExternalTexture!==!0&&D.version>0&&k.__version!==D.version){const Y=D.image;if(Y===null)Ke("WebGLRenderer: Texture marked for update but no image data found.");else if(Y.complete===!1)Ke("WebGLRenderer: Texture marked for update but image is incomplete");else{V(k,D,b);return}}else D.isExternalTexture&&(k.__webglTexture=D.sourceTexture?D.sourceTexture:null);t.bindTexture(n.TEXTURE_2D,k.__webglTexture,n.TEXTURE0+b)}function X(D,b){const k=i.get(D);if(D.isRenderTargetTexture===!1&&D.version>0&&k.__version!==D.version){V(k,D,b);return}else D.isExternalTexture&&(k.__webglTexture=D.sourceTexture?D.sourceTexture:null);t.bindTexture(n.TEXTURE_2D_ARRAY,k.__webglTexture,n.TEXTURE0+b)}function te(D,b){const k=i.get(D);if(D.isRenderTargetTexture===!1&&D.version>0&&k.__version!==D.version){V(k,D,b);return}t.bindTexture(n.TEXTURE_3D,k.__webglTexture,n.TEXTURE0+b)}function B(D,b){const k=i.get(D);if(D.isCubeDepthTexture!==!0&&D.version>0&&k.__version!==D.version){he(k,D,b);return}t.bindTexture(n.TEXTURE_CUBE_MAP,k.__webglTexture,n.TEXTURE0+b)}const ae={[Ko]:n.REPEAT,[Di]:n.CLAMP_TO_EDGE,[qo]:n.MIRRORED_REPEAT},ue={[tn]:n.NEAREST,[a1]:n.NEAREST_MIPMAP_NEAREST,[Ga]:n.NEAREST_MIPMAP_LINEAR,[$t]:n.LINEAR,[Qs]:n.LINEAR_MIPMAP_NEAREST,[fr]:n.LINEAR_MIPMAP_LINEAR},Pe={[c1]:n.NEVER,[p1]:n.ALWAYS,[u1]:n.LESS,[$l]:n.LEQUAL,[h1]:n.EQUAL,[Jl]:n.GEQUAL,[d1]:n.GREATER,[f1]:n.NOTEQUAL};function He(D,b){if(b.type===fi&&e.has("OES_texture_float_linear")===!1&&(b.magFilter===$t||b.magFilter===Qs||b.magFilter===Ga||b.magFilter===fr||b.minFilter===$t||b.minFilter===Qs||b.minFilter===Ga||b.minFilter===fr)&&Ke("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),n.texParameteri(D,n.TEXTURE_WRAP_S,ae[b.wrapS]),n.texParameteri(D,n.TEXTURE_WRAP_T,ae[b.wrapT]),(D===n.TEXTURE_3D||D===n.TEXTURE_2D_ARRAY)&&n.texParameteri(D,n.TEXTURE_WRAP_R,ae[b.wrapR]),n.texParameteri(D,n.TEXTURE_MAG_FILTER,ue[b.magFilter]),n.texParameteri(D,n.TEXTURE_MIN_FILTER,ue[b.minFilter]),b.compareFunction&&(n.texParameteri(D,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(D,n.TEXTURE_COMPARE_FUNC,Pe[b.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(b.magFilter===tn||b.minFilter!==Ga&&b.minFilter!==fr||b.type===fi&&e.has("OES_texture_float_linear")===!1)return;if(b.anisotropy>1||i.get(b).__currentAnisotropy){const k=e.get("EXT_texture_filter_anisotropic");n.texParameterf(D,k.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(b.anisotropy,r.getMaxAnisotropy())),i.get(b).__currentAnisotropy=b.anisotropy}}}function Xe(D,b){let k=!1;D.__webglInit===void 0&&(D.__webglInit=!0,b.addEventListener("dispose",P));const Y=b.source;let $=p.get(Y);$===void 0&&($={},p.set(Y,$));const le=F(b);if(le!==D.__cacheKey){$[le]===void 0&&($[le]={texture:n.createTexture(),usedTimes:0},o.memory.textures++,k=!0),$[le].usedTimes++;const fe=$[D.__cacheKey];fe!==void 0&&($[D.__cacheKey].usedTimes--,fe.usedTimes===0&&C(b)),D.__cacheKey=le,D.__webglTexture=$[le].texture}return k}function ee(D,b,k){return Math.floor(Math.floor(D/k)/b)}function re(D,b,k,Y){const le=D.updateRanges;if(le.length===0)t.texSubImage2D(n.TEXTURE_2D,0,0,0,b.width,b.height,k,Y,b.data);else{le.sort((Ie,ve)=>Ie.start-ve.start);let fe=0;for(let Ie=1;Ie<le.length;Ie++){const ve=le[fe],Me=le[Ie],Be=ve.start+ve.count,We=ee(Me.start,b.width,4),Qe=ee(ve.start,b.width,4);Me.start<=Be+1&&We===Qe&&ee(Me.start+Me.count-1,b.width,4)===We?ve.count=Math.max(ve.count,Me.start+Me.count-ve.start):(++fe,le[fe]=Me)}le.length=fe+1;const j=t.getParameter(n.UNPACK_ROW_LENGTH),ne=t.getParameter(n.UNPACK_SKIP_PIXELS),pe=t.getParameter(n.UNPACK_SKIP_ROWS);t.pixelStorei(n.UNPACK_ROW_LENGTH,b.width);for(let Ie=0,ve=le.length;Ie<ve;Ie++){const Me=le[Ie],Be=Math.floor(Me.start/4),We=Math.ceil(Me.count/4),Qe=Be%b.width,G=Math.floor(Be/b.width),xe=We,ie=1;t.pixelStorei(n.UNPACK_SKIP_PIXELS,Qe),t.pixelStorei(n.UNPACK_SKIP_ROWS,G),t.texSubImage2D(n.TEXTURE_2D,0,Qe,G,xe,ie,k,Y,b.data)}D.clearUpdateRanges(),t.pixelStorei(n.UNPACK_ROW_LENGTH,j),t.pixelStorei(n.UNPACK_SKIP_PIXELS,ne),t.pixelStorei(n.UNPACK_SKIP_ROWS,pe)}}function V(D,b,k){let Y=n.TEXTURE_2D;(b.isDataArrayTexture||b.isCompressedArrayTexture)&&(Y=n.TEXTURE_2D_ARRAY),b.isData3DTexture&&(Y=n.TEXTURE_3D);const $=Xe(D,b),le=b.source;t.bindTexture(Y,D.__webglTexture,n.TEXTURE0+k);const fe=i.get(le);if(le.version!==fe.__version||$===!0){if(t.activeTexture(n.TEXTURE0+k),(typeof ImageBitmap<"u"&&b.image instanceof ImageBitmap)===!1){const ie=lt.getPrimaries(lt.workingColorSpace),_e=b.colorSpace===Zn?null:lt.getPrimaries(b.colorSpace),ye=b.colorSpace===Zn||ie===_e?n.NONE:n.BROWSER_DEFAULT_WEBGL;t.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,b.flipY),t.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,b.premultiplyAlpha),t.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,ye)}t.pixelStorei(n.UNPACK_ALIGNMENT,b.unpackAlignment);let ne=m(b.image,!1,r.maxTextureSize);ne=it(b,ne);const pe=a.convert(b.format,b.colorSpace),Ie=a.convert(b.type);let ve=E(b.internalFormat,pe,Ie,b.normalized,b.colorSpace,b.isVideoTexture);He(Y,b);let Me;const Be=b.mipmaps,We=b.isVideoTexture!==!0,Qe=fe.__version===void 0||$===!0,G=le.dataReady,xe=T(b,ne);if(b.isDepthTexture)ve=R(b.format===pr,b.type),Qe&&(We?t.texStorage2D(n.TEXTURE_2D,1,ve,ne.width,ne.height):t.texImage2D(n.TEXTURE_2D,0,ve,ne.width,ne.height,0,pe,Ie,null));else if(b.isDataTexture)if(Be.length>0){We&&Qe&&t.texStorage2D(n.TEXTURE_2D,xe,ve,Be[0].width,Be[0].height);for(let ie=0,_e=Be.length;ie<_e;ie++)Me=Be[ie],We?G&&t.texSubImage2D(n.TEXTURE_2D,ie,0,0,Me.width,Me.height,pe,Ie,Me.data):t.texImage2D(n.TEXTURE_2D,ie,ve,Me.width,Me.height,0,pe,Ie,Me.data);b.generateMipmaps=!1}else We?(Qe&&t.texStorage2D(n.TEXTURE_2D,xe,ve,ne.width,ne.height),G&&re(b,ne,pe,Ie)):t.texImage2D(n.TEXTURE_2D,0,ve,ne.width,ne.height,0,pe,Ie,ne.data);else if(b.isCompressedTexture)if(b.isCompressedArrayTexture){We&&Qe&&t.texStorage3D(n.TEXTURE_2D_ARRAY,xe,ve,Be[0].width,Be[0].height,ne.depth);for(let ie=0,_e=Be.length;ie<_e;ie++)if(Me=Be[ie],b.format!==Hn)if(pe!==null)if(We){if(G)if(b.layerUpdates.size>0){const ye=Qc(Me.width,Me.height,b.format,b.type);for(const oe of b.layerUpdates){const ke=Me.data.subarray(oe*ye/Me.data.BYTES_PER_ELEMENT,(oe+1)*ye/Me.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,ie,0,0,oe,Me.width,Me.height,1,pe,ke)}}else t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,ie,0,0,0,Me.width,Me.height,ne.depth,pe,Me.data)}else t.compressedTexImage3D(n.TEXTURE_2D_ARRAY,ie,ve,Me.width,Me.height,ne.depth,0,Me.data,0,0);else Ke("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else We?G&&t.texSubImage3D(n.TEXTURE_2D_ARRAY,ie,0,0,0,Me.width,Me.height,ne.depth,pe,Ie,Me.data):t.texImage3D(n.TEXTURE_2D_ARRAY,ie,ve,Me.width,Me.height,ne.depth,0,pe,Ie,Me.data);b.layerUpdates.size>0&&b.clearLayerUpdates()}else{We&&Qe&&t.texStorage2D(n.TEXTURE_2D,xe,ve,Be[0].width,Be[0].height);for(let ie=0,_e=Be.length;ie<_e;ie++)Me=Be[ie],b.format!==Hn?pe!==null?We?G&&t.compressedTexSubImage2D(n.TEXTURE_2D,ie,0,0,Me.width,Me.height,pe,Me.data):t.compressedTexImage2D(n.TEXTURE_2D,ie,ve,Me.width,Me.height,0,Me.data):Ke("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):We?G&&t.texSubImage2D(n.TEXTURE_2D,ie,0,0,Me.width,Me.height,pe,Ie,Me.data):t.texImage2D(n.TEXTURE_2D,ie,ve,Me.width,Me.height,0,pe,Ie,Me.data)}else if(b.isDataArrayTexture)if(We){if(Qe&&t.texStorage3D(n.TEXTURE_2D_ARRAY,xe,ve,ne.width,ne.height,ne.depth),G)if(b.layerUpdates.size>0){const ie=Qc(ne.width,ne.height,b.format,b.type);for(const _e of b.layerUpdates){const ye=ne.data.subarray(_e*ie/ne.data.BYTES_PER_ELEMENT,(_e+1)*ie/ne.data.BYTES_PER_ELEMENT);t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,_e,ne.width,ne.height,1,pe,Ie,ye)}b.clearLayerUpdates()}else t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,ne.width,ne.height,ne.depth,pe,Ie,ne.data)}else t.texImage3D(n.TEXTURE_2D_ARRAY,0,ve,ne.width,ne.height,ne.depth,0,pe,Ie,ne.data);else if(b.isData3DTexture)We?(Qe&&t.texStorage3D(n.TEXTURE_3D,xe,ve,ne.width,ne.height,ne.depth),G&&t.texSubImage3D(n.TEXTURE_3D,0,0,0,0,ne.width,ne.height,ne.depth,pe,Ie,ne.data)):t.texImage3D(n.TEXTURE_3D,0,ve,ne.width,ne.height,ne.depth,0,pe,Ie,ne.data);else if(b.isFramebufferTexture){if(Qe)if(We)t.texStorage2D(n.TEXTURE_2D,xe,ve,ne.width,ne.height);else{let ie=ne.width,_e=ne.height;for(let ye=0;ye<xe;ye++)t.texImage2D(n.TEXTURE_2D,ye,ve,ie,_e,0,pe,Ie,null),ie>>=1,_e>>=1}}else if(b.isHTMLTexture){if("texElementImage2D"in n){const ie=n.canvas;if(ie.hasAttribute("layoutsubtree")||ie.setAttribute("layoutsubtree","true"),ne.parentNode!==ie){ie.appendChild(ne),f.add(b),ie.onpaint=_e=>{const ye=_e.changedElements;for(const oe of f)ye.includes(oe.image)&&(oe.needsUpdate=!0)},ie.requestPaint();return}if(n.texElementImage2D.length===3)n.texElementImage2D(n.TEXTURE_2D,n.RGBA8,ne);else{const ye=n.RGBA,oe=n.RGBA,ke=n.UNSIGNED_BYTE;n.texElementImage2D(n.TEXTURE_2D,0,ye,oe,ke,ne)}n.texParameteri(n.TEXTURE_2D,n.TEXTURE_MIN_FILTER,n.LINEAR),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_S,n.CLAMP_TO_EDGE),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_T,n.CLAMP_TO_EDGE)}}else if(Be.length>0){if(We&&Qe){const ie=Ve(Be[0]);t.texStorage2D(n.TEXTURE_2D,xe,ve,ie.width,ie.height)}for(let ie=0,_e=Be.length;ie<_e;ie++)Me=Be[ie],We?G&&t.texSubImage2D(n.TEXTURE_2D,ie,0,0,pe,Ie,Me):t.texImage2D(n.TEXTURE_2D,ie,ve,pe,Ie,Me);b.generateMipmaps=!1}else if(We){if(Qe){const ie=Ve(ne);t.texStorage2D(n.TEXTURE_2D,xe,ve,ie.width,ie.height)}G&&t.texSubImage2D(n.TEXTURE_2D,0,0,0,pe,Ie,ne)}else t.texImage2D(n.TEXTURE_2D,0,ve,pe,Ie,ne);M(b)&&_(Y),fe.__version=le.version,b.onUpdate&&b.onUpdate(b)}D.__version=b.version}function he(D,b,k){if(b.image.length!==6)return;const Y=Xe(D,b),$=b.source;t.bindTexture(n.TEXTURE_CUBE_MAP,D.__webglTexture,n.TEXTURE0+k);const le=i.get($);if($.version!==le.__version||Y===!0){t.activeTexture(n.TEXTURE0+k);const fe=lt.getPrimaries(lt.workingColorSpace),j=b.colorSpace===Zn?null:lt.getPrimaries(b.colorSpace),ne=b.colorSpace===Zn||fe===j?n.NONE:n.BROWSER_DEFAULT_WEBGL;t.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,b.flipY),t.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,b.premultiplyAlpha),t.pixelStorei(n.UNPACK_ALIGNMENT,b.unpackAlignment),t.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,ne);const pe=b.isCompressedTexture||b.image[0].isCompressedTexture,Ie=b.image[0]&&b.image[0].isDataTexture,ve=[];for(let oe=0;oe<6;oe++)!pe&&!Ie?ve[oe]=m(b.image[oe],!0,r.maxCubemapSize):ve[oe]=Ie?b.image[oe].image:b.image[oe],ve[oe]=it(b,ve[oe]);const Me=ve[0],Be=a.convert(b.format,b.colorSpace),We=a.convert(b.type),Qe=E(b.internalFormat,Be,We,b.normalized,b.colorSpace),G=b.isVideoTexture!==!0,xe=le.__version===void 0||Y===!0,ie=$.dataReady;let _e=T(b,Me);He(n.TEXTURE_CUBE_MAP,b);let ye;if(pe){G&&xe&&t.texStorage2D(n.TEXTURE_CUBE_MAP,_e,Qe,Me.width,Me.height);for(let oe=0;oe<6;oe++){ye=ve[oe].mipmaps;for(let ke=0;ke<ye.length;ke++){const Ne=ye[ke];b.format!==Hn?Be!==null?G?ie&&t.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+oe,ke,0,0,Ne.width,Ne.height,Be,Ne.data):t.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+oe,ke,Qe,Ne.width,Ne.height,0,Ne.data):Ke("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):G?ie&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+oe,ke,0,0,Ne.width,Ne.height,Be,We,Ne.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+oe,ke,Qe,Ne.width,Ne.height,0,Be,We,Ne.data)}}}else{if(ye=b.mipmaps,G&&xe){ye.length>0&&_e++;const oe=Ve(ve[0]);t.texStorage2D(n.TEXTURE_CUBE_MAP,_e,Qe,oe.width,oe.height)}for(let oe=0;oe<6;oe++)if(Ie){G?ie&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+oe,0,0,0,ve[oe].width,ve[oe].height,Be,We,ve[oe].data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+oe,0,Qe,ve[oe].width,ve[oe].height,0,Be,We,ve[oe].data);for(let ke=0;ke<ye.length;ke++){const Pt=ye[ke].image[oe].image;G?ie&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+oe,ke+1,0,0,Pt.width,Pt.height,Be,We,Pt.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+oe,ke+1,Qe,Pt.width,Pt.height,0,Be,We,Pt.data)}}else{G?ie&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+oe,0,0,0,Be,We,ve[oe]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+oe,0,Qe,Be,We,ve[oe]);for(let ke=0;ke<ye.length;ke++){const Ne=ye[ke];G?ie&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+oe,ke+1,0,0,Be,We,Ne.image[oe]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+oe,ke+1,Qe,Be,We,Ne.image[oe])}}}M(b)&&_(n.TEXTURE_CUBE_MAP),le.__version=$.version,b.onUpdate&&b.onUpdate(b)}D.__version=b.version}function se(D,b,k,Y,$,le){const fe=a.convert(k.format,k.colorSpace),j=a.convert(k.type),ne=E(k.internalFormat,fe,j,k.normalized,k.colorSpace),pe=i.get(b),Ie=i.get(k);if(Ie.__renderTarget=b,!pe.__hasExternalTextures){const ve=Math.max(1,b.width>>le),Me=Math.max(1,b.height>>le);$===n.TEXTURE_3D||$===n.TEXTURE_2D_ARRAY?t.texImage3D($,le,ne,ve,Me,b.depth,0,fe,j,null):t.texImage2D($,le,ne,ve,Me,0,fe,j,null)}t.bindFramebuffer(n.FRAMEBUFFER,D),Lt(b)?l.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,Y,$,Ie.__webglTexture,0,At(b)):($===n.TEXTURE_2D||$>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&$<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,Y,$,Ie.__webglTexture,le),t.bindFramebuffer(n.FRAMEBUFFER,null)}function Ae(D,b,k){if(n.bindRenderbuffer(n.RENDERBUFFER,D),b.depthBuffer){const Y=b.depthTexture,$=Y&&Y.isDepthTexture?Y.type:null,le=R(b.stencilBuffer,$),fe=b.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;Lt(b)?l.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,At(b),le,b.width,b.height):k?n.renderbufferStorageMultisample(n.RENDERBUFFER,At(b),le,b.width,b.height):n.renderbufferStorage(n.RENDERBUFFER,le,b.width,b.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,fe,n.RENDERBUFFER,D)}else{const Y=b.textures;for(let $=0;$<Y.length;$++){const le=Y[$],fe=a.convert(le.format,le.colorSpace),j=a.convert(le.type),ne=E(le.internalFormat,fe,j,le.normalized,le.colorSpace);Lt(b)?l.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,At(b),ne,b.width,b.height):k?n.renderbufferStorageMultisample(n.RENDERBUFFER,At(b),ne,b.width,b.height):n.renderbufferStorage(n.RENDERBUFFER,ne,b.width,b.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function tt(D,b,k){const Y=b.isWebGLCubeRenderTarget===!0;if(t.bindFramebuffer(n.FRAMEBUFFER,D),!(b.depthTexture&&b.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");const $=i.get(b.depthTexture);if($.__renderTarget=b,(!$.__webglTexture||b.depthTexture.image.width!==b.width||b.depthTexture.image.height!==b.height)&&(b.depthTexture.image.width=b.width,b.depthTexture.image.height=b.height,b.depthTexture.needsUpdate=!0),Y){if($.__webglInit===void 0&&($.__webglInit=!0,b.depthTexture.addEventListener("dispose",P)),$.__webglTexture===void 0){$.__webglTexture=n.createTexture(),t.bindTexture(n.TEXTURE_CUBE_MAP,$.__webglTexture),He(n.TEXTURE_CUBE_MAP,b.depthTexture);const pe=a.convert(b.depthTexture.format),Ie=a.convert(b.depthTexture.type);let ve;b.depthTexture.format===zi?ve=n.DEPTH_COMPONENT24:b.depthTexture.format===pr&&(ve=n.DEPTH24_STENCIL8);for(let Me=0;Me<6;Me++)n.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Me,0,ve,b.width,b.height,0,pe,Ie,null)}}else Q(b.depthTexture,0);const le=$.__webglTexture,fe=At(b),j=Y?n.TEXTURE_CUBE_MAP_POSITIVE_X+k:n.TEXTURE_2D,ne=b.depthTexture.format===pr?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;if(b.depthTexture.format===zi)Lt(b)?l.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,ne,j,le,0,fe):n.framebufferTexture2D(n.FRAMEBUFFER,ne,j,le,0);else if(b.depthTexture.format===pr)Lt(b)?l.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,ne,j,le,0,fe):n.framebufferTexture2D(n.FRAMEBUFFER,ne,j,le,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function Oe(D){const b=i.get(D),k=D.isWebGLCubeRenderTarget===!0;if(b.__boundDepthTexture!==D.depthTexture){const Y=D.depthTexture;if(b.__depthDisposeCallback&&b.__depthDisposeCallback(),Y){const $=()=>{delete b.__boundDepthTexture,delete b.__depthDisposeCallback,Y.removeEventListener("dispose",$)};Y.addEventListener("dispose",$),b.__depthDisposeCallback=$}b.__boundDepthTexture=Y}if(D.depthTexture&&!b.__autoAllocateDepthBuffer)if(k)for(let Y=0;Y<6;Y++)tt(b.__webglFramebuffer[Y],D,Y);else{const Y=D.texture.mipmaps;Y&&Y.length>0?tt(b.__webglFramebuffer[0],D,0):tt(b.__webglFramebuffer,D,0)}else if(k){b.__webglDepthbuffer=[];for(let Y=0;Y<6;Y++)if(t.bindFramebuffer(n.FRAMEBUFFER,b.__webglFramebuffer[Y]),b.__webglDepthbuffer[Y]===void 0)b.__webglDepthbuffer[Y]=n.createRenderbuffer(),Ae(b.__webglDepthbuffer[Y],D,!1);else{const $=D.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,le=b.__webglDepthbuffer[Y];n.bindRenderbuffer(n.RENDERBUFFER,le),n.framebufferRenderbuffer(n.FRAMEBUFFER,$,n.RENDERBUFFER,le)}}else{const Y=D.texture.mipmaps;if(Y&&Y.length>0?t.bindFramebuffer(n.FRAMEBUFFER,b.__webglFramebuffer[0]):t.bindFramebuffer(n.FRAMEBUFFER,b.__webglFramebuffer),b.__webglDepthbuffer===void 0)b.__webglDepthbuffer=n.createRenderbuffer(),Ae(b.__webglDepthbuffer,D,!1);else{const $=D.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,le=b.__webglDepthbuffer;n.bindRenderbuffer(n.RENDERBUFFER,le),n.framebufferRenderbuffer(n.FRAMEBUFFER,$,n.RENDERBUFFER,le)}}t.bindFramebuffer(n.FRAMEBUFFER,null)}function ze(D,b,k){const Y=i.get(D);b!==void 0&&se(Y.__webglFramebuffer,D,D.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),k!==void 0&&Oe(D)}function Je(D){const b=D.texture,k=i.get(D),Y=i.get(b);D.addEventListener("dispose",S);const $=D.textures,le=D.isWebGLCubeRenderTarget===!0,fe=$.length>1;if(fe||(Y.__webglTexture===void 0&&(Y.__webglTexture=n.createTexture()),Y.__version=b.version,o.memory.textures++),le){k.__webglFramebuffer=[];for(let j=0;j<6;j++)if(b.mipmaps&&b.mipmaps.length>0){k.__webglFramebuffer[j]=[];for(let ne=0;ne<b.mipmaps.length;ne++)k.__webglFramebuffer[j][ne]=n.createFramebuffer()}else k.__webglFramebuffer[j]=n.createFramebuffer()}else{if(b.mipmaps&&b.mipmaps.length>0){k.__webglFramebuffer=[];for(let j=0;j<b.mipmaps.length;j++)k.__webglFramebuffer[j]=n.createFramebuffer()}else k.__webglFramebuffer=n.createFramebuffer();if(fe)for(let j=0,ne=$.length;j<ne;j++){const pe=i.get($[j]);pe.__webglTexture===void 0&&(pe.__webglTexture=n.createTexture(),o.memory.textures++)}if(D.samples>0&&Lt(D)===!1){k.__webglMultisampledFramebuffer=n.createFramebuffer(),k.__webglColorRenderbuffer=[],t.bindFramebuffer(n.FRAMEBUFFER,k.__webglMultisampledFramebuffer);for(let j=0;j<$.length;j++){const ne=$[j];k.__webglColorRenderbuffer[j]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,k.__webglColorRenderbuffer[j]);const pe=a.convert(ne.format,ne.colorSpace),Ie=a.convert(ne.type),ve=E(ne.internalFormat,pe,Ie,ne.normalized,ne.colorSpace,D.isXRRenderTarget===!0),Me=At(D);n.renderbufferStorageMultisample(n.RENDERBUFFER,Me,ve,D.width,D.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+j,n.RENDERBUFFER,k.__webglColorRenderbuffer[j])}n.bindRenderbuffer(n.RENDERBUFFER,null),D.depthBuffer&&(k.__webglDepthRenderbuffer=n.createRenderbuffer(),Ae(k.__webglDepthRenderbuffer,D,!0)),t.bindFramebuffer(n.FRAMEBUFFER,null)}}if(le){t.bindTexture(n.TEXTURE_CUBE_MAP,Y.__webglTexture),He(n.TEXTURE_CUBE_MAP,b);for(let j=0;j<6;j++)if(b.mipmaps&&b.mipmaps.length>0)for(let ne=0;ne<b.mipmaps.length;ne++)se(k.__webglFramebuffer[j][ne],D,b,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+j,ne);else se(k.__webglFramebuffer[j],D,b,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+j,0);M(b)&&_(n.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(fe){for(let j=0,ne=$.length;j<ne;j++){const pe=$[j],Ie=i.get(pe);let ve=n.TEXTURE_2D;(D.isWebGL3DRenderTarget||D.isWebGLArrayRenderTarget)&&(ve=D.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(ve,Ie.__webglTexture),He(ve,pe),se(k.__webglFramebuffer,D,pe,n.COLOR_ATTACHMENT0+j,ve,0),M(pe)&&_(ve)}t.unbindTexture()}else{let j=n.TEXTURE_2D;if((D.isWebGL3DRenderTarget||D.isWebGLArrayRenderTarget)&&(j=D.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(j,Y.__webglTexture),He(j,b),b.mipmaps&&b.mipmaps.length>0)for(let ne=0;ne<b.mipmaps.length;ne++)se(k.__webglFramebuffer[ne],D,b,n.COLOR_ATTACHMENT0,j,ne);else se(k.__webglFramebuffer,D,b,n.COLOR_ATTACHMENT0,j,0);M(b)&&_(j),t.unbindTexture()}D.depthBuffer&&Oe(D)}function $e(D){const b=D.textures;for(let k=0,Y=b.length;k<Y;k++){const $=b[k];if(M($)){const le=A(D),fe=i.get($).__webglTexture;t.bindTexture(le,fe),_(le),t.unbindTexture()}}}const Ct=[],zt=[];function an(D){if(D.samples>0){if(Lt(D)===!1){const b=D.textures,k=D.width,Y=D.height;let $=n.COLOR_BUFFER_BIT;const le=D.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,fe=i.get(D),j=b.length>1;if(j)for(let pe=0;pe<b.length;pe++)t.bindFramebuffer(n.FRAMEBUFFER,fe.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+pe,n.RENDERBUFFER,null),t.bindFramebuffer(n.FRAMEBUFFER,fe.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+pe,n.TEXTURE_2D,null,0);t.bindFramebuffer(n.READ_FRAMEBUFFER,fe.__webglMultisampledFramebuffer);const ne=D.texture.mipmaps;ne&&ne.length>0?t.bindFramebuffer(n.DRAW_FRAMEBUFFER,fe.__webglFramebuffer[0]):t.bindFramebuffer(n.DRAW_FRAMEBUFFER,fe.__webglFramebuffer);for(let pe=0;pe<b.length;pe++){if(D.resolveDepthBuffer&&(D.depthBuffer&&($|=n.DEPTH_BUFFER_BIT),D.stencilBuffer&&D.resolveStencilBuffer&&($|=n.STENCIL_BUFFER_BIT)),j){n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,fe.__webglColorRenderbuffer[pe]);const Ie=i.get(b[pe]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,Ie,0)}n.blitFramebuffer(0,0,k,Y,0,0,k,Y,$,n.NEAREST),c===!0&&(Ct.length=0,zt.length=0,Ct.push(n.COLOR_ATTACHMENT0+pe),D.depthBuffer&&D.storeMultisampledDepthBuffer===!1&&(Ct.push(le),zt.push(le),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,zt)),n.invalidateFramebuffer(n.READ_FRAMEBUFFER,Ct))}if(t.bindFramebuffer(n.READ_FRAMEBUFFER,null),t.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),j)for(let pe=0;pe<b.length;pe++){t.bindFramebuffer(n.FRAMEBUFFER,fe.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+pe,n.RENDERBUFFER,fe.__webglColorRenderbuffer[pe]);const Ie=i.get(b[pe]).__webglTexture;t.bindFramebuffer(n.FRAMEBUFFER,fe.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+pe,n.TEXTURE_2D,Ie,0)}t.bindFramebuffer(n.DRAW_FRAMEBUFFER,fe.__webglMultisampledFramebuffer)}else if(D.depthBuffer&&D.storeMultisampledDepthBuffer===!1&&c){const b=D.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[b])}}}function At(D){return Math.min(r.maxSamples,D.samples)}function Lt(D){const b=i.get(D);return D.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&b.__useRenderToTexture!==!1}function H(D){const b=o.render.frame;u.get(D)!==b&&(u.set(D,b),D.update())}function it(D,b){const k=D.colorSpace,Y=D.format,$=D.type;return D.isCompressedTexture===!0||D.isVideoTexture===!0||k!==La&&k!==Zn&&(lt.getTransfer(k)===yt?(Y!==Hn||$!==On)&&Ke("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):pt("WebGLTextures: Unsupported texture color space:",k)),b}function Ve(D){return typeof HTMLImageElement<"u"&&D instanceof HTMLImageElement?(h.width=D.naturalWidth||D.width,h.height=D.naturalHeight||D.height):typeof VideoFrame<"u"&&D instanceof VideoFrame?(h.width=D.displayWidth,h.height=D.displayHeight):(h.width=D.width,h.height=D.height),h}this.allocateTextureUnit=W,this.resetTextureUnits=N,this.getTextureUnits=O,this.setTextureUnits=U,this.setTexture2D=Q,this.setTexture2DArray=X,this.setTexture3D=te,this.setTextureCube=B,this.rebindTextures=ze,this.setupRenderTarget=Je,this.updateRenderTargetMipmap=$e,this.updateMultisampleRenderTarget=an,this.setupDepthRenderbuffer=Oe,this.setupFrameBufferTexture=se,this.useMultisampledRTT=Lt,this.isReversedDepthBuffer=function(){return t.buffers.depth.getReversed()}}function H5(n,e){function t(i,r=Zn){let a;const o=lt.getTransfer(r);if(i===On)return n.UNSIGNED_BYTE;if(i===Yl)return n.UNSIGNED_SHORT_4_4_4_4;if(i===Xl)return n.UNSIGNED_SHORT_5_5_5_1;if(i===vh)return n.UNSIGNED_INT_5_9_9_9_REV;if(i===bh)return n.UNSIGNED_INT_10F_11F_11F_REV;if(i===xh)return n.BYTE;if(i===_h)return n.SHORT;if(i===Ra)return n.UNSIGNED_SHORT;if(i===Vl)return n.INT;if(i===xi)return n.UNSIGNED_INT;if(i===fi)return n.FLOAT;if(i===_i)return n.HALF_FLOAT;if(i===Sh)return n.ALPHA;if(i===Eh)return n.RGB;if(i===Hn)return n.RGBA;if(i===zi)return n.DEPTH_COMPONENT;if(i===pr)return n.DEPTH_STENCIL;if(i===yh)return n.RED;if(i===Kl)return n.RED_INTEGER;if(i===br)return n.RG;if(i===ql)return n.RG_INTEGER;if(i===Zl)return n.RGBA_INTEGER;if(i===vs||i===bs||i===Ss||i===Es)if(o===yt)if(a=e.get("WEBGL_compressed_texture_s3tc_srgb"),a!==null){if(i===vs)return a.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===bs)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===Ss)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===Es)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(a=e.get("WEBGL_compressed_texture_s3tc"),a!==null){if(i===vs)return a.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===bs)return a.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===Ss)return a.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===Es)return a.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===Zo||i===$o||i===Jo||i===Qo)if(a=e.get("WEBGL_compressed_texture_pvrtc"),a!==null){if(i===Zo)return a.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===$o)return a.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===Jo)return a.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===Qo)return a.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===jo||i===el||i===tl||i===nl||i===il||i===Rs||i===rl)if(a=e.get("WEBGL_compressed_texture_etc"),a!==null){if(i===jo||i===el)return o===yt?a.COMPRESSED_SRGB8_ETC2:a.COMPRESSED_RGB8_ETC2;if(i===tl)return o===yt?a.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:a.COMPRESSED_RGBA8_ETC2_EAC;if(i===nl)return a.COMPRESSED_R11_EAC;if(i===il)return a.COMPRESSED_SIGNED_R11_EAC;if(i===Rs)return a.COMPRESSED_RG11_EAC;if(i===rl)return a.COMPRESSED_SIGNED_RG11_EAC}else return null;if(i===al||i===sl||i===ol||i===ll||i===cl||i===ul||i===hl||i===dl||i===fl||i===pl||i===gl||i===ml||i===Ml||i===xl)if(a=e.get("WEBGL_compressed_texture_astc"),a!==null){if(i===al)return o===yt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:a.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===sl)return o===yt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:a.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===ol)return o===yt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:a.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===ll)return o===yt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:a.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===cl)return o===yt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:a.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===ul)return o===yt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:a.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===hl)return o===yt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:a.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===dl)return o===yt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:a.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===fl)return o===yt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:a.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===pl)return o===yt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:a.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===gl)return o===yt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:a.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===ml)return o===yt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:a.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===Ml)return o===yt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:a.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===xl)return o===yt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:a.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===_l||i===vl||i===bl)if(a=e.get("EXT_texture_compression_bptc"),a!==null){if(i===_l)return o===yt?a.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:a.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===vl)return a.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===bl)return a.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===Sl||i===El||i===Cs||i===yl)if(a=e.get("EXT_texture_compression_rgtc"),a!==null){if(i===Sl)return a.COMPRESSED_RED_RGTC1_EXT;if(i===El)return a.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===Cs)return a.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===yl)return a.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===Ca?n.UNSIGNED_INT_24_8:n[i]!==void 0?n[i]:null}return{convert:t}}const G5=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,W5=`
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

}`;class V5{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){const i=new Nh(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=i}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,i=new vn({vertexShader:G5,fragmentShader:W5,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new wn(new bi(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class Y5 extends Er{constructor(e,t){super();const i=this;let r=null,a=1,o=null,l="local-floor",c=1,h=null,u=null,f=null,d=null,p=null,g=null;const x=typeof XRWebGLBinding<"u",m=new V5,M={},_=t.getContextAttributes();let A=null,E=null;const R=[],T=[],P=new Ze;let S=null,y=null;const C=new kn;C.viewport=new kt;const I=new kn;I.viewport=new kt;const L=[C,I],N=new j1;let O=null,U=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(ee){let re=R[ee];return re===void 0&&(re=new oo,R[ee]=re),re.getTargetRaySpace()},this.getControllerGrip=function(ee){let re=R[ee];return re===void 0&&(re=new oo,R[ee]=re),re.getGripSpace()},this.getHand=function(ee){let re=R[ee];return re===void 0&&(re=new oo,R[ee]=re),re.getHandSpace()};function W(ee){const re=T.indexOf(ee.inputSource);if(re===-1)return;const V=R[re];V!==void 0&&(V.update(ee.inputSource,ee.frame,h||o),V.dispatchEvent({type:ee.type,data:ee.inputSource}))}function F(){r.removeEventListener("select",W),r.removeEventListener("selectstart",W),r.removeEventListener("selectend",W),r.removeEventListener("squeeze",W),r.removeEventListener("squeezestart",W),r.removeEventListener("squeezeend",W),r.removeEventListener("end",F),r.removeEventListener("inputsourceschange",Q);for(let ee=0;ee<R.length;ee++){const re=T[ee];re!==null&&(T[ee]=null,R[ee].disconnect(re))}O=null,U=null,m.reset();for(const ee in M)delete M[ee];if(e.setRenderTarget(A),p=null,d=null,f=null,r=null,E=null,Xe.stop(),i.isPresenting=!1,e.setPixelRatio(S),e.setSize(P.width,P.height,!1),y!==null){const ee=y.camera;ee.fov=y.fov,ee.zoom=y.zoom,ee.updateProjectionMatrix(),y=null}i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(ee){a=ee,i.isPresenting===!0&&Ke("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(ee){l=ee,i.isPresenting===!0&&Ke("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return h||o},this.setReferenceSpace=function(ee){h=ee},this.getBaseLayer=function(){return d!==null?d:p},this.getBinding=function(){return f===null&&x&&(f=new XRWebGLBinding(r,t)),f},this.getFrame=function(){return g},this.getSession=function(){return r},this.setSession=async function(ee){if(r=ee,r!==null){if(A=e.getRenderTarget(),r.addEventListener("select",W),r.addEventListener("selectstart",W),r.addEventListener("selectend",W),r.addEventListener("squeeze",W),r.addEventListener("squeezestart",W),r.addEventListener("squeezeend",W),r.addEventListener("end",F),r.addEventListener("inputsourceschange",Q),_.xrCompatible!==!0&&await t.makeXRCompatible(),S=e.getPixelRatio(),e.getSize(P),x&&"createProjectionLayer"in XRWebGLBinding.prototype){let V=null,he=null,se=null;_.depth&&(se=_.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,V=_.stencil?pr:zi,he=_.stencil?Ca:xi);const Ae={colorFormat:t.RGBA8,depthFormat:se,scaleFactor:a};f=this.getBinding(),d=f.createProjectionLayer(Ae),r.updateRenderState({layers:[d]}),e.setPixelRatio(1),e.setSize(d.textureWidth,d.textureHeight,!1),E=new Gn(d.textureWidth,d.textureHeight,{format:Hn,type:On,depthTexture:new Da(d.textureWidth,d.textureHeight,he,void 0,void 0,void 0,void 0,void 0,void 0,V),stencilBuffer:_.stencil,colorSpace:e.outputColorSpace,samples:_.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1,storeMultisampledDepthBuffer:d.ignoreDepthValues===!1,storeMultisampledStencilBuffer:d.ignoreDepthValues===!1})}else{const V={antialias:_.antialias,alpha:!0,depth:_.depth,stencil:_.stencil,framebufferScaleFactor:a};p=new XRWebGLLayer(r,t,V),r.updateRenderState({baseLayer:p}),e.setPixelRatio(1),e.setSize(p.framebufferWidth,p.framebufferHeight,!1),E=new Gn(p.framebufferWidth,p.framebufferHeight,{format:Hn,type:On,colorSpace:e.outputColorSpace,stencilBuffer:_.stencil,resolveDepthBuffer:p.ignoreDepthValues===!1,resolveStencilBuffer:p.ignoreDepthValues===!1,storeMultisampledDepthBuffer:p.ignoreDepthValues===!1,storeMultisampledStencilBuffer:p.ignoreDepthValues===!1})}E.isXRRenderTarget=!0,this.setFoveation(c),h=null,o=await r.requestReferenceSpace(l),Xe.setContext(r),Xe.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return m.getDepthTexture()};function Q(ee){for(let re=0;re<ee.removed.length;re++){const V=ee.removed[re],he=T.indexOf(V);he>=0&&(T[he]=null,R[he].disconnect(V))}for(let re=0;re<ee.added.length;re++){const V=ee.added[re];let he=T.indexOf(V);if(he===-1){for(let Ae=0;Ae<R.length;Ae++)if(Ae>=T.length){T.push(V),he=Ae;break}else if(T[Ae]===null){T[Ae]=V,he=Ae;break}if(he===-1)break}const se=R[he];se&&se.connect(V)}}const X=new K,te=new K;function B(ee,re,V){X.setFromMatrixPosition(re.matrixWorld),te.setFromMatrixPosition(V.matrixWorld);const he=X.distanceTo(te),se=re.projectionMatrix.elements,Ae=V.projectionMatrix.elements,tt=se[14]/(se[10]-1),Oe=se[14]/(se[10]+1),ze=(se[9]+1)/se[5],Je=(se[9]-1)/se[5],$e=(se[8]-1)/se[0],Ct=(Ae[8]+1)/Ae[0],zt=tt*$e,an=tt*Ct,At=he/(-$e+Ct),Lt=At*-$e;if(re.matrixWorld.decompose(ee.position,ee.quaternion,ee.scale),ee.translateX(Lt),ee.translateZ(At),ee.matrixWorld.compose(ee.position,ee.quaternion,ee.scale),ee.matrixWorldInverse.copy(ee.matrixWorld).invert(),se[10]===-1)ee.projectionMatrix.copy(re.projectionMatrix),ee.projectionMatrixInverse.copy(re.projectionMatrixInverse);else{const H=tt+At,it=Oe+At,Ve=zt-Lt,D=an+(he-Lt),b=ze*Oe/it*H,k=Je*Oe/it*H;ee.projectionMatrix.makePerspective(Ve,D,b,k,H,it),ee.projectionMatrixInverse.copy(ee.projectionMatrix).invert()}}function ae(ee,re){re===null?ee.matrixWorld.copy(ee.matrix):ee.matrixWorld.multiplyMatrices(re.matrixWorld,ee.matrix),ee.matrixWorldInverse.copy(ee.matrixWorld).invert()}this.updateCamera=function(ee){if(r===null)return;let re=ee.near,V=ee.far;m.texture!==null&&(m.depthNear>0&&(re=m.depthNear),m.depthFar>0&&(V=m.depthFar)),N.near=I.near=C.near=re,N.far=I.far=C.far=V,(O!==N.near||U!==N.far)&&(r.updateRenderState({depthNear:N.near,depthFar:N.far}),O=N.near,U=N.far),N.layers.mask=ee.layers.mask|6,C.layers.mask=N.layers.mask&-5,I.layers.mask=N.layers.mask&-3;const he=ee.parent,se=N.cameras;ae(N,he);for(let Ae=0;Ae<se.length;Ae++)ae(se[Ae],he);se.length===2?B(N,C,I):N.projectionMatrix.copy(C.projectionMatrix),y===null&&ee.isPerspectiveCamera&&(y={camera:ee,fov:ee.fov,zoom:ee.zoom}),ue(ee,N,he)};function ue(ee,re,V){V===null?ee.matrix.copy(re.matrixWorld):(ee.matrix.copy(V.matrixWorld),ee.matrix.invert(),ee.matrix.multiply(re.matrixWorld)),ee.matrix.decompose(ee.position,ee.quaternion,ee.scale),ee.updateMatrixWorld(!0),ee.projectionMatrix.copy(re.projectionMatrix),ee.projectionMatrixInverse.copy(re.projectionMatrixInverse),ee.isPerspectiveCamera&&(ee.fov=wl*2*Math.atan(1/ee.projectionMatrix.elements[5]),ee.zoom=1)}this.getCamera=function(){return N},this.getFoveation=function(){if(!(d===null&&p===null))return c},this.setFoveation=function(ee){c=ee,d!==null&&(d.fixedFoveation=ee),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=ee)},this.hasDepthSensing=function(){return m.texture!==null},this.getDepthSensingMesh=function(){return m.getMesh(N)},this.getCameraTexture=function(ee){return M[ee]};let Pe=null;function He(ee,re){if(u=re.getViewerPose(h||o),g=re,u!==null){const V=u.views;p!==null&&(e.setRenderTargetFramebuffer(E,p.framebuffer),e.setRenderTarget(E));let he=!1;V.length!==N.cameras.length&&(N.cameras.length=0,he=!0);for(let Oe=0;Oe<V.length;Oe++){const ze=V[Oe];let Je=null;if(p!==null)Je=p.getViewport(ze);else{const Ct=f.getViewSubImage(d,ze);Je=Ct.viewport,Oe===0&&(e.setRenderTargetTextures(E,Ct.colorTexture,Ct.depthStencilTexture),e.setRenderTarget(E))}let $e=L[Oe];$e===void 0&&($e=new kn,$e.layers.enable(Oe),$e.viewport=new kt,L[Oe]=$e),$e.matrix.fromArray(ze.transform.matrix),$e.matrix.decompose($e.position,$e.quaternion,$e.scale),$e.projectionMatrix.fromArray(ze.projectionMatrix),$e.projectionMatrixInverse.copy($e.projectionMatrix).invert(),$e.viewport.set(Je.x,Je.y,Je.width,Je.height),Oe===0&&(N.matrix.copy($e.matrix),N.matrix.decompose(N.position,N.quaternion,N.scale)),he===!0&&N.cameras.push($e)}const se=r.enabledFeatures;if(se&&se.includes("depth-sensing")&&r.depthUsage=="gpu-optimized"&&x){f=i.getBinding();const Oe=f.getDepthInformation(V[0]);Oe&&Oe.isValid&&Oe.texture&&m.init(Oe,r.renderState)}if(se&&se.includes("camera-access")&&x){e.state.unbindTexture(),f=i.getBinding();for(let Oe=0;Oe<V.length;Oe++){const ze=V[Oe].camera;if(ze){let Je=M[ze];Je||(Je=new Nh,M[ze]=Je);const $e=f.getCameraImage(ze);Je.sourceTexture=$e}}}}for(let V=0;V<R.length;V++){const he=T[V],se=R[V];he!==null&&se!==void 0&&se.update(he,re,h||o)}Pe&&Pe(ee,re),re.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:re}),g=null}const Xe=new zh;Xe.setAnimationLoop(He),this.setAnimationLoop=function(ee){Pe=ee},this.dispose=function(){}}}const X5=new Kt,Kh=new qe;Kh.set(-1,0,0,0,1,0,0,0,1);function K5(n,e){function t(m,M){m.matrixAutoUpdate===!0&&m.updateMatrix(),M.value.copy(m.matrix)}function i(m,M){M.color.getRGB(m.fogColor.value,Fh(n)),M.isFog?(m.fogNear.value=M.near,m.fogFar.value=M.far):M.isFogExp2&&(m.fogDensity.value=M.density)}function r(m,M,_,A,E){M.isNodeMaterial?M.uniformsNeedUpdate=!1:M.isMeshBasicMaterial?a(m,M):M.isMeshLambertMaterial?(a(m,M),M.envMap&&(m.envMapIntensity.value=M.envMapIntensity)):M.isMeshToonMaterial?(a(m,M),f(m,M)):M.isMeshPhongMaterial?(a(m,M),u(m,M),M.envMap&&(m.envMapIntensity.value=M.envMapIntensity)):M.isMeshStandardMaterial?(a(m,M),d(m,M),M.isMeshPhysicalMaterial&&p(m,M,E)):M.isMeshMatcapMaterial?(a(m,M),g(m,M)):M.isMeshDepthMaterial?a(m,M):M.isMeshDistanceMaterial?(a(m,M),x(m,M)):M.isMeshNormalMaterial?a(m,M):M.isLineBasicMaterial?(o(m,M),M.isLineDashedMaterial&&l(m,M)):M.isPointsMaterial?c(m,M,_,A):M.isSpriteMaterial?h(m,M):M.isShadowMaterial?(m.color.value.copy(M.color),m.opacity.value=M.opacity):M.isShaderMaterial&&(M.uniformsNeedUpdate=!1)}function a(m,M){m.opacity.value=M.opacity,M.color&&m.diffuse.value.copy(M.color),M.emissive&&m.emissive.value.copy(M.emissive).multiplyScalar(M.emissiveIntensity),M.map&&(m.map.value=M.map,t(M.map,m.mapTransform)),M.alphaMap&&(m.alphaMap.value=M.alphaMap,t(M.alphaMap,m.alphaMapTransform)),M.bumpMap&&(m.bumpMap.value=M.bumpMap,t(M.bumpMap,m.bumpMapTransform),m.bumpScale.value=M.bumpScale,M.side===Cn&&(m.bumpScale.value*=-1)),M.normalMap&&(m.normalMap.value=M.normalMap,t(M.normalMap,m.normalMapTransform),m.normalScale.value.copy(M.normalScale),M.side===Cn&&m.normalScale.value.negate()),M.displacementMap&&(m.displacementMap.value=M.displacementMap,t(M.displacementMap,m.displacementMapTransform),m.displacementScale.value=M.displacementScale,m.displacementBias.value=M.displacementBias),M.emissiveMap&&(m.emissiveMap.value=M.emissiveMap,t(M.emissiveMap,m.emissiveMapTransform)),M.specularMap&&(m.specularMap.value=M.specularMap,t(M.specularMap,m.specularMapTransform)),M.alphaTest>0&&(m.alphaTest.value=M.alphaTest);const _=e.get(M),A=_.envMap,E=_.envMapRotation;A&&(m.envMap.value=A,m.envMapRotation.value.setFromMatrix4(X5.makeRotationFromEuler(E)).transpose(),A.isCubeTexture&&A.isRenderTargetTexture===!1&&m.envMapRotation.value.premultiply(Kh),m.reflectivity.value=M.reflectivity,m.ior.value=M.ior,m.refractionRatio.value=M.refractionRatio),M.lightMap&&(m.lightMap.value=M.lightMap,m.lightMapIntensity.value=M.lightMapIntensity,t(M.lightMap,m.lightMapTransform)),M.aoMap&&(m.aoMap.value=M.aoMap,m.aoMapIntensity.value=M.aoMapIntensity,t(M.aoMap,m.aoMapTransform))}function o(m,M){m.diffuse.value.copy(M.color),m.opacity.value=M.opacity,M.map&&(m.map.value=M.map,t(M.map,m.mapTransform))}function l(m,M){m.dashSize.value=M.dashSize,m.totalSize.value=M.dashSize+M.gapSize,m.scale.value=M.scale}function c(m,M,_,A){m.diffuse.value.copy(M.color),m.opacity.value=M.opacity,m.size.value=M.size*_,m.scale.value=A*.5,M.map&&(m.map.value=M.map,t(M.map,m.uvTransform)),M.alphaMap&&(m.alphaMap.value=M.alphaMap,t(M.alphaMap,m.alphaMapTransform)),M.alphaTest>0&&(m.alphaTest.value=M.alphaTest)}function h(m,M){m.diffuse.value.copy(M.color),m.opacity.value=M.opacity,m.rotation.value=M.rotation,M.map&&(m.map.value=M.map,t(M.map,m.mapTransform)),M.alphaMap&&(m.alphaMap.value=M.alphaMap,t(M.alphaMap,m.alphaMapTransform)),M.alphaTest>0&&(m.alphaTest.value=M.alphaTest)}function u(m,M){m.specular.value.copy(M.specular),m.shininess.value=Math.max(M.shininess,1e-4)}function f(m,M){M.gradientMap&&(m.gradientMap.value=M.gradientMap)}function d(m,M){m.metalness.value=M.metalness,M.metalnessMap&&(m.metalnessMap.value=M.metalnessMap,t(M.metalnessMap,m.metalnessMapTransform)),m.roughness.value=M.roughness,M.roughnessMap&&(m.roughnessMap.value=M.roughnessMap,t(M.roughnessMap,m.roughnessMapTransform)),M.envMap&&(m.envMapIntensity.value=M.envMapIntensity)}function p(m,M,_){m.ior.value=M.ior,M.sheen>0&&(m.sheenColor.value.copy(M.sheenColor).multiplyScalar(M.sheen),m.sheenRoughness.value=M.sheenRoughness,M.sheenColorMap&&(m.sheenColorMap.value=M.sheenColorMap,t(M.sheenColorMap,m.sheenColorMapTransform)),M.sheenRoughnessMap&&(m.sheenRoughnessMap.value=M.sheenRoughnessMap,t(M.sheenRoughnessMap,m.sheenRoughnessMapTransform))),M.clearcoat>0&&(m.clearcoat.value=M.clearcoat,m.clearcoatRoughness.value=M.clearcoatRoughness,M.clearcoatMap&&(m.clearcoatMap.value=M.clearcoatMap,t(M.clearcoatMap,m.clearcoatMapTransform)),M.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=M.clearcoatRoughnessMap,t(M.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),M.clearcoatNormalMap&&(m.clearcoatNormalMap.value=M.clearcoatNormalMap,t(M.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(M.clearcoatNormalScale),M.side===Cn&&m.clearcoatNormalScale.value.negate())),M.dispersion>0&&(m.dispersion.value=M.dispersion),M.retroreflectivity>0&&(m.retroreflectivity.value=M.retroreflectivity),M.iridescence>0&&(m.iridescence.value=M.iridescence,m.iridescenceIOR.value=M.iridescenceIOR,m.iridescenceThicknessMinimum.value=M.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=M.iridescenceThicknessRange[1],M.iridescenceMap&&(m.iridescenceMap.value=M.iridescenceMap,t(M.iridescenceMap,m.iridescenceMapTransform)),M.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=M.iridescenceThicknessMap,t(M.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),M.transmission>0&&(m.transmission.value=M.transmission,m.transmissionSamplerMap.value=_.texture,m.transmissionSamplerSize.value.set(_.width,_.height),M.transmissionMap&&(m.transmissionMap.value=M.transmissionMap,t(M.transmissionMap,m.transmissionMapTransform)),m.thickness.value=M.thickness,M.thicknessMap&&(m.thicknessMap.value=M.thicknessMap,t(M.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=M.attenuationDistance,m.attenuationColor.value.copy(M.attenuationColor)),M.anisotropy>0&&(m.anisotropyVector.value.set(M.anisotropy*Math.cos(M.anisotropyRotation),M.anisotropy*Math.sin(M.anisotropyRotation)),M.anisotropyMap&&(m.anisotropyMap.value=M.anisotropyMap,t(M.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=M.specularIntensity,m.specularColor.value.copy(M.specularColor),M.specularColorMap&&(m.specularColorMap.value=M.specularColorMap,t(M.specularColorMap,m.specularColorMapTransform)),M.specularIntensityMap&&(m.specularIntensityMap.value=M.specularIntensityMap,t(M.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,M){M.matcap&&(m.matcap.value=M.matcap)}function x(m,M){const _=e.get(M).light;m.referencePosition.value.setFromMatrixPosition(_.matrixWorld),m.nearDistance.value=_.shadow.camera.near,m.farDistance.value=_.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:r}}function q5(n,e,t,i){let r={},a={},o=[];const l=n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS);function c(E,R){const T=R.program;i.uniformBlockBinding(E,T)}function h(E,R){let T=r[E.id];T===void 0&&(m(E),T=u(E),r[E.id]=T,E.addEventListener("dispose",_));const P=R.program;i.updateUBOMapping(E,P);const S=e.render.frame;a[E.id]!==S&&(d(E),a[E.id]=S)}function u(E){const R=f();E.__bindingPointIndex=R;const T=n.createBuffer(),P=E.__size,S=E.usage;return n.bindBuffer(n.UNIFORM_BUFFER,T),n.bufferData(n.UNIFORM_BUFFER,P,S),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,R,T),T}function f(){for(let E=0;E<l;E++)if(o.indexOf(E)===-1)return o.push(E),E;return pt("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(E){const R=r[E.id],T=E.uniforms,P=E.__cache;n.bindBuffer(n.UNIFORM_BUFFER,R);for(let S=0,y=T.length;S<y;S++){const C=T[S];if(Array.isArray(C))for(let I=0,L=C.length;I<L;I++)p(C[I],S,I,P);else p(C,S,0,P)}n.bindBuffer(n.UNIFORM_BUFFER,null)}function p(E,R,T,P){if(x(E,R,T,P)===!0){const S=E.__offset,y=E.value;if(Array.isArray(y)){let C=0;for(let I=0;I<y.length;I++){const L=y[I],N=M(L);g(L,E.__data,C),typeof L!="number"&&typeof L!="boolean"&&!L.isMatrix3&&!ArrayBuffer.isView(L)&&(C+=N.storage/Float32Array.BYTES_PER_ELEMENT)}}else g(y,E.__data,0);n.bufferSubData(n.UNIFORM_BUFFER,S,E.__data)}}function g(E,R,T){typeof E=="number"||typeof E=="boolean"?R[0]=E:E.isMatrix3?(R[0]=E.elements[0],R[1]=E.elements[1],R[2]=E.elements[2],R[3]=0,R[4]=E.elements[3],R[5]=E.elements[4],R[6]=E.elements[5],R[7]=0,R[8]=E.elements[6],R[9]=E.elements[7],R[10]=E.elements[8],R[11]=0):ArrayBuffer.isView(E)?R.set(new E.constructor(E.buffer,E.byteOffset,R.length)):E.toArray(R,T)}function x(E,R,T,P){const S=E.value,y=R+"_"+T;if(P[y]===void 0)return typeof S=="number"||typeof S=="boolean"?P[y]=S:ArrayBuffer.isView(S)?P[y]=S.slice():P[y]=S.clone(),!0;{const C=P[y];if(typeof S=="number"||typeof S=="boolean"){if(C!==S)return P[y]=S,!0}else{if(ArrayBuffer.isView(S))return!0;if(C.equals(S)===!1)return C.copy(S),!0}}return!1}function m(E){const R=E.uniforms;let T=0;const P=16;for(let y=0,C=R.length;y<C;y++){const I=Array.isArray(R[y])?R[y]:[R[y]];for(let L=0,N=I.length;L<N;L++){const O=I[L],U=Array.isArray(O.value)?O.value:[O.value];for(let W=0,F=U.length;W<F;W++){const Q=U[W],X=M(Q),te=T%P,B=te%X.boundary,ae=te+B;T+=B,ae!==0&&P-ae<X.storage&&(T+=P-ae),O.__data=new Float32Array(X.storage/Float32Array.BYTES_PER_ELEMENT),O.__offset=T,T+=X.storage}}}const S=T%P;return S>0&&(T+=P-S),E.__size=T,E.__cache={},this}function M(E){const R={boundary:0,storage:0};return typeof E=="number"||typeof E=="boolean"?(R.boundary=4,R.storage=4):E.isVector2?(R.boundary=8,R.storage=8):E.isVector3||E.isColor?(R.boundary=16,R.storage=12):E.isVector4?(R.boundary=16,R.storage=16):E.isMatrix3?(R.boundary=48,R.storage=48):E.isMatrix4?(R.boundary=64,R.storage=64):E.isTexture?Ke("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(E)?(R.boundary=16,R.storage=E.byteLength):Ke("WebGLRenderer: Unsupported uniform value type.",E),R}function _(E){const R=E.target;R.removeEventListener("dispose",_);const T=o.indexOf(R.__bindingPointIndex);o.splice(T,1),n.deleteBuffer(r[R.id]),delete r[R.id],delete a[R.id]}function A(){for(const E in r)n.deleteBuffer(r[E]);o=[],r={},a={}}return{bind:c,update:h,dispose:A}}const Z5=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let ri=null;function $5(){return ri===null&&(ri=new Yr(Z5,16,16,br,_i),ri.name="DFG_LUT",ri.minFilter=$t,ri.magFilter=$t,ri.wrapS=Di,ri.wrapT=Di,ri.generateMipmaps=!1,ri.needsUpdate=!0),ri}class J5{constructor(e={}){const{canvas:t=M1(),context:i=null,depth:r=!0,stencil:a=!1,alpha:o=!1,antialias:l=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:h=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:f=!1,reversedDepthBuffer:d=!1,outputBufferType:p=On}=e;this.isWebGLRenderer=!0;let g;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");g=i.getContextAttributes().alpha}else g=o;const x=p,m=new Set([Zl,ql,Kl]),M=new Set([On,xi,Ra,Ca,Yl,Xl]),_=new Uint32Array(4),A=new Int32Array(4),E=new K;let R=null,T=null;const P=[],S=[];let y=null;this.domElement=t,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=gi,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const C=this;let I=!1,L=null,N=null,O=null,U=null;this._outputColorSpace=Bn;let W=0,F=0,Q=null,X=-1,te=null;const B=new kt,ae=new kt;let ue=null;const Pe=new Mt(0);let He=0,Xe=t.width,ee=t.height,re=1,V=null,he=null;const se=new kt(0,0,Xe,ee),Ae=new kt(0,0,Xe,ee);let tt=!1;const Oe=new ec;let ze=!1,Je=!1;const $e=new Kt,Ct=new K,zt=new kt,an={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let At=!1;function Lt(){return Q===null?re:1}let H=i;function it(w,z){return t.getContext(w,z)}let Ve,D,b,k,Y,$,le,fe,j,ne,pe,Ie,ve,Me,Be,We,Qe,G,xe,ie,_e,ye,oe;try{const w={alpha:!0,depth:r,stencil:a,antialias:l,premultipliedAlpha:c,preserveDrawingBuffer:h,powerPreference:u,failIfMajorPerformanceCaveat:f};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${Wl}`),t.addEventListener("webglcontextlost",Pt,!1),t.addEventListener("webglcontextrestored",xt,!1),t.addEventListener("webglcontextcreationerror",Vn,!1),H===null){const z="webgl2";if(H=it(z,w),H===null)throw it(z)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}ke()}catch(w){throw t.removeEventListener("webglcontextlost",Pt,!1),t.removeEventListener("webglcontextrestored",xt,!1),t.removeEventListener("webglcontextcreationerror",Vn,!1),pt("WebGLRenderer: "+w.message),w}function ke(){Ve=new $2(H),Ve.init(),_e=new H5(H,Ve),D=new z2(H,Ve,e,_e),b=new k5(H,Ve),D.reversedDepthBuffer&&d&&b.buffers.depth.setReversed(!0),N=H.createFramebuffer(),O=H.createFramebuffer(),U=H.createFramebuffer(),k=new j2(H),Y=new w5,$=new z5(H,Ve,b,Y,D,_e,k),le=new Z2(C),fe=new tg(H),ye=new B2(H,fe),j=new J2(H,fe,k,ye),ne=new tM(H,j,fe,ye,k),G=new eM(H,D,$),Be=new H2(Y),pe=new y5(C,le,Ve,D,ye,Be),Ie=new K5(C,Y),ve=new T5,Me=new O5(Ve),Qe=new U2(C,le,b,ne,g,c),We=new B5(C,ne,D),oe=new q5(H,k,D,b),xe=new k2(H,Ve,k),ie=new Q2(H,Ve,k),k.programs=pe.programs,C.capabilities=D,C.extensions=Ve,C.properties=Y,C.renderLists=ve,C.shadowMap=We,C.state=b,C.info=k}x!==On&&(y=new iM(x,t.width,t.height,l,r,a));const Ne=new Y5(C,H);this.xr=Ne,this.getContext=function(){return H},this.getContextAttributes=function(){return H.getContextAttributes()},this.forceContextLoss=function(){const w=Ve.get("WEBGL_lose_context");w&&w.loseContext()},this.forceContextRestore=function(){const w=Ve.get("WEBGL_lose_context");w&&w.restoreContext()},this.getPixelRatio=function(){return re},this.setPixelRatio=function(w){w!==void 0&&(re=w,this.setSize(Xe,ee,!1))},this.getSize=function(w){return w.set(Xe,ee)},this.setSize=function(w,z,J=!0){if(Ne.isPresenting){Ke("WebGLRenderer: Can't change size while VR device is presenting.");return}Xe=w,ee=z,t.width=Math.floor(w*re),t.height=Math.floor(z*re),J===!0&&(t.style.width=w+"px",t.style.height=z+"px"),y!==null&&y.setSize(t.width,t.height),this.setViewport(0,0,w,z)},this.getDrawingBufferSize=function(w){return w.set(Xe*re,ee*re).floor()},this.setDrawingBufferSize=function(w,z,J){Xe=w,ee=z,re=J,t.width=Math.floor(w*J),t.height=Math.floor(z*J),this.setViewport(0,0,w,z)},this.setEffects=function(w){if(x===On){pt("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(w){for(let z=0;z<w.length;z++)if(w[z].isOutputPass===!0){Ke("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}y.setEffects(w||[])},this.getCurrentViewport=function(w){return w.copy(B)},this.getViewport=function(w){return w.copy(se)},this.setViewport=function(w,z,J,q){w.isVector4?se.set(w.x,w.y,w.z,w.w):se.set(w,z,J,q),b.viewport(B.copy(se).multiplyScalar(re).round())},this.getScissor=function(w){return w.copy(Ae)},this.setScissor=function(w,z,J,q){w.isVector4?Ae.set(w.x,w.y,w.z,w.w):Ae.set(w,z,J,q),b.scissor(ae.copy(Ae).multiplyScalar(re).round())},this.getScissorTest=function(){return tt},this.setScissorTest=function(w){b.setScissorTest(tt=w)},this.setOpaqueSort=function(w){V=w},this.setTransparentSort=function(w){he=w},this.getClearColor=function(w){return w.copy(Qe.getClearColor())},this.setClearColor=function(){Qe.setClearColor(...arguments)},this.getClearAlpha=function(){return Qe.getClearAlpha()},this.setClearAlpha=function(){Qe.setClearAlpha(...arguments)},this.clear=function(w=!0,z=!0,J=!0){let q=0;if(w){let Z=!1;if(Q!==null){const Ee=Q.texture.format;Z=m.has(Ee)}if(Z){const Ee=Q.texture.type,Te=M.has(Ee),Se=Qe.getClearColor(),Le=Qe.getClearAlpha(),Fe=Se.r,rt=Se.g,ot=Se.b;Te?(_[0]=Fe,_[1]=rt,_[2]=ot,_[3]=Le,H.clearBufferuiv(H.COLOR,0,_)):(A[0]=Fe,A[1]=rt,A[2]=ot,A[3]=Le,H.clearBufferiv(H.COLOR,0,A))}else q|=H.COLOR_BUFFER_BIT}z&&(q|=H.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),J&&(q|=H.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),q!==0&&H.clear(q)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(w){w.setRenderer(this),L=w},this.dispose=function(){t.removeEventListener("webglcontextlost",Pt,!1),t.removeEventListener("webglcontextrestored",xt,!1),t.removeEventListener("webglcontextcreationerror",Vn,!1),Qe.dispose(),ve.dispose(),Me.dispose(),Y.dispose(),le.dispose(),ne.dispose(),ye.dispose(),oe.dispose(),pe.dispose(),Ne.dispose(),Ne.removeEventListener("sessionstart",sc),Ne.removeEventListener("sessionend",oc),ir.stop()};function Pt(w){w.preventDefault(),Ic("WebGLRenderer: Context Lost."),I=!0}function xt(){Ic("WebGLRenderer: Context Restored."),I=!1;const w=k.autoReset,z=We.enabled,J=We.autoUpdate,q=We.needsUpdate,Z=We.type;ke(),k.autoReset=w,We.enabled=z,We.autoUpdate=J,We.needsUpdate=q,We.type=Z}function Vn(w){pt("WebGLRenderer: A WebGL context could not be created. Reason: ",w.statusMessage)}function ti(w){const z=w.target;z.removeEventListener("dispose",ti),nd(z)}function nd(w){id(w),Y.remove(w)}function id(w){const z=Y.get(w).programs;z!==void 0&&(z.forEach(function(J){pe.releaseProgram(J)}),w.isShaderMaterial&&pe.releaseShaderCache(w))}this.renderBufferDirect=function(w,z,J,q,Z,Ee){z===null&&(z=an);const Te=Z.isMesh&&Z.matrixWorld.determinantAffine()<0,Se=sd(w,z,J,q,Z);b.setMaterial(q,Te);let Le=J.index,Fe=1;if(q.wireframe===!0){if(Le=j.getWireframeAttribute(J),Le===void 0)return;Fe=2}const rt=J.drawRange,ot=J.attributes.position;let De=rt.start*Fe,_t=(rt.start+rt.count)*Fe;Ee!==null&&(De=Math.max(De,Ee.start*Fe),_t=Math.min(_t,(Ee.start+Ee.count)*Fe)),Le!==null?(De=Math.max(De,0),_t=Math.min(_t,Le.count)):ot!=null&&(De=Math.max(De,0),_t=Math.min(_t,ot.count));const Jt=_t-De;if(Jt<0||Jt===1/0)return;ye.setup(Z,q,Se,J,Le);let It,Dt=xe;if(Le!==null&&(It=fe.get(Le),Dt=ie,Dt.setIndex(It)),Z.isMesh)q.wireframe===!0?(b.setLineWidth(q.wireframeLinewidth*Lt()),Dt.setMode(H.LINES)):Dt.setMode(H.TRIANGLES);else if(Z.isLine){let fn=q.linewidth;fn===void 0&&(fn=1),b.setLineWidth(fn*Lt()),Z.isLineSegments?Dt.setMode(H.LINES):Z.isLineLoop?Dt.setMode(H.LINE_LOOP):Dt.setMode(H.LINE_STRIP)}else Z.isPoints?Dt.setMode(H.POINTS):Z.isSprite&&Dt.setMode(H.TRIANGLES);if(Z.isBatchedMesh)if(Ve.get("WEBGL_multi_draw"))Dt.renderMultiDraw(Z._multiDrawStarts,Z._multiDrawCounts,Z._multiDrawCount);else{const fn=Z._multiDrawStarts,we=Z._multiDrawCounts,bn=Z._multiDrawCount,dt=Le?fe.get(Le).bytesPerElement:1,Fn=Y.get(q).currentProgram.getUniforms();for(let ni=0;ni<bn;ni++)Fn.setValue(H,"_gl_DrawID",ni),Dt.render(fn[ni]/dt,we[ni])}else if(Z.isInstancedMesh)Dt.renderInstances(De,Jt,Z.count);else if(J.isInstancedBufferGeometry){const fn=J._maxInstanceCount!==void 0?J._maxInstanceCount:1/0,we=Math.min(J.instanceCount,fn);Dt.renderInstances(De,Jt,we)}else Dt.render(De,Jt)};function ac(w,z,J,q){L!==null&&w.isNodeMaterial&&L.setObject(q,w),ze===!0&&Be.setState(w,J,!1),w.transparent===!0&&w.side===Li&&w.forceSinglePass===!1?(w.side=Cn,w.needsUpdate=!0,Ua(w,z,q),w.side=_r,w.needsUpdate=!0,Ua(w,z,q),w.side=Li):Ua(w,z,q)}this.compile=function(w,z,J=null){J===null&&(J=w),L!==null&&L.renderStart(w,z,J),T=Me.get(J),T.init(z),S.push(T),J.traverseVisible(function(Z){Z.isLight&&Z.layers.test(z.layers)&&(T.pushLight(Z),Z.castShadow&&T.pushShadow(Z))}),w!==J&&w.traverseVisible(function(Z){Z.isLight&&Z.layers.test(z.layers)&&(T.pushLight(Z),Z.castShadow&&T.pushShadow(Z))}),T.setupLights(),L!==null&&L.updateLights(T.state.lightsArray),Je=this.localClippingEnabled,ze=Be.init(this.clippingPlanes,Je),ze===!0&&Be.setGlobalState(this.clippingPlanes,z),L!==null&&We.render(T.state.shadowsArray,J,z);const q=new Set;return w.traverse(function(Z){if(!(Z.isMesh||Z.isPoints||Z.isLine||Z.isSprite))return;const Ee=Z.material;if(Ee)if(Array.isArray(Ee))for(let Te=0;Te<Ee.length;Te++){const Se=Ee[Te];ac(Se,J,z,Z),q.add(Se)}else ac(Ee,J,z,Z),q.add(Ee)}),T=S.pop(),L!==null&&L.renderEnd(),q},this.compileAsync=function(w,z,J=null){const q=this.compile(w,z,J);return new Promise(Z=>{function Ee(){if(q.forEach(function(Te){const Le=Y.get(Te).currentProgram;(Le===void 0||Le.isReady())&&q.delete(Te)}),q.size===0){Z(w);return}setTimeout(Ee,10)}Ve.get("KHR_parallel_shader_compile")!==null?Ee():setTimeout(Ee,10)})};let Ys=null;function rd(w){Ys&&Ys(w)}function sc(){ir.stop()}function oc(){ir.start()}const ir=new zh;ir.setAnimationLoop(rd),typeof self<"u"&&ir.setContext(self),this.setAnimationLoop=function(w){Ys=w,Ne.setAnimationLoop(w),w===null?ir.stop():ir.start()},Ne.addEventListener("sessionstart",sc),Ne.addEventListener("sessionend",oc),this.render=function(w,z){if(z!==void 0&&z.isCamera!==!0){pt("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(I===!0)return;L!==null&&L.renderStart(w,z);const J=Ne.enabled===!0&&Ne.isPresenting===!0,q=y!==null&&(Q===null||J)&&y.begin(C,Q);if(w.matrixWorldAutoUpdate===!0&&w.updateMatrixWorld(),z.parent===null&&z.matrixWorldAutoUpdate===!0&&z.updateMatrixWorld(),Ne.enabled===!0&&Ne.isPresenting===!0&&(y===null||y.isCompositing()===!1)&&(Ne.cameraAutoUpdate===!0&&Ne.updateCamera(z),z=Ne.getCamera()),w.isScene===!0&&w.onBeforeRender(C,w,z,Q),T=Me.get(w,S.length),T.init(z),T.state.textureUnits=$.getTextureUnits(),S.push(T),$e.multiplyMatrices(z.projectionMatrix,z.matrixWorldInverse),Oe.setFromProjectionMatrix($e,pi,z.reversedDepth),Je=this.localClippingEnabled,ze=Be.init(this.clippingPlanes,Je),R=ve.get(w,P.length),R.init(),P.push(R),Ne.enabled===!0&&Ne.isPresenting===!0){const Te=C.xr.getDepthSensingMesh();Te!==null&&Xs(Te,z,-1/0,C.sortObjects)}Xs(w,z,0,C.sortObjects),R.finish(),L!==null&&L.updateLights(T.state.lightsArray),C.sortObjects===!0&&R.sort(V,he),At=Ne.enabled===!1||Ne.isPresenting===!1||Ne.hasDepthSensing()===!1,At&&Qe.addToRenderList(R,w),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),ze===!0&&Be.beginShadows();const Z=T.state.shadowsArray;if(We.render(Z,w,z),ze===!0&&Be.endShadows(),(q&&y.hasRenderPass())===!1){const Te=R.opaque,Se=R.transmissive;if(T.setupLights(),z.isArrayCamera){const Le=z.cameras;if(Se.length>0)for(let Fe=0,rt=Le.length;Fe<rt;Fe++){const ot=Le[Fe];cc(Te,Se,w,ot)}At&&Qe.render(w);for(let Fe=0,rt=Le.length;Fe<rt;Fe++){const ot=Le[Fe];lc(R,w,ot,ot.viewport)}}else Se.length>0&&cc(Te,Se,w,z),At&&Qe.render(w),lc(R,w,z)}Q!==null&&F===0&&($.updateMultisampleRenderTarget(Q),$.updateRenderTargetMipmap(Q)),q&&y.end(C),w.isScene===!0&&w.onAfterRender(C,w,z),ye.resetDefaultState(),X=-1,te=null,S.pop(),S.length>0?(T=S[S.length-1],$.setTextureUnits(T.state.textureUnits),ze===!0&&Be.setGlobalState(C.clippingPlanes,T.state.camera)):T=null,P.pop(),P.length>0?R=P[P.length-1]:R=null,L!==null&&L.renderEnd()};function Xs(w,z,J,q){if(w.visible===!1)return;if(w.layers.test(z.layers)){if(w.isGroup)J=w.renderOrder;else if(w.isLOD)w.autoUpdate===!0&&w.update(z);else if(w.isLightProbeGrid)T.pushLightProbeGrid(w);else if(w.isLight)T.pushLight(w),w.castShadow&&T.pushShadow(w);else if(w.isSprite){if(!w.frustumCulled||w.intersectsFrustum(Oe)){q&&zt.setFromMatrixPosition(w.matrixWorld).applyMatrix4($e);const Te=ne.update(w),Se=w.material;Se.visible&&R.push(w,Te,Se,J,zt.z,null,z)}}else if((w.isMesh||w.isLine||w.isPoints)&&(!w.frustumCulled||w.intersectsFrustum(Oe))){const Te=ne.update(w),Se=w.material;if(q&&(w.boundingSphere!==void 0?(w.boundingSphere===null&&w.computeBoundingSphere(),zt.copy(w.boundingSphere.center)):(Te.boundingSphere===null&&Te.computeBoundingSphere(),zt.copy(Te.boundingSphere.center)),zt.applyMatrix4(w.matrixWorld).applyMatrix4($e)),Array.isArray(Se)){const Le=Te.groups;for(let Fe=0,rt=Le.length;Fe<rt;Fe++){const ot=Le[Fe],De=Se[ot.materialIndex];De&&De.visible&&R.push(w,Te,De,J,zt.z,ot,z)}}else Se.visible&&R.push(w,Te,Se,J,zt.z,null,z)}}const Ee=w.children;for(let Te=0,Se=Ee.length;Te<Se;Te++)Xs(Ee[Te],z,J,q)}function lc(w,z,J,q){const{opaque:Z,transmissive:Ee,transparent:Te}=w;T.setupLightsView(J),ze===!0&&Be.setGlobalState(C.clippingPlanes,J),q&&b.viewport(B.copy(q)),Z.length>0&&Fa(Z,z,J),Ee.length>0&&Fa(Ee,z,J),Te.length>0&&Fa(Te,z,J),b.buffers.depth.setTest(!0),b.buffers.depth.setMask(!0),b.buffers.color.setMask(!0),b.setPolygonOffset(!1)}function cc(w,z,J,q){if((J.isScene===!0?J.overrideMaterial:null)!==null)return;if(T.state.transmissionRenderTarget[q.id]===void 0){const De=Ve.has("EXT_color_buffer_half_float")||Ve.has("EXT_color_buffer_float");T.state.transmissionRenderTarget[q.id]=new Gn(1,1,{generateMipmaps:!0,type:De?_i:On,minFilter:fr,samples:Math.max(4,D.samples),stencilBuffer:a,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:lt.workingColorSpace})}const Ee=T.state.transmissionRenderTarget[q.id],Te=q.viewport||B;Ee.setSize(Te.z*C.transmissionResolutionScale,Te.w*C.transmissionResolutionScale);const Se=C.getRenderTarget(),Le=C.getActiveCubeFace(),Fe=C.getActiveMipmapLevel();C.setRenderTarget(Ee),C.getClearColor(Pe),He=C.getClearAlpha(),He<1&&C.setClearColor(16777215,.5),C.clear(),At&&Qe.render(J);const rt=C.toneMapping;C.toneMapping=gi;const ot=q.viewport;if(q.viewport!==void 0&&(q.viewport=void 0),T.setupLightsView(q),ze===!0&&Be.setGlobalState(C.clippingPlanes,q),Fa(w,J,q),$.updateMultisampleRenderTarget(Ee),$.updateRenderTargetMipmap(Ee),Ve.has("WEBGL_multisampled_render_to_texture")===!1){let De=!1;for(let _t=0,Jt=z.length;_t<Jt;_t++){const It=z[_t],{object:Dt,geometry:fn,material:we,group:bn}=It;if(we.side===Li&&Dt.layers.test(q.layers)){const dt=we.side;we.side=Cn,we.needsUpdate=!0,uc(Dt,J,q,fn,we,bn),we.side=dt,we.needsUpdate=!0,De=!0}}De===!0&&($.updateMultisampleRenderTarget(Ee),$.updateRenderTargetMipmap(Ee))}C.setRenderTarget(Se,Le,Fe),C.setClearColor(Pe,He),ot!==void 0&&(q.viewport=ot),C.toneMapping=rt}function Fa(w,z,J){const q=z.isScene===!0?z.overrideMaterial:null;for(let Z=0,Ee=w.length;Z<Ee;Z++){const Te=w[Z],{object:Se,geometry:Le,group:Fe}=Te;let rt=Te.material;rt.allowOverride===!0&&q!==null&&(rt=q),Se.layers.test(J.layers)&&uc(Se,z,J,Le,rt,Fe)}}function uc(w,z,J,q,Z,Ee){L!==null&&Z.isNodeMaterial&&L.setObject(w,Z),w.onBeforeRender(C,z,J,q,Z,Ee),w.modelViewMatrix.multiplyMatrices(J.matrixWorldInverse,w.matrixWorld),w.normalMatrix.getNormalMatrix(w.modelViewMatrix),Z.onBeforeRender(C,z,J,q,w,Ee),Z.transparent===!0&&Z.side===Li&&Z.forceSinglePass===!1?(Z.side=Cn,Z.needsUpdate=!0,C.renderBufferDirect(J,z,q,Z,w,Ee),Z.side=_r,Z.needsUpdate=!0,C.renderBufferDirect(J,z,q,Z,w,Ee),Z.side=Li):C.renderBufferDirect(J,z,q,Z,w,Ee),w.onAfterRender(C,z,J,q,Z,Ee)}function Ua(w,z,J){z.isScene!==!0&&(z=an);const q=Y.get(w),Z=T.state.lights,Ee=T.state.shadowsArray,Te=Z.state.version,Se=pe.getParameters(w,Z.state,Ee,z,J,T.state.lightProbeGridArray),Le=pe.getProgramCacheKey(Se);let Fe=q.programs;q.environment=w.isMeshStandardMaterial||w.isMeshLambertMaterial||w.isMeshPhongMaterial?z.environment:null,q.fog=z.fog;const rt=w.isMeshStandardMaterial||w.isMeshLambertMaterial&&!w.envMap||w.isMeshPhongMaterial&&!w.envMap;q.envMap=le.get(w.envMap||q.environment,rt),q.envMapRotation=q.environment!==null&&w.envMap===null?z.environmentRotation:w.envMapRotation,Fe===void 0&&(w.addEventListener("dispose",ti),Fe=new Map,q.programs=Fe);let ot=Fe.get(Le);if(ot!==void 0){if(q.currentProgram===ot&&q.lightsStateVersion===Te)return dc(w,Se),ot}else Se.uniforms=pe.getUniforms(w),L!==null&&w.isNodeMaterial&&L.build(w,J,Se),w.onBeforeCompile(Se,C),ot=pe.acquireProgram(Se,Le),Fe.set(Le,ot),q.uniforms=Se.uniforms;const De=q.uniforms;return(!w.isShaderMaterial&&!w.isRawShaderMaterial||w.clipping===!0)&&(De.clippingPlanes=Be.uniform),dc(w,Se),q.needsLights=ld(w),q.lightsStateVersion=Te,q.needsLights&&(De.ambientLightColor.value=Z.state.ambient,De.lightProbe.value=Z.state.probe,De.sunLights.value=Z.state.sun,De.sunLightShadows.value=Z.state.sunShadow,De.directionalLights.value=Z.state.directional,De.directionalLightShadows.value=Z.state.directionalShadow,De.spotLights.value=Z.state.spot,De.spotLightShadows.value=Z.state.spotShadow,De.rectAreaLights.value=Z.state.rectArea,De.ltc_1.value=Z.state.rectAreaLTC1,De.ltc_2.value=Z.state.rectAreaLTC2,De.pointLights.value=Z.state.point,De.pointLightShadows.value=Z.state.pointShadow,De.hemisphereLights.value=Z.state.hemi,De.sunShadowMatrix.value=Z.state.sunShadowMatrix,De.sunShadowCascade.value=Z.state.sunShadowCascade,De.directionalShadowMatrix.value=Z.state.directionalShadowMatrix,De.spotLightMatrix.value=Z.state.spotLightMatrix,De.spotLightMap.value=Z.state.spotLightMap,De.pointShadowMatrix.value=Z.state.pointShadowMatrix),q.lightProbeGrid=T.state.lightProbeGridArray.length>0,q.currentProgram=ot,q.uniformsList=null,ot}function hc(w){if(w.uniformsList===null){const z=w.currentProgram.getUniforms();w.uniformsList=ys.seqWithValue(z.seq,w.uniforms)}return w.uniformsList}function dc(w,z){const J=Y.get(w);J.outputColorSpace=z.outputColorSpace,J.batching=z.batching,J.batchingColor=z.batchingColor,J.instancing=z.instancing,J.instancingColor=z.instancingColor,J.instancingMorph=z.instancingMorph,J.skinning=z.skinning,J.morphTargets=z.morphTargets,J.morphNormals=z.morphNormals,J.morphColors=z.morphColors,J.morphTargetsCount=z.morphTargetsCount,J.numClippingPlanes=z.numClippingPlanes,J.numIntersection=z.numClipIntersection,J.vertexAlphas=z.vertexAlphas,J.vertexTangents=z.vertexTangents,J.toneMapping=z.toneMapping}function ad(w,z){if(w.length===0)return null;if(w.length===1)return w[0].texture!==null?w[0]:null;E.setFromMatrixPosition(z.matrixWorld);for(let J=0,q=w.length;J<q;J++){const Z=w[J];if(Z.texture!==null&&Z.boundingBox.containsPoint(E))return Z}return null}function sd(w,z,J,q,Z){z.isScene!==!0&&(z=an),$.resetTextureUnits();const Ee=z.fog,Te=q.isMeshStandardMaterial||q.isMeshLambertMaterial||q.isMeshPhongMaterial?z.environment:null,Se=Q===null?C.outputColorSpace:Q.isXRRenderTarget===!0?Q.texture.colorSpace:lt.workingColorSpace,Le=q.isMeshStandardMaterial||q.isMeshLambertMaterial&&!q.envMap||q.isMeshPhongMaterial&&!q.envMap,Fe=le.get(q.envMap||Te,Le),rt=q.vertexColors===!0&&!!J.attributes.color&&J.attributes.color.itemSize===4,ot=!!J.attributes.tangent&&(!!q.normalMap||q.anisotropy>0),De=!!J.morphAttributes.position,_t=!!J.morphAttributes.normal,Jt=!!J.morphAttributes.color;let It=gi;q.toneMapped&&(Q===null||Q.isXRRenderTarget===!0)&&(It=C.toneMapping);const Dt=J.morphAttributes.position||J.morphAttributes.normal||J.morphAttributes.color,fn=Dt!==void 0?Dt.length:0,we=Y.get(q),bn=T.state.lights;if(ze===!0&&(Je===!0||w!==te)){const Ot=w===te&&q.id===X;Be.setState(q,w,Ot)}let dt=!1;q.version===we.__version?(we.needsLights&&we.lightsStateVersion!==bn.state.version||we.outputColorSpace!==Se||Z.isBatchedMesh&&we.batching===!1||!Z.isBatchedMesh&&we.batching===!0||Z.isBatchedMesh&&we.batchingColor===!0&&Z._colorsTexture===null||Z.isBatchedMesh&&we.batchingColor===!1&&Z._colorsTexture!==null||Z.isInstancedMesh&&we.instancing===!1||!Z.isInstancedMesh&&we.instancing===!0||Z.isSkinnedMesh&&we.skinning===!1||!Z.isSkinnedMesh&&we.skinning===!0||Z.isInstancedMesh&&we.instancingColor===!0&&Z.instanceColor===null||Z.isInstancedMesh&&we.instancingColor===!1&&Z.instanceColor!==null||Z.isInstancedMesh&&we.instancingMorph===!0&&Z.morphTexture===null||Z.isInstancedMesh&&we.instancingMorph===!1&&Z.morphTexture!==null||we.envMap!==Fe||q.fog===!0&&we.fog!==Ee||we.numClippingPlanes!==void 0&&(we.numClippingPlanes!==Be.numPlanes||we.numIntersection!==Be.numIntersection)||we.vertexAlphas!==rt||we.vertexTangents!==ot||we.morphTargets!==De||we.morphNormals!==_t||we.morphColors!==Jt||we.toneMapping!==It||we.morphTargetsCount!==fn||!!we.lightProbeGrid!=T.state.lightProbeGridArray.length>0)&&(dt=!0):(dt=!0,we.__version=q.version);let Fn=we.currentProgram;dt===!0&&(Fn=Ua(q,z,Z),L&&q.isNodeMaterial&&L.onUpdateProgram(q,Fn,we));let ni=!1,Vi=!1,yr=!1;const Tt=Fn.getUniforms(),Zt=we.uniforms;if(b.useProgram(Fn.program)&&(ni=!0,Vi=!0,yr=!0),q.id!==X&&(X=q.id,Vi=!0),we.needsLights){const Ot=ad(T.state.lightProbeGridArray,Z);we.lightProbeGrid!==Ot&&(we.lightProbeGrid=Ot,Vi=!0)}if(ni||te!==w){b.buffers.depth.getReversed()&&w.reversedDepth!==!0&&(w._reversedDepth=!0,w.updateProjectionMatrix()),Tt.setValue(H,"projectionMatrix",w.projectionMatrix),Tt.setValue(H,"viewMatrix",w.matrixWorldInverse);const Xi=Tt.map.cameraPosition;Xi!==void 0&&Xi.setValue(H,Ct.setFromMatrixPosition(w.matrixWorld)),D.logarithmicDepthBuffer&&Tt.setValue(H,"logDepthBufFC",2/(Math.log(w.far+1)/Math.LN2)),(q.isMeshPhongMaterial||q.isMeshToonMaterial||q.isMeshLambertMaterial||q.isMeshBasicMaterial||q.isMeshStandardMaterial||q.isShaderMaterial)&&Tt.setValue(H,"isOrthographic",w.isOrthographicCamera===!0),te!==w&&(te=w,Vi=!0,yr=!0)}if(we.needsLights&&(bn.state.sunShadowMap.length>0&&Tt.setValue(H,"sunShadowMap",bn.state.sunShadowMap,$),bn.state.directionalShadowMap.length>0&&Tt.setValue(H,"directionalShadowMap",bn.state.directionalShadowMap,$),bn.state.spotShadowMap.length>0&&Tt.setValue(H,"spotShadowMap",bn.state.spotShadowMap,$),bn.state.pointShadowMap.length>0&&Tt.setValue(H,"pointShadowMap",bn.state.pointShadowMap,$)),Z.isSkinnedMesh){Tt.setOptional(H,Z,"bindMatrix"),Tt.setOptional(H,Z,"bindMatrixInverse");const Ot=Z.skeleton;Ot&&(Ot.boneTexture===null&&Ot.computeBoneTexture(),Tt.setValue(H,"boneTexture",Ot.boneTexture,$))}Z.isBatchedMesh&&(Tt.setOptional(H,Z,"batchingTexture"),Tt.setValue(H,"batchingTexture",Z._matricesTexture,$),Tt.setOptional(H,Z,"batchingIdTexture"),Tt.setValue(H,"batchingIdTexture",Z._indirectTexture,$),Tt.setOptional(H,Z,"batchingColorTexture"),Z._colorsTexture!==null&&Tt.setValue(H,"batchingColorTexture",Z._colorsTexture,$));const Yi=J.morphAttributes;if((Yi.position!==void 0||Yi.normal!==void 0||Yi.color!==void 0)&&G.update(Z,J,Fn),(Vi||we.receiveShadow!==Z.receiveShadow)&&(we.receiveShadow=Z.receiveShadow,Tt.setValue(H,"receiveShadow",Z.receiveShadow)),(q.isMeshStandardMaterial||q.isMeshLambertMaterial||q.isMeshPhongMaterial)&&q.envMap===null&&z.environment!==null&&(Zt.envMapIntensity.value=z.environmentIntensity),Zt.dfgLUT!==void 0&&(Zt.dfgLUT.value=$5()),Vi){if(Tt.setValue(H,"toneMappingExposure",C.toneMappingExposure),we.needsLights&&od(Zt,yr),Ee&&q.fog===!0&&Ie.refreshFogUniforms(Zt,Ee),Ie.refreshMaterialUniforms(Zt,q,re,ee,T.state.transmissionRenderTarget[w.id]),we.needsLights&&we.lightProbeGrid){const Ot=we.lightProbeGrid;Zt.probesSH.value=Ot.texture,Zt.probesMin.value.copy(Ot.boundingBox.min),Zt.probesMax.value.copy(Ot.boundingBox.max),Zt.probesResolution.value.copy(Ot.resolution)}ys.upload(H,hc(we),Zt,$)}if(q.isShaderMaterial&&q.uniformsNeedUpdate===!0&&(ys.upload(H,hc(we),Zt,$),q.uniformsNeedUpdate=!1),q.isSpriteMaterial&&Tt.setValue(H,"center",Z.center),Tt.setValue(H,"modelViewMatrix",Z.modelViewMatrix),Tt.setValue(H,"normalMatrix",Z.normalMatrix),Tt.setValue(H,"modelMatrix",Z.matrixWorld),q.uniformsGroups!==void 0){const Ot=q.uniformsGroups;for(let Xi=0,wr=Ot.length;Xi<wr;Xi++){const pc=Ot[Xi];oe.update(pc,Fn),oe.bind(pc,Fn)}}return Fn}function od(w,z){w.ambientLightColor.needsUpdate=z,w.lightProbe.needsUpdate=z,w.sunLights.needsUpdate=z,w.sunLightShadows.needsUpdate=z,w.directionalLights.needsUpdate=z,w.directionalLightShadows.needsUpdate=z,w.pointLights.needsUpdate=z,w.pointLightShadows.needsUpdate=z,w.spotLights.needsUpdate=z,w.spotLightShadows.needsUpdate=z,w.rectAreaLights.needsUpdate=z,w.hemisphereLights.needsUpdate=z}function ld(w){return w.isMeshLambertMaterial||w.isMeshToonMaterial||w.isMeshPhongMaterial||w.isMeshStandardMaterial||w.isShadowMaterial||w.isShaderMaterial&&w.lights===!0}this.getActiveCubeFace=function(){return W},this.getActiveMipmapLevel=function(){return F},this.getRenderTarget=function(){return Q},this.setRenderTargetTextures=function(w,z,J){const q=Y.get(w);q.__autoAllocateDepthBuffer=w.resolveDepthBuffer===!1,q.__autoAllocateDepthBuffer===!1&&(q.__useRenderToTexture=!1),Y.get(w.texture).__webglTexture=z,Y.get(w.depthTexture).__webglTexture=q.__autoAllocateDepthBuffer?void 0:J,q.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(w,z){const J=Y.get(w);J.__webglFramebuffer=z,J.__useDefaultFramebuffer=z===void 0},this.setRenderTarget=function(w,z=0,J=0){Q=w,W=z,F=J;let q=null,Z=!1,Ee=!1;if(w){const Se=Y.get(w);if(Se.__useDefaultFramebuffer!==void 0){b.bindFramebuffer(H.FRAMEBUFFER,Se.__webglFramebuffer),B.copy(w.viewport),ae.copy(w.scissor),ue=w.scissorTest,b.viewport(B),b.scissor(ae),b.setScissorTest(ue),X=-1;return}else if(Se.__webglFramebuffer===void 0)$.setupRenderTarget(w);else if(Se.__hasExternalTextures)$.rebindTextures(w,Y.get(w.texture).__webglTexture,Y.get(w.depthTexture).__webglTexture);else if(w.depthBuffer){const rt=w.depthTexture;if(Se.__boundDepthTexture!==rt){if(rt!==null&&Y.has(rt)&&(w.width!==rt.image.width||w.height!==rt.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");$.setupDepthRenderbuffer(w)}}const Le=w.texture;(Le.isData3DTexture||Le.isDataArrayTexture||Le.isCompressedArrayTexture)&&(Ee=!0);const Fe=Y.get(w).__webglFramebuffer;w.isWebGLCubeRenderTarget?(Array.isArray(Fe[z])?q=Fe[z][J]:q=Fe[z],Z=!0):w.samples>0&&$.useMultisampledRTT(w)===!1?q=Y.get(w).__webglMultisampledFramebuffer:Array.isArray(Fe)?q=Fe[J]:q=Fe,B.copy(w.viewport),ae.copy(w.scissor),ue=w.scissorTest}else B.copy(se).multiplyScalar(re).floor(),ae.copy(Ae).multiplyScalar(re).floor(),ue=tt;if(J!==0&&(q=N),b.bindFramebuffer(H.FRAMEBUFFER,q)&&b.drawBuffers(w,q),b.viewport(B),b.scissor(ae),b.setScissorTest(ue),Z){const Se=Y.get(w.texture);H.framebufferTexture2D(H.FRAMEBUFFER,H.COLOR_ATTACHMENT0,H.TEXTURE_CUBE_MAP_POSITIVE_X+z,Se.__webglTexture,J)}else if(Ee){const Se=z;for(let Le=0;Le<w.textures.length;Le++){const Fe=Y.get(w.textures[Le]);H.framebufferTextureLayer(H.FRAMEBUFFER,H.COLOR_ATTACHMENT0+Le,Fe.__webglTexture,J,Se)}}else if(w!==null&&J!==0){const Se=Y.get(w.texture);H.framebufferTexture2D(H.FRAMEBUFFER,H.COLOR_ATTACHMENT0,H.TEXTURE_2D,Se.__webglTexture,J)}X=-1};function fc(w){const z=Y.get(w);return(z.__readFormat!==w.format||z.__readType!==w.type)&&(z.__readFormat=w.format,z.__readType=w.type,z.__formatReadable=D.textureFormatReadable(w.format),z.__typeReadable=D.textureTypeReadable(w.type)),z}this.readRenderTargetPixels=function(w,z,J,q,Z,Ee,Te,Se=0){if(!(w&&w.isWebGLRenderTarget)){pt("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Le=Y.get(w).__webglFramebuffer;if(w.isWebGLCubeRenderTarget&&Te!==void 0&&(Le=Le[Te]),Le){b.bindFramebuffer(H.FRAMEBUFFER,Le);try{const Fe=w.textures[Se],rt=Fe.format,ot=Fe.type;w.textures.length>1&&H.readBuffer(H.COLOR_ATTACHMENT0+Se);const De=fc(Fe);if(De.__formatReadable===!1){pt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(De.__typeReadable===!1){pt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}z>=0&&z<=w.width-q&&J>=0&&J<=w.height-Z&&H.readPixels(z,J,q,Z,_e.convert(rt),_e.convert(ot),Ee)}finally{const Fe=Q!==null?Y.get(Q).__webglFramebuffer:null;b.bindFramebuffer(H.FRAMEBUFFER,Fe)}}},this.readRenderTargetPixelsAsync=async function(w,z,J,q,Z,Ee,Te,Se=0){if(!(w&&w.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Le=Y.get(w).__webglFramebuffer;if(w.isWebGLCubeRenderTarget&&Te!==void 0&&(Le=Le[Te]),Le)if(z>=0&&z<=w.width-q&&J>=0&&J<=w.height-Z){b.bindFramebuffer(H.FRAMEBUFFER,Le);const Fe=w.textures[Se],rt=Fe.format,ot=Fe.type;w.textures.length>1&&H.readBuffer(H.COLOR_ATTACHMENT0+Se);const De=fc(Fe);if(De.__formatReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(De.__typeReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const _t=H.createBuffer();H.bindBuffer(H.PIXEL_PACK_BUFFER,_t),H.bufferData(H.PIXEL_PACK_BUFFER,Ee.byteLength,H.STREAM_READ),H.readPixels(z,J,q,Z,_e.convert(rt),_e.convert(ot),0),H.bindBuffer(H.PIXEL_PACK_BUFFER,null);const Jt=Q!==null?Y.get(Q).__webglFramebuffer:null;b.bindFramebuffer(H.FRAMEBUFFER,Jt);const It=H.fenceSync(H.SYNC_GPU_COMMANDS_COMPLETE,0);return H.flush(),await x1(H,It,4),H.bindBuffer(H.PIXEL_PACK_BUFFER,_t),H.getBufferSubData(H.PIXEL_PACK_BUFFER,0,Ee),H.bindBuffer(H.PIXEL_PACK_BUFFER,null),H.deleteBuffer(_t),H.deleteSync(It),Ee}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(w,z=null,J=0){const q=Math.pow(2,-J),Z=Math.floor(w.image.width*q),Ee=Math.floor(w.image.height*q),Te=z!==null?z.x:0,Se=z!==null?z.y:0;$.setTexture2D(w,0),H.copyTexSubImage2D(H.TEXTURE_2D,J,0,0,Te,Se,Z,Ee),b.unbindTexture()},this.copyTextureToTexture=function(w,z,J=null,q=null,Z=0,Ee=0){let Te,Se,Le,Fe,rt,ot,De,_t,Jt;const It=w.isCompressedTexture?w.mipmaps[Ee]:w.image;if(J!==null)Te=J.max.x-J.min.x,Se=J.max.y-J.min.y,Le=J.isBox3?J.max.z-J.min.z:1,Fe=J.min.x,rt=J.min.y,ot=J.isBox3?J.min.z:0;else{const Zt=Math.pow(2,-Z);Te=Math.floor(It.width*Zt),Se=Math.floor(It.height*Zt),w.isDataArrayTexture?Le=It.depth:w.isData3DTexture?Le=Math.floor(It.depth*Zt):Le=1,Fe=0,rt=0,ot=0}q!==null?(De=q.x,_t=q.y,Jt=q.z):(De=0,_t=0,Jt=0);const Dt=_e.convert(z.format),fn=_e.convert(z.type);let we;z.isData3DTexture?($.setTexture3D(z,0),we=H.TEXTURE_3D):z.isDataArrayTexture||z.isCompressedArrayTexture?($.setTexture2DArray(z,0),we=H.TEXTURE_2D_ARRAY):($.setTexture2D(z,0),we=H.TEXTURE_2D),b.activeTexture(H.TEXTURE0),b.pixelStorei(H.UNPACK_FLIP_Y_WEBGL,z.flipY),b.pixelStorei(H.UNPACK_PREMULTIPLY_ALPHA_WEBGL,z.premultiplyAlpha),b.pixelStorei(H.UNPACK_ALIGNMENT,z.unpackAlignment);const bn=b.getParameter(H.UNPACK_ROW_LENGTH),dt=b.getParameter(H.UNPACK_IMAGE_HEIGHT),Fn=b.getParameter(H.UNPACK_SKIP_PIXELS),ni=b.getParameter(H.UNPACK_SKIP_ROWS),Vi=b.getParameter(H.UNPACK_SKIP_IMAGES);b.pixelStorei(H.UNPACK_ROW_LENGTH,It.width),b.pixelStorei(H.UNPACK_IMAGE_HEIGHT,It.height),b.pixelStorei(H.UNPACK_SKIP_PIXELS,Fe),b.pixelStorei(H.UNPACK_SKIP_ROWS,rt),b.pixelStorei(H.UNPACK_SKIP_IMAGES,ot);const yr=w.isDataArrayTexture||w.isData3DTexture,Tt=z.isDataArrayTexture||z.isData3DTexture;if(w.isDepthTexture){const Zt=Y.get(w),Yi=Y.get(z),Ot=Y.get(Zt.__renderTarget),Xi=Y.get(Yi.__renderTarget);b.bindFramebuffer(H.READ_FRAMEBUFFER,Ot.__webglFramebuffer),b.bindFramebuffer(H.DRAW_FRAMEBUFFER,Xi.__webglFramebuffer);for(let wr=0;wr<Le;wr++)yr&&(H.framebufferTextureLayer(H.READ_FRAMEBUFFER,H.COLOR_ATTACHMENT0,Y.get(w).__webglTexture,Z,ot+wr),H.framebufferTextureLayer(H.DRAW_FRAMEBUFFER,H.COLOR_ATTACHMENT0,Y.get(z).__webglTexture,Ee,Jt+wr)),H.blitFramebuffer(Fe,rt,Te,Se,De,_t,Te,Se,H.DEPTH_BUFFER_BIT,H.NEAREST);b.bindFramebuffer(H.READ_FRAMEBUFFER,null),b.bindFramebuffer(H.DRAW_FRAMEBUFFER,null)}else if(Z!==0||w.isRenderTargetTexture||Y.has(w)){const Zt=Y.get(w),Yi=Y.get(z);b.bindFramebuffer(H.READ_FRAMEBUFFER,O),b.bindFramebuffer(H.DRAW_FRAMEBUFFER,U);for(let Ot=0;Ot<Le;Ot++)yr?H.framebufferTextureLayer(H.READ_FRAMEBUFFER,H.COLOR_ATTACHMENT0,Zt.__webglTexture,Z,ot+Ot):H.framebufferTexture2D(H.READ_FRAMEBUFFER,H.COLOR_ATTACHMENT0,H.TEXTURE_2D,Zt.__webglTexture,Z),Tt?H.framebufferTextureLayer(H.DRAW_FRAMEBUFFER,H.COLOR_ATTACHMENT0,Yi.__webglTexture,Ee,Jt+Ot):H.framebufferTexture2D(H.DRAW_FRAMEBUFFER,H.COLOR_ATTACHMENT0,H.TEXTURE_2D,Yi.__webglTexture,Ee),Z!==0?H.blitFramebuffer(Fe,rt,Te,Se,De,_t,Te,Se,H.COLOR_BUFFER_BIT,H.NEAREST):Tt?H.copyTexSubImage3D(we,Ee,De,_t,Jt+Ot,Fe,rt,Te,Se):H.copyTexSubImage2D(we,Ee,De,_t,Fe,rt,Te,Se);b.bindFramebuffer(H.READ_FRAMEBUFFER,null),b.bindFramebuffer(H.DRAW_FRAMEBUFFER,null)}else Tt?w.isDataTexture||w.isData3DTexture?H.texSubImage3D(we,Ee,De,_t,Jt,Te,Se,Le,Dt,fn,It.data):z.isCompressedArrayTexture?H.compressedTexSubImage3D(we,Ee,De,_t,Jt,Te,Se,Le,Dt,It.data):H.texSubImage3D(we,Ee,De,_t,Jt,Te,Se,Le,Dt,fn,It):w.isDataTexture?H.texSubImage2D(H.TEXTURE_2D,Ee,De,_t,Te,Se,Dt,fn,It.data):w.isCompressedTexture?H.compressedTexSubImage2D(H.TEXTURE_2D,Ee,De,_t,It.width,It.height,Dt,It.data):H.texSubImage2D(H.TEXTURE_2D,Ee,De,_t,Te,Se,Dt,fn,It);b.pixelStorei(H.UNPACK_ROW_LENGTH,bn),b.pixelStorei(H.UNPACK_IMAGE_HEIGHT,dt),b.pixelStorei(H.UNPACK_SKIP_PIXELS,Fn),b.pixelStorei(H.UNPACK_SKIP_ROWS,ni),b.pixelStorei(H.UNPACK_SKIP_IMAGES,Vi),Ee===0&&z.generateMipmaps&&H.generateMipmap(we),b.unbindTexture()},this.initRenderTarget=function(w){Y.get(w).__webglFramebuffer===void 0&&$.setupRenderTarget(w)},this.initTexture=function(w){w.isCubeTexture?$.setTextureCube(w,0):w.isData3DTexture?$.setTexture3D(w,0):w.isDataArrayTexture||w.isCompressedArrayTexture?$.setTexture2DArray(w,0):$.setTexture2D(w,0),b.unbindTexture()},this.resetState=function(){W=0,F=0,Q=null,b.reset(),ye.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return pi}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=lt._getDrawingBufferColorSpace(e),t.unpackColorSpace=lt._getUnpackColorSpace()}}const Xt=(n,e=0)=>{const t=Math.sin(n*127.1+e*311.7)*43758.5453;return t-Math.floor(t)},wt=(n,e,t=0)=>Xt(Math.floor(n[0]*e)+Math.floor(n[2]*e)*57+t,Math.floor(n[1]*e)),Bt=(n=.2,e=.15)=>t=>{const i=wt(t,16,3);return wt(t,6,5)<e&&t[1]>.1?s.MOSS:i>1-n*.7?s.BODY2:void 0},Wt=(n,e,t,i,r,a=0,o=0)=>{for(let l=0;l<e;l++){const c=Xt(r,l)*6.283,h=t*Math.sqrt(Xt(l,r));n.ell([a+Math.cos(c)*h,.07,o+Math.sin(c)*h*.7],[.07,.1+Xt(l,4)*.08,.07],s.LEAF2,{group:i+l%3,paint:u=>u[1]>.13?s.LEAF:void 0})}},hs=(n,e,t,i=1)=>{for(let r=0;r<6;r++){const a=r/6*6.283+e[0],o=[Math.cos(a),0,Math.sin(a)];n.chain([[...e,.03*i],[...v.add(e,v.add(v.mul(o,.25*i),[0,.2*i,0])),.025*i],[...v.add(e,v.add(v.mul(o,.5*i),[0,.05*i,0])),.01*i]],r%2?s.LEAF:s.LEAF2,{group:t})}},Jn=(n,e,t,i,r)=>{const a=[];for(let o=0;o<=4;o++)a.push([...v.add(v.lerp(e,t,o/4),[(Xt(r,o)-.5)*.12,0,.02]),.03]);n.chain(a,s.LEAF,{group:i,paint:o=>wt(o,30)<.3?s.LEAF2:void 0})},Os=(n,e,t,i)=>n.ell(e,t,s.LEAF,{group:i,rough:.04,paint:r=>{const a=wt(r,10,2);return r[1]<e[1]-.15||a<.2?s.LEAF3:a>.8?s.LEAF2:void 0}}),et=(n,e,t,i,r=.025,a=s.FRAME)=>n.seg(e,t,r,r,a,{group:i,paint:Bt(.35,.05)}),jr=(n,e,t,i,r=s.MAGIC)=>n.ell(e,[t,t,t],r,{group:i,extra:!0});function hi(n,e,{yaw:t=0,pitch:i=0,roll:r=0,at:a=[0,0,0]}={}){const o=(f,d,p,g)=>{const x=Math.cos(d),m=Math.sin(d),M=[...f];return M[p]=f[p]*x-f[g]*m,M[g]=f[p]*m+f[g]*x,M},l=f=>o(o(o(f,r,1,2),i,0,1),-t,0,2),c=f=>o(o(o(f,t,0,2),-i,0,1),-r,1,2),h=f=>v.add(l(f),a),u=f=>c(v.sub(f,a));for(const f of n.parts.slice(e))if(f.type==="cone"?(f.a=h(f.a),f.b=h(f.b)):(f.c=h(f.c),f.axes=f.axes.map(l)),f.paint){const d=f.paint;f.paint=(p,g)=>d(u(p),g)}}function ws(n,e,{len:t=1.5,van:i=!1,glow:r=!1,flat:a=!1}={}){const o=i?.62:.3,l=i?.8:.5;n.box([0,l,0],[t,o,.66],s.BODY,{round:.14,group:e,paint:c=>{const h=Bt(.3,.12)(c);return h||(c[0]>t-.06&&Math.abs(c[1]-(l+o*.2))<.07&&Math.abs(Math.abs(c[2])-.45)<.1?r?s.MAGIC2:s.FRAME:i&&c[1]>l+.1&&Math.abs(c[2])>.6&&Math.abs(c[0]+.2)<.9&&(c[0]+3)*3%1>.15||c[1]<l-o+.1?s.SHADES:void 0)}}),i||n.box([-.2,l+o+.22,0],[t*.6,.24,.6],s.BODY,{round:.14,group:e,paint:c=>Math.abs(c[2])>.52||c[0]>t*.6-.25-.2?wt(c,9)<.25?s.STONED:s.SHADES:Bt(.3,.25)(c)});for(const c of[-t*.65,t*.65])for(const h of[-.66,.66])n.ell([c,.3,h],[.3,a?.22:.3,.1],s.BODY3,{group:e+1,paint:u=>Math.hypot(u[0]-c,u[1]-.3)<.12?s.FRAME:void 0});if(r)for(const c of[-.45,.45])jr(n,[t+.05,l+o*.2,c],.07,e+2,s.MAGIC2)}const qh=(n,e,t)=>ws(n,e,t),Q5={"car-nose-down":{desc:"a hatchback nose-down in the earth, ferns round it",build(n){const e=n.parts.length;ws(n,1),hi(n,e,{pitch:-.5,at:[0,.2,0]}),n.ell([1.3,.1,0],[.9,.35,1],s.BARK2,{group:4,rough:.04,paint:t=>t[1]>.25?s.MOSS:void 0}),hs(n,[.9,.2,.8],5),hs(n,[-.9,.05,.9],6,.8),n.ell([-.6,1.25,0],[.5,.06,.4],s.MOSS,{group:7})}},"van-tree":{desc:"a camper van with a tree grown up through its roof, its headlights glowing with fairy light",glow:!0,build(n){ws(n,1,{van:!0,len:1.6,flat:!0,glow:!0}),n.chain([[.2,0,0,.22],[.2,1.5,0,.2],[.3,2.6,-.1,.14],[.35,3.3,-.1,.08]],s.TRUNK,{group:4,rough:.015}),Os(n,[.3,3.4,-.1],[1.1,.7,.9],5),Jn(n,[-1.6,.1,.66],[-1,1.3,.7],6,1),Wt(n,14,2.2,7,2)}},"car-on-side":{desc:"a car on its side among ferns",build(n){const e=n.parts.length;ws(n,1),hi(n,e,{roll:Math.PI/2,at:[0,.2,.1]});for(const[t,i]of[[-1.2,.9],[.3,1.1],[1.4,.6],[-.4,-1]])hs(n,[t,.05,i],5+(t>0?1:0),1.1)}},"trolley-tipped":{desc:"a shopping trolley tipped over, a plant growing in its basket",build(n){const e=n.parts.length;bu(n,1),Os(n,[.05,.65,0],[.32,.28,.26],3),hi(n,e,{roll:1.35,at:[0,.32,0]}),Wt(n,8,.9,6,3)}},"trolley-nest":{desc:"a shopping trolley standing upright, a bird's nest in its basket",build(n){bu(n,1),n.ell([0,.78,0],[.2,.08,.17],s.STRAW,{group:3,paint:e=>Math.abs(Math.sin(e[0]*40+e[2]*30))<.3?s.BARK2:void 0});for(const e of[-.05,.05])n.ell([e,.84,.02],[.04,.03,.035],s.BELLY,{group:4});Wt(n,8,.9,6,4)}},cone:{desc:"a single traffic cone, faded",build(n){ga(n,[0,0,0],1)}},cones:{desc:"a little cluster of traffic cones, one fallen",build(n){ga(n,[0,0,0],1),ga(n,[.5,0,.2],4);const e=n.parts.length;ga(n,[0,0,0],7),hi(n,e,{roll:1.5,yaw:.6,at:[-.4,.2,.4]}),Wt(n,6,.8,10,5)}},"cone-lantern":{desc:"a traffic cone lit from within like a lantern, a ring of mushrooms round it",glow:!0,build(n){ga(n,[0,0,0],1,!0);for(let e=0;e<9;e++){const t=e/9*6.283,i=[Math.cos(t)*.55,0,Math.sin(t)*.45];n.seg(i,v.add(i,[0,.08,0]),.02,.02,s.CLOTH,{group:5}),n.ell(v.add(i,[0,.1,0]),[.06,.035,.06],s.BODY2,{group:6})}}},"highway-slab":{desc:"a slab of tarmac tilted up out of the ground, faded lane markings, a crash-barrier stub",build(n){const e=n.parts.length;n.box([0,0,0],[2.2,.14,1.3],s.STONE,{round:.03,group:1,rough:.01,paint:t=>wt(t,5,1)<.06||Math.abs(Math.sin(t[0]*3+t[2]*5)*.3+t[2]*.6-.2)<.02?s.STONED:t[1]>.1&&Math.abs(t[2])<.05&&(t[0]+9)*.8%1<.55?wt(t,12)<.3?s.STONE:s.CLOTH:t[1]>.1&&Math.abs(t[2]-1.1)<.04?s.BELLY:t[1]>.1&&wt(t,6,4)<.12?s.MOSS:void 0});for(const t of[-1.6,-.4])et(n,[t,.1,1.25],[t,.75,1.25],2,.04);n.box([-1,.62,1.3],[.9,.1,.03],s.FRAME,{group:3,paint:t=>Math.abs(t[1]-.62)<.02?s.STONED:Bt(.5,.1)(t)}),hi(n,e,{pitch:.38,roll:.08,at:[0,.7,0]}),n.ell([-1.8,.1,0],[.6,.2,1.3],s.BARK2,{group:5,rough:.04,paint:t=>t[1]>.2?s.MOSS:void 0}),Wt(n,16,2.4,6,6)}},"highway-line":{desc:"a section of cracked road, its white line broken, grass in the cracks",build(n){n.box([0,.02,0],[2,.03,1],s.STONE,{round:.02,group:1,paint:e=>wt(e,4,9)<.08||Math.abs(Math.sin(e[0]*2.3)*.4-e[2])<.025?wt(e,20)<.4?s.LEAF2:s.STONED:Math.abs(e[2]+.05)<.05&&(e[0]+9)*.7%1<.6?s.CLOTH:wt(e,6)<.08?s.MOSS:void 0});for(const[e,t]of[[-1.2,.3],[.4,-.2],[1.3,.5]])Wt(n,4,.2,3,e*10+7,e,t)}},"road-sign":{desc:"a fallen road sign, blank but for an abstract arrow",build(n){et(n,[-.9,.05,.2],[.6,.1,-.1],1,.03),n.box([.9,.12,-.15],[.62,.05,.46],s.HAT1,{group:2,dir:[1,.25,-.2],round:.02,paint:e=>{const t=e[0]-.9,i=e[2]+.15;return Math.abs(i)<.08&&t>-.36&&t<.2||t>.08&&Math.abs(i)<.28-(t-.08)*.9&&t<.38?s.BELLY:Math.hypot(Math.abs(t)-.56,Math.abs(i)-.4)<.04?s.FRAME:Bt(.2,.1)(e)}}),Wt(n,8,1.2,4,7)}},"phone-box":{desc:"an overgrown phone box, its panes long gone",build(n){n.box([0,1,0],[.42,1,.42],s.ACCENT,{round:.04,group:1,paint:e=>Math.max(Math.abs(e[0]),Math.abs(e[2]))>.38&&e[1]>.5&&e[1]<1.75&&e[1]*5%1>.12&&(Math.abs(e[0])+Math.abs(e[2]))*5%1>.12?s.SHADES:Bt(.3,.15)(e)}),n.box([0,2.08,0],[.46,.09,.46],s.ACCENT,{round:.06,group:2,paint:Bt(.3,.3)}),Jn(n,[.43,0,.3],[.4,1.9,.43],3,8),Jn(n,[-.3,0,.43],[-.1,1.4,.43],4,9),Wt(n,10,.9,5,8)}},lamppost:{desc:"a lamppost bent over, its lamp hanging near the ground",build(n){n.chain([[0,0,0,.06],[0,1.4,0,.05],[.2,2.1,0,.045],[.8,2.2,0,.04],[1.2,1.7,0,.035]],s.FRAME,{group:1,paint:Bt(.4,.05)}),n.box([1.25,1.55,0],[.16,.1,.12],s.FRAME,{round:.04,group:2}),n.ell([1.25,1.45,0],[.12,.06,.1],s.SHADES,{group:2}),Jn(n,[0,0,.06],[.05,1.5,.06],3,10),Wt(n,6,.7,4,9)}},sofa:{desc:"a sofa left in a clearing, moss on its cushions",build(n){const e=t=>wt(t,6,5)<.25&&t[1]>.4?s.MOSS:wt(t,14)>.9?s.STONED:void 0;n.box([0,.3,0],[.9,.2,.4],s.CLOTH,{round:.1,group:1,paint:e}),n.box([-.02,.7,-.32],[.9,.3,.12],s.CLOTH,{round:.1,group:2,paint:e});for(const t of[-.85,.85])n.box([t,.55,0],[.12,.22,.42],s.CLOTH,{round:.1,group:3,paint:e});for(const t of[-.4,.4])n.box([t,.53,.05],[.42,.08,.34],s.CLOTH,{round:.08,group:4,paint:e});Wt(n,14,1.6,5,10)}},"washing-machine":{desc:"a washing machine in the undergrowth, a fern in its drum",build(n){n.box([0,.42,0],[.32,.42,.32],s.BELLY,{round:.05,group:1,paint:e=>e[2]>.28&&Math.hypot(e[0],e[1]-.4)<.2?Math.hypot(e[0],e[1]-.4)<.15?s.SHADES:s.FRAME:Bt(.25,.15)(e)}),hs(n,[0,.4,.4],2,.55),Wt(n,8,.8,3,11)}},"bike-roots":{desc:"a bicycle tangled in tree roots",build(n){for(const e of[-.45,.45])for(let t=0;t<12;t++){const i=t/12*6.283,r=(t+1)/12*6.283;et(n,[e+Math.cos(i)*.3,.32+Math.sin(i)*.3,0],[e+Math.cos(r)*.3,.32+Math.sin(r)*.3,0],1+(e>0?1:0),.018)}for(const[e,t]of[[[-.45,.32,0],[0,.35,0]],[[0,.35,0],[.3,.7,0]],[[-.45,.32,0],[-.15,.72,0]],[[-.15,.72,0],[.3,.7,0]],[[.3,.7,0],[.45,.32,0]],[[0,.35,0],[-.15,.72,0]],[[.3,.7,0],[.35,.85,0]]])et(n,e,t,3,.022);n.box([-.17,.76,0],[.1,.03,.04],s.SHADES,{group:4}),et(n,[.25,.85,-.15],[.42,.87,.15],4,.018);for(let e=0;e<4;e++)n.chain([[-1+e*.2,0,-.4,.09],[-.3+e*.3,.35+e%2*.2,-.05+e*.05,.07],[.4+e*.2,.1,.3,.05]],s.TRUNK,{group:5+e%2,rough:.01})}},"dish-birdbath":{desc:"a satellite dish fallen face-up, full of rainwater, a bird drinking",build(n){n.ell([0,.2,0],[.6,.22,.6],s.BELLY,{group:1,paint:Bt(.25,.2)}),n.ell([0,.34,0],[.52,.12,.52],s.BELLY,{group:1,cut:!0}),n.ell([0,.28,0],[.48,.02,.48],s.WATER,{group:2}),et(n,[0,.25,-.5],[.1,.8,-.6],3,.03);const e=[.5,.45,.3];n.ell(e,[.12,.07,.06],s.BODY3,{group:4,dir:[1,.3,0]}),n.ell(v.add(e,[.1,.07,0]),[.05,.05,.045],s.BODY3,{group:4}),n.seg(v.add(e,[.14,.07,0]),v.add(e,[.2,.04,0]),.012,.004,s.ACCENT,{group:4}),Wt(n,8,1,5,12)}},"fridge-fireflies":{desc:"a fridge standing in the woods, its door ajar, fireflies inside",glow:!0,build(n){n.box([0,.85,0],[.36,.85,.32],s.BELLY,{round:.05,group:1,paint:e=>e[2]>.28&&Math.abs(e[0])<.3&&e[1]<1.55&&e[1]>.1?s.SHADES:Bt(.25,.2)(e)}),n.box([.5,.85,.4],[.03,.78,.3],s.BELLY,{dir:[.5,0,1],round:.03,group:2,paint:Bt(.25,.15)});for(let e=0;e<7;e++)jr(n,[(Xt(e)-.5)*.4,.4+Xt(e,2)*1,.2+Xt(e,3)*.3],.03,10+e,e%2?s.MAGIC:s.MAGIC2);Jn(n,[-.36,0,.3],[-.3,1.6,.33],3,13)}}};function bu(n,e){const t=[[-.35,.45,-.25],[.35,.45,-.25],[.35,.45,.25],[-.35,.45,.25],[-.3,.9,-.28],[.4,.9,-.28],[.4,.9,.28],[-.3,.9,.28]];for(const[i,r]of[[0,1],[1,2],[2,3],[3,0],[4,5],[5,6],[6,7],[7,4],[0,4],[1,5],[2,6],[3,7]])et(n,t[i],t[r],e,.015);for(let i=1;i<6;i++){const r=i/6;et(n,v.lerp(t[0],t[1],r),v.lerp(t[4],t[5],r),e,.008),et(n,v.lerp(t[3],t[2],r),v.lerp(t[7],t[6],r),e,.008)}et(n,t[4],[-.45,.95,-.28],e,.015),et(n,t[7],[-.45,.95,.28],e,.015),et(n,[-.45,.95,-.28],[-.45,.95,.28],e,.025,s.ACCENT);for(const[i,r]of[[-.3,-.22],[.3,-.22],[-.3,.22],[.3,.22]])et(n,[i,.45,r],[i,.08,r],e,.012),n.ell([i,.06,r],[.05,.05,.02],s.BODY3,{group:e+1})}function ga(n,e,t,i=!1){n.box(v.add(e,[0,.03,0]),[.24,.03,.24],s.ACCENT,{round:.02,group:t,paint:Bt(.15,.2)}),n.seg(v.add(e,[0,.05,0]),v.add(e,[0,.72,0]),.2,.03,s.ACCENT,{group:t+1,paint:r=>Math.abs(r[1]-e[1]-.42)<.07?i?s.MAGIC2:s.CLOTH:i&&wt(r,18)<.2?s.GLOW:Bt(.15,.1)(r)}),i&&jr(n,v.add(e,[0,.78,0]),.05,t+2,s.MAGIC2)}const j5={swings:{desc:"a rusty swing set, one swing hanging, one chain broken; the hanging one sways on its own with a faint sparkle",glow:!0,split:1.6,build(n){for(const e of[-1.1,1.1])for(const t of[-.5,.5])et(n,[e,0,t],[e*.95,2.1,0],1,.045);et(n,[-1.1,2.1,0],[1.1,2.1,0],2,.05);for(const e of[-.12,.12])et(n,[-.5,2.08,e],[-.42,.55,e*1.2],3,.012);n.box([-.42,.52,0],[.2,.025,.14],s.BODY3,{round:.02,group:3,dir:[1,-.15,0]});for(let e=0;e<5;e++)jr(n,[-.42+(Xt(e)-.5)*.5,.6+Xt(e,2)*.7,(Xt(e,3)-.5)*.3],.025,10+e);et(n,[.5,2.08,-.12],[.5,1.3,-.12],4,.012),et(n,[.5,2.08,.12],[.58,.9,.2],4,.012),n.box([.7,.04,.3],[.2,.025,.14],s.BODY3,{round:.02,group:5,dir:[1,0,.5]}),Jn(n,[1.1,0,.5],[1.05,1.6,.25],6,14),Wt(n,14,1.8,7,15)}},slide:{desc:"a slide half-swallowed by brambles, a sapling at its foot",split:1.6,build(n){for(const e of[-.95,-.55])for(const t of[-.3,.3])et(n,[e,0,t],[e,1.5,t],1,.035);for(let e=1;e<6;e++)et(n,[-.95,e*.27,-.3],[-.95,e*.27,.3],1,.02);n.box([-.75,1.5,0],[.25,.04,.32],s.FRAME,{group:2,paint:Bt(.4,.1)}),n.box([.35,.78,0],[.95,.03,.26],s.HAT1,{dir:[1,-.75,0],round:.02,group:3,paint:e=>Math.abs(e[2])>.22?s.FRAME:Bt(.35,.15)(e)});for(let e=0;e<10;e++){const t=Xt(e,3)*6.283;n.chain([[.4+Math.cos(t)*.9,0,Math.sin(t)*.6,.03],[.3+Math.cos(t)*.4,.5+Xt(e)*.5,Math.sin(t)*.3,.025],[.1+Xt(e,4)*.6,.7+Xt(e,5)*.4,(Xt(e,6)-.5)*.4,.015]],s.BARKD,{group:5+e%2}),e%3===0&&n.ell([.3+Xt(e,7)*.6,.5+Xt(e,8)*.4,(Xt(e,9)-.5)*.5],[.2,.14,.16],s.LEAF,{group:7,rough:.03,paint:i=>wt(i,30)<.1?s.ACCENT:void 0})}n.seg([1.45,0,.2],[1.45,1.2,.2],.03,.02,s.TRUNK,{group:8}),Os(n,[1.45,1.3,.2],[.25,.2,.22],9)}},roundabout:{desc:"a roundabout tilted in the moss",build(n){const e=n.parts.length;n.ell([0,.2,0],[.9,.05,.9],s.HAT2,{group:1,paint:t=>Math.abs(Math.sin(Math.atan2(t[2],t[0])*3))<.08?s.FRAME:Bt(.35,.2)(t)});for(let t=0;t<3;t++){const i=t/3*6.283;et(n,[Math.cos(i)*.7,.25,Math.sin(i)*.7],[Math.cos(i)*.7,.6,Math.sin(i)*.7],2,.025),et(n,[Math.cos(i)*.7,.6,Math.sin(i)*.7],[Math.cos(i)*.1,.6,Math.sin(i)*.1],2,.02)}hi(n,e,{pitch:.18,roll:.1,at:[0,.05,0]}),n.ell([0,.05,0],[1.1,.08,1],s.MOSS,{group:4}),Wt(n,10,1.3,5,16)}},seesaw:{desc:"a seesaw stuck at an angle",build(n){n.box([0,.2,0],[.08,.2,.14],s.FRAME,{round:.02,group:1,paint:Bt(.4,.1)});const e=n.parts.length;n.box([0,0,0],[1.3,.035,.12],s.WOOD,{round:.02,group:2,paint:t=>wt(t,8)<.2?s.MOSS:void 0});for(const t of[-1.05,1.05])et(n,[t,.03,-.12],[t,.03,.12],3,.02);hi(n,e,{pitch:.32,at:[0,.42,0]}),Wt(n,10,1.4,5,17)}},"climbing-frame":{desc:"a climbing frame, a dome of bars wound with ivy",split:1.4,build(n){const t=(i,r)=>{const a=i/8*6.283,o=r/4*Math.PI/2;return[Math.cos(a)*Math.cos(o)*1,Math.sin(o)*1*1.5,Math.sin(a)*Math.cos(o)*1]};for(let i=0;i<8;i++)for(let r=0;r<4;r++)et(n,t(i,r),t(i,r+1),1,.025),et(n,t(i,r),t(i+1,r),1,.025);for(let i=0;i<3;i++)Jn(n,t(i*3,0),t(i*3+1,3),3+i,18+i);Wt(n,12,1.4,6,18)}},"spring-rider":{desc:"a spring rider animal, its paint faded (a generic animal, no characters)",build(n){for(let e=0;e<6;e++)n.seg([Math.cos(e*2)*.06,e*.07,Math.sin(e*2)*.06],[Math.cos(e*2+2)*.06,(e+1)*.07,Math.sin(e*2+2)*.06],.022,.022,s.FRAME,{group:1});n.ell([0,.55,0],[.35,.16,.14],s.BODY,{group:2,paint:Bt(.4,.2)}),n.ell([.32,.72,0],[.12,.11,.1],s.BODY,{group:2,paint:Bt(.4,.2)});for(const e of[-.05,.05])n.ell([.28,.85,e],[.03,.06,.02],s.BODY,{group:3});n.ell([.43,.74,.06],[.015,.015,.015],s.SHADES,{group:3}),et(n,[.25,.68,-.12],[.25,.68,.12],4,.015),n.box([0,.02,0],[.25,.02,.25],s.STONE,{group:5}),Wt(n,8,.8,6,19)}}};function ex(n,e,t,i,r,a=1){n.box([0,.015,0],[e,.015,t],i,{round:.01,group:a,paint:o=>wt(o,3,4)<.05||Math.abs(Math.sin(o[0]*1.3+1)*.5+Math.sin(o[0]*4.1)*.08-o[2]*.3)<.012?wt(o,18)<.5?s.LEAF2:s.STONED:r(o[0],o[2])?wt(o,10,2)<.25?i:s.CLOTH:wt(o,5,7)<.07?s.MOSS:void 0})}const qn=(n,e,t=.045)=>Math.abs(n-e)<t,tx={"tennis-court":{desc:"a cracked tennis court, faded lines, grass through the cracks",decal:!0,build(n){ex(n,4.4+.5,2+.5,s.HAT2,(i,r)=>Math.abs(i)<=4.4+.05&&Math.abs(r)<=2+.05&&(qn(Math.abs(i),4.4)||qn(Math.abs(r),2)||qn(Math.abs(r),2*.75)||Math.abs(i)<4.4*.54&&(qn(r,0)||qn(Math.abs(i),4.4*.54))))}},"tennis-net":{desc:"a sagging tennis net between its posts",build(n){for(const e of[-2.2,2.2])et(n,[0,0,e],[0,.55,e],1,.035);n.box([0,.38,0],[.01,.17,2.15],s.CLOTH,{group:2,paint:e=>e[1]>.5?s.CLOTH:e[1]*25%1<.25||(e[2]+5)*25%1<.25?s.SHADES:void 0}),n.box([0,.25,0],[.012,.15,1],s.SHADES,{group:2,cut:!0})}},"umpire-chair":{desc:"a tennis umpire's chair leaning over",split:1.4,build(n){const e=n.parts.length;for(const t of[-.25,.25])for(const i of[-.2,.2])et(n,[t*1.4,0,i*1.4],[t,1.5,i],1,.03);for(let t=1;t<5;t++)et(n,[-.3,t*.3,-.22],[-.3,t*.3,.22],1,.02);n.box([0,1.55,0],[.28,.04,.25],s.WOOD,{group:2}),n.box([-.26,1.8,0],[.03,.25,.25],s.WOOD,{group:2}),hi(n,e,{roll:.25,pitch:-.1}),Wt(n,8,1,4,20)}},"court-fence":{desc:"a chain-link fence section, ivy through it, a gap torn in it",build(n){for(const e of[-1.5,0,1.5])et(n,[e,0,0],[e,1.7,0],1,.03);et(n,[-1.5,1.7,0],[1.5,1.7,0],1,.025),n.box([0,.85,0],[1.5,.85,.008],s.FRAME,{group:2,paint:e=>(e[0]+e[1]+9)*9%1<.2||(e[0]-e[1]+9)*9%1<.2?wt(e,5)<.15?s.BODY2:s.FRAME:s.SHADES}),n.ell([.7,.5,0],[.4,.5,.05],s.SHADES,{group:2,cut:!0,rough:.08});for(let e=0;e<3;e++)Jn(n,[-1.3+e*.6,0,.03],[-1.1+e*.5,1.5,.03],3+e,21+e)}},"tennis-balls":{desc:"a few old tennis balls glowing faintly in the grass",glow:!0,build(n){for(let e=0;e<4;e++)jr(n,[(Xt(e)-.5)*1.2,.06,(Xt(e,2)-.5)*.8],.06,1+e,e%2?s.MAGIC:s.MAGIC2);n.ell([0,.004,0],[.8,.004,.5],s.LEAF3,{group:9}),Wt(n,8,.8,5,22)}},"baseball-diamond":{desc:"a baseball diamond: the worn dirt infield, grown-over bases, a pitcher's mound",decal:!0,build(n){n.box([0,.015,0],[2.2*1.6,.015,2.2*1.2],s.LEAF2,{group:1,round:.01,paint:t=>{const i=Math.abs(t[0])/2.2+Math.abs(t[2])/1.6500000000000001;return i<1.08&&i>.78?wt(t,8)<.2?s.LEAF2:s.BARK2:i<=.78?wt(t,6)<.15?s.MOSS:void 0:wt(t,6,3)<.3?s.LEAF:void 0}});for(const[t,i]of[[2.2,0],[0,2.2*.75],[-2.2,0],[0,-2.2*.75]])n.box([t*.93,.04,i*.93],[.12,.02,.1],s.BELLY,{group:2,round:.02,paint:r=>wt(r,20)<.3?s.LEAF2:void 0});n.ell([0,.02,0],[.35,.08,.28],s.BARK2,{group:3})}},backstop:{desc:"a baseball backstop fence, a dugout bench beside it",build(n){for(let e=0;e<=4;e++){const t=-.8+e*.4;et(n,[-Math.cos(t)*.8,0,Math.sin(t)*1.4],[-Math.cos(t)*.8,1.8,Math.sin(t)*1.4],1,.03)}for(let e=0;e<4;e++){const t=-.8+e*.4,i=t+.4,r=[-Math.cos(t)*.8,.9,Math.sin(t)*1.4],a=[-Math.cos(i)*.8,.9,Math.sin(i)*1.4],o=v.lerp(r,a,.5);n.box(o,[Math.hypot(a[0]-r[0],a[2]-r[2])/2,.9,.008],s.FRAME,{dir:v.sub(a,r),group:2,paint:l=>(l[1]+l[0]*2+9)*9%1<.2?wt(l,5)<.2?s.BODY2:s.FRAME:s.SHADES})}n.box([-.6,.3,2],[.15,.04,.7],s.WOOD,{group:3});for(const e of[1.4,2.6])n.box([-.6,.14,e],[.12,.14,.04],s.WOOD,{group:3});Jn(n,[-.75,0,-.5],[-.7,1.6,-.4],4,25)}},scoreboard:{desc:"a scoreboard frame, panels missing (no text)",split:1.8,build(n){for(const e of[-1,1])et(n,[e,0,0],[e,2.6,0],1,.05);for(let e=0;e<3;e++)for(let t=0;t<5;t++)Xt(e,t)>.3&&n.box([-.8+t*.4,1.6+e*.32,0],[.18,.14,.03],s.HAT1,{group:2+e,round:.01,paint:Bt(.3,.1)});n.box([0,2.62,0],[1.1,.05,.06],s.FRAME,{group:5}),Jn(n,[-1,0,.06],[-.95,2.3,.06],6,26)}},"football-pitch":{desc:"a football pitch: faded lines, a centre circle, mown stripes long grown out",decal:!0,build(n){n.box([0,.015,0],[5.2+.5,.015,3.3+.5],s.LEAF2,{group:1,round:.01,paint:i=>{const r=i[0],a=i[2];return Math.abs(r)<=5.2+.05&&Math.abs(a)<=3.3+.05&&(qn(Math.abs(r),5.2,.06)||qn(Math.abs(a),3.3,.06)||qn(r,0,.06)||qn(Math.hypot(r,a*1),1,.06)||Math.abs(r)>5.2-1&&Math.abs(a)<1.6&&(qn(Math.abs(r),5.2-1,.06)||qn(Math.abs(a),1.6,.06)))?wt(i,8,2)<.3?s.LEAF2:s.CLOTH:Math.floor((r+20)*.8)%2?wt(i,6)<.25?s.LEAF2:s.LEAF:wt(i,5,9)<.1?s.LEAF3:void 0}})}},goal:{desc:"a football goal, its net torn, a sapling grown through it",split:1.1,build(n){Su(n,1),n.seg([.3,0,.2],[.3,1.5,.2],.035,.025,s.TRUNK,{group:5}),Os(n,[.3,1.6,.2],[.35,.25,.3],6),Wt(n,8,1.2,7,27)}},"goal-tipped":{desc:"a football goal tipped on its back",build(n){const e=n.parts.length;Su(n,1),hi(n,e,{pitch:-Math.PI/2+.12,at:[-.5,.06,0]}),Wt(n,8,1.2,7,28)}},"corner-flag":{desc:"a corner flag, its flag a faded rag",build(n){et(n,[0,0,0],[0,.9,0],1,.015),n.box([.12,.8,0],[.12,.08,.006],s.ACCENT,{group:2,dir:[1,-.3,.1],paint:Bt(.2,0)}),Wt(n,5,.4,3,29)}},floodlight:{desc:"a floodlight pylon, one lamp still flickering with fairy light",glow:!0,split:2.4,build(n){for(const[t,i]of[[-.25,-.25],[.25,-.25],[.25,.25],[-.25,.25]])et(n,[t*1.6,0,i*1.6],[t*.5,4,i*.5],1,.035);for(let t=1;t<8;t++){const i=t*4/8,r=1.6-1.1*i/4;et(n,[-.25*r,i,-.25*r],[.25*r,i+4/8,.25*r],2,.015),et(n,[.25*r,i,-.25*r],[-.25*r,i+4/8,.25*r],2,.015)}for(let t=0;t<2;t++)for(let i=0;i<3;i++)n.box([-.3+i*.3,4+.2+t*.25,.1],[.12,.1,.06],s.FRAME,{group:3,round:.02,paint:r=>r[2]>.14?t===1&&i===1?s.MAGIC2:s.SHADES:Bt(.4,.1)(r)});jr(n,[0,4+.45,.22],.06,4,s.MAGIC2),Jn(n,[-.4,0,.4],[-.2,2.4,.2],5,30)}},"basketball-hoop":{desc:"a basketball hoop on a leaning post, its net gone",split:1.8,build(n){const e=n.parts.length;et(n,[0,0,0],[0,2.4,0],1,.05),n.box([.15,2.5,0],[.03,.3,.45],s.BELLY,{group:2,paint:t=>Math.abs(t[1]-2.4)<.1&&Math.abs(t[2])<.14&&Math.abs(Math.abs(t[2])-.12)<.02?s.ACCENT:Bt(.25,.1)(t)});for(let t=0;t<8;t++){const i=t/8*6.283,r=(t+1)/8*6.283;et(n,[.36+Math.cos(i)*.17,2.32,Math.sin(i)*.17],[.36+Math.cos(r)*.17,2.32,Math.sin(r)*.17],3,.012,s.ACCENT)}hi(n,e,{pitch:-.2}),Wt(n,8,1,5,31)}}};function Su(n,e){for(const t of[-1.4,1.4])et(n,[0,0,t],[0,1,t],e,.035,s.BELLY);et(n,[0,1,-1.4],[0,1,1.4],e,.035,s.BELLY);for(const t of[-1.4,1.4])et(n,[0,1,t],[-.6,0,t],e+1,.02,s.BELLY);n.box([-.3,.5,0],[.012,.55,1.38],s.CLOTH,{dir:[.6,1,0],group:e+2,paint:t=>t[1]*12%1<.3||(t[2]+5)*12%1<.3?s.CLOTH:s.SHADES}),n.ell([-.3,.4,.5],[.2,.3,.4],s.CLOTH,{group:e+2,cut:!0})}const nx=[...Object.entries(Q5).map(([n,e])=>({id:n,family:"modern",size:1,split:null,...e})),...Object.entries(j5).map(([n,e])=>({id:n,family:"playground",size:1.1,split:null,...e})),...Object.entries(tx).map(([n,e])=>({id:n,family:"sports",size:1.1,split:null,...e}))];Object.fromEntries(nx.map(n=>[n.id,n]));const Gt=(n,e=0)=>{const t=Math.sin(n*127.1+e*311.7)*43758.5453;return t-Math.floor(t)},jn=(n,e,t=0)=>Gt(Math.floor(n[0]*e)+Math.floor(n[2]*e)*57+t,Math.floor(n[1]*e)),Rl=n=>{const e=jn(n,12);return e<.14?s.BARKD:e>.88?s.BARKL:void 0},ix=n=>e=>{const t=jn(e,10,3);return e[1]<n[1]-.2||t<.2?s.LEAF3:t>.8?s.LEAF2:void 0},mn=(n,e=0)=>t=>{const i=jn(t,9,7);return t[1]>.05&&i<(n?.34:.12)&&jn(t,3,1)<(n?.75:.45)?s.MOSS:e&&(t[1]*e%1<.1||((t[0]+t[2])*e*.7+Math.floor(t[1]*e)*.5)%1<.07)||i>.93?s.STONED:void 0},gt=(n,e,t,i,r,a={})=>n.box(e,t,s.STONE,{round:.03,rough:.012,group:i,paint:mn(r,a.courses??5),...a}),Tn=(n,e,t,i,r)=>{const a=[];for(let o=0;o<=4;o++){const l=o/4;a.push([...v.add(v.lerp(e,t,l),[(Gt(r,o)-.5)*.15,0,.02]),.03])}n.chain(a,s.LEAF,{group:i,rough:.02,paint:o=>jn(o,30)<.3?s.LEAF2:void 0})},Ci=(n,e,t,i,r)=>{for(let a=0;a<e;a++){const o=Gt(r,a)*6.283,l=t*Math.sqrt(Gt(a,r)),c=Math.cos(o)*l,h=Math.sin(o)*l*.7;n.ell([c,.08,h],[.07,.1+Gt(a,4)*.08,.07],s.LEAF2,{group:i+a%3,paint:u=>u[1]>.14?s.LEAF:void 0})}},oi=(n,e,t,i)=>n.ell(e,t,s.LEAF,{group:i,rough:.04,paint:ix(e)}),Pn=(n,e,t)=>n.chain(e,s.TRUNK,{group:t,rough:.012,paint:Rl}),Rn=(n,e,t,i,r={})=>n.ell(e,t,s.STONE,{group:i,rough:.03,dir:r.dir,paint:a=>a[1]>e[1]+t[1]*(r.moss??.62)&&jn(a,5,i)<.7?s.MOSS:jn(a,14)>.9?s.STONED:void 0}),Eu=(n,e,t,i,r=s.MAGIC)=>n.ell(e,[t,t,t],r,{group:i,extra:!0}),rx={"broken-arch":{desc:"a broken arch, one side fallen, a rune on its keystone",glow:!0,split:null,build(n,e){for(const t of[-1,1])gt(n,[t,t<0?1:.7,0],[.22,t<0?1:.7,.25],1+(t>0?1:0),e);for(let t=0;t<=6;t++){const i=Math.PI*(1-t/9),r=[Math.cos(i)*1,2+Math.sin(i)*.7,0];gt(n,r,[.17,.14,.25],3+t%2,e,{dir:[-Math.sin(i),Math.cos(i),0],courses:0,paint:t===4?(a=>Math.abs(a[0]-r[0])<.05&&Math.abs(a[1]-r[1])<.08?s.RUNE:mn(e)(a)):mn(e)})}for(let t=0;t<4;t++)gt(n,[1.3+t*.3,.14,.4+Gt(t)*.5],[.17,.13,.22],6+t,e,{dir:[1,.3*(Gt(t,2)-.5),Gt(t,3)-.5],courses:0});e&&(Tn(n,[-1.15,.1,.26],[-.9,1.9,.26],12,1),Ci(n,14,1.8,14,2))}},"tower-stump":{desc:"a fallen tower's stump, a spiral stair climbing round its inside",split:2,build(n,e){for(let t=0;t<14;t++){const i=t/14*Math.PI*2,r=1+(Math.sin(i*2+1)*.5+.5)*1.6*(i>3.6&&i<5.4?1:.55);i>.9&&i<2||gt(n,[Math.cos(i)*1.05,r/2,Math.sin(i)*.95],[.25,r/2,.14],1+t%3,e,{dir:[-Math.sin(i),0,Math.cos(i)]})}for(let t=0;t<9;t++){const i=3.2+t*.42,r=.15+t*.26;gt(n,[Math.cos(i)*.7,r,Math.sin(i)*.6],[.24,.06,.12],5,e,{dir:[Math.cos(i),0,Math.sin(i)],courses:0})}for(let t=0;t<3;t++)gt(n,[.6+t*.35,.14,1.1],[.22,.13,.2],7,e,{dir:[1,0,.4*t],courses:0});e&&(Tn(n,[-1.05,.1,-.4],[-1,2.3,-.5],10,3),Tn(n,[.9,.1,-.6],[.95,1.7,-.55],11,4),n.ell([0,.2,0],[.55,.2,.5],s.LEAF,{group:12,rough:.04}))}},colonnade:{desc:"a colonnade, two columns standing and the rest toppled",split:null,build(n,e){gt(n,[0,.08,0],[2.2,.08,.55],1,e,{courses:0});for(const[t,i]of[[-1.7,1.9],[-.6,1.4]])n.seg([t,.16,0],[t,i,0],.18,.17,s.STONE,{group:2,rough:.01,paint:r=>Math.abs(Math.sin(Math.atan2(r[2],r[0]-t)*8))<.15?s.STONED:mn(e,0)(r)}),gt(n,[t,i+.07,0],[.26,.07,.26],3,e,{courses:0});for(const[t,i,r]of[[.6,.55,.3],[1.6,.4,-.4]])n.seg([t-Math.cos(r)*.7,.2,i-Math.sin(r)*.7],[t+Math.cos(r)*.7,.2,i+Math.sin(r)*.7],.18,.18,s.STONE,{group:4,paint:mn(e,0)});gt(n,[-1.15,2,0],[.75,.1,.28],5,e,{courses:0}),e&&(Tn(n,[-1.7,.2,.18],[-1.65,1.8,.18],8,5),Ci(n,16,2.2,10,6))}},"stone-ring":{desc:"a ring of standing-stone stubs",split:null,build(n,e){for(let t=0;t<9;t++){const i=t/9*Math.PI*2,r=.3+Gt(t,9)*(t%3===0?1.2:.45);gt(n,[Math.cos(i)*1.7,r/2,Math.sin(i)*1.35],[.2,r/2,.14],1+t%4,e,{dir:[-Math.sin(i),.1*(Gt(t)-.5),Math.cos(i)],courses:0,round:.07})}gt(n,[0,.1,0],[.55,.1,.35],6,e,{courses:0,round:.05}),e&&Ci(n,20,2,10,7)}},"chapel-wall":{desc:"a ruined chapel wall with an empty pointed window, moonlight caught in it",glow:!0,split:2.4,build(n,e){gt(n,[0,1.4,0],[1.4,1.4,.18],1,e,{paint:t=>{const i=t[0],r=t[1];return Math.abs(i)<.38&&r>1.1&&r<2.3-Math.abs(i)*.5?void 0:mn(e,5)(t)}}),n.box([0,1.6,0],[.33,.55,.3],s.NOSE,{group:1,cut:!0}),n.ell([0,1.5,-.05],[.3,.5,.02],s.MAGIC2,{group:2,extra:!0,paint:t=>jn(t,18)<.5?s.MAGIC:void 0});for(const[t,i]of[[-1.55,2.6],[1.5,1.6]])gt(n,[t,i/2,0],[.22,i/2,.26],3,e);for(let t=0;t<5;t++)gt(n,[-1.2+t*.6,.12,.55+Gt(t)*.3],[.18,.12,.16],4,e,{courses:0,dir:[1,0,Gt(t,5)-.5]});e&&(Tn(n,[-1.2,.1,.2],[-.6,2.6,.2],6,8),Tn(n,[1,.1,.2],[1.2,2,.2],7,9))}},well:{desc:"an old well with a broken winch, fireflies over the water",glow:!0,split:null,build(n,e){for(let t=0;t<12;t++){const i=t/12*Math.PI*2;gt(n,[Math.cos(i)*.55,.32,Math.sin(i)*.5],[.15,.32,.1],1+t%2,e,{dir:[-Math.sin(i),0,Math.cos(i)],courses:3})}n.ell([0,.55,0],[.42,.02,.38],s.WATER,{group:3});for(const t of[-.6,.6])n.box([t,1,0],[.06,.5,.06],s.WOOD,{group:4,round:.02});n.seg([-.6,1.4,0],[.1,1.25,.05],.04,.04,s.WOOD,{group:5}),n.seg([.1,1.25,.05],[0,.85,.1],.01,.01,s.STRAW,{group:5});for(let t=0;t<4;t++)Eu(n,[(Gt(t)-.5)*.8,.8+Gt(t,2)*.7,(Gt(t,3)-.5)*.6],.03,10+t,t%2?s.MAGIC:s.MAGIC2);e&&(Tn(n,[-.55,.05,.5],[-.4,.62,.5],15,10),Ci(n,10,1,16,11))}},watchtower:{desc:"a crumbled watchtower, tall enough to see from the treetops",split:2.6,build(n,e){gt(n,[0,1.2,0],[.7,1.2,.7],1,e,{paint:t=>Math.abs(t[1]-1.9)<.16&&Math.abs(t[0])<.07&&t[2]>.6?s.NOSE:mn(e,5)(t)});for(const[t,i,r]of[[-.5,-.5,1.3],[0,-.5,1],[.5,-.5,.7],[-.5,0,.9],[-.5,.5,.5],[.5,0,.3]])gt(n,[t,2.4+r/2,i],[.2,r/2,.2],1,e);n.box([0,.55,.7],[.25,.45,.1],s.NOSE,{group:1,cut:!0});for(let t=0;t<6;t++)gt(n,[.5+Gt(t)*1.2,.13,-.3+Gt(t,4)*1.2],[.17,.12,.15],2+t%2,e,{courses:0,dir:[1,0,Gt(t,5)-.5]});e&&(Tn(n,[-.7,.1,.3],[-.7,2.4,.2],4,12),Tn(n,[.3,.1,.72],[.5,1.8,.72],5,13),oi(n,[.1,2.6,-.2],[.45,.3,.4],6))}},"sunken-stair":{desc:"a stairway going down into the ground, a dark doorway at its foot",split:null,build(n,e){for(const t of[-.6,.6])gt(n,[0,.2,t],[1.1,.2,.12],1,e,{courses:2});for(let t=0;t<5;t++)gt(n,[.8-t*.32,.3-t*.07,0],[.16,.04,.5],2,e,{courses:0});n.box([-.55,.08,0],[.28,.1,.48],s.NOSE,{group:3}),gt(n,[-1.1,.55,0],[.15,.55,.62],4,e),gt(n,[-1.05,1.15,0],[.2,.1,.7],5,e,{courses:0}),e&&(Ci(n,12,1.6,10,14),Tn(n,[-1,1.2,.5],[-.9,.3,.62],13,15))}},"statue-head":{desc:"a toppled giant statue head, its eyes still faintly lit",glow:!0,split:null,build(n,e){const t=[0,.8,0],i=.62,r=(a,o)=>[t[0]+o,t[1]+a,t[2]+i];n.ell(t,[.8,1,.7],s.STONE,{group:1,rough:.012,dir:[1,.25,0],paint:mn(e,0)}),n.ell(r(.3,0),[.62,.14,.16],s.STONE,{group:2,paint:mn(e,0)});for(const a of[-.26,.26])n.ell(r(.12,a),[.15,.09,.1],s.STONED,{group:1,cut:!0}),Eu(n,r(.12,a),.05,3+(a>0?1:0),s.MAGIC);n.ell(r(-.08,0),[.11,.24,.14],s.STONE,{group:5,paint:mn(e,0)}),n.ell(r(-.42,0),[.3,.07,.08],s.STONE,{group:6,paint:a=>Math.abs(a[1]-(t[1]-.42))<.015?s.STONED:mn(e,0)(a)});for(const[a,o]of[[-.55,.75],[0,.95],[.5,.8],[-.7,.3],[.75,.3]])n.ell([t[0]+a,t[1]+o,t[2]-.2],[.3,.25,.45],s.STONE,{group:7,rough:.02,paint:mn(e,0)});n.ell([t[0],.05,t[2]+.2],[1,.1,.8],s.STONE,{group:8,paint:mn(e,0)}),e&&(Ci(n,14,1.8,10,16),oi(n,v.add(t,[-.2,.95,-.2]),[.5,.25,.45],6))}},hearth:{desc:"a collapsed cottage: its hearth and chimney still standing",split:2.6,build(n,e){gt(n,[0,1.6,-.2],[.45,1.6,.35],1,e),n.box([0,.45,.1],[.3,.3,.3],s.NOSE,{group:1,cut:!0});for(const[t,i,r,a,o]of[[-1.1,.4,.9,.5,0],[1,.5,.7,.35,0],[-1.9,-.2,.12,.35,1]])gt(n,[t,a/2,i],o?[.12,a/2,.7]:[r,a/2,.12],2,e);for(let t=0;t<4;t++)n.seg([-.5+t*.4,.08,.9],[.2+t*.5,.3,.3+t*.1],.05,.05,s.BARKD,{group:3});e&&(Tn(n,[-.4,.1,.16],[-.3,2.8,.16],5,17),Ci(n,14,1.8,10,18))}},"bridge-span":{desc:"an old bridge span going nowhere, one arch over nothing",split:null,build(n,e){gt(n,[-.9,.7,0],[.35,.7,.5],1,e),gt(n,[.95,.55,0],[.3,.55,.5],2,e);for(let t=0;t<=8;t++){const i=t/8,r=Math.PI*(1-i),a=[Math.cos(r)*.85,.9+Math.sin(r)*.55,0];gt(n,a,[.14,.12,.5],3+t%2,e,{dir:[-Math.sin(r),Math.cos(r),0],courses:0})}gt(n,[-.1,1.62,0],[1.25,.1,.55],5,e,{courses:0,dir:[1,-.08,0]});for(const t of[-.5,.5])gt(n,[-.2,1.85,t],[1,.14,.06],6,e,{courses:0});e&&(Tn(n,[-1.2,.1,.5],[-1,1.6,.55],8,19),Ci(n,10,1.6,10,20))}},gateway:{desc:"an overgrown gateway, two posts and a rusted gate, a rune glowing on one post",glow:!0,split:null,build(n,e){for(const t of[-.9,.9])gt(n,[t,.9,0],[.22,.9,.22],1+(t>0?1:0),e,{paint:t<0?(i=>i[2]>.2&&Math.abs(i[1]-1.1)<.14&&Math.abs(i[0]-t)<.06?s.RUNE:mn(e,5)(i)):mn(e,5)}),n.ell([t,1.9,0],[.18,.14,.18],s.STONE,{group:3,paint:mn(e,0)});for(let t=0;t<6;t++)n.seg([-.65+t*.12,.1,.1+t*.06],[-.65+t*.12,1.2,.1+t*.06],.015,.015,s.SHADES,{group:4});for(const t of[.25,1.1])n.seg([-.65,t,.1],[-.05,t,.4],.018,.018,s.SHADES,{group:4});for(const t of[-1,1])for(let i=0;i<3;i++)gt(n,[t*(1.3+i*.35),.3-i*.08,0],[.17,.3-i*.08,.14],5,e);e&&(Tn(n,[.75,.05,.22],[.85,1.9,.22],7,21),Tn(n,[-.9,1.8,.22],[-.3,1,.3],8,22),Ci(n,12,1.6,10,23))}}},ax={pebbles:{desc:"a cluster of fist-sized stones",build(n){for(let e=0;e<7;e++)Rn(n,[(Gt(e)-.5)*.6,.04,(Gt(e,2)-.5)*.4],[.07+Gt(e,3)*.05,.05,.07],1+e,{moss:.8})}},pair:{desc:"two small rocks",build(n){Rn(n,[-.15,.12,0],[.22,.15,.2],1),Rn(n,[.2,.08,.12],[.14,.1,.13],2)}},rock:{desc:"a knee-high rock",build(n){Rn(n,[0,.22,0],[.45,.3,.38],1,{dir:[1,.15,.2]})}},split:{desc:"a rock split in two, a seedling in the crack",build(n){Rn(n,[-.28,.35,0],[.3,.45,.45],1,{dir:[1,.3,0]}),Rn(n,[.3,.33,0],[.3,.42,.45],2,{dir:[1,-.3,0]}),n.seg([.02,.2,.1],[0,.6,.1],.015,.01,s.TRUNK,{group:3}),oi(n,[0,.62,.1],[.1,.07,.1],4)}},boulder:{desc:"a big boulder",build(n){Rn(n,[0,.55,0],[.85,.75,.7],1,{dir:[1,.1,.3]}),Rn(n,[.7,.15,.5],[.22,.15,.2],2)}},"great-boulder":{desc:"a great mossy boulder, a landmark",build(n){Rn(n,[0,.9,0],[1.4,1.15,1.1],1,{dir:[1,.2,.1],moss:.2}),Rn(n,[-1.1,.3,.6],[.4,.35,.35],2),Rn(n,[1.2,.2,.5],[.3,.22,.28],3)}},slab:{desc:"a flat slab of rock",build(n){n.box([0,.12,0],[1,.12,.7],s.STONE,{round:.08,rough:.02,group:1,dir:[1,.04,.2],paint:e=>e[1]>.2&&jn(e,6)<.3?s.MOSS:jn(e,14)>.9?s.STONED:void 0})}},"standing-rock":{desc:"a tall natural standing rock",build(n){Rn(n,[0,.8,0],[.35,.85,.3],1,{moss:.8}),Rn(n,[.35,.1,.25],[.15,.1,.14],2)}}},sx={"spiral-tree":{desc:"a tree whose trunk twists in a spiral",split:2.4,build(n){const e=[];for(let t=0;t<=10;t++){const i=t/10,r=i*Math.PI*4;e.push([Math.cos(r)*.35*(1-i*.4),i*3,Math.sin(r)*.3,.2-i*.12])}Pn(n,e,1),oi(n,[0,3.2,0],[.9,.6,.8],2)}},"loop-tree":{desc:"a tree grown into a loop",split:2.4,build(n){const e=[[0,0,0,.22],[.1,.9,0,.18]];for(let t=0;t<=10;t++){const i=-Math.PI/2+t/10*Math.PI*2;e.push([.1+Math.cos(i)*.55+t*.02,1.45+Math.sin(i)*.55,0,.15])}e.push([.3,2.6,0,.1]),Pn(n,e,1),oi(n,[.3,2.9,0],[.75,.5,.65],2)}},"split-tree":{desc:"a tree split by lightning, both halves still leafing",split:2,build(n){Pn(n,[[0,0,0,.3],[0,.9,0,.26]],1),Pn(n,[[-.05,.9,0,.18],[-.6,1.9,0,.13],[-1,2.6,0,.07]],2),Pn(n,[[.05,.9,0,.18],[.55,1.8,.05,.13],[.9,2.4,.05,.07]],3),n.ell([0,1,.05],[.08,.25,.2],s.BARKD,{group:1,cut:!0}),oi(n,[-1,2.7,0],[.6,.45,.5],4),oi(n,[.95,2.5,.05],[.55,.4,.5],5)}},"door-tree":{desc:"a fat old tree with a little round door in it, a lit window above",glow:!0,split:2.3,build(n){n.ell([0,1,0],[.8,1.1,.75],s.TRUNK,{group:1,rough:.02,paint:e=>e[2]>.5&&Math.hypot(e[0],e[1]-.45)<.3&&e[1]>.2?Math.hypot(e[0],e[1]-.45)<.25?Math.abs(e[0]%.1)<.015?s.BARKD:s.ACCENT:s.BARKD:e[2]>.45&&Math.hypot(e[0]-.3,e[1]-1.3)<.13?Math.abs(e[0]-.3)<.015||Math.abs(e[1]-1.3)<.015?s.BARKD:s.GLOW:Rl(e)}),n.ell([.12,.45,.72],[.03,.03,.03],s.FRAME,{group:2}),oi(n,[0,2.4,-.1],[1.1,.7,.9],3);for(let e=0;e<5;e++){const t=e/5*Math.PI*2;Pn(n,[[Math.cos(t)*.6,.2,Math.sin(t)*.55,.15],[Math.cos(t)*1.1,.02,Math.sin(t)*1,.05]],4)}}},"mushroom-tree":{desc:"an enormous mushroom, tall as a tree",split:2.2,build(n){n.seg([0,0,0],[.1,2.4,0],.3,.22,s.CLOTH,{group:1,paint:e=>e[1]>2&&e[1]<2.15?s.BELLY:void 0}),n.ell([.1,2.55,0],[1.3,.45,1.15],s.ACCENT,{group:2,rough:.01,paint:e=>e[1]<2.35?s.BODY2:jn(e,8)<.18?s.BELLY:void 0}),n.ell([.1,2.35,0],[1.2,.08,1.05],s.BODY2,{group:3,paint:e=>Math.abs(Math.sin(Math.atan2(e[2],e[0]-.1)*20))<.3?s.STRAW:void 0})}},"root-tree":{desc:"an upside-down-looking tree, its roots raised high like a crown",split:2,build(n){Pn(n,[[0,0,0,.35],[0,1.6,0,.25]],1);for(let e=0;e<7;e++){const t=e/7*Math.PI*2;Pn(n,[[0,1.6,0,.16],[Math.cos(t)*.7,2.2+Gt(e)*.3,Math.sin(t)*.6,.1],[Math.cos(t)*1.2,2.5+Gt(e,2)*.4,Math.sin(t)*1,.04]],2+e%2)}for(let e=0;e<4;e++){const t=e/4*Math.PI*2+.4;Pn(n,[[Math.cos(t)*.25,.3,Math.sin(t)*.25,.14],[Math.cos(t)*.6,.02,Math.sin(t)*.55,.05]],4)}}},"stone-lifter":{desc:"a tree that has lifted great stones up in its roots",split:2.4,build(n){Pn(n,[[0,.6,0,.3],[0,2,0,.22],[.1,2.8,0,.12]],1);for(let e=0;e<6;e++){const t=e/6*Math.PI*2;Pn(n,[[Math.cos(t)*.2,.6,Math.sin(t)*.2,.15],[Math.cos(t)*.6,.45,Math.sin(t)*.55,.12],[Math.cos(t)*.9,0,Math.sin(t)*.8,.07]],2)}for(const[e,t,i]of[[.5,.45,.9],[-.5,.4,1.1],[.15,-.5,.8]])Rn(n,[e,i,t],[.3,.24,.26],3);oi(n,[.1,3,0],[1,.6,.85],4)}},"ring-tree":{desc:"a hollow ring of a tree you could fly through",split:null,build(n){for(let e=0;e<=16;e++){const t=e/16*Math.PI*2,i=[Math.cos(t)*1.2,1.35+Math.sin(t)*1.2,0];n.ell(i,[.3,.3,.3],s.TRUNK,{group:1,rough:.02,paint:Rl})}Pn(n,[[-.6,0,.2,.3],[-.5,.3,.1,.3]],2),Pn(n,[[.6,0,.2,.3],[.5,.3,.1,.3]],2);for(const[e,t]of[[-.9,2.3],[.3,2.65],[1.1,2]])oi(n,[e,t,-.1],[.45,.3,.35],3)}}},ox=[...Object.entries(rx).map(([n,e])=>({id:n,family:"ruins",size:1.15,variants:2,...e})),...Object.entries(ax).map(([n,e])=>({id:n,family:"rocks",size:1,variants:1,split:null,...e})),...Object.entries(sx).map(([n,e])=>({id:n,family:"freak",size:1.2,variants:1,...e}))];Object.fromEntries(ox.map(n=>[n.id,n]));const Ce=(n,e=0)=>{const t=Math.sin(n*127.1+e*311.7)*43758.5453;return t-Math.floor(t)},de=(n,e,t=0)=>Ce(Math.floor(n[0]*e)+Math.floor(n[2]*e)*57+t,Math.floor(n[1]*e)),Ue=(n=.2,e=.15)=>t=>{const i=de(t,16,3);return de(t,6,5)<e&&t[1]>.1?s.MOSS:i>1-n*.7?s.BODY2:void 0},ft=(n=7,e=.15)=>t=>de(t,6,9)<e&&t[1]>.15?s.MOSS:Math.abs(Math.sin(t[1]*60+Math.sin(t[0]*9)*1.5))>.97?s.BARK2:de(t,n*3,2)>.9?s.BARKD:void 0,ge=(n,e,t,i,r,a=0,o=0)=>{for(let l=0;l<e;l++){const c=Ce(r,l)*6.283,h=t*Math.sqrt(Ce(l,r));n.ell([a+Math.cos(c)*h,.07,o+Math.sin(c)*h*.7],[.07,.1+Ce(l,4)*.08,.07],s.LEAF2,{group:i+l%3,paint:u=>u[1]>.13?s.LEAF:void 0})}},Pi=(n,e,t,i=1)=>{for(let r=0;r<6;r++){const a=r/6*6.283+e[0],o=[Math.cos(a),0,Math.sin(a)];n.chain([[...e,.03*i],[...v.add(e,v.add(v.mul(o,.25*i),[0,.2*i,0])),.025*i],[...v.add(e,v.add(v.mul(o,.5*i),[0,.05*i,0])),.01*i]],r%2?s.LEAF:s.LEAF2,{group:t})}},ht=(n,e,t,i,r)=>{const a=[];for(let o=0;o<=4;o++)a.push([...v.add(v.lerp(e,t,o/4),[(Ce(r,o)-.5)*.12,0,.02]),.03]);n.chain(a,s.LEAF,{group:i,paint:o=>de(o,30)<.3?s.LEAF2:void 0})},nc=(n,e,t,i)=>n.ell(e,t,s.LEAF,{group:i,rough:.04,paint:r=>{const a=de(r,10,2);return r[1]<e[1]-.15||a<.2?s.LEAF3:a>.8?s.LEAF2:void 0}}),Ye=(n,e,t,i,r=.025,a=s.FRAME,o=Ue(.35,.05))=>n.seg(e,t,r,r,a,{group:i,paint:o}),Zh=(n,e,t,i,r=s.MAGIC)=>n.ell(e,[t,t,t],r,{group:i,extra:!0}),ic=(n,e,t,i)=>n.ell(e,t,s.MOSS,{group:i,rough:.03,paint:r=>de(r,12,4)<.25?s.LEAF2:de(r,9,6)<.15?s.LEAF3:void 0});function ln(n,e,t,i,r,a,o={}){const l=v.norm(v.sub(t,e)),c=typeof o.end=="function"?o.end:void 0,h=typeof o.end=="number"?o.end:r;n.seg(e,t,i,i,r,{group:a,paint:o.paint});for(const[u,f]of[[t,1],[e,-1]])n.box(v.add(u,v.mul(l,f*i*.75)),[i*.75,i*1.25,i*1.25],h,{dir:v.mul(l,f),up:Math.abs(l[1])>.9?[1,0,0]:[0,1,0],round:.005,group:a,cut:!0,paint:c})}const Cl=(n,e)=>t=>{const i=[0,1,2].filter(a=>a!==e);return Math.hypot(t[i[0]]-n[i[0]],t[i[1]]-n[i[1]])*34%1<.22?s.BARK2:de(t,30)<.05?s.BARKD:s.STRAW},Gr=(n,e,t,i,r,a=!1)=>n.ell(e,[t,a?t*.8:t,i],s.BODY3,{group:r,paint:o=>{const l=Math.hypot(o[0]-e[0],o[1]-e[1]);return l<t*.45?de(o,20)<.3?s.BODY2:s.FRAME:l>t*.8&&Math.abs(Math.sin(Math.atan2(o[1]-e[1],o[0]-e[0])*14))<.3?s.NOSE:void 0}});function lx(n,e,{yaw:t=0,pitch:i=0,roll:r=0,at:a=[0,0,0]}={},o=n.flats.length){const l=(d,p,g,x)=>{const m=Math.cos(p),M=Math.sin(p),_=[...d];return _[g]=d[g]*m-d[x]*M,_[x]=d[g]*M+d[x]*m,_},c=d=>l(l(l(d,r,1,2),i,0,1),-t,0,2),h=d=>l(l(l(d,t,0,2),-i,0,1),-r,1,2),u=d=>v.add(c(d),a),f=d=>h(v.sub(d,a));for(const d of n.parts.slice(e))if(d.type==="cone"?(d.a=u(d.a),d.b=u(d.b)):(d.c=u(d.c),d.axes=d.axes.map(c)),d.paint){const p=d.paint;d.paint=(g,x)=>p(f(g),x)}for(const d of n.flats.slice(o))d.c=u(d.c),d.u=c(d.u),d.v=c(d.v)}const Vt=n=>[n.parts.length,n.flats.length],Yt=(n,[e,t],i)=>lx(n,e,i,t);function Co(n,e,{broken:t=!1,len:i=1}={}){for(const r of[-i,i])n.box([r,.45,0],[.06,.47,.06],s.WOOD,{round:.02,group:e,rough:.006,paint:ft(7,.3)});for(const[r,a]of[.3,.55,.8].entries()){if(t&&r===1){n.box([-i*.55,a-.12,.03],[i*.48,.04,.022],s.WOOD,{dir:[1,-.35,0],round:.015,group:e+1,paint:ft()}),n.box([i*.7,a-.2,.04],[i*.34,.04,.022],s.WOOD,{dir:[1,.8,0],round:.015,group:e+2,paint:ft()});continue}t&&r===2||n.box([0,a,.07],[i+.06,.045,.022],s.WOOD,{round:.015,group:e+1,paint:ft()})}}function Lo(n,e,t,{mould:i=!1,along:r=2}={}){const l=[...e],c=[...e];l[1]=c[1]=e[1]+.56,l[r]-=.44,c[r]+=.44;const h=f=>{if(i&&(de(f,5,11)<.32||f[1]<e[1]+.25&&de(f,9,3)<.6))return de(f,14)<.4?s.BODY3:s.SKIN;const d=de(f,22,1);return d<.18?s.BARK2:d>.85?s.BELLY:void 0},u=f=>{const d=r===2?[f[0]-e[0],f[1]-l[1]]:[f[2]-e[2],f[1]-l[1]],p=Math.hypot(...d),g=Math.atan2(d[1],d[0])/6.283;return i&&de(f,6,2)<.35?s.SKIN:(p*12+g)%1<.3?s.BARK2:s.STRAW};if(ln(n,l,c,.56,s.STRAW,t,{paint:h,end:u}),!i)for(const f of[-.25,.25]){const d=[...e];d[r]+=f,n.ell([d[0],e[1]+.56,d[2]],r===2?[.56+.012,.56+.012,.012]:[.012,.56+.012,.56+.012],s.CLOTH,{group:t+1})}}function ma(n,e,t,{mould:i=!1,yaw:r=0}={}){const a=[Math.cos(r),0,Math.sin(r)];n.box(v.add(e,[0,.19,0]),[.4,.19,.23],s.STRAW,{dir:a,round:.05,group:t,rough:.008,paint:o=>{if(i&&de(o,5,7)<.35)return de(o,13)<.4?s.BODY3:s.SKIN;const l=(o[0]-e[0])*a[0]+(o[2]-e[2])*a[2];if(Math.abs(Math.abs(l)-.2)<.02)return s.BARK2;const c=de(o,22,1);return c<.16?s.BARK2:c>.86?s.BELLY:void 0}})}const yu=(n,e,t,i,r)=>ln(n,e,t,i,s.TRUNK,r,{paint:a=>{const o=de(a,14,2);return o<.15?s.BARKD:o>.88?s.BARKL:de(a,5,8)<.12&&a[1]>e[1]?s.MOSS:void 0},end:Cl(e,v.sub(t,e).map(Math.abs).indexOf(Math.max(...v.sub(t,e).map(Math.abs))))}),Do=(n,e,t,i={})=>{n.ell(e,[.3,.1,.3],s.BODY3,{group:t,axes:i.axes,paint:r=>Math.abs(Math.sin(Math.atan2(r[2]-e[2],r[0]-e[0])*16))<.25?s.NOSE:de(r,9,4)<.1?s.MOSS:void 0}),n.ell(e,[.15,.2,.15],s.NOSE,{group:t,axes:i.axes,cut:!0})},Ll=(n,e,t,i,r,{cap:a=s.EAR,k:o=1}={})=>{for(let l=0;l<t;l++){const c=Ce(r,l)*6.283,h=.16*o*Math.sqrt(Ce(l,r)),u=e[0]+Math.cos(c)*h,f=e[2]+Math.sin(c)*h,d=(.06+Ce(l,3)*.09)*o;n.seg([u,e[1],f],[u,e[1]+d,f],.012*o,.01*o,s.CLOTH,{group:i}),n.ell([u,e[1]+d,f],[.04*o,.022*o,.04*o],a,{group:i+1})}},wu=(n,e,t,i=.35)=>(r,a)=>{const o=(r+1)/2*n,l=(a+1)/2*e;if(o%1<.07||o%1>.93||l%1<.07||l%1>.93)return s.FRAME;const c=Math.floor(o)+Math.floor(l)*7;return Ce(c,t)<i?null:Math.abs(Math.sin((o+l*.7)*9+c))<.06?s.STONED:s.SHADES},cx=(n,e,t)=>(i,r)=>{const a=(1-r)/2;return r<-1||Math.abs(i)>a?null:Math.min(a-Math.abs(i),r+1)<.17?n:t(i,r)?s.NOSE:e},$h={tractor:{desc:"an old tractor rusted through and sunk to its axles in moss, a sapling up through its cab",split:2.2,build(n){for(const t of[-.62,.62])Gr(n,[-.6,.58+-.2,t],.58,.17,1+(t>0?1:0));for(const t of[-.5,.5])Gr(n,[.95,.34+-.2,t],.34,.11,3,!0);n.box([.5,.64+-.2,0],[.62,.2,.25],s.BODY,{round:.08,group:4,paint:t=>Math.abs(t[2])>.2&&t[0]>.2&&t[0]*12%1<.35&&Math.abs(t[1]-.64- -.2)<.1?s.SHADES:Ue(.5,.2)(t)}),n.box([1.1,.66+-.2,0],[.06,.2,.22],s.FRAME,{round:.04,group:4,paint:t=>t[1]*18%1<.4?s.SHADES:Ue(.5,.1)(t)}),n.box([.35,.38+-.2,0],[.75,.13,.17],s.FRAME,{round:.05,group:5,paint:Ue(.55,.1)}),n.box([-.55,.74+-.2,0],[.32,.16,.42],s.BODY,{round:.06,group:6,paint:Ue(.55,.25)});for(const t of[-.62,.62])n.ell([-.6,.58+-.2,t],[.66,.66,.2],s.BODY,{group:7+(t>0?1:0),paint:Ue(.6,.3)}),n.ell([-.6,.58+-.2,t],[.6,.6,.3],s.BODY2,{group:7+(t>0?1:0),cut:!0}),n.box([-.6,.1+-.2,t],[.8,.55,.3],s.BODY2,{group:7+(t>0?1:0),cut:!0});n.box([-.62,1+-.2,0],[.17,.04,.17],s.BODY3,{round:.03,group:9}),n.box([-.78,1.17+-.2,0],[.03,.17,.16],s.BODY3,{round:.03,group:9}),Ye(n,[-.25,.9+-.2,0],[-.05,1.2+-.2,0],10,.02),n.flat([-.04,1.22+-.2,0],[0,0,1],[.5,.87,0],.13,.13,(t,i)=>Math.abs(Math.hypot(t,i)-.85)<.17?s.BODY3:null,{group:10,bend:.1});for(const[t,i]of[[-1.05,-.55],[-1.05,.55],[-.2,-.55],[-.2,.55]])Ye(n,[t,.9+-.2,i],[t*.95,2+-.2,i*.95],11,.03,s.BODY,Ue(.6,.05));n.box([-.62,2.03+-.2,-.2],[.5,.035,.5],s.BODY,{round:.02,group:12,dir:[1,0,.25],paint:t=>t[1]>2.03+-.2&&de(t,6,2)<.5?s.MOSS:Ue(.7,.3)(t)}),Ye(n,[.8,.8+-.2,.18],[.8,1.55+-.2,.18],13,.035,s.BODY3),n.seg([-.45,0,.05],[-.38,2.5,.1],.06,.035,s.TRUNK,{group:14,rough:.01}),nc(n,[-.36,2.6,.1],[.5,.38,.45],15),ic(n,[-.1,0,0],[1.75,.26,1.05],16),Pi(n,[1.2,.05,.7],17),Pi(n,[-1.3,.05,.8],18,.8),ge(n,14,2.2,19,1)}},trailer:{desc:"a farm trailer, its boards silver with age, its tailgate dropped, a fern in its bed",build(n){n.box([0,.58,0],[1.15,.05,.6],s.WOOD,{round:.02,group:1,paint:ft()});for(const e of[-.6,.6])n.box([0,.78,e],[1.15,.2,.03],s.WOOD,{round:.02,group:2,paint:ft(7,.25)});n.box([-1.15,.78,0],[.03,.2,.6],s.WOOD,{round:.02,group:3,paint:ft()}),n.box([1.32,.38,0],[.03,.2,.58],s.WOOD,{round:.02,group:4,dir:[.25,-1,0],up:[1,.25,0],paint:ft(7,.3)});for(const e of[-.7,.7])Gr(n,[0,.33,e],.33,.11,5,e>0);n.box([0,.45,0],[1,.06,.5],s.FRAME,{round:.03,group:6,paint:Ue(.6,.1)});for(const e of[-.3,.3])Ye(n,[-1.1,.5,e],[-1.8,.4,0],7,.035,s.FRAME,Ue(.6,.1));Ye(n,[-1.75,.4,0],[-1.75,0,0],7,.03,s.FRAME,Ue(.6,.1)),Pi(n,[.3,.62,0],8,.9),ge(n,12,2,9,2)}},"trailer-hay":{desc:"a trailer still loaded with hay bales, the top ones slumped and mouldy",build(n){$h.trailer.build(n);for(const[e,t,i,r,a]of[[-.7,-.3,.63,0,0],[-.7,.3,.63,0,0],[0,-.3,.63,0,0],[0,.3,.63,1,0],[.7,-.3,.63,0,0],[-.4,0,1.01,1,.2],[.35,-.1,1.01,1,-.3]])ma(n,[e,i,t],20+Math.round((e+1)*3)+(i>.9?9:0),{mould:!!r,yaw:a})}},"hay-round":{desc:"a round hay bale on its end, its net wrap perished",build(n){Lo(n,[0,0,0],1),ge(n,8,1,4,3)}},"hay-round-side":{desc:"a round hay bale lying along the ground",build(n){Lo(n,[0,0,0],1,{along:0}),ge(n,8,1,4,4)}},"hay-round-mouldy":{desc:"a round bale gone black with mould and sagging, mushrooms at its foot",build(n){const e=Vt(n);Lo(n,[0,0,0],1,{mould:!0}),Yt(n,e,{roll:.06,at:[0,-.06,0]}),Ll(n,[.5,0,.35],6,3,1),ge(n,10,1.1,5,5)}},"hay-square":{desc:"a small square hay bale",build(n){ma(n,[0,0,0],1),ge(n,5,.6,3,6)}},"hay-square-mouldy":{desc:"a square bale gone soft and mouldy",build(n){ma(n,[0,0,0],1,{mould:!0,yaw:.3}),ge(n,6,.6,3,7)}},"hay-stack":{desc:"square bales stacked three high, the stack slumping, one fallen",build(n){[[-.42,0,-.25],[.42,0,-.25],[-.42,0,.25],[.42,0,.25],[0,.38,-.25],[0,.38,.25],[-.05,.76,0]].forEach(([i,r,a],o)=>ma(n,[i,r,a],1+o,{mould:o===6||o===2,yaw:(Ce(o,9)-.5)*.25}));const t=Vt(n);ma(n,[0,0,0],10,{mould:!0}),Yt(n,t,{roll:1.2,yaw:.8,at:[1.1,.15,.45]}),ge(n,10,1.4,12,8)}},fence:{desc:"a post-and-rail fence section, grey with age",build(n){Co(n,1),ge(n,6,1,4,9)}},"fence-broken":{desc:"a fence section, its top rail gone and its middle rail snapped",build(n){Co(n,1,{broken:!0}),ge(n,8,1,4,10)}},"fence-leaning":{desc:"a fence section leaning over, ivy through its rails",build(n){const e=Vt(n);Co(n,1),Yt(n,e,{roll:-.45}),ht(n,[-.8,0,.1],[.4,.55,-.2],5,11),ge(n,8,1,6,11)}},gate:{desc:"a five-bar field gate hanging open on its post, its latch post fallen",split:null,build(n){n.box([0,.62,0],[.08,.64,.08],s.WOOD,{round:.02,group:1,paint:ft(7,.35)});const e=Vt(n),t=2;for(let r=0;r<5;r++)n.box([t/2,.22+r*.17,0],[t/2,.03,.02],s.WOOD,{round:.012,group:2,paint:ft()});for(const r of[.05,t-.05])n.box([r,.56,0],[.04,.4,.025],s.WOOD,{round:.012,group:3,paint:ft()});n.box([t/2,.56,.02],[t/2*1.04,.025,.02],s.WOOD,{dir:[t,.66,0],round:.01,group:4,paint:ft()}),Ye(n,[.1,.9,.03],[.1,.3,.03],4,.015,s.FRAME),Yt(n,e,{yaw:.55,pitch:-.04,at:[0,0,.08]});const i=Vt(n);n.box([0,.62,0],[.08,.64,.08],s.WOOD,{round:.02,group:5,paint:ft(7,.4)}),Yt(n,i,{roll:1.45,at:[2,.08,.3]}),ge(n,12,1.8,6,12)}},trough:{desc:"a galvanised feed trough on short legs, rainwater and leaves in it",build(n){n.box([0,.36,0],[.72,.17,.24],s.FRAME,{round:.07,group:1,paint:Ue(.5,.15)}),n.box([0,.52,0],[.68,.15,.2],s.FRAME,{round:.06,group:1,cut:!0}),n.box([0,.43,0],[.67,.01,.19],s.WATER,{group:2,paint:e=>de(e,11)<.2?s.LEAF3:de(e,9,3)<.12?s.BARK2:void 0});for(const e of[-.6,.6])for(const t of[-.16,.16])Ye(n,[e,.2,t],[e,0,t*1.3],3,.025);ge(n,10,1.1,4,13)}},"water-butt":{desc:"a water butt on two bricks, moss down its side, its lid cracked",build(n){for(const e of[-.18,.18])n.box([e,.08,0],[.1,.08,.2],s.STONE,{round:.02,group:1,paint:t=>de(t,8)<.3?s.MOSS:void 0});ln(n,[0,.16,0],[0,1,0],.3,s.HAT2,2,{paint:e=>Math.abs(Math.sin(e[1]*22))>.94?s.LEAF3:de(e,7,2)<.22&&e[2]>0?s.MOSS:void 0}),ln(n,[0,.99,0],[0,1.05,0],.32,s.HAT2,3,{end:e=>Math.abs(e[0]-e[2]*.4)<.015?s.NOSE:de(e,10,3)<.3?s.MOSS:s.HAT2}),Ye(n,[.1,.3,.28],[.1,.3,.38],4,.03,s.FRAME),ge(n,8,.8,5,14)}},scarecrow:{desc:"a scarecrow in a ragged coat and straw hat, a crow on its arm",split:1.6,build(n){n.seg([0,0,0],[0,1.9,0],.04,.035,s.WOOD,{group:1}),n.seg([-.6,1.48,0],[.6,1.5,0],.03,.03,s.WOOD,{group:1}),n.box([0,1.25,0],[.22,.36,.13],s.JACKET,{round:.08,group:2,rough:.01,paint:t=>Math.hypot(t[0]+.08,t[1]-1.12)<.07?s.ACCENT:Math.hypot(t[0]-.1,t[1]-1.35)<.06?s.HAT1:void 0});for(const t of[-1,1]){n.seg([t*.18,1.46,0],[t*.55,1.47,0],.085,.07,s.JACKET,{group:3,rough:.01});for(let i=0;i<4;i++)n.seg([t*.58,1.47,0],[t*(.66+Ce(i,t)*.08),1.4+i*.04,(Ce(t,i)-.5)*.1],.015,.005,s.STRAW,{group:4})}for(let t=0;t<5;t++)n.seg([(t-2)*.07,.92,0],[(t-2)*.09,.78-Ce(t)*.1,.02],.015,.006,s.STRAW,{group:4});n.ell([0,1.78,0],[.15,.17,.14],s.CLOTH,{group:5,paint:t=>t[2]>.1&&Math.abs(t[1]-1.8)<.03&&Math.abs(Math.abs(t[0])-.06)<.03?s.NOSE:Math.abs(t[1]-1.66)<.02?s.BARK2:void 0}),n.ell([0,1.9,0],[.3,.025,.28],s.STRAW,{group:6,rough:.006}),n.ell([0,1.97,0],[.14,.09,.13],s.STRAW,{group:6,paint:t=>Math.abs(t[1]-1.93)<.02?s.ACCENT:void 0});const e=[.5,1.6,.02];n.ell(e,[.1,.06,.05],s.NOSE,{group:7,dir:[1,.3,0]}),n.ell(v.add(e,[.09,.06,0]),[.045,.045,.04],s.NOSE,{group:7}),n.seg(v.add(e,[.12,.06,0]),v.add(e,[.18,.04,0]),.012,.003,s.STONED,{group:7}),n.seg(v.add(e,[-.06,0,0]),v.add(e,[-.18,-.04,0]),.03,.01,s.NOSE,{group:7}),ge(n,8,.8,8,15)}},"milk-churn":{desc:"an old milk churn, dented, moss on its shoulder",build(n){ln(n,[0,0,0],[0,.52,0],.2,s.FRAME,1,{paint:e=>Math.abs(e[1]-.08)<.02||Math.abs(e[1]-.45)<.02?s.STONED:Ue(.3,.1)(e)}),n.seg([0,.52,0],[0,.7,0],.2,.1,s.FRAME,{group:1,paint:e=>de(e,8,2)<.4?s.MOSS:Ue(.3,0)(e)}),ln(n,[0,.68,0],[0,.8,0],.1,s.FRAME,1),ln(n,[0,.79,0],[0,.84,0],.125,s.FRAME,2,{paint:Ue(.5,0)});for(const e of[-1,1])Ye(n,[e*.16,.62,0],[e*.2,.7,0],3,.015)}},wheelbarrow:{desc:"a rusted wheelbarrow, a flat tyre, a fern growing in its tray",build(n){const e=Vt(n);n.box([0,.42,0],[.45,.16,.3],s.HAT1,{round:.06,group:1,paint:Ue(.6,.15)}),n.box([0,.55,0],[.41,.15,.26],s.BODY2,{round:.05,group:1,cut:!0}),Gr(n,[.62,.17,0],.17,.05,2,!0);for(const t of[-.12,.12])Ye(n,[.62,.17,t],[-.2,.3,t*2],3,.02);for(const t of[-.24,.24])Ye(n,[.3,.3,t*.8],[-.95,.5,t*1.15],4,.022),Ye(n,[-.35,.3,t],[-.4,0,t],4,.02);Yt(n,e,{pitch:-.05}),Pi(n,[0,.35,0],6,.75),ge(n,8,1,7,16)}},plough:{desc:"a horse plough left in the grass, its shares rusted, bindweed over it",build(n){Ye(n,[-1,.62,0],[.9,.26,0],1,.045,s.FRAME,Ue(.7,.1));for(const[e,t]of[[-.4,-.08],[.15,.08],[.65,.02]])Ye(n,[e,.52-e*.2,t],[e+.1,.18,t],2,.03,s.FRAME,Ue(.7,0)),n.ell([e+.18,.16,t+.1],[.22,.13,.03],s.BODY2,{dir:[1,-.2,.7],group:3,paint:i=>de(i,14)<.3?s.BODY3:void 0});Gr(n,[1.05,.22,0],.22,.04,4);for(const e of[-.18,.18])Ye(n,[-.9,.6,0],[-1.45,.9,e],5,.025,s.WOOD,ft());ht(n,[-.6,0,.2],[.5,.4,.1],6,17),ge(n,12,1.5,7,18)}}};function Au(n,e){n.box([0,.18,0],[.12,.18,.12],s.HAT2,{round:.04,group:1,paint:Ue(.4,.2)}),n.seg([0,.3,0],[0,3.3,0],.07,.05,s.HAT2,{group:1,paint:Ue(.4,.05)}),n.chain([[0,3.3,0,.05],[.12,3.5,0,.045],[.45,3.58,0,.04],[.68,3.55,0,.035]],s.HAT2,{group:2,paint:Ue(.4,0)}),n.box([.74,3.5,0],[.22,.05,.14],s.HAT2,{round:.04,group:3,paint:Ue(.5,.3)}),n.ell([.74,3.42,0],[.17,.07,.11],e?s.GLOW:s.SHADES,{group:3}),e&&Zh(n,[.74,3.38,0],.07,4,s.MAGIC2),ht(n,[0,0,.07],[.02,2.1,.06],5,e?19:20),ht(n,[-.06,0,0],[-.05,1.3,.04],6,21),ge(n,8,.8,7,22)}const Po=(n,e,t,i,r,a,o={})=>{const l=Vt(n);Ye(n,[0,0,0],[0,1.55,0],a,.03,s.FRAME,Ue(.4,.1)),n.flat([0,1.55+i*.7,.04],[1,0,0],[0,1,0],t,i,e,{group:a+1,bend:.05}),n.box([0,1.55+i*.7,.02],[t*.6,i*.6,.012],s.FRAME,{group:a+2,round:.01}),Yt(n,l,{at:r,...o})},ux={lamppost:{desc:"a street lamp still standing, dark, ivy up its post",split:2.2,build(n){Au(n,!1)}},"lamppost-lit":{desc:"a street lamp still standing, its lamp flickering warm after all these years",glow:!0,split:2.2,build(n){Au(n,!0)}},"sign-blank":{desc:"a road sign leaning, its plate weathered blank",build(n){Po(n,(e,t)=>Math.abs(e)>.88||Math.abs(t)>.82?s.BELLY:de([e*3,t*3,0],4)<.2?s.STONED:s.HAT1,.45,.32,[0,0,0],1,{roll:.22,yaw:-.15}),ge(n,8,.8,5,23)}},"sign-triangle":{desc:"a warning sign leaning, a leaping deer on it (no words)",build(n){Po(n,cx(s.ACCENT,s.BELLY,(e,t)=>{const i=((e-.02)/.3)**2+((t+.38)/.09)**2<1,r=Math.hypot(e-.3,t+.22)<.07,a=(Math.abs(e+.2+(t+.5)*.5)<.03||Math.abs(e-.2-(t+.5)*.4)<.03)&&t<-.4&&t>-.62,o=Math.abs(e-.32+(t+.1)*.3)<.025&&t>-.18&&t<-.02;return i||r||a||o}),.38,.36,[0,0,0],1,{roll:-.18,pitch:.1}),ge(n,8,.8,5,24)}},"sign-round":{desc:"a round sign bent on its pole, a plain white arrow on blue",build(n){Po(n,(e,t)=>{const i=Math.hypot(e,t);return i>1?null:i>.88||Math.abs(t)<.13&&e>-.55&&e<.2||e>=.1&&e<.55&&Math.abs(t)<.5-(e-.1)*1.1?s.BELLY:de([e*3,t*3,0],5)<.15?s.STONED:s.HAT1},.3,.3,[0,0,0],1,{roll:.12,pitch:-.3}),ge(n,8,.8,5,25)}},bench:{desc:"a park bench, cast-iron ends and rotting slats, one slat gone, moss on its seat",build(n){for(const e of[-.8,.8])n.box([e,.23,0],[.04,.23,.22],s.FRAME,{round:.02,group:1,paint:Ue(.5,.05)}),n.box([e,.55,-.2],[.04,.28,.04],s.FRAME,{round:.02,group:1,dir:[0,1,-.25],paint:Ue(.5,0)}),n.box([e,.52,.1],[.04,.03,.17],s.FRAME,{round:.015,group:1});for(const e of[-.15,0,.15])e!==0&&n.box([0,.46,e],[.88,.025,.06],s.WOOD,{round:.015,group:2,paint:ft(7,.4)});for(const e of[.62,.76])n.box([0,e,-.22-(e-.62)*.25],[.88,.045,.02],s.WOOD,{round:.012,group:3,dir:[1,0,0],up:[0,1,-.25],paint:ft(7,.3)});n.box([.45,.2,.2],[.4,.02,.05],s.WOOD,{dir:[1,-.6,.3],round:.012,group:4,paint:ft(7,.5)}),ge(n,12,1.2,5,26)}},"bin-bags":{desc:"a heap of bin bags, long faded and split, moss creeping over them",build(n){[[-.35,.22,-.1,.3],[.25,.2,-.2,.28],[0,.24,.25,.3],[-.05,.5,-.05,.26],[.5,.16,.25,.22],[-.6,.15,.3,.2]].forEach(([t,i,r,a],o)=>{n.ell([t,i,r],[a*1.1,a*.9,a],s.JACKET,{group:1+o,rough:.015,paint:l=>de(l,7,o)<.18?s.MOSS:de(l,16,o+3)>.93?s.STONED:void 0}),n.ell([t+.05,i+a*.9,r],[.06,.07,.05],s.JACKET,{group:1+o})});for(let t=0;t<6;t++)n.box([.8+Ce(t)*.5,.02,-.1+Ce(t,2)*.5],[.06,.015,.04],t%2?s.BELLY:s.CLOTH,{dir:[Ce(t,3)-.5,0,Ce(t,4)-.5],group:8+t});ge(n,10,1.2,15,27)}},"bus-shelter":{desc:"a bus shelter, most of its glass gone, ivy over its roof, a bench inside",split:1.7,build(n){for(const[e,t]of[[-1.15,-.5],[1.15,-.5],[-1.15,.45],[1.15,.45]])Ye(n,[e,0,t],[e,1.85-t*.1,t],1,.035);n.box([0,1.9,-.02],[1.25,.04,.6],s.FRAME,{dir:[1,0,0],up:[0,1,.12],round:.02,group:2,paint:e=>de(e,4,6)<.45&&e[1]>1.9?s.MOSS:Ue(.5,.1)(e)}),n.flat([0,.98,-.5],[1,0,0],[0,1,0],1.12,.82,wu(4,2,1,.45),{group:3,bend:.02}),n.flat([1.15,.98,-.02],[0,0,1],[0,1,0],.45,.82,wu(2,2,3,.55),{group:4,bend:.02}),n.box([0,.45,-.38],[.9,.03,.1],s.FRAME,{round:.02,group:5});for(const e of[-.8,.8])Ye(n,[e,0,-.38],[e,.44,-.38],5,.02);ht(n,[-1.15,0,.46],[-.6,1.95,.3],6,28),ht(n,[-.5,1.95,.5],[.6,1.95,.1],7,29),n.ell([-.3,1.98,0],[.7,.1,.45],s.LEAF,{group:8,rough:.03,paint:e=>de(e,9)<.3?s.LEAF3:void 0}),ge(n,14,1.8,9,30)}},"bus-stop-sign":{desc:"a bus stop pole, its plate a blank disc, a timetable case long empty",split:1.6,build(n){Ye(n,[0,0,0],[0,2.3,0],1,.035,s.FRAME,Ue(.4,.1)),n.flat([0,2.4,.04],[1,0,0],[0,1,0],.24,.24,(e,t)=>{const i=Math.hypot(e,t);return i>1?null:i>.8||i<.5&&Math.abs(t)<.15?s.HAT1:s.BELLY},{group:2,bend:.05}),n.box([0,1.45,.06],[.16,.22,.03],s.FRAME,{round:.02,group:3,paint:e=>e[2]>.07&&Math.abs(e[0])<.12&&Math.abs(e[1]-1.45)<.18?s.SHADES:Ue(.5,.2)(e)}),ht(n,[0,0,.04],[.02,1.2,.04],4,31),ge(n,6,.6,5,32)}},"litter-bin":{desc:"a litter bin on its post, rusted through, a bag spilling out",build(n){Ye(n,[0,0,-.2],[0,1,-.2],1,.03,s.FRAME),ln(n,[0,.45,0],[0,.95,0],.19,s.HAT2,2,{paint:e=>(Math.atan2(e[2],e[0])*4%1+1)%1<.12?s.LEAF3:Ue(.5,.2)(e),end:s.NOSE}),n.ell([.12,.98,.08],[.14,.1,.12],s.JACKET,{group:3}),ge(n,6,.6,4,33)}},"car-parked":{desc:"a car still parked where it was left, tyres flat, moss on its roof",build(n){qh(n,1,{flat:!0}),n.ell([-.25,1.22,0],[.55,.05,.4],s.MOSS,{group:4,rough:.02}),ic(n,[0,0,0],[1.9,.14,1],5),Pi(n,[1.4,.05,.8],6),ge(n,14,2.2,7,34)}}},hx={"picnic-table":{desc:"a picnic table, its planks soft with rot, bracket fungus on its legs",build(n){for(const e of[-.12,0,.12])n.box([0,.6,e*2],[.78,.025,.11],s.WOOD,{round:.012,group:1,paint:ft(7,.3)});for(const e of[-.5,.5])n.box([0,.36,e],[.78,.025,.11],s.WOOD,{round:.012,group:2,paint:ft(7,.3)});for(const e of[-.6,.6])for(const t of[-1,1])n.box([e,.3,t*.22],[.03,.32,.04],s.WOOD,{dir:[0,1,-t*.75],round:.012,group:3,paint:ft()}),n.box([e,.34,0],[.03,.03,.6],s.WOOD,{round:.01,group:3});for(const[e,t,i]of[[-.6,.25,.2],[-.6,.17,.25],[.6,.4,-.15]])n.ell([e+.04,t,i],[.07,.02,.06],s.EAR,{group:4});ge(n,12,1.3,5,35)}},"picnic-blanket":{desc:"a picnic blanket on the ground, its check faded, mushrooms grown up through it, plates and a bottle",build(n){n.box([0,.02,0],[.62,.015,.5],s.CLOTH,{round:.01,rough:.01,group:1,dir:[1,0,.15],paint:e=>de(e,6,3)<.15?s.MOSS:(Math.floor((e[0]+5)*6)+Math.floor((e[2]+5)*6))%2?s.ACCENT:void 0});for(const[e,t]of[[-.3,-.15],[.2,.25]])n.ell([e,.04,t],[.11,.015,.1],s.BELLY,{group:2});n.seg([.3,.08,-.2],[.55,.08,-.32],.06,.03,s.HAT2,{group:3}),Ll(n,[-.05,.02,.05],9,4,2,{k:1.4}),Ll(n,[.4,.02,.2],5,6,3),ge(n,8,1,8,36)}},hamper:{desc:"a wicker hamper, its lid fallen open, ivy through the weave",build(n){n.box([0,.18,0],[.3,.17,.2],s.STRAW,{round:.04,group:1,paint:t=>(Math.floor(t[0]*30)+Math.floor(t[1]*30))%2?s.BARK2:de(t,6,2)<.2?s.MOSS:void 0}),n.box([0,.3,0],[.27,.16,.17],s.BARK2,{round:.03,group:1,cut:!0});const e=Vt(n);n.box([0,0,0],[.3,.02,.2],s.STRAW,{round:.02,group:2,paint:t=>(Math.floor(t[0]*30)+Math.floor(t[2]*30))%2?s.BARK2:void 0}),Yt(n,e,{roll:-1.2,at:[0,.4,-.32]}),n.box([.15,.3,.1],[.12,.02,.08],s.ACCENT,{dir:[1,.5,.5],group:3}),ht(n,[-.3,0,.2],[.1,.32,.2],4,37),ge(n,6,.7,5,38)}},"fungi-glow":{desc:"a clump of tall pale fungi glowing faintly, grown out of a rotted basket",glow:!0,build(n){for(let e=0;e<7;e++){const t=e*2.4,i=.05+Ce(e,5)*.18,r=Math.cos(t)*i,a=Math.sin(t)*i,o=.2+Ce(e,6)*.3;n.seg([r,0,a],[r*1.3,o,a*1.3],.02,.014,s.CLOTH,{group:1+e%2}),n.ell([r*1.3,o+.02,a*1.3],[.07,.035,.07],s.MAGIC,{group:3+e%2,paint:l=>l[1]<o+.01?s.MAGIC2:void 0})}n.ell([0,.05,0],[.28,.06,.24],s.BARK2,{group:6,rough:.02,paint:e=>de(e,9)<.4?s.MOSS:void 0}),ge(n,6,.6,7,39)}},"raised-bed":{desc:"a raised bed bolted to seed: leggy kale gone to flower, a cabbage split",build(n){n.box([0,.14,0],[.8,.14,.4],s.WOOD,{round:.02,group:1,paint:ft(7,.3)}),n.box([0,.26,0],[.76,.12,.36],s.BARK2,{round:.02,group:1,cut:!0}),n.box([0,.2,0],[.75,.02,.35],s.BARK2,{group:2});for(let e=0;e<5;e++){const t=-.6+e*.3,i=(Ce(e,3)-.5)*.3,r=.5+Ce(e)*.4;n.seg([t,.2,i],[t+.04,r,i],.025,.015,s.LEAF2,{group:3}),n.ell([t+.04,r-.1,i],[.16,.1,.14],s.LEAF,{group:4+e%2,rough:.02,paint:a=>de(a,16)<.25?s.LEAF3:void 0});for(let a=0;a<4;a++)n.ell([t+.04+(Ce(e,a)-.5)*.2,r+.02+Ce(a,e)*.08,i+(Ce(a,e+4)-.5)*.15],[.025,.025,.025],s.FLOWER,{group:6})}ge(n,10,1.3,7,40)}},"bean-wigwam":{desc:"a wigwam of bean canes buried in runner-bean vines, red flowers in it",split:1.4,build(n){const e=[0,1.75,0];for(let t=0;t<6;t++){const i=t/6*6.283;Ye(n,[Math.cos(i)*.42,0,Math.sin(i)*.42],v.add(e,[Math.cos(i)*.04,.1,Math.sin(i)*.04]),1,.015,s.STRAW,void 0)}for(let t=0;t<3;t++){const i=[];for(let r=0;r<=12;r++){const a=r/12,o=a*9+t*2.1,l=.42*(1-a*.92);i.push([Math.cos(o)*l,a*1.7,Math.sin(o)*l,.05*(1-a*.6)])}n.chain(i,s.LEAF,{group:2+t,rough:.02,paint:r=>de(r,22,t)<.08?s.ACCENT:de(r,12)<.3?s.LEAF3:void 0})}ge(n,8,.8,6,41)}},"garden-shed":{desc:"a garden shed, its door hanging open, its felt roof furred with moss, a window gone",split:1.6,build(n){n.box([0,.7,0],[.7,.7,.55],s.WOOD,{round:.02,group:1,paint:e=>e[2]>.5&&Math.abs(e[0]+.3)<.22&&Math.abs(e[1]-.95)<.18?s.SHADES:e[2]>.5&&e[0]>.05&&e[0]<.6&&e[1]<1.25?s.NOSE:Math.abs(Math.sin(e[0]*30))>.96||Math.abs(Math.sin(e[2]*30))>.96?s.BARK2:de(e,6,4)<.12?s.MOSS:void 0});for(const e of[-1,1])n.box([0,1.58,e*.32],[.78,.03,.38],s.JACKET,{dir:[1,0,0],up:[0,1,e*.9],round:.01,group:2+(e>0?1:0),paint:t=>de(t,5,2)<.6?s.MOSS:de(t,12)<.2?s.LEAF2:void 0});n.box([.62,.62,.78],[.25,.58,.02],s.WOOD,{dir:[1,0,.9],round:.01,group:4,paint:ft(7,.2)}),ht(n,[-.7,0,.55],[-.55,1.5,.5],5,42),ht(n,[.7,0,-.3],[.68,1.3,.2],6,43),Pi(n,[-.9,.05,.6],7),ge(n,12,1.4,8,44)}},"compost-heap":{desc:"a slatted compost bay, a marrow vine sprawling out of it, its fruit swollen",build(n){for(const e of[-1,1])n.box([e*.5,.32,0],[.03,.32,.45],s.WOOD,{round:.01,group:1,paint:t=>t[1]*9%1<.2?s.NOSE:ft(7,.3)(t)});n.box([0,.32,-.45],[.5,.32,.03],s.WOOD,{round:.01,group:1,paint:e=>e[1]*9%1<.2?s.NOSE:ft(7,.3)(e)}),n.ell([0,.35,0],[.48,.3,.44],s.BARK2,{group:2,rough:.03,paint:e=>de(e,12)<.25?s.LEAF3:de(e,9,3)<.15?s.STRAW:void 0}),n.chain([[0,.6,0,.03],[.4,.5,.4,.03],[.8,.1,.5,.025],[1.2,.05,.2,.02]],s.LEAF2,{group:3});for(const[e,t,i]of[[.85,.45,.14],[1.15,.1,.11]])n.ell([e,i*.9,t],[i*1.4,i,i],s.POM,{group:4,dir:[1,0,.4],paint:r=>(Math.atan2(r[2]-t,r[1]-i)*3%1+1)%1<.15?s.BODY2:void 0});for(let e=0;e<4;e++)n.ell([.3+e*.25,.15,.45-e*.08],[.14,.03,.12],s.LEAF,{group:5+e%2});ge(n,8,1.2,7,45)}},"watering-can":{desc:"a watering can on its side, its rose gone",build(n){const e=Vt(n);ln(n,[0,0,0],[0,.32,0],.14,s.HAT2,1,{paint:Ue(.3,.2)}),Ye(n,[.1,.1,0],[.38,.36,0],2,.025,s.HAT2,Ue(.3,0)),Ye(n,[-.12,.3,0],[-.05,.4,0],3,.015,s.HAT2),Yt(n,e,{roll:1.5,yaw:.4,at:[0,.14,0]}),ge(n,5,.5,4,46)}},"snack-van":{desc:"a roadside snack trailer, its hatch propped open on nothing, shutters rusted down (no signs)",split:1.6,build(n){n.box([0,.95,0],[1,.6,.6],s.BELLY,{round:.1,group:1,paint:e=>e[2]>.55&&Math.abs(e[0]-.05)<.6&&Math.abs(e[1]-1.05)<.25?e[1]*18%1<.3?s.STONED:s.FRAME:Ue(.15,.08)(e)}),n.box([.05,1.42,.7],[.62,.02,.18],s.BELLY,{dir:[1,0,0],up:[0,1,-.6],round:.01,group:2,paint:Ue(.4,.3)}),Ye(n,[-.5,1.3,.62],[-.5,1.5,.8],2,.012),n.box([.05,.82,.66],[.6,.025,.08],s.FRAME,{round:.01,group:3,paint:Ue(.4,.2)});for(const e of[-.6,.6])Gr(n,[0,.28,e],.28,.09,4,!0);Ye(n,[1,.45,0],[1.6,.38,0],5,.035),Ye(n,[1.55,.4,0],[1.55,0,0],5,.03),ht(n,[-1,0,.6],[-.7,1.4,.62],6,47),ge(n,12,1.8,7,48)}},"tent-frame":{desc:"a dome tent's bent poles, a few rags of its fabric still caught on them",build(n){for(const e of[.6,-.6]){const t=[];for(let i=0;i<=10;i++){const r=i/10*Math.PI,a=.85;t.push([Math.cos(r)*a*Math.cos(e),Math.sin(r)*.95+(i===6?-.08:0),Math.cos(r)*a*Math.sin(e),.02])}n.chain(t,s.FRAME,{group:1})}for(const[e,t,i,r,a,o]of[[[-.4,.6,.3],[1,.3,0],[.4,-1,.3],.28,.25,s.HAT1],[[.35,.75,-.3],[1,-.2,0],[0,-.6,-1],.3,.22,s.ACCENT],[[.05,.9,0],[1,0,0],[0,.2,1],.2,.25,s.HAT1]])n.flat(e,t,i,r,a,(l,c)=>c<-1+.4*Math.abs(Math.sin(l*7))+.3*Ce(Math.floor(l*5))?null:o,{group:2,bend:.2});for(const[e,t]of[[-.85,.2],[.85,-.2]])Ye(n,[e,.02,t],[e*1.4,0,t*1.6],3,.006,s.CLOTH,void 0);ge(n,12,1.3,4,49)}},bunting:{desc:"a string of faded bunting sagging between two poles, one pole leaning",split:1.4,build(n){Ye(n,[-1.3,0,0],[-1.3,2,0],1,.03,s.WOOD,ft()),Ye(n,[1.3,0,0],[1.05,1.75,.15],1,.03,s.WOOD,ft());const e=r=>[-1.3+r*2.35,1.95-Math.sin(r*Math.PI)*.55-r*.2,r*.15],t=[s.ACCENT,s.HAT1,s.POM,s.HAT2,s.TOP],i=[];for(let r=0;r<=12;r++)i.push([...e(r/12),.01]);n.chain(i,s.CLOTH,{group:2});for(let r=1;r<12;r++){if(Ce(r,7)<.2)continue;const a=e(r/12);n.flat(v.add(a,[0,-.11,0]),[1,0,.1],[0,1,0],.08,.11,(o,l)=>Math.abs(o)<(l+1)/2?t[r%5]:null,{group:3,bend:.1})}ge(n,10,1.6,4,50)}},"fire-pit":{desc:"a cold fire pit: a ring of stones, charred logs, grey ash",build(n){for(let e=0;e<9;e++){const t=e/9*6.283;n.ell([Math.cos(t)*.5,.08,Math.sin(t)*.42],[.12,.09+Ce(e)*.04,.1],s.STONE,{group:1+e%3,rough:.02,paint:i=>de(i,9,e)<.25?s.MOSS:i[1]>.1&&de(i,14)<.3?s.STONED:void 0})}n.ell([0,.02,0],[.38,.025,.32],s.STONED,{group:5,paint:e=>de(e,18)<.3?s.CLOTH:void 0});for(const[e,t]of[[[-.25,.05,-.1],[.25,.12,.08]],[[-.1,.05,.2],[.2,.1,-.18]]])n.seg(e,t,.05,.04,s.BARKD,{group:6,paint:i=>de(i,20)<.4?s.NOSE:void 0});ge(n,8,1,7,51)}},crates:{desc:"a stack of slatted crates, one fallen and split",build(n){const e=(i,r)=>n.box(i,[.25,.18,.2],s.WOOD,{round:.015,group:r,paint:a=>(a[1]-i[1]+1)*9%1<.22&&Math.abs(a[1]-i[1])<.15?s.NOSE:ft(7,.25)(a)});e([0,.18,0],1),e([.5,.18,.1],2),e([.2,.54,.02],3);const t=Vt(n);e([0,0,0],4),Yt(n,t,{roll:.9,yaw:.5,at:[-.5,.2,.35]}),ge(n,8,1,6,52)}},"glow-sticks":{desc:"glow sticks scattered in the grass, somehow still glowing",glow:!0,build(n){for(let e=0;e<7;e++){const t=(Ce(e)-.5)*1,i=(Ce(e,2)-.5)*.7,r=Ce(e,3)*6.283;n.seg([t,.02,i],[t+Math.cos(r)*.12,.03,i+Math.sin(r)*.12],.014,.014,e%3?s.MAGIC:s.COLLAR,{group:1+e})}Ye(n,[.2,.25,-.1],[.2,.02,-.1],9,.012,s.MAGIC2,void 0),ge(n,10,.8,10,53)}},"camp-chair":{desc:"a folding camp chair tipped over, its fabric sagging",build(n){const e=Vt(n);for(const t of[-1,1])Ye(n,[-.2,0,t*.22],[.2,.45,t*.22],1,.015),Ye(n,[.2,0,t*.22],[-.2,.45,t*.22],1,.015),Ye(n,[-.22,.45,t*.22],[-.3,.85,t*.22],1,.015);n.box([0,.42,0],[.22,.02,.22],s.HAT1,{round:.01,group:2,paint:Ue(0,.2)}),n.box([-.27,.65,0],[.02,.2,.22],s.HAT1,{dir:[0,1,0],up:[1,.2,0],round:.01,group:2}),Yt(n,e,{roll:1.4,yaw:.3,at:[0,.22,0]}),ge(n,6,.7,4,54)}},"log-pile":{desc:"a woodpile of cut logs, ends to the viewer, moss on the top ones",build(n){let e=1;for(let t=0;t<3;t++)for(let i=0;i<4-t;i++){const r=(i-(3-t)/2)*.38,a=.17+t*.3;yu(n,[r,a,-.5],[r,a,.5],.17+Ce(i,t)*.02,e++)}ge(n,10,1.3,20,55)}},"chopping-block":{desc:"a chopping block with an axe left in it, chips in the grass",build(n){ln(n,[0,0,0],[0,.45,0],.26,s.TRUNK,1,{paint:e=>de(e,14,2)<.15?s.BARKD:de(e,5,3)<.15?s.MOSS:void 0,end:Cl([0,.45,0],1)}),Ye(n,[.02,.45,.05],[-.35,.95,.2],2,.025,s.WOOD,void 0),n.box([.04,.47,.04],[.1,.06,.02],s.FRAME,{dir:[1,-.5,0],up:[0,1,0],round:.01,group:3,paint:Ue(.5,0)});for(let e=0;e<8;e++)n.box([(Ce(e)-.5)*1,.015,(Ce(e,2)-.5)*.8],[.05,.012,.025],s.STRAW,{dir:[Ce(e,3)-.5,0,Ce(e,4)-.5],group:4+e%2});ge(n,8,.9,6,56)}},sawhorse:{desc:"a sawhorse with a log still across it, a bow saw hung on it",build(n){for(const e of[-.4,.4])for(const t of[-1,1])Ye(n,[e,0,t*.3],[e,.62,-t*.1],1,.03,s.WOOD,ft());Ye(n,[-.4,.3,0],[.4,.3,0],1,.025,s.WOOD,ft()),yu(n,[-.8,.7,0],[.7,.72,0],.14,2),Ye(n,[-.25,.55,.22],[.25,.55,.22],3,.01,s.FRAME,void 0),n.chain([[-.25,.55,.22,.015],[-.2,.35,.22,.015],[.2,.35,.22,.015],[.25,.55,.22,.015]],s.ACCENT,{group:3,paint:Ue(.5,0)}),ge(n,8,1,5,57)}},stumps:{desc:"two sawn stumps, bracket fungus on one",build(n){for(const[e,t,i,r,a]of[[-.3,-.1,.3,.32,1],[.45,.25,.22,.22,3]]){ln(n,[e,0,t],[e,r,t],i,s.TRUNK,a,{paint:o=>de(o,14,2)<.15?s.BARKD:de(o,5,3)<.2?s.MOSS:void 0,end:Cl([e,r,t],1)});for(let o=0;o<4;o++){const l=o*1.6;n.ell([e+Math.cos(l)*(i+.1),.05,t+Math.sin(l)*(i+.1)],[.12,.06,.1],s.TRUNK,{group:a+1,dir:[Math.cos(l),-.3,Math.sin(l)]})}}for(const e of[.12,.2])n.ell([-.05,e,.12],[.1,.02,.08],s.EAR,{group:5});ge(n,8,1,6,58)}},mattress:{desc:"a mattress dumped in the bracken, stained and sprung, a fern through it",build(n){const e=Vt(n);n.box([0,0,0],[.75,.1,.5],s.BELLY,{round:.07,group:1,rough:.01,paint:t=>de(t,4,2)<.3?s.STRAW:de(t,6,3)<.15?s.MOSS:Math.abs(Math.sin(t[0]*20))>.93?s.CLOTH:void 0}),Yt(n,e,{roll:.2,pitch:.1,at:[0,.15,0]});for(let t=0;t<3;t++)n.chain([[-.3+t*.25,.26,.1,.012],[-.28+t*.25,.34,.12,.012],[-.3+t*.25,.38,.1,.01]],s.FRAME,{group:3});Pi(n,[.4,.2,.1],4,.8),ge(n,10,1.2,5,59)}},"tyre-pile":{desc:"a pile of old tyres, one rolled away, rainwater and moss in them",build(n){for(let t=0;t<4;t++)Do(n,[(Ce(t)-.5)*.06,.1+t*.2,(Ce(t,2)-.5)*.06],1+t);Do(n,[.65,.1,.3],6);const e=Vt(n);Do(n,[0,0,0],8),Yt(n,e,{roll:1.4,yaw:.9,at:[-.6,.3,.35]}),ge(n,10,1.1,10,60)}},beehive:{desc:"a white-painted beehive, its boxes askew, its roof slid off, comb in the grass",build(n){n.box([0,.15,0],[.3,.15,.3],s.WOOD,{round:.01,group:1});for(const[t,i,r]of[[.45,0,2],[.75,.04,3],[1.02,-.05,4]])n.box([i,t,0],[.3,.13,.3],s.BELLY,{dir:[1,0,i*3],round:.015,group:r,paint:a=>Math.abs(a[1]-t+.1)<.015&&a[2]>.28&&Math.abs(a[0]-i)<.15?s.NOSE:de(a,6,r)<.18?s.MOSS:de(a,15)>.9?s.STONED:void 0});const e=Vt(n);n.box([0,0,0],[.36,.05,.36],s.FRAME,{round:.02,group:5,paint:Ue(.4,.3)}),Yt(n,e,{roll:.5,yaw:.3,at:[.5,.2,.35]}),n.box([-.5,.04,.3],[.18,.025,.1],s.STRAW,{group:6,dir:[1,0,.5],paint:t=>de(t,30)<.5?s.BODY2:void 0}),ge(n,10,1,7,61)}}},dx=[...Object.entries($h).map(([n,e])=>({id:n,family:"farm",size:1,split:null,...e})),...Object.entries(ux).map(([n,e])=>({id:n,family:"street",size:1,split:null,...e})),...Object.entries(hx).map(([n,e])=>({id:n,family:"scene",size:1,split:null,...e}))];Object.fromEntries(dx.map(n=>[n.id,n]));const en=(n=4,e=.14)=>t=>{const i=de(t,8,7);return i<e&&de(t,3,1)<.6?s.MOSS:n&&(t[1]*n%1<.08||((t[0]+t[2])*n*.6+Math.floor(t[1]*n)*.5)%1<.05)||i>.94?s.STONED:void 0},nt=(n,e,t,i,r={})=>n.box(e,t,r.mat??s.STONE,{round:.025,rough:.01,group:i,paint:en(r.courses??4,r.moss??.14),...r}),ui=(n,e,t,i,r,a,o=s.STONE)=>{for(let l=0;l<t;l++){const c=Ce(a,l)*6.283,h=i*Math.sqrt(Ce(l,a)),u=.08+Ce(l,a+2)*.12;n.box([e[0]+Math.cos(c)*h,u*.7,e[2]+Math.sin(c)*h*.8],[u*1.3,u*.7,u],o,{dir:[Math.cos(c*3),(Ce(l,3)-.5)*.5,Math.sin(c*3)],round:.02,rough:.008,group:r+l%3,paint:en(0,.3)})}},Mn=(n,e,t,i,r,a,{pointed:o=!1,mat:l=s.STONED}={})=>{n.box(e,r===0?[.6,i,t]:[t,i,.6],l,{group:a,cut:!0,round:.005}),n.ell(v.add(e,[0,i,0]),r===0?[.6,o?t*1.8:t,t]:[t,o?t*1.8:t,.6],l,{group:a,cut:!0})},gr=(n,e=6,t=0,i=0)=>(r,a)=>{const o=(1-a)/2;return Math.abs(r)>o||t&&Ce(Math.floor((r+1)*4),Math.floor((a+1)*4)+i)<t&&a>-.6?null:e&&(a+1)*e%1<.1?s.STONED:n},ds=(n,e,t,i,r,a={})=>{n.ell(e,[t,t*(a.tall??1),t],r,{group:i,paint:a.paint??en(0,.35)}),n.ell(e,[t*.88,t*(a.tall??1)*.88,t*.88],s.STONED,{group:i,cut:!0}),n.box(v.add(e,[0,-t,0]),[t*1.1,t,t*1.1],s.STONED,{group:i,cut:!0}),a.crack&&n.box(v.add(e,a.crack[0]),a.crack[1],s.STONED,{group:i,cut:!0,dir:a.crack[2],round:.02})},Is=(n,e,t,i,r,{capital:a=!0,mat:o=s.BELLY}={})=>{n.box(v.add(e,[0,.06,0]),[i*1.35,.06,i*1.35],o,{round:.015,group:r,paint:en(0,.3)}),n.seg(v.add(e,[0,.1,0]),v.add(e,[0,t,0]),i,i*.85,o,{group:r,paint:l=>Math.abs(Math.sin(Math.atan2(l[2]-e[2],l[0]-e[0])*9))>.9?s.STONED:en(0,.2)(l)}),a&&n.box(v.add(e,[0,t+.06,0]),[i*1.4,.07,i*1.4],o,{round:.02,group:r,paint:en(0,.4)})},fx=(n,e,t,i=1)=>{for(let r=0;r<4;r++){const a=r*1.6;n.chain([[e[0]+Math.cos(a)*.2*i,0,e[2]+Math.sin(a)*.2*i,.2*i],[e[0]+Math.cos(a)*.1*i,1*i,e[2]+Math.sin(a)*.1*i,.14*i],[e[0]+Math.cos(a)*.4*i,1.8*i,e[2]+Math.sin(a)*.35*i,.08*i]],s.BARK2,{group:t,rough:.015,paint:o=>de(o,12)<.2?s.BARKD:void 0})}for(const[r,a,o,l]of[[0,2.3,0,1.1],[-.6,1.8,.3,.7],[.7,1.9,-.2,.75],[.1,3,.1,.7],[.5,1.5,.6,.6]])n.ell([e[0]+r*i,a*i,e[2]+o*i],[l*i,l*.8*i,l*i],s.LEAF3,{group:t+1,rough:.05,paint:c=>de(c,9,2)<.2?s.LEAF:de(c,15,3)<.006?s.ACCENT:void 0})},wa=(n,e,t,i,r,a,o,l,c=.25)=>{for(let h=e+.12,u=0;h<t;h+=.36,u++)Ce(l,u)>c&&nt(n,[h,i+.12,r],[.11,.12,a],o,{courses:0})},Oo=(n,{lean:e=0,sunk:t=0,yaw:i=0,seed:r=0}={})=>{const a=Vt(n),o=l=>Math.abs(l[0])<.18&&l[2]>.04&&(l[1]-.1)*14%1<.18&&l[1]>.25&&l[1]<.6?s.STONED:en(0,.25)(l);n.box([0,.35,0],[.26,.35,.055],s.STONE,{round:.02,rough:.006,group:1,paint:o}),n.ell([0,.7,0],[.26,.13,.055],s.STONE,{group:1,paint:o}),Yt(n,a,{roll:e,yaw:i,at:[0,-t,0]}),ge(n,5,.45,3,70+r)},px={headstone:{desc:"a headstone, its carving worn smooth, lichen on its shoulders",build(n){Oo(n,{lean:.08})}},"headstone-lean":{desc:"a headstone leaning hard back into the grass",build(n){Oo(n,{lean:-.38,yaw:.2,seed:1})}},"headstone-sunk":{desc:"a headstone sunk to its shoulders and tipped, ivy over it",build(n){Oo(n,{lean:.3,sunk:.25,yaw:-.3,seed:2}),ht(n,[-.3,0,.1],[.15,.4,.1],5,71)}},"grave-cross":{desc:"a plain stone cross on a stepped base, lichen-covered",build(n){nt(n,[0,.08,0],[.3,.08,.2],1,{courses:0}),nt(n,[0,.2,0],[.2,.05,.13],1,{courses:0});const e=Vt(n);n.box([0,.7,0],[.06,.45,.06],s.STONE,{round:.015,group:2,paint:en(0,.3)}),n.box([0,.92,0],[.24,.06,.06],s.STONE,{round:.015,group:2,paint:en(0,.3)}),Yt(n,e,{roll:.12,at:[0,0,0]}),ge(n,6,.5,3,72)}},obelisk:{desc:"a tall memorial obelisk on a plinth, cracked, moss up one side",build(n){nt(n,[0,.15,0],[.32,.15,.32],1,{courses:0}),nt(n,[0,.42,0],[.22,.12,.22],1,{courses:0}),n.seg([0,.54,0],[0,1.9,0],.15,.08,s.STONE,{group:2,paint:e=>e[0]<-.05&&de(e,6)<.5?s.MOSS:Math.abs(e[0]*3-e[1]+1.2)<.02?s.STONED:void 0}),n.ell([0,1.92,0],[.07,.1,.07],s.STONE,{group:2}),ge(n,8,.7,3,73)}},"stone-angel":{desc:"a stone angel on a plinth, head bowed, hands folded, wings mossed over",split:1.6,build(n){nt(n,[0,.3,0],[.38,.3,.32],1,{courses:2}),n.seg([0,.6,0],[0,1.55,0],.3,.15,s.BELLY,{group:2,rough:.006,paint:e=>Math.abs(Math.sin(Math.atan2(e[2],e[0])*7+e[1]*2))>.93?s.STONED:de(e,7,3)<.12?s.MOSS:void 0}),n.ell([0,1.55,0],[.17,.14,.13],s.BELLY,{group:2}),n.ell([.04,1.78,.03],[.1,.12,.1],s.BELLY,{group:3,paint:e=>e[1]>1.84&&de(e,20)<.4?s.STONED:void 0}),n.ell([.03,1.5,.15],[.07,.1,.06],s.BELLY,{group:4});for(const e of[-1,1])n.flat([-.18,1.55,e*.2],[-.25,.97,e*.3],[-1,-.1,-e*.1],.55,.3,(t,i)=>{const r=xr.wing(s.BELLY,s.STONE)(t,i);return r&&Ce(Math.floor(t*8),Math.floor(i*5)+e)<.25?s.MOSS:r},{group:5+(e>0?1:0),bend:.2});ht(n,[-.38,0,.3],[-.3,.7,.3],7,74),ge(n,10,1,8,75)}},mausoleum:{desc:"a family mausoleum: columns, a pediment, its iron door rusted half open, ivy over its roof",split:2,build(n){nt(n,[0,.1,0],[1.25,.1,1],1,{courses:0}),nt(n,[0,.25,.1],[1.15,.06,.95],1,{courses:0}),nt(n,[0,1,-.15],[.95,.7,.7],2,{courses:5});for(const e of[-.75,-.25,.25,.75])Is(n,[e,.31,.78],1.2,.09,3,{mat:s.STONE});nt(n,[0,1.65,.12],[1,.1,.9],4,{courses:0}),n.flat([0,2.03,.97],[1,0,0],[0,1,0],1,.3,gr(s.STONE,3),{group:5,bend:.02});for(const e of[-1,1])n.box([0,1.95,.1+e*.48],[1.02,.03,.52],s.STONE,{dir:[1,0,0],up:[0,1,e*.55],round:.01,group:6+(e>0?1:0),paint:t=>de(t,4,e+3)<.55?s.LEAF:en(0,.3)(t)});n.box([0,.85,.56],[.3,.55,.03],s.NOSE,{group:8}),n.box([.32,.85,.72],[.02,.5,.27],s.JACKET,{dir:[.5,0,1],round:.01,group:9,paint:e=>e[1]*10%1<.15?s.BODY2:Ue(.5,.1)(e)}),ht(n,[-.95,.3,.55],[-.8,1.9,.6],10,76),ht(n,[.95,.3,-.2],[.6,2,.2],11,77),ge(n,12,1.6,12,78)}},"iron-railing":{desc:"a run of spear-topped iron railing round an old plot, bent at one end",build(n){for(const e of[.15,.75])Ye(n,[-1,e,0],[1,e,0],1,.018,s.JACKET);for(let e=0;e<=12;e++){const t=-1+e/12*2,i=t>.55?(t-.55)*.9:0;Ye(n,[t,0,0],[t+i*.3,.95-i*.3,i],2,.014,s.JACKET),n.seg([t+i*.3,.95-i*.3,i],[t+i*.35,1.02-i*.3,i*1.05],.03,.002,s.JACKET,{group:3})}ht(n,[-.9,0,.05],[-.3,.8,.05],4,79),ge(n,10,1.1,5,80)}},lychgate:{desc:"a lychgate: a little roofed gateway of oak, its shingles mossed, one gate leaf open",split:1.8,build(n){for(const t of[-.75,.75])for(const i of[-.55,.55])n.box([t,.85,i],[.07,.85,.07],s.WOOD,{round:.02,group:1,paint:ft(7,.3)});for(const t of[-.55,.55])n.box([0,1.72,t],[.9,.06,.06],s.WOOD,{round:.02,group:2,paint:ft()});for(const t of[-1,1])n.box([0,2.05,t*.42],[1.05,.04,.5],s.BARK2,{dir:[1,0,0],up:[0,1,t*.9],round:.015,group:3+(t>0?1:0),paint:i=>de(i,5,t+4)<.5?s.MOSS:(i[0]+3)*8%1<.12?s.BARKD:void 0});for(const t of[-1.05,1.05])n.flat([t*.97,2,0],[0,0,1],[0,1,0],.6,.35,gr(s.WOOD,0),{group:5,bend:.02});const e=Vt(n);for(let t=0;t<4;t++)n.box([.32,.25+t*.22,0],[.32,.025,.02],s.WOOD,{round:.01,group:6,paint:ft()});for(const t of[.02,.62])n.box([t,.55,0],[.03,.38,.02],s.WOOD,{round:.01,group:6});Yt(n,e,{yaw:-1,at:[-.68,0,0]});for(const t of[-.75,.75])nt(n,[t*.5+(t>0?.2:0),.2,.62],[.1,.2,.1],7,{courses:0});ge(n,12,1.4,8,81)}},yew:{desc:"an old churchyard yew, its red trunk fluted and split, its crown nearly black",split:1.3,build(n){fx(n,[0,0,0],1,1.1),ge(n,8,1.2,4,82)}},"grave-lantern":{desc:"a little lantern on a grave, its candle somehow still flickering",glow:!0,build(n){nt(n,[0,.06,0],[.2,.06,.14],1,{courses:0});for(const[e,t]of[[-.07,-.07],[.07,-.07],[-.07,.07],[.07,.07]])Ye(n,[e,.12,t],[e,.4,t],2,.008,s.JACKET);n.seg([0,.4,0],[0,.5,0],.1,.02,s.JACKET,{group:2}),n.seg([0,.13,0],[0,.2,0],.025,.025,s.BELLY,{group:3}),n.ell([0,.23,0],[.015,.035,.015],s.GLOW,{group:4}),Zh(n,[0,.24,0],.05,5,s.MAGIC2),ge(n,5,.4,6,83)}}},gx={"carpark-tarmac":{desc:"a car park's cracked tarmac, its bay lines faded, grass and saplings up through the cracks",decal:!0,build(n){n.box([0,.015,0],[5.6,.015,3.6],s.JACKET,{round:.01,group:1,paint:i=>{const r=i[0],a=i[2],o=Math.abs(Math.sin(r*1.1+1)*.9+Math.sin(r*3.7)*.15-a*.5)<.025||Math.abs(Math.sin(a*1.4)*.7-r*.4+1.5)<.025;return de(i,2.2,4)<.08||o?de(i,16)<.5?s.LEAF2:s.NOSE:de(i,1.4,8)<.06?de(i,10)<.5?s.MOSS:s.LEAF2:Math.abs(a)>1&&Math.abs(a)<3.3&&Math.abs((r+30)%1.25-.625)>.6||Math.abs(Math.abs(a)-1)<.04&&Math.abs(r)<5.2?de(i,9,2)<.35?s.JACKET:s.CLOTH:de(i,20,1)>.93?s.NOSE:de(i,20,2)>.95?s.STONED:void 0}});for(let i=0;i<12;i++){const r=(Ce(i,40)-.5)*2*5.6*.9,a=(Ce(40,i)-.5)*2*3.6*.9;n.ell([r,.06,a],[.09,.06+Ce(i)*.05,.09],s.LEAF2,{group:2+i%3,paint:o=>o[1]>.08?s.LEAF:void 0})}}},"ticket-machine":{desc:"a pay-and-display machine on its plinth, its screen dark and blank, a fern at its foot",build(n){nt(n,[0,.06,0],[.25,.06,.2],1,{courses:0}),n.box([0,.7,0],[.2,.58,.15],s.FRAME,{round:.04,group:2,paint:e=>e[2]>.12&&Math.abs(e[0])<.12&&Math.abs(e[1]-1)<.08?s.SHADES:e[2]>.12&&Math.abs(e[0]-.08)<.03&&Math.abs(e[1]-.8)<.05?s.NOSE:Ue(.35,.15)(e)}),n.box([0,1.3,-.02],[.24,.04,.19],s.FRAME,{round:.02,group:3,paint:Ue(.4,.4)}),Pi(n,[-.2,.05,.25],4,.7),ge(n,6,.6,5,84)}},barrier:{desc:"a car park barrier, its striped arm snapped and drooping to the ground",build(n){n.box([0,.55,0],[.16,.55,.16],s.BELLY,{round:.04,group:1,paint:Ue(.3,.2)});const e=t=>Math.floor((t[0]+t[1]+9)*3)%2?s.ACCENT:de(t,12)<.15?s.BODY2:s.BELLY;n.seg([.15,1,0],[1.4,1.02,0],.045,.04,s.BELLY,{group:2,paint:e}),n.seg([1.45,.98,.02],[2.4,.05,.1],.04,.035,s.BELLY,{group:3,paint:e}),n.box([-.35,1,0],[.18,.08,.08],s.FRAME,{round:.03,group:4,paint:Ue(.5,0)}),ge(n,10,1.4,5,85)}},"car-bonnet-up":{desc:"a car left with its bonnet up, a bramble growing out of the engine",build(n){qh(n,1,{flat:!0});const e=Vt(n);n.box([0,0,0],[.48,.03,.62],s.BODY,{round:.03,group:4,paint:Ue(.4,.2)}),Yt(n,e,{pitch:1,at:[1.05,1.18,0]});for(let t=0;t<6;t++)n.chain([[1,.7,(t-2.5)*.15,.03],[1.2+Ce(t)*.4,1.1+Ce(t,2)*.4,(t-2.5)*.22,.025],[1.5+Ce(t,3)*.5,.4+Ce(t,4)*.5,(t-2.5)*.3,.015]],s.LEAF2,{group:5+t%2,paint:i=>de(i,25)<.2?s.LEAF3:void 0});ic(n,[0,0,0],[1.9,.14,1],7),ge(n,12,2,8,86)}}},mx={"crushed-cars":{desc:"crushed cars stacked four high, their colours faded under rust, moss on the top one",split:1.6,build(n){[[s.BODY,0,.03],[s.HAT1,.06,-.04],[s.HAT2,-.05,.05],[s.BELLY,.1,-.02]].forEach(([e,t,i],r)=>n.box([t,.2+r*.38,0],[.95,.18,.48],e,{dir:[1,(Ce(r)-.5)*.06,i],round:.05,rough:.025,group:1+r,paint:a=>{const o=Ue(.55,r===3?.4:.05)(a);return o||(Math.abs(a[1]-.2-r*.38)<.05&&Math.abs(a[0])<.5?s.SHADES:de(a,9,r)<.1?s.BODY3:void 0)}})),ge(n,10,1.4,6,87)}},"oil-drums":{desc:"oil drums, rust-eaten, one tipped and spilling dark into the grass",build(n){[[0,-.2,s.HAT1],[.42,-.05,s.BODY],[-.1,.25,s.HAT2]].forEach(([t,i,r],a)=>ln(n,[t,0,i],[t,.58,i],.19,r,1+a,{paint:o=>Math.abs(o[1]-.2)<.02||Math.abs(o[1]-.4)<.02?s.BODY3:Ue(.6,.15)(o),end:s.BODY3}));const e=Vt(n);ln(n,[0,0,0],[0,.58,0],.19,s.POM,5,{paint:Ue(.6,.1),end:s.BODY3}),Yt(n,e,{roll:1.55,yaw:.7,at:[-.6,.19,-.1]}),n.ell([-.5,.01,.45],[.35,.01,.25],s.NOSE,{group:7}),ge(n,8,1.1,8,88)}},"grab-crane":{desc:"a scrap yard's grab crane on its tracks, its arm still raised, the grab hanging open over nothing",split:2.4,build(n){for(const r of[-.5,.5])n.box([0,.2,r],[.9,.2,.18],s.BODY3,{round:.12,group:1,paint:a=>(a[0]+5)*8%1<.25?s.NOSE:de(a,6,2)<.15?s.MOSS:void 0});n.box([0,.55,0],[.65,.15,.55],s.POM,{round:.05,group:2,paint:Ue(.6,.2)}),n.box([-.15,1.05,.1],[.38,.38,.3],s.POM,{round:.05,group:3,paint:r=>r[2]>.35&&r[1]>1.05||r[0]>.2&&r[1]>1.05?s.SHADES:Ue(.6,.2)(r)}),n.box([-.6,.85,-.1],[.3,.25,.4],s.POM,{round:.04,group:4,paint:Ue(.6,.2)});const e=[.3,.8,-.15],t=[2,3.9,-.15],i=[3,3.5,-.15];for(const r of[-.08,.08])Ye(n,v.add(e,[0,0,r]),v.add(t,[0,0,r]),5,.05,s.POM,Ue(.6,.05)),Ye(n,v.add(t,[0,0,r]),v.add(i,[0,0,r]),6,.04,s.POM,Ue(.6,.05));for(let r=1;r<8;r++)Ye(n,v.lerp(e,t,r/8),v.lerp(e,t,(r+.5)/8),5,.02,s.POM,Ue(.6,0));Ye(n,[.3,.9,-.15],[1.2,2.4,-.15],7,.045,s.FRAME,Ue(.3,0)),Ye(n,i,[3,2,-.15],8,.012,s.JACKET);for(let r=0;r<4;r++){const a=r/4*6.283;n.chain([[3,2,-.15,.04],[3+Math.cos(a)*.3,1.75,-.15+Math.sin(a)*.3,.035],[3+Math.cos(a)*.22,1.45,-.15+Math.sin(a)*.22,.02]],s.FRAME,{group:9,paint:Ue(.6,0)})}ht(n,[.3,.6,.3],[1,2,-.07],10,89),ge(n,14,2,11,90)}},shack:{desc:"a corrugated iron shack, its roof sagging, its door off, a stovepipe leaning",split:1.8,build(n){const e=t=>{const i=Ue(.3,.06)(t);return i||(Math.abs(Math.sin((t[0]+t[2])*40))>.8?s.STONED:void 0)};n.box([0,.8,0],[1,.8,.7],s.FRAME,{round:.02,group:1,paint:t=>t[2]>.65&&Math.abs(t[0]-.45)<.25&&t[1]<1.3?s.NOSE:t[2]>.65&&Math.abs(t[0]+.45)<.2&&Math.abs(t[1]-1)<.18?s.SHADES:e(t)}),n.box([0,1.72,0],[1.15,.03,.85],s.FRAME,{dir:[1,0,0],up:[.1,1,.25],round:.01,group:2,paint:t=>de(t,5,4)<.4?s.MOSS:e(t)}),n.box([.95,.45,.9],[.02,.45,.26],s.FRAME,{dir:[0,0,1],up:[.5,1,0],round:.01,group:3,paint:e}),Ye(n,[-.7,1.6,-.3],[-.8,2.5,-.35],4,.05,s.BODY3),ht(n,[-1,0,.7],[-.8,1.6,.7],5,91),ge(n,14,1.8,6,92)}}},Mx={"stave-church":{desc:"a wooden stave church: tiers of steep shingled roofs, carved finials, tarred plank walls; its nave roof fallen in and open to the sky, its spire still standing",halves:1,split:2.4,build(n){const e=t=>de(t,5,6)<.15&&t[1]<1.2?s.MOSS:Math.abs(Math.sin(t[0]*22+t[2]*22))>.9?s.NOSE:de(t,14)>.9?s.WOOD:void 0;nt(n,[0,.08,0],[1.9,.08,1.3],1,{courses:0,moss:.4});for(const t of[-1.1,1.1])n.box([0,t>0?.7:1,t],[1.6,t>0?.55:.85,.07],s.BARKD,{round:.02,group:2+(t>0?1:0),paint:e});for(const t of[-1.6,1.6])n.box([t,1,0],[.07,.85,1.1],s.BARKD,{round:.02,group:4,paint:e});n.box([1.6,.55,.1],[.3,.5,.25],s.NOSE,{group:4,cut:!0}),n.box([0,2.12,-.62],[1.7,.04,.7],s.BARKD,{dir:[1,0,0],up:[0,1,-.95],round:.01,group:5,paint:t=>Ce(Math.floor((t[0]+3)*2.5),9)<.35?s.MOSS:(t[0]+3)*10%1<.15?s.NOSE:void 0});for(let t=0;t<5;t++){const i=-1.4+t*.7;Ye(n,[i,1.85,1.1],[i,2.6,0],6,.035,s.BARKD,void 0)}n.box([0,2.6,0],[1.8,.04,.04],s.BARKD,{round:.02,group:6});for(const t of[-1.6,1.6])n.flat([t,2.18,0],[0,0,1],[0,1,0],1.15,.45,gr(s.BARKD,0,.2,t>0?1:2),{group:7,bend:.02});for(const t of[-1.75,1.75])n.chain([[t,2.6,0,.04],[t*1.08,2.95,0,.03],[t*1.04,3.15,0,.02]],s.BARKD,{group:8});n.box([0,2.95,0],[.55,.35,.55],s.BARKD,{round:.02,group:9,paint:e});for(const t of[-1,1])n.box([0,3.45,t*.35],[.65,.03,.42],s.BARKD,{dir:[1,0,0],up:[0,1,t*1.1],round:.01,group:10+(t>0?1:0),paint:i=>(i[0]+3)*12%1<.15?s.NOSE:de(i,6,3)<.2?s.MOSS:void 0});n.box([0,3.75,0],[.3,.2,.3],s.BARKD,{round:.02,group:12}),n.seg([0,3.9,0],[0,5.2,0],.3,.02,s.BARKD,{group:13,paint:t=>t[1]*12%1<.2?s.NOSE:void 0});for(let t=0;t<4;t++)n.box([-.8+t*.5,.12,1.55+Ce(t)*.3],[.3,.03,.06],s.BARKD,{dir:[1,0,Ce(t,2)-.5],round:.01,group:14+t%2});ht(n,[-1.6,.2,1.15],[-1,1.5,1.15],16,93),Pi(n,[.5,.16,.2],17,1.2),ge(n,18,2.6,18,94)}},"parish-church":{desc:"a stone parish church: a roofless nave with empty pointed windows, its gables still standing, a square tower with broken battlements",halves:1,split:2.6,build(n){nt(n,[0,1.9/2,-.95],[2,1.9/2,.14],1,{courses:6});for(const[a,o,l]of[[-2,-.4,1.9],[-.4,.5,.9],[.5,2,1.5]])nt(n,[(a+o)/2,l/2,.95],[(o-a)/2,l/2,.14],2,{courses:6});for(const a of[-1.3,.2,1.3])Mn(n,[a,1.15,-.95],.17,.35,2,1,{pointed:!0}),a!==.2&&Mn(n,[a,a>1?.95:1.15,.95],.17,a>1?.2:.35,2,2,{pointed:!0});nt(n,[2,1.9/2,0],[.14,1.9/2,.95+.14],3,{courses:6}),Mn(n,[2,1.3,0],.25,.45,0,3,{pointed:!0}),n.flat([2+.12,1.9+.55,0],[0,0,1],[0,1,0],.95+.14,.55,gr(s.STONE,5),{group:4,bend:.02});const r=-2-.55;nt(n,[r,2.2,0],[.6,2.2,.6],5,{courses:9});for(const a of[-.6,.6])for(const o of[r-.6,r+.6])nt(n,[o,1,a],[.1,1,.1],5,{courses:0});Mn(n,[r,3.6,.6],.14,.25,2,5,{pointed:!0}),Mn(n,[r+.6,3.6,0],.14,.25,0,5,{pointed:!0}),Mn(n,[r,.55,.6],.22,.4,2,5,{pointed:!0}),wa(n,r-.55,r+.6,4.4,.55,.07,6,1,.35),wa(n,r-.55,r+.6,4.4,-.55,.07,6,2,.2);for(let a=0;a<3;a++)Ye(n,[-1.2+a*1,.1,-.5+a*.3],[-.6+a*.9,.9,.2],7,.05,s.BARK2,void 0);ui(n,[0,0,.95+.3],12,.8,8,95),ht(n,[2,.1,.95+.15],[2-.2,1.6,.95+.15],11,96),ht(n,[r+.6,.1,.6],[r+.5,3.2,.62],12,97),ge(n,18,2.8,13,98)}},"baroque-church":{desc:"a baroque church: a pale curving facade with scrolls and a broken pediment, pilasters, and behind it a great dome cracked open to the sky",halves:1.1,split:2.8,build(n){const e=(i=4)=>r=>{const a=en(i,.1)(r);return a||(de(r,4,3)<.07?s.STRAW:void 0)};for(const i of[-1.4,1.4])n.box([0,1.1,i*.85],[1.3,1.1,.14],s.BELLY,{round:.03,group:1,paint:e()});n.box([-1.3,1.1,0],[.14,1.1,1.2],s.BELLY,{round:.03,group:1,paint:e()}),Mn(n,[0,1,-1.19],.2,.45,2,1),Mn(n,[-1.3,1,0],.2,.45,0,1),ln(n,[0,2.2,0],[0,2.75,0],1,s.BELLY,2,{paint:i=>(Math.atan2(i[2],i[0])*8/6.283%1+1)%1<.08?s.STONED:e(0)(i)}),n.seg([0,2.1,0],[0,2.85,0],.88,.88,s.STONED,{group:2,cut:!0}),ds(n,[0,2.75,0],1.02,3,s.STONE,{tall:.95,crack:[[.55,.6,.55],[.55,.7,.45],[1,.3,1]],paint:i=>(Math.atan2(i[2],i[0])*12/6.283%1+1)%1<.07?s.BELLY:de(i,5,6)<.2?s.MOSS:void 0});const t=1.35;n.box([0,1.25,t],[1.45,1.25,.16],s.BELLY,{round:.03,group:4,paint:e(5)}),Mn(n,[0,.6,t],.3,.6,2,4),Mn(n,[-.85,1.45,t],.14,.26,2,4),Mn(n,[.85,1.45,t],.14,.26,2,4);for(const i of[-1.35,-.55,.55,1.35])n.box([i,1.25,t+.17],[.07,1.2,.04],s.BELLY,{round:.02,group:5,paint:e(0)});n.box([0,2.6,t],[.75,.3,.15],s.BELLY,{round:.03,group:6,paint:e(0)});for(const i of[-1,1])n.ell([i*.95,2.45,t],[.28,.22,.1],s.BELLY,{group:7,paint:r=>Math.abs(Math.hypot(r[0]-i*.95,r[1]-2.45)-.14)<.03?s.STONED:e(0)(r)});n.flat([-.3,3.08,t+.02],[1,0,0],[0,1,0],.75,.2,gr(s.BELLY,0,.45,3),{group:8,bend:.02}),n.ell([1.7,.2,1],[.25,.18,.25],s.STONE,{group:9,paint:en(0,.4)}),n.seg([1.6,.2,.7],[2.1,.25,1.4],.1,.06,s.STONE,{group:9}),ui(n,[.6,0,.3],10,.7,10,99),ht(n,[-1.45,.1,t+.2],[-1.2,2.2,t+.2],13,100),ht(n,[1.3,2.2,-.5],[.6,3.5,-.2],14,101),ge(n,18,2.8,15,102)}},"coptic-basilica":{desc:"a domed Coptic basilica: whitewashed walls, a row of small domes, a rounded apse, a square bell tower with arched openings; one dome fallen in",halves:.9,split:2.6,build(n){const e=(i=0)=>r=>{const a=en(i,.08)(r);return a||(de(r,3,5)<.07?s.STRAW:void 0)};for(const i of[-1,1])n.box([0,i>0?.7:.9,i],[1.8,i>0?.7:.9,.13],s.BELLY,{round:.03,group:1+(i>0?1:0),paint:e()});for(const i of[-1,0,1])Mn(n,[i,1.1,-1],.14,.2,2,1),i&&Mn(n,[i,.9,1],.14,.2,2,2);n.box([1.8,.9,0],[.13,.9,1],s.BELLY,{round:.03,group:3,paint:e()}),Mn(n,[1.8,.55,0],.25,.35,0,3),n.seg([-1.8,0,0],[-1.8,1.6,0],.95,.95,s.BELLY,{group:4,paint:e()}),n.box([-1.2,.8,0],[.6,1,1.2],s.BELLY,{group:4,cut:!0}),n.seg([-1.8,.1,0],[-1.8,1.7,0],.82,.82,s.STONED,{group:4,cut:!0}),ds(n,[-1.8,1.65,0],.95,5,s.BELLY,{paint:e()}),n.box([-1.3,1.6,0],[.5,1.2,1.2],s.STONED,{group:5,cut:!0});for(const[i,r]of[[-.9,0],[0,1],[.9,0]]){if(r){ui(n,[i,0,0],8,.5,6,103);continue}ln(n,[i,1.8,-.2],[i,2.1,-.2],.45,s.BELLY,7+Math.round(i),{paint:e()}),ds(n,[i,2.1,-.2],.45,10+Math.round(i),s.BELLY,{paint:e()})}const t=[2.5,0,-.7];nt(n,v.add(t,[0,1.7,0]),[.4,1.7,.4],13,{mat:s.BELLY,courses:0,paint:e(0)});for(const[i,r,a]of[[0,.4,2],[.4,0,0]])for(const o of[2.6,3.05])Mn(n,v.add(t,[i,o,r]),.1,.16,a,13);ds(n,v.add(t,[0,3.4,0]),.38,14,s.BELLY,{paint:e()}),n.seg(v.add(t,[0,3.75,0]),v.add(t,[0,3.95,0]),.04,.02,s.STONE,{group:14}),ht(n,[1.8,.1,1.05],[1.4,1.3,1.05],15,104),ht(n,v.add(t,[-.4,.1,.4]),v.add(t,[-.3,2.2,.42]),16,105),ge(n,18,2.8,17,106)}},"pagoda-temple":{desc:"a tiered wooden temple on a stone plinth: three roofs with upturned eaves, red-lacquered posts faded to brown; its top tier leaning and its spire fallen beside it",split:2.2,build(n){nt(n,[0,.12,0],[1.4,.12,1.2],1,{courses:0,moss:.35});for(let r=0;r<3;r++)nt(n,[0,.04+r*.08,1.25+(2-r)*.12],[.5,.04+r*.04,.1],1,{courses:0});const e=(r,a,o,l)=>{for(const u of[-a,a])for(const f of[-a*.85,a*.85])n.seg([u,r,f],[u,r+o,f],.06,.06,s.ACCENT,{group:l,paint:d=>de(d,10)<.3?s.BARK2:void 0});n.box([0,r+o*.5,-a*.8],[a*.95,o*.5,.04],s.WOOD,{round:.01,group:l,paint:ft(7,.2)});const c=u=>Math.abs(Math.sin(Math.atan2(u[2],u[0])*18))>.85?s.NOSE:de(u,4,l)<.22?s.MOSS:void 0,h=a+.5;n.ell([0,r+o+.06,0],[h*1.05,.06,h*1.05],s.JACKET,{group:l+1,paint:c}),n.ell([0,r+o+.08,0],[h*.78,.34,h*.78],s.JACKET,{group:l+1,paint:c}),n.box([0,r+o-.3,0],[h*1.2,.36,h*1.2],s.NOSE,{group:l+1,cut:!0}),n.ell([0,r+o+.06,0],[h*1.05,.05,h*1.05],s.JACKET,{group:l+3,paint:c});for(const u of[-1,1])for(const f of[-1,1])n.seg([u*h*.6,r+o+.08,f*h*.6],[u*h*.85,r+o+.24,f*h*.85],.05,.015,s.JACKET,{group:l+2})};e(.24,.95,1,2),e(1.85,.65,.65,6);const t=Vt(n);e(0,.5,.45,14),Yt(n,t,{roll:.14,at:[.1,3.08,0]});const i=Vt(n);n.seg([0,0,0],[0,1,0],.06,.02,s.FRAME,{group:18,paint:Ue(.6,0)});for(let r=0;r<4;r++)n.ell([0,.25+r*.18,0],[.12-r*.02,.025,.12-r*.02],s.FRAME,{group:18,paint:Ue(.6,0)});Yt(n,i,{roll:1.45,yaw:.5,at:[1.8,.1,1.1]}),ht(n,[-.95,.25,.8],[-.8,1.5,.85],19,107),ge(n,16,2.4,20,108)}},stupa:{desc:"a stupa: a great domed mound on square terraces, its spire of rings broken, a tree rooted in its dome",split:2.4,build(n){nt(n,[0,.15,0],[1.6,.15,1.6],1,{courses:0,moss:.35}),nt(n,[0,.42,0],[1.3,.12,1.3],1,{courses:0,moss:.35}),ln(n,[0,.54,0],[0,.8,0],1.1,s.BELLY,2,{paint:en(0,.3)}),n.ell([0,.8,0],[1.05,1,1.05],s.BELLY,{group:3,paint:e=>de(e,9,2)<.16?s.MOSS:de(e,14,5)<.06?s.STONED:void 0}),n.box([0,.3,0],[1.2,.5,1.2],s.BELLY,{group:3,cut:!0}),nt(n,[0,1.92,0],[.22,.14,.22],4,{mat:s.BELLY,courses:0});for(let e=0;e<4;e++)ln(n,[0,2.06+e*.17,0],[0,2.12+e*.17,0],.2-e*.035,s.STONE,5,{paint:en(0,.3)});n.seg([0,2.06,0],[0,2.7,0],.04,.03,s.STONE,{group:5});for(let e=0;e<3;e++)ln(n,[1.6+e*.25,.05,.9-e*.3],[1.6+e*.25,.11,.9-e*.3],.14-e*.02,s.STONE,6+e);n.chain([[-.55,1.4,.5,.07],[-.75,2,.6,.05],[-.8,2.4,.5,.03]],s.TRUNK,{group:9,rough:.01}),nc(n,[-.8,2.5,.5],[.45,.32,.4],10),n.chain([[-.55,1.4,.5,.04],[-.3,.9,.9,.03],[-.1,.6,1.1,.02]],s.TRUNK,{group:9}),ge(n,18,2.6,11,109)}},"greek-temple":{desc:"a Greek temple: a stepped base, a peristyle of fluted columns, some fallen in drums, a broken architrave and the corner of a pediment",halves:.9,split:2.4,build(n){for(let r=0;r<3;r++)nt(n,[0,.06+r*.12,0],[2.4-r*.12,.06,1.4-r*.12],1,{mat:s.BELLY,courses:0,moss:.25});const e=.36,t=1.9,i=[];for(let r=0;r<7;r++)for(const a of[-1.05,1.05])i.push([-1.95+r*.65,a]);for(const r of[-1.95,1.95])for(const a of[-.35,.35])i.push([r,a]);i.forEach(([r,a],o)=>{const l=Ce(o,11),c=l<.22,h=l>.8;c||Is(n,[r,e,a],h?t*(.35+Ce(o,12)*.3):t,.15,2+(a>0?1:0),{capital:!h})}),nt(n,[-1.3,e+t+.2,-1.05],[.85,.12,.17],4,{mat:s.BELLY,courses:0}),nt(n,[-1.95,e+t+.2,0],[.17,.12,1],4,{mat:s.BELLY,courses:0}),n.flat([-2.05,e+t+.65,-.25],[0,0,1],[0,1,0],.85,.33,(r,a)=>r>.3-a*.2?null:gr(s.BELLY,0)(r,a),{group:5,bend:.02}),nt(n,[.2,.65,-.3],[.6,.3,.1],6,{mat:s.BELLY,courses:3});for(let r=0;r<4;r++)n.seg([.3+r*.38,.55,1.6+r*.05],[.3+r*.38+.3,.55,1.62+r*.05],.15,.15,s.BELLY,{group:7+r%2,paint:en(0,.3)});ht(n,[-1.95,e,1.2],[-1.9,1.8,1.2],9,110),ge(n,18,2.8,10,111)}}},xx={"curtain-wall":{desc:"a stretch of curtain wall, its battlements gapped, arrow slits, ivy up its face",split:2.2,build(n){nt(n,[0,1.25,0],[1.7,1.25,.3],1,{courses:8}),wa(n,-1.7,1.7,2.5,0,.3,2,3);for(const e of[-.9,.2,1.1])n.box([e,1.3,.3],[.04,.25,.4],s.NOSE,{group:1,cut:!0});ui(n,[0,0,.7],8,.9,3,112),ht(n,[-1.4,0,.32],[-1,2.3,.32],6,113),ge(n,14,2,7,114)}},"curtain-wall-breach":{desc:"a curtain wall breached: a ragged gap down to the ground, its stones spilled out",split:2.2,build(n){for(const[e,t]of[[-1.15,2.5],[1.2,1.9]])nt(n,[e,t/2,0],[.55,t/2,.3],1,{courses:8});wa(n,-1.7,-.6,2.5,0,.3,2,4),nt(n,[0,.2,0],[.6,.2,.3],3,{courses:2});for(let e=0;e<5;e++)nt(n,[-.5+e*.25,.35+Ce(e)*.2,-.05],[.12,.12+Ce(e,2)*.1,.25],4,{courses:0});ui(n,[0,0,.9],16,1.3,5,115),ge(n,14,2.2,8,116)}},"round-tower":{desc:"a round tower, hollow and roofless, its top broken off on a slant, arrow slits round it",split:2.4,build(n){n.seg([0,0,0],[0,4.2,0],1,1,s.STONE,{group:1,rough:.01,paint:en(9,.18)}),n.seg([0,.3,0],[0,5,0],.78,.78,s.STONED,{group:1,cut:!0}),n.box([0,4.5,0],[1.6,.8,1.6],s.STONED,{dir:[1,.45,.2],group:1,cut:!0}),n.box([0,-.8,0],[1.4,.8,1.4],s.STONED,{group:1,cut:!0});for(const[e,t]of[[.4,1.2],[1.6,2.2],[-.6,2.6],[.9,3.2]])n.box([Math.cos(e)*1,t,Math.sin(e)*1],[.6,.22,.035],s.NOSE,{dir:[Math.cos(e),0,Math.sin(e)],group:1,cut:!0});Mn(n,[.25,.5,1],.22,.35,2,1),ui(n,[1.3,0,.6],12,.9,3,117),ht(n,[-.8,0,.6],[-.6,3,.75],6,118),ht(n,[.3,0,.97],[.5,2,.9],7,119),ge(n,14,2,8,120)}},gatehouse:{desc:"a gatehouse: two square towers and the arch between, its portcullis fallen flat in the gateway",split:2.6,build(n){for(const t of[-1.25,1.25])nt(n,[t,1.6,0],[.6,1.6,.65],1+(t>0?1:0),{courses:10}),wa(n,t-.6,t+.6,3.2,.55,.08,3,t>0?5:6,.3),n.box([t,1.8,.65],[.04,.25,.3],s.NOSE,{group:1+(t>0?1:0),cut:!0});nt(n,[0,2.45,0],[.7,.4,.55],4,{courses:3}),n.ell([0,2.05,0],[.66,.35,.8],s.STONED,{group:4,cut:!0});const e=Vt(n);for(let t=0;t<7;t++)Ye(n,[-.55+t*.18,0,0],[-.55+t*.18,0,1.5],5,.03,s.JACKET);for(let t=0;t<6;t++)Ye(n,[-.6,0,t*.28],[.6,0,t*.28],5,.03,s.JACKET);Yt(n,e,{roll:-.08,at:[0,.06,-.2]}),ui(n,[0,0,1.4],10,.8,6,121),ht(n,[-1.85,0,.66],[-1.6,2.8,.66],9,122),ge(n,14,2.4,10,123)}},"steps-to-nowhere":{desc:"a stone stair climbing the stub of a fallen wall and ending in the air",build(n){nt(n,[-.3,.9,-.35],[1,.9,.25],1,{courses:6});for(let e=0;e<8;e++)nt(n,[-1.1+e*.23,(.2+e*.2)/2,0],[.12,(.2+e*.2)/2,.3],2,{courses:0,moss:.35});ui(n,[1,0,.3],8,.6,3,124),ge(n,12,1.8,6,125)}},rubble:{desc:"a heap of fallen dressed stone, grass and a sapling through it",build(n){ui(n,[0,0,0],22,1,1,126),n.seg([.2,0,.1],[.25,1.1,.1],.03,.02,s.TRUNK,{group:4}),nc(n,[.25,1.2,.1],[.3,.22,.25],5),ge(n,12,1.4,6,127)}}},_x={column:{desc:"a fluted marble column still standing, its capital chipped",split:2,build(n){Is(n,[0,0,0],2.5,.2,1),ht(n,[-.18,0,.1],[-.1,1.4,.18],3,128),ge(n,8,.8,4,129)}},"column-broken":{desc:"a column snapped off at a man's height, its top jagged",build(n){Is(n,[0,0,0],1.1,.2,1,{capital:!1}),n.ell([.05,1.1,0],[.18,.1,.18],s.BELLY,{group:1,rough:.03}),ge(n,8,.8,4,130)}},"column-drums":{desc:"a column fallen in a line of drums, its capital at the end",build(n){for(let e=0;e<4;e++)n.seg([-1.2+e*.62,.2,(Ce(e)-.5)*.12],[-.75+e*.62,.2,(Ce(e+1)-.5)*.12],.2,.2,s.BELLY,{group:1+e%2,paint:t=>Math.abs(Math.sin(Math.atan2(t[2],t[1]-.2)*9))>.9?s.STONED:en(0,.3)(t)});n.box([1.4,.12,0],[.28,.12,.28],s.BELLY,{round:.02,group:3,dir:[1,0,.3],paint:en(0,.4)}),ge(n,10,1.5,4,131)}},"pediment-fragment":{desc:"a fallen corner of pediment, its moulding still crisp, half in the grass",build(n){const e=Vt(n);n.box([0,0,0],[1,.12,.3],s.BELLY,{round:.02,group:1,paint:en(0,.3)}),n.flat([0,.5,0],[1,0,0],[0,1,0],1,.38,(t,i)=>t<-.1+i*.3?null:gr(s.BELLY,0)(t,i),{group:2,bend:.02}),Yt(n,e,{roll:-.5,yaw:.3,at:[0,.15,0]}),ge(n,10,1.3,3,132)}},"mosaic-floor":{desc:"a mosaic floor: a border of waves round a ring of rosettes, tesserae lost in patches, grass through the cracks",decal:!0,build(n){n.box([0,.015,0],[2.4,.015,1.8],s.BELLY,{round:.01,group:1,paint:i=>{const r=i[0],a=i[2],o=Math.floor(r*14),l=Math.floor(a*14);if(de(i,1.6,9)<.18||Math.abs(Math.sin(r*1.6+.5)*.7-a*.6)<.02)return de(i,12)<.5?s.LEAF2:s.BARK2;if((o+l)%7===0&&Ce(o,l)<.3)return s.STONED;const c=2.4-Math.abs(r),h=1.8-Math.abs(a),u=Math.min(c,h);if(u<.12)return s.STONED;if(u<.42)return Math.sin((c<h?r:a)*9)*.12+.27>u?s.HAT1:s.BELLY;const f=Math.hypot(r,a*1.2),d=Math.atan2(a,r);return Math.abs(f-1)<.06?s.ACCENT:f<.5?Math.abs(Math.sin(d*4))*.4>f-.1?s.STRAW:f<.1?s.ACCENT:s.BELLY:(o+l)%2===0&&f<1?s.STRAW:void 0}});for(let i=0;i<8;i++)n.ell([(Ce(i,50)-.5)*4,.06,(Ce(50,i)-.5)*3],[.08,.06,.08],s.LEAF2,{group:2+i%3})}},"statue-headless":{desc:"a draped statue on its plinth, its head long gone, one arm broken at the elbow",build(n){nt(n,[0,.3,0],[.38,.3,.32],1,{mat:s.BELLY,courses:0}),n.seg([0,.6,0],[0,1.6,0],.3,.19,s.BELLY,{group:2,rough:.006,paint:e=>Math.abs(Math.sin(e[0]*18+e[1]*3))>.92?s.STONED:de(e,6,3)<.12?s.MOSS:void 0}),n.ell([0,1.62,0],[.24,.14,.16],s.BELLY,{group:2}),n.seg([0,1.7,0],[0,1.78,0],.08,.07,s.BELLY,{group:3,paint:e=>e[1]>1.75?s.STONED:void 0}),n.seg([.22,1.6,.05],[.3,1.3,.15],.07,.06,s.BELLY,{group:4}),n.seg([-.22,1.6,0],[-.3,1.15,.05],.07,.06,s.BELLY,{group:4}),n.seg([-.3,1.15,.05],[-.2,1,.25],.06,.05,s.BELLY,{group:4}),n.seg([.6,.06,.5],[.85,.07,.7],.06,.05,s.BELLY,{group:5}),ht(n,[-.38,0,.32],[-.2,1.2,.32],6,133),ge(n,10,1,7,134)}},"arch-ruin":{desc:"a single arch of a fallen arcade, its keystone slipped",split:2.2,build(n){for(const e of[-1,1])nt(n,[e,1,0],[.25,1,.3],1,{mat:s.BELLY,courses:5});for(let e=0;e<=8;e++){const t=Math.PI*(1-e/8),i=[Math.cos(t)*1,2+Math.sin(t)*.85-(e===4?.12:0),0];nt(n,i,[.2,.14,.3],2+e%2,{mat:s.BELLY,courses:0,dir:[-Math.sin(t),Math.cos(t),0]})}nt(n,[-.4,3,0],[.8,.1,.32],4,{mat:s.BELLY,courses:0}),ui(n,[.8,0,.6],8,.6,5,135,s.BELLY),ht(n,[-1.2,0,.3],[-.9,2.2,.3],8,136),ge(n,12,1.8,9,137)}}},Jh=[...Object.entries(px).map(([n,e])=>({id:n,family:"cemetery",...e})),...Object.entries(gx).map(([n,e])=>({id:n,family:"carpark",...e})),...Object.entries(mx).map(([n,e])=>({id:n,family:"scrap",...e})),...Object.entries(Mx).map(([n,e])=>({id:n,family:"worship",...e})),...Object.entries(xx).map(([n,e])=>({id:n,family:"castle",...e})),...Object.entries(_x).map(([n,e])=>({id:n,family:"classical",...e}))],vx=Jh.flatMap(n=>{const e={size:1,split:null,...n};return n.halves?["far","near"].map(t=>({...e,id:`${n.id}-${t}`,building:n.id,half:t,offset:t==="far"?-n.halves:n.halves,desc:`${n.desc} (its ${t} half)`,build:bx(n.build,t==="near",t==="far"?-n.halves:n.halves)})):[e]});Object.fromEntries(vx.map(n=>[n.id,n]));const Tu=Object.fromEntries(Jh.filter(n=>n.halves).map(n=>[n.id,n.halves]));function bx(n,e,t){return i=>{const r=new st({blend:.04});n(r);const a=l=>l.type==="cone"?(l.a[2]+l.b[2])/2:l.c[2],o=l=>[l[0],l[1],l[2]-t];for(const l of r.parts)if(a(l)>0===e){if(l.type==="cone"?(l.a=o(l.a),l.b=o(l.b)):l.c=o(l.c),l.paint){const c=l.paint;l.paint=(h,u)=>c([h[0],h[1],h[2]+t],u)}l.group+=100,i.parts.push(l)}for(const l of r.flats)l.c[2]>0===e&&(l.c=o(l.c),i.flats.push(l))}}const Sx={"farmyard-corner":{desc:"an abandoned farmyard corner: the tractor sunk in moss, bales gone to mould, a broken fence, a trough, churns and a barrow",suits:["meadow","grassland","honeysuckle-tangle","muddy-forest"],pieces:[["tractor",0,0],["hay-round",2.8,-1.3],["hay-round-mouldy",3.7,.1],["fence",-1.3,-2.5],["fence-broken",1,-2.6],["trough",-2.5,1.2],["milk-churn",1.9,1.8],["milk-churn",2.25,2.1],["milk-churn",1.7,2.35,"left"],["wheelbarrow",-.7,2.3,"left"]]},"bus-stop":{desc:"a bus stop on a road long gone: the shelter, its stop sign, a bench, a lamppost still flickering warm, a heap of bin bags",suits:["grassland","meadow","twiggy-forest","wispy-forest"],pieces:[["bus-shelter",0,0],["bus-stop-sign",1.9,.6],["bench",-2.4,.8],["lamppost-lit",-1.9,-.4],["bin-bags",2.5,-.7],["litter-bin",1.3,1.3]]},"picnic-gone-wild":{desc:"a picnic left behind and gone wild: a rotting table, the blanket with mushrooms through it, a hamper, a clump of glowing fungi",suits:["bluebell-glade","old-oaks","log-pile","meadow"],pieces:[["picnic-table",0,-.7],["picnic-blanket",.5,.9],["hamper",-1.2,.8],["fungi-glow",1.5,.2],["camp-chair",-1.5,-.4,"left"]]},"allotment-feral":{desc:"an allotment gone feral: a shed with its door hanging, beds bolted to seed, a bean wigwam, a compost bay, a scarecrow",suits:["garden","honeysuckle-tangle","meadow"],pieces:[["garden-shed",-1.7,-1.7],["raised-bed",.6,-.9],["raised-bed",.8,.6,"left"],["bean-wigwam",2.5,-.6],["compost-heap",-1.9,1],["watering-can",-.4,1.9],["scarecrow",2.7,1.5]]},"lay-by":{desc:"a lay-by: a car still parked, a snack trailer shuttered, a litter bin, a picnic table, cones and a sign",suits:["grassland","twiggy-forest","norway","wispy-forest"],pieces:[["car-parked",0,0],["snack-van",-3.3,-1.4],["litter-bin",2.2,-.9],["picnic-table",2.7,1],["relic:cones",-1.3,1.7],["sign-round",-3,1.4]]},"festival-remnants":{desc:"festival remnants: tent frames with rags of fabric, faded bunting, a cold fire pit, crates, a camp chair, glow sticks still glowing",suits:["meadow","heath","grassland","bluebell-glade"],pieces:[["bunting",0,-2.3],["tent-frame",-1.6,-.7],["tent-frame",.9,-1.3,"left"],["fire-pit",.4,.6],["crates",-1.9,1.2],["camp-chair",1.7,.1,"left"],["glow-sticks",1.2,1.5]]},"woodcutters-clearing":{desc:"a woodcutter's clearing: a woodpile, a chopping block with the axe left in it, a sawhorse, sawn stumps, a barrow",suits:["log-pile","old-oaks","alder-forest","norway","old-pinewood"],pieces:[["log-pile",-1.4,-1.1],["chopping-block",.4,.2],["sawhorse",1.9,-.9],["stumps",-.9,1.4],["stumps",2.1,1.2,"left"],["wheelbarrow",-2.5,.5]]},"fly-tip":{desc:"a fly-tip in the bracken: a sofa, a washing machine, a mattress, bin bags, a pile of tyres",suits:["fern-forest","muddy-forest","tangly-forest","berry-thicket"],pieces:[["relic:sofa",0,-.6],["relic:washing-machine",1.7,-.7],["mattress",-1.5,.6],["bin-bags",.6,.9],["tyre-pile",2.3,.7]]},apiary:{desc:"an abandoned apiary: hives askew, one roof slid off, a bench and a water butt",suits:["meadow","heath","honeysuckle-tangle","garden"],pieces:[["beehive",-1.1,-.5],["beehive",.2,-.9,"left"],["beehive",1.3,-.2],["bench",-.4,1.2],["water-butt",2.2,1]]},"hay-bales":{desc:"bales left in a field: round bales, one gone black, a slumping stack of square ones",suits:["meadow","grassland","heath","moor"],pieces:[["hay-round",-1.3,0],["hay-round-side",.2,-.9],["hay-round",1.5,.2,"left"],["hay-stack",-.2,1.3],["hay-round-mouldy",2.6,-1.1],["hay-square-mouldy",1.6,1.6]]},"fence-line":{desc:"a run of field fence: whole sections, a broken one, a gate hanging open, one leaning over",suits:["meadow","grassland","moor","heath","honeysuckle-tangle"],pieces:[["fence",-4.3,0],["fence",-2.2,0],["fence-broken",-.1,0],["gate",1.05,0],["fence-leaning",4.3,.05]]},"road-signs":{desc:"where a road forked: signs leaning every way, a dark lamppost, a cone",suits:["grassland","twiggy-forest","wispy-forest","rocky-slope"],pieces:[["sign-triangle",-.8,-.4],["sign-round",.6,-.7],["sign-blank",1.5,.4],["lamppost",-1.7,.3],["relic:cone",.3,.9]]},"scarecrow-field":{desc:"a field going back to forest: a scarecrow still standing guard, a plough in the grass, a mouldy bale, a broken fence",suits:["meadow","grassland","heath"],pieces:[["scarecrow",0,0],["plough",-2.1,.8],["hay-round-mouldy",2.1,-.8],["fence-broken",-.6,-2.1],["trailer",2.8,1.6,"left"]]}},Ru=(n,e,t,i,r,a=()=>!1,o=[n])=>r.flatMap((l,c)=>{const h=[];for(let u=e,f=0;u<=t+1e-6;u+=i,f++)a(u,l)||h.push([o[(f*7+c*3)%o.length],+(u+((f*37+c*11)%5-2)*.04).toFixed(2),+(l+((f*13+c*7)%5-2)*.05).toFixed(2),(f+c)%3?void 0:"left"]);return h}),Cu=["headstone","headstone","headstone-lean","grave-cross","headstone-sunk","headstone"],Ex={cemetery:{desc:"a cemetery gone back to the wood: rows of leaning headstones and crosses, a stone angel, a mausoleum, iron railings round an old plot, a lychgate, a yew, a lantern or two still flickering",suits:["old-oaks","holly-thicket","ancient","deadwood","wispy-forest"],pieces:[["lychgate",0,4.4],["mausoleum",-3.4,-3.4],["yew",3.6,-3.2],["stone-angel",.2,-.7],["obelisk",2.6,1],...Ru("headstone",-3.6,3.6,.9,[-1.9,.5,2.4],(n,e)=>Math.abs(n-.2)<.9&&Math.abs(e+.7)<1.5||Math.abs(n-2.6)<.6&&Math.abs(e-1)<.8||n<-2.3&&e>1.5,Cu),["iron-railing",-3.4,1.4],["iron-railing",-3.4,3.3],["grave-lantern",-1.7,.7],["grave-lantern",1,2.6]]},"car-park":{desc:"a car park lost in the trees: cracked tarmac and faded bays, cars where they were left (one with a tree through it), a ticket machine, a snapped barrier, lampposts, trolleys",suits:["grassland","twiggy-forest","norway","wispy-forest"],pieces:[["carpark-tarmac",0,0],["car-parked",-2.7,-1.8],["car-parked",1.7,1.9,"left"],["car-bonnet-up",3.6,-1.8],["relic:van-tree",-1,2],["ticket-machine",5,.3],["barrier",-6.2,.4],["lamppost",-4.8,-3.1],["lamppost",4.6,-3.2,"left"],["relic:trolley-tipped",.6,-1.3],["relic:trolley-nest",4.4,2.5]]},"scrap-yard":{desc:"a scrap yard: stacks of crushed cars, tyre piles, a grab crane with its arm still up, oil drums, a chain-link fence torn open, a corrugated shack",suits:["muddy-forest","deadwood","rocky-slope","tangly-forest"],pieces:[["crushed-cars",-2.8,-2.1],["crushed-cars",-1,-2.8,"left"],["grab-crane",1.4,-1.6],["shack",3.8,-.4],["tyre-pile",-3.2,.8],["tyre-pile",2.2,1.8,"left"],["oil-drums",.2,.9],["relic:car-on-side",-1,2.1],["relic:court-fence",-3,3.6],["relic:court-fence",.2,3.7,"left"]]},"stave-church":{desc:"a ruined wooden stave church in a clearing, its nave open to the sky and its spire still up, a few sunken graves round it",suits:["norway","old-pinewood","fern-forest","rocky-slope"],pieces:[["@stave-church",0,0],["headstone-sunk",-2.8,1.8],["grave-cross",-2,2.6,"left"],["headstone-lean",2.9,2],["yew",3.8,-2.6]]},"parish-church":{desc:"a roofless stone parish church with its square tower, a churchyard of leaning stones, a yew by the gate",suits:["old-oaks","bluebell-glade","meadow","ancient"],pieces:[["@parish-church",0,0],["yew",3.6,2.4],...Ru("headstone",-2.6,1.6,1.05,[2.6],()=>!1,Cu),["grave-cross",2.6,-2.2],["headstone-sunk",-.8,-2.4]]},"baroque-church":{desc:"a baroque church with its dome cracked open, its fallen lantern in the grass, a stone angel and rubble before its facade",suits:["garden","old-oaks","ancient"],pieces:[["@baroque-church",0,0],["stone-angel",-2.6,2.6,"left"],["rubble",2.4,2.8],["column-broken",3.3,.6]]},"coptic-basilica":{desc:"a domed Coptic basilica, one dome fallen in, its bell tower standing, rubble round it",suits:["rocky-slope","heath","grassland","cave-mouth"],pieces:[["@coptic-basilica",0,0],["rubble",-1,2.4],["rubble",3.4,1.6,"left"],["decor:split",-3.4,1.8]]},"pagoda-temple":{desc:"a tiered wooden temple on its plinth, its top tier leaning and its spire fallen, mossed rocks round it",suits:["bluebell-glade","fern-forest","ravine","stream"],pieces:[["pagoda-temple",0,0],["decor:pair",-2.8,1.6],["decor:rock",2.9,-1.4],["rubble",-2.4,-1.8,"left"]]},stupa:{desc:"a stupa on its terraces with a tree rooted in its dome, its spire's rings fallen at its foot, standing stones near",suits:["heath","moor","rocky-slope","grassland"],pieces:[["stupa",0,0],["decor:standing-rock",-3.2,-1],["decor:pair",3,1.8,"left"]]},"greek-temple":{desc:"a Greek temple on its stepped base, a peristyle of columns half fallen, drums in the grass, a headless statue",suits:["meadow","grassland","garden","heath"],pieces:[["@greek-temple",0,0],["column-drums",1.6,2.9],["statue-headless",-3.4,2.3],["pediment-fragment",3.8,-1.6,"left"]]},"castle-ruins":{desc:"castle ruins: curtain walls (one breached), a round tower open to the sky, a gatehouse with its portcullis fallen, steps to nowhere, rubble",suits:["rocky-slope","moor","norway","deadwood","cave-mouth"],pieces:[["curtain-wall",-4.2,-1.2],["round-tower",-1.7,-2.6],["gatehouse",1.6,-2.3],["curtain-wall-breach",4.7,-1.4,"left"],["steps-to-nowhere",-3.4,2],["rubble",2.6,1.7],["rubble",-.4,1.2,"left"]]},"classical-ruins":{desc:"classical ruins: a row of columns, some fallen in drums, a pediment fragment, a cracked mosaic floor, a headless statue, a broken arch, and the statue's toppled head, its eyes still faintly lit",suits:["meadow","garden","grassland","ancient"],pieces:[["mosaic-floor",0,0],["column",-2.2,-2.3],["column",-.8,-2.4],["column-broken",.6,-2.3],["column",2,-2.4],["column-drums",1.8,2.4],["pediment-fragment",-2.8,2.1],["statue-headless",3.2,-.6],["arch-ruin",-4.4,-.6],["decor:statue-head",4,1.6,"left"]]}},yx=n=>n.flatMap(([e,t,i,r])=>e[0]==="@"?[[`${e.slice(1)}-far`,t,i-Tu[e.slice(1)],r],[`${e.slice(1)}-near`,t,i+Tu[e.slice(1)],r]]:[[e,t,i,r]]),wx=[...Object.entries(Sx).map(([n,e])=>({id:n,size:"small",...e})),...Object.entries(Ex).map(([n,e])=>({id:n,size:"large",...e,pieces:yx(e.pieces)}))];Object.fromEntries(wx.map(n=>[n.id,n]));const er=(n,e=0)=>{const t=Math.sin(n*127.1+e*311.7)*43758.5453;return t-Math.floor(t)},hn=(n,e,t=0)=>er(Math.floor(n[0]*e)+Math.floor(n[2]*e)*57+t,Math.floor(n[1]*e)),si=(n=.25,e=.15)=>t=>{const i=hn(t,16,3);return hn(t,6,5)<e&&t[1]>.1?s.MOSS:i>1-n*.7?s.BODY2:void 0},ai=(n,e,t,i,r=.025,a=s.FRAME)=>n.seg(e,t,r,r,a,{group:i,paint:si(.4,.05)}),Lu=(n,e,t,i)=>n.ell(e,t,s.STONE,{group:i,rough:.025,paint:r=>r[1]>e[1]+t[1]*.5&&hn(r,5,i)<.6?s.MOSS:hn(r,14)>.9?s.STONED:void 0}),cr=(n,e,t,i,r)=>{for(let a=0;a<e;a++){const o=er(r,a)*6.283,l=t*Math.sqrt(er(a,r));n.ell([Math.cos(o)*l,.07,Math.sin(o)*l*.7],[.07,.1+er(a,4)*.08,.07],s.LEAF2,{group:i+a%3,paint:c=>c[1]>.13?s.LEAF:void 0})}},Io=(n,e,t,i)=>n.ell(e,t,s.LEAF,{group:i,rough:.04,paint:r=>{const a=hn(r,10,2);return r[1]<e[1]-.15||a<.2?s.LEAF3:a>.8?s.LEAF2:void 0}}),fs=(n,e,t,i,r)=>{const a=[];for(let o=0;o<=4;o++)a.push([...v.add(v.lerp(e,t,o/4),[(er(r,o)-.5)*.12,0,.02]),.03]);n.chain(a,s.LEAF,{group:i,paint:o=>hn(o,30)<.3?s.LEAF2:void 0})};function Du(n,e,{pitch:t=0,roll:i=0,at:r=[0,0,0]}={}){const a=(u,f,d,p)=>{const g=Math.cos(f),x=Math.sin(f),m=[...u];return m[d]=u[d]*g-u[p]*x,m[p]=u[d]*x+u[p]*g,m},o=u=>a(a(u,i,1,2),t,0,1),l=u=>a(a(u,-t,0,1),-i,1,2),c=u=>v.add(o(u),r),h=u=>l(v.sub(u,r));for(const u of n.parts.slice(e))if(u.type==="cone"?(u.a=c(u.a),u.b=c(u.b)):(u.c=c(u.c),u.axes=u.axes.map(o)),u.paint){const f=u.paint;u.paint=(d,p)=>f(h(d),p)}}const Ax={"verge-post":{family:"prop",path:"tarmac",desc:"a road's verge post, leaning, its band faded",build(n){const e=n.parts.length;n.box([0,.4,0],[.06,.4,.06],s.BELLY,{round:.02,group:1,paint:t=>Math.abs(t[1]-.62)<.06?s.SHADES:si(.1,.2)(t)}),Du(n,e,{roll:.15,pitch:.1}),cr(n,4,.25,3,1)}},"cats-eye":{family:"prop",path:"tarmac",desc:"a cat's-eye stud in the road (unlit)",build(n){n.box([0,.02,0],[.09,.02,.05],s.SHADES,{round:.01,group:1});for(const e of[-.04,.04])n.ell([e,.04,.03],[.025,.015,.015],s.FRAME,{group:2})}},"stepping-stone":{family:"prop",path:"stepping",desc:"a stepping stone, flat-topped and mossy",build(n){Lu(n,[0,.08,0],[.38,.12,.3],1)}},"boardwalk-post":{family:"prop",path:"boardwalk",desc:"a boardwalk's post, standing in the water",build(n){n.seg([0,0,0],[0,.55,0],.06,.055,s.WOOD,{group:1,paint:e=>e[1]<.12?s.MOSS:e[1]>.5?s.BARK2:void 0})}},"sleeper-sapling":{family:"prop",path:"railway",desc:"a sapling grown up between the sleepers",build(n){n.seg([0,0,0],[0,.9,0],.025,.015,s.TRUNK,{group:1}),Io(n,[0,.95,0],[.22,.18,.2],2),cr(n,4,.2,3,2)}},"glow-mushrooms":{family:"prop",path:"magic",glow:!0,desc:"a cluster of softly glowing mushrooms",build(n){for(let e=0;e<4;e++){const t=[(er(e)-.5)*.3,0,(er(e,2)-.5)*.2],i=.08+er(e,3)*.1;n.seg(t,v.add(t,[0,i,0]),.015,.012,s.CLOTH,{group:1}),n.ell(v.add(t,[0,i+.02,0]),[.05,.03,.05],s.MAGIC,{group:2+e,paint:r=>r[1]>t[1]+i+.035?s.MAGIC2:void 0})}}},"fairy-stone":{family:"prop",path:"magic",glow:!0,desc:"a small fairy stone with a glowing rune",build(n){n.box([0,.18,0],[.09,.18,.06],s.STONE,{round:.04,group:1,paint:e=>e[2]>.04&&Math.abs(e[1]-.2)<.07&&Math.abs(e[0])<.025?s.RUNE:e[1]>.32?s.MOSS:void 0})}},"signal-post":{family:"prop",path:"railway",desc:"a rusty old signal post, its arm dropped (unlit)",build(n){ai(n,[0,0,0],[0,2.2,0],1,.04),n.box([.25,2,0],[.25,.05,.02],s.ACCENT,{dir:[1,-.6,0],group:2,paint:e=>e[0]>.38?s.BELLY:si(.4,0)(e)}),n.ell([0,2.05,.05],[.06,.06,.03],s.SHADES,{group:3}),fs(n,[0,0,.04],[.02,1.4,.04],4,3)}},stairs:{family:"piece",path:"stairs",desc:"a short flight of mossy stone stairs, for ruins and hollows",build(n){for(let e=0;e<5;e++)n.box([0,.1+e*.2,-e*.3],[.6,.1+e*.2,.15],s.STONE,{round:.03,rough:.01,group:1+e%2,paint:t=>t[1]>.16+e*.4&&hn(t,6,e)<.35?s.MOSS:hn(t,14)>.9?s.STONED:void 0});for(const e of[-.7,.7])Lu(n,[e,.3,-.6],[.15,.35,.7],5)}},"stairs-turn":{family:"piece",path:"stairs",desc:"stone stairs turning on a landing",build(n){for(let e=0;e<3;e++)n.box([0,.1+e*.2,-e*.3],[.5,.1+e*.2,.15],s.STONE,{round:.03,rough:.01,group:1+e%2,paint:t=>hn(t,6,e)<.3&&t[1]>.2+e*.4?s.MOSS:void 0});n.box([0,.35,-1.1],[.55,.35,.5],s.STONE,{round:.03,group:3,paint:e=>hn(e,6)<.3&&e[1]>.6?s.MOSS:void 0});for(let e=0;e<3;e++)n.box([.65+e*.3,.8+e*.2,-1.1],[.15,.1+e*.1,.5],s.STONE,{round:.03,group:4+e%2})}},"root-bridge":{family:"piece",path:"roots",desc:"a bridge of gnarled roots over a stream",build(n){n.ell([0,.01,0],[1.4,.015,.6],s.WATER,{group:1});for(let e=0;e<4;e++)n.chain([[-1.8,0,-.4+e*.27,.14],[-.8,.45,-.35+e*.25,.1],[.6,.5,-.3+e*.22,.1],[1.8,0,-.25+e*.2,.13]],s.TRUNK,{group:2+e%2,rough:.015,paint:t=>hn(t,12)<.12?s.BARKD:t[1]>.55&&hn(t,5)<.3?s.MOSS:void 0});Io(n,[-1.7,.25,-.5],[.3,.2,.25],5)}},footbridge:{family:"piece",path:"bridges",desc:"a little wooden footbridge over a stream",build(n){n.ell([0,.01,0],[1.2,.015,.7],s.WATER,{group:1});for(let e=-6;e<=6;e++){const t=e*.2,i=.35-t*t*.1;n.box([t,i,0],[.09,.03,.5],s.WOOD,{round:.01,group:2+(e&1),paint:r=>hn(r,10)<.15?s.MOSS:void 0})}for(const e of[-.5,.5]){for(const t of[-1.1,0,1.1])n.seg([t,.3-t*t*.1,e],[t,.85-t*t*.1,e],.03,.03,s.WOOD,{group:4});n.chain([[-1.1,.85-.121,e,.025],[0,.85,e,.025],[1.1,.85-.121,e,.025]],s.WOOD,{group:4})}}},"rope-bridge":{family:"piece",path:"bridges",desc:"a rope bridge over a stream, planks sagging, one missing",build(n){n.ell([0,.01,0],[1.3,.015,.7],s.WATER,{group:1});for(const e of[-1.6,1.6])for(const t of[-.45,.45])n.seg([e,0,t],[e,1.1,t],.05,.045,s.WOOD,{group:2});for(let e=-7;e<=7;e++){if(e===3)continue;const t=e*.2,i=.55-(1-(t/1.6)**2)*.3;n.box([t,i,0],[.08,.02,.38],s.WOOD,{round:.01,group:3+(e&1)})}for(const e of[-.45,.45])for(const t of[0,1]){const i=[];for(let r=0;r<=8;r++){const a=-1.6+r*.4,o=(t?1.05:.55)-(1-(a/1.6)**2)*(t?.25:.3);i.push([a,o,e,.015])}n.chain(i,s.STRAW,{group:5})}}},"goods-wagon":{family:"landmark",path:"railway",desc:"an abandoned goods wagon tipped on its side (no livery)",build(n){const e=n.parts.length;n.box([0,.75,0],[1.6,.65,.6],s.BODY2,{round:.05,group:1,paint:t=>(t[0]+9)*4%1<.08?s.SHADES:si(.6,.2)(t)});for(const t of[-1.1,1.1])for(const i of[-.55,.55])n.ell([t,.22,i],[.22,.22,.06],s.SHADES,{group:2,paint:r=>Math.hypot(r[0]-t,r[1]-.22)<.08?s.FRAME:void 0});Du(n,e,{roll:1.4,at:[0,.3,.3]}),cr(n,14,2.2,4,5),fs(n,[-1.2,0,1],[-.6,1,1.1],7,6)}},carriage:{family:"landmark",path:"railway",glow:!0,desc:"an old passenger carriage, mossy roof, a tree grown through it, its windows glowing",build(n){n.box([0,.95,0],[2.4,.65,.62],s.HAT1,{round:.08,group:1,paint:e=>Math.abs(e[2])>.58&&e[1]>1&&e[1]<1.35&&(e[0]+9)*1.6%1>.25?hn(e,9)<.2?s.SHADES:s.GLOW:si(.4,.15)(e)}),n.ell([0,1.62,0],[2.4,.14,.62],s.MOSS,{group:2,paint:e=>hn(e,6)<.3?s.LEAF2:void 0});for(const e of[-1.8,1.8])for(const t of[-.5,.5])n.ell([e,.25,t],[.24,.24,.06],s.SHADES,{group:3});n.chain([[.6,0,0,.2],[.6,1.8,0,.16],[.7,2.9,-.1,.09]],s.TRUNK,{group:4,rough:.015}),Io(n,[.7,3.1,-.1],[1,.6,.8],5),cr(n,16,2.8,6,7)}},platform:{family:"landmark",path:"railway",desc:"a little station platform, a bench and a lamp post (no name board)",build(n){n.box([0,.35,0],[2.4,.35,.7],s.STONE,{round:.02,rough:.008,group:1,paint:e=>e[2]>.62&&e[1]>.6?s.BELLY:e[1]>.66&&hn(e,5)<.25?s.MOSS:(e[0]+9)*2.5%1<.06?s.STONED:void 0}),n.box([-.6,.95,-.3],[.6,.04,.16],s.WOOD,{group:2}),n.box([-.6,1.2,-.44],[.6,.18,.03],s.WOOD,{group:2});for(const e of[-1.1,-.1])n.box([e,.82,-.3],[.04,.12,.14],s.FRAME,{group:2});ai(n,[1.4,.7,-.4],[1.4,2.4,-.4],3,.035),n.box([1.4,2.5,-.4],[.12,.12,.12],s.FRAME,{round:.03,group:4,paint:e=>Math.abs(e[1]-2.5)<.07?s.SHADES:void 0}),fs(n,[1.4,.7,-.36],[1.42,2.2,-.36],5,8),cr(n,10,2.4,6,9)}},"level-crossing":{family:"landmark",path:"railway",desc:"a level crossing's barrier post, its boom broken off and lying in the grass",build(n){n.box([0,.55,0],[.15,.55,.15],s.BELLY,{round:.03,group:1,paint:si(.3,.15)}),n.box([.6,1.05,0],[.6,.05,.04],s.BELLY,{group:2,paint:e=>(e[0]+9)*2.5%1<.5?s.ACCENT:si(.3,0)(e)}),n.box([1.6,.05,.4],[.7,.05,.04],s.BELLY,{dir:[1,0,.5],group:3,paint:e=>(e[0]+9)*2.5%1<.5?s.ACCENT:si(.3,.15)(e)}),ai(n,[-.5,0,0],[-.5,1.6,0],4,.03);for(const e of[-1,1])n.box([-.5,1.6,0],[.35,.04,.015],s.BELLY,{dir:[1,e,0],group:5});cr(n,10,1.6,6,10)}},"buffer-stop":{family:"landmark",path:"railway",desc:"a buffer stop at the end of the line: a timber beam on rusty posts, its buffers worn, grass round its short stub of track",build(n){for(const e of[-.45,.45])ai(n,[-.2,0,e],[0,.75,e],1,.05),ai(n,[.35,0,e],[0,.7,e],1,.04),n.seg([0,.62,e],[.22,.62,e],.07,.07,s.FRAME,{group:2,paint:si(.5,0)}),n.ell([.25,.62,e],[.03,.1,.1],s.SHADES,{group:2});n.box([0,.7,0],[.08,.1,.75],s.ACCENT,{round:.02,group:3,paint:e=>(e[2]+9)*4%1<.5?s.BELLY:si(.4,.1)(e)});for(const e of[-.3,.3])n.seg([.2,.03,e],[2,.03,e],.03,.03,s.SHADES,{group:4,paint:t=>t[1]>.05?s.FRAME:void 0});for(let e=0;e<4;e++)n.box([.5+e*.45,.02,0],[.07,.02,.45],s.WOOD,{group:5,paint:t=>hn(t,9)<.3?s.MOSS:void 0});cr(n,12,1.4,6,12)}},"signal-gantry":{family:"landmark",path:"railway",desc:"a rusty signal gantry spanning the line, its signals dark",build(n){for(const e of[-2,2])for(const t of[-.15,.15])ai(n,[e,0,t],[e,3,t],1,.04);for(let e=0;e<8;e++){const t=-2+e*.5;ai(n,[t,2.8,0],[t+.5,3.1,0],2,.02),ai(n,[t,3.1,0],[t+.5,2.8,0],2,.02)}for(const e of[2.8,3.1])ai(n,[-2,e,0],[2,e,0],3,.035);for(const e of[-.8,.8])ai(n,[e,2.8,.05],[e,2.3,.05],4,.02),n.box([e,2.2,.08],[.12,.2,.05],s.SHADES,{round:.03,group:5,paint:t=>Math.hypot(t[0]-e,t[1]-2.27)<.05||Math.hypot(t[0]-e,t[1]-2.13)<.05?s.FRAME:void 0});fs(n,[-2,0,.2],[-1.95,2.4,.2],6,11)}}},Tx=Object.entries(Ax).map(([n,e])=>({id:n,...e}));Object.fromEntries(Tx.map(n=>[n.id,n]));const ba=32,Pu=15,Ou=ba/2,Rx=(n,e)=>(n+.5-Ou)**2+(e+.5-Ou)**2<=Pu*Pu;Uint8Array.from({length:ba*ba},(n,e)=>Rx(e%ba,e/ba|0)?1:0);const Cx=[{k:"ambientHue",g:"Night light",label:"Twilight hue",min:0,max:1,step:.01,v:.68,hue:!0},{k:"ambient",g:"Night light",label:"Twilight brightness",min:.05,max:.6,step:.01,v:.22},{k:"moon",g:"Night light",label:"Moonlight",min:0,max:1,step:.01,v:.3},{k:"moonHue",g:"Night light",label:"Moon hue",min:0,max:1,step:.01,v:.58,hue:!0},{k:"glowHue",g:"Night light",label:"Witch glow hue",min:0,max:1,step:.01,v:.13,hue:!0},{k:"glowSat",g:"Night light",label:"Witch glow colour",min:0,max:1,step:.01,v:.35},{k:"glowRadius",g:"Night light",label:"Witch glow reach",min:30,max:200,step:5,v:110},{k:"glowPower",g:"Night light",label:"Witch glow strength",min:.3,max:2.5,step:.05,v:1.4},{k:"bands",g:"Shading",label:"Light steps",min:2,max:7,step:1,v:3},{k:"dither",g:"Shading",label:"Dithering",min:0,max:1,step:.05,v:.35},{k:"round",g:"Shading",label:"Roundness",min:.2,max:1.5,step:.05,v:.9},{k:"outline",g:"Shading",label:"Plant outline",options:["none","dark","tinted"],v:"none"},{k:"cOutline",g:"Shading",label:"Creature outline",options:["dark","tinted","none"],v:"dark"},{k:"shafts",g:"Night light",label:"Moonbeams",min:0,max:1,step:.05,v:.3},{k:"areaContrast",g:"Colour",label:"Difference between areas",min:0,max:1,step:.05,v:.6},{k:"sat",g:"Colour",label:"Saturation",min:.2,max:1.3,step:.01,v:.9},{k:"leafHue",g:"Colour",label:"Leaf hue",min:0,max:1,step:.01,v:.3,hue:!0},{k:"leafVariety",g:"Colour",label:"Leaf colour variety",min:0,max:1,step:.05,v:.3},{k:"trunkHue",g:"Colour",label:"Bark hue",min:0,max:1,step:.01,v:.07,hue:!0},{k:"groundHue",g:"Colour",label:"Ground hue",min:0,max:1,step:.01,v:.27,hue:!0},{k:"groundVal",g:"Colour",label:"Ground brightness",min:.15,max:.7,step:.01,v:.4},{k:"pixel",g:"Shading",label:"Pixel size",min:1,max:5,step:1,v:3},{k:"treeSize",g:"Trees",label:"Tree height",min:.5,max:1.5,step:.05,v:.85},{k:"crownWidth",g:"Trees",label:"Crown width",min:1,max:4,step:.1,v:3},{k:"clearing",g:"Trees",label:"Clearing size",min:0,max:1,step:.05,v:.55},{k:"depth",g:"Map",label:"Border detail (fractal layers)",min:0,max:6,step:1,v:4},{k:"areaScale",g:"Map",label:"Area size (screens)",min:.6,max:2,step:.05,v:1},{k:"areaTypes",g:"Map",label:"Area types",min:4,max:30,step:1,v:30},{k:"density",g:"Trees",label:"Foliage density",min:.2,max:1,step:.05,v:.55},{k:"clump",g:"Trees",label:"Clumpiness",min:0,max:1,step:.05,v:.6},{k:"gnarl",g:"Trees",label:"Gnarliness",min:0,max:1,step:.05,v:.5},{k:"roots",g:"Trees",label:"Roots",min:0,max:1,step:.05,v:.6},{k:"bark",g:"Trees",label:"Bark texture",min:0,max:1,step:.05,v:.6},{k:"trees",g:"Trees",label:"Tree density",min:.2,max:2,step:.05,v:1},{k:"wBroad",g:"Tree mix",label:"Gnarled broadleaf",min:0,max:1,step:.05,v:.8},{k:"wFir",g:"Tree mix",label:"Fir",min:0,max:1,step:.05,v:.6},{k:"wWillow",g:"Tree mix",label:"Willow",min:0,max:1,step:.05,v:.5},{k:"wBirch",g:"Tree mix",label:"Birch",min:0,max:1,step:.05,v:.5},{k:"wPalm",g:"Tree mix",label:"Tree fern",min:0,max:1,step:.05,v:.3},{k:"wFlat",g:"Tree mix",label:"Flat-crowned",min:0,max:1,step:.05,v:.5},{k:"bushes",g:"Undergrowth",label:"Bushes and shrubs",min:0,max:120,step:1,v:55},{k:"bushSize",g:"Undergrowth",label:"Bush size",min:.5,max:1.8,step:.05,v:1},{k:"flowers",g:"Undergrowth",label:"Flowers",min:0,max:1,step:.05,v:.3},{k:"cSat",g:"Creatures",label:"Creature saturation",min:.1,max:1,step:.01,v:.6},{k:"cVal",g:"Creatures",label:"Creature brightness",min:.4,max:1,step:.01,v:.85},{k:"head",g:"Creatures",label:"Baby head size",min:.3,max:.6,step:.01,v:.44},{k:"eye",g:"Creatures",label:"Eye size",min:.5,max:2,step:.05,v:1},{k:"legs",g:"Creatures",label:"Leg length",min:.5,max:1.8,step:.05,v:1},{k:"long",g:"Creatures",label:"Body length",min:.7,max:1.5,step:.05,v:1},{k:"size",g:"Creatures",label:"Baby size (px)",min:5,max:14,step:1,v:8},{k:"growth",g:"Creatures",label:"Legend vs baby height",min:5,max:25,step:1,v:20},{k:"magicHue",g:"Creatures",label:"Magic glow hue",min:0,max:1,step:.01,v:.5,hue:!0},{k:"fur",g:"Creatures",label:"Stripes and spots",min:0,max:1,step:.05,v:.5},{k:"cloakHue",g:"Witch",label:"Jacket hue",min:0,max:1,step:.01,v:.72,hue:!0},{k:"hairHue",g:"Witch",label:"Hair hue",min:0,max:1,step:.01,v:.01,hue:!0},{k:"hatHue",g:"Witch",label:"Hat hue",min:0,max:1,step:.01,v:.74,hue:!0},{k:"topHue",g:"Witch",label:"Top hue",min:0,max:1,step:.01,v:.13,hue:!0},{k:"jeansHue",g:"Witch",label:"Jeans hue",min:0,max:1,step:.01,v:.6,hue:!0},{k:"shoeHue",g:"Witch",label:"Sneakers hue",min:0,max:1,step:.01,v:0,hue:!0},{k:"phonesHue",g:"Witch",label:"Headphones hue",min:0,max:1,step:.01,v:.92,hue:!0}];function Lx(){const n={};return Cx.forEach(e=>n[e.k]=e.v),n}function Dx(n,e,t,i,r){const a=ih(e.type).fn,o={...t,leafHue:n.leaf+(e.dark?.05:0),gnarl:e.gnarl??t.gnarl,treeBare:e.bare,treeTrunks:e.trunks,treeLean:e.lean,treeThick:e.thick,treeThin:e.thin,treeHollow:e.hollow,treeWebs:e.webs},l=a(i,o,t.treeSize*r*(e.scale||1)*ce(i,.9,1.1)),c=Hl(i,o,a);return e.dark&&(c[s.LEAF]=c[s.LEAF3],c[s.LEAF3]=me(n.leaf+.05,.7,.22)),c[s.NOSE]=[20,16,24],c[s.GLINT]=[235,235,240],{parts:Wf(l),colours:c}}function Px(n,e,t,i,r){const a=Mi[t].id,o=Oa.find(p=>p.id===a),l=u0(a,n,{K:i,makeCanvas:r}),c=[],h=p=>c.push(p)-1,u={big:[],small:[],walls:[],set:null},f=(p,g)=>$r(p,g,n,"none",r),d=(p,g)=>{const{parts:x,colours:m}=Dx(o,p,n,Aa(e*13+t*101+g*7+1),i);return{bot:h(f(x.bot,m)),top:h(f(x.top,m))}};o.big.forEach(([p,g],x)=>{if(p!=="tree"){u.big.push({bot:h(l.big[x].sp),top:null});return}const m=g.minor,M=o.big.filter(([,A])=>!A.minor).length||1,_=m?1:Math.max(1,Math.round(ah/M));for(let A=0;A<_;A++)u.big.push(d(g,x*17+A))}),o.small.forEach(([p,g],x)=>u.small.push(p==="tree"?d(g,500+x):{bot:h(l.small[x].sp),top:null}));for(const p of l.walls)u.walls.push(h(p.sp));return l.setPiece&&(u.set=o.set?.[0]==="tree"?d(o.set[1],900):{bot:h(l.setPiece.sp),top:null}),{sprites:c,layout:u,floor:l.floor.sp}}function Ox(n,e,t){const i=[];for(let r=0;r<3;r++)for(let a=0;a<2;a++)i.push($r(gf(e,r,a,n),df(e,n),n,n.cOutline,t));return i}const Ix=(n,e)=>n*2+e;function Ns(n,e,t){return n.getContext("2d").getImageData(0,0,e,t).data}function Dl(n,e=2048){const i=[];let r=0,a=0,o=0,l=1;for(const d of n)r+d.w+1>e&&(r=0,a+=o+1,o=0),i.push({x:r,y:a}),r+=d.w+1,o=Math.max(o,d.h),l=Math.max(l,r);const c=Math.max(1,a+o),h=new Uint8Array(l*c*4),u=new Uint8Array(l*c*4),f=n.map((d,p)=>{const g=i[p],x=Ns(d.A,d.w,d.h),m=Ns(d.N,d.w,d.h);for(let M=0;M<d.h;M++){const _=M*d.w*4,A=((g.y+M)*l+g.x)*4;h.set(x.subarray(_,_+d.w*4),A),u.set(m.subarray(_,_+d.w*4),A)}return{uv:[g.x/l,g.y/c,(g.x+d.w)/l,(g.y+d.h)/c],w:d.w,h:d.h}});return{albedo:h,normal:u,width:l,height:c,frames:f}}function Nx(n,e){if(n.kind==="creature")return{px:Dl(Ox(n.style,n.id,e),1024)};const{sprites:t,layout:i,floor:r}=Px(n.style,n.seed,n.id,n.K,e);return{px:Dl(t),layout:i,floor:{albedo:new Uint8Array(Ns(r.A,r.w,r.h)),normal:new Uint8Array(Ns(r.N,r.w,r.h)),w:r.w,h:r.h}}}function Iu(n,e,t){const i=new Yr(n,e,t,Hn,On);return i.magFilter=tn,i.minFilter=tn,i.generateMipmaps=!1,i.flipY=!1,i.colorSpace=Zn,i.needsUpdate=!0,i}function Qh(n){return{albedo:Iu(n.albedo,n.width,n.height),normal:Iu(n.normal,n.width,n.height),frames:n.frames}}const Nu=(n,e=2048)=>Qh(Dl(n,e));class Fx{constructor(e,t,i){if(this.style=e,this.seed=t,this.K=2/i,this.witch=Nu([$r(Od(),Ed(e),e,"dark")]),this.stones=Nu([0,1,2,3].map(r=>this.stone(r))),this.useWorkers=typeof Worker<"u"&&typeof OffscreenCanvas<"u",this.useWorkers){const r=Math.max(1,Math.min(3,(navigator.hardwareConcurrency||2)-1));try{for(let a=0;a<r;a++){const o=new Worker(new URL(""+new URL("artWorker-KWNU_ZGy.js",import.meta.url).href,import.meta.url),{type:"module"}),l={w:o,busy:!1};o.onmessage=c=>{l.busy=!1,l.job=void 0,this.receive(c.data),this.dispatch()},o.onerror=()=>{this.useWorkers=!1,l.job&&this.queue.unshift(l.job),l.busy=!1,l.job=void 0},this.workers.push(l)}}catch{this.useWorkers=!1}}}style;seed;types=new Map;creatures=new Map;queue=[];inFlight=new Set;workers=[];useWorkers;witch;stones;K;version=0;onFloor=()=>{};stone(e){const t=Aa(this.seed*3+e),i=5+Math.floor(t()*3),r=7+Math.floor(t()*5),a=new qt(i+2,r+1);return a.ellipse((i+2)/2,r/2+1,i/2,r/2+.5,s.BODY,{round:this.style.round}),a.ellipse((i+2)/2-1,r/2,i/3,r/3,s.BODY2,{round:this.style.round,onlyOn:new Set([s.BODY]),density:.5,seed:e}),$r(a,{[s.BODY]:[178,174,162],[s.BODY2]:[140,138,130]},this.style,"dark")}key=e=>e.kind+":"+e.id;ask(e){const t=this.key(e);this.inFlight.has(t)||(this.inFlight.add(t),this.queue.push(e),this.dispatch())}dispatch(){if(this.useWorkers)for(const e of this.workers)e.busy||!this.queue.length||(e.busy=!0,e.job=this.queue.shift(),e.w.postMessage(e.job))}receive(e){if(!e.result){console.warn("art worker failed, drawing on the page:",e.error),this.useWorkers=!1,this.queue.unshift(e.job);return}const t=Qh(e.result.px);e.job.kind==="type"?(this.types.set(e.job.id,{atlas:t,layout:e.result.layout}),e.result.floor&&this.onFloor(e.job.id,e.result.floor)):this.creatures.set(e.job.id,{atlas:t,frame:Ix}),this.inFlight.delete(this.key(e.job)),this.version++}typeArt(e){const t=this.types.get(e);return t||this.ask({kind:"type",id:e,style:this.style,seed:this.seed,K:this.K}),t}creatureArt(e){const t=this.creatures.get(e);return t||this.ask({kind:"creature",id:e,style:this.style}),t}prefetchType(e){this.types.has(e)||this.typeArt(e)}get pending(){return this.inFlight.size}work(e){if(this.useWorkers)return;const t=performance.now();let i=0;for(;this.queue.length&&(i===0||performance.now()-t<e);){const r=this.queue.shift();this.receive({job:r,result:Nx(r,(a,o)=>{const l=document.createElement("canvas");return l.width=a,l.height=o,l})}),i++}}whenIdle(){return new Promise(e=>{const t=()=>{this.work(50),this.pending?setTimeout(t,30):e()};t()})}}const jt={uAmb:{value:new K},uMoon:{value:new K},uMoonDir:{value:new K(-.45,.75,.5).normalize()},uMoonBeam:{value:new K},uBands:{value:4},uDither:{value:.35},uShafts:{value:.3},uShaftScale:{value:1},uGlowPos:{value:new K},uGlowRgb:{value:new K},uGlowR:{value:8},uGlowPower:{value:1.4},uHazeCentre:{value:new Ze},uHazeRange:{value:new Ze(70,200)},uHazeColour:{value:new K},uTime:{value:0}};function Ux(n,e,t){const i=(r,a)=>new K(r[0]/255*a,r[1]/255*a,r[2]/255*a);jt.uAmb.value.copy(i(me(n.ambientHue,.55,1),n.ambient)),jt.uMoon.value.copy(i(me(n.moonHue,.35,1),n.moon)),jt.uMoonBeam.value.copy(i(me(n.moonHue,.35,1),n.shafts*.25)),jt.uBands.value=n.bands,jt.uDither.value=n.dither*.5,jt.uShafts.value=n.shafts,jt.uShaftScale.value=t*2,jt.uGlowRgb.value.copy(i(me(n.glowHue,n.glowSat,1),1)),jt.uGlowR.value=e,jt.uGlowPower.value=n.glowPower,jt.uHazeColour.value.copy(i(me(n.ambientHue,.45,1),.16))}const Gs=`
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
`,ur=2,on=32,dr=8,Bx=`
varying vec3 vWorld;
void main() {
  vec4 w = modelMatrix * vec4(position, 1.0);
  vWorld = w.xyz;
  gl_Position = projectionMatrix * viewMatrix * w;
}
`,kx=`
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
`;class zx{constructor(e,t,i){this.map=e;const r=e.extent,a=r.maxX-r.minX,o=r.maxZ-r.minZ,l=Math.ceil(a*ur/on)*on,c=Math.ceil(o*ur/on)*on;this.tilesX=l/on,this.tilesZ=c/on,this.filled=new Uint8Array(this.tilesX*this.tilesZ);const h=p=>(p.magFilter=p.minFilter=tn,p.generateMipmaps=!1,p.colorSpace=Zn,p.needsUpdate=!0,p);this.texture=h(new Yr(new Uint8Array(l*c*4),l,c)),h(this.tile),this.floors=h(new Yr(new Uint8Array(64*dr*48*4*4),64*dr,192));const u=Array.from({length:32},(p,g)=>new K(...Mi[g]?.floor??[.25,.45,.4])),f=new vn({vertexShader:Bx,fragmentShader:kx,uniforms:{...jt,uAreas:{value:this.texture},uExtent:{value:new kt(r.minX,r.minZ,l/ur,c/ur)},uPixel:{value:i},uTypeFloor:{value:u},uFloorReady:{value:this.floorReady},uFloors:{value:this.floors},uTile:{value:new Ze(64,48)},uFloorsSize:{value:new Ze(64*dr,192)},uSat:{value:t.sat},uFloor:{value:new K(e.dancefloor.x,e.dancefloor.z,e.dancefloor.radius)},uCanopy:{value:new kt},uClearing:{value:new Ze(e.tuning.clearingSize,e.tuning.clearingFalloff)}}}),d=new bi(a+400,o+400);d.rotateX(-Math.PI/2),this.mesh=new wn(d,f),this.mesh.position.set((r.minX+r.maxX)/2,0,(r.minZ+r.maxZ)/2)}map;mesh;texture;tile=new Yr(new Uint8Array(on*on*4),on,on);filled;tilesX;tilesZ;initialised=!1;floorReady=new Array(32).fill(0);floors;pendingFloors=[];setCanopyShadow(e,t,i,r){this.mesh.material.uniforms.uCanopy.value.set(e,t,i,r)}setFloor(e,t){this.pendingFloors.push([e,t])}placeFloors(e){for(const[t,i]of this.pendingFloors){const r=this.mesh.material,a=r.uniforms.uTile.value;if(i.w!==a.x||i.h!==a.y)continue;const o=new Yr(i.albedo,i.w,i.h);o.needsUpdate=!0,e.copyTextureToTexture(o,this.floors,null,new Ze(t%dr*i.w,Math.floor(t/dr)*i.h)),o.dispose(),this.floorReady[t]=1}this.pendingFloors=[]}fill(e,t,i,r,a){this.initialised||(e.initTexture(this.texture),e.initTexture(this.floors),this.initialised=!0),this.pendingFloors.length&&this.placeFloors(e);const o=this.map.extent,l=on/ur,c=(t-o.minX)/l,h=(i-o.minZ)/l,u=Math.ceil(r/l),f=[];for(let g=Math.max(0,Math.floor(h)-u);g<=Math.min(this.tilesZ-1,Math.floor(h)+u);g++)for(let x=Math.max(0,Math.floor(c)-u);x<=Math.min(this.tilesX-1,Math.floor(c)+u);x++)this.filled[g*this.tilesX+x]||f.push([x,g,(x+.5-c)**2+(g+.5-h)**2]);f.sort((g,x)=>g[2]-x[2]);const d=performance.now();let p=0;for(const[g,x]of f){if(p>0&&performance.now()-d>a)break;this.fillTile(e,g,x),p++}return f.length-p}fillTile(e,t,i){const r=this.map.extent,a=this.tile.image.data;for(let o=0;o<on;o++)for(let l=0;l<on;l++){const c=r.minX+(t*on+l+.5)/ur,h=r.minZ+(i*on+o+.5)/ur,u=this.map.areaAt(c,h),f=(o*on+l)*4;a[f]=u.type,a[f+1]=Math.round(u.openness*255),a[f+2]=0,a[f+3]=255}this.tile.needsUpdate=!0,e.copyTextureToTexture(this.tile,this.texture,null,new Ze(t*on,i*on)),this.filled[i*this.tilesX+t]=1}dispose(){this.texture.dispose(),this.tile.dispose(),this.mesh.geometry.dispose(),this.mesh.material.dispose()}}const Hx="varying vec2 vUv; void main() { vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }",Gx=`
uniform sampler2D uScene; uniform float uThreshold; varying vec2 vUv;
void main() {
  vec3 c = texture2D(uScene, vUv).rgb;
  float l = max(c.r, max(c.g, c.b));
  gl_FragColor = vec4(c * smoothstep(uThreshold, uThreshold + 0.25, l), 1.0);
}`,Wx=`
uniform sampler2D uSrc; uniform vec2 uStep; varying vec2 vUv;
void main() {
  vec3 c = texture2D(uSrc, vUv).rgb * 0.227;
  c += (texture2D(uSrc, vUv + uStep * 1.38).rgb + texture2D(uSrc, vUv - uStep * 1.38).rgb) * 0.316;
  c += (texture2D(uSrc, vUv + uStep * 3.23).rgb + texture2D(uSrc, vUv - uStep * 3.23).rgb) * 0.070;
  gl_FragColor = vec4(c, 1.0);
}`,Vx=`
uniform sampler2D uScene, uBloom; uniform vec2 uLow; uniform float uBloomStrength; varying vec2 vUv;
void main() {
  vec2 p = (floor(vUv * uLow) + 0.5) / uLow;
  vec3 c = texture2D(uScene, p).rgb + texture2D(uBloom, vUv).rgb * uBloomStrength;
  gl_FragColor = vec4(min(c, vec3(1.0)), 1.0);
}`,Yx=`
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
}`;function Ma(n,e,t,i=!1){const r=new Gn(Math.max(1,n),Math.max(1,e),{minFilter:t,magFilter:t,depthBuffer:i,generateMipmaps:!1});return r.texture.colorSpace=Zn,r}class Xx{constructor(e,t){this.renderer=e,this.tuning=t,this.scene=Ma(1,1,$t,!0);const i=(r,a)=>new vn({vertexShader:Hx,fragmentShader:r,uniforms:a,depthTest:!1,depthWrite:!1});this.mats={bright:i(Gx,{uScene:{value:null},uThreshold:{value:.6}}),blur:i(Wx,{uSrc:{value:null},uStep:{value:new Ze}}),composite:i(Vx,{uScene:{value:null},uBloom:{value:null},uLow:{value:new Ze},uBloomStrength:{value:0}}),tilt:i(Yx,{uSrc:{value:null},uTexel:{value:new Ze},uDir:{value:new Ze},uStrength:{value:0},uBand:{value:.4},uCentre:{value:.5}})},this.quad=new wn(new bi(2,2),this.mats.composite),this.quad.frustumCulled=!1}renderer;tuning;scene;bright=Ma(1,1,$t);bloomB=Ma(1,1,$t);a=Ma(1,1,$t);b=Ma(1,1,$t);quad;cam=new tc(-1,1,1,-1,0,1);mats;low=new Ze(1,1);out=new Ze(1,1);get fullResolution(){return this.tuning.tiltShift.on&&this.tuning.tiltShift.where==="after"}resize(e,t,i,r){this.low.set(e,t),this.out.set(i,r),this.scene.setSize(e,t);const a=Math.max(1,Math.round(e/2)),o=Math.max(1,Math.round(t/2));this.bright.setSize(a,o),this.bloomB.setSize(a,o);const l=this.fullResolution?i:e,c=this.fullResolution?r:t;this.a.setSize(l,c),this.b.setSize(l,c)}pass(e,t,i){const r=this.mats[e];i(r.uniforms),this.quad.material=r,this.renderer.setRenderTarget(t),this.renderer.render(this.quad,this.cam)}render(e,t){const i=this.renderer,r=this.tuning;i.setRenderTarget(this.scene),i.render(e,t);const a=r.bloom.on&&r.bloom.strength>0;if(a){const f=this.bright.width,d=this.bright.height;this.pass("bright",this.bright,p=>{p.uScene.value=this.scene.texture,p.uThreshold.value=r.bloom.threshold});for(let p=0;p<2;p++)this.pass("blur",this.bloomB,g=>{g.uSrc.value=this.bright.texture,g.uStep.value.set(1/f,0)}),this.pass("blur",this.bright,g=>{g.uSrc.value=this.bloomB.texture,g.uStep.value.set(0,1/d)})}const o=r.tiltShift.on&&r.tiltShift.strength>0;if(this.pass("composite",o?this.a:null,f=>{f.uScene.value=this.scene.texture,f.uBloom.value=this.bright.texture,f.uLow.value.copy(this.low),f.uBloomStrength.value=a?r.bloom.strength:0}),!o)return;const l=this.a.width,c=this.a.height,h=this.fullResolution?this.out.y/this.low.y:1,u=f=>{f.uTexel.value.set(1/l,1/c),f.uStrength.value=r.tiltShift.strength*h,f.uBand.value=r.tiltShift.band,f.uCentre.value=1-r.tiltShift.centre};this.pass("tilt",this.b,f=>{u(f),f.uSrc.value=this.a.texture,f.uDir.value.set(1,0)}),this.pass("tilt",null,f=>{u(f),f.uSrc.value=this.b.texture,f.uDir.value.set(0,1)})}}const Kx=`
varying vec3 vWorld;
void main() {
  vec4 w = modelMatrix * vec4(position, 1.0);
  vWorld = w.xyz;
  gl_Position = projectionMatrix * viewMatrix * w;
}`,qx=`
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
}`;class Zx{constructor(e,t,i,r){this.height=t,this.mat=new vn({vertexShader:Kx,fragmentShader:qx,uniforms:{...jt,uStrength:{value:e},uWind:{value:i},uPixel:{value:r}},depthWrite:!1}),this.mesh=new wn(new bi(700,700).rotateX(-Math.PI/2),this.mat),this.mesh.frustumCulled=!1,this.mesh.renderOrder=2}height;mesh;mat;follow(e,t){this.mesh.position.set(e,this.height,t-150)}}const $x=`
attribute vec4 iShadow; // x, z, width, depth (metres)
varying vec2 vLocal;
varying vec3 vWorld;
void main() {
  vLocal = position.xz * 2.0;
  vec3 w = vec3(iShadow.x + position.x * iShadow.z, 0.03, iShadow.y + position.z * iShadow.w);
  vWorld = w;
  gl_Position = projectionMatrix * viewMatrix * vec4(w, 1.0);
}`,Jx=`
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
}`;class Qx{mesh;geo=new Bh;attr;capacity=0;constructor(e){const t=new bi(1,1).rotateX(-Math.PI/2);this.geo.index=t.index,this.geo.setAttribute("position",t.getAttribute("position")),this.attr=this.grow(1024);const i=new vn({vertexShader:$x,fragmentShader:Jx,uniforms:{...jt,uStrength:{value:e}},depthWrite:!1});this.mesh=new wn(this.geo,i),this.mesh.frustumCulled=!1,this.mesh.renderOrder=1}grow(e){return this.capacity=Math.max(e,this.capacity*2),this.attr=new Oh(new Float32Array(this.capacity*4),4),this.attr.setUsage(wh),this.geo.setAttribute("iShadow",this.attr),this.attr}set(e){e.length>this.capacity&&this.grow(e.length);const t=this.attr.array;e.forEach((i,r)=>{t[r*4]=i.x,t[r*4+1]=i.z,t[r*4+2]=i.w,t[r*4+3]=i.d}),this.attr.needsUpdate=!0,this.geo.instanceCount=e.length,this.mesh.visible=e.length>0}}const Wr={uRight:{value:new K(1,0,0)},uUp:{value:new K(0,1,0)},uFacing:{value:new K(0,0,1)},uTopFade:{value:0}},jx=`
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
`,e_=`
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
`;class ps{constructor(e,t,i={}){this.atlas=e,this.metresPerPixel=t;const r=new bi(1,1);r.translate(0,.5,0),this.geo=new Bh,this.geo.index=r.index,this.geo.setAttribute("position",r.getAttribute("position")),this.geo.setAttribute("uv",r.getAttribute("uv")),this.pos=this.size=this.uvs=this.flags=void 0,this.grow(64);const a=new vn({vertexShader:jx,fragmentShader:e_,uniforms:{...jt,...Wr,uAlbedo:{value:e.albedo},uNormal:{value:e.normal},uUnlit:{value:i.unlit?1:0}},depthTest:!i.onTop,depthWrite:!i.onTop});this.mesh=new wn(this.geo,a),this.mesh.frustumCulled=!1,i.onTop&&(this.mesh.renderOrder=10)}atlas;metresPerPixel;mesh;geo;pos;size;uvs;flags;capacity=0;count=0;grow(e){const t=Math.max(e,this.capacity*2),i=(r,a)=>{const o=new Oh(new Float32Array(t*r),r);return o.setUsage(wh),a&&o.array.set(a.array),o};this.pos=i(3,this.pos),this.size=i(2,this.size),this.uvs=i(4,this.uvs),this.flags=i(2,this.flags),this.geo.setAttribute("iPos",this.pos),this.geo.setAttribute("iSize",this.size),this.geo.setAttribute("iUv",this.uvs),this.geo.setAttribute("iFlags",this.flags),this.capacity=t}set(e){e.length>this.capacity&&this.grow(e.length);const t=this.pos.array,i=this.size.array,r=this.uvs.array,a=this.flags.array;e.forEach((o,l)=>{t[l*3]=o.x,t[l*3+1]=o.y,t[l*3+2]=o.z,i[l*2]=o.frame.w*this.metresPerPixel,i[l*2+1]=o.frame.h*this.metresPerPixel,r.set(o.frame.uv,l*4),a[l*2]=o.flip?1:0,a[l*2+1]=o.top?1:0});for(const o of[this.pos,this.size,this.uvs,this.flags])o.needsUpdate=!0;this.count=e.length,this.geo.instanceCount=e.length,this.mesh.visible=e.length>0}dispose(){this.geo.dispose(),this.mesh.material.dispose(),this.atlas.albedo.dispose(),this.atlas.normal.dispose()}}class t_{constructor(e,t,i){this.canvas=e,this.game=t,this.style=i;const r=t.tuning;this.renderer=new J5({canvas:e,antialias:!1,powerPreference:"high-performance",preserveDrawingBuffer:!0}),this.renderer.setPixelRatio(1),this.renderer.info.autoReset=!1,this.renderer.outputColorSpace=La,this.mpp=1/(r.artPixelsPerMetre*(2/r.pixelSize)),this.camera=new kn(r.camera.fov,1,1,900),this.post=new Xx(this.renderer,r),this.scene.background=new Mt(723478),Ux(i,r.glowReach,this.mpp),this.assets=new Fx(i,t.seed,r.pixelSize),this.ground=new zx(t.map,i,this.mpp),this.assets.onFloor=(h,u)=>this.ground.setFloor(h,u);const a=r.canopyShadow;this.ground.setCanopyShadow(a.on?a.strength:0,a.height,a.cover,a.wind),this.shadows=new Qx(r.shadows.strength),this.shadows.mesh.visible=r.shadows.on,this.scene.add(this.shadows.mesh),r.mist.on&&r.mist.strength>0&&(this.mist=new Zx(r.mist.strength,r.mist.height,r.mist.wind,this.mpp),this.scene.add(this.mist.mesh)),jt.uHazeRange.value.set(r.haze.near,r.haze.far),this.scene.add(this.ground.mesh),this.witchBatch=new ps(this.assets.witch,this.mpp,{unlit:!0,onTop:!0}),this.scene.add(this.witchBatch.mesh),this.stoneBatch=new ps(this.assets.stones,this.mpp),this.scene.add(this.stoneBatch.mesh);const o=t.map.dancefloor,l=[];for(let h=0;h<9;h++){const u=h/9*Math.PI*2+.3;l.push({x:o.x+Math.cos(u)*o.radius,y:0,z:o.z+Math.sin(u)*o.radius,frame:this.assets.stones.frames[h%4],flip:h%2===0})}this.stoneBatch.set(l);const c=new vn({transparent:!1,depthWrite:!1,vertexShader:"varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }",fragmentShader:"varying vec2 vUv; void main(){ vec2 p = vUv * 2.0 - 1.0; if (dot(p, p) > 1.0 || mod(floor(gl_FragCoord.x) + floor(gl_FragCoord.y), 2.0) > 0.5) discard; gl_FragColor = vec4(0.02, 0.02, 0.05, 1.0); }"});this.shadow=new wn(new bi(1.4,.7).rotateX(-Math.PI/2),c),this.shadow.renderOrder=1,this.scene.add(this.shadow)}canvas;game;style;renderer;scene=new I1;camera;ground;assets;typeBatches=new Map;creatureBatches=new Map;witchBatch;stoneBatch;shadow;mpp;lastBuild={x:1/0,y:1/0,z:1/0,version:-1};post;shadows;shadowList=[];mist=null;width=1;height=1;stats={trees:0,bushes:0,creatures:0,batches:0,drawCalls:0,pendingArt:0,pendingGround:0};resize(e,t){const i=this.game.tuning.pixelSize;this.width=Math.max(1,Math.ceil(e/i)),this.height=Math.max(1,Math.ceil(t/i));const r=this.post.fullResolution?i:1;this.renderer.setSize(this.width*r,this.height*r,!1),this.post.resize(this.width,this.height,this.width*r,this.height*r),this.canvas.style.width=this.width*i+"px",this.canvas.style.height=this.height*i+"px",this.camera.aspect=this.width/this.height,this.camera.updateProjectionMatrix()}async prepare(){this.render(0,!1),this.drawCreatures(),this.ground.fill(this.renderer,this.game.witch.x,this.game.witch.z,50,1/0),await this.assets.whenIdle(),this.updateFrustum(),this.refresh(!0);for(let e=0;e<Mi.length;e++)this.assets.prefetchType(e);for(const e of Mi)this.assets.creatureArt(e.creature)}batchFor(e,t,i){let r=e.get(t);return r||(r=i(),r&&(e.set(t,r),this.scene.add(r.mesh))),r}frustum=new ec;box=new ia;m4=new Kt;v3=new K;drawn=new Set;pops=[];updateFrustum(){this.camera.updateMatrixWorld(),this.m4.multiplyMatrices(this.camera.projectionMatrix,this.camera.matrixWorldInverse),this.frustum.setFromProjectionMatrix(this.m4)}viewRect(e,t){const i=this.camera,r=i.position,a=this.game.witch,o=[];for(const h of[-1,1])for(const u of[-1,1]){const f=this.v3.set(h,u,1).unproject(i).sub(r).normalize();for(const d of[0,25]){let p=f.y<-.001?(d-r.y)/f.y:1/0;p>0||(p=1/0),p=Math.min(p,e+r.distanceTo(new K(a.x,r.y,a.z))+t),o.push([r.x+f.x*p,r.z+f.z*p])}}o.push([r.x,r.z]);const l=o.map(h=>h[0]),c=o.map(h=>h[1]);return{minX:Math.min(...l)-t,maxX:Math.max(...l)+t,minZ:Math.min(...c)-t,maxZ:Math.max(...c)+t}}inView(e,t,i,r,a){const o=this.game.witch.x,l=this.game.witch.z,c=this.game.tuning.haze.far+a;return(e-o)**2+(t-l)**2>c*c?!1:(this.box.min.set(e-i/2-a,-a,t-r-a),this.box.max.set(e+i/2+a,r+a,t+a),this.frustum.intersectsBox(this.box))}inInnerView(e,t,i){const r=this.game.witch;if(Math.hypot(e-r.x,t-r.z)>this.game.tuning.haze.near)return!1;for(const a of[0,i]){const o=this.v3.set(e,a,t).project(this.camera);if(Math.abs(o.x)<.85&&Math.abs(o.y)<.85&&o.z<1)return!0}return!1}refresh(e=!1){const t=this.game,i=t.tuning,r=this.camera,a=i.viewMargin,o={x:r.position.x,y:r.position.y,z:r.position.z};if(!e&&Math.hypot(o.x-this.lastBuild.x,o.y-this.lastBuild.y,o.z-this.lastBuild.z)<a/3&&this.assets.version===this.lastBuild.version)return;this.lastBuild={...o,version:this.assets.version};const l=this.viewRect(i.haze.far,a),c=(l.minX+l.maxX)/2,h=(l.minZ+l.maxZ)/2,u=Math.max(l.maxX-l.minX,l.maxZ-l.minZ)/2,f=[],d=jt.uMoonDir.value,p=-d.x/Math.max(.2,d.y),g=-d.z/Math.max(.2,d.y),x=new Map,m=new Set,M=(T,P)=>{let S=x.get(T);S||x.set(T,S=[]),S.push(P)},_=this.mpp;let A=0,E=0;for(const T of t.forest.treesNear(c,h,u)){const P=this.assets.typeArt(T.type);if(!P||!P.layout.big.length)continue;const S=P.atlas.frames,y=P.layout.big[T.variant%P.layout.big.length],C=S[y.top??y.bot];if(!this.inView(T.x,T.z,C.w*_,C.h*_,a))continue;M(T.type,{x:T.x,y:0,z:T.z,frame:S[y.bot],flip:T.flip}),y.top!==null&&M(T.type,{x:T.x,y:0,z:T.z,frame:S[y.top],flip:T.flip,top:!0});const I=C.w*_,L=C.h*_*(y.top===null?.2:.6);f.push({x:T.x+p*L,z:T.z+g*L,w:I*.8,d:I*.45}),m.add(`${T.x.toFixed(2)},${T.z.toFixed(2)},${C.h*_}`),A++}const R=(T,P)=>{for(const S of T){const y=this.assets.typeArt(S.type);if(!y)continue;const C=P(y.layout);if(!C.length)continue;const I=C[S.variant%C.length],L=y.atlas.frames,N=L[I.bot],O=L[I.top??I.bot];this.inView(S.x,S.z,O.w*_,O.h*_,a)&&(M(S.type,{x:S.x,y:0,z:S.z,frame:N,flip:S.flip}),I.top!==null&&M(S.type,{x:S.x,y:0,z:S.z,frame:L[I.top],flip:S.flip,top:!0}),f.push({x:S.x,z:S.z,w:N.w*_*.8,d:N.w*_*.3}),E++)}};R(t.forest.bushesNear(c,h,u),T=>T.small),R(t.forest.wallsNear(c,h,u),T=>T.walls.map(P=>({bot:P,top:null}))),R(t.forest.setPiecesNear(c,h,u),T=>T.set===null?[]:[T.set]);for(const[T,P]of this.typeBatches)x.has(T)||P.set([]);for(const[T,P]of x)this.batchFor(this.typeBatches,T,()=>{const y=this.assets.typeArt(T);return y&&new ps(y.atlas,_)})?.set(P);if(!e&&this.assets.pending===0){const T=(P,S)=>{const[y,C,I]=P.split(",").map(Number);this.inInnerView(y,C,I)&&this.pops.push(`${S} ${y.toFixed(0)},${C.toFixed(0)}`)};for(const P of m)this.drawn.has(P)||T(P,"appeared");for(const P of this.drawn)m.has(P)||T(P,"vanished")}this.drawn=m,this.stats.trees=A,this.stats.bushes=E,this.shadowList=f}drawCreatures(){const e=this.game,t=e.camera,i=e.tuning.haze.far,r=new Map,a=[];let o=0;for(const l of e.creatures){if(Math.abs(l.x-t.tx)>i||Math.abs(l.z-t.tz)>i)continue;const c=this.assets.creatureArt(l.species);if(!c)continue;const h=c.atlas.frames[c.frame(l.level,l.moving?Math.floor(l.walk)%2:0)];if(!this.inView(l.x,l.z,h.w*this.mpp,h.h*this.mpp,4))continue;let u=r.get(l.species);u||r.set(l.species,u=[]),u.push({x:l.x,y:0,z:l.z,frame:h,flip:l.facing<0}),a.push({x:l.x,z:l.z,w:h.w*this.mpp*.7,d:h.w*this.mpp*.25}),o++}for(const[l,c]of this.creatureBatches)r.has(l)||c.set([]);for(const[l,c]of r)this.batchFor(this.creatureBatches,l,()=>{const u=this.assets.creatureArt(l);return u&&new ps(u.atlas,this.mpp)})?.set(c);this.stats.creatures=o,this.game.tuning.shadows.on&&this.shadows.set(this.shadowList.concat(a))}render(e,t=!0){const i=this.game,r=i.tuning,a=D0(i),o=a.angle*Math.PI/180,l=2*a.distance*Math.tan(r.camera.fov*Math.PI/360)/this.height,c=new K(0,Math.cos(o),-Math.sin(o)),h=new K(a.tx,a.ty,a.tz),u=h.dot(c),f=h.x;h.addScaledVector(c,Math.round(u/l)*l-u),h.x+=Math.round(f/l)*l-f;const d=new K(0,Math.sin(o),Math.cos(o)).multiplyScalar(a.distance);this.camera.position.copy(h).add(d),this.camera.up.set(0,1,0),this.camera.lookAt(h);const p=r.spriteTilt;Wr.uUp.value.set(0,1,0).lerp(c,p).normalize(),Wr.uFacing.value.crossVectors(Wr.uRight.value,Wr.uUp.value).normalize(),Wr.uTopFade.value=Zs(i.witch);const g=i.witch,x=Gl(g,r);jt.uGlowPos.value.set(g.x,x+r.glowHeight,g.z),jt.uHazeCentre.value.set(g.x,g.z),jt.uTime.value=e,this.mist?.follow(a.tx,a.tz);const m=Math.sin(e*2.4)*.12;this.witchBatch.set([{x:g.x,y:x+m-.4,z:g.z,frame:this.assets.witch.frames[0],flip:g.facing<0}]),this.shadow.position.set(g.x,.03,g.z),this.shadow.scale.setScalar(1-.5*Zs(g)),this.updateFrustum(),this.refresh(),this.drawCreatures(),this.assets.work(6);const M=li(r.haze.near,r.haze.far,Zs(g))*.8;this.stats.pendingGround=this.ground.fill(this.renderer,a.tx,a.tz-M*.5,M,3),this.stats.pendingArt=this.assets.pending,t&&(this.renderer.info.reset(),this.post.render(this.scene,this.camera),this.stats.drawCalls=this.renderer.info.render.calls,this.stats.batches=this.typeBatches.size+this.creatureBatches.size)}}const n_="The art style: knobs from the Witch Art Lab. Paste a style saved in the Lab here (its whole saved JSON, or just its style object). Any knob left out follows the Lab's current default, so an empty style means the Lab's default look, and stays up to date as the art changes.",i_="Lab default",r_={},a_={_readme:n_,name:i_,style:r_};function s_(n=a_){const e=n??{},t=e.style&&typeof e.style=="object"?e.style:e,i=Lx();for(const[r,a]of Object.entries(t))r in i&&(i[r]=a);return i}function o_(n,e){const t=n.querySelector("#stick"),i=t.querySelector(".knob"),r=56;let a=null,o=0,l=0;const c=()=>n.classList.add("touch"),h=n.querySelector("#stick-zone");h.addEventListener("pointerdown",d=>{if(!(d.pointerType==="mouse"||a!==null)){c(),a=d.pointerId,o=d.clientX,l=d.clientY,t.style.left=o+"px",t.style.top=l+"px",t.classList.add("on");try{h.setPointerCapture(d.pointerId)}catch{}d.preventDefault()}}),h.addEventListener("pointermove",d=>{if(d.pointerId!==a)return;let p=d.clientX-o,g=d.clientY-l;const x=Math.hypot(p,g);x>r&&(p*=r/x,g*=r/x),i.style.transform=`translate(${p}px, ${g}px)`;const m=Math.min(1,x/r),M=.15,_=m<M?0:(m-M)/(1-M)/Math.max(1e-6,m);e.x=p/r*_,e.y=g/r*_});const u=d=>{d.pointerId===a&&(a=null,e.x=0,e.y=0,i.style.transform="",t.classList.remove("on"))};h.addEventListener("pointerup",u),h.addEventListener("pointercancel",u);const f=(d,p)=>{const g=n.querySelector(d);g.addEventListener("pointerdown",x=>{x.preventDefault(),x.stopPropagation(),p(),g.classList.add("down")}),g.addEventListener("pointerup",()=>g.classList.remove("down")),g.addEventListener("pointerleave",()=>g.classList.remove("down"))};f("#rise",()=>e.toggle=!0),f("#zoom-in",()=>e.zoom-=1),f("#zoom-out",()=>e.zoom+=1),window.addEventListener("touchstart",d=>{c(),d.touches.length===3&&(e.debug=!0)},{passive:!0})}const Hi=new URLSearchParams(location.search);let mr=f0(Hi.get("seed"));mr===null&&(mr=Math.floor(Math.random()*1e6),Hi.set("seed",String(mr)),history.replaceState(null,"","?"+Hi.toString()+location.hash));const ki={...Ar,bloom:{...Ar.bloom},tiltShift:{...Ar.tiltShift},shadows:{...Ar.shadows},canopyShadow:{...Ar.canopyShadow},mist:{...Ar.mist}};Hi.get("shadows")==="off"&&(ki.shadows.on=!1);Hi.get("canopy")==="off"&&(ki.canopyShadow.on=!1);Hi.get("mist")==="off"&&(ki.mist.on=!1);const gs=Hi.get("tilt");gs==="off"?ki.tiltShift.on=!1:(gs==="before"||gs==="after")&&(ki.tiltShift.on=!0,ki.tiltShift.where=gs);Hi.get("bloom")==="off"&&(ki.bloom.on=!1);const Oi=C0(mr,ki),l_=document.getElementById("game"),Pa=new t_(l_,Oi,{...s_(),pixel:ki.pixelSize}),Ws=new Np;o_(document.body,Ws.touch);document.getElementById("version").textContent="v241 · 6700d0a";const c_=document.getElementById("seed");c_.innerHTML=`seed <a href="?seed=${mr}">${mr}</a>`;const Pl=document.getElementById("debug"),rc=document.getElementById("start");let Sa=Hi.has("debug");Pl.classList.toggle("on",Sa);const jh=()=>Pa.resize(window.innerWidth,window.innerHeight);window.addEventListener("resize",jh);jh();let Vs=!1;requestAnimationFrame(()=>setTimeout(async()=>{await Pa.prepare(),Vs=!0,rc.classList.remove("loading")},0));let Fu=null;function ed(){if(!Vs||!Oi.clock.paused)return!1;try{Fu??=new AudioContext,Fu.resume()}catch{}return Oi.clock.paused=!1,rc.style.display="none",Ws.clearPresses(),!0}Ws.onAny=ed;rc.addEventListener("pointerdown",n=>{n.preventDefault(),ed()});document.addEventListener("visibilitychange",()=>{document.hidden&&(As=0)});let As=0,Uu=60,No=0,ms=0;function td(n){requestAnimationFrame(td);const e=As?(n-As)/1e3:0;As=n,No++,ms+=e,ms>=.5&&(Uu=No/ms,No=0,ms=0);const t=Ws.read();if(t.debug&&(Sa=!Sa,Pl.classList.toggle("on",Sa)),L0(Oi,t,e),!!Vs&&(Pa.render(n/1e3),Sa)){const i=Oi.witch,r=Pa.stats;Pl.textContent=[`fps    ${Uu.toFixed(0)}`,`seed   ${mr}`,`area   ${sh(Oi)}`,`mode   ${i.mode}`,`at     ${i.x.toFixed(0)}, ${i.z.toFixed(0)} m   zoom ${Oi.camera.zoomStep}`,`trees  ${r.trees}  bushes ${r.bushes}  creatures ${r.creatures}`,`draws  ${r.drawCalls}  art queued ${r.pendingArt}  ground tiles ${r.pendingGround}`].join(`
`)}}requestAnimationFrame(td);window.witch={game:Oi,view:Pa,areaUnderWitch:()=>sh(Oi),get ready(){return Vs}};
