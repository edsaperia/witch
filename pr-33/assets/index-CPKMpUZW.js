(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);new MutationObserver(r=>{for(const a of r)if(a.type==="childList")for(const s of a.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&i(s)}).observe(document,{childList:!0,subtree:!0});function t(r){const a={};return r.integrity&&(a.integrity=r.integrity),r.referrerPolicy&&(a.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?a.credentials="include":r.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function i(r){if(r.ep)return;r.ep=!0;const a=t(r);fetch(r.href,a)}})();function oa(n){let e=n>>>0;return()=>{e=e+1831565813>>>0;let t=e;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}}function Tt(n,e,t){let i=Math.imul(n|0,374761393)^Math.imul(e|0,668265263)^Math.imul(t|0,2147483647);return i=Math.imul(i^i>>>13,1274126177),((i^i>>>16)>>>0)/4294967296}function Ol(n,e,t){const i=Math.floor(n),r=Math.floor(e),a=n-i,s=e-r,o=a*a*(3-2*a),c=s*s*(3-2*s),u=Tt(i,r,t),h=Tt(i+1,r,t),d=Tt(i,r+1,t),f=Tt(i+1,r+1,t);return u+(h-u)*o+(d-u)*c+(u-h-d+f)*o*c}const Zn=(n,e,t)=>n+(e-n)*t,tr=(n,e,t)=>Math.min(t,Math.max(e,n)),Fr=n=>{const e=tr(n,0,1);return e*e*(3-2*e)};function hh(n,e,t,i){const r=Math.max(1,n.camera.zoomSteps),a=tr(Math.round(n.camera.startZoom),0,r-1),s=r>1?a/(r-1):0;return{zoomStep:a,zoom:s,tx:e,ty:t,tz:i,vx:0,vy:0,vz:0,ax:0,az:0,lift:0}}function ws(n,e,t,i,r){const a=i*r,s=Math.exp(-a),o=n-t,c=e+i*o;return[t+(o+c*r)*s,(e-i*c*r)*s]}function dh(n,e,t,i,r,a,s){const o=s.camera,c=Math.max(1,o.zoomSteps),u=tr(n.zoomStep+Math.sign(e),0,c-1),h=c>1?u/(c-1):0;let d=i.x*o.lookAhead,f=i.z*o.lookAhead;const p=Math.hypot(d,f);p>o.lookAheadMax&&(d*=o.lookAheadMax/p,f*=o.lookAheadMax/p);const m=1-Math.exp(-o.lookAheadEase*a),x=n.ax+(d-n.ax)*m,_=n.az+(f-n.az)*m,[g,M]=ws(n.tx,n.vx,t.x+x,o.follow,a),[E,b]=ws(n.ty,n.vy,t.y,o.follow,a),[R,w]=ws(n.tz,n.vz,t.z+_,o.follow,a),D=n.zoom+(h-n.zoom)*(1-Math.exp(-o.zoomEase*a)),S=n.lift+(r-n.lift)*(1-Math.exp(-o.liftEase*a));return{zoomStep:u,zoom:D,tx:g,ty:E,tz:R,vx:M,vy:b,vz:w,ax:x,az:_,lift:tr(S,0,1)}}function fh(n,e,t){const i=t.camera.ground,r=t.camera.treetop,a=Fr(e),s=Zn(Zn(i.angleIn,i.angleOut,n.zoom),Zn(r.angleIn,r.angleOut,n.zoom),a),o=Zn(Zn(i.distanceIn,i.distanceOut,n.zoom),Zn(r.distanceIn,r.distanceOut,n.zoom),a),c=s*Math.PI/180;return{angle:s,distance:o,x:n.tx,y:n.ty+Math.sin(c)*o,z:n.tz+Math.cos(c)*o,tx:n.tx,ty:n.ty,tz:n.tz}}const ph=.1,mh=()=>({time:0,paused:!0});function gh(n,e){if(n.paused||!(e>0))return 0;const t=Math.min(ph,e);return n.time+=t,t}const _h={moor:{treeDensity:.4},"fern-forest":{treeDensity:1},"muddy-forest":{treeDensity:1},"stone-shrine":{treeDensity:.3},"tangly-forest":{treeDensity:1},"wispy-forest":{treeDensity:1},"hazel-forest":{treeDensity:1},garden:{treeDensity:.6},"twiggy-forest":{treeDensity:1},ancient:{treeDensity:.9},norway:{treeDensity:1},"alder-forest":{treeDensity:.9},meadow:{treeDensity:.2},"old-oaks":{treeDensity:.9},"berry-thicket":{treeDensity:1},wetland:{treeDensity:.6},stream:{treeDensity:.7},"rocky-slope":{treeDensity:.6},bog:{treeDensity:.5},deadwood:{treeDensity:.8},"cave-mouth":{treeDensity:.6},grassland:{treeDensity:.2},"beaver-pond":{treeDensity:.8},"log-pile":{treeDensity:.7},heath:{treeDensity:.4},"old-pinewood":{treeDensity:1},ravine:{treeDensity:.6},"bluebell-glade":{treeDensity:.8},"holly-thicket":{treeDensity:1},"honeysuckle-tangle":{treeDensity:1}},xh={types:_h};function $c(n,e){if(typeof document<"u"){const t=document.createElement("canvas");return t.width=n,t.height=e,t}return new OffscreenCanvas(n,e)}function il(n){let e=n>>>0;return()=>{e=e+1831565813>>>0;let t=e;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}}const ce=(n,e,t)=>e+(t-e)*n(),rl=(n,e)=>e[Math.floor(n()*e.length)];function Lt(n,e,t){let i=Math.imul(n|0,374761393)^Math.imul(e|0,668265263)^Math.imul(t|0,2147483647);return i=Math.imul(i^i>>>13,1274126177),((i^i>>>16)>>>0)/4294967296}function Qn(n,e,t){const i=Math.floor(n),r=Math.floor(e),a=n-i,s=e-r,o=a*a*(3-2*a),c=s*s*(3-2*s),u=Lt(i,r,t),h=Lt(i+1,r,t),d=Lt(i,r+1,t),f=Lt(i+1,r+1,t);return u+(h-u)*o+(d-u)*c+(u-h-d+f)*o*c}function pe(n,e,t){n=(n%1+1)%1,e=Math.max(0,Math.min(1,e)),t=Math.max(0,Math.min(1,t));const i=Math.floor(n*6),r=n*6-i,a=t*(1-e),s=t*(1-r*e),o=t*(1-(1-r)*e),[c,u,h]=[[t,o,a],[s,t,a],[a,t,o],[a,s,t],[o,a,t],[t,a,s]][i%6];return[Math.round(c*255),Math.round(u*255),Math.round(h*255)]}const l={BODY:1,BELLY:2,ACCENT:3,EYE:4,GLINT:5,TRUNK:6,LEAF:7,LEAF2:8,CLOTH:9,SKIN:10,HAIR:11,BROOM:12,STRAW:13,BODY2:14,BARK2:15,FLOWER:16,PUPIL:17,MAGIC:18,BARKD:19,LINE:20,IRIS:21,MAGIC2:22,NOSE:23,EAR:24,BODY3:25,LEAF3:26,BARKL:27,HAT:28,PHONES:29,TOP:30,JACKET:31,JEANS:32,SHOES:33,WATER:34,STONE:35,STONED:36,MOSS:37,RUNE:39,GLOW:40,WOOD:41,COLLAR:42,HAT1:43,HAT2:44,POM:45,SHADES:46,FRAME:47,SHOE:48,SOLE:49,WOKEN:50,WEB:51},Mh=new Set([l.GLINT,l.MAGIC,l.MAGIC2,l.RUNE,l.GLOW,l.COLLAR,l.WOKEN]);function Fl(n,e=!0,t=8){const i=n.length,r=[];if(i<3)return n.slice();const a=o=>e?n[(o+i)%i]:n[Math.max(0,Math.min(i-1,o))],s=e?i:i-1;for(let o=0;o<s;o++){const c=a(o-1),u=a(o),h=a(o+1),d=a(o+2),f=Math.max(2,Math.ceil(Math.hypot(h[0]-u[0],h[1]-u[1])/1.5),t);for(let p=0;p<f;p++){const m=p/f,x=m*m,_=x*m;r.push([0,1].map(g=>.5*(2*u[g]+(-c[g]+h[g])*m+(2*c[g]-5*u[g]+4*h[g]-d[g])*x+(-c[g]+3*u[g]-3*h[g]+d[g])*_)))}}return e||r.push(n[i-1]),r}function vh(n,{cap:e=1,capEnd:t=e}={}){const i=[],r=[],a=n.length;for(let c=0;c<a;c++){const u=n[Math.max(0,c-1)],h=n[Math.min(a-1,c+1)];let d=h[0]-u[0],f=h[1]-u[1];const p=Math.hypot(d,f)||1;d/=p,f/=p;const m=n[c][2]/2;i.push([n[c][0]-f*m,n[c][1]+d*m]),r.push([n[c][0]+f*m,n[c][1]-d*m])}const s=(c,u,h,d)=>{let f=c[0]-u[0],p=c[1]-u[1];const m=Math.hypot(f,p)||1;return[c[0]+f/m*h/2*d,c[1]+p/m*h/2*d]};return[...i,s(n[a-1],n[a-2],n[a-1][2],t),...r.reverse(),s(n[0],n[1],n[0][2],e)]}const lt=(n,e)=>[n[0]+e[0],n[1]+e[1]],un=(n,e,t)=>[n[0]+(e[0]-n[0])*t,n[1]+(e[1]-n[1])*t];function ps(n,e,t,i,r,a=1){const s=[];for(let o=0;o<n.length;o++){if(s.push(n[o]),o<e||o>=t)continue;const c=n[o],u=n[(o+1)%n.length];let h=u[0]-c[0],d=u[1]-c[1];const f=Math.hypot(h,d)||1,p=d/f*a,m=-h/f*a;for(let x=1;x<=i;x++){const _=(x-.5)/i,g=un(c,u,_),M=[g[0]+p*r-h/f*r*.5,g[1]+m*r-d/f*r*.5];s.push(un(c,u,_-.45/i),M,un(c,u,_+.35/i))}}return s}function Bl(n,e,t){const i=new Uint8Array(n*e);let r=1/0,a=-1/0;for(const s of t)r=Math.min(r,s[1]),a=Math.max(a,s[1]);for(let s=Math.max(0,Math.floor(r));s<=Math.min(e-1,Math.ceil(a));s++){const o=s+.5,c=[];for(let u=0,h=t.length-1;u<t.length;h=u++){const[d,f]=t[u],[p,m]=t[h];f>o!=m>o&&c.push(d+(o-f)/(m-f)*(p-d))}c.sort((u,h)=>u-h);for(let u=0;u+1<c.length;u+=2)for(let h=Math.max(0,Math.ceil(c[u]-.5));h<=Math.min(n-1,Math.floor(c[u+1]-.5));h++)i[s*n+h]=1}return i}function Sh(n,e,t){const r=new Float32Array(n*e),a=new Float32Array(n*e);for(let c=0;c<n*e;c++)t[c]&&(r[c]=1e4,a[c]=1e4);const s=c=>r[c]*r[c]+a[c]*a[c],o=(c,u,h,d,f)=>{const p=u+d,m=h+f;let x,_;if(p<0||m<0||p>=n||m>=e)x=d,_=f;else{const g=m*n+p;x=r[g]+d,_=a[g]+f}x*x+_*_<s(c)&&(r[c]=x,a[c]=_)};for(let c=0;c<e;c++){for(let u=0;u<n;u++){const h=c*n+u;t[h]&&(o(h,u,c,-1,0),o(h,u,c,0,-1),o(h,u,c,-1,-1),o(h,u,c,1,-1))}for(let u=n-1;u>=0;u--){const h=c*n+u;t[h]&&o(h,u,c,1,0)}}for(let c=e-1;c>=0;c--){for(let u=n-1;u>=0;u--){const h=c*n+u;t[h]&&(o(h,u,c,1,0),o(h,u,c,0,1),o(h,u,c,1,1),o(h,u,c,-1,1))}for(let u=0;u<n;u++){const h=c*n+u;t[h]&&o(h,u,c,-1,0)}}return{vx:r,vy:a}}class Bt{constructor(e,t,i=1){this.sx=i,this.w=Math.round(e*i),this.h=t|0,this.m=new Uint8Array(this.w*this.h),this.n=new Float32Array(this.w*this.h*3),this.g=new Uint8Array(this.w*this.h)}inb(e,t){return e>=0&&t>=0&&e<this.w&&t<this.h}get(e,t){return e|=0,t|=0,this.inb(e,t)?this.m[t*this.w+e]:0}put(e,t,i,r=0,a=0,s=1){this.px(e*this.sx,t,i,r,a,s)}px(e,t,i,r=0,a=0,s=1){if(e=Math.floor(e),t=Math.floor(t),!this.inb(e,t))return;const o=t*this.w+e;this.m[o]=i,this.n[o*3]=r,this.n[o*3+1]=a,this.n[o*3+2]=s}recolour(e,t,i){e=Math.floor(e),t=Math.floor(t),this.inb(e,t)&&this.m[t*this.w+e]&&(this.m[t*this.w+e]=i)}ellipse(e,t,i,r,a,s={}){const{onlyOn:o,density:c=1,noise:u=0,seed:h=0,round:d=1}=s;e*=this.sx,i*=this.sx;for(let f=Math.max(0,Math.floor(t-r-1));f<Math.min(this.h,t+r+1);f++)for(let p=Math.max(0,Math.floor(e-i-1));p<Math.min(this.w,e+i+1);p++){const m=(p+.5-e)/i,x=(f+.5-t)/r,_=m*m+x*x;if(_>1)continue;const g=f*this.w+p;if(o&&!o.has(this.m[g]))continue;if(c<1){const R=u?Qn(p/3.2,f/3.2,h)*u+(1-u)*.5:.5;if(Lt(p,f,h+77)>c*(.4+R*1.2)*(1.15-_*.5))continue}const M=m*d,E=x*d,b=Math.hypot(M,E,Math.sqrt(Math.max(0,1-_))+.15);this.px(p,f,a,M/b,E/b,(Math.sqrt(Math.max(0,1-_))+.15)/b)}}line(e,t,i,r,a,s,o,c=1){e*=this.sx,i*=this.sx;const u=Math.max(1,Math.ceil(Math.hypot(i-e,r-t)));for(let h=0;h<=u;h++){const d=h/u,f=e+(i-e)*d,p=t+(r-t)*d,m=Math.max(.5,(a+(s-a)*d)/2);for(let x=Math.floor(p-m);x<=p+m;x++)for(let _=Math.floor(f-m);_<=f+m;_++){const g=(_+.5-f)/m,M=(x+.5-p)/m;if(g*g+M*M>1)continue;const E=g*c,b=Math.hypot(E,M*.3,1);this.px(_,x,o,E/b,M*.3/b,1/b)}}}tri(e,t){let[[i,r],[a,s],[o,c]]=e;i*=this.sx,a*=this.sx,o*=this.sx;const u=(m,x,_,g,M,E)=>(m-M)*(g-E)-(_-M)*(x-E),h=Math.max(0,Math.floor(Math.min(i,a,o))),d=Math.min(this.w,Math.ceil(Math.max(i,a,o))),f=Math.max(0,Math.floor(Math.min(r,s,c))),p=Math.min(this.h,Math.ceil(Math.max(r,s,c)));for(let m=f;m<p;m++)for(let x=h;x<d;x++){const _=x+.5,g=m+.5,M=u(_,g,i,r,a,s),E=u(_,g,a,s,o,c),b=u(_,g,o,c,i,r);(M<0||E<0||b<0)&&(M>0||E>0||b>0)||this.px(x,m,t,0,-.2,.98)}}shape(e,t,i={}){return this.fillMask(Bl(this.w,this.h,Fl(e,!0,i.per||6)),t,i)}limb(e,t,i={}){return this.shape(vh(e,i),t,i)}fillMask(e,t,{group:i=1,line:r=!1,depth:a=0,round:s=1,onlyOn:o=null,keepNormals:c=!1,tilt:u=[0,0],lineMat:h=l.LINE}={}){const{w:d,h:f}=this;if(o)for(let _=0;_<d*f;_++)e[_]&&!o.has(this.m[_])&&(e[_]=0);const{vx:p,vy:m}=Sh(d,f,e);let x=a;if(!x){for(let _=0;_<d*f;_++)e[_]&&(x=Math.max(x,Math.hypot(p[_],m[_])));x=Math.max(1.5,Math.min(x*.9,2.5+x*.35))}for(let _=0;_<f;_++)for(let g=0;g<d;g++){const M=_*d+g;if(!e[M])continue;if(c){this.m[M]=t;continue}const E=Math.hypot(p[M],m[M]),b=Math.min(1,Math.max(0,(E-.5)/x)),R=Math.min(2.6,(1-b)/Math.sqrt(Math.max(.02,1-(1-b)*(1-b))))*s;let w=p[M]/(E||1)*R+u[0],D=m[M]/(E||1)*R+u[1];const S=Math.hypot(w,D,1);this.m[M]=t,this.n[M*3]=w/S,this.n[M*3+1]=D/S,this.n[M*3+2]=1/S}if(r&&!c){const _=[];for(let g=0;g<f;g++)for(let M=0;M<d;M++){const E=g*d+M;if(e[E])for(const[b,R]of[[1,0],[-1,0],[0,1],[0,-1]]){const w=M+b,D=g+R;if(w<0||D<0||w>=d||D>=f)continue;const S=D*d+w;if(!e[S]&&this.m[S]&&this.g[S]!==i&&this.m[S]!==h){_.push(E);break}}}for(const g of _)this.m[g]=h}if(!c)for(let _=0;_<d*f;_++)e[_]&&(this.g[_]=i);return e}mark(e,t,i,r={}){return this.fillMask(Bl(this.w,this.h,Fl(e,!0,6)),t,{...r,onlyOn:new Set(i),keepNormals:!0})}grid(e,t,i=0,r=0,{round:a=1,flipX:s=!1}={}){const o=Math.max(...e.map(h=>h.length)),c=new Uint8Array(this.w*this.h),u=new Map;e.forEach((h,d)=>[...h].forEach((f,p)=>{const m=t[f];if(!m)return;const x=i+(s?o-1-p:p),_=r+d;this.inb(x,_)&&(c[_*this.w+x]=1,u.set(_*this.w+x,m))})),this.fillMask(c,l.BODY,{round:a,depth:2.5});for(const[h,d]of u)this.m[h]=d}}function Pr(n,e,t,i=t.outline,r=$c){const{w:a,h:s}=n,o=()=>r(a,s),c=o(),u=o(),h=o(),d=c.getContext("2d").createImageData(a,s),f=u.getContext("2d").createImageData(a,s),p=h.getContext("2d").createImageData(a,s),m=i==="none"?null:i==="dark"?[22,18,30]:"tint";for(let x=0;x<s;x++)for(let _=0;_<a;_++){const g=x*a+_,M=n.m[g],E=g*4;if(!M){if(!m)continue;const S=[n.get(_+1,x),n.get(_-1,x),n.get(_,x+1),n.get(_,x-1)].find(L=>L);if(!S)continue;const y=m==="tint"?(e[S]||[0,0,0]).map(L=>L*.35|0):m;d.data.set([...y,255],E),f.data.set([128,128,255,255],E),p.data.set([128,128,255,255],E);continue}let b=e[M];M===l.LINE&&!b&&(b=m==="tint"||!m?(e[l.BODY2]||[0,0,0]).map(S=>S*.55|0):m),b=b||[255,0,255],d.data.set([...b,Mh.has(M)?254:255],E);const R=n.n[g*3],w=n.n[g*3+1],D=n.n[g*3+2];f.data.set([R*127+128,w*127+128,D*255,255],E),p.data.set([-R*127+128,w*127+128,D*255,255],E)}return c.getContext("2d").putImageData(d,0,0),u.getContext("2d").putImageData(f,0,0),h.getContext("2d").putImageData(p,0,0),{A:c,N:u,NF:h,w:a,h:s}}const Bi=n=>{const e=Math.hypot(n[0],n[1],n[2])||1;return[n[0]/e,n[1]/e,n[2]/e]},aa=(n,e)=>[n[1]*e[2]-n[2]*e[1],n[2]*e[0]-n[0]*e[2],n[0]*e[1]-n[1]*e[0]],It=(n,e)=>n[0]*e[0]+n[1]*e[1]+n[2]*e[2],Tn=(n,e)=>[n[0]-e[0],n[1]-e[1],n[2]-e[2]],T={add:(n,e)=>[n[0]+e[0],n[1]+e[1],n[2]+e[2]],sub:Tn,mul:(n,e)=>[n[0]*e,n[1]*e,n[2]*e],lerp:(n,e,t)=>[n[0]+(e[0]-n[0])*t,n[1]+(e[1]-n[1])*t,n[2]+(e[2]-n[2])*t],norm:Bi,cross:aa,dot:It};function kl(n,e=[0,1,0]){const t=Bi(n);let i=aa(e,t);Math.hypot(...i)<1e-4&&(i=aa([0,0,1],t)),i=Bi(i);const r=aa(t,i);return[t,r,i]}function Jc(n,e){const t=It(n,e.axes[0]),i=It(n,e.axes[1]),r=It(n,e.axes[2]),[a,s,o]=e.r,c=Math.hypot(t/a,i/s,r/o),u=Math.hypot(t/(a*a),i/(s*s),r/(o*o));return u>1e-9?c*(c-1)/u:-Math.min(a,s,o)}function Qc(n,e){const{ba:t,l2:i,rr:r,a2:a,il2:s,r1:o,r2:c}=e,u=It(n,t),h=u-i,d=[n[0]*i-t[0]*u,n[1]*i-t[1]*u,n[2]*i-t[2]*u],f=It(d,d),p=u*u*i,m=h*h*i,x=Math.sign(r)*r*r*f;return Math.sign(h)*a*m>x?Math.sqrt(f+m)*s-c:Math.sign(u)*a*p<x?Math.sqrt(f+p)*s-o:(Math.sqrt(f*a*s)+u*r)*s-o}function jc(n,e){const t=Math.abs(It(n,e.axes[0]))-e.h[0]+e.round,i=Math.abs(It(n,e.axes[1]))-e.h[1]+e.round,r=Math.abs(It(n,e.axes[2]))-e.h[2]+e.round;return Math.hypot(Math.max(t,0),Math.max(i,0),Math.max(r,0))+Math.min(Math.max(t,i,r),0)-e.round}const bh=(n,e)=>e*(Math.sin(n[0]*23+n[1]*7)*Math.sin(n[1]*19-n[2]*11)+.5*Math.sin(n[2]*41+n[0]*29)),zl=(n,e)=>n.type==="ell"?Jc(Tn(e,n.cw),n):n.type==="box"?jc(Tn(e,n.cw),n):Qc(Tn(e,n.aw),n),Gr=(n,e)=>n.rough?zl(n,e)+bh(e,n.rough):zl(n,e);class et{constructor({blend:e=.07}={}){this.parts=[],this.flats=[],this.blend=e,this.anchors={feet:[]}}ell(e,t,i,r={}){const a=r.axes||(r.dir?kl(r.dir,r.up):[[1,0,0],[0,1,0],[0,0,1]]);return this.parts.push({type:"ell",c:e,r:t,axes:a,mat:i,group:r.group??1,extra:!!r.extra,paint:r.paint,rough:r.rough,cut:!!r.cut}),this}box(e,t,i,r={}){const a=r.axes||(r.dir?kl(r.dir,r.up):[[1,0,0],[0,1,0],[0,0,1]]);return this.parts.push({type:"box",c:e,h:t,round:Math.min(r.round??.02,...t),axes:a,mat:i,group:r.group??1,extra:!!r.extra,paint:r.paint,rough:r.rough,cut:!!r.cut}),this}seg(e,t,i,r,a,s={}){return this.parts.push({type:"cone",a:e,b:t,r1:i,r2:r,mat:a,group:s.group??1,extra:!!s.extra,paint:s.paint,rough:s.rough,cut:!!s.cut}),this}chain(e,t,i={}){for(let r=0;r+1<e.length;r++)this.seg(e[r].slice(0,3),e[r+1].slice(0,3),e[r][3],e[r+1][3],t,i);return this}flat(e,t,i,r,a,s,o={}){return this.flats.push({c:e,u:Bi(t),v:Bi(i),su:r,sv:a,mask:s,group:o.group??30,extra:!!o.extra,bend:o.bend??.35}),this}field(e){let t=1/0;for(const i of this.parts){if(i.extra||i.cut)continue;let r;if(i.type==="ell")r=Jc(Tn(e,i.c),i);else if(i.type==="box")r=jc(Tn(e,i.c),i);else{const a=Tn(i.b,i.a),s=Math.max(1e-9,It(a,a)),o=i.r1-i.r2;r=Qc(Tn(e,i.a),{ba:a,l2:s,rr:o,a2:s-o*o,il2:1/s,r1:i.r1,r2:i.r2})}r<t&&(t=r)}return t}static surface(e,t,i){const r=1/Math.hypot(i[0]/t[0],i[1]/t[1],i[2]/t[2]);return[e[0]+i[0]*r,e[1]+i[1]*r,e[2]+i[2]*r]}}const Hl={towards:.6,away:-.6},Eh=.52;function Mi(n,{height:e,scale:t,facing:i="towards",yaw:r=Hl[i]??Hl.towards,pitch:a=Eh,lineGap:s=.12}={}){const o=Math.cos(r),c=Math.sin(r),u=Math.cos(a),h=Math.sin(a),d=G=>[G[0]*o-G[2]*c,G[1],G[0]*c+G[2]*o],f=G=>[G[0]*o+G[2]*c,G[1],-G[0]*c+G[2]*o],p=[0,-h,-u],m=[0,u,-h],x=[1,0,0],_=[0,h,u],g=n.blend,M=n.parts.map(G=>{if(G.type==="ell"){const Oe=d(G.c),Xe=G.axes.map(d),Ye=Math.max(...G.r);return{...G,cw:Oe,axes:Xe,bc:Oe,br:Ye+(G.rough||0)*1.5}}if(G.type==="box"){const Oe=d(G.c),Xe=G.axes.map(d);return{...G,cw:Oe,axes:Xe,bc:Oe,br:Math.hypot(...G.h)+(G.rough||0)*1.5}}const he=d(G.a),se=d(G.b),ye=Tn(se,he),$e=Math.max(1e-9,It(ye,ye)),Le=G.r1-G.r2;return{...G,aw:he,ba:ye,l2:$e,rr:Le,a2:$e-Le*Le,il2:1/$e,bc:T.lerp(he,se,.5),br:Math.sqrt($e)/2+Math.max(G.r1,G.r2)}}),E=n.flats.map(G=>{const he=d(G.c),se=d(G.u),ye=d(G.v);return{...G,cw:he,uw:se,vw:ye,nw:Bi(aa(se,ye)),bc:he,br:Math.hypot(G.su,G.sv)}}),b=[...M,...E],R=G=>{const he=It(G.bc,x),se=It(G.bc,m),ye=G.br+(G.uw?0:g);return[he-ye,he+ye,se-ye,se+ye]};for(const G of b)[G.x0,G.x1,G.u0,G.u1]=R(G);const w=b.filter(G=>!G.extra&&!G.cut),D=Math.min(...w.map(G=>G.u0+(G.uw?0:g))),S=Math.max(...w.map(G=>G.u1-(G.uw?0:g))),y=t??e/Math.max(1e-6,S-D),L=Math.min(...b.map(G=>G.x0)),C=Math.max(...b.map(G=>G.x1)),N=Math.min(...b.map(G=>G.u0)),U=Math.max(...b.map(G=>G.u1)),I=Math.ceil((C-L)*y)+4,B=Math.ceil((U-N)*y)+2,V=new Bt(I,B),$=new Float32Array(I*B).fill(1/0),ae=new Int16Array(I*B).fill(-1),q=8,ee=Math.ceil(I/q),O=Math.ceil(B/q),re=Array.from({length:ee*O},()=>[]);b.forEach((G,he)=>{const se=Math.max(0,Math.floor((G.x0-L)*y/q)),ye=Math.min(ee-1,Math.floor(((G.x1-L)*y+2)/q)),$e=Math.max(0,Math.floor((U-G.u1)*y/q)),Le=Math.min(O-1,Math.floor(((U-G.u0)*y+1)/q));for(let Oe=$e;Oe<=Le;Oe++)for(let Xe=se;Xe<=ye;Xe++)re[Oe*ee+Xe].push(he)});const ue=.25/y,Ce=(G,he)=>{const se=Math.max(g-Math.abs(G-he),0)/g;return Math.min(G,he)-se*se*g*.25};for(let G=0;G<B;G++)for(let he=0;he<I;he++){const se=re[Math.floor(G/q)*ee+Math.floor(he/q)];if(!se.length)continue;const ye=L+(he+.5-1)/y,$e=U-(G+.5)/y,Le=T.add(T.add(T.mul(x,ye),T.mul(m,$e)),T.mul(_,50));let Oe=1/0,Xe=-1/0;const Ye=[],St=[];for(const Je of se){const ze=b[Je],P=Tn(Le,ze.bc),v=It(P,p),F=ze.br+(ze.uw?0:g),W=It(P,P)-F*F,Z=v*v-W;if(Z<0)continue;if(ze.uw){St.push(ze);continue}if(ze.cut){Ye.push(ze);continue}const le=Math.sqrt(Z);Oe=Math.min(Oe,-v-le),Xe=Math.max(Xe,-v+le),Ye.push(ze)}let Pt=1/0,Kt=-1,xt=0,bt=null;if(Ye.length){const Je=new Map;for(const v of Ye){let F=Je.get(v.group);F||Je.set(v.group,F=[]),F.push(v)}const ze=(v,F)=>{let W=1/0;for(const Z of v)Z.cut||(W=W===1/0?Gr(Z,F):Ce(W,Gr(Z,F)));for(const Z of v)Z.cut&&(W=Math.max(W,-Gr(Z,F)));return W};let P=Math.max(0,Oe);for(let v=0;v<96&&P<Xe;v++){const F=T.add(Le,T.mul(p,P));let W=1/0,Z=null;for(const[le,de]of Je){const Q=ze(de,F);Q<W&&(W=Q,Z=le)}if(W<ue){const le=Je.get(Z),de=.5/y;bt=Bi([ze(le,[F[0]+de,F[1],F[2]])-ze(le,[F[0]-de,F[1],F[2]]),ze(le,[F[0],F[1]+de,F[2]])-ze(le,[F[0],F[1]-de,F[2]]),ze(le,[F[0],F[1],F[2]+de])-ze(le,[F[0],F[1],F[2]-de])]);let Q=le[0],te=1/0;for(const fe of le){if(fe.cut)continue;const De=Gr(fe,F);De<te&&(te=De,Q=fe)}for(const fe of le)if(fe.cut&&-Gr(fe,F)>te-ue*2){Q=fe;break}Pt=P,Kt=Z,xt=Q.paint?Q.paint(f(F),Q)??Q.mat:Q.mat;break}P+=Math.max(W*.9,ue*.5)}}for(const Je of St){const ze=It(p,Je.nw);if(Math.abs(ze)<1e-4)continue;const P=It(Tn(Je.cw,Le),Je.nw)/ze;if(P>=Pt)continue;const v=T.add(Le,T.mul(p,P)),F=Tn(v,Je.cw),W=It(F,Je.uw)/Je.su,Z=It(F,Je.vw)/Je.sv;if(Math.abs(W)>1||Math.abs(Z)>1)continue;const le=Je.mask(W,Z);if(!le)continue;let de=ze>0?T.mul(Je.nw,-1):Je.nw;de=Bi(T.add(de,T.add(T.mul(Je.uw,W*Je.bend),T.mul(Je.vw,Z*Je.bend*.5)))),Pt=P,Kt=Je.group,xt=le,bt=de}if(!bt||!xt)continue;const z=G*I+he;$[z]=Pt,ae[z]=Kt,V.px(he,G,xt,It(bt,x),-It(bt,m),It(bt,_))}const Fe=[];for(let G=0;G<B;G++)for(let he=0;he<I;he++){const se=G*I+he;if(V.m[se])for(const[ye,$e]of[[1,0],[-1,0],[0,1],[0,-1]]){const Le=he+ye,Oe=G+$e;if(Le<0||Oe<0||Le>=I||Oe>=B)continue;const Xe=Oe*I+Le;if(V.m[Xe]&&ae[Xe]!==ae[se]&&$[Xe]-$[se]>s){Fe.push(se);break}}}for(const G of Fe)[l.EYE,l.GLINT,l.MAGIC,l.MAGIC2,l.NOSE,l.COLLAR,l.WOKEN,l.RUNE,l.GLOW].includes(V.m[G])||(V.m[G]=l.LINE);for(let G=0;G<B;G++)for(let he=0;he<I;he++){const se=G*I+he;if(V.m[se]!==l.EYE)continue;const ye=G>0&&V.m[se-I]===l.EYE,$e=he>0&&V.m[se-1]===l.EYE,Le=he+1<I&&V.m[se+1]===l.EYE&&G+1<B&&V.m[se+I]===l.EYE;!ye&&!$e&&Le&&(V.m[se]=l.GLINT)}let He=-1;for(let G=B-1;G>=0&&He<0;G--)for(let he=0;he<I;he++)if(V.m[G*I+he]){He=G;break}const j=He>=0&&He<B-1?B-1-He:0;if(He>=0&&He<B-1){const G=B-1-He;for(let he=B-1;he>=0;he--)for(let se=0;se<I;se++){const ye=he*I+se,$e=(he-G)*I+se,Le=he-G>=0;V.m[ye]=Le?V.m[$e]:0,V.g[ye]=Le?V.g[$e]:0;for(let Oe=0;Oe<3;Oe++)V.n[ye*3+Oe]=Le?V.n[$e*3+Oe]:0}}return V.bodyH=Math.round((S-D)*y),{sp:V,s:y,project:G=>{const he=d(G);return[+((he[0]-L)*y+1).toFixed(1),+((U-It(he,m))*y+j).toFixed(1)]}}}const kn=(n,e=9,t=.3)=>Lt(Math.floor(n[0]*e),Math.floor(n[1]*e)+Math.floor(n[2]*e)*97,7)<t,Ir={wing:(n,e)=>(t,i)=>{const r=(t+1)/2,a=1-.35*r*r,s=-1+.55*r+.18*Math.abs(Math.sin(r*Math.PI*6));return i>a||i<s?null:i>a-.35*(1-r*.5)?e:Math.floor(r*9)%2?n:e},ear:(n,e=l.EAR,t=l.BODY3)=>(i,r)=>{const a=(r+1)/2,s=.95*Math.sin(Math.PI*Math.min(1,.15+a*.85))*(1-a*.35);return Math.abs(i)>s?null:a>.82?t:Math.abs(i)<s*.5&&a<.7&&a>.12?e:n},flame:(n,e)=>(t,i)=>{const r=(i+1)/2,a=Math.sin(Math.PI*Math.min(1,r*1.1))*(1-r)*1.4;return Math.abs(t)>a?null:Math.abs(t)<a*.45&&r<.6?e:n},membrane:n=>(e,t)=>{const i=(e+1)/2,r=-1+.35*Math.abs(Math.sin(i*Math.PI*3));return t<r||t>1-.2*i?null:n},spotted:(n,e,t)=>(i,r)=>{if(Math.hypot(i,r*1.2)>1)return null;const s=Math.hypot(i-.35,r-.1);return s<.18?t:s<.3?e:n}},yh={hair:l.HAIR,hat:l.HAT,headphones:l.PHONES,top:l.TOP,jacket:l.JACKET,jeans:l.JEANS,sneakers:l.SHOES,broom:l.BROOM,bristles:l.STRAW,skin:l.SKIN},Gl={hair:[.01,.7,.85],hat:[.74,.45,.45],headphones:[.92,.55,.9],top:[.13,.15,.95],jacket:[.72,.45,.7],jeans:[.6,.5,.7],sneakers:[0,0,.95],broom:[.08,.55,.55],bristles:[.12,.55,.9],skin:[.07,.3,.94]};function wh(n,e=Gl){const t={...Gl,...e},i={hair:n.hairHue,jacket:n.cloakHue,hat:n.hatHue,top:n.topHue,jeans:n.jeansHue,sneakers:n.shoeHue,headphones:n.phonesHue},r={};for(const[a,s]of Object.entries(yh)){const[o,c,u]=t[a];r[s]=pe(i[a]??o,c,u)}return r[l.EYE]=[24,18,30],r[l.GLINT]=[255,255,245],r[l.NOSE]=[20,16,24],r[l.MAGIC]=pe(n.glowHue??.13,.5,1),r[l.MAGIC2]=pe(n.glowHue??.13,.15,1),r[l.BELLY]=[245,245,240],r}const Ah={rise:.78,descend:-.66,brake:.44};function Th(n){const e=new et({blend:.03}),t=n%3,i=.5,r=.05,a=[[0,.02,-.01],[.02,-.01,.02],[-.01,.015,.01]][t],s=m=>i-r*(m/.62);e.seg([-.5,s(-.5),0],[.62,s(.62),0],.022,.018,l.BROOM,{group:2}),e.ell([-.64,s(-.64)+.005,0],[.2,.1,.11],l.STRAW,{dir:[1,r*1.6,0],group:3,paint:m=>m[0]<-.76?l.MAGIC2:m[0]>-.5?l.BROOM:void 0});const o=[-1,1].map(m=>[.5,s(.5)+.03,m*.045]),c=[-1,1].map(m=>[.2,i+.24+a[1],m*.1]);for(const m of[0,1]){const x=m?1:-1,_=x>0?7:5;e.seg(c[m],o[m],.04,.03,l.JACKET,{group:_}),e.ell(o[m],[.035,.03,.035],l.SKIN,{group:_})}const u=[.3+a[0],i+.27+a[1],0],h=[.07,i+.28+a[1]*.5,0],d=[-.15,i+.35+a[2],0];e.ell(h,[.17,.1,.11],l.JACKET,{dir:[1,-.25,0],group:1,paint:m=>m[1]<h[1]-.04&&Math.abs(m[2])<.055?l.TOP:void 0}),e.ell(d,[.11,.08,.1],l.JEANS,{dir:[1,-.3,0],group:1}),e.chain([[...T.add(d,[-.02,.06,0]),.07],[...T.add(d,[-.18,.08+a[0]*2,0]),.05],[...T.add(d,[-.34,.05+a[1]*3,.02]),.025]],l.JACKET,{group:12}),[[[-.32,i+.5+a[1]*2,-.07],[-.46,i+.38+a[0]*2,-.08]],[[-.34,i+.33+a[2]*2,.08],[-.55,i+.44-a[1]*3,.1]]].forEach(([m,x],_)=>{const g=_?6:4,M=T.add(d,[-.04,0,_?.06:-.06]);e.seg(M,m,.055,.045,l.JEANS,{group:g}),e.seg(m,x,.045,.04,l.JEANS,{group:g}),e.ell(T.add(x,[-.05,0,0]),[.08,.04,.045],l.SHOES,{dir:[-1,.3,0],group:g,paint:E=>E[1]<x[1]-.03?l.BELLY:void 0})}),e.ell(u,[.11,.115,.1],l.SKIN,{group:8,paint:m=>m[0]<u[0]-.01||m[1]>u[1]+.075?l.HAIR:void 0});for(const m of[-1,1]){const x=et.surface(u,[.11,.115,.1],T.norm([.85,.1,m*.45]));e.ell(x,[.026,.036,.026],l.BELLY,{group:8}),e.ell(T.add(x,[.012,0,m*.004]),[.014,.018,.014],l.EYE,{group:8})}e.ell(et.surface(u,[.11,.115,.1],T.norm([1,-.45,0])),[.012,.016,.04],l.BELLY,{group:8}),e.chain([[...T.add(u,[-.06,.03,0]),.065],[...T.add(u,[-.22,.05+a[1]*2,.01]),.05],[...T.add(u,[-.4,.06+a[2]*3,.02]),.03],[...T.add(u,[-.55,.07+a[0]*3,.02]),.012]],l.HAIR,{group:9});for(const m of[-1,1])e.ell(T.add(u,[-.015,0,m*.105]),[.05,.055,.03],l.PHONES,{group:10});e.chain([[...T.add(u,[-.005,.03,-.095]),.015],[...T.add(u,[-.02,.12,0]),.015],[...T.add(u,[-.005,.03,.095]),.015]],l.PHONES,{group:10});const p=T.add(u,[-.1+a[0],.2+a[1]*2,0]);e.ell(p,[.16,.014,.15],l.HAT,{dir:[1,.9,0],group:11}),e.chain([[...T.add(p,[-.02,.02,0]),.08],[...T.add(p,[-.14,.13,0]),.04],[...T.add(p,[-.3,.14+a[2]*2,0]),.012]],l.HAT,{group:11,paint:m=>Math.hypot(m[0]-p[0],m[1]-p[1])<.06?l.MAGIC:void 0}),e.seg(T.add(p,[.08,-.02,.08]),T.add(u,[.04,-.09,.08]),.008,.008,l.HAT,{group:11}),e.anchors.hand=o[1],e.anchors.hatTip=T.add(p,[-.3,.14+a[2]*2,0]);for(const[m,x,_,g]of[[-.86,s(-.8)+.05,.03,.22],[-.88,s(-.8)-.04,-.04,.16],[-.7,i+.45,.05,.14],[-.2,i+.5,-.04,.12]]){const M=t*.05%.1;e.seg([m-M,x,_],[m-M-g,x,_],.01,.004,l.MAGIC2,{group:30,extra:!0})}return e.ell([.02,.005,0],[.2,.005,.12],l.NOSE,{group:0}),e}const Rh={stand:{frames:3,fps:3},land:{frames:3,fps:10},takeoff:{frames:3,fps:10},talk:{frames:4,fps:2.5},placeSigil:{frames:3,fps:6},liftSigil:{frames:3,fps:6},sit:{frames:2,fps:1.5}},co=.34,eu={binding:[-.02,.31,-.2],dir:[.02,1,-.04]},Ch={stand:[0,1,2].map(n=>({breathe:[0,.006,.012][n],sway:[0,.02,.035][n],free:[.04,.5+[0,.006,.012][n],.18],hand:"rest",broom:eu})),land:[{crouch:.2,hop:.01,broom:{astride:!0},sway:.05},{crouch:.1,bend:.1,broom:{binding:[-.28,.26,-.08],dir:[.6,.5,-.06]},legUp:[.18,.24,.12],sway:.03,free:[.2,.58,.2],hand:"rest"},{breathe:.004,broom:{binding:[.06,.31,-.2],dir:[.18,1,-.03]},sway:.015,free:[.06,.52,.19],hand:"rest"}],takeoff:[{crouch:.1,broom:{binding:[-.1,.3,-.17],dir:[.35,.7,-.04]},free:[.16,.58,.2],hand:"rest",sway:.02},{crouch:.15,bend:.1,broom:{binding:[-.3,.28,-.06],dir:[.7,.4,-.04]},legUp:[.1,.26,.13],sway:.04,free:[.24,.55,.17],hand:"rest"},{hop:.1,broom:{astride:!0},toes:!0,sway:.06}],talk:[{free:[.47,.84,.13],hand:"palm",tilt:.35,mouth:!0,sway:.01},{free:[.32,1.18,.12],hand:"point",tilt:-.25,look:.12,sway:.02},{free:[.24,1.16,.3],elbow:[.26,.88,.26],hand:"wave",tilt:.45,mouth:!0,sway:.03},{free:[.15,.76,.1],hand:"chest",tilt:-.35,breathe:.01,sway:.015}],placeSigil:[{free:[.16,1.62,.1],hand:"palm",look:.22,breathe:.01,sway:.02},{free:[.42,1,.12],hand:"palm",look:.08,sway:.03},{crouch:.7,bend:.55,free:[.38,.1,.13],hand:"down",look:-.08,sway:.04}],liftSigil:[{crouch:.7,bend:.55,free:[.36,.08,.13],hand:"down",look:-.08,sway:.02},{crouch:.25,bend:.18,free:[.44,.82,.12],hand:"palm",look:.05,sway:.04},{breathe:.012,free:[.2,1.64,.1],hand:"palm",look:.25,sway:.05,toes:!0}],sit:[0,1].map(n=>({sit:!0,swing:[.06,-.06][n],bend:-.08,look:[.02,.1][n],tilt:[.15,-.2][n],sway:[.01,.03][n],breathe:[0,.008][n],broom:{binding:[-.24,.31,-.3],dir:[.32,1,-.06]},free:[.2,co+.14,.15],far:[.18,co+.14,-.13],hand:"rest"}))};function Lh(n,e,t){const i=Math.hypot(e[0]-n[0],e[1]-n[1]),r=T.lerp(n,e,.5);if(i>=2*t)return r;const a=Math.sqrt(t*t-i*i/4),s=(e[0]-n[0])/i,o=(e[1]-n[1])/i;return[r[0]-o*a,r[1]+s*a,r[2]]}function Dh(n,e){const t=Ch[n],i={crouch:0,bend:0,hop:0,breathe:0,sway:0,tilt:0,look:0,broom:eu,...t[e%t.length]},r=new et({blend:.03}),a=i.hop,s=i.sway,o=i.sit?co+.06:.45-i.crouch*.21+a,c=-i.crouch*.12,u=!!i.broom.astride,h=o-.04,d=u?[1,0,0]:T.norm(i.broom.dir),f=u?[-.36,h,0]:i.broom.binding,p=y=>T.add(f,T.mul(d,y));r.seg(p(0),p(u?.98:1.1),.022,.018,l.BROOM,{group:2}),r.ell(p(-.13),[.17,.07,.08],l.STRAW,{dir:d,group:3,paint:y=>{const L=T.dot(T.sub(y,f),d);return L<-.22?l.MAGIC2:L>-.01?l.BROOM:void 0}});for(const y of[-1,1]){const L=y>0?6:4,C=[c,o,y*.07],N=i.sit?i.swing*y:0,U=i.sit?[.24+N,.09+Math.max(0,N)*.6,y*.1]:y>0&&i.legUp?i.legUp:[(y>0?.05:-.01)+(i.toes?-.03:0),.07+(i.toes?a*.4:a),y*.1],I=i.sit?[.21,o+.01,y*.09]:Lh(C,U,.21);r.seg(C,I,.055,.045,l.JEANS,{group:L}),r.seg(I,U,.045,.04,l.JEANS,{group:L});const B=i.toes?[.03,-.045,0]:[.05,-.03,0];r.ell(T.add(U,B),[.08,.04,.045],l.SHOES,{dir:i.toes?[1,-.6,0]:[1,0,0],group:L,paint:V=>V[1]<U[1]+B[1]-.015?l.BELLY:void 0})}const m=[Math.sin(i.bend),Math.cos(i.bend),0],x=[Math.cos(i.bend),-Math.sin(i.bend),0],_=[c,o+.03,0];r.ell(_,[.1,.08,.105],l.JEANS,{group:1});const g=T.add(_,T.add(T.mul(m,.19),[0,i.breathe,0]));r.ell(g,[.1,.15+i.breathe*.5,.115],l.JACKET,{dir:x,group:1,paint:y=>T.dot(T.sub(y,g),x)>.045&&Math.abs(y[2])<.05?l.TOP:void 0}),r.chain([[...T.add(g,T.add(T.mul(x,-.07),T.mul(m,-.08))),.07],[...T.add(g,T.add(T.mul(x,-.11-s),T.mul(m,-.2))),.05],[...T.add(g,T.add(T.mul(x,-.13-s*1.6),T.mul(m,-.29))),.025]],l.JACKET,{group:12});const M=T.add(g,T.add(T.mul(m,.27),[i.look*.03,0,i.tilt*.04])),E=y=>T.add(g,T.add(T.mul(m,.1),[0,0,y*.12])),b=u?[.28,h+.03,-.05]:p(Math.max(.12,(Math.min(.62,o+.2)-f[1])/Math.max(.3,d[1]))),R=u?[.28,h+.03,.05]:i.free;for(const y of[-1,1]){const L=y>0?7:5,C=E(y),N=y>0?R:i.far||b,U=y>0&&i.elbow?i.elbow:T.add(T.lerp(C,N,.5),[-.03,-.02,y*.05]);r.seg(C,U,.04,.035,l.JACKET,{group:L}),r.seg(U,N,.035,.03,l.JACKET,{group:L});const I=y>0&&!u?i.hand:"grip";if(I==="palm")r.ell(N,[.045,.02,.04],l.SKIN,{group:L});else if(I==="down")r.ell(N,[.045,.02,.04],l.SKIN,{dir:[1,.15,0],group:L});else if(I==="wave"){r.ell(N,[.03,.045,.04],l.SKIN,{group:L});for(const B of[-1,0,1])r.seg(T.add(N,[0,.03,B*.02]),T.add(N,[B*.01,.065,B*.03]),.01,.008,l.SKIN,{group:L})}else I==="point"?(r.ell(N,[.035,.03,.035],l.SKIN,{group:L}),r.seg(T.add(N,[0,.02,0]),T.add(N,[.01,.08,0]),.012,.01,l.SKIN,{group:L})):r.ell(N,[.035,.03,.035],l.SKIN,{group:L})}r.ell(M,[.11,.115,.1],l.SKIN,{group:8,paint:y=>y[0]<M[0]-.01||y[1]>M[1]+.075?l.HAIR:void 0});for(const y of[-1,1])r.ell(et.surface(M,[.11,.115,.1],T.norm([.85,.05+i.look,y*.45+i.tilt*.1])),[.016,.026,.016],l.EYE,{group:8});i.mouth&&r.ell(et.surface(M,[.11,.115,.1],T.norm([1,-.5+i.look,i.tilt*.1])),[.012,.016,.025],l.NOSE,{group:8}),r.chain([[...T.add(M,[-.06,.02,0]),.06],[...T.add(M,[-.12-s,-.12,.02+i.tilt*.03]),.05],[...T.add(M,[-.13-s*1.5,-.25,.03+i.tilt*.04]),.03]],l.HAIR,{group:9});for(const y of[-1,1])r.ell(T.add(M,[-.015,0,y*.105]),[.05,.055,.03],l.PHONES,{group:10});r.chain([[...T.add(M,[-.005,.03,-.095]),.015],[...T.add(M,[-.005,.11,-.05]),.015],[...T.add(M,[-.005,.125,0]),.015],[...T.add(M,[-.005,.11,.05]),.015],[...T.add(M,[-.005,.03,.095]),.015]],l.PHONES,{group:10});const w=T.add(M,[-.03,.1,i.tilt*.02]),D=i.tilt*.05,S=T.add(w,[-.16-s*.5,.27,D*2]);return r.ell(w,[.16,.014,.15],l.HAT,{dir:[1,.25-i.look*.8,i.tilt*.3],group:11}),r.chain([[...T.add(w,[0,.01,0]),.085],[...T.add(w,[-.05,.17,D]),.045],[...S,.012]],l.HAT,{group:11,paint:y=>y[1]<w[1]+.045?l.MAGIC:void 0}),r.ell([.02,.005,0],[.2,.005,.12],l.NOSE,{group:0}),r.anchors.hand=R,r.anchors.hatTip=S,r}function tu({frame:n=0,lean:e=!1,pose:t}={}){if(t==="fast")return Th(n);if(Rh[t])return Dh(t,n);const i=t==="rise",r=t==="descend",a=t==="brake",s=i||r||a,o=new et({blend:.03}),c=s?0:[0,.025,.045][n%3],u=s?0:[0,.015,-.01][n%3]+(e?.08:0),h=.42+c,d=i?.3:r?-.27:a?-.12:e?.1:0,f=Math.min(.1,Math.max(0,d)),p=s?[.02,.06][n%2]:[0,.03,.05][n%3],m=r?1:i?-.6:0;o.seg([-.5,h-u*2,0],[.62,h+u*3,0],.022,.018,l.BROOM,{group:2}),a?o.ell([-.56,h-.08,0],[.17,.07,.09],l.STRAW,{dir:[.55,1,0],group:3,paint:E=>E[1]<h-.18?l.MAGIC2:E[1]>h-.01?l.BROOM:void 0}):o.ell([-.62,h-u*2-.01,0],[.17,.07,.08],l.STRAW,{dir:[1,u,0],group:3,paint:E=>E[0]<-.72?l.MAGIC2:E[0]>-.5?l.BROOM:void 0});for(const E of[-1,1]){const b=[-.04,h+.06,E*.07],R=a?[.18,h-.01,E*.14]:r?[.16,h-.05,E*.14]:i?[.06,h-.07,E*.14]:[.12+d*.5,h-.02,E*.14],w=a?E>0?[.44,h-.02+p,E*.13]:[.3,h-.16,E*.13]:r?[.2,h-.26,E*.13]:i?[-.1,h-.23,E*.13]:[.08+d,h-.2,E*.13];o.seg(b,R,.055,.045,l.JEANS,{group:E>0?6:4}),o.seg(R,w,.045,.04,l.JEANS,{group:E>0?6:4}),o.ell(T.add(w,[.05,-.02,0]),[.08,.04,.045],l.SHOES,{group:E>0?6:4,paint:D=>D[1]<w[1]-.04?l.BELLY:void 0})}o.ell([-.04,h+.08,0],[.11,.07,.1],l.JEANS,{group:1});const x=[0+d*.8,h+.26-Math.abs(d)*.3,0];o.ell(x,[.1,.16,.11],l.JACKET,{dir:[d*2.5,1,0],up:[-1,0,0],group:1,paint:E=>E[0]>x[0]+.04&&Math.abs(E[2])<.055?l.TOP:void 0}),a?o.chain([[...T.add(x,[-.08,-.06,0]),.07],[...T.add(x,[-.02,.12+p,.02]),.05],[...T.add(x,[.14,.18+p,.03]),.025]],l.JACKET,{group:12}):s&&o.chain([[...T.add(x,[-.08,-.1,0]),.07],[...T.add(x,[-.2,-.12+m*(.08+p),0]),.05],[...T.add(x,[-.3,-.12+m*(.16+p*1.5),.02]),.025]],l.JACKET,{group:12});const _=T.add(x,[.03+d*.5,.26,0]),g=T.add(_,[a?.05:r?-.01:-.03,a?.06:.1,0]);for(const E of[-1,1]){const b=T.add(x,[.01,.11,E*.11]),R=r&&E>0?T.add(g,[.1,.01,.1]):a?[.3,h+.03,E*.05]:[.26+d,h+.03,E*.05],w=r&&E>0?T.add(b,[.1,.02,.1]):T.lerp(b,R,.5);o.seg(b,w,.04,.035,l.JACKET,{group:E>0?7:5}),o.seg(w,R,.035,.03,l.JACKET,{group:E>0?7:5}),o.ell(R,[.035,.03,.035],l.SKIN,{group:E>0?7:5}),E>0&&(o.anchors.hand=R)}o.ell(_,[.11,.115,.1],l.SKIN,{group:8,paint:E=>E[0]<_[0]-.01||E[1]>_[1]+.075?l.HAIR:void 0});for(const E of[-1,1])o.ell(et.surface(_,[.11,.115,.1],T.norm([.85,.05,E*.45])),[.016,.026,.016],l.EYE,{group:8});a?o.chain([[...T.add(_,[-.06,.06,0]),.06],[...T.add(_,[.04,.13+p,.03]),.045],[...T.add(_,[.2,.08+p,.04]),.02]],l.HAIR,{group:9}):o.chain([[...T.add(_,[-.06,.02,0]),.06],[...T.add(_,[-.18-f,-.05+p+m*.1,.02]),.045],[...T.add(_,[-.3-f*1.5,-.08+p*1.6+m*.22,.03]),.02]],l.HAIR,{group:9});for(const E of[-1,1])o.ell(T.add(_,[-.015,0,E*.105]),[.05,.055,.03],l.PHONES,{group:10});o.chain([[...T.add(_,[-.005,.03,-.095]),.015],[...T.add(_,[-.005,.11,-.05]),.015],[...T.add(_,[-.005,.125,0]),.015],[...T.add(_,[-.005,.11,.05]),.015],[...T.add(_,[-.005,.03,.095]),.015]],l.PHONES,{group:10});const M=i?.1:0;if(o.ell(g,[.16,.014,.15],l.HAT,{dir:a?[1,-.55,0]:[1,.25+M*3,0],group:11}),o.anchors.hatTip=a?T.add(g,[.2,.22+p*.5,0]):T.add(g,[-.16-f*1.5-M,.27+p*.5-M*.5,0]),o.chain(a?[[...T.add(g,[0,.01,0]),.085],[...T.add(g,[.06,.16,0]),.045],[...T.add(g,[.2,.22+p*.5,0]),.012]]:[[...T.add(g,[0,.01,0]),.085],[...T.add(g,[-.05-f-M*.5,.17-M*.3,0]),.045],[...T.add(g,[-.16-f*1.5-M,.27+p*.5-M*.5,0]),.012]],l.HAT,{group:11,paint:E=>E[1]<g[1]+.045?l.MAGIC:void 0}),s){const E=Ah[t]+(a?[0,.06][n%2]:0),b=Math.cos(E),R=Math.sin(E),w=[0,h,0],D=C=>[w[0]+(C[0]-w[0])*b-(C[1]-w[1])*R,w[1]+(C[0]-w[0])*R+(C[1]-w[1])*b,C[2]],S=C=>[w[0]+(C[0]-w[0])*b+(C[1]-w[1])*R,w[1]-(C[0]-w[0])*R+(C[1]-w[1])*b,C[2]],y=C=>[C[0]*b-C[1]*R,C[0]*R+C[1]*b,C[2]];for(const C of o.parts)if(C.type==="ell"?(C.c=D(C.c),C.axes=C.axes.map(y)):(C.a=D(C.a),C.b=D(C.b)),C.paint){const N=C.paint;C.paint=(U,I)=>N(S(U),I)}for(const C of o.flats)C.c=D(C.c),C.u=y(C.u),C.v=y(C.v);o.anchors.hand=D(o.anchors.hand),o.anchors.hatTip=D(o.anchors.hatTip);const L=Math.min(...o.parts.map(C=>C.type==="ell"?C.c[1]-Math.max(...C.r):Math.min(C.a[1]-C.r1,C.b[1]-C.r2)));if(L<.08){for(const C of o.parts){const N=.08-L;C.type==="ell"?C.c=[C.c[0],C.c[1]+N,C.c[2]]:(C.a=[C.a[0],C.a[1]+N,C.a[2]],C.b=[C.b[0],C.b[1]+N,C.b[2]])}for(const C of["hand","hatTip"])o.anchors[C]=T.add(o.anchors[C],[0,.08-L,0])}if(a){const C=D([-.45,h-.24,0]);for(let N=0;N<5;N++){const U=N+n*.5,I=.055-N*.008;o.ell([C[0]+.1+U*.08,Math.max(.04,C[1]-.02+Math.sin(U*1.9)*.04),Math.cos(U*1.3)*.06],[I,I*.8,I],N<2?l.BELLY:N%2?l.MAGIC:l.MAGIC2,{group:25+N,extra:!0})}}if(i){const C=D([-.8,h,0]);for(let N=0;N<5;N++){const U=N+n*.5,I=.05-N*.007;o.ell([C[0]-.02+Math.sin(U*2.1)*.06,Math.max(.04,C[1]-.08-U*.09),Math.cos(U*1.7)*.05],[I,I,I],N%2?l.MAGIC:l.MAGIC2,{group:20+N,extra:!0})}}}return o.ell([.02,.005,0],[.2,.005,.12],l.NOSE,{group:0}),o}const nu=(n={})=>Math.round((n.size||8)*Math.sqrt(n.growth||20)*(2/(n.pixel||3))*1.9),As=new Map,uo=n=>(As.has(n)||As.set(n,Mi(tu({frame:0}),{height:n}).s),As.get(n)),iu=(n={})=>uo(nu(n)),Ph={away:-Math.PI/2,towards:Math.PI/2};function Ih(n={},{frame:e=0,lean:t=!1,facing:i="towards",pose:r,heading:a="side"}={}){const s=nu(n),o=Ph[a],c=tu({frame:e,lean:t,pose:r}),{sp:u,project:h,s:d}=o!==void 0?Mi(c,{scale:uo(s),yaw:o}):r?Mi(c,{scale:uo(s),facing:i}):Mi(c,{height:s,facing:i});u.scale=d,c.anchors.hand&&(u.anchors={hand:h(c.anchors.hand),hatTip:h(c.anchors.hatTip)});let f=0;for(let p=0;p<400&&f<6;p++){const m=p*37%u.w,x=p*53%Math.floor(u.h*.8);u.get(m,x)||u.get(m+1,x)||u.get(m-1,x)||u.get(m,x+1)||u.get(m,x-1)||(m*7+x*13+e*5)%11||(u.px(m,x,l.MAGIC2),f++)}return u}const rt=(n,e=0)=>{const t=Math.sin(n*127.1+e*311.7)*43758.5453;return t-Math.floor(t)},Er=n=>{const e=rt(Math.floor(n[0]*14)+Math.floor(n[2]*14)*13,Math.floor(n[1]*6));return e<.14?l.BARKD:e>.88?l.BARKL:void 0},Nh=n=>e=>{const t=rt(Math.floor(e[0]*10),Math.floor(e[1]*10)+Math.floor(e[2]*10)*7);return e[1]<n[1]-.2||t<.2?l.LEAF3:t>.8?l.LEAF2:void 0},li=(n,e,t,i,r=!0)=>n.ell(e,t,l.STONE,{group:i,rough:.025,paint:a=>a[1]>e[1]+t[1]*.45&&r?l.MOSS:Math.abs(Math.sin(a[0]*13+a[2]*7))<.06?l.STONED:void 0}),Ma=(n,e,t,i)=>n.ell(e,t,l.LEAF,{group:i,rough:.04,paint:Nh(e)}),$t=(n,e,t)=>n.chain(e,l.TRUNK,{group:t,rough:.012,paint:Er}),va=(n,e,t,i,r,a=.3,s=l.LEAF2)=>{for(let o=0;o<e;o++){const c=rt(r,o)*6.283,u=t*Math.sqrt(rt(o,r)),h=Math.cos(c)*u,d=Math.sin(c)*u*.7;n.ell([h,a*.3,d],[.07,a*(.35+rt(o,4)*.3),.07],s,{group:i+o%3,paint:f=>f[1]>a*.45?l.LEAF:void 0})}},Sa=(n,e,t,i)=>n.ell(e,[t[0],.015,t[1]],l.WATER,{group:i}),Uh={"sleeping-giant"(n){const e=t=>i=>{const r=rt(Math.floor(i[0]*8),Math.floor(i[2]*8)+Math.floor(i[1]*8)*5);return r<.15?l.LEAF3:r>.86?l.LEAF2:void 0};for(const[t,i]of[[[.85,.42,0],[.7,.5,.66]],[[0,.3,0],[.62,.36,.6]],[[-.8,.3,0],[.56,.36,.62]],[[1.85,.5,.02],[.5,.5,.48]],[[-1.55,.72,.3],[.38,.5,.3]],[[-1.55,.72,-.3],[.38,.5,.3]],[[-2.2,.3,.32],[.42,.3,.26]],[[-2.2,.3,-.32],[.42,.3,.26]],[[.6,.2,.78],[.75,.2,.2]],[[.6,.2,-.78],[.75,.2,.2]]])n.ell(t,i,l.MOSS,{group:1,rough:.03,paint:e()});li(n,[2.25,.75,.12],[.13,.15,.11],2,!1);for(const t of[-.12,.22])n.ell([2.12,.88,t],[.08,.04,.07],l.STONED,{group:3});li(n,[-.2,.16,.95],[.2,.15,.18],4),li(n,[-.2,.16,-.95],[.18,.14,.16],5),n.ell([2,.95,.02],[.42,.14,.4],l.LEAF3,{group:6,rough:.03}),va(n,26,2.8,10,3,.3)},"fern-grotto"(n){n.ell([0,.16,0],[.78,.2,.72],l.STONE,{group:1,rough:.015,paint:e=>e[1]>.3?l.MOSS:void 0}),Sa(n,[0,.345,0],[.55,.5],2);for(let e=0;e<6;e++){const t=e/6*Math.PI*2+.4,i=1.5+rt(e)*.3,r=[Math.cos(t)*i,0,Math.sin(t)*i*.8],a=1.1+rt(e,2)*.7,s=T.add(r,[0,a,0]);n.seg(r,s,.12,.09,l.TRUNK,{group:3+e,rough:.02,paint:Er});for(let o=0;o<7;o++){const c=o/7*Math.PI*2+e,u=[Math.cos(c),0,Math.sin(c)];n.chain([[...s,.05],[...T.add(s,T.add(T.mul(u,.45),[0,.18,0])),.04],[...T.add(s,T.add(T.mul(u,.9),[0,-.15,0])),.015]],o%2?l.LEAF:l.LEAF2,{group:10+e})}}for(let e=0;e<5;e++){const t=e*1.3;li(n,[Math.cos(t)*.95,.08,Math.sin(t)*.95],[.16,.12,.14],20+e)}},"sunken-boat"(n){Sa(n,[.3,.01,.15],[1.9,1.15],1);const e=[0,.12,0],t=T.norm([1,.28,.12]);n.ell(e,[1.3,.45,.55],l.WOOD,{dir:t,group:2,paint:i=>(T.dot(T.sub(i,e),[0,1,0])*9+9)%1<.14?l.BARKD:i[1]>.35&&rt(Math.floor(i[0]*9))<.4?l.MOSS:void 0}),n.ell(T.add(e,[0,.14,0]),[1.2,.4,.47],l.BARKD,{dir:t,group:2,cut:!0});for(let i=-2;i<=2;i++)n.seg(T.add(e,T.add(T.mul(t,i*.4),[0,.1,-.42])),T.add(e,T.add(T.mul(t,i*.4),[0,.1,.42])),.04,.04,l.WOOD,{group:3});n.seg([-.9,.05,.7],[.3,1,.55],.03,.03,l.WOOD,{group:4}),n.box([-.98,.06,.72],[.2,.02,.07],l.WOOD,{dir:[1.2,-.8,-.15],group:4}),va(n,18,2.2,10,5,.45)},"bramble-wagon"(n){const e=T.norm([1,-.12,0]);n.box([0,.62,0],[1.1,.22,.52],l.WOOD,{dir:e,round:.04,group:1,paint:t=>(t[0]+3)*4%1<.08?l.BARKD:void 0}),n.box([0,.72,0],[1,.2,.43],l.BARKD,{dir:e,group:1,cut:!0});for(const[t,i,r,a]of[[-.72,.55,.4,.4],[-.72,-.55,.4,.4],[.72,-.55,.32,.37]])n.ell([t,r,i],[a,a,.06],l.WOOD,{group:2+(t>0?1:0)+(i>0?2:0),paint:s=>{const o=s[0]-t,c=s[1]-r,u=Math.hypot(o,c),h=Math.atan2(c,o);return u>a*.82||u<a*.18?l.BARKD:Math.abs(Math.sin(h*4))<.2?l.WOOD:l.NOSE}});n.ell([.95,.1,.75],[.37,.06,.37],l.WOOD,{group:7,paint:t=>Math.hypot(t[0]-.95,t[2]-.75)>.3?l.BARKD:void 0});for(const t of[-.3,.3])n.seg([1.05,.55,t],[1.9,.05,t*1.4],.04,.035,l.WOOD,{group:8});for(let t=0;t<14;t++){const i=rt(t,1)*6.283,r=Math.cos(i)*1.5,a=Math.sin(i)*.9,s=[[r,0,a,.03]];for(let o=1;o<4;o++)s.push([r*(1-o*.28)+(rt(t,o)-.5)*.5,.25+o*.25+rt(o,t)*.2,a*(1-o*.3)+(rt(o,t*3)-.5)*.4,.025-o*.004]);if(n.chain(s,l.BARKD,{group:10+t%3}),t%2===0){const o=s[3];n.ell([o[0],o[1],o[2]],[.18,.13,.16],l.LEAF,{group:14,rough:.03,paint:c=>rt(Math.floor(c[0]*30),Math.floor(c[1]*30))<.1?l.ACCENT:void 0})}}},"beehive-tree"(n){for(const[t,i,r]of[[-.2,0,-.25],[.15,-.1,.2],[0,.15,.05]])$t(n,[[t,0,i,.22],[t+r*.8,1.4,i,.16],[t+r*2,2.8,i-.1,.08]],1);for(const[t,i]of[[[-.6,2.9,-.2],[.9,.6,.7]],[[.6,3,-.2],[.85,.6,.7]],[[0,3.4,-.3],[.9,.55,.7]]])Ma(n,t,i,3);$t(n,[[.2,1.9,-.05,.08],[.75,2.05,.15,.05]],2);const e=[.72,1.6,.2];n.ell(e,[.24,.42,.22],l.STRAW,{group:4,paint:t=>{const i=Math.floor((t[1]-e[1])*14),r=Math.floor(Math.atan2(t[2]-e[2],t[0]-e[0])*3+i%2*.5);return rt(i,r)<.3?l.BARK2:void 0}}),n.seg([.75,2.02,.15],[.72,1.9,.2],.05,.1,l.STRAW,{group:4});for(let t=0;t<6;t++){const i=t*1.9;n.ell([e[0]+Math.cos(i)*.45,e[1]+Math.sin(t*2.3)*.35,e[2]+Math.sin(i)*.35],[.03,.025,.03],l.MAGIC,{group:20+t,extra:!0})}},"fairy-ring"(n){n.ell([0,.005,0],[1.9,.005,1.5],l.LEAF3,{group:0});for(let e=0;e<9;e++){const t=e/9*Math.PI*2,i=[Math.cos(t)*1.6,0,Math.sin(t)*1.25],r=.35+rt(e)*.35;n.box(T.add(i,[0,r/2,0]),[.13,r/2,.1],l.STONE,{dir:[-Math.sin(t),0,Math.cos(t)],round:.05,rough:.015,group:1+e,paint:s=>e===2&&Math.abs(s[1]-r*.55)<r*.22&&Math.abs(s[0]-i[0]-0)<.05?l.RUNE:s[1]>r*.85?l.MOSS:void 0});const a=T.add(i,[Math.cos(t+.35)*.25,0,Math.sin(t+.35)*.2]);n.seg(a,T.add(a,[0,.16,0]),.035,.03,l.CLOTH,{group:12}),n.ell(T.add(a,[0,.18,0]),[.1,.06,.1],l.ACCENT,{group:13,paint:s=>rt(Math.floor(s[0]*60),Math.floor(s[2]*60))<.15?l.BELLY:void 0})}},"charcoal-hut"(n){const e=[0,2,0];for(let i=0;i<20;i++){const r=i/20*Math.PI*2;Math.abs(r-1.2)<.35||n.seg([Math.cos(r)*.95,0,Math.sin(r)*.8],T.add(e,[Math.cos(r)*.08,.1+rt(i)*.25,Math.sin(r)*.08]),.05,.03,i%3?l.TRUNK:l.BARKD,{group:1+i%2})}n.ell([0,.6,0],[.85,.6,.7],l.BARKD,{group:3});const t=[1.7,0,.3];n.ell(t,[.85,.42,.7],l.BARKD,{group:4,rough:.03,paint:i=>rt(Math.floor(i[0]*14),Math.floor(i[2]*14)+Math.floor(i[1]*14))<.07?l.GLOW:i[1]>.3?l.SHADES:void 0});for(let i=0;i<4;i++)n.seg([-1.4,.1+i*.14,-.5+i%2*.05],[-1.4,.1+i*.14,.5],.07,.07,l.TRUNK,{group:5+i%2,paint:r=>Math.abs(r[2])>.46?l.BARKL:void 0})},"root-arch"(n){$t(n,[[-1.8,0,.1,.4],[-1.4,1.2,0,.34],[-.4,2.3,-.1,.3],[.6,2.4,0,.28],[1.5,1.4,.1,.32],[1.9,0,.15,.38]],1),$t(n,[[-1.4,0,-.6,.28],[-.6,1.6,-.5,.22],[.5,1.9,-.45,.2],[1.3,.9,-.4,.22],[1.5,0,-.35,.26]],2),$t(n,[[-1.8,.2,.1,.3],[-2.4,.05,.5,.12]],1),$t(n,[[1.9,.2,.15,.3],[2.5,.05,.55,.12]],1);for(const[e,t]of[[[-.2,2.6,-.2],[.7,.35,.5]],[[.8,2.5,-.25],[.55,.3,.45]]])Ma(n,e,t,4);for(let e=0;e<4;e++)li(n,[-.7+e*.45,.12,(rt(e)-.5)*.5],[.22,.18,.2],6+e);n.box([0,.35,-.2],[.16,.35,.08],l.STONE,{round:.05,rough:.01,group:11,paint:e=>Math.abs(e[1]-.4)<.14&&Math.abs(e[0])<.05?l.MAGIC:e[1]>.62?l.MOSS:void 0})},"turf-hut"(n){n.box([0,.55,0],[1,.55,.7],l.WOOD,{round:.04,group:1,paint:o=>o[1]*7%1<.18?l.BARKD:o[2]>.66&&Math.abs(o[0]+.2)<.2&&o[1]<.85?l.NOSE:o[2]>.66&&Math.abs(o[0]-.5)<.14&&Math.abs(o[1]-.7)<.12?l.SHADES:void 0});const e=1.1,t=1.68,i=.86,r=Math.hypot(i,t-e),a=i/r,s=(t-e)/r;for(const o of[-1,1]){n.box([0,(e+t)/2+.03,o*i/2],[1.12,.06,r/2+.05],l.MOSS,{dir:[1,0,0],up:[0,a,o*s],round:.03,group:2,paint:c=>rt(Math.floor(c[0]*12),Math.floor(c[2]*12))<.25?l.LEAF2:void 0});for(let c=0;c<7;c++)n.ell([-.95+c*.317,e-.02,o*(i+.02)],[.16,.07,.06],l.MOSS,{group:2,paint:u=>u[1]<e-.05?l.LEAF2:void 0})}n.box([0,t+.04,0],[1.1,.05,.06],l.MOSS,{group:2});for(const o of[-1,1])n.flat([o,(e+t)/2,0],[0,0,1],[0,1,0],i,(t-e)/2,(c,u)=>Math.abs(c)<=(1-u)/2+.02?(u+1)*4%1<.14?l.BARKD:l.WOOD:null,{group:1,bend:0});n.seg([.6,.9,0],[.6,t+.45,0],.15,.13,l.STONE,{group:3,rough:.015});for(let o=0;o<5;o++)li(n,[-1.4+o*.7,.12,.9+rt(o)*.3],[.2,.15,.18],4+o);va(n,16,1.8,10,9,.25)},"heron-rookery"(n){$t(n,[[0,0,0,.25],[.4,1.4,0,.18],[.9,2.8,-.1,.12],[1.3,3.8,-.2,.06]],1);const e=[[[.6,2,-.05],[-.3,2,-.1]],[[1,3,-.1],[1.8,2.9,0]],[[1.25,3.6,-.2],[.6,3.7,-.3]]];e.forEach(([r,a],s)=>{$t(n,[[...r,.07],[...a,.04]],2),n.ell(T.add(a,[0,.08,0]),[.34,.13,.3],l.BARK2,{group:3+s,rough:.025,paint:o=>Math.abs(Math.sin(o[0]*30+o[2]*20))<.25?l.STRAW:o[1]<a[1]+.02?l.BARKD:void 0})});for(const[r,a]of[[[1.2,4,-.4],[.6,.4,.45]],[[.3,3.1,-.5],[.45,.3,.35]],[[1.9,3.3,-.4],[.4,.3,.35]]])Ma(n,r,a,7);const t=T.add(e[1][1],[0,.42,.05]),i=1.6;n.ell(t,[.18*i,.1*i,.09*i],l.BELLY,{dir:[1,.3,0],group:10,paint:r=>r[1]>t[1]+.06?l.STONE:void 0}),n.chain([[...T.add(t,[.12*i,.06*i,0]),.035*i],[...T.add(t,[.2*i,.22*i,0]),.03*i],[...T.add(t,[.16*i,.32*i,0]),.04*i]],l.BELLY,{group:10}),n.seg(T.add(t,[.18*i,.33*i,0]),T.add(t,[.36*i,.3*i,0]),.015*i,.005*i,l.BODY2,{group:11});for(const r of[-.04,.04])n.seg(T.add(t,[0,-.06*i,r]),T.add(t,[.02,-.42,r]),.012,.012,l.BARKD,{group:12})},sundial(n){n.ell([0,.07,0],[1.05,.09,1],l.STONE,{group:1,rough:.01}),n.ell([0,.2,0],[.72,.09,.68],l.STONE,{group:2,rough:.01,paint:e=>e[1]>.26&&rt(Math.floor(e[0]*8),Math.floor(e[2]*8))<.3?l.MOSS:void 0}),n.seg([0,.28,0],[0,.95,0],.16,.13,l.STONE,{group:3,paint:e=>Math.abs(Math.sin(e[1]*30))<.15?l.STONED:void 0}),n.ell([0,1,0],[.38,.04,.38],l.FRAME,{group:4,paint:e=>{const t=Math.atan2(e[2],e[0]);return Math.abs(Math.sin(t*6))<.12&&Math.hypot(e[0],e[2])>.26?l.BARKD:void 0}}),n.box([0,1.12,0],[.2,.1,.01],l.FRAME,{dir:[1,-.5,0],round:.005,group:5});for(let e=0;e<22;e++){const t=e/22*Math.PI*2,i=1.25+rt(e)*.2,r=[Math.cos(t)*i,0,Math.sin(t)*i*.85];n.seg(r,T.add(r,[0,.18,0]),.015,.012,l.LEAF2,{group:6}),n.ell(T.add(r,[0,.2,0]),[.05,.04,.05],[l.FLOWER,l.BELLY,l.ACCENT][e%3],{group:7})}},"bear-den"(n){const e=[0,.3,-.2];n.ell(e,[1.7,1.15,1.25],l.LEAF,{group:1,rough:.05,paint:t=>{const i=rt(Math.floor(t[0]*16),Math.floor(t[1]*16)+Math.floor(t[2]*16)*3);return i<.06?l.ACCENT:i<.2?l.BARKD:t[1]<.4?l.LEAF3:i>.85?l.LEAF2:void 0}}),n.ell([.35,.35,.95],[.5,.55,.4],l.NOSE,{group:1,cut:!0}),n.seg([2,0,.5],[2,.65,.5],.3,.27,l.TRUNK,{group:3,paint:t=>t[1]>.6?l.BARKL:Math.abs(Math.sin(Math.atan2(t[2]-.5,t[0]-2)*3))<.12&&t[1]>.2?l.BARKD:void 0})},"stilt-hut"(n){Sa(n,[0,.01,.1],[2.1,1.3],1);for(const[e,t]of[[-.75,-.55],[.75,-.55],[-.75,.55],[.75,.55]])n.seg([e,0,t],[e,1.05,t],.07,.06,l.WOOD,{group:2,paint:i=>i[1]<.15?l.MOSS:void 0});n.box([0,1.1,0],[1.05,.05,.8],l.WOOD,{round:.02,group:3,paint:e=>(e[0]+3)*6%1<.12?l.BARKD:void 0}),n.box([-.1,1.6,-.1],[.7,.45,.55],l.WOOD,{round:.03,group:4,paint:e=>e[2]>.4&&Math.abs(e[0]-.1)<.18&&e[1]<1.85?l.NOSE:void 0});for(const[e,t]of[[2.1,.92],[2.35,.72],[2.58,.48],[2.76,.24]])n.ell([-.1,e,-.1],[t,.16,t*.85],l.STRAW,{group:5,paint:i=>Math.abs(Math.sin(Math.atan2(i[2]+.1,i[0]+.1)*18))<.25?l.BARK2:void 0});for(const e of[.72,.95])n.seg([.9,1.1,e],[1.15,0,e],.02,.02,l.WOOD,{group:6});for(let e=0;e<4;e++)n.seg([.92+e*.06,1-e*.26,.72],[.92+e*.06,1-e*.26,.95],.02,.02,l.WOOD,{group:6});for(let e=0;e<26;e++){const t=rt(e,7)*6.283,i=1.5+rt(e,8)*.7,r=[Math.cos(t)*i,0,Math.sin(t)*i*.7],a=.5+rt(e,9)*.5;n.seg(r,T.add(r,[0,a,0]),.028,.02,l.LEAF2,{group:10+e%3}),e%3===0&&n.ell(T.add(r,[0,a-.05,0]),[.025,.07,.025],l.BARKD,{group:13})}},"bog-shrine"(n){Sa(n,[.6,.01,.4],[1.4,.9],1),n.seg([0,0,0],[0,1.9,0],.2,.17,l.TRUNK,{group:2,rough:.01,paint:e=>{const t=e[1];return e[2]>.12&&(Math.abs(t-1.6)<.05&&Math.abs(Math.abs(e[0])-.08)<.05||Math.abs(t-1.38)<.04&&Math.abs(e[0])<.1)||t*5%1<.07?l.BARKD:e[1]>1.85?l.MOSS:void 0}}),n.ell([0,1.95,0],[.24,.1,.24],l.MOSS,{group:3});for(let e=0;e<6;e++){const t=e/6*Math.PI*2;n.seg([Math.cos(t)*1,0,Math.sin(t)*.8],[Math.cos(t)*1,.35+rt(e)*.25,Math.sin(t)*.8],.05,.04,l.TRUNK,{group:4})}n.ell([-.25,.06,.3],[.14,.07,.13],l.EAR,{group:5}),li(n,[.3,.07,.3],[.09,.07,.08],6,!1),li(n,[.15,.05,.42],[.06,.05,.06],7,!1);for(const[e,t,i]of[[.9,.9,.5],[1.4,1.2,.1],[.4,1.4,.8]])n.ell([e,t,i],[.06,.07,.06],l.MAGIC,{group:20+e*10,extra:!0,paint:r=>Math.hypot(r[0]-e,r[1]-t)<.03?l.MAGIC2:void 0});va(n,20,2,10,11,.3,l.WEB)},"raven-tree"(n){$t(n,[[0,0,0,.3],[.1,1.3,0,.22],[-.1,2.5,-.1,.16],[.1,3.6,-.15,.07]],1),[[[.1,1.6,0],[1.3,2.3,.1],[1.8,2.2,.1]],[[-.05,2.1,-.05],[-1.2,2.8,-.1],[-1.6,3.2,-.1]],[[0,2.9,-.1],[.8,3.5,-.2]]].forEach((r,a)=>$t(n,r.map((s,o)=>[...s,.12-o*.04]),2+a)),$t(n,[[-.1,.5,0,.22],[-1.1,.1,.5,.08]],5),$t(n,[[.1,.4,0,.2],[.9,.05,-.4,.08]],5);const t=(r,a)=>{n.ell(r,[.12,.07,.06],l.SHADES,{dir:[1,.2,0],group:a}),n.ell(T.add(r,[.11,.07,0]),[.05,.05,.045],l.SHADES,{group:a}),n.seg(T.add(r,[.15,.07,0]),T.add(r,[.22,.05,0]),.015,.004,l.BODY2,{group:a}),n.seg(T.add(r,[-.1,0,0]),T.add(r,[-.22,-.04,0]),.04,.015,l.SHADES,{group:a})};t([1.3,2.42,.1],10),t([-1.2,2.92,-.1],11),t([.8,3.62,-.2],12),t([-.05,3.72,-.15],13);const i=[1.55,1.45,.1];n.seg([1.55,2.25,.1],T.add(i,[0,.3,0]),.01,.01,l.FRAME,{group:14});for(let r=0;r<6;r++){const a=r/6*Math.PI*2;n.seg(T.add(i,[Math.cos(a)*.2,-.25,Math.sin(a)*.2]),T.add(i,[Math.cos(a)*.12,.3,Math.sin(a)*.12]),.012,.012,l.FRAME,{group:14})}n.seg(T.add(i,[0,-.27,0]),T.add(i,[0,-.25,0]),.22,.22,l.FRAME,{group:14})},barrow(n){n.ell([0,0,-.2],[2.3,.95,1.3],l.LEAF2,{group:1,rough:.03,paint:e=>rt(Math.floor(e[0]*10),Math.floor(e[2]*10)+Math.floor(e[1]*10))<.25?l.LEAF:void 0});for(const e of[-.35,.35])n.box([e,.45,.95],[.12,.45,.12],l.STONE,{round:.03,rough:.01,group:2});n.box([0,.95,.95],[.55,.1,.14],l.STONE,{round:.03,rough:.01,group:3,paint:e=>e[1]>1.02?l.MOSS:void 0}),n.box([0,.4,.9],[.23,.4,.3],l.NOSE,{group:1,cut:!0});for(const[e,t,i]of[[-1.6,1,.7],[1.7,.9,.55]])n.box([e,i/2,t],[.12,i/2,.09],l.STONE,{round:.04,rough:.01,group:4})},cairn(n){let e=0;for(let i=0;i<6;i++){const r=.9-i*.14,a=Math.max(3,9-i);for(let s=0;s<a;s++){const o=s/a*Math.PI*2+i;li(n,[Math.cos(o)*r*.8,e+.14,Math.sin(o)*r*.7],[.24-i*.02,.15,.2-i*.02],1+(i+s)%4,i<2)}e+=.26}const t=[0,e+.1,0];for(let i=0;i<6;i++){const r=i/6*Math.PI*2;n.seg(T.add(t,[Math.cos(r)*.12,0,Math.sin(r)*.12]),T.add(t,[Math.cos(r)*.3,.35,Math.sin(r)*.3]),.02,.02,l.FRAME,{group:6})}n.seg(T.add(t,[0,-.3,0]),t,.05,.05,l.FRAME,{group:6}),n.ell(T.add(t,[0,.14,0]),[.2,.07,.2],l.SHADES,{group:7})},"stump-throne"(n){n.ell([0,.28,0],[.92,.34,.86],l.TRUNK,{group:1,rough:.015,paint:Er}),n.ell([0,.58,0],[.84,.06,.78],l.BARKL,{group:1,paint:e=>Math.abs(Math.sin(Math.hypot(e[0],e[2])*30))<.3?l.BARK2:void 0}),n.box([-.55,1.15,0],[.18,.62,.62],l.TRUNK,{round:.1,rough:.01,group:2,paint:Er});for(const e of[-.6,.6])n.box([-.1,.72,e],[.45,.14,.12],l.TRUNK,{round:.06,group:3,paint:Er});for(let e=0;e<6;e++){const t=e/6*Math.PI*2+.3;$t(n,[[Math.cos(t)*.8,.25,Math.sin(t)*.8,.18],[Math.cos(t)*1.4,.02,Math.sin(t)*1.3,.06]],4)}n.seg([1.5,.18,.8],[1.5,.18,.2],.18,.18,l.TRUNK,{group:5,paint:e=>e[2]>.78||e[2]<.22?l.BARKL:Er(e)}),n.seg([1.5,.3,.5],[1.6,.75,.5],.025,.025,l.WOOD,{group:6}),n.box([1.5,.36,.5],[.1,.06,.015],l.FRAME,{group:6});for(let e=0;e<6;e++){const t=e<3?0:1,i=e%3;n.seg([-1.7+i*.3+t*.15,.15+t*.26,-.7],[-1.7+i*.3+t*.15,.15+t*.26,.2],.14,.14,l.TRUNK,{group:7+e%2,paint:r=>r[2]>.16||r[2]<-.66?l.BARKL:void 0})}},"swing-beech"(n){$t(n,[[0,0,-.3,.45],[0,1.6,-.3,.36],[-.1,2.8,-.4,.26]],1),$t(n,[[0,2.2,-.3,.2],[1,2.6,-.2,.14],[1.9,2.75,-.1,.08]],2),$t(n,[[-.05,2.5,-.35,.18],[-1.2,3,-.4,.1]],3);for(let e=0;e<5;e++){const t=e/5*Math.PI*2;$t(n,[[Math.cos(t)*.35,.3,-.3+Math.sin(t)*.3,.2],[Math.cos(t)*.9,.02,-.3+Math.sin(t)*.8,.07]],4)}for(const[e,t]of[[[0,3.4,-.6],[1.4,.8,1]],[[1.4,3.1,-.4],[.9,.55,.7]],[[-1.3,3.2,-.6],[.9,.6,.7]]])Ma(n,e,t,5);for(const e of[-.12,.12])n.seg([1.3,2.65,e],[1.3,.55,e],.012,.012,l.STRAW,{group:6});n.box([1.3,.53,0],[.08,.025,.18],l.WOOD,{round:.01,group:6});for(let e=0;e<9;e++)n.ell([(rt(e,1)-.5)*3,.05+rt(e,2)*.5,(rt(e,3)-.3)*1.6],[.022,.022,.022],l.MAGIC,{group:20+e,extra:!0})},bower(n){for(const t of[-.9,0,.9])for(const i of[-.6,.6])n.seg([t,0,i],[t,1.2,i],.04,.04,l.WOOD,{group:1});for(const t of[-.9,0,.9])n.chain([[t,1.2,-.6,.04],[t,1.62,-.3,.04],[t,1.72,0,.04],[t,1.62,.3,.04],[t,1.2,.6,.04]],l.WOOD,{group:2});for(const t of[-.6,.6])for(const i of[.5,1])n.seg([-.9,i,t],[.9,i,t],.025,.025,l.WOOD,{group:3});const e=t=>{const i=rt(Math.floor(t[0]*26),Math.floor(t[1]*26)+Math.floor(t[2]*26)*3);return i<.12?l.BELLY:i<.2?l.STRAW:i>.85?l.LEAF2:void 0};for(const[t,i]of[[[-.6,1.6,0],[.6,.3,.75]],[[.5,1.65,0],[.65,.3,.75]],[[-.95,.9,-.55],[.25,.65,.25]],[[.95,.8,-.6],[.25,.55,.25]],[[-.9,.7,.62],[.22,.5,.2]],[[.2,1.3,-.65],[.5,.4,.2]]])n.ell(t,i,l.LEAF,{group:4,rough:.04,paint:e});n.box([0,.4,-.35],[.6,.04,.15],l.WOOD,{round:.02,group:5});for(const t of[-.5,.5])n.seg([t,0,-.35],[t,.38,-.35],.03,.03,l.WOOD,{group:5})}},ru={moor:["sleeping-giant","the sleeping giant, a moss mound like a figure lying on its back",1],"fern-forest":["fern-grotto","a ring of giant tree ferns round a stone basin",1],"muddy-forest":["sunken-boat","an old rowing boat sunk in the mud",1.15],"tangly-forest":["bramble-wagon","an old wagon wrapped in brambles",1.1],"wispy-forest":["beehive-tree","a many-trunked tree with a great wild honeycomb",1],"hazel-forest":["fairy-ring","a ring of fairy stones and toadstools",1.1],"twiggy-forest":["charcoal-hut","a charcoal burner's hut of sticks, its mound smouldering",1],ancient:["root-arch","a great arch of roots over mossy stones",1.1],norway:["turf-hut","a log cabin with a turf roof",1.15],"alder-forest":["heron-rookery","an alder holding herons' stick nests",1],meadow:["sundial","a moonlit sundial on a stone dais in a ring of flowers",1.2],"berry-thicket":["bear-den","a bear's den in a bramble mound",1.1],wetland:["stilt-hut","a fisher's hut on stilts over a pool",1.1],bog:["bog-shrine","a carved post shrine to the bog, will-o'-wisps over the pool",1.1],deadwood:["raven-tree","a dead tree where the ravens gather",1],grassland:["barrow","a barrow with a stone doorway",1],heath:["cairn","a tall cairn with an old beacon basket",1.4],"old-pinewood":["stump-throne","a woodcutter's stump throne",1.1],"bluebell-glade":["swing-beech","a great beech with a rope swing, glowworms beneath",1],"honeysuckle-tangle":["bower","a honeysuckle bower with a bench",1.2]};function Oh(n){let e=n.w,t=-1,i=n.h;for(let a=0;a<n.h;a++)for(let s=0;s<n.w;s++)n.m[a*n.w+s]&&(e=Math.min(e,s),t=Math.max(t,s),i=Math.min(i,a));const r=new Bt(t-e+1,n.h-i);for(let a=0;a<r.h;a++)for(let s=0;s<r.w;s++){const o=(a+i)*n.w+s+e;n.m[o]&&r.put(s,a,n.m[o],n.n[o*3],n.n[o*3+1],n.n[o*3+2])}return{sp:r,x0:e,y0:i}}function Fh(n,e){const t=n.leaf,i=e.trunkHue??.07;return{[l.TRUNK]:pe(i,.45,.36),[l.BARKD]:pe(i+.03,.5,.17),[l.BARKL]:pe(i,.35,.55),[l.BARK2]:pe(i+.02,.45,.26),[l.LEAF]:pe(t,.55,.45),[l.LEAF2]:pe(t-.03,.5,.62),[l.LEAF3]:pe(t+.03,.6,.26),[l.STONE]:[122,120,128],[l.STONED]:[62,60,70],[l.MOSS]:pe(.26,.45,.45),[l.WOOD]:[128,92,58],[l.STRAW]:[190,162,104],[l.CLOTH]:[228,220,200],[l.EAR]:[168,96,66],[l.FRAME]:[150,128,84],[l.SHADES]:[30,28,36],[l.ACCENT]:[196,40,52],[l.BELLY]:[232,228,214],[l.BODY2]:[210,170,60],[l.FLOWER]:[180,140,230],[l.WEB]:[228,228,234],[l.WATER]:[52,78,104],[l.NOSE]:[16,14,20],[l.GLOW]:[255,120,40],[l.MAGIC]:pe(e.magicHue??.45,.6,1),[l.MAGIC2]:pe(e.magicHue??.45,.2,1),[l.RUNE]:[120,230,255],[l.LINE]:[24,22,30]}}function Bh(n,e,t,i=16){const r=new et({blend:.05});Uh[n](r),r.ell([0,.004,0],[.01,.004,.01],l.NOSE,{group:0});const a=(Object.values(ru).find(([f])=>f===n)||[,,1])[2],s=Mi(r,{scale:iu(t)*a}),{sp:o,x0:c,y0:u}=Oh(s.sp),[h,d]=s.project([0,0,0]);return{sp:o,colours:Fh(e,t),origin:{x:+(h-c).toFixed(1),y:+(d-u).toFixed(1)},metres:{width:+(o.w/i).toFixed(1),height:+(o.h/i).toFixed(1)}}}const kh=1.3,zh=n=>[1,Math.sqrt(n.growth),Math.sqrt(n.growth)*kh,n.growth],Vr=(n,e,t=1)=>Math.round(e.size*zh(e)[Math.max(0,Math.min(3,n))]*(2/(e.pixel||2))*1.9*t),al=(n,e)=>{const t=il(e);for(let i=0;i<9;i++){const r=Math.floor(ce(t,2,n.w-2)),a=Math.floor(ce(t,2,n.h*.6));if(!(n.get(r,a)||n.get(r+1,a)||n.get(r-1,a)||n.get(r,a+1)||n.get(r,a-1))&&(n.px(r,a,l.MAGIC2),i%3===0))for(const[s,o]of[[1,0],[-1,0],[0,1],[0,-1]])n.px(r+s,a+o,l.MAGIC)}};function ms(n,e,t,i,r,a,s,o){const c=T.add(e,[-i*.7,i*(.75+r),t*i*.35]),u=T.norm(T.sub(c,e)),h=T.norm(T.sub([1,0,0],T.mul(u,T.dot([1,0,0],u)))),d=Math.hypot(...T.sub(c,e));n.flat(T.add(T.lerp(e,c,.5),T.mul(h,-i*.14)),u,h,d*.55,i*.34,Ir.wing(a,s),{group:o,extra:!0})}const sl=(n,e,t=1)=>n===0?Math.round(Math.max(12,Math.min(30*Math.max(.75,Math.min(1.1,t)),Vr(1,e)*t*.72))):n===2?Math.round(Math.max(Vr(1,e)*t*1.08,Math.min(Vr(2,e,t),Vr(1,e)*1.4))):Vr(n,e)*t;let Ja=null;function Hh(n,e){const t=Ja;Ja=n;try{return e()}finally{Ja=t}}const Gh=(n,e)=>{const t=Math.atan2(e,n);return Math.hypot(n,e)<.55+.4*Math.pow(Math.abs(Math.cos(t*2.5+Math.PI/2)),3)},Vh=(n,e)=>{const t=n*1.2,i=-e*1.2+.25;return Math.pow(t*t+i*i-.6,3)-t*t*i*i*i<0};function ol(n){const e=Ja,t=n.anchors;if(!e)return;const i=t.head,r=i?Math.max(...i.r):.2;if(e.collar&&(t.neck||i)){const a=t.neck||{c:T.add(i.c,[-i.r[0]*.8,-i.r[1]*.4,0]),r:i.r[1]*.75,dir:T.norm([1,.4,0])},s=T.norm(a.dir),o=T.norm(T.cross(s,Math.abs(s[2])<.9?[0,0,1]:[1,0,0])),c=T.cross(s,o),u=[],h=Math.max(.03,a.r*.2);for(let x=0;x<=16;x++){const _=x/16*Math.PI*2,g=T.add(T.mul(o,Math.cos(_)),T.mul(c,Math.sin(_)));let M=0;for(;M<.8&&n.field(T.add(a.c,T.mul(g,M)))<0;)M+=.01;M>=.8&&(M=a.r),u.push([...T.add(a.c,T.mul(g,M+h*.7)),h])}n.chain(u,l.COLLAR,{group:60,extra:!0});const d=u.reduce((x,_)=>_[0]-_[1]*.6+_[2]*.5>x[0]-x[1]*.6+x[2]*.5?_:x),f=h*1.3*(a.tag||1),p=T.norm(T.add(T.norm(T.sub(d.slice(0,3),a.c)),[.3,-.5,.3]));let m=d.slice(0,3);for(let x=0;x<60&&n.field(m)<f*.4;x++)m=T.add(m,T.mul(p,.01));n.ell(m,[f,f,f*.6],l.COLLAR,{group:60,extra:!0})}if(e.hat!=null&&i){const a=Math.max(r,.13),s=i.top||T.add(et.surface(i.c,i.r,T.norm([-.15,1,.1])),[0,r*.1,0]),o=T.norm([.3,1,.35]),c=a*1.5,u=T.add(s,T.mul(o,c));n.seg(T.add(s,T.mul(o,-a*.1)),u,a*.48,a*.04,l.HAT1,{group:61,extra:!0,paint:h=>Math.floor(T.dot(T.sub(h,s),o)/(c/5)+10)%2?l.HAT2:void 0}),n.ell(u,[a*.17,a*.17,a*.17],l.POM,{group:61,extra:!0})}if(e.glasses&&t.eyes&&i){const[a,s]=t.eyes.pts,o=u=>T.add(u,T.mul(T.norm(T.sub(u,i.c)),t.eyes.size*.45)),c=Math.max(t.eyes.size*1.05,r*.1);if(e.glasses==="bar")n.seg(o(a),o(s),c,c,l.SHADES,{group:62,extra:!0}),n.ell(T.add(o(s),[c*.3,c*.5,c*.2]),[c*.25,c*.25,c*.25],l.GLINT,{group:62,extra:!0});else for(const u of[a,s]){const h=T.norm(T.sub(u,i.c)),d=T.norm(T.cross([0,1,0],h)),f=T.cross(h,d),p=e.glasses==="heart"?Vh:Gh,m=c*1.5;n.flat(o(u),d,f,m,m,(x,_)=>p(x,_)?p(x*1.3,_*1.3)?l.SHADES:l.FRAME:null,{group:62,bend:.1,extra:!0}),n.seg(o(a),o(s),c*.18,c*.18,l.FRAME,{group:62,extra:!0})}}if(e.shoes)for(const a of t.feet){const s=e.shoes==="platform",o=a.r,c=T.add(a.c,[o*.25,o*(s?.35:.15),0]);n.ell(c,[o*1.45,o*(s?1.2:.85),o*1.15],l.SHOE,{group:a.group,extra:!0,paint:u=>u[1]<c[1]-o*(s?.45:.4)?l.SOLE:e.shoes==="glitter"&&kn(u,60,.28)?l.GLINT:void 0})}}function Wh(n,e,t,i,r="towards"){const a={legW:1,earS:1,hgt:1,bw:.3,...n.q},s=e===3,o=e===1,c=e===0,u=O=>s&&n.legend.includes(O),h=new et,d=a.hr*(c?1.75:o?1.25:1)*(i.head/.44)**.5,f=a.len*(c?.8:o?.9:1.02)*i.long,p=c?.55:o?.9:1.04,m=t?-.04:0,x=1+m,_=a.chest*(s?1.06:1)/p+m,g=a.tuck/p+m,M=a.bw*(c?1.15:e>=2?1.06:1)*(a.legW>1.2?1.15:1),E=.06*a.legW*(s?1.1:c?1.7:1),b=a.back==="hump"?.1:0,R=a.back==="arch"?.1:0,w=_+.12,D=O=>{if(a.belly&&O[1]<w&&O[0]>-f*.5)return l.BELLY;if(a.saddle&&O[1]>x-.18&&O[0]<f*.55)return l.BODY2;if(a.spots&&O[1]>_+.1&&kn(O,10,.22))return a.spotMat==="belly"||a.spots==="young"&&o?l.BELLY:a.spots==="young"?void 0:l.BODY3;if(a.ridge&&O[1]>x-.08+b*.5)return l.BODY3};if(h.ell([f*.48,(x+_)/2+b*.5,0],[f*.62,(x-_)/2+b*.5,M],l.BODY,{paint:D}),h.ell([-f*.5,(x+g)/2+R*.6,0],[f*.58,(x-g)/2+R*.6,M*.93],l.BODY,{paint:D}),h.ell([0,(x+(_+g)/2)/2+.02,0],[f*.6,(x-(_+g)/2)/2,M*.9],l.BODY,{paint:D}),a.ridge)for(let O=0;O<(s?16:10);O++){const re=-f*.8+O*f*1.75/(s?15:9),ue=(.07+(s?.04:0))*(1+.5*Math.max(0,re/f));h.ell([re,x+.02+b*Math.max(0,1-Math.abs(re/f-.5)*2)+ue*.5,0],[ue,.03,M*.25],l.BODY3,{dir:[-.3,1,0],up:[1,0,0]})}if(a.wool)for(let O=0;O<14;O++){const re=O/14*Math.PI*2;h.ell([f*Math.cos(re)*.7,(x+_)/2+Math.sin(re)*.2,M*(O%2?.5:-.5)],[.16,.14,.14],l.BODY)}const S=[.32,-.32][t],y=(O,re)=>{const ue=re*M*.62,Ce=O?f*.62:-f*.62,Fe=(O?1:-1)*re*S,He=O?_+.1:g+.15,j=(O?re:-re)*(t?1:-1)>0?.06:0,ie=[Ce+Math.sin(Fe)*.2+(O?.02:.1),Math.max(.3,He*.55),ue],G=[Ce+Math.sin(Fe)*.42,.05+j,ue],he=[Ce,He+.12,ue*.8],se=re>0?a.legMat||l.BODY:a.legMat?l.BODY3:l.BODY2,ye=O?[[...he,E*1.5],[...ie,E*1.05],[...G,E*.9]]:[[...he,E*2*(a.haunch||1)],[...T.add(ie,[-.12,.06,0]),E*1.2],[...T.add(G,[-.06*(a.hindFoot||1),.12,0]),E*.9],[...G,E*.9]];h.chain(ye,se,{group:re>0?6+(O?1:0):2,paint:a.socks?Le=>Le[1]<a.socks?l.BODY3:void 0:void 0});const $e=(a.paw==="hoof"?.07:.09)*a.legW**.5*(O?1:a.hindFoot||1);h.ell(T.add(G,[$e*.5,-.01,0]),[$e,E*.9,E*1.1],a.paw==="hoof"?l.NOSE:se,{group:re>0?6+(O?1:0):2}),h.anchors.feet.push({c:T.add(G,[$e*.5,-.01,0]),r:Math.max($e,E*1.1),group:re>0?6+(O?1:0):2})};for(const O of[-1,1])y(!0,O),y(!1,O);const L=[f*.82,x-.12,0],C=[L[0]+Math.cos(a.neckAng)*a.neck*.9,L[1]+Math.sin(a.neckAng)*a.neck*.9+(c?.1:0),0];h.seg(L,C,a.neckW*.55,a.neckW*.42,l.BODY,{paint:O=>a.belly&&O[1]<(L[1]+C[1])/2-.05?l.BELLY:a.face==="dark"?l.BODY2:void 0});const N=O=>{if(a.face==="badger")return Math.abs(O[2])<d*.22+(O[0]-C[0])*.1||O[1]<C[1]-d*.1?l.BELLY:l.BODY3;if(a.face==="dark")return l.BODY2;if((a.belly||a.muzzle)&&O[1]<C[1]-d*.35)return l.BELLY};h.ell(C,[d*1.05,d*.92,d*.88],l.BODY,{paint:N});const U=d*a.snout*(c?.55:o?.78:1),I=d*a.snoutD*.55,B=[C[0]+d*.65+U*.5,C[1]-d*.28,0];h.ell(B,[U*.62+d*.2,I,I*.95],l.BODY,{dir:[1,-.25,0],paint:O=>(a.muzzle||a.belly)&&O[1]<B[1]-I*.1?l.BELLY:N(O)});const V=[B[0]+U*.62+d*.1,B[1]-.02,0];h.ell(V,[d*(a.disc?.1:.12),d*(a.disc?.2:.12),d*(a.disc?.2:.15)],l.NOSE,{group:1});for(const O of[-1,1]){const re=et.surface(C,[d*1.05,d*.92,d*.88],T.norm([.75,.32,O*.62]));h.ell(re,[d*.13,d*.16,d*.13].map(ue=>ue*(a.eyeK||1)*(c?1.5:o?1.2:1)),s&&!a.tusks?l.MAGIC2:l.EYE,{group:1})}h.anchors.head={c:C,r:[d*1.05,d*.92,d*.88],top:[C[0]-d*.1,C[1]+d*.82,0]},h.anchors.eyes={pts:[-1,1].map(O=>et.surface(C,[d*1.05,d*.92,d*.88],T.norm([.75,.32,O*.62]))),size:d*.16*(a.eyeK||1)*(c?1.5:o?1.2:1)},h.anchors.neck={c:T.lerp(L,C,c?.05:o?.25:.42),r:a.neckW*.5*(c?1.3:o?1.12:1),dir:T.norm(T.sub(C,L)),tag:c?1.8:o?1.3:1};for(const O of[-1,1]){const re=a.ear,ue=[C[0]-d*.15,C[1]+d*.7,O*d*.5],Ce=a.earS*(c?1.2:1)*(a.ear==="long"?.62:1);if(re==="none")continue;if(re==="round"){h.ell(ue,[d*.22,d*.25*Ce,d*.1],l.BODY,{group:1,paint:ye=>ye[0]>ue[0]+d*.02?l.EAR:void 0});continue}const Fe=re==="long",He=re==="small"?-.6:0,j=d*.55*Ce*(re==="big"?1.35:Fe?2.2:1),ie=d*.3*(re==="big"?1.2:Fe?1.35:1),G=T.norm([He*.6-(Fe?.3:.12),1,O*.3]),he=T.norm([.55,.2,O]),se=T.norm(T.cross(he,G));h.flat(T.add(ue,T.mul(G,j)),se,G,ie,j,Ir.ear(l.BODY,l.EAR,l.BODY3),{group:5+(O>0?0:20),extra:Fe}),re==="tuft"&&h.seg(T.add(ue,[0,j*1.4,O*.02]),T.add(ue,[0,j*1.85,O*.04]),d*.05,d*.02,l.BODY3,{group:1})}const $=[-f*1.05,x-.1+R*.5,0],ae=t?.04:-.02;if(u("tails")||Yh(h,u("starTail")?"star":a.tail,$,f,x,ae),a.horns)for(const O of[-1,1]){const re=o?.6:c?.35:u("hornsGlow")?1.4:1,ue=[];for(let Ce=0;Ce<=8;Ce++){const Fe=.3-Ce/8*Math.PI*1.6,He=d*.65*re*(1-.45*Ce/8);ue.push([C[0]-d*.1+Math.cos(Fe)*He,C[1]+d*.45+Math.sin(Fe)*He,O*(d*.6+Ce*.015)]),ue[Ce].push(d*.2*re*(1-.6*Ce/8))}h.chain(ue,u("hornsGlow")?l.MAGIC:l.ACCENT,{group:13})}if(a.antlers||u("jackalope"))for(const O of[-1,1])Xh(h,a,[C[0]-d*.05,C[1]+d*.75,O*d*.4],O,e,u);if(a.tusks)for(const O of[-1,1]){const re=o?.4:c?0:u("tusksBig")?1.3:.75;if(!re)continue;const ue=[B[0]+U*.25,B[1]-I*.4,O*I*.8];h.chain([[...ue,.045*re],[...T.add(ue,[.1*re,.1*re,O*.03]),.04*re],[...T.add(ue,[.06*re,.24*re,O*.05]),.02*re]],l.ACCENT,{group:8})}a.teeth&&!c&&h.ell([V[0]-d*.1,V[1]-d*.25,0],[d*.08,d*.14,d*.12],l.ACCENT,{group:1});const q=O=>[-f*.9+O*f*1.65,x+b*Math.max(0,1-Math.abs(O-.8)*3)+R*(1-Math.abs(O-.4)*2),0];if(u("wings"))for(const O of[-1,1])ms(h,[f*.2,x,O*M*.5],O,1.15,t?.1:0,O>0?l.MAGIC2:l.MAGIC,l.MAGIC,40+(O>0?10:0));if(u("mane")||u("flames"))for(let O=0;O<7;O++){const re=O/6,ue=T.lerp(T.add(C,[-d*.5,d*.3,0]),q(.55),re),Ce=[.4,.3,.45,.28,.38,.25,.3][O],Fe=T.norm([-.35-(t?.1:0),1,0]);h.flat(T.add(ue,T.mul(Fe,Ce*.5)),[1,0,0],Fe,Ce*.32,Ce*.55,Ir.flame(O%2?l.MAGIC:l.MAGIC2,l.MAGIC2),{group:60+O%2,extra:!0})}if(u("tails"))for(let O=0;O<7;O++){const re=Math.PI*(.55+O*.08),ue=(O-3)*.1,Ce=T.add($,[Math.cos(re)*.9,Math.sin(re)*.85,ue]);h.chain([[...$,.1],[...T.lerp($,Ce,.5),.17],[...Ce,.08]],O%2?l.BODY2:l.BODY,{group:70,extra:!0}),h.ell(Ce,[.09,.09,.09],l.MAGIC2,{group:71,extra:!0})}if(u("crystals")&&[.15,.3,.45,.6,.75].forEach((O,re)=>{const ue=q(O),Ce=[.3,.5,.4,.6,.35][re];h.ell(T.add(ue,[0,Ce*.45,(re%2-.5)*.1]),[Ce*.55,.08,.08],l.MAGIC,{dir:[(re-2)*.12,1,0],group:80+re%2,extra:!0,paint:Fe=>Fe[2]>0?l.MAGIC2:void 0})}),u("moss")){for(let O=0;O<6;O++)h.ell(q(.08+O*.15),[f*.22,.07,M*.85],l.LEAF,{group:85,extra:!0});for(const[O,re]of[[.25,.55],[.5,.8],[.75,.45]]){const ue=q(O);h.seg(ue,T.add(ue,[0,re*.7,0]),.04,.025,l.TRUNK,{group:86,extra:!0}),h.ell(T.add(ue,[0,re*.8,0]),[re*.28,re*.26,re*.28],l.LEAF2,{group:87,extra:!0,paint:Ce=>Ce[1]<ue[1]+re*.72?l.LEAF3:void 0})}for(const O of[.12,.4,.65,.9]){const re=q(O);h.ell(T.add(re,[0,.12,M*.3]),[.07,.035,.07],l.MAGIC,{group:89,extra:!0})}}if(u("ribbons"))for(let O=0;O<3;O++){const re=[];for(let ue=0;ue<9;ue++){const Ce=ue/8;re.push([f*(.5-Ce*2.2),x+.05+O*.1+Ce*(.25+O*.12)+Math.sin(Ce*6+t+O)*.07,(O-1)*.18,.04*(1-Ce*.6)])}h.chain(re,O%2?l.MAGIC2:l.MAGIC,{group:90+O,extra:!0})}ol(h);const{sp:ee}=Mi(h,{height:sl(e,i,a.hgt),facing:r});return s&&al(ee,n.id.length*7919),ee}function Yh(n,e,t,i,r,a){const s={group:3},o=c=>-i*c;e==="brush"?n.chain([[...t,.1],[o(1.3),r-.25+a,0,.15],[o(1.4),r-.55,0,.14],[o(1.35),.38+a,0,.09]],l.BODY,{...s,paint:c=>c[1]<.32?l.BODY3:void 0}):e==="bushy"?n.chain([[...t,.1],[o(1.05)-.35,r-.05+a,0,.17],[o(1.05)-.75,r-.2+a,0,.18],[o(1.05)-1,r-.35+a,0,.1]],l.BODY,{...s,paint:c=>c[0]<o(1.05)-.82?l.BELLY:void 0}):e==="stub"||e==="deer"||e==="bob"?n.ell(T.add(t,[-.06,.02+a,0]),[.1,.08,.07],e==="deer"?l.BELLY:l.BODY,{...s,paint:e==="bob"?c=>c[0]<t[0]-.08?l.BODY3:void 0:void 0}):e==="puff"?n.ell(T.add(t,[-.04,.02,0]),[.11,.11,.1],l.BELLY,s):e==="squirrel"||e==="star"?n.chain([[...t,.12],[o(1.3),r+.05+a,0,.25],[o(1.3),r+.6+a,0,.3],[o(1),r+.95+a,0,.27],[o(.65),r+.9+a,0,.16]],e==="star"?l.MAGIC:l.BODY,{...s,extra:!0,paint:e==="star"?c=>kn(c,14,.12)?l.GLINT:void 0:void 0}):e==="otter"?n.chain([[...t,.17],[o(1.3),r-.45+a,0,.12],[o(1.6),.1,0,.07],[o(1.85),.06+a,0,.03]],l.BODY,s):e==="stoat"?n.chain([[...t,.08],[o(1.3),r-.12+a,0,.07],[o(1.6),r-.05+a,0,.06]],l.BODY,{...s,paint:c=>c[0]<o(1.45)?l.BODY3:void 0}):e==="flat"?(n.seg(t,[o(1.15),.3,0],.08,.07,l.BODY2,s),n.ell([o(1.4),.1+a*.5,0],[.28,.03,.14],l.BODY3,s)):e==="thin"&&(n.chain([[...t,.04],[o(1.1),r-.3,0,.03],[o(1.12)+a,r-.55,0,.025]],l.BODY,s),n.ell([o(1.12)+a,r-.62,0],[.04,.07,.04],l.BODY3,s))}function Xh(n,e,t,i,r,a){const s=!e.antlers,o=s?.45:[0,.5,.95,.95][r]*(a("antlersGlow")?1.15:1),c=a("antlersGlow")?i>0?l.MAGIC2:l.MAGIC:l.ACCENT,u={group:11+(i>0?1:0),extra:!0};if(!o)return;const h=.045*Math.max(.8,o),d=i*.35*o;if(e.antlers==="palm"){const _=T.add(t,[-.06*o,.12*o,d*.3]);n.seg(t,_,h*1.3,h*1.2,c,u);for(let g=0;g<5;g++){const M=.35+g*.3,E=T.norm([-Math.cos(M),Math.sin(M)*.9,i*.55]),b=(.24+.05*(g%2))*o;n.ell(T.add(_,T.mul(E,b*.55)),[b*.6,h*1.5,h*.6],c,{...u,dir:E,up:[0,0,1]})}return}const f=T.add(t,[-.18*o,.3*o,d*.4]),p=T.add(t,[-.25*o,.62*o,d*.8]),m=T.add(t,[-.1*o,.95*o,d]);n.chain([[...t,h*1.2],[...f,h],[...p,h*.85],[...m,h*.4]],c,u);const x=(_,g,M,E)=>n.seg(_,T.add(_,T.mul(T.norm(g),M)),E,E*.35,c,u);x(T.add(t,[-.04*o,.1*o,d*.1]),[1,.6,0],.28*o,h*.8),(o>.4||s)&&x(f,[1,.9,0],.3*o,h*.7),o>.7&&(x(p,[.8,1,0],.28*o,h*.6),x(m,[.3,1,i*.2],.18*o,h*.5))}function Kh(n,e,t,i,r="towards"){const a=e===3,s=e===1,o=e===0,c=m=>a&&n.legend.includes(m),u=new et,h=t?.03:0,d=o?.48:s?.42:.36,f=(o?.95:1.08)+h;for(const m of[-1,1]){const x=t&&m>0?.04:0;u.seg([.05,.2,m*.14],[.08,.05+x,m*.15],.07,.06,l.BODY2,{group:2});for(const _ of[-.04,0,.04])u.ell([.16,.03+x,m*.15+_],[.06,.025,.02],l.ACCENT,{group:2});u.anchors.feet.push({c:[.13,.04+x,m*.15],r:.08,group:m>0?6:2})}if(u.ell([-.32,.32,0],[.22,.06,.14],l.BODY2,{dir:[-1,-.6,0],group:3}),u.ell([0,.55+h,0],[.36,.52,.36],l.BODY,{paint:m=>m[0]>.12&&m[1]<f-d*.5?Math.floor(m[1]*18)%3===0&&kn(m,16,.5)?l.BODY2:l.BELLY:void 0}),!c("wings"))for(const m of[-1,1])u.ell([-.06,.58+h,m*.3],[.4,.3,.08],l.BODY2,{dir:[-.3,-1,0],up:[1,0,0],group:m>0?4:2,paint:x=>kn(x,12,.15)?l.BODY3:void 0});u.ell([0,f,0],[d,d*.9,d],l.BODY);for(const m of[-1,1]){const x=T.norm([.75,-.05,m*.4+.35]),_=T.add(et.surface([0,f,0],[d,d*.9,d],x),T.mul(x,-d*.05));u.ell(_,[d*.22,d*.46,d*.4],l.BELLY,{group:1,dir:x});const g=T.add(_,T.mul(x,d*.14));u.ell(g,[d*.1,d*.26,d*.24].map(M=>M*(o?1.15:1)),a?l.MAGIC:l.IRIS,{group:1,dir:x}),u.ell(T.add(g,T.mul(x,d*.07)),[d*.08,d*.14,d*.13].map(M=>M*(o?1.15:1)),a?l.MAGIC2:l.EYE,{group:1,dir:x}),(u.anchors.eyes||={pts:[],size:d*.22}).pts.push(T.add(g,T.mul(x,d*.07))),o||u.ell([d*.05,f+d*.8,m*d*.6],[d*.32,d*.12,d*.08],l.BODY2,{dir:[-.1,1,m*.7],up:[1,0,0],group:1})}if(u.ell(et.surface([0,f,0],[d,d*.9,d],T.norm([.75,-.35,.35])),[d*.2,d*.12,d*.1],l.ACCENT,{dir:[.6,-1,.3],group:1}),c("wings"))for(const m of[-1,1])ms(u,[-.05,.8+h,m*.3],m,1.3,t?.12:0,m>0?l.MAGIC2:l.MAGIC,l.MAGIC,40+(m>0?10:0));if(c("eyesRing"))for(let m=0;m<7;m++){const x=Math.PI*(.15+m/6*.7);u.ell([Math.cos(x)*.2-.1,f+.1+Math.sin(x)*.6,(m-3)*.15],[.07,.07,.07],l.MAGIC2,{group:95+m,extra:!0}),u.ell([Math.cos(x)*.2-.05,f+.1+Math.sin(x)*.6,(m-3)*.15],[.035,.035,.035],l.EYE,{group:95+m,extra:!0})}u.anchors.head={c:[0,f,0],r:[d,d*.9,d]},u.anchors.neck={c:[0,f-d*.75,0],r:d*.85,dir:[0,1,0]},ol(u);const{sp:p}=Mi(u,{height:sl(e,i,.95),facing:r});return a&&al(p,31),p}const zi=(n,e,t,i,r,a,s=1)=>{for(const o of i)n.ell(et.surface(e,t,T.norm(o)),[r,r*1.2,r],a,{group:s});n.anchors.head||={c:e,r:t},n.anchors.eyes||={pts:i.map(o=>et.surface(e,t,T.norm(o))),size:r}},au=(n,e,t)=>n.ell([e,.005,0],[t,.005,t*.6],l.NOSE,{group:0});function Ln(n,e,t,i,r,a){ol(n);const{sp:s}=Mi(n,{height:sl(t,i,r),facing:a});return t===3&&al(s,e.id.length*131),s}const su=(n,e,t)=>{n.ell(e,[t,t*.35,t],l.MAGIC,{group:95,extra:!0,paint:i=>i[1]>e[1]?l.MAGIC2:void 0});for(let i=0;i<5;i++){const r=i/5*Math.PI*2;n.ell(T.add(e,[Math.cos(r)*t*.8,t*.55,Math.sin(r)*t*.8]),[t*.38,t*.12,t*.12],l.MAGIC,{dir:[0,1,0],up:[1,0,0],group:96,extra:!0})}},ll=(n,e)=>e.forEach(([t,i],r)=>n.ell(T.add(t,[0,i*.45,0]),[i*.55,.07,.07],l.MAGIC,{dir:[(r%3-1)*.25,1,(r%2-.5)*.3],group:80+r%2,extra:!0,paint:a=>a[2]>t[2]?l.MAGIC2:void 0}));function qh(n,e,t,i,r="towards"){const a=e===3,s=new et,o=t?.03:0;for(const[d,f]of[[.28,.2],[.28,-.2],[-.28,.2],[-.28,-.2]])s.seg([d,.15,f],[d+(f>0?o:-o),.03,f],.06,.05,l.BODY3,{group:f>0?6:2}),s.anchors.feet.push({c:[d+.03+(f>0?o:-o),.03,f],r:.065,group:f>0?6:2});const c=[0,.32,0],u=[.5,.32,.38];s.ell(c,u,l.BODY2,{paint:d=>kn(d,22,.3)?l.BODY3:kn(d,19,.12)?l.BELLY:void 0});for(let d=0;d<46;d++){const f=d*2.399%(Math.PI*2),p=d/46*.9+.05,m=T.norm([Math.cos(f)*Math.sin(p*Math.PI*.5)-.25,Math.cos(p*Math.PI*.5)*.9+.1,Math.sin(f)*Math.sin(p*Math.PI*.5)]);m[0]>.55||s.ell(T.add(et.surface(c,u,m),T.mul(m,.02)),[.1,.025,.025],d%4?l.BODY2:l.BODY3,{dir:T.add(m,[-.4,0,0]),group:1})}const h=[.48,.22,0];return s.ell(h,[.22,.14,.15],l.BELLY,{dir:[1,-.3,0],group:1}),s.ell([.69,.16,0],[.04,.04,.04],l.NOSE,{group:1}),zi(s,h,[.22,.14,.15],[[.3,.6,.55],[.3,.6,-.55]],.035,a?l.MAGIC2:l.EYE),a&&ll(s,[[[-.3,.55,.1],.35],[[-.05,.62,-.1],.5],[[.2,.55,.12],.4],[[-.15,.58,.2],.3]]),Ln(s,n,e,i,.6,r)}function Zh(n,e,t,i,r="towards"){const a=e===3,s=new et,o=t?.05:0;for(const h of[-1,1])s.ell([-.22,.16,h*.36],[.24,.13,.12],h>0?l.BODY:l.BODY2,{dir:[1,.3,0],group:h>0?6:2,paint:d=>kn(d,14,.15)?l.BODY3:void 0}),s.ell([.05,.04,h*.4],[.16,.04,.08],h>0?l.BODY:l.BODY2,{group:h>0?6:2}),s.seg([.35,.2+o,h*.24],[.42,.03,h*.3],.05,.04,h>0?l.BODY:l.BODY2,{group:h>0?7:2}),s.anchors.feet.push({c:[.45,.03,h*.3],r:.06,group:h>0?7:2},{c:[.12,.04,h*.4],r:.08,group:h>0?6:2});const c=[0,.3+o,0],u=[.5,.28,.4];s.ell(c,u,l.BODY,{paint:h=>h[1]<c[1]-.12?l.BELLY:h[0]>.38&&Math.abs(h[1]-(c[1]-.02))<.018?l.LINE:kn(h,14,.22)?l.BODY3:void 0});for(const h of[-1,1]){const d=[.3,.55+o,h*.17];s.ell(d,[.1,.09,.1],l.BODY,{group:1}),s.ell(et.surface(d,[.1,.09,.1],T.norm([.6,.5,h*.5])),[.05,.05,.05],a?l.MAGIC2:l.IRIS,{group:1}),s.ell(et.surface(d,[.11,.1,.11],T.norm([.65,.45,h*.5])),[.03,.015,.03],l.EYE,{group:1})}return s.anchors.head={c:[.22,.45+o,0],r:[.3,.2,.3],top:[.18,.62+o,0]},s.anchors.eyes={pts:[-1,1].map(h=>et.surface([.3,.55+o,h*.17],[.1,.09,.1],T.norm([.6,.5,h*.5]))),size:.05},s.anchors.neck={c:[.32,.3+o,0],r:.25,dir:[1,.3,0]},a&&su(s,[.15,.66+o,0],.16),Ln(s,n,e,i,.55,r)}function $h(n,e,t,i,r="towards"){const a=e===3,s=e===1,o=f=>a&&n.legend.includes(f),c=new et,u=t?.02:0;for(const f of[-1,1]){const p=t&&f>0?.04:0;c.seg([0,.3,f*.08],[.03,.03+p,f*.08],.03,.025,l.NOSE,{group:f>0?7:2}),c.ell([.08,.02+p,f*.08],[.08,.015,.04],l.NOSE,{group:2}),c.anchors.feet.push({c:[.07,.03+p,f*.08],r:.06,group:f>0?7:2})}if(c.ell([-.55,.42,0],[.32,.035,.12],l.BODY2,{dir:[-1,-.25,0],group:3}),c.ell([0,.52+u,0],[.42,.26,.24],l.BODY,{dir:[1,.45,0]}),!o("wings"))for(const f of[-1,1])c.ell([-.1,.55+u,f*.2],[.45,.17,.05],l.BODY2,{dir:[-1,-.25,0],group:f>0?4:2});const h=[.36,.84+u,0],d=s?.19:.16;if(c.ell(h,[d*1.1,d,d*.95],l.BODY,{paint:f=>f[1]>h[1]+d*.55?l.BELLY:void 0}),c.ell(T.add(h,[d*1.5,-d*.25,0]),[d*1,d*.38,d*.3],l.NOSE,{dir:[1,-.2,0],group:1}),zi(c,h,[d*1.1,d,d*.95],[[.55,.35,.65],[.55,.35,-.65]],d*.16,a?l.MAGIC2:l.EYE),o("wings"))for(const f of[-1,1])ms(c,[-.05,.65+u,f*.18],f,1.1,t?.1:0,f>0?l.MAGIC2:l.MAGIC,l.MAGIC,40+(f>0?10:0));if(o("eyesRing"))for(let f=0;f<6;f++){const p=Math.PI*(.2+f/5*.6);c.ell([Math.cos(p)*.25-.1,.95+Math.sin(p)*.45,(f-2.5)*.12],[.06,.06,.06],l.MAGIC2,{group:95+f,extra:!0})}return Ln(c,n,e,i,.75,r)}function Jh(n,e,t,i,r="towards"){const a=e===3,s=f=>a&&n.legend.includes(f),o=new et,c=t===0,u=.55,h=s("wingsBig")?1.5:1;au(o,0,.3*h);for(const f of[-1,1]){const p=[0,u+.05,f*.1],m=[.05,u+(c?.35:-.05),f*.45*h],x=[[-.05,u+(c?.45:-.15),f*.85*h],[-.25,u+(c?.2:-.25),f*.75*h],[-.3,u+(c?0:-.25),f*.4*h]],_=s("wingsBig")?l.MAGIC:l.BODY2,g=s("wingsBig")?l.MAGIC2:l.BODY3;o.seg(p,m,.03,.025,g,{group:11});for(const w of x)o.seg(m,w,.02,.012,g,{group:11});const M=T.sub(x[0],p),E=T.norm(M),b=T.norm(T.sub(x[2],m)),R=T.norm(T.sub(b,T.mul(E,T.dot(b,E))));o.flat(T.add(T.lerp(p,x[0],.5),T.mul(R,.12*h)),E,R,Math.hypot(...M)*.55,.3*h,Ir.membrane(_),{group:10+(f>0?1:0),bend:.2})}o.ell([0,u,0],[.13,.16,.12],l.BODY,{group:1});const d=[.08,u+.2,0];o.ell(d,[.12,.11,.11],l.BODY,{group:1});for(const f of[-1,1])o.ell(T.add(d,[-.02,.15,f*.07]),[.12,.045,.02],l.BODY,{dir:[.1,1,f*.3],up:[1,0,0],group:1,paint:p=>p[0]>d[0]-.01?l.EAR:void 0});return zi(o,d,[.12,.11,.11],[[.7,.2,.5],[.7,.2,-.5]],.025,a?l.MAGIC2:l.EYE),o.ell(et.surface(d,[.12,.11,.11],[1,-.2,0]),[.025,.02,.03],l.NOSE,{group:1}),Ln(o,n,e,i,.55,r)}function Qh(n,e,t,i,r="towards"){const a=e===3,s=new et,o=t?.03:0;s.seg([-.5,.18,0],[-.62,.12,0],.04,.02,l.SKIN,{group:3});for(const c of[-1,1])s.ell([-.3,.05,c*.2],[.07,.04,.05],l.SKIN,{group:c>0?6:2}),s.anchors.feet.push({c:[-.3,.05,c*.2],r:.07,group:c>0?6:2});s.ell([0,.3,0],[.52,.29,.33],l.BODY,{paint:c=>c[1]>.45?l.BODY2:void 0}),s.ell([.55,.24,0],[.2,.07,.07],l.SKIN,{dir:[1,-.15,0],group:1}),s.ell([.74,.21,0],[.04,.05,.06],l.NOSE,{group:1});for(const c of[-1,1]){const u=[.32,.1-(c>0?o:0),c*.34];s.ell(u,[.13,.035,.12],l.SKIN,{group:c>0?7:2,axes:[[1,0,0],[0,1,0],[0,0,1]]});for(let h=0;h<4;h++)s.ell(T.add(u,[.14,-.01,c*(h-1.5)*.05]),[.05,.015,.015],l.ACCENT,{group:c>0?7:2})}for(const c of[-1,1])s.ell(et.surface([0,.3,0],[.52,.29,.33],T.norm([.85,.3,c*.35])),[.015,.015,.015],a?l.MAGIC2:l.EYE,{group:1});return s.anchors.head={c:[.32,.34,0],r:[.25,.22,.25],top:[.3,.58,0]},s.anchors.eyes={pts:[-1,1].map(c=>et.surface([0,.3,0],[.52,.29,.33],T.norm([.85,.3,c*.35]))),size:.03},s.anchors.neck={c:[.36,.3,0],r:.27,dir:[1,.1,0]},a&&su(s,[.15,.62,0],.15),Ln(s,n,e,i,.55,r)}function jh(n,e,t,i,r="towards"){const a=e===3,s=d=>a&&n.legend.includes(d),o=new et;for(const d of[-1,1])for(let f=0;f<3;f++){const p=.25-f*.25,m=(f+(d>0?1:0)+t)%2?.06:-.06,x=[p,.22,d*.2];o.chain([[...x,.03],[p+m+(1-f)*.06,.32,d*.42,.025],[p+m*1.5+(1-f)*.15,.02,d*.55,.015]],d>0?l.BODY2:l.BODY3,{group:d>0?7:2})}o.ell([-.12,.34,0],[.46,.24,.32],l.BODY,{paint:d=>Math.abs(d[2])<.018&&d[1]>.4?l.LINE:d[1]>.5&&d[2]>.05&&d[2]<.17?l.BELLY:void 0}),o.ell([.38,.33,0],[.16,.16,.26],l.BODY,{group:1});const c=[.56,.3,0];o.ell(c,[.1,.1,.17],l.BODY2,{group:1});const u=[.3,.5,.7,.75][e]*(s("horn")?1.3:1),h=s("horn")?l.MAGIC:l.BODY3;for(const d of[-1,1]){const f=T.add(c,[.08,.02,d*.1]),p=T.add(f,[u*.7,u*.45,d*u*.15]),m=T.add(p,[u*.25,-u*.12,-d*u*.12]);o.chain([[...f,.045],[...p,.035],[...m,.015]],h,{group:8+(d>0?1:0)}),o.seg(T.lerp(f,p,.55),T.add(T.lerp(f,p,.55),[0,u*.22,0]),.02,.008,h,{group:8})}for(const d of[-1,1])o.chain([[...T.add(c,[.05,.06,d*.1]),.012],[c[0]+.1,.5,d*.22,.012],[c[0]+.2,.5,d*.26,.012]],l.BODY3,{group:9,extra:!0});return zi(o,c,[.1,.1,.17],[[.4,.3,.85],[.4,.3,-.85]],.032,a?l.MAGIC2:l.EYE,9),s("crystals")&&ll(o,[[[-.35,.5,.1],.3],[[-.1,.55,-.08],.45],[[.1,.5,.1],.35]]),Ln(o,n,e,i,.5,r)}function ed(n,e,t,i,r="towards"){const a=e===3,s=new et,o=t?.04:0;s.ell([0,.07,0],[.6+o,.07,.17],l.SKIN,{group:1}),s.chain([[.45+o,.08,0,.1],[.6+o,.25,0,.09],[.68+o,.28,0,.08]],l.SKIN,{group:1});for(const h of[-1,1])s.seg([.7+o,.32,h*.04],[.78+o,.55,h*.1],.018,.014,l.SKIN,{group:5}),s.ell([.78+o,.57,h*.1],[.03,.03,.03],a?l.MAGIC2:l.EYE,{group:5});s.anchors.head={c:[.68+o,.3,0],r:[.09,.08,.09],top:[.66+o,.38,0]},s.anchors.eyes={pts:[-1,1].map(h=>[.78+o,.57,h*.1]),size:.03},s.anchors.neck={c:[.55+o,.17,0],r:.1,dir:[1,1.2,0]};const c=[-.12,.4,0],u=a?l.MAGIC:l.BODY;return s.ell(c,[.32,.32,.22],u,{group:3,paint:h=>{const d=Math.atan2(h[1]-c[1],h[0]-c[0]);return((Math.hypot(h[0]-c[0],h[1]-c[1])/.32-d/(Math.PI*2)*.3)%.3+.3)%.3<.06?a?l.MAGIC2:l.BODY3:void 0}}),Ln(s,n,e,i,.45,r)}function td(n,e,t,i,r="towards"){const a=e===3,s=new et;for(const o of[-1,1])for(let c=0;c<7;c++){const u=-.45+c*.15,h=(c+t)%2?.03:-.03;s.seg([u,.1,o*.22],[u+h,.01,o*.33],.025,.015,l.BODY3,{group:o>0?7:2})}for(const o of[-1,1])s.chain([[.5,.15,o*.08,.02],[.7,.3,o*.2,.015],[.82,.22,o*.26,.012]],l.BODY3,{group:9,extra:!0});return s.ell([0,.18,0],[.58,.2,.3],l.BODY,{paint:o=>(Math.floor((o[0]+.6)*9)%2&&o[1]>.2?l.BODY2:void 0)||(Math.abs((o[0]+.6)*9%1)<.12?l.LINE:void 0)}),zi(s,[0,.18,0],[.58,.2,.3],[[.92,.3,.25],[.92,.3,-.25]],.02,a?l.MAGIC2:l.EYE),a&&ll(s,[[[-.3,.32,.05],.3],[[0,.37,-.05],.45],[[.25,.32,.05],.32]]),Ln(s,n,e,i,.4,r)}function nd(n,e,t,i,r="towards"){const a=e===3,s=e===1,o=p=>a&&n.legend.includes(p),c=new et,u=t?.7:0,h=[];for(let p=0;p<=12;p++){const m=p/12;h.push([-.9+m*1.2,.07,Math.sin(m*Math.PI*2+u)*.25*(1-m*.5),.03+.045*Math.sin(Math.min(1,m*1.4)*Math.PI/2)])}h.push([.38,.25,h[12][2],.07],[.42,.45,h[12][2]*.8,.065]),c.chain(h,l.BODY,{paint:p=>p[1]<.05&&p[0]<.35?l.BELLY:kn([p[0]*1.5,p[1],p[2]],14,.3)?l.BODY3:void 0});const d=[.5,.5,h[13][2]*.8],f=s?.11:.09;if(c.ell(d,[f*1.5,f*.75,f],l.BODY,{dir:[1,-.15,0],group:1}),zi(c,d,[f*1.5,f*.75,f],[[.5,.5,.7],[.5,.5,-.7]],f*.22,a?l.MAGIC2:l.EYE),t||c.seg(T.add(d,[f*1.4,-f*.2,0]),T.add(d,[f*2.3,-f*.3,0]),.01,.008,l.SKIN,{group:1}),c.anchors.feet.push({c:T.add(h[0].slice(0,3),[-.02,-.01,0]),r:.06,group:3,tail:!0}),c.anchors.neck={c:[.42,.36,h[12][2]*.9],r:.075,dir:[.2,1,0]},o("wings"))for(const p of[-1,1])ms(c,[0,.2,p*.05],p,.9,t?.1:0,p>0?l.MAGIC2:l.MAGIC,l.MAGIC,40+(p>0?10:0));return Ln(c,n,e,i,.45,r)}function id(n,e,t,i,r="towards"){const a=e===3,s=f=>a&&n.legend.includes(f),o=new et,c=t===0,u=.55,h=s("wingsBig")?1.45:1,d=s("wingsBig")?l.MAGIC:l.BODY;au(o,0,.3*h);for(const f of[-1,1]){const p=c?.5:-.1,m=T.norm([.35,p,f]),x=T.norm([-.3,p*.6,f]);o.flat(T.add([0,u,f*.05],T.mul(m,.38*h)),m,T.norm(T.cross(m,[0,1,0])),.4*h,.24*h,Ir.spotted(d,l.BELLY,l.BODY3),{group:10+(f>0?1:0)}),o.flat(T.add([-.05,u,f*.05],T.mul(x,.26*h)),x,T.norm(T.cross(x,[0,1,0])),.27*h,.17*h,Ir.spotted(s("wingsBig")?l.MAGIC2:l.BODY2,l.BODY2,l.BODY2),{group:12+(f>0?1:0)}),o.chain([[.12,u+.08,f*.03,.015],[.2,u+.25,f*.1,.025],[.24,u+.32,f*.14,.012]],l.BODY2,{group:11})}return o.ell([0,u,0],[.22,.09,.09],l.BELLY,{group:1,paint:f=>kn(f,30,.25)?l.BODY2:void 0}),o.ell([.17,u+.03,0],[.07,.07,.07],l.BELLY,{group:1}),zi(o,[.17,u+.03,0],[.07,.07,.07],[[.7,.3,.6],[.7,.3,-.6]],.02,a?l.MAGIC2:l.EYE),Ln(o,n,e,i,.5,r)}function rd(n,e,t,i,r="towards"){const a=e===3,s=u=>a&&n.legend.includes(u),o=new et,c=t?.05:0;for(let u=0;u<9;u++){const h=u/8,d=-.6+h*1.15;o.ell([d,.12+Math.sin(h*Math.PI)*(.06+c),0],[.08,.1-h*.02,.12-h*.03],u<2?l.MAGIC2:u%2?l.BODY2:l.BODY,{group:1})}s("lantern")&&o.ell([-.75,.3,0],[.22,.22,.22],l.MAGIC2,{group:3,paint:u=>u[1]<.2?l.MAGIC:void 0});for(let u=0;u<6;u++)o.seg([-.2+u*.12,.05,.08],[-.2+u*.12+(u%2?.02:-.02)*(t?-1:1),0,.12],.015,.01,l.BODY3,{group:7});return o.ell([.6,.14,0],[.06,.06,.08],l.BODY3,{group:1}),zi(o,[.6,.14,0],[.06,.06,.08],[[.6,.3,.7],[.6,.3,-.7]],.015,a?l.MAGIC2:l.EYE),Ln(o,n,e,i,.4,r)}function ad(n,e,t,i,r="towards"){const a=e===3,s=h=>a&&n.legend.includes(h),o=new et,c=[.15,.28,0];for(const h of[-1,1])for(let d=0;d<4;d++){const f=-.6+d*.4,p=(d+(h>0?0:1)+t)%2?.05:-.05,m=T.add(c,[.05-d*.04,0,h*.1]),x=T.add(m,[Math.cos(f)*.3*(d<2?1:-.6)+p,.3,h*.3]),_=T.add(m,[Math.cos(f)*.55*(d<2?1:-.8)+p*1.5,-.28,h*.55]);o.chain([[...m,.03],[...x,.028],[..._,.015]],h>0?l.BODY2:l.BODY3,{group:h>0?7:2})}o.ell([-.28,.38,0],[.34,.28,.3],l.BODY,{paint:h=>(Math.abs(h[2])<.03||Math.abs(h[0]+.28)<.03)&&h[1]>.45?l.BELLY:void 0}),o.ell(c,[.18,.13,.17],l.BODY2,{group:1}),o.anchors.head={c,r:[.18,.13,.17]},o.anchors.eyes={pts:[[.05,.05],[.05,-.05]].map(([h,d])=>et.surface(c,[.18,.13,.17],T.norm([.9,h*6,d*4]))),size:.03},o.anchors.neck={c:[-.02,.32,0],r:.15,dir:[1,0,0]};const u=s("eyesRing");for(const[h,d]of[[.05,.05],[.05,-.05],[.02,.1],[.02,-.1]])o.ell(et.surface(c,[.18,.13,.17],T.norm([.9,h*6,d*4])),[.025,.025,.025],u?l.MAGIC2:l.EYE,{group:1});if(u)for(let h=0;h<5;h++){const d=Math.PI*(.2+h/4*.6);o.ell([-.3+Math.cos(d)*.2,.75+Math.sin(d)*.35,(h-2)*.12],[.06,.06,.06],l.MAGIC2,{group:95+h,extra:!0})}return Ln(o,n,e,i,.5,r)}const sd=new Map(Object.entries({owl:Kh,hedgehog:qh,toad:Zh,raven:$h,bat:Jh,mole:Qh,beetle:jh,snail:ed,woodlouse:td,snake:nd,moth:id,glowworm:rd,spider:ad})),cl=[{id:"wolf",name:"Wolf",plan:"quad",hue:.08,sat:.24,val:.56,legend:["wings","mane"],q:{len:.64,chest:.42,tuck:.6,neck:.32,neckAng:.7,neckW:.42,hr:.26,snout:.82,snoutD:.7,ear:"point",earS:.82,tail:"brush",paw:"paw",legW:1.25,saddle:!0,belly:!0},tail:"up"},{id:"fox",name:"Fox",plan:"quad",q:{hgt:.8,len:.62,chest:.4,tuck:.5,neck:.3,neckAng:.7,neckW:.32,hr:.24,snout:1.05,snoutD:.5,snoutTaper:.6,ear:"point",earS:1.35,tail:"bushy",paw:"paw",legW:.9,belly:!0,socks:.3},hue:.06,sat:.8,val:.9,belly:"white",legend:["tails"]},{id:"badger",name:"Badger",plan:"quad",q:{hgt:.62,len:.78,chest:.2,tuck:.22,neck:.18,neckAng:.1,neckW:.5,hr:.26,snout:1,snoutD:.55,snoutTaper:.55,ear:"round",earS:.7,tail:"stub",paw:"paw",legW:1.35,legMat:l.BODY3,face:"badger",shaggy:!0},hue:.65,sat:.08,val:.45,legend:["crystals"]},{id:"boar",name:"Boar",plan:"quad",hue:.07,sat:.62,val:.5,legend:["tusksBig"],q:{len:.72,chest:.34,tuck:.42,neck:.2,neckAng:-.15,neckW:.55,hr:.27,snout:1.25,snoutD:.62,snoutTaper:.55,ear:"small",earS:.8,tail:"thin",paw:"hoof",legW:1.15,ridge:!0,tusks:!0,back:"hump",disc:!0},ridge:!0},{id:"stag",name:"Stag",plan:"quad",q:{hgt:1.3,len:.6,chest:.6,tuck:.7,neck:.55,neckAng:.95,neckW:.32,hr:.2,snout:1.15,snoutD:.6,snoutTaper:.65,ear:"point",earS:1.1,tail:"deer",paw:"hoof",legW:.75,antlers:"branch",rump:!0,spots:"young",belly:!0},hue:.08,sat:.5,val:.7,legend:["antlersGlow"]},{id:"hare",name:"Hare",plan:"quad",q:{hgt:.72,len:.5,chest:.4,tuck:.45,neck:.2,neckAng:.9,neckW:.35,hr:.27,snout:.65,snoutD:.7,ear:"long",earS:2.4,tail:"puff",paw:"paw",legW:.85,haunch:1.35,hindFoot:1.6,back:"arch",belly:!0,whiskers:!0},hue:.08,sat:.4,val:.72,legend:["jackalope"]},{id:"owl",name:"Owl",plan:"owl",hue:.08,sat:.5,val:.55,legend:["eyesRing","wings"]},{id:"bear",name:"Bear",plan:"quad",q:{hgt:1.15,len:.72,chest:.38,tuck:.4,neck:.25,neckAng:.3,neckW:.55,hr:.28,snout:.7,snoutD:.62,snoutTaper:.7,ear:"round",earS:.8,tail:"stub",paw:"paw",legW:1.55,back:"hump",muzzle:!0,shaggy:!0},hue:.07,sat:.55,val:.42,legend:["moss"]},{id:"hedgehog",name:"Hedgehog",plan:"hedgehog",hue:.08,sat:.4,val:.5,legend:["crystals"]},{id:"squirrel",name:"Squirrel",plan:"quad",q:{hgt:.55,len:.45,chest:.35,tuck:.4,neck:.2,neckAng:.9,neckW:.35,hr:.3,snout:.55,snoutD:.65,ear:"tuft",earS:1.1,tail:"squirrel",paw:"paw",legW:.8,haunch:1.3,back:"arch",belly:!0,whiskers:!0},hue:.03,sat:.75,val:.75,belly:"white",legend:["starTail"]},{id:"toad",name:"Toad",plan:"toad",hue:.2,sat:.5,val:.55,legend:["crown"]},{id:"otter",name:"Otter",plan:"quad",q:{hgt:.55,len:1,chest:.25,tuck:.25,neck:.3,neckAng:.35,neckW:.5,hr:.27,snout:.6,snoutD:.7,ear:"round",earS:.5,tail:"otter",paw:"paw",legW:1.1,muzzle:!0,belly:!0,whiskers:!0},hue:.07,sat:.55,val:.45,belly:"white",legend:["ribbons"]},{id:"lynx",name:"Lynx",plan:"quad",q:{hgt:.9,len:.55,chest:.5,tuck:.55,neck:.25,neckAng:.8,neckW:.4,hr:.27,snout:.5,snoutD:.75,snoutTaper:.8,ear:"tuft",earS:1,tail:"bob",paw:"paw",legW:1.2,cheeks:!0,spots:!0,belly:!0,whiskers:!0},hue:.09,sat:.45,val:.75,legend:["mane"]},{id:"elk",name:"Elk",plan:"quad",q:{hgt:1.4,len:.68,chest:.6,tuck:.66,neck:.45,neckAng:.75,neckW:.42,hr:.24,snout:1.6,snoutD:.9,snoutTaper:.85,ear:"point",earS:.9,tail:"stub",paw:"hoof",legW:.9,back:"hump",antlers:"palm",shaggy:!0},hue:.07,sat:.55,val:.38,legend:["antlersGlow","moss"]},{id:"raven",name:"Raven",plan:"raven",hue:.68,sat:.35,val:.3,legend:["wings","eyesRing"]},{id:"bat",name:"Bat",plan:"bat",hue:.78,sat:.25,val:.45,legend:["wingsBig"]},{id:"mole",name:"Mole",plan:"mole",hue:.7,sat:.15,val:.32,legend:["crown"]},{id:"beaver",name:"Beaver",plan:"quad",q:{hgt:.6,len:.65,chest:.2,tuck:.22,neck:.2,neckAng:.4,neckW:.55,hr:.28,snout:.6,snoutD:.75,ear:"round",earS:.45,tail:"flat",paw:"paw",legW:1.2,back:"arch",teeth:!0,whiskers:!0},hue:.06,sat:.6,val:.45,legend:["moss"]},{id:"stoat",name:"Stoat",plan:"quad",q:{hgt:.5,len:1,chest:.3,tuck:.33,neck:.35,neckAng:.6,neckW:.32,hr:.25,snout:.6,snoutD:.6,ear:"round",earS:.6,tail:"stoat",paw:"paw",legW:.8,belly:!0,back:"arch",whiskers:!0},hue:.1,sat:.25,val:.92,legend:["ribbons","mane"]},{id:"snail",name:"Snail",plan:"snail",hue:.08,sat:.45,val:.55,legend:["glowShell"]},{id:"ram",name:"Ram",plan:"quad",q:{hgt:.95,len:.6,chest:.48,tuck:.52,neck:.22,neckAng:.45,neckW:.48,hr:.25,snout:.85,snoutD:.75,snoutTaper:.8,ear:"small",earS:.7,tail:"stub",paw:"hoof",legW:.9,wool:!0,horns:"curl",face:"dark"},hue:.1,sat:.12,val:.88,legend:["hornsGlow"]},{id:"woodlouse",name:"Woodlouse",plan:"woodlouse",hue:.65,sat:.12,val:.45,legend:["crystals"]},{id:"snake",name:"Snake",plan:"snake",hue:.25,sat:.45,val:.45,legend:["wings"]},{id:"moth",name:"Moth",plan:"moth",hue:.1,sat:.3,val:.7,legend:["wingsBig"]},{id:"marten",name:"Pine marten",plan:"quad",q:{hgt:.55,len:.78,chest:.35,tuck:.38,neck:.3,neckAng:.55,neckW:.35,hr:.25,snout:.65,snoutD:.6,ear:"round",earS:.9,tail:"bushy",paw:"paw",legW:.85,belly:!0,back:"arch"},hue:.07,sat:.6,val:.45,legend:["mane"]},{id:"salamander",name:"Salamander",plan:"quad",q:{hgt:.42,len:.9,chest:.14,tuck:.14,neck:.12,neckAng:.05,neckW:.5,hr:.27,snout:.55,snoutD:.55,ear:"none",tail:"otter",paw:"paw",legW:1,spots:!0,spotMat:"belly"},hue:.1,sat:.1,val:.22,belly:"yellow",legend:["flames"]},{id:"glowworm",name:"Glow-worm",plan:"glowworm",hue:.12,sat:.4,val:.35,legend:["lantern"]},{id:"spider",name:"Spider",plan:"spider",hue:.07,sat:.45,val:.4,legend:["eyesRing"]},{id:"dormouse",name:"Dormouse",plan:"quad",q:{hgt:.38,len:.45,chest:.35,tuck:.38,neck:.15,neckAng:.6,neckW:.4,hr:.34,snout:.45,snoutD:.7,ear:"round",earS:.85,tail:"squirrel",paw:"paw",legW:.8,back:"arch",belly:!0,whiskers:!0,eyeK:1.6},hue:.09,sat:.6,val:.75,belly:"white",legend:["starTail"]},{id:"beetle",name:"Stag beetle",plan:"beetle",hue:.78,sat:.5,val:.35,legend:["horn","crystals"]}],ou=Object.fromEntries(cl.map(n=>[n.id,n])),Vl=[[[255,70,170],[255,245,250],[255,230,70]],[[40,220,255],[255,236,60],[255,80,180]],[[150,80,255],[175,255,60],[255,255,255]]],Wl={sneakers:[[255,70,90],[250,250,245]],glitter:[[215,215,235],[190,190,210]],platform:[[160,60,230],[40,30,52]]};function od(n,e,t=null){const i=ld(n,e);if(!t)return i;if(t.collar&&(i[l.COLLAR]=Array.isArray(t.collar)?t.collar:i[l.MAGIC]),t.hat!=null){const[r,a,s]=Vl[t.hat%Vl.length];i[l.HAT1]=r,i[l.HAT2]=a,i[l.POM]=s}if(t.glasses&&(i[l.SHADES]=[22,18,32],i[l.FRAME]=t.glasses==="heart"?[255,60,110]:[255,90,210]),t.shoes){const[r,a]=Wl[t.shoes]||Wl.sneakers;i[l.SHOE]=r,i[l.SOLE]=a}if(t.woken){i[l.WOKEN]=[255,40,36];for(const r of[l.BODY,l.BODY2,l.BODY3,l.BELLY,l.ACCENT,l.EAR])i[r]&&(i[r]=i[r].map((a,s)=>Math.round(a*.72+[30,8,12][s]*.1)))}return i}function ld(n,e){const t=ou[n],i=e.cVal/.85,r=e.cSat/.6,a=pe(t.hue,t.sat*r*e.sat,t.val*i),s=t.belly==="yellow"?[240,196,40]:t.belly==="white"||t.q?.face==="badger"?[236,232,222]:pe(t.hue+.03,t.sat*.5*r,Math.min(1,t.val*i*1.3+.08)),o=pe(e.magicHue+t.hue*.3,.6,1),c=pe(e.magicHue+t.hue*.3,.18,1),u=["boar","stag","elk","ram"].includes(t.id);return{[l.BODY]:a,[l.BODY2]:pe(t.hue+.02,Math.min(1,t.sat*r*1.2+.05),t.val*i*.66),[l.BODY3]:pe(t.hue+.03,Math.min(1,t.sat*r*1.3+.1),t.val*i*.4),[l.BELLY]:s,[l.ACCENT]:u?[236,226,200]:pe(t.hue+.05,t.sat*.6,Math.min(1,t.val*i*.5+.25)),[l.MAGIC]:o,[l.MAGIC2]:c,[l.LEAF]:pe(.3,.55,.55),[l.LEAF2]:pe(.25,.5,.75),[l.LEAF3]:pe(.33,.6,.35),[l.TRUNK]:pe(.07,.45,.32),[l.EYE]:[24,18,30],[l.PUPIL]:[70,40,90],[l.GLINT]:[255,255,245],[l.NOSE]:[38,28,36],[l.EAR]:pe(t.hue+.97,Math.min(1,t.sat*.6+.2),Math.min(1,t.val*i*.55+.2)),[l.IRIS]:t.plan==="owl"?[255,176,40]:pe(.12,.7,.85),[l.SKIN]:[238,158,192]}}const cd=["size","growth","pixel","head","eye","legs","long","fur"],Wr=new Map;function ud(n,e,t,i,r="towards",a=null){const s=ou[n]||cl[0],o=a&&(a.collar||a.hat!=null||a.glasses||a.shoes||a.woken)?a:null,c=[s.id,e,t,r,...cd.map(h=>i[h]),o?[!!o.collar,o.hat??"",o.glasses||"",o.shoes||"",!!o.woken].join(","):""].join("|");let u=Wr.get(c);if(!u){if(u=Hh(o,()=>s.q?Wh(s,e,t,i,r):sd.get(s.plan)(s,e,t,i,r)),o?.woken)for(let h=0;h<u.m.length;h++)(u.m[h]===l.EYE||u.m[h]===l.IRIS||u.m[h]===l.PUPIL)&&(u.m[h]=l.WOKEN);Wr.size>600&&Wr.delete(Wr.keys().next().value),Wr.set(c,u)}return u}const qe=(...n)=>({l:n}),vt=(n,e,t,i,r)=>({a:[n,e,t,i,r]}),Jt=(n,e)=>({d:[n,e]}),dt=(n,e=.86)=>qe([.5,e],[.5,n]),ft=vt(.5,.76,.13,25,155),hd=n=>n.l?{l:n.l.map(([e,t])=>[1-e,t])}:n.a?{a:[1-n.a[0],n.a[1],n.a[2],180-n.a[3],180-n.a[4]]}:{d:[1-n.d[0],n.d[1]]},pt=(...n)=>n.flatMap(e=>[e,hd(e)]);function ci(n,e,t){const i=e[0]-n[0],r=e[1]-n[1],a=Math.hypot(i,r),s=t*a,o=(a*a/4+s*s)/(2*Math.abs(s)),c=(n[0]+e[0])/2,u=(n[1]+e[1])/2,h=r/a,d=-i/a,f=(o-Math.abs(s))*Math.sign(s),p=c-h*f,m=u-d*f,x=Math.atan2(n[1]-m,n[0]-p)*180/Math.PI;let g=Math.atan2(e[1]-m,e[0]-p)*180/Math.PI-x;for(;g>180;)g-=360;for(;g<-180;)g+=360;return vt(p,m,o,x,x+g)}const dd=(n,e,t,i,r,a=24)=>qe(...Array.from({length:a+1},(s,o)=>[n+i*Math.sin(o/a*r*2*Math.PI),e+(t-e)*o/a])),fd=(n,e,t,i,r,a=0,s=40)=>qe(...Array.from({length:s+1},(o,c)=>{const u=c/s,h=(a+u*r*360)*Math.PI/180,d=t+(i-t)*u;return[n+d*Math.cos(h),e+d*Math.sin(h)]})),ba=(n,e,t,i,r)=>r.map(a=>{const s=Math.cos(a*Math.PI/180),o=Math.sin(a*Math.PI/180);return qe([n+t*s,e+t*o],[n+i*s,e+i*o])});dt(.3),qe([.28,.08],[.5,.3],[.72,.08]),vt(.5,.55,.2,-55,55),Jt(.5+.2*Math.cos(-55*Math.PI/180),.55+.2*Math.sin(-55*Math.PI/180)),dt(.34),qe([.36,.06],[.5,.34],[.64,.06]),vt(.67,.66,.17,180,-80),Jt(.67+.17*Math.cos(-80*Math.PI/180),.66+.17*Math.sin(-80*Math.PI/180)),[dt(.1),qe([.24,.3],[.76,.3]),...pt(qe([.33,.14],[.33,.56])),...pt(Jt(.24,.3))],[dt(.16),...pt(vt(.36,.24,.15,45,180)),...ba(.5,.16,0,.1,[-130,-90,-50])],[dt(.42),...pt(qe([.5,.42],[.34,.26],[.3,.06]),qe([.335,.25],[.16,.2]),qe([.32,.15],[.18,.07]))],[dt(.44),...pt(qe([.5,.44],[.4,.34],[.38,.06])),vt(.62,.66,.09,180,540),...pt(Jt(.38,.06))],[dt(.44),...pt(vt(.33,.3,.13,0,360),qe([.24,.18],[.18,.05])),...pt(Jt(.33,.3))],[dt(.24),qe([.24,.3],[.76,.3]),...pt(vt(.3,.3,.09,180,360)),...pt(qe([.36,.5],[.32,.62]))],[dt(.52),vt(.5,.52,.2,180,360),...ba(.5,.52,.22,.34,[-160,-125,-90,-55,-20])],dt(.2),qe([.5,.2],[.4,.08]),vt(.66,.4,.16,100,-200),Jt(.66+.16*Math.cos(-200*Math.PI/180),.4+.16*Math.sin(-200*Math.PI/180)),[dt(.42),qe([.16,.54],[.24,.42],[.76,.42],[.84,.54]),...pt(vt(.34,.3,.1,0,360)),...pt(Jt(.16,.54))],dt(.24),vt(.5,.5,.28,-100,100),Jt(.5+.28*Math.cos(-100*Math.PI/180),.5+.28*Math.sin(-100*Math.PI/180)),ci([.18,.64],[.36,.64],.3),[dt(.32),qe([.26,.2],[.5,.32],[.74,.2]),...pt(qe([.26,.2],[.26,.06])),qe([.5,.68],[.66,.62]),...pt(Jt(.26,.06))],[dt(.3),...pt(qe([.5,.3],[.42,.2]),vt(.3,.16,.12,0,180),qe([.18,.16],[.14,.06])),qe([.5,.44],[.6,.52])],[dt(.14),qe([.5,.14],[.3,.22]),qe([.18,.56],[.5,.38],[.82,.56]),Jt(.58,.17),...pt(Jt(.18,.56))],[dt(.3),vt(.5,.16,.14,20,160),...pt(qe([.5,.38],[.12,.26]),ci([.12,.26],[.24,.46],-.25),ci([.24,.46],[.38,.5],-.3),ci([.38,.5],[.5,.52],-.3))],[dt(.44),vt(.5,.3,.16,0,180),...ba(.5,.3,.19,.3,[-160,-125,-55,-20]),qe([.5,.14],[.5,.04])],[dt(.36),qe([.32,.2],[.68,.2]),...pt(qe([.44,.2],[.44,.34])),qe([.5,.56],[.68,.66],[.5,.76],[.32,.66],[.5,.56])],[dt(.18),vt(.5,.44,.24,180,360),qe([.5,.18],[.6,.08]),...pt(Jt(.26,.44))],dt(.52),fd(.5,.33,.03,.2,1.6,90),qe([.66,.2],[.76,.06]),Jt(.76,.06),[dt(.24),...pt(vt(.36,.24,.14,0,-250)),...pt(Jt(.36+.14*Math.cos(-250*Math.PI/180),.24+.14*Math.sin(-250*Math.PI/180)))],[dt(.24),vt(.5,.52,.22,205,335),vt(.5,.66,.24,205,335),vt(.5,.38,.2,205,335),...pt(qe([.5,.24],[.32,.06]))],[dt(.16),dd(.5,.82,.2,.2,1.25),qe([.5,.2],[.5,.11]),...pt(qe([.5,.11],[.42,.045]))],[dt(.2),...pt(qe([.5,.3],[.16,.18],[.24,.5],[.5,.4]),qe([.5,.5],[.3,.64],[.5,.66]),vt(.38,.16,.12,0,-110))],[dt(.32),qe([.3,.2],[.5,.32],[.7,.2]),...pt(vt(.3,.14,.07,90,-180)),vt(.28,.56,.22,0,150),Jt(.28+.22*Math.cos(150*Math.PI/180),.56+.22*Math.sin(150*Math.PI/180))],[dt(.3),ci([.5,.3],[.5,.06],.35),ci([.5,.3],[.5,.06],-.35),...pt(qe([.5,.42],[.32,.38],[.26,.48]),qe([.5,.64],[.32,.6],[.26,.7])),...pt(Jt(.38,.52))],[dt(.4),vt(.5,.27,.1,90,450),...ba(.5,.27,.15,.25,[0,60,120,180,240,300])],[qe([.5,.05],[.5,.3]),dt(.5),vt(.5,.4,.11,-90,270),...pt(...[-150,-170,170,150].map(n=>qe([.5+.12*Math.cos(n*Math.PI/180),.4+.12*Math.sin(n*Math.PI/180)],[.5+.28*Math.cos(n*Math.PI/180),.4+.28*Math.sin(n*Math.PI/180)],[.5+.32*Math.cos(n*Math.PI/180),.4+.28*Math.sin(n*Math.PI/180)+.1]))),Jt(.5,.05)],[dt(.12),vt(.5,.46,.24,-60,250),...pt(vt(.34,.16,.08,90,-180)),ci([.56,.38],[.7,.38],-.4)],[dt(.36),...pt(vt(.66,.26,.2,160,250)),ci([.5,.38],[.5,.82],.25),ci([.5,.38],[.5,.82],-.25)];cl.map(n=>n.id);const ea=new Set([l.TRUNK,l.BARK2,l.BARKD,l.BARKL,l.BELLY]);function sn(n,e,t,i,r,a,{mat:s=l.LEAF,group:o=30,ragged:c=1}={}){const h=[];for(let g=0;g<9;g++){const M=g/9*Math.PI*2,E=1+(a()-.5)*.35*(r.clump+.3);h.push([e[0]+Math.cos(M)*t*E,e[1]+Math.sin(M)*i*E*(Math.sin(M)>0?.8:1)])}const d=Math.max(1,Math.round(Math.min(t,i)/3.5));n.shape(ps(h,0,9,d,Math.max(1.2,Math.min(t,i)*.14)*c,1),s,{group:o,line:!1,round:r.round}),n.mark([lt(e,[-t*1.1,i*.15]),lt(e,[t*1.1,i*.1]),lt(e,[t*1.1,i*1.2]),lt(e,[-t*1.1,i*1.2])],l.LEAF3,[s]),n.mark([lt(e,[-t*.75,-i*.55]),lt(e,[t*.25,-i*.95]),lt(e,[t*.55,-i*.35]),lt(e,[-t*.2,-i*.05])],l.LEAF2,[s]);const f=Math.floor(e[0]-t*1.2),p=Math.ceil(e[0]+t*1.2),m=Math.floor(e[1]-i*1.2),x=Math.ceil(e[1]+i*1.2),_=a()*1e4|0;for(let g=m;g<=x;g++)for(let M=f;M<=p;M++){const E=n.get(M,g);if(E!==s&&E!==l.LEAF2&&E!==l.LEAF3)continue;const b=Lt(M,g,_),R=Qn(M/2,g/2,_)*.5+b*.5;R<.16*r.density?n.recolour(M,g,E===l.LEAF2?s:l.LEAF2):R>1-.16*r.density&&n.recolour(M,g,E===l.LEAF3?s:l.LEAF3)}}function jt(n,e,t,i,r,a,s,o,{mat:c=l.TRUNK,bend:u=1,group:h=10,line:d=!1}={}){const f=[e],p=4;let m=t,x=e;for(let _=1;_<=p;_++)m+=(o()-.5)*.7*s.gnarl*u,x=lt(x,[Math.cos(m)*i/p,Math.sin(m)*i/p]),f.push(x);return n.limb(f.map((_,g)=>[..._,r+(a-r)*g/p]),c,{group:h,line:d,round:s.round,cap:.6,capEnd:1}),{end:x,ang:m,pts:f}}function Ti(n,e,t,i,r,a,s){if(n.shape([[e-i*1.05,t],[e-i*.62,t-i*.5],[e-i*.45,t-i*1.4],[e+i*.45,t-i*1.4],[e+i*.62,t-i*.5],[e+i*1.05,t]],l.TRUNK,{group:10,round:r.round}),r.roots<=0)return;const o=Math.round(2+r.roots*4);for(let c=0;c<o;c++){const u=c%2?1:-1,h=(8+a()*16)*s*(.4+r.roots),d=(2+a()*3)*s,f=[e+u*i*.2,t-i*.5],p=[e+u*(i*.55+h*.4),t-d],m=[e+u*(i*.5+h),t-.5];n.limb([[...f,i*.55],[...p,i*.28],[...m,1.2]],l.TRUNK,{group:11,round:r.round,cap:.5,capEnd:.6})}}function Hi(n,e,t=!0){if(!(e.bark<=0))for(let i=0;i<n.h;i++)for(let r=0;r<n.w;r++){const a=i*n.w+r;if(n.m[a]!==l.TRUNK)continue;const s=t?Qn(r/1.3,i/6,21):Qn(r/6,i/1.3,21);s>1-e.bark*.42||Lt(r,i,4)<e.bark*.05?n.m[a]=l.BARKD:s>1-e.bark*.62&&n.n[a*3]<-.1&&(n.m[a]=l.BARKL)}}function bn(n,e,t){let i=n.w,r=-1,a=n.h;for(let f=0;f<n.h;f++)for(let p=0;p<n.w;p++)n.m[f*n.w+p]&&(i=Math.min(i,p),r=Math.max(r,p),a=Math.min(a,f));if(r<0)return{sp:n,crownY:t};const s=Math.max(e-i,r-e)+2,o=Math.max(0,Math.floor(e-s)),c=Math.min(n.w-o,Math.ceil(s*2)+1),u=Math.max(0,a-1),h=n.h-u,d=new Bt(c,h);for(let f=0;f<h;f++)for(let p=0;p<c;p++){const m=(f+u)*n.w+p+o,x=f*c+p;d.m[x]=n.m[m],d.g[x]=n.g[m],d.n[x*3]=n.n[m*3],d.n[x*3+1]=n.n[m*3+1],d.n[x*3+2]=n.n[m*3+2]}return{sp:d,crownY:t-u}}const Hn=n=>(n.crownWidth||3)/3;function pd(n,e,t){const i=Hn(e),r=Math.round(220*t*i+60*t),a=Math.round(140*t),s=new Bt(r,a),o=r/2,c=a,u=e.treeTrunks||1,h=12*t*(e.treeThick||1)*(e.treeThin?.55:1)/Math.sqrt(u),d=(n()-.5)*.5*e.gnarl+(e.treeLean||0),f=[];let p=a;const m=(x,_,g,M,E)=>{const b=jt(s,x,_,g,M,M*.65,e,n,{group:12});if(E===0){f.push(b.end);return}const R=n()<.35?3:2;for(let w=0;w<R;w++){const D=(w-(R-1)/2)*ce(n,.5,.85)*(E===3?1.4:1);m(b.end,b.ang+D+(n()-.5)*.25,g*ce(n,.6,.78),M*.62,E-1)}E<=2&&f.push(un(x,b.end,.7))};for(let x=0;x<u;x++){const _=d+(u>1?(x/(u-1)-.5)*.8:0),g=[o+(x-(u-1)/2)*h*.6,c],M=jt(s,g,-Math.PI/2+_,a*.36*(u>1?ce(n,.75,1.15):1),h,h*.72,e,n,{bend:1.4});p=Math.min(p,M.end[1]);for(const E of[-1,1])m(M.end,-Math.PI/2+_*.5+E*ce(n,.55,.95)*(.7+.3*i)*(u>1?.6:1),a*.22*(.75+.25*i)*(u>1?.7:1),h*.7,u>2?2:3);if(u===1&&n()<.7&&m(M.end,-Math.PI/2+(n()-.5)*.3,a*.18,h*.55,2),x===0&&e.treeHollow){const E=un(g,M.end,.38);s.ellipse(E[0],E[1],h*.28,h*.5,l.NOSE,{round:.3})}}if(Ti(s,o,c,h*Math.sqrt(u),e,n,t),Hi(s,e),e.treeWebs)for(let x=0;x+1<f.length;x+=2){const _=f[x],g=f[x+1],M=Math.hypot(g[0]-_[0],g[1]-_[1]);if(M<40*t)for(let E=0;E<=M;E++){const b=un(_,g,E/M);s.px(b[0],b[1]+Math.sin(E/M*Math.PI)*M*.15,l.WEB,0,0,1)}}if(e.treeBare)return bn(s,o,p+4*t);f.sort((x,_)=>x[1]-_[1]);for(const x of f)sn(s,lt(x,[0,-3*t]),ce(n,14,21)*t,ce(n,10,14)*t,e,n,{mat:n()<.35?l.LEAF3:l.LEAF});for(const x of f)n()<.75&&sn(s,lt(x,[ce(n,-9,9)*t,ce(n,-12,-3)*t]),ce(n,10,15)*t,ce(n,7,10)*t,e,n);return bn(s,o,p+4*t)}function md(n,e,t){const i=.8+.2*Hn(e),r=Math.round(90*t*i),a=Math.round(160*t),s=new Bt(r,a),o=r/2,c=a;s.limb([[o,c,6*t],[o,c-a*.5,4*t],[o,6*t,1.5]],l.TRUNK,{group:10,round:e.round}),Ti(s,o,c,6*t,e,n,t*.6),Hi(s,e);const u=Math.round(ce(n,9,12));for(let h=u-1;h>=0;h--){const d=h/(u-1),f=6*t+d*a*.7,p=(5+d*36)*t*i*ce(n,.9,1.1),m=(5+d*13)*t,x=[[o,f-4*t],[o+p*.5,f+m*.3],[o+p,f+m],[o+p*.7,f+m*1.15],[o,f+m*.7],[o-p*.7,f+m*1.15],[o-p,f+m],[o-p*.5,f+m*.3]];s.shape(ps(x,1,7,Math.max(2,Math.round(p/(3*t))),2*t,1),l.LEAF,{group:30+h,line:!1,round:e.round}),s.mark([[o-p,f+m*.55],[o+p,f+m*.55],[o+p,f+m*1.4],[o-p,f+m*1.4]],l.LEAF3,[l.LEAF]),s.mark([[o-p*.55,f-2*t],[o+p*.1,f-3*t],[o+p*.1,f+m*.45],[o-p*.7,f+m*.7]],l.LEAF2,[l.LEAF])}return bn(s,o,a*.82)}function gd(n,e,t){const i=Hn(e),r=Math.round(200*t*i+50*t),a=Math.round(130*t),s=new Bt(r,a),o=r/2,c=a,u=13*t,h=jt(s,[o,c],-Math.PI/2+(n()-.5)*.3,a*.3,u,u*.8,e,n,{bend:1.6}),d=[];for(let m=0;m<5;m++){const x=m%2?1:-1,_=-Math.PI/2+x*ce(n,.55,1.25)*(.7+.3*i),g=jt(s,h.end,_,a*ce(n,.3,.42)*(.8+.2*i),u*.55,u*.3,e,n,{group:12});d.push(g.end)}Ti(s,o,c,u,e,n,t),Hi(s,e);for(const m of d)sn(s,lt(m,[0,-2*t]),ce(n,20,28)*t,ce(n,9,12)*t,e,n);sn(s,lt(h.end,[0,-8*t]),24*t,11*t,e,n);let f=r,p=0;for(const m of d)f=Math.min(f,m[0]-22*t),p=Math.max(p,m[0]+22*t);for(let m=f;m<p;m+=ce(n,1,1.7)){let x=a;for(let E=0;E<a;E++)if(s.get(m,E)===l.LEAF||s.get(m,E)===l.LEAF2||s.get(m,E)===l.LEAF3){x=E;break}if(x>=a)continue;const _=Math.abs(m-o)/(r/2),g=(c-x)*ce(n,.5,.9)*(1-_*.3),M=Lt(m|0,1,9)<.4?l.LEAF2:l.LEAF;for(let E=x+2;E<Math.min(c-2,x+g);E++){const b=Math.round(Math.sin(E*.12+m)*.7);Lt(m|0,E,5)<.2+e.density*.8&&s.px(m+b,E,(E-x)/g>.8?l.LEAF3:M,b*.3,.2,.95)}}return bn(s,o,h.end[1]+6*t)}function lu(n,e,t){const i=.7+.3*Hn(e),r=Math.round(110*t*i),a=Math.round(155*t),s=new Bt(r,a),o=r/2,c=a,u=(n()-.5)*.25+(e.treeLean||0),h=jt(s,[o,c],-Math.PI/2+u,a*.85,5*t,2*t,e,n,{mat:l.BARK2,bend:.4});for(let f=0;f<h.pts.length-1;f++)for(let p=0;p<1;p+=1/8){const m=un(h.pts[f],h.pts[f+1],p+n()*.1);if(n()<.55)for(let x=-3;x<=3;x++)s.get(m[0]+x,m[1])===l.BARK2&&n()<.8&&s.recolour(m[0]+x,m[1],l.BARKD)}const d=[h.end];for(let f=0;f<7;f++){const p=ce(n,.35,.9),m=un(h.pts[0],h.end,p),x=f%2?1:-1,_=jt(s,m,-Math.PI/2+x*ce(n,.5,1),a*ce(n,.12,.2)*i,2*t,1,e,n,{mat:l.BARKD,group:12});d.push(_.end)}for(const f of d)sn(s,f,ce(n,9,13)*t*i,ce(n,7,10)*t,e,n,{mat:l.LEAF2,ragged:1.3});return bn(s,o,a*.55)}function _d(n,e,t){const i=Hn(e),r=Math.round(220*t*i+50*t),a=Math.round(120*t),s=new Bt(r,a),o=r/2,c=a,u=10*t,h=jt(s,[o,c],-Math.PI/2+(n()-.5)*.4*(e.gnarl+.3),a*.4,u,u*.75,e,n,{bend:1.2}),d=[];for(const m of[-1,1,-1,1]){const x=jt(s,h.end,-Math.PI/2+m*ce(n,.7,1.15)*(.7+.3*i),a*ce(n,.3,.42)*(.7+.3*i),u*.55,u*.25,e,n,{group:12});d.push(x.end,un(h.end,x.end,.55))}Ti(s,o,c,u,e,n,t),Hi(s,e);const f=Math.round(ce(n,2,3)),p=Math.min(...d.map(m=>m[1]));for(let m=0;m<f;m++){const x=p-6*t+m*9*t,_=(95-m*12)*t*(.65+.35*i);for(let g=0;g<5;g++)sn(s,[o+(g-2)*_*.36+ce(n,-5,5)*t,x+ce(n,-3,3)*t],_*ce(n,.2,.26),7*t,e,n,{mat:m===f-1?l.LEAF:l.LEAF3})}return bn(s,o,h.end[1]+4*t)}function Br(n,e,t,i,r,{grain:a=2,holes:s=0,flecks:o=.16,dots:c=0,dot:u=l.FLOWER,dotTall:h=!1,mats:d=[l.LEAF,l.LEAF2,l.LEAF3]}={}){const f=Math.floor(e[0]-t*1.3),p=Math.ceil(e[0]+t*1.3),m=Math.floor(e[1]-i*1.3),x=Math.ceil(e[1]+i*1.3),_=r()*1e4|0;for(let g=m;g<=x;g++)for(let M=f;M<=p;M++){const E=n.get(M,g);if(!d.includes(E))continue;const b=Qn(M/a,g/a,_),R=Lt(M,g,_);s&&b<s?n.recolour(M,g,l.LEAF3):b>1-o&&n.recolour(M,g,l.LEAF2),c&&R<c&&E!==l.LEAF3&&(n.recolour(M,g,u),h&&n.recolour(M,g-1,u))}}function Ri(n,e,t,i){const r=Hn(e)*(i.wide||1),a=Math.round(240*t*r+70*t),s=Math.round((i.tall||140)*t),o=new Bt(a,s),c=a/2,u=s,h=e.treeTrunks||i.trunks||1,d=(i.tw||12)*t*(e.treeThick||1)*(e.treeThin?.55:1)/Math.sqrt(h),f=(n()-.5)*.4*e.gnarl+(e.treeLean||0)+(i.lean||0),p=[];let m=s;const x=(R,w,D,S,y)=>{const L=jt(o,R,w,D,S,S*.65,e,n,{group:12,mat:i.limbMat||l.TRUNK,bend:i.bend??1});if(y===0){p.push(L.end);return}const C=n()<(i.fork??.35)?3:2;for(let N=0;N<C;N++)x(L.end,L.ang+(N-(C-1)/2)*ce(n,.45,.8)*(i.splay||1)+(n()-.5)*.25,D*ce(n,.6,.78),S*.62,y-1);y<=2&&p.push(un(R,L.end,.7))};for(let R=0;R<h;R++){const w=f+(h>1?(R/(h-1)-.5)*(i.fan||.8):0),D=[c+(R-(h-1)/2)*d*.6,u],S=jt(o,D,-Math.PI/2+w,s*(i.trunk||.36)*(h>1?ce(n,.8,1.1):1),d,d*.72,e,n,{bend:i.trunkBend??1.2,mat:i.trunkMat||l.TRUNK});m=Math.min(m,S.end[1]);for(let y=0;y<(i.limbs||2);y++){const L=y%2?1:-1;x(S.end,-Math.PI/2+w*.5+L*ce(n,.5,1)*(i.spreadA||.8)*(h>1?.7:1),s*(i.limb||.22)*(h>1?.75:1),d*.7,i.depth??3)}if(i.leader&&x(S.end,-Math.PI/2+(n()-.5)*.2,s*(i.limb||.22)*i.leader,d*.55,2),R===0&&e.treeHollow){const y=un(D,S.end,.38);o.ellipse(y[0],y[1],d*.28,d*.5,l.NOSE,{round:.3})}}if(i.noRoots||Ti(o,c,u,d*Math.sqrt(h),e,n,t*(i.rootK||1)),i.smooth||Hi(o,e),e.treeBare)return bn(o,c,m+4*t);p.sort((R,w)=>R[1]-w[1]);const[_,g]=i.clumpR||[12,18],M=i.flat||.7,E=[],b=(R,w,D,S)=>{sn(o,R,w,D,e,n,{mat:S,ragged:i.ragged||1}),E.push([R,w,D])};for(const R of p)b(lt(R,[0,-3*t]),ce(n,_,g)*t,ce(n,_,g)*t*M,n()<(i.darkBack??.35)?l.LEAF3:l.LEAF);for(const R of p)n()<(i.extra??.7)&&b(lt(R,[ce(n,-9,9)*t,ce(n,-12,-3)*t]),ce(n,_,g)*t*.7,ce(n,_,g)*t*M*.7,l.LEAF);if(i.dome){const R=Math.min(...p.map(y=>y[1])),w=p.map(y=>y[0]),D=(Math.min(...w)+Math.max(...w))/2,S=(Math.max(...w)-Math.min(...w))/2;for(let y=0;y<i.dome;y++){const L=y/Math.max(1,i.dome-1)-.5;b([D+L*S*1.1,R-(1-4*L*L)*14*t-ce(n,2,6)*t],ce(n,_,g)*t*1.1,ce(n,_,g)*t*M,l.LEAF)}}if(i.layers)for(const[R,w,D]of E)for(let S=-D;S<D;S+=Math.max(3,i.layers*t))for(let y=-w;y<w;y++)o.get(R[0]+y,R[1]+S)===l.LEAF&&o.recolour(R[0]+y,R[1]+S,l.LEAF3);for(const[R,w,D]of E)Br(o,R,w,D,n,i.tex||{});return bn(o,c,m+4*t)}function xd(n,e,t){return Ri(n,{...e,gnarl:Math.max(e.gnarl,.8)},t,{trunk:.26,tw:15,limbs:3,spreadA:1.05,limb:.26,depth:3,wide:1.15,clumpR:[10,15],flat:.75,extra:.9,dome:5,bend:1.4,tex:{grain:1.6,holes:.12,flecks:.18}})}function Md(n,e,t){return Ri(n,{...e,gnarl:e.gnarl*.4},t,{trunk:.4,tw:11,limbs:2,leader:1.3,spreadA:.6,limb:.22,depth:3,clumpR:[15,21],flat:.5,extra:1,dome:7,smooth:1,layers:3.5,trunkMat:l.BARK2,limbMat:l.BARK2,tall:155,tex:{grain:3.5,holes:0,flecks:.1}})}function vd(n,e,t){return Ri(n,{...e,gnarl:e.gnarl*.6},t,{trunk:.4,tw:9,limbs:3,spreadA:.45,limb:.26,depth:3,splay:.6,clumpR:[7,10],flat:.8,extra:.35,ragged:1.8,tall:160,wide:.8,darkBack:.1,tex:{grain:1.2,holes:.3,flecks:.26}})}function Sd(n,e,t){return Ri(n,{...e,gnarl:e.gnarl*.4},t,{trunk:.38,tw:11,limbs:2,spreadA:.55,limb:.24,depth:3,leader:1.1,clumpR:[9,12],flat:.85,extra:1,dome:5,tall:170,wide:.75,darkBack:.15,tex:{grain:1.4,holes:.05,flecks:.22}})}function bd(n,e,t){return Ri(n,e,t,{trunk:.34,tw:12,limbs:2,spreadA:.8,limb:.24,depth:2,clumpR:[20,27],flat:.7,extra:.8,dome:2,darkBack:.5,tex:{grain:4,holes:.16,flecks:.12}})}function Ed(n,e,t){return Ri(n,e,t,{trunk:.32,tw:14,limbs:2,spreadA:.85,limb:.25,depth:2,clumpR:[22,30],flat:.78,extra:.9,dome:3,darkBack:.25,tall:150,tex:{grain:6,holes:.04,flecks:.16,dots:.025,dotTall:!0}})}function yd(n,e,t){return Ri(n,{...e,gnarl:e.gnarl*.7},t,{trunk:.45,tw:7,limbs:3,spreadA:.55,limb:.2,depth:2,clumpR:[8,11],flat:.7,extra:.5,ragged:1.7,wide:.6,tall:120,smooth:1,trunkMat:l.BARK2,limbMat:l.BARK2,darkBack:.1,tex:{grain:1.1,holes:.26,flecks:.22,dots:.05}})}function wd(n,e,t){const i=.7+.3*Hn(e),r=Math.round(110*t*i),a=Math.round(165*t),s=new Bt(r,a),o=r/2,c=a,u=e.treeTrunks||1,h=(n()-.5)*.2+(e.treeLean||0),d=[];for(let p=0;p<u;p++){const m=jt(s,[o+(p-(u-1)/2)*5*t,c],-Math.PI/2+h+(u>1?(p/(u-1)-.5)*.3:0),a*.92,6*t/Math.sqrt(u),1.5,e,n,{bend:.5});for(let x=0;x<16;x++){const _=ce(n,.3,.97),g=un(m.pts[0],m.end,_),M=x%2?1:-1,E=(1-_*.6)*a*.12*i,b=jt(s,g,-Math.PI/2+M*ce(n,.7,1.2),E,2*t,1,e,n,{group:12,mat:l.BARKD});d.push([b.end,(8+(1-_)*6)*t*i],[un(g,b.end,.4),(7+(1-_)*4)*t*i])}d.push([m.end,7*t])}Ti(s,o,c,6*t,e,n,t*.6),Hi(s,e);for(const[p,m]of d)sn(s,p,m,m*.8,e,n,{mat:n()<.5?l.LEAF3:l.LEAF});for(const[p,m]of d)Br(s,p,m,m*.8,n,{grain:1.3,holes:.2,flecks:.1,dots:.03,dot:l.BARKD});const f=Math.min(...d.map(([p])=>p[1]));return bn(s,o,f+(c-f)*.45)}function Ad(n,e,t){const i=.8+.2*Hn(e),r=Math.round(150*t*i),a=Math.round(175*t),s=new Bt(r,a),o=r/2,c=a,u=jt(s,[o,c],-Math.PI/2+(n()-.5)*.25+(e.treeLean||0),a*.78,8*t,3*t,e,n,{bend:.7});Hi(s,e);for(let d=0;d<s.h*.55;d++)for(let f=0;f<r;f++)(s.get(f,d)===l.TRUNK||s.get(f,d)===l.BARKD)&&s.recolour(f,d,Lt(f,d,3)<.15?l.BARKD:l.BELLY);Ti(s,o,c,8*t,e,n,t*.7);const h=[];for(let d=0;d<6;d++){const f=ce(n,.55,1),p=un(u.pts[0],u.end,f),m=d%2?1:-1,x=jt(s,p,-Math.PI/2+m*ce(n,.6,1.3),a*ce(n,.12,.22)*i,3*t,1.5,e,n,{group:12,bend:1.6,mat:l.BELLY});h.push(x.end)}h.push(u.end);for(const d of h)sn(s,lt(d,[0,-2*t]),ce(n,13,19)*t*i,ce(n,4,6)*t,e,n,{mat:l.LEAF,ragged:1.3});for(const d of h)Br(s,lt(d,[0,-2*t]),19*t*i,6*t,n,{grain:1,holes:.25,flecks:.14});return bn(s,o,Math.min(...h.map(d=>d[1]))+8*t)}function Td(n,e,t){const i=Hn(e),r=Math.round(200*t*i+50*t),a=Math.round(120*t),s=new Bt(r,a),o=r/2,c=a,u=e.treeTrunks||3,h=9*t*(e.treeThick||1.2);for(let p=0;p<u;p++)jt(s,[o+(p-(u-1)/2)*h*.5,c],-Math.PI/2+(p-(u-1)/2)*.35+(e.treeLean||0),a*.3,h,h*.6,e,n,{mat:l.BELLY,bend:1.6});for(let p=0;p<a;p++)for(let m=0;m<r;m++)s.get(m,p)===l.BELLY&&(m+Math.round(p/6))%4===0&&s.recolour(m,p,l.BARKD);Ti(s,o,c,h*1.4,e,n,t);const d=c-a*.3,f=[];for(let p=0;p<9;p++){const m=Math.PI+p/8*Math.PI,x=(40+20*i)*t;f.push([[o+Math.cos(m)*x,d+Math.sin(m)*x*.55+10*t],ce(n,16,22)*t])}for(let p=0;p<7;p++)f.push([[o+(p/6-.5)*(60+30*i)*t,d-ce(n,4,22)*t],ce(n,20,26)*t]);f.push([[o,d-24*t],26*t]);for(const[p,m]of f)sn(s,p,m,m*.7,e,n,{mat:l.LEAF3,ragged:.6});for(const[p,m]of f)Br(s,p,m,m*.7,n,{grain:.7,holes:0,flecks:.08,mats:[l.LEAF,l.LEAF2,l.LEAF3]});return bn(s,o,d+4*t)}function Rd(n,e,t){return Ri(n,{...e,gnarl:1},t,{trunk:.3,tw:8,limbs:3,spreadA:.9,limb:.3,depth:3,fork:.6,bend:2,lean:.45,clumpR:[7,10],flat:.65,extra:.8,wide:.7,tall:90,ragged:1.4,darkBack:.3,tex:{grain:1,holes:.1,flecks:.14,dots:.035}})}function Cd(n,e,t){const i=.8+.2*Hn(e),r=Math.round(110*t*i),a=Math.round(130*t),s=new Bt(r,a),o=r/2,c=a;s.limb([[o,c,5*t],[o,c-a*.5,3*t],[o,10*t,1.5]],l.BARK2,{group:10,round:e.round});const u=[];for(let h=0;h<10;h++){const d=h/9,f=10*t+d*a*.72,p=(5+d*28)*t*i,m=1+Math.round(d*3);for(let x=0;x<m;x++)u.push([[o+(m>1?(x/(m-1)-.5)*p*1.3:0)+ce(n,-2,2)*t,f+ce(n,-2,2)*t],(6+d*5)*t])}for(const[h,d]of u)sn(s,h,d*1.2,d,e,n,{mat:l.LEAF3,ragged:.7});for(const[h,d]of u)Br(s,h,d*1.2,d,n,{grain:1.1,holes:0,flecks:.2,dots:.035,mats:[l.LEAF,l.LEAF2,l.LEAF3]});return bn(s,o,a*.85)}function Ld(n,e,t){return Ri(n,{...e,gnarl:e.gnarl*.5,treeTrunks:e.treeTrunks||6},t,{trunk:.5,tw:9,limbs:1,spreadA:.5,limb:.18,depth:1,fan:1.3,trunkBend:.8,clumpR:[11,15],flat:.8,extra:1,wide:.8,tall:110,noRoots:!1,rootK:.4,smooth:1,trunkMat:l.BARK2,limbMat:l.BARK2,darkBack:.2,tex:{grain:3.6,holes:.14,flecks:.2}})}function Dd(n,e,t){const i=lu(n,{...e,treeLean:e.treeLean||0},t),r=i.sp;for(let a=0;a<r.w;a++){let s=-1;for(let c=0;c<r.h;c++)if([l.LEAF,l.LEAF2,l.LEAF3].includes(r.get(a,c))){s=c;break}if(s<0||Lt(a,1,7)<.35)continue;const o=(r.h-s)*ce(n,.25,.5);for(let c=s+1;c<Math.min(r.h-3,s+o);c++)(!r.get(a,c)||r.get(a,c)===l.LEAF3)&&r.px(a+Math.round(Math.sin(c*.2+a)*.6),c,Lt(a,c,2)<.3?l.LEAF:l.LEAF2,0,.2,.95)}return i}function Pd(n,e,t){const i=.8+.2*Hn(e),r=Math.round(100*t*i),a=Math.round(170*t),s=new Bt(r,a),o=r/2,c=a;s.limb([[o,c,6*t],[o,c-a*.5,3.5*t],[o,6*t,1.2]],l.TRUNK,{group:10,round:e.round}),Ti(s,o,c,6*t,e,n,t*.5),Hi(s,e);const u=14;for(let h=0;h<u;h++){const d=h/(u-1),f=8*t+d*a*.68,p=(4+d*30)*t*i;for(let m=0;m<4;m++){const x=[o+(m/3-.5)*p*1.6,f+Math.abs(m/3-.5)*6*t];sn(s,x,p*.35+2*t,4*t,e,n,{mat:l.LEAF2,ragged:1.6}),Br(s,x,p*.35+2*t,4*t,n,{grain:1,holes:.32,flecks:.1,mats:[l.LEAF,l.LEAF2]})}}return bn(s,o,a*.8)}const Id=6;function Nd(n,e,t,i,r){const{sp:a,crownY:s}=n,o=a.w,c=a.h,u=a.low||(a.low=new Uint8Array(o*c)),h=Math.ceil(s+Id*i);if(h>=c-2)return n;const d=i/(t.treeSize*2/(t.pixel||2)),f=Math.max(0,Math.min(1,(1-d)/.5)),p=!!t.treeBare,m=y=>{const L=[];let C=-1;for(let N=0;N<=o;N++){const U=N<o&&ea.has(a.m[y*o+N]);U&&C<0&&(C=N),!U&&C>=0&&(L.push([C,N-1]),C=-1)}return L},x=(y,L)=>y.reduce((C,N)=>!C||Math.abs((N[0]+N[1])/2-L)<Math.abs((C[0]+C[1])/2-L)?N:C,null),_=y=>{const L=a.m.slice(),C=a.n.slice();y();for(let N=0;N<L.length;N++)a.m[N]!==L[N]&&((N/o|0)<h||L[N]&&!ea.has(L[N])&&!u[N]?(a.m[N]=L[N],a.n[N*3]=C[N*3],a.n[N*3+1]=C[N*3+1],a.n[N*3+2]=C[N*3+2]):u[N]=1)},g=()=>{for(let y=0;y<8;y++){const L=Math.round(ce(e,h,c-3)),C=m(L);if(C.length){const N=rl(e,C),U=e()<.5?-1:1;return{x:U<0?N[0]:N[1],y:L,side:U}}}return null},M=p?0:1,E=c-1;let b=o,R=0;for(let y=0;y<h*o;y++)if(a.m[y]&&!ea.has(a.m[y])){const L=y%o;b=Math.min(b,L),R=Math.max(R,L)}const w=Math.max(6*i,(R-b)*.22);r.moss&&_(()=>{for(let y=Math.max(h,Math.round(c-(c-h)*.4));y<c;y++)for(let L=0;L<o;L++){const C=y*o+L;if(!ea.has(a.m[C]))continue;const N=y>0&&!a.m[C-o];(Qn(L/2.5,y/2.5,41)>1-r.moss*(.35+.4*(y-h)/(c-h))||N&&Lt(L,y,9)<r.moss*.6)&&(a.m[C]=Lt(L,y,5)<.3?l.LEAF2:l.LEAF)}}),r.ivy&&e()<.35+r.ivy*.6&&_(()=>{let y=o/2;const L=E-(E-h)*ce(e,.45,.95)*Math.min(1,r.ivy+.3),C=e()*6;for(let N=E-1;N>L;N--){const U=x(m(N),y);if(!U)break;if(y=U[0]+(U[1]-U[0])*(.5+.48*Math.sin(N*.22+C)),a.px(y,N,l.LEAF3,0,0,1),Lt(Math.round(y),N,13)<.45){const I=Lt(N,3,2)<.5?-1:1;a.px(y+I,N,l.LEAF,I*.5,-.3,.8),a.px(y+I*2,N,l.LEAF3,I*.6,0,.8),a.px(y+I,N-1,Lt(y,N,4)<.4?l.LEAF2:l.LEAF3,0,-.6,.8)}}});const D=Math.round(r.sprigs*M*(5+8*f)*(c-h)/(40*i));for(let y=0;y<D;y++){const L=g();if(!L)break;const C=ce(e,3,5.5)*i;_(()=>sn(a,[L.x+L.side*C*.6,L.y],C,C*.75,t,e,{mat:e()<.4?l.LEAF3:l.LEAF,ragged:.8}))}const S=Math.round(r.boughs*M*(3+4*f)*(c-h)/(45*i)+(e()<r.boughs*M?1:0));for(let y=0;y<S;y++){const L=g();if(!L)break;_(()=>{const C=jt(a,[L.x,L.y],-Math.PI/2+L.side*ce(e,.9,1.35),Math.min(w,ce(e,10,20)*i),2*i,1,t,e,{group:12,mat:l.TRUNK}),N=ce(e,6,9.5)*i;sn(a,lt(C.end,[0,-1*i]),N,N*.65,t,e,{mat:e()<.4?l.LEAF3:l.LEAF})})}if(r.skirt&&M){const y=Math.round(3+r.skirt*5+f*3);for(let L=0;L<y;L++)_(()=>{const C=Math.round(ce(e,Math.max(h,c-(c-h)*.8),c-4*i)),N=x(m(C),o/2);if(!N)return;const U=L%2?1:-1,I=U<0?N[0]:N[1],B=Math.min(w*1.3,ce(e,14,24)*i*(.6+r.skirt*.5)),V=jt(a,[I,C],-Math.PI/2+U*ce(e,1.6,1.95),B,1.6*i,1,t,e,{group:12,mat:l.BARKD});sn(a,un([I,C],V.end,.6),B*.5,3.5*i,t,e,{mat:e()<.5?l.LEAF3:l.LEAF,ragged:1.2})})}return n}const Ud={broad:{ivy:.4,moss:.6,sprigs:.5,boughs:.3},fir:{moss:.3,skirt:1},willow:{moss:.5,sprigs:.3},birch:{sprigs:.3,boughs:.2},flat:{ivy:.3,sprigs:.4,boughs:.3},oak:{ivy:.5,moss:.5,sprigs:.9,boughs:.4},beech:{moss:.3,boughs:.3},ash:{ivy:.6,sprigs:.3,boughs:.2},lime:{moss:.3,sprigs:1},sycamore:{ivy:.4,moss:.4,boughs:.4},chestnut:{sprigs:.3,boughs:.5},rowan:{sprigs:.3,boughs:.3},alder:{moss:.6,sprigs:.4},pine:{ivy:.3,moss:.3,boughs:.15},yew:{moss:.4,skirt:1},hawthorn:{moss:.5,sprigs:.6,boughs:.5},holly:{skirt:.7},hazel:{moss:.4,sprigs:.8},weepingBirch:{sprigs:.3},larch:{skirt:.5,boughs:.2}},Od=(n,e)=>(t,i,r)=>Nd(n(t,i,r),t,i,r,e),ss={broad:{fn:pd,name:"gnarled broadleaf",grow:"normal"},fir:{fn:md,name:"spruce",grow:"narrow",hue:.06},willow:{fn:gd,name:"willow",grow:"willow",hue:-.02,val:1.05},birch:{fn:lu,name:"silver birch",grow:"narrow",hue:-.02,val:1.08},flat:{fn:_d,name:"field maple",grow:"normal",hue:.01},oak:{fn:xd,name:"oak",grow:"wide",hue:.01,val:.92},beech:{fn:Md,name:"beech",grow:"normal",hue:-.03,sat:1.05,val:1.02,trunk:[.62,.08,.62]},ash:{fn:vd,name:"ash",grow:"narrow",hue:-.04,sat:.85,val:1.12},lime:{fn:Sd,name:"lime",grow:"narrow",hue:-.05,sat:1.1,val:1.12},sycamore:{fn:bd,name:"sycamore",grow:"wide",hue:.03,sat:1.1,val:.72},chestnut:{fn:Ed,name:"horse chestnut",grow:"wide",hue:-.01,val:1,dot:[244,238,226]},rowan:{fn:yd,name:"rowan",grow:"small",hue:-.01,val:1.05,trunk:[.08,.12,.52],dot:[210,40,34]},alder:{fn:wd,name:"alder",grow:"narrow",hue:.04,sat:.9,val:.72},pine:{fn:Ad,name:"Scots pine",grow:"narrow",hue:.1,sat:.7,val:.78,upper:[.06,.6,.72]},yew:{fn:Td,name:"yew",grow:"wide",hue:.07,sat:.8,val:.55,upper:[.02,.55,.45]},hawthorn:{fn:Rd,name:"hawthorn",grow:"small",hue:.025,val:.8,dot:[176,30,40]},holly:{fn:Cd,name:"holly",grow:"narrow",hue:.06,sat:.85,val:.6,trunk:[.1,.08,.55],dot:[214,28,36]},hazel:{fn:Ld,name:"hazel coppice",grow:"small",hue:0,val:.94,trunk:[.07,.3,.45]},weepingBirch:{fn:Dd,name:"weeping birch",grow:"narrow",hue:-.04,val:1.12},larch:{fn:Pd,name:"larch",grow:"narrow",hue:-.07,sat:.8,val:1.15}};for(const[n,e]of Object.entries(ss))e.bare=e.fn,e.fn=Od(e.fn,Ud[n]||{});const Fd=new Map(Object.entries(ss).flatMap(([n,e])=>[[e.fn,{id:n,...e}],[e.bare,{id:n,...e}]])),cu=n=>ss[n]||ss.broad;function ul(n,e,t){const i=Fd.get(t),r=i?.sat||1,a=i?.val||1,s=i?.hue||0,o=s<0?s*Math.max(0,Math.min(1,(e.leafHue-.17)/.09)):s,c=e.leafHue+(n()-.5)*e.leafVariety*.7+o,u={[l.TRUNK]:pe(e.trunkHue,.45*e.sat,.34),[l.BARKD]:pe(e.trunkHue+.03,.5*e.sat,.17),[l.BARKL]:pe(e.trunkHue-.01,.38*e.sat,.5),[l.BARK2]:[222,220,212],[l.LEAF]:pe(c,Math.min(1,.62*e.sat*r),Math.min(1,.58*a)),[l.LEAF2]:pe(c-.05,Math.min(1,.55*e.sat*r),Math.min(1,.8*a)),[l.LEAF3]:pe(c+.03,Math.min(1,.66*e.sat*r),.38*a),[l.WEB]:[225,225,232]};return i?.trunk&&(u[l.BARK2]=pe(...i.trunk)),i?.upper&&(u[l.BELLY]=pe(...i.upper)),i?.dot&&(u[l.FLOWER]=i.dot),u}function Bd(n){const{sp:e,crownY:t}=n,i=new Bt(e.w,e.h),r=new Bt(e.w,e.h);for(let a=0;a<e.h;a++)for(let s=0;s<e.w;s++){const o=a*e.w+s,c=e.m[o];if(!c)continue;(ea.has(c)&&a>=t||e.low?.[o]?r:i).put(s,a,c,e.n[o*3],e.n[o*3+1],e.n[o*3+2])}return{top:i,bot:r}}function kd(n,e){const t=e.bushSize,i=rl(n,["round","round","fern","grass","shrub"]),r=Math.round(40*t),a=Math.round(28*t),s=new Bt(r,a);if(i==="round"||i==="shrub"){const c=i==="shrub"?5:3;for(let u=0;u<c;u++)sn(s,[r/2+ce(n,-9,9)*t,a-8*t+ce(n,-4,2)*t],ce(n,7,10)*t,ce(n,5,8)*t,e,n);if(i==="shrub"||n()<e.flowers)for(let u=0;u<18*e.flowers+3;u++){const h=r/2+ce(n,-12,12)*t,d=a-ce(n,5,17)*t;s.get(h,d)&&s.recolour(h,d,l.FLOWER)}}else if(i==="fern")for(let c=0;c<7;c++){const u=-Math.PI/2+(c/6-.5)*2.4;let h=r/2,d=a-1;for(let f=0;f<15*t;f++)h+=Math.cos(u)*.9,d+=Math.sin(u)*.9+f*.06,s.put(h,d,c%2?l.LEAF3:l.LEAF,Math.cos(u)*.4,-.2,.9),f%2&&(s.put(h,d-1,l.LEAF2,0,-.5,.85),s.put(h+Math.sign(Math.cos(u)),d+1,l.LEAF,0,.3,.9))}else for(let c=0;c<18*t;c++){const u=r/2+ce(n,-13,13)*t,h=ce(n,5,15)*t,d=ce(n,-3,3);for(let f=0;f<h;f++)s.put(u+d*f/h*(f/h),a-1-f,f>h*.65?l.LEAF2:f<h*.3?l.LEAF3:l.LEAF,d*.1,-.3,.9)}const o=ul(n,e,null);return o[l.FLOWER]=pe(n(),.55,.95),{sp:s,colours:o}}const zd=["snag","cairn","standingstone","pillar","spire","stalagmite"],vi=(n,e=0,t=0)=>Lt(Math.floor(n*1e3),Math.floor(e*1e3),4401+t);function Hd(n){let e=n.w,t=-1,i=n.h;for(let a=0;a<n.h;a++)for(let s=0;s<n.w;s++)n.m[a*n.w+s]&&(e=Math.min(e,s),t=Math.max(t,s),i=Math.min(i,a));const r=new Bt(t-e+1,n.h-i);for(let a=0;a<r.h;a++)for(let s=0;s<r.w;s++){const o=(a+i)*n.w+s+e;n.m[o]&&r.put(s,a,n.m[o],n.n[o*3],n.n[o*3+1],n.n[o*3+2])}return r}const uu=n=>e=>[e[0]*Math.cos(n)+e[1]*Math.sin(n),-e[0]*Math.sin(n)+e[1]*Math.cos(n),e[2]];function Gd(n,e,t){const i=uu(t.lean||0),r=3.3+e()*.6,a=o=>{const c=Math.atan2(o[2],o[0]),u=Math.sin(c*11+o[1]*1.3);return u>.55?l.BARKD:u<-.75?l.BARKL:void 0},s=[[0,0,0,.34],[.05,r*.45,.02,.27],[-.03,r*.85,0,.21],[.02,r,0,.19]];n.chain(s.map(([o,c,u,h])=>[...i([o,c,u]),h]),l.TRUNK,{group:1,rough:.03,paint:o=>t.hollow&&o[2]>.1&&Math.abs(o[0]-i([0,1.1,0])[0])<.14&&Math.abs(o[1]-1.1)<.32?l.NOSE:a(o)});for(let o=0;o<5;o++){const c=o/5*Math.PI*2+e();n.seg(i([Math.cos(c)*.12,r+.05,Math.sin(c)*.12]),i([Math.cos(c)*.16,r+.2+e()*.35,Math.sin(c)*.16]),.07,.015,l.BELLY,{group:2})}for(let o=0;o<5;o++){const c=o/5*Math.PI*2+.4;n.chain([[Math.cos(c)*.28,.3,Math.sin(c)*.28,.14],[Math.cos(c)*.7,.03,Math.sin(c)*.7,.05]],l.TRUNK,{group:1,rough:.02,paint:a})}n.seg(i([.15,r*.62,.05]),i([.75,r*.78,.15]),.09,.05,l.TRUNK,{group:3,paint:a});for(let o=0;o<7;o++){const c=.5+e()*(r-.9),u=(o%2?1.2:2.4)+e()*.8-.4,h=i([Math.cos(u)*.27,c,Math.sin(u)*.27]);n.ell(h,[.16,.035,.12],l.FLOWER,{dir:[Math.cos(u),0,Math.sin(u)],group:10+o,paint:d=>d[1]>h[1]+.02?l.BELLY:void 0})}for(let o=0;o<4;o++)n.ell([Math.cos(o*1.7)*.35,.06,Math.sin(o*1.7)*.35],[.2,.07,.16],l.MOSS,{group:4})}function Vd(n,e,t){const i=t.tall?10:8;let r=0;for(let a=0;a<i;a++){const s=a/(i-1),o=.55-.38*s,c=.16+e()*.06,u=[(e()-.5)*.06,r+c,(e()-.5)*.06];n.ell(u,[o*(1+e()*.15),c,o*(.9+e()*.2)],l.STONE,{group:1+a%3,rough:.03,dir:[1,(e()-.5)*.3,(e()-.5)*.3],paint:h=>vi(h[0]*3,h[1]*5,a)<(s<.4?.3:.1)?l.MOSS:vi(h[0]*7,h[2]*7,a)<.12?l.BELLY:void 0}),r+=c*1.75}n.box([0,r+.32,0],[.09,.36,.06],l.STONE,{round:.03,rough:.015,group:5,dir:[.2,1,0],up:[0,0,1]});for(let a=0;a<5;a++){const s=a*1.3;n.ell([Math.cos(s)*.7,.07,Math.sin(s)*.65],[.13,.09,.11],l.STONE,{group:6,rough:.02})}}function Wd(n,e,t){const i=t.lean||0,r=1.55+e()*.25,a=[Math.sin(i),Math.cos(i),0],s=.4+e()*.1,o=c=>c[1]>Math.cos(i)*r*1.8?l.MOSS:vi(Math.floor(c[0]*4),Math.floor(c[1]*3),1)<.12?l.BELLY:c[1]<.5&&vi(Math.floor(c[0]*5),Math.floor(c[2]*5),2)<.35?l.MOSS:void 0;n.ell([Math.sin(i)*r*.9,Math.cos(i)*r*.9,0],[s,r*.98,.22],l.STONE,{rough:.06,group:1,dir:[Math.cos(i),-Math.sin(i),0],up:a,paint:o}),n.ell([Math.sin(i)*.5-s*.4,.55,.02],[s*.75,.6,.2],l.STONE,{rough:.05,group:1,paint:o}),n.ell([Math.sin(i)*r*1.6+.08,Math.cos(i)*r*1.65,0],[s*.6,.32,.18],l.STONE,{rough:.05,group:1,dir:[1,.4,0],paint:o}),n.ell([.5,.1,.25],[.22,.12,.18],l.STONE,{group:2,rough:.02});for(let c=0;c<6;c++)n.seg([Math.cos(c)*.45,0,Math.sin(c)*.3+.1],[Math.cos(c)*.5,.18+e()*.12,Math.sin(c)*.3+.1],.03,.005,l.LEAF,{group:3})}function Yd(n,e,t){const i=uu(t.lean||0),r=t.broken?2.2:3.2;if(n.box([0,.14,0],[.48,.14,.48],l.STONE,{round:.03,rough:.01,group:1,paint:a=>vi(a[0]*9,a[2]*9,3)<.2?l.MOSS:void 0}),n.seg(i([0,.28,0]),i([0,r,0]),.32,.28,l.STONE,{group:2,rough:.012,paint:a=>{const s=Math.atan2(a[2],a[0]);return Math.sin(s*10)>.7?l.STONED:vi(Math.floor(s*4),Math.floor(a[1]*3),4)<.18?l.BELLY:a[1]<.9&&vi(Math.floor(s*6),Math.floor(a[1]*6),5)<.3?l.MOSS:void 0}}),t.broken){for(let a=0;a<4;a++){const s=a*1.6+.3;n.seg(i([Math.cos(s)*.15,r,Math.sin(s)*.15]),i([Math.cos(s)*.2,r+.2+e()*.2,Math.sin(s)*.2]),.12,.03,l.STONE,{group:3})}n.seg([1,.26,.3],[1.05,.26,-.35],.27,.27,l.STONE,{group:4,rough:.015})}else n.box(i([0,r+.08,0]),[.4,.08,.4],l.STONE,{round:.02,group:3,dir:[Math.cos(t.lean||0),-Math.sin(t.lean||0),0]}),n.box(i([0,r+.22,0]),[.46,.06,.46],l.STONE,{round:.02,group:3,dir:[Math.cos(t.lean||0),-Math.sin(t.lean||0),0],paint:()=>l.MOSS})}function Xd(n,e,t){const i=(r,a,s,o,c)=>{const u=[];for(let d=0;d<=5;d++){const f=d/5;u.push([r+(e()-.5)*.2*f,f*s,a+(e()-.5)*.15*f,o*(1-.55*f)*(.85+e()*.3)])}const h=d=>{const f=(d[1]*1.3+Math.sin(d[0]*3+d[2]*2)*.15)%1;return f<.06?l.STONED:f>.94?l.MOSS:Math.sin(Math.atan2(d[2]-a,d[0]-r)*5+d[1])>.93?l.STONED:vi(Math.floor(d[0]*5),Math.floor(d[1]*5),c)<.07?l.BELLY:void 0};n.chain(u,l.STONE,{group:c,rough:.07,paint:h});for(let d=0;d<4;d++){const f=.15+d*.2+e()*.1,p=e()*Math.PI*2,m=o*(1-.55*f);n.ell([r+Math.cos(p)*m*.7,f*s,a+Math.sin(p)*m*.7],[m*.55,m*.4,m*.5],l.STONE,{group:c,rough:.06,paint:h})}for(let d=0;d<6;d++){const f=d/6*Math.PI*2+e(),p=[r+Math.cos(f)*.12,s+.05,a+Math.sin(f)*.12];n.seg(p,[p[0]+Math.cos(f)*.45,p[1]+.35,p[2]+Math.sin(f)*.45],.06,.01,d%2?l.LEAF2:l.LEAF,{group:c+10})}n.ell([r,s-.05,a],[o*.5,.12,o*.45],l.MOSS,{group:c+10})};i(0,0,4.4+e()*.8,.85,1),t.twin&&i(1.2,-.4,2.8+e()*.5,.6,2);for(let r=0;r<5;r++){const a=r*1.25;n.ell([Math.cos(a)*1.1,.12,Math.sin(a)*.9],[.25,.16,.2],l.STONE,{group:5,rough:.03})}}function Kd(n,e,t){const i=r=>{const a=Math.atan2(r[2],r[0]);return Math.sin(a*9+r[1]*.8)>.65?l.STONED:vi(Math.floor(a*7),Math.floor(r[1]*8),6)<.06?l.BELLY:void 0};n.chain([[0,0,0,.62],[.03,1.1,0,.42],[-.02,2.2,.02,.22],[0,3+e()*.5,0,.04]],l.STONE,{group:1,rough:.025,paint:i});for(const[r,a,s]of[[.75,.3,1.1],[-.7,.2,.8],[.4,-.6,.6],[-.3,.65,.45]])n.chain([[r,0,a,.22],[r,s*.6,a,.12],[r,s,a,.02]],l.STONE,{group:2,rough:.02,paint:i});n.ell([0,.03,0],[.95,.04,.8],l.BODY2,{group:3})}const qd={snag:Gd,cairn:Vd,standingstone:Wd,pillar:Yd,spire:Xd,stalagmite:Kd};function Zd(n,e,t,i,r,a=16){const s=new et({blend:.05});qd[n](s,r,e);const o=Hd(Mi(s,{scale:iu(i)}).sp),c=t.leaf??.28,u={[l.STONE]:pe(.09,.07,.58),[l.STONED]:pe(.62,.1,.34),[l.BELLY]:pe(.14,.15,.78),[l.MOSS]:pe(c,.5,.4),[l.LEAF]:pe(c,.55,.45),[l.LEAF2]:pe(c-.03,.5,.6),[l.TRUNK]:pe(.07,.2,.36),[l.BARKD]:pe(.06,.25,.18),[l.BARKL]:pe(.08,.15,.52),[l.FLOWER]:[196,150,96],[l.BODY2]:[52,70,86],[l.NOSE]:[20,16,24],[l.LINE]:[24,22,30]};return n==="snag"&&(u[l.BELLY]=[214,196,160]),{sp:o,colours:u,metres:{height:+(o.h/a).toFixed(1),width:+(o.w/a).toFixed(1)}}}const Be=(n,e={})=>["tree",{type:n,...e}],Ae=(n,e={})=>[n,e],pa=[{id:"moor",name:"Moor",creature:"badger",by:"Ed",leaf:.24,floor:["moss",.26,.45,.42],text:{floor:"moss",wall:"puddles, a lake",small:"long grass",big:"moss mounds"},wall:[Ae("water",{w:1.6})],small:[Ae("grass",{h:1.4})],big:[Ae("mound",{moss:!0}),Ae("cairn",{sparse:.12}),Ae("standingstone",{sparse:.12})]},{id:"fern-forest",name:"Fern forest",creature:"boar",by:"Ed",leaf:.3,floor:["needles",.08,.45,.32],text:{floor:"pine needles",small:"ferns",big:"pine trees"},small:[Ae("fern")],big:[Be("larch",{scale:1.1}),Be("fir",{minor:!0})]},{id:"muddy-forest",name:"Muddy forest",creature:"snail",by:"Ed",leaf:.22,floor:["mud",.07,.5,.28],text:{floor:"mud and leaves",small:"short trunks with broken branches",big:"trees with many trunks and branches"},small:[Ae("stump",{snag:!0})],big:[Be("sycamore",{trunks:3,gnarl:.9}),Be("alder",{minor:!0})]},{id:"stone-shrine",name:"Stone shrine",creature:"fox",by:"Ed",leaf:.28,floor:["stony",.25,.3,.45],text:{floor:"grassy, stony",wall:"mossy henges",small:"little stones",big:"big stones",set:"a shrine"},wall:[Ae("henge")],small:[Ae("stones")],big:[Ae("boulder"),Ae("pillar",{sparse:.1}),Ae("pillar",{sparse:.08,broken:!0,lean:.14}),Ae("cairn",{sparse:.08,tall:!0})],set:Ae("shrine")},{id:"tangly-forest",name:"Tangly forest",creature:"ram",by:"Ed",leaf:.27,floor:["nettles",.28,.5,.3],text:{floor:"nettles and earth",small:"tangled branches",big:"fairly short tangly trees"},small:[Ae("bramble",{bare:!0})],big:[Be("hawthorn",{scale:.9,gnarl:1})]},{id:"wispy-forest",name:"Wispy forest",creature:"woodlouse",by:"Ed",leaf:.2,floor:["leaves",.09,.55,.45],text:{floor:"dry leaves",small:"tall thin wispy trees",big:"thick trees with several trunks"},small:[Be("birch",{scale:.75})],big:[Be("lime",{trunks:3,thick:1.4}),Be("birch",{minor:!0})]},{id:"hazel-forest",name:"Hazel forest",creature:"hedgehog",by:"Ed",leaf:.26,floor:["grass",.24,.45,.45],text:{floor:"short grass",small:"brown lumps",big:"crooked trees with many branches"},small:[Ae("mound",{brown:!0})],big:[Be("hazel",{gnarl:1,scale:.95}),Be("oak",{minor:!0,scale:.9})]},{id:"garden",name:"Garden",creature:"squirrel",by:"Ed",leaf:.3,floor:["lawn",.27,.5,.5],text:{floor:"uniform grass",wall:"ornate stone wall",small:"manicured flower beds",big:"willows",set:"a stone pavilion"},wall:[Ae("wall")],small:[Ae("flowerbed")],big:[Be("willow")],set:Ae("pavilion")},{id:"twiggy-forest",name:"Twiggy forest",creature:"wolf",by:"Ed",leaf:.29,floor:["plants",.3,.5,.38],text:{floor:"small leafy plants",small:"small trees with many thin trunks",big:"straight but slanted trees with many trunks"},small:[Be("broad",{trunks:4,scale:.5,thin:!0})],big:[Be("ash",{trunks:3,lean:.3,gnarl:.1})]},{id:"ancient",name:"Ancient",creature:"stag",by:"Ed",leaf:.31,floor:["roots",.1,.25,.35],text:{floor:"mossy roots over rocks",small:"sorrel",big:"giant gnarly slanted trees"},small:[Ae("flowers",{hue:.98,leafy:!0})],big:[Be("yew",{scale:1.4,gnarl:1,lean:.35}),Be("oak",{minor:!0,scale:1.3,gnarl:1})]},{id:"norway",name:"Norway",creature:"stoat",by:"Ed",leaf:.36,floor:["slate",.6,.15,.35],text:{floor:"pine needles and slate",small:"rocks",big:"straight pines"},small:[Ae("stones",{big:!0})],big:[Be("fir",{scale:1.2}),Be("birch",{minor:!0})]},{id:"alder-forest",name:"Alder forest",creature:"snake",by:"Ed",leaf:.23,floor:["tallgrass",.22,.45,.42],text:{floor:"tall and short grass",small:"tree stumps with tall grass around",big:"tall slanted trees with thin leaves at different heights"},small:[Ae("stump",{grass:!0})],big:[Be("alder",{lean:.3,scale:1.2,dark:!0})]},{id:"meadow",name:"Meadow",creature:"hare",by:"draft",leaf:.25,floor:["flowers",.25,.5,.5],text:{floor:"grass and wildflowers",small:"scattered hawthorn",big:"lone oaks"},small:[Ae("shrub",{flower:[250,245,235]})],big:[Be("chestnut",{scale:1.1}),Be("hawthorn",{minor:!0,scale:.8})]},{id:"old-oaks",name:"Old oaks",creature:"owl",by:"draft",leaf:.22,floor:["leaves",.07,.5,.35],text:{floor:"leaf litter",small:"acorns, fallen branches",big:"ancient gnarled oaks with hollow trunks",set:"a great hollow oak"},small:[Ae("cones",{acorn:!0}),Ae("log",{branch:!0})],big:[Be("oak",{gnarl:.9,hollow:!0}),Be("holly",{minor:!0,scale:.8})],set:Be("broad",{scale:1.6,gnarl:1,hollow:!0})},{id:"berry-thicket",name:"Berry thicket",creature:"bear",by:"draft",leaf:.32,floor:["needles",.08,.45,.3],text:{floor:"pine needles",wall:"bramble thickets",small:"berry bushes",big:"tall pines"},wall:[Ae("bramble")],small:[Ae("shrub",{flower:[200,30,60]})],big:[Be("pine",{scale:1.2}),Be("rowan",{minor:!0})]},{id:"wetland",name:"Wetland",creature:"toad",by:"draft",leaf:.2,floor:["mud",.15,.45,.3],text:{floor:"wet mud",wall:"puddles, reeds",small:"reeds and rushes",big:"willows"},wall:[Ae("water"),Ae("reeds",{tall:!0})],small:[Ae("reeds")],big:[Be("willow"),Be("alder",{minor:!0,scale:.9})]},{id:"stream",name:"Stream",creature:"otter",by:"draft",leaf:.27,floor:["pebbles",.25,.3,.45],text:{floor:"pebbles and grass",wall:"a stream or pond",small:"alder saplings",big:"alders",set:"a fallen-log bridge"},wall:[Ae("water",{w:2})],small:[Be("broad",{scale:.45})],big:[Be("alder",{scale:.95,gnarl:.3}),Be("willow",{minor:!0,scale:.8})],set:Ae("bridge")},{id:"rocky-slope",name:"Rocky slope",creature:"lynx",by:"draft",leaf:.34,floor:["scree",.2,.2,.42],text:{floor:"scree and moss",wall:"boulders",small:"rocks",big:"pines",set:"a rocky outcrop"},wall:[Ae("boulder",{big:!0})],small:[Ae("stones",{big:!0})],big:[Be("rowan",{scale:1.1}),Be("pine",{minor:!0})],set:Ae("outcrop")},{id:"bog",name:"Bog",creature:"elk",by:"draft",leaf:.38,floor:["moss",.18,.55,.4],text:{floor:"sphagnum moss",wall:"bog pools",small:"cotton grass",big:"spruce"},wall:[Ae("water",{bog:!0})],small:[Ae("reeds",{cotton:!0})],big:[Be("birch",{scale:.8,dark:!0}),Be("pine",{minor:!0,scale:.7})]},{id:"deadwood",name:"Deadwood",creature:"raven",by:"draft",leaf:.15,floor:["earth",.07,.35,.3],text:{floor:"bare earth",small:"broken branches",big:"blasted dead trees"},small:[Ae("log",{branch:!0})],big:[Be("broad",{bare:!0,gnarl:1})]},{id:"cave-mouth",name:"Cave mouth",creature:"bat",by:"draft",leaf:.2,floor:["stone",.08,.15,.35],text:{floor:"stone and roots",wall:"rock walls",small:"stalagmite stubs",big:"dead trees",set:"a cave mouth"},wall:[Ae("rockwall")],small:[Ae("stalagmite")],big:[Be("broad",{bare:!0}),Be("yew",{minor:!0,scale:.8})],set:Ae("cave")},{id:"grassland",name:"Grassland",creature:"mole",by:"draft",leaf:.25,floor:["grass",.26,.5,.48],text:{floor:"short turf",small:"molehills",big:"lone birches"},small:[Ae("mound",{brown:!0,small:!0})],big:[Be("flat",{scale:1.1}),Be("weepingBirch",{minor:!0})]},{id:"beaver-pond",name:"Beaver pond",creature:"beaver",by:"draft",leaf:.17,floor:["leaves",.13,.6,.5],text:{floor:"birch leaves",wall:"a pond",small:"stumps",big:"birch and aspen",set:"a beaver dam"},wall:[Ae("water",{w:2})],small:[Ae("stump",{gnawed:!0})],big:[Be("weepingBirch"),Be("alder",{minor:!0,scale:.8})],set:Ae("dam")},{id:"log-pile",name:"Log pile",creature:"beetle",by:"draft",leaf:.22,floor:["leaves",.06,.5,.3],text:{floor:"rotting leaves",small:"fungi",big:"rotting logs",set:"a fallen giant"},small:[Ae("fungi")],big:[Ae("log",{rot:!0}),Ae("snag",{sparse:.12}),Ae("snag",{sparse:.1,hollow:!0,lean:.12})],set:Ae("log",{rot:!0,giant:!0})},{id:"heath",name:"Heath",creature:"moth",by:"draft",leaf:.27,floor:["heather",.85,.35,.4],text:{floor:"heather",small:"gorse",big:"wind-bent birches"},small:[Ae("shrub",{flower:[250,205,40],spiky:!0})],big:[Be("birch",{lean:.45,scale:.75}),Be("hawthorn",{minor:!0,scale:.7,lean:.45})]},{id:"old-pinewood",name:"Old pinewood",creature:"marten",by:"draft",leaf:.35,floor:["needles",.07,.4,.3],text:{floor:"pine needles",small:"pine cones",big:"tall old pines with knotholes"},small:[Ae("cones")],big:[Be("pine",{scale:1.35}),Be("rowan",{minor:!0,scale:.8})]},{id:"ravine",name:"Ravine",creature:"salamander",by:"draft",leaf:.3,floor:["stone",.3,.3,.32],text:{floor:"wet moss and rock",wall:"rock walls",small:"ferns",big:"mossy boulders",set:"a waterfall"},wall:[Ae("rockwall",{moss:!0})],small:[Ae("fern")],big:[Ae("boulder",{moss:!0,big:!0}),Ae("spire",{sparse:.1}),Ae("spire",{sparse:.06,twin:!0}),Ae("stalagmite",{sparse:.1})],set:Ae("waterfall")},{id:"bluebell-glade",name:"Bluebell glade",creature:"glowworm",by:"draft",leaf:.26,floor:["bluebells",.27,.45,.4],text:{floor:"bluebells",small:"ferns",big:"beeches"},small:[Ae("fern")],big:[Be("beech",{gnarl:.2,scale:1.1}),Be("holly",{minor:!0,scale:.7})]},{id:"holly-thicket",name:"Holly thicket",creature:"spider",by:"draft",leaf:.36,floor:["leaves",.08,.35,.28],text:{floor:"dead leaves",wall:"holly hedges",small:"cobwebs",big:"hollies",set:"a web-hung dead tree"},wall:[Ae("hedge",{berries:!0})],small:[Ae("web")],big:[Be("holly",{scale:.9}),Be("yew",{minor:!0,scale:.7})],set:Be("broad",{bare:!0,webs:!0})},{id:"honeysuckle-tangle",name:"Honeysuckle tangle",creature:"dormouse",by:"draft",leaf:.25,floor:["clover",.27,.45,.45],text:{floor:"grass and clover",wall:"bramble",small:"honeysuckle",big:"hazel coppice"},wall:[Ae("bramble")],small:[Ae("shrub",{flower:[250,230,170]})],big:[Be("hazel",{trunks:5,scale:.9,thin:!0}),Be("rowan",{minor:!0,scale:.8})]}];for(const[n,[e,t]]of Object.entries(ru)){const i=pa.find(r=>r.id===n);i&&!i.set&&(i.set=Ae(e,{three:!0}),i.text={...i.text,set:t})}const $d=Object.fromEntries(pa.map(n=>[n.id,n])),Jd=["ruins","rocks","freak","lake","modern"],mt=(n,e,t,i,r,a,s,o,c,u,h={})=>({pattern:n,...h,density:e,clump:t,glades:{count:i[0],size:i[1]||[0,0]},heightMix:r&&{sapling:r[0],mature:r[1],tall:r[2],giant:r[3]},undergrowth:a,lean:{dir:s[0],amount:s[1]},terrain:o,decor:{rate:c[0],...Object.fromEntries(Jd.map((d,f)=>[d,c[1][f]]))},feel:u}),Rt=[0,0],Qd={moor:mt("scatter",.2,.6,[2,[14,24]],null,.7,[30,.2],["pools","mounds","hollows"],[.5,[.3,.4,0,.3,0]],"Open rolling moss, low mounds and dark pools, long grass combed one way by the wind; you can see a long way."),"fern-forest":mt("groves",.65,.6,[2,[8,12]],[.2,.5,.25,.05],.9,Rt,["hollows","paths"],[.25,[.4,.3,.3,0,0]],"Pine groves standing waist-deep in ferns, with green sunken hollows between them."),"muddy-forest":mt("scatter",.7,.3,[1,[6,9]],[.25,.55,.17,.03],.4,Rt,["pools","paths"],[.3,[.3,.1,.2,.1,.3]],"Squelching mud between many-trunked trees, puddled ruts winding through, broken stumps everywhere."),"stone-shrine":mt("rings",.35,.8,[1,[10,14]],null,.3,Rt,["rocky","mounds"],[.5,[.6,.4,0,0,0]],"Big stones stand in rings round the shrine on stony grass; it feels deliberate and old."),"tangly-forest":mt("thicket",.9,.2,[1,[5,8]],[.35,.55,.1,0],.9,Rt,["hollows"],[.2,[.2,0,.6,0,.2]],"Short tangled trees packed close over nettles, low and claustrophobic, with one small clearing."),"wispy-forest":mt("stands",.55,.7,[2,[6,10]],[.15,.45,.3,.1],.5,Rt,["ridges"],[.3,[.4,.2,.3,0,.1]],"Stands of thick many-trunked trees, thin wispy saplings drifting between them over dry leaves."),"hazel-forest":mt("rings",.6,.6,[2,[6,9]],[.3,.55,.12,.03],.5,Rt,["mounds","paths"],[.3,[.4,.3,.3,0,0]],"Crooked hazels grown in loose fairy rings on short grass, lumpy little mounds in the middle of each."),garden:mt("rows",.45,0,[3,[6,10]],[.1,.7,.2,0],.6,Rt,["paths","pools"],[.4,[.7,0,0,.2,.1]],"A lost formal garden: willows in avenues along straight paths, lawns and flower beds, a pavilion at the heart.",{along:"paths"}),"twiggy-forest":mt("scatter",.75,.3,[1,[6,10]],[.25,.5,.2,.05],.6,[60,.5],["paths"],[.25,[.3,.2,.3,0,.2]],"Straight many-trunked trees all slanting the same way, like a wood frozen in a gale."),ancient:mt("lone",.4,.2,[1,[12,18]],[.05,.35,.4,.2],.4,[150,.25],["rocky","mounds","hollows"],[.45,[.5,.2,.3,0,0]],"Giant gnarled trees far apart, roots heaving over mossy rocks; every tree is a landmark."),norway:mt("stands",.8,.5,[1,[8,12]],[.15,.45,.35,.05],.2,Rt,["rocky","ridges"],[.3,[.2,.6,0,.2,0]],"Dense stands of straight pines on slate ridges, bare rock between; dark, vertical and cold."),"alder-forest":mt("scatter",.55,.4,[2,[6,10]],[.2,.4,.35,.05],.6,[120,.35],["stream","hollows"],[.3,[.3,.1,.2,.3,.1]],"Tall slanted alders at every height over long grass and stumps, a little stream wandering through."),meadow:mt("lone",.12,.1,[0],[.2,.5,.25,.05],.3,Rt,["mounds","paths"],[.35,[.3,.3,0,.2,.2]],"Wide-open wildflower grass with a lone oak here and there and scattered hawthorn; the sky does the work."),"old-oaks":mt("groves",.5,.5,[2,[10,16]],[.1,.35,.4,.15],.5,Rt,["mounds","hollows"],[.4,[.5,.1,.4,0,0]],"Groves of huge hollow oaks with broad clearings of leaf litter between; slow and grand."),"berry-thicket":mt("thicket",.85,.5,[2,[4,7]],[.2,.4,.35,.05],1,Rt,["paths"],[.15,[.3,0,.4,0,.3]],"Tall pines over solid berry bushes and brambles, only narrow animal paths and a couple of pockets of space."),wetland:mt("edgeOnly",.5,.5,[1,[16,24]],[.25,.55,.15,.05],.8,Rt,["pools","stream"],[.35,[.2,0,0,.6,.2]],"Open reedy water and mud in the middle, willows crowding the rim; wet and echoing."),stream:mt("rows",.5,.2,[1,[6,10]],[.3,.45,.2,.05],.5,Rt,["stream","pools"],[.3,[.3,.3,0,.3,.1]],"Alders lining both banks of a pebbly stream, saplings at the water's edge, open grass away from it.",{along:"stream"}),"rocky-slope":mt("scatter",.35,.6,[1,[8,12]],[.3,.5,.18,.02],.2,[90,.15],["rocky","ridges"],[.5,[.3,.7,0,0,0]],"Scree and boulders with pines clinging in clumps, everything leaning slightly uphill."),bog:mt("stands",.25,.85,[3,[10,20]],[.4,.5,.1,0],.6,Rt,["pools","mounds"],[.35,[.2,0,0,.5,.3]],"Sphagnum and bog pools, stunted spruce in tight dark stands, cotton grass pale between them."),deadwood:mt("scatter",.25,.2,[2,[8,14]],[.05,.3,.45,.2],.15,Rt,["ridges","hollows"],[.45,[.3,.1,.3,0,.3]],"Sparse tall blasted snags on bare ridges; bleak, quiet, with long sightlines."),"cave-mouth":mt("edgeOnly",.4,.5,[1,[10,14]],[.2,.5,.3,0],.2,Rt,["rocky","ridges"],[.4,[.3,.6,0,0,.1]],"Rock walls and dead trees ring an open stone floor that leads to the cave's dark mouth."),grassland:mt("lone",.1,.5,[0],[.3,.5,.2,0],.2,Rt,["mounds"],[.35,[.3,.2,0,.1,.4]],"Short turf to the horizon, molehills, birches alone or in twos and threes."),"beaver-pond":mt("edgeOnly",.55,.4,[1,[14,20]],[.4,.45,.15,0],.4,Rt,["pools","stream"],[.4,[.1,0,0,.7,.2]],"A pond in the middle, young birch and aspen round it, gnawed stumps where the big ones were felled."),"log-pile":mt("groves",.5,.7,[2,[6,10]],null,.7,Rt,["hollows","mounds"],[.3,[.3,0,.4,0,.3]],"Rotting logs heaped in piles, fungi everywhere, damp hollows between the heaps."),heath:mt("scatter",.2,.3,[1,[12,18]],[.5,.45,.05,0],.8,[30,.6],["ridges","paths"],[.4,[.4,.4,0,0,.2]],"Purple heather and gorse, small birches bent hard by the wind, all the same way."),"old-pinewood":mt("scatter",.5,.3,[2,[8,14]],[.1,.35,.4,.15],.15,Rt,["mounds","paths"],[.35,[.4,.3,.3,0,0]],"Cathedral-tall old pines on a clear floor of needles; you can see between the trunks a long way."),ravine:mt("edgeOnly",.55,.6,[1,[6,9]],null,.8,Rt,["stream","ridges","rocky"],[.4,[.3,.5,0,.2,0]],"A deep wet cleft: rock walls and mossy boulders either side, ferns, a stream down the middle."),"bluebell-glade":mt("groves",.45,.5,[3,[8,14]],[.1,.5,.35,.05],.3,Rt,["hollows"],[.35,[.4,0,.3,.3,0]],"Beech groves round open glades carpeted in bluebells; soft, bright and airy."),"holly-thicket":mt("thicket",.9,.3,[1,[6,9]],[.3,.6,.1,0],.7,Rt,["hollows"],[.25,[.3,0,.5,0,.2]],"Dark hollies packed close, cobwebs strung between, one clearing round the web-hung tree."),"honeysuckle-tangle":mt("stands",.6,.7,[2,[5,8]],[.45,.5,.05,0],.8,Rt,["paths","mounds"],[.3,[.3,0,.3,0,.4]],"Hazel coppice stools in clumps, honeysuckle and bramble between, clover paths winding through.")};for(const n of pa)n.layout=Qd[n.id];function jd(n,e,t=64,i=48){const[r,a,s,o]=n.floor,c=new Bt(t,i),u=n.id.length*131;for(let x=0;x<i;x++)for(let _=0;_<t;_++){const g=(Qn(_/7,x/5,u)*(t-_)*(i-x)+Qn((_-t)/7,x/5,u)*_*(i-x)+Qn(_/7,(x-i)/5,u)*(t-_)*x+Qn((_-t)/7,(x-i)/5,u)*_*x)/(t*i),M=g<.38?l.BODY2:g>.64?l.BELLY:l.BODY;c.px(_,x,M,0,-.42,.91)}const h=il(u),d=(x,_,g)=>c.px((x%t+t)%t,(_%i+i)%i,g,0,-.42,.91),f={moss:0,needles:70,mud:25,stony:30,nettles:60,leaves:80,grass:70,lawn:30,plants:60,roots:30,slate:40,tallgrass:90,flowers:70,pebbles:60,scree:70,earth:15,stone:40,heather:90,bluebells:90,clover:60}[r]??40;for(let x=0;x<f;x++){const _=Math.floor(h()*t),g=Math.floor(h()*i);if(r==="needles"){const M=h()<.5?1:-1;for(let E=0;E<3;E++)d(_+E*M,g+(E>>1),h()<.5?l.BODY2:l.ACCENT)}else if(["grass","lawn","tallgrass","plants","nettles","clover","flowers","bluebells","heather"].includes(r)){const M=r==="tallgrass"?4:r==="lawn"?1:2;for(let E=0;E<M;E++)d(_,g-E,E===M-1?l.LEAF2:l.LEAF);(r==="flowers"||r==="bluebells"||r==="heather"||r==="clover")&&h()<.5&&d(_+1,g-M,l.FLOWER)}else if(["stony","pebbles","scree","slate","stone","roots"].includes(r)){if(d(_,g,l.ACCENT),h()<.6&&d(_+1,g,l.ACCENT),h()<.4&&d(_,g+1,l.BODY2),r==="roots"&&h()<.5)for(let M=0;M<5;M++)d(_+M,g+(M>2?1:0),l.TRUNK)}else if(r==="leaves")d(_,g,l.FLOWER),d(_+1,g,l.FLOWER),h()<.5&&d(_,g+1,l.ACCENT);else if(r==="mud"||r==="earth")for(let M=0;M<3;M++)d(_+M,g,l.BODY2)}const p={flowers:pe(.13,.6,.95),bluebells:[90,110,230],heather:[180,90,170],clover:[240,235,240],leaves:pe(a+.02,.65,.6)}[r]||pe(a,.3,.6),m={[l.BODY]:pe(a,s*e.sat,o),[l.BODY2]:pe(a+.02,s*e.sat*1.1,o*.78),[l.BELLY]:pe(a-.02,s*e.sat*.9,Math.min(1,o*1.15)),[l.ACCENT]:r==="needles"?pe(.07,.5,.5):pe(.1,.08,.62),[l.FLOWER]:p,[l.LEAF]:pe(n.leaf,.55*e.sat,.45),[l.LEAF2]:pe(n.leaf-.03,.5*e.sat,.62),[l.TRUNK]:pe(e.trunkHue,.4,.3)};return{sp:c,colours:m}}const $i=n=>({[l.ACCENT]:pe(.1,.06,.6),[l.BODY2]:pe(.62,.08,.4),[l.BELLY]:pe(.1,.05,.78),[l.LEAF]:pe(.27,.5,.45),[l.LEAF2]:pe(.25,.45,.62),[l.NOSE]:[20,16,24]});function Cr(n,e,t,i,r,a,s){const o=[];for(let c=0;c<8;c++){const u=c/8*Math.PI*2,h=1+(a()-.5)*.3;o.push([e[0]+Math.cos(u)*t*h,e[1]+Math.sin(u)*i*h*(Math.sin(u)>0?.5:1)])}n.shape(o,l.ACCENT,{group:5,line:!0,round:r.round}),n.mark([lt(e,[-t,i*.1]),lt(e,[t,i*.1]),lt(e,[t,i]),lt(e,[-t,i])],l.BODY2,[l.ACCENT]),n.mark([lt(e,[-t*.6,-i*.8]),lt(e,[t*.1,-i*1.1]),lt(e,[t*.3,-i*.5]),lt(e,[-t*.3,-i*.3])],l.BELLY,[l.ACCENT]),s&&n.mark(ps([lt(e,[-t*1.1,-i*.55]),lt(e,[0,-i*1.3]),lt(e,[t*1.1,-i*.5]),lt(e,[t*.6,-i*.2]),lt(e,[-t*.6,-i*.2])],0,3,3,i*.15,1),l.LEAF,[l.ACCENT,l.BELLY,l.BODY2])}function Qa(n,e,t,i,r,a){if(zd.includes(n))return Zd(n,e,t,i,r);const s={[l.LEAF]:pe(t.leaf,.6*i.sat,.55),[l.LEAF2]:pe(t.leaf-.05,.55*i.sat,.78),[l.LEAF3]:pe(t.leaf+.03,.66*i.sat,.36)},o={[l.TRUNK]:pe(i.trunkHue,.45*i.sat,.34),[l.BARKD]:pe(i.trunkHue+.03,.5*i.sat,.17),[l.BARKL]:pe(i.trunkHue-.01,.38*i.sat,.5),[l.BELLY]:pe(i.trunkHue+.02,.3,.7)},c={[l.MAGIC]:[60,110,150],[l.MAGIC2]:[150,200,220],[l.BODY2]:[35,70,100]};if(n==="tree"){const x=cu(e.type).fn,_={...i,leafHue:t.leaf+(e.dark?.05:0),gnarl:e.gnarl??i.gnarl,treeBare:e.bare,treeTrunks:e.trunks,treeLean:e.lean,treeThick:e.thick,treeThin:e.thin,treeHollow:e.hollow,treeWebs:e.webs},g=x(r,_,i.treeSize*a*(e.scale||1)*ce(r,.9,1.1)),M=ul(r,_,x);return e.dark&&(M[l.LEAF]=M[l.LEAF3],M[l.LEAF3]=pe(t.leaf+.05,.7,.22)),M[l.NOSE]=[20,16,24],M[l.WEB]=[225,225,232],{sp:g.sp,colours:M}}if(n==="shrub"){const x=kd(r,{...i,leafHue:t.leaf,bushSize:i.bushSize*a,flowers:1});for(let _=0;_<x.sp.m.length;_++)x.sp.m[_]&&Lt(_,1,3)<(e.spiky?.18:.1)&&x.sp.m[_]!==l.TRUNK&&(x.sp.m[_]=l.FLOWER);return x.colours[l.FLOWER]=e.flower,x}const u=Math.round(48*a*(e.w||1)),h=Math.round(32*a),d=new Bt(u,h),f=u/2,p=h;let m={};if(n==="grass"||n==="reeds"||n==="fern"||n==="flowers"||n==="flowerbed"){const x=n==="flowerbed"?40:24,_=(n==="reeds"?e.tall?26:20:n==="fern"?14:10*(e.h||1))*a;n==="flowerbed"&&d.shape([[f-20*a,p-2],[f-18*a,p-6*a],[f+18*a,p-6*a],[f+20*a,p-2],[f+20*a,p],[f-20*a,p]],l.ACCENT,{group:2,line:!0});for(let g=0;g<x;g++){const M=f+ce(r,-16,16)*a,E=_*ce(r,.5,1),b=n==="fern"?ce(r,-6,6)*a:ce(r,-2,2)*a,R=p-1-(n==="flowerbed"?5*a:0);for(let w=0;w<E;w++){const D=w/E;d.px(M+b*D*D,R-w,D>.7?l.LEAF2:D<.3?l.LEAF3:l.LEAF,b*.05,-.3,.9),n==="fern"&&w%2&&d.px(M+b*D*D+(b>0?1:-1),R-w+1,l.LEAF2,0,-.3,.9)}if(n==="reeds"&&(e.cotton||r()<.5))for(let w=0;w<(e.cotton?2:3);w++)d.px(M+b,R-E-w,e.cotton?l.WEB:l.TRUNK,0,-.5,.85);(n==="flowers"||n==="flowerbed")&&r()<.7&&(d.px(M+b,R-E,l.FLOWER,0,-.5,.85),d.px(M+b+1,R-E,l.FLOWER,0,-.5,.85))}if(m={...s,[l.FLOWER]:n==="flowerbed"?rl(r,[[230,80,120],[250,210,60],[150,110,230]]):pe(e.hue??.95,.6,.85),[l.TRUNK]:pe(.07,.5,.35),[l.WEB]:[240,240,235],[l.ACCENT]:pe(.08,.1,.55)},n==="flowerbed"){for(let g=0;g<d.m.length;g++)d.m[g]===l.FLOWER&&Lt(g,2,7)<.5&&(d.m[g]=l.BELLY);m[l.BELLY]=[250,245,240]}}else if(n==="stones"){for(let x=0;x<(e.big?3:6);x++)Cr(d,[f+ce(r,-14,14)*a,p-(e.big?5:2.5)*a],(e.big?6:3)*a*ce(r,.7,1.2),(e.big?5:2.5)*a,i,r);m=$i()}else if(n==="boulder")Cr(d,[f,p-(e.big?11:8)*a],(e.big?18:13)*a,(e.big?12:9)*a,i,r,e.moss),m={...$i(),...s,[l.ACCENT]:pe(.1,.06,.6)};else if(n==="henge")d.shape([[f-7*a,p],[f-8*a,p-18*a],[f-4*a,p-28*a],[f+5*a,p-27*a],[f+8*a,p-14*a],[f+7*a,p]],l.ACCENT,{group:5,line:!0,round:i.round}),d.mark([[f-9*a,p-30*a],[f+9*a,p-30*a],[f+9*a,p-22*a],[f-9*a,p-18*a]],l.LEAF,[l.ACCENT]),m={...$i(),...s};else if(n==="mound"){const x=(e.small?8:14)*a,_=(e.small?5:8)*a;d.shape(ps([[f-x,p],[f-x*.6,p-_*.8],[f,p-_],[f+x*.6,p-_*.8],[f+x,p]],0,4,e.moss?3:1,(e.moss?1.5:.8)*a,1),e.moss?l.LEAF:l.TRUNK,{group:5,round:i.round}),d.mark([[f-x,p-_*.45],[f+x,p-_*.45],[f+x,p],[f-x,p]],e.moss?l.LEAF3:l.BARKD,[e.moss?l.LEAF:l.TRUNK]),m={...s,...o,[l.TRUNK]:pe(.07,.45,e.brown?.35:.3)}}else if(n==="stump"){const x=6*a;if(d.limb([[f,p,x*2.2],[f,p-8*a,x*1.6]],l.TRUNK,{group:5,round:i.round,cap:0,capEnd:0}),d.shape([[f-x*.8,p-8*a],[f,p-10*a-(e.gnawed?4*a:0)],[f+x*.8,p-8*a],[f,p-7*a]],l.BELLY,{group:6,round:i.round}),e.snag&&d.limb([[f+x*.4,p-8*a,2.5*a],[f+x*1.6,p-15*a,1.5*a]],l.TRUNK,{group:7,round:i.round}),e.grass)for(let _=0;_<20;_++){const g=f+ce(r,-14,14)*a,M=ce(r,6,13)*a;for(let E=0;E<M;E++)d.px(g,p-1-E,E>M*.6?l.LEAF2:l.LEAF,0,-.3,.9)}m={...s,...o}}else if(n==="log"){const x=(e.giant?46:e.branch?18:30)*a,_=(e.giant?14:e.branch?3:8)*a;if(d.limb([[f-x/2,p-_/2,_],[f+x/2,p-_/2-(e.branch?2*a:0),_*.9]],l.TRUNK,{group:5,round:i.round,cap:.3,capEnd:.3}),e.branch||d.shape([[f+x/2-_*.1,p-_],[f+x/2+_*.2,p-_/2],[f+x/2-_*.1,p],[f+x/2-_*.3,p-_/2]],l.BELLY,{group:6,round:i.round}),e.rot)for(let g=0;g<(e.giant?6:3);g++){const M=f+ce(r,-x/2,x/3);d.shape([[M-3*a,p-_*.9],[M,p-_-3*a],[M+3*a,p-_*.9]],l.FLOWER,{group:7,line:!0,round:i.round})}e.branch&&d.limb([[f,p-_,_*.7],[f+5*a,p-_-6*a,_*.4]],l.TRUNK,{group:6,round:i.round}),m={...o,[l.FLOWER]:[230,190,120]}}else if(n==="fungi"){for(let x=0;x<5;x++){const _=f+ce(r,-12,12)*a,g=ce(r,3,7)*a,M=ce(r,3,5)*a;d.limb([[_,p,1.6*a],[_,p-g,1.4*a]],l.BELLY,{group:5}),d.shape([[_-M,p-g],[_,p-g-M*.8],[_+M,p-g]],x%2?l.FLOWER:l.MAGIC,{group:6+x%2,line:!0,round:i.round})}m={[l.BELLY]:[225,215,195],[l.FLOWER]:[190,80,50],[l.MAGIC]:[120,230,200]}}else if(n==="cones"){for(let x=0;x<6;x++){const _=f+ce(r,-14,14)*a,g=p-2*a;d.ellipse(_,g,(e.acorn?1.6:2)*a,(e.acorn?2:2.8)*a,l.TRUNK,{round:i.round}),e.acorn?d.ellipse(_,g-1.6*a,1.8*a,1*a,l.BARKD,{round:i.round}):d.px(_,g-1,l.BARKL)}m=o}else if(n==="water"){const x=22*a*(e.w||1),_=6*a;d.shape([[f-x,p-_],[f-x*.3,p-_*1.5],[f+x*.6,p-_*1.2],[f+x,p-_*.5],[f+x*.4,p],[f-x*.7,p-_*.2]],l.MAGIC,{group:5,round:.2});for(let g=0;g<6;g++){const M=f+ce(r,-x*.6,x*.6),E=p-_*ce(r,.4,1.1);for(let b=0;b<3*a;b++)d.recolour(M+b,E,l.MAGIC2)}m=e.bog?{[l.MAGIC]:[60,70,50],[l.MAGIC2]:[120,130,90]}:c;for(let g=0;g<d.m.length;g++)d.m[g]===l.MAGIC?d.m[g]=l.BODY:d.m[g]===l.MAGIC2&&(d.m[g]=l.BELLY);m={[l.BODY]:m[l.MAGIC],[l.BELLY]:m[l.MAGIC2]}}else if(n==="bramble"||n==="hedge"){const x=22*a,_=(n==="hedge"?18:12)*a;for(let g=0;g<(n==="hedge"?6:4);g++){const M=f+ce(r,-x*.8,x*.8),E=p-_*ce(r,.4,.7);d.ellipse(M,E,ce(r,6,9)*a,_*.45,n==="hedge"?l.LEAF3:l.LEAF,{round:i.round,density:e.bare?.5:.95,noise:.5,seed:g})}for(let g=0;g<8;g++){let E=f+ce(r,-x,x),b=p;for(let R=0;R<_*1.2;R++)E+=Math.sin(R*.3+g)*.8,b-=.8,d.px(E,b,l.TRUNK,0,-.3,.9)}if(n==="hedge"||e.berries||n==="bramble")for(let g=0;g<d.m.length;g++)d.m[g]&&d.m[g]!==l.TRUNK&&Lt(g,5,9)<.05&&(d.m[g]=l.FLOWER);m={...s,...o,[l.FLOWER]:n==="hedge"?[210,30,40]:[70,30,70]}}else if(n==="wall"){const x=22*a,_=12*a;d.shape([[f-x,p],[f-x,p-_],[f+x,p-_],[f+x,p]],l.ACCENT,{group:5,line:!0,depth:2}),d.shape([[f-x-1,p-_],[f-x-1,p-_-2*a],[f+x+1,p-_-2*a],[f+x+1,p-_]],l.BELLY,{group:6,line:!0,depth:2}),d.shape([[f+x-6*a,p-_-2*a],[f+x-6*a,p-_-7*a],[f+x,p-_-7*a],[f+x,p-_-2*a]],l.ACCENT,{group:7,line:!0,depth:2}),d.ellipse(f+x-3*a,p-_-9*a,3*a,2.5*a,l.BELLY,{round:i.round});for(let g=p-_+3*a;g<p;g+=4*a)for(let M=f-x;M<f+x;M++)d.recolour(M,g,l.BODY2);m=$i()}else if(n==="rockwall"){for(let x=0;x<5;x++)Cr(d,[f+(x-2)*9*a,p-ce(r,8,14)*a],8*a,10*a,i,r,e.moss);m={...$i(),...s}}else if(n==="stalagmite"){for(let x=0;x<4;x++){const _=f+ce(r,-14,14)*a,g=ce(r,5,11)*a;d.shape([[_-3*a,p],[_-1*a,p-g],[_+1*a,p-g],[_+3*a,p]],l.ACCENT,{group:5,line:!0,round:i.round})}m=$i()}else if(n==="web"){const x=[f,p-14*a],_=11*a;for(let g=0;g<8;g++){const M=g/8*Math.PI*2;for(let E=0;E<_;E++)d.px(x[0]+Math.cos(M)*E,x[1]+Math.sin(M)*E,l.WEB,0,0,1)}for(let g=3*a;g<_;g+=3*a)for(let M=0;M<Math.PI*2;M+=.05)d.px(x[0]+Math.cos(M)*g,x[1]+Math.sin(M)*g,l.WEB,0,0,1);m={[l.WEB]:[225,230,240]}}return{sp:d,colours:m}}function ef(n,e,t,i,r,a){if(e.three)return Bh(n,t,i);if(n==="tree"||n==="log")return Qa(n,e,t,i,r,a);const s=Math.round(90*a),o=Math.round(70*a),c=new Bt(s,o),u=s/2,h=o;let d={...$i(),[l.LEAF]:pe(t.leaf,.55,.5),[l.LEAF2]:pe(t.leaf-.04,.5,.7),[l.TRUNK]:pe(i.trunkHue,.45,.34),[l.BARKD]:pe(i.trunkHue+.03,.5,.17),[l.MAGIC]:pe(i.magicHue,.6,1),[l.MAGIC2]:pe(i.magicHue,.2,1)};if(n==="shrine")c.shape([[u-16*a,h],[u-14*a,h-6*a],[u+14*a,h-6*a],[u+16*a,h]],l.ACCENT,{group:5,line:!0,depth:2}),c.shape([[u-9*a,h-6*a],[u-9*a,h-26*a],[u+9*a,h-26*a],[u+9*a,h-6*a]],l.ACCENT,{group:6,line:!0,depth:2}),c.shape([[u-5*a,h-10*a],[u-5*a,h-20*a],[u,h-23*a],[u+5*a,h-20*a],[u+5*a,h-10*a]],l.NOSE,{group:7}),c.shape([[u-13*a,h-26*a],[u,h-34*a],[u+13*a,h-26*a]],l.BODY2,{group:8,line:!0,depth:2}),c.ellipse(u,h-13*a,2.5*a,2.5*a,l.MAGIC2,{round:.5}),c.mark([[u-14*a,h-36*a],[u+2*a,h-36*a],[u-4*a,h-24*a],[u-14*a,h-24*a]],l.LEAF,[l.BODY2,l.ACCENT]);else if(n==="pavilion"){c.shape([[u-26*a,h],[u-26*a,h-4*a],[u+26*a,h-4*a],[u+26*a,h]],l.ACCENT,{group:5,line:!0,depth:2});for(const f of[-20,-7,7,20])c.limb([[u+f*a,h-4*a,4*a],[u+f*a,h-34*a,4*a]],f===-7||f===7?l.BODY2:l.BELLY,{group:6+(f>0?1:0),line:!0,cap:0,capEnd:0});c.shape([[u-28*a,h-34*a],[u-28*a,h-38*a],[u+28*a,h-38*a],[u+28*a,h-34*a]],l.ACCENT,{group:8,line:!0,depth:2}),c.shape([[u-24*a,h-38*a],[u-16*a,h-54*a],[u,h-60*a],[u+16*a,h-54*a],[u+24*a,h-38*a]],l.BELLY,{group:9,line:!0})}else if(n==="bridge"){const f=Qa("water",{w:1.8},t,i,r,a);for(let p=0;p<f.sp.m.length;p++){const m=p%f.sp.w,x=p/f.sp.w|0,_=Math.round(u-f.sp.w/2+m),g=h-f.sp.h+x;f.sp.m[p]&&c.inb(_,g)&&c.px(_,g,f.sp.m[p]===l.BODY?l.IRIS:l.PUPIL,0,-.42,.91)}c.limb([[u-34*a,h-6*a,9*a],[u+34*a,h-10*a,8*a]],l.TRUNK,{group:6,line:!0,cap:.3,capEnd:.3}),d[l.IRIS]=[60,110,150],d[l.PUPIL]=[150,200,220]}else if(n==="outcrop")for(const[f,p,m,x]of[[-18,14,16,13],[12,12,18,12],[-2,28,15,13],[16,34,9,9]])Cr(c,[u+f*a,h-p*a],m*a,x*a,i,r,!0);else if(n==="cave"){for(const[f,p,m,x]of[[-26,16,16,15],[26,16,16,15],[0,40,30,18],[-12,30,14,12],[12,30,14,12]])Cr(c,[u+f*a,h-p*a],m*a,x*a,i,r,p>30);c.shape([[u-15*a,h],[u-14*a,h-18*a],[u-4*a,h-28*a],[u+6*a,h-27*a],[u+14*a,h-16*a],[u+15*a,h]],l.NOSE,{group:9,line:!0})}else if(n==="dam"){const f=Qa("water",{w:1.9},t,i,r,a);for(let p=0;p<f.sp.m.length;p++){const m=p%f.sp.w,x=p/f.sp.w|0,_=Math.round(u-f.sp.w/2+m),g=h-f.sp.h+x-10*a;f.sp.m[p]&&c.inb(_,g)&&c.px(_,g,f.sp.m[p]===l.BODY?l.IRIS:l.PUPIL,0,-.42,.91)}for(let p=0;p<26;p++){const m=u+ce(r,-32,32)*a,x=h-ce(r,2,14)*a,_=ce(r,-.5,.5),g=ce(r,8,16)*a;c.limb([[m-Math.cos(_)*g/2,x-Math.sin(_)*g/2,2.6*a],[m+Math.cos(_)*g/2,x+Math.sin(_)*g/2,2*a]],p%3?l.TRUNK:l.BARKD,{group:6+p%2,line:!0})}d[l.IRIS]=[60,110,150],d[l.PUPIL]=[150,200,220]}else if(n==="waterfall"){for(const[f,p,m,x]of[[-22,30,18,30],[22,30,18,30],[0,56,20,12]])Cr(c,[u+f*a,h-p*a],m*a,x*a,i,r,!0);for(let f=u-6*a;f<u+6*a;f++)for(let p=h-50*a;p<h-4*a;p++)c.px(f,p,Lt(f|0,p/3|0,4)<.3?l.PUPIL:l.IRIS,0,-.2,.98);c.shape([[u-18*a,h],[u-14*a,h-6*a],[u+14*a,h-6*a],[u+18*a,h]],l.IRIS,{group:10,round:.2}),d[l.IRIS]=[90,150,190],d[l.PUPIL]=[210,235,245]}return{sp:c,colours:d}}function tf(n,e,{K:t=2/(e.pixel||2),makeCanvas:i=$c}={}){const r=$d[n];if(!r)throw new Error(`no area type "${n}"`);const a=il(n.split("").reduce((h,d)=>h*31+d.charCodeAt(0),7)>>>0),s=(h,d,f)=>({sp:Pr(h.sp,h.colours,e,"none",i),kind:d,text:f}),o=jd(r,e),c=h=>(h||[]).map(([d,f])=>{const p=Qa(d,f,r,e,a,t),m=s(p,d,"");return p.metres&&(m.metres=p.metres),f.sparse&&(m.sparse=f.sparse),m}),u={def:r,floor:{sp:Pr(o.sp,o.colours,e,"none",i),kind:r.floor[0],text:r.text.floor},walls:c(r.wall),small:c(r.small),big:c(r.big),setPiece:null};if(u.walls.forEach(h=>h.text=r.text.wall),u.small.forEach(h=>h.text=r.text.small),u.big.forEach(h=>h.text=r.text.big),r.set){const h=ef(r.set[0],r.set[1],r,e,a,t);u.setPiece={...s(h,r.set[0],r.text.set),metres:h.metres,origin:h.origin}}return u}function nf(n,e){const t=new Map,i=new Map,r=(c,u,h)=>(c*2097152+(u+1048576))*2097152+(h+1048576),a=(c,u,h)=>{const d=r(c,u,h);let f=t.get(d);if(!f){const p=Math.pow(2,-c);f=[p*(u+Tt(u*7+c,h,n)),p*(h+Tt(u,h*13+c,n+1))],t.set(d,f)}return f},s=(c,u,h)=>{const d=Math.pow(2,-c),f=Math.floor(u/d),p=Math.floor(h/d);let m=f,x=p,_=1/0;for(let g=-2;g<=2;g++)for(let M=-2;M<=2;M++){const E=a(c,f+g,p+M),b=(E[0]-u)**2+(E[1]-h)**2;b<_&&(_=b,m=f+g,x=p+M)}return[m,x]},o=(c,u,h)=>{const d=r(c,u,h);let f=i.get(d);if(f)return f;if(c===0)f=[u,h];else{const p=a(c,u,h),m=s(c-1,p[0],p[1]);f=o(c-1,m[0],m[1])}return i.set(d,f),f};return{seed:n,depth:e,site:(c,u)=>a(0,c,u),partition(c,u){const h=s(e,c,u);return o(e,h[0],h[1])},centreness(c,u,h){const d=a(0,h[0],h[1]),f=Math.hypot(c-d[0],u-d[1]);let p=1/0;const m=Math.floor(c),x=Math.floor(u);for(let _=-2;_<=2;_++)for(let g=-2;g<=2;g++){const M=m+_,E=x+g;if(M===h[0]&&E===h[1])continue;const b=a(0,M,E);p=Math.min(p,Math.hypot(c-b[0],u-b[1]))}return Math.min(1,2*f/(f+p))},openness(c,u){let h=1/0,d=1/0;const f=Math.floor(c),p=Math.floor(u);for(let m=-2;m<=2;m++)for(let x=-2;x<=2;x++){const _=a(0,f+m,p+x),g=Math.hypot(c-_[0],u-_[1]);g<h?(d=h,h=g):g<d&&(d=g)}return Math.min(1,2*h/(h+d))}}}const rf=xh.types,ii=pa.map(n=>({id:n.id,name:n.name,creature:n.creature,text:n.text,setPiece:n.set?n.text.set??"a set piece":"",hasWalls:!!n.wall?.length,floor:[n.floor[1],n.floor[2],n.floor[3]],treeDensity:rf[n.id]?.treeDensity??1})),Ar=(n,e)=>n+","+e;function af(n){if(n==null||n.trim()==="")return null;const e=n.trim();if(/^\d{1,9}$/.test(e))return Number(e);let t=2166136261;for(let i=0;i<e.length;i++)t=Math.imul(t^e.charCodeAt(i),16777619);return(t>>>0)%1e9}function sf(n,e,t,i){const r=new Map,a=(c,u)=>{if(c[0]===u[0]&&c[1]===u[1])return;const h=Ar(c[0],c[1]),d=Ar(u[0],u[1]);r.has(h)||r.set(h,new Set),r.has(d)||r.set(d,new Set),r.get(h).add(d),r.get(d).add(h)},s=(t-e)*i;let o=[];for(let c=0;c<=s;c++){const u=[];for(let h=0;h<=s;h++){const d=n.partition(e+h/i,e+c/i);u.push(d),h>0&&a(d,u[h-1]),c>0&&a(d,o[h])}o=u}return r}function of(n,e){const t=e.mapAreas,i=2,r=e.areaSize*e.areaScale,a=ii.length,s=3,o=Math.max(0,Math.min(1,e.areaSizeVariance))*s*.3,c=(U,I)=>{const B=U/r,V=I/r;return[B+o*(Ol(B/s,V/s,n+91)-.5)*2,V+o*(Ol(B/s,V/s,n+92)-.5)*2]},u=(U,I)=>{let B=U*r,V=I*r;for(let $=0;$<30;$++){const[ae,q]=c(B,V);B+=(U-ae)*r,V+=(I-q)*r}return[B,V]},h=nf(n,e.borderLayers),d=-i,f=t+i,p=sf(h,d,f,6),m=new Map,x=oa(n*5+1);for(let U=d;U<f;U++)for(let I=d;I<f;I++){const B=new Set;for(let ae=-2;ae<=2;ae++)for(let q=-2;q<=2;q++){const ee=m.get(Ar(I+q,U+ae));ee!==void 0&&B.add(ee)}for(const ae of p.get(Ar(I,U))??[]){const q=m.get(ae);q!==void 0&&B.add(q)}const V=[...Array(a).keys()].filter(ae=>!B.has(ae)),$=V.length?V:[...Array(a).keys()];m.set(Ar(I,U),$[Math.floor(x()*$.length)])}const _=(U,I)=>m.get(Ar(U,I))??Math.floor(Tt(U,I,n+17)*a),g=Math.floor(t/2),M=(U,I)=>{const B=h.site(U,I),V=h.partition(B[0],B[1]);return V[0]===U&&V[1]===I};let E=[g,g];for(const[U,I]of[[0,0],[1,0],[0,1],[-1,0],[0,-1],[1,1],[-1,1],[1,-1],[-1,-1]])if(M(g+U,g+I)){E=[g+U,g+I];break}const b=(U,I)=>{const B=h.site(U,I),V=u(B[0],B[1]);return{x:V[0],z:V[1]}},R=b(E[0],E[1]),w=(U,I)=>{const[B,V]=c(U,I),$=h.partition(B,V);return{cell:$,type:_($[0],$[1]),openness:h.openness(B,V)}},D=4.5,S=D*2.2,y=(U,I)=>{if(Math.hypot(U-R.x,I-R.z)<S)return 0;const[B,V]=c(U,I);return Fr((h.openness(B,V)-e.clearingSize)/Math.max(.01,e.clearingFalloff))*e.treeDensity},L=(U,I)=>{const B=ii[_(U,I)];return B.setPiece&&Tt(U,I,n+61)<e.setPieceChance?B.setPiece:null},C=(U,I)=>Math.min(1,Math.hypot(U-E[0],I-E[1])/(t/2)),N=r*.5;return{seed:n,tuning:e,n:t,margin:i,areaSize:r,partition:h,centreCell:E,dancefloor:{x:R.x,z:R.z,radius:D},start:{x:R.x,z:R.z+2},bounds:{minX:N,maxX:t*r-N,minZ:N,maxZ:t*r-N},extent:{minX:d*r,maxX:f*r,minZ:d*r,maxZ:f*r},typeOf:_,areaAt:w,siteOf:b,treeWeight:y,neighbours:p,setPieceOf:L,remoteness:C}}function lf(n,e,t=.5){const i=n.tuning,r=tr(e,0,1),a=Math.round(Zn(i.creaturesNear,i.creaturesFar,Math.pow(r,i.creatureCurve))+(t-.5)*2),s=Math.min(Math.max(0,a),Math.round(i.legendsFar*Fr((r-i.legendsFrom)/Math.max(.01,1-i.legendsFrom))+(t-.5)*.8)),o=Math.round(Math.max(0,a-s)*i.youngShareFar*r);return{babies:Math.max(0,a-s-o),young:o,legends:s}}const cf=(n,e,t=0)=>(n.tuning.clearingSize+n.tuning.clearingFalloff*.3)*n.areaSize*.5*(e===2?.55:.8)*(1+t);function uf(n){const e=[],t=n.tuning;let i=0;const[r,a]=n.centreCell;for(let s=0;s<n.n;s++)for(let o=0;o<n.n;o++){if(o===r&&s===a)continue;const c=oa(n.seed*7919+o*131+s*977+3),u=ii[n.typeOf(o,s)],h=n.siteOf(o,s),d=n.remoteness(o,s),f=lf(n,d,Tt(o,s,n.seed+43)),p=x=>{const _=cf(n,x,d),g=c()*Math.PI*2,M=Math.sqrt(c())*_,E=h.x+Math.cos(g)*M,b=h.z+Math.sin(g)*M;return{id:i++,species:u.creature,cell:[o,s],level:x,homeX:h.x,homeZ:h.z,range:_,x:E,z:b,tx:E,tz:b,rest:c()*3,speed:(x===2?t.legendSpeed:t.creatureSpeed)*(.7+c()*.6),facing:c()<.5?1:-1,moving:!1,walk:c(),rand:oa(n.seed*31+i*7+11)}};for(let x=0;x<f.babies;x++)e.push(p(0));for(let x=0;x<f.young;x++)e.push(p(1));const m=o===r+1&&s===a?Math.max(1,f.legends):f.legends;for(let x=0;x<m;x++)e.push(p(2))}return e}function hf(n,e){if(n.rest>0){n.rest-=e,n.moving=!1;return}const t=n.tx-n.x,i=n.tz-n.z,r=Math.hypot(t,i);if(r<.05){const s=n.rand()*Math.PI*2,o=Math.sqrt(n.rand())*n.range;n.tx=n.homeX+Math.cos(s)*o,n.tz=n.homeZ+Math.sin(s)*o,n.rest=.8+n.rand()*3.5,n.moving=!1;return}const a=Math.min(r,n.speed*e);n.x+=t/r*a,n.z+=i/r*a,Math.abs(t)>.02&&(n.facing=t>0?1:-1),n.moving=!0,n.walk+=e*(n.level===2?1.5:4)}function df(n,e,t,i,r){for(const a of n)Math.abs(a.homeX-e)<i&&Math.abs(a.homeZ-t)<i&&hf(a,r)}const hu=6,ff=4,an=32;function pf(n){const e=n.tuning.camera.treetop.angleIn*Math.PI/180;return n.tuning.crownHeight/Math.sin(e)}function mf(n,e,t){const{treeSpacingX:i,treeSpacingZ:r}=n.tuning,a=n.seed,s=[],o=pf(n),c=n.tuning.crownHalfWidth,u=Math.ceil(t*an/r),h=Math.ceil((t+1)*an/r);for(let d=u;d<h;d++){const f=d&1?.5:0,p=Math.ceil(e*an/i-f),m=Math.ceil((e+1)*an/i-f);for(let x=p;x<m;x++){const _=(x+f+(Tt(x,d,a+101)-.5)*.7)*i,g=(d+(Tt(x,d,a+102)-.5)*.7)*r,M=n.areaAt(_,g);Tt(x,d,a+103)>=n.treeWeight(_,g)*ii[M.type].treeDensity||n.treeWeight(_,g-o)===0||n.treeWeight(_-c,g-o)===0||n.treeWeight(_+c,g-o)===0||s.push({x:_,z:g,type:M.type,variant:Math.floor(Tt(x,d,a+104)*hu),flip:Tt(x,d,a+105)<.5})}}return s}function gf(n,e,t){const i=n.tuning.bushSpacing,r=n.seed,a=[],s=Math.ceil(t*an/i),o=Math.ceil((t+1)*an/i),c=Math.ceil(e*an/i),u=Math.ceil((e+1)*an/i);for(let h=s;h<o;h++)for(let d=c;d<u;d++){const f=(d+(Tt(d,h,r+201)-.5)*.9)*i,p=(h+(Tt(d,h,r+202)-.5)*.9)*i;Tt(d,h,r+203)>(.12+Math.min(1,n.treeWeight(f,p))*.3)*n.tuning.bushDensity||a.push({x:f,z:p,type:n.areaAt(f,p).type,variant:Math.floor(Tt(d,h,r+204)*ff),flip:Tt(d,h,r+205)<.5})}return a}function _f(n,e,t){const i=n.tuning.wallSpacing,r=n.seed,a=[],s=Math.ceil(t*an/i),o=Math.ceil((t+1)*an/i),c=Math.ceil(e*an/i),u=Math.ceil((e+1)*an/i);for(let h=s;h<o;h++)for(let d=c;d<u;d++){if(Tt(d,h,r+303)>n.tuning.wallDensity)continue;const f=(d+(Tt(d,h,r+301)-.5)*.6)*i,p=(h+(Tt(d,h,r+302)-.5)*.6)*i,m=n.areaAt(f,p);m.openness<.82||!ii[m.type].hasWalls||a.push({x:f,z:p,type:m.type,variant:Math.floor(Tt(d,h,r+304)*4),flip:Tt(d,h,r+305)<.5})}return a}class xf{constructor(e){this.map=e}map;trees=new Map;bushes=new Map;walls=new Map;chunks(e,t,i){const r=[];for(let a=Math.floor((t-i)/an);a<=Math.floor((t+i)/an);a++)for(let s=Math.floor((e-i)/an);s<=Math.floor((e+i)/an);s++)r.push([s,a]);return r}gather(e,t,i,r,a){e.size>600&&e.clear();const s=[];for(const[o,c]of this.chunks(i,r,a)){const u=o+","+c;let h=e.get(u);h||(h=t(o,c),e.set(u,h));for(const d of h)Math.abs(d.x-i)<=a&&Math.abs(d.z-r)<=a&&s.push(d)}return s}treesNear(e,t,i){return this.gather(this.trees,(r,a)=>mf(this.map,r,a),e,t,i)}bushesNear(e,t,i){return this.gather(this.bushes,(r,a)=>gf(this.map,r,a),e,t,i)}wallsNear(e,t,i){return this.gather(this.walls,(r,a)=>_f(this.map,r,a),e,t,i)}setPiecesNear(e,t,i){const r=this.map,a=r.areaSize,s=[];for(let o=Math.floor((t-i)/a)-1;o<=Math.floor((t+i)/a)+1;o++)for(let c=Math.floor((e-i)/a)-1;c<=Math.floor((e+i)/a)+1;c++){if(c===r.centreCell[0]&&o===r.centreCell[1]||!r.setPieceOf(c,o))continue;const u=r.siteOf(c,o);Math.abs(u.x-e)<=i&&Math.abs(u.z-4-t)<=i&&s.push({x:u.x,z:u.z-4,type:r.typeOf(c,o),variant:0,flip:Tt(c,o,r.seed+71)<.5})}return s}}function Mf(n,e){return{x:n,z:e,vx:0,vz:0,lift:0,mode:"ground",facing:1}}const hl=(n,e)=>Zn(e.groundHeight,e.treetopHeight,Fr(n.lift)),Ts=n=>Fr(n.lift);function vf(n,e,t,i,r){let{mode:a,lift:s}=n;e.toggleMode&&(a=a==="ground"||a==="descending"?"rising":"descending"),a==="rising"?(s+=t/Math.max(.001,i.riseTime),s>=1&&(s=1,a="treetop")):a==="descending"&&(s-=t/Math.max(.001,i.descendTime),s<=0&&(s=0,a="ground"));let o=e.moveX,c=e.moveZ;const u=Math.hypot(o,c);u>1&&(o/=u,c/=u);const h=Zn(i.groundSpeed,i.treetopSpeed,Fr(s)),d=1-Math.exp(-i.acceleration*t);let f=n.vx+(o*h-n.vx)*d,p=n.vz+(c*h-n.vz)*d,m=n.x+f*t,x=n.z+p*t;(m<r.minX||m>r.maxX)&&(m=tr(m,r.minX,r.maxX),f=0),(x<r.minZ||x>r.maxZ)&&(x=tr(x,r.minZ,r.maxZ),p=0);const _=f>.3?1:f<-.3?-1:n.facing;return{x:m,z:x,vx:f,vz:p,lift:s,mode:a,facing:_}}function Sf(n,e){const t=of(n,e),i=Mf(t.start.x,t.start.z);return{seed:n,tuning:e,map:t,forest:new xf(t),creatures:uf(t),clock:mh(),witch:i,camera:hh(e,i.x,hl(i,e),i.z)}}function bf(n,e,t){const i=gh(n.clock,t);i!==0&&(n.witch=vf(n.witch,e,i,n.tuning,n.map.bounds),n.camera=dh(n.camera,e.zoom,{x:n.witch.x,y:hl(n.witch,n.tuning),z:n.witch.z},{x:n.witch.vx,z:n.witch.vz},n.witch.lift,i,n.tuning),df(n.creatures,n.witch.x,n.witch.z,n.tuning.creatureSimRadius,i))}const Ef=n=>fh(n.camera,n.camera.lift,n.tuning);function du(n){const e=n.map.areaAt(n.witch.x,n.witch.z),t=n.map.setPieceOf(e.cell[0],e.cell[1]);return ii[e.type].name+(t?` (set piece: ${t})`:"")}const yf="Witch tuning. Edit the numbers, push, and the playable link rebuilds. Distances are metres, times seconds, angles degrees. Keys starting with _ are notes.",wf="The forest: mapAreas x mapAreas areas cut by the fractal partition. An area is areaSize x areaScale metres across on average (areaScale 1.4 doubles the ground of the first 28 m areas; push it for bigger). areaSizeVariance (0-1) makes areas vary in size, some small, some large. borderLayers sets how wiggly borders are.",Af=20,Tf=28,Rf=1.4,Cf=.7,Lf=4,Df="treeDensity (0-1): the chance of a tree on each spot outside the clearings; clearingSize (0-1): how far out from an area's centre the ground stays fully open; clearingFalloff (0-1): over how much of the way to the border trees thicken, smoothly, to full density; trees sit on a staggered grid treeSpacingX by treeSpacingZ metres, so no two crowns pile up. A tree is left out where its crown (crownHalfWidth either side, crownHeight up) would hang over a clearing seen from the treetops.",Pf=.9,If=.1,Nf=.5,Uf=1,Of=5,Ff=3,Bf=4.5,kf=5,zf=3.4,Hf=4,Gf=.6,Vf="Speeds per mode, and how long rising and descending take.",Wf=14,Yf=32,Xf=10,Kf=.7,qf=.55,Zf=1.4,$f=11,Jf="Near-isometric on the ground, after Transistor; lower over the treetops, looking toward the horizon to feel the speed. The camera follows the witch on a soft spring (follow: its stiffness; higher keeps her closer to the middle) and looks a little ahead of her: lookAhead seconds of flight, at most lookAheadMax metres, eased in at lookAheadEase. zoomEase and liftEase: how softly zoom and rising change the angle and distance. a narrow field of view (fov, degrees) seen from far off, so there is little perspective. Each mode has its own angle (degrees below horizontal) and distance from the witch, at zoomed-in and zoomed-out. Zoom moves between them in zoomSteps steps.",Qf={fov:20,ground:{angleIn:38,angleOut:46,distanceIn:42,distanceOut:84},treetop:{angleIn:32,angleOut:36,distanceIn:70,distanceOut:120},lookAhead:.1,lookAheadMax:3,lookAheadEase:1.5,zoomEase:5,liftEase:8,zoomSteps:4,startZoom:1,follow:8},jf="Everything the camera can see is drawn, plus viewMargin metres round the view, so nothing appears or vanishes on screen. haze: the twilight haze fades the forest from near to far metres from the witch; nothing is drawn beyond far. pixelSize: screen pixels per art pixel. glowReach: metres the witch's light reaches. spriteTilt: 1 = sprites face the camera fully, 0 = stand upright.",e0=3,t0=8,n0=1,i0=1,r0=16,a0=12,s0={near:90,far:220},o0="bloom: a gentle glow round bright things (strength 0 or on false turns it off; threshold: how bright a pixel must be to glow). tiltShift: blurs the top and bottom of the screen so the forest looks like a miniature. strength: the blur at the screen's edges, in pixels; band: the height of the sharp band (0-1 of the screen); centre: where it sits (0 top, 0.5 middle, 1 bottom); where: 'before' blurs at the low resolution, before the pixels are scaled up, 'after' blurs the scaled-up image. Add ?tilt=before, ?tilt=after or ?tilt=off to the link to compare.",l0="shadows: a flat shadow under every tree (cast away from the moon), bush and creature. canopyShadow: a dappled shadow from the canopy overhead (height in metres), thinner in clearings, drifting with the wind. mist: a low drifting mist (height in metres above the ground). Each has on and strength.",c0={on:!0,strength:.7},u0={on:!0,strength:.45,height:8,cover:.55,wind:.6},h0={on:!0,strength:.12,height:3,wind:.8},d0={on:!0,strength:.7,threshold:.55},f0={on:!0,where:"before",strength:3,band:.4,centre:.55},p0="Creatures grow more numerous and older with an area's distance from home (0 at the dancefloor, 1 at the map's edge): creaturesNear in the areas round home, creaturesFar at the edge (creatureCurve shapes the rise), youngShareFar of them young at the edge, and legendsFar legends from legendsFrom outward. Only creatures within creatureSimRadius metres of the witch move.",m0=2,g0=20,_0=1.3,x0=.5,M0=2,v0=.55,S0=110,b0=.6,E0="setPieceChance: the share of areas, among the types that have a set piece, that show theirs. Wall objects (an area type's edges: puddles, henges, hedges) stand where areas meet, one per wallSpacing metres with chance wallDensity; they do not block movement.",y0=.25,w0=.35,A0={_readme:yf,_map:wf,mapAreas:Af,areaSize:Tf,areaScale:Rf,areaSizeVariance:Cf,borderLayers:Lf,_trees:Df,treeDensity:Pf,clearingSize:If,clearingFalloff:Nf,bushDensity:Uf,treeSpacingX:Of,treeSpacingZ:Ff,crownHalfWidth:Bf,crownHeight:kf,bushSpacing:zf,wallSpacing:Hf,wallDensity:Gf,_witch:Vf,groundSpeed:Wf,treetopSpeed:Yf,acceleration:Xf,riseTime:Kf,descendTime:qf,groundHeight:Zf,treetopHeight:$f,_camera:Jf,camera:Qf,_look:jf,pixelSize:e0,glowReach:t0,glowHeight:n0,spriteTilt:i0,artPixelsPerMetre:r0,viewMargin:a0,haze:s0,_post:o0,_shadows:l0,shadows:c0,canopyShadow:u0,mist:h0,bloom:d0,tiltShift:f0,_creatures:p0,creaturesNear:m0,creaturesFar:g0,creatureCurve:_0,youngShareFar:x0,legendsFar:M0,legendsFrom:v0,creatureSimRadius:S0,creatureSpeed:b0,_setPieces:E0,setPieceChance:y0,legendSpeed:w0},cr=A0;class T0{keys=new Set;pressed=new Set;padPrev=[];touch={x:0,y:0,toggle:!1,zoom:0,debug:!1};onAny=null;constructor(e=window){e.addEventListener("keydown",t=>{if(t.repeat){this.isGameKey(t.code)&&t.preventDefault();return}this.keys.add(t.code),this.isGameKey(t.code)&&t.preventDefault(),this.onAny?.()||this.pressed.add(t.code)}),e.addEventListener("keyup",t=>this.keys.delete(t.code)),e.addEventListener("blur",()=>this.keys.clear())}isGameKey(e){return/^(Arrow|Space$|Key[WASDQE]$|Minus$|Equal$|NumpadAdd$|NumpadSubtract$|Backquote$)/.test(e)}clearPresses(){this.pressed.clear();const e=this.touch;e.toggle=!1,e.zoom=0,e.debug=!1}read(){const e=d=>this.keys.has(d)?1:0,t=d=>this.pressed.has(d);let i=e("KeyD")+e("ArrowRight")-e("KeyA")-e("ArrowLeft"),r=e("KeyS")+e("ArrowDown")-e("KeyW")-e("ArrowUp"),a=t("Space"),s=(t("KeyQ")||t("Minus")||t("NumpadSubtract")?1:0)-(t("KeyE")||t("Equal")||t("NumpadAdd")?1:0),o=t("Backquote");this.pressed.clear();const c=typeof navigator<"u"&&navigator.getGamepads?navigator.getGamepads():[];for(const d of c){if(!d)continue;const f=b=>!!d.buttons[b]?.pressed,m=d.buttons.some((b,R)=>b.pressed&&!this.padPrev[R])&&!!this.onAny?.(),x=b=>!m&&f(b)&&!this.padPrev[b];let _=d.axes[0]??0,g=d.axes[1]??0;const M=Math.hypot(_,g),E=.18;if(M<E)_=0,g=0;else{const b=(Math.min(1,M)-E)/(1-E)/M;_*=b,g*=b}_+=(f(15)?1:0)-(f(14)?1:0),g+=(f(13)?1:0)-(f(12)?1:0),i+=_,r+=g,x(0)&&(a=!0),(x(4)||x(6))&&(s+=1),(x(5)||x(7))&&(s-=1),x(8)&&(o=!0),this.padPrev=d.buttons.map(b=>b.pressed);break}const u=this.touch;i+=u.x,r+=u.y,u.toggle&&(a=!0),s+=u.zoom,u.debug&&(o=!0),u.toggle=!1,u.zoom=0,u.debug=!1;const h=Math.hypot(i,r);return h>1&&(i/=h,r/=h),{moveX:i,moveZ:r,toggleMode:a,zoom:Math.sign(s),debug:o}}}const dl="186",R0=0,Yl=1,C0=2,ja=1,L0=2,ta=3,nr=0,gn=1,gi=2,Si=0,sa=1,Xl=2,Kl=3,ql=4,D0=5,yr=100,P0=101,I0=102,N0=103,U0=104,O0=200,F0=201,B0=202,k0=203,fu=204,pu=205,z0=206,H0=207,G0=208,V0=209,W0=210,Y0=211,X0=212,K0=213,q0=214,ho=0,fo=1,po=2,la=3,mo=4,go=5,_o=6,xo=7,mu=0,Z0=1,$0=2,ti=0,gu=1,_u=2,xu=3,Mu=4,vu=5,Su=6,bu=7,Eu=300,ir=301,Nr=302,Rs=303,Cs=304,gs=306,Mo=1e3,_i=1001,vo=1002,Wt=1003,J0=1004,Ea=1005,zt=1006,Ls=1007,Qi=1008,vn=1009,yu=1010,wu=1011,ca=1012,fl=1013,ri=1014,jn=1015,ai=1016,pl=1017,ml=1018,ua=1020,Au=35902,Tu=35899,Ru=1021,Cu=1022,Rn=1023,wi=1026,ji=1027,Lu=1028,gl=1029,rr=1030,_l=1031,xl=1033,es=33776,ts=33777,ns=33778,is=33779,So=35840,bo=35841,Eo=35842,yo=35843,wo=36196,Ao=37492,To=37496,Ro=37488,Co=37489,os=37490,Lo=37491,Do=37808,Po=37809,Io=37810,No=37811,Uo=37812,Oo=37813,Fo=37814,Bo=37815,ko=37816,zo=37817,Ho=37818,Go=37819,Vo=37820,Wo=37821,Yo=36492,Xo=36494,Ko=36495,qo=36283,Zo=36284,ls=36285,$o=36286,Q0=3200,Zl=0,j0=1,On="",wn="srgb",ha="srgb-linear",cs="linear",gt="srgb",Ds=7680,ep=519,tp=512,np=513,ip=514,Ml=515,rp=516,ap=517,vl=518,sp=519,op=35044,Du=35048,$l="300 es",ei=2e3,us=2001;function lp(n){for(let e=n.length-1;e>=0;--e)if(n[e]>=65535)return!0;return!1}function hs(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function cp(){const n=hs("canvas");return n.style.display="block",n}const Jl={};function Ql(...n){const e="THREE."+n.shift();console.log(e,...n)}function Pu(n){const e=n[0];if(typeof e=="string"&&e.startsWith("TSL:")){const t=n[1];t&&t.isStackTrace?n[0]+=" "+t.getLocation():n[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return n}function Ge(...n){n=Pu(n);const e="THREE."+n.shift();{const t=n[0];t&&t.isStackTrace?console.warn(t.getError(e)):console.warn(e,...n)}}function st(...n){n=Pu(n);const e="THREE."+n.shift();{const t=n[0];t&&t.isStackTrace?console.error(t.getError(e)):console.error(e,...n)}}function Lr(...n){const e=n.join(" ");e in Jl||(Jl[e]=!0,Ge(...n))}function up(n,e,t){return new Promise(function(i,r){function a(){switch(n.clientWaitSync(e,n.SYNC_FLUSH_COMMANDS_BIT,0)){case n.WAIT_FAILED:r();break;case n.TIMEOUT_EXPIRED:setTimeout(a,t);break;default:i()}}setTimeout(a,t)})}const hp={[ho]:fo,[po]:_o,[mo]:xo,[la]:go,[fo]:ho,[_o]:po,[xo]:mo,[go]:la};class sr{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(t)===-1&&i[e].push(t)}hasEventListener(e,t){const i=this._listeners;return i===void 0?!1:i[e]!==void 0&&i[e].indexOf(t)!==-1}removeEventListener(e,t){const i=this._listeners;if(i===void 0)return;const r=i[e];if(r!==void 0){const a=r.indexOf(t);a!==-1&&r.splice(a,1)}}dispatchEvent(e){const t=this._listeners;if(t===void 0)return;const i=t[e.type];if(i!==void 0){e.target=this;const r=i.slice(0);for(let a=0,s=r.length;a<s;a++)r[a].call(this,e);e.target=null}}}const tn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Ps=Math.PI/180,Jo=180/Math.PI;function ma(){const n=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(tn[n&255]+tn[n>>8&255]+tn[n>>16&255]+tn[n>>24&255]+"-"+tn[e&255]+tn[e>>8&255]+"-"+tn[e>>16&15|64]+tn[e>>24&255]+"-"+tn[t&63|128]+tn[t>>8&255]+"-"+tn[t>>16&255]+tn[t>>24&255]+tn[i&255]+tn[i>>8&255]+tn[i>>16&255]+tn[i>>24&255]).toLowerCase()}function it(n,e,t){return Math.max(e,Math.min(t,n))}function dp(n,e){return(n%e+e)%e}function Is(n,e,t){return(1-t)*n+t*e}function Yr(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:case Uint8ClampedArray:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function fn(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:case Uint8ClampedArray:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}class We{static{We.prototype.isVector2=!0}constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("THREE.Vector2: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,i=this.y,r=e.elements;return this.x=r[0]*t+r[3]*i+r[6],this.y=r[1]*t+r[4]*i+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=it(this.x,e.x,t.x),this.y=it(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=it(this.x,e,t),this.y=it(this.y,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(it(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(it(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y;return t*t+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const i=Math.cos(t),r=Math.sin(t),a=this.x-e.x,s=this.y-e.y;return this.x=a*i-s*r+e.x,this.y=a*r+s*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class kr{constructor(e=0,t=0,i=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=i,this._w=r}static slerpFlat(e,t,i,r,a,s,o){let c=i[r+0],u=i[r+1],h=i[r+2],d=i[r+3],f=a[s+0],p=a[s+1],m=a[s+2],x=a[s+3];if(d!==x||c!==f||u!==p||h!==m){let _=c*f+u*p+h*m+d*x;_<0&&(f=-f,p=-p,m=-m,x=-x,_=-_);let g=1-o;if(_<.9995){const M=Math.acos(_),E=Math.sin(M);g=Math.sin(g*M)/E,o=Math.sin(o*M)/E,c=c*g+f*o,u=u*g+p*o,h=h*g+m*o,d=d*g+x*o}else{c=c*g+f*o,u=u*g+p*o,h=h*g+m*o,d=d*g+x*o;const M=1/Math.sqrt(c*c+u*u+h*h+d*d);c*=M,u*=M,h*=M,d*=M}}e[t]=c,e[t+1]=u,e[t+2]=h,e[t+3]=d}static multiplyQuaternionsFlat(e,t,i,r,a,s){const o=i[r],c=i[r+1],u=i[r+2],h=i[r+3],d=a[s],f=a[s+1],p=a[s+2],m=a[s+3];return e[t]=o*m+h*d+c*p-u*f,e[t+1]=c*m+h*f+u*d-o*p,e[t+2]=u*m+h*p+o*f-c*d,e[t+3]=h*m-o*d-c*f-u*p,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,i,r){return this._x=e,this._y=t,this._z=i,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const i=e._x,r=e._y,a=e._z,s=e._order,o=Math.cos,c=Math.sin,u=o(i/2),h=o(r/2),d=o(a/2),f=c(i/2),p=c(r/2),m=c(a/2);switch(s){case"XYZ":this._x=f*h*d+u*p*m,this._y=u*p*d-f*h*m,this._z=u*h*m+f*p*d,this._w=u*h*d-f*p*m;break;case"YXZ":this._x=f*h*d+u*p*m,this._y=u*p*d-f*h*m,this._z=u*h*m-f*p*d,this._w=u*h*d+f*p*m;break;case"ZXY":this._x=f*h*d-u*p*m,this._y=u*p*d+f*h*m,this._z=u*h*m+f*p*d,this._w=u*h*d-f*p*m;break;case"ZYX":this._x=f*h*d-u*p*m,this._y=u*p*d+f*h*m,this._z=u*h*m-f*p*d,this._w=u*h*d+f*p*m;break;case"YZX":this._x=f*h*d+u*p*m,this._y=u*p*d+f*h*m,this._z=u*h*m-f*p*d,this._w=u*h*d-f*p*m;break;case"XZY":this._x=f*h*d-u*p*m,this._y=u*p*d-f*h*m,this._z=u*h*m+f*p*d,this._w=u*h*d+f*p*m;break;default:Ge("Quaternion: .setFromEuler() encountered an unknown order: "+s)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const i=t/2,r=Math.sin(i);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,i=t[0],r=t[4],a=t[8],s=t[1],o=t[5],c=t[9],u=t[2],h=t[6],d=t[10],f=i+o+d;if(f>0){const p=.5/Math.sqrt(f+1);this._w=.25/p,this._x=(h-c)*p,this._y=(a-u)*p,this._z=(s-r)*p}else if(i>o&&i>d){const p=2*Math.sqrt(1+i-o-d);this._w=(h-c)/p,this._x=.25*p,this._y=(r+s)/p,this._z=(a+u)/p}else if(o>d){const p=2*Math.sqrt(1+o-i-d);this._w=(a-u)/p,this._x=(r+s)/p,this._y=.25*p,this._z=(c+h)/p}else{const p=2*Math.sqrt(1+d-i-o);this._w=(s-r)/p,this._x=(a+u)/p,this._y=(c+h)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let i=e.dot(t)+1;return i<1e-8?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(it(this.dot(e),-1,1)))}rotateTowards(e,t){const i=this.angleTo(e);if(i===0)return this;const r=Math.min(1,t/i);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const i=e._x,r=e._y,a=e._z,s=e._w,o=t._x,c=t._y,u=t._z,h=t._w;return this._x=i*h+s*o+r*u-a*c,this._y=r*h+s*c+a*o-i*u,this._z=a*h+s*u+i*c-r*o,this._w=s*h-i*o-r*c-a*u,this._onChangeCallback(),this}slerp(e,t){let i=e._x,r=e._y,a=e._z,s=e._w,o=this.dot(e);o<0&&(i=-i,r=-r,a=-a,s=-s,o=-o);let c=1-t;if(o<.9995){const u=Math.acos(o),h=Math.sin(u);c=Math.sin(c*u)/h,t=Math.sin(t*u)/h,this._x=this._x*c+i*t,this._y=this._y*c+r*t,this._z=this._z*c+a*t,this._w=this._w*c+s*t,this._onChangeCallback()}else this._x=this._x*c+i*t,this._y=this._y*c+r*t,this._z=this._z*c+a*t,this._w=this._w*c+s*t,this.normalize();return this}slerpQuaternions(e,t,i){return this.copy(e).slerp(t,i)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),i=Math.random(),r=Math.sqrt(1-i),a=Math.sqrt(i);return this.set(r*Math.sin(e),r*Math.cos(e),a*Math.sin(t),a*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class Y{static{Y.prototype.isVector3=!0}constructor(e=0,t=0,i=0){this.x=e,this.y=t,this.z=i}set(e,t,i){return i===void 0&&(i=this.z),this.x=e,this.y=t,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("THREE.Vector3: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(jl.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(jl.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,i=this.y,r=this.z,a=e.elements;return this.x=a[0]*t+a[3]*i+a[6]*r,this.y=a[1]*t+a[4]*i+a[7]*r,this.z=a[2]*t+a[5]*i+a[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,i=this.y,r=this.z,a=e.elements,s=1/(a[3]*t+a[7]*i+a[11]*r+a[15]);return this.x=(a[0]*t+a[4]*i+a[8]*r+a[12])*s,this.y=(a[1]*t+a[5]*i+a[9]*r+a[13])*s,this.z=(a[2]*t+a[6]*i+a[10]*r+a[14])*s,this}applyQuaternion(e){const t=this.x,i=this.y,r=this.z,a=e.x,s=e.y,o=e.z,c=e.w,u=2*(s*r-o*i),h=2*(o*t-a*r),d=2*(a*i-s*t);return this.x=t+c*u+s*d-o*h,this.y=i+c*h+o*u-a*d,this.z=r+c*d+a*h-s*u,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,i=this.y,r=this.z,a=e.elements;return this.x=a[0]*t+a[4]*i+a[8]*r,this.y=a[1]*t+a[5]*i+a[9]*r,this.z=a[2]*t+a[6]*i+a[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=it(this.x,e.x,t.x),this.y=it(this.y,e.y,t.y),this.z=it(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=it(this.x,e,t),this.y=it(this.y,e,t),this.z=it(this.z,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(it(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const i=e.x,r=e.y,a=e.z,s=t.x,o=t.y,c=t.z;return this.x=r*c-a*o,this.y=a*s-i*c,this.z=i*o-r*s,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const i=e.dot(this)/t;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return Ns.copy(this).projectOnVector(e),this.sub(Ns)}reflect(e){return this.sub(Ns.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(it(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y,r=this.z-e.z;return t*t+i*i+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,i){const r=Math.sin(t)*e;return this.x=r*Math.sin(i),this.y=Math.cos(t)*e,this.z=r*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,i){return this.x=e*Math.sin(t),this.y=i,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=i,this.z=r,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,i=Math.sqrt(1-t*t);return this.x=i*Math.cos(e),this.y=t,this.z=i*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Ns=new Y,jl=new kr;class Ve{static{Ve.prototype.isMatrix3=!0}constructor(e,t,i,r,a,s,o,c,u){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,i,r,a,s,o,c,u)}set(e,t,i,r,a,s,o,c,u){const h=this.elements;return h[0]=e,h[1]=r,h[2]=o,h[3]=t,h[4]=a,h[5]=c,h[6]=i,h[7]=s,h[8]=u,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],this}extractBasis(e,t,i){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,r=t.elements,a=this.elements,s=i[0],o=i[3],c=i[6],u=i[1],h=i[4],d=i[7],f=i[2],p=i[5],m=i[8],x=r[0],_=r[3],g=r[6],M=r[1],E=r[4],b=r[7],R=r[2],w=r[5],D=r[8];return a[0]=s*x+o*M+c*R,a[3]=s*_+o*E+c*w,a[6]=s*g+o*b+c*D,a[1]=u*x+h*M+d*R,a[4]=u*_+h*E+d*w,a[7]=u*g+h*b+d*D,a[2]=f*x+p*M+m*R,a[5]=f*_+p*E+m*w,a[8]=f*g+p*b+m*D,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[1],r=e[2],a=e[3],s=e[4],o=e[5],c=e[6],u=e[7],h=e[8];return t*s*h-t*o*u-i*a*h+i*o*c+r*a*u-r*s*c}invert(){const e=this.elements,t=e[0],i=e[1],r=e[2],a=e[3],s=e[4],o=e[5],c=e[6],u=e[7],h=e[8],d=h*s-o*u,f=o*c-h*a,p=u*a-s*c,m=t*d+i*f+r*p;if(m===0)return this.set(0,0,0,0,0,0,0,0,0);const x=1/m;return e[0]=d*x,e[1]=(r*u-h*i)*x,e[2]=(o*i-r*s)*x,e[3]=f*x,e[4]=(h*t-r*c)*x,e[5]=(r*a-o*t)*x,e[6]=p*x,e[7]=(i*c-u*t)*x,e[8]=(s*t-i*a)*x,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,i,r,a,s,o){const c=Math.cos(a),u=Math.sin(a);return this.set(i*c,i*u,-i*(c*s+u*o)+s+e,-r*u,r*c,-r*(-u*s+c*o)+o+t,0,0,1),this}scale(e,t){return Lr("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(Us.makeScale(e,t)),this}rotate(e){return Lr("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(Us.makeRotation(-e)),this}translate(e,t){return Lr("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(Us.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,i,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,i=e.elements;for(let r=0;r<9;r++)if(t[r]!==i[r])return!1;return!0}fromArray(e,t=0){for(let i=0;i<9;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const Us=new Ve,ec=new Ve().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),tc=new Ve().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function fp(){const n={enabled:!0,workingColorSpace:ha,spaces:{},convert:function(r,a,s){return this.enabled===!1||a===s||!a||!s||(this.spaces[a].transfer===gt&&(r.r=bi(r.r),r.g=bi(r.g),r.b=bi(r.b)),this.spaces[a].primaries!==this.spaces[s].primaries&&(r.applyMatrix3(this.spaces[a].toXYZ),r.applyMatrix3(this.spaces[s].fromXYZ)),this.spaces[s].transfer===gt&&(r.r=Dr(r.r),r.g=Dr(r.g),r.b=Dr(r.b))),r},workingToColorSpace:function(r,a){return this.convert(r,this.workingColorSpace,a)},colorSpaceToWorking:function(r,a){return this.convert(r,a,this.workingColorSpace)},getPrimaries:function(r){return this.spaces[r].primaries},getTransfer:function(r){return r===On?cs:this.spaces[r].transfer},getToneMappingMode:function(r){return this.spaces[r].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(r,a=this.workingColorSpace){return r.fromArray(this.spaces[a].luminanceCoefficients)},define:function(r){Object.assign(this.spaces,r)},_getMatrix:function(r,a,s){return r.copy(this.spaces[a].toXYZ).multiply(this.spaces[s].fromXYZ)},_getDrawingBufferColorSpace:function(r){return this.spaces[r].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(r=this.workingColorSpace){return this.spaces[r].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(r,a){return Lr("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),n.workingToColorSpace(r,a)},toWorkingColorSpace:function(r,a){return Lr("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),n.colorSpaceToWorking(r,a)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],i=[.3127,.329];return n.define({[ha]:{primaries:e,whitePoint:i,transfer:cs,toXYZ:ec,fromXYZ:tc,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:wn},outputColorSpaceConfig:{drawingBufferColorSpace:wn}},[wn]:{primaries:e,whitePoint:i,transfer:gt,toXYZ:ec,fromXYZ:tc,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:wn}}}),n}const nt=fp();function bi(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function Dr(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}let ur;class pp{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let i;if(e instanceof HTMLCanvasElement)i=e;else{ur===void 0&&(ur=hs("canvas")),ur.width=e.width,ur.height=e.height;const r=ur.getContext("2d");e instanceof ImageData?r.putImageData(e,0,0):r.drawImage(e,0,0,e.width,e.height),i=ur}return i.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=hs("canvas");t.width=e.width,t.height=e.height;const i=t.getContext("2d");i.drawImage(e,0,0,e.width,e.height);const r=i.getImageData(0,0,e.width,e.height),a=r.data;for(let s=0;s<a.length;s++)a[s]=bi(a[s]/255)*255;return i.putImageData(r,0,0),t}else if(e.data){const t=e.data.slice(0);for(let i=0;i<t.length;i++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[i]=Math.floor(bi(t[i]/255)*255):t[i]=bi(t[i]);return{data:t,width:e.width,height:e.height}}else return Ge("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let mp=0;class Sl{constructor(e=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:mp++}),this.uuid=ma(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<"u"&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const i={uuid:this.uuid,url:""},r=this.data;if(r!==null){let a;if(Array.isArray(r)){a=[];for(let s=0,o=r.length;s<o;s++)r[s].isDataTexture?a.push(Os(r[s].image)):a.push(Os(r[s]))}else a=Os(r);i.url=a}return t||(e.images[this.uuid]=i),i}}function Os(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?pp.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(Ge("Texture: Unable to serialize Texture."),{})}let gp=0;const Fs=new Y;class hn extends sr{constructor(e=hn.DEFAULT_IMAGE,t=hn.DEFAULT_MAPPING,i=_i,r=_i,a=zt,s=Qi,o=Rn,c=vn,u=hn.DEFAULT_ANISOTROPY,h=On){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:gp++}),this.uuid=ma(),this.name="",this.source=new Sl(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=i,this.wrapT=r,this.magFilter=a,this.minFilter=s,this.anisotropy=u,this.format=o,this.internalFormat=null,this.type=c,this.offset=new We(0,0),this.repeat=new We(1,1),this.center=new We(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ve,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(Fs).x}get height(){return this.source.getSize(Fs).y}get depth(){return this.source.getSize(Fs).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const t in e){const i=e[t];if(i===void 0){Ge(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}const r=this[t];if(r===void 0){Ge(`Texture.setValues(): property '${t}' does not exist.`);continue}r&&i&&r.isVector2&&i.isVector2||r&&i&&r.isVector3&&i.isVector3||r&&i&&r.isMatrix3&&i.isMatrix3?r.copy(i):this[t]=i}}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const i={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),t||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Eu)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Mo:e.x=e.x-Math.floor(e.x);break;case _i:e.x=e.x<0?0:1;break;case vo:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Mo:e.y=e.y-Math.floor(e.y);break;case _i:e.y=e.y<0?0:1;break;case vo:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}hn.DEFAULT_IMAGE=null;hn.DEFAULT_MAPPING=Eu;hn.DEFAULT_ANISOTROPY=1;class Dt{static{Dt.prototype.isVector4=!0}constructor(e=0,t=0,i=0,r=1){this.x=e,this.y=t,this.z=i,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,i,r){return this.x=e,this.y=t,this.z=i,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("THREE.Vector4: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,i=this.y,r=this.z,a=this.w,s=e.elements;return this.x=s[0]*t+s[4]*i+s[8]*r+s[12]*a,this.y=s[1]*t+s[5]*i+s[9]*r+s[13]*a,this.z=s[2]*t+s[6]*i+s[10]*r+s[14]*a,this.w=s[3]*t+s[7]*i+s[11]*r+s[15]*a,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,i,r,a;const c=e.elements,u=c[0],h=c[4],d=c[8],f=c[1],p=c[5],m=c[9],x=c[2],_=c[6],g=c[10];if(Math.abs(h-f)<.01&&Math.abs(d-x)<.01&&Math.abs(m-_)<.01){if(Math.abs(h+f)<.1&&Math.abs(d+x)<.1&&Math.abs(m+_)<.1&&Math.abs(u+p+g-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const E=(u+1)/2,b=(p+1)/2,R=(g+1)/2,w=(h+f)/4,D=(d+x)/4,S=(m+_)/4;return E>b&&E>R?E<.01?(i=0,r=.707106781,a=.707106781):(i=Math.sqrt(E),r=w/i,a=D/i):b>R?b<.01?(i=.707106781,r=0,a=.707106781):(r=Math.sqrt(b),i=w/r,a=S/r):R<.01?(i=.707106781,r=.707106781,a=0):(a=Math.sqrt(R),i=D/a,r=S/a),this.set(i,r,a,t),this}let M=Math.sqrt((_-m)*(_-m)+(d-x)*(d-x)+(f-h)*(f-h));return Math.abs(M)<.001&&(M=1),this.x=(_-m)/M,this.y=(d-x)/M,this.z=(f-h)/M,this.w=Math.acos((u+p+g-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=it(this.x,e.x,t.x),this.y=it(this.y,e.y,t.y),this.z=it(this.z,e.z,t.z),this.w=it(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=it(this.x,e,t),this.y=it(this.y,e,t),this.z=it(this.z,e,t),this.w=it(this.w,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(it(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this.w=e.w+(t.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class _p extends sr{constructor(e=1,t=1,i={}){super(),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:zt,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},i),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=i.depth,this.scissor=new Dt(0,0,e,t),this.scissorTest=!1,this.viewport=new Dt(0,0,e,t),this.textures=[];const r={width:e,height:t,depth:i.depth},a=new hn(r),s=i.count;for(let o=0;o<s;o++)this.textures[o]=a.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(i),this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveColorBuffer=i.resolveColorBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this.storeMultisampledColorBuffer=i.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=i.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=i.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=i.depthTexture,this.samples=i.samples,this.multiview=i.multiview,this.useArrayDepthTexture=i.useArrayDepthTexture}_setTextureOptions(e={}){const t={minFilter:zt,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let i=0;i<this.textures.length;i++)this.textures[i].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),e!==null&&e.renderTarget===null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,i=1){if(this.width!==e||this.height!==t||this.depth!==i){this.width=e,this.height=t,this.depth=i;for(let r=0,a=this.textures.length;r<a;r++)this.textures[r].image.width=e,this.textures[r].image.height=t,this.textures[r].image.depth=i,this.textures[r].isData3DTexture!==!0&&(this.textures[r].isArrayTexture=this.textures[r].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,i=e.textures.length;t<i;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;const r=Object.assign({},e.textures[t].image);this.textures[t].source=new Sl(r)}if(this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveColorBuffer=e.resolveColorBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,this.storeMultisampledColorBuffer=e.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=e.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=e.storeMultisampledStencilBuffer,e.depthTexture!==null)if(e.depthTexture.renderTarget===e){const t=e.depthTexture.clone();t.renderTarget=null,this.depthTexture=t}else this.depthTexture=e.depthTexture;return this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Cn extends _p{constructor(e=1,t=1,i={}){super(e,t,i),this.isWebGLRenderTarget=!0}}class Iu extends hn{constructor(e=null,t=1,i=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:i,depth:r},this.magFilter=Wt,this.minFilter=Wt,this.wrapR=_i,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class xp extends hn{constructor(e=null,t=1,i=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:i,depth:r},this.magFilter=Wt,this.minFilter=Wt,this.wrapR=_i,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}}class Ft{static{Ft.prototype.isMatrix4=!0}constructor(e,t,i,r,a,s,o,c,u,h,d,f,p,m,x,_){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,i,r,a,s,o,c,u,h,d,f,p,m,x,_)}set(e,t,i,r,a,s,o,c,u,h,d,f,p,m,x,_){const g=this.elements;return g[0]=e,g[4]=t,g[8]=i,g[12]=r,g[1]=a,g[5]=s,g[9]=o,g[13]=c,g[2]=u,g[6]=h,g[10]=d,g[14]=f,g[3]=p,g[7]=m,g[11]=x,g[15]=_,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Ft().fromArray(this.elements)}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],t[9]=i[9],t[10]=i[10],t[11]=i[11],t[12]=i[12],t[13]=i[13],t[14]=i[14],t[15]=i[15],this}copyPosition(e){const t=this.elements,i=e.elements;return t[12]=i[12],t[13]=i[13],t[14]=i[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,i){return this.determinantAffine()===0?(e.set(1,0,0),t.set(0,1,0),i.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this)}makeBasis(e,t,i){return this.set(e.x,t.x,i.x,0,e.y,t.y,i.y,0,e.z,t.z,i.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();const t=this.elements,i=e.elements,r=1/hr.setFromMatrixColumn(e,0).length(),a=1/hr.setFromMatrixColumn(e,1).length(),s=1/hr.setFromMatrixColumn(e,2).length();return t[0]=i[0]*r,t[1]=i[1]*r,t[2]=i[2]*r,t[3]=0,t[4]=i[4]*a,t[5]=i[5]*a,t[6]=i[6]*a,t[7]=0,t[8]=i[8]*s,t[9]=i[9]*s,t[10]=i[10]*s,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,i=e.x,r=e.y,a=e.z,s=Math.cos(i),o=Math.sin(i),c=Math.cos(r),u=Math.sin(r),h=Math.cos(a),d=Math.sin(a);if(e.order==="XYZ"){const f=s*h,p=s*d,m=o*h,x=o*d;t[0]=c*h,t[4]=-c*d,t[8]=u,t[1]=p+m*u,t[5]=f-x*u,t[9]=-o*c,t[2]=x-f*u,t[6]=m+p*u,t[10]=s*c}else if(e.order==="YXZ"){const f=c*h,p=c*d,m=u*h,x=u*d;t[0]=f+x*o,t[4]=m*o-p,t[8]=s*u,t[1]=s*d,t[5]=s*h,t[9]=-o,t[2]=p*o-m,t[6]=x+f*o,t[10]=s*c}else if(e.order==="ZXY"){const f=c*h,p=c*d,m=u*h,x=u*d;t[0]=f-x*o,t[4]=-s*d,t[8]=m+p*o,t[1]=p+m*o,t[5]=s*h,t[9]=x-f*o,t[2]=-s*u,t[6]=o,t[10]=s*c}else if(e.order==="ZYX"){const f=s*h,p=s*d,m=o*h,x=o*d;t[0]=c*h,t[4]=m*u-p,t[8]=f*u+x,t[1]=c*d,t[5]=x*u+f,t[9]=p*u-m,t[2]=-u,t[6]=o*c,t[10]=s*c}else if(e.order==="YZX"){const f=s*c,p=s*u,m=o*c,x=o*u;t[0]=c*h,t[4]=x-f*d,t[8]=m*d+p,t[1]=d,t[5]=s*h,t[9]=-o*h,t[2]=-u*h,t[6]=p*d+m,t[10]=f-x*d}else if(e.order==="XZY"){const f=s*c,p=s*u,m=o*c,x=o*u;t[0]=c*h,t[4]=-d,t[8]=u*h,t[1]=f*d+x,t[5]=s*h,t[9]=p*d-m,t[2]=m*d-p,t[6]=o*h,t[10]=x*d+f}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Mp,e,vp)}lookAt(e,t,i){const r=this.elements;return _n.subVectors(e,t),_n.lengthSq()===0&&(_n.z=1),_n.normalize(),Pi.crossVectors(i,_n),Pi.lengthSq()===0&&(Math.abs(i.z)===1?_n.x+=1e-4:_n.z+=1e-4,_n.normalize(),Pi.crossVectors(i,_n)),Pi.normalize(),ya.crossVectors(_n,Pi),r[0]=Pi.x,r[4]=ya.x,r[8]=_n.x,r[1]=Pi.y,r[5]=ya.y,r[9]=_n.y,r[2]=Pi.z,r[6]=ya.z,r[10]=_n.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,r=t.elements,a=this.elements,s=i[0],o=i[4],c=i[8],u=i[12],h=i[1],d=i[5],f=i[9],p=i[13],m=i[2],x=i[6],_=i[10],g=i[14],M=i[3],E=i[7],b=i[11],R=i[15],w=r[0],D=r[4],S=r[8],y=r[12],L=r[1],C=r[5],N=r[9],U=r[13],I=r[2],B=r[6],V=r[10],$=r[14],ae=r[3],q=r[7],ee=r[11],O=r[15];return a[0]=s*w+o*L+c*I+u*ae,a[4]=s*D+o*C+c*B+u*q,a[8]=s*S+o*N+c*V+u*ee,a[12]=s*y+o*U+c*$+u*O,a[1]=h*w+d*L+f*I+p*ae,a[5]=h*D+d*C+f*B+p*q,a[9]=h*S+d*N+f*V+p*ee,a[13]=h*y+d*U+f*$+p*O,a[2]=m*w+x*L+_*I+g*ae,a[6]=m*D+x*C+_*B+g*q,a[10]=m*S+x*N+_*V+g*ee,a[14]=m*y+x*U+_*$+g*O,a[3]=M*w+E*L+b*I+R*ae,a[7]=M*D+E*C+b*B+R*q,a[11]=M*S+E*N+b*V+R*ee,a[15]=M*y+E*U+b*$+R*O,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[4],r=e[8],a=e[12],s=e[1],o=e[5],c=e[9],u=e[13],h=e[2],d=e[6],f=e[10],p=e[14],m=e[3],x=e[7],_=e[11],g=e[15],M=c*p-u*f,E=o*p-u*d,b=o*f-c*d,R=s*p-u*h,w=s*f-c*h,D=s*d-o*h;return t*(x*M-_*E+g*b)-i*(m*M-_*R+g*w)+r*(m*E-x*R+g*D)-a*(m*b-x*w+_*D)}determinantAffine(){const e=this.elements,t=e[0],i=e[4],r=e[8],a=e[1],s=e[5],o=e[9],c=e[2],u=e[6],h=e[10];return t*(s*h-o*u)-i*(a*h-o*c)+r*(a*u-s*c)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,i){const r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=i),this}invert(){const e=this.elements,t=e[0],i=e[1],r=e[2],a=e[3],s=e[4],o=e[5],c=e[6],u=e[7],h=e[8],d=e[9],f=e[10],p=e[11],m=e[12],x=e[13],_=e[14],g=e[15],M=t*o-i*s,E=t*c-r*s,b=t*u-a*s,R=i*c-r*o,w=i*u-a*o,D=r*u-a*c,S=h*x-d*m,y=h*_-f*m,L=h*g-p*m,C=d*_-f*x,N=d*g-p*x,U=f*g-p*_,I=M*U-E*N+b*C+R*L-w*y+D*S;if(I===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const B=1/I;return e[0]=(o*U-c*N+u*C)*B,e[1]=(r*N-i*U-a*C)*B,e[2]=(x*D-_*w+g*R)*B,e[3]=(f*w-d*D-p*R)*B,e[4]=(c*L-s*U-u*y)*B,e[5]=(t*U-r*L+a*y)*B,e[6]=(_*b-m*D-g*E)*B,e[7]=(h*D-f*b+p*E)*B,e[8]=(s*N-o*L+u*S)*B,e[9]=(i*L-t*N-a*S)*B,e[10]=(m*w-x*b+g*M)*B,e[11]=(d*b-h*w-p*M)*B,e[12]=(o*y-s*C-c*S)*B,e[13]=(t*C-i*y+r*S)*B,e[14]=(x*E-m*R-_*M)*B,e[15]=(h*R-d*E+f*M)*B,this}scale(e){const t=this.elements,i=e.x,r=e.y,a=e.z;return t[0]*=i,t[4]*=r,t[8]*=a,t[1]*=i,t[5]*=r,t[9]*=a,t[2]*=i,t[6]*=r,t[10]*=a,t[3]*=i,t[7]*=r,t[11]*=a,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,i,r))}makeTranslation(e,t,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,i,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,t,-i,0,0,i,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,0,i,0,0,1,0,0,-i,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,0,i,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const i=Math.cos(t),r=Math.sin(t),a=1-i,s=e.x,o=e.y,c=e.z,u=a*s,h=a*o;return this.set(u*s+i,u*o-r*c,u*c+r*o,0,u*o+r*c,h*o+i,h*c-r*s,0,u*c-r*o,h*c+r*s,a*c*c+i,0,0,0,0,1),this}makeScale(e,t,i){return this.set(e,0,0,0,0,t,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,t,i,r,a,s){return this.set(1,i,a,0,e,1,s,0,t,r,1,0,0,0,0,1),this}compose(e,t,i){const r=this.elements,a=t._x,s=t._y,o=t._z,c=t._w,u=a+a,h=s+s,d=o+o,f=a*u,p=a*h,m=a*d,x=s*h,_=s*d,g=o*d,M=c*u,E=c*h,b=c*d,R=i.x,w=i.y,D=i.z;return r[0]=(1-(x+g))*R,r[1]=(p+b)*R,r[2]=(m-E)*R,r[3]=0,r[4]=(p-b)*w,r[5]=(1-(f+g))*w,r[6]=(_+M)*w,r[7]=0,r[8]=(m+E)*D,r[9]=(_-M)*D,r[10]=(1-(f+x))*D,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,i){const r=this.elements;e.x=r[12],e.y=r[13],e.z=r[14];const a=this.determinantAffine();if(a===0)return i.set(1,1,1),t.identity(),this;let s=hr.set(r[0],r[1],r[2]).length();const o=hr.set(r[4],r[5],r[6]).length(),c=hr.set(r[8],r[9],r[10]).length();a<0&&(s=-s),Pn.copy(this);const u=1/s,h=1/o,d=1/c;return Pn.elements[0]*=u,Pn.elements[1]*=u,Pn.elements[2]*=u,Pn.elements[4]*=h,Pn.elements[5]*=h,Pn.elements[6]*=h,Pn.elements[8]*=d,Pn.elements[9]*=d,Pn.elements[10]*=d,t.setFromRotationMatrix(Pn),i.x=s,i.y=o,i.z=c,this}makePerspective(e,t,i,r,a,s,o=ei,c=!1){const u=this.elements,h=2*a/(t-e),d=2*a/(i-r),f=(t+e)/(t-e),p=(i+r)/(i-r);let m,x;if(c)m=a/(s-a),x=s*a/(s-a);else if(o===ei)m=-(s+a)/(s-a),x=-2*s*a/(s-a);else if(o===us)m=-s/(s-a),x=-s*a/(s-a);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return u[0]=h,u[4]=0,u[8]=f,u[12]=0,u[1]=0,u[5]=d,u[9]=p,u[13]=0,u[2]=0,u[6]=0,u[10]=m,u[14]=x,u[3]=0,u[7]=0,u[11]=-1,u[15]=0,this}makeOrthographic(e,t,i,r,a,s,o=ei,c=!1){const u=this.elements,h=2/(t-e),d=2/(i-r),f=-(t+e)/(t-e),p=-(i+r)/(i-r);let m,x;if(c)m=1/(s-a),x=s/(s-a);else if(o===ei)m=-2/(s-a),x=-(s+a)/(s-a);else if(o===us)m=-1/(s-a),x=-a/(s-a);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return u[0]=h,u[4]=0,u[8]=0,u[12]=f,u[1]=0,u[5]=d,u[9]=0,u[13]=p,u[2]=0,u[6]=0,u[10]=m,u[14]=x,u[3]=0,u[7]=0,u[11]=0,u[15]=1,this}equals(e){const t=this.elements,i=e.elements;for(let r=0;r<16;r++)if(t[r]!==i[r])return!1;return!0}fromArray(e,t=0){for(let i=0;i<16;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e[t+9]=i[9],e[t+10]=i[10],e[t+11]=i[11],e[t+12]=i[12],e[t+13]=i[13],e[t+14]=i[14],e[t+15]=i[15],e}}const hr=new Y,Pn=new Ft,Mp=new Y(0,0,0),vp=new Y(1,1,1),Pi=new Y,ya=new Y,_n=new Y,nc=new Ft,ic=new kr;class ar{constructor(e=0,t=0,i=0,r=ar.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=i,this._order=r}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,i,r=this._order){return this._x=e,this._y=t,this._z=i,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,i=!0){const r=e.elements,a=r[0],s=r[4],o=r[8],c=r[1],u=r[5],h=r[9],d=r[2],f=r[6],p=r[10];switch(t){case"XYZ":this._y=Math.asin(it(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,p),this._z=Math.atan2(-s,a)):(this._x=Math.atan2(f,u),this._z=0);break;case"YXZ":this._x=Math.asin(-it(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,p),this._z=Math.atan2(c,u)):(this._y=Math.atan2(-d,a),this._z=0);break;case"ZXY":this._x=Math.asin(it(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-d,p),this._z=Math.atan2(-s,u)):(this._y=0,this._z=Math.atan2(c,a));break;case"ZYX":this._y=Math.asin(-it(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(f,p),this._z=Math.atan2(c,a)):(this._x=0,this._z=Math.atan2(-s,u));break;case"YZX":this._z=Math.asin(it(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-h,u),this._y=Math.atan2(-d,a)):(this._x=0,this._y=Math.atan2(o,p));break;case"XZY":this._z=Math.asin(-it(s,-1,1)),Math.abs(s)<.9999999?(this._x=Math.atan2(f,u),this._y=Math.atan2(o,a)):(this._x=Math.atan2(-h,p),this._y=0);break;default:Ge("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,i){return nc.makeRotationFromQuaternion(e),this.setFromRotationMatrix(nc,t,i)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return ic.setFromEuler(this),this.setFromQuaternion(ic,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}ar.DEFAULT_ORDER="XYZ";class Nu{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let Sp=0;const rc=new Y,dr=new kr,ui=new Ft,wa=new Y,Xr=new Y,bp=new Y,Ep=new kr,ac=new Y(1,0,0),sc=new Y(0,1,0),oc=new Y(0,0,1),lc={type:"added"},yp={type:"removed"},fr={type:"childadded",child:null},Bs={type:"childremoved",child:null};class Sn extends sr{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Sp++}),this.uuid=ma(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Sn.DEFAULT_UP.clone();const e=new Y,t=new ar,i=new kr,r=new Y(1,1,1);function a(){i.setFromEuler(t,!1)}function s(){t.setFromQuaternion(i,void 0,!1)}t._onChange(a),i._onChange(s),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new Ft},normalMatrix:{value:new Ve}}),this.matrix=new Ft,this.matrixWorld=new Ft,this.matrixAutoUpdate=Sn.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Sn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Nu,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return dr.setFromAxisAngle(e,t),this.quaternion.multiply(dr),this}rotateOnWorldAxis(e,t){return dr.setFromAxisAngle(e,t),this.quaternion.premultiply(dr),this}rotateX(e){return this.rotateOnAxis(ac,e)}rotateY(e){return this.rotateOnAxis(sc,e)}rotateZ(e){return this.rotateOnAxis(oc,e)}translateOnAxis(e,t){return rc.copy(e).applyQuaternion(this.quaternion),this.position.add(rc.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(ac,e)}translateY(e){return this.translateOnAxis(sc,e)}translateZ(e){return this.translateOnAxis(oc,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(ui.copy(this.matrixWorld).invert())}lookAt(e,t,i){e.isVector3?wa.copy(e):wa.set(e,t,i);const r=this.parent;this.updateWorldMatrix(!0,!1),Xr.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?ui.lookAt(Xr,wa,this.up):ui.lookAt(wa,Xr,this.up),this.quaternion.setFromRotationMatrix(ui),r&&(ui.extractRotation(r.matrixWorld),dr.setFromRotationMatrix(ui),this.quaternion.premultiply(dr.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(st("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(lc),fr.child=e,this.dispatchEvent(fr),fr.child=null):st("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(yp),Bs.child=e,this.dispatchEvent(Bs),Bs.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),ui.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),ui.multiply(e.parent.matrixWorld)),e.applyMatrix4(ui),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(lc),fr.child=e,this.dispatchEvent(fr),fr.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let i=0,r=this.children.length;i<r;i++){const s=this.children[i].getObjectByProperty(e,t);if(s!==void 0)return s}}getObjectsByProperty(e,t,i=[]){this[e]===t&&i.push(this);const r=this.children;for(let a=0,s=r.length;a<s;a++)r[a].getObjectsByProperty(e,t,i);return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Xr,e,bp),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Xr,Ep,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}intersectsFrustum(){}traverse(e){e(this);const t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);const e=this.pivot;if(e!==null){const t=e.x,i=e.y,r=e.z,a=this.matrix.elements;a[12]+=t-a[0]*t-a[4]*i-a[8]*r,a[13]+=i-a[1]*t-a[5]*i-a[9]*r,a[14]+=r-a[2]*t-a[6]*i-a[10]*r}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].updateMatrixWorld(e)}updateWorldMatrix(e,t,i=!1){const r=this.parent;if(e===!0&&r!==null&&r.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||i)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,i=!0),t===!0){const a=this.children;for(let s=0,o=a.length;s<o;s++)a[s].updateWorldMatrix(!1,!0,i)}}toJSON(e){const t=e===void 0||typeof e=="string",i={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const r={};r.uuid=this.uuid,r.type=this.type,r.name=this.name,r.castShadow=this.castShadow,r.receiveShadow=this.receiveShadow,r.visible=this.visible,r.frustumCulled=this.frustumCulled,r.renderOrder=this.renderOrder,r.static=this.static,r.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.pivot!==null&&(r.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(r.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(r.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),r.instanceInfo=this._instanceInfo.map(o=>({...o})),r.availableInstanceIds=this._availableInstanceIds.slice(),r.availableGeometryIds=this._availableGeometryIds.slice(),r.nextIndexStart=this._nextIndexStart,r.nextVertexStart=this._nextVertexStart,r.geometryCount=this._geometryCount,r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.matricesTexture=this._matricesTexture.toJSON(e),r.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(r.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(r.boundingBox=this.boundingBox.toJSON()));function a(o,c){return o[c.uuid]===void 0&&(o[c.uuid]=c.toJSON(e)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=a(e.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const c=o.shapes;if(Array.isArray(c))for(let u=0,h=c.length;u<h;u++){const d=c[u];a(e.shapes,d)}else a(e.shapes,c)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(a(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let c=0,u=this.material.length;c<u;c++)o.push(a(e.materials,this.material[c]));r.material=o}else r.material=a(e.materials,this.material);if(this.children.length>0){r.children=[];for(let o=0;o<this.children.length;o++)r.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let o=0;o<this.animations.length;o++){const c=this.animations[o];r.animations.push(a(e.animations,c))}}if(t){const o=s(e.geometries),c=s(e.materials),u=s(e.textures),h=s(e.images),d=s(e.shapes),f=s(e.skeletons),p=s(e.animations),m=s(e.nodes);o.length>0&&(i.geometries=o),c.length>0&&(i.materials=c),u.length>0&&(i.textures=u),h.length>0&&(i.images=h),d.length>0&&(i.shapes=d),f.length>0&&(i.skeletons=f),p.length>0&&(i.animations=p),m.length>0&&(i.nodes=m)}return i.object=r,i;function s(o){const c=[];for(const u in o){const h=o[u];delete h.metadata,c.push(h)}return c}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot!==null?e.pivot.clone():null,this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let i=0;i<e.children.length;i++){const r=e.children[i];this.add(r.clone())}return this}dispose(){this.dispatchEvent({type:"dispose"})}}Sn.DEFAULT_UP=new Y(0,1,0);Sn.DEFAULT_MATRIX_AUTO_UPDATE=!0;Sn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class Aa extends Sn{constructor(){super(),this.isGroup=!0,this.type="Group"}}const wp={type:"move"};class ks{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Aa,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Aa,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new Y,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new Y),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Aa,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new Y,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new Y,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const i of e.hand.values())this._getHandJoint(t,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,i){let r=null,a=null,s=null;const o=this._targetRay,c=this._grip,u=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(u&&e.hand){s=!0;for(const x of e.hand.values()){const _=t.getJointPose(x,i),g=this._getHandJoint(u,x);_!==null&&(g.matrix.fromArray(_.transform.matrix),g.matrix.decompose(g.position,g.rotation,g.scale),g.matrixWorldNeedsUpdate=!0,g.jointRadius=_.radius),g.visible=_!==null}const h=u.joints["index-finger-tip"],d=u.joints["thumb-tip"],f=h.position.distanceTo(d.position),p=.02,m=.005;u.inputState.pinching&&f>p+m?(u.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!u.inputState.pinching&&f<=p-m&&(u.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else c!==null&&e.gripSpace&&(a=t.getPose(e.gripSpace,i),a!==null&&(c.matrix.fromArray(a.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,a.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(a.linearVelocity)):c.hasLinearVelocity=!1,a.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(a.angularVelocity)):c.hasAngularVelocity=!1,c.eventsEnabled&&c.dispatchEvent({type:"gripUpdated",data:e,target:this})));o!==null&&(r=t.getPose(e.targetRaySpace,i),r===null&&a!==null&&(r=a),r!==null&&(o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,r.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(r.linearVelocity)):o.hasLinearVelocity=!1,r.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(r.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(wp)))}return o!==null&&(o.visible=r!==null),c!==null&&(c.visible=a!==null),u!==null&&(u.visible=s!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const i=new Aa;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[t.jointName]=i,e.add(i)}return e.joints[t.jointName]}}const Uu={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Ii={h:0,s:0,l:0},Ta={h:0,s:0,l:0};function zs(n,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?n+(e-n)*6*t:t<1/2?e:t<2/3?n+(e-n)*6*(2/3-t):n}class ct{constructor(e,t,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,i)}set(e,t,i){if(t===void 0&&i===void 0){const r=e;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(e,t,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=wn){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,nt.colorSpaceToWorking(this,t),this}setRGB(e,t,i,r=nt.workingColorSpace){return this.r=e,this.g=t,this.b=i,nt.colorSpaceToWorking(this,r),this}setHSL(e,t,i,r=nt.workingColorSpace){if(e=dp(e,1),t=it(t,0,1),i=it(i,0,1),t===0)this.r=this.g=this.b=i;else{const a=i<=.5?i*(1+t):i+t-i*t,s=2*i-a;this.r=zs(s,a,e+1/3),this.g=zs(s,a,e),this.b=zs(s,a,e-1/3)}return nt.colorSpaceToWorking(this,r),this}setStyle(e,t=wn){function i(a){a!==void 0&&parseFloat(a)<1&&Ge("Color: Alpha component of "+e+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let a;const s=r[1],o=r[2];switch(s){case"rgb":case"rgba":if(a=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(a[4]),this.setRGB(Math.min(255,parseInt(a[1],10))/255,Math.min(255,parseInt(a[2],10))/255,Math.min(255,parseInt(a[3],10))/255,t);if(a=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(a[4]),this.setRGB(Math.min(100,parseInt(a[1],10))/100,Math.min(100,parseInt(a[2],10))/100,Math.min(100,parseInt(a[3],10))/100,t);break;case"hsl":case"hsla":if(a=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(a[4]),this.setHSL(parseFloat(a[1])/360,parseFloat(a[2])/100,parseFloat(a[3])/100,t);break;default:Ge("Color: Unknown color model "+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){const a=r[1],s=a.length;if(s===3)return this.setRGB(parseInt(a.charAt(0),16)/15,parseInt(a.charAt(1),16)/15,parseInt(a.charAt(2),16)/15,t);if(s===6)return this.setHex(parseInt(a,16),t);Ge("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=wn){const i=Uu[e.toLowerCase()];return i!==void 0?this.setHex(i,t):Ge("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=bi(e.r),this.g=bi(e.g),this.b=bi(e.b),this}copyLinearToSRGB(e){return this.r=Dr(e.r),this.g=Dr(e.g),this.b=Dr(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=wn){return nt.workingToColorSpace(nn.copy(this),e),Math.round(it(nn.r*255,0,255))*65536+Math.round(it(nn.g*255,0,255))*256+Math.round(it(nn.b*255,0,255))}getHexString(e=wn){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=nt.workingColorSpace){nt.workingToColorSpace(nn.copy(this),t);const i=nn.r,r=nn.g,a=nn.b,s=Math.max(i,r,a),o=Math.min(i,r,a);let c,u;const h=(o+s)/2;if(o===s)c=0,u=0;else{const d=s-o;switch(u=h<=.5?d/(s+o):d/(2-s-o),s){case i:c=(r-a)/d+(r<a?6:0);break;case r:c=(a-i)/d+2;break;case a:c=(i-r)/d+4;break}c/=6}return e.h=c,e.s=u,e.l=h,e}getRGB(e,t=nt.workingColorSpace){return nt.workingToColorSpace(nn.copy(this),t),e.r=nn.r,e.g=nn.g,e.b=nn.b,e}getStyle(e=wn){nt.workingToColorSpace(nn.copy(this),e);const t=nn.r,i=nn.g,r=nn.b;return e!==wn?`color(${e} ${t.toFixed(3)} ${i.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(i*255)},${Math.round(r*255)})`}offsetHSL(e,t,i){return this.getHSL(Ii),this.setHSL(Ii.h+e,Ii.s+t,Ii.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,i){return this.r=e.r+(t.r-e.r)*i,this.g=e.g+(t.g-e.g)*i,this.b=e.b+(t.b-e.b)*i,this}lerpHSL(e,t){this.getHSL(Ii),e.getHSL(Ta);const i=Is(Ii.h,Ta.h,t),r=Is(Ii.s,Ta.s,t),a=Is(Ii.l,Ta.l,t);return this.setHSL(i,r,a),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,i=this.g,r=this.b,a=e.elements;return this.r=a[0]*t+a[3]*i+a[6]*r,this.g=a[1]*t+a[4]*i+a[7]*r,this.b=a[2]*t+a[5]*i+a[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const nn=new ct;ct.NAMES=Uu;class Ap extends Sn{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new ar,this.environmentIntensity=1,this.environmentRotation=new ar,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),t.object.backgroundBlurriness=this.backgroundBlurriness,t.object.backgroundIntensity=this.backgroundIntensity,t.object.backgroundRotation=this.backgroundRotation.toArray(),t.object.environmentIntensity=this.environmentIntensity,t.object.environmentRotation=this.environmentRotation.toArray(),t}}const In=new Y,hi=new Y,Hs=new Y,di=new Y,pr=new Y,mr=new Y,cc=new Y,Gs=new Y,Vs=new Y,Ws=new Y,Ys=new Dt,Xs=new Dt,Ks=new Dt;class Fn{constructor(e=new Y,t=new Y,i=new Y){this.a=e,this.b=t,this.c=i}static getNormal(e,t,i,r){r.subVectors(i,t),In.subVectors(e,t),r.cross(In);const a=r.lengthSq();return a>0?r.multiplyScalar(1/Math.sqrt(a)):r.set(0,0,0)}static getBarycoord(e,t,i,r,a){In.subVectors(r,t),hi.subVectors(i,t),Hs.subVectors(e,t);const s=In.dot(In),o=In.dot(hi),c=In.dot(Hs),u=hi.dot(hi),h=hi.dot(Hs),d=s*u-o*o;if(d===0)return a.set(0,0,0),null;const f=1/d,p=(u*c-o*h)*f,m=(s*h-o*c)*f;return a.set(1-p-m,m,p)}static containsPoint(e,t,i,r){return this.getBarycoord(e,t,i,r,di)===null?!1:di.x>=0&&di.y>=0&&di.x+di.y<=1}static getInterpolation(e,t,i,r,a,s,o,c){return this.getBarycoord(e,t,i,r,di)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(a,di.x),c.addScaledVector(s,di.y),c.addScaledVector(o,di.z),c)}static getInterpolatedAttribute(e,t,i,r,a,s){return Ys.setScalar(0),Xs.setScalar(0),Ks.setScalar(0),Ys.fromBufferAttribute(e,t),Xs.fromBufferAttribute(e,i),Ks.fromBufferAttribute(e,r),s.setScalar(0),s.addScaledVector(Ys,a.x),s.addScaledVector(Xs,a.y),s.addScaledVector(Ks,a.z),s}static isFrontFacing(e,t,i,r){return In.subVectors(i,t),hi.subVectors(e,t),In.cross(hi).dot(r)<0}set(e,t,i){return this.a.copy(e),this.b.copy(t),this.c.copy(i),this}setFromPointsAndIndices(e,t,i,r){return this.a.copy(e[t]),this.b.copy(e[i]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,t,i,r){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return In.subVectors(this.c,this.b),hi.subVectors(this.a,this.b),In.cross(hi).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return Fn.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return Fn.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,i,r,a){return Fn.getInterpolation(e,this.a,this.b,this.c,t,i,r,a)}containsPoint(e){return Fn.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return Fn.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const i=this.a,r=this.b,a=this.c;let s,o;pr.subVectors(r,i),mr.subVectors(a,i),Gs.subVectors(e,i);const c=pr.dot(Gs),u=mr.dot(Gs);if(c<=0&&u<=0)return t.copy(i);Vs.subVectors(e,r);const h=pr.dot(Vs),d=mr.dot(Vs);if(h>=0&&d<=h)return t.copy(r);const f=c*d-h*u;if(f<=0&&c>=0&&h<=0)return s=c/(c-h),t.copy(i).addScaledVector(pr,s);Ws.subVectors(e,a);const p=pr.dot(Ws),m=mr.dot(Ws);if(m>=0&&p<=m)return t.copy(a);const x=p*u-c*m;if(x<=0&&u>=0&&m<=0)return o=u/(u-m),t.copy(i).addScaledVector(mr,o);const _=h*m-p*d;if(_<=0&&d-h>=0&&p-m>=0)return cc.subVectors(a,r),o=(d-h)/(d-h+(p-m)),t.copy(r).addScaledVector(cc,o);const g=1/(_+x+f);return s=x*g,o=f*g,t.copy(i).addScaledVector(pr,s).addScaledVector(mr,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}class zr{constructor(e=new Y(1/0,1/0,1/0),t=new Y(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t+=3)this.expandByPoint(Nn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,i=e.count;t<i;t++)this.expandByPoint(Nn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const i=Nn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const i=e.geometry;if(i!==void 0){const a=i.getAttribute("position");if(t===!0&&a!==void 0&&e.isInstancedMesh!==!0)for(let s=0,o=a.count;s<o;s++)e.isMesh===!0?e.getVertexPosition(s,Nn):Nn.fromBufferAttribute(a,s),Nn.applyMatrix4(e.matrixWorld),this.expandByPoint(Nn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Ra.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),Ra.copy(i.boundingBox)),Ra.applyMatrix4(e.matrixWorld),this.union(Ra)}const r=e.children;for(let a=0,s=r.length;a<s;a++)this.expandByObject(r[a],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Nn),Nn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,i;return e.normal.x>0?(t=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),t<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Kr),Ca.subVectors(this.max,Kr),gr.subVectors(e.a,Kr),_r.subVectors(e.b,Kr),xr.subVectors(e.c,Kr),Ni.subVectors(_r,gr),Ui.subVectors(xr,_r),Vi.subVectors(gr,xr);let t=[0,-Ni.z,Ni.y,0,-Ui.z,Ui.y,0,-Vi.z,Vi.y,Ni.z,0,-Ni.x,Ui.z,0,-Ui.x,Vi.z,0,-Vi.x,-Ni.y,Ni.x,0,-Ui.y,Ui.x,0,-Vi.y,Vi.x,0];return!qs(t,gr,_r,xr,Ca)||(t=[1,0,0,0,1,0,0,0,1],!qs(t,gr,_r,xr,Ca))?!1:(La.crossVectors(Ni,Ui),t=[La.x,La.y,La.z],qs(t,gr,_r,xr,Ca))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Nn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Nn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(fi[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),fi[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),fi[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),fi[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),fi[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),fi[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),fi[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),fi[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(fi),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const fi=[new Y,new Y,new Y,new Y,new Y,new Y,new Y,new Y],Nn=new Y,Ra=new zr,gr=new Y,_r=new Y,xr=new Y,Ni=new Y,Ui=new Y,Vi=new Y,Kr=new Y,Ca=new Y,La=new Y,Wi=new Y;function qs(n,e,t,i,r){for(let a=0,s=n.length-3;a<=s;a+=3){Wi.fromArray(n,a);const o=r.x*Math.abs(Wi.x)+r.y*Math.abs(Wi.y)+r.z*Math.abs(Wi.z),c=e.dot(Wi),u=t.dot(Wi),h=i.dot(Wi);if(Math.max(-Math.max(c,u,h),Math.min(c,u,h))>o)return!1}return!0}const Gt=new Y,Da=new We;let Tp=0;class ni extends sr{constructor(e,t,i=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Tp++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=i,this.usage=op,this.updateRanges=[],this.gpuType=jn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,i){e*=this.itemSize,i*=t.itemSize;for(let r=0,a=this.itemSize;r<a;r++)this.array[e+r]=t.array[i+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,i=this.count;t<i;t++)Da.fromBufferAttribute(this,t),Da.applyMatrix3(e),this.setXY(t,Da.x,Da.y);else if(this.itemSize===3)for(let t=0,i=this.count;t<i;t++)Gt.fromBufferAttribute(this,t),Gt.applyMatrix3(e),this.setXYZ(t,Gt.x,Gt.y,Gt.z);return this}applyMatrix4(e){for(let t=0,i=this.count;t<i;t++)Gt.fromBufferAttribute(this,t),Gt.applyMatrix4(e),this.setXYZ(t,Gt.x,Gt.y,Gt.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)Gt.fromBufferAttribute(this,t),Gt.applyNormalMatrix(e),this.setXYZ(t,Gt.x,Gt.y,Gt.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)Gt.fromBufferAttribute(this,t),Gt.transformDirection(e),this.setXYZ(t,Gt.x,Gt.y,Gt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let i=this.array[e*this.itemSize+t];return this.normalized&&(i=Yr(i,this.array)),i}setComponent(e,t,i){return this.normalized&&(i=fn(i,this.array)),this.array[e*this.itemSize+t]=i,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Yr(t,this.array)),t}setX(e,t){return this.normalized&&(t=fn(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Yr(t,this.array)),t}setY(e,t){return this.normalized&&(t=fn(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Yr(t,this.array)),t}setZ(e,t){return this.normalized&&(t=fn(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Yr(t,this.array)),t}setW(e,t){return this.normalized&&(t=fn(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,i){return e*=this.itemSize,this.normalized&&(t=fn(t,this.array),i=fn(i,this.array)),this.array[e+0]=t,this.array[e+1]=i,this}setXYZ(e,t,i,r){return e*=this.itemSize,this.normalized&&(t=fn(t,this.array),i=fn(i,this.array),r=fn(r,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=r,this}setXYZW(e,t,i,r,a){return e*=this.itemSize,this.normalized&&(t=fn(t,this.array),i=fn(i,this.array),r=fn(r,this.array),a=fn(a,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=r,this.array[e+3]=a,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return e.name=this.name,e.usage=this.usage,e.gpuType=this.gpuType,e}dispose(){this.dispatchEvent({type:"dispose"})}}class Ou extends ni{constructor(e,t,i){super(new Uint16Array(e),t,i)}}class Fu extends ni{constructor(e,t,i){super(new Uint32Array(e),t,i)}}class Ei extends ni{constructor(e,t,i){super(new Float32Array(e),t,i)}}const Rp=new zr,qr=new Y,Zs=new Y;class bl{constructor(e=new Y,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const i=this.center;t!==void 0?i.copy(t):Rp.setFromPoints(e).getCenter(i);let r=0;for(let a=0,s=e.length;a<s;a++)r=Math.max(r,i.distanceToSquared(e[a]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const i=this.center.distanceToSquared(e);return t.copy(e),i>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;qr.subVectors(e,this.center);const t=qr.lengthSq();if(t>this.radius*this.radius){const i=Math.sqrt(t),r=(i-this.radius)*.5;this.center.addScaledVector(qr,r/i),this.radius+=r}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Zs.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(qr.copy(e.center).add(Zs)),this.expandByPoint(qr.copy(e.center).sub(Zs))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}let Cp=0;const yn=new Ft,$s=new Sn,Mr=new Y,xn=new zr,Zr=new zr,qt=new Y;class si extends sr{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Cp++}),this.uuid=ma(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(lp(e)?Fu:Ou)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,i=0){this.groups.push({start:e,count:t,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const a=new Ve().getNormalMatrix(e);i.applyNormalMatrix(a),i.needsUpdate=!0}const r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return yn.makeRotationFromQuaternion(e),this.applyMatrix4(yn),this}rotateX(e){return yn.makeRotationX(e),this.applyMatrix4(yn),this}rotateY(e){return yn.makeRotationY(e),this.applyMatrix4(yn),this}rotateZ(e){return yn.makeRotationZ(e),this.applyMatrix4(yn),this}translate(e,t,i){return yn.makeTranslation(e,t,i),this.applyMatrix4(yn),this}scale(e,t,i){return yn.makeScale(e,t,i),this.applyMatrix4(yn),this}lookAt(e){return $s.lookAt(e),$s.updateMatrix(),this.applyMatrix4($s.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Mr).negate(),this.translate(Mr.x,Mr.y,Mr.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const i=[];for(let r=0,a=e.length;r<a;r++){const s=e[r];i.push(s.x,s.y,s.z||0)}this.setAttribute("position",new Ei(i,3))}else{const i=Math.min(e.length,t.count);for(let r=0;r<i;r++){const a=e[r];t.setXYZ(r,a.x,a.y,a.z||0)}e.length>t.count&&Ge("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new zr);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){st("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new Y(-1/0,-1/0,-1/0),new Y(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let i=0,r=t.length;i<r;i++){const a=t[i];xn.setFromBufferAttribute(a),this.morphTargetsRelative?(qt.addVectors(this.boundingBox.min,xn.min),this.boundingBox.expandByPoint(qt),qt.addVectors(this.boundingBox.max,xn.max),this.boundingBox.expandByPoint(qt)):(this.boundingBox.expandByPoint(xn.min),this.boundingBox.expandByPoint(xn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&st('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new bl);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){st("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new Y,1/0);return}if(e){const i=this.boundingSphere.center;if(xn.setFromBufferAttribute(e),t)for(let a=0,s=t.length;a<s;a++){const o=t[a];Zr.setFromBufferAttribute(o),this.morphTargetsRelative?(qt.addVectors(xn.min,Zr.min),xn.expandByPoint(qt),qt.addVectors(xn.max,Zr.max),xn.expandByPoint(qt)):(xn.expandByPoint(Zr.min),xn.expandByPoint(Zr.max))}xn.getCenter(i);let r=0;for(let a=0,s=e.count;a<s;a++)qt.fromBufferAttribute(e,a),r=Math.max(r,i.distanceToSquared(qt));if(t)for(let a=0,s=t.length;a<s;a++){const o=t[a],c=this.morphTargetsRelative;for(let u=0,h=o.count;u<h;u++)qt.fromBufferAttribute(o,u),c&&(Mr.fromBufferAttribute(e,u),qt.add(Mr)),r=Math.max(r,i.distanceToSquared(qt))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&st('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){st("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=t.position,r=t.normal,a=t.uv;let s=this.getAttribute("tangent");(s===void 0||s.count!==i.count)&&(s=new ni(new Float32Array(4*i.count),4),this.setAttribute("tangent",s));const o=[],c=[];for(let S=0;S<i.count;S++)o[S]=new Y,c[S]=new Y;const u=new Y,h=new Y,d=new Y,f=new We,p=new We,m=new We,x=new Y,_=new Y;function g(S,y,L){u.fromBufferAttribute(i,S),h.fromBufferAttribute(i,y),d.fromBufferAttribute(i,L),f.fromBufferAttribute(a,S),p.fromBufferAttribute(a,y),m.fromBufferAttribute(a,L),h.sub(u),d.sub(u),p.sub(f),m.sub(f);const C=1/(p.x*m.y-m.x*p.y);isFinite(C)&&(x.copy(h).multiplyScalar(m.y).addScaledVector(d,-p.y).multiplyScalar(C),_.copy(d).multiplyScalar(p.x).addScaledVector(h,-m.x).multiplyScalar(C),o[S].add(x),o[y].add(x),o[L].add(x),c[S].add(_),c[y].add(_),c[L].add(_))}let M=this.groups;M.length===0&&(M=[{start:0,count:e.count}]);for(let S=0,y=M.length;S<y;++S){const L=M[S],C=L.start,N=L.count;for(let U=C,I=C+N;U<I;U+=3)g(e.getX(U+0),e.getX(U+1),e.getX(U+2))}const E=new Y,b=new Y,R=new Y,w=new Y;function D(S){R.fromBufferAttribute(r,S),w.copy(R);const y=o[S];E.copy(y),E.sub(R.multiplyScalar(R.dot(y))).normalize(),b.crossVectors(w,y);const C=b.dot(c[S])<0?-1:1;s.setXYZW(S,E.x,E.y,E.z,C)}for(let S=0,y=M.length;S<y;++S){const L=M[S],C=L.start,N=L.count;for(let U=C,I=C+N;U<I;U+=3)D(e.getX(U+0)),D(e.getX(U+1)),D(e.getX(U+2))}this._transformed=!0}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let i=this.getAttribute("normal");if(i===void 0||i.count!==t.count)i=new ni(new Float32Array(t.count*3),3),this.setAttribute("normal",i);else for(let f=0,p=i.count;f<p;f++)i.setXYZ(f,0,0,0);const r=new Y,a=new Y,s=new Y,o=new Y,c=new Y,u=new Y,h=new Y,d=new Y;if(e)for(let f=0,p=e.count;f<p;f+=3){const m=e.getX(f+0),x=e.getX(f+1),_=e.getX(f+2);r.fromBufferAttribute(t,m),a.fromBufferAttribute(t,x),s.fromBufferAttribute(t,_),h.subVectors(s,a),d.subVectors(r,a),h.cross(d),o.fromBufferAttribute(i,m),c.fromBufferAttribute(i,x),u.fromBufferAttribute(i,_),o.add(h),c.add(h),u.add(h),i.setXYZ(m,o.x,o.y,o.z),i.setXYZ(x,c.x,c.y,c.z),i.setXYZ(_,u.x,u.y,u.z)}else for(let f=0,p=t.count;f<p;f+=3)r.fromBufferAttribute(t,f+0),a.fromBufferAttribute(t,f+1),s.fromBufferAttribute(t,f+2),h.subVectors(s,a),d.subVectors(r,a),h.cross(d),i.setXYZ(f+0,h.x,h.y,h.z),i.setXYZ(f+1,h.x,h.y,h.z),i.setXYZ(f+2,h.x,h.y,h.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,i=e.count;t<i;t++)qt.fromBufferAttribute(e,t),qt.normalize(),e.setXYZ(t,qt.x,qt.y,qt.z)}toNonIndexed(){function e(o,c){const u=o.array,h=o.itemSize,d=o.normalized,f=new u.constructor(c.length*h);let p=0,m=0;for(let x=0,_=c.length;x<_;x++){o.isInterleavedBufferAttribute?p=c[x]*o.data.stride+o.offset:p=c[x]*h;for(let g=0;g<h;g++)f[m++]=u[p++]}return new ni(f,h,d)}if(this.index===null)return Ge("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new si,i=this.index.array,r=this.attributes;for(const o in r){const c=r[o],u=e(c,i);t.setAttribute(o,u)}const a=this.morphAttributes;for(const o in a){const c=[],u=a[o];for(let h=0,d=u.length;h<d;h++){const f=u[h],p=e(f,i);c.push(p)}t.morphAttributes[o]=c}t.morphTargetsRelative=this.morphTargetsRelative;const s=this.groups;for(let o=0,c=s.length;o<c;o++){const u=s[o];t.addGroup(u.start,u.count,u.materialIndex)}return t}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,e.name=this.name,Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){const c=this.parameters;for(const u in c)c[u]!==void 0&&(e[u]=c[u]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const i=this.attributes;for(const c in i){const u=i[c];e.data.attributes[c]=u.toJSON(e.data)}const r={};let a=!1;for(const c in this.morphAttributes){const u=this.morphAttributes[c],h=[];for(let d=0,f=u.length;d<f;d++){const p=u[d];h.push(p.toJSON(e.data))}h.length>0&&(r[c]=h,a=!0)}a&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);const s=this.groups;s.length>0&&(e.data.groups=JSON.parse(JSON.stringify(s)));const o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const i=e.index;i!==null&&this.setIndex(i.clone());const r=e.attributes;for(const u in r){const h=r[u];this.setAttribute(u,h.clone(t))}const a=e.morphAttributes;for(const u in a){const h=[],d=a[u];for(let f=0,p=d.length;f<p;f++)h.push(d[f].clone(t));this.morphAttributes[u]=h}this.morphTargetsRelative=e.morphTargetsRelative;const s=e.groups;for(let u=0,h=s.length;u<h;u++){const d=s[u];this.addGroup(d.start,d.count,d.materialIndex)}const o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());const c=e.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Js=new Y,Lp=new Y,Dp=new Ve;class Fi{constructor(e=new Y(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,i,r){return this.normal.set(e,t,i),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,i){const r=Js.subVectors(i,t).cross(Lp.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,i=!0){const r=e.delta(Js),a=this.normal.dot(r);if(a===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const s=-(e.start.dot(this.normal)+this.constant)/a;return i===!0&&(s<0||s>1)?null:t.copy(e.start).addScaledVector(r,s)}intersectsLine(e){const t=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return t<0&&i>0||i<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const i=t||Dp.getNormalMatrix(e),r=this.coplanarPoint(Js).applyMatrix4(e),a=this.normal.applyMatrix3(i).normalize();return this.constant=-r.dot(a),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(e){return this.normal.fromArray(e.normal),this.constant=e.constant,this}}let Pp=0;class _s extends sr{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Pp++}),this.uuid=ma(),this.name="",this.type="Material",this.blending=sa,this.side=nr,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=fu,this.blendDst=pu,this.blendEquation=yr,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new ct(0,0,0),this.blendAlpha=0,this.depthFunc=la,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=ep,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Ds,this.stencilZFail=Ds,this.stencilZPass=Ds,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const i=e[t];if(i===void 0){Ge(`Material: parameter '${t}' has value of undefined.`);continue}const r=this[t];if(r===void 0){Ge(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(i):r&&r.isVector2&&i&&i.isVector2||r&&r.isEuler&&i&&i.isEuler||r&&r.isVector3&&i&&i.isVector3?r.copy(i):this[t]=i}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const i={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,i.blending=this.blending,i.side=this.side,i.shadowSide=this.shadowSide,i.vertexColors=this.vertexColors,i.opacity=this.opacity,i.transparent=this.transparent,i.blendSrc=this.blendSrc,i.blendDst=this.blendDst,i.blendEquation=this.blendEquation,i.blendSrcAlpha=this.blendSrcAlpha,i.blendDstAlpha=this.blendDstAlpha,i.blendEquationAlpha=this.blendEquationAlpha,i.blendColor=this.blendColor.getHex(),i.blendAlpha=this.blendAlpha,i.depthFunc=this.depthFunc,i.depthTest=this.depthTest,i.depthWrite=this.depthWrite,i.colorWrite=this.colorWrite,i.clipIntersection=this.clipIntersection,i.clipShadows=this.clipShadows,i.stencilWriteMask=this.stencilWriteMask,i.stencilFunc=this.stencilFunc,i.stencilRef=this.stencilRef,i.stencilFuncMask=this.stencilFuncMask,i.stencilFail=this.stencilFail,i.stencilZFail=this.stencilZFail,i.stencilZPass=this.stencilZPass,i.stencilWrite=this.stencilWrite,i.polygonOffset=this.polygonOffset,i.polygonOffsetFactor=this.polygonOffsetFactor,i.polygonOffsetUnits=this.polygonOffsetUnits,i.dithering=this.dithering,i.alphaTest=this.alphaTest,i.alphaHash=this.alphaHash,i.alphaToCoverage=this.alphaToCoverage,i.premultipliedAlpha=this.premultipliedAlpha,i.forceSinglePass=this.forceSinglePass,i.allowOverride=this.allowOverride,i.visible=this.visible,i.toneMapped=this.toneMapped,i.name=this.name,this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(i.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(i.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(i.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(i.clippingPlanes=this.clippingPlanes.map(a=>a.toJSON())),this.rotation!==void 0&&(i.rotation=this.rotation),this.depthPacking!==void 0&&(i.depthPacking=this.depthPacking),this.linewidth!==void 0&&(i.linewidth=this.linewidth),this.linecap!==void 0&&(i.linecap=this.linecap),this.linejoin!==void 0&&(i.linejoin=this.linejoin),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.wireframe!==void 0&&(i.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(i.flatShading=this.flatShading),this.fog!==void 0&&(i.fog=this.fog),Object.keys(this.userData).length>0&&(i.userData=this.userData);function r(a){const s=[];for(const o in a){const c=a[o];delete c.metadata,s.push(c)}return s}if(t){const a=r(e.textures),s=r(e.images);a.length>0&&(i.textures=a),s.length>0&&(i.images=s)}return i}fromJSON(e,t){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new ct().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.retroreflectivity!==void 0&&(this.retroreflectivity=e.retroreflectivity),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=e.iridescenceThicknessRange),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.clippingPlanes!==void 0&&(this.clippingPlanes=e.clippingPlanes.map(i=>new Fi().fromJSON(i))),e.clipIntersection!==void 0&&(this.clipIntersection=e.clipIntersection),e.clipShadows!==void 0&&(this.clipShadows=e.clipShadows),e.depthPacking!==void 0&&(this.depthPacking=e.depthPacking),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.linecap!==void 0&&(this.linecap=e.linecap),e.linejoin!==void 0&&(this.linejoin=e.linejoin),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(typeof e.vertexColors=="number"?this.vertexColors=e.vertexColors>0:this.vertexColors=e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=t[e.map]||null),e.matcap!==void 0&&(this.matcap=t[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=t[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=t[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=t[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let i=e.normalScale;Array.isArray(i)===!1&&(i=[i,i]),this.normalScale=new We().fromArray(i)}return e.displacementMap!==void 0&&(this.displacementMap=t[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=t[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=t[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=t[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=t[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=t[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=t[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=t[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=t[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=t[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=t[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=t[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=t[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=t[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new We().fromArray(e.clearcoatNormalScale)),e.iridescenceMap!==void 0&&(this.iridescenceMap=t[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=t[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=t[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=t[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=t[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=t[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=t[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let i=null;if(t!==null){const r=t.length;i=new Array(r);for(let a=0;a!==r;++a)i[a]=t[a].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}const pi=new Y,Qs=new Y,Pa=new Y,Ia=new Y;class Ip{constructor(e=new Y,t=new Y(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,pi)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const i=t.dot(this.direction);return i<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=pi.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(pi.copy(this.origin).addScaledVector(this.direction,t),pi.distanceToSquared(e))}distanceSqToSegment(e,t,i,r){Qs.copy(e).add(t).multiplyScalar(.5),Pa.copy(t).sub(e).normalize(),Ia.copy(this.origin).sub(Qs);const a=e.distanceTo(t)*.5,s=-this.direction.dot(Pa),o=Ia.dot(this.direction),c=-Ia.dot(Pa),u=Ia.lengthSq(),h=Math.abs(1-s*s);let d,f,p,m;if(h>0)if(d=s*c-o,f=s*o-c,m=a*h,d>=0)if(f>=-m)if(f<=m){const x=1/h;d*=x,f*=x,p=d*(d+s*f+2*o)+f*(s*d+f+2*c)+u}else f=a,d=Math.max(0,-(s*f+o)),p=-d*d+f*(f+2*c)+u;else f=-a,d=Math.max(0,-(s*f+o)),p=-d*d+f*(f+2*c)+u;else f<=-m?(d=Math.max(0,-(-s*a+o)),f=d>0?-a:Math.min(Math.max(-a,-c),a),p=-d*d+f*(f+2*c)+u):f<=m?(d=0,f=Math.min(Math.max(-a,-c),a),p=f*(f+2*c)+u):(d=Math.max(0,-(s*a+o)),f=d>0?a:Math.min(Math.max(-a,-c),a),p=-d*d+f*(f+2*c)+u);else f=s>0?-a:a,d=Math.max(0,-(s*f+o)),p=-d*d+f*(f+2*c)+u;return i&&i.copy(this.origin).addScaledVector(this.direction,d),r&&r.copy(Qs).addScaledVector(Pa,f),p}intersectSphere(e,t){if(e.radius<0)return null;pi.subVectors(e.center,this.origin);const i=pi.dot(this.direction),r=pi.dot(pi)-i*i,a=e.radius*e.radius;if(r>a)return null;const s=Math.sqrt(a-r),o=i-s,c=i+s;return c<0?null:o<0?this.at(c,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(e.normal)+e.constant)/t;return i>=0?i:null}intersectPlane(e,t){const i=this.distanceToPlane(e);return i===null?null:this.at(i,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let i,r,a,s,o,c;const u=1/this.direction.x,h=1/this.direction.y,d=1/this.direction.z,f=this.origin;return u>=0?(i=(e.min.x-f.x)*u,r=(e.max.x-f.x)*u):(i=(e.max.x-f.x)*u,r=(e.min.x-f.x)*u),h>=0?(a=(e.min.y-f.y)*h,s=(e.max.y-f.y)*h):(a=(e.max.y-f.y)*h,s=(e.min.y-f.y)*h),i>s||a>r||((a>i||isNaN(i))&&(i=a),(s<r||isNaN(r))&&(r=s),d>=0?(o=(e.min.z-f.z)*d,c=(e.max.z-f.z)*d):(o=(e.max.z-f.z)*d,c=(e.min.z-f.z)*d),i>c||o>r)||((o>i||i!==i)&&(i=o),(c<r||r!==r)&&(r=c),r<0)?null:this.at(i>=0?i:r,t)}intersectsBox(e){return this.intersectBox(e,pi)!==null}intersectTriangle(e,t,i,r,a){const s=this.origin,o=this.direction,c=o.x,u=o.y,h=o.z,d=e.x-s.x,f=e.y-s.y,p=e.z-s.z,m=t.x-s.x,x=t.y-s.y,_=t.z-s.z,g=i.x-s.x,M=i.y-s.y,E=i.z-s.z,b=Math.abs(c),R=Math.abs(u),w=Math.abs(h);let D,S,y,L,C,N,U,I,B,V,$,ae;if(b>=R&&b>=w?(y=c,N=d,B=m,ae=g,c>=0?(D=u,S=h,L=f,C=p,U=x,I=_,V=M,$=E):(D=h,S=u,L=p,C=f,U=_,I=x,V=E,$=M)):R>=w?(y=u,N=f,B=x,ae=M,u>=0?(D=h,S=c,L=p,C=d,U=_,I=m,V=E,$=g):(D=c,S=h,L=d,C=p,U=m,I=_,V=g,$=E)):(y=h,N=p,B=_,ae=E,h>=0?(D=c,S=u,L=d,C=f,U=m,I=x,V=g,$=M):(D=u,S=c,L=f,C=d,U=x,I=m,V=M,$=g)),y===0)return null;const q=D/y,ee=S/y,O=1/y,re=L-q*N,ue=C-ee*N,Ce=U-q*B,Fe=I-ee*B,He=V-q*ae,j=$-ee*ae,ie=He*Fe-j*Ce,G=re*j-ue*He,he=Ce*ue-Fe*re;if(r){if(ie<0||G<0||he<0)return null}else if((ie<0||G<0||he<0)&&(ie>0||G>0||he>0))return null;const se=ie+G+he;if(se===0)return null;const ye=O*(ie*N+G*B+he*ae);return(se>0?ye<0:ye>0)?null:this.at(ye/se,a)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Bu extends _s{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new ct(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new ar,this.combine=mu,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const uc=new Ft,Yi=new Ip,Na=new bl,hc=new Y,Ua=new Y,Oa=new Y,Fa=new Y,js=new Y,Ba=new Y,dc=new Y,ka=new Y;class dn extends Sn{constructor(e=new si,t=new Bu){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const r=t[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let a=0,s=r.length;a<s;a++){const o=r[a].name||String(a);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=a}}}}getVertexPosition(e,t){const i=this.geometry,r=i.attributes.position,a=i.morphAttributes.position,s=i.morphTargetsRelative;t.fromBufferAttribute(r,e);const o=this.morphTargetInfluences;if(a&&o){Ba.set(0,0,0);for(let c=0,u=a.length;c<u;c++){const h=o[c],d=a[c];h!==0&&(js.fromBufferAttribute(d,e),s?Ba.addScaledVector(js,h):Ba.addScaledVector(js.sub(t),h))}t.add(Ba)}return t}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){const i=this.geometry,r=this.material,a=this.matrixWorld;r!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),Na.copy(i.boundingSphere),Na.applyMatrix4(a),Yi.copy(e.ray).recast(e.near),!(Na.containsPoint(Yi.origin)===!1&&(Yi.intersectSphere(Na,hc)===null||Yi.origin.distanceToSquared(hc)>(e.far-e.near)**2))&&(uc.copy(a).invert(),Yi.copy(e.ray).applyMatrix4(uc),!(i.boundingBox!==null&&Yi.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,t,Yi)))}_computeIntersections(e,t,i){let r;const a=this.geometry,s=this.material,o=a.index,c=a.attributes.position,u=a.attributes.uv,h=a.attributes.uv1,d=a.attributes.normal,f=a.groups,p=a.drawRange;if(o!==null)if(Array.isArray(s))for(let m=0,x=f.length;m<x;m++){const _=f[m],g=s[_.materialIndex],M=Math.max(_.start,p.start),E=Math.min(o.count,Math.min(_.start+_.count,p.start+p.count));for(let b=M,R=E;b<R;b+=3){const w=o.getX(b),D=o.getX(b+1),S=o.getX(b+2);r=za(this,g,e,i,u,h,d,w,D,S),r&&(r.faceIndex=Math.floor(b/3),r.face.materialIndex=_.materialIndex,t.push(r))}}else{const m=Math.max(0,p.start),x=Math.min(o.count,p.start+p.count);for(let _=m,g=x;_<g;_+=3){const M=o.getX(_),E=o.getX(_+1),b=o.getX(_+2);r=za(this,s,e,i,u,h,d,M,E,b),r&&(r.faceIndex=Math.floor(_/3),t.push(r))}}else if(c!==void 0)if(Array.isArray(s))for(let m=0,x=f.length;m<x;m++){const _=f[m],g=s[_.materialIndex],M=Math.max(_.start,p.start),E=Math.min(c.count,Math.min(_.start+_.count,p.start+p.count));for(let b=M,R=E;b<R;b+=3){const w=b,D=b+1,S=b+2;r=za(this,g,e,i,u,h,d,w,D,S),r&&(r.faceIndex=Math.floor(b/3),r.face.materialIndex=_.materialIndex,t.push(r))}}else{const m=Math.max(0,p.start),x=Math.min(c.count,p.start+p.count);for(let _=m,g=x;_<g;_+=3){const M=_,E=_+1,b=_+2;r=za(this,s,e,i,u,h,d,M,E,b),r&&(r.faceIndex=Math.floor(_/3),t.push(r))}}}}function Np(n,e,t,i,r,a,s,o){let c;if(e.side===gn?c=i.intersectTriangle(s,a,r,!0,o):c=i.intersectTriangle(r,a,s,e.side===nr,o),c===null)return null;ka.copy(o),ka.applyMatrix4(n.matrixWorld);const u=t.ray.origin.distanceTo(ka);return u<t.near||u>t.far?null:{distance:u,point:ka.clone(),object:n}}function za(n,e,t,i,r,a,s,o,c,u){n.getVertexPosition(o,Ua),n.getVertexPosition(c,Oa),n.getVertexPosition(u,Fa);const h=Np(n,e,t,i,Ua,Oa,Fa,dc);if(h){const d=new Y;Fn.getBarycoord(dc,Ua,Oa,Fa,d),r&&(h.uv=Fn.getInterpolatedAttribute(r,o,c,u,d,new We)),a&&(h.uv1=Fn.getInterpolatedAttribute(a,o,c,u,d,new We)),s&&(h.normal=Fn.getInterpolatedAttribute(s,o,c,u,d,new Y),h.normal.dot(i.direction)>0&&h.normal.multiplyScalar(-1));const f={a:o,b:c,c:u,normal:new Y,materialIndex:0};Fn.getNormal(Ua,Oa,Fa,f.normal),h.face=f,h.barycoord=d}return h}class Tr extends hn{constructor(e=null,t=1,i=1,r,a,s,o,c,u=Wt,h=Wt,d,f){super(null,s,o,c,u,h,r,a,d,f),this.isDataTexture=!0,this.image={data:e,width:t,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class ku extends ni{constructor(e,t,i,r=1){super(e,t,i),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=r}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const Xi=new bl,Up=new We(.5,.5),Ha=new Y;class El{constructor(e=new Fi,t=new Fi,i=new Fi,r=new Fi,a=new Fi,s=new Fi){this.planes=[e,t,i,r,a,s]}set(e,t,i,r,a,s){const o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(i),o[3].copy(r),o[4].copy(a),o[5].copy(s),this}copy(e){const t=this.planes;for(let i=0;i<6;i++)t[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,t=ei,i=!1){const r=this.planes,a=e.elements,s=a[0],o=a[1],c=a[2],u=a[3],h=a[4],d=a[5],f=a[6],p=a[7],m=a[8],x=a[9],_=a[10],g=a[11],M=a[12],E=a[13],b=a[14],R=a[15];if(r[0].setComponents(u-s,p-h,g-m,R-M).normalize(),r[1].setComponents(u+s,p+h,g+m,R+M).normalize(),r[2].setComponents(u+o,p+d,g+x,R+E).normalize(),r[3].setComponents(u-o,p-d,g-x,R-E).normalize(),i)r[4].setComponents(c,f,_,b).normalize(),r[5].setComponents(u-c,p-f,g-_,R-b).normalize();else if(r[4].setComponents(u-c,p-f,g-_,R-b).normalize(),t===ei)r[5].setComponents(u+c,p+f,g+_,R+b).normalize();else if(t===us)r[5].setComponents(c,f,_,b).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Xi.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Xi.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Xi)}intersectsSprite(e){Xi.center.set(0,0,0);const t=Up.distanceTo(e.center);return Xi.radius=.7071067811865476+t,Xi.applyMatrix4(e.matrixWorld),this.intersectsSphere(Xi)}intersectsSphere(e){const t=this.planes,i=e.center,r=-e.radius;for(let a=0;a<6;a++)if(t[a].distanceToPoint(i)<r)return!1;return!0}intersectsBox(e){const t=this.planes;for(let i=0;i<6;i++){const r=t[i];if(Ha.x=r.normal.x>0?e.max.x:e.min.x,Ha.y=r.normal.y>0?e.max.y:e.min.y,Ha.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(Ha)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let i=0;i<6;i++)if(t[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class zu extends hn{constructor(e=[],t=ir,i,r,a,s,o,c,u,h){super(e,t,i,r,a,s,o,c,u,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class da extends hn{constructor(e,t,i=ri,r,a,s,o=Wt,c=Wt,u,h=wi,d=1){if(h!==wi&&h!==ji)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const f={width:e,height:t,depth:d};super(f,r,a,s,o,c,h,i,u),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new Sl(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return t.compareFunction=this.compareFunction,t}}class Op extends da{constructor(e,t=ri,i=ir,r,a,s=Wt,o=Wt,c,u=wi){const h={width:e,height:e,depth:1},d=[h,h,h,h,h,h];super(e,e,t,i,r,a,s,o,c,u),this.image=d,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}}class Hu extends hn{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}}class ga extends si{constructor(e=1,t=1,i=1,r=1,a=1,s=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:i,widthSegments:r,heightSegments:a,depthSegments:s};const o=this;r=Math.floor(r),a=Math.floor(a),s=Math.floor(s);const c=[],u=[],h=[],d=[];let f=0,p=0;m("z","y","x",-1,-1,i,t,e,s,a,0),m("z","y","x",1,-1,i,t,-e,s,a,1),m("x","z","y",1,1,e,i,t,r,s,2),m("x","z","y",1,-1,e,i,-t,r,s,3),m("x","y","z",1,-1,e,t,i,r,a,4),m("x","y","z",-1,-1,e,t,-i,r,a,5),this.setIndex(c),this.setAttribute("position",new Ei(u,3)),this.setAttribute("normal",new Ei(h,3)),this.setAttribute("uv",new Ei(d,2));function m(x,_,g,M,E,b,R,w,D,S,y){const L=b/D,C=R/S,N=b/2,U=R/2,I=w/2,B=D+1,V=S+1;let $=0,ae=0;const q=new Y;for(let ee=0;ee<V;ee++){const O=ee*C-U;for(let re=0;re<B;re++){const ue=re*L-N;q[x]=ue*M,q[_]=O*E,q[g]=I,u.push(q.x,q.y,q.z),q[x]=0,q[_]=0,q[g]=w>0?1:-1,h.push(q.x,q.y,q.z),d.push(re/D),d.push(1-ee/S),$+=1}}for(let ee=0;ee<S;ee++)for(let O=0;O<D;O++){const re=f+O+B*ee,ue=f+O+B*(ee+1),Ce=f+(O+1)+B*(ee+1),Fe=f+(O+1)+B*ee;c.push(re,ue,Fe),c.push(ue,Ce,Fe),ae+=6}o.addGroup(p,ae,y),p+=ae,f+=$}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ga(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}class oi extends si{constructor(e=1,t=1,i=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:i,heightSegments:r};const a=e/2,s=t/2,o=Math.floor(i),c=Math.floor(r),u=o+1,h=c+1,d=e/o,f=t/c,p=[],m=[],x=[],_=[];for(let g=0;g<h;g++){const M=g*f-s;for(let E=0;E<u;E++){const b=E*d-a;m.push(b,-M,0),x.push(0,0,1),_.push(E/o),_.push(1-g/c)}}for(let g=0;g<c;g++)for(let M=0;M<o;M++){const E=M+u*g,b=M+u*(g+1),R=M+1+u*(g+1),w=M+1+u*g;p.push(E,b,w),p.push(b,R,w)}this.setIndex(p),this.setAttribute("position",new Ei(m,3)),this.setAttribute("normal",new Ei(x,3)),this.setAttribute("uv",new Ei(_,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new oi(e.width,e.height,e.widthSegments,e.heightSegments)}}function Ur(n){const e={};for(const t in n){e[t]={};for(const i in n[t]){const r=n[t][i];if(fc(r))r.isRenderTargetTexture?(Ge("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][i]=null):e[t][i]=r.clone();else if(Array.isArray(r))if(fc(r[0])){const a=[];for(let s=0,o=r.length;s<o;s++)a[s]=r[s].clone();e[t][i]=a}else e[t][i]=r.slice();else e[t][i]=r}}return e}function cn(n){const e={};for(let t=0;t<n.length;t++){const i=Ur(n[t]);for(const r in i)e[r]=i[r]}return e}function fc(n){return n&&(n.isColor||n.isMatrix3||n.isMatrix4||n.isVector2||n.isVector3||n.isVector4||n.isTexture||n.isQuaternion)}function Fp(n){const e=[];for(let t=0;t<n.length;t++)e.push(n[t].clone());return e}function Gu(n){const e=n.getRenderTarget();return e===null?n.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:nt.workingColorSpace}const Bp={clone:Ur,merge:cn};var kp=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,zp=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class on extends _s{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=kp,this.fragmentShader=zp,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Ur(e.uniforms),this.uniformsGroups=Fp(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const r in this.uniforms){const s=this.uniforms[r].value;s&&s.isTexture?t.uniforms[r]={type:"t",value:s.toJSON(e).uuid}:s&&s.isColor?t.uniforms[r]={type:"c",value:s.getHex()}:s&&s.isVector2?t.uniforms[r]={type:"v2",value:s.toArray()}:s&&s.isVector3?t.uniforms[r]={type:"v3",value:s.toArray()}:s&&s.isVector4?t.uniforms[r]={type:"v4",value:s.toArray()}:s&&s.isMatrix3?t.uniforms[r]={type:"m3",value:s.toArray()}:s&&s.isMatrix4?t.uniforms[r]={type:"m4",value:s.toArray()}:t.uniforms[r]={value:s}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const i={};for(const r in this.extensions)this.extensions[r]===!0&&(i[r]=!0);return Object.keys(i).length>0&&(t.extensions=i),t}fromJSON(e,t){if(super.fromJSON(e,t),e.uniforms!==void 0)for(const i in e.uniforms){const r=e.uniforms[i];switch(this.uniforms[i]={},r.type){case"t":this.uniforms[i].value=t[r.value]||null;break;case"c":this.uniforms[i].value=new ct().setHex(r.value);break;case"v2":this.uniforms[i].value=new We().fromArray(r.value);break;case"v3":this.uniforms[i].value=new Y().fromArray(r.value);break;case"v4":this.uniforms[i].value=new Dt().fromArray(r.value);break;case"m3":this.uniforms[i].value=new Ve().fromArray(r.value);break;case"m4":this.uniforms[i].value=new Ft().fromArray(r.value);break;default:this.uniforms[i].value=r.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(const i in e.extensions)this.extensions[i]=e.extensions[i];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}}class Hp extends on{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class Gp extends _s{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Q0,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class Vp extends _s{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const Ga=new Y,Va=new kr,Wn=new Y;class Vu extends Sn{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Ft,this.projectionMatrix=new Ft,this.projectionMatrixInverse=new Ft,this.coordinateSystem=ei,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(Ga,Va,Wn),Wn.x===1&&Wn.y===1&&Wn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Ga,Va,Wn.set(1,1,1)).invert()}updateWorldMatrix(e,t,i=!1){super.updateWorldMatrix(e,t,i),this.matrixWorld.decompose(Ga,Va,Wn),Wn.x===1&&Wn.y===1&&Wn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Ga,Va,Wn.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}const Oi=new Y,pc=new We,mc=new We;class An extends Vu{constructor(e=50,t=1,i=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=Jo*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(Ps*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Jo*2*Math.atan(Math.tan(Ps*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,i){Oi.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Oi.x,Oi.y).multiplyScalar(-e/Oi.z),Oi.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(Oi.x,Oi.y).multiplyScalar(-e/Oi.z)}getViewSize(e,t){return this.getViewBounds(e,pc,mc),t.subVectors(mc,pc)}setViewOffset(e,t,i,r,a,s){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=r,this.view.width=a,this.view.height=s,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(Ps*.5*this.fov)/this.zoom,i=2*t,r=this.aspect*i,a=-.5*r;const s=this.view;if(this.view!==null&&this.view.enabled){const c=s.fullWidth,u=s.fullHeight;a+=s.offsetX*r/c,t-=s.offsetY*i/u,r*=s.width/c,i*=s.height/u}const o=this.filmOffset;o!==0&&(a+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(a,a+r,t,t-i,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}class yl extends Vu{constructor(e=-1,t=1,i=1,r=-1,a=.1,s=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=i,this.bottom=r,this.near=a,this.far=s,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,i,r,a,s){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=r,this.view.width=a,this.view.height=s,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,r=(this.top+this.bottom)/2;let a=i-e,s=i+e,o=r+t,c=r-t;if(this.view!==null&&this.view.enabled){const u=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;a+=u*this.view.offsetX,s=a+u*this.view.width,o-=h*this.view.offsetY,c=o-h*this.view.height}this.projectionMatrix.makeOrthographic(a,s,o,c,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}class Wu extends si{constructor(){super(),this.isInstancedBufferGeometry=!0,this.type="InstancedBufferGeometry",this.instanceCount=1/0}copy(e){return super.copy(e),this.instanceCount=e.instanceCount,this}toJSON(){const e=super.toJSON();return e.instanceCount=this.instanceCount,e.isInstancedBufferGeometry=!0,e}}const vr=-90,Sr=1;class Wp extends Sn{constructor(e,t,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const r=new An(vr,Sr,e,t);r.layers=this.layers,this.add(r);const a=new An(vr,Sr,e,t);a.layers=this.layers,this.add(a);const s=new An(vr,Sr,e,t);s.layers=this.layers,this.add(s);const o=new An(vr,Sr,e,t);o.layers=this.layers,this.add(o);const c=new An(vr,Sr,e,t);c.layers=this.layers,this.add(c);const u=new An(vr,Sr,e,t);u.layers=this.layers,this.add(u)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[i,r,a,s,o,c]=t;for(const u of t)this.remove(u);if(e===ei)i.up.set(0,1,0),i.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),a.up.set(0,0,-1),a.lookAt(0,1,0),s.up.set(0,0,1),s.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(e===us)i.up.set(0,-1,0),i.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),a.up.set(0,0,1),a.lookAt(0,1,0),s.up.set(0,0,-1),s.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const u of t)this.add(u),u.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[a,s,o,c,u,h]=this.children,d=e.getRenderTarget(),f=e.getActiveCubeFace(),p=e.getActiveMipmapLevel(),m=e.xr.enabled;e.xr.enabled=!1;const x=i.texture.generateMipmaps;i.texture.generateMipmaps=!1;let _=!1;e.isWebGLRenderer===!0?_=e.state.buffers.depth.getReversed():_=e.reversedDepthBuffer,e.setRenderTarget(i,0,r),_&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(i,1,r),_&&e.autoClear===!1&&e.clearDepth(),e.render(t,s),e.setRenderTarget(i,2,r),_&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(i,3,r),_&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),e.setRenderTarget(i,4,r),_&&e.autoClear===!1&&e.clearDepth(),e.render(t,u),i.texture.generateMipmaps=x,e.setRenderTarget(i,5,r),_&&e.autoClear===!1&&e.clearDepth(),e.render(t,h),e.setRenderTarget(d,f,p),e.xr.enabled=m,i.texture.needsPMREMUpdate=!0}}class Yp extends An{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}class Yu{static{Yu.prototype.isMatrix2=!0}constructor(e,t,i,r){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,i,r)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let i=0;i<4;i++)this.elements[i]=e[i+t];return this}set(e,t,i,r){const a=this.elements;return a[0]=e,a[2]=t,a[1]=i,a[3]=r,this}}function gc(n,e,t,i){const r=Xp(i);switch(t){case Ru:return n*e;case Lu:return n*e/r.components*r.byteLength;case gl:return n*e/r.components*r.byteLength;case rr:return n*e*2/r.components*r.byteLength;case _l:return n*e*2/r.components*r.byteLength;case Cu:return n*e*3/r.components*r.byteLength;case Rn:return n*e*4/r.components*r.byteLength;case xl:return n*e*4/r.components*r.byteLength;case es:case ts:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case ns:case is:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case bo:case yo:return Math.max(n,16)*Math.max(e,8)/4;case So:case Eo:return Math.max(n,8)*Math.max(e,8)/2;case wo:case Ao:case Ro:case Co:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case To:case os:case Lo:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case Do:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case Po:return Math.floor((n+4)/5)*Math.floor((e+3)/4)*16;case Io:return Math.floor((n+4)/5)*Math.floor((e+4)/5)*16;case No:return Math.floor((n+5)/6)*Math.floor((e+4)/5)*16;case Uo:return Math.floor((n+5)/6)*Math.floor((e+5)/6)*16;case Oo:return Math.floor((n+7)/8)*Math.floor((e+4)/5)*16;case Fo:return Math.floor((n+7)/8)*Math.floor((e+5)/6)*16;case Bo:return Math.floor((n+7)/8)*Math.floor((e+7)/8)*16;case ko:return Math.floor((n+9)/10)*Math.floor((e+4)/5)*16;case zo:return Math.floor((n+9)/10)*Math.floor((e+5)/6)*16;case Ho:return Math.floor((n+9)/10)*Math.floor((e+7)/8)*16;case Go:return Math.floor((n+9)/10)*Math.floor((e+9)/10)*16;case Vo:return Math.floor((n+11)/12)*Math.floor((e+9)/10)*16;case Wo:return Math.floor((n+11)/12)*Math.floor((e+11)/12)*16;case Yo:case Xo:case Ko:return Math.ceil(n/4)*Math.ceil(e/4)*16;case qo:case Zo:return Math.ceil(n/4)*Math.ceil(e/4)*8;case ls:case $o:return Math.ceil(n/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function Xp(n){switch(n){case vn:case yu:return{byteLength:1,components:1};case ca:case wu:case ai:return{byteLength:2,components:1};case pl:case ml:return{byteLength:2,components:4};case ri:case fl:case jn:return{byteLength:4,components:1};case Au:case Tu:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${n}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:dl}}));typeof window<"u"&&(window.__THREE__?Ge("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=dl);function Xu(){let n=null,e=!1,t=null,i=null;function r(a,s){i=n.requestAnimationFrame(r),t(a,s)}return{start:function(){e!==!0&&t!==null&&n!==null&&(i=n.requestAnimationFrame(r),e=!0)},stop:function(){n!==null&&n.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(a){t=a},setContext:function(a){n=a}}}function Kp(n){const e=new WeakMap;function t(o,c){const u=o.array,h=o.usage,d=u.byteLength,f=n.createBuffer();n.bindBuffer(c,f),n.bufferData(c,u,h),o.onUploadCallback();let p;if(u instanceof Float32Array)p=n.FLOAT;else if(typeof Float16Array<"u"&&u instanceof Float16Array)p=n.HALF_FLOAT;else if(u instanceof Uint16Array)o.isFloat16BufferAttribute?p=n.HALF_FLOAT:p=n.UNSIGNED_SHORT;else if(u instanceof Int16Array)p=n.SHORT;else if(u instanceof Uint32Array)p=n.UNSIGNED_INT;else if(u instanceof Int32Array)p=n.INT;else if(u instanceof Int8Array)p=n.BYTE;else if(u instanceof Uint8Array)p=n.UNSIGNED_BYTE;else if(u instanceof Uint8ClampedArray)p=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+u);return{buffer:f,type:p,bytesPerElement:u.BYTES_PER_ELEMENT,version:o.version,size:d}}function i(o,c,u){const h=c.array,d=c.updateRanges;if(n.bindBuffer(u,o),d.length===0)n.bufferSubData(u,0,h);else{d.sort((p,m)=>p.start-m.start);let f=0;for(let p=1;p<d.length;p++){const m=d[f],x=d[p];x.start<=m.start+m.count+1?m.count=Math.max(m.count,x.start+x.count-m.start):(++f,d[f]=x)}d.length=f+1;for(let p=0,m=d.length;p<m;p++){const x=d[p];n.bufferSubData(u,x.start*h.BYTES_PER_ELEMENT,h,x.start,x.count)}c.clearUpdateRanges()}c.onUploadCallback()}function r(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function a(o){o.isInterleavedBufferAttribute&&(o=o.data);const c=e.get(o);c&&(n.deleteBuffer(c.buffer),e.delete(o))}function s(o,c){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const h=e.get(o);(!h||h.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const u=e.get(o);if(u===void 0)e.set(o,t(o,c));else if(u.version<o.version){if(u.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(u.buffer,o,c),u.version=o.version}}return{get:r,remove:a,update:s}}var qp=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Zp=`#ifdef USE_ALPHAHASH
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
#endif`,$p=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Jp=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Qp=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,jp=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,em=`#ifdef USE_AOMAP
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
#endif`,tm=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,nm=`#ifdef USE_BATCHING
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
#endif`,im=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,rm=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,am=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,sm=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,om=`#ifdef USE_IRIDESCENCE
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
#endif`,lm=`#ifdef USE_BUMPMAP
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
#endif`,cm=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,um=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,hm=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,dm=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,fm=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,pm=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,mm=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,gm=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
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
#endif`,_m=`#define PI 3.141592653589793
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
} // validated`,xm=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,Mm=`vec3 transformedNormal = objectNormal;
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
#endif`,vm=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Sm=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,bm=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Em=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,ym="gl_FragColor = linearToOutputTexel( gl_FragColor );",wm=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Am=`#ifdef USE_ENVMAP
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
#endif`,Tm=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,Rm=`#ifdef USE_ENVMAP
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
#endif`,Cm=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Lm=`#ifdef USE_ENVMAP
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
#endif`,Dm=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Pm=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Im=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Nm=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Um=`#ifdef USE_GRADIENTMAP
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
}`,Om=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Fm=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Bm=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,km=`uniform bool receiveShadow;
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
#include <lightprobes_pars_fragment>`,zm=`#ifdef USE_ENVMAP
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
#endif`,Hm=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Gm=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Vm=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Wm=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Ym=`PhysicalMaterial material;
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
#endif`,Xm=`uniform sampler2D dfgLUT;
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
}`,Km=`
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
#endif`,qm=`#if defined( RE_IndirectDiffuse )
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
#endif`,Zm=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,$m=`#ifdef USE_LIGHT_PROBES_GRID
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
#endif`,Jm=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Qm=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,jm=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,eg=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,tg=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,ng=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,ig=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,rg=`#if defined( USE_POINTS_UV )
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
#endif`,ag=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,sg=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,og=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,lg=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,cg=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,ug=`#ifdef USE_MORPHTARGETS
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
#endif`,hg=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,dg=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,fg=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,pg=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,mg=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,gg=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,_g=`#ifdef USE_NORMALMAP
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
#endif`,xg=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Mg=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,vg=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Sg=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,bg=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Eg=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,yg=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,wg=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Ag=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Tg=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Rg=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Cg=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Lg=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Dg=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Pg=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,Ig=`float getShadowMask() {
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
}`,Ng=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Ug=`#ifdef USE_SKINNING
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
#endif`,Og=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Fg=`#ifdef USE_SKINNING
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
#endif`,Bg=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,kg=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,zg=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Hg=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,Gg=`#ifdef USE_TRANSMISSION
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
#endif`,Vg=`#ifdef USE_TRANSMISSION
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
#endif`,Wg=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Yg=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Xg=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Kg=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const qg=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Zg=`uniform sampler2D t2D;
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
}`,$g=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Jg=`#ifdef ENVMAP_TYPE_CUBE
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
}`,Qg=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,jg=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,e1=`#include <common>
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
}`,t1=`#if DEPTH_PACKING == 3200
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
}`,n1=`#define DISTANCE
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
}`,i1=`#define DISTANCE
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
}`,r1=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,a1=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,s1=`uniform float scale;
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
}`,o1=`uniform vec3 diffuse;
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
}`,l1=`#include <common>
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
}`,c1=`uniform vec3 diffuse;
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
}`,u1=`#define LAMBERT
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
}`,h1=`#define LAMBERT
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
}`,d1=`#define MATCAP
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
}`,f1=`#define MATCAP
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
}`,p1=`#define NORMAL
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
}`,m1=`#define NORMAL
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
}`,g1=`#define PHONG
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
}`,_1=`#define PHONG
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
}`,x1=`#define STANDARD
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
}`,M1=`#define STANDARD
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
}`,v1=`#define TOON
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
}`,S1=`#define TOON
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
}`,b1=`uniform float size;
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
}`,E1=`uniform vec3 diffuse;
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
}`,y1=`#include <common>
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
}`,w1=`uniform vec3 color;
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
}`,A1=`uniform float rotation;
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
}`,T1=`uniform vec3 diffuse;
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
}`,je={alphahash_fragment:qp,alphahash_pars_fragment:Zp,alphamap_fragment:$p,alphamap_pars_fragment:Jp,alphatest_fragment:Qp,alphatest_pars_fragment:jp,aomap_fragment:em,aomap_pars_fragment:tm,batching_pars_vertex:nm,batching_vertex:im,begin_vertex:rm,beginnormal_vertex:am,bsdfs:sm,iridescence_fragment:om,bumpmap_pars_fragment:lm,clipping_planes_fragment:cm,clipping_planes_pars_fragment:um,clipping_planes_pars_vertex:hm,clipping_planes_vertex:dm,color_fragment:fm,color_pars_fragment:pm,color_pars_vertex:mm,color_vertex:gm,common:_m,cube_uv_reflection_fragment:xm,defaultnormal_vertex:Mm,displacementmap_pars_vertex:vm,displacementmap_vertex:Sm,emissivemap_fragment:bm,emissivemap_pars_fragment:Em,colorspace_fragment:ym,colorspace_pars_fragment:wm,envmap_fragment:Am,envmap_common_pars_fragment:Tm,envmap_pars_fragment:Rm,envmap_pars_vertex:Cm,envmap_physical_pars_fragment:zm,envmap_vertex:Lm,fog_vertex:Dm,fog_pars_vertex:Pm,fog_fragment:Im,fog_pars_fragment:Nm,gradientmap_pars_fragment:Um,lightmap_pars_fragment:Om,lights_lambert_fragment:Fm,lights_lambert_pars_fragment:Bm,lights_pars_begin:km,lights_toon_fragment:Hm,lights_toon_pars_fragment:Gm,lights_phong_fragment:Vm,lights_phong_pars_fragment:Wm,lights_physical_fragment:Ym,lights_physical_pars_fragment:Xm,lights_fragment_begin:Km,lights_fragment_maps:qm,lights_fragment_end:Zm,lightprobes_pars_fragment:$m,logdepthbuf_fragment:Jm,logdepthbuf_pars_fragment:Qm,logdepthbuf_pars_vertex:jm,logdepthbuf_vertex:eg,map_fragment:tg,map_pars_fragment:ng,map_particle_fragment:ig,map_particle_pars_fragment:rg,metalnessmap_fragment:ag,metalnessmap_pars_fragment:sg,morphinstance_vertex:og,morphcolor_vertex:lg,morphnormal_vertex:cg,morphtarget_pars_vertex:ug,morphtarget_vertex:hg,normal_fragment_begin:dg,normal_fragment_maps:fg,normal_pars_fragment:pg,normal_pars_vertex:mg,normal_vertex:gg,normalmap_pars_fragment:_g,clearcoat_normal_fragment_begin:xg,clearcoat_normal_fragment_maps:Mg,clearcoat_pars_fragment:vg,iridescence_pars_fragment:Sg,opaque_fragment:bg,packing:Eg,premultiplied_alpha_fragment:yg,project_vertex:wg,dithering_fragment:Ag,dithering_pars_fragment:Tg,roughnessmap_fragment:Rg,roughnessmap_pars_fragment:Cg,shadowmap_pars_fragment:Lg,shadowmap_pars_vertex:Dg,shadowmap_vertex:Pg,shadowmask_pars_fragment:Ig,skinbase_vertex:Ng,skinning_pars_vertex:Ug,skinning_vertex:Og,skinnormal_vertex:Fg,specularmap_fragment:Bg,specularmap_pars_fragment:kg,tonemapping_fragment:zg,tonemapping_pars_fragment:Hg,transmission_fragment:Gg,transmission_pars_fragment:Vg,uv_pars_fragment:Wg,uv_pars_vertex:Yg,uv_vertex:Xg,worldpos_vertex:Kg,background_vert:qg,background_frag:Zg,backgroundCube_vert:$g,backgroundCube_frag:Jg,cube_vert:Qg,cube_frag:jg,depth_vert:e1,depth_frag:t1,distance_vert:n1,distance_frag:i1,equirect_vert:r1,equirect_frag:a1,linedashed_vert:s1,linedashed_frag:o1,meshbasic_vert:l1,meshbasic_frag:c1,meshlambert_vert:u1,meshlambert_frag:h1,meshmatcap_vert:d1,meshmatcap_frag:f1,meshnormal_vert:p1,meshnormal_frag:m1,meshphong_vert:g1,meshphong_frag:_1,meshphysical_vert:x1,meshphysical_frag:M1,meshtoon_vert:v1,meshtoon_frag:S1,points_vert:b1,points_frag:E1,shadow_vert:y1,shadow_frag:w1,sprite_vert:A1,sprite_frag:T1},Me={common:{diffuse:{value:new ct(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ve},alphaMap:{value:null},alphaMapTransform:{value:new Ve},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ve}},envmap:{envMap:{value:null},envMapRotation:{value:new Ve},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ve}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ve}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ve},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ve},normalScale:{value:new We(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ve},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ve}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ve}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ve}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new ct(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new Y},probesMax:{value:new Y},probesResolution:{value:new Y}},points:{diffuse:{value:new ct(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ve},alphaTest:{value:0},uvTransform:{value:new Ve}},sprite:{diffuse:{value:new ct(16777215)},opacity:{value:1},center:{value:new We(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ve},alphaMap:{value:null},alphaMapTransform:{value:new Ve},alphaTest:{value:0}}},$n={basic:{uniforms:cn([Me.common,Me.specularmap,Me.envmap,Me.aomap,Me.lightmap,Me.fog]),vertexShader:je.meshbasic_vert,fragmentShader:je.meshbasic_frag},lambert:{uniforms:cn([Me.common,Me.specularmap,Me.envmap,Me.aomap,Me.lightmap,Me.emissivemap,Me.bumpmap,Me.normalmap,Me.displacementmap,Me.fog,Me.lights,{emissive:{value:new ct(0)},envMapIntensity:{value:1}}]),vertexShader:je.meshlambert_vert,fragmentShader:je.meshlambert_frag},phong:{uniforms:cn([Me.common,Me.specularmap,Me.envmap,Me.aomap,Me.lightmap,Me.emissivemap,Me.bumpmap,Me.normalmap,Me.displacementmap,Me.fog,Me.lights,{emissive:{value:new ct(0)},specular:{value:new ct(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:je.meshphong_vert,fragmentShader:je.meshphong_frag},standard:{uniforms:cn([Me.common,Me.envmap,Me.aomap,Me.lightmap,Me.emissivemap,Me.bumpmap,Me.normalmap,Me.displacementmap,Me.roughnessmap,Me.metalnessmap,Me.fog,Me.lights,{emissive:{value:new ct(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:je.meshphysical_vert,fragmentShader:je.meshphysical_frag},toon:{uniforms:cn([Me.common,Me.aomap,Me.lightmap,Me.emissivemap,Me.bumpmap,Me.normalmap,Me.displacementmap,Me.gradientmap,Me.fog,Me.lights,{emissive:{value:new ct(0)}}]),vertexShader:je.meshtoon_vert,fragmentShader:je.meshtoon_frag},matcap:{uniforms:cn([Me.common,Me.bumpmap,Me.normalmap,Me.displacementmap,Me.fog,{matcap:{value:null}}]),vertexShader:je.meshmatcap_vert,fragmentShader:je.meshmatcap_frag},points:{uniforms:cn([Me.points,Me.fog]),vertexShader:je.points_vert,fragmentShader:je.points_frag},dashed:{uniforms:cn([Me.common,Me.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:je.linedashed_vert,fragmentShader:je.linedashed_frag},depth:{uniforms:cn([Me.common,Me.displacementmap]),vertexShader:je.depth_vert,fragmentShader:je.depth_frag},normal:{uniforms:cn([Me.common,Me.bumpmap,Me.normalmap,Me.displacementmap,{opacity:{value:1}}]),vertexShader:je.meshnormal_vert,fragmentShader:je.meshnormal_frag},sprite:{uniforms:cn([Me.sprite,Me.fog]),vertexShader:je.sprite_vert,fragmentShader:je.sprite_frag},background:{uniforms:{uvTransform:{value:new Ve},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:je.background_vert,fragmentShader:je.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Ve}},vertexShader:je.backgroundCube_vert,fragmentShader:je.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:je.cube_vert,fragmentShader:je.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:je.equirect_vert,fragmentShader:je.equirect_frag},distance:{uniforms:cn([Me.common,Me.displacementmap,{referencePosition:{value:new Y},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:je.distance_vert,fragmentShader:je.distance_frag},shadow:{uniforms:cn([Me.lights,Me.fog,{color:{value:new ct(0)},opacity:{value:1}}]),vertexShader:je.shadow_vert,fragmentShader:je.shadow_frag}};$n.physical={uniforms:cn([$n.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ve},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ve},clearcoatNormalScale:{value:new We(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ve},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ve},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ve},sheen:{value:0},sheenColor:{value:new ct(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ve},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ve},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ve},transmissionSamplerSize:{value:new We},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ve},attenuationDistance:{value:0},attenuationColor:{value:new ct(0)},specularColor:{value:new ct(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ve},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ve},anisotropyVector:{value:new We},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ve}}]),vertexShader:je.meshphysical_vert,fragmentShader:je.meshphysical_frag};const Wa={r:0,b:0,g:0},R1=new Ft,Ku=new Ve;Ku.set(-1,0,0,0,1,0,0,0,1);function C1(n,e,t,i,r,a){const s=new ct(0);let o=r===!0?0:1,c,u,h=null,d=0,f=null;function p(M){let E=M.isScene===!0?M.background:null;if(E&&E.isTexture){const b=M.backgroundBlurriness>0;E=e.get(E,b)}return E}function m(M){let E=!1;const b=p(M);b===null?_(s,o):b&&b.isColor&&(_(b,1),E=!0);const R=n.xr.getEnvironmentBlendMode();R==="additive"?t.buffers.color.setClear(0,0,0,1,a):R==="alpha-blend"&&t.buffers.color.setClear(0,0,0,0,a),(n.autoClear||E)&&(t.buffers.depth.setTest(!0),t.buffers.depth.setMask(!0),t.buffers.color.setMask(!0),n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil))}function x(M,E){const b=p(E);b&&(b.isCubeTexture||b.mapping===gs)?(u===void 0&&(u=new dn(new ga(1,1,1),new on({name:"BackgroundCubeMaterial",uniforms:Ur($n.backgroundCube.uniforms),vertexShader:$n.backgroundCube.vertexShader,fragmentShader:$n.backgroundCube.fragmentShader,side:gn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),u.geometry.deleteAttribute("normal"),u.geometry.deleteAttribute("uv"),u.onBeforeRender=function(R,w,D){this.matrixWorld.copyPosition(D.matrixWorld)},Object.defineProperty(u.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(u)),u.material.uniforms.envMap.value=b,u.material.uniforms.backgroundBlurriness.value=E.backgroundBlurriness,u.material.uniforms.backgroundIntensity.value=E.backgroundIntensity,u.material.uniforms.backgroundRotation.value.setFromMatrix4(R1.makeRotationFromEuler(E.backgroundRotation)).transpose(),b.isCubeTexture&&b.isRenderTargetTexture===!1&&u.material.uniforms.backgroundRotation.value.premultiply(Ku),u.material.toneMapped=nt.getTransfer(b.colorSpace)!==gt,(h!==b||d!==b.version||f!==n.toneMapping)&&(u.material.needsUpdate=!0,h=b,d=b.version,f=n.toneMapping),u.layers.enableAll(),M.unshift(u,u.geometry,u.material,0,0,null)):b&&b.isTexture&&(c===void 0&&(c=new dn(new oi(2,2),new on({name:"BackgroundMaterial",uniforms:Ur($n.background.uniforms),vertexShader:$n.background.vertexShader,fragmentShader:$n.background.fragmentShader,side:nr,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(c)),c.material.uniforms.t2D.value=b,c.material.uniforms.backgroundIntensity.value=E.backgroundIntensity,c.material.toneMapped=nt.getTransfer(b.colorSpace)!==gt,b.matrixAutoUpdate===!0&&b.updateMatrix(),c.material.uniforms.uvTransform.value.copy(b.matrix),(h!==b||d!==b.version||f!==n.toneMapping)&&(c.material.needsUpdate=!0,h=b,d=b.version,f=n.toneMapping),c.layers.enableAll(),M.unshift(c,c.geometry,c.material,0,0,null))}function _(M,E){M.getRGB(Wa,Gu(n)),t.buffers.color.setClear(Wa.r,Wa.g,Wa.b,E,a)}function g(){u!==void 0&&(u.geometry.dispose(),u.material.dispose(),u=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return s},setClearColor:function(M,E=1){s.set(M),o=E,_(s,o)},getClearAlpha:function(){return o},setClearAlpha:function(M){o=M,_(s,o)},render:m,addToRenderList:x,dispose:g}}function L1(n,e){const t=n.getParameter(n.MAX_VERTEX_ATTRIBS),i={},r=f(null);let a=r,s=!1;function o(C,N,U,I,B){let V=!1;const $=d(C,I,U,N);a!==$&&(a=$,u(a.object)),V=p(C,I,U,B),V&&m(C,I,U,B),B!==null&&e.update(B,n.ELEMENT_ARRAY_BUFFER),(V||s)&&(s=!1,b(C,N,U,I),B!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,e.get(B).buffer))}function c(){return n.createVertexArray()}function u(C){return n.bindVertexArray(C)}function h(C){return n.deleteVertexArray(C)}function d(C,N,U,I){const B=I.wireframe===!0;let V=i[N.id];V===void 0&&(V={},i[N.id]=V);const $=C.isInstancedMesh===!0?C.id:0;let ae=V[$];ae===void 0&&(ae={},V[$]=ae);let q=ae[U.id];q===void 0&&(q={},ae[U.id]=q);let ee=q[B];return ee===void 0&&(ee=f(c()),q[B]=ee),ee}function f(C){const N=[],U=[],I=[];for(let B=0;B<t;B++)N[B]=0,U[B]=0,I[B]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:N,enabledAttributes:U,attributeDivisors:I,object:C,attributes:{},index:null}}function p(C,N,U,I){const B=a.attributes,V=N.attributes;let $=0;const ae=U.getAttributes();for(const q in ae)if(ae[q].location>=0){const O=B[q];let re=V[q];if(re===void 0&&(q==="instanceMatrix"&&C.instanceMatrix&&(re=C.instanceMatrix),q==="instanceColor"&&C.instanceColor&&(re=C.instanceColor)),O===void 0||O.attribute!==re||re&&O.data!==re.data)return!0;$++}return a.attributesNum!==$||a.index!==I}function m(C,N,U,I){const B={},V=N.attributes;let $=0;const ae=U.getAttributes();for(const q in ae)if(ae[q].location>=0){let O=V[q];O===void 0&&(q==="instanceMatrix"&&C.instanceMatrix&&(O=C.instanceMatrix),q==="instanceColor"&&C.instanceColor&&(O=C.instanceColor));const re={};re.attribute=O,O&&O.data&&(re.data=O.data),B[q]=re,$++}a.attributes=B,a.attributesNum=$,a.index=I}function x(){const C=a.newAttributes;for(let N=0,U=C.length;N<U;N++)C[N]=0}function _(C){g(C,0)}function g(C,N){const U=a.newAttributes,I=a.enabledAttributes,B=a.attributeDivisors;U[C]=1,I[C]===0&&(n.enableVertexAttribArray(C),I[C]=1),B[C]!==N&&(n.vertexAttribDivisor(C,N),B[C]=N)}function M(){const C=a.newAttributes,N=a.enabledAttributes;for(let U=0,I=N.length;U<I;U++)N[U]!==C[U]&&(n.disableVertexAttribArray(U),N[U]=0)}function E(C,N,U,I,B,V,$){$===!0?n.vertexAttribIPointer(C,N,U,B,V):n.vertexAttribPointer(C,N,U,I,B,V)}function b(C,N,U,I){x();const B=I.attributes,V=U.getAttributes(),$=N.defaultAttributeValues;for(const ae in V){const q=V[ae];if(q.location>=0){let ee=B[ae];if(ee===void 0&&(ae==="instanceMatrix"&&C.instanceMatrix&&(ee=C.instanceMatrix),ae==="instanceColor"&&C.instanceColor&&(ee=C.instanceColor)),ee!==void 0){const O=ee.normalized,re=ee.itemSize,ue=e.get(ee);if(ue===void 0)continue;const Ce=ue.buffer,Fe=ue.type,He=ue.bytesPerElement,j=Fe===n.INT||Fe===n.UNSIGNED_INT||ee.gpuType===fl;if(ee.isInterleavedBufferAttribute){const ie=ee.data,G=ie.stride,he=ee.offset;if(ie.isInstancedInterleavedBuffer){for(let se=0;se<q.locationSize;se++)g(q.location+se,ie.meshPerAttribute);C.isInstancedMesh!==!0&&I._maxInstanceCount===void 0&&(I._maxInstanceCount=ie.meshPerAttribute*ie.count)}else for(let se=0;se<q.locationSize;se++)_(q.location+se);n.bindBuffer(n.ARRAY_BUFFER,Ce);for(let se=0;se<q.locationSize;se++)E(q.location+se,re/q.locationSize,Fe,O,G*He,(he+re/q.locationSize*se)*He,j)}else{if(ee.isInstancedBufferAttribute){for(let ie=0;ie<q.locationSize;ie++)g(q.location+ie,ee.meshPerAttribute);C.isInstancedMesh!==!0&&I._maxInstanceCount===void 0&&(I._maxInstanceCount=ee.meshPerAttribute*ee.count)}else for(let ie=0;ie<q.locationSize;ie++)_(q.location+ie);n.bindBuffer(n.ARRAY_BUFFER,Ce);for(let ie=0;ie<q.locationSize;ie++)E(q.location+ie,re/q.locationSize,Fe,O,re*He,re/q.locationSize*ie*He,j)}}else if($!==void 0){const O=$[ae];if(O!==void 0)switch(O.length){case 2:n.vertexAttrib2fv(q.location,O);break;case 3:n.vertexAttrib3fv(q.location,O);break;case 4:n.vertexAttrib4fv(q.location,O);break;default:n.vertexAttrib1fv(q.location,O)}}}}M()}function R(){y();for(const C in i){const N=i[C];for(const U in N){const I=N[U];for(const B in I){const V=I[B];for(const $ in V)h(V[$].object),delete V[$];delete I[B]}}delete i[C]}}function w(C){if(i[C.id]===void 0)return;const N=i[C.id];for(const U in N){const I=N[U];for(const B in I){const V=I[B];for(const $ in V)h(V[$].object),delete V[$];delete I[B]}}delete i[C.id]}function D(C){for(const N in i){const U=i[N];for(const I in U){const B=U[I];if(B[C.id]===void 0)continue;const V=B[C.id];for(const $ in V)h(V[$].object),delete V[$];delete B[C.id]}}}function S(C){for(const N in i){const U=i[N],I=C.isInstancedMesh===!0?C.id:0,B=U[I];if(B!==void 0){for(const V in B){const $=B[V];for(const ae in $)h($[ae].object),delete $[ae];delete B[V]}delete U[I],Object.keys(U).length===0&&delete i[N]}}}function y(){L(),s=!0,a!==r&&(a=r,u(a.object))}function L(){r.geometry=null,r.program=null,r.wireframe=!1}return{setup:o,reset:y,resetDefaultState:L,dispose:R,releaseStatesOfGeometry:w,releaseStatesOfObject:S,releaseStatesOfProgram:D,initAttributes:x,enableAttribute:_,disableUnusedAttributes:M}}function D1(n,e,t){let i;function r(c){i=c}function a(c,u){n.drawArrays(i,c,u),t.update(u,i,1)}function s(c,u,h){h!==0&&(n.drawArraysInstanced(i,c,u,h),t.update(u,i,h))}function o(c,u,h){if(h===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,c,0,u,0,h);let f=0;for(let p=0;p<h;p++)f+=u[p];t.update(f,i,1)}this.setMode=r,this.render=a,this.renderInstances=s,this.renderMultiDraw=o}function P1(n,e,t,i){let r;function a(){if(r!==void 0)return r;if(e.has("EXT_texture_filter_anisotropic")===!0){const D=e.get("EXT_texture_filter_anisotropic");r=n.getParameter(D.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else r=0;return r}function s(D){return!(D!==Rn&&i.convert(D)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(D){const S=D===ai&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(D!==vn&&D!==jn&&!S&&i.convert(D)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_TYPE))}function c(D){if(D==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";D="mediump"}return D==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let u=t.precision!==void 0?t.precision:"highp";const h=c(u);h!==u&&(Ge("WebGLRenderer:",u,"not supported, using",h,"instead."),u=h);const d=t.logarithmicDepthBuffer===!0,f=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control");t.reversedDepthBuffer===!0&&f===!1&&Ge("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");const p=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),m=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),x=n.getParameter(n.MAX_TEXTURE_SIZE),_=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),g=n.getParameter(n.MAX_VERTEX_ATTRIBS),M=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),E=n.getParameter(n.MAX_VARYING_VECTORS),b=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),R=n.getParameter(n.MAX_SAMPLES),w=n.getParameter(n.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:a,getMaxPrecision:c,textureFormatReadable:s,textureTypeReadable:o,precision:u,logarithmicDepthBuffer:d,reversedDepthBuffer:f,maxTextures:p,maxVertexTextures:m,maxTextureSize:x,maxCubemapSize:_,maxAttributes:g,maxVertexUniforms:M,maxVaryings:E,maxFragmentUniforms:b,maxSamples:R,samples:w}}function I1(n){const e=this;let t=null,i=0,r=!1,a=!1;const s=new Fi,o=new Ve,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(d,f){const p=d.length!==0||f||i!==0||r;return r=f,i=d.length,p},this.beginShadows=function(){a=!0,h(null)},this.endShadows=function(){a=!1},this.setGlobalState=function(d,f){t=h(d,f,0)},this.setState=function(d,f,p){const m=d.clippingPlanes,x=d.clipIntersection,_=d.clipShadows,g=n.get(d);if(!r||m===null||m.length===0||a&&!_)a?h(null):u();else{const M=a?0:i,E=M*4;let b=g.clippingState||null;c.value=b,b=h(m,f,E,p);for(let R=0;R!==E;++R)b[R]=t[R];g.clippingState=b,this.numIntersection=x?this.numPlanes:0,this.numPlanes+=M}};function u(){c.value!==t&&(c.value=t,c.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function h(d,f,p,m){const x=d!==null?d.length:0;let _=null;if(x!==0){if(_=c.value,m!==!0||_===null){const g=p+x*4,M=f.matrixWorldInverse;o.getNormalMatrix(M),(_===null||_.length<g)&&(_=new Float32Array(g));for(let E=0,b=p;E!==x;++E,b+=4)s.copy(d[E]).applyMatrix4(M,o),s.normal.toArray(_,b),_[b+3]=s.constant}c.value=_,c.needsUpdate=!0}return e.numPlanes=x,e.numIntersection=0,_}}const Rr=4,N1=6,U1=20,O1=256,$r=new yl,_c=new ct;let eo=null,to=0,no=0,io=!1;const F1=new Y,Ki=new Y;class xc{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,i=.1,r=100,a={}){const{size:s=256,position:o=F1}=a;eo=this._renderer.getRenderTarget(),to=this._renderer.getActiveCubeFace(),no=this._renderer.getActiveMipmapLevel(),io=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(s);const c=this._allocateTargets();return c.depthBuffer=!0,this._sceneToCubeUV(e,i,r,c,o),t>0&&this._blur(c,0,0,t),this._applyPMREM(c),this._cleanup(c),c}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Sc(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=vc(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(eo,to,no),this._renderer.xr.enabled=io,e.scissorTest=!1,br(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===ir||e.mapping===Nr?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),eo=this._renderer.getRenderTarget(),to=this._renderer.getActiveCubeFace(),no=this._renderer.getActiveMipmapLevel(),io=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=t||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,i={magFilter:zt,minFilter:zt,generateMipmaps:!1,type:ai,format:Rn,colorSpace:ha,depthBuffer:!1},r=Mc(e,t,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Mc(e,t,i);const{_lodMax:a}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods}=B1(a)),this._blurMaterial=z1(a,e,t),this._ggxMaterial=k1(a,e,t)}return r}_compileMaterial(e){const t=new dn(new si,e);this._renderer.compile(t,$r)}_sceneToCubeUV(e,t,i,r,a){const c=new An(90,1,t,i),u=[1,-1,1,1,1,1],h=[1,1,1,-1,-1,-1],d=this._renderer,f=d.autoClear,p=d.toneMapping;d.getClearColor(_c),d.toneMapping=ti,d.autoClear=!1,d.state.buffers.depth.getReversed()&&(d.setRenderTarget(r),d.clearDepth(),d.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new dn(new ga,new Bu({name:"PMREM.Background",side:gn,depthWrite:!1,depthTest:!1})));const x=this._backgroundBox,_=x.material;let g=!1;const M=e.background;M?M.isColor&&(_.color.copy(M),e.background=null,g=!0):(_.color.copy(_c),g=!0);for(let E=0;E<6;E++){const b=E%3;b===0?(c.up.set(0,u[E],0),c.position.set(a.x,a.y,a.z),c.lookAt(a.x+h[E],a.y,a.z)):b===1?(c.up.set(0,0,u[E]),c.position.set(a.x,a.y,a.z),c.lookAt(a.x,a.y+h[E],a.z)):(c.up.set(0,u[E],0),c.position.set(a.x,a.y,a.z),c.lookAt(a.x,a.y,a.z+h[E]));const R=this._cubeSize;br(r,b*R,E>2?R:0,R,R),d.setRenderTarget(r),g&&d.render(x,c),d.render(e,c)}d.toneMapping=p,d.autoClear=f,e.background=M}_textureToCubeUV(e,t){const i=this._renderer,r=e.mapping===ir||e.mapping===Nr;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=Sc()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=vc());const a=r?this._cubemapMaterial:this._equirectMaterial,s=this._lodMeshes[0];s.material=a;const o=a.uniforms;o.envMap.value=e;const c=this._cubeSize;br(t,0,0,3*c,2*c),i.setRenderTarget(t),i.render(s,$r)}_applyPMREM(e){const t=this._renderer,i=t.autoClear;t.autoClear=!1;const r=this._lodMeshes.length;for(let a=1;a<r;a++)this._applyGGXFilter(e,a-1,a);t.autoClear=i}_applyGGXFilter(e,t,i){const r=this._renderer,a=this._pingPongRenderTarget,s=this._ggxMaterial,o=this._lodMeshes[i];o.material=s;const c=s.uniforms,u=i/(this._lodMeshes.length-1),h=t/(this._lodMeshes.length-1),d=Math.sqrt(u*u-h*h),f=u*1.25,p=d*f,{_lodMax:m}=this,x=this._sizeLods[i],_=3*x*(i>m-Rr?i-m+Rr:0),g=4*(this._cubeSize-x);c.envMap.value=e.texture,c.roughness.value=p,c.mipInt.value=m-t,br(a,_,g,3*x,2*x),r.setRenderTarget(a),r.render(o,$r),c.envMap.value=a.texture,c.roughness.value=0,c.mipInt.value=m-i,br(e,_,g,3*x,2*x),r.setRenderTarget(e),r.render(o,$r)}_blur(e,t,i,r){const a=this._pingPongRenderTarget,s=Math.min(r,Math.PI)/Math.SQRT2;this._blurPass(e,a,t,i,s),this._blurPass(a,e,i,i,s)}_blurPass(e,t,i,r,a){const s=this._renderer,o=this._blurMaterial,c=this._lodMeshes[r];c.material=o;const u=o.uniforms;u.envMap.value=e.texture,u.sigma.value=a,u.mipInt.value=this._lodMax-i;const h=this._sizeLods[r],d=3*h*(r>this._lodMax-Rr?r-this._lodMax+Rr:0),f=4*(this._cubeSize-h);br(t,d,f,3*h,2*h),s.setRenderTarget(t),s.render(c,$r)}}function B1(n){const e=[],t=[];let i=n;const r=n-Rr+1+N1;for(let a=0;a<r;a++){const s=Math.pow(2,i);e.push(s);const o=1/(s-2),c=-o,u=1+o,h=[c,c,u,c,u,u,c,c,u,u,c,u],d=6,f=6,p=3,m=new Float32Array(p*f*d),x=new Float32Array(p*f*d);for(let g=0;g<d;g++){const M=g%3*2/3-1,E=g>2?0:-1,b=[M,E,0,M+2/3,E,0,M+2/3,E+1,0,M,E,0,M+2/3,E+1,0,M,E+1,0];m.set(b,p*f*g);for(let R=0;R<f;R++){const w=h[R*2]*2-1,D=h[R*2+1]*2-1;g===0?Ki.set(1,D,w):g===1?Ki.set(-w,1,-D):g===2?Ki.set(-w,D,1):g===3?Ki.set(-1,D,-w):g===4?Ki.set(-w,-1,D):Ki.set(w,D,-1),Ki.toArray(x,(g*f+R)*p)}}const _=new si;_.setAttribute("position",new ni(m,p)),_.setAttribute("outputDirection",new ni(x,p)),t.push(new dn(_,null)),i>Rr&&i--}return{lodMeshes:t,sizeLods:e}}function Mc(n,e,t){const i=new Cn(n,e,t);return i.texture.mapping=gs,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function br(n,e,t,i,r){n.viewport.set(e,t,i,r),n.scissor.set(e,t,i,r)}function k1(n,e,t){return new on({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:O1,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:xs(),fragmentShader:`

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
		`,blending:Si,depthTest:!1,depthWrite:!1})}function z1(n,e,t){return new on({name:"SphericalGaussianBlur",defines:{SAMPLES:U1,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},sigma:{value:0},mipInt:{value:0}},vertexShader:xs(),fragmentShader:`

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
		`,blending:Si,depthTest:!1,depthWrite:!1})}function vc(){return new on({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:xs(),fragmentShader:`

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
		`,blending:Si,depthTest:!1,depthWrite:!1})}function Sc(){return new on({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:xs(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Si,depthTest:!1,depthWrite:!1})}function xs(){return`

		precision mediump float;
		precision mediump int;

		attribute vec3 outputDirection;

		varying vec3 vOutputDirection;

		void main() {

			vOutputDirection = outputDirection;
			gl_Position = vec4( position, 1.0 );

		}
	`}class qu extends Cn{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const i={width:e,height:e,depth:1},r=[i,i,i,i,i,i];this.texture=new zu(r),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},r=new ga(5,5,5),a=new on({name:"CubemapFromEquirect",uniforms:Ur(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:gn,blending:Si});a.uniforms.tEquirect.value=t;const s=new dn(r,a),o=t.minFilter;return t.minFilter===Qi&&(t.minFilter=zt),new Wp(1,10,this).update(e,s),t.minFilter=o,s.geometry.dispose(),s.material.dispose(),this}clear(e,t=!0,i=!0,r=!0){const a=e.getRenderTarget();for(let s=0;s<6;s++)e.setRenderTarget(this,s),e.clear(t,i,r);e.setRenderTarget(a)}}function H1(n){let e=new WeakMap,t=new WeakMap,i=null;function r(f,p=!1){return f==null?null:p?s(f):a(f)}function a(f){if(f&&f.isTexture){const p=f.mapping;if(p===Rs||p===Cs)if(e.has(f)){const m=e.get(f).texture;return o(m,f.mapping)}else{const m=f.image;if(m&&m.height>0){const x=new qu(m.height);return x.fromEquirectangularTexture(n,f),e.set(f,x),f.addEventListener("dispose",u),o(x.texture,f.mapping)}else return null}}return f}function s(f){if(f&&f.isTexture){const p=f.mapping,m=p===Rs||p===Cs,x=p===ir||p===Nr;if(m||x){let _=t.get(f);const g=_!==void 0?_.texture.pmremVersion:0;if(f.isRenderTargetTexture&&f.pmremVersion!==g)return i===null&&(i=new xc(n)),_=m?i.fromEquirectangular(f,_):i.fromCubemap(f,_),_.texture.pmremVersion=f.pmremVersion,t.set(f,_),_.texture;if(_!==void 0)return _.texture;{const M=f.image;return m&&M&&M.height>0||x&&M&&c(M)?(i===null&&(i=new xc(n)),_=m?i.fromEquirectangular(f):i.fromCubemap(f),_.texture.pmremVersion=f.pmremVersion,t.set(f,_),f.addEventListener("dispose",h),_.texture):null}}}return f}function o(f,p){return p===Rs?f.mapping=ir:p===Cs&&(f.mapping=Nr),f}function c(f){let p=0;const m=6;for(let x=0;x<m;x++)f[x]!==void 0&&p++;return p===m}function u(f){const p=f.target;p.removeEventListener("dispose",u);const m=e.get(p);m!==void 0&&(e.delete(p),m.dispose())}function h(f){const p=f.target;p.removeEventListener("dispose",h);const m=t.get(p);m!==void 0&&(t.delete(p),m.dispose())}function d(){e=new WeakMap,t=new WeakMap,i!==null&&(i.dispose(),i=null)}return{get:r,dispose:d}}function G1(n){const e={};function t(i){if(e[i]!==void 0)return e[i];const r=n.getExtension(i);return e[i]=r,r}return{has:function(i){return t(i)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(i){const r=t(i);return r===null&&Lr("WebGLRenderer: "+i+" extension not supported."),r}}}function V1(n,e,t,i){const r={},a=new WeakMap;function s(d){const f=d.target;f.index!==null&&e.remove(f.index);for(const m in f.attributes)e.remove(f.attributes[m]);f.removeEventListener("dispose",s),delete r[f.id];const p=a.get(f);p&&(e.remove(p),a.delete(f)),i.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,t.memory.geometries--}function o(d,f){return r[f.id]===!0||(f.addEventListener("dispose",s),r[f.id]=!0,t.memory.geometries++),f}function c(d){const f=d.attributes;for(const p in f)e.update(f[p],n.ARRAY_BUFFER)}function u(d){const f=[],p=d.index,m=d.attributes.position;let x=0;if(m===void 0)return;if(p!==null){const M=p.array;x=p.version;for(let E=0,b=M.length;E<b;E+=3){const R=M[E+0],w=M[E+1],D=M[E+2];f.push(R,w,w,D,D,R)}}else{const M=m.array;x=m.version;for(let E=0,b=M.length/3-1;E<b;E+=3){const R=E+0,w=E+1,D=E+2;f.push(R,w,w,D,D,R)}}const _=new(m.count>=65535?Fu:Ou)(f,1);_.version=x;const g=a.get(d);g&&e.remove(g),a.set(d,_)}function h(d){const f=a.get(d);if(f){const p=d.index;p!==null&&f.version<p.version&&u(d)}else u(d);return a.get(d)}return{get:o,update:c,getWireframeAttribute:h}}function W1(n,e,t){let i;function r(d){i=d}let a,s;function o(d){a=d.type,s=d.bytesPerElement}function c(d,f){n.drawElements(i,f,a,d*s),t.update(f,i,1)}function u(d,f,p){p!==0&&(n.drawElementsInstanced(i,f,a,d*s,p),t.update(f,i,p))}function h(d,f,p){if(p===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,f,0,a,d,0,p);let x=0;for(let _=0;_<p;_++)x+=f[_];t.update(x,i,1)}this.setMode=r,this.setIndex=o,this.render=c,this.renderInstances=u,this.renderMultiDraw=h}function Y1(n){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function i(a,s,o){switch(t.calls++,s){case n.TRIANGLES:t.triangles+=o*(a/3);break;case n.LINES:t.lines+=o*(a/2);break;case n.LINE_STRIP:t.lines+=o*(a-1);break;case n.LINE_LOOP:t.lines+=o*a;break;case n.POINTS:t.points+=o*a;break;default:st("WebGLInfo: Unknown draw mode:",s);break}}function r(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:r,update:i}}function X1(n,e,t){const i=new WeakMap,r=new Dt;function a(s,o,c){const u=s.morphTargetInfluences,h=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,d=h!==void 0?h.length:0;let f=i.get(o);if(f===void 0||f.count!==d){let y=function(){D.dispose(),i.delete(o),o.removeEventListener("dispose",y)};f!==void 0&&f.texture.dispose();const p=o.morphAttributes.position!==void 0,m=o.morphAttributes.normal!==void 0,x=o.morphAttributes.color!==void 0,_=o.morphAttributes.position||[],g=o.morphAttributes.normal||[],M=o.morphAttributes.color||[];let E=0;p===!0&&(E=1),m===!0&&(E=2),x===!0&&(E=3);let b=o.attributes.position.count*E,R=1;b>e.maxTextureSize&&(R=Math.ceil(b/e.maxTextureSize),b=e.maxTextureSize);const w=new Float32Array(b*R*4*d),D=new Iu(w,b,R,d);D.type=jn,D.needsUpdate=!0;const S=E*4;for(let L=0;L<d;L++){const C=_[L],N=g[L],U=M[L],I=b*R*4*L;for(let B=0;B<C.count;B++){const V=B*S;p===!0&&(r.fromBufferAttribute(C,B),w[I+V+0]=r.x,w[I+V+1]=r.y,w[I+V+2]=r.z,w[I+V+3]=0),m===!0&&(r.fromBufferAttribute(N,B),w[I+V+4]=r.x,w[I+V+5]=r.y,w[I+V+6]=r.z,w[I+V+7]=0),x===!0&&(r.fromBufferAttribute(U,B),w[I+V+8]=r.x,w[I+V+9]=r.y,w[I+V+10]=r.z,w[I+V+11]=U.itemSize===4?r.w:1)}}f={count:d,texture:D,size:new We(b,R)},i.set(o,f),o.addEventListener("dispose",y)}if(s.isInstancedMesh===!0&&s.morphTexture!==null)c.getUniforms().setValue(n,"morphTexture",s.morphTexture,t);else{let p=0;for(let x=0;x<u.length;x++)p+=u[x];const m=o.morphTargetsRelative?1:1-p;c.getUniforms().setValue(n,"morphTargetBaseInfluence",m),c.getUniforms().setValue(n,"morphTargetInfluences",u)}c.getUniforms().setValue(n,"morphTargetsTexture",f.texture,t),c.getUniforms().setValue(n,"morphTargetsTextureSize",f.size)}return{update:a}}function K1(n,e,t,i,r){let a=new WeakMap;function s(u){const h=r.render.frame,d=u.geometry,f=e.get(u,d);if(a.get(f)!==h&&(e.update(f),a.set(f,h)),u.isInstancedMesh&&(u.hasEventListener("dispose",c)===!1&&u.addEventListener("dispose",c),a.get(u)!==h&&(t.update(u.instanceMatrix,n.ARRAY_BUFFER),u.instanceColor!==null&&t.update(u.instanceColor,n.ARRAY_BUFFER),a.set(u,h))),u.isSkinnedMesh){const p=u.skeleton;a.get(p)!==h&&(p.update(),a.set(p,h))}return f}function o(){a=new WeakMap}function c(u){const h=u.target;h.removeEventListener("dispose",c),i.releaseStatesOfObject(h),t.remove(h.instanceMatrix),h.instanceColor!==null&&t.remove(h.instanceColor)}return{update:s,dispose:o}}const q1={[gu]:"LINEAR_TONE_MAPPING",[_u]:"REINHARD_TONE_MAPPING",[xu]:"CINEON_TONE_MAPPING",[Mu]:"ACES_FILMIC_TONE_MAPPING",[Su]:"AGX_TONE_MAPPING",[bu]:"NEUTRAL_TONE_MAPPING",[vu]:"CUSTOM_TONE_MAPPING"};function Z1(n,e,t,i,r,a){const s=new Cn(e,t,{type:n,depthBuffer:r,stencilBuffer:a,samples:i?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1});let o=null,c=null;const u=new si;u.setAttribute("position",new Ei([-1,3,0,-1,-1,0,3,-1,0],3)),u.setAttribute("uv",new Ei([0,2,0,0,2,0],2));const h=new Hp({uniforms:{tDiffuse:{value:null}},vertexShader:`
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
			}`,depthTest:!1,depthWrite:!1}),d=new dn(u,h),f=new yl(-1,1,1,-1,0,1);let p=null,m=null,x=!1,_,g=null,M=[],E=!1;this.setSize=function(b,R){s.setSize(b,R),o!==null&&o.setSize(b,R),c!==null&&c.setSize(b,R);for(let w=0;w<M.length;w++){const D=M[w];D.setSize&&D.setSize(b,R)}},this.setEffects=function(b){M=b,E=M.length>0&&M[0].isRenderPass===!0;const R=s.width,w=s.height;M.length>0&&o===null&&(o=new Cn(R,w,{type:ai,depthBuffer:!1,stencilBuffer:!1}),c=new Cn(R,w,{type:ai,depthBuffer:!1,stencilBuffer:!1}));for(let D=0;D<M.length;D++){const S=M[D];S.setSize&&S.setSize(R,w)}},this.begin=function(b,R){if(x||b.toneMapping===ti&&M.length===0)return!1;if(g=R,R!==null){const w=R.width,D=R.height;(s.width!==w||s.height!==D)&&this.setSize(w,D)}return E===!1&&b.setRenderTarget(s),_=b.toneMapping,b.toneMapping=ti,!0},this.hasRenderPass=function(){return E},this.end=function(b,R){b.toneMapping=_,x=!0;let w=s,D=o;for(let S=0;S<M.length;S++){const y=M[S];y.enabled!==!1&&(y.render(b,D,w,R),y.needsSwap!==!1&&(w=D,D=D===o?c:o))}if(p!==b.outputColorSpace||m!==b.toneMapping){p=b.outputColorSpace,m=b.toneMapping,h.defines={},nt.getTransfer(p)===gt&&(h.defines.SRGB_TRANSFER="");const S=q1[m];S&&(h.defines[S]=""),h.needsUpdate=!0}h.uniforms.tDiffuse.value=w.texture,b.setRenderTarget(g),b.render(d,f),g=null,x=!1},this.isCompositing=function(){return x},this.dispose=function(){s.dispose(),o!==null&&o.dispose(),c!==null&&c.dispose(),u.dispose(),h.dispose()}}const Zu=new hn,Qo=new da(1,1),$u=new Iu,Ju=new xp,Qu=new zu,bc=[],Ec=[],yc=new Float32Array(16),wc=new Float32Array(9),Ac=new Float32Array(4);function Hr(n,e,t){const i=n[0];if(i<=0||i>0)return n;const r=e*t;let a=bc[r];if(a===void 0&&(a=new Float32Array(r),bc[r]=a),e!==0){i.toArray(a,0);for(let s=1,o=0;s!==e;++s)o+=t,n[s].toArray(a,o)}return a}function Yt(n,e){if(n.length!==e.length)return!1;for(let t=0,i=n.length;t<i;t++)if(n[t]!==e[t])return!1;return!0}function Xt(n,e){for(let t=0,i=e.length;t<i;t++)n[t]=e[t]}function Ms(n,e){let t=Ec[e];t===void 0&&(t=new Int32Array(e),Ec[e]=t);for(let i=0;i!==e;++i)t[i]=n.allocateTextureUnit();return t}function $1(n,e){const t=this.cache;t[0]!==e&&(n.uniform1f(this.addr,e),t[0]=e)}function J1(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Yt(t,e))return;n.uniform2fv(this.addr,e),Xt(t,e)}}function Q1(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(n.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Yt(t,e))return;n.uniform3fv(this.addr,e),Xt(t,e)}}function j1(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Yt(t,e))return;n.uniform4fv(this.addr,e),Xt(t,e)}}function e2(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(Yt(t,e))return;n.uniformMatrix2fv(this.addr,!1,e),Xt(t,e)}else{if(Yt(t,i))return;Ac.set(i),n.uniformMatrix2fv(this.addr,!1,Ac),Xt(t,i)}}function t2(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(Yt(t,e))return;n.uniformMatrix3fv(this.addr,!1,e),Xt(t,e)}else{if(Yt(t,i))return;wc.set(i),n.uniformMatrix3fv(this.addr,!1,wc),Xt(t,i)}}function n2(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(Yt(t,e))return;n.uniformMatrix4fv(this.addr,!1,e),Xt(t,e)}else{if(Yt(t,i))return;yc.set(i),n.uniformMatrix4fv(this.addr,!1,yc),Xt(t,i)}}function i2(n,e){const t=this.cache;t[0]!==e&&(n.uniform1i(this.addr,e),t[0]=e)}function r2(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Yt(t,e))return;n.uniform2iv(this.addr,e),Xt(t,e)}}function a2(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Yt(t,e))return;n.uniform3iv(this.addr,e),Xt(t,e)}}function s2(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Yt(t,e))return;n.uniform4iv(this.addr,e),Xt(t,e)}}function o2(n,e){const t=this.cache;t[0]!==e&&(n.uniform1ui(this.addr,e),t[0]=e)}function l2(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Yt(t,e))return;n.uniform2uiv(this.addr,e),Xt(t,e)}}function c2(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Yt(t,e))return;n.uniform3uiv(this.addr,e),Xt(t,e)}}function u2(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Yt(t,e))return;n.uniform4uiv(this.addr,e),Xt(t,e)}}function h2(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r);let a;this.type===n.SAMPLER_2D_SHADOW?(Qo.compareFunction=t.isReversedDepthBuffer()?vl:Ml,a=Qo):a=Zu,t.setTexture2D(e||a,r)}function d2(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTexture3D(e||Ju,r)}function f2(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTextureCube(e||Qu,r)}function p2(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTexture2DArray(e||$u,r)}function m2(n){switch(n){case 5126:return $1;case 35664:return J1;case 35665:return Q1;case 35666:return j1;case 35674:return e2;case 35675:return t2;case 35676:return n2;case 5124:case 35670:return i2;case 35667:case 35671:return r2;case 35668:case 35672:return a2;case 35669:case 35673:return s2;case 5125:return o2;case 36294:return l2;case 36295:return c2;case 36296:return u2;case 35678:case 36198:case 36298:case 36306:case 35682:return h2;case 35679:case 36299:case 36307:return d2;case 35680:case 36300:case 36308:case 36293:return f2;case 36289:case 36303:case 36311:case 36292:return p2}}function g2(n,e){n.uniform1fv(this.addr,e)}function _2(n,e){const t=Hr(e,this.size,2);n.uniform2fv(this.addr,t)}function x2(n,e){const t=Hr(e,this.size,3);n.uniform3fv(this.addr,t)}function M2(n,e){const t=Hr(e,this.size,4);n.uniform4fv(this.addr,t)}function v2(n,e){const t=Hr(e,this.size,4);n.uniformMatrix2fv(this.addr,!1,t)}function S2(n,e){const t=Hr(e,this.size,9);n.uniformMatrix3fv(this.addr,!1,t)}function b2(n,e){const t=Hr(e,this.size,16);n.uniformMatrix4fv(this.addr,!1,t)}function E2(n,e){n.uniform1iv(this.addr,e)}function y2(n,e){n.uniform2iv(this.addr,e)}function w2(n,e){n.uniform3iv(this.addr,e)}function A2(n,e){n.uniform4iv(this.addr,e)}function T2(n,e){n.uniform1uiv(this.addr,e)}function R2(n,e){n.uniform2uiv(this.addr,e)}function C2(n,e){n.uniform3uiv(this.addr,e)}function L2(n,e){n.uniform4uiv(this.addr,e)}function D2(n,e,t){const i=this.cache,r=e.length,a=Ms(t,r);Yt(i,a)||(n.uniform1iv(this.addr,a),Xt(i,a));let s;this.type===n.SAMPLER_2D_SHADOW?s=Qo:s=Zu;for(let o=0;o!==r;++o)t.setTexture2D(e[o]||s,a[o])}function P2(n,e,t){const i=this.cache,r=e.length,a=Ms(t,r);Yt(i,a)||(n.uniform1iv(this.addr,a),Xt(i,a));for(let s=0;s!==r;++s)t.setTexture3D(e[s]||Ju,a[s])}function I2(n,e,t){const i=this.cache,r=e.length,a=Ms(t,r);Yt(i,a)||(n.uniform1iv(this.addr,a),Xt(i,a));for(let s=0;s!==r;++s)t.setTextureCube(e[s]||Qu,a[s])}function N2(n,e,t){const i=this.cache,r=e.length,a=Ms(t,r);Yt(i,a)||(n.uniform1iv(this.addr,a),Xt(i,a));for(let s=0;s!==r;++s)t.setTexture2DArray(e[s]||$u,a[s])}function U2(n){switch(n){case 5126:return g2;case 35664:return _2;case 35665:return x2;case 35666:return M2;case 35674:return v2;case 35675:return S2;case 35676:return b2;case 5124:case 35670:return E2;case 35667:case 35671:return y2;case 35668:case 35672:return w2;case 35669:case 35673:return A2;case 5125:return T2;case 36294:return R2;case 36295:return C2;case 36296:return L2;case 35678:case 36198:case 36298:case 36306:case 35682:return D2;case 35679:case 36299:case 36307:return P2;case 35680:case 36300:case 36308:case 36293:return I2;case 36289:case 36303:case 36311:case 36292:return N2}}class O2{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.setValue=m2(t.type)}}class F2{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=U2(t.type)}}class B2{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,i){const r=this.seq;for(let a=0,s=r.length;a!==s;++a){const o=r[a];o.setValue(e,t[o.id],i)}}}const ro=/(\w+)(\])?(\[|\.)?/g;function Tc(n,e){n.seq.push(e),n.map[e.id]=e}function k2(n,e,t){const i=n.name,r=i.length;for(ro.lastIndex=0;;){const a=ro.exec(i),s=ro.lastIndex;let o=a[1];const c=a[2]==="]",u=a[3];if(c&&(o=o|0),u===void 0||u==="["&&s+2===r){Tc(t,u===void 0?new O2(o,n,e):new F2(o,n,e));break}else{let d=t.map[o];d===void 0&&(d=new B2(o),Tc(t,d)),t=d}}}class rs{constructor(e,t){this.seq=[],this.map={};const i=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let s=0;s<i;++s){const o=e.getActiveUniform(t,s),c=e.getUniformLocation(t,o.name);k2(o,c,this)}const r=[],a=[];for(const s of this.seq)s.type===e.SAMPLER_2D_SHADOW||s.type===e.SAMPLER_CUBE_SHADOW||s.type===e.SAMPLER_2D_ARRAY_SHADOW?r.push(s):a.push(s);r.length>0&&(this.seq=r.concat(a))}setValue(e,t,i,r){const a=this.map[t];a!==void 0&&a.setValue(e,i,r)}setOptional(e,t,i){const r=t[i];r!==void 0&&this.setValue(e,i,r)}static upload(e,t,i,r){for(let a=0,s=t.length;a!==s;++a){const o=t[a],c=i[o.id];c.needsUpdate!==!1&&o.setValue(e,c.value,r)}}static seqWithValue(e,t){const i=[];for(let r=0,a=e.length;r!==a;++r){const s=e[r];s.id in t&&i.push(s)}return i}}function Rc(n,e,t){const i=n.createShader(e);return n.shaderSource(i,t),n.compileShader(i),i}const z2=37297;let H2=0;function G2(n,e){const t=n.split(`
`),i=[],r=Math.max(e-6,0),a=Math.min(e+6,t.length);for(let s=r;s<a;s++){const o=s+1;i.push(`${o===e?">":" "} ${o}: ${t[s]}`)}return i.join(`
`)}const Cc=new Ve;function V2(n){nt._getMatrix(Cc,nt.workingColorSpace,n);const e=`mat3( ${Cc.elements.map(t=>t.toFixed(4))} )`;switch(nt.getTransfer(n)){case cs:return[e,"LinearTransferOETF"];case gt:return[e,"sRGBTransferOETF"];default:return Ge("WebGLProgram: Unsupported color space: ",n),[e,"LinearTransferOETF"]}}function Lc(n,e,t){const i=n.getShaderParameter(e,n.COMPILE_STATUS),a=(n.getShaderInfoLog(e)||"").trim();if(i&&a==="")return"";const s=/ERROR: 0:(\d+)/.exec(a);if(s){const o=parseInt(s[1]);return t.toUpperCase()+`

`+a+`

`+G2(n.getShaderSource(e),o)}else return a}function W2(n,e){const t=V2(e);return[`vec4 ${n}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}const Y2={[gu]:"Linear",[_u]:"Reinhard",[xu]:"Cineon",[Mu]:"ACESFilmic",[Su]:"AgX",[bu]:"Neutral",[vu]:"Custom"};function X2(n,e){const t=Y2[e];return t===void 0?(Ge("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+n+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+n+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const Ya=new Y;function K2(){nt.getLuminanceCoefficients(Ya);const n=Ya.x.toFixed(4),e=Ya.y.toFixed(4),t=Ya.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${n}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function q2(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",n.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(na).join(`
`)}function Z2(n){const e=[];for(const t in n){const i=n[t];i!==!1&&e.push("#define "+t+" "+i)}return e.join(`
`)}function $2(n,e){const t={},i=n.getProgramParameter(e,n.ACTIVE_ATTRIBUTES);for(let r=0;r<i;r++){const a=n.getActiveAttrib(e,r),s=a.name;let o=1;a.type===n.FLOAT_MAT2&&(o=2),a.type===n.FLOAT_MAT3&&(o=3),a.type===n.FLOAT_MAT4&&(o=4),t[s]={type:a.type,location:n.getAttribLocation(e,s),locationSize:o}}return t}function na(n){return n!==""}function Dc(n,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return n.replace(/NUM_SUN_LIGHTS/g,e.numSunLights).replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,e.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Pc(n,e){return n.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const J2=/^[ \t]*#include +<([\w\d./]+)>/gm;function jo(n){return n.replace(J2,j2)}const Q2=new Map;function j2(n,e){let t=je[e];if(t===void 0){const i=Q2.get(e);if(i!==void 0)t=je[i],Ge('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,i);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+e+">")}return jo(t)}const e_=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Ic(n){return n.replace(e_,t_)}function t_(n,e,t,i){let r="";for(let a=parseInt(e);a<parseInt(t);a++)r+=i.replace(/\[\s*i\s*\]/g,"[ "+a+" ]").replace(/UNROLLED_LOOP_INDEX/g,a);return r}function Nc(n){let e=`precision ${n.precision} float;
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
#define LOW_PRECISION`),e}const n_={[ja]:"SHADOWMAP_TYPE_PCF",[ta]:"SHADOWMAP_TYPE_VSM"};function i_(n){return n_[n.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const r_={[ir]:"ENVMAP_TYPE_CUBE",[Nr]:"ENVMAP_TYPE_CUBE",[gs]:"ENVMAP_TYPE_CUBE_UV"};function a_(n){return n.envMap===!1?"ENVMAP_TYPE_CUBE":r_[n.envMapMode]||"ENVMAP_TYPE_CUBE"}const s_={[Nr]:"ENVMAP_MODE_REFRACTION"};function o_(n){return n.envMap===!1?"ENVMAP_MODE_REFLECTION":s_[n.envMapMode]||"ENVMAP_MODE_REFLECTION"}const l_={[mu]:"ENVMAP_BLENDING_MULTIPLY",[Z0]:"ENVMAP_BLENDING_MIX",[$0]:"ENVMAP_BLENDING_ADD"};function c_(n){return n.envMap===!1?"ENVMAP_BLENDING_NONE":l_[n.combine]||"ENVMAP_BLENDING_NONE"}function u_(n){const e=n.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,i=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:i,maxMip:t}}function h_(n,e,t,i){const r=n.getContext(),a=t.defines;let s=t.vertexShader,o=t.fragmentShader;const c=i_(t),u=a_(t),h=o_(t),d=c_(t),f=u_(t),p=q2(t),m=Z2(a),x=r.createProgram();let _,g,M=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(_=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m].filter(na).join(`
`),_.length>0&&(_+=`
`),g=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m].filter(na).join(`
`),g.length>0&&(g+=`
`)):(_=[Nc(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexNormals?"#define HAS_NORMAL":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(na).join(`
`),g=[Nc(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.envMap?"#define "+h:"",t.envMap?"#define "+d:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.retroreflection?"#define USE_RETROREFLECTION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas||t.batchingColor?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==ti?"#define TONE_MAPPING":"",t.toneMapping!==ti?je.tonemapping_pars_fragment:"",t.toneMapping!==ti?X2("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",je.colorspace_pars_fragment,W2("linearToOutputTexel",t.outputColorSpace),K2(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(na).join(`
`)),s=jo(s),s=Dc(s,t),s=Pc(s,t),o=jo(o),o=Dc(o,t),o=Pc(o,t),s=Ic(s),o=Ic(o),t.isRawShaderMaterial!==!0&&(M=`#version 300 es
`,_=[p,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+_,g=["#define varying in",t.glslVersion===$l?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===$l?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+g);const E=M+_+s,b=M+g+o,R=Rc(r,r.VERTEX_SHADER,E),w=Rc(r,r.FRAGMENT_SHADER,b);r.attachShader(x,R),r.attachShader(x,w),t.index0AttributeName!==void 0?r.bindAttribLocation(x,0,t.index0AttributeName):t.hasPositionAttribute===!0&&r.bindAttribLocation(x,0,"position"),r.linkProgram(x);function D(C){if(n.debug.checkShaderErrors){const N=r.getProgramInfoLog(x)||"",U=r.getShaderInfoLog(R)||"",I=r.getShaderInfoLog(w)||"",B=N.trim(),V=U.trim(),$=I.trim();let ae=!0,q=!0;if(r.getProgramParameter(x,r.LINK_STATUS)===!1)if(ae=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(r,x,R,w);else{const ee=Lc(r,R,"vertex"),O=Lc(r,w,"fragment");st("WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(x,r.VALIDATE_STATUS)+`

Material Name: `+C.name+`
Material Type: `+C.type+`

Program Info Log: `+B+`
`+ee+`
`+O)}else B!==""?Ge("WebGLProgram: Program Info Log:",B):(V===""||$==="")&&(q=!1);q&&(C.diagnostics={runnable:ae,programLog:B,vertexShader:{log:V,prefix:_},fragmentShader:{log:$,prefix:g}})}r.deleteShader(R),r.deleteShader(w),S=new rs(r,x),y=$2(r,x)}let S;this.getUniforms=function(){return S===void 0&&D(this),S};let y;this.getAttributes=function(){return y===void 0&&D(this),y};let L=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return L===!1&&(L=r.getProgramParameter(x,z2)),L},this.destroy=function(){i.releaseStatesOfProgram(this),r.deleteProgram(x),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=H2++,this.cacheKey=e,this.usedTimes=1,this.program=x,this.vertexShader=R,this.fragmentShader=w,this}let d_=0;class f_{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,i){const r=this._getShaderCacheForMaterial(e);return r.has(t)===!1&&(r.add(t),t.usedTimes++),r.has(i)===!1&&(r.add(i),i.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const i of t)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let i=t.get(e);return i===void 0&&(i=new Set,t.set(e,i)),i}_getShaderStage(e){const t=this.shaderCache;let i=t.get(e);return i===void 0&&(i=new p_(e),t.set(e,i)),i}}class p_{constructor(e){this.id=d_++,this.code=e,this.usedTimes=0}}function m_(n){return n===rr||n===os||n===ls}function g_(n,e,t,i,r,a){const s=new Nu,o=new f_,c=new Set,u=[],h=new Map,d=i.logarithmicDepthBuffer;let f=i.precision;const p={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function m(S){return c.add(S),S===0?"uv":`uv${S}`}function x(S,y,L,C,N,U){const I=C.fog,B=N.geometry,V=S.isMeshStandardMaterial||S.isMeshLambertMaterial||S.isMeshPhongMaterial?C.environment:null,$=S.isMeshStandardMaterial||S.isMeshLambertMaterial&&!S.envMap||S.isMeshPhongMaterial&&!S.envMap,ae=e.get(S.envMap||V,$),q=ae&&ae.mapping===gs?ae.image.height:null,ee=p[S.type];S.precision!==null&&(f=i.getMaxPrecision(S.precision),f!==S.precision&&Ge("WebGLProgram.getParameters:",S.precision,"not supported, using",f,"instead."));const O=B.morphAttributes.position||B.morphAttributes.normal||B.morphAttributes.color,re=O!==void 0?O.length:0;let ue=0;B.morphAttributes.position!==void 0&&(ue=1),B.morphAttributes.normal!==void 0&&(ue=2),B.morphAttributes.color!==void 0&&(ue=3);let Ce,Fe,He,j;if(ee){const yt=$n[ee];Ce=yt.vertexShader,Fe=yt.fragmentShader}else{Ce=S.vertexShader,Fe=S.fragmentShader;const yt=o.getVertexShaderStage(S),ut=o.getFragmentShaderStage(S);o.update(S,yt,ut),He=yt.id,j=ut.id}const ie=n.getRenderTarget(),G=n.state.buffers.depth.getReversed(),he=N.isInstancedMesh===!0,se=N.isBatchedMesh===!0,ye=!!S.map,$e=!!S.matcap,Le=!!ae,Oe=!!S.aoMap,Xe=!!S.lightMap,Ye=!!S.bumpMap&&S.wireframe===!1,St=!!S.normalMap,Pt=!!S.displacementMap,Kt=!!S.emissiveMap,xt=!!S.metalnessMap,bt=!!S.roughnessMap,z=S.anisotropy>0,Je=S.clearcoat>0,ze=S.dispersion>0,P=S.retroreflectivity>0,v=S.iridescence>0,F=S.sheen>0,W=S.transmission>0,Z=z&&!!S.anisotropyMap,le=Je&&!!S.clearcoatMap,de=Je&&!!S.clearcoatNormalMap,Q=Je&&!!S.clearcoatRoughnessMap,te=v&&!!S.iridescenceMap,fe=v&&!!S.iridescenceThicknessMap,De=F&&!!S.sheenColorMap,xe=F&&!!S.sheenRoughnessMap,me=!!S.specularMap,Ne=!!S.specularColorMap,ke=!!S.specularIntensityMap,Ke=W&&!!S.transmissionMap,H=W&&!!S.thicknessMap,ge=!!S.gradientMap,ne=!!S.alphaMap,_e=S.alphaTest>0,be=!!S.alphaHash,oe=!!S.extensions;let Ue=ti;S.toneMapped&&(ie===null||ie.isXRRenderTarget===!0)&&(Ue=n.toneMapping);const Pe={shaderID:ee,shaderType:S.type,shaderName:S.name,vertexShader:Ce,fragmentShader:Fe,defines:S.defines,customVertexShaderID:He,customFragmentShaderID:j,isRawShaderMaterial:S.isRawShaderMaterial===!0,glslVersion:S.glslVersion,precision:f,batching:se,batchingColor:se&&N._colorsTexture!==null,instancing:he,instancingColor:he&&N.instanceColor!==null,instancingMorph:he&&N.morphTexture!==null,outputColorSpace:ie===null?n.outputColorSpace:ie.isXRRenderTarget===!0?ie.texture.colorSpace:nt.workingColorSpace,alphaToCoverage:!!S.alphaToCoverage,map:ye,matcap:$e,envMap:Le,envMapMode:Le&&ae.mapping,envMapCubeUVHeight:q,aoMap:Oe,lightMap:Xe,bumpMap:Ye,normalMap:St,displacementMap:Pt,emissiveMap:Kt,normalMapObjectSpace:St&&S.normalMapType===j0,normalMapTangentSpace:St&&S.normalMapType===Zl,packedNormalMap:St&&S.normalMapType===Zl&&m_(S.normalMap.format),metalnessMap:xt,roughnessMap:bt,anisotropy:z,anisotropyMap:Z,clearcoat:Je,clearcoatMap:le,clearcoatNormalMap:de,clearcoatRoughnessMap:Q,dispersion:ze,retroreflection:P,iridescence:v,iridescenceMap:te,iridescenceThicknessMap:fe,sheen:F,sheenColorMap:De,sheenRoughnessMap:xe,specularMap:me,specularColorMap:Ne,specularIntensityMap:ke,transmission:W,transmissionMap:Ke,thicknessMap:H,gradientMap:ge,opaque:S.transparent===!1&&S.blending===sa&&S.alphaToCoverage===!1,alphaMap:ne,alphaTest:_e,alphaHash:be,combine:S.combine,mapUv:ye&&m(S.map.channel),aoMapUv:Oe&&m(S.aoMap.channel),lightMapUv:Xe&&m(S.lightMap.channel),bumpMapUv:Ye&&m(S.bumpMap.channel),normalMapUv:St&&m(S.normalMap.channel),displacementMapUv:Pt&&m(S.displacementMap.channel),emissiveMapUv:Kt&&m(S.emissiveMap.channel),metalnessMapUv:xt&&m(S.metalnessMap.channel),roughnessMapUv:bt&&m(S.roughnessMap.channel),anisotropyMapUv:Z&&m(S.anisotropyMap.channel),clearcoatMapUv:le&&m(S.clearcoatMap.channel),clearcoatNormalMapUv:de&&m(S.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Q&&m(S.clearcoatRoughnessMap.channel),iridescenceMapUv:te&&m(S.iridescenceMap.channel),iridescenceThicknessMapUv:fe&&m(S.iridescenceThicknessMap.channel),sheenColorMapUv:De&&m(S.sheenColorMap.channel),sheenRoughnessMapUv:xe&&m(S.sheenRoughnessMap.channel),specularMapUv:me&&m(S.specularMap.channel),specularColorMapUv:Ne&&m(S.specularColorMap.channel),specularIntensityMapUv:ke&&m(S.specularIntensityMap.channel),transmissionMapUv:Ke&&m(S.transmissionMap.channel),thicknessMapUv:H&&m(S.thicknessMap.channel),alphaMapUv:ne&&m(S.alphaMap.channel),vertexTangents:!!B.attributes.tangent&&(St||z),vertexNormals:!!B.attributes.normal,vertexColors:S.vertexColors,vertexAlphas:S.vertexColors===!0&&!!B.attributes.color&&B.attributes.color.itemSize===4,pointsUvs:N.isPoints===!0&&!!B.attributes.uv&&(ye||ne),fog:!!I,useFog:S.fog===!0,fogExp2:!!I&&I.isFogExp2,flatShading:S.wireframe===!1&&(S.flatShading===!0||B.attributes.normal===void 0&&St===!1&&(S.isMeshLambertMaterial||S.isMeshPhongMaterial||S.isMeshStandardMaterial||S.isMeshPhysicalMaterial)),sizeAttenuation:S.sizeAttenuation===!0,logarithmicDepthBuffer:d,reversedDepthBuffer:G,skinning:N.isSkinnedMesh===!0,hasPositionAttribute:B.attributes.position!==void 0,morphTargets:B.morphAttributes.position!==void 0,morphNormals:B.morphAttributes.normal!==void 0,morphColors:B.morphAttributes.color!==void 0,morphTargetsCount:re,morphTextureStride:ue,numSunLights:y.sun.length,numDirLights:y.directional.length,numPointLights:y.point.length,numSpotLights:y.spot.length,numSpotLightMaps:y.spotLightMap.length,numRectAreaLights:y.rectArea.length,numHemiLights:y.hemi.length,numSunLightShadows:y.sunShadowMap.length,numDirLightShadows:y.directionalShadowMap.length,numPointLightShadows:y.pointShadowMap.length,numSpotLightShadows:y.spotShadowMap.length,numSpotLightShadowsWithMaps:y.numSpotLightShadowsWithMaps,numLightProbes:y.numLightProbes,numLightProbeGrids:U.length,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:S.dithering,shadowMapEnabled:n.shadowMap.enabled&&L.length>0,shadowMapType:n.shadowMap.type,toneMapping:Ue,decodeVideoTexture:ye&&S.map.isVideoTexture===!0&&nt.getTransfer(S.map.colorSpace)===gt,decodeVideoTextureEmissive:Kt&&S.emissiveMap.isVideoTexture===!0&&nt.getTransfer(S.emissiveMap.colorSpace)===gt,premultipliedAlpha:S.premultipliedAlpha,doubleSided:S.side===gi,flipSided:S.side===gn,useDepthPacking:S.depthPacking>=0,depthPacking:S.depthPacking||0,index0AttributeName:S.index0AttributeName,extensionClipCullDistance:oe&&S.extensions.clipCullDistance===!0&&t.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(oe&&S.extensions.multiDraw===!0||se)&&t.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:t.has("KHR_parallel_shader_compile"),customProgramCacheKey:S.customProgramCacheKey()};return Pe.vertexUv1s=c.has(1),Pe.vertexUv2s=c.has(2),Pe.vertexUv3s=c.has(3),c.clear(),Pe}function _(S){const y=[];if(S.shaderID?y.push(S.shaderID):(y.push(S.customVertexShaderID),y.push(S.customFragmentShaderID)),S.defines!==void 0)for(const L in S.defines)y.push(L),y.push(S.defines[L]);return S.isRawShaderMaterial===!1&&(g(y,S),M(y,S),y.push(n.outputColorSpace)),y.push(S.customProgramCacheKey),y.join()}function g(S,y){S.push(y.precision),S.push(y.outputColorSpace),S.push(y.envMapMode),S.push(y.envMapCubeUVHeight),S.push(y.mapUv),S.push(y.alphaMapUv),S.push(y.lightMapUv),S.push(y.aoMapUv),S.push(y.bumpMapUv),S.push(y.normalMapUv),S.push(y.displacementMapUv),S.push(y.emissiveMapUv),S.push(y.metalnessMapUv),S.push(y.roughnessMapUv),S.push(y.anisotropyMapUv),S.push(y.clearcoatMapUv),S.push(y.clearcoatNormalMapUv),S.push(y.clearcoatRoughnessMapUv),S.push(y.iridescenceMapUv),S.push(y.iridescenceThicknessMapUv),S.push(y.sheenColorMapUv),S.push(y.sheenRoughnessMapUv),S.push(y.specularMapUv),S.push(y.specularColorMapUv),S.push(y.specularIntensityMapUv),S.push(y.transmissionMapUv),S.push(y.thicknessMapUv),S.push(y.combine),S.push(y.fogExp2),S.push(y.sizeAttenuation),S.push(y.morphTargetsCount),S.push(y.morphAttributeCount),S.push(y.numSunLights),S.push(y.numDirLights),S.push(y.numPointLights),S.push(y.numSpotLights),S.push(y.numSpotLightMaps),S.push(y.numHemiLights),S.push(y.numRectAreaLights),S.push(y.numSunLightShadows),S.push(y.numDirLightShadows),S.push(y.numPointLightShadows),S.push(y.numSpotLightShadows),S.push(y.numSpotLightShadowsWithMaps),S.push(y.numLightProbes),S.push(y.shadowMapType),S.push(y.toneMapping),S.push(y.numClippingPlanes),S.push(y.numClipIntersection),S.push(y.depthPacking)}function M(S,y){s.disableAll(),y.instancing&&s.enable(0),y.instancingColor&&s.enable(1),y.instancingMorph&&s.enable(2),y.matcap&&s.enable(3),y.envMap&&s.enable(4),y.normalMapObjectSpace&&s.enable(5),y.normalMapTangentSpace&&s.enable(6),y.clearcoat&&s.enable(7),y.iridescence&&s.enable(8),y.alphaTest&&s.enable(9),y.vertexColors&&s.enable(10),y.vertexAlphas&&s.enable(11),y.vertexUv1s&&s.enable(12),y.vertexUv2s&&s.enable(13),y.vertexUv3s&&s.enable(14),y.vertexTangents&&s.enable(15),y.anisotropy&&s.enable(16),y.alphaHash&&s.enable(17),y.batching&&s.enable(18),y.dispersion&&s.enable(19),y.retroreflection&&s.enable(24),y.batchingColor&&s.enable(20),y.gradientMap&&s.enable(21),y.packedNormalMap&&s.enable(22),y.vertexNormals&&s.enable(23),S.push(s.mask),s.disableAll(),y.fog&&s.enable(0),y.useFog&&s.enable(1),y.flatShading&&s.enable(2),y.logarithmicDepthBuffer&&s.enable(3),y.reversedDepthBuffer&&s.enable(4),y.skinning&&s.enable(5),y.morphTargets&&s.enable(6),y.morphNormals&&s.enable(7),y.morphColors&&s.enable(8),y.premultipliedAlpha&&s.enable(9),y.shadowMapEnabled&&s.enable(10),y.doubleSided&&s.enable(11),y.flipSided&&s.enable(12),y.useDepthPacking&&s.enable(13),y.dithering&&s.enable(14),y.transmission&&s.enable(15),y.sheen&&s.enable(16),y.opaque&&s.enable(17),y.pointsUvs&&s.enable(18),y.decodeVideoTexture&&s.enable(19),y.decodeVideoTextureEmissive&&s.enable(20),y.alphaToCoverage&&s.enable(21),y.numLightProbeGrids>0&&s.enable(22),y.hasPositionAttribute&&s.enable(23),S.push(s.mask)}function E(S){const y=p[S.type];let L;if(y){const C=$n[y];L=Bp.clone(C.uniforms)}else L=S.uniforms;return L}function b(S,y){let L=h.get(y);return L!==void 0?++L.usedTimes:(L=new h_(n,y,S,r),u.push(L),h.set(y,L)),L}function R(S){if(--S.usedTimes===0){const y=u.indexOf(S);u[y]=u[u.length-1],u.pop(),h.delete(S.cacheKey),S.destroy()}}function w(S){o.remove(S)}function D(){o.dispose()}return{getParameters:x,getProgramCacheKey:_,getUniforms:E,acquireProgram:b,releaseProgram:R,releaseShaderCache:w,programs:u,dispose:D}}function __(){let n=new WeakMap;function e(s){return n.has(s)}function t(s){let o=n.get(s);return o===void 0&&(o={},n.set(s,o)),o}function i(s){n.delete(s)}function r(s,o,c){n.get(s)[o]=c}function a(){n=new WeakMap}return{has:e,get:t,remove:i,update:r,dispose:a}}function x_(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.material.id!==e.material.id?n.material.id-e.material.id:n.materialVariant!==e.materialVariant?n.materialVariant-e.materialVariant:n.z!==e.z?n.z-e.z:n.id-e.id}function Uc(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.z!==e.z?e.z-n.z:n.id-e.id}function Oc(){const n=[];let e=0;const t=[],i=[],r=[];function a(){e=0,t.length=0,i.length=0,r.length=0}function s(f){let p=0;return f.isInstancedMesh&&(p+=2),f.isSkinnedMesh&&(p+=1),p}function o(f,p,m,x,_,g){let M=n[e];return M===void 0?(M={id:f.id,object:f,geometry:p,material:m,materialVariant:s(f),groupOrder:x,renderOrder:f.renderOrder,z:_,group:g},n[e]=M):(M.id=f.id,M.object=f,M.geometry=p,M.material=m,M.materialVariant=s(f),M.groupOrder=x,M.renderOrder=f.renderOrder,M.z=_,M.group=g),e++,M}function c(f,p,m,x,_,g,M){M.reversedDepth===!0&&(_=-_);const E=o(f,p,m,x,_,g);m.transmission>0?i.push(E):m.transparent===!0?r.push(E):t.push(E)}function u(f,p,m,x,_,g){const M=o(f,p,m,x,_,g);m.transmission>0?i.unshift(M):m.transparent===!0?r.unshift(M):t.unshift(M)}function h(f,p){t.length>1&&t.sort(f||x_),i.length>1&&i.sort(p||Uc),r.length>1&&r.sort(p||Uc)}function d(){for(let f=e,p=n.length;f<p;f++){const m=n[f];if(m.id===null)break;m.id=null,m.object=null,m.geometry=null,m.material=null,m.group=null}}return{opaque:t,transmissive:i,transparent:r,init:a,push:c,unshift:u,finish:d,sort:h}}function M_(){let n=new WeakMap;function e(i,r){const a=n.get(i);let s;return a===void 0?(s=new Oc,n.set(i,[s])):r>=a.length?(s=new Oc,a.push(s)):s=a[r],s}function t(){n=new WeakMap}return{get:e,dispose:t}}function v_(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={direction:new Y,color:new ct};break;case"SpotLight":t={position:new Y,direction:new Y,color:new ct,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new Y,color:new ct,distance:0,decay:0};break;case"HemisphereLight":t={direction:new Y,skyColor:new ct,groundColor:new ct};break;case"RectAreaLight":t={color:new ct,position:new Y,halfWidth:new Y,halfHeight:new Y};break}return n[e.id]=t,t}}}function S_(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new We};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new We};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new We,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[e.id]=t,t}}}let b_=0;function E_(n,e){return(e.castShadow?2:0)-(n.castShadow?2:0)+(e.map?1:0)-(n.map?1:0)}function y_(n){const e=new v_,t=S_(),i={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let u=0;u<9;u++)i.probe.push(new Y);const r=new Y,a=new Ft,s=new Ft;function o(u){let h=0,d=0,f=0;for(let N=0;N<9;N++)i.probe[N].set(0,0,0);let p=0,m=0,x=0,_=0,g=0,M=0,E=0,b=0,R=0,w=0,D=0,S=0,y=0,L=0;u.sort(E_);for(let N=0,U=u.length;N<U;N++){const I=u[N],B=I.color,V=I.intensity,$=I.distance;let ae=null;if(I.shadow&&I.shadow.map&&(I.shadow.map.texture.format===rr?ae=I.shadow.map.texture:ae=I.shadow.map.depthTexture||I.shadow.map.texture),I.isAmbientLight)h+=B.r*V,d+=B.g*V,f+=B.b*V;else if(I.isLightProbe){for(let q=0;q<9;q++)i.probe[q].addScaledVector(I.sh.coefficients[q],V);L++}else if(I.isSunLight){const q=e.get(I);if(q.color.copy(I.color).multiplyScalar(I.intensity),I.castShadow){const ee=I.shadow,O=t.get(I);O.shadowIntensity=ee.intensity,O.shadowBias=ee.bias,O.shadowNormalBias=ee.normalBias,O.shadowRadius=ee.radius,O.shadowMapSize.copy(ee.mapSize).multiply(ee.getFrameExtents()),i.sunShadow[m]=O,i.sunShadowMap[m]=ae;const re=ee.getViewportCount();for(let ue=0;ue<re;ue++)i.sunShadowMatrix[x+ue]=ee.getMatrix(ue),i.sunShadowCascade[x+ue]=ee._cascadeData[ue];x+=re,m++}i.sun[p]=q,p++}else if(I.isDirectionalLight){const q=e.get(I);if(q.color.copy(I.color).multiplyScalar(I.intensity),I.castShadow){const ee=I.shadow,O=t.get(I);O.shadowIntensity=ee.intensity,O.shadowBias=ee.bias,O.shadowNormalBias=ee.normalBias,O.shadowRadius=ee.radius,O.shadowMapSize=ee.mapSize,i.directionalShadow[_]=O,i.directionalShadowMap[_]=ae,i.directionalShadowMatrix[_]=I.shadow.matrix,R++}i.directional[_]=q,_++}else if(I.isSpotLight){const q=e.get(I);q.position.setFromMatrixPosition(I.matrixWorld),q.color.copy(B).multiplyScalar(V),q.distance=$,q.coneCos=Math.cos(I.angle),q.penumbraCos=Math.cos(I.angle*(1-I.penumbra)),q.decay=I.decay,i.spot[M]=q;const ee=I.shadow;if(I.map&&(i.spotLightMap[S]=I.map,S++,ee.updateMatrices(I),I.castShadow&&y++),i.spotLightMatrix[M]=ee.matrix,I.castShadow){const O=t.get(I);O.shadowIntensity=ee.intensity,O.shadowBias=ee.bias,O.shadowNormalBias=ee.normalBias,O.shadowRadius=ee.radius,O.shadowMapSize=ee.mapSize,i.spotShadow[M]=O,i.spotShadowMap[M]=ae,D++}M++}else if(I.isRectAreaLight){const q=e.get(I);q.color.copy(B).multiplyScalar(V),q.halfWidth.set(I.width*.5,0,0),q.halfHeight.set(0,I.height*.5,0),i.rectArea[E]=q,E++}else if(I.isPointLight){const q=e.get(I);if(q.color.copy(I.color).multiplyScalar(I.intensity),q.distance=I.distance,q.decay=I.decay,I.castShadow){const ee=I.shadow,O=t.get(I);O.shadowIntensity=ee.intensity,O.shadowBias=ee.bias,O.shadowNormalBias=ee.normalBias,O.shadowRadius=ee.radius,O.shadowMapSize=ee.mapSize,O.shadowCameraNear=ee.camera.near,O.shadowCameraFar=ee.camera.far,i.pointShadow[g]=O,i.pointShadowMap[g]=ae,i.pointShadowMatrix[g]=I.shadow.matrix,w++}i.point[g]=q,g++}else if(I.isHemisphereLight){const q=e.get(I);q.skyColor.copy(I.color).multiplyScalar(V),q.groundColor.copy(I.groundColor).multiplyScalar(V),i.hemi[b]=q,b++}}E>0&&(n.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=Me.LTC_FLOAT_1,i.rectAreaLTC2=Me.LTC_FLOAT_2):(i.rectAreaLTC1=Me.LTC_HALF_1,i.rectAreaLTC2=Me.LTC_HALF_2)),i.ambient[0]=h,i.ambient[1]=d,i.ambient[2]=f;const C=i.hash;(C.sunLength!==p||C.directionalLength!==_||C.pointLength!==g||C.spotLength!==M||C.rectAreaLength!==E||C.hemiLength!==b||C.numSunShadows!==m||C.numDirectionalShadows!==R||C.numPointShadows!==w||C.numSpotShadows!==D||C.numSpotMaps!==S||C.numLightProbes!==L)&&(i.sun.length=p,i.directional.length=_,i.spot.length=M,i.rectArea.length=E,i.point.length=g,i.hemi.length=b,i.sunShadow.length=m,i.sunShadowMap.length=m,i.sunShadowMatrix.length=x,i.sunShadowCascade.length=x,i.directionalShadow.length=R,i.directionalShadowMap.length=R,i.directionalShadowMatrix.length=R,i.pointShadow.length=w,i.pointShadowMap.length=w,i.pointShadowMatrix.length=w,i.spotShadow.length=D,i.spotShadowMap.length=D,i.spotLightMatrix.length=D+S-y,i.spotLightMap.length=S,i.numSpotLightShadowsWithMaps=y,i.numLightProbes=L,C.sunLength=p,C.directionalLength=_,C.pointLength=g,C.spotLength=M,C.rectAreaLength=E,C.hemiLength=b,C.numSunShadows=m,C.numDirectionalShadows=R,C.numPointShadows=w,C.numSpotShadows=D,C.numSpotMaps=S,C.numLightProbes=L,i.version=b_++)}function c(u,h){let d=0,f=0,p=0,m=0,x=0,_=0;const g=h.matrixWorldInverse;for(let M=0,E=u.length;M<E;M++){const b=u[M];if(b.isSunLight){const R=i.sun[d];R.direction.setFromMatrixPosition(b.matrixWorld),R.direction.transformDirection(g),d++}else if(b.isDirectionalLight){const R=i.directional[f];R.direction.setFromMatrixPosition(b.matrixWorld),r.setFromMatrixPosition(b.target.matrixWorld),R.direction.sub(r),R.direction.transformDirection(g),f++}else if(b.isSpotLight){const R=i.spot[m];R.position.setFromMatrixPosition(b.matrixWorld),R.position.applyMatrix4(g),R.direction.setFromMatrixPosition(b.matrixWorld),r.setFromMatrixPosition(b.target.matrixWorld),R.direction.sub(r),R.direction.transformDirection(g),m++}else if(b.isRectAreaLight){const R=i.rectArea[x];R.position.setFromMatrixPosition(b.matrixWorld),R.position.applyMatrix4(g),s.identity(),a.copy(b.matrixWorld),a.premultiply(g),s.extractRotation(a),R.halfWidth.set(b.width*.5,0,0),R.halfHeight.set(0,b.height*.5,0),R.halfWidth.applyMatrix4(s),R.halfHeight.applyMatrix4(s),x++}else if(b.isPointLight){const R=i.point[p];R.position.setFromMatrixPosition(b.matrixWorld),R.position.applyMatrix4(g),p++}else if(b.isHemisphereLight){const R=i.hemi[_];R.direction.setFromMatrixPosition(b.matrixWorld),R.direction.transformDirection(g),_++}}}return{setup:o,setupView:c,state:i}}function Fc(n){const e=new y_(n),t=[],i=[],r=[];function a(f){d.camera=f,t.length=0,i.length=0,r.length=0}function s(f){t.push(f)}function o(f){i.push(f)}function c(f){r.push(f)}function u(){e.setup(t)}function h(f){e.setupView(t,f)}const d={lightsArray:t,shadowsArray:i,lightProbeGridArray:r,camera:null,lights:e,transmissionRenderTarget:{},textureUnits:0};return{init:a,state:d,setupLights:u,setupLightsView:h,pushLight:s,pushShadow:o,pushLightProbeGrid:c}}function w_(n){let e=new WeakMap;function t(r,a=0){const s=e.get(r);let o;return s===void 0?(o=new Fc(n),e.set(r,[o])):a>=s.length?(o=new Fc(n),s.push(o)):o=s[a],o}function i(){e=new WeakMap}return{get:t,dispose:i}}const A_=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,T_=`uniform sampler2D shadow_pass;
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
}`,R_=[new Y(1,0,0),new Y(-1,0,0),new Y(0,1,0),new Y(0,-1,0),new Y(0,0,1),new Y(0,0,-1)],C_=[new Y(0,-1,0),new Y(0,-1,0),new Y(0,0,1),new Y(0,0,-1),new Y(0,-1,0),new Y(0,-1,0)],Bc=new Ft,Jr=new Y,ao=new Y;function L_(n,e,t){let i=new El;const r=new We,a=new We,s=new Dt,o=new Gp,c=new Vp,u={},h=t.maxTextureSize,d={[nr]:gn,[gn]:nr,[gi]:gi},f=new on({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new We},radius:{value:4}},vertexShader:A_,fragmentShader:T_}),p=f.clone();p.defines.HORIZONTAL_PASS=1;const m=new si;m.setAttribute("position",new ni(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const x=new dn(m,f),_=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=ja;let g=this.type;this.render=function(w,D,S){if(_.enabled===!1||_.autoUpdate===!1&&_.needsUpdate===!1||w.length===0)return;this.type===L0&&(Ge("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."),this.type=ja);const y=n.getRenderTarget(),L=n.getActiveCubeFace(),C=n.getActiveMipmapLevel(),N=n.state;N.setBlending(Si),N.buffers.depth.getReversed()===!0?N.buffers.color.setClear(0,0,0,0):N.buffers.color.setClear(1,1,1,1),N.buffers.depth.setTest(!0),N.setScissorTest(!1);const U=g!==this.type;U&&D.traverse(function(I){I.material&&(Array.isArray(I.material)?I.material.forEach(B=>B.needsUpdate=!0):I.material.needsUpdate=!0)});for(let I=0,B=w.length;I<B;I++){const V=w[I],$=V.shadow;if($===void 0){Ge("WebGLShadowMap:",V,"has no shadow.");continue}if($.autoUpdate===!1&&$.needsUpdate===!1)continue;r.copy($.mapSize);const ae=$.getFrameExtents();r.multiply(ae),a.copy($.mapSize),(r.x>h||r.y>h)&&(r.x>h&&(a.x=Math.floor(h/ae.x),r.x=a.x*ae.x,$.mapSize.x=a.x),r.y>h&&(a.y=Math.floor(h/ae.y),r.y=a.y*ae.y,$.mapSize.y=a.y));const q=n.state.buffers.depth.getReversed();if($.camera._reversedDepth=q,$.map===null||U===!0){if($.map!==null&&($.map.depthTexture!==null&&($.map.depthTexture.dispose(),$.map.depthTexture=null),$.map.dispose()),this.type===ta){if(V.isPointLight){Ge("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}$.map=new Cn(r.x,r.y,{format:rr,type:ai,minFilter:zt,magFilter:zt,generateMipmaps:!1}),$.map.texture.name=V.name+".shadowMap",$.map.depthTexture=new da(r.x,r.y,jn),$.map.depthTexture.name=V.name+".shadowMapDepth",$.map.depthTexture.format=wi,$.map.depthTexture.compareFunction=null,$.map.depthTexture.minFilter=Wt,$.map.depthTexture.magFilter=Wt}else V.isPointLight?($.map=new qu(r.x),$.map.depthTexture=new Op(r.x,ri)):($.map=new Cn(r.x,r.y),$.map.depthTexture=new da(r.x,r.y,ri)),$.map.depthTexture.name=V.name+".shadowMap",$.map.depthTexture.format=wi,this.type===ja?($.map.depthTexture.compareFunction=q?vl:Ml,$.map.depthTexture.minFilter=zt,$.map.depthTexture.magFilter=zt):($.map.depthTexture.compareFunction=null,$.map.depthTexture.minFilter=Wt,$.map.depthTexture.magFilter=Wt);$.camera.updateProjectionMatrix()}$.map.isWebGLCubeRenderTarget!==!0&&($.map.width!==r.x||$.map.height!==r.y)&&$.map.setSize(r.x,r.y);const ee=$.map.isWebGLCubeRenderTarget?6:$.getViewportCount();V.isPointLight!==!0&&$.updateMatrices(V,S);for(let O=0;O<ee;O++){const re=$.getCamera(O);if(V.isPointLight){const ue=$.camera,Ce=$.matrix,Fe=V.distance||ue.far;Fe!==ue.far&&(ue.far=Fe,ue.updateProjectionMatrix()),Jr.setFromMatrixPosition(V.matrixWorld),ue.position.copy(Jr),ao.copy(ue.position),ao.add(R_[O]),ue.up.copy(C_[O]),ue.lookAt(ao),ue.updateMatrixWorld(),Ce.makeTranslation(-Jr.x,-Jr.y,-Jr.z),Bc.multiplyMatrices(ue.projectionMatrix,ue.matrixWorldInverse),$._frustum.setFromProjectionMatrix(Bc,ue.coordinateSystem,ue.reversedDepth)}if($.map.isWebGLCubeRenderTarget)n.setRenderTarget($.map,O),n.clear();else{O===0&&(n.setRenderTarget($.map),n.clear());const ue=$.getViewport(O);s.set(a.x*ue.x,a.y*ue.y,a.x*ue.z,a.y*ue.w),N.viewport(s)}i=$.getFrustum(O),b(D,S,re,V,this.type)}$.isPointLightShadow!==!0&&this.type===ta&&M($,S),$.needsUpdate=!1}g=this.type,_.needsUpdate=!1,n.setRenderTarget(y,L,C)};function M(w,D){const S=e.update(x);f.defines.VSM_SAMPLES!==w.blurSamples&&(f.defines.VSM_SAMPLES=w.blurSamples,p.defines.VSM_SAMPLES=w.blurSamples,f.needsUpdate=!0,p.needsUpdate=!0),w.mapPass===null?w.mapPass=new Cn(r.x,r.y,{format:rr,type:ai}):(w.mapPass.width!==w.map.width||w.mapPass.height!==w.map.height)&&w.mapPass.setSize(w.map.width,w.map.height),f.uniforms.shadow_pass.value=w.map.depthTexture,f.uniforms.resolution.value.set(w.map.width,w.map.height),f.uniforms.radius.value=w.radius,n.setRenderTarget(w.mapPass),n.clear(),n.renderBufferDirect(D,null,S,f,x,null),p.uniforms.shadow_pass.value=w.mapPass.texture,p.uniforms.resolution.value.set(w.map.width,w.map.height),p.uniforms.radius.value=w.radius,n.setRenderTarget(w.map),n.clear(),n.renderBufferDirect(D,null,S,p,x,null)}function E(w,D,S,y){let L=null;const C=S.isPointLight===!0?w.customDistanceMaterial:w.customDepthMaterial;if(C!==void 0)L=C;else if(L=S.isPointLight===!0?c:o,n.localClippingEnabled&&D.clipShadows===!0&&Array.isArray(D.clippingPlanes)&&D.clippingPlanes.length!==0||D.displacementMap&&D.displacementScale!==0||D.alphaMap&&D.alphaTest>0||D.map&&D.alphaTest>0||D.alphaToCoverage===!0){const N=L.uuid,U=D.uuid;let I=u[N];I===void 0&&(I={},u[N]=I);let B=I[U];B===void 0&&(B=L.clone(),I[U]=B,D.addEventListener("dispose",R)),L=B}if(L.visible=D.visible,L.wireframe=D.wireframe,y===ta?L.side=D.shadowSide!==null?D.shadowSide:D.side:L.side=D.shadowSide!==null?D.shadowSide:d[D.side],L.alphaMap=D.alphaMap,L.alphaTest=D.alphaToCoverage===!0?.5:D.alphaTest,L.map=D.map,L.clipShadows=D.clipShadows,L.clippingPlanes=D.clippingPlanes,L.clipIntersection=D.clipIntersection,L.displacementMap=D.displacementMap,L.displacementScale=D.displacementScale,L.displacementBias=D.displacementBias,L.wireframeLinewidth=D.wireframeLinewidth,L.linewidth=D.linewidth,S.isPointLight===!0&&L.isMeshDistanceMaterial===!0){const N=n.properties.get(L);N.light=S}return L}function b(w,D,S,y,L){if(w.visible===!1)return;if(w.layers.test(D.layers)&&(w.isMesh||w.isLine||w.isPoints)&&(w.castShadow||w.receiveShadow&&L===ta)&&(!w.frustumCulled||w.intersectsFrustum(i))){w.modelViewMatrix.multiplyMatrices(S.matrixWorldInverse,w.matrixWorld);const U=e.update(w),I=w.material;if(Array.isArray(I)){const B=U.groups;for(let V=0,$=B.length;V<$;V++){const ae=B[V],q=I[ae.materialIndex];if(q&&q.visible){const ee=E(w,q,y,L);w.onBeforeShadow(n,w,D,S,U,ee,ae),n.renderBufferDirect(S,null,U,ee,w,ae),w.onAfterShadow(n,w,D,S,U,ee,ae)}}}else if(I.visible){const B=E(w,I,y,L);w.onBeforeShadow(n,w,D,S,U,B,null),n.renderBufferDirect(S,null,U,B,w,null),w.onAfterShadow(n,w,D,S,U,B,null)}}const N=w.children;for(let U=0,I=N.length;U<I;U++)b(N[U],D,S,y,L)}function R(w){w.target.removeEventListener("dispose",R);for(const S in u){const y=u[S],L=w.target.uuid;L in y&&(y[L].dispose(),delete y[L])}}}function D_(n,e){function t(){let H=!1;const ge=new Dt;let ne=null;const _e=new Dt(0,0,0,0);return{setMask:function(be){ne!==be&&!H&&(n.colorMask(be,be,be,be),ne=be)},setLocked:function(be){H=be},setClear:function(be,oe,Ue,Pe,yt){yt===!0&&(be*=Pe,oe*=Pe,Ue*=Pe),ge.set(be,oe,Ue,Pe),_e.equals(ge)===!1&&(n.clearColor(be,oe,Ue,Pe),_e.copy(ge))},reset:function(){H=!1,ne=null,_e.set(-1,0,0,0)}}}function i(){let H=!1,ge=!1,ne=null,_e=null,be=null;return{setReversed:function(oe){if(ge!==oe){const Ue=e.get("EXT_clip_control");oe?Ue.clipControlEXT(Ue.LOWER_LEFT_EXT,Ue.ZERO_TO_ONE_EXT):Ue.clipControlEXT(Ue.LOWER_LEFT_EXT,Ue.NEGATIVE_ONE_TO_ONE_EXT),ge=oe;const Pe=be;be=null,this.setClear(Pe)}},getReversed:function(){return ge},setTest:function(oe){oe?ie(n.DEPTH_TEST):G(n.DEPTH_TEST)},setMask:function(oe){ne!==oe&&!H&&(n.depthMask(oe),ne=oe)},setFunc:function(oe){if(ge&&(oe=hp[oe]),_e!==oe){switch(oe){case ho:n.depthFunc(n.NEVER);break;case fo:n.depthFunc(n.ALWAYS);break;case po:n.depthFunc(n.LESS);break;case la:n.depthFunc(n.LEQUAL);break;case mo:n.depthFunc(n.EQUAL);break;case go:n.depthFunc(n.GEQUAL);break;case _o:n.depthFunc(n.GREATER);break;case xo:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}_e=oe}},setLocked:function(oe){H=oe},setClear:function(oe){be!==oe&&(be=oe,ge&&(oe=1-oe),n.clearDepth(oe))},reset:function(){H=!1,ne=null,_e=null,be=null,ge=!1}}}function r(){let H=!1,ge=null,ne=null,_e=null,be=null,oe=null,Ue=null,Pe=null,yt=null;return{setTest:function(ut){H||(ut?ie(n.STENCIL_TEST):G(n.STENCIL_TEST))},setMask:function(ut){ge!==ut&&!H&&(n.stencilMask(ut),ge=ut)},setFunc:function(ut,Dn,Gn){(ne!==ut||_e!==Dn||be!==Gn)&&(n.stencilFunc(ut,Dn,Gn),ne=ut,_e=Dn,be=Gn)},setOp:function(ut,Dn,Gn){(oe!==ut||Ue!==Dn||Pe!==Gn)&&(n.stencilOp(ut,Dn,Gn),oe=ut,Ue=Dn,Pe=Gn)},setLocked:function(ut){H=ut},setClear:function(ut){yt!==ut&&(n.clearStencil(ut),yt=ut)},reset:function(){H=!1,ge=null,ne=null,_e=null,be=null,oe=null,Ue=null,Pe=null,yt=null}}}const a=new t,s=new i,o=new r,c=new WeakMap,u=new WeakMap;let h={},d={},f={},p=new WeakMap,m=[],x=null,_=!1,g=null,M=null,E=null,b=null,R=null,w=null,D=null,S=new ct(0,0,0),y=0,L=!1,C=null,N=null,U=null,I=null,B=null;const V=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let $=!1,ae=0;const q=n.getParameter(n.VERSION);q.indexOf("WebGL")!==-1?(ae=parseFloat(/^WebGL (\d)/.exec(q)[1]),$=ae>=1):q.indexOf("OpenGL ES")!==-1&&(ae=parseFloat(/^OpenGL ES (\d)/.exec(q)[1]),$=ae>=2);let ee=null,O={};const re=n.getParameter(n.SCISSOR_BOX),ue=n.getParameter(n.VIEWPORT),Ce=new Dt().fromArray(re),Fe=new Dt().fromArray(ue);function He(H,ge,ne,_e){const be=new Uint8Array(4),oe=n.createTexture();n.bindTexture(H,oe),n.texParameteri(H,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(H,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let Ue=0;Ue<ne;Ue++)H===n.TEXTURE_3D||H===n.TEXTURE_2D_ARRAY?n.texImage3D(ge,0,n.RGBA,1,1,_e,0,n.RGBA,n.UNSIGNED_BYTE,be):n.texImage2D(ge+Ue,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,be);return oe}const j={};j[n.TEXTURE_2D]=He(n.TEXTURE_2D,n.TEXTURE_2D,1),j[n.TEXTURE_CUBE_MAP]=He(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),j[n.TEXTURE_2D_ARRAY]=He(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),j[n.TEXTURE_3D]=He(n.TEXTURE_3D,n.TEXTURE_3D,1,1),a.setClear(0,0,0,1),s.setClear(1),o.setClear(0),ie(n.DEPTH_TEST),s.setFunc(la),Ye(!1),St(Yl),ie(n.CULL_FACE),Oe(Si);function ie(H){h[H]!==!0&&(n.enable(H),h[H]=!0)}function G(H){h[H]!==!1&&(n.disable(H),h[H]=!1)}function he(H,ge){return f[H]!==ge?(n.bindFramebuffer(H,ge),f[H]=ge,H===n.DRAW_FRAMEBUFFER&&(f[n.FRAMEBUFFER]=ge),H===n.FRAMEBUFFER&&(f[n.DRAW_FRAMEBUFFER]=ge),!0):!1}function se(H,ge){let ne=m,_e=!1;if(H){ne=p.get(ge),ne===void 0&&(ne=[],p.set(ge,ne));const be=H.textures;if(ne.length!==be.length||ne[0]!==n.COLOR_ATTACHMENT0){for(let oe=0,Ue=be.length;oe<Ue;oe++)ne[oe]=n.COLOR_ATTACHMENT0+oe;ne.length=be.length,_e=!0}}else ne[0]!==n.BACK&&(ne[0]=n.BACK,_e=!0);_e&&n.drawBuffers(ne)}function ye(H){return x!==H?(n.useProgram(H),x=H,!0):!1}const $e={[yr]:n.FUNC_ADD,[P0]:n.FUNC_SUBTRACT,[I0]:n.FUNC_REVERSE_SUBTRACT};$e[N0]=n.MIN,$e[U0]=n.MAX;const Le={[O0]:n.ZERO,[F0]:n.ONE,[B0]:n.SRC_COLOR,[fu]:n.SRC_ALPHA,[W0]:n.SRC_ALPHA_SATURATE,[G0]:n.DST_COLOR,[z0]:n.DST_ALPHA,[k0]:n.ONE_MINUS_SRC_COLOR,[pu]:n.ONE_MINUS_SRC_ALPHA,[V0]:n.ONE_MINUS_DST_COLOR,[H0]:n.ONE_MINUS_DST_ALPHA,[Y0]:n.CONSTANT_COLOR,[X0]:n.ONE_MINUS_CONSTANT_COLOR,[K0]:n.CONSTANT_ALPHA,[q0]:n.ONE_MINUS_CONSTANT_ALPHA};function Oe(H,ge,ne,_e,be,oe,Ue,Pe,yt,ut){if(H===Si){_===!0&&(G(n.BLEND),_=!1);return}if(_===!1&&(ie(n.BLEND),_=!0),H!==D0){if(H!==g||ut!==L){if((M!==yr||R!==yr)&&(n.blendEquation(n.FUNC_ADD),M=yr,R=yr),ut)switch(H){case sa:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case Xl:n.blendFunc(n.ONE,n.ONE);break;case Kl:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case ql:n.blendFuncSeparate(n.DST_COLOR,n.ONE_MINUS_SRC_ALPHA,n.ZERO,n.ONE);break;default:st("WebGLState: Invalid blending: ",H);break}else switch(H){case sa:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case Xl:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE,n.ONE,n.ONE);break;case Kl:st("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case ql:st("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:st("WebGLState: Invalid blending: ",H);break}E=null,b=null,w=null,D=null,S.set(0,0,0),y=0,g=H,L=ut}return}be=be||ge,oe=oe||ne,Ue=Ue||_e,(ge!==M||be!==R)&&(n.blendEquationSeparate($e[ge],$e[be]),M=ge,R=be),(ne!==E||_e!==b||oe!==w||Ue!==D)&&(n.blendFuncSeparate(Le[ne],Le[_e],Le[oe],Le[Ue]),E=ne,b=_e,w=oe,D=Ue),(Pe.equals(S)===!1||yt!==y)&&(n.blendColor(Pe.r,Pe.g,Pe.b,yt),S.copy(Pe),y=yt),g=H,L=!1}function Xe(H,ge){H.side===gi?G(n.CULL_FACE):ie(n.CULL_FACE);let ne=H.side===gn;ge&&(ne=!ne),Ye(ne),H.blending===sa&&H.transparent===!1?Oe(Si):Oe(H.blending,H.blendEquation,H.blendSrc,H.blendDst,H.blendEquationAlpha,H.blendSrcAlpha,H.blendDstAlpha,H.blendColor,H.blendAlpha,H.premultipliedAlpha),s.setFunc(H.depthFunc),s.setTest(H.depthTest),s.setMask(H.depthWrite),a.setMask(H.colorWrite);const _e=H.stencilWrite;o.setTest(_e),_e&&(o.setMask(H.stencilWriteMask),o.setFunc(H.stencilFunc,H.stencilRef,H.stencilFuncMask),o.setOp(H.stencilFail,H.stencilZFail,H.stencilZPass)),Kt(H.polygonOffset,H.polygonOffsetFactor,H.polygonOffsetUnits),H.alphaToCoverage===!0?ie(n.SAMPLE_ALPHA_TO_COVERAGE):G(n.SAMPLE_ALPHA_TO_COVERAGE)}function Ye(H){C!==H&&(H?n.frontFace(n.CW):n.frontFace(n.CCW),C=H)}function St(H){H!==R0?(ie(n.CULL_FACE),H!==N&&(H===Yl?n.cullFace(n.BACK):H===C0?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):G(n.CULL_FACE),N=H}function Pt(H){H!==U&&($&&n.lineWidth(H),U=H)}function Kt(H,ge,ne){H?(ie(n.POLYGON_OFFSET_FILL),(I!==ge||B!==ne)&&(I=ge,B=ne,s.getReversed()&&(ge=-ge),n.polygonOffset(ge,ne))):G(n.POLYGON_OFFSET_FILL)}function xt(H){H?ie(n.SCISSOR_TEST):G(n.SCISSOR_TEST)}function bt(H){H===void 0&&(H=n.TEXTURE0+V-1),ee!==H&&(n.activeTexture(H),ee=H)}function z(H,ge,ne){ne===void 0&&(ee===null?ne=n.TEXTURE0+V-1:ne=ee);let _e=O[ne];_e===void 0&&(_e={type:void 0,texture:void 0},O[ne]=_e),(_e.type!==H||_e.texture!==ge)&&(ee!==ne&&(n.activeTexture(ne),ee=ne),n.bindTexture(H,ge||j[H]),_e.type=H,_e.texture=ge)}function Je(){const H=O[ee];H!==void 0&&H.type!==void 0&&(n.bindTexture(H.type,null),H.type=void 0,H.texture=void 0)}function ze(){try{n.compressedTexImage2D(...arguments)}catch(H){st("WebGLState:",H)}}function P(){try{n.compressedTexImage3D(...arguments)}catch(H){st("WebGLState:",H)}}function v(){try{n.texSubImage2D(...arguments)}catch(H){st("WebGLState:",H)}}function F(){try{n.texSubImage3D(...arguments)}catch(H){st("WebGLState:",H)}}function W(){try{n.compressedTexSubImage2D(...arguments)}catch(H){st("WebGLState:",H)}}function Z(){try{n.compressedTexSubImage3D(...arguments)}catch(H){st("WebGLState:",H)}}function le(){try{n.texStorage2D(...arguments)}catch(H){st("WebGLState:",H)}}function de(){try{n.texStorage3D(...arguments)}catch(H){st("WebGLState:",H)}}function Q(){try{n.texImage2D(...arguments)}catch(H){st("WebGLState:",H)}}function te(){try{n.texImage3D(...arguments)}catch(H){st("WebGLState:",H)}}function fe(H){return d[H]!==void 0?d[H]:n.getParameter(H)}function De(H,ge){d[H]!==ge&&(n.pixelStorei(H,ge),d[H]=ge)}function xe(H){Ce.equals(H)===!1&&(n.scissor(H.x,H.y,H.z,H.w),Ce.copy(H))}function me(H){Fe.equals(H)===!1&&(n.viewport(H.x,H.y,H.z,H.w),Fe.copy(H))}function Ne(H,ge){let ne=u.get(ge);ne===void 0&&(ne=new WeakMap,u.set(ge,ne));let _e=ne.get(H);_e===void 0&&(_e=n.getUniformBlockIndex(ge,H.name),ne.set(H,_e))}function ke(H,ge){const _e=u.get(ge).get(H);c.get(ge)!==_e&&(n.uniformBlockBinding(ge,_e,H.__bindingPointIndex),c.set(ge,_e))}function Ke(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),s.setReversed(!1),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),n.pixelStorei(n.PACK_ALIGNMENT,4),n.pixelStorei(n.UNPACK_ALIGNMENT,4),n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,!1),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,n.BROWSER_DEFAULT_WEBGL),n.pixelStorei(n.PACK_ROW_LENGTH,0),n.pixelStorei(n.PACK_SKIP_PIXELS,0),n.pixelStorei(n.PACK_SKIP_ROWS,0),n.pixelStorei(n.UNPACK_ROW_LENGTH,0),n.pixelStorei(n.UNPACK_IMAGE_HEIGHT,0),n.pixelStorei(n.UNPACK_SKIP_PIXELS,0),n.pixelStorei(n.UNPACK_SKIP_ROWS,0),n.pixelStorei(n.UNPACK_SKIP_IMAGES,0),h={},d={},ee=null,O={},f={},p=new WeakMap,m=[],x=null,_=!1,g=null,M=null,E=null,b=null,R=null,w=null,D=null,S=new ct(0,0,0),y=0,L=!1,C=null,N=null,U=null,I=null,B=null,Ce.set(0,0,n.canvas.width,n.canvas.height),Fe.set(0,0,n.canvas.width,n.canvas.height),a.reset(),s.reset(),o.reset()}return{buffers:{color:a,depth:s,stencil:o},enable:ie,disable:G,bindFramebuffer:he,drawBuffers:se,useProgram:ye,setBlending:Oe,setMaterial:Xe,setFlipSided:Ye,setCullFace:St,setLineWidth:Pt,setPolygonOffset:Kt,setScissorTest:xt,activeTexture:bt,bindTexture:z,unbindTexture:Je,compressedTexImage2D:ze,compressedTexImage3D:P,texImage2D:Q,texImage3D:te,pixelStorei:De,getParameter:fe,updateUBOMapping:Ne,uniformBlockBinding:ke,texStorage2D:le,texStorage3D:de,texSubImage2D:v,texSubImage3D:F,compressedTexSubImage2D:W,compressedTexSubImage3D:Z,scissor:xe,viewport:me,reset:Ke}}function P_(n,e,t,i,r,a,s){const o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),u=new We,h=new WeakMap,d=new Set;let f;const p=new WeakMap;let m=!1;try{m=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function x(P,v){return m?new OffscreenCanvas(P,v):hs("canvas")}function _(P,v,F){let W=1;const Z=ze(P);if((Z.width>F||Z.height>F)&&(W=F/Math.max(Z.width,Z.height)),W<1)if(typeof HTMLImageElement<"u"&&P instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&P instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&P instanceof ImageBitmap||typeof VideoFrame<"u"&&P instanceof VideoFrame){const le=Math.floor(W*Z.width),de=Math.floor(W*Z.height);f===void 0&&(f=x(le,de));const Q=v?x(le,de):f;return Q.width=le,Q.height=de,Q.getContext("2d").drawImage(P,0,0,le,de),Ge("WebGLRenderer: Texture has been resized from ("+Z.width+"x"+Z.height+") to ("+le+"x"+de+")."),Q}else return"data"in P&&Ge("WebGLRenderer: Image in DataTexture is too big ("+Z.width+"x"+Z.height+")."),P;return P}function g(P){return P.generateMipmaps}function M(P){n.generateMipmap(P)}function E(P){return P.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:P.isWebGL3DRenderTarget?n.TEXTURE_3D:P.isWebGLArrayRenderTarget||P.isCompressedArrayTexture?n.TEXTURE_2D_ARRAY:n.TEXTURE_2D}function b(P,v,F,W,Z,le=!1){if(P!==null){if(n[P]!==void 0)return n[P];Ge("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+P+"'")}let de;W&&(de=e.get("EXT_texture_norm16"),de||Ge("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let Q=v;if(v===n.RED&&(F===n.FLOAT&&(Q=n.R32F),F===n.HALF_FLOAT&&(Q=n.R16F),F===n.UNSIGNED_BYTE&&(Q=n.R8),F===n.UNSIGNED_SHORT&&de&&(Q=de.R16_EXT),F===n.SHORT&&de&&(Q=de.R16_SNORM_EXT)),v===n.RED_INTEGER&&(F===n.UNSIGNED_BYTE&&(Q=n.R8UI),F===n.UNSIGNED_SHORT&&(Q=n.R16UI),F===n.UNSIGNED_INT&&(Q=n.R32UI),F===n.BYTE&&(Q=n.R8I),F===n.SHORT&&(Q=n.R16I),F===n.INT&&(Q=n.R32I)),v===n.RG&&(F===n.FLOAT&&(Q=n.RG32F),F===n.HALF_FLOAT&&(Q=n.RG16F),F===n.UNSIGNED_BYTE&&(Q=n.RG8),F===n.UNSIGNED_SHORT&&de&&(Q=de.RG16_EXT),F===n.SHORT&&de&&(Q=de.RG16_SNORM_EXT)),v===n.RG_INTEGER&&(F===n.UNSIGNED_BYTE&&(Q=n.RG8UI),F===n.UNSIGNED_SHORT&&(Q=n.RG16UI),F===n.UNSIGNED_INT&&(Q=n.RG32UI),F===n.BYTE&&(Q=n.RG8I),F===n.SHORT&&(Q=n.RG16I),F===n.INT&&(Q=n.RG32I)),v===n.RGB_INTEGER&&(F===n.UNSIGNED_BYTE&&(Q=n.RGB8UI),F===n.UNSIGNED_SHORT&&(Q=n.RGB16UI),F===n.UNSIGNED_INT&&(Q=n.RGB32UI),F===n.BYTE&&(Q=n.RGB8I),F===n.SHORT&&(Q=n.RGB16I),F===n.INT&&(Q=n.RGB32I)),v===n.RGBA_INTEGER&&(F===n.UNSIGNED_BYTE&&(Q=n.RGBA8UI),F===n.UNSIGNED_SHORT&&(Q=n.RGBA16UI),F===n.UNSIGNED_INT&&(Q=n.RGBA32UI),F===n.BYTE&&(Q=n.RGBA8I),F===n.SHORT&&(Q=n.RGBA16I),F===n.INT&&(Q=n.RGBA32I)),v===n.RGB&&(F===n.UNSIGNED_SHORT&&de&&(Q=de.RGB16_EXT),F===n.SHORT&&de&&(Q=de.RGB16_SNORM_EXT),F===n.UNSIGNED_INT_5_9_9_9_REV&&(Q=n.RGB9_E5),F===n.UNSIGNED_INT_10F_11F_11F_REV&&(Q=n.R11F_G11F_B10F)),v===n.RGBA){const te=le?cs:nt.getTransfer(Z);F===n.FLOAT&&(Q=n.RGBA32F),F===n.HALF_FLOAT&&(Q=n.RGBA16F),F===n.UNSIGNED_BYTE&&(Q=te===gt?n.SRGB8_ALPHA8:n.RGBA8),F===n.UNSIGNED_SHORT&&de&&(Q=de.RGBA16_EXT),F===n.SHORT&&de&&(Q=de.RGBA16_SNORM_EXT),F===n.UNSIGNED_SHORT_4_4_4_4&&(Q=n.RGBA4),F===n.UNSIGNED_SHORT_5_5_5_1&&(Q=n.RGB5_A1)}return(Q===n.R16F||Q===n.R32F||Q===n.RG16F||Q===n.RG32F||Q===n.RGBA16F||Q===n.RGBA32F)&&e.get("EXT_color_buffer_float"),Q}function R(P,v){let F;return P?v===null||v===ri||v===ua?F=n.DEPTH24_STENCIL8:v===jn?F=n.DEPTH32F_STENCIL8:v===ca&&(F=n.DEPTH24_STENCIL8,Ge("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):v===null||v===ri||v===ua?F=n.DEPTH_COMPONENT24:v===jn?F=n.DEPTH_COMPONENT32F:v===ca&&(F=n.DEPTH_COMPONENT16),F}function w(P,v){return g(P)===!0||P.isFramebufferTexture&&P.minFilter!==Wt&&P.minFilter!==zt?Math.log2(Math.max(v.width,v.height))+1:P.mipmaps!==void 0&&P.mipmaps.length>0?P.mipmaps.length:P.isCompressedTexture&&Array.isArray(P.image)?v.mipmaps.length:1}function D(P){const v=P.target;v.removeEventListener("dispose",D),y(v),v.isVideoTexture&&h.delete(v),v.isHTMLTexture&&d.delete(v)}function S(P){const v=P.target;v.removeEventListener("dispose",S),C(v)}function y(P){const v=i.get(P);if(v.__webglInit===void 0)return;const F=P.source,W=p.get(F);if(W){const Z=W[v.__cacheKey];Z.usedTimes--,Z.usedTimes===0&&L(P),Object.keys(W).length===0&&p.delete(F)}i.remove(P)}function L(P){const v=i.get(P);n.deleteTexture(v.__webglTexture);const F=P.source,W=p.get(F);delete W[v.__cacheKey],s.memory.textures--}function C(P){const v=i.get(P);if(P.depthTexture&&(P.depthTexture.dispose(),i.remove(P.depthTexture)),P.isWebGLCubeRenderTarget)for(let W=0;W<6;W++){if(Array.isArray(v.__webglFramebuffer[W]))for(let Z=0;Z<v.__webglFramebuffer[W].length;Z++)n.deleteFramebuffer(v.__webglFramebuffer[W][Z]);else n.deleteFramebuffer(v.__webglFramebuffer[W]);v.__webglDepthbuffer&&n.deleteRenderbuffer(v.__webglDepthbuffer[W])}else{if(Array.isArray(v.__webglFramebuffer))for(let W=0;W<v.__webglFramebuffer.length;W++)n.deleteFramebuffer(v.__webglFramebuffer[W]);else n.deleteFramebuffer(v.__webglFramebuffer);if(v.__webglDepthbuffer&&n.deleteRenderbuffer(v.__webglDepthbuffer),v.__webglMultisampledFramebuffer&&n.deleteFramebuffer(v.__webglMultisampledFramebuffer),v.__webglColorRenderbuffer)for(let W=0;W<v.__webglColorRenderbuffer.length;W++)v.__webglColorRenderbuffer[W]&&n.deleteRenderbuffer(v.__webglColorRenderbuffer[W]);v.__webglDepthRenderbuffer&&n.deleteRenderbuffer(v.__webglDepthRenderbuffer)}const F=P.textures;for(let W=0,Z=F.length;W<Z;W++){const le=i.get(F[W]);le.__webglTexture&&(n.deleteTexture(le.__webglTexture),s.memory.textures--),i.remove(F[W])}i.remove(P)}let N=0;function U(){N=0}function I(){return N}function B(P){N=P}function V(){const P=N;return P>=r.maxTextures&&Ge("WebGLTextures: Trying to use "+(P+1)+" texture units while this GPU supports only "+r.maxTextures),N+=1,P}function $(P){const v=[];return v.push(P.wrapS),v.push(P.wrapT),v.push(P.wrapR||0),v.push(P.magFilter),v.push(P.minFilter),v.push(P.anisotropy),v.push(P.internalFormat),v.push(P.format),v.push(P.type),v.push(P.generateMipmaps),v.push(P.premultiplyAlpha),v.push(P.flipY),v.push(P.unpackAlignment),v.push(P.colorSpace),v.join()}function ae(P,v){const F=i.get(P);if(P.isVideoTexture&&z(P),P.isRenderTargetTexture===!1&&P.isExternalTexture!==!0&&P.version>0&&F.__version!==P.version){const W=P.image;if(W===null)Ge("WebGLRenderer: Texture marked for update but no image data found.");else if(W.complete===!1)Ge("WebGLRenderer: Texture marked for update but image is incomplete");else{G(F,P,v);return}}else P.isExternalTexture&&(F.__webglTexture=P.sourceTexture?P.sourceTexture:null);t.bindTexture(n.TEXTURE_2D,F.__webglTexture,n.TEXTURE0+v)}function q(P,v){const F=i.get(P);if(P.isRenderTargetTexture===!1&&P.version>0&&F.__version!==P.version){G(F,P,v);return}else P.isExternalTexture&&(F.__webglTexture=P.sourceTexture?P.sourceTexture:null);t.bindTexture(n.TEXTURE_2D_ARRAY,F.__webglTexture,n.TEXTURE0+v)}function ee(P,v){const F=i.get(P);if(P.isRenderTargetTexture===!1&&P.version>0&&F.__version!==P.version){G(F,P,v);return}t.bindTexture(n.TEXTURE_3D,F.__webglTexture,n.TEXTURE0+v)}function O(P,v){const F=i.get(P);if(P.isCubeDepthTexture!==!0&&P.version>0&&F.__version!==P.version){he(F,P,v);return}t.bindTexture(n.TEXTURE_CUBE_MAP,F.__webglTexture,n.TEXTURE0+v)}const re={[Mo]:n.REPEAT,[_i]:n.CLAMP_TO_EDGE,[vo]:n.MIRRORED_REPEAT},ue={[Wt]:n.NEAREST,[J0]:n.NEAREST_MIPMAP_NEAREST,[Ea]:n.NEAREST_MIPMAP_LINEAR,[zt]:n.LINEAR,[Ls]:n.LINEAR_MIPMAP_NEAREST,[Qi]:n.LINEAR_MIPMAP_LINEAR},Ce={[tp]:n.NEVER,[sp]:n.ALWAYS,[np]:n.LESS,[Ml]:n.LEQUAL,[ip]:n.EQUAL,[vl]:n.GEQUAL,[rp]:n.GREATER,[ap]:n.NOTEQUAL};function Fe(P,v){if(v.type===jn&&e.has("OES_texture_float_linear")===!1&&(v.magFilter===zt||v.magFilter===Ls||v.magFilter===Ea||v.magFilter===Qi||v.minFilter===zt||v.minFilter===Ls||v.minFilter===Ea||v.minFilter===Qi)&&Ge("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),n.texParameteri(P,n.TEXTURE_WRAP_S,re[v.wrapS]),n.texParameteri(P,n.TEXTURE_WRAP_T,re[v.wrapT]),(P===n.TEXTURE_3D||P===n.TEXTURE_2D_ARRAY)&&n.texParameteri(P,n.TEXTURE_WRAP_R,re[v.wrapR]),n.texParameteri(P,n.TEXTURE_MAG_FILTER,ue[v.magFilter]),n.texParameteri(P,n.TEXTURE_MIN_FILTER,ue[v.minFilter]),v.compareFunction&&(n.texParameteri(P,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(P,n.TEXTURE_COMPARE_FUNC,Ce[v.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(v.magFilter===Wt||v.minFilter!==Ea&&v.minFilter!==Qi||v.type===jn&&e.has("OES_texture_float_linear")===!1)return;if(v.anisotropy>1||i.get(v).__currentAnisotropy){const F=e.get("EXT_texture_filter_anisotropic");n.texParameterf(P,F.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(v.anisotropy,r.getMaxAnisotropy())),i.get(v).__currentAnisotropy=v.anisotropy}}}function He(P,v){let F=!1;P.__webglInit===void 0&&(P.__webglInit=!0,v.addEventListener("dispose",D));const W=v.source;let Z=p.get(W);Z===void 0&&(Z={},p.set(W,Z));const le=$(v);if(le!==P.__cacheKey){Z[le]===void 0&&(Z[le]={texture:n.createTexture(),usedTimes:0},s.memory.textures++,F=!0),Z[le].usedTimes++;const de=Z[P.__cacheKey];de!==void 0&&(Z[P.__cacheKey].usedTimes--,de.usedTimes===0&&L(v)),P.__cacheKey=le,P.__webglTexture=Z[le].texture}return F}function j(P,v,F){return Math.floor(Math.floor(P/F)/v)}function ie(P,v,F,W){const le=P.updateRanges;if(le.length===0)t.texSubImage2D(n.TEXTURE_2D,0,0,0,v.width,v.height,F,W,v.data);else{le.sort((De,xe)=>De.start-xe.start);let de=0;for(let De=1;De<le.length;De++){const xe=le[de],me=le[De],Ne=xe.start+xe.count,ke=j(me.start,v.width,4),Ke=j(xe.start,v.width,4);me.start<=Ne+1&&ke===Ke&&j(me.start+me.count-1,v.width,4)===ke?xe.count=Math.max(xe.count,me.start+me.count-xe.start):(++de,le[de]=me)}le.length=de+1;const Q=t.getParameter(n.UNPACK_ROW_LENGTH),te=t.getParameter(n.UNPACK_SKIP_PIXELS),fe=t.getParameter(n.UNPACK_SKIP_ROWS);t.pixelStorei(n.UNPACK_ROW_LENGTH,v.width);for(let De=0,xe=le.length;De<xe;De++){const me=le[De],Ne=Math.floor(me.start/4),ke=Math.ceil(me.count/4),Ke=Ne%v.width,H=Math.floor(Ne/v.width),ge=ke,ne=1;t.pixelStorei(n.UNPACK_SKIP_PIXELS,Ke),t.pixelStorei(n.UNPACK_SKIP_ROWS,H),t.texSubImage2D(n.TEXTURE_2D,0,Ke,H,ge,ne,F,W,v.data)}P.clearUpdateRanges(),t.pixelStorei(n.UNPACK_ROW_LENGTH,Q),t.pixelStorei(n.UNPACK_SKIP_PIXELS,te),t.pixelStorei(n.UNPACK_SKIP_ROWS,fe)}}function G(P,v,F){let W=n.TEXTURE_2D;(v.isDataArrayTexture||v.isCompressedArrayTexture)&&(W=n.TEXTURE_2D_ARRAY),v.isData3DTexture&&(W=n.TEXTURE_3D);const Z=He(P,v),le=v.source;t.bindTexture(W,P.__webglTexture,n.TEXTURE0+F);const de=i.get(le);if(le.version!==de.__version||Z===!0){if(t.activeTexture(n.TEXTURE0+F),(typeof ImageBitmap<"u"&&v.image instanceof ImageBitmap)===!1){const ne=nt.getPrimaries(nt.workingColorSpace),_e=v.colorSpace===On?null:nt.getPrimaries(v.colorSpace),be=v.colorSpace===On||ne===_e?n.NONE:n.BROWSER_DEFAULT_WEBGL;t.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,v.flipY),t.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,v.premultiplyAlpha),t.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,be)}t.pixelStorei(n.UNPACK_ALIGNMENT,v.unpackAlignment);let te=_(v.image,!1,r.maxTextureSize);te=Je(v,te);const fe=a.convert(v.format,v.colorSpace),De=a.convert(v.type);let xe=b(v.internalFormat,fe,De,v.normalized,v.colorSpace,v.isVideoTexture);Fe(W,v);let me;const Ne=v.mipmaps,ke=v.isVideoTexture!==!0,Ke=de.__version===void 0||Z===!0,H=le.dataReady,ge=w(v,te);if(v.isDepthTexture)xe=R(v.format===ji,v.type),Ke&&(ke?t.texStorage2D(n.TEXTURE_2D,1,xe,te.width,te.height):t.texImage2D(n.TEXTURE_2D,0,xe,te.width,te.height,0,fe,De,null));else if(v.isDataTexture)if(Ne.length>0){ke&&Ke&&t.texStorage2D(n.TEXTURE_2D,ge,xe,Ne[0].width,Ne[0].height);for(let ne=0,_e=Ne.length;ne<_e;ne++)me=Ne[ne],ke?H&&t.texSubImage2D(n.TEXTURE_2D,ne,0,0,me.width,me.height,fe,De,me.data):t.texImage2D(n.TEXTURE_2D,ne,xe,me.width,me.height,0,fe,De,me.data);v.generateMipmaps=!1}else ke?(Ke&&t.texStorage2D(n.TEXTURE_2D,ge,xe,te.width,te.height),H&&ie(v,te,fe,De)):t.texImage2D(n.TEXTURE_2D,0,xe,te.width,te.height,0,fe,De,te.data);else if(v.isCompressedTexture)if(v.isCompressedArrayTexture){ke&&Ke&&t.texStorage3D(n.TEXTURE_2D_ARRAY,ge,xe,Ne[0].width,Ne[0].height,te.depth);for(let ne=0,_e=Ne.length;ne<_e;ne++)if(me=Ne[ne],v.format!==Rn)if(fe!==null)if(ke){if(H)if(v.layerUpdates.size>0){const be=gc(me.width,me.height,v.format,v.type);for(const oe of v.layerUpdates){const Ue=me.data.subarray(oe*be/me.data.BYTES_PER_ELEMENT,(oe+1)*be/me.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,ne,0,0,oe,me.width,me.height,1,fe,Ue)}}else t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,ne,0,0,0,me.width,me.height,te.depth,fe,me.data)}else t.compressedTexImage3D(n.TEXTURE_2D_ARRAY,ne,xe,me.width,me.height,te.depth,0,me.data,0,0);else Ge("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else ke?H&&t.texSubImage3D(n.TEXTURE_2D_ARRAY,ne,0,0,0,me.width,me.height,te.depth,fe,De,me.data):t.texImage3D(n.TEXTURE_2D_ARRAY,ne,xe,me.width,me.height,te.depth,0,fe,De,me.data);v.layerUpdates.size>0&&v.clearLayerUpdates()}else{ke&&Ke&&t.texStorage2D(n.TEXTURE_2D,ge,xe,Ne[0].width,Ne[0].height);for(let ne=0,_e=Ne.length;ne<_e;ne++)me=Ne[ne],v.format!==Rn?fe!==null?ke?H&&t.compressedTexSubImage2D(n.TEXTURE_2D,ne,0,0,me.width,me.height,fe,me.data):t.compressedTexImage2D(n.TEXTURE_2D,ne,xe,me.width,me.height,0,me.data):Ge("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):ke?H&&t.texSubImage2D(n.TEXTURE_2D,ne,0,0,me.width,me.height,fe,De,me.data):t.texImage2D(n.TEXTURE_2D,ne,xe,me.width,me.height,0,fe,De,me.data)}else if(v.isDataArrayTexture)if(ke){if(Ke&&t.texStorage3D(n.TEXTURE_2D_ARRAY,ge,xe,te.width,te.height,te.depth),H)if(v.layerUpdates.size>0){const ne=gc(te.width,te.height,v.format,v.type);for(const _e of v.layerUpdates){const be=te.data.subarray(_e*ne/te.data.BYTES_PER_ELEMENT,(_e+1)*ne/te.data.BYTES_PER_ELEMENT);t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,_e,te.width,te.height,1,fe,De,be)}v.clearLayerUpdates()}else t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,te.width,te.height,te.depth,fe,De,te.data)}else t.texImage3D(n.TEXTURE_2D_ARRAY,0,xe,te.width,te.height,te.depth,0,fe,De,te.data);else if(v.isData3DTexture)ke?(Ke&&t.texStorage3D(n.TEXTURE_3D,ge,xe,te.width,te.height,te.depth),H&&t.texSubImage3D(n.TEXTURE_3D,0,0,0,0,te.width,te.height,te.depth,fe,De,te.data)):t.texImage3D(n.TEXTURE_3D,0,xe,te.width,te.height,te.depth,0,fe,De,te.data);else if(v.isFramebufferTexture){if(Ke)if(ke)t.texStorage2D(n.TEXTURE_2D,ge,xe,te.width,te.height);else{let ne=te.width,_e=te.height;for(let be=0;be<ge;be++)t.texImage2D(n.TEXTURE_2D,be,xe,ne,_e,0,fe,De,null),ne>>=1,_e>>=1}}else if(v.isHTMLTexture){if("texElementImage2D"in n){const ne=n.canvas;if(ne.hasAttribute("layoutsubtree")||ne.setAttribute("layoutsubtree","true"),te.parentNode!==ne){ne.appendChild(te),d.add(v),ne.onpaint=_e=>{const be=_e.changedElements;for(const oe of d)be.includes(oe.image)&&(oe.needsUpdate=!0)},ne.requestPaint();return}if(n.texElementImage2D.length===3)n.texElementImage2D(n.TEXTURE_2D,n.RGBA8,te);else{const be=n.RGBA,oe=n.RGBA,Ue=n.UNSIGNED_BYTE;n.texElementImage2D(n.TEXTURE_2D,0,be,oe,Ue,te)}n.texParameteri(n.TEXTURE_2D,n.TEXTURE_MIN_FILTER,n.LINEAR),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_S,n.CLAMP_TO_EDGE),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_T,n.CLAMP_TO_EDGE)}}else if(Ne.length>0){if(ke&&Ke){const ne=ze(Ne[0]);t.texStorage2D(n.TEXTURE_2D,ge,xe,ne.width,ne.height)}for(let ne=0,_e=Ne.length;ne<_e;ne++)me=Ne[ne],ke?H&&t.texSubImage2D(n.TEXTURE_2D,ne,0,0,fe,De,me):t.texImage2D(n.TEXTURE_2D,ne,xe,fe,De,me);v.generateMipmaps=!1}else if(ke){if(Ke){const ne=ze(te);t.texStorage2D(n.TEXTURE_2D,ge,xe,ne.width,ne.height)}H&&t.texSubImage2D(n.TEXTURE_2D,0,0,0,fe,De,te)}else t.texImage2D(n.TEXTURE_2D,0,xe,fe,De,te);g(v)&&M(W),de.__version=le.version,v.onUpdate&&v.onUpdate(v)}P.__version=v.version}function he(P,v,F){if(v.image.length!==6)return;const W=He(P,v),Z=v.source;t.bindTexture(n.TEXTURE_CUBE_MAP,P.__webglTexture,n.TEXTURE0+F);const le=i.get(Z);if(Z.version!==le.__version||W===!0){t.activeTexture(n.TEXTURE0+F);const de=nt.getPrimaries(nt.workingColorSpace),Q=v.colorSpace===On?null:nt.getPrimaries(v.colorSpace),te=v.colorSpace===On||de===Q?n.NONE:n.BROWSER_DEFAULT_WEBGL;t.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,v.flipY),t.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,v.premultiplyAlpha),t.pixelStorei(n.UNPACK_ALIGNMENT,v.unpackAlignment),t.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,te);const fe=v.isCompressedTexture||v.image[0].isCompressedTexture,De=v.image[0]&&v.image[0].isDataTexture,xe=[];for(let oe=0;oe<6;oe++)!fe&&!De?xe[oe]=_(v.image[oe],!0,r.maxCubemapSize):xe[oe]=De?v.image[oe].image:v.image[oe],xe[oe]=Je(v,xe[oe]);const me=xe[0],Ne=a.convert(v.format,v.colorSpace),ke=a.convert(v.type),Ke=b(v.internalFormat,Ne,ke,v.normalized,v.colorSpace),H=v.isVideoTexture!==!0,ge=le.__version===void 0||W===!0,ne=Z.dataReady;let _e=w(v,me);Fe(n.TEXTURE_CUBE_MAP,v);let be;if(fe){H&&ge&&t.texStorage2D(n.TEXTURE_CUBE_MAP,_e,Ke,me.width,me.height);for(let oe=0;oe<6;oe++){be=xe[oe].mipmaps;for(let Ue=0;Ue<be.length;Ue++){const Pe=be[Ue];v.format!==Rn?Ne!==null?H?ne&&t.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+oe,Ue,0,0,Pe.width,Pe.height,Ne,Pe.data):t.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+oe,Ue,Ke,Pe.width,Pe.height,0,Pe.data):Ge("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):H?ne&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+oe,Ue,0,0,Pe.width,Pe.height,Ne,ke,Pe.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+oe,Ue,Ke,Pe.width,Pe.height,0,Ne,ke,Pe.data)}}}else{if(be=v.mipmaps,H&&ge){be.length>0&&_e++;const oe=ze(xe[0]);t.texStorage2D(n.TEXTURE_CUBE_MAP,_e,Ke,oe.width,oe.height)}for(let oe=0;oe<6;oe++)if(De){H?ne&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+oe,0,0,0,xe[oe].width,xe[oe].height,Ne,ke,xe[oe].data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+oe,0,Ke,xe[oe].width,xe[oe].height,0,Ne,ke,xe[oe].data);for(let Ue=0;Ue<be.length;Ue++){const yt=be[Ue].image[oe].image;H?ne&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+oe,Ue+1,0,0,yt.width,yt.height,Ne,ke,yt.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+oe,Ue+1,Ke,yt.width,yt.height,0,Ne,ke,yt.data)}}else{H?ne&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+oe,0,0,0,Ne,ke,xe[oe]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+oe,0,Ke,Ne,ke,xe[oe]);for(let Ue=0;Ue<be.length;Ue++){const Pe=be[Ue];H?ne&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+oe,Ue+1,0,0,Ne,ke,Pe.image[oe]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+oe,Ue+1,Ke,Ne,ke,Pe.image[oe])}}}g(v)&&M(n.TEXTURE_CUBE_MAP),le.__version=Z.version,v.onUpdate&&v.onUpdate(v)}P.__version=v.version}function se(P,v,F,W,Z,le){const de=a.convert(F.format,F.colorSpace),Q=a.convert(F.type),te=b(F.internalFormat,de,Q,F.normalized,F.colorSpace),fe=i.get(v),De=i.get(F);if(De.__renderTarget=v,!fe.__hasExternalTextures){const xe=Math.max(1,v.width>>le),me=Math.max(1,v.height>>le);Z===n.TEXTURE_3D||Z===n.TEXTURE_2D_ARRAY?t.texImage3D(Z,le,te,xe,me,v.depth,0,de,Q,null):t.texImage2D(Z,le,te,xe,me,0,de,Q,null)}t.bindFramebuffer(n.FRAMEBUFFER,P),bt(v)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,W,Z,De.__webglTexture,0,xt(v)):(Z===n.TEXTURE_2D||Z>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&Z<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,W,Z,De.__webglTexture,le),t.bindFramebuffer(n.FRAMEBUFFER,null)}function ye(P,v,F){if(n.bindRenderbuffer(n.RENDERBUFFER,P),v.depthBuffer){const W=v.depthTexture,Z=W&&W.isDepthTexture?W.type:null,le=R(v.stencilBuffer,Z),de=v.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;bt(v)?o.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,xt(v),le,v.width,v.height):F?n.renderbufferStorageMultisample(n.RENDERBUFFER,xt(v),le,v.width,v.height):n.renderbufferStorage(n.RENDERBUFFER,le,v.width,v.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,de,n.RENDERBUFFER,P)}else{const W=v.textures;for(let Z=0;Z<W.length;Z++){const le=W[Z],de=a.convert(le.format,le.colorSpace),Q=a.convert(le.type),te=b(le.internalFormat,de,Q,le.normalized,le.colorSpace);bt(v)?o.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,xt(v),te,v.width,v.height):F?n.renderbufferStorageMultisample(n.RENDERBUFFER,xt(v),te,v.width,v.height):n.renderbufferStorage(n.RENDERBUFFER,te,v.width,v.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function $e(P,v,F){const W=v.isWebGLCubeRenderTarget===!0;if(t.bindFramebuffer(n.FRAMEBUFFER,P),!(v.depthTexture&&v.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");const Z=i.get(v.depthTexture);if(Z.__renderTarget=v,(!Z.__webglTexture||v.depthTexture.image.width!==v.width||v.depthTexture.image.height!==v.height)&&(v.depthTexture.image.width=v.width,v.depthTexture.image.height=v.height,v.depthTexture.needsUpdate=!0),W){if(Z.__webglInit===void 0&&(Z.__webglInit=!0,v.depthTexture.addEventListener("dispose",D)),Z.__webglTexture===void 0){Z.__webglTexture=n.createTexture(),t.bindTexture(n.TEXTURE_CUBE_MAP,Z.__webglTexture),Fe(n.TEXTURE_CUBE_MAP,v.depthTexture);const fe=a.convert(v.depthTexture.format),De=a.convert(v.depthTexture.type);let xe;v.depthTexture.format===wi?xe=n.DEPTH_COMPONENT24:v.depthTexture.format===ji&&(xe=n.DEPTH24_STENCIL8);for(let me=0;me<6;me++)n.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+me,0,xe,v.width,v.height,0,fe,De,null)}}else ae(v.depthTexture,0);const le=Z.__webglTexture,de=xt(v),Q=W?n.TEXTURE_CUBE_MAP_POSITIVE_X+F:n.TEXTURE_2D,te=v.depthTexture.format===ji?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;if(v.depthTexture.format===wi)bt(v)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,te,Q,le,0,de):n.framebufferTexture2D(n.FRAMEBUFFER,te,Q,le,0);else if(v.depthTexture.format===ji)bt(v)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,te,Q,le,0,de):n.framebufferTexture2D(n.FRAMEBUFFER,te,Q,le,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function Le(P){const v=i.get(P),F=P.isWebGLCubeRenderTarget===!0;if(v.__boundDepthTexture!==P.depthTexture){const W=P.depthTexture;if(v.__depthDisposeCallback&&v.__depthDisposeCallback(),W){const Z=()=>{delete v.__boundDepthTexture,delete v.__depthDisposeCallback,W.removeEventListener("dispose",Z)};W.addEventListener("dispose",Z),v.__depthDisposeCallback=Z}v.__boundDepthTexture=W}if(P.depthTexture&&!v.__autoAllocateDepthBuffer)if(F)for(let W=0;W<6;W++)$e(v.__webglFramebuffer[W],P,W);else{const W=P.texture.mipmaps;W&&W.length>0?$e(v.__webglFramebuffer[0],P,0):$e(v.__webglFramebuffer,P,0)}else if(F){v.__webglDepthbuffer=[];for(let W=0;W<6;W++)if(t.bindFramebuffer(n.FRAMEBUFFER,v.__webglFramebuffer[W]),v.__webglDepthbuffer[W]===void 0)v.__webglDepthbuffer[W]=n.createRenderbuffer(),ye(v.__webglDepthbuffer[W],P,!1);else{const Z=P.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,le=v.__webglDepthbuffer[W];n.bindRenderbuffer(n.RENDERBUFFER,le),n.framebufferRenderbuffer(n.FRAMEBUFFER,Z,n.RENDERBUFFER,le)}}else{const W=P.texture.mipmaps;if(W&&W.length>0?t.bindFramebuffer(n.FRAMEBUFFER,v.__webglFramebuffer[0]):t.bindFramebuffer(n.FRAMEBUFFER,v.__webglFramebuffer),v.__webglDepthbuffer===void 0)v.__webglDepthbuffer=n.createRenderbuffer(),ye(v.__webglDepthbuffer,P,!1);else{const Z=P.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,le=v.__webglDepthbuffer;n.bindRenderbuffer(n.RENDERBUFFER,le),n.framebufferRenderbuffer(n.FRAMEBUFFER,Z,n.RENDERBUFFER,le)}}t.bindFramebuffer(n.FRAMEBUFFER,null)}function Oe(P,v,F){const W=i.get(P);v!==void 0&&se(W.__webglFramebuffer,P,P.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),F!==void 0&&Le(P)}function Xe(P){const v=P.texture,F=i.get(P),W=i.get(v);P.addEventListener("dispose",S);const Z=P.textures,le=P.isWebGLCubeRenderTarget===!0,de=Z.length>1;if(de||(W.__webglTexture===void 0&&(W.__webglTexture=n.createTexture()),W.__version=v.version,s.memory.textures++),le){F.__webglFramebuffer=[];for(let Q=0;Q<6;Q++)if(v.mipmaps&&v.mipmaps.length>0){F.__webglFramebuffer[Q]=[];for(let te=0;te<v.mipmaps.length;te++)F.__webglFramebuffer[Q][te]=n.createFramebuffer()}else F.__webglFramebuffer[Q]=n.createFramebuffer()}else{if(v.mipmaps&&v.mipmaps.length>0){F.__webglFramebuffer=[];for(let Q=0;Q<v.mipmaps.length;Q++)F.__webglFramebuffer[Q]=n.createFramebuffer()}else F.__webglFramebuffer=n.createFramebuffer();if(de)for(let Q=0,te=Z.length;Q<te;Q++){const fe=i.get(Z[Q]);fe.__webglTexture===void 0&&(fe.__webglTexture=n.createTexture(),s.memory.textures++)}if(P.samples>0&&bt(P)===!1){F.__webglMultisampledFramebuffer=n.createFramebuffer(),F.__webglColorRenderbuffer=[],t.bindFramebuffer(n.FRAMEBUFFER,F.__webglMultisampledFramebuffer);for(let Q=0;Q<Z.length;Q++){const te=Z[Q];F.__webglColorRenderbuffer[Q]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,F.__webglColorRenderbuffer[Q]);const fe=a.convert(te.format,te.colorSpace),De=a.convert(te.type),xe=b(te.internalFormat,fe,De,te.normalized,te.colorSpace,P.isXRRenderTarget===!0),me=xt(P);n.renderbufferStorageMultisample(n.RENDERBUFFER,me,xe,P.width,P.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+Q,n.RENDERBUFFER,F.__webglColorRenderbuffer[Q])}n.bindRenderbuffer(n.RENDERBUFFER,null),P.depthBuffer&&(F.__webglDepthRenderbuffer=n.createRenderbuffer(),ye(F.__webglDepthRenderbuffer,P,!0)),t.bindFramebuffer(n.FRAMEBUFFER,null)}}if(le){t.bindTexture(n.TEXTURE_CUBE_MAP,W.__webglTexture),Fe(n.TEXTURE_CUBE_MAP,v);for(let Q=0;Q<6;Q++)if(v.mipmaps&&v.mipmaps.length>0)for(let te=0;te<v.mipmaps.length;te++)se(F.__webglFramebuffer[Q][te],P,v,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+Q,te);else se(F.__webglFramebuffer[Q],P,v,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+Q,0);g(v)&&M(n.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(de){for(let Q=0,te=Z.length;Q<te;Q++){const fe=Z[Q],De=i.get(fe);let xe=n.TEXTURE_2D;(P.isWebGL3DRenderTarget||P.isWebGLArrayRenderTarget)&&(xe=P.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(xe,De.__webglTexture),Fe(xe,fe),se(F.__webglFramebuffer,P,fe,n.COLOR_ATTACHMENT0+Q,xe,0),g(fe)&&M(xe)}t.unbindTexture()}else{let Q=n.TEXTURE_2D;if((P.isWebGL3DRenderTarget||P.isWebGLArrayRenderTarget)&&(Q=P.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(Q,W.__webglTexture),Fe(Q,v),v.mipmaps&&v.mipmaps.length>0)for(let te=0;te<v.mipmaps.length;te++)se(F.__webglFramebuffer[te],P,v,n.COLOR_ATTACHMENT0,Q,te);else se(F.__webglFramebuffer,P,v,n.COLOR_ATTACHMENT0,Q,0);g(v)&&M(Q),t.unbindTexture()}P.depthBuffer&&Le(P)}function Ye(P){const v=P.textures;for(let F=0,W=v.length;F<W;F++){const Z=v[F];if(g(Z)){const le=E(P),de=i.get(Z).__webglTexture;t.bindTexture(le,de),M(le),t.unbindTexture()}}}const St=[],Pt=[];function Kt(P){if(P.samples>0){if(bt(P)===!1){const v=P.textures,F=P.width,W=P.height;let Z=n.COLOR_BUFFER_BIT;const le=P.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,de=i.get(P),Q=v.length>1;if(Q)for(let fe=0;fe<v.length;fe++)t.bindFramebuffer(n.FRAMEBUFFER,de.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+fe,n.RENDERBUFFER,null),t.bindFramebuffer(n.FRAMEBUFFER,de.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+fe,n.TEXTURE_2D,null,0);t.bindFramebuffer(n.READ_FRAMEBUFFER,de.__webglMultisampledFramebuffer);const te=P.texture.mipmaps;te&&te.length>0?t.bindFramebuffer(n.DRAW_FRAMEBUFFER,de.__webglFramebuffer[0]):t.bindFramebuffer(n.DRAW_FRAMEBUFFER,de.__webglFramebuffer);for(let fe=0;fe<v.length;fe++){if(P.resolveDepthBuffer&&(P.depthBuffer&&(Z|=n.DEPTH_BUFFER_BIT),P.stencilBuffer&&P.resolveStencilBuffer&&(Z|=n.STENCIL_BUFFER_BIT)),Q){n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,de.__webglColorRenderbuffer[fe]);const De=i.get(v[fe]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,De,0)}n.blitFramebuffer(0,0,F,W,0,0,F,W,Z,n.NEAREST),c===!0&&(St.length=0,Pt.length=0,St.push(n.COLOR_ATTACHMENT0+fe),P.depthBuffer&&P.storeMultisampledDepthBuffer===!1&&(St.push(le),Pt.push(le),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,Pt)),n.invalidateFramebuffer(n.READ_FRAMEBUFFER,St))}if(t.bindFramebuffer(n.READ_FRAMEBUFFER,null),t.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),Q)for(let fe=0;fe<v.length;fe++){t.bindFramebuffer(n.FRAMEBUFFER,de.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+fe,n.RENDERBUFFER,de.__webglColorRenderbuffer[fe]);const De=i.get(v[fe]).__webglTexture;t.bindFramebuffer(n.FRAMEBUFFER,de.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+fe,n.TEXTURE_2D,De,0)}t.bindFramebuffer(n.DRAW_FRAMEBUFFER,de.__webglMultisampledFramebuffer)}else if(P.depthBuffer&&P.storeMultisampledDepthBuffer===!1&&c){const v=P.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[v])}}}function xt(P){return Math.min(r.maxSamples,P.samples)}function bt(P){const v=i.get(P);return P.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&v.__useRenderToTexture!==!1}function z(P){const v=s.render.frame;h.get(P)!==v&&(h.set(P,v),P.update())}function Je(P,v){const F=P.colorSpace,W=P.format,Z=P.type;return P.isCompressedTexture===!0||P.isVideoTexture===!0||F!==ha&&F!==On&&(nt.getTransfer(F)===gt?(W!==Rn||Z!==vn)&&Ge("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):st("WebGLTextures: Unsupported texture color space:",F)),v}function ze(P){return typeof HTMLImageElement<"u"&&P instanceof HTMLImageElement?(u.width=P.naturalWidth||P.width,u.height=P.naturalHeight||P.height):typeof VideoFrame<"u"&&P instanceof VideoFrame?(u.width=P.displayWidth,u.height=P.displayHeight):(u.width=P.width,u.height=P.height),u}this.allocateTextureUnit=V,this.resetTextureUnits=U,this.getTextureUnits=I,this.setTextureUnits=B,this.setTexture2D=ae,this.setTexture2DArray=q,this.setTexture3D=ee,this.setTextureCube=O,this.rebindTextures=Oe,this.setupRenderTarget=Xe,this.updateRenderTargetMipmap=Ye,this.updateMultisampleRenderTarget=Kt,this.setupDepthRenderbuffer=Le,this.setupFrameBufferTexture=se,this.useMultisampledRTT=bt,this.isReversedDepthBuffer=function(){return t.buffers.depth.getReversed()}}function I_(n,e){function t(i,r=On){let a;const s=nt.getTransfer(r);if(i===vn)return n.UNSIGNED_BYTE;if(i===pl)return n.UNSIGNED_SHORT_4_4_4_4;if(i===ml)return n.UNSIGNED_SHORT_5_5_5_1;if(i===Au)return n.UNSIGNED_INT_5_9_9_9_REV;if(i===Tu)return n.UNSIGNED_INT_10F_11F_11F_REV;if(i===yu)return n.BYTE;if(i===wu)return n.SHORT;if(i===ca)return n.UNSIGNED_SHORT;if(i===fl)return n.INT;if(i===ri)return n.UNSIGNED_INT;if(i===jn)return n.FLOAT;if(i===ai)return n.HALF_FLOAT;if(i===Ru)return n.ALPHA;if(i===Cu)return n.RGB;if(i===Rn)return n.RGBA;if(i===wi)return n.DEPTH_COMPONENT;if(i===ji)return n.DEPTH_STENCIL;if(i===Lu)return n.RED;if(i===gl)return n.RED_INTEGER;if(i===rr)return n.RG;if(i===_l)return n.RG_INTEGER;if(i===xl)return n.RGBA_INTEGER;if(i===es||i===ts||i===ns||i===is)if(s===gt)if(a=e.get("WEBGL_compressed_texture_s3tc_srgb"),a!==null){if(i===es)return a.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===ts)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===ns)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===is)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(a=e.get("WEBGL_compressed_texture_s3tc"),a!==null){if(i===es)return a.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===ts)return a.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===ns)return a.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===is)return a.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===So||i===bo||i===Eo||i===yo)if(a=e.get("WEBGL_compressed_texture_pvrtc"),a!==null){if(i===So)return a.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===bo)return a.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===Eo)return a.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===yo)return a.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===wo||i===Ao||i===To||i===Ro||i===Co||i===os||i===Lo)if(a=e.get("WEBGL_compressed_texture_etc"),a!==null){if(i===wo||i===Ao)return s===gt?a.COMPRESSED_SRGB8_ETC2:a.COMPRESSED_RGB8_ETC2;if(i===To)return s===gt?a.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:a.COMPRESSED_RGBA8_ETC2_EAC;if(i===Ro)return a.COMPRESSED_R11_EAC;if(i===Co)return a.COMPRESSED_SIGNED_R11_EAC;if(i===os)return a.COMPRESSED_RG11_EAC;if(i===Lo)return a.COMPRESSED_SIGNED_RG11_EAC}else return null;if(i===Do||i===Po||i===Io||i===No||i===Uo||i===Oo||i===Fo||i===Bo||i===ko||i===zo||i===Ho||i===Go||i===Vo||i===Wo)if(a=e.get("WEBGL_compressed_texture_astc"),a!==null){if(i===Do)return s===gt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:a.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===Po)return s===gt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:a.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===Io)return s===gt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:a.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===No)return s===gt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:a.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===Uo)return s===gt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:a.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===Oo)return s===gt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:a.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===Fo)return s===gt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:a.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===Bo)return s===gt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:a.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===ko)return s===gt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:a.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===zo)return s===gt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:a.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===Ho)return s===gt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:a.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===Go)return s===gt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:a.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===Vo)return s===gt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:a.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===Wo)return s===gt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:a.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===Yo||i===Xo||i===Ko)if(a=e.get("EXT_texture_compression_bptc"),a!==null){if(i===Yo)return s===gt?a.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:a.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===Xo)return a.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===Ko)return a.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===qo||i===Zo||i===ls||i===$o)if(a=e.get("EXT_texture_compression_rgtc"),a!==null){if(i===qo)return a.COMPRESSED_RED_RGTC1_EXT;if(i===Zo)return a.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===ls)return a.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===$o)return a.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===ua?n.UNSIGNED_INT_24_8:n[i]!==void 0?n[i]:null}return{convert:t}}const N_=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,U_=`
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

}`;class O_{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){const i=new Hu(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=i}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,i=new on({vertexShader:N_,fragmentShader:U_,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new dn(new oi(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class F_ extends sr{constructor(e,t){super();const i=this;let r=null,a=1,s=null,o="local-floor",c=1,u=null,h=null,d=null,f=null,p=null,m=null;const x=typeof XRWebGLBinding<"u",_=new O_,g={},M=t.getContextAttributes();let E=null,b=null;const R=[],w=[],D=new We;let S=null,y=null;const L=new An;L.viewport=new Dt;const C=new An;C.viewport=new Dt;const N=[L,C],U=new Yp;let I=null,B=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(j){let ie=R[j];return ie===void 0&&(ie=new ks,R[j]=ie),ie.getTargetRaySpace()},this.getControllerGrip=function(j){let ie=R[j];return ie===void 0&&(ie=new ks,R[j]=ie),ie.getGripSpace()},this.getHand=function(j){let ie=R[j];return ie===void 0&&(ie=new ks,R[j]=ie),ie.getHandSpace()};function V(j){const ie=w.indexOf(j.inputSource);if(ie===-1)return;const G=R[ie];G!==void 0&&(G.update(j.inputSource,j.frame,u||s),G.dispatchEvent({type:j.type,data:j.inputSource}))}function $(){r.removeEventListener("select",V),r.removeEventListener("selectstart",V),r.removeEventListener("selectend",V),r.removeEventListener("squeeze",V),r.removeEventListener("squeezestart",V),r.removeEventListener("squeezeend",V),r.removeEventListener("end",$),r.removeEventListener("inputsourceschange",ae);for(let j=0;j<R.length;j++){const ie=w[j];ie!==null&&(w[j]=null,R[j].disconnect(ie))}I=null,B=null,_.reset();for(const j in g)delete g[j];if(e.setRenderTarget(E),p=null,f=null,d=null,r=null,b=null,He.stop(),i.isPresenting=!1,e.setPixelRatio(S),e.setSize(D.width,D.height,!1),y!==null){const j=y.camera;j.fov=y.fov,j.zoom=y.zoom,j.updateProjectionMatrix(),y=null}i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(j){a=j,i.isPresenting===!0&&Ge("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(j){o=j,i.isPresenting===!0&&Ge("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return u||s},this.setReferenceSpace=function(j){u=j},this.getBaseLayer=function(){return f!==null?f:p},this.getBinding=function(){return d===null&&x&&(d=new XRWebGLBinding(r,t)),d},this.getFrame=function(){return m},this.getSession=function(){return r},this.setSession=async function(j){if(r=j,r!==null){if(E=e.getRenderTarget(),r.addEventListener("select",V),r.addEventListener("selectstart",V),r.addEventListener("selectend",V),r.addEventListener("squeeze",V),r.addEventListener("squeezestart",V),r.addEventListener("squeezeend",V),r.addEventListener("end",$),r.addEventListener("inputsourceschange",ae),M.xrCompatible!==!0&&await t.makeXRCompatible(),S=e.getPixelRatio(),e.getSize(D),x&&"createProjectionLayer"in XRWebGLBinding.prototype){let G=null,he=null,se=null;M.depth&&(se=M.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,G=M.stencil?ji:wi,he=M.stencil?ua:ri);const ye={colorFormat:t.RGBA8,depthFormat:se,scaleFactor:a};d=this.getBinding(),f=d.createProjectionLayer(ye),r.updateRenderState({layers:[f]}),e.setPixelRatio(1),e.setSize(f.textureWidth,f.textureHeight,!1),b=new Cn(f.textureWidth,f.textureHeight,{format:Rn,type:vn,depthTexture:new da(f.textureWidth,f.textureHeight,he,void 0,void 0,void 0,void 0,void 0,void 0,G),stencilBuffer:M.stencil,colorSpace:e.outputColorSpace,samples:M.antialias?4:0,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1,storeMultisampledDepthBuffer:f.ignoreDepthValues===!1,storeMultisampledStencilBuffer:f.ignoreDepthValues===!1})}else{const G={antialias:M.antialias,alpha:!0,depth:M.depth,stencil:M.stencil,framebufferScaleFactor:a};p=new XRWebGLLayer(r,t,G),r.updateRenderState({baseLayer:p}),e.setPixelRatio(1),e.setSize(p.framebufferWidth,p.framebufferHeight,!1),b=new Cn(p.framebufferWidth,p.framebufferHeight,{format:Rn,type:vn,colorSpace:e.outputColorSpace,stencilBuffer:M.stencil,resolveDepthBuffer:p.ignoreDepthValues===!1,resolveStencilBuffer:p.ignoreDepthValues===!1,storeMultisampledDepthBuffer:p.ignoreDepthValues===!1,storeMultisampledStencilBuffer:p.ignoreDepthValues===!1})}b.isXRRenderTarget=!0,this.setFoveation(c),u=null,s=await r.requestReferenceSpace(o),He.setContext(r),He.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return _.getDepthTexture()};function ae(j){for(let ie=0;ie<j.removed.length;ie++){const G=j.removed[ie],he=w.indexOf(G);he>=0&&(w[he]=null,R[he].disconnect(G))}for(let ie=0;ie<j.added.length;ie++){const G=j.added[ie];let he=w.indexOf(G);if(he===-1){for(let ye=0;ye<R.length;ye++)if(ye>=w.length){w.push(G),he=ye;break}else if(w[ye]===null){w[ye]=G,he=ye;break}if(he===-1)break}const se=R[he];se&&se.connect(G)}}const q=new Y,ee=new Y;function O(j,ie,G){q.setFromMatrixPosition(ie.matrixWorld),ee.setFromMatrixPosition(G.matrixWorld);const he=q.distanceTo(ee),se=ie.projectionMatrix.elements,ye=G.projectionMatrix.elements,$e=se[14]/(se[10]-1),Le=se[14]/(se[10]+1),Oe=(se[9]+1)/se[5],Xe=(se[9]-1)/se[5],Ye=(se[8]-1)/se[0],St=(ye[8]+1)/ye[0],Pt=$e*Ye,Kt=$e*St,xt=he/(-Ye+St),bt=xt*-Ye;if(ie.matrixWorld.decompose(j.position,j.quaternion,j.scale),j.translateX(bt),j.translateZ(xt),j.matrixWorld.compose(j.position,j.quaternion,j.scale),j.matrixWorldInverse.copy(j.matrixWorld).invert(),se[10]===-1)j.projectionMatrix.copy(ie.projectionMatrix),j.projectionMatrixInverse.copy(ie.projectionMatrixInverse);else{const z=$e+xt,Je=Le+xt,ze=Pt-bt,P=Kt+(he-bt),v=Oe*Le/Je*z,F=Xe*Le/Je*z;j.projectionMatrix.makePerspective(ze,P,v,F,z,Je),j.projectionMatrixInverse.copy(j.projectionMatrix).invert()}}function re(j,ie){ie===null?j.matrixWorld.copy(j.matrix):j.matrixWorld.multiplyMatrices(ie.matrixWorld,j.matrix),j.matrixWorldInverse.copy(j.matrixWorld).invert()}this.updateCamera=function(j){if(r===null)return;let ie=j.near,G=j.far;_.texture!==null&&(_.depthNear>0&&(ie=_.depthNear),_.depthFar>0&&(G=_.depthFar)),U.near=C.near=L.near=ie,U.far=C.far=L.far=G,(I!==U.near||B!==U.far)&&(r.updateRenderState({depthNear:U.near,depthFar:U.far}),I=U.near,B=U.far),U.layers.mask=j.layers.mask|6,L.layers.mask=U.layers.mask&-5,C.layers.mask=U.layers.mask&-3;const he=j.parent,se=U.cameras;re(U,he);for(let ye=0;ye<se.length;ye++)re(se[ye],he);se.length===2?O(U,L,C):U.projectionMatrix.copy(L.projectionMatrix),y===null&&j.isPerspectiveCamera&&(y={camera:j,fov:j.fov,zoom:j.zoom}),ue(j,U,he)};function ue(j,ie,G){G===null?j.matrix.copy(ie.matrixWorld):(j.matrix.copy(G.matrixWorld),j.matrix.invert(),j.matrix.multiply(ie.matrixWorld)),j.matrix.decompose(j.position,j.quaternion,j.scale),j.updateMatrixWorld(!0),j.projectionMatrix.copy(ie.projectionMatrix),j.projectionMatrixInverse.copy(ie.projectionMatrixInverse),j.isPerspectiveCamera&&(j.fov=Jo*2*Math.atan(1/j.projectionMatrix.elements[5]),j.zoom=1)}this.getCamera=function(){return U},this.getFoveation=function(){if(!(f===null&&p===null))return c},this.setFoveation=function(j){c=j,f!==null&&(f.fixedFoveation=j),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=j)},this.hasDepthSensing=function(){return _.texture!==null},this.getDepthSensingMesh=function(){return _.getMesh(U)},this.getCameraTexture=function(j){return g[j]};let Ce=null;function Fe(j,ie){if(h=ie.getViewerPose(u||s),m=ie,h!==null){const G=h.views;p!==null&&(e.setRenderTargetFramebuffer(b,p.framebuffer),e.setRenderTarget(b));let he=!1;G.length!==U.cameras.length&&(U.cameras.length=0,he=!0);for(let Le=0;Le<G.length;Le++){const Oe=G[Le];let Xe=null;if(p!==null)Xe=p.getViewport(Oe);else{const St=d.getViewSubImage(f,Oe);Xe=St.viewport,Le===0&&(e.setRenderTargetTextures(b,St.colorTexture,St.depthStencilTexture),e.setRenderTarget(b))}let Ye=N[Le];Ye===void 0&&(Ye=new An,Ye.layers.enable(Le),Ye.viewport=new Dt,N[Le]=Ye),Ye.matrix.fromArray(Oe.transform.matrix),Ye.matrix.decompose(Ye.position,Ye.quaternion,Ye.scale),Ye.projectionMatrix.fromArray(Oe.projectionMatrix),Ye.projectionMatrixInverse.copy(Ye.projectionMatrix).invert(),Ye.viewport.set(Xe.x,Xe.y,Xe.width,Xe.height),Le===0&&(U.matrix.copy(Ye.matrix),U.matrix.decompose(U.position,U.quaternion,U.scale)),he===!0&&U.cameras.push(Ye)}const se=r.enabledFeatures;if(se&&se.includes("depth-sensing")&&r.depthUsage=="gpu-optimized"&&x){d=i.getBinding();const Le=d.getDepthInformation(G[0]);Le&&Le.isValid&&Le.texture&&_.init(Le,r.renderState)}if(se&&se.includes("camera-access")&&x){e.state.unbindTexture(),d=i.getBinding();for(let Le=0;Le<G.length;Le++){const Oe=G[Le].camera;if(Oe){let Xe=g[Oe];Xe||(Xe=new Hu,g[Oe]=Xe);const Ye=d.getCameraImage(Oe);Xe.sourceTexture=Ye}}}}for(let G=0;G<R.length;G++){const he=w[G],se=R[G];he!==null&&se!==void 0&&se.update(he,ie,u||s)}Ce&&Ce(j,ie),ie.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:ie}),m=null}const He=new Xu;He.setAnimationLoop(Fe),this.setAnimationLoop=function(j){Ce=j},this.dispose=function(){}}}const B_=new Ft,ju=new Ve;ju.set(-1,0,0,0,1,0,0,0,1);function k_(n,e){function t(_,g){_.matrixAutoUpdate===!0&&_.updateMatrix(),g.value.copy(_.matrix)}function i(_,g){g.color.getRGB(_.fogColor.value,Gu(n)),g.isFog?(_.fogNear.value=g.near,_.fogFar.value=g.far):g.isFogExp2&&(_.fogDensity.value=g.density)}function r(_,g,M,E,b){g.isNodeMaterial?g.uniformsNeedUpdate=!1:g.isMeshBasicMaterial?a(_,g):g.isMeshLambertMaterial?(a(_,g),g.envMap&&(_.envMapIntensity.value=g.envMapIntensity)):g.isMeshToonMaterial?(a(_,g),d(_,g)):g.isMeshPhongMaterial?(a(_,g),h(_,g),g.envMap&&(_.envMapIntensity.value=g.envMapIntensity)):g.isMeshStandardMaterial?(a(_,g),f(_,g),g.isMeshPhysicalMaterial&&p(_,g,b)):g.isMeshMatcapMaterial?(a(_,g),m(_,g)):g.isMeshDepthMaterial?a(_,g):g.isMeshDistanceMaterial?(a(_,g),x(_,g)):g.isMeshNormalMaterial?a(_,g):g.isLineBasicMaterial?(s(_,g),g.isLineDashedMaterial&&o(_,g)):g.isPointsMaterial?c(_,g,M,E):g.isSpriteMaterial?u(_,g):g.isShadowMaterial?(_.color.value.copy(g.color),_.opacity.value=g.opacity):g.isShaderMaterial&&(g.uniformsNeedUpdate=!1)}function a(_,g){_.opacity.value=g.opacity,g.color&&_.diffuse.value.copy(g.color),g.emissive&&_.emissive.value.copy(g.emissive).multiplyScalar(g.emissiveIntensity),g.map&&(_.map.value=g.map,t(g.map,_.mapTransform)),g.alphaMap&&(_.alphaMap.value=g.alphaMap,t(g.alphaMap,_.alphaMapTransform)),g.bumpMap&&(_.bumpMap.value=g.bumpMap,t(g.bumpMap,_.bumpMapTransform),_.bumpScale.value=g.bumpScale,g.side===gn&&(_.bumpScale.value*=-1)),g.normalMap&&(_.normalMap.value=g.normalMap,t(g.normalMap,_.normalMapTransform),_.normalScale.value.copy(g.normalScale),g.side===gn&&_.normalScale.value.negate()),g.displacementMap&&(_.displacementMap.value=g.displacementMap,t(g.displacementMap,_.displacementMapTransform),_.displacementScale.value=g.displacementScale,_.displacementBias.value=g.displacementBias),g.emissiveMap&&(_.emissiveMap.value=g.emissiveMap,t(g.emissiveMap,_.emissiveMapTransform)),g.specularMap&&(_.specularMap.value=g.specularMap,t(g.specularMap,_.specularMapTransform)),g.alphaTest>0&&(_.alphaTest.value=g.alphaTest);const M=e.get(g),E=M.envMap,b=M.envMapRotation;E&&(_.envMap.value=E,_.envMapRotation.value.setFromMatrix4(B_.makeRotationFromEuler(b)).transpose(),E.isCubeTexture&&E.isRenderTargetTexture===!1&&_.envMapRotation.value.premultiply(ju),_.reflectivity.value=g.reflectivity,_.ior.value=g.ior,_.refractionRatio.value=g.refractionRatio),g.lightMap&&(_.lightMap.value=g.lightMap,_.lightMapIntensity.value=g.lightMapIntensity,t(g.lightMap,_.lightMapTransform)),g.aoMap&&(_.aoMap.value=g.aoMap,_.aoMapIntensity.value=g.aoMapIntensity,t(g.aoMap,_.aoMapTransform))}function s(_,g){_.diffuse.value.copy(g.color),_.opacity.value=g.opacity,g.map&&(_.map.value=g.map,t(g.map,_.mapTransform))}function o(_,g){_.dashSize.value=g.dashSize,_.totalSize.value=g.dashSize+g.gapSize,_.scale.value=g.scale}function c(_,g,M,E){_.diffuse.value.copy(g.color),_.opacity.value=g.opacity,_.size.value=g.size*M,_.scale.value=E*.5,g.map&&(_.map.value=g.map,t(g.map,_.uvTransform)),g.alphaMap&&(_.alphaMap.value=g.alphaMap,t(g.alphaMap,_.alphaMapTransform)),g.alphaTest>0&&(_.alphaTest.value=g.alphaTest)}function u(_,g){_.diffuse.value.copy(g.color),_.opacity.value=g.opacity,_.rotation.value=g.rotation,g.map&&(_.map.value=g.map,t(g.map,_.mapTransform)),g.alphaMap&&(_.alphaMap.value=g.alphaMap,t(g.alphaMap,_.alphaMapTransform)),g.alphaTest>0&&(_.alphaTest.value=g.alphaTest)}function h(_,g){_.specular.value.copy(g.specular),_.shininess.value=Math.max(g.shininess,1e-4)}function d(_,g){g.gradientMap&&(_.gradientMap.value=g.gradientMap)}function f(_,g){_.metalness.value=g.metalness,g.metalnessMap&&(_.metalnessMap.value=g.metalnessMap,t(g.metalnessMap,_.metalnessMapTransform)),_.roughness.value=g.roughness,g.roughnessMap&&(_.roughnessMap.value=g.roughnessMap,t(g.roughnessMap,_.roughnessMapTransform)),g.envMap&&(_.envMapIntensity.value=g.envMapIntensity)}function p(_,g,M){_.ior.value=g.ior,g.sheen>0&&(_.sheenColor.value.copy(g.sheenColor).multiplyScalar(g.sheen),_.sheenRoughness.value=g.sheenRoughness,g.sheenColorMap&&(_.sheenColorMap.value=g.sheenColorMap,t(g.sheenColorMap,_.sheenColorMapTransform)),g.sheenRoughnessMap&&(_.sheenRoughnessMap.value=g.sheenRoughnessMap,t(g.sheenRoughnessMap,_.sheenRoughnessMapTransform))),g.clearcoat>0&&(_.clearcoat.value=g.clearcoat,_.clearcoatRoughness.value=g.clearcoatRoughness,g.clearcoatMap&&(_.clearcoatMap.value=g.clearcoatMap,t(g.clearcoatMap,_.clearcoatMapTransform)),g.clearcoatRoughnessMap&&(_.clearcoatRoughnessMap.value=g.clearcoatRoughnessMap,t(g.clearcoatRoughnessMap,_.clearcoatRoughnessMapTransform)),g.clearcoatNormalMap&&(_.clearcoatNormalMap.value=g.clearcoatNormalMap,t(g.clearcoatNormalMap,_.clearcoatNormalMapTransform),_.clearcoatNormalScale.value.copy(g.clearcoatNormalScale),g.side===gn&&_.clearcoatNormalScale.value.negate())),g.dispersion>0&&(_.dispersion.value=g.dispersion),g.retroreflectivity>0&&(_.retroreflectivity.value=g.retroreflectivity),g.iridescence>0&&(_.iridescence.value=g.iridescence,_.iridescenceIOR.value=g.iridescenceIOR,_.iridescenceThicknessMinimum.value=g.iridescenceThicknessRange[0],_.iridescenceThicknessMaximum.value=g.iridescenceThicknessRange[1],g.iridescenceMap&&(_.iridescenceMap.value=g.iridescenceMap,t(g.iridescenceMap,_.iridescenceMapTransform)),g.iridescenceThicknessMap&&(_.iridescenceThicknessMap.value=g.iridescenceThicknessMap,t(g.iridescenceThicknessMap,_.iridescenceThicknessMapTransform))),g.transmission>0&&(_.transmission.value=g.transmission,_.transmissionSamplerMap.value=M.texture,_.transmissionSamplerSize.value.set(M.width,M.height),g.transmissionMap&&(_.transmissionMap.value=g.transmissionMap,t(g.transmissionMap,_.transmissionMapTransform)),_.thickness.value=g.thickness,g.thicknessMap&&(_.thicknessMap.value=g.thicknessMap,t(g.thicknessMap,_.thicknessMapTransform)),_.attenuationDistance.value=g.attenuationDistance,_.attenuationColor.value.copy(g.attenuationColor)),g.anisotropy>0&&(_.anisotropyVector.value.set(g.anisotropy*Math.cos(g.anisotropyRotation),g.anisotropy*Math.sin(g.anisotropyRotation)),g.anisotropyMap&&(_.anisotropyMap.value=g.anisotropyMap,t(g.anisotropyMap,_.anisotropyMapTransform))),_.specularIntensity.value=g.specularIntensity,_.specularColor.value.copy(g.specularColor),g.specularColorMap&&(_.specularColorMap.value=g.specularColorMap,t(g.specularColorMap,_.specularColorMapTransform)),g.specularIntensityMap&&(_.specularIntensityMap.value=g.specularIntensityMap,t(g.specularIntensityMap,_.specularIntensityMapTransform))}function m(_,g){g.matcap&&(_.matcap.value=g.matcap)}function x(_,g){const M=e.get(g).light;_.referencePosition.value.setFromMatrixPosition(M.matrixWorld),_.nearDistance.value=M.shadow.camera.near,_.farDistance.value=M.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:r}}function z_(n,e,t,i){let r={},a={},s=[];const o=n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS);function c(b,R){const w=R.program;i.uniformBlockBinding(b,w)}function u(b,R){let w=r[b.id];w===void 0&&(_(b),w=h(b),r[b.id]=w,b.addEventListener("dispose",M));const D=R.program;i.updateUBOMapping(b,D);const S=e.render.frame;a[b.id]!==S&&(f(b),a[b.id]=S)}function h(b){const R=d();b.__bindingPointIndex=R;const w=n.createBuffer(),D=b.__size,S=b.usage;return n.bindBuffer(n.UNIFORM_BUFFER,w),n.bufferData(n.UNIFORM_BUFFER,D,S),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,R,w),w}function d(){for(let b=0;b<o;b++)if(s.indexOf(b)===-1)return s.push(b),b;return st("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function f(b){const R=r[b.id],w=b.uniforms,D=b.__cache;n.bindBuffer(n.UNIFORM_BUFFER,R);for(let S=0,y=w.length;S<y;S++){const L=w[S];if(Array.isArray(L))for(let C=0,N=L.length;C<N;C++)p(L[C],S,C,D);else p(L,S,0,D)}n.bindBuffer(n.UNIFORM_BUFFER,null)}function p(b,R,w,D){if(x(b,R,w,D)===!0){const S=b.__offset,y=b.value;if(Array.isArray(y)){let L=0;for(let C=0;C<y.length;C++){const N=y[C],U=g(N);m(N,b.__data,L),typeof N!="number"&&typeof N!="boolean"&&!N.isMatrix3&&!ArrayBuffer.isView(N)&&(L+=U.storage/Float32Array.BYTES_PER_ELEMENT)}}else m(y,b.__data,0);n.bufferSubData(n.UNIFORM_BUFFER,S,b.__data)}}function m(b,R,w){typeof b=="number"||typeof b=="boolean"?R[0]=b:b.isMatrix3?(R[0]=b.elements[0],R[1]=b.elements[1],R[2]=b.elements[2],R[3]=0,R[4]=b.elements[3],R[5]=b.elements[4],R[6]=b.elements[5],R[7]=0,R[8]=b.elements[6],R[9]=b.elements[7],R[10]=b.elements[8],R[11]=0):ArrayBuffer.isView(b)?R.set(new b.constructor(b.buffer,b.byteOffset,R.length)):b.toArray(R,w)}function x(b,R,w,D){const S=b.value,y=R+"_"+w;if(D[y]===void 0)return typeof S=="number"||typeof S=="boolean"?D[y]=S:ArrayBuffer.isView(S)?D[y]=S.slice():D[y]=S.clone(),!0;{const L=D[y];if(typeof S=="number"||typeof S=="boolean"){if(L!==S)return D[y]=S,!0}else{if(ArrayBuffer.isView(S))return!0;if(L.equals(S)===!1)return L.copy(S),!0}}return!1}function _(b){const R=b.uniforms;let w=0;const D=16;for(let y=0,L=R.length;y<L;y++){const C=Array.isArray(R[y])?R[y]:[R[y]];for(let N=0,U=C.length;N<U;N++){const I=C[N],B=Array.isArray(I.value)?I.value:[I.value];for(let V=0,$=B.length;V<$;V++){const ae=B[V],q=g(ae),ee=w%D,O=ee%q.boundary,re=ee+O;w+=O,re!==0&&D-re<q.storage&&(w+=D-re),I.__data=new Float32Array(q.storage/Float32Array.BYTES_PER_ELEMENT),I.__offset=w,w+=q.storage}}}const S=w%D;return S>0&&(w+=D-S),b.__size=w,b.__cache={},this}function g(b){const R={boundary:0,storage:0};return typeof b=="number"||typeof b=="boolean"?(R.boundary=4,R.storage=4):b.isVector2?(R.boundary=8,R.storage=8):b.isVector3||b.isColor?(R.boundary=16,R.storage=12):b.isVector4?(R.boundary=16,R.storage=16):b.isMatrix3?(R.boundary=48,R.storage=48):b.isMatrix4?(R.boundary=64,R.storage=64):b.isTexture?Ge("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(b)?(R.boundary=16,R.storage=b.byteLength):Ge("WebGLRenderer: Unsupported uniform value type.",b),R}function M(b){const R=b.target;R.removeEventListener("dispose",M);const w=s.indexOf(R.__bindingPointIndex);s.splice(w,1),n.deleteBuffer(r[R.id]),delete r[R.id],delete a[R.id]}function E(){for(const b in r)n.deleteBuffer(r[b]);s=[],r={},a={}}return{bind:c,update:u,dispose:E}}const H_=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let Yn=null;function G_(){return Yn===null&&(Yn=new Tr(H_,16,16,rr,ai),Yn.name="DFG_LUT",Yn.minFilter=zt,Yn.magFilter=zt,Yn.wrapS=_i,Yn.wrapT=_i,Yn.generateMipmaps=!1,Yn.needsUpdate=!0),Yn}class V_{constructor(e={}){const{canvas:t=cp(),context:i=null,depth:r=!0,stencil:a=!1,alpha:s=!1,antialias:o=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:u=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:d=!1,reversedDepthBuffer:f=!1,outputBufferType:p=vn}=e;this.isWebGLRenderer=!0;let m;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");m=i.getContextAttributes().alpha}else m=s;const x=p,_=new Set([xl,_l,gl]),g=new Set([vn,ri,ca,ua,pl,ml]),M=new Uint32Array(4),E=new Int32Array(4),b=new Y;let R=null,w=null;const D=[],S=[];let y=null;this.domElement=t,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=ti,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const L=this;let C=!1,N=null,U=null,I=null,B=null;this._outputColorSpace=wn;let V=0,$=0,ae=null,q=-1,ee=null;const O=new Dt,re=new Dt;let ue=null;const Ce=new ct(0);let Fe=0,He=t.width,j=t.height,ie=1,G=null,he=null;const se=new Dt(0,0,He,j),ye=new Dt(0,0,He,j);let $e=!1;const Le=new El;let Oe=!1,Xe=!1;const Ye=new Ft,St=new Y,Pt=new Dt,Kt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let xt=!1;function bt(){return ae===null?ie:1}let z=i;function Je(A,k){return t.getContext(A,k)}let ze,P,v,F,W,Z,le,de,Q,te,fe,De,xe,me,Ne,ke,Ke,H,ge,ne,_e,be,oe;try{const A={alpha:!0,depth:r,stencil:a,antialias:o,premultipliedAlpha:c,preserveDrawingBuffer:u,powerPreference:h,failIfMajorPerformanceCaveat:d};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${dl}`),t.addEventListener("webglcontextlost",yt,!1),t.addEventListener("webglcontextrestored",ut,!1),t.addEventListener("webglcontextcreationerror",Dn,!1),z===null){const k="webgl2";if(z=Je(k,A),z===null)throw Je(k)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}Ue()}catch(A){throw t.removeEventListener("webglcontextlost",yt,!1),t.removeEventListener("webglcontextrestored",ut,!1),t.removeEventListener("webglcontextcreationerror",Dn,!1),st("WebGLRenderer: "+A.message),A}function Ue(){ze=new G1(z),ze.init(),_e=new I_(z,ze),P=new P1(z,ze,e,_e),v=new D_(z,ze),P.reversedDepthBuffer&&f&&v.buffers.depth.setReversed(!0),U=z.createFramebuffer(),I=z.createFramebuffer(),B=z.createFramebuffer(),F=new Y1(z),W=new __,Z=new P_(z,ze,v,W,P,_e,F),le=new H1(L),de=new Kp(z),be=new L1(z,de),Q=new V1(z,de,F,be),te=new K1(z,Q,de,be,F),H=new X1(z,P,Z),Ne=new I1(W),fe=new g_(L,le,ze,P,be,Ne),De=new k_(L,W),xe=new M_,me=new w_(ze),Ke=new C1(L,le,v,te,m,c),ke=new L_(L,te,P),oe=new z_(z,F,P,v),ge=new D1(z,ze,F),ne=new W1(z,ze,F),F.programs=fe.programs,L.capabilities=P,L.extensions=ze,L.properties=W,L.renderLists=xe,L.shadowMap=ke,L.state=v,L.info=F}x!==vn&&(y=new Z1(x,t.width,t.height,o,r,a));const Pe=new F_(L,z);this.xr=Pe,this.getContext=function(){return z},this.getContextAttributes=function(){return z.getContextAttributes()},this.forceContextLoss=function(){const A=ze.get("WEBGL_lose_context");A&&A.loseContext()},this.forceContextRestore=function(){const A=ze.get("WEBGL_lose_context");A&&A.restoreContext()},this.getPixelRatio=function(){return ie},this.setPixelRatio=function(A){A!==void 0&&(ie=A,this.setSize(He,j,!1))},this.getSize=function(A){return A.set(He,j)},this.setSize=function(A,k,J=!0){if(Pe.isPresenting){Ge("WebGLRenderer: Can't change size while VR device is presenting.");return}He=A,j=k,t.width=Math.floor(A*ie),t.height=Math.floor(k*ie),J===!0&&(t.style.width=A+"px",t.style.height=k+"px"),y!==null&&y.setSize(t.width,t.height),this.setViewport(0,0,A,k)},this.getDrawingBufferSize=function(A){return A.set(He*ie,j*ie).floor()},this.setDrawingBufferSize=function(A,k,J){He=A,j=k,ie=J,t.width=Math.floor(A*J),t.height=Math.floor(k*J),this.setViewport(0,0,A,k)},this.setEffects=function(A){if(x===vn){st("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(A){for(let k=0;k<A.length;k++)if(A[k].isOutputPass===!0){Ge("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}y.setEffects(A||[])},this.getCurrentViewport=function(A){return A.copy(O)},this.getViewport=function(A){return A.copy(se)},this.setViewport=function(A,k,J,X){A.isVector4?se.set(A.x,A.y,A.z,A.w):se.set(A,k,J,X),v.viewport(O.copy(se).multiplyScalar(ie).round())},this.getScissor=function(A){return A.copy(ye)},this.setScissor=function(A,k,J,X){A.isVector4?ye.set(A.x,A.y,A.z,A.w):ye.set(A,k,J,X),v.scissor(re.copy(ye).multiplyScalar(ie).round())},this.getScissorTest=function(){return $e},this.setScissorTest=function(A){v.setScissorTest($e=A)},this.setOpaqueSort=function(A){G=A},this.setTransparentSort=function(A){he=A},this.getClearColor=function(A){return A.copy(Ke.getClearColor())},this.setClearColor=function(){Ke.setClearColor(...arguments)},this.getClearAlpha=function(){return Ke.getClearAlpha()},this.setClearAlpha=function(){Ke.setClearAlpha(...arguments)},this.clear=function(A=!0,k=!0,J=!0){let X=0;if(A){let K=!1;if(ae!==null){const Se=ae.texture.format;K=_.has(Se)}if(K){const Se=ae.texture.type,we=g.has(Se),ve=Ke.getClearColor(),Te=Ke.getClearAlpha(),Ie=ve.r,Qe=ve.g,tt=ve.b;we?(M[0]=Ie,M[1]=Qe,M[2]=tt,M[3]=Te,z.clearBufferuiv(z.COLOR,0,M)):(E[0]=Ie,E[1]=Qe,E[2]=tt,E[3]=Te,z.clearBufferiv(z.COLOR,0,E))}else X|=z.COLOR_BUFFER_BIT}k&&(X|=z.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),J&&(X|=z.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),X!==0&&z.clear(X)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(A){A.setRenderer(this),N=A},this.dispose=function(){t.removeEventListener("webglcontextlost",yt,!1),t.removeEventListener("webglcontextrestored",ut,!1),t.removeEventListener("webglcontextcreationerror",Dn,!1),Ke.dispose(),xe.dispose(),me.dispose(),W.dispose(),le.dispose(),te.dispose(),be.dispose(),oe.dispose(),fe.dispose(),Pe.dispose(),Pe.removeEventListener("sessionstart",Tl),Pe.removeEventListener("sessionend",Rl),Gi.stop()};function yt(A){A.preventDefault(),Ql("WebGLRenderer: Context Lost."),C=!0}function ut(){Ql("WebGLRenderer: Context Restored."),C=!1;const A=F.autoReset,k=ke.enabled,J=ke.autoUpdate,X=ke.needsUpdate,K=ke.type;Ue(),F.autoReset=A,ke.enabled=k,ke.autoUpdate=J,ke.needsUpdate=X,ke.type=K}function Dn(A){st("WebGLRenderer: A WebGL context could not be created. Reason: ",A.statusMessage)}function Gn(A){const k=A.target;k.removeEventListener("dispose",Gn),rh(k)}function rh(A){ah(A),W.remove(A)}function ah(A){const k=W.get(A).programs;k!==void 0&&(k.forEach(function(J){fe.releaseProgram(J)}),A.isShaderMaterial&&fe.releaseShaderCache(A))}this.renderBufferDirect=function(A,k,J,X,K,Se){k===null&&(k=Kt);const we=K.isMesh&&K.matrixWorld.determinantAffine()<0,ve=lh(A,k,J,X,K);v.setMaterial(X,we);let Te=J.index,Ie=1;if(X.wireframe===!0){if(Te=Q.getWireframeAttribute(J),Te===void 0)return;Ie=2}const Qe=J.drawRange,tt=J.attributes.position;let Re=Qe.start*Ie,ht=(Qe.start+Qe.count)*Ie;Se!==null&&(Re=Math.max(Re,Se.start*Ie),ht=Math.min(ht,(Se.start+Se.count)*Ie)),Te!==null?(Re=Math.max(Re,0),ht=Math.min(ht,Te.count)):tt!=null&&(Re=Math.max(Re,0),ht=Math.min(ht,tt.count));const Ht=ht-Re;if(Ht<0||Ht===1/0)return;be.setup(K,X,ve,J,Te);let At,Et=ge;if(Te!==null&&(At=de.get(Te),Et=ne,Et.setIndex(At)),K.isMesh)X.wireframe===!0?(v.setLineWidth(X.wireframeLinewidth*bt()),Et.setMode(z.LINES)):Et.setMode(z.TRIANGLES);else if(K.isLine){let en=X.linewidth;en===void 0&&(en=1),v.setLineWidth(en*bt()),K.isLineSegments?Et.setMode(z.LINES):K.isLineLoop?Et.setMode(z.LINE_LOOP):Et.setMode(z.LINE_STRIP)}else K.isPoints?Et.setMode(z.POINTS):K.isSprite&&Et.setMode(z.TRIANGLES);if(K.isBatchedMesh)if(ze.get("WEBGL_multi_draw"))Et.renderMultiDraw(K._multiDrawStarts,K._multiDrawCounts,K._multiDrawCount);else{const en=K._multiDrawStarts,Ee=K._multiDrawCounts,ln=K._multiDrawCount,at=Te?de.get(Te).bytesPerElement:1,En=W.get(X).currentProgram.getUniforms();for(let Vn=0;Vn<ln;Vn++)En.setValue(z,"_gl_DrawID",Vn),Et.render(en[Vn]/at,Ee[Vn])}else if(K.isInstancedMesh)Et.renderInstances(Re,Ht,K.count);else if(J.isInstancedBufferGeometry){const en=J._maxInstanceCount!==void 0?J._maxInstanceCount:1/0,Ee=Math.min(J.instanceCount,en);Et.renderInstances(Re,Ht,Ee)}else Et.render(Re,Ht)};function Al(A,k,J,X){N!==null&&A.isNodeMaterial&&N.setObject(X,A),Oe===!0&&Ne.setState(A,J,!1),A.transparent===!0&&A.side===gi&&A.forceSinglePass===!1?(A.side=gn,A.needsUpdate=!0,xa(A,k,X),A.side=nr,A.needsUpdate=!0,xa(A,k,X),A.side=gi):xa(A,k,X)}this.compile=function(A,k,J=null){J===null&&(J=A),N!==null&&N.renderStart(A,k,J),w=me.get(J),w.init(k),S.push(w),J.traverseVisible(function(K){K.isLight&&K.layers.test(k.layers)&&(w.pushLight(K),K.castShadow&&w.pushShadow(K))}),A!==J&&A.traverseVisible(function(K){K.isLight&&K.layers.test(k.layers)&&(w.pushLight(K),K.castShadow&&w.pushShadow(K))}),w.setupLights(),N!==null&&N.updateLights(w.state.lightsArray),Xe=this.localClippingEnabled,Oe=Ne.init(this.clippingPlanes,Xe),Oe===!0&&Ne.setGlobalState(this.clippingPlanes,k),N!==null&&ke.render(w.state.shadowsArray,J,k);const X=new Set;return A.traverse(function(K){if(!(K.isMesh||K.isPoints||K.isLine||K.isSprite))return;const Se=K.material;if(Se)if(Array.isArray(Se))for(let we=0;we<Se.length;we++){const ve=Se[we];Al(ve,J,k,K),X.add(ve)}else Al(Se,J,k,K),X.add(Se)}),w=S.pop(),N!==null&&N.renderEnd(),X},this.compileAsync=function(A,k,J=null){const X=this.compile(A,k,J);return new Promise(K=>{function Se(){if(X.forEach(function(we){const Te=W.get(we).currentProgram;(Te===void 0||Te.isReady())&&X.delete(we)}),X.size===0){K(A);return}setTimeout(Se,10)}ze.get("KHR_parallel_shader_compile")!==null?Se():setTimeout(Se,10)})};let Es=null;function sh(A){Es&&Es(A)}function Tl(){Gi.stop()}function Rl(){Gi.start()}const Gi=new Xu;Gi.setAnimationLoop(sh),typeof self<"u"&&Gi.setContext(self),this.setAnimationLoop=function(A){Es=A,Pe.setAnimationLoop(A),A===null?Gi.stop():Gi.start()},Pe.addEventListener("sessionstart",Tl),Pe.addEventListener("sessionend",Rl),this.render=function(A,k){if(k!==void 0&&k.isCamera!==!0){st("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(C===!0)return;N!==null&&N.renderStart(A,k);const J=Pe.enabled===!0&&Pe.isPresenting===!0,X=y!==null&&(ae===null||J)&&y.begin(L,ae);if(A.matrixWorldAutoUpdate===!0&&A.updateMatrixWorld(),k.parent===null&&k.matrixWorldAutoUpdate===!0&&k.updateMatrixWorld(),Pe.enabled===!0&&Pe.isPresenting===!0&&(y===null||y.isCompositing()===!1)&&(Pe.cameraAutoUpdate===!0&&Pe.updateCamera(k),k=Pe.getCamera()),A.isScene===!0&&A.onBeforeRender(L,A,k,ae),w=me.get(A,S.length),w.init(k),w.state.textureUnits=Z.getTextureUnits(),S.push(w),Ye.multiplyMatrices(k.projectionMatrix,k.matrixWorldInverse),Le.setFromProjectionMatrix(Ye,ei,k.reversedDepth),Xe=this.localClippingEnabled,Oe=Ne.init(this.clippingPlanes,Xe),R=xe.get(A,D.length),R.init(),D.push(R),Pe.enabled===!0&&Pe.isPresenting===!0){const we=L.xr.getDepthSensingMesh();we!==null&&ys(we,k,-1/0,L.sortObjects)}ys(A,k,0,L.sortObjects),R.finish(),N!==null&&N.updateLights(w.state.lightsArray),L.sortObjects===!0&&R.sort(G,he),xt=Pe.enabled===!1||Pe.isPresenting===!1||Pe.hasDepthSensing()===!1,xt&&Ke.addToRenderList(R,A),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),Oe===!0&&Ne.beginShadows();const K=w.state.shadowsArray;if(ke.render(K,A,k),Oe===!0&&Ne.endShadows(),(X&&y.hasRenderPass())===!1){const we=R.opaque,ve=R.transmissive;if(w.setupLights(),k.isArrayCamera){const Te=k.cameras;if(ve.length>0)for(let Ie=0,Qe=Te.length;Ie<Qe;Ie++){const tt=Te[Ie];Ll(we,ve,A,tt)}xt&&Ke.render(A);for(let Ie=0,Qe=Te.length;Ie<Qe;Ie++){const tt=Te[Ie];Cl(R,A,tt,tt.viewport)}}else ve.length>0&&Ll(we,ve,A,k),xt&&Ke.render(A),Cl(R,A,k)}ae!==null&&$===0&&(Z.updateMultisampleRenderTarget(ae),Z.updateRenderTargetMipmap(ae)),X&&y.end(L),A.isScene===!0&&A.onAfterRender(L,A,k),be.resetDefaultState(),q=-1,ee=null,S.pop(),S.length>0?(w=S[S.length-1],Z.setTextureUnits(w.state.textureUnits),Oe===!0&&Ne.setGlobalState(L.clippingPlanes,w.state.camera)):w=null,D.pop(),D.length>0?R=D[D.length-1]:R=null,N!==null&&N.renderEnd()};function ys(A,k,J,X){if(A.visible===!1)return;if(A.layers.test(k.layers)){if(A.isGroup)J=A.renderOrder;else if(A.isLOD)A.autoUpdate===!0&&A.update(k);else if(A.isLightProbeGrid)w.pushLightProbeGrid(A);else if(A.isLight)w.pushLight(A),A.castShadow&&w.pushShadow(A);else if(A.isSprite){if(!A.frustumCulled||A.intersectsFrustum(Le)){X&&Pt.setFromMatrixPosition(A.matrixWorld).applyMatrix4(Ye);const we=te.update(A),ve=A.material;ve.visible&&R.push(A,we,ve,J,Pt.z,null,k)}}else if((A.isMesh||A.isLine||A.isPoints)&&(!A.frustumCulled||A.intersectsFrustum(Le))){const we=te.update(A),ve=A.material;if(X&&(A.boundingSphere!==void 0?(A.boundingSphere===null&&A.computeBoundingSphere(),Pt.copy(A.boundingSphere.center)):(we.boundingSphere===null&&we.computeBoundingSphere(),Pt.copy(we.boundingSphere.center)),Pt.applyMatrix4(A.matrixWorld).applyMatrix4(Ye)),Array.isArray(ve)){const Te=we.groups;for(let Ie=0,Qe=Te.length;Ie<Qe;Ie++){const tt=Te[Ie],Re=ve[tt.materialIndex];Re&&Re.visible&&R.push(A,we,Re,J,Pt.z,tt,k)}}else ve.visible&&R.push(A,we,ve,J,Pt.z,null,k)}}const Se=A.children;for(let we=0,ve=Se.length;we<ve;we++)ys(Se[we],k,J,X)}function Cl(A,k,J,X){const{opaque:K,transmissive:Se,transparent:we}=A;w.setupLightsView(J),Oe===!0&&Ne.setGlobalState(L.clippingPlanes,J),X&&v.viewport(O.copy(X)),K.length>0&&_a(K,k,J),Se.length>0&&_a(Se,k,J),we.length>0&&_a(we,k,J),v.buffers.depth.setTest(!0),v.buffers.depth.setMask(!0),v.buffers.color.setMask(!0),v.setPolygonOffset(!1)}function Ll(A,k,J,X){if((J.isScene===!0?J.overrideMaterial:null)!==null)return;if(w.state.transmissionRenderTarget[X.id]===void 0){const Re=ze.has("EXT_color_buffer_half_float")||ze.has("EXT_color_buffer_float");w.state.transmissionRenderTarget[X.id]=new Cn(1,1,{generateMipmaps:!0,type:Re?ai:vn,minFilter:Qi,samples:Math.max(4,P.samples),stencilBuffer:a,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:nt.workingColorSpace})}const Se=w.state.transmissionRenderTarget[X.id],we=X.viewport||O;Se.setSize(we.z*L.transmissionResolutionScale,we.w*L.transmissionResolutionScale);const ve=L.getRenderTarget(),Te=L.getActiveCubeFace(),Ie=L.getActiveMipmapLevel();L.setRenderTarget(Se),L.getClearColor(Ce),Fe=L.getClearAlpha(),Fe<1&&L.setClearColor(16777215,.5),L.clear(),xt&&Ke.render(J);const Qe=L.toneMapping;L.toneMapping=ti;const tt=X.viewport;if(X.viewport!==void 0&&(X.viewport=void 0),w.setupLightsView(X),Oe===!0&&Ne.setGlobalState(L.clippingPlanes,X),_a(A,J,X),Z.updateMultisampleRenderTarget(Se),Z.updateRenderTargetMipmap(Se),ze.has("WEBGL_multisampled_render_to_texture")===!1){let Re=!1;for(let ht=0,Ht=k.length;ht<Ht;ht++){const At=k[ht],{object:Et,geometry:en,material:Ee,group:ln}=At;if(Ee.side===gi&&Et.layers.test(X.layers)){const at=Ee.side;Ee.side=gn,Ee.needsUpdate=!0,Dl(Et,J,X,en,Ee,ln),Ee.side=at,Ee.needsUpdate=!0,Re=!0}}Re===!0&&(Z.updateMultisampleRenderTarget(Se),Z.updateRenderTargetMipmap(Se))}L.setRenderTarget(ve,Te,Ie),L.setClearColor(Ce,Fe),tt!==void 0&&(X.viewport=tt),L.toneMapping=Qe}function _a(A,k,J){const X=k.isScene===!0?k.overrideMaterial:null;for(let K=0,Se=A.length;K<Se;K++){const we=A[K],{object:ve,geometry:Te,group:Ie}=we;let Qe=we.material;Qe.allowOverride===!0&&X!==null&&(Qe=X),ve.layers.test(J.layers)&&Dl(ve,k,J,Te,Qe,Ie)}}function Dl(A,k,J,X,K,Se){N!==null&&K.isNodeMaterial&&N.setObject(A,K),A.onBeforeRender(L,k,J,X,K,Se),A.modelViewMatrix.multiplyMatrices(J.matrixWorldInverse,A.matrixWorld),A.normalMatrix.getNormalMatrix(A.modelViewMatrix),K.onBeforeRender(L,k,J,X,A,Se),K.transparent===!0&&K.side===gi&&K.forceSinglePass===!1?(K.side=gn,K.needsUpdate=!0,L.renderBufferDirect(J,k,X,K,A,Se),K.side=nr,K.needsUpdate=!0,L.renderBufferDirect(J,k,X,K,A,Se),K.side=gi):L.renderBufferDirect(J,k,X,K,A,Se),A.onAfterRender(L,k,J,X,K,Se)}function xa(A,k,J){k.isScene!==!0&&(k=Kt);const X=W.get(A),K=w.state.lights,Se=w.state.shadowsArray,we=K.state.version,ve=fe.getParameters(A,K.state,Se,k,J,w.state.lightProbeGridArray),Te=fe.getProgramCacheKey(ve);let Ie=X.programs;X.environment=A.isMeshStandardMaterial||A.isMeshLambertMaterial||A.isMeshPhongMaterial?k.environment:null,X.fog=k.fog;const Qe=A.isMeshStandardMaterial||A.isMeshLambertMaterial&&!A.envMap||A.isMeshPhongMaterial&&!A.envMap;X.envMap=le.get(A.envMap||X.environment,Qe),X.envMapRotation=X.environment!==null&&A.envMap===null?k.environmentRotation:A.envMapRotation,Ie===void 0&&(A.addEventListener("dispose",Gn),Ie=new Map,X.programs=Ie);let tt=Ie.get(Te);if(tt!==void 0){if(X.currentProgram===tt&&X.lightsStateVersion===we)return Il(A,ve),tt}else ve.uniforms=fe.getUniforms(A),N!==null&&A.isNodeMaterial&&N.build(A,J,ve),A.onBeforeCompile(ve,L),tt=fe.acquireProgram(ve,Te),Ie.set(Te,tt),X.uniforms=ve.uniforms;const Re=X.uniforms;return(!A.isShaderMaterial&&!A.isRawShaderMaterial||A.clipping===!0)&&(Re.clippingPlanes=Ne.uniform),Il(A,ve),X.needsLights=uh(A),X.lightsStateVersion=we,X.needsLights&&(Re.ambientLightColor.value=K.state.ambient,Re.lightProbe.value=K.state.probe,Re.sunLights.value=K.state.sun,Re.sunLightShadows.value=K.state.sunShadow,Re.directionalLights.value=K.state.directional,Re.directionalLightShadows.value=K.state.directionalShadow,Re.spotLights.value=K.state.spot,Re.spotLightShadows.value=K.state.spotShadow,Re.rectAreaLights.value=K.state.rectArea,Re.ltc_1.value=K.state.rectAreaLTC1,Re.ltc_2.value=K.state.rectAreaLTC2,Re.pointLights.value=K.state.point,Re.pointLightShadows.value=K.state.pointShadow,Re.hemisphereLights.value=K.state.hemi,Re.sunShadowMatrix.value=K.state.sunShadowMatrix,Re.sunShadowCascade.value=K.state.sunShadowCascade,Re.directionalShadowMatrix.value=K.state.directionalShadowMatrix,Re.spotLightMatrix.value=K.state.spotLightMatrix,Re.spotLightMap.value=K.state.spotLightMap,Re.pointShadowMatrix.value=K.state.pointShadowMatrix),X.lightProbeGrid=w.state.lightProbeGridArray.length>0,X.currentProgram=tt,X.uniformsList=null,tt}function Pl(A){if(A.uniformsList===null){const k=A.currentProgram.getUniforms();A.uniformsList=rs.seqWithValue(k.seq,A.uniforms)}return A.uniformsList}function Il(A,k){const J=W.get(A);J.outputColorSpace=k.outputColorSpace,J.batching=k.batching,J.batchingColor=k.batchingColor,J.instancing=k.instancing,J.instancingColor=k.instancingColor,J.instancingMorph=k.instancingMorph,J.skinning=k.skinning,J.morphTargets=k.morphTargets,J.morphNormals=k.morphNormals,J.morphColors=k.morphColors,J.morphTargetsCount=k.morphTargetsCount,J.numClippingPlanes=k.numClippingPlanes,J.numIntersection=k.numClipIntersection,J.vertexAlphas=k.vertexAlphas,J.vertexTangents=k.vertexTangents,J.toneMapping=k.toneMapping}function oh(A,k){if(A.length===0)return null;if(A.length===1)return A[0].texture!==null?A[0]:null;b.setFromMatrixPosition(k.matrixWorld);for(let J=0,X=A.length;J<X;J++){const K=A[J];if(K.texture!==null&&K.boundingBox.containsPoint(b))return K}return null}function lh(A,k,J,X,K){k.isScene!==!0&&(k=Kt),Z.resetTextureUnits();const Se=k.fog,we=X.isMeshStandardMaterial||X.isMeshLambertMaterial||X.isMeshPhongMaterial?k.environment:null,ve=ae===null?L.outputColorSpace:ae.isXRRenderTarget===!0?ae.texture.colorSpace:nt.workingColorSpace,Te=X.isMeshStandardMaterial||X.isMeshLambertMaterial&&!X.envMap||X.isMeshPhongMaterial&&!X.envMap,Ie=le.get(X.envMap||we,Te),Qe=X.vertexColors===!0&&!!J.attributes.color&&J.attributes.color.itemSize===4,tt=!!J.attributes.tangent&&(!!X.normalMap||X.anisotropy>0),Re=!!J.morphAttributes.position,ht=!!J.morphAttributes.normal,Ht=!!J.morphAttributes.color;let At=ti;X.toneMapped&&(ae===null||ae.isXRRenderTarget===!0)&&(At=L.toneMapping);const Et=J.morphAttributes.position||J.morphAttributes.normal||J.morphAttributes.color,en=Et!==void 0?Et.length:0,Ee=W.get(X),ln=w.state.lights;if(Oe===!0&&(Xe===!0||A!==ee)){const wt=A===ee&&X.id===q;Ne.setState(X,A,wt)}let at=!1;X.version===Ee.__version?(Ee.needsLights&&Ee.lightsStateVersion!==ln.state.version||Ee.outputColorSpace!==ve||K.isBatchedMesh&&Ee.batching===!1||!K.isBatchedMesh&&Ee.batching===!0||K.isBatchedMesh&&Ee.batchingColor===!0&&K._colorsTexture===null||K.isBatchedMesh&&Ee.batchingColor===!1&&K._colorsTexture!==null||K.isInstancedMesh&&Ee.instancing===!1||!K.isInstancedMesh&&Ee.instancing===!0||K.isSkinnedMesh&&Ee.skinning===!1||!K.isSkinnedMesh&&Ee.skinning===!0||K.isInstancedMesh&&Ee.instancingColor===!0&&K.instanceColor===null||K.isInstancedMesh&&Ee.instancingColor===!1&&K.instanceColor!==null||K.isInstancedMesh&&Ee.instancingMorph===!0&&K.morphTexture===null||K.isInstancedMesh&&Ee.instancingMorph===!1&&K.morphTexture!==null||Ee.envMap!==Ie||X.fog===!0&&Ee.fog!==Se||Ee.numClippingPlanes!==void 0&&(Ee.numClippingPlanes!==Ne.numPlanes||Ee.numIntersection!==Ne.numIntersection)||Ee.vertexAlphas!==Qe||Ee.vertexTangents!==tt||Ee.morphTargets!==Re||Ee.morphNormals!==ht||Ee.morphColors!==Ht||Ee.toneMapping!==At||Ee.morphTargetsCount!==en||!!Ee.lightProbeGrid!=w.state.lightProbeGridArray.length>0)&&(at=!0):(at=!0,Ee.__version=X.version);let En=Ee.currentProgram;at===!0&&(En=xa(X,k,K),N&&X.isNodeMaterial&&N.onUpdateProgram(X,En,Ee));let Vn=!1,Ci=!1,or=!1;const Mt=En.getUniforms(),kt=Ee.uniforms;if(v.useProgram(En.program)&&(Vn=!0,Ci=!0,or=!0),X.id!==q&&(q=X.id,Ci=!0),Ee.needsLights){const wt=oh(w.state.lightProbeGridArray,K);Ee.lightProbeGrid!==wt&&(Ee.lightProbeGrid=wt,Ci=!0)}if(Vn||ee!==A){v.buffers.depth.getReversed()&&A.reversedDepth!==!0&&(A._reversedDepth=!0,A.updateProjectionMatrix()),Mt.setValue(z,"projectionMatrix",A.projectionMatrix),Mt.setValue(z,"viewMatrix",A.matrixWorldInverse);const Di=Mt.map.cameraPosition;Di!==void 0&&Di.setValue(z,St.setFromMatrixPosition(A.matrixWorld)),P.logarithmicDepthBuffer&&Mt.setValue(z,"logDepthBufFC",2/(Math.log(A.far+1)/Math.LN2)),(X.isMeshPhongMaterial||X.isMeshToonMaterial||X.isMeshLambertMaterial||X.isMeshBasicMaterial||X.isMeshStandardMaterial||X.isShaderMaterial)&&Mt.setValue(z,"isOrthographic",A.isOrthographicCamera===!0),ee!==A&&(ee=A,Ci=!0,or=!0)}if(Ee.needsLights&&(ln.state.sunShadowMap.length>0&&Mt.setValue(z,"sunShadowMap",ln.state.sunShadowMap,Z),ln.state.directionalShadowMap.length>0&&Mt.setValue(z,"directionalShadowMap",ln.state.directionalShadowMap,Z),ln.state.spotShadowMap.length>0&&Mt.setValue(z,"spotShadowMap",ln.state.spotShadowMap,Z),ln.state.pointShadowMap.length>0&&Mt.setValue(z,"pointShadowMap",ln.state.pointShadowMap,Z)),K.isSkinnedMesh){Mt.setOptional(z,K,"bindMatrix"),Mt.setOptional(z,K,"bindMatrixInverse");const wt=K.skeleton;wt&&(wt.boneTexture===null&&wt.computeBoneTexture(),Mt.setValue(z,"boneTexture",wt.boneTexture,Z))}K.isBatchedMesh&&(Mt.setOptional(z,K,"batchingTexture"),Mt.setValue(z,"batchingTexture",K._matricesTexture,Z),Mt.setOptional(z,K,"batchingIdTexture"),Mt.setValue(z,"batchingIdTexture",K._indirectTexture,Z),Mt.setOptional(z,K,"batchingColorTexture"),K._colorsTexture!==null&&Mt.setValue(z,"batchingColorTexture",K._colorsTexture,Z));const Li=J.morphAttributes;if((Li.position!==void 0||Li.normal!==void 0||Li.color!==void 0)&&H.update(K,J,En),(Ci||Ee.receiveShadow!==K.receiveShadow)&&(Ee.receiveShadow=K.receiveShadow,Mt.setValue(z,"receiveShadow",K.receiveShadow)),(X.isMeshStandardMaterial||X.isMeshLambertMaterial||X.isMeshPhongMaterial)&&X.envMap===null&&k.environment!==null&&(kt.envMapIntensity.value=k.environmentIntensity),kt.dfgLUT!==void 0&&(kt.dfgLUT.value=G_()),Ci){if(Mt.setValue(z,"toneMappingExposure",L.toneMappingExposure),Ee.needsLights&&ch(kt,or),Se&&X.fog===!0&&De.refreshFogUniforms(kt,Se),De.refreshMaterialUniforms(kt,X,ie,j,w.state.transmissionRenderTarget[A.id]),Ee.needsLights&&Ee.lightProbeGrid){const wt=Ee.lightProbeGrid;kt.probesSH.value=wt.texture,kt.probesMin.value.copy(wt.boundingBox.min),kt.probesMax.value.copy(wt.boundingBox.max),kt.probesResolution.value.copy(wt.resolution)}rs.upload(z,Pl(Ee),kt,Z)}if(X.isShaderMaterial&&X.uniformsNeedUpdate===!0&&(rs.upload(z,Pl(Ee),kt,Z),X.uniformsNeedUpdate=!1),X.isSpriteMaterial&&Mt.setValue(z,"center",K.center),Mt.setValue(z,"modelViewMatrix",K.modelViewMatrix),Mt.setValue(z,"normalMatrix",K.normalMatrix),Mt.setValue(z,"modelMatrix",K.matrixWorld),X.uniformsGroups!==void 0){const wt=X.uniformsGroups;for(let Di=0,lr=wt.length;Di<lr;Di++){const Ul=wt[Di];oe.update(Ul,En),oe.bind(Ul,En)}}return En}function ch(A,k){A.ambientLightColor.needsUpdate=k,A.lightProbe.needsUpdate=k,A.sunLights.needsUpdate=k,A.sunLightShadows.needsUpdate=k,A.directionalLights.needsUpdate=k,A.directionalLightShadows.needsUpdate=k,A.pointLights.needsUpdate=k,A.pointLightShadows.needsUpdate=k,A.spotLights.needsUpdate=k,A.spotLightShadows.needsUpdate=k,A.rectAreaLights.needsUpdate=k,A.hemisphereLights.needsUpdate=k}function uh(A){return A.isMeshLambertMaterial||A.isMeshToonMaterial||A.isMeshPhongMaterial||A.isMeshStandardMaterial||A.isShadowMaterial||A.isShaderMaterial&&A.lights===!0}this.getActiveCubeFace=function(){return V},this.getActiveMipmapLevel=function(){return $},this.getRenderTarget=function(){return ae},this.setRenderTargetTextures=function(A,k,J){const X=W.get(A);X.__autoAllocateDepthBuffer=A.resolveDepthBuffer===!1,X.__autoAllocateDepthBuffer===!1&&(X.__useRenderToTexture=!1),W.get(A.texture).__webglTexture=k,W.get(A.depthTexture).__webglTexture=X.__autoAllocateDepthBuffer?void 0:J,X.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(A,k){const J=W.get(A);J.__webglFramebuffer=k,J.__useDefaultFramebuffer=k===void 0},this.setRenderTarget=function(A,k=0,J=0){ae=A,V=k,$=J;let X=null,K=!1,Se=!1;if(A){const ve=W.get(A);if(ve.__useDefaultFramebuffer!==void 0){v.bindFramebuffer(z.FRAMEBUFFER,ve.__webglFramebuffer),O.copy(A.viewport),re.copy(A.scissor),ue=A.scissorTest,v.viewport(O),v.scissor(re),v.setScissorTest(ue),q=-1;return}else if(ve.__webglFramebuffer===void 0)Z.setupRenderTarget(A);else if(ve.__hasExternalTextures)Z.rebindTextures(A,W.get(A.texture).__webglTexture,W.get(A.depthTexture).__webglTexture);else if(A.depthBuffer){const Qe=A.depthTexture;if(ve.__boundDepthTexture!==Qe){if(Qe!==null&&W.has(Qe)&&(A.width!==Qe.image.width||A.height!==Qe.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");Z.setupDepthRenderbuffer(A)}}const Te=A.texture;(Te.isData3DTexture||Te.isDataArrayTexture||Te.isCompressedArrayTexture)&&(Se=!0);const Ie=W.get(A).__webglFramebuffer;A.isWebGLCubeRenderTarget?(Array.isArray(Ie[k])?X=Ie[k][J]:X=Ie[k],K=!0):A.samples>0&&Z.useMultisampledRTT(A)===!1?X=W.get(A).__webglMultisampledFramebuffer:Array.isArray(Ie)?X=Ie[J]:X=Ie,O.copy(A.viewport),re.copy(A.scissor),ue=A.scissorTest}else O.copy(se).multiplyScalar(ie).floor(),re.copy(ye).multiplyScalar(ie).floor(),ue=$e;if(J!==0&&(X=U),v.bindFramebuffer(z.FRAMEBUFFER,X)&&v.drawBuffers(A,X),v.viewport(O),v.scissor(re),v.setScissorTest(ue),K){const ve=W.get(A.texture);z.framebufferTexture2D(z.FRAMEBUFFER,z.COLOR_ATTACHMENT0,z.TEXTURE_CUBE_MAP_POSITIVE_X+k,ve.__webglTexture,J)}else if(Se){const ve=k;for(let Te=0;Te<A.textures.length;Te++){const Ie=W.get(A.textures[Te]);z.framebufferTextureLayer(z.FRAMEBUFFER,z.COLOR_ATTACHMENT0+Te,Ie.__webglTexture,J,ve)}}else if(A!==null&&J!==0){const ve=W.get(A.texture);z.framebufferTexture2D(z.FRAMEBUFFER,z.COLOR_ATTACHMENT0,z.TEXTURE_2D,ve.__webglTexture,J)}q=-1};function Nl(A){const k=W.get(A);return(k.__readFormat!==A.format||k.__readType!==A.type)&&(k.__readFormat=A.format,k.__readType=A.type,k.__formatReadable=P.textureFormatReadable(A.format),k.__typeReadable=P.textureTypeReadable(A.type)),k}this.readRenderTargetPixels=function(A,k,J,X,K,Se,we,ve=0){if(!(A&&A.isWebGLRenderTarget)){st("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Te=W.get(A).__webglFramebuffer;if(A.isWebGLCubeRenderTarget&&we!==void 0&&(Te=Te[we]),Te){v.bindFramebuffer(z.FRAMEBUFFER,Te);try{const Ie=A.textures[ve],Qe=Ie.format,tt=Ie.type;A.textures.length>1&&z.readBuffer(z.COLOR_ATTACHMENT0+ve);const Re=Nl(Ie);if(Re.__formatReadable===!1){st("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(Re.__typeReadable===!1){st("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}k>=0&&k<=A.width-X&&J>=0&&J<=A.height-K&&z.readPixels(k,J,X,K,_e.convert(Qe),_e.convert(tt),Se)}finally{const Ie=ae!==null?W.get(ae).__webglFramebuffer:null;v.bindFramebuffer(z.FRAMEBUFFER,Ie)}}},this.readRenderTargetPixelsAsync=async function(A,k,J,X,K,Se,we,ve=0){if(!(A&&A.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Te=W.get(A).__webglFramebuffer;if(A.isWebGLCubeRenderTarget&&we!==void 0&&(Te=Te[we]),Te)if(k>=0&&k<=A.width-X&&J>=0&&J<=A.height-K){v.bindFramebuffer(z.FRAMEBUFFER,Te);const Ie=A.textures[ve],Qe=Ie.format,tt=Ie.type;A.textures.length>1&&z.readBuffer(z.COLOR_ATTACHMENT0+ve);const Re=Nl(Ie);if(Re.__formatReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(Re.__typeReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const ht=z.createBuffer();z.bindBuffer(z.PIXEL_PACK_BUFFER,ht),z.bufferData(z.PIXEL_PACK_BUFFER,Se.byteLength,z.STREAM_READ),z.readPixels(k,J,X,K,_e.convert(Qe),_e.convert(tt),0),z.bindBuffer(z.PIXEL_PACK_BUFFER,null);const Ht=ae!==null?W.get(ae).__webglFramebuffer:null;v.bindFramebuffer(z.FRAMEBUFFER,Ht);const At=z.fenceSync(z.SYNC_GPU_COMMANDS_COMPLETE,0);return z.flush(),await up(z,At,4),z.bindBuffer(z.PIXEL_PACK_BUFFER,ht),z.getBufferSubData(z.PIXEL_PACK_BUFFER,0,Se),z.bindBuffer(z.PIXEL_PACK_BUFFER,null),z.deleteBuffer(ht),z.deleteSync(At),Se}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(A,k=null,J=0){const X=Math.pow(2,-J),K=Math.floor(A.image.width*X),Se=Math.floor(A.image.height*X),we=k!==null?k.x:0,ve=k!==null?k.y:0;Z.setTexture2D(A,0),z.copyTexSubImage2D(z.TEXTURE_2D,J,0,0,we,ve,K,Se),v.unbindTexture()},this.copyTextureToTexture=function(A,k,J=null,X=null,K=0,Se=0){let we,ve,Te,Ie,Qe,tt,Re,ht,Ht;const At=A.isCompressedTexture?A.mipmaps[Se]:A.image;if(J!==null)we=J.max.x-J.min.x,ve=J.max.y-J.min.y,Te=J.isBox3?J.max.z-J.min.z:1,Ie=J.min.x,Qe=J.min.y,tt=J.isBox3?J.min.z:0;else{const kt=Math.pow(2,-K);we=Math.floor(At.width*kt),ve=Math.floor(At.height*kt),A.isDataArrayTexture?Te=At.depth:A.isData3DTexture?Te=Math.floor(At.depth*kt):Te=1,Ie=0,Qe=0,tt=0}X!==null?(Re=X.x,ht=X.y,Ht=X.z):(Re=0,ht=0,Ht=0);const Et=_e.convert(k.format),en=_e.convert(k.type);let Ee;k.isData3DTexture?(Z.setTexture3D(k,0),Ee=z.TEXTURE_3D):k.isDataArrayTexture||k.isCompressedArrayTexture?(Z.setTexture2DArray(k,0),Ee=z.TEXTURE_2D_ARRAY):(Z.setTexture2D(k,0),Ee=z.TEXTURE_2D),v.activeTexture(z.TEXTURE0),v.pixelStorei(z.UNPACK_FLIP_Y_WEBGL,k.flipY),v.pixelStorei(z.UNPACK_PREMULTIPLY_ALPHA_WEBGL,k.premultiplyAlpha),v.pixelStorei(z.UNPACK_ALIGNMENT,k.unpackAlignment);const ln=v.getParameter(z.UNPACK_ROW_LENGTH),at=v.getParameter(z.UNPACK_IMAGE_HEIGHT),En=v.getParameter(z.UNPACK_SKIP_PIXELS),Vn=v.getParameter(z.UNPACK_SKIP_ROWS),Ci=v.getParameter(z.UNPACK_SKIP_IMAGES);v.pixelStorei(z.UNPACK_ROW_LENGTH,At.width),v.pixelStorei(z.UNPACK_IMAGE_HEIGHT,At.height),v.pixelStorei(z.UNPACK_SKIP_PIXELS,Ie),v.pixelStorei(z.UNPACK_SKIP_ROWS,Qe),v.pixelStorei(z.UNPACK_SKIP_IMAGES,tt);const or=A.isDataArrayTexture||A.isData3DTexture,Mt=k.isDataArrayTexture||k.isData3DTexture;if(A.isDepthTexture){const kt=W.get(A),Li=W.get(k),wt=W.get(kt.__renderTarget),Di=W.get(Li.__renderTarget);v.bindFramebuffer(z.READ_FRAMEBUFFER,wt.__webglFramebuffer),v.bindFramebuffer(z.DRAW_FRAMEBUFFER,Di.__webglFramebuffer);for(let lr=0;lr<Te;lr++)or&&(z.framebufferTextureLayer(z.READ_FRAMEBUFFER,z.COLOR_ATTACHMENT0,W.get(A).__webglTexture,K,tt+lr),z.framebufferTextureLayer(z.DRAW_FRAMEBUFFER,z.COLOR_ATTACHMENT0,W.get(k).__webglTexture,Se,Ht+lr)),z.blitFramebuffer(Ie,Qe,we,ve,Re,ht,we,ve,z.DEPTH_BUFFER_BIT,z.NEAREST);v.bindFramebuffer(z.READ_FRAMEBUFFER,null),v.bindFramebuffer(z.DRAW_FRAMEBUFFER,null)}else if(K!==0||A.isRenderTargetTexture||W.has(A)){const kt=W.get(A),Li=W.get(k);v.bindFramebuffer(z.READ_FRAMEBUFFER,I),v.bindFramebuffer(z.DRAW_FRAMEBUFFER,B);for(let wt=0;wt<Te;wt++)or?z.framebufferTextureLayer(z.READ_FRAMEBUFFER,z.COLOR_ATTACHMENT0,kt.__webglTexture,K,tt+wt):z.framebufferTexture2D(z.READ_FRAMEBUFFER,z.COLOR_ATTACHMENT0,z.TEXTURE_2D,kt.__webglTexture,K),Mt?z.framebufferTextureLayer(z.DRAW_FRAMEBUFFER,z.COLOR_ATTACHMENT0,Li.__webglTexture,Se,Ht+wt):z.framebufferTexture2D(z.DRAW_FRAMEBUFFER,z.COLOR_ATTACHMENT0,z.TEXTURE_2D,Li.__webglTexture,Se),K!==0?z.blitFramebuffer(Ie,Qe,we,ve,Re,ht,we,ve,z.COLOR_BUFFER_BIT,z.NEAREST):Mt?z.copyTexSubImage3D(Ee,Se,Re,ht,Ht+wt,Ie,Qe,we,ve):z.copyTexSubImage2D(Ee,Se,Re,ht,Ie,Qe,we,ve);v.bindFramebuffer(z.READ_FRAMEBUFFER,null),v.bindFramebuffer(z.DRAW_FRAMEBUFFER,null)}else Mt?A.isDataTexture||A.isData3DTexture?z.texSubImage3D(Ee,Se,Re,ht,Ht,we,ve,Te,Et,en,At.data):k.isCompressedArrayTexture?z.compressedTexSubImage3D(Ee,Se,Re,ht,Ht,we,ve,Te,Et,At.data):z.texSubImage3D(Ee,Se,Re,ht,Ht,we,ve,Te,Et,en,At):A.isDataTexture?z.texSubImage2D(z.TEXTURE_2D,Se,Re,ht,we,ve,Et,en,At.data):A.isCompressedTexture?z.compressedTexSubImage2D(z.TEXTURE_2D,Se,Re,ht,At.width,At.height,Et,At.data):z.texSubImage2D(z.TEXTURE_2D,Se,Re,ht,we,ve,Et,en,At);v.pixelStorei(z.UNPACK_ROW_LENGTH,ln),v.pixelStorei(z.UNPACK_IMAGE_HEIGHT,at),v.pixelStorei(z.UNPACK_SKIP_PIXELS,En),v.pixelStorei(z.UNPACK_SKIP_ROWS,Vn),v.pixelStorei(z.UNPACK_SKIP_IMAGES,Ci),Se===0&&k.generateMipmaps&&z.generateMipmap(Ee),v.unbindTexture()},this.initRenderTarget=function(A){W.get(A).__webglFramebuffer===void 0&&Z.setupRenderTarget(A)},this.initTexture=function(A){A.isCubeTexture?Z.setTextureCube(A,0):A.isData3DTexture?Z.setTexture3D(A,0):A.isDataArrayTexture||A.isCompressedArrayTexture?Z.setTexture2DArray(A,0):Z.setTexture2D(A,0),v.unbindTexture()},this.resetState=function(){V=0,$=0,ae=null,v.reset(),be.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return ei}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=nt._getDrawingBufferColorSpace(e),t.unpackColorSpace=nt._getUnpackColorSpace()}}const Ot=(n,e=0)=>{const t=Math.sin(n*127.1+e*311.7)*43758.5453;return t-Math.floor(t)},_t=(n,e,t=0)=>Ot(Math.floor(n[0]*e)+Math.floor(n[2]*e)*57+t,Math.floor(n[1]*e)),Ct=(n=.2,e=.15)=>t=>{const i=_t(t,16,3);return _t(t,6,5)<e&&t[1]>.1?l.MOSS:i>1-n*.7?l.BODY2:void 0},Ut=(n,e,t,i,r,a=0,s=0)=>{for(let o=0;o<e;o++){const c=Ot(r,o)*6.283,u=t*Math.sqrt(Ot(o,r));n.ell([a+Math.cos(c)*u,.07,s+Math.sin(c)*u*.7],[.07,.1+Ot(o,4)*.08,.07],l.LEAF2,{group:i+o%3,paint:h=>h[1]>.13?l.LEAF:void 0})}},Xa=(n,e,t,i=1)=>{for(let r=0;r<6;r++){const a=r/6*6.283+e[0],s=[Math.cos(a),0,Math.sin(a)];n.chain([[...e,.03*i],[...T.add(e,T.add(T.mul(s,.25*i),[0,.2*i,0])),.025*i],[...T.add(e,T.add(T.mul(s,.5*i),[0,.05*i,0])),.01*i]],r%2?l.LEAF:l.LEAF2,{group:t})}},Bn=(n,e,t,i,r)=>{const a=[];for(let s=0;s<=4;s++)a.push([...T.add(T.lerp(e,t,s/4),[(Ot(r,s)-.5)*.12,0,.02]),.03]);n.chain(a,l.LEAF,{group:i,paint:s=>_t(s,30)<.3?l.LEAF2:void 0})},ds=(n,e,t,i)=>n.ell(e,t,l.LEAF,{group:i,rough:.04,paint:r=>{const a=_t(r,10,2);return r[1]<e[1]-.15||a<.2?l.LEAF3:a>.8?l.LEAF2:void 0}}),Ze=(n,e,t,i,r=.025,a=l.FRAME)=>n.seg(e,t,r,r,a,{group:i,paint:Ct(.35,.05)}),Or=(n,e,t,i,r=l.MAGIC)=>n.ell(e,[t,t,t],r,{group:i,extra:!0});function Jn(n,e,{yaw:t=0,pitch:i=0,roll:r=0,at:a=[0,0,0]}={}){const s=(d,f,p,m)=>{const x=Math.cos(f),_=Math.sin(f),g=[...d];return g[p]=d[p]*x-d[m]*_,g[m]=d[p]*_+d[m]*x,g},o=d=>s(s(s(d,r,1,2),i,0,1),-t,0,2),c=d=>s(s(s(d,t,0,2),-i,0,1),-r,1,2),u=d=>T.add(o(d),a),h=d=>c(T.sub(d,a));for(const d of n.parts.slice(e))if(d.type==="cone"?(d.a=u(d.a),d.b=u(d.b)):(d.c=u(d.c),d.axes=d.axes.map(o)),d.paint){const f=d.paint;d.paint=(p,m)=>f(h(p),m)}}function so(n,e,{len:t=1.5,van:i=!1,glow:r=!1,flat:a=!1}={}){const s=i?.62:.3,o=i?.8:.5;n.box([0,o,0],[t,s,.66],l.BODY,{round:.14,group:e,paint:c=>{const u=Ct(.3,.12)(c);return u||(c[0]>t-.06&&Math.abs(c[1]-(o+s*.2))<.07&&Math.abs(Math.abs(c[2])-.45)<.1?r?l.MAGIC2:l.FRAME:i&&c[1]>o+.1&&Math.abs(c[2])>.6&&Math.abs(c[0]+.2)<.9&&(c[0]+3)*3%1>.15||c[1]<o-s+.1?l.SHADES:void 0)}}),i||n.box([-.2,o+s+.22,0],[t*.6,.24,.6],l.BODY,{round:.14,group:e,paint:c=>Math.abs(c[2])>.52||c[0]>t*.6-.25-.2?_t(c,9)<.25?l.STONED:l.SHADES:Ct(.3,.25)(c)});for(const c of[-t*.65,t*.65])for(const u of[-.66,.66])n.ell([c,.3,u],[.3,a?.22:.3,.1],l.BODY3,{group:e+1,paint:h=>Math.hypot(h[0]-c,h[1]-.3)<.12?l.FRAME:void 0});if(r)for(const c of[-.45,.45])Or(n,[t+.05,o+s*.2,c],.07,e+2,l.MAGIC2)}const W_={"car-nose-down":{desc:"a hatchback nose-down in the earth, ferns round it",build(n){const e=n.parts.length;so(n,1),Jn(n,e,{pitch:-.5,at:[0,.2,0]}),n.ell([1.3,.1,0],[.9,.35,1],l.BARK2,{group:4,rough:.04,paint:t=>t[1]>.25?l.MOSS:void 0}),Xa(n,[.9,.2,.8],5),Xa(n,[-.9,.05,.9],6,.8),n.ell([-.6,1.25,0],[.5,.06,.4],l.MOSS,{group:7})}},"van-tree":{desc:"a camper van with a tree grown up through its roof, its headlights glowing with fairy light",glow:!0,build(n){so(n,1,{van:!0,len:1.6,flat:!0,glow:!0}),n.chain([[.2,0,0,.22],[.2,1.5,0,.2],[.3,2.6,-.1,.14],[.35,3.3,-.1,.08]],l.TRUNK,{group:4,rough:.015}),ds(n,[.3,3.4,-.1],[1.1,.7,.9],5),Bn(n,[-1.6,.1,.66],[-1,1.3,.7],6,1),Ut(n,14,2.2,7,2)}},"car-on-side":{desc:"a car on its side among ferns",build(n){const e=n.parts.length;so(n,1),Jn(n,e,{roll:Math.PI/2,at:[0,.2,.1]});for(const[t,i]of[[-1.2,.9],[.3,1.1],[1.4,.6],[-.4,-1]])Xa(n,[t,.05,i],5+(t>0?1:0),1.1)}},"trolley-tipped":{desc:"a shopping trolley tipped over, a plant growing in its basket",build(n){const e=n.parts.length;kc(n,1),ds(n,[.05,.65,0],[.32,.28,.26],3),Jn(n,e,{roll:1.35,at:[0,.32,0]}),Ut(n,8,.9,6,3)}},"trolley-nest":{desc:"a shopping trolley standing upright, a bird's nest in its basket",build(n){kc(n,1),n.ell([0,.78,0],[.2,.08,.17],l.STRAW,{group:3,paint:e=>Math.abs(Math.sin(e[0]*40+e[2]*30))<.3?l.BARK2:void 0});for(const e of[-.05,.05])n.ell([e,.84,.02],[.04,.03,.035],l.BELLY,{group:4});Ut(n,8,.9,6,4)}},cone:{desc:"a single traffic cone, faded",build(n){Qr(n,[0,0,0],1)}},cones:{desc:"a little cluster of traffic cones, one fallen",build(n){Qr(n,[0,0,0],1),Qr(n,[.5,0,.2],4);const e=n.parts.length;Qr(n,[0,0,0],7),Jn(n,e,{roll:1.5,yaw:.6,at:[-.4,.2,.4]}),Ut(n,6,.8,10,5)}},"cone-lantern":{desc:"a traffic cone lit from within like a lantern, a ring of mushrooms round it",glow:!0,build(n){Qr(n,[0,0,0],1,!0);for(let e=0;e<9;e++){const t=e/9*6.283,i=[Math.cos(t)*.55,0,Math.sin(t)*.45];n.seg(i,T.add(i,[0,.08,0]),.02,.02,l.CLOTH,{group:5}),n.ell(T.add(i,[0,.1,0]),[.06,.035,.06],l.BODY2,{group:6})}}},"highway-slab":{desc:"a slab of tarmac tilted up out of the ground, faded lane markings, a crash-barrier stub",build(n){const e=n.parts.length;n.box([0,0,0],[2.2,.14,1.3],l.STONE,{round:.03,group:1,rough:.01,paint:t=>_t(t,5,1)<.06||Math.abs(Math.sin(t[0]*3+t[2]*5)*.3+t[2]*.6-.2)<.02?l.STONED:t[1]>.1&&Math.abs(t[2])<.05&&(t[0]+9)*.8%1<.55?_t(t,12)<.3?l.STONE:l.CLOTH:t[1]>.1&&Math.abs(t[2]-1.1)<.04?l.BELLY:t[1]>.1&&_t(t,6,4)<.12?l.MOSS:void 0});for(const t of[-1.6,-.4])Ze(n,[t,.1,1.25],[t,.75,1.25],2,.04);n.box([-1,.62,1.3],[.9,.1,.03],l.FRAME,{group:3,paint:t=>Math.abs(t[1]-.62)<.02?l.STONED:Ct(.5,.1)(t)}),Jn(n,e,{pitch:.38,roll:.08,at:[0,.7,0]}),n.ell([-1.8,.1,0],[.6,.2,1.3],l.BARK2,{group:5,rough:.04,paint:t=>t[1]>.2?l.MOSS:void 0}),Ut(n,16,2.4,6,6)}},"highway-line":{desc:"a section of cracked road, its white line broken, grass in the cracks",build(n){n.box([0,.02,0],[2,.03,1],l.STONE,{round:.02,group:1,paint:e=>_t(e,4,9)<.08||Math.abs(Math.sin(e[0]*2.3)*.4-e[2])<.025?_t(e,20)<.4?l.LEAF2:l.STONED:Math.abs(e[2]+.05)<.05&&(e[0]+9)*.7%1<.6?l.CLOTH:_t(e,6)<.08?l.MOSS:void 0});for(const[e,t]of[[-1.2,.3],[.4,-.2],[1.3,.5]])Ut(n,4,.2,3,e*10+7,e,t)}},"road-sign":{desc:"a fallen road sign, blank but for an abstract arrow",build(n){Ze(n,[-.9,.05,.2],[.6,.1,-.1],1,.03),n.box([.9,.12,-.15],[.62,.05,.46],l.HAT1,{group:2,dir:[1,.25,-.2],round:.02,paint:e=>{const t=e[0]-.9,i=e[2]+.15;return Math.abs(i)<.08&&t>-.36&&t<.2||t>.08&&Math.abs(i)<.28-(t-.08)*.9&&t<.38?l.BELLY:Math.hypot(Math.abs(t)-.56,Math.abs(i)-.4)<.04?l.FRAME:Ct(.2,.1)(e)}}),Ut(n,8,1.2,4,7)}},"phone-box":{desc:"an overgrown phone box, its panes long gone",build(n){n.box([0,1,0],[.42,1,.42],l.ACCENT,{round:.04,group:1,paint:e=>Math.max(Math.abs(e[0]),Math.abs(e[2]))>.38&&e[1]>.5&&e[1]<1.75&&e[1]*5%1>.12&&(Math.abs(e[0])+Math.abs(e[2]))*5%1>.12?l.SHADES:Ct(.3,.15)(e)}),n.box([0,2.08,0],[.46,.09,.46],l.ACCENT,{round:.06,group:2,paint:Ct(.3,.3)}),Bn(n,[.43,0,.3],[.4,1.9,.43],3,8),Bn(n,[-.3,0,.43],[-.1,1.4,.43],4,9),Ut(n,10,.9,5,8)}},lamppost:{desc:"a lamppost bent over, its lamp hanging near the ground",build(n){n.chain([[0,0,0,.06],[0,1.4,0,.05],[.2,2.1,0,.045],[.8,2.2,0,.04],[1.2,1.7,0,.035]],l.FRAME,{group:1,paint:Ct(.4,.05)}),n.box([1.25,1.55,0],[.16,.1,.12],l.FRAME,{round:.04,group:2}),n.ell([1.25,1.45,0],[.12,.06,.1],l.SHADES,{group:2}),Bn(n,[0,0,.06],[.05,1.5,.06],3,10),Ut(n,6,.7,4,9)}},sofa:{desc:"a sofa left in a clearing, moss on its cushions",build(n){const e=t=>_t(t,6,5)<.25&&t[1]>.4?l.MOSS:_t(t,14)>.9?l.STONED:void 0;n.box([0,.3,0],[.9,.2,.4],l.CLOTH,{round:.1,group:1,paint:e}),n.box([-.02,.7,-.32],[.9,.3,.12],l.CLOTH,{round:.1,group:2,paint:e});for(const t of[-.85,.85])n.box([t,.55,0],[.12,.22,.42],l.CLOTH,{round:.1,group:3,paint:e});for(const t of[-.4,.4])n.box([t,.53,.05],[.42,.08,.34],l.CLOTH,{round:.08,group:4,paint:e});Ut(n,14,1.6,5,10)}},"washing-machine":{desc:"a washing machine in the undergrowth, a fern in its drum",build(n){n.box([0,.42,0],[.32,.42,.32],l.BELLY,{round:.05,group:1,paint:e=>e[2]>.28&&Math.hypot(e[0],e[1]-.4)<.2?Math.hypot(e[0],e[1]-.4)<.15?l.SHADES:l.FRAME:Ct(.25,.15)(e)}),Xa(n,[0,.4,.4],2,.55),Ut(n,8,.8,3,11)}},"bike-roots":{desc:"a bicycle tangled in tree roots",build(n){for(const e of[-.45,.45])for(let t=0;t<12;t++){const i=t/12*6.283,r=(t+1)/12*6.283;Ze(n,[e+Math.cos(i)*.3,.32+Math.sin(i)*.3,0],[e+Math.cos(r)*.3,.32+Math.sin(r)*.3,0],1+(e>0?1:0),.018)}for(const[e,t]of[[[-.45,.32,0],[0,.35,0]],[[0,.35,0],[.3,.7,0]],[[-.45,.32,0],[-.15,.72,0]],[[-.15,.72,0],[.3,.7,0]],[[.3,.7,0],[.45,.32,0]],[[0,.35,0],[-.15,.72,0]],[[.3,.7,0],[.35,.85,0]]])Ze(n,e,t,3,.022);n.box([-.17,.76,0],[.1,.03,.04],l.SHADES,{group:4}),Ze(n,[.25,.85,-.15],[.42,.87,.15],4,.018);for(let e=0;e<4;e++)n.chain([[-1+e*.2,0,-.4,.09],[-.3+e*.3,.35+e%2*.2,-.05+e*.05,.07],[.4+e*.2,.1,.3,.05]],l.TRUNK,{group:5+e%2,rough:.01})}},"dish-birdbath":{desc:"a satellite dish fallen face-up, full of rainwater, a bird drinking",build(n){n.ell([0,.2,0],[.6,.22,.6],l.BELLY,{group:1,paint:Ct(.25,.2)}),n.ell([0,.34,0],[.52,.12,.52],l.BELLY,{group:1,cut:!0}),n.ell([0,.28,0],[.48,.02,.48],l.WATER,{group:2}),Ze(n,[0,.25,-.5],[.1,.8,-.6],3,.03);const e=[.5,.45,.3];n.ell(e,[.12,.07,.06],l.BODY3,{group:4,dir:[1,.3,0]}),n.ell(T.add(e,[.1,.07,0]),[.05,.05,.045],l.BODY3,{group:4}),n.seg(T.add(e,[.14,.07,0]),T.add(e,[.2,.04,0]),.012,.004,l.ACCENT,{group:4}),Ut(n,8,1,5,12)}},"fridge-fireflies":{desc:"a fridge standing in the woods, its door ajar, fireflies inside",glow:!0,build(n){n.box([0,.85,0],[.36,.85,.32],l.BELLY,{round:.05,group:1,paint:e=>e[2]>.28&&Math.abs(e[0])<.3&&e[1]<1.55&&e[1]>.1?l.SHADES:Ct(.25,.2)(e)}),n.box([.5,.85,.4],[.03,.78,.3],l.BELLY,{dir:[.5,0,1],round:.03,group:2,paint:Ct(.25,.15)});for(let e=0;e<7;e++)Or(n,[(Ot(e)-.5)*.4,.4+Ot(e,2)*1,.2+Ot(e,3)*.3],.03,10+e,e%2?l.MAGIC:l.MAGIC2);Bn(n,[-.36,0,.3],[-.3,1.6,.33],3,13)}}};function kc(n,e){const t=[[-.35,.45,-.25],[.35,.45,-.25],[.35,.45,.25],[-.35,.45,.25],[-.3,.9,-.28],[.4,.9,-.28],[.4,.9,.28],[-.3,.9,.28]];for(const[i,r]of[[0,1],[1,2],[2,3],[3,0],[4,5],[5,6],[6,7],[7,4],[0,4],[1,5],[2,6],[3,7]])Ze(n,t[i],t[r],e,.015);for(let i=1;i<6;i++){const r=i/6;Ze(n,T.lerp(t[0],t[1],r),T.lerp(t[4],t[5],r),e,.008),Ze(n,T.lerp(t[3],t[2],r),T.lerp(t[7],t[6],r),e,.008)}Ze(n,t[4],[-.45,.95,-.28],e,.015),Ze(n,t[7],[-.45,.95,.28],e,.015),Ze(n,[-.45,.95,-.28],[-.45,.95,.28],e,.025,l.ACCENT);for(const[i,r]of[[-.3,-.22],[.3,-.22],[-.3,.22],[.3,.22]])Ze(n,[i,.45,r],[i,.08,r],e,.012),n.ell([i,.06,r],[.05,.05,.02],l.BODY3,{group:e+1})}function Qr(n,e,t,i=!1){n.box(T.add(e,[0,.03,0]),[.24,.03,.24],l.ACCENT,{round:.02,group:t,paint:Ct(.15,.2)}),n.seg(T.add(e,[0,.05,0]),T.add(e,[0,.72,0]),.2,.03,l.ACCENT,{group:t+1,paint:r=>Math.abs(r[1]-e[1]-.42)<.07?i?l.MAGIC2:l.CLOTH:i&&_t(r,18)<.2?l.GLOW:Ct(.15,.1)(r)}),i&&Or(n,T.add(e,[0,.78,0]),.05,t+2,l.MAGIC2)}const Y_={swings:{desc:"a rusty swing set, one swing hanging, one chain broken; the hanging one sways on its own with a faint sparkle",glow:!0,split:1.6,build(n){for(const e of[-1.1,1.1])for(const t of[-.5,.5])Ze(n,[e,0,t],[e*.95,2.1,0],1,.045);Ze(n,[-1.1,2.1,0],[1.1,2.1,0],2,.05);for(const e of[-.12,.12])Ze(n,[-.5,2.08,e],[-.42,.55,e*1.2],3,.012);n.box([-.42,.52,0],[.2,.025,.14],l.BODY3,{round:.02,group:3,dir:[1,-.15,0]});for(let e=0;e<5;e++)Or(n,[-.42+(Ot(e)-.5)*.5,.6+Ot(e,2)*.7,(Ot(e,3)-.5)*.3],.025,10+e);Ze(n,[.5,2.08,-.12],[.5,1.3,-.12],4,.012),Ze(n,[.5,2.08,.12],[.58,.9,.2],4,.012),n.box([.7,.04,.3],[.2,.025,.14],l.BODY3,{round:.02,group:5,dir:[1,0,.5]}),Bn(n,[1.1,0,.5],[1.05,1.6,.25],6,14),Ut(n,14,1.8,7,15)}},slide:{desc:"a slide half-swallowed by brambles, a sapling at its foot",split:1.6,build(n){for(const e of[-.95,-.55])for(const t of[-.3,.3])Ze(n,[e,0,t],[e,1.5,t],1,.035);for(let e=1;e<6;e++)Ze(n,[-.95,e*.27,-.3],[-.95,e*.27,.3],1,.02);n.box([-.75,1.5,0],[.25,.04,.32],l.FRAME,{group:2,paint:Ct(.4,.1)}),n.box([.35,.78,0],[.95,.03,.26],l.HAT1,{dir:[1,-.75,0],round:.02,group:3,paint:e=>Math.abs(e[2])>.22?l.FRAME:Ct(.35,.15)(e)});for(let e=0;e<10;e++){const t=Ot(e,3)*6.283;n.chain([[.4+Math.cos(t)*.9,0,Math.sin(t)*.6,.03],[.3+Math.cos(t)*.4,.5+Ot(e)*.5,Math.sin(t)*.3,.025],[.1+Ot(e,4)*.6,.7+Ot(e,5)*.4,(Ot(e,6)-.5)*.4,.015]],l.BARKD,{group:5+e%2}),e%3===0&&n.ell([.3+Ot(e,7)*.6,.5+Ot(e,8)*.4,(Ot(e,9)-.5)*.5],[.2,.14,.16],l.LEAF,{group:7,rough:.03,paint:i=>_t(i,30)<.1?l.ACCENT:void 0})}n.seg([1.45,0,.2],[1.45,1.2,.2],.03,.02,l.TRUNK,{group:8}),ds(n,[1.45,1.3,.2],[.25,.2,.22],9)}},roundabout:{desc:"a roundabout tilted in the moss",build(n){const e=n.parts.length;n.ell([0,.2,0],[.9,.05,.9],l.HAT2,{group:1,paint:t=>Math.abs(Math.sin(Math.atan2(t[2],t[0])*3))<.08?l.FRAME:Ct(.35,.2)(t)});for(let t=0;t<3;t++){const i=t/3*6.283;Ze(n,[Math.cos(i)*.7,.25,Math.sin(i)*.7],[Math.cos(i)*.7,.6,Math.sin(i)*.7],2,.025),Ze(n,[Math.cos(i)*.7,.6,Math.sin(i)*.7],[Math.cos(i)*.1,.6,Math.sin(i)*.1],2,.02)}Jn(n,e,{pitch:.18,roll:.1,at:[0,.05,0]}),n.ell([0,.05,0],[1.1,.08,1],l.MOSS,{group:4}),Ut(n,10,1.3,5,16)}},seesaw:{desc:"a seesaw stuck at an angle",build(n){n.box([0,.2,0],[.08,.2,.14],l.FRAME,{round:.02,group:1,paint:Ct(.4,.1)});const e=n.parts.length;n.box([0,0,0],[1.3,.035,.12],l.WOOD,{round:.02,group:2,paint:t=>_t(t,8)<.2?l.MOSS:void 0});for(const t of[-1.05,1.05])Ze(n,[t,.03,-.12],[t,.03,.12],3,.02);Jn(n,e,{pitch:.32,at:[0,.42,0]}),Ut(n,10,1.4,5,17)}},"climbing-frame":{desc:"a climbing frame, a dome of bars wound with ivy",split:1.4,build(n){const t=(i,r)=>{const a=i/8*6.283,s=r/4*Math.PI/2;return[Math.cos(a)*Math.cos(s)*1,Math.sin(s)*1*1.5,Math.sin(a)*Math.cos(s)*1]};for(let i=0;i<8;i++)for(let r=0;r<4;r++)Ze(n,t(i,r),t(i,r+1),1,.025),Ze(n,t(i,r),t(i+1,r),1,.025);for(let i=0;i<3;i++)Bn(n,t(i*3,0),t(i*3+1,3),3+i,18+i);Ut(n,12,1.4,6,18)}},"spring-rider":{desc:"a spring rider animal, its paint faded (a generic animal, no characters)",build(n){for(let e=0;e<6;e++)n.seg([Math.cos(e*2)*.06,e*.07,Math.sin(e*2)*.06],[Math.cos(e*2+2)*.06,(e+1)*.07,Math.sin(e*2+2)*.06],.022,.022,l.FRAME,{group:1});n.ell([0,.55,0],[.35,.16,.14],l.BODY,{group:2,paint:Ct(.4,.2)}),n.ell([.32,.72,0],[.12,.11,.1],l.BODY,{group:2,paint:Ct(.4,.2)});for(const e of[-.05,.05])n.ell([.28,.85,e],[.03,.06,.02],l.BODY,{group:3});n.ell([.43,.74,.06],[.015,.015,.015],l.SHADES,{group:3}),Ze(n,[.25,.68,-.12],[.25,.68,.12],4,.015),n.box([0,.02,0],[.25,.02,.25],l.STONE,{group:5}),Ut(n,8,.8,6,19)}}};function X_(n,e,t,i,r,a=1){n.box([0,.015,0],[e,.015,t],i,{round:.01,group:a,paint:s=>_t(s,3,4)<.05||Math.abs(Math.sin(s[0]*1.3+1)*.5+Math.sin(s[0]*4.1)*.08-s[2]*.3)<.012?_t(s,18)<.5?l.LEAF2:l.STONED:r(s[0],s[2])?_t(s,10,2)<.25?i:l.CLOTH:_t(s,5,7)<.07?l.MOSS:void 0})}const Un=(n,e,t=.045)=>Math.abs(n-e)<t,K_={"tennis-court":{desc:"a cracked tennis court, faded lines, grass through the cracks",decal:!0,build(n){X_(n,4.4+.5,2+.5,l.HAT2,(i,r)=>Math.abs(i)<=4.4+.05&&Math.abs(r)<=2+.05&&(Un(Math.abs(i),4.4)||Un(Math.abs(r),2)||Un(Math.abs(r),2*.75)||Math.abs(i)<4.4*.54&&(Un(r,0)||Un(Math.abs(i),4.4*.54))))}},"tennis-net":{desc:"a sagging tennis net between its posts",build(n){for(const e of[-2.2,2.2])Ze(n,[0,0,e],[0,.55,e],1,.035);n.box([0,.38,0],[.01,.17,2.15],l.CLOTH,{group:2,paint:e=>e[1]>.5?l.CLOTH:e[1]*25%1<.25||(e[2]+5)*25%1<.25?l.SHADES:void 0}),n.box([0,.25,0],[.012,.15,1],l.SHADES,{group:2,cut:!0})}},"umpire-chair":{desc:"a tennis umpire's chair leaning over",split:1.4,build(n){const e=n.parts.length;for(const t of[-.25,.25])for(const i of[-.2,.2])Ze(n,[t*1.4,0,i*1.4],[t,1.5,i],1,.03);for(let t=1;t<5;t++)Ze(n,[-.3,t*.3,-.22],[-.3,t*.3,.22],1,.02);n.box([0,1.55,0],[.28,.04,.25],l.WOOD,{group:2}),n.box([-.26,1.8,0],[.03,.25,.25],l.WOOD,{group:2}),Jn(n,e,{roll:.25,pitch:-.1}),Ut(n,8,1,4,20)}},"court-fence":{desc:"a chain-link fence section, ivy through it, a gap torn in it",build(n){for(const e of[-1.5,0,1.5])Ze(n,[e,0,0],[e,1.7,0],1,.03);Ze(n,[-1.5,1.7,0],[1.5,1.7,0],1,.025),n.box([0,.85,0],[1.5,.85,.008],l.FRAME,{group:2,paint:e=>(e[0]+e[1]+9)*9%1<.2||(e[0]-e[1]+9)*9%1<.2?_t(e,5)<.15?l.BODY2:l.FRAME:l.SHADES}),n.ell([.7,.5,0],[.4,.5,.05],l.SHADES,{group:2,cut:!0,rough:.08});for(let e=0;e<3;e++)Bn(n,[-1.3+e*.6,0,.03],[-1.1+e*.5,1.5,.03],3+e,21+e)}},"tennis-balls":{desc:"a few old tennis balls glowing faintly in the grass",glow:!0,build(n){for(let e=0;e<4;e++)Or(n,[(Ot(e)-.5)*1.2,.06,(Ot(e,2)-.5)*.8],.06,1+e,e%2?l.MAGIC:l.MAGIC2);n.ell([0,.004,0],[.8,.004,.5],l.LEAF3,{group:9}),Ut(n,8,.8,5,22)}},"baseball-diamond":{desc:"a baseball diamond: the worn dirt infield, grown-over bases, a pitcher's mound",decal:!0,build(n){n.box([0,.015,0],[2.2*1.6,.015,2.2*1.2],l.LEAF2,{group:1,round:.01,paint:t=>{const i=Math.abs(t[0])/2.2+Math.abs(t[2])/1.6500000000000001;return i<1.08&&i>.78?_t(t,8)<.2?l.LEAF2:l.BARK2:i<=.78?_t(t,6)<.15?l.MOSS:void 0:_t(t,6,3)<.3?l.LEAF:void 0}});for(const[t,i]of[[2.2,0],[0,2.2*.75],[-2.2,0],[0,-2.2*.75]])n.box([t*.93,.04,i*.93],[.12,.02,.1],l.BELLY,{group:2,round:.02,paint:r=>_t(r,20)<.3?l.LEAF2:void 0});n.ell([0,.02,0],[.35,.08,.28],l.BARK2,{group:3})}},backstop:{desc:"a baseball backstop fence, a dugout bench beside it",build(n){for(let e=0;e<=4;e++){const t=-.8+e*.4;Ze(n,[-Math.cos(t)*.8,0,Math.sin(t)*1.4],[-Math.cos(t)*.8,1.8,Math.sin(t)*1.4],1,.03)}for(let e=0;e<4;e++){const t=-.8+e*.4,i=t+.4,r=[-Math.cos(t)*.8,.9,Math.sin(t)*1.4],a=[-Math.cos(i)*.8,.9,Math.sin(i)*1.4],s=T.lerp(r,a,.5);n.box(s,[Math.hypot(a[0]-r[0],a[2]-r[2])/2,.9,.008],l.FRAME,{dir:T.sub(a,r),group:2,paint:o=>(o[1]+o[0]*2+9)*9%1<.2?_t(o,5)<.2?l.BODY2:l.FRAME:l.SHADES})}n.box([-.6,.3,2],[.15,.04,.7],l.WOOD,{group:3});for(const e of[1.4,2.6])n.box([-.6,.14,e],[.12,.14,.04],l.WOOD,{group:3});Bn(n,[-.75,0,-.5],[-.7,1.6,-.4],4,25)}},scoreboard:{desc:"a scoreboard frame, panels missing (no text)",split:1.8,build(n){for(const e of[-1,1])Ze(n,[e,0,0],[e,2.6,0],1,.05);for(let e=0;e<3;e++)for(let t=0;t<5;t++)Ot(e,t)>.3&&n.box([-.8+t*.4,1.6+e*.32,0],[.18,.14,.03],l.HAT1,{group:2+e,round:.01,paint:Ct(.3,.1)});n.box([0,2.62,0],[1.1,.05,.06],l.FRAME,{group:5}),Bn(n,[-1,0,.06],[-.95,2.3,.06],6,26)}},"football-pitch":{desc:"a football pitch: faded lines, a centre circle, mown stripes long grown out",decal:!0,build(n){n.box([0,.015,0],[5.2+.5,.015,3.3+.5],l.LEAF2,{group:1,round:.01,paint:i=>{const r=i[0],a=i[2];return Math.abs(r)<=5.2+.05&&Math.abs(a)<=3.3+.05&&(Un(Math.abs(r),5.2,.06)||Un(Math.abs(a),3.3,.06)||Un(r,0,.06)||Un(Math.hypot(r,a*1),1,.06)||Math.abs(r)>5.2-1&&Math.abs(a)<1.6&&(Un(Math.abs(r),5.2-1,.06)||Un(Math.abs(a),1.6,.06)))?_t(i,8,2)<.3?l.LEAF2:l.CLOTH:Math.floor((r+20)*.8)%2?_t(i,6)<.25?l.LEAF2:l.LEAF:_t(i,5,9)<.1?l.LEAF3:void 0}})}},goal:{desc:"a football goal, its net torn, a sapling grown through it",split:1.1,build(n){zc(n,1),n.seg([.3,0,.2],[.3,1.5,.2],.035,.025,l.TRUNK,{group:5}),ds(n,[.3,1.6,.2],[.35,.25,.3],6),Ut(n,8,1.2,7,27)}},"goal-tipped":{desc:"a football goal tipped on its back",build(n){const e=n.parts.length;zc(n,1),Jn(n,e,{pitch:-Math.PI/2+.12,at:[-.5,.06,0]}),Ut(n,8,1.2,7,28)}},"corner-flag":{desc:"a corner flag, its flag a faded rag",build(n){Ze(n,[0,0,0],[0,.9,0],1,.015),n.box([.12,.8,0],[.12,.08,.006],l.ACCENT,{group:2,dir:[1,-.3,.1],paint:Ct(.2,0)}),Ut(n,5,.4,3,29)}},floodlight:{desc:"a floodlight pylon, one lamp still flickering with fairy light",glow:!0,split:2.4,build(n){for(const[t,i]of[[-.25,-.25],[.25,-.25],[.25,.25],[-.25,.25]])Ze(n,[t*1.6,0,i*1.6],[t*.5,4,i*.5],1,.035);for(let t=1;t<8;t++){const i=t*4/8,r=1.6-1.1*i/4;Ze(n,[-.25*r,i,-.25*r],[.25*r,i+4/8,.25*r],2,.015),Ze(n,[.25*r,i,-.25*r],[-.25*r,i+4/8,.25*r],2,.015)}for(let t=0;t<2;t++)for(let i=0;i<3;i++)n.box([-.3+i*.3,4+.2+t*.25,.1],[.12,.1,.06],l.FRAME,{group:3,round:.02,paint:r=>r[2]>.14?t===1&&i===1?l.MAGIC2:l.SHADES:Ct(.4,.1)(r)});Or(n,[0,4+.45,.22],.06,4,l.MAGIC2),Bn(n,[-.4,0,.4],[-.2,2.4,.2],5,30)}},"basketball-hoop":{desc:"a basketball hoop on a leaning post, its net gone",split:1.8,build(n){const e=n.parts.length;Ze(n,[0,0,0],[0,2.4,0],1,.05),n.box([.15,2.5,0],[.03,.3,.45],l.BELLY,{group:2,paint:t=>Math.abs(t[1]-2.4)<.1&&Math.abs(t[2])<.14&&Math.abs(Math.abs(t[2])-.12)<.02?l.ACCENT:Ct(.25,.1)(t)});for(let t=0;t<8;t++){const i=t/8*6.283,r=(t+1)/8*6.283;Ze(n,[.36+Math.cos(i)*.17,2.32,Math.sin(i)*.17],[.36+Math.cos(r)*.17,2.32,Math.sin(r)*.17],3,.012,l.ACCENT)}Jn(n,e,{pitch:-.2}),Ut(n,8,1,5,31)}}};function zc(n,e){for(const t of[-1.4,1.4])Ze(n,[0,0,t],[0,1,t],e,.035,l.BELLY);Ze(n,[0,1,-1.4],[0,1,1.4],e,.035,l.BELLY);for(const t of[-1.4,1.4])Ze(n,[0,1,t],[-.6,0,t],e+1,.02,l.BELLY);n.box([-.3,.5,0],[.012,.55,1.38],l.CLOTH,{dir:[.6,1,0],group:e+2,paint:t=>t[1]*12%1<.3||(t[2]+5)*12%1<.3?l.CLOTH:l.SHADES}),n.ell([-.3,.4,.5],[.2,.3,.4],l.CLOTH,{group:e+2,cut:!0})}const q_=[...Object.entries(W_).map(([n,e])=>({id:n,family:"modern",size:1,split:null,...e})),...Object.entries(Y_).map(([n,e])=>({id:n,family:"playground",size:1.1,split:null,...e})),...Object.entries(K_).map(([n,e])=>({id:n,family:"sports",size:1.1,split:null,...e}))];Object.fromEntries(q_.map(n=>[n.id,n]));const Nt=(n,e=0)=>{const t=Math.sin(n*127.1+e*311.7)*43758.5453;return t-Math.floor(t)},zn=(n,e,t=0)=>Nt(Math.floor(n[0]*e)+Math.floor(n[2]*e)*57+t,Math.floor(n[1]*e)),el=n=>{const e=zn(n,12);return e<.14?l.BARKD:e>.88?l.BARKL:void 0},Z_=n=>e=>{const t=zn(e,10,3);return e[1]<n[1]-.2||t<.2?l.LEAF3:t>.8?l.LEAF2:void 0},rn=(n,e=0)=>t=>{const i=zn(t,9,7);return t[1]>.05&&i<(n?.34:.12)&&zn(t,3,1)<(n?.75:.45)?l.MOSS:e&&(t[1]*e%1<.1||((t[0]+t[2])*e*.7+Math.floor(t[1]*e)*.5)%1<.07)||i>.93?l.STONED:void 0},ot=(n,e,t,i,r,a={})=>n.box(e,t,l.STONE,{round:.03,rough:.012,group:i,paint:rn(r,a.courses??5),...a}),pn=(n,e,t,i,r)=>{const a=[];for(let s=0;s<=4;s++){const o=s/4;a.push([...T.add(T.lerp(e,t,o),[(Nt(r,s)-.5)*.15,0,.02]),.03])}n.chain(a,l.LEAF,{group:i,rough:.02,paint:s=>zn(s,30)<.3?l.LEAF2:void 0})},mi=(n,e,t,i,r)=>{for(let a=0;a<e;a++){const s=Nt(r,a)*6.283,o=t*Math.sqrt(Nt(a,r)),c=Math.cos(s)*o,u=Math.sin(s)*o*.7;n.ell([c,.08,u],[.07,.1+Nt(a,4)*.08,.07],l.LEAF2,{group:i+a%3,paint:h=>h[1]>.14?l.LEAF:void 0})}},qn=(n,e,t,i)=>n.ell(e,t,l.LEAF,{group:i,rough:.04,paint:Z_(e)}),Mn=(n,e,t)=>n.chain(e,l.TRUNK,{group:t,rough:.012,paint:el}),mn=(n,e,t,i,r={})=>n.ell(e,t,l.STONE,{group:i,rough:.03,dir:r.dir,paint:a=>a[1]>e[1]+t[1]*(r.moss??.62)&&zn(a,5,i)<.7?l.MOSS:zn(a,14)>.9?l.STONED:void 0}),Hc=(n,e,t,i,r=l.MAGIC)=>n.ell(e,[t,t,t],r,{group:i,extra:!0}),$_={"broken-arch":{desc:"a broken arch, one side fallen, a rune on its keystone",glow:!0,split:null,build(n,e){for(const t of[-1,1])ot(n,[t,t<0?1:.7,0],[.22,t<0?1:.7,.25],1+(t>0?1:0),e);for(let t=0;t<=6;t++){const i=Math.PI*(1-t/9),r=[Math.cos(i)*1,2+Math.sin(i)*.7,0];ot(n,r,[.17,.14,.25],3+t%2,e,{dir:[-Math.sin(i),Math.cos(i),0],courses:0,paint:t===4?(a=>Math.abs(a[0]-r[0])<.05&&Math.abs(a[1]-r[1])<.08?l.RUNE:rn(e)(a)):rn(e)})}for(let t=0;t<4;t++)ot(n,[1.3+t*.3,.14,.4+Nt(t)*.5],[.17,.13,.22],6+t,e,{dir:[1,.3*(Nt(t,2)-.5),Nt(t,3)-.5],courses:0});e&&(pn(n,[-1.15,.1,.26],[-.9,1.9,.26],12,1),mi(n,14,1.8,14,2))}},"tower-stump":{desc:"a fallen tower's stump, a spiral stair climbing round its inside",split:2,build(n,e){for(let t=0;t<14;t++){const i=t/14*Math.PI*2,r=1+(Math.sin(i*2+1)*.5+.5)*1.6*(i>3.6&&i<5.4?1:.55);i>.9&&i<2||ot(n,[Math.cos(i)*1.05,r/2,Math.sin(i)*.95],[.25,r/2,.14],1+t%3,e,{dir:[-Math.sin(i),0,Math.cos(i)]})}for(let t=0;t<9;t++){const i=3.2+t*.42,r=.15+t*.26;ot(n,[Math.cos(i)*.7,r,Math.sin(i)*.6],[.24,.06,.12],5,e,{dir:[Math.cos(i),0,Math.sin(i)],courses:0})}for(let t=0;t<3;t++)ot(n,[.6+t*.35,.14,1.1],[.22,.13,.2],7,e,{dir:[1,0,.4*t],courses:0});e&&(pn(n,[-1.05,.1,-.4],[-1,2.3,-.5],10,3),pn(n,[.9,.1,-.6],[.95,1.7,-.55],11,4),n.ell([0,.2,0],[.55,.2,.5],l.LEAF,{group:12,rough:.04}))}},colonnade:{desc:"a colonnade, two columns standing and the rest toppled",split:null,build(n,e){ot(n,[0,.08,0],[2.2,.08,.55],1,e,{courses:0});for(const[t,i]of[[-1.7,1.9],[-.6,1.4]])n.seg([t,.16,0],[t,i,0],.18,.17,l.STONE,{group:2,rough:.01,paint:r=>Math.abs(Math.sin(Math.atan2(r[2],r[0]-t)*8))<.15?l.STONED:rn(e,0)(r)}),ot(n,[t,i+.07,0],[.26,.07,.26],3,e,{courses:0});for(const[t,i,r]of[[.6,.55,.3],[1.6,.4,-.4]])n.seg([t-Math.cos(r)*.7,.2,i-Math.sin(r)*.7],[t+Math.cos(r)*.7,.2,i+Math.sin(r)*.7],.18,.18,l.STONE,{group:4,paint:rn(e,0)});ot(n,[-1.15,2,0],[.75,.1,.28],5,e,{courses:0}),e&&(pn(n,[-1.7,.2,.18],[-1.65,1.8,.18],8,5),mi(n,16,2.2,10,6))}},"stone-ring":{desc:"a ring of standing-stone stubs",split:null,build(n,e){for(let t=0;t<9;t++){const i=t/9*Math.PI*2,r=.3+Nt(t,9)*(t%3===0?1.2:.45);ot(n,[Math.cos(i)*1.7,r/2,Math.sin(i)*1.35],[.2,r/2,.14],1+t%4,e,{dir:[-Math.sin(i),.1*(Nt(t)-.5),Math.cos(i)],courses:0,round:.07})}ot(n,[0,.1,0],[.55,.1,.35],6,e,{courses:0,round:.05}),e&&mi(n,20,2,10,7)}},"chapel-wall":{desc:"a ruined chapel wall with an empty pointed window, moonlight caught in it",glow:!0,split:2.4,build(n,e){ot(n,[0,1.4,0],[1.4,1.4,.18],1,e,{paint:t=>{const i=t[0],r=t[1];return Math.abs(i)<.38&&r>1.1&&r<2.3-Math.abs(i)*.5?void 0:rn(e,5)(t)}}),n.box([0,1.6,0],[.33,.55,.3],l.NOSE,{group:1,cut:!0}),n.ell([0,1.5,-.05],[.3,.5,.02],l.MAGIC2,{group:2,extra:!0,paint:t=>zn(t,18)<.5?l.MAGIC:void 0});for(const[t,i]of[[-1.55,2.6],[1.5,1.6]])ot(n,[t,i/2,0],[.22,i/2,.26],3,e);for(let t=0;t<5;t++)ot(n,[-1.2+t*.6,.12,.55+Nt(t)*.3],[.18,.12,.16],4,e,{courses:0,dir:[1,0,Nt(t,5)-.5]});e&&(pn(n,[-1.2,.1,.2],[-.6,2.6,.2],6,8),pn(n,[1,.1,.2],[1.2,2,.2],7,9))}},well:{desc:"an old well with a broken winch, fireflies over the water",glow:!0,split:null,build(n,e){for(let t=0;t<12;t++){const i=t/12*Math.PI*2;ot(n,[Math.cos(i)*.55,.32,Math.sin(i)*.5],[.15,.32,.1],1+t%2,e,{dir:[-Math.sin(i),0,Math.cos(i)],courses:3})}n.ell([0,.55,0],[.42,.02,.38],l.WATER,{group:3});for(const t of[-.6,.6])n.box([t,1,0],[.06,.5,.06],l.WOOD,{group:4,round:.02});n.seg([-.6,1.4,0],[.1,1.25,.05],.04,.04,l.WOOD,{group:5}),n.seg([.1,1.25,.05],[0,.85,.1],.01,.01,l.STRAW,{group:5});for(let t=0;t<4;t++)Hc(n,[(Nt(t)-.5)*.8,.8+Nt(t,2)*.7,(Nt(t,3)-.5)*.6],.03,10+t,t%2?l.MAGIC:l.MAGIC2);e&&(pn(n,[-.55,.05,.5],[-.4,.62,.5],15,10),mi(n,10,1,16,11))}},watchtower:{desc:"a crumbled watchtower, tall enough to see from the treetops",split:2.6,build(n,e){ot(n,[0,1.2,0],[.7,1.2,.7],1,e,{paint:t=>Math.abs(t[1]-1.9)<.16&&Math.abs(t[0])<.07&&t[2]>.6?l.NOSE:rn(e,5)(t)});for(const[t,i,r]of[[-.5,-.5,1.3],[0,-.5,1],[.5,-.5,.7],[-.5,0,.9],[-.5,.5,.5],[.5,0,.3]])ot(n,[t,2.4+r/2,i],[.2,r/2,.2],1,e);n.box([0,.55,.7],[.25,.45,.1],l.NOSE,{group:1,cut:!0});for(let t=0;t<6;t++)ot(n,[.5+Nt(t)*1.2,.13,-.3+Nt(t,4)*1.2],[.17,.12,.15],2+t%2,e,{courses:0,dir:[1,0,Nt(t,5)-.5]});e&&(pn(n,[-.7,.1,.3],[-.7,2.4,.2],4,12),pn(n,[.3,.1,.72],[.5,1.8,.72],5,13),qn(n,[.1,2.6,-.2],[.45,.3,.4],6))}},"sunken-stair":{desc:"a stairway going down into the ground, a dark doorway at its foot",split:null,build(n,e){for(const t of[-.6,.6])ot(n,[0,.2,t],[1.1,.2,.12],1,e,{courses:2});for(let t=0;t<5;t++)ot(n,[.8-t*.32,.3-t*.07,0],[.16,.04,.5],2,e,{courses:0});n.box([-.55,.08,0],[.28,.1,.48],l.NOSE,{group:3}),ot(n,[-1.1,.55,0],[.15,.55,.62],4,e),ot(n,[-1.05,1.15,0],[.2,.1,.7],5,e,{courses:0}),e&&(mi(n,12,1.6,10,14),pn(n,[-1,1.2,.5],[-.9,.3,.62],13,15))}},"statue-head":{desc:"a toppled giant statue head, its eyes still faintly lit",glow:!0,split:null,build(n,e){const t=[0,.8,0],i=.62,r=(a,s)=>[t[0]+s,t[1]+a,t[2]+i];n.ell(t,[.8,1,.7],l.STONE,{group:1,rough:.012,dir:[1,.25,0],paint:rn(e,0)}),n.ell(r(.3,0),[.62,.14,.16],l.STONE,{group:2,paint:rn(e,0)});for(const a of[-.26,.26])n.ell(r(.12,a),[.15,.09,.1],l.STONED,{group:1,cut:!0}),Hc(n,r(.12,a),.05,3+(a>0?1:0),l.MAGIC);n.ell(r(-.08,0),[.11,.24,.14],l.STONE,{group:5,paint:rn(e,0)}),n.ell(r(-.42,0),[.3,.07,.08],l.STONE,{group:6,paint:a=>Math.abs(a[1]-(t[1]-.42))<.015?l.STONED:rn(e,0)(a)});for(const[a,s]of[[-.55,.75],[0,.95],[.5,.8],[-.7,.3],[.75,.3]])n.ell([t[0]+a,t[1]+s,t[2]-.2],[.3,.25,.45],l.STONE,{group:7,rough:.02,paint:rn(e,0)});n.ell([t[0],.05,t[2]+.2],[1,.1,.8],l.STONE,{group:8,paint:rn(e,0)}),e&&(mi(n,14,1.8,10,16),qn(n,T.add(t,[-.2,.95,-.2]),[.5,.25,.45],6))}},hearth:{desc:"a collapsed cottage: its hearth and chimney still standing",split:2.6,build(n,e){ot(n,[0,1.6,-.2],[.45,1.6,.35],1,e),n.box([0,.45,.1],[.3,.3,.3],l.NOSE,{group:1,cut:!0});for(const[t,i,r,a,s]of[[-1.1,.4,.9,.5,0],[1,.5,.7,.35,0],[-1.9,-.2,.12,.35,1]])ot(n,[t,a/2,i],s?[.12,a/2,.7]:[r,a/2,.12],2,e);for(let t=0;t<4;t++)n.seg([-.5+t*.4,.08,.9],[.2+t*.5,.3,.3+t*.1],.05,.05,l.BARKD,{group:3});e&&(pn(n,[-.4,.1,.16],[-.3,2.8,.16],5,17),mi(n,14,1.8,10,18))}},"bridge-span":{desc:"an old bridge span going nowhere, one arch over nothing",split:null,build(n,e){ot(n,[-.9,.7,0],[.35,.7,.5],1,e),ot(n,[.95,.55,0],[.3,.55,.5],2,e);for(let t=0;t<=8;t++){const i=t/8,r=Math.PI*(1-i),a=[Math.cos(r)*.85,.9+Math.sin(r)*.55,0];ot(n,a,[.14,.12,.5],3+t%2,e,{dir:[-Math.sin(r),Math.cos(r),0],courses:0})}ot(n,[-.1,1.62,0],[1.25,.1,.55],5,e,{courses:0,dir:[1,-.08,0]});for(const t of[-.5,.5])ot(n,[-.2,1.85,t],[1,.14,.06],6,e,{courses:0});e&&(pn(n,[-1.2,.1,.5],[-1,1.6,.55],8,19),mi(n,10,1.6,10,20))}},gateway:{desc:"an overgrown gateway, two posts and a rusted gate, a rune glowing on one post",glow:!0,split:null,build(n,e){for(const t of[-.9,.9])ot(n,[t,.9,0],[.22,.9,.22],1+(t>0?1:0),e,{paint:t<0?(i=>i[2]>.2&&Math.abs(i[1]-1.1)<.14&&Math.abs(i[0]-t)<.06?l.RUNE:rn(e,5)(i)):rn(e,5)}),n.ell([t,1.9,0],[.18,.14,.18],l.STONE,{group:3,paint:rn(e,0)});for(let t=0;t<6;t++)n.seg([-.65+t*.12,.1,.1+t*.06],[-.65+t*.12,1.2,.1+t*.06],.015,.015,l.SHADES,{group:4});for(const t of[.25,1.1])n.seg([-.65,t,.1],[-.05,t,.4],.018,.018,l.SHADES,{group:4});for(const t of[-1,1])for(let i=0;i<3;i++)ot(n,[t*(1.3+i*.35),.3-i*.08,0],[.17,.3-i*.08,.14],5,e);e&&(pn(n,[.75,.05,.22],[.85,1.9,.22],7,21),pn(n,[-.9,1.8,.22],[-.3,1,.3],8,22),mi(n,12,1.6,10,23))}}},J_={pebbles:{desc:"a cluster of fist-sized stones",build(n){for(let e=0;e<7;e++)mn(n,[(Nt(e)-.5)*.6,.04,(Nt(e,2)-.5)*.4],[.07+Nt(e,3)*.05,.05,.07],1+e,{moss:.8})}},pair:{desc:"two small rocks",build(n){mn(n,[-.15,.12,0],[.22,.15,.2],1),mn(n,[.2,.08,.12],[.14,.1,.13],2)}},rock:{desc:"a knee-high rock",build(n){mn(n,[0,.22,0],[.45,.3,.38],1,{dir:[1,.15,.2]})}},split:{desc:"a rock split in two, a seedling in the crack",build(n){mn(n,[-.28,.35,0],[.3,.45,.45],1,{dir:[1,.3,0]}),mn(n,[.3,.33,0],[.3,.42,.45],2,{dir:[1,-.3,0]}),n.seg([.02,.2,.1],[0,.6,.1],.015,.01,l.TRUNK,{group:3}),qn(n,[0,.62,.1],[.1,.07,.1],4)}},boulder:{desc:"a big boulder",build(n){mn(n,[0,.55,0],[.85,.75,.7],1,{dir:[1,.1,.3]}),mn(n,[.7,.15,.5],[.22,.15,.2],2)}},"great-boulder":{desc:"a great mossy boulder, a landmark",build(n){mn(n,[0,.9,0],[1.4,1.15,1.1],1,{dir:[1,.2,.1],moss:.2}),mn(n,[-1.1,.3,.6],[.4,.35,.35],2),mn(n,[1.2,.2,.5],[.3,.22,.28],3)}},slab:{desc:"a flat slab of rock",build(n){n.box([0,.12,0],[1,.12,.7],l.STONE,{round:.08,rough:.02,group:1,dir:[1,.04,.2],paint:e=>e[1]>.2&&zn(e,6)<.3?l.MOSS:zn(e,14)>.9?l.STONED:void 0})}},"standing-rock":{desc:"a tall natural standing rock",build(n){mn(n,[0,.8,0],[.35,.85,.3],1,{moss:.8}),mn(n,[.35,.1,.25],[.15,.1,.14],2)}}},Q_={"spiral-tree":{desc:"a tree whose trunk twists in a spiral",split:2.4,build(n){const e=[];for(let t=0;t<=10;t++){const i=t/10,r=i*Math.PI*4;e.push([Math.cos(r)*.35*(1-i*.4),i*3,Math.sin(r)*.3,.2-i*.12])}Mn(n,e,1),qn(n,[0,3.2,0],[.9,.6,.8],2)}},"loop-tree":{desc:"a tree grown into a loop",split:2.4,build(n){const e=[[0,0,0,.22],[.1,.9,0,.18]];for(let t=0;t<=10;t++){const i=-Math.PI/2+t/10*Math.PI*2;e.push([.1+Math.cos(i)*.55+t*.02,1.45+Math.sin(i)*.55,0,.15])}e.push([.3,2.6,0,.1]),Mn(n,e,1),qn(n,[.3,2.9,0],[.75,.5,.65],2)}},"split-tree":{desc:"a tree split by lightning, both halves still leafing",split:2,build(n){Mn(n,[[0,0,0,.3],[0,.9,0,.26]],1),Mn(n,[[-.05,.9,0,.18],[-.6,1.9,0,.13],[-1,2.6,0,.07]],2),Mn(n,[[.05,.9,0,.18],[.55,1.8,.05,.13],[.9,2.4,.05,.07]],3),n.ell([0,1,.05],[.08,.25,.2],l.BARKD,{group:1,cut:!0}),qn(n,[-1,2.7,0],[.6,.45,.5],4),qn(n,[.95,2.5,.05],[.55,.4,.5],5)}},"door-tree":{desc:"a fat old tree with a little round door in it, a lit window above",glow:!0,split:2.3,build(n){n.ell([0,1,0],[.8,1.1,.75],l.TRUNK,{group:1,rough:.02,paint:e=>e[2]>.5&&Math.hypot(e[0],e[1]-.45)<.3&&e[1]>.2?Math.hypot(e[0],e[1]-.45)<.25?Math.abs(e[0]%.1)<.015?l.BARKD:l.ACCENT:l.BARKD:e[2]>.45&&Math.hypot(e[0]-.3,e[1]-1.3)<.13?Math.abs(e[0]-.3)<.015||Math.abs(e[1]-1.3)<.015?l.BARKD:l.GLOW:el(e)}),n.ell([.12,.45,.72],[.03,.03,.03],l.FRAME,{group:2}),qn(n,[0,2.4,-.1],[1.1,.7,.9],3);for(let e=0;e<5;e++){const t=e/5*Math.PI*2;Mn(n,[[Math.cos(t)*.6,.2,Math.sin(t)*.55,.15],[Math.cos(t)*1.1,.02,Math.sin(t)*1,.05]],4)}}},"mushroom-tree":{desc:"an enormous mushroom, tall as a tree",split:2.2,build(n){n.seg([0,0,0],[.1,2.4,0],.3,.22,l.CLOTH,{group:1,paint:e=>e[1]>2&&e[1]<2.15?l.BELLY:void 0}),n.ell([.1,2.55,0],[1.3,.45,1.15],l.ACCENT,{group:2,rough:.01,paint:e=>e[1]<2.35?l.BODY2:zn(e,8)<.18?l.BELLY:void 0}),n.ell([.1,2.35,0],[1.2,.08,1.05],l.BODY2,{group:3,paint:e=>Math.abs(Math.sin(Math.atan2(e[2],e[0]-.1)*20))<.3?l.STRAW:void 0})}},"root-tree":{desc:"an upside-down-looking tree, its roots raised high like a crown",split:2,build(n){Mn(n,[[0,0,0,.35],[0,1.6,0,.25]],1);for(let e=0;e<7;e++){const t=e/7*Math.PI*2;Mn(n,[[0,1.6,0,.16],[Math.cos(t)*.7,2.2+Nt(e)*.3,Math.sin(t)*.6,.1],[Math.cos(t)*1.2,2.5+Nt(e,2)*.4,Math.sin(t)*1,.04]],2+e%2)}for(let e=0;e<4;e++){const t=e/4*Math.PI*2+.4;Mn(n,[[Math.cos(t)*.25,.3,Math.sin(t)*.25,.14],[Math.cos(t)*.6,.02,Math.sin(t)*.55,.05]],4)}}},"stone-lifter":{desc:"a tree that has lifted great stones up in its roots",split:2.4,build(n){Mn(n,[[0,.6,0,.3],[0,2,0,.22],[.1,2.8,0,.12]],1);for(let e=0;e<6;e++){const t=e/6*Math.PI*2;Mn(n,[[Math.cos(t)*.2,.6,Math.sin(t)*.2,.15],[Math.cos(t)*.6,.45,Math.sin(t)*.55,.12],[Math.cos(t)*.9,0,Math.sin(t)*.8,.07]],2)}for(const[e,t,i]of[[.5,.45,.9],[-.5,.4,1.1],[.15,-.5,.8]])mn(n,[e,i,t],[.3,.24,.26],3);qn(n,[.1,3,0],[1,.6,.85],4)}},"ring-tree":{desc:"a hollow ring of a tree you could fly through",split:null,build(n){for(let e=0;e<=16;e++){const t=e/16*Math.PI*2,i=[Math.cos(t)*1.2,1.35+Math.sin(t)*1.2,0];n.ell(i,[.3,.3,.3],l.TRUNK,{group:1,rough:.02,paint:el})}Mn(n,[[-.6,0,.2,.3],[-.5,.3,.1,.3]],2),Mn(n,[[.6,0,.2,.3],[.5,.3,.1,.3]],2);for(const[e,t]of[[-.9,2.3],[.3,2.65],[1.1,2]])qn(n,[e,t,-.1],[.45,.3,.35],3)}}},j_=[...Object.entries($_).map(([n,e])=>({id:n,family:"ruins",size:1.15,variants:2,...e})),...Object.entries(J_).map(([n,e])=>({id:n,family:"rocks",size:1,variants:1,split:null,...e})),...Object.entries(Q_).map(([n,e])=>({id:n,family:"freak",size:1.2,variants:1,...e}))];Object.fromEntries(j_.map(n=>[n.id,n]));const ki=(n,e=0)=>{const t=Math.sin(n*127.1+e*311.7)*43758.5453;return t-Math.floor(t)},Qt=(n,e,t=0)=>ki(Math.floor(n[0]*e)+Math.floor(n[2]*e)*57+t,Math.floor(n[1]*e)),Kn=(n=.25,e=.15)=>t=>{const i=Qt(t,16,3);return Qt(t,6,5)<e&&t[1]>.1?l.MOSS:i>1-n*.7?l.BODY2:void 0},Xn=(n,e,t,i,r=.025,a=l.FRAME)=>n.seg(e,t,r,r,a,{group:i,paint:Kn(.4,.05)}),Gc=(n,e,t,i)=>n.ell(e,t,l.STONE,{group:i,rough:.025,paint:r=>r[1]>e[1]+t[1]*.5&&Qt(r,5,i)<.6?l.MOSS:Qt(r,14)>.9?l.STONED:void 0}),qi=(n,e,t,i,r)=>{for(let a=0;a<e;a++){const s=ki(r,a)*6.283,o=t*Math.sqrt(ki(a,r));n.ell([Math.cos(s)*o,.07,Math.sin(s)*o*.7],[.07,.1+ki(a,4)*.08,.07],l.LEAF2,{group:i+a%3,paint:c=>c[1]>.13?l.LEAF:void 0})}},oo=(n,e,t,i)=>n.ell(e,t,l.LEAF,{group:i,rough:.04,paint:r=>{const a=Qt(r,10,2);return r[1]<e[1]-.15||a<.2?l.LEAF3:a>.8?l.LEAF2:void 0}}),Ka=(n,e,t,i,r)=>{const a=[];for(let s=0;s<=4;s++)a.push([...T.add(T.lerp(e,t,s/4),[(ki(r,s)-.5)*.12,0,.02]),.03]);n.chain(a,l.LEAF,{group:i,paint:s=>Qt(s,30)<.3?l.LEAF2:void 0})};function Vc(n,e,{pitch:t=0,roll:i=0,at:r=[0,0,0]}={}){const a=(h,d,f,p)=>{const m=Math.cos(d),x=Math.sin(d),_=[...h];return _[f]=h[f]*m-h[p]*x,_[p]=h[f]*x+h[p]*m,_},s=h=>a(a(h,i,1,2),t,0,1),o=h=>a(a(h,-t,0,1),-i,1,2),c=h=>T.add(s(h),r),u=h=>o(T.sub(h,r));for(const h of n.parts.slice(e))if(h.type==="cone"?(h.a=c(h.a),h.b=c(h.b)):(h.c=c(h.c),h.axes=h.axes.map(s)),h.paint){const d=h.paint;h.paint=(f,p)=>d(u(f),p)}}const ex={"verge-post":{family:"prop",path:"tarmac",desc:"a road's verge post, leaning, its band faded",build(n){const e=n.parts.length;n.box([0,.4,0],[.06,.4,.06],l.BELLY,{round:.02,group:1,paint:t=>Math.abs(t[1]-.62)<.06?l.SHADES:Kn(.1,.2)(t)}),Vc(n,e,{roll:.15,pitch:.1}),qi(n,4,.25,3,1)}},"cats-eye":{family:"prop",path:"tarmac",desc:"a cat's-eye stud in the road (unlit)",build(n){n.box([0,.02,0],[.09,.02,.05],l.SHADES,{round:.01,group:1});for(const e of[-.04,.04])n.ell([e,.04,.03],[.025,.015,.015],l.FRAME,{group:2})}},"stepping-stone":{family:"prop",path:"stepping",desc:"a stepping stone, flat-topped and mossy",build(n){Gc(n,[0,.08,0],[.38,.12,.3],1)}},"boardwalk-post":{family:"prop",path:"boardwalk",desc:"a boardwalk's post, standing in the water",build(n){n.seg([0,0,0],[0,.55,0],.06,.055,l.WOOD,{group:1,paint:e=>e[1]<.12?l.MOSS:e[1]>.5?l.BARK2:void 0})}},"sleeper-sapling":{family:"prop",path:"railway",desc:"a sapling grown up between the sleepers",build(n){n.seg([0,0,0],[0,.9,0],.025,.015,l.TRUNK,{group:1}),oo(n,[0,.95,0],[.22,.18,.2],2),qi(n,4,.2,3,2)}},"glow-mushrooms":{family:"prop",path:"magic",glow:!0,desc:"a cluster of softly glowing mushrooms",build(n){for(let e=0;e<4;e++){const t=[(ki(e)-.5)*.3,0,(ki(e,2)-.5)*.2],i=.08+ki(e,3)*.1;n.seg(t,T.add(t,[0,i,0]),.015,.012,l.CLOTH,{group:1}),n.ell(T.add(t,[0,i+.02,0]),[.05,.03,.05],l.MAGIC,{group:2+e,paint:r=>r[1]>t[1]+i+.035?l.MAGIC2:void 0})}}},"fairy-stone":{family:"prop",path:"magic",glow:!0,desc:"a small fairy stone with a glowing rune",build(n){n.box([0,.18,0],[.09,.18,.06],l.STONE,{round:.04,group:1,paint:e=>e[2]>.04&&Math.abs(e[1]-.2)<.07&&Math.abs(e[0])<.025?l.RUNE:e[1]>.32?l.MOSS:void 0})}},"signal-post":{family:"prop",path:"railway",desc:"a rusty old signal post, its arm dropped (unlit)",build(n){Xn(n,[0,0,0],[0,2.2,0],1,.04),n.box([.25,2,0],[.25,.05,.02],l.ACCENT,{dir:[1,-.6,0],group:2,paint:e=>e[0]>.38?l.BELLY:Kn(.4,0)(e)}),n.ell([0,2.05,.05],[.06,.06,.03],l.SHADES,{group:3}),Ka(n,[0,0,.04],[.02,1.4,.04],4,3)}},stairs:{family:"piece",path:"stairs",desc:"a short flight of mossy stone stairs, for ruins and hollows",build(n){for(let e=0;e<5;e++)n.box([0,.1+e*.2,-e*.3],[.6,.1+e*.2,.15],l.STONE,{round:.03,rough:.01,group:1+e%2,paint:t=>t[1]>.16+e*.4&&Qt(t,6,e)<.35?l.MOSS:Qt(t,14)>.9?l.STONED:void 0});for(const e of[-.7,.7])Gc(n,[e,.3,-.6],[.15,.35,.7],5)}},"stairs-turn":{family:"piece",path:"stairs",desc:"stone stairs turning on a landing",build(n){for(let e=0;e<3;e++)n.box([0,.1+e*.2,-e*.3],[.5,.1+e*.2,.15],l.STONE,{round:.03,rough:.01,group:1+e%2,paint:t=>Qt(t,6,e)<.3&&t[1]>.2+e*.4?l.MOSS:void 0});n.box([0,.35,-1.1],[.55,.35,.5],l.STONE,{round:.03,group:3,paint:e=>Qt(e,6)<.3&&e[1]>.6?l.MOSS:void 0});for(let e=0;e<3;e++)n.box([.65+e*.3,.8+e*.2,-1.1],[.15,.1+e*.1,.5],l.STONE,{round:.03,group:4+e%2})}},"root-bridge":{family:"piece",path:"roots",desc:"a bridge of gnarled roots over a stream",build(n){n.ell([0,.01,0],[1.4,.015,.6],l.WATER,{group:1});for(let e=0;e<4;e++)n.chain([[-1.8,0,-.4+e*.27,.14],[-.8,.45,-.35+e*.25,.1],[.6,.5,-.3+e*.22,.1],[1.8,0,-.25+e*.2,.13]],l.TRUNK,{group:2+e%2,rough:.015,paint:t=>Qt(t,12)<.12?l.BARKD:t[1]>.55&&Qt(t,5)<.3?l.MOSS:void 0});oo(n,[-1.7,.25,-.5],[.3,.2,.25],5)}},footbridge:{family:"piece",path:"bridges",desc:"a little wooden footbridge over a stream",build(n){n.ell([0,.01,0],[1.2,.015,.7],l.WATER,{group:1});for(let e=-6;e<=6;e++){const t=e*.2,i=.35-t*t*.1;n.box([t,i,0],[.09,.03,.5],l.WOOD,{round:.01,group:2+(e&1),paint:r=>Qt(r,10)<.15?l.MOSS:void 0})}for(const e of[-.5,.5]){for(const t of[-1.1,0,1.1])n.seg([t,.3-t*t*.1,e],[t,.85-t*t*.1,e],.03,.03,l.WOOD,{group:4});n.chain([[-1.1,.85-.121,e,.025],[0,.85,e,.025],[1.1,.85-.121,e,.025]],l.WOOD,{group:4})}}},"rope-bridge":{family:"piece",path:"bridges",desc:"a rope bridge over a stream, planks sagging, one missing",build(n){n.ell([0,.01,0],[1.3,.015,.7],l.WATER,{group:1});for(const e of[-1.6,1.6])for(const t of[-.45,.45])n.seg([e,0,t],[e,1.1,t],.05,.045,l.WOOD,{group:2});for(let e=-7;e<=7;e++){if(e===3)continue;const t=e*.2,i=.55-(1-(t/1.6)**2)*.3;n.box([t,i,0],[.08,.02,.38],l.WOOD,{round:.01,group:3+(e&1)})}for(const e of[-.45,.45])for(const t of[0,1]){const i=[];for(let r=0;r<=8;r++){const a=-1.6+r*.4,s=(t?1.05:.55)-(1-(a/1.6)**2)*(t?.25:.3);i.push([a,s,e,.015])}n.chain(i,l.STRAW,{group:5})}}},"goods-wagon":{family:"landmark",path:"railway",desc:"an abandoned goods wagon tipped on its side (no livery)",build(n){const e=n.parts.length;n.box([0,.75,0],[1.6,.65,.6],l.BODY2,{round:.05,group:1,paint:t=>(t[0]+9)*4%1<.08?l.SHADES:Kn(.6,.2)(t)});for(const t of[-1.1,1.1])for(const i of[-.55,.55])n.ell([t,.22,i],[.22,.22,.06],l.SHADES,{group:2,paint:r=>Math.hypot(r[0]-t,r[1]-.22)<.08?l.FRAME:void 0});Vc(n,e,{roll:1.4,at:[0,.3,.3]}),qi(n,14,2.2,4,5),Ka(n,[-1.2,0,1],[-.6,1,1.1],7,6)}},carriage:{family:"landmark",path:"railway",glow:!0,desc:"an old passenger carriage, mossy roof, a tree grown through it, its windows glowing",build(n){n.box([0,.95,0],[2.4,.65,.62],l.HAT1,{round:.08,group:1,paint:e=>Math.abs(e[2])>.58&&e[1]>1&&e[1]<1.35&&(e[0]+9)*1.6%1>.25?Qt(e,9)<.2?l.SHADES:l.GLOW:Kn(.4,.15)(e)}),n.ell([0,1.62,0],[2.4,.14,.62],l.MOSS,{group:2,paint:e=>Qt(e,6)<.3?l.LEAF2:void 0});for(const e of[-1.8,1.8])for(const t of[-.5,.5])n.ell([e,.25,t],[.24,.24,.06],l.SHADES,{group:3});n.chain([[.6,0,0,.2],[.6,1.8,0,.16],[.7,2.9,-.1,.09]],l.TRUNK,{group:4,rough:.015}),oo(n,[.7,3.1,-.1],[1,.6,.8],5),qi(n,16,2.8,6,7)}},platform:{family:"landmark",path:"railway",desc:"a little station platform, a bench and a lamp post (no name board)",build(n){n.box([0,.35,0],[2.4,.35,.7],l.STONE,{round:.02,rough:.008,group:1,paint:e=>e[2]>.62&&e[1]>.6?l.BELLY:e[1]>.66&&Qt(e,5)<.25?l.MOSS:(e[0]+9)*2.5%1<.06?l.STONED:void 0}),n.box([-.6,.95,-.3],[.6,.04,.16],l.WOOD,{group:2}),n.box([-.6,1.2,-.44],[.6,.18,.03],l.WOOD,{group:2});for(const e of[-1.1,-.1])n.box([e,.82,-.3],[.04,.12,.14],l.FRAME,{group:2});Xn(n,[1.4,.7,-.4],[1.4,2.4,-.4],3,.035),n.box([1.4,2.5,-.4],[.12,.12,.12],l.FRAME,{round:.03,group:4,paint:e=>Math.abs(e[1]-2.5)<.07?l.SHADES:void 0}),Ka(n,[1.4,.7,-.36],[1.42,2.2,-.36],5,8),qi(n,10,2.4,6,9)}},"level-crossing":{family:"landmark",path:"railway",desc:"a level crossing's barrier post, its boom broken off and lying in the grass",build(n){n.box([0,.55,0],[.15,.55,.15],l.BELLY,{round:.03,group:1,paint:Kn(.3,.15)}),n.box([.6,1.05,0],[.6,.05,.04],l.BELLY,{group:2,paint:e=>(e[0]+9)*2.5%1<.5?l.ACCENT:Kn(.3,0)(e)}),n.box([1.6,.05,.4],[.7,.05,.04],l.BELLY,{dir:[1,0,.5],group:3,paint:e=>(e[0]+9)*2.5%1<.5?l.ACCENT:Kn(.3,.15)(e)}),Xn(n,[-.5,0,0],[-.5,1.6,0],4,.03);for(const e of[-1,1])n.box([-.5,1.6,0],[.35,.04,.015],l.BELLY,{dir:[1,e,0],group:5});qi(n,10,1.6,6,10)}},"buffer-stop":{family:"landmark",path:"railway",desc:"a buffer stop at the end of the line: a timber beam on rusty posts, its buffers worn, grass round its short stub of track",build(n){for(const e of[-.45,.45])Xn(n,[-.2,0,e],[0,.75,e],1,.05),Xn(n,[.35,0,e],[0,.7,e],1,.04),n.seg([0,.62,e],[.22,.62,e],.07,.07,l.FRAME,{group:2,paint:Kn(.5,0)}),n.ell([.25,.62,e],[.03,.1,.1],l.SHADES,{group:2});n.box([0,.7,0],[.08,.1,.75],l.ACCENT,{round:.02,group:3,paint:e=>(e[2]+9)*4%1<.5?l.BELLY:Kn(.4,.1)(e)});for(const e of[-.3,.3])n.seg([.2,.03,e],[2,.03,e],.03,.03,l.SHADES,{group:4,paint:t=>t[1]>.05?l.FRAME:void 0});for(let e=0;e<4;e++)n.box([.5+e*.45,.02,0],[.07,.02,.45],l.WOOD,{group:5,paint:t=>Qt(t,9)<.3?l.MOSS:void 0});qi(n,12,1.4,6,12)}},"signal-gantry":{family:"landmark",path:"railway",desc:"a rusty signal gantry spanning the line, its signals dark",build(n){for(const e of[-2,2])for(const t of[-.15,.15])Xn(n,[e,0,t],[e,3,t],1,.04);for(let e=0;e<8;e++){const t=-2+e*.5;Xn(n,[t,2.8,0],[t+.5,3.1,0],2,.02),Xn(n,[t,3.1,0],[t+.5,2.8,0],2,.02)}for(const e of[2.8,3.1])Xn(n,[-2,e,0],[2,e,0],3,.035);for(const e of[-.8,.8])Xn(n,[e,2.8,.05],[e,2.3,.05],4,.02),n.box([e,2.2,.08],[.12,.2,.05],l.SHADES,{round:.03,group:5,paint:t=>Math.hypot(t[0]-e,t[1]-2.27)<.05||Math.hypot(t[0]-e,t[1]-2.13)<.05?l.FRAME:void 0});Ka(n,[-2,0,.2],[-1.95,2.4,.2],6,11)}}},tx=Object.entries(ex).map(([n,e])=>({id:n,...e}));Object.fromEntries(tx.map(n=>[n.id,n]));const ia=32,Wc=15,Yc=ia/2,nx=(n,e)=>(n+.5-Yc)**2+(e+.5-Yc)**2<=Wc*Wc;Uint8Array.from({length:ia*ia},(n,e)=>nx(e%ia,e/ia|0)?1:0);const ix=[{k:"ambientHue",g:"Night light",label:"Twilight hue",min:0,max:1,step:.01,v:.68,hue:!0},{k:"ambient",g:"Night light",label:"Twilight brightness",min:.05,max:.6,step:.01,v:.22},{k:"moon",g:"Night light",label:"Moonlight",min:0,max:1,step:.01,v:.3},{k:"moonHue",g:"Night light",label:"Moon hue",min:0,max:1,step:.01,v:.58,hue:!0},{k:"glowHue",g:"Night light",label:"Witch glow hue",min:0,max:1,step:.01,v:.13,hue:!0},{k:"glowSat",g:"Night light",label:"Witch glow colour",min:0,max:1,step:.01,v:.35},{k:"glowRadius",g:"Night light",label:"Witch glow reach",min:30,max:200,step:5,v:110},{k:"glowPower",g:"Night light",label:"Witch glow strength",min:.3,max:2.5,step:.05,v:1.4},{k:"bands",g:"Shading",label:"Light steps",min:2,max:7,step:1,v:3},{k:"dither",g:"Shading",label:"Dithering",min:0,max:1,step:.05,v:.35},{k:"round",g:"Shading",label:"Roundness",min:.2,max:1.5,step:.05,v:.9},{k:"outline",g:"Shading",label:"Plant outline",options:["none","dark","tinted"],v:"none"},{k:"cOutline",g:"Shading",label:"Creature outline",options:["dark","tinted","none"],v:"dark"},{k:"shafts",g:"Night light",label:"Moonbeams",min:0,max:1,step:.05,v:.3},{k:"areaContrast",g:"Colour",label:"Difference between areas",min:0,max:1,step:.05,v:.6},{k:"sat",g:"Colour",label:"Saturation",min:.2,max:1.3,step:.01,v:.9},{k:"leafHue",g:"Colour",label:"Leaf hue",min:0,max:1,step:.01,v:.3,hue:!0},{k:"leafVariety",g:"Colour",label:"Leaf colour variety",min:0,max:1,step:.05,v:.3},{k:"trunkHue",g:"Colour",label:"Bark hue",min:0,max:1,step:.01,v:.07,hue:!0},{k:"groundHue",g:"Colour",label:"Ground hue",min:0,max:1,step:.01,v:.27,hue:!0},{k:"groundVal",g:"Colour",label:"Ground brightness",min:.15,max:.7,step:.01,v:.4},{k:"pixel",g:"Shading",label:"Pixel size",min:1,max:5,step:1,v:3},{k:"treeSize",g:"Trees",label:"Tree height",min:.5,max:1.5,step:.05,v:.85},{k:"crownWidth",g:"Trees",label:"Crown width",min:1,max:4,step:.1,v:3},{k:"clearing",g:"Trees",label:"Clearing size",min:0,max:1,step:.05,v:.55},{k:"depth",g:"Map",label:"Border detail (fractal layers)",min:0,max:6,step:1,v:4},{k:"areaScale",g:"Map",label:"Area size (screens)",min:.6,max:2,step:.05,v:1},{k:"areaTypes",g:"Map",label:"Area types",min:4,max:30,step:1,v:30},{k:"density",g:"Trees",label:"Foliage density",min:.2,max:1,step:.05,v:.55},{k:"clump",g:"Trees",label:"Clumpiness",min:0,max:1,step:.05,v:.6},{k:"gnarl",g:"Trees",label:"Gnarliness",min:0,max:1,step:.05,v:.5},{k:"roots",g:"Trees",label:"Roots",min:0,max:1,step:.05,v:.6},{k:"bark",g:"Trees",label:"Bark texture",min:0,max:1,step:.05,v:.6},{k:"trees",g:"Trees",label:"Tree density",min:.2,max:2,step:.05,v:1},{k:"wBroad",g:"Tree mix",label:"Gnarled broadleaf",min:0,max:1,step:.05,v:.8},{k:"wFir",g:"Tree mix",label:"Fir",min:0,max:1,step:.05,v:.6},{k:"wWillow",g:"Tree mix",label:"Willow",min:0,max:1,step:.05,v:.5},{k:"wBirch",g:"Tree mix",label:"Birch",min:0,max:1,step:.05,v:.5},{k:"wPalm",g:"Tree mix",label:"Tree fern",min:0,max:1,step:.05,v:.3},{k:"wFlat",g:"Tree mix",label:"Flat-crowned",min:0,max:1,step:.05,v:.5},{k:"bushes",g:"Undergrowth",label:"Bushes and shrubs",min:0,max:120,step:1,v:55},{k:"bushSize",g:"Undergrowth",label:"Bush size",min:.5,max:1.8,step:.05,v:1},{k:"flowers",g:"Undergrowth",label:"Flowers",min:0,max:1,step:.05,v:.3},{k:"cSat",g:"Creatures",label:"Creature saturation",min:.1,max:1,step:.01,v:.6},{k:"cVal",g:"Creatures",label:"Creature brightness",min:.4,max:1,step:.01,v:.85},{k:"head",g:"Creatures",label:"Baby head size",min:.3,max:.6,step:.01,v:.44},{k:"eye",g:"Creatures",label:"Eye size",min:.5,max:2,step:.05,v:1},{k:"legs",g:"Creatures",label:"Leg length",min:.5,max:1.8,step:.05,v:1},{k:"long",g:"Creatures",label:"Body length",min:.7,max:1.5,step:.05,v:1},{k:"size",g:"Creatures",label:"Baby size (px)",min:5,max:14,step:1,v:8},{k:"growth",g:"Creatures",label:"Legend vs baby height",min:5,max:25,step:1,v:20},{k:"magicHue",g:"Creatures",label:"Magic glow hue",min:0,max:1,step:.01,v:.5,hue:!0},{k:"fur",g:"Creatures",label:"Stripes and spots",min:0,max:1,step:.05,v:.5},{k:"cloakHue",g:"Witch",label:"Jacket hue",min:0,max:1,step:.01,v:.72,hue:!0},{k:"hairHue",g:"Witch",label:"Hair hue",min:0,max:1,step:.01,v:.01,hue:!0},{k:"hatHue",g:"Witch",label:"Hat hue",min:0,max:1,step:.01,v:.74,hue:!0},{k:"topHue",g:"Witch",label:"Top hue",min:0,max:1,step:.01,v:.13,hue:!0},{k:"jeansHue",g:"Witch",label:"Jeans hue",min:0,max:1,step:.01,v:.6,hue:!0},{k:"shoeHue",g:"Witch",label:"Sneakers hue",min:0,max:1,step:.01,v:0,hue:!0},{k:"phonesHue",g:"Witch",label:"Headphones hue",min:0,max:1,step:.01,v:.92,hue:!0}];function rx(){const n={};return ix.forEach(e=>n[e.k]=e.v),n}function ax(n,e,t,i,r){const a=cu(e.type).fn,s={...t,leafHue:n.leaf+(e.dark?.05:0),gnarl:e.gnarl??t.gnarl,treeBare:e.bare,treeTrunks:e.trunks,treeLean:e.lean,treeThick:e.thick,treeThin:e.thin,treeHollow:e.hollow,treeWebs:e.webs},o=a(i,s,t.treeSize*r*(e.scale||1)*ce(i,.9,1.1)),c=ul(i,s,a);return e.dark&&(c[l.LEAF]=c[l.LEAF3],c[l.LEAF3]=pe(n.leaf+.05,.7,.22)),c[l.NOSE]=[20,16,24],c[l.GLINT]=[235,235,240],{parts:Bd(o),colours:c}}function sx(n,e,t,i,r){const a=ii[t].id,s=pa.find(p=>p.id===a),o=tf(a,n,{K:i,makeCanvas:r}),c=[],u=p=>c.push(p)-1,h={big:[],small:[],walls:[],set:null},d=(p,m)=>Pr(p,m,n,"none",r),f=(p,m)=>{const{parts:x,colours:_}=ax(s,p,n,oa(e*13+t*101+m*7+1),i);return{bot:u(d(x.bot,_)),top:u(d(x.top,_))}};s.big.forEach(([p,m],x)=>{if(p!=="tree"){h.big.push({bot:u(o.big[x].sp),top:null});return}const _=m.minor,g=s.big.filter(([,E])=>!E.minor).length||1,M=_?1:Math.max(1,Math.round(hu/g));for(let E=0;E<M;E++)h.big.push(f(m,x*17+E))}),s.small.forEach(([p,m],x)=>h.small.push(p==="tree"?f(m,500+x):{bot:u(o.small[x].sp),top:null}));for(const p of o.walls)h.walls.push(u(p.sp));return o.setPiece&&(h.set=s.set?.[0]==="tree"?f(s.set[1],900):{bot:u(o.setPiece.sp),top:null}),{sprites:c,layout:h,floor:o.floor.sp}}function ox(n,e,t){const i=[];for(let r=0;r<3;r++)for(let a=0;a<2;a++)i.push(Pr(ud(e,r,a,n),od(e,n),n,n.cOutline,t));return i}const lx=(n,e)=>n*2+e;function fs(n,e,t){return n.getContext("2d").getImageData(0,0,e,t).data}function tl(n,e=2048){const i=[];let r=0,a=0,s=0,o=1;for(const f of n)r+f.w+1>e&&(r=0,a+=s+1,s=0),i.push({x:r,y:a}),r+=f.w+1,s=Math.max(s,f.h),o=Math.max(o,r);const c=Math.max(1,a+s),u=new Uint8Array(o*c*4),h=new Uint8Array(o*c*4),d=n.map((f,p)=>{const m=i[p],x=fs(f.A,f.w,f.h),_=fs(f.N,f.w,f.h);for(let g=0;g<f.h;g++){const M=g*f.w*4,E=((m.y+g)*o+m.x)*4;u.set(x.subarray(M,M+f.w*4),E),h.set(_.subarray(M,M+f.w*4),E)}return{uv:[m.x/o,m.y/c,(m.x+f.w)/o,(m.y+f.h)/c],w:f.w,h:f.h}});return{albedo:u,normal:h,width:o,height:c,frames:d}}function cx(n,e){if(n.kind==="creature")return{px:tl(ox(n.style,n.id,e),1024)};const{sprites:t,layout:i,floor:r}=sx(n.style,n.seed,n.id,n.K,e);return{px:tl(t),layout:i,floor:{albedo:new Uint8Array(fs(r.A,r.w,r.h)),normal:new Uint8Array(fs(r.N,r.w,r.h)),w:r.w,h:r.h}}}function Xc(n,e,t){const i=new Tr(n,e,t,Rn,vn);return i.magFilter=Wt,i.minFilter=Wt,i.generateMipmaps=!1,i.flipY=!1,i.colorSpace=On,i.needsUpdate=!0,i}function eh(n){return{albedo:Xc(n.albedo,n.width,n.height),normal:Xc(n.normal,n.width,n.height),frames:n.frames}}const Kc=(n,e=2048)=>eh(tl(n,e));class ux{constructor(e,t,i){if(this.style=e,this.seed=t,this.K=2/i,this.witch=Kc([Pr(Ih(),wh(e),e,"dark")]),this.stones=Kc([0,1,2,3].map(r=>this.stone(r))),this.useWorkers=typeof Worker<"u"&&typeof OffscreenCanvas<"u",this.useWorkers){const r=Math.max(1,Math.min(3,(navigator.hardwareConcurrency||2)-1));try{for(let a=0;a<r;a++){const s=new Worker(new URL(""+new URL("artWorker-DOLonLVP.js",import.meta.url).href,import.meta.url),{type:"module"}),o={w:s,busy:!1};s.onmessage=c=>{o.busy=!1,o.job=void 0,this.receive(c.data),this.dispatch()},s.onerror=()=>{this.useWorkers=!1,o.job&&this.queue.unshift(o.job),o.busy=!1,o.job=void 0},this.workers.push(o)}}catch{this.useWorkers=!1}}}style;seed;types=new Map;creatures=new Map;queue=[];inFlight=new Set;workers=[];useWorkers;witch;stones;K;version=0;onFloor=()=>{};stone(e){const t=oa(this.seed*3+e),i=5+Math.floor(t()*3),r=7+Math.floor(t()*5),a=new Bt(i+2,r+1);return a.ellipse((i+2)/2,r/2+1,i/2,r/2+.5,l.BODY,{round:this.style.round}),a.ellipse((i+2)/2-1,r/2,i/3,r/3,l.BODY2,{round:this.style.round,onlyOn:new Set([l.BODY]),density:.5,seed:e}),Pr(a,{[l.BODY]:[178,174,162],[l.BODY2]:[140,138,130]},this.style,"dark")}key=e=>e.kind+":"+e.id;ask(e){const t=this.key(e);this.inFlight.has(t)||(this.inFlight.add(t),this.queue.push(e),this.dispatch())}dispatch(){if(this.useWorkers)for(const e of this.workers)e.busy||!this.queue.length||(e.busy=!0,e.job=this.queue.shift(),e.w.postMessage(e.job))}receive(e){if(!e.result){console.warn("art worker failed, drawing on the page:",e.error),this.useWorkers=!1,this.queue.unshift(e.job);return}const t=eh(e.result.px);e.job.kind==="type"?(this.types.set(e.job.id,{atlas:t,layout:e.result.layout}),e.result.floor&&this.onFloor(e.job.id,e.result.floor)):this.creatures.set(e.job.id,{atlas:t,frame:lx}),this.inFlight.delete(this.key(e.job)),this.version++}typeArt(e){const t=this.types.get(e);return t||this.ask({kind:"type",id:e,style:this.style,seed:this.seed,K:this.K}),t}creatureArt(e){const t=this.creatures.get(e);return t||this.ask({kind:"creature",id:e,style:this.style}),t}prefetchType(e){this.types.has(e)||this.typeArt(e)}get pending(){return this.inFlight.size}work(e){if(this.useWorkers)return;const t=performance.now();let i=0;for(;this.queue.length&&(i===0||performance.now()-t<e);){const r=this.queue.shift();this.receive({job:r,result:cx(r,(a,s)=>{const o=document.createElement("canvas");return o.width=a,o.height=s,o})}),i++}}whenIdle(){return new Promise(e=>{const t=()=>{this.work(50),this.pending?setTimeout(t,30):e()};t()})}}const Vt={uAmb:{value:new Y},uMoon:{value:new Y},uMoonDir:{value:new Y(-.45,.75,.5).normalize()},uMoonBeam:{value:new Y},uBands:{value:4},uDither:{value:.35},uShafts:{value:.3},uShaftScale:{value:1},uGlowPos:{value:new Y},uGlowRgb:{value:new Y},uGlowR:{value:8},uGlowPower:{value:1.4},uHazeCentre:{value:new We},uHazeRange:{value:new We(70,200)},uHazeColour:{value:new Y},uTime:{value:0}};function hx(n,e,t){const i=(r,a)=>new Y(r[0]/255*a,r[1]/255*a,r[2]/255*a);Vt.uAmb.value.copy(i(pe(n.ambientHue,.55,1),n.ambient)),Vt.uMoon.value.copy(i(pe(n.moonHue,.35,1),n.moon)),Vt.uMoonBeam.value.copy(i(pe(n.moonHue,.35,1),n.shafts*.25)),Vt.uBands.value=n.bands,Vt.uDither.value=n.dither*.5,Vt.uShafts.value=n.shafts,Vt.uShaftScale.value=t*2,Vt.uGlowRgb.value.copy(i(pe(n.glowHue,n.glowSat,1),1)),Vt.uGlowR.value=e,Vt.uGlowPower.value=n.glowPower,Vt.uHazeColour.value.copy(i(pe(n.ambientHue,.45,1),.16))}const vs=`
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
`,Zi=2,Zt=32,Ji=8,dx=`
varying vec3 vWorld;
void main() {
  vec4 w = modelMatrix * vec4(position, 1.0);
  vWorld = w.xyz;
  gl_Position = projectionMatrix * viewMatrix * w;
}
`,fx=`
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
${vs}
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
    vec2 cell = vec2(mod(float(t), ${Ji}.0), floor(float(t) / ${Ji}.0));
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
`;class px{constructor(e,t,i){this.map=e;const r=e.extent,a=r.maxX-r.minX,s=r.maxZ-r.minZ,o=Math.ceil(a*Zi/Zt)*Zt,c=Math.ceil(s*Zi/Zt)*Zt;this.tilesX=o/Zt,this.tilesZ=c/Zt,this.filled=new Uint8Array(this.tilesX*this.tilesZ);const u=p=>(p.magFilter=p.minFilter=Wt,p.generateMipmaps=!1,p.colorSpace=On,p.needsUpdate=!0,p);this.texture=u(new Tr(new Uint8Array(o*c*4),o,c)),u(this.tile),this.floors=u(new Tr(new Uint8Array(64*Ji*48*4*4),64*Ji,192));const h=Array.from({length:32},(p,m)=>new Y(...ii[m]?.floor??[.25,.45,.4])),d=new on({vertexShader:dx,fragmentShader:fx,uniforms:{...Vt,uAreas:{value:this.texture},uExtent:{value:new Dt(r.minX,r.minZ,o/Zi,c/Zi)},uPixel:{value:i},uTypeFloor:{value:h},uFloorReady:{value:this.floorReady},uFloors:{value:this.floors},uTile:{value:new We(64,48)},uFloorsSize:{value:new We(64*Ji,192)},uSat:{value:t.sat},uFloor:{value:new Y(e.dancefloor.x,e.dancefloor.z,e.dancefloor.radius)},uCanopy:{value:new Dt},uClearing:{value:new We(e.tuning.clearingSize,e.tuning.clearingFalloff)}}}),f=new oi(a+400,s+400);f.rotateX(-Math.PI/2),this.mesh=new dn(f,d),this.mesh.position.set((r.minX+r.maxX)/2,0,(r.minZ+r.maxZ)/2)}map;mesh;texture;tile=new Tr(new Uint8Array(Zt*Zt*4),Zt,Zt);filled;tilesX;tilesZ;initialised=!1;floorReady=new Array(32).fill(0);floors;pendingFloors=[];setCanopyShadow(e,t,i,r){this.mesh.material.uniforms.uCanopy.value.set(e,t,i,r)}setFloor(e,t){this.pendingFloors.push([e,t])}placeFloors(e){for(const[t,i]of this.pendingFloors){const r=this.mesh.material,a=r.uniforms.uTile.value;if(i.w!==a.x||i.h!==a.y)continue;const s=new Tr(i.albedo,i.w,i.h);s.needsUpdate=!0,e.copyTextureToTexture(s,this.floors,null,new We(t%Ji*i.w,Math.floor(t/Ji)*i.h)),s.dispose(),this.floorReady[t]=1}this.pendingFloors=[]}fill(e,t,i,r,a){this.initialised||(e.initTexture(this.texture),e.initTexture(this.floors),this.initialised=!0),this.pendingFloors.length&&this.placeFloors(e);const s=this.map.extent,o=Zt/Zi,c=(t-s.minX)/o,u=(i-s.minZ)/o,h=Math.ceil(r/o),d=[];for(let m=Math.max(0,Math.floor(u)-h);m<=Math.min(this.tilesZ-1,Math.floor(u)+h);m++)for(let x=Math.max(0,Math.floor(c)-h);x<=Math.min(this.tilesX-1,Math.floor(c)+h);x++)this.filled[m*this.tilesX+x]||d.push([x,m,(x+.5-c)**2+(m+.5-u)**2]);d.sort((m,x)=>m[2]-x[2]);const f=performance.now();let p=0;for(const[m,x]of d){if(p>0&&performance.now()-f>a)break;this.fillTile(e,m,x),p++}return d.length-p}fillTile(e,t,i){const r=this.map.extent,a=this.tile.image.data;for(let s=0;s<Zt;s++)for(let o=0;o<Zt;o++){const c=r.minX+(t*Zt+o+.5)/Zi,u=r.minZ+(i*Zt+s+.5)/Zi,h=this.map.areaAt(c,u),d=(s*Zt+o)*4;a[d]=h.type,a[d+1]=Math.round(h.openness*255),a[d+2]=0,a[d+3]=255}this.tile.needsUpdate=!0,e.copyTextureToTexture(this.tile,this.texture,null,new We(t*Zt,i*Zt)),this.filled[i*this.tilesX+t]=1}dispose(){this.texture.dispose(),this.tile.dispose(),this.mesh.geometry.dispose(),this.mesh.material.dispose()}}const mx="varying vec2 vUv; void main() { vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }",gx=`
uniform sampler2D uScene; uniform float uThreshold; varying vec2 vUv;
void main() {
  vec3 c = texture2D(uScene, vUv).rgb;
  float l = max(c.r, max(c.g, c.b));
  gl_FragColor = vec4(c * smoothstep(uThreshold, uThreshold + 0.25, l), 1.0);
}`,_x=`
uniform sampler2D uSrc; uniform vec2 uStep; varying vec2 vUv;
void main() {
  vec3 c = texture2D(uSrc, vUv).rgb * 0.227;
  c += (texture2D(uSrc, vUv + uStep * 1.38).rgb + texture2D(uSrc, vUv - uStep * 1.38).rgb) * 0.316;
  c += (texture2D(uSrc, vUv + uStep * 3.23).rgb + texture2D(uSrc, vUv - uStep * 3.23).rgb) * 0.070;
  gl_FragColor = vec4(c, 1.0);
}`,xx=`
uniform sampler2D uScene, uBloom; uniform vec2 uLow; uniform float uBloomStrength; varying vec2 vUv;
void main() {
  vec2 p = (floor(vUv * uLow) + 0.5) / uLow;
  vec3 c = texture2D(uScene, p).rgb + texture2D(uBloom, vUv).rgb * uBloomStrength;
  gl_FragColor = vec4(min(c, vec3(1.0)), 1.0);
}`,Mx=`
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
}`;function jr(n,e,t,i=!1){const r=new Cn(Math.max(1,n),Math.max(1,e),{minFilter:t,magFilter:t,depthBuffer:i,generateMipmaps:!1});return r.texture.colorSpace=On,r}class vx{constructor(e,t){this.renderer=e,this.tuning=t,this.scene=jr(1,1,zt,!0);const i=(r,a)=>new on({vertexShader:mx,fragmentShader:r,uniforms:a,depthTest:!1,depthWrite:!1});this.mats={bright:i(gx,{uScene:{value:null},uThreshold:{value:.6}}),blur:i(_x,{uSrc:{value:null},uStep:{value:new We}}),composite:i(xx,{uScene:{value:null},uBloom:{value:null},uLow:{value:new We},uBloomStrength:{value:0}}),tilt:i(Mx,{uSrc:{value:null},uTexel:{value:new We},uDir:{value:new We},uStrength:{value:0},uBand:{value:.4},uCentre:{value:.5}})},this.quad=new dn(new oi(2,2),this.mats.composite),this.quad.frustumCulled=!1}renderer;tuning;scene;bright=jr(1,1,zt);bloomB=jr(1,1,zt);a=jr(1,1,zt);b=jr(1,1,zt);quad;cam=new yl(-1,1,1,-1,0,1);mats;low=new We(1,1);out=new We(1,1);get fullResolution(){return this.tuning.tiltShift.on&&this.tuning.tiltShift.where==="after"}resize(e,t,i,r){this.low.set(e,t),this.out.set(i,r),this.scene.setSize(e,t);const a=Math.max(1,Math.round(e/2)),s=Math.max(1,Math.round(t/2));this.bright.setSize(a,s),this.bloomB.setSize(a,s);const o=this.fullResolution?i:e,c=this.fullResolution?r:t;this.a.setSize(o,c),this.b.setSize(o,c)}pass(e,t,i){const r=this.mats[e];i(r.uniforms),this.quad.material=r,this.renderer.setRenderTarget(t),this.renderer.render(this.quad,this.cam)}render(e,t){const i=this.renderer,r=this.tuning;i.setRenderTarget(this.scene),i.render(e,t);const a=r.bloom.on&&r.bloom.strength>0;if(a){const d=this.bright.width,f=this.bright.height;this.pass("bright",this.bright,p=>{p.uScene.value=this.scene.texture,p.uThreshold.value=r.bloom.threshold});for(let p=0;p<2;p++)this.pass("blur",this.bloomB,m=>{m.uSrc.value=this.bright.texture,m.uStep.value.set(1/d,0)}),this.pass("blur",this.bright,m=>{m.uSrc.value=this.bloomB.texture,m.uStep.value.set(0,1/f)})}const s=r.tiltShift.on&&r.tiltShift.strength>0;if(this.pass("composite",s?this.a:null,d=>{d.uScene.value=this.scene.texture,d.uBloom.value=this.bright.texture,d.uLow.value.copy(this.low),d.uBloomStrength.value=a?r.bloom.strength:0}),!s)return;const o=this.a.width,c=this.a.height,u=this.fullResolution?this.out.y/this.low.y:1,h=d=>{d.uTexel.value.set(1/o,1/c),d.uStrength.value=r.tiltShift.strength*u,d.uBand.value=r.tiltShift.band,d.uCentre.value=1-r.tiltShift.centre};this.pass("tilt",this.b,d=>{h(d),d.uSrc.value=this.a.texture,d.uDir.value.set(1,0)}),this.pass("tilt",null,d=>{h(d),d.uSrc.value=this.b.texture,d.uDir.value.set(0,1)})}}const Sx=`
varying vec3 vWorld;
void main() {
  vec4 w = modelMatrix * vec4(position, 1.0);
  vWorld = w.xyz;
  gl_Position = projectionMatrix * viewMatrix * w;
}`,bx=`
uniform float uStrength, uWind, uPixel;
varying vec3 vWorld;
${vs}
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
}`;class Ex{constructor(e,t,i,r){this.height=t,this.mat=new on({vertexShader:Sx,fragmentShader:bx,uniforms:{...Vt,uStrength:{value:e},uWind:{value:i},uPixel:{value:r}},depthWrite:!1}),this.mesh=new dn(new oi(700,700).rotateX(-Math.PI/2),this.mat),this.mesh.frustumCulled=!1,this.mesh.renderOrder=2}height;mesh;mat;follow(e,t){this.mesh.position.set(e,this.height,t-150)}}const yx=`
attribute vec4 iShadow; // x, z, width, depth (metres)
varying vec2 vLocal;
varying vec3 vWorld;
void main() {
  vLocal = position.xz * 2.0;
  vec3 w = vec3(iShadow.x + position.x * iShadow.z, 0.03, iShadow.y + position.z * iShadow.w);
  vWorld = w;
  gl_Position = projectionMatrix * viewMatrix * vec4(w, 1.0);
}`,wx=`
uniform float uStrength;
varying vec2 vLocal;
varying vec3 vWorld;
${vs}
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
}`;class Ax{mesh;geo=new Wu;attr;capacity=0;constructor(e){const t=new oi(1,1).rotateX(-Math.PI/2);this.geo.index=t.index,this.geo.setAttribute("position",t.getAttribute("position")),this.attr=this.grow(1024);const i=new on({vertexShader:yx,fragmentShader:wx,uniforms:{...Vt,uStrength:{value:e}},depthWrite:!1});this.mesh=new dn(this.geo,i),this.mesh.frustumCulled=!1,this.mesh.renderOrder=1}grow(e){return this.capacity=Math.max(e,this.capacity*2),this.attr=new ku(new Float32Array(this.capacity*4),4),this.attr.setUsage(Du),this.geo.setAttribute("iShadow",this.attr),this.attr}set(e){e.length>this.capacity&&this.grow(e.length);const t=this.attr.array;e.forEach((i,r)=>{t[r*4]=i.x,t[r*4+1]=i.z,t[r*4+2]=i.w,t[r*4+3]=i.d}),this.attr.needsUpdate=!0,this.geo.instanceCount=e.length,this.mesh.visible=e.length>0}}const wr={uRight:{value:new Y(1,0,0)},uUp:{value:new Y(0,1,0)},uFacing:{value:new Y(0,0,1)},uTopFade:{value:0}},Tx=`
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
`,Rx=`
uniform sampler2D uAlbedo, uNormal;
uniform vec3 uRight, uUp, uFacing;
uniform float uTopFade, uUnlit;
varying vec2 vUv;
varying vec3 vWorld;
varying vec2 vFlags;
${vs}
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
`;class qa{constructor(e,t,i={}){this.atlas=e,this.metresPerPixel=t;const r=new oi(1,1);r.translate(0,.5,0),this.geo=new Wu,this.geo.index=r.index,this.geo.setAttribute("position",r.getAttribute("position")),this.geo.setAttribute("uv",r.getAttribute("uv")),this.pos=this.size=this.uvs=this.flags=void 0,this.grow(64);const a=new on({vertexShader:Tx,fragmentShader:Rx,uniforms:{...Vt,...wr,uAlbedo:{value:e.albedo},uNormal:{value:e.normal},uUnlit:{value:i.unlit?1:0}},depthTest:!i.onTop,depthWrite:!i.onTop});this.mesh=new dn(this.geo,a),this.mesh.frustumCulled=!1,i.onTop&&(this.mesh.renderOrder=10)}atlas;metresPerPixel;mesh;geo;pos;size;uvs;flags;capacity=0;count=0;grow(e){const t=Math.max(e,this.capacity*2),i=(r,a)=>{const s=new ku(new Float32Array(t*r),r);return s.setUsage(Du),a&&s.array.set(a.array),s};this.pos=i(3,this.pos),this.size=i(2,this.size),this.uvs=i(4,this.uvs),this.flags=i(2,this.flags),this.geo.setAttribute("iPos",this.pos),this.geo.setAttribute("iSize",this.size),this.geo.setAttribute("iUv",this.uvs),this.geo.setAttribute("iFlags",this.flags),this.capacity=t}set(e){e.length>this.capacity&&this.grow(e.length);const t=this.pos.array,i=this.size.array,r=this.uvs.array,a=this.flags.array;e.forEach((s,o)=>{t[o*3]=s.x,t[o*3+1]=s.y,t[o*3+2]=s.z,i[o*2]=s.frame.w*this.metresPerPixel,i[o*2+1]=s.frame.h*this.metresPerPixel,r.set(s.frame.uv,o*4),a[o*2]=s.flip?1:0,a[o*2+1]=s.top?1:0});for(const s of[this.pos,this.size,this.uvs,this.flags])s.needsUpdate=!0;this.count=e.length,this.geo.instanceCount=e.length,this.mesh.visible=e.length>0}dispose(){this.geo.dispose(),this.mesh.material.dispose(),this.atlas.albedo.dispose(),this.atlas.normal.dispose()}}class Cx{constructor(e,t,i){this.canvas=e,this.game=t,this.style=i;const r=t.tuning;this.renderer=new V_({canvas:e,antialias:!1,powerPreference:"high-performance",preserveDrawingBuffer:!0}),this.renderer.setPixelRatio(1),this.renderer.info.autoReset=!1,this.renderer.outputColorSpace=ha,this.mpp=1/(r.artPixelsPerMetre*(2/r.pixelSize)),this.camera=new An(r.camera.fov,1,1,900),this.post=new vx(this.renderer,r),this.scene.background=new ct(723478),hx(i,r.glowReach,this.mpp),this.assets=new ux(i,t.seed,r.pixelSize),this.ground=new px(t.map,i,this.mpp),this.assets.onFloor=(u,h)=>this.ground.setFloor(u,h);const a=r.canopyShadow;this.ground.setCanopyShadow(a.on?a.strength:0,a.height,a.cover,a.wind),this.shadows=new Ax(r.shadows.strength),this.shadows.mesh.visible=r.shadows.on,this.scene.add(this.shadows.mesh),r.mist.on&&r.mist.strength>0&&(this.mist=new Ex(r.mist.strength,r.mist.height,r.mist.wind,this.mpp),this.scene.add(this.mist.mesh)),Vt.uHazeRange.value.set(r.haze.near,r.haze.far),this.scene.add(this.ground.mesh),this.witchBatch=new qa(this.assets.witch,this.mpp,{unlit:!0,onTop:!0}),this.scene.add(this.witchBatch.mesh),this.stoneBatch=new qa(this.assets.stones,this.mpp),this.scene.add(this.stoneBatch.mesh);const s=t.map.dancefloor,o=[];for(let u=0;u<9;u++){const h=u/9*Math.PI*2+.3;o.push({x:s.x+Math.cos(h)*s.radius,y:0,z:s.z+Math.sin(h)*s.radius,frame:this.assets.stones.frames[u%4],flip:u%2===0})}this.stoneBatch.set(o);const c=new on({transparent:!1,depthWrite:!1,vertexShader:"varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }",fragmentShader:"varying vec2 vUv; void main(){ vec2 p = vUv * 2.0 - 1.0; if (dot(p, p) > 1.0 || mod(floor(gl_FragCoord.x) + floor(gl_FragCoord.y), 2.0) > 0.5) discard; gl_FragColor = vec4(0.02, 0.02, 0.05, 1.0); }"});this.shadow=new dn(new oi(1.4,.7).rotateX(-Math.PI/2),c),this.shadow.renderOrder=1,this.scene.add(this.shadow)}canvas;game;style;renderer;scene=new Ap;camera;ground;assets;typeBatches=new Map;creatureBatches=new Map;witchBatch;stoneBatch;shadow;mpp;lastBuild={x:1/0,y:1/0,z:1/0,version:-1};post;shadows;shadowList=[];mist=null;width=1;height=1;stats={trees:0,bushes:0,creatures:0,batches:0,drawCalls:0,pendingArt:0,pendingGround:0};resize(e,t){const i=this.game.tuning.pixelSize;this.width=Math.max(1,Math.ceil(e/i)),this.height=Math.max(1,Math.ceil(t/i));const r=this.post.fullResolution?i:1;this.renderer.setSize(this.width*r,this.height*r,!1),this.post.resize(this.width,this.height,this.width*r,this.height*r),this.canvas.style.width=this.width*i+"px",this.canvas.style.height=this.height*i+"px",this.camera.aspect=this.width/this.height,this.camera.updateProjectionMatrix()}async prepare(){this.render(0,!1),this.drawCreatures(),this.ground.fill(this.renderer,this.game.witch.x,this.game.witch.z,50,1/0),await this.assets.whenIdle(),this.updateFrustum(),this.refresh(!0);for(let e=0;e<ii.length;e++)this.assets.prefetchType(e);for(const e of ii)this.assets.creatureArt(e.creature)}batchFor(e,t,i){let r=e.get(t);return r||(r=i(),r&&(e.set(t,r),this.scene.add(r.mesh))),r}frustum=new El;box=new zr;m4=new Ft;v3=new Y;drawn=new Set;pops=[];updateFrustum(){this.camera.updateMatrixWorld(),this.m4.multiplyMatrices(this.camera.projectionMatrix,this.camera.matrixWorldInverse),this.frustum.setFromProjectionMatrix(this.m4)}viewRect(e,t){const i=this.camera,r=i.position,a=this.game.witch,s=[];for(const u of[-1,1])for(const h of[-1,1]){const d=this.v3.set(u,h,1).unproject(i).sub(r).normalize();for(const f of[0,25]){let p=d.y<-.001?(f-r.y)/d.y:1/0;p>0||(p=1/0),p=Math.min(p,e+r.distanceTo(new Y(a.x,r.y,a.z))+t),s.push([r.x+d.x*p,r.z+d.z*p])}}s.push([r.x,r.z]);const o=s.map(u=>u[0]),c=s.map(u=>u[1]);return{minX:Math.min(...o)-t,maxX:Math.max(...o)+t,minZ:Math.min(...c)-t,maxZ:Math.max(...c)+t}}inView(e,t,i,r,a){const s=this.game.witch.x,o=this.game.witch.z,c=this.game.tuning.haze.far+a;return(e-s)**2+(t-o)**2>c*c?!1:(this.box.min.set(e-i/2-a,-a,t-r-a),this.box.max.set(e+i/2+a,r+a,t+a),this.frustum.intersectsBox(this.box))}inInnerView(e,t,i){const r=this.game.witch;if(Math.hypot(e-r.x,t-r.z)>this.game.tuning.haze.near)return!1;for(const a of[0,i]){const s=this.v3.set(e,a,t).project(this.camera);if(Math.abs(s.x)<.85&&Math.abs(s.y)<.85&&s.z<1)return!0}return!1}refresh(e=!1){const t=this.game,i=t.tuning,r=this.camera,a=i.viewMargin,s={x:r.position.x,y:r.position.y,z:r.position.z};if(!e&&Math.hypot(s.x-this.lastBuild.x,s.y-this.lastBuild.y,s.z-this.lastBuild.z)<a/3&&this.assets.version===this.lastBuild.version)return;this.lastBuild={...s,version:this.assets.version};const o=this.viewRect(i.haze.far,a),c=(o.minX+o.maxX)/2,u=(o.minZ+o.maxZ)/2,h=Math.max(o.maxX-o.minX,o.maxZ-o.minZ)/2,d=[],f=Vt.uMoonDir.value,p=-f.x/Math.max(.2,f.y),m=-f.z/Math.max(.2,f.y),x=new Map,_=new Set,g=(w,D)=>{let S=x.get(w);S||x.set(w,S=[]),S.push(D)},M=this.mpp;let E=0,b=0;for(const w of t.forest.treesNear(c,u,h)){const D=this.assets.typeArt(w.type);if(!D||!D.layout.big.length)continue;const S=D.atlas.frames,y=D.layout.big[w.variant%D.layout.big.length],L=S[y.top??y.bot];if(!this.inView(w.x,w.z,L.w*M,L.h*M,a))continue;g(w.type,{x:w.x,y:0,z:w.z,frame:S[y.bot],flip:w.flip}),y.top!==null&&g(w.type,{x:w.x,y:0,z:w.z,frame:S[y.top],flip:w.flip,top:!0});const C=L.w*M,N=L.h*M*(y.top===null?.2:.6);d.push({x:w.x+p*N,z:w.z+m*N,w:C*.8,d:C*.45}),_.add(`${w.x.toFixed(2)},${w.z.toFixed(2)},${L.h*M}`),E++}const R=(w,D)=>{for(const S of w){const y=this.assets.typeArt(S.type);if(!y)continue;const L=D(y.layout);if(!L.length)continue;const C=L[S.variant%L.length],N=y.atlas.frames,U=N[C.bot],I=N[C.top??C.bot];this.inView(S.x,S.z,I.w*M,I.h*M,a)&&(g(S.type,{x:S.x,y:0,z:S.z,frame:U,flip:S.flip}),C.top!==null&&g(S.type,{x:S.x,y:0,z:S.z,frame:N[C.top],flip:S.flip,top:!0}),d.push({x:S.x,z:S.z,w:U.w*M*.8,d:U.w*M*.3}),b++)}};R(t.forest.bushesNear(c,u,h),w=>w.small),R(t.forest.wallsNear(c,u,h),w=>w.walls.map(D=>({bot:D,top:null}))),R(t.forest.setPiecesNear(c,u,h),w=>w.set===null?[]:[w.set]);for(const[w,D]of this.typeBatches)x.has(w)||D.set([]);for(const[w,D]of x)this.batchFor(this.typeBatches,w,()=>{const y=this.assets.typeArt(w);return y&&new qa(y.atlas,M)})?.set(D);if(!e&&this.assets.pending===0){const w=(D,S)=>{const[y,L,C]=D.split(",").map(Number);this.inInnerView(y,L,C)&&this.pops.push(`${S} ${y.toFixed(0)},${L.toFixed(0)}`)};for(const D of _)this.drawn.has(D)||w(D,"appeared");for(const D of this.drawn)_.has(D)||w(D,"vanished")}this.drawn=_,this.stats.trees=E,this.stats.bushes=b,this.shadowList=d}drawCreatures(){const e=this.game,t=e.camera,i=e.tuning.haze.far,r=new Map,a=[];let s=0;for(const o of e.creatures){if(Math.abs(o.x-t.tx)>i||Math.abs(o.z-t.tz)>i)continue;const c=this.assets.creatureArt(o.species);if(!c)continue;const u=c.atlas.frames[c.frame(o.level,o.moving?Math.floor(o.walk)%2:0)];if(!this.inView(o.x,o.z,u.w*this.mpp,u.h*this.mpp,4))continue;let h=r.get(o.species);h||r.set(o.species,h=[]),h.push({x:o.x,y:0,z:o.z,frame:u,flip:o.facing<0}),a.push({x:o.x,z:o.z,w:u.w*this.mpp*.7,d:u.w*this.mpp*.25}),s++}for(const[o,c]of this.creatureBatches)r.has(o)||c.set([]);for(const[o,c]of r)this.batchFor(this.creatureBatches,o,()=>{const h=this.assets.creatureArt(o);return h&&new qa(h.atlas,this.mpp)})?.set(c);this.stats.creatures=s,this.game.tuning.shadows.on&&this.shadows.set(this.shadowList.concat(a))}render(e,t=!0){const i=this.game,r=i.tuning,a=Ef(i),s=a.angle*Math.PI/180,o=2*a.distance*Math.tan(r.camera.fov*Math.PI/360)/this.height,c=new Y(0,Math.cos(s),-Math.sin(s)),u=new Y(a.tx,a.ty,a.tz),h=u.dot(c),d=u.x;u.addScaledVector(c,Math.round(h/o)*o-h),u.x+=Math.round(d/o)*o-d;const f=new Y(0,Math.sin(s),Math.cos(s)).multiplyScalar(a.distance);this.camera.position.copy(u).add(f),this.camera.up.set(0,1,0),this.camera.lookAt(u);const p=r.spriteTilt;wr.uUp.value.set(0,1,0).lerp(c,p).normalize(),wr.uFacing.value.crossVectors(wr.uRight.value,wr.uUp.value).normalize(),wr.uTopFade.value=Ts(i.witch);const m=i.witch,x=hl(m,r);Vt.uGlowPos.value.set(m.x,x+r.glowHeight,m.z),Vt.uHazeCentre.value.set(m.x,m.z),Vt.uTime.value=e,this.mist?.follow(a.tx,a.tz);const _=Math.sin(e*2.4)*.12;this.witchBatch.set([{x:m.x,y:x+_-.4,z:m.z,frame:this.assets.witch.frames[0],flip:m.facing<0}]),this.shadow.position.set(m.x,.03,m.z),this.shadow.scale.setScalar(1-.5*Ts(m)),this.updateFrustum(),this.refresh(),this.drawCreatures(),this.assets.work(6);const g=Zn(r.haze.near,r.haze.far,Ts(m))*.8;this.stats.pendingGround=this.ground.fill(this.renderer,a.tx,a.tz-g*.5,g,3),this.stats.pendingArt=this.assets.pending,t&&(this.renderer.info.reset(),this.post.render(this.scene,this.camera),this.stats.drawCalls=this.renderer.info.render.calls,this.stats.batches=this.typeBatches.size+this.creatureBatches.size)}}const Lx="The art style: knobs from the Witch Art Lab. Paste a style saved in the Lab here (its whole saved JSON, or just its style object). Any knob left out follows the Lab's current default, so an empty style means the Lab's default look, and stays up to date as the art changes.",Dx="Lab default",Px={},Ix={_readme:Lx,name:Dx,style:Px};function Nx(n=Ix){const e=n??{},t=e.style&&typeof e.style=="object"?e.style:e,i=rx();for(const[r,a]of Object.entries(t))r in i&&(i[r]=a);return i}function Ux(n,e){const t=n.querySelector("#stick"),i=t.querySelector(".knob"),r=56;let a=null,s=0,o=0;const c=()=>n.classList.add("touch"),u=n.querySelector("#stick-zone");u.addEventListener("pointerdown",f=>{if(!(f.pointerType==="mouse"||a!==null)){c(),a=f.pointerId,s=f.clientX,o=f.clientY,t.style.left=s+"px",t.style.top=o+"px",t.classList.add("on");try{u.setPointerCapture(f.pointerId)}catch{}f.preventDefault()}}),u.addEventListener("pointermove",f=>{if(f.pointerId!==a)return;let p=f.clientX-s,m=f.clientY-o;const x=Math.hypot(p,m);x>r&&(p*=r/x,m*=r/x),i.style.transform=`translate(${p}px, ${m}px)`;const _=Math.min(1,x/r),g=.15,M=_<g?0:(_-g)/(1-g)/Math.max(1e-6,_);e.x=p/r*M,e.y=m/r*M});const h=f=>{f.pointerId===a&&(a=null,e.x=0,e.y=0,i.style.transform="",t.classList.remove("on"))};u.addEventListener("pointerup",h),u.addEventListener("pointercancel",h);const d=(f,p)=>{const m=n.querySelector(f);m.addEventListener("pointerdown",x=>{x.preventDefault(),x.stopPropagation(),p(),m.classList.add("down")}),m.addEventListener("pointerup",()=>m.classList.remove("down")),m.addEventListener("pointerleave",()=>m.classList.remove("down"))};d("#rise",()=>e.toggle=!0),d("#zoom-in",()=>e.zoom-=1),d("#zoom-out",()=>e.zoom+=1),window.addEventListener("touchstart",f=>{c(),f.touches.length===3&&(e.debug=!0)},{passive:!0})}const Ai=new URLSearchParams(location.search);let er=af(Ai.get("seed"));er===null&&(er=Math.floor(Math.random()*1e6),Ai.set("seed",String(er)),history.replaceState(null,"","?"+Ai.toString()+location.hash));const yi={...cr,bloom:{...cr.bloom},tiltShift:{...cr.tiltShift},shadows:{...cr.shadows},canopyShadow:{...cr.canopyShadow},mist:{...cr.mist}};Ai.get("shadows")==="off"&&(yi.shadows.on=!1);Ai.get("canopy")==="off"&&(yi.canopyShadow.on=!1);Ai.get("mist")==="off"&&(yi.mist.on=!1);const Za=Ai.get("tilt");Za==="off"?yi.tiltShift.on=!1:(Za==="before"||Za==="after")&&(yi.tiltShift.on=!0,yi.tiltShift.where=Za);Ai.get("bloom")==="off"&&(yi.bloom.on=!1);const xi=Sf(er,yi),Ox=document.getElementById("game"),fa=new Cx(Ox,xi,{...Nx(),pixel:yi.pixelSize}),Ss=new T0;Ux(document.body,Ss.touch);document.getElementById("version").textContent="v213 · bd85302";const Fx=document.getElementById("seed");Fx.innerHTML=`seed <a href="?seed=${er}">${er}</a>`;const nl=document.getElementById("debug"),wl=document.getElementById("start");let ra=Ai.has("debug");nl.classList.toggle("on",ra);const th=()=>fa.resize(window.innerWidth,window.innerHeight);window.addEventListener("resize",th);th();let bs=!1;requestAnimationFrame(()=>setTimeout(async()=>{await fa.prepare(),bs=!0,wl.classList.remove("loading")},0));let qc=null;function nh(){if(!bs||!xi.clock.paused)return!1;try{qc??=new AudioContext,qc.resume()}catch{}return xi.clock.paused=!1,wl.style.display="none",Ss.clearPresses(),!0}Ss.onAny=nh;wl.addEventListener("pointerdown",n=>{n.preventDefault(),nh()});document.addEventListener("visibilitychange",()=>{document.hidden&&(as=0)});let as=0,Zc=60,lo=0,$a=0;function ih(n){requestAnimationFrame(ih);const e=as?(n-as)/1e3:0;as=n,lo++,$a+=e,$a>=.5&&(Zc=lo/$a,lo=0,$a=0);const t=Ss.read();if(t.debug&&(ra=!ra,nl.classList.toggle("on",ra)),bf(xi,t,e),!!bs&&(fa.render(n/1e3),ra)){const i=xi.witch,r=fa.stats;nl.textContent=[`fps    ${Zc.toFixed(0)}`,`seed   ${er}`,`area   ${du(xi)}`,`mode   ${i.mode}`,`at     ${i.x.toFixed(0)}, ${i.z.toFixed(0)} m   zoom ${xi.camera.zoomStep}`,`trees  ${r.trees}  bushes ${r.bushes}  creatures ${r.creatures}`,`draws  ${r.drawCalls}  art queued ${r.pendingArt}  ground tiles ${r.pendingGround}`].join(`
`)}}requestAnimationFrame(ih);window.witch={game:xi,view:fa,areaUnderWitch:()=>du(xi),get ready(){return bs}};
