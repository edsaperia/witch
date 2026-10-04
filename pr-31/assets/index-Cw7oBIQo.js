(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);new MutationObserver(r=>{for(const a of r)if(a.type==="childList")for(const o of a.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&i(o)}).observe(document,{childList:!0,subtree:!0});function t(r){const a={};return r.integrity&&(a.integrity=r.integrity),r.referrerPolicy&&(a.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?a.credentials="include":r.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function i(r){if(r.ep)return;r.ep=!0;const a=t(r);fetch(r.href,a)}})();function _a(n){let e=n>>>0;return()=>{e=e+1831565813>>>0;let t=e;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}}function It(n,e,t){let i=Math.imul(n|0,374761393)^Math.imul(e|0,668265263)^Math.imul(t|0,2147483647);return i=Math.imul(i^i>>>13,1274126177),((i^i>>>16)>>>0)/4294967296}function ec(n,e,t){const i=Math.floor(n),r=Math.floor(e),a=n-i,o=e-r,l=a*a*(3-2*a),u=o*o*(3-2*o),c=It(i,r,t),h=It(i+1,r,t),f=It(i,r+1,t),d=It(i+1,r+1,t);return c+(h-c)*l+(f-c)*u+(c-h-f+d)*l*u}const ai=(n,e,t)=>n+(e-n)*t,hr=(n,e,t)=>Math.min(t,Math.max(e,n)),qr=n=>{const e=hr(n,0,1);return e*e*(3-2*e)};function Ph(n,e,t,i){const r=Math.max(1,n.camera.zoomSteps),a=hr(Math.round(n.camera.startZoom),0,r-1),o=r>1?a/(r-1):0;return{zoomStep:a,zoom:o,tx:e,ty:t,tz:i,vx:0,vy:0,vz:0,ax:0,az:0,lift:0}}function Bs(n,e,t,i,r){const a=i*r,o=Math.exp(-a),l=n-t,u=e+i*l;return[t+(l+u*r)*o,(e-i*u*r)*o]}function Ih(n,e,t,i,r,a,o){const l=o.camera,u=Math.max(1,l.zoomSteps),c=hr(n.zoomStep+Math.sign(e),0,u-1),h=u>1?c/(u-1):0;let f=i.x*l.lookAhead,d=i.z*l.lookAhead;const p=Math.hypot(f,d);p>l.lookAheadMax&&(f*=l.lookAheadMax/p,d*=l.lookAheadMax/p);const m=1-Math.exp(-l.lookAheadEase*a),M=n.ax+(f-n.ax)*m,x=n.az+(d-n.az)*m,[g,_]=Bs(n.tx,n.vx,t.x+M,l.follow,a),[E,S]=Bs(n.ty,n.vy,t.y,l.follow,a),[R,A]=Bs(n.tz,n.vz,t.z+x,l.follow,a),D=n.zoom+(h-n.zoom)*(1-Math.exp(-l.zoomEase*a)),b=n.lift+(r-n.lift)*(1-Math.exp(-l.liftEase*a));return{zoomStep:c,zoom:D,tx:g,ty:E,tz:R,vx:_,vy:S,vz:A,ax:M,az:x,lift:hr(b,0,1)}}function Nh(n,e,t){const i=t.camera.ground,r=t.camera.treetop,a=qr(e),o=ai(ai(i.angleIn,i.angleOut,n.zoom),ai(r.angleIn,r.angleOut,n.zoom),a),l=ai(ai(i.distanceIn,i.distanceOut,n.zoom),ai(r.distanceIn,r.distanceOut,n.zoom),a),u=o*Math.PI/180;return{angle:o,distance:l,x:n.tx,y:n.ty+Math.sin(u)*l,z:n.tz+Math.cos(u)*l,tx:n.tx,ty:n.ty,tz:n.tz}}const Oh=.1,Fh=()=>({time:0,paused:!0});function Uh(n,e){if(n.paused||!(e>0))return 0;const t=Math.min(Oh,e);return n.time+=t,t}const Bh={moor:{treeDensity:.4},"fern-forest":{treeDensity:1},"muddy-forest":{treeDensity:1},"stone-shrine":{treeDensity:.3},"tangly-forest":{treeDensity:1},"wispy-forest":{treeDensity:1},"hazel-forest":{treeDensity:1},garden:{treeDensity:.6},"twiggy-forest":{treeDensity:1},ancient:{treeDensity:.9},norway:{treeDensity:1},"alder-forest":{treeDensity:.9},meadow:{treeDensity:.2},"old-oaks":{treeDensity:.9},"berry-thicket":{treeDensity:1},wetland:{treeDensity:.6},stream:{treeDensity:.7},"rocky-slope":{treeDensity:.6},bog:{treeDensity:.5},deadwood:{treeDensity:.8},"cave-mouth":{treeDensity:.6},grassland:{treeDensity:.2},"beaver-pond":{treeDensity:.8},"log-pile":{treeDensity:.7},heath:{treeDensity:.4},"old-pinewood":{treeDensity:1},ravine:{treeDensity:.6},"bluebell-glade":{treeDensity:.8},"holly-thicket":{treeDensity:1},"honeysuckle-tangle":{treeDensity:1}},kh={types:Bh};function xu(n,e){if(typeof document<"u"){const t=document.createElement("canvas");return t.width=n,t.height=e,t}return new OffscreenCanvas(n,e)}function bl(n){let e=n>>>0;return()=>{e=e+1831565813>>>0;let t=e;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}}const ce=(n,e,t)=>e+(t-e)*n(),Sl=(n,e)=>e[Math.floor(n()*e.length)];function Ht(n,e,t){let i=Math.imul(n|0,374761393)^Math.imul(e|0,668265263)^Math.imul(t|0,2147483647);return i=Math.imul(i^i>>>13,1274126177),((i^i>>>16)>>>0)/4294967296}function li(n,e,t){const i=Math.floor(n),r=Math.floor(e),a=n-i,o=e-r,l=a*a*(3-2*a),u=o*o*(3-2*o),c=Ht(i,r,t),h=Ht(i+1,r,t),f=Ht(i,r+1,t),d=Ht(i+1,r+1,t);return c+(h-c)*l+(f-c)*u+(c-h-f+d)*l*u}function xe(n,e,t){n=(n%1+1)%1,e=Math.max(0,Math.min(1,e)),t=Math.max(0,Math.min(1,t));const i=Math.floor(n*6),r=n*6-i,a=t*(1-e),o=t*(1-r*e),l=t*(1-(1-r)*e),[u,c,h]=[[t,l,a],[o,t,a],[a,t,l],[a,o,t],[l,a,t],[t,a,o]][i%6];return[Math.round(u*255),Math.round(c*255),Math.round(h*255)]}const s={BODY:1,BELLY:2,ACCENT:3,EYE:4,GLINT:5,TRUNK:6,LEAF:7,LEAF2:8,CLOTH:9,SKIN:10,HAIR:11,BROOM:12,STRAW:13,BODY2:14,BARK2:15,FLOWER:16,PUPIL:17,MAGIC:18,BARKD:19,LINE:20,IRIS:21,MAGIC2:22,NOSE:23,EAR:24,BODY3:25,LEAF3:26,BARKL:27,HAT:28,PHONES:29,TOP:30,JACKET:31,JEANS:32,SHOES:33,WATER:34,STONE:35,STONED:36,MOSS:37,RUNE:39,GLOW:40,WOOD:41,COLLAR:42,HAT1:43,HAT2:44,POM:45,SHADES:46,FRAME:47,SHOE:48,SOLE:49,WOKEN:50,WEB:51},zh=new Set([s.GLINT,s.MAGIC,s.MAGIC2,s.RUNE,s.GLOW,s.COLLAR,s.WOKEN]);function tc(n,e=!0,t=8){const i=n.length,r=[];if(i<3)return n.slice();const a=l=>e?n[(l+i)%i]:n[Math.max(0,Math.min(i-1,l))],o=e?i:i-1;for(let l=0;l<o;l++){const u=a(l-1),c=a(l),h=a(l+1),f=a(l+2),d=Math.max(2,Math.ceil(Math.hypot(h[0]-c[0],h[1]-c[1])/1.5),t);for(let p=0;p<d;p++){const m=p/d,M=m*m,x=M*m;r.push([0,1].map(g=>.5*(2*c[g]+(-u[g]+h[g])*m+(2*u[g]-5*c[g]+4*h[g]-f[g])*M+(-u[g]+3*c[g]-3*h[g]+f[g])*x)))}}return e||r.push(n[i-1]),r}function Hh(n,{cap:e=1,capEnd:t=e}={}){const i=[],r=[],a=n.length;for(let u=0;u<a;u++){const c=n[Math.max(0,u-1)],h=n[Math.min(a-1,u+1)];let f=h[0]-c[0],d=h[1]-c[1];const p=Math.hypot(f,d)||1;f/=p,d/=p;const m=n[u][2]/2;i.push([n[u][0]-d*m,n[u][1]+f*m]),r.push([n[u][0]+d*m,n[u][1]-f*m])}const o=(u,c,h,f)=>{let d=u[0]-c[0],p=u[1]-c[1];const m=Math.hypot(d,p)||1;return[u[0]+d/m*h/2*f,u[1]+p/m*h/2*f]};return[...i,o(n[a-1],n[a-2],n[a-1][2],t),...r.reverse(),o(n[0],n[1],n[0][2],e)]}const ft=(n,e)=>[n[0]+e[0],n[1]+e[1]],gn=(n,e,t)=>[n[0]+(e[0]-n[0])*t,n[1]+(e[1]-n[1])*t];function Ts(n,e,t,i,r,a=1){const o=[];for(let l=0;l<n.length;l++){if(o.push(n[l]),l<e||l>=t)continue;const u=n[l],c=n[(l+1)%n.length];let h=c[0]-u[0],f=c[1]-u[1];const d=Math.hypot(h,f)||1,p=f/d*a,m=-h/d*a;for(let M=1;M<=i;M++){const x=(M-.5)/i,g=gn(u,c,x),_=[g[0]+p*r-h/d*r*.5,g[1]+m*r-f/d*r*.5];o.push(gn(u,c,x-.45/i),_,gn(u,c,x+.35/i))}}return o}function nc(n,e,t){const i=new Uint8Array(n*e);let r=1/0,a=-1/0;for(const o of t)r=Math.min(r,o[1]),a=Math.max(a,o[1]);for(let o=Math.max(0,Math.floor(r));o<=Math.min(e-1,Math.ceil(a));o++){const l=o+.5,u=[];for(let c=0,h=t.length-1;c<t.length;h=c++){const[f,d]=t[c],[p,m]=t[h];d>l!=m>l&&u.push(f+(l-d)/(m-d)*(p-f))}u.sort((c,h)=>c-h);for(let c=0;c+1<u.length;c+=2)for(let h=Math.max(0,Math.ceil(u[c]-.5));h<=Math.min(n-1,Math.floor(u[c+1]-.5));h++)i[o*n+h]=1}return i}function Gh(n,e,t){const r=new Float32Array(n*e),a=new Float32Array(n*e);for(let u=0;u<n*e;u++)t[u]&&(r[u]=1e4,a[u]=1e4);const o=u=>r[u]*r[u]+a[u]*a[u],l=(u,c,h,f,d)=>{const p=c+f,m=h+d;let M,x;if(p<0||m<0||p>=n||m>=e)M=f,x=d;else{const g=m*n+p;M=r[g]+f,x=a[g]+d}M*M+x*x<o(u)&&(r[u]=M,a[u]=x)};for(let u=0;u<e;u++){for(let c=0;c<n;c++){const h=u*n+c;t[h]&&(l(h,c,u,-1,0),l(h,c,u,0,-1),l(h,c,u,-1,-1),l(h,c,u,1,-1))}for(let c=n-1;c>=0;c--){const h=u*n+c;t[h]&&l(h,c,u,1,0)}}for(let u=e-1;u>=0;u--){for(let c=n-1;c>=0;c--){const h=u*n+c;t[h]&&(l(h,c,u,1,0),l(h,c,u,0,1),l(h,c,u,1,1),l(h,c,u,-1,1))}for(let c=0;c<n;c++){const h=u*n+c;t[h]&&l(h,c,u,-1,0)}}return{vx:r,vy:a}}class Xt{constructor(e,t,i=1){this.sx=i,this.w=Math.round(e*i),this.h=t|0,this.m=new Uint8Array(this.w*this.h),this.n=new Float32Array(this.w*this.h*3),this.g=new Uint8Array(this.w*this.h)}inb(e,t){return e>=0&&t>=0&&e<this.w&&t<this.h}get(e,t){return e|=0,t|=0,this.inb(e,t)?this.m[t*this.w+e]:0}put(e,t,i,r=0,a=0,o=1){this.px(e*this.sx,t,i,r,a,o)}px(e,t,i,r=0,a=0,o=1){if(e=Math.floor(e),t=Math.floor(t),!this.inb(e,t))return;const l=t*this.w+e;this.m[l]=i,this.n[l*3]=r,this.n[l*3+1]=a,this.n[l*3+2]=o}recolour(e,t,i){e=Math.floor(e),t=Math.floor(t),this.inb(e,t)&&this.m[t*this.w+e]&&(this.m[t*this.w+e]=i)}ellipse(e,t,i,r,a,o={}){const{onlyOn:l,density:u=1,noise:c=0,seed:h=0,round:f=1}=o;e*=this.sx,i*=this.sx;for(let d=Math.max(0,Math.floor(t-r-1));d<Math.min(this.h,t+r+1);d++)for(let p=Math.max(0,Math.floor(e-i-1));p<Math.min(this.w,e+i+1);p++){const m=(p+.5-e)/i,M=(d+.5-t)/r,x=m*m+M*M;if(x>1)continue;const g=d*this.w+p;if(l&&!l.has(this.m[g]))continue;if(u<1){const R=c?li(p/3.2,d/3.2,h)*c+(1-c)*.5:.5;if(Ht(p,d,h+77)>u*(.4+R*1.2)*(1.15-x*.5))continue}const _=m*f,E=M*f,S=Math.hypot(_,E,Math.sqrt(Math.max(0,1-x))+.15);this.px(p,d,a,_/S,E/S,(Math.sqrt(Math.max(0,1-x))+.15)/S)}}line(e,t,i,r,a,o,l,u=1){e*=this.sx,i*=this.sx;const c=Math.max(1,Math.ceil(Math.hypot(i-e,r-t)));for(let h=0;h<=c;h++){const f=h/c,d=e+(i-e)*f,p=t+(r-t)*f,m=Math.max(.5,(a+(o-a)*f)/2);for(let M=Math.floor(p-m);M<=p+m;M++)for(let x=Math.floor(d-m);x<=d+m;x++){const g=(x+.5-d)/m,_=(M+.5-p)/m;if(g*g+_*_>1)continue;const E=g*u,S=Math.hypot(E,_*.3,1);this.px(x,M,l,E/S,_*.3/S,1/S)}}}tri(e,t){let[[i,r],[a,o],[l,u]]=e;i*=this.sx,a*=this.sx,l*=this.sx;const c=(m,M,x,g,_,E)=>(m-_)*(g-E)-(x-_)*(M-E),h=Math.max(0,Math.floor(Math.min(i,a,l))),f=Math.min(this.w,Math.ceil(Math.max(i,a,l))),d=Math.max(0,Math.floor(Math.min(r,o,u))),p=Math.min(this.h,Math.ceil(Math.max(r,o,u)));for(let m=d;m<p;m++)for(let M=h;M<f;M++){const x=M+.5,g=m+.5,_=c(x,g,i,r,a,o),E=c(x,g,a,o,l,u),S=c(x,g,l,u,i,r);(_<0||E<0||S<0)&&(_>0||E>0||S>0)||this.px(M,m,t,0,-.2,.98)}}shape(e,t,i={}){return this.fillMask(nc(this.w,this.h,tc(e,!0,i.per||6)),t,i)}limb(e,t,i={}){return this.shape(Hh(e,i),t,i)}fillMask(e,t,{group:i=1,line:r=!1,depth:a=0,round:o=1,onlyOn:l=null,keepNormals:u=!1,tilt:c=[0,0],lineMat:h=s.LINE}={}){const{w:f,h:d}=this;if(l)for(let x=0;x<f*d;x++)e[x]&&!l.has(this.m[x])&&(e[x]=0);const{vx:p,vy:m}=Gh(f,d,e);let M=a;if(!M){for(let x=0;x<f*d;x++)e[x]&&(M=Math.max(M,Math.hypot(p[x],m[x])));M=Math.max(1.5,Math.min(M*.9,2.5+M*.35))}for(let x=0;x<d;x++)for(let g=0;g<f;g++){const _=x*f+g;if(!e[_])continue;if(u){this.m[_]=t;continue}const E=Math.hypot(p[_],m[_]),S=Math.min(1,Math.max(0,(E-.5)/M)),R=Math.min(2.6,(1-S)/Math.sqrt(Math.max(.02,1-(1-S)*(1-S))))*o;let A=p[_]/(E||1)*R+c[0],D=m[_]/(E||1)*R+c[1];const b=Math.hypot(A,D,1);this.m[_]=t,this.n[_*3]=A/b,this.n[_*3+1]=D/b,this.n[_*3+2]=1/b}if(r&&!u){const x=[];for(let g=0;g<d;g++)for(let _=0;_<f;_++){const E=g*f+_;if(e[E])for(const[S,R]of[[1,0],[-1,0],[0,1],[0,-1]]){const A=_+S,D=g+R;if(A<0||D<0||A>=f||D>=d)continue;const b=D*f+A;if(!e[b]&&this.m[b]&&this.g[b]!==i&&this.m[b]!==h){x.push(E);break}}}for(const g of x)this.m[g]=h}if(!u)for(let x=0;x<f*d;x++)e[x]&&(this.g[x]=i);return e}mark(e,t,i,r={}){return this.fillMask(nc(this.w,this.h,tc(e,!0,6)),t,{...r,onlyOn:new Set(i),keepNormals:!0})}grid(e,t,i=0,r=0,{round:a=1,flipX:o=!1}={}){const l=Math.max(...e.map(h=>h.length)),u=new Uint8Array(this.w*this.h),c=new Map;e.forEach((h,f)=>[...h].forEach((d,p)=>{const m=t[d];if(!m)return;const M=i+(o?l-1-p:p),x=r+f;this.inb(M,x)&&(u[x*this.w+M]=1,c.set(x*this.w+M,m))})),this.fillMask(u,s.BODY,{round:a,depth:2.5});for(const[h,f]of c)this.m[h]=f}}function Wr(n,e,t,i=t.outline,r=xu){const{w:a,h:o}=n,l=()=>r(a,o),u=l(),c=l(),h=l(),f=u.getContext("2d").createImageData(a,o),d=c.getContext("2d").createImageData(a,o),p=h.getContext("2d").createImageData(a,o),m=i==="none"?null:i==="dark"?[22,18,30]:"tint";for(let M=0;M<o;M++)for(let x=0;x<a;x++){const g=M*a+x,_=n.m[g],E=g*4;if(!_){if(!m)continue;const b=[n.get(x+1,M),n.get(x-1,M),n.get(x,M+1),n.get(x,M-1)].find(L=>L);if(!b)continue;const w=m==="tint"?(e[b]||[0,0,0]).map(L=>L*.35|0):m;f.data.set([...w,255],E),d.data.set([128,128,255,255],E),p.data.set([128,128,255,255],E);continue}let S=e[_];_===s.LINE&&!S&&(S=m==="tint"||!m?(e[s.BODY2]||[0,0,0]).map(b=>b*.55|0):m),S=S||[255,0,255],f.data.set([...S,zh.has(_)?254:255],E);const R=n.n[g*3],A=n.n[g*3+1],D=n.n[g*3+2];d.data.set([R*127+128,A*127+128,D*255,255],E),p.data.set([-R*127+128,A*127+128,D*255,255],E)}return u.getContext("2d").putImageData(f,0,0),c.getContext("2d").putImageData(d,0,0),h.getContext("2d").putImageData(p,0,0),{A:u,N:c,NF:h,w:a,h:o}}const Xi=n=>{const e=Math.hypot(n[0],n[1],n[2])||1;return[n[0]/e,n[1]/e,n[2]/e]},xa=(n,e)=>[n[1]*e[2]-n[2]*e[1],n[2]*e[0]-n[0]*e[2],n[0]*e[1]-n[1]*e[0]],Bt=(n,e)=>n[0]*e[0]+n[1]*e[1]+n[2]*e[2],On=(n,e)=>[n[0]-e[0],n[1]-e[1],n[2]-e[2]],y={add:(n,e)=>[n[0]+e[0],n[1]+e[1],n[2]+e[2]],sub:On,mul:(n,e)=>[n[0]*e,n[1]*e,n[2]*e],lerp:(n,e,t)=>[n[0]+(e[0]-n[0])*t,n[1]+(e[1]-n[1])*t,n[2]+(e[2]-n[2])*t],norm:Xi,cross:xa,dot:Bt};function ic(n,e=[0,1,0]){const t=Xi(n);let i=xa(e,t);Math.hypot(...i)<1e-4&&(i=xa([0,0,1],t)),i=Xi(i);const r=xa(t,i);return[t,r,i]}function Mu(n,e){const t=Bt(n,e.axes[0]),i=Bt(n,e.axes[1]),r=Bt(n,e.axes[2]),[a,o,l]=e.r,u=Math.hypot(t/a,i/o,r/l),c=Math.hypot(t/(a*a),i/(o*o),r/(l*l));return c>1e-9?u*(u-1)/c:-Math.min(a,o,l)}function _u(n,e){const{ba:t,l2:i,rr:r,a2:a,il2:o,r1:l,r2:u}=e,c=Bt(n,t),h=c-i,f=[n[0]*i-t[0]*c,n[1]*i-t[1]*c,n[2]*i-t[2]*c],d=Bt(f,f),p=c*c*i,m=h*h*i,M=Math.sign(r)*r*r*d;return Math.sign(h)*a*m>M?Math.sqrt(d+m)*o-u:Math.sign(c)*a*p<M?Math.sqrt(d+p)*o-l:(Math.sqrt(d*a*o)+c*r)*o-l}function vu(n,e){const t=Math.abs(Bt(n,e.axes[0]))-e.h[0]+e.round,i=Math.abs(Bt(n,e.axes[1]))-e.h[1]+e.round,r=Math.abs(Bt(n,e.axes[2]))-e.h[2]+e.round;return Math.hypot(Math.max(t,0),Math.max(i,0),Math.max(r,0))+Math.min(Math.max(t,i,r),0)-e.round}const Wh=(n,e)=>e*(Math.sin(n[0]*23+n[1]*7)*Math.sin(n[1]*19-n[2]*11)+.5*Math.sin(n[2]*41+n[0]*29)),rc=(n,e)=>n.type==="ell"?Mu(On(e,n.cw),n):n.type==="box"?vu(On(e,n.cw),n):_u(On(e,n.aw),n),jr=(n,e)=>n.rough?rc(n,e)+Wh(e,n.rough):rc(n,e);class nt{constructor({blend:e=.07}={}){this.parts=[],this.flats=[],this.blend=e,this.anchors={feet:[]}}ell(e,t,i,r={}){const a=r.axes||(r.dir?ic(r.dir,r.up):[[1,0,0],[0,1,0],[0,0,1]]);return this.parts.push({type:"ell",c:e,r:t,axes:a,mat:i,group:r.group??1,extra:!!r.extra,paint:r.paint,rough:r.rough,cut:!!r.cut}),this}box(e,t,i,r={}){const a=r.axes||(r.dir?ic(r.dir,r.up):[[1,0,0],[0,1,0],[0,0,1]]);return this.parts.push({type:"box",c:e,h:t,round:Math.min(r.round??.02,...t),axes:a,mat:i,group:r.group??1,extra:!!r.extra,paint:r.paint,rough:r.rough,cut:!!r.cut}),this}seg(e,t,i,r,a,o={}){return this.parts.push({type:"cone",a:e,b:t,r1:i,r2:r,mat:a,group:o.group??1,extra:!!o.extra,paint:o.paint,rough:o.rough,cut:!!o.cut}),this}chain(e,t,i={}){for(let r=0;r+1<e.length;r++)this.seg(e[r].slice(0,3),e[r+1].slice(0,3),e[r][3],e[r+1][3],t,i);return this}flat(e,t,i,r,a,o,l={}){return this.flats.push({c:e,u:Xi(t),v:Xi(i),su:r,sv:a,mask:o,group:l.group??30,extra:!!l.extra,bend:l.bend??.35}),this}field(e){let t=1/0;for(const i of this.parts){if(i.extra||i.cut)continue;let r;if(i.type==="ell")r=Mu(On(e,i.c),i);else if(i.type==="box")r=vu(On(e,i.c),i);else{const a=On(i.b,i.a),o=Math.max(1e-9,Bt(a,a)),l=i.r1-i.r2;r=_u(On(e,i.a),{ba:a,l2:o,rr:l,a2:o-l*l,il2:1/o,r1:i.r1,r2:i.r2})}r<t&&(t=r)}return t}static surface(e,t,i){const r=1/Math.hypot(i[0]/t[0],i[1]/t[1],i[2]/t[2]);return[e[0]+i[0]*r,e[1]+i[1]*r,e[2]+i[2]*r]}}const ac={towards:.6,away:-.6},Vh=.52;function Ki(n,{height:e,scale:t,facing:i="towards",yaw:r=ac[i]??ac.towards,pitch:a=Vh,lineGap:o=.12}={}){const l=Math.cos(r),u=Math.sin(r),c=Math.cos(a),h=Math.sin(a),f=G=>[G[0]*l-G[2]*u,G[1],G[0]*u+G[2]*l],d=G=>[G[0]*l+G[2]*u,G[1],-G[0]*u+G[2]*l],p=[0,-h,-c],m=[0,c,-h],M=[1,0,0],x=[0,h,c],g=n.blend,_=n.parts.map(G=>{if(G.type==="ell"){const Fe=f(G.c),qe=G.axes.map(f),Ke=Math.max(...G.r);return{...G,cw:Fe,axes:qe,bc:Fe,br:Ke+(G.rough||0)*1.5}}if(G.type==="box"){const Fe=f(G.c),qe=G.axes.map(f);return{...G,cw:Fe,axes:qe,bc:Fe,br:Math.hypot(...G.h)+(G.rough||0)*1.5}}const he=f(G.a),se=f(G.b),ye=On(se,he),Qe=Math.max(1e-9,Bt(ye,ye)),Ce=G.r1-G.r2;return{...G,aw:he,ba:ye,l2:Qe,rr:Ce,a2:Qe-Ce*Ce,il2:1/Qe,bc:y.lerp(he,se,.5),br:Math.sqrt(Qe)/2+Math.max(G.r1,G.r2)}}),E=n.flats.map(G=>{const he=f(G.c),se=f(G.u),ye=f(G.v);return{...G,cw:he,uw:se,vw:ye,nw:Xi(xa(se,ye)),bc:he,br:Math.hypot(G.su,G.sv)}}),S=[..._,...E],R=G=>{const he=Bt(G.bc,M),se=Bt(G.bc,m),ye=G.br+(G.uw?0:g);return[he-ye,he+ye,se-ye,se+ye]};for(const G of S)[G.x0,G.x1,G.u0,G.u1]=R(G);const A=S.filter(G=>!G.extra&&!G.cut),D=Math.min(...A.map(G=>G.u0+(G.uw?0:g))),b=Math.max(...A.map(G=>G.u1-(G.uw?0:g))),w=t??e/Math.max(1e-6,b-D),L=Math.min(...S.map(G=>G.x0)),C=Math.max(...S.map(G=>G.x1)),N=Math.min(...S.map(G=>G.u0)),O=Math.max(...S.map(G=>G.u1)),I=Math.ceil((C-L)*w)+4,B=Math.ceil((O-N)*w)+2,W=new Xt(I,B),$=new Float32Array(I*B).fill(1/0),ae=new Int16Array(I*B).fill(-1),q=8,ee=Math.ceil(I/q),F=Math.ceil(B/q),re=Array.from({length:ee*F},()=>[]);S.forEach((G,he)=>{const se=Math.max(0,Math.floor((G.x0-L)*w/q)),ye=Math.min(ee-1,Math.floor(((G.x1-L)*w+2)/q)),Qe=Math.max(0,Math.floor((O-G.u1)*w/q)),Ce=Math.min(F-1,Math.floor(((O-G.u0)*w+1)/q));for(let Fe=Qe;Fe<=Ce;Fe++)for(let qe=se;qe<=ye;qe++)re[Fe*ee+qe].push(he)});const ue=.25/w,Re=(G,he)=>{const se=Math.max(g-Math.abs(G-he),0)/g;return Math.min(G,he)-se*se*g*.25};for(let G=0;G<B;G++)for(let he=0;he<I;he++){const se=re[Math.floor(G/q)*ee+Math.floor(he/q)];if(!se.length)continue;const ye=L+(he+.5-1)/w,Qe=O-(G+.5)/w,Ce=y.add(y.add(y.mul(M,ye),y.mul(m,Qe)),y.mul(x,50));let Fe=1/0,qe=-1/0;const Ke=[],Tt=[];for(const je of se){const He=S[je],P=On(Ce,He.bc),v=Bt(P,p),U=He.br+(He.uw?0:g),V=Bt(P,P)-U*U,Z=v*v-V;if(Z<0)continue;if(He.uw){Tt.push(He);continue}if(He.cut){Ke.push(He);continue}const le=Math.sqrt(Z);Fe=Math.min(Fe,-v-le),qe=Math.max(qe,-v+le),Ke.push(He)}let Ut=1/0,jt=-1,yt=0,Rt=null;if(Ke.length){const je=new Map;for(const v of Ke){let U=je.get(v.group);U||je.set(v.group,U=[]),U.push(v)}const He=(v,U)=>{let V=1/0;for(const Z of v)Z.cut||(V=V===1/0?jr(Z,U):Re(V,jr(Z,U)));for(const Z of v)Z.cut&&(V=Math.max(V,-jr(Z,U)));return V};let P=Math.max(0,Fe);for(let v=0;v<96&&P<qe;v++){const U=y.add(Ce,y.mul(p,P));let V=1/0,Z=null;for(const[le,de]of je){const Q=He(de,U);Q<V&&(V=Q,Z=le)}if(V<ue){const le=je.get(Z),de=.5/w;Rt=Xi([He(le,[U[0]+de,U[1],U[2]])-He(le,[U[0]-de,U[1],U[2]]),He(le,[U[0],U[1]+de,U[2]])-He(le,[U[0],U[1]-de,U[2]]),He(le,[U[0],U[1],U[2]+de])-He(le,[U[0],U[1],U[2]-de])]);let Q=le[0],te=1/0;for(const fe of le){if(fe.cut)continue;const Le=jr(fe,U);Le<te&&(te=Le,Q=fe)}for(const fe of le)if(fe.cut&&-jr(fe,U)>te-ue*2){Q=fe;break}Ut=P,jt=Z,yt=Q.paint?Q.paint(d(U),Q)??Q.mat:Q.mat;break}P+=Math.max(V*.9,ue*.5)}}for(const je of Tt){const He=Bt(p,je.nw);if(Math.abs(He)<1e-4)continue;const P=Bt(On(je.cw,Ce),je.nw)/He;if(P>=Ut)continue;const v=y.add(Ce,y.mul(p,P)),U=On(v,je.cw),V=Bt(U,je.uw)/je.su,Z=Bt(U,je.vw)/je.sv;if(Math.abs(V)>1||Math.abs(Z)>1)continue;const le=je.mask(V,Z);if(!le)continue;let de=He>0?y.mul(je.nw,-1):je.nw;de=Xi(y.add(de,y.add(y.mul(je.uw,V*je.bend),y.mul(je.vw,Z*je.bend*.5)))),Ut=P,jt=je.group,yt=le,Rt=de}if(!Rt||!yt)continue;const z=G*I+he;$[z]=Ut,ae[z]=jt,W.px(he,G,yt,Bt(Rt,M),-Bt(Rt,m),Bt(Rt,x))}const Be=[];for(let G=0;G<B;G++)for(let he=0;he<I;he++){const se=G*I+he;if(W.m[se])for(const[ye,Qe]of[[1,0],[-1,0],[0,1],[0,-1]]){const Ce=he+ye,Fe=G+Qe;if(Ce<0||Fe<0||Ce>=I||Fe>=B)continue;const qe=Fe*I+Ce;if(W.m[qe]&&ae[qe]!==ae[se]&&$[qe]-$[se]>o){Be.push(se);break}}}for(const G of Be)[s.EYE,s.GLINT,s.MAGIC,s.MAGIC2,s.NOSE,s.COLLAR,s.WOKEN,s.RUNE,s.GLOW].includes(W.m[G])||(W.m[G]=s.LINE);for(let G=0;G<B;G++)for(let he=0;he<I;he++){const se=G*I+he;if(W.m[se]!==s.EYE)continue;const ye=G>0&&W.m[se-I]===s.EYE,Qe=he>0&&W.m[se-1]===s.EYE,Ce=he+1<I&&W.m[se+1]===s.EYE&&G+1<B&&W.m[se+I]===s.EYE;!ye&&!Qe&&Ce&&(W.m[se]=s.GLINT)}let We=-1;for(let G=B-1;G>=0&&We<0;G--)for(let he=0;he<I;he++)if(W.m[G*I+he]){We=G;break}const j=We>=0&&We<B-1?B-1-We:0;if(We>=0&&We<B-1){const G=B-1-We;for(let he=B-1;he>=0;he--)for(let se=0;se<I;se++){const ye=he*I+se,Qe=(he-G)*I+se,Ce=he-G>=0;W.m[ye]=Ce?W.m[Qe]:0,W.g[ye]=Ce?W.g[Qe]:0;for(let Fe=0;Fe<3;Fe++)W.n[ye*3+Fe]=Ce?W.n[Qe*3+Fe]:0}}return W.bodyH=Math.round((b-D)*w),{sp:W,s:w,project:G=>{const he=f(G);return[+((he[0]-L)*w+1).toFixed(1),+((O-Bt(he,m))*w+j).toFixed(1)]}}}const Zn=(n,e=9,t=.3)=>Ht(Math.floor(n[0]*e),Math.floor(n[1]*e)+Math.floor(n[2]*e)*97,7)<t,Vr={wing:(n,e)=>(t,i)=>{const r=(t+1)/2,a=1-.35*r*r,o=-1+.55*r+.18*Math.abs(Math.sin(r*Math.PI*6));return i>a||i<o?null:i>a-.35*(1-r*.5)?e:Math.floor(r*9)%2?n:e},ear:(n,e=s.EAR,t=s.BODY3)=>(i,r)=>{const a=(r+1)/2,o=.95*Math.sin(Math.PI*Math.min(1,.15+a*.85))*(1-a*.35);return Math.abs(i)>o?null:a>.82?t:Math.abs(i)<o*.5&&a<.7&&a>.12?e:n},flame:(n,e)=>(t,i)=>{const r=(i+1)/2,a=Math.sin(Math.PI*Math.min(1,r*1.1))*(1-r)*1.4;return Math.abs(t)>a?null:Math.abs(t)<a*.45&&r<.6?e:n},membrane:n=>(e,t)=>{const i=(e+1)/2,r=-1+.35*Math.abs(Math.sin(i*Math.PI*3));return t<r||t>1-.2*i?null:n},spotted:(n,e,t)=>(i,r)=>{if(Math.hypot(i,r*1.2)>1)return null;const o=Math.hypot(i-.35,r-.1);return o<.18?t:o<.3?e:n}},Yh={hair:s.HAIR,hat:s.HAT,headphones:s.PHONES,top:s.TOP,jacket:s.JACKET,jeans:s.JEANS,sneakers:s.SHOES,broom:s.BROOM,bristles:s.STRAW,skin:s.SKIN},sc={hair:[.01,.7,.85],hat:[.74,.45,.45],headphones:[.92,.55,.9],top:[.13,.15,.95],jacket:[.72,.45,.7],jeans:[.6,.5,.7],sneakers:[0,0,.95],broom:[.08,.55,.55],bristles:[.12,.55,.9],skin:[.07,.3,.94]};function Xh(n,e=sc){const t={...sc,...e},i={hair:n.hairHue,jacket:n.cloakHue,hat:n.hatHue,top:n.topHue,jeans:n.jeansHue,sneakers:n.shoeHue,headphones:n.phonesHue},r={};for(const[a,o]of Object.entries(Yh)){const[l,u,c]=t[a];r[o]=xe(i[a]??l,u,c)}return r[s.EYE]=[24,18,30],r[s.GLINT]=[255,255,245],r[s.NOSE]=[20,16,24],r[s.MAGIC]=xe(n.glowHue??.13,.5,1),r[s.MAGIC2]=xe(n.glowHue??.13,.15,1),r[s.BELLY]=[245,245,240],r}const Kh={rise:.78,descend:-.66,brake:.44};function qh(n){const e=new nt({blend:.03}),t=n%3,i=.5,r=.05,a=[[0,.02,-.01],[.02,-.01,.02],[-.01,.015,.01]][t],o=m=>i-r*(m/.62);e.seg([-.5,o(-.5),0],[.62,o(.62),0],.022,.018,s.BROOM,{group:2}),e.ell([-.64,o(-.64)+.005,0],[.2,.1,.11],s.STRAW,{dir:[1,r*1.6,0],group:3,paint:m=>m[0]<-.76?s.MAGIC2:m[0]>-.5?s.BROOM:void 0});const l=[-1,1].map(m=>[.5,o(.5)+.03,m*.045]),u=[-1,1].map(m=>[.2,i+.24+a[1],m*.1]);for(const m of[0,1]){const M=m?1:-1,x=M>0?7:5;e.seg(u[m],l[m],.04,.03,s.JACKET,{group:x}),e.ell(l[m],[.035,.03,.035],s.SKIN,{group:x})}const c=[.3+a[0],i+.27+a[1],0],h=[.07,i+.28+a[1]*.5,0],f=[-.15,i+.35+a[2],0];e.ell(h,[.17,.1,.11],s.JACKET,{dir:[1,-.25,0],group:1,paint:m=>m[1]<h[1]-.04&&Math.abs(m[2])<.055?s.TOP:void 0}),e.ell(f,[.11,.08,.1],s.JEANS,{dir:[1,-.3,0],group:1}),e.chain([[...y.add(f,[-.02,.06,0]),.07],[...y.add(f,[-.18,.08+a[0]*2,0]),.05],[...y.add(f,[-.34,.05+a[1]*3,.02]),.025]],s.JACKET,{group:12}),[[[-.32,i+.5+a[1]*2,-.07],[-.46,i+.38+a[0]*2,-.08]],[[-.34,i+.33+a[2]*2,.08],[-.55,i+.44-a[1]*3,.1]]].forEach(([m,M],x)=>{const g=x?6:4,_=y.add(f,[-.04,0,x?.06:-.06]);e.seg(_,m,.055,.045,s.JEANS,{group:g}),e.seg(m,M,.045,.04,s.JEANS,{group:g}),e.ell(y.add(M,[-.05,0,0]),[.08,.04,.045],s.SHOES,{dir:[-1,.3,0],group:g,paint:E=>E[1]<M[1]-.03?s.BELLY:void 0})}),e.ell(c,[.11,.115,.1],s.SKIN,{group:8,paint:m=>m[0]<c[0]-.01||m[1]>c[1]+.075?s.HAIR:void 0});for(const m of[-1,1]){const M=nt.surface(c,[.11,.115,.1],y.norm([.85,.1,m*.45]));e.ell(M,[.026,.036,.026],s.BELLY,{group:8}),e.ell(y.add(M,[.012,0,m*.004]),[.014,.018,.014],s.EYE,{group:8})}e.ell(nt.surface(c,[.11,.115,.1],y.norm([1,-.45,0])),[.012,.016,.04],s.BELLY,{group:8}),e.chain([[...y.add(c,[-.06,.03,0]),.065],[...y.add(c,[-.22,.05+a[1]*2,.01]),.05],[...y.add(c,[-.4,.06+a[2]*3,.02]),.03],[...y.add(c,[-.55,.07+a[0]*3,.02]),.012]],s.HAIR,{group:9});for(const m of[-1,1])e.ell(y.add(c,[-.015,0,m*.105]),[.05,.055,.03],s.PHONES,{group:10});e.chain([[...y.add(c,[-.005,.03,-.095]),.015],[...y.add(c,[-.02,.12,0]),.015],[...y.add(c,[-.005,.03,.095]),.015]],s.PHONES,{group:10});const p=y.add(c,[-.1+a[0],.2+a[1]*2,0]);e.ell(p,[.16,.014,.15],s.HAT,{dir:[1,.9,0],group:11}),e.chain([[...y.add(p,[-.02,.02,0]),.08],[...y.add(p,[-.14,.13,0]),.04],[...y.add(p,[-.3,.14+a[2]*2,0]),.012]],s.HAT,{group:11,paint:m=>Math.hypot(m[0]-p[0],m[1]-p[1])<.06?s.MAGIC:void 0}),e.seg(y.add(p,[.08,-.02,.08]),y.add(c,[.04,-.09,.08]),.008,.008,s.HAT,{group:11}),e.anchors.hand=l[1],e.anchors.hatTip=y.add(p,[-.3,.14+a[2]*2,0]);for(const[m,M,x,g]of[[-.86,o(-.8)+.05,.03,.22],[-.88,o(-.8)-.04,-.04,.16],[-.7,i+.45,.05,.14],[-.2,i+.5,-.04,.12]]){const _=t*.05%.1;e.seg([m-_,M,x],[m-_-g,M,x],.01,.004,s.MAGIC2,{group:30,extra:!0})}return e.ell([.02,.005,0],[.2,.005,.12],s.NOSE,{group:0}),e}const Zh={stand:{frames:3,fps:3},land:{frames:3,fps:10},takeoff:{frames:3,fps:10},talk:{frames:4,fps:2.5},placeSigil:{frames:3,fps:6},liftSigil:{frames:3,fps:6},sit:{frames:2,fps:1.5}},Ao=.34,bu={binding:[-.02,.31,-.2],dir:[.02,1,-.04]},$h={stand:[0,1,2].map(n=>({breathe:[0,.006,.012][n],sway:[0,.02,.035][n],free:[.04,.5+[0,.006,.012][n],.18],hand:"rest",broom:bu})),land:[{crouch:.2,hop:.01,broom:{astride:!0},sway:.05},{crouch:.1,bend:.1,broom:{binding:[-.28,.26,-.08],dir:[.6,.5,-.06]},legUp:[.18,.24,.12],sway:.03,free:[.2,.58,.2],hand:"rest"},{breathe:.004,broom:{binding:[.06,.31,-.2],dir:[.18,1,-.03]},sway:.015,free:[.06,.52,.19],hand:"rest"}],takeoff:[{crouch:.1,broom:{binding:[-.1,.3,-.17],dir:[.35,.7,-.04]},free:[.16,.58,.2],hand:"rest",sway:.02},{crouch:.15,bend:.1,broom:{binding:[-.3,.28,-.06],dir:[.7,.4,-.04]},legUp:[.1,.26,.13],sway:.04,free:[.24,.55,.17],hand:"rest"},{hop:.1,broom:{astride:!0},toes:!0,sway:.06}],talk:[{free:[.47,.84,.13],hand:"palm",tilt:.35,mouth:!0,sway:.01},{free:[.32,1.18,.12],hand:"point",tilt:-.25,look:.12,sway:.02},{free:[.24,1.16,.3],elbow:[.26,.88,.26],hand:"wave",tilt:.45,mouth:!0,sway:.03},{free:[.15,.76,.1],hand:"chest",tilt:-.35,breathe:.01,sway:.015}],placeSigil:[{free:[.16,1.62,.1],hand:"palm",look:.22,breathe:.01,sway:.02},{free:[.42,1,.12],hand:"palm",look:.08,sway:.03},{crouch:.7,bend:.55,free:[.38,.1,.13],hand:"down",look:-.08,sway:.04}],liftSigil:[{crouch:.7,bend:.55,free:[.36,.08,.13],hand:"down",look:-.08,sway:.02},{crouch:.25,bend:.18,free:[.44,.82,.12],hand:"palm",look:.05,sway:.04},{breathe:.012,free:[.2,1.64,.1],hand:"palm",look:.25,sway:.05,toes:!0}],sit:[0,1].map(n=>({sit:!0,swing:[.06,-.06][n],bend:-.08,look:[.02,.1][n],tilt:[.15,-.2][n],sway:[.01,.03][n],breathe:[0,.008][n],broom:{binding:[-.24,.31,-.3],dir:[.32,1,-.06]},free:[.2,Ao+.14,.15],far:[.18,Ao+.14,-.13],hand:"rest"}))};function Jh(n,e,t){const i=Math.hypot(e[0]-n[0],e[1]-n[1]),r=y.lerp(n,e,.5);if(i>=2*t)return r;const a=Math.sqrt(t*t-i*i/4),o=(e[0]-n[0])/i,l=(e[1]-n[1])/i;return[r[0]-l*a,r[1]+o*a,r[2]]}function Qh(n,e){const t=$h[n],i={crouch:0,bend:0,hop:0,breathe:0,sway:0,tilt:0,look:0,broom:bu,...t[e%t.length]},r=new nt({blend:.03}),a=i.hop,o=i.sway,l=i.sit?Ao+.06:.45-i.crouch*.21+a,u=-i.crouch*.12,c=!!i.broom.astride,h=l-.04,f=c?[1,0,0]:y.norm(i.broom.dir),d=c?[-.36,h,0]:i.broom.binding,p=w=>y.add(d,y.mul(f,w));r.seg(p(0),p(c?.98:1.1),.022,.018,s.BROOM,{group:2}),r.ell(p(-.13),[.17,.07,.08],s.STRAW,{dir:f,group:3,paint:w=>{const L=y.dot(y.sub(w,d),f);return L<-.22?s.MAGIC2:L>-.01?s.BROOM:void 0}});for(const w of[-1,1]){const L=w>0?6:4,C=[u,l,w*.07],N=i.sit?i.swing*w:0,O=i.sit?[.24+N,.09+Math.max(0,N)*.6,w*.1]:w>0&&i.legUp?i.legUp:[(w>0?.05:-.01)+(i.toes?-.03:0),.07+(i.toes?a*.4:a),w*.1],I=i.sit?[.21,l+.01,w*.09]:Jh(C,O,.21);r.seg(C,I,.055,.045,s.JEANS,{group:L}),r.seg(I,O,.045,.04,s.JEANS,{group:L});const B=i.toes?[.03,-.045,0]:[.05,-.03,0];r.ell(y.add(O,B),[.08,.04,.045],s.SHOES,{dir:i.toes?[1,-.6,0]:[1,0,0],group:L,paint:W=>W[1]<O[1]+B[1]-.015?s.BELLY:void 0})}const m=[Math.sin(i.bend),Math.cos(i.bend),0],M=[Math.cos(i.bend),-Math.sin(i.bend),0],x=[u,l+.03,0];r.ell(x,[.1,.08,.105],s.JEANS,{group:1});const g=y.add(x,y.add(y.mul(m,.19),[0,i.breathe,0]));r.ell(g,[.1,.15+i.breathe*.5,.115],s.JACKET,{dir:M,group:1,paint:w=>y.dot(y.sub(w,g),M)>.045&&Math.abs(w[2])<.05?s.TOP:void 0}),r.chain([[...y.add(g,y.add(y.mul(M,-.07),y.mul(m,-.08))),.07],[...y.add(g,y.add(y.mul(M,-.11-o),y.mul(m,-.2))),.05],[...y.add(g,y.add(y.mul(M,-.13-o*1.6),y.mul(m,-.29))),.025]],s.JACKET,{group:12});const _=y.add(g,y.add(y.mul(m,.27),[i.look*.03,0,i.tilt*.04])),E=w=>y.add(g,y.add(y.mul(m,.1),[0,0,w*.12])),S=c?[.28,h+.03,-.05]:p(Math.max(.12,(Math.min(.62,l+.2)-d[1])/Math.max(.3,f[1]))),R=c?[.28,h+.03,.05]:i.free;for(const w of[-1,1]){const L=w>0?7:5,C=E(w),N=w>0?R:i.far||S,O=w>0&&i.elbow?i.elbow:y.add(y.lerp(C,N,.5),[-.03,-.02,w*.05]);r.seg(C,O,.04,.035,s.JACKET,{group:L}),r.seg(O,N,.035,.03,s.JACKET,{group:L});const I=w>0&&!c?i.hand:"grip";if(I==="palm")r.ell(N,[.045,.02,.04],s.SKIN,{group:L});else if(I==="down")r.ell(N,[.045,.02,.04],s.SKIN,{dir:[1,.15,0],group:L});else if(I==="wave"){r.ell(N,[.03,.045,.04],s.SKIN,{group:L});for(const B of[-1,0,1])r.seg(y.add(N,[0,.03,B*.02]),y.add(N,[B*.01,.065,B*.03]),.01,.008,s.SKIN,{group:L})}else I==="point"?(r.ell(N,[.035,.03,.035],s.SKIN,{group:L}),r.seg(y.add(N,[0,.02,0]),y.add(N,[.01,.08,0]),.012,.01,s.SKIN,{group:L})):r.ell(N,[.035,.03,.035],s.SKIN,{group:L})}r.ell(_,[.11,.115,.1],s.SKIN,{group:8,paint:w=>w[0]<_[0]-.01||w[1]>_[1]+.075?s.HAIR:void 0});for(const w of[-1,1])r.ell(nt.surface(_,[.11,.115,.1],y.norm([.85,.05+i.look,w*.45+i.tilt*.1])),[.016,.026,.016],s.EYE,{group:8});i.mouth&&r.ell(nt.surface(_,[.11,.115,.1],y.norm([1,-.5+i.look,i.tilt*.1])),[.012,.016,.025],s.NOSE,{group:8}),r.chain([[...y.add(_,[-.06,.02,0]),.06],[...y.add(_,[-.12-o,-.12,.02+i.tilt*.03]),.05],[...y.add(_,[-.13-o*1.5,-.25,.03+i.tilt*.04]),.03]],s.HAIR,{group:9});for(const w of[-1,1])r.ell(y.add(_,[-.015,0,w*.105]),[.05,.055,.03],s.PHONES,{group:10});r.chain([[...y.add(_,[-.005,.03,-.095]),.015],[...y.add(_,[-.005,.11,-.05]),.015],[...y.add(_,[-.005,.125,0]),.015],[...y.add(_,[-.005,.11,.05]),.015],[...y.add(_,[-.005,.03,.095]),.015]],s.PHONES,{group:10});const A=y.add(_,[-.03,.1,i.tilt*.02]),D=i.tilt*.05,b=y.add(A,[-.16-o*.5,.27,D*2]);return r.ell(A,[.16,.014,.15],s.HAT,{dir:[1,.25-i.look*.8,i.tilt*.3],group:11}),r.chain([[...y.add(A,[0,.01,0]),.085],[...y.add(A,[-.05,.17,D]),.045],[...b,.012]],s.HAT,{group:11,paint:w=>w[1]<A[1]+.045?s.MAGIC:void 0}),r.ell([.02,.005,0],[.2,.005,.12],s.NOSE,{group:0}),r.anchors.hand=R,r.anchors.hatTip=b,r}function Su({frame:n=0,lean:e=!1,pose:t}={}){if(t==="fast")return qh(n);if(Zh[t])return Qh(t,n);const i=t==="rise",r=t==="descend",a=t==="brake",o=i||r||a,l=new nt({blend:.03}),u=o?0:[0,.025,.045][n%3],c=o?0:[0,.015,-.01][n%3]+(e?.08:0),h=.42+u,f=i?.3:r?-.27:a?-.12:e?.1:0,d=Math.min(.1,Math.max(0,f)),p=o?[.02,.06][n%2]:[0,.03,.05][n%3],m=r?1:i?-.6:0;l.seg([-.5,h-c*2,0],[.62,h+c*3,0],.022,.018,s.BROOM,{group:2}),a?l.ell([-.56,h-.08,0],[.17,.07,.09],s.STRAW,{dir:[.55,1,0],group:3,paint:E=>E[1]<h-.18?s.MAGIC2:E[1]>h-.01?s.BROOM:void 0}):l.ell([-.62,h-c*2-.01,0],[.17,.07,.08],s.STRAW,{dir:[1,c,0],group:3,paint:E=>E[0]<-.72?s.MAGIC2:E[0]>-.5?s.BROOM:void 0});for(const E of[-1,1]){const S=[-.04,h+.06,E*.07],R=a?[.18,h-.01,E*.14]:r?[.16,h-.05,E*.14]:i?[.06,h-.07,E*.14]:[.12+f*.5,h-.02,E*.14],A=a?E>0?[.44,h-.02+p,E*.13]:[.3,h-.16,E*.13]:r?[.2,h-.26,E*.13]:i?[-.1,h-.23,E*.13]:[.08+f,h-.2,E*.13];l.seg(S,R,.055,.045,s.JEANS,{group:E>0?6:4}),l.seg(R,A,.045,.04,s.JEANS,{group:E>0?6:4}),l.ell(y.add(A,[.05,-.02,0]),[.08,.04,.045],s.SHOES,{group:E>0?6:4,paint:D=>D[1]<A[1]-.04?s.BELLY:void 0})}l.ell([-.04,h+.08,0],[.11,.07,.1],s.JEANS,{group:1});const M=[0+f*.8,h+.26-Math.abs(f)*.3,0];l.ell(M,[.1,.16,.11],s.JACKET,{dir:[f*2.5,1,0],up:[-1,0,0],group:1,paint:E=>E[0]>M[0]+.04&&Math.abs(E[2])<.055?s.TOP:void 0}),a?l.chain([[...y.add(M,[-.08,-.06,0]),.07],[...y.add(M,[-.02,.12+p,.02]),.05],[...y.add(M,[.14,.18+p,.03]),.025]],s.JACKET,{group:12}):o&&l.chain([[...y.add(M,[-.08,-.1,0]),.07],[...y.add(M,[-.2,-.12+m*(.08+p),0]),.05],[...y.add(M,[-.3,-.12+m*(.16+p*1.5),.02]),.025]],s.JACKET,{group:12});const x=y.add(M,[.03+f*.5,.26,0]),g=y.add(x,[a?.05:r?-.01:-.03,a?.06:.1,0]);for(const E of[-1,1]){const S=y.add(M,[.01,.11,E*.11]),R=r&&E>0?y.add(g,[.1,.01,.1]):a?[.3,h+.03,E*.05]:[.26+f,h+.03,E*.05],A=r&&E>0?y.add(S,[.1,.02,.1]):y.lerp(S,R,.5);l.seg(S,A,.04,.035,s.JACKET,{group:E>0?7:5}),l.seg(A,R,.035,.03,s.JACKET,{group:E>0?7:5}),l.ell(R,[.035,.03,.035],s.SKIN,{group:E>0?7:5}),E>0&&(l.anchors.hand=R)}l.ell(x,[.11,.115,.1],s.SKIN,{group:8,paint:E=>E[0]<x[0]-.01||E[1]>x[1]+.075?s.HAIR:void 0});for(const E of[-1,1])l.ell(nt.surface(x,[.11,.115,.1],y.norm([.85,.05,E*.45])),[.016,.026,.016],s.EYE,{group:8});a?l.chain([[...y.add(x,[-.06,.06,0]),.06],[...y.add(x,[.04,.13+p,.03]),.045],[...y.add(x,[.2,.08+p,.04]),.02]],s.HAIR,{group:9}):l.chain([[...y.add(x,[-.06,.02,0]),.06],[...y.add(x,[-.18-d,-.05+p+m*.1,.02]),.045],[...y.add(x,[-.3-d*1.5,-.08+p*1.6+m*.22,.03]),.02]],s.HAIR,{group:9});for(const E of[-1,1])l.ell(y.add(x,[-.015,0,E*.105]),[.05,.055,.03],s.PHONES,{group:10});l.chain([[...y.add(x,[-.005,.03,-.095]),.015],[...y.add(x,[-.005,.11,-.05]),.015],[...y.add(x,[-.005,.125,0]),.015],[...y.add(x,[-.005,.11,.05]),.015],[...y.add(x,[-.005,.03,.095]),.015]],s.PHONES,{group:10});const _=i?.1:0;if(l.ell(g,[.16,.014,.15],s.HAT,{dir:a?[1,-.55,0]:[1,.25+_*3,0],group:11}),l.anchors.hatTip=a?y.add(g,[.2,.22+p*.5,0]):y.add(g,[-.16-d*1.5-_,.27+p*.5-_*.5,0]),l.chain(a?[[...y.add(g,[0,.01,0]),.085],[...y.add(g,[.06,.16,0]),.045],[...y.add(g,[.2,.22+p*.5,0]),.012]]:[[...y.add(g,[0,.01,0]),.085],[...y.add(g,[-.05-d-_*.5,.17-_*.3,0]),.045],[...y.add(g,[-.16-d*1.5-_,.27+p*.5-_*.5,0]),.012]],s.HAT,{group:11,paint:E=>E[1]<g[1]+.045?s.MAGIC:void 0}),o){const E=Kh[t]+(a?[0,.06][n%2]:0),S=Math.cos(E),R=Math.sin(E),A=[0,h,0],D=C=>[A[0]+(C[0]-A[0])*S-(C[1]-A[1])*R,A[1]+(C[0]-A[0])*R+(C[1]-A[1])*S,C[2]],b=C=>[A[0]+(C[0]-A[0])*S+(C[1]-A[1])*R,A[1]-(C[0]-A[0])*R+(C[1]-A[1])*S,C[2]],w=C=>[C[0]*S-C[1]*R,C[0]*R+C[1]*S,C[2]];for(const C of l.parts)if(C.type==="ell"?(C.c=D(C.c),C.axes=C.axes.map(w)):(C.a=D(C.a),C.b=D(C.b)),C.paint){const N=C.paint;C.paint=(O,I)=>N(b(O),I)}for(const C of l.flats)C.c=D(C.c),C.u=w(C.u),C.v=w(C.v);l.anchors.hand=D(l.anchors.hand),l.anchors.hatTip=D(l.anchors.hatTip);const L=Math.min(...l.parts.map(C=>C.type==="ell"?C.c[1]-Math.max(...C.r):Math.min(C.a[1]-C.r1,C.b[1]-C.r2)));if(L<.08){for(const C of l.parts){const N=.08-L;C.type==="ell"?C.c=[C.c[0],C.c[1]+N,C.c[2]]:(C.a=[C.a[0],C.a[1]+N,C.a[2]],C.b=[C.b[0],C.b[1]+N,C.b[2]])}for(const C of["hand","hatTip"])l.anchors[C]=y.add(l.anchors[C],[0,.08-L,0])}if(a){const C=D([-.45,h-.24,0]);for(let N=0;N<5;N++){const O=N+n*.5,I=.055-N*.008;l.ell([C[0]+.1+O*.08,Math.max(.04,C[1]-.02+Math.sin(O*1.9)*.04),Math.cos(O*1.3)*.06],[I,I*.8,I],N<2?s.BELLY:N%2?s.MAGIC:s.MAGIC2,{group:25+N,extra:!0})}}if(i){const C=D([-.8,h,0]);for(let N=0;N<5;N++){const O=N+n*.5,I=.05-N*.007;l.ell([C[0]-.02+Math.sin(O*2.1)*.06,Math.max(.04,C[1]-.08-O*.09),Math.cos(O*1.7)*.05],[I,I,I],N%2?s.MAGIC:s.MAGIC2,{group:20+N,extra:!0})}}}return l.ell([.02,.005,0],[.2,.005,.12],s.NOSE,{group:0}),l}const Eu=(n={})=>Math.round((n.size||8)*Math.sqrt(n.growth||20)*(2/(n.pixel||3))*1.9),ks=new Map,To=n=>(ks.has(n)||ks.set(n,Ki(Su({frame:0}),{height:n}).s),ks.get(n)),jh=(n={})=>To(Eu(n)),ed={away:-Math.PI/2,towards:Math.PI/2};function td(n={},{frame:e=0,lean:t=!1,facing:i="towards",pose:r,heading:a="side"}={}){const o=Eu(n),l=ed[a],u=Su({frame:e,lean:t,pose:r}),{sp:c,project:h,s:f}=l!==void 0?Ki(u,{scale:To(o),yaw:l}):r?Ki(u,{scale:To(o),facing:i}):Ki(u,{height:o,facing:i});c.scale=f,u.anchors.hand&&(c.anchors={hand:h(u.anchors.hand),hatTip:h(u.anchors.hatTip)});let d=0;for(let p=0;p<400&&d<6;p++){const m=p*37%c.w,M=p*53%Math.floor(c.h*.8);c.get(m,M)||c.get(m+1,M)||c.get(m-1,M)||c.get(m,M+1)||c.get(m,M-1)||(m*7+M*13+e*5)%11||(c.px(m,M,s.MAGIC2),d++)}return c}const ct=(n,e=0)=>{const t=Math.sin(n*127.1+e*311.7)*43758.5453;return t-Math.floor(t)},Ir=n=>{const e=ct(Math.floor(n[0]*14)+Math.floor(n[2]*14)*13,Math.floor(n[1]*6));return e<.14?s.BARKD:e>.88?s.BARKL:void 0},nd=n=>e=>{const t=ct(Math.floor(e[0]*10),Math.floor(e[1]*10)+Math.floor(e[2]*10)*7);return e[1]<n[1]-.2||t<.2?s.LEAF3:t>.8?s.LEAF2:void 0},Mi=(n,e,t,i,r=!0)=>n.ell(e,t,s.STONE,{group:i,rough:.025,paint:a=>a[1]>e[1]+t[1]*.45&&r?s.MOSS:Math.abs(Math.sin(a[0]*13+a[2]*7))<.06?s.STONED:void 0}),Da=(n,e,t,i)=>n.ell(e,t,s.LEAF,{group:i,rough:.04,paint:nd(e)}),nn=(n,e,t)=>n.chain(e,s.TRUNK,{group:t,rough:.012,paint:Ir}),Pa=(n,e,t,i,r,a=.3,o=s.LEAF2)=>{for(let l=0;l<e;l++){const u=ct(r,l)*6.283,c=t*Math.sqrt(ct(l,r)),h=Math.cos(u)*c,f=Math.sin(u)*c*.7;n.ell([h,a*.3,f],[.07,a*(.35+ct(l,4)*.3),.07],o,{group:i+l%3,paint:d=>d[1]>a*.45?s.LEAF:void 0})}},Ia=(n,e,t,i)=>n.ell(e,[t[0],.015,t[1]],s.WATER,{group:i}),id={"sleeping-giant"(n){const e=t=>i=>{const r=ct(Math.floor(i[0]*8),Math.floor(i[2]*8)+Math.floor(i[1]*8)*5);return r<.15?s.LEAF3:r>.86?s.LEAF2:void 0};for(const[t,i]of[[[.85,.42,0],[.7,.5,.66]],[[0,.3,0],[.62,.36,.6]],[[-.8,.3,0],[.56,.36,.62]],[[1.85,.5,.02],[.5,.5,.48]],[[-1.55,.72,.3],[.38,.5,.3]],[[-1.55,.72,-.3],[.38,.5,.3]],[[-2.2,.3,.32],[.42,.3,.26]],[[-2.2,.3,-.32],[.42,.3,.26]],[[.6,.2,.78],[.75,.2,.2]],[[.6,.2,-.78],[.75,.2,.2]]])n.ell(t,i,s.MOSS,{group:1,rough:.03,paint:e()});Mi(n,[2.25,.75,.12],[.13,.15,.11],2,!1);for(const t of[-.12,.22])n.ell([2.12,.88,t],[.08,.04,.07],s.STONED,{group:3});Mi(n,[-.2,.16,.95],[.2,.15,.18],4),Mi(n,[-.2,.16,-.95],[.18,.14,.16],5),n.ell([2,.95,.02],[.42,.14,.4],s.LEAF3,{group:6,rough:.03}),Pa(n,26,2.8,10,3,.3)},"fern-grotto"(n){n.ell([0,.16,0],[.78,.2,.72],s.STONE,{group:1,rough:.015,paint:e=>e[1]>.3?s.MOSS:void 0}),Ia(n,[0,.345,0],[.55,.5],2);for(let e=0;e<6;e++){const t=e/6*Math.PI*2+.4,i=1.5+ct(e)*.3,r=[Math.cos(t)*i,0,Math.sin(t)*i*.8],a=1.1+ct(e,2)*.7,o=y.add(r,[0,a,0]);n.seg(r,o,.12,.09,s.TRUNK,{group:3+e,rough:.02,paint:Ir});for(let l=0;l<7;l++){const u=l/7*Math.PI*2+e,c=[Math.cos(u),0,Math.sin(u)];n.chain([[...o,.05],[...y.add(o,y.add(y.mul(c,.45),[0,.18,0])),.04],[...y.add(o,y.add(y.mul(c,.9),[0,-.15,0])),.015]],l%2?s.LEAF:s.LEAF2,{group:10+e})}}for(let e=0;e<5;e++){const t=e*1.3;Mi(n,[Math.cos(t)*.95,.08,Math.sin(t)*.95],[.16,.12,.14],20+e)}},"sunken-boat"(n){Ia(n,[.3,.01,.15],[1.9,1.15],1);const e=[0,.12,0],t=y.norm([1,.28,.12]);n.ell(e,[1.3,.45,.55],s.WOOD,{dir:t,group:2,paint:i=>(y.dot(y.sub(i,e),[0,1,0])*9+9)%1<.14?s.BARKD:i[1]>.35&&ct(Math.floor(i[0]*9))<.4?s.MOSS:void 0}),n.ell(y.add(e,[0,.14,0]),[1.2,.4,.47],s.BARKD,{dir:t,group:2,cut:!0});for(let i=-2;i<=2;i++)n.seg(y.add(e,y.add(y.mul(t,i*.4),[0,.1,-.42])),y.add(e,y.add(y.mul(t,i*.4),[0,.1,.42])),.04,.04,s.WOOD,{group:3});n.seg([-.9,.05,.7],[.3,1,.55],.03,.03,s.WOOD,{group:4}),n.box([-.98,.06,.72],[.2,.02,.07],s.WOOD,{dir:[1.2,-.8,-.15],group:4}),Pa(n,18,2.2,10,5,.45)},"bramble-wagon"(n){const e=y.norm([1,-.12,0]);n.box([0,.62,0],[1.1,.22,.52],s.WOOD,{dir:e,round:.04,group:1,paint:t=>(t[0]+3)*4%1<.08?s.BARKD:void 0}),n.box([0,.72,0],[1,.2,.43],s.BARKD,{dir:e,group:1,cut:!0});for(const[t,i,r,a]of[[-.72,.55,.4,.4],[-.72,-.55,.4,.4],[.72,-.55,.32,.37]])n.ell([t,r,i],[a,a,.06],s.WOOD,{group:2+(t>0?1:0)+(i>0?2:0),paint:o=>{const l=o[0]-t,u=o[1]-r,c=Math.hypot(l,u),h=Math.atan2(u,l);return c>a*.82||c<a*.18?s.BARKD:Math.abs(Math.sin(h*4))<.2?s.WOOD:s.NOSE}});n.ell([.95,.1,.75],[.37,.06,.37],s.WOOD,{group:7,paint:t=>Math.hypot(t[0]-.95,t[2]-.75)>.3?s.BARKD:void 0});for(const t of[-.3,.3])n.seg([1.05,.55,t],[1.9,.05,t*1.4],.04,.035,s.WOOD,{group:8});for(let t=0;t<14;t++){const i=ct(t,1)*6.283,r=Math.cos(i)*1.5,a=Math.sin(i)*.9,o=[[r,0,a,.03]];for(let l=1;l<4;l++)o.push([r*(1-l*.28)+(ct(t,l)-.5)*.5,.25+l*.25+ct(l,t)*.2,a*(1-l*.3)+(ct(l,t*3)-.5)*.4,.025-l*.004]);if(n.chain(o,s.BARKD,{group:10+t%3}),t%2===0){const l=o[3];n.ell([l[0],l[1],l[2]],[.18,.13,.16],s.LEAF,{group:14,rough:.03,paint:u=>ct(Math.floor(u[0]*30),Math.floor(u[1]*30))<.1?s.ACCENT:void 0})}}},"beehive-tree"(n){for(const[t,i,r]of[[-.2,0,-.25],[.15,-.1,.2],[0,.15,.05]])nn(n,[[t,0,i,.22],[t+r*.8,1.4,i,.16],[t+r*2,2.8,i-.1,.08]],1);for(const[t,i]of[[[-.6,2.9,-.2],[.9,.6,.7]],[[.6,3,-.2],[.85,.6,.7]],[[0,3.4,-.3],[.9,.55,.7]]])Da(n,t,i,3);nn(n,[[.2,1.9,-.05,.08],[.75,2.05,.15,.05]],2);const e=[.72,1.6,.2];n.ell(e,[.24,.42,.22],s.STRAW,{group:4,paint:t=>{const i=Math.floor((t[1]-e[1])*14),r=Math.floor(Math.atan2(t[2]-e[2],t[0]-e[0])*3+i%2*.5);return ct(i,r)<.3?s.BARK2:void 0}}),n.seg([.75,2.02,.15],[.72,1.9,.2],.05,.1,s.STRAW,{group:4});for(let t=0;t<6;t++){const i=t*1.9;n.ell([e[0]+Math.cos(i)*.45,e[1]+Math.sin(t*2.3)*.35,e[2]+Math.sin(i)*.35],[.03,.025,.03],s.MAGIC,{group:20+t,extra:!0})}},"fairy-ring"(n){n.ell([0,.005,0],[1.9,.005,1.5],s.LEAF3,{group:0});for(let e=0;e<9;e++){const t=e/9*Math.PI*2,i=[Math.cos(t)*1.6,0,Math.sin(t)*1.25],r=.35+ct(e)*.35;n.box(y.add(i,[0,r/2,0]),[.13,r/2,.1],s.STONE,{dir:[-Math.sin(t),0,Math.cos(t)],round:.05,rough:.015,group:1+e,paint:o=>e===2&&Math.abs(o[1]-r*.55)<r*.22&&Math.abs(o[0]-i[0]-0)<.05?s.RUNE:o[1]>r*.85?s.MOSS:void 0});const a=y.add(i,[Math.cos(t+.35)*.25,0,Math.sin(t+.35)*.2]);n.seg(a,y.add(a,[0,.16,0]),.035,.03,s.CLOTH,{group:12}),n.ell(y.add(a,[0,.18,0]),[.1,.06,.1],s.ACCENT,{group:13,paint:o=>ct(Math.floor(o[0]*60),Math.floor(o[2]*60))<.15?s.BELLY:void 0})}},"charcoal-hut"(n){const e=[0,2,0];for(let i=0;i<20;i++){const r=i/20*Math.PI*2;Math.abs(r-1.2)<.35||n.seg([Math.cos(r)*.95,0,Math.sin(r)*.8],y.add(e,[Math.cos(r)*.08,.1+ct(i)*.25,Math.sin(r)*.08]),.05,.03,i%3?s.TRUNK:s.BARKD,{group:1+i%2})}n.ell([0,.6,0],[.85,.6,.7],s.BARKD,{group:3});const t=[1.7,0,.3];n.ell(t,[.85,.42,.7],s.BARKD,{group:4,rough:.03,paint:i=>ct(Math.floor(i[0]*14),Math.floor(i[2]*14)+Math.floor(i[1]*14))<.07?s.GLOW:i[1]>.3?s.SHADES:void 0});for(let i=0;i<4;i++)n.seg([-1.4,.1+i*.14,-.5+i%2*.05],[-1.4,.1+i*.14,.5],.07,.07,s.TRUNK,{group:5+i%2,paint:r=>Math.abs(r[2])>.46?s.BARKL:void 0})},"root-arch"(n){nn(n,[[-1.8,0,.1,.4],[-1.4,1.2,0,.34],[-.4,2.3,-.1,.3],[.6,2.4,0,.28],[1.5,1.4,.1,.32],[1.9,0,.15,.38]],1),nn(n,[[-1.4,0,-.6,.28],[-.6,1.6,-.5,.22],[.5,1.9,-.45,.2],[1.3,.9,-.4,.22],[1.5,0,-.35,.26]],2),nn(n,[[-1.8,.2,.1,.3],[-2.4,.05,.5,.12]],1),nn(n,[[1.9,.2,.15,.3],[2.5,.05,.55,.12]],1);for(const[e,t]of[[[-.2,2.6,-.2],[.7,.35,.5]],[[.8,2.5,-.25],[.55,.3,.45]]])Da(n,e,t,4);for(let e=0;e<4;e++)Mi(n,[-.7+e*.45,.12,(ct(e)-.5)*.5],[.22,.18,.2],6+e);n.box([0,.35,-.2],[.16,.35,.08],s.STONE,{round:.05,rough:.01,group:11,paint:e=>Math.abs(e[1]-.4)<.14&&Math.abs(e[0])<.05?s.MAGIC:e[1]>.62?s.MOSS:void 0})},"turf-hut"(n){n.box([0,.55,0],[1,.55,.7],s.WOOD,{round:.04,group:1,paint:e=>e[1]*7%1<.18?s.BARKD:e[2]>.66&&Math.abs(e[0]+.2)<.2&&e[1]<.85?s.NOSE:e[2]>.66&&Math.abs(e[0]-.5)<.14&&Math.abs(e[1]-.7)<.12?s.SHADES:void 0});for(const e of[-1,1])n.box([0,1.3,e*.4],[1.15,.05,.5],s.MOSS,{dir:[1,0,0],up:[0,1,-e*.75],round:.03,group:2,paint:t=>ct(Math.floor(t[0]*12),Math.floor(t[2]*12))<.25?s.LEAF2:void 0});n.seg([.65,1.2,-.3],[.65,1.9,-.3],.15,.13,s.STONE,{group:3,rough:.015});for(let e=0;e<5;e++)Mi(n,[-1.4+e*.7,.12,.9+ct(e)*.3],[.2,.15,.18],4+e);Pa(n,16,1.8,10,9,.25)},"heron-rookery"(n){nn(n,[[0,0,0,.25],[.4,1.4,0,.18],[.9,2.8,-.1,.12],[1.3,3.8,-.2,.06]],1);const e=[[[.6,2,-.05],[-.3,2,-.1]],[[1,3,-.1],[1.8,2.9,0]],[[1.25,3.6,-.2],[.6,3.7,-.3]]];e.forEach(([r,a],o)=>{nn(n,[[...r,.07],[...a,.04]],2),n.ell(y.add(a,[0,.08,0]),[.34,.13,.3],s.BARK2,{group:3+o,rough:.025,paint:l=>Math.abs(Math.sin(l[0]*30+l[2]*20))<.25?s.STRAW:l[1]<a[1]+.02?s.BARKD:void 0})});for(const[r,a]of[[[1.2,4,-.4],[.6,.4,.45]],[[.3,3.1,-.5],[.45,.3,.35]],[[1.9,3.3,-.4],[.4,.3,.35]]])Da(n,r,a,7);const t=y.add(e[1][1],[0,.42,.05]),i=1.6;n.ell(t,[.18*i,.1*i,.09*i],s.BELLY,{dir:[1,.3,0],group:10,paint:r=>r[1]>t[1]+.06?s.STONE:void 0}),n.chain([[...y.add(t,[.12*i,.06*i,0]),.035*i],[...y.add(t,[.2*i,.22*i,0]),.03*i],[...y.add(t,[.16*i,.32*i,0]),.04*i]],s.BELLY,{group:10}),n.seg(y.add(t,[.18*i,.33*i,0]),y.add(t,[.36*i,.3*i,0]),.015*i,.005*i,s.BODY2,{group:11});for(const r of[-.04,.04])n.seg(y.add(t,[0,-.06*i,r]),y.add(t,[.02,-.42,r]),.012,.012,s.BARKD,{group:12})},sundial(n){n.ell([0,.07,0],[1.05,.09,1],s.STONE,{group:1,rough:.01}),n.ell([0,.2,0],[.72,.09,.68],s.STONE,{group:2,rough:.01,paint:e=>e[1]>.26&&ct(Math.floor(e[0]*8),Math.floor(e[2]*8))<.3?s.MOSS:void 0}),n.seg([0,.28,0],[0,.95,0],.16,.13,s.STONE,{group:3,paint:e=>Math.abs(Math.sin(e[1]*30))<.15?s.STONED:void 0}),n.ell([0,1,0],[.38,.04,.38],s.FRAME,{group:4,paint:e=>{const t=Math.atan2(e[2],e[0]);return Math.abs(Math.sin(t*6))<.12&&Math.hypot(e[0],e[2])>.26?s.BARKD:void 0}}),n.box([0,1.12,0],[.2,.1,.01],s.FRAME,{dir:[1,-.5,0],round:.005,group:5});for(let e=0;e<22;e++){const t=e/22*Math.PI*2,i=1.25+ct(e)*.2,r=[Math.cos(t)*i,0,Math.sin(t)*i*.85];n.seg(r,y.add(r,[0,.18,0]),.015,.012,s.LEAF2,{group:6}),n.ell(y.add(r,[0,.2,0]),[.05,.04,.05],[s.FLOWER,s.BELLY,s.ACCENT][e%3],{group:7})}},"bear-den"(n){const e=[0,.3,-.2];n.ell(e,[1.7,1.15,1.25],s.LEAF,{group:1,rough:.05,paint:t=>{const i=ct(Math.floor(t[0]*16),Math.floor(t[1]*16)+Math.floor(t[2]*16)*3);return i<.06?s.ACCENT:i<.2?s.BARKD:t[1]<.4?s.LEAF3:i>.85?s.LEAF2:void 0}}),n.ell([.35,.35,.95],[.5,.55,.4],s.NOSE,{group:1,cut:!0}),n.seg([2,0,.5],[2,.65,.5],.3,.27,s.TRUNK,{group:3,paint:t=>t[1]>.6?s.BARKL:Math.abs(Math.sin(Math.atan2(t[2]-.5,t[0]-2)*3))<.12&&t[1]>.2?s.BARKD:void 0})},"stilt-hut"(n){Ia(n,[0,.01,.1],[2.1,1.3],1);for(const[e,t]of[[-.75,-.55],[.75,-.55],[-.75,.55],[.75,.55]])n.seg([e,0,t],[e,1.05,t],.07,.06,s.WOOD,{group:2,paint:i=>i[1]<.15?s.MOSS:void 0});n.box([0,1.1,0],[1.05,.05,.8],s.WOOD,{round:.02,group:3,paint:e=>(e[0]+3)*6%1<.12?s.BARKD:void 0}),n.box([-.1,1.6,-.1],[.7,.45,.55],s.WOOD,{round:.03,group:4,paint:e=>e[2]>.4&&Math.abs(e[0]-.1)<.18&&e[1]<1.85?s.NOSE:void 0});for(const[e,t]of[[2.1,.92],[2.35,.72],[2.58,.48],[2.76,.24]])n.ell([-.1,e,-.1],[t,.16,t*.85],s.STRAW,{group:5,paint:i=>Math.abs(Math.sin(Math.atan2(i[2]+.1,i[0]+.1)*18))<.25?s.BARK2:void 0});for(const e of[.72,.95])n.seg([.9,1.1,e],[1.15,0,e],.02,.02,s.WOOD,{group:6});for(let e=0;e<4;e++)n.seg([.92+e*.06,1-e*.26,.72],[.92+e*.06,1-e*.26,.95],.02,.02,s.WOOD,{group:6});for(let e=0;e<26;e++){const t=ct(e,7)*6.283,i=1.5+ct(e,8)*.7,r=[Math.cos(t)*i,0,Math.sin(t)*i*.7],a=.5+ct(e,9)*.5;n.seg(r,y.add(r,[0,a,0]),.028,.02,s.LEAF2,{group:10+e%3}),e%3===0&&n.ell(y.add(r,[0,a-.05,0]),[.025,.07,.025],s.BARKD,{group:13})}},"bog-shrine"(n){Ia(n,[.6,.01,.4],[1.4,.9],1),n.seg([0,0,0],[0,1.9,0],.2,.17,s.TRUNK,{group:2,rough:.01,paint:e=>{const t=e[1];return e[2]>.12&&(Math.abs(t-1.6)<.05&&Math.abs(Math.abs(e[0])-.08)<.05||Math.abs(t-1.38)<.04&&Math.abs(e[0])<.1)||t*5%1<.07?s.BARKD:e[1]>1.85?s.MOSS:void 0}}),n.ell([0,1.95,0],[.24,.1,.24],s.MOSS,{group:3});for(let e=0;e<6;e++){const t=e/6*Math.PI*2;n.seg([Math.cos(t)*1,0,Math.sin(t)*.8],[Math.cos(t)*1,.35+ct(e)*.25,Math.sin(t)*.8],.05,.04,s.TRUNK,{group:4})}n.ell([-.25,.06,.3],[.14,.07,.13],s.EAR,{group:5}),Mi(n,[.3,.07,.3],[.09,.07,.08],6,!1),Mi(n,[.15,.05,.42],[.06,.05,.06],7,!1);for(const[e,t,i]of[[.9,.9,.5],[1.4,1.2,.1],[.4,1.4,.8]])n.ell([e,t,i],[.06,.07,.06],s.MAGIC,{group:20+e*10,extra:!0,paint:r=>Math.hypot(r[0]-e,r[1]-t)<.03?s.MAGIC2:void 0});Pa(n,20,2,10,11,.3,s.WEB)},"raven-tree"(n){nn(n,[[0,0,0,.3],[.1,1.3,0,.22],[-.1,2.5,-.1,.16],[.1,3.6,-.15,.07]],1),[[[.1,1.6,0],[1.3,2.3,.1],[1.8,2.2,.1]],[[-.05,2.1,-.05],[-1.2,2.8,-.1],[-1.6,3.2,-.1]],[[0,2.9,-.1],[.8,3.5,-.2]]].forEach((r,a)=>nn(n,r.map((o,l)=>[...o,.12-l*.04]),2+a)),nn(n,[[-.1,.5,0,.22],[-1.1,.1,.5,.08]],5),nn(n,[[.1,.4,0,.2],[.9,.05,-.4,.08]],5);const t=(r,a)=>{n.ell(r,[.12,.07,.06],s.SHADES,{dir:[1,.2,0],group:a}),n.ell(y.add(r,[.11,.07,0]),[.05,.05,.045],s.SHADES,{group:a}),n.seg(y.add(r,[.15,.07,0]),y.add(r,[.22,.05,0]),.015,.004,s.BODY2,{group:a}),n.seg(y.add(r,[-.1,0,0]),y.add(r,[-.22,-.04,0]),.04,.015,s.SHADES,{group:a})};t([1.3,2.42,.1],10),t([-1.2,2.92,-.1],11),t([.8,3.62,-.2],12),t([-.05,3.72,-.15],13);const i=[1.55,1.45,.1];n.seg([1.55,2.25,.1],y.add(i,[0,.3,0]),.01,.01,s.FRAME,{group:14});for(let r=0;r<6;r++){const a=r/6*Math.PI*2;n.seg(y.add(i,[Math.cos(a)*.2,-.25,Math.sin(a)*.2]),y.add(i,[Math.cos(a)*.12,.3,Math.sin(a)*.12]),.012,.012,s.FRAME,{group:14})}n.seg(y.add(i,[0,-.27,0]),y.add(i,[0,-.25,0]),.22,.22,s.FRAME,{group:14})},barrow(n){n.ell([0,0,-.2],[2.3,.95,1.3],s.LEAF2,{group:1,rough:.03,paint:e=>ct(Math.floor(e[0]*10),Math.floor(e[2]*10)+Math.floor(e[1]*10))<.25?s.LEAF:void 0});for(const e of[-.35,.35])n.box([e,.45,.95],[.12,.45,.12],s.STONE,{round:.03,rough:.01,group:2});n.box([0,.95,.95],[.55,.1,.14],s.STONE,{round:.03,rough:.01,group:3,paint:e=>e[1]>1.02?s.MOSS:void 0}),n.box([0,.4,.9],[.23,.4,.3],s.NOSE,{group:1,cut:!0});for(const[e,t,i]of[[-1.6,1,.7],[1.7,.9,.55]])n.box([e,i/2,t],[.12,i/2,.09],s.STONE,{round:.04,rough:.01,group:4})},cairn(n){let e=0;for(let i=0;i<6;i++){const r=.9-i*.14,a=Math.max(3,9-i);for(let o=0;o<a;o++){const l=o/a*Math.PI*2+i;Mi(n,[Math.cos(l)*r*.8,e+.14,Math.sin(l)*r*.7],[.24-i*.02,.15,.2-i*.02],1+(i+o)%4,i<2)}e+=.26}const t=[0,e+.1,0];for(let i=0;i<6;i++){const r=i/6*Math.PI*2;n.seg(y.add(t,[Math.cos(r)*.12,0,Math.sin(r)*.12]),y.add(t,[Math.cos(r)*.3,.35,Math.sin(r)*.3]),.02,.02,s.FRAME,{group:6})}n.seg(y.add(t,[0,-.3,0]),t,.05,.05,s.FRAME,{group:6}),n.ell(y.add(t,[0,.14,0]),[.2,.07,.2],s.SHADES,{group:7})},"stump-throne"(n){n.ell([0,.28,0],[.92,.34,.86],s.TRUNK,{group:1,rough:.015,paint:Ir}),n.ell([0,.58,0],[.84,.06,.78],s.BARKL,{group:1,paint:e=>Math.abs(Math.sin(Math.hypot(e[0],e[2])*30))<.3?s.BARK2:void 0}),n.box([-.55,1.15,0],[.18,.62,.62],s.TRUNK,{round:.1,rough:.01,group:2,paint:Ir});for(const e of[-.6,.6])n.box([-.1,.72,e],[.45,.14,.12],s.TRUNK,{round:.06,group:3,paint:Ir});for(let e=0;e<6;e++){const t=e/6*Math.PI*2+.3;nn(n,[[Math.cos(t)*.8,.25,Math.sin(t)*.8,.18],[Math.cos(t)*1.4,.02,Math.sin(t)*1.3,.06]],4)}n.seg([1.5,.18,.8],[1.5,.18,.2],.18,.18,s.TRUNK,{group:5,paint:e=>e[2]>.78||e[2]<.22?s.BARKL:Ir(e)}),n.seg([1.5,.3,.5],[1.6,.75,.5],.025,.025,s.WOOD,{group:6}),n.box([1.5,.36,.5],[.1,.06,.015],s.FRAME,{group:6});for(let e=0;e<6;e++){const t=e<3?0:1,i=e%3;n.seg([-1.7+i*.3+t*.15,.15+t*.26,-.7],[-1.7+i*.3+t*.15,.15+t*.26,.2],.14,.14,s.TRUNK,{group:7+e%2,paint:r=>r[2]>.16||r[2]<-.66?s.BARKL:void 0})}},"swing-beech"(n){nn(n,[[0,0,-.3,.45],[0,1.6,-.3,.36],[-.1,2.8,-.4,.26]],1),nn(n,[[0,2.2,-.3,.2],[1,2.6,-.2,.14],[1.9,2.75,-.1,.08]],2),nn(n,[[-.05,2.5,-.35,.18],[-1.2,3,-.4,.1]],3);for(let e=0;e<5;e++){const t=e/5*Math.PI*2;nn(n,[[Math.cos(t)*.35,.3,-.3+Math.sin(t)*.3,.2],[Math.cos(t)*.9,.02,-.3+Math.sin(t)*.8,.07]],4)}for(const[e,t]of[[[0,3.4,-.6],[1.4,.8,1]],[[1.4,3.1,-.4],[.9,.55,.7]],[[-1.3,3.2,-.6],[.9,.6,.7]]])Da(n,e,t,5);for(const e of[-.12,.12])n.seg([1.3,2.65,e],[1.3,.55,e],.012,.012,s.STRAW,{group:6});n.box([1.3,.53,0],[.08,.025,.18],s.WOOD,{round:.01,group:6});for(let e=0;e<9;e++)n.ell([(ct(e,1)-.5)*3,.05+ct(e,2)*.5,(ct(e,3)-.3)*1.6],[.022,.022,.022],s.MAGIC,{group:20+e,extra:!0})},bower(n){for(const t of[-.9,0,.9])for(const i of[-.6,.6])n.seg([t,0,i],[t,1.2,i],.04,.04,s.WOOD,{group:1});for(const t of[-.9,0,.9])n.chain([[t,1.2,-.6,.04],[t,1.62,-.3,.04],[t,1.72,0,.04],[t,1.62,.3,.04],[t,1.2,.6,.04]],s.WOOD,{group:2});for(const t of[-.6,.6])for(const i of[.5,1])n.seg([-.9,i,t],[.9,i,t],.025,.025,s.WOOD,{group:3});const e=t=>{const i=ct(Math.floor(t[0]*26),Math.floor(t[1]*26)+Math.floor(t[2]*26)*3);return i<.12?s.BELLY:i<.2?s.STRAW:i>.85?s.LEAF2:void 0};for(const[t,i]of[[[-.6,1.6,0],[.6,.3,.75]],[[.5,1.65,0],[.65,.3,.75]],[[-.95,.9,-.55],[.25,.65,.25]],[[.95,.8,-.6],[.25,.55,.25]],[[-.9,.7,.62],[.22,.5,.2]],[[.2,1.3,-.65],[.5,.4,.2]]])n.ell(t,i,s.LEAF,{group:4,rough:.04,paint:e});n.box([0,.4,-.35],[.6,.04,.15],s.WOOD,{round:.02,group:5});for(const t of[-.5,.5])n.seg([t,0,-.35],[t,.38,-.35],.03,.03,s.WOOD,{group:5})}},yu={moor:["sleeping-giant","the sleeping giant, a moss mound like a figure lying on its back",1],"fern-forest":["fern-grotto","a ring of giant tree ferns round a stone basin",1],"muddy-forest":["sunken-boat","an old rowing boat sunk in the mud",1.15],"tangly-forest":["bramble-wagon","an old wagon wrapped in brambles",1.1],"wispy-forest":["beehive-tree","a many-trunked tree with a great wild honeycomb",1],"hazel-forest":["fairy-ring","a ring of fairy stones and toadstools",1.1],"twiggy-forest":["charcoal-hut","a charcoal burner's hut of sticks, its mound smouldering",1],ancient:["root-arch","a great arch of roots over mossy stones",1.1],norway:["turf-hut","a log cabin with a turf roof",1.15],"alder-forest":["heron-rookery","an alder holding herons' stick nests",1],meadow:["sundial","a moonlit sundial on a stone dais in a ring of flowers",1.2],"berry-thicket":["bear-den","a bear's den in a bramble mound",1.1],wetland:["stilt-hut","a fisher's hut on stilts over a pool",1.1],bog:["bog-shrine","a carved post shrine to the bog, will-o'-wisps over the pool",1.1],deadwood:["raven-tree","a dead tree where the ravens gather",1],grassland:["barrow","a barrow with a stone doorway",1],heath:["cairn","a tall cairn with an old beacon basket",1.4],"old-pinewood":["stump-throne","a woodcutter's stump throne",1.1],"bluebell-glade":["swing-beech","a great beech with a rope swing, glowworms beneath",1],"honeysuckle-tangle":["bower","a honeysuckle bower with a bench",1.2]};function rd(n){let e=n.w,t=-1,i=n.h;for(let a=0;a<n.h;a++)for(let o=0;o<n.w;o++)n.m[a*n.w+o]&&(e=Math.min(e,o),t=Math.max(t,o),i=Math.min(i,a));const r=new Xt(t-e+1,n.h-i);for(let a=0;a<r.h;a++)for(let o=0;o<r.w;o++){const l=(a+i)*n.w+o+e;n.m[l]&&r.put(o,a,n.m[l],n.n[l*3],n.n[l*3+1],n.n[l*3+2])}return{sp:r,x0:e,y0:i}}function ad(n,e){const t=n.leaf,i=e.trunkHue??.07;return{[s.TRUNK]:xe(i,.45,.36),[s.BARKD]:xe(i+.03,.5,.17),[s.BARKL]:xe(i,.35,.55),[s.BARK2]:xe(i+.02,.45,.26),[s.LEAF]:xe(t,.55,.45),[s.LEAF2]:xe(t-.03,.5,.62),[s.LEAF3]:xe(t+.03,.6,.26),[s.STONE]:[122,120,128],[s.STONED]:[62,60,70],[s.MOSS]:xe(.26,.45,.45),[s.WOOD]:[128,92,58],[s.STRAW]:[190,162,104],[s.CLOTH]:[228,220,200],[s.EAR]:[168,96,66],[s.FRAME]:[150,128,84],[s.SHADES]:[30,28,36],[s.ACCENT]:[196,40,52],[s.BELLY]:[232,228,214],[s.BODY2]:[210,170,60],[s.FLOWER]:[180,140,230],[s.WEB]:[228,228,234],[s.WATER]:[52,78,104],[s.NOSE]:[16,14,20],[s.GLOW]:[255,120,40],[s.MAGIC]:xe(e.magicHue??.45,.6,1),[s.MAGIC2]:xe(e.magicHue??.45,.2,1),[s.RUNE]:[120,230,255],[s.LINE]:[24,22,30]}}function sd(n,e,t,i=16){const r=new nt({blend:.05});id[n](r),r.ell([0,.004,0],[.01,.004,.01],s.NOSE,{group:0});const a=(Object.values(yu).find(([d])=>d===n)||[,,1])[2],o=Ki(r,{scale:jh(t)*a}),{sp:l,x0:u,y0:c}=rd(o.sp),[h,f]=o.project([0,0,0]);return{sp:l,colours:ad(e,t),origin:{x:+(h-u).toFixed(1),y:+(f-c).toFixed(1)},metres:{width:+(l.w/i).toFixed(1),height:+(l.h/i).toFixed(1)}}}const od=1.3,ld=n=>[1,Math.sqrt(n.growth),Math.sqrt(n.growth)*od,n.growth],ea=(n,e,t=1)=>Math.round(e.size*ld(e)[Math.max(0,Math.min(3,n))]*(2/(e.pixel||2))*1.9*t),El=(n,e)=>{const t=bl(e);for(let i=0;i<9;i++){const r=Math.floor(ce(t,2,n.w-2)),a=Math.floor(ce(t,2,n.h*.6));if(!(n.get(r,a)||n.get(r+1,a)||n.get(r-1,a)||n.get(r,a+1)||n.get(r,a-1))&&(n.px(r,a,s.MAGIC2),i%3===0))for(const[o,l]of[[1,0],[-1,0],[0,1],[0,-1]])n.px(r+o,a+l,s.MAGIC)}};function Rs(n,e,t,i,r,a,o,l){const u=y.add(e,[-i*.7,i*(.75+r),t*i*.35]),c=y.norm(y.sub(u,e)),h=y.norm(y.sub([1,0,0],y.mul(c,y.dot([1,0,0],c)))),f=Math.hypot(...y.sub(u,e));n.flat(y.add(y.lerp(e,u,.5),y.mul(h,-i*.14)),c,h,f*.55,i*.34,Vr.wing(a,o),{group:l,extra:!0})}const yl=(n,e,t=1)=>n===0?Math.round(Math.max(12,Math.min(30*Math.max(.75,Math.min(1.1,t)),ea(1,e)*t*.72))):n===2?Math.round(Math.max(ea(1,e)*t*1.08,Math.min(ea(2,e,t),ea(1,e)*1.4))):ea(n,e)*t;let cs=null;function cd(n,e){const t=cs;cs=n;try{return e()}finally{cs=t}}const ud=(n,e)=>{const t=Math.atan2(e,n);return Math.hypot(n,e)<.55+.4*Math.pow(Math.abs(Math.cos(t*2.5+Math.PI/2)),3)},hd=(n,e)=>{const t=n*1.2,i=-e*1.2+.25;return Math.pow(t*t+i*i-.6,3)-t*t*i*i*i<0};function wl(n){const e=cs,t=n.anchors;if(!e)return;const i=t.head,r=i?Math.max(...i.r):.2;if(e.collar&&(t.neck||i)){const a=t.neck||{c:y.add(i.c,[-i.r[0]*.8,-i.r[1]*.4,0]),r:i.r[1]*.75,dir:y.norm([1,.4,0])},o=y.norm(a.dir),l=y.norm(y.cross(o,Math.abs(o[2])<.9?[0,0,1]:[1,0,0])),u=y.cross(o,l),c=[],h=Math.max(.03,a.r*.2);for(let M=0;M<=16;M++){const x=M/16*Math.PI*2,g=y.add(y.mul(l,Math.cos(x)),y.mul(u,Math.sin(x)));let _=0;for(;_<.8&&n.field(y.add(a.c,y.mul(g,_)))<0;)_+=.01;_>=.8&&(_=a.r),c.push([...y.add(a.c,y.mul(g,_+h*.7)),h])}n.chain(c,s.COLLAR,{group:60,extra:!0});const f=c.reduce((M,x)=>x[0]-x[1]*.6+x[2]*.5>M[0]-M[1]*.6+M[2]*.5?x:M),d=h*1.3*(a.tag||1),p=y.norm(y.add(y.norm(y.sub(f.slice(0,3),a.c)),[.3,-.5,.3]));let m=f.slice(0,3);for(let M=0;M<60&&n.field(m)<d*.4;M++)m=y.add(m,y.mul(p,.01));n.ell(m,[d,d,d*.6],s.COLLAR,{group:60,extra:!0})}if(e.hat!=null&&i){const a=Math.max(r,.13),o=i.top||y.add(nt.surface(i.c,i.r,y.norm([-.15,1,.1])),[0,r*.1,0]),l=y.norm([.3,1,.35]),u=a*1.5,c=y.add(o,y.mul(l,u));n.seg(y.add(o,y.mul(l,-a*.1)),c,a*.48,a*.04,s.HAT1,{group:61,extra:!0,paint:h=>Math.floor(y.dot(y.sub(h,o),l)/(u/5)+10)%2?s.HAT2:void 0}),n.ell(c,[a*.17,a*.17,a*.17],s.POM,{group:61,extra:!0})}if(e.glasses&&t.eyes&&i){const[a,o]=t.eyes.pts,l=c=>y.add(c,y.mul(y.norm(y.sub(c,i.c)),t.eyes.size*.45)),u=Math.max(t.eyes.size*1.05,r*.1);if(e.glasses==="bar")n.seg(l(a),l(o),u,u,s.SHADES,{group:62,extra:!0}),n.ell(y.add(l(o),[u*.3,u*.5,u*.2]),[u*.25,u*.25,u*.25],s.GLINT,{group:62,extra:!0});else for(const c of[a,o]){const h=y.norm(y.sub(c,i.c)),f=y.norm(y.cross([0,1,0],h)),d=y.cross(h,f),p=e.glasses==="heart"?hd:ud,m=u*1.5;n.flat(l(c),f,d,m,m,(M,x)=>p(M,x)?p(M*1.3,x*1.3)?s.SHADES:s.FRAME:null,{group:62,bend:.1,extra:!0}),n.seg(l(a),l(o),u*.18,u*.18,s.FRAME,{group:62,extra:!0})}}if(e.shoes)for(const a of t.feet){const o=e.shoes==="platform",l=a.r,u=y.add(a.c,[l*.25,l*(o?.35:.15),0]);n.ell(u,[l*1.45,l*(o?1.2:.85),l*1.15],s.SHOE,{group:a.group,extra:!0,paint:c=>c[1]<u[1]-l*(o?.45:.4)?s.SOLE:e.shoes==="glitter"&&Zn(c,60,.28)?s.GLINT:void 0})}}function dd(n,e,t,i,r="towards"){const a={legW:1,earS:1,hgt:1,bw:.3,...n.q},o=e===3,l=e===1,u=e===0,c=F=>o&&n.legend.includes(F),h=new nt,f=a.hr*(u?1.75:l?1.25:1)*(i.head/.44)**.5,d=a.len*(u?.8:l?.9:1.02)*i.long,p=u?.55:l?.9:1.04,m=t?-.04:0,M=1+m,x=a.chest*(o?1.06:1)/p+m,g=a.tuck/p+m,_=a.bw*(u?1.15:e>=2?1.06:1)*(a.legW>1.2?1.15:1),E=.06*a.legW*(o?1.1:u?1.7:1),S=a.back==="hump"?.1:0,R=a.back==="arch"?.1:0,A=x+.12,D=F=>{if(a.belly&&F[1]<A&&F[0]>-d*.5)return s.BELLY;if(a.saddle&&F[1]>M-.18&&F[0]<d*.55)return s.BODY2;if(a.spots&&F[1]>x+.1&&Zn(F,10,.22))return a.spotMat==="belly"||a.spots==="young"&&l?s.BELLY:a.spots==="young"?void 0:s.BODY3;if(a.ridge&&F[1]>M-.08+S*.5)return s.BODY3};if(h.ell([d*.48,(M+x)/2+S*.5,0],[d*.62,(M-x)/2+S*.5,_],s.BODY,{paint:D}),h.ell([-d*.5,(M+g)/2+R*.6,0],[d*.58,(M-g)/2+R*.6,_*.93],s.BODY,{paint:D}),h.ell([0,(M+(x+g)/2)/2+.02,0],[d*.6,(M-(x+g)/2)/2,_*.9],s.BODY,{paint:D}),a.ridge)for(let F=0;F<(o?16:10);F++){const re=-d*.8+F*d*1.75/(o?15:9),ue=(.07+(o?.04:0))*(1+.5*Math.max(0,re/d));h.ell([re,M+.02+S*Math.max(0,1-Math.abs(re/d-.5)*2)+ue*.5,0],[ue,.03,_*.25],s.BODY3,{dir:[-.3,1,0],up:[1,0,0]})}if(a.wool)for(let F=0;F<14;F++){const re=F/14*Math.PI*2;h.ell([d*Math.cos(re)*.7,(M+x)/2+Math.sin(re)*.2,_*(F%2?.5:-.5)],[.16,.14,.14],s.BODY)}const b=[.32,-.32][t],w=(F,re)=>{const ue=re*_*.62,Re=F?d*.62:-d*.62,Be=(F?1:-1)*re*b,We=F?x+.1:g+.15,j=(F?re:-re)*(t?1:-1)>0?.06:0,ie=[Re+Math.sin(Be)*.2+(F?.02:.1),Math.max(.3,We*.55),ue],G=[Re+Math.sin(Be)*.42,.05+j,ue],he=[Re,We+.12,ue*.8],se=re>0?a.legMat||s.BODY:a.legMat?s.BODY3:s.BODY2,ye=F?[[...he,E*1.5],[...ie,E*1.05],[...G,E*.9]]:[[...he,E*2*(a.haunch||1)],[...y.add(ie,[-.12,.06,0]),E*1.2],[...y.add(G,[-.06*(a.hindFoot||1),.12,0]),E*.9],[...G,E*.9]];h.chain(ye,se,{group:re>0?6+(F?1:0):2,paint:a.socks?Ce=>Ce[1]<a.socks?s.BODY3:void 0:void 0});const Qe=(a.paw==="hoof"?.07:.09)*a.legW**.5*(F?1:a.hindFoot||1);h.ell(y.add(G,[Qe*.5,-.01,0]),[Qe,E*.9,E*1.1],a.paw==="hoof"?s.NOSE:se,{group:re>0?6+(F?1:0):2}),h.anchors.feet.push({c:y.add(G,[Qe*.5,-.01,0]),r:Math.max(Qe,E*1.1),group:re>0?6+(F?1:0):2})};for(const F of[-1,1])w(!0,F),w(!1,F);const L=[d*.82,M-.12,0],C=[L[0]+Math.cos(a.neckAng)*a.neck*.9,L[1]+Math.sin(a.neckAng)*a.neck*.9+(u?.1:0),0];h.seg(L,C,a.neckW*.55,a.neckW*.42,s.BODY,{paint:F=>a.belly&&F[1]<(L[1]+C[1])/2-.05?s.BELLY:a.face==="dark"?s.BODY2:void 0});const N=F=>{if(a.face==="badger")return Math.abs(F[2])<f*.22+(F[0]-C[0])*.1||F[1]<C[1]-f*.1?s.BELLY:s.BODY3;if(a.face==="dark")return s.BODY2;if((a.belly||a.muzzle)&&F[1]<C[1]-f*.35)return s.BELLY};h.ell(C,[f*1.05,f*.92,f*.88],s.BODY,{paint:N});const O=f*a.snout*(u?.55:l?.78:1),I=f*a.snoutD*.55,B=[C[0]+f*.65+O*.5,C[1]-f*.28,0];h.ell(B,[O*.62+f*.2,I,I*.95],s.BODY,{dir:[1,-.25,0],paint:F=>(a.muzzle||a.belly)&&F[1]<B[1]-I*.1?s.BELLY:N(F)});const W=[B[0]+O*.62+f*.1,B[1]-.02,0];h.ell(W,[f*(a.disc?.1:.12),f*(a.disc?.2:.12),f*(a.disc?.2:.15)],s.NOSE,{group:1});for(const F of[-1,1]){const re=nt.surface(C,[f*1.05,f*.92,f*.88],y.norm([.75,.32,F*.62]));h.ell(re,[f*.13,f*.16,f*.13].map(ue=>ue*(a.eyeK||1)*(u?1.5:l?1.2:1)),o&&!a.tusks?s.MAGIC2:s.EYE,{group:1})}h.anchors.head={c:C,r:[f*1.05,f*.92,f*.88],top:[C[0]-f*.1,C[1]+f*.82,0]},h.anchors.eyes={pts:[-1,1].map(F=>nt.surface(C,[f*1.05,f*.92,f*.88],y.norm([.75,.32,F*.62]))),size:f*.16*(a.eyeK||1)*(u?1.5:l?1.2:1)},h.anchors.neck={c:y.lerp(L,C,u?.05:l?.25:.42),r:a.neckW*.5*(u?1.3:l?1.12:1),dir:y.norm(y.sub(C,L)),tag:u?1.8:l?1.3:1};for(const F of[-1,1]){const re=a.ear,ue=[C[0]-f*.15,C[1]+f*.7,F*f*.5],Re=a.earS*(u?1.2:1)*(a.ear==="long"?.62:1);if(re==="none")continue;if(re==="round"){h.ell(ue,[f*.22,f*.25*Re,f*.1],s.BODY,{group:1,paint:ye=>ye[0]>ue[0]+f*.02?s.EAR:void 0});continue}const Be=re==="long",We=re==="small"?-.6:0,j=f*.55*Re*(re==="big"?1.35:Be?2.2:1),ie=f*.3*(re==="big"?1.2:Be?1.35:1),G=y.norm([We*.6-(Be?.3:.12),1,F*.3]),he=y.norm([.55,.2,F]),se=y.norm(y.cross(he,G));h.flat(y.add(ue,y.mul(G,j)),se,G,ie,j,Vr.ear(s.BODY,s.EAR,s.BODY3),{group:5+(F>0?0:20),extra:Be}),re==="tuft"&&h.seg(y.add(ue,[0,j*1.4,F*.02]),y.add(ue,[0,j*1.85,F*.04]),f*.05,f*.02,s.BODY3,{group:1})}const $=[-d*1.05,M-.1+R*.5,0],ae=t?.04:-.02;if(c("tails")||fd(h,c("starTail")?"star":a.tail,$,d,M,ae),a.horns)for(const F of[-1,1]){const re=l?.6:u?.35:c("hornsGlow")?1.4:1,ue=[];for(let Re=0;Re<=8;Re++){const Be=.3-Re/8*Math.PI*1.6,We=f*.65*re*(1-.45*Re/8);ue.push([C[0]-f*.1+Math.cos(Be)*We,C[1]+f*.45+Math.sin(Be)*We,F*(f*.6+Re*.015)]),ue[Re].push(f*.2*re*(1-.6*Re/8))}h.chain(ue,c("hornsGlow")?s.MAGIC:s.ACCENT,{group:13})}if(a.antlers||c("jackalope"))for(const F of[-1,1])pd(h,a,[C[0]-f*.05,C[1]+f*.75,F*f*.4],F,e,c);if(a.tusks)for(const F of[-1,1]){const re=l?.4:u?0:c("tusksBig")?1.3:.75;if(!re)continue;const ue=[B[0]+O*.25,B[1]-I*.4,F*I*.8];h.chain([[...ue,.045*re],[...y.add(ue,[.1*re,.1*re,F*.03]),.04*re],[...y.add(ue,[.06*re,.24*re,F*.05]),.02*re]],s.ACCENT,{group:8})}a.teeth&&!u&&h.ell([W[0]-f*.1,W[1]-f*.25,0],[f*.08,f*.14,f*.12],s.ACCENT,{group:1});const q=F=>[-d*.9+F*d*1.65,M+S*Math.max(0,1-Math.abs(F-.8)*3)+R*(1-Math.abs(F-.4)*2),0];if(c("wings"))for(const F of[-1,1])Rs(h,[d*.2,M,F*_*.5],F,1.15,t?.1:0,F>0?s.MAGIC2:s.MAGIC,s.MAGIC,40+(F>0?10:0));if(c("mane")||c("flames"))for(let F=0;F<7;F++){const re=F/6,ue=y.lerp(y.add(C,[-f*.5,f*.3,0]),q(.55),re),Re=[.4,.3,.45,.28,.38,.25,.3][F],Be=y.norm([-.35-(t?.1:0),1,0]);h.flat(y.add(ue,y.mul(Be,Re*.5)),[1,0,0],Be,Re*.32,Re*.55,Vr.flame(F%2?s.MAGIC:s.MAGIC2,s.MAGIC2),{group:60+F%2,extra:!0})}if(c("tails"))for(let F=0;F<7;F++){const re=Math.PI*(.55+F*.08),ue=(F-3)*.1,Re=y.add($,[Math.cos(re)*.9,Math.sin(re)*.85,ue]);h.chain([[...$,.1],[...y.lerp($,Re,.5),.17],[...Re,.08]],F%2?s.BODY2:s.BODY,{group:70,extra:!0}),h.ell(Re,[.09,.09,.09],s.MAGIC2,{group:71,extra:!0})}if(c("crystals")&&[.15,.3,.45,.6,.75].forEach((F,re)=>{const ue=q(F),Re=[.3,.5,.4,.6,.35][re];h.ell(y.add(ue,[0,Re*.45,(re%2-.5)*.1]),[Re*.55,.08,.08],s.MAGIC,{dir:[(re-2)*.12,1,0],group:80+re%2,extra:!0,paint:Be=>Be[2]>0?s.MAGIC2:void 0})}),c("moss")){for(let F=0;F<6;F++)h.ell(q(.08+F*.15),[d*.22,.07,_*.85],s.LEAF,{group:85,extra:!0});for(const[F,re]of[[.25,.55],[.5,.8],[.75,.45]]){const ue=q(F);h.seg(ue,y.add(ue,[0,re*.7,0]),.04,.025,s.TRUNK,{group:86,extra:!0}),h.ell(y.add(ue,[0,re*.8,0]),[re*.28,re*.26,re*.28],s.LEAF2,{group:87,extra:!0,paint:Re=>Re[1]<ue[1]+re*.72?s.LEAF3:void 0})}for(const F of[.12,.4,.65,.9]){const re=q(F);h.ell(y.add(re,[0,.12,_*.3]),[.07,.035,.07],s.MAGIC,{group:89,extra:!0})}}if(c("ribbons"))for(let F=0;F<3;F++){const re=[];for(let ue=0;ue<9;ue++){const Re=ue/8;re.push([d*(.5-Re*2.2),M+.05+F*.1+Re*(.25+F*.12)+Math.sin(Re*6+t+F)*.07,(F-1)*.18,.04*(1-Re*.6)])}h.chain(re,F%2?s.MAGIC2:s.MAGIC,{group:90+F,extra:!0})}wl(h);const{sp:ee}=Ki(h,{height:yl(e,i,a.hgt),facing:r});return o&&El(ee,n.id.length*7919),ee}function fd(n,e,t,i,r,a){const o={group:3},l=u=>-i*u;e==="brush"?n.chain([[...t,.1],[l(1.3),r-.25+a,0,.15],[l(1.4),r-.55,0,.14],[l(1.35),.38+a,0,.09]],s.BODY,{...o,paint:u=>u[1]<.32?s.BODY3:void 0}):e==="bushy"?n.chain([[...t,.1],[l(1.05)-.35,r-.05+a,0,.17],[l(1.05)-.75,r-.2+a,0,.18],[l(1.05)-1,r-.35+a,0,.1]],s.BODY,{...o,paint:u=>u[0]<l(1.05)-.82?s.BELLY:void 0}):e==="stub"||e==="deer"||e==="bob"?n.ell(y.add(t,[-.06,.02+a,0]),[.1,.08,.07],e==="deer"?s.BELLY:s.BODY,{...o,paint:e==="bob"?u=>u[0]<t[0]-.08?s.BODY3:void 0:void 0}):e==="puff"?n.ell(y.add(t,[-.04,.02,0]),[.11,.11,.1],s.BELLY,o):e==="squirrel"||e==="star"?n.chain([[...t,.12],[l(1.3),r+.05+a,0,.25],[l(1.3),r+.6+a,0,.3],[l(1),r+.95+a,0,.27],[l(.65),r+.9+a,0,.16]],e==="star"?s.MAGIC:s.BODY,{...o,extra:!0,paint:e==="star"?u=>Zn(u,14,.12)?s.GLINT:void 0:void 0}):e==="otter"?n.chain([[...t,.17],[l(1.3),r-.45+a,0,.12],[l(1.6),.1,0,.07],[l(1.85),.06+a,0,.03]],s.BODY,o):e==="stoat"?n.chain([[...t,.08],[l(1.3),r-.12+a,0,.07],[l(1.6),r-.05+a,0,.06]],s.BODY,{...o,paint:u=>u[0]<l(1.45)?s.BODY3:void 0}):e==="flat"?(n.seg(t,[l(1.15),.3,0],.08,.07,s.BODY2,o),n.ell([l(1.4),.1+a*.5,0],[.28,.03,.14],s.BODY3,o)):e==="thin"&&(n.chain([[...t,.04],[l(1.1),r-.3,0,.03],[l(1.12)+a,r-.55,0,.025]],s.BODY,o),n.ell([l(1.12)+a,r-.62,0],[.04,.07,.04],s.BODY3,o))}function pd(n,e,t,i,r,a){const o=!e.antlers,l=o?.45:[0,.5,.95,.95][r]*(a("antlersGlow")?1.15:1),u=a("antlersGlow")?i>0?s.MAGIC2:s.MAGIC:s.ACCENT,c={group:11+(i>0?1:0),extra:!0};if(!l)return;const h=.045*Math.max(.8,l),f=i*.35*l;if(e.antlers==="palm"){const x=y.add(t,[-.06*l,.12*l,f*.3]);n.seg(t,x,h*1.3,h*1.2,u,c);for(let g=0;g<5;g++){const _=.35+g*.3,E=y.norm([-Math.cos(_),Math.sin(_)*.9,i*.55]),S=(.24+.05*(g%2))*l;n.ell(y.add(x,y.mul(E,S*.55)),[S*.6,h*1.5,h*.6],u,{...c,dir:E,up:[0,0,1]})}return}const d=y.add(t,[-.18*l,.3*l,f*.4]),p=y.add(t,[-.25*l,.62*l,f*.8]),m=y.add(t,[-.1*l,.95*l,f]);n.chain([[...t,h*1.2],[...d,h],[...p,h*.85],[...m,h*.4]],u,c);const M=(x,g,_,E)=>n.seg(x,y.add(x,y.mul(y.norm(g),_)),E,E*.35,u,c);M(y.add(t,[-.04*l,.1*l,f*.1]),[1,.6,0],.28*l,h*.8),(l>.4||o)&&M(d,[1,.9,0],.3*l,h*.7),l>.7&&(M(p,[.8,1,0],.28*l,h*.6),M(m,[.3,1,i*.2],.18*l,h*.5))}function md(n,e,t,i,r="towards"){const a=e===3,o=e===1,l=e===0,u=m=>a&&n.legend.includes(m),c=new nt,h=t?.03:0,f=l?.48:o?.42:.36,d=(l?.95:1.08)+h;for(const m of[-1,1]){const M=t&&m>0?.04:0;c.seg([.05,.2,m*.14],[.08,.05+M,m*.15],.07,.06,s.BODY2,{group:2});for(const x of[-.04,0,.04])c.ell([.16,.03+M,m*.15+x],[.06,.025,.02],s.ACCENT,{group:2});c.anchors.feet.push({c:[.13,.04+M,m*.15],r:.08,group:m>0?6:2})}if(c.ell([-.32,.32,0],[.22,.06,.14],s.BODY2,{dir:[-1,-.6,0],group:3}),c.ell([0,.55+h,0],[.36,.52,.36],s.BODY,{paint:m=>m[0]>.12&&m[1]<d-f*.5?Math.floor(m[1]*18)%3===0&&Zn(m,16,.5)?s.BODY2:s.BELLY:void 0}),!u("wings"))for(const m of[-1,1])c.ell([-.06,.58+h,m*.3],[.4,.3,.08],s.BODY2,{dir:[-.3,-1,0],up:[1,0,0],group:m>0?4:2,paint:M=>Zn(M,12,.15)?s.BODY3:void 0});c.ell([0,d,0],[f,f*.9,f],s.BODY);for(const m of[-1,1]){const M=y.norm([.75,-.05,m*.4+.35]),x=y.add(nt.surface([0,d,0],[f,f*.9,f],M),y.mul(M,-f*.05));c.ell(x,[f*.22,f*.46,f*.4],s.BELLY,{group:1,dir:M});const g=y.add(x,y.mul(M,f*.14));c.ell(g,[f*.1,f*.26,f*.24].map(_=>_*(l?1.15:1)),a?s.MAGIC:s.IRIS,{group:1,dir:M}),c.ell(y.add(g,y.mul(M,f*.07)),[f*.08,f*.14,f*.13].map(_=>_*(l?1.15:1)),a?s.MAGIC2:s.EYE,{group:1,dir:M}),(c.anchors.eyes||={pts:[],size:f*.22}).pts.push(y.add(g,y.mul(M,f*.07))),l||c.ell([f*.05,d+f*.8,m*f*.6],[f*.32,f*.12,f*.08],s.BODY2,{dir:[-.1,1,m*.7],up:[1,0,0],group:1})}if(c.ell(nt.surface([0,d,0],[f,f*.9,f],y.norm([.75,-.35,.35])),[f*.2,f*.12,f*.1],s.ACCENT,{dir:[.6,-1,.3],group:1}),u("wings"))for(const m of[-1,1])Rs(c,[-.05,.8+h,m*.3],m,1.3,t?.12:0,m>0?s.MAGIC2:s.MAGIC,s.MAGIC,40+(m>0?10:0));if(u("eyesRing"))for(let m=0;m<7;m++){const M=Math.PI*(.15+m/6*.7);c.ell([Math.cos(M)*.2-.1,d+.1+Math.sin(M)*.6,(m-3)*.15],[.07,.07,.07],s.MAGIC2,{group:95+m,extra:!0}),c.ell([Math.cos(M)*.2-.05,d+.1+Math.sin(M)*.6,(m-3)*.15],[.035,.035,.035],s.EYE,{group:95+m,extra:!0})}c.anchors.head={c:[0,d,0],r:[f,f*.9,f]},c.anchors.neck={c:[0,d-f*.75,0],r:f*.85,dir:[0,1,0]},wl(c);const{sp:p}=Ki(c,{height:yl(e,i,.95),facing:r});return a&&El(p,31),p}const Zi=(n,e,t,i,r,a,o=1)=>{for(const l of i)n.ell(nt.surface(e,t,y.norm(l)),[r,r*1.2,r],a,{group:o});n.anchors.head||={c:e,r:t},n.anchors.eyes||={pts:i.map(l=>nt.surface(e,t,y.norm(l))),size:r}},wu=(n,e,t)=>n.ell([e,.005,0],[t,.005,t*.6],s.NOSE,{group:0});function Bn(n,e,t,i,r,a){wl(n);const{sp:o}=Ki(n,{height:yl(t,i,r),facing:a});return t===3&&El(o,e.id.length*131),o}const Au=(n,e,t)=>{n.ell(e,[t,t*.35,t],s.MAGIC,{group:95,extra:!0,paint:i=>i[1]>e[1]?s.MAGIC2:void 0});for(let i=0;i<5;i++){const r=i/5*Math.PI*2;n.ell(y.add(e,[Math.cos(r)*t*.8,t*.55,Math.sin(r)*t*.8]),[t*.38,t*.12,t*.12],s.MAGIC,{dir:[0,1,0],up:[1,0,0],group:96,extra:!0})}},Al=(n,e)=>e.forEach(([t,i],r)=>n.ell(y.add(t,[0,i*.45,0]),[i*.55,.07,.07],s.MAGIC,{dir:[(r%3-1)*.25,1,(r%2-.5)*.3],group:80+r%2,extra:!0,paint:a=>a[2]>t[2]?s.MAGIC2:void 0}));function gd(n,e,t,i,r="towards"){const a=e===3,o=new nt,l=t?.03:0;for(const[f,d]of[[.28,.2],[.28,-.2],[-.28,.2],[-.28,-.2]])o.seg([f,.15,d],[f+(d>0?l:-l),.03,d],.06,.05,s.BODY3,{group:d>0?6:2}),o.anchors.feet.push({c:[f+.03+(d>0?l:-l),.03,d],r:.065,group:d>0?6:2});const u=[0,.32,0],c=[.5,.32,.38];o.ell(u,c,s.BODY2,{paint:f=>Zn(f,22,.3)?s.BODY3:Zn(f,19,.12)?s.BELLY:void 0});for(let f=0;f<46;f++){const d=f*2.399%(Math.PI*2),p=f/46*.9+.05,m=y.norm([Math.cos(d)*Math.sin(p*Math.PI*.5)-.25,Math.cos(p*Math.PI*.5)*.9+.1,Math.sin(d)*Math.sin(p*Math.PI*.5)]);m[0]>.55||o.ell(y.add(nt.surface(u,c,m),y.mul(m,.02)),[.1,.025,.025],f%4?s.BODY2:s.BODY3,{dir:y.add(m,[-.4,0,0]),group:1})}const h=[.48,.22,0];return o.ell(h,[.22,.14,.15],s.BELLY,{dir:[1,-.3,0],group:1}),o.ell([.69,.16,0],[.04,.04,.04],s.NOSE,{group:1}),Zi(o,h,[.22,.14,.15],[[.3,.6,.55],[.3,.6,-.55]],.035,a?s.MAGIC2:s.EYE),a&&Al(o,[[[-.3,.55,.1],.35],[[-.05,.62,-.1],.5],[[.2,.55,.12],.4],[[-.15,.58,.2],.3]]),Bn(o,n,e,i,.6,r)}function xd(n,e,t,i,r="towards"){const a=e===3,o=new nt,l=t?.05:0;for(const h of[-1,1])o.ell([-.22,.16,h*.36],[.24,.13,.12],h>0?s.BODY:s.BODY2,{dir:[1,.3,0],group:h>0?6:2,paint:f=>Zn(f,14,.15)?s.BODY3:void 0}),o.ell([.05,.04,h*.4],[.16,.04,.08],h>0?s.BODY:s.BODY2,{group:h>0?6:2}),o.seg([.35,.2+l,h*.24],[.42,.03,h*.3],.05,.04,h>0?s.BODY:s.BODY2,{group:h>0?7:2}),o.anchors.feet.push({c:[.45,.03,h*.3],r:.06,group:h>0?7:2},{c:[.12,.04,h*.4],r:.08,group:h>0?6:2});const u=[0,.3+l,0],c=[.5,.28,.4];o.ell(u,c,s.BODY,{paint:h=>h[1]<u[1]-.12?s.BELLY:h[0]>.38&&Math.abs(h[1]-(u[1]-.02))<.018?s.LINE:Zn(h,14,.22)?s.BODY3:void 0});for(const h of[-1,1]){const f=[.3,.55+l,h*.17];o.ell(f,[.1,.09,.1],s.BODY,{group:1}),o.ell(nt.surface(f,[.1,.09,.1],y.norm([.6,.5,h*.5])),[.05,.05,.05],a?s.MAGIC2:s.IRIS,{group:1}),o.ell(nt.surface(f,[.11,.1,.11],y.norm([.65,.45,h*.5])),[.03,.015,.03],s.EYE,{group:1})}return o.anchors.head={c:[.22,.45+l,0],r:[.3,.2,.3],top:[.18,.62+l,0]},o.anchors.eyes={pts:[-1,1].map(h=>nt.surface([.3,.55+l,h*.17],[.1,.09,.1],y.norm([.6,.5,h*.5]))),size:.05},o.anchors.neck={c:[.32,.3+l,0],r:.25,dir:[1,.3,0]},a&&Au(o,[.15,.66+l,0],.16),Bn(o,n,e,i,.55,r)}function Md(n,e,t,i,r="towards"){const a=e===3,o=e===1,l=d=>a&&n.legend.includes(d),u=new nt,c=t?.02:0;for(const d of[-1,1]){const p=t&&d>0?.04:0;u.seg([0,.3,d*.08],[.03,.03+p,d*.08],.03,.025,s.NOSE,{group:d>0?7:2}),u.ell([.08,.02+p,d*.08],[.08,.015,.04],s.NOSE,{group:2}),u.anchors.feet.push({c:[.07,.03+p,d*.08],r:.06,group:d>0?7:2})}if(u.ell([-.55,.42,0],[.32,.035,.12],s.BODY2,{dir:[-1,-.25,0],group:3}),u.ell([0,.52+c,0],[.42,.26,.24],s.BODY,{dir:[1,.45,0]}),!l("wings"))for(const d of[-1,1])u.ell([-.1,.55+c,d*.2],[.45,.17,.05],s.BODY2,{dir:[-1,-.25,0],group:d>0?4:2});const h=[.36,.84+c,0],f=o?.19:.16;if(u.ell(h,[f*1.1,f,f*.95],s.BODY,{paint:d=>d[1]>h[1]+f*.55?s.BELLY:void 0}),u.ell(y.add(h,[f*1.5,-f*.25,0]),[f*1,f*.38,f*.3],s.NOSE,{dir:[1,-.2,0],group:1}),Zi(u,h,[f*1.1,f,f*.95],[[.55,.35,.65],[.55,.35,-.65]],f*.16,a?s.MAGIC2:s.EYE),l("wings"))for(const d of[-1,1])Rs(u,[-.05,.65+c,d*.18],d,1.1,t?.1:0,d>0?s.MAGIC2:s.MAGIC,s.MAGIC,40+(d>0?10:0));if(l("eyesRing"))for(let d=0;d<6;d++){const p=Math.PI*(.2+d/5*.6);u.ell([Math.cos(p)*.25-.1,.95+Math.sin(p)*.45,(d-2.5)*.12],[.06,.06,.06],s.MAGIC2,{group:95+d,extra:!0})}return Bn(u,n,e,i,.75,r)}function _d(n,e,t,i,r="towards"){const a=e===3,o=d=>a&&n.legend.includes(d),l=new nt,u=t===0,c=.55,h=o("wingsBig")?1.5:1;wu(l,0,.3*h);for(const d of[-1,1]){const p=[0,c+.05,d*.1],m=[.05,c+(u?.35:-.05),d*.45*h],M=[[-.05,c+(u?.45:-.15),d*.85*h],[-.25,c+(u?.2:-.25),d*.75*h],[-.3,c+(u?0:-.25),d*.4*h]],x=o("wingsBig")?s.MAGIC:s.BODY2,g=o("wingsBig")?s.MAGIC2:s.BODY3;l.seg(p,m,.03,.025,g,{group:11});for(const A of M)l.seg(m,A,.02,.012,g,{group:11});const _=y.sub(M[0],p),E=y.norm(_),S=y.norm(y.sub(M[2],m)),R=y.norm(y.sub(S,y.mul(E,y.dot(S,E))));l.flat(y.add(y.lerp(p,M[0],.5),y.mul(R,.12*h)),E,R,Math.hypot(..._)*.55,.3*h,Vr.membrane(x),{group:10+(d>0?1:0),bend:.2})}l.ell([0,c,0],[.13,.16,.12],s.BODY,{group:1});const f=[.08,c+.2,0];l.ell(f,[.12,.11,.11],s.BODY,{group:1});for(const d of[-1,1])l.ell(y.add(f,[-.02,.15,d*.07]),[.12,.045,.02],s.BODY,{dir:[.1,1,d*.3],up:[1,0,0],group:1,paint:p=>p[0]>f[0]-.01?s.EAR:void 0});return Zi(l,f,[.12,.11,.11],[[.7,.2,.5],[.7,.2,-.5]],.025,a?s.MAGIC2:s.EYE),l.ell(nt.surface(f,[.12,.11,.11],[1,-.2,0]),[.025,.02,.03],s.NOSE,{group:1}),Bn(l,n,e,i,.55,r)}function vd(n,e,t,i,r="towards"){const a=e===3,o=new nt,l=t?.03:0;o.seg([-.5,.18,0],[-.62,.12,0],.04,.02,s.SKIN,{group:3});for(const u of[-1,1])o.ell([-.3,.05,u*.2],[.07,.04,.05],s.SKIN,{group:u>0?6:2}),o.anchors.feet.push({c:[-.3,.05,u*.2],r:.07,group:u>0?6:2});o.ell([0,.3,0],[.52,.29,.33],s.BODY,{paint:u=>u[1]>.45?s.BODY2:void 0}),o.ell([.55,.24,0],[.2,.07,.07],s.SKIN,{dir:[1,-.15,0],group:1}),o.ell([.74,.21,0],[.04,.05,.06],s.NOSE,{group:1});for(const u of[-1,1]){const c=[.32,.1-(u>0?l:0),u*.34];o.ell(c,[.13,.035,.12],s.SKIN,{group:u>0?7:2,axes:[[1,0,0],[0,1,0],[0,0,1]]});for(let h=0;h<4;h++)o.ell(y.add(c,[.14,-.01,u*(h-1.5)*.05]),[.05,.015,.015],s.ACCENT,{group:u>0?7:2})}for(const u of[-1,1])o.ell(nt.surface([0,.3,0],[.52,.29,.33],y.norm([.85,.3,u*.35])),[.015,.015,.015],a?s.MAGIC2:s.EYE,{group:1});return o.anchors.head={c:[.32,.34,0],r:[.25,.22,.25],top:[.3,.58,0]},o.anchors.eyes={pts:[-1,1].map(u=>nt.surface([0,.3,0],[.52,.29,.33],y.norm([.85,.3,u*.35]))),size:.03},o.anchors.neck={c:[.36,.3,0],r:.27,dir:[1,.1,0]},a&&Au(o,[.15,.62,0],.15),Bn(o,n,e,i,.55,r)}function bd(n,e,t,i,r="towards"){const a=e===3,o=f=>a&&n.legend.includes(f),l=new nt;for(const f of[-1,1])for(let d=0;d<3;d++){const p=.25-d*.25,m=(d+(f>0?1:0)+t)%2?.06:-.06,M=[p,.22,f*.2];l.chain([[...M,.03],[p+m+(1-d)*.06,.32,f*.42,.025],[p+m*1.5+(1-d)*.15,.02,f*.55,.015]],f>0?s.BODY2:s.BODY3,{group:f>0?7:2})}l.ell([-.12,.34,0],[.46,.24,.32],s.BODY,{paint:f=>Math.abs(f[2])<.018&&f[1]>.4?s.LINE:f[1]>.5&&f[2]>.05&&f[2]<.17?s.BELLY:void 0}),l.ell([.38,.33,0],[.16,.16,.26],s.BODY,{group:1});const u=[.56,.3,0];l.ell(u,[.1,.1,.17],s.BODY2,{group:1});const c=[.3,.5,.7,.75][e]*(o("horn")?1.3:1),h=o("horn")?s.MAGIC:s.BODY3;for(const f of[-1,1]){const d=y.add(u,[.08,.02,f*.1]),p=y.add(d,[c*.7,c*.45,f*c*.15]),m=y.add(p,[c*.25,-c*.12,-f*c*.12]);l.chain([[...d,.045],[...p,.035],[...m,.015]],h,{group:8+(f>0?1:0)}),l.seg(y.lerp(d,p,.55),y.add(y.lerp(d,p,.55),[0,c*.22,0]),.02,.008,h,{group:8})}for(const f of[-1,1])l.chain([[...y.add(u,[.05,.06,f*.1]),.012],[u[0]+.1,.5,f*.22,.012],[u[0]+.2,.5,f*.26,.012]],s.BODY3,{group:9,extra:!0});return Zi(l,u,[.1,.1,.17],[[.4,.3,.85],[.4,.3,-.85]],.032,a?s.MAGIC2:s.EYE,9),o("crystals")&&Al(l,[[[-.35,.5,.1],.3],[[-.1,.55,-.08],.45],[[.1,.5,.1],.35]]),Bn(l,n,e,i,.5,r)}function Sd(n,e,t,i,r="towards"){const a=e===3,o=new nt,l=t?.04:0;o.ell([0,.07,0],[.6+l,.07,.17],s.SKIN,{group:1}),o.chain([[.45+l,.08,0,.1],[.6+l,.25,0,.09],[.68+l,.28,0,.08]],s.SKIN,{group:1});for(const h of[-1,1])o.seg([.7+l,.32,h*.04],[.78+l,.55,h*.1],.018,.014,s.SKIN,{group:5}),o.ell([.78+l,.57,h*.1],[.03,.03,.03],a?s.MAGIC2:s.EYE,{group:5});o.anchors.head={c:[.68+l,.3,0],r:[.09,.08,.09],top:[.66+l,.38,0]},o.anchors.eyes={pts:[-1,1].map(h=>[.78+l,.57,h*.1]),size:.03},o.anchors.neck={c:[.55+l,.17,0],r:.1,dir:[1,1.2,0]};const u=[-.12,.4,0],c=a?s.MAGIC:s.BODY;return o.ell(u,[.32,.32,.22],c,{group:3,paint:h=>{const f=Math.atan2(h[1]-u[1],h[0]-u[0]);return((Math.hypot(h[0]-u[0],h[1]-u[1])/.32-f/(Math.PI*2)*.3)%.3+.3)%.3<.06?a?s.MAGIC2:s.BODY3:void 0}}),Bn(o,n,e,i,.45,r)}function Ed(n,e,t,i,r="towards"){const a=e===3,o=new nt;for(const l of[-1,1])for(let u=0;u<7;u++){const c=-.45+u*.15,h=(u+t)%2?.03:-.03;o.seg([c,.1,l*.22],[c+h,.01,l*.33],.025,.015,s.BODY3,{group:l>0?7:2})}for(const l of[-1,1])o.chain([[.5,.15,l*.08,.02],[.7,.3,l*.2,.015],[.82,.22,l*.26,.012]],s.BODY3,{group:9,extra:!0});return o.ell([0,.18,0],[.58,.2,.3],s.BODY,{paint:l=>(Math.floor((l[0]+.6)*9)%2&&l[1]>.2?s.BODY2:void 0)||(Math.abs((l[0]+.6)*9%1)<.12?s.LINE:void 0)}),Zi(o,[0,.18,0],[.58,.2,.3],[[.92,.3,.25],[.92,.3,-.25]],.02,a?s.MAGIC2:s.EYE),a&&Al(o,[[[-.3,.32,.05],.3],[[0,.37,-.05],.45],[[.25,.32,.05],.32]]),Bn(o,n,e,i,.4,r)}function yd(n,e,t,i,r="towards"){const a=e===3,o=e===1,l=p=>a&&n.legend.includes(p),u=new nt,c=t?.7:0,h=[];for(let p=0;p<=12;p++){const m=p/12;h.push([-.9+m*1.2,.07,Math.sin(m*Math.PI*2+c)*.25*(1-m*.5),.03+.045*Math.sin(Math.min(1,m*1.4)*Math.PI/2)])}h.push([.38,.25,h[12][2],.07],[.42,.45,h[12][2]*.8,.065]),u.chain(h,s.BODY,{paint:p=>p[1]<.05&&p[0]<.35?s.BELLY:Zn([p[0]*1.5,p[1],p[2]],14,.3)?s.BODY3:void 0});const f=[.5,.5,h[13][2]*.8],d=o?.11:.09;if(u.ell(f,[d*1.5,d*.75,d],s.BODY,{dir:[1,-.15,0],group:1}),Zi(u,f,[d*1.5,d*.75,d],[[.5,.5,.7],[.5,.5,-.7]],d*.22,a?s.MAGIC2:s.EYE),t||u.seg(y.add(f,[d*1.4,-d*.2,0]),y.add(f,[d*2.3,-d*.3,0]),.01,.008,s.SKIN,{group:1}),u.anchors.feet.push({c:y.add(h[0].slice(0,3),[-.02,-.01,0]),r:.06,group:3,tail:!0}),u.anchors.neck={c:[.42,.36,h[12][2]*.9],r:.075,dir:[.2,1,0]},l("wings"))for(const p of[-1,1])Rs(u,[0,.2,p*.05],p,.9,t?.1:0,p>0?s.MAGIC2:s.MAGIC,s.MAGIC,40+(p>0?10:0));return Bn(u,n,e,i,.45,r)}function wd(n,e,t,i,r="towards"){const a=e===3,o=d=>a&&n.legend.includes(d),l=new nt,u=t===0,c=.55,h=o("wingsBig")?1.45:1,f=o("wingsBig")?s.MAGIC:s.BODY;wu(l,0,.3*h);for(const d of[-1,1]){const p=u?.5:-.1,m=y.norm([.35,p,d]),M=y.norm([-.3,p*.6,d]);l.flat(y.add([0,c,d*.05],y.mul(m,.38*h)),m,y.norm(y.cross(m,[0,1,0])),.4*h,.24*h,Vr.spotted(f,s.BELLY,s.BODY3),{group:10+(d>0?1:0)}),l.flat(y.add([-.05,c,d*.05],y.mul(M,.26*h)),M,y.norm(y.cross(M,[0,1,0])),.27*h,.17*h,Vr.spotted(o("wingsBig")?s.MAGIC2:s.BODY2,s.BODY2,s.BODY2),{group:12+(d>0?1:0)}),l.chain([[.12,c+.08,d*.03,.015],[.2,c+.25,d*.1,.025],[.24,c+.32,d*.14,.012]],s.BODY2,{group:11})}return l.ell([0,c,0],[.22,.09,.09],s.BELLY,{group:1,paint:d=>Zn(d,30,.25)?s.BODY2:void 0}),l.ell([.17,c+.03,0],[.07,.07,.07],s.BELLY,{group:1}),Zi(l,[.17,c+.03,0],[.07,.07,.07],[[.7,.3,.6],[.7,.3,-.6]],.02,a?s.MAGIC2:s.EYE),Bn(l,n,e,i,.5,r)}function Ad(n,e,t,i,r="towards"){const a=e===3,o=c=>a&&n.legend.includes(c),l=new nt,u=t?.05:0;for(let c=0;c<9;c++){const h=c/8,f=-.6+h*1.15;l.ell([f,.12+Math.sin(h*Math.PI)*(.06+u),0],[.08,.1-h*.02,.12-h*.03],c<2?s.MAGIC2:c%2?s.BODY2:s.BODY,{group:1})}o("lantern")&&l.ell([-.75,.3,0],[.22,.22,.22],s.MAGIC2,{group:3,paint:c=>c[1]<.2?s.MAGIC:void 0});for(let c=0;c<6;c++)l.seg([-.2+c*.12,.05,.08],[-.2+c*.12+(c%2?.02:-.02)*(t?-1:1),0,.12],.015,.01,s.BODY3,{group:7});return l.ell([.6,.14,0],[.06,.06,.08],s.BODY3,{group:1}),Zi(l,[.6,.14,0],[.06,.06,.08],[[.6,.3,.7],[.6,.3,-.7]],.015,a?s.MAGIC2:s.EYE),Bn(l,n,e,i,.4,r)}function Td(n,e,t,i,r="towards"){const a=e===3,o=h=>a&&n.legend.includes(h),l=new nt,u=[.15,.28,0];for(const h of[-1,1])for(let f=0;f<4;f++){const d=-.6+f*.4,p=(f+(h>0?0:1)+t)%2?.05:-.05,m=y.add(u,[.05-f*.04,0,h*.1]),M=y.add(m,[Math.cos(d)*.3*(f<2?1:-.6)+p,.3,h*.3]),x=y.add(m,[Math.cos(d)*.55*(f<2?1:-.8)+p*1.5,-.28,h*.55]);l.chain([[...m,.03],[...M,.028],[...x,.015]],h>0?s.BODY2:s.BODY3,{group:h>0?7:2})}l.ell([-.28,.38,0],[.34,.28,.3],s.BODY,{paint:h=>(Math.abs(h[2])<.03||Math.abs(h[0]+.28)<.03)&&h[1]>.45?s.BELLY:void 0}),l.ell(u,[.18,.13,.17],s.BODY2,{group:1}),l.anchors.head={c:u,r:[.18,.13,.17]},l.anchors.eyes={pts:[[.05,.05],[.05,-.05]].map(([h,f])=>nt.surface(u,[.18,.13,.17],y.norm([.9,h*6,f*4]))),size:.03},l.anchors.neck={c:[-.02,.32,0],r:.15,dir:[1,0,0]};const c=o("eyesRing");for(const[h,f]of[[.05,.05],[.05,-.05],[.02,.1],[.02,-.1]])l.ell(nt.surface(u,[.18,.13,.17],y.norm([.9,h*6,f*4])),[.025,.025,.025],c?s.MAGIC2:s.EYE,{group:1});if(c)for(let h=0;h<5;h++){const f=Math.PI*(.2+h/4*.6);l.ell([-.3+Math.cos(f)*.2,.75+Math.sin(f)*.35,(h-2)*.12],[.06,.06,.06],s.MAGIC2,{group:95+h,extra:!0})}return Bn(l,n,e,i,.5,r)}const Rd=new Map(Object.entries({owl:md,hedgehog:gd,toad:xd,raven:Md,bat:_d,mole:vd,beetle:bd,snail:Sd,woodlouse:Ed,snake:yd,moth:wd,glowworm:Ad,spider:Td})),Tl=[{id:"wolf",name:"Wolf",plan:"quad",hue:.08,sat:.24,val:.56,legend:["wings","mane"],q:{len:.64,chest:.42,tuck:.6,neck:.32,neckAng:.7,neckW:.42,hr:.26,snout:.82,snoutD:.7,ear:"point",earS:.82,tail:"brush",paw:"paw",legW:1.25,saddle:!0,belly:!0},tail:"up"},{id:"fox",name:"Fox",plan:"quad",q:{hgt:.8,len:.62,chest:.4,tuck:.5,neck:.3,neckAng:.7,neckW:.32,hr:.24,snout:1.05,snoutD:.5,snoutTaper:.6,ear:"point",earS:1.35,tail:"bushy",paw:"paw",legW:.9,belly:!0,socks:.3},hue:.06,sat:.8,val:.9,belly:"white",legend:["tails"]},{id:"badger",name:"Badger",plan:"quad",q:{hgt:.62,len:.78,chest:.2,tuck:.22,neck:.18,neckAng:.1,neckW:.5,hr:.26,snout:1,snoutD:.55,snoutTaper:.55,ear:"round",earS:.7,tail:"stub",paw:"paw",legW:1.35,legMat:s.BODY3,face:"badger",shaggy:!0},hue:.65,sat:.08,val:.45,legend:["crystals"]},{id:"boar",name:"Boar",plan:"quad",hue:.07,sat:.62,val:.5,legend:["tusksBig"],q:{len:.72,chest:.34,tuck:.42,neck:.2,neckAng:-.15,neckW:.55,hr:.27,snout:1.25,snoutD:.62,snoutTaper:.55,ear:"small",earS:.8,tail:"thin",paw:"hoof",legW:1.15,ridge:!0,tusks:!0,back:"hump",disc:!0},ridge:!0},{id:"stag",name:"Stag",plan:"quad",q:{hgt:1.3,len:.6,chest:.6,tuck:.7,neck:.55,neckAng:.95,neckW:.32,hr:.2,snout:1.15,snoutD:.6,snoutTaper:.65,ear:"point",earS:1.1,tail:"deer",paw:"hoof",legW:.75,antlers:"branch",rump:!0,spots:"young",belly:!0},hue:.08,sat:.5,val:.7,legend:["antlersGlow"]},{id:"hare",name:"Hare",plan:"quad",q:{hgt:.72,len:.5,chest:.4,tuck:.45,neck:.2,neckAng:.9,neckW:.35,hr:.27,snout:.65,snoutD:.7,ear:"long",earS:2.4,tail:"puff",paw:"paw",legW:.85,haunch:1.35,hindFoot:1.6,back:"arch",belly:!0,whiskers:!0},hue:.08,sat:.4,val:.72,legend:["jackalope"]},{id:"owl",name:"Owl",plan:"owl",hue:.08,sat:.5,val:.55,legend:["eyesRing","wings"]},{id:"bear",name:"Bear",plan:"quad",q:{hgt:1.15,len:.72,chest:.38,tuck:.4,neck:.25,neckAng:.3,neckW:.55,hr:.28,snout:.7,snoutD:.62,snoutTaper:.7,ear:"round",earS:.8,tail:"stub",paw:"paw",legW:1.55,back:"hump",muzzle:!0,shaggy:!0},hue:.07,sat:.55,val:.42,legend:["moss"]},{id:"hedgehog",name:"Hedgehog",plan:"hedgehog",hue:.08,sat:.4,val:.5,legend:["crystals"]},{id:"squirrel",name:"Squirrel",plan:"quad",q:{hgt:.55,len:.45,chest:.35,tuck:.4,neck:.2,neckAng:.9,neckW:.35,hr:.3,snout:.55,snoutD:.65,ear:"tuft",earS:1.1,tail:"squirrel",paw:"paw",legW:.8,haunch:1.3,back:"arch",belly:!0,whiskers:!0},hue:.03,sat:.75,val:.75,belly:"white",legend:["starTail"]},{id:"toad",name:"Toad",plan:"toad",hue:.2,sat:.5,val:.55,legend:["crown"]},{id:"otter",name:"Otter",plan:"quad",q:{hgt:.55,len:1,chest:.25,tuck:.25,neck:.3,neckAng:.35,neckW:.5,hr:.27,snout:.6,snoutD:.7,ear:"round",earS:.5,tail:"otter",paw:"paw",legW:1.1,muzzle:!0,belly:!0,whiskers:!0},hue:.07,sat:.55,val:.45,belly:"white",legend:["ribbons"]},{id:"lynx",name:"Lynx",plan:"quad",q:{hgt:.9,len:.55,chest:.5,tuck:.55,neck:.25,neckAng:.8,neckW:.4,hr:.27,snout:.5,snoutD:.75,snoutTaper:.8,ear:"tuft",earS:1,tail:"bob",paw:"paw",legW:1.2,cheeks:!0,spots:!0,belly:!0,whiskers:!0},hue:.09,sat:.45,val:.75,legend:["mane"]},{id:"elk",name:"Elk",plan:"quad",q:{hgt:1.4,len:.68,chest:.6,tuck:.66,neck:.45,neckAng:.75,neckW:.42,hr:.24,snout:1.6,snoutD:.9,snoutTaper:.85,ear:"point",earS:.9,tail:"stub",paw:"hoof",legW:.9,back:"hump",antlers:"palm",shaggy:!0},hue:.07,sat:.55,val:.38,legend:["antlersGlow","moss"]},{id:"raven",name:"Raven",plan:"raven",hue:.68,sat:.35,val:.3,legend:["wings","eyesRing"]},{id:"bat",name:"Bat",plan:"bat",hue:.78,sat:.25,val:.45,legend:["wingsBig"]},{id:"mole",name:"Mole",plan:"mole",hue:.7,sat:.15,val:.32,legend:["crown"]},{id:"beaver",name:"Beaver",plan:"quad",q:{hgt:.6,len:.65,chest:.2,tuck:.22,neck:.2,neckAng:.4,neckW:.55,hr:.28,snout:.6,snoutD:.75,ear:"round",earS:.45,tail:"flat",paw:"paw",legW:1.2,back:"arch",teeth:!0,whiskers:!0},hue:.06,sat:.6,val:.45,legend:["moss"]},{id:"stoat",name:"Stoat",plan:"quad",q:{hgt:.5,len:1,chest:.3,tuck:.33,neck:.35,neckAng:.6,neckW:.32,hr:.25,snout:.6,snoutD:.6,ear:"round",earS:.6,tail:"stoat",paw:"paw",legW:.8,belly:!0,back:"arch",whiskers:!0},hue:.1,sat:.25,val:.92,legend:["ribbons","mane"]},{id:"snail",name:"Snail",plan:"snail",hue:.08,sat:.45,val:.55,legend:["glowShell"]},{id:"ram",name:"Ram",plan:"quad",q:{hgt:.95,len:.6,chest:.48,tuck:.52,neck:.22,neckAng:.45,neckW:.48,hr:.25,snout:.85,snoutD:.75,snoutTaper:.8,ear:"small",earS:.7,tail:"stub",paw:"hoof",legW:.9,wool:!0,horns:"curl",face:"dark"},hue:.1,sat:.12,val:.88,legend:["hornsGlow"]},{id:"woodlouse",name:"Woodlouse",plan:"woodlouse",hue:.65,sat:.12,val:.45,legend:["crystals"]},{id:"snake",name:"Snake",plan:"snake",hue:.25,sat:.45,val:.45,legend:["wings"]},{id:"moth",name:"Moth",plan:"moth",hue:.1,sat:.3,val:.7,legend:["wingsBig"]},{id:"marten",name:"Pine marten",plan:"quad",q:{hgt:.55,len:.78,chest:.35,tuck:.38,neck:.3,neckAng:.55,neckW:.35,hr:.25,snout:.65,snoutD:.6,ear:"round",earS:.9,tail:"bushy",paw:"paw",legW:.85,belly:!0,back:"arch"},hue:.07,sat:.6,val:.45,legend:["mane"]},{id:"salamander",name:"Salamander",plan:"quad",q:{hgt:.42,len:.9,chest:.14,tuck:.14,neck:.12,neckAng:.05,neckW:.5,hr:.27,snout:.55,snoutD:.55,ear:"none",tail:"otter",paw:"paw",legW:1,spots:!0,spotMat:"belly"},hue:.1,sat:.1,val:.22,belly:"yellow",legend:["flames"]},{id:"glowworm",name:"Glow-worm",plan:"glowworm",hue:.12,sat:.4,val:.35,legend:["lantern"]},{id:"spider",name:"Spider",plan:"spider",hue:.07,sat:.45,val:.4,legend:["eyesRing"]},{id:"dormouse",name:"Dormouse",plan:"quad",q:{hgt:.38,len:.45,chest:.35,tuck:.38,neck:.15,neckAng:.6,neckW:.4,hr:.34,snout:.45,snoutD:.7,ear:"round",earS:.85,tail:"squirrel",paw:"paw",legW:.8,back:"arch",belly:!0,whiskers:!0,eyeK:1.6},hue:.09,sat:.6,val:.75,belly:"white",legend:["starTail"]},{id:"beetle",name:"Stag beetle",plan:"beetle",hue:.78,sat:.5,val:.35,legend:["horn","crystals"]}],Tu=Object.fromEntries(Tl.map(n=>[n.id,n])),oc=[[[255,70,170],[255,245,250],[255,230,70]],[[40,220,255],[255,236,60],[255,80,180]],[[150,80,255],[175,255,60],[255,255,255]]],lc={sneakers:[[255,70,90],[250,250,245]],glitter:[[215,215,235],[190,190,210]],platform:[[160,60,230],[40,30,52]]};function Cd(n,e,t=null){const i=Ld(n,e);if(!t)return i;if(t.collar&&(i[s.COLLAR]=Array.isArray(t.collar)?t.collar:i[s.MAGIC]),t.hat!=null){const[r,a,o]=oc[t.hat%oc.length];i[s.HAT1]=r,i[s.HAT2]=a,i[s.POM]=o}if(t.glasses&&(i[s.SHADES]=[22,18,32],i[s.FRAME]=t.glasses==="heart"?[255,60,110]:[255,90,210]),t.shoes){const[r,a]=lc[t.shoes]||lc.sneakers;i[s.SHOE]=r,i[s.SOLE]=a}if(t.woken){i[s.WOKEN]=[255,40,36];for(const r of[s.BODY,s.BODY2,s.BODY3,s.BELLY,s.ACCENT,s.EAR])i[r]&&(i[r]=i[r].map((a,o)=>Math.round(a*.72+[30,8,12][o]*.1)))}return i}function Ld(n,e){const t=Tu[n],i=e.cVal/.85,r=e.cSat/.6,a=xe(t.hue,t.sat*r*e.sat,t.val*i),o=t.belly==="yellow"?[240,196,40]:t.belly==="white"||t.q?.face==="badger"?[236,232,222]:xe(t.hue+.03,t.sat*.5*r,Math.min(1,t.val*i*1.3+.08)),l=xe(e.magicHue+t.hue*.3,.6,1),u=xe(e.magicHue+t.hue*.3,.18,1),c=["boar","stag","elk","ram"].includes(t.id);return{[s.BODY]:a,[s.BODY2]:xe(t.hue+.02,Math.min(1,t.sat*r*1.2+.05),t.val*i*.66),[s.BODY3]:xe(t.hue+.03,Math.min(1,t.sat*r*1.3+.1),t.val*i*.4),[s.BELLY]:o,[s.ACCENT]:c?[236,226,200]:xe(t.hue+.05,t.sat*.6,Math.min(1,t.val*i*.5+.25)),[s.MAGIC]:l,[s.MAGIC2]:u,[s.LEAF]:xe(.3,.55,.55),[s.LEAF2]:xe(.25,.5,.75),[s.LEAF3]:xe(.33,.6,.35),[s.TRUNK]:xe(.07,.45,.32),[s.EYE]:[24,18,30],[s.PUPIL]:[70,40,90],[s.GLINT]:[255,255,245],[s.NOSE]:[38,28,36],[s.EAR]:xe(t.hue+.97,Math.min(1,t.sat*.6+.2),Math.min(1,t.val*i*.55+.2)),[s.IRIS]:t.plan==="owl"?[255,176,40]:xe(.12,.7,.85),[s.SKIN]:[238,158,192]}}const Dd=["size","growth","pixel","head","eye","legs","long","fur"],ta=new Map;function Pd(n,e,t,i,r="towards",a=null){const o=Tu[n]||Tl[0],l=a&&(a.collar||a.hat!=null||a.glasses||a.shoes||a.woken)?a:null,u=[o.id,e,t,r,...Dd.map(h=>i[h]),l?[!!l.collar,l.hat??"",l.glasses||"",l.shoes||"",!!l.woken].join(","):""].join("|");let c=ta.get(u);if(!c){if(c=cd(l,()=>o.q?dd(o,e,t,i,r):Rd.get(o.plan)(o,e,t,i,r)),l?.woken)for(let h=0;h<c.m.length;h++)(c.m[h]===s.EYE||c.m[h]===s.IRIS||c.m[h]===s.PUPIL)&&(c.m[h]=s.WOKEN);ta.size>600&&ta.delete(ta.keys().next().value),ta.set(u,c)}return c}const $e=(...n)=>({l:n}),At=(n,e,t,i,r)=>({a:[n,e,t,i,r]}),rn=(n,e)=>({d:[n,e]}),xt=(n,e=.86)=>$e([.5,e],[.5,n]),Mt=At(.5,.76,.13,25,155),Id=n=>n.l?{l:n.l.map(([e,t])=>[1-e,t])}:n.a?{a:[1-n.a[0],n.a[1],n.a[2],180-n.a[3],180-n.a[4]]}:{d:[1-n.d[0],n.d[1]]},_t=(...n)=>n.flatMap(e=>[e,Id(e)]);function _i(n,e,t){const i=e[0]-n[0],r=e[1]-n[1],a=Math.hypot(i,r),o=t*a,l=(a*a/4+o*o)/(2*Math.abs(o)),u=(n[0]+e[0])/2,c=(n[1]+e[1])/2,h=r/a,f=-i/a,d=(l-Math.abs(o))*Math.sign(o),p=u-h*d,m=c-f*d,M=Math.atan2(n[1]-m,n[0]-p)*180/Math.PI;let g=Math.atan2(e[1]-m,e[0]-p)*180/Math.PI-M;for(;g>180;)g-=360;for(;g<-180;)g+=360;return At(p,m,l,M,M+g)}const Nd=(n,e,t,i,r,a=24)=>$e(...Array.from({length:a+1},(o,l)=>[n+i*Math.sin(l/a*r*2*Math.PI),e+(t-e)*l/a])),Od=(n,e,t,i,r,a=0,o=40)=>$e(...Array.from({length:o+1},(l,u)=>{const c=u/o,h=(a+c*r*360)*Math.PI/180,f=t+(i-t)*c;return[n+f*Math.cos(h),e+f*Math.sin(h)]})),Na=(n,e,t,i,r)=>r.map(a=>{const o=Math.cos(a*Math.PI/180),l=Math.sin(a*Math.PI/180);return $e([n+t*o,e+t*l],[n+i*o,e+i*l])});xt(.3),$e([.28,.08],[.5,.3],[.72,.08]),At(.5,.55,.2,-55,55),rn(.5+.2*Math.cos(-55*Math.PI/180),.55+.2*Math.sin(-55*Math.PI/180)),xt(.34),$e([.36,.06],[.5,.34],[.64,.06]),At(.67,.66,.17,180,-80),rn(.67+.17*Math.cos(-80*Math.PI/180),.66+.17*Math.sin(-80*Math.PI/180)),[xt(.1),$e([.24,.3],[.76,.3]),..._t($e([.33,.14],[.33,.56])),..._t(rn(.24,.3))],[xt(.16),..._t(At(.36,.24,.15,45,180)),...Na(.5,.16,0,.1,[-130,-90,-50])],[xt(.42),..._t($e([.5,.42],[.34,.26],[.3,.06]),$e([.335,.25],[.16,.2]),$e([.32,.15],[.18,.07]))],[xt(.44),..._t($e([.5,.44],[.4,.34],[.38,.06])),At(.62,.66,.09,180,540),..._t(rn(.38,.06))],[xt(.44),..._t(At(.33,.3,.13,0,360),$e([.24,.18],[.18,.05])),..._t(rn(.33,.3))],[xt(.24),$e([.24,.3],[.76,.3]),..._t(At(.3,.3,.09,180,360)),..._t($e([.36,.5],[.32,.62]))],[xt(.52),At(.5,.52,.2,180,360),...Na(.5,.52,.22,.34,[-160,-125,-90,-55,-20])],xt(.2),$e([.5,.2],[.4,.08]),At(.66,.4,.16,100,-200),rn(.66+.16*Math.cos(-200*Math.PI/180),.4+.16*Math.sin(-200*Math.PI/180)),[xt(.42),$e([.16,.54],[.24,.42],[.76,.42],[.84,.54]),..._t(At(.34,.3,.1,0,360)),..._t(rn(.16,.54))],xt(.24),At(.5,.5,.28,-100,100),rn(.5+.28*Math.cos(-100*Math.PI/180),.5+.28*Math.sin(-100*Math.PI/180)),_i([.18,.64],[.36,.64],.3),[xt(.32),$e([.26,.2],[.5,.32],[.74,.2]),..._t($e([.26,.2],[.26,.06])),$e([.5,.68],[.66,.62]),..._t(rn(.26,.06))],[xt(.3),..._t($e([.5,.3],[.42,.2]),At(.3,.16,.12,0,180),$e([.18,.16],[.14,.06])),$e([.5,.44],[.6,.52])],[xt(.14),$e([.5,.14],[.3,.22]),$e([.18,.56],[.5,.38],[.82,.56]),rn(.58,.17),..._t(rn(.18,.56))],[xt(.3),At(.5,.16,.14,20,160),..._t($e([.5,.38],[.12,.26]),_i([.12,.26],[.24,.46],-.25),_i([.24,.46],[.38,.5],-.3),_i([.38,.5],[.5,.52],-.3))],[xt(.44),At(.5,.3,.16,0,180),...Na(.5,.3,.19,.3,[-160,-125,-55,-20]),$e([.5,.14],[.5,.04])],[xt(.36),$e([.32,.2],[.68,.2]),..._t($e([.44,.2],[.44,.34])),$e([.5,.56],[.68,.66],[.5,.76],[.32,.66],[.5,.56])],[xt(.18),At(.5,.44,.24,180,360),$e([.5,.18],[.6,.08]),..._t(rn(.26,.44))],xt(.52),Od(.5,.33,.03,.2,1.6,90),$e([.66,.2],[.76,.06]),rn(.76,.06),[xt(.24),..._t(At(.36,.24,.14,0,-250)),..._t(rn(.36+.14*Math.cos(-250*Math.PI/180),.24+.14*Math.sin(-250*Math.PI/180)))],[xt(.24),At(.5,.52,.22,205,335),At(.5,.66,.24,205,335),At(.5,.38,.2,205,335),..._t($e([.5,.24],[.32,.06]))],[xt(.16),Nd(.5,.82,.2,.2,1.25),$e([.5,.2],[.5,.11]),..._t($e([.5,.11],[.42,.045]))],[xt(.2),..._t($e([.5,.3],[.16,.18],[.24,.5],[.5,.4]),$e([.5,.5],[.3,.64],[.5,.66]),At(.38,.16,.12,0,-110))],[xt(.32),$e([.3,.2],[.5,.32],[.7,.2]),..._t(At(.3,.14,.07,90,-180)),At(.28,.56,.22,0,150),rn(.28+.22*Math.cos(150*Math.PI/180),.56+.22*Math.sin(150*Math.PI/180))],[xt(.3),_i([.5,.3],[.5,.06],.35),_i([.5,.3],[.5,.06],-.35),..._t($e([.5,.42],[.32,.38],[.26,.48]),$e([.5,.64],[.32,.6],[.26,.7])),..._t(rn(.38,.52))],[xt(.4),At(.5,.27,.1,90,450),...Na(.5,.27,.15,.25,[0,60,120,180,240,300])],[$e([.5,.05],[.5,.3]),xt(.5),At(.5,.4,.11,-90,270),..._t(...[-150,-170,170,150].map(n=>$e([.5+.12*Math.cos(n*Math.PI/180),.4+.12*Math.sin(n*Math.PI/180)],[.5+.28*Math.cos(n*Math.PI/180),.4+.28*Math.sin(n*Math.PI/180)],[.5+.32*Math.cos(n*Math.PI/180),.4+.28*Math.sin(n*Math.PI/180)+.1]))),rn(.5,.05)],[xt(.12),At(.5,.46,.24,-60,250),..._t(At(.34,.16,.08,90,-180)),_i([.56,.38],[.7,.38],-.4)],[xt(.36),..._t(At(.66,.26,.2,160,250)),_i([.5,.38],[.5,.82],.25),_i([.5,.38],[.5,.82],-.25)];Tl.map(n=>n.id);const da=new Set([s.TRUNK,s.BARK2,s.BARKD,s.BARKL,s.BELLY]);function dn(n,e,t,i,r,a,{mat:o=s.LEAF,group:l=30,ragged:u=1}={}){const h=[];for(let g=0;g<9;g++){const _=g/9*Math.PI*2,E=1+(a()-.5)*.35*(r.clump+.3);h.push([e[0]+Math.cos(_)*t*E,e[1]+Math.sin(_)*i*E*(Math.sin(_)>0?.8:1)])}const f=Math.max(1,Math.round(Math.min(t,i)/3.5));n.shape(Ts(h,0,9,f,Math.max(1.2,Math.min(t,i)*.14)*u,1),o,{group:l,line:!1,round:r.round}),n.mark([ft(e,[-t*1.1,i*.15]),ft(e,[t*1.1,i*.1]),ft(e,[t*1.1,i*1.2]),ft(e,[-t*1.1,i*1.2])],s.LEAF3,[o]),n.mark([ft(e,[-t*.75,-i*.55]),ft(e,[t*.25,-i*.95]),ft(e,[t*.55,-i*.35]),ft(e,[-t*.2,-i*.05])],s.LEAF2,[o]);const d=Math.floor(e[0]-t*1.2),p=Math.ceil(e[0]+t*1.2),m=Math.floor(e[1]-i*1.2),M=Math.ceil(e[1]+i*1.2),x=a()*1e4|0;for(let g=m;g<=M;g++)for(let _=d;_<=p;_++){const E=n.get(_,g);if(E!==o&&E!==s.LEAF2&&E!==s.LEAF3)continue;const S=Ht(_,g,x),R=li(_/2,g/2,x)*.5+S*.5;R<.16*r.density?n.recolour(_,g,E===s.LEAF2?o:s.LEAF2):R>1-.16*r.density&&n.recolour(_,g,E===s.LEAF3?o:s.LEAF3)}}function sn(n,e,t,i,r,a,o,l,{mat:u=s.TRUNK,bend:c=1,group:h=10,line:f=!1}={}){const d=[e],p=4;let m=t,M=e;for(let x=1;x<=p;x++)m+=(l()-.5)*.7*o.gnarl*c,M=ft(M,[Math.cos(m)*i/p,Math.sin(m)*i/p]),d.push(M);return n.limb(d.map((x,g)=>[...x,r+(a-r)*g/p]),u,{group:h,line:f,round:o.round,cap:.6,capEnd:1}),{end:M,ang:m,pts:d}}function Oi(n,e,t,i,r,a,o){if(n.shape([[e-i*1.05,t],[e-i*.62,t-i*.5],[e-i*.45,t-i*1.4],[e+i*.45,t-i*1.4],[e+i*.62,t-i*.5],[e+i*1.05,t]],s.TRUNK,{group:10,round:r.round}),r.roots<=0)return;const l=Math.round(2+r.roots*4);for(let u=0;u<l;u++){const c=u%2?1:-1,h=(8+a()*16)*o*(.4+r.roots),f=(2+a()*3)*o,d=[e+c*i*.2,t-i*.5],p=[e+c*(i*.55+h*.4),t-f],m=[e+c*(i*.5+h),t-.5];n.limb([[...d,i*.55],[...p,i*.28],[...m,1.2]],s.TRUNK,{group:11,round:r.round,cap:.5,capEnd:.6})}}function $i(n,e,t=!0){if(!(e.bark<=0))for(let i=0;i<n.h;i++)for(let r=0;r<n.w;r++){const a=i*n.w+r;if(n.m[a]!==s.TRUNK)continue;const o=t?li(r/1.3,i/6,21):li(r/6,i/1.3,21);o>1-e.bark*.42||Ht(r,i,4)<e.bark*.05?n.m[a]=s.BARKD:o>1-e.bark*.62&&n.n[a*3]<-.1&&(n.m[a]=s.BARKL)}}function Ln(n,e,t){let i=n.w,r=-1,a=n.h;for(let d=0;d<n.h;d++)for(let p=0;p<n.w;p++)n.m[d*n.w+p]&&(i=Math.min(i,p),r=Math.max(r,p),a=Math.min(a,d));if(r<0)return{sp:n,crownY:t};const o=Math.max(e-i,r-e)+2,l=Math.max(0,Math.floor(e-o)),u=Math.min(n.w-l,Math.ceil(o*2)+1),c=Math.max(0,a-1),h=n.h-c,f=new Xt(u,h);for(let d=0;d<h;d++)for(let p=0;p<u;p++){const m=(d+c)*n.w+p+l,M=d*u+p;f.m[M]=n.m[m],f.g[M]=n.g[m],f.n[M*3]=n.n[m*3],f.n[M*3+1]=n.n[m*3+1],f.n[M*3+2]=n.n[m*3+2]}return{sp:f,crownY:t-c}}const Jn=n=>(n.crownWidth||3)/3;function Fd(n,e,t){const i=Jn(e),r=Math.round(220*t*i+60*t),a=Math.round(140*t),o=new Xt(r,a),l=r/2,u=a,c=e.treeTrunks||1,h=12*t*(e.treeThick||1)*(e.treeThin?.55:1)/Math.sqrt(c),f=(n()-.5)*.5*e.gnarl+(e.treeLean||0),d=[];let p=a;const m=(M,x,g,_,E)=>{const S=sn(o,M,x,g,_,_*.65,e,n,{group:12});if(E===0){d.push(S.end);return}const R=n()<.35?3:2;for(let A=0;A<R;A++){const D=(A-(R-1)/2)*ce(n,.5,.85)*(E===3?1.4:1);m(S.end,S.ang+D+(n()-.5)*.25,g*ce(n,.6,.78),_*.62,E-1)}E<=2&&d.push(gn(M,S.end,.7))};for(let M=0;M<c;M++){const x=f+(c>1?(M/(c-1)-.5)*.8:0),g=[l+(M-(c-1)/2)*h*.6,u],_=sn(o,g,-Math.PI/2+x,a*.36*(c>1?ce(n,.75,1.15):1),h,h*.72,e,n,{bend:1.4});p=Math.min(p,_.end[1]);for(const E of[-1,1])m(_.end,-Math.PI/2+x*.5+E*ce(n,.55,.95)*(.7+.3*i)*(c>1?.6:1),a*.22*(.75+.25*i)*(c>1?.7:1),h*.7,c>2?2:3);if(c===1&&n()<.7&&m(_.end,-Math.PI/2+(n()-.5)*.3,a*.18,h*.55,2),M===0&&e.treeHollow){const E=gn(g,_.end,.38);o.ellipse(E[0],E[1],h*.28,h*.5,s.NOSE,{round:.3})}}if(Oi(o,l,u,h*Math.sqrt(c),e,n,t),$i(o,e),e.treeWebs)for(let M=0;M+1<d.length;M+=2){const x=d[M],g=d[M+1],_=Math.hypot(g[0]-x[0],g[1]-x[1]);if(_<40*t)for(let E=0;E<=_;E++){const S=gn(x,g,E/_);o.px(S[0],S[1]+Math.sin(E/_*Math.PI)*_*.15,s.WEB,0,0,1)}}if(e.treeBare)return Ln(o,l,p+4*t);d.sort((M,x)=>M[1]-x[1]);for(const M of d)dn(o,ft(M,[0,-3*t]),ce(n,14,21)*t,ce(n,10,14)*t,e,n,{mat:n()<.35?s.LEAF3:s.LEAF});for(const M of d)n()<.75&&dn(o,ft(M,[ce(n,-9,9)*t,ce(n,-12,-3)*t]),ce(n,10,15)*t,ce(n,7,10)*t,e,n);return Ln(o,l,p+4*t)}function Ud(n,e,t){const i=.8+.2*Jn(e),r=Math.round(90*t*i),a=Math.round(160*t),o=new Xt(r,a),l=r/2,u=a;o.limb([[l,u,6*t],[l,u-a*.5,4*t],[l,6*t,1.5]],s.TRUNK,{group:10,round:e.round}),Oi(o,l,u,6*t,e,n,t*.6),$i(o,e);const c=Math.round(ce(n,9,12));for(let h=c-1;h>=0;h--){const f=h/(c-1),d=6*t+f*a*.7,p=(5+f*36)*t*i*ce(n,.9,1.1),m=(5+f*13)*t,M=[[l,d-4*t],[l+p*.5,d+m*.3],[l+p,d+m],[l+p*.7,d+m*1.15],[l,d+m*.7],[l-p*.7,d+m*1.15],[l-p,d+m],[l-p*.5,d+m*.3]];o.shape(Ts(M,1,7,Math.max(2,Math.round(p/(3*t))),2*t,1),s.LEAF,{group:30+h,line:!1,round:e.round}),o.mark([[l-p,d+m*.55],[l+p,d+m*.55],[l+p,d+m*1.4],[l-p,d+m*1.4]],s.LEAF3,[s.LEAF]),o.mark([[l-p*.55,d-2*t],[l+p*.1,d-3*t],[l+p*.1,d+m*.45],[l-p*.7,d+m*.7]],s.LEAF2,[s.LEAF])}return Ln(o,l,a*.82)}function Bd(n,e,t){const i=Jn(e),r=Math.round(200*t*i+50*t),a=Math.round(130*t),o=new Xt(r,a),l=r/2,u=a,c=13*t,h=sn(o,[l,u],-Math.PI/2+(n()-.5)*.3,a*.3,c,c*.8,e,n,{bend:1.6}),f=[];for(let m=0;m<5;m++){const M=m%2?1:-1,x=-Math.PI/2+M*ce(n,.55,1.25)*(.7+.3*i),g=sn(o,h.end,x,a*ce(n,.3,.42)*(.8+.2*i),c*.55,c*.3,e,n,{group:12});f.push(g.end)}Oi(o,l,u,c,e,n,t),$i(o,e);for(const m of f)dn(o,ft(m,[0,-2*t]),ce(n,20,28)*t,ce(n,9,12)*t,e,n);dn(o,ft(h.end,[0,-8*t]),24*t,11*t,e,n);let d=r,p=0;for(const m of f)d=Math.min(d,m[0]-22*t),p=Math.max(p,m[0]+22*t);for(let m=d;m<p;m+=ce(n,1,1.7)){let M=a;for(let E=0;E<a;E++)if(o.get(m,E)===s.LEAF||o.get(m,E)===s.LEAF2||o.get(m,E)===s.LEAF3){M=E;break}if(M>=a)continue;const x=Math.abs(m-l)/(r/2),g=(u-M)*ce(n,.5,.9)*(1-x*.3),_=Ht(m|0,1,9)<.4?s.LEAF2:s.LEAF;for(let E=M+2;E<Math.min(u-2,M+g);E++){const S=Math.round(Math.sin(E*.12+m)*.7);Ht(m|0,E,5)<.2+e.density*.8&&o.px(m+S,E,(E-M)/g>.8?s.LEAF3:_,S*.3,.2,.95)}}return Ln(o,l,h.end[1]+6*t)}function Ru(n,e,t){const i=.7+.3*Jn(e),r=Math.round(110*t*i),a=Math.round(155*t),o=new Xt(r,a),l=r/2,u=a,c=(n()-.5)*.25+(e.treeLean||0),h=sn(o,[l,u],-Math.PI/2+c,a*.85,5*t,2*t,e,n,{mat:s.BARK2,bend:.4});for(let d=0;d<h.pts.length-1;d++)for(let p=0;p<1;p+=1/8){const m=gn(h.pts[d],h.pts[d+1],p+n()*.1);if(n()<.55)for(let M=-3;M<=3;M++)o.get(m[0]+M,m[1])===s.BARK2&&n()<.8&&o.recolour(m[0]+M,m[1],s.BARKD)}const f=[h.end];for(let d=0;d<7;d++){const p=ce(n,.35,.9),m=gn(h.pts[0],h.end,p),M=d%2?1:-1,x=sn(o,m,-Math.PI/2+M*ce(n,.5,1),a*ce(n,.12,.2)*i,2*t,1,e,n,{mat:s.BARKD,group:12});f.push(x.end)}for(const d of f)dn(o,d,ce(n,9,13)*t*i,ce(n,7,10)*t,e,n,{mat:s.LEAF2,ragged:1.3});return Ln(o,l,a*.55)}function kd(n,e,t){const i=Jn(e),r=Math.round(220*t*i+50*t),a=Math.round(120*t),o=new Xt(r,a),l=r/2,u=a,c=10*t,h=sn(o,[l,u],-Math.PI/2+(n()-.5)*.4*(e.gnarl+.3),a*.4,c,c*.75,e,n,{bend:1.2}),f=[];for(const m of[-1,1,-1,1]){const M=sn(o,h.end,-Math.PI/2+m*ce(n,.7,1.15)*(.7+.3*i),a*ce(n,.3,.42)*(.7+.3*i),c*.55,c*.25,e,n,{group:12});f.push(M.end,gn(h.end,M.end,.55))}Oi(o,l,u,c,e,n,t),$i(o,e);const d=Math.round(ce(n,2,3)),p=Math.min(...f.map(m=>m[1]));for(let m=0;m<d;m++){const M=p-6*t+m*9*t,x=(95-m*12)*t*(.65+.35*i);for(let g=0;g<5;g++)dn(o,[l+(g-2)*x*.36+ce(n,-5,5)*t,M+ce(n,-3,3)*t],x*ce(n,.2,.26),7*t,e,n,{mat:m===d-1?s.LEAF:s.LEAF3})}return Ln(o,l,h.end[1]+4*t)}function Zr(n,e,t,i,r,{grain:a=2,holes:o=0,flecks:l=.16,dots:u=0,dot:c=s.FLOWER,dotTall:h=!1,mats:f=[s.LEAF,s.LEAF2,s.LEAF3]}={}){const d=Math.floor(e[0]-t*1.3),p=Math.ceil(e[0]+t*1.3),m=Math.floor(e[1]-i*1.3),M=Math.ceil(e[1]+i*1.3),x=r()*1e4|0;for(let g=m;g<=M;g++)for(let _=d;_<=p;_++){const E=n.get(_,g);if(!f.includes(E))continue;const S=li(_/a,g/a,x),R=Ht(_,g,x);o&&S<o?n.recolour(_,g,s.LEAF3):S>1-l&&n.recolour(_,g,s.LEAF2),u&&R<u&&E!==s.LEAF3&&(n.recolour(_,g,c),h&&n.recolour(_,g-1,c))}}function Fi(n,e,t,i){const r=Jn(e)*(i.wide||1),a=Math.round(240*t*r+70*t),o=Math.round((i.tall||140)*t),l=new Xt(a,o),u=a/2,c=o,h=e.treeTrunks||i.trunks||1,f=(i.tw||12)*t*(e.treeThick||1)*(e.treeThin?.55:1)/Math.sqrt(h),d=(n()-.5)*.4*e.gnarl+(e.treeLean||0)+(i.lean||0),p=[];let m=o;const M=(R,A,D,b,w)=>{const L=sn(l,R,A,D,b,b*.65,e,n,{group:12,mat:i.limbMat||s.TRUNK,bend:i.bend??1});if(w===0){p.push(L.end);return}const C=n()<(i.fork??.35)?3:2;for(let N=0;N<C;N++)M(L.end,L.ang+(N-(C-1)/2)*ce(n,.45,.8)*(i.splay||1)+(n()-.5)*.25,D*ce(n,.6,.78),b*.62,w-1);w<=2&&p.push(gn(R,L.end,.7))};for(let R=0;R<h;R++){const A=d+(h>1?(R/(h-1)-.5)*(i.fan||.8):0),D=[u+(R-(h-1)/2)*f*.6,c],b=sn(l,D,-Math.PI/2+A,o*(i.trunk||.36)*(h>1?ce(n,.8,1.1):1),f,f*.72,e,n,{bend:i.trunkBend??1.2,mat:i.trunkMat||s.TRUNK});m=Math.min(m,b.end[1]);for(let w=0;w<(i.limbs||2);w++){const L=w%2?1:-1;M(b.end,-Math.PI/2+A*.5+L*ce(n,.5,1)*(i.spreadA||.8)*(h>1?.7:1),o*(i.limb||.22)*(h>1?.75:1),f*.7,i.depth??3)}if(i.leader&&M(b.end,-Math.PI/2+(n()-.5)*.2,o*(i.limb||.22)*i.leader,f*.55,2),R===0&&e.treeHollow){const w=gn(D,b.end,.38);l.ellipse(w[0],w[1],f*.28,f*.5,s.NOSE,{round:.3})}}if(i.noRoots||Oi(l,u,c,f*Math.sqrt(h),e,n,t*(i.rootK||1)),i.smooth||$i(l,e),e.treeBare)return Ln(l,u,m+4*t);p.sort((R,A)=>R[1]-A[1]);const[x,g]=i.clumpR||[12,18],_=i.flat||.7,E=[],S=(R,A,D,b)=>{dn(l,R,A,D,e,n,{mat:b,ragged:i.ragged||1}),E.push([R,A,D])};for(const R of p)S(ft(R,[0,-3*t]),ce(n,x,g)*t,ce(n,x,g)*t*_,n()<(i.darkBack??.35)?s.LEAF3:s.LEAF);for(const R of p)n()<(i.extra??.7)&&S(ft(R,[ce(n,-9,9)*t,ce(n,-12,-3)*t]),ce(n,x,g)*t*.7,ce(n,x,g)*t*_*.7,s.LEAF);if(i.dome){const R=Math.min(...p.map(w=>w[1])),A=p.map(w=>w[0]),D=(Math.min(...A)+Math.max(...A))/2,b=(Math.max(...A)-Math.min(...A))/2;for(let w=0;w<i.dome;w++){const L=w/Math.max(1,i.dome-1)-.5;S([D+L*b*1.1,R-(1-4*L*L)*14*t-ce(n,2,6)*t],ce(n,x,g)*t*1.1,ce(n,x,g)*t*_,s.LEAF)}}if(i.layers)for(const[R,A,D]of E)for(let b=-D;b<D;b+=Math.max(3,i.layers*t))for(let w=-A;w<A;w++)l.get(R[0]+w,R[1]+b)===s.LEAF&&l.recolour(R[0]+w,R[1]+b,s.LEAF3);for(const[R,A,D]of E)Zr(l,R,A,D,n,i.tex||{});return Ln(l,u,m+4*t)}function zd(n,e,t){return Fi(n,{...e,gnarl:Math.max(e.gnarl,.8)},t,{trunk:.26,tw:15,limbs:3,spreadA:1.05,limb:.26,depth:3,wide:1.15,clumpR:[10,15],flat:.75,extra:.9,dome:5,bend:1.4,tex:{grain:1.6,holes:.12,flecks:.18}})}function Hd(n,e,t){return Fi(n,{...e,gnarl:e.gnarl*.4},t,{trunk:.4,tw:11,limbs:2,leader:1.3,spreadA:.6,limb:.22,depth:3,clumpR:[15,21],flat:.5,extra:1,dome:7,smooth:1,layers:3.5,trunkMat:s.BARK2,limbMat:s.BARK2,tall:155,tex:{grain:3.5,holes:0,flecks:.1}})}function Gd(n,e,t){return Fi(n,{...e,gnarl:e.gnarl*.6},t,{trunk:.4,tw:9,limbs:3,spreadA:.45,limb:.26,depth:3,splay:.6,clumpR:[7,10],flat:.8,extra:.35,ragged:1.8,tall:160,wide:.8,darkBack:.1,tex:{grain:1.2,holes:.3,flecks:.26}})}function Wd(n,e,t){return Fi(n,{...e,gnarl:e.gnarl*.4},t,{trunk:.38,tw:11,limbs:2,spreadA:.55,limb:.24,depth:3,leader:1.1,clumpR:[9,12],flat:.85,extra:1,dome:5,tall:170,wide:.75,darkBack:.15,tex:{grain:1.4,holes:.05,flecks:.22}})}function Vd(n,e,t){return Fi(n,e,t,{trunk:.34,tw:12,limbs:2,spreadA:.8,limb:.24,depth:2,clumpR:[20,27],flat:.7,extra:.8,dome:2,darkBack:.5,tex:{grain:4,holes:.16,flecks:.12}})}function Yd(n,e,t){return Fi(n,e,t,{trunk:.32,tw:14,limbs:2,spreadA:.85,limb:.25,depth:2,clumpR:[22,30],flat:.78,extra:.9,dome:3,darkBack:.25,tall:150,tex:{grain:6,holes:.04,flecks:.16,dots:.025,dotTall:!0}})}function Xd(n,e,t){return Fi(n,{...e,gnarl:e.gnarl*.7},t,{trunk:.45,tw:7,limbs:3,spreadA:.55,limb:.2,depth:2,clumpR:[8,11],flat:.7,extra:.5,ragged:1.7,wide:.6,tall:120,smooth:1,trunkMat:s.BARK2,limbMat:s.BARK2,darkBack:.1,tex:{grain:1.1,holes:.26,flecks:.22,dots:.05}})}function Kd(n,e,t){const i=.7+.3*Jn(e),r=Math.round(110*t*i),a=Math.round(165*t),o=new Xt(r,a),l=r/2,u=a,c=e.treeTrunks||1,h=(n()-.5)*.2+(e.treeLean||0),f=[];for(let p=0;p<c;p++){const m=sn(o,[l+(p-(c-1)/2)*5*t,u],-Math.PI/2+h+(c>1?(p/(c-1)-.5)*.3:0),a*.92,6*t/Math.sqrt(c),1.5,e,n,{bend:.5});for(let M=0;M<16;M++){const x=ce(n,.3,.97),g=gn(m.pts[0],m.end,x),_=M%2?1:-1,E=(1-x*.6)*a*.12*i,S=sn(o,g,-Math.PI/2+_*ce(n,.7,1.2),E,2*t,1,e,n,{group:12,mat:s.BARKD});f.push([S.end,(8+(1-x)*6)*t*i],[gn(g,S.end,.4),(7+(1-x)*4)*t*i])}f.push([m.end,7*t])}Oi(o,l,u,6*t,e,n,t*.6),$i(o,e);for(const[p,m]of f)dn(o,p,m,m*.8,e,n,{mat:n()<.5?s.LEAF3:s.LEAF});for(const[p,m]of f)Zr(o,p,m,m*.8,n,{grain:1.3,holes:.2,flecks:.1,dots:.03,dot:s.BARKD});const d=Math.min(...f.map(([p])=>p[1]));return Ln(o,l,d+(u-d)*.45)}function qd(n,e,t){const i=.8+.2*Jn(e),r=Math.round(150*t*i),a=Math.round(175*t),o=new Xt(r,a),l=r/2,u=a,c=sn(o,[l,u],-Math.PI/2+(n()-.5)*.25+(e.treeLean||0),a*.78,8*t,3*t,e,n,{bend:.7});$i(o,e);for(let f=0;f<o.h*.55;f++)for(let d=0;d<r;d++)(o.get(d,f)===s.TRUNK||o.get(d,f)===s.BARKD)&&o.recolour(d,f,Ht(d,f,3)<.15?s.BARKD:s.BELLY);Oi(o,l,u,8*t,e,n,t*.7);const h=[];for(let f=0;f<6;f++){const d=ce(n,.55,1),p=gn(c.pts[0],c.end,d),m=f%2?1:-1,M=sn(o,p,-Math.PI/2+m*ce(n,.6,1.3),a*ce(n,.12,.22)*i,3*t,1.5,e,n,{group:12,bend:1.6,mat:s.BELLY});h.push(M.end)}h.push(c.end);for(const f of h)dn(o,ft(f,[0,-2*t]),ce(n,13,19)*t*i,ce(n,4,6)*t,e,n,{mat:s.LEAF,ragged:1.3});for(const f of h)Zr(o,ft(f,[0,-2*t]),19*t*i,6*t,n,{grain:1,holes:.25,flecks:.14});return Ln(o,l,Math.min(...h.map(f=>f[1]))+8*t)}function Zd(n,e,t){const i=Jn(e),r=Math.round(200*t*i+50*t),a=Math.round(120*t),o=new Xt(r,a),l=r/2,u=a,c=e.treeTrunks||3,h=9*t*(e.treeThick||1.2);for(let p=0;p<c;p++)sn(o,[l+(p-(c-1)/2)*h*.5,u],-Math.PI/2+(p-(c-1)/2)*.35+(e.treeLean||0),a*.3,h,h*.6,e,n,{mat:s.BELLY,bend:1.6});for(let p=0;p<a;p++)for(let m=0;m<r;m++)o.get(m,p)===s.BELLY&&(m+Math.round(p/6))%4===0&&o.recolour(m,p,s.BARKD);Oi(o,l,u,h*1.4,e,n,t);const f=u-a*.3,d=[];for(let p=0;p<9;p++){const m=Math.PI+p/8*Math.PI,M=(40+20*i)*t;d.push([[l+Math.cos(m)*M,f+Math.sin(m)*M*.55+10*t],ce(n,16,22)*t])}for(let p=0;p<7;p++)d.push([[l+(p/6-.5)*(60+30*i)*t,f-ce(n,4,22)*t],ce(n,20,26)*t]);d.push([[l,f-24*t],26*t]);for(const[p,m]of d)dn(o,p,m,m*.7,e,n,{mat:s.LEAF3,ragged:.6});for(const[p,m]of d)Zr(o,p,m,m*.7,n,{grain:.7,holes:0,flecks:.08,mats:[s.LEAF,s.LEAF2,s.LEAF3]});return Ln(o,l,f+4*t)}function $d(n,e,t){return Fi(n,{...e,gnarl:1},t,{trunk:.3,tw:8,limbs:3,spreadA:.9,limb:.3,depth:3,fork:.6,bend:2,lean:.45,clumpR:[7,10],flat:.65,extra:.8,wide:.7,tall:90,ragged:1.4,darkBack:.3,tex:{grain:1,holes:.1,flecks:.14,dots:.035}})}function Jd(n,e,t){const i=.8+.2*Jn(e),r=Math.round(110*t*i),a=Math.round(130*t),o=new Xt(r,a),l=r/2,u=a;o.limb([[l,u,5*t],[l,u-a*.5,3*t],[l,10*t,1.5]],s.BARK2,{group:10,round:e.round});const c=[];for(let h=0;h<10;h++){const f=h/9,d=10*t+f*a*.72,p=(5+f*28)*t*i,m=1+Math.round(f*3);for(let M=0;M<m;M++)c.push([[l+(m>1?(M/(m-1)-.5)*p*1.3:0)+ce(n,-2,2)*t,d+ce(n,-2,2)*t],(6+f*5)*t])}for(const[h,f]of c)dn(o,h,f*1.2,f,e,n,{mat:s.LEAF3,ragged:.7});for(const[h,f]of c)Zr(o,h,f*1.2,f,n,{grain:1.1,holes:0,flecks:.2,dots:.035,mats:[s.LEAF,s.LEAF2,s.LEAF3]});return Ln(o,l,a*.85)}function Qd(n,e,t){return Fi(n,{...e,gnarl:e.gnarl*.5,treeTrunks:e.treeTrunks||6},t,{trunk:.5,tw:9,limbs:1,spreadA:.5,limb:.18,depth:1,fan:1.3,trunkBend:.8,clumpR:[11,15],flat:.8,extra:1,wide:.8,tall:110,noRoots:!1,rootK:.4,smooth:1,trunkMat:s.BARK2,limbMat:s.BARK2,darkBack:.2,tex:{grain:3.6,holes:.14,flecks:.2}})}function jd(n,e,t){const i=Ru(n,{...e,treeLean:e.treeLean||0},t),r=i.sp;for(let a=0;a<r.w;a++){let o=-1;for(let u=0;u<r.h;u++)if([s.LEAF,s.LEAF2,s.LEAF3].includes(r.get(a,u))){o=u;break}if(o<0||Ht(a,1,7)<.35)continue;const l=(r.h-o)*ce(n,.25,.5);for(let u=o+1;u<Math.min(r.h-3,o+l);u++)(!r.get(a,u)||r.get(a,u)===s.LEAF3)&&r.px(a+Math.round(Math.sin(u*.2+a)*.6),u,Ht(a,u,2)<.3?s.LEAF:s.LEAF2,0,.2,.95)}return i}function ef(n,e,t){const i=.8+.2*Jn(e),r=Math.round(100*t*i),a=Math.round(170*t),o=new Xt(r,a),l=r/2,u=a;o.limb([[l,u,6*t],[l,u-a*.5,3.5*t],[l,6*t,1.2]],s.TRUNK,{group:10,round:e.round}),Oi(o,l,u,6*t,e,n,t*.5),$i(o,e);const c=14;for(let h=0;h<c;h++){const f=h/(c-1),d=8*t+f*a*.68,p=(4+f*30)*t*i;for(let m=0;m<4;m++){const M=[l+(m/3-.5)*p*1.6,d+Math.abs(m/3-.5)*6*t];dn(o,M,p*.35+2*t,4*t,e,n,{mat:s.LEAF2,ragged:1.6}),Zr(o,M,p*.35+2*t,4*t,n,{grain:1,holes:.32,flecks:.1,mats:[s.LEAF,s.LEAF2]})}}return Ln(o,l,a*.8)}const tf=6;function nf(n,e,t,i,r){const{sp:a,crownY:o}=n,l=a.w,u=a.h,c=a.low||(a.low=new Uint8Array(l*u)),h=Math.ceil(o+tf*i);if(h>=u-2)return n;const f=i/(t.treeSize*2/(t.pixel||2)),d=Math.max(0,Math.min(1,(1-f)/.5)),p=!!t.treeBare,m=w=>{const L=[];let C=-1;for(let N=0;N<=l;N++){const O=N<l&&da.has(a.m[w*l+N]);O&&C<0&&(C=N),!O&&C>=0&&(L.push([C,N-1]),C=-1)}return L},M=(w,L)=>w.reduce((C,N)=>!C||Math.abs((N[0]+N[1])/2-L)<Math.abs((C[0]+C[1])/2-L)?N:C,null),x=w=>{const L=a.m.slice(),C=a.n.slice();w();for(let N=0;N<L.length;N++)a.m[N]!==L[N]&&((N/l|0)<h||L[N]&&!da.has(L[N])&&!c[N]?(a.m[N]=L[N],a.n[N*3]=C[N*3],a.n[N*3+1]=C[N*3+1],a.n[N*3+2]=C[N*3+2]):c[N]=1)},g=()=>{for(let w=0;w<8;w++){const L=Math.round(ce(e,h,u-3)),C=m(L);if(C.length){const N=Sl(e,C),O=e()<.5?-1:1;return{x:O<0?N[0]:N[1],y:L,side:O}}}return null},_=p?0:1,E=u-1;let S=l,R=0;for(let w=0;w<h*l;w++)if(a.m[w]&&!da.has(a.m[w])){const L=w%l;S=Math.min(S,L),R=Math.max(R,L)}const A=Math.max(6*i,(R-S)*.22);r.moss&&x(()=>{for(let w=Math.max(h,Math.round(u-(u-h)*.4));w<u;w++)for(let L=0;L<l;L++){const C=w*l+L;if(!da.has(a.m[C]))continue;const N=w>0&&!a.m[C-l];(li(L/2.5,w/2.5,41)>1-r.moss*(.35+.4*(w-h)/(u-h))||N&&Ht(L,w,9)<r.moss*.6)&&(a.m[C]=Ht(L,w,5)<.3?s.LEAF2:s.LEAF)}}),r.ivy&&e()<.35+r.ivy*.6&&x(()=>{let w=l/2;const L=E-(E-h)*ce(e,.45,.95)*Math.min(1,r.ivy+.3),C=e()*6;for(let N=E-1;N>L;N--){const O=M(m(N),w);if(!O)break;if(w=O[0]+(O[1]-O[0])*(.5+.48*Math.sin(N*.22+C)),a.px(w,N,s.LEAF3,0,0,1),Ht(Math.round(w),N,13)<.45){const I=Ht(N,3,2)<.5?-1:1;a.px(w+I,N,s.LEAF,I*.5,-.3,.8),a.px(w+I*2,N,s.LEAF3,I*.6,0,.8),a.px(w+I,N-1,Ht(w,N,4)<.4?s.LEAF2:s.LEAF3,0,-.6,.8)}}});const D=Math.round(r.sprigs*_*(5+8*d)*(u-h)/(40*i));for(let w=0;w<D;w++){const L=g();if(!L)break;const C=ce(e,3,5.5)*i;x(()=>dn(a,[L.x+L.side*C*.6,L.y],C,C*.75,t,e,{mat:e()<.4?s.LEAF3:s.LEAF,ragged:.8}))}const b=Math.round(r.boughs*_*(3+4*d)*(u-h)/(45*i)+(e()<r.boughs*_?1:0));for(let w=0;w<b;w++){const L=g();if(!L)break;x(()=>{const C=sn(a,[L.x,L.y],-Math.PI/2+L.side*ce(e,.9,1.35),Math.min(A,ce(e,10,20)*i),2*i,1,t,e,{group:12,mat:s.TRUNK}),N=ce(e,6,9.5)*i;dn(a,ft(C.end,[0,-1*i]),N,N*.65,t,e,{mat:e()<.4?s.LEAF3:s.LEAF})})}if(r.skirt&&_){const w=Math.round(3+r.skirt*5+d*3);for(let L=0;L<w;L++)x(()=>{const C=Math.round(ce(e,Math.max(h,u-(u-h)*.8),u-4*i)),N=M(m(C),l/2);if(!N)return;const O=L%2?1:-1,I=O<0?N[0]:N[1],B=Math.min(A*1.3,ce(e,14,24)*i*(.6+r.skirt*.5)),W=sn(a,[I,C],-Math.PI/2+O*ce(e,1.6,1.95),B,1.6*i,1,t,e,{group:12,mat:s.BARKD});dn(a,gn([I,C],W.end,.6),B*.5,3.5*i,t,e,{mat:e()<.5?s.LEAF3:s.LEAF,ragged:1.2})})}return n}const rf={broad:{ivy:.4,moss:.6,sprigs:.5,boughs:.3},fir:{moss:.3,skirt:1},willow:{moss:.5,sprigs:.3},birch:{sprigs:.3,boughs:.2},flat:{ivy:.3,sprigs:.4,boughs:.3},oak:{ivy:.5,moss:.5,sprigs:.9,boughs:.4},beech:{moss:.3,boughs:.3},ash:{ivy:.6,sprigs:.3,boughs:.2},lime:{moss:.3,sprigs:1},sycamore:{ivy:.4,moss:.4,boughs:.4},chestnut:{sprigs:.3,boughs:.5},rowan:{sprigs:.3,boughs:.3},alder:{moss:.6,sprigs:.4},pine:{ivy:.3,moss:.3,boughs:.15},yew:{moss:.4,skirt:1},hawthorn:{moss:.5,sprigs:.6,boughs:.5},holly:{skirt:.7},hazel:{moss:.4,sprigs:.8},weepingBirch:{sprigs:.3},larch:{skirt:.5,boughs:.2}},af=(n,e)=>(t,i,r)=>nf(n(t,i,r),t,i,r,e),_s={broad:{fn:Fd,name:"gnarled broadleaf",grow:"normal"},fir:{fn:Ud,name:"spruce",grow:"narrow",hue:.06},willow:{fn:Bd,name:"willow",grow:"willow",hue:-.02,val:1.05},birch:{fn:Ru,name:"silver birch",grow:"narrow",hue:-.02,val:1.08},flat:{fn:kd,name:"field maple",grow:"normal",hue:.01},oak:{fn:zd,name:"oak",grow:"wide",hue:.01,val:.92},beech:{fn:Hd,name:"beech",grow:"normal",hue:-.03,sat:1.05,val:1.02,trunk:[.62,.08,.62]},ash:{fn:Gd,name:"ash",grow:"narrow",hue:-.04,sat:.85,val:1.12},lime:{fn:Wd,name:"lime",grow:"narrow",hue:-.05,sat:1.1,val:1.12},sycamore:{fn:Vd,name:"sycamore",grow:"wide",hue:.03,sat:1.1,val:.72},chestnut:{fn:Yd,name:"horse chestnut",grow:"wide",hue:-.01,val:1,dot:[244,238,226]},rowan:{fn:Xd,name:"rowan",grow:"small",hue:-.01,val:1.05,trunk:[.08,.12,.52],dot:[210,40,34]},alder:{fn:Kd,name:"alder",grow:"narrow",hue:.04,sat:.9,val:.72},pine:{fn:qd,name:"Scots pine",grow:"narrow",hue:.1,sat:.7,val:.78,upper:[.06,.6,.72]},yew:{fn:Zd,name:"yew",grow:"wide",hue:.07,sat:.8,val:.55,upper:[.02,.55,.45]},hawthorn:{fn:$d,name:"hawthorn",grow:"small",hue:.025,val:.8,dot:[176,30,40]},holly:{fn:Jd,name:"holly",grow:"narrow",hue:.06,sat:.85,val:.6,trunk:[.1,.08,.55],dot:[214,28,36]},hazel:{fn:Qd,name:"hazel coppice",grow:"small",hue:0,val:.94,trunk:[.07,.3,.45]},weepingBirch:{fn:jd,name:"weeping birch",grow:"narrow",hue:-.04,val:1.12},larch:{fn:ef,name:"larch",grow:"narrow",hue:-.07,sat:.8,val:1.15}};for(const[n,e]of Object.entries(_s))e.bare=e.fn,e.fn=af(e.fn,rf[n]||{});const sf=new Map(Object.entries(_s).flatMap(([n,e])=>[[e.fn,{id:n,...e}],[e.bare,{id:n,...e}]])),Cu=n=>_s[n]||_s.broad;function Rl(n,e,t){const i=sf.get(t),r=i?.sat||1,a=i?.val||1,o=i?.hue||0,l=o<0?o*Math.max(0,Math.min(1,(e.leafHue-.17)/.09)):o,u=e.leafHue+(n()-.5)*e.leafVariety*.7+l,c={[s.TRUNK]:xe(e.trunkHue,.45*e.sat,.34),[s.BARKD]:xe(e.trunkHue+.03,.5*e.sat,.17),[s.BARKL]:xe(e.trunkHue-.01,.38*e.sat,.5),[s.BARK2]:[222,220,212],[s.LEAF]:xe(u,Math.min(1,.62*e.sat*r),Math.min(1,.58*a)),[s.LEAF2]:xe(u-.05,Math.min(1,.55*e.sat*r),Math.min(1,.8*a)),[s.LEAF3]:xe(u+.03,Math.min(1,.66*e.sat*r),.38*a),[s.WEB]:[225,225,232]};return i?.trunk&&(c[s.BARK2]=xe(...i.trunk)),i?.upper&&(c[s.BELLY]=xe(...i.upper)),i?.dot&&(c[s.FLOWER]=i.dot),c}function of(n){const{sp:e,crownY:t}=n,i=new Xt(e.w,e.h),r=new Xt(e.w,e.h);for(let a=0;a<e.h;a++)for(let o=0;o<e.w;o++){const l=a*e.w+o,u=e.m[l];if(!u)continue;(da.has(u)&&a>=t||e.low?.[l]?r:i).put(o,a,u,e.n[l*3],e.n[l*3+1],e.n[l*3+2])}return{top:i,bot:r}}function lf(n,e){const t=e.bushSize,i=Sl(n,["round","round","fern","grass","shrub"]),r=Math.round(40*t),a=Math.round(28*t),o=new Xt(r,a);if(i==="round"||i==="shrub"){const u=i==="shrub"?5:3;for(let c=0;c<u;c++)dn(o,[r/2+ce(n,-9,9)*t,a-8*t+ce(n,-4,2)*t],ce(n,7,10)*t,ce(n,5,8)*t,e,n);if(i==="shrub"||n()<e.flowers)for(let c=0;c<18*e.flowers+3;c++){const h=r/2+ce(n,-12,12)*t,f=a-ce(n,5,17)*t;o.get(h,f)&&o.recolour(h,f,s.FLOWER)}}else if(i==="fern")for(let u=0;u<7;u++){const c=-Math.PI/2+(u/6-.5)*2.4;let h=r/2,f=a-1;for(let d=0;d<15*t;d++)h+=Math.cos(c)*.9,f+=Math.sin(c)*.9+d*.06,o.put(h,f,u%2?s.LEAF3:s.LEAF,Math.cos(c)*.4,-.2,.9),d%2&&(o.put(h,f-1,s.LEAF2,0,-.5,.85),o.put(h+Math.sign(Math.cos(c)),f+1,s.LEAF,0,.3,.9))}else for(let u=0;u<18*t;u++){const c=r/2+ce(n,-13,13)*t,h=ce(n,5,15)*t,f=ce(n,-3,3);for(let d=0;d<h;d++)o.put(c+f*d/h*(d/h),a-1-d,d>h*.65?s.LEAF2:d<h*.3?s.LEAF3:s.LEAF,f*.1,-.3,.9)}const l=Rl(n,e,null);return l[s.FLOWER]=xe(n(),.55,.95),{sp:o,colours:l}}const ke=(n,e={})=>["tree",{type:n,...e}],Ue=(n,e={})=>[n,e],Aa=[{id:"moor",name:"Moor",creature:"badger",by:"Ed",leaf:.24,floor:["moss",.26,.45,.42],text:{floor:"moss",wall:"puddles, a lake",small:"long grass",big:"moss mounds"},wall:[Ue("water",{w:1.6})],small:[Ue("grass",{h:1.4})],big:[Ue("mound",{moss:!0})]},{id:"fern-forest",name:"Fern forest",creature:"boar",by:"Ed",leaf:.3,floor:["needles",.08,.45,.32],text:{floor:"pine needles",small:"ferns",big:"pine trees"},small:[Ue("fern")],big:[ke("larch",{scale:1.1}),ke("fir",{minor:!0})]},{id:"muddy-forest",name:"Muddy forest",creature:"snail",by:"Ed",leaf:.22,floor:["mud",.07,.5,.28],text:{floor:"mud and leaves",small:"short trunks with broken branches",big:"trees with many trunks and branches"},small:[Ue("stump",{snag:!0})],big:[ke("sycamore",{trunks:3,gnarl:.9}),ke("alder",{minor:!0})]},{id:"stone-shrine",name:"Stone shrine",creature:"fox",by:"Ed",leaf:.28,floor:["stony",.25,.3,.45],text:{floor:"grassy, stony",wall:"mossy henges",small:"little stones",big:"big stones",set:"a shrine"},wall:[Ue("henge")],small:[Ue("stones")],big:[Ue("boulder")],set:Ue("shrine")},{id:"tangly-forest",name:"Tangly forest",creature:"ram",by:"Ed",leaf:.27,floor:["nettles",.28,.5,.3],text:{floor:"nettles and earth",small:"tangled branches",big:"fairly short tangly trees"},small:[Ue("bramble",{bare:!0})],big:[ke("hawthorn",{scale:.9,gnarl:1})]},{id:"wispy-forest",name:"Wispy forest",creature:"woodlouse",by:"Ed",leaf:.2,floor:["leaves",.09,.55,.45],text:{floor:"dry leaves",small:"tall thin wispy trees",big:"thick trees with several trunks"},small:[ke("birch",{scale:.75})],big:[ke("lime",{trunks:3,thick:1.4}),ke("birch",{minor:!0})]},{id:"hazel-forest",name:"Hazel forest",creature:"hedgehog",by:"Ed",leaf:.26,floor:["grass",.24,.45,.45],text:{floor:"short grass",small:"brown lumps",big:"crooked trees with many branches"},small:[Ue("mound",{brown:!0})],big:[ke("hazel",{gnarl:1,scale:.95}),ke("oak",{minor:!0,scale:.9})]},{id:"garden",name:"Garden",creature:"squirrel",by:"Ed",leaf:.3,floor:["lawn",.27,.5,.5],text:{floor:"uniform grass",wall:"ornate stone wall",small:"manicured flower beds",big:"willows",set:"a stone pavilion"},wall:[Ue("wall")],small:[Ue("flowerbed")],big:[ke("willow")],set:Ue("pavilion")},{id:"twiggy-forest",name:"Twiggy forest",creature:"wolf",by:"Ed",leaf:.29,floor:["plants",.3,.5,.38],text:{floor:"small leafy plants",small:"small trees with many thin trunks",big:"straight but slanted trees with many trunks"},small:[ke("broad",{trunks:4,scale:.5,thin:!0})],big:[ke("ash",{trunks:3,lean:.3,gnarl:.1})]},{id:"ancient",name:"Ancient",creature:"stag",by:"Ed",leaf:.31,floor:["roots",.1,.25,.35],text:{floor:"mossy roots over rocks",small:"sorrel",big:"giant gnarly slanted trees"},small:[Ue("flowers",{hue:.98,leafy:!0})],big:[ke("yew",{scale:1.4,gnarl:1,lean:.35}),ke("oak",{minor:!0,scale:1.3,gnarl:1})]},{id:"norway",name:"Norway",creature:"stoat",by:"Ed",leaf:.36,floor:["slate",.6,.15,.35],text:{floor:"pine needles and slate",small:"rocks",big:"straight pines"},small:[Ue("stones",{big:!0})],big:[ke("fir",{scale:1.2}),ke("birch",{minor:!0})]},{id:"alder-forest",name:"Alder forest",creature:"snake",by:"Ed",leaf:.23,floor:["tallgrass",.22,.45,.42],text:{floor:"tall and short grass",small:"tree stumps with tall grass around",big:"tall slanted trees with thin leaves at different heights"},small:[Ue("stump",{grass:!0})],big:[ke("alder",{lean:.3,scale:1.2,dark:!0})]},{id:"meadow",name:"Meadow",creature:"hare",by:"draft",leaf:.25,floor:["flowers",.25,.5,.5],text:{floor:"grass and wildflowers",small:"scattered hawthorn",big:"lone oaks"},small:[Ue("shrub",{flower:[250,245,235]})],big:[ke("chestnut",{scale:1.1}),ke("hawthorn",{minor:!0,scale:.8})]},{id:"old-oaks",name:"Old oaks",creature:"owl",by:"draft",leaf:.22,floor:["leaves",.07,.5,.35],text:{floor:"leaf litter",small:"acorns, fallen branches",big:"ancient gnarled oaks with hollow trunks",set:"a great hollow oak"},small:[Ue("cones",{acorn:!0}),Ue("log",{branch:!0})],big:[ke("oak",{gnarl:.9,hollow:!0}),ke("holly",{minor:!0,scale:.8})],set:ke("broad",{scale:1.6,gnarl:1,hollow:!0})},{id:"berry-thicket",name:"Berry thicket",creature:"bear",by:"draft",leaf:.32,floor:["needles",.08,.45,.3],text:{floor:"pine needles",wall:"bramble thickets",small:"berry bushes",big:"tall pines"},wall:[Ue("bramble")],small:[Ue("shrub",{flower:[200,30,60]})],big:[ke("pine",{scale:1.2}),ke("rowan",{minor:!0})]},{id:"wetland",name:"Wetland",creature:"toad",by:"draft",leaf:.2,floor:["mud",.15,.45,.3],text:{floor:"wet mud",wall:"puddles, reeds",small:"reeds and rushes",big:"willows"},wall:[Ue("water"),Ue("reeds",{tall:!0})],small:[Ue("reeds")],big:[ke("willow"),ke("alder",{minor:!0,scale:.9})]},{id:"stream",name:"Stream",creature:"otter",by:"draft",leaf:.27,floor:["pebbles",.25,.3,.45],text:{floor:"pebbles and grass",wall:"a stream or pond",small:"alder saplings",big:"alders",set:"a fallen-log bridge"},wall:[Ue("water",{w:2})],small:[ke("broad",{scale:.45})],big:[ke("alder",{scale:.95,gnarl:.3}),ke("willow",{minor:!0,scale:.8})],set:Ue("bridge")},{id:"rocky-slope",name:"Rocky slope",creature:"lynx",by:"draft",leaf:.34,floor:["scree",.2,.2,.42],text:{floor:"scree and moss",wall:"boulders",small:"rocks",big:"pines",set:"a rocky outcrop"},wall:[Ue("boulder",{big:!0})],small:[Ue("stones",{big:!0})],big:[ke("rowan",{scale:1.1}),ke("pine",{minor:!0})],set:Ue("outcrop")},{id:"bog",name:"Bog",creature:"elk",by:"draft",leaf:.38,floor:["moss",.18,.55,.4],text:{floor:"sphagnum moss",wall:"bog pools",small:"cotton grass",big:"spruce"},wall:[Ue("water",{bog:!0})],small:[Ue("reeds",{cotton:!0})],big:[ke("birch",{scale:.8,dark:!0}),ke("pine",{minor:!0,scale:.7})]},{id:"deadwood",name:"Deadwood",creature:"raven",by:"draft",leaf:.15,floor:["earth",.07,.35,.3],text:{floor:"bare earth",small:"broken branches",big:"blasted dead trees"},small:[Ue("log",{branch:!0})],big:[ke("broad",{bare:!0,gnarl:1})]},{id:"cave-mouth",name:"Cave mouth",creature:"bat",by:"draft",leaf:.2,floor:["stone",.08,.15,.35],text:{floor:"stone and roots",wall:"rock walls",small:"stalagmite stubs",big:"dead trees",set:"a cave mouth"},wall:[Ue("rockwall")],small:[Ue("stalagmite")],big:[ke("broad",{bare:!0}),ke("yew",{minor:!0,scale:.8})],set:Ue("cave")},{id:"grassland",name:"Grassland",creature:"mole",by:"draft",leaf:.25,floor:["grass",.26,.5,.48],text:{floor:"short turf",small:"molehills",big:"lone birches"},small:[Ue("mound",{brown:!0,small:!0})],big:[ke("flat",{scale:1.1}),ke("weepingBirch",{minor:!0})]},{id:"beaver-pond",name:"Beaver pond",creature:"beaver",by:"draft",leaf:.17,floor:["leaves",.13,.6,.5],text:{floor:"birch leaves",wall:"a pond",small:"stumps",big:"birch and aspen",set:"a beaver dam"},wall:[Ue("water",{w:2})],small:[Ue("stump",{gnawed:!0})],big:[ke("weepingBirch"),ke("alder",{minor:!0,scale:.8})],set:Ue("dam")},{id:"log-pile",name:"Log pile",creature:"beetle",by:"draft",leaf:.22,floor:["leaves",.06,.5,.3],text:{floor:"rotting leaves",small:"fungi",big:"rotting logs",set:"a fallen giant"},small:[Ue("fungi")],big:[Ue("log",{rot:!0})],set:Ue("log",{rot:!0,giant:!0})},{id:"heath",name:"Heath",creature:"moth",by:"draft",leaf:.27,floor:["heather",.85,.35,.4],text:{floor:"heather",small:"gorse",big:"wind-bent birches"},small:[Ue("shrub",{flower:[250,205,40],spiky:!0})],big:[ke("birch",{lean:.45,scale:.75}),ke("hawthorn",{minor:!0,scale:.7,lean:.45})]},{id:"old-pinewood",name:"Old pinewood",creature:"marten",by:"draft",leaf:.35,floor:["needles",.07,.4,.3],text:{floor:"pine needles",small:"pine cones",big:"tall old pines with knotholes"},small:[Ue("cones")],big:[ke("pine",{scale:1.35}),ke("rowan",{minor:!0,scale:.8})]},{id:"ravine",name:"Ravine",creature:"salamander",by:"draft",leaf:.3,floor:["stone",.3,.3,.32],text:{floor:"wet moss and rock",wall:"rock walls",small:"ferns",big:"mossy boulders",set:"a waterfall"},wall:[Ue("rockwall",{moss:!0})],small:[Ue("fern")],big:[Ue("boulder",{moss:!0,big:!0})],set:Ue("waterfall")},{id:"bluebell-glade",name:"Bluebell glade",creature:"glowworm",by:"draft",leaf:.26,floor:["bluebells",.27,.45,.4],text:{floor:"bluebells",small:"ferns",big:"beeches"},small:[Ue("fern")],big:[ke("beech",{gnarl:.2,scale:1.1}),ke("holly",{minor:!0,scale:.7})]},{id:"holly-thicket",name:"Holly thicket",creature:"spider",by:"draft",leaf:.36,floor:["leaves",.08,.35,.28],text:{floor:"dead leaves",wall:"holly hedges",small:"cobwebs",big:"hollies",set:"a web-hung dead tree"},wall:[Ue("hedge",{berries:!0})],small:[Ue("web")],big:[ke("holly",{scale:.9}),ke("yew",{minor:!0,scale:.7})],set:ke("broad",{bare:!0,webs:!0})},{id:"honeysuckle-tangle",name:"Honeysuckle tangle",creature:"dormouse",by:"draft",leaf:.25,floor:["clover",.27,.45,.45],text:{floor:"grass and clover",wall:"bramble",small:"honeysuckle",big:"hazel coppice"},wall:[Ue("bramble")],small:[Ue("shrub",{flower:[250,230,170]})],big:[ke("hazel",{trunks:5,scale:.7,thin:!0}),ke("rowan",{minor:!0,scale:.7})]}];for(const[n,[e,t]]of Object.entries(yu)){const i=Aa.find(r=>r.id===n);i&&!i.set&&(i.set=Ue(e,{three:!0}),i.text={...i.text,set:t})}const cf=Object.fromEntries(Aa.map(n=>[n.id,n])),uf=["ruins","rocks","freak","lake","modern"],vt=(n,e,t,i,r,a,o,l,u,c,h={})=>({pattern:n,...h,density:e,clump:t,glades:{count:i[0],size:i[1]||[0,0]},heightMix:r&&{sapling:r[0],mature:r[1],tall:r[2],giant:r[3]},undergrowth:a,lean:{dir:o[0],amount:o[1]},terrain:l,decor:{rate:u[0],...Object.fromEntries(uf.map((f,d)=>[f,u[1][d]]))},feel:c}),Nt=[0,0],hf={moor:vt("scatter",.2,.6,[2,[14,24]],null,.7,[30,.2],["pools","mounds","hollows"],[.5,[.3,.4,0,.3,0]],"Open rolling moss, low mounds and dark pools, long grass combed one way by the wind; you can see a long way."),"fern-forest":vt("groves",.65,.6,[2,[8,12]],[.2,.5,.25,.05],.9,Nt,["hollows","paths"],[.25,[.4,.3,.3,0,0]],"Pine groves standing waist-deep in ferns, with green sunken hollows between them."),"muddy-forest":vt("scatter",.7,.3,[1,[6,9]],[.25,.55,.17,.03],.4,Nt,["pools","paths"],[.3,[.3,.1,.2,.1,.3]],"Squelching mud between many-trunked trees, puddled ruts winding through, broken stumps everywhere."),"stone-shrine":vt("rings",.35,.8,[1,[10,14]],null,.3,Nt,["rocky","mounds"],[.5,[.6,.4,0,0,0]],"Big stones stand in rings round the shrine on stony grass; it feels deliberate and old."),"tangly-forest":vt("thicket",.9,.2,[1,[5,8]],[.35,.55,.1,0],.9,Nt,["hollows"],[.2,[.2,0,.6,0,.2]],"Short tangled trees packed close over nettles, low and claustrophobic, with one small clearing."),"wispy-forest":vt("stands",.55,.7,[2,[6,10]],[.15,.45,.3,.1],.5,Nt,["ridges"],[.3,[.4,.2,.3,0,.1]],"Stands of thick many-trunked trees, thin wispy saplings drifting between them over dry leaves."),"hazel-forest":vt("rings",.6,.6,[2,[6,9]],[.3,.55,.12,.03],.5,Nt,["mounds","paths"],[.3,[.4,.3,.3,0,0]],"Crooked hazels grown in loose fairy rings on short grass, lumpy little mounds in the middle of each."),garden:vt("rows",.45,0,[3,[6,10]],[.1,.7,.2,0],.6,Nt,["paths","pools"],[.4,[.7,0,0,.2,.1]],"A lost formal garden: willows in avenues along straight paths, lawns and flower beds, a pavilion at the heart.",{along:"paths"}),"twiggy-forest":vt("scatter",.75,.3,[1,[6,10]],[.25,.5,.2,.05],.6,[60,.5],["paths"],[.25,[.3,.2,.3,0,.2]],"Straight many-trunked trees all slanting the same way, like a wood frozen in a gale."),ancient:vt("lone",.4,.2,[1,[12,18]],[.05,.35,.4,.2],.4,[150,.25],["rocky","mounds","hollows"],[.45,[.5,.2,.3,0,0]],"Giant gnarled trees far apart, roots heaving over mossy rocks; every tree is a landmark."),norway:vt("stands",.8,.5,[1,[8,12]],[.15,.45,.35,.05],.2,Nt,["rocky","ridges"],[.3,[.2,.6,0,.2,0]],"Dense stands of straight pines on slate ridges, bare rock between; dark, vertical and cold."),"alder-forest":vt("scatter",.55,.4,[2,[6,10]],[.2,.4,.35,.05],.6,[120,.35],["stream","hollows"],[.3,[.3,.1,.2,.3,.1]],"Tall slanted alders at every height over long grass and stumps, a little stream wandering through."),meadow:vt("lone",.12,.1,[0],[.2,.5,.25,.05],.3,Nt,["mounds","paths"],[.35,[.3,.3,0,.2,.2]],"Wide-open wildflower grass with a lone oak here and there and scattered hawthorn; the sky does the work."),"old-oaks":vt("groves",.5,.5,[2,[10,16]],[.1,.35,.4,.15],.5,Nt,["mounds","hollows"],[.4,[.5,.1,.4,0,0]],"Groves of huge hollow oaks with broad clearings of leaf litter between; slow and grand."),"berry-thicket":vt("thicket",.85,.5,[2,[4,7]],[.2,.4,.35,.05],1,Nt,["paths"],[.15,[.3,0,.4,0,.3]],"Tall pines over solid berry bushes and brambles, only narrow animal paths and a couple of pockets of space."),wetland:vt("edgeOnly",.5,.5,[1,[16,24]],[.25,.55,.15,.05],.8,Nt,["pools","stream"],[.35,[.2,0,0,.6,.2]],"Open reedy water and mud in the middle, willows crowding the rim; wet and echoing."),stream:vt("rows",.5,.2,[1,[6,10]],[.3,.45,.2,.05],.5,Nt,["stream","pools"],[.3,[.3,.3,0,.3,.1]],"Alders lining both banks of a pebbly stream, saplings at the water's edge, open grass away from it.",{along:"stream"}),"rocky-slope":vt("scatter",.35,.6,[1,[8,12]],[.3,.5,.18,.02],.2,[90,.15],["rocky","ridges"],[.5,[.3,.7,0,0,0]],"Scree and boulders with pines clinging in clumps, everything leaning slightly uphill."),bog:vt("stands",.25,.85,[3,[10,20]],[.4,.5,.1,0],.6,Nt,["pools","mounds"],[.35,[.2,0,0,.5,.3]],"Sphagnum and bog pools, stunted spruce in tight dark stands, cotton grass pale between them."),deadwood:vt("scatter",.25,.2,[2,[8,14]],[.05,.3,.45,.2],.15,Nt,["ridges","hollows"],[.45,[.3,.1,.3,0,.3]],"Sparse tall blasted snags on bare ridges; bleak, quiet, with long sightlines."),"cave-mouth":vt("edgeOnly",.4,.5,[1,[10,14]],[.2,.5,.3,0],.2,Nt,["rocky","ridges"],[.4,[.3,.6,0,0,.1]],"Rock walls and dead trees ring an open stone floor that leads to the cave's dark mouth."),grassland:vt("lone",.1,.5,[0],[.3,.5,.2,0],.2,Nt,["mounds"],[.35,[.3,.2,0,.1,.4]],"Short turf to the horizon, molehills, birches alone or in twos and threes."),"beaver-pond":vt("edgeOnly",.55,.4,[1,[14,20]],[.4,.45,.15,0],.4,Nt,["pools","stream"],[.4,[.1,0,0,.7,.2]],"A pond in the middle, young birch and aspen round it, gnawed stumps where the big ones were felled."),"log-pile":vt("groves",.5,.7,[2,[6,10]],null,.7,Nt,["hollows","mounds"],[.3,[.3,0,.4,0,.3]],"Rotting logs heaped in piles, fungi everywhere, damp hollows between the heaps."),heath:vt("scatter",.2,.3,[1,[12,18]],[.5,.45,.05,0],.8,[30,.6],["ridges","paths"],[.4,[.4,.4,0,0,.2]],"Purple heather and gorse, small birches bent hard by the wind, all the same way."),"old-pinewood":vt("scatter",.5,.3,[2,[8,14]],[.1,.35,.4,.15],.15,Nt,["mounds","paths"],[.35,[.4,.3,.3,0,0]],"Cathedral-tall old pines on a clear floor of needles; you can see between the trunks a long way."),ravine:vt("edgeOnly",.55,.6,[1,[6,9]],null,.8,Nt,["stream","ridges","rocky"],[.4,[.3,.5,0,.2,0]],"A deep wet cleft: rock walls and mossy boulders either side, ferns, a stream down the middle."),"bluebell-glade":vt("groves",.45,.5,[3,[8,14]],[.1,.5,.35,.05],.3,Nt,["hollows"],[.35,[.4,0,.3,.3,0]],"Beech groves round open glades carpeted in bluebells; soft, bright and airy."),"holly-thicket":vt("thicket",.9,.3,[1,[6,9]],[.3,.6,.1,0],.7,Nt,["hollows"],[.25,[.3,0,.5,0,.2]],"Dark hollies packed close, cobwebs strung between, one clearing round the web-hung tree."),"honeysuckle-tangle":vt("stands",.6,.7,[2,[5,8]],[.45,.5,.05,0],.8,Nt,["paths","mounds"],[.3,[.3,0,.3,0,.4]],"Hazel coppice stools in clumps, honeysuckle and bramble between, clover paths winding through.")};for(const n of Aa)n.layout=hf[n.id];function df(n,e,t=64,i=48){const[r,a,o,l]=n.floor,u=new Xt(t,i),c=n.id.length*131;for(let M=0;M<i;M++)for(let x=0;x<t;x++){const g=(li(x/7,M/5,c)*(t-x)*(i-M)+li((x-t)/7,M/5,c)*x*(i-M)+li(x/7,(M-i)/5,c)*(t-x)*M+li((x-t)/7,(M-i)/5,c)*x*M)/(t*i),_=g<.38?s.BODY2:g>.64?s.BELLY:s.BODY;u.px(x,M,_,0,-.42,.91)}const h=bl(c),f=(M,x,g)=>u.px((M%t+t)%t,(x%i+i)%i,g,0,-.42,.91),d={moss:0,needles:70,mud:25,stony:30,nettles:60,leaves:80,grass:70,lawn:30,plants:60,roots:30,slate:40,tallgrass:90,flowers:70,pebbles:60,scree:70,earth:15,stone:40,heather:90,bluebells:90,clover:60}[r]??40;for(let M=0;M<d;M++){const x=Math.floor(h()*t),g=Math.floor(h()*i);if(r==="needles"){const _=h()<.5?1:-1;for(let E=0;E<3;E++)f(x+E*_,g+(E>>1),h()<.5?s.BODY2:s.ACCENT)}else if(["grass","lawn","tallgrass","plants","nettles","clover","flowers","bluebells","heather"].includes(r)){const _=r==="tallgrass"?4:r==="lawn"?1:2;for(let E=0;E<_;E++)f(x,g-E,E===_-1?s.LEAF2:s.LEAF);(r==="flowers"||r==="bluebells"||r==="heather"||r==="clover")&&h()<.5&&f(x+1,g-_,s.FLOWER)}else if(["stony","pebbles","scree","slate","stone","roots"].includes(r)){if(f(x,g,s.ACCENT),h()<.6&&f(x+1,g,s.ACCENT),h()<.4&&f(x,g+1,s.BODY2),r==="roots"&&h()<.5)for(let _=0;_<5;_++)f(x+_,g+(_>2?1:0),s.TRUNK)}else if(r==="leaves")f(x,g,s.FLOWER),f(x+1,g,s.FLOWER),h()<.5&&f(x,g+1,s.ACCENT);else if(r==="mud"||r==="earth")for(let _=0;_<3;_++)f(x+_,g,s.BODY2)}const p={flowers:xe(.13,.6,.95),bluebells:[90,110,230],heather:[180,90,170],clover:[240,235,240],leaves:xe(a+.02,.65,.6)}[r]||xe(a,.3,.6),m={[s.BODY]:xe(a,o*e.sat,l),[s.BODY2]:xe(a+.02,o*e.sat*1.1,l*.78),[s.BELLY]:xe(a-.02,o*e.sat*.9,Math.min(1,l*1.15)),[s.ACCENT]:r==="needles"?xe(.07,.5,.5):xe(.1,.08,.62),[s.FLOWER]:p,[s.LEAF]:xe(n.leaf,.55*e.sat,.45),[s.LEAF2]:xe(n.leaf-.03,.5*e.sat,.62),[s.TRUNK]:xe(e.trunkHue,.4,.3)};return{sp:u,colours:m}}const ar=n=>({[s.ACCENT]:xe(.1,.06,.6),[s.BODY2]:xe(.62,.08,.4),[s.BELLY]:xe(.1,.05,.78),[s.LEAF]:xe(.27,.5,.45),[s.LEAF2]:xe(.25,.45,.62),[s.NOSE]:[20,16,24]});function zr(n,e,t,i,r,a,o){const l=[];for(let u=0;u<8;u++){const c=u/8*Math.PI*2,h=1+(a()-.5)*.3;l.push([e[0]+Math.cos(c)*t*h,e[1]+Math.sin(c)*i*h*(Math.sin(c)>0?.5:1)])}n.shape(l,s.ACCENT,{group:5,line:!0,round:r.round}),n.mark([ft(e,[-t,i*.1]),ft(e,[t,i*.1]),ft(e,[t,i]),ft(e,[-t,i])],s.BODY2,[s.ACCENT]),n.mark([ft(e,[-t*.6,-i*.8]),ft(e,[t*.1,-i*1.1]),ft(e,[t*.3,-i*.5]),ft(e,[-t*.3,-i*.3])],s.BELLY,[s.ACCENT]),o&&n.mark(Ts([ft(e,[-t*1.1,-i*.55]),ft(e,[0,-i*1.3]),ft(e,[t*1.1,-i*.5]),ft(e,[t*.6,-i*.2]),ft(e,[-t*.6,-i*.2])],0,3,3,i*.15,1),s.LEAF,[s.ACCENT,s.BELLY,s.BODY2])}function us(n,e,t,i,r,a){const o={[s.LEAF]:xe(t.leaf,.6*i.sat,.55),[s.LEAF2]:xe(t.leaf-.05,.55*i.sat,.78),[s.LEAF3]:xe(t.leaf+.03,.66*i.sat,.36)},l={[s.TRUNK]:xe(i.trunkHue,.45*i.sat,.34),[s.BARKD]:xe(i.trunkHue+.03,.5*i.sat,.17),[s.BARKL]:xe(i.trunkHue-.01,.38*i.sat,.5),[s.BELLY]:xe(i.trunkHue+.02,.3,.7)},u={[s.MAGIC]:[60,110,150],[s.MAGIC2]:[150,200,220],[s.BODY2]:[35,70,100]};if(n==="tree"){const M=Cu(e.type).fn,x={...i,leafHue:t.leaf+(e.dark?.05:0),gnarl:e.gnarl??i.gnarl,treeBare:e.bare,treeTrunks:e.trunks,treeLean:e.lean,treeThick:e.thick,treeThin:e.thin,treeHollow:e.hollow,treeWebs:e.webs},g=M(r,x,i.treeSize*a*(e.scale||1)*ce(r,.9,1.1)),_=Rl(r,x,M);return e.dark&&(_[s.LEAF]=_[s.LEAF3],_[s.LEAF3]=xe(t.leaf+.05,.7,.22)),_[s.NOSE]=[20,16,24],_[s.WEB]=[225,225,232],{sp:g.sp,colours:_}}if(n==="shrub"){const M=lf(r,{...i,leafHue:t.leaf,bushSize:i.bushSize*a,flowers:1});for(let x=0;x<M.sp.m.length;x++)M.sp.m[x]&&Ht(x,1,3)<(e.spiky?.18:.1)&&M.sp.m[x]!==s.TRUNK&&(M.sp.m[x]=s.FLOWER);return M.colours[s.FLOWER]=e.flower,M}const c=Math.round(48*a*(e.w||1)),h=Math.round(32*a),f=new Xt(c,h),d=c/2,p=h;let m={};if(n==="grass"||n==="reeds"||n==="fern"||n==="flowers"||n==="flowerbed"){const M=n==="flowerbed"?40:24,x=(n==="reeds"?e.tall?26:20:n==="fern"?14:10*(e.h||1))*a;n==="flowerbed"&&f.shape([[d-20*a,p-2],[d-18*a,p-6*a],[d+18*a,p-6*a],[d+20*a,p-2],[d+20*a,p],[d-20*a,p]],s.ACCENT,{group:2,line:!0});for(let g=0;g<M;g++){const _=d+ce(r,-16,16)*a,E=x*ce(r,.5,1),S=n==="fern"?ce(r,-6,6)*a:ce(r,-2,2)*a,R=p-1-(n==="flowerbed"?5*a:0);for(let A=0;A<E;A++){const D=A/E;f.px(_+S*D*D,R-A,D>.7?s.LEAF2:D<.3?s.LEAF3:s.LEAF,S*.05,-.3,.9),n==="fern"&&A%2&&f.px(_+S*D*D+(S>0?1:-1),R-A+1,s.LEAF2,0,-.3,.9)}if(n==="reeds"&&(e.cotton||r()<.5))for(let A=0;A<(e.cotton?2:3);A++)f.px(_+S,R-E-A,e.cotton?s.WEB:s.TRUNK,0,-.5,.85);(n==="flowers"||n==="flowerbed")&&r()<.7&&(f.px(_+S,R-E,s.FLOWER,0,-.5,.85),f.px(_+S+1,R-E,s.FLOWER,0,-.5,.85))}if(m={...o,[s.FLOWER]:n==="flowerbed"?Sl(r,[[230,80,120],[250,210,60],[150,110,230]]):xe(e.hue??.95,.6,.85),[s.TRUNK]:xe(.07,.5,.35),[s.WEB]:[240,240,235],[s.ACCENT]:xe(.08,.1,.55)},n==="flowerbed"){for(let g=0;g<f.m.length;g++)f.m[g]===s.FLOWER&&Ht(g,2,7)<.5&&(f.m[g]=s.BELLY);m[s.BELLY]=[250,245,240]}}else if(n==="stones"){for(let M=0;M<(e.big?3:6);M++)zr(f,[d+ce(r,-14,14)*a,p-(e.big?5:2.5)*a],(e.big?6:3)*a*ce(r,.7,1.2),(e.big?5:2.5)*a,i,r);m=ar()}else if(n==="boulder")zr(f,[d,p-(e.big?11:8)*a],(e.big?18:13)*a,(e.big?12:9)*a,i,r,e.moss),m={...ar(),...o,[s.ACCENT]:xe(.1,.06,.6)};else if(n==="henge")f.shape([[d-7*a,p],[d-8*a,p-18*a],[d-4*a,p-28*a],[d+5*a,p-27*a],[d+8*a,p-14*a],[d+7*a,p]],s.ACCENT,{group:5,line:!0,round:i.round}),f.mark([[d-9*a,p-30*a],[d+9*a,p-30*a],[d+9*a,p-22*a],[d-9*a,p-18*a]],s.LEAF,[s.ACCENT]),m={...ar(),...o};else if(n==="mound"){const M=(e.small?8:14)*a,x=(e.small?5:8)*a;f.shape(Ts([[d-M,p],[d-M*.6,p-x*.8],[d,p-x],[d+M*.6,p-x*.8],[d+M,p]],0,4,e.moss?3:1,(e.moss?1.5:.8)*a,1),e.moss?s.LEAF:s.TRUNK,{group:5,round:i.round}),f.mark([[d-M,p-x*.45],[d+M,p-x*.45],[d+M,p],[d-M,p]],e.moss?s.LEAF3:s.BARKD,[e.moss?s.LEAF:s.TRUNK]),m={...o,...l,[s.TRUNK]:xe(.07,.45,e.brown?.35:.3)}}else if(n==="stump"){const M=6*a;if(f.limb([[d,p,M*2.2],[d,p-8*a,M*1.6]],s.TRUNK,{group:5,round:i.round,cap:0,capEnd:0}),f.shape([[d-M*.8,p-8*a],[d,p-10*a-(e.gnawed?4*a:0)],[d+M*.8,p-8*a],[d,p-7*a]],s.BELLY,{group:6,round:i.round}),e.snag&&f.limb([[d+M*.4,p-8*a,2.5*a],[d+M*1.6,p-15*a,1.5*a]],s.TRUNK,{group:7,round:i.round}),e.grass)for(let x=0;x<20;x++){const g=d+ce(r,-14,14)*a,_=ce(r,6,13)*a;for(let E=0;E<_;E++)f.px(g,p-1-E,E>_*.6?s.LEAF2:s.LEAF,0,-.3,.9)}m={...o,...l}}else if(n==="log"){const M=(e.giant?46:e.branch?18:30)*a,x=(e.giant?14:e.branch?3:8)*a;if(f.limb([[d-M/2,p-x/2,x],[d+M/2,p-x/2-(e.branch?2*a:0),x*.9]],s.TRUNK,{group:5,round:i.round,cap:.3,capEnd:.3}),e.branch||f.shape([[d+M/2-x*.1,p-x],[d+M/2+x*.2,p-x/2],[d+M/2-x*.1,p],[d+M/2-x*.3,p-x/2]],s.BELLY,{group:6,round:i.round}),e.rot)for(let g=0;g<(e.giant?6:3);g++){const _=d+ce(r,-M/2,M/3);f.shape([[_-3*a,p-x*.9],[_,p-x-3*a],[_+3*a,p-x*.9]],s.FLOWER,{group:7,line:!0,round:i.round})}e.branch&&f.limb([[d,p-x,x*.7],[d+5*a,p-x-6*a,x*.4]],s.TRUNK,{group:6,round:i.round}),m={...l,[s.FLOWER]:[230,190,120]}}else if(n==="fungi"){for(let M=0;M<5;M++){const x=d+ce(r,-12,12)*a,g=ce(r,3,7)*a,_=ce(r,3,5)*a;f.limb([[x,p,1.6*a],[x,p-g,1.4*a]],s.BELLY,{group:5}),f.shape([[x-_,p-g],[x,p-g-_*.8],[x+_,p-g]],M%2?s.FLOWER:s.MAGIC,{group:6+M%2,line:!0,round:i.round})}m={[s.BELLY]:[225,215,195],[s.FLOWER]:[190,80,50],[s.MAGIC]:[120,230,200]}}else if(n==="cones"){for(let M=0;M<6;M++){const x=d+ce(r,-14,14)*a,g=p-2*a;f.ellipse(x,g,(e.acorn?1.6:2)*a,(e.acorn?2:2.8)*a,s.TRUNK,{round:i.round}),e.acorn?f.ellipse(x,g-1.6*a,1.8*a,1*a,s.BARKD,{round:i.round}):f.px(x,g-1,s.BARKL)}m=l}else if(n==="water"){const M=22*a*(e.w||1),x=6*a;f.shape([[d-M,p-x],[d-M*.3,p-x*1.5],[d+M*.6,p-x*1.2],[d+M,p-x*.5],[d+M*.4,p],[d-M*.7,p-x*.2]],s.MAGIC,{group:5,round:.2});for(let g=0;g<6;g++){const _=d+ce(r,-M*.6,M*.6),E=p-x*ce(r,.4,1.1);for(let S=0;S<3*a;S++)f.recolour(_+S,E,s.MAGIC2)}m=e.bog?{[s.MAGIC]:[60,70,50],[s.MAGIC2]:[120,130,90]}:u;for(let g=0;g<f.m.length;g++)f.m[g]===s.MAGIC?f.m[g]=s.BODY:f.m[g]===s.MAGIC2&&(f.m[g]=s.BELLY);m={[s.BODY]:m[s.MAGIC],[s.BELLY]:m[s.MAGIC2]}}else if(n==="bramble"||n==="hedge"){const M=22*a,x=(n==="hedge"?18:12)*a;for(let g=0;g<(n==="hedge"?6:4);g++){const _=d+ce(r,-M*.8,M*.8),E=p-x*ce(r,.4,.7);f.ellipse(_,E,ce(r,6,9)*a,x*.45,n==="hedge"?s.LEAF3:s.LEAF,{round:i.round,density:e.bare?.5:.95,noise:.5,seed:g})}for(let g=0;g<8;g++){let E=d+ce(r,-M,M),S=p;for(let R=0;R<x*1.2;R++)E+=Math.sin(R*.3+g)*.8,S-=.8,f.px(E,S,s.TRUNK,0,-.3,.9)}if(n==="hedge"||e.berries||n==="bramble")for(let g=0;g<f.m.length;g++)f.m[g]&&f.m[g]!==s.TRUNK&&Ht(g,5,9)<.05&&(f.m[g]=s.FLOWER);m={...o,...l,[s.FLOWER]:n==="hedge"?[210,30,40]:[70,30,70]}}else if(n==="wall"){const M=22*a,x=12*a;f.shape([[d-M,p],[d-M,p-x],[d+M,p-x],[d+M,p]],s.ACCENT,{group:5,line:!0,depth:2}),f.shape([[d-M-1,p-x],[d-M-1,p-x-2*a],[d+M+1,p-x-2*a],[d+M+1,p-x]],s.BELLY,{group:6,line:!0,depth:2}),f.shape([[d+M-6*a,p-x-2*a],[d+M-6*a,p-x-7*a],[d+M,p-x-7*a],[d+M,p-x-2*a]],s.ACCENT,{group:7,line:!0,depth:2}),f.ellipse(d+M-3*a,p-x-9*a,3*a,2.5*a,s.BELLY,{round:i.round});for(let g=p-x+3*a;g<p;g+=4*a)for(let _=d-M;_<d+M;_++)f.recolour(_,g,s.BODY2);m=ar()}else if(n==="rockwall"){for(let M=0;M<5;M++)zr(f,[d+(M-2)*9*a,p-ce(r,8,14)*a],8*a,10*a,i,r,e.moss);m={...ar(),...o}}else if(n==="stalagmite"){for(let M=0;M<4;M++){const x=d+ce(r,-14,14)*a,g=ce(r,5,11)*a;f.shape([[x-3*a,p],[x-1*a,p-g],[x+1*a,p-g],[x+3*a,p]],s.ACCENT,{group:5,line:!0,round:i.round})}m=ar()}else if(n==="web"){const M=[d,p-14*a],x=11*a;for(let g=0;g<8;g++){const _=g/8*Math.PI*2;for(let E=0;E<x;E++)f.px(M[0]+Math.cos(_)*E,M[1]+Math.sin(_)*E,s.WEB,0,0,1)}for(let g=3*a;g<x;g+=3*a)for(let _=0;_<Math.PI*2;_+=.05)f.px(M[0]+Math.cos(_)*g,M[1]+Math.sin(_)*g,s.WEB,0,0,1);m={[s.WEB]:[225,230,240]}}return{sp:f,colours:m}}function ff(n,e,t,i,r,a){if(e.three)return sd(n,t,i);if(n==="tree"||n==="log")return us(n,e,t,i,r,a);const o=Math.round(90*a),l=Math.round(70*a),u=new Xt(o,l),c=o/2,h=l;let f={...ar(),[s.LEAF]:xe(t.leaf,.55,.5),[s.LEAF2]:xe(t.leaf-.04,.5,.7),[s.TRUNK]:xe(i.trunkHue,.45,.34),[s.BARKD]:xe(i.trunkHue+.03,.5,.17),[s.MAGIC]:xe(i.magicHue,.6,1),[s.MAGIC2]:xe(i.magicHue,.2,1)};if(n==="shrine")u.shape([[c-16*a,h],[c-14*a,h-6*a],[c+14*a,h-6*a],[c+16*a,h]],s.ACCENT,{group:5,line:!0,depth:2}),u.shape([[c-9*a,h-6*a],[c-9*a,h-26*a],[c+9*a,h-26*a],[c+9*a,h-6*a]],s.ACCENT,{group:6,line:!0,depth:2}),u.shape([[c-5*a,h-10*a],[c-5*a,h-20*a],[c,h-23*a],[c+5*a,h-20*a],[c+5*a,h-10*a]],s.NOSE,{group:7}),u.shape([[c-13*a,h-26*a],[c,h-34*a],[c+13*a,h-26*a]],s.BODY2,{group:8,line:!0,depth:2}),u.ellipse(c,h-13*a,2.5*a,2.5*a,s.MAGIC2,{round:.5}),u.mark([[c-14*a,h-36*a],[c+2*a,h-36*a],[c-4*a,h-24*a],[c-14*a,h-24*a]],s.LEAF,[s.BODY2,s.ACCENT]);else if(n==="pavilion"){u.shape([[c-26*a,h],[c-26*a,h-4*a],[c+26*a,h-4*a],[c+26*a,h]],s.ACCENT,{group:5,line:!0,depth:2});for(const d of[-20,-7,7,20])u.limb([[c+d*a,h-4*a,4*a],[c+d*a,h-34*a,4*a]],d===-7||d===7?s.BODY2:s.BELLY,{group:6+(d>0?1:0),line:!0,cap:0,capEnd:0});u.shape([[c-28*a,h-34*a],[c-28*a,h-38*a],[c+28*a,h-38*a],[c+28*a,h-34*a]],s.ACCENT,{group:8,line:!0,depth:2}),u.shape([[c-24*a,h-38*a],[c-16*a,h-54*a],[c,h-60*a],[c+16*a,h-54*a],[c+24*a,h-38*a]],s.BELLY,{group:9,line:!0})}else if(n==="bridge"){const d=us("water",{w:1.8},t,i,r,a);for(let p=0;p<d.sp.m.length;p++){const m=p%d.sp.w,M=p/d.sp.w|0,x=Math.round(c-d.sp.w/2+m),g=h-d.sp.h+M;d.sp.m[p]&&u.inb(x,g)&&u.px(x,g,d.sp.m[p]===s.BODY?s.IRIS:s.PUPIL,0,-.42,.91)}u.limb([[c-34*a,h-6*a,9*a],[c+34*a,h-10*a,8*a]],s.TRUNK,{group:6,line:!0,cap:.3,capEnd:.3}),f[s.IRIS]=[60,110,150],f[s.PUPIL]=[150,200,220]}else if(n==="outcrop")for(const[d,p,m,M]of[[-18,14,16,13],[12,12,18,12],[-2,28,15,13],[16,34,9,9]])zr(u,[c+d*a,h-p*a],m*a,M*a,i,r,!0);else if(n==="cave"){for(const[d,p,m,M]of[[-26,16,16,15],[26,16,16,15],[0,40,30,18],[-12,30,14,12],[12,30,14,12]])zr(u,[c+d*a,h-p*a],m*a,M*a,i,r,p>30);u.shape([[c-15*a,h],[c-14*a,h-18*a],[c-4*a,h-28*a],[c+6*a,h-27*a],[c+14*a,h-16*a],[c+15*a,h]],s.NOSE,{group:9,line:!0})}else if(n==="dam"){const d=us("water",{w:1.9},t,i,r,a);for(let p=0;p<d.sp.m.length;p++){const m=p%d.sp.w,M=p/d.sp.w|0,x=Math.round(c-d.sp.w/2+m),g=h-d.sp.h+M-10*a;d.sp.m[p]&&u.inb(x,g)&&u.px(x,g,d.sp.m[p]===s.BODY?s.IRIS:s.PUPIL,0,-.42,.91)}for(let p=0;p<26;p++){const m=c+ce(r,-32,32)*a,M=h-ce(r,2,14)*a,x=ce(r,-.5,.5),g=ce(r,8,16)*a;u.limb([[m-Math.cos(x)*g/2,M-Math.sin(x)*g/2,2.6*a],[m+Math.cos(x)*g/2,M+Math.sin(x)*g/2,2*a]],p%3?s.TRUNK:s.BARKD,{group:6+p%2,line:!0})}f[s.IRIS]=[60,110,150],f[s.PUPIL]=[150,200,220]}else if(n==="waterfall"){for(const[d,p,m,M]of[[-22,30,18,30],[22,30,18,30],[0,56,20,12]])zr(u,[c+d*a,h-p*a],m*a,M*a,i,r,!0);for(let d=c-6*a;d<c+6*a;d++)for(let p=h-50*a;p<h-4*a;p++)u.px(d,p,Ht(d|0,p/3|0,4)<.3?s.PUPIL:s.IRIS,0,-.2,.98);u.shape([[c-18*a,h],[c-14*a,h-6*a],[c+14*a,h-6*a],[c+18*a,h]],s.IRIS,{group:10,round:.2}),f[s.IRIS]=[90,150,190],f[s.PUPIL]=[210,235,245]}return{sp:u,colours:f}}function pf(n,e,{K:t=2/(e.pixel||2),makeCanvas:i=xu}={}){const r=cf[n];if(!r)throw new Error(`no area type "${n}"`);const a=bl(n.split("").reduce((h,f)=>h*31+f.charCodeAt(0),7)>>>0),o=(h,f,d)=>({sp:Wr(h.sp,h.colours,e,"none",i),kind:f,text:d}),l=df(r,e),u=h=>(h||[]).map(([f,d])=>o(us(f,d,r,e,a,t),f,"")),c={def:r,floor:{sp:Wr(l.sp,l.colours,e,"none",i),kind:r.floor[0],text:r.text.floor},walls:u(r.wall),small:u(r.small),big:u(r.big),setPiece:null};if(c.walls.forEach(h=>h.text=r.text.wall),c.small.forEach(h=>h.text=r.text.small),c.big.forEach(h=>h.text=r.text.big),r.set){const h=ff(r.set[0],r.set[1],r,e,a,t);c.setPiece={...o(h,r.set[0],r.text.set),metres:h.metres,origin:h.origin}}return c}function mf(n,e){const t=new Map,i=new Map,r=(u,c,h)=>(u*2097152+(c+1048576))*2097152+(h+1048576),a=(u,c,h)=>{const f=r(u,c,h);let d=t.get(f);if(!d){const p=Math.pow(2,-u);d=[p*(c+It(c*7+u,h,n)),p*(h+It(c,h*13+u,n+1))],t.set(f,d)}return d},o=(u,c,h)=>{const f=Math.pow(2,-u),d=Math.floor(c/f),p=Math.floor(h/f);let m=d,M=p,x=1/0;for(let g=-2;g<=2;g++)for(let _=-2;_<=2;_++){const E=a(u,d+g,p+_),S=(E[0]-c)**2+(E[1]-h)**2;S<x&&(x=S,m=d+g,M=p+_)}return[m,M]},l=(u,c,h)=>{const f=r(u,c,h);let d=i.get(f);if(d)return d;if(u===0)d=[c,h];else{const p=a(u,c,h),m=o(u-1,p[0],p[1]);d=l(u-1,m[0],m[1])}return i.set(f,d),d};return{seed:n,depth:e,site:(u,c)=>a(0,u,c),partition(u,c){const h=o(e,u,c);return l(e,h[0],h[1])},centreness(u,c,h){const f=a(0,h[0],h[1]),d=Math.hypot(u-f[0],c-f[1]);let p=1/0;const m=Math.floor(u),M=Math.floor(c);for(let x=-2;x<=2;x++)for(let g=-2;g<=2;g++){const _=m+x,E=M+g;if(_===h[0]&&E===h[1])continue;const S=a(0,_,E);p=Math.min(p,Math.hypot(u-S[0],c-S[1]))}return Math.min(1,2*d/(d+p))},openness(u,c){let h=1/0,f=1/0;const d=Math.floor(u),p=Math.floor(c);for(let m=-2;m<=2;m++)for(let M=-2;M<=2;M++){const x=a(0,d+m,p+M),g=Math.hypot(u-x[0],c-x[1]);g<h?(f=h,h=g):g<f&&(f=g)}return Math.min(1,2*h/(h+f))}}}const gf=kh.types,fi=Aa.map(n=>({id:n.id,name:n.name,creature:n.creature,text:n.text,setPiece:n.set?n.text.set??"a set piece":"",hasWalls:!!n.wall?.length,floor:[n.floor[1],n.floor[2],n.floor[3]],treeDensity:gf[n.id]?.treeDensity??1})),Ur=(n,e)=>n+","+e;function xf(n){if(n==null||n.trim()==="")return null;const e=n.trim();if(/^\d{1,9}$/.test(e))return Number(e);let t=2166136261;for(let i=0;i<e.length;i++)t=Math.imul(t^e.charCodeAt(i),16777619);return(t>>>0)%1e9}function Mf(n,e,t,i){const r=new Map,a=(u,c)=>{if(u[0]===c[0]&&u[1]===c[1])return;const h=Ur(u[0],u[1]),f=Ur(c[0],c[1]);r.has(h)||r.set(h,new Set),r.has(f)||r.set(f,new Set),r.get(h).add(f),r.get(f).add(h)},o=(t-e)*i;let l=[];for(let u=0;u<=o;u++){const c=[];for(let h=0;h<=o;h++){const f=n.partition(e+h/i,e+u/i);c.push(f),h>0&&a(f,c[h-1]),u>0&&a(f,l[h])}l=c}return r}function _f(n,e){const t=e.mapAreas,i=2,r=e.areaSize*e.areaScale,a=fi.length,o=3,l=Math.max(0,Math.min(1,e.areaSizeVariance))*o*.3,u=(O,I)=>{const B=O/r,W=I/r;return[B+l*(ec(B/o,W/o,n+91)-.5)*2,W+l*(ec(B/o,W/o,n+92)-.5)*2]},c=(O,I)=>{let B=O*r,W=I*r;for(let $=0;$<30;$++){const[ae,q]=u(B,W);B+=(O-ae)*r,W+=(I-q)*r}return[B,W]},h=mf(n,e.borderLayers),f=-i,d=t+i,p=Mf(h,f,d,6),m=new Map,M=_a(n*5+1);for(let O=f;O<d;O++)for(let I=f;I<d;I++){const B=new Set;for(let ae=-2;ae<=2;ae++)for(let q=-2;q<=2;q++){const ee=m.get(Ur(I+q,O+ae));ee!==void 0&&B.add(ee)}for(const ae of p.get(Ur(I,O))??[]){const q=m.get(ae);q!==void 0&&B.add(q)}const W=[...Array(a).keys()].filter(ae=>!B.has(ae)),$=W.length?W:[...Array(a).keys()];m.set(Ur(I,O),$[Math.floor(M()*$.length)])}const x=(O,I)=>m.get(Ur(O,I))??Math.floor(It(O,I,n+17)*a),g=Math.floor(t/2),_=(O,I)=>{const B=h.site(O,I),W=h.partition(B[0],B[1]);return W[0]===O&&W[1]===I};let E=[g,g];for(const[O,I]of[[0,0],[1,0],[0,1],[-1,0],[0,-1],[1,1],[-1,1],[1,-1],[-1,-1]])if(_(g+O,g+I)){E=[g+O,g+I];break}const S=(O,I)=>{const B=h.site(O,I),W=c(B[0],B[1]);return{x:W[0],z:W[1]}},R=S(E[0],E[1]),A=(O,I)=>{const[B,W]=u(O,I),$=h.partition(B,W);return{cell:$,type:x($[0],$[1]),openness:h.openness(B,W)}},D=4.5,b=D*2.2,w=(O,I)=>{if(Math.hypot(O-R.x,I-R.z)<b)return 0;const[B,W]=u(O,I);return qr((h.openness(B,W)-e.clearingSize)/Math.max(.01,e.clearingFalloff))*e.treeDensity},L=(O,I)=>{const B=fi[x(O,I)];return B.setPiece&&It(O,I,n+61)<e.setPieceChance?B.setPiece:null},C=(O,I)=>Math.min(1,Math.hypot(O-E[0],I-E[1])/(t/2)),N=r*.5;return{seed:n,tuning:e,n:t,margin:i,areaSize:r,partition:h,centreCell:E,dancefloor:{x:R.x,z:R.z,radius:D},start:{x:R.x,z:R.z+2},bounds:{minX:N,maxX:t*r-N,minZ:N,maxZ:t*r-N},extent:{minX:f*r,maxX:d*r,minZ:f*r,maxZ:d*r},typeOf:x,areaAt:A,siteOf:S,treeWeight:w,neighbours:p,setPieceOf:L,remoteness:C}}function vf(n,e,t=.5){const i=n.tuning,r=hr(e,0,1),a=Math.round(ai(i.creaturesNear,i.creaturesFar,Math.pow(r,i.creatureCurve))+(t-.5)*2),o=Math.min(Math.max(0,a),Math.round(i.legendsFar*qr((r-i.legendsFrom)/Math.max(.01,1-i.legendsFrom))+(t-.5)*.8)),l=Math.round(Math.max(0,a-o)*i.youngShareFar*r);return{babies:Math.max(0,a-o-l),young:l,legends:o}}const bf=(n,e,t=0)=>(n.tuning.clearingSize+n.tuning.clearingFalloff*.3)*n.areaSize*.5*(e===2?.55:.8)*(1+t);function Sf(n){const e=[],t=n.tuning;let i=0;const[r,a]=n.centreCell;for(let o=0;o<n.n;o++)for(let l=0;l<n.n;l++){if(l===r&&o===a)continue;const u=_a(n.seed*7919+l*131+o*977+3),c=fi[n.typeOf(l,o)],h=n.siteOf(l,o),f=n.remoteness(l,o),d=vf(n,f,It(l,o,n.seed+43)),p=M=>{const x=bf(n,M,f),g=u()*Math.PI*2,_=Math.sqrt(u())*x,E=h.x+Math.cos(g)*_,S=h.z+Math.sin(g)*_;return{id:i++,species:c.creature,cell:[l,o],level:M,homeX:h.x,homeZ:h.z,range:x,x:E,z:S,tx:E,tz:S,rest:u()*3,speed:(M===2?t.legendSpeed:t.creatureSpeed)*(.7+u()*.6),facing:u()<.5?1:-1,moving:!1,walk:u(),rand:_a(n.seed*31+i*7+11)}};for(let M=0;M<d.babies;M++)e.push(p(0));for(let M=0;M<d.young;M++)e.push(p(1));const m=l===r+1&&o===a?Math.max(1,d.legends):d.legends;for(let M=0;M<m;M++)e.push(p(2))}return e}function Ef(n,e){if(n.rest>0){n.rest-=e,n.moving=!1;return}const t=n.tx-n.x,i=n.tz-n.z,r=Math.hypot(t,i);if(r<.05){const o=n.rand()*Math.PI*2,l=Math.sqrt(n.rand())*n.range;n.tx=n.homeX+Math.cos(o)*l,n.tz=n.homeZ+Math.sin(o)*l,n.rest=.8+n.rand()*3.5,n.moving=!1;return}const a=Math.min(r,n.speed*e);n.x+=t/r*a,n.z+=i/r*a,Math.abs(t)>.02&&(n.facing=t>0?1:-1),n.moving=!0,n.walk+=e*(n.level===2?1.5:4)}function yf(n,e,t,i,r){for(const a of n)Math.abs(a.homeX-e)<i&&Math.abs(a.homeZ-t)<i&&Ef(a,r)}const Lu=6,wf=4,hn=32;function Af(n){const e=n.tuning.camera.treetop.angleIn*Math.PI/180;return n.tuning.crownHeight/Math.sin(e)}function Tf(n,e,t){const{treeSpacingX:i,treeSpacingZ:r}=n.tuning,a=n.seed,o=[],l=Af(n),u=n.tuning.crownHalfWidth,c=Math.ceil(t*hn/r),h=Math.ceil((t+1)*hn/r);for(let f=c;f<h;f++){const d=f&1?.5:0,p=Math.ceil(e*hn/i-d),m=Math.ceil((e+1)*hn/i-d);for(let M=p;M<m;M++){const x=(M+d+(It(M,f,a+101)-.5)*.7)*i,g=(f+(It(M,f,a+102)-.5)*.7)*r,_=n.areaAt(x,g);It(M,f,a+103)>=n.treeWeight(x,g)*fi[_.type].treeDensity||n.treeWeight(x,g-l)===0||n.treeWeight(x-u,g-l)===0||n.treeWeight(x+u,g-l)===0||o.push({x,z:g,type:_.type,variant:Math.floor(It(M,f,a+104)*Lu),flip:It(M,f,a+105)<.5})}}return o}function Rf(n,e,t){const i=n.tuning.bushSpacing,r=n.seed,a=[],o=Math.ceil(t*hn/i),l=Math.ceil((t+1)*hn/i),u=Math.ceil(e*hn/i),c=Math.ceil((e+1)*hn/i);for(let h=o;h<l;h++)for(let f=u;f<c;f++){const d=(f+(It(f,h,r+201)-.5)*.9)*i,p=(h+(It(f,h,r+202)-.5)*.9)*i;It(f,h,r+203)>(.12+Math.min(1,n.treeWeight(d,p))*.3)*n.tuning.bushDensity||a.push({x:d,z:p,type:n.areaAt(d,p).type,variant:Math.floor(It(f,h,r+204)*wf),flip:It(f,h,r+205)<.5})}return a}function Cf(n,e,t){const i=n.tuning.wallSpacing,r=n.seed,a=[],o=Math.ceil(t*hn/i),l=Math.ceil((t+1)*hn/i),u=Math.ceil(e*hn/i),c=Math.ceil((e+1)*hn/i);for(let h=o;h<l;h++)for(let f=u;f<c;f++){if(It(f,h,r+303)>n.tuning.wallDensity)continue;const d=(f+(It(f,h,r+301)-.5)*.6)*i,p=(h+(It(f,h,r+302)-.5)*.6)*i,m=n.areaAt(d,p);m.openness<.82||!fi[m.type].hasWalls||a.push({x:d,z:p,type:m.type,variant:Math.floor(It(f,h,r+304)*4),flip:It(f,h,r+305)<.5})}return a}class Lf{constructor(e){this.map=e}map;trees=new Map;bushes=new Map;walls=new Map;chunks(e,t,i){const r=[];for(let a=Math.floor((t-i)/hn);a<=Math.floor((t+i)/hn);a++)for(let o=Math.floor((e-i)/hn);o<=Math.floor((e+i)/hn);o++)r.push([o,a]);return r}gather(e,t,i,r,a){e.size>600&&e.clear();const o=[];for(const[l,u]of this.chunks(i,r,a)){const c=l+","+u;let h=e.get(c);h||(h=t(l,u),e.set(c,h));for(const f of h)Math.abs(f.x-i)<=a&&Math.abs(f.z-r)<=a&&o.push(f)}return o}treesNear(e,t,i){return this.gather(this.trees,(r,a)=>Tf(this.map,r,a),e,t,i)}bushesNear(e,t,i){return this.gather(this.bushes,(r,a)=>Rf(this.map,r,a),e,t,i)}wallsNear(e,t,i){return this.gather(this.walls,(r,a)=>Cf(this.map,r,a),e,t,i)}setPiecesNear(e,t,i){const r=this.map,a=r.areaSize,o=[];for(let l=Math.floor((t-i)/a)-1;l<=Math.floor((t+i)/a)+1;l++)for(let u=Math.floor((e-i)/a)-1;u<=Math.floor((e+i)/a)+1;u++){if(u===r.centreCell[0]&&l===r.centreCell[1]||!r.setPieceOf(u,l))continue;const c=r.siteOf(u,l);Math.abs(c.x-e)<=i&&Math.abs(c.z-4-t)<=i&&o.push({x:c.x,z:c.z-4,type:r.typeOf(u,l),variant:0,flip:It(u,l,r.seed+71)<.5})}return o}}function Df(n,e){return{x:n,z:e,vx:0,vz:0,lift:0,mode:"ground",facing:1}}const Cl=(n,e)=>ai(e.groundHeight,e.treetopHeight,qr(n.lift)),zs=n=>qr(n.lift);function Pf(n,e,t,i,r){let{mode:a,lift:o}=n;e.toggleMode&&(a=a==="ground"||a==="descending"?"rising":"descending"),a==="rising"?(o+=t/Math.max(.001,i.riseTime),o>=1&&(o=1,a="treetop")):a==="descending"&&(o-=t/Math.max(.001,i.descendTime),o<=0&&(o=0,a="ground"));let l=e.moveX,u=e.moveZ;const c=Math.hypot(l,u);c>1&&(l/=c,u/=c);const h=ai(i.groundSpeed,i.treetopSpeed,qr(o)),f=1-Math.exp(-i.acceleration*t);let d=n.vx+(l*h-n.vx)*f,p=n.vz+(u*h-n.vz)*f,m=n.x+d*t,M=n.z+p*t;(m<r.minX||m>r.maxX)&&(m=hr(m,r.minX,r.maxX),d=0),(M<r.minZ||M>r.maxZ)&&(M=hr(M,r.minZ,r.maxZ),p=0);const x=d>.3?1:d<-.3?-1:n.facing;return{x:m,z:M,vx:d,vz:p,lift:o,mode:a,facing:x}}function If(n,e){const t=_f(n,e),i=Df(t.start.x,t.start.z);return{seed:n,tuning:e,map:t,forest:new Lf(t),creatures:Sf(t),clock:Fh(),witch:i,camera:Ph(e,i.x,Cl(i,e),i.z)}}function Nf(n,e,t){const i=Uh(n.clock,t);i!==0&&(n.witch=Pf(n.witch,e,i,n.tuning,n.map.bounds),n.camera=Ih(n.camera,e.zoom,{x:n.witch.x,y:Cl(n.witch,n.tuning),z:n.witch.z},{x:n.witch.vx,z:n.witch.vz},n.witch.lift,i,n.tuning),yf(n.creatures,n.witch.x,n.witch.z,n.tuning.creatureSimRadius,i))}const Of=n=>Nh(n.camera,n.camera.lift,n.tuning);function Du(n){const e=n.map.areaAt(n.witch.x,n.witch.z),t=n.map.setPieceOf(e.cell[0],e.cell[1]);return fi[e.type].name+(t?` (set piece: ${t})`:"")}const Ff="Witch tuning. Edit the numbers, push, and the playable link rebuilds. Distances are metres, times seconds, angles degrees. Keys starting with _ are notes.",Uf="The forest: mapAreas x mapAreas areas cut by the fractal partition. An area is areaSize x areaScale metres across on average (areaScale 1.4 doubles the ground of the first 28 m areas; push it for bigger). areaSizeVariance (0-1) makes areas vary in size, some small, some large. borderLayers sets how wiggly borders are.",Bf=20,kf=28,zf=1.4,Hf=.7,Gf=4,Wf="treeDensity (0-1): the chance of a tree on each spot outside the clearings; clearingSize (0-1): how far out from an area's centre the ground stays fully open; clearingFalloff (0-1): over how much of the way to the border trees thicken, smoothly, to full density; trees sit on a staggered grid treeSpacingX by treeSpacingZ metres, so no two crowns pile up. A tree is left out where its crown (crownHalfWidth either side, crownHeight up) would hang over a clearing seen from the treetops.",Vf=.9,Yf=.1,Xf=.5,Kf=1,qf=5,Zf=3,$f=4.5,Jf=5,Qf=3.4,jf=4,e0=.6,t0="Speeds per mode, and how long rising and descending take.",n0=14,i0=32,r0=10,a0=.7,s0=.55,o0=1.4,l0=11,c0="Near-isometric on the ground, after Transistor; lower over the treetops, looking toward the horizon to feel the speed. The camera follows the witch on a soft spring (follow: its stiffness; higher keeps her closer to the middle) and looks a little ahead of her: lookAhead seconds of flight, at most lookAheadMax metres, eased in at lookAheadEase. zoomEase and liftEase: how softly zoom and rising change the angle and distance. a narrow field of view (fov, degrees) seen from far off, so there is little perspective. Each mode has its own angle (degrees below horizontal) and distance from the witch, at zoomed-in and zoomed-out. Zoom moves between them in zoomSteps steps.",u0={fov:20,ground:{angleIn:38,angleOut:46,distanceIn:42,distanceOut:84},treetop:{angleIn:32,angleOut:36,distanceIn:70,distanceOut:120},lookAhead:.1,lookAheadMax:3,lookAheadEase:1.5,zoomEase:5,liftEase:8,zoomSteps:4,startZoom:1,follow:8},h0="Everything the camera can see is drawn, plus viewMargin metres round the view, so nothing appears or vanishes on screen. haze: the twilight haze fades the forest from near to far metres from the witch; nothing is drawn beyond far. pixelSize: screen pixels per art pixel. glowReach: metres the witch's light reaches. spriteTilt: 1 = sprites face the camera fully, 0 = stand upright.",d0=3,f0=8,p0=1,m0=1,g0=16,x0=12,M0={near:90,far:220},_0="bloom: a gentle glow round bright things (strength 0 or on false turns it off; threshold: how bright a pixel must be to glow). tiltShift: blurs the top and bottom of the screen so the forest looks like a miniature. strength: the blur at the screen's edges, in pixels; band: the height of the sharp band (0-1 of the screen); centre: where it sits (0 top, 0.5 middle, 1 bottom); where: 'before' blurs at the low resolution, before the pixels are scaled up, 'after' blurs the scaled-up image. Add ?tilt=before, ?tilt=after or ?tilt=off to the link to compare.",v0="shadows: a flat shadow under every tree (cast away from the moon), bush and creature. canopyShadow: a dappled shadow from the canopy overhead (height in metres), thinner in clearings, drifting with the wind. mist: a low drifting mist (height in metres above the ground). Each has on and strength.",b0={on:!0,strength:.7},S0={on:!0,strength:.45,height:8,cover:.55,wind:.6},E0={on:!0,strength:.12,height:3,wind:.8},y0={on:!0,strength:.7,threshold:.55},w0={on:!0,where:"before",strength:3,band:.4,centre:.55},A0="Creatures grow more numerous and older with an area's distance from home (0 at the dancefloor, 1 at the map's edge): creaturesNear in the areas round home, creaturesFar at the edge (creatureCurve shapes the rise), youngShareFar of them young at the edge, and legendsFar legends from legendsFrom outward. Only creatures within creatureSimRadius metres of the witch move.",T0=2,R0=20,C0=1.3,L0=.5,D0=2,P0=.55,I0=110,N0=.6,O0="setPieceChance: the share of areas, among the types that have a set piece, that show theirs. Wall objects (an area type's edges: puddles, henges, hedges) stand where areas meet, one per wallSpacing metres with chance wallDensity; they do not block movement.",F0=.25,U0=.35,B0={_readme:Ff,_map:Uf,mapAreas:Bf,areaSize:kf,areaScale:zf,areaSizeVariance:Hf,borderLayers:Gf,_trees:Wf,treeDensity:Vf,clearingSize:Yf,clearingFalloff:Xf,bushDensity:Kf,treeSpacingX:qf,treeSpacingZ:Zf,crownHalfWidth:$f,crownHeight:Jf,bushSpacing:Qf,wallSpacing:jf,wallDensity:e0,_witch:t0,groundSpeed:n0,treetopSpeed:i0,acceleration:r0,riseTime:a0,descendTime:s0,groundHeight:o0,treetopHeight:l0,_camera:c0,camera:u0,_look:h0,pixelSize:d0,glowReach:f0,glowHeight:p0,spriteTilt:m0,artPixelsPerMetre:g0,viewMargin:x0,haze:M0,_post:_0,_shadows:v0,shadows:b0,canopyShadow:S0,mist:E0,bloom:y0,tiltShift:w0,_creatures:A0,creaturesNear:T0,creaturesFar:R0,creatureCurve:C0,youngShareFar:L0,legendsFar:D0,legendsFrom:P0,creatureSimRadius:I0,creatureSpeed:N0,_setPieces:O0,setPieceChance:F0,legendSpeed:U0},_r=B0;class k0{keys=new Set;pressed=new Set;padPrev=[];touch={x:0,y:0,toggle:!1,zoom:0,debug:!1};onAny=null;constructor(e=window){e.addEventListener("keydown",t=>{if(t.repeat){this.isGameKey(t.code)&&t.preventDefault();return}this.keys.add(t.code),this.isGameKey(t.code)&&t.preventDefault(),this.onAny?.()||this.pressed.add(t.code)}),e.addEventListener("keyup",t=>this.keys.delete(t.code)),e.addEventListener("blur",()=>this.keys.clear())}isGameKey(e){return/^(Arrow|Space$|Key[WASDQE]$|Minus$|Equal$|NumpadAdd$|NumpadSubtract$|Backquote$)/.test(e)}clearPresses(){this.pressed.clear();const e=this.touch;e.toggle=!1,e.zoom=0,e.debug=!1}read(){const e=f=>this.keys.has(f)?1:0,t=f=>this.pressed.has(f);let i=e("KeyD")+e("ArrowRight")-e("KeyA")-e("ArrowLeft"),r=e("KeyS")+e("ArrowDown")-e("KeyW")-e("ArrowUp"),a=t("Space"),o=(t("KeyQ")||t("Minus")||t("NumpadSubtract")?1:0)-(t("KeyE")||t("Equal")||t("NumpadAdd")?1:0),l=t("Backquote");this.pressed.clear();const u=typeof navigator<"u"&&navigator.getGamepads?navigator.getGamepads():[];for(const f of u){if(!f)continue;const d=S=>!!f.buttons[S]?.pressed,m=f.buttons.some((S,R)=>S.pressed&&!this.padPrev[R])&&!!this.onAny?.(),M=S=>!m&&d(S)&&!this.padPrev[S];let x=f.axes[0]??0,g=f.axes[1]??0;const _=Math.hypot(x,g),E=.18;if(_<E)x=0,g=0;else{const S=(Math.min(1,_)-E)/(1-E)/_;x*=S,g*=S}x+=(d(15)?1:0)-(d(14)?1:0),g+=(d(13)?1:0)-(d(12)?1:0),i+=x,r+=g,M(0)&&(a=!0),(M(4)||M(6))&&(o+=1),(M(5)||M(7))&&(o-=1),M(8)&&(l=!0),this.padPrev=f.buttons.map(S=>S.pressed);break}const c=this.touch;i+=c.x,r+=c.y,c.toggle&&(a=!0),o+=c.zoom,c.debug&&(l=!0),c.toggle=!1,c.zoom=0,c.debug=!1;const h=Math.hypot(i,r);return h>1&&(i/=h,r/=h),{moveX:i,moveZ:r,toggleMode:a,zoom:Math.sign(o),debug:l}}}const Ll="186",z0=0,cc=1,H0=2,hs=1,G0=2,fa=3,dr=0,yn=1,Ai=2,Ci=0,Ma=1,uc=2,hc=3,dc=4,W0=5,Nr=100,V0=101,Y0=102,X0=103,K0=104,q0=200,Z0=201,$0=202,J0=203,Pu=204,Iu=205,Q0=206,j0=207,ep=208,tp=209,np=210,ip=211,rp=212,ap=213,sp=214,Ro=0,Co=1,Lo=2,va=3,Do=4,Po=5,Io=6,No=7,Nu=0,op=1,lp=2,hi=0,Ou=1,Fu=2,Uu=3,Bu=4,ku=5,zu=6,Hu=7,Gu=300,fr=301,Yr=302,Hs=303,Gs=304,Cs=306,Oo=1e3,Ti=1001,Fo=1002,$t=1003,cp=1004,Oa=1005,Yt=1006,Ws=1007,or=1008,Rn=1009,Wu=1010,Vu=1011,ba=1012,Dl=1013,pi=1014,ci=1015,mi=1016,Pl=1017,Il=1018,Sa=1020,Yu=35902,Xu=35899,Ku=1021,qu=1022,Fn=1023,Ii=1026,lr=1027,Zu=1028,Nl=1029,pr=1030,Ol=1031,Fl=1033,ds=33776,fs=33777,ps=33778,ms=33779,Uo=35840,Bo=35841,ko=35842,zo=35843,Ho=36196,Go=37492,Wo=37496,Vo=37488,Yo=37489,vs=37490,Xo=37491,Ko=37808,qo=37809,Zo=37810,$o=37811,Jo=37812,Qo=37813,jo=37814,el=37815,tl=37816,nl=37817,il=37818,rl=37819,al=37820,sl=37821,ol=36492,ll=36494,cl=36495,ul=36283,hl=36284,bs=36285,dl=36286,up=3200,fc=0,hp=1,Vn="",In="srgb",Ea="srgb-linear",Ss="linear",bt="srgb",Vs=7680,dp=519,fp=512,pp=513,mp=514,Ul=515,gp=516,xp=517,Bl=518,Mp=519,_p=35044,$u=35048,pc="300 es",ui=2e3,Es=2001;function vp(n){for(let e=n.length-1;e>=0;--e)if(n[e]>=65535)return!0;return!1}function ys(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function bp(){const n=ys("canvas");return n.style.display="block",n}const mc={};function gc(...n){const e="THREE."+n.shift();console.log(e,...n)}function Ju(n){const e=n[0];if(typeof e=="string"&&e.startsWith("TSL:")){const t=n[1];t&&t.isStackTrace?n[0]+=" "+t.getLocation():n[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return n}function Ve(...n){n=Ju(n);const e="THREE."+n.shift();{const t=n[0];t&&t.isStackTrace?console.warn(t.getError(e)):console.warn(e,...n)}}function ht(...n){n=Ju(n);const e="THREE."+n.shift();{const t=n[0];t&&t.isStackTrace?console.error(t.getError(e)):console.error(e,...n)}}function Hr(...n){const e=n.join(" ");e in mc||(mc[e]=!0,Ve(...n))}function Sp(n,e,t){return new Promise(function(i,r){function a(){switch(n.clientWaitSync(e,n.SYNC_FLUSH_COMMANDS_BIT,0)){case n.WAIT_FAILED:r();break;case n.TIMEOUT_EXPIRED:setTimeout(a,t);break;default:i()}}setTimeout(a,t)})}const Ep={[Ro]:Co,[Lo]:Io,[Do]:No,[va]:Po,[Co]:Ro,[Io]:Lo,[No]:Do,[Po]:va};class gr{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(t)===-1&&i[e].push(t)}hasEventListener(e,t){const i=this._listeners;return i===void 0?!1:i[e]!==void 0&&i[e].indexOf(t)!==-1}removeEventListener(e,t){const i=this._listeners;if(i===void 0)return;const r=i[e];if(r!==void 0){const a=r.indexOf(t);a!==-1&&r.splice(a,1)}}dispatchEvent(e){const t=this._listeners;if(t===void 0)return;const i=t[e.type];if(i!==void 0){e.target=this;const r=i.slice(0);for(let a=0,o=r.length;a<o;a++)r[a].call(this,e);e.target=null}}}const ln=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Ys=Math.PI/180,fl=180/Math.PI;function Ta(){const n=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(ln[n&255]+ln[n>>8&255]+ln[n>>16&255]+ln[n>>24&255]+"-"+ln[e&255]+ln[e>>8&255]+"-"+ln[e>>16&15|64]+ln[e>>24&255]+"-"+ln[t&63|128]+ln[t>>8&255]+"-"+ln[t>>16&255]+ln[t>>24&255]+ln[i&255]+ln[i>>8&255]+ln[i>>16&255]+ln[i>>24&255]).toLowerCase()}function lt(n,e,t){return Math.max(e,Math.min(t,n))}function yp(n,e){return(n%e+e)%e}function Xs(n,e,t){return(1-t)*n+t*e}function na(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:case Uint8ClampedArray:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function _n(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:case Uint8ClampedArray:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}class Xe{static{Xe.prototype.isVector2=!0}constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("THREE.Vector2: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,i=this.y,r=e.elements;return this.x=r[0]*t+r[3]*i+r[6],this.y=r[1]*t+r[4]*i+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=lt(this.x,e.x,t.x),this.y=lt(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=lt(this.x,e,t),this.y=lt(this.y,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(lt(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(lt(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y;return t*t+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const i=Math.cos(t),r=Math.sin(t),a=this.x-e.x,o=this.y-e.y;return this.x=a*i-o*r+e.x,this.y=a*r+o*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class $r{constructor(e=0,t=0,i=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=i,this._w=r}static slerpFlat(e,t,i,r,a,o,l){let u=i[r+0],c=i[r+1],h=i[r+2],f=i[r+3],d=a[o+0],p=a[o+1],m=a[o+2],M=a[o+3];if(f!==M||u!==d||c!==p||h!==m){let x=u*d+c*p+h*m+f*M;x<0&&(d=-d,p=-p,m=-m,M=-M,x=-x);let g=1-l;if(x<.9995){const _=Math.acos(x),E=Math.sin(_);g=Math.sin(g*_)/E,l=Math.sin(l*_)/E,u=u*g+d*l,c=c*g+p*l,h=h*g+m*l,f=f*g+M*l}else{u=u*g+d*l,c=c*g+p*l,h=h*g+m*l,f=f*g+M*l;const _=1/Math.sqrt(u*u+c*c+h*h+f*f);u*=_,c*=_,h*=_,f*=_}}e[t]=u,e[t+1]=c,e[t+2]=h,e[t+3]=f}static multiplyQuaternionsFlat(e,t,i,r,a,o){const l=i[r],u=i[r+1],c=i[r+2],h=i[r+3],f=a[o],d=a[o+1],p=a[o+2],m=a[o+3];return e[t]=l*m+h*f+u*p-c*d,e[t+1]=u*m+h*d+c*f-l*p,e[t+2]=c*m+h*p+l*d-u*f,e[t+3]=h*m-l*f-u*d-c*p,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,i,r){return this._x=e,this._y=t,this._z=i,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const i=e._x,r=e._y,a=e._z,o=e._order,l=Math.cos,u=Math.sin,c=l(i/2),h=l(r/2),f=l(a/2),d=u(i/2),p=u(r/2),m=u(a/2);switch(o){case"XYZ":this._x=d*h*f+c*p*m,this._y=c*p*f-d*h*m,this._z=c*h*m+d*p*f,this._w=c*h*f-d*p*m;break;case"YXZ":this._x=d*h*f+c*p*m,this._y=c*p*f-d*h*m,this._z=c*h*m-d*p*f,this._w=c*h*f+d*p*m;break;case"ZXY":this._x=d*h*f-c*p*m,this._y=c*p*f+d*h*m,this._z=c*h*m+d*p*f,this._w=c*h*f-d*p*m;break;case"ZYX":this._x=d*h*f-c*p*m,this._y=c*p*f+d*h*m,this._z=c*h*m-d*p*f,this._w=c*h*f+d*p*m;break;case"YZX":this._x=d*h*f+c*p*m,this._y=c*p*f+d*h*m,this._z=c*h*m-d*p*f,this._w=c*h*f-d*p*m;break;case"XZY":this._x=d*h*f-c*p*m,this._y=c*p*f-d*h*m,this._z=c*h*m+d*p*f,this._w=c*h*f+d*p*m;break;default:Ve("Quaternion: .setFromEuler() encountered an unknown order: "+o)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const i=t/2,r=Math.sin(i);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,i=t[0],r=t[4],a=t[8],o=t[1],l=t[5],u=t[9],c=t[2],h=t[6],f=t[10],d=i+l+f;if(d>0){const p=.5/Math.sqrt(d+1);this._w=.25/p,this._x=(h-u)*p,this._y=(a-c)*p,this._z=(o-r)*p}else if(i>l&&i>f){const p=2*Math.sqrt(1+i-l-f);this._w=(h-u)/p,this._x=.25*p,this._y=(r+o)/p,this._z=(a+c)/p}else if(l>f){const p=2*Math.sqrt(1+l-i-f);this._w=(a-c)/p,this._x=(r+o)/p,this._y=.25*p,this._z=(u+h)/p}else{const p=2*Math.sqrt(1+f-i-l);this._w=(o-r)/p,this._x=(a+c)/p,this._y=(u+h)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let i=e.dot(t)+1;return i<1e-8?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(lt(this.dot(e),-1,1)))}rotateTowards(e,t){const i=this.angleTo(e);if(i===0)return this;const r=Math.min(1,t/i);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const i=e._x,r=e._y,a=e._z,o=e._w,l=t._x,u=t._y,c=t._z,h=t._w;return this._x=i*h+o*l+r*c-a*u,this._y=r*h+o*u+a*l-i*c,this._z=a*h+o*c+i*u-r*l,this._w=o*h-i*l-r*u-a*c,this._onChangeCallback(),this}slerp(e,t){let i=e._x,r=e._y,a=e._z,o=e._w,l=this.dot(e);l<0&&(i=-i,r=-r,a=-a,o=-o,l=-l);let u=1-t;if(l<.9995){const c=Math.acos(l),h=Math.sin(c);u=Math.sin(u*c)/h,t=Math.sin(t*c)/h,this._x=this._x*u+i*t,this._y=this._y*u+r*t,this._z=this._z*u+a*t,this._w=this._w*u+o*t,this._onChangeCallback()}else this._x=this._x*u+i*t,this._y=this._y*u+r*t,this._z=this._z*u+a*t,this._w=this._w*u+o*t,this.normalize();return this}slerpQuaternions(e,t,i){return this.copy(e).slerp(t,i)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),i=Math.random(),r=Math.sqrt(1-i),a=Math.sqrt(i);return this.set(r*Math.sin(e),r*Math.cos(e),a*Math.sin(t),a*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class Y{static{Y.prototype.isVector3=!0}constructor(e=0,t=0,i=0){this.x=e,this.y=t,this.z=i}set(e,t,i){return i===void 0&&(i=this.z),this.x=e,this.y=t,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("THREE.Vector3: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(xc.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(xc.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,i=this.y,r=this.z,a=e.elements;return this.x=a[0]*t+a[3]*i+a[6]*r,this.y=a[1]*t+a[4]*i+a[7]*r,this.z=a[2]*t+a[5]*i+a[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,i=this.y,r=this.z,a=e.elements,o=1/(a[3]*t+a[7]*i+a[11]*r+a[15]);return this.x=(a[0]*t+a[4]*i+a[8]*r+a[12])*o,this.y=(a[1]*t+a[5]*i+a[9]*r+a[13])*o,this.z=(a[2]*t+a[6]*i+a[10]*r+a[14])*o,this}applyQuaternion(e){const t=this.x,i=this.y,r=this.z,a=e.x,o=e.y,l=e.z,u=e.w,c=2*(o*r-l*i),h=2*(l*t-a*r),f=2*(a*i-o*t);return this.x=t+u*c+o*f-l*h,this.y=i+u*h+l*c-a*f,this.z=r+u*f+a*h-o*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,i=this.y,r=this.z,a=e.elements;return this.x=a[0]*t+a[4]*i+a[8]*r,this.y=a[1]*t+a[5]*i+a[9]*r,this.z=a[2]*t+a[6]*i+a[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=lt(this.x,e.x,t.x),this.y=lt(this.y,e.y,t.y),this.z=lt(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=lt(this.x,e,t),this.y=lt(this.y,e,t),this.z=lt(this.z,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(lt(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const i=e.x,r=e.y,a=e.z,o=t.x,l=t.y,u=t.z;return this.x=r*u-a*l,this.y=a*o-i*u,this.z=i*l-r*o,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const i=e.dot(this)/t;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return Ks.copy(this).projectOnVector(e),this.sub(Ks)}reflect(e){return this.sub(Ks.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(lt(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y,r=this.z-e.z;return t*t+i*i+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,i){const r=Math.sin(t)*e;return this.x=r*Math.sin(i),this.y=Math.cos(t)*e,this.z=r*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,i){return this.x=e*Math.sin(t),this.y=i,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=i,this.z=r,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,i=Math.sqrt(1-t*t);return this.x=i*Math.cos(e),this.y=t,this.z=i*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Ks=new Y,xc=new $r;class Ye{static{Ye.prototype.isMatrix3=!0}constructor(e,t,i,r,a,o,l,u,c){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,i,r,a,o,l,u,c)}set(e,t,i,r,a,o,l,u,c){const h=this.elements;return h[0]=e,h[1]=r,h[2]=l,h[3]=t,h[4]=a,h[5]=u,h[6]=i,h[7]=o,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],this}extractBasis(e,t,i){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,r=t.elements,a=this.elements,o=i[0],l=i[3],u=i[6],c=i[1],h=i[4],f=i[7],d=i[2],p=i[5],m=i[8],M=r[0],x=r[3],g=r[6],_=r[1],E=r[4],S=r[7],R=r[2],A=r[5],D=r[8];return a[0]=o*M+l*_+u*R,a[3]=o*x+l*E+u*A,a[6]=o*g+l*S+u*D,a[1]=c*M+h*_+f*R,a[4]=c*x+h*E+f*A,a[7]=c*g+h*S+f*D,a[2]=d*M+p*_+m*R,a[5]=d*x+p*E+m*A,a[8]=d*g+p*S+m*D,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[1],r=e[2],a=e[3],o=e[4],l=e[5],u=e[6],c=e[7],h=e[8];return t*o*h-t*l*c-i*a*h+i*l*u+r*a*c-r*o*u}invert(){const e=this.elements,t=e[0],i=e[1],r=e[2],a=e[3],o=e[4],l=e[5],u=e[6],c=e[7],h=e[8],f=h*o-l*c,d=l*u-h*a,p=c*a-o*u,m=t*f+i*d+r*p;if(m===0)return this.set(0,0,0,0,0,0,0,0,0);const M=1/m;return e[0]=f*M,e[1]=(r*c-h*i)*M,e[2]=(l*i-r*o)*M,e[3]=d*M,e[4]=(h*t-r*u)*M,e[5]=(r*a-l*t)*M,e[6]=p*M,e[7]=(i*u-c*t)*M,e[8]=(o*t-i*a)*M,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,i,r,a,o,l){const u=Math.cos(a),c=Math.sin(a);return this.set(i*u,i*c,-i*(u*o+c*l)+o+e,-r*c,r*u,-r*(-c*o+u*l)+l+t,0,0,1),this}scale(e,t){return Hr("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(qs.makeScale(e,t)),this}rotate(e){return Hr("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(qs.makeRotation(-e)),this}translate(e,t){return Hr("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(qs.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,i,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,i=e.elements;for(let r=0;r<9;r++)if(t[r]!==i[r])return!1;return!0}fromArray(e,t=0){for(let i=0;i<9;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const qs=new Ye,Mc=new Ye().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),_c=new Ye().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function wp(){const n={enabled:!0,workingColorSpace:Ea,spaces:{},convert:function(r,a,o){return this.enabled===!1||a===o||!a||!o||(this.spaces[a].transfer===bt&&(r.r=Li(r.r),r.g=Li(r.g),r.b=Li(r.b)),this.spaces[a].primaries!==this.spaces[o].primaries&&(r.applyMatrix3(this.spaces[a].toXYZ),r.applyMatrix3(this.spaces[o].fromXYZ)),this.spaces[o].transfer===bt&&(r.r=Gr(r.r),r.g=Gr(r.g),r.b=Gr(r.b))),r},workingToColorSpace:function(r,a){return this.convert(r,this.workingColorSpace,a)},colorSpaceToWorking:function(r,a){return this.convert(r,a,this.workingColorSpace)},getPrimaries:function(r){return this.spaces[r].primaries},getTransfer:function(r){return r===Vn?Ss:this.spaces[r].transfer},getToneMappingMode:function(r){return this.spaces[r].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(r,a=this.workingColorSpace){return r.fromArray(this.spaces[a].luminanceCoefficients)},define:function(r){Object.assign(this.spaces,r)},_getMatrix:function(r,a,o){return r.copy(this.spaces[a].toXYZ).multiply(this.spaces[o].fromXYZ)},_getDrawingBufferColorSpace:function(r){return this.spaces[r].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(r=this.workingColorSpace){return this.spaces[r].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(r,a){return Hr("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),n.workingToColorSpace(r,a)},toWorkingColorSpace:function(r,a){return Hr("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),n.colorSpaceToWorking(r,a)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],i=[.3127,.329];return n.define({[Ea]:{primaries:e,whitePoint:i,transfer:Ss,toXYZ:Mc,fromXYZ:_c,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:In},outputColorSpaceConfig:{drawingBufferColorSpace:In}},[In]:{primaries:e,whitePoint:i,transfer:bt,toXYZ:Mc,fromXYZ:_c,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:In}}}),n}const ot=wp();function Li(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function Gr(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}let vr;class Ap{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let i;if(e instanceof HTMLCanvasElement)i=e;else{vr===void 0&&(vr=ys("canvas")),vr.width=e.width,vr.height=e.height;const r=vr.getContext("2d");e instanceof ImageData?r.putImageData(e,0,0):r.drawImage(e,0,0,e.width,e.height),i=vr}return i.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=ys("canvas");t.width=e.width,t.height=e.height;const i=t.getContext("2d");i.drawImage(e,0,0,e.width,e.height);const r=i.getImageData(0,0,e.width,e.height),a=r.data;for(let o=0;o<a.length;o++)a[o]=Li(a[o]/255)*255;return i.putImageData(r,0,0),t}else if(e.data){const t=e.data.slice(0);for(let i=0;i<t.length;i++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[i]=Math.floor(Li(t[i]/255)*255):t[i]=Li(t[i]);return{data:t,width:e.width,height:e.height}}else return Ve("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let Tp=0;class kl{constructor(e=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:Tp++}),this.uuid=Ta(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<"u"&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const i={uuid:this.uuid,url:""},r=this.data;if(r!==null){let a;if(Array.isArray(r)){a=[];for(let o=0,l=r.length;o<l;o++)r[o].isDataTexture?a.push(Zs(r[o].image)):a.push(Zs(r[o]))}else a=Zs(r);i.url=a}return t||(e.images[this.uuid]=i),i}}function Zs(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?Ap.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(Ve("Texture: Unable to serialize Texture."),{})}let Rp=0;const $s=new Y;class xn extends gr{constructor(e=xn.DEFAULT_IMAGE,t=xn.DEFAULT_MAPPING,i=Ti,r=Ti,a=Yt,o=or,l=Fn,u=Rn,c=xn.DEFAULT_ANISOTROPY,h=Vn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Rp++}),this.uuid=Ta(),this.name="",this.source=new kl(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=i,this.wrapT=r,this.magFilter=a,this.minFilter=o,this.anisotropy=c,this.format=l,this.internalFormat=null,this.type=u,this.offset=new Xe(0,0),this.repeat=new Xe(1,1),this.center=new Xe(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ye,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize($s).x}get height(){return this.source.getSize($s).y}get depth(){return this.source.getSize($s).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const t in e){const i=e[t];if(i===void 0){Ve(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}const r=this[t];if(r===void 0){Ve(`Texture.setValues(): property '${t}' does not exist.`);continue}r&&i&&r.isVector2&&i.isVector2||r&&i&&r.isVector3&&i.isVector3||r&&i&&r.isMatrix3&&i.isMatrix3?r.copy(i):this[t]=i}}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const i={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),t||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Gu)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Oo:e.x=e.x-Math.floor(e.x);break;case Ti:e.x=e.x<0?0:1;break;case Fo:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Oo:e.y=e.y-Math.floor(e.y);break;case Ti:e.y=e.y<0?0:1;break;case Fo:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}xn.DEFAULT_IMAGE=null;xn.DEFAULT_MAPPING=Gu;xn.DEFAULT_ANISOTROPY=1;class Ft{static{Ft.prototype.isVector4=!0}constructor(e=0,t=0,i=0,r=1){this.x=e,this.y=t,this.z=i,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,i,r){return this.x=e,this.y=t,this.z=i,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("THREE.Vector4: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,i=this.y,r=this.z,a=this.w,o=e.elements;return this.x=o[0]*t+o[4]*i+o[8]*r+o[12]*a,this.y=o[1]*t+o[5]*i+o[9]*r+o[13]*a,this.z=o[2]*t+o[6]*i+o[10]*r+o[14]*a,this.w=o[3]*t+o[7]*i+o[11]*r+o[15]*a,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,i,r,a;const u=e.elements,c=u[0],h=u[4],f=u[8],d=u[1],p=u[5],m=u[9],M=u[2],x=u[6],g=u[10];if(Math.abs(h-d)<.01&&Math.abs(f-M)<.01&&Math.abs(m-x)<.01){if(Math.abs(h+d)<.1&&Math.abs(f+M)<.1&&Math.abs(m+x)<.1&&Math.abs(c+p+g-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const E=(c+1)/2,S=(p+1)/2,R=(g+1)/2,A=(h+d)/4,D=(f+M)/4,b=(m+x)/4;return E>S&&E>R?E<.01?(i=0,r=.707106781,a=.707106781):(i=Math.sqrt(E),r=A/i,a=D/i):S>R?S<.01?(i=.707106781,r=0,a=.707106781):(r=Math.sqrt(S),i=A/r,a=b/r):R<.01?(i=.707106781,r=.707106781,a=0):(a=Math.sqrt(R),i=D/a,r=b/a),this.set(i,r,a,t),this}let _=Math.sqrt((x-m)*(x-m)+(f-M)*(f-M)+(d-h)*(d-h));return Math.abs(_)<.001&&(_=1),this.x=(x-m)/_,this.y=(f-M)/_,this.z=(d-h)/_,this.w=Math.acos((c+p+g-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=lt(this.x,e.x,t.x),this.y=lt(this.y,e.y,t.y),this.z=lt(this.z,e.z,t.z),this.w=lt(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=lt(this.x,e,t),this.y=lt(this.y,e,t),this.z=lt(this.z,e,t),this.w=lt(this.w,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(lt(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this.w=e.w+(t.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Cp extends gr{constructor(e=1,t=1,i={}){super(),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Yt,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},i),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=i.depth,this.scissor=new Ft(0,0,e,t),this.scissorTest=!1,this.viewport=new Ft(0,0,e,t),this.textures=[];const r={width:e,height:t,depth:i.depth},a=new xn(r),o=i.count;for(let l=0;l<o;l++)this.textures[l]=a.clone(),this.textures[l].isRenderTargetTexture=!0,this.textures[l].renderTarget=this;this._setTextureOptions(i),this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveColorBuffer=i.resolveColorBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this.storeMultisampledColorBuffer=i.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=i.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=i.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=i.depthTexture,this.samples=i.samples,this.multiview=i.multiview,this.useArrayDepthTexture=i.useArrayDepthTexture}_setTextureOptions(e={}){const t={minFilter:Yt,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let i=0;i<this.textures.length;i++)this.textures[i].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),e!==null&&e.renderTarget===null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,i=1){if(this.width!==e||this.height!==t||this.depth!==i){this.width=e,this.height=t,this.depth=i;for(let r=0,a=this.textures.length;r<a;r++)this.textures[r].image.width=e,this.textures[r].image.height=t,this.textures[r].image.depth=i,this.textures[r].isData3DTexture!==!0&&(this.textures[r].isArrayTexture=this.textures[r].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,i=e.textures.length;t<i;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;const r=Object.assign({},e.textures[t].image);this.textures[t].source=new kl(r)}if(this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveColorBuffer=e.resolveColorBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,this.storeMultisampledColorBuffer=e.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=e.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=e.storeMultisampledStencilBuffer,e.depthTexture!==null)if(e.depthTexture.renderTarget===e){const t=e.depthTexture.clone();t.renderTarget=null,this.depthTexture=t}else this.depthTexture=e.depthTexture;return this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Un extends Cp{constructor(e=1,t=1,i={}){super(e,t,i),this.isWebGLRenderTarget=!0}}class Qu extends xn{constructor(e=null,t=1,i=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:i,depth:r},this.magFilter=$t,this.minFilter=$t,this.wrapR=Ti,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class Lp extends xn{constructor(e=null,t=1,i=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:i,depth:r},this.magFilter=$t,this.minFilter=$t,this.wrapR=Ti,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}}class Wt{static{Wt.prototype.isMatrix4=!0}constructor(e,t,i,r,a,o,l,u,c,h,f,d,p,m,M,x){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,i,r,a,o,l,u,c,h,f,d,p,m,M,x)}set(e,t,i,r,a,o,l,u,c,h,f,d,p,m,M,x){const g=this.elements;return g[0]=e,g[4]=t,g[8]=i,g[12]=r,g[1]=a,g[5]=o,g[9]=l,g[13]=u,g[2]=c,g[6]=h,g[10]=f,g[14]=d,g[3]=p,g[7]=m,g[11]=M,g[15]=x,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Wt().fromArray(this.elements)}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],t[9]=i[9],t[10]=i[10],t[11]=i[11],t[12]=i[12],t[13]=i[13],t[14]=i[14],t[15]=i[15],this}copyPosition(e){const t=this.elements,i=e.elements;return t[12]=i[12],t[13]=i[13],t[14]=i[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,i){return this.determinantAffine()===0?(e.set(1,0,0),t.set(0,1,0),i.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this)}makeBasis(e,t,i){return this.set(e.x,t.x,i.x,0,e.y,t.y,i.y,0,e.z,t.z,i.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();const t=this.elements,i=e.elements,r=1/br.setFromMatrixColumn(e,0).length(),a=1/br.setFromMatrixColumn(e,1).length(),o=1/br.setFromMatrixColumn(e,2).length();return t[0]=i[0]*r,t[1]=i[1]*r,t[2]=i[2]*r,t[3]=0,t[4]=i[4]*a,t[5]=i[5]*a,t[6]=i[6]*a,t[7]=0,t[8]=i[8]*o,t[9]=i[9]*o,t[10]=i[10]*o,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,i=e.x,r=e.y,a=e.z,o=Math.cos(i),l=Math.sin(i),u=Math.cos(r),c=Math.sin(r),h=Math.cos(a),f=Math.sin(a);if(e.order==="XYZ"){const d=o*h,p=o*f,m=l*h,M=l*f;t[0]=u*h,t[4]=-u*f,t[8]=c,t[1]=p+m*c,t[5]=d-M*c,t[9]=-l*u,t[2]=M-d*c,t[6]=m+p*c,t[10]=o*u}else if(e.order==="YXZ"){const d=u*h,p=u*f,m=c*h,M=c*f;t[0]=d+M*l,t[4]=m*l-p,t[8]=o*c,t[1]=o*f,t[5]=o*h,t[9]=-l,t[2]=p*l-m,t[6]=M+d*l,t[10]=o*u}else if(e.order==="ZXY"){const d=u*h,p=u*f,m=c*h,M=c*f;t[0]=d-M*l,t[4]=-o*f,t[8]=m+p*l,t[1]=p+m*l,t[5]=o*h,t[9]=M-d*l,t[2]=-o*c,t[6]=l,t[10]=o*u}else if(e.order==="ZYX"){const d=o*h,p=o*f,m=l*h,M=l*f;t[0]=u*h,t[4]=m*c-p,t[8]=d*c+M,t[1]=u*f,t[5]=M*c+d,t[9]=p*c-m,t[2]=-c,t[6]=l*u,t[10]=o*u}else if(e.order==="YZX"){const d=o*u,p=o*c,m=l*u,M=l*c;t[0]=u*h,t[4]=M-d*f,t[8]=m*f+p,t[1]=f,t[5]=o*h,t[9]=-l*h,t[2]=-c*h,t[6]=p*f+m,t[10]=d-M*f}else if(e.order==="XZY"){const d=o*u,p=o*c,m=l*u,M=l*c;t[0]=u*h,t[4]=-f,t[8]=c*h,t[1]=d*f+M,t[5]=o*h,t[9]=p*f-m,t[2]=m*f-p,t[6]=l*h,t[10]=M*f+d}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Dp,e,Pp)}lookAt(e,t,i){const r=this.elements;return wn.subVectors(e,t),wn.lengthSq()===0&&(wn.z=1),wn.normalize(),zi.crossVectors(i,wn),zi.lengthSq()===0&&(Math.abs(i.z)===1?wn.x+=1e-4:wn.z+=1e-4,wn.normalize(),zi.crossVectors(i,wn)),zi.normalize(),Fa.crossVectors(wn,zi),r[0]=zi.x,r[4]=Fa.x,r[8]=wn.x,r[1]=zi.y,r[5]=Fa.y,r[9]=wn.y,r[2]=zi.z,r[6]=Fa.z,r[10]=wn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,r=t.elements,a=this.elements,o=i[0],l=i[4],u=i[8],c=i[12],h=i[1],f=i[5],d=i[9],p=i[13],m=i[2],M=i[6],x=i[10],g=i[14],_=i[3],E=i[7],S=i[11],R=i[15],A=r[0],D=r[4],b=r[8],w=r[12],L=r[1],C=r[5],N=r[9],O=r[13],I=r[2],B=r[6],W=r[10],$=r[14],ae=r[3],q=r[7],ee=r[11],F=r[15];return a[0]=o*A+l*L+u*I+c*ae,a[4]=o*D+l*C+u*B+c*q,a[8]=o*b+l*N+u*W+c*ee,a[12]=o*w+l*O+u*$+c*F,a[1]=h*A+f*L+d*I+p*ae,a[5]=h*D+f*C+d*B+p*q,a[9]=h*b+f*N+d*W+p*ee,a[13]=h*w+f*O+d*$+p*F,a[2]=m*A+M*L+x*I+g*ae,a[6]=m*D+M*C+x*B+g*q,a[10]=m*b+M*N+x*W+g*ee,a[14]=m*w+M*O+x*$+g*F,a[3]=_*A+E*L+S*I+R*ae,a[7]=_*D+E*C+S*B+R*q,a[11]=_*b+E*N+S*W+R*ee,a[15]=_*w+E*O+S*$+R*F,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[4],r=e[8],a=e[12],o=e[1],l=e[5],u=e[9],c=e[13],h=e[2],f=e[6],d=e[10],p=e[14],m=e[3],M=e[7],x=e[11],g=e[15],_=u*p-c*d,E=l*p-c*f,S=l*d-u*f,R=o*p-c*h,A=o*d-u*h,D=o*f-l*h;return t*(M*_-x*E+g*S)-i*(m*_-x*R+g*A)+r*(m*E-M*R+g*D)-a*(m*S-M*A+x*D)}determinantAffine(){const e=this.elements,t=e[0],i=e[4],r=e[8],a=e[1],o=e[5],l=e[9],u=e[2],c=e[6],h=e[10];return t*(o*h-l*c)-i*(a*h-l*u)+r*(a*c-o*u)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,i){const r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=i),this}invert(){const e=this.elements,t=e[0],i=e[1],r=e[2],a=e[3],o=e[4],l=e[5],u=e[6],c=e[7],h=e[8],f=e[9],d=e[10],p=e[11],m=e[12],M=e[13],x=e[14],g=e[15],_=t*l-i*o,E=t*u-r*o,S=t*c-a*o,R=i*u-r*l,A=i*c-a*l,D=r*c-a*u,b=h*M-f*m,w=h*x-d*m,L=h*g-p*m,C=f*x-d*M,N=f*g-p*M,O=d*g-p*x,I=_*O-E*N+S*C+R*L-A*w+D*b;if(I===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const B=1/I;return e[0]=(l*O-u*N+c*C)*B,e[1]=(r*N-i*O-a*C)*B,e[2]=(M*D-x*A+g*R)*B,e[3]=(d*A-f*D-p*R)*B,e[4]=(u*L-o*O-c*w)*B,e[5]=(t*O-r*L+a*w)*B,e[6]=(x*S-m*D-g*E)*B,e[7]=(h*D-d*S+p*E)*B,e[8]=(o*N-l*L+c*b)*B,e[9]=(i*L-t*N-a*b)*B,e[10]=(m*A-M*S+g*_)*B,e[11]=(f*S-h*A-p*_)*B,e[12]=(l*w-o*C-u*b)*B,e[13]=(t*C-i*w+r*b)*B,e[14]=(M*E-m*R-x*_)*B,e[15]=(h*R-f*E+d*_)*B,this}scale(e){const t=this.elements,i=e.x,r=e.y,a=e.z;return t[0]*=i,t[4]*=r,t[8]*=a,t[1]*=i,t[5]*=r,t[9]*=a,t[2]*=i,t[6]*=r,t[10]*=a,t[3]*=i,t[7]*=r,t[11]*=a,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,i,r))}makeTranslation(e,t,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,i,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,t,-i,0,0,i,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,0,i,0,0,1,0,0,-i,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,0,i,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const i=Math.cos(t),r=Math.sin(t),a=1-i,o=e.x,l=e.y,u=e.z,c=a*o,h=a*l;return this.set(c*o+i,c*l-r*u,c*u+r*l,0,c*l+r*u,h*l+i,h*u-r*o,0,c*u-r*l,h*u+r*o,a*u*u+i,0,0,0,0,1),this}makeScale(e,t,i){return this.set(e,0,0,0,0,t,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,t,i,r,a,o){return this.set(1,i,a,0,e,1,o,0,t,r,1,0,0,0,0,1),this}compose(e,t,i){const r=this.elements,a=t._x,o=t._y,l=t._z,u=t._w,c=a+a,h=o+o,f=l+l,d=a*c,p=a*h,m=a*f,M=o*h,x=o*f,g=l*f,_=u*c,E=u*h,S=u*f,R=i.x,A=i.y,D=i.z;return r[0]=(1-(M+g))*R,r[1]=(p+S)*R,r[2]=(m-E)*R,r[3]=0,r[4]=(p-S)*A,r[5]=(1-(d+g))*A,r[6]=(x+_)*A,r[7]=0,r[8]=(m+E)*D,r[9]=(x-_)*D,r[10]=(1-(d+M))*D,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,i){const r=this.elements;e.x=r[12],e.y=r[13],e.z=r[14];const a=this.determinantAffine();if(a===0)return i.set(1,1,1),t.identity(),this;let o=br.set(r[0],r[1],r[2]).length();const l=br.set(r[4],r[5],r[6]).length(),u=br.set(r[8],r[9],r[10]).length();a<0&&(o=-o),zn.copy(this);const c=1/o,h=1/l,f=1/u;return zn.elements[0]*=c,zn.elements[1]*=c,zn.elements[2]*=c,zn.elements[4]*=h,zn.elements[5]*=h,zn.elements[6]*=h,zn.elements[8]*=f,zn.elements[9]*=f,zn.elements[10]*=f,t.setFromRotationMatrix(zn),i.x=o,i.y=l,i.z=u,this}makePerspective(e,t,i,r,a,o,l=ui,u=!1){const c=this.elements,h=2*a/(t-e),f=2*a/(i-r),d=(t+e)/(t-e),p=(i+r)/(i-r);let m,M;if(u)m=a/(o-a),M=o*a/(o-a);else if(l===ui)m=-(o+a)/(o-a),M=-2*o*a/(o-a);else if(l===Es)m=-o/(o-a),M=-o*a/(o-a);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+l);return c[0]=h,c[4]=0,c[8]=d,c[12]=0,c[1]=0,c[5]=f,c[9]=p,c[13]=0,c[2]=0,c[6]=0,c[10]=m,c[14]=M,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,i,r,a,o,l=ui,u=!1){const c=this.elements,h=2/(t-e),f=2/(i-r),d=-(t+e)/(t-e),p=-(i+r)/(i-r);let m,M;if(u)m=1/(o-a),M=o/(o-a);else if(l===ui)m=-2/(o-a),M=-(o+a)/(o-a);else if(l===Es)m=-1/(o-a),M=-a/(o-a);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+l);return c[0]=h,c[4]=0,c[8]=0,c[12]=d,c[1]=0,c[5]=f,c[9]=0,c[13]=p,c[2]=0,c[6]=0,c[10]=m,c[14]=M,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){const t=this.elements,i=e.elements;for(let r=0;r<16;r++)if(t[r]!==i[r])return!1;return!0}fromArray(e,t=0){for(let i=0;i<16;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e[t+9]=i[9],e[t+10]=i[10],e[t+11]=i[11],e[t+12]=i[12],e[t+13]=i[13],e[t+14]=i[14],e[t+15]=i[15],e}}const br=new Y,zn=new Wt,Dp=new Y(0,0,0),Pp=new Y(1,1,1),zi=new Y,Fa=new Y,wn=new Y,vc=new Wt,bc=new $r;class mr{constructor(e=0,t=0,i=0,r=mr.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=i,this._order=r}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,i,r=this._order){return this._x=e,this._y=t,this._z=i,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,i=!0){const r=e.elements,a=r[0],o=r[4],l=r[8],u=r[1],c=r[5],h=r[9],f=r[2],d=r[6],p=r[10];switch(t){case"XYZ":this._y=Math.asin(lt(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,p),this._z=Math.atan2(-o,a)):(this._x=Math.atan2(d,c),this._z=0);break;case"YXZ":this._x=Math.asin(-lt(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(l,p),this._z=Math.atan2(u,c)):(this._y=Math.atan2(-f,a),this._z=0);break;case"ZXY":this._x=Math.asin(lt(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-f,p),this._z=Math.atan2(-o,c)):(this._y=0,this._z=Math.atan2(u,a));break;case"ZYX":this._y=Math.asin(-lt(f,-1,1)),Math.abs(f)<.9999999?(this._x=Math.atan2(d,p),this._z=Math.atan2(u,a)):(this._x=0,this._z=Math.atan2(-o,c));break;case"YZX":this._z=Math.asin(lt(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-f,a)):(this._x=0,this._y=Math.atan2(l,p));break;case"XZY":this._z=Math.asin(-lt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(d,c),this._y=Math.atan2(l,a)):(this._x=Math.atan2(-h,p),this._y=0);break;default:Ve("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,i){return vc.makeRotationFromQuaternion(e),this.setFromRotationMatrix(vc,t,i)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return bc.setFromEuler(this),this.setFromQuaternion(bc,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}mr.DEFAULT_ORDER="XYZ";class ju{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let Ip=0;const Sc=new Y,Sr=new $r,vi=new Wt,Ua=new Y,ia=new Y,Np=new Y,Op=new $r,Ec=new Y(1,0,0),yc=new Y(0,1,0),wc=new Y(0,0,1),Ac={type:"added"},Fp={type:"removed"},Er={type:"childadded",child:null},Js={type:"childremoved",child:null};class Cn extends gr{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Ip++}),this.uuid=Ta(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Cn.DEFAULT_UP.clone();const e=new Y,t=new mr,i=new $r,r=new Y(1,1,1);function a(){i.setFromEuler(t,!1)}function o(){t.setFromQuaternion(i,void 0,!1)}t._onChange(a),i._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new Wt},normalMatrix:{value:new Ye}}),this.matrix=new Wt,this.matrixWorld=new Wt,this.matrixAutoUpdate=Cn.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Cn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new ju,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Sr.setFromAxisAngle(e,t),this.quaternion.multiply(Sr),this}rotateOnWorldAxis(e,t){return Sr.setFromAxisAngle(e,t),this.quaternion.premultiply(Sr),this}rotateX(e){return this.rotateOnAxis(Ec,e)}rotateY(e){return this.rotateOnAxis(yc,e)}rotateZ(e){return this.rotateOnAxis(wc,e)}translateOnAxis(e,t){return Sc.copy(e).applyQuaternion(this.quaternion),this.position.add(Sc.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Ec,e)}translateY(e){return this.translateOnAxis(yc,e)}translateZ(e){return this.translateOnAxis(wc,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(vi.copy(this.matrixWorld).invert())}lookAt(e,t,i){e.isVector3?Ua.copy(e):Ua.set(e,t,i);const r=this.parent;this.updateWorldMatrix(!0,!1),ia.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?vi.lookAt(ia,Ua,this.up):vi.lookAt(Ua,ia,this.up),this.quaternion.setFromRotationMatrix(vi),r&&(vi.extractRotation(r.matrixWorld),Sr.setFromRotationMatrix(vi),this.quaternion.premultiply(Sr.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(ht("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Ac),Er.child=e,this.dispatchEvent(Er),Er.child=null):ht("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Fp),Js.child=e,this.dispatchEvent(Js),Js.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),vi.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),vi.multiply(e.parent.matrixWorld)),e.applyMatrix4(vi),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Ac),Er.child=e,this.dispatchEvent(Er),Er.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let i=0,r=this.children.length;i<r;i++){const o=this.children[i].getObjectByProperty(e,t);if(o!==void 0)return o}}getObjectsByProperty(e,t,i=[]){this[e]===t&&i.push(this);const r=this.children;for(let a=0,o=r.length;a<o;a++)r[a].getObjectsByProperty(e,t,i);return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ia,e,Np),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ia,Op,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}intersectsFrustum(){}traverse(e){e(this);const t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);const e=this.pivot;if(e!==null){const t=e.x,i=e.y,r=e.z,a=this.matrix.elements;a[12]+=t-a[0]*t-a[4]*i-a[8]*r,a[13]+=i-a[1]*t-a[5]*i-a[9]*r,a[14]+=r-a[2]*t-a[6]*i-a[10]*r}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].updateMatrixWorld(e)}updateWorldMatrix(e,t,i=!1){const r=this.parent;if(e===!0&&r!==null&&r.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||i)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,i=!0),t===!0){const a=this.children;for(let o=0,l=a.length;o<l;o++)a[o].updateWorldMatrix(!1,!0,i)}}toJSON(e){const t=e===void 0||typeof e=="string",i={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const r={};r.uuid=this.uuid,r.type=this.type,r.name=this.name,r.castShadow=this.castShadow,r.receiveShadow=this.receiveShadow,r.visible=this.visible,r.frustumCulled=this.frustumCulled,r.renderOrder=this.renderOrder,r.static=this.static,r.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.pivot!==null&&(r.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(r.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(r.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.geometryInfo=this._geometryInfo.map(l=>({...l,boundingBox:l.boundingBox?l.boundingBox.toJSON():void 0,boundingSphere:l.boundingSphere?l.boundingSphere.toJSON():void 0})),r.instanceInfo=this._instanceInfo.map(l=>({...l})),r.availableInstanceIds=this._availableInstanceIds.slice(),r.availableGeometryIds=this._availableGeometryIds.slice(),r.nextIndexStart=this._nextIndexStart,r.nextVertexStart=this._nextVertexStart,r.geometryCount=this._geometryCount,r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.matricesTexture=this._matricesTexture.toJSON(e),r.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(r.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(r.boundingBox=this.boundingBox.toJSON()));function a(l,u){return l[u.uuid]===void 0&&(l[u.uuid]=u.toJSON(e)),u.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=a(e.geometries,this.geometry);const l=this.geometry.parameters;if(l!==void 0&&l.shapes!==void 0){const u=l.shapes;if(Array.isArray(u))for(let c=0,h=u.length;c<h;c++){const f=u[c];a(e.shapes,f)}else a(e.shapes,u)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(a(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const l=[];for(let u=0,c=this.material.length;u<c;u++)l.push(a(e.materials,this.material[u]));r.material=l}else r.material=a(e.materials,this.material);if(this.children.length>0){r.children=[];for(let l=0;l<this.children.length;l++)r.children.push(this.children[l].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let l=0;l<this.animations.length;l++){const u=this.animations[l];r.animations.push(a(e.animations,u))}}if(t){const l=o(e.geometries),u=o(e.materials),c=o(e.textures),h=o(e.images),f=o(e.shapes),d=o(e.skeletons),p=o(e.animations),m=o(e.nodes);l.length>0&&(i.geometries=l),u.length>0&&(i.materials=u),c.length>0&&(i.textures=c),h.length>0&&(i.images=h),f.length>0&&(i.shapes=f),d.length>0&&(i.skeletons=d),p.length>0&&(i.animations=p),m.length>0&&(i.nodes=m)}return i.object=r,i;function o(l){const u=[];for(const c in l){const h=l[c];delete h.metadata,u.push(h)}return u}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot!==null?e.pivot.clone():null,this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let i=0;i<e.children.length;i++){const r=e.children[i];this.add(r.clone())}return this}dispose(){this.dispatchEvent({type:"dispose"})}}Cn.DEFAULT_UP=new Y(0,1,0);Cn.DEFAULT_MATRIX_AUTO_UPDATE=!0;Cn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class Ba extends Cn{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Up={type:"move"};class Qs{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Ba,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Ba,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new Y,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new Y),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Ba,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new Y,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new Y,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const i of e.hand.values())this._getHandJoint(t,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,i){let r=null,a=null,o=null;const l=this._targetRay,u=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){o=!0;for(const M of e.hand.values()){const x=t.getJointPose(M,i),g=this._getHandJoint(c,M);x!==null&&(g.matrix.fromArray(x.transform.matrix),g.matrix.decompose(g.position,g.rotation,g.scale),g.matrixWorldNeedsUpdate=!0,g.jointRadius=x.radius),g.visible=x!==null}const h=c.joints["index-finger-tip"],f=c.joints["thumb-tip"],d=h.position.distanceTo(f.position),p=.02,m=.005;c.inputState.pinching&&d>p+m?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&d<=p-m&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else u!==null&&e.gripSpace&&(a=t.getPose(e.gripSpace,i),a!==null&&(u.matrix.fromArray(a.transform.matrix),u.matrix.decompose(u.position,u.rotation,u.scale),u.matrixWorldNeedsUpdate=!0,a.linearVelocity?(u.hasLinearVelocity=!0,u.linearVelocity.copy(a.linearVelocity)):u.hasLinearVelocity=!1,a.angularVelocity?(u.hasAngularVelocity=!0,u.angularVelocity.copy(a.angularVelocity)):u.hasAngularVelocity=!1,u.eventsEnabled&&u.dispatchEvent({type:"gripUpdated",data:e,target:this})));l!==null&&(r=t.getPose(e.targetRaySpace,i),r===null&&a!==null&&(r=a),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1,this.dispatchEvent(Up)))}return l!==null&&(l.visible=r!==null),u!==null&&(u.visible=a!==null),c!==null&&(c.visible=o!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const i=new Ba;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[t.jointName]=i,e.add(i)}return e.joints[t.jointName]}}const eh={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Hi={h:0,s:0,l:0},ka={h:0,s:0,l:0};function js(n,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?n+(e-n)*6*t:t<1/2?e:t<2/3?n+(e-n)*6*(2/3-t):n}class pt{constructor(e,t,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,i)}set(e,t,i){if(t===void 0&&i===void 0){const r=e;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(e,t,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=In){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,ot.colorSpaceToWorking(this,t),this}setRGB(e,t,i,r=ot.workingColorSpace){return this.r=e,this.g=t,this.b=i,ot.colorSpaceToWorking(this,r),this}setHSL(e,t,i,r=ot.workingColorSpace){if(e=yp(e,1),t=lt(t,0,1),i=lt(i,0,1),t===0)this.r=this.g=this.b=i;else{const a=i<=.5?i*(1+t):i+t-i*t,o=2*i-a;this.r=js(o,a,e+1/3),this.g=js(o,a,e),this.b=js(o,a,e-1/3)}return ot.colorSpaceToWorking(this,r),this}setStyle(e,t=In){function i(a){a!==void 0&&parseFloat(a)<1&&Ve("Color: Alpha component of "+e+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let a;const o=r[1],l=r[2];switch(o){case"rgb":case"rgba":if(a=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(l))return i(a[4]),this.setRGB(Math.min(255,parseInt(a[1],10))/255,Math.min(255,parseInt(a[2],10))/255,Math.min(255,parseInt(a[3],10))/255,t);if(a=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(l))return i(a[4]),this.setRGB(Math.min(100,parseInt(a[1],10))/100,Math.min(100,parseInt(a[2],10))/100,Math.min(100,parseInt(a[3],10))/100,t);break;case"hsl":case"hsla":if(a=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(l))return i(a[4]),this.setHSL(parseFloat(a[1])/360,parseFloat(a[2])/100,parseFloat(a[3])/100,t);break;default:Ve("Color: Unknown color model "+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){const a=r[1],o=a.length;if(o===3)return this.setRGB(parseInt(a.charAt(0),16)/15,parseInt(a.charAt(1),16)/15,parseInt(a.charAt(2),16)/15,t);if(o===6)return this.setHex(parseInt(a,16),t);Ve("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=In){const i=eh[e.toLowerCase()];return i!==void 0?this.setHex(i,t):Ve("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Li(e.r),this.g=Li(e.g),this.b=Li(e.b),this}copyLinearToSRGB(e){return this.r=Gr(e.r),this.g=Gr(e.g),this.b=Gr(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=In){return ot.workingToColorSpace(cn.copy(this),e),Math.round(lt(cn.r*255,0,255))*65536+Math.round(lt(cn.g*255,0,255))*256+Math.round(lt(cn.b*255,0,255))}getHexString(e=In){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=ot.workingColorSpace){ot.workingToColorSpace(cn.copy(this),t);const i=cn.r,r=cn.g,a=cn.b,o=Math.max(i,r,a),l=Math.min(i,r,a);let u,c;const h=(l+o)/2;if(l===o)u=0,c=0;else{const f=o-l;switch(c=h<=.5?f/(o+l):f/(2-o-l),o){case i:u=(r-a)/f+(r<a?6:0);break;case r:u=(a-i)/f+2;break;case a:u=(i-r)/f+4;break}u/=6}return e.h=u,e.s=c,e.l=h,e}getRGB(e,t=ot.workingColorSpace){return ot.workingToColorSpace(cn.copy(this),t),e.r=cn.r,e.g=cn.g,e.b=cn.b,e}getStyle(e=In){ot.workingToColorSpace(cn.copy(this),e);const t=cn.r,i=cn.g,r=cn.b;return e!==In?`color(${e} ${t.toFixed(3)} ${i.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(i*255)},${Math.round(r*255)})`}offsetHSL(e,t,i){return this.getHSL(Hi),this.setHSL(Hi.h+e,Hi.s+t,Hi.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,i){return this.r=e.r+(t.r-e.r)*i,this.g=e.g+(t.g-e.g)*i,this.b=e.b+(t.b-e.b)*i,this}lerpHSL(e,t){this.getHSL(Hi),e.getHSL(ka);const i=Xs(Hi.h,ka.h,t),r=Xs(Hi.s,ka.s,t),a=Xs(Hi.l,ka.l,t);return this.setHSL(i,r,a),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,i=this.g,r=this.b,a=e.elements;return this.r=a[0]*t+a[3]*i+a[6]*r,this.g=a[1]*t+a[4]*i+a[7]*r,this.b=a[2]*t+a[5]*i+a[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const cn=new pt;pt.NAMES=eh;class Bp extends Cn{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new mr,this.environmentIntensity=1,this.environmentRotation=new mr,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),t.object.backgroundBlurriness=this.backgroundBlurriness,t.object.backgroundIntensity=this.backgroundIntensity,t.object.backgroundRotation=this.backgroundRotation.toArray(),t.object.environmentIntensity=this.environmentIntensity,t.object.environmentRotation=this.environmentRotation.toArray(),t}}const Hn=new Y,bi=new Y,eo=new Y,Si=new Y,yr=new Y,wr=new Y,Tc=new Y,to=new Y,no=new Y,io=new Y,ro=new Ft,ao=new Ft,so=new Ft;class Yn{constructor(e=new Y,t=new Y,i=new Y){this.a=e,this.b=t,this.c=i}static getNormal(e,t,i,r){r.subVectors(i,t),Hn.subVectors(e,t),r.cross(Hn);const a=r.lengthSq();return a>0?r.multiplyScalar(1/Math.sqrt(a)):r.set(0,0,0)}static getBarycoord(e,t,i,r,a){Hn.subVectors(r,t),bi.subVectors(i,t),eo.subVectors(e,t);const o=Hn.dot(Hn),l=Hn.dot(bi),u=Hn.dot(eo),c=bi.dot(bi),h=bi.dot(eo),f=o*c-l*l;if(f===0)return a.set(0,0,0),null;const d=1/f,p=(c*u-l*h)*d,m=(o*h-l*u)*d;return a.set(1-p-m,m,p)}static containsPoint(e,t,i,r){return this.getBarycoord(e,t,i,r,Si)===null?!1:Si.x>=0&&Si.y>=0&&Si.x+Si.y<=1}static getInterpolation(e,t,i,r,a,o,l,u){return this.getBarycoord(e,t,i,r,Si)===null?(u.x=0,u.y=0,"z"in u&&(u.z=0),"w"in u&&(u.w=0),null):(u.setScalar(0),u.addScaledVector(a,Si.x),u.addScaledVector(o,Si.y),u.addScaledVector(l,Si.z),u)}static getInterpolatedAttribute(e,t,i,r,a,o){return ro.setScalar(0),ao.setScalar(0),so.setScalar(0),ro.fromBufferAttribute(e,t),ao.fromBufferAttribute(e,i),so.fromBufferAttribute(e,r),o.setScalar(0),o.addScaledVector(ro,a.x),o.addScaledVector(ao,a.y),o.addScaledVector(so,a.z),o}static isFrontFacing(e,t,i,r){return Hn.subVectors(i,t),bi.subVectors(e,t),Hn.cross(bi).dot(r)<0}set(e,t,i){return this.a.copy(e),this.b.copy(t),this.c.copy(i),this}setFromPointsAndIndices(e,t,i,r){return this.a.copy(e[t]),this.b.copy(e[i]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,t,i,r){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Hn.subVectors(this.c,this.b),bi.subVectors(this.a,this.b),Hn.cross(bi).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return Yn.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return Yn.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,i,r,a){return Yn.getInterpolation(e,this.a,this.b,this.c,t,i,r,a)}containsPoint(e){return Yn.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return Yn.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const i=this.a,r=this.b,a=this.c;let o,l;yr.subVectors(r,i),wr.subVectors(a,i),to.subVectors(e,i);const u=yr.dot(to),c=wr.dot(to);if(u<=0&&c<=0)return t.copy(i);no.subVectors(e,r);const h=yr.dot(no),f=wr.dot(no);if(h>=0&&f<=h)return t.copy(r);const d=u*f-h*c;if(d<=0&&u>=0&&h<=0)return o=u/(u-h),t.copy(i).addScaledVector(yr,o);io.subVectors(e,a);const p=yr.dot(io),m=wr.dot(io);if(m>=0&&p<=m)return t.copy(a);const M=p*c-u*m;if(M<=0&&c>=0&&m<=0)return l=c/(c-m),t.copy(i).addScaledVector(wr,l);const x=h*m-p*f;if(x<=0&&f-h>=0&&p-m>=0)return Tc.subVectors(a,r),l=(f-h)/(f-h+(p-m)),t.copy(r).addScaledVector(Tc,l);const g=1/(x+M+d);return o=M*g,l=d*g,t.copy(i).addScaledVector(yr,o).addScaledVector(wr,l)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}class Jr{constructor(e=new Y(1/0,1/0,1/0),t=new Y(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t+=3)this.expandByPoint(Gn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,i=e.count;t<i;t++)this.expandByPoint(Gn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const i=Gn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const i=e.geometry;if(i!==void 0){const a=i.getAttribute("position");if(t===!0&&a!==void 0&&e.isInstancedMesh!==!0)for(let o=0,l=a.count;o<l;o++)e.isMesh===!0?e.getVertexPosition(o,Gn):Gn.fromBufferAttribute(a,o),Gn.applyMatrix4(e.matrixWorld),this.expandByPoint(Gn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),za.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),za.copy(i.boundingBox)),za.applyMatrix4(e.matrixWorld),this.union(za)}const r=e.children;for(let a=0,o=r.length;a<o;a++)this.expandByObject(r[a],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Gn),Gn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,i;return e.normal.x>0?(t=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),t<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(ra),Ha.subVectors(this.max,ra),Ar.subVectors(e.a,ra),Tr.subVectors(e.b,ra),Rr.subVectors(e.c,ra),Gi.subVectors(Tr,Ar),Wi.subVectors(Rr,Tr),Qi.subVectors(Ar,Rr);let t=[0,-Gi.z,Gi.y,0,-Wi.z,Wi.y,0,-Qi.z,Qi.y,Gi.z,0,-Gi.x,Wi.z,0,-Wi.x,Qi.z,0,-Qi.x,-Gi.y,Gi.x,0,-Wi.y,Wi.x,0,-Qi.y,Qi.x,0];return!oo(t,Ar,Tr,Rr,Ha)||(t=[1,0,0,0,1,0,0,0,1],!oo(t,Ar,Tr,Rr,Ha))?!1:(Ga.crossVectors(Gi,Wi),t=[Ga.x,Ga.y,Ga.z],oo(t,Ar,Tr,Rr,Ha))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Gn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Gn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Ei[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Ei[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Ei[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Ei[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Ei[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Ei[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Ei[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Ei[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Ei),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const Ei=[new Y,new Y,new Y,new Y,new Y,new Y,new Y,new Y],Gn=new Y,za=new Jr,Ar=new Y,Tr=new Y,Rr=new Y,Gi=new Y,Wi=new Y,Qi=new Y,ra=new Y,Ha=new Y,Ga=new Y,ji=new Y;function oo(n,e,t,i,r){for(let a=0,o=n.length-3;a<=o;a+=3){ji.fromArray(n,a);const l=r.x*Math.abs(ji.x)+r.y*Math.abs(ji.y)+r.z*Math.abs(ji.z),u=e.dot(ji),c=t.dot(ji),h=i.dot(ji);if(Math.max(-Math.max(u,c,h),Math.min(u,c,h))>l)return!1}return!0}const qt=new Y,Wa=new Xe;let kp=0;class di extends gr{constructor(e,t,i=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:kp++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=i,this.usage=_p,this.updateRanges=[],this.gpuType=ci,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,i){e*=this.itemSize,i*=t.itemSize;for(let r=0,a=this.itemSize;r<a;r++)this.array[e+r]=t.array[i+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,i=this.count;t<i;t++)Wa.fromBufferAttribute(this,t),Wa.applyMatrix3(e),this.setXY(t,Wa.x,Wa.y);else if(this.itemSize===3)for(let t=0,i=this.count;t<i;t++)qt.fromBufferAttribute(this,t),qt.applyMatrix3(e),this.setXYZ(t,qt.x,qt.y,qt.z);return this}applyMatrix4(e){for(let t=0,i=this.count;t<i;t++)qt.fromBufferAttribute(this,t),qt.applyMatrix4(e),this.setXYZ(t,qt.x,qt.y,qt.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)qt.fromBufferAttribute(this,t),qt.applyNormalMatrix(e),this.setXYZ(t,qt.x,qt.y,qt.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)qt.fromBufferAttribute(this,t),qt.transformDirection(e),this.setXYZ(t,qt.x,qt.y,qt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let i=this.array[e*this.itemSize+t];return this.normalized&&(i=na(i,this.array)),i}setComponent(e,t,i){return this.normalized&&(i=_n(i,this.array)),this.array[e*this.itemSize+t]=i,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=na(t,this.array)),t}setX(e,t){return this.normalized&&(t=_n(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=na(t,this.array)),t}setY(e,t){return this.normalized&&(t=_n(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=na(t,this.array)),t}setZ(e,t){return this.normalized&&(t=_n(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=na(t,this.array)),t}setW(e,t){return this.normalized&&(t=_n(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,i){return e*=this.itemSize,this.normalized&&(t=_n(t,this.array),i=_n(i,this.array)),this.array[e+0]=t,this.array[e+1]=i,this}setXYZ(e,t,i,r){return e*=this.itemSize,this.normalized&&(t=_n(t,this.array),i=_n(i,this.array),r=_n(r,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=r,this}setXYZW(e,t,i,r,a){return e*=this.itemSize,this.normalized&&(t=_n(t,this.array),i=_n(i,this.array),r=_n(r,this.array),a=_n(a,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=r,this.array[e+3]=a,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return e.name=this.name,e.usage=this.usage,e.gpuType=this.gpuType,e}dispose(){this.dispatchEvent({type:"dispose"})}}class th extends di{constructor(e,t,i){super(new Uint16Array(e),t,i)}}class nh extends di{constructor(e,t,i){super(new Uint32Array(e),t,i)}}class Di extends di{constructor(e,t,i){super(new Float32Array(e),t,i)}}const zp=new Jr,aa=new Y,lo=new Y;class zl{constructor(e=new Y,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const i=this.center;t!==void 0?i.copy(t):zp.setFromPoints(e).getCenter(i);let r=0;for(let a=0,o=e.length;a<o;a++)r=Math.max(r,i.distanceToSquared(e[a]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const i=this.center.distanceToSquared(e);return t.copy(e),i>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;aa.subVectors(e,this.center);const t=aa.lengthSq();if(t>this.radius*this.radius){const i=Math.sqrt(t),r=(i-this.radius)*.5;this.center.addScaledVector(aa,r/i),this.radius+=r}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(lo.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(aa.copy(e.center).add(lo)),this.expandByPoint(aa.copy(e.center).sub(lo))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}let Hp=0;const Pn=new Wt,co=new Cn,Cr=new Y,An=new Jr,sa=new Jr,en=new Y;class gi extends gr{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Hp++}),this.uuid=Ta(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(vp(e)?nh:th)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,i=0){this.groups.push({start:e,count:t,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const a=new Ye().getNormalMatrix(e);i.applyNormalMatrix(a),i.needsUpdate=!0}const r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return Pn.makeRotationFromQuaternion(e),this.applyMatrix4(Pn),this}rotateX(e){return Pn.makeRotationX(e),this.applyMatrix4(Pn),this}rotateY(e){return Pn.makeRotationY(e),this.applyMatrix4(Pn),this}rotateZ(e){return Pn.makeRotationZ(e),this.applyMatrix4(Pn),this}translate(e,t,i){return Pn.makeTranslation(e,t,i),this.applyMatrix4(Pn),this}scale(e,t,i){return Pn.makeScale(e,t,i),this.applyMatrix4(Pn),this}lookAt(e){return co.lookAt(e),co.updateMatrix(),this.applyMatrix4(co.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Cr).negate(),this.translate(Cr.x,Cr.y,Cr.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const i=[];for(let r=0,a=e.length;r<a;r++){const o=e[r];i.push(o.x,o.y,o.z||0)}this.setAttribute("position",new Di(i,3))}else{const i=Math.min(e.length,t.count);for(let r=0;r<i;r++){const a=e[r];t.setXYZ(r,a.x,a.y,a.z||0)}e.length>t.count&&Ve("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Jr);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){ht("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new Y(-1/0,-1/0,-1/0),new Y(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let i=0,r=t.length;i<r;i++){const a=t[i];An.setFromBufferAttribute(a),this.morphTargetsRelative?(en.addVectors(this.boundingBox.min,An.min),this.boundingBox.expandByPoint(en),en.addVectors(this.boundingBox.max,An.max),this.boundingBox.expandByPoint(en)):(this.boundingBox.expandByPoint(An.min),this.boundingBox.expandByPoint(An.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&ht('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new zl);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){ht("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new Y,1/0);return}if(e){const i=this.boundingSphere.center;if(An.setFromBufferAttribute(e),t)for(let a=0,o=t.length;a<o;a++){const l=t[a];sa.setFromBufferAttribute(l),this.morphTargetsRelative?(en.addVectors(An.min,sa.min),An.expandByPoint(en),en.addVectors(An.max,sa.max),An.expandByPoint(en)):(An.expandByPoint(sa.min),An.expandByPoint(sa.max))}An.getCenter(i);let r=0;for(let a=0,o=e.count;a<o;a++)en.fromBufferAttribute(e,a),r=Math.max(r,i.distanceToSquared(en));if(t)for(let a=0,o=t.length;a<o;a++){const l=t[a],u=this.morphTargetsRelative;for(let c=0,h=l.count;c<h;c++)en.fromBufferAttribute(l,c),u&&(Cr.fromBufferAttribute(e,c),en.add(Cr)),r=Math.max(r,i.distanceToSquared(en))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&ht('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){ht("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=t.position,r=t.normal,a=t.uv;let o=this.getAttribute("tangent");(o===void 0||o.count!==i.count)&&(o=new di(new Float32Array(4*i.count),4),this.setAttribute("tangent",o));const l=[],u=[];for(let b=0;b<i.count;b++)l[b]=new Y,u[b]=new Y;const c=new Y,h=new Y,f=new Y,d=new Xe,p=new Xe,m=new Xe,M=new Y,x=new Y;function g(b,w,L){c.fromBufferAttribute(i,b),h.fromBufferAttribute(i,w),f.fromBufferAttribute(i,L),d.fromBufferAttribute(a,b),p.fromBufferAttribute(a,w),m.fromBufferAttribute(a,L),h.sub(c),f.sub(c),p.sub(d),m.sub(d);const C=1/(p.x*m.y-m.x*p.y);isFinite(C)&&(M.copy(h).multiplyScalar(m.y).addScaledVector(f,-p.y).multiplyScalar(C),x.copy(f).multiplyScalar(p.x).addScaledVector(h,-m.x).multiplyScalar(C),l[b].add(M),l[w].add(M),l[L].add(M),u[b].add(x),u[w].add(x),u[L].add(x))}let _=this.groups;_.length===0&&(_=[{start:0,count:e.count}]);for(let b=0,w=_.length;b<w;++b){const L=_[b],C=L.start,N=L.count;for(let O=C,I=C+N;O<I;O+=3)g(e.getX(O+0),e.getX(O+1),e.getX(O+2))}const E=new Y,S=new Y,R=new Y,A=new Y;function D(b){R.fromBufferAttribute(r,b),A.copy(R);const w=l[b];E.copy(w),E.sub(R.multiplyScalar(R.dot(w))).normalize(),S.crossVectors(A,w);const C=S.dot(u[b])<0?-1:1;o.setXYZW(b,E.x,E.y,E.z,C)}for(let b=0,w=_.length;b<w;++b){const L=_[b],C=L.start,N=L.count;for(let O=C,I=C+N;O<I;O+=3)D(e.getX(O+0)),D(e.getX(O+1)),D(e.getX(O+2))}this._transformed=!0}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let i=this.getAttribute("normal");if(i===void 0||i.count!==t.count)i=new di(new Float32Array(t.count*3),3),this.setAttribute("normal",i);else for(let d=0,p=i.count;d<p;d++)i.setXYZ(d,0,0,0);const r=new Y,a=new Y,o=new Y,l=new Y,u=new Y,c=new Y,h=new Y,f=new Y;if(e)for(let d=0,p=e.count;d<p;d+=3){const m=e.getX(d+0),M=e.getX(d+1),x=e.getX(d+2);r.fromBufferAttribute(t,m),a.fromBufferAttribute(t,M),o.fromBufferAttribute(t,x),h.subVectors(o,a),f.subVectors(r,a),h.cross(f),l.fromBufferAttribute(i,m),u.fromBufferAttribute(i,M),c.fromBufferAttribute(i,x),l.add(h),u.add(h),c.add(h),i.setXYZ(m,l.x,l.y,l.z),i.setXYZ(M,u.x,u.y,u.z),i.setXYZ(x,c.x,c.y,c.z)}else for(let d=0,p=t.count;d<p;d+=3)r.fromBufferAttribute(t,d+0),a.fromBufferAttribute(t,d+1),o.fromBufferAttribute(t,d+2),h.subVectors(o,a),f.subVectors(r,a),h.cross(f),i.setXYZ(d+0,h.x,h.y,h.z),i.setXYZ(d+1,h.x,h.y,h.z),i.setXYZ(d+2,h.x,h.y,h.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,i=e.count;t<i;t++)en.fromBufferAttribute(e,t),en.normalize(),e.setXYZ(t,en.x,en.y,en.z)}toNonIndexed(){function e(l,u){const c=l.array,h=l.itemSize,f=l.normalized,d=new c.constructor(u.length*h);let p=0,m=0;for(let M=0,x=u.length;M<x;M++){l.isInterleavedBufferAttribute?p=u[M]*l.data.stride+l.offset:p=u[M]*h;for(let g=0;g<h;g++)d[m++]=c[p++]}return new di(d,h,f)}if(this.index===null)return Ve("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new gi,i=this.index.array,r=this.attributes;for(const l in r){const u=r[l],c=e(u,i);t.setAttribute(l,c)}const a=this.morphAttributes;for(const l in a){const u=[],c=a[l];for(let h=0,f=c.length;h<f;h++){const d=c[h],p=e(d,i);u.push(p)}t.morphAttributes[l]=u}t.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let l=0,u=o.length;l<u;l++){const c=o[l];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,e.name=this.name,Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){const u=this.parameters;for(const c in u)u[c]!==void 0&&(e[c]=u[c]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const i=this.attributes;for(const u in i){const c=i[u];e.data.attributes[u]=c.toJSON(e.data)}const r={};let a=!1;for(const u in this.morphAttributes){const c=this.morphAttributes[u],h=[];for(let f=0,d=c.length;f<d;f++){const p=c[f];h.push(p.toJSON(e.data))}h.length>0&&(r[u]=h,a=!0)}a&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));const l=this.boundingSphere;return l!==null&&(e.data.boundingSphere=l.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const i=e.index;i!==null&&this.setIndex(i.clone());const r=e.attributes;for(const c in r){const h=r[c];this.setAttribute(c,h.clone(t))}const a=e.morphAttributes;for(const c in a){const h=[],f=a[c];for(let d=0,p=f.length;d<p;d++)h.push(f[d].clone(t));this.morphAttributes[c]=h}this.morphTargetsRelative=e.morphTargetsRelative;const o=e.groups;for(let c=0,h=o.length;c<h;c++){const f=o[c];this.addGroup(f.start,f.count,f.materialIndex)}const l=e.boundingBox;l!==null&&(this.boundingBox=l.clone());const u=e.boundingSphere;return u!==null&&(this.boundingSphere=u.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}}const uo=new Y,Gp=new Y,Wp=new Ye;class Yi{constructor(e=new Y(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,i,r){return this.normal.set(e,t,i),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,i){const r=uo.subVectors(i,t).cross(Gp.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,i=!0){const r=e.delta(uo),a=this.normal.dot(r);if(a===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const o=-(e.start.dot(this.normal)+this.constant)/a;return i===!0&&(o<0||o>1)?null:t.copy(e.start).addScaledVector(r,o)}intersectsLine(e){const t=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return t<0&&i>0||i<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const i=t||Wp.getNormalMatrix(e),r=this.coplanarPoint(uo).applyMatrix4(e),a=this.normal.applyMatrix3(i).normalize();return this.constant=-r.dot(a),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(e){return this.normal.fromArray(e.normal),this.constant=e.constant,this}}let Vp=0;class Ls extends gr{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Vp++}),this.uuid=Ta(),this.name="",this.type="Material",this.blending=Ma,this.side=dr,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Pu,this.blendDst=Iu,this.blendEquation=Nr,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new pt(0,0,0),this.blendAlpha=0,this.depthFunc=va,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=dp,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Vs,this.stencilZFail=Vs,this.stencilZPass=Vs,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const i=e[t];if(i===void 0){Ve(`Material: parameter '${t}' has value of undefined.`);continue}const r=this[t];if(r===void 0){Ve(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(i):r&&r.isVector2&&i&&i.isVector2||r&&r.isEuler&&i&&i.isEuler||r&&r.isVector3&&i&&i.isVector3?r.copy(i):this[t]=i}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const i={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,i.blending=this.blending,i.side=this.side,i.shadowSide=this.shadowSide,i.vertexColors=this.vertexColors,i.opacity=this.opacity,i.transparent=this.transparent,i.blendSrc=this.blendSrc,i.blendDst=this.blendDst,i.blendEquation=this.blendEquation,i.blendSrcAlpha=this.blendSrcAlpha,i.blendDstAlpha=this.blendDstAlpha,i.blendEquationAlpha=this.blendEquationAlpha,i.blendColor=this.blendColor.getHex(),i.blendAlpha=this.blendAlpha,i.depthFunc=this.depthFunc,i.depthTest=this.depthTest,i.depthWrite=this.depthWrite,i.colorWrite=this.colorWrite,i.clipIntersection=this.clipIntersection,i.clipShadows=this.clipShadows,i.stencilWriteMask=this.stencilWriteMask,i.stencilFunc=this.stencilFunc,i.stencilRef=this.stencilRef,i.stencilFuncMask=this.stencilFuncMask,i.stencilFail=this.stencilFail,i.stencilZFail=this.stencilZFail,i.stencilZPass=this.stencilZPass,i.stencilWrite=this.stencilWrite,i.polygonOffset=this.polygonOffset,i.polygonOffsetFactor=this.polygonOffsetFactor,i.polygonOffsetUnits=this.polygonOffsetUnits,i.dithering=this.dithering,i.alphaTest=this.alphaTest,i.alphaHash=this.alphaHash,i.alphaToCoverage=this.alphaToCoverage,i.premultipliedAlpha=this.premultipliedAlpha,i.forceSinglePass=this.forceSinglePass,i.allowOverride=this.allowOverride,i.visible=this.visible,i.toneMapped=this.toneMapped,i.name=this.name,this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(i.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(i.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(i.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(i.clippingPlanes=this.clippingPlanes.map(a=>a.toJSON())),this.rotation!==void 0&&(i.rotation=this.rotation),this.depthPacking!==void 0&&(i.depthPacking=this.depthPacking),this.linewidth!==void 0&&(i.linewidth=this.linewidth),this.linecap!==void 0&&(i.linecap=this.linecap),this.linejoin!==void 0&&(i.linejoin=this.linejoin),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.wireframe!==void 0&&(i.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(i.flatShading=this.flatShading),this.fog!==void 0&&(i.fog=this.fog),Object.keys(this.userData).length>0&&(i.userData=this.userData);function r(a){const o=[];for(const l in a){const u=a[l];delete u.metadata,o.push(u)}return o}if(t){const a=r(e.textures),o=r(e.images);a.length>0&&(i.textures=a),o.length>0&&(i.images=o)}return i}fromJSON(e,t){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new pt().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.retroreflectivity!==void 0&&(this.retroreflectivity=e.retroreflectivity),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=e.iridescenceThicknessRange),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.clippingPlanes!==void 0&&(this.clippingPlanes=e.clippingPlanes.map(i=>new Yi().fromJSON(i))),e.clipIntersection!==void 0&&(this.clipIntersection=e.clipIntersection),e.clipShadows!==void 0&&(this.clipShadows=e.clipShadows),e.depthPacking!==void 0&&(this.depthPacking=e.depthPacking),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.linecap!==void 0&&(this.linecap=e.linecap),e.linejoin!==void 0&&(this.linejoin=e.linejoin),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(typeof e.vertexColors=="number"?this.vertexColors=e.vertexColors>0:this.vertexColors=e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=t[e.map]||null),e.matcap!==void 0&&(this.matcap=t[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=t[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=t[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=t[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let i=e.normalScale;Array.isArray(i)===!1&&(i=[i,i]),this.normalScale=new Xe().fromArray(i)}return e.displacementMap!==void 0&&(this.displacementMap=t[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=t[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=t[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=t[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=t[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=t[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=t[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=t[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=t[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=t[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=t[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=t[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=t[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=t[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new Xe().fromArray(e.clearcoatNormalScale)),e.iridescenceMap!==void 0&&(this.iridescenceMap=t[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=t[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=t[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=t[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=t[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=t[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=t[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let i=null;if(t!==null){const r=t.length;i=new Array(r);for(let a=0;a!==r;++a)i[a]=t[a].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}const yi=new Y,ho=new Y,Va=new Y,Ya=new Y;class Yp{constructor(e=new Y,t=new Y(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,yi)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const i=t.dot(this.direction);return i<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=yi.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(yi.copy(this.origin).addScaledVector(this.direction,t),yi.distanceToSquared(e))}distanceSqToSegment(e,t,i,r){ho.copy(e).add(t).multiplyScalar(.5),Va.copy(t).sub(e).normalize(),Ya.copy(this.origin).sub(ho);const a=e.distanceTo(t)*.5,o=-this.direction.dot(Va),l=Ya.dot(this.direction),u=-Ya.dot(Va),c=Ya.lengthSq(),h=Math.abs(1-o*o);let f,d,p,m;if(h>0)if(f=o*u-l,d=o*l-u,m=a*h,f>=0)if(d>=-m)if(d<=m){const M=1/h;f*=M,d*=M,p=f*(f+o*d+2*l)+d*(o*f+d+2*u)+c}else d=a,f=Math.max(0,-(o*d+l)),p=-f*f+d*(d+2*u)+c;else d=-a,f=Math.max(0,-(o*d+l)),p=-f*f+d*(d+2*u)+c;else d<=-m?(f=Math.max(0,-(-o*a+l)),d=f>0?-a:Math.min(Math.max(-a,-u),a),p=-f*f+d*(d+2*u)+c):d<=m?(f=0,d=Math.min(Math.max(-a,-u),a),p=d*(d+2*u)+c):(f=Math.max(0,-(o*a+l)),d=f>0?a:Math.min(Math.max(-a,-u),a),p=-f*f+d*(d+2*u)+c);else d=o>0?-a:a,f=Math.max(0,-(o*d+l)),p=-f*f+d*(d+2*u)+c;return i&&i.copy(this.origin).addScaledVector(this.direction,f),r&&r.copy(ho).addScaledVector(Va,d),p}intersectSphere(e,t){if(e.radius<0)return null;yi.subVectors(e.center,this.origin);const i=yi.dot(this.direction),r=yi.dot(yi)-i*i,a=e.radius*e.radius;if(r>a)return null;const o=Math.sqrt(a-r),l=i-o,u=i+o;return u<0?null:l<0?this.at(u,t):this.at(l,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(e.normal)+e.constant)/t;return i>=0?i:null}intersectPlane(e,t){const i=this.distanceToPlane(e);return i===null?null:this.at(i,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let i,r,a,o,l,u;const c=1/this.direction.x,h=1/this.direction.y,f=1/this.direction.z,d=this.origin;return c>=0?(i=(e.min.x-d.x)*c,r=(e.max.x-d.x)*c):(i=(e.max.x-d.x)*c,r=(e.min.x-d.x)*c),h>=0?(a=(e.min.y-d.y)*h,o=(e.max.y-d.y)*h):(a=(e.max.y-d.y)*h,o=(e.min.y-d.y)*h),i>o||a>r||((a>i||isNaN(i))&&(i=a),(o<r||isNaN(r))&&(r=o),f>=0?(l=(e.min.z-d.z)*f,u=(e.max.z-d.z)*f):(l=(e.max.z-d.z)*f,u=(e.min.z-d.z)*f),i>u||l>r)||((l>i||i!==i)&&(i=l),(u<r||r!==r)&&(r=u),r<0)?null:this.at(i>=0?i:r,t)}intersectsBox(e){return this.intersectBox(e,yi)!==null}intersectTriangle(e,t,i,r,a){const o=this.origin,l=this.direction,u=l.x,c=l.y,h=l.z,f=e.x-o.x,d=e.y-o.y,p=e.z-o.z,m=t.x-o.x,M=t.y-o.y,x=t.z-o.z,g=i.x-o.x,_=i.y-o.y,E=i.z-o.z,S=Math.abs(u),R=Math.abs(c),A=Math.abs(h);let D,b,w,L,C,N,O,I,B,W,$,ae;if(S>=R&&S>=A?(w=u,N=f,B=m,ae=g,u>=0?(D=c,b=h,L=d,C=p,O=M,I=x,W=_,$=E):(D=h,b=c,L=p,C=d,O=x,I=M,W=E,$=_)):R>=A?(w=c,N=d,B=M,ae=_,c>=0?(D=h,b=u,L=p,C=f,O=x,I=m,W=E,$=g):(D=u,b=h,L=f,C=p,O=m,I=x,W=g,$=E)):(w=h,N=p,B=x,ae=E,h>=0?(D=u,b=c,L=f,C=d,O=m,I=M,W=g,$=_):(D=c,b=u,L=d,C=f,O=M,I=m,W=_,$=g)),w===0)return null;const q=D/w,ee=b/w,F=1/w,re=L-q*N,ue=C-ee*N,Re=O-q*B,Be=I-ee*B,We=W-q*ae,j=$-ee*ae,ie=We*Be-j*Re,G=re*j-ue*We,he=Re*ue-Be*re;if(r){if(ie<0||G<0||he<0)return null}else if((ie<0||G<0||he<0)&&(ie>0||G>0||he>0))return null;const se=ie+G+he;if(se===0)return null;const ye=F*(ie*N+G*B+he*ae);return(se>0?ye<0:ye>0)?null:this.at(ye/se,a)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class ih extends Ls{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new pt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new mr,this.combine=Nu,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const Rc=new Wt,er=new Yp,Xa=new zl,Cc=new Y,Ka=new Y,qa=new Y,Za=new Y,fo=new Y,$a=new Y,Lc=new Y,Ja=new Y;class Mn extends Cn{constructor(e=new gi,t=new ih){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const r=t[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let a=0,o=r.length;a<o;a++){const l=r[a].name||String(a);this.morphTargetInfluences.push(0),this.morphTargetDictionary[l]=a}}}}getVertexPosition(e,t){const i=this.geometry,r=i.attributes.position,a=i.morphAttributes.position,o=i.morphTargetsRelative;t.fromBufferAttribute(r,e);const l=this.morphTargetInfluences;if(a&&l){$a.set(0,0,0);for(let u=0,c=a.length;u<c;u++){const h=l[u],f=a[u];h!==0&&(fo.fromBufferAttribute(f,e),o?$a.addScaledVector(fo,h):$a.addScaledVector(fo.sub(t),h))}t.add($a)}return t}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){const i=this.geometry,r=this.material,a=this.matrixWorld;r!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),Xa.copy(i.boundingSphere),Xa.applyMatrix4(a),er.copy(e.ray).recast(e.near),!(Xa.containsPoint(er.origin)===!1&&(er.intersectSphere(Xa,Cc)===null||er.origin.distanceToSquared(Cc)>(e.far-e.near)**2))&&(Rc.copy(a).invert(),er.copy(e.ray).applyMatrix4(Rc),!(i.boundingBox!==null&&er.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,t,er)))}_computeIntersections(e,t,i){let r;const a=this.geometry,o=this.material,l=a.index,u=a.attributes.position,c=a.attributes.uv,h=a.attributes.uv1,f=a.attributes.normal,d=a.groups,p=a.drawRange;if(l!==null)if(Array.isArray(o))for(let m=0,M=d.length;m<M;m++){const x=d[m],g=o[x.materialIndex],_=Math.max(x.start,p.start),E=Math.min(l.count,Math.min(x.start+x.count,p.start+p.count));for(let S=_,R=E;S<R;S+=3){const A=l.getX(S),D=l.getX(S+1),b=l.getX(S+2);r=Qa(this,g,e,i,c,h,f,A,D,b),r&&(r.faceIndex=Math.floor(S/3),r.face.materialIndex=x.materialIndex,t.push(r))}}else{const m=Math.max(0,p.start),M=Math.min(l.count,p.start+p.count);for(let x=m,g=M;x<g;x+=3){const _=l.getX(x),E=l.getX(x+1),S=l.getX(x+2);r=Qa(this,o,e,i,c,h,f,_,E,S),r&&(r.faceIndex=Math.floor(x/3),t.push(r))}}else if(u!==void 0)if(Array.isArray(o))for(let m=0,M=d.length;m<M;m++){const x=d[m],g=o[x.materialIndex],_=Math.max(x.start,p.start),E=Math.min(u.count,Math.min(x.start+x.count,p.start+p.count));for(let S=_,R=E;S<R;S+=3){const A=S,D=S+1,b=S+2;r=Qa(this,g,e,i,c,h,f,A,D,b),r&&(r.faceIndex=Math.floor(S/3),r.face.materialIndex=x.materialIndex,t.push(r))}}else{const m=Math.max(0,p.start),M=Math.min(u.count,p.start+p.count);for(let x=m,g=M;x<g;x+=3){const _=x,E=x+1,S=x+2;r=Qa(this,o,e,i,c,h,f,_,E,S),r&&(r.faceIndex=Math.floor(x/3),t.push(r))}}}}function Xp(n,e,t,i,r,a,o,l){let u;if(e.side===yn?u=i.intersectTriangle(o,a,r,!0,l):u=i.intersectTriangle(r,a,o,e.side===dr,l),u===null)return null;Ja.copy(l),Ja.applyMatrix4(n.matrixWorld);const c=t.ray.origin.distanceTo(Ja);return c<t.near||c>t.far?null:{distance:c,point:Ja.clone(),object:n}}function Qa(n,e,t,i,r,a,o,l,u,c){n.getVertexPosition(l,Ka),n.getVertexPosition(u,qa),n.getVertexPosition(c,Za);const h=Xp(n,e,t,i,Ka,qa,Za,Lc);if(h){const f=new Y;Yn.getBarycoord(Lc,Ka,qa,Za,f),r&&(h.uv=Yn.getInterpolatedAttribute(r,l,u,c,f,new Xe)),a&&(h.uv1=Yn.getInterpolatedAttribute(a,l,u,c,f,new Xe)),o&&(h.normal=Yn.getInterpolatedAttribute(o,l,u,c,f,new Y),h.normal.dot(i.direction)>0&&h.normal.multiplyScalar(-1));const d={a:l,b:u,c,normal:new Y,materialIndex:0};Yn.getNormal(Ka,qa,Za,d.normal),h.face=d,h.barycoord=f}return h}class Br extends xn{constructor(e=null,t=1,i=1,r,a,o,l,u,c=$t,h=$t,f,d){super(null,o,l,u,c,h,r,a,f,d),this.isDataTexture=!0,this.image={data:e,width:t,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class rh extends di{constructor(e,t,i,r=1){super(e,t,i),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=r}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const tr=new zl,Kp=new Xe(.5,.5),ja=new Y;class Hl{constructor(e=new Yi,t=new Yi,i=new Yi,r=new Yi,a=new Yi,o=new Yi){this.planes=[e,t,i,r,a,o]}set(e,t,i,r,a,o){const l=this.planes;return l[0].copy(e),l[1].copy(t),l[2].copy(i),l[3].copy(r),l[4].copy(a),l[5].copy(o),this}copy(e){const t=this.planes;for(let i=0;i<6;i++)t[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,t=ui,i=!1){const r=this.planes,a=e.elements,o=a[0],l=a[1],u=a[2],c=a[3],h=a[4],f=a[5],d=a[6],p=a[7],m=a[8],M=a[9],x=a[10],g=a[11],_=a[12],E=a[13],S=a[14],R=a[15];if(r[0].setComponents(c-o,p-h,g-m,R-_).normalize(),r[1].setComponents(c+o,p+h,g+m,R+_).normalize(),r[2].setComponents(c+l,p+f,g+M,R+E).normalize(),r[3].setComponents(c-l,p-f,g-M,R-E).normalize(),i)r[4].setComponents(u,d,x,S).normalize(),r[5].setComponents(c-u,p-d,g-x,R-S).normalize();else if(r[4].setComponents(c-u,p-d,g-x,R-S).normalize(),t===ui)r[5].setComponents(c+u,p+d,g+x,R+S).normalize();else if(t===Es)r[5].setComponents(u,d,x,S).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),tr.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),tr.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(tr)}intersectsSprite(e){tr.center.set(0,0,0);const t=Kp.distanceTo(e.center);return tr.radius=.7071067811865476+t,tr.applyMatrix4(e.matrixWorld),this.intersectsSphere(tr)}intersectsSphere(e){const t=this.planes,i=e.center,r=-e.radius;for(let a=0;a<6;a++)if(t[a].distanceToPoint(i)<r)return!1;return!0}intersectsBox(e){const t=this.planes;for(let i=0;i<6;i++){const r=t[i];if(ja.x=r.normal.x>0?e.max.x:e.min.x,ja.y=r.normal.y>0?e.max.y:e.min.y,ja.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(ja)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let i=0;i<6;i++)if(t[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class ah extends xn{constructor(e=[],t=fr,i,r,a,o,l,u,c,h){super(e,t,i,r,a,o,l,u,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class ya extends xn{constructor(e,t,i=pi,r,a,o,l=$t,u=$t,c,h=Ii,f=1){if(h!==Ii&&h!==lr)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const d={width:e,height:t,depth:f};super(d,r,a,o,l,u,h,i,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new kl(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return t.compareFunction=this.compareFunction,t}}class qp extends ya{constructor(e,t=pi,i=fr,r,a,o=$t,l=$t,u,c=Ii){const h={width:e,height:e,depth:1},f=[h,h,h,h,h,h];super(e,e,t,i,r,a,o,l,u,c),this.image=f,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}}class sh extends xn{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}}class Ra extends gi{constructor(e=1,t=1,i=1,r=1,a=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:i,widthSegments:r,heightSegments:a,depthSegments:o};const l=this;r=Math.floor(r),a=Math.floor(a),o=Math.floor(o);const u=[],c=[],h=[],f=[];let d=0,p=0;m("z","y","x",-1,-1,i,t,e,o,a,0),m("z","y","x",1,-1,i,t,-e,o,a,1),m("x","z","y",1,1,e,i,t,r,o,2),m("x","z","y",1,-1,e,i,-t,r,o,3),m("x","y","z",1,-1,e,t,i,r,a,4),m("x","y","z",-1,-1,e,t,-i,r,a,5),this.setIndex(u),this.setAttribute("position",new Di(c,3)),this.setAttribute("normal",new Di(h,3)),this.setAttribute("uv",new Di(f,2));function m(M,x,g,_,E,S,R,A,D,b,w){const L=S/D,C=R/b,N=S/2,O=R/2,I=A/2,B=D+1,W=b+1;let $=0,ae=0;const q=new Y;for(let ee=0;ee<W;ee++){const F=ee*C-O;for(let re=0;re<B;re++){const ue=re*L-N;q[M]=ue*_,q[x]=F*E,q[g]=I,c.push(q.x,q.y,q.z),q[M]=0,q[x]=0,q[g]=A>0?1:-1,h.push(q.x,q.y,q.z),f.push(re/D),f.push(1-ee/b),$+=1}}for(let ee=0;ee<b;ee++)for(let F=0;F<D;F++){const re=d+F+B*ee,ue=d+F+B*(ee+1),Re=d+(F+1)+B*(ee+1),Be=d+(F+1)+B*ee;u.push(re,ue,Be),u.push(ue,Re,Be),ae+=6}l.addGroup(p,ae,w),p+=ae,d+=$}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ra(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}class xi extends gi{constructor(e=1,t=1,i=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:i,heightSegments:r};const a=e/2,o=t/2,l=Math.floor(i),u=Math.floor(r),c=l+1,h=u+1,f=e/l,d=t/u,p=[],m=[],M=[],x=[];for(let g=0;g<h;g++){const _=g*d-o;for(let E=0;E<c;E++){const S=E*f-a;m.push(S,-_,0),M.push(0,0,1),x.push(E/l),x.push(1-g/u)}}for(let g=0;g<u;g++)for(let _=0;_<l;_++){const E=_+c*g,S=_+c*(g+1),R=_+1+c*(g+1),A=_+1+c*g;p.push(E,S,A),p.push(S,R,A)}this.setIndex(p),this.setAttribute("position",new Di(m,3)),this.setAttribute("normal",new Di(M,3)),this.setAttribute("uv",new Di(x,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new xi(e.width,e.height,e.widthSegments,e.heightSegments)}}function Xr(n){const e={};for(const t in n){e[t]={};for(const i in n[t]){const r=n[t][i];if(Dc(r))r.isRenderTargetTexture?(Ve("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][i]=null):e[t][i]=r.clone();else if(Array.isArray(r))if(Dc(r[0])){const a=[];for(let o=0,l=r.length;o<l;o++)a[o]=r[o].clone();e[t][i]=a}else e[t][i]=r.slice();else e[t][i]=r}}return e}function mn(n){const e={};for(let t=0;t<n.length;t++){const i=Xr(n[t]);for(const r in i)e[r]=i[r]}return e}function Dc(n){return n&&(n.isColor||n.isMatrix3||n.isMatrix4||n.isVector2||n.isVector3||n.isVector4||n.isTexture||n.isQuaternion)}function Zp(n){const e=[];for(let t=0;t<n.length;t++)e.push(n[t].clone());return e}function oh(n){const e=n.getRenderTarget();return e===null?n.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:ot.workingColorSpace}const $p={clone:Xr,merge:mn};var Jp=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Qp=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class fn extends Ls{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Jp,this.fragmentShader=Qp,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Xr(e.uniforms),this.uniformsGroups=Zp(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const r in this.uniforms){const o=this.uniforms[r].value;o&&o.isTexture?t.uniforms[r]={type:"t",value:o.toJSON(e).uuid}:o&&o.isColor?t.uniforms[r]={type:"c",value:o.getHex()}:o&&o.isVector2?t.uniforms[r]={type:"v2",value:o.toArray()}:o&&o.isVector3?t.uniforms[r]={type:"v3",value:o.toArray()}:o&&o.isVector4?t.uniforms[r]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?t.uniforms[r]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?t.uniforms[r]={type:"m4",value:o.toArray()}:t.uniforms[r]={value:o}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const i={};for(const r in this.extensions)this.extensions[r]===!0&&(i[r]=!0);return Object.keys(i).length>0&&(t.extensions=i),t}fromJSON(e,t){if(super.fromJSON(e,t),e.uniforms!==void 0)for(const i in e.uniforms){const r=e.uniforms[i];switch(this.uniforms[i]={},r.type){case"t":this.uniforms[i].value=t[r.value]||null;break;case"c":this.uniforms[i].value=new pt().setHex(r.value);break;case"v2":this.uniforms[i].value=new Xe().fromArray(r.value);break;case"v3":this.uniforms[i].value=new Y().fromArray(r.value);break;case"v4":this.uniforms[i].value=new Ft().fromArray(r.value);break;case"m3":this.uniforms[i].value=new Ye().fromArray(r.value);break;case"m4":this.uniforms[i].value=new Wt().fromArray(r.value);break;default:this.uniforms[i].value=r.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(const i in e.extensions)this.extensions[i]=e.extensions[i];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}}class jp extends fn{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class em extends Ls{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=up,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class tm extends Ls{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const es=new Y,ts=new $r,ei=new Y;class lh extends Cn{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Wt,this.projectionMatrix=new Wt,this.projectionMatrixInverse=new Wt,this.coordinateSystem=ui,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(es,ts,ei),ei.x===1&&ei.y===1&&ei.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(es,ts,ei.set(1,1,1)).invert()}updateWorldMatrix(e,t,i=!1){super.updateWorldMatrix(e,t,i),this.matrixWorld.decompose(es,ts,ei),ei.x===1&&ei.y===1&&ei.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(es,ts,ei.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}const Vi=new Y,Pc=new Xe,Ic=new Xe;class Nn extends lh{constructor(e=50,t=1,i=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=fl*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(Ys*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return fl*2*Math.atan(Math.tan(Ys*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,i){Vi.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Vi.x,Vi.y).multiplyScalar(-e/Vi.z),Vi.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(Vi.x,Vi.y).multiplyScalar(-e/Vi.z)}getViewSize(e,t){return this.getViewBounds(e,Pc,Ic),t.subVectors(Ic,Pc)}setViewOffset(e,t,i,r,a,o){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=r,this.view.width=a,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(Ys*.5*this.fov)/this.zoom,i=2*t,r=this.aspect*i,a=-.5*r;const o=this.view;if(this.view!==null&&this.view.enabled){const u=o.fullWidth,c=o.fullHeight;a+=o.offsetX*r/u,t-=o.offsetY*i/c,r*=o.width/u,i*=o.height/c}const l=this.filmOffset;l!==0&&(a+=e*l/this.getFilmWidth()),this.projectionMatrix.makePerspective(a,a+r,t,t-i,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}class Gl extends lh{constructor(e=-1,t=1,i=1,r=-1,a=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=i,this.bottom=r,this.near=a,this.far=o,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,i,r,a,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=r,this.view.width=a,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,r=(this.top+this.bottom)/2;let a=i-e,o=i+e,l=r+t,u=r-t;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;a+=c*this.view.offsetX,o=a+c*this.view.width,l-=h*this.view.offsetY,u=l-h*this.view.height}this.projectionMatrix.makeOrthographic(a,o,l,u,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}class ch extends gi{constructor(){super(),this.isInstancedBufferGeometry=!0,this.type="InstancedBufferGeometry",this.instanceCount=1/0}copy(e){return super.copy(e),this.instanceCount=e.instanceCount,this}toJSON(){const e=super.toJSON();return e.instanceCount=this.instanceCount,e.isInstancedBufferGeometry=!0,e}}const Lr=-90,Dr=1;class nm extends Cn{constructor(e,t,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const r=new Nn(Lr,Dr,e,t);r.layers=this.layers,this.add(r);const a=new Nn(Lr,Dr,e,t);a.layers=this.layers,this.add(a);const o=new Nn(Lr,Dr,e,t);o.layers=this.layers,this.add(o);const l=new Nn(Lr,Dr,e,t);l.layers=this.layers,this.add(l);const u=new Nn(Lr,Dr,e,t);u.layers=this.layers,this.add(u);const c=new Nn(Lr,Dr,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[i,r,a,o,l,u]=t;for(const c of t)this.remove(c);if(e===ui)i.up.set(0,1,0),i.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),a.up.set(0,0,-1),a.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),l.up.set(0,1,0),l.lookAt(0,0,1),u.up.set(0,1,0),u.lookAt(0,0,-1);else if(e===Es)i.up.set(0,-1,0),i.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),a.up.set(0,0,1),a.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),l.up.set(0,-1,0),l.lookAt(0,0,1),u.up.set(0,-1,0),u.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[a,o,l,u,c,h]=this.children,f=e.getRenderTarget(),d=e.getActiveCubeFace(),p=e.getActiveMipmapLevel(),m=e.xr.enabled;e.xr.enabled=!1;const M=i.texture.generateMipmaps;i.texture.generateMipmaps=!1;let x=!1;e.isWebGLRenderer===!0?x=e.state.buffers.depth.getReversed():x=e.reversedDepthBuffer,e.setRenderTarget(i,0,r),x&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(i,1,r),x&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(i,2,r),x&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),e.setRenderTarget(i,3,r),x&&e.autoClear===!1&&e.clearDepth(),e.render(t,u),e.setRenderTarget(i,4,r),x&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),i.texture.generateMipmaps=M,e.setRenderTarget(i,5,r),x&&e.autoClear===!1&&e.clearDepth(),e.render(t,h),e.setRenderTarget(f,d,p),e.xr.enabled=m,i.texture.needsPMREMUpdate=!0}}class im extends Nn{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}class uh{static{uh.prototype.isMatrix2=!0}constructor(e,t,i,r){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,i,r)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let i=0;i<4;i++)this.elements[i]=e[i+t];return this}set(e,t,i,r){const a=this.elements;return a[0]=e,a[2]=t,a[1]=i,a[3]=r,this}}function Nc(n,e,t,i){const r=rm(i);switch(t){case Ku:return n*e;case Zu:return n*e/r.components*r.byteLength;case Nl:return n*e/r.components*r.byteLength;case pr:return n*e*2/r.components*r.byteLength;case Ol:return n*e*2/r.components*r.byteLength;case qu:return n*e*3/r.components*r.byteLength;case Fn:return n*e*4/r.components*r.byteLength;case Fl:return n*e*4/r.components*r.byteLength;case ds:case fs:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case ps:case ms:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case Bo:case zo:return Math.max(n,16)*Math.max(e,8)/4;case Uo:case ko:return Math.max(n,8)*Math.max(e,8)/2;case Ho:case Go:case Vo:case Yo:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case Wo:case vs:case Xo:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case Ko:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case qo:return Math.floor((n+4)/5)*Math.floor((e+3)/4)*16;case Zo:return Math.floor((n+4)/5)*Math.floor((e+4)/5)*16;case $o:return Math.floor((n+5)/6)*Math.floor((e+4)/5)*16;case Jo:return Math.floor((n+5)/6)*Math.floor((e+5)/6)*16;case Qo:return Math.floor((n+7)/8)*Math.floor((e+4)/5)*16;case jo:return Math.floor((n+7)/8)*Math.floor((e+5)/6)*16;case el:return Math.floor((n+7)/8)*Math.floor((e+7)/8)*16;case tl:return Math.floor((n+9)/10)*Math.floor((e+4)/5)*16;case nl:return Math.floor((n+9)/10)*Math.floor((e+5)/6)*16;case il:return Math.floor((n+9)/10)*Math.floor((e+7)/8)*16;case rl:return Math.floor((n+9)/10)*Math.floor((e+9)/10)*16;case al:return Math.floor((n+11)/12)*Math.floor((e+9)/10)*16;case sl:return Math.floor((n+11)/12)*Math.floor((e+11)/12)*16;case ol:case ll:case cl:return Math.ceil(n/4)*Math.ceil(e/4)*16;case ul:case hl:return Math.ceil(n/4)*Math.ceil(e/4)*8;case bs:case dl:return Math.ceil(n/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function rm(n){switch(n){case Rn:case Wu:return{byteLength:1,components:1};case ba:case Vu:case mi:return{byteLength:2,components:1};case Pl:case Il:return{byteLength:2,components:4};case pi:case Dl:case ci:return{byteLength:4,components:1};case Yu:case Xu:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${n}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Ll}}));typeof window<"u"&&(window.__THREE__?Ve("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Ll);function hh(){let n=null,e=!1,t=null,i=null;function r(a,o){i=n.requestAnimationFrame(r),t(a,o)}return{start:function(){e!==!0&&t!==null&&n!==null&&(i=n.requestAnimationFrame(r),e=!0)},stop:function(){n!==null&&n.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(a){t=a},setContext:function(a){n=a}}}function am(n){const e=new WeakMap;function t(l,u){const c=l.array,h=l.usage,f=c.byteLength,d=n.createBuffer();n.bindBuffer(u,d),n.bufferData(u,c,h),l.onUploadCallback();let p;if(c instanceof Float32Array)p=n.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)p=n.HALF_FLOAT;else if(c instanceof Uint16Array)l.isFloat16BufferAttribute?p=n.HALF_FLOAT:p=n.UNSIGNED_SHORT;else if(c instanceof Int16Array)p=n.SHORT;else if(c instanceof Uint32Array)p=n.UNSIGNED_INT;else if(c instanceof Int32Array)p=n.INT;else if(c instanceof Int8Array)p=n.BYTE;else if(c instanceof Uint8Array)p=n.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)p=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:d,type:p,bytesPerElement:c.BYTES_PER_ELEMENT,version:l.version,size:f}}function i(l,u,c){const h=u.array,f=u.updateRanges;if(n.bindBuffer(c,l),f.length===0)n.bufferSubData(c,0,h);else{f.sort((p,m)=>p.start-m.start);let d=0;for(let p=1;p<f.length;p++){const m=f[d],M=f[p];M.start<=m.start+m.count+1?m.count=Math.max(m.count,M.start+M.count-m.start):(++d,f[d]=M)}f.length=d+1;for(let p=0,m=f.length;p<m;p++){const M=f[p];n.bufferSubData(c,M.start*h.BYTES_PER_ELEMENT,h,M.start,M.count)}u.clearUpdateRanges()}u.onUploadCallback()}function r(l){return l.isInterleavedBufferAttribute&&(l=l.data),e.get(l)}function a(l){l.isInterleavedBufferAttribute&&(l=l.data);const u=e.get(l);u&&(n.deleteBuffer(u.buffer),e.delete(l))}function o(l,u){if(l.isInterleavedBufferAttribute&&(l=l.data),l.isGLBufferAttribute){const h=e.get(l);(!h||h.version<l.version)&&e.set(l,{buffer:l.buffer,type:l.type,bytesPerElement:l.elementSize,version:l.version});return}const c=e.get(l);if(c===void 0)e.set(l,t(l,u));else if(c.version<l.version){if(c.size!==l.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(c.buffer,l,u),c.version=l.version}}return{get:r,remove:a,update:o}}var sm=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,om=`#ifdef USE_ALPHAHASH
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
#endif`,lm=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,cm=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,um=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,hm=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,dm=`#ifdef USE_AOMAP
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
#endif`,fm=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,pm=`#ifdef USE_BATCHING
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
#endif`,mm=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,gm=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,xm=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Mm=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,_m=`#ifdef USE_IRIDESCENCE
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
#endif`,vm=`#ifdef USE_BUMPMAP
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
#endif`,bm=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,Sm=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Em=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,ym=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,wm=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,Am=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,Tm=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,Rm=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
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
#endif`,Cm=`#define PI 3.141592653589793
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
} // validated`,Lm=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,Dm=`vec3 transformedNormal = objectNormal;
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
#endif`,Pm=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Im=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Nm=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Om=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Fm="gl_FragColor = linearToOutputTexel( gl_FragColor );",Um=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Bm=`#ifdef USE_ENVMAP
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
#endif`,km=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,zm=`#ifdef USE_ENVMAP
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
#endif`,Hm=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Gm=`#ifdef USE_ENVMAP
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
#endif`,Wm=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Vm=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Ym=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Xm=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Km=`#ifdef USE_GRADIENTMAP
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
}`,qm=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Zm=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,$m=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Jm=`uniform bool receiveShadow;
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
#include <lightprobes_pars_fragment>`,Qm=`#ifdef USE_ENVMAP
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
#endif`,jm=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,e1=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,t1=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,n1=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,i1=`PhysicalMaterial material;
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
#endif`,r1=`uniform sampler2D dfgLUT;
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
}`,a1=`
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
#endif`,s1=`#if defined( RE_IndirectDiffuse )
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
#endif`,o1=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,l1=`#ifdef USE_LIGHT_PROBES_GRID
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
#endif`,c1=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,u1=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,h1=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,d1=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,f1=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,p1=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,m1=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,g1=`#if defined( USE_POINTS_UV )
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
#endif`,x1=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,M1=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,_1=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,v1=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,b1=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,S1=`#ifdef USE_MORPHTARGETS
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
#endif`,E1=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,y1=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,w1=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,A1=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,T1=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,R1=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,C1=`#ifdef USE_NORMALMAP
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
#endif`,L1=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,D1=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,P1=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,I1=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,N1=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,O1=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,F1=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,U1=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,B1=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,k1=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,z1=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,H1=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,G1=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,W1=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,V1=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,Y1=`float getShadowMask() {
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
}`,X1=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,K1=`#ifdef USE_SKINNING
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
#endif`,q1=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Z1=`#ifdef USE_SKINNING
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
#endif`,$1=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,J1=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Q1=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,j1=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,eg=`#ifdef USE_TRANSMISSION
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
#endif`,tg=`#ifdef USE_TRANSMISSION
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
#endif`,ng=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,ig=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,rg=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,ag=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const sg=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,og=`uniform sampler2D t2D;
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
}`,lg=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,cg=`#ifdef ENVMAP_TYPE_CUBE
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
}`,ug=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,hg=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,dg=`#include <common>
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
}`,fg=`#if DEPTH_PACKING == 3200
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
}`,pg=`#define DISTANCE
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
}`,mg=`#define DISTANCE
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
}`,gg=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,xg=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Mg=`uniform float scale;
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
}`,_g=`uniform vec3 diffuse;
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
}`,vg=`#include <common>
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
}`,bg=`uniform vec3 diffuse;
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
}`,Sg=`#define LAMBERT
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
}`,Eg=`#define LAMBERT
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
}`,yg=`#define MATCAP
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
}`,wg=`#define MATCAP
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
}`,Ag=`#define NORMAL
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
}`,Tg=`#define NORMAL
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
}`,Rg=`#define PHONG
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
}`,Cg=`#define PHONG
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
}`,Lg=`#define STANDARD
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
}`,Dg=`#define STANDARD
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
}`,Pg=`#define TOON
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
}`,Ig=`#define TOON
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
}`,Ng=`uniform float size;
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
}`,Og=`uniform vec3 diffuse;
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
}`,Fg=`#include <common>
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
}`,Ug=`uniform vec3 color;
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
}`,Bg=`uniform float rotation;
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
}`,kg=`uniform vec3 diffuse;
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
}`,tt={alphahash_fragment:sm,alphahash_pars_fragment:om,alphamap_fragment:lm,alphamap_pars_fragment:cm,alphatest_fragment:um,alphatest_pars_fragment:hm,aomap_fragment:dm,aomap_pars_fragment:fm,batching_pars_vertex:pm,batching_vertex:mm,begin_vertex:gm,beginnormal_vertex:xm,bsdfs:Mm,iridescence_fragment:_m,bumpmap_pars_fragment:vm,clipping_planes_fragment:bm,clipping_planes_pars_fragment:Sm,clipping_planes_pars_vertex:Em,clipping_planes_vertex:ym,color_fragment:wm,color_pars_fragment:Am,color_pars_vertex:Tm,color_vertex:Rm,common:Cm,cube_uv_reflection_fragment:Lm,defaultnormal_vertex:Dm,displacementmap_pars_vertex:Pm,displacementmap_vertex:Im,emissivemap_fragment:Nm,emissivemap_pars_fragment:Om,colorspace_fragment:Fm,colorspace_pars_fragment:Um,envmap_fragment:Bm,envmap_common_pars_fragment:km,envmap_pars_fragment:zm,envmap_pars_vertex:Hm,envmap_physical_pars_fragment:Qm,envmap_vertex:Gm,fog_vertex:Wm,fog_pars_vertex:Vm,fog_fragment:Ym,fog_pars_fragment:Xm,gradientmap_pars_fragment:Km,lightmap_pars_fragment:qm,lights_lambert_fragment:Zm,lights_lambert_pars_fragment:$m,lights_pars_begin:Jm,lights_toon_fragment:jm,lights_toon_pars_fragment:e1,lights_phong_fragment:t1,lights_phong_pars_fragment:n1,lights_physical_fragment:i1,lights_physical_pars_fragment:r1,lights_fragment_begin:a1,lights_fragment_maps:s1,lights_fragment_end:o1,lightprobes_pars_fragment:l1,logdepthbuf_fragment:c1,logdepthbuf_pars_fragment:u1,logdepthbuf_pars_vertex:h1,logdepthbuf_vertex:d1,map_fragment:f1,map_pars_fragment:p1,map_particle_fragment:m1,map_particle_pars_fragment:g1,metalnessmap_fragment:x1,metalnessmap_pars_fragment:M1,morphinstance_vertex:_1,morphcolor_vertex:v1,morphnormal_vertex:b1,morphtarget_pars_vertex:S1,morphtarget_vertex:E1,normal_fragment_begin:y1,normal_fragment_maps:w1,normal_pars_fragment:A1,normal_pars_vertex:T1,normal_vertex:R1,normalmap_pars_fragment:C1,clearcoat_normal_fragment_begin:L1,clearcoat_normal_fragment_maps:D1,clearcoat_pars_fragment:P1,iridescence_pars_fragment:I1,opaque_fragment:N1,packing:O1,premultiplied_alpha_fragment:F1,project_vertex:U1,dithering_fragment:B1,dithering_pars_fragment:k1,roughnessmap_fragment:z1,roughnessmap_pars_fragment:H1,shadowmap_pars_fragment:G1,shadowmap_pars_vertex:W1,shadowmap_vertex:V1,shadowmask_pars_fragment:Y1,skinbase_vertex:X1,skinning_pars_vertex:K1,skinning_vertex:q1,skinnormal_vertex:Z1,specularmap_fragment:$1,specularmap_pars_fragment:J1,tonemapping_fragment:Q1,tonemapping_pars_fragment:j1,transmission_fragment:eg,transmission_pars_fragment:tg,uv_pars_fragment:ng,uv_pars_vertex:ig,uv_vertex:rg,worldpos_vertex:ag,background_vert:sg,background_frag:og,backgroundCube_vert:lg,backgroundCube_frag:cg,cube_vert:ug,cube_frag:hg,depth_vert:dg,depth_frag:fg,distance_vert:pg,distance_frag:mg,equirect_vert:gg,equirect_frag:xg,linedashed_vert:Mg,linedashed_frag:_g,meshbasic_vert:vg,meshbasic_frag:bg,meshlambert_vert:Sg,meshlambert_frag:Eg,meshmatcap_vert:yg,meshmatcap_frag:wg,meshnormal_vert:Ag,meshnormal_frag:Tg,meshphong_vert:Rg,meshphong_frag:Cg,meshphysical_vert:Lg,meshphysical_frag:Dg,meshtoon_vert:Pg,meshtoon_frag:Ig,points_vert:Ng,points_frag:Og,shadow_vert:Fg,shadow_frag:Ug,sprite_vert:Bg,sprite_frag:kg},_e={common:{diffuse:{value:new pt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ye},alphaMap:{value:null},alphaMapTransform:{value:new Ye},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ye}},envmap:{envMap:{value:null},envMapRotation:{value:new Ye},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ye}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ye}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ye},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ye},normalScale:{value:new Xe(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ye},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ye}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ye}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ye}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new pt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new Y},probesMax:{value:new Y},probesResolution:{value:new Y}},points:{diffuse:{value:new pt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ye},alphaTest:{value:0},uvTransform:{value:new Ye}},sprite:{diffuse:{value:new pt(16777215)},opacity:{value:1},center:{value:new Xe(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ye},alphaMap:{value:null},alphaMapTransform:{value:new Ye},alphaTest:{value:0}}},si={basic:{uniforms:mn([_e.common,_e.specularmap,_e.envmap,_e.aomap,_e.lightmap,_e.fog]),vertexShader:tt.meshbasic_vert,fragmentShader:tt.meshbasic_frag},lambert:{uniforms:mn([_e.common,_e.specularmap,_e.envmap,_e.aomap,_e.lightmap,_e.emissivemap,_e.bumpmap,_e.normalmap,_e.displacementmap,_e.fog,_e.lights,{emissive:{value:new pt(0)},envMapIntensity:{value:1}}]),vertexShader:tt.meshlambert_vert,fragmentShader:tt.meshlambert_frag},phong:{uniforms:mn([_e.common,_e.specularmap,_e.envmap,_e.aomap,_e.lightmap,_e.emissivemap,_e.bumpmap,_e.normalmap,_e.displacementmap,_e.fog,_e.lights,{emissive:{value:new pt(0)},specular:{value:new pt(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:tt.meshphong_vert,fragmentShader:tt.meshphong_frag},standard:{uniforms:mn([_e.common,_e.envmap,_e.aomap,_e.lightmap,_e.emissivemap,_e.bumpmap,_e.normalmap,_e.displacementmap,_e.roughnessmap,_e.metalnessmap,_e.fog,_e.lights,{emissive:{value:new pt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:tt.meshphysical_vert,fragmentShader:tt.meshphysical_frag},toon:{uniforms:mn([_e.common,_e.aomap,_e.lightmap,_e.emissivemap,_e.bumpmap,_e.normalmap,_e.displacementmap,_e.gradientmap,_e.fog,_e.lights,{emissive:{value:new pt(0)}}]),vertexShader:tt.meshtoon_vert,fragmentShader:tt.meshtoon_frag},matcap:{uniforms:mn([_e.common,_e.bumpmap,_e.normalmap,_e.displacementmap,_e.fog,{matcap:{value:null}}]),vertexShader:tt.meshmatcap_vert,fragmentShader:tt.meshmatcap_frag},points:{uniforms:mn([_e.points,_e.fog]),vertexShader:tt.points_vert,fragmentShader:tt.points_frag},dashed:{uniforms:mn([_e.common,_e.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:tt.linedashed_vert,fragmentShader:tt.linedashed_frag},depth:{uniforms:mn([_e.common,_e.displacementmap]),vertexShader:tt.depth_vert,fragmentShader:tt.depth_frag},normal:{uniforms:mn([_e.common,_e.bumpmap,_e.normalmap,_e.displacementmap,{opacity:{value:1}}]),vertexShader:tt.meshnormal_vert,fragmentShader:tt.meshnormal_frag},sprite:{uniforms:mn([_e.sprite,_e.fog]),vertexShader:tt.sprite_vert,fragmentShader:tt.sprite_frag},background:{uniforms:{uvTransform:{value:new Ye},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:tt.background_vert,fragmentShader:tt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Ye}},vertexShader:tt.backgroundCube_vert,fragmentShader:tt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:tt.cube_vert,fragmentShader:tt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:tt.equirect_vert,fragmentShader:tt.equirect_frag},distance:{uniforms:mn([_e.common,_e.displacementmap,{referencePosition:{value:new Y},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:tt.distance_vert,fragmentShader:tt.distance_frag},shadow:{uniforms:mn([_e.lights,_e.fog,{color:{value:new pt(0)},opacity:{value:1}}]),vertexShader:tt.shadow_vert,fragmentShader:tt.shadow_frag}};si.physical={uniforms:mn([si.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ye},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ye},clearcoatNormalScale:{value:new Xe(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ye},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ye},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ye},sheen:{value:0},sheenColor:{value:new pt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ye},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ye},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ye},transmissionSamplerSize:{value:new Xe},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ye},attenuationDistance:{value:0},attenuationColor:{value:new pt(0)},specularColor:{value:new pt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ye},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ye},anisotropyVector:{value:new Xe},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ye}}]),vertexShader:tt.meshphysical_vert,fragmentShader:tt.meshphysical_frag};const ns={r:0,b:0,g:0},zg=new Wt,dh=new Ye;dh.set(-1,0,0,0,1,0,0,0,1);function Hg(n,e,t,i,r,a){const o=new pt(0);let l=r===!0?0:1,u,c,h=null,f=0,d=null;function p(_){let E=_.isScene===!0?_.background:null;if(E&&E.isTexture){const S=_.backgroundBlurriness>0;E=e.get(E,S)}return E}function m(_){let E=!1;const S=p(_);S===null?x(o,l):S&&S.isColor&&(x(S,1),E=!0);const R=n.xr.getEnvironmentBlendMode();R==="additive"?t.buffers.color.setClear(0,0,0,1,a):R==="alpha-blend"&&t.buffers.color.setClear(0,0,0,0,a),(n.autoClear||E)&&(t.buffers.depth.setTest(!0),t.buffers.depth.setMask(!0),t.buffers.color.setMask(!0),n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil))}function M(_,E){const S=p(E);S&&(S.isCubeTexture||S.mapping===Cs)?(c===void 0&&(c=new Mn(new Ra(1,1,1),new fn({name:"BackgroundCubeMaterial",uniforms:Xr(si.backgroundCube.uniforms),vertexShader:si.backgroundCube.vertexShader,fragmentShader:si.backgroundCube.fragmentShader,side:yn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(R,A,D){this.matrixWorld.copyPosition(D.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(c)),c.material.uniforms.envMap.value=S,c.material.uniforms.backgroundBlurriness.value=E.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=E.backgroundIntensity,c.material.uniforms.backgroundRotation.value.setFromMatrix4(zg.makeRotationFromEuler(E.backgroundRotation)).transpose(),S.isCubeTexture&&S.isRenderTargetTexture===!1&&c.material.uniforms.backgroundRotation.value.premultiply(dh),c.material.toneMapped=ot.getTransfer(S.colorSpace)!==bt,(h!==S||f!==S.version||d!==n.toneMapping)&&(c.material.needsUpdate=!0,h=S,f=S.version,d=n.toneMapping),c.layers.enableAll(),_.unshift(c,c.geometry,c.material,0,0,null)):S&&S.isTexture&&(u===void 0&&(u=new Mn(new xi(2,2),new fn({name:"BackgroundMaterial",uniforms:Xr(si.background.uniforms),vertexShader:si.background.vertexShader,fragmentShader:si.background.fragmentShader,side:dr,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),u.geometry.deleteAttribute("normal"),Object.defineProperty(u.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(u)),u.material.uniforms.t2D.value=S,u.material.uniforms.backgroundIntensity.value=E.backgroundIntensity,u.material.toneMapped=ot.getTransfer(S.colorSpace)!==bt,S.matrixAutoUpdate===!0&&S.updateMatrix(),u.material.uniforms.uvTransform.value.copy(S.matrix),(h!==S||f!==S.version||d!==n.toneMapping)&&(u.material.needsUpdate=!0,h=S,f=S.version,d=n.toneMapping),u.layers.enableAll(),_.unshift(u,u.geometry,u.material,0,0,null))}function x(_,E){_.getRGB(ns,oh(n)),t.buffers.color.setClear(ns.r,ns.g,ns.b,E,a)}function g(){c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0),u!==void 0&&(u.geometry.dispose(),u.material.dispose(),u=void 0)}return{getClearColor:function(){return o},setClearColor:function(_,E=1){o.set(_),l=E,x(o,l)},getClearAlpha:function(){return l},setClearAlpha:function(_){l=_,x(o,l)},render:m,addToRenderList:M,dispose:g}}function Gg(n,e){const t=n.getParameter(n.MAX_VERTEX_ATTRIBS),i={},r=d(null);let a=r,o=!1;function l(C,N,O,I,B){let W=!1;const $=f(C,I,O,N);a!==$&&(a=$,c(a.object)),W=p(C,I,O,B),W&&m(C,I,O,B),B!==null&&e.update(B,n.ELEMENT_ARRAY_BUFFER),(W||o)&&(o=!1,S(C,N,O,I),B!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,e.get(B).buffer))}function u(){return n.createVertexArray()}function c(C){return n.bindVertexArray(C)}function h(C){return n.deleteVertexArray(C)}function f(C,N,O,I){const B=I.wireframe===!0;let W=i[N.id];W===void 0&&(W={},i[N.id]=W);const $=C.isInstancedMesh===!0?C.id:0;let ae=W[$];ae===void 0&&(ae={},W[$]=ae);let q=ae[O.id];q===void 0&&(q={},ae[O.id]=q);let ee=q[B];return ee===void 0&&(ee=d(u()),q[B]=ee),ee}function d(C){const N=[],O=[],I=[];for(let B=0;B<t;B++)N[B]=0,O[B]=0,I[B]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:N,enabledAttributes:O,attributeDivisors:I,object:C,attributes:{},index:null}}function p(C,N,O,I){const B=a.attributes,W=N.attributes;let $=0;const ae=O.getAttributes();for(const q in ae)if(ae[q].location>=0){const F=B[q];let re=W[q];if(re===void 0&&(q==="instanceMatrix"&&C.instanceMatrix&&(re=C.instanceMatrix),q==="instanceColor"&&C.instanceColor&&(re=C.instanceColor)),F===void 0||F.attribute!==re||re&&F.data!==re.data)return!0;$++}return a.attributesNum!==$||a.index!==I}function m(C,N,O,I){const B={},W=N.attributes;let $=0;const ae=O.getAttributes();for(const q in ae)if(ae[q].location>=0){let F=W[q];F===void 0&&(q==="instanceMatrix"&&C.instanceMatrix&&(F=C.instanceMatrix),q==="instanceColor"&&C.instanceColor&&(F=C.instanceColor));const re={};re.attribute=F,F&&F.data&&(re.data=F.data),B[q]=re,$++}a.attributes=B,a.attributesNum=$,a.index=I}function M(){const C=a.newAttributes;for(let N=0,O=C.length;N<O;N++)C[N]=0}function x(C){g(C,0)}function g(C,N){const O=a.newAttributes,I=a.enabledAttributes,B=a.attributeDivisors;O[C]=1,I[C]===0&&(n.enableVertexAttribArray(C),I[C]=1),B[C]!==N&&(n.vertexAttribDivisor(C,N),B[C]=N)}function _(){const C=a.newAttributes,N=a.enabledAttributes;for(let O=0,I=N.length;O<I;O++)N[O]!==C[O]&&(n.disableVertexAttribArray(O),N[O]=0)}function E(C,N,O,I,B,W,$){$===!0?n.vertexAttribIPointer(C,N,O,B,W):n.vertexAttribPointer(C,N,O,I,B,W)}function S(C,N,O,I){M();const B=I.attributes,W=O.getAttributes(),$=N.defaultAttributeValues;for(const ae in W){const q=W[ae];if(q.location>=0){let ee=B[ae];if(ee===void 0&&(ae==="instanceMatrix"&&C.instanceMatrix&&(ee=C.instanceMatrix),ae==="instanceColor"&&C.instanceColor&&(ee=C.instanceColor)),ee!==void 0){const F=ee.normalized,re=ee.itemSize,ue=e.get(ee);if(ue===void 0)continue;const Re=ue.buffer,Be=ue.type,We=ue.bytesPerElement,j=Be===n.INT||Be===n.UNSIGNED_INT||ee.gpuType===Dl;if(ee.isInterleavedBufferAttribute){const ie=ee.data,G=ie.stride,he=ee.offset;if(ie.isInstancedInterleavedBuffer){for(let se=0;se<q.locationSize;se++)g(q.location+se,ie.meshPerAttribute);C.isInstancedMesh!==!0&&I._maxInstanceCount===void 0&&(I._maxInstanceCount=ie.meshPerAttribute*ie.count)}else for(let se=0;se<q.locationSize;se++)x(q.location+se);n.bindBuffer(n.ARRAY_BUFFER,Re);for(let se=0;se<q.locationSize;se++)E(q.location+se,re/q.locationSize,Be,F,G*We,(he+re/q.locationSize*se)*We,j)}else{if(ee.isInstancedBufferAttribute){for(let ie=0;ie<q.locationSize;ie++)g(q.location+ie,ee.meshPerAttribute);C.isInstancedMesh!==!0&&I._maxInstanceCount===void 0&&(I._maxInstanceCount=ee.meshPerAttribute*ee.count)}else for(let ie=0;ie<q.locationSize;ie++)x(q.location+ie);n.bindBuffer(n.ARRAY_BUFFER,Re);for(let ie=0;ie<q.locationSize;ie++)E(q.location+ie,re/q.locationSize,Be,F,re*We,re/q.locationSize*ie*We,j)}}else if($!==void 0){const F=$[ae];if(F!==void 0)switch(F.length){case 2:n.vertexAttrib2fv(q.location,F);break;case 3:n.vertexAttrib3fv(q.location,F);break;case 4:n.vertexAttrib4fv(q.location,F);break;default:n.vertexAttrib1fv(q.location,F)}}}}_()}function R(){w();for(const C in i){const N=i[C];for(const O in N){const I=N[O];for(const B in I){const W=I[B];for(const $ in W)h(W[$].object),delete W[$];delete I[B]}}delete i[C]}}function A(C){if(i[C.id]===void 0)return;const N=i[C.id];for(const O in N){const I=N[O];for(const B in I){const W=I[B];for(const $ in W)h(W[$].object),delete W[$];delete I[B]}}delete i[C.id]}function D(C){for(const N in i){const O=i[N];for(const I in O){const B=O[I];if(B[C.id]===void 0)continue;const W=B[C.id];for(const $ in W)h(W[$].object),delete W[$];delete B[C.id]}}}function b(C){for(const N in i){const O=i[N],I=C.isInstancedMesh===!0?C.id:0,B=O[I];if(B!==void 0){for(const W in B){const $=B[W];for(const ae in $)h($[ae].object),delete $[ae];delete B[W]}delete O[I],Object.keys(O).length===0&&delete i[N]}}}function w(){L(),o=!0,a!==r&&(a=r,c(a.object))}function L(){r.geometry=null,r.program=null,r.wireframe=!1}return{setup:l,reset:w,resetDefaultState:L,dispose:R,releaseStatesOfGeometry:A,releaseStatesOfObject:b,releaseStatesOfProgram:D,initAttributes:M,enableAttribute:x,disableUnusedAttributes:_}}function Wg(n,e,t){let i;function r(u){i=u}function a(u,c){n.drawArrays(i,u,c),t.update(c,i,1)}function o(u,c,h){h!==0&&(n.drawArraysInstanced(i,u,c,h),t.update(c,i,h))}function l(u,c,h){if(h===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,u,0,c,0,h);let d=0;for(let p=0;p<h;p++)d+=c[p];t.update(d,i,1)}this.setMode=r,this.render=a,this.renderInstances=o,this.renderMultiDraw=l}function Vg(n,e,t,i){let r;function a(){if(r!==void 0)return r;if(e.has("EXT_texture_filter_anisotropic")===!0){const D=e.get("EXT_texture_filter_anisotropic");r=n.getParameter(D.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else r=0;return r}function o(D){return!(D!==Fn&&i.convert(D)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_FORMAT))}function l(D){const b=D===mi&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(D!==Rn&&D!==ci&&!b&&i.convert(D)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_TYPE))}function u(D){if(D==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";D="mediump"}return D==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp";const h=u(c);h!==c&&(Ve("WebGLRenderer:",c,"not supported, using",h,"instead."),c=h);const f=t.logarithmicDepthBuffer===!0,d=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control");t.reversedDepthBuffer===!0&&d===!1&&Ve("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");const p=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),m=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),M=n.getParameter(n.MAX_TEXTURE_SIZE),x=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),g=n.getParameter(n.MAX_VERTEX_ATTRIBS),_=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),E=n.getParameter(n.MAX_VARYING_VECTORS),S=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),R=n.getParameter(n.MAX_SAMPLES),A=n.getParameter(n.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:a,getMaxPrecision:u,textureFormatReadable:o,textureTypeReadable:l,precision:c,logarithmicDepthBuffer:f,reversedDepthBuffer:d,maxTextures:p,maxVertexTextures:m,maxTextureSize:M,maxCubemapSize:x,maxAttributes:g,maxVertexUniforms:_,maxVaryings:E,maxFragmentUniforms:S,maxSamples:R,samples:A}}function Yg(n){const e=this;let t=null,i=0,r=!1,a=!1;const o=new Yi,l=new Ye,u={value:null,needsUpdate:!1};this.uniform=u,this.numPlanes=0,this.numIntersection=0,this.init=function(f,d){const p=f.length!==0||d||i!==0||r;return r=d,i=f.length,p},this.beginShadows=function(){a=!0,h(null)},this.endShadows=function(){a=!1},this.setGlobalState=function(f,d){t=h(f,d,0)},this.setState=function(f,d,p){const m=f.clippingPlanes,M=f.clipIntersection,x=f.clipShadows,g=n.get(f);if(!r||m===null||m.length===0||a&&!x)a?h(null):c();else{const _=a?0:i,E=_*4;let S=g.clippingState||null;u.value=S,S=h(m,d,E,p);for(let R=0;R!==E;++R)S[R]=t[R];g.clippingState=S,this.numIntersection=M?this.numPlanes:0,this.numPlanes+=_}};function c(){u.value!==t&&(u.value=t,u.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function h(f,d,p,m){const M=f!==null?f.length:0;let x=null;if(M!==0){if(x=u.value,m!==!0||x===null){const g=p+M*4,_=d.matrixWorldInverse;l.getNormalMatrix(_),(x===null||x.length<g)&&(x=new Float32Array(g));for(let E=0,S=p;E!==M;++E,S+=4)o.copy(f[E]).applyMatrix4(_,l),o.normal.toArray(x,S),x[S+3]=o.constant}u.value=x,u.needsUpdate=!0}return e.numPlanes=M,e.numIntersection=0,x}}const kr=4,Xg=6,Kg=20,qg=256,oa=new Gl,Oc=new pt;let po=null,mo=0,go=0,xo=!1;const Zg=new Y,nr=new Y;class Fc{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,i=.1,r=100,a={}){const{size:o=256,position:l=Zg}=a;po=this._renderer.getRenderTarget(),mo=this._renderer.getActiveCubeFace(),go=this._renderer.getActiveMipmapLevel(),xo=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(o);const u=this._allocateTargets();return u.depthBuffer=!0,this._sceneToCubeUV(e,i,r,u,l),t>0&&this._blur(u,0,0,t),this._applyPMREM(u),this._cleanup(u),u}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=kc(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Bc(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(po,mo,go),this._renderer.xr.enabled=xo,e.scissorTest=!1,Pr(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===fr||e.mapping===Yr?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),po=this._renderer.getRenderTarget(),mo=this._renderer.getActiveCubeFace(),go=this._renderer.getActiveMipmapLevel(),xo=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=t||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,i={magFilter:Yt,minFilter:Yt,generateMipmaps:!1,type:mi,format:Fn,colorSpace:Ea,depthBuffer:!1},r=Uc(e,t,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Uc(e,t,i);const{_lodMax:a}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods}=$g(a)),this._blurMaterial=Qg(a,e,t),this._ggxMaterial=Jg(a,e,t)}return r}_compileMaterial(e){const t=new Mn(new gi,e);this._renderer.compile(t,oa)}_sceneToCubeUV(e,t,i,r,a){const u=new Nn(90,1,t,i),c=[1,-1,1,1,1,1],h=[1,1,1,-1,-1,-1],f=this._renderer,d=f.autoClear,p=f.toneMapping;f.getClearColor(Oc),f.toneMapping=hi,f.autoClear=!1,f.state.buffers.depth.getReversed()&&(f.setRenderTarget(r),f.clearDepth(),f.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new Mn(new Ra,new ih({name:"PMREM.Background",side:yn,depthWrite:!1,depthTest:!1})));const M=this._backgroundBox,x=M.material;let g=!1;const _=e.background;_?_.isColor&&(x.color.copy(_),e.background=null,g=!0):(x.color.copy(Oc),g=!0);for(let E=0;E<6;E++){const S=E%3;S===0?(u.up.set(0,c[E],0),u.position.set(a.x,a.y,a.z),u.lookAt(a.x+h[E],a.y,a.z)):S===1?(u.up.set(0,0,c[E]),u.position.set(a.x,a.y,a.z),u.lookAt(a.x,a.y+h[E],a.z)):(u.up.set(0,c[E],0),u.position.set(a.x,a.y,a.z),u.lookAt(a.x,a.y,a.z+h[E]));const R=this._cubeSize;Pr(r,S*R,E>2?R:0,R,R),f.setRenderTarget(r),g&&f.render(M,u),f.render(e,u)}f.toneMapping=p,f.autoClear=d,e.background=_}_textureToCubeUV(e,t){const i=this._renderer,r=e.mapping===fr||e.mapping===Yr;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=kc()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Bc());const a=r?this._cubemapMaterial:this._equirectMaterial,o=this._lodMeshes[0];o.material=a;const l=a.uniforms;l.envMap.value=e;const u=this._cubeSize;Pr(t,0,0,3*u,2*u),i.setRenderTarget(t),i.render(o,oa)}_applyPMREM(e){const t=this._renderer,i=t.autoClear;t.autoClear=!1;const r=this._lodMeshes.length;for(let a=1;a<r;a++)this._applyGGXFilter(e,a-1,a);t.autoClear=i}_applyGGXFilter(e,t,i){const r=this._renderer,a=this._pingPongRenderTarget,o=this._ggxMaterial,l=this._lodMeshes[i];l.material=o;const u=o.uniforms,c=i/(this._lodMeshes.length-1),h=t/(this._lodMeshes.length-1),f=Math.sqrt(c*c-h*h),d=c*1.25,p=f*d,{_lodMax:m}=this,M=this._sizeLods[i],x=3*M*(i>m-kr?i-m+kr:0),g=4*(this._cubeSize-M);u.envMap.value=e.texture,u.roughness.value=p,u.mipInt.value=m-t,Pr(a,x,g,3*M,2*M),r.setRenderTarget(a),r.render(l,oa),u.envMap.value=a.texture,u.roughness.value=0,u.mipInt.value=m-i,Pr(e,x,g,3*M,2*M),r.setRenderTarget(e),r.render(l,oa)}_blur(e,t,i,r){const a=this._pingPongRenderTarget,o=Math.min(r,Math.PI)/Math.SQRT2;this._blurPass(e,a,t,i,o),this._blurPass(a,e,i,i,o)}_blurPass(e,t,i,r,a){const o=this._renderer,l=this._blurMaterial,u=this._lodMeshes[r];u.material=l;const c=l.uniforms;c.envMap.value=e.texture,c.sigma.value=a,c.mipInt.value=this._lodMax-i;const h=this._sizeLods[r],f=3*h*(r>this._lodMax-kr?r-this._lodMax+kr:0),d=4*(this._cubeSize-h);Pr(t,f,d,3*h,2*h),o.setRenderTarget(t),o.render(u,oa)}}function $g(n){const e=[],t=[];let i=n;const r=n-kr+1+Xg;for(let a=0;a<r;a++){const o=Math.pow(2,i);e.push(o);const l=1/(o-2),u=-l,c=1+l,h=[u,u,c,u,c,c,u,u,c,c,u,c],f=6,d=6,p=3,m=new Float32Array(p*d*f),M=new Float32Array(p*d*f);for(let g=0;g<f;g++){const _=g%3*2/3-1,E=g>2?0:-1,S=[_,E,0,_+2/3,E,0,_+2/3,E+1,0,_,E,0,_+2/3,E+1,0,_,E+1,0];m.set(S,p*d*g);for(let R=0;R<d;R++){const A=h[R*2]*2-1,D=h[R*2+1]*2-1;g===0?nr.set(1,D,A):g===1?nr.set(-A,1,-D):g===2?nr.set(-A,D,1):g===3?nr.set(-1,D,-A):g===4?nr.set(-A,-1,D):nr.set(A,D,-1),nr.toArray(M,(g*d+R)*p)}}const x=new gi;x.setAttribute("position",new di(m,p)),x.setAttribute("outputDirection",new di(M,p)),t.push(new Mn(x,null)),i>kr&&i--}return{lodMeshes:t,sizeLods:e}}function Uc(n,e,t){const i=new Un(n,e,t);return i.texture.mapping=Cs,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function Pr(n,e,t,i,r){n.viewport.set(e,t,i,r),n.scissor.set(e,t,i,r)}function Jg(n,e,t){return new fn({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:qg,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:Ds(),fragmentShader:`

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
		`,blending:Ci,depthTest:!1,depthWrite:!1})}function Qg(n,e,t){return new fn({name:"SphericalGaussianBlur",defines:{SAMPLES:Kg,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},sigma:{value:0},mipInt:{value:0}},vertexShader:Ds(),fragmentShader:`

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
		`,blending:Ci,depthTest:!1,depthWrite:!1})}function Bc(){return new fn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Ds(),fragmentShader:`

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
		`,blending:Ci,depthTest:!1,depthWrite:!1})}function kc(){return new fn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Ds(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Ci,depthTest:!1,depthWrite:!1})}function Ds(){return`

		precision mediump float;
		precision mediump int;

		attribute vec3 outputDirection;

		varying vec3 vOutputDirection;

		void main() {

			vOutputDirection = outputDirection;
			gl_Position = vec4( position, 1.0 );

		}
	`}class fh extends Un{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const i={width:e,height:e,depth:1},r=[i,i,i,i,i,i];this.texture=new ah(r),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},r=new Ra(5,5,5),a=new fn({name:"CubemapFromEquirect",uniforms:Xr(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:yn,blending:Ci});a.uniforms.tEquirect.value=t;const o=new Mn(r,a),l=t.minFilter;return t.minFilter===or&&(t.minFilter=Yt),new nm(1,10,this).update(e,o),t.minFilter=l,o.geometry.dispose(),o.material.dispose(),this}clear(e,t=!0,i=!0,r=!0){const a=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(t,i,r);e.setRenderTarget(a)}}function jg(n){let e=new WeakMap,t=new WeakMap,i=null;function r(d,p=!1){return d==null?null:p?o(d):a(d)}function a(d){if(d&&d.isTexture){const p=d.mapping;if(p===Hs||p===Gs)if(e.has(d)){const m=e.get(d).texture;return l(m,d.mapping)}else{const m=d.image;if(m&&m.height>0){const M=new fh(m.height);return M.fromEquirectangularTexture(n,d),e.set(d,M),d.addEventListener("dispose",c),l(M.texture,d.mapping)}else return null}}return d}function o(d){if(d&&d.isTexture){const p=d.mapping,m=p===Hs||p===Gs,M=p===fr||p===Yr;if(m||M){let x=t.get(d);const g=x!==void 0?x.texture.pmremVersion:0;if(d.isRenderTargetTexture&&d.pmremVersion!==g)return i===null&&(i=new Fc(n)),x=m?i.fromEquirectangular(d,x):i.fromCubemap(d,x),x.texture.pmremVersion=d.pmremVersion,t.set(d,x),x.texture;if(x!==void 0)return x.texture;{const _=d.image;return m&&_&&_.height>0||M&&_&&u(_)?(i===null&&(i=new Fc(n)),x=m?i.fromEquirectangular(d):i.fromCubemap(d),x.texture.pmremVersion=d.pmremVersion,t.set(d,x),d.addEventListener("dispose",h),x.texture):null}}}return d}function l(d,p){return p===Hs?d.mapping=fr:p===Gs&&(d.mapping=Yr),d}function u(d){let p=0;const m=6;for(let M=0;M<m;M++)d[M]!==void 0&&p++;return p===m}function c(d){const p=d.target;p.removeEventListener("dispose",c);const m=e.get(p);m!==void 0&&(e.delete(p),m.dispose())}function h(d){const p=d.target;p.removeEventListener("dispose",h);const m=t.get(p);m!==void 0&&(t.delete(p),m.dispose())}function f(){e=new WeakMap,t=new WeakMap,i!==null&&(i.dispose(),i=null)}return{get:r,dispose:f}}function e2(n){const e={};function t(i){if(e[i]!==void 0)return e[i];const r=n.getExtension(i);return e[i]=r,r}return{has:function(i){return t(i)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(i){const r=t(i);return r===null&&Hr("WebGLRenderer: "+i+" extension not supported."),r}}}function t2(n,e,t,i){const r={},a=new WeakMap;function o(f){const d=f.target;d.index!==null&&e.remove(d.index);for(const m in d.attributes)e.remove(d.attributes[m]);d.removeEventListener("dispose",o),delete r[d.id];const p=a.get(d);p&&(e.remove(p),a.delete(d)),i.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,t.memory.geometries--}function l(f,d){return r[d.id]===!0||(d.addEventListener("dispose",o),r[d.id]=!0,t.memory.geometries++),d}function u(f){const d=f.attributes;for(const p in d)e.update(d[p],n.ARRAY_BUFFER)}function c(f){const d=[],p=f.index,m=f.attributes.position;let M=0;if(m===void 0)return;if(p!==null){const _=p.array;M=p.version;for(let E=0,S=_.length;E<S;E+=3){const R=_[E+0],A=_[E+1],D=_[E+2];d.push(R,A,A,D,D,R)}}else{const _=m.array;M=m.version;for(let E=0,S=_.length/3-1;E<S;E+=3){const R=E+0,A=E+1,D=E+2;d.push(R,A,A,D,D,R)}}const x=new(m.count>=65535?nh:th)(d,1);x.version=M;const g=a.get(f);g&&e.remove(g),a.set(f,x)}function h(f){const d=a.get(f);if(d){const p=f.index;p!==null&&d.version<p.version&&c(f)}else c(f);return a.get(f)}return{get:l,update:u,getWireframeAttribute:h}}function n2(n,e,t){let i;function r(f){i=f}let a,o;function l(f){a=f.type,o=f.bytesPerElement}function u(f,d){n.drawElements(i,d,a,f*o),t.update(d,i,1)}function c(f,d,p){p!==0&&(n.drawElementsInstanced(i,d,a,f*o,p),t.update(d,i,p))}function h(f,d,p){if(p===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,d,0,a,f,0,p);let M=0;for(let x=0;x<p;x++)M+=d[x];t.update(M,i,1)}this.setMode=r,this.setIndex=l,this.render=u,this.renderInstances=c,this.renderMultiDraw=h}function i2(n){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function i(a,o,l){switch(t.calls++,o){case n.TRIANGLES:t.triangles+=l*(a/3);break;case n.LINES:t.lines+=l*(a/2);break;case n.LINE_STRIP:t.lines+=l*(a-1);break;case n.LINE_LOOP:t.lines+=l*a;break;case n.POINTS:t.points+=l*a;break;default:ht("WebGLInfo: Unknown draw mode:",o);break}}function r(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:r,update:i}}function r2(n,e,t){const i=new WeakMap,r=new Ft;function a(o,l,u){const c=o.morphTargetInfluences,h=l.morphAttributes.position||l.morphAttributes.normal||l.morphAttributes.color,f=h!==void 0?h.length:0;let d=i.get(l);if(d===void 0||d.count!==f){let w=function(){D.dispose(),i.delete(l),l.removeEventListener("dispose",w)};d!==void 0&&d.texture.dispose();const p=l.morphAttributes.position!==void 0,m=l.morphAttributes.normal!==void 0,M=l.morphAttributes.color!==void 0,x=l.morphAttributes.position||[],g=l.morphAttributes.normal||[],_=l.morphAttributes.color||[];let E=0;p===!0&&(E=1),m===!0&&(E=2),M===!0&&(E=3);let S=l.attributes.position.count*E,R=1;S>e.maxTextureSize&&(R=Math.ceil(S/e.maxTextureSize),S=e.maxTextureSize);const A=new Float32Array(S*R*4*f),D=new Qu(A,S,R,f);D.type=ci,D.needsUpdate=!0;const b=E*4;for(let L=0;L<f;L++){const C=x[L],N=g[L],O=_[L],I=S*R*4*L;for(let B=0;B<C.count;B++){const W=B*b;p===!0&&(r.fromBufferAttribute(C,B),A[I+W+0]=r.x,A[I+W+1]=r.y,A[I+W+2]=r.z,A[I+W+3]=0),m===!0&&(r.fromBufferAttribute(N,B),A[I+W+4]=r.x,A[I+W+5]=r.y,A[I+W+6]=r.z,A[I+W+7]=0),M===!0&&(r.fromBufferAttribute(O,B),A[I+W+8]=r.x,A[I+W+9]=r.y,A[I+W+10]=r.z,A[I+W+11]=O.itemSize===4?r.w:1)}}d={count:f,texture:D,size:new Xe(S,R)},i.set(l,d),l.addEventListener("dispose",w)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)u.getUniforms().setValue(n,"morphTexture",o.morphTexture,t);else{let p=0;for(let M=0;M<c.length;M++)p+=c[M];const m=l.morphTargetsRelative?1:1-p;u.getUniforms().setValue(n,"morphTargetBaseInfluence",m),u.getUniforms().setValue(n,"morphTargetInfluences",c)}u.getUniforms().setValue(n,"morphTargetsTexture",d.texture,t),u.getUniforms().setValue(n,"morphTargetsTextureSize",d.size)}return{update:a}}function a2(n,e,t,i,r){let a=new WeakMap;function o(c){const h=r.render.frame,f=c.geometry,d=e.get(c,f);if(a.get(d)!==h&&(e.update(d),a.set(d,h)),c.isInstancedMesh&&(c.hasEventListener("dispose",u)===!1&&c.addEventListener("dispose",u),a.get(c)!==h&&(t.update(c.instanceMatrix,n.ARRAY_BUFFER),c.instanceColor!==null&&t.update(c.instanceColor,n.ARRAY_BUFFER),a.set(c,h))),c.isSkinnedMesh){const p=c.skeleton;a.get(p)!==h&&(p.update(),a.set(p,h))}return d}function l(){a=new WeakMap}function u(c){const h=c.target;h.removeEventListener("dispose",u),i.releaseStatesOfObject(h),t.remove(h.instanceMatrix),h.instanceColor!==null&&t.remove(h.instanceColor)}return{update:o,dispose:l}}const s2={[Ou]:"LINEAR_TONE_MAPPING",[Fu]:"REINHARD_TONE_MAPPING",[Uu]:"CINEON_TONE_MAPPING",[Bu]:"ACES_FILMIC_TONE_MAPPING",[zu]:"AGX_TONE_MAPPING",[Hu]:"NEUTRAL_TONE_MAPPING",[ku]:"CUSTOM_TONE_MAPPING"};function o2(n,e,t,i,r,a){const o=new Un(e,t,{type:n,depthBuffer:r,stencilBuffer:a,samples:i?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1});let l=null,u=null;const c=new gi;c.setAttribute("position",new Di([-1,3,0,-1,-1,0,3,-1,0],3)),c.setAttribute("uv",new Di([0,2,0,0,2,0],2));const h=new jp({uniforms:{tDiffuse:{value:null}},vertexShader:`
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
			}`,depthTest:!1,depthWrite:!1}),f=new Mn(c,h),d=new Gl(-1,1,1,-1,0,1);let p=null,m=null,M=!1,x,g=null,_=[],E=!1;this.setSize=function(S,R){o.setSize(S,R),l!==null&&l.setSize(S,R),u!==null&&u.setSize(S,R);for(let A=0;A<_.length;A++){const D=_[A];D.setSize&&D.setSize(S,R)}},this.setEffects=function(S){_=S,E=_.length>0&&_[0].isRenderPass===!0;const R=o.width,A=o.height;_.length>0&&l===null&&(l=new Un(R,A,{type:mi,depthBuffer:!1,stencilBuffer:!1}),u=new Un(R,A,{type:mi,depthBuffer:!1,stencilBuffer:!1}));for(let D=0;D<_.length;D++){const b=_[D];b.setSize&&b.setSize(R,A)}},this.begin=function(S,R){if(M||S.toneMapping===hi&&_.length===0)return!1;if(g=R,R!==null){const A=R.width,D=R.height;(o.width!==A||o.height!==D)&&this.setSize(A,D)}return E===!1&&S.setRenderTarget(o),x=S.toneMapping,S.toneMapping=hi,!0},this.hasRenderPass=function(){return E},this.end=function(S,R){S.toneMapping=x,M=!0;let A=o,D=l;for(let b=0;b<_.length;b++){const w=_[b];w.enabled!==!1&&(w.render(S,D,A,R),w.needsSwap!==!1&&(A=D,D=D===l?u:l))}if(p!==S.outputColorSpace||m!==S.toneMapping){p=S.outputColorSpace,m=S.toneMapping,h.defines={},ot.getTransfer(p)===bt&&(h.defines.SRGB_TRANSFER="");const b=s2[m];b&&(h.defines[b]=""),h.needsUpdate=!0}h.uniforms.tDiffuse.value=A.texture,S.setRenderTarget(g),S.render(f,d),g=null,M=!1},this.isCompositing=function(){return M},this.dispose=function(){o.dispose(),l!==null&&l.dispose(),u!==null&&u.dispose(),c.dispose(),h.dispose()}}const ph=new xn,pl=new ya(1,1),mh=new Qu,gh=new Lp,xh=new ah,zc=[],Hc=[],Gc=new Float32Array(16),Wc=new Float32Array(9),Vc=new Float32Array(4);function Qr(n,e,t){const i=n[0];if(i<=0||i>0)return n;const r=e*t;let a=zc[r];if(a===void 0&&(a=new Float32Array(r),zc[r]=a),e!==0){i.toArray(a,0);for(let o=1,l=0;o!==e;++o)l+=t,n[o].toArray(a,l)}return a}function Jt(n,e){if(n.length!==e.length)return!1;for(let t=0,i=n.length;t<i;t++)if(n[t]!==e[t])return!1;return!0}function Qt(n,e){for(let t=0,i=e.length;t<i;t++)n[t]=e[t]}function Ps(n,e){let t=Hc[e];t===void 0&&(t=new Int32Array(e),Hc[e]=t);for(let i=0;i!==e;++i)t[i]=n.allocateTextureUnit();return t}function l2(n,e){const t=this.cache;t[0]!==e&&(n.uniform1f(this.addr,e),t[0]=e)}function c2(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Jt(t,e))return;n.uniform2fv(this.addr,e),Qt(t,e)}}function u2(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(n.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Jt(t,e))return;n.uniform3fv(this.addr,e),Qt(t,e)}}function h2(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Jt(t,e))return;n.uniform4fv(this.addr,e),Qt(t,e)}}function d2(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(Jt(t,e))return;n.uniformMatrix2fv(this.addr,!1,e),Qt(t,e)}else{if(Jt(t,i))return;Vc.set(i),n.uniformMatrix2fv(this.addr,!1,Vc),Qt(t,i)}}function f2(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(Jt(t,e))return;n.uniformMatrix3fv(this.addr,!1,e),Qt(t,e)}else{if(Jt(t,i))return;Wc.set(i),n.uniformMatrix3fv(this.addr,!1,Wc),Qt(t,i)}}function p2(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(Jt(t,e))return;n.uniformMatrix4fv(this.addr,!1,e),Qt(t,e)}else{if(Jt(t,i))return;Gc.set(i),n.uniformMatrix4fv(this.addr,!1,Gc),Qt(t,i)}}function m2(n,e){const t=this.cache;t[0]!==e&&(n.uniform1i(this.addr,e),t[0]=e)}function g2(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Jt(t,e))return;n.uniform2iv(this.addr,e),Qt(t,e)}}function x2(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Jt(t,e))return;n.uniform3iv(this.addr,e),Qt(t,e)}}function M2(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Jt(t,e))return;n.uniform4iv(this.addr,e),Qt(t,e)}}function _2(n,e){const t=this.cache;t[0]!==e&&(n.uniform1ui(this.addr,e),t[0]=e)}function v2(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Jt(t,e))return;n.uniform2uiv(this.addr,e),Qt(t,e)}}function b2(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Jt(t,e))return;n.uniform3uiv(this.addr,e),Qt(t,e)}}function S2(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Jt(t,e))return;n.uniform4uiv(this.addr,e),Qt(t,e)}}function E2(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r);let a;this.type===n.SAMPLER_2D_SHADOW?(pl.compareFunction=t.isReversedDepthBuffer()?Bl:Ul,a=pl):a=ph,t.setTexture2D(e||a,r)}function y2(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTexture3D(e||gh,r)}function w2(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTextureCube(e||xh,r)}function A2(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTexture2DArray(e||mh,r)}function T2(n){switch(n){case 5126:return l2;case 35664:return c2;case 35665:return u2;case 35666:return h2;case 35674:return d2;case 35675:return f2;case 35676:return p2;case 5124:case 35670:return m2;case 35667:case 35671:return g2;case 35668:case 35672:return x2;case 35669:case 35673:return M2;case 5125:return _2;case 36294:return v2;case 36295:return b2;case 36296:return S2;case 35678:case 36198:case 36298:case 36306:case 35682:return E2;case 35679:case 36299:case 36307:return y2;case 35680:case 36300:case 36308:case 36293:return w2;case 36289:case 36303:case 36311:case 36292:return A2}}function R2(n,e){n.uniform1fv(this.addr,e)}function C2(n,e){const t=Qr(e,this.size,2);n.uniform2fv(this.addr,t)}function L2(n,e){const t=Qr(e,this.size,3);n.uniform3fv(this.addr,t)}function D2(n,e){const t=Qr(e,this.size,4);n.uniform4fv(this.addr,t)}function P2(n,e){const t=Qr(e,this.size,4);n.uniformMatrix2fv(this.addr,!1,t)}function I2(n,e){const t=Qr(e,this.size,9);n.uniformMatrix3fv(this.addr,!1,t)}function N2(n,e){const t=Qr(e,this.size,16);n.uniformMatrix4fv(this.addr,!1,t)}function O2(n,e){n.uniform1iv(this.addr,e)}function F2(n,e){n.uniform2iv(this.addr,e)}function U2(n,e){n.uniform3iv(this.addr,e)}function B2(n,e){n.uniform4iv(this.addr,e)}function k2(n,e){n.uniform1uiv(this.addr,e)}function z2(n,e){n.uniform2uiv(this.addr,e)}function H2(n,e){n.uniform3uiv(this.addr,e)}function G2(n,e){n.uniform4uiv(this.addr,e)}function W2(n,e,t){const i=this.cache,r=e.length,a=Ps(t,r);Jt(i,a)||(n.uniform1iv(this.addr,a),Qt(i,a));let o;this.type===n.SAMPLER_2D_SHADOW?o=pl:o=ph;for(let l=0;l!==r;++l)t.setTexture2D(e[l]||o,a[l])}function V2(n,e,t){const i=this.cache,r=e.length,a=Ps(t,r);Jt(i,a)||(n.uniform1iv(this.addr,a),Qt(i,a));for(let o=0;o!==r;++o)t.setTexture3D(e[o]||gh,a[o])}function Y2(n,e,t){const i=this.cache,r=e.length,a=Ps(t,r);Jt(i,a)||(n.uniform1iv(this.addr,a),Qt(i,a));for(let o=0;o!==r;++o)t.setTextureCube(e[o]||xh,a[o])}function X2(n,e,t){const i=this.cache,r=e.length,a=Ps(t,r);Jt(i,a)||(n.uniform1iv(this.addr,a),Qt(i,a));for(let o=0;o!==r;++o)t.setTexture2DArray(e[o]||mh,a[o])}function K2(n){switch(n){case 5126:return R2;case 35664:return C2;case 35665:return L2;case 35666:return D2;case 35674:return P2;case 35675:return I2;case 35676:return N2;case 5124:case 35670:return O2;case 35667:case 35671:return F2;case 35668:case 35672:return U2;case 35669:case 35673:return B2;case 5125:return k2;case 36294:return z2;case 36295:return H2;case 36296:return G2;case 35678:case 36198:case 36298:case 36306:case 35682:return W2;case 35679:case 36299:case 36307:return V2;case 35680:case 36300:case 36308:case 36293:return Y2;case 36289:case 36303:case 36311:case 36292:return X2}}class q2{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.setValue=T2(t.type)}}class Z2{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=K2(t.type)}}class $2{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,i){const r=this.seq;for(let a=0,o=r.length;a!==o;++a){const l=r[a];l.setValue(e,t[l.id],i)}}}const Mo=/(\w+)(\])?(\[|\.)?/g;function Yc(n,e){n.seq.push(e),n.map[e.id]=e}function J2(n,e,t){const i=n.name,r=i.length;for(Mo.lastIndex=0;;){const a=Mo.exec(i),o=Mo.lastIndex;let l=a[1];const u=a[2]==="]",c=a[3];if(u&&(l=l|0),c===void 0||c==="["&&o+2===r){Yc(t,c===void 0?new q2(l,n,e):new Z2(l,n,e));break}else{let f=t.map[l];f===void 0&&(f=new $2(l),Yc(t,f)),t=f}}}class gs{constructor(e,t){this.seq=[],this.map={};const i=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let o=0;o<i;++o){const l=e.getActiveUniform(t,o),u=e.getUniformLocation(t,l.name);J2(l,u,this)}const r=[],a=[];for(const o of this.seq)o.type===e.SAMPLER_2D_SHADOW||o.type===e.SAMPLER_CUBE_SHADOW||o.type===e.SAMPLER_2D_ARRAY_SHADOW?r.push(o):a.push(o);r.length>0&&(this.seq=r.concat(a))}setValue(e,t,i,r){const a=this.map[t];a!==void 0&&a.setValue(e,i,r)}setOptional(e,t,i){const r=t[i];r!==void 0&&this.setValue(e,i,r)}static upload(e,t,i,r){for(let a=0,o=t.length;a!==o;++a){const l=t[a],u=i[l.id];u.needsUpdate!==!1&&l.setValue(e,u.value,r)}}static seqWithValue(e,t){const i=[];for(let r=0,a=e.length;r!==a;++r){const o=e[r];o.id in t&&i.push(o)}return i}}function Xc(n,e,t){const i=n.createShader(e);return n.shaderSource(i,t),n.compileShader(i),i}const Q2=37297;let j2=0;function ex(n,e){const t=n.split(`
`),i=[],r=Math.max(e-6,0),a=Math.min(e+6,t.length);for(let o=r;o<a;o++){const l=o+1;i.push(`${l===e?">":" "} ${l}: ${t[o]}`)}return i.join(`
`)}const Kc=new Ye;function tx(n){ot._getMatrix(Kc,ot.workingColorSpace,n);const e=`mat3( ${Kc.elements.map(t=>t.toFixed(4))} )`;switch(ot.getTransfer(n)){case Ss:return[e,"LinearTransferOETF"];case bt:return[e,"sRGBTransferOETF"];default:return Ve("WebGLProgram: Unsupported color space: ",n),[e,"LinearTransferOETF"]}}function qc(n,e,t){const i=n.getShaderParameter(e,n.COMPILE_STATUS),a=(n.getShaderInfoLog(e)||"").trim();if(i&&a==="")return"";const o=/ERROR: 0:(\d+)/.exec(a);if(o){const l=parseInt(o[1]);return t.toUpperCase()+`

`+a+`

`+ex(n.getShaderSource(e),l)}else return a}function nx(n,e){const t=tx(e);return[`vec4 ${n}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}const ix={[Ou]:"Linear",[Fu]:"Reinhard",[Uu]:"Cineon",[Bu]:"ACESFilmic",[zu]:"AgX",[Hu]:"Neutral",[ku]:"Custom"};function rx(n,e){const t=ix[e];return t===void 0?(Ve("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+n+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+n+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const is=new Y;function ax(){ot.getLuminanceCoefficients(is);const n=is.x.toFixed(4),e=is.y.toFixed(4),t=is.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${n}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function sx(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",n.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(pa).join(`
`)}function ox(n){const e=[];for(const t in n){const i=n[t];i!==!1&&e.push("#define "+t+" "+i)}return e.join(`
`)}function lx(n,e){const t={},i=n.getProgramParameter(e,n.ACTIVE_ATTRIBUTES);for(let r=0;r<i;r++){const a=n.getActiveAttrib(e,r),o=a.name;let l=1;a.type===n.FLOAT_MAT2&&(l=2),a.type===n.FLOAT_MAT3&&(l=3),a.type===n.FLOAT_MAT4&&(l=4),t[o]={type:a.type,location:n.getAttribLocation(e,o),locationSize:l}}return t}function pa(n){return n!==""}function Zc(n,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return n.replace(/NUM_SUN_LIGHTS/g,e.numSunLights).replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,e.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function $c(n,e){return n.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const cx=/^[ \t]*#include +<([\w\d./]+)>/gm;function ml(n){return n.replace(cx,hx)}const ux=new Map;function hx(n,e){let t=tt[e];if(t===void 0){const i=ux.get(e);if(i!==void 0)t=tt[i],Ve('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,i);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+e+">")}return ml(t)}const dx=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Jc(n){return n.replace(dx,fx)}function fx(n,e,t,i){let r="";for(let a=parseInt(e);a<parseInt(t);a++)r+=i.replace(/\[\s*i\s*\]/g,"[ "+a+" ]").replace(/UNROLLED_LOOP_INDEX/g,a);return r}function Qc(n){let e=`precision ${n.precision} float;
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
#define LOW_PRECISION`),e}const px={[hs]:"SHADOWMAP_TYPE_PCF",[fa]:"SHADOWMAP_TYPE_VSM"};function mx(n){return px[n.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const gx={[fr]:"ENVMAP_TYPE_CUBE",[Yr]:"ENVMAP_TYPE_CUBE",[Cs]:"ENVMAP_TYPE_CUBE_UV"};function xx(n){return n.envMap===!1?"ENVMAP_TYPE_CUBE":gx[n.envMapMode]||"ENVMAP_TYPE_CUBE"}const Mx={[Yr]:"ENVMAP_MODE_REFRACTION"};function _x(n){return n.envMap===!1?"ENVMAP_MODE_REFLECTION":Mx[n.envMapMode]||"ENVMAP_MODE_REFLECTION"}const vx={[Nu]:"ENVMAP_BLENDING_MULTIPLY",[op]:"ENVMAP_BLENDING_MIX",[lp]:"ENVMAP_BLENDING_ADD"};function bx(n){return n.envMap===!1?"ENVMAP_BLENDING_NONE":vx[n.combine]||"ENVMAP_BLENDING_NONE"}function Sx(n){const e=n.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,i=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:i,maxMip:t}}function Ex(n,e,t,i){const r=n.getContext(),a=t.defines;let o=t.vertexShader,l=t.fragmentShader;const u=mx(t),c=xx(t),h=_x(t),f=bx(t),d=Sx(t),p=sx(t),m=ox(a),M=r.createProgram();let x,g,_=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(x=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m].filter(pa).join(`
`),x.length>0&&(x+=`
`),g=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m].filter(pa).join(`
`),g.length>0&&(g+=`
`)):(x=[Qc(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexNormals?"#define HAS_NORMAL":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+u:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(pa).join(`
`),g=[Qc(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+h:"",t.envMap?"#define "+f:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.retroreflection?"#define USE_RETROREFLECTION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas||t.batchingColor?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+u:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==hi?"#define TONE_MAPPING":"",t.toneMapping!==hi?tt.tonemapping_pars_fragment:"",t.toneMapping!==hi?rx("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",tt.colorspace_pars_fragment,nx("linearToOutputTexel",t.outputColorSpace),ax(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(pa).join(`
`)),o=ml(o),o=Zc(o,t),o=$c(o,t),l=ml(l),l=Zc(l,t),l=$c(l,t),o=Jc(o),l=Jc(l),t.isRawShaderMaterial!==!0&&(_=`#version 300 es
`,x=[p,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+x,g=["#define varying in",t.glslVersion===pc?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===pc?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+g);const E=_+x+o,S=_+g+l,R=Xc(r,r.VERTEX_SHADER,E),A=Xc(r,r.FRAGMENT_SHADER,S);r.attachShader(M,R),r.attachShader(M,A),t.index0AttributeName!==void 0?r.bindAttribLocation(M,0,t.index0AttributeName):t.hasPositionAttribute===!0&&r.bindAttribLocation(M,0,"position"),r.linkProgram(M);function D(C){if(n.debug.checkShaderErrors){const N=r.getProgramInfoLog(M)||"",O=r.getShaderInfoLog(R)||"",I=r.getShaderInfoLog(A)||"",B=N.trim(),W=O.trim(),$=I.trim();let ae=!0,q=!0;if(r.getProgramParameter(M,r.LINK_STATUS)===!1)if(ae=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(r,M,R,A);else{const ee=qc(r,R,"vertex"),F=qc(r,A,"fragment");ht("WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(M,r.VALIDATE_STATUS)+`

Material Name: `+C.name+`
Material Type: `+C.type+`

Program Info Log: `+B+`
`+ee+`
`+F)}else B!==""?Ve("WebGLProgram: Program Info Log:",B):(W===""||$==="")&&(q=!1);q&&(C.diagnostics={runnable:ae,programLog:B,vertexShader:{log:W,prefix:x},fragmentShader:{log:$,prefix:g}})}r.deleteShader(R),r.deleteShader(A),b=new gs(r,M),w=lx(r,M)}let b;this.getUniforms=function(){return b===void 0&&D(this),b};let w;this.getAttributes=function(){return w===void 0&&D(this),w};let L=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return L===!1&&(L=r.getProgramParameter(M,Q2)),L},this.destroy=function(){i.releaseStatesOfProgram(this),r.deleteProgram(M),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=j2++,this.cacheKey=e,this.usedTimes=1,this.program=M,this.vertexShader=R,this.fragmentShader=A,this}let yx=0;class wx{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,i){const r=this._getShaderCacheForMaterial(e);return r.has(t)===!1&&(r.add(t),t.usedTimes++),r.has(i)===!1&&(r.add(i),i.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const i of t)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let i=t.get(e);return i===void 0&&(i=new Set,t.set(e,i)),i}_getShaderStage(e){const t=this.shaderCache;let i=t.get(e);return i===void 0&&(i=new Ax(e),t.set(e,i)),i}}class Ax{constructor(e){this.id=yx++,this.code=e,this.usedTimes=0}}function Tx(n){return n===pr||n===vs||n===bs}function Rx(n,e,t,i,r,a){const o=new ju,l=new wx,u=new Set,c=[],h=new Map,f=i.logarithmicDepthBuffer;let d=i.precision;const p={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function m(b){return u.add(b),b===0?"uv":`uv${b}`}function M(b,w,L,C,N,O){const I=C.fog,B=N.geometry,W=b.isMeshStandardMaterial||b.isMeshLambertMaterial||b.isMeshPhongMaterial?C.environment:null,$=b.isMeshStandardMaterial||b.isMeshLambertMaterial&&!b.envMap||b.isMeshPhongMaterial&&!b.envMap,ae=e.get(b.envMap||W,$),q=ae&&ae.mapping===Cs?ae.image.height:null,ee=p[b.type];b.precision!==null&&(d=i.getMaxPrecision(b.precision),d!==b.precision&&Ve("WebGLProgram.getParameters:",b.precision,"not supported, using",d,"instead."));const F=B.morphAttributes.position||B.morphAttributes.normal||B.morphAttributes.color,re=F!==void 0?F.length:0;let ue=0;B.morphAttributes.position!==void 0&&(ue=1),B.morphAttributes.normal!==void 0&&(ue=2),B.morphAttributes.color!==void 0&&(ue=3);let Re,Be,We,j;if(ee){const Lt=si[ee];Re=Lt.vertexShader,Be=Lt.fragmentShader}else{Re=b.vertexShader,Be=b.fragmentShader;const Lt=l.getVertexShaderStage(b),mt=l.getFragmentShaderStage(b);l.update(b,Lt,mt),We=Lt.id,j=mt.id}const ie=n.getRenderTarget(),G=n.state.buffers.depth.getReversed(),he=N.isInstancedMesh===!0,se=N.isBatchedMesh===!0,ye=!!b.map,Qe=!!b.matcap,Ce=!!ae,Fe=!!b.aoMap,qe=!!b.lightMap,Ke=!!b.bumpMap&&b.wireframe===!1,Tt=!!b.normalMap,Ut=!!b.displacementMap,jt=!!b.emissiveMap,yt=!!b.metalnessMap,Rt=!!b.roughnessMap,z=b.anisotropy>0,je=b.clearcoat>0,He=b.dispersion>0,P=b.retroreflectivity>0,v=b.iridescence>0,U=b.sheen>0,V=b.transmission>0,Z=z&&!!b.anisotropyMap,le=je&&!!b.clearcoatMap,de=je&&!!b.clearcoatNormalMap,Q=je&&!!b.clearcoatRoughnessMap,te=v&&!!b.iridescenceMap,fe=v&&!!b.iridescenceThicknessMap,Le=U&&!!b.sheenColorMap,Me=U&&!!b.sheenRoughnessMap,pe=!!b.specularMap,Ne=!!b.specularColorMap,ze=!!b.specularIntensityMap,Ze=V&&!!b.transmissionMap,H=V&&!!b.thicknessMap,me=!!b.gradientMap,ne=!!b.alphaMap,ge=b.alphaTest>0,Se=!!b.alphaHash,oe=!!b.extensions;let Oe=hi;b.toneMapped&&(ie===null||ie.isXRRenderTarget===!0)&&(Oe=n.toneMapping);const De={shaderID:ee,shaderType:b.type,shaderName:b.name,vertexShader:Re,fragmentShader:Be,defines:b.defines,customVertexShaderID:We,customFragmentShaderID:j,isRawShaderMaterial:b.isRawShaderMaterial===!0,glslVersion:b.glslVersion,precision:d,batching:se,batchingColor:se&&N._colorsTexture!==null,instancing:he,instancingColor:he&&N.instanceColor!==null,instancingMorph:he&&N.morphTexture!==null,outputColorSpace:ie===null?n.outputColorSpace:ie.isXRRenderTarget===!0?ie.texture.colorSpace:ot.workingColorSpace,alphaToCoverage:!!b.alphaToCoverage,map:ye,matcap:Qe,envMap:Ce,envMapMode:Ce&&ae.mapping,envMapCubeUVHeight:q,aoMap:Fe,lightMap:qe,bumpMap:Ke,normalMap:Tt,displacementMap:Ut,emissiveMap:jt,normalMapObjectSpace:Tt&&b.normalMapType===hp,normalMapTangentSpace:Tt&&b.normalMapType===fc,packedNormalMap:Tt&&b.normalMapType===fc&&Tx(b.normalMap.format),metalnessMap:yt,roughnessMap:Rt,anisotropy:z,anisotropyMap:Z,clearcoat:je,clearcoatMap:le,clearcoatNormalMap:de,clearcoatRoughnessMap:Q,dispersion:He,retroreflection:P,iridescence:v,iridescenceMap:te,iridescenceThicknessMap:fe,sheen:U,sheenColorMap:Le,sheenRoughnessMap:Me,specularMap:pe,specularColorMap:Ne,specularIntensityMap:ze,transmission:V,transmissionMap:Ze,thicknessMap:H,gradientMap:me,opaque:b.transparent===!1&&b.blending===Ma&&b.alphaToCoverage===!1,alphaMap:ne,alphaTest:ge,alphaHash:Se,combine:b.combine,mapUv:ye&&m(b.map.channel),aoMapUv:Fe&&m(b.aoMap.channel),lightMapUv:qe&&m(b.lightMap.channel),bumpMapUv:Ke&&m(b.bumpMap.channel),normalMapUv:Tt&&m(b.normalMap.channel),displacementMapUv:Ut&&m(b.displacementMap.channel),emissiveMapUv:jt&&m(b.emissiveMap.channel),metalnessMapUv:yt&&m(b.metalnessMap.channel),roughnessMapUv:Rt&&m(b.roughnessMap.channel),anisotropyMapUv:Z&&m(b.anisotropyMap.channel),clearcoatMapUv:le&&m(b.clearcoatMap.channel),clearcoatNormalMapUv:de&&m(b.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Q&&m(b.clearcoatRoughnessMap.channel),iridescenceMapUv:te&&m(b.iridescenceMap.channel),iridescenceThicknessMapUv:fe&&m(b.iridescenceThicknessMap.channel),sheenColorMapUv:Le&&m(b.sheenColorMap.channel),sheenRoughnessMapUv:Me&&m(b.sheenRoughnessMap.channel),specularMapUv:pe&&m(b.specularMap.channel),specularColorMapUv:Ne&&m(b.specularColorMap.channel),specularIntensityMapUv:ze&&m(b.specularIntensityMap.channel),transmissionMapUv:Ze&&m(b.transmissionMap.channel),thicknessMapUv:H&&m(b.thicknessMap.channel),alphaMapUv:ne&&m(b.alphaMap.channel),vertexTangents:!!B.attributes.tangent&&(Tt||z),vertexNormals:!!B.attributes.normal,vertexColors:b.vertexColors,vertexAlphas:b.vertexColors===!0&&!!B.attributes.color&&B.attributes.color.itemSize===4,pointsUvs:N.isPoints===!0&&!!B.attributes.uv&&(ye||ne),fog:!!I,useFog:b.fog===!0,fogExp2:!!I&&I.isFogExp2,flatShading:b.wireframe===!1&&(b.flatShading===!0||B.attributes.normal===void 0&&Tt===!1&&(b.isMeshLambertMaterial||b.isMeshPhongMaterial||b.isMeshStandardMaterial||b.isMeshPhysicalMaterial)),sizeAttenuation:b.sizeAttenuation===!0,logarithmicDepthBuffer:f,reversedDepthBuffer:G,skinning:N.isSkinnedMesh===!0,hasPositionAttribute:B.attributes.position!==void 0,morphTargets:B.morphAttributes.position!==void 0,morphNormals:B.morphAttributes.normal!==void 0,morphColors:B.morphAttributes.color!==void 0,morphTargetsCount:re,morphTextureStride:ue,numSunLights:w.sun.length,numDirLights:w.directional.length,numPointLights:w.point.length,numSpotLights:w.spot.length,numSpotLightMaps:w.spotLightMap.length,numRectAreaLights:w.rectArea.length,numHemiLights:w.hemi.length,numSunLightShadows:w.sunShadowMap.length,numDirLightShadows:w.directionalShadowMap.length,numPointLightShadows:w.pointShadowMap.length,numSpotLightShadows:w.spotShadowMap.length,numSpotLightShadowsWithMaps:w.numSpotLightShadowsWithMaps,numLightProbes:w.numLightProbes,numLightProbeGrids:O.length,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:b.dithering,shadowMapEnabled:n.shadowMap.enabled&&L.length>0,shadowMapType:n.shadowMap.type,toneMapping:Oe,decodeVideoTexture:ye&&b.map.isVideoTexture===!0&&ot.getTransfer(b.map.colorSpace)===bt,decodeVideoTextureEmissive:jt&&b.emissiveMap.isVideoTexture===!0&&ot.getTransfer(b.emissiveMap.colorSpace)===bt,premultipliedAlpha:b.premultipliedAlpha,doubleSided:b.side===Ai,flipSided:b.side===yn,useDepthPacking:b.depthPacking>=0,depthPacking:b.depthPacking||0,index0AttributeName:b.index0AttributeName,extensionClipCullDistance:oe&&b.extensions.clipCullDistance===!0&&t.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(oe&&b.extensions.multiDraw===!0||se)&&t.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:t.has("KHR_parallel_shader_compile"),customProgramCacheKey:b.customProgramCacheKey()};return De.vertexUv1s=u.has(1),De.vertexUv2s=u.has(2),De.vertexUv3s=u.has(3),u.clear(),De}function x(b){const w=[];if(b.shaderID?w.push(b.shaderID):(w.push(b.customVertexShaderID),w.push(b.customFragmentShaderID)),b.defines!==void 0)for(const L in b.defines)w.push(L),w.push(b.defines[L]);return b.isRawShaderMaterial===!1&&(g(w,b),_(w,b),w.push(n.outputColorSpace)),w.push(b.customProgramCacheKey),w.join()}function g(b,w){b.push(w.precision),b.push(w.outputColorSpace),b.push(w.envMapMode),b.push(w.envMapCubeUVHeight),b.push(w.mapUv),b.push(w.alphaMapUv),b.push(w.lightMapUv),b.push(w.aoMapUv),b.push(w.bumpMapUv),b.push(w.normalMapUv),b.push(w.displacementMapUv),b.push(w.emissiveMapUv),b.push(w.metalnessMapUv),b.push(w.roughnessMapUv),b.push(w.anisotropyMapUv),b.push(w.clearcoatMapUv),b.push(w.clearcoatNormalMapUv),b.push(w.clearcoatRoughnessMapUv),b.push(w.iridescenceMapUv),b.push(w.iridescenceThicknessMapUv),b.push(w.sheenColorMapUv),b.push(w.sheenRoughnessMapUv),b.push(w.specularMapUv),b.push(w.specularColorMapUv),b.push(w.specularIntensityMapUv),b.push(w.transmissionMapUv),b.push(w.thicknessMapUv),b.push(w.combine),b.push(w.fogExp2),b.push(w.sizeAttenuation),b.push(w.morphTargetsCount),b.push(w.morphAttributeCount),b.push(w.numSunLights),b.push(w.numDirLights),b.push(w.numPointLights),b.push(w.numSpotLights),b.push(w.numSpotLightMaps),b.push(w.numHemiLights),b.push(w.numRectAreaLights),b.push(w.numSunLightShadows),b.push(w.numDirLightShadows),b.push(w.numPointLightShadows),b.push(w.numSpotLightShadows),b.push(w.numSpotLightShadowsWithMaps),b.push(w.numLightProbes),b.push(w.shadowMapType),b.push(w.toneMapping),b.push(w.numClippingPlanes),b.push(w.numClipIntersection),b.push(w.depthPacking)}function _(b,w){o.disableAll(),w.instancing&&o.enable(0),w.instancingColor&&o.enable(1),w.instancingMorph&&o.enable(2),w.matcap&&o.enable(3),w.envMap&&o.enable(4),w.normalMapObjectSpace&&o.enable(5),w.normalMapTangentSpace&&o.enable(6),w.clearcoat&&o.enable(7),w.iridescence&&o.enable(8),w.alphaTest&&o.enable(9),w.vertexColors&&o.enable(10),w.vertexAlphas&&o.enable(11),w.vertexUv1s&&o.enable(12),w.vertexUv2s&&o.enable(13),w.vertexUv3s&&o.enable(14),w.vertexTangents&&o.enable(15),w.anisotropy&&o.enable(16),w.alphaHash&&o.enable(17),w.batching&&o.enable(18),w.dispersion&&o.enable(19),w.retroreflection&&o.enable(24),w.batchingColor&&o.enable(20),w.gradientMap&&o.enable(21),w.packedNormalMap&&o.enable(22),w.vertexNormals&&o.enable(23),b.push(o.mask),o.disableAll(),w.fog&&o.enable(0),w.useFog&&o.enable(1),w.flatShading&&o.enable(2),w.logarithmicDepthBuffer&&o.enable(3),w.reversedDepthBuffer&&o.enable(4),w.skinning&&o.enable(5),w.morphTargets&&o.enable(6),w.morphNormals&&o.enable(7),w.morphColors&&o.enable(8),w.premultipliedAlpha&&o.enable(9),w.shadowMapEnabled&&o.enable(10),w.doubleSided&&o.enable(11),w.flipSided&&o.enable(12),w.useDepthPacking&&o.enable(13),w.dithering&&o.enable(14),w.transmission&&o.enable(15),w.sheen&&o.enable(16),w.opaque&&o.enable(17),w.pointsUvs&&o.enable(18),w.decodeVideoTexture&&o.enable(19),w.decodeVideoTextureEmissive&&o.enable(20),w.alphaToCoverage&&o.enable(21),w.numLightProbeGrids>0&&o.enable(22),w.hasPositionAttribute&&o.enable(23),b.push(o.mask)}function E(b){const w=p[b.type];let L;if(w){const C=si[w];L=$p.clone(C.uniforms)}else L=b.uniforms;return L}function S(b,w){let L=h.get(w);return L!==void 0?++L.usedTimes:(L=new Ex(n,w,b,r),c.push(L),h.set(w,L)),L}function R(b){if(--b.usedTimes===0){const w=c.indexOf(b);c[w]=c[c.length-1],c.pop(),h.delete(b.cacheKey),b.destroy()}}function A(b){l.remove(b)}function D(){l.dispose()}return{getParameters:M,getProgramCacheKey:x,getUniforms:E,acquireProgram:S,releaseProgram:R,releaseShaderCache:A,programs:c,dispose:D}}function Cx(){let n=new WeakMap;function e(o){return n.has(o)}function t(o){let l=n.get(o);return l===void 0&&(l={},n.set(o,l)),l}function i(o){n.delete(o)}function r(o,l,u){n.get(o)[l]=u}function a(){n=new WeakMap}return{has:e,get:t,remove:i,update:r,dispose:a}}function Lx(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.material.id!==e.material.id?n.material.id-e.material.id:n.materialVariant!==e.materialVariant?n.materialVariant-e.materialVariant:n.z!==e.z?n.z-e.z:n.id-e.id}function jc(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.z!==e.z?e.z-n.z:n.id-e.id}function eu(){const n=[];let e=0;const t=[],i=[],r=[];function a(){e=0,t.length=0,i.length=0,r.length=0}function o(d){let p=0;return d.isInstancedMesh&&(p+=2),d.isSkinnedMesh&&(p+=1),p}function l(d,p,m,M,x,g){let _=n[e];return _===void 0?(_={id:d.id,object:d,geometry:p,material:m,materialVariant:o(d),groupOrder:M,renderOrder:d.renderOrder,z:x,group:g},n[e]=_):(_.id=d.id,_.object=d,_.geometry=p,_.material=m,_.materialVariant=o(d),_.groupOrder=M,_.renderOrder=d.renderOrder,_.z=x,_.group=g),e++,_}function u(d,p,m,M,x,g,_){_.reversedDepth===!0&&(x=-x);const E=l(d,p,m,M,x,g);m.transmission>0?i.push(E):m.transparent===!0?r.push(E):t.push(E)}function c(d,p,m,M,x,g){const _=l(d,p,m,M,x,g);m.transmission>0?i.unshift(_):m.transparent===!0?r.unshift(_):t.unshift(_)}function h(d,p){t.length>1&&t.sort(d||Lx),i.length>1&&i.sort(p||jc),r.length>1&&r.sort(p||jc)}function f(){for(let d=e,p=n.length;d<p;d++){const m=n[d];if(m.id===null)break;m.id=null,m.object=null,m.geometry=null,m.material=null,m.group=null}}return{opaque:t,transmissive:i,transparent:r,init:a,push:u,unshift:c,finish:f,sort:h}}function Dx(){let n=new WeakMap;function e(i,r){const a=n.get(i);let o;return a===void 0?(o=new eu,n.set(i,[o])):r>=a.length?(o=new eu,a.push(o)):o=a[r],o}function t(){n=new WeakMap}return{get:e,dispose:t}}function Px(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={direction:new Y,color:new pt};break;case"SpotLight":t={position:new Y,direction:new Y,color:new pt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new Y,color:new pt,distance:0,decay:0};break;case"HemisphereLight":t={direction:new Y,skyColor:new pt,groundColor:new pt};break;case"RectAreaLight":t={color:new pt,position:new Y,halfWidth:new Y,halfHeight:new Y};break}return n[e.id]=t,t}}}function Ix(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Xe};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Xe};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Xe,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[e.id]=t,t}}}let Nx=0;function Ox(n,e){return(e.castShadow?2:0)-(n.castShadow?2:0)+(e.map?1:0)-(n.map?1:0)}function Fx(n){const e=new Px,t=Ix(),i={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)i.probe.push(new Y);const r=new Y,a=new Wt,o=new Wt;function l(c){let h=0,f=0,d=0;for(let N=0;N<9;N++)i.probe[N].set(0,0,0);let p=0,m=0,M=0,x=0,g=0,_=0,E=0,S=0,R=0,A=0,D=0,b=0,w=0,L=0;c.sort(Ox);for(let N=0,O=c.length;N<O;N++){const I=c[N],B=I.color,W=I.intensity,$=I.distance;let ae=null;if(I.shadow&&I.shadow.map&&(I.shadow.map.texture.format===pr?ae=I.shadow.map.texture:ae=I.shadow.map.depthTexture||I.shadow.map.texture),I.isAmbientLight)h+=B.r*W,f+=B.g*W,d+=B.b*W;else if(I.isLightProbe){for(let q=0;q<9;q++)i.probe[q].addScaledVector(I.sh.coefficients[q],W);L++}else if(I.isSunLight){const q=e.get(I);if(q.color.copy(I.color).multiplyScalar(I.intensity),I.castShadow){const ee=I.shadow,F=t.get(I);F.shadowIntensity=ee.intensity,F.shadowBias=ee.bias,F.shadowNormalBias=ee.normalBias,F.shadowRadius=ee.radius,F.shadowMapSize.copy(ee.mapSize).multiply(ee.getFrameExtents()),i.sunShadow[m]=F,i.sunShadowMap[m]=ae;const re=ee.getViewportCount();for(let ue=0;ue<re;ue++)i.sunShadowMatrix[M+ue]=ee.getMatrix(ue),i.sunShadowCascade[M+ue]=ee._cascadeData[ue];M+=re,m++}i.sun[p]=q,p++}else if(I.isDirectionalLight){const q=e.get(I);if(q.color.copy(I.color).multiplyScalar(I.intensity),I.castShadow){const ee=I.shadow,F=t.get(I);F.shadowIntensity=ee.intensity,F.shadowBias=ee.bias,F.shadowNormalBias=ee.normalBias,F.shadowRadius=ee.radius,F.shadowMapSize=ee.mapSize,i.directionalShadow[x]=F,i.directionalShadowMap[x]=ae,i.directionalShadowMatrix[x]=I.shadow.matrix,R++}i.directional[x]=q,x++}else if(I.isSpotLight){const q=e.get(I);q.position.setFromMatrixPosition(I.matrixWorld),q.color.copy(B).multiplyScalar(W),q.distance=$,q.coneCos=Math.cos(I.angle),q.penumbraCos=Math.cos(I.angle*(1-I.penumbra)),q.decay=I.decay,i.spot[_]=q;const ee=I.shadow;if(I.map&&(i.spotLightMap[b]=I.map,b++,ee.updateMatrices(I),I.castShadow&&w++),i.spotLightMatrix[_]=ee.matrix,I.castShadow){const F=t.get(I);F.shadowIntensity=ee.intensity,F.shadowBias=ee.bias,F.shadowNormalBias=ee.normalBias,F.shadowRadius=ee.radius,F.shadowMapSize=ee.mapSize,i.spotShadow[_]=F,i.spotShadowMap[_]=ae,D++}_++}else if(I.isRectAreaLight){const q=e.get(I);q.color.copy(B).multiplyScalar(W),q.halfWidth.set(I.width*.5,0,0),q.halfHeight.set(0,I.height*.5,0),i.rectArea[E]=q,E++}else if(I.isPointLight){const q=e.get(I);if(q.color.copy(I.color).multiplyScalar(I.intensity),q.distance=I.distance,q.decay=I.decay,I.castShadow){const ee=I.shadow,F=t.get(I);F.shadowIntensity=ee.intensity,F.shadowBias=ee.bias,F.shadowNormalBias=ee.normalBias,F.shadowRadius=ee.radius,F.shadowMapSize=ee.mapSize,F.shadowCameraNear=ee.camera.near,F.shadowCameraFar=ee.camera.far,i.pointShadow[g]=F,i.pointShadowMap[g]=ae,i.pointShadowMatrix[g]=I.shadow.matrix,A++}i.point[g]=q,g++}else if(I.isHemisphereLight){const q=e.get(I);q.skyColor.copy(I.color).multiplyScalar(W),q.groundColor.copy(I.groundColor).multiplyScalar(W),i.hemi[S]=q,S++}}E>0&&(n.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=_e.LTC_FLOAT_1,i.rectAreaLTC2=_e.LTC_FLOAT_2):(i.rectAreaLTC1=_e.LTC_HALF_1,i.rectAreaLTC2=_e.LTC_HALF_2)),i.ambient[0]=h,i.ambient[1]=f,i.ambient[2]=d;const C=i.hash;(C.sunLength!==p||C.directionalLength!==x||C.pointLength!==g||C.spotLength!==_||C.rectAreaLength!==E||C.hemiLength!==S||C.numSunShadows!==m||C.numDirectionalShadows!==R||C.numPointShadows!==A||C.numSpotShadows!==D||C.numSpotMaps!==b||C.numLightProbes!==L)&&(i.sun.length=p,i.directional.length=x,i.spot.length=_,i.rectArea.length=E,i.point.length=g,i.hemi.length=S,i.sunShadow.length=m,i.sunShadowMap.length=m,i.sunShadowMatrix.length=M,i.sunShadowCascade.length=M,i.directionalShadow.length=R,i.directionalShadowMap.length=R,i.directionalShadowMatrix.length=R,i.pointShadow.length=A,i.pointShadowMap.length=A,i.pointShadowMatrix.length=A,i.spotShadow.length=D,i.spotShadowMap.length=D,i.spotLightMatrix.length=D+b-w,i.spotLightMap.length=b,i.numSpotLightShadowsWithMaps=w,i.numLightProbes=L,C.sunLength=p,C.directionalLength=x,C.pointLength=g,C.spotLength=_,C.rectAreaLength=E,C.hemiLength=S,C.numSunShadows=m,C.numDirectionalShadows=R,C.numPointShadows=A,C.numSpotShadows=D,C.numSpotMaps=b,C.numLightProbes=L,i.version=Nx++)}function u(c,h){let f=0,d=0,p=0,m=0,M=0,x=0;const g=h.matrixWorldInverse;for(let _=0,E=c.length;_<E;_++){const S=c[_];if(S.isSunLight){const R=i.sun[f];R.direction.setFromMatrixPosition(S.matrixWorld),R.direction.transformDirection(g),f++}else if(S.isDirectionalLight){const R=i.directional[d];R.direction.setFromMatrixPosition(S.matrixWorld),r.setFromMatrixPosition(S.target.matrixWorld),R.direction.sub(r),R.direction.transformDirection(g),d++}else if(S.isSpotLight){const R=i.spot[m];R.position.setFromMatrixPosition(S.matrixWorld),R.position.applyMatrix4(g),R.direction.setFromMatrixPosition(S.matrixWorld),r.setFromMatrixPosition(S.target.matrixWorld),R.direction.sub(r),R.direction.transformDirection(g),m++}else if(S.isRectAreaLight){const R=i.rectArea[M];R.position.setFromMatrixPosition(S.matrixWorld),R.position.applyMatrix4(g),o.identity(),a.copy(S.matrixWorld),a.premultiply(g),o.extractRotation(a),R.halfWidth.set(S.width*.5,0,0),R.halfHeight.set(0,S.height*.5,0),R.halfWidth.applyMatrix4(o),R.halfHeight.applyMatrix4(o),M++}else if(S.isPointLight){const R=i.point[p];R.position.setFromMatrixPosition(S.matrixWorld),R.position.applyMatrix4(g),p++}else if(S.isHemisphereLight){const R=i.hemi[x];R.direction.setFromMatrixPosition(S.matrixWorld),R.direction.transformDirection(g),x++}}}return{setup:l,setupView:u,state:i}}function tu(n){const e=new Fx(n),t=[],i=[],r=[];function a(d){f.camera=d,t.length=0,i.length=0,r.length=0}function o(d){t.push(d)}function l(d){i.push(d)}function u(d){r.push(d)}function c(){e.setup(t)}function h(d){e.setupView(t,d)}const f={lightsArray:t,shadowsArray:i,lightProbeGridArray:r,camera:null,lights:e,transmissionRenderTarget:{},textureUnits:0};return{init:a,state:f,setupLights:c,setupLightsView:h,pushLight:o,pushShadow:l,pushLightProbeGrid:u}}function Ux(n){let e=new WeakMap;function t(r,a=0){const o=e.get(r);let l;return o===void 0?(l=new tu(n),e.set(r,[l])):a>=o.length?(l=new tu(n),o.push(l)):l=o[a],l}function i(){e=new WeakMap}return{get:t,dispose:i}}const Bx=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,kx=`uniform sampler2D shadow_pass;
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
}`,zx=[new Y(1,0,0),new Y(-1,0,0),new Y(0,1,0),new Y(0,-1,0),new Y(0,0,1),new Y(0,0,-1)],Hx=[new Y(0,-1,0),new Y(0,-1,0),new Y(0,0,1),new Y(0,0,-1),new Y(0,-1,0),new Y(0,-1,0)],nu=new Wt,la=new Y,_o=new Y;function Gx(n,e,t){let i=new Hl;const r=new Xe,a=new Xe,o=new Ft,l=new em,u=new tm,c={},h=t.maxTextureSize,f={[dr]:yn,[yn]:dr,[Ai]:Ai},d=new fn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Xe},radius:{value:4}},vertexShader:Bx,fragmentShader:kx}),p=d.clone();p.defines.HORIZONTAL_PASS=1;const m=new gi;m.setAttribute("position",new di(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const M=new Mn(m,d),x=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=hs;let g=this.type;this.render=function(A,D,b){if(x.enabled===!1||x.autoUpdate===!1&&x.needsUpdate===!1||A.length===0)return;this.type===G0&&(Ve("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."),this.type=hs);const w=n.getRenderTarget(),L=n.getActiveCubeFace(),C=n.getActiveMipmapLevel(),N=n.state;N.setBlending(Ci),N.buffers.depth.getReversed()===!0?N.buffers.color.setClear(0,0,0,0):N.buffers.color.setClear(1,1,1,1),N.buffers.depth.setTest(!0),N.setScissorTest(!1);const O=g!==this.type;O&&D.traverse(function(I){I.material&&(Array.isArray(I.material)?I.material.forEach(B=>B.needsUpdate=!0):I.material.needsUpdate=!0)});for(let I=0,B=A.length;I<B;I++){const W=A[I],$=W.shadow;if($===void 0){Ve("WebGLShadowMap:",W,"has no shadow.");continue}if($.autoUpdate===!1&&$.needsUpdate===!1)continue;r.copy($.mapSize);const ae=$.getFrameExtents();r.multiply(ae),a.copy($.mapSize),(r.x>h||r.y>h)&&(r.x>h&&(a.x=Math.floor(h/ae.x),r.x=a.x*ae.x,$.mapSize.x=a.x),r.y>h&&(a.y=Math.floor(h/ae.y),r.y=a.y*ae.y,$.mapSize.y=a.y));const q=n.state.buffers.depth.getReversed();if($.camera._reversedDepth=q,$.map===null||O===!0){if($.map!==null&&($.map.depthTexture!==null&&($.map.depthTexture.dispose(),$.map.depthTexture=null),$.map.dispose()),this.type===fa){if(W.isPointLight){Ve("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}$.map=new Un(r.x,r.y,{format:pr,type:mi,minFilter:Yt,magFilter:Yt,generateMipmaps:!1}),$.map.texture.name=W.name+".shadowMap",$.map.depthTexture=new ya(r.x,r.y,ci),$.map.depthTexture.name=W.name+".shadowMapDepth",$.map.depthTexture.format=Ii,$.map.depthTexture.compareFunction=null,$.map.depthTexture.minFilter=$t,$.map.depthTexture.magFilter=$t}else W.isPointLight?($.map=new fh(r.x),$.map.depthTexture=new qp(r.x,pi)):($.map=new Un(r.x,r.y),$.map.depthTexture=new ya(r.x,r.y,pi)),$.map.depthTexture.name=W.name+".shadowMap",$.map.depthTexture.format=Ii,this.type===hs?($.map.depthTexture.compareFunction=q?Bl:Ul,$.map.depthTexture.minFilter=Yt,$.map.depthTexture.magFilter=Yt):($.map.depthTexture.compareFunction=null,$.map.depthTexture.minFilter=$t,$.map.depthTexture.magFilter=$t);$.camera.updateProjectionMatrix()}$.map.isWebGLCubeRenderTarget!==!0&&($.map.width!==r.x||$.map.height!==r.y)&&$.map.setSize(r.x,r.y);const ee=$.map.isWebGLCubeRenderTarget?6:$.getViewportCount();W.isPointLight!==!0&&$.updateMatrices(W,b);for(let F=0;F<ee;F++){const re=$.getCamera(F);if(W.isPointLight){const ue=$.camera,Re=$.matrix,Be=W.distance||ue.far;Be!==ue.far&&(ue.far=Be,ue.updateProjectionMatrix()),la.setFromMatrixPosition(W.matrixWorld),ue.position.copy(la),_o.copy(ue.position),_o.add(zx[F]),ue.up.copy(Hx[F]),ue.lookAt(_o),ue.updateMatrixWorld(),Re.makeTranslation(-la.x,-la.y,-la.z),nu.multiplyMatrices(ue.projectionMatrix,ue.matrixWorldInverse),$._frustum.setFromProjectionMatrix(nu,ue.coordinateSystem,ue.reversedDepth)}if($.map.isWebGLCubeRenderTarget)n.setRenderTarget($.map,F),n.clear();else{F===0&&(n.setRenderTarget($.map),n.clear());const ue=$.getViewport(F);o.set(a.x*ue.x,a.y*ue.y,a.x*ue.z,a.y*ue.w),N.viewport(o)}i=$.getFrustum(F),S(D,b,re,W,this.type)}$.isPointLightShadow!==!0&&this.type===fa&&_($,b),$.needsUpdate=!1}g=this.type,x.needsUpdate=!1,n.setRenderTarget(w,L,C)};function _(A,D){const b=e.update(M);d.defines.VSM_SAMPLES!==A.blurSamples&&(d.defines.VSM_SAMPLES=A.blurSamples,p.defines.VSM_SAMPLES=A.blurSamples,d.needsUpdate=!0,p.needsUpdate=!0),A.mapPass===null?A.mapPass=new Un(r.x,r.y,{format:pr,type:mi}):(A.mapPass.width!==A.map.width||A.mapPass.height!==A.map.height)&&A.mapPass.setSize(A.map.width,A.map.height),d.uniforms.shadow_pass.value=A.map.depthTexture,d.uniforms.resolution.value.set(A.map.width,A.map.height),d.uniforms.radius.value=A.radius,n.setRenderTarget(A.mapPass),n.clear(),n.renderBufferDirect(D,null,b,d,M,null),p.uniforms.shadow_pass.value=A.mapPass.texture,p.uniforms.resolution.value.set(A.map.width,A.map.height),p.uniforms.radius.value=A.radius,n.setRenderTarget(A.map),n.clear(),n.renderBufferDirect(D,null,b,p,M,null)}function E(A,D,b,w){let L=null;const C=b.isPointLight===!0?A.customDistanceMaterial:A.customDepthMaterial;if(C!==void 0)L=C;else if(L=b.isPointLight===!0?u:l,n.localClippingEnabled&&D.clipShadows===!0&&Array.isArray(D.clippingPlanes)&&D.clippingPlanes.length!==0||D.displacementMap&&D.displacementScale!==0||D.alphaMap&&D.alphaTest>0||D.map&&D.alphaTest>0||D.alphaToCoverage===!0){const N=L.uuid,O=D.uuid;let I=c[N];I===void 0&&(I={},c[N]=I);let B=I[O];B===void 0&&(B=L.clone(),I[O]=B,D.addEventListener("dispose",R)),L=B}if(L.visible=D.visible,L.wireframe=D.wireframe,w===fa?L.side=D.shadowSide!==null?D.shadowSide:D.side:L.side=D.shadowSide!==null?D.shadowSide:f[D.side],L.alphaMap=D.alphaMap,L.alphaTest=D.alphaToCoverage===!0?.5:D.alphaTest,L.map=D.map,L.clipShadows=D.clipShadows,L.clippingPlanes=D.clippingPlanes,L.clipIntersection=D.clipIntersection,L.displacementMap=D.displacementMap,L.displacementScale=D.displacementScale,L.displacementBias=D.displacementBias,L.wireframeLinewidth=D.wireframeLinewidth,L.linewidth=D.linewidth,b.isPointLight===!0&&L.isMeshDistanceMaterial===!0){const N=n.properties.get(L);N.light=b}return L}function S(A,D,b,w,L){if(A.visible===!1)return;if(A.layers.test(D.layers)&&(A.isMesh||A.isLine||A.isPoints)&&(A.castShadow||A.receiveShadow&&L===fa)&&(!A.frustumCulled||A.intersectsFrustum(i))){A.modelViewMatrix.multiplyMatrices(b.matrixWorldInverse,A.matrixWorld);const O=e.update(A),I=A.material;if(Array.isArray(I)){const B=O.groups;for(let W=0,$=B.length;W<$;W++){const ae=B[W],q=I[ae.materialIndex];if(q&&q.visible){const ee=E(A,q,w,L);A.onBeforeShadow(n,A,D,b,O,ee,ae),n.renderBufferDirect(b,null,O,ee,A,ae),A.onAfterShadow(n,A,D,b,O,ee,ae)}}}else if(I.visible){const B=E(A,I,w,L);A.onBeforeShadow(n,A,D,b,O,B,null),n.renderBufferDirect(b,null,O,B,A,null),A.onAfterShadow(n,A,D,b,O,B,null)}}const N=A.children;for(let O=0,I=N.length;O<I;O++)S(N[O],D,b,w,L)}function R(A){A.target.removeEventListener("dispose",R);for(const b in c){const w=c[b],L=A.target.uuid;L in w&&(w[L].dispose(),delete w[L])}}}function Wx(n,e){function t(){let H=!1;const me=new Ft;let ne=null;const ge=new Ft(0,0,0,0);return{setMask:function(Se){ne!==Se&&!H&&(n.colorMask(Se,Se,Se,Se),ne=Se)},setLocked:function(Se){H=Se},setClear:function(Se,oe,Oe,De,Lt){Lt===!0&&(Se*=De,oe*=De,Oe*=De),me.set(Se,oe,Oe,De),ge.equals(me)===!1&&(n.clearColor(Se,oe,Oe,De),ge.copy(me))},reset:function(){H=!1,ne=null,ge.set(-1,0,0,0)}}}function i(){let H=!1,me=!1,ne=null,ge=null,Se=null;return{setReversed:function(oe){if(me!==oe){const Oe=e.get("EXT_clip_control");oe?Oe.clipControlEXT(Oe.LOWER_LEFT_EXT,Oe.ZERO_TO_ONE_EXT):Oe.clipControlEXT(Oe.LOWER_LEFT_EXT,Oe.NEGATIVE_ONE_TO_ONE_EXT),me=oe;const De=Se;Se=null,this.setClear(De)}},getReversed:function(){return me},setTest:function(oe){oe?ie(n.DEPTH_TEST):G(n.DEPTH_TEST)},setMask:function(oe){ne!==oe&&!H&&(n.depthMask(oe),ne=oe)},setFunc:function(oe){if(me&&(oe=Ep[oe]),ge!==oe){switch(oe){case Ro:n.depthFunc(n.NEVER);break;case Co:n.depthFunc(n.ALWAYS);break;case Lo:n.depthFunc(n.LESS);break;case va:n.depthFunc(n.LEQUAL);break;case Do:n.depthFunc(n.EQUAL);break;case Po:n.depthFunc(n.GEQUAL);break;case Io:n.depthFunc(n.GREATER);break;case No:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}ge=oe}},setLocked:function(oe){H=oe},setClear:function(oe){Se!==oe&&(Se=oe,me&&(oe=1-oe),n.clearDepth(oe))},reset:function(){H=!1,ne=null,ge=null,Se=null,me=!1}}}function r(){let H=!1,me=null,ne=null,ge=null,Se=null,oe=null,Oe=null,De=null,Lt=null;return{setTest:function(mt){H||(mt?ie(n.STENCIL_TEST):G(n.STENCIL_TEST))},setMask:function(mt){me!==mt&&!H&&(n.stencilMask(mt),me=mt)},setFunc:function(mt,kn,Qn){(ne!==mt||ge!==kn||Se!==Qn)&&(n.stencilFunc(mt,kn,Qn),ne=mt,ge=kn,Se=Qn)},setOp:function(mt,kn,Qn){(oe!==mt||Oe!==kn||De!==Qn)&&(n.stencilOp(mt,kn,Qn),oe=mt,Oe=kn,De=Qn)},setLocked:function(mt){H=mt},setClear:function(mt){Lt!==mt&&(n.clearStencil(mt),Lt=mt)},reset:function(){H=!1,me=null,ne=null,ge=null,Se=null,oe=null,Oe=null,De=null,Lt=null}}}const a=new t,o=new i,l=new r,u=new WeakMap,c=new WeakMap;let h={},f={},d={},p=new WeakMap,m=[],M=null,x=!1,g=null,_=null,E=null,S=null,R=null,A=null,D=null,b=new pt(0,0,0),w=0,L=!1,C=null,N=null,O=null,I=null,B=null;const W=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let $=!1,ae=0;const q=n.getParameter(n.VERSION);q.indexOf("WebGL")!==-1?(ae=parseFloat(/^WebGL (\d)/.exec(q)[1]),$=ae>=1):q.indexOf("OpenGL ES")!==-1&&(ae=parseFloat(/^OpenGL ES (\d)/.exec(q)[1]),$=ae>=2);let ee=null,F={};const re=n.getParameter(n.SCISSOR_BOX),ue=n.getParameter(n.VIEWPORT),Re=new Ft().fromArray(re),Be=new Ft().fromArray(ue);function We(H,me,ne,ge){const Se=new Uint8Array(4),oe=n.createTexture();n.bindTexture(H,oe),n.texParameteri(H,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(H,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let Oe=0;Oe<ne;Oe++)H===n.TEXTURE_3D||H===n.TEXTURE_2D_ARRAY?n.texImage3D(me,0,n.RGBA,1,1,ge,0,n.RGBA,n.UNSIGNED_BYTE,Se):n.texImage2D(me+Oe,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,Se);return oe}const j={};j[n.TEXTURE_2D]=We(n.TEXTURE_2D,n.TEXTURE_2D,1),j[n.TEXTURE_CUBE_MAP]=We(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),j[n.TEXTURE_2D_ARRAY]=We(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),j[n.TEXTURE_3D]=We(n.TEXTURE_3D,n.TEXTURE_3D,1,1),a.setClear(0,0,0,1),o.setClear(1),l.setClear(0),ie(n.DEPTH_TEST),o.setFunc(va),Ke(!1),Tt(cc),ie(n.CULL_FACE),Fe(Ci);function ie(H){h[H]!==!0&&(n.enable(H),h[H]=!0)}function G(H){h[H]!==!1&&(n.disable(H),h[H]=!1)}function he(H,me){return d[H]!==me?(n.bindFramebuffer(H,me),d[H]=me,H===n.DRAW_FRAMEBUFFER&&(d[n.FRAMEBUFFER]=me),H===n.FRAMEBUFFER&&(d[n.DRAW_FRAMEBUFFER]=me),!0):!1}function se(H,me){let ne=m,ge=!1;if(H){ne=p.get(me),ne===void 0&&(ne=[],p.set(me,ne));const Se=H.textures;if(ne.length!==Se.length||ne[0]!==n.COLOR_ATTACHMENT0){for(let oe=0,Oe=Se.length;oe<Oe;oe++)ne[oe]=n.COLOR_ATTACHMENT0+oe;ne.length=Se.length,ge=!0}}else ne[0]!==n.BACK&&(ne[0]=n.BACK,ge=!0);ge&&n.drawBuffers(ne)}function ye(H){return M!==H?(n.useProgram(H),M=H,!0):!1}const Qe={[Nr]:n.FUNC_ADD,[V0]:n.FUNC_SUBTRACT,[Y0]:n.FUNC_REVERSE_SUBTRACT};Qe[X0]=n.MIN,Qe[K0]=n.MAX;const Ce={[q0]:n.ZERO,[Z0]:n.ONE,[$0]:n.SRC_COLOR,[Pu]:n.SRC_ALPHA,[np]:n.SRC_ALPHA_SATURATE,[ep]:n.DST_COLOR,[Q0]:n.DST_ALPHA,[J0]:n.ONE_MINUS_SRC_COLOR,[Iu]:n.ONE_MINUS_SRC_ALPHA,[tp]:n.ONE_MINUS_DST_COLOR,[j0]:n.ONE_MINUS_DST_ALPHA,[ip]:n.CONSTANT_COLOR,[rp]:n.ONE_MINUS_CONSTANT_COLOR,[ap]:n.CONSTANT_ALPHA,[sp]:n.ONE_MINUS_CONSTANT_ALPHA};function Fe(H,me,ne,ge,Se,oe,Oe,De,Lt,mt){if(H===Ci){x===!0&&(G(n.BLEND),x=!1);return}if(x===!1&&(ie(n.BLEND),x=!0),H!==W0){if(H!==g||mt!==L){if((_!==Nr||R!==Nr)&&(n.blendEquation(n.FUNC_ADD),_=Nr,R=Nr),mt)switch(H){case Ma:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case uc:n.blendFunc(n.ONE,n.ONE);break;case hc:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case dc:n.blendFuncSeparate(n.DST_COLOR,n.ONE_MINUS_SRC_ALPHA,n.ZERO,n.ONE);break;default:ht("WebGLState: Invalid blending: ",H);break}else switch(H){case Ma:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case uc:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE,n.ONE,n.ONE);break;case hc:ht("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case dc:ht("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:ht("WebGLState: Invalid blending: ",H);break}E=null,S=null,A=null,D=null,b.set(0,0,0),w=0,g=H,L=mt}return}Se=Se||me,oe=oe||ne,Oe=Oe||ge,(me!==_||Se!==R)&&(n.blendEquationSeparate(Qe[me],Qe[Se]),_=me,R=Se),(ne!==E||ge!==S||oe!==A||Oe!==D)&&(n.blendFuncSeparate(Ce[ne],Ce[ge],Ce[oe],Ce[Oe]),E=ne,S=ge,A=oe,D=Oe),(De.equals(b)===!1||Lt!==w)&&(n.blendColor(De.r,De.g,De.b,Lt),b.copy(De),w=Lt),g=H,L=!1}function qe(H,me){H.side===Ai?G(n.CULL_FACE):ie(n.CULL_FACE);let ne=H.side===yn;me&&(ne=!ne),Ke(ne),H.blending===Ma&&H.transparent===!1?Fe(Ci):Fe(H.blending,H.blendEquation,H.blendSrc,H.blendDst,H.blendEquationAlpha,H.blendSrcAlpha,H.blendDstAlpha,H.blendColor,H.blendAlpha,H.premultipliedAlpha),o.setFunc(H.depthFunc),o.setTest(H.depthTest),o.setMask(H.depthWrite),a.setMask(H.colorWrite);const ge=H.stencilWrite;l.setTest(ge),ge&&(l.setMask(H.stencilWriteMask),l.setFunc(H.stencilFunc,H.stencilRef,H.stencilFuncMask),l.setOp(H.stencilFail,H.stencilZFail,H.stencilZPass)),jt(H.polygonOffset,H.polygonOffsetFactor,H.polygonOffsetUnits),H.alphaToCoverage===!0?ie(n.SAMPLE_ALPHA_TO_COVERAGE):G(n.SAMPLE_ALPHA_TO_COVERAGE)}function Ke(H){C!==H&&(H?n.frontFace(n.CW):n.frontFace(n.CCW),C=H)}function Tt(H){H!==z0?(ie(n.CULL_FACE),H!==N&&(H===cc?n.cullFace(n.BACK):H===H0?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):G(n.CULL_FACE),N=H}function Ut(H){H!==O&&($&&n.lineWidth(H),O=H)}function jt(H,me,ne){H?(ie(n.POLYGON_OFFSET_FILL),(I!==me||B!==ne)&&(I=me,B=ne,o.getReversed()&&(me=-me),n.polygonOffset(me,ne))):G(n.POLYGON_OFFSET_FILL)}function yt(H){H?ie(n.SCISSOR_TEST):G(n.SCISSOR_TEST)}function Rt(H){H===void 0&&(H=n.TEXTURE0+W-1),ee!==H&&(n.activeTexture(H),ee=H)}function z(H,me,ne){ne===void 0&&(ee===null?ne=n.TEXTURE0+W-1:ne=ee);let ge=F[ne];ge===void 0&&(ge={type:void 0,texture:void 0},F[ne]=ge),(ge.type!==H||ge.texture!==me)&&(ee!==ne&&(n.activeTexture(ne),ee=ne),n.bindTexture(H,me||j[H]),ge.type=H,ge.texture=me)}function je(){const H=F[ee];H!==void 0&&H.type!==void 0&&(n.bindTexture(H.type,null),H.type=void 0,H.texture=void 0)}function He(){try{n.compressedTexImage2D(...arguments)}catch(H){ht("WebGLState:",H)}}function P(){try{n.compressedTexImage3D(...arguments)}catch(H){ht("WebGLState:",H)}}function v(){try{n.texSubImage2D(...arguments)}catch(H){ht("WebGLState:",H)}}function U(){try{n.texSubImage3D(...arguments)}catch(H){ht("WebGLState:",H)}}function V(){try{n.compressedTexSubImage2D(...arguments)}catch(H){ht("WebGLState:",H)}}function Z(){try{n.compressedTexSubImage3D(...arguments)}catch(H){ht("WebGLState:",H)}}function le(){try{n.texStorage2D(...arguments)}catch(H){ht("WebGLState:",H)}}function de(){try{n.texStorage3D(...arguments)}catch(H){ht("WebGLState:",H)}}function Q(){try{n.texImage2D(...arguments)}catch(H){ht("WebGLState:",H)}}function te(){try{n.texImage3D(...arguments)}catch(H){ht("WebGLState:",H)}}function fe(H){return f[H]!==void 0?f[H]:n.getParameter(H)}function Le(H,me){f[H]!==me&&(n.pixelStorei(H,me),f[H]=me)}function Me(H){Re.equals(H)===!1&&(n.scissor(H.x,H.y,H.z,H.w),Re.copy(H))}function pe(H){Be.equals(H)===!1&&(n.viewport(H.x,H.y,H.z,H.w),Be.copy(H))}function Ne(H,me){let ne=c.get(me);ne===void 0&&(ne=new WeakMap,c.set(me,ne));let ge=ne.get(H);ge===void 0&&(ge=n.getUniformBlockIndex(me,H.name),ne.set(H,ge))}function ze(H,me){const ge=c.get(me).get(H);u.get(me)!==ge&&(n.uniformBlockBinding(me,ge,H.__bindingPointIndex),u.set(me,ge))}function Ze(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),o.setReversed(!1),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),n.pixelStorei(n.PACK_ALIGNMENT,4),n.pixelStorei(n.UNPACK_ALIGNMENT,4),n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,!1),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,n.BROWSER_DEFAULT_WEBGL),n.pixelStorei(n.PACK_ROW_LENGTH,0),n.pixelStorei(n.PACK_SKIP_PIXELS,0),n.pixelStorei(n.PACK_SKIP_ROWS,0),n.pixelStorei(n.UNPACK_ROW_LENGTH,0),n.pixelStorei(n.UNPACK_IMAGE_HEIGHT,0),n.pixelStorei(n.UNPACK_SKIP_PIXELS,0),n.pixelStorei(n.UNPACK_SKIP_ROWS,0),n.pixelStorei(n.UNPACK_SKIP_IMAGES,0),h={},f={},ee=null,F={},d={},p=new WeakMap,m=[],M=null,x=!1,g=null,_=null,E=null,S=null,R=null,A=null,D=null,b=new pt(0,0,0),w=0,L=!1,C=null,N=null,O=null,I=null,B=null,Re.set(0,0,n.canvas.width,n.canvas.height),Be.set(0,0,n.canvas.width,n.canvas.height),a.reset(),o.reset(),l.reset()}return{buffers:{color:a,depth:o,stencil:l},enable:ie,disable:G,bindFramebuffer:he,drawBuffers:se,useProgram:ye,setBlending:Fe,setMaterial:qe,setFlipSided:Ke,setCullFace:Tt,setLineWidth:Ut,setPolygonOffset:jt,setScissorTest:yt,activeTexture:Rt,bindTexture:z,unbindTexture:je,compressedTexImage2D:He,compressedTexImage3D:P,texImage2D:Q,texImage3D:te,pixelStorei:Le,getParameter:fe,updateUBOMapping:Ne,uniformBlockBinding:ze,texStorage2D:le,texStorage3D:de,texSubImage2D:v,texSubImage3D:U,compressedTexSubImage2D:V,compressedTexSubImage3D:Z,scissor:Me,viewport:pe,reset:Ze}}function Vx(n,e,t,i,r,a,o){const l=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,u=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new Xe,h=new WeakMap,f=new Set;let d;const p=new WeakMap;let m=!1;try{m=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function M(P,v){return m?new OffscreenCanvas(P,v):ys("canvas")}function x(P,v,U){let V=1;const Z=He(P);if((Z.width>U||Z.height>U)&&(V=U/Math.max(Z.width,Z.height)),V<1)if(typeof HTMLImageElement<"u"&&P instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&P instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&P instanceof ImageBitmap||typeof VideoFrame<"u"&&P instanceof VideoFrame){const le=Math.floor(V*Z.width),de=Math.floor(V*Z.height);d===void 0&&(d=M(le,de));const Q=v?M(le,de):d;return Q.width=le,Q.height=de,Q.getContext("2d").drawImage(P,0,0,le,de),Ve("WebGLRenderer: Texture has been resized from ("+Z.width+"x"+Z.height+") to ("+le+"x"+de+")."),Q}else return"data"in P&&Ve("WebGLRenderer: Image in DataTexture is too big ("+Z.width+"x"+Z.height+")."),P;return P}function g(P){return P.generateMipmaps}function _(P){n.generateMipmap(P)}function E(P){return P.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:P.isWebGL3DRenderTarget?n.TEXTURE_3D:P.isWebGLArrayRenderTarget||P.isCompressedArrayTexture?n.TEXTURE_2D_ARRAY:n.TEXTURE_2D}function S(P,v,U,V,Z,le=!1){if(P!==null){if(n[P]!==void 0)return n[P];Ve("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+P+"'")}let de;V&&(de=e.get("EXT_texture_norm16"),de||Ve("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let Q=v;if(v===n.RED&&(U===n.FLOAT&&(Q=n.R32F),U===n.HALF_FLOAT&&(Q=n.R16F),U===n.UNSIGNED_BYTE&&(Q=n.R8),U===n.UNSIGNED_SHORT&&de&&(Q=de.R16_EXT),U===n.SHORT&&de&&(Q=de.R16_SNORM_EXT)),v===n.RED_INTEGER&&(U===n.UNSIGNED_BYTE&&(Q=n.R8UI),U===n.UNSIGNED_SHORT&&(Q=n.R16UI),U===n.UNSIGNED_INT&&(Q=n.R32UI),U===n.BYTE&&(Q=n.R8I),U===n.SHORT&&(Q=n.R16I),U===n.INT&&(Q=n.R32I)),v===n.RG&&(U===n.FLOAT&&(Q=n.RG32F),U===n.HALF_FLOAT&&(Q=n.RG16F),U===n.UNSIGNED_BYTE&&(Q=n.RG8),U===n.UNSIGNED_SHORT&&de&&(Q=de.RG16_EXT),U===n.SHORT&&de&&(Q=de.RG16_SNORM_EXT)),v===n.RG_INTEGER&&(U===n.UNSIGNED_BYTE&&(Q=n.RG8UI),U===n.UNSIGNED_SHORT&&(Q=n.RG16UI),U===n.UNSIGNED_INT&&(Q=n.RG32UI),U===n.BYTE&&(Q=n.RG8I),U===n.SHORT&&(Q=n.RG16I),U===n.INT&&(Q=n.RG32I)),v===n.RGB_INTEGER&&(U===n.UNSIGNED_BYTE&&(Q=n.RGB8UI),U===n.UNSIGNED_SHORT&&(Q=n.RGB16UI),U===n.UNSIGNED_INT&&(Q=n.RGB32UI),U===n.BYTE&&(Q=n.RGB8I),U===n.SHORT&&(Q=n.RGB16I),U===n.INT&&(Q=n.RGB32I)),v===n.RGBA_INTEGER&&(U===n.UNSIGNED_BYTE&&(Q=n.RGBA8UI),U===n.UNSIGNED_SHORT&&(Q=n.RGBA16UI),U===n.UNSIGNED_INT&&(Q=n.RGBA32UI),U===n.BYTE&&(Q=n.RGBA8I),U===n.SHORT&&(Q=n.RGBA16I),U===n.INT&&(Q=n.RGBA32I)),v===n.RGB&&(U===n.UNSIGNED_SHORT&&de&&(Q=de.RGB16_EXT),U===n.SHORT&&de&&(Q=de.RGB16_SNORM_EXT),U===n.UNSIGNED_INT_5_9_9_9_REV&&(Q=n.RGB9_E5),U===n.UNSIGNED_INT_10F_11F_11F_REV&&(Q=n.R11F_G11F_B10F)),v===n.RGBA){const te=le?Ss:ot.getTransfer(Z);U===n.FLOAT&&(Q=n.RGBA32F),U===n.HALF_FLOAT&&(Q=n.RGBA16F),U===n.UNSIGNED_BYTE&&(Q=te===bt?n.SRGB8_ALPHA8:n.RGBA8),U===n.UNSIGNED_SHORT&&de&&(Q=de.RGBA16_EXT),U===n.SHORT&&de&&(Q=de.RGBA16_SNORM_EXT),U===n.UNSIGNED_SHORT_4_4_4_4&&(Q=n.RGBA4),U===n.UNSIGNED_SHORT_5_5_5_1&&(Q=n.RGB5_A1)}return(Q===n.R16F||Q===n.R32F||Q===n.RG16F||Q===n.RG32F||Q===n.RGBA16F||Q===n.RGBA32F)&&e.get("EXT_color_buffer_float"),Q}function R(P,v){let U;return P?v===null||v===pi||v===Sa?U=n.DEPTH24_STENCIL8:v===ci?U=n.DEPTH32F_STENCIL8:v===ba&&(U=n.DEPTH24_STENCIL8,Ve("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):v===null||v===pi||v===Sa?U=n.DEPTH_COMPONENT24:v===ci?U=n.DEPTH_COMPONENT32F:v===ba&&(U=n.DEPTH_COMPONENT16),U}function A(P,v){return g(P)===!0||P.isFramebufferTexture&&P.minFilter!==$t&&P.minFilter!==Yt?Math.log2(Math.max(v.width,v.height))+1:P.mipmaps!==void 0&&P.mipmaps.length>0?P.mipmaps.length:P.isCompressedTexture&&Array.isArray(P.image)?v.mipmaps.length:1}function D(P){const v=P.target;v.removeEventListener("dispose",D),w(v),v.isVideoTexture&&h.delete(v),v.isHTMLTexture&&f.delete(v)}function b(P){const v=P.target;v.removeEventListener("dispose",b),C(v)}function w(P){const v=i.get(P);if(v.__webglInit===void 0)return;const U=P.source,V=p.get(U);if(V){const Z=V[v.__cacheKey];Z.usedTimes--,Z.usedTimes===0&&L(P),Object.keys(V).length===0&&p.delete(U)}i.remove(P)}function L(P){const v=i.get(P);n.deleteTexture(v.__webglTexture);const U=P.source,V=p.get(U);delete V[v.__cacheKey],o.memory.textures--}function C(P){const v=i.get(P);if(P.depthTexture&&(P.depthTexture.dispose(),i.remove(P.depthTexture)),P.isWebGLCubeRenderTarget)for(let V=0;V<6;V++){if(Array.isArray(v.__webglFramebuffer[V]))for(let Z=0;Z<v.__webglFramebuffer[V].length;Z++)n.deleteFramebuffer(v.__webglFramebuffer[V][Z]);else n.deleteFramebuffer(v.__webglFramebuffer[V]);v.__webglDepthbuffer&&n.deleteRenderbuffer(v.__webglDepthbuffer[V])}else{if(Array.isArray(v.__webglFramebuffer))for(let V=0;V<v.__webglFramebuffer.length;V++)n.deleteFramebuffer(v.__webglFramebuffer[V]);else n.deleteFramebuffer(v.__webglFramebuffer);if(v.__webglDepthbuffer&&n.deleteRenderbuffer(v.__webglDepthbuffer),v.__webglMultisampledFramebuffer&&n.deleteFramebuffer(v.__webglMultisampledFramebuffer),v.__webglColorRenderbuffer)for(let V=0;V<v.__webglColorRenderbuffer.length;V++)v.__webglColorRenderbuffer[V]&&n.deleteRenderbuffer(v.__webglColorRenderbuffer[V]);v.__webglDepthRenderbuffer&&n.deleteRenderbuffer(v.__webglDepthRenderbuffer)}const U=P.textures;for(let V=0,Z=U.length;V<Z;V++){const le=i.get(U[V]);le.__webglTexture&&(n.deleteTexture(le.__webglTexture),o.memory.textures--),i.remove(U[V])}i.remove(P)}let N=0;function O(){N=0}function I(){return N}function B(P){N=P}function W(){const P=N;return P>=r.maxTextures&&Ve("WebGLTextures: Trying to use "+(P+1)+" texture units while this GPU supports only "+r.maxTextures),N+=1,P}function $(P){const v=[];return v.push(P.wrapS),v.push(P.wrapT),v.push(P.wrapR||0),v.push(P.magFilter),v.push(P.minFilter),v.push(P.anisotropy),v.push(P.internalFormat),v.push(P.format),v.push(P.type),v.push(P.generateMipmaps),v.push(P.premultiplyAlpha),v.push(P.flipY),v.push(P.unpackAlignment),v.push(P.colorSpace),v.join()}function ae(P,v){const U=i.get(P);if(P.isVideoTexture&&z(P),P.isRenderTargetTexture===!1&&P.isExternalTexture!==!0&&P.version>0&&U.__version!==P.version){const V=P.image;if(V===null)Ve("WebGLRenderer: Texture marked for update but no image data found.");else if(V.complete===!1)Ve("WebGLRenderer: Texture marked for update but image is incomplete");else{G(U,P,v);return}}else P.isExternalTexture&&(U.__webglTexture=P.sourceTexture?P.sourceTexture:null);t.bindTexture(n.TEXTURE_2D,U.__webglTexture,n.TEXTURE0+v)}function q(P,v){const U=i.get(P);if(P.isRenderTargetTexture===!1&&P.version>0&&U.__version!==P.version){G(U,P,v);return}else P.isExternalTexture&&(U.__webglTexture=P.sourceTexture?P.sourceTexture:null);t.bindTexture(n.TEXTURE_2D_ARRAY,U.__webglTexture,n.TEXTURE0+v)}function ee(P,v){const U=i.get(P);if(P.isRenderTargetTexture===!1&&P.version>0&&U.__version!==P.version){G(U,P,v);return}t.bindTexture(n.TEXTURE_3D,U.__webglTexture,n.TEXTURE0+v)}function F(P,v){const U=i.get(P);if(P.isCubeDepthTexture!==!0&&P.version>0&&U.__version!==P.version){he(U,P,v);return}t.bindTexture(n.TEXTURE_CUBE_MAP,U.__webglTexture,n.TEXTURE0+v)}const re={[Oo]:n.REPEAT,[Ti]:n.CLAMP_TO_EDGE,[Fo]:n.MIRRORED_REPEAT},ue={[$t]:n.NEAREST,[cp]:n.NEAREST_MIPMAP_NEAREST,[Oa]:n.NEAREST_MIPMAP_LINEAR,[Yt]:n.LINEAR,[Ws]:n.LINEAR_MIPMAP_NEAREST,[or]:n.LINEAR_MIPMAP_LINEAR},Re={[fp]:n.NEVER,[Mp]:n.ALWAYS,[pp]:n.LESS,[Ul]:n.LEQUAL,[mp]:n.EQUAL,[Bl]:n.GEQUAL,[gp]:n.GREATER,[xp]:n.NOTEQUAL};function Be(P,v){if(v.type===ci&&e.has("OES_texture_float_linear")===!1&&(v.magFilter===Yt||v.magFilter===Ws||v.magFilter===Oa||v.magFilter===or||v.minFilter===Yt||v.minFilter===Ws||v.minFilter===Oa||v.minFilter===or)&&Ve("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),n.texParameteri(P,n.TEXTURE_WRAP_S,re[v.wrapS]),n.texParameteri(P,n.TEXTURE_WRAP_T,re[v.wrapT]),(P===n.TEXTURE_3D||P===n.TEXTURE_2D_ARRAY)&&n.texParameteri(P,n.TEXTURE_WRAP_R,re[v.wrapR]),n.texParameteri(P,n.TEXTURE_MAG_FILTER,ue[v.magFilter]),n.texParameteri(P,n.TEXTURE_MIN_FILTER,ue[v.minFilter]),v.compareFunction&&(n.texParameteri(P,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(P,n.TEXTURE_COMPARE_FUNC,Re[v.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(v.magFilter===$t||v.minFilter!==Oa&&v.minFilter!==or||v.type===ci&&e.has("OES_texture_float_linear")===!1)return;if(v.anisotropy>1||i.get(v).__currentAnisotropy){const U=e.get("EXT_texture_filter_anisotropic");n.texParameterf(P,U.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(v.anisotropy,r.getMaxAnisotropy())),i.get(v).__currentAnisotropy=v.anisotropy}}}function We(P,v){let U=!1;P.__webglInit===void 0&&(P.__webglInit=!0,v.addEventListener("dispose",D));const V=v.source;let Z=p.get(V);Z===void 0&&(Z={},p.set(V,Z));const le=$(v);if(le!==P.__cacheKey){Z[le]===void 0&&(Z[le]={texture:n.createTexture(),usedTimes:0},o.memory.textures++,U=!0),Z[le].usedTimes++;const de=Z[P.__cacheKey];de!==void 0&&(Z[P.__cacheKey].usedTimes--,de.usedTimes===0&&L(v)),P.__cacheKey=le,P.__webglTexture=Z[le].texture}return U}function j(P,v,U){return Math.floor(Math.floor(P/U)/v)}function ie(P,v,U,V){const le=P.updateRanges;if(le.length===0)t.texSubImage2D(n.TEXTURE_2D,0,0,0,v.width,v.height,U,V,v.data);else{le.sort((Le,Me)=>Le.start-Me.start);let de=0;for(let Le=1;Le<le.length;Le++){const Me=le[de],pe=le[Le],Ne=Me.start+Me.count,ze=j(pe.start,v.width,4),Ze=j(Me.start,v.width,4);pe.start<=Ne+1&&ze===Ze&&j(pe.start+pe.count-1,v.width,4)===ze?Me.count=Math.max(Me.count,pe.start+pe.count-Me.start):(++de,le[de]=pe)}le.length=de+1;const Q=t.getParameter(n.UNPACK_ROW_LENGTH),te=t.getParameter(n.UNPACK_SKIP_PIXELS),fe=t.getParameter(n.UNPACK_SKIP_ROWS);t.pixelStorei(n.UNPACK_ROW_LENGTH,v.width);for(let Le=0,Me=le.length;Le<Me;Le++){const pe=le[Le],Ne=Math.floor(pe.start/4),ze=Math.ceil(pe.count/4),Ze=Ne%v.width,H=Math.floor(Ne/v.width),me=ze,ne=1;t.pixelStorei(n.UNPACK_SKIP_PIXELS,Ze),t.pixelStorei(n.UNPACK_SKIP_ROWS,H),t.texSubImage2D(n.TEXTURE_2D,0,Ze,H,me,ne,U,V,v.data)}P.clearUpdateRanges(),t.pixelStorei(n.UNPACK_ROW_LENGTH,Q),t.pixelStorei(n.UNPACK_SKIP_PIXELS,te),t.pixelStorei(n.UNPACK_SKIP_ROWS,fe)}}function G(P,v,U){let V=n.TEXTURE_2D;(v.isDataArrayTexture||v.isCompressedArrayTexture)&&(V=n.TEXTURE_2D_ARRAY),v.isData3DTexture&&(V=n.TEXTURE_3D);const Z=We(P,v),le=v.source;t.bindTexture(V,P.__webglTexture,n.TEXTURE0+U);const de=i.get(le);if(le.version!==de.__version||Z===!0){if(t.activeTexture(n.TEXTURE0+U),(typeof ImageBitmap<"u"&&v.image instanceof ImageBitmap)===!1){const ne=ot.getPrimaries(ot.workingColorSpace),ge=v.colorSpace===Vn?null:ot.getPrimaries(v.colorSpace),Se=v.colorSpace===Vn||ne===ge?n.NONE:n.BROWSER_DEFAULT_WEBGL;t.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,v.flipY),t.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,v.premultiplyAlpha),t.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,Se)}t.pixelStorei(n.UNPACK_ALIGNMENT,v.unpackAlignment);let te=x(v.image,!1,r.maxTextureSize);te=je(v,te);const fe=a.convert(v.format,v.colorSpace),Le=a.convert(v.type);let Me=S(v.internalFormat,fe,Le,v.normalized,v.colorSpace,v.isVideoTexture);Be(V,v);let pe;const Ne=v.mipmaps,ze=v.isVideoTexture!==!0,Ze=de.__version===void 0||Z===!0,H=le.dataReady,me=A(v,te);if(v.isDepthTexture)Me=R(v.format===lr,v.type),Ze&&(ze?t.texStorage2D(n.TEXTURE_2D,1,Me,te.width,te.height):t.texImage2D(n.TEXTURE_2D,0,Me,te.width,te.height,0,fe,Le,null));else if(v.isDataTexture)if(Ne.length>0){ze&&Ze&&t.texStorage2D(n.TEXTURE_2D,me,Me,Ne[0].width,Ne[0].height);for(let ne=0,ge=Ne.length;ne<ge;ne++)pe=Ne[ne],ze?H&&t.texSubImage2D(n.TEXTURE_2D,ne,0,0,pe.width,pe.height,fe,Le,pe.data):t.texImage2D(n.TEXTURE_2D,ne,Me,pe.width,pe.height,0,fe,Le,pe.data);v.generateMipmaps=!1}else ze?(Ze&&t.texStorage2D(n.TEXTURE_2D,me,Me,te.width,te.height),H&&ie(v,te,fe,Le)):t.texImage2D(n.TEXTURE_2D,0,Me,te.width,te.height,0,fe,Le,te.data);else if(v.isCompressedTexture)if(v.isCompressedArrayTexture){ze&&Ze&&t.texStorage3D(n.TEXTURE_2D_ARRAY,me,Me,Ne[0].width,Ne[0].height,te.depth);for(let ne=0,ge=Ne.length;ne<ge;ne++)if(pe=Ne[ne],v.format!==Fn)if(fe!==null)if(ze){if(H)if(v.layerUpdates.size>0){const Se=Nc(pe.width,pe.height,v.format,v.type);for(const oe of v.layerUpdates){const Oe=pe.data.subarray(oe*Se/pe.data.BYTES_PER_ELEMENT,(oe+1)*Se/pe.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,ne,0,0,oe,pe.width,pe.height,1,fe,Oe)}}else t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,ne,0,0,0,pe.width,pe.height,te.depth,fe,pe.data)}else t.compressedTexImage3D(n.TEXTURE_2D_ARRAY,ne,Me,pe.width,pe.height,te.depth,0,pe.data,0,0);else Ve("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else ze?H&&t.texSubImage3D(n.TEXTURE_2D_ARRAY,ne,0,0,0,pe.width,pe.height,te.depth,fe,Le,pe.data):t.texImage3D(n.TEXTURE_2D_ARRAY,ne,Me,pe.width,pe.height,te.depth,0,fe,Le,pe.data);v.layerUpdates.size>0&&v.clearLayerUpdates()}else{ze&&Ze&&t.texStorage2D(n.TEXTURE_2D,me,Me,Ne[0].width,Ne[0].height);for(let ne=0,ge=Ne.length;ne<ge;ne++)pe=Ne[ne],v.format!==Fn?fe!==null?ze?H&&t.compressedTexSubImage2D(n.TEXTURE_2D,ne,0,0,pe.width,pe.height,fe,pe.data):t.compressedTexImage2D(n.TEXTURE_2D,ne,Me,pe.width,pe.height,0,pe.data):Ve("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):ze?H&&t.texSubImage2D(n.TEXTURE_2D,ne,0,0,pe.width,pe.height,fe,Le,pe.data):t.texImage2D(n.TEXTURE_2D,ne,Me,pe.width,pe.height,0,fe,Le,pe.data)}else if(v.isDataArrayTexture)if(ze){if(Ze&&t.texStorage3D(n.TEXTURE_2D_ARRAY,me,Me,te.width,te.height,te.depth),H)if(v.layerUpdates.size>0){const ne=Nc(te.width,te.height,v.format,v.type);for(const ge of v.layerUpdates){const Se=te.data.subarray(ge*ne/te.data.BYTES_PER_ELEMENT,(ge+1)*ne/te.data.BYTES_PER_ELEMENT);t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,ge,te.width,te.height,1,fe,Le,Se)}v.clearLayerUpdates()}else t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,te.width,te.height,te.depth,fe,Le,te.data)}else t.texImage3D(n.TEXTURE_2D_ARRAY,0,Me,te.width,te.height,te.depth,0,fe,Le,te.data);else if(v.isData3DTexture)ze?(Ze&&t.texStorage3D(n.TEXTURE_3D,me,Me,te.width,te.height,te.depth),H&&t.texSubImage3D(n.TEXTURE_3D,0,0,0,0,te.width,te.height,te.depth,fe,Le,te.data)):t.texImage3D(n.TEXTURE_3D,0,Me,te.width,te.height,te.depth,0,fe,Le,te.data);else if(v.isFramebufferTexture){if(Ze)if(ze)t.texStorage2D(n.TEXTURE_2D,me,Me,te.width,te.height);else{let ne=te.width,ge=te.height;for(let Se=0;Se<me;Se++)t.texImage2D(n.TEXTURE_2D,Se,Me,ne,ge,0,fe,Le,null),ne>>=1,ge>>=1}}else if(v.isHTMLTexture){if("texElementImage2D"in n){const ne=n.canvas;if(ne.hasAttribute("layoutsubtree")||ne.setAttribute("layoutsubtree","true"),te.parentNode!==ne){ne.appendChild(te),f.add(v),ne.onpaint=ge=>{const Se=ge.changedElements;for(const oe of f)Se.includes(oe.image)&&(oe.needsUpdate=!0)},ne.requestPaint();return}if(n.texElementImage2D.length===3)n.texElementImage2D(n.TEXTURE_2D,n.RGBA8,te);else{const Se=n.RGBA,oe=n.RGBA,Oe=n.UNSIGNED_BYTE;n.texElementImage2D(n.TEXTURE_2D,0,Se,oe,Oe,te)}n.texParameteri(n.TEXTURE_2D,n.TEXTURE_MIN_FILTER,n.LINEAR),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_S,n.CLAMP_TO_EDGE),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_T,n.CLAMP_TO_EDGE)}}else if(Ne.length>0){if(ze&&Ze){const ne=He(Ne[0]);t.texStorage2D(n.TEXTURE_2D,me,Me,ne.width,ne.height)}for(let ne=0,ge=Ne.length;ne<ge;ne++)pe=Ne[ne],ze?H&&t.texSubImage2D(n.TEXTURE_2D,ne,0,0,fe,Le,pe):t.texImage2D(n.TEXTURE_2D,ne,Me,fe,Le,pe);v.generateMipmaps=!1}else if(ze){if(Ze){const ne=He(te);t.texStorage2D(n.TEXTURE_2D,me,Me,ne.width,ne.height)}H&&t.texSubImage2D(n.TEXTURE_2D,0,0,0,fe,Le,te)}else t.texImage2D(n.TEXTURE_2D,0,Me,fe,Le,te);g(v)&&_(V),de.__version=le.version,v.onUpdate&&v.onUpdate(v)}P.__version=v.version}function he(P,v,U){if(v.image.length!==6)return;const V=We(P,v),Z=v.source;t.bindTexture(n.TEXTURE_CUBE_MAP,P.__webglTexture,n.TEXTURE0+U);const le=i.get(Z);if(Z.version!==le.__version||V===!0){t.activeTexture(n.TEXTURE0+U);const de=ot.getPrimaries(ot.workingColorSpace),Q=v.colorSpace===Vn?null:ot.getPrimaries(v.colorSpace),te=v.colorSpace===Vn||de===Q?n.NONE:n.BROWSER_DEFAULT_WEBGL;t.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,v.flipY),t.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,v.premultiplyAlpha),t.pixelStorei(n.UNPACK_ALIGNMENT,v.unpackAlignment),t.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,te);const fe=v.isCompressedTexture||v.image[0].isCompressedTexture,Le=v.image[0]&&v.image[0].isDataTexture,Me=[];for(let oe=0;oe<6;oe++)!fe&&!Le?Me[oe]=x(v.image[oe],!0,r.maxCubemapSize):Me[oe]=Le?v.image[oe].image:v.image[oe],Me[oe]=je(v,Me[oe]);const pe=Me[0],Ne=a.convert(v.format,v.colorSpace),ze=a.convert(v.type),Ze=S(v.internalFormat,Ne,ze,v.normalized,v.colorSpace),H=v.isVideoTexture!==!0,me=le.__version===void 0||V===!0,ne=Z.dataReady;let ge=A(v,pe);Be(n.TEXTURE_CUBE_MAP,v);let Se;if(fe){H&&me&&t.texStorage2D(n.TEXTURE_CUBE_MAP,ge,Ze,pe.width,pe.height);for(let oe=0;oe<6;oe++){Se=Me[oe].mipmaps;for(let Oe=0;Oe<Se.length;Oe++){const De=Se[Oe];v.format!==Fn?Ne!==null?H?ne&&t.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+oe,Oe,0,0,De.width,De.height,Ne,De.data):t.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+oe,Oe,Ze,De.width,De.height,0,De.data):Ve("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):H?ne&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+oe,Oe,0,0,De.width,De.height,Ne,ze,De.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+oe,Oe,Ze,De.width,De.height,0,Ne,ze,De.data)}}}else{if(Se=v.mipmaps,H&&me){Se.length>0&&ge++;const oe=He(Me[0]);t.texStorage2D(n.TEXTURE_CUBE_MAP,ge,Ze,oe.width,oe.height)}for(let oe=0;oe<6;oe++)if(Le){H?ne&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+oe,0,0,0,Me[oe].width,Me[oe].height,Ne,ze,Me[oe].data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+oe,0,Ze,Me[oe].width,Me[oe].height,0,Ne,ze,Me[oe].data);for(let Oe=0;Oe<Se.length;Oe++){const Lt=Se[Oe].image[oe].image;H?ne&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+oe,Oe+1,0,0,Lt.width,Lt.height,Ne,ze,Lt.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+oe,Oe+1,Ze,Lt.width,Lt.height,0,Ne,ze,Lt.data)}}else{H?ne&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+oe,0,0,0,Ne,ze,Me[oe]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+oe,0,Ze,Ne,ze,Me[oe]);for(let Oe=0;Oe<Se.length;Oe++){const De=Se[Oe];H?ne&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+oe,Oe+1,0,0,Ne,ze,De.image[oe]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+oe,Oe+1,Ze,Ne,ze,De.image[oe])}}}g(v)&&_(n.TEXTURE_CUBE_MAP),le.__version=Z.version,v.onUpdate&&v.onUpdate(v)}P.__version=v.version}function se(P,v,U,V,Z,le){const de=a.convert(U.format,U.colorSpace),Q=a.convert(U.type),te=S(U.internalFormat,de,Q,U.normalized,U.colorSpace),fe=i.get(v),Le=i.get(U);if(Le.__renderTarget=v,!fe.__hasExternalTextures){const Me=Math.max(1,v.width>>le),pe=Math.max(1,v.height>>le);Z===n.TEXTURE_3D||Z===n.TEXTURE_2D_ARRAY?t.texImage3D(Z,le,te,Me,pe,v.depth,0,de,Q,null):t.texImage2D(Z,le,te,Me,pe,0,de,Q,null)}t.bindFramebuffer(n.FRAMEBUFFER,P),Rt(v)?l.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,V,Z,Le.__webglTexture,0,yt(v)):(Z===n.TEXTURE_2D||Z>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&Z<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,V,Z,Le.__webglTexture,le),t.bindFramebuffer(n.FRAMEBUFFER,null)}function ye(P,v,U){if(n.bindRenderbuffer(n.RENDERBUFFER,P),v.depthBuffer){const V=v.depthTexture,Z=V&&V.isDepthTexture?V.type:null,le=R(v.stencilBuffer,Z),de=v.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;Rt(v)?l.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,yt(v),le,v.width,v.height):U?n.renderbufferStorageMultisample(n.RENDERBUFFER,yt(v),le,v.width,v.height):n.renderbufferStorage(n.RENDERBUFFER,le,v.width,v.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,de,n.RENDERBUFFER,P)}else{const V=v.textures;for(let Z=0;Z<V.length;Z++){const le=V[Z],de=a.convert(le.format,le.colorSpace),Q=a.convert(le.type),te=S(le.internalFormat,de,Q,le.normalized,le.colorSpace);Rt(v)?l.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,yt(v),te,v.width,v.height):U?n.renderbufferStorageMultisample(n.RENDERBUFFER,yt(v),te,v.width,v.height):n.renderbufferStorage(n.RENDERBUFFER,te,v.width,v.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function Qe(P,v,U){const V=v.isWebGLCubeRenderTarget===!0;if(t.bindFramebuffer(n.FRAMEBUFFER,P),!(v.depthTexture&&v.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");const Z=i.get(v.depthTexture);if(Z.__renderTarget=v,(!Z.__webglTexture||v.depthTexture.image.width!==v.width||v.depthTexture.image.height!==v.height)&&(v.depthTexture.image.width=v.width,v.depthTexture.image.height=v.height,v.depthTexture.needsUpdate=!0),V){if(Z.__webglInit===void 0&&(Z.__webglInit=!0,v.depthTexture.addEventListener("dispose",D)),Z.__webglTexture===void 0){Z.__webglTexture=n.createTexture(),t.bindTexture(n.TEXTURE_CUBE_MAP,Z.__webglTexture),Be(n.TEXTURE_CUBE_MAP,v.depthTexture);const fe=a.convert(v.depthTexture.format),Le=a.convert(v.depthTexture.type);let Me;v.depthTexture.format===Ii?Me=n.DEPTH_COMPONENT24:v.depthTexture.format===lr&&(Me=n.DEPTH24_STENCIL8);for(let pe=0;pe<6;pe++)n.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+pe,0,Me,v.width,v.height,0,fe,Le,null)}}else ae(v.depthTexture,0);const le=Z.__webglTexture,de=yt(v),Q=V?n.TEXTURE_CUBE_MAP_POSITIVE_X+U:n.TEXTURE_2D,te=v.depthTexture.format===lr?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;if(v.depthTexture.format===Ii)Rt(v)?l.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,te,Q,le,0,de):n.framebufferTexture2D(n.FRAMEBUFFER,te,Q,le,0);else if(v.depthTexture.format===lr)Rt(v)?l.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,te,Q,le,0,de):n.framebufferTexture2D(n.FRAMEBUFFER,te,Q,le,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function Ce(P){const v=i.get(P),U=P.isWebGLCubeRenderTarget===!0;if(v.__boundDepthTexture!==P.depthTexture){const V=P.depthTexture;if(v.__depthDisposeCallback&&v.__depthDisposeCallback(),V){const Z=()=>{delete v.__boundDepthTexture,delete v.__depthDisposeCallback,V.removeEventListener("dispose",Z)};V.addEventListener("dispose",Z),v.__depthDisposeCallback=Z}v.__boundDepthTexture=V}if(P.depthTexture&&!v.__autoAllocateDepthBuffer)if(U)for(let V=0;V<6;V++)Qe(v.__webglFramebuffer[V],P,V);else{const V=P.texture.mipmaps;V&&V.length>0?Qe(v.__webglFramebuffer[0],P,0):Qe(v.__webglFramebuffer,P,0)}else if(U){v.__webglDepthbuffer=[];for(let V=0;V<6;V++)if(t.bindFramebuffer(n.FRAMEBUFFER,v.__webglFramebuffer[V]),v.__webglDepthbuffer[V]===void 0)v.__webglDepthbuffer[V]=n.createRenderbuffer(),ye(v.__webglDepthbuffer[V],P,!1);else{const Z=P.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,le=v.__webglDepthbuffer[V];n.bindRenderbuffer(n.RENDERBUFFER,le),n.framebufferRenderbuffer(n.FRAMEBUFFER,Z,n.RENDERBUFFER,le)}}else{const V=P.texture.mipmaps;if(V&&V.length>0?t.bindFramebuffer(n.FRAMEBUFFER,v.__webglFramebuffer[0]):t.bindFramebuffer(n.FRAMEBUFFER,v.__webglFramebuffer),v.__webglDepthbuffer===void 0)v.__webglDepthbuffer=n.createRenderbuffer(),ye(v.__webglDepthbuffer,P,!1);else{const Z=P.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,le=v.__webglDepthbuffer;n.bindRenderbuffer(n.RENDERBUFFER,le),n.framebufferRenderbuffer(n.FRAMEBUFFER,Z,n.RENDERBUFFER,le)}}t.bindFramebuffer(n.FRAMEBUFFER,null)}function Fe(P,v,U){const V=i.get(P);v!==void 0&&se(V.__webglFramebuffer,P,P.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),U!==void 0&&Ce(P)}function qe(P){const v=P.texture,U=i.get(P),V=i.get(v);P.addEventListener("dispose",b);const Z=P.textures,le=P.isWebGLCubeRenderTarget===!0,de=Z.length>1;if(de||(V.__webglTexture===void 0&&(V.__webglTexture=n.createTexture()),V.__version=v.version,o.memory.textures++),le){U.__webglFramebuffer=[];for(let Q=0;Q<6;Q++)if(v.mipmaps&&v.mipmaps.length>0){U.__webglFramebuffer[Q]=[];for(let te=0;te<v.mipmaps.length;te++)U.__webglFramebuffer[Q][te]=n.createFramebuffer()}else U.__webglFramebuffer[Q]=n.createFramebuffer()}else{if(v.mipmaps&&v.mipmaps.length>0){U.__webglFramebuffer=[];for(let Q=0;Q<v.mipmaps.length;Q++)U.__webglFramebuffer[Q]=n.createFramebuffer()}else U.__webglFramebuffer=n.createFramebuffer();if(de)for(let Q=0,te=Z.length;Q<te;Q++){const fe=i.get(Z[Q]);fe.__webglTexture===void 0&&(fe.__webglTexture=n.createTexture(),o.memory.textures++)}if(P.samples>0&&Rt(P)===!1){U.__webglMultisampledFramebuffer=n.createFramebuffer(),U.__webglColorRenderbuffer=[],t.bindFramebuffer(n.FRAMEBUFFER,U.__webglMultisampledFramebuffer);for(let Q=0;Q<Z.length;Q++){const te=Z[Q];U.__webglColorRenderbuffer[Q]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,U.__webglColorRenderbuffer[Q]);const fe=a.convert(te.format,te.colorSpace),Le=a.convert(te.type),Me=S(te.internalFormat,fe,Le,te.normalized,te.colorSpace,P.isXRRenderTarget===!0),pe=yt(P);n.renderbufferStorageMultisample(n.RENDERBUFFER,pe,Me,P.width,P.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+Q,n.RENDERBUFFER,U.__webglColorRenderbuffer[Q])}n.bindRenderbuffer(n.RENDERBUFFER,null),P.depthBuffer&&(U.__webglDepthRenderbuffer=n.createRenderbuffer(),ye(U.__webglDepthRenderbuffer,P,!0)),t.bindFramebuffer(n.FRAMEBUFFER,null)}}if(le){t.bindTexture(n.TEXTURE_CUBE_MAP,V.__webglTexture),Be(n.TEXTURE_CUBE_MAP,v);for(let Q=0;Q<6;Q++)if(v.mipmaps&&v.mipmaps.length>0)for(let te=0;te<v.mipmaps.length;te++)se(U.__webglFramebuffer[Q][te],P,v,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+Q,te);else se(U.__webglFramebuffer[Q],P,v,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+Q,0);g(v)&&_(n.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(de){for(let Q=0,te=Z.length;Q<te;Q++){const fe=Z[Q],Le=i.get(fe);let Me=n.TEXTURE_2D;(P.isWebGL3DRenderTarget||P.isWebGLArrayRenderTarget)&&(Me=P.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(Me,Le.__webglTexture),Be(Me,fe),se(U.__webglFramebuffer,P,fe,n.COLOR_ATTACHMENT0+Q,Me,0),g(fe)&&_(Me)}t.unbindTexture()}else{let Q=n.TEXTURE_2D;if((P.isWebGL3DRenderTarget||P.isWebGLArrayRenderTarget)&&(Q=P.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(Q,V.__webglTexture),Be(Q,v),v.mipmaps&&v.mipmaps.length>0)for(let te=0;te<v.mipmaps.length;te++)se(U.__webglFramebuffer[te],P,v,n.COLOR_ATTACHMENT0,Q,te);else se(U.__webglFramebuffer,P,v,n.COLOR_ATTACHMENT0,Q,0);g(v)&&_(Q),t.unbindTexture()}P.depthBuffer&&Ce(P)}function Ke(P){const v=P.textures;for(let U=0,V=v.length;U<V;U++){const Z=v[U];if(g(Z)){const le=E(P),de=i.get(Z).__webglTexture;t.bindTexture(le,de),_(le),t.unbindTexture()}}}const Tt=[],Ut=[];function jt(P){if(P.samples>0){if(Rt(P)===!1){const v=P.textures,U=P.width,V=P.height;let Z=n.COLOR_BUFFER_BIT;const le=P.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,de=i.get(P),Q=v.length>1;if(Q)for(let fe=0;fe<v.length;fe++)t.bindFramebuffer(n.FRAMEBUFFER,de.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+fe,n.RENDERBUFFER,null),t.bindFramebuffer(n.FRAMEBUFFER,de.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+fe,n.TEXTURE_2D,null,0);t.bindFramebuffer(n.READ_FRAMEBUFFER,de.__webglMultisampledFramebuffer);const te=P.texture.mipmaps;te&&te.length>0?t.bindFramebuffer(n.DRAW_FRAMEBUFFER,de.__webglFramebuffer[0]):t.bindFramebuffer(n.DRAW_FRAMEBUFFER,de.__webglFramebuffer);for(let fe=0;fe<v.length;fe++){if(P.resolveDepthBuffer&&(P.depthBuffer&&(Z|=n.DEPTH_BUFFER_BIT),P.stencilBuffer&&P.resolveStencilBuffer&&(Z|=n.STENCIL_BUFFER_BIT)),Q){n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,de.__webglColorRenderbuffer[fe]);const Le=i.get(v[fe]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,Le,0)}n.blitFramebuffer(0,0,U,V,0,0,U,V,Z,n.NEAREST),u===!0&&(Tt.length=0,Ut.length=0,Tt.push(n.COLOR_ATTACHMENT0+fe),P.depthBuffer&&P.storeMultisampledDepthBuffer===!1&&(Tt.push(le),Ut.push(le),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,Ut)),n.invalidateFramebuffer(n.READ_FRAMEBUFFER,Tt))}if(t.bindFramebuffer(n.READ_FRAMEBUFFER,null),t.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),Q)for(let fe=0;fe<v.length;fe++){t.bindFramebuffer(n.FRAMEBUFFER,de.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+fe,n.RENDERBUFFER,de.__webglColorRenderbuffer[fe]);const Le=i.get(v[fe]).__webglTexture;t.bindFramebuffer(n.FRAMEBUFFER,de.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+fe,n.TEXTURE_2D,Le,0)}t.bindFramebuffer(n.DRAW_FRAMEBUFFER,de.__webglMultisampledFramebuffer)}else if(P.depthBuffer&&P.storeMultisampledDepthBuffer===!1&&u){const v=P.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[v])}}}function yt(P){return Math.min(r.maxSamples,P.samples)}function Rt(P){const v=i.get(P);return P.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&v.__useRenderToTexture!==!1}function z(P){const v=o.render.frame;h.get(P)!==v&&(h.set(P,v),P.update())}function je(P,v){const U=P.colorSpace,V=P.format,Z=P.type;return P.isCompressedTexture===!0||P.isVideoTexture===!0||U!==Ea&&U!==Vn&&(ot.getTransfer(U)===bt?(V!==Fn||Z!==Rn)&&Ve("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):ht("WebGLTextures: Unsupported texture color space:",U)),v}function He(P){return typeof HTMLImageElement<"u"&&P instanceof HTMLImageElement?(c.width=P.naturalWidth||P.width,c.height=P.naturalHeight||P.height):typeof VideoFrame<"u"&&P instanceof VideoFrame?(c.width=P.displayWidth,c.height=P.displayHeight):(c.width=P.width,c.height=P.height),c}this.allocateTextureUnit=W,this.resetTextureUnits=O,this.getTextureUnits=I,this.setTextureUnits=B,this.setTexture2D=ae,this.setTexture2DArray=q,this.setTexture3D=ee,this.setTextureCube=F,this.rebindTextures=Fe,this.setupRenderTarget=qe,this.updateRenderTargetMipmap=Ke,this.updateMultisampleRenderTarget=jt,this.setupDepthRenderbuffer=Ce,this.setupFrameBufferTexture=se,this.useMultisampledRTT=Rt,this.isReversedDepthBuffer=function(){return t.buffers.depth.getReversed()}}function Yx(n,e){function t(i,r=Vn){let a;const o=ot.getTransfer(r);if(i===Rn)return n.UNSIGNED_BYTE;if(i===Pl)return n.UNSIGNED_SHORT_4_4_4_4;if(i===Il)return n.UNSIGNED_SHORT_5_5_5_1;if(i===Yu)return n.UNSIGNED_INT_5_9_9_9_REV;if(i===Xu)return n.UNSIGNED_INT_10F_11F_11F_REV;if(i===Wu)return n.BYTE;if(i===Vu)return n.SHORT;if(i===ba)return n.UNSIGNED_SHORT;if(i===Dl)return n.INT;if(i===pi)return n.UNSIGNED_INT;if(i===ci)return n.FLOAT;if(i===mi)return n.HALF_FLOAT;if(i===Ku)return n.ALPHA;if(i===qu)return n.RGB;if(i===Fn)return n.RGBA;if(i===Ii)return n.DEPTH_COMPONENT;if(i===lr)return n.DEPTH_STENCIL;if(i===Zu)return n.RED;if(i===Nl)return n.RED_INTEGER;if(i===pr)return n.RG;if(i===Ol)return n.RG_INTEGER;if(i===Fl)return n.RGBA_INTEGER;if(i===ds||i===fs||i===ps||i===ms)if(o===bt)if(a=e.get("WEBGL_compressed_texture_s3tc_srgb"),a!==null){if(i===ds)return a.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===fs)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===ps)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===ms)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(a=e.get("WEBGL_compressed_texture_s3tc"),a!==null){if(i===ds)return a.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===fs)return a.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===ps)return a.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===ms)return a.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===Uo||i===Bo||i===ko||i===zo)if(a=e.get("WEBGL_compressed_texture_pvrtc"),a!==null){if(i===Uo)return a.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===Bo)return a.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===ko)return a.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===zo)return a.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===Ho||i===Go||i===Wo||i===Vo||i===Yo||i===vs||i===Xo)if(a=e.get("WEBGL_compressed_texture_etc"),a!==null){if(i===Ho||i===Go)return o===bt?a.COMPRESSED_SRGB8_ETC2:a.COMPRESSED_RGB8_ETC2;if(i===Wo)return o===bt?a.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:a.COMPRESSED_RGBA8_ETC2_EAC;if(i===Vo)return a.COMPRESSED_R11_EAC;if(i===Yo)return a.COMPRESSED_SIGNED_R11_EAC;if(i===vs)return a.COMPRESSED_RG11_EAC;if(i===Xo)return a.COMPRESSED_SIGNED_RG11_EAC}else return null;if(i===Ko||i===qo||i===Zo||i===$o||i===Jo||i===Qo||i===jo||i===el||i===tl||i===nl||i===il||i===rl||i===al||i===sl)if(a=e.get("WEBGL_compressed_texture_astc"),a!==null){if(i===Ko)return o===bt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:a.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===qo)return o===bt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:a.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===Zo)return o===bt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:a.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===$o)return o===bt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:a.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===Jo)return o===bt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:a.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===Qo)return o===bt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:a.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===jo)return o===bt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:a.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===el)return o===bt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:a.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===tl)return o===bt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:a.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===nl)return o===bt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:a.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===il)return o===bt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:a.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===rl)return o===bt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:a.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===al)return o===bt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:a.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===sl)return o===bt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:a.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===ol||i===ll||i===cl)if(a=e.get("EXT_texture_compression_bptc"),a!==null){if(i===ol)return o===bt?a.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:a.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===ll)return a.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===cl)return a.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===ul||i===hl||i===bs||i===dl)if(a=e.get("EXT_texture_compression_rgtc"),a!==null){if(i===ul)return a.COMPRESSED_RED_RGTC1_EXT;if(i===hl)return a.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===bs)return a.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===dl)return a.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===Sa?n.UNSIGNED_INT_24_8:n[i]!==void 0?n[i]:null}return{convert:t}}const Xx=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Kx=`
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

}`;class qx{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){const i=new sh(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=i}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,i=new fn({vertexShader:Xx,fragmentShader:Kx,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new Mn(new xi(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class Zx extends gr{constructor(e,t){super();const i=this;let r=null,a=1,o=null,l="local-floor",u=1,c=null,h=null,f=null,d=null,p=null,m=null;const M=typeof XRWebGLBinding<"u",x=new qx,g={},_=t.getContextAttributes();let E=null,S=null;const R=[],A=[],D=new Xe;let b=null,w=null;const L=new Nn;L.viewport=new Ft;const C=new Nn;C.viewport=new Ft;const N=[L,C],O=new im;let I=null,B=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(j){let ie=R[j];return ie===void 0&&(ie=new Qs,R[j]=ie),ie.getTargetRaySpace()},this.getControllerGrip=function(j){let ie=R[j];return ie===void 0&&(ie=new Qs,R[j]=ie),ie.getGripSpace()},this.getHand=function(j){let ie=R[j];return ie===void 0&&(ie=new Qs,R[j]=ie),ie.getHandSpace()};function W(j){const ie=A.indexOf(j.inputSource);if(ie===-1)return;const G=R[ie];G!==void 0&&(G.update(j.inputSource,j.frame,c||o),G.dispatchEvent({type:j.type,data:j.inputSource}))}function $(){r.removeEventListener("select",W),r.removeEventListener("selectstart",W),r.removeEventListener("selectend",W),r.removeEventListener("squeeze",W),r.removeEventListener("squeezestart",W),r.removeEventListener("squeezeend",W),r.removeEventListener("end",$),r.removeEventListener("inputsourceschange",ae);for(let j=0;j<R.length;j++){const ie=A[j];ie!==null&&(A[j]=null,R[j].disconnect(ie))}I=null,B=null,x.reset();for(const j in g)delete g[j];if(e.setRenderTarget(E),p=null,d=null,f=null,r=null,S=null,We.stop(),i.isPresenting=!1,e.setPixelRatio(b),e.setSize(D.width,D.height,!1),w!==null){const j=w.camera;j.fov=w.fov,j.zoom=w.zoom,j.updateProjectionMatrix(),w=null}i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(j){a=j,i.isPresenting===!0&&Ve("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(j){l=j,i.isPresenting===!0&&Ve("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||o},this.setReferenceSpace=function(j){c=j},this.getBaseLayer=function(){return d!==null?d:p},this.getBinding=function(){return f===null&&M&&(f=new XRWebGLBinding(r,t)),f},this.getFrame=function(){return m},this.getSession=function(){return r},this.setSession=async function(j){if(r=j,r!==null){if(E=e.getRenderTarget(),r.addEventListener("select",W),r.addEventListener("selectstart",W),r.addEventListener("selectend",W),r.addEventListener("squeeze",W),r.addEventListener("squeezestart",W),r.addEventListener("squeezeend",W),r.addEventListener("end",$),r.addEventListener("inputsourceschange",ae),_.xrCompatible!==!0&&await t.makeXRCompatible(),b=e.getPixelRatio(),e.getSize(D),M&&"createProjectionLayer"in XRWebGLBinding.prototype){let G=null,he=null,se=null;_.depth&&(se=_.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,G=_.stencil?lr:Ii,he=_.stencil?Sa:pi);const ye={colorFormat:t.RGBA8,depthFormat:se,scaleFactor:a};f=this.getBinding(),d=f.createProjectionLayer(ye),r.updateRenderState({layers:[d]}),e.setPixelRatio(1),e.setSize(d.textureWidth,d.textureHeight,!1),S=new Un(d.textureWidth,d.textureHeight,{format:Fn,type:Rn,depthTexture:new ya(d.textureWidth,d.textureHeight,he,void 0,void 0,void 0,void 0,void 0,void 0,G),stencilBuffer:_.stencil,colorSpace:e.outputColorSpace,samples:_.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1,storeMultisampledDepthBuffer:d.ignoreDepthValues===!1,storeMultisampledStencilBuffer:d.ignoreDepthValues===!1})}else{const G={antialias:_.antialias,alpha:!0,depth:_.depth,stencil:_.stencil,framebufferScaleFactor:a};p=new XRWebGLLayer(r,t,G),r.updateRenderState({baseLayer:p}),e.setPixelRatio(1),e.setSize(p.framebufferWidth,p.framebufferHeight,!1),S=new Un(p.framebufferWidth,p.framebufferHeight,{format:Fn,type:Rn,colorSpace:e.outputColorSpace,stencilBuffer:_.stencil,resolveDepthBuffer:p.ignoreDepthValues===!1,resolveStencilBuffer:p.ignoreDepthValues===!1,storeMultisampledDepthBuffer:p.ignoreDepthValues===!1,storeMultisampledStencilBuffer:p.ignoreDepthValues===!1})}S.isXRRenderTarget=!0,this.setFoveation(u),c=null,o=await r.requestReferenceSpace(l),We.setContext(r),We.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return x.getDepthTexture()};function ae(j){for(let ie=0;ie<j.removed.length;ie++){const G=j.removed[ie],he=A.indexOf(G);he>=0&&(A[he]=null,R[he].disconnect(G))}for(let ie=0;ie<j.added.length;ie++){const G=j.added[ie];let he=A.indexOf(G);if(he===-1){for(let ye=0;ye<R.length;ye++)if(ye>=A.length){A.push(G),he=ye;break}else if(A[ye]===null){A[ye]=G,he=ye;break}if(he===-1)break}const se=R[he];se&&se.connect(G)}}const q=new Y,ee=new Y;function F(j,ie,G){q.setFromMatrixPosition(ie.matrixWorld),ee.setFromMatrixPosition(G.matrixWorld);const he=q.distanceTo(ee),se=ie.projectionMatrix.elements,ye=G.projectionMatrix.elements,Qe=se[14]/(se[10]-1),Ce=se[14]/(se[10]+1),Fe=(se[9]+1)/se[5],qe=(se[9]-1)/se[5],Ke=(se[8]-1)/se[0],Tt=(ye[8]+1)/ye[0],Ut=Qe*Ke,jt=Qe*Tt,yt=he/(-Ke+Tt),Rt=yt*-Ke;if(ie.matrixWorld.decompose(j.position,j.quaternion,j.scale),j.translateX(Rt),j.translateZ(yt),j.matrixWorld.compose(j.position,j.quaternion,j.scale),j.matrixWorldInverse.copy(j.matrixWorld).invert(),se[10]===-1)j.projectionMatrix.copy(ie.projectionMatrix),j.projectionMatrixInverse.copy(ie.projectionMatrixInverse);else{const z=Qe+yt,je=Ce+yt,He=Ut-Rt,P=jt+(he-Rt),v=Fe*Ce/je*z,U=qe*Ce/je*z;j.projectionMatrix.makePerspective(He,P,v,U,z,je),j.projectionMatrixInverse.copy(j.projectionMatrix).invert()}}function re(j,ie){ie===null?j.matrixWorld.copy(j.matrix):j.matrixWorld.multiplyMatrices(ie.matrixWorld,j.matrix),j.matrixWorldInverse.copy(j.matrixWorld).invert()}this.updateCamera=function(j){if(r===null)return;let ie=j.near,G=j.far;x.texture!==null&&(x.depthNear>0&&(ie=x.depthNear),x.depthFar>0&&(G=x.depthFar)),O.near=C.near=L.near=ie,O.far=C.far=L.far=G,(I!==O.near||B!==O.far)&&(r.updateRenderState({depthNear:O.near,depthFar:O.far}),I=O.near,B=O.far),O.layers.mask=j.layers.mask|6,L.layers.mask=O.layers.mask&-5,C.layers.mask=O.layers.mask&-3;const he=j.parent,se=O.cameras;re(O,he);for(let ye=0;ye<se.length;ye++)re(se[ye],he);se.length===2?F(O,L,C):O.projectionMatrix.copy(L.projectionMatrix),w===null&&j.isPerspectiveCamera&&(w={camera:j,fov:j.fov,zoom:j.zoom}),ue(j,O,he)};function ue(j,ie,G){G===null?j.matrix.copy(ie.matrixWorld):(j.matrix.copy(G.matrixWorld),j.matrix.invert(),j.matrix.multiply(ie.matrixWorld)),j.matrix.decompose(j.position,j.quaternion,j.scale),j.updateMatrixWorld(!0),j.projectionMatrix.copy(ie.projectionMatrix),j.projectionMatrixInverse.copy(ie.projectionMatrixInverse),j.isPerspectiveCamera&&(j.fov=fl*2*Math.atan(1/j.projectionMatrix.elements[5]),j.zoom=1)}this.getCamera=function(){return O},this.getFoveation=function(){if(!(d===null&&p===null))return u},this.setFoveation=function(j){u=j,d!==null&&(d.fixedFoveation=j),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=j)},this.hasDepthSensing=function(){return x.texture!==null},this.getDepthSensingMesh=function(){return x.getMesh(O)},this.getCameraTexture=function(j){return g[j]};let Re=null;function Be(j,ie){if(h=ie.getViewerPose(c||o),m=ie,h!==null){const G=h.views;p!==null&&(e.setRenderTargetFramebuffer(S,p.framebuffer),e.setRenderTarget(S));let he=!1;G.length!==O.cameras.length&&(O.cameras.length=0,he=!0);for(let Ce=0;Ce<G.length;Ce++){const Fe=G[Ce];let qe=null;if(p!==null)qe=p.getViewport(Fe);else{const Tt=f.getViewSubImage(d,Fe);qe=Tt.viewport,Ce===0&&(e.setRenderTargetTextures(S,Tt.colorTexture,Tt.depthStencilTexture),e.setRenderTarget(S))}let Ke=N[Ce];Ke===void 0&&(Ke=new Nn,Ke.layers.enable(Ce),Ke.viewport=new Ft,N[Ce]=Ke),Ke.matrix.fromArray(Fe.transform.matrix),Ke.matrix.decompose(Ke.position,Ke.quaternion,Ke.scale),Ke.projectionMatrix.fromArray(Fe.projectionMatrix),Ke.projectionMatrixInverse.copy(Ke.projectionMatrix).invert(),Ke.viewport.set(qe.x,qe.y,qe.width,qe.height),Ce===0&&(O.matrix.copy(Ke.matrix),O.matrix.decompose(O.position,O.quaternion,O.scale)),he===!0&&O.cameras.push(Ke)}const se=r.enabledFeatures;if(se&&se.includes("depth-sensing")&&r.depthUsage=="gpu-optimized"&&M){f=i.getBinding();const Ce=f.getDepthInformation(G[0]);Ce&&Ce.isValid&&Ce.texture&&x.init(Ce,r.renderState)}if(se&&se.includes("camera-access")&&M){e.state.unbindTexture(),f=i.getBinding();for(let Ce=0;Ce<G.length;Ce++){const Fe=G[Ce].camera;if(Fe){let qe=g[Fe];qe||(qe=new sh,g[Fe]=qe);const Ke=f.getCameraImage(Fe);qe.sourceTexture=Ke}}}}for(let G=0;G<R.length;G++){const he=A[G],se=R[G];he!==null&&se!==void 0&&se.update(he,ie,c||o)}Re&&Re(j,ie),ie.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:ie}),m=null}const We=new hh;We.setAnimationLoop(Be),this.setAnimationLoop=function(j){Re=j},this.dispose=function(){}}}const $x=new Wt,Mh=new Ye;Mh.set(-1,0,0,0,1,0,0,0,1);function Jx(n,e){function t(x,g){x.matrixAutoUpdate===!0&&x.updateMatrix(),g.value.copy(x.matrix)}function i(x,g){g.color.getRGB(x.fogColor.value,oh(n)),g.isFog?(x.fogNear.value=g.near,x.fogFar.value=g.far):g.isFogExp2&&(x.fogDensity.value=g.density)}function r(x,g,_,E,S){g.isNodeMaterial?g.uniformsNeedUpdate=!1:g.isMeshBasicMaterial?a(x,g):g.isMeshLambertMaterial?(a(x,g),g.envMap&&(x.envMapIntensity.value=g.envMapIntensity)):g.isMeshToonMaterial?(a(x,g),f(x,g)):g.isMeshPhongMaterial?(a(x,g),h(x,g),g.envMap&&(x.envMapIntensity.value=g.envMapIntensity)):g.isMeshStandardMaterial?(a(x,g),d(x,g),g.isMeshPhysicalMaterial&&p(x,g,S)):g.isMeshMatcapMaterial?(a(x,g),m(x,g)):g.isMeshDepthMaterial?a(x,g):g.isMeshDistanceMaterial?(a(x,g),M(x,g)):g.isMeshNormalMaterial?a(x,g):g.isLineBasicMaterial?(o(x,g),g.isLineDashedMaterial&&l(x,g)):g.isPointsMaterial?u(x,g,_,E):g.isSpriteMaterial?c(x,g):g.isShadowMaterial?(x.color.value.copy(g.color),x.opacity.value=g.opacity):g.isShaderMaterial&&(g.uniformsNeedUpdate=!1)}function a(x,g){x.opacity.value=g.opacity,g.color&&x.diffuse.value.copy(g.color),g.emissive&&x.emissive.value.copy(g.emissive).multiplyScalar(g.emissiveIntensity),g.map&&(x.map.value=g.map,t(g.map,x.mapTransform)),g.alphaMap&&(x.alphaMap.value=g.alphaMap,t(g.alphaMap,x.alphaMapTransform)),g.bumpMap&&(x.bumpMap.value=g.bumpMap,t(g.bumpMap,x.bumpMapTransform),x.bumpScale.value=g.bumpScale,g.side===yn&&(x.bumpScale.value*=-1)),g.normalMap&&(x.normalMap.value=g.normalMap,t(g.normalMap,x.normalMapTransform),x.normalScale.value.copy(g.normalScale),g.side===yn&&x.normalScale.value.negate()),g.displacementMap&&(x.displacementMap.value=g.displacementMap,t(g.displacementMap,x.displacementMapTransform),x.displacementScale.value=g.displacementScale,x.displacementBias.value=g.displacementBias),g.emissiveMap&&(x.emissiveMap.value=g.emissiveMap,t(g.emissiveMap,x.emissiveMapTransform)),g.specularMap&&(x.specularMap.value=g.specularMap,t(g.specularMap,x.specularMapTransform)),g.alphaTest>0&&(x.alphaTest.value=g.alphaTest);const _=e.get(g),E=_.envMap,S=_.envMapRotation;E&&(x.envMap.value=E,x.envMapRotation.value.setFromMatrix4($x.makeRotationFromEuler(S)).transpose(),E.isCubeTexture&&E.isRenderTargetTexture===!1&&x.envMapRotation.value.premultiply(Mh),x.reflectivity.value=g.reflectivity,x.ior.value=g.ior,x.refractionRatio.value=g.refractionRatio),g.lightMap&&(x.lightMap.value=g.lightMap,x.lightMapIntensity.value=g.lightMapIntensity,t(g.lightMap,x.lightMapTransform)),g.aoMap&&(x.aoMap.value=g.aoMap,x.aoMapIntensity.value=g.aoMapIntensity,t(g.aoMap,x.aoMapTransform))}function o(x,g){x.diffuse.value.copy(g.color),x.opacity.value=g.opacity,g.map&&(x.map.value=g.map,t(g.map,x.mapTransform))}function l(x,g){x.dashSize.value=g.dashSize,x.totalSize.value=g.dashSize+g.gapSize,x.scale.value=g.scale}function u(x,g,_,E){x.diffuse.value.copy(g.color),x.opacity.value=g.opacity,x.size.value=g.size*_,x.scale.value=E*.5,g.map&&(x.map.value=g.map,t(g.map,x.uvTransform)),g.alphaMap&&(x.alphaMap.value=g.alphaMap,t(g.alphaMap,x.alphaMapTransform)),g.alphaTest>0&&(x.alphaTest.value=g.alphaTest)}function c(x,g){x.diffuse.value.copy(g.color),x.opacity.value=g.opacity,x.rotation.value=g.rotation,g.map&&(x.map.value=g.map,t(g.map,x.mapTransform)),g.alphaMap&&(x.alphaMap.value=g.alphaMap,t(g.alphaMap,x.alphaMapTransform)),g.alphaTest>0&&(x.alphaTest.value=g.alphaTest)}function h(x,g){x.specular.value.copy(g.specular),x.shininess.value=Math.max(g.shininess,1e-4)}function f(x,g){g.gradientMap&&(x.gradientMap.value=g.gradientMap)}function d(x,g){x.metalness.value=g.metalness,g.metalnessMap&&(x.metalnessMap.value=g.metalnessMap,t(g.metalnessMap,x.metalnessMapTransform)),x.roughness.value=g.roughness,g.roughnessMap&&(x.roughnessMap.value=g.roughnessMap,t(g.roughnessMap,x.roughnessMapTransform)),g.envMap&&(x.envMapIntensity.value=g.envMapIntensity)}function p(x,g,_){x.ior.value=g.ior,g.sheen>0&&(x.sheenColor.value.copy(g.sheenColor).multiplyScalar(g.sheen),x.sheenRoughness.value=g.sheenRoughness,g.sheenColorMap&&(x.sheenColorMap.value=g.sheenColorMap,t(g.sheenColorMap,x.sheenColorMapTransform)),g.sheenRoughnessMap&&(x.sheenRoughnessMap.value=g.sheenRoughnessMap,t(g.sheenRoughnessMap,x.sheenRoughnessMapTransform))),g.clearcoat>0&&(x.clearcoat.value=g.clearcoat,x.clearcoatRoughness.value=g.clearcoatRoughness,g.clearcoatMap&&(x.clearcoatMap.value=g.clearcoatMap,t(g.clearcoatMap,x.clearcoatMapTransform)),g.clearcoatRoughnessMap&&(x.clearcoatRoughnessMap.value=g.clearcoatRoughnessMap,t(g.clearcoatRoughnessMap,x.clearcoatRoughnessMapTransform)),g.clearcoatNormalMap&&(x.clearcoatNormalMap.value=g.clearcoatNormalMap,t(g.clearcoatNormalMap,x.clearcoatNormalMapTransform),x.clearcoatNormalScale.value.copy(g.clearcoatNormalScale),g.side===yn&&x.clearcoatNormalScale.value.negate())),g.dispersion>0&&(x.dispersion.value=g.dispersion),g.retroreflectivity>0&&(x.retroreflectivity.value=g.retroreflectivity),g.iridescence>0&&(x.iridescence.value=g.iridescence,x.iridescenceIOR.value=g.iridescenceIOR,x.iridescenceThicknessMinimum.value=g.iridescenceThicknessRange[0],x.iridescenceThicknessMaximum.value=g.iridescenceThicknessRange[1],g.iridescenceMap&&(x.iridescenceMap.value=g.iridescenceMap,t(g.iridescenceMap,x.iridescenceMapTransform)),g.iridescenceThicknessMap&&(x.iridescenceThicknessMap.value=g.iridescenceThicknessMap,t(g.iridescenceThicknessMap,x.iridescenceThicknessMapTransform))),g.transmission>0&&(x.transmission.value=g.transmission,x.transmissionSamplerMap.value=_.texture,x.transmissionSamplerSize.value.set(_.width,_.height),g.transmissionMap&&(x.transmissionMap.value=g.transmissionMap,t(g.transmissionMap,x.transmissionMapTransform)),x.thickness.value=g.thickness,g.thicknessMap&&(x.thicknessMap.value=g.thicknessMap,t(g.thicknessMap,x.thicknessMapTransform)),x.attenuationDistance.value=g.attenuationDistance,x.attenuationColor.value.copy(g.attenuationColor)),g.anisotropy>0&&(x.anisotropyVector.value.set(g.anisotropy*Math.cos(g.anisotropyRotation),g.anisotropy*Math.sin(g.anisotropyRotation)),g.anisotropyMap&&(x.anisotropyMap.value=g.anisotropyMap,t(g.anisotropyMap,x.anisotropyMapTransform))),x.specularIntensity.value=g.specularIntensity,x.specularColor.value.copy(g.specularColor),g.specularColorMap&&(x.specularColorMap.value=g.specularColorMap,t(g.specularColorMap,x.specularColorMapTransform)),g.specularIntensityMap&&(x.specularIntensityMap.value=g.specularIntensityMap,t(g.specularIntensityMap,x.specularIntensityMapTransform))}function m(x,g){g.matcap&&(x.matcap.value=g.matcap)}function M(x,g){const _=e.get(g).light;x.referencePosition.value.setFromMatrixPosition(_.matrixWorld),x.nearDistance.value=_.shadow.camera.near,x.farDistance.value=_.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:r}}function Qx(n,e,t,i){let r={},a={},o=[];const l=n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS);function u(S,R){const A=R.program;i.uniformBlockBinding(S,A)}function c(S,R){let A=r[S.id];A===void 0&&(x(S),A=h(S),r[S.id]=A,S.addEventListener("dispose",_));const D=R.program;i.updateUBOMapping(S,D);const b=e.render.frame;a[S.id]!==b&&(d(S),a[S.id]=b)}function h(S){const R=f();S.__bindingPointIndex=R;const A=n.createBuffer(),D=S.__size,b=S.usage;return n.bindBuffer(n.UNIFORM_BUFFER,A),n.bufferData(n.UNIFORM_BUFFER,D,b),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,R,A),A}function f(){for(let S=0;S<l;S++)if(o.indexOf(S)===-1)return o.push(S),S;return ht("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(S){const R=r[S.id],A=S.uniforms,D=S.__cache;n.bindBuffer(n.UNIFORM_BUFFER,R);for(let b=0,w=A.length;b<w;b++){const L=A[b];if(Array.isArray(L))for(let C=0,N=L.length;C<N;C++)p(L[C],b,C,D);else p(L,b,0,D)}n.bindBuffer(n.UNIFORM_BUFFER,null)}function p(S,R,A,D){if(M(S,R,A,D)===!0){const b=S.__offset,w=S.value;if(Array.isArray(w)){let L=0;for(let C=0;C<w.length;C++){const N=w[C],O=g(N);m(N,S.__data,L),typeof N!="number"&&typeof N!="boolean"&&!N.isMatrix3&&!ArrayBuffer.isView(N)&&(L+=O.storage/Float32Array.BYTES_PER_ELEMENT)}}else m(w,S.__data,0);n.bufferSubData(n.UNIFORM_BUFFER,b,S.__data)}}function m(S,R,A){typeof S=="number"||typeof S=="boolean"?R[0]=S:S.isMatrix3?(R[0]=S.elements[0],R[1]=S.elements[1],R[2]=S.elements[2],R[3]=0,R[4]=S.elements[3],R[5]=S.elements[4],R[6]=S.elements[5],R[7]=0,R[8]=S.elements[6],R[9]=S.elements[7],R[10]=S.elements[8],R[11]=0):ArrayBuffer.isView(S)?R.set(new S.constructor(S.buffer,S.byteOffset,R.length)):S.toArray(R,A)}function M(S,R,A,D){const b=S.value,w=R+"_"+A;if(D[w]===void 0)return typeof b=="number"||typeof b=="boolean"?D[w]=b:ArrayBuffer.isView(b)?D[w]=b.slice():D[w]=b.clone(),!0;{const L=D[w];if(typeof b=="number"||typeof b=="boolean"){if(L!==b)return D[w]=b,!0}else{if(ArrayBuffer.isView(b))return!0;if(L.equals(b)===!1)return L.copy(b),!0}}return!1}function x(S){const R=S.uniforms;let A=0;const D=16;for(let w=0,L=R.length;w<L;w++){const C=Array.isArray(R[w])?R[w]:[R[w]];for(let N=0,O=C.length;N<O;N++){const I=C[N],B=Array.isArray(I.value)?I.value:[I.value];for(let W=0,$=B.length;W<$;W++){const ae=B[W],q=g(ae),ee=A%D,F=ee%q.boundary,re=ee+F;A+=F,re!==0&&D-re<q.storage&&(A+=D-re),I.__data=new Float32Array(q.storage/Float32Array.BYTES_PER_ELEMENT),I.__offset=A,A+=q.storage}}}const b=A%D;return b>0&&(A+=D-b),S.__size=A,S.__cache={},this}function g(S){const R={boundary:0,storage:0};return typeof S=="number"||typeof S=="boolean"?(R.boundary=4,R.storage=4):S.isVector2?(R.boundary=8,R.storage=8):S.isVector3||S.isColor?(R.boundary=16,R.storage=12):S.isVector4?(R.boundary=16,R.storage=16):S.isMatrix3?(R.boundary=48,R.storage=48):S.isMatrix4?(R.boundary=64,R.storage=64):S.isTexture?Ve("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(S)?(R.boundary=16,R.storage=S.byteLength):Ve("WebGLRenderer: Unsupported uniform value type.",S),R}function _(S){const R=S.target;R.removeEventListener("dispose",_);const A=o.indexOf(R.__bindingPointIndex);o.splice(A,1),n.deleteBuffer(r[R.id]),delete r[R.id],delete a[R.id]}function E(){for(const S in r)n.deleteBuffer(r[S]);o=[],r={},a={}}return{bind:u,update:c,dispose:E}}const jx=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let ti=null;function eM(){return ti===null&&(ti=new Br(jx,16,16,pr,mi),ti.name="DFG_LUT",ti.minFilter=Yt,ti.magFilter=Yt,ti.wrapS=Ti,ti.wrapT=Ti,ti.generateMipmaps=!1,ti.needsUpdate=!0),ti}class tM{constructor(e={}){const{canvas:t=bp(),context:i=null,depth:r=!0,stencil:a=!1,alpha:o=!1,antialias:l=!1,premultipliedAlpha:u=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:f=!1,reversedDepthBuffer:d=!1,outputBufferType:p=Rn}=e;this.isWebGLRenderer=!0;let m;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");m=i.getContextAttributes().alpha}else m=o;const M=p,x=new Set([Fl,Ol,Nl]),g=new Set([Rn,pi,ba,Sa,Pl,Il]),_=new Uint32Array(4),E=new Int32Array(4),S=new Y;let R=null,A=null;const D=[],b=[];let w=null;this.domElement=t,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=hi,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const L=this;let C=!1,N=null,O=null,I=null,B=null;this._outputColorSpace=In;let W=0,$=0,ae=null,q=-1,ee=null;const F=new Ft,re=new Ft;let ue=null;const Re=new pt(0);let Be=0,We=t.width,j=t.height,ie=1,G=null,he=null;const se=new Ft(0,0,We,j),ye=new Ft(0,0,We,j);let Qe=!1;const Ce=new Hl;let Fe=!1,qe=!1;const Ke=new Wt,Tt=new Y,Ut=new Ft,jt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let yt=!1;function Rt(){return ae===null?ie:1}let z=i;function je(T,k){return t.getContext(T,k)}let He,P,v,U,V,Z,le,de,Q,te,fe,Le,Me,pe,Ne,ze,Ze,H,me,ne,ge,Se,oe;try{const T={alpha:!0,depth:r,stencil:a,antialias:l,premultipliedAlpha:u,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:f};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${Ll}`),t.addEventListener("webglcontextlost",Lt,!1),t.addEventListener("webglcontextrestored",mt,!1),t.addEventListener("webglcontextcreationerror",kn,!1),z===null){const k="webgl2";if(z=je(k,T),z===null)throw je(k)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}Oe()}catch(T){throw t.removeEventListener("webglcontextlost",Lt,!1),t.removeEventListener("webglcontextrestored",mt,!1),t.removeEventListener("webglcontextcreationerror",kn,!1),ht("WebGLRenderer: "+T.message),T}function Oe(){He=new e2(z),He.init(),ge=new Yx(z,He),P=new Vg(z,He,e,ge),v=new Wx(z,He),P.reversedDepthBuffer&&d&&v.buffers.depth.setReversed(!0),O=z.createFramebuffer(),I=z.createFramebuffer(),B=z.createFramebuffer(),U=new i2(z),V=new Cx,Z=new Vx(z,He,v,V,P,ge,U),le=new jg(L),de=new am(z),Se=new Gg(z,de),Q=new t2(z,de,U,Se),te=new a2(z,Q,de,Se,U),H=new r2(z,P,Z),Ne=new Yg(V),fe=new Rx(L,le,He,P,Se,Ne),Le=new Jx(L,V),Me=new Dx,pe=new Ux(He),Ze=new Hg(L,le,v,te,m,u),ze=new Gx(L,te,P),oe=new Qx(z,U,P,v),me=new Wg(z,He,U),ne=new n2(z,He,U),U.programs=fe.programs,L.capabilities=P,L.extensions=He,L.properties=V,L.renderLists=Me,L.shadowMap=ze,L.state=v,L.info=U}M!==Rn&&(w=new o2(M,t.width,t.height,l,r,a));const De=new Zx(L,z);this.xr=De,this.getContext=function(){return z},this.getContextAttributes=function(){return z.getContextAttributes()},this.forceContextLoss=function(){const T=He.get("WEBGL_lose_context");T&&T.loseContext()},this.forceContextRestore=function(){const T=He.get("WEBGL_lose_context");T&&T.restoreContext()},this.getPixelRatio=function(){return ie},this.setPixelRatio=function(T){T!==void 0&&(ie=T,this.setSize(We,j,!1))},this.getSize=function(T){return T.set(We,j)},this.setSize=function(T,k,J=!0){if(De.isPresenting){Ve("WebGLRenderer: Can't change size while VR device is presenting.");return}We=T,j=k,t.width=Math.floor(T*ie),t.height=Math.floor(k*ie),J===!0&&(t.style.width=T+"px",t.style.height=k+"px"),w!==null&&w.setSize(t.width,t.height),this.setViewport(0,0,T,k)},this.getDrawingBufferSize=function(T){return T.set(We*ie,j*ie).floor()},this.setDrawingBufferSize=function(T,k,J){We=T,j=k,ie=J,t.width=Math.floor(T*J),t.height=Math.floor(k*J),this.setViewport(0,0,T,k)},this.setEffects=function(T){if(M===Rn){ht("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(T){for(let k=0;k<T.length;k++)if(T[k].isOutputPass===!0){Ve("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}w.setEffects(T||[])},this.getCurrentViewport=function(T){return T.copy(F)},this.getViewport=function(T){return T.copy(se)},this.setViewport=function(T,k,J,X){T.isVector4?se.set(T.x,T.y,T.z,T.w):se.set(T,k,J,X),v.viewport(F.copy(se).multiplyScalar(ie).round())},this.getScissor=function(T){return T.copy(ye)},this.setScissor=function(T,k,J,X){T.isVector4?ye.set(T.x,T.y,T.z,T.w):ye.set(T,k,J,X),v.scissor(re.copy(ye).multiplyScalar(ie).round())},this.getScissorTest=function(){return Qe},this.setScissorTest=function(T){v.setScissorTest(Qe=T)},this.setOpaqueSort=function(T){G=T},this.setTransparentSort=function(T){he=T},this.getClearColor=function(T){return T.copy(Ze.getClearColor())},this.setClearColor=function(){Ze.setClearColor(...arguments)},this.getClearAlpha=function(){return Ze.getClearAlpha()},this.setClearAlpha=function(){Ze.setClearAlpha(...arguments)},this.clear=function(T=!0,k=!0,J=!0){let X=0;if(T){let K=!1;if(ae!==null){const be=ae.texture.format;K=x.has(be)}if(K){const be=ae.texture.type,we=g.has(be),ve=Ze.getClearColor(),Ae=Ze.getClearAlpha(),Pe=ve.r,et=ve.g,rt=ve.b;we?(_[0]=Pe,_[1]=et,_[2]=rt,_[3]=Ae,z.clearBufferuiv(z.COLOR,0,_)):(E[0]=Pe,E[1]=et,E[2]=rt,E[3]=Ae,z.clearBufferiv(z.COLOR,0,E))}else X|=z.COLOR_BUFFER_BIT}k&&(X|=z.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),J&&(X|=z.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),X!==0&&z.clear(X)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(T){T.setRenderer(this),N=T},this.dispose=function(){t.removeEventListener("webglcontextlost",Lt,!1),t.removeEventListener("webglcontextrestored",mt,!1),t.removeEventListener("webglcontextcreationerror",kn,!1),Ze.dispose(),Me.dispose(),pe.dispose(),V.dispose(),le.dispose(),te.dispose(),Se.dispose(),oe.dispose(),fe.dispose(),De.dispose(),De.removeEventListener("sessionstart",Yl),De.removeEventListener("sessionend",Xl),Ji.stop()};function Lt(T){T.preventDefault(),gc("WebGLRenderer: Context Lost."),C=!0}function mt(){gc("WebGLRenderer: Context Restored."),C=!1;const T=U.autoReset,k=ze.enabled,J=ze.autoUpdate,X=ze.needsUpdate,K=ze.type;Oe(),U.autoReset=T,ze.enabled=k,ze.autoUpdate=J,ze.needsUpdate=X,ze.type=K}function kn(T){ht("WebGLRenderer: A WebGL context could not be created. Reason: ",T.statusMessage)}function Qn(T){const k=T.target;k.removeEventListener("dispose",Qn),wh(k)}function wh(T){Ah(T),V.remove(T)}function Ah(T){const k=V.get(T).programs;k!==void 0&&(k.forEach(function(J){fe.releaseProgram(J)}),T.isShaderMaterial&&fe.releaseShaderCache(T))}this.renderBufferDirect=function(T,k,J,X,K,be){k===null&&(k=jt);const we=K.isMesh&&K.matrixWorld.determinantAffine()<0,ve=Ch(T,k,J,X,K);v.setMaterial(X,we);let Ae=J.index,Pe=1;if(X.wireframe===!0){if(Ae=Q.getWireframeAttribute(J),Ae===void 0)return;Pe=2}const et=J.drawRange,rt=J.attributes.position;let Te=et.start*Pe,gt=(et.start+et.count)*Pe;be!==null&&(Te=Math.max(Te,be.start*Pe),gt=Math.min(gt,(be.start+be.count)*Pe)),Ae!==null?(Te=Math.max(Te,0),gt=Math.min(gt,Ae.count)):rt!=null&&(Te=Math.max(Te,0),gt=Math.min(gt,rt.count));const Kt=gt-Te;if(Kt<0||Kt===1/0)return;Se.setup(K,X,ve,J,Ae);let Pt,Ct=me;if(Ae!==null&&(Pt=de.get(Ae),Ct=ne,Ct.setIndex(Pt)),K.isMesh)X.wireframe===!0?(v.setLineWidth(X.wireframeLinewidth*Rt()),Ct.setMode(z.LINES)):Ct.setMode(z.TRIANGLES);else if(K.isLine){let on=X.linewidth;on===void 0&&(on=1),v.setLineWidth(on*Rt()),K.isLineSegments?Ct.setMode(z.LINES):K.isLineLoop?Ct.setMode(z.LINE_LOOP):Ct.setMode(z.LINE_STRIP)}else K.isPoints?Ct.setMode(z.POINTS):K.isSprite&&Ct.setMode(z.TRIANGLES);if(K.isBatchedMesh)if(He.get("WEBGL_multi_draw"))Ct.renderMultiDraw(K._multiDrawStarts,K._multiDrawCounts,K._multiDrawCount);else{const on=K._multiDrawStarts,Ee=K._multiDrawCounts,pn=K._multiDrawCount,ut=Ae?de.get(Ae).bytesPerElement:1,Dn=V.get(X).currentProgram.getUniforms();for(let jn=0;jn<pn;jn++)Dn.setValue(z,"_gl_DrawID",jn),Ct.render(on[jn]/ut,Ee[jn])}else if(K.isInstancedMesh)Ct.renderInstances(Te,Kt,K.count);else if(J.isInstancedBufferGeometry){const on=J._maxInstanceCount!==void 0?J._maxInstanceCount:1/0,Ee=Math.min(J.instanceCount,on);Ct.renderInstances(Te,Kt,Ee)}else Ct.render(Te,Kt)};function Vl(T,k,J,X){N!==null&&T.isNodeMaterial&&N.setObject(X,T),Fe===!0&&Ne.setState(T,J,!1),T.transparent===!0&&T.side===Ai&&T.forceSinglePass===!1?(T.side=yn,T.needsUpdate=!0,La(T,k,X),T.side=dr,T.needsUpdate=!0,La(T,k,X),T.side=Ai):La(T,k,X)}this.compile=function(T,k,J=null){J===null&&(J=T),N!==null&&N.renderStart(T,k,J),A=pe.get(J),A.init(k),b.push(A),J.traverseVisible(function(K){K.isLight&&K.layers.test(k.layers)&&(A.pushLight(K),K.castShadow&&A.pushShadow(K))}),T!==J&&T.traverseVisible(function(K){K.isLight&&K.layers.test(k.layers)&&(A.pushLight(K),K.castShadow&&A.pushShadow(K))}),A.setupLights(),N!==null&&N.updateLights(A.state.lightsArray),qe=this.localClippingEnabled,Fe=Ne.init(this.clippingPlanes,qe),Fe===!0&&Ne.setGlobalState(this.clippingPlanes,k),N!==null&&ze.render(A.state.shadowsArray,J,k);const X=new Set;return T.traverse(function(K){if(!(K.isMesh||K.isPoints||K.isLine||K.isSprite))return;const be=K.material;if(be)if(Array.isArray(be))for(let we=0;we<be.length;we++){const ve=be[we];Vl(ve,J,k,K),X.add(ve)}else Vl(be,J,k,K),X.add(be)}),A=b.pop(),N!==null&&N.renderEnd(),X},this.compileAsync=function(T,k,J=null){const X=this.compile(T,k,J);return new Promise(K=>{function be(){if(X.forEach(function(we){const Ae=V.get(we).currentProgram;(Ae===void 0||Ae.isReady())&&X.delete(we)}),X.size===0){K(T);return}setTimeout(be,10)}He.get("KHR_parallel_shader_compile")!==null?be():setTimeout(be,10)})};let Fs=null;function Th(T){Fs&&Fs(T)}function Yl(){Ji.stop()}function Xl(){Ji.start()}const Ji=new hh;Ji.setAnimationLoop(Th),typeof self<"u"&&Ji.setContext(self),this.setAnimationLoop=function(T){Fs=T,De.setAnimationLoop(T),T===null?Ji.stop():Ji.start()},De.addEventListener("sessionstart",Yl),De.addEventListener("sessionend",Xl),this.render=function(T,k){if(k!==void 0&&k.isCamera!==!0){ht("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(C===!0)return;N!==null&&N.renderStart(T,k);const J=De.enabled===!0&&De.isPresenting===!0,X=w!==null&&(ae===null||J)&&w.begin(L,ae);if(T.matrixWorldAutoUpdate===!0&&T.updateMatrixWorld(),k.parent===null&&k.matrixWorldAutoUpdate===!0&&k.updateMatrixWorld(),De.enabled===!0&&De.isPresenting===!0&&(w===null||w.isCompositing()===!1)&&(De.cameraAutoUpdate===!0&&De.updateCamera(k),k=De.getCamera()),T.isScene===!0&&T.onBeforeRender(L,T,k,ae),A=pe.get(T,b.length),A.init(k),A.state.textureUnits=Z.getTextureUnits(),b.push(A),Ke.multiplyMatrices(k.projectionMatrix,k.matrixWorldInverse),Ce.setFromProjectionMatrix(Ke,ui,k.reversedDepth),qe=this.localClippingEnabled,Fe=Ne.init(this.clippingPlanes,qe),R=Me.get(T,D.length),R.init(),D.push(R),De.enabled===!0&&De.isPresenting===!0){const we=L.xr.getDepthSensingMesh();we!==null&&Us(we,k,-1/0,L.sortObjects)}Us(T,k,0,L.sortObjects),R.finish(),N!==null&&N.updateLights(A.state.lightsArray),L.sortObjects===!0&&R.sort(G,he),yt=De.enabled===!1||De.isPresenting===!1||De.hasDepthSensing()===!1,yt&&Ze.addToRenderList(R,T),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),Fe===!0&&Ne.beginShadows();const K=A.state.shadowsArray;if(ze.render(K,T,k),Fe===!0&&Ne.endShadows(),(X&&w.hasRenderPass())===!1){const we=R.opaque,ve=R.transmissive;if(A.setupLights(),k.isArrayCamera){const Ae=k.cameras;if(ve.length>0)for(let Pe=0,et=Ae.length;Pe<et;Pe++){const rt=Ae[Pe];ql(we,ve,T,rt)}yt&&Ze.render(T);for(let Pe=0,et=Ae.length;Pe<et;Pe++){const rt=Ae[Pe];Kl(R,T,rt,rt.viewport)}}else ve.length>0&&ql(we,ve,T,k),yt&&Ze.render(T),Kl(R,T,k)}ae!==null&&$===0&&(Z.updateMultisampleRenderTarget(ae),Z.updateRenderTargetMipmap(ae)),X&&w.end(L),T.isScene===!0&&T.onAfterRender(L,T,k),Se.resetDefaultState(),q=-1,ee=null,b.pop(),b.length>0?(A=b[b.length-1],Z.setTextureUnits(A.state.textureUnits),Fe===!0&&Ne.setGlobalState(L.clippingPlanes,A.state.camera)):A=null,D.pop(),D.length>0?R=D[D.length-1]:R=null,N!==null&&N.renderEnd()};function Us(T,k,J,X){if(T.visible===!1)return;if(T.layers.test(k.layers)){if(T.isGroup)J=T.renderOrder;else if(T.isLOD)T.autoUpdate===!0&&T.update(k);else if(T.isLightProbeGrid)A.pushLightProbeGrid(T);else if(T.isLight)A.pushLight(T),T.castShadow&&A.pushShadow(T);else if(T.isSprite){if(!T.frustumCulled||T.intersectsFrustum(Ce)){X&&Ut.setFromMatrixPosition(T.matrixWorld).applyMatrix4(Ke);const we=te.update(T),ve=T.material;ve.visible&&R.push(T,we,ve,J,Ut.z,null,k)}}else if((T.isMesh||T.isLine||T.isPoints)&&(!T.frustumCulled||T.intersectsFrustum(Ce))){const we=te.update(T),ve=T.material;if(X&&(T.boundingSphere!==void 0?(T.boundingSphere===null&&T.computeBoundingSphere(),Ut.copy(T.boundingSphere.center)):(we.boundingSphere===null&&we.computeBoundingSphere(),Ut.copy(we.boundingSphere.center)),Ut.applyMatrix4(T.matrixWorld).applyMatrix4(Ke)),Array.isArray(ve)){const Ae=we.groups;for(let Pe=0,et=Ae.length;Pe<et;Pe++){const rt=Ae[Pe],Te=ve[rt.materialIndex];Te&&Te.visible&&R.push(T,we,Te,J,Ut.z,rt,k)}}else ve.visible&&R.push(T,we,ve,J,Ut.z,null,k)}}const be=T.children;for(let we=0,ve=be.length;we<ve;we++)Us(be[we],k,J,X)}function Kl(T,k,J,X){const{opaque:K,transmissive:be,transparent:we}=T;A.setupLightsView(J),Fe===!0&&Ne.setGlobalState(L.clippingPlanes,J),X&&v.viewport(F.copy(X)),K.length>0&&Ca(K,k,J),be.length>0&&Ca(be,k,J),we.length>0&&Ca(we,k,J),v.buffers.depth.setTest(!0),v.buffers.depth.setMask(!0),v.buffers.color.setMask(!0),v.setPolygonOffset(!1)}function ql(T,k,J,X){if((J.isScene===!0?J.overrideMaterial:null)!==null)return;if(A.state.transmissionRenderTarget[X.id]===void 0){const Te=He.has("EXT_color_buffer_half_float")||He.has("EXT_color_buffer_float");A.state.transmissionRenderTarget[X.id]=new Un(1,1,{generateMipmaps:!0,type:Te?mi:Rn,minFilter:or,samples:Math.max(4,P.samples),stencilBuffer:a,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:ot.workingColorSpace})}const be=A.state.transmissionRenderTarget[X.id],we=X.viewport||F;be.setSize(we.z*L.transmissionResolutionScale,we.w*L.transmissionResolutionScale);const ve=L.getRenderTarget(),Ae=L.getActiveCubeFace(),Pe=L.getActiveMipmapLevel();L.setRenderTarget(be),L.getClearColor(Re),Be=L.getClearAlpha(),Be<1&&L.setClearColor(16777215,.5),L.clear(),yt&&Ze.render(J);const et=L.toneMapping;L.toneMapping=hi;const rt=X.viewport;if(X.viewport!==void 0&&(X.viewport=void 0),A.setupLightsView(X),Fe===!0&&Ne.setGlobalState(L.clippingPlanes,X),Ca(T,J,X),Z.updateMultisampleRenderTarget(be),Z.updateRenderTargetMipmap(be),He.has("WEBGL_multisampled_render_to_texture")===!1){let Te=!1;for(let gt=0,Kt=k.length;gt<Kt;gt++){const Pt=k[gt],{object:Ct,geometry:on,material:Ee,group:pn}=Pt;if(Ee.side===Ai&&Ct.layers.test(X.layers)){const ut=Ee.side;Ee.side=yn,Ee.needsUpdate=!0,Zl(Ct,J,X,on,Ee,pn),Ee.side=ut,Ee.needsUpdate=!0,Te=!0}}Te===!0&&(Z.updateMultisampleRenderTarget(be),Z.updateRenderTargetMipmap(be))}L.setRenderTarget(ve,Ae,Pe),L.setClearColor(Re,Be),rt!==void 0&&(X.viewport=rt),L.toneMapping=et}function Ca(T,k,J){const X=k.isScene===!0?k.overrideMaterial:null;for(let K=0,be=T.length;K<be;K++){const we=T[K],{object:ve,geometry:Ae,group:Pe}=we;let et=we.material;et.allowOverride===!0&&X!==null&&(et=X),ve.layers.test(J.layers)&&Zl(ve,k,J,Ae,et,Pe)}}function Zl(T,k,J,X,K,be){N!==null&&K.isNodeMaterial&&N.setObject(T,K),T.onBeforeRender(L,k,J,X,K,be),T.modelViewMatrix.multiplyMatrices(J.matrixWorldInverse,T.matrixWorld),T.normalMatrix.getNormalMatrix(T.modelViewMatrix),K.onBeforeRender(L,k,J,X,T,be),K.transparent===!0&&K.side===Ai&&K.forceSinglePass===!1?(K.side=yn,K.needsUpdate=!0,L.renderBufferDirect(J,k,X,K,T,be),K.side=dr,K.needsUpdate=!0,L.renderBufferDirect(J,k,X,K,T,be),K.side=Ai):L.renderBufferDirect(J,k,X,K,T,be),T.onAfterRender(L,k,J,X,K,be)}function La(T,k,J){k.isScene!==!0&&(k=jt);const X=V.get(T),K=A.state.lights,be=A.state.shadowsArray,we=K.state.version,ve=fe.getParameters(T,K.state,be,k,J,A.state.lightProbeGridArray),Ae=fe.getProgramCacheKey(ve);let Pe=X.programs;X.environment=T.isMeshStandardMaterial||T.isMeshLambertMaterial||T.isMeshPhongMaterial?k.environment:null,X.fog=k.fog;const et=T.isMeshStandardMaterial||T.isMeshLambertMaterial&&!T.envMap||T.isMeshPhongMaterial&&!T.envMap;X.envMap=le.get(T.envMap||X.environment,et),X.envMapRotation=X.environment!==null&&T.envMap===null?k.environmentRotation:T.envMapRotation,Pe===void 0&&(T.addEventListener("dispose",Qn),Pe=new Map,X.programs=Pe);let rt=Pe.get(Ae);if(rt!==void 0){if(X.currentProgram===rt&&X.lightsStateVersion===we)return Jl(T,ve),rt}else ve.uniforms=fe.getUniforms(T),N!==null&&T.isNodeMaterial&&N.build(T,J,ve),T.onBeforeCompile(ve,L),rt=fe.acquireProgram(ve,Ae),Pe.set(Ae,rt),X.uniforms=ve.uniforms;const Te=X.uniforms;return(!T.isShaderMaterial&&!T.isRawShaderMaterial||T.clipping===!0)&&(Te.clippingPlanes=Ne.uniform),Jl(T,ve),X.needsLights=Dh(T),X.lightsStateVersion=we,X.needsLights&&(Te.ambientLightColor.value=K.state.ambient,Te.lightProbe.value=K.state.probe,Te.sunLights.value=K.state.sun,Te.sunLightShadows.value=K.state.sunShadow,Te.directionalLights.value=K.state.directional,Te.directionalLightShadows.value=K.state.directionalShadow,Te.spotLights.value=K.state.spot,Te.spotLightShadows.value=K.state.spotShadow,Te.rectAreaLights.value=K.state.rectArea,Te.ltc_1.value=K.state.rectAreaLTC1,Te.ltc_2.value=K.state.rectAreaLTC2,Te.pointLights.value=K.state.point,Te.pointLightShadows.value=K.state.pointShadow,Te.hemisphereLights.value=K.state.hemi,Te.sunShadowMatrix.value=K.state.sunShadowMatrix,Te.sunShadowCascade.value=K.state.sunShadowCascade,Te.directionalShadowMatrix.value=K.state.directionalShadowMatrix,Te.spotLightMatrix.value=K.state.spotLightMatrix,Te.spotLightMap.value=K.state.spotLightMap,Te.pointShadowMatrix.value=K.state.pointShadowMatrix),X.lightProbeGrid=A.state.lightProbeGridArray.length>0,X.currentProgram=rt,X.uniformsList=null,rt}function $l(T){if(T.uniformsList===null){const k=T.currentProgram.getUniforms();T.uniformsList=gs.seqWithValue(k.seq,T.uniforms)}return T.uniformsList}function Jl(T,k){const J=V.get(T);J.outputColorSpace=k.outputColorSpace,J.batching=k.batching,J.batchingColor=k.batchingColor,J.instancing=k.instancing,J.instancingColor=k.instancingColor,J.instancingMorph=k.instancingMorph,J.skinning=k.skinning,J.morphTargets=k.morphTargets,J.morphNormals=k.morphNormals,J.morphColors=k.morphColors,J.morphTargetsCount=k.morphTargetsCount,J.numClippingPlanes=k.numClippingPlanes,J.numIntersection=k.numClipIntersection,J.vertexAlphas=k.vertexAlphas,J.vertexTangents=k.vertexTangents,J.toneMapping=k.toneMapping}function Rh(T,k){if(T.length===0)return null;if(T.length===1)return T[0].texture!==null?T[0]:null;S.setFromMatrixPosition(k.matrixWorld);for(let J=0,X=T.length;J<X;J++){const K=T[J];if(K.texture!==null&&K.boundingBox.containsPoint(S))return K}return null}function Ch(T,k,J,X,K){k.isScene!==!0&&(k=jt),Z.resetTextureUnits();const be=k.fog,we=X.isMeshStandardMaterial||X.isMeshLambertMaterial||X.isMeshPhongMaterial?k.environment:null,ve=ae===null?L.outputColorSpace:ae.isXRRenderTarget===!0?ae.texture.colorSpace:ot.workingColorSpace,Ae=X.isMeshStandardMaterial||X.isMeshLambertMaterial&&!X.envMap||X.isMeshPhongMaterial&&!X.envMap,Pe=le.get(X.envMap||we,Ae),et=X.vertexColors===!0&&!!J.attributes.color&&J.attributes.color.itemSize===4,rt=!!J.attributes.tangent&&(!!X.normalMap||X.anisotropy>0),Te=!!J.morphAttributes.position,gt=!!J.morphAttributes.normal,Kt=!!J.morphAttributes.color;let Pt=hi;X.toneMapped&&(ae===null||ae.isXRRenderTarget===!0)&&(Pt=L.toneMapping);const Ct=J.morphAttributes.position||J.morphAttributes.normal||J.morphAttributes.color,on=Ct!==void 0?Ct.length:0,Ee=V.get(X),pn=A.state.lights;if(Fe===!0&&(qe===!0||T!==ee)){const Dt=T===ee&&X.id===q;Ne.setState(X,T,Dt)}let ut=!1;X.version===Ee.__version?(Ee.needsLights&&Ee.lightsStateVersion!==pn.state.version||Ee.outputColorSpace!==ve||K.isBatchedMesh&&Ee.batching===!1||!K.isBatchedMesh&&Ee.batching===!0||K.isBatchedMesh&&Ee.batchingColor===!0&&K._colorsTexture===null||K.isBatchedMesh&&Ee.batchingColor===!1&&K._colorsTexture!==null||K.isInstancedMesh&&Ee.instancing===!1||!K.isInstancedMesh&&Ee.instancing===!0||K.isSkinnedMesh&&Ee.skinning===!1||!K.isSkinnedMesh&&Ee.skinning===!0||K.isInstancedMesh&&Ee.instancingColor===!0&&K.instanceColor===null||K.isInstancedMesh&&Ee.instancingColor===!1&&K.instanceColor!==null||K.isInstancedMesh&&Ee.instancingMorph===!0&&K.morphTexture===null||K.isInstancedMesh&&Ee.instancingMorph===!1&&K.morphTexture!==null||Ee.envMap!==Pe||X.fog===!0&&Ee.fog!==be||Ee.numClippingPlanes!==void 0&&(Ee.numClippingPlanes!==Ne.numPlanes||Ee.numIntersection!==Ne.numIntersection)||Ee.vertexAlphas!==et||Ee.vertexTangents!==rt||Ee.morphTargets!==Te||Ee.morphNormals!==gt||Ee.morphColors!==Kt||Ee.toneMapping!==Pt||Ee.morphTargetsCount!==on||!!Ee.lightProbeGrid!=A.state.lightProbeGridArray.length>0)&&(ut=!0):(ut=!0,Ee.__version=X.version);let Dn=Ee.currentProgram;ut===!0&&(Dn=La(X,k,K),N&&X.isNodeMaterial&&N.onUpdateProgram(X,Dn,Ee));let jn=!1,Ui=!1,xr=!1;const wt=Dn.getUniforms(),Vt=Ee.uniforms;if(v.useProgram(Dn.program)&&(jn=!0,Ui=!0,xr=!0),X.id!==q&&(q=X.id,Ui=!0),Ee.needsLights){const Dt=Rh(A.state.lightProbeGridArray,K);Ee.lightProbeGrid!==Dt&&(Ee.lightProbeGrid=Dt,Ui=!0)}if(jn||ee!==T){v.buffers.depth.getReversed()&&T.reversedDepth!==!0&&(T._reversedDepth=!0,T.updateProjectionMatrix()),wt.setValue(z,"projectionMatrix",T.projectionMatrix),wt.setValue(z,"viewMatrix",T.matrixWorldInverse);const ki=wt.map.cameraPosition;ki!==void 0&&ki.setValue(z,Tt.setFromMatrixPosition(T.matrixWorld)),P.logarithmicDepthBuffer&&wt.setValue(z,"logDepthBufFC",2/(Math.log(T.far+1)/Math.LN2)),(X.isMeshPhongMaterial||X.isMeshToonMaterial||X.isMeshLambertMaterial||X.isMeshBasicMaterial||X.isMeshStandardMaterial||X.isShaderMaterial)&&wt.setValue(z,"isOrthographic",T.isOrthographicCamera===!0),ee!==T&&(ee=T,Ui=!0,xr=!0)}if(Ee.needsLights&&(pn.state.sunShadowMap.length>0&&wt.setValue(z,"sunShadowMap",pn.state.sunShadowMap,Z),pn.state.directionalShadowMap.length>0&&wt.setValue(z,"directionalShadowMap",pn.state.directionalShadowMap,Z),pn.state.spotShadowMap.length>0&&wt.setValue(z,"spotShadowMap",pn.state.spotShadowMap,Z),pn.state.pointShadowMap.length>0&&wt.setValue(z,"pointShadowMap",pn.state.pointShadowMap,Z)),K.isSkinnedMesh){wt.setOptional(z,K,"bindMatrix"),wt.setOptional(z,K,"bindMatrixInverse");const Dt=K.skeleton;Dt&&(Dt.boneTexture===null&&Dt.computeBoneTexture(),wt.setValue(z,"boneTexture",Dt.boneTexture,Z))}K.isBatchedMesh&&(wt.setOptional(z,K,"batchingTexture"),wt.setValue(z,"batchingTexture",K._matricesTexture,Z),wt.setOptional(z,K,"batchingIdTexture"),wt.setValue(z,"batchingIdTexture",K._indirectTexture,Z),wt.setOptional(z,K,"batchingColorTexture"),K._colorsTexture!==null&&wt.setValue(z,"batchingColorTexture",K._colorsTexture,Z));const Bi=J.morphAttributes;if((Bi.position!==void 0||Bi.normal!==void 0||Bi.color!==void 0)&&H.update(K,J,Dn),(Ui||Ee.receiveShadow!==K.receiveShadow)&&(Ee.receiveShadow=K.receiveShadow,wt.setValue(z,"receiveShadow",K.receiveShadow)),(X.isMeshStandardMaterial||X.isMeshLambertMaterial||X.isMeshPhongMaterial)&&X.envMap===null&&k.environment!==null&&(Vt.envMapIntensity.value=k.environmentIntensity),Vt.dfgLUT!==void 0&&(Vt.dfgLUT.value=eM()),Ui){if(wt.setValue(z,"toneMappingExposure",L.toneMappingExposure),Ee.needsLights&&Lh(Vt,xr),be&&X.fog===!0&&Le.refreshFogUniforms(Vt,be),Le.refreshMaterialUniforms(Vt,X,ie,j,A.state.transmissionRenderTarget[T.id]),Ee.needsLights&&Ee.lightProbeGrid){const Dt=Ee.lightProbeGrid;Vt.probesSH.value=Dt.texture,Vt.probesMin.value.copy(Dt.boundingBox.min),Vt.probesMax.value.copy(Dt.boundingBox.max),Vt.probesResolution.value.copy(Dt.resolution)}gs.upload(z,$l(Ee),Vt,Z)}if(X.isShaderMaterial&&X.uniformsNeedUpdate===!0&&(gs.upload(z,$l(Ee),Vt,Z),X.uniformsNeedUpdate=!1),X.isSpriteMaterial&&wt.setValue(z,"center",K.center),wt.setValue(z,"modelViewMatrix",K.modelViewMatrix),wt.setValue(z,"normalMatrix",K.normalMatrix),wt.setValue(z,"modelMatrix",K.matrixWorld),X.uniformsGroups!==void 0){const Dt=X.uniformsGroups;for(let ki=0,Mr=Dt.length;ki<Mr;ki++){const jl=Dt[ki];oe.update(jl,Dn),oe.bind(jl,Dn)}}return Dn}function Lh(T,k){T.ambientLightColor.needsUpdate=k,T.lightProbe.needsUpdate=k,T.sunLights.needsUpdate=k,T.sunLightShadows.needsUpdate=k,T.directionalLights.needsUpdate=k,T.directionalLightShadows.needsUpdate=k,T.pointLights.needsUpdate=k,T.pointLightShadows.needsUpdate=k,T.spotLights.needsUpdate=k,T.spotLightShadows.needsUpdate=k,T.rectAreaLights.needsUpdate=k,T.hemisphereLights.needsUpdate=k}function Dh(T){return T.isMeshLambertMaterial||T.isMeshToonMaterial||T.isMeshPhongMaterial||T.isMeshStandardMaterial||T.isShadowMaterial||T.isShaderMaterial&&T.lights===!0}this.getActiveCubeFace=function(){return W},this.getActiveMipmapLevel=function(){return $},this.getRenderTarget=function(){return ae},this.setRenderTargetTextures=function(T,k,J){const X=V.get(T);X.__autoAllocateDepthBuffer=T.resolveDepthBuffer===!1,X.__autoAllocateDepthBuffer===!1&&(X.__useRenderToTexture=!1),V.get(T.texture).__webglTexture=k,V.get(T.depthTexture).__webglTexture=X.__autoAllocateDepthBuffer?void 0:J,X.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(T,k){const J=V.get(T);J.__webglFramebuffer=k,J.__useDefaultFramebuffer=k===void 0},this.setRenderTarget=function(T,k=0,J=0){ae=T,W=k,$=J;let X=null,K=!1,be=!1;if(T){const ve=V.get(T);if(ve.__useDefaultFramebuffer!==void 0){v.bindFramebuffer(z.FRAMEBUFFER,ve.__webglFramebuffer),F.copy(T.viewport),re.copy(T.scissor),ue=T.scissorTest,v.viewport(F),v.scissor(re),v.setScissorTest(ue),q=-1;return}else if(ve.__webglFramebuffer===void 0)Z.setupRenderTarget(T);else if(ve.__hasExternalTextures)Z.rebindTextures(T,V.get(T.texture).__webglTexture,V.get(T.depthTexture).__webglTexture);else if(T.depthBuffer){const et=T.depthTexture;if(ve.__boundDepthTexture!==et){if(et!==null&&V.has(et)&&(T.width!==et.image.width||T.height!==et.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");Z.setupDepthRenderbuffer(T)}}const Ae=T.texture;(Ae.isData3DTexture||Ae.isDataArrayTexture||Ae.isCompressedArrayTexture)&&(be=!0);const Pe=V.get(T).__webglFramebuffer;T.isWebGLCubeRenderTarget?(Array.isArray(Pe[k])?X=Pe[k][J]:X=Pe[k],K=!0):T.samples>0&&Z.useMultisampledRTT(T)===!1?X=V.get(T).__webglMultisampledFramebuffer:Array.isArray(Pe)?X=Pe[J]:X=Pe,F.copy(T.viewport),re.copy(T.scissor),ue=T.scissorTest}else F.copy(se).multiplyScalar(ie).floor(),re.copy(ye).multiplyScalar(ie).floor(),ue=Qe;if(J!==0&&(X=O),v.bindFramebuffer(z.FRAMEBUFFER,X)&&v.drawBuffers(T,X),v.viewport(F),v.scissor(re),v.setScissorTest(ue),K){const ve=V.get(T.texture);z.framebufferTexture2D(z.FRAMEBUFFER,z.COLOR_ATTACHMENT0,z.TEXTURE_CUBE_MAP_POSITIVE_X+k,ve.__webglTexture,J)}else if(be){const ve=k;for(let Ae=0;Ae<T.textures.length;Ae++){const Pe=V.get(T.textures[Ae]);z.framebufferTextureLayer(z.FRAMEBUFFER,z.COLOR_ATTACHMENT0+Ae,Pe.__webglTexture,J,ve)}}else if(T!==null&&J!==0){const ve=V.get(T.texture);z.framebufferTexture2D(z.FRAMEBUFFER,z.COLOR_ATTACHMENT0,z.TEXTURE_2D,ve.__webglTexture,J)}q=-1};function Ql(T){const k=V.get(T);return(k.__readFormat!==T.format||k.__readType!==T.type)&&(k.__readFormat=T.format,k.__readType=T.type,k.__formatReadable=P.textureFormatReadable(T.format),k.__typeReadable=P.textureTypeReadable(T.type)),k}this.readRenderTargetPixels=function(T,k,J,X,K,be,we,ve=0){if(!(T&&T.isWebGLRenderTarget)){ht("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Ae=V.get(T).__webglFramebuffer;if(T.isWebGLCubeRenderTarget&&we!==void 0&&(Ae=Ae[we]),Ae){v.bindFramebuffer(z.FRAMEBUFFER,Ae);try{const Pe=T.textures[ve],et=Pe.format,rt=Pe.type;T.textures.length>1&&z.readBuffer(z.COLOR_ATTACHMENT0+ve);const Te=Ql(Pe);if(Te.__formatReadable===!1){ht("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(Te.__typeReadable===!1){ht("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}k>=0&&k<=T.width-X&&J>=0&&J<=T.height-K&&z.readPixels(k,J,X,K,ge.convert(et),ge.convert(rt),be)}finally{const Pe=ae!==null?V.get(ae).__webglFramebuffer:null;v.bindFramebuffer(z.FRAMEBUFFER,Pe)}}},this.readRenderTargetPixelsAsync=async function(T,k,J,X,K,be,we,ve=0){if(!(T&&T.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Ae=V.get(T).__webglFramebuffer;if(T.isWebGLCubeRenderTarget&&we!==void 0&&(Ae=Ae[we]),Ae)if(k>=0&&k<=T.width-X&&J>=0&&J<=T.height-K){v.bindFramebuffer(z.FRAMEBUFFER,Ae);const Pe=T.textures[ve],et=Pe.format,rt=Pe.type;T.textures.length>1&&z.readBuffer(z.COLOR_ATTACHMENT0+ve);const Te=Ql(Pe);if(Te.__formatReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(Te.__typeReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const gt=z.createBuffer();z.bindBuffer(z.PIXEL_PACK_BUFFER,gt),z.bufferData(z.PIXEL_PACK_BUFFER,be.byteLength,z.STREAM_READ),z.readPixels(k,J,X,K,ge.convert(et),ge.convert(rt),0),z.bindBuffer(z.PIXEL_PACK_BUFFER,null);const Kt=ae!==null?V.get(ae).__webglFramebuffer:null;v.bindFramebuffer(z.FRAMEBUFFER,Kt);const Pt=z.fenceSync(z.SYNC_GPU_COMMANDS_COMPLETE,0);return z.flush(),await Sp(z,Pt,4),z.bindBuffer(z.PIXEL_PACK_BUFFER,gt),z.getBufferSubData(z.PIXEL_PACK_BUFFER,0,be),z.bindBuffer(z.PIXEL_PACK_BUFFER,null),z.deleteBuffer(gt),z.deleteSync(Pt),be}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(T,k=null,J=0){const X=Math.pow(2,-J),K=Math.floor(T.image.width*X),be=Math.floor(T.image.height*X),we=k!==null?k.x:0,ve=k!==null?k.y:0;Z.setTexture2D(T,0),z.copyTexSubImage2D(z.TEXTURE_2D,J,0,0,we,ve,K,be),v.unbindTexture()},this.copyTextureToTexture=function(T,k,J=null,X=null,K=0,be=0){let we,ve,Ae,Pe,et,rt,Te,gt,Kt;const Pt=T.isCompressedTexture?T.mipmaps[be]:T.image;if(J!==null)we=J.max.x-J.min.x,ve=J.max.y-J.min.y,Ae=J.isBox3?J.max.z-J.min.z:1,Pe=J.min.x,et=J.min.y,rt=J.isBox3?J.min.z:0;else{const Vt=Math.pow(2,-K);we=Math.floor(Pt.width*Vt),ve=Math.floor(Pt.height*Vt),T.isDataArrayTexture?Ae=Pt.depth:T.isData3DTexture?Ae=Math.floor(Pt.depth*Vt):Ae=1,Pe=0,et=0,rt=0}X!==null?(Te=X.x,gt=X.y,Kt=X.z):(Te=0,gt=0,Kt=0);const Ct=ge.convert(k.format),on=ge.convert(k.type);let Ee;k.isData3DTexture?(Z.setTexture3D(k,0),Ee=z.TEXTURE_3D):k.isDataArrayTexture||k.isCompressedArrayTexture?(Z.setTexture2DArray(k,0),Ee=z.TEXTURE_2D_ARRAY):(Z.setTexture2D(k,0),Ee=z.TEXTURE_2D),v.activeTexture(z.TEXTURE0),v.pixelStorei(z.UNPACK_FLIP_Y_WEBGL,k.flipY),v.pixelStorei(z.UNPACK_PREMULTIPLY_ALPHA_WEBGL,k.premultiplyAlpha),v.pixelStorei(z.UNPACK_ALIGNMENT,k.unpackAlignment);const pn=v.getParameter(z.UNPACK_ROW_LENGTH),ut=v.getParameter(z.UNPACK_IMAGE_HEIGHT),Dn=v.getParameter(z.UNPACK_SKIP_PIXELS),jn=v.getParameter(z.UNPACK_SKIP_ROWS),Ui=v.getParameter(z.UNPACK_SKIP_IMAGES);v.pixelStorei(z.UNPACK_ROW_LENGTH,Pt.width),v.pixelStorei(z.UNPACK_IMAGE_HEIGHT,Pt.height),v.pixelStorei(z.UNPACK_SKIP_PIXELS,Pe),v.pixelStorei(z.UNPACK_SKIP_ROWS,et),v.pixelStorei(z.UNPACK_SKIP_IMAGES,rt);const xr=T.isDataArrayTexture||T.isData3DTexture,wt=k.isDataArrayTexture||k.isData3DTexture;if(T.isDepthTexture){const Vt=V.get(T),Bi=V.get(k),Dt=V.get(Vt.__renderTarget),ki=V.get(Bi.__renderTarget);v.bindFramebuffer(z.READ_FRAMEBUFFER,Dt.__webglFramebuffer),v.bindFramebuffer(z.DRAW_FRAMEBUFFER,ki.__webglFramebuffer);for(let Mr=0;Mr<Ae;Mr++)xr&&(z.framebufferTextureLayer(z.READ_FRAMEBUFFER,z.COLOR_ATTACHMENT0,V.get(T).__webglTexture,K,rt+Mr),z.framebufferTextureLayer(z.DRAW_FRAMEBUFFER,z.COLOR_ATTACHMENT0,V.get(k).__webglTexture,be,Kt+Mr)),z.blitFramebuffer(Pe,et,we,ve,Te,gt,we,ve,z.DEPTH_BUFFER_BIT,z.NEAREST);v.bindFramebuffer(z.READ_FRAMEBUFFER,null),v.bindFramebuffer(z.DRAW_FRAMEBUFFER,null)}else if(K!==0||T.isRenderTargetTexture||V.has(T)){const Vt=V.get(T),Bi=V.get(k);v.bindFramebuffer(z.READ_FRAMEBUFFER,I),v.bindFramebuffer(z.DRAW_FRAMEBUFFER,B);for(let Dt=0;Dt<Ae;Dt++)xr?z.framebufferTextureLayer(z.READ_FRAMEBUFFER,z.COLOR_ATTACHMENT0,Vt.__webglTexture,K,rt+Dt):z.framebufferTexture2D(z.READ_FRAMEBUFFER,z.COLOR_ATTACHMENT0,z.TEXTURE_2D,Vt.__webglTexture,K),wt?z.framebufferTextureLayer(z.DRAW_FRAMEBUFFER,z.COLOR_ATTACHMENT0,Bi.__webglTexture,be,Kt+Dt):z.framebufferTexture2D(z.DRAW_FRAMEBUFFER,z.COLOR_ATTACHMENT0,z.TEXTURE_2D,Bi.__webglTexture,be),K!==0?z.blitFramebuffer(Pe,et,we,ve,Te,gt,we,ve,z.COLOR_BUFFER_BIT,z.NEAREST):wt?z.copyTexSubImage3D(Ee,be,Te,gt,Kt+Dt,Pe,et,we,ve):z.copyTexSubImage2D(Ee,be,Te,gt,Pe,et,we,ve);v.bindFramebuffer(z.READ_FRAMEBUFFER,null),v.bindFramebuffer(z.DRAW_FRAMEBUFFER,null)}else wt?T.isDataTexture||T.isData3DTexture?z.texSubImage3D(Ee,be,Te,gt,Kt,we,ve,Ae,Ct,on,Pt.data):k.isCompressedArrayTexture?z.compressedTexSubImage3D(Ee,be,Te,gt,Kt,we,ve,Ae,Ct,Pt.data):z.texSubImage3D(Ee,be,Te,gt,Kt,we,ve,Ae,Ct,on,Pt):T.isDataTexture?z.texSubImage2D(z.TEXTURE_2D,be,Te,gt,we,ve,Ct,on,Pt.data):T.isCompressedTexture?z.compressedTexSubImage2D(z.TEXTURE_2D,be,Te,gt,Pt.width,Pt.height,Ct,Pt.data):z.texSubImage2D(z.TEXTURE_2D,be,Te,gt,we,ve,Ct,on,Pt);v.pixelStorei(z.UNPACK_ROW_LENGTH,pn),v.pixelStorei(z.UNPACK_IMAGE_HEIGHT,ut),v.pixelStorei(z.UNPACK_SKIP_PIXELS,Dn),v.pixelStorei(z.UNPACK_SKIP_ROWS,jn),v.pixelStorei(z.UNPACK_SKIP_IMAGES,Ui),be===0&&k.generateMipmaps&&z.generateMipmap(Ee),v.unbindTexture()},this.initRenderTarget=function(T){V.get(T).__webglFramebuffer===void 0&&Z.setupRenderTarget(T)},this.initTexture=function(T){T.isCubeTexture?Z.setTextureCube(T,0):T.isData3DTexture?Z.setTexture3D(T,0):T.isDataArrayTexture||T.isCompressedArrayTexture?Z.setTexture2DArray(T,0):Z.setTexture2D(T,0),v.unbindTexture()},this.resetState=function(){W=0,$=0,ae=null,v.reset(),Se.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return ui}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=ot._getDrawingBufferColorSpace(e),t.unpackColorSpace=ot._getUnpackColorSpace()}}const Gt=(n,e=0)=>{const t=Math.sin(n*127.1+e*311.7)*43758.5453;return t-Math.floor(t)},Et=(n,e,t=0)=>Gt(Math.floor(n[0]*e)+Math.floor(n[2]*e)*57+t,Math.floor(n[1]*e)),Ot=(n=.2,e=.15)=>t=>{const i=Et(t,16,3);return Et(t,6,5)<e&&t[1]>.1?s.MOSS:i>1-n*.7?s.BODY2:void 0},zt=(n,e,t,i,r,a=0,o=0)=>{for(let l=0;l<e;l++){const u=Gt(r,l)*6.283,c=t*Math.sqrt(Gt(l,r));n.ell([a+Math.cos(u)*c,.07,o+Math.sin(u)*c*.7],[.07,.1+Gt(l,4)*.08,.07],s.LEAF2,{group:i+l%3,paint:h=>h[1]>.13?s.LEAF:void 0})}},rs=(n,e,t,i=1)=>{for(let r=0;r<6;r++){const a=r/6*6.283+e[0],o=[Math.cos(a),0,Math.sin(a)];n.chain([[...e,.03*i],[...y.add(e,y.add(y.mul(o,.25*i),[0,.2*i,0])),.025*i],[...y.add(e,y.add(y.mul(o,.5*i),[0,.05*i,0])),.01*i]],r%2?s.LEAF:s.LEAF2,{group:t})}},Xn=(n,e,t,i,r)=>{const a=[];for(let o=0;o<=4;o++)a.push([...y.add(y.lerp(e,t,o/4),[(Gt(r,o)-.5)*.12,0,.02]),.03]);n.chain(a,s.LEAF,{group:i,paint:o=>Et(o,30)<.3?s.LEAF2:void 0})},ws=(n,e,t,i)=>n.ell(e,t,s.LEAF,{group:i,rough:.04,paint:r=>{const a=Et(r,10,2);return r[1]<e[1]-.15||a<.2?s.LEAF3:a>.8?s.LEAF2:void 0}}),Je=(n,e,t,i,r=.025,a=s.FRAME)=>n.seg(e,t,r,r,a,{group:i,paint:Ot(.35,.05)}),Kr=(n,e,t,i,r=s.MAGIC)=>n.ell(e,[t,t,t],r,{group:i,extra:!0});function oi(n,e,{yaw:t=0,pitch:i=0,roll:r=0,at:a=[0,0,0]}={}){const o=(f,d,p,m)=>{const M=Math.cos(d),x=Math.sin(d),g=[...f];return g[p]=f[p]*M-f[m]*x,g[m]=f[p]*x+f[m]*M,g},l=f=>o(o(o(f,r,1,2),i,0,1),-t,0,2),u=f=>o(o(o(f,t,0,2),-i,0,1),-r,1,2),c=f=>y.add(l(f),a),h=f=>u(y.sub(f,a));for(const f of n.parts.slice(e))if(f.type==="cone"?(f.a=c(f.a),f.b=c(f.b)):(f.c=c(f.c),f.axes=f.axes.map(l)),f.paint){const d=f.paint;f.paint=(p,m)=>d(h(p),m)}}function xs(n,e,{len:t=1.5,van:i=!1,glow:r=!1,flat:a=!1}={}){const o=i?.62:.3,l=i?.8:.5;n.box([0,l,0],[t,o,.66],s.BODY,{round:.14,group:e,paint:u=>{const c=Ot(.3,.12)(u);return c||(u[0]>t-.06&&Math.abs(u[1]-(l+o*.2))<.07&&Math.abs(Math.abs(u[2])-.45)<.1?r?s.MAGIC2:s.FRAME:i&&u[1]>l+.1&&Math.abs(u[2])>.6&&Math.abs(u[0]+.2)<.9&&(u[0]+3)*3%1>.15||u[1]<l-o+.1?s.SHADES:void 0)}}),i||n.box([-.2,l+o+.22,0],[t*.6,.24,.6],s.BODY,{round:.14,group:e,paint:u=>Math.abs(u[2])>.52||u[0]>t*.6-.25-.2?Et(u,9)<.25?s.STONED:s.SHADES:Ot(.3,.25)(u)});for(const u of[-t*.65,t*.65])for(const c of[-.66,.66])n.ell([u,.3,c],[.3,a?.22:.3,.1],s.BODY3,{group:e+1,paint:h=>Math.hypot(h[0]-u,h[1]-.3)<.12?s.FRAME:void 0});if(r)for(const u of[-.45,.45])Kr(n,[t+.05,l+o*.2,u],.07,e+2,s.MAGIC2)}const nM={"car-nose-down":{desc:"a hatchback nose-down in the earth, ferns round it",build(n){const e=n.parts.length;xs(n,1),oi(n,e,{pitch:-.5,at:[0,.2,0]}),n.ell([1.3,.1,0],[.9,.35,1],s.BARK2,{group:4,rough:.04,paint:t=>t[1]>.25?s.MOSS:void 0}),rs(n,[.9,.2,.8],5),rs(n,[-.9,.05,.9],6,.8),n.ell([-.6,1.25,0],[.5,.06,.4],s.MOSS,{group:7})}},"van-tree":{desc:"a camper van with a tree grown up through its roof, its headlights glowing with fairy light",glow:!0,build(n){xs(n,1,{van:!0,len:1.6,flat:!0,glow:!0}),n.chain([[.2,0,0,.22],[.2,1.5,0,.2],[.3,2.6,-.1,.14],[.35,3.3,-.1,.08]],s.TRUNK,{group:4,rough:.015}),ws(n,[.3,3.4,-.1],[1.1,.7,.9],5),Xn(n,[-1.6,.1,.66],[-1,1.3,.7],6,1),zt(n,14,2.2,7,2)}},"car-on-side":{desc:"a car on its side among ferns",build(n){const e=n.parts.length;xs(n,1),oi(n,e,{roll:Math.PI/2,at:[0,.2,.1]});for(const[t,i]of[[-1.2,.9],[.3,1.1],[1.4,.6],[-.4,-1]])rs(n,[t,.05,i],5+(t>0?1:0),1.1)}},"trolley-tipped":{desc:"a shopping trolley tipped over, a plant growing in its basket",build(n){const e=n.parts.length;iu(n,1),ws(n,[.05,.65,0],[.32,.28,.26],3),oi(n,e,{roll:1.35,at:[0,.32,0]}),zt(n,8,.9,6,3)}},"trolley-nest":{desc:"a shopping trolley standing upright, a bird's nest in its basket",build(n){iu(n,1),n.ell([0,.78,0],[.2,.08,.17],s.STRAW,{group:3,paint:e=>Math.abs(Math.sin(e[0]*40+e[2]*30))<.3?s.BARK2:void 0});for(const e of[-.05,.05])n.ell([e,.84,.02],[.04,.03,.035],s.BELLY,{group:4});zt(n,8,.9,6,4)}},cone:{desc:"a single traffic cone, faded",build(n){ca(n,[0,0,0],1)}},cones:{desc:"a little cluster of traffic cones, one fallen",build(n){ca(n,[0,0,0],1),ca(n,[.5,0,.2],4);const e=n.parts.length;ca(n,[0,0,0],7),oi(n,e,{roll:1.5,yaw:.6,at:[-.4,.2,.4]}),zt(n,6,.8,10,5)}},"cone-lantern":{desc:"a traffic cone lit from within like a lantern, a ring of mushrooms round it",glow:!0,build(n){ca(n,[0,0,0],1,!0);for(let e=0;e<9;e++){const t=e/9*6.283,i=[Math.cos(t)*.55,0,Math.sin(t)*.45];n.seg(i,y.add(i,[0,.08,0]),.02,.02,s.CLOTH,{group:5}),n.ell(y.add(i,[0,.1,0]),[.06,.035,.06],s.BODY2,{group:6})}}},"highway-slab":{desc:"a slab of tarmac tilted up out of the ground, faded lane markings, a crash-barrier stub",build(n){const e=n.parts.length;n.box([0,0,0],[2.2,.14,1.3],s.STONE,{round:.03,group:1,rough:.01,paint:t=>Et(t,5,1)<.06||Math.abs(Math.sin(t[0]*3+t[2]*5)*.3+t[2]*.6-.2)<.02?s.STONED:t[1]>.1&&Math.abs(t[2])<.05&&(t[0]+9)*.8%1<.55?Et(t,12)<.3?s.STONE:s.CLOTH:t[1]>.1&&Math.abs(t[2]-1.1)<.04?s.BELLY:t[1]>.1&&Et(t,6,4)<.12?s.MOSS:void 0});for(const t of[-1.6,-.4])Je(n,[t,.1,1.25],[t,.75,1.25],2,.04);n.box([-1,.62,1.3],[.9,.1,.03],s.FRAME,{group:3,paint:t=>Math.abs(t[1]-.62)<.02?s.STONED:Ot(.5,.1)(t)}),oi(n,e,{pitch:.38,roll:.08,at:[0,.7,0]}),n.ell([-1.8,.1,0],[.6,.2,1.3],s.BARK2,{group:5,rough:.04,paint:t=>t[1]>.2?s.MOSS:void 0}),zt(n,16,2.4,6,6)}},"highway-line":{desc:"a section of cracked road, its white line broken, grass in the cracks",build(n){n.box([0,.02,0],[2,.03,1],s.STONE,{round:.02,group:1,paint:e=>Et(e,4,9)<.08||Math.abs(Math.sin(e[0]*2.3)*.4-e[2])<.025?Et(e,20)<.4?s.LEAF2:s.STONED:Math.abs(e[2]+.05)<.05&&(e[0]+9)*.7%1<.6?s.CLOTH:Et(e,6)<.08?s.MOSS:void 0});for(const[e,t]of[[-1.2,.3],[.4,-.2],[1.3,.5]])zt(n,4,.2,3,e*10+7,e,t)}},"road-sign":{desc:"a fallen road sign, blank but for an abstract arrow",build(n){Je(n,[-.9,.05,.2],[.6,.1,-.1],1,.03),n.box([.9,.12,-.15],[.62,.05,.46],s.HAT1,{group:2,dir:[1,.25,-.2],round:.02,paint:e=>{const t=e[0]-.9,i=e[2]+.15;return Math.abs(i)<.08&&t>-.36&&t<.2||t>.08&&Math.abs(i)<.28-(t-.08)*.9&&t<.38?s.BELLY:Math.hypot(Math.abs(t)-.56,Math.abs(i)-.4)<.04?s.FRAME:Ot(.2,.1)(e)}}),zt(n,8,1.2,4,7)}},"phone-box":{desc:"an overgrown phone box, its panes long gone",build(n){n.box([0,1,0],[.42,1,.42],s.ACCENT,{round:.04,group:1,paint:e=>Math.max(Math.abs(e[0]),Math.abs(e[2]))>.38&&e[1]>.5&&e[1]<1.75&&e[1]*5%1>.12&&(Math.abs(e[0])+Math.abs(e[2]))*5%1>.12?s.SHADES:Ot(.3,.15)(e)}),n.box([0,2.08,0],[.46,.09,.46],s.ACCENT,{round:.06,group:2,paint:Ot(.3,.3)}),Xn(n,[.43,0,.3],[.4,1.9,.43],3,8),Xn(n,[-.3,0,.43],[-.1,1.4,.43],4,9),zt(n,10,.9,5,8)}},lamppost:{desc:"a lamppost bent over, its lamp hanging near the ground",build(n){n.chain([[0,0,0,.06],[0,1.4,0,.05],[.2,2.1,0,.045],[.8,2.2,0,.04],[1.2,1.7,0,.035]],s.FRAME,{group:1,paint:Ot(.4,.05)}),n.box([1.25,1.55,0],[.16,.1,.12],s.FRAME,{round:.04,group:2}),n.ell([1.25,1.45,0],[.12,.06,.1],s.SHADES,{group:2}),Xn(n,[0,0,.06],[.05,1.5,.06],3,10),zt(n,6,.7,4,9)}},sofa:{desc:"a sofa left in a clearing, moss on its cushions",build(n){const e=t=>Et(t,6,5)<.25&&t[1]>.4?s.MOSS:Et(t,14)>.9?s.STONED:void 0;n.box([0,.3,0],[.9,.2,.4],s.CLOTH,{round:.1,group:1,paint:e}),n.box([-.02,.7,-.32],[.9,.3,.12],s.CLOTH,{round:.1,group:2,paint:e});for(const t of[-.85,.85])n.box([t,.55,0],[.12,.22,.42],s.CLOTH,{round:.1,group:3,paint:e});for(const t of[-.4,.4])n.box([t,.53,.05],[.42,.08,.34],s.CLOTH,{round:.08,group:4,paint:e});zt(n,14,1.6,5,10)}},"washing-machine":{desc:"a washing machine in the undergrowth, a fern in its drum",build(n){n.box([0,.42,0],[.32,.42,.32],s.BELLY,{round:.05,group:1,paint:e=>e[2]>.28&&Math.hypot(e[0],e[1]-.4)<.2?Math.hypot(e[0],e[1]-.4)<.15?s.SHADES:s.FRAME:Ot(.25,.15)(e)}),rs(n,[0,.4,.4],2,.55),zt(n,8,.8,3,11)}},"bike-roots":{desc:"a bicycle tangled in tree roots",build(n){for(const e of[-.45,.45])for(let t=0;t<12;t++){const i=t/12*6.283,r=(t+1)/12*6.283;Je(n,[e+Math.cos(i)*.3,.32+Math.sin(i)*.3,0],[e+Math.cos(r)*.3,.32+Math.sin(r)*.3,0],1+(e>0?1:0),.018)}for(const[e,t]of[[[-.45,.32,0],[0,.35,0]],[[0,.35,0],[.3,.7,0]],[[-.45,.32,0],[-.15,.72,0]],[[-.15,.72,0],[.3,.7,0]],[[.3,.7,0],[.45,.32,0]],[[0,.35,0],[-.15,.72,0]],[[.3,.7,0],[.35,.85,0]]])Je(n,e,t,3,.022);n.box([-.17,.76,0],[.1,.03,.04],s.SHADES,{group:4}),Je(n,[.25,.85,-.15],[.42,.87,.15],4,.018);for(let e=0;e<4;e++)n.chain([[-1+e*.2,0,-.4,.09],[-.3+e*.3,.35+e%2*.2,-.05+e*.05,.07],[.4+e*.2,.1,.3,.05]],s.TRUNK,{group:5+e%2,rough:.01})}},"dish-birdbath":{desc:"a satellite dish fallen face-up, full of rainwater, a bird drinking",build(n){n.ell([0,.2,0],[.6,.22,.6],s.BELLY,{group:1,paint:Ot(.25,.2)}),n.ell([0,.34,0],[.52,.12,.52],s.BELLY,{group:1,cut:!0}),n.ell([0,.28,0],[.48,.02,.48],s.WATER,{group:2}),Je(n,[0,.25,-.5],[.1,.8,-.6],3,.03);const e=[.5,.45,.3];n.ell(e,[.12,.07,.06],s.BODY3,{group:4,dir:[1,.3,0]}),n.ell(y.add(e,[.1,.07,0]),[.05,.05,.045],s.BODY3,{group:4}),n.seg(y.add(e,[.14,.07,0]),y.add(e,[.2,.04,0]),.012,.004,s.ACCENT,{group:4}),zt(n,8,1,5,12)}},"fridge-fireflies":{desc:"a fridge standing in the woods, its door ajar, fireflies inside",glow:!0,build(n){n.box([0,.85,0],[.36,.85,.32],s.BELLY,{round:.05,group:1,paint:e=>e[2]>.28&&Math.abs(e[0])<.3&&e[1]<1.55&&e[1]>.1?s.SHADES:Ot(.25,.2)(e)}),n.box([.5,.85,.4],[.03,.78,.3],s.BELLY,{dir:[.5,0,1],round:.03,group:2,paint:Ot(.25,.15)});for(let e=0;e<7;e++)Kr(n,[(Gt(e)-.5)*.4,.4+Gt(e,2)*1,.2+Gt(e,3)*.3],.03,10+e,e%2?s.MAGIC:s.MAGIC2);Xn(n,[-.36,0,.3],[-.3,1.6,.33],3,13)}}};function iu(n,e){const t=[[-.35,.45,-.25],[.35,.45,-.25],[.35,.45,.25],[-.35,.45,.25],[-.3,.9,-.28],[.4,.9,-.28],[.4,.9,.28],[-.3,.9,.28]];for(const[i,r]of[[0,1],[1,2],[2,3],[3,0],[4,5],[5,6],[6,7],[7,4],[0,4],[1,5],[2,6],[3,7]])Je(n,t[i],t[r],e,.015);for(let i=1;i<6;i++){const r=i/6;Je(n,y.lerp(t[0],t[1],r),y.lerp(t[4],t[5],r),e,.008),Je(n,y.lerp(t[3],t[2],r),y.lerp(t[7],t[6],r),e,.008)}Je(n,t[4],[-.45,.95,-.28],e,.015),Je(n,t[7],[-.45,.95,.28],e,.015),Je(n,[-.45,.95,-.28],[-.45,.95,.28],e,.025,s.ACCENT);for(const[i,r]of[[-.3,-.22],[.3,-.22],[-.3,.22],[.3,.22]])Je(n,[i,.45,r],[i,.08,r],e,.012),n.ell([i,.06,r],[.05,.05,.02],s.BODY3,{group:e+1})}function ca(n,e,t,i=!1){n.box(y.add(e,[0,.03,0]),[.24,.03,.24],s.ACCENT,{round:.02,group:t,paint:Ot(.15,.2)}),n.seg(y.add(e,[0,.05,0]),y.add(e,[0,.72,0]),.2,.03,s.ACCENT,{group:t+1,paint:r=>Math.abs(r[1]-e[1]-.42)<.07?i?s.MAGIC2:s.CLOTH:i&&Et(r,18)<.2?s.GLOW:Ot(.15,.1)(r)}),i&&Kr(n,y.add(e,[0,.78,0]),.05,t+2,s.MAGIC2)}const iM={swings:{desc:"a rusty swing set, one swing hanging, one chain broken; the hanging one sways on its own with a faint sparkle",glow:!0,split:1.6,build(n){for(const e of[-1.1,1.1])for(const t of[-.5,.5])Je(n,[e,0,t],[e*.95,2.1,0],1,.045);Je(n,[-1.1,2.1,0],[1.1,2.1,0],2,.05);for(const e of[-.12,.12])Je(n,[-.5,2.08,e],[-.42,.55,e*1.2],3,.012);n.box([-.42,.52,0],[.2,.025,.14],s.BODY3,{round:.02,group:3,dir:[1,-.15,0]});for(let e=0;e<5;e++)Kr(n,[-.42+(Gt(e)-.5)*.5,.6+Gt(e,2)*.7,(Gt(e,3)-.5)*.3],.025,10+e);Je(n,[.5,2.08,-.12],[.5,1.3,-.12],4,.012),Je(n,[.5,2.08,.12],[.58,.9,.2],4,.012),n.box([.7,.04,.3],[.2,.025,.14],s.BODY3,{round:.02,group:5,dir:[1,0,.5]}),Xn(n,[1.1,0,.5],[1.05,1.6,.25],6,14),zt(n,14,1.8,7,15)}},slide:{desc:"a slide half-swallowed by brambles, a sapling at its foot",split:1.6,build(n){for(const e of[-.95,-.55])for(const t of[-.3,.3])Je(n,[e,0,t],[e,1.5,t],1,.035);for(let e=1;e<6;e++)Je(n,[-.95,e*.27,-.3],[-.95,e*.27,.3],1,.02);n.box([-.75,1.5,0],[.25,.04,.32],s.FRAME,{group:2,paint:Ot(.4,.1)}),n.box([.35,.78,0],[.95,.03,.26],s.HAT1,{dir:[1,-.75,0],round:.02,group:3,paint:e=>Math.abs(e[2])>.22?s.FRAME:Ot(.35,.15)(e)});for(let e=0;e<10;e++){const t=Gt(e,3)*6.283;n.chain([[.4+Math.cos(t)*.9,0,Math.sin(t)*.6,.03],[.3+Math.cos(t)*.4,.5+Gt(e)*.5,Math.sin(t)*.3,.025],[.1+Gt(e,4)*.6,.7+Gt(e,5)*.4,(Gt(e,6)-.5)*.4,.015]],s.BARKD,{group:5+e%2}),e%3===0&&n.ell([.3+Gt(e,7)*.6,.5+Gt(e,8)*.4,(Gt(e,9)-.5)*.5],[.2,.14,.16],s.LEAF,{group:7,rough:.03,paint:i=>Et(i,30)<.1?s.ACCENT:void 0})}n.seg([1.45,0,.2],[1.45,1.2,.2],.03,.02,s.TRUNK,{group:8}),ws(n,[1.45,1.3,.2],[.25,.2,.22],9)}},roundabout:{desc:"a roundabout tilted in the moss",build(n){const e=n.parts.length;n.ell([0,.2,0],[.9,.05,.9],s.HAT2,{group:1,paint:t=>Math.abs(Math.sin(Math.atan2(t[2],t[0])*3))<.08?s.FRAME:Ot(.35,.2)(t)});for(let t=0;t<3;t++){const i=t/3*6.283;Je(n,[Math.cos(i)*.7,.25,Math.sin(i)*.7],[Math.cos(i)*.7,.6,Math.sin(i)*.7],2,.025),Je(n,[Math.cos(i)*.7,.6,Math.sin(i)*.7],[Math.cos(i)*.1,.6,Math.sin(i)*.1],2,.02)}oi(n,e,{pitch:.18,roll:.1,at:[0,.05,0]}),n.ell([0,.05,0],[1.1,.08,1],s.MOSS,{group:4}),zt(n,10,1.3,5,16)}},seesaw:{desc:"a seesaw stuck at an angle",build(n){n.box([0,.2,0],[.08,.2,.14],s.FRAME,{round:.02,group:1,paint:Ot(.4,.1)});const e=n.parts.length;n.box([0,0,0],[1.3,.035,.12],s.WOOD,{round:.02,group:2,paint:t=>Et(t,8)<.2?s.MOSS:void 0});for(const t of[-1.05,1.05])Je(n,[t,.03,-.12],[t,.03,.12],3,.02);oi(n,e,{pitch:.32,at:[0,.42,0]}),zt(n,10,1.4,5,17)}},"climbing-frame":{desc:"a climbing frame, a dome of bars wound with ivy",split:1.4,build(n){const t=(i,r)=>{const a=i/8*6.283,o=r/4*Math.PI/2;return[Math.cos(a)*Math.cos(o)*1,Math.sin(o)*1*1.5,Math.sin(a)*Math.cos(o)*1]};for(let i=0;i<8;i++)for(let r=0;r<4;r++)Je(n,t(i,r),t(i,r+1),1,.025),Je(n,t(i,r),t(i+1,r),1,.025);for(let i=0;i<3;i++)Xn(n,t(i*3,0),t(i*3+1,3),3+i,18+i);zt(n,12,1.4,6,18)}},"spring-rider":{desc:"a spring rider animal, its paint faded (a generic animal, no characters)",build(n){for(let e=0;e<6;e++)n.seg([Math.cos(e*2)*.06,e*.07,Math.sin(e*2)*.06],[Math.cos(e*2+2)*.06,(e+1)*.07,Math.sin(e*2+2)*.06],.022,.022,s.FRAME,{group:1});n.ell([0,.55,0],[.35,.16,.14],s.BODY,{group:2,paint:Ot(.4,.2)}),n.ell([.32,.72,0],[.12,.11,.1],s.BODY,{group:2,paint:Ot(.4,.2)});for(const e of[-.05,.05])n.ell([.28,.85,e],[.03,.06,.02],s.BODY,{group:3});n.ell([.43,.74,.06],[.015,.015,.015],s.SHADES,{group:3}),Je(n,[.25,.68,-.12],[.25,.68,.12],4,.015),n.box([0,.02,0],[.25,.02,.25],s.STONE,{group:5}),zt(n,8,.8,6,19)}}};function rM(n,e,t,i,r,a=1){n.box([0,.015,0],[e,.015,t],i,{round:.01,group:a,paint:o=>Et(o,3,4)<.05||Math.abs(Math.sin(o[0]*1.3+1)*.5+Math.sin(o[0]*4.1)*.08-o[2]*.3)<.012?Et(o,18)<.5?s.LEAF2:s.STONED:r(o[0],o[2])?Et(o,10,2)<.25?i:s.CLOTH:Et(o,5,7)<.07?s.MOSS:void 0})}const Wn=(n,e,t=.045)=>Math.abs(n-e)<t,aM={"tennis-court":{desc:"a cracked tennis court, faded lines, grass through the cracks",decal:!0,build(n){rM(n,4.4+.5,2+.5,s.HAT2,(i,r)=>Math.abs(i)<=4.4+.05&&Math.abs(r)<=2+.05&&(Wn(Math.abs(i),4.4)||Wn(Math.abs(r),2)||Wn(Math.abs(r),2*.75)||Math.abs(i)<4.4*.54&&(Wn(r,0)||Wn(Math.abs(i),4.4*.54))))}},"tennis-net":{desc:"a sagging tennis net between its posts",build(n){for(const e of[-2.2,2.2])Je(n,[0,0,e],[0,.55,e],1,.035);n.box([0,.38,0],[.01,.17,2.15],s.CLOTH,{group:2,paint:e=>e[1]>.5?s.CLOTH:e[1]*25%1<.25||(e[2]+5)*25%1<.25?s.SHADES:void 0}),n.box([0,.25,0],[.012,.15,1],s.SHADES,{group:2,cut:!0})}},"umpire-chair":{desc:"a tennis umpire's chair leaning over",split:1.4,build(n){const e=n.parts.length;for(const t of[-.25,.25])for(const i of[-.2,.2])Je(n,[t*1.4,0,i*1.4],[t,1.5,i],1,.03);for(let t=1;t<5;t++)Je(n,[-.3,t*.3,-.22],[-.3,t*.3,.22],1,.02);n.box([0,1.55,0],[.28,.04,.25],s.WOOD,{group:2}),n.box([-.26,1.8,0],[.03,.25,.25],s.WOOD,{group:2}),oi(n,e,{roll:.25,pitch:-.1}),zt(n,8,1,4,20)}},"court-fence":{desc:"a chain-link fence section, ivy through it, a gap torn in it",build(n){for(const e of[-1.5,0,1.5])Je(n,[e,0,0],[e,1.7,0],1,.03);Je(n,[-1.5,1.7,0],[1.5,1.7,0],1,.025),n.box([0,.85,0],[1.5,.85,.008],s.FRAME,{group:2,paint:e=>(e[0]+e[1]+9)*9%1<.2||(e[0]-e[1]+9)*9%1<.2?Et(e,5)<.15?s.BODY2:s.FRAME:s.SHADES}),n.ell([.7,.5,0],[.4,.5,.05],s.SHADES,{group:2,cut:!0,rough:.08});for(let e=0;e<3;e++)Xn(n,[-1.3+e*.6,0,.03],[-1.1+e*.5,1.5,.03],3+e,21+e)}},"tennis-balls":{desc:"a few old tennis balls glowing faintly in the grass",glow:!0,build(n){for(let e=0;e<4;e++)Kr(n,[(Gt(e)-.5)*1.2,.06,(Gt(e,2)-.5)*.8],.06,1+e,e%2?s.MAGIC:s.MAGIC2);n.ell([0,.004,0],[.8,.004,.5],s.LEAF3,{group:9}),zt(n,8,.8,5,22)}},"baseball-diamond":{desc:"a baseball diamond: the worn dirt infield, grown-over bases, a pitcher's mound",decal:!0,build(n){n.box([0,.015,0],[2.2*1.6,.015,2.2*1.2],s.LEAF2,{group:1,round:.01,paint:t=>{const i=Math.abs(t[0])/2.2+Math.abs(t[2])/1.6500000000000001;return i<1.08&&i>.78?Et(t,8)<.2?s.LEAF2:s.BARK2:i<=.78?Et(t,6)<.15?s.MOSS:void 0:Et(t,6,3)<.3?s.LEAF:void 0}});for(const[t,i]of[[2.2,0],[0,2.2*.75],[-2.2,0],[0,-2.2*.75]])n.box([t*.93,.04,i*.93],[.12,.02,.1],s.BELLY,{group:2,round:.02,paint:r=>Et(r,20)<.3?s.LEAF2:void 0});n.ell([0,.02,0],[.35,.08,.28],s.BARK2,{group:3})}},backstop:{desc:"a baseball backstop fence, a dugout bench beside it",build(n){for(let e=0;e<=4;e++){const t=-.8+e*.4;Je(n,[-Math.cos(t)*.8,0,Math.sin(t)*1.4],[-Math.cos(t)*.8,1.8,Math.sin(t)*1.4],1,.03)}for(let e=0;e<4;e++){const t=-.8+e*.4,i=t+.4,r=[-Math.cos(t)*.8,.9,Math.sin(t)*1.4],a=[-Math.cos(i)*.8,.9,Math.sin(i)*1.4],o=y.lerp(r,a,.5);n.box(o,[Math.hypot(a[0]-r[0],a[2]-r[2])/2,.9,.008],s.FRAME,{dir:y.sub(a,r),group:2,paint:l=>(l[1]+l[0]*2+9)*9%1<.2?Et(l,5)<.2?s.BODY2:s.FRAME:s.SHADES})}n.box([-.6,.3,2],[.15,.04,.7],s.WOOD,{group:3});for(const e of[1.4,2.6])n.box([-.6,.14,e],[.12,.14,.04],s.WOOD,{group:3});Xn(n,[-.75,0,-.5],[-.7,1.6,-.4],4,25)}},scoreboard:{desc:"a scoreboard frame, panels missing (no text)",split:1.8,build(n){for(const e of[-1,1])Je(n,[e,0,0],[e,2.6,0],1,.05);for(let e=0;e<3;e++)for(let t=0;t<5;t++)Gt(e,t)>.3&&n.box([-.8+t*.4,1.6+e*.32,0],[.18,.14,.03],s.HAT1,{group:2+e,round:.01,paint:Ot(.3,.1)});n.box([0,2.62,0],[1.1,.05,.06],s.FRAME,{group:5}),Xn(n,[-1,0,.06],[-.95,2.3,.06],6,26)}},"football-pitch":{desc:"a football pitch: faded lines, a centre circle, mown stripes long grown out",decal:!0,build(n){n.box([0,.015,0],[5.2+.5,.015,3.3+.5],s.LEAF2,{group:1,round:.01,paint:i=>{const r=i[0],a=i[2];return Math.abs(r)<=5.2+.05&&Math.abs(a)<=3.3+.05&&(Wn(Math.abs(r),5.2,.06)||Wn(Math.abs(a),3.3,.06)||Wn(r,0,.06)||Wn(Math.hypot(r,a*1),1,.06)||Math.abs(r)>5.2-1&&Math.abs(a)<1.6&&(Wn(Math.abs(r),5.2-1,.06)||Wn(Math.abs(a),1.6,.06)))?Et(i,8,2)<.3?s.LEAF2:s.CLOTH:Math.floor((r+20)*.8)%2?Et(i,6)<.25?s.LEAF2:s.LEAF:Et(i,5,9)<.1?s.LEAF3:void 0}})}},goal:{desc:"a football goal, its net torn, a sapling grown through it",split:1.1,build(n){ru(n,1),n.seg([.3,0,.2],[.3,1.5,.2],.035,.025,s.TRUNK,{group:5}),ws(n,[.3,1.6,.2],[.35,.25,.3],6),zt(n,8,1.2,7,27)}},"goal-tipped":{desc:"a football goal tipped on its back",build(n){const e=n.parts.length;ru(n,1),oi(n,e,{pitch:-Math.PI/2+.12,at:[-.5,.06,0]}),zt(n,8,1.2,7,28)}},"corner-flag":{desc:"a corner flag, its flag a faded rag",build(n){Je(n,[0,0,0],[0,.9,0],1,.015),n.box([.12,.8,0],[.12,.08,.006],s.ACCENT,{group:2,dir:[1,-.3,.1],paint:Ot(.2,0)}),zt(n,5,.4,3,29)}},floodlight:{desc:"a floodlight pylon, one lamp still flickering with fairy light",glow:!0,split:2.4,build(n){for(const[t,i]of[[-.25,-.25],[.25,-.25],[.25,.25],[-.25,.25]])Je(n,[t*1.6,0,i*1.6],[t*.5,4,i*.5],1,.035);for(let t=1;t<8;t++){const i=t*4/8,r=1.6-1.1*i/4;Je(n,[-.25*r,i,-.25*r],[.25*r,i+4/8,.25*r],2,.015),Je(n,[.25*r,i,-.25*r],[-.25*r,i+4/8,.25*r],2,.015)}for(let t=0;t<2;t++)for(let i=0;i<3;i++)n.box([-.3+i*.3,4+.2+t*.25,.1],[.12,.1,.06],s.FRAME,{group:3,round:.02,paint:r=>r[2]>.14?t===1&&i===1?s.MAGIC2:s.SHADES:Ot(.4,.1)(r)});Kr(n,[0,4+.45,.22],.06,4,s.MAGIC2),Xn(n,[-.4,0,.4],[-.2,2.4,.2],5,30)}},"basketball-hoop":{desc:"a basketball hoop on a leaning post, its net gone",split:1.8,build(n){const e=n.parts.length;Je(n,[0,0,0],[0,2.4,0],1,.05),n.box([.15,2.5,0],[.03,.3,.45],s.BELLY,{group:2,paint:t=>Math.abs(t[1]-2.4)<.1&&Math.abs(t[2])<.14&&Math.abs(Math.abs(t[2])-.12)<.02?s.ACCENT:Ot(.25,.1)(t)});for(let t=0;t<8;t++){const i=t/8*6.283,r=(t+1)/8*6.283;Je(n,[.36+Math.cos(i)*.17,2.32,Math.sin(i)*.17],[.36+Math.cos(r)*.17,2.32,Math.sin(r)*.17],3,.012,s.ACCENT)}oi(n,e,{pitch:-.2}),zt(n,8,1,5,31)}}};function ru(n,e){for(const t of[-1.4,1.4])Je(n,[0,0,t],[0,1,t],e,.035,s.BELLY);Je(n,[0,1,-1.4],[0,1,1.4],e,.035,s.BELLY);for(const t of[-1.4,1.4])Je(n,[0,1,t],[-.6,0,t],e+1,.02,s.BELLY);n.box([-.3,.5,0],[.012,.55,1.38],s.CLOTH,{dir:[.6,1,0],group:e+2,paint:t=>t[1]*12%1<.3||(t[2]+5)*12%1<.3?s.CLOTH:s.SHADES}),n.ell([-.3,.4,.5],[.2,.3,.4],s.CLOTH,{group:e+2,cut:!0})}const sM=[...Object.entries(nM).map(([n,e])=>({id:n,family:"modern",size:1,split:null,...e})),...Object.entries(iM).map(([n,e])=>({id:n,family:"playground",size:1.1,split:null,...e})),...Object.entries(aM).map(([n,e])=>({id:n,family:"sports",size:1.1,split:null,...e}))];Object.fromEntries(sM.map(n=>[n.id,n]));const kt=(n,e=0)=>{const t=Math.sin(n*127.1+e*311.7)*43758.5453;return t-Math.floor(t)},$n=(n,e,t=0)=>kt(Math.floor(n[0]*e)+Math.floor(n[2]*e)*57+t,Math.floor(n[1]*e)),gl=n=>{const e=$n(n,12);return e<.14?s.BARKD:e>.88?s.BARKL:void 0},oM=n=>e=>{const t=$n(e,10,3);return e[1]<n[1]-.2||t<.2?s.LEAF3:t>.8?s.LEAF2:void 0},un=(n,e=0)=>t=>{const i=$n(t,9,7);return t[1]>.05&&i<(n?.34:.12)&&$n(t,3,1)<(n?.75:.45)?s.MOSS:e&&(t[1]*e%1<.1||((t[0]+t[2])*e*.7+Math.floor(t[1]*e)*.5)%1<.07)||i>.93?s.STONED:void 0},dt=(n,e,t,i,r,a={})=>n.box(e,t,s.STONE,{round:.03,rough:.012,group:i,paint:un(r,a.courses??5),...a}),vn=(n,e,t,i,r)=>{const a=[];for(let o=0;o<=4;o++){const l=o/4;a.push([...y.add(y.lerp(e,t,l),[(kt(r,o)-.5)*.15,0,.02]),.03])}n.chain(a,s.LEAF,{group:i,rough:.02,paint:o=>$n(o,30)<.3?s.LEAF2:void 0})},wi=(n,e,t,i,r)=>{for(let a=0;a<e;a++){const o=kt(r,a)*6.283,l=t*Math.sqrt(kt(a,r)),u=Math.cos(o)*l,c=Math.sin(o)*l*.7;n.ell([u,.08,c],[.07,.1+kt(a,4)*.08,.07],s.LEAF2,{group:i+a%3,paint:h=>h[1]>.14?s.LEAF:void 0})}},ri=(n,e,t,i)=>n.ell(e,t,s.LEAF,{group:i,rough:.04,paint:oM(e)}),Tn=(n,e,t)=>n.chain(e,s.TRUNK,{group:t,rough:.012,paint:gl}),bn=(n,e,t,i,r={})=>n.ell(e,t,s.STONE,{group:i,rough:.03,dir:r.dir,paint:a=>a[1]>e[1]+t[1]*(r.moss??.62)&&$n(a,5,i)<.7?s.MOSS:$n(a,14)>.9?s.STONED:void 0}),au=(n,e,t,i,r=s.MAGIC)=>n.ell(e,[t,t,t],r,{group:i,extra:!0}),lM={"broken-arch":{desc:"a broken arch, one side fallen, a rune on its keystone",glow:!0,split:null,build(n,e){for(const t of[-1,1])dt(n,[t,t<0?1:.7,0],[.22,t<0?1:.7,.25],1+(t>0?1:0),e);for(let t=0;t<=6;t++){const i=Math.PI*(1-t/9),r=[Math.cos(i)*1,2+Math.sin(i)*.7,0];dt(n,r,[.17,.14,.25],3+t%2,e,{dir:[-Math.sin(i),Math.cos(i),0],courses:0,paint:t===4?(a=>Math.abs(a[0]-r[0])<.05&&Math.abs(a[1]-r[1])<.08?s.RUNE:un(e)(a)):un(e)})}for(let t=0;t<4;t++)dt(n,[1.3+t*.3,.14,.4+kt(t)*.5],[.17,.13,.22],6+t,e,{dir:[1,.3*(kt(t,2)-.5),kt(t,3)-.5],courses:0});e&&(vn(n,[-1.15,.1,.26],[-.9,1.9,.26],12,1),wi(n,14,1.8,14,2))}},"tower-stump":{desc:"a fallen tower's stump, a spiral stair climbing round its inside",split:2,build(n,e){for(let t=0;t<14;t++){const i=t/14*Math.PI*2,r=1+(Math.sin(i*2+1)*.5+.5)*1.6*(i>3.6&&i<5.4?1:.55);i>.9&&i<2||dt(n,[Math.cos(i)*1.05,r/2,Math.sin(i)*.95],[.25,r/2,.14],1+t%3,e,{dir:[-Math.sin(i),0,Math.cos(i)]})}for(let t=0;t<9;t++){const i=3.2+t*.42,r=.15+t*.26;dt(n,[Math.cos(i)*.7,r,Math.sin(i)*.6],[.24,.06,.12],5,e,{dir:[Math.cos(i),0,Math.sin(i)],courses:0})}for(let t=0;t<3;t++)dt(n,[.6+t*.35,.14,1.1],[.22,.13,.2],7,e,{dir:[1,0,.4*t],courses:0});e&&(vn(n,[-1.05,.1,-.4],[-1,2.3,-.5],10,3),vn(n,[.9,.1,-.6],[.95,1.7,-.55],11,4),n.ell([0,.2,0],[.55,.2,.5],s.LEAF,{group:12,rough:.04}))}},colonnade:{desc:"a colonnade, two columns standing and the rest toppled",split:null,build(n,e){dt(n,[0,.08,0],[2.2,.08,.55],1,e,{courses:0});for(const[t,i]of[[-1.7,1.9],[-.6,1.4]])n.seg([t,.16,0],[t,i,0],.18,.17,s.STONE,{group:2,rough:.01,paint:r=>Math.abs(Math.sin(Math.atan2(r[2],r[0]-t)*8))<.15?s.STONED:un(e,0)(r)}),dt(n,[t,i+.07,0],[.26,.07,.26],3,e,{courses:0});for(const[t,i,r]of[[.6,.55,.3],[1.6,.4,-.4]])n.seg([t-Math.cos(r)*.7,.2,i-Math.sin(r)*.7],[t+Math.cos(r)*.7,.2,i+Math.sin(r)*.7],.18,.18,s.STONE,{group:4,paint:un(e,0)});dt(n,[-1.15,2,0],[.75,.1,.28],5,e,{courses:0}),e&&(vn(n,[-1.7,.2,.18],[-1.65,1.8,.18],8,5),wi(n,16,2.2,10,6))}},"stone-ring":{desc:"a ring of standing-stone stubs",split:null,build(n,e){for(let t=0;t<9;t++){const i=t/9*Math.PI*2,r=.3+kt(t,9)*(t%3===0?1.2:.45);dt(n,[Math.cos(i)*1.7,r/2,Math.sin(i)*1.35],[.2,r/2,.14],1+t%4,e,{dir:[-Math.sin(i),.1*(kt(t)-.5),Math.cos(i)],courses:0,round:.07})}dt(n,[0,.1,0],[.55,.1,.35],6,e,{courses:0,round:.05}),e&&wi(n,20,2,10,7)}},"chapel-wall":{desc:"a ruined chapel wall with an empty pointed window, moonlight caught in it",glow:!0,split:2.4,build(n,e){dt(n,[0,1.4,0],[1.4,1.4,.18],1,e,{paint:t=>{const i=t[0],r=t[1];return Math.abs(i)<.38&&r>1.1&&r<2.3-Math.abs(i)*.5?void 0:un(e,5)(t)}}),n.box([0,1.6,0],[.33,.55,.3],s.NOSE,{group:1,cut:!0}),n.ell([0,1.5,-.05],[.3,.5,.02],s.MAGIC2,{group:2,extra:!0,paint:t=>$n(t,18)<.5?s.MAGIC:void 0});for(const[t,i]of[[-1.55,2.6],[1.5,1.6]])dt(n,[t,i/2,0],[.22,i/2,.26],3,e);for(let t=0;t<5;t++)dt(n,[-1.2+t*.6,.12,.55+kt(t)*.3],[.18,.12,.16],4,e,{courses:0,dir:[1,0,kt(t,5)-.5]});e&&(vn(n,[-1.2,.1,.2],[-.6,2.6,.2],6,8),vn(n,[1,.1,.2],[1.2,2,.2],7,9))}},well:{desc:"an old well with a broken winch, fireflies over the water",glow:!0,split:null,build(n,e){for(let t=0;t<12;t++){const i=t/12*Math.PI*2;dt(n,[Math.cos(i)*.55,.32,Math.sin(i)*.5],[.15,.32,.1],1+t%2,e,{dir:[-Math.sin(i),0,Math.cos(i)],courses:3})}n.ell([0,.55,0],[.42,.02,.38],s.WATER,{group:3});for(const t of[-.6,.6])n.box([t,1,0],[.06,.5,.06],s.WOOD,{group:4,round:.02});n.seg([-.6,1.4,0],[.1,1.25,.05],.04,.04,s.WOOD,{group:5}),n.seg([.1,1.25,.05],[0,.85,.1],.01,.01,s.STRAW,{group:5});for(let t=0;t<4;t++)au(n,[(kt(t)-.5)*.8,.8+kt(t,2)*.7,(kt(t,3)-.5)*.6],.03,10+t,t%2?s.MAGIC:s.MAGIC2);e&&(vn(n,[-.55,.05,.5],[-.4,.62,.5],15,10),wi(n,10,1,16,11))}},watchtower:{desc:"a crumbled watchtower, tall enough to see from the treetops",split:2.6,build(n,e){dt(n,[0,1.2,0],[.7,1.2,.7],1,e,{paint:t=>Math.abs(t[1]-1.9)<.16&&Math.abs(t[0])<.07&&t[2]>.6?s.NOSE:un(e,5)(t)});for(const[t,i,r]of[[-.5,-.5,1.3],[0,-.5,1],[.5,-.5,.7],[-.5,0,.9],[-.5,.5,.5],[.5,0,.3]])dt(n,[t,2.4+r/2,i],[.2,r/2,.2],1,e);n.box([0,.55,.7],[.25,.45,.1],s.NOSE,{group:1,cut:!0});for(let t=0;t<6;t++)dt(n,[.5+kt(t)*1.2,.13,-.3+kt(t,4)*1.2],[.17,.12,.15],2+t%2,e,{courses:0,dir:[1,0,kt(t,5)-.5]});e&&(vn(n,[-.7,.1,.3],[-.7,2.4,.2],4,12),vn(n,[.3,.1,.72],[.5,1.8,.72],5,13),ri(n,[.1,2.6,-.2],[.45,.3,.4],6))}},"sunken-stair":{desc:"a stairway going down into the ground, a dark doorway at its foot",split:null,build(n,e){for(const t of[-.6,.6])dt(n,[0,.2,t],[1.1,.2,.12],1,e,{courses:2});for(let t=0;t<5;t++)dt(n,[.8-t*.32,.3-t*.07,0],[.16,.04,.5],2,e,{courses:0});n.box([-.55,.08,0],[.28,.1,.48],s.NOSE,{group:3}),dt(n,[-1.1,.55,0],[.15,.55,.62],4,e),dt(n,[-1.05,1.15,0],[.2,.1,.7],5,e,{courses:0}),e&&(wi(n,12,1.6,10,14),vn(n,[-1,1.2,.5],[-.9,.3,.62],13,15))}},"statue-head":{desc:"a toppled giant statue head, its eyes still faintly lit",glow:!0,split:null,build(n,e){const t=[0,.8,0],i=.62,r=(a,o)=>[t[0]+o,t[1]+a,t[2]+i];n.ell(t,[.8,1,.7],s.STONE,{group:1,rough:.012,dir:[1,.25,0],paint:un(e,0)}),n.ell(r(.3,0),[.62,.14,.16],s.STONE,{group:2,paint:un(e,0)});for(const a of[-.26,.26])n.ell(r(.12,a),[.15,.09,.1],s.STONED,{group:1,cut:!0}),au(n,r(.12,a),.05,3+(a>0?1:0),s.MAGIC);n.ell(r(-.08,0),[.11,.24,.14],s.STONE,{group:5,paint:un(e,0)}),n.ell(r(-.42,0),[.3,.07,.08],s.STONE,{group:6,paint:a=>Math.abs(a[1]-(t[1]-.42))<.015?s.STONED:un(e,0)(a)});for(const[a,o]of[[-.55,.75],[0,.95],[.5,.8],[-.7,.3],[.75,.3]])n.ell([t[0]+a,t[1]+o,t[2]-.2],[.3,.25,.45],s.STONE,{group:7,rough:.02,paint:un(e,0)});n.ell([t[0],.05,t[2]+.2],[1,.1,.8],s.STONE,{group:8,paint:un(e,0)}),e&&(wi(n,14,1.8,10,16),ri(n,y.add(t,[-.2,.95,-.2]),[.5,.25,.45],6))}},hearth:{desc:"a collapsed cottage: its hearth and chimney still standing",split:2.6,build(n,e){dt(n,[0,1.6,-.2],[.45,1.6,.35],1,e),n.box([0,.45,.1],[.3,.3,.3],s.NOSE,{group:1,cut:!0});for(const[t,i,r,a,o]of[[-1.1,.4,.9,.5,0],[1,.5,.7,.35,0],[-1.9,-.2,.12,.35,1]])dt(n,[t,a/2,i],o?[.12,a/2,.7]:[r,a/2,.12],2,e);for(let t=0;t<4;t++)n.seg([-.5+t*.4,.08,.9],[.2+t*.5,.3,.3+t*.1],.05,.05,s.BARKD,{group:3});e&&(vn(n,[-.4,.1,.16],[-.3,2.8,.16],5,17),wi(n,14,1.8,10,18))}},"bridge-span":{desc:"an old bridge span going nowhere, one arch over nothing",split:null,build(n,e){dt(n,[-.9,.7,0],[.35,.7,.5],1,e),dt(n,[.95,.55,0],[.3,.55,.5],2,e);for(let t=0;t<=8;t++){const i=t/8,r=Math.PI*(1-i),a=[Math.cos(r)*.85,.9+Math.sin(r)*.55,0];dt(n,a,[.14,.12,.5],3+t%2,e,{dir:[-Math.sin(r),Math.cos(r),0],courses:0})}dt(n,[-.1,1.62,0],[1.25,.1,.55],5,e,{courses:0,dir:[1,-.08,0]});for(const t of[-.5,.5])dt(n,[-.2,1.85,t],[1,.14,.06],6,e,{courses:0});e&&(vn(n,[-1.2,.1,.5],[-1,1.6,.55],8,19),wi(n,10,1.6,10,20))}},gateway:{desc:"an overgrown gateway, two posts and a rusted gate, a rune glowing on one post",glow:!0,split:null,build(n,e){for(const t of[-.9,.9])dt(n,[t,.9,0],[.22,.9,.22],1+(t>0?1:0),e,{paint:t<0?(i=>i[2]>.2&&Math.abs(i[1]-1.1)<.14&&Math.abs(i[0]-t)<.06?s.RUNE:un(e,5)(i)):un(e,5)}),n.ell([t,1.9,0],[.18,.14,.18],s.STONE,{group:3,paint:un(e,0)});for(let t=0;t<6;t++)n.seg([-.65+t*.12,.1,.1+t*.06],[-.65+t*.12,1.2,.1+t*.06],.015,.015,s.SHADES,{group:4});for(const t of[.25,1.1])n.seg([-.65,t,.1],[-.05,t,.4],.018,.018,s.SHADES,{group:4});for(const t of[-1,1])for(let i=0;i<3;i++)dt(n,[t*(1.3+i*.35),.3-i*.08,0],[.17,.3-i*.08,.14],5,e);e&&(vn(n,[.75,.05,.22],[.85,1.9,.22],7,21),vn(n,[-.9,1.8,.22],[-.3,1,.3],8,22),wi(n,12,1.6,10,23))}}},cM={pebbles:{desc:"a cluster of fist-sized stones",build(n){for(let e=0;e<7;e++)bn(n,[(kt(e)-.5)*.6,.04,(kt(e,2)-.5)*.4],[.07+kt(e,3)*.05,.05,.07],1+e,{moss:.8})}},pair:{desc:"two small rocks",build(n){bn(n,[-.15,.12,0],[.22,.15,.2],1),bn(n,[.2,.08,.12],[.14,.1,.13],2)}},rock:{desc:"a knee-high rock",build(n){bn(n,[0,.22,0],[.45,.3,.38],1,{dir:[1,.15,.2]})}},split:{desc:"a rock split in two, a seedling in the crack",build(n){bn(n,[-.28,.35,0],[.3,.45,.45],1,{dir:[1,.3,0]}),bn(n,[.3,.33,0],[.3,.42,.45],2,{dir:[1,-.3,0]}),n.seg([.02,.2,.1],[0,.6,.1],.015,.01,s.TRUNK,{group:3}),ri(n,[0,.62,.1],[.1,.07,.1],4)}},boulder:{desc:"a big boulder",build(n){bn(n,[0,.55,0],[.85,.75,.7],1,{dir:[1,.1,.3]}),bn(n,[.7,.15,.5],[.22,.15,.2],2)}},"great-boulder":{desc:"a great mossy boulder, a landmark",build(n){bn(n,[0,.9,0],[1.4,1.15,1.1],1,{dir:[1,.2,.1],moss:.2}),bn(n,[-1.1,.3,.6],[.4,.35,.35],2),bn(n,[1.2,.2,.5],[.3,.22,.28],3)}},slab:{desc:"a flat slab of rock",build(n){n.box([0,.12,0],[1,.12,.7],s.STONE,{round:.08,rough:.02,group:1,dir:[1,.04,.2],paint:e=>e[1]>.2&&$n(e,6)<.3?s.MOSS:$n(e,14)>.9?s.STONED:void 0})}},"standing-rock":{desc:"a tall natural standing rock",build(n){bn(n,[0,.8,0],[.35,.85,.3],1,{moss:.8}),bn(n,[.35,.1,.25],[.15,.1,.14],2)}}},uM={"spiral-tree":{desc:"a tree whose trunk twists in a spiral",split:2.4,build(n){const e=[];for(let t=0;t<=10;t++){const i=t/10,r=i*Math.PI*4;e.push([Math.cos(r)*.35*(1-i*.4),i*3,Math.sin(r)*.3,.2-i*.12])}Tn(n,e,1),ri(n,[0,3.2,0],[.9,.6,.8],2)}},"loop-tree":{desc:"a tree grown into a loop",split:2.4,build(n){const e=[[0,0,0,.22],[.1,.9,0,.18]];for(let t=0;t<=10;t++){const i=-Math.PI/2+t/10*Math.PI*2;e.push([.1+Math.cos(i)*.55+t*.02,1.45+Math.sin(i)*.55,0,.15])}e.push([.3,2.6,0,.1]),Tn(n,e,1),ri(n,[.3,2.9,0],[.75,.5,.65],2)}},"split-tree":{desc:"a tree split by lightning, both halves still leafing",split:2,build(n){Tn(n,[[0,0,0,.3],[0,.9,0,.26]],1),Tn(n,[[-.05,.9,0,.18],[-.6,1.9,0,.13],[-1,2.6,0,.07]],2),Tn(n,[[.05,.9,0,.18],[.55,1.8,.05,.13],[.9,2.4,.05,.07]],3),n.ell([0,1,.05],[.08,.25,.2],s.BARKD,{group:1,cut:!0}),ri(n,[-1,2.7,0],[.6,.45,.5],4),ri(n,[.95,2.5,.05],[.55,.4,.5],5)}},"door-tree":{desc:"a fat old tree with a little round door in it, a lit window above",glow:!0,split:2.3,build(n){n.ell([0,1,0],[.8,1.1,.75],s.TRUNK,{group:1,rough:.02,paint:e=>e[2]>.5&&Math.hypot(e[0],e[1]-.45)<.3&&e[1]>.2?Math.hypot(e[0],e[1]-.45)<.25?Math.abs(e[0]%.1)<.015?s.BARKD:s.ACCENT:s.BARKD:e[2]>.45&&Math.hypot(e[0]-.3,e[1]-1.3)<.13?Math.abs(e[0]-.3)<.015||Math.abs(e[1]-1.3)<.015?s.BARKD:s.GLOW:gl(e)}),n.ell([.12,.45,.72],[.03,.03,.03],s.FRAME,{group:2}),ri(n,[0,2.4,-.1],[1.1,.7,.9],3);for(let e=0;e<5;e++){const t=e/5*Math.PI*2;Tn(n,[[Math.cos(t)*.6,.2,Math.sin(t)*.55,.15],[Math.cos(t)*1.1,.02,Math.sin(t)*1,.05]],4)}}},"mushroom-tree":{desc:"an enormous mushroom, tall as a tree",split:2.2,build(n){n.seg([0,0,0],[.1,2.4,0],.3,.22,s.CLOTH,{group:1,paint:e=>e[1]>2&&e[1]<2.15?s.BELLY:void 0}),n.ell([.1,2.55,0],[1.3,.45,1.15],s.ACCENT,{group:2,rough:.01,paint:e=>e[1]<2.35?s.BODY2:$n(e,8)<.18?s.BELLY:void 0}),n.ell([.1,2.35,0],[1.2,.08,1.05],s.BODY2,{group:3,paint:e=>Math.abs(Math.sin(Math.atan2(e[2],e[0]-.1)*20))<.3?s.STRAW:void 0})}},"root-tree":{desc:"an upside-down-looking tree, its roots raised high like a crown",split:2,build(n){Tn(n,[[0,0,0,.35],[0,1.6,0,.25]],1);for(let e=0;e<7;e++){const t=e/7*Math.PI*2;Tn(n,[[0,1.6,0,.16],[Math.cos(t)*.7,2.2+kt(e)*.3,Math.sin(t)*.6,.1],[Math.cos(t)*1.2,2.5+kt(e,2)*.4,Math.sin(t)*1,.04]],2+e%2)}for(let e=0;e<4;e++){const t=e/4*Math.PI*2+.4;Tn(n,[[Math.cos(t)*.25,.3,Math.sin(t)*.25,.14],[Math.cos(t)*.6,.02,Math.sin(t)*.55,.05]],4)}}},"stone-lifter":{desc:"a tree that has lifted great stones up in its roots",split:2.4,build(n){Tn(n,[[0,.6,0,.3],[0,2,0,.22],[.1,2.8,0,.12]],1);for(let e=0;e<6;e++){const t=e/6*Math.PI*2;Tn(n,[[Math.cos(t)*.2,.6,Math.sin(t)*.2,.15],[Math.cos(t)*.6,.45,Math.sin(t)*.55,.12],[Math.cos(t)*.9,0,Math.sin(t)*.8,.07]],2)}for(const[e,t,i]of[[.5,.45,.9],[-.5,.4,1.1],[.15,-.5,.8]])bn(n,[e,i,t],[.3,.24,.26],3);ri(n,[.1,3,0],[1,.6,.85],4)}},"ring-tree":{desc:"a hollow ring of a tree you could fly through",split:null,build(n){for(let e=0;e<=16;e++){const t=e/16*Math.PI*2,i=[Math.cos(t)*1.2,1.35+Math.sin(t)*1.2,0];n.ell(i,[.3,.3,.3],s.TRUNK,{group:1,rough:.02,paint:gl})}Tn(n,[[-.6,0,.2,.3],[-.5,.3,.1,.3]],2),Tn(n,[[.6,0,.2,.3],[.5,.3,.1,.3]],2);for(const[e,t]of[[-.9,2.3],[.3,2.65],[1.1,2]])ri(n,[e,t,-.1],[.45,.3,.35],3)}}},hM=[...Object.entries(lM).map(([n,e])=>({id:n,family:"ruins",size:1.15,variants:2,...e})),...Object.entries(cM).map(([n,e])=>({id:n,family:"rocks",size:1,variants:1,split:null,...e})),...Object.entries(uM).map(([n,e])=>({id:n,family:"freak",size:1.2,variants:1,...e}))];Object.fromEntries(hM.map(n=>[n.id,n]));const at=(n,e=0)=>{const t=Math.sin(n*127.1+e*311.7)*43758.5453;return t-Math.floor(t)},Ie=(n,e,t=0)=>at(Math.floor(n[0]*e)+Math.floor(n[2]*e)*57+t,Math.floor(n[1]*e)),it=(n=.2,e=.15)=>t=>{const i=Ie(t,16,3);return Ie(t,6,5)<e&&t[1]>.1?s.MOSS:i>1-n*.7?s.BODY2:void 0},St=(n=7,e=.15)=>t=>Ie(t,6,9)<e&&t[1]>.15?s.MOSS:Math.abs(Math.sin(t[1]*60+Math.sin(t[0]*9)*1.5))>.97?s.BARK2:Ie(t,n*3,2)>.9?s.BARKD:void 0,Ge=(n,e,t,i,r,a=0,o=0)=>{for(let l=0;l<e;l++){const u=at(r,l)*6.283,c=t*Math.sqrt(at(l,r));n.ell([a+Math.cos(u)*c,.07,o+Math.sin(u)*c*.7],[.07,.1+at(l,4)*.08,.07],s.LEAF2,{group:i+l%3,paint:h=>h[1]>.13?s.LEAF:void 0})}},cr=(n,e,t,i=1)=>{for(let r=0;r<6;r++){const a=r/6*6.283+e[0],o=[Math.cos(a),0,Math.sin(a)];n.chain([[...e,.03*i],[...y.add(e,y.add(y.mul(o,.25*i),[0,.2*i,0])),.025*i],[...y.add(e,y.add(y.mul(o,.5*i),[0,.05*i,0])),.01*i]],r%2?s.LEAF:s.LEAF2,{group:t})}},qn=(n,e,t,i,r)=>{const a=[];for(let o=0;o<=4;o++)a.push([...y.add(y.lerp(e,t,o/4),[(at(r,o)-.5)*.12,0,.02]),.03]);n.chain(a,s.LEAF,{group:i,paint:o=>Ie(o,30)<.3?s.LEAF2:void 0})},dM=(n,e,t,i)=>n.ell(e,t,s.LEAF,{group:i,rough:.04,paint:r=>{const a=Ie(r,10,2);return r[1]<e[1]-.15||a<.2?s.LEAF3:a>.8?s.LEAF2:void 0}}),st=(n,e,t,i,r=.025,a=s.FRAME,o=it(.35,.05))=>n.seg(e,t,r,r,a,{group:i,paint:o}),fM=(n,e,t,i,r=s.MAGIC)=>n.ell(e,[t,t,t],r,{group:i,extra:!0}),_h=(n,e,t,i)=>n.ell(e,t,s.MOSS,{group:i,rough:.03,paint:r=>Ie(r,12,4)<.25?s.LEAF2:Ie(r,9,6)<.15?s.LEAF3:void 0});function Kn(n,e,t,i,r,a,o={}){const l=y.norm(y.sub(t,e)),u=typeof o.end=="function"?o.end:void 0,c=typeof o.end=="number"?o.end:r;n.seg(e,t,i,i,r,{group:a,paint:o.paint});for(const[h,f]of[[t,1],[e,-1]])n.box(y.add(h,y.mul(l,f*i*.75)),[i*.75,i*1.25,i*1.25],c,{dir:y.mul(l,f),up:Math.abs(l[1])>.9?[1,0,0]:[0,1,0],round:.005,group:a,cut:!0,paint:u})}const xl=(n,e)=>t=>{const i=[0,1,2].filter(a=>a!==e);return Math.hypot(t[i[0]]-n[i[0]],t[i[1]]-n[i[1]])*34%1<.22?s.BARK2:Ie(t,30)<.05?s.BARKD:s.STRAW},Or=(n,e,t,i,r,a=!1)=>n.ell(e,[t,a?t*.8:t,i],s.BODY3,{group:r,paint:o=>{const l=Math.hypot(o[0]-e[0],o[1]-e[1]);return l<t*.45?Ie(o,20)<.3?s.BODY2:s.FRAME:l>t*.8&&Math.abs(Math.sin(Math.atan2(o[1]-e[1],o[0]-e[0])*14))<.3?s.NOSE:void 0}});function pM(n,e,{yaw:t=0,pitch:i=0,roll:r=0,at:a=[0,0,0]}={},o=n.flats.length){const l=(d,p,m,M)=>{const x=Math.cos(p),g=Math.sin(p),_=[...d];return _[m]=d[m]*x-d[M]*g,_[M]=d[m]*g+d[M]*x,_},u=d=>l(l(l(d,r,1,2),i,0,1),-t,0,2),c=d=>l(l(l(d,t,0,2),-i,0,1),-r,1,2),h=d=>y.add(u(d),a),f=d=>c(y.sub(d,a));for(const d of n.parts.slice(e))if(d.type==="cone"?(d.a=h(d.a),d.b=h(d.b)):(d.c=h(d.c),d.axes=d.axes.map(u)),d.paint){const p=d.paint;d.paint=(m,M)=>p(f(m),M)}for(const d of n.flats.slice(o))d.c=h(d.c),d.u=u(d.u),d.v=u(d.v)}const Sn=n=>[n.parts.length,n.flats.length],En=(n,[e,t],i)=>pM(n,e,i,t);function vo(n,e,{broken:t=!1,len:i=1}={}){for(const r of[-i,i])n.box([r,.45,0],[.06,.47,.06],s.WOOD,{round:.02,group:e,rough:.006,paint:St(7,.3)});for(const[r,a]of[.3,.55,.8].entries()){if(t&&r===1){n.box([-i*.55,a-.12,.03],[i*.48,.04,.022],s.WOOD,{dir:[1,-.35,0],round:.015,group:e+1,paint:St()}),n.box([i*.7,a-.2,.04],[i*.34,.04,.022],s.WOOD,{dir:[1,.8,0],round:.015,group:e+2,paint:St()});continue}t&&r===2||n.box([0,a,.07],[i+.06,.045,.022],s.WOOD,{round:.015,group:e+1,paint:St()})}}function bo(n,e,t,{mould:i=!1,along:r=2}={}){const l=[...e],u=[...e];l[1]=u[1]=e[1]+.56,l[r]-=.44,u[r]+=.44;const c=f=>{if(i&&(Ie(f,5,11)<.32||f[1]<e[1]+.25&&Ie(f,9,3)<.6))return Ie(f,14)<.4?s.BODY3:s.SKIN;const d=Ie(f,22,1);return d<.18?s.BARK2:d>.85?s.BELLY:void 0},h=f=>{const d=r===2?[f[0]-e[0],f[1]-l[1]]:[f[2]-e[2],f[1]-l[1]],p=Math.hypot(...d),m=Math.atan2(d[1],d[0])/6.283;return i&&Ie(f,6,2)<.35?s.SKIN:(p*12+m)%1<.3?s.BARK2:s.STRAW};if(Kn(n,l,u,.56,s.STRAW,t,{paint:c,end:h}),!i)for(const f of[-.25,.25]){const d=[...e];d[r]+=f,n.ell([d[0],e[1]+.56,d[2]],r===2?[.56+.012,.56+.012,.012]:[.012,.56+.012,.56+.012],s.CLOTH,{group:t+1})}}function ua(n,e,t,{mould:i=!1,yaw:r=0}={}){const a=[Math.cos(r),0,Math.sin(r)];n.box(y.add(e,[0,.19,0]),[.4,.19,.23],s.STRAW,{dir:a,round:.05,group:t,rough:.008,paint:o=>{if(i&&Ie(o,5,7)<.35)return Ie(o,13)<.4?s.BODY3:s.SKIN;const l=(o[0]-e[0])*a[0]+(o[2]-e[2])*a[2];if(Math.abs(Math.abs(l)-.2)<.02)return s.BARK2;const u=Ie(o,22,1);return u<.16?s.BARK2:u>.86?s.BELLY:void 0}})}const su=(n,e,t,i,r)=>Kn(n,e,t,i,s.TRUNK,r,{paint:a=>{const o=Ie(a,14,2);return o<.15?s.BARKD:o>.88?s.BARKL:Ie(a,5,8)<.12&&a[1]>e[1]?s.MOSS:void 0},end:xl(e,y.sub(t,e).map(Math.abs).indexOf(Math.max(...y.sub(t,e).map(Math.abs))))}),So=(n,e,t,i={})=>{n.ell(e,[.3,.1,.3],s.BODY3,{group:t,axes:i.axes,paint:r=>Math.abs(Math.sin(Math.atan2(r[2]-e[2],r[0]-e[0])*16))<.25?s.NOSE:Ie(r,9,4)<.1?s.MOSS:void 0}),n.ell(e,[.15,.2,.15],s.NOSE,{group:t,axes:i.axes,cut:!0})},Ml=(n,e,t,i,r,{cap:a=s.EAR,k:o=1}={})=>{for(let l=0;l<t;l++){const u=at(r,l)*6.283,c=.16*o*Math.sqrt(at(l,r)),h=e[0]+Math.cos(u)*c,f=e[2]+Math.sin(u)*c,d=(.06+at(l,3)*.09)*o;n.seg([h,e[1],f],[h,e[1]+d,f],.012*o,.01*o,s.CLOTH,{group:i}),n.ell([h,e[1]+d,f],[.04*o,.022*o,.04*o],a,{group:i+1})}},ou=(n,e,t,i=.35)=>(r,a)=>{const o=(r+1)/2*n,l=(a+1)/2*e;if(o%1<.07||o%1>.93||l%1<.07||l%1>.93)return s.FRAME;const u=Math.floor(o)+Math.floor(l)*7;return at(u,t)<i?null:Math.abs(Math.sin((o+l*.7)*9+u))<.06?s.STONED:s.SHADES},mM=(n,e,t)=>(i,r)=>{const a=(1-r)/2;return r<-1||Math.abs(i)>a?null:Math.min(a-Math.abs(i),r+1)<.17?n:t(i,r)?s.NOSE:e},vh={tractor:{desc:"an old tractor rusted through and sunk to its axles in moss, a sapling up through its cab",split:2.2,build(n){for(const t of[-.62,.62])Or(n,[-.6,.58+-.2,t],.58,.17,1+(t>0?1:0));for(const t of[-.5,.5])Or(n,[.95,.34+-.2,t],.34,.11,3,!0);n.box([.5,.64+-.2,0],[.62,.2,.25],s.BODY,{round:.08,group:4,paint:t=>Math.abs(t[2])>.2&&t[0]>.2&&t[0]*12%1<.35&&Math.abs(t[1]-.64- -.2)<.1?s.SHADES:it(.5,.2)(t)}),n.box([1.1,.66+-.2,0],[.06,.2,.22],s.FRAME,{round:.04,group:4,paint:t=>t[1]*18%1<.4?s.SHADES:it(.5,.1)(t)}),n.box([.35,.38+-.2,0],[.75,.13,.17],s.FRAME,{round:.05,group:5,paint:it(.55,.1)}),n.box([-.55,.74+-.2,0],[.32,.16,.42],s.BODY,{round:.06,group:6,paint:it(.55,.25)});for(const t of[-.62,.62])n.ell([-.6,.58+-.2,t],[.66,.66,.2],s.BODY,{group:7+(t>0?1:0),paint:it(.6,.3)}),n.ell([-.6,.58+-.2,t],[.6,.6,.3],s.BODY2,{group:7+(t>0?1:0),cut:!0}),n.box([-.6,.1+-.2,t],[.8,.55,.3],s.BODY2,{group:7+(t>0?1:0),cut:!0});n.box([-.62,1+-.2,0],[.17,.04,.17],s.BODY3,{round:.03,group:9}),n.box([-.78,1.17+-.2,0],[.03,.17,.16],s.BODY3,{round:.03,group:9}),st(n,[-.25,.9+-.2,0],[-.05,1.2+-.2,0],10,.02),n.flat([-.04,1.22+-.2,0],[0,0,1],[.5,.87,0],.13,.13,(t,i)=>Math.abs(Math.hypot(t,i)-.85)<.17?s.BODY3:null,{group:10,bend:.1});for(const[t,i]of[[-1.05,-.55],[-1.05,.55],[-.2,-.55],[-.2,.55]])st(n,[t,.9+-.2,i],[t*.95,2+-.2,i*.95],11,.03,s.BODY,it(.6,.05));n.box([-.62,2.03+-.2,-.2],[.5,.035,.5],s.BODY,{round:.02,group:12,dir:[1,0,.25],paint:t=>t[1]>2.03+-.2&&Ie(t,6,2)<.5?s.MOSS:it(.7,.3)(t)}),st(n,[.8,.8+-.2,.18],[.8,1.55+-.2,.18],13,.035,s.BODY3),n.seg([-.45,0,.05],[-.38,2.5,.1],.06,.035,s.TRUNK,{group:14,rough:.01}),dM(n,[-.36,2.6,.1],[.5,.38,.45],15),_h(n,[-.1,0,0],[1.75,.26,1.05],16),cr(n,[1.2,.05,.7],17),cr(n,[-1.3,.05,.8],18,.8),Ge(n,14,2.2,19,1)}},trailer:{desc:"a farm trailer, its boards silver with age, its tailgate dropped, a fern in its bed",build(n){n.box([0,.58,0],[1.15,.05,.6],s.WOOD,{round:.02,group:1,paint:St()});for(const e of[-.6,.6])n.box([0,.78,e],[1.15,.2,.03],s.WOOD,{round:.02,group:2,paint:St(7,.25)});n.box([-1.15,.78,0],[.03,.2,.6],s.WOOD,{round:.02,group:3,paint:St()}),n.box([1.32,.38,0],[.03,.2,.58],s.WOOD,{round:.02,group:4,dir:[.25,-1,0],up:[1,.25,0],paint:St(7,.3)});for(const e of[-.7,.7])Or(n,[0,.33,e],.33,.11,5,e>0);n.box([0,.45,0],[1,.06,.5],s.FRAME,{round:.03,group:6,paint:it(.6,.1)});for(const e of[-.3,.3])st(n,[-1.1,.5,e],[-1.8,.4,0],7,.035,s.FRAME,it(.6,.1));st(n,[-1.75,.4,0],[-1.75,0,0],7,.03,s.FRAME,it(.6,.1)),cr(n,[.3,.62,0],8,.9),Ge(n,12,2,9,2)}},"trailer-hay":{desc:"a trailer still loaded with hay bales, the top ones slumped and mouldy",build(n){vh.trailer.build(n);for(const[e,t,i,r,a]of[[-.7,-.3,.63,0,0],[-.7,.3,.63,0,0],[0,-.3,.63,0,0],[0,.3,.63,1,0],[.7,-.3,.63,0,0],[-.4,0,1.01,1,.2],[.35,-.1,1.01,1,-.3]])ua(n,[e,i,t],20+Math.round((e+1)*3)+(i>.9?9:0),{mould:!!r,yaw:a})}},"hay-round":{desc:"a round hay bale on its end, its net wrap perished",build(n){bo(n,[0,0,0],1),Ge(n,8,1,4,3)}},"hay-round-side":{desc:"a round hay bale lying along the ground",build(n){bo(n,[0,0,0],1,{along:0}),Ge(n,8,1,4,4)}},"hay-round-mouldy":{desc:"a round bale gone black with mould and sagging, mushrooms at its foot",build(n){const e=Sn(n);bo(n,[0,0,0],1,{mould:!0}),En(n,e,{roll:.06,at:[0,-.06,0]}),Ml(n,[.5,0,.35],6,3,1),Ge(n,10,1.1,5,5)}},"hay-square":{desc:"a small square hay bale",build(n){ua(n,[0,0,0],1),Ge(n,5,.6,3,6)}},"hay-square-mouldy":{desc:"a square bale gone soft and mouldy",build(n){ua(n,[0,0,0],1,{mould:!0,yaw:.3}),Ge(n,6,.6,3,7)}},"hay-stack":{desc:"square bales stacked three high, the stack slumping, one fallen",split:1.6,build(n){[[-.42,0,-.25],[.42,0,-.25],[-.42,0,.25],[.42,0,.25],[0,.38,-.25],[0,.38,.25],[-.05,.76,0]].forEach(([i,r,a],o)=>ua(n,[i,r,a],1+o,{mould:o===6||o===2,yaw:(at(o,9)-.5)*.25}));const t=Sn(n);ua(n,[0,0,0],10,{mould:!0}),En(n,t,{roll:1.2,yaw:.8,at:[1.1,.15,.45]}),Ge(n,10,1.4,12,8)}},fence:{desc:"a post-and-rail fence section, grey with age",build(n){vo(n,1),Ge(n,6,1,4,9)}},"fence-broken":{desc:"a fence section, its top rail gone and its middle rail snapped",build(n){vo(n,1,{broken:!0}),Ge(n,8,1,4,10)}},"fence-leaning":{desc:"a fence section leaning over, ivy through its rails",build(n){const e=Sn(n);vo(n,1),En(n,e,{roll:-.45}),qn(n,[-.8,0,.1],[.4,.55,-.2],5,11),Ge(n,8,1,6,11)}},gate:{desc:"a five-bar field gate hanging open on its post, its latch post fallen",split:null,build(n){n.box([0,.62,0],[.08,.64,.08],s.WOOD,{round:.02,group:1,paint:St(7,.35)});const e=Sn(n),t=2;for(let r=0;r<5;r++)n.box([t/2,.22+r*.17,0],[t/2,.03,.02],s.WOOD,{round:.012,group:2,paint:St()});for(const r of[.05,t-.05])n.box([r,.56,0],[.04,.4,.025],s.WOOD,{round:.012,group:3,paint:St()});n.box([t/2,.56,.02],[t/2*1.04,.025,.02],s.WOOD,{dir:[t,.66,0],round:.01,group:4,paint:St()}),st(n,[.1,.9,.03],[.1,.3,.03],4,.015,s.FRAME),En(n,e,{yaw:.55,pitch:-.04,at:[0,0,.08]});const i=Sn(n);n.box([0,.62,0],[.08,.64,.08],s.WOOD,{round:.02,group:5,paint:St(7,.4)}),En(n,i,{roll:1.45,at:[2,.08,.3]}),Ge(n,12,1.8,6,12)}},trough:{desc:"a galvanised feed trough on short legs, rainwater and leaves in it",build(n){n.box([0,.36,0],[.72,.17,.24],s.FRAME,{round:.07,group:1,paint:it(.5,.15)}),n.box([0,.52,0],[.68,.15,.2],s.FRAME,{round:.06,group:1,cut:!0}),n.box([0,.43,0],[.67,.01,.19],s.WATER,{group:2,paint:e=>Ie(e,11)<.2?s.LEAF3:Ie(e,9,3)<.12?s.BARK2:void 0});for(const e of[-.6,.6])for(const t of[-.16,.16])st(n,[e,.2,t],[e,0,t*1.3],3,.025);Ge(n,10,1.1,4,13)}},"water-butt":{desc:"a water butt on two bricks, moss down its side, its lid cracked",build(n){for(const e of[-.18,.18])n.box([e,.08,0],[.1,.08,.2],s.STONE,{round:.02,group:1,paint:t=>Ie(t,8)<.3?s.MOSS:void 0});Kn(n,[0,.16,0],[0,1,0],.3,s.HAT2,2,{paint:e=>Math.abs(Math.sin(e[1]*22))>.94?s.LEAF3:Ie(e,7,2)<.22&&e[2]>0?s.MOSS:void 0}),Kn(n,[0,.99,0],[0,1.05,0],.32,s.HAT2,3,{end:e=>Math.abs(e[0]-e[2]*.4)<.015?s.NOSE:Ie(e,10,3)<.3?s.MOSS:s.HAT2}),st(n,[.1,.3,.28],[.1,.3,.38],4,.03,s.FRAME),Ge(n,8,.8,5,14)}},scarecrow:{desc:"a scarecrow in a ragged coat and straw hat, a crow on its arm",split:1.6,build(n){n.seg([0,0,0],[0,1.9,0],.04,.035,s.WOOD,{group:1}),n.seg([-.6,1.48,0],[.6,1.5,0],.03,.03,s.WOOD,{group:1}),n.box([0,1.25,0],[.22,.36,.13],s.JACKET,{round:.08,group:2,rough:.01,paint:t=>Math.hypot(t[0]+.08,t[1]-1.12)<.07?s.ACCENT:Math.hypot(t[0]-.1,t[1]-1.35)<.06?s.HAT1:void 0});for(const t of[-1,1]){n.seg([t*.18,1.46,0],[t*.55,1.47,0],.085,.07,s.JACKET,{group:3,rough:.01});for(let i=0;i<4;i++)n.seg([t*.58,1.47,0],[t*(.66+at(i,t)*.08),1.4+i*.04,(at(t,i)-.5)*.1],.015,.005,s.STRAW,{group:4})}for(let t=0;t<5;t++)n.seg([(t-2)*.07,.92,0],[(t-2)*.09,.78-at(t)*.1,.02],.015,.006,s.STRAW,{group:4});n.ell([0,1.78,0],[.15,.17,.14],s.CLOTH,{group:5,paint:t=>t[2]>.1&&Math.abs(t[1]-1.8)<.03&&Math.abs(Math.abs(t[0])-.06)<.03?s.NOSE:Math.abs(t[1]-1.66)<.02?s.BARK2:void 0}),n.ell([0,1.9,0],[.3,.025,.28],s.STRAW,{group:6,rough:.006}),n.ell([0,1.97,0],[.14,.09,.13],s.STRAW,{group:6,paint:t=>Math.abs(t[1]-1.93)<.02?s.ACCENT:void 0});const e=[.5,1.6,.02];n.ell(e,[.1,.06,.05],s.NOSE,{group:7,dir:[1,.3,0]}),n.ell(y.add(e,[.09,.06,0]),[.045,.045,.04],s.NOSE,{group:7}),n.seg(y.add(e,[.12,.06,0]),y.add(e,[.18,.04,0]),.012,.003,s.STONED,{group:7}),n.seg(y.add(e,[-.06,0,0]),y.add(e,[-.18,-.04,0]),.03,.01,s.NOSE,{group:7}),Ge(n,8,.8,8,15)}},"milk-churn":{desc:"an old milk churn, dented, moss on its shoulder",build(n){Kn(n,[0,0,0],[0,.52,0],.2,s.FRAME,1,{paint:e=>Math.abs(e[1]-.08)<.02||Math.abs(e[1]-.45)<.02?s.STONED:it(.3,.1)(e)}),n.seg([0,.52,0],[0,.7,0],.2,.1,s.FRAME,{group:1,paint:e=>Ie(e,8,2)<.4?s.MOSS:it(.3,0)(e)}),Kn(n,[0,.68,0],[0,.8,0],.1,s.FRAME,1),Kn(n,[0,.79,0],[0,.84,0],.125,s.FRAME,2,{paint:it(.5,0)});for(const e of[-1,1])st(n,[e*.16,.62,0],[e*.2,.7,0],3,.015)}},wheelbarrow:{desc:"a rusted wheelbarrow, a flat tyre, a fern growing in its tray",build(n){const e=Sn(n);n.box([0,.42,0],[.45,.16,.3],s.HAT1,{round:.06,group:1,paint:it(.6,.15)}),n.box([0,.55,0],[.41,.15,.26],s.BODY2,{round:.05,group:1,cut:!0}),Or(n,[.62,.17,0],.17,.05,2,!0);for(const t of[-.12,.12])st(n,[.62,.17,t],[-.2,.3,t*2],3,.02);for(const t of[-.24,.24])st(n,[.3,.3,t*.8],[-.95,.5,t*1.15],4,.022),st(n,[-.35,.3,t],[-.4,0,t],4,.02);En(n,e,{pitch:-.05}),cr(n,[0,.35,0],6,.75),Ge(n,8,1,7,16)}},plough:{desc:"a horse plough left in the grass, its shares rusted, bindweed over it",build(n){st(n,[-1,.62,0],[.9,.26,0],1,.045,s.FRAME,it(.7,.1));for(const[e,t]of[[-.4,-.08],[.15,.08],[.65,.02]])st(n,[e,.52-e*.2,t],[e+.1,.18,t],2,.03,s.FRAME,it(.7,0)),n.ell([e+.18,.16,t+.1],[.22,.13,.03],s.BODY2,{dir:[1,-.2,.7],group:3,paint:i=>Ie(i,14)<.3?s.BODY3:void 0});Or(n,[1.05,.22,0],.22,.04,4);for(const e of[-.18,.18])st(n,[-.9,.6,0],[-1.45,.9,e],5,.025,s.WOOD,St());qn(n,[-.6,0,.2],[.5,.4,.1],6,17),Ge(n,12,1.5,7,18)}}};function lu(n,e){n.box([0,.18,0],[.12,.18,.12],s.HAT2,{round:.04,group:1,paint:it(.4,.2)}),n.seg([0,.3,0],[0,3.3,0],.07,.05,s.HAT2,{group:1,paint:it(.4,.05)}),n.chain([[0,3.3,0,.05],[.12,3.5,0,.045],[.45,3.58,0,.04],[.68,3.55,0,.035]],s.HAT2,{group:2,paint:it(.4,0)}),n.box([.74,3.5,0],[.22,.05,.14],s.HAT2,{round:.04,group:3,paint:it(.5,.3)}),n.ell([.74,3.42,0],[.17,.07,.11],e?s.GLOW:s.SHADES,{group:3}),e&&fM(n,[.74,3.38,0],.07,4,s.MAGIC2),qn(n,[0,0,.07],[.02,2.1,.06],5,e?19:20),qn(n,[-.06,0,0],[-.05,1.3,.04],6,21),Ge(n,8,.8,7,22)}const Eo=(n,e,t,i,r,a,o={})=>{const l=Sn(n);st(n,[0,0,0],[0,1.55,0],a,.03,s.FRAME,it(.4,.1)),n.flat([0,1.55+i*.7,.04],[1,0,0],[0,1,0],t,i,e,{group:a+1,bend:.05}),n.box([0,1.55+i*.7,.02],[t*.6,i*.6,.012],s.FRAME,{group:a+2,round:.01}),En(n,l,{at:r,...o})},gM={lamppost:{desc:"a street lamp still standing, dark, ivy up its post",split:2.2,build(n){lu(n,!1)}},"lamppost-lit":{desc:"a street lamp still standing, its lamp flickering warm after all these years",glow:!0,split:2.2,build(n){lu(n,!0)}},"sign-blank":{desc:"a road sign leaning, its plate weathered blank",build(n){Eo(n,(e,t)=>Math.abs(e)>.88||Math.abs(t)>.82?s.BELLY:Ie([e*3,t*3,0],4)<.2?s.STONED:s.HAT1,.45,.32,[0,0,0],1,{roll:.22,yaw:-.15}),Ge(n,8,.8,5,23)}},"sign-triangle":{desc:"a warning sign leaning, a leaping deer on it (no words)",build(n){Eo(n,mM(s.ACCENT,s.BELLY,(e,t)=>{const i=((e-.02)/.3)**2+((t+.38)/.09)**2<1,r=Math.hypot(e-.3,t+.22)<.07,a=(Math.abs(e+.2+(t+.5)*.5)<.03||Math.abs(e-.2-(t+.5)*.4)<.03)&&t<-.4&&t>-.62,o=Math.abs(e-.32+(t+.1)*.3)<.025&&t>-.18&&t<-.02;return i||r||a||o}),.38,.36,[0,0,0],1,{roll:-.18,pitch:.1}),Ge(n,8,.8,5,24)}},"sign-round":{desc:"a round sign bent on its pole, a plain white arrow on blue",build(n){Eo(n,(e,t)=>{const i=Math.hypot(e,t);return i>1?null:i>.88||Math.abs(t)<.13&&e>-.55&&e<.2||e>=.1&&e<.55&&Math.abs(t)<.5-(e-.1)*1.1?s.BELLY:Ie([e*3,t*3,0],5)<.15?s.STONED:s.HAT1},.3,.3,[0,0,0],1,{roll:.12,pitch:-.3}),Ge(n,8,.8,5,25)}},bench:{desc:"a park bench, cast-iron ends and rotting slats, one slat gone, moss on its seat",build(n){for(const e of[-.8,.8])n.box([e,.23,0],[.04,.23,.22],s.FRAME,{round:.02,group:1,paint:it(.5,.05)}),n.box([e,.55,-.2],[.04,.28,.04],s.FRAME,{round:.02,group:1,dir:[0,1,-.25],paint:it(.5,0)}),n.box([e,.52,.1],[.04,.03,.17],s.FRAME,{round:.015,group:1});for(const e of[-.15,0,.15])e!==0&&n.box([0,.46,e],[.88,.025,.06],s.WOOD,{round:.015,group:2,paint:St(7,.4)});for(const e of[.62,.76])n.box([0,e,-.22-(e-.62)*.25],[.88,.045,.02],s.WOOD,{round:.012,group:3,dir:[1,0,0],up:[0,1,-.25],paint:St(7,.3)});n.box([.45,.2,.2],[.4,.02,.05],s.WOOD,{dir:[1,-.6,.3],round:.012,group:4,paint:St(7,.5)}),Ge(n,12,1.2,5,26)}},"bin-bags":{desc:"a heap of bin bags, long faded and split, moss creeping over them",build(n){[[-.35,.22,-.1,.3],[.25,.2,-.2,.28],[0,.24,.25,.3],[-.05,.5,-.05,.26],[.5,.16,.25,.22],[-.6,.15,.3,.2]].forEach(([t,i,r,a],o)=>{n.ell([t,i,r],[a*1.1,a*.9,a],s.JACKET,{group:1+o,rough:.015,paint:l=>Ie(l,7,o)<.18?s.MOSS:Ie(l,16,o+3)>.93?s.STONED:void 0}),n.ell([t+.05,i+a*.9,r],[.06,.07,.05],s.JACKET,{group:1+o})});for(let t=0;t<6;t++)n.box([.8+at(t)*.5,.02,-.1+at(t,2)*.5],[.06,.015,.04],t%2?s.BELLY:s.CLOTH,{dir:[at(t,3)-.5,0,at(t,4)-.5],group:8+t});Ge(n,10,1.2,15,27)}},"bus-shelter":{desc:"a bus shelter, most of its glass gone, ivy over its roof, a bench inside",split:1.7,build(n){for(const[e,t]of[[-1.15,-.5],[1.15,-.5],[-1.15,.45],[1.15,.45]])st(n,[e,0,t],[e,1.85-t*.1,t],1,.035);n.box([0,1.9,-.02],[1.25,.04,.6],s.FRAME,{dir:[1,0,0],up:[0,1,.12],round:.02,group:2,paint:e=>Ie(e,4,6)<.45&&e[1]>1.9?s.MOSS:it(.5,.1)(e)}),n.flat([0,.98,-.5],[1,0,0],[0,1,0],1.12,.82,ou(4,2,1,.45),{group:3,bend:.02}),n.flat([1.15,.98,-.02],[0,0,1],[0,1,0],.45,.82,ou(2,2,3,.55),{group:4,bend:.02}),n.box([0,.45,-.38],[.9,.03,.1],s.FRAME,{round:.02,group:5});for(const e of[-.8,.8])st(n,[e,0,-.38],[e,.44,-.38],5,.02);qn(n,[-1.15,0,.46],[-.6,1.95,.3],6,28),qn(n,[-.5,1.95,.5],[.6,1.95,.1],7,29),n.ell([-.3,1.98,0],[.7,.1,.45],s.LEAF,{group:8,rough:.03,paint:e=>Ie(e,9)<.3?s.LEAF3:void 0}),Ge(n,14,1.8,9,30)}},"bus-stop-sign":{desc:"a bus stop pole, its plate a blank disc, a timetable case long empty",split:1.6,build(n){st(n,[0,0,0],[0,2.3,0],1,.035,s.FRAME,it(.4,.1)),n.flat([0,2.4,.04],[1,0,0],[0,1,0],.24,.24,(e,t)=>{const i=Math.hypot(e,t);return i>1?null:i>.8||i<.5&&Math.abs(t)<.15?s.HAT1:s.BELLY},{group:2,bend:.05}),n.box([0,1.45,.06],[.16,.22,.03],s.FRAME,{round:.02,group:3,paint:e=>e[2]>.07&&Math.abs(e[0])<.12&&Math.abs(e[1]-1.45)<.18?s.SHADES:it(.5,.2)(e)}),qn(n,[0,0,.04],[.02,1.2,.04],4,31),Ge(n,6,.6,5,32)}},"litter-bin":{desc:"a litter bin on its post, rusted through, a bag spilling out",build(n){st(n,[0,0,-.2],[0,1,-.2],1,.03,s.FRAME),Kn(n,[0,.45,0],[0,.95,0],.19,s.HAT2,2,{paint:e=>(Math.atan2(e[2],e[0])*4%1+1)%1<.12?s.LEAF3:it(.5,.2)(e),end:s.NOSE}),n.ell([.12,.98,.08],[.14,.1,.12],s.JACKET,{group:3}),Ge(n,6,.6,4,33)}},"car-parked":{desc:"a car still parked where it was left, tyres flat, moss on its roof",build(n){xs(n,1,{flat:!0}),n.ell([-.25,1.22,0],[.55,.05,.4],s.MOSS,{group:4,rough:.02}),_h(n,[0,0,0],[1.9,.14,1],5),cr(n,[1.4,.05,.8],6),Ge(n,14,2.2,7,34)}}},xM={"picnic-table":{desc:"a picnic table, its planks soft with rot, bracket fungus on its legs",build(n){for(const e of[-.12,0,.12])n.box([0,.6,e*2],[.78,.025,.11],s.WOOD,{round:.012,group:1,paint:St(7,.3)});for(const e of[-.5,.5])n.box([0,.36,e],[.78,.025,.11],s.WOOD,{round:.012,group:2,paint:St(7,.3)});for(const e of[-.6,.6])for(const t of[-1,1])n.box([e,.3,t*.22],[.03,.32,.04],s.WOOD,{dir:[0,1,-t*.75],round:.012,group:3,paint:St()}),n.box([e,.34,0],[.03,.03,.6],s.WOOD,{round:.01,group:3});for(const[e,t,i]of[[-.6,.25,.2],[-.6,.17,.25],[.6,.4,-.15]])n.ell([e+.04,t,i],[.07,.02,.06],s.EAR,{group:4});Ge(n,12,1.3,5,35)}},"picnic-blanket":{desc:"a picnic blanket on the ground, its check faded, mushrooms grown up through it, plates and a bottle",build(n){n.box([0,.02,0],[.62,.015,.5],s.CLOTH,{round:.01,rough:.01,group:1,dir:[1,0,.15],paint:e=>Ie(e,6,3)<.15?s.MOSS:(Math.floor((e[0]+5)*6)+Math.floor((e[2]+5)*6))%2?s.ACCENT:void 0});for(const[e,t]of[[-.3,-.15],[.2,.25]])n.ell([e,.04,t],[.11,.015,.1],s.BELLY,{group:2});n.seg([.3,.08,-.2],[.55,.08,-.32],.06,.03,s.HAT2,{group:3}),Ml(n,[-.05,.02,.05],9,4,2,{k:1.4}),Ml(n,[.4,.02,.2],5,6,3),Ge(n,8,1,8,36)}},hamper:{desc:"a wicker hamper, its lid fallen open, ivy through the weave",build(n){n.box([0,.18,0],[.3,.17,.2],s.STRAW,{round:.04,group:1,paint:t=>(Math.floor(t[0]*30)+Math.floor(t[1]*30))%2?s.BARK2:Ie(t,6,2)<.2?s.MOSS:void 0}),n.box([0,.3,0],[.27,.16,.17],s.BARK2,{round:.03,group:1,cut:!0});const e=Sn(n);n.box([0,0,0],[.3,.02,.2],s.STRAW,{round:.02,group:2,paint:t=>(Math.floor(t[0]*30)+Math.floor(t[2]*30))%2?s.BARK2:void 0}),En(n,e,{roll:-1.2,at:[0,.4,-.32]}),n.box([.15,.3,.1],[.12,.02,.08],s.ACCENT,{dir:[1,.5,.5],group:3}),qn(n,[-.3,0,.2],[.1,.32,.2],4,37),Ge(n,6,.7,5,38)}},"fungi-glow":{desc:"a clump of tall pale fungi glowing faintly, grown out of a rotted basket",glow:!0,build(n){for(let e=0;e<7;e++){const t=e*2.4,i=.05+at(e,5)*.18,r=Math.cos(t)*i,a=Math.sin(t)*i,o=.2+at(e,6)*.3;n.seg([r,0,a],[r*1.3,o,a*1.3],.02,.014,s.CLOTH,{group:1+e%2}),n.ell([r*1.3,o+.02,a*1.3],[.07,.035,.07],s.MAGIC,{group:3+e%2,paint:l=>l[1]<o+.01?s.MAGIC2:void 0})}n.ell([0,.05,0],[.28,.06,.24],s.BARK2,{group:6,rough:.02,paint:e=>Ie(e,9)<.4?s.MOSS:void 0}),Ge(n,6,.6,7,39)}},"raised-bed":{desc:"a raised bed bolted to seed: leggy kale gone to flower, a cabbage split",build(n){n.box([0,.14,0],[.8,.14,.4],s.WOOD,{round:.02,group:1,paint:St(7,.3)}),n.box([0,.26,0],[.76,.12,.36],s.BARK2,{round:.02,group:1,cut:!0}),n.box([0,.2,0],[.75,.02,.35],s.BARK2,{group:2});for(let e=0;e<5;e++){const t=-.6+e*.3,i=(at(e,3)-.5)*.3,r=.5+at(e)*.4;n.seg([t,.2,i],[t+.04,r,i],.025,.015,s.LEAF2,{group:3}),n.ell([t+.04,r-.1,i],[.16,.1,.14],s.LEAF,{group:4+e%2,rough:.02,paint:a=>Ie(a,16)<.25?s.LEAF3:void 0});for(let a=0;a<4;a++)n.ell([t+.04+(at(e,a)-.5)*.2,r+.02+at(a,e)*.08,i+(at(a,e+4)-.5)*.15],[.025,.025,.025],s.FLOWER,{group:6})}Ge(n,10,1.3,7,40)}},"bean-wigwam":{desc:"a wigwam of bean canes buried in runner-bean vines, red flowers in it",split:1.4,build(n){const e=[0,1.75,0];for(let t=0;t<6;t++){const i=t/6*6.283;st(n,[Math.cos(i)*.42,0,Math.sin(i)*.42],y.add(e,[Math.cos(i)*.04,.1,Math.sin(i)*.04]),1,.015,s.STRAW,void 0)}for(let t=0;t<3;t++){const i=[];for(let r=0;r<=12;r++){const a=r/12,o=a*9+t*2.1,l=.42*(1-a*.92);i.push([Math.cos(o)*l,a*1.7,Math.sin(o)*l,.05*(1-a*.6)])}n.chain(i,s.LEAF,{group:2+t,rough:.02,paint:r=>Ie(r,22,t)<.08?s.ACCENT:Ie(r,12)<.3?s.LEAF3:void 0})}Ge(n,8,.8,6,41)}},"garden-shed":{desc:"a garden shed, its door hanging open, its felt roof furred with moss, a window gone",split:1.6,build(n){n.box([0,.7,0],[.7,.7,.55],s.WOOD,{round:.02,group:1,paint:e=>e[2]>.5&&Math.abs(e[0]+.3)<.22&&Math.abs(e[1]-.95)<.18?s.SHADES:e[2]>.5&&e[0]>.05&&e[0]<.6&&e[1]<1.25?s.NOSE:Math.abs(Math.sin(e[0]*30))>.96||Math.abs(Math.sin(e[2]*30))>.96?s.BARK2:Ie(e,6,4)<.12?s.MOSS:void 0});for(const e of[-1,1])n.box([0,1.58,e*.32],[.78,.03,.38],s.JACKET,{dir:[1,0,0],up:[0,1,e*.9],round:.01,group:2+(e>0?1:0),paint:t=>Ie(t,5,2)<.6?s.MOSS:Ie(t,12)<.2?s.LEAF2:void 0});n.box([.62,.62,.78],[.25,.58,.02],s.WOOD,{dir:[1,0,.9],round:.01,group:4,paint:St(7,.2)}),qn(n,[-.7,0,.55],[-.55,1.5,.5],5,42),qn(n,[.7,0,-.3],[.68,1.3,.2],6,43),cr(n,[-.9,.05,.6],7),Ge(n,12,1.4,8,44)}},"compost-heap":{desc:"a slatted compost bay, a marrow vine sprawling out of it, its fruit swollen",build(n){for(const e of[-1,1])n.box([e*.5,.32,0],[.03,.32,.45],s.WOOD,{round:.01,group:1,paint:t=>t[1]*9%1<.2?s.NOSE:St(7,.3)(t)});n.box([0,.32,-.45],[.5,.32,.03],s.WOOD,{round:.01,group:1,paint:e=>e[1]*9%1<.2?s.NOSE:St(7,.3)(e)}),n.ell([0,.35,0],[.48,.3,.44],s.BARK2,{group:2,rough:.03,paint:e=>Ie(e,12)<.25?s.LEAF3:Ie(e,9,3)<.15?s.STRAW:void 0}),n.chain([[0,.6,0,.03],[.4,.5,.4,.03],[.8,.1,.5,.025],[1.2,.05,.2,.02]],s.LEAF2,{group:3});for(const[e,t,i]of[[.85,.45,.14],[1.15,.1,.11]])n.ell([e,i*.9,t],[i*1.4,i,i],s.POM,{group:4,dir:[1,0,.4],paint:r=>(Math.atan2(r[2]-t,r[1]-i)*3%1+1)%1<.15?s.BODY2:void 0});for(let e=0;e<4;e++)n.ell([.3+e*.25,.15,.45-e*.08],[.14,.03,.12],s.LEAF,{group:5+e%2});Ge(n,8,1.2,7,45)}},"watering-can":{desc:"a watering can on its side, its rose gone",build(n){const e=Sn(n);Kn(n,[0,0,0],[0,.32,0],.14,s.HAT2,1,{paint:it(.3,.2)}),st(n,[.1,.1,0],[.38,.36,0],2,.025,s.HAT2,it(.3,0)),st(n,[-.12,.3,0],[-.05,.4,0],3,.015,s.HAT2),En(n,e,{roll:1.5,yaw:.4,at:[0,.14,0]}),Ge(n,5,.5,4,46)}},"snack-van":{desc:"a roadside snack trailer, its hatch propped open on nothing, shutters rusted down (no signs)",split:1.6,build(n){n.box([0,.95,0],[1,.6,.6],s.BELLY,{round:.1,group:1,paint:e=>e[2]>.55&&Math.abs(e[0]-.05)<.6&&Math.abs(e[1]-1.05)<.25?e[1]*18%1<.3?s.STONED:s.FRAME:it(.15,.08)(e)}),n.box([.05,1.42,.7],[.62,.02,.18],s.BELLY,{dir:[1,0,0],up:[0,1,-.6],round:.01,group:2,paint:it(.4,.3)}),st(n,[-.5,1.3,.62],[-.5,1.5,.8],2,.012),n.box([.05,.82,.66],[.6,.025,.08],s.FRAME,{round:.01,group:3,paint:it(.4,.2)});for(const e of[-.6,.6])Or(n,[0,.28,e],.28,.09,4,!0);st(n,[1,.45,0],[1.6,.38,0],5,.035),st(n,[1.55,.4,0],[1.55,0,0],5,.03),qn(n,[-1,0,.6],[-.7,1.4,.62],6,47),Ge(n,12,1.8,7,48)}},"tent-frame":{desc:"a dome tent's bent poles, a few rags of its fabric still caught on them",split:1.2,build(n){for(const e of[.6,-.6]){const t=[];for(let i=0;i<=10;i++){const r=i/10*Math.PI,a=.85;t.push([Math.cos(r)*a*Math.cos(e),Math.sin(r)*.95+(i===6?-.08:0),Math.cos(r)*a*Math.sin(e),.02])}n.chain(t,s.FRAME,{group:1})}for(const[e,t,i,r,a,o]of[[[-.4,.6,.3],[1,.3,0],[.4,-1,.3],.28,.25,s.HAT1],[[.35,.75,-.3],[1,-.2,0],[0,-.6,-1],.3,.22,s.ACCENT],[[.05,.9,0],[1,0,0],[0,.2,1],.2,.25,s.HAT1]])n.flat(e,t,i,r,a,(l,u)=>u<-1+.4*Math.abs(Math.sin(l*7))+.3*at(Math.floor(l*5))?null:o,{group:2,bend:.2});for(const[e,t]of[[-.85,.2],[.85,-.2]])st(n,[e,.02,t],[e*1.4,0,t*1.6],3,.006,s.CLOTH,void 0);Ge(n,12,1.3,4,49)}},bunting:{desc:"a string of faded bunting sagging between two poles, one pole leaning",split:1.4,build(n){st(n,[-1.3,0,0],[-1.3,2,0],1,.03,s.WOOD,St()),st(n,[1.3,0,0],[1.05,1.75,.15],1,.03,s.WOOD,St());const e=r=>[-1.3+r*2.35,1.95-Math.sin(r*Math.PI)*.55-r*.2,r*.15],t=[s.ACCENT,s.HAT1,s.POM,s.HAT2,s.TOP],i=[];for(let r=0;r<=12;r++)i.push([...e(r/12),.01]);n.chain(i,s.CLOTH,{group:2});for(let r=1;r<12;r++){if(at(r,7)<.2)continue;const a=e(r/12);n.flat(y.add(a,[0,-.11,0]),[1,0,.1],[0,1,0],.08,.11,(o,l)=>Math.abs(o)<(l+1)/2?t[r%5]:null,{group:3,bend:.1})}Ge(n,10,1.6,4,50)}},"fire-pit":{desc:"a cold fire pit: a ring of stones, charred logs, grey ash",build(n){for(let e=0;e<9;e++){const t=e/9*6.283;n.ell([Math.cos(t)*.5,.08,Math.sin(t)*.42],[.12,.09+at(e)*.04,.1],s.STONE,{group:1+e%3,rough:.02,paint:i=>Ie(i,9,e)<.25?s.MOSS:i[1]>.1&&Ie(i,14)<.3?s.STONED:void 0})}n.ell([0,.02,0],[.38,.025,.32],s.STONED,{group:5,paint:e=>Ie(e,18)<.3?s.CLOTH:void 0});for(const[e,t]of[[[-.25,.05,-.1],[.25,.12,.08]],[[-.1,.05,.2],[.2,.1,-.18]]])n.seg(e,t,.05,.04,s.BARKD,{group:6,paint:i=>Ie(i,20)<.4?s.NOSE:void 0});Ge(n,8,1,7,51)}},crates:{desc:"a stack of slatted crates, one fallen and split",build(n){const e=(i,r)=>n.box(i,[.25,.18,.2],s.WOOD,{round:.015,group:r,paint:a=>(a[1]-i[1]+1)*9%1<.22&&Math.abs(a[1]-i[1])<.15?s.NOSE:St(7,.25)(a)});e([0,.18,0],1),e([.5,.18,.1],2),e([.2,.54,.02],3);const t=Sn(n);e([0,0,0],4),En(n,t,{roll:.9,yaw:.5,at:[-.5,.2,.35]}),Ge(n,8,1,6,52)}},"glow-sticks":{desc:"glow sticks scattered in the grass, somehow still glowing",glow:!0,build(n){for(let e=0;e<7;e++){const t=(at(e)-.5)*1,i=(at(e,2)-.5)*.7,r=at(e,3)*6.283;n.seg([t,.02,i],[t+Math.cos(r)*.12,.03,i+Math.sin(r)*.12],.014,.014,e%3?s.MAGIC:s.COLLAR,{group:1+e})}st(n,[.2,.25,-.1],[.2,.02,-.1],9,.012,s.MAGIC2,void 0),Ge(n,10,.8,10,53)}},"camp-chair":{desc:"a folding camp chair tipped over, its fabric sagging",build(n){const e=Sn(n);for(const t of[-1,1])st(n,[-.2,0,t*.22],[.2,.45,t*.22],1,.015),st(n,[.2,0,t*.22],[-.2,.45,t*.22],1,.015),st(n,[-.22,.45,t*.22],[-.3,.85,t*.22],1,.015);n.box([0,.42,0],[.22,.02,.22],s.HAT1,{round:.01,group:2,paint:it(0,.2)}),n.box([-.27,.65,0],[.02,.2,.22],s.HAT1,{dir:[0,1,0],up:[1,.2,0],round:.01,group:2}),En(n,e,{roll:1.4,yaw:.3,at:[0,.22,0]}),Ge(n,6,.7,4,54)}},"log-pile":{desc:"a woodpile of cut logs, ends to the viewer, moss on the top ones",build(n){let e=1;for(let t=0;t<3;t++)for(let i=0;i<4-t;i++){const r=(i-(3-t)/2)*.38,a=.17+t*.3;su(n,[r,a,-.5],[r,a,.5],.17+at(i,t)*.02,e++)}Ge(n,10,1.3,20,55)}},"chopping-block":{desc:"a chopping block with an axe left in it, chips in the grass",build(n){Kn(n,[0,0,0],[0,.45,0],.26,s.TRUNK,1,{paint:e=>Ie(e,14,2)<.15?s.BARKD:Ie(e,5,3)<.15?s.MOSS:void 0,end:xl([0,.45,0],1)}),st(n,[.02,.45,.05],[-.35,.95,.2],2,.025,s.WOOD,void 0),n.box([.04,.47,.04],[.1,.06,.02],s.FRAME,{dir:[1,-.5,0],up:[0,1,0],round:.01,group:3,paint:it(.5,0)});for(let e=0;e<8;e++)n.box([(at(e)-.5)*1,.015,(at(e,2)-.5)*.8],[.05,.012,.025],s.STRAW,{dir:[at(e,3)-.5,0,at(e,4)-.5],group:4+e%2});Ge(n,8,.9,6,56)}},sawhorse:{desc:"a sawhorse with a log still across it, a bow saw hung on it",build(n){for(const e of[-.4,.4])for(const t of[-1,1])st(n,[e,0,t*.3],[e,.62,-t*.1],1,.03,s.WOOD,St());st(n,[-.4,.3,0],[.4,.3,0],1,.025,s.WOOD,St()),su(n,[-.8,.7,0],[.7,.72,0],.14,2),st(n,[-.25,.55,.22],[.25,.55,.22],3,.01,s.FRAME,void 0),n.chain([[-.25,.55,.22,.015],[-.2,.35,.22,.015],[.2,.35,.22,.015],[.25,.55,.22,.015]],s.ACCENT,{group:3,paint:it(.5,0)}),Ge(n,8,1,5,57)}},stumps:{desc:"two sawn stumps, bracket fungus on one",build(n){for(const[e,t,i,r,a]of[[-.3,-.1,.3,.32,1],[.45,.25,.22,.22,3]]){Kn(n,[e,0,t],[e,r,t],i,s.TRUNK,a,{paint:o=>Ie(o,14,2)<.15?s.BARKD:Ie(o,5,3)<.2?s.MOSS:void 0,end:xl([e,r,t],1)});for(let o=0;o<4;o++){const l=o*1.6;n.ell([e+Math.cos(l)*(i+.1),.05,t+Math.sin(l)*(i+.1)],[.12,.06,.1],s.TRUNK,{group:a+1,dir:[Math.cos(l),-.3,Math.sin(l)]})}}for(const e of[.12,.2])n.ell([-.05,e,.12],[.1,.02,.08],s.EAR,{group:5});Ge(n,8,1,6,58)}},mattress:{desc:"a mattress dumped in the bracken, stained and sprung, a fern through it",build(n){const e=Sn(n);n.box([0,0,0],[.75,.1,.5],s.BELLY,{round:.07,group:1,rough:.01,paint:t=>Ie(t,4,2)<.3?s.STRAW:Ie(t,6,3)<.15?s.MOSS:Math.abs(Math.sin(t[0]*20))>.93?s.CLOTH:void 0}),En(n,e,{roll:.2,pitch:.1,at:[0,.15,0]});for(let t=0;t<3;t++)n.chain([[-.3+t*.25,.26,.1,.012],[-.28+t*.25,.34,.12,.012],[-.3+t*.25,.38,.1,.01]],s.FRAME,{group:3});cr(n,[.4,.2,.1],4,.8),Ge(n,10,1.2,5,59)}},"tyre-pile":{desc:"a pile of old tyres, one rolled away, rainwater and moss in them",build(n){for(let t=0;t<4;t++)So(n,[(at(t)-.5)*.06,.1+t*.2,(at(t,2)-.5)*.06],1+t);So(n,[.65,.1,.3],6);const e=Sn(n);So(n,[0,0,0],8),En(n,e,{roll:1.4,yaw:.9,at:[-.6,.3,.35]}),Ge(n,10,1.1,10,60)}},beehive:{desc:"a white-painted beehive, its boxes askew, its roof slid off, comb in the grass",build(n){n.box([0,.15,0],[.3,.15,.3],s.WOOD,{round:.01,group:1});for(const[t,i,r]of[[.45,0,2],[.75,.04,3],[1.02,-.05,4]])n.box([i,t,0],[.3,.13,.3],s.BELLY,{dir:[1,0,i*3],round:.015,group:r,paint:a=>Math.abs(a[1]-t+.1)<.015&&a[2]>.28&&Math.abs(a[0]-i)<.15?s.NOSE:Ie(a,6,r)<.18?s.MOSS:Ie(a,15)>.9?s.STONED:void 0});const e=Sn(n);n.box([0,0,0],[.36,.05,.36],s.FRAME,{round:.02,group:5,paint:it(.4,.3)}),En(n,e,{roll:.5,yaw:.3,at:[.5,.2,.35]}),n.box([-.5,.04,.3],[.18,.025,.1],s.STRAW,{group:6,dir:[1,0,.5],paint:t=>Ie(t,30)<.5?s.BODY2:void 0}),Ge(n,10,1,7,61)}}},MM=[...Object.entries(vh).map(([n,e])=>({id:n,family:"farm",size:1,split:null,...e})),...Object.entries(gM).map(([n,e])=>({id:n,family:"street",size:1,split:null,...e})),...Object.entries(xM).map(([n,e])=>({id:n,family:"scene",size:1,split:null,...e}))];Object.fromEntries(MM.map(n=>[n.id,n]));const _M={"farmyard-corner":{desc:"an abandoned farmyard corner: the tractor sunk in moss, bales gone to mould, a broken fence, a trough, churns and a barrow",suits:["meadow","grassland","honeysuckle-tangle","muddy-forest"],pieces:[["tractor",0,0],["hay-round",2.8,-1.3],["hay-round-mouldy",3.7,.1],["fence",-1.3,-2.5],["fence-broken",1,-2.6],["trough",-2.5,1.2],["milk-churn",1.9,1.8],["milk-churn",2.25,2.1],["milk-churn",1.7,2.35,"left"],["wheelbarrow",-.7,2.3,"left"]]},"bus-stop":{desc:"a bus stop on a road long gone: the shelter, its stop sign, a bench, a lamppost still flickering warm, a heap of bin bags",suits:["grassland","meadow","twiggy-forest","wispy-forest"],pieces:[["bus-shelter",0,0],["bus-stop-sign",1.9,.6],["bench",-2.4,.8],["lamppost-lit",-1.9,-.4],["bin-bags",2.5,-.7],["litter-bin",1.3,1.3]]},"picnic-gone-wild":{desc:"a picnic left behind and gone wild: a rotting table, the blanket with mushrooms through it, a hamper, a clump of glowing fungi",suits:["bluebell-glade","old-oaks","log-pile","meadow"],pieces:[["picnic-table",0,-.7],["picnic-blanket",.5,.9],["hamper",-1.2,.8],["fungi-glow",1.5,.2],["camp-chair",-1.5,-.4,"left"]]},"allotment-feral":{desc:"an allotment gone feral: a shed with its door hanging, beds bolted to seed, a bean wigwam, a compost bay, a scarecrow",suits:["garden","honeysuckle-tangle","meadow"],pieces:[["garden-shed",-1.7,-1.7],["raised-bed",.6,-.9],["raised-bed",.8,.6,"left"],["bean-wigwam",2.5,-.6],["compost-heap",-1.9,1],["watering-can",-.4,1.9],["scarecrow",2.7,1.5]]},"lay-by":{desc:"a lay-by: a car still parked, a snack trailer shuttered, a litter bin, a picnic table, cones and a sign",suits:["grassland","twiggy-forest","norway","wispy-forest"],pieces:[["car-parked",0,0],["snack-van",-3.3,-1.4],["litter-bin",2.2,-.9],["picnic-table",2.7,1],["relic:cones",-1.3,1.7],["sign-round",-3,1.4]]},"festival-remnants":{desc:"festival remnants: tent frames with rags of fabric, faded bunting, a cold fire pit, crates, a camp chair, glow sticks still glowing",suits:["meadow","heath","grassland","bluebell-glade"],pieces:[["bunting",0,-2.3],["tent-frame",-1.6,-.7],["tent-frame",.9,-1.3,"left"],["fire-pit",.4,.6],["crates",-1.9,1.2],["camp-chair",1.7,.1,"left"],["glow-sticks",1.2,1.5]]},"woodcutters-clearing":{desc:"a woodcutter's clearing: a woodpile, a chopping block with the axe left in it, a sawhorse, sawn stumps, a barrow",suits:["log-pile","old-oaks","alder-forest","norway","old-pinewood"],pieces:[["log-pile",-1.4,-1.1],["chopping-block",.4,.2],["sawhorse",1.9,-.9],["stumps",-.9,1.4],["stumps",2.1,1.2,"left"],["wheelbarrow",-2.5,.5]]},"fly-tip":{desc:"a fly-tip in the bracken: a sofa, a washing machine, a mattress, bin bags, a pile of tyres",suits:["fern-forest","muddy-forest","tangly-forest","berry-thicket"],pieces:[["relic:sofa",0,-.6],["relic:washing-machine",1.7,-.7],["mattress",-1.5,.6],["bin-bags",.6,.9],["tyre-pile",2.3,.7]]},apiary:{desc:"an abandoned apiary: hives askew, one roof slid off, a bench and a water butt",suits:["meadow","heath","honeysuckle-tangle","garden"],pieces:[["beehive",-1.1,-.5],["beehive",.2,-.9,"left"],["beehive",1.3,-.2],["bench",-.4,1.2],["water-butt",2.2,1]]},"hay-bales":{desc:"bales left in a field: round bales, one gone black, a slumping stack of square ones",suits:["meadow","grassland","heath","moor"],pieces:[["hay-round",-1.3,0],["hay-round-side",.2,-.9],["hay-round",1.5,.2,"left"],["hay-stack",-.2,1.3],["hay-round-mouldy",2.6,-1.1],["hay-square-mouldy",1.6,1.6]]},"fence-line":{desc:"a run of field fence: whole sections, a broken one, a gate hanging open, one leaning over",suits:["meadow","grassland","moor","heath","honeysuckle-tangle"],pieces:[["fence",-4.3,0],["fence",-2.2,0],["fence-broken",-.1,0],["gate",1.05,0],["fence-leaning",4.3,.05]]},"road-signs":{desc:"where a road forked: signs leaning every way, a dark lamppost, a cone",suits:["grassland","twiggy-forest","wispy-forest","rocky-slope"],pieces:[["sign-triangle",-.8,-.4],["sign-round",.6,-.7],["sign-blank",1.5,.4],["lamppost",-1.7,.3],["relic:cone",.3,.9]]},"scarecrow-field":{desc:"a field going back to forest: a scarecrow still standing guard, a plough in the grass, a mouldy bale, a broken fence",suits:["meadow","grassland","heath"],pieces:[["scarecrow",0,0],["plough",-2.1,.8],["hay-round-mouldy",2.1,-.8],["fence-broken",-.6,-2.1],["trailer",2.8,1.6,"left"]]}},vM=Object.entries(_M).map(([n,e])=>({id:n,size:"small",...e}));Object.fromEntries(vM.map(n=>[n.id,n]));const qi=(n,e=0)=>{const t=Math.sin(n*127.1+e*311.7)*43758.5453;return t-Math.floor(t)},an=(n,e,t=0)=>qi(Math.floor(n[0]*e)+Math.floor(n[2]*e)*57+t,Math.floor(n[1]*e)),ii=(n=.25,e=.15)=>t=>{const i=an(t,16,3);return an(t,6,5)<e&&t[1]>.1?s.MOSS:i>1-n*.7?s.BODY2:void 0},ni=(n,e,t,i,r=.025,a=s.FRAME)=>n.seg(e,t,r,r,a,{group:i,paint:ii(.4,.05)}),cu=(n,e,t,i)=>n.ell(e,t,s.STONE,{group:i,rough:.025,paint:r=>r[1]>e[1]+t[1]*.5&&an(r,5,i)<.6?s.MOSS:an(r,14)>.9?s.STONED:void 0}),ir=(n,e,t,i,r)=>{for(let a=0;a<e;a++){const o=qi(r,a)*6.283,l=t*Math.sqrt(qi(a,r));n.ell([Math.cos(o)*l,.07,Math.sin(o)*l*.7],[.07,.1+qi(a,4)*.08,.07],s.LEAF2,{group:i+a%3,paint:u=>u[1]>.13?s.LEAF:void 0})}},yo=(n,e,t,i)=>n.ell(e,t,s.LEAF,{group:i,rough:.04,paint:r=>{const a=an(r,10,2);return r[1]<e[1]-.15||a<.2?s.LEAF3:a>.8?s.LEAF2:void 0}}),as=(n,e,t,i,r)=>{const a=[];for(let o=0;o<=4;o++)a.push([...y.add(y.lerp(e,t,o/4),[(qi(r,o)-.5)*.12,0,.02]),.03]);n.chain(a,s.LEAF,{group:i,paint:o=>an(o,30)<.3?s.LEAF2:void 0})};function uu(n,e,{pitch:t=0,roll:i=0,at:r=[0,0,0]}={}){const a=(h,f,d,p)=>{const m=Math.cos(f),M=Math.sin(f),x=[...h];return x[d]=h[d]*m-h[p]*M,x[p]=h[d]*M+h[p]*m,x},o=h=>a(a(h,i,1,2),t,0,1),l=h=>a(a(h,-t,0,1),-i,1,2),u=h=>y.add(o(h),r),c=h=>l(y.sub(h,r));for(const h of n.parts.slice(e))if(h.type==="cone"?(h.a=u(h.a),h.b=u(h.b)):(h.c=u(h.c),h.axes=h.axes.map(o)),h.paint){const f=h.paint;h.paint=(d,p)=>f(c(d),p)}}const bM={"verge-post":{family:"prop",path:"tarmac",desc:"a road's verge post, leaning, its band faded",build(n){const e=n.parts.length;n.box([0,.4,0],[.06,.4,.06],s.BELLY,{round:.02,group:1,paint:t=>Math.abs(t[1]-.62)<.06?s.SHADES:ii(.1,.2)(t)}),uu(n,e,{roll:.15,pitch:.1}),ir(n,4,.25,3,1)}},"cats-eye":{family:"prop",path:"tarmac",desc:"a cat's-eye stud in the road (unlit)",build(n){n.box([0,.02,0],[.09,.02,.05],s.SHADES,{round:.01,group:1});for(const e of[-.04,.04])n.ell([e,.04,.03],[.025,.015,.015],s.FRAME,{group:2})}},"stepping-stone":{family:"prop",path:"stepping",desc:"a stepping stone, flat-topped and mossy",build(n){cu(n,[0,.08,0],[.38,.12,.3],1)}},"boardwalk-post":{family:"prop",path:"boardwalk",desc:"a boardwalk's post, standing in the water",build(n){n.seg([0,0,0],[0,.55,0],.06,.055,s.WOOD,{group:1,paint:e=>e[1]<.12?s.MOSS:e[1]>.5?s.BARK2:void 0})}},"sleeper-sapling":{family:"prop",path:"railway",desc:"a sapling grown up between the sleepers",build(n){n.seg([0,0,0],[0,.9,0],.025,.015,s.TRUNK,{group:1}),yo(n,[0,.95,0],[.22,.18,.2],2),ir(n,4,.2,3,2)}},"glow-mushrooms":{family:"prop",path:"magic",glow:!0,desc:"a cluster of softly glowing mushrooms",build(n){for(let e=0;e<4;e++){const t=[(qi(e)-.5)*.3,0,(qi(e,2)-.5)*.2],i=.08+qi(e,3)*.1;n.seg(t,y.add(t,[0,i,0]),.015,.012,s.CLOTH,{group:1}),n.ell(y.add(t,[0,i+.02,0]),[.05,.03,.05],s.MAGIC,{group:2+e,paint:r=>r[1]>t[1]+i+.035?s.MAGIC2:void 0})}}},"fairy-stone":{family:"prop",path:"magic",glow:!0,desc:"a small fairy stone with a glowing rune",build(n){n.box([0,.18,0],[.09,.18,.06],s.STONE,{round:.04,group:1,paint:e=>e[2]>.04&&Math.abs(e[1]-.2)<.07&&Math.abs(e[0])<.025?s.RUNE:e[1]>.32?s.MOSS:void 0})}},"signal-post":{family:"prop",path:"railway",desc:"a rusty old signal post, its arm dropped (unlit)",build(n){ni(n,[0,0,0],[0,2.2,0],1,.04),n.box([.25,2,0],[.25,.05,.02],s.ACCENT,{dir:[1,-.6,0],group:2,paint:e=>e[0]>.38?s.BELLY:ii(.4,0)(e)}),n.ell([0,2.05,.05],[.06,.06,.03],s.SHADES,{group:3}),as(n,[0,0,.04],[.02,1.4,.04],4,3)}},stairs:{family:"piece",path:"stairs",desc:"a short flight of mossy stone stairs, for ruins and hollows",build(n){for(let e=0;e<5;e++)n.box([0,.1+e*.2,-e*.3],[.6,.1+e*.2,.15],s.STONE,{round:.03,rough:.01,group:1+e%2,paint:t=>t[1]>.16+e*.4&&an(t,6,e)<.35?s.MOSS:an(t,14)>.9?s.STONED:void 0});for(const e of[-.7,.7])cu(n,[e,.3,-.6],[.15,.35,.7],5)}},"stairs-turn":{family:"piece",path:"stairs",desc:"stone stairs turning on a landing",build(n){for(let e=0;e<3;e++)n.box([0,.1+e*.2,-e*.3],[.5,.1+e*.2,.15],s.STONE,{round:.03,rough:.01,group:1+e%2,paint:t=>an(t,6,e)<.3&&t[1]>.2+e*.4?s.MOSS:void 0});n.box([0,.35,-1.1],[.55,.35,.5],s.STONE,{round:.03,group:3,paint:e=>an(e,6)<.3&&e[1]>.6?s.MOSS:void 0});for(let e=0;e<3;e++)n.box([.65+e*.3,.8+e*.2,-1.1],[.15,.1+e*.1,.5],s.STONE,{round:.03,group:4+e%2})}},"root-bridge":{family:"piece",path:"roots",desc:"a bridge of gnarled roots over a stream",build(n){n.ell([0,.01,0],[1.4,.015,.6],s.WATER,{group:1});for(let e=0;e<4;e++)n.chain([[-1.8,0,-.4+e*.27,.14],[-.8,.45,-.35+e*.25,.1],[.6,.5,-.3+e*.22,.1],[1.8,0,-.25+e*.2,.13]],s.TRUNK,{group:2+e%2,rough:.015,paint:t=>an(t,12)<.12?s.BARKD:t[1]>.55&&an(t,5)<.3?s.MOSS:void 0});yo(n,[-1.7,.25,-.5],[.3,.2,.25],5)}},footbridge:{family:"piece",path:"bridges",desc:"a little wooden footbridge over a stream",build(n){n.ell([0,.01,0],[1.2,.015,.7],s.WATER,{group:1});for(let e=-6;e<=6;e++){const t=e*.2,i=.35-t*t*.1;n.box([t,i,0],[.09,.03,.5],s.WOOD,{round:.01,group:2+(e&1),paint:r=>an(r,10)<.15?s.MOSS:void 0})}for(const e of[-.5,.5]){for(const t of[-1.1,0,1.1])n.seg([t,.3-t*t*.1,e],[t,.85-t*t*.1,e],.03,.03,s.WOOD,{group:4});n.chain([[-1.1,.85-.121,e,.025],[0,.85,e,.025],[1.1,.85-.121,e,.025]],s.WOOD,{group:4})}}},"rope-bridge":{family:"piece",path:"bridges",desc:"a rope bridge over a stream, planks sagging, one missing",build(n){n.ell([0,.01,0],[1.3,.015,.7],s.WATER,{group:1});for(const e of[-1.6,1.6])for(const t of[-.45,.45])n.seg([e,0,t],[e,1.1,t],.05,.045,s.WOOD,{group:2});for(let e=-7;e<=7;e++){if(e===3)continue;const t=e*.2,i=.55-(1-(t/1.6)**2)*.3;n.box([t,i,0],[.08,.02,.38],s.WOOD,{round:.01,group:3+(e&1)})}for(const e of[-.45,.45])for(const t of[0,1]){const i=[];for(let r=0;r<=8;r++){const a=-1.6+r*.4,o=(t?1.05:.55)-(1-(a/1.6)**2)*(t?.25:.3);i.push([a,o,e,.015])}n.chain(i,s.STRAW,{group:5})}}},"goods-wagon":{family:"landmark",path:"railway",desc:"an abandoned goods wagon tipped on its side (no livery)",build(n){const e=n.parts.length;n.box([0,.75,0],[1.6,.65,.6],s.BODY2,{round:.05,group:1,paint:t=>(t[0]+9)*4%1<.08?s.SHADES:ii(.6,.2)(t)});for(const t of[-1.1,1.1])for(const i of[-.55,.55])n.ell([t,.22,i],[.22,.22,.06],s.SHADES,{group:2,paint:r=>Math.hypot(r[0]-t,r[1]-.22)<.08?s.FRAME:void 0});uu(n,e,{roll:1.4,at:[0,.3,.3]}),ir(n,14,2.2,4,5),as(n,[-1.2,0,1],[-.6,1,1.1],7,6)}},carriage:{family:"landmark",path:"railway",glow:!0,desc:"an old passenger carriage, mossy roof, a tree grown through it, its windows glowing",build(n){n.box([0,.95,0],[2.4,.65,.62],s.HAT1,{round:.08,group:1,paint:e=>Math.abs(e[2])>.58&&e[1]>1&&e[1]<1.35&&(e[0]+9)*1.6%1>.25?an(e,9)<.2?s.SHADES:s.GLOW:ii(.4,.15)(e)}),n.ell([0,1.62,0],[2.4,.14,.62],s.MOSS,{group:2,paint:e=>an(e,6)<.3?s.LEAF2:void 0});for(const e of[-1.8,1.8])for(const t of[-.5,.5])n.ell([e,.25,t],[.24,.24,.06],s.SHADES,{group:3});n.chain([[.6,0,0,.2],[.6,1.8,0,.16],[.7,2.9,-.1,.09]],s.TRUNK,{group:4,rough:.015}),yo(n,[.7,3.1,-.1],[1,.6,.8],5),ir(n,16,2.8,6,7)}},platform:{family:"landmark",path:"railway",desc:"a little station platform, a bench and a lamp post (no name board)",build(n){n.box([0,.35,0],[2.4,.35,.7],s.STONE,{round:.02,rough:.008,group:1,paint:e=>e[2]>.62&&e[1]>.6?s.BELLY:e[1]>.66&&an(e,5)<.25?s.MOSS:(e[0]+9)*2.5%1<.06?s.STONED:void 0}),n.box([-.6,.95,-.3],[.6,.04,.16],s.WOOD,{group:2}),n.box([-.6,1.2,-.44],[.6,.18,.03],s.WOOD,{group:2});for(const e of[-1.1,-.1])n.box([e,.82,-.3],[.04,.12,.14],s.FRAME,{group:2});ni(n,[1.4,.7,-.4],[1.4,2.4,-.4],3,.035),n.box([1.4,2.5,-.4],[.12,.12,.12],s.FRAME,{round:.03,group:4,paint:e=>Math.abs(e[1]-2.5)<.07?s.SHADES:void 0}),as(n,[1.4,.7,-.36],[1.42,2.2,-.36],5,8),ir(n,10,2.4,6,9)}},"level-crossing":{family:"landmark",path:"railway",desc:"a level crossing's barrier post, its boom broken off and lying in the grass",build(n){n.box([0,.55,0],[.15,.55,.15],s.BELLY,{round:.03,group:1,paint:ii(.3,.15)}),n.box([.6,1.05,0],[.6,.05,.04],s.BELLY,{group:2,paint:e=>(e[0]+9)*2.5%1<.5?s.ACCENT:ii(.3,0)(e)}),n.box([1.6,.05,.4],[.7,.05,.04],s.BELLY,{dir:[1,0,.5],group:3,paint:e=>(e[0]+9)*2.5%1<.5?s.ACCENT:ii(.3,.15)(e)}),ni(n,[-.5,0,0],[-.5,1.6,0],4,.03);for(const e of[-1,1])n.box([-.5,1.6,0],[.35,.04,.015],s.BELLY,{dir:[1,e,0],group:5});ir(n,10,1.6,6,10)}},"buffer-stop":{family:"landmark",path:"railway",desc:"a buffer stop at the end of the line: a timber beam on rusty posts, its buffers worn, grass round its short stub of track",build(n){for(const e of[-.45,.45])ni(n,[-.2,0,e],[0,.75,e],1,.05),ni(n,[.35,0,e],[0,.7,e],1,.04),n.seg([0,.62,e],[.22,.62,e],.07,.07,s.FRAME,{group:2,paint:ii(.5,0)}),n.ell([.25,.62,e],[.03,.1,.1],s.SHADES,{group:2});n.box([0,.7,0],[.08,.1,.75],s.ACCENT,{round:.02,group:3,paint:e=>(e[2]+9)*4%1<.5?s.BELLY:ii(.4,.1)(e)});for(const e of[-.3,.3])n.seg([.2,.03,e],[2,.03,e],.03,.03,s.SHADES,{group:4,paint:t=>t[1]>.05?s.FRAME:void 0});for(let e=0;e<4;e++)n.box([.5+e*.45,.02,0],[.07,.02,.45],s.WOOD,{group:5,paint:t=>an(t,9)<.3?s.MOSS:void 0});ir(n,12,1.4,6,12)}},"signal-gantry":{family:"landmark",path:"railway",desc:"a rusty signal gantry spanning the line, its signals dark",build(n){for(const e of[-2,2])for(const t of[-.15,.15])ni(n,[e,0,t],[e,3,t],1,.04);for(let e=0;e<8;e++){const t=-2+e*.5;ni(n,[t,2.8,0],[t+.5,3.1,0],2,.02),ni(n,[t,3.1,0],[t+.5,2.8,0],2,.02)}for(const e of[2.8,3.1])ni(n,[-2,e,0],[2,e,0],3,.035);for(const e of[-.8,.8])ni(n,[e,2.8,.05],[e,2.3,.05],4,.02),n.box([e,2.2,.08],[.12,.2,.05],s.SHADES,{round:.03,group:5,paint:t=>Math.hypot(t[0]-e,t[1]-2.27)<.05||Math.hypot(t[0]-e,t[1]-2.13)<.05?s.FRAME:void 0});as(n,[-2,0,.2],[-1.95,2.4,.2],6,11)}}},SM=Object.entries(bM).map(([n,e])=>({id:n,...e}));Object.fromEntries(SM.map(n=>[n.id,n]));const ma=32,hu=15,du=ma/2,EM=(n,e)=>(n+.5-du)**2+(e+.5-du)**2<=hu*hu;Uint8Array.from({length:ma*ma},(n,e)=>EM(e%ma,e/ma|0)?1:0);const yM=[{k:"ambientHue",g:"Night light",label:"Twilight hue",min:0,max:1,step:.01,v:.68,hue:!0},{k:"ambient",g:"Night light",label:"Twilight brightness",min:.05,max:.6,step:.01,v:.22},{k:"moon",g:"Night light",label:"Moonlight",min:0,max:1,step:.01,v:.3},{k:"moonHue",g:"Night light",label:"Moon hue",min:0,max:1,step:.01,v:.58,hue:!0},{k:"glowHue",g:"Night light",label:"Witch glow hue",min:0,max:1,step:.01,v:.13,hue:!0},{k:"glowSat",g:"Night light",label:"Witch glow colour",min:0,max:1,step:.01,v:.35},{k:"glowRadius",g:"Night light",label:"Witch glow reach",min:30,max:200,step:5,v:110},{k:"glowPower",g:"Night light",label:"Witch glow strength",min:.3,max:2.5,step:.05,v:1.4},{k:"bands",g:"Shading",label:"Light steps",min:2,max:7,step:1,v:3},{k:"dither",g:"Shading",label:"Dithering",min:0,max:1,step:.05,v:.35},{k:"round",g:"Shading",label:"Roundness",min:.2,max:1.5,step:.05,v:.9},{k:"outline",g:"Shading",label:"Plant outline",options:["none","dark","tinted"],v:"none"},{k:"cOutline",g:"Shading",label:"Creature outline",options:["dark","tinted","none"],v:"dark"},{k:"shafts",g:"Night light",label:"Moonbeams",min:0,max:1,step:.05,v:.3},{k:"areaContrast",g:"Colour",label:"Difference between areas",min:0,max:1,step:.05,v:.6},{k:"sat",g:"Colour",label:"Saturation",min:.2,max:1.3,step:.01,v:.9},{k:"leafHue",g:"Colour",label:"Leaf hue",min:0,max:1,step:.01,v:.3,hue:!0},{k:"leafVariety",g:"Colour",label:"Leaf colour variety",min:0,max:1,step:.05,v:.3},{k:"trunkHue",g:"Colour",label:"Bark hue",min:0,max:1,step:.01,v:.07,hue:!0},{k:"groundHue",g:"Colour",label:"Ground hue",min:0,max:1,step:.01,v:.27,hue:!0},{k:"groundVal",g:"Colour",label:"Ground brightness",min:.15,max:.7,step:.01,v:.4},{k:"pixel",g:"Shading",label:"Pixel size",min:1,max:5,step:1,v:3},{k:"treeSize",g:"Trees",label:"Tree height",min:.5,max:1.5,step:.05,v:.85},{k:"crownWidth",g:"Trees",label:"Crown width",min:1,max:4,step:.1,v:3},{k:"clearing",g:"Trees",label:"Clearing size",min:0,max:1,step:.05,v:.55},{k:"depth",g:"Map",label:"Border detail (fractal layers)",min:0,max:6,step:1,v:4},{k:"areaScale",g:"Map",label:"Area size (screens)",min:.6,max:2,step:.05,v:1},{k:"areaTypes",g:"Map",label:"Area types",min:4,max:30,step:1,v:30},{k:"density",g:"Trees",label:"Foliage density",min:.2,max:1,step:.05,v:.55},{k:"clump",g:"Trees",label:"Clumpiness",min:0,max:1,step:.05,v:.6},{k:"gnarl",g:"Trees",label:"Gnarliness",min:0,max:1,step:.05,v:.5},{k:"roots",g:"Trees",label:"Roots",min:0,max:1,step:.05,v:.6},{k:"bark",g:"Trees",label:"Bark texture",min:0,max:1,step:.05,v:.6},{k:"trees",g:"Trees",label:"Tree density",min:.2,max:2,step:.05,v:1},{k:"wBroad",g:"Tree mix",label:"Gnarled broadleaf",min:0,max:1,step:.05,v:.8},{k:"wFir",g:"Tree mix",label:"Fir",min:0,max:1,step:.05,v:.6},{k:"wWillow",g:"Tree mix",label:"Willow",min:0,max:1,step:.05,v:.5},{k:"wBirch",g:"Tree mix",label:"Birch",min:0,max:1,step:.05,v:.5},{k:"wPalm",g:"Tree mix",label:"Tree fern",min:0,max:1,step:.05,v:.3},{k:"wFlat",g:"Tree mix",label:"Flat-crowned",min:0,max:1,step:.05,v:.5},{k:"bushes",g:"Undergrowth",label:"Bushes and shrubs",min:0,max:120,step:1,v:55},{k:"bushSize",g:"Undergrowth",label:"Bush size",min:.5,max:1.8,step:.05,v:1},{k:"flowers",g:"Undergrowth",label:"Flowers",min:0,max:1,step:.05,v:.3},{k:"cSat",g:"Creatures",label:"Creature saturation",min:.1,max:1,step:.01,v:.6},{k:"cVal",g:"Creatures",label:"Creature brightness",min:.4,max:1,step:.01,v:.85},{k:"head",g:"Creatures",label:"Baby head size",min:.3,max:.6,step:.01,v:.44},{k:"eye",g:"Creatures",label:"Eye size",min:.5,max:2,step:.05,v:1},{k:"legs",g:"Creatures",label:"Leg length",min:.5,max:1.8,step:.05,v:1},{k:"long",g:"Creatures",label:"Body length",min:.7,max:1.5,step:.05,v:1},{k:"size",g:"Creatures",label:"Baby size (px)",min:5,max:14,step:1,v:8},{k:"growth",g:"Creatures",label:"Legend vs baby height",min:5,max:25,step:1,v:20},{k:"magicHue",g:"Creatures",label:"Magic glow hue",min:0,max:1,step:.01,v:.5,hue:!0},{k:"fur",g:"Creatures",label:"Stripes and spots",min:0,max:1,step:.05,v:.5},{k:"cloakHue",g:"Witch",label:"Jacket hue",min:0,max:1,step:.01,v:.72,hue:!0},{k:"hairHue",g:"Witch",label:"Hair hue",min:0,max:1,step:.01,v:.01,hue:!0},{k:"hatHue",g:"Witch",label:"Hat hue",min:0,max:1,step:.01,v:.74,hue:!0},{k:"topHue",g:"Witch",label:"Top hue",min:0,max:1,step:.01,v:.13,hue:!0},{k:"jeansHue",g:"Witch",label:"Jeans hue",min:0,max:1,step:.01,v:.6,hue:!0},{k:"shoeHue",g:"Witch",label:"Sneakers hue",min:0,max:1,step:.01,v:0,hue:!0},{k:"phonesHue",g:"Witch",label:"Headphones hue",min:0,max:1,step:.01,v:.92,hue:!0}];function wM(){const n={};return yM.forEach(e=>n[e.k]=e.v),n}function AM(n,e,t,i,r){const a=Cu(e.type).fn,o={...t,leafHue:n.leaf+(e.dark?.05:0),gnarl:e.gnarl??t.gnarl,treeBare:e.bare,treeTrunks:e.trunks,treeLean:e.lean,treeThick:e.thick,treeThin:e.thin,treeHollow:e.hollow,treeWebs:e.webs},l=a(i,o,t.treeSize*r*(e.scale||1)*ce(i,.9,1.1)),u=Rl(i,o,a);return e.dark&&(u[s.LEAF]=u[s.LEAF3],u[s.LEAF3]=xe(n.leaf+.05,.7,.22)),u[s.NOSE]=[20,16,24],u[s.GLINT]=[235,235,240],{parts:of(l),colours:u}}function TM(n,e,t,i,r){const a=fi[t].id,o=Aa.find(p=>p.id===a),l=pf(a,n,{K:i,makeCanvas:r}),u=[],c=p=>u.push(p)-1,h={big:[],small:[],walls:[],set:null},f=(p,m)=>Wr(p,m,n,"none",r),d=(p,m)=>{const{parts:M,colours:x}=AM(o,p,n,_a(e*13+t*101+m*7+1),i);return{bot:c(f(M.bot,x)),top:c(f(M.top,x))}};o.big.forEach(([p,m],M)=>{if(p!=="tree"){h.big.push({bot:c(l.big[M].sp),top:null});return}const x=m.minor,g=o.big.filter(([,E])=>!E.minor).length||1,_=x?1:Math.max(1,Math.round(Lu/g));for(let E=0;E<_;E++)h.big.push(d(m,M*17+E))}),o.small.forEach(([p,m],M)=>h.small.push(p==="tree"?d(m,500+M):{bot:c(l.small[M].sp),top:null}));for(const p of l.walls)h.walls.push(c(p.sp));return l.setPiece&&(h.set=o.set?.[0]==="tree"?d(o.set[1],900):{bot:c(l.setPiece.sp),top:null}),{sprites:u,layout:h,floor:l.floor.sp}}function RM(n,e,t){const i=[];for(let r=0;r<3;r++)for(let a=0;a<2;a++)i.push(Wr(Pd(e,r,a,n),Cd(e,n),n,n.cOutline,t));return i}const CM=(n,e)=>n*2+e;function As(n,e,t){return n.getContext("2d").getImageData(0,0,e,t).data}function _l(n,e=2048){const i=[];let r=0,a=0,o=0,l=1;for(const d of n)r+d.w+1>e&&(r=0,a+=o+1,o=0),i.push({x:r,y:a}),r+=d.w+1,o=Math.max(o,d.h),l=Math.max(l,r);const u=Math.max(1,a+o),c=new Uint8Array(l*u*4),h=new Uint8Array(l*u*4),f=n.map((d,p)=>{const m=i[p],M=As(d.A,d.w,d.h),x=As(d.N,d.w,d.h);for(let g=0;g<d.h;g++){const _=g*d.w*4,E=((m.y+g)*l+m.x)*4;c.set(M.subarray(_,_+d.w*4),E),h.set(x.subarray(_,_+d.w*4),E)}return{uv:[m.x/l,m.y/u,(m.x+d.w)/l,(m.y+d.h)/u],w:d.w,h:d.h}});return{albedo:c,normal:h,width:l,height:u,frames:f}}function LM(n,e){if(n.kind==="creature")return{px:_l(RM(n.style,n.id,e),1024)};const{sprites:t,layout:i,floor:r}=TM(n.style,n.seed,n.id,n.K,e);return{px:_l(t),layout:i,floor:{albedo:new Uint8Array(As(r.A,r.w,r.h)),normal:new Uint8Array(As(r.N,r.w,r.h)),w:r.w,h:r.h}}}function fu(n,e,t){const i=new Br(n,e,t,Fn,Rn);return i.magFilter=$t,i.minFilter=$t,i.generateMipmaps=!1,i.flipY=!1,i.colorSpace=Vn,i.needsUpdate=!0,i}function bh(n){return{albedo:fu(n.albedo,n.width,n.height),normal:fu(n.normal,n.width,n.height),frames:n.frames}}const pu=(n,e=2048)=>bh(_l(n,e));class DM{constructor(e,t,i){if(this.style=e,this.seed=t,this.K=2/i,this.witch=pu([Wr(td(),Xh(e),e,"dark")]),this.stones=pu([0,1,2,3].map(r=>this.stone(r))),this.useWorkers=typeof Worker<"u"&&typeof OffscreenCanvas<"u",this.useWorkers){const r=Math.max(1,Math.min(3,(navigator.hardwareConcurrency||2)-1));try{for(let a=0;a<r;a++){const o=new Worker(new URL(""+new URL("artWorker-CGUrreIj.js",import.meta.url).href,import.meta.url),{type:"module"}),l={w:o,busy:!1};o.onmessage=u=>{l.busy=!1,l.job=void 0,this.receive(u.data),this.dispatch()},o.onerror=()=>{this.useWorkers=!1,l.job&&this.queue.unshift(l.job),l.busy=!1,l.job=void 0},this.workers.push(l)}}catch{this.useWorkers=!1}}}style;seed;types=new Map;creatures=new Map;queue=[];inFlight=new Set;workers=[];useWorkers;witch;stones;K;version=0;onFloor=()=>{};stone(e){const t=_a(this.seed*3+e),i=5+Math.floor(t()*3),r=7+Math.floor(t()*5),a=new Xt(i+2,r+1);return a.ellipse((i+2)/2,r/2+1,i/2,r/2+.5,s.BODY,{round:this.style.round}),a.ellipse((i+2)/2-1,r/2,i/3,r/3,s.BODY2,{round:this.style.round,onlyOn:new Set([s.BODY]),density:.5,seed:e}),Wr(a,{[s.BODY]:[178,174,162],[s.BODY2]:[140,138,130]},this.style,"dark")}key=e=>e.kind+":"+e.id;ask(e){const t=this.key(e);this.inFlight.has(t)||(this.inFlight.add(t),this.queue.push(e),this.dispatch())}dispatch(){if(this.useWorkers)for(const e of this.workers)e.busy||!this.queue.length||(e.busy=!0,e.job=this.queue.shift(),e.w.postMessage(e.job))}receive(e){if(!e.result){console.warn("art worker failed, drawing on the page:",e.error),this.useWorkers=!1,this.queue.unshift(e.job);return}const t=bh(e.result.px);e.job.kind==="type"?(this.types.set(e.job.id,{atlas:t,layout:e.result.layout}),e.result.floor&&this.onFloor(e.job.id,e.result.floor)):this.creatures.set(e.job.id,{atlas:t,frame:CM}),this.inFlight.delete(this.key(e.job)),this.version++}typeArt(e){const t=this.types.get(e);return t||this.ask({kind:"type",id:e,style:this.style,seed:this.seed,K:this.K}),t}creatureArt(e){const t=this.creatures.get(e);return t||this.ask({kind:"creature",id:e,style:this.style}),t}prefetchType(e){this.types.has(e)||this.typeArt(e)}get pending(){return this.inFlight.size}work(e){if(this.useWorkers)return;const t=performance.now();let i=0;for(;this.queue.length&&(i===0||performance.now()-t<e);){const r=this.queue.shift();this.receive({job:r,result:LM(r,(a,o)=>{const l=document.createElement("canvas");return l.width=a,l.height=o,l})}),i++}}whenIdle(){return new Promise(e=>{const t=()=>{this.work(50),this.pending?setTimeout(t,30):e()};t()})}}const Zt={uAmb:{value:new Y},uMoon:{value:new Y},uMoonDir:{value:new Y(-.45,.75,.5).normalize()},uMoonBeam:{value:new Y},uBands:{value:4},uDither:{value:.35},uShafts:{value:.3},uShaftScale:{value:1},uGlowPos:{value:new Y},uGlowRgb:{value:new Y},uGlowR:{value:8},uGlowPower:{value:1.4},uHazeCentre:{value:new Xe},uHazeRange:{value:new Xe(70,200)},uHazeColour:{value:new Y},uTime:{value:0}};function PM(n,e,t){const i=(r,a)=>new Y(r[0]/255*a,r[1]/255*a,r[2]/255*a);Zt.uAmb.value.copy(i(xe(n.ambientHue,.55,1),n.ambient)),Zt.uMoon.value.copy(i(xe(n.moonHue,.35,1),n.moon)),Zt.uMoonBeam.value.copy(i(xe(n.moonHue,.35,1),n.shafts*.25)),Zt.uBands.value=n.bands,Zt.uDither.value=n.dither*.5,Zt.uShafts.value=n.shafts,Zt.uShaftScale.value=t*2,Zt.uGlowRgb.value.copy(i(xe(n.glowHue,n.glowSat,1),1)),Zt.uGlowR.value=e,Zt.uGlowPower.value=n.glowPower,Zt.uHazeColour.value.copy(i(xe(n.ambientHue,.45,1),.16))}const Is=`
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
`,rr=2,tn=32,sr=8,IM=`
varying vec3 vWorld;
void main() {
  vec4 w = modelMatrix * vec4(position, 1.0);
  vWorld = w.xyz;
  gl_Position = projectionMatrix * viewMatrix * w;
}
`,NM=`
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
${Is}
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
    vec2 cell = vec2(mod(float(t), ${sr}.0), floor(float(t) / ${sr}.0));
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
`;class OM{constructor(e,t,i){this.map=e;const r=e.extent,a=r.maxX-r.minX,o=r.maxZ-r.minZ,l=Math.ceil(a*rr/tn)*tn,u=Math.ceil(o*rr/tn)*tn;this.tilesX=l/tn,this.tilesZ=u/tn,this.filled=new Uint8Array(this.tilesX*this.tilesZ);const c=p=>(p.magFilter=p.minFilter=$t,p.generateMipmaps=!1,p.colorSpace=Vn,p.needsUpdate=!0,p);this.texture=c(new Br(new Uint8Array(l*u*4),l,u)),c(this.tile),this.floors=c(new Br(new Uint8Array(64*sr*48*4*4),64*sr,192));const h=Array.from({length:32},(p,m)=>new Y(...fi[m]?.floor??[.25,.45,.4])),f=new fn({vertexShader:IM,fragmentShader:NM,uniforms:{...Zt,uAreas:{value:this.texture},uExtent:{value:new Ft(r.minX,r.minZ,l/rr,u/rr)},uPixel:{value:i},uTypeFloor:{value:h},uFloorReady:{value:this.floorReady},uFloors:{value:this.floors},uTile:{value:new Xe(64,48)},uFloorsSize:{value:new Xe(64*sr,192)},uSat:{value:t.sat},uFloor:{value:new Y(e.dancefloor.x,e.dancefloor.z,e.dancefloor.radius)},uCanopy:{value:new Ft},uClearing:{value:new Xe(e.tuning.clearingSize,e.tuning.clearingFalloff)}}}),d=new xi(a+400,o+400);d.rotateX(-Math.PI/2),this.mesh=new Mn(d,f),this.mesh.position.set((r.minX+r.maxX)/2,0,(r.minZ+r.maxZ)/2)}map;mesh;texture;tile=new Br(new Uint8Array(tn*tn*4),tn,tn);filled;tilesX;tilesZ;initialised=!1;floorReady=new Array(32).fill(0);floors;pendingFloors=[];setCanopyShadow(e,t,i,r){this.mesh.material.uniforms.uCanopy.value.set(e,t,i,r)}setFloor(e,t){this.pendingFloors.push([e,t])}placeFloors(e){for(const[t,i]of this.pendingFloors){const r=this.mesh.material,a=r.uniforms.uTile.value;if(i.w!==a.x||i.h!==a.y)continue;const o=new Br(i.albedo,i.w,i.h);o.needsUpdate=!0,e.copyTextureToTexture(o,this.floors,null,new Xe(t%sr*i.w,Math.floor(t/sr)*i.h)),o.dispose(),this.floorReady[t]=1}this.pendingFloors=[]}fill(e,t,i,r,a){this.initialised||(e.initTexture(this.texture),e.initTexture(this.floors),this.initialised=!0),this.pendingFloors.length&&this.placeFloors(e);const o=this.map.extent,l=tn/rr,u=(t-o.minX)/l,c=(i-o.minZ)/l,h=Math.ceil(r/l),f=[];for(let m=Math.max(0,Math.floor(c)-h);m<=Math.min(this.tilesZ-1,Math.floor(c)+h);m++)for(let M=Math.max(0,Math.floor(u)-h);M<=Math.min(this.tilesX-1,Math.floor(u)+h);M++)this.filled[m*this.tilesX+M]||f.push([M,m,(M+.5-u)**2+(m+.5-c)**2]);f.sort((m,M)=>m[2]-M[2]);const d=performance.now();let p=0;for(const[m,M]of f){if(p>0&&performance.now()-d>a)break;this.fillTile(e,m,M),p++}return f.length-p}fillTile(e,t,i){const r=this.map.extent,a=this.tile.image.data;for(let o=0;o<tn;o++)for(let l=0;l<tn;l++){const u=r.minX+(t*tn+l+.5)/rr,c=r.minZ+(i*tn+o+.5)/rr,h=this.map.areaAt(u,c),f=(o*tn+l)*4;a[f]=h.type,a[f+1]=Math.round(h.openness*255),a[f+2]=0,a[f+3]=255}this.tile.needsUpdate=!0,e.copyTextureToTexture(this.tile,this.texture,null,new Xe(t*tn,i*tn)),this.filled[i*this.tilesX+t]=1}dispose(){this.texture.dispose(),this.tile.dispose(),this.mesh.geometry.dispose(),this.mesh.material.dispose()}}const FM="varying vec2 vUv; void main() { vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }",UM=`
uniform sampler2D uScene; uniform float uThreshold; varying vec2 vUv;
void main() {
  vec3 c = texture2D(uScene, vUv).rgb;
  float l = max(c.r, max(c.g, c.b));
  gl_FragColor = vec4(c * smoothstep(uThreshold, uThreshold + 0.25, l), 1.0);
}`,BM=`
uniform sampler2D uSrc; uniform vec2 uStep; varying vec2 vUv;
void main() {
  vec3 c = texture2D(uSrc, vUv).rgb * 0.227;
  c += (texture2D(uSrc, vUv + uStep * 1.38).rgb + texture2D(uSrc, vUv - uStep * 1.38).rgb) * 0.316;
  c += (texture2D(uSrc, vUv + uStep * 3.23).rgb + texture2D(uSrc, vUv - uStep * 3.23).rgb) * 0.070;
  gl_FragColor = vec4(c, 1.0);
}`,kM=`
uniform sampler2D uScene, uBloom; uniform vec2 uLow; uniform float uBloomStrength; varying vec2 vUv;
void main() {
  vec2 p = (floor(vUv * uLow) + 0.5) / uLow;
  vec3 c = texture2D(uScene, p).rgb + texture2D(uBloom, vUv).rgb * uBloomStrength;
  gl_FragColor = vec4(min(c, vec3(1.0)), 1.0);
}`,zM=`
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
}`;function ha(n,e,t,i=!1){const r=new Un(Math.max(1,n),Math.max(1,e),{minFilter:t,magFilter:t,depthBuffer:i,generateMipmaps:!1});return r.texture.colorSpace=Vn,r}class HM{constructor(e,t){this.renderer=e,this.tuning=t,this.scene=ha(1,1,Yt,!0);const i=(r,a)=>new fn({vertexShader:FM,fragmentShader:r,uniforms:a,depthTest:!1,depthWrite:!1});this.mats={bright:i(UM,{uScene:{value:null},uThreshold:{value:.6}}),blur:i(BM,{uSrc:{value:null},uStep:{value:new Xe}}),composite:i(kM,{uScene:{value:null},uBloom:{value:null},uLow:{value:new Xe},uBloomStrength:{value:0}}),tilt:i(zM,{uSrc:{value:null},uTexel:{value:new Xe},uDir:{value:new Xe},uStrength:{value:0},uBand:{value:.4},uCentre:{value:.5}})},this.quad=new Mn(new xi(2,2),this.mats.composite),this.quad.frustumCulled=!1}renderer;tuning;scene;bright=ha(1,1,Yt);bloomB=ha(1,1,Yt);a=ha(1,1,Yt);b=ha(1,1,Yt);quad;cam=new Gl(-1,1,1,-1,0,1);mats;low=new Xe(1,1);out=new Xe(1,1);get fullResolution(){return this.tuning.tiltShift.on&&this.tuning.tiltShift.where==="after"}resize(e,t,i,r){this.low.set(e,t),this.out.set(i,r),this.scene.setSize(e,t);const a=Math.max(1,Math.round(e/2)),o=Math.max(1,Math.round(t/2));this.bright.setSize(a,o),this.bloomB.setSize(a,o);const l=this.fullResolution?i:e,u=this.fullResolution?r:t;this.a.setSize(l,u),this.b.setSize(l,u)}pass(e,t,i){const r=this.mats[e];i(r.uniforms),this.quad.material=r,this.renderer.setRenderTarget(t),this.renderer.render(this.quad,this.cam)}render(e,t){const i=this.renderer,r=this.tuning;i.setRenderTarget(this.scene),i.render(e,t);const a=r.bloom.on&&r.bloom.strength>0;if(a){const f=this.bright.width,d=this.bright.height;this.pass("bright",this.bright,p=>{p.uScene.value=this.scene.texture,p.uThreshold.value=r.bloom.threshold});for(let p=0;p<2;p++)this.pass("blur",this.bloomB,m=>{m.uSrc.value=this.bright.texture,m.uStep.value.set(1/f,0)}),this.pass("blur",this.bright,m=>{m.uSrc.value=this.bloomB.texture,m.uStep.value.set(0,1/d)})}const o=r.tiltShift.on&&r.tiltShift.strength>0;if(this.pass("composite",o?this.a:null,f=>{f.uScene.value=this.scene.texture,f.uBloom.value=this.bright.texture,f.uLow.value.copy(this.low),f.uBloomStrength.value=a?r.bloom.strength:0}),!o)return;const l=this.a.width,u=this.a.height,c=this.fullResolution?this.out.y/this.low.y:1,h=f=>{f.uTexel.value.set(1/l,1/u),f.uStrength.value=r.tiltShift.strength*c,f.uBand.value=r.tiltShift.band,f.uCentre.value=1-r.tiltShift.centre};this.pass("tilt",this.b,f=>{h(f),f.uSrc.value=this.a.texture,f.uDir.value.set(1,0)}),this.pass("tilt",null,f=>{h(f),f.uSrc.value=this.b.texture,f.uDir.value.set(0,1)})}}const GM=`
varying vec3 vWorld;
void main() {
  vec4 w = modelMatrix * vec4(position, 1.0);
  vWorld = w.xyz;
  gl_Position = projectionMatrix * viewMatrix * w;
}`,WM=`
uniform float uStrength, uWind, uPixel;
varying vec3 vWorld;
${Is}
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
}`;class VM{constructor(e,t,i,r){this.height=t,this.mat=new fn({vertexShader:GM,fragmentShader:WM,uniforms:{...Zt,uStrength:{value:e},uWind:{value:i},uPixel:{value:r}},depthWrite:!1}),this.mesh=new Mn(new xi(700,700).rotateX(-Math.PI/2),this.mat),this.mesh.frustumCulled=!1,this.mesh.renderOrder=2}height;mesh;mat;follow(e,t){this.mesh.position.set(e,this.height,t-150)}}const YM=`
attribute vec4 iShadow; // x, z, width, depth (metres)
varying vec2 vLocal;
varying vec3 vWorld;
void main() {
  vLocal = position.xz * 2.0;
  vec3 w = vec3(iShadow.x + position.x * iShadow.z, 0.03, iShadow.y + position.z * iShadow.w);
  vWorld = w;
  gl_Position = projectionMatrix * viewMatrix * vec4(w, 1.0);
}`,XM=`
uniform float uStrength;
varying vec2 vLocal;
varying vec3 vWorld;
${Is}
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
}`;class KM{mesh;geo=new ch;attr;capacity=0;constructor(e){const t=new xi(1,1).rotateX(-Math.PI/2);this.geo.index=t.index,this.geo.setAttribute("position",t.getAttribute("position")),this.attr=this.grow(1024);const i=new fn({vertexShader:YM,fragmentShader:XM,uniforms:{...Zt,uStrength:{value:e}},depthWrite:!1});this.mesh=new Mn(this.geo,i),this.mesh.frustumCulled=!1,this.mesh.renderOrder=1}grow(e){return this.capacity=Math.max(e,this.capacity*2),this.attr=new rh(new Float32Array(this.capacity*4),4),this.attr.setUsage($u),this.geo.setAttribute("iShadow",this.attr),this.attr}set(e){e.length>this.capacity&&this.grow(e.length);const t=this.attr.array;e.forEach((i,r)=>{t[r*4]=i.x,t[r*4+1]=i.z,t[r*4+2]=i.w,t[r*4+3]=i.d}),this.attr.needsUpdate=!0,this.geo.instanceCount=e.length,this.mesh.visible=e.length>0}}const Fr={uRight:{value:new Y(1,0,0)},uUp:{value:new Y(0,1,0)},uFacing:{value:new Y(0,0,1)},uTopFade:{value:0}},qM=`
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
`,ZM=`
uniform sampler2D uAlbedo, uNormal;
uniform vec3 uRight, uUp, uFacing;
uniform float uTopFade, uUnlit;
varying vec2 vUv;
varying vec3 vWorld;
varying vec2 vFlags;
${Is}
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
`;class ss{constructor(e,t,i={}){this.atlas=e,this.metresPerPixel=t;const r=new xi(1,1);r.translate(0,.5,0),this.geo=new ch,this.geo.index=r.index,this.geo.setAttribute("position",r.getAttribute("position")),this.geo.setAttribute("uv",r.getAttribute("uv")),this.pos=this.size=this.uvs=this.flags=void 0,this.grow(64);const a=new fn({vertexShader:qM,fragmentShader:ZM,uniforms:{...Zt,...Fr,uAlbedo:{value:e.albedo},uNormal:{value:e.normal},uUnlit:{value:i.unlit?1:0}},depthTest:!i.onTop,depthWrite:!i.onTop});this.mesh=new Mn(this.geo,a),this.mesh.frustumCulled=!1,i.onTop&&(this.mesh.renderOrder=10)}atlas;metresPerPixel;mesh;geo;pos;size;uvs;flags;capacity=0;count=0;grow(e){const t=Math.max(e,this.capacity*2),i=(r,a)=>{const o=new rh(new Float32Array(t*r),r);return o.setUsage($u),a&&o.array.set(a.array),o};this.pos=i(3,this.pos),this.size=i(2,this.size),this.uvs=i(4,this.uvs),this.flags=i(2,this.flags),this.geo.setAttribute("iPos",this.pos),this.geo.setAttribute("iSize",this.size),this.geo.setAttribute("iUv",this.uvs),this.geo.setAttribute("iFlags",this.flags),this.capacity=t}set(e){e.length>this.capacity&&this.grow(e.length);const t=this.pos.array,i=this.size.array,r=this.uvs.array,a=this.flags.array;e.forEach((o,l)=>{t[l*3]=o.x,t[l*3+1]=o.y,t[l*3+2]=o.z,i[l*2]=o.frame.w*this.metresPerPixel,i[l*2+1]=o.frame.h*this.metresPerPixel,r.set(o.frame.uv,l*4),a[l*2]=o.flip?1:0,a[l*2+1]=o.top?1:0});for(const o of[this.pos,this.size,this.uvs,this.flags])o.needsUpdate=!0;this.count=e.length,this.geo.instanceCount=e.length,this.mesh.visible=e.length>0}dispose(){this.geo.dispose(),this.mesh.material.dispose(),this.atlas.albedo.dispose(),this.atlas.normal.dispose()}}class $M{constructor(e,t,i){this.canvas=e,this.game=t,this.style=i;const r=t.tuning;this.renderer=new tM({canvas:e,antialias:!1,powerPreference:"high-performance",preserveDrawingBuffer:!0}),this.renderer.setPixelRatio(1),this.renderer.info.autoReset=!1,this.renderer.outputColorSpace=Ea,this.mpp=1/(r.artPixelsPerMetre*(2/r.pixelSize)),this.camera=new Nn(r.camera.fov,1,1,900),this.post=new HM(this.renderer,r),this.scene.background=new pt(723478),PM(i,r.glowReach,this.mpp),this.assets=new DM(i,t.seed,r.pixelSize),this.ground=new OM(t.map,i,this.mpp),this.assets.onFloor=(c,h)=>this.ground.setFloor(c,h);const a=r.canopyShadow;this.ground.setCanopyShadow(a.on?a.strength:0,a.height,a.cover,a.wind),this.shadows=new KM(r.shadows.strength),this.shadows.mesh.visible=r.shadows.on,this.scene.add(this.shadows.mesh),r.mist.on&&r.mist.strength>0&&(this.mist=new VM(r.mist.strength,r.mist.height,r.mist.wind,this.mpp),this.scene.add(this.mist.mesh)),Zt.uHazeRange.value.set(r.haze.near,r.haze.far),this.scene.add(this.ground.mesh),this.witchBatch=new ss(this.assets.witch,this.mpp,{unlit:!0,onTop:!0}),this.scene.add(this.witchBatch.mesh),this.stoneBatch=new ss(this.assets.stones,this.mpp),this.scene.add(this.stoneBatch.mesh);const o=t.map.dancefloor,l=[];for(let c=0;c<9;c++){const h=c/9*Math.PI*2+.3;l.push({x:o.x+Math.cos(h)*o.radius,y:0,z:o.z+Math.sin(h)*o.radius,frame:this.assets.stones.frames[c%4],flip:c%2===0})}this.stoneBatch.set(l);const u=new fn({transparent:!1,depthWrite:!1,vertexShader:"varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }",fragmentShader:"varying vec2 vUv; void main(){ vec2 p = vUv * 2.0 - 1.0; if (dot(p, p) > 1.0 || mod(floor(gl_FragCoord.x) + floor(gl_FragCoord.y), 2.0) > 0.5) discard; gl_FragColor = vec4(0.02, 0.02, 0.05, 1.0); }"});this.shadow=new Mn(new xi(1.4,.7).rotateX(-Math.PI/2),u),this.shadow.renderOrder=1,this.scene.add(this.shadow)}canvas;game;style;renderer;scene=new Bp;camera;ground;assets;typeBatches=new Map;creatureBatches=new Map;witchBatch;stoneBatch;shadow;mpp;lastBuild={x:1/0,y:1/0,z:1/0,version:-1};post;shadows;shadowList=[];mist=null;width=1;height=1;stats={trees:0,bushes:0,creatures:0,batches:0,drawCalls:0,pendingArt:0,pendingGround:0};resize(e,t){const i=this.game.tuning.pixelSize;this.width=Math.max(1,Math.ceil(e/i)),this.height=Math.max(1,Math.ceil(t/i));const r=this.post.fullResolution?i:1;this.renderer.setSize(this.width*r,this.height*r,!1),this.post.resize(this.width,this.height,this.width*r,this.height*r),this.canvas.style.width=this.width*i+"px",this.canvas.style.height=this.height*i+"px",this.camera.aspect=this.width/this.height,this.camera.updateProjectionMatrix()}async prepare(){this.render(0,!1),this.drawCreatures(),this.ground.fill(this.renderer,this.game.witch.x,this.game.witch.z,50,1/0),await this.assets.whenIdle(),this.updateFrustum(),this.refresh(!0);for(let e=0;e<fi.length;e++)this.assets.prefetchType(e);for(const e of fi)this.assets.creatureArt(e.creature)}batchFor(e,t,i){let r=e.get(t);return r||(r=i(),r&&(e.set(t,r),this.scene.add(r.mesh))),r}frustum=new Hl;box=new Jr;m4=new Wt;v3=new Y;drawn=new Set;pops=[];updateFrustum(){this.camera.updateMatrixWorld(),this.m4.multiplyMatrices(this.camera.projectionMatrix,this.camera.matrixWorldInverse),this.frustum.setFromProjectionMatrix(this.m4)}viewRect(e,t){const i=this.camera,r=i.position,a=this.game.witch,o=[];for(const c of[-1,1])for(const h of[-1,1]){const f=this.v3.set(c,h,1).unproject(i).sub(r).normalize();for(const d of[0,25]){let p=f.y<-.001?(d-r.y)/f.y:1/0;p>0||(p=1/0),p=Math.min(p,e+r.distanceTo(new Y(a.x,r.y,a.z))+t),o.push([r.x+f.x*p,r.z+f.z*p])}}o.push([r.x,r.z]);const l=o.map(c=>c[0]),u=o.map(c=>c[1]);return{minX:Math.min(...l)-t,maxX:Math.max(...l)+t,minZ:Math.min(...u)-t,maxZ:Math.max(...u)+t}}inView(e,t,i,r,a){const o=this.game.witch.x,l=this.game.witch.z,u=this.game.tuning.haze.far+a;return(e-o)**2+(t-l)**2>u*u?!1:(this.box.min.set(e-i/2-a,-a,t-r-a),this.box.max.set(e+i/2+a,r+a,t+a),this.frustum.intersectsBox(this.box))}inInnerView(e,t,i){const r=this.game.witch;if(Math.hypot(e-r.x,t-r.z)>this.game.tuning.haze.near)return!1;for(const a of[0,i]){const o=this.v3.set(e,a,t).project(this.camera);if(Math.abs(o.x)<.85&&Math.abs(o.y)<.85&&o.z<1)return!0}return!1}refresh(e=!1){const t=this.game,i=t.tuning,r=this.camera,a=i.viewMargin,o={x:r.position.x,y:r.position.y,z:r.position.z};if(!e&&Math.hypot(o.x-this.lastBuild.x,o.y-this.lastBuild.y,o.z-this.lastBuild.z)<a/3&&this.assets.version===this.lastBuild.version)return;this.lastBuild={...o,version:this.assets.version};const l=this.viewRect(i.haze.far,a),u=(l.minX+l.maxX)/2,c=(l.minZ+l.maxZ)/2,h=Math.max(l.maxX-l.minX,l.maxZ-l.minZ)/2,f=[],d=Zt.uMoonDir.value,p=-d.x/Math.max(.2,d.y),m=-d.z/Math.max(.2,d.y),M=new Map,x=new Set,g=(A,D)=>{let b=M.get(A);b||M.set(A,b=[]),b.push(D)},_=this.mpp;let E=0,S=0;for(const A of t.forest.treesNear(u,c,h)){const D=this.assets.typeArt(A.type);if(!D||!D.layout.big.length)continue;const b=D.atlas.frames,w=D.layout.big[A.variant%D.layout.big.length],L=b[w.top??w.bot];if(!this.inView(A.x,A.z,L.w*_,L.h*_,a))continue;g(A.type,{x:A.x,y:0,z:A.z,frame:b[w.bot],flip:A.flip}),w.top!==null&&g(A.type,{x:A.x,y:0,z:A.z,frame:b[w.top],flip:A.flip,top:!0});const C=L.w*_,N=L.h*_*(w.top===null?.2:.6);f.push({x:A.x+p*N,z:A.z+m*N,w:C*.8,d:C*.45}),x.add(`${A.x.toFixed(2)},${A.z.toFixed(2)},${L.h*_}`),E++}const R=(A,D)=>{for(const b of A){const w=this.assets.typeArt(b.type);if(!w)continue;const L=D(w.layout);if(!L.length)continue;const C=L[b.variant%L.length],N=w.atlas.frames,O=N[C.bot],I=N[C.top??C.bot];this.inView(b.x,b.z,I.w*_,I.h*_,a)&&(g(b.type,{x:b.x,y:0,z:b.z,frame:O,flip:b.flip}),C.top!==null&&g(b.type,{x:b.x,y:0,z:b.z,frame:N[C.top],flip:b.flip,top:!0}),f.push({x:b.x,z:b.z,w:O.w*_*.8,d:O.w*_*.3}),S++)}};R(t.forest.bushesNear(u,c,h),A=>A.small),R(t.forest.wallsNear(u,c,h),A=>A.walls.map(D=>({bot:D,top:null}))),R(t.forest.setPiecesNear(u,c,h),A=>A.set===null?[]:[A.set]);for(const[A,D]of this.typeBatches)M.has(A)||D.set([]);for(const[A,D]of M)this.batchFor(this.typeBatches,A,()=>{const w=this.assets.typeArt(A);return w&&new ss(w.atlas,_)})?.set(D);if(!e&&this.assets.pending===0){const A=(D,b)=>{const[w,L,C]=D.split(",").map(Number);this.inInnerView(w,L,C)&&this.pops.push(`${b} ${w.toFixed(0)},${L.toFixed(0)}`)};for(const D of x)this.drawn.has(D)||A(D,"appeared");for(const D of this.drawn)x.has(D)||A(D,"vanished")}this.drawn=x,this.stats.trees=E,this.stats.bushes=S,this.shadowList=f}drawCreatures(){const e=this.game,t=e.camera,i=e.tuning.haze.far,r=new Map,a=[];let o=0;for(const l of e.creatures){if(Math.abs(l.x-t.tx)>i||Math.abs(l.z-t.tz)>i)continue;const u=this.assets.creatureArt(l.species);if(!u)continue;const c=u.atlas.frames[u.frame(l.level,l.moving?Math.floor(l.walk)%2:0)];if(!this.inView(l.x,l.z,c.w*this.mpp,c.h*this.mpp,4))continue;let h=r.get(l.species);h||r.set(l.species,h=[]),h.push({x:l.x,y:0,z:l.z,frame:c,flip:l.facing<0}),a.push({x:l.x,z:l.z,w:c.w*this.mpp*.7,d:c.w*this.mpp*.25}),o++}for(const[l,u]of this.creatureBatches)r.has(l)||u.set([]);for(const[l,u]of r)this.batchFor(this.creatureBatches,l,()=>{const h=this.assets.creatureArt(l);return h&&new ss(h.atlas,this.mpp)})?.set(u);this.stats.creatures=o,this.game.tuning.shadows.on&&this.shadows.set(this.shadowList.concat(a))}render(e,t=!0){const i=this.game,r=i.tuning,a=Of(i),o=a.angle*Math.PI/180,l=2*a.distance*Math.tan(r.camera.fov*Math.PI/360)/this.height,u=new Y(0,Math.cos(o),-Math.sin(o)),c=new Y(a.tx,a.ty,a.tz),h=c.dot(u),f=c.x;c.addScaledVector(u,Math.round(h/l)*l-h),c.x+=Math.round(f/l)*l-f;const d=new Y(0,Math.sin(o),Math.cos(o)).multiplyScalar(a.distance);this.camera.position.copy(c).add(d),this.camera.up.set(0,1,0),this.camera.lookAt(c);const p=r.spriteTilt;Fr.uUp.value.set(0,1,0).lerp(u,p).normalize(),Fr.uFacing.value.crossVectors(Fr.uRight.value,Fr.uUp.value).normalize(),Fr.uTopFade.value=zs(i.witch);const m=i.witch,M=Cl(m,r);Zt.uGlowPos.value.set(m.x,M+r.glowHeight,m.z),Zt.uHazeCentre.value.set(m.x,m.z),Zt.uTime.value=e,this.mist?.follow(a.tx,a.tz);const x=Math.sin(e*2.4)*.12;this.witchBatch.set([{x:m.x,y:M+x-.4,z:m.z,frame:this.assets.witch.frames[0],flip:m.facing<0}]),this.shadow.position.set(m.x,.03,m.z),this.shadow.scale.setScalar(1-.5*zs(m)),this.updateFrustum(),this.refresh(),this.drawCreatures(),this.assets.work(6);const g=ai(r.haze.near,r.haze.far,zs(m))*.8;this.stats.pendingGround=this.ground.fill(this.renderer,a.tx,a.tz-g*.5,g,3),this.stats.pendingArt=this.assets.pending,t&&(this.renderer.info.reset(),this.post.render(this.scene,this.camera),this.stats.drawCalls=this.renderer.info.render.calls,this.stats.batches=this.typeBatches.size+this.creatureBatches.size)}}const JM="The art style: knobs from the Witch Art Lab. Paste a style saved in the Lab here (its whole saved JSON, or just its style object). Any knob left out follows the Lab's current default, so an empty style means the Lab's default look, and stays up to date as the art changes.",QM="Lab default",jM={},e_={_readme:JM,name:QM,style:jM};function t_(n=e_){const e=n??{},t=e.style&&typeof e.style=="object"?e.style:e,i=wM();for(const[r,a]of Object.entries(t))r in i&&(i[r]=a);return i}function n_(n,e){const t=n.querySelector("#stick"),i=t.querySelector(".knob"),r=56;let a=null,o=0,l=0;const u=()=>n.classList.add("touch"),c=n.querySelector("#stick-zone");c.addEventListener("pointerdown",d=>{if(!(d.pointerType==="mouse"||a!==null)){u(),a=d.pointerId,o=d.clientX,l=d.clientY,t.style.left=o+"px",t.style.top=l+"px",t.classList.add("on");try{c.setPointerCapture(d.pointerId)}catch{}d.preventDefault()}}),c.addEventListener("pointermove",d=>{if(d.pointerId!==a)return;let p=d.clientX-o,m=d.clientY-l;const M=Math.hypot(p,m);M>r&&(p*=r/M,m*=r/M),i.style.transform=`translate(${p}px, ${m}px)`;const x=Math.min(1,M/r),g=.15,_=x<g?0:(x-g)/(1-g)/Math.max(1e-6,x);e.x=p/r*_,e.y=m/r*_});const h=d=>{d.pointerId===a&&(a=null,e.x=0,e.y=0,i.style.transform="",t.classList.remove("on"))};c.addEventListener("pointerup",h),c.addEventListener("pointercancel",h);const f=(d,p)=>{const m=n.querySelector(d);m.addEventListener("pointerdown",M=>{M.preventDefault(),M.stopPropagation(),p(),m.classList.add("down")}),m.addEventListener("pointerup",()=>m.classList.remove("down")),m.addEventListener("pointerleave",()=>m.classList.remove("down"))};f("#rise",()=>e.toggle=!0),f("#zoom-in",()=>e.zoom-=1),f("#zoom-out",()=>e.zoom+=1),window.addEventListener("touchstart",d=>{u(),d.touches.length===3&&(e.debug=!0)},{passive:!0})}const Ni=new URLSearchParams(location.search);let ur=xf(Ni.get("seed"));ur===null&&(ur=Math.floor(Math.random()*1e6),Ni.set("seed",String(ur)),history.replaceState(null,"","?"+Ni.toString()+location.hash));const Pi={..._r,bloom:{..._r.bloom},tiltShift:{..._r.tiltShift},shadows:{..._r.shadows},canopyShadow:{..._r.canopyShadow},mist:{..._r.mist}};Ni.get("shadows")==="off"&&(Pi.shadows.on=!1);Ni.get("canopy")==="off"&&(Pi.canopyShadow.on=!1);Ni.get("mist")==="off"&&(Pi.mist.on=!1);const os=Ni.get("tilt");os==="off"?Pi.tiltShift.on=!1:(os==="before"||os==="after")&&(Pi.tiltShift.on=!0,Pi.tiltShift.where=os);Ni.get("bloom")==="off"&&(Pi.bloom.on=!1);const Ri=If(ur,Pi),i_=document.getElementById("game"),wa=new $M(i_,Ri,{...t_(),pixel:Pi.pixelSize}),Ns=new k0;n_(document.body,Ns.touch);document.getElementById("version").textContent="v188 · b9e3256";const r_=document.getElementById("seed");r_.innerHTML=`seed <a href="?seed=${ur}">${ur}</a>`;const vl=document.getElementById("debug"),Wl=document.getElementById("start");let ga=Ni.has("debug");vl.classList.toggle("on",ga);const Sh=()=>wa.resize(window.innerWidth,window.innerHeight);window.addEventListener("resize",Sh);Sh();let Os=!1;requestAnimationFrame(()=>setTimeout(async()=>{await wa.prepare(),Os=!0,Wl.classList.remove("loading")},0));let mu=null;function Eh(){if(!Os||!Ri.clock.paused)return!1;try{mu??=new AudioContext,mu.resume()}catch{}return Ri.clock.paused=!1,Wl.style.display="none",Ns.clearPresses(),!0}Ns.onAny=Eh;Wl.addEventListener("pointerdown",n=>{n.preventDefault(),Eh()});document.addEventListener("visibilitychange",()=>{document.hidden&&(Ms=0)});let Ms=0,gu=60,wo=0,ls=0;function yh(n){requestAnimationFrame(yh);const e=Ms?(n-Ms)/1e3:0;Ms=n,wo++,ls+=e,ls>=.5&&(gu=wo/ls,wo=0,ls=0);const t=Ns.read();if(t.debug&&(ga=!ga,vl.classList.toggle("on",ga)),Nf(Ri,t,e),!!Os&&(wa.render(n/1e3),ga)){const i=Ri.witch,r=wa.stats;vl.textContent=[`fps    ${gu.toFixed(0)}`,`seed   ${ur}`,`area   ${Du(Ri)}`,`mode   ${i.mode}`,`at     ${i.x.toFixed(0)}, ${i.z.toFixed(0)} m   zoom ${Ri.camera.zoomStep}`,`trees  ${r.trees}  bushes ${r.bushes}  creatures ${r.creatures}`,`draws  ${r.drawCalls}  art queued ${r.pendingArt}  ground tiles ${r.pendingGround}`].join(`
`)}}requestAnimationFrame(yh);window.witch={game:Ri,view:wa,areaUnderWitch:()=>Du(Ri),get ready(){return Os}};
