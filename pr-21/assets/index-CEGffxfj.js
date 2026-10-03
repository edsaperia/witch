(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function t(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(s){if(s.ep)return;s.ep=!0;const r=t(s);fetch(s.href,r)}})();function Wi(n){let e=n>>>0;return()=>{e=e+1831565813>>>0;let t=e;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}}function Ve(n,e,t){let i=Math.imul(n|0,374761393)^Math.imul(e|0,668265263)^Math.imul(t|0,2147483647);return i=Math.imul(i^i>>>13,1274126177),((i^i>>>16)>>>0)/4294967296}function ki(n,e,t){const i=Math.floor(n),s=Math.floor(e),r=n-i,a=e-s,o=r*r*(3-2*r),h=a*a*(3-2*a),l=Ve(i,s,t),u=Ve(i+1,s,t),f=Ve(i,s+1,t),d=Ve(i+1,s+1,t);return l+(u-l)*o+(f-l)*h+(l-u-f+d)*o*h}const Vn=(n,e,t)=>n+(e-n)*t,Vi=(n,e,t)=>Math.min(t,Math.max(e,n)),Jt=n=>{const e=Vi(n,0,1);return e*e*(3-2*e)};function Cd(n,e,t,i){const s=Math.max(1,n.camera.zoomSteps),r=Vi(Math.round(n.camera.startZoom),0,s-1),a=s>1?r/(s-1):0;return{zoomStep:r,zoom:a,tx:e,ty:t,tz:i,vx:0,vy:0,vz:0,ax:0,az:0,lift:0}}function Za(n,e,t,i,s){const r=i*s,a=Math.exp(-r),o=n-t,h=e+i*o;return[t+(o+h*s)*a,(e-i*h*s)*a]}function Ld(n,e,t,i,s,r,a){const o=a.camera,h=Math.max(1,o.zoomSteps),l=Vi(n.zoomStep+Math.sign(e),0,h-1),u=h>1?l/(h-1):0;let f=i.x*o.lookAhead,d=i.z*o.lookAhead;const p=Math.hypot(f,d);p>o.lookAheadMax&&(f*=o.lookAheadMax/p,d*=o.lookAheadMax/p);const g=1-Math.exp(-o.lookAheadEase*r),v=n.ax+(f-n.ax)*g,x=n.az+(d-n.az)*g,[m,M]=Za(n.tx,n.vx,t.x+v,o.follow,r),[S,b]=Za(n.ty,n.vy,t.y,o.follow,r),[A,w]=Za(n.tz,n.vz,t.z+x,o.follow,r),L=n.zoom+(u-n.zoom)*(1-Math.exp(-o.zoomEase*r)),_=n.lift+(s-n.lift)*(1-Math.exp(-o.liftEase*r));return{zoomStep:l,zoom:L,tx:m,ty:S,tz:A,vx:M,vy:b,vz:w,ax:v,az:x,lift:Vi(_,0,1)}}function eu(n,e,t){const i=t.camera.ground,s=t.camera.treetop,r=Jt(e),a=Vn(Vn(i.angleIn,i.angleOut,n.zoom),Vn(s.angleIn,s.angleOut,n.zoom),r),o=Vn(Vn(i.distanceIn,i.distanceOut,n.zoom),Vn(s.distanceIn,s.distanceOut,n.zoom),r),h=a*Math.PI/180;return{angle:a,distance:o,x:n.tx,y:n.ty+Math.sin(h)*o,z:n.tz+Math.cos(h)*o,tx:n.tx,ty:n.ty,tz:n.tz}}const Pd=.1,Dd=()=>({time:0,paused:!0});function Id(n,e){if(n.paused||!(e>0))return 0;const t=Math.min(Pd,e);return n.time+=t,t}const Nd={moor:{treeDensity:.65},"fern-forest":{treeDensity:1},"muddy-forest":{treeDensity:1},"stone-shrine":{treeDensity:.6},"tangly-forest":{treeDensity:1},"wispy-forest":{treeDensity:1},"hazel-forest":{treeDensity:1},garden:{treeDensity:.75},"twiggy-forest":{treeDensity:1},ancient:{treeDensity:.9},norway:{treeDensity:1},"alder-forest":{treeDensity:.9},meadow:{treeDensity:.55},"old-oaks":{treeDensity:.9},"berry-thicket":{treeDensity:1},wetland:{treeDensity:.75},stream:{treeDensity:.8},"rocky-slope":{treeDensity:.75},bog:{treeDensity:.7},deadwood:{treeDensity:.8},"cave-mouth":{treeDensity:.75},grassland:{treeDensity:.55},"beaver-pond":{treeDensity:.8},"log-pile":{treeDensity:.7},heath:{treeDensity:.65},"old-pinewood":{treeDensity:1},ravine:{treeDensity:.75},"bluebell-glade":{treeDensity:.8},"holly-thicket":{treeDensity:1},"honeysuckle-tangle":{treeDensity:1}},Od={types:Nd};function zl(n,e){if(typeof document<"u"){const t=document.createElement("canvas");return t.width=n,t.height=e,t}return new OffscreenCanvas(n,e)}function Ua(n){let e=n>>>0;return()=>{e=e+1831565813>>>0;let t=e;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}}const Ae=(n,e,t)=>e+(t-e)*n(),tu=(n,e)=>e[Math.floor(n()*e.length)];function Pt(n,e,t){let i=Math.imul(n|0,374761393)^Math.imul(e|0,668265263)^Math.imul(t|0,2147483647);return i=Math.imul(i^i>>>13,1274126177),((i^i>>>16)>>>0)/4294967296}function Bi(n,e,t){const i=Math.floor(n),s=Math.floor(e),r=n-i,a=e-s,o=r*r*(3-2*r),h=a*a*(3-2*a),l=Pt(i,s,t),u=Pt(i+1,s,t),f=Pt(i,s+1,t),d=Pt(i+1,s+1,t);return l+(u-l)*o+(f-l)*h+(l-u-f+d)*o*h}function _e(n,e,t){n=(n%1+1)%1,e=Math.max(0,Math.min(1,e)),t=Math.max(0,Math.min(1,t));const i=Math.floor(n*6),s=n*6-i,r=t*(1-e),a=t*(1-s*e),o=t*(1-(1-s)*e),[h,l,u]=[[t,o,r],[a,t,r],[r,t,o],[r,a,t],[o,r,t],[t,r,a]][i%6];return[Math.round(h*255),Math.round(l*255),Math.round(u*255)]}const c={BODY:1,BELLY:2,ACCENT:3,EYE:4,GLINT:5,TRUNK:6,LEAF:7,LEAF2:8,CLOTH:9,SKIN:10,HAIR:11,BROOM:12,STRAW:13,BODY2:14,BARK2:15,FLOWER:16,PUPIL:17,MAGIC:18,BARKD:19,LINE:20,IRIS:21,MAGIC2:22,NOSE:23,EAR:24,BODY3:25,LEAF3:26,BARKL:27,HAT:28,PHONES:29,TOP:30,JACKET:31,JEANS:32,SHOES:33,WATER:34,STONE:35,STONED:36,MOSS:37,CRYSTAL:38,RUNE:39,GLOW:40,WOOD:41,COLLAR:42,HAT1:43,HAT2:44,POM:45,SHADES:46,FRAME:47,SHOE:48,SOLE:49,WOKEN:50,WEB:51},Ja=4;function nu(n,e,t,i=.12){const s=(r,a,o,h)=>{const l=o-r,u=h-a,f=Math.max(0,Math.min(1,((n-r)*l+(e-a)*u)/(l*l+u*u)));return Math.hypot(n-r-l*f,e-a-u*f)<i};switch((t%Ja+Ja)%Ja){case 0:return s(.5,.08,.5,.92)||s(.5,.1,.18,.4)||s(.5,.1,.82,.4);case 1:return s(.5,.08,.5,.92)||s(.5,.5,.18,.18)||s(.5,.5,.82,.18);case 2:return s(.2,.1,.8,.9)||s(.8,.1,.2,.9)||s(.5,.08,.5,.92);default:return s(.3,.08,.3,.92)||s(.3,.12,.75,.35)||s(.75,.35,.3,.55)||s(.3,.55,.78,.92)}}const Ud=new Set([c.GLINT,c.MAGIC,c.MAGIC2,c.RUNE,c.GLOW,c.COLLAR,c.WOKEN]);function Cc(n,e=!0,t=8){const i=n.length,s=[];if(i<3)return n.slice();const r=o=>e?n[(o+i)%i]:n[Math.max(0,Math.min(i-1,o))],a=e?i:i-1;for(let o=0;o<a;o++){const h=r(o-1),l=r(o),u=r(o+1),f=r(o+2),d=Math.max(2,Math.ceil(Math.hypot(u[0]-l[0],u[1]-l[1])/1.5),t);for(let p=0;p<d;p++){const g=p/d,v=g*g,x=v*g;s.push([0,1].map(m=>.5*(2*l[m]+(-h[m]+u[m])*g+(2*h[m]-5*l[m]+4*u[m]-f[m])*v+(-h[m]+3*l[m]-3*u[m]+f[m])*x)))}}return e||s.push(n[i-1]),s}function Fd(n,{cap:e=1,capEnd:t=e}={}){const i=[],s=[],r=n.length;for(let h=0;h<r;h++){const l=n[Math.max(0,h-1)],u=n[Math.min(r-1,h+1)];let f=u[0]-l[0],d=u[1]-l[1];const p=Math.hypot(f,d)||1;f/=p,d/=p;const g=n[h][2]/2;i.push([n[h][0]-d*g,n[h][1]+f*g]),s.push([n[h][0]+d*g,n[h][1]-f*g])}const a=(h,l,u,f)=>{let d=h[0]-l[0],p=h[1]-l[1];const g=Math.hypot(d,p)||1;return[h[0]+d/g*u/2*f,h[1]+p/g*u/2*f]};return[...i,a(n[r-1],n[r-2],n[r-1][2],t),...s.reverse(),a(n[0],n[1],n[0][2],e)]}const Ct=(n,e)=>[n[0]+e[0],n[1]+e[1]],yi=(n,e,t)=>[n[0]+(e[0]-n[0])*t,n[1]+(e[1]-n[1])*t];function Fa(n,e,t,i,s,r=1){const a=[];for(let o=0;o<n.length;o++){if(a.push(n[o]),o<e||o>=t)continue;const h=n[o],l=n[(o+1)%n.length];let u=l[0]-h[0],f=l[1]-h[1];const d=Math.hypot(u,f)||1,p=f/d*r,g=-u/d*r;for(let v=1;v<=i;v++){const x=(v-.5)/i,m=yi(h,l,x),M=[m[0]+p*s-u/d*s*.5,m[1]+g*s-f/d*s*.5];a.push(yi(h,l,x-.45/i),M,yi(h,l,x+.35/i))}}return a}function Lc(n,e,t){const i=new Uint8Array(n*e);let s=1/0,r=-1/0;for(const a of t)s=Math.min(s,a[1]),r=Math.max(r,a[1]);for(let a=Math.max(0,Math.floor(s));a<=Math.min(e-1,Math.ceil(r));a++){const o=a+.5,h=[];for(let l=0,u=t.length-1;l<t.length;u=l++){const[f,d]=t[l],[p,g]=t[u];d>o!=g>o&&h.push(f+(o-d)/(g-d)*(p-f))}h.sort((l,u)=>l-u);for(let l=0;l+1<h.length;l+=2)for(let u=Math.max(0,Math.ceil(h[l]-.5));u<=Math.min(n-1,Math.floor(h[l+1]-.5));u++)i[a*n+u]=1}return i}function Bd(n,e,t){const s=new Float32Array(n*e),r=new Float32Array(n*e);for(let h=0;h<n*e;h++)t[h]&&(s[h]=1e4,r[h]=1e4);const a=h=>s[h]*s[h]+r[h]*r[h],o=(h,l,u,f,d)=>{const p=l+f,g=u+d;let v,x;if(p<0||g<0||p>=n||g>=e)v=f,x=d;else{const m=g*n+p;v=s[m]+f,x=r[m]+d}v*v+x*x<a(h)&&(s[h]=v,r[h]=x)};for(let h=0;h<e;h++){for(let l=0;l<n;l++){const u=h*n+l;t[u]&&(o(u,l,h,-1,0),o(u,l,h,0,-1),o(u,l,h,-1,-1),o(u,l,h,1,-1))}for(let l=n-1;l>=0;l--){const u=h*n+l;t[u]&&o(u,l,h,1,0)}}for(let h=e-1;h>=0;h--){for(let l=n-1;l>=0;l--){const u=h*n+l;t[u]&&(o(u,l,h,1,0),o(u,l,h,0,1),o(u,l,h,1,1),o(u,l,h,-1,1))}for(let l=0;l<n;l++){const u=h*n+l;t[u]&&o(u,l,h,-1,0)}}return{vx:s,vy:r}}class Mn{constructor(e,t,i=1){this.sx=i,this.w=Math.round(e*i),this.h=t|0,this.m=new Uint8Array(this.w*this.h),this.n=new Float32Array(this.w*this.h*3),this.g=new Uint8Array(this.w*this.h)}inb(e,t){return e>=0&&t>=0&&e<this.w&&t<this.h}get(e,t){return e|=0,t|=0,this.inb(e,t)?this.m[t*this.w+e]:0}put(e,t,i,s=0,r=0,a=1){this.px(e*this.sx,t,i,s,r,a)}px(e,t,i,s=0,r=0,a=1){if(e=Math.floor(e),t=Math.floor(t),!this.inb(e,t))return;const o=t*this.w+e;this.m[o]=i,this.n[o*3]=s,this.n[o*3+1]=r,this.n[o*3+2]=a}recolour(e,t,i){e=Math.floor(e),t=Math.floor(t),this.inb(e,t)&&this.m[t*this.w+e]&&(this.m[t*this.w+e]=i)}ellipse(e,t,i,s,r,a={}){const{onlyOn:o,density:h=1,noise:l=0,seed:u=0,round:f=1}=a;e*=this.sx,i*=this.sx;for(let d=Math.max(0,Math.floor(t-s-1));d<Math.min(this.h,t+s+1);d++)for(let p=Math.max(0,Math.floor(e-i-1));p<Math.min(this.w,e+i+1);p++){const g=(p+.5-e)/i,v=(d+.5-t)/s,x=g*g+v*v;if(x>1)continue;const m=d*this.w+p;if(o&&!o.has(this.m[m]))continue;if(h<1){const A=l?Bi(p/3.2,d/3.2,u)*l+(1-l)*.5:.5;if(Pt(p,d,u+77)>h*(.4+A*1.2)*(1.15-x*.5))continue}const M=g*f,S=v*f,b=Math.hypot(M,S,Math.sqrt(Math.max(0,1-x))+.15);this.px(p,d,r,M/b,S/b,(Math.sqrt(Math.max(0,1-x))+.15)/b)}}line(e,t,i,s,r,a,o,h=1){e*=this.sx,i*=this.sx;const l=Math.max(1,Math.ceil(Math.hypot(i-e,s-t)));for(let u=0;u<=l;u++){const f=u/l,d=e+(i-e)*f,p=t+(s-t)*f,g=Math.max(.5,(r+(a-r)*f)/2);for(let v=Math.floor(p-g);v<=p+g;v++)for(let x=Math.floor(d-g);x<=d+g;x++){const m=(x+.5-d)/g,M=(v+.5-p)/g;if(m*m+M*M>1)continue;const S=m*h,b=Math.hypot(S,M*.3,1);this.px(x,v,o,S/b,M*.3/b,1/b)}}}tri(e,t){let[[i,s],[r,a],[o,h]]=e;i*=this.sx,r*=this.sx,o*=this.sx;const l=(g,v,x,m,M,S)=>(g-M)*(m-S)-(x-M)*(v-S),u=Math.max(0,Math.floor(Math.min(i,r,o))),f=Math.min(this.w,Math.ceil(Math.max(i,r,o))),d=Math.max(0,Math.floor(Math.min(s,a,h))),p=Math.min(this.h,Math.ceil(Math.max(s,a,h)));for(let g=d;g<p;g++)for(let v=u;v<f;v++){const x=v+.5,m=g+.5,M=l(x,m,i,s,r,a),S=l(x,m,r,a,o,h),b=l(x,m,o,h,i,s);(M<0||S<0||b<0)&&(M>0||S>0||b>0)||this.px(v,g,t,0,-.2,.98)}}shape(e,t,i={}){return this.fillMask(Lc(this.w,this.h,Cc(e,!0,i.per||6)),t,i)}limb(e,t,i={}){return this.shape(Fd(e,i),t,i)}fillMask(e,t,{group:i=1,line:s=!1,depth:r=0,round:a=1,onlyOn:o=null,keepNormals:h=!1,tilt:l=[0,0],lineMat:u=c.LINE}={}){const{w:f,h:d}=this;if(o)for(let x=0;x<f*d;x++)e[x]&&!o.has(this.m[x])&&(e[x]=0);const{vx:p,vy:g}=Bd(f,d,e);let v=r;if(!v){for(let x=0;x<f*d;x++)e[x]&&(v=Math.max(v,Math.hypot(p[x],g[x])));v=Math.max(1.5,Math.min(v*.9,2.5+v*.35))}for(let x=0;x<d;x++)for(let m=0;m<f;m++){const M=x*f+m;if(!e[M])continue;if(h){this.m[M]=t;continue}const S=Math.hypot(p[M],g[M]),b=Math.min(1,Math.max(0,(S-.5)/v)),A=Math.min(2.6,(1-b)/Math.sqrt(Math.max(.02,1-(1-b)*(1-b))))*a;let w=p[M]/(S||1)*A+l[0],L=g[M]/(S||1)*A+l[1];const _=Math.hypot(w,L,1);this.m[M]=t,this.n[M*3]=w/_,this.n[M*3+1]=L/_,this.n[M*3+2]=1/_}if(s&&!h){const x=[];for(let m=0;m<d;m++)for(let M=0;M<f;M++){const S=m*f+M;if(e[S])for(const[b,A]of[[1,0],[-1,0],[0,1],[0,-1]]){const w=M+b,L=m+A;if(w<0||L<0||w>=f||L>=d)continue;const _=L*f+w;if(!e[_]&&this.m[_]&&this.g[_]!==i&&this.m[_]!==u){x.push(S);break}}}for(const m of x)this.m[m]=u}if(!h)for(let x=0;x<f*d;x++)e[x]&&(this.g[x]=i);return e}mark(e,t,i,s={}){return this.fillMask(Lc(this.w,this.h,Cc(e,!0,6)),t,{...s,onlyOn:new Set(i),keepNormals:!0})}grid(e,t,i=0,s=0,{round:r=1,flipX:a=!1}={}){const o=Math.max(...e.map(u=>u.length)),h=new Uint8Array(this.w*this.h),l=new Map;e.forEach((u,f)=>[...u].forEach((d,p)=>{const g=t[d];if(!g)return;const v=i+(a?o-1-p:p),x=s+f;this.inb(v,x)&&(h[x*this.w+v]=1,l.set(x*this.w+v,g))})),this.fillMask(h,c.BODY,{round:r,depth:2.5});for(const[u,f]of l)this.m[u]=f}}function zi(n,e,t,i=t.outline,s=zl){const{w:r,h:a}=n,o=()=>s(r,a),h=o(),l=o(),u=o(),f=h.getContext("2d").createImageData(r,a),d=l.getContext("2d").createImageData(r,a),p=u.getContext("2d").createImageData(r,a),g=i==="none"?null:i==="dark"?[22,18,30]:"tint";for(let v=0;v<a;v++)for(let x=0;x<r;x++){const m=v*r+x,M=n.m[m],S=m*4;if(!M){if(!g)continue;const _=[n.get(x+1,v),n.get(x-1,v),n.get(x,v+1),n.get(x,v-1)].find(P=>P);if(!_)continue;const E=g==="tint"?(e[_]||[0,0,0]).map(P=>P*.35|0):g;f.data.set([...E,255],S),d.data.set([128,128,255,255],S),p.data.set([128,128,255,255],S);continue}let b=e[M];M===c.LINE&&!b&&(b=g==="tint"||!g?(e[c.BODY2]||[0,0,0]).map(_=>_*.55|0):g),b=b||[255,0,255],f.data.set([...b,Ud.has(M)?254:255],S);const A=n.n[m*3],w=n.n[m*3+1],L=n.n[m*3+2];d.data.set([A*127+128,w*127+128,L*255,255],S),p.data.set([-A*127+128,w*127+128,L*255,255],S)}return h.getContext("2d").putImageData(f,0,0),l.getContext("2d").putImageData(d,0,0),u.getContext("2d").putImageData(p,0,0),{A:h,N:l,NF:u,w:r,h:a}}const Gi=n=>{const e=Math.hypot(n[0],n[1],n[2])||1;return[n[0]/e,n[1]/e,n[2]/e]},mr=(n,e)=>[n[1]*e[2]-n[2]*e[1],n[2]*e[0]-n[0]*e[2],n[0]*e[1]-n[1]*e[0]],Ft=(n,e)=>n[0]*e[0]+n[1]*e[1]+n[2]*e[2],Un=(n,e)=>[n[0]-e[0],n[1]-e[1],n[2]-e[2]],R={add:(n,e)=>[n[0]+e[0],n[1]+e[1],n[2]+e[2]],sub:Un,mul:(n,e)=>[n[0]*e,n[1]*e,n[2]*e],lerp:(n,e,t)=>[n[0]+(e[0]-n[0])*t,n[1]+(e[1]-n[1])*t,n[2]+(e[2]-n[2])*t],norm:Gi,cross:mr,dot:Ft};function Pc(n,e=[0,1,0]){const t=Gi(n);let i=mr(e,t);Math.hypot(...i)<1e-4&&(i=mr([0,0,1],t)),i=Gi(i);const s=mr(t,i);return[t,s,i]}function iu(n,e){const t=Ft(n,e.axes[0]),i=Ft(n,e.axes[1]),s=Ft(n,e.axes[2]),[r,a,o]=e.r,h=Math.hypot(t/r,i/a,s/o),l=Math.hypot(t/(r*r),i/(a*a),s/(o*o));return l>1e-9?h*(h-1)/l:-Math.min(r,a,o)}function su(n,e){const{ba:t,l2:i,rr:s,a2:r,il2:a,r1:o,r2:h}=e,l=Ft(n,t),u=l-i,f=[n[0]*i-t[0]*l,n[1]*i-t[1]*l,n[2]*i-t[2]*l],d=Ft(f,f),p=l*l*i,g=u*u*i,v=Math.sign(s)*s*s*d;return Math.sign(u)*r*g>v?Math.sqrt(d+g)*a-h:Math.sign(l)*r*p<v?Math.sqrt(d+p)*a-o:(Math.sqrt(d*r*a)+l*s)*a-o}function ru(n,e){const t=Math.abs(Ft(n,e.axes[0]))-e.h[0]+e.round,i=Math.abs(Ft(n,e.axes[1]))-e.h[1]+e.round,s=Math.abs(Ft(n,e.axes[2]))-e.h[2]+e.round;return Math.hypot(Math.max(t,0),Math.max(i,0),Math.max(s,0))+Math.min(Math.max(t,i,s),0)-e.round}const kd=(n,e)=>e*(Math.sin(n[0]*23+n[1]*7)*Math.sin(n[1]*19-n[2]*11)+.5*Math.sin(n[2]*41+n[0]*29)),Dc=(n,e)=>n.type==="ell"?iu(Un(e,n.cw),n):n.type==="box"?ru(Un(e,n.cw),n):su(Un(e,n.aw),n),js=(n,e)=>n.rough?Dc(n,e)+kd(e,n.rough):Dc(n,e);class Xe{constructor({blend:e=.07}={}){this.parts=[],this.flats=[],this.blend=e,this.anchors={feet:[]}}ell(e,t,i,s={}){const r=s.axes||(s.dir?Pc(s.dir,s.up):[[1,0,0],[0,1,0],[0,0,1]]);return this.parts.push({type:"ell",c:e,r:t,axes:r,mat:i,group:s.group??1,extra:!!s.extra,paint:s.paint,rough:s.rough,cut:!!s.cut}),this}box(e,t,i,s={}){const r=s.axes||(s.dir?Pc(s.dir,s.up):[[1,0,0],[0,1,0],[0,0,1]]);return this.parts.push({type:"box",c:e,h:t,round:Math.min(s.round??.02,...t),axes:r,mat:i,group:s.group??1,extra:!!s.extra,paint:s.paint,rough:s.rough,cut:!!s.cut}),this}seg(e,t,i,s,r,a={}){return this.parts.push({type:"cone",a:e,b:t,r1:i,r2:s,mat:r,group:a.group??1,extra:!!a.extra,paint:a.paint,rough:a.rough,cut:!!a.cut}),this}chain(e,t,i={}){for(let s=0;s+1<e.length;s++)this.seg(e[s].slice(0,3),e[s+1].slice(0,3),e[s][3],e[s+1][3],t,i);return this}flat(e,t,i,s,r,a,o={}){return this.flats.push({c:e,u:Gi(t),v:Gi(i),su:s,sv:r,mask:a,group:o.group??30,extra:!!o.extra,bend:o.bend??.35}),this}field(e){let t=1/0;for(const i of this.parts){if(i.extra||i.cut)continue;let s;if(i.type==="ell")s=iu(Un(e,i.c),i);else if(i.type==="box")s=ru(Un(e,i.c),i);else{const r=Un(i.b,i.a),a=Math.max(1e-9,Ft(r,r)),o=i.r1-i.r2;s=su(Un(e,i.a),{ba:r,l2:a,rr:o,a2:a-o*o,il2:1/a,r1:i.r1,r2:i.r2})}s<t&&(t=s)}return t}static surface(e,t,i){const s=1/Math.hypot(i[0]/t[0],i[1]/t[1],i[2]/t[2]);return[e[0]+i[0]*s,e[1]+i[1]*s,e[2]+i[2]*s]}}const Ic={towards:.6,away:-.6},zd=.52;function Ln(n,{height:e,scale:t,facing:i="towards",yaw:s=Ic[i]??Ic.towards,pitch:r=zd,lineGap:a=.12}={}){const o=Math.cos(s),h=Math.sin(s),l=Math.cos(r),u=Math.sin(r),f=k=>[k[0]*o-k[2]*h,k[1],k[0]*h+k[2]*o],d=k=>[k[0]*o+k[2]*h,k[1],-k[0]*h+k[2]*o],p=[0,-u,-l],g=[0,l,-u],v=[1,0,0],x=[0,u,l],m=n.blend,M=n.parts.map(k=>{if(k.type==="ell"){const Fe=f(k.c),qe=k.axes.map(f),Ke=Math.max(...k.r);return{...k,cw:Fe,axes:qe,bc:Fe,br:Ke+(k.rough||0)*1.5}}if(k.type==="box"){const Fe=f(k.c),qe=k.axes.map(f);return{...k,cw:Fe,axes:qe,bc:Fe,br:Math.hypot(...k.h)+(k.rough||0)*1.5}}const re=f(k.a),ae=f(k.b),ge=Un(ae,re),ke=Math.max(1e-9,Ft(ge,ge)),Ce=k.r1-k.r2;return{...k,aw:re,ba:ge,l2:ke,rr:Ce,a2:ke-Ce*Ce,il2:1/ke,bc:R.lerp(re,ae,.5),br:Math.sqrt(ke)/2+Math.max(k.r1,k.r2)}}),S=n.flats.map(k=>{const re=f(k.c),ae=f(k.u),ge=f(k.v);return{...k,cw:re,uw:ae,vw:ge,nw:Gi(mr(ae,ge)),bc:re,br:Math.hypot(k.su,k.sv)}}),b=[...M,...S],A=k=>{const re=Ft(k.bc,v),ae=Ft(k.bc,g),ge=k.br+(k.uw?0:m);return[re-ge,re+ge,ae-ge,ae+ge]};for(const k of b)[k.x0,k.x1,k.u0,k.u1]=A(k);const w=b.filter(k=>!k.extra&&!k.cut),L=Math.min(...w.map(k=>k.u0+(k.uw?0:m))),_=Math.max(...w.map(k=>k.u1-(k.uw?0:m))),E=t??e/Math.max(1e-6,_-L),P=Math.min(...b.map(k=>k.x0)),T=Math.max(...b.map(k=>k.x1)),D=Math.min(...b.map(k=>k.u0)),U=Math.max(...b.map(k=>k.u1)),N=Math.ceil((T-P)*E)+4,F=Math.ceil((U-D)*E)+2,H=new Mn(N,F),W=new Float32Array(N*F).fill(1/0),te=new Int16Array(N*F).fill(-1),K=8,B=Math.ceil(N/K),I=Math.ceil(F/K),q=Array.from({length:B*I},()=>[]);b.forEach((k,re)=>{const ae=Math.max(0,Math.floor((k.x0-P)*E/K)),ge=Math.min(B-1,Math.floor(((k.x1-P)*E+2)/K)),ke=Math.max(0,Math.floor((U-k.u1)*E/K)),Ce=Math.min(I-1,Math.floor(((U-k.u0)*E+1)/K));for(let Fe=ke;Fe<=Ce;Fe++)for(let qe=ae;qe<=ge;qe++)q[Fe*B+qe].push(re)});const $=.25/E,ce=(k,re)=>{const ae=Math.max(m-Math.abs(k-re),0)/m;return Math.min(k,re)-ae*ae*m*.25};for(let k=0;k<F;k++)for(let re=0;re<N;re++){const ae=q[Math.floor(k/K)*B+Math.floor(re/K)];if(!ae.length)continue;const ge=P+(re+.5-1)/E,ke=U-(k+.5)/E,Ce=R.add(R.add(R.mul(v,ge),R.mul(g,ke)),R.mul(x,50));let Fe=1/0,qe=-1/0;const Ke=[],wt=[];for(const Qe of ae){const Ge=b[Qe],O=Un(Ce,Ge.bc),y=Ft(O,p),z=Ge.br+(Ge.uw?0:m),Z=Ft(O,O)-z*z,ee=y*y-Z;if(ee<0)continue;if(Ge.uw){wt.push(Ge);continue}if(Ge.cut){Ke.push(Ge);continue}const ue=Math.sqrt(ee);Fe=Math.min(Fe,-y-ue),qe=Math.max(qe,-y+ue),Ke.push(Ge)}let Ut=1/0,nn=-1,_t=0,Et=null;if(Ke.length){const Qe=new Map;for(const y of Ke){let z=Qe.get(y.group);z||Qe.set(y.group,z=[]),z.push(y)}const Ge=(y,z)=>{let Z=1/0;for(const ee of y)ee.cut||(Z=Z===1/0?js(ee,z):ce(Z,js(ee,z)));for(const ee of y)ee.cut&&(Z=Math.max(Z,-js(ee,z)));return Z};let O=Math.max(0,Fe);for(let y=0;y<96&&O<qe;y++){const z=R.add(Ce,R.mul(p,O));let Z=1/0,ee=null;for(const[ue,fe]of Qe){const se=Ge(fe,z);se<Z&&(Z=se,ee=ue)}if(Z<$){const ue=Qe.get(ee),fe=.5/E;Et=Gi([Ge(ue,[z[0]+fe,z[1],z[2]])-Ge(ue,[z[0]-fe,z[1],z[2]]),Ge(ue,[z[0],z[1]+fe,z[2]])-Ge(ue,[z[0],z[1]-fe,z[2]]),Ge(ue,[z[0],z[1],z[2]+fe])-Ge(ue,[z[0],z[1],z[2]-fe])]);let se=ue[0],oe=1/0;for(const pe of ue){if(pe.cut)continue;const De=js(pe,z);De<oe&&(oe=De,se=pe)}for(const pe of ue)if(pe.cut&&-js(pe,z)>oe-$*2){se=pe;break}Ut=O,nn=ee,_t=se.paint?se.paint(d(z),se)??se.mat:se.mat;break}O+=Math.max(Z*.9,$*.5)}}for(const Qe of wt){const Ge=Ft(p,Qe.nw);if(Math.abs(Ge)<1e-4)continue;const O=Ft(Un(Qe.cw,Ce),Qe.nw)/Ge;if(O>=Ut)continue;const y=R.add(Ce,R.mul(p,O)),z=Un(y,Qe.cw),Z=Ft(z,Qe.uw)/Qe.su,ee=Ft(z,Qe.vw)/Qe.sv;if(Math.abs(Z)>1||Math.abs(ee)>1)continue;const ue=Qe.mask(Z,ee);if(!ue)continue;let fe=Ge>0?R.mul(Qe.nw,-1):Qe.nw;fe=Gi(R.add(fe,R.add(R.mul(Qe.uw,Z*Qe.bend),R.mul(Qe.vw,ee*Qe.bend*.5)))),Ut=O,nn=Qe.group,_t=ue,Et=fe}if(!Et||!_t)continue;const V=k*N+re;W[V]=Ut,te[V]=nn,H.px(re,k,_t,Ft(Et,v),-Ft(Et,g),Ft(Et,x))}const de=[];for(let k=0;k<F;k++)for(let re=0;re<N;re++){const ae=k*N+re;if(H.m[ae])for(const[ge,ke]of[[1,0],[-1,0],[0,1],[0,-1]]){const Ce=re+ge,Fe=k+ke;if(Ce<0||Fe<0||Ce>=N||Fe>=F)continue;const qe=Fe*N+Ce;if(H.m[qe]&&te[qe]!==te[ae]&&W[qe]-W[ae]>a){de.push(ae);break}}}for(const k of de)[c.EYE,c.GLINT,c.MAGIC,c.MAGIC2,c.NOSE,c.COLLAR,c.WOKEN,c.RUNE,c.GLOW].includes(H.m[k])||(H.m[k]=c.LINE);for(let k=0;k<F;k++)for(let re=0;re<N;re++){const ae=k*N+re;if(H.m[ae]!==c.EYE)continue;const ge=k>0&&H.m[ae-N]===c.EYE,ke=re>0&&H.m[ae-1]===c.EYE,Ce=re+1<N&&H.m[ae+1]===c.EYE&&k+1<F&&H.m[ae+N]===c.EYE;!ge&&!ke&&Ce&&(H.m[ae]=c.GLINT)}let me=-1;for(let k=F-1;k>=0&&me<0;k--)for(let re=0;re<N;re++)if(H.m[k*N+re]){me=k;break}const j=me>=0&&me<F-1?F-1-me:0;if(me>=0&&me<F-1){const k=F-1-me;for(let re=F-1;re>=0;re--)for(let ae=0;ae<N;ae++){const ge=re*N+ae,ke=(re-k)*N+ae,Ce=re-k>=0;H.m[ge]=Ce?H.m[ke]:0,H.g[ge]=Ce?H.g[ke]:0;for(let Fe=0;Fe<3;Fe++)H.n[ge*3+Fe]=Ce?H.n[ke*3+Fe]:0}}return H.bodyH=Math.round((_-L)*E),{sp:H,s:E,project:k=>{const re=f(k);return[+((re[0]-P)*E+1).toFixed(1),+((U-Ft(re,g))*E+j).toFixed(1)]}}}const $n=(n,e=9,t=.3)=>Pt(Math.floor(n[0]*e),Math.floor(n[1]*e)+Math.floor(n[2]*e)*97,7)<t,os={wing:(n,e)=>(t,i)=>{const s=(t+1)/2,r=1-.35*s*s,a=-1+.55*s+.18*Math.abs(Math.sin(s*Math.PI*6));return i>r||i<a?null:i>r-.35*(1-s*.5)?e:Math.floor(s*9)%2?n:e},ear:(n,e=c.EAR,t=c.BODY3)=>(i,s)=>{const r=(s+1)/2,a=.95*Math.sin(Math.PI*Math.min(1,.15+r*.85))*(1-r*.35);return Math.abs(i)>a?null:r>.82?t:Math.abs(i)<a*.5&&r<.7&&r>.12?e:n},flame:(n,e)=>(t,i)=>{const s=(i+1)/2,r=Math.sin(Math.PI*Math.min(1,s*1.1))*(1-s)*1.4;return Math.abs(t)>r?null:Math.abs(t)<r*.45&&s<.6?e:n},membrane:n=>(e,t)=>{const i=(e+1)/2,s=-1+.35*Math.abs(Math.sin(i*Math.PI*3));return t<s||t>1-.2*i?null:n},spotted:(n,e,t)=>(i,s)=>{if(Math.hypot(i,s*1.2)>1)return null;const a=Math.hypot(i-.35,s-.1);return a<.18?t:a<.3?e:n}},Gd={hair:c.HAIR,hat:c.HAT,headphones:c.PHONES,top:c.TOP,jacket:c.JACKET,jeans:c.JEANS,sneakers:c.SHOES,broom:c.BROOM,bristles:c.STRAW,skin:c.SKIN},Nc={hair:[.01,.7,.85],hat:[.74,.45,.45],headphones:[.92,.55,.9],top:[.13,.15,.95],jacket:[.72,.45,.7],jeans:[.6,.5,.7],sneakers:[0,0,.95],broom:[.08,.55,.55],bristles:[.12,.55,.9],skin:[.07,.3,.94]};function Hd(n,e=Nc){const t={...Nc,...e},i={hair:n.hairHue,jacket:n.cloakHue,hat:n.hatHue,top:n.topHue,jeans:n.jeansHue,sneakers:n.shoeHue,headphones:n.phonesHue},s={};for(const[r,a]of Object.entries(Gd)){const[o,h,l]=t[r];s[a]=_e(i[r]??o,h,l)}return s[c.EYE]=[24,18,30],s[c.GLINT]=[255,255,245],s[c.NOSE]=[20,16,24],s[c.MAGIC]=_e(n.glowHue??.13,.5,1),s[c.MAGIC2]=_e(n.glowHue??.13,.15,1),s[c.BELLY]=[245,245,240],s}const Wd={rise:.78,descend:-.66,brake:.44};function Vd(n){const e=new Xe({blend:.03}),t=n%3,i=.5,s=.05,r=[[0,.02,-.01],[.02,-.01,.02],[-.01,.015,.01]][t],a=g=>i-s*(g/.62);e.seg([-.5,a(-.5),0],[.62,a(.62),0],.022,.018,c.BROOM,{group:2}),e.ell([-.64,a(-.64)+.005,0],[.2,.1,.11],c.STRAW,{dir:[1,s*1.6,0],group:3,paint:g=>g[0]<-.76?c.MAGIC2:g[0]>-.5?c.BROOM:void 0});const o=[-1,1].map(g=>[.5,a(.5)+.03,g*.045]),h=[-1,1].map(g=>[.2,i+.24+r[1],g*.1]);for(const g of[0,1]){const v=g?1:-1,x=v>0?7:5;e.seg(h[g],o[g],.04,.03,c.JACKET,{group:x}),e.ell(o[g],[.035,.03,.035],c.SKIN,{group:x})}const l=[.3+r[0],i+.27+r[1],0],u=[.07,i+.28+r[1]*.5,0],f=[-.15,i+.35+r[2],0];e.ell(u,[.17,.1,.11],c.JACKET,{dir:[1,-.25,0],group:1,paint:g=>g[1]<u[1]-.04&&Math.abs(g[2])<.055?c.TOP:void 0}),e.ell(f,[.11,.08,.1],c.JEANS,{dir:[1,-.3,0],group:1}),e.chain([[...R.add(f,[-.02,.06,0]),.07],[...R.add(f,[-.18,.08+r[0]*2,0]),.05],[...R.add(f,[-.34,.05+r[1]*3,.02]),.025]],c.JACKET,{group:12}),[[[-.32,i+.5+r[1]*2,-.07],[-.46,i+.38+r[0]*2,-.08]],[[-.34,i+.33+r[2]*2,.08],[-.55,i+.44-r[1]*3,.1]]].forEach(([g,v],x)=>{const m=x?6:4,M=R.add(f,[-.04,0,x?.06:-.06]);e.seg(M,g,.055,.045,c.JEANS,{group:m}),e.seg(g,v,.045,.04,c.JEANS,{group:m}),e.ell(R.add(v,[-.05,0,0]),[.08,.04,.045],c.SHOES,{dir:[-1,.3,0],group:m,paint:S=>S[1]<v[1]-.03?c.BELLY:void 0})}),e.ell(l,[.11,.115,.1],c.SKIN,{group:8,paint:g=>g[0]<l[0]-.01||g[1]>l[1]+.075?c.HAIR:void 0});for(const g of[-1,1]){const v=Xe.surface(l,[.11,.115,.1],R.norm([.85,.1,g*.45]));e.ell(v,[.026,.036,.026],c.BELLY,{group:8}),e.ell(R.add(v,[.012,0,g*.004]),[.014,.018,.014],c.EYE,{group:8})}e.ell(Xe.surface(l,[.11,.115,.1],R.norm([1,-.45,0])),[.012,.016,.04],c.BELLY,{group:8}),e.chain([[...R.add(l,[-.06,.03,0]),.065],[...R.add(l,[-.22,.05+r[1]*2,.01]),.05],[...R.add(l,[-.4,.06+r[2]*3,.02]),.03],[...R.add(l,[-.55,.07+r[0]*3,.02]),.012]],c.HAIR,{group:9});for(const g of[-1,1])e.ell(R.add(l,[-.015,0,g*.105]),[.05,.055,.03],c.PHONES,{group:10});e.chain([[...R.add(l,[-.005,.03,-.095]),.015],[...R.add(l,[-.02,.12,0]),.015],[...R.add(l,[-.005,.03,.095]),.015]],c.PHONES,{group:10});const p=R.add(l,[-.1+r[0],.2+r[1]*2,0]);e.ell(p,[.16,.014,.15],c.HAT,{dir:[1,.9,0],group:11}),e.chain([[...R.add(p,[-.02,.02,0]),.08],[...R.add(p,[-.14,.13,0]),.04],[...R.add(p,[-.3,.14+r[2]*2,0]),.012]],c.HAT,{group:11,paint:g=>Math.hypot(g[0]-p[0],g[1]-p[1])<.06?c.MAGIC:void 0}),e.seg(R.add(p,[.08,-.02,.08]),R.add(l,[.04,-.09,.08]),.008,.008,c.HAT,{group:11});for(const[g,v,x,m]of[[-.86,a(-.8)+.05,.03,.22],[-.88,a(-.8)-.04,-.04,.16],[-.7,i+.45,.05,.14],[-.2,i+.5,-.04,.12]]){const M=t*.05%.1;e.seg([g-M,v,x],[g-M-m,v,x],.01,.004,c.MAGIC2,{group:30,extra:!0})}return e.ell([.02,.005,0],[.2,.005,.12],c.NOSE,{group:0}),e}const au={stand:{frames:3,fps:3},land:{frames:3,fps:10},takeoff:{frames:3,fps:10},talk:{frames:4,fps:2.5},placeSigil:{frames:3,fps:6},liftSigil:{frames:3,fps:6},sit:{frames:2,fps:1.5}},Yo=.34,ou={binding:[-.02,.31,-.2],dir:[.02,1,-.04]},Yd={stand:[0,1,2].map(n=>({breathe:[0,.006,.012][n],sway:[0,.02,.035][n],free:[.04,.5+[0,.006,.012][n],.18],hand:"rest",broom:ou})),land:[{crouch:.2,hop:.01,broom:{astride:!0},sway:.05},{crouch:.1,bend:.1,broom:{binding:[-.28,.26,-.08],dir:[.6,.5,-.06]},legUp:[.18,.24,.12],sway:.03,free:[.2,.58,.2],hand:"rest"},{breathe:.004,broom:{binding:[.06,.31,-.2],dir:[.18,1,-.03]},sway:.015,free:[.06,.52,.19],hand:"rest"}],takeoff:[{crouch:.1,broom:{binding:[-.1,.3,-.17],dir:[.35,.7,-.04]},free:[.16,.58,.2],hand:"rest",sway:.02},{crouch:.15,bend:.1,broom:{binding:[-.3,.28,-.06],dir:[.7,.4,-.04]},legUp:[.1,.26,.13],sway:.04,free:[.24,.55,.17],hand:"rest"},{hop:.1,broom:{astride:!0},toes:!0,sway:.06}],talk:[{free:[.47,.84,.13],hand:"palm",tilt:.35,mouth:!0,sway:.01},{free:[.32,1.18,.12],hand:"point",tilt:-.25,look:.12,sway:.02},{free:[.24,1.16,.3],elbow:[.26,.88,.26],hand:"wave",tilt:.45,mouth:!0,sway:.03},{free:[.15,.76,.1],hand:"chest",tilt:-.35,breathe:.01,sway:.015}],placeSigil:[{free:[.16,1.62,.1],hand:"palm",look:.22,breathe:.01,sway:.02},{free:[.42,1,.12],hand:"palm",look:.08,sway:.03},{crouch:.7,bend:.55,free:[.38,.1,.13],hand:"down",look:-.08,sway:.04}],liftSigil:[{crouch:.7,bend:.55,free:[.36,.08,.13],hand:"down",look:-.08,sway:.02},{crouch:.25,bend:.18,free:[.44,.82,.12],hand:"palm",look:.05,sway:.04},{breathe:.012,free:[.2,1.64,.1],hand:"palm",look:.25,sway:.05,toes:!0}],sit:[0,1].map(n=>({sit:!0,swing:[.06,-.06][n],bend:-.08,look:[.02,.1][n],tilt:[.15,-.2][n],sway:[.01,.03][n],breathe:[0,.008][n],broom:{binding:[-.24,.31,-.3],dir:[.32,1,-.06]},free:[.2,Yo+.14,.15],far:[.18,Yo+.14,-.13],hand:"rest"}))};function Xd(n,e,t){const i=Math.hypot(e[0]-n[0],e[1]-n[1]),s=R.lerp(n,e,.5);if(i>=2*t)return s;const r=Math.sqrt(t*t-i*i/4),a=(e[0]-n[0])/i,o=(e[1]-n[1])/i;return[s[0]-o*r,s[1]+a*r,s[2]]}function Kd(n,e){const t=Yd[n],i={crouch:0,bend:0,hop:0,breathe:0,sway:0,tilt:0,look:0,broom:ou,...t[e%t.length]},s=new Xe({blend:.03}),r=i.hop,a=i.sway,o=i.sit?Yo+.06:.45-i.crouch*.21+r,h=-i.crouch*.12,l=!!i.broom.astride,u=o-.04,f=l?[1,0,0]:R.norm(i.broom.dir),d=l?[-.36,u,0]:i.broom.binding,p=E=>R.add(d,R.mul(f,E));s.seg(p(0),p(l?.98:1.1),.022,.018,c.BROOM,{group:2}),s.ell(p(-.13),[.17,.07,.08],c.STRAW,{dir:f,group:3,paint:E=>{const P=R.dot(R.sub(E,d),f);return P<-.22?c.MAGIC2:P>-.01?c.BROOM:void 0}});for(const E of[-1,1]){const P=E>0?6:4,T=[h,o,E*.07],D=i.sit?i.swing*E:0,U=i.sit?[.24+D,.09+Math.max(0,D)*.6,E*.1]:E>0&&i.legUp?i.legUp:[(E>0?.05:-.01)+(i.toes?-.03:0),.07+(i.toes?r*.4:r),E*.1],N=i.sit?[.21,o+.01,E*.09]:Xd(T,U,.21);s.seg(T,N,.055,.045,c.JEANS,{group:P}),s.seg(N,U,.045,.04,c.JEANS,{group:P});const F=i.toes?[.03,-.045,0]:[.05,-.03,0];s.ell(R.add(U,F),[.08,.04,.045],c.SHOES,{dir:i.toes?[1,-.6,0]:[1,0,0],group:P,paint:H=>H[1]<U[1]+F[1]-.015?c.BELLY:void 0})}const g=[Math.sin(i.bend),Math.cos(i.bend),0],v=[Math.cos(i.bend),-Math.sin(i.bend),0],x=[h,o+.03,0];s.ell(x,[.1,.08,.105],c.JEANS,{group:1});const m=R.add(x,R.add(R.mul(g,.19),[0,i.breathe,0]));s.ell(m,[.1,.15+i.breathe*.5,.115],c.JACKET,{dir:v,group:1,paint:E=>R.dot(R.sub(E,m),v)>.045&&Math.abs(E[2])<.05?c.TOP:void 0}),s.chain([[...R.add(m,R.add(R.mul(v,-.07),R.mul(g,-.08))),.07],[...R.add(m,R.add(R.mul(v,-.11-a),R.mul(g,-.2))),.05],[...R.add(m,R.add(R.mul(v,-.13-a*1.6),R.mul(g,-.29))),.025]],c.JACKET,{group:12});const M=R.add(m,R.add(R.mul(g,.27),[i.look*.03,0,i.tilt*.04])),S=E=>R.add(m,R.add(R.mul(g,.1),[0,0,E*.12])),b=l?[.28,u+.03,-.05]:p(Math.max(.12,(Math.min(.62,o+.2)-d[1])/Math.max(.3,f[1]))),A=l?[.28,u+.03,.05]:i.free;for(const E of[-1,1]){const P=E>0?7:5,T=S(E),D=E>0?A:i.far||b,U=E>0&&i.elbow?i.elbow:R.add(R.lerp(T,D,.5),[-.03,-.02,E*.05]);s.seg(T,U,.04,.035,c.JACKET,{group:P}),s.seg(U,D,.035,.03,c.JACKET,{group:P});const N=E>0&&!l?i.hand:"grip";if(N==="palm")s.ell(D,[.045,.02,.04],c.SKIN,{group:P});else if(N==="down")s.ell(D,[.045,.02,.04],c.SKIN,{dir:[1,.15,0],group:P});else if(N==="wave"){s.ell(D,[.03,.045,.04],c.SKIN,{group:P});for(const F of[-1,0,1])s.seg(R.add(D,[0,.03,F*.02]),R.add(D,[F*.01,.065,F*.03]),.01,.008,c.SKIN,{group:P})}else N==="point"?(s.ell(D,[.035,.03,.035],c.SKIN,{group:P}),s.seg(R.add(D,[0,.02,0]),R.add(D,[.01,.08,0]),.012,.01,c.SKIN,{group:P})):s.ell(D,[.035,.03,.035],c.SKIN,{group:P})}s.ell(M,[.11,.115,.1],c.SKIN,{group:8,paint:E=>E[0]<M[0]-.01||E[1]>M[1]+.075?c.HAIR:void 0});for(const E of[-1,1])s.ell(Xe.surface(M,[.11,.115,.1],R.norm([.85,.05+i.look,E*.45+i.tilt*.1])),[.016,.026,.016],c.EYE,{group:8});i.mouth&&s.ell(Xe.surface(M,[.11,.115,.1],R.norm([1,-.5+i.look,i.tilt*.1])),[.012,.016,.025],c.NOSE,{group:8}),s.chain([[...R.add(M,[-.06,.02,0]),.06],[...R.add(M,[-.12-a,-.12,.02+i.tilt*.03]),.05],[...R.add(M,[-.13-a*1.5,-.25,.03+i.tilt*.04]),.03]],c.HAIR,{group:9});for(const E of[-1,1])s.ell(R.add(M,[-.015,0,E*.105]),[.05,.055,.03],c.PHONES,{group:10});s.chain([[...R.add(M,[-.005,.03,-.095]),.015],[...R.add(M,[-.005,.11,-.05]),.015],[...R.add(M,[-.005,.125,0]),.015],[...R.add(M,[-.005,.11,.05]),.015],[...R.add(M,[-.005,.03,.095]),.015]],c.PHONES,{group:10});const w=R.add(M,[-.03,.1,i.tilt*.02]),L=i.tilt*.05,_=R.add(w,[-.16-a*.5,.27,L*2]);return s.ell(w,[.16,.014,.15],c.HAT,{dir:[1,.25-i.look*.8,i.tilt*.3],group:11}),s.chain([[...R.add(w,[0,.01,0]),.085],[...R.add(w,[-.05,.17,L]),.045],[..._,.012]],c.HAT,{group:11,paint:E=>E[1]<w[1]+.045?c.MAGIC:void 0}),s.ell([.02,.005,0],[.2,.005,.12],c.NOSE,{group:0}),s.anchors.hand=A,s.anchors.hatTip=_,s}function lu({frame:n=0,lean:e=!1,pose:t}={}){if(t==="fast")return Vd(n);if(au[t])return Kd(t,n);const i=t==="rise",s=t==="descend",r=t==="brake",a=i||s||r,o=new Xe({blend:.03}),h=a?0:[0,.025,.045][n%3],l=a?0:[0,.015,-.01][n%3]+(e?.08:0),u=.42+h,f=i?.3:s?-.27:r?-.12:e?.1:0,d=Math.min(.1,Math.max(0,f)),p=a?[.02,.06][n%2]:[0,.03,.05][n%3],g=s?1:i?-.6:0;o.seg([-.5,u-l*2,0],[.62,u+l*3,0],.022,.018,c.BROOM,{group:2}),r?o.ell([-.56,u-.08,0],[.17,.07,.09],c.STRAW,{dir:[.55,1,0],group:3,paint:S=>S[1]<u-.18?c.MAGIC2:S[1]>u-.01?c.BROOM:void 0}):o.ell([-.62,u-l*2-.01,0],[.17,.07,.08],c.STRAW,{dir:[1,l,0],group:3,paint:S=>S[0]<-.72?c.MAGIC2:S[0]>-.5?c.BROOM:void 0});for(const S of[-1,1]){const b=[-.04,u+.06,S*.07],A=r?[.18,u-.01,S*.14]:s?[.16,u-.05,S*.14]:i?[.06,u-.07,S*.14]:[.12+f*.5,u-.02,S*.14],w=r?S>0?[.44,u-.02+p,S*.13]:[.3,u-.16,S*.13]:s?[.2,u-.26,S*.13]:i?[-.1,u-.23,S*.13]:[.08+f,u-.2,S*.13];o.seg(b,A,.055,.045,c.JEANS,{group:S>0?6:4}),o.seg(A,w,.045,.04,c.JEANS,{group:S>0?6:4}),o.ell(R.add(w,[.05,-.02,0]),[.08,.04,.045],c.SHOES,{group:S>0?6:4,paint:L=>L[1]<w[1]-.04?c.BELLY:void 0})}o.ell([-.04,u+.08,0],[.11,.07,.1],c.JEANS,{group:1});const v=[0+f*.8,u+.26-Math.abs(f)*.3,0];o.ell(v,[.1,.16,.11],c.JACKET,{dir:[f*2.5,1,0],up:[-1,0,0],group:1,paint:S=>S[0]>v[0]+.04&&Math.abs(S[2])<.055?c.TOP:void 0}),r?o.chain([[...R.add(v,[-.08,-.06,0]),.07],[...R.add(v,[-.02,.12+p,.02]),.05],[...R.add(v,[.14,.18+p,.03]),.025]],c.JACKET,{group:12}):a&&o.chain([[...R.add(v,[-.08,-.1,0]),.07],[...R.add(v,[-.2,-.12+g*(.08+p),0]),.05],[...R.add(v,[-.3,-.12+g*(.16+p*1.5),.02]),.025]],c.JACKET,{group:12});const x=R.add(v,[.03+f*.5,.26,0]),m=R.add(x,[r?.05:s?-.01:-.03,r?.06:.1,0]);for(const S of[-1,1]){const b=R.add(v,[.01,.11,S*.11]),A=s&&S>0?R.add(m,[.1,.01,.1]):r?[.3,u+.03,S*.05]:[.26+f,u+.03,S*.05],w=s&&S>0?R.add(b,[.1,.02,.1]):R.lerp(b,A,.5);o.seg(b,w,.04,.035,c.JACKET,{group:S>0?7:5}),o.seg(w,A,.035,.03,c.JACKET,{group:S>0?7:5}),o.ell(A,[.035,.03,.035],c.SKIN,{group:S>0?7:5})}o.ell(x,[.11,.115,.1],c.SKIN,{group:8,paint:S=>S[0]<x[0]-.01||S[1]>x[1]+.075?c.HAIR:void 0});for(const S of[-1,1])o.ell(Xe.surface(x,[.11,.115,.1],R.norm([.85,.05,S*.45])),[.016,.026,.016],c.EYE,{group:8});r?o.chain([[...R.add(x,[-.06,.06,0]),.06],[...R.add(x,[.04,.13+p,.03]),.045],[...R.add(x,[.2,.08+p,.04]),.02]],c.HAIR,{group:9}):o.chain([[...R.add(x,[-.06,.02,0]),.06],[...R.add(x,[-.18-d,-.05+p+g*.1,.02]),.045],[...R.add(x,[-.3-d*1.5,-.08+p*1.6+g*.22,.03]),.02]],c.HAIR,{group:9});for(const S of[-1,1])o.ell(R.add(x,[-.015,0,S*.105]),[.05,.055,.03],c.PHONES,{group:10});o.chain([[...R.add(x,[-.005,.03,-.095]),.015],[...R.add(x,[-.005,.11,-.05]),.015],[...R.add(x,[-.005,.125,0]),.015],[...R.add(x,[-.005,.11,.05]),.015],[...R.add(x,[-.005,.03,.095]),.015]],c.PHONES,{group:10});const M=i?.1:0;if(o.ell(m,[.16,.014,.15],c.HAT,{dir:r?[1,-.55,0]:[1,.25+M*3,0],group:11}),o.chain(r?[[...R.add(m,[0,.01,0]),.085],[...R.add(m,[.06,.16,0]),.045],[...R.add(m,[.2,.22+p*.5,0]),.012]]:[[...R.add(m,[0,.01,0]),.085],[...R.add(m,[-.05-d-M*.5,.17-M*.3,0]),.045],[...R.add(m,[-.16-d*1.5-M,.27+p*.5-M*.5,0]),.012]],c.HAT,{group:11,paint:S=>S[1]<m[1]+.045?c.MAGIC:void 0}),a){const S=Wd[t]+(r?[0,.06][n%2]:0),b=Math.cos(S),A=Math.sin(S),w=[0,u,0],L=T=>[w[0]+(T[0]-w[0])*b-(T[1]-w[1])*A,w[1]+(T[0]-w[0])*A+(T[1]-w[1])*b,T[2]],_=T=>[w[0]+(T[0]-w[0])*b+(T[1]-w[1])*A,w[1]-(T[0]-w[0])*A+(T[1]-w[1])*b,T[2]],E=T=>[T[0]*b-T[1]*A,T[0]*A+T[1]*b,T[2]];for(const T of o.parts)if(T.type==="ell"?(T.c=L(T.c),T.axes=T.axes.map(E)):(T.a=L(T.a),T.b=L(T.b)),T.paint){const D=T.paint;T.paint=(U,N)=>D(_(U),N)}for(const T of o.flats)T.c=L(T.c),T.u=E(T.u),T.v=E(T.v);const P=Math.min(...o.parts.map(T=>T.type==="ell"?T.c[1]-Math.max(...T.r):Math.min(T.a[1]-T.r1,T.b[1]-T.r2)));if(P<.08)for(const T of o.parts){const D=.08-P;T.type==="ell"?T.c=[T.c[0],T.c[1]+D,T.c[2]]:(T.a=[T.a[0],T.a[1]+D,T.a[2]],T.b=[T.b[0],T.b[1]+D,T.b[2]])}if(r){const T=L([-.45,u-.24,0]);for(let D=0;D<5;D++){const U=D+n*.5,N=.055-D*.008;o.ell([T[0]+.1+U*.08,Math.max(.04,T[1]-.02+Math.sin(U*1.9)*.04),Math.cos(U*1.3)*.06],[N,N*.8,N],D<2?c.BELLY:D%2?c.MAGIC:c.MAGIC2,{group:25+D,extra:!0})}}if(i){const T=L([-.8,u,0]);for(let D=0;D<5;D++){const U=D+n*.5,N=.05-D*.007;o.ell([T[0]-.02+Math.sin(U*2.1)*.06,Math.max(.04,T[1]-.08-U*.09),Math.cos(U*1.7)*.05],[N,N,N],D%2?c.MAGIC:c.MAGIC2,{group:20+D,extra:!0})}}}return o.ell([.02,.005,0],[.2,.005,.12],c.NOSE,{group:0}),o}const Gl=(n={})=>Math.round((n.size||8)*Math.sqrt(n.growth||20)*(2/(n.pixel||3))*1.9),Qa=new Map,cu=n=>(Qa.has(n)||Qa.set(n,Ln(lu({frame:0}),{height:n}).s),Qa.get(n)),qd=(n={})=>cu(Gl(n));function $d(n={},{frame:e=0,lean:t=!1,facing:i="towards",pose:s}={}){const r=Gl(n),a=lu({frame:e,lean:t,pose:s}),{sp:o,project:h}=s?Ln(a,{scale:cu(r),facing:i}):Ln(a,{height:r,facing:i});a.anchors.hand&&(o.anchors={hand:h(a.anchors.hand),hatTip:h(a.anchors.hatTip)});let l=0;for(let u=0;u<400&&l<6;u++){const f=u*37%o.w,d=u*53%Math.floor(o.h*.8);o.get(f,d)||o.get(f+1,d)||o.get(f-1,d)||o.get(f,d+1)||o.get(f,d-1)||(f*7+d*13+e*5)%11||(o.px(f,d,c.MAGIC2),l++)}return o}const at=(n,e=0)=>{const t=Math.sin(n*127.1+e*311.7)*43758.5453;return t-Math.floor(t)},Ds=n=>{const e=at(Math.floor(n[0]*14)+Math.floor(n[2]*14)*13,Math.floor(n[1]*6));return e<.14?c.BARKD:e>.88?c.BARKL:void 0},Zd=n=>e=>{const t=at(Math.floor(e[0]*10),Math.floor(e[1]*10)+Math.floor(e[2]*10)*7);return e[1]<n[1]-.2||t<.2?c.LEAF3:t>.8?c.LEAF2:void 0},fi=(n,e,t,i,s=!0)=>n.ell(e,t,c.STONE,{group:i,rough:.025,paint:r=>r[1]>e[1]+t[1]*.45&&s?c.MOSS:Math.abs(Math.sin(r[0]*13+r[2]*7))<.06?c.STONED:void 0}),Rr=(n,e,t,i)=>n.ell(e,t,c.LEAF,{group:i,rough:.04,paint:Zd(e)}),rn=(n,e,t)=>n.chain(e,c.TRUNK,{group:t,rough:.012,paint:Ds}),Cr=(n,e,t,i,s,r=.3,a=c.LEAF2)=>{for(let o=0;o<e;o++){const h=at(s,o)*6.283,l=t*Math.sqrt(at(o,s)),u=Math.cos(h)*l,f=Math.sin(h)*l*.7;n.ell([u,r*.3,f],[.07,r*(.35+at(o,4)*.3),.07],a,{group:i+o%3,paint:d=>d[1]>r*.45?c.LEAF:void 0})}},Lr=(n,e,t,i)=>n.ell(e,[t[0],.015,t[1]],c.WATER,{group:i}),Jd={"sleeping-giant"(n){const e=t=>i=>{const s=at(Math.floor(i[0]*8),Math.floor(i[2]*8)+Math.floor(i[1]*8)*5);return s<.15?c.LEAF3:s>.86?c.LEAF2:void 0};for(const[t,i]of[[[.85,.42,0],[.7,.5,.66]],[[0,.3,0],[.62,.36,.6]],[[-.8,.3,0],[.56,.36,.62]],[[1.85,.5,.02],[.5,.5,.48]],[[-1.55,.72,.3],[.38,.5,.3]],[[-1.55,.72,-.3],[.38,.5,.3]],[[-2.2,.3,.32],[.42,.3,.26]],[[-2.2,.3,-.32],[.42,.3,.26]],[[.6,.2,.78],[.75,.2,.2]],[[.6,.2,-.78],[.75,.2,.2]]])n.ell(t,i,c.MOSS,{group:1,rough:.03,paint:e()});fi(n,[2.25,.75,.12],[.13,.15,.11],2,!1);for(const t of[-.12,.22])n.ell([2.12,.88,t],[.08,.04,.07],c.STONED,{group:3});fi(n,[-.2,.16,.95],[.2,.15,.18],4),fi(n,[-.2,.16,-.95],[.18,.14,.16],5),n.ell([2,.95,.02],[.42,.14,.4],c.LEAF3,{group:6,rough:.03}),Cr(n,26,2.8,10,3,.3)},"fern-grotto"(n){n.ell([0,.16,0],[.78,.2,.72],c.STONE,{group:1,rough:.015,paint:e=>e[1]>.3?c.MOSS:void 0}),Lr(n,[0,.345,0],[.55,.5],2);for(let e=0;e<6;e++){const t=e/6*Math.PI*2+.4,i=1.5+at(e)*.3,s=[Math.cos(t)*i,0,Math.sin(t)*i*.8],r=1.1+at(e,2)*.7,a=R.add(s,[0,r,0]);n.seg(s,a,.12,.09,c.TRUNK,{group:3+e,rough:.02,paint:Ds});for(let o=0;o<7;o++){const h=o/7*Math.PI*2+e,l=[Math.cos(h),0,Math.sin(h)];n.chain([[...a,.05],[...R.add(a,R.add(R.mul(l,.45),[0,.18,0])),.04],[...R.add(a,R.add(R.mul(l,.9),[0,-.15,0])),.015]],o%2?c.LEAF:c.LEAF2,{group:10+e})}}for(let e=0;e<5;e++){const t=e*1.3;fi(n,[Math.cos(t)*.95,.08,Math.sin(t)*.95],[.16,.12,.14],20+e)}},"sunken-boat"(n){Lr(n,[.3,.01,.15],[1.9,1.15],1);const e=[0,.12,0],t=R.norm([1,.28,.12]);n.ell(e,[1.3,.45,.55],c.WOOD,{dir:t,group:2,paint:i=>(R.dot(R.sub(i,e),[0,1,0])*9+9)%1<.14?c.BARKD:i[1]>.35&&at(Math.floor(i[0]*9))<.4?c.MOSS:void 0}),n.ell(R.add(e,[0,.14,0]),[1.2,.4,.47],c.BARKD,{dir:t,group:2,cut:!0});for(let i=-2;i<=2;i++)n.seg(R.add(e,R.add(R.mul(t,i*.4),[0,.1,-.42])),R.add(e,R.add(R.mul(t,i*.4),[0,.1,.42])),.04,.04,c.WOOD,{group:3});n.seg([-.9,.05,.7],[.3,1,.55],.03,.03,c.WOOD,{group:4}),n.box([-.98,.06,.72],[.2,.02,.07],c.WOOD,{dir:[1.2,-.8,-.15],group:4}),Cr(n,18,2.2,10,5,.45)},"bramble-wagon"(n){const e=R.norm([1,-.12,0]);n.box([0,.62,0],[1.1,.22,.52],c.WOOD,{dir:e,round:.04,group:1,paint:t=>(t[0]+3)*4%1<.08?c.BARKD:void 0}),n.box([0,.72,0],[1,.2,.43],c.BARKD,{dir:e,group:1,cut:!0});for(const[t,i,s,r]of[[-.72,.55,.4,.4],[-.72,-.55,.4,.4],[.72,-.55,.32,.37]])n.ell([t,s,i],[r,r,.06],c.WOOD,{group:2+(t>0?1:0)+(i>0?2:0),paint:a=>{const o=a[0]-t,h=a[1]-s,l=Math.hypot(o,h),u=Math.atan2(h,o);return l>r*.82||l<r*.18?c.BARKD:Math.abs(Math.sin(u*4))<.2?c.WOOD:c.NOSE}});n.ell([.95,.1,.75],[.37,.06,.37],c.WOOD,{group:7,paint:t=>Math.hypot(t[0]-.95,t[2]-.75)>.3?c.BARKD:void 0});for(const t of[-.3,.3])n.seg([1.05,.55,t],[1.9,.05,t*1.4],.04,.035,c.WOOD,{group:8});for(let t=0;t<14;t++){const i=at(t,1)*6.283,s=Math.cos(i)*1.5,r=Math.sin(i)*.9,a=[[s,0,r,.03]];for(let o=1;o<4;o++)a.push([s*(1-o*.28)+(at(t,o)-.5)*.5,.25+o*.25+at(o,t)*.2,r*(1-o*.3)+(at(o,t*3)-.5)*.4,.025-o*.004]);if(n.chain(a,c.BARKD,{group:10+t%3}),t%2===0){const o=a[3];n.ell([o[0],o[1],o[2]],[.18,.13,.16],c.LEAF,{group:14,rough:.03,paint:h=>at(Math.floor(h[0]*30),Math.floor(h[1]*30))<.1?c.ACCENT:void 0})}}},"beehive-tree"(n){for(const[t,i,s]of[[-.2,0,-.25],[.15,-.1,.2],[0,.15,.05]])rn(n,[[t,0,i,.22],[t+s*.8,1.4,i,.16],[t+s*2,2.8,i-.1,.08]],1);for(const[t,i]of[[[-.6,2.9,-.2],[.9,.6,.7]],[[.6,3,-.2],[.85,.6,.7]],[[0,3.4,-.3],[.9,.55,.7]]])Rr(n,t,i,3);rn(n,[[.2,1.9,-.05,.08],[.75,2.05,.15,.05]],2);const e=[.72,1.6,.2];n.ell(e,[.24,.42,.22],c.STRAW,{group:4,paint:t=>{const i=Math.floor((t[1]-e[1])*14),s=Math.floor(Math.atan2(t[2]-e[2],t[0]-e[0])*3+i%2*.5);return at(i,s)<.3?c.BARK2:void 0}}),n.seg([.75,2.02,.15],[.72,1.9,.2],.05,.1,c.STRAW,{group:4});for(let t=0;t<6;t++){const i=t*1.9;n.ell([e[0]+Math.cos(i)*.45,e[1]+Math.sin(t*2.3)*.35,e[2]+Math.sin(i)*.35],[.03,.025,.03],c.MAGIC,{group:20+t,extra:!0})}},"fairy-ring"(n){for(let e=0;e<9;e++){const t=e/9*Math.PI*2,i=[Math.cos(t)*1.6,0,Math.sin(t)*1.25],s=.35+at(e)*.35;n.box(R.add(i,[0,s/2,0]),[.13,s/2,.1],c.STONE,{dir:[-Math.sin(t),0,Math.cos(t)],round:.05,rough:.015,group:1+e,paint:a=>e===2&&Math.abs(a[1]-s*.55)<s*.22&&Math.abs(a[0]-i[0]-0)<.05?c.RUNE:a[1]>s*.85?c.MOSS:void 0});const r=R.add(i,[Math.cos(t+.35)*.25,0,Math.sin(t+.35)*.2]);n.seg(r,R.add(r,[0,.16,0]),.035,.03,c.CLOTH,{group:12}),n.ell(R.add(r,[0,.18,0]),[.1,.06,.1],c.ACCENT,{group:13,paint:a=>at(Math.floor(a[0]*60),Math.floor(a[2]*60))<.15?c.BELLY:void 0})}},"charcoal-hut"(n){const e=[0,2,0];for(let i=0;i<20;i++){const s=i/20*Math.PI*2;Math.abs(s-1.2)<.35||n.seg([Math.cos(s)*.95,0,Math.sin(s)*.8],R.add(e,[Math.cos(s)*.08,.1+at(i)*.25,Math.sin(s)*.08]),.05,.03,i%3?c.TRUNK:c.BARKD,{group:1+i%2})}n.ell([0,.6,0],[.85,.6,.7],c.BARKD,{group:3});const t=[1.7,0,.3];n.ell(t,[.85,.42,.7],c.BARKD,{group:4,rough:.03,paint:i=>at(Math.floor(i[0]*14),Math.floor(i[2]*14)+Math.floor(i[1]*14))<.07?c.GLOW:i[1]>.3?c.SHADES:void 0});for(let i=0;i<4;i++)n.seg([-1.4,.1+i*.14,-.5+i%2*.05],[-1.4,.1+i*.14,.5],.07,.07,c.TRUNK,{group:5+i%2,paint:s=>Math.abs(s[2])>.46?c.BARKL:void 0})},"root-arch"(n){rn(n,[[-1.8,0,.1,.4],[-1.4,1.2,0,.34],[-.4,2.3,-.1,.3],[.6,2.4,0,.28],[1.5,1.4,.1,.32],[1.9,0,.15,.38]],1),rn(n,[[-1.4,0,-.6,.28],[-.6,1.6,-.5,.22],[.5,1.9,-.45,.2],[1.3,.9,-.4,.22],[1.5,0,-.35,.26]],2),rn(n,[[-1.8,.2,.1,.3],[-2.4,.05,.5,.12]],1),rn(n,[[1.9,.2,.15,.3],[2.5,.05,.55,.12]],1);for(const[e,t]of[[[-.2,2.6,-.2],[.7,.35,.5]],[[.8,2.5,-.25],[.55,.3,.45]]])Rr(n,e,t,4);for(let e=0;e<4;e++)fi(n,[-.7+e*.45,.12,(at(e)-.5)*.5],[.22,.18,.2],6+e);n.box([0,.35,-.2],[.16,.35,.08],c.STONE,{round:.05,rough:.01,group:11,paint:e=>Math.abs(e[1]-.4)<.14&&Math.abs(e[0])<.05?c.MAGIC:e[1]>.62?c.MOSS:void 0})},"turf-hut"(n){n.box([0,.55,0],[1,.55,.7],c.WOOD,{round:.04,group:1,paint:e=>e[1]*7%1<.18?c.BARKD:e[2]>.66&&Math.abs(e[0]+.2)<.2&&e[1]<.85?c.NOSE:e[2]>.66&&Math.abs(e[0]-.5)<.14&&Math.abs(e[1]-.7)<.12?c.SHADES:void 0});for(const e of[-1,1])n.box([0,1.3,e*.4],[1.15,.05,.5],c.MOSS,{dir:[1,0,0],up:[0,1,-e*.75],round:.03,group:2,paint:t=>at(Math.floor(t[0]*12),Math.floor(t[2]*12))<.25?c.LEAF2:void 0});n.seg([.65,1.2,-.3],[.65,1.9,-.3],.15,.13,c.STONE,{group:3,rough:.015});for(let e=0;e<5;e++)fi(n,[-1.4+e*.7,.12,.9+at(e)*.3],[.2,.15,.18],4+e);Cr(n,16,1.8,10,9,.25)},"heron-rookery"(n){rn(n,[[0,0,0,.25],[.4,1.4,0,.18],[.9,2.8,-.1,.12],[1.3,3.8,-.2,.06]],1);const e=[[[.6,2,-.05],[-.3,2,-.1]],[[1,3,-.1],[1.8,2.9,0]],[[1.25,3.6,-.2],[.6,3.7,-.3]]];e.forEach(([s,r],a)=>{rn(n,[[...s,.07],[...r,.04]],2),n.ell(R.add(r,[0,.08,0]),[.34,.13,.3],c.BARK2,{group:3+a,rough:.025,paint:o=>Math.abs(Math.sin(o[0]*30+o[2]*20))<.25?c.STRAW:o[1]<r[1]+.02?c.BARKD:void 0})});for(const[s,r]of[[[1.2,4,-.4],[.6,.4,.45]],[[.3,3.1,-.5],[.45,.3,.35]],[[1.9,3.3,-.4],[.4,.3,.35]]])Rr(n,s,r,7);const t=R.add(e[1][1],[0,.42,.05]),i=1.6;n.ell(t,[.18*i,.1*i,.09*i],c.BELLY,{dir:[1,.3,0],group:10,paint:s=>s[1]>t[1]+.06?c.STONE:void 0}),n.chain([[...R.add(t,[.12*i,.06*i,0]),.035*i],[...R.add(t,[.2*i,.22*i,0]),.03*i],[...R.add(t,[.16*i,.32*i,0]),.04*i]],c.BELLY,{group:10}),n.seg(R.add(t,[.18*i,.33*i,0]),R.add(t,[.36*i,.3*i,0]),.015*i,.005*i,c.BODY2,{group:11});for(const s of[-.04,.04])n.seg(R.add(t,[0,-.06*i,s]),R.add(t,[.02,-.42,s]),.012,.012,c.BARKD,{group:12})},sundial(n){n.ell([0,.07,0],[1.05,.09,1],c.STONE,{group:1,rough:.01}),n.ell([0,.2,0],[.72,.09,.68],c.STONE,{group:2,rough:.01,paint:e=>e[1]>.26&&at(Math.floor(e[0]*8),Math.floor(e[2]*8))<.3?c.MOSS:void 0}),n.seg([0,.28,0],[0,.95,0],.16,.13,c.STONE,{group:3,paint:e=>Math.abs(Math.sin(e[1]*30))<.15?c.STONED:void 0}),n.ell([0,1,0],[.38,.04,.38],c.FRAME,{group:4,paint:e=>{const t=Math.atan2(e[2],e[0]);return Math.abs(Math.sin(t*6))<.12&&Math.hypot(e[0],e[2])>.26?c.BARKD:void 0}}),n.box([0,1.12,0],[.2,.1,.01],c.FRAME,{dir:[1,-.5,0],round:.005,group:5});for(let e=0;e<22;e++){const t=e/22*Math.PI*2,i=1.25+at(e)*.2,s=[Math.cos(t)*i,0,Math.sin(t)*i*.85];n.seg(s,R.add(s,[0,.18,0]),.015,.012,c.LEAF2,{group:6}),n.ell(R.add(s,[0,.2,0]),[.05,.04,.05],[c.FLOWER,c.BELLY,c.ACCENT][e%3],{group:7})}},"bear-den"(n){const e=[0,.3,-.2];n.ell(e,[1.7,1.15,1.25],c.LEAF,{group:1,rough:.05,paint:t=>{const i=at(Math.floor(t[0]*16),Math.floor(t[1]*16)+Math.floor(t[2]*16)*3);return i<.06?c.ACCENT:i<.2?c.BARKD:t[1]<.4?c.LEAF3:i>.85?c.LEAF2:void 0}}),n.ell([.35,.35,.95],[.5,.55,.4],c.NOSE,{group:1,cut:!0}),n.seg([2,0,.5],[2,.65,.5],.3,.27,c.TRUNK,{group:3,paint:t=>t[1]>.6?c.BARKL:Math.abs(Math.sin(Math.atan2(t[2]-.5,t[0]-2)*3))<.12&&t[1]>.2?c.BARKD:void 0})},"stilt-hut"(n){Lr(n,[0,.01,.1],[2.1,1.3],1);for(const[e,t]of[[-.75,-.55],[.75,-.55],[-.75,.55],[.75,.55]])n.seg([e,0,t],[e,1.05,t],.07,.06,c.WOOD,{group:2,paint:i=>i[1]<.15?c.MOSS:void 0});n.box([0,1.1,0],[1.05,.05,.8],c.WOOD,{round:.02,group:3,paint:e=>(e[0]+3)*6%1<.12?c.BARKD:void 0}),n.box([-.1,1.6,-.1],[.7,.45,.55],c.WOOD,{round:.03,group:4,paint:e=>e[2]>.4&&Math.abs(e[0]-.1)<.18&&e[1]<1.85?c.NOSE:void 0});for(const[e,t]of[[2.1,.92],[2.35,.72],[2.58,.48],[2.76,.24]])n.ell([-.1,e,-.1],[t,.16,t*.85],c.STRAW,{group:5,paint:i=>Math.abs(Math.sin(Math.atan2(i[2]+.1,i[0]+.1)*18))<.25?c.BARK2:void 0});for(const e of[.72,.95])n.seg([.9,1.1,e],[1.15,0,e],.02,.02,c.WOOD,{group:6});for(let e=0;e<4;e++)n.seg([.92+e*.06,1-e*.26,.72],[.92+e*.06,1-e*.26,.95],.02,.02,c.WOOD,{group:6});for(let e=0;e<26;e++){const t=at(e,7)*6.283,i=1.5+at(e,8)*.7,s=[Math.cos(t)*i,0,Math.sin(t)*i*.7],r=.5+at(e,9)*.5;n.seg(s,R.add(s,[0,r,0]),.028,.02,c.LEAF2,{group:10+e%3}),e%3===0&&n.ell(R.add(s,[0,r-.05,0]),[.025,.07,.025],c.BARKD,{group:13})}},"bog-shrine"(n){Lr(n,[.6,.01,.4],[1.4,.9],1),n.seg([0,0,0],[0,1.9,0],.2,.17,c.TRUNK,{group:2,rough:.01,paint:e=>{const t=e[1];return e[2]>.12&&(Math.abs(t-1.6)<.05&&Math.abs(Math.abs(e[0])-.08)<.05||Math.abs(t-1.38)<.04&&Math.abs(e[0])<.1)||t*5%1<.07?c.BARKD:e[1]>1.85?c.MOSS:void 0}}),n.ell([0,1.95,0],[.24,.1,.24],c.MOSS,{group:3});for(let e=0;e<6;e++){const t=e/6*Math.PI*2;n.seg([Math.cos(t)*1,0,Math.sin(t)*.8],[Math.cos(t)*1,.35+at(e)*.25,Math.sin(t)*.8],.05,.04,c.TRUNK,{group:4})}n.ell([-.25,.06,.3],[.14,.07,.13],c.EAR,{group:5}),fi(n,[.3,.07,.3],[.09,.07,.08],6,!1),fi(n,[.15,.05,.42],[.06,.05,.06],7,!1);for(const[e,t,i]of[[.9,.9,.5],[1.4,1.2,.1],[.4,1.4,.8]])n.ell([e,t,i],[.06,.07,.06],c.MAGIC,{group:20+e*10,extra:!0,paint:s=>Math.hypot(s[0]-e,s[1]-t)<.03?c.MAGIC2:void 0});Cr(n,20,2,10,11,.3,c.WEB)},"raven-tree"(n){rn(n,[[0,0,0,.3],[.1,1.3,0,.22],[-.1,2.5,-.1,.16],[.1,3.6,-.15,.07]],1),[[[.1,1.6,0],[1.3,2.3,.1],[1.8,2.2,.1]],[[-.05,2.1,-.05],[-1.2,2.8,-.1],[-1.6,3.2,-.1]],[[0,2.9,-.1],[.8,3.5,-.2]]].forEach((s,r)=>rn(n,s.map((a,o)=>[...a,.12-o*.04]),2+r)),rn(n,[[-.1,.5,0,.22],[-1.1,.1,.5,.08]],5),rn(n,[[.1,.4,0,.2],[.9,.05,-.4,.08]],5);const t=(s,r)=>{n.ell(s,[.12,.07,.06],c.SHADES,{dir:[1,.2,0],group:r}),n.ell(R.add(s,[.11,.07,0]),[.05,.05,.045],c.SHADES,{group:r}),n.seg(R.add(s,[.15,.07,0]),R.add(s,[.22,.05,0]),.015,.004,c.BODY2,{group:r}),n.seg(R.add(s,[-.1,0,0]),R.add(s,[-.22,-.04,0]),.04,.015,c.SHADES,{group:r})};t([1.3,2.42,.1],10),t([-1.2,2.92,-.1],11),t([.8,3.62,-.2],12),t([-.05,3.72,-.15],13);const i=[1.55,1.45,.1];n.seg([1.55,2.25,.1],R.add(i,[0,.3,0]),.01,.01,c.FRAME,{group:14});for(let s=0;s<6;s++){const r=s/6*Math.PI*2;n.seg(R.add(i,[Math.cos(r)*.2,-.25,Math.sin(r)*.2]),R.add(i,[Math.cos(r)*.12,.3,Math.sin(r)*.12]),.012,.012,c.FRAME,{group:14})}n.seg(R.add(i,[0,-.27,0]),R.add(i,[0,-.25,0]),.22,.22,c.FRAME,{group:14})},barrow(n){n.ell([0,0,-.2],[2.3,.95,1.3],c.LEAF2,{group:1,rough:.03,paint:e=>at(Math.floor(e[0]*10),Math.floor(e[2]*10)+Math.floor(e[1]*10))<.25?c.LEAF:void 0});for(const e of[-.35,.35])n.box([e,.45,.95],[.12,.45,.12],c.STONE,{round:.03,rough:.01,group:2});n.box([0,.95,.95],[.55,.1,.14],c.STONE,{round:.03,rough:.01,group:3,paint:e=>e[1]>1.02?c.MOSS:void 0}),n.box([0,.4,.9],[.23,.4,.3],c.NOSE,{group:1,cut:!0});for(const[e,t,i]of[[-1.6,1,.7],[1.7,.9,.55]])n.box([e,i/2,t],[.12,i/2,.09],c.STONE,{round:.04,rough:.01,group:4})},cairn(n){let e=0;for(let i=0;i<6;i++){const s=.9-i*.14,r=Math.max(3,9-i);for(let a=0;a<r;a++){const o=a/r*Math.PI*2+i;fi(n,[Math.cos(o)*s*.8,e+.14,Math.sin(o)*s*.7],[.24-i*.02,.15,.2-i*.02],1+(i+a)%4,i<2)}e+=.26}const t=[0,e+.1,0];for(let i=0;i<6;i++){const s=i/6*Math.PI*2;n.seg(R.add(t,[Math.cos(s)*.12,0,Math.sin(s)*.12]),R.add(t,[Math.cos(s)*.3,.35,Math.sin(s)*.3]),.02,.02,c.FRAME,{group:6})}n.seg(R.add(t,[0,-.3,0]),t,.05,.05,c.FRAME,{group:6}),n.ell(R.add(t,[0,.14,0]),[.2,.07,.2],c.SHADES,{group:7})},"stump-throne"(n){n.ell([0,.28,0],[.92,.34,.86],c.TRUNK,{group:1,rough:.015,paint:Ds}),n.ell([0,.58,0],[.84,.06,.78],c.BARKL,{group:1,paint:e=>Math.abs(Math.sin(Math.hypot(e[0],e[2])*30))<.3?c.BARK2:void 0}),n.box([-.55,1.15,0],[.18,.62,.62],c.TRUNK,{round:.1,rough:.01,group:2,paint:Ds});for(const e of[-.6,.6])n.box([-.1,.72,e],[.45,.14,.12],c.TRUNK,{round:.06,group:3,paint:Ds});for(let e=0;e<6;e++){const t=e/6*Math.PI*2+.3;rn(n,[[Math.cos(t)*.8,.25,Math.sin(t)*.8,.18],[Math.cos(t)*1.4,.02,Math.sin(t)*1.3,.06]],4)}n.seg([1.5,.18,.8],[1.5,.18,.2],.18,.18,c.TRUNK,{group:5,paint:e=>e[2]>.78||e[2]<.22?c.BARKL:Ds(e)}),n.seg([1.5,.3,.5],[1.6,.75,.5],.025,.025,c.WOOD,{group:6}),n.box([1.5,.36,.5],[.1,.06,.015],c.FRAME,{group:6});for(let e=0;e<6;e++){const t=e<3?0:1,i=e%3;n.seg([-1.7+i*.3+t*.15,.15+t*.26,-.7],[-1.7+i*.3+t*.15,.15+t*.26,.2],.14,.14,c.TRUNK,{group:7+e%2,paint:s=>s[2]>.16||s[2]<-.66?c.BARKL:void 0})}},"swing-beech"(n){rn(n,[[0,0,-.3,.45],[0,1.6,-.3,.36],[-.1,2.8,-.4,.26]],1),rn(n,[[0,2.2,-.3,.2],[1,2.6,-.2,.14],[1.9,2.75,-.1,.08]],2),rn(n,[[-.05,2.5,-.35,.18],[-1.2,3,-.4,.1]],3);for(let e=0;e<5;e++){const t=e/5*Math.PI*2;rn(n,[[Math.cos(t)*.35,.3,-.3+Math.sin(t)*.3,.2],[Math.cos(t)*.9,.02,-.3+Math.sin(t)*.8,.07]],4)}for(const[e,t]of[[[0,3.4,-.6],[1.4,.8,1]],[[1.4,3.1,-.4],[.9,.55,.7]],[[-1.3,3.2,-.6],[.9,.6,.7]]])Rr(n,e,t,5);for(const e of[-.12,.12])n.seg([1.3,2.65,e],[1.3,.55,e],.012,.012,c.STRAW,{group:6});n.box([1.3,.53,0],[.08,.025,.18],c.WOOD,{round:.01,group:6});for(let e=0;e<9;e++)n.ell([(at(e,1)-.5)*3,.05+at(e,2)*.5,(at(e,3)-.3)*1.6],[.022,.022,.022],c.MAGIC,{group:20+e,extra:!0})},bower(n){for(const t of[-.9,0,.9])for(const i of[-.6,.6])n.seg([t,0,i],[t,1.2,i],.04,.04,c.WOOD,{group:1});for(const t of[-.9,0,.9])n.chain([[t,1.2,-.6,.04],[t,1.62,-.3,.04],[t,1.72,0,.04],[t,1.62,.3,.04],[t,1.2,.6,.04]],c.WOOD,{group:2});for(const t of[-.6,.6])for(const i of[.5,1])n.seg([-.9,i,t],[.9,i,t],.025,.025,c.WOOD,{group:3});const e=t=>{const i=at(Math.floor(t[0]*26),Math.floor(t[1]*26)+Math.floor(t[2]*26)*3);return i<.12?c.BELLY:i<.2?c.STRAW:i>.85?c.LEAF2:void 0};for(const[t,i]of[[[-.6,1.6,0],[.6,.3,.75]],[[.5,1.65,0],[.65,.3,.75]],[[-.95,.9,-.55],[.25,.65,.25]],[[.95,.8,-.6],[.25,.55,.25]],[[-.9,.7,.62],[.22,.5,.2]],[[.2,1.3,-.65],[.5,.4,.2]]])n.ell(t,i,c.LEAF,{group:4,rough:.04,paint:e});n.box([0,.4,-.35],[.6,.04,.15],c.WOOD,{round:.02,group:5});for(const t of[-.5,.5])n.seg([t,0,-.35],[t,.38,-.35],.03,.03,c.WOOD,{group:5})}},hu={moor:["sleeping-giant","the sleeping giant, a moss mound like a figure lying on its back",1],"fern-forest":["fern-grotto","a ring of giant tree ferns round a stone basin",1],"muddy-forest":["sunken-boat","an old rowing boat sunk in the mud",1.15],"tangly-forest":["bramble-wagon","an old wagon wrapped in brambles",1.1],"wispy-forest":["beehive-tree","a many-trunked tree with a great wild honeycomb",1],"hazel-forest":["fairy-ring","a ring of fairy stones and toadstools",1.1],"twiggy-forest":["charcoal-hut","a charcoal burner's hut of sticks, its mound smouldering",1],ancient:["root-arch","a great arch of roots over mossy stones",1.1],norway:["turf-hut","a log cabin with a turf roof",1.15],"alder-forest":["heron-rookery","an alder holding herons' stick nests",1],meadow:["sundial","a moonlit sundial on a stone dais in a ring of flowers",1.2],"berry-thicket":["bear-den","a bear's den in a bramble mound",1.1],wetland:["stilt-hut","a fisher's hut on stilts over a pool",1.1],bog:["bog-shrine","a carved post shrine to the bog, will-o'-wisps over the pool",1.1],deadwood:["raven-tree","a dead tree where the ravens gather",1],grassland:["barrow","a barrow with a stone doorway",1],heath:["cairn","a tall cairn with an old beacon basket",1.4],"old-pinewood":["stump-throne","a woodcutter's stump throne",1.1],"bluebell-glade":["swing-beech","a great beech with a rope swing, glowworms beneath",1],"honeysuckle-tangle":["bower","a honeysuckle bower with a bench",1.2]};function Qd(n){let e=n.w,t=-1,i=n.h;for(let r=0;r<n.h;r++)for(let a=0;a<n.w;a++)n.m[r*n.w+a]&&(e=Math.min(e,a),t=Math.max(t,a),i=Math.min(i,r));const s=new Mn(t-e+1,n.h-i);for(let r=0;r<s.h;r++)for(let a=0;a<s.w;a++){const o=(r+i)*n.w+a+e;n.m[o]&&s.put(a,r,n.m[o],n.n[o*3],n.n[o*3+1],n.n[o*3+2])}return{sp:s,x0:e,y0:i}}function jd(n,e){const t=n.leaf,i=e.trunkHue??.07;return{[c.TRUNK]:_e(i,.45,.36),[c.BARKD]:_e(i+.03,.5,.17),[c.BARKL]:_e(i,.35,.55),[c.BARK2]:_e(i+.02,.45,.26),[c.LEAF]:_e(t,.55,.45),[c.LEAF2]:_e(t-.03,.5,.62),[c.LEAF3]:_e(t+.03,.6,.26),[c.STONE]:[122,120,128],[c.STONED]:[62,60,70],[c.MOSS]:_e(.26,.45,.45),[c.WOOD]:[128,92,58],[c.STRAW]:[190,162,104],[c.CLOTH]:[228,220,200],[c.EAR]:[168,96,66],[c.FRAME]:[150,128,84],[c.SHADES]:[30,28,36],[c.ACCENT]:[196,40,52],[c.BELLY]:[232,228,214],[c.BODY2]:[210,170,60],[c.FLOWER]:[180,140,230],[c.WEB]:[228,228,234],[c.WATER]:[52,78,104],[c.NOSE]:[16,14,20],[c.GLOW]:[255,120,40],[c.MAGIC]:_e(e.magicHue??.45,.6,1),[c.MAGIC2]:_e(e.magicHue??.45,.2,1),[c.RUNE]:[120,230,255],[c.LINE]:[24,22,30]}}function ef(n,e,t,i=16){const s=new Xe({blend:.05});Jd[n](s),s.ell([0,.004,0],[.01,.004,.01],c.NOSE,{group:0});const r=(Object.values(hu).find(([d])=>d===n)||[,,1])[2],a=Ln(s,{scale:qd(t)*r}),{sp:o,x0:h,y0:l}=Qd(a.sp),[u,f]=a.project([0,0,0]);return{sp:o,colours:jd(e,t),origin:{x:+(u-h).toFixed(1),y:+(f-l).toFixed(1)},metres:{width:+(o.w/i).toFixed(1),height:+(o.h/i).toFixed(1)}}}const tf=1.3,nf=n=>[1,Math.sqrt(n.growth),Math.sqrt(n.growth)*tf,n.growth],er=(n,e,t=1)=>Math.round(e.size*nf(e)[Math.max(0,Math.min(3,n))]*(2/(e.pixel||2))*1.9*t),Hl=(n,e)=>{const t=Ua(e);for(let i=0;i<9;i++){const s=Math.floor(Ae(t,2,n.w-2)),r=Math.floor(Ae(t,2,n.h*.6));if(!(n.get(s,r)||n.get(s+1,r)||n.get(s-1,r)||n.get(s,r+1)||n.get(s,r-1))&&(n.px(s,r,c.MAGIC2),i%3===0))for(const[a,o]of[[1,0],[-1,0],[0,1],[0,-1]])n.px(s+a,r+o,c.MAGIC)}};function Ba(n,e,t,i,s,r,a,o){const h=R.add(e,[-i*.7,i*(.75+s),t*i*.35]),l=R.norm(R.sub(h,e)),u=R.norm(R.sub([1,0,0],R.mul(l,R.dot([1,0,0],l)))),f=Math.hypot(...R.sub(h,e));n.flat(R.add(R.lerp(e,h,.5),R.mul(u,-i*.14)),l,u,f*.55,i*.34,os.wing(r,a),{group:o,extra:!0})}const Wl=(n,e,t=1)=>n===0?Math.round(Math.max(12,Math.min(30*Math.max(.75,Math.min(1.1,t)),er(1,e)*t*.72))):n===2?Math.round(Math.max(er(1,e)*t*1.08,Math.min(er(2,e,t),er(1,e)*1.4))):er(n,e)*t;let ca=null;function sf(n,e){const t=ca;ca=n;try{return e()}finally{ca=t}}const rf=(n,e)=>{const t=Math.atan2(e,n);return Math.hypot(n,e)<.55+.4*Math.pow(Math.abs(Math.cos(t*2.5+Math.PI/2)),3)},af=(n,e)=>{const t=n*1.2,i=-e*1.2+.25;return Math.pow(t*t+i*i-.6,3)-t*t*i*i*i<0};function Vl(n){const e=ca,t=n.anchors;if(!e)return;const i=t.head,s=i?Math.max(...i.r):.2;if(e.collar&&(t.neck||i)){const r=t.neck||{c:R.add(i.c,[-i.r[0]*.8,-i.r[1]*.4,0]),r:i.r[1]*.75,dir:R.norm([1,.4,0])},a=R.norm(r.dir),o=R.norm(R.cross(a,Math.abs(a[2])<.9?[0,0,1]:[1,0,0])),h=R.cross(a,o),l=[],u=Math.max(.03,r.r*.2);for(let v=0;v<=16;v++){const x=v/16*Math.PI*2,m=R.add(R.mul(o,Math.cos(x)),R.mul(h,Math.sin(x)));let M=0;for(;M<.8&&n.field(R.add(r.c,R.mul(m,M)))<0;)M+=.01;M>=.8&&(M=r.r),l.push([...R.add(r.c,R.mul(m,M+u*.7)),u])}n.chain(l,c.COLLAR,{group:60,extra:!0});const f=l.reduce((v,x)=>x[0]-x[1]*.6+x[2]*.5>v[0]-v[1]*.6+v[2]*.5?x:v),d=u*1.3*(r.tag||1),p=R.norm(R.add(R.norm(R.sub(f.slice(0,3),r.c)),[.3,-.5,.3]));let g=f.slice(0,3);for(let v=0;v<60&&n.field(g)<d*.4;v++)g=R.add(g,R.mul(p,.01));n.ell(g,[d,d,d*.6],c.COLLAR,{group:60,extra:!0})}if(e.hat!=null&&i){const r=Math.max(s,.13),a=i.top||R.add(Xe.surface(i.c,i.r,R.norm([-.15,1,.1])),[0,s*.1,0]),o=R.norm([.3,1,.35]),h=r*1.5,l=R.add(a,R.mul(o,h));n.seg(R.add(a,R.mul(o,-r*.1)),l,r*.48,r*.04,c.HAT1,{group:61,extra:!0,paint:u=>Math.floor(R.dot(R.sub(u,a),o)/(h/5)+10)%2?c.HAT2:void 0}),n.ell(l,[r*.17,r*.17,r*.17],c.POM,{group:61,extra:!0})}if(e.glasses&&t.eyes&&i){const[r,a]=t.eyes.pts,o=l=>R.add(l,R.mul(R.norm(R.sub(l,i.c)),t.eyes.size*.45)),h=Math.max(t.eyes.size*1.05,s*.1);if(e.glasses==="bar")n.seg(o(r),o(a),h,h,c.SHADES,{group:62,extra:!0}),n.ell(R.add(o(a),[h*.3,h*.5,h*.2]),[h*.25,h*.25,h*.25],c.GLINT,{group:62,extra:!0});else for(const l of[r,a]){const u=R.norm(R.sub(l,i.c)),f=R.norm(R.cross([0,1,0],u)),d=R.cross(u,f),p=e.glasses==="heart"?af:rf,g=h*1.5;n.flat(o(l),f,d,g,g,(v,x)=>p(v,x)?p(v*1.3,x*1.3)?c.SHADES:c.FRAME:null,{group:62,bend:.1,extra:!0}),n.seg(o(r),o(a),h*.18,h*.18,c.FRAME,{group:62,extra:!0})}}if(e.shoes)for(const r of t.feet){const a=e.shoes==="platform",o=r.r,h=R.add(r.c,[o*.25,o*(a?.35:.15),0]);n.ell(h,[o*1.45,o*(a?1.2:.85),o*1.15],c.SHOE,{group:r.group,extra:!0,paint:l=>l[1]<h[1]-o*(a?.45:.4)?c.SOLE:e.shoes==="glitter"&&$n(l,60,.28)?c.GLINT:void 0})}}function of(n,e,t,i,s="towards"){const r={legW:1,earS:1,hgt:1,bw:.3,...n.q},a=e===3,o=e===1,h=e===0,l=I=>a&&n.legend.includes(I),u=new Xe,f=r.hr*(h?1.75:o?1.25:1)*(i.head/.44)**.5,d=r.len*(h?.8:o?.9:1.02)*i.long,p=h?.55:o?.9:1.04,g=t?-.04:0,v=1+g,x=r.chest*(a?1.06:1)/p+g,m=r.tuck/p+g,M=r.bw*(h?1.15:e>=2?1.06:1)*(r.legW>1.2?1.15:1),S=.06*r.legW*(a?1.1:h?1.7:1),b=r.back==="hump"?.1:0,A=r.back==="arch"?.1:0,w=x+.12,L=I=>{if(r.belly&&I[1]<w&&I[0]>-d*.5)return c.BELLY;if(r.saddle&&I[1]>v-.18&&I[0]<d*.55)return c.BODY2;if(r.spots&&I[1]>x+.1&&$n(I,10,.22))return r.spotMat==="belly"||r.spots==="young"&&o?c.BELLY:r.spots==="young"?void 0:c.BODY3;if(r.ridge&&I[1]>v-.08+b*.5)return c.BODY3};if(u.ell([d*.48,(v+x)/2+b*.5,0],[d*.62,(v-x)/2+b*.5,M],c.BODY,{paint:L}),u.ell([-d*.5,(v+m)/2+A*.6,0],[d*.58,(v-m)/2+A*.6,M*.93],c.BODY,{paint:L}),u.ell([0,(v+(x+m)/2)/2+.02,0],[d*.6,(v-(x+m)/2)/2,M*.9],c.BODY,{paint:L}),r.ridge)for(let I=0;I<(a?16:10);I++){const q=-d*.8+I*d*1.75/(a?15:9),$=(.07+(a?.04:0))*(1+.5*Math.max(0,q/d));u.ell([q,v+.02+b*Math.max(0,1-Math.abs(q/d-.5)*2)+$*.5,0],[$,.03,M*.25],c.BODY3,{dir:[-.3,1,0],up:[1,0,0]})}if(r.wool)for(let I=0;I<14;I++){const q=I/14*Math.PI*2;u.ell([d*Math.cos(q)*.7,(v+x)/2+Math.sin(q)*.2,M*(I%2?.5:-.5)],[.16,.14,.14],c.BODY)}const _=[.32,-.32][t],E=(I,q)=>{const $=q*M*.62,ce=I?d*.62:-d*.62,de=(I?1:-1)*q*_,me=I?x+.1:m+.15,j=(I?q:-q)*(t?1:-1)>0?.06:0,ie=[ce+Math.sin(de)*.2+(I?.02:.1),Math.max(.3,me*.55),$],k=[ce+Math.sin(de)*.42,.05+j,$],re=[ce,me+.12,$*.8],ae=q>0?r.legMat||c.BODY:r.legMat?c.BODY3:c.BODY2,ge=I?[[...re,S*1.5],[...ie,S*1.05],[...k,S*.9]]:[[...re,S*2*(r.haunch||1)],[...R.add(ie,[-.12,.06,0]),S*1.2],[...R.add(k,[-.06*(r.hindFoot||1),.12,0]),S*.9],[...k,S*.9]];u.chain(ge,ae,{group:q>0?6+(I?1:0):2,paint:r.socks?Ce=>Ce[1]<r.socks?c.BODY3:void 0:void 0});const ke=(r.paw==="hoof"?.07:.09)*r.legW**.5*(I?1:r.hindFoot||1);u.ell(R.add(k,[ke*.5,-.01,0]),[ke,S*.9,S*1.1],r.paw==="hoof"?c.NOSE:ae,{group:q>0?6+(I?1:0):2}),u.anchors.feet.push({c:R.add(k,[ke*.5,-.01,0]),r:Math.max(ke,S*1.1),group:q>0?6+(I?1:0):2})};for(const I of[-1,1])E(!0,I),E(!1,I);const P=[d*.82,v-.12,0],T=[P[0]+Math.cos(r.neckAng)*r.neck*.9,P[1]+Math.sin(r.neckAng)*r.neck*.9+(h?.1:0),0];u.seg(P,T,r.neckW*.55,r.neckW*.42,c.BODY,{paint:I=>r.belly&&I[1]<(P[1]+T[1])/2-.05?c.BELLY:r.face==="dark"?c.BODY2:void 0});const D=I=>{if(r.face==="badger")return Math.abs(I[2])<f*.22+(I[0]-T[0])*.1||I[1]<T[1]-f*.1?c.BELLY:c.BODY3;if(r.face==="dark")return c.BODY2;if((r.belly||r.muzzle)&&I[1]<T[1]-f*.35)return c.BELLY};u.ell(T,[f*1.05,f*.92,f*.88],c.BODY,{paint:D});const U=f*r.snout*(h?.55:o?.78:1),N=f*r.snoutD*.55,F=[T[0]+f*.65+U*.5,T[1]-f*.28,0];u.ell(F,[U*.62+f*.2,N,N*.95],c.BODY,{dir:[1,-.25,0],paint:I=>(r.muzzle||r.belly)&&I[1]<F[1]-N*.1?c.BELLY:D(I)});const H=[F[0]+U*.62+f*.1,F[1]-.02,0];u.ell(H,[f*(r.disc?.1:.12),f*(r.disc?.2:.12),f*(r.disc?.2:.15)],c.NOSE,{group:1});for(const I of[-1,1]){const q=Xe.surface(T,[f*1.05,f*.92,f*.88],R.norm([.75,.32,I*.62]));u.ell(q,[f*.13,f*.16,f*.13].map($=>$*(r.eyeK||1)*(h?1.5:o?1.2:1)),a&&!r.tusks?c.MAGIC2:c.EYE,{group:1})}u.anchors.head={c:T,r:[f*1.05,f*.92,f*.88],top:[T[0]-f*.1,T[1]+f*.82,0]},u.anchors.eyes={pts:[-1,1].map(I=>Xe.surface(T,[f*1.05,f*.92,f*.88],R.norm([.75,.32,I*.62]))),size:f*.16*(r.eyeK||1)*(h?1.5:o?1.2:1)},u.anchors.neck={c:R.lerp(P,T,h?.05:o?.25:.42),r:r.neckW*.5*(h?1.3:o?1.12:1),dir:R.norm(R.sub(T,P)),tag:h?1.8:o?1.3:1};for(const I of[-1,1]){const q=r.ear,$=[T[0]-f*.15,T[1]+f*.7,I*f*.5],ce=r.earS*(h?1.2:1)*(r.ear==="long"?.62:1);if(q==="none")continue;if(q==="round"){u.ell($,[f*.22,f*.25*ce,f*.1],c.BODY,{group:1,paint:ge=>ge[0]>$[0]+f*.02?c.EAR:void 0});continue}const de=q==="long",me=q==="small"?-.6:0,j=f*.55*ce*(q==="big"?1.35:de?2.2:1),ie=f*.3*(q==="big"?1.2:de?1.35:1),k=R.norm([me*.6-(de?.3:.12),1,I*.3]),re=R.norm([.55,.2,I]),ae=R.norm(R.cross(re,k));u.flat(R.add($,R.mul(k,j)),ae,k,ie,j,os.ear(c.BODY,c.EAR,c.BODY3),{group:5+(I>0?0:20),extra:de}),q==="tuft"&&u.seg(R.add($,[0,j*1.4,I*.02]),R.add($,[0,j*1.85,I*.04]),f*.05,f*.02,c.BODY3,{group:1})}const W=[-d*1.05,v-.1+A*.5,0],te=t?.04:-.02;if(l("tails")||lf(u,l("starTail")?"star":r.tail,W,d,v,te),r.horns)for(const I of[-1,1]){const q=o?.6:h?.35:l("hornsGlow")?1.4:1,$=[];for(let ce=0;ce<=8;ce++){const de=.3-ce/8*Math.PI*1.6,me=f*.65*q*(1-.45*ce/8);$.push([T[0]-f*.1+Math.cos(de)*me,T[1]+f*.45+Math.sin(de)*me,I*(f*.6+ce*.015)]),$[ce].push(f*.2*q*(1-.6*ce/8))}u.chain($,l("hornsGlow")?c.MAGIC:c.ACCENT,{group:13})}if(r.antlers||l("jackalope"))for(const I of[-1,1])cf(u,r,[T[0]-f*.05,T[1]+f*.75,I*f*.4],I,e,l);if(r.tusks)for(const I of[-1,1]){const q=o?.4:h?0:l("tusksBig")?1.3:.75;if(!q)continue;const $=[F[0]+U*.25,F[1]-N*.4,I*N*.8];u.chain([[...$,.045*q],[...R.add($,[.1*q,.1*q,I*.03]),.04*q],[...R.add($,[.06*q,.24*q,I*.05]),.02*q]],c.ACCENT,{group:8})}r.teeth&&!h&&u.ell([H[0]-f*.1,H[1]-f*.25,0],[f*.08,f*.14,f*.12],c.ACCENT,{group:1});const K=I=>[-d*.9+I*d*1.65,v+b*Math.max(0,1-Math.abs(I-.8)*3)+A*(1-Math.abs(I-.4)*2),0];if(l("wings"))for(const I of[-1,1])Ba(u,[d*.2,v,I*M*.5],I,1.15,t?.1:0,I>0?c.MAGIC2:c.MAGIC,c.MAGIC,40+(I>0?10:0));if(l("mane")||l("flames"))for(let I=0;I<7;I++){const q=I/6,$=R.lerp(R.add(T,[-f*.5,f*.3,0]),K(.55),q),ce=[.4,.3,.45,.28,.38,.25,.3][I],de=R.norm([-.35-(t?.1:0),1,0]);u.flat(R.add($,R.mul(de,ce*.5)),[1,0,0],de,ce*.32,ce*.55,os.flame(I%2?c.MAGIC:c.MAGIC2,c.MAGIC2),{group:60+I%2,extra:!0})}if(l("tails"))for(let I=0;I<7;I++){const q=Math.PI*(.55+I*.08),$=(I-3)*.1,ce=R.add(W,[Math.cos(q)*.9,Math.sin(q)*.85,$]);u.chain([[...W,.1],[...R.lerp(W,ce,.5),.17],[...ce,.08]],I%2?c.BODY2:c.BODY,{group:70,extra:!0}),u.ell(ce,[.09,.09,.09],c.MAGIC2,{group:71,extra:!0})}if(l("crystals")&&[.15,.3,.45,.6,.75].forEach((I,q)=>{const $=K(I),ce=[.3,.5,.4,.6,.35][q];u.ell(R.add($,[0,ce*.45,(q%2-.5)*.1]),[ce*.55,.08,.08],c.MAGIC,{dir:[(q-2)*.12,1,0],group:80+q%2,extra:!0,paint:de=>de[2]>0?c.MAGIC2:void 0})}),l("moss")){for(let I=0;I<6;I++)u.ell(K(.08+I*.15),[d*.22,.07,M*.85],c.LEAF,{group:85,extra:!0});for(const[I,q]of[[.25,.55],[.5,.8],[.75,.45]]){const $=K(I);u.seg($,R.add($,[0,q*.7,0]),.04,.025,c.TRUNK,{group:86,extra:!0}),u.ell(R.add($,[0,q*.8,0]),[q*.28,q*.26,q*.28],c.LEAF2,{group:87,extra:!0,paint:ce=>ce[1]<$[1]+q*.72?c.LEAF3:void 0})}for(const I of[.12,.4,.65,.9]){const q=K(I);u.ell(R.add(q,[0,.12,M*.3]),[.07,.035,.07],c.MAGIC,{group:89,extra:!0})}}if(l("ribbons"))for(let I=0;I<3;I++){const q=[];for(let $=0;$<9;$++){const ce=$/8;q.push([d*(.5-ce*2.2),v+.05+I*.1+ce*(.25+I*.12)+Math.sin(ce*6+t+I)*.07,(I-1)*.18,.04*(1-ce*.6)])}u.chain(q,I%2?c.MAGIC2:c.MAGIC,{group:90+I,extra:!0})}Vl(u);const{sp:B}=Ln(u,{height:Wl(e,i,r.hgt),facing:s});return a&&Hl(B,n.id.length*7919),B}function lf(n,e,t,i,s,r){const a={group:3},o=h=>-i*h;e==="brush"?n.chain([[...t,.1],[o(1.3),s-.25+r,0,.15],[o(1.4),s-.55,0,.14],[o(1.35),.38+r,0,.09]],c.BODY,{...a,paint:h=>h[1]<.32?c.BODY3:void 0}):e==="bushy"?n.chain([[...t,.1],[o(1.05)-.35,s-.05+r,0,.17],[o(1.05)-.75,s-.2+r,0,.18],[o(1.05)-1,s-.35+r,0,.1]],c.BODY,{...a,paint:h=>h[0]<o(1.05)-.82?c.BELLY:void 0}):e==="stub"||e==="deer"||e==="bob"?n.ell(R.add(t,[-.06,.02+r,0]),[.1,.08,.07],e==="deer"?c.BELLY:c.BODY,{...a,paint:e==="bob"?h=>h[0]<t[0]-.08?c.BODY3:void 0:void 0}):e==="puff"?n.ell(R.add(t,[-.04,.02,0]),[.11,.11,.1],c.BELLY,a):e==="squirrel"||e==="star"?n.chain([[...t,.12],[o(1.3),s+.05+r,0,.25],[o(1.3),s+.6+r,0,.3],[o(1),s+.95+r,0,.27],[o(.65),s+.9+r,0,.16]],e==="star"?c.MAGIC:c.BODY,{...a,extra:!0,paint:e==="star"?h=>$n(h,14,.12)?c.GLINT:void 0:void 0}):e==="otter"?n.chain([[...t,.17],[o(1.3),s-.45+r,0,.12],[o(1.6),.1,0,.07],[o(1.85),.06+r,0,.03]],c.BODY,a):e==="stoat"?n.chain([[...t,.08],[o(1.3),s-.12+r,0,.07],[o(1.6),s-.05+r,0,.06]],c.BODY,{...a,paint:h=>h[0]<o(1.45)?c.BODY3:void 0}):e==="flat"?(n.seg(t,[o(1.15),.3,0],.08,.07,c.BODY2,a),n.ell([o(1.4),.1+r*.5,0],[.28,.03,.14],c.BODY3,a)):e==="thin"&&(n.chain([[...t,.04],[o(1.1),s-.3,0,.03],[o(1.12)+r,s-.55,0,.025]],c.BODY,a),n.ell([o(1.12)+r,s-.62,0],[.04,.07,.04],c.BODY3,a))}function cf(n,e,t,i,s,r){const a=!e.antlers,o=a?.45:[0,.5,.95,.95][s]*(r("antlersGlow")?1.15:1),h=r("antlersGlow")?i>0?c.MAGIC2:c.MAGIC:c.ACCENT,l={group:11+(i>0?1:0),extra:!0};if(!o)return;const u=.045*Math.max(.8,o),f=i*.35*o;if(e.antlers==="palm"){const x=R.add(t,[-.06*o,.12*o,f*.3]);n.seg(t,x,u*1.3,u*1.2,h,l);for(let m=0;m<5;m++){const M=.35+m*.3,S=R.norm([-Math.cos(M),Math.sin(M)*.9,i*.55]),b=(.24+.05*(m%2))*o;n.ell(R.add(x,R.mul(S,b*.55)),[b*.6,u*1.5,u*.6],h,{...l,dir:S,up:[0,0,1]})}return}const d=R.add(t,[-.18*o,.3*o,f*.4]),p=R.add(t,[-.25*o,.62*o,f*.8]),g=R.add(t,[-.1*o,.95*o,f]);n.chain([[...t,u*1.2],[...d,u],[...p,u*.85],[...g,u*.4]],h,l);const v=(x,m,M,S)=>n.seg(x,R.add(x,R.mul(R.norm(m),M)),S,S*.35,h,l);v(R.add(t,[-.04*o,.1*o,f*.1]),[1,.6,0],.28*o,u*.8),(o>.4||a)&&v(d,[1,.9,0],.3*o,u*.7),o>.7&&(v(p,[.8,1,0],.28*o,u*.6),v(g,[.3,1,i*.2],.18*o,u*.5))}function hf(n,e,t,i,s="towards"){const r=e===3,a=e===1,o=e===0,h=g=>r&&n.legend.includes(g),l=new Xe,u=t?.03:0,f=o?.48:a?.42:.36,d=(o?.95:1.08)+u;for(const g of[-1,1]){const v=t&&g>0?.04:0;l.seg([.05,.2,g*.14],[.08,.05+v,g*.15],.07,.06,c.BODY2,{group:2});for(const x of[-.04,0,.04])l.ell([.16,.03+v,g*.15+x],[.06,.025,.02],c.ACCENT,{group:2});l.anchors.feet.push({c:[.13,.04+v,g*.15],r:.08,group:g>0?6:2})}if(l.ell([-.32,.32,0],[.22,.06,.14],c.BODY2,{dir:[-1,-.6,0],group:3}),l.ell([0,.55+u,0],[.36,.52,.36],c.BODY,{paint:g=>g[0]>.12&&g[1]<d-f*.5?Math.floor(g[1]*18)%3===0&&$n(g,16,.5)?c.BODY2:c.BELLY:void 0}),!h("wings"))for(const g of[-1,1])l.ell([-.06,.58+u,g*.3],[.4,.3,.08],c.BODY2,{dir:[-.3,-1,0],up:[1,0,0],group:g>0?4:2,paint:v=>$n(v,12,.15)?c.BODY3:void 0});l.ell([0,d,0],[f,f*.9,f],c.BODY);for(const g of[-1,1]){const v=R.norm([.75,-.05,g*.4+.35]),x=R.add(Xe.surface([0,d,0],[f,f*.9,f],v),R.mul(v,-f*.05));l.ell(x,[f*.22,f*.46,f*.4],c.BELLY,{group:1,dir:v});const m=R.add(x,R.mul(v,f*.14));l.ell(m,[f*.1,f*.26,f*.24].map(M=>M*(o?1.15:1)),r?c.MAGIC:c.IRIS,{group:1,dir:v}),l.ell(R.add(m,R.mul(v,f*.07)),[f*.08,f*.14,f*.13].map(M=>M*(o?1.15:1)),r?c.MAGIC2:c.EYE,{group:1,dir:v}),(l.anchors.eyes||={pts:[],size:f*.22}).pts.push(R.add(m,R.mul(v,f*.07))),o||l.ell([f*.05,d+f*.8,g*f*.6],[f*.32,f*.12,f*.08],c.BODY2,{dir:[-.1,1,g*.7],up:[1,0,0],group:1})}if(l.ell(Xe.surface([0,d,0],[f,f*.9,f],R.norm([.75,-.35,.35])),[f*.2,f*.12,f*.1],c.ACCENT,{dir:[.6,-1,.3],group:1}),h("wings"))for(const g of[-1,1])Ba(l,[-.05,.8+u,g*.3],g,1.3,t?.12:0,g>0?c.MAGIC2:c.MAGIC,c.MAGIC,40+(g>0?10:0));if(h("eyesRing"))for(let g=0;g<7;g++){const v=Math.PI*(.15+g/6*.7);l.ell([Math.cos(v)*.2-.1,d+.1+Math.sin(v)*.6,(g-3)*.15],[.07,.07,.07],c.MAGIC2,{group:95+g,extra:!0}),l.ell([Math.cos(v)*.2-.05,d+.1+Math.sin(v)*.6,(g-3)*.15],[.035,.035,.035],c.EYE,{group:95+g,extra:!0})}l.anchors.head={c:[0,d,0],r:[f,f*.9,f]},l.anchors.neck={c:[0,d-f*.75,0],r:f*.85,dir:[0,1,0]},Vl(l);const{sp:p}=Ln(l,{height:Wl(e,i,.95),facing:s});return r&&Hl(p,31),p}const Xi=(n,e,t,i,s,r,a=1)=>{for(const o of i)n.ell(Xe.surface(e,t,R.norm(o)),[s,s*1.2,s],r,{group:a});n.anchors.head||={c:e,r:t},n.anchors.eyes||={pts:i.map(o=>Xe.surface(e,t,R.norm(o))),size:s}},uu=(n,e,t)=>n.ell([e,.005,0],[t,.005,t*.6],c.NOSE,{group:0});function Bn(n,e,t,i,s,r){Vl(n);const{sp:a}=Ln(n,{height:Wl(t,i,s),facing:r});return t===3&&Hl(a,e.id.length*131),a}const du=(n,e,t)=>{n.ell(e,[t,t*.35,t],c.MAGIC,{group:95,extra:!0,paint:i=>i[1]>e[1]?c.MAGIC2:void 0});for(let i=0;i<5;i++){const s=i/5*Math.PI*2;n.ell(R.add(e,[Math.cos(s)*t*.8,t*.55,Math.sin(s)*t*.8]),[t*.38,t*.12,t*.12],c.MAGIC,{dir:[0,1,0],up:[1,0,0],group:96,extra:!0})}},Yl=(n,e)=>e.forEach(([t,i],s)=>n.ell(R.add(t,[0,i*.45,0]),[i*.55,.07,.07],c.MAGIC,{dir:[(s%3-1)*.25,1,(s%2-.5)*.3],group:80+s%2,extra:!0,paint:r=>r[2]>t[2]?c.MAGIC2:void 0}));function uf(n,e,t,i,s="towards"){const r=e===3,a=new Xe,o=t?.03:0;for(const[f,d]of[[.28,.2],[.28,-.2],[-.28,.2],[-.28,-.2]])a.seg([f,.15,d],[f+(d>0?o:-o),.03,d],.06,.05,c.BODY3,{group:d>0?6:2}),a.anchors.feet.push({c:[f+.03+(d>0?o:-o),.03,d],r:.065,group:d>0?6:2});const h=[0,.32,0],l=[.5,.32,.38];a.ell(h,l,c.BODY2,{paint:f=>$n(f,22,.3)?c.BODY3:$n(f,19,.12)?c.BELLY:void 0});for(let f=0;f<46;f++){const d=f*2.399%(Math.PI*2),p=f/46*.9+.05,g=R.norm([Math.cos(d)*Math.sin(p*Math.PI*.5)-.25,Math.cos(p*Math.PI*.5)*.9+.1,Math.sin(d)*Math.sin(p*Math.PI*.5)]);g[0]>.55||a.ell(R.add(Xe.surface(h,l,g),R.mul(g,.02)),[.1,.025,.025],f%4?c.BODY2:c.BODY3,{dir:R.add(g,[-.4,0,0]),group:1})}const u=[.48,.22,0];return a.ell(u,[.22,.14,.15],c.BELLY,{dir:[1,-.3,0],group:1}),a.ell([.69,.16,0],[.04,.04,.04],c.NOSE,{group:1}),Xi(a,u,[.22,.14,.15],[[.3,.6,.55],[.3,.6,-.55]],.035,r?c.MAGIC2:c.EYE),r&&Yl(a,[[[-.3,.55,.1],.35],[[-.05,.62,-.1],.5],[[.2,.55,.12],.4],[[-.15,.58,.2],.3]]),Bn(a,n,e,i,.6,s)}function df(n,e,t,i,s="towards"){const r=e===3,a=new Xe,o=t?.05:0;for(const u of[-1,1])a.ell([-.22,.16,u*.36],[.24,.13,.12],u>0?c.BODY:c.BODY2,{dir:[1,.3,0],group:u>0?6:2,paint:f=>$n(f,14,.15)?c.BODY3:void 0}),a.ell([.05,.04,u*.4],[.16,.04,.08],u>0?c.BODY:c.BODY2,{group:u>0?6:2}),a.seg([.35,.2+o,u*.24],[.42,.03,u*.3],.05,.04,u>0?c.BODY:c.BODY2,{group:u>0?7:2}),a.anchors.feet.push({c:[.45,.03,u*.3],r:.06,group:u>0?7:2},{c:[.12,.04,u*.4],r:.08,group:u>0?6:2});const h=[0,.3+o,0],l=[.5,.28,.4];a.ell(h,l,c.BODY,{paint:u=>u[1]<h[1]-.12?c.BELLY:u[0]>.38&&Math.abs(u[1]-(h[1]-.02))<.018?c.LINE:$n(u,14,.22)?c.BODY3:void 0});for(const u of[-1,1]){const f=[.3,.55+o,u*.17];a.ell(f,[.1,.09,.1],c.BODY,{group:1}),a.ell(Xe.surface(f,[.1,.09,.1],R.norm([.6,.5,u*.5])),[.05,.05,.05],r?c.MAGIC2:c.IRIS,{group:1}),a.ell(Xe.surface(f,[.11,.1,.11],R.norm([.65,.45,u*.5])),[.03,.015,.03],c.EYE,{group:1})}return a.anchors.head={c:[.22,.45+o,0],r:[.3,.2,.3],top:[.18,.62+o,0]},a.anchors.eyes={pts:[-1,1].map(u=>Xe.surface([.3,.55+o,u*.17],[.1,.09,.1],R.norm([.6,.5,u*.5]))),size:.05},a.anchors.neck={c:[.32,.3+o,0],r:.25,dir:[1,.3,0]},r&&du(a,[.15,.66+o,0],.16),Bn(a,n,e,i,.55,s)}function ff(n,e,t,i,s="towards"){const r=e===3,a=e===1,o=d=>r&&n.legend.includes(d),h=new Xe,l=t?.02:0;for(const d of[-1,1]){const p=t&&d>0?.04:0;h.seg([0,.3,d*.08],[.03,.03+p,d*.08],.03,.025,c.NOSE,{group:d>0?7:2}),h.ell([.08,.02+p,d*.08],[.08,.015,.04],c.NOSE,{group:2}),h.anchors.feet.push({c:[.07,.03+p,d*.08],r:.06,group:d>0?7:2})}if(h.ell([-.55,.42,0],[.32,.035,.12],c.BODY2,{dir:[-1,-.25,0],group:3}),h.ell([0,.52+l,0],[.42,.26,.24],c.BODY,{dir:[1,.45,0]}),!o("wings"))for(const d of[-1,1])h.ell([-.1,.55+l,d*.2],[.45,.17,.05],c.BODY2,{dir:[-1,-.25,0],group:d>0?4:2});const u=[.36,.84+l,0],f=a?.19:.16;if(h.ell(u,[f*1.1,f,f*.95],c.BODY,{paint:d=>d[1]>u[1]+f*.55?c.BELLY:void 0}),h.ell(R.add(u,[f*1.5,-f*.25,0]),[f*1,f*.38,f*.3],c.NOSE,{dir:[1,-.2,0],group:1}),Xi(h,u,[f*1.1,f,f*.95],[[.55,.35,.65],[.55,.35,-.65]],f*.16,r?c.MAGIC2:c.EYE),o("wings"))for(const d of[-1,1])Ba(h,[-.05,.65+l,d*.18],d,1.1,t?.1:0,d>0?c.MAGIC2:c.MAGIC,c.MAGIC,40+(d>0?10:0));if(o("eyesRing"))for(let d=0;d<6;d++){const p=Math.PI*(.2+d/5*.6);h.ell([Math.cos(p)*.25-.1,.95+Math.sin(p)*.45,(d-2.5)*.12],[.06,.06,.06],c.MAGIC2,{group:95+d,extra:!0})}return Bn(h,n,e,i,.75,s)}function pf(n,e,t,i,s="towards"){const r=e===3,a=d=>r&&n.legend.includes(d),o=new Xe,h=t===0,l=.55,u=a("wingsBig")?1.5:1;uu(o,0,.3*u);for(const d of[-1,1]){const p=[0,l+.05,d*.1],g=[.05,l+(h?.35:-.05),d*.45*u],v=[[-.05,l+(h?.45:-.15),d*.85*u],[-.25,l+(h?.2:-.25),d*.75*u],[-.3,l+(h?0:-.25),d*.4*u]],x=a("wingsBig")?c.MAGIC:c.BODY2,m=a("wingsBig")?c.MAGIC2:c.BODY3;o.seg(p,g,.03,.025,m,{group:11});for(const w of v)o.seg(g,w,.02,.012,m,{group:11});const M=R.sub(v[0],p),S=R.norm(M),b=R.norm(R.sub(v[2],g)),A=R.norm(R.sub(b,R.mul(S,R.dot(b,S))));o.flat(R.add(R.lerp(p,v[0],.5),R.mul(A,.12*u)),S,A,Math.hypot(...M)*.55,.3*u,os.membrane(x),{group:10+(d>0?1:0),bend:.2})}o.ell([0,l,0],[.13,.16,.12],c.BODY,{group:1});const f=[.08,l+.2,0];o.ell(f,[.12,.11,.11],c.BODY,{group:1});for(const d of[-1,1])o.ell(R.add(f,[-.02,.15,d*.07]),[.12,.045,.02],c.BODY,{dir:[.1,1,d*.3],up:[1,0,0],group:1,paint:p=>p[0]>f[0]-.01?c.EAR:void 0});return Xi(o,f,[.12,.11,.11],[[.7,.2,.5],[.7,.2,-.5]],.025,r?c.MAGIC2:c.EYE),o.ell(Xe.surface(f,[.12,.11,.11],[1,-.2,0]),[.025,.02,.03],c.NOSE,{group:1}),Bn(o,n,e,i,.55,s)}function mf(n,e,t,i,s="towards"){const r=e===3,a=new Xe,o=t?.03:0;a.seg([-.5,.18,0],[-.62,.12,0],.04,.02,c.SKIN,{group:3});for(const h of[-1,1])a.ell([-.3,.05,h*.2],[.07,.04,.05],c.SKIN,{group:h>0?6:2}),a.anchors.feet.push({c:[-.3,.05,h*.2],r:.07,group:h>0?6:2});a.ell([0,.3,0],[.52,.29,.33],c.BODY,{paint:h=>h[1]>.45?c.BODY2:void 0}),a.ell([.55,.24,0],[.2,.07,.07],c.SKIN,{dir:[1,-.15,0],group:1}),a.ell([.74,.21,0],[.04,.05,.06],c.NOSE,{group:1});for(const h of[-1,1]){const l=[.32,.1-(h>0?o:0),h*.34];a.ell(l,[.13,.035,.12],c.SKIN,{group:h>0?7:2,axes:[[1,0,0],[0,1,0],[0,0,1]]});for(let u=0;u<4;u++)a.ell(R.add(l,[.14,-.01,h*(u-1.5)*.05]),[.05,.015,.015],c.ACCENT,{group:h>0?7:2})}for(const h of[-1,1])a.ell(Xe.surface([0,.3,0],[.52,.29,.33],R.norm([.85,.3,h*.35])),[.015,.015,.015],r?c.MAGIC2:c.EYE,{group:1});return a.anchors.head={c:[.32,.34,0],r:[.25,.22,.25],top:[.3,.58,0]},a.anchors.eyes={pts:[-1,1].map(h=>Xe.surface([0,.3,0],[.52,.29,.33],R.norm([.85,.3,h*.35]))),size:.03},a.anchors.neck={c:[.36,.3,0],r:.27,dir:[1,.1,0]},r&&du(a,[.15,.62,0],.15),Bn(a,n,e,i,.55,s)}function gf(n,e,t,i,s="towards"){const r=e===3,a=f=>r&&n.legend.includes(f),o=new Xe;for(const f of[-1,1])for(let d=0;d<3;d++){const p=.25-d*.25,g=(d+(f>0?1:0)+t)%2?.06:-.06,v=[p,.22,f*.2];o.chain([[...v,.03],[p+g+(1-d)*.06,.32,f*.42,.025],[p+g*1.5+(1-d)*.15,.02,f*.55,.015]],f>0?c.BODY2:c.BODY3,{group:f>0?7:2})}o.ell([-.12,.34,0],[.46,.24,.32],c.BODY,{paint:f=>Math.abs(f[2])<.018&&f[1]>.4?c.LINE:f[1]>.5&&f[2]>.05&&f[2]<.17?c.BELLY:void 0}),o.ell([.38,.33,0],[.16,.16,.26],c.BODY,{group:1});const h=[.56,.3,0];o.ell(h,[.1,.1,.17],c.BODY2,{group:1});const l=[.3,.5,.7,.75][e]*(a("horn")?1.3:1),u=a("horn")?c.MAGIC:c.BODY3;for(const f of[-1,1]){const d=R.add(h,[.08,.02,f*.1]),p=R.add(d,[l*.7,l*.45,f*l*.15]),g=R.add(p,[l*.25,-l*.12,-f*l*.12]);o.chain([[...d,.045],[...p,.035],[...g,.015]],u,{group:8+(f>0?1:0)}),o.seg(R.lerp(d,p,.55),R.add(R.lerp(d,p,.55),[0,l*.22,0]),.02,.008,u,{group:8})}for(const f of[-1,1])o.chain([[...R.add(h,[.05,.06,f*.1]),.012],[h[0]+.1,.5,f*.22,.012],[h[0]+.2,.5,f*.26,.012]],c.BODY3,{group:9,extra:!0});return Xi(o,h,[.1,.1,.17],[[.4,.3,.85],[.4,.3,-.85]],.032,r?c.MAGIC2:c.EYE,9),a("crystals")&&Yl(o,[[[-.35,.5,.1],.3],[[-.1,.55,-.08],.45],[[.1,.5,.1],.35]]),Bn(o,n,e,i,.5,s)}function xf(n,e,t,i,s="towards"){const r=e===3,a=new Xe,o=t?.04:0;a.ell([0,.07,0],[.6+o,.07,.17],c.SKIN,{group:1}),a.chain([[.45+o,.08,0,.1],[.6+o,.25,0,.09],[.68+o,.28,0,.08]],c.SKIN,{group:1});for(const u of[-1,1])a.seg([.7+o,.32,u*.04],[.78+o,.55,u*.1],.018,.014,c.SKIN,{group:5}),a.ell([.78+o,.57,u*.1],[.03,.03,.03],r?c.MAGIC2:c.EYE,{group:5});a.anchors.head={c:[.68+o,.3,0],r:[.09,.08,.09],top:[.66+o,.38,0]},a.anchors.eyes={pts:[-1,1].map(u=>[.78+o,.57,u*.1]),size:.03},a.anchors.neck={c:[.55+o,.17,0],r:.1,dir:[1,1.2,0]};const h=[-.12,.4,0],l=r?c.MAGIC:c.BODY;return a.ell(h,[.32,.32,.22],l,{group:3,paint:u=>{const f=Math.atan2(u[1]-h[1],u[0]-h[0]);return((Math.hypot(u[0]-h[0],u[1]-h[1])/.32-f/(Math.PI*2)*.3)%.3+.3)%.3<.06?r?c.MAGIC2:c.BODY3:void 0}}),Bn(a,n,e,i,.45,s)}function vf(n,e,t,i,s="towards"){const r=e===3,a=new Xe;for(const o of[-1,1])for(let h=0;h<7;h++){const l=-.45+h*.15,u=(h+t)%2?.03:-.03;a.seg([l,.1,o*.22],[l+u,.01,o*.33],.025,.015,c.BODY3,{group:o>0?7:2})}for(const o of[-1,1])a.chain([[.5,.15,o*.08,.02],[.7,.3,o*.2,.015],[.82,.22,o*.26,.012]],c.BODY3,{group:9,extra:!0});return a.ell([0,.18,0],[.58,.2,.3],c.BODY,{paint:o=>(Math.floor((o[0]+.6)*9)%2&&o[1]>.2?c.BODY2:void 0)||(Math.abs((o[0]+.6)*9%1)<.12?c.LINE:void 0)}),Xi(a,[0,.18,0],[.58,.2,.3],[[.92,.3,.25],[.92,.3,-.25]],.02,r?c.MAGIC2:c.EYE),r&&Yl(a,[[[-.3,.32,.05],.3],[[0,.37,-.05],.45],[[.25,.32,.05],.32]]),Bn(a,n,e,i,.4,s)}function Mf(n,e,t,i,s="towards"){const r=e===3,a=e===1,o=p=>r&&n.legend.includes(p),h=new Xe,l=t?.7:0,u=[];for(let p=0;p<=12;p++){const g=p/12;u.push([-.9+g*1.2,.07,Math.sin(g*Math.PI*2+l)*.25*(1-g*.5),.03+.045*Math.sin(Math.min(1,g*1.4)*Math.PI/2)])}u.push([.38,.25,u[12][2],.07],[.42,.45,u[12][2]*.8,.065]),h.chain(u,c.BODY,{paint:p=>p[1]<.05&&p[0]<.35?c.BELLY:$n([p[0]*1.5,p[1],p[2]],14,.3)?c.BODY3:void 0});const f=[.5,.5,u[13][2]*.8],d=a?.11:.09;if(h.ell(f,[d*1.5,d*.75,d],c.BODY,{dir:[1,-.15,0],group:1}),Xi(h,f,[d*1.5,d*.75,d],[[.5,.5,.7],[.5,.5,-.7]],d*.22,r?c.MAGIC2:c.EYE),t||h.seg(R.add(f,[d*1.4,-d*.2,0]),R.add(f,[d*2.3,-d*.3,0]),.01,.008,c.SKIN,{group:1}),h.anchors.feet.push({c:R.add(u[0].slice(0,3),[-.02,-.01,0]),r:.06,group:3,tail:!0}),h.anchors.neck={c:[.42,.36,u[12][2]*.9],r:.075,dir:[.2,1,0]},o("wings"))for(const p of[-1,1])Ba(h,[0,.2,p*.05],p,.9,t?.1:0,p>0?c.MAGIC2:c.MAGIC,c.MAGIC,40+(p>0?10:0));return Bn(h,n,e,i,.45,s)}function _f(n,e,t,i,s="towards"){const r=e===3,a=d=>r&&n.legend.includes(d),o=new Xe,h=t===0,l=.55,u=a("wingsBig")?1.45:1,f=a("wingsBig")?c.MAGIC:c.BODY;uu(o,0,.3*u);for(const d of[-1,1]){const p=h?.5:-.1,g=R.norm([.35,p,d]),v=R.norm([-.3,p*.6,d]);o.flat(R.add([0,l,d*.05],R.mul(g,.38*u)),g,R.norm(R.cross(g,[0,1,0])),.4*u,.24*u,os.spotted(f,c.BELLY,c.BODY3),{group:10+(d>0?1:0)}),o.flat(R.add([-.05,l,d*.05],R.mul(v,.26*u)),v,R.norm(R.cross(v,[0,1,0])),.27*u,.17*u,os.spotted(a("wingsBig")?c.MAGIC2:c.BODY2,c.BODY2,c.BODY2),{group:12+(d>0?1:0)}),o.chain([[.12,l+.08,d*.03,.015],[.2,l+.25,d*.1,.025],[.24,l+.32,d*.14,.012]],c.BODY2,{group:11})}return o.ell([0,l,0],[.22,.09,.09],c.BELLY,{group:1,paint:d=>$n(d,30,.25)?c.BODY2:void 0}),o.ell([.17,l+.03,0],[.07,.07,.07],c.BELLY,{group:1}),Xi(o,[.17,l+.03,0],[.07,.07,.07],[[.7,.3,.6],[.7,.3,-.6]],.02,r?c.MAGIC2:c.EYE),Bn(o,n,e,i,.5,s)}function bf(n,e,t,i,s="towards"){const r=e===3,a=l=>r&&n.legend.includes(l),o=new Xe,h=t?.05:0;for(let l=0;l<9;l++){const u=l/8,f=-.6+u*1.15;o.ell([f,.12+Math.sin(u*Math.PI)*(.06+h),0],[.08,.1-u*.02,.12-u*.03],l<2?c.MAGIC2:l%2?c.BODY2:c.BODY,{group:1})}a("lantern")&&o.ell([-.75,.3,0],[.22,.22,.22],c.MAGIC2,{group:3,paint:l=>l[1]<.2?c.MAGIC:void 0});for(let l=0;l<6;l++)o.seg([-.2+l*.12,.05,.08],[-.2+l*.12+(l%2?.02:-.02)*(t?-1:1),0,.12],.015,.01,c.BODY3,{group:7});return o.ell([.6,.14,0],[.06,.06,.08],c.BODY3,{group:1}),Xi(o,[.6,.14,0],[.06,.06,.08],[[.6,.3,.7],[.6,.3,-.7]],.015,r?c.MAGIC2:c.EYE),Bn(o,n,e,i,.4,s)}function Sf(n,e,t,i,s="towards"){const r=e===3,a=u=>r&&n.legend.includes(u),o=new Xe,h=[.15,.28,0];for(const u of[-1,1])for(let f=0;f<4;f++){const d=-.6+f*.4,p=(f+(u>0?0:1)+t)%2?.05:-.05,g=R.add(h,[.05-f*.04,0,u*.1]),v=R.add(g,[Math.cos(d)*.3*(f<2?1:-.6)+p,.3,u*.3]),x=R.add(g,[Math.cos(d)*.55*(f<2?1:-.8)+p*1.5,-.28,u*.55]);o.chain([[...g,.03],[...v,.028],[...x,.015]],u>0?c.BODY2:c.BODY3,{group:u>0?7:2})}o.ell([-.28,.38,0],[.34,.28,.3],c.BODY,{paint:u=>(Math.abs(u[2])<.03||Math.abs(u[0]+.28)<.03)&&u[1]>.45?c.BELLY:void 0}),o.ell(h,[.18,.13,.17],c.BODY2,{group:1}),o.anchors.head={c:h,r:[.18,.13,.17]},o.anchors.eyes={pts:[[.05,.05],[.05,-.05]].map(([u,f])=>Xe.surface(h,[.18,.13,.17],R.norm([.9,u*6,f*4]))),size:.03},o.anchors.neck={c:[-.02,.32,0],r:.15,dir:[1,0,0]};const l=a("eyesRing");for(const[u,f]of[[.05,.05],[.05,-.05],[.02,.1],[.02,-.1]])o.ell(Xe.surface(h,[.18,.13,.17],R.norm([.9,u*6,f*4])),[.025,.025,.025],l?c.MAGIC2:c.EYE,{group:1});if(l)for(let u=0;u<5;u++){const f=Math.PI*(.2+u/4*.6);o.ell([-.3+Math.cos(f)*.2,.75+Math.sin(f)*.35,(u-2)*.12],[.06,.06,.06],c.MAGIC2,{group:95+u,extra:!0})}return Bn(o,n,e,i,.5,s)}const yf=new Map(Object.entries({owl:hf,hedgehog:uf,toad:df,raven:ff,bat:pf,mole:mf,beetle:gf,snail:xf,woodlouse:vf,snake:Mf,moth:_f,glowworm:bf,spider:Sf})),Xl=[{id:"wolf",name:"Wolf",plan:"quad",hue:.08,sat:.24,val:.56,legend:["wings","mane"],q:{len:.64,chest:.42,tuck:.6,neck:.32,neckAng:.7,neckW:.42,hr:.26,snout:.82,snoutD:.7,ear:"point",earS:.82,tail:"brush",paw:"paw",legW:1.25,saddle:!0,belly:!0},tail:"up"},{id:"fox",name:"Fox",plan:"quad",q:{hgt:.8,len:.62,chest:.4,tuck:.5,neck:.3,neckAng:.7,neckW:.32,hr:.24,snout:1.05,snoutD:.5,snoutTaper:.6,ear:"point",earS:1.35,tail:"bushy",paw:"paw",legW:.9,belly:!0,socks:.3},hue:.06,sat:.8,val:.9,belly:"white",legend:["tails"]},{id:"badger",name:"Badger",plan:"quad",q:{hgt:.62,len:.78,chest:.2,tuck:.22,neck:.18,neckAng:.1,neckW:.5,hr:.26,snout:1,snoutD:.55,snoutTaper:.55,ear:"round",earS:.7,tail:"stub",paw:"paw",legW:1.35,legMat:c.BODY3,face:"badger",shaggy:!0},hue:.65,sat:.08,val:.45,legend:["crystals"]},{id:"boar",name:"Boar",plan:"quad",hue:.07,sat:.62,val:.5,legend:["tusksBig"],q:{len:.72,chest:.34,tuck:.42,neck:.2,neckAng:-.15,neckW:.55,hr:.27,snout:1.25,snoutD:.62,snoutTaper:.55,ear:"small",earS:.8,tail:"thin",paw:"hoof",legW:1.15,ridge:!0,tusks:!0,back:"hump",disc:!0},ridge:!0},{id:"stag",name:"Stag",plan:"quad",q:{hgt:1.3,len:.6,chest:.6,tuck:.7,neck:.55,neckAng:.95,neckW:.32,hr:.2,snout:1.15,snoutD:.6,snoutTaper:.65,ear:"point",earS:1.1,tail:"deer",paw:"hoof",legW:.75,antlers:"branch",rump:!0,spots:"young",belly:!0},hue:.08,sat:.5,val:.7,legend:["antlersGlow"]},{id:"hare",name:"Hare",plan:"quad",q:{hgt:.72,len:.5,chest:.4,tuck:.45,neck:.2,neckAng:.9,neckW:.35,hr:.27,snout:.65,snoutD:.7,ear:"long",earS:2.4,tail:"puff",paw:"paw",legW:.85,haunch:1.35,hindFoot:1.6,back:"arch",belly:!0,whiskers:!0},hue:.08,sat:.4,val:.72,legend:["jackalope"]},{id:"owl",name:"Owl",plan:"owl",hue:.08,sat:.5,val:.55,legend:["eyesRing","wings"]},{id:"bear",name:"Bear",plan:"quad",q:{hgt:1.15,len:.72,chest:.38,tuck:.4,neck:.25,neckAng:.3,neckW:.55,hr:.28,snout:.7,snoutD:.62,snoutTaper:.7,ear:"round",earS:.8,tail:"stub",paw:"paw",legW:1.55,back:"hump",muzzle:!0,shaggy:!0},hue:.07,sat:.55,val:.42,legend:["moss"]},{id:"hedgehog",name:"Hedgehog",plan:"hedgehog",hue:.08,sat:.4,val:.5,legend:["crystals"]},{id:"squirrel",name:"Squirrel",plan:"quad",q:{hgt:.55,len:.45,chest:.35,tuck:.4,neck:.2,neckAng:.9,neckW:.35,hr:.3,snout:.55,snoutD:.65,ear:"tuft",earS:1.1,tail:"squirrel",paw:"paw",legW:.8,haunch:1.3,back:"arch",belly:!0,whiskers:!0},hue:.03,sat:.75,val:.75,belly:"white",legend:["starTail"]},{id:"toad",name:"Toad",plan:"toad",hue:.2,sat:.5,val:.55,legend:["crown"]},{id:"otter",name:"Otter",plan:"quad",q:{hgt:.55,len:1,chest:.25,tuck:.25,neck:.3,neckAng:.35,neckW:.5,hr:.27,snout:.6,snoutD:.7,ear:"round",earS:.5,tail:"otter",paw:"paw",legW:1.1,muzzle:!0,belly:!0,whiskers:!0},hue:.07,sat:.55,val:.45,belly:"white",legend:["ribbons"]},{id:"lynx",name:"Lynx",plan:"quad",q:{hgt:.9,len:.55,chest:.5,tuck:.55,neck:.25,neckAng:.8,neckW:.4,hr:.27,snout:.5,snoutD:.75,snoutTaper:.8,ear:"tuft",earS:1,tail:"bob",paw:"paw",legW:1.2,cheeks:!0,spots:!0,belly:!0,whiskers:!0},hue:.09,sat:.45,val:.75,legend:["mane"]},{id:"elk",name:"Elk",plan:"quad",q:{hgt:1.4,len:.68,chest:.6,tuck:.66,neck:.45,neckAng:.75,neckW:.42,hr:.24,snout:1.6,snoutD:.9,snoutTaper:.85,ear:"point",earS:.9,tail:"stub",paw:"hoof",legW:.9,back:"hump",antlers:"palm",shaggy:!0},hue:.07,sat:.55,val:.38,legend:["antlersGlow","moss"]},{id:"raven",name:"Raven",plan:"raven",hue:.68,sat:.35,val:.3,legend:["wings","eyesRing"]},{id:"bat",name:"Bat",plan:"bat",hue:.78,sat:.25,val:.45,legend:["wingsBig"]},{id:"mole",name:"Mole",plan:"mole",hue:.7,sat:.15,val:.32,legend:["crown"]},{id:"beaver",name:"Beaver",plan:"quad",q:{hgt:.6,len:.65,chest:.2,tuck:.22,neck:.2,neckAng:.4,neckW:.55,hr:.28,snout:.6,snoutD:.75,ear:"round",earS:.45,tail:"flat",paw:"paw",legW:1.2,back:"arch",teeth:!0,whiskers:!0},hue:.06,sat:.6,val:.45,legend:["moss"]},{id:"stoat",name:"Stoat",plan:"quad",q:{hgt:.5,len:1,chest:.3,tuck:.33,neck:.35,neckAng:.6,neckW:.32,hr:.25,snout:.6,snoutD:.6,ear:"round",earS:.6,tail:"stoat",paw:"paw",legW:.8,belly:!0,back:"arch",whiskers:!0},hue:.1,sat:.25,val:.92,legend:["ribbons","mane"]},{id:"snail",name:"Snail",plan:"snail",hue:.08,sat:.45,val:.55,legend:["glowShell"]},{id:"ram",name:"Ram",plan:"quad",q:{hgt:.95,len:.6,chest:.48,tuck:.52,neck:.22,neckAng:.45,neckW:.48,hr:.25,snout:.85,snoutD:.75,snoutTaper:.8,ear:"small",earS:.7,tail:"stub",paw:"hoof",legW:.9,wool:!0,horns:"curl",face:"dark"},hue:.1,sat:.12,val:.88,legend:["hornsGlow"]},{id:"woodlouse",name:"Woodlouse",plan:"woodlouse",hue:.65,sat:.12,val:.45,legend:["crystals"]},{id:"snake",name:"Snake",plan:"snake",hue:.25,sat:.45,val:.45,legend:["wings"]},{id:"moth",name:"Moth",plan:"moth",hue:.1,sat:.3,val:.7,legend:["wingsBig"]},{id:"marten",name:"Pine marten",plan:"quad",q:{hgt:.55,len:.78,chest:.35,tuck:.38,neck:.3,neckAng:.55,neckW:.35,hr:.25,snout:.65,snoutD:.6,ear:"round",earS:.9,tail:"bushy",paw:"paw",legW:.85,belly:!0,back:"arch"},hue:.07,sat:.6,val:.45,legend:["mane"]},{id:"salamander",name:"Salamander",plan:"quad",q:{hgt:.42,len:.9,chest:.14,tuck:.14,neck:.12,neckAng:.05,neckW:.5,hr:.27,snout:.55,snoutD:.55,ear:"none",tail:"otter",paw:"paw",legW:1,spots:!0,spotMat:"belly"},hue:.1,sat:.1,val:.22,belly:"yellow",legend:["flames"]},{id:"glowworm",name:"Glow-worm",plan:"glowworm",hue:.12,sat:.4,val:.35,legend:["lantern"]},{id:"spider",name:"Spider",plan:"spider",hue:.07,sat:.45,val:.4,legend:["eyesRing"]},{id:"dormouse",name:"Dormouse",plan:"quad",q:{hgt:.38,len:.45,chest:.35,tuck:.38,neck:.15,neckAng:.6,neckW:.4,hr:.34,snout:.45,snoutD:.7,ear:"round",earS:.85,tail:"squirrel",paw:"paw",legW:.8,back:"arch",belly:!0,whiskers:!0,eyeK:1.6},hue:.09,sat:.6,val:.75,belly:"white",legend:["starTail"]},{id:"beetle",name:"Stag beetle",plan:"beetle",hue:.78,sat:.5,val:.35,legend:["horn","crystals"]}],fu=Object.fromEntries(Xl.map(n=>[n.id,n])),Xo=[[[255,70,170],[255,245,250],[255,230,70]],[[40,220,255],[255,236,60],[255,80,180]],[[150,80,255],[175,255,60],[255,255,255]]],Ko={sneakers:[[255,70,90],[250,250,245]],glitter:[[215,215,235],[190,190,210]],platform:[[160,60,230],[40,30,52]]},wf=["bar","star","heart"];function Ef(n,e=!0){const t=Ua((n|0)*7919+17),i=t()<.12;return{collar:e,hat:i||t()<.45?Math.floor(t()*Xo.length):null,glasses:i||t()<.4?wf[t()<.6?0:t()<.5?1:2]:null,shoes:i||t()<.4?Object.keys(Ko)[Math.floor(t()*3)]:null}}function Af(n,e,t=null){const i=Tf(n,e);if(!t)return i;if(t.collar&&(i[c.COLLAR]=Array.isArray(t.collar)?t.collar:i[c.MAGIC]),t.hat!=null){const[s,r,a]=Xo[t.hat%Xo.length];i[c.HAT1]=s,i[c.HAT2]=r,i[c.POM]=a}if(t.glasses&&(i[c.SHADES]=[22,18,32],i[c.FRAME]=t.glasses==="heart"?[255,60,110]:[255,90,210]),t.shoes){const[s,r]=Ko[t.shoes]||Ko.sneakers;i[c.SHOE]=s,i[c.SOLE]=r}if(t.woken){i[c.WOKEN]=[255,40,36];for(const s of[c.BODY,c.BODY2,c.BODY3,c.BELLY,c.ACCENT,c.EAR])i[s]&&(i[s]=i[s].map((r,a)=>Math.round(r*.72+[30,8,12][a]*.1)))}return i}function Tf(n,e){const t=fu[n],i=e.cVal/.85,s=e.cSat/.6,r=_e(t.hue,t.sat*s*e.sat,t.val*i),a=t.belly==="yellow"?[240,196,40]:t.belly==="white"||t.q?.face==="badger"?[236,232,222]:_e(t.hue+.03,t.sat*.5*s,Math.min(1,t.val*i*1.3+.08)),o=_e(e.magicHue+t.hue*.3,.6,1),h=_e(e.magicHue+t.hue*.3,.18,1),l=["boar","stag","elk","ram"].includes(t.id);return{[c.BODY]:r,[c.BODY2]:_e(t.hue+.02,Math.min(1,t.sat*s*1.2+.05),t.val*i*.66),[c.BODY3]:_e(t.hue+.03,Math.min(1,t.sat*s*1.3+.1),t.val*i*.4),[c.BELLY]:a,[c.ACCENT]:l?[236,226,200]:_e(t.hue+.05,t.sat*.6,Math.min(1,t.val*i*.5+.25)),[c.MAGIC]:o,[c.MAGIC2]:h,[c.LEAF]:_e(.3,.55,.55),[c.LEAF2]:_e(.25,.5,.75),[c.LEAF3]:_e(.33,.6,.35),[c.TRUNK]:_e(.07,.45,.32),[c.EYE]:[24,18,30],[c.PUPIL]:[70,40,90],[c.GLINT]:[255,255,245],[c.NOSE]:[38,28,36],[c.EAR]:_e(t.hue+.97,Math.min(1,t.sat*.6+.2),Math.min(1,t.val*i*.55+.2)),[c.IRIS]:t.plan==="owl"?[255,176,40]:_e(.12,.7,.85),[c.SKIN]:[238,158,192]}}const Rf=["size","growth","pixel","head","eye","legs","long","fur"],tr=new Map;function Cf(n,e,t,i,s="towards",r=null){const a=fu[n]||Xl[0],o=r&&(r.collar||r.hat!=null||r.glasses||r.shoes||r.woken)?r:null,h=[a.id,e,t,s,...Rf.map(u=>i[u]),o?[!!o.collar,o.hat??"",o.glasses||"",o.shoes||"",!!o.woken].join(","):""].join("|");let l=tr.get(h);if(!l){if(l=sf(o,()=>a.q?of(a,e,t,i,s):yf.get(a.plan)(a,e,t,i,s)),o?.woken)for(let u=0;u<l.m.length;u++)(l.m[u]===c.EYE||l.m[u]===c.IRIS||l.m[u]===c.PUPIL)&&(l.m[u]=c.WOKEN);tr.size>600&&tr.delete(tr.keys().next().value),tr.set(h,l)}return l}const ka=.07,Kl=.048,Ze=(...n)=>({l:n}),St=(n,e,t,i,s)=>({a:[n,e,t,i,s]}),an=(n,e)=>({d:[n,e]}),pt=(n,e=.86)=>Ze([.5,e],[.5,n]),mt=St(.5,.76,.13,25,155),Lf=n=>n.l?{l:n.l.map(([e,t])=>[1-e,t])}:n.a?{a:[1-n.a[0],n.a[1],n.a[2],180-n.a[3],180-n.a[4]]}:{d:[1-n.d[0],n.d[1]]},gt=(...n)=>n.flatMap(e=>[e,Lf(e)]);function pi(n,e,t){const i=e[0]-n[0],s=e[1]-n[1],r=Math.hypot(i,s),a=t*r,o=(r*r/4+a*a)/(2*Math.abs(a)),h=(n[0]+e[0])/2,l=(n[1]+e[1])/2,u=s/r,f=-i/r,d=(o-Math.abs(a))*Math.sign(a),p=h-u*d,g=l-f*d,v=Math.atan2(n[1]-g,n[0]-p)*180/Math.PI;let m=Math.atan2(e[1]-g,e[0]-p)*180/Math.PI-v;for(;m>180;)m-=360;for(;m<-180;)m+=360;return St(p,g,o,v,v+m)}const Pf=(n,e,t,i,s,r=24)=>Ze(...Array.from({length:r+1},(a,o)=>[n+i*Math.sin(o/r*s*2*Math.PI),e+(t-e)*o/r])),Df=(n,e,t,i,s,r=0,a=40)=>Ze(...Array.from({length:a+1},(o,h)=>{const l=h/a,u=(r+l*s*360)*Math.PI/180,f=t+(i-t)*l;return[n+f*Math.cos(u),e+f*Math.sin(u)]})),Pr=(n,e,t,i,s)=>s.map(r=>{const a=Math.cos(r*Math.PI/180),o=Math.sin(r*Math.PI/180);return Ze([n+t*a,e+t*o],[n+i*a,e+i*o])}),If={wolf:[pt(.3),Ze([.28,.08],[.5,.3],[.72,.08]),St(.5,.55,.2,-55,55),mt,an(.5+.2*Math.cos(-55*Math.PI/180),.55+.2*Math.sin(-55*Math.PI/180))],fox:[pt(.34),Ze([.36,.06],[.5,.34],[.64,.06]),St(.67,.66,.17,180,-80),an(.67+.17*Math.cos(-80*Math.PI/180),.66+.17*Math.sin(-80*Math.PI/180)),mt],badger:[pt(.1),Ze([.24,.3],[.76,.3]),...gt(Ze([.33,.14],[.33,.56])),mt,...gt(an(.24,.3))],boar:[pt(.16),...gt(St(.36,.24,.15,45,180)),...Pr(.5,.16,0,.1,[-130,-90,-50]),mt],stag:[pt(.42),...gt(Ze([.5,.42],[.34,.26],[.3,.06]),Ze([.335,.25],[.16,.2]),Ze([.32,.15],[.18,.07])),mt],hare:[pt(.44),...gt(Ze([.5,.44],[.4,.34],[.38,.06])),St(.62,.66,.09,180,540),mt,...gt(an(.38,.06))],owl:[pt(.44),...gt(St(.33,.3,.13,0,360),Ze([.24,.18],[.18,.05])),mt,...gt(an(.33,.3))],bear:[pt(.24),Ze([.24,.3],[.76,.3]),...gt(St(.3,.3,.09,180,360)),...gt(Ze([.36,.5],[.32,.62])),mt],hedgehog:[pt(.52),St(.5,.52,.2,180,360),...Pr(.5,.52,.22,.34,[-160,-125,-90,-55,-20]),mt],squirrel:[pt(.2),Ze([.5,.2],[.4,.08]),St(.66,.4,.16,100,-200),an(.66+.16*Math.cos(-200*Math.PI/180),.4+.16*Math.sin(-200*Math.PI/180)),mt],toad:[pt(.42),Ze([.16,.54],[.24,.42],[.76,.42],[.84,.54]),...gt(St(.34,.3,.1,0,360)),mt,...gt(an(.16,.54))],otter:[pt(.24),St(.5,.5,.28,-100,100),an(.5+.28*Math.cos(-100*Math.PI/180),.5+.28*Math.sin(-100*Math.PI/180)),pi([.18,.64],[.36,.64],.3),mt],lynx:[pt(.32),Ze([.26,.2],[.5,.32],[.74,.2]),...gt(Ze([.26,.2],[.26,.06])),Ze([.5,.68],[.66,.62]),mt,...gt(an(.26,.06))],elk:[pt(.3),...gt(Ze([.5,.3],[.42,.2]),St(.3,.16,.12,0,180),Ze([.18,.16],[.14,.06])),Ze([.5,.44],[.6,.52]),mt],raven:[pt(.14),Ze([.5,.14],[.3,.22]),Ze([.18,.56],[.5,.38],[.82,.56]),mt,an(.58,.17),...gt(an(.18,.56))],bat:[pt(.3),St(.5,.16,.14,20,160),...gt(Ze([.5,.38],[.12,.26]),pi([.12,.26],[.24,.46],-.25),pi([.24,.46],[.38,.5],-.3),pi([.38,.5],[.5,.52],-.3)),mt],mole:[pt(.44),St(.5,.3,.16,0,180),...Pr(.5,.3,.19,.3,[-160,-125,-55,-20]),Ze([.5,.14],[.5,.04]),mt],beaver:[pt(.36),Ze([.32,.2],[.68,.2]),...gt(Ze([.44,.2],[.44,.34])),Ze([.5,.56],[.68,.66],[.5,.76],[.32,.66],[.5,.56]),mt],stoat:[pt(.18),St(.5,.44,.24,180,360),Ze([.5,.18],[.6,.08]),mt,...gt(an(.26,.44))],snail:[pt(.52),Df(.5,.33,.03,.2,1.6,90),Ze([.66,.2],[.76,.06]),mt,an(.76,.06)],ram:[pt(.24),...gt(St(.36,.24,.14,0,-250)),mt,...gt(an(.36+.14*Math.cos(-250*Math.PI/180),.24+.14*Math.sin(-250*Math.PI/180)))],woodlouse:[pt(.24),St(.5,.52,.22,205,335),St(.5,.66,.24,205,335),St(.5,.38,.2,205,335),...gt(Ze([.5,.24],[.32,.06])),mt],snake:[pt(.16),Pf(.5,.82,.2,.2,1.25),Ze([.5,.2],[.5,.11]),...gt(Ze([.5,.11],[.42,.045])),mt],moth:[pt(.2),...gt(Ze([.5,.3],[.16,.18],[.24,.5],[.5,.4]),Ze([.5,.5],[.3,.64],[.5,.66]),St(.38,.16,.12,0,-110)),mt],marten:[pt(.32),Ze([.3,.2],[.5,.32],[.7,.2]),...gt(St(.3,.14,.07,90,-180)),St(.28,.56,.22,0,150),an(.28+.22*Math.cos(150*Math.PI/180),.56+.22*Math.sin(150*Math.PI/180)),mt],salamander:[pt(.3),pi([.5,.3],[.5,.06],.35),pi([.5,.3],[.5,.06],-.35),...gt(Ze([.5,.42],[.32,.38],[.26,.48]),Ze([.5,.64],[.32,.6],[.26,.7])),mt,...gt(an(.38,.52))],glowworm:[pt(.4),St(.5,.27,.1,90,450),...Pr(.5,.27,.15,.25,[0,60,120,180,240,300]),mt],spider:[Ze([.5,.05],[.5,.3]),pt(.5),St(.5,.4,.11,-90,270),...gt(...[-150,-170,170,150].map(n=>Ze([.5+.12*Math.cos(n*Math.PI/180),.4+.12*Math.sin(n*Math.PI/180)],[.5+.28*Math.cos(n*Math.PI/180),.4+.28*Math.sin(n*Math.PI/180)],[.5+.32*Math.cos(n*Math.PI/180),.4+.28*Math.sin(n*Math.PI/180)+.1]))),mt,an(.5,.05)],dormouse:[pt(.12),St(.5,.46,.24,-60,250),...gt(St(.34,.16,.08,90,-180)),pi([.56,.38],[.7,.38],-.4),mt],beetle:[pt(.36),...gt(St(.66,.26,.2,160,250)),pi([.5,.38],[.5,.82],.25),pi([.5,.38],[.5,.82],-.25),mt]},Oc={pink:[255,64,200],cyan:[50,235,255],acid:[175,255,45],violet:[165,95,255],orange:[255,135,35],lemon:[255,238,70],red:[255,55,95],mint:[70,255,175],blue:[70,145,255],magenta:[235,70,255]},Nf={badger:"pink",boar:"cyan",snail:"acid",fox:"violet",ram:"orange",woodlouse:"lemon",hedgehog:"red",squirrel:"mint",wolf:"blue",stag:"magenta",stoat:"pink",snake:"cyan",hare:"acid",owl:"violet",bear:"orange",toad:"lemon",otter:"red",lynx:"mint",elk:"blue",raven:"magenta",bat:"pink",mole:"cyan",beaver:"acid",beetle:"violet",moth:"orange",marten:"lemon",salamander:"red",glowworm:"mint",spider:"blue",dormouse:"magenta"},gr=n=>Oc[Nf[n]]||Oc.cyan,Of=[255,255,250],Uf=(n,e,t)=>n.map((i,s)=>Math.round(i+(e[s]-i)*t)),Uc=n=>`rgb(${n.join(",")})`;function Ff(n=0){const e=Math.max(0,n);return{level:e,metres:2+e+Math.max(0,e-2)*.5,core:1+.2*e,halo:Math.min(1,.45+.19*e),rings:e>=4?3:e>=3?2:e>=2?1:0,dots:e>=1&&e<2?12:0,band:e>=3,rays:e>=4?8:e>=3?4:0,shimmer:e>=3}}function ha(n){if(n.d)return{dot:!0,pts:[n.d],len:Kl*2};let e=n.l;if(n.a){const[i,s,r,a,o]=n.a,h=Math.max(6,Math.ceil(Math.abs(o-a)/8));e=Array.from({length:h+1},(l,u)=>{const f=(a+(o-a)*u/h)*Math.PI/180;return[i+r*Math.cos(f),s+r*Math.sin(f)]})}let t=0;for(let i=1;i<e.length;i++)t+=Math.hypot(e[i][0]-e[i-1][0],e[i][1]-e[i-1][1]);return{dot:!1,pts:e,len:t}}const qo=(n,e=0,t=1)=>{const i=n.reduce((r,a)=>r+a.len,0)||1;let s=0;for(const r of n)r.start=e+(t-e)*s/i,s+=r.len,r.end=e+(t-e)*s/i;return n},ja=new Map;function pu(n){return ja.has(n)||ja.set(n,qo((If[n]||[]).map(e=>({...ha(e),w:ka,part:"sigil"})))),ja.get(n)}const eo=new Map;function Bf(n,e=0){const t=n+":"+e;if(eo.has(t))return eo.get(t);const i=e===null?null:Ff(e),s=i?i.rings>=2?.6:i.rings||i.dots?.66:.8:1,r=(1-s)/2,a=i?i.core:1,o=ka*.55*((i?.level??0)<3?1:Math.min(1.6,.8+.25*i.level)),h=[];if(i){const p=g=>ha({a:[.5,.5,g,90,450]});for(let g=0;g<i.rings;g++)h.push({...p(.44-g*.06),w:o,part:"ring"});for(let g=0;g<i.dots;g++){const v=(90+g*360/i.dots)*Math.PI/180;h.push({dot:!0,pts:[[.5+.44*Math.cos(v),.5+.44*Math.sin(v)]],len:.05,r:.042,w:o,part:"ring"})}if(i.band&&i.rings>=2)for(let g=0;g<16;g++){const v=(90+g*22.5)*Math.PI/180,x=.44-.06+.014,m=.44-.014;h.push({...ha({l:[[.5+x*Math.cos(v),.5+x*Math.sin(v)],[.5+m*Math.cos(v),.5+m*Math.sin(v)]]}),w:o*.8,part:"band"})}for(let g=0;g<i.rays;g++){const v=(90+g*360/i.rays)*Math.PI/180,x=.44+.02,m=.5-o/2;h.push({...ha({l:[[.5+x*Math.cos(v),.5+x*Math.sin(v)],[.5+m*Math.cos(v),.5+m*Math.sin(v)]]}),w:o*1.3,part:"ray"})}}const l=Math.min(1.25,a),u=pu(n).map(d=>({dot:d.dot,len:d.len*s,pts:d.pts.map(([p,g])=>[r+p*s,r+g*s]),w:d.w*s*l,r:Kl*s*l,part:"sigil"})),f={level:e,frame:i,k:s,strokes:[...qo(h,0,h.length?.15:0),...qo(u,h.length?.15:0,1)]};return eo.set(t,f),f}function kf(n,e){if(e>=n.end)return n.pts;if(e<=n.start)return null;if(n.dot)return n.pts;let t=(e-n.start)/(n.end-n.start)*n.len;const i=[n.pts[0]];for(let s=1;s<n.pts.length;s++){const r=n.pts[s-1],a=n.pts[s],o=Math.hypot(a[0]-r[0],a[1]-r[1]);if(t<=o){i.push([r[0]+(a[0]-r[0])*t/o,r[1]+(a[1]-r[1])*t/o]);break}i.push(a),t-=o}return i}function zf(n,e,{x:t=0,y:i=0,size:s=64,level:r=null,colour:a=gr(e),progress:o=1,glow:h=!0}={}){const l=Bf(e,r),u=l.frame?l.frame.halo:.7;n.save(),n.translate(t,i),n.scale(s,s),n.lineCap="round",n.lineJoin="round";const f=(d,p,g,v)=>{n.globalAlpha=g,n.strokeStyle=n.fillStyle=Uc(d),n.shadowColor=Uc(a),n.shadowBlur=v;for(const x of l.strokes){const m=kf(x,o);if(m){if(n.beginPath(),x.dot){n.arc(m[0][0],m[0][1],x.r*(p>1?1.5:1),0,Math.PI*2),n.fill();continue}n.lineWidth=x.w*p,m.forEach((M,S)=>S?n.lineTo(M[0],M[1]):n.moveTo(M[0],M[1])),n.stroke()}}};h?(f(a,2.4,Math.min(u,.7)*.55,s/12),f(Uf(a,Of,.72),.62,1,s/30)):f(a,1,1,0),n.restore()}function Gf(n,e,t,i){let s=1/0;for(const r of n){if(r.start>=s)break;if(r.dot){Math.hypot(e-r.pts[0][0],t-r.pts[0][1])<Kl+i-ka/2&&(s=r.start);continue}let a=0;for(let o=1;o<r.pts.length;o++){const h=r.pts[o-1],l=r.pts[o],u=l[0]-h[0],f=l[1]-h[1],d=u*u+f*f,p=Math.sqrt(d),g=d?Math.max(0,Math.min(1,((e-h[0])*u+(t-h[1])*f)/d)):0;if(Math.hypot(e-h[0]-u*g,t-h[1]-f*g)<i){const v=r.start+(a+g*p)/r.len*(r.end-r.start);v<s&&(s=v)}a+=p}}return s}function Hf(n,e,t,i=ka/2){return Gf(pu(n),e,t,i)<1/0}Xl.map(n=>n.id);const Wf=new Set([c.TRUNK,c.BARK2,c.BARKD,c.BARKL]);function ls(n,e,t,i,s,r,{mat:a=c.LEAF,group:o=30,ragged:h=1}={}){const u=[];for(let m=0;m<9;m++){const M=m/9*Math.PI*2,S=1+(r()-.5)*.35*(s.clump+.3);u.push([e[0]+Math.cos(M)*t*S,e[1]+Math.sin(M)*i*S*(Math.sin(M)>0?.8:1)])}const f=Math.max(1,Math.round(Math.min(t,i)/3.5));n.shape(Fa(u,0,9,f,Math.max(1.2,Math.min(t,i)*.14)*h,1),a,{group:o,line:!1,round:s.round}),n.mark([Ct(e,[-t*1.1,i*.15]),Ct(e,[t*1.1,i*.1]),Ct(e,[t*1.1,i*1.2]),Ct(e,[-t*1.1,i*1.2])],c.LEAF3,[a]),n.mark([Ct(e,[-t*.75,-i*.55]),Ct(e,[t*.25,-i*.95]),Ct(e,[t*.55,-i*.35]),Ct(e,[-t*.2,-i*.05])],c.LEAF2,[a]);const d=Math.floor(e[0]-t*1.2),p=Math.ceil(e[0]+t*1.2),g=Math.floor(e[1]-i*1.2),v=Math.ceil(e[1]+i*1.2),x=r()*1e4|0;for(let m=g;m<=v;m++)for(let M=d;M<=p;M++){const S=n.get(M,m);if(S!==a&&S!==c.LEAF2&&S!==c.LEAF3)continue;const b=Pt(M,m,x),A=Bi(M/2,m/2,x)*.5+b*.5;A<.16*s.density?n.recolour(M,m,S===c.LEAF2?a:c.LEAF2):A>1-.16*s.density&&n.recolour(M,m,S===c.LEAF3?a:c.LEAF3)}}function Yi(n,e,t,i,s,r,a,o,{mat:h=c.TRUNK,bend:l=1,group:u=10,line:f=!1}={}){const d=[e],p=4;let g=t,v=e;for(let x=1;x<=p;x++)g+=(o()-.5)*.7*a.gnarl*l,v=Ct(v,[Math.cos(g)*i/p,Math.sin(g)*i/p]),d.push(v);return n.limb(d.map((x,m)=>[...x,s+(r-s)*m/p]),h,{group:u,line:f,round:a.round,cap:.6,capEnd:1}),{end:v,ang:g,pts:d}}function za(n,e,t,i,s,r,a){if(n.shape([[e-i*1.05,t],[e-i*.62,t-i*.5],[e-i*.45,t-i*1.4],[e+i*.45,t-i*1.4],[e+i*.62,t-i*.5],[e+i*1.05,t]],c.TRUNK,{group:10,round:s.round}),s.roots<=0)return;const o=Math.round(2+s.roots*4);for(let h=0;h<o;h++){const l=h%2?1:-1,u=(8+r()*16)*a*(.4+s.roots),f=(2+r()*3)*a,d=[e+l*i*.2,t-i*.5],p=[e+l*(i*.55+u*.4),t-f],g=[e+l*(i*.5+u),t-.5];n.limb([[...d,i*.55],[...p,i*.28],[...g,1.2]],c.TRUNK,{group:11,round:s.round,cap:.5,capEnd:.6})}}function Ga(n,e,t=!0){if(!(e.bark<=0))for(let i=0;i<n.h;i++)for(let s=0;s<n.w;s++){const r=i*n.w+s;if(n.m[r]!==c.TRUNK)continue;const a=t?Bi(s/1.3,i/6,21):Bi(s/6,i/1.3,21);a>1-e.bark*.42||Pt(s,i,4)<e.bark*.05?n.m[r]=c.BARKD:a>1-e.bark*.62&&n.n[r*3]<-.1&&(n.m[r]=c.BARKL)}}function Hs(n,e,t){let i=n.w,s=-1,r=n.h;for(let d=0;d<n.h;d++)for(let p=0;p<n.w;p++)n.m[d*n.w+p]&&(i=Math.min(i,p),s=Math.max(s,p),r=Math.min(r,d));if(s<0)return{sp:n,crownY:t};const a=Math.max(e-i,s-e)+2,o=Math.max(0,Math.floor(e-a)),h=Math.min(n.w-o,Math.ceil(a*2)+1),l=Math.max(0,r-1),u=n.h-l,f=new Mn(h,u);for(let d=0;d<u;d++)for(let p=0;p<h;p++){const g=(d+l)*n.w+p+o,v=d*h+p;f.m[v]=n.m[g],f.g[v]=n.g[g],f.n[v*3]=n.n[g*3],f.n[v*3+1]=n.n[g*3+1],f.n[v*3+2]=n.n[g*3+2]}return{sp:f,crownY:t-l}}const br=n=>(n.crownWidth||3)/3;function mu(n,e,t){const i=br(e),s=Math.round(220*t*i+60*t),r=Math.round(140*t),a=new Mn(s,r),o=s/2,h=r,l=e.treeTrunks||1,u=12*t*(e.treeThick||1)*(e.treeThin?.55:1)/Math.sqrt(l),f=(n()-.5)*.5*e.gnarl+(e.treeLean||0),d=[];let p=r;const g=(v,x,m,M,S)=>{const b=Yi(a,v,x,m,M,M*.65,e,n,{group:12});if(S===0){d.push(b.end);return}const A=n()<.35?3:2;for(let w=0;w<A;w++){const L=(w-(A-1)/2)*Ae(n,.5,.85)*(S===3?1.4:1);g(b.end,b.ang+L+(n()-.5)*.25,m*Ae(n,.6,.78),M*.62,S-1)}S<=2&&d.push(yi(v,b.end,.7))};for(let v=0;v<l;v++){const x=f+(l>1?(v/(l-1)-.5)*.8:0),m=[o+(v-(l-1)/2)*u*.6,h],M=Yi(a,m,-Math.PI/2+x,r*.36*(l>1?Ae(n,.75,1.15):1),u,u*.72,e,n,{bend:1.4});p=Math.min(p,M.end[1]);for(const S of[-1,1])g(M.end,-Math.PI/2+x*.5+S*Ae(n,.55,.95)*(.7+.3*i)*(l>1?.6:1),r*.22*(.75+.25*i)*(l>1?.7:1),u*.7,l>2?2:3);if(l===1&&n()<.7&&g(M.end,-Math.PI/2+(n()-.5)*.3,r*.18,u*.55,2),v===0&&e.treeHollow){const S=yi(m,M.end,.38);a.ellipse(S[0],S[1],u*.28,u*.5,c.NOSE,{round:.3})}}if(za(a,o,h,u*Math.sqrt(l),e,n,t),Ga(a,e),e.treeWebs)for(let v=0;v+1<d.length;v+=2){const x=d[v],m=d[v+1],M=Math.hypot(m[0]-x[0],m[1]-x[1]);if(M<40*t)for(let S=0;S<=M;S++){const b=yi(x,m,S/M);a.px(b[0],b[1]+Math.sin(S/M*Math.PI)*M*.15,c.WEB,0,0,1)}}if(e.treeBare)return Hs(a,o,p+4*t);d.sort((v,x)=>v[1]-x[1]);for(const v of d)ls(a,Ct(v,[0,-3*t]),Ae(n,14,21)*t,Ae(n,10,14)*t,e,n,{mat:n()<.35?c.LEAF3:c.LEAF});for(const v of d)n()<.75&&ls(a,Ct(v,[Ae(n,-9,9)*t,Ae(n,-12,-3)*t]),Ae(n,10,15)*t,Ae(n,7,10)*t,e,n);return Hs(a,o,p+4*t)}function ql(n,e,t){const i=.8+.2*br(e),s=Math.round(90*t*i),r=Math.round(160*t),a=new Mn(s,r),o=s/2,h=r;a.limb([[o,h,6*t],[o,h-r*.5,4*t],[o,6*t,1.5]],c.TRUNK,{group:10,round:e.round}),za(a,o,h,6*t,e,n,t*.6),Ga(a,e);const l=Math.round(Ae(n,9,12));for(let u=l-1;u>=0;u--){const f=u/(l-1),d=6*t+f*r*.7,p=(5+f*36)*t*i*Ae(n,.9,1.1),g=(5+f*13)*t,v=[[o,d-4*t],[o+p*.5,d+g*.3],[o+p,d+g],[o+p*.7,d+g*1.15],[o,d+g*.7],[o-p*.7,d+g*1.15],[o-p,d+g],[o-p*.5,d+g*.3]];a.shape(Fa(v,1,7,Math.max(2,Math.round(p/(3*t))),2*t,1),c.LEAF,{group:30+u,line:!1,round:e.round}),a.mark([[o-p,d+g*.55],[o+p,d+g*.55],[o+p,d+g*1.4],[o-p,d+g*1.4]],c.LEAF3,[c.LEAF]),a.mark([[o-p*.55,d-2*t],[o+p*.1,d-3*t],[o+p*.1,d+g*.45],[o-p*.7,d+g*.7]],c.LEAF2,[c.LEAF])}return Hs(a,o,r*.82)}function gu(n,e,t){const i=br(e),s=Math.round(200*t*i+50*t),r=Math.round(130*t),a=new Mn(s,r),o=s/2,h=r,l=13*t,u=Yi(a,[o,h],-Math.PI/2+(n()-.5)*.3,r*.3,l,l*.8,e,n,{bend:1.6}),f=[];for(let g=0;g<5;g++){const v=g%2?1:-1,x=-Math.PI/2+v*Ae(n,.55,1.25)*(.7+.3*i),m=Yi(a,u.end,x,r*Ae(n,.3,.42)*(.8+.2*i),l*.55,l*.3,e,n,{group:12});f.push(m.end)}za(a,o,h,l,e,n,t),Ga(a,e);for(const g of f)ls(a,Ct(g,[0,-2*t]),Ae(n,20,28)*t,Ae(n,9,12)*t,e,n);ls(a,Ct(u.end,[0,-8*t]),24*t,11*t,e,n);let d=s,p=0;for(const g of f)d=Math.min(d,g[0]-22*t),p=Math.max(p,g[0]+22*t);for(let g=d;g<p;g+=Ae(n,1,1.7)){let v=r;for(let S=0;S<r;S++)if(a.get(g,S)===c.LEAF||a.get(g,S)===c.LEAF2||a.get(g,S)===c.LEAF3){v=S;break}if(v>=r)continue;const x=Math.abs(g-o)/(s/2),m=(h-v)*Ae(n,.5,.9)*(1-x*.3),M=Pt(g|0,1,9)<.4?c.LEAF2:c.LEAF;for(let S=v+2;S<Math.min(h-2,v+m);S++){const b=Math.round(Math.sin(S*.12+g)*.7);Pt(g|0,S,5)<.2+e.density*.8&&a.px(g+b,S,(S-v)/m>.8?c.LEAF3:M,b*.3,.2,.95)}}return Hs(a,o,u.end[1]+6*t)}function xu(n,e,t){const i=.7+.3*br(e),s=Math.round(110*t*i),r=Math.round(155*t),a=new Mn(s,r),o=s/2,h=r,l=(n()-.5)*.25+(e.treeLean||0),u=Yi(a,[o,h],-Math.PI/2+l,r*.85,5*t,2*t,e,n,{mat:c.BARK2,bend:.4});for(let d=0;d<u.pts.length-1;d++)for(let p=0;p<1;p+=1/8){const g=yi(u.pts[d],u.pts[d+1],p+n()*.1);if(n()<.55)for(let v=-3;v<=3;v++)a.get(g[0]+v,g[1])===c.BARK2&&n()<.8&&a.recolour(g[0]+v,g[1],c.BARKD)}const f=[u.end];for(let d=0;d<7;d++){const p=Ae(n,.35,.9),g=yi(u.pts[0],u.end,p),v=d%2?1:-1,x=Yi(a,g,-Math.PI/2+v*Ae(n,.5,1),r*Ae(n,.12,.2)*i,2*t,1,e,n,{mat:c.BARKD,group:12});f.push(x.end)}for(const d of f)ls(a,d,Ae(n,9,13)*t*i,Ae(n,7,10)*t,e,n,{mat:c.LEAF2,ragged:1.3});return Hs(a,o,r*.55)}function vu(n,e,t){const i=br(e),s=Math.round(220*t*i+50*t),r=Math.round(120*t),a=new Mn(s,r),o=s/2,h=r,l=10*t,u=Yi(a,[o,h],-Math.PI/2+(n()-.5)*.4*(e.gnarl+.3),r*.4,l,l*.75,e,n,{bend:1.2}),f=[];for(const g of[-1,1,-1,1]){const v=Yi(a,u.end,-Math.PI/2+g*Ae(n,.7,1.15)*(.7+.3*i),r*Ae(n,.3,.42)*(.7+.3*i),l*.55,l*.25,e,n,{group:12});f.push(v.end,yi(u.end,v.end,.55))}za(a,o,h,l,e,n,t),Ga(a,e);const d=Math.round(Ae(n,2,3)),p=Math.min(...f.map(g=>g[1]));for(let g=0;g<d;g++){const v=p-6*t+g*9*t,x=(95-g*12)*t*(.65+.35*i);for(let m=0;m<5;m++)ls(a,[o+(m-2)*x*.36+Ae(n,-5,5)*t,v+Ae(n,-3,3)*t],x*Ae(n,.2,.26),7*t,e,n,{mat:g===d-1?c.LEAF:c.LEAF3})}return Hs(a,o,u.end[1]+4*t)}function $l(n,e,t){const i=e.leafHue+(n()-.5)*e.leafVariety*.7+(t===ql?.06:0);return{[c.TRUNK]:_e(e.trunkHue,.45*e.sat,.34),[c.BARKD]:_e(e.trunkHue+.03,.5*e.sat,.17),[c.BARKL]:_e(e.trunkHue-.01,.38*e.sat,.5),[c.BARK2]:[222,220,212],[c.LEAF]:_e(i,.62*e.sat,.58),[c.LEAF2]:_e(i-.05,.55*e.sat,.8),[c.LEAF3]:_e(i+.03,.66*e.sat,.38),[c.WEB]:[225,225,232]}}function Vf(n){const{sp:e,crownY:t}=n,i=new Mn(e.w,e.h),s=new Mn(e.w,e.h);for(let r=0;r<e.h;r++)for(let a=0;a<e.w;a++){const o=r*e.w+a,h=e.m[o];if(!h)continue;(Wf.has(h)&&r>=t?s:i).put(a,r,h,e.n[o*3],e.n[o*3+1],e.n[o*3+2])}return{top:i,bot:s}}function Yf(n,e){const t=e.bushSize,i=tu(n,["round","round","fern","grass","shrub"]),s=Math.round(40*t),r=Math.round(28*t),a=new Mn(s,r);if(i==="round"||i==="shrub"){const h=i==="shrub"?5:3;for(let l=0;l<h;l++)ls(a,[s/2+Ae(n,-9,9)*t,r-8*t+Ae(n,-4,2)*t],Ae(n,7,10)*t,Ae(n,5,8)*t,e,n);if(i==="shrub"||n()<e.flowers)for(let l=0;l<18*e.flowers+3;l++){const u=s/2+Ae(n,-12,12)*t,f=r-Ae(n,5,17)*t;a.get(u,f)&&a.recolour(u,f,c.FLOWER)}}else if(i==="fern")for(let h=0;h<7;h++){const l=-Math.PI/2+(h/6-.5)*2.4;let u=s/2,f=r-1;for(let d=0;d<15*t;d++)u+=Math.cos(l)*.9,f+=Math.sin(l)*.9+d*.06,a.put(u,f,h%2?c.LEAF3:c.LEAF,Math.cos(l)*.4,-.2,.9),d%2&&(a.put(u,f-1,c.LEAF2,0,-.5,.85),a.put(u+Math.sign(Math.cos(l)),f+1,c.LEAF,0,.3,.9))}else for(let h=0;h<18*t;h++){const l=s/2+Ae(n,-13,13)*t,u=Ae(n,5,15)*t,f=Ae(n,-3,3);for(let d=0;d<u;d++)a.put(l+f*d/u*(d/u),r-1-d,d>u*.65?c.LEAF2:d<u*.3?c.LEAF3:c.LEAF,f*.1,-.3,.9)}const o=$l(n,e,null);return o[c.FLOWER]=_e(n(),.55,.95),{sp:a,colours:o}}const ht=(n,e={})=>["tree",{type:n,...e}],Be=(n,e={})=>[n,e],Sr=[{id:"moor",name:"Moor",creature:"badger",by:"Ed",leaf:.24,floor:["moss",.26,.45,.42],text:{floor:"moss",wall:"puddles, a lake",small:"long grass",big:"moss mounds"},wall:[Be("water",{w:1.6})],small:[Be("grass",{h:1.4})],big:[Be("mound",{moss:!0})]},{id:"fern-forest",name:"Fern forest",creature:"boar",by:"Ed",leaf:.3,floor:["needles",.08,.45,.32],text:{floor:"pine needles",small:"ferns",big:"pine trees"},small:[Be("fern")],big:[ht("fir")]},{id:"muddy-forest",name:"Muddy forest",creature:"snail",by:"Ed",leaf:.22,floor:["mud",.07,.5,.28],text:{floor:"mud and leaves",small:"short trunks with broken branches",big:"trees with many trunks and branches"},small:[Be("stump",{snag:!0})],big:[ht("broad",{trunks:3,gnarl:.9})]},{id:"stone-shrine",name:"Stone shrine",creature:"fox",by:"Ed",leaf:.28,floor:["stony",.25,.3,.45],text:{floor:"grassy, stony",wall:"mossy henges",small:"little stones",big:"big stones",set:"a shrine"},wall:[Be("henge")],small:[Be("stones")],big:[Be("boulder")],set:Be("shrine")},{id:"tangly-forest",name:"Tangly forest",creature:"ram",by:"Ed",leaf:.27,floor:["nettles",.28,.5,.3],text:{floor:"nettles and earth",small:"tangled branches",big:"fairly short tangly trees"},small:[Be("bramble",{bare:!0})],big:[ht("broad",{scale:.7,gnarl:1})]},{id:"wispy-forest",name:"Wispy forest",creature:"woodlouse",by:"Ed",leaf:.2,floor:["leaves",.09,.55,.45],text:{floor:"dry leaves",small:"tall thin wispy trees",big:"thick trees with several trunks"},small:[ht("birch",{scale:.75})],big:[ht("broad",{trunks:3,thick:1.4})]},{id:"hazel-forest",name:"Hazel forest",creature:"hedgehog",by:"Ed",leaf:.26,floor:["grass",.24,.45,.45],text:{floor:"short grass",small:"brown lumps",big:"crooked trees with many branches"},small:[Be("mound",{brown:!0})],big:[ht("broad",{gnarl:1,scale:.85})]},{id:"garden",name:"Garden",creature:"squirrel",by:"Ed",leaf:.3,floor:["lawn",.27,.5,.5],text:{floor:"uniform grass",wall:"ornate stone wall",small:"manicured flower beds",big:"willows",set:"a stone pavilion"},wall:[Be("wall")],small:[Be("flowerbed")],big:[ht("willow")],set:Be("pavilion")},{id:"twiggy-forest",name:"Twiggy forest",creature:"wolf",by:"Ed",leaf:.29,floor:["plants",.3,.5,.38],text:{floor:"small leafy plants",small:"small trees with many thin trunks",big:"straight but slanted trees with many trunks"},small:[ht("broad",{trunks:4,scale:.5,thin:!0})],big:[ht("broad",{trunks:3,lean:.3,gnarl:.1})]},{id:"ancient",name:"Ancient",creature:"stag",by:"Ed",leaf:.31,floor:["roots",.1,.25,.35],text:{floor:"mossy roots over rocks",small:"sorrel",big:"giant gnarly slanted trees"},small:[Be("flowers",{hue:.98,leafy:!0})],big:[ht("broad",{scale:1.4,gnarl:1,lean:.35})]},{id:"norway",name:"Norway",creature:"stoat",by:"Ed",leaf:.36,floor:["slate",.6,.15,.35],text:{floor:"pine needles and slate",small:"rocks",big:"straight pines"},small:[Be("stones",{big:!0})],big:[ht("fir",{scale:1.2})]},{id:"alder-forest",name:"Alder forest",creature:"snake",by:"Ed",leaf:.23,floor:["tallgrass",.22,.45,.42],text:{floor:"tall and short grass",small:"tree stumps with tall grass around",big:"tall slanted trees with thin leaves at different heights"},small:[Be("stump",{grass:!0})],big:[ht("birch",{lean:.3,scale:1.2,dark:!0})]},{id:"meadow",name:"Meadow",creature:"hare",by:"draft",leaf:.25,floor:["flowers",.25,.5,.5],text:{floor:"grass and wildflowers",small:"scattered hawthorn",big:"lone oaks"},small:[Be("shrub",{flower:[250,245,235]})],big:[ht("broad",{scale:1.1})]},{id:"old-oaks",name:"Old oaks",creature:"owl",by:"draft",leaf:.22,floor:["leaves",.07,.5,.35],text:{floor:"leaf litter",small:"acorns, fallen branches",big:"ancient gnarled oaks with hollow trunks",set:"a great hollow oak"},small:[Be("cones",{acorn:!0}),Be("log",{branch:!0})],big:[ht("broad",{gnarl:.9,hollow:!0})],set:ht("broad",{scale:1.6,gnarl:1,hollow:!0})},{id:"berry-thicket",name:"Berry thicket",creature:"bear",by:"draft",leaf:.32,floor:["needles",.08,.45,.3],text:{floor:"pine needles",wall:"bramble thickets",small:"berry bushes",big:"tall pines"},wall:[Be("bramble")],small:[Be("shrub",{flower:[200,30,60]})],big:[ht("fir",{scale:1.3})]},{id:"wetland",name:"Wetland",creature:"toad",by:"draft",leaf:.2,floor:["mud",.15,.45,.3],text:{floor:"wet mud",wall:"puddles, reeds",small:"reeds and rushes",big:"willows"},wall:[Be("water"),Be("reeds",{tall:!0})],small:[Be("reeds")],big:[ht("willow")]},{id:"stream",name:"Stream",creature:"otter",by:"draft",leaf:.27,floor:["pebbles",.25,.3,.45],text:{floor:"pebbles and grass",wall:"a stream or pond",small:"alder saplings",big:"alders",set:"a fallen-log bridge"},wall:[Be("water",{w:2})],small:[ht("broad",{scale:.45})],big:[ht("broad",{scale:.95,gnarl:.3})],set:Be("bridge")},{id:"rocky-slope",name:"Rocky slope",creature:"lynx",by:"draft",leaf:.34,floor:["scree",.2,.2,.42],text:{floor:"scree and moss",wall:"boulders",small:"rocks",big:"pines",set:"a rocky outcrop"},wall:[Be("boulder",{big:!0})],small:[Be("stones",{big:!0})],big:[ht("fir")],set:Be("outcrop")},{id:"bog",name:"Bog",creature:"elk",by:"draft",leaf:.38,floor:["moss",.18,.55,.4],text:{floor:"sphagnum moss",wall:"bog pools",small:"cotton grass",big:"spruce"},wall:[Be("water",{bog:!0})],small:[Be("reeds",{cotton:!0})],big:[ht("fir",{dark:!0})]},{id:"deadwood",name:"Deadwood",creature:"raven",by:"draft",leaf:.15,floor:["earth",.07,.35,.3],text:{floor:"bare earth",small:"broken branches",big:"blasted dead trees"},small:[Be("log",{branch:!0})],big:[ht("broad",{bare:!0,gnarl:1})]},{id:"cave-mouth",name:"Cave mouth",creature:"bat",by:"draft",leaf:.2,floor:["stone",.08,.15,.35],text:{floor:"stone and roots",wall:"rock walls",small:"stalagmite stubs",big:"dead trees",set:"a cave mouth"},wall:[Be("rockwall")],small:[Be("stalagmite")],big:[ht("broad",{bare:!0})],set:Be("cave")},{id:"grassland",name:"Grassland",creature:"mole",by:"draft",leaf:.25,floor:["grass",.26,.5,.48],text:{floor:"short turf",small:"molehills",big:"lone birches"},small:[Be("mound",{brown:!0,small:!0})],big:[ht("birch")]},{id:"beaver-pond",name:"Beaver pond",creature:"beaver",by:"draft",leaf:.17,floor:["leaves",.13,.6,.5],text:{floor:"birch leaves",wall:"a pond",small:"stumps",big:"birch and aspen",set:"a beaver dam"},wall:[Be("water",{w:2})],small:[Be("stump",{gnawed:!0})],big:[ht("birch")],set:Be("dam")},{id:"log-pile",name:"Log pile",creature:"beetle",by:"draft",leaf:.22,floor:["leaves",.06,.5,.3],text:{floor:"rotting leaves",small:"fungi",big:"rotting logs",set:"a fallen giant"},small:[Be("fungi")],big:[Be("log",{rot:!0})],set:Be("log",{rot:!0,giant:!0})},{id:"heath",name:"Heath",creature:"moth",by:"draft",leaf:.27,floor:["heather",.85,.35,.4],text:{floor:"heather",small:"gorse",big:"wind-bent birches"},small:[Be("shrub",{flower:[250,205,40],spiky:!0})],big:[ht("birch",{lean:.45,scale:.75})]},{id:"old-pinewood",name:"Old pinewood",creature:"marten",by:"draft",leaf:.35,floor:["needles",.07,.4,.3],text:{floor:"pine needles",small:"pine cones",big:"tall old pines with knotholes"},small:[Be("cones")],big:[ht("fir",{scale:1.35})]},{id:"ravine",name:"Ravine",creature:"salamander",by:"draft",leaf:.3,floor:["stone",.3,.3,.32],text:{floor:"wet moss and rock",wall:"rock walls",small:"ferns",big:"mossy boulders",set:"a waterfall"},wall:[Be("rockwall",{moss:!0})],small:[Be("fern")],big:[Be("boulder",{moss:!0,big:!0})],set:Be("waterfall")},{id:"bluebell-glade",name:"Bluebell glade",creature:"glowworm",by:"draft",leaf:.26,floor:["bluebells",.27,.45,.4],text:{floor:"bluebells",small:"ferns",big:"beeches"},small:[Be("fern")],big:[ht("broad",{gnarl:.2,scale:1.1})]},{id:"holly-thicket",name:"Holly thicket",creature:"spider",by:"draft",leaf:.36,floor:["leaves",.08,.35,.28],text:{floor:"dead leaves",wall:"holly hedges",small:"cobwebs",big:"hollies",set:"a web-hung dead tree"},wall:[Be("hedge",{berries:!0})],small:[Be("web")],big:[ht("broad",{scale:.7,dark:!0})],set:ht("broad",{bare:!0,webs:!0})},{id:"honeysuckle-tangle",name:"Honeysuckle tangle",creature:"dormouse",by:"draft",leaf:.25,floor:["clover",.27,.45,.45],text:{floor:"grass and clover",wall:"bramble",small:"honeysuckle",big:"hazel coppice"},wall:[Be("bramble")],small:[Be("shrub",{flower:[250,230,170]})],big:[ht("broad",{trunks:5,scale:.7,thin:!0})]}];for(const[n,[e,t]]of Object.entries(hu)){const i=Sr.find(s=>s.id===n);i&&!i.set&&(i.set=Be(e,{three:!0}),i.text={...i.text,set:t})}const Xf=Object.fromEntries(Sr.map(n=>[n.id,n])),Kf=["ruins","rocks","freak","lake","modern"],xt=(n,e,t,i,s,r,a,o,h,l,u={})=>({pattern:n,...u,density:e,clump:t,glades:{count:i[0],size:i[1]||[0,0]},heightMix:s&&{sapling:s[0],mature:s[1],tall:s[2],giant:s[3]},undergrowth:r,lean:{dir:a[0],amount:a[1]},terrain:o,decor:{rate:h[0],...Object.fromEntries(Kf.map((f,d)=>[f,h[1][d]]))},feel:l}),Dt=[0,0],qf={moor:xt("scatter",.2,.6,[2,[14,24]],null,.7,[30,.2],["pools","mounds","hollows"],[.5,[.3,.4,0,.3,0]],"Open rolling moss, low mounds and dark pools, long grass combed one way by the wind; you can see a long way."),"fern-forest":xt("groves",.65,.6,[2,[8,12]],[.2,.5,.25,.05],.9,Dt,["hollows","paths"],[.25,[.4,.3,.3,0,0]],"Pine groves standing waist-deep in ferns, with green sunken hollows between them."),"muddy-forest":xt("scatter",.7,.3,[1,[6,9]],[.25,.55,.17,.03],.4,Dt,["pools","paths"],[.3,[.3,.1,.2,.1,.3]],"Squelching mud between many-trunked trees, puddled ruts winding through, broken stumps everywhere."),"stone-shrine":xt("rings",.35,.8,[1,[10,14]],null,.3,Dt,["rocky","mounds"],[.5,[.6,.4,0,0,0]],"Big stones stand in rings round the shrine on stony grass; it feels deliberate and old."),"tangly-forest":xt("thicket",.9,.2,[1,[5,8]],[.35,.55,.1,0],.9,Dt,["hollows"],[.2,[.2,0,.6,0,.2]],"Short tangled trees packed close over nettles, low and claustrophobic, with one small clearing."),"wispy-forest":xt("stands",.55,.7,[2,[6,10]],[.15,.45,.3,.1],.5,Dt,["ridges"],[.3,[.4,.2,.3,0,.1]],"Stands of thick many-trunked trees, thin wispy saplings drifting between them over dry leaves."),"hazel-forest":xt("rings",.6,.6,[2,[6,9]],[.3,.55,.12,.03],.5,Dt,["mounds","paths"],[.3,[.4,.3,.3,0,0]],"Crooked hazels grown in loose fairy rings on short grass, lumpy little mounds in the middle of each."),garden:xt("rows",.45,0,[3,[6,10]],[.1,.7,.2,0],.6,Dt,["paths","pools"],[.4,[.7,0,0,.2,.1]],"A lost formal garden: willows in avenues along straight paths, lawns and flower beds, a pavilion at the heart.",{along:"paths"}),"twiggy-forest":xt("scatter",.75,.3,[1,[6,10]],[.25,.5,.2,.05],.6,[60,.5],["paths"],[.25,[.3,.2,.3,0,.2]],"Straight many-trunked trees all slanting the same way, like a wood frozen in a gale."),ancient:xt("lone",.4,.2,[1,[12,18]],[.05,.35,.4,.2],.4,[150,.25],["rocky","mounds","hollows"],[.45,[.5,.2,.3,0,0]],"Giant gnarled trees far apart, roots heaving over mossy rocks; every tree is a landmark."),norway:xt("stands",.8,.5,[1,[8,12]],[.15,.45,.35,.05],.2,Dt,["rocky","ridges"],[.3,[.2,.6,0,.2,0]],"Dense stands of straight pines on slate ridges, bare rock between; dark, vertical and cold."),"alder-forest":xt("scatter",.55,.4,[2,[6,10]],[.2,.4,.35,.05],.6,[120,.35],["stream","hollows"],[.3,[.3,.1,.2,.3,.1]],"Tall slanted alders at every height over long grass and stumps, a little stream wandering through."),meadow:xt("lone",.12,.1,[0],[.2,.5,.25,.05],.3,Dt,["mounds","paths"],[.35,[.3,.3,0,.2,.2]],"Wide-open wildflower grass with a lone oak here and there and scattered hawthorn; the sky does the work."),"old-oaks":xt("groves",.5,.5,[2,[10,16]],[.1,.35,.4,.15],.5,Dt,["mounds","hollows"],[.4,[.5,.1,.4,0,0]],"Groves of huge hollow oaks with broad clearings of leaf litter between; slow and grand."),"berry-thicket":xt("thicket",.85,.5,[2,[4,7]],[.2,.4,.35,.05],1,Dt,["paths"],[.15,[.3,0,.4,0,.3]],"Tall pines over solid berry bushes and brambles, only narrow animal paths and a couple of pockets of space."),wetland:xt("edgeOnly",.5,.5,[1,[16,24]],[.25,.55,.15,.05],.8,Dt,["pools","stream"],[.35,[.2,0,0,.6,.2]],"Open reedy water and mud in the middle, willows crowding the rim; wet and echoing."),stream:xt("rows",.5,.2,[1,[6,10]],[.3,.45,.2,.05],.5,Dt,["stream","pools"],[.3,[.3,.3,0,.3,.1]],"Alders lining both banks of a pebbly stream, saplings at the water's edge, open grass away from it.",{along:"stream"}),"rocky-slope":xt("scatter",.35,.6,[1,[8,12]],[.3,.5,.18,.02],.2,[90,.15],["rocky","ridges"],[.5,[.3,.7,0,0,0]],"Scree and boulders with pines clinging in clumps, everything leaning slightly uphill."),bog:xt("stands",.25,.85,[3,[10,20]],[.4,.5,.1,0],.6,Dt,["pools","mounds"],[.35,[.2,0,0,.5,.3]],"Sphagnum and bog pools, stunted spruce in tight dark stands, cotton grass pale between them."),deadwood:xt("scatter",.25,.2,[2,[8,14]],[.05,.3,.45,.2],.15,Dt,["ridges","hollows"],[.45,[.3,.1,.3,0,.3]],"Sparse tall blasted snags on bare ridges; bleak, quiet, with long sightlines."),"cave-mouth":xt("edgeOnly",.4,.5,[1,[10,14]],[.2,.5,.3,0],.2,Dt,["rocky","ridges"],[.4,[.3,.6,0,0,.1]],"Rock walls and dead trees ring an open stone floor that leads to the cave's dark mouth."),grassland:xt("lone",.1,.5,[0],[.3,.5,.2,0],.2,Dt,["mounds"],[.35,[.3,.2,0,.1,.4]],"Short turf to the horizon, molehills, birches alone or in twos and threes."),"beaver-pond":xt("edgeOnly",.55,.4,[1,[14,20]],[.4,.45,.15,0],.4,Dt,["pools","stream"],[.4,[.1,0,0,.7,.2]],"A pond in the middle, young birch and aspen round it, gnawed stumps where the big ones were felled."),"log-pile":xt("groves",.5,.7,[2,[6,10]],null,.7,Dt,["hollows","mounds"],[.3,[.3,0,.4,0,.3]],"Rotting logs heaped in piles, fungi everywhere, damp hollows between the heaps."),heath:xt("scatter",.2,.3,[1,[12,18]],[.5,.45,.05,0],.8,[30,.6],["ridges","paths"],[.4,[.4,.4,0,0,.2]],"Purple heather and gorse, small birches bent hard by the wind, all the same way."),"old-pinewood":xt("scatter",.5,.3,[2,[8,14]],[.1,.35,.4,.15],.15,Dt,["mounds","paths"],[.35,[.4,.3,.3,0,0]],"Cathedral-tall old pines on a clear floor of needles; you can see between the trunks a long way."),ravine:xt("edgeOnly",.55,.6,[1,[6,9]],null,.8,Dt,["stream","ridges","rocky"],[.4,[.3,.5,0,.2,0]],"A deep wet cleft: rock walls and mossy boulders either side, ferns, a stream down the middle."),"bluebell-glade":xt("groves",.45,.5,[3,[8,14]],[.1,.5,.35,.05],.3,Dt,["hollows"],[.35,[.4,0,.3,.3,0]],"Beech groves round open glades carpeted in bluebells; soft, bright and airy."),"holly-thicket":xt("thicket",.9,.3,[1,[6,9]],[.3,.6,.1,0],.7,Dt,["hollows"],[.25,[.3,0,.5,0,.2]],"Dark hollies packed close, cobwebs strung between, one clearing round the web-hung tree."),"honeysuckle-tangle":xt("stands",.6,.7,[2,[5,8]],[.45,.5,.05,0],.8,Dt,["paths","mounds"],[.3,[.3,0,.3,0,.4]],"Hazel coppice stools in clumps, honeysuckle and bramble between, clover paths winding through.")};for(const n of Sr)n.layout=qf[n.id];function $f(n,e,t=64,i=48){const[s,r,a,o]=n.floor,h=new Mn(t,i),l=n.id.length*131;for(let v=0;v<i;v++)for(let x=0;x<t;x++){const m=(Bi(x/7,v/5,l)*(t-x)*(i-v)+Bi((x-t)/7,v/5,l)*x*(i-v)+Bi(x/7,(v-i)/5,l)*(t-x)*v+Bi((x-t)/7,(v-i)/5,l)*x*v)/(t*i),M=m<.38?c.BODY2:m>.64?c.BELLY:c.BODY;h.px(x,v,M,0,-.42,.91)}const u=Ua(l),f=(v,x,m)=>h.px((v%t+t)%t,(x%i+i)%i,m,0,-.42,.91),d={moss:0,needles:70,mud:25,stony:30,nettles:60,leaves:80,grass:70,lawn:30,plants:60,roots:30,slate:40,tallgrass:90,flowers:70,pebbles:60,scree:70,earth:15,stone:40,heather:90,bluebells:90,clover:60}[s]??40;for(let v=0;v<d;v++){const x=Math.floor(u()*t),m=Math.floor(u()*i);if(s==="needles"){const M=u()<.5?1:-1;for(let S=0;S<3;S++)f(x+S*M,m+(S>>1),u()<.5?c.BODY2:c.ACCENT)}else if(["grass","lawn","tallgrass","plants","nettles","clover","flowers","bluebells","heather"].includes(s)){const M=s==="tallgrass"?4:s==="lawn"?1:2;for(let S=0;S<M;S++)f(x,m-S,S===M-1?c.LEAF2:c.LEAF);(s==="flowers"||s==="bluebells"||s==="heather"||s==="clover")&&u()<.5&&f(x+1,m-M,c.FLOWER)}else if(["stony","pebbles","scree","slate","stone","roots"].includes(s)){if(f(x,m,c.ACCENT),u()<.6&&f(x+1,m,c.ACCENT),u()<.4&&f(x,m+1,c.BODY2),s==="roots"&&u()<.5)for(let M=0;M<5;M++)f(x+M,m+(M>2?1:0),c.TRUNK)}else if(s==="leaves")f(x,m,c.FLOWER),f(x+1,m,c.FLOWER),u()<.5&&f(x,m+1,c.ACCENT);else if(s==="mud"||s==="earth")for(let M=0;M<3;M++)f(x+M,m,c.BODY2)}const p={flowers:_e(.13,.6,.95),bluebells:[90,110,230],heather:[180,90,170],clover:[240,235,240],leaves:_e(r+.02,.65,.6)}[s]||_e(r,.3,.6),g={[c.BODY]:_e(r,a*e.sat,o),[c.BODY2]:_e(r+.02,a*e.sat*1.1,o*.78),[c.BELLY]:_e(r-.02,a*e.sat*.9,Math.min(1,o*1.15)),[c.ACCENT]:s==="needles"?_e(.07,.5,.5):_e(.1,.08,.62),[c.FLOWER]:p,[c.LEAF]:_e(n.leaf,.55*e.sat,.45),[c.LEAF2]:_e(n.leaf-.03,.5*e.sat,.62),[c.TRUNK]:_e(e.trunkHue,.4,.3)};return{sp:h,colours:g}}const ns=n=>({[c.ACCENT]:_e(.1,.06,.6),[c.BODY2]:_e(.62,.08,.4),[c.BELLY]:_e(.1,.05,.78),[c.LEAF]:_e(.27,.5,.45),[c.LEAF2]:_e(.25,.45,.62),[c.NOSE]:[20,16,24]});function Us(n,e,t,i,s,r,a){const o=[];for(let h=0;h<8;h++){const l=h/8*Math.PI*2,u=1+(r()-.5)*.3;o.push([e[0]+Math.cos(l)*t*u,e[1]+Math.sin(l)*i*u*(Math.sin(l)>0?.5:1)])}n.shape(o,c.ACCENT,{group:5,line:!0,round:s.round}),n.mark([Ct(e,[-t,i*.1]),Ct(e,[t,i*.1]),Ct(e,[t,i]),Ct(e,[-t,i])],c.BODY2,[c.ACCENT]),n.mark([Ct(e,[-t*.6,-i*.8]),Ct(e,[t*.1,-i*1.1]),Ct(e,[t*.3,-i*.5]),Ct(e,[-t*.3,-i*.3])],c.BELLY,[c.ACCENT]),a&&n.mark(Fa([Ct(e,[-t*1.1,-i*.55]),Ct(e,[0,-i*1.3]),Ct(e,[t*1.1,-i*.5]),Ct(e,[t*.6,-i*.2]),Ct(e,[-t*.6,-i*.2])],0,3,3,i*.15,1),c.LEAF,[c.ACCENT,c.BELLY,c.BODY2])}function ua(n,e,t,i,s,r){const a={[c.LEAF]:_e(t.leaf,.6*i.sat,.55),[c.LEAF2]:_e(t.leaf-.05,.55*i.sat,.78),[c.LEAF3]:_e(t.leaf+.03,.66*i.sat,.36)},o={[c.TRUNK]:_e(i.trunkHue,.45*i.sat,.34),[c.BARKD]:_e(i.trunkHue+.03,.5*i.sat,.17),[c.BARKL]:_e(i.trunkHue-.01,.38*i.sat,.5),[c.BELLY]:_e(i.trunkHue+.02,.3,.7)},h={[c.MAGIC]:[60,110,150],[c.MAGIC2]:[150,200,220],[c.BODY2]:[35,70,100]};if(n==="tree"){const v={broad:mu,fir:ql,willow:gu,birch:xu,flat:vu}[e.type],x={...i,leafHue:t.leaf+(e.dark?.05:0),gnarl:e.gnarl??i.gnarl,treeBare:e.bare,treeTrunks:e.trunks,treeLean:e.lean,treeThick:e.thick,treeThin:e.thin,treeHollow:e.hollow,treeWebs:e.webs},m=v(s,x,i.treeSize*r*(e.scale||1)*Ae(s,.9,1.1)),M=$l(s,x,v);return e.dark&&(M[c.LEAF]=M[c.LEAF3],M[c.LEAF3]=_e(t.leaf+.05,.7,.22)),M[c.NOSE]=[20,16,24],M[c.WEB]=[225,225,232],{sp:m.sp,colours:M}}if(n==="shrub"){const v=Yf(s,{...i,leafHue:t.leaf,bushSize:i.bushSize*r,flowers:1});for(let x=0;x<v.sp.m.length;x++)v.sp.m[x]&&Pt(x,1,3)<(e.spiky?.18:.1)&&v.sp.m[x]!==c.TRUNK&&(v.sp.m[x]=c.FLOWER);return v.colours[c.FLOWER]=e.flower,v}const l=Math.round(48*r*(e.w||1)),u=Math.round(32*r),f=new Mn(l,u),d=l/2,p=u;let g={};if(n==="grass"||n==="reeds"||n==="fern"||n==="flowers"||n==="flowerbed"){const v=n==="flowerbed"?40:24,x=(n==="reeds"?e.tall?26:20:n==="fern"?14:10*(e.h||1))*r;n==="flowerbed"&&f.shape([[d-20*r,p-2],[d-18*r,p-6*r],[d+18*r,p-6*r],[d+20*r,p-2],[d+20*r,p],[d-20*r,p]],c.ACCENT,{group:2,line:!0});for(let m=0;m<v;m++){const M=d+Ae(s,-16,16)*r,S=x*Ae(s,.5,1),b=n==="fern"?Ae(s,-6,6)*r:Ae(s,-2,2)*r,A=p-1-(n==="flowerbed"?5*r:0);for(let w=0;w<S;w++){const L=w/S;f.px(M+b*L*L,A-w,L>.7?c.LEAF2:L<.3?c.LEAF3:c.LEAF,b*.05,-.3,.9),n==="fern"&&w%2&&f.px(M+b*L*L+(b>0?1:-1),A-w+1,c.LEAF2,0,-.3,.9)}if(n==="reeds"&&(e.cotton||s()<.5))for(let w=0;w<(e.cotton?2:3);w++)f.px(M+b,A-S-w,e.cotton?c.WEB:c.TRUNK,0,-.5,.85);(n==="flowers"||n==="flowerbed")&&s()<.7&&(f.px(M+b,A-S,c.FLOWER,0,-.5,.85),f.px(M+b+1,A-S,c.FLOWER,0,-.5,.85))}if(g={...a,[c.FLOWER]:n==="flowerbed"?tu(s,[[230,80,120],[250,210,60],[150,110,230]]):_e(e.hue??.95,.6,.85),[c.TRUNK]:_e(.07,.5,.35),[c.WEB]:[240,240,235],[c.ACCENT]:_e(.08,.1,.55)},n==="flowerbed"){for(let m=0;m<f.m.length;m++)f.m[m]===c.FLOWER&&Pt(m,2,7)<.5&&(f.m[m]=c.BELLY);g[c.BELLY]=[250,245,240]}}else if(n==="stones"){for(let v=0;v<(e.big?3:6);v++)Us(f,[d+Ae(s,-14,14)*r,p-(e.big?5:2.5)*r],(e.big?6:3)*r*Ae(s,.7,1.2),(e.big?5:2.5)*r,i,s);g=ns()}else if(n==="boulder")Us(f,[d,p-(e.big?11:8)*r],(e.big?18:13)*r,(e.big?12:9)*r,i,s,e.moss),g={...ns(),...a,[c.ACCENT]:_e(.1,.06,.6)};else if(n==="henge")f.shape([[d-7*r,p],[d-8*r,p-18*r],[d-4*r,p-28*r],[d+5*r,p-27*r],[d+8*r,p-14*r],[d+7*r,p]],c.ACCENT,{group:5,line:!0,round:i.round}),f.mark([[d-9*r,p-30*r],[d+9*r,p-30*r],[d+9*r,p-22*r],[d-9*r,p-18*r]],c.LEAF,[c.ACCENT]),g={...ns(),...a};else if(n==="mound"){const v=(e.small?8:14)*r,x=(e.small?5:8)*r;f.shape(Fa([[d-v,p],[d-v*.6,p-x*.8],[d,p-x],[d+v*.6,p-x*.8],[d+v,p]],0,4,e.moss?3:1,(e.moss?1.5:.8)*r,1),e.moss?c.LEAF:c.TRUNK,{group:5,round:i.round}),f.mark([[d-v,p-x*.45],[d+v,p-x*.45],[d+v,p],[d-v,p]],e.moss?c.LEAF3:c.BARKD,[e.moss?c.LEAF:c.TRUNK]),g={...a,...o,[c.TRUNK]:_e(.07,.45,e.brown?.35:.3)}}else if(n==="stump"){const v=6*r;if(f.limb([[d,p,v*2.2],[d,p-8*r,v*1.6]],c.TRUNK,{group:5,round:i.round,cap:0,capEnd:0}),f.shape([[d-v*.8,p-8*r],[d,p-10*r-(e.gnawed?4*r:0)],[d+v*.8,p-8*r],[d,p-7*r]],c.BELLY,{group:6,round:i.round}),e.snag&&f.limb([[d+v*.4,p-8*r,2.5*r],[d+v*1.6,p-15*r,1.5*r]],c.TRUNK,{group:7,round:i.round}),e.grass)for(let x=0;x<20;x++){const m=d+Ae(s,-14,14)*r,M=Ae(s,6,13)*r;for(let S=0;S<M;S++)f.px(m,p-1-S,S>M*.6?c.LEAF2:c.LEAF,0,-.3,.9)}g={...a,...o}}else if(n==="log"){const v=(e.giant?46:e.branch?18:30)*r,x=(e.giant?14:e.branch?3:8)*r;if(f.limb([[d-v/2,p-x/2,x],[d+v/2,p-x/2-(e.branch?2*r:0),x*.9]],c.TRUNK,{group:5,round:i.round,cap:.3,capEnd:.3}),e.branch||f.shape([[d+v/2-x*.1,p-x],[d+v/2+x*.2,p-x/2],[d+v/2-x*.1,p],[d+v/2-x*.3,p-x/2]],c.BELLY,{group:6,round:i.round}),e.rot)for(let m=0;m<(e.giant?6:3);m++){const M=d+Ae(s,-v/2,v/3);f.shape([[M-3*r,p-x*.9],[M,p-x-3*r],[M+3*r,p-x*.9]],c.FLOWER,{group:7,line:!0,round:i.round})}e.branch&&f.limb([[d,p-x,x*.7],[d+5*r,p-x-6*r,x*.4]],c.TRUNK,{group:6,round:i.round}),g={...o,[c.FLOWER]:[230,190,120]}}else if(n==="fungi"){for(let v=0;v<5;v++){const x=d+Ae(s,-12,12)*r,m=Ae(s,3,7)*r,M=Ae(s,3,5)*r;f.limb([[x,p,1.6*r],[x,p-m,1.4*r]],c.BELLY,{group:5}),f.shape([[x-M,p-m],[x,p-m-M*.8],[x+M,p-m]],v%2?c.FLOWER:c.MAGIC,{group:6+v%2,line:!0,round:i.round})}g={[c.BELLY]:[225,215,195],[c.FLOWER]:[190,80,50],[c.MAGIC]:[120,230,200]}}else if(n==="cones"){for(let v=0;v<6;v++){const x=d+Ae(s,-14,14)*r,m=p-2*r;f.ellipse(x,m,(e.acorn?1.6:2)*r,(e.acorn?2:2.8)*r,c.TRUNK,{round:i.round}),e.acorn?f.ellipse(x,m-1.6*r,1.8*r,1*r,c.BARKD,{round:i.round}):f.px(x,m-1,c.BARKL)}g=o}else if(n==="water"){const v=22*r*(e.w||1),x=6*r;f.shape([[d-v,p-x],[d-v*.3,p-x*1.5],[d+v*.6,p-x*1.2],[d+v,p-x*.5],[d+v*.4,p],[d-v*.7,p-x*.2]],c.MAGIC,{group:5,round:.2});for(let m=0;m<6;m++){const M=d+Ae(s,-v*.6,v*.6),S=p-x*Ae(s,.4,1.1);for(let b=0;b<3*r;b++)f.recolour(M+b,S,c.MAGIC2)}g=e.bog?{[c.MAGIC]:[60,70,50],[c.MAGIC2]:[120,130,90]}:h;for(let m=0;m<f.m.length;m++)f.m[m]===c.MAGIC?f.m[m]=c.BODY:f.m[m]===c.MAGIC2&&(f.m[m]=c.BELLY);g={[c.BODY]:g[c.MAGIC],[c.BELLY]:g[c.MAGIC2]}}else if(n==="bramble"||n==="hedge"){const v=22*r,x=(n==="hedge"?18:12)*r;for(let m=0;m<(n==="hedge"?6:4);m++){const M=d+Ae(s,-v*.8,v*.8),S=p-x*Ae(s,.4,.7);f.ellipse(M,S,Ae(s,6,9)*r,x*.45,n==="hedge"?c.LEAF3:c.LEAF,{round:i.round,density:e.bare?.5:.95,noise:.5,seed:m})}for(let m=0;m<8;m++){let S=d+Ae(s,-v,v),b=p;for(let A=0;A<x*1.2;A++)S+=Math.sin(A*.3+m)*.8,b-=.8,f.px(S,b,c.TRUNK,0,-.3,.9)}if(n==="hedge"||e.berries||n==="bramble")for(let m=0;m<f.m.length;m++)f.m[m]&&f.m[m]!==c.TRUNK&&Pt(m,5,9)<.05&&(f.m[m]=c.FLOWER);g={...a,...o,[c.FLOWER]:n==="hedge"?[210,30,40]:[70,30,70]}}else if(n==="wall"){const v=22*r,x=12*r;f.shape([[d-v,p],[d-v,p-x],[d+v,p-x],[d+v,p]],c.ACCENT,{group:5,line:!0,depth:2}),f.shape([[d-v-1,p-x],[d-v-1,p-x-2*r],[d+v+1,p-x-2*r],[d+v+1,p-x]],c.BELLY,{group:6,line:!0,depth:2}),f.shape([[d+v-6*r,p-x-2*r],[d+v-6*r,p-x-7*r],[d+v,p-x-7*r],[d+v,p-x-2*r]],c.ACCENT,{group:7,line:!0,depth:2}),f.ellipse(d+v-3*r,p-x-9*r,3*r,2.5*r,c.BELLY,{round:i.round});for(let m=p-x+3*r;m<p;m+=4*r)for(let M=d-v;M<d+v;M++)f.recolour(M,m,c.BODY2);g=ns()}else if(n==="rockwall"){for(let v=0;v<5;v++)Us(f,[d+(v-2)*9*r,p-Ae(s,8,14)*r],8*r,10*r,i,s,e.moss);g={...ns(),...a}}else if(n==="stalagmite"){for(let v=0;v<4;v++){const x=d+Ae(s,-14,14)*r,m=Ae(s,5,11)*r;f.shape([[x-3*r,p],[x-1*r,p-m],[x+1*r,p-m],[x+3*r,p]],c.ACCENT,{group:5,line:!0,round:i.round})}g=ns()}else if(n==="web"){const v=[d,p-14*r],x=11*r;for(let m=0;m<8;m++){const M=m/8*Math.PI*2;for(let S=0;S<x;S++)f.px(v[0]+Math.cos(M)*S,v[1]+Math.sin(M)*S,c.WEB,0,0,1)}for(let m=3*r;m<x;m+=3*r)for(let M=0;M<Math.PI*2;M+=.05)f.px(v[0]+Math.cos(M)*m,v[1]+Math.sin(M)*m,c.WEB,0,0,1);g={[c.WEB]:[225,230,240]}}return{sp:f,colours:g}}function Zf(n,e,t,i,s,r){if(e.three)return ef(n,t,i);if(n==="tree"||n==="log")return ua(n,e,t,i,s,r);const a=Math.round(90*r),o=Math.round(70*r),h=new Mn(a,o),l=a/2,u=o;let f={...ns(),[c.LEAF]:_e(t.leaf,.55,.5),[c.LEAF2]:_e(t.leaf-.04,.5,.7),[c.TRUNK]:_e(i.trunkHue,.45,.34),[c.BARKD]:_e(i.trunkHue+.03,.5,.17),[c.MAGIC]:_e(i.magicHue,.6,1),[c.MAGIC2]:_e(i.magicHue,.2,1)};if(n==="shrine")h.shape([[l-16*r,u],[l-14*r,u-6*r],[l+14*r,u-6*r],[l+16*r,u]],c.ACCENT,{group:5,line:!0,depth:2}),h.shape([[l-9*r,u-6*r],[l-9*r,u-26*r],[l+9*r,u-26*r],[l+9*r,u-6*r]],c.ACCENT,{group:6,line:!0,depth:2}),h.shape([[l-5*r,u-10*r],[l-5*r,u-20*r],[l,u-23*r],[l+5*r,u-20*r],[l+5*r,u-10*r]],c.NOSE,{group:7}),h.shape([[l-13*r,u-26*r],[l,u-34*r],[l+13*r,u-26*r]],c.BODY2,{group:8,line:!0,depth:2}),h.ellipse(l,u-13*r,2.5*r,2.5*r,c.MAGIC2,{round:.5}),h.mark([[l-14*r,u-36*r],[l+2*r,u-36*r],[l-4*r,u-24*r],[l-14*r,u-24*r]],c.LEAF,[c.BODY2,c.ACCENT]);else if(n==="pavilion"){h.shape([[l-26*r,u],[l-26*r,u-4*r],[l+26*r,u-4*r],[l+26*r,u]],c.ACCENT,{group:5,line:!0,depth:2});for(const d of[-20,-7,7,20])h.limb([[l+d*r,u-4*r,4*r],[l+d*r,u-34*r,4*r]],d===-7||d===7?c.BODY2:c.BELLY,{group:6+(d>0?1:0),line:!0,cap:0,capEnd:0});h.shape([[l-28*r,u-34*r],[l-28*r,u-38*r],[l+28*r,u-38*r],[l+28*r,u-34*r]],c.ACCENT,{group:8,line:!0,depth:2}),h.shape([[l-24*r,u-38*r],[l-16*r,u-54*r],[l,u-60*r],[l+16*r,u-54*r],[l+24*r,u-38*r]],c.BELLY,{group:9,line:!0})}else if(n==="bridge"){const d=ua("water",{w:1.8},t,i,s,r);for(let p=0;p<d.sp.m.length;p++){const g=p%d.sp.w,v=p/d.sp.w|0,x=Math.round(l-d.sp.w/2+g),m=u-d.sp.h+v;d.sp.m[p]&&h.inb(x,m)&&h.px(x,m,d.sp.m[p]===c.BODY?c.IRIS:c.PUPIL,0,-.42,.91)}h.limb([[l-34*r,u-6*r,9*r],[l+34*r,u-10*r,8*r]],c.TRUNK,{group:6,line:!0,cap:.3,capEnd:.3}),f[c.IRIS]=[60,110,150],f[c.PUPIL]=[150,200,220]}else if(n==="outcrop")for(const[d,p,g,v]of[[-18,14,16,13],[12,12,18,12],[-2,28,15,13],[16,34,9,9]])Us(h,[l+d*r,u-p*r],g*r,v*r,i,s,!0);else if(n==="cave"){for(const[d,p,g,v]of[[-26,16,16,15],[26,16,16,15],[0,40,30,18],[-12,30,14,12],[12,30,14,12]])Us(h,[l+d*r,u-p*r],g*r,v*r,i,s,p>30);h.shape([[l-15*r,u],[l-14*r,u-18*r],[l-4*r,u-28*r],[l+6*r,u-27*r],[l+14*r,u-16*r],[l+15*r,u]],c.NOSE,{group:9,line:!0})}else if(n==="dam"){const d=ua("water",{w:1.9},t,i,s,r);for(let p=0;p<d.sp.m.length;p++){const g=p%d.sp.w,v=p/d.sp.w|0,x=Math.round(l-d.sp.w/2+g),m=u-d.sp.h+v-10*r;d.sp.m[p]&&h.inb(x,m)&&h.px(x,m,d.sp.m[p]===c.BODY?c.IRIS:c.PUPIL,0,-.42,.91)}for(let p=0;p<26;p++){const g=l+Ae(s,-32,32)*r,v=u-Ae(s,2,14)*r,x=Ae(s,-.5,.5),m=Ae(s,8,16)*r;h.limb([[g-Math.cos(x)*m/2,v-Math.sin(x)*m/2,2.6*r],[g+Math.cos(x)*m/2,v+Math.sin(x)*m/2,2*r]],p%3?c.TRUNK:c.BARKD,{group:6+p%2,line:!0})}f[c.IRIS]=[60,110,150],f[c.PUPIL]=[150,200,220]}else if(n==="waterfall"){for(const[d,p,g,v]of[[-22,30,18,30],[22,30,18,30],[0,56,20,12]])Us(h,[l+d*r,u-p*r],g*r,v*r,i,s,!0);for(let d=l-6*r;d<l+6*r;d++)for(let p=u-50*r;p<u-4*r;p++)h.px(d,p,Pt(d|0,p/3|0,4)<.3?c.PUPIL:c.IRIS,0,-.2,.98);h.shape([[l-18*r,u],[l-14*r,u-6*r],[l+14*r,u-6*r],[l+18*r,u]],c.IRIS,{group:10,round:.2}),f[c.IRIS]=[90,150,190],f[c.PUPIL]=[210,235,245]}return{sp:h,colours:f}}function Jf(n,e,{K:t=2/(e.pixel||2),makeCanvas:i=zl}={}){const s=Xf[n];if(!s)throw new Error(`no area type "${n}"`);const r=Ua(n.split("").reduce((u,f)=>u*31+f.charCodeAt(0),7)>>>0),a=(u,f,d)=>({sp:zi(u.sp,u.colours,e,"none",i),kind:f,text:d}),o=$f(s,e),h=u=>(u||[]).map(([f,d])=>a(ua(f,d,s,e,r,t),f,"")),l={def:s,floor:{sp:zi(o.sp,o.colours,e,"none",i),kind:s.floor[0],text:s.text.floor},walls:h(s.wall),small:h(s.small),big:h(s.big),setPiece:null};if(l.walls.forEach(u=>u.text=s.text.wall),l.small.forEach(u=>u.text=s.text.small),l.big.forEach(u=>u.text=s.text.big),s.set){const u=Zf(s.set[0],s.set[1],s,e,r,t);l.setPiece={...a(u,s.set[0],s.text.set),metres:u.metres,origin:u.origin}}return l}const Qf={[c.ACCENT]:[150,145,140],[c.BODY2]:[95,92,100],[c.TRUNK]:[110,70,40],[c.BARKD]:[60,38,24],[c.MAGIC]:[255,130,40],[c.MAGIC2]:[255,228,120],[c.NOSE]:[30,24,26]};function jf(n){const e=new Xe({blend:.02});for(let s=0;s<9;s++){const r=s/9*Math.PI*2;e.ell([Math.cos(r)*.32,.05,Math.sin(r)*.32],[.09,.06,.08],s%3?c.ACCENT:c.BODY2,{dir:[-Math.sin(r),0,Math.cos(r)],group:1+s})}e.seg([-.22,.06,-.12],[.22,.1,.12],.05,.045,c.TRUNK,{group:20,paint:s=>s[0]>.12?c.BARKD:void 0}),e.seg([-.2,.1,.14],[.2,.06,-.14],.05,.045,c.TRUNK,{group:21,paint:s=>s[0]<-.12?c.BARKD:void 0});const t=[[.42,.3,.34],[.36,.4,.28],[.46,.32,.38]][n%3];[[-.05,0,t[0]],[.08,.06,t[1]],[-.02,-.08,t[2]]].forEach(([s,r,a],o)=>e.flat([s,.1+a*.5,r],[1,0,.3],[((n+o)%3-1)*.1,1,0],a*.38,a*.5,os.flame(c.MAGIC,c.MAGIC2),{group:30+o,bend:.1}));const i=Ln(e,{height:34}).sp;for(let s=0;s<4;s++){const r=Math.floor(i.w/2+Math.sin(s*2.3+n)*i.w*.25),a=Math.floor(i.h*(.12+s*.08));i.get(r,a)||i.px(r,a,c.MAGIC2)}return i}const da={cyan:[[70,230,255],[200,250,255]],violet:[[190,100,255],[235,210,255]],green:[[90,255,140],[215,255,220]]};function e0(n,e){const t=new Xe({blend:.04}),i=Object.keys(da).indexOf(n),s=.08,r=.4,a=[Math.cos(r),0,-Math.sin(r)],o=R.norm([Math.sin(r),.22,Math.cos(r)]),h=R.norm(R.cross(o,a)),l=[0,.46,0],u=[[[.2-i*.05,.92],[.14,.8],[.19,.7],[.12,.58]],[[-.22+i*.03,.05],[-.17,.16],[-.21,.25]]],f=(x,m)=>u.some(M=>M.some((S,b)=>{const A=M[b+1];if(!A)return!1;const w=A[0]-S[0],L=A[1]-S[1],_=Math.max(0,Math.min(1,((x-S[0])*w+(m-S[1])*L)/(w*w+L*L)));return Math.hypot(x-S[0]-w*_,m-S[1]-L*_)<.014})),d=x=>{const m=R.sub(x,l),M=[R.dot(m,a),R.dot(m,h)+.46,R.dot(m,o)];if(M[2]>s-.02){const S=(M[0]+.17)/.34,b=(.8-M[1])/.5;if(S>=0&&S<=1&&b>=0&&b<=1&&nu(S,b,i+1,.1))return c.RUNE}if(f(M[0],M[1]))return c.STONED;if(M[1]>.86&&Pt(Math.floor(M[0]*30),Math.floor(M[2]*30),3)<.3||M[1]<.12&&Pt(Math.floor(M[0]*35),Math.floor(M[1]*35)+Math.floor(M[2]*35)*7,5)<.55)return c.MOSS};t.box(l,[.28,.46,s],c.STONE,{group:1,axes:[a,h,o],round:.06,paint:d}),t.box(R.add(R.add(l,R.mul(h,.53)),R.mul(a,.2)),[.3,.12,.2],c.STONE,{group:1,dir:R.add(a,R.mul(h,.35)),up:h,cut:!0,paint:d});for(const[x,m,M]of[[-.24,.14,.08],[.2,.02,.07],[0,.12,.07]])t.ell([x,.015,m],[M,M*.4,M],c.MOSS,{group:2});for(let x=0;x<9;x++){const m=-.3+x*.07,M=.12+x%3*.025-x*.02,S=.07+x*37%5/60;t.seg([m,0,M],[m+(x%3-1)*.02,S,M+.01],.012,.004,x%3?c.LEAF:c.LEAF2,{group:10+x})}const p={[c.STONE]:[132,134,142],[c.STONED]:[70,70,80],[c.MOSS]:[86,120,62],[c.LEAF]:[80,125,60],[c.LEAF2]:[130,160,80],[c.RUNE]:da[n][0],[c.MAGIC2]:da[n][1],[c.LINE]:[40,40,50]},g=Ln(t,{height:44}).sp;let v=0;for(let x=0;x<600&&v<5;x++){const m=Math.floor(Pt(x,i,9)*g.w),M=Math.floor(Pt(x,i,10)*g.h*.8);g.get(m,M)||g.get(m+1,M)||g.get(m-1,M)||g.get(m,M+1)||g.get(m,M-1)||(g.px(m,M,v%2?c.RUNE:c.MAGIC2),v++)}return{sp:g,colours:p}}function t0(){const n=new Xe({blend:.03});n.ell([0,0,0],[.62,.025,.38],c.WATER,{group:1,paint:t=>Math.hypot(t[0]/.62,t[2]/.38)>.88?c.BODY2:void 0});for(let t=0;t<16;t++){const i=Math.PI*(.85+t/15*.9),s=Math.cos(i)*.6,r=Math.sin(i)*.36,a=.18+t*37%10/40;n.seg([s,0,r],[s+(t%3-1)*.02,a,r],.012,.006,t%4?c.LEAF:c.LEAF2,{group:10+t})}for(const[t,i,s]of[[.5,.2,.07],[.45,-.25,.05],[-.2,.35,.06]])n.ell([t,.02,i],[s,s*.5,s],c.ACCENT,{group:30});return{sp:Ln(n,{height:22}).sp,colours:{[c.WATER]:[40,70,95],[c.BODY2]:[70,60,45],[c.LEAF]:[80,125,60],[c.LEAF2]:[130,160,80],[c.ACCENT]:[130,128,125]}}}function n0(n,{makeCanvas:e=zl}={}){const t=(l,u)=>zi(l,u,n,"none",e),i={campfire:[0,1,2].map(l=>t(jf(l),Qf)),stones:{},pond:null};for(const l of Object.keys(da)){const u=e0(l);i.stones[l]=t(u.sp,u.colours)}const s=t0(),r=t(s.sp,s.colours),a=e(s.sp.w,s.sp.h),o=a.getContext("2d"),h=o.createImageData(s.sp.w,s.sp.h);for(let l=0;l<s.sp.m.length;l++)s.sp.m[l]===c.WATER&&h.data.set([255,255,255,255],l*4);return o.putImageData(h,0,0),r.mask=a,i.pond=r,i}function i0(n,e){const t=new Map,i=new Map,s=(h,l,u)=>(h*2097152+(l+1048576))*2097152+(u+1048576),r=(h,l,u)=>{const f=s(h,l,u);let d=t.get(f);if(!d){const p=Math.pow(2,-h);d=[p*(l+Ve(l*7+h,u,n)),p*(u+Ve(l,u*13+h,n+1))],t.set(f,d)}return d},a=(h,l,u)=>{const f=Math.pow(2,-h),d=Math.floor(l/f),p=Math.floor(u/f);let g=d,v=p,x=1/0;for(let m=-2;m<=2;m++)for(let M=-2;M<=2;M++){const S=r(h,d+m,p+M),b=(S[0]-l)**2+(S[1]-u)**2;b<x&&(x=b,g=d+m,v=p+M)}return[g,v]},o=(h,l,u)=>{const f=s(h,l,u);let d=i.get(f);if(d)return d;if(h===0)d=[l,u];else{const p=r(h,l,u),g=a(h-1,p[0],p[1]);d=o(h-1,g[0],g[1])}return i.set(f,d),d};return{seed:n,depth:e,site:(h,l)=>r(0,h,l),partition(h,l){const u=a(e,h,l);return o(e,u[0],u[1])},centreness(h,l,u){const f=r(0,u[0],u[1]),d=Math.hypot(h-f[0],l-f[1]);let p=1/0;const g=Math.floor(h),v=Math.floor(l);for(let x=-2;x<=2;x++)for(let m=-2;m<=2;m++){const M=g+x,S=v+m;if(M===u[0]&&S===u[1])continue;const b=r(0,M,S);p=Math.min(p,Math.hypot(h-b[0],l-b[1]))}return Math.min(1,2*d/(d+p))},openness(h,l){let u=1/0,f=1/0;const d=Math.floor(h),p=Math.floor(l);for(let g=-2;g<=2;g++)for(let v=-2;v<=2;v++){const x=r(0,d+g,p+v),m=Math.hypot(h-x[0],l-x[1]);m<u?(f=u,u=m):m<f&&(f=m)}return Math.min(1,2*u/(u+f))}}}const s0=Od.types,xn=Sr.map(n=>({id:n.id,name:n.name,creature:n.creature,text:n.text,setPiece:n.set?n.text.set??"a set piece":"",hasWalls:!!n.wall?.length,floor:[n.floor[1],n.floor[2],n.floor[3]],treeDensity:s0[n.id]?.treeDensity??1,layout:n.layout??{pattern:"scatter",density:.6,clump:.3,undergrowth:.5}})),ii=(n,e)=>n+","+e;function r0(n){if(n==null||n.trim()==="")return null;const e=n.trim();if(/^\d{1,9}$/.test(e))return Number(e);let t=2166136261;for(let i=0;i<e.length;i++)t=Math.imul(t^e.charCodeAt(i),16777619);return(t>>>0)%1e9}function a0(n,e,t,i){const s=new Map,r=(h,l)=>{if(h[0]===l[0]&&h[1]===l[1])return;const u=ii(h[0],h[1]),f=ii(l[0],l[1]);s.has(u)||s.set(u,new Set),s.has(f)||s.set(f,new Set),s.get(u).add(f),s.get(f).add(u)},a=(t-e)*i;let o=[];for(let h=0;h<=a;h++){const l=[];for(let u=0;u<=a;u++){const f=n.partition(e+u/i,e+h/i);l.push(f),u>0&&r(f,l[u-1]),h>0&&r(f,o[u])}o=l}return s}function o0(n,e){const t=e.mapAreas,i=2,s=e.areaSize*e.areaScale,r=xn.length,a=3,o=Math.max(0,Math.min(1,e.areaSizeVariance))*a*.3,h=(B,I)=>{const q=B/s,$=I/s;return[q+o*(ki(q/a,$/a,n+91)-.5)*2,$+o*(ki(q/a,$/a,n+92)-.5)*2]},l=(B,I)=>{let q=B*s,$=I*s;for(let ce=0;ce<30;ce++){const[de,me]=h(q,$);q+=(B-de)*s,$+=(I-me)*s}return[q,$]},u=i0(n,e.borderLayers),f=-i,d=t+i,p=a0(u,f,d,6),g=new Map,v=Wi(n*5+1);for(let B=f;B<d;B++)for(let I=f;I<d;I++){const q=new Set;for(let de=-2;de<=2;de++)for(let me=-2;me<=2;me++){const j=g.get(ii(I+me,B+de));j!==void 0&&q.add(j)}for(const de of p.get(ii(I,B))??[]){const me=g.get(de);me!==void 0&&q.add(me)}const $=[...Array(r).keys()].filter(de=>!q.has(de)),ce=$.length?$:[...Array(r).keys()];g.set(ii(I,B),ce[Math.floor(v()*ce.length)])}const x=(B,I)=>g.get(ii(B,I))??Math.floor(Ve(B,I,n+17)*r),m=Math.floor(t/2),M=(B,I)=>{const q=u.site(B,I),$=u.partition(q[0],q[1]);return $[0]===B&&$[1]===I};let S=[m,m];for(const[B,I]of[[0,0],[1,0],[0,1],[-1,0],[0,-1],[1,1],[-1,1],[1,-1],[-1,-1]])if(M(m+B,m+I)){S=[m+B,m+I];break}const b=(B,I)=>{const q=u.site(B,I),$=l(q[0],q[1]);return{x:$[0],z:$[1]}},A=b(S[0],S[1]),w=(B,I)=>{const[q,$]=h(B,I),ce=u.partition(q,$);return{cell:ce,type:x(ce[0],ce[1]),openness:u.openness(q,$)}},L=(B,I)=>{const q=xn[x(B,I)];return q.setPiece&&Ve(B,I,n+61)<e.setPieceChance?q.setPiece:null},_=e.dancefloor.radius,E=_+e.dancefloor.clearing,P=(B,I,q,$)=>{const ce=w(B,I).cell;return ce[0]===q&&ce[1]===$},T=new Map,D=(B,I)=>{const q=ii(B,I),$=T.get(q);if($)return $;const ce=b(B,I),de=Wi(n*17+B*53+I*911);let[me,j]=[ce.x,ce.z];if(!P(ce.x,ce.z,B,I))e:for(let k=2;k<s*.75*1.5;k+=2)for(let re=0;re<16;re++){const ae=re/16*Math.PI*2,ge=ce.x+Math.cos(ae)*k,ke=ce.z+Math.sin(ae)*k;if(P(ge,ke,B,I)){[me,j]=[ge,ke];break e}}let ie={x:me,z:j};for(let k=0;k<24;k++){const re=de()*Math.PI*2,ae=3+de()*4,ge=me+Math.cos(re)*ae,ke=j+Math.sin(re)*ae+3;if(P(ge,ke,B,I)){ie={x:ge,z:ke};break}}return T.set(q,ie),ie},U=new Map,N=(B,I)=>{const q=ii(B,I);if(U.has(q))return U.get(q);let $=null;if(L(B,I)&&!(B===S[0]&&I===S[1])){const ce=e.setPieceFootprint*e.setPieceScale,de=e.reserveMargin,me=[ii(B,I),...p.get(ii(B,I))??[]].map(k=>{const[re,ae]=k.split(",").map(Number);return D(re,ae)}),j=(k,re)=>P(k,re,B,I)&&me.every(ae=>Math.hypot(k-ae.x,re-ae.z)>=ce+e.soundsystemFootprint+de)&&Math.hypot(k-A.x,re-A.z)>=ce+E+de,ie=b(B,I);e:for(let k=0;k<=s*.35;k+=3)for(let re=0;re<(k?16:1);re++){const ae=re/16*Math.PI*2,ge=ie.x+Math.cos(ae)*k,ke=ie.z-4+Math.sin(ae)*k;if(j(ge,ke)){$={x:ge,z:ke};break e}}}return U.set(q,$),$},F=(B,I,q)=>{if(Math.hypot(B-A.x,I-A.z)<E)return!0;const $=N(q[0],q[1]);if($&&Math.hypot(B-$.x,I-$.z)<e.setPieceClear*e.setPieceScale)return!0;if(q[0]===S[0]&&q[1]===S[1])return!1;const ce=D(q[0],q[1]);return Math.hypot(B-ce.x,I-ce.z)<e.soundsystemFootprint+e.treeMarginFromSoundsystem},H=(B,I)=>{const[q,$]=h(B,I);return F(B,I,u.partition(q,$))},W=(B,I)=>{const[q,$]=h(B,I);if(F(B,I,u.partition(q,$)))return 0;const ce=1-Jt((ki(B/e.gladeScale,I/e.gladeScale,n+61)-(1-e.gladeAmount))/.12);return Jt((u.openness(q,$)-e.clearingSize)/Math.max(.01,e.clearingFalloff))*ce},te=(B,I)=>Math.min(1,Math.hypot(B-S[0],I-S[1])/(t/2)),K=s*.5;return{seed:n,tuning:e,n:t,margin:i,areaSize:s,partition:u,centreCell:S,dancefloor:{x:A.x,z:A.z,radius:_},start:{x:A.x,z:A.z+2},bounds:{minX:K,maxX:t*s-K,minZ:K,maxZ:t*s-K},extent:{minX:f*s,maxX:d*s,minZ:f*s,maxZ:d*s},typeOf:x,areaAt:w,siteOf:b,treeWeight:W,hardClear:H,neighbours:p,setPieceOf:L,soundsystemSpot:D,setPieceSpot:N,remoteness:te}}function Zl(n,e,t,i,s){return Math.hypot(n,e)<i||e>=0?!1:Math.atan2(Math.abs(n),-e)*180/Math.PI<(t?s.facing.awayLeave:s.facing.awayEnter)}function l0(n,e){return{x:n,z:e,vx:0,vz:0,lift:0,mode:"ground",facing:1,away:!1,lean:!1}}const Ws=(n,e)=>Vn(e.groundHeight,e.treetopHeight,Jt(n.lift)),Fc=n=>Jt(n.lift);function c0(n,e,t,i,s){let{mode:r,lift:a}=n;e.toggleMode&&(r=r==="ground"||r==="descending"?"rising":"descending"),r==="rising"?(a+=t/Math.max(.001,i.riseTime),a>=1&&(a=1,r="treetop")):r==="descending"&&(a-=t/Math.max(.001,i.descendTime),a<=0&&(a=0,r="ground"));let o=e.moveX,h=e.moveZ;const l=Math.hypot(o,h);l>1&&(o/=l,h/=l);const u=Vn(i.groundSpeed,i.treetopSpeed,Jt(a)),f=1-Math.exp(-Vn(i.groundAcceleration,i.acceleration,Jt(a))*t);let d=n.vx+(o*u-n.vx)*f,p=n.vz+(h*u-n.vz)*f,g=n.x+d*t,v=n.z+p*t;(g<s.minX||g>s.maxX)&&(g=Vi(g,s.minX,s.maxX),d=0),(v<s.minZ||v>s.maxZ)&&(v=Vi(v,s.minZ,s.maxZ),p=0);const x=d>.3?1:d<-.3?-1:n.facing,m=Math.hypot(d,p),M=Zl(d,p,n.away,Math.max(1,u*.15),i);return{x:g,z:v,vx:d,vz:p,lift:a,mode:r,facing:x,away:M,lean:m>u*i.leanAt}}const Ha=3;function h0(n,e,t=.5,i=1){const s=n.tuning,r=Vi(e,0,1),a=Math.max(0,Math.round(Vn(s.creaturesNear,s.creaturesFar,Math.pow(r,s.creatureCurve))+(t-.5)*2)),o=a>0&&i<u0(n,r)?1:0,h=Math.max(0,a-o),l=Math.round(h*s.adultShareFar*Jt((r-s.adultsFrom)/Math.max(.01,1-s.adultsFrom))),u=Math.round((h-l)*s.youngShareFar*r);return{babies:Math.max(0,h-l-u),young:u,adults:l,legends:o}}const u0=(n,e)=>n.tuning.legendChanceFar*Jt((e-n.tuning.legendsFrom)/Math.max(.01,1-n.tuning.legendsFrom)),Mu=n=>n.areaSize*.75,ba=(n,e,t,i)=>{const s=n.areaAt(e,t).cell;return s[0]===i[0]&&s[1]===i[1]};function d0(n,e,t,i,s){if(ba(n,t,i,e))return[t,i];for(let r=2;r<s*1.5;r+=2)for(let a=0;a<16;a++){const o=a/16*Math.PI*2,h=t+Math.cos(o)*r,l=i+Math.sin(o)*r;if(ba(n,h,l,e))return[h,l]}return[t,i]}function Sa(n,e,t){for(let i=0;i<12;i++){const s=t()*Math.PI*2,r=Math.sqrt(t())*e.range,a=e.homeX+Math.cos(s)*r,o=e.homeZ+Math.sin(s)*r;if(ba(n,a,o,e.cell))return[a,o]}return[e.anchorX,e.anchorZ]}function f0(n){const e=[],t=n.tuning;let i=0;const[s,r]=n.centreCell;for(let a=0;a<n.n;a++)for(let o=0;o<n.n;o++){if(o===s&&a===r)continue;const h=Wi(n.seed*7919+o*131+a*977+3),l=xn[n.typeOf(o,a)],u=n.siteOf(o,a),f=n.remoteness(o,a),d=h0(n,f,Ve(o,a,n.seed+43),Ve(o,a,n.seed+47)),p=v=>{const x=[o,a],m=Mu(n),[M,S]=d0(n,x,u.x,u.z,m),b={cell:x,homeX:u.x,homeZ:u.z,range:m,anchorX:M,anchorZ:S},[A,w]=Sa(n,b,h);return{id:i++,species:l.creature,level:v,...b,x:A,z:w,tx:A,tz:w,rest:h()*3,speed:(v===Ha?t.legendSpeed:t.creatureSpeed)*(.7+h()*.6),facing:h()<.5?1:-1,away:!1,moving:!1,walk:h(),seen:0,leashed:!1,rand:Wi(n.seed*31+i*7+11)}};for(let v=0;v<d.babies;v++)e.push(p(0));for(let v=0;v<d.young;v++)e.push(p(1));for(let v=0;v<d.adults;v++)e.push(p(2));const g=t.legendNextToHome&&o===s+1&&a===r;(d.legends||g)&&e.push(p(3))}return e}function p0(n,e,t){if(n.rest>0){n.rest-=e,n.moving=!1,n.away=!1;return}const i=n.tx-n.x,s=n.tz-n.z,r=Math.hypot(i,s);if(r<.05){[n.tx,n.tz]=Sa(t,n,n.rand),n.rest=.8+n.rand()*3.5,n.moving=!1;return}const a=Math.min(r,n.speed*e),o=n.x+i/r*a,h=n.z+s/r*a;if(!ba(t,o,h,n.cell)){n.tx=n.x,n.tz=n.z,n.moving=!1;return}n.x=o,n.z=h,Math.abs(i)>.02&&(n.facing=i>0?1:-1),n.away=Zl(i,s,n.away,0,t.tuning),n.moving=!0,n.walk+=e*(n.level===Ha?1.5:4)}function m0(n,e,t,i,s,r,a){for(const o of n)if(!o.leashed&&!(Math.abs(o.homeX-e)>i||Math.abs(o.homeZ-t)>i)){if(r-o.seen>3){const h=Wi(o.id*7919+Math.floor(r/20)*131+5);[o.x,o.z]=Sa(a,o,h),[o.tx,o.tz]=Sa(a,o,h),o.rest=h()*2}o.seen=r,p0(o,s,a)}}const _u=6,g0=4,qt=32;function x0(n){const e=n.tuning.camera.treetop.angleIn*Math.PI/180;return n.tuning.crownHeight/Math.sin(e)}function bu(n,e,t,i,s,r){const a=n.tuning.areaEdgeBlend,o=n.seed;if(a.width<=0)return n.areaAt(e,t).type;const h=(ki(e/a.scale,t/a.scale,o+81)-.5)*2*a.width+(Ve(i,s,r+1)-.5)*a.width*a.stray,l=(ki(e/a.scale,t/a.scale,o+82)-.5)*2*a.width+(Ve(i,s,r+2)-.5)*a.width*a.stray;return n.areaAt(e+h,t+l).type}function Su(n,e,t,i){const s=n.tuning,r=s.density,a=xn[i].layout,o=n.seed;if(n.hardClear(e,t))return 0;const h=ki(e/r.patchScale,t/r.patchScale,o+91),l=r.patchMin+(r.patchMax-r.patchMin)*Jt((h-.25)/.5),u=n.treeWeight(e,t)*a.density*l*v0(n,e,t,a)*s.treeDensity;return Math.max(u,r.lone)}function v0(n,e,t,i){const s=n.seed,r=i.clump;switch(i.pattern){case"groves":case"stands":{const a=i.pattern==="groves"?18:10,o=ki(e/a,t/a,s+93);return 1+r*(2.2*Jt((o-.45)/.2)-1)}case"thicket":return 1.25;case"rows":{const o=((typeof i.along=="number"?i.along:(i.lean?.dir??0)+20)+90)*Math.PI/180,h=e*Math.cos(o)+t*Math.sin(o);return .25+1.5*Jt((Math.cos(h/5*Math.PI*2)-.2)/.6)}case"rings":{const a=n.areaAt(e,t).openness;return .3+1.4*Jt((Math.cos(a*Math.PI*7)-.1)/.6)}case"edgeOnly":return 1.6*Jt((n.areaAt(e,t).openness-.45)/.35);default:return 1}}function M0(n,e,t){const{treeSpacingX:i,treeSpacingZ:s}=n.tuning,r=n.seed,a=[],o=x0(n),h=n.tuning.crownHalfWidth,l=Math.ceil(t*qt/s),u=Math.ceil((t+1)*qt/s);for(let f=l;f<u;f++){const d=f&1?.5:0,p=Math.ceil(e*qt/i-d),g=Math.ceil((e+1)*qt/i-d);for(let v=p;v<g;v++){const x=(v+d+(Ve(v,f,r+101)-.5)*.7)*i,m=(f+(Ve(v,f,r+102)-.5)*.7)*s,M=bu(n,x,m,v,f,r+106),S=Su(n,x,m,M);Ve(v,f,r+103)>=S||n.hardClear(x,m-o)||n.hardClear(x-h,m-o)||n.hardClear(x+h,m-o)||a.push({x,z:m,type:M,variant:Math.floor(Ve(v,f,r+104)*_u),flip:Ve(v,f,r+105)<.5})}}return a}function _0(n,e,t){const i=n.tuning.bushSpacing,s=n.seed,r=[],a=Math.ceil(t*qt/i),o=Math.ceil((t+1)*qt/i),h=Math.ceil(e*qt/i),l=Math.ceil((e+1)*qt/i);for(let u=a;u<o;u++)for(let f=h;f<l;f++){const d=(f+Ve(f,u,s+201)-.5)*i,p=(u+Ve(f,u,s+202)-.5)*i,g=1+n.tuning.bushClump*(2*Jt((ki(d/13,p/13,s+207)-.35)/.3)-1),v=bu(n,d,p,f,u,s+206),x=1-Math.min(1,Su(n,d,p,v)/.8);Ve(f,u,s+203)>(.15+.85*x)*xn[v].layout.undergrowth*n.tuning.bushDensity*g||Math.hypot(d-n.dancefloor.x,p-n.dancefloor.z)<n.dancefloor.radius+2||r.push({x:d,z:p,type:v,variant:Math.floor(Ve(f,u,s+204)*g0),flip:Ve(f,u,s+205)<.5})}return r}function b0(n,e,t){const i=n.tuning.wallSpacing,s=n.seed,r=[],a=Math.ceil(t*qt/i),o=Math.ceil((t+1)*qt/i),h=Math.ceil(e*qt/i),l=Math.ceil((e+1)*qt/i);for(let u=a;u<o;u++)for(let f=h;f<l;f++){if(Ve(f,u,s+303)>n.tuning.wallDensity)continue;const d=(f+(Ve(f,u,s+301)-.5)*.6)*i,p=(u+(Ve(f,u,s+302)-.5)*.6)*i,g=n.areaAt(d,p);g.openness<.82||!xn[g.type].hasWalls||Math.hypot(d-n.dancefloor.x,p-n.dancefloor.z)<n.dancefloor.radius+4||r.push({x:d,z:p,type:g.type,variant:Math.floor(Ve(f,u,s+304)*4),flip:Ve(f,u,s+305)<.5})}return r}const S0=new Set(["wetland","stream","bog","beaver-pond","moor"]);function y0(n,e,t){const i=n.tuning.lightSources,s=i.spacing,r=n.seed,a=[],o=Math.ceil(t*qt/s),h=Math.ceil((t+1)*qt/s),l=Math.ceil(e*qt/s),u=Math.ceil((e+1)*qt/s);for(let f=o;f<h;f++)for(let d=l;d<u;d++){const p=(d+(Ve(d,f,r+401)-.5)*.7)*s,g=(f+(Ve(d,f,r+402)-.5)*.7)*s;if(Math.hypot(p-n.dancefloor.x,g-n.dancefloor.z)<n.dancefloor.radius+n.tuning.dancefloor.clearing+4)continue;const v=n.areaAt(p,g),x=v.openness<.35||v.openness>.8?1:.25,m=Ve(d,f,r+403),S=(S0.has(xn[v.type].id)?i.wetPond:i.pond)*x,b=i.campfire*x,A=i.magicStone*x,w=m<S?"pond":m<S+b?"campfire":m<S+b+A?"stone":null;w&&a.push({x:p,z:g,kind:w,size:.75+Ve(d,f,r+404)*.5})}return a}class w0{constructor(e){this.map=e}map;trees=new Map;bushes=new Map;walls=new Map;lights=new Map;chunks(e,t,i){const s=[];for(let r=Math.floor((t-i)/qt);r<=Math.floor((t+i)/qt);r++)for(let a=Math.floor((e-i)/qt);a<=Math.floor((e+i)/qt);a++)s.push([a,r]);return s}gather(e,t,i,s,r){e.size>600&&e.clear();const a=[];for(const[o,h]of this.chunks(i,s,r)){const l=o+","+h;let u=e.get(l);u||(u=t(o,h),e.set(l,u));for(const f of u)Math.abs(f.x-i)<=r&&Math.abs(f.z-s)<=r&&a.push(f)}return a}treesNear(e,t,i){return this.gather(this.trees,(s,r)=>M0(this.map,s,r),e,t,i)}bushesNear(e,t,i){return this.gather(this.bushes,(s,r)=>_0(this.map,s,r),e,t,i)}lightsNear(e,t,i){return this.gather(this.lights,(s,r)=>y0(this.map,s,r),e,t,i)}wallsNear(e,t,i){return this.gather(this.walls,(s,r)=>b0(this.map,s,r),e,t,i)}setPiecesNear(e,t,i){const s=this.map,r=s.areaSize,a=[];for(let o=Math.floor((t-i)/r)-1;o<=Math.floor((t+i)/r)+1;o++)for(let h=Math.floor((e-i)/r)-1;h<=Math.floor((e+i)/r)+1;h++){const l=s.setPieceSpot(h,o);l&&Math.abs(l.x-e)<=i&&Math.abs(l.z-t)<=i&&a.push({x:l.x,z:l.z,type:s.typeOf(h,o),variant:0,flip:Ve(h,o,s.seed+71)<.5})}return a}}const E0=()=>({stack:[],placed:[],talk:null,progress:new Map,events:[],held:!1,heldInAir:!1}),yu=(n,e)=>e.invite.talkTime[Math.min(n.level,e.invite.talkTime.length-1)],A0=(n,e)=>e.invite.turn[Math.min(n.level,e.invite.turn.length-1)],$o=n=>!n.leashed&&n.level!==Ha;function T0(n,e,t,i){if(n.stack.includes(e))return{x:t,z:i};const s=n.placed.find(r=>r.id===e);return s?{x:s.x,z:s.z}:null}function to(n,e,t,i,s=!1){let r=null,a=i;for(const o of n){if(o.leashed||!s&&!$o(o))continue;const h=Math.hypot(o.x-e,o.z-t);h<=a&&(a=h,r=o)}return r}function Bc(n,e,t,i,s){e.leashed=!0,e.rest=0,n.stack.push(e.id),n.events.push({kind:"invited",id:e.id,x:t,z:i,at:s})}function R0(n,e,t,i,s,r,a,o){n.events=[],n.held=t.talk,n.heldInAir=t.talk&&!s;const h=o.invite,l=o.leash,u=f=>e[f];if(t.talk&&s){const f=n.talk?u(n.talk.id):null;if(f&&!f.leashed&&Math.hypot(f.x-i.x,f.z-i.z)<=h.cancelDistance)n.talk.t+=a,n.progress.set(f.id,n.talk.t),f.rest=Math.max(f.rest,.2),f.moving=!1,f.facing=i.x>=f.x?1:-1,f.away=i.z<f.z-1,!n.talk.refused&&n.talk.t>=n.talk.total&&(Bc(n,f,f.x,f.z,r),n.progress.delete(f.id),n.talk=null);else{n.talk&&n.events.push({kind:"cancelled",id:n.talk.id,x:i.x,z:i.z,at:r});const d=to(e,i.x,i.z,h.talkRange)??to(e,i.x,i.z,h.talkRange,!0);n.talk=d?{id:d.id,refused:!$o(d),t:n.progress.get(d.id)??0,total:$o(d)?yu(d,o):1/0}:null}}else n.talk&&(n.events.push({kind:"cancelled",id:n.talk.id,x:i.x,z:i.z,at:r}),n.talk=null);for(const[f,d]of n.progress){if(n.talk?.id===f)continue;const p=d-a*h.decayRate;p<=0||e[f].leashed?n.progress.delete(f):n.progress.set(f,p)}if(t.inviteNearest){const f=to(e,i.x,i.z,1/0);f&&Bc(n,f,f.x,f.z,r)}if(t.sigil&&s){let f=-1,d=l.pickRadius;if(n.placed.forEach((p,g)=>{const v=Math.hypot(p.x-i.x,p.z-i.z);v<=d&&(d=v,f=g)}),f>=0){const[p]=n.placed.splice(f,1);n.stack.push(p.id),n.events.push({kind:"picked",id:p.id,x:p.x,z:p.z,at:r})}else if(n.stack.length){const p=n.stack[n.stack.length-1];wu(n,i.x,i.z,o)?n.events.push({kind:"fizzled",id:p,x:i.x,z:i.z,at:r}):(n.stack.pop(),n.placed.push({id:p,x:i.x,z:i.z,at:r}),n.events.push({kind:"placed",id:p,x:i.x,z:i.z,at:r}))}}for(const f of n.stack)kc(u(f),i.x,i.z,a,o);for(const f of n.placed)kc(u(f.id),f.x,f.z,a,o)}const wu=(n,e,t,i)=>n.placed.some(s=>Math.hypot(s.x-e,s.z-t)<i.leash.spacing);function kc(n,e,t,i,s){const r=s.leash,a=r.length,o=Math.hypot(n.x-e,n.z-t)>a;if(o){const p=Math.hypot(n.x-e,n.z-t),g=a*.5/p;n.tx=e+(n.x-e)*g,n.tz=t+(n.z-t)*g,n.rest=0}else if(n.rest>0){n.rest-=i,n.moving=!1,n.away=!1;return}else if(Math.hypot(n.tx-e,n.tz-t)>a*.85||Math.hypot(n.tx-n.x,n.tz-n.z)<.05){Math.hypot(n.tx-n.x,n.tz-n.z)<.05&&(n.rest=.5+n.rand()*2);const p=n.rand()*Math.PI*2,g=Math.sqrt(n.rand())*a*.8;if(n.tx=e+Math.cos(p)*g,n.tz=t+Math.sin(p)*g,n.rest>0){n.moving=!1,n.away=!1;return}}const h=n.tx-n.x,l=n.tz-n.z,u=Math.hypot(h,l);if(u<1e-4){n.moving=!1;return}const f=o?Math.max(n.speed,r.runSpeed*(n.level===Ha?.6:1)):n.speed*1.5,d=Math.min(u,f*i);n.x+=h/u*d,n.z+=l/u*d,Math.abs(h)>.02&&(n.facing=h>0?1:-1),n.away=Zl(h,l,n.away,0,s),n.moving=!0,n.walk+=i*(o?7:4)}const C0=n=>`${n[0]},${n[1]}`;function L0(n){const e={cell:n.centreCell,wave:0,at:0,from:null,soundsystem:null};return{areas:new Map([[C0(n.centreCell),e]]),wave:0,nextAt:n.tuning.party.startDelay+n.tuning.party.interval,paused:!1}}function P0(n,e){const t=Math.floor(Ve(e[0],e[1],n.seed+77)*3)%3;return{...n.soundsystemSpot(e[0],e[1]),variant:t}}const D0=(n,e)=>e[0]>=0&&e[1]>=0&&e[0]<n.n&&e[1]<n.n;function Eu(n,e,t){const i=n.wave+1,s=[],r=new Map,a=new Map;for(const[l,u]of n.areas)for(const f of e.neighbours.get(l)??[]){if(n.areas.has(f)||r.has(f))continue;const d=f.split(",").map(Number);D0(e,d)&&(r.set(f,d),a.set(f,u.cell))}const o=[...r.entries()].sort((l,u)=>Ve(l[1][0],l[1][1],e.seed+i)-Ve(u[1][0],u[1][1],e.seed+i)),h=e.tuning.party.maxPerWave>0?e.tuning.party.maxPerWave:1/0;for(const[l,u]of o.slice(0,h)){const f={cell:u,wave:i,at:t,from:a.get(l)??null,soundsystem:P0(e,u)};n.areas.set(l,f),s.push(f)}return n.wave=i,s}function I0(n,e,t,i){return n.paused?(n.nextAt+=i,[]):t<n.nextAt?[]:(n.nextAt+=e.tuning.party.interval,Eu(n,e,t))}function N0(n,e,t){const i=Math.max(0,n.nextAt-t),s=e.tuning.party.interval;return{left:i,gone:1-Math.min(1,i/s)}}function O0(n,e){const t=o0(n,e),i=l0(t.start.x,t.start.z);return{seed:n,tuning:e,map:t,forest:new w0(t),creatures:f0(t),clock:Dd(),witch:i,camera:Cd(e,i.x,Ws(i,e),i.z),party:L0(t),leash:E0()}}function U0(n,e,t){const i=Id(n.clock,t);i!==0&&(n.witch=c0(n.witch,e,i,n.tuning,n.map.bounds),n.camera=Ld(n.camera,e.zoom,{x:n.witch.x,y:Ws(n.witch,n.tuning),z:n.witch.z},{x:n.witch.vx,z:n.witch.vz},n.witch.lift,i,n.tuning),e.pauseWaves&&(n.party.paused=!n.party.paused),e.nextWave&&(Eu(n.party,n.map,n.clock.time),n.party.nextAt=n.clock.time+n.tuning.party.interval),I0(n.party,n.map,n.clock.time,i),m0(n.creatures,n.witch.x,n.witch.z,F0(n),i,n.clock.time,n.map),R0(n.leash,n.creatures,{talk:!!e.talk,sigil:!!e.sigil,inviteNearest:e.inviteNearest},n.witch,n.witch.mode==="ground",n.clock.time,i,n.tuning))}const F0=n=>Math.max(n.tuning.creatureSimRadius,n.tuning.haze.far+20+Mu(n.map)*2.5),zc=n=>eu(n.camera,n.camera.lift,n.tuning);function Au(n){const e=n.map.areaAt(n.witch.x,n.witch.z),t=n.map.setPieceOf(e.cell[0],e.cell[1]);return xn[e.type].name+(t?` (set piece: ${t})`:"")}const B0="Witch tuning. Edit the numbers, push, and the playable link rebuilds. Distances are metres, times seconds, angles degrees. Keys starting with _ are notes.",k0="The forest: mapAreas x mapAreas areas cut by the fractal partition. An area is areaSize x areaScale metres across on average (areaScale 4 makes them four times as wide as the first 28 m areas; push it for bigger). areaSizeVariance (0-1) makes areas vary in size, some small, some large. borderLayers sets how wiggly borders are.",z0=20,G0=28,H0=4,W0=.7,V0=4,Y0="treeHeight and crownWidth scale the art's trees (1 is the Art Lab's size; crowns widen with treeHeight too, crownWidth is the total). treeDensity (0-1): the chance of a tree on each spot outside the clearings; clearingSize (0-1): how far out from an area's centre the ground stays fully open; clearingFalloff (0-1): over how much of the way to the border trees thicken to full density (small: crisp clearing edges); gladeAmount (0-1) of the woods is open in random glades about gladeScale metres across; trees sit on a staggered grid treeSpacingX by treeSpacingZ metres, so no two crowns pile up. A tree is left out where its crown (crownHalfWidth either side, crownHeight up) would hang over a clearing seen from the treetops.",X0=1,K0=.2,q0=.18,$0=.25,Z0=38,J0="Ragged area edges: each tree and bush takes its look (its area type) from a point up to width metres away, by a smooth noise scale metres across plus a per-plant stray (stray, share of width), so neighbouring areas' plants mix in a band along the border. Only the look: creatures, partifying and the party border keep the exact borders.",Q0={width:20,scale:40,stray:.5},j0="Tree density is a field, not two states (Ed, 2026-10-03): each area's own density (its layout in art/areas.js) times a patch noise patchScale metres across, from patchMin to patchMax times (dense patches, sparse patches, glades), times the area's pattern (groves, stands, rings, rows, thicket, edges only), times the clearings (soft edges); and lone trees at lone density almost everywhere, so open ground isn't empty. treeDensity scales it all.",ep={patchScale:45,patchMin:.1,patchMax:1.3,lone:.03},tp=.16,np=.8,ip=2.25,sp=1.7,rp=4.6,ap=2.8,op=10.5,lp=11.25,cp=3.4,hp=4,up=.6,dp="Speeds per mode, and how long rising and descending take. acceleration: how quickly she reaches her speed or stops in the treetops (per second; higher is snappier); groundAcceleration: the same on the ground. leanAt: the share of the top speed above which she leans into her flight. facing: she (and every creature) faces the viewer unless clearly heading up the screen, within awayEnter degrees of straight up (and stays turned away until past awayLeave); sideways, down or stopped faces the viewer.",fp=17.5,pp=32,mp=10,gp=28,xp=.7,vp={awayEnter:55,awayLeave:65},Mp=.7,_p=.55,bp=1.4,Sp=24,yp="Near-isometric on the ground, after Transistor; lower over the treetops, looking toward the horizon to feel the speed. The camera follows the witch on a soft spring (follow: its stiffness; higher keeps her closer to the middle) and looks a little ahead of her: lookAhead seconds of flight, at most lookAheadMax metres, eased in at lookAheadEase. zoomEase and liftEase: how softly zoom and rising change the angle and distance. a narrow field of view (fov, degrees) seen from far off, so there is little perspective. Each mode has its own angle (degrees below horizontal) and distance from the witch, at zoomed-in and zoomed-out. Zoom moves between them in zoomSteps steps, starting at startZoom: with 4 steps and startZoom 1 the start is a third of the way out, so the defaults are ground 32 degrees at 100 m and treetop 36 degrees at 170 m, with one step in and two out from each.",wp={fov:20,ground:{angleIn:30,angleOut:36,distanceIn:80,distanceOut:140},treetop:{angleIn:34,angleOut:40,distanceIn:150,distanceOut:210},lookAhead:.1,lookAheadMax:3,lookAheadEase:1.5,zoomEase:5,liftEase:8,zoomSteps:4,startZoom:1,follow:8},Ep="Everything the camera can see is drawn, plus viewMargin metres round the view, so nothing appears or vanishes on screen. haze: the twilight haze fades the forest from near to far metres from the witch; nothing is drawn beyond far. lightBudget: how many of the nearest point lights (campfires, magic stones, the dancefloor) light the scene at once. pixelSize: screen pixels per art pixel. glowReach: metres the witch's light reaches. spriteTilt: 1 = sprites face the camera fully, 0 = stand upright.",Ap=3,Tp=120,Rp=8,Cp=1,Lp=16,Pp=12,Dp=20,Ip="Light sources placed by seed, on a grid of spacing metres, mostly in clearings and at area edges: the chance per spot of a campfire, a magic stone, or a pond mirroring the moon (wetPond in wet areas: wetland, stream, bog, beaver pond, moor).",Np="How far (reach, metres) and how strongly each kind of light lights its surroundings. glowPower: the witch's own glow at its brightest (0-1; 0.65 lights without blowing out), a broad soft pool glowReach metres across from a source glowHeight metres above her. Light falls off smoothly to nothing at its reach: no rings or bands.",Op={campfire:{reach:22,strength:2.6},stone:{reach:16,strength:1.8}},Up=.65,Fp="The music's clock (beats per minute): the lasers sweep to it and party animals dance to it. Later the music itself drives it.",Bp={bpm:120},kp="Never lose the witch: tall things (over minHeight metres) standing in front of her fade to fadeOpacity where they cover her, in a soft circle round her body (a little bigger than her sprite) that eases from see-through at the centre to opaque past edge (a share of its radius), and eases in over a few metres as she moves behind; anything that still hides her shows her silhouette in her glow colour at silhouette opacity.",zp="From the treetops, each placed sigil shows above the canopy over its spot: height metres above the crowns, opacity, size (times the ground rune), and a faint column of light (beam opacity) from the rune up to it. Fades in as she rises.",Gp={height:3,opacity:.65,beam:.25,size:1},Hp={on:!0,fadeOpacity:.38,edge:.8,minHeight:2.5,silhouette:.55},Wp="The sigil stack above the witch's hat: scale (of the sigils' size), offset (the gap between her hat tip and the bottom sigil, in sigil heights), gap (between sigils, in sigil heights). It sways as a chain of springs: stiffness and damping, trail (how far it leans back per m/s of her speed), idleSway (metres of gentle sway when she's still).",Vp={offset:.5,scale:.65,gap:.15,stiffness:60,damping:9,trail:.03,idleSway:.1},Yp="Each playing soundsystem's laser show: bursts of blockBars bars, on about duty of the time (seeded per soundsystem), up to maxCount beams stepping on the bars, fanned over spread degrees (no beam tilting more than maxTilt from straight up), swinging sweep degrees once every sweepBeats beats (slow, like searchlights), opening and closing the fan every openBars bars, length metres tall, opacity 0-1, fading in over fadeIn and out over fadeOut seconds, and fading with distance from fadeNear to fadeFar metres. Glow only: no light, nothing from the light budget.",Xp={on:!0,maxCount:9,length:420,spread:100,maxTilt:55,sweep:22,sweepBeats:36,openBars:18,opacity:.6,duty:.35,blockBars:4,fadeIn:.12,fadeOut:.4,fadeNear:140,fadeFar:480},Kp="A sparkling line round the partified region's outside edge, in each area's sigil colour: width (px), brightness, sparkle (0-1, how much it twinkles and runs), step (metres between its sparks).",qp={on:!0,width:2,brightness:1.2,sparkle:.6,step:1.6},$p={spacing:10,campfire:.012,magicStone:.008,pond:.02,wetPond:.12},Zp={near:150,far:360},Jp="The scenery budget (Ed, 2026-10-03: gameplay always drawn, scenery as much as we can). Creatures, sigils, soundsystems, the dancefloor, the party border, campfires and stones are always drawn. Scenery (trees, bushes, wall objects, set pieces, string lights) is drawn out to a radius round the witch, at most the haze's far edge, fading out over its last fade metres so nothing pops. With adaptive on, the radius follows the frame rate: if it stays under fps minus hysteresis for sustain seconds the radius shrinks by shrink metres a second, never below minRadius; if it stays at fps or more, it grows back by grow metres a second. ?scenery=<metres> fixes the radius (for testing).",Qp={adaptive:!0,fps:55,hysteresis:8,sustain:1.5,minRadius:110,shrink:40,grow:15,fade:40},jp="bloom: a gentle glow round bright things (strength 0 or on false turns it off; threshold: how bright a pixel must be to glow). tiltShift: blurs the top and bottom of the screen so the forest looks like a miniature. strength: the blur at the screen's edges, in pixels; band: the height of the sharp band (0-1 of the screen); centre: where it sits (0 top, 0.5 middle, 1 bottom); where: 'before' blurs at the low resolution, before the pixels are scaled up, 'after' blurs the scaled-up image. Add ?tilt=before, ?tilt=after or ?tilt=off to the link to compare.",em="shadows: a small contact shadow under the witch, each bush, creature and prop; trees: a crown-sized shadow under every tree too, cast away from the moon (off: Ed, 2026-10-03). canopyShadow: a dappled shadow from the canopy overhead (height in metres), thinner in clearings, drifting with the wind. mist: a low drifting mist (height in metres above the ground). Each has on and strength.",tm={on:!0,strength:.7,trees:!1},nm={on:!0,strength:.45,height:18,cover:.55,wind:.6},im={on:!0,strength:.12,height:3,wind:.8},sm="fx: how the mist, the far haze and the canopy dapple are drawn. smooth: soft gradients (the mist in its own buffer, blurred a little and scaled up smoothly); pixel: dithered steps on the art's pixel grid. In smooth, the moonlight's bands, moonbeams and the soft contact shadows under the witch, creatures, bushes and props are smooth too (no dither anywhere); pixel brings all the dithers back. ?fx=pixel or ?fx=smooth in the URL.",rm="smooth",am="How strong the diagonal moonbeam bands are, times the style's Moonbeams knob: 0 is off (Ed, v108: they read as stripes over a dense canopy). ?moonbeams=on brings them back at 1.",om=0,lm="Paths, roads and railways (Ed): rails [min,max] railway lines edge to edge in wide curves (one with a branch); roads [min,max] broad sweeping old roads; linkChance: the share of neighbouring areas joined by a meandering path; deadEndChance: the share of areas with a path out to nothing; pathHalf, roadHalf, railHalf: half each corridor's width (metres), kept clear of trees, with bushes thick along the edges for edgeBushes metres (bushBoost times as many); railBroken: the share of the railway that's broken, where trees grow between the sleepers (treesOnBroken times the usual chance).",cm={rails:[2,4],roads:[1,2],linkChance:.55,deadEndChance:.3,pathHalf:1.6,roadHalf:3.5,railHalf:2.6,railBroken:.3,treesOnBroken:.35,edgeBushes:3,bushBoost:3},hm="Inviting (DESIGN.md, the leash): on the ground, hold Talk within talkRange metres of a creature; you chat in emoji for talkTime seconds (babies, young, adults), taking turns every turn seconds (babies, young, adults), then it is invited and leashed to you. Letting go, rising or moving further than cancelDistance stops it, and the chat's progress drains at decayRate of the rate it filled (0.5: half), so coming back soon picks up where it left off. Legends can't be invited: they give one unimpressed look. leash.length: how far a leashed creature roams from its leash point (you, or its sigil on the ground); runSpeed: how fast it hurries back when out of range (m/s); pickRadius: how near a placed sigil you must be to pick it up; spacing: how close two sigils may be put down (keep it above pickRadius, or a blocked spot picks up instead of fizzling). bond: how a creature shows its tie to its sigil (rim: a glow at its feet in the sigil's colour; sparks: one spark every sparkEvery seconds from sigil to creature, staggered; thread: a dotted line only under strain).",um={talkRange:12,cancelDistance:18,talkTime:[3,6,12],turn:[.7,.9,1.3],decayRate:.5},dm={length:8,runSpeed:4,pickRadius:2,spacing:4},fm={rim:!0,sparks:!0,thread:!0,sparkEvery:4},pm="motes: sparse glowing motes over every partified area, perPatch per 20 x 20 m, rising from from to to metres (under the crowns to above them) at about speed m/s. uplight: crowns in partified areas catch a faint glow from below in the area's colour (strength at its brightest, pulse on the beat, fading over edge metres toward the border). The party spreads: a wave every interval seconds (the first after startDelay more), partifying every area touching a partified one; maxPerWave caps a wave (0: no cap). transition: seconds an area takes to partify, 0 to skip the show. partyLight: the coloured light at each soundsystem (reach in metres, strength).",mm={motes:{perPatch:4,from:10,to:34,speed:1.2},uplight:{strength:.13,pulse:.04,edge:10},interval:300,startDelay:0,maxPerWave:0,transition:2.5,lightReach:30,lightStrength:1.6},gm="Colourful string lights in every partified area, as long garlands: runsPerArea runs (a range), each spansPerRun spans (a range) from tree to tree, every next tree inside a forward cone of coneAngle degrees either side, so a run sweeps across rather than zig-zagging; runs start at least spread metres apart. Each span is spanMin to spanMax metres. No span crosses another and each tree holds at most two ends, except junction trees (junctionChance per tree on a run) where a branch leaves, so three meet. At height metres, sagging sag metres per 8 m of span, a bulb every bulbSpacing metres in the palette's colours, twinkling (twinkle 0-1), a chase running along now and then at chaseSpeed bulbs per second. The bulbs only glow (bloom); they cast no light.",xm={on:!0,runsPerArea:[3,6],spansPerRun:[4,10],coneAngle:35,junctionChance:.15,spanMin:6,spanMax:20,spread:24,height:6.5,sag:.9,bulbSpacing:.8,palette:["#fff1d6","#ff6fcf","#5fe8ff","#ffe25c","#b48cff","#7dff8a"],twinkle:.35,chaseSpeed:8},vm="The dancefloor: motes: magic particles drifting up off the circle (count, how high they rise in metres, speed in m/s, column: the share of the circle they rise from); a ring of standing stones (radius in metres, how many stones), a clear space of clearing metres round it, a glowing magic circle (two hues 0-1, pulse per second, runeSpeed in turns per minute) lighting the ground round it (lightReach metres, lightStrength), and a magic disco ball floating discoHeight metres up (discoSize metres across, spin turns per minute) throwing specks of light: specks is the share of the sphere that throws one, speckBrightness how bright, speckReach how far.",Mm={motes:{count:220,rise:110,speed:3.2,column:.8},radius:13.5,stones:27,clearing:9,circleHue:.86,circleHue2:.52,pulse:.35,runeSpeed:1,lightReach:36,lightStrength:2,discoHeight:7.5,discoSize:1.8,spin:4,specks:.22,speckBrightness:.9,speckReach:32},_m="In ground mode the canopy stays drawn at the screen's edges, so she flies under the forest roof; a dithered hole round her is cut out, screenFraction of the screen's width across, with a soft edge (a fraction of the width). Rising closes the hole.",bm={screenFraction:.8,edge:.1},Sm="Contrast: ambient scales the twilight fill (lower is darker shade under the canopy); black is the black point and gamma the curve applied to the whole picture, so dark goes near-black and lit stays bright.",ym={black:.03,gamma:1.35,ambient:.35},wm={on:!0,strength:.7,threshold:.55},Em={on:!0,where:"before",strength:3,band:.4,centre:.55},Am="Creatures grow more numerous and older with an area's distance from home (0 at the dancefloor, 1 at the map's edge): creaturesNear in the areas round home, creaturesFar at the edge (creatureCurve shapes the rise), youngShareFar of them young at the edge; adults from adultsFrom outward, adultShareFar of them at the edge. Legends are rare: at most one in any area, by a chance rising from 0 at legendsFrom to legendChanceFar at the edge; legendNextToHome puts one next to home, to look at early. Idle creatures roam their whole area. Only creatures whose home is within creatureSimRadius metres of the witch move (never less than the haze far edge plus 2.5 areas, so a creature resuming its roam always does so out of sight).",Tm=2,Rm=20,Cm=1.3,Lm=.5,Pm=.35,Dm=.35,Im=.25,Nm=!0,Om=.55,Um=600,Fm=.6,Bm="setPieceChance: the share of areas, among the types that have a set piece, that show theirs. Wall objects (an area type's edges: puddles, henges, hedges) stand where areas meet, one per wallSpacing metres with chance wallDensity; they do not block movement.",km=.25,zm=1.8,Gm=9,Hm="Gameplay is placed first, then scenery keeps clear of it: a set piece's footprint (setPieceFootprint metres round its middle, times setPieceScale) stays reserveMargin metres clear of every soundsystem's spot (soundsystemFootprint metres round it, reserved from the start) and of the dancefloor's clearing; a set piece with no room left is left out. Trees keep treeMarginFromSoundsystem metres from a soundsystem's footprint.",Wm=7,Vm=6,Ym=3,Xm=1.5,Km=.35,qm={_readme:B0,_map:k0,mapAreas:z0,areaSize:G0,areaScale:H0,areaSizeVariance:W0,borderLayers:V0,_trees:Y0,treeDensity:X0,clearingSize:K0,clearingFalloff:q0,gladeAmount:$0,gladeScale:Z0,_areaEdgeBlend:J0,areaEdgeBlend:Q0,_density:j0,density:ep,bushDensity:tp,bushClump:np,treeHeight:ip,crownWidth:sp,treeSpacingX:rp,treeSpacingZ:ap,crownHalfWidth:op,crownHeight:lp,bushSpacing:cp,wallSpacing:hp,wallDensity:up,_witch:dp,groundSpeed:fp,treetopSpeed:pp,acceleration:mp,groundAcceleration:gp,leanAt:xp,facing:vp,riseTime:Mp,descendTime:_p,groundHeight:bp,treetopHeight:Sp,_camera:yp,camera:wp,_look:Ep,pixelSize:Ap,glowReach:Tp,glowHeight:Rp,spriteTilt:Cp,artPixelsPerMetre:Lp,viewMargin:Pp,lightBudget:Dp,_lightSources:Ip,_lights:Np,lights:Op,glowPower:Up,_beat:Fp,beat:Bp,_occlusion:kp,_sigilProjection:zp,sigilProjection:Gp,occlusion:Hp,_stack:Wp,stack:Vp,_lasers:Yp,lasers:Xp,_borders:Kp,borders:qp,lightSources:$p,haze:Zp,_scenery:Jp,scenery:Qp,_post:jp,_shadows:em,shadows:tm,canopyShadow:nm,mist:im,_fx:sm,fx:rm,_moonbeams:am,moonbeams:om,_paths:lm,paths:cm,_invite:hm,invite:um,leash:dm,bond:fm,_party:pm,party:mm,_stringLights:gm,stringLights:xm,_dancefloor:vm,dancefloor:Mm,_canopyCutout:_m,canopyCutout:bm,_tone:Sm,tone:ym,bloom:wm,tiltShift:Em,_creatures:Am,creaturesNear:Tm,creaturesFar:Rm,creatureCurve:Cm,youngShareFar:Lm,adultsFrom:Pm,adultShareFar:Dm,legendChanceFar:Im,legendNextToHome:Nm,legendsFrom:Om,creatureSimRadius:Um,creatureSpeed:Fm,_setPieces:Bm,setPieceChance:km,setPieceScale:zm,setPieceClear:Gm,_placement:Hm,setPieceFootprint:Wm,soundsystemFootprint:Vm,reserveMargin:Ym,treeMarginFromSoundsystem:Xm,legendSpeed:Km},qi=qm;class $m{keys=new Set;pressed=new Set;padPrev=[];touch={x:0,y:0,toggle:!1,zoom:0,debug:!1};onAny=null;constructor(e=window){e.addEventListener("keydown",t=>{if(t.repeat){this.isGameKey(t.code)&&t.preventDefault();return}this.keys.add(t.code),this.isGameKey(t.code)&&t.preventDefault(),this.onAny?.()||this.pressed.add(t.code)}),e.addEventListener("keyup",t=>this.keys.delete(t.code)),e.addEventListener("blur",()=>this.keys.clear())}isGameKey(e){return/^(Arrow|Space$|Key[WASDZXENPTIFR]$|Shift|Minus$|Equal$|NumpadAdd$|NumpadSubtract$|Backquote$)/.test(e)}clearPresses(){this.pressed.clear();const e=this.touch;e.toggle=!1,e.zoom=0,e.debug=!1}read(){const e=this.pressed.has("KeyN")||this.touch.nextWave,t=this.pressed.has("KeyP")||this.touch.pauseWaves;this.touch.nextWave=!1,this.touch.pauseWaves=!1;const i=x=>this.keys.has(x)?1:0,s=x=>this.pressed.has(x);let r=i("KeyD")+i("ArrowRight")-i("KeyA")-i("ArrowLeft"),a=i("KeyS")+i("ArrowDown")-i("KeyW")-i("ArrowUp"),o=s("Space"),h=(s("KeyX")||s("Minus")||s("NumpadSubtract")?1:0)-(s("KeyZ")||s("Equal")||s("NumpadAdd")?1:0),l=s("Backquote"),u=i("KeyT")+i("KeyF")+i("ShiftLeft")+i("ShiftRight")>0,f=s("KeyE")||s("KeyR");const d=s("KeyI");this.pressed.clear();const p=typeof navigator<"u"&&navigator.getGamepads?navigator.getGamepads():[];for(const x of p){if(!x)continue;const m=E=>!!x.buttons[E]?.pressed,S=x.buttons.some((E,P)=>E.pressed&&!this.padPrev[P])&&!!this.onAny?.(),b=E=>!S&&m(E)&&!this.padPrev[E];let A=x.axes[0]??0,w=x.axes[1]??0;const L=Math.hypot(A,w),_=.18;if(L<_)A=0,w=0;else{const E=(Math.min(1,L)-_)/(1-_)/L;A*=E,w*=E}A+=(m(15)?1:0)-(m(14)?1:0),w+=(m(13)?1:0)-(m(12)?1:0),r+=A,a+=w,b(3)&&(o=!0),(b(4)||b(6))&&(h+=1),(b(5)||b(7))&&(h-=1),b(8)&&(l=!0),m(0)&&(u=!0),b(2)&&(f=!0),this.padPrev=x.buttons.map(E=>E.pressed);break}const g=this.touch;r+=g.x,a+=g.y,g.toggle&&(o=!0),h+=g.zoom,g.debug&&(l=!0),g.talk&&(u=!0),g.sigil&&(f=!0),g.toggle=!1,g.zoom=0,g.debug=!1,g.sigil=!1;const v=Math.hypot(r,a);return v>1&&(r/=v,a/=v),{moveX:r,moveZ:a,toggleMode:o,zoom:Math.sign(h),debug:l,nextWave:e,pauseWaves:t,talk:u,sigil:f,inviteNearest:d}}}const Jl="186",Zm=0,Gc=1,Jm=2,fa=1,Qm=2,dr=3,cs=0,yn=1,bi=2,ci=0,Fs=1,hs=2,Hc=3,Wc=4,Wa=5,Is=100,jm=101,eg=102,tg=103,ng=104,Ql=200,ig=201,jl=202,sg=203,ec=204,tc=205,rg=206,ag=207,og=208,lg=209,cg=210,hg=211,ug=212,dg=213,fg=214,Zo=0,Jo=1,Qo=2,xr=3,jo=4,el=5,ya=6,tl=7,Tu=0,pg=1,mg=2,hi=0,Ru=1,Cu=2,Lu=3,Pu=4,Du=5,Iu=6,Nu=7,Ou=300,us=301,Vs=302,no=303,io=304,Va=306,nl=1e3,Si=1001,il=1002,Wt=1003,gg=1004,Dr=1005,zt=1006,so=1007,ss=1008,Rn=1009,Uu=1010,Fu=1011,vr=1012,nc=1013,ui=1014,oi=1015,di=1016,ic=1017,sc=1018,Mr=1020,Bu=35902,ku=35899,zu=1021,Gu=1022,Cn=1023,Ei=1026,rs=1027,Hu=1028,rc=1029,ds=1030,ac=1031,oc=1033,pa=33776,ma=33777,ga=33778,xa=33779,sl=35840,rl=35841,al=35842,ol=35843,ll=36196,cl=37492,hl=37496,ul=37488,dl=37489,wa=37490,fl=37491,pl=37808,ml=37809,gl=37810,xl=37811,vl=37812,Ml=37813,_l=37814,bl=37815,Sl=37816,yl=37817,wl=37818,El=37819,Al=37820,Tl=37821,Rl=36492,Cl=36494,Ll=36495,Pl=36283,Dl=36284,Ea=36285,Il=36286,xg=3200,Vc=0,vg=1,Yn="",On="srgb",_r="srgb-linear",Aa="linear",vt="srgb",ro=7680,Mg=519,_g=512,bg=513,Sg=514,lc=515,yg=516,wg=517,cc=518,Eg=519,Ag=35044,Bs=35048,Yc="300 es",li=2e3,Ta=2001;function Tg(n){for(let e=n.length-1;e>=0;--e)if(n[e]>=65535)return!0;return!1}function Ra(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function Rg(){const n=Ra("canvas");return n.style.display="block",n}const Xc={};function Kc(...n){const e="THREE."+n.shift();console.log(e,...n)}function Wu(n){const e=n[0];if(typeof e=="string"&&e.startsWith("TSL:")){const t=n[1];t&&t.isStackTrace?n[0]+=" "+t.getLocation():n[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return n}function He(...n){n=Wu(n);const e="THREE."+n.shift();{const t=n[0];t&&t.isStackTrace?console.warn(t.getError(e)):console.warn(e,...n)}}function ct(...n){n=Wu(n);const e="THREE."+n.shift();{const t=n[0];t&&t.isStackTrace?console.error(t.getError(e)):console.error(e,...n)}}function ks(...n){const e=n.join(" ");e in Xc||(Xc[e]=!0,He(...n))}function Cg(n,e,t){return new Promise(function(i,s){function r(){switch(n.clientWaitSync(e,n.SYNC_FLUSH_COMMANDS_BIT,0)){case n.WAIT_FAILED:s();break;case n.TIMEOUT_EXPIRED:setTimeout(r,t);break;default:i()}}setTimeout(r,t)})}const Lg={[Zo]:Jo,[Qo]:ya,[jo]:tl,[xr]:el,[Jo]:Zo,[ya]:Qo,[tl]:jo,[el]:xr};class ps{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(t)===-1&&i[e].push(t)}hasEventListener(e,t){const i=this._listeners;return i===void 0?!1:i[e]!==void 0&&i[e].indexOf(t)!==-1}removeEventListener(e,t){const i=this._listeners;if(i===void 0)return;const s=i[e];if(s!==void 0){const r=s.indexOf(t);r!==-1&&s.splice(r,1)}}dispatchEvent(e){const t=this._listeners;if(t===void 0)return;const i=t[e.type];if(i!==void 0){e.target=this;const s=i.slice(0);for(let r=0,a=s.length;r<a;r++)s[r].call(this,e);e.target=null}}}const hn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],ao=Math.PI/180,Nl=180/Math.PI;function yr(){const n=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(hn[n&255]+hn[n>>8&255]+hn[n>>16&255]+hn[n>>24&255]+"-"+hn[e&255]+hn[e>>8&255]+"-"+hn[e>>16&15|64]+hn[e>>24&255]+"-"+hn[t&63|128]+hn[t>>8&255]+"-"+hn[t>>16&255]+hn[t>>24&255]+hn[i&255]+hn[i>>8&255]+hn[i>>16&255]+hn[i>>24&255]).toLowerCase()}function rt(n,e,t){return Math.max(e,Math.min(t,n))}function Pg(n,e){return(n%e+e)%e}function oo(n,e,t){return(1-t)*n+t*e}function nr(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:case Uint8ClampedArray:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function _n(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:case Uint8ClampedArray:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}class We{static{We.prototype.isVector2=!0}constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("THREE.Vector2: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,i=this.y,s=e.elements;return this.x=s[0]*t+s[3]*i+s[6],this.y=s[1]*t+s[4]*i+s[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=rt(this.x,e.x,t.x),this.y=rt(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=rt(this.x,e,t),this.y=rt(this.y,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(rt(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(rt(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y;return t*t+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const i=Math.cos(t),s=Math.sin(t),r=this.x-e.x,a=this.y-e.y;return this.x=r*i-a*s+e.x,this.y=r*s+a*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class qs{constructor(e=0,t=0,i=0,s=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=i,this._w=s}static slerpFlat(e,t,i,s,r,a,o){let h=i[s+0],l=i[s+1],u=i[s+2],f=i[s+3],d=r[a+0],p=r[a+1],g=r[a+2],v=r[a+3];if(f!==v||h!==d||l!==p||u!==g){let x=h*d+l*p+u*g+f*v;x<0&&(d=-d,p=-p,g=-g,v=-v,x=-x);let m=1-o;if(x<.9995){const M=Math.acos(x),S=Math.sin(M);m=Math.sin(m*M)/S,o=Math.sin(o*M)/S,h=h*m+d*o,l=l*m+p*o,u=u*m+g*o,f=f*m+v*o}else{h=h*m+d*o,l=l*m+p*o,u=u*m+g*o,f=f*m+v*o;const M=1/Math.sqrt(h*h+l*l+u*u+f*f);h*=M,l*=M,u*=M,f*=M}}e[t]=h,e[t+1]=l,e[t+2]=u,e[t+3]=f}static multiplyQuaternionsFlat(e,t,i,s,r,a){const o=i[s],h=i[s+1],l=i[s+2],u=i[s+3],f=r[a],d=r[a+1],p=r[a+2],g=r[a+3];return e[t]=o*g+u*f+h*p-l*d,e[t+1]=h*g+u*d+l*f-o*p,e[t+2]=l*g+u*p+o*d-h*f,e[t+3]=u*g-o*f-h*d-l*p,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,i,s){return this._x=e,this._y=t,this._z=i,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const i=e._x,s=e._y,r=e._z,a=e._order,o=Math.cos,h=Math.sin,l=o(i/2),u=o(s/2),f=o(r/2),d=h(i/2),p=h(s/2),g=h(r/2);switch(a){case"XYZ":this._x=d*u*f+l*p*g,this._y=l*p*f-d*u*g,this._z=l*u*g+d*p*f,this._w=l*u*f-d*p*g;break;case"YXZ":this._x=d*u*f+l*p*g,this._y=l*p*f-d*u*g,this._z=l*u*g-d*p*f,this._w=l*u*f+d*p*g;break;case"ZXY":this._x=d*u*f-l*p*g,this._y=l*p*f+d*u*g,this._z=l*u*g+d*p*f,this._w=l*u*f-d*p*g;break;case"ZYX":this._x=d*u*f-l*p*g,this._y=l*p*f+d*u*g,this._z=l*u*g-d*p*f,this._w=l*u*f+d*p*g;break;case"YZX":this._x=d*u*f+l*p*g,this._y=l*p*f+d*u*g,this._z=l*u*g-d*p*f,this._w=l*u*f-d*p*g;break;case"XZY":this._x=d*u*f-l*p*g,this._y=l*p*f-d*u*g,this._z=l*u*g+d*p*f,this._w=l*u*f+d*p*g;break;default:He("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const i=t/2,s=Math.sin(i);return this._x=e.x*s,this._y=e.y*s,this._z=e.z*s,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,i=t[0],s=t[4],r=t[8],a=t[1],o=t[5],h=t[9],l=t[2],u=t[6],f=t[10],d=i+o+f;if(d>0){const p=.5/Math.sqrt(d+1);this._w=.25/p,this._x=(u-h)*p,this._y=(r-l)*p,this._z=(a-s)*p}else if(i>o&&i>f){const p=2*Math.sqrt(1+i-o-f);this._w=(u-h)/p,this._x=.25*p,this._y=(s+a)/p,this._z=(r+l)/p}else if(o>f){const p=2*Math.sqrt(1+o-i-f);this._w=(r-l)/p,this._x=(s+a)/p,this._y=.25*p,this._z=(h+u)/p}else{const p=2*Math.sqrt(1+f-i-o);this._w=(a-s)/p,this._x=(r+l)/p,this._y=(h+u)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let i=e.dot(t)+1;return i<1e-8?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(rt(this.dot(e),-1,1)))}rotateTowards(e,t){const i=this.angleTo(e);if(i===0)return this;const s=Math.min(1,t/i);return this.slerp(e,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const i=e._x,s=e._y,r=e._z,a=e._w,o=t._x,h=t._y,l=t._z,u=t._w;return this._x=i*u+a*o+s*l-r*h,this._y=s*u+a*h+r*o-i*l,this._z=r*u+a*l+i*h-s*o,this._w=a*u-i*o-s*h-r*l,this._onChangeCallback(),this}slerp(e,t){let i=e._x,s=e._y,r=e._z,a=e._w,o=this.dot(e);o<0&&(i=-i,s=-s,r=-r,a=-a,o=-o);let h=1-t;if(o<.9995){const l=Math.acos(o),u=Math.sin(l);h=Math.sin(h*l)/u,t=Math.sin(t*l)/u,this._x=this._x*h+i*t,this._y=this._y*h+s*t,this._z=this._z*h+r*t,this._w=this._w*h+a*t,this._onChangeCallback()}else this._x=this._x*h+i*t,this._y=this._y*h+s*t,this._z=this._z*h+r*t,this._w=this._w*h+a*t,this.normalize();return this}slerpQuaternions(e,t,i){return this.copy(e).slerp(t,i)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),i=Math.random(),s=Math.sqrt(1-i),r=Math.sqrt(i);return this.set(s*Math.sin(e),s*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class X{static{X.prototype.isVector3=!0}constructor(e=0,t=0,i=0){this.x=e,this.y=t,this.z=i}set(e,t,i){return i===void 0&&(i=this.z),this.x=e,this.y=t,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("THREE.Vector3: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(qc.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(qc.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,i=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[3]*i+r[6]*s,this.y=r[1]*t+r[4]*i+r[7]*s,this.z=r[2]*t+r[5]*i+r[8]*s,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,i=this.y,s=this.z,r=e.elements,a=1/(r[3]*t+r[7]*i+r[11]*s+r[15]);return this.x=(r[0]*t+r[4]*i+r[8]*s+r[12])*a,this.y=(r[1]*t+r[5]*i+r[9]*s+r[13])*a,this.z=(r[2]*t+r[6]*i+r[10]*s+r[14])*a,this}applyQuaternion(e){const t=this.x,i=this.y,s=this.z,r=e.x,a=e.y,o=e.z,h=e.w,l=2*(a*s-o*i),u=2*(o*t-r*s),f=2*(r*i-a*t);return this.x=t+h*l+a*f-o*u,this.y=i+h*u+o*l-r*f,this.z=s+h*f+r*u-a*l,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,i=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[4]*i+r[8]*s,this.y=r[1]*t+r[5]*i+r[9]*s,this.z=r[2]*t+r[6]*i+r[10]*s,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=rt(this.x,e.x,t.x),this.y=rt(this.y,e.y,t.y),this.z=rt(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=rt(this.x,e,t),this.y=rt(this.y,e,t),this.z=rt(this.z,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(rt(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const i=e.x,s=e.y,r=e.z,a=t.x,o=t.y,h=t.z;return this.x=s*h-r*o,this.y=r*a-i*h,this.z=i*o-s*a,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const i=e.dot(this)/t;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return lo.copy(this).projectOnVector(e),this.sub(lo)}reflect(e){return this.sub(lo.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(rt(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y,s=this.z-e.z;return t*t+i*i+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,i){const s=Math.sin(t)*e;return this.x=s*Math.sin(i),this.y=Math.cos(t)*e,this.z=s*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,i){return this.x=e*Math.sin(t),this.y=i,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),s=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=i,this.z=s,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,i=Math.sqrt(1-t*t);return this.x=i*Math.cos(e),this.y=t,this.z=i*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const lo=new X,qc=new qs;class Ye{static{Ye.prototype.isMatrix3=!0}constructor(e,t,i,s,r,a,o,h,l){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,i,s,r,a,o,h,l)}set(e,t,i,s,r,a,o,h,l){const u=this.elements;return u[0]=e,u[1]=s,u[2]=o,u[3]=t,u[4]=r,u[5]=h,u[6]=i,u[7]=a,u[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],this}extractBasis(e,t,i){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,s=t.elements,r=this.elements,a=i[0],o=i[3],h=i[6],l=i[1],u=i[4],f=i[7],d=i[2],p=i[5],g=i[8],v=s[0],x=s[3],m=s[6],M=s[1],S=s[4],b=s[7],A=s[2],w=s[5],L=s[8];return r[0]=a*v+o*M+h*A,r[3]=a*x+o*S+h*w,r[6]=a*m+o*b+h*L,r[1]=l*v+u*M+f*A,r[4]=l*x+u*S+f*w,r[7]=l*m+u*b+f*L,r[2]=d*v+p*M+g*A,r[5]=d*x+p*S+g*w,r[8]=d*m+p*b+g*L,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[1],s=e[2],r=e[3],a=e[4],o=e[5],h=e[6],l=e[7],u=e[8];return t*a*u-t*o*l-i*r*u+i*o*h+s*r*l-s*a*h}invert(){const e=this.elements,t=e[0],i=e[1],s=e[2],r=e[3],a=e[4],o=e[5],h=e[6],l=e[7],u=e[8],f=u*a-o*l,d=o*h-u*r,p=l*r-a*h,g=t*f+i*d+s*p;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const v=1/g;return e[0]=f*v,e[1]=(s*l-u*i)*v,e[2]=(o*i-s*a)*v,e[3]=d*v,e[4]=(u*t-s*h)*v,e[5]=(s*r-o*t)*v,e[6]=p*v,e[7]=(i*h-l*t)*v,e[8]=(a*t-i*r)*v,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,i,s,r,a,o){const h=Math.cos(r),l=Math.sin(r);return this.set(i*h,i*l,-i*(h*a+l*o)+a+e,-s*l,s*h,-s*(-l*a+h*o)+o+t,0,0,1),this}scale(e,t){return ks("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(co.makeScale(e,t)),this}rotate(e){return ks("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(co.makeRotation(-e)),this}translate(e,t){return ks("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(co.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,i,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,i=e.elements;for(let s=0;s<9;s++)if(t[s]!==i[s])return!1;return!0}fromArray(e,t=0){for(let i=0;i<9;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const co=new Ye,$c=new Ye().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Zc=new Ye().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Dg(){const n={enabled:!0,workingColorSpace:_r,spaces:{},convert:function(s,r,a){return this.enabled===!1||r===a||!r||!a||(this.spaces[r].transfer===vt&&(s.r=wi(s.r),s.g=wi(s.g),s.b=wi(s.b)),this.spaces[r].primaries!==this.spaces[a].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===vt&&(s.r=zs(s.r),s.g=zs(s.g),s.b=zs(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===Yn?Aa:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,a){return s.copy(this.spaces[r].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(s,r){return ks("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),n.workingToColorSpace(s,r)},toWorkingColorSpace:function(s,r){return ks("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),n.colorSpaceToWorking(s,r)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],i=[.3127,.329];return n.define({[_r]:{primaries:e,whitePoint:i,transfer:Aa,toXYZ:$c,fromXYZ:Zc,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:On},outputColorSpaceConfig:{drawingBufferColorSpace:On}},[On]:{primaries:e,whitePoint:i,transfer:vt,toXYZ:$c,fromXYZ:Zc,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:On}}}),n}const st=Dg();function wi(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function zs(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}let xs;class Ig{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let i;if(e instanceof HTMLCanvasElement)i=e;else{xs===void 0&&(xs=Ra("canvas")),xs.width=e.width,xs.height=e.height;const s=xs.getContext("2d");e instanceof ImageData?s.putImageData(e,0,0):s.drawImage(e,0,0,e.width,e.height),i=xs}return i.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=Ra("canvas");t.width=e.width,t.height=e.height;const i=t.getContext("2d");i.drawImage(e,0,0,e.width,e.height);const s=i.getImageData(0,0,e.width,e.height),r=s.data;for(let a=0;a<r.length;a++)r[a]=wi(r[a]/255)*255;return i.putImageData(s,0,0),t}else if(e.data){const t=e.data.slice(0);for(let i=0;i<t.length;i++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[i]=Math.floor(wi(t[i]/255)*255):t[i]=wi(t[i]);return{data:t,width:e.width,height:e.height}}else return He("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let Ng=0;class hc{constructor(e=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:Ng++}),this.uuid=yr(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<"u"&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const i={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let a=0,o=s.length;a<o;a++)s[a].isDataTexture?r.push(ho(s[a].image)):r.push(ho(s[a]))}else r=ho(s);i.url=r}return t||(e.images[this.uuid]=i),i}}function ho(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?Ig.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(He("Texture: Unable to serialize Texture."),{})}let Og=0;const uo=new X;class fn extends ps{constructor(e=fn.DEFAULT_IMAGE,t=fn.DEFAULT_MAPPING,i=Si,s=Si,r=zt,a=ss,o=Cn,h=Rn,l=fn.DEFAULT_ANISOTROPY,u=Yn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Og++}),this.uuid=yr(),this.name="",this.source=new hc(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=i,this.wrapT=s,this.magFilter=r,this.minFilter=a,this.anisotropy=l,this.format=o,this.internalFormat=null,this.type=h,this.offset=new We(0,0),this.repeat=new We(1,1),this.center=new We(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ye,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(uo).x}get height(){return this.source.getSize(uo).y}get depth(){return this.source.getSize(uo).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const t in e){const i=e[t];if(i===void 0){He(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}const s=this[t];if(s===void 0){He(`Texture.setValues(): property '${t}' does not exist.`);continue}s&&i&&s.isVector2&&i.isVector2||s&&i&&s.isVector3&&i.isVector3||s&&i&&s.isMatrix3&&i.isMatrix3?s.copy(i):this[t]=i}}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const i={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),t||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Ou)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case nl:e.x=e.x-Math.floor(e.x);break;case Si:e.x=e.x<0?0:1;break;case il:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case nl:e.y=e.y-Math.floor(e.y);break;case Si:e.y=e.y<0?0:1;break;case il:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}fn.DEFAULT_IMAGE=null;fn.DEFAULT_MAPPING=Ou;fn.DEFAULT_ANISOTROPY=1;class it{static{it.prototype.isVector4=!0}constructor(e=0,t=0,i=0,s=1){this.x=e,this.y=t,this.z=i,this.w=s}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,i,s){return this.x=e,this.y=t,this.z=i,this.w=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("THREE.Vector4: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,i=this.y,s=this.z,r=this.w,a=e.elements;return this.x=a[0]*t+a[4]*i+a[8]*s+a[12]*r,this.y=a[1]*t+a[5]*i+a[9]*s+a[13]*r,this.z=a[2]*t+a[6]*i+a[10]*s+a[14]*r,this.w=a[3]*t+a[7]*i+a[11]*s+a[15]*r,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,i,s,r;const h=e.elements,l=h[0],u=h[4],f=h[8],d=h[1],p=h[5],g=h[9],v=h[2],x=h[6],m=h[10];if(Math.abs(u-d)<.01&&Math.abs(f-v)<.01&&Math.abs(g-x)<.01){if(Math.abs(u+d)<.1&&Math.abs(f+v)<.1&&Math.abs(g+x)<.1&&Math.abs(l+p+m-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const S=(l+1)/2,b=(p+1)/2,A=(m+1)/2,w=(u+d)/4,L=(f+v)/4,_=(g+x)/4;return S>b&&S>A?S<.01?(i=0,s=.707106781,r=.707106781):(i=Math.sqrt(S),s=w/i,r=L/i):b>A?b<.01?(i=.707106781,s=0,r=.707106781):(s=Math.sqrt(b),i=w/s,r=_/s):A<.01?(i=.707106781,s=.707106781,r=0):(r=Math.sqrt(A),i=L/r,s=_/r),this.set(i,s,r,t),this}let M=Math.sqrt((x-g)*(x-g)+(f-v)*(f-v)+(d-u)*(d-u));return Math.abs(M)<.001&&(M=1),this.x=(x-g)/M,this.y=(f-v)/M,this.z=(d-u)/M,this.w=Math.acos((l+p+m-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=rt(this.x,e.x,t.x),this.y=rt(this.y,e.y,t.y),this.z=rt(this.z,e.z,t.z),this.w=rt(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=rt(this.x,e,t),this.y=rt(this.y,e,t),this.z=rt(this.z,e,t),this.w=rt(this.w,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(rt(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this.w=e.w+(t.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Ug extends ps{constructor(e=1,t=1,i={}){super(),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:zt,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},i),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=i.depth,this.scissor=new it(0,0,e,t),this.scissorTest=!1,this.viewport=new it(0,0,e,t),this.textures=[];const s={width:e,height:t,depth:i.depth},r=new fn(s),a=i.count;for(let o=0;o<a;o++)this.textures[o]=r.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(i),this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveColorBuffer=i.resolveColorBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this.storeMultisampledColorBuffer=i.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=i.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=i.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=i.depthTexture,this.samples=i.samples,this.multiview=i.multiview,this.useArrayDepthTexture=i.useArrayDepthTexture}_setTextureOptions(e={}){const t={minFilter:zt,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let i=0;i<this.textures.length;i++)this.textures[i].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),e!==null&&e.renderTarget===null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,i=1){if(this.width!==e||this.height!==t||this.depth!==i){this.width=e,this.height=t,this.depth=i;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=e,this.textures[s].image.height=t,this.textures[s].image.depth=i,this.textures[s].isData3DTexture!==!0&&(this.textures[s].isArrayTexture=this.textures[s].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,i=e.textures.length;t<i;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;const s=Object.assign({},e.textures[t].image);this.textures[t].source=new hc(s)}if(this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveColorBuffer=e.resolveColorBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,this.storeMultisampledColorBuffer=e.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=e.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=e.storeMultisampledStencilBuffer,e.depthTexture!==null)if(e.depthTexture.renderTarget===e){const t=e.depthTexture.clone();t.renderTarget=null,this.depthTexture=t}else this.depthTexture=e.depthTexture;return this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Fn extends Ug{constructor(e=1,t=1,i={}){super(e,t,i),this.isWebGLRenderTarget=!0}}class Vu extends fn{constructor(e=null,t=1,i=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:i,depth:s},this.magFilter=Wt,this.minFilter=Wt,this.wrapR=Si,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class Fg extends fn{constructor(e=null,t=1,i=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:i,depth:s},this.magFilter=Wt,this.minFilter=Wt,this.wrapR=Si,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}}class Ot{static{Ot.prototype.isMatrix4=!0}constructor(e,t,i,s,r,a,o,h,l,u,f,d,p,g,v,x){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,i,s,r,a,o,h,l,u,f,d,p,g,v,x)}set(e,t,i,s,r,a,o,h,l,u,f,d,p,g,v,x){const m=this.elements;return m[0]=e,m[4]=t,m[8]=i,m[12]=s,m[1]=r,m[5]=a,m[9]=o,m[13]=h,m[2]=l,m[6]=u,m[10]=f,m[14]=d,m[3]=p,m[7]=g,m[11]=v,m[15]=x,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Ot().fromArray(this.elements)}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],t[9]=i[9],t[10]=i[10],t[11]=i[11],t[12]=i[12],t[13]=i[13],t[14]=i[14],t[15]=i[15],this}copyPosition(e){const t=this.elements,i=e.elements;return t[12]=i[12],t[13]=i[13],t[14]=i[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,i){return this.determinantAffine()===0?(e.set(1,0,0),t.set(0,1,0),i.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this)}makeBasis(e,t,i){return this.set(e.x,t.x,i.x,0,e.y,t.y,i.y,0,e.z,t.z,i.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();const t=this.elements,i=e.elements,s=1/vs.setFromMatrixColumn(e,0).length(),r=1/vs.setFromMatrixColumn(e,1).length(),a=1/vs.setFromMatrixColumn(e,2).length();return t[0]=i[0]*s,t[1]=i[1]*s,t[2]=i[2]*s,t[3]=0,t[4]=i[4]*r,t[5]=i[5]*r,t[6]=i[6]*r,t[7]=0,t[8]=i[8]*a,t[9]=i[9]*a,t[10]=i[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,i=e.x,s=e.y,r=e.z,a=Math.cos(i),o=Math.sin(i),h=Math.cos(s),l=Math.sin(s),u=Math.cos(r),f=Math.sin(r);if(e.order==="XYZ"){const d=a*u,p=a*f,g=o*u,v=o*f;t[0]=h*u,t[4]=-h*f,t[8]=l,t[1]=p+g*l,t[5]=d-v*l,t[9]=-o*h,t[2]=v-d*l,t[6]=g+p*l,t[10]=a*h}else if(e.order==="YXZ"){const d=h*u,p=h*f,g=l*u,v=l*f;t[0]=d+v*o,t[4]=g*o-p,t[8]=a*l,t[1]=a*f,t[5]=a*u,t[9]=-o,t[2]=p*o-g,t[6]=v+d*o,t[10]=a*h}else if(e.order==="ZXY"){const d=h*u,p=h*f,g=l*u,v=l*f;t[0]=d-v*o,t[4]=-a*f,t[8]=g+p*o,t[1]=p+g*o,t[5]=a*u,t[9]=v-d*o,t[2]=-a*l,t[6]=o,t[10]=a*h}else if(e.order==="ZYX"){const d=a*u,p=a*f,g=o*u,v=o*f;t[0]=h*u,t[4]=g*l-p,t[8]=d*l+v,t[1]=h*f,t[5]=v*l+d,t[9]=p*l-g,t[2]=-l,t[6]=o*h,t[10]=a*h}else if(e.order==="YZX"){const d=a*h,p=a*l,g=o*h,v=o*l;t[0]=h*u,t[4]=v-d*f,t[8]=g*f+p,t[1]=f,t[5]=a*u,t[9]=-o*u,t[2]=-l*u,t[6]=p*f+g,t[10]=d-v*f}else if(e.order==="XZY"){const d=a*h,p=a*l,g=o*h,v=o*l;t[0]=h*u,t[4]=-f,t[8]=l*u,t[1]=d*f+v,t[5]=a*u,t[9]=p*f-g,t[2]=g*f-p,t[6]=o*u,t[10]=v*f+d}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Bg,e,kg)}lookAt(e,t,i){const s=this.elements;return wn.subVectors(e,t),wn.lengthSq()===0&&(wn.z=1),wn.normalize(),Li.crossVectors(i,wn),Li.lengthSq()===0&&(Math.abs(i.z)===1?wn.x+=1e-4:wn.z+=1e-4,wn.normalize(),Li.crossVectors(i,wn)),Li.normalize(),Ir.crossVectors(wn,Li),s[0]=Li.x,s[4]=Ir.x,s[8]=wn.x,s[1]=Li.y,s[5]=Ir.y,s[9]=wn.y,s[2]=Li.z,s[6]=Ir.z,s[10]=wn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,s=t.elements,r=this.elements,a=i[0],o=i[4],h=i[8],l=i[12],u=i[1],f=i[5],d=i[9],p=i[13],g=i[2],v=i[6],x=i[10],m=i[14],M=i[3],S=i[7],b=i[11],A=i[15],w=s[0],L=s[4],_=s[8],E=s[12],P=s[1],T=s[5],D=s[9],U=s[13],N=s[2],F=s[6],H=s[10],W=s[14],te=s[3],K=s[7],B=s[11],I=s[15];return r[0]=a*w+o*P+h*N+l*te,r[4]=a*L+o*T+h*F+l*K,r[8]=a*_+o*D+h*H+l*B,r[12]=a*E+o*U+h*W+l*I,r[1]=u*w+f*P+d*N+p*te,r[5]=u*L+f*T+d*F+p*K,r[9]=u*_+f*D+d*H+p*B,r[13]=u*E+f*U+d*W+p*I,r[2]=g*w+v*P+x*N+m*te,r[6]=g*L+v*T+x*F+m*K,r[10]=g*_+v*D+x*H+m*B,r[14]=g*E+v*U+x*W+m*I,r[3]=M*w+S*P+b*N+A*te,r[7]=M*L+S*T+b*F+A*K,r[11]=M*_+S*D+b*H+A*B,r[15]=M*E+S*U+b*W+A*I,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[4],s=e[8],r=e[12],a=e[1],o=e[5],h=e[9],l=e[13],u=e[2],f=e[6],d=e[10],p=e[14],g=e[3],v=e[7],x=e[11],m=e[15],M=h*p-l*d,S=o*p-l*f,b=o*d-h*f,A=a*p-l*u,w=a*d-h*u,L=a*f-o*u;return t*(v*M-x*S+m*b)-i*(g*M-x*A+m*w)+s*(g*S-v*A+m*L)-r*(g*b-v*w+x*L)}determinantAffine(){const e=this.elements,t=e[0],i=e[4],s=e[8],r=e[1],a=e[5],o=e[9],h=e[2],l=e[6],u=e[10];return t*(a*u-o*l)-i*(r*u-o*h)+s*(r*l-a*h)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,i){const s=this.elements;return e.isVector3?(s[12]=e.x,s[13]=e.y,s[14]=e.z):(s[12]=e,s[13]=t,s[14]=i),this}invert(){const e=this.elements,t=e[0],i=e[1],s=e[2],r=e[3],a=e[4],o=e[5],h=e[6],l=e[7],u=e[8],f=e[9],d=e[10],p=e[11],g=e[12],v=e[13],x=e[14],m=e[15],M=t*o-i*a,S=t*h-s*a,b=t*l-r*a,A=i*h-s*o,w=i*l-r*o,L=s*l-r*h,_=u*v-f*g,E=u*x-d*g,P=u*m-p*g,T=f*x-d*v,D=f*m-p*v,U=d*m-p*x,N=M*U-S*D+b*T+A*P-w*E+L*_;if(N===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const F=1/N;return e[0]=(o*U-h*D+l*T)*F,e[1]=(s*D-i*U-r*T)*F,e[2]=(v*L-x*w+m*A)*F,e[3]=(d*w-f*L-p*A)*F,e[4]=(h*P-a*U-l*E)*F,e[5]=(t*U-s*P+r*E)*F,e[6]=(x*b-g*L-m*S)*F,e[7]=(u*L-d*b+p*S)*F,e[8]=(a*D-o*P+l*_)*F,e[9]=(i*P-t*D-r*_)*F,e[10]=(g*w-v*b+m*M)*F,e[11]=(f*b-u*w-p*M)*F,e[12]=(o*E-a*T-h*_)*F,e[13]=(t*T-i*E+s*_)*F,e[14]=(v*S-g*A-x*M)*F,e[15]=(u*A-f*S+d*M)*F,this}scale(e){const t=this.elements,i=e.x,s=e.y,r=e.z;return t[0]*=i,t[4]*=s,t[8]*=r,t[1]*=i,t[5]*=s,t[9]*=r,t[2]*=i,t[6]*=s,t[10]*=r,t[3]*=i,t[7]*=s,t[11]*=r,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],s=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,i,s))}makeTranslation(e,t,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,i,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,t,-i,0,0,i,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,0,i,0,0,1,0,0,-i,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,0,i,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const i=Math.cos(t),s=Math.sin(t),r=1-i,a=e.x,o=e.y,h=e.z,l=r*a,u=r*o;return this.set(l*a+i,l*o-s*h,l*h+s*o,0,l*o+s*h,u*o+i,u*h-s*a,0,l*h-s*o,u*h+s*a,r*h*h+i,0,0,0,0,1),this}makeScale(e,t,i){return this.set(e,0,0,0,0,t,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,t,i,s,r,a){return this.set(1,i,r,0,e,1,a,0,t,s,1,0,0,0,0,1),this}compose(e,t,i){const s=this.elements,r=t._x,a=t._y,o=t._z,h=t._w,l=r+r,u=a+a,f=o+o,d=r*l,p=r*u,g=r*f,v=a*u,x=a*f,m=o*f,M=h*l,S=h*u,b=h*f,A=i.x,w=i.y,L=i.z;return s[0]=(1-(v+m))*A,s[1]=(p+b)*A,s[2]=(g-S)*A,s[3]=0,s[4]=(p-b)*w,s[5]=(1-(d+m))*w,s[6]=(x+M)*w,s[7]=0,s[8]=(g+S)*L,s[9]=(x-M)*L,s[10]=(1-(d+v))*L,s[11]=0,s[12]=e.x,s[13]=e.y,s[14]=e.z,s[15]=1,this}decompose(e,t,i){const s=this.elements;e.x=s[12],e.y=s[13],e.z=s[14];const r=this.determinantAffine();if(r===0)return i.set(1,1,1),t.identity(),this;let a=vs.set(s[0],s[1],s[2]).length();const o=vs.set(s[4],s[5],s[6]).length(),h=vs.set(s[8],s[9],s[10]).length();r<0&&(a=-a),zn.copy(this);const l=1/a,u=1/o,f=1/h;return zn.elements[0]*=l,zn.elements[1]*=l,zn.elements[2]*=l,zn.elements[4]*=u,zn.elements[5]*=u,zn.elements[6]*=u,zn.elements[8]*=f,zn.elements[9]*=f,zn.elements[10]*=f,t.setFromRotationMatrix(zn),i.x=a,i.y=o,i.z=h,this}makePerspective(e,t,i,s,r,a,o=li,h=!1){const l=this.elements,u=2*r/(t-e),f=2*r/(i-s),d=(t+e)/(t-e),p=(i+s)/(i-s);let g,v;if(h)g=r/(a-r),v=a*r/(a-r);else if(o===li)g=-(a+r)/(a-r),v=-2*a*r/(a-r);else if(o===Ta)g=-a/(a-r),v=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return l[0]=u,l[4]=0,l[8]=d,l[12]=0,l[1]=0,l[5]=f,l[9]=p,l[13]=0,l[2]=0,l[6]=0,l[10]=g,l[14]=v,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,i,s,r,a,o=li,h=!1){const l=this.elements,u=2/(t-e),f=2/(i-s),d=-(t+e)/(t-e),p=-(i+s)/(i-s);let g,v;if(h)g=1/(a-r),v=a/(a-r);else if(o===li)g=-2/(a-r),v=-(a+r)/(a-r);else if(o===Ta)g=-1/(a-r),v=-r/(a-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return l[0]=u,l[4]=0,l[8]=0,l[12]=d,l[1]=0,l[5]=f,l[9]=0,l[13]=p,l[2]=0,l[6]=0,l[10]=g,l[14]=v,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){const t=this.elements,i=e.elements;for(let s=0;s<16;s++)if(t[s]!==i[s])return!1;return!0}fromArray(e,t=0){for(let i=0;i<16;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e[t+9]=i[9],e[t+10]=i[10],e[t+11]=i[11],e[t+12]=i[12],e[t+13]=i[13],e[t+14]=i[14],e[t+15]=i[15],e}}const vs=new X,zn=new Ot,Bg=new X(0,0,0),kg=new X(1,1,1),Li=new X,Ir=new X,wn=new X,Jc=new Ot,Qc=new qs;class fs{constructor(e=0,t=0,i=0,s=fs.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=i,this._order=s}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,i,s=this._order){return this._x=e,this._y=t,this._z=i,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,i=!0){const s=e.elements,r=s[0],a=s[4],o=s[8],h=s[1],l=s[5],u=s[9],f=s[2],d=s[6],p=s[10];switch(t){case"XYZ":this._y=Math.asin(rt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-u,p),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(d,l),this._z=0);break;case"YXZ":this._x=Math.asin(-rt(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(o,p),this._z=Math.atan2(h,l)):(this._y=Math.atan2(-f,r),this._z=0);break;case"ZXY":this._x=Math.asin(rt(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-f,p),this._z=Math.atan2(-a,l)):(this._y=0,this._z=Math.atan2(h,r));break;case"ZYX":this._y=Math.asin(-rt(f,-1,1)),Math.abs(f)<.9999999?(this._x=Math.atan2(d,p),this._z=Math.atan2(h,r)):(this._x=0,this._z=Math.atan2(-a,l));break;case"YZX":this._z=Math.asin(rt(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(-u,l),this._y=Math.atan2(-f,r)):(this._x=0,this._y=Math.atan2(o,p));break;case"XZY":this._z=Math.asin(-rt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(d,l),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-u,p),this._y=0);break;default:He("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,i){return Jc.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Jc,t,i)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Qc.setFromEuler(this),this.setFromQuaternion(Qc,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}fs.DEFAULT_ORDER="XYZ";class Yu{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let zg=0;const jc=new X,Ms=new qs,mi=new Ot,Nr=new X,ir=new X,Gg=new X,Hg=new qs,eh=new X(1,0,0),th=new X(0,1,0),nh=new X(0,0,1),ih={type:"added"},Wg={type:"removed"},_s={type:"childadded",child:null},fo={type:"childremoved",child:null};class vn extends ps{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:zg++}),this.uuid=yr(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=vn.DEFAULT_UP.clone();const e=new X,t=new fs,i=new qs,s=new X(1,1,1);function r(){i.setFromEuler(t,!1)}function a(){t.setFromQuaternion(i,void 0,!1)}t._onChange(r),i._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new Ot},normalMatrix:{value:new Ye}}),this.matrix=new Ot,this.matrixWorld=new Ot,this.matrixAutoUpdate=vn.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=vn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Yu,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Ms.setFromAxisAngle(e,t),this.quaternion.multiply(Ms),this}rotateOnWorldAxis(e,t){return Ms.setFromAxisAngle(e,t),this.quaternion.premultiply(Ms),this}rotateX(e){return this.rotateOnAxis(eh,e)}rotateY(e){return this.rotateOnAxis(th,e)}rotateZ(e){return this.rotateOnAxis(nh,e)}translateOnAxis(e,t){return jc.copy(e).applyQuaternion(this.quaternion),this.position.add(jc.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(eh,e)}translateY(e){return this.translateOnAxis(th,e)}translateZ(e){return this.translateOnAxis(nh,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(mi.copy(this.matrixWorld).invert())}lookAt(e,t,i){e.isVector3?Nr.copy(e):Nr.set(e,t,i);const s=this.parent;this.updateWorldMatrix(!0,!1),ir.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?mi.lookAt(ir,Nr,this.up):mi.lookAt(Nr,ir,this.up),this.quaternion.setFromRotationMatrix(mi),s&&(mi.extractRotation(s.matrixWorld),Ms.setFromRotationMatrix(mi),this.quaternion.premultiply(Ms.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(ct("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(ih),_s.child=e,this.dispatchEvent(_s),_s.child=null):ct("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Wg),fo.child=e,this.dispatchEvent(fo),fo.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),mi.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),mi.multiply(e.parent.matrixWorld)),e.applyMatrix4(mi),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(ih),_s.child=e,this.dispatchEvent(_s),_s.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let i=0,s=this.children.length;i<s;i++){const a=this.children[i].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,i=[]){this[e]===t&&i.push(this);const s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].getObjectsByProperty(e,t,i);return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ir,e,Gg),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ir,Hg,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}intersectsFrustum(){}traverse(e){e(this);const t=this.children;for(let i=0,s=t.length;i<s;i++)t[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let i=0,s=t.length;i<s;i++)t[i].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);const e=this.pivot;if(e!==null){const t=e.x,i=e.y,s=e.z,r=this.matrix.elements;r[12]+=t-r[0]*t-r[4]*i-r[8]*s,r[13]+=i-r[1]*t-r[5]*i-r[9]*s,r[14]+=s-r[2]*t-r[6]*i-r[10]*s}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let i=0,s=t.length;i<s;i++)t[i].updateMatrixWorld(e)}updateWorldMatrix(e,t,i=!1){const s=this.parent;if(e===!0&&s!==null&&s.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||i)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,i=!0),t===!0){const r=this.children;for(let a=0,o=r.length;a<o;a++)r[a].updateWorldMatrix(!1,!0,i)}}toJSON(e){const t=e===void 0||typeof e=="string",i={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,s.name=this.name,s.castShadow=this.castShadow,s.receiveShadow=this.receiveShadow,s.visible=this.visible,s.frustumCulled=this.frustumCulled,s.renderOrder=this.renderOrder,s.static=this.static,s.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.pivot!==null&&(s.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(s.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(s.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(o=>({...o})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(e),s.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(o,h){return o[h.uuid]===void 0&&(o[h.uuid]=h.toJSON(e)),h.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(e.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const h=o.shapes;if(Array.isArray(h))for(let l=0,u=h.length;l<u;l++){const f=h[l];r(e.shapes,f)}else r(e.shapes,h)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let h=0,l=this.material.length;h<l;h++)o.push(r(e.materials,this.material[h]));s.material=o}else s.material=r(e.materials,this.material);if(this.children.length>0){s.children=[];for(let o=0;o<this.children.length;o++)s.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){s.animations=[];for(let o=0;o<this.animations.length;o++){const h=this.animations[o];s.animations.push(r(e.animations,h))}}if(t){const o=a(e.geometries),h=a(e.materials),l=a(e.textures),u=a(e.images),f=a(e.shapes),d=a(e.skeletons),p=a(e.animations),g=a(e.nodes);o.length>0&&(i.geometries=o),h.length>0&&(i.materials=h),l.length>0&&(i.textures=l),u.length>0&&(i.images=u),f.length>0&&(i.shapes=f),d.length>0&&(i.skeletons=d),p.length>0&&(i.animations=p),g.length>0&&(i.nodes=g)}return i.object=s,i;function a(o){const h=[];for(const l in o){const u=o[l];delete u.metadata,h.push(u)}return h}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot!==null?e.pivot.clone():null,this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let i=0;i<e.children.length;i++){const s=e.children[i];this.add(s.clone())}return this}dispose(){this.dispatchEvent({type:"dispose"})}}vn.DEFAULT_UP=new X(0,1,0);vn.DEFAULT_MATRIX_AUTO_UPDATE=!0;vn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class fr extends vn{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Vg={type:"move"};class po{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new fr,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new fr,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new X,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new X),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new fr,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new X,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new X,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const i of e.hand.values())this._getHandJoint(t,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,i){let s=null,r=null,a=null;const o=this._targetRay,h=this._grip,l=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(l&&e.hand){a=!0;for(const v of e.hand.values()){const x=t.getJointPose(v,i),m=this._getHandJoint(l,v);x!==null&&(m.matrix.fromArray(x.transform.matrix),m.matrix.decompose(m.position,m.rotation,m.scale),m.matrixWorldNeedsUpdate=!0,m.jointRadius=x.radius),m.visible=x!==null}const u=l.joints["index-finger-tip"],f=l.joints["thumb-tip"],d=u.position.distanceTo(f.position),p=.02,g=.005;l.inputState.pinching&&d>p+g?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!l.inputState.pinching&&d<=p-g&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else h!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,i),r!==null&&(h.matrix.fromArray(r.transform.matrix),h.matrix.decompose(h.position,h.rotation,h.scale),h.matrixWorldNeedsUpdate=!0,r.linearVelocity?(h.hasLinearVelocity=!0,h.linearVelocity.copy(r.linearVelocity)):h.hasLinearVelocity=!1,r.angularVelocity?(h.hasAngularVelocity=!0,h.angularVelocity.copy(r.angularVelocity)):h.hasAngularVelocity=!1,h.eventsEnabled&&h.dispatchEvent({type:"gripUpdated",data:e,target:this})));o!==null&&(s=t.getPose(e.targetRaySpace,i),s===null&&r!==null&&(s=r),s!==null&&(o.matrix.fromArray(s.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,s.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(s.linearVelocity)):o.hasLinearVelocity=!1,s.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(s.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(Vg)))}return o!==null&&(o.visible=s!==null),h!==null&&(h.visible=r!==null),l!==null&&(l.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const i=new fr;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[t.jointName]=i,e.add(i)}return e.joints[t.jointName]}}const Xu={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Pi={h:0,s:0,l:0},Or={h:0,s:0,l:0};function mo(n,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?n+(e-n)*6*t:t<1/2?e:t<2/3?n+(e-n)*6*(2/3-t):n}class tt{constructor(e,t,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,i)}set(e,t,i){if(t===void 0&&i===void 0){const s=e;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(e,t,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=On){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,st.colorSpaceToWorking(this,t),this}setRGB(e,t,i,s=st.workingColorSpace){return this.r=e,this.g=t,this.b=i,st.colorSpaceToWorking(this,s),this}setHSL(e,t,i,s=st.workingColorSpace){if(e=Pg(e,1),t=rt(t,0,1),i=rt(i,0,1),t===0)this.r=this.g=this.b=i;else{const r=i<=.5?i*(1+t):i+t-i*t,a=2*i-r;this.r=mo(a,r,e+1/3),this.g=mo(a,r,e),this.b=mo(a,r,e-1/3)}return st.colorSpaceToWorking(this,s),this}setStyle(e,t=On){function i(r){r!==void 0&&parseFloat(r)<1&&He("Color: Alpha component of "+e+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(e)){let r;const a=s[1],o=s[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:He("Color: Unknown color model "+e)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(e)){const r=s[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(r,16),t);He("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=On){const i=Xu[e.toLowerCase()];return i!==void 0?this.setHex(i,t):He("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=wi(e.r),this.g=wi(e.g),this.b=wi(e.b),this}copyLinearToSRGB(e){return this.r=zs(e.r),this.g=zs(e.g),this.b=zs(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=On){return st.workingToColorSpace(un.copy(this),e),Math.round(rt(un.r*255,0,255))*65536+Math.round(rt(un.g*255,0,255))*256+Math.round(rt(un.b*255,0,255))}getHexString(e=On){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=st.workingColorSpace){st.workingToColorSpace(un.copy(this),t);const i=un.r,s=un.g,r=un.b,a=Math.max(i,s,r),o=Math.min(i,s,r);let h,l;const u=(o+a)/2;if(o===a)h=0,l=0;else{const f=a-o;switch(l=u<=.5?f/(a+o):f/(2-a-o),a){case i:h=(s-r)/f+(s<r?6:0);break;case s:h=(r-i)/f+2;break;case r:h=(i-s)/f+4;break}h/=6}return e.h=h,e.s=l,e.l=u,e}getRGB(e,t=st.workingColorSpace){return st.workingToColorSpace(un.copy(this),t),e.r=un.r,e.g=un.g,e.b=un.b,e}getStyle(e=On){st.workingToColorSpace(un.copy(this),e);const t=un.r,i=un.g,s=un.b;return e!==On?`color(${e} ${t.toFixed(3)} ${i.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(i*255)},${Math.round(s*255)})`}offsetHSL(e,t,i){return this.getHSL(Pi),this.setHSL(Pi.h+e,Pi.s+t,Pi.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,i){return this.r=e.r+(t.r-e.r)*i,this.g=e.g+(t.g-e.g)*i,this.b=e.b+(t.b-e.b)*i,this}lerpHSL(e,t){this.getHSL(Pi),e.getHSL(Or);const i=oo(Pi.h,Or.h,t),s=oo(Pi.s,Or.s,t),r=oo(Pi.l,Or.l,t);return this.setHSL(i,s,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,i=this.g,s=this.b,r=e.elements;return this.r=r[0]*t+r[3]*i+r[6]*s,this.g=r[1]*t+r[4]*i+r[7]*s,this.b=r[2]*t+r[5]*i+r[8]*s,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const un=new tt;tt.NAMES=Xu;class sh extends vn{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new fs,this.environmentIntensity=1,this.environmentRotation=new fs,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),t.object.backgroundBlurriness=this.backgroundBlurriness,t.object.backgroundIntensity=this.backgroundIntensity,t.object.backgroundRotation=this.backgroundRotation.toArray(),t.object.environmentIntensity=this.environmentIntensity,t.object.environmentRotation=this.environmentRotation.toArray(),t}}const Gn=new X,gi=new X,go=new X,xi=new X,bs=new X,Ss=new X,rh=new X,xo=new X,vo=new X,Mo=new X,_o=new it,bo=new it,So=new it;class Xn{constructor(e=new X,t=new X,i=new X){this.a=e,this.b=t,this.c=i}static getNormal(e,t,i,s){s.subVectors(i,t),Gn.subVectors(e,t),s.cross(Gn);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(e,t,i,s,r){Gn.subVectors(s,t),gi.subVectors(i,t),go.subVectors(e,t);const a=Gn.dot(Gn),o=Gn.dot(gi),h=Gn.dot(go),l=gi.dot(gi),u=gi.dot(go),f=a*l-o*o;if(f===0)return r.set(0,0,0),null;const d=1/f,p=(l*h-o*u)*d,g=(a*u-o*h)*d;return r.set(1-p-g,g,p)}static containsPoint(e,t,i,s){return this.getBarycoord(e,t,i,s,xi)===null?!1:xi.x>=0&&xi.y>=0&&xi.x+xi.y<=1}static getInterpolation(e,t,i,s,r,a,o,h){return this.getBarycoord(e,t,i,s,xi)===null?(h.x=0,h.y=0,"z"in h&&(h.z=0),"w"in h&&(h.w=0),null):(h.setScalar(0),h.addScaledVector(r,xi.x),h.addScaledVector(a,xi.y),h.addScaledVector(o,xi.z),h)}static getInterpolatedAttribute(e,t,i,s,r,a){return _o.setScalar(0),bo.setScalar(0),So.setScalar(0),_o.fromBufferAttribute(e,t),bo.fromBufferAttribute(e,i),So.fromBufferAttribute(e,s),a.setScalar(0),a.addScaledVector(_o,r.x),a.addScaledVector(bo,r.y),a.addScaledVector(So,r.z),a}static isFrontFacing(e,t,i,s){return Gn.subVectors(i,t),gi.subVectors(e,t),Gn.cross(gi).dot(s)<0}set(e,t,i){return this.a.copy(e),this.b.copy(t),this.c.copy(i),this}setFromPointsAndIndices(e,t,i,s){return this.a.copy(e[t]),this.b.copy(e[i]),this.c.copy(e[s]),this}setFromAttributeAndIndices(e,t,i,s){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,s),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Gn.subVectors(this.c,this.b),gi.subVectors(this.a,this.b),Gn.cross(gi).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return Xn.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return Xn.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,i,s,r){return Xn.getInterpolation(e,this.a,this.b,this.c,t,i,s,r)}containsPoint(e){return Xn.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return Xn.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const i=this.a,s=this.b,r=this.c;let a,o;bs.subVectors(s,i),Ss.subVectors(r,i),xo.subVectors(e,i);const h=bs.dot(xo),l=Ss.dot(xo);if(h<=0&&l<=0)return t.copy(i);vo.subVectors(e,s);const u=bs.dot(vo),f=Ss.dot(vo);if(u>=0&&f<=u)return t.copy(s);const d=h*f-u*l;if(d<=0&&h>=0&&u<=0)return a=h/(h-u),t.copy(i).addScaledVector(bs,a);Mo.subVectors(e,r);const p=bs.dot(Mo),g=Ss.dot(Mo);if(g>=0&&p<=g)return t.copy(r);const v=p*l-h*g;if(v<=0&&l>=0&&g<=0)return o=l/(l-g),t.copy(i).addScaledVector(Ss,o);const x=u*g-p*f;if(x<=0&&f-u>=0&&p-g>=0)return rh.subVectors(r,s),o=(f-u)/(f-u+(p-g)),t.copy(s).addScaledVector(rh,o);const m=1/(x+v+d);return a=v*m,o=d*m,t.copy(i).addScaledVector(bs,a).addScaledVector(Ss,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}class $s{constructor(e=new X(1/0,1/0,1/0),t=new X(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t+=3)this.expandByPoint(Hn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,i=e.count;t<i;t++)this.expandByPoint(Hn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const i=Hn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const i=e.geometry;if(i!==void 0){const r=i.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,Hn):Hn.fromBufferAttribute(r,a),Hn.applyMatrix4(e.matrixWorld),this.expandByPoint(Hn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Ur.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),Ur.copy(i.boundingBox)),Ur.applyMatrix4(e.matrixWorld),this.union(Ur)}const s=e.children;for(let r=0,a=s.length;r<a;r++)this.expandByObject(s[r],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Hn),Hn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,i;return e.normal.x>0?(t=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),t<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(sr),Fr.subVectors(this.max,sr),ys.subVectors(e.a,sr),ws.subVectors(e.b,sr),Es.subVectors(e.c,sr),Di.subVectors(ws,ys),Ii.subVectors(Es,ws),$i.subVectors(ys,Es);let t=[0,-Di.z,Di.y,0,-Ii.z,Ii.y,0,-$i.z,$i.y,Di.z,0,-Di.x,Ii.z,0,-Ii.x,$i.z,0,-$i.x,-Di.y,Di.x,0,-Ii.y,Ii.x,0,-$i.y,$i.x,0];return!yo(t,ys,ws,Es,Fr)||(t=[1,0,0,0,1,0,0,0,1],!yo(t,ys,ws,Es,Fr))?!1:(Br.crossVectors(Di,Ii),t=[Br.x,Br.y,Br.z],yo(t,ys,ws,Es,Fr))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Hn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Hn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(vi[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),vi[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),vi[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),vi[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),vi[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),vi[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),vi[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),vi[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(vi),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const vi=[new X,new X,new X,new X,new X,new X,new X,new X],Hn=new X,Ur=new $s,ys=new X,ws=new X,Es=new X,Di=new X,Ii=new X,$i=new X,sr=new X,Fr=new X,Br=new X,Zi=new X;function yo(n,e,t,i,s){for(let r=0,a=n.length-3;r<=a;r+=3){Zi.fromArray(n,r);const o=s.x*Math.abs(Zi.x)+s.y*Math.abs(Zi.y)+s.z*Math.abs(Zi.z),h=e.dot(Zi),l=t.dot(Zi),u=i.dot(Zi);if(Math.max(-Math.max(h,l,u),Math.min(h,l,u))>o)return!1}return!0}const Xt=new X,kr=new We;let Yg=0;class Pn extends ps{constructor(e,t,i=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Yg++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=i,this.usage=Ag,this.updateRanges=[],this.gpuType=oi,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,i){e*=this.itemSize,i*=t.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[e+s]=t.array[i+s];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,i=this.count;t<i;t++)kr.fromBufferAttribute(this,t),kr.applyMatrix3(e),this.setXY(t,kr.x,kr.y);else if(this.itemSize===3)for(let t=0,i=this.count;t<i;t++)Xt.fromBufferAttribute(this,t),Xt.applyMatrix3(e),this.setXYZ(t,Xt.x,Xt.y,Xt.z);return this}applyMatrix4(e){for(let t=0,i=this.count;t<i;t++)Xt.fromBufferAttribute(this,t),Xt.applyMatrix4(e),this.setXYZ(t,Xt.x,Xt.y,Xt.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)Xt.fromBufferAttribute(this,t),Xt.applyNormalMatrix(e),this.setXYZ(t,Xt.x,Xt.y,Xt.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)Xt.fromBufferAttribute(this,t),Xt.transformDirection(e),this.setXYZ(t,Xt.x,Xt.y,Xt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let i=this.array[e*this.itemSize+t];return this.normalized&&(i=nr(i,this.array)),i}setComponent(e,t,i){return this.normalized&&(i=_n(i,this.array)),this.array[e*this.itemSize+t]=i,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=nr(t,this.array)),t}setX(e,t){return this.normalized&&(t=_n(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=nr(t,this.array)),t}setY(e,t){return this.normalized&&(t=_n(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=nr(t,this.array)),t}setZ(e,t){return this.normalized&&(t=_n(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=nr(t,this.array)),t}setW(e,t){return this.normalized&&(t=_n(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,i){return e*=this.itemSize,this.normalized&&(t=_n(t,this.array),i=_n(i,this.array)),this.array[e+0]=t,this.array[e+1]=i,this}setXYZ(e,t,i,s){return e*=this.itemSize,this.normalized&&(t=_n(t,this.array),i=_n(i,this.array),s=_n(s,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=s,this}setXYZW(e,t,i,s,r){return e*=this.itemSize,this.normalized&&(t=_n(t,this.array),i=_n(i,this.array),s=_n(s,this.array),r=_n(r,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=s,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return e.name=this.name,e.usage=this.usage,e.gpuType=this.gpuType,e}dispose(){this.dispatchEvent({type:"dispose"})}}class Ku extends Pn{constructor(e,t,i){super(new Uint16Array(e),t,i)}}class qu extends Pn{constructor(e,t,i){super(new Uint32Array(e),t,i)}}class Nt extends Pn{constructor(e,t,i){super(new Float32Array(e),t,i)}}const Xg=new $s,rr=new X,wo=new X;class wr{constructor(e=new X,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const i=this.center;t!==void 0?i.copy(t):Xg.setFromPoints(e).getCenter(i);let s=0;for(let r=0,a=e.length;r<a;r++)s=Math.max(s,i.distanceToSquared(e[r]));return this.radius=Math.sqrt(s),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const i=this.center.distanceToSquared(e);return t.copy(e),i>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;rr.subVectors(e,this.center);const t=rr.lengthSq();if(t>this.radius*this.radius){const i=Math.sqrt(t),s=(i-this.radius)*.5;this.center.addScaledVector(rr,s/i),this.radius+=s}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(wo.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(rr.copy(e.center).add(wo)),this.expandByPoint(rr.copy(e.center).sub(wo))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}let Kg=0;const Nn=new Ot,Eo=new vn,As=new X,En=new $s,ar=new $s,sn=new X;class jt extends ps{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Kg++}),this.uuid=yr(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Tg(e)?qu:Ku)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,i=0){this.groups.push({start:e,count:t,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const r=new Ye().getNormalMatrix(e);i.applyNormalMatrix(r),i.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(e),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return Nn.makeRotationFromQuaternion(e),this.applyMatrix4(Nn),this}rotateX(e){return Nn.makeRotationX(e),this.applyMatrix4(Nn),this}rotateY(e){return Nn.makeRotationY(e),this.applyMatrix4(Nn),this}rotateZ(e){return Nn.makeRotationZ(e),this.applyMatrix4(Nn),this}translate(e,t,i){return Nn.makeTranslation(e,t,i),this.applyMatrix4(Nn),this}scale(e,t,i){return Nn.makeScale(e,t,i),this.applyMatrix4(Nn),this}lookAt(e){return Eo.lookAt(e),Eo.updateMatrix(),this.applyMatrix4(Eo.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(As).negate(),this.translate(As.x,As.y,As.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const i=[];for(let s=0,r=e.length;s<r;s++){const a=e[s];i.push(a.x,a.y,a.z||0)}this.setAttribute("position",new Nt(i,3))}else{const i=Math.min(e.length,t.count);for(let s=0;s<i;s++){const r=e[s];t.setXYZ(s,r.x,r.y,r.z||0)}e.length>t.count&&He("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new $s);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){ct("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new X(-1/0,-1/0,-1/0),new X(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let i=0,s=t.length;i<s;i++){const r=t[i];En.setFromBufferAttribute(r),this.morphTargetsRelative?(sn.addVectors(this.boundingBox.min,En.min),this.boundingBox.expandByPoint(sn),sn.addVectors(this.boundingBox.max,En.max),this.boundingBox.expandByPoint(sn)):(this.boundingBox.expandByPoint(En.min),this.boundingBox.expandByPoint(En.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&ct('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new wr);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){ct("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new X,1/0);return}if(e){const i=this.boundingSphere.center;if(En.setFromBufferAttribute(e),t)for(let r=0,a=t.length;r<a;r++){const o=t[r];ar.setFromBufferAttribute(o),this.morphTargetsRelative?(sn.addVectors(En.min,ar.min),En.expandByPoint(sn),sn.addVectors(En.max,ar.max),En.expandByPoint(sn)):(En.expandByPoint(ar.min),En.expandByPoint(ar.max))}En.getCenter(i);let s=0;for(let r=0,a=e.count;r<a;r++)sn.fromBufferAttribute(e,r),s=Math.max(s,i.distanceToSquared(sn));if(t)for(let r=0,a=t.length;r<a;r++){const o=t[r],h=this.morphTargetsRelative;for(let l=0,u=o.count;l<u;l++)sn.fromBufferAttribute(o,l),h&&(As.fromBufferAttribute(e,l),sn.add(As)),s=Math.max(s,i.distanceToSquared(sn))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&ct('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){ct("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=t.position,s=t.normal,r=t.uv;let a=this.getAttribute("tangent");(a===void 0||a.count!==i.count)&&(a=new Pn(new Float32Array(4*i.count),4),this.setAttribute("tangent",a));const o=[],h=[];for(let _=0;_<i.count;_++)o[_]=new X,h[_]=new X;const l=new X,u=new X,f=new X,d=new We,p=new We,g=new We,v=new X,x=new X;function m(_,E,P){l.fromBufferAttribute(i,_),u.fromBufferAttribute(i,E),f.fromBufferAttribute(i,P),d.fromBufferAttribute(r,_),p.fromBufferAttribute(r,E),g.fromBufferAttribute(r,P),u.sub(l),f.sub(l),p.sub(d),g.sub(d);const T=1/(p.x*g.y-g.x*p.y);isFinite(T)&&(v.copy(u).multiplyScalar(g.y).addScaledVector(f,-p.y).multiplyScalar(T),x.copy(f).multiplyScalar(p.x).addScaledVector(u,-g.x).multiplyScalar(T),o[_].add(v),o[E].add(v),o[P].add(v),h[_].add(x),h[E].add(x),h[P].add(x))}let M=this.groups;M.length===0&&(M=[{start:0,count:e.count}]);for(let _=0,E=M.length;_<E;++_){const P=M[_],T=P.start,D=P.count;for(let U=T,N=T+D;U<N;U+=3)m(e.getX(U+0),e.getX(U+1),e.getX(U+2))}const S=new X,b=new X,A=new X,w=new X;function L(_){A.fromBufferAttribute(s,_),w.copy(A);const E=o[_];S.copy(E),S.sub(A.multiplyScalar(A.dot(E))).normalize(),b.crossVectors(w,E);const T=b.dot(h[_])<0?-1:1;a.setXYZW(_,S.x,S.y,S.z,T)}for(let _=0,E=M.length;_<E;++_){const P=M[_],T=P.start,D=P.count;for(let U=T,N=T+D;U<N;U+=3)L(e.getX(U+0)),L(e.getX(U+1)),L(e.getX(U+2))}this._transformed=!0}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let i=this.getAttribute("normal");if(i===void 0||i.count!==t.count)i=new Pn(new Float32Array(t.count*3),3),this.setAttribute("normal",i);else for(let d=0,p=i.count;d<p;d++)i.setXYZ(d,0,0,0);const s=new X,r=new X,a=new X,o=new X,h=new X,l=new X,u=new X,f=new X;if(e)for(let d=0,p=e.count;d<p;d+=3){const g=e.getX(d+0),v=e.getX(d+1),x=e.getX(d+2);s.fromBufferAttribute(t,g),r.fromBufferAttribute(t,v),a.fromBufferAttribute(t,x),u.subVectors(a,r),f.subVectors(s,r),u.cross(f),o.fromBufferAttribute(i,g),h.fromBufferAttribute(i,v),l.fromBufferAttribute(i,x),o.add(u),h.add(u),l.add(u),i.setXYZ(g,o.x,o.y,o.z),i.setXYZ(v,h.x,h.y,h.z),i.setXYZ(x,l.x,l.y,l.z)}else for(let d=0,p=t.count;d<p;d+=3)s.fromBufferAttribute(t,d+0),r.fromBufferAttribute(t,d+1),a.fromBufferAttribute(t,d+2),u.subVectors(a,r),f.subVectors(s,r),u.cross(f),i.setXYZ(d+0,u.x,u.y,u.z),i.setXYZ(d+1,u.x,u.y,u.z),i.setXYZ(d+2,u.x,u.y,u.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,i=e.count;t<i;t++)sn.fromBufferAttribute(e,t),sn.normalize(),e.setXYZ(t,sn.x,sn.y,sn.z)}toNonIndexed(){function e(o,h){const l=o.array,u=o.itemSize,f=o.normalized,d=new l.constructor(h.length*u);let p=0,g=0;for(let v=0,x=h.length;v<x;v++){o.isInterleavedBufferAttribute?p=h[v]*o.data.stride+o.offset:p=h[v]*u;for(let m=0;m<u;m++)d[g++]=l[p++]}return new Pn(d,u,f)}if(this.index===null)return He("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new jt,i=this.index.array,s=this.attributes;for(const o in s){const h=s[o],l=e(h,i);t.setAttribute(o,l)}const r=this.morphAttributes;for(const o in r){const h=[],l=r[o];for(let u=0,f=l.length;u<f;u++){const d=l[u],p=e(d,i);h.push(p)}t.morphAttributes[o]=h}t.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,h=a.length;o<h;o++){const l=a[o];t.addGroup(l.start,l.count,l.materialIndex)}return t}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,e.name=this.name,Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){const h=this.parameters;for(const l in h)h[l]!==void 0&&(e[l]=h[l]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const i=this.attributes;for(const h in i){const l=i[h];e.data.attributes[h]=l.toJSON(e.data)}const s={};let r=!1;for(const h in this.morphAttributes){const l=this.morphAttributes[h],u=[];for(let f=0,d=l.length;f<d;f++){const p=l[f];u.push(p.toJSON(e.data))}u.length>0&&(s[h]=u,r=!0)}r&&(e.data.morphAttributes=s,e.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const i=e.index;i!==null&&this.setIndex(i.clone());const s=e.attributes;for(const l in s){const u=s[l];this.setAttribute(l,u.clone(t))}const r=e.morphAttributes;for(const l in r){const u=[],f=r[l];for(let d=0,p=f.length;d<p;d++)u.push(f[d].clone(t));this.morphAttributes[l]=u}this.morphTargetsRelative=e.morphTargetsRelative;const a=e.groups;for(let l=0,u=a.length;l<u;l++){const f=a[l];this.addGroup(f.start,f.count,f.materialIndex)}const o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());const h=e.boundingSphere;return h!==null&&(this.boundingSphere=h.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Ao=new X,qg=new X,$g=new Ye;class Ui{constructor(e=new X(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,i,s){return this.normal.set(e,t,i),this.constant=s,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,i){const s=Ao.subVectors(i,t).cross(qg.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(s,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,i=!0){const s=e.delta(Ao),r=this.normal.dot(s);if(r===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const a=-(e.start.dot(this.normal)+this.constant)/r;return i===!0&&(a<0||a>1)?null:t.copy(e.start).addScaledVector(s,a)}intersectsLine(e){const t=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return t<0&&i>0||i<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const i=t||$g.getNormalMatrix(e),s=this.coplanarPoint(Ao).applyMatrix4(e),r=this.normal.applyMatrix3(i).normalize();return this.constant=-s.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(e){return this.normal.fromArray(e.normal),this.constant=e.constant,this}}let Zg=0;class Zs extends ps{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Zg++}),this.uuid=yr(),this.name="",this.type="Material",this.blending=Fs,this.side=cs,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=ec,this.blendDst=tc,this.blendEquation=Is,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new tt(0,0,0),this.blendAlpha=0,this.depthFunc=xr,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Mg,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=ro,this.stencilZFail=ro,this.stencilZPass=ro,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const i=e[t];if(i===void 0){He(`Material: parameter '${t}' has value of undefined.`);continue}const s=this[t];if(s===void 0){He(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(i):s&&s.isVector2&&i&&i.isVector2||s&&s.isEuler&&i&&i.isEuler||s&&s.isVector3&&i&&i.isVector3?s.copy(i):this[t]=i}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const i={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,i.blending=this.blending,i.side=this.side,i.shadowSide=this.shadowSide,i.vertexColors=this.vertexColors,i.opacity=this.opacity,i.transparent=this.transparent,i.blendSrc=this.blendSrc,i.blendDst=this.blendDst,i.blendEquation=this.blendEquation,i.blendSrcAlpha=this.blendSrcAlpha,i.blendDstAlpha=this.blendDstAlpha,i.blendEquationAlpha=this.blendEquationAlpha,i.blendColor=this.blendColor.getHex(),i.blendAlpha=this.blendAlpha,i.depthFunc=this.depthFunc,i.depthTest=this.depthTest,i.depthWrite=this.depthWrite,i.colorWrite=this.colorWrite,i.clipIntersection=this.clipIntersection,i.clipShadows=this.clipShadows,i.stencilWriteMask=this.stencilWriteMask,i.stencilFunc=this.stencilFunc,i.stencilRef=this.stencilRef,i.stencilFuncMask=this.stencilFuncMask,i.stencilFail=this.stencilFail,i.stencilZFail=this.stencilZFail,i.stencilZPass=this.stencilZPass,i.stencilWrite=this.stencilWrite,i.polygonOffset=this.polygonOffset,i.polygonOffsetFactor=this.polygonOffsetFactor,i.polygonOffsetUnits=this.polygonOffsetUnits,i.dithering=this.dithering,i.alphaTest=this.alphaTest,i.alphaHash=this.alphaHash,i.alphaToCoverage=this.alphaToCoverage,i.premultipliedAlpha=this.premultipliedAlpha,i.forceSinglePass=this.forceSinglePass,i.allowOverride=this.allowOverride,i.visible=this.visible,i.toneMapped=this.toneMapped,i.name=this.name,this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(i.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(i.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(i.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(i.clippingPlanes=this.clippingPlanes.map(r=>r.toJSON())),this.rotation!==void 0&&(i.rotation=this.rotation),this.depthPacking!==void 0&&(i.depthPacking=this.depthPacking),this.linewidth!==void 0&&(i.linewidth=this.linewidth),this.linecap!==void 0&&(i.linecap=this.linecap),this.linejoin!==void 0&&(i.linejoin=this.linejoin),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.wireframe!==void 0&&(i.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(i.flatShading=this.flatShading),this.fog!==void 0&&(i.fog=this.fog),Object.keys(this.userData).length>0&&(i.userData=this.userData);function s(r){const a=[];for(const o in r){const h=r[o];delete h.metadata,a.push(h)}return a}if(t){const r=s(e.textures),a=s(e.images);r.length>0&&(i.textures=r),a.length>0&&(i.images=a)}return i}fromJSON(e,t){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new tt().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.retroreflectivity!==void 0&&(this.retroreflectivity=e.retroreflectivity),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=e.iridescenceThicknessRange),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.clippingPlanes!==void 0&&(this.clippingPlanes=e.clippingPlanes.map(i=>new Ui().fromJSON(i))),e.clipIntersection!==void 0&&(this.clipIntersection=e.clipIntersection),e.clipShadows!==void 0&&(this.clipShadows=e.clipShadows),e.depthPacking!==void 0&&(this.depthPacking=e.depthPacking),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.linecap!==void 0&&(this.linecap=e.linecap),e.linejoin!==void 0&&(this.linejoin=e.linejoin),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(typeof e.vertexColors=="number"?this.vertexColors=e.vertexColors>0:this.vertexColors=e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=t[e.map]||null),e.matcap!==void 0&&(this.matcap=t[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=t[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=t[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=t[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let i=e.normalScale;Array.isArray(i)===!1&&(i=[i,i]),this.normalScale=new We().fromArray(i)}return e.displacementMap!==void 0&&(this.displacementMap=t[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=t[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=t[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=t[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=t[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=t[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=t[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=t[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=t[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=t[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=t[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=t[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=t[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=t[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new We().fromArray(e.clearcoatNormalScale)),e.iridescenceMap!==void 0&&(this.iridescenceMap=t[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=t[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=t[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=t[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=t[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=t[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=t[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let i=null;if(t!==null){const s=t.length;i=new Array(s);for(let r=0;r!==s;++r)i[r]=t[r].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}const Mi=new X,To=new X,zr=new X,Gr=new X;class uc{constructor(e=new X,t=new X(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Mi)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const i=t.dot(this.direction);return i<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=Mi.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Mi.copy(this.origin).addScaledVector(this.direction,t),Mi.distanceToSquared(e))}distanceSqToSegment(e,t,i,s){To.copy(e).add(t).multiplyScalar(.5),zr.copy(t).sub(e).normalize(),Gr.copy(this.origin).sub(To);const r=e.distanceTo(t)*.5,a=-this.direction.dot(zr),o=Gr.dot(this.direction),h=-Gr.dot(zr),l=Gr.lengthSq(),u=Math.abs(1-a*a);let f,d,p,g;if(u>0)if(f=a*h-o,d=a*o-h,g=r*u,f>=0)if(d>=-g)if(d<=g){const v=1/u;f*=v,d*=v,p=f*(f+a*d+2*o)+d*(a*f+d+2*h)+l}else d=r,f=Math.max(0,-(a*d+o)),p=-f*f+d*(d+2*h)+l;else d=-r,f=Math.max(0,-(a*d+o)),p=-f*f+d*(d+2*h)+l;else d<=-g?(f=Math.max(0,-(-a*r+o)),d=f>0?-r:Math.min(Math.max(-r,-h),r),p=-f*f+d*(d+2*h)+l):d<=g?(f=0,d=Math.min(Math.max(-r,-h),r),p=d*(d+2*h)+l):(f=Math.max(0,-(a*r+o)),d=f>0?r:Math.min(Math.max(-r,-h),r),p=-f*f+d*(d+2*h)+l);else d=a>0?-r:r,f=Math.max(0,-(a*d+o)),p=-f*f+d*(d+2*h)+l;return i&&i.copy(this.origin).addScaledVector(this.direction,f),s&&s.copy(To).addScaledVector(zr,d),p}intersectSphere(e,t){if(e.radius<0)return null;Mi.subVectors(e.center,this.origin);const i=Mi.dot(this.direction),s=Mi.dot(Mi)-i*i,r=e.radius*e.radius;if(s>r)return null;const a=Math.sqrt(r-s),o=i-a,h=i+a;return h<0?null:o<0?this.at(h,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(e.normal)+e.constant)/t;return i>=0?i:null}intersectPlane(e,t){const i=this.distanceToPlane(e);return i===null?null:this.at(i,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let i,s,r,a,o,h;const l=1/this.direction.x,u=1/this.direction.y,f=1/this.direction.z,d=this.origin;return l>=0?(i=(e.min.x-d.x)*l,s=(e.max.x-d.x)*l):(i=(e.max.x-d.x)*l,s=(e.min.x-d.x)*l),u>=0?(r=(e.min.y-d.y)*u,a=(e.max.y-d.y)*u):(r=(e.max.y-d.y)*u,a=(e.min.y-d.y)*u),i>a||r>s||((r>i||isNaN(i))&&(i=r),(a<s||isNaN(s))&&(s=a),f>=0?(o=(e.min.z-d.z)*f,h=(e.max.z-d.z)*f):(o=(e.max.z-d.z)*f,h=(e.min.z-d.z)*f),i>h||o>s)||((o>i||i!==i)&&(i=o),(h<s||s!==s)&&(s=h),s<0)?null:this.at(i>=0?i:s,t)}intersectsBox(e){return this.intersectBox(e,Mi)!==null}intersectTriangle(e,t,i,s,r){const a=this.origin,o=this.direction,h=o.x,l=o.y,u=o.z,f=e.x-a.x,d=e.y-a.y,p=e.z-a.z,g=t.x-a.x,v=t.y-a.y,x=t.z-a.z,m=i.x-a.x,M=i.y-a.y,S=i.z-a.z,b=Math.abs(h),A=Math.abs(l),w=Math.abs(u);let L,_,E,P,T,D,U,N,F,H,W,te;if(b>=A&&b>=w?(E=h,D=f,F=g,te=m,h>=0?(L=l,_=u,P=d,T=p,U=v,N=x,H=M,W=S):(L=u,_=l,P=p,T=d,U=x,N=v,H=S,W=M)):A>=w?(E=l,D=d,F=v,te=M,l>=0?(L=u,_=h,P=p,T=f,U=x,N=g,H=S,W=m):(L=h,_=u,P=f,T=p,U=g,N=x,H=m,W=S)):(E=u,D=p,F=x,te=S,u>=0?(L=h,_=l,P=f,T=d,U=g,N=v,H=m,W=M):(L=l,_=h,P=d,T=f,U=v,N=g,H=M,W=m)),E===0)return null;const K=L/E,B=_/E,I=1/E,q=P-K*D,$=T-B*D,ce=U-K*F,de=N-B*F,me=H-K*te,j=W-B*te,ie=me*de-j*ce,k=q*j-$*me,re=ce*$-de*q;if(s){if(ie<0||k<0||re<0)return null}else if((ie<0||k<0||re<0)&&(ie>0||k>0||re>0))return null;const ae=ie+k+re;if(ae===0)return null;const ge=I*(ie*D+k*F+re*te);return(ae>0?ge<0:ge>0)?null:this.at(ge/ae,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class $u extends Zs{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new tt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new fs,this.combine=Tu,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const ah=new Ot,Ji=new uc,Hr=new wr,oh=new X,Wr=new X,Vr=new X,Yr=new X,Ro=new X,Xr=new X,lh=new X,Kr=new X;class $t extends vn{constructor(e=new jt,t=new $u){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const s=t[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(e,t){const i=this.geometry,s=i.attributes.position,r=i.morphAttributes.position,a=i.morphTargetsRelative;t.fromBufferAttribute(s,e);const o=this.morphTargetInfluences;if(r&&o){Xr.set(0,0,0);for(let h=0,l=r.length;h<l;h++){const u=o[h],f=r[h];u!==0&&(Ro.fromBufferAttribute(f,e),a?Xr.addScaledVector(Ro,u):Xr.addScaledVector(Ro.sub(t),u))}t.add(Xr)}return t}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){const i=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),Hr.copy(i.boundingSphere),Hr.applyMatrix4(r),Ji.copy(e.ray).recast(e.near),!(Hr.containsPoint(Ji.origin)===!1&&(Ji.intersectSphere(Hr,oh)===null||Ji.origin.distanceToSquared(oh)>(e.far-e.near)**2))&&(ah.copy(r).invert(),Ji.copy(e.ray).applyMatrix4(ah),!(i.boundingBox!==null&&Ji.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,t,Ji)))}_computeIntersections(e,t,i){let s;const r=this.geometry,a=this.material,o=r.index,h=r.attributes.position,l=r.attributes.uv,u=r.attributes.uv1,f=r.attributes.normal,d=r.groups,p=r.drawRange;if(o!==null)if(Array.isArray(a))for(let g=0,v=d.length;g<v;g++){const x=d[g],m=a[x.materialIndex],M=Math.max(x.start,p.start),S=Math.min(o.count,Math.min(x.start+x.count,p.start+p.count));for(let b=M,A=S;b<A;b+=3){const w=o.getX(b),L=o.getX(b+1),_=o.getX(b+2);s=qr(this,m,e,i,l,u,f,w,L,_),s&&(s.faceIndex=Math.floor(b/3),s.face.materialIndex=x.materialIndex,t.push(s))}}else{const g=Math.max(0,p.start),v=Math.min(o.count,p.start+p.count);for(let x=g,m=v;x<m;x+=3){const M=o.getX(x),S=o.getX(x+1),b=o.getX(x+2);s=qr(this,a,e,i,l,u,f,M,S,b),s&&(s.faceIndex=Math.floor(x/3),t.push(s))}}else if(h!==void 0)if(Array.isArray(a))for(let g=0,v=d.length;g<v;g++){const x=d[g],m=a[x.materialIndex],M=Math.max(x.start,p.start),S=Math.min(h.count,Math.min(x.start+x.count,p.start+p.count));for(let b=M,A=S;b<A;b+=3){const w=b,L=b+1,_=b+2;s=qr(this,m,e,i,l,u,f,w,L,_),s&&(s.faceIndex=Math.floor(b/3),s.face.materialIndex=x.materialIndex,t.push(s))}}else{const g=Math.max(0,p.start),v=Math.min(h.count,p.start+p.count);for(let x=g,m=v;x<m;x+=3){const M=x,S=x+1,b=x+2;s=qr(this,a,e,i,l,u,f,M,S,b),s&&(s.faceIndex=Math.floor(x/3),t.push(s))}}}}function Jg(n,e,t,i,s,r,a,o){let h;if(e.side===yn?h=i.intersectTriangle(a,r,s,!0,o):h=i.intersectTriangle(s,r,a,e.side===cs,o),h===null)return null;Kr.copy(o),Kr.applyMatrix4(n.matrixWorld);const l=t.ray.origin.distanceTo(Kr);return l<t.near||l>t.far?null:{distance:l,point:Kr.clone(),object:n}}function qr(n,e,t,i,s,r,a,o,h,l){n.getVertexPosition(o,Wr),n.getVertexPosition(h,Vr),n.getVertexPosition(l,Yr);const u=Jg(n,e,t,i,Wr,Vr,Yr,lh);if(u){const f=new X;Xn.getBarycoord(lh,Wr,Vr,Yr,f),s&&(u.uv=Xn.getInterpolatedAttribute(s,o,h,l,f,new We)),r&&(u.uv1=Xn.getInterpolatedAttribute(r,o,h,l,f,new We)),a&&(u.normal=Xn.getInterpolatedAttribute(a,o,h,l,f,new X),u.normal.dot(i.direction)>0&&u.normal.multiplyScalar(-1));const d={a:o,b:h,c:l,normal:new X,materialIndex:0};Xn.getNormal(Wr,Vr,Yr,d.normal),u.face=d,u.barycoord=f}return u}class Ns extends fn{constructor(e=null,t=1,i=1,s,r,a,o,h,l=Wt,u=Wt,f,d){super(null,a,o,h,l,u,s,r,f,d),this.isDataTexture=!0,this.image={data:e,width:t,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class dc extends Pn{constructor(e,t,i,s=1){super(e,t,i),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const Qi=new wr,Qg=new We(.5,.5),$r=new X;class Ca{constructor(e=new Ui,t=new Ui,i=new Ui,s=new Ui,r=new Ui,a=new Ui){this.planes=[e,t,i,s,r,a]}set(e,t,i,s,r,a){const o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(i),o[3].copy(s),o[4].copy(r),o[5].copy(a),this}copy(e){const t=this.planes;for(let i=0;i<6;i++)t[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,t=li,i=!1){const s=this.planes,r=e.elements,a=r[0],o=r[1],h=r[2],l=r[3],u=r[4],f=r[5],d=r[6],p=r[7],g=r[8],v=r[9],x=r[10],m=r[11],M=r[12],S=r[13],b=r[14],A=r[15];if(s[0].setComponents(l-a,p-u,m-g,A-M).normalize(),s[1].setComponents(l+a,p+u,m+g,A+M).normalize(),s[2].setComponents(l+o,p+f,m+v,A+S).normalize(),s[3].setComponents(l-o,p-f,m-v,A-S).normalize(),i)s[4].setComponents(h,d,x,b).normalize(),s[5].setComponents(l-h,p-d,m-x,A-b).normalize();else if(s[4].setComponents(l-h,p-d,m-x,A-b).normalize(),t===li)s[5].setComponents(l+h,p+d,m+x,A+b).normalize();else if(t===Ta)s[5].setComponents(h,d,x,b).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Qi.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Qi.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Qi)}intersectsSprite(e){Qi.center.set(0,0,0);const t=Qg.distanceTo(e.center);return Qi.radius=.7071067811865476+t,Qi.applyMatrix4(e.matrixWorld),this.intersectsSphere(Qi)}intersectsSphere(e){const t=this.planes,i=e.center,s=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(i)<s)return!1;return!0}intersectsBox(e){const t=this.planes;for(let i=0;i<6;i++){const s=t[i];if($r.x=s.normal.x>0?e.max.x:e.min.x,$r.y=s.normal.y>0?e.max.y:e.min.y,$r.z=s.normal.z>0?e.max.z:e.min.z,s.distanceToPoint($r)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let i=0;i<6;i++)if(t[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class Zu extends Zs{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new tt(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const La=new X,Pa=new X,ch=new Ot,or=new uc,Zr=new wr,Co=new X,hh=new X;class jg extends vn{constructor(e=new jt,t=new Zu){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,i=[0];for(let s=1,r=t.count;s<r;s++)La.fromBufferAttribute(t,s-1),Pa.fromBufferAttribute(t,s),i[s]=i[s-1],i[s]+=La.distanceTo(Pa);e.setAttribute("lineDistance",new Nt(i,1))}else He("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){const i=this.geometry,s=this.matrixWorld,r=e.params.Line.threshold,a=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),Zr.copy(i.boundingSphere),Zr.applyMatrix4(s),Zr.radius+=r,e.ray.intersectsSphere(Zr)===!1)return;ch.copy(s).invert(),or.copy(e.ray).applyMatrix4(ch);const o=r/((this.scale.x+this.scale.y+this.scale.z)/3),h=o*o,l=this.isLineSegments?2:1,u=i.index,d=i.attributes.position;if(u!==null){const p=Math.max(0,a.start),g=Math.min(u.count,a.start+a.count);for(let v=p,x=g-1;v<x;v+=l){const m=u.getX(v),M=u.getX(v+1),S=Jr(this,e,or,h,m,M,v);S&&t.push(S)}if(this.isLineLoop){const v=u.getX(g-1),x=u.getX(p),m=Jr(this,e,or,h,v,x,g-1);m&&t.push(m)}}else{const p=Math.max(0,a.start),g=Math.min(d.count,a.start+a.count);for(let v=p,x=g-1;v<x;v+=l){const m=Jr(this,e,or,h,v,v+1,v);m&&t.push(m)}if(this.isLineLoop){const v=Jr(this,e,or,h,g-1,p,g-1);v&&t.push(v)}}}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const s=t[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}}function Jr(n,e,t,i,s,r,a){const o=n.geometry.attributes.position;if(La.fromBufferAttribute(o,s),Pa.fromBufferAttribute(o,r),t.distanceSqToSegment(La,Pa,Co,hh)>i)return;Co.applyMatrix4(n.matrixWorld);const l=e.ray.origin.distanceTo(Co);if(!(l<e.near||l>e.far))return{distance:l,point:hh.clone().applyMatrix4(n.matrixWorld),index:a,face:null,faceIndex:null,barycoord:null,object:n}}const uh=new X,dh=new X;class fc extends jg{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,i=[];for(let s=0,r=t.count;s<r;s+=2)uh.fromBufferAttribute(t,s),dh.fromBufferAttribute(t,s+1),i[s]=s===0?0:i[s-1],i[s+1]=i[s]+uh.distanceTo(dh);e.setAttribute("lineDistance",new Nt(i,1))}else He("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class e1 extends Zs{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new tt(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const fh=new Ot,Ol=new uc,Qr=new wr,jr=new X;class Da extends vn{constructor(e=new jt,t=new e1){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){const i=this.geometry,s=this.matrixWorld,r=e.params.Points.threshold,a=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),Qr.copy(i.boundingSphere),Qr.applyMatrix4(s),Qr.radius+=r,e.ray.intersectsSphere(Qr)===!1)return;fh.copy(s).invert(),Ol.copy(e.ray).applyMatrix4(fh);const o=r/((this.scale.x+this.scale.y+this.scale.z)/3),h=o*o,l=i.index,f=i.attributes.position;if(l!==null){const d=Math.max(0,a.start),p=Math.min(l.count,a.start+a.count);for(let g=d,v=p;g<v;g++){const x=l.getX(g);jr.fromBufferAttribute(f,x),ph(jr,x,h,s,e,t,this)}}else{const d=Math.max(0,a.start),p=Math.min(f.count,a.start+a.count);for(let g=d,v=p;g<v;g++)jr.fromBufferAttribute(f,g),ph(jr,g,h,s,e,t,this)}}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const s=t[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}}function ph(n,e,t,i,s,r,a){const o=Ol.distanceSqToPoint(n);if(o<t){const h=new X;Ol.closestPointToPoint(n,h),h.applyMatrix4(i);const l=s.ray.origin.distanceTo(h);if(l<s.near||l>s.far)return;r.push({distance:l,distanceToRay:Math.sqrt(o),point:h,index:e,face:null,faceIndex:null,barycoord:null,object:a})}}class Ju extends fn{constructor(e=[],t=us,i,s,r,a,o,h,l,u){super(e,t,i,s,r,a,o,h,l,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class t1 extends fn{constructor(e,t,i,s,r,a,o,h,l){super(e,t,i,s,r,a,o,h,l),this.isCanvasTexture=!0,this.needsUpdate=!0}}class Ys extends fn{constructor(e,t,i=ui,s,r,a,o=Wt,h=Wt,l,u=Ei,f=1){if(u!==Ei&&u!==rs)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const d={width:e,height:t,depth:f};super(d,s,r,a,o,h,u,i,l),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new hc(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return t.compareFunction=this.compareFunction,t}}class n1 extends Ys{constructor(e,t=ui,i=us,s,r,a=Wt,o=Wt,h,l=Ei){const u={width:e,height:e,depth:1},f=[u,u,u,u,u,u];super(e,e,t,i,s,r,a,o,h,l),this.image=f,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}}class Qu extends fn{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}}class Er extends jt{constructor(e=1,t=1,i=1,s=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:i,widthSegments:s,heightSegments:r,depthSegments:a};const o=this;s=Math.floor(s),r=Math.floor(r),a=Math.floor(a);const h=[],l=[],u=[],f=[];let d=0,p=0;g("z","y","x",-1,-1,i,t,e,a,r,0),g("z","y","x",1,-1,i,t,-e,a,r,1),g("x","z","y",1,1,e,i,t,s,a,2),g("x","z","y",1,-1,e,i,-t,s,a,3),g("x","y","z",1,-1,e,t,i,s,r,4),g("x","y","z",-1,-1,e,t,-i,s,r,5),this.setIndex(h),this.setAttribute("position",new Nt(l,3)),this.setAttribute("normal",new Nt(u,3)),this.setAttribute("uv",new Nt(f,2));function g(v,x,m,M,S,b,A,w,L,_,E){const P=b/L,T=A/_,D=b/2,U=A/2,N=w/2,F=L+1,H=_+1;let W=0,te=0;const K=new X;for(let B=0;B<H;B++){const I=B*T-U;for(let q=0;q<F;q++){const $=q*P-D;K[v]=$*M,K[x]=I*S,K[m]=N,l.push(K.x,K.y,K.z),K[v]=0,K[x]=0,K[m]=w>0?1:-1,u.push(K.x,K.y,K.z),f.push(q/L),f.push(1-B/_),W+=1}}for(let B=0;B<_;B++)for(let I=0;I<L;I++){const q=d+I+F*B,$=d+I+F*(B+1),ce=d+(I+1)+F*(B+1),de=d+(I+1)+F*B;h.push(q,$,de),h.push($,ce,de),te+=6}o.addGroup(p,te,E),p+=te,d+=W}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Er(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}class Dn extends jt{constructor(e=1,t=1,i=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:i,heightSegments:s};const r=e/2,a=t/2,o=Math.floor(i),h=Math.floor(s),l=o+1,u=h+1,f=e/o,d=t/h,p=[],g=[],v=[],x=[];for(let m=0;m<u;m++){const M=m*d-a;for(let S=0;S<l;S++){const b=S*f-r;g.push(b,-M,0),v.push(0,0,1),x.push(S/o),x.push(1-m/h)}}for(let m=0;m<h;m++)for(let M=0;M<o;M++){const S=M+l*m,b=M+l*(m+1),A=M+1+l*(m+1),w=M+1+l*m;p.push(S,b,w),p.push(b,A,w)}this.setIndex(p),this.setAttribute("position",new Nt(g,3)),this.setAttribute("normal",new Nt(v,3)),this.setAttribute("uv",new Nt(x,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Dn(e.width,e.height,e.widthSegments,e.heightSegments)}}function Xs(n){const e={};for(const t in n){e[t]={};for(const i in n[t]){const s=n[t][i];if(mh(s))s.isRenderTargetTexture?(He("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][i]=null):e[t][i]=s.clone();else if(Array.isArray(s))if(mh(s[0])){const r=[];for(let a=0,o=s.length;a<o;a++)r[a]=s[a].clone();e[t][i]=r}else e[t][i]=s.slice();else e[t][i]=s}}return e}function gn(n){const e={};for(let t=0;t<n.length;t++){const i=Xs(n[t]);for(const s in i)e[s]=i[s]}return e}function mh(n){return n&&(n.isColor||n.isMatrix3||n.isMatrix4||n.isVector2||n.isVector3||n.isVector4||n.isTexture||n.isQuaternion)}function i1(n){const e=[];for(let t=0;t<n.length;t++)e.push(n[t].clone());return e}function ju(n){const e=n.getRenderTarget();return e===null?n.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:st.workingColorSpace}const s1={clone:Xs,merge:gn};var r1=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,a1=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class yt extends Zs{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=r1,this.fragmentShader=a1,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Xs(e.uniforms),this.uniformsGroups=i1(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const s in this.uniforms){const a=this.uniforms[s].value;a&&a.isTexture?t.uniforms[s]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[s]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[s]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[s]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[s]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[s]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[s]={type:"m4",value:a.toArray()}:t.uniforms[s]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const i={};for(const s in this.extensions)this.extensions[s]===!0&&(i[s]=!0);return Object.keys(i).length>0&&(t.extensions=i),t}fromJSON(e,t){if(super.fromJSON(e,t),e.uniforms!==void 0)for(const i in e.uniforms){const s=e.uniforms[i];switch(this.uniforms[i]={},s.type){case"t":this.uniforms[i].value=t[s.value]||null;break;case"c":this.uniforms[i].value=new tt().setHex(s.value);break;case"v2":this.uniforms[i].value=new We().fromArray(s.value);break;case"v3":this.uniforms[i].value=new X().fromArray(s.value);break;case"v4":this.uniforms[i].value=new it().fromArray(s.value);break;case"m3":this.uniforms[i].value=new Ye().fromArray(s.value);break;case"m4":this.uniforms[i].value=new Ot().fromArray(s.value);break;default:this.uniforms[i].value=s.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(const i in e.extensions)this.extensions[i]=e.extensions[i];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}}class o1 extends yt{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class l1 extends Zs{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=xg,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class c1 extends Zs{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const ea=new X,ta=new qs,jn=new X;class ed extends vn{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Ot,this.projectionMatrix=new Ot,this.projectionMatrixInverse=new Ot,this.coordinateSystem=li,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(ea,ta,jn),jn.x===1&&jn.y===1&&jn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(ea,ta,jn.set(1,1,1)).invert()}updateWorldMatrix(e,t,i=!1){super.updateWorldMatrix(e,t,i),this.matrixWorld.decompose(ea,ta,jn),jn.x===1&&jn.y===1&&jn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(ea,ta,jn.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}const Ni=new X,gh=new We,xh=new We;class Tn extends ed{constructor(e=50,t=1,i=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=s,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=Nl*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(ao*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Nl*2*Math.atan(Math.tan(ao*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,i){Ni.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Ni.x,Ni.y).multiplyScalar(-e/Ni.z),Ni.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(Ni.x,Ni.y).multiplyScalar(-e/Ni.z)}getViewSize(e,t){return this.getViewBounds(e,gh,xh),t.subVectors(xh,gh)}setViewOffset(e,t,i,s,r,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(ao*.5*this.fov)/this.zoom,i=2*t,s=this.aspect*i,r=-.5*s;const a=this.view;if(this.view!==null&&this.view.enabled){const h=a.fullWidth,l=a.fullHeight;r+=a.offsetX*s/h,t-=a.offsetY*i/l,s*=a.width/h,i*=a.height/l}const o=this.filmOffset;o!==0&&(r+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,t,t-i,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}class pc extends ed{constructor(e=-1,t=1,i=1,s=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=i,this.bottom=s,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,i,s,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=i-e,a=i+e,o=s+t,h=s-t;if(this.view!==null&&this.view.enabled){const l=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=l*this.view.offsetX,a=r+l*this.view.width,o-=u*this.view.offsetY,h=o-u*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,h,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}class mc extends jt{constructor(){super(),this.isInstancedBufferGeometry=!0,this.type="InstancedBufferGeometry",this.instanceCount=1/0}copy(e){return super.copy(e),this.instanceCount=e.instanceCount,this}toJSON(){const e=super.toJSON();return e.instanceCount=this.instanceCount,e.isInstancedBufferGeometry=!0,e}}const Ts=-90,Rs=1;class h1 extends vn{constructor(e,t,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new Tn(Ts,Rs,e,t);s.layers=this.layers,this.add(s);const r=new Tn(Ts,Rs,e,t);r.layers=this.layers,this.add(r);const a=new Tn(Ts,Rs,e,t);a.layers=this.layers,this.add(a);const o=new Tn(Ts,Rs,e,t);o.layers=this.layers,this.add(o);const h=new Tn(Ts,Rs,e,t);h.layers=this.layers,this.add(h);const l=new Tn(Ts,Rs,e,t);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[i,s,r,a,o,h]=t;for(const l of t)this.remove(l);if(e===li)i.up.set(0,1,0),i.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),h.up.set(0,1,0),h.lookAt(0,0,-1);else if(e===Ta)i.up.set(0,-1,0),i.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),h.up.set(0,-1,0),h.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const l of t)this.add(l),l.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:s}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[r,a,o,h,l,u]=this.children,f=e.getRenderTarget(),d=e.getActiveCubeFace(),p=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;const v=i.texture.generateMipmaps;i.texture.generateMipmaps=!1;let x=!1;e.isWebGLRenderer===!0?x=e.state.buffers.depth.getReversed():x=e.reversedDepthBuffer,e.setRenderTarget(i,0,s),x&&e.autoClear===!1&&e.clearDepth(),e.render(t,r),e.setRenderTarget(i,1,s),x&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(i,2,s),x&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(i,3,s),x&&e.autoClear===!1&&e.clearDepth(),e.render(t,h),e.setRenderTarget(i,4,s),x&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),i.texture.generateMipmaps=v,e.setRenderTarget(i,5,s),x&&e.autoClear===!1&&e.clearDepth(),e.render(t,u),e.setRenderTarget(f,d,p),e.xr.enabled=g,i.texture.needsPMREMUpdate=!0}}class u1 extends Tn{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}class td{static{td.prototype.isMatrix2=!0}constructor(e,t,i,s){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,i,s)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let i=0;i<4;i++)this.elements[i]=e[i+t];return this}set(e,t,i,s){const r=this.elements;return r[0]=e,r[2]=t,r[1]=i,r[3]=s,this}}function vh(n,e,t,i){const s=d1(i);switch(t){case zu:return n*e;case Hu:return n*e/s.components*s.byteLength;case rc:return n*e/s.components*s.byteLength;case ds:return n*e*2/s.components*s.byteLength;case ac:return n*e*2/s.components*s.byteLength;case Gu:return n*e*3/s.components*s.byteLength;case Cn:return n*e*4/s.components*s.byteLength;case oc:return n*e*4/s.components*s.byteLength;case pa:case ma:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case ga:case xa:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case rl:case ol:return Math.max(n,16)*Math.max(e,8)/4;case sl:case al:return Math.max(n,8)*Math.max(e,8)/2;case ll:case cl:case ul:case dl:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case hl:case wa:case fl:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case pl:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case ml:return Math.floor((n+4)/5)*Math.floor((e+3)/4)*16;case gl:return Math.floor((n+4)/5)*Math.floor((e+4)/5)*16;case xl:return Math.floor((n+5)/6)*Math.floor((e+4)/5)*16;case vl:return Math.floor((n+5)/6)*Math.floor((e+5)/6)*16;case Ml:return Math.floor((n+7)/8)*Math.floor((e+4)/5)*16;case _l:return Math.floor((n+7)/8)*Math.floor((e+5)/6)*16;case bl:return Math.floor((n+7)/8)*Math.floor((e+7)/8)*16;case Sl:return Math.floor((n+9)/10)*Math.floor((e+4)/5)*16;case yl:return Math.floor((n+9)/10)*Math.floor((e+5)/6)*16;case wl:return Math.floor((n+9)/10)*Math.floor((e+7)/8)*16;case El:return Math.floor((n+9)/10)*Math.floor((e+9)/10)*16;case Al:return Math.floor((n+11)/12)*Math.floor((e+9)/10)*16;case Tl:return Math.floor((n+11)/12)*Math.floor((e+11)/12)*16;case Rl:case Cl:case Ll:return Math.ceil(n/4)*Math.ceil(e/4)*16;case Pl:case Dl:return Math.ceil(n/4)*Math.ceil(e/4)*8;case Ea:case Il:return Math.ceil(n/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function d1(n){switch(n){case Rn:case Uu:return{byteLength:1,components:1};case vr:case Fu:case di:return{byteLength:2,components:1};case ic:case sc:return{byteLength:2,components:4};case ui:case nc:case oi:return{byteLength:4,components:1};case Bu:case ku:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${n}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Jl}}));typeof window<"u"&&(window.__THREE__?He("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Jl);function nd(){let n=null,e=!1,t=null,i=null;function s(r,a){i=n.requestAnimationFrame(s),t(r,a)}return{start:function(){e!==!0&&t!==null&&n!==null&&(i=n.requestAnimationFrame(s),e=!0)},stop:function(){n!==null&&n.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){n=r}}}function f1(n){const e=new WeakMap;function t(o,h){const l=o.array,u=o.usage,f=l.byteLength,d=n.createBuffer();n.bindBuffer(h,d),n.bufferData(h,l,u),o.onUploadCallback();let p;if(l instanceof Float32Array)p=n.FLOAT;else if(typeof Float16Array<"u"&&l instanceof Float16Array)p=n.HALF_FLOAT;else if(l instanceof Uint16Array)o.isFloat16BufferAttribute?p=n.HALF_FLOAT:p=n.UNSIGNED_SHORT;else if(l instanceof Int16Array)p=n.SHORT;else if(l instanceof Uint32Array)p=n.UNSIGNED_INT;else if(l instanceof Int32Array)p=n.INT;else if(l instanceof Int8Array)p=n.BYTE;else if(l instanceof Uint8Array)p=n.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)p=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:d,type:p,bytesPerElement:l.BYTES_PER_ELEMENT,version:o.version,size:f}}function i(o,h,l){const u=h.array,f=h.updateRanges;if(n.bindBuffer(l,o),f.length===0)n.bufferSubData(l,0,u);else{f.sort((p,g)=>p.start-g.start);let d=0;for(let p=1;p<f.length;p++){const g=f[d],v=f[p];v.start<=g.start+g.count+1?g.count=Math.max(g.count,v.start+v.count-g.start):(++d,f[d]=v)}f.length=d+1;for(let p=0,g=f.length;p<g;p++){const v=f[p];n.bufferSubData(l,v.start*u.BYTES_PER_ELEMENT,u,v.start,v.count)}h.clearUpdateRanges()}h.onUploadCallback()}function s(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);const h=e.get(o);h&&(n.deleteBuffer(h.buffer),e.delete(o))}function a(o,h){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const u=e.get(o);(!u||u.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const l=e.get(o);if(l===void 0)e.set(o,t(o,h));else if(l.version<o.version){if(l.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(l.buffer,o,h),l.version=o.version}}return{get:s,remove:r,update:a}}var p1=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,m1=`#ifdef USE_ALPHAHASH
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
#endif`,g1=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,x1=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,v1=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,M1=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,_1=`#ifdef USE_AOMAP
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
#endif`,b1=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,S1=`#ifdef USE_BATCHING
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
#endif`,y1=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,w1=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,E1=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,A1=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,T1=`#ifdef USE_IRIDESCENCE
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
#endif`,R1=`#ifdef USE_BUMPMAP
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
#endif`,C1=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,L1=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,P1=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,D1=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,I1=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,N1=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,O1=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,U1=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
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
#endif`,F1=`#define PI 3.141592653589793
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
} // validated`,B1=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,k1=`vec3 transformedNormal = objectNormal;
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
#endif`,z1=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,G1=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,H1=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,W1=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,V1="gl_FragColor = linearToOutputTexel( gl_FragColor );",Y1=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,X1=`#ifdef USE_ENVMAP
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
#endif`,K1=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,q1=`#ifdef USE_ENVMAP
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
#endif`,$1=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Z1=`#ifdef USE_ENVMAP
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
#endif`,J1=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Q1=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,j1=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,e2=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,t2=`#ifdef USE_GRADIENTMAP
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
}`,n2=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,i2=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,s2=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,r2=`uniform bool receiveShadow;
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
#include <lightprobes_pars_fragment>`,a2=`#ifdef USE_ENVMAP
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
#endif`,o2=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,l2=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,c2=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,h2=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,u2=`PhysicalMaterial material;
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
#endif`,d2=`uniform sampler2D dfgLUT;
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
}`,f2=`
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
#endif`,p2=`#if defined( RE_IndirectDiffuse )
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
#endif`,m2=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,g2=`#ifdef USE_LIGHT_PROBES_GRID
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
#endif`,x2=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,v2=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,M2=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,_2=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,b2=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,S2=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,y2=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,w2=`#if defined( USE_POINTS_UV )
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
#endif`,E2=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,A2=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,T2=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,R2=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,C2=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,L2=`#ifdef USE_MORPHTARGETS
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
#endif`,P2=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,D2=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,I2=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,N2=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,O2=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,U2=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,F2=`#ifdef USE_NORMALMAP
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
#endif`,B2=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,k2=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,z2=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,G2=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,H2=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,W2=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,V2=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Y2=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,X2=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,K2=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,q2=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,$2=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Z2=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,J2=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Q2=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,j2=`float getShadowMask() {
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
}`,ex=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,tx=`#ifdef USE_SKINNING
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
#endif`,nx=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,ix=`#ifdef USE_SKINNING
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
#endif`,sx=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,rx=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,ax=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,ox=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,lx=`#ifdef USE_TRANSMISSION
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
#endif`,cx=`#ifdef USE_TRANSMISSION
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
#endif`,hx=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,ux=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,dx=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,fx=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const px=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,mx=`uniform sampler2D t2D;
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
}`,gx=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,xx=`#ifdef ENVMAP_TYPE_CUBE
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
}`,vx=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Mx=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,_x=`#include <common>
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
}`,bx=`#if DEPTH_PACKING == 3200
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
}`,Sx=`#define DISTANCE
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
}`,yx=`#define DISTANCE
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
}`,wx=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Ex=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Ax=`uniform float scale;
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
}`,Tx=`uniform vec3 diffuse;
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
}`,Rx=`#include <common>
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
}`,Cx=`uniform vec3 diffuse;
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
}`,Lx=`#define LAMBERT
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
}`,Px=`#define LAMBERT
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
}`,Dx=`#define MATCAP
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
}`,Ix=`#define MATCAP
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
}`,Nx=`#define NORMAL
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
}`,Ox=`#define NORMAL
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
}`,Ux=`#define PHONG
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
}`,Fx=`#define PHONG
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
}`,Bx=`#define STANDARD
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
}`,kx=`#define STANDARD
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
}`,zx=`#define TOON
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
}`,Gx=`#define TOON
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
}`,Hx=`uniform float size;
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
}`,Wx=`uniform vec3 diffuse;
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
}`,Vx=`#include <common>
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
}`,Yx=`uniform vec3 color;
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
}`,Xx=`uniform float rotation;
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
}`,Kx=`uniform vec3 diffuse;
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
}`,et={alphahash_fragment:p1,alphahash_pars_fragment:m1,alphamap_fragment:g1,alphamap_pars_fragment:x1,alphatest_fragment:v1,alphatest_pars_fragment:M1,aomap_fragment:_1,aomap_pars_fragment:b1,batching_pars_vertex:S1,batching_vertex:y1,begin_vertex:w1,beginnormal_vertex:E1,bsdfs:A1,iridescence_fragment:T1,bumpmap_pars_fragment:R1,clipping_planes_fragment:C1,clipping_planes_pars_fragment:L1,clipping_planes_pars_vertex:P1,clipping_planes_vertex:D1,color_fragment:I1,color_pars_fragment:N1,color_pars_vertex:O1,color_vertex:U1,common:F1,cube_uv_reflection_fragment:B1,defaultnormal_vertex:k1,displacementmap_pars_vertex:z1,displacementmap_vertex:G1,emissivemap_fragment:H1,emissivemap_pars_fragment:W1,colorspace_fragment:V1,colorspace_pars_fragment:Y1,envmap_fragment:X1,envmap_common_pars_fragment:K1,envmap_pars_fragment:q1,envmap_pars_vertex:$1,envmap_physical_pars_fragment:a2,envmap_vertex:Z1,fog_vertex:J1,fog_pars_vertex:Q1,fog_fragment:j1,fog_pars_fragment:e2,gradientmap_pars_fragment:t2,lightmap_pars_fragment:n2,lights_lambert_fragment:i2,lights_lambert_pars_fragment:s2,lights_pars_begin:r2,lights_toon_fragment:o2,lights_toon_pars_fragment:l2,lights_phong_fragment:c2,lights_phong_pars_fragment:h2,lights_physical_fragment:u2,lights_physical_pars_fragment:d2,lights_fragment_begin:f2,lights_fragment_maps:p2,lights_fragment_end:m2,lightprobes_pars_fragment:g2,logdepthbuf_fragment:x2,logdepthbuf_pars_fragment:v2,logdepthbuf_pars_vertex:M2,logdepthbuf_vertex:_2,map_fragment:b2,map_pars_fragment:S2,map_particle_fragment:y2,map_particle_pars_fragment:w2,metalnessmap_fragment:E2,metalnessmap_pars_fragment:A2,morphinstance_vertex:T2,morphcolor_vertex:R2,morphnormal_vertex:C2,morphtarget_pars_vertex:L2,morphtarget_vertex:P2,normal_fragment_begin:D2,normal_fragment_maps:I2,normal_pars_fragment:N2,normal_pars_vertex:O2,normal_vertex:U2,normalmap_pars_fragment:F2,clearcoat_normal_fragment_begin:B2,clearcoat_normal_fragment_maps:k2,clearcoat_pars_fragment:z2,iridescence_pars_fragment:G2,opaque_fragment:H2,packing:W2,premultiplied_alpha_fragment:V2,project_vertex:Y2,dithering_fragment:X2,dithering_pars_fragment:K2,roughnessmap_fragment:q2,roughnessmap_pars_fragment:$2,shadowmap_pars_fragment:Z2,shadowmap_pars_vertex:J2,shadowmap_vertex:Q2,shadowmask_pars_fragment:j2,skinbase_vertex:ex,skinning_pars_vertex:tx,skinning_vertex:nx,skinnormal_vertex:ix,specularmap_fragment:sx,specularmap_pars_fragment:rx,tonemapping_fragment:ax,tonemapping_pars_fragment:ox,transmission_fragment:lx,transmission_pars_fragment:cx,uv_pars_fragment:hx,uv_pars_vertex:ux,uv_vertex:dx,worldpos_vertex:fx,background_vert:px,background_frag:mx,backgroundCube_vert:gx,backgroundCube_frag:xx,cube_vert:vx,cube_frag:Mx,depth_vert:_x,depth_frag:bx,distance_vert:Sx,distance_frag:yx,equirect_vert:wx,equirect_frag:Ex,linedashed_vert:Ax,linedashed_frag:Tx,meshbasic_vert:Rx,meshbasic_frag:Cx,meshlambert_vert:Lx,meshlambert_frag:Px,meshmatcap_vert:Dx,meshmatcap_frag:Ix,meshnormal_vert:Nx,meshnormal_frag:Ox,meshphong_vert:Ux,meshphong_frag:Fx,meshphysical_vert:Bx,meshphysical_frag:kx,meshtoon_vert:zx,meshtoon_frag:Gx,points_vert:Hx,points_frag:Wx,shadow_vert:Vx,shadow_frag:Yx,sprite_vert:Xx,sprite_frag:Kx},Se={common:{diffuse:{value:new tt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ye},alphaMap:{value:null},alphaMapTransform:{value:new Ye},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ye}},envmap:{envMap:{value:null},envMapRotation:{value:new Ye},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ye}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ye}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ye},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ye},normalScale:{value:new We(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ye},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ye}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ye}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ye}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new tt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new X},probesMax:{value:new X},probesResolution:{value:new X}},points:{diffuse:{value:new tt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ye},alphaTest:{value:0},uvTransform:{value:new Ye}},sprite:{diffuse:{value:new tt(16777215)},opacity:{value:1},center:{value:new We(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ye},alphaMap:{value:null},alphaMapTransform:{value:new Ye},alphaTest:{value:0}}},ri={basic:{uniforms:gn([Se.common,Se.specularmap,Se.envmap,Se.aomap,Se.lightmap,Se.fog]),vertexShader:et.meshbasic_vert,fragmentShader:et.meshbasic_frag},lambert:{uniforms:gn([Se.common,Se.specularmap,Se.envmap,Se.aomap,Se.lightmap,Se.emissivemap,Se.bumpmap,Se.normalmap,Se.displacementmap,Se.fog,Se.lights,{emissive:{value:new tt(0)},envMapIntensity:{value:1}}]),vertexShader:et.meshlambert_vert,fragmentShader:et.meshlambert_frag},phong:{uniforms:gn([Se.common,Se.specularmap,Se.envmap,Se.aomap,Se.lightmap,Se.emissivemap,Se.bumpmap,Se.normalmap,Se.displacementmap,Se.fog,Se.lights,{emissive:{value:new tt(0)},specular:{value:new tt(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:et.meshphong_vert,fragmentShader:et.meshphong_frag},standard:{uniforms:gn([Se.common,Se.envmap,Se.aomap,Se.lightmap,Se.emissivemap,Se.bumpmap,Se.normalmap,Se.displacementmap,Se.roughnessmap,Se.metalnessmap,Se.fog,Se.lights,{emissive:{value:new tt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:et.meshphysical_vert,fragmentShader:et.meshphysical_frag},toon:{uniforms:gn([Se.common,Se.aomap,Se.lightmap,Se.emissivemap,Se.bumpmap,Se.normalmap,Se.displacementmap,Se.gradientmap,Se.fog,Se.lights,{emissive:{value:new tt(0)}}]),vertexShader:et.meshtoon_vert,fragmentShader:et.meshtoon_frag},matcap:{uniforms:gn([Se.common,Se.bumpmap,Se.normalmap,Se.displacementmap,Se.fog,{matcap:{value:null}}]),vertexShader:et.meshmatcap_vert,fragmentShader:et.meshmatcap_frag},points:{uniforms:gn([Se.points,Se.fog]),vertexShader:et.points_vert,fragmentShader:et.points_frag},dashed:{uniforms:gn([Se.common,Se.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:et.linedashed_vert,fragmentShader:et.linedashed_frag},depth:{uniforms:gn([Se.common,Se.displacementmap]),vertexShader:et.depth_vert,fragmentShader:et.depth_frag},normal:{uniforms:gn([Se.common,Se.bumpmap,Se.normalmap,Se.displacementmap,{opacity:{value:1}}]),vertexShader:et.meshnormal_vert,fragmentShader:et.meshnormal_frag},sprite:{uniforms:gn([Se.sprite,Se.fog]),vertexShader:et.sprite_vert,fragmentShader:et.sprite_frag},background:{uniforms:{uvTransform:{value:new Ye},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:et.background_vert,fragmentShader:et.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Ye}},vertexShader:et.backgroundCube_vert,fragmentShader:et.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:et.cube_vert,fragmentShader:et.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:et.equirect_vert,fragmentShader:et.equirect_frag},distance:{uniforms:gn([Se.common,Se.displacementmap,{referencePosition:{value:new X},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:et.distance_vert,fragmentShader:et.distance_frag},shadow:{uniforms:gn([Se.lights,Se.fog,{color:{value:new tt(0)},opacity:{value:1}}]),vertexShader:et.shadow_vert,fragmentShader:et.shadow_frag}};ri.physical={uniforms:gn([ri.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ye},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ye},clearcoatNormalScale:{value:new We(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ye},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ye},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ye},sheen:{value:0},sheenColor:{value:new tt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ye},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ye},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ye},transmissionSamplerSize:{value:new We},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ye},attenuationDistance:{value:0},attenuationColor:{value:new tt(0)},specularColor:{value:new tt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ye},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ye},anisotropyVector:{value:new We},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ye}}]),vertexShader:et.meshphysical_vert,fragmentShader:et.meshphysical_frag};const na={r:0,b:0,g:0},qx=new Ot,id=new Ye;id.set(-1,0,0,0,1,0,0,0,1);function $x(n,e,t,i,s,r){const a=new tt(0);let o=s===!0?0:1,h,l,u=null,f=0,d=null;function p(M){let S=M.isScene===!0?M.background:null;if(S&&S.isTexture){const b=M.backgroundBlurriness>0;S=e.get(S,b)}return S}function g(M){let S=!1;const b=p(M);b===null?x(a,o):b&&b.isColor&&(x(b,1),S=!0);const A=n.xr.getEnvironmentBlendMode();A==="additive"?t.buffers.color.setClear(0,0,0,1,r):A==="alpha-blend"&&t.buffers.color.setClear(0,0,0,0,r),(n.autoClear||S)&&(t.buffers.depth.setTest(!0),t.buffers.depth.setMask(!0),t.buffers.color.setMask(!0),n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil))}function v(M,S){const b=p(S);b&&(b.isCubeTexture||b.mapping===Va)?(l===void 0&&(l=new $t(new Er(1,1,1),new yt({name:"BackgroundCubeMaterial",uniforms:Xs(ri.backgroundCube.uniforms),vertexShader:ri.backgroundCube.vertexShader,fragmentShader:ri.backgroundCube.fragmentShader,side:yn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),l.geometry.deleteAttribute("uv"),l.onBeforeRender=function(A,w,L){this.matrixWorld.copyPosition(L.matrixWorld)},Object.defineProperty(l.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(l)),l.material.uniforms.envMap.value=b,l.material.uniforms.backgroundBlurriness.value=S.backgroundBlurriness,l.material.uniforms.backgroundIntensity.value=S.backgroundIntensity,l.material.uniforms.backgroundRotation.value.setFromMatrix4(qx.makeRotationFromEuler(S.backgroundRotation)).transpose(),b.isCubeTexture&&b.isRenderTargetTexture===!1&&l.material.uniforms.backgroundRotation.value.premultiply(id),l.material.toneMapped=st.getTransfer(b.colorSpace)!==vt,(u!==b||f!==b.version||d!==n.toneMapping)&&(l.material.needsUpdate=!0,u=b,f=b.version,d=n.toneMapping),l.layers.enableAll(),M.unshift(l,l.geometry,l.material,0,0,null)):b&&b.isTexture&&(h===void 0&&(h=new $t(new Dn(2,2),new yt({name:"BackgroundMaterial",uniforms:Xs(ri.background.uniforms),vertexShader:ri.background.vertexShader,fragmentShader:ri.background.fragmentShader,side:cs,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),h.geometry.deleteAttribute("normal"),Object.defineProperty(h.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(h)),h.material.uniforms.t2D.value=b,h.material.uniforms.backgroundIntensity.value=S.backgroundIntensity,h.material.toneMapped=st.getTransfer(b.colorSpace)!==vt,b.matrixAutoUpdate===!0&&b.updateMatrix(),h.material.uniforms.uvTransform.value.copy(b.matrix),(u!==b||f!==b.version||d!==n.toneMapping)&&(h.material.needsUpdate=!0,u=b,f=b.version,d=n.toneMapping),h.layers.enableAll(),M.unshift(h,h.geometry,h.material,0,0,null))}function x(M,S){M.getRGB(na,ju(n)),t.buffers.color.setClear(na.r,na.g,na.b,S,r)}function m(){l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0),h!==void 0&&(h.geometry.dispose(),h.material.dispose(),h=void 0)}return{getClearColor:function(){return a},setClearColor:function(M,S=1){a.set(M),o=S,x(a,o)},getClearAlpha:function(){return o},setClearAlpha:function(M){o=M,x(a,o)},render:g,addToRenderList:v,dispose:m}}function Zx(n,e){const t=n.getParameter(n.MAX_VERTEX_ATTRIBS),i={},s=d(null);let r=s,a=!1;function o(T,D,U,N,F){let H=!1;const W=f(T,N,U,D);r!==W&&(r=W,l(r.object)),H=p(T,N,U,F),H&&g(T,N,U,F),F!==null&&e.update(F,n.ELEMENT_ARRAY_BUFFER),(H||a)&&(a=!1,b(T,D,U,N),F!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,e.get(F).buffer))}function h(){return n.createVertexArray()}function l(T){return n.bindVertexArray(T)}function u(T){return n.deleteVertexArray(T)}function f(T,D,U,N){const F=N.wireframe===!0;let H=i[D.id];H===void 0&&(H={},i[D.id]=H);const W=T.isInstancedMesh===!0?T.id:0;let te=H[W];te===void 0&&(te={},H[W]=te);let K=te[U.id];K===void 0&&(K={},te[U.id]=K);let B=K[F];return B===void 0&&(B=d(h()),K[F]=B),B}function d(T){const D=[],U=[],N=[];for(let F=0;F<t;F++)D[F]=0,U[F]=0,N[F]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:D,enabledAttributes:U,attributeDivisors:N,object:T,attributes:{},index:null}}function p(T,D,U,N){const F=r.attributes,H=D.attributes;let W=0;const te=U.getAttributes();for(const K in te)if(te[K].location>=0){const I=F[K];let q=H[K];if(q===void 0&&(K==="instanceMatrix"&&T.instanceMatrix&&(q=T.instanceMatrix),K==="instanceColor"&&T.instanceColor&&(q=T.instanceColor)),I===void 0||I.attribute!==q||q&&I.data!==q.data)return!0;W++}return r.attributesNum!==W||r.index!==N}function g(T,D,U,N){const F={},H=D.attributes;let W=0;const te=U.getAttributes();for(const K in te)if(te[K].location>=0){let I=H[K];I===void 0&&(K==="instanceMatrix"&&T.instanceMatrix&&(I=T.instanceMatrix),K==="instanceColor"&&T.instanceColor&&(I=T.instanceColor));const q={};q.attribute=I,I&&I.data&&(q.data=I.data),F[K]=q,W++}r.attributes=F,r.attributesNum=W,r.index=N}function v(){const T=r.newAttributes;for(let D=0,U=T.length;D<U;D++)T[D]=0}function x(T){m(T,0)}function m(T,D){const U=r.newAttributes,N=r.enabledAttributes,F=r.attributeDivisors;U[T]=1,N[T]===0&&(n.enableVertexAttribArray(T),N[T]=1),F[T]!==D&&(n.vertexAttribDivisor(T,D),F[T]=D)}function M(){const T=r.newAttributes,D=r.enabledAttributes;for(let U=0,N=D.length;U<N;U++)D[U]!==T[U]&&(n.disableVertexAttribArray(U),D[U]=0)}function S(T,D,U,N,F,H,W){W===!0?n.vertexAttribIPointer(T,D,U,F,H):n.vertexAttribPointer(T,D,U,N,F,H)}function b(T,D,U,N){v();const F=N.attributes,H=U.getAttributes(),W=D.defaultAttributeValues;for(const te in H){const K=H[te];if(K.location>=0){let B=F[te];if(B===void 0&&(te==="instanceMatrix"&&T.instanceMatrix&&(B=T.instanceMatrix),te==="instanceColor"&&T.instanceColor&&(B=T.instanceColor)),B!==void 0){const I=B.normalized,q=B.itemSize,$=e.get(B);if($===void 0)continue;const ce=$.buffer,de=$.type,me=$.bytesPerElement,j=de===n.INT||de===n.UNSIGNED_INT||B.gpuType===nc;if(B.isInterleavedBufferAttribute){const ie=B.data,k=ie.stride,re=B.offset;if(ie.isInstancedInterleavedBuffer){for(let ae=0;ae<K.locationSize;ae++)m(K.location+ae,ie.meshPerAttribute);T.isInstancedMesh!==!0&&N._maxInstanceCount===void 0&&(N._maxInstanceCount=ie.meshPerAttribute*ie.count)}else for(let ae=0;ae<K.locationSize;ae++)x(K.location+ae);n.bindBuffer(n.ARRAY_BUFFER,ce);for(let ae=0;ae<K.locationSize;ae++)S(K.location+ae,q/K.locationSize,de,I,k*me,(re+q/K.locationSize*ae)*me,j)}else{if(B.isInstancedBufferAttribute){for(let ie=0;ie<K.locationSize;ie++)m(K.location+ie,B.meshPerAttribute);T.isInstancedMesh!==!0&&N._maxInstanceCount===void 0&&(N._maxInstanceCount=B.meshPerAttribute*B.count)}else for(let ie=0;ie<K.locationSize;ie++)x(K.location+ie);n.bindBuffer(n.ARRAY_BUFFER,ce);for(let ie=0;ie<K.locationSize;ie++)S(K.location+ie,q/K.locationSize,de,I,q*me,q/K.locationSize*ie*me,j)}}else if(W!==void 0){const I=W[te];if(I!==void 0)switch(I.length){case 2:n.vertexAttrib2fv(K.location,I);break;case 3:n.vertexAttrib3fv(K.location,I);break;case 4:n.vertexAttrib4fv(K.location,I);break;default:n.vertexAttrib1fv(K.location,I)}}}}M()}function A(){E();for(const T in i){const D=i[T];for(const U in D){const N=D[U];for(const F in N){const H=N[F];for(const W in H)u(H[W].object),delete H[W];delete N[F]}}delete i[T]}}function w(T){if(i[T.id]===void 0)return;const D=i[T.id];for(const U in D){const N=D[U];for(const F in N){const H=N[F];for(const W in H)u(H[W].object),delete H[W];delete N[F]}}delete i[T.id]}function L(T){for(const D in i){const U=i[D];for(const N in U){const F=U[N];if(F[T.id]===void 0)continue;const H=F[T.id];for(const W in H)u(H[W].object),delete H[W];delete F[T.id]}}}function _(T){for(const D in i){const U=i[D],N=T.isInstancedMesh===!0?T.id:0,F=U[N];if(F!==void 0){for(const H in F){const W=F[H];for(const te in W)u(W[te].object),delete W[te];delete F[H]}delete U[N],Object.keys(U).length===0&&delete i[D]}}}function E(){P(),a=!0,r!==s&&(r=s,l(r.object))}function P(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:o,reset:E,resetDefaultState:P,dispose:A,releaseStatesOfGeometry:w,releaseStatesOfObject:_,releaseStatesOfProgram:L,initAttributes:v,enableAttribute:x,disableUnusedAttributes:M}}function Jx(n,e,t){let i;function s(h){i=h}function r(h,l){n.drawArrays(i,h,l),t.update(l,i,1)}function a(h,l,u){u!==0&&(n.drawArraysInstanced(i,h,l,u),t.update(l,i,u))}function o(h,l,u){if(u===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,h,0,l,0,u);let d=0;for(let p=0;p<u;p++)d+=l[p];t.update(d,i,1)}this.setMode=s,this.render=r,this.renderInstances=a,this.renderMultiDraw=o}function Qx(n,e,t,i){let s;function r(){if(s!==void 0)return s;if(e.has("EXT_texture_filter_anisotropic")===!0){const L=e.get("EXT_texture_filter_anisotropic");s=n.getParameter(L.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function a(L){return!(L!==Cn&&i.convert(L)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(L){const _=L===di&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(L!==Rn&&L!==oi&&!_&&i.convert(L)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_TYPE))}function h(L){if(L==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";L="mediump"}return L==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=t.precision!==void 0?t.precision:"highp";const u=h(l);u!==l&&(He("WebGLRenderer:",l,"not supported, using",u,"instead."),l=u);const f=t.logarithmicDepthBuffer===!0,d=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control");t.reversedDepthBuffer===!0&&d===!1&&He("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");const p=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),g=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),v=n.getParameter(n.MAX_TEXTURE_SIZE),x=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),m=n.getParameter(n.MAX_VERTEX_ATTRIBS),M=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),S=n.getParameter(n.MAX_VARYING_VECTORS),b=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),A=n.getParameter(n.MAX_SAMPLES),w=n.getParameter(n.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:h,textureFormatReadable:a,textureTypeReadable:o,precision:l,logarithmicDepthBuffer:f,reversedDepthBuffer:d,maxTextures:p,maxVertexTextures:g,maxTextureSize:v,maxCubemapSize:x,maxAttributes:m,maxVertexUniforms:M,maxVaryings:S,maxFragmentUniforms:b,maxSamples:A,samples:w}}function jx(n){const e=this;let t=null,i=0,s=!1,r=!1;const a=new Ui,o=new Ye,h={value:null,needsUpdate:!1};this.uniform=h,this.numPlanes=0,this.numIntersection=0,this.init=function(f,d){const p=f.length!==0||d||i!==0||s;return s=d,i=f.length,p},this.beginShadows=function(){r=!0,u(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(f,d){t=u(f,d,0)},this.setState=function(f,d,p){const g=f.clippingPlanes,v=f.clipIntersection,x=f.clipShadows,m=n.get(f);if(!s||g===null||g.length===0||r&&!x)r?u(null):l();else{const M=r?0:i,S=M*4;let b=m.clippingState||null;h.value=b,b=u(g,d,S,p);for(let A=0;A!==S;++A)b[A]=t[A];m.clippingState=b,this.numIntersection=v?this.numPlanes:0,this.numPlanes+=M}};function l(){h.value!==t&&(h.value=t,h.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function u(f,d,p,g){const v=f!==null?f.length:0;let x=null;if(v!==0){if(x=h.value,g!==!0||x===null){const m=p+v*4,M=d.matrixWorldInverse;o.getNormalMatrix(M),(x===null||x.length<m)&&(x=new Float32Array(m));for(let S=0,b=p;S!==v;++S,b+=4)a.copy(f[S]).applyMatrix4(M,o),a.normal.toArray(x,b),x[b+3]=a.constant}h.value=x,h.needsUpdate=!0}return e.numPlanes=v,e.numIntersection=0,x}}const Os=4,ev=6,tv=20,nv=256,lr=new pc,Mh=new tt;let Lo=null,Po=0,Do=0,Io=!1;const iv=new X,ji=new X;class _h{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,i=.1,s=100,r={}){const{size:a=256,position:o=iv}=r;Lo=this._renderer.getRenderTarget(),Po=this._renderer.getActiveCubeFace(),Do=this._renderer.getActiveMipmapLevel(),Io=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);const h=this._allocateTargets();return h.depthBuffer=!0,this._sceneToCubeUV(e,i,s,h,o),t>0&&this._blur(h,0,0,t),this._applyPMREM(h),this._cleanup(h),h}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=yh(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Sh(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(Lo,Po,Do),this._renderer.xr.enabled=Io,e.scissorTest=!1,Cs(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===us||e.mapping===Vs?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Lo=this._renderer.getRenderTarget(),Po=this._renderer.getActiveCubeFace(),Do=this._renderer.getActiveMipmapLevel(),Io=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=t||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,i={magFilter:zt,minFilter:zt,generateMipmaps:!1,type:di,format:Cn,colorSpace:_r,depthBuffer:!1},s=bh(e,t,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=bh(e,t,i);const{_lodMax:r}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods}=sv(r)),this._blurMaterial=av(r,e,t),this._ggxMaterial=rv(r,e,t)}return s}_compileMaterial(e){const t=new $t(new jt,e);this._renderer.compile(t,lr)}_sceneToCubeUV(e,t,i,s,r){const h=new Tn(90,1,t,i),l=[1,-1,1,1,1,1],u=[1,1,1,-1,-1,-1],f=this._renderer,d=f.autoClear,p=f.toneMapping;f.getClearColor(Mh),f.toneMapping=hi,f.autoClear=!1,f.state.buffers.depth.getReversed()&&(f.setRenderTarget(s),f.clearDepth(),f.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new $t(new Er,new $u({name:"PMREM.Background",side:yn,depthWrite:!1,depthTest:!1})));const v=this._backgroundBox,x=v.material;let m=!1;const M=e.background;M?M.isColor&&(x.color.copy(M),e.background=null,m=!0):(x.color.copy(Mh),m=!0);for(let S=0;S<6;S++){const b=S%3;b===0?(h.up.set(0,l[S],0),h.position.set(r.x,r.y,r.z),h.lookAt(r.x+u[S],r.y,r.z)):b===1?(h.up.set(0,0,l[S]),h.position.set(r.x,r.y,r.z),h.lookAt(r.x,r.y+u[S],r.z)):(h.up.set(0,l[S],0),h.position.set(r.x,r.y,r.z),h.lookAt(r.x,r.y,r.z+u[S]));const A=this._cubeSize;Cs(s,b*A,S>2?A:0,A,A),f.setRenderTarget(s),m&&f.render(v,h),f.render(e,h)}f.toneMapping=p,f.autoClear=d,e.background=M}_textureToCubeUV(e,t){const i=this._renderer,s=e.mapping===us||e.mapping===Vs;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=yh()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Sh());const r=s?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=r;const o=r.uniforms;o.envMap.value=e;const h=this._cubeSize;Cs(t,0,0,3*h,2*h),i.setRenderTarget(t),i.render(a,lr)}_applyPMREM(e){const t=this._renderer,i=t.autoClear;t.autoClear=!1;const s=this._lodMeshes.length;for(let r=1;r<s;r++)this._applyGGXFilter(e,r-1,r);t.autoClear=i}_applyGGXFilter(e,t,i){const s=this._renderer,r=this._pingPongRenderTarget,a=this._ggxMaterial,o=this._lodMeshes[i];o.material=a;const h=a.uniforms,l=i/(this._lodMeshes.length-1),u=t/(this._lodMeshes.length-1),f=Math.sqrt(l*l-u*u),d=l*1.25,p=f*d,{_lodMax:g}=this,v=this._sizeLods[i],x=3*v*(i>g-Os?i-g+Os:0),m=4*(this._cubeSize-v);h.envMap.value=e.texture,h.roughness.value=p,h.mipInt.value=g-t,Cs(r,x,m,3*v,2*v),s.setRenderTarget(r),s.render(o,lr),h.envMap.value=r.texture,h.roughness.value=0,h.mipInt.value=g-i,Cs(e,x,m,3*v,2*v),s.setRenderTarget(e),s.render(o,lr)}_blur(e,t,i,s){const r=this._pingPongRenderTarget,a=Math.min(s,Math.PI)/Math.SQRT2;this._blurPass(e,r,t,i,a),this._blurPass(r,e,i,i,a)}_blurPass(e,t,i,s,r){const a=this._renderer,o=this._blurMaterial,h=this._lodMeshes[s];h.material=o;const l=o.uniforms;l.envMap.value=e.texture,l.sigma.value=r,l.mipInt.value=this._lodMax-i;const u=this._sizeLods[s],f=3*u*(s>this._lodMax-Os?s-this._lodMax+Os:0),d=4*(this._cubeSize-u);Cs(t,f,d,3*u,2*u),a.setRenderTarget(t),a.render(h,lr)}}function sv(n){const e=[],t=[];let i=n;const s=n-Os+1+ev;for(let r=0;r<s;r++){const a=Math.pow(2,i);e.push(a);const o=1/(a-2),h=-o,l=1+o,u=[h,h,l,h,l,l,h,h,l,l,h,l],f=6,d=6,p=3,g=new Float32Array(p*d*f),v=new Float32Array(p*d*f);for(let m=0;m<f;m++){const M=m%3*2/3-1,S=m>2?0:-1,b=[M,S,0,M+2/3,S,0,M+2/3,S+1,0,M,S,0,M+2/3,S+1,0,M,S+1,0];g.set(b,p*d*m);for(let A=0;A<d;A++){const w=u[A*2]*2-1,L=u[A*2+1]*2-1;m===0?ji.set(1,L,w):m===1?ji.set(-w,1,-L):m===2?ji.set(-w,L,1):m===3?ji.set(-1,L,-w):m===4?ji.set(-w,-1,L):ji.set(w,L,-1),ji.toArray(v,(m*d+A)*p)}}const x=new jt;x.setAttribute("position",new Pn(g,p)),x.setAttribute("outputDirection",new Pn(v,p)),t.push(new $t(x,null)),i>Os&&i--}return{lodMeshes:t,sizeLods:e}}function bh(n,e,t){const i=new Fn(n,e,t);return i.texture.mapping=Va,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function Cs(n,e,t,i,s){n.viewport.set(e,t,i,s),n.scissor.set(e,t,i,s)}function rv(n,e,t){return new yt({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:nv,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:Ya(),fragmentShader:`

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
		`,blending:ci,depthTest:!1,depthWrite:!1})}function av(n,e,t){return new yt({name:"SphericalGaussianBlur",defines:{SAMPLES:tv,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},sigma:{value:0},mipInt:{value:0}},vertexShader:Ya(),fragmentShader:`

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
		`,blending:ci,depthTest:!1,depthWrite:!1})}function Sh(){return new yt({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Ya(),fragmentShader:`

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
		`,blending:ci,depthTest:!1,depthWrite:!1})}function yh(){return new yt({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Ya(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:ci,depthTest:!1,depthWrite:!1})}function Ya(){return`

		precision mediump float;
		precision mediump int;

		attribute vec3 outputDirection;

		varying vec3 vOutputDirection;

		void main() {

			vOutputDirection = outputDirection;
			gl_Position = vec4( position, 1.0 );

		}
	`}class sd extends Fn{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const i={width:e,height:e,depth:1},s=[i,i,i,i,i,i];this.texture=new Ju(s),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new Er(5,5,5),r=new yt({name:"CubemapFromEquirect",uniforms:Xs(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:yn,blending:ci});r.uniforms.tEquirect.value=t;const a=new $t(s,r),o=t.minFilter;return t.minFilter===ss&&(t.minFilter=zt),new h1(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,i=!0,s=!0){const r=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,i,s);e.setRenderTarget(r)}}function ov(n){let e=new WeakMap,t=new WeakMap,i=null;function s(d,p=!1){return d==null?null:p?a(d):r(d)}function r(d){if(d&&d.isTexture){const p=d.mapping;if(p===no||p===io)if(e.has(d)){const g=e.get(d).texture;return o(g,d.mapping)}else{const g=d.image;if(g&&g.height>0){const v=new sd(g.height);return v.fromEquirectangularTexture(n,d),e.set(d,v),d.addEventListener("dispose",l),o(v.texture,d.mapping)}else return null}}return d}function a(d){if(d&&d.isTexture){const p=d.mapping,g=p===no||p===io,v=p===us||p===Vs;if(g||v){let x=t.get(d);const m=x!==void 0?x.texture.pmremVersion:0;if(d.isRenderTargetTexture&&d.pmremVersion!==m)return i===null&&(i=new _h(n)),x=g?i.fromEquirectangular(d,x):i.fromCubemap(d,x),x.texture.pmremVersion=d.pmremVersion,t.set(d,x),x.texture;if(x!==void 0)return x.texture;{const M=d.image;return g&&M&&M.height>0||v&&M&&h(M)?(i===null&&(i=new _h(n)),x=g?i.fromEquirectangular(d):i.fromCubemap(d),x.texture.pmremVersion=d.pmremVersion,t.set(d,x),d.addEventListener("dispose",u),x.texture):null}}}return d}function o(d,p){return p===no?d.mapping=us:p===io&&(d.mapping=Vs),d}function h(d){let p=0;const g=6;for(let v=0;v<g;v++)d[v]!==void 0&&p++;return p===g}function l(d){const p=d.target;p.removeEventListener("dispose",l);const g=e.get(p);g!==void 0&&(e.delete(p),g.dispose())}function u(d){const p=d.target;p.removeEventListener("dispose",u);const g=t.get(p);g!==void 0&&(t.delete(p),g.dispose())}function f(){e=new WeakMap,t=new WeakMap,i!==null&&(i.dispose(),i=null)}return{get:s,dispose:f}}function lv(n){const e={};function t(i){if(e[i]!==void 0)return e[i];const s=n.getExtension(i);return e[i]=s,s}return{has:function(i){return t(i)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(i){const s=t(i);return s===null&&ks("WebGLRenderer: "+i+" extension not supported."),s}}}function cv(n,e,t,i){const s={},r=new WeakMap;function a(f){const d=f.target;d.index!==null&&e.remove(d.index);for(const g in d.attributes)e.remove(d.attributes[g]);d.removeEventListener("dispose",a),delete s[d.id];const p=r.get(d);p&&(e.remove(p),r.delete(d)),i.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,t.memory.geometries--}function o(f,d){return s[d.id]===!0||(d.addEventListener("dispose",a),s[d.id]=!0,t.memory.geometries++),d}function h(f){const d=f.attributes;for(const p in d)e.update(d[p],n.ARRAY_BUFFER)}function l(f){const d=[],p=f.index,g=f.attributes.position;let v=0;if(g===void 0)return;if(p!==null){const M=p.array;v=p.version;for(let S=0,b=M.length;S<b;S+=3){const A=M[S+0],w=M[S+1],L=M[S+2];d.push(A,w,w,L,L,A)}}else{const M=g.array;v=g.version;for(let S=0,b=M.length/3-1;S<b;S+=3){const A=S+0,w=S+1,L=S+2;d.push(A,w,w,L,L,A)}}const x=new(g.count>=65535?qu:Ku)(d,1);x.version=v;const m=r.get(f);m&&e.remove(m),r.set(f,x)}function u(f){const d=r.get(f);if(d){const p=f.index;p!==null&&d.version<p.version&&l(f)}else l(f);return r.get(f)}return{get:o,update:h,getWireframeAttribute:u}}function hv(n,e,t){let i;function s(f){i=f}let r,a;function o(f){r=f.type,a=f.bytesPerElement}function h(f,d){n.drawElements(i,d,r,f*a),t.update(d,i,1)}function l(f,d,p){p!==0&&(n.drawElementsInstanced(i,d,r,f*a,p),t.update(d,i,p))}function u(f,d,p){if(p===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,d,0,r,f,0,p);let v=0;for(let x=0;x<p;x++)v+=d[x];t.update(v,i,1)}this.setMode=s,this.setIndex=o,this.render=h,this.renderInstances=l,this.renderMultiDraw=u}function uv(n){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function i(r,a,o){switch(t.calls++,a){case n.TRIANGLES:t.triangles+=o*(r/3);break;case n.LINES:t.lines+=o*(r/2);break;case n.LINE_STRIP:t.lines+=o*(r-1);break;case n.LINE_LOOP:t.lines+=o*r;break;case n.POINTS:t.points+=o*r;break;default:ct("WebGLInfo: Unknown draw mode:",a);break}}function s(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:s,update:i}}function dv(n,e,t){const i=new WeakMap,s=new it;function r(a,o,h){const l=a.morphTargetInfluences,u=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,f=u!==void 0?u.length:0;let d=i.get(o);if(d===void 0||d.count!==f){let E=function(){L.dispose(),i.delete(o),o.removeEventListener("dispose",E)};d!==void 0&&d.texture.dispose();const p=o.morphAttributes.position!==void 0,g=o.morphAttributes.normal!==void 0,v=o.morphAttributes.color!==void 0,x=o.morphAttributes.position||[],m=o.morphAttributes.normal||[],M=o.morphAttributes.color||[];let S=0;p===!0&&(S=1),g===!0&&(S=2),v===!0&&(S=3);let b=o.attributes.position.count*S,A=1;b>e.maxTextureSize&&(A=Math.ceil(b/e.maxTextureSize),b=e.maxTextureSize);const w=new Float32Array(b*A*4*f),L=new Vu(w,b,A,f);L.type=oi,L.needsUpdate=!0;const _=S*4;for(let P=0;P<f;P++){const T=x[P],D=m[P],U=M[P],N=b*A*4*P;for(let F=0;F<T.count;F++){const H=F*_;p===!0&&(s.fromBufferAttribute(T,F),w[N+H+0]=s.x,w[N+H+1]=s.y,w[N+H+2]=s.z,w[N+H+3]=0),g===!0&&(s.fromBufferAttribute(D,F),w[N+H+4]=s.x,w[N+H+5]=s.y,w[N+H+6]=s.z,w[N+H+7]=0),v===!0&&(s.fromBufferAttribute(U,F),w[N+H+8]=s.x,w[N+H+9]=s.y,w[N+H+10]=s.z,w[N+H+11]=U.itemSize===4?s.w:1)}}d={count:f,texture:L,size:new We(b,A)},i.set(o,d),o.addEventListener("dispose",E)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)h.getUniforms().setValue(n,"morphTexture",a.morphTexture,t);else{let p=0;for(let v=0;v<l.length;v++)p+=l[v];const g=o.morphTargetsRelative?1:1-p;h.getUniforms().setValue(n,"morphTargetBaseInfluence",g),h.getUniforms().setValue(n,"morphTargetInfluences",l)}h.getUniforms().setValue(n,"morphTargetsTexture",d.texture,t),h.getUniforms().setValue(n,"morphTargetsTextureSize",d.size)}return{update:r}}function fv(n,e,t,i,s){let r=new WeakMap;function a(l){const u=s.render.frame,f=l.geometry,d=e.get(l,f);if(r.get(d)!==u&&(e.update(d),r.set(d,u)),l.isInstancedMesh&&(l.hasEventListener("dispose",h)===!1&&l.addEventListener("dispose",h),r.get(l)!==u&&(t.update(l.instanceMatrix,n.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,n.ARRAY_BUFFER),r.set(l,u))),l.isSkinnedMesh){const p=l.skeleton;r.get(p)!==u&&(p.update(),r.set(p,u))}return d}function o(){r=new WeakMap}function h(l){const u=l.target;u.removeEventListener("dispose",h),i.releaseStatesOfObject(u),t.remove(u.instanceMatrix),u.instanceColor!==null&&t.remove(u.instanceColor)}return{update:a,dispose:o}}const pv={[Ru]:"LINEAR_TONE_MAPPING",[Cu]:"REINHARD_TONE_MAPPING",[Lu]:"CINEON_TONE_MAPPING",[Pu]:"ACES_FILMIC_TONE_MAPPING",[Iu]:"AGX_TONE_MAPPING",[Nu]:"NEUTRAL_TONE_MAPPING",[Du]:"CUSTOM_TONE_MAPPING"};function mv(n,e,t,i,s,r){const a=new Fn(e,t,{type:n,depthBuffer:s,stencilBuffer:r,samples:i?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1});let o=null,h=null;const l=new jt;l.setAttribute("position",new Nt([-1,3,0,-1,-1,0,3,-1,0],3)),l.setAttribute("uv",new Nt([0,2,0,0,2,0],2));const u=new o1({uniforms:{tDiffuse:{value:null}},vertexShader:`
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
			}`,depthTest:!1,depthWrite:!1}),f=new $t(l,u),d=new pc(-1,1,1,-1,0,1);let p=null,g=null,v=!1,x,m=null,M=[],S=!1;this.setSize=function(b,A){a.setSize(b,A),o!==null&&o.setSize(b,A),h!==null&&h.setSize(b,A);for(let w=0;w<M.length;w++){const L=M[w];L.setSize&&L.setSize(b,A)}},this.setEffects=function(b){M=b,S=M.length>0&&M[0].isRenderPass===!0;const A=a.width,w=a.height;M.length>0&&o===null&&(o=new Fn(A,w,{type:di,depthBuffer:!1,stencilBuffer:!1}),h=new Fn(A,w,{type:di,depthBuffer:!1,stencilBuffer:!1}));for(let L=0;L<M.length;L++){const _=M[L];_.setSize&&_.setSize(A,w)}},this.begin=function(b,A){if(v||b.toneMapping===hi&&M.length===0)return!1;if(m=A,A!==null){const w=A.width,L=A.height;(a.width!==w||a.height!==L)&&this.setSize(w,L)}return S===!1&&b.setRenderTarget(a),x=b.toneMapping,b.toneMapping=hi,!0},this.hasRenderPass=function(){return S},this.end=function(b,A){b.toneMapping=x,v=!0;let w=a,L=o;for(let _=0;_<M.length;_++){const E=M[_];E.enabled!==!1&&(E.render(b,L,w,A),E.needsSwap!==!1&&(w=L,L=L===o?h:o))}if(p!==b.outputColorSpace||g!==b.toneMapping){p=b.outputColorSpace,g=b.toneMapping,u.defines={},st.getTransfer(p)===vt&&(u.defines.SRGB_TRANSFER="");const _=pv[g];_&&(u.defines[_]=""),u.needsUpdate=!0}u.uniforms.tDiffuse.value=w.texture,b.setRenderTarget(m),b.render(f,d),m=null,v=!1},this.isCompositing=function(){return v},this.dispose=function(){a.dispose(),o!==null&&o.dispose(),h!==null&&h.dispose(),l.dispose(),u.dispose()}}const rd=new fn,Ul=new Ys(1,1),ad=new Vu,od=new Fg,ld=new Ju,wh=[],Eh=[],Ah=new Float32Array(16),Th=new Float32Array(9),Rh=new Float32Array(4);function Js(n,e,t){const i=n[0];if(i<=0||i>0)return n;const s=e*t;let r=wh[s];if(r===void 0&&(r=new Float32Array(s),wh[s]=r),e!==0){i.toArray(r,0);for(let a=1,o=0;a!==e;++a)o+=t,n[a].toArray(r,o)}return r}function en(n,e){if(n.length!==e.length)return!1;for(let t=0,i=n.length;t<i;t++)if(n[t]!==e[t])return!1;return!0}function tn(n,e){for(let t=0,i=e.length;t<i;t++)n[t]=e[t]}function Xa(n,e){let t=Eh[e];t===void 0&&(t=new Int32Array(e),Eh[e]=t);for(let i=0;i!==e;++i)t[i]=n.allocateTextureUnit();return t}function gv(n,e){const t=this.cache;t[0]!==e&&(n.uniform1f(this.addr,e),t[0]=e)}function xv(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(en(t,e))return;n.uniform2fv(this.addr,e),tn(t,e)}}function vv(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(n.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(en(t,e))return;n.uniform3fv(this.addr,e),tn(t,e)}}function Mv(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(en(t,e))return;n.uniform4fv(this.addr,e),tn(t,e)}}function _v(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(en(t,e))return;n.uniformMatrix2fv(this.addr,!1,e),tn(t,e)}else{if(en(t,i))return;Rh.set(i),n.uniformMatrix2fv(this.addr,!1,Rh),tn(t,i)}}function bv(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(en(t,e))return;n.uniformMatrix3fv(this.addr,!1,e),tn(t,e)}else{if(en(t,i))return;Th.set(i),n.uniformMatrix3fv(this.addr,!1,Th),tn(t,i)}}function Sv(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(en(t,e))return;n.uniformMatrix4fv(this.addr,!1,e),tn(t,e)}else{if(en(t,i))return;Ah.set(i),n.uniformMatrix4fv(this.addr,!1,Ah),tn(t,i)}}function yv(n,e){const t=this.cache;t[0]!==e&&(n.uniform1i(this.addr,e),t[0]=e)}function wv(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(en(t,e))return;n.uniform2iv(this.addr,e),tn(t,e)}}function Ev(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(en(t,e))return;n.uniform3iv(this.addr,e),tn(t,e)}}function Av(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(en(t,e))return;n.uniform4iv(this.addr,e),tn(t,e)}}function Tv(n,e){const t=this.cache;t[0]!==e&&(n.uniform1ui(this.addr,e),t[0]=e)}function Rv(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(en(t,e))return;n.uniform2uiv(this.addr,e),tn(t,e)}}function Cv(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(en(t,e))return;n.uniform3uiv(this.addr,e),tn(t,e)}}function Lv(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(en(t,e))return;n.uniform4uiv(this.addr,e),tn(t,e)}}function Pv(n,e,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s);let r;this.type===n.SAMPLER_2D_SHADOW?(Ul.compareFunction=t.isReversedDepthBuffer()?cc:lc,r=Ul):r=rd,t.setTexture2D(e||r,s)}function Dv(n,e,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),t.setTexture3D(e||od,s)}function Iv(n,e,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),t.setTextureCube(e||ld,s)}function Nv(n,e,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),t.setTexture2DArray(e||ad,s)}function Ov(n){switch(n){case 5126:return gv;case 35664:return xv;case 35665:return vv;case 35666:return Mv;case 35674:return _v;case 35675:return bv;case 35676:return Sv;case 5124:case 35670:return yv;case 35667:case 35671:return wv;case 35668:case 35672:return Ev;case 35669:case 35673:return Av;case 5125:return Tv;case 36294:return Rv;case 36295:return Cv;case 36296:return Lv;case 35678:case 36198:case 36298:case 36306:case 35682:return Pv;case 35679:case 36299:case 36307:return Dv;case 35680:case 36300:case 36308:case 36293:return Iv;case 36289:case 36303:case 36311:case 36292:return Nv}}function Uv(n,e){n.uniform1fv(this.addr,e)}function Fv(n,e){const t=Js(e,this.size,2);n.uniform2fv(this.addr,t)}function Bv(n,e){const t=Js(e,this.size,3);n.uniform3fv(this.addr,t)}function kv(n,e){const t=Js(e,this.size,4);n.uniform4fv(this.addr,t)}function zv(n,e){const t=Js(e,this.size,4);n.uniformMatrix2fv(this.addr,!1,t)}function Gv(n,e){const t=Js(e,this.size,9);n.uniformMatrix3fv(this.addr,!1,t)}function Hv(n,e){const t=Js(e,this.size,16);n.uniformMatrix4fv(this.addr,!1,t)}function Wv(n,e){n.uniform1iv(this.addr,e)}function Vv(n,e){n.uniform2iv(this.addr,e)}function Yv(n,e){n.uniform3iv(this.addr,e)}function Xv(n,e){n.uniform4iv(this.addr,e)}function Kv(n,e){n.uniform1uiv(this.addr,e)}function qv(n,e){n.uniform2uiv(this.addr,e)}function $v(n,e){n.uniform3uiv(this.addr,e)}function Zv(n,e){n.uniform4uiv(this.addr,e)}function Jv(n,e,t){const i=this.cache,s=e.length,r=Xa(t,s);en(i,r)||(n.uniform1iv(this.addr,r),tn(i,r));let a;this.type===n.SAMPLER_2D_SHADOW?a=Ul:a=rd;for(let o=0;o!==s;++o)t.setTexture2D(e[o]||a,r[o])}function Qv(n,e,t){const i=this.cache,s=e.length,r=Xa(t,s);en(i,r)||(n.uniform1iv(this.addr,r),tn(i,r));for(let a=0;a!==s;++a)t.setTexture3D(e[a]||od,r[a])}function jv(n,e,t){const i=this.cache,s=e.length,r=Xa(t,s);en(i,r)||(n.uniform1iv(this.addr,r),tn(i,r));for(let a=0;a!==s;++a)t.setTextureCube(e[a]||ld,r[a])}function eM(n,e,t){const i=this.cache,s=e.length,r=Xa(t,s);en(i,r)||(n.uniform1iv(this.addr,r),tn(i,r));for(let a=0;a!==s;++a)t.setTexture2DArray(e[a]||ad,r[a])}function tM(n){switch(n){case 5126:return Uv;case 35664:return Fv;case 35665:return Bv;case 35666:return kv;case 35674:return zv;case 35675:return Gv;case 35676:return Hv;case 5124:case 35670:return Wv;case 35667:case 35671:return Vv;case 35668:case 35672:return Yv;case 35669:case 35673:return Xv;case 5125:return Kv;case 36294:return qv;case 36295:return $v;case 36296:return Zv;case 35678:case 36198:case 36298:case 36306:case 35682:return Jv;case 35679:case 36299:case 36307:return Qv;case 35680:case 36300:case 36308:case 36293:return jv;case 36289:case 36303:case 36311:case 36292:return eM}}class nM{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.setValue=Ov(t.type)}}class iM{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=tM(t.type)}}class sM{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,i){const s=this.seq;for(let r=0,a=s.length;r!==a;++r){const o=s[r];o.setValue(e,t[o.id],i)}}}const No=/(\w+)(\])?(\[|\.)?/g;function Ch(n,e){n.seq.push(e),n.map[e.id]=e}function rM(n,e,t){const i=n.name,s=i.length;for(No.lastIndex=0;;){const r=No.exec(i),a=No.lastIndex;let o=r[1];const h=r[2]==="]",l=r[3];if(h&&(o=o|0),l===void 0||l==="["&&a+2===s){Ch(t,l===void 0?new nM(o,n,e):new iM(o,n,e));break}else{let f=t.map[o];f===void 0&&(f=new sM(o),Ch(t,f)),t=f}}}class va{constructor(e,t){this.seq=[],this.map={};const i=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let a=0;a<i;++a){const o=e.getActiveUniform(t,a),h=e.getUniformLocation(t,o.name);rM(o,h,this)}const s=[],r=[];for(const a of this.seq)a.type===e.SAMPLER_2D_SHADOW||a.type===e.SAMPLER_CUBE_SHADOW||a.type===e.SAMPLER_2D_ARRAY_SHADOW?s.push(a):r.push(a);s.length>0&&(this.seq=s.concat(r))}setValue(e,t,i,s){const r=this.map[t];r!==void 0&&r.setValue(e,i,s)}setOptional(e,t,i){const s=t[i];s!==void 0&&this.setValue(e,i,s)}static upload(e,t,i,s){for(let r=0,a=t.length;r!==a;++r){const o=t[r],h=i[o.id];h.needsUpdate!==!1&&o.setValue(e,h.value,s)}}static seqWithValue(e,t){const i=[];for(let s=0,r=e.length;s!==r;++s){const a=e[s];a.id in t&&i.push(a)}return i}}function Lh(n,e,t){const i=n.createShader(e);return n.shaderSource(i,t),n.compileShader(i),i}const aM=37297;let oM=0;function lM(n,e){const t=n.split(`
`),i=[],s=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let a=s;a<r;a++){const o=a+1;i.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return i.join(`
`)}const Ph=new Ye;function cM(n){st._getMatrix(Ph,st.workingColorSpace,n);const e=`mat3( ${Ph.elements.map(t=>t.toFixed(4))} )`;switch(st.getTransfer(n)){case Aa:return[e,"LinearTransferOETF"];case vt:return[e,"sRGBTransferOETF"];default:return He("WebGLProgram: Unsupported color space: ",n),[e,"LinearTransferOETF"]}}function Dh(n,e,t){const i=n.getShaderParameter(e,n.COMPILE_STATUS),r=(n.getShaderInfoLog(e)||"").trim();if(i&&r==="")return"";const a=/ERROR: 0:(\d+)/.exec(r);if(a){const o=parseInt(a[1]);return t.toUpperCase()+`

`+r+`

`+lM(n.getShaderSource(e),o)}else return r}function hM(n,e){const t=cM(e);return[`vec4 ${n}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}const uM={[Ru]:"Linear",[Cu]:"Reinhard",[Lu]:"Cineon",[Pu]:"ACESFilmic",[Iu]:"AgX",[Nu]:"Neutral",[Du]:"Custom"};function dM(n,e){const t=uM[e];return t===void 0?(He("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+n+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+n+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const ia=new X;function fM(){st.getLuminanceCoefficients(ia);const n=ia.x.toFixed(4),e=ia.y.toFixed(4),t=ia.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${n}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function pM(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",n.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(pr).join(`
`)}function mM(n){const e=[];for(const t in n){const i=n[t];i!==!1&&e.push("#define "+t+" "+i)}return e.join(`
`)}function gM(n,e){const t={},i=n.getProgramParameter(e,n.ACTIVE_ATTRIBUTES);for(let s=0;s<i;s++){const r=n.getActiveAttrib(e,s),a=r.name;let o=1;r.type===n.FLOAT_MAT2&&(o=2),r.type===n.FLOAT_MAT3&&(o=3),r.type===n.FLOAT_MAT4&&(o=4),t[a]={type:r.type,location:n.getAttribLocation(e,a),locationSize:o}}return t}function pr(n){return n!==""}function Ih(n,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return n.replace(/NUM_SUN_LIGHTS/g,e.numSunLights).replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,e.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Nh(n,e){return n.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const xM=/^[ \t]*#include +<([\w\d./]+)>/gm;function Fl(n){return n.replace(xM,MM)}const vM=new Map;function MM(n,e){let t=et[e];if(t===void 0){const i=vM.get(e);if(i!==void 0)t=et[i],He('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,i);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+e+">")}return Fl(t)}const _M=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Oh(n){return n.replace(_M,bM)}function bM(n,e,t,i){let s="";for(let r=parseInt(e);r<parseInt(t);r++)s+=i.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function Uh(n){let e=`precision ${n.precision} float;
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
#define LOW_PRECISION`),e}const SM={[fa]:"SHADOWMAP_TYPE_PCF",[dr]:"SHADOWMAP_TYPE_VSM"};function yM(n){return SM[n.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const wM={[us]:"ENVMAP_TYPE_CUBE",[Vs]:"ENVMAP_TYPE_CUBE",[Va]:"ENVMAP_TYPE_CUBE_UV"};function EM(n){return n.envMap===!1?"ENVMAP_TYPE_CUBE":wM[n.envMapMode]||"ENVMAP_TYPE_CUBE"}const AM={[Vs]:"ENVMAP_MODE_REFRACTION"};function TM(n){return n.envMap===!1?"ENVMAP_MODE_REFLECTION":AM[n.envMapMode]||"ENVMAP_MODE_REFLECTION"}const RM={[Tu]:"ENVMAP_BLENDING_MULTIPLY",[pg]:"ENVMAP_BLENDING_MIX",[mg]:"ENVMAP_BLENDING_ADD"};function CM(n){return n.envMap===!1?"ENVMAP_BLENDING_NONE":RM[n.combine]||"ENVMAP_BLENDING_NONE"}function LM(n){const e=n.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,i=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:i,maxMip:t}}function PM(n,e,t,i){const s=n.getContext(),r=t.defines;let a=t.vertexShader,o=t.fragmentShader;const h=yM(t),l=EM(t),u=TM(t),f=CM(t),d=LM(t),p=pM(t),g=mM(r),v=s.createProgram();let x,m,M=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(x=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(pr).join(`
`),x.length>0&&(x+=`
`),m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(pr).join(`
`),m.length>0&&(m+=`
`)):(x=[Uh(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexNormals?"#define HAS_NORMAL":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+h:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(pr).join(`
`),m=[Uh(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+l:"",t.envMap?"#define "+u:"",t.envMap?"#define "+f:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.retroreflection?"#define USE_RETROREFLECTION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas||t.batchingColor?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+h:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==hi?"#define TONE_MAPPING":"",t.toneMapping!==hi?et.tonemapping_pars_fragment:"",t.toneMapping!==hi?dM("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",et.colorspace_pars_fragment,hM("linearToOutputTexel",t.outputColorSpace),fM(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(pr).join(`
`)),a=Fl(a),a=Ih(a,t),a=Nh(a,t),o=Fl(o),o=Ih(o,t),o=Nh(o,t),a=Oh(a),o=Oh(o),t.isRawShaderMaterial!==!0&&(M=`#version 300 es
`,x=[p,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+x,m=["#define varying in",t.glslVersion===Yc?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Yc?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+m);const S=M+x+a,b=M+m+o,A=Lh(s,s.VERTEX_SHADER,S),w=Lh(s,s.FRAGMENT_SHADER,b);s.attachShader(v,A),s.attachShader(v,w),t.index0AttributeName!==void 0?s.bindAttribLocation(v,0,t.index0AttributeName):t.hasPositionAttribute===!0&&s.bindAttribLocation(v,0,"position"),s.linkProgram(v);function L(T){if(n.debug.checkShaderErrors){const D=s.getProgramInfoLog(v)||"",U=s.getShaderInfoLog(A)||"",N=s.getShaderInfoLog(w)||"",F=D.trim(),H=U.trim(),W=N.trim();let te=!0,K=!0;if(s.getProgramParameter(v,s.LINK_STATUS)===!1)if(te=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(s,v,A,w);else{const B=Dh(s,A,"vertex"),I=Dh(s,w,"fragment");ct("WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(v,s.VALIDATE_STATUS)+`

Material Name: `+T.name+`
Material Type: `+T.type+`

Program Info Log: `+F+`
`+B+`
`+I)}else F!==""?He("WebGLProgram: Program Info Log:",F):(H===""||W==="")&&(K=!1);K&&(T.diagnostics={runnable:te,programLog:F,vertexShader:{log:H,prefix:x},fragmentShader:{log:W,prefix:m}})}s.deleteShader(A),s.deleteShader(w),_=new va(s,v),E=gM(s,v)}let _;this.getUniforms=function(){return _===void 0&&L(this),_};let E;this.getAttributes=function(){return E===void 0&&L(this),E};let P=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return P===!1&&(P=s.getProgramParameter(v,aM)),P},this.destroy=function(){i.releaseStatesOfProgram(this),s.deleteProgram(v),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=oM++,this.cacheKey=e,this.usedTimes=1,this.program=v,this.vertexShader=A,this.fragmentShader=w,this}let DM=0;class IM{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,i){const s=this._getShaderCacheForMaterial(e);return s.has(t)===!1&&(s.add(t),t.usedTimes++),s.has(i)===!1&&(s.add(i),i.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const i of t)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let i=t.get(e);return i===void 0&&(i=new Set,t.set(e,i)),i}_getShaderStage(e){const t=this.shaderCache;let i=t.get(e);return i===void 0&&(i=new NM(e),t.set(e,i)),i}}class NM{constructor(e){this.id=DM++,this.code=e,this.usedTimes=0}}function OM(n){return n===ds||n===wa||n===Ea}function UM(n,e,t,i,s,r){const a=new Yu,o=new IM,h=new Set,l=[],u=new Map,f=i.logarithmicDepthBuffer;let d=i.precision;const p={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function g(_){return h.add(_),_===0?"uv":`uv${_}`}function v(_,E,P,T,D,U){const N=T.fog,F=D.geometry,H=_.isMeshStandardMaterial||_.isMeshLambertMaterial||_.isMeshPhongMaterial?T.environment:null,W=_.isMeshStandardMaterial||_.isMeshLambertMaterial&&!_.envMap||_.isMeshPhongMaterial&&!_.envMap,te=e.get(_.envMap||H,W),K=te&&te.mapping===Va?te.image.height:null,B=p[_.type];_.precision!==null&&(d=i.getMaxPrecision(_.precision),d!==_.precision&&He("WebGLProgram.getParameters:",_.precision,"not supported, using",d,"instead."));const I=F.morphAttributes.position||F.morphAttributes.normal||F.morphAttributes.color,q=I!==void 0?I.length:0;let $=0;F.morphAttributes.position!==void 0&&($=1),F.morphAttributes.normal!==void 0&&($=2),F.morphAttributes.color!==void 0&&($=3);let ce,de,me,j;if(B){const Tt=ri[B];ce=Tt.vertexShader,de=Tt.fragmentShader}else{ce=_.vertexShader,de=_.fragmentShader;const Tt=o.getVertexShaderStage(_),dt=o.getFragmentShaderStage(_);o.update(_,Tt,dt),me=Tt.id,j=dt.id}const ie=n.getRenderTarget(),k=n.state.buffers.depth.getReversed(),re=D.isInstancedMesh===!0,ae=D.isBatchedMesh===!0,ge=!!_.map,ke=!!_.matcap,Ce=!!te,Fe=!!_.aoMap,qe=!!_.lightMap,Ke=!!_.bumpMap&&_.wireframe===!1,wt=!!_.normalMap,Ut=!!_.displacementMap,nn=!!_.emissiveMap,_t=!!_.metalnessMap,Et=!!_.roughnessMap,V=_.anisotropy>0,Qe=_.clearcoat>0,Ge=_.dispersion>0,O=_.retroreflectivity>0,y=_.iridescence>0,z=_.sheen>0,Z=_.transmission>0,ee=V&&!!_.anisotropyMap,ue=Qe&&!!_.clearcoatMap,fe=Qe&&!!_.clearcoatNormalMap,se=Qe&&!!_.clearcoatRoughnessMap,oe=y&&!!_.iridescenceMap,pe=y&&!!_.iridescenceThicknessMap,De=z&&!!_.sheenColorMap,be=z&&!!_.sheenRoughnessMap,xe=!!_.specularMap,Oe=!!_.specularColorMap,ze=!!_.specularIntensityMap,$e=Z&&!!_.transmissionMap,Y=Z&&!!_.thicknessMap,ve=!!_.gradientMap,le=!!_.alphaMap,Me=_.alphaTest>0,Ee=!!_.alphaHash,he=!!_.extensions;let Ue=hi;_.toneMapped&&(ie===null||ie.isXRRenderTarget===!0)&&(Ue=n.toneMapping);const Ie={shaderID:B,shaderType:_.type,shaderName:_.name,vertexShader:ce,fragmentShader:de,defines:_.defines,customVertexShaderID:me,customFragmentShaderID:j,isRawShaderMaterial:_.isRawShaderMaterial===!0,glslVersion:_.glslVersion,precision:d,batching:ae,batchingColor:ae&&D._colorsTexture!==null,instancing:re,instancingColor:re&&D.instanceColor!==null,instancingMorph:re&&D.morphTexture!==null,outputColorSpace:ie===null?n.outputColorSpace:ie.isXRRenderTarget===!0?ie.texture.colorSpace:st.workingColorSpace,alphaToCoverage:!!_.alphaToCoverage,map:ge,matcap:ke,envMap:Ce,envMapMode:Ce&&te.mapping,envMapCubeUVHeight:K,aoMap:Fe,lightMap:qe,bumpMap:Ke,normalMap:wt,displacementMap:Ut,emissiveMap:nn,normalMapObjectSpace:wt&&_.normalMapType===vg,normalMapTangentSpace:wt&&_.normalMapType===Vc,packedNormalMap:wt&&_.normalMapType===Vc&&OM(_.normalMap.format),metalnessMap:_t,roughnessMap:Et,anisotropy:V,anisotropyMap:ee,clearcoat:Qe,clearcoatMap:ue,clearcoatNormalMap:fe,clearcoatRoughnessMap:se,dispersion:Ge,retroreflection:O,iridescence:y,iridescenceMap:oe,iridescenceThicknessMap:pe,sheen:z,sheenColorMap:De,sheenRoughnessMap:be,specularMap:xe,specularColorMap:Oe,specularIntensityMap:ze,transmission:Z,transmissionMap:$e,thicknessMap:Y,gradientMap:ve,opaque:_.transparent===!1&&_.blending===Fs&&_.alphaToCoverage===!1,alphaMap:le,alphaTest:Me,alphaHash:Ee,combine:_.combine,mapUv:ge&&g(_.map.channel),aoMapUv:Fe&&g(_.aoMap.channel),lightMapUv:qe&&g(_.lightMap.channel),bumpMapUv:Ke&&g(_.bumpMap.channel),normalMapUv:wt&&g(_.normalMap.channel),displacementMapUv:Ut&&g(_.displacementMap.channel),emissiveMapUv:nn&&g(_.emissiveMap.channel),metalnessMapUv:_t&&g(_.metalnessMap.channel),roughnessMapUv:Et&&g(_.roughnessMap.channel),anisotropyMapUv:ee&&g(_.anisotropyMap.channel),clearcoatMapUv:ue&&g(_.clearcoatMap.channel),clearcoatNormalMapUv:fe&&g(_.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:se&&g(_.clearcoatRoughnessMap.channel),iridescenceMapUv:oe&&g(_.iridescenceMap.channel),iridescenceThicknessMapUv:pe&&g(_.iridescenceThicknessMap.channel),sheenColorMapUv:De&&g(_.sheenColorMap.channel),sheenRoughnessMapUv:be&&g(_.sheenRoughnessMap.channel),specularMapUv:xe&&g(_.specularMap.channel),specularColorMapUv:Oe&&g(_.specularColorMap.channel),specularIntensityMapUv:ze&&g(_.specularIntensityMap.channel),transmissionMapUv:$e&&g(_.transmissionMap.channel),thicknessMapUv:Y&&g(_.thicknessMap.channel),alphaMapUv:le&&g(_.alphaMap.channel),vertexTangents:!!F.attributes.tangent&&(wt||V),vertexNormals:!!F.attributes.normal,vertexColors:_.vertexColors,vertexAlphas:_.vertexColors===!0&&!!F.attributes.color&&F.attributes.color.itemSize===4,pointsUvs:D.isPoints===!0&&!!F.attributes.uv&&(ge||le),fog:!!N,useFog:_.fog===!0,fogExp2:!!N&&N.isFogExp2,flatShading:_.wireframe===!1&&(_.flatShading===!0||F.attributes.normal===void 0&&wt===!1&&(_.isMeshLambertMaterial||_.isMeshPhongMaterial||_.isMeshStandardMaterial||_.isMeshPhysicalMaterial)),sizeAttenuation:_.sizeAttenuation===!0,logarithmicDepthBuffer:f,reversedDepthBuffer:k,skinning:D.isSkinnedMesh===!0,hasPositionAttribute:F.attributes.position!==void 0,morphTargets:F.morphAttributes.position!==void 0,morphNormals:F.morphAttributes.normal!==void 0,morphColors:F.morphAttributes.color!==void 0,morphTargetsCount:q,morphTextureStride:$,numSunLights:E.sun.length,numDirLights:E.directional.length,numPointLights:E.point.length,numSpotLights:E.spot.length,numSpotLightMaps:E.spotLightMap.length,numRectAreaLights:E.rectArea.length,numHemiLights:E.hemi.length,numSunLightShadows:E.sunShadowMap.length,numDirLightShadows:E.directionalShadowMap.length,numPointLightShadows:E.pointShadowMap.length,numSpotLightShadows:E.spotShadowMap.length,numSpotLightShadowsWithMaps:E.numSpotLightShadowsWithMaps,numLightProbes:E.numLightProbes,numLightProbeGrids:U.length,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:_.dithering,shadowMapEnabled:n.shadowMap.enabled&&P.length>0,shadowMapType:n.shadowMap.type,toneMapping:Ue,decodeVideoTexture:ge&&_.map.isVideoTexture===!0&&st.getTransfer(_.map.colorSpace)===vt,decodeVideoTextureEmissive:nn&&_.emissiveMap.isVideoTexture===!0&&st.getTransfer(_.emissiveMap.colorSpace)===vt,premultipliedAlpha:_.premultipliedAlpha,doubleSided:_.side===bi,flipSided:_.side===yn,useDepthPacking:_.depthPacking>=0,depthPacking:_.depthPacking||0,index0AttributeName:_.index0AttributeName,extensionClipCullDistance:he&&_.extensions.clipCullDistance===!0&&t.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(he&&_.extensions.multiDraw===!0||ae)&&t.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:t.has("KHR_parallel_shader_compile"),customProgramCacheKey:_.customProgramCacheKey()};return Ie.vertexUv1s=h.has(1),Ie.vertexUv2s=h.has(2),Ie.vertexUv3s=h.has(3),h.clear(),Ie}function x(_){const E=[];if(_.shaderID?E.push(_.shaderID):(E.push(_.customVertexShaderID),E.push(_.customFragmentShaderID)),_.defines!==void 0)for(const P in _.defines)E.push(P),E.push(_.defines[P]);return _.isRawShaderMaterial===!1&&(m(E,_),M(E,_),E.push(n.outputColorSpace)),E.push(_.customProgramCacheKey),E.join()}function m(_,E){_.push(E.precision),_.push(E.outputColorSpace),_.push(E.envMapMode),_.push(E.envMapCubeUVHeight),_.push(E.mapUv),_.push(E.alphaMapUv),_.push(E.lightMapUv),_.push(E.aoMapUv),_.push(E.bumpMapUv),_.push(E.normalMapUv),_.push(E.displacementMapUv),_.push(E.emissiveMapUv),_.push(E.metalnessMapUv),_.push(E.roughnessMapUv),_.push(E.anisotropyMapUv),_.push(E.clearcoatMapUv),_.push(E.clearcoatNormalMapUv),_.push(E.clearcoatRoughnessMapUv),_.push(E.iridescenceMapUv),_.push(E.iridescenceThicknessMapUv),_.push(E.sheenColorMapUv),_.push(E.sheenRoughnessMapUv),_.push(E.specularMapUv),_.push(E.specularColorMapUv),_.push(E.specularIntensityMapUv),_.push(E.transmissionMapUv),_.push(E.thicknessMapUv),_.push(E.combine),_.push(E.fogExp2),_.push(E.sizeAttenuation),_.push(E.morphTargetsCount),_.push(E.morphAttributeCount),_.push(E.numSunLights),_.push(E.numDirLights),_.push(E.numPointLights),_.push(E.numSpotLights),_.push(E.numSpotLightMaps),_.push(E.numHemiLights),_.push(E.numRectAreaLights),_.push(E.numSunLightShadows),_.push(E.numDirLightShadows),_.push(E.numPointLightShadows),_.push(E.numSpotLightShadows),_.push(E.numSpotLightShadowsWithMaps),_.push(E.numLightProbes),_.push(E.shadowMapType),_.push(E.toneMapping),_.push(E.numClippingPlanes),_.push(E.numClipIntersection),_.push(E.depthPacking)}function M(_,E){a.disableAll(),E.instancing&&a.enable(0),E.instancingColor&&a.enable(1),E.instancingMorph&&a.enable(2),E.matcap&&a.enable(3),E.envMap&&a.enable(4),E.normalMapObjectSpace&&a.enable(5),E.normalMapTangentSpace&&a.enable(6),E.clearcoat&&a.enable(7),E.iridescence&&a.enable(8),E.alphaTest&&a.enable(9),E.vertexColors&&a.enable(10),E.vertexAlphas&&a.enable(11),E.vertexUv1s&&a.enable(12),E.vertexUv2s&&a.enable(13),E.vertexUv3s&&a.enable(14),E.vertexTangents&&a.enable(15),E.anisotropy&&a.enable(16),E.alphaHash&&a.enable(17),E.batching&&a.enable(18),E.dispersion&&a.enable(19),E.retroreflection&&a.enable(24),E.batchingColor&&a.enable(20),E.gradientMap&&a.enable(21),E.packedNormalMap&&a.enable(22),E.vertexNormals&&a.enable(23),_.push(a.mask),a.disableAll(),E.fog&&a.enable(0),E.useFog&&a.enable(1),E.flatShading&&a.enable(2),E.logarithmicDepthBuffer&&a.enable(3),E.reversedDepthBuffer&&a.enable(4),E.skinning&&a.enable(5),E.morphTargets&&a.enable(6),E.morphNormals&&a.enable(7),E.morphColors&&a.enable(8),E.premultipliedAlpha&&a.enable(9),E.shadowMapEnabled&&a.enable(10),E.doubleSided&&a.enable(11),E.flipSided&&a.enable(12),E.useDepthPacking&&a.enable(13),E.dithering&&a.enable(14),E.transmission&&a.enable(15),E.sheen&&a.enable(16),E.opaque&&a.enable(17),E.pointsUvs&&a.enable(18),E.decodeVideoTexture&&a.enable(19),E.decodeVideoTextureEmissive&&a.enable(20),E.alphaToCoverage&&a.enable(21),E.numLightProbeGrids>0&&a.enable(22),E.hasPositionAttribute&&a.enable(23),_.push(a.mask)}function S(_){const E=p[_.type];let P;if(E){const T=ri[E];P=s1.clone(T.uniforms)}else P=_.uniforms;return P}function b(_,E){let P=u.get(E);return P!==void 0?++P.usedTimes:(P=new PM(n,E,_,s),l.push(P),u.set(E,P)),P}function A(_){if(--_.usedTimes===0){const E=l.indexOf(_);l[E]=l[l.length-1],l.pop(),u.delete(_.cacheKey),_.destroy()}}function w(_){o.remove(_)}function L(){o.dispose()}return{getParameters:v,getProgramCacheKey:x,getUniforms:S,acquireProgram:b,releaseProgram:A,releaseShaderCache:w,programs:l,dispose:L}}function FM(){let n=new WeakMap;function e(a){return n.has(a)}function t(a){let o=n.get(a);return o===void 0&&(o={},n.set(a,o)),o}function i(a){n.delete(a)}function s(a,o,h){n.get(a)[o]=h}function r(){n=new WeakMap}return{has:e,get:t,remove:i,update:s,dispose:r}}function BM(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.material.id!==e.material.id?n.material.id-e.material.id:n.materialVariant!==e.materialVariant?n.materialVariant-e.materialVariant:n.z!==e.z?n.z-e.z:n.id-e.id}function Fh(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.z!==e.z?e.z-n.z:n.id-e.id}function Bh(){const n=[];let e=0;const t=[],i=[],s=[];function r(){e=0,t.length=0,i.length=0,s.length=0}function a(d){let p=0;return d.isInstancedMesh&&(p+=2),d.isSkinnedMesh&&(p+=1),p}function o(d,p,g,v,x,m){let M=n[e];return M===void 0?(M={id:d.id,object:d,geometry:p,material:g,materialVariant:a(d),groupOrder:v,renderOrder:d.renderOrder,z:x,group:m},n[e]=M):(M.id=d.id,M.object=d,M.geometry=p,M.material=g,M.materialVariant=a(d),M.groupOrder=v,M.renderOrder=d.renderOrder,M.z=x,M.group=m),e++,M}function h(d,p,g,v,x,m,M){M.reversedDepth===!0&&(x=-x);const S=o(d,p,g,v,x,m);g.transmission>0?i.push(S):g.transparent===!0?s.push(S):t.push(S)}function l(d,p,g,v,x,m){const M=o(d,p,g,v,x,m);g.transmission>0?i.unshift(M):g.transparent===!0?s.unshift(M):t.unshift(M)}function u(d,p){t.length>1&&t.sort(d||BM),i.length>1&&i.sort(p||Fh),s.length>1&&s.sort(p||Fh)}function f(){for(let d=e,p=n.length;d<p;d++){const g=n[d];if(g.id===null)break;g.id=null,g.object=null,g.geometry=null,g.material=null,g.group=null}}return{opaque:t,transmissive:i,transparent:s,init:r,push:h,unshift:l,finish:f,sort:u}}function kM(){let n=new WeakMap;function e(i,s){const r=n.get(i);let a;return r===void 0?(a=new Bh,n.set(i,[a])):s>=r.length?(a=new Bh,r.push(a)):a=r[s],a}function t(){n=new WeakMap}return{get:e,dispose:t}}function zM(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={direction:new X,color:new tt};break;case"SpotLight":t={position:new X,direction:new X,color:new tt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new X,color:new tt,distance:0,decay:0};break;case"HemisphereLight":t={direction:new X,skyColor:new tt,groundColor:new tt};break;case"RectAreaLight":t={color:new tt,position:new X,halfWidth:new X,halfHeight:new X};break}return n[e.id]=t,t}}}function GM(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new We};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new We};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new We,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[e.id]=t,t}}}let HM=0;function WM(n,e){return(e.castShadow?2:0)-(n.castShadow?2:0)+(e.map?1:0)-(n.map?1:0)}function VM(n){const e=new zM,t=GM(),i={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)i.probe.push(new X);const s=new X,r=new Ot,a=new Ot;function o(l){let u=0,f=0,d=0;for(let D=0;D<9;D++)i.probe[D].set(0,0,0);let p=0,g=0,v=0,x=0,m=0,M=0,S=0,b=0,A=0,w=0,L=0,_=0,E=0,P=0;l.sort(WM);for(let D=0,U=l.length;D<U;D++){const N=l[D],F=N.color,H=N.intensity,W=N.distance;let te=null;if(N.shadow&&N.shadow.map&&(N.shadow.map.texture.format===ds?te=N.shadow.map.texture:te=N.shadow.map.depthTexture||N.shadow.map.texture),N.isAmbientLight)u+=F.r*H,f+=F.g*H,d+=F.b*H;else if(N.isLightProbe){for(let K=0;K<9;K++)i.probe[K].addScaledVector(N.sh.coefficients[K],H);P++}else if(N.isSunLight){const K=e.get(N);if(K.color.copy(N.color).multiplyScalar(N.intensity),N.castShadow){const B=N.shadow,I=t.get(N);I.shadowIntensity=B.intensity,I.shadowBias=B.bias,I.shadowNormalBias=B.normalBias,I.shadowRadius=B.radius,I.shadowMapSize.copy(B.mapSize).multiply(B.getFrameExtents()),i.sunShadow[g]=I,i.sunShadowMap[g]=te;const q=B.getViewportCount();for(let $=0;$<q;$++)i.sunShadowMatrix[v+$]=B.getMatrix($),i.sunShadowCascade[v+$]=B._cascadeData[$];v+=q,g++}i.sun[p]=K,p++}else if(N.isDirectionalLight){const K=e.get(N);if(K.color.copy(N.color).multiplyScalar(N.intensity),N.castShadow){const B=N.shadow,I=t.get(N);I.shadowIntensity=B.intensity,I.shadowBias=B.bias,I.shadowNormalBias=B.normalBias,I.shadowRadius=B.radius,I.shadowMapSize=B.mapSize,i.directionalShadow[x]=I,i.directionalShadowMap[x]=te,i.directionalShadowMatrix[x]=N.shadow.matrix,A++}i.directional[x]=K,x++}else if(N.isSpotLight){const K=e.get(N);K.position.setFromMatrixPosition(N.matrixWorld),K.color.copy(F).multiplyScalar(H),K.distance=W,K.coneCos=Math.cos(N.angle),K.penumbraCos=Math.cos(N.angle*(1-N.penumbra)),K.decay=N.decay,i.spot[M]=K;const B=N.shadow;if(N.map&&(i.spotLightMap[_]=N.map,_++,B.updateMatrices(N),N.castShadow&&E++),i.spotLightMatrix[M]=B.matrix,N.castShadow){const I=t.get(N);I.shadowIntensity=B.intensity,I.shadowBias=B.bias,I.shadowNormalBias=B.normalBias,I.shadowRadius=B.radius,I.shadowMapSize=B.mapSize,i.spotShadow[M]=I,i.spotShadowMap[M]=te,L++}M++}else if(N.isRectAreaLight){const K=e.get(N);K.color.copy(F).multiplyScalar(H),K.halfWidth.set(N.width*.5,0,0),K.halfHeight.set(0,N.height*.5,0),i.rectArea[S]=K,S++}else if(N.isPointLight){const K=e.get(N);if(K.color.copy(N.color).multiplyScalar(N.intensity),K.distance=N.distance,K.decay=N.decay,N.castShadow){const B=N.shadow,I=t.get(N);I.shadowIntensity=B.intensity,I.shadowBias=B.bias,I.shadowNormalBias=B.normalBias,I.shadowRadius=B.radius,I.shadowMapSize=B.mapSize,I.shadowCameraNear=B.camera.near,I.shadowCameraFar=B.camera.far,i.pointShadow[m]=I,i.pointShadowMap[m]=te,i.pointShadowMatrix[m]=N.shadow.matrix,w++}i.point[m]=K,m++}else if(N.isHemisphereLight){const K=e.get(N);K.skyColor.copy(N.color).multiplyScalar(H),K.groundColor.copy(N.groundColor).multiplyScalar(H),i.hemi[b]=K,b++}}S>0&&(n.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=Se.LTC_FLOAT_1,i.rectAreaLTC2=Se.LTC_FLOAT_2):(i.rectAreaLTC1=Se.LTC_HALF_1,i.rectAreaLTC2=Se.LTC_HALF_2)),i.ambient[0]=u,i.ambient[1]=f,i.ambient[2]=d;const T=i.hash;(T.sunLength!==p||T.directionalLength!==x||T.pointLength!==m||T.spotLength!==M||T.rectAreaLength!==S||T.hemiLength!==b||T.numSunShadows!==g||T.numDirectionalShadows!==A||T.numPointShadows!==w||T.numSpotShadows!==L||T.numSpotMaps!==_||T.numLightProbes!==P)&&(i.sun.length=p,i.directional.length=x,i.spot.length=M,i.rectArea.length=S,i.point.length=m,i.hemi.length=b,i.sunShadow.length=g,i.sunShadowMap.length=g,i.sunShadowMatrix.length=v,i.sunShadowCascade.length=v,i.directionalShadow.length=A,i.directionalShadowMap.length=A,i.directionalShadowMatrix.length=A,i.pointShadow.length=w,i.pointShadowMap.length=w,i.pointShadowMatrix.length=w,i.spotShadow.length=L,i.spotShadowMap.length=L,i.spotLightMatrix.length=L+_-E,i.spotLightMap.length=_,i.numSpotLightShadowsWithMaps=E,i.numLightProbes=P,T.sunLength=p,T.directionalLength=x,T.pointLength=m,T.spotLength=M,T.rectAreaLength=S,T.hemiLength=b,T.numSunShadows=g,T.numDirectionalShadows=A,T.numPointShadows=w,T.numSpotShadows=L,T.numSpotMaps=_,T.numLightProbes=P,i.version=HM++)}function h(l,u){let f=0,d=0,p=0,g=0,v=0,x=0;const m=u.matrixWorldInverse;for(let M=0,S=l.length;M<S;M++){const b=l[M];if(b.isSunLight){const A=i.sun[f];A.direction.setFromMatrixPosition(b.matrixWorld),A.direction.transformDirection(m),f++}else if(b.isDirectionalLight){const A=i.directional[d];A.direction.setFromMatrixPosition(b.matrixWorld),s.setFromMatrixPosition(b.target.matrixWorld),A.direction.sub(s),A.direction.transformDirection(m),d++}else if(b.isSpotLight){const A=i.spot[g];A.position.setFromMatrixPosition(b.matrixWorld),A.position.applyMatrix4(m),A.direction.setFromMatrixPosition(b.matrixWorld),s.setFromMatrixPosition(b.target.matrixWorld),A.direction.sub(s),A.direction.transformDirection(m),g++}else if(b.isRectAreaLight){const A=i.rectArea[v];A.position.setFromMatrixPosition(b.matrixWorld),A.position.applyMatrix4(m),a.identity(),r.copy(b.matrixWorld),r.premultiply(m),a.extractRotation(r),A.halfWidth.set(b.width*.5,0,0),A.halfHeight.set(0,b.height*.5,0),A.halfWidth.applyMatrix4(a),A.halfHeight.applyMatrix4(a),v++}else if(b.isPointLight){const A=i.point[p];A.position.setFromMatrixPosition(b.matrixWorld),A.position.applyMatrix4(m),p++}else if(b.isHemisphereLight){const A=i.hemi[x];A.direction.setFromMatrixPosition(b.matrixWorld),A.direction.transformDirection(m),x++}}}return{setup:o,setupView:h,state:i}}function kh(n){const e=new VM(n),t=[],i=[],s=[];function r(d){f.camera=d,t.length=0,i.length=0,s.length=0}function a(d){t.push(d)}function o(d){i.push(d)}function h(d){s.push(d)}function l(){e.setup(t)}function u(d){e.setupView(t,d)}const f={lightsArray:t,shadowsArray:i,lightProbeGridArray:s,camera:null,lights:e,transmissionRenderTarget:{},textureUnits:0};return{init:r,state:f,setupLights:l,setupLightsView:u,pushLight:a,pushShadow:o,pushLightProbeGrid:h}}function YM(n){let e=new WeakMap;function t(s,r=0){const a=e.get(s);let o;return a===void 0?(o=new kh(n),e.set(s,[o])):r>=a.length?(o=new kh(n),a.push(o)):o=a[r],o}function i(){e=new WeakMap}return{get:t,dispose:i}}const XM=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,KM=`uniform sampler2D shadow_pass;
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
}`,qM=[new X(1,0,0),new X(-1,0,0),new X(0,1,0),new X(0,-1,0),new X(0,0,1),new X(0,0,-1)],$M=[new X(0,-1,0),new X(0,-1,0),new X(0,0,1),new X(0,0,-1),new X(0,-1,0),new X(0,-1,0)],zh=new Ot,cr=new X,Oo=new X;function ZM(n,e,t){let i=new Ca;const s=new We,r=new We,a=new it,o=new l1,h=new c1,l={},u=t.maxTextureSize,f={[cs]:yn,[yn]:cs,[bi]:bi},d=new yt({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new We},radius:{value:4}},vertexShader:XM,fragmentShader:KM}),p=d.clone();p.defines.HORIZONTAL_PASS=1;const g=new jt;g.setAttribute("position",new Pn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const v=new $t(g,d),x=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=fa;let m=this.type;this.render=function(w,L,_){if(x.enabled===!1||x.autoUpdate===!1&&x.needsUpdate===!1||w.length===0)return;this.type===Qm&&(He("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."),this.type=fa);const E=n.getRenderTarget(),P=n.getActiveCubeFace(),T=n.getActiveMipmapLevel(),D=n.state;D.setBlending(ci),D.buffers.depth.getReversed()===!0?D.buffers.color.setClear(0,0,0,0):D.buffers.color.setClear(1,1,1,1),D.buffers.depth.setTest(!0),D.setScissorTest(!1);const U=m!==this.type;U&&L.traverse(function(N){N.material&&(Array.isArray(N.material)?N.material.forEach(F=>F.needsUpdate=!0):N.material.needsUpdate=!0)});for(let N=0,F=w.length;N<F;N++){const H=w[N],W=H.shadow;if(W===void 0){He("WebGLShadowMap:",H,"has no shadow.");continue}if(W.autoUpdate===!1&&W.needsUpdate===!1)continue;s.copy(W.mapSize);const te=W.getFrameExtents();s.multiply(te),r.copy(W.mapSize),(s.x>u||s.y>u)&&(s.x>u&&(r.x=Math.floor(u/te.x),s.x=r.x*te.x,W.mapSize.x=r.x),s.y>u&&(r.y=Math.floor(u/te.y),s.y=r.y*te.y,W.mapSize.y=r.y));const K=n.state.buffers.depth.getReversed();if(W.camera._reversedDepth=K,W.map===null||U===!0){if(W.map!==null&&(W.map.depthTexture!==null&&(W.map.depthTexture.dispose(),W.map.depthTexture=null),W.map.dispose()),this.type===dr){if(H.isPointLight){He("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}W.map=new Fn(s.x,s.y,{format:ds,type:di,minFilter:zt,magFilter:zt,generateMipmaps:!1}),W.map.texture.name=H.name+".shadowMap",W.map.depthTexture=new Ys(s.x,s.y,oi),W.map.depthTexture.name=H.name+".shadowMapDepth",W.map.depthTexture.format=Ei,W.map.depthTexture.compareFunction=null,W.map.depthTexture.minFilter=Wt,W.map.depthTexture.magFilter=Wt}else H.isPointLight?(W.map=new sd(s.x),W.map.depthTexture=new n1(s.x,ui)):(W.map=new Fn(s.x,s.y),W.map.depthTexture=new Ys(s.x,s.y,ui)),W.map.depthTexture.name=H.name+".shadowMap",W.map.depthTexture.format=Ei,this.type===fa?(W.map.depthTexture.compareFunction=K?cc:lc,W.map.depthTexture.minFilter=zt,W.map.depthTexture.magFilter=zt):(W.map.depthTexture.compareFunction=null,W.map.depthTexture.minFilter=Wt,W.map.depthTexture.magFilter=Wt);W.camera.updateProjectionMatrix()}W.map.isWebGLCubeRenderTarget!==!0&&(W.map.width!==s.x||W.map.height!==s.y)&&W.map.setSize(s.x,s.y);const B=W.map.isWebGLCubeRenderTarget?6:W.getViewportCount();H.isPointLight!==!0&&W.updateMatrices(H,_);for(let I=0;I<B;I++){const q=W.getCamera(I);if(H.isPointLight){const $=W.camera,ce=W.matrix,de=H.distance||$.far;de!==$.far&&($.far=de,$.updateProjectionMatrix()),cr.setFromMatrixPosition(H.matrixWorld),$.position.copy(cr),Oo.copy($.position),Oo.add(qM[I]),$.up.copy($M[I]),$.lookAt(Oo),$.updateMatrixWorld(),ce.makeTranslation(-cr.x,-cr.y,-cr.z),zh.multiplyMatrices($.projectionMatrix,$.matrixWorldInverse),W._frustum.setFromProjectionMatrix(zh,$.coordinateSystem,$.reversedDepth)}if(W.map.isWebGLCubeRenderTarget)n.setRenderTarget(W.map,I),n.clear();else{I===0&&(n.setRenderTarget(W.map),n.clear());const $=W.getViewport(I);a.set(r.x*$.x,r.y*$.y,r.x*$.z,r.y*$.w),D.viewport(a)}i=W.getFrustum(I),b(L,_,q,H,this.type)}W.isPointLightShadow!==!0&&this.type===dr&&M(W,_),W.needsUpdate=!1}m=this.type,x.needsUpdate=!1,n.setRenderTarget(E,P,T)};function M(w,L){const _=e.update(v);d.defines.VSM_SAMPLES!==w.blurSamples&&(d.defines.VSM_SAMPLES=w.blurSamples,p.defines.VSM_SAMPLES=w.blurSamples,d.needsUpdate=!0,p.needsUpdate=!0),w.mapPass===null?w.mapPass=new Fn(s.x,s.y,{format:ds,type:di}):(w.mapPass.width!==w.map.width||w.mapPass.height!==w.map.height)&&w.mapPass.setSize(w.map.width,w.map.height),d.uniforms.shadow_pass.value=w.map.depthTexture,d.uniforms.resolution.value.set(w.map.width,w.map.height),d.uniforms.radius.value=w.radius,n.setRenderTarget(w.mapPass),n.clear(),n.renderBufferDirect(L,null,_,d,v,null),p.uniforms.shadow_pass.value=w.mapPass.texture,p.uniforms.resolution.value.set(w.map.width,w.map.height),p.uniforms.radius.value=w.radius,n.setRenderTarget(w.map),n.clear(),n.renderBufferDirect(L,null,_,p,v,null)}function S(w,L,_,E){let P=null;const T=_.isPointLight===!0?w.customDistanceMaterial:w.customDepthMaterial;if(T!==void 0)P=T;else if(P=_.isPointLight===!0?h:o,n.localClippingEnabled&&L.clipShadows===!0&&Array.isArray(L.clippingPlanes)&&L.clippingPlanes.length!==0||L.displacementMap&&L.displacementScale!==0||L.alphaMap&&L.alphaTest>0||L.map&&L.alphaTest>0||L.alphaToCoverage===!0){const D=P.uuid,U=L.uuid;let N=l[D];N===void 0&&(N={},l[D]=N);let F=N[U];F===void 0&&(F=P.clone(),N[U]=F,L.addEventListener("dispose",A)),P=F}if(P.visible=L.visible,P.wireframe=L.wireframe,E===dr?P.side=L.shadowSide!==null?L.shadowSide:L.side:P.side=L.shadowSide!==null?L.shadowSide:f[L.side],P.alphaMap=L.alphaMap,P.alphaTest=L.alphaToCoverage===!0?.5:L.alphaTest,P.map=L.map,P.clipShadows=L.clipShadows,P.clippingPlanes=L.clippingPlanes,P.clipIntersection=L.clipIntersection,P.displacementMap=L.displacementMap,P.displacementScale=L.displacementScale,P.displacementBias=L.displacementBias,P.wireframeLinewidth=L.wireframeLinewidth,P.linewidth=L.linewidth,_.isPointLight===!0&&P.isMeshDistanceMaterial===!0){const D=n.properties.get(P);D.light=_}return P}function b(w,L,_,E,P){if(w.visible===!1)return;if(w.layers.test(L.layers)&&(w.isMesh||w.isLine||w.isPoints)&&(w.castShadow||w.receiveShadow&&P===dr)&&(!w.frustumCulled||w.intersectsFrustum(i))){w.modelViewMatrix.multiplyMatrices(_.matrixWorldInverse,w.matrixWorld);const U=e.update(w),N=w.material;if(Array.isArray(N)){const F=U.groups;for(let H=0,W=F.length;H<W;H++){const te=F[H],K=N[te.materialIndex];if(K&&K.visible){const B=S(w,K,E,P);w.onBeforeShadow(n,w,L,_,U,B,te),n.renderBufferDirect(_,null,U,B,w,te),w.onAfterShadow(n,w,L,_,U,B,te)}}}else if(N.visible){const F=S(w,N,E,P);w.onBeforeShadow(n,w,L,_,U,F,null),n.renderBufferDirect(_,null,U,F,w,null),w.onAfterShadow(n,w,L,_,U,F,null)}}const D=w.children;for(let U=0,N=D.length;U<N;U++)b(D[U],L,_,E,P)}function A(w){w.target.removeEventListener("dispose",A);for(const _ in l){const E=l[_],P=w.target.uuid;P in E&&(E[P].dispose(),delete E[P])}}}function JM(n,e){function t(){let Y=!1;const ve=new it;let le=null;const Me=new it(0,0,0,0);return{setMask:function(Ee){le!==Ee&&!Y&&(n.colorMask(Ee,Ee,Ee,Ee),le=Ee)},setLocked:function(Ee){Y=Ee},setClear:function(Ee,he,Ue,Ie,Tt){Tt===!0&&(Ee*=Ie,he*=Ie,Ue*=Ie),ve.set(Ee,he,Ue,Ie),Me.equals(ve)===!1&&(n.clearColor(Ee,he,Ue,Ie),Me.copy(ve))},reset:function(){Y=!1,le=null,Me.set(-1,0,0,0)}}}function i(){let Y=!1,ve=!1,le=null,Me=null,Ee=null;return{setReversed:function(he){if(ve!==he){const Ue=e.get("EXT_clip_control");he?Ue.clipControlEXT(Ue.LOWER_LEFT_EXT,Ue.ZERO_TO_ONE_EXT):Ue.clipControlEXT(Ue.LOWER_LEFT_EXT,Ue.NEGATIVE_ONE_TO_ONE_EXT),ve=he;const Ie=Ee;Ee=null,this.setClear(Ie)}},getReversed:function(){return ve},setTest:function(he){he?ie(n.DEPTH_TEST):k(n.DEPTH_TEST)},setMask:function(he){le!==he&&!Y&&(n.depthMask(he),le=he)},setFunc:function(he){if(ve&&(he=Lg[he]),Me!==he){switch(he){case Zo:n.depthFunc(n.NEVER);break;case Jo:n.depthFunc(n.ALWAYS);break;case Qo:n.depthFunc(n.LESS);break;case xr:n.depthFunc(n.LEQUAL);break;case jo:n.depthFunc(n.EQUAL);break;case el:n.depthFunc(n.GEQUAL);break;case ya:n.depthFunc(n.GREATER);break;case tl:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}Me=he}},setLocked:function(he){Y=he},setClear:function(he){Ee!==he&&(Ee=he,ve&&(he=1-he),n.clearDepth(he))},reset:function(){Y=!1,le=null,Me=null,Ee=null,ve=!1}}}function s(){let Y=!1,ve=null,le=null,Me=null,Ee=null,he=null,Ue=null,Ie=null,Tt=null;return{setTest:function(dt){Y||(dt?ie(n.STENCIL_TEST):k(n.STENCIL_TEST))},setMask:function(dt){ve!==dt&&!Y&&(n.stencilMask(dt),ve=dt)},setFunc:function(dt,kn,Jn){(le!==dt||Me!==kn||Ee!==Jn)&&(n.stencilFunc(dt,kn,Jn),le=dt,Me=kn,Ee=Jn)},setOp:function(dt,kn,Jn){(he!==dt||Ue!==kn||Ie!==Jn)&&(n.stencilOp(dt,kn,Jn),he=dt,Ue=kn,Ie=Jn)},setLocked:function(dt){Y=dt},setClear:function(dt){Tt!==dt&&(n.clearStencil(dt),Tt=dt)},reset:function(){Y=!1,ve=null,le=null,Me=null,Ee=null,he=null,Ue=null,Ie=null,Tt=null}}}const r=new t,a=new i,o=new s,h=new WeakMap,l=new WeakMap;let u={},f={},d={},p=new WeakMap,g=[],v=null,x=!1,m=null,M=null,S=null,b=null,A=null,w=null,L=null,_=new tt(0,0,0),E=0,P=!1,T=null,D=null,U=null,N=null,F=null;const H=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let W=!1,te=0;const K=n.getParameter(n.VERSION);K.indexOf("WebGL")!==-1?(te=parseFloat(/^WebGL (\d)/.exec(K)[1]),W=te>=1):K.indexOf("OpenGL ES")!==-1&&(te=parseFloat(/^OpenGL ES (\d)/.exec(K)[1]),W=te>=2);let B=null,I={};const q=n.getParameter(n.SCISSOR_BOX),$=n.getParameter(n.VIEWPORT),ce=new it().fromArray(q),de=new it().fromArray($);function me(Y,ve,le,Me){const Ee=new Uint8Array(4),he=n.createTexture();n.bindTexture(Y,he),n.texParameteri(Y,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(Y,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let Ue=0;Ue<le;Ue++)Y===n.TEXTURE_3D||Y===n.TEXTURE_2D_ARRAY?n.texImage3D(ve,0,n.RGBA,1,1,Me,0,n.RGBA,n.UNSIGNED_BYTE,Ee):n.texImage2D(ve+Ue,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,Ee);return he}const j={};j[n.TEXTURE_2D]=me(n.TEXTURE_2D,n.TEXTURE_2D,1),j[n.TEXTURE_CUBE_MAP]=me(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),j[n.TEXTURE_2D_ARRAY]=me(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),j[n.TEXTURE_3D]=me(n.TEXTURE_3D,n.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),o.setClear(0),ie(n.DEPTH_TEST),a.setFunc(xr),Ke(!1),wt(Gc),ie(n.CULL_FACE),Fe(ci);function ie(Y){u[Y]!==!0&&(n.enable(Y),u[Y]=!0)}function k(Y){u[Y]!==!1&&(n.disable(Y),u[Y]=!1)}function re(Y,ve){return d[Y]!==ve?(n.bindFramebuffer(Y,ve),d[Y]=ve,Y===n.DRAW_FRAMEBUFFER&&(d[n.FRAMEBUFFER]=ve),Y===n.FRAMEBUFFER&&(d[n.DRAW_FRAMEBUFFER]=ve),!0):!1}function ae(Y,ve){let le=g,Me=!1;if(Y){le=p.get(ve),le===void 0&&(le=[],p.set(ve,le));const Ee=Y.textures;if(le.length!==Ee.length||le[0]!==n.COLOR_ATTACHMENT0){for(let he=0,Ue=Ee.length;he<Ue;he++)le[he]=n.COLOR_ATTACHMENT0+he;le.length=Ee.length,Me=!0}}else le[0]!==n.BACK&&(le[0]=n.BACK,Me=!0);Me&&n.drawBuffers(le)}function ge(Y){return v!==Y?(n.useProgram(Y),v=Y,!0):!1}const ke={[Is]:n.FUNC_ADD,[jm]:n.FUNC_SUBTRACT,[eg]:n.FUNC_REVERSE_SUBTRACT};ke[tg]=n.MIN,ke[ng]=n.MAX;const Ce={[Ql]:n.ZERO,[ig]:n.ONE,[jl]:n.SRC_COLOR,[ec]:n.SRC_ALPHA,[cg]:n.SRC_ALPHA_SATURATE,[og]:n.DST_COLOR,[rg]:n.DST_ALPHA,[sg]:n.ONE_MINUS_SRC_COLOR,[tc]:n.ONE_MINUS_SRC_ALPHA,[lg]:n.ONE_MINUS_DST_COLOR,[ag]:n.ONE_MINUS_DST_ALPHA,[hg]:n.CONSTANT_COLOR,[ug]:n.ONE_MINUS_CONSTANT_COLOR,[dg]:n.CONSTANT_ALPHA,[fg]:n.ONE_MINUS_CONSTANT_ALPHA};function Fe(Y,ve,le,Me,Ee,he,Ue,Ie,Tt,dt){if(Y===ci){x===!0&&(k(n.BLEND),x=!1);return}if(x===!1&&(ie(n.BLEND),x=!0),Y!==Wa){if(Y!==m||dt!==P){if((M!==Is||A!==Is)&&(n.blendEquation(n.FUNC_ADD),M=Is,A=Is),dt)switch(Y){case Fs:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case hs:n.blendFunc(n.ONE,n.ONE);break;case Hc:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case Wc:n.blendFuncSeparate(n.DST_COLOR,n.ONE_MINUS_SRC_ALPHA,n.ZERO,n.ONE);break;default:ct("WebGLState: Invalid blending: ",Y);break}else switch(Y){case Fs:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case hs:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE,n.ONE,n.ONE);break;case Hc:ct("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Wc:ct("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:ct("WebGLState: Invalid blending: ",Y);break}S=null,b=null,w=null,L=null,_.set(0,0,0),E=0,m=Y,P=dt}return}Ee=Ee||ve,he=he||le,Ue=Ue||Me,(ve!==M||Ee!==A)&&(n.blendEquationSeparate(ke[ve],ke[Ee]),M=ve,A=Ee),(le!==S||Me!==b||he!==w||Ue!==L)&&(n.blendFuncSeparate(Ce[le],Ce[Me],Ce[he],Ce[Ue]),S=le,b=Me,w=he,L=Ue),(Ie.equals(_)===!1||Tt!==E)&&(n.blendColor(Ie.r,Ie.g,Ie.b,Tt),_.copy(Ie),E=Tt),m=Y,P=!1}function qe(Y,ve){Y.side===bi?k(n.CULL_FACE):ie(n.CULL_FACE);let le=Y.side===yn;ve&&(le=!le),Ke(le),Y.blending===Fs&&Y.transparent===!1?Fe(ci):Fe(Y.blending,Y.blendEquation,Y.blendSrc,Y.blendDst,Y.blendEquationAlpha,Y.blendSrcAlpha,Y.blendDstAlpha,Y.blendColor,Y.blendAlpha,Y.premultipliedAlpha),a.setFunc(Y.depthFunc),a.setTest(Y.depthTest),a.setMask(Y.depthWrite),r.setMask(Y.colorWrite);const Me=Y.stencilWrite;o.setTest(Me),Me&&(o.setMask(Y.stencilWriteMask),o.setFunc(Y.stencilFunc,Y.stencilRef,Y.stencilFuncMask),o.setOp(Y.stencilFail,Y.stencilZFail,Y.stencilZPass)),nn(Y.polygonOffset,Y.polygonOffsetFactor,Y.polygonOffsetUnits),Y.alphaToCoverage===!0?ie(n.SAMPLE_ALPHA_TO_COVERAGE):k(n.SAMPLE_ALPHA_TO_COVERAGE)}function Ke(Y){T!==Y&&(Y?n.frontFace(n.CW):n.frontFace(n.CCW),T=Y)}function wt(Y){Y!==Zm?(ie(n.CULL_FACE),Y!==D&&(Y===Gc?n.cullFace(n.BACK):Y===Jm?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):k(n.CULL_FACE),D=Y}function Ut(Y){Y!==U&&(W&&n.lineWidth(Y),U=Y)}function nn(Y,ve,le){Y?(ie(n.POLYGON_OFFSET_FILL),(N!==ve||F!==le)&&(N=ve,F=le,a.getReversed()&&(ve=-ve),n.polygonOffset(ve,le))):k(n.POLYGON_OFFSET_FILL)}function _t(Y){Y?ie(n.SCISSOR_TEST):k(n.SCISSOR_TEST)}function Et(Y){Y===void 0&&(Y=n.TEXTURE0+H-1),B!==Y&&(n.activeTexture(Y),B=Y)}function V(Y,ve,le){le===void 0&&(B===null?le=n.TEXTURE0+H-1:le=B);let Me=I[le];Me===void 0&&(Me={type:void 0,texture:void 0},I[le]=Me),(Me.type!==Y||Me.texture!==ve)&&(B!==le&&(n.activeTexture(le),B=le),n.bindTexture(Y,ve||j[Y]),Me.type=Y,Me.texture=ve)}function Qe(){const Y=I[B];Y!==void 0&&Y.type!==void 0&&(n.bindTexture(Y.type,null),Y.type=void 0,Y.texture=void 0)}function Ge(){try{n.compressedTexImage2D(...arguments)}catch(Y){ct("WebGLState:",Y)}}function O(){try{n.compressedTexImage3D(...arguments)}catch(Y){ct("WebGLState:",Y)}}function y(){try{n.texSubImage2D(...arguments)}catch(Y){ct("WebGLState:",Y)}}function z(){try{n.texSubImage3D(...arguments)}catch(Y){ct("WebGLState:",Y)}}function Z(){try{n.compressedTexSubImage2D(...arguments)}catch(Y){ct("WebGLState:",Y)}}function ee(){try{n.compressedTexSubImage3D(...arguments)}catch(Y){ct("WebGLState:",Y)}}function ue(){try{n.texStorage2D(...arguments)}catch(Y){ct("WebGLState:",Y)}}function fe(){try{n.texStorage3D(...arguments)}catch(Y){ct("WebGLState:",Y)}}function se(){try{n.texImage2D(...arguments)}catch(Y){ct("WebGLState:",Y)}}function oe(){try{n.texImage3D(...arguments)}catch(Y){ct("WebGLState:",Y)}}function pe(Y){return f[Y]!==void 0?f[Y]:n.getParameter(Y)}function De(Y,ve){f[Y]!==ve&&(n.pixelStorei(Y,ve),f[Y]=ve)}function be(Y){ce.equals(Y)===!1&&(n.scissor(Y.x,Y.y,Y.z,Y.w),ce.copy(Y))}function xe(Y){de.equals(Y)===!1&&(n.viewport(Y.x,Y.y,Y.z,Y.w),de.copy(Y))}function Oe(Y,ve){let le=l.get(ve);le===void 0&&(le=new WeakMap,l.set(ve,le));let Me=le.get(Y);Me===void 0&&(Me=n.getUniformBlockIndex(ve,Y.name),le.set(Y,Me))}function ze(Y,ve){const Me=l.get(ve).get(Y);h.get(ve)!==Me&&(n.uniformBlockBinding(ve,Me,Y.__bindingPointIndex),h.set(ve,Me))}function $e(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),a.setReversed(!1),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),n.pixelStorei(n.PACK_ALIGNMENT,4),n.pixelStorei(n.UNPACK_ALIGNMENT,4),n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,!1),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,n.BROWSER_DEFAULT_WEBGL),n.pixelStorei(n.PACK_ROW_LENGTH,0),n.pixelStorei(n.PACK_SKIP_PIXELS,0),n.pixelStorei(n.PACK_SKIP_ROWS,0),n.pixelStorei(n.UNPACK_ROW_LENGTH,0),n.pixelStorei(n.UNPACK_IMAGE_HEIGHT,0),n.pixelStorei(n.UNPACK_SKIP_PIXELS,0),n.pixelStorei(n.UNPACK_SKIP_ROWS,0),n.pixelStorei(n.UNPACK_SKIP_IMAGES,0),u={},f={},B=null,I={},d={},p=new WeakMap,g=[],v=null,x=!1,m=null,M=null,S=null,b=null,A=null,w=null,L=null,_=new tt(0,0,0),E=0,P=!1,T=null,D=null,U=null,N=null,F=null,ce.set(0,0,n.canvas.width,n.canvas.height),de.set(0,0,n.canvas.width,n.canvas.height),r.reset(),a.reset(),o.reset()}return{buffers:{color:r,depth:a,stencil:o},enable:ie,disable:k,bindFramebuffer:re,drawBuffers:ae,useProgram:ge,setBlending:Fe,setMaterial:qe,setFlipSided:Ke,setCullFace:wt,setLineWidth:Ut,setPolygonOffset:nn,setScissorTest:_t,activeTexture:Et,bindTexture:V,unbindTexture:Qe,compressedTexImage2D:Ge,compressedTexImage3D:O,texImage2D:se,texImage3D:oe,pixelStorei:De,getParameter:pe,updateUBOMapping:Oe,uniformBlockBinding:ze,texStorage2D:ue,texStorage3D:fe,texSubImage2D:y,texSubImage3D:z,compressedTexSubImage2D:Z,compressedTexSubImage3D:ee,scissor:be,viewport:xe,reset:$e}}function QM(n,e,t,i,s,r,a){const o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,h=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new We,u=new WeakMap,f=new Set;let d;const p=new WeakMap;let g=!1;try{g=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function v(O,y){return g?new OffscreenCanvas(O,y):Ra("canvas")}function x(O,y,z){let Z=1;const ee=Ge(O);if((ee.width>z||ee.height>z)&&(Z=z/Math.max(ee.width,ee.height)),Z<1)if(typeof HTMLImageElement<"u"&&O instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&O instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&O instanceof ImageBitmap||typeof VideoFrame<"u"&&O instanceof VideoFrame){const ue=Math.floor(Z*ee.width),fe=Math.floor(Z*ee.height);d===void 0&&(d=v(ue,fe));const se=y?v(ue,fe):d;return se.width=ue,se.height=fe,se.getContext("2d").drawImage(O,0,0,ue,fe),He("WebGLRenderer: Texture has been resized from ("+ee.width+"x"+ee.height+") to ("+ue+"x"+fe+")."),se}else return"data"in O&&He("WebGLRenderer: Image in DataTexture is too big ("+ee.width+"x"+ee.height+")."),O;return O}function m(O){return O.generateMipmaps}function M(O){n.generateMipmap(O)}function S(O){return O.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:O.isWebGL3DRenderTarget?n.TEXTURE_3D:O.isWebGLArrayRenderTarget||O.isCompressedArrayTexture?n.TEXTURE_2D_ARRAY:n.TEXTURE_2D}function b(O,y,z,Z,ee,ue=!1){if(O!==null){if(n[O]!==void 0)return n[O];He("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+O+"'")}let fe;Z&&(fe=e.get("EXT_texture_norm16"),fe||He("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let se=y;if(y===n.RED&&(z===n.FLOAT&&(se=n.R32F),z===n.HALF_FLOAT&&(se=n.R16F),z===n.UNSIGNED_BYTE&&(se=n.R8),z===n.UNSIGNED_SHORT&&fe&&(se=fe.R16_EXT),z===n.SHORT&&fe&&(se=fe.R16_SNORM_EXT)),y===n.RED_INTEGER&&(z===n.UNSIGNED_BYTE&&(se=n.R8UI),z===n.UNSIGNED_SHORT&&(se=n.R16UI),z===n.UNSIGNED_INT&&(se=n.R32UI),z===n.BYTE&&(se=n.R8I),z===n.SHORT&&(se=n.R16I),z===n.INT&&(se=n.R32I)),y===n.RG&&(z===n.FLOAT&&(se=n.RG32F),z===n.HALF_FLOAT&&(se=n.RG16F),z===n.UNSIGNED_BYTE&&(se=n.RG8),z===n.UNSIGNED_SHORT&&fe&&(se=fe.RG16_EXT),z===n.SHORT&&fe&&(se=fe.RG16_SNORM_EXT)),y===n.RG_INTEGER&&(z===n.UNSIGNED_BYTE&&(se=n.RG8UI),z===n.UNSIGNED_SHORT&&(se=n.RG16UI),z===n.UNSIGNED_INT&&(se=n.RG32UI),z===n.BYTE&&(se=n.RG8I),z===n.SHORT&&(se=n.RG16I),z===n.INT&&(se=n.RG32I)),y===n.RGB_INTEGER&&(z===n.UNSIGNED_BYTE&&(se=n.RGB8UI),z===n.UNSIGNED_SHORT&&(se=n.RGB16UI),z===n.UNSIGNED_INT&&(se=n.RGB32UI),z===n.BYTE&&(se=n.RGB8I),z===n.SHORT&&(se=n.RGB16I),z===n.INT&&(se=n.RGB32I)),y===n.RGBA_INTEGER&&(z===n.UNSIGNED_BYTE&&(se=n.RGBA8UI),z===n.UNSIGNED_SHORT&&(se=n.RGBA16UI),z===n.UNSIGNED_INT&&(se=n.RGBA32UI),z===n.BYTE&&(se=n.RGBA8I),z===n.SHORT&&(se=n.RGBA16I),z===n.INT&&(se=n.RGBA32I)),y===n.RGB&&(z===n.UNSIGNED_SHORT&&fe&&(se=fe.RGB16_EXT),z===n.SHORT&&fe&&(se=fe.RGB16_SNORM_EXT),z===n.UNSIGNED_INT_5_9_9_9_REV&&(se=n.RGB9_E5),z===n.UNSIGNED_INT_10F_11F_11F_REV&&(se=n.R11F_G11F_B10F)),y===n.RGBA){const oe=ue?Aa:st.getTransfer(ee);z===n.FLOAT&&(se=n.RGBA32F),z===n.HALF_FLOAT&&(se=n.RGBA16F),z===n.UNSIGNED_BYTE&&(se=oe===vt?n.SRGB8_ALPHA8:n.RGBA8),z===n.UNSIGNED_SHORT&&fe&&(se=fe.RGBA16_EXT),z===n.SHORT&&fe&&(se=fe.RGBA16_SNORM_EXT),z===n.UNSIGNED_SHORT_4_4_4_4&&(se=n.RGBA4),z===n.UNSIGNED_SHORT_5_5_5_1&&(se=n.RGB5_A1)}return(se===n.R16F||se===n.R32F||se===n.RG16F||se===n.RG32F||se===n.RGBA16F||se===n.RGBA32F)&&e.get("EXT_color_buffer_float"),se}function A(O,y){let z;return O?y===null||y===ui||y===Mr?z=n.DEPTH24_STENCIL8:y===oi?z=n.DEPTH32F_STENCIL8:y===vr&&(z=n.DEPTH24_STENCIL8,He("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):y===null||y===ui||y===Mr?z=n.DEPTH_COMPONENT24:y===oi?z=n.DEPTH_COMPONENT32F:y===vr&&(z=n.DEPTH_COMPONENT16),z}function w(O,y){return m(O)===!0||O.isFramebufferTexture&&O.minFilter!==Wt&&O.minFilter!==zt?Math.log2(Math.max(y.width,y.height))+1:O.mipmaps!==void 0&&O.mipmaps.length>0?O.mipmaps.length:O.isCompressedTexture&&Array.isArray(O.image)?y.mipmaps.length:1}function L(O){const y=O.target;y.removeEventListener("dispose",L),E(y),y.isVideoTexture&&u.delete(y),y.isHTMLTexture&&f.delete(y)}function _(O){const y=O.target;y.removeEventListener("dispose",_),T(y)}function E(O){const y=i.get(O);if(y.__webglInit===void 0)return;const z=O.source,Z=p.get(z);if(Z){const ee=Z[y.__cacheKey];ee.usedTimes--,ee.usedTimes===0&&P(O),Object.keys(Z).length===0&&p.delete(z)}i.remove(O)}function P(O){const y=i.get(O);n.deleteTexture(y.__webglTexture);const z=O.source,Z=p.get(z);delete Z[y.__cacheKey],a.memory.textures--}function T(O){const y=i.get(O);if(O.depthTexture&&(O.depthTexture.dispose(),i.remove(O.depthTexture)),O.isWebGLCubeRenderTarget)for(let Z=0;Z<6;Z++){if(Array.isArray(y.__webglFramebuffer[Z]))for(let ee=0;ee<y.__webglFramebuffer[Z].length;ee++)n.deleteFramebuffer(y.__webglFramebuffer[Z][ee]);else n.deleteFramebuffer(y.__webglFramebuffer[Z]);y.__webglDepthbuffer&&n.deleteRenderbuffer(y.__webglDepthbuffer[Z])}else{if(Array.isArray(y.__webglFramebuffer))for(let Z=0;Z<y.__webglFramebuffer.length;Z++)n.deleteFramebuffer(y.__webglFramebuffer[Z]);else n.deleteFramebuffer(y.__webglFramebuffer);if(y.__webglDepthbuffer&&n.deleteRenderbuffer(y.__webglDepthbuffer),y.__webglMultisampledFramebuffer&&n.deleteFramebuffer(y.__webglMultisampledFramebuffer),y.__webglColorRenderbuffer)for(let Z=0;Z<y.__webglColorRenderbuffer.length;Z++)y.__webglColorRenderbuffer[Z]&&n.deleteRenderbuffer(y.__webglColorRenderbuffer[Z]);y.__webglDepthRenderbuffer&&n.deleteRenderbuffer(y.__webglDepthRenderbuffer)}const z=O.textures;for(let Z=0,ee=z.length;Z<ee;Z++){const ue=i.get(z[Z]);ue.__webglTexture&&(n.deleteTexture(ue.__webglTexture),a.memory.textures--),i.remove(z[Z])}i.remove(O)}let D=0;function U(){D=0}function N(){return D}function F(O){D=O}function H(){const O=D;return O>=s.maxTextures&&He("WebGLTextures: Trying to use "+(O+1)+" texture units while this GPU supports only "+s.maxTextures),D+=1,O}function W(O){const y=[];return y.push(O.wrapS),y.push(O.wrapT),y.push(O.wrapR||0),y.push(O.magFilter),y.push(O.minFilter),y.push(O.anisotropy),y.push(O.internalFormat),y.push(O.format),y.push(O.type),y.push(O.generateMipmaps),y.push(O.premultiplyAlpha),y.push(O.flipY),y.push(O.unpackAlignment),y.push(O.colorSpace),y.join()}function te(O,y){const z=i.get(O);if(O.isVideoTexture&&V(O),O.isRenderTargetTexture===!1&&O.isExternalTexture!==!0&&O.version>0&&z.__version!==O.version){const Z=O.image;if(Z===null)He("WebGLRenderer: Texture marked for update but no image data found.");else if(Z.complete===!1)He("WebGLRenderer: Texture marked for update but image is incomplete");else{k(z,O,y);return}}else O.isExternalTexture&&(z.__webglTexture=O.sourceTexture?O.sourceTexture:null);t.bindTexture(n.TEXTURE_2D,z.__webglTexture,n.TEXTURE0+y)}function K(O,y){const z=i.get(O);if(O.isRenderTargetTexture===!1&&O.version>0&&z.__version!==O.version){k(z,O,y);return}else O.isExternalTexture&&(z.__webglTexture=O.sourceTexture?O.sourceTexture:null);t.bindTexture(n.TEXTURE_2D_ARRAY,z.__webglTexture,n.TEXTURE0+y)}function B(O,y){const z=i.get(O);if(O.isRenderTargetTexture===!1&&O.version>0&&z.__version!==O.version){k(z,O,y);return}t.bindTexture(n.TEXTURE_3D,z.__webglTexture,n.TEXTURE0+y)}function I(O,y){const z=i.get(O);if(O.isCubeDepthTexture!==!0&&O.version>0&&z.__version!==O.version){re(z,O,y);return}t.bindTexture(n.TEXTURE_CUBE_MAP,z.__webglTexture,n.TEXTURE0+y)}const q={[nl]:n.REPEAT,[Si]:n.CLAMP_TO_EDGE,[il]:n.MIRRORED_REPEAT},$={[Wt]:n.NEAREST,[gg]:n.NEAREST_MIPMAP_NEAREST,[Dr]:n.NEAREST_MIPMAP_LINEAR,[zt]:n.LINEAR,[so]:n.LINEAR_MIPMAP_NEAREST,[ss]:n.LINEAR_MIPMAP_LINEAR},ce={[_g]:n.NEVER,[Eg]:n.ALWAYS,[bg]:n.LESS,[lc]:n.LEQUAL,[Sg]:n.EQUAL,[cc]:n.GEQUAL,[yg]:n.GREATER,[wg]:n.NOTEQUAL};function de(O,y){if(y.type===oi&&e.has("OES_texture_float_linear")===!1&&(y.magFilter===zt||y.magFilter===so||y.magFilter===Dr||y.magFilter===ss||y.minFilter===zt||y.minFilter===so||y.minFilter===Dr||y.minFilter===ss)&&He("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),n.texParameteri(O,n.TEXTURE_WRAP_S,q[y.wrapS]),n.texParameteri(O,n.TEXTURE_WRAP_T,q[y.wrapT]),(O===n.TEXTURE_3D||O===n.TEXTURE_2D_ARRAY)&&n.texParameteri(O,n.TEXTURE_WRAP_R,q[y.wrapR]),n.texParameteri(O,n.TEXTURE_MAG_FILTER,$[y.magFilter]),n.texParameteri(O,n.TEXTURE_MIN_FILTER,$[y.minFilter]),y.compareFunction&&(n.texParameteri(O,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(O,n.TEXTURE_COMPARE_FUNC,ce[y.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(y.magFilter===Wt||y.minFilter!==Dr&&y.minFilter!==ss||y.type===oi&&e.has("OES_texture_float_linear")===!1)return;if(y.anisotropy>1||i.get(y).__currentAnisotropy){const z=e.get("EXT_texture_filter_anisotropic");n.texParameterf(O,z.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(y.anisotropy,s.getMaxAnisotropy())),i.get(y).__currentAnisotropy=y.anisotropy}}}function me(O,y){let z=!1;O.__webglInit===void 0&&(O.__webglInit=!0,y.addEventListener("dispose",L));const Z=y.source;let ee=p.get(Z);ee===void 0&&(ee={},p.set(Z,ee));const ue=W(y);if(ue!==O.__cacheKey){ee[ue]===void 0&&(ee[ue]={texture:n.createTexture(),usedTimes:0},a.memory.textures++,z=!0),ee[ue].usedTimes++;const fe=ee[O.__cacheKey];fe!==void 0&&(ee[O.__cacheKey].usedTimes--,fe.usedTimes===0&&P(y)),O.__cacheKey=ue,O.__webglTexture=ee[ue].texture}return z}function j(O,y,z){return Math.floor(Math.floor(O/z)/y)}function ie(O,y,z,Z){const ue=O.updateRanges;if(ue.length===0)t.texSubImage2D(n.TEXTURE_2D,0,0,0,y.width,y.height,z,Z,y.data);else{ue.sort((De,be)=>De.start-be.start);let fe=0;for(let De=1;De<ue.length;De++){const be=ue[fe],xe=ue[De],Oe=be.start+be.count,ze=j(xe.start,y.width,4),$e=j(be.start,y.width,4);xe.start<=Oe+1&&ze===$e&&j(xe.start+xe.count-1,y.width,4)===ze?be.count=Math.max(be.count,xe.start+xe.count-be.start):(++fe,ue[fe]=xe)}ue.length=fe+1;const se=t.getParameter(n.UNPACK_ROW_LENGTH),oe=t.getParameter(n.UNPACK_SKIP_PIXELS),pe=t.getParameter(n.UNPACK_SKIP_ROWS);t.pixelStorei(n.UNPACK_ROW_LENGTH,y.width);for(let De=0,be=ue.length;De<be;De++){const xe=ue[De],Oe=Math.floor(xe.start/4),ze=Math.ceil(xe.count/4),$e=Oe%y.width,Y=Math.floor(Oe/y.width),ve=ze,le=1;t.pixelStorei(n.UNPACK_SKIP_PIXELS,$e),t.pixelStorei(n.UNPACK_SKIP_ROWS,Y),t.texSubImage2D(n.TEXTURE_2D,0,$e,Y,ve,le,z,Z,y.data)}O.clearUpdateRanges(),t.pixelStorei(n.UNPACK_ROW_LENGTH,se),t.pixelStorei(n.UNPACK_SKIP_PIXELS,oe),t.pixelStorei(n.UNPACK_SKIP_ROWS,pe)}}function k(O,y,z){let Z=n.TEXTURE_2D;(y.isDataArrayTexture||y.isCompressedArrayTexture)&&(Z=n.TEXTURE_2D_ARRAY),y.isData3DTexture&&(Z=n.TEXTURE_3D);const ee=me(O,y),ue=y.source;t.bindTexture(Z,O.__webglTexture,n.TEXTURE0+z);const fe=i.get(ue);if(ue.version!==fe.__version||ee===!0){if(t.activeTexture(n.TEXTURE0+z),(typeof ImageBitmap<"u"&&y.image instanceof ImageBitmap)===!1){const le=st.getPrimaries(st.workingColorSpace),Me=y.colorSpace===Yn?null:st.getPrimaries(y.colorSpace),Ee=y.colorSpace===Yn||le===Me?n.NONE:n.BROWSER_DEFAULT_WEBGL;t.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,y.flipY),t.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,y.premultiplyAlpha),t.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ee)}t.pixelStorei(n.UNPACK_ALIGNMENT,y.unpackAlignment);let oe=x(y.image,!1,s.maxTextureSize);oe=Qe(y,oe);const pe=r.convert(y.format,y.colorSpace),De=r.convert(y.type);let be=b(y.internalFormat,pe,De,y.normalized,y.colorSpace,y.isVideoTexture);de(Z,y);let xe;const Oe=y.mipmaps,ze=y.isVideoTexture!==!0,$e=fe.__version===void 0||ee===!0,Y=ue.dataReady,ve=w(y,oe);if(y.isDepthTexture)be=A(y.format===rs,y.type),$e&&(ze?t.texStorage2D(n.TEXTURE_2D,1,be,oe.width,oe.height):t.texImage2D(n.TEXTURE_2D,0,be,oe.width,oe.height,0,pe,De,null));else if(y.isDataTexture)if(Oe.length>0){ze&&$e&&t.texStorage2D(n.TEXTURE_2D,ve,be,Oe[0].width,Oe[0].height);for(let le=0,Me=Oe.length;le<Me;le++)xe=Oe[le],ze?Y&&t.texSubImage2D(n.TEXTURE_2D,le,0,0,xe.width,xe.height,pe,De,xe.data):t.texImage2D(n.TEXTURE_2D,le,be,xe.width,xe.height,0,pe,De,xe.data);y.generateMipmaps=!1}else ze?($e&&t.texStorage2D(n.TEXTURE_2D,ve,be,oe.width,oe.height),Y&&ie(y,oe,pe,De)):t.texImage2D(n.TEXTURE_2D,0,be,oe.width,oe.height,0,pe,De,oe.data);else if(y.isCompressedTexture)if(y.isCompressedArrayTexture){ze&&$e&&t.texStorage3D(n.TEXTURE_2D_ARRAY,ve,be,Oe[0].width,Oe[0].height,oe.depth);for(let le=0,Me=Oe.length;le<Me;le++)if(xe=Oe[le],y.format!==Cn)if(pe!==null)if(ze){if(Y)if(y.layerUpdates.size>0){const Ee=vh(xe.width,xe.height,y.format,y.type);for(const he of y.layerUpdates){const Ue=xe.data.subarray(he*Ee/xe.data.BYTES_PER_ELEMENT,(he+1)*Ee/xe.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,le,0,0,he,xe.width,xe.height,1,pe,Ue)}}else t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,le,0,0,0,xe.width,xe.height,oe.depth,pe,xe.data)}else t.compressedTexImage3D(n.TEXTURE_2D_ARRAY,le,be,xe.width,xe.height,oe.depth,0,xe.data,0,0);else He("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else ze?Y&&t.texSubImage3D(n.TEXTURE_2D_ARRAY,le,0,0,0,xe.width,xe.height,oe.depth,pe,De,xe.data):t.texImage3D(n.TEXTURE_2D_ARRAY,le,be,xe.width,xe.height,oe.depth,0,pe,De,xe.data);y.layerUpdates.size>0&&y.clearLayerUpdates()}else{ze&&$e&&t.texStorage2D(n.TEXTURE_2D,ve,be,Oe[0].width,Oe[0].height);for(let le=0,Me=Oe.length;le<Me;le++)xe=Oe[le],y.format!==Cn?pe!==null?ze?Y&&t.compressedTexSubImage2D(n.TEXTURE_2D,le,0,0,xe.width,xe.height,pe,xe.data):t.compressedTexImage2D(n.TEXTURE_2D,le,be,xe.width,xe.height,0,xe.data):He("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):ze?Y&&t.texSubImage2D(n.TEXTURE_2D,le,0,0,xe.width,xe.height,pe,De,xe.data):t.texImage2D(n.TEXTURE_2D,le,be,xe.width,xe.height,0,pe,De,xe.data)}else if(y.isDataArrayTexture)if(ze){if($e&&t.texStorage3D(n.TEXTURE_2D_ARRAY,ve,be,oe.width,oe.height,oe.depth),Y)if(y.layerUpdates.size>0){const le=vh(oe.width,oe.height,y.format,y.type);for(const Me of y.layerUpdates){const Ee=oe.data.subarray(Me*le/oe.data.BYTES_PER_ELEMENT,(Me+1)*le/oe.data.BYTES_PER_ELEMENT);t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,Me,oe.width,oe.height,1,pe,De,Ee)}y.clearLayerUpdates()}else t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,oe.width,oe.height,oe.depth,pe,De,oe.data)}else t.texImage3D(n.TEXTURE_2D_ARRAY,0,be,oe.width,oe.height,oe.depth,0,pe,De,oe.data);else if(y.isData3DTexture)ze?($e&&t.texStorage3D(n.TEXTURE_3D,ve,be,oe.width,oe.height,oe.depth),Y&&t.texSubImage3D(n.TEXTURE_3D,0,0,0,0,oe.width,oe.height,oe.depth,pe,De,oe.data)):t.texImage3D(n.TEXTURE_3D,0,be,oe.width,oe.height,oe.depth,0,pe,De,oe.data);else if(y.isFramebufferTexture){if($e)if(ze)t.texStorage2D(n.TEXTURE_2D,ve,be,oe.width,oe.height);else{let le=oe.width,Me=oe.height;for(let Ee=0;Ee<ve;Ee++)t.texImage2D(n.TEXTURE_2D,Ee,be,le,Me,0,pe,De,null),le>>=1,Me>>=1}}else if(y.isHTMLTexture){if("texElementImage2D"in n){const le=n.canvas;if(le.hasAttribute("layoutsubtree")||le.setAttribute("layoutsubtree","true"),oe.parentNode!==le){le.appendChild(oe),f.add(y),le.onpaint=Me=>{const Ee=Me.changedElements;for(const he of f)Ee.includes(he.image)&&(he.needsUpdate=!0)},le.requestPaint();return}if(n.texElementImage2D.length===3)n.texElementImage2D(n.TEXTURE_2D,n.RGBA8,oe);else{const Ee=n.RGBA,he=n.RGBA,Ue=n.UNSIGNED_BYTE;n.texElementImage2D(n.TEXTURE_2D,0,Ee,he,Ue,oe)}n.texParameteri(n.TEXTURE_2D,n.TEXTURE_MIN_FILTER,n.LINEAR),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_S,n.CLAMP_TO_EDGE),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_T,n.CLAMP_TO_EDGE)}}else if(Oe.length>0){if(ze&&$e){const le=Ge(Oe[0]);t.texStorage2D(n.TEXTURE_2D,ve,be,le.width,le.height)}for(let le=0,Me=Oe.length;le<Me;le++)xe=Oe[le],ze?Y&&t.texSubImage2D(n.TEXTURE_2D,le,0,0,pe,De,xe):t.texImage2D(n.TEXTURE_2D,le,be,pe,De,xe);y.generateMipmaps=!1}else if(ze){if($e){const le=Ge(oe);t.texStorage2D(n.TEXTURE_2D,ve,be,le.width,le.height)}Y&&t.texSubImage2D(n.TEXTURE_2D,0,0,0,pe,De,oe)}else t.texImage2D(n.TEXTURE_2D,0,be,pe,De,oe);m(y)&&M(Z),fe.__version=ue.version,y.onUpdate&&y.onUpdate(y)}O.__version=y.version}function re(O,y,z){if(y.image.length!==6)return;const Z=me(O,y),ee=y.source;t.bindTexture(n.TEXTURE_CUBE_MAP,O.__webglTexture,n.TEXTURE0+z);const ue=i.get(ee);if(ee.version!==ue.__version||Z===!0){t.activeTexture(n.TEXTURE0+z);const fe=st.getPrimaries(st.workingColorSpace),se=y.colorSpace===Yn?null:st.getPrimaries(y.colorSpace),oe=y.colorSpace===Yn||fe===se?n.NONE:n.BROWSER_DEFAULT_WEBGL;t.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,y.flipY),t.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,y.premultiplyAlpha),t.pixelStorei(n.UNPACK_ALIGNMENT,y.unpackAlignment),t.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,oe);const pe=y.isCompressedTexture||y.image[0].isCompressedTexture,De=y.image[0]&&y.image[0].isDataTexture,be=[];for(let he=0;he<6;he++)!pe&&!De?be[he]=x(y.image[he],!0,s.maxCubemapSize):be[he]=De?y.image[he].image:y.image[he],be[he]=Qe(y,be[he]);const xe=be[0],Oe=r.convert(y.format,y.colorSpace),ze=r.convert(y.type),$e=b(y.internalFormat,Oe,ze,y.normalized,y.colorSpace),Y=y.isVideoTexture!==!0,ve=ue.__version===void 0||Z===!0,le=ee.dataReady;let Me=w(y,xe);de(n.TEXTURE_CUBE_MAP,y);let Ee;if(pe){Y&&ve&&t.texStorage2D(n.TEXTURE_CUBE_MAP,Me,$e,xe.width,xe.height);for(let he=0;he<6;he++){Ee=be[he].mipmaps;for(let Ue=0;Ue<Ee.length;Ue++){const Ie=Ee[Ue];y.format!==Cn?Oe!==null?Y?le&&t.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+he,Ue,0,0,Ie.width,Ie.height,Oe,Ie.data):t.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+he,Ue,$e,Ie.width,Ie.height,0,Ie.data):He("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Y?le&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+he,Ue,0,0,Ie.width,Ie.height,Oe,ze,Ie.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+he,Ue,$e,Ie.width,Ie.height,0,Oe,ze,Ie.data)}}}else{if(Ee=y.mipmaps,Y&&ve){Ee.length>0&&Me++;const he=Ge(be[0]);t.texStorage2D(n.TEXTURE_CUBE_MAP,Me,$e,he.width,he.height)}for(let he=0;he<6;he++)if(De){Y?le&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+he,0,0,0,be[he].width,be[he].height,Oe,ze,be[he].data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+he,0,$e,be[he].width,be[he].height,0,Oe,ze,be[he].data);for(let Ue=0;Ue<Ee.length;Ue++){const Tt=Ee[Ue].image[he].image;Y?le&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+he,Ue+1,0,0,Tt.width,Tt.height,Oe,ze,Tt.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+he,Ue+1,$e,Tt.width,Tt.height,0,Oe,ze,Tt.data)}}else{Y?le&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+he,0,0,0,Oe,ze,be[he]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+he,0,$e,Oe,ze,be[he]);for(let Ue=0;Ue<Ee.length;Ue++){const Ie=Ee[Ue];Y?le&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+he,Ue+1,0,0,Oe,ze,Ie.image[he]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+he,Ue+1,$e,Oe,ze,Ie.image[he])}}}m(y)&&M(n.TEXTURE_CUBE_MAP),ue.__version=ee.version,y.onUpdate&&y.onUpdate(y)}O.__version=y.version}function ae(O,y,z,Z,ee,ue){const fe=r.convert(z.format,z.colorSpace),se=r.convert(z.type),oe=b(z.internalFormat,fe,se,z.normalized,z.colorSpace),pe=i.get(y),De=i.get(z);if(De.__renderTarget=y,!pe.__hasExternalTextures){const be=Math.max(1,y.width>>ue),xe=Math.max(1,y.height>>ue);ee===n.TEXTURE_3D||ee===n.TEXTURE_2D_ARRAY?t.texImage3D(ee,ue,oe,be,xe,y.depth,0,fe,se,null):t.texImage2D(ee,ue,oe,be,xe,0,fe,se,null)}t.bindFramebuffer(n.FRAMEBUFFER,O),Et(y)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,Z,ee,De.__webglTexture,0,_t(y)):(ee===n.TEXTURE_2D||ee>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&ee<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,Z,ee,De.__webglTexture,ue),t.bindFramebuffer(n.FRAMEBUFFER,null)}function ge(O,y,z){if(n.bindRenderbuffer(n.RENDERBUFFER,O),y.depthBuffer){const Z=y.depthTexture,ee=Z&&Z.isDepthTexture?Z.type:null,ue=A(y.stencilBuffer,ee),fe=y.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;Et(y)?o.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,_t(y),ue,y.width,y.height):z?n.renderbufferStorageMultisample(n.RENDERBUFFER,_t(y),ue,y.width,y.height):n.renderbufferStorage(n.RENDERBUFFER,ue,y.width,y.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,fe,n.RENDERBUFFER,O)}else{const Z=y.textures;for(let ee=0;ee<Z.length;ee++){const ue=Z[ee],fe=r.convert(ue.format,ue.colorSpace),se=r.convert(ue.type),oe=b(ue.internalFormat,fe,se,ue.normalized,ue.colorSpace);Et(y)?o.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,_t(y),oe,y.width,y.height):z?n.renderbufferStorageMultisample(n.RENDERBUFFER,_t(y),oe,y.width,y.height):n.renderbufferStorage(n.RENDERBUFFER,oe,y.width,y.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function ke(O,y,z){const Z=y.isWebGLCubeRenderTarget===!0;if(t.bindFramebuffer(n.FRAMEBUFFER,O),!(y.depthTexture&&y.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");const ee=i.get(y.depthTexture);if(ee.__renderTarget=y,(!ee.__webglTexture||y.depthTexture.image.width!==y.width||y.depthTexture.image.height!==y.height)&&(y.depthTexture.image.width=y.width,y.depthTexture.image.height=y.height,y.depthTexture.needsUpdate=!0),Z){if(ee.__webglInit===void 0&&(ee.__webglInit=!0,y.depthTexture.addEventListener("dispose",L)),ee.__webglTexture===void 0){ee.__webglTexture=n.createTexture(),t.bindTexture(n.TEXTURE_CUBE_MAP,ee.__webglTexture),de(n.TEXTURE_CUBE_MAP,y.depthTexture);const pe=r.convert(y.depthTexture.format),De=r.convert(y.depthTexture.type);let be;y.depthTexture.format===Ei?be=n.DEPTH_COMPONENT24:y.depthTexture.format===rs&&(be=n.DEPTH24_STENCIL8);for(let xe=0;xe<6;xe++)n.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+xe,0,be,y.width,y.height,0,pe,De,null)}}else te(y.depthTexture,0);const ue=ee.__webglTexture,fe=_t(y),se=Z?n.TEXTURE_CUBE_MAP_POSITIVE_X+z:n.TEXTURE_2D,oe=y.depthTexture.format===rs?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;if(y.depthTexture.format===Ei)Et(y)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,oe,se,ue,0,fe):n.framebufferTexture2D(n.FRAMEBUFFER,oe,se,ue,0);else if(y.depthTexture.format===rs)Et(y)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,oe,se,ue,0,fe):n.framebufferTexture2D(n.FRAMEBUFFER,oe,se,ue,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function Ce(O){const y=i.get(O),z=O.isWebGLCubeRenderTarget===!0;if(y.__boundDepthTexture!==O.depthTexture){const Z=O.depthTexture;if(y.__depthDisposeCallback&&y.__depthDisposeCallback(),Z){const ee=()=>{delete y.__boundDepthTexture,delete y.__depthDisposeCallback,Z.removeEventListener("dispose",ee)};Z.addEventListener("dispose",ee),y.__depthDisposeCallback=ee}y.__boundDepthTexture=Z}if(O.depthTexture&&!y.__autoAllocateDepthBuffer)if(z)for(let Z=0;Z<6;Z++)ke(y.__webglFramebuffer[Z],O,Z);else{const Z=O.texture.mipmaps;Z&&Z.length>0?ke(y.__webglFramebuffer[0],O,0):ke(y.__webglFramebuffer,O,0)}else if(z){y.__webglDepthbuffer=[];for(let Z=0;Z<6;Z++)if(t.bindFramebuffer(n.FRAMEBUFFER,y.__webglFramebuffer[Z]),y.__webglDepthbuffer[Z]===void 0)y.__webglDepthbuffer[Z]=n.createRenderbuffer(),ge(y.__webglDepthbuffer[Z],O,!1);else{const ee=O.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,ue=y.__webglDepthbuffer[Z];n.bindRenderbuffer(n.RENDERBUFFER,ue),n.framebufferRenderbuffer(n.FRAMEBUFFER,ee,n.RENDERBUFFER,ue)}}else{const Z=O.texture.mipmaps;if(Z&&Z.length>0?t.bindFramebuffer(n.FRAMEBUFFER,y.__webglFramebuffer[0]):t.bindFramebuffer(n.FRAMEBUFFER,y.__webglFramebuffer),y.__webglDepthbuffer===void 0)y.__webglDepthbuffer=n.createRenderbuffer(),ge(y.__webglDepthbuffer,O,!1);else{const ee=O.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,ue=y.__webglDepthbuffer;n.bindRenderbuffer(n.RENDERBUFFER,ue),n.framebufferRenderbuffer(n.FRAMEBUFFER,ee,n.RENDERBUFFER,ue)}}t.bindFramebuffer(n.FRAMEBUFFER,null)}function Fe(O,y,z){const Z=i.get(O);y!==void 0&&ae(Z.__webglFramebuffer,O,O.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),z!==void 0&&Ce(O)}function qe(O){const y=O.texture,z=i.get(O),Z=i.get(y);O.addEventListener("dispose",_);const ee=O.textures,ue=O.isWebGLCubeRenderTarget===!0,fe=ee.length>1;if(fe||(Z.__webglTexture===void 0&&(Z.__webglTexture=n.createTexture()),Z.__version=y.version,a.memory.textures++),ue){z.__webglFramebuffer=[];for(let se=0;se<6;se++)if(y.mipmaps&&y.mipmaps.length>0){z.__webglFramebuffer[se]=[];for(let oe=0;oe<y.mipmaps.length;oe++)z.__webglFramebuffer[se][oe]=n.createFramebuffer()}else z.__webglFramebuffer[se]=n.createFramebuffer()}else{if(y.mipmaps&&y.mipmaps.length>0){z.__webglFramebuffer=[];for(let se=0;se<y.mipmaps.length;se++)z.__webglFramebuffer[se]=n.createFramebuffer()}else z.__webglFramebuffer=n.createFramebuffer();if(fe)for(let se=0,oe=ee.length;se<oe;se++){const pe=i.get(ee[se]);pe.__webglTexture===void 0&&(pe.__webglTexture=n.createTexture(),a.memory.textures++)}if(O.samples>0&&Et(O)===!1){z.__webglMultisampledFramebuffer=n.createFramebuffer(),z.__webglColorRenderbuffer=[],t.bindFramebuffer(n.FRAMEBUFFER,z.__webglMultisampledFramebuffer);for(let se=0;se<ee.length;se++){const oe=ee[se];z.__webglColorRenderbuffer[se]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,z.__webglColorRenderbuffer[se]);const pe=r.convert(oe.format,oe.colorSpace),De=r.convert(oe.type),be=b(oe.internalFormat,pe,De,oe.normalized,oe.colorSpace,O.isXRRenderTarget===!0),xe=_t(O);n.renderbufferStorageMultisample(n.RENDERBUFFER,xe,be,O.width,O.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+se,n.RENDERBUFFER,z.__webglColorRenderbuffer[se])}n.bindRenderbuffer(n.RENDERBUFFER,null),O.depthBuffer&&(z.__webglDepthRenderbuffer=n.createRenderbuffer(),ge(z.__webglDepthRenderbuffer,O,!0)),t.bindFramebuffer(n.FRAMEBUFFER,null)}}if(ue){t.bindTexture(n.TEXTURE_CUBE_MAP,Z.__webglTexture),de(n.TEXTURE_CUBE_MAP,y);for(let se=0;se<6;se++)if(y.mipmaps&&y.mipmaps.length>0)for(let oe=0;oe<y.mipmaps.length;oe++)ae(z.__webglFramebuffer[se][oe],O,y,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+se,oe);else ae(z.__webglFramebuffer[se],O,y,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+se,0);m(y)&&M(n.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(fe){for(let se=0,oe=ee.length;se<oe;se++){const pe=ee[se],De=i.get(pe);let be=n.TEXTURE_2D;(O.isWebGL3DRenderTarget||O.isWebGLArrayRenderTarget)&&(be=O.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(be,De.__webglTexture),de(be,pe),ae(z.__webglFramebuffer,O,pe,n.COLOR_ATTACHMENT0+se,be,0),m(pe)&&M(be)}t.unbindTexture()}else{let se=n.TEXTURE_2D;if((O.isWebGL3DRenderTarget||O.isWebGLArrayRenderTarget)&&(se=O.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(se,Z.__webglTexture),de(se,y),y.mipmaps&&y.mipmaps.length>0)for(let oe=0;oe<y.mipmaps.length;oe++)ae(z.__webglFramebuffer[oe],O,y,n.COLOR_ATTACHMENT0,se,oe);else ae(z.__webglFramebuffer,O,y,n.COLOR_ATTACHMENT0,se,0);m(y)&&M(se),t.unbindTexture()}O.depthBuffer&&Ce(O)}function Ke(O){const y=O.textures;for(let z=0,Z=y.length;z<Z;z++){const ee=y[z];if(m(ee)){const ue=S(O),fe=i.get(ee).__webglTexture;t.bindTexture(ue,fe),M(ue),t.unbindTexture()}}}const wt=[],Ut=[];function nn(O){if(O.samples>0){if(Et(O)===!1){const y=O.textures,z=O.width,Z=O.height;let ee=n.COLOR_BUFFER_BIT;const ue=O.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,fe=i.get(O),se=y.length>1;if(se)for(let pe=0;pe<y.length;pe++)t.bindFramebuffer(n.FRAMEBUFFER,fe.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+pe,n.RENDERBUFFER,null),t.bindFramebuffer(n.FRAMEBUFFER,fe.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+pe,n.TEXTURE_2D,null,0);t.bindFramebuffer(n.READ_FRAMEBUFFER,fe.__webglMultisampledFramebuffer);const oe=O.texture.mipmaps;oe&&oe.length>0?t.bindFramebuffer(n.DRAW_FRAMEBUFFER,fe.__webglFramebuffer[0]):t.bindFramebuffer(n.DRAW_FRAMEBUFFER,fe.__webglFramebuffer);for(let pe=0;pe<y.length;pe++){if(O.resolveDepthBuffer&&(O.depthBuffer&&(ee|=n.DEPTH_BUFFER_BIT),O.stencilBuffer&&O.resolveStencilBuffer&&(ee|=n.STENCIL_BUFFER_BIT)),se){n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,fe.__webglColorRenderbuffer[pe]);const De=i.get(y[pe]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,De,0)}n.blitFramebuffer(0,0,z,Z,0,0,z,Z,ee,n.NEAREST),h===!0&&(wt.length=0,Ut.length=0,wt.push(n.COLOR_ATTACHMENT0+pe),O.depthBuffer&&O.storeMultisampledDepthBuffer===!1&&(wt.push(ue),Ut.push(ue),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,Ut)),n.invalidateFramebuffer(n.READ_FRAMEBUFFER,wt))}if(t.bindFramebuffer(n.READ_FRAMEBUFFER,null),t.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),se)for(let pe=0;pe<y.length;pe++){t.bindFramebuffer(n.FRAMEBUFFER,fe.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+pe,n.RENDERBUFFER,fe.__webglColorRenderbuffer[pe]);const De=i.get(y[pe]).__webglTexture;t.bindFramebuffer(n.FRAMEBUFFER,fe.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+pe,n.TEXTURE_2D,De,0)}t.bindFramebuffer(n.DRAW_FRAMEBUFFER,fe.__webglMultisampledFramebuffer)}else if(O.depthBuffer&&O.storeMultisampledDepthBuffer===!1&&h){const y=O.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[y])}}}function _t(O){return Math.min(s.maxSamples,O.samples)}function Et(O){const y=i.get(O);return O.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&y.__useRenderToTexture!==!1}function V(O){const y=a.render.frame;u.get(O)!==y&&(u.set(O,y),O.update())}function Qe(O,y){const z=O.colorSpace,Z=O.format,ee=O.type;return O.isCompressedTexture===!0||O.isVideoTexture===!0||z!==_r&&z!==Yn&&(st.getTransfer(z)===vt?(Z!==Cn||ee!==Rn)&&He("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):ct("WebGLTextures: Unsupported texture color space:",z)),y}function Ge(O){return typeof HTMLImageElement<"u"&&O instanceof HTMLImageElement?(l.width=O.naturalWidth||O.width,l.height=O.naturalHeight||O.height):typeof VideoFrame<"u"&&O instanceof VideoFrame?(l.width=O.displayWidth,l.height=O.displayHeight):(l.width=O.width,l.height=O.height),l}this.allocateTextureUnit=H,this.resetTextureUnits=U,this.getTextureUnits=N,this.setTextureUnits=F,this.setTexture2D=te,this.setTexture2DArray=K,this.setTexture3D=B,this.setTextureCube=I,this.rebindTextures=Fe,this.setupRenderTarget=qe,this.updateRenderTargetMipmap=Ke,this.updateMultisampleRenderTarget=nn,this.setupDepthRenderbuffer=Ce,this.setupFrameBufferTexture=ae,this.useMultisampledRTT=Et,this.isReversedDepthBuffer=function(){return t.buffers.depth.getReversed()}}function jM(n,e){function t(i,s=Yn){let r;const a=st.getTransfer(s);if(i===Rn)return n.UNSIGNED_BYTE;if(i===ic)return n.UNSIGNED_SHORT_4_4_4_4;if(i===sc)return n.UNSIGNED_SHORT_5_5_5_1;if(i===Bu)return n.UNSIGNED_INT_5_9_9_9_REV;if(i===ku)return n.UNSIGNED_INT_10F_11F_11F_REV;if(i===Uu)return n.BYTE;if(i===Fu)return n.SHORT;if(i===vr)return n.UNSIGNED_SHORT;if(i===nc)return n.INT;if(i===ui)return n.UNSIGNED_INT;if(i===oi)return n.FLOAT;if(i===di)return n.HALF_FLOAT;if(i===zu)return n.ALPHA;if(i===Gu)return n.RGB;if(i===Cn)return n.RGBA;if(i===Ei)return n.DEPTH_COMPONENT;if(i===rs)return n.DEPTH_STENCIL;if(i===Hu)return n.RED;if(i===rc)return n.RED_INTEGER;if(i===ds)return n.RG;if(i===ac)return n.RG_INTEGER;if(i===oc)return n.RGBA_INTEGER;if(i===pa||i===ma||i===ga||i===xa)if(a===vt)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(i===pa)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===ma)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===ga)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===xa)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(i===pa)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===ma)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===ga)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===xa)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===sl||i===rl||i===al||i===ol)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(i===sl)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===rl)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===al)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===ol)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===ll||i===cl||i===hl||i===ul||i===dl||i===wa||i===fl)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(i===ll||i===cl)return a===vt?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(i===hl)return a===vt?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC;if(i===ul)return r.COMPRESSED_R11_EAC;if(i===dl)return r.COMPRESSED_SIGNED_R11_EAC;if(i===wa)return r.COMPRESSED_RG11_EAC;if(i===fl)return r.COMPRESSED_SIGNED_RG11_EAC}else return null;if(i===pl||i===ml||i===gl||i===xl||i===vl||i===Ml||i===_l||i===bl||i===Sl||i===yl||i===wl||i===El||i===Al||i===Tl)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(i===pl)return a===vt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===ml)return a===vt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===gl)return a===vt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===xl)return a===vt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===vl)return a===vt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===Ml)return a===vt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===_l)return a===vt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===bl)return a===vt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===Sl)return a===vt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===yl)return a===vt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===wl)return a===vt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===El)return a===vt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===Al)return a===vt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===Tl)return a===vt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===Rl||i===Cl||i===Ll)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(i===Rl)return a===vt?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===Cl)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===Ll)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===Pl||i===Dl||i===Ea||i===Il)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(i===Pl)return r.COMPRESSED_RED_RGTC1_EXT;if(i===Dl)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===Ea)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===Il)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===Mr?n.UNSIGNED_INT_24_8:n[i]!==void 0?n[i]:null}return{convert:t}}const e_=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,t_=`
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

}`;class n_{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){const i=new Qu(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=i}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,i=new yt({vertexShader:e_,fragmentShader:t_,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new $t(new Dn(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class i_ extends ps{constructor(e,t){super();const i=this;let s=null,r=1,a=null,o="local-floor",h=1,l=null,u=null,f=null,d=null,p=null,g=null;const v=typeof XRWebGLBinding<"u",x=new n_,m={},M=t.getContextAttributes();let S=null,b=null;const A=[],w=[],L=new We;let _=null,E=null;const P=new Tn;P.viewport=new it;const T=new Tn;T.viewport=new it;const D=[P,T],U=new u1;let N=null,F=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(j){let ie=A[j];return ie===void 0&&(ie=new po,A[j]=ie),ie.getTargetRaySpace()},this.getControllerGrip=function(j){let ie=A[j];return ie===void 0&&(ie=new po,A[j]=ie),ie.getGripSpace()},this.getHand=function(j){let ie=A[j];return ie===void 0&&(ie=new po,A[j]=ie),ie.getHandSpace()};function H(j){const ie=w.indexOf(j.inputSource);if(ie===-1)return;const k=A[ie];k!==void 0&&(k.update(j.inputSource,j.frame,l||a),k.dispatchEvent({type:j.type,data:j.inputSource}))}function W(){s.removeEventListener("select",H),s.removeEventListener("selectstart",H),s.removeEventListener("selectend",H),s.removeEventListener("squeeze",H),s.removeEventListener("squeezestart",H),s.removeEventListener("squeezeend",H),s.removeEventListener("end",W),s.removeEventListener("inputsourceschange",te);for(let j=0;j<A.length;j++){const ie=w[j];ie!==null&&(w[j]=null,A[j].disconnect(ie))}N=null,F=null,x.reset();for(const j in m)delete m[j];if(e.setRenderTarget(S),p=null,d=null,f=null,s=null,b=null,me.stop(),i.isPresenting=!1,e.setPixelRatio(_),e.setSize(L.width,L.height,!1),E!==null){const j=E.camera;j.fov=E.fov,j.zoom=E.zoom,j.updateProjectionMatrix(),E=null}i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(j){r=j,i.isPresenting===!0&&He("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(j){o=j,i.isPresenting===!0&&He("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||a},this.setReferenceSpace=function(j){l=j},this.getBaseLayer=function(){return d!==null?d:p},this.getBinding=function(){return f===null&&v&&(f=new XRWebGLBinding(s,t)),f},this.getFrame=function(){return g},this.getSession=function(){return s},this.setSession=async function(j){if(s=j,s!==null){if(S=e.getRenderTarget(),s.addEventListener("select",H),s.addEventListener("selectstart",H),s.addEventListener("selectend",H),s.addEventListener("squeeze",H),s.addEventListener("squeezestart",H),s.addEventListener("squeezeend",H),s.addEventListener("end",W),s.addEventListener("inputsourceschange",te),M.xrCompatible!==!0&&await t.makeXRCompatible(),_=e.getPixelRatio(),e.getSize(L),v&&"createProjectionLayer"in XRWebGLBinding.prototype){let k=null,re=null,ae=null;M.depth&&(ae=M.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,k=M.stencil?rs:Ei,re=M.stencil?Mr:ui);const ge={colorFormat:t.RGBA8,depthFormat:ae,scaleFactor:r};f=this.getBinding(),d=f.createProjectionLayer(ge),s.updateRenderState({layers:[d]}),e.setPixelRatio(1),e.setSize(d.textureWidth,d.textureHeight,!1),b=new Fn(d.textureWidth,d.textureHeight,{format:Cn,type:Rn,depthTexture:new Ys(d.textureWidth,d.textureHeight,re,void 0,void 0,void 0,void 0,void 0,void 0,k),stencilBuffer:M.stencil,colorSpace:e.outputColorSpace,samples:M.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1,storeMultisampledDepthBuffer:d.ignoreDepthValues===!1,storeMultisampledStencilBuffer:d.ignoreDepthValues===!1})}else{const k={antialias:M.antialias,alpha:!0,depth:M.depth,stencil:M.stencil,framebufferScaleFactor:r};p=new XRWebGLLayer(s,t,k),s.updateRenderState({baseLayer:p}),e.setPixelRatio(1),e.setSize(p.framebufferWidth,p.framebufferHeight,!1),b=new Fn(p.framebufferWidth,p.framebufferHeight,{format:Cn,type:Rn,colorSpace:e.outputColorSpace,stencilBuffer:M.stencil,resolveDepthBuffer:p.ignoreDepthValues===!1,resolveStencilBuffer:p.ignoreDepthValues===!1,storeMultisampledDepthBuffer:p.ignoreDepthValues===!1,storeMultisampledStencilBuffer:p.ignoreDepthValues===!1})}b.isXRRenderTarget=!0,this.setFoveation(h),l=null,a=await s.requestReferenceSpace(o),me.setContext(s),me.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return x.getDepthTexture()};function te(j){for(let ie=0;ie<j.removed.length;ie++){const k=j.removed[ie],re=w.indexOf(k);re>=0&&(w[re]=null,A[re].disconnect(k))}for(let ie=0;ie<j.added.length;ie++){const k=j.added[ie];let re=w.indexOf(k);if(re===-1){for(let ge=0;ge<A.length;ge++)if(ge>=w.length){w.push(k),re=ge;break}else if(w[ge]===null){w[ge]=k,re=ge;break}if(re===-1)break}const ae=A[re];ae&&ae.connect(k)}}const K=new X,B=new X;function I(j,ie,k){K.setFromMatrixPosition(ie.matrixWorld),B.setFromMatrixPosition(k.matrixWorld);const re=K.distanceTo(B),ae=ie.projectionMatrix.elements,ge=k.projectionMatrix.elements,ke=ae[14]/(ae[10]-1),Ce=ae[14]/(ae[10]+1),Fe=(ae[9]+1)/ae[5],qe=(ae[9]-1)/ae[5],Ke=(ae[8]-1)/ae[0],wt=(ge[8]+1)/ge[0],Ut=ke*Ke,nn=ke*wt,_t=re/(-Ke+wt),Et=_t*-Ke;if(ie.matrixWorld.decompose(j.position,j.quaternion,j.scale),j.translateX(Et),j.translateZ(_t),j.matrixWorld.compose(j.position,j.quaternion,j.scale),j.matrixWorldInverse.copy(j.matrixWorld).invert(),ae[10]===-1)j.projectionMatrix.copy(ie.projectionMatrix),j.projectionMatrixInverse.copy(ie.projectionMatrixInverse);else{const V=ke+_t,Qe=Ce+_t,Ge=Ut-Et,O=nn+(re-Et),y=Fe*Ce/Qe*V,z=qe*Ce/Qe*V;j.projectionMatrix.makePerspective(Ge,O,y,z,V,Qe),j.projectionMatrixInverse.copy(j.projectionMatrix).invert()}}function q(j,ie){ie===null?j.matrixWorld.copy(j.matrix):j.matrixWorld.multiplyMatrices(ie.matrixWorld,j.matrix),j.matrixWorldInverse.copy(j.matrixWorld).invert()}this.updateCamera=function(j){if(s===null)return;let ie=j.near,k=j.far;x.texture!==null&&(x.depthNear>0&&(ie=x.depthNear),x.depthFar>0&&(k=x.depthFar)),U.near=T.near=P.near=ie,U.far=T.far=P.far=k,(N!==U.near||F!==U.far)&&(s.updateRenderState({depthNear:U.near,depthFar:U.far}),N=U.near,F=U.far),U.layers.mask=j.layers.mask|6,P.layers.mask=U.layers.mask&-5,T.layers.mask=U.layers.mask&-3;const re=j.parent,ae=U.cameras;q(U,re);for(let ge=0;ge<ae.length;ge++)q(ae[ge],re);ae.length===2?I(U,P,T):U.projectionMatrix.copy(P.projectionMatrix),E===null&&j.isPerspectiveCamera&&(E={camera:j,fov:j.fov,zoom:j.zoom}),$(j,U,re)};function $(j,ie,k){k===null?j.matrix.copy(ie.matrixWorld):(j.matrix.copy(k.matrixWorld),j.matrix.invert(),j.matrix.multiply(ie.matrixWorld)),j.matrix.decompose(j.position,j.quaternion,j.scale),j.updateMatrixWorld(!0),j.projectionMatrix.copy(ie.projectionMatrix),j.projectionMatrixInverse.copy(ie.projectionMatrixInverse),j.isPerspectiveCamera&&(j.fov=Nl*2*Math.atan(1/j.projectionMatrix.elements[5]),j.zoom=1)}this.getCamera=function(){return U},this.getFoveation=function(){if(!(d===null&&p===null))return h},this.setFoveation=function(j){h=j,d!==null&&(d.fixedFoveation=j),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=j)},this.hasDepthSensing=function(){return x.texture!==null},this.getDepthSensingMesh=function(){return x.getMesh(U)},this.getCameraTexture=function(j){return m[j]};let ce=null;function de(j,ie){if(u=ie.getViewerPose(l||a),g=ie,u!==null){const k=u.views;p!==null&&(e.setRenderTargetFramebuffer(b,p.framebuffer),e.setRenderTarget(b));let re=!1;k.length!==U.cameras.length&&(U.cameras.length=0,re=!0);for(let Ce=0;Ce<k.length;Ce++){const Fe=k[Ce];let qe=null;if(p!==null)qe=p.getViewport(Fe);else{const wt=f.getViewSubImage(d,Fe);qe=wt.viewport,Ce===0&&(e.setRenderTargetTextures(b,wt.colorTexture,wt.depthStencilTexture),e.setRenderTarget(b))}let Ke=D[Ce];Ke===void 0&&(Ke=new Tn,Ke.layers.enable(Ce),Ke.viewport=new it,D[Ce]=Ke),Ke.matrix.fromArray(Fe.transform.matrix),Ke.matrix.decompose(Ke.position,Ke.quaternion,Ke.scale),Ke.projectionMatrix.fromArray(Fe.projectionMatrix),Ke.projectionMatrixInverse.copy(Ke.projectionMatrix).invert(),Ke.viewport.set(qe.x,qe.y,qe.width,qe.height),Ce===0&&(U.matrix.copy(Ke.matrix),U.matrix.decompose(U.position,U.quaternion,U.scale)),re===!0&&U.cameras.push(Ke)}const ae=s.enabledFeatures;if(ae&&ae.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&v){f=i.getBinding();const Ce=f.getDepthInformation(k[0]);Ce&&Ce.isValid&&Ce.texture&&x.init(Ce,s.renderState)}if(ae&&ae.includes("camera-access")&&v){e.state.unbindTexture(),f=i.getBinding();for(let Ce=0;Ce<k.length;Ce++){const Fe=k[Ce].camera;if(Fe){let qe=m[Fe];qe||(qe=new Qu,m[Fe]=qe);const Ke=f.getCameraImage(Fe);qe.sourceTexture=Ke}}}}for(let k=0;k<A.length;k++){const re=w[k],ae=A[k];re!==null&&ae!==void 0&&ae.update(re,ie,l||a)}ce&&ce(j,ie),ie.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:ie}),g=null}const me=new nd;me.setAnimationLoop(de),this.setAnimationLoop=function(j){ce=j},this.dispose=function(){}}}const s_=new Ot,cd=new Ye;cd.set(-1,0,0,0,1,0,0,0,1);function r_(n,e){function t(x,m){x.matrixAutoUpdate===!0&&x.updateMatrix(),m.value.copy(x.matrix)}function i(x,m){m.color.getRGB(x.fogColor.value,ju(n)),m.isFog?(x.fogNear.value=m.near,x.fogFar.value=m.far):m.isFogExp2&&(x.fogDensity.value=m.density)}function s(x,m,M,S,b){m.isNodeMaterial?m.uniformsNeedUpdate=!1:m.isMeshBasicMaterial?r(x,m):m.isMeshLambertMaterial?(r(x,m),m.envMap&&(x.envMapIntensity.value=m.envMapIntensity)):m.isMeshToonMaterial?(r(x,m),f(x,m)):m.isMeshPhongMaterial?(r(x,m),u(x,m),m.envMap&&(x.envMapIntensity.value=m.envMapIntensity)):m.isMeshStandardMaterial?(r(x,m),d(x,m),m.isMeshPhysicalMaterial&&p(x,m,b)):m.isMeshMatcapMaterial?(r(x,m),g(x,m)):m.isMeshDepthMaterial?r(x,m):m.isMeshDistanceMaterial?(r(x,m),v(x,m)):m.isMeshNormalMaterial?r(x,m):m.isLineBasicMaterial?(a(x,m),m.isLineDashedMaterial&&o(x,m)):m.isPointsMaterial?h(x,m,M,S):m.isSpriteMaterial?l(x,m):m.isShadowMaterial?(x.color.value.copy(m.color),x.opacity.value=m.opacity):m.isShaderMaterial&&(m.uniformsNeedUpdate=!1)}function r(x,m){x.opacity.value=m.opacity,m.color&&x.diffuse.value.copy(m.color),m.emissive&&x.emissive.value.copy(m.emissive).multiplyScalar(m.emissiveIntensity),m.map&&(x.map.value=m.map,t(m.map,x.mapTransform)),m.alphaMap&&(x.alphaMap.value=m.alphaMap,t(m.alphaMap,x.alphaMapTransform)),m.bumpMap&&(x.bumpMap.value=m.bumpMap,t(m.bumpMap,x.bumpMapTransform),x.bumpScale.value=m.bumpScale,m.side===yn&&(x.bumpScale.value*=-1)),m.normalMap&&(x.normalMap.value=m.normalMap,t(m.normalMap,x.normalMapTransform),x.normalScale.value.copy(m.normalScale),m.side===yn&&x.normalScale.value.negate()),m.displacementMap&&(x.displacementMap.value=m.displacementMap,t(m.displacementMap,x.displacementMapTransform),x.displacementScale.value=m.displacementScale,x.displacementBias.value=m.displacementBias),m.emissiveMap&&(x.emissiveMap.value=m.emissiveMap,t(m.emissiveMap,x.emissiveMapTransform)),m.specularMap&&(x.specularMap.value=m.specularMap,t(m.specularMap,x.specularMapTransform)),m.alphaTest>0&&(x.alphaTest.value=m.alphaTest);const M=e.get(m),S=M.envMap,b=M.envMapRotation;S&&(x.envMap.value=S,x.envMapRotation.value.setFromMatrix4(s_.makeRotationFromEuler(b)).transpose(),S.isCubeTexture&&S.isRenderTargetTexture===!1&&x.envMapRotation.value.premultiply(cd),x.reflectivity.value=m.reflectivity,x.ior.value=m.ior,x.refractionRatio.value=m.refractionRatio),m.lightMap&&(x.lightMap.value=m.lightMap,x.lightMapIntensity.value=m.lightMapIntensity,t(m.lightMap,x.lightMapTransform)),m.aoMap&&(x.aoMap.value=m.aoMap,x.aoMapIntensity.value=m.aoMapIntensity,t(m.aoMap,x.aoMapTransform))}function a(x,m){x.diffuse.value.copy(m.color),x.opacity.value=m.opacity,m.map&&(x.map.value=m.map,t(m.map,x.mapTransform))}function o(x,m){x.dashSize.value=m.dashSize,x.totalSize.value=m.dashSize+m.gapSize,x.scale.value=m.scale}function h(x,m,M,S){x.diffuse.value.copy(m.color),x.opacity.value=m.opacity,x.size.value=m.size*M,x.scale.value=S*.5,m.map&&(x.map.value=m.map,t(m.map,x.uvTransform)),m.alphaMap&&(x.alphaMap.value=m.alphaMap,t(m.alphaMap,x.alphaMapTransform)),m.alphaTest>0&&(x.alphaTest.value=m.alphaTest)}function l(x,m){x.diffuse.value.copy(m.color),x.opacity.value=m.opacity,x.rotation.value=m.rotation,m.map&&(x.map.value=m.map,t(m.map,x.mapTransform)),m.alphaMap&&(x.alphaMap.value=m.alphaMap,t(m.alphaMap,x.alphaMapTransform)),m.alphaTest>0&&(x.alphaTest.value=m.alphaTest)}function u(x,m){x.specular.value.copy(m.specular),x.shininess.value=Math.max(m.shininess,1e-4)}function f(x,m){m.gradientMap&&(x.gradientMap.value=m.gradientMap)}function d(x,m){x.metalness.value=m.metalness,m.metalnessMap&&(x.metalnessMap.value=m.metalnessMap,t(m.metalnessMap,x.metalnessMapTransform)),x.roughness.value=m.roughness,m.roughnessMap&&(x.roughnessMap.value=m.roughnessMap,t(m.roughnessMap,x.roughnessMapTransform)),m.envMap&&(x.envMapIntensity.value=m.envMapIntensity)}function p(x,m,M){x.ior.value=m.ior,m.sheen>0&&(x.sheenColor.value.copy(m.sheenColor).multiplyScalar(m.sheen),x.sheenRoughness.value=m.sheenRoughness,m.sheenColorMap&&(x.sheenColorMap.value=m.sheenColorMap,t(m.sheenColorMap,x.sheenColorMapTransform)),m.sheenRoughnessMap&&(x.sheenRoughnessMap.value=m.sheenRoughnessMap,t(m.sheenRoughnessMap,x.sheenRoughnessMapTransform))),m.clearcoat>0&&(x.clearcoat.value=m.clearcoat,x.clearcoatRoughness.value=m.clearcoatRoughness,m.clearcoatMap&&(x.clearcoatMap.value=m.clearcoatMap,t(m.clearcoatMap,x.clearcoatMapTransform)),m.clearcoatRoughnessMap&&(x.clearcoatRoughnessMap.value=m.clearcoatRoughnessMap,t(m.clearcoatRoughnessMap,x.clearcoatRoughnessMapTransform)),m.clearcoatNormalMap&&(x.clearcoatNormalMap.value=m.clearcoatNormalMap,t(m.clearcoatNormalMap,x.clearcoatNormalMapTransform),x.clearcoatNormalScale.value.copy(m.clearcoatNormalScale),m.side===yn&&x.clearcoatNormalScale.value.negate())),m.dispersion>0&&(x.dispersion.value=m.dispersion),m.retroreflectivity>0&&(x.retroreflectivity.value=m.retroreflectivity),m.iridescence>0&&(x.iridescence.value=m.iridescence,x.iridescenceIOR.value=m.iridescenceIOR,x.iridescenceThicknessMinimum.value=m.iridescenceThicknessRange[0],x.iridescenceThicknessMaximum.value=m.iridescenceThicknessRange[1],m.iridescenceMap&&(x.iridescenceMap.value=m.iridescenceMap,t(m.iridescenceMap,x.iridescenceMapTransform)),m.iridescenceThicknessMap&&(x.iridescenceThicknessMap.value=m.iridescenceThicknessMap,t(m.iridescenceThicknessMap,x.iridescenceThicknessMapTransform))),m.transmission>0&&(x.transmission.value=m.transmission,x.transmissionSamplerMap.value=M.texture,x.transmissionSamplerSize.value.set(M.width,M.height),m.transmissionMap&&(x.transmissionMap.value=m.transmissionMap,t(m.transmissionMap,x.transmissionMapTransform)),x.thickness.value=m.thickness,m.thicknessMap&&(x.thicknessMap.value=m.thicknessMap,t(m.thicknessMap,x.thicknessMapTransform)),x.attenuationDistance.value=m.attenuationDistance,x.attenuationColor.value.copy(m.attenuationColor)),m.anisotropy>0&&(x.anisotropyVector.value.set(m.anisotropy*Math.cos(m.anisotropyRotation),m.anisotropy*Math.sin(m.anisotropyRotation)),m.anisotropyMap&&(x.anisotropyMap.value=m.anisotropyMap,t(m.anisotropyMap,x.anisotropyMapTransform))),x.specularIntensity.value=m.specularIntensity,x.specularColor.value.copy(m.specularColor),m.specularColorMap&&(x.specularColorMap.value=m.specularColorMap,t(m.specularColorMap,x.specularColorMapTransform)),m.specularIntensityMap&&(x.specularIntensityMap.value=m.specularIntensityMap,t(m.specularIntensityMap,x.specularIntensityMapTransform))}function g(x,m){m.matcap&&(x.matcap.value=m.matcap)}function v(x,m){const M=e.get(m).light;x.referencePosition.value.setFromMatrixPosition(M.matrixWorld),x.nearDistance.value=M.shadow.camera.near,x.farDistance.value=M.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:s}}function a_(n,e,t,i){let s={},r={},a=[];const o=n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS);function h(b,A){const w=A.program;i.uniformBlockBinding(b,w)}function l(b,A){let w=s[b.id];w===void 0&&(x(b),w=u(b),s[b.id]=w,b.addEventListener("dispose",M));const L=A.program;i.updateUBOMapping(b,L);const _=e.render.frame;r[b.id]!==_&&(d(b),r[b.id]=_)}function u(b){const A=f();b.__bindingPointIndex=A;const w=n.createBuffer(),L=b.__size,_=b.usage;return n.bindBuffer(n.UNIFORM_BUFFER,w),n.bufferData(n.UNIFORM_BUFFER,L,_),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,A,w),w}function f(){for(let b=0;b<o;b++)if(a.indexOf(b)===-1)return a.push(b),b;return ct("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(b){const A=s[b.id],w=b.uniforms,L=b.__cache;n.bindBuffer(n.UNIFORM_BUFFER,A);for(let _=0,E=w.length;_<E;_++){const P=w[_];if(Array.isArray(P))for(let T=0,D=P.length;T<D;T++)p(P[T],_,T,L);else p(P,_,0,L)}n.bindBuffer(n.UNIFORM_BUFFER,null)}function p(b,A,w,L){if(v(b,A,w,L)===!0){const _=b.__offset,E=b.value;if(Array.isArray(E)){let P=0;for(let T=0;T<E.length;T++){const D=E[T],U=m(D);g(D,b.__data,P),typeof D!="number"&&typeof D!="boolean"&&!D.isMatrix3&&!ArrayBuffer.isView(D)&&(P+=U.storage/Float32Array.BYTES_PER_ELEMENT)}}else g(E,b.__data,0);n.bufferSubData(n.UNIFORM_BUFFER,_,b.__data)}}function g(b,A,w){typeof b=="number"||typeof b=="boolean"?A[0]=b:b.isMatrix3?(A[0]=b.elements[0],A[1]=b.elements[1],A[2]=b.elements[2],A[3]=0,A[4]=b.elements[3],A[5]=b.elements[4],A[6]=b.elements[5],A[7]=0,A[8]=b.elements[6],A[9]=b.elements[7],A[10]=b.elements[8],A[11]=0):ArrayBuffer.isView(b)?A.set(new b.constructor(b.buffer,b.byteOffset,A.length)):b.toArray(A,w)}function v(b,A,w,L){const _=b.value,E=A+"_"+w;if(L[E]===void 0)return typeof _=="number"||typeof _=="boolean"?L[E]=_:ArrayBuffer.isView(_)?L[E]=_.slice():L[E]=_.clone(),!0;{const P=L[E];if(typeof _=="number"||typeof _=="boolean"){if(P!==_)return L[E]=_,!0}else{if(ArrayBuffer.isView(_))return!0;if(P.equals(_)===!1)return P.copy(_),!0}}return!1}function x(b){const A=b.uniforms;let w=0;const L=16;for(let E=0,P=A.length;E<P;E++){const T=Array.isArray(A[E])?A[E]:[A[E]];for(let D=0,U=T.length;D<U;D++){const N=T[D],F=Array.isArray(N.value)?N.value:[N.value];for(let H=0,W=F.length;H<W;H++){const te=F[H],K=m(te),B=w%L,I=B%K.boundary,q=B+I;w+=I,q!==0&&L-q<K.storage&&(w+=L-q),N.__data=new Float32Array(K.storage/Float32Array.BYTES_PER_ELEMENT),N.__offset=w,w+=K.storage}}}const _=w%L;return _>0&&(w+=L-_),b.__size=w,b.__cache={},this}function m(b){const A={boundary:0,storage:0};return typeof b=="number"||typeof b=="boolean"?(A.boundary=4,A.storage=4):b.isVector2?(A.boundary=8,A.storage=8):b.isVector3||b.isColor?(A.boundary=16,A.storage=12):b.isVector4?(A.boundary=16,A.storage=16):b.isMatrix3?(A.boundary=48,A.storage=48):b.isMatrix4?(A.boundary=64,A.storage=64):b.isTexture?He("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(b)?(A.boundary=16,A.storage=b.byteLength):He("WebGLRenderer: Unsupported uniform value type.",b),A}function M(b){const A=b.target;A.removeEventListener("dispose",M);const w=a.indexOf(A.__bindingPointIndex);a.splice(w,1),n.deleteBuffer(s[A.id]),delete s[A.id],delete r[A.id]}function S(){for(const b in s)n.deleteBuffer(s[b]);a=[],s={},r={}}return{bind:h,update:l,dispose:S}}const o_=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let ei=null;function l_(){return ei===null&&(ei=new Ns(o_,16,16,ds,di),ei.name="DFG_LUT",ei.minFilter=zt,ei.magFilter=zt,ei.wrapS=Si,ei.wrapT=Si,ei.generateMipmaps=!1,ei.needsUpdate=!0),ei}class c_{constructor(e={}){const{canvas:t=Rg(),context:i=null,depth:s=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:h=!0,preserveDrawingBuffer:l=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:f=!1,reversedDepthBuffer:d=!1,outputBufferType:p=Rn}=e;this.isWebGLRenderer=!0;let g;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");g=i.getContextAttributes().alpha}else g=a;const v=p,x=new Set([oc,ac,rc]),m=new Set([Rn,ui,vr,Mr,ic,sc]),M=new Uint32Array(4),S=new Int32Array(4),b=new X;let A=null,w=null;const L=[],_=[];let E=null;this.domElement=t,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=hi,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const P=this;let T=!1,D=null,U=null,N=null,F=null;this._outputColorSpace=On;let H=0,W=0,te=null,K=-1,B=null;const I=new it,q=new it;let $=null;const ce=new tt(0);let de=0,me=t.width,j=t.height,ie=1,k=null,re=null;const ae=new it(0,0,me,j),ge=new it(0,0,me,j);let ke=!1;const Ce=new Ca;let Fe=!1,qe=!1;const Ke=new Ot,wt=new X,Ut=new it,nn={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let _t=!1;function Et(){return te===null?ie:1}let V=i;function Qe(C,G){return t.getContext(C,G)}let Ge,O,y,z,Z,ee,ue,fe,se,oe,pe,De,be,xe,Oe,ze,$e,Y,ve,le,Me,Ee,he;try{const C={alpha:!0,depth:s,stencil:r,antialias:o,premultipliedAlpha:h,preserveDrawingBuffer:l,powerPreference:u,failIfMajorPerformanceCaveat:f};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${Jl}`),t.addEventListener("webglcontextlost",Tt,!1),t.addEventListener("webglcontextrestored",dt,!1),t.addEventListener("webglcontextcreationerror",kn,!1),V===null){const G="webgl2";if(V=Qe(G,C),V===null)throw Qe(G)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}Ue()}catch(C){throw t.removeEventListener("webglcontextlost",Tt,!1),t.removeEventListener("webglcontextrestored",dt,!1),t.removeEventListener("webglcontextcreationerror",kn,!1),ct("WebGLRenderer: "+C.message),C}function Ue(){Ge=new lv(V),Ge.init(),Me=new jM(V,Ge),O=new Qx(V,Ge,e,Me),y=new JM(V,Ge),O.reversedDepthBuffer&&d&&y.buffers.depth.setReversed(!0),U=V.createFramebuffer(),N=V.createFramebuffer(),F=V.createFramebuffer(),z=new uv(V),Z=new FM,ee=new QM(V,Ge,y,Z,O,Me,z),ue=new ov(P),fe=new f1(V),Ee=new Zx(V,fe),se=new cv(V,fe,z,Ee),oe=new fv(V,se,fe,Ee,z),Y=new dv(V,O,ee),Oe=new jx(Z),pe=new UM(P,ue,Ge,O,Ee,Oe),De=new r_(P,Z),be=new kM,xe=new YM(Ge),$e=new $x(P,ue,y,oe,g,h),ze=new ZM(P,oe,O),he=new a_(V,z,O,y),ve=new Jx(V,Ge,z),le=new hv(V,Ge,z),z.programs=pe.programs,P.capabilities=O,P.extensions=Ge,P.properties=Z,P.renderLists=be,P.shadowMap=ze,P.state=y,P.info=z}v!==Rn&&(E=new mv(v,t.width,t.height,o,s,r));const Ie=new i_(P,V);this.xr=Ie,this.getContext=function(){return V},this.getContextAttributes=function(){return V.getContextAttributes()},this.forceContextLoss=function(){const C=Ge.get("WEBGL_lose_context");C&&C.loseContext()},this.forceContextRestore=function(){const C=Ge.get("WEBGL_lose_context");C&&C.restoreContext()},this.getPixelRatio=function(){return ie},this.setPixelRatio=function(C){C!==void 0&&(ie=C,this.setSize(me,j,!1))},this.getSize=function(C){return C.set(me,j)},this.setSize=function(C,G,ne=!0){if(Ie.isPresenting){He("WebGLRenderer: Can't change size while VR device is presenting.");return}me=C,j=G,t.width=Math.floor(C*ie),t.height=Math.floor(G*ie),ne===!0&&(t.style.width=C+"px",t.style.height=G+"px"),E!==null&&E.setSize(t.width,t.height),this.setViewport(0,0,C,G)},this.getDrawingBufferSize=function(C){return C.set(me*ie,j*ie).floor()},this.setDrawingBufferSize=function(C,G,ne){me=C,j=G,ie=ne,t.width=Math.floor(C*ne),t.height=Math.floor(G*ne),this.setViewport(0,0,C,G)},this.setEffects=function(C){if(v===Rn){ct("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(C){for(let G=0;G<C.length;G++)if(C[G].isOutputPass===!0){He("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}E.setEffects(C||[])},this.getCurrentViewport=function(C){return C.copy(I)},this.getViewport=function(C){return C.copy(ae)},this.setViewport=function(C,G,ne,J){C.isVector4?ae.set(C.x,C.y,C.z,C.w):ae.set(C,G,ne,J),y.viewport(I.copy(ae).multiplyScalar(ie).round())},this.getScissor=function(C){return C.copy(ge)},this.setScissor=function(C,G,ne,J){C.isVector4?ge.set(C.x,C.y,C.z,C.w):ge.set(C,G,ne,J),y.scissor(q.copy(ge).multiplyScalar(ie).round())},this.getScissorTest=function(){return ke},this.setScissorTest=function(C){y.setScissorTest(ke=C)},this.setOpaqueSort=function(C){k=C},this.setTransparentSort=function(C){re=C},this.getClearColor=function(C){return C.copy($e.getClearColor())},this.setClearColor=function(){$e.setClearColor(...arguments)},this.getClearAlpha=function(){return $e.getClearAlpha()},this.setClearAlpha=function(){$e.setClearAlpha(...arguments)},this.clear=function(C=!0,G=!0,ne=!0){let J=0;if(C){let Q=!1;if(te!==null){const we=te.texture.format;Q=x.has(we)}if(Q){const we=te.texture.type,Re=m.has(we),ye=$e.getClearColor(),Le=$e.getClearAlpha(),Ne=ye.r,je=ye.g,nt=ye.b;Re?(M[0]=Ne,M[1]=je,M[2]=nt,M[3]=Le,V.clearBufferuiv(V.COLOR,0,M)):(S[0]=Ne,S[1]=je,S[2]=nt,S[3]=Le,V.clearBufferiv(V.COLOR,0,S))}else J|=V.COLOR_BUFFER_BIT}G&&(J|=V.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),ne&&(J|=V.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),J!==0&&V.clear(J)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(C){C.setRenderer(this),D=C},this.dispose=function(){t.removeEventListener("webglcontextlost",Tt,!1),t.removeEventListener("webglcontextrestored",dt,!1),t.removeEventListener("webglcontextcreationerror",kn,!1),$e.dispose(),be.dispose(),xe.dispose(),Z.dispose(),ue.dispose(),oe.dispose(),Ee.dispose(),he.dispose(),pe.dispose(),Ie.dispose(),Ie.removeEventListener("sessionstart",_c),Ie.removeEventListener("sessionend",bc),Ki.stop()};function Tt(C){C.preventDefault(),Kc("WebGLRenderer: Context Lost."),T=!0}function dt(){Kc("WebGLRenderer: Context Restored."),T=!1;const C=z.autoReset,G=ze.enabled,ne=ze.autoUpdate,J=ze.needsUpdate,Q=ze.type;Ue(),z.autoReset=C,ze.enabled=G,ze.autoUpdate=ne,ze.needsUpdate=J,ze.type=Q}function kn(C){ct("WebGLRenderer: A WebGL context could not be created. Reason: ",C.statusMessage)}function Jn(C){const G=C.target;G.removeEventListener("dispose",Jn),Sd(G)}function Sd(C){yd(C),Z.remove(C)}function yd(C){const G=Z.get(C).programs;G!==void 0&&(G.forEach(function(ne){pe.releaseProgram(ne)}),C.isShaderMaterial&&pe.releaseShaderCache(C))}this.renderBufferDirect=function(C,G,ne,J,Q,we){G===null&&(G=nn);const Re=Q.isMesh&&Q.matrixWorld.determinantAffine()<0,ye=Ad(C,G,ne,J,Q);y.setMaterial(J,Re);let Le=ne.index,Ne=1;if(J.wireframe===!0){if(Le=se.getWireframeAttribute(ne),Le===void 0)return;Ne=2}const je=ne.drawRange,nt=ne.attributes.position;let Pe=je.start*Ne,ft=(je.start+je.count)*Ne;we!==null&&(Pe=Math.max(Pe,we.start*Ne),ft=Math.min(ft,(we.start+we.count)*Ne)),Le!==null?(Pe=Math.max(Pe,0),ft=Math.min(ft,Le.count)):nt!=null&&(Pe=Math.max(Pe,0),ft=Math.min(ft,nt.count));const Yt=ft-Pe;if(Yt<0||Yt===1/0)return;Ee.setup(Q,J,ye,ne,Le);let Lt,At=ve;if(Le!==null&&(Lt=fe.get(Le),At=le,At.setIndex(Lt)),Q.isMesh)J.wireframe===!0?(y.setLineWidth(J.wireframeLinewidth*Et()),At.setMode(V.LINES)):At.setMode(V.TRIANGLES);else if(Q.isLine){let cn=J.linewidth;cn===void 0&&(cn=1),y.setLineWidth(cn*Et()),Q.isLineSegments?At.setMode(V.LINES):Q.isLineLoop?At.setMode(V.LINE_LOOP):At.setMode(V.LINE_STRIP)}else Q.isPoints?At.setMode(V.POINTS):Q.isSprite&&At.setMode(V.TRIANGLES);if(Q.isBatchedMesh)if(Ge.get("WEBGL_multi_draw"))At.renderMultiDraw(Q._multiDrawStarts,Q._multiDrawCounts,Q._multiDrawCount);else{const cn=Q._multiDrawStarts,Te=Q._multiDrawCounts,mn=Q._multiDrawCount,ot=Le?fe.get(Le).bytesPerElement:1,In=Z.get(J).currentProgram.getUniforms();for(let Qn=0;Qn<mn;Qn++)In.setValue(V,"_gl_DrawID",Qn),At.render(cn[Qn]/ot,Te[Qn])}else if(Q.isInstancedMesh)At.renderInstances(Pe,Yt,Q.count);else if(ne.isInstancedBufferGeometry){const cn=ne._maxInstanceCount!==void 0?ne._maxInstanceCount:1/0,Te=Math.min(ne.instanceCount,cn);At.renderInstances(Pe,Yt,Te)}else At.render(Pe,Yt)};function Mc(C,G,ne,J){D!==null&&C.isNodeMaterial&&D.setObject(J,C),Fe===!0&&Oe.setState(C,ne,!1),C.transparent===!0&&C.side===bi&&C.forceSinglePass===!1?(C.side=yn,C.needsUpdate=!0,Tr(C,G,J),C.side=cs,C.needsUpdate=!0,Tr(C,G,J),C.side=bi):Tr(C,G,J)}this.compile=function(C,G,ne=null){ne===null&&(ne=C),D!==null&&D.renderStart(C,G,ne),w=xe.get(ne),w.init(G),_.push(w),ne.traverseVisible(function(Q){Q.isLight&&Q.layers.test(G.layers)&&(w.pushLight(Q),Q.castShadow&&w.pushShadow(Q))}),C!==ne&&C.traverseVisible(function(Q){Q.isLight&&Q.layers.test(G.layers)&&(w.pushLight(Q),Q.castShadow&&w.pushShadow(Q))}),w.setupLights(),D!==null&&D.updateLights(w.state.lightsArray),qe=this.localClippingEnabled,Fe=Oe.init(this.clippingPlanes,qe),Fe===!0&&Oe.setGlobalState(this.clippingPlanes,G),D!==null&&ze.render(w.state.shadowsArray,ne,G);const J=new Set;return C.traverse(function(Q){if(!(Q.isMesh||Q.isPoints||Q.isLine||Q.isSprite))return;const we=Q.material;if(we)if(Array.isArray(we))for(let Re=0;Re<we.length;Re++){const ye=we[Re];Mc(ye,ne,G,Q),J.add(ye)}else Mc(we,ne,G,Q),J.add(we)}),w=_.pop(),D!==null&&D.renderEnd(),J},this.compileAsync=function(C,G,ne=null){const J=this.compile(C,G,ne);return new Promise(Q=>{function we(){if(J.forEach(function(Re){const Le=Z.get(Re).currentProgram;(Le===void 0||Le.isReady())&&J.delete(Re)}),J.size===0){Q(C);return}setTimeout(we,10)}Ge.get("KHR_parallel_shader_compile")!==null?we():setTimeout(we,10)})};let qa=null;function wd(C){qa&&qa(C)}function _c(){Ki.stop()}function bc(){Ki.start()}const Ki=new nd;Ki.setAnimationLoop(wd),typeof self<"u"&&Ki.setContext(self),this.setAnimationLoop=function(C){qa=C,Ie.setAnimationLoop(C),C===null?Ki.stop():Ki.start()},Ie.addEventListener("sessionstart",_c),Ie.addEventListener("sessionend",bc),this.render=function(C,G){if(G!==void 0&&G.isCamera!==!0){ct("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(T===!0)return;D!==null&&D.renderStart(C,G);const ne=Ie.enabled===!0&&Ie.isPresenting===!0,J=E!==null&&(te===null||ne)&&E.begin(P,te);if(C.matrixWorldAutoUpdate===!0&&C.updateMatrixWorld(),G.parent===null&&G.matrixWorldAutoUpdate===!0&&G.updateMatrixWorld(),Ie.enabled===!0&&Ie.isPresenting===!0&&(E===null||E.isCompositing()===!1)&&(Ie.cameraAutoUpdate===!0&&Ie.updateCamera(G),G=Ie.getCamera()),C.isScene===!0&&C.onBeforeRender(P,C,G,te),w=xe.get(C,_.length),w.init(G),w.state.textureUnits=ee.getTextureUnits(),_.push(w),Ke.multiplyMatrices(G.projectionMatrix,G.matrixWorldInverse),Ce.setFromProjectionMatrix(Ke,li,G.reversedDepth),qe=this.localClippingEnabled,Fe=Oe.init(this.clippingPlanes,qe),A=be.get(C,L.length),A.init(),L.push(A),Ie.enabled===!0&&Ie.isPresenting===!0){const Re=P.xr.getDepthSensingMesh();Re!==null&&$a(Re,G,-1/0,P.sortObjects)}$a(C,G,0,P.sortObjects),A.finish(),D!==null&&D.updateLights(w.state.lightsArray),P.sortObjects===!0&&A.sort(k,re),_t=Ie.enabled===!1||Ie.isPresenting===!1||Ie.hasDepthSensing()===!1,_t&&$e.addToRenderList(A,C),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),Fe===!0&&Oe.beginShadows();const Q=w.state.shadowsArray;if(ze.render(Q,C,G),Fe===!0&&Oe.endShadows(),(J&&E.hasRenderPass())===!1){const Re=A.opaque,ye=A.transmissive;if(w.setupLights(),G.isArrayCamera){const Le=G.cameras;if(ye.length>0)for(let Ne=0,je=Le.length;Ne<je;Ne++){const nt=Le[Ne];yc(Re,ye,C,nt)}_t&&$e.render(C);for(let Ne=0,je=Le.length;Ne<je;Ne++){const nt=Le[Ne];Sc(A,C,nt,nt.viewport)}}else ye.length>0&&yc(Re,ye,C,G),_t&&$e.render(C),Sc(A,C,G)}te!==null&&W===0&&(ee.updateMultisampleRenderTarget(te),ee.updateRenderTargetMipmap(te)),J&&E.end(P),C.isScene===!0&&C.onAfterRender(P,C,G),Ee.resetDefaultState(),K=-1,B=null,_.pop(),_.length>0?(w=_[_.length-1],ee.setTextureUnits(w.state.textureUnits),Fe===!0&&Oe.setGlobalState(P.clippingPlanes,w.state.camera)):w=null,L.pop(),L.length>0?A=L[L.length-1]:A=null,D!==null&&D.renderEnd()};function $a(C,G,ne,J){if(C.visible===!1)return;if(C.layers.test(G.layers)){if(C.isGroup)ne=C.renderOrder;else if(C.isLOD)C.autoUpdate===!0&&C.update(G);else if(C.isLightProbeGrid)w.pushLightProbeGrid(C);else if(C.isLight)w.pushLight(C),C.castShadow&&w.pushShadow(C);else if(C.isSprite){if(!C.frustumCulled||C.intersectsFrustum(Ce)){J&&Ut.setFromMatrixPosition(C.matrixWorld).applyMatrix4(Ke);const Re=oe.update(C),ye=C.material;ye.visible&&A.push(C,Re,ye,ne,Ut.z,null,G)}}else if((C.isMesh||C.isLine||C.isPoints)&&(!C.frustumCulled||C.intersectsFrustum(Ce))){const Re=oe.update(C),ye=C.material;if(J&&(C.boundingSphere!==void 0?(C.boundingSphere===null&&C.computeBoundingSphere(),Ut.copy(C.boundingSphere.center)):(Re.boundingSphere===null&&Re.computeBoundingSphere(),Ut.copy(Re.boundingSphere.center)),Ut.applyMatrix4(C.matrixWorld).applyMatrix4(Ke)),Array.isArray(ye)){const Le=Re.groups;for(let Ne=0,je=Le.length;Ne<je;Ne++){const nt=Le[Ne],Pe=ye[nt.materialIndex];Pe&&Pe.visible&&A.push(C,Re,Pe,ne,Ut.z,nt,G)}}else ye.visible&&A.push(C,Re,ye,ne,Ut.z,null,G)}}const we=C.children;for(let Re=0,ye=we.length;Re<ye;Re++)$a(we[Re],G,ne,J)}function Sc(C,G,ne,J){const{opaque:Q,transmissive:we,transparent:Re}=C;w.setupLightsView(ne),Fe===!0&&Oe.setGlobalState(P.clippingPlanes,ne),J&&y.viewport(I.copy(J)),Q.length>0&&Ar(Q,G,ne),we.length>0&&Ar(we,G,ne),Re.length>0&&Ar(Re,G,ne),y.buffers.depth.setTest(!0),y.buffers.depth.setMask(!0),y.buffers.color.setMask(!0),y.setPolygonOffset(!1)}function yc(C,G,ne,J){if((ne.isScene===!0?ne.overrideMaterial:null)!==null)return;if(w.state.transmissionRenderTarget[J.id]===void 0){const Pe=Ge.has("EXT_color_buffer_half_float")||Ge.has("EXT_color_buffer_float");w.state.transmissionRenderTarget[J.id]=new Fn(1,1,{generateMipmaps:!0,type:Pe?di:Rn,minFilter:ss,samples:Math.max(4,O.samples),stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:st.workingColorSpace})}const we=w.state.transmissionRenderTarget[J.id],Re=J.viewport||I;we.setSize(Re.z*P.transmissionResolutionScale,Re.w*P.transmissionResolutionScale);const ye=P.getRenderTarget(),Le=P.getActiveCubeFace(),Ne=P.getActiveMipmapLevel();P.setRenderTarget(we),P.getClearColor(ce),de=P.getClearAlpha(),de<1&&P.setClearColor(16777215,.5),P.clear(),_t&&$e.render(ne);const je=P.toneMapping;P.toneMapping=hi;const nt=J.viewport;if(J.viewport!==void 0&&(J.viewport=void 0),w.setupLightsView(J),Fe===!0&&Oe.setGlobalState(P.clippingPlanes,J),Ar(C,ne,J),ee.updateMultisampleRenderTarget(we),ee.updateRenderTargetMipmap(we),Ge.has("WEBGL_multisampled_render_to_texture")===!1){let Pe=!1;for(let ft=0,Yt=G.length;ft<Yt;ft++){const Lt=G[ft],{object:At,geometry:cn,material:Te,group:mn}=Lt;if(Te.side===bi&&At.layers.test(J.layers)){const ot=Te.side;Te.side=yn,Te.needsUpdate=!0,wc(At,ne,J,cn,Te,mn),Te.side=ot,Te.needsUpdate=!0,Pe=!0}}Pe===!0&&(ee.updateMultisampleRenderTarget(we),ee.updateRenderTargetMipmap(we))}P.setRenderTarget(ye,Le,Ne),P.setClearColor(ce,de),nt!==void 0&&(J.viewport=nt),P.toneMapping=je}function Ar(C,G,ne){const J=G.isScene===!0?G.overrideMaterial:null;for(let Q=0,we=C.length;Q<we;Q++){const Re=C[Q],{object:ye,geometry:Le,group:Ne}=Re;let je=Re.material;je.allowOverride===!0&&J!==null&&(je=J),ye.layers.test(ne.layers)&&wc(ye,G,ne,Le,je,Ne)}}function wc(C,G,ne,J,Q,we){D!==null&&Q.isNodeMaterial&&D.setObject(C,Q),C.onBeforeRender(P,G,ne,J,Q,we),C.modelViewMatrix.multiplyMatrices(ne.matrixWorldInverse,C.matrixWorld),C.normalMatrix.getNormalMatrix(C.modelViewMatrix),Q.onBeforeRender(P,G,ne,J,C,we),Q.transparent===!0&&Q.side===bi&&Q.forceSinglePass===!1?(Q.side=yn,Q.needsUpdate=!0,P.renderBufferDirect(ne,G,J,Q,C,we),Q.side=cs,Q.needsUpdate=!0,P.renderBufferDirect(ne,G,J,Q,C,we),Q.side=bi):P.renderBufferDirect(ne,G,J,Q,C,we),C.onAfterRender(P,G,ne,J,Q,we)}function Tr(C,G,ne){G.isScene!==!0&&(G=nn);const J=Z.get(C),Q=w.state.lights,we=w.state.shadowsArray,Re=Q.state.version,ye=pe.getParameters(C,Q.state,we,G,ne,w.state.lightProbeGridArray),Le=pe.getProgramCacheKey(ye);let Ne=J.programs;J.environment=C.isMeshStandardMaterial||C.isMeshLambertMaterial||C.isMeshPhongMaterial?G.environment:null,J.fog=G.fog;const je=C.isMeshStandardMaterial||C.isMeshLambertMaterial&&!C.envMap||C.isMeshPhongMaterial&&!C.envMap;J.envMap=ue.get(C.envMap||J.environment,je),J.envMapRotation=J.environment!==null&&C.envMap===null?G.environmentRotation:C.envMapRotation,Ne===void 0&&(C.addEventListener("dispose",Jn),Ne=new Map,J.programs=Ne);let nt=Ne.get(Le);if(nt!==void 0){if(J.currentProgram===nt&&J.lightsStateVersion===Re)return Ac(C,ye),nt}else ye.uniforms=pe.getUniforms(C),D!==null&&C.isNodeMaterial&&D.build(C,ne,ye),C.onBeforeCompile(ye,P),nt=pe.acquireProgram(ye,Le),Ne.set(Le,nt),J.uniforms=ye.uniforms;const Pe=J.uniforms;return(!C.isShaderMaterial&&!C.isRawShaderMaterial||C.clipping===!0)&&(Pe.clippingPlanes=Oe.uniform),Ac(C,ye),J.needsLights=Rd(C),J.lightsStateVersion=Re,J.needsLights&&(Pe.ambientLightColor.value=Q.state.ambient,Pe.lightProbe.value=Q.state.probe,Pe.sunLights.value=Q.state.sun,Pe.sunLightShadows.value=Q.state.sunShadow,Pe.directionalLights.value=Q.state.directional,Pe.directionalLightShadows.value=Q.state.directionalShadow,Pe.spotLights.value=Q.state.spot,Pe.spotLightShadows.value=Q.state.spotShadow,Pe.rectAreaLights.value=Q.state.rectArea,Pe.ltc_1.value=Q.state.rectAreaLTC1,Pe.ltc_2.value=Q.state.rectAreaLTC2,Pe.pointLights.value=Q.state.point,Pe.pointLightShadows.value=Q.state.pointShadow,Pe.hemisphereLights.value=Q.state.hemi,Pe.sunShadowMatrix.value=Q.state.sunShadowMatrix,Pe.sunShadowCascade.value=Q.state.sunShadowCascade,Pe.directionalShadowMatrix.value=Q.state.directionalShadowMatrix,Pe.spotLightMatrix.value=Q.state.spotLightMatrix,Pe.spotLightMap.value=Q.state.spotLightMap,Pe.pointShadowMatrix.value=Q.state.pointShadowMatrix),J.lightProbeGrid=w.state.lightProbeGridArray.length>0,J.currentProgram=nt,J.uniformsList=null,nt}function Ec(C){if(C.uniformsList===null){const G=C.currentProgram.getUniforms();C.uniformsList=va.seqWithValue(G.seq,C.uniforms)}return C.uniformsList}function Ac(C,G){const ne=Z.get(C);ne.outputColorSpace=G.outputColorSpace,ne.batching=G.batching,ne.batchingColor=G.batchingColor,ne.instancing=G.instancing,ne.instancingColor=G.instancingColor,ne.instancingMorph=G.instancingMorph,ne.skinning=G.skinning,ne.morphTargets=G.morphTargets,ne.morphNormals=G.morphNormals,ne.morphColors=G.morphColors,ne.morphTargetsCount=G.morphTargetsCount,ne.numClippingPlanes=G.numClippingPlanes,ne.numIntersection=G.numClipIntersection,ne.vertexAlphas=G.vertexAlphas,ne.vertexTangents=G.vertexTangents,ne.toneMapping=G.toneMapping}function Ed(C,G){if(C.length===0)return null;if(C.length===1)return C[0].texture!==null?C[0]:null;b.setFromMatrixPosition(G.matrixWorld);for(let ne=0,J=C.length;ne<J;ne++){const Q=C[ne];if(Q.texture!==null&&Q.boundingBox.containsPoint(b))return Q}return null}function Ad(C,G,ne,J,Q){G.isScene!==!0&&(G=nn),ee.resetTextureUnits();const we=G.fog,Re=J.isMeshStandardMaterial||J.isMeshLambertMaterial||J.isMeshPhongMaterial?G.environment:null,ye=te===null?P.outputColorSpace:te.isXRRenderTarget===!0?te.texture.colorSpace:st.workingColorSpace,Le=J.isMeshStandardMaterial||J.isMeshLambertMaterial&&!J.envMap||J.isMeshPhongMaterial&&!J.envMap,Ne=ue.get(J.envMap||Re,Le),je=J.vertexColors===!0&&!!ne.attributes.color&&ne.attributes.color.itemSize===4,nt=!!ne.attributes.tangent&&(!!J.normalMap||J.anisotropy>0),Pe=!!ne.morphAttributes.position,ft=!!ne.morphAttributes.normal,Yt=!!ne.morphAttributes.color;let Lt=hi;J.toneMapped&&(te===null||te.isXRRenderTarget===!0)&&(Lt=P.toneMapping);const At=ne.morphAttributes.position||ne.morphAttributes.normal||ne.morphAttributes.color,cn=At!==void 0?At.length:0,Te=Z.get(J),mn=w.state.lights;if(Fe===!0&&(qe===!0||C!==B)){const Rt=C===B&&J.id===K;Oe.setState(J,C,Rt)}let ot=!1;J.version===Te.__version?(Te.needsLights&&Te.lightsStateVersion!==mn.state.version||Te.outputColorSpace!==ye||Q.isBatchedMesh&&Te.batching===!1||!Q.isBatchedMesh&&Te.batching===!0||Q.isBatchedMesh&&Te.batchingColor===!0&&Q._colorsTexture===null||Q.isBatchedMesh&&Te.batchingColor===!1&&Q._colorsTexture!==null||Q.isInstancedMesh&&Te.instancing===!1||!Q.isInstancedMesh&&Te.instancing===!0||Q.isSkinnedMesh&&Te.skinning===!1||!Q.isSkinnedMesh&&Te.skinning===!0||Q.isInstancedMesh&&Te.instancingColor===!0&&Q.instanceColor===null||Q.isInstancedMesh&&Te.instancingColor===!1&&Q.instanceColor!==null||Q.isInstancedMesh&&Te.instancingMorph===!0&&Q.morphTexture===null||Q.isInstancedMesh&&Te.instancingMorph===!1&&Q.morphTexture!==null||Te.envMap!==Ne||J.fog===!0&&Te.fog!==we||Te.numClippingPlanes!==void 0&&(Te.numClippingPlanes!==Oe.numPlanes||Te.numIntersection!==Oe.numIntersection)||Te.vertexAlphas!==je||Te.vertexTangents!==nt||Te.morphTargets!==Pe||Te.morphNormals!==ft||Te.morphColors!==Yt||Te.toneMapping!==Lt||Te.morphTargetsCount!==cn||!!Te.lightProbeGrid!=w.state.lightProbeGridArray.length>0)&&(ot=!0):(ot=!0,Te.__version=J.version);let In=Te.currentProgram;ot===!0&&(In=Tr(J,G,Q),D&&J.isNodeMaterial&&D.onUpdateProgram(J,In,Te));let Qn=!1,Ti=!1,ms=!1;const bt=In.getUniforms(),Vt=Te.uniforms;if(y.useProgram(In.program)&&(Qn=!0,Ti=!0,ms=!0),J.id!==K&&(K=J.id,Ti=!0),Te.needsLights){const Rt=Ed(w.state.lightProbeGridArray,Q);Te.lightProbeGrid!==Rt&&(Te.lightProbeGrid=Rt,Ti=!0)}if(Qn||B!==C){y.buffers.depth.getReversed()&&C.reversedDepth!==!0&&(C._reversedDepth=!0,C.updateProjectionMatrix()),bt.setValue(V,"projectionMatrix",C.projectionMatrix),bt.setValue(V,"viewMatrix",C.matrixWorldInverse);const Ci=bt.map.cameraPosition;Ci!==void 0&&Ci.setValue(V,wt.setFromMatrixPosition(C.matrixWorld)),O.logarithmicDepthBuffer&&bt.setValue(V,"logDepthBufFC",2/(Math.log(C.far+1)/Math.LN2)),(J.isMeshPhongMaterial||J.isMeshToonMaterial||J.isMeshLambertMaterial||J.isMeshBasicMaterial||J.isMeshStandardMaterial||J.isShaderMaterial)&&bt.setValue(V,"isOrthographic",C.isOrthographicCamera===!0),B!==C&&(B=C,Ti=!0,ms=!0)}if(Te.needsLights&&(mn.state.sunShadowMap.length>0&&bt.setValue(V,"sunShadowMap",mn.state.sunShadowMap,ee),mn.state.directionalShadowMap.length>0&&bt.setValue(V,"directionalShadowMap",mn.state.directionalShadowMap,ee),mn.state.spotShadowMap.length>0&&bt.setValue(V,"spotShadowMap",mn.state.spotShadowMap,ee),mn.state.pointShadowMap.length>0&&bt.setValue(V,"pointShadowMap",mn.state.pointShadowMap,ee)),Q.isSkinnedMesh){bt.setOptional(V,Q,"bindMatrix"),bt.setOptional(V,Q,"bindMatrixInverse");const Rt=Q.skeleton;Rt&&(Rt.boneTexture===null&&Rt.computeBoneTexture(),bt.setValue(V,"boneTexture",Rt.boneTexture,ee))}Q.isBatchedMesh&&(bt.setOptional(V,Q,"batchingTexture"),bt.setValue(V,"batchingTexture",Q._matricesTexture,ee),bt.setOptional(V,Q,"batchingIdTexture"),bt.setValue(V,"batchingIdTexture",Q._indirectTexture,ee),bt.setOptional(V,Q,"batchingColorTexture"),Q._colorsTexture!==null&&bt.setValue(V,"batchingColorTexture",Q._colorsTexture,ee));const Ri=ne.morphAttributes;if((Ri.position!==void 0||Ri.normal!==void 0||Ri.color!==void 0)&&Y.update(Q,ne,In),(Ti||Te.receiveShadow!==Q.receiveShadow)&&(Te.receiveShadow=Q.receiveShadow,bt.setValue(V,"receiveShadow",Q.receiveShadow)),(J.isMeshStandardMaterial||J.isMeshLambertMaterial||J.isMeshPhongMaterial)&&J.envMap===null&&G.environment!==null&&(Vt.envMapIntensity.value=G.environmentIntensity),Vt.dfgLUT!==void 0&&(Vt.dfgLUT.value=l_()),Ti){if(bt.setValue(V,"toneMappingExposure",P.toneMappingExposure),Te.needsLights&&Td(Vt,ms),we&&J.fog===!0&&De.refreshFogUniforms(Vt,we),De.refreshMaterialUniforms(Vt,J,ie,j,w.state.transmissionRenderTarget[C.id]),Te.needsLights&&Te.lightProbeGrid){const Rt=Te.lightProbeGrid;Vt.probesSH.value=Rt.texture,Vt.probesMin.value.copy(Rt.boundingBox.min),Vt.probesMax.value.copy(Rt.boundingBox.max),Vt.probesResolution.value.copy(Rt.resolution)}va.upload(V,Ec(Te),Vt,ee)}if(J.isShaderMaterial&&J.uniformsNeedUpdate===!0&&(va.upload(V,Ec(Te),Vt,ee),J.uniformsNeedUpdate=!1),J.isSpriteMaterial&&bt.setValue(V,"center",Q.center),bt.setValue(V,"modelViewMatrix",Q.modelViewMatrix),bt.setValue(V,"normalMatrix",Q.normalMatrix),bt.setValue(V,"modelMatrix",Q.matrixWorld),J.uniformsGroups!==void 0){const Rt=J.uniformsGroups;for(let Ci=0,gs=Rt.length;Ci<gs;Ci++){const Rc=Rt[Ci];he.update(Rc,In),he.bind(Rc,In)}}return In}function Td(C,G){C.ambientLightColor.needsUpdate=G,C.lightProbe.needsUpdate=G,C.sunLights.needsUpdate=G,C.sunLightShadows.needsUpdate=G,C.directionalLights.needsUpdate=G,C.directionalLightShadows.needsUpdate=G,C.pointLights.needsUpdate=G,C.pointLightShadows.needsUpdate=G,C.spotLights.needsUpdate=G,C.spotLightShadows.needsUpdate=G,C.rectAreaLights.needsUpdate=G,C.hemisphereLights.needsUpdate=G}function Rd(C){return C.isMeshLambertMaterial||C.isMeshToonMaterial||C.isMeshPhongMaterial||C.isMeshStandardMaterial||C.isShadowMaterial||C.isShaderMaterial&&C.lights===!0}this.getActiveCubeFace=function(){return H},this.getActiveMipmapLevel=function(){return W},this.getRenderTarget=function(){return te},this.setRenderTargetTextures=function(C,G,ne){const J=Z.get(C);J.__autoAllocateDepthBuffer=C.resolveDepthBuffer===!1,J.__autoAllocateDepthBuffer===!1&&(J.__useRenderToTexture=!1),Z.get(C.texture).__webglTexture=G,Z.get(C.depthTexture).__webglTexture=J.__autoAllocateDepthBuffer?void 0:ne,J.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(C,G){const ne=Z.get(C);ne.__webglFramebuffer=G,ne.__useDefaultFramebuffer=G===void 0},this.setRenderTarget=function(C,G=0,ne=0){te=C,H=G,W=ne;let J=null,Q=!1,we=!1;if(C){const ye=Z.get(C);if(ye.__useDefaultFramebuffer!==void 0){y.bindFramebuffer(V.FRAMEBUFFER,ye.__webglFramebuffer),I.copy(C.viewport),q.copy(C.scissor),$=C.scissorTest,y.viewport(I),y.scissor(q),y.setScissorTest($),K=-1;return}else if(ye.__webglFramebuffer===void 0)ee.setupRenderTarget(C);else if(ye.__hasExternalTextures)ee.rebindTextures(C,Z.get(C.texture).__webglTexture,Z.get(C.depthTexture).__webglTexture);else if(C.depthBuffer){const je=C.depthTexture;if(ye.__boundDepthTexture!==je){if(je!==null&&Z.has(je)&&(C.width!==je.image.width||C.height!==je.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");ee.setupDepthRenderbuffer(C)}}const Le=C.texture;(Le.isData3DTexture||Le.isDataArrayTexture||Le.isCompressedArrayTexture)&&(we=!0);const Ne=Z.get(C).__webglFramebuffer;C.isWebGLCubeRenderTarget?(Array.isArray(Ne[G])?J=Ne[G][ne]:J=Ne[G],Q=!0):C.samples>0&&ee.useMultisampledRTT(C)===!1?J=Z.get(C).__webglMultisampledFramebuffer:Array.isArray(Ne)?J=Ne[ne]:J=Ne,I.copy(C.viewport),q.copy(C.scissor),$=C.scissorTest}else I.copy(ae).multiplyScalar(ie).floor(),q.copy(ge).multiplyScalar(ie).floor(),$=ke;if(ne!==0&&(J=U),y.bindFramebuffer(V.FRAMEBUFFER,J)&&y.drawBuffers(C,J),y.viewport(I),y.scissor(q),y.setScissorTest($),Q){const ye=Z.get(C.texture);V.framebufferTexture2D(V.FRAMEBUFFER,V.COLOR_ATTACHMENT0,V.TEXTURE_CUBE_MAP_POSITIVE_X+G,ye.__webglTexture,ne)}else if(we){const ye=G;for(let Le=0;Le<C.textures.length;Le++){const Ne=Z.get(C.textures[Le]);V.framebufferTextureLayer(V.FRAMEBUFFER,V.COLOR_ATTACHMENT0+Le,Ne.__webglTexture,ne,ye)}}else if(C!==null&&ne!==0){const ye=Z.get(C.texture);V.framebufferTexture2D(V.FRAMEBUFFER,V.COLOR_ATTACHMENT0,V.TEXTURE_2D,ye.__webglTexture,ne)}K=-1};function Tc(C){const G=Z.get(C);return(G.__readFormat!==C.format||G.__readType!==C.type)&&(G.__readFormat=C.format,G.__readType=C.type,G.__formatReadable=O.textureFormatReadable(C.format),G.__typeReadable=O.textureTypeReadable(C.type)),G}this.readRenderTargetPixels=function(C,G,ne,J,Q,we,Re,ye=0){if(!(C&&C.isWebGLRenderTarget)){ct("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Le=Z.get(C).__webglFramebuffer;if(C.isWebGLCubeRenderTarget&&Re!==void 0&&(Le=Le[Re]),Le){y.bindFramebuffer(V.FRAMEBUFFER,Le);try{const Ne=C.textures[ye],je=Ne.format,nt=Ne.type;C.textures.length>1&&V.readBuffer(V.COLOR_ATTACHMENT0+ye);const Pe=Tc(Ne);if(Pe.__formatReadable===!1){ct("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(Pe.__typeReadable===!1){ct("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}G>=0&&G<=C.width-J&&ne>=0&&ne<=C.height-Q&&V.readPixels(G,ne,J,Q,Me.convert(je),Me.convert(nt),we)}finally{const Ne=te!==null?Z.get(te).__webglFramebuffer:null;y.bindFramebuffer(V.FRAMEBUFFER,Ne)}}},this.readRenderTargetPixelsAsync=async function(C,G,ne,J,Q,we,Re,ye=0){if(!(C&&C.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Le=Z.get(C).__webglFramebuffer;if(C.isWebGLCubeRenderTarget&&Re!==void 0&&(Le=Le[Re]),Le)if(G>=0&&G<=C.width-J&&ne>=0&&ne<=C.height-Q){y.bindFramebuffer(V.FRAMEBUFFER,Le);const Ne=C.textures[ye],je=Ne.format,nt=Ne.type;C.textures.length>1&&V.readBuffer(V.COLOR_ATTACHMENT0+ye);const Pe=Tc(Ne);if(Pe.__formatReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(Pe.__typeReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const ft=V.createBuffer();V.bindBuffer(V.PIXEL_PACK_BUFFER,ft),V.bufferData(V.PIXEL_PACK_BUFFER,we.byteLength,V.STREAM_READ),V.readPixels(G,ne,J,Q,Me.convert(je),Me.convert(nt),0),V.bindBuffer(V.PIXEL_PACK_BUFFER,null);const Yt=te!==null?Z.get(te).__webglFramebuffer:null;y.bindFramebuffer(V.FRAMEBUFFER,Yt);const Lt=V.fenceSync(V.SYNC_GPU_COMMANDS_COMPLETE,0);return V.flush(),await Cg(V,Lt,4),V.bindBuffer(V.PIXEL_PACK_BUFFER,ft),V.getBufferSubData(V.PIXEL_PACK_BUFFER,0,we),V.bindBuffer(V.PIXEL_PACK_BUFFER,null),V.deleteBuffer(ft),V.deleteSync(Lt),we}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(C,G=null,ne=0){const J=Math.pow(2,-ne),Q=Math.floor(C.image.width*J),we=Math.floor(C.image.height*J),Re=G!==null?G.x:0,ye=G!==null?G.y:0;ee.setTexture2D(C,0),V.copyTexSubImage2D(V.TEXTURE_2D,ne,0,0,Re,ye,Q,we),y.unbindTexture()},this.copyTextureToTexture=function(C,G,ne=null,J=null,Q=0,we=0){let Re,ye,Le,Ne,je,nt,Pe,ft,Yt;const Lt=C.isCompressedTexture?C.mipmaps[we]:C.image;if(ne!==null)Re=ne.max.x-ne.min.x,ye=ne.max.y-ne.min.y,Le=ne.isBox3?ne.max.z-ne.min.z:1,Ne=ne.min.x,je=ne.min.y,nt=ne.isBox3?ne.min.z:0;else{const Vt=Math.pow(2,-Q);Re=Math.floor(Lt.width*Vt),ye=Math.floor(Lt.height*Vt),C.isDataArrayTexture?Le=Lt.depth:C.isData3DTexture?Le=Math.floor(Lt.depth*Vt):Le=1,Ne=0,je=0,nt=0}J!==null?(Pe=J.x,ft=J.y,Yt=J.z):(Pe=0,ft=0,Yt=0);const At=Me.convert(G.format),cn=Me.convert(G.type);let Te;G.isData3DTexture?(ee.setTexture3D(G,0),Te=V.TEXTURE_3D):G.isDataArrayTexture||G.isCompressedArrayTexture?(ee.setTexture2DArray(G,0),Te=V.TEXTURE_2D_ARRAY):(ee.setTexture2D(G,0),Te=V.TEXTURE_2D),y.activeTexture(V.TEXTURE0),y.pixelStorei(V.UNPACK_FLIP_Y_WEBGL,G.flipY),y.pixelStorei(V.UNPACK_PREMULTIPLY_ALPHA_WEBGL,G.premultiplyAlpha),y.pixelStorei(V.UNPACK_ALIGNMENT,G.unpackAlignment);const mn=y.getParameter(V.UNPACK_ROW_LENGTH),ot=y.getParameter(V.UNPACK_IMAGE_HEIGHT),In=y.getParameter(V.UNPACK_SKIP_PIXELS),Qn=y.getParameter(V.UNPACK_SKIP_ROWS),Ti=y.getParameter(V.UNPACK_SKIP_IMAGES);y.pixelStorei(V.UNPACK_ROW_LENGTH,Lt.width),y.pixelStorei(V.UNPACK_IMAGE_HEIGHT,Lt.height),y.pixelStorei(V.UNPACK_SKIP_PIXELS,Ne),y.pixelStorei(V.UNPACK_SKIP_ROWS,je),y.pixelStorei(V.UNPACK_SKIP_IMAGES,nt);const ms=C.isDataArrayTexture||C.isData3DTexture,bt=G.isDataArrayTexture||G.isData3DTexture;if(C.isDepthTexture){const Vt=Z.get(C),Ri=Z.get(G),Rt=Z.get(Vt.__renderTarget),Ci=Z.get(Ri.__renderTarget);y.bindFramebuffer(V.READ_FRAMEBUFFER,Rt.__webglFramebuffer),y.bindFramebuffer(V.DRAW_FRAMEBUFFER,Ci.__webglFramebuffer);for(let gs=0;gs<Le;gs++)ms&&(V.framebufferTextureLayer(V.READ_FRAMEBUFFER,V.COLOR_ATTACHMENT0,Z.get(C).__webglTexture,Q,nt+gs),V.framebufferTextureLayer(V.DRAW_FRAMEBUFFER,V.COLOR_ATTACHMENT0,Z.get(G).__webglTexture,we,Yt+gs)),V.blitFramebuffer(Ne,je,Re,ye,Pe,ft,Re,ye,V.DEPTH_BUFFER_BIT,V.NEAREST);y.bindFramebuffer(V.READ_FRAMEBUFFER,null),y.bindFramebuffer(V.DRAW_FRAMEBUFFER,null)}else if(Q!==0||C.isRenderTargetTexture||Z.has(C)){const Vt=Z.get(C),Ri=Z.get(G);y.bindFramebuffer(V.READ_FRAMEBUFFER,N),y.bindFramebuffer(V.DRAW_FRAMEBUFFER,F);for(let Rt=0;Rt<Le;Rt++)ms?V.framebufferTextureLayer(V.READ_FRAMEBUFFER,V.COLOR_ATTACHMENT0,Vt.__webglTexture,Q,nt+Rt):V.framebufferTexture2D(V.READ_FRAMEBUFFER,V.COLOR_ATTACHMENT0,V.TEXTURE_2D,Vt.__webglTexture,Q),bt?V.framebufferTextureLayer(V.DRAW_FRAMEBUFFER,V.COLOR_ATTACHMENT0,Ri.__webglTexture,we,Yt+Rt):V.framebufferTexture2D(V.DRAW_FRAMEBUFFER,V.COLOR_ATTACHMENT0,V.TEXTURE_2D,Ri.__webglTexture,we),Q!==0?V.blitFramebuffer(Ne,je,Re,ye,Pe,ft,Re,ye,V.COLOR_BUFFER_BIT,V.NEAREST):bt?V.copyTexSubImage3D(Te,we,Pe,ft,Yt+Rt,Ne,je,Re,ye):V.copyTexSubImage2D(Te,we,Pe,ft,Ne,je,Re,ye);y.bindFramebuffer(V.READ_FRAMEBUFFER,null),y.bindFramebuffer(V.DRAW_FRAMEBUFFER,null)}else bt?C.isDataTexture||C.isData3DTexture?V.texSubImage3D(Te,we,Pe,ft,Yt,Re,ye,Le,At,cn,Lt.data):G.isCompressedArrayTexture?V.compressedTexSubImage3D(Te,we,Pe,ft,Yt,Re,ye,Le,At,Lt.data):V.texSubImage3D(Te,we,Pe,ft,Yt,Re,ye,Le,At,cn,Lt):C.isDataTexture?V.texSubImage2D(V.TEXTURE_2D,we,Pe,ft,Re,ye,At,cn,Lt.data):C.isCompressedTexture?V.compressedTexSubImage2D(V.TEXTURE_2D,we,Pe,ft,Lt.width,Lt.height,At,Lt.data):V.texSubImage2D(V.TEXTURE_2D,we,Pe,ft,Re,ye,At,cn,Lt);y.pixelStorei(V.UNPACK_ROW_LENGTH,mn),y.pixelStorei(V.UNPACK_IMAGE_HEIGHT,ot),y.pixelStorei(V.UNPACK_SKIP_PIXELS,In),y.pixelStorei(V.UNPACK_SKIP_ROWS,Qn),y.pixelStorei(V.UNPACK_SKIP_IMAGES,Ti),we===0&&G.generateMipmaps&&V.generateMipmap(Te),y.unbindTexture()},this.initRenderTarget=function(C){Z.get(C).__webglFramebuffer===void 0&&ee.setupRenderTarget(C)},this.initTexture=function(C){C.isCubeTexture?ee.setTextureCube(C,0):C.isData3DTexture?ee.setTexture3D(C,0):C.isDataArrayTexture||C.isCompressedArrayTexture?ee.setTexture2DArray(C,0):ee.setTexture2D(C,0),y.unbindTexture()},this.resetState=function(){H=0,W=0,te=null,y.reset(),Ee.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return li}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=st._getDrawingBufferColorSpace(e),t.unpackColorSpace=st._getUnpackColorSpace()}}const Ht=(n,e=0)=>{const t=Math.sin(n*127.1+e*311.7)*43758.5453;return t-Math.floor(t)},Mt=(n,e,t=0)=>Ht(Math.floor(n[0]*e)+Math.floor(n[2]*e)*57+t,Math.floor(n[1]*e)),It=(n=.2,e=.15)=>t=>{const i=Mt(t,16,3);return Mt(t,6,5)<e&&t[1]>.1?c.MOSS:i>1-n*.7?c.BODY2:void 0},kt=(n,e,t,i,s,r=0,a=0)=>{for(let o=0;o<e;o++){const h=Ht(s,o)*6.283,l=t*Math.sqrt(Ht(o,s));n.ell([r+Math.cos(h)*l,.07,a+Math.sin(h)*l*.7],[.07,.1+Ht(o,4)*.08,.07],c.LEAF2,{group:i+o%3,paint:u=>u[1]>.13?c.LEAF:void 0})}},sa=(n,e,t,i=1)=>{for(let s=0;s<6;s++){const r=s/6*6.283+e[0],a=[Math.cos(r),0,Math.sin(r)];n.chain([[...e,.03*i],[...R.add(e,R.add(R.mul(a,.25*i),[0,.2*i,0])),.025*i],[...R.add(e,R.add(R.mul(a,.5*i),[0,.05*i,0])),.01*i]],s%2?c.LEAF:c.LEAF2,{group:t})}},Kn=(n,e,t,i,s)=>{const r=[];for(let a=0;a<=4;a++)r.push([...R.add(R.lerp(e,t,a/4),[(Ht(s,a)-.5)*.12,0,.02]),.03]);n.chain(r,c.LEAF,{group:i,paint:a=>Mt(a,30)<.3?c.LEAF2:void 0})},Ia=(n,e,t,i)=>n.ell(e,t,c.LEAF,{group:i,rough:.04,paint:s=>{const r=Mt(s,10,2);return s[1]<e[1]-.15||r<.2?c.LEAF3:r>.8?c.LEAF2:void 0}}),Je=(n,e,t,i,s=.025,r=c.FRAME)=>n.seg(e,t,s,s,r,{group:i,paint:It(.35,.05)}),Ks=(n,e,t,i,s=c.MAGIC)=>n.ell(e,[t,t,t],s,{group:i,extra:!0});function ai(n,e,{yaw:t=0,pitch:i=0,roll:s=0,at:r=[0,0,0]}={}){const a=(f,d,p,g)=>{const v=Math.cos(d),x=Math.sin(d),m=[...f];return m[p]=f[p]*v-f[g]*x,m[g]=f[p]*x+f[g]*v,m},o=f=>a(a(a(f,s,1,2),i,0,1),-t,0,2),h=f=>a(a(a(f,t,0,2),-i,0,1),-s,1,2),l=f=>R.add(o(f),r),u=f=>h(R.sub(f,r));for(const f of n.parts.slice(e))if(f.type==="cone"?(f.a=l(f.a),f.b=l(f.b)):(f.c=l(f.c),f.axes=f.axes.map(o)),f.paint){const d=f.paint;f.paint=(p,g)=>d(u(p),g)}}function Uo(n,e,{len:t=1.5,van:i=!1,glow:s=!1,flat:r=!1}={}){const a=i?.62:.3,o=i?.8:.5;n.box([0,o,0],[t,a,.66],c.BODY,{round:.14,group:e,paint:h=>{const l=It(.3,.12)(h);return l||(h[0]>t-.06&&Math.abs(h[1]-(o+a*.2))<.07&&Math.abs(Math.abs(h[2])-.45)<.1?s?c.MAGIC2:c.FRAME:i&&h[1]>o+.1&&Math.abs(h[2])>.6&&Math.abs(h[0]+.2)<.9&&(h[0]+3)*3%1>.15||h[1]<o-a+.1?c.SHADES:void 0)}}),i||n.box([-.2,o+a+.22,0],[t*.6,.24,.6],c.BODY,{round:.14,group:e,paint:h=>Math.abs(h[2])>.52||h[0]>t*.6-.25-.2?Mt(h,9)<.25?c.STONED:c.SHADES:It(.3,.25)(h)});for(const h of[-t*.65,t*.65])for(const l of[-.66,.66])n.ell([h,.3,l],[.3,r?.22:.3,.1],c.BODY3,{group:e+1,paint:u=>Math.hypot(u[0]-h,u[1]-.3)<.12?c.FRAME:void 0});if(s)for(const h of[-.45,.45])Ks(n,[t+.05,o+a*.2,h],.07,e+2,c.MAGIC2)}const h_={"car-nose-down":{desc:"a hatchback nose-down in the earth, ferns round it",build(n){const e=n.parts.length;Uo(n,1),ai(n,e,{pitch:-.5,at:[0,.2,0]}),n.ell([1.3,.1,0],[.9,.35,1],c.BARK2,{group:4,rough:.04,paint:t=>t[1]>.25?c.MOSS:void 0}),sa(n,[.9,.2,.8],5),sa(n,[-.9,.05,.9],6,.8),n.ell([-.6,1.25,0],[.5,.06,.4],c.MOSS,{group:7})}},"van-tree":{desc:"a camper van with a tree grown up through its roof, its headlights glowing with fairy light",glow:!0,build(n){Uo(n,1,{van:!0,len:1.6,flat:!0,glow:!0}),n.chain([[.2,0,0,.22],[.2,1.5,0,.2],[.3,2.6,-.1,.14],[.35,3.3,-.1,.08]],c.TRUNK,{group:4,rough:.015}),Ia(n,[.3,3.4,-.1],[1.1,.7,.9],5),Kn(n,[-1.6,.1,.66],[-1,1.3,.7],6,1),kt(n,14,2.2,7,2)}},"car-on-side":{desc:"a car on its side among ferns",build(n){const e=n.parts.length;Uo(n,1),ai(n,e,{roll:Math.PI/2,at:[0,.2,.1]});for(const[t,i]of[[-1.2,.9],[.3,1.1],[1.4,.6],[-.4,-1]])sa(n,[t,.05,i],5+(t>0?1:0),1.1)}},"trolley-tipped":{desc:"a shopping trolley tipped over, a plant growing in its basket",build(n){const e=n.parts.length;Gh(n,1),Ia(n,[.05,.65,0],[.32,.28,.26],3),ai(n,e,{roll:1.35,at:[0,.32,0]}),kt(n,8,.9,6,3)}},"trolley-nest":{desc:"a shopping trolley standing upright, a bird's nest in its basket",build(n){Gh(n,1),n.ell([0,.78,0],[.2,.08,.17],c.STRAW,{group:3,paint:e=>Math.abs(Math.sin(e[0]*40+e[2]*30))<.3?c.BARK2:void 0});for(const e of[-.05,.05])n.ell([e,.84,.02],[.04,.03,.035],c.BELLY,{group:4});kt(n,8,.9,6,4)}},cone:{desc:"a single traffic cone, faded",build(n){hr(n,[0,0,0],1)}},cones:{desc:"a little cluster of traffic cones, one fallen",build(n){hr(n,[0,0,0],1),hr(n,[.5,0,.2],4);const e=n.parts.length;hr(n,[0,0,0],7),ai(n,e,{roll:1.5,yaw:.6,at:[-.4,.2,.4]}),kt(n,6,.8,10,5)}},"cone-lantern":{desc:"a traffic cone lit from within like a lantern, a ring of mushrooms round it",glow:!0,build(n){hr(n,[0,0,0],1,!0);for(let e=0;e<9;e++){const t=e/9*6.283,i=[Math.cos(t)*.55,0,Math.sin(t)*.45];n.seg(i,R.add(i,[0,.08,0]),.02,.02,c.CLOTH,{group:5}),n.ell(R.add(i,[0,.1,0]),[.06,.035,.06],c.BODY2,{group:6})}}},"highway-slab":{desc:"a slab of tarmac tilted up out of the ground, faded lane markings, a crash-barrier stub",build(n){const e=n.parts.length;n.box([0,0,0],[2.2,.14,1.3],c.STONE,{round:.03,group:1,rough:.01,paint:t=>Mt(t,5,1)<.06||Math.abs(Math.sin(t[0]*3+t[2]*5)*.3+t[2]*.6-.2)<.02?c.STONED:t[1]>.1&&Math.abs(t[2])<.05&&(t[0]+9)*.8%1<.55?Mt(t,12)<.3?c.STONE:c.CLOTH:t[1]>.1&&Math.abs(t[2]-1.1)<.04?c.BELLY:t[1]>.1&&Mt(t,6,4)<.12?c.MOSS:void 0});for(const t of[-1.6,-.4])Je(n,[t,.1,1.25],[t,.75,1.25],2,.04);n.box([-1,.62,1.3],[.9,.1,.03],c.FRAME,{group:3,paint:t=>Math.abs(t[1]-.62)<.02?c.STONED:It(.5,.1)(t)}),ai(n,e,{pitch:.38,roll:.08,at:[0,.7,0]}),n.ell([-1.8,.1,0],[.6,.2,1.3],c.BARK2,{group:5,rough:.04,paint:t=>t[1]>.2?c.MOSS:void 0}),kt(n,16,2.4,6,6)}},"highway-line":{desc:"a section of cracked road, its white line broken, grass in the cracks",build(n){n.box([0,.02,0],[2,.03,1],c.STONE,{round:.02,group:1,paint:e=>Mt(e,4,9)<.08||Math.abs(Math.sin(e[0]*2.3)*.4-e[2])<.025?Mt(e,20)<.4?c.LEAF2:c.STONED:Math.abs(e[2]+.05)<.05&&(e[0]+9)*.7%1<.6?c.CLOTH:Mt(e,6)<.08?c.MOSS:void 0});for(const[e,t]of[[-1.2,.3],[.4,-.2],[1.3,.5]])kt(n,4,.2,3,e*10+7,e,t)}},"road-sign":{desc:"a fallen road sign, blank but for an abstract arrow",build(n){Je(n,[-.9,.05,.2],[.6,.1,-.1],1,.03),n.box([.9,.12,-.15],[.62,.05,.46],c.HAT1,{group:2,dir:[1,.25,-.2],round:.02,paint:e=>{const t=e[0]-.9,i=e[2]+.15;return Math.abs(i)<.08&&t>-.36&&t<.2||t>.08&&Math.abs(i)<.28-(t-.08)*.9&&t<.38?c.BELLY:Math.hypot(Math.abs(t)-.56,Math.abs(i)-.4)<.04?c.FRAME:It(.2,.1)(e)}}),kt(n,8,1.2,4,7)}},"phone-box":{desc:"an overgrown phone box, its panes long gone",build(n){n.box([0,1,0],[.42,1,.42],c.ACCENT,{round:.04,group:1,paint:e=>Math.max(Math.abs(e[0]),Math.abs(e[2]))>.38&&e[1]>.5&&e[1]<1.75&&e[1]*5%1>.12&&(Math.abs(e[0])+Math.abs(e[2]))*5%1>.12?c.SHADES:It(.3,.15)(e)}),n.box([0,2.08,0],[.46,.09,.46],c.ACCENT,{round:.06,group:2,paint:It(.3,.3)}),Kn(n,[.43,0,.3],[.4,1.9,.43],3,8),Kn(n,[-.3,0,.43],[-.1,1.4,.43],4,9),kt(n,10,.9,5,8)}},lamppost:{desc:"a lamppost bent over, its lamp hanging near the ground",build(n){n.chain([[0,0,0,.06],[0,1.4,0,.05],[.2,2.1,0,.045],[.8,2.2,0,.04],[1.2,1.7,0,.035]],c.FRAME,{group:1,paint:It(.4,.05)}),n.box([1.25,1.55,0],[.16,.1,.12],c.FRAME,{round:.04,group:2}),n.ell([1.25,1.45,0],[.12,.06,.1],c.SHADES,{group:2}),Kn(n,[0,0,.06],[.05,1.5,.06],3,10),kt(n,6,.7,4,9)}},sofa:{desc:"a sofa left in a clearing, moss on its cushions",build(n){const e=t=>Mt(t,6,5)<.25&&t[1]>.4?c.MOSS:Mt(t,14)>.9?c.STONED:void 0;n.box([0,.3,0],[.9,.2,.4],c.CLOTH,{round:.1,group:1,paint:e}),n.box([-.02,.7,-.32],[.9,.3,.12],c.CLOTH,{round:.1,group:2,paint:e});for(const t of[-.85,.85])n.box([t,.55,0],[.12,.22,.42],c.CLOTH,{round:.1,group:3,paint:e});for(const t of[-.4,.4])n.box([t,.53,.05],[.42,.08,.34],c.CLOTH,{round:.08,group:4,paint:e});kt(n,14,1.6,5,10)}},"washing-machine":{desc:"a washing machine in the undergrowth, a fern in its drum",build(n){n.box([0,.42,0],[.32,.42,.32],c.BELLY,{round:.05,group:1,paint:e=>e[2]>.28&&Math.hypot(e[0],e[1]-.4)<.2?Math.hypot(e[0],e[1]-.4)<.15?c.SHADES:c.FRAME:It(.25,.15)(e)}),sa(n,[0,.4,.4],2,.55),kt(n,8,.8,3,11)}},"bike-roots":{desc:"a bicycle tangled in tree roots",build(n){for(const e of[-.45,.45])for(let t=0;t<12;t++){const i=t/12*6.283,s=(t+1)/12*6.283;Je(n,[e+Math.cos(i)*.3,.32+Math.sin(i)*.3,0],[e+Math.cos(s)*.3,.32+Math.sin(s)*.3,0],1+(e>0?1:0),.018)}for(const[e,t]of[[[-.45,.32,0],[0,.35,0]],[[0,.35,0],[.3,.7,0]],[[-.45,.32,0],[-.15,.72,0]],[[-.15,.72,0],[.3,.7,0]],[[.3,.7,0],[.45,.32,0]],[[0,.35,0],[-.15,.72,0]],[[.3,.7,0],[.35,.85,0]]])Je(n,e,t,3,.022);n.box([-.17,.76,0],[.1,.03,.04],c.SHADES,{group:4}),Je(n,[.25,.85,-.15],[.42,.87,.15],4,.018);for(let e=0;e<4;e++)n.chain([[-1+e*.2,0,-.4,.09],[-.3+e*.3,.35+e%2*.2,-.05+e*.05,.07],[.4+e*.2,.1,.3,.05]],c.TRUNK,{group:5+e%2,rough:.01})}},"dish-birdbath":{desc:"a satellite dish fallen face-up, full of rainwater, a bird drinking",build(n){n.ell([0,.2,0],[.6,.22,.6],c.BELLY,{group:1,paint:It(.25,.2)}),n.ell([0,.34,0],[.52,.12,.52],c.BELLY,{group:1,cut:!0}),n.ell([0,.28,0],[.48,.02,.48],c.WATER,{group:2}),Je(n,[0,.25,-.5],[.1,.8,-.6],3,.03);const e=[.5,.45,.3];n.ell(e,[.12,.07,.06],c.BODY3,{group:4,dir:[1,.3,0]}),n.ell(R.add(e,[.1,.07,0]),[.05,.05,.045],c.BODY3,{group:4}),n.seg(R.add(e,[.14,.07,0]),R.add(e,[.2,.04,0]),.012,.004,c.ACCENT,{group:4}),kt(n,8,1,5,12)}},"fridge-fireflies":{desc:"a fridge standing in the woods, its door ajar, fireflies inside",glow:!0,build(n){n.box([0,.85,0],[.36,.85,.32],c.BELLY,{round:.05,group:1,paint:e=>e[2]>.28&&Math.abs(e[0])<.3&&e[1]<1.55&&e[1]>.1?c.SHADES:It(.25,.2)(e)}),n.box([.5,.85,.4],[.03,.78,.3],c.BELLY,{dir:[.5,0,1],round:.03,group:2,paint:It(.25,.15)});for(let e=0;e<7;e++)Ks(n,[(Ht(e)-.5)*.4,.4+Ht(e,2)*1,.2+Ht(e,3)*.3],.03,10+e,e%2?c.MAGIC:c.MAGIC2);Kn(n,[-.36,0,.3],[-.3,1.6,.33],3,13)}}};function Gh(n,e){const t=[[-.35,.45,-.25],[.35,.45,-.25],[.35,.45,.25],[-.35,.45,.25],[-.3,.9,-.28],[.4,.9,-.28],[.4,.9,.28],[-.3,.9,.28]];for(const[i,s]of[[0,1],[1,2],[2,3],[3,0],[4,5],[5,6],[6,7],[7,4],[0,4],[1,5],[2,6],[3,7]])Je(n,t[i],t[s],e,.015);for(let i=1;i<6;i++){const s=i/6;Je(n,R.lerp(t[0],t[1],s),R.lerp(t[4],t[5],s),e,.008),Je(n,R.lerp(t[3],t[2],s),R.lerp(t[7],t[6],s),e,.008)}Je(n,t[4],[-.45,.95,-.28],e,.015),Je(n,t[7],[-.45,.95,.28],e,.015),Je(n,[-.45,.95,-.28],[-.45,.95,.28],e,.025,c.ACCENT);for(const[i,s]of[[-.3,-.22],[.3,-.22],[-.3,.22],[.3,.22]])Je(n,[i,.45,s],[i,.08,s],e,.012),n.ell([i,.06,s],[.05,.05,.02],c.BODY3,{group:e+1})}function hr(n,e,t,i=!1){n.box(R.add(e,[0,.03,0]),[.24,.03,.24],c.ACCENT,{round:.02,group:t,paint:It(.15,.2)}),n.seg(R.add(e,[0,.05,0]),R.add(e,[0,.72,0]),.2,.03,c.ACCENT,{group:t+1,paint:s=>Math.abs(s[1]-e[1]-.42)<.07?i?c.MAGIC2:c.CLOTH:i&&Mt(s,18)<.2?c.GLOW:It(.15,.1)(s)}),i&&Ks(n,R.add(e,[0,.78,0]),.05,t+2,c.MAGIC2)}const u_={swings:{desc:"a rusty swing set, one swing hanging, one chain broken; the hanging one sways on its own with a faint sparkle",glow:!0,split:1.6,build(n){for(const e of[-1.1,1.1])for(const t of[-.5,.5])Je(n,[e,0,t],[e*.95,2.1,0],1,.045);Je(n,[-1.1,2.1,0],[1.1,2.1,0],2,.05);for(const e of[-.12,.12])Je(n,[-.5,2.08,e],[-.42,.55,e*1.2],3,.012);n.box([-.42,.52,0],[.2,.025,.14],c.BODY3,{round:.02,group:3,dir:[1,-.15,0]});for(let e=0;e<5;e++)Ks(n,[-.42+(Ht(e)-.5)*.5,.6+Ht(e,2)*.7,(Ht(e,3)-.5)*.3],.025,10+e);Je(n,[.5,2.08,-.12],[.5,1.3,-.12],4,.012),Je(n,[.5,2.08,.12],[.58,.9,.2],4,.012),n.box([.7,.04,.3],[.2,.025,.14],c.BODY3,{round:.02,group:5,dir:[1,0,.5]}),Kn(n,[1.1,0,.5],[1.05,1.6,.25],6,14),kt(n,14,1.8,7,15)}},slide:{desc:"a slide half-swallowed by brambles, a sapling at its foot",split:1.6,build(n){for(const e of[-.95,-.55])for(const t of[-.3,.3])Je(n,[e,0,t],[e,1.5,t],1,.035);for(let e=1;e<6;e++)Je(n,[-.95,e*.27,-.3],[-.95,e*.27,.3],1,.02);n.box([-.75,1.5,0],[.25,.04,.32],c.FRAME,{group:2,paint:It(.4,.1)}),n.box([.35,.78,0],[.95,.03,.26],c.HAT1,{dir:[1,-.75,0],round:.02,group:3,paint:e=>Math.abs(e[2])>.22?c.FRAME:It(.35,.15)(e)});for(let e=0;e<10;e++){const t=Ht(e,3)*6.283;n.chain([[.4+Math.cos(t)*.9,0,Math.sin(t)*.6,.03],[.3+Math.cos(t)*.4,.5+Ht(e)*.5,Math.sin(t)*.3,.025],[.1+Ht(e,4)*.6,.7+Ht(e,5)*.4,(Ht(e,6)-.5)*.4,.015]],c.BARKD,{group:5+e%2}),e%3===0&&n.ell([.3+Ht(e,7)*.6,.5+Ht(e,8)*.4,(Ht(e,9)-.5)*.5],[.2,.14,.16],c.LEAF,{group:7,rough:.03,paint:i=>Mt(i,30)<.1?c.ACCENT:void 0})}n.seg([1.45,0,.2],[1.45,1.2,.2],.03,.02,c.TRUNK,{group:8}),Ia(n,[1.45,1.3,.2],[.25,.2,.22],9)}},roundabout:{desc:"a roundabout tilted in the moss",build(n){const e=n.parts.length;n.ell([0,.2,0],[.9,.05,.9],c.HAT2,{group:1,paint:t=>Math.abs(Math.sin(Math.atan2(t[2],t[0])*3))<.08?c.FRAME:It(.35,.2)(t)});for(let t=0;t<3;t++){const i=t/3*6.283;Je(n,[Math.cos(i)*.7,.25,Math.sin(i)*.7],[Math.cos(i)*.7,.6,Math.sin(i)*.7],2,.025),Je(n,[Math.cos(i)*.7,.6,Math.sin(i)*.7],[Math.cos(i)*.1,.6,Math.sin(i)*.1],2,.02)}ai(n,e,{pitch:.18,roll:.1,at:[0,.05,0]}),n.ell([0,.05,0],[1.1,.08,1],c.MOSS,{group:4}),kt(n,10,1.3,5,16)}},seesaw:{desc:"a seesaw stuck at an angle",build(n){n.box([0,.2,0],[.08,.2,.14],c.FRAME,{round:.02,group:1,paint:It(.4,.1)});const e=n.parts.length;n.box([0,0,0],[1.3,.035,.12],c.WOOD,{round:.02,group:2,paint:t=>Mt(t,8)<.2?c.MOSS:void 0});for(const t of[-1.05,1.05])Je(n,[t,.03,-.12],[t,.03,.12],3,.02);ai(n,e,{pitch:.32,at:[0,.42,0]}),kt(n,10,1.4,5,17)}},"climbing-frame":{desc:"a climbing frame, a dome of bars wound with ivy",split:1.4,build(n){const t=(i,s)=>{const r=i/8*6.283,a=s/4*Math.PI/2;return[Math.cos(r)*Math.cos(a)*1,Math.sin(a)*1*1.5,Math.sin(r)*Math.cos(a)*1]};for(let i=0;i<8;i++)for(let s=0;s<4;s++)Je(n,t(i,s),t(i,s+1),1,.025),Je(n,t(i,s),t(i+1,s),1,.025);for(let i=0;i<3;i++)Kn(n,t(i*3,0),t(i*3+1,3),3+i,18+i);kt(n,12,1.4,6,18)}},"spring-rider":{desc:"a spring rider animal, its paint faded (a generic animal, no characters)",build(n){for(let e=0;e<6;e++)n.seg([Math.cos(e*2)*.06,e*.07,Math.sin(e*2)*.06],[Math.cos(e*2+2)*.06,(e+1)*.07,Math.sin(e*2+2)*.06],.022,.022,c.FRAME,{group:1});n.ell([0,.55,0],[.35,.16,.14],c.BODY,{group:2,paint:It(.4,.2)}),n.ell([.32,.72,0],[.12,.11,.1],c.BODY,{group:2,paint:It(.4,.2)});for(const e of[-.05,.05])n.ell([.28,.85,e],[.03,.06,.02],c.BODY,{group:3});n.ell([.43,.74,.06],[.015,.015,.015],c.SHADES,{group:3}),Je(n,[.25,.68,-.12],[.25,.68,.12],4,.015),n.box([0,.02,0],[.25,.02,.25],c.STONE,{group:5}),kt(n,8,.8,6,19)}}};function d_(n,e,t,i,s,r=1){n.box([0,.015,0],[e,.015,t],i,{round:.01,group:r,paint:a=>Mt(a,3,4)<.05||Math.abs(Math.sin(a[0]*1.3+1)*.5+Math.sin(a[0]*4.1)*.08-a[2]*.3)<.012?Mt(a,18)<.5?c.LEAF2:c.STONED:s(a[0],a[2])?Mt(a,10,2)<.25?i:c.CLOTH:Mt(a,5,7)<.07?c.MOSS:void 0})}const Wn=(n,e,t=.045)=>Math.abs(n-e)<t,f_={"tennis-court":{desc:"a cracked tennis court, faded lines, grass through the cracks",decal:!0,build(n){d_(n,4.4+.5,2+.5,c.HAT2,(i,s)=>Math.abs(i)<=4.4+.05&&Math.abs(s)<=2+.05&&(Wn(Math.abs(i),4.4)||Wn(Math.abs(s),2)||Wn(Math.abs(s),2*.75)||Math.abs(i)<4.4*.54&&(Wn(s,0)||Wn(Math.abs(i),4.4*.54))))}},"tennis-net":{desc:"a sagging tennis net between its posts",build(n){for(const e of[-2.2,2.2])Je(n,[0,0,e],[0,.55,e],1,.035);n.box([0,.38,0],[.01,.17,2.15],c.CLOTH,{group:2,paint:e=>e[1]>.5?c.CLOTH:e[1]*25%1<.25||(e[2]+5)*25%1<.25?c.SHADES:void 0}),n.box([0,.25,0],[.012,.15,1],c.SHADES,{group:2,cut:!0})}},"umpire-chair":{desc:"a tennis umpire's chair leaning over",split:1.4,build(n){const e=n.parts.length;for(const t of[-.25,.25])for(const i of[-.2,.2])Je(n,[t*1.4,0,i*1.4],[t,1.5,i],1,.03);for(let t=1;t<5;t++)Je(n,[-.3,t*.3,-.22],[-.3,t*.3,.22],1,.02);n.box([0,1.55,0],[.28,.04,.25],c.WOOD,{group:2}),n.box([-.26,1.8,0],[.03,.25,.25],c.WOOD,{group:2}),ai(n,e,{roll:.25,pitch:-.1}),kt(n,8,1,4,20)}},"court-fence":{desc:"a chain-link fence section, ivy through it, a gap torn in it",build(n){for(const e of[-1.5,0,1.5])Je(n,[e,0,0],[e,1.7,0],1,.03);Je(n,[-1.5,1.7,0],[1.5,1.7,0],1,.025),n.box([0,.85,0],[1.5,.85,.008],c.FRAME,{group:2,paint:e=>(e[0]+e[1]+9)*9%1<.2||(e[0]-e[1]+9)*9%1<.2?Mt(e,5)<.15?c.BODY2:c.FRAME:c.SHADES}),n.ell([.7,.5,0],[.4,.5,.05],c.SHADES,{group:2,cut:!0,rough:.08});for(let e=0;e<3;e++)Kn(n,[-1.3+e*.6,0,.03],[-1.1+e*.5,1.5,.03],3+e,21+e)}},"tennis-balls":{desc:"a few old tennis balls glowing faintly in the grass",glow:!0,build(n){for(let e=0;e<4;e++)Ks(n,[(Ht(e)-.5)*1.2,.06,(Ht(e,2)-.5)*.8],.06,1+e,e%2?c.MAGIC:c.MAGIC2);n.ell([0,.004,0],[.8,.004,.5],c.LEAF3,{group:9}),kt(n,8,.8,5,22)}},"baseball-diamond":{desc:"a baseball diamond: the worn dirt infield, grown-over bases, a pitcher's mound",decal:!0,build(n){n.box([0,.015,0],[2.2*1.6,.015,2.2*1.2],c.LEAF2,{group:1,round:.01,paint:t=>{const i=Math.abs(t[0])/2.2+Math.abs(t[2])/1.6500000000000001;return i<1.08&&i>.78?Mt(t,8)<.2?c.LEAF2:c.BARK2:i<=.78?Mt(t,6)<.15?c.MOSS:void 0:Mt(t,6,3)<.3?c.LEAF:void 0}});for(const[t,i]of[[2.2,0],[0,2.2*.75],[-2.2,0],[0,-2.2*.75]])n.box([t*.93,.04,i*.93],[.12,.02,.1],c.BELLY,{group:2,round:.02,paint:s=>Mt(s,20)<.3?c.LEAF2:void 0});n.ell([0,.02,0],[.35,.08,.28],c.BARK2,{group:3})}},backstop:{desc:"a baseball backstop fence, a dugout bench beside it",build(n){for(let e=0;e<=4;e++){const t=-.8+e*.4;Je(n,[-Math.cos(t)*.8,0,Math.sin(t)*1.4],[-Math.cos(t)*.8,1.8,Math.sin(t)*1.4],1,.03)}for(let e=0;e<4;e++){const t=-.8+e*.4,i=t+.4,s=[-Math.cos(t)*.8,.9,Math.sin(t)*1.4],r=[-Math.cos(i)*.8,.9,Math.sin(i)*1.4],a=R.lerp(s,r,.5);n.box(a,[Math.hypot(r[0]-s[0],r[2]-s[2])/2,.9,.008],c.FRAME,{dir:R.sub(r,s),group:2,paint:o=>(o[1]+o[0]*2+9)*9%1<.2?Mt(o,5)<.2?c.BODY2:c.FRAME:c.SHADES})}n.box([-.6,.3,2],[.15,.04,.7],c.WOOD,{group:3});for(const e of[1.4,2.6])n.box([-.6,.14,e],[.12,.14,.04],c.WOOD,{group:3});Kn(n,[-.75,0,-.5],[-.7,1.6,-.4],4,25)}},scoreboard:{desc:"a scoreboard frame, panels missing (no text)",split:1.8,build(n){for(const e of[-1,1])Je(n,[e,0,0],[e,2.6,0],1,.05);for(let e=0;e<3;e++)for(let t=0;t<5;t++)Ht(e,t)>.3&&n.box([-.8+t*.4,1.6+e*.32,0],[.18,.14,.03],c.HAT1,{group:2+e,round:.01,paint:It(.3,.1)});n.box([0,2.62,0],[1.1,.05,.06],c.FRAME,{group:5}),Kn(n,[-1,0,.06],[-.95,2.3,.06],6,26)}},"football-pitch":{desc:"a football pitch: faded lines, a centre circle, mown stripes long grown out",decal:!0,build(n){n.box([0,.015,0],[5.2+.5,.015,3.3+.5],c.LEAF2,{group:1,round:.01,paint:i=>{const s=i[0],r=i[2];return Math.abs(s)<=5.2+.05&&Math.abs(r)<=3.3+.05&&(Wn(Math.abs(s),5.2,.06)||Wn(Math.abs(r),3.3,.06)||Wn(s,0,.06)||Wn(Math.hypot(s,r*1),1,.06)||Math.abs(s)>5.2-1&&Math.abs(r)<1.6&&(Wn(Math.abs(s),5.2-1,.06)||Wn(Math.abs(r),1.6,.06)))?Mt(i,8,2)<.3?c.LEAF2:c.CLOTH:Math.floor((s+20)*.8)%2?Mt(i,6)<.25?c.LEAF2:c.LEAF:Mt(i,5,9)<.1?c.LEAF3:void 0}})}},goal:{desc:"a football goal, its net torn, a sapling grown through it",split:1.1,build(n){Hh(n,1),n.seg([.3,0,.2],[.3,1.5,.2],.035,.025,c.TRUNK,{group:5}),Ia(n,[.3,1.6,.2],[.35,.25,.3],6),kt(n,8,1.2,7,27)}},"goal-tipped":{desc:"a football goal tipped on its back",build(n){const e=n.parts.length;Hh(n,1),ai(n,e,{pitch:-Math.PI/2+.12,at:[-.5,.06,0]}),kt(n,8,1.2,7,28)}},"corner-flag":{desc:"a corner flag, its flag a faded rag",build(n){Je(n,[0,0,0],[0,.9,0],1,.015),n.box([.12,.8,0],[.12,.08,.006],c.ACCENT,{group:2,dir:[1,-.3,.1],paint:It(.2,0)}),kt(n,5,.4,3,29)}},floodlight:{desc:"a floodlight pylon, one lamp still flickering with fairy light",glow:!0,split:2.4,build(n){for(const[t,i]of[[-.25,-.25],[.25,-.25],[.25,.25],[-.25,.25]])Je(n,[t*1.6,0,i*1.6],[t*.5,4,i*.5],1,.035);for(let t=1;t<8;t++){const i=t*4/8,s=1.6-1.1*i/4;Je(n,[-.25*s,i,-.25*s],[.25*s,i+4/8,.25*s],2,.015),Je(n,[.25*s,i,-.25*s],[-.25*s,i+4/8,.25*s],2,.015)}for(let t=0;t<2;t++)for(let i=0;i<3;i++)n.box([-.3+i*.3,4+.2+t*.25,.1],[.12,.1,.06],c.FRAME,{group:3,round:.02,paint:s=>s[2]>.14?t===1&&i===1?c.MAGIC2:c.SHADES:It(.4,.1)(s)});Ks(n,[0,4+.45,.22],.06,4,c.MAGIC2),Kn(n,[-.4,0,.4],[-.2,2.4,.2],5,30)}},"basketball-hoop":{desc:"a basketball hoop on a leaning post, its net gone",split:1.8,build(n){const e=n.parts.length;Je(n,[0,0,0],[0,2.4,0],1,.05),n.box([.15,2.5,0],[.03,.3,.45],c.BELLY,{group:2,paint:t=>Math.abs(t[1]-2.4)<.1&&Math.abs(t[2])<.14&&Math.abs(Math.abs(t[2])-.12)<.02?c.ACCENT:It(.25,.1)(t)});for(let t=0;t<8;t++){const i=t/8*6.283,s=(t+1)/8*6.283;Je(n,[.36+Math.cos(i)*.17,2.32,Math.sin(i)*.17],[.36+Math.cos(s)*.17,2.32,Math.sin(s)*.17],3,.012,c.ACCENT)}ai(n,e,{pitch:-.2}),kt(n,8,1,5,31)}}};function Hh(n,e){for(const t of[-1.4,1.4])Je(n,[0,0,t],[0,1,t],e,.035,c.BELLY);Je(n,[0,1,-1.4],[0,1,1.4],e,.035,c.BELLY);for(const t of[-1.4,1.4])Je(n,[0,1,t],[-.6,0,t],e+1,.02,c.BELLY);n.box([-.3,.5,0],[.012,.55,1.38],c.CLOTH,{dir:[.6,1,0],group:e+2,paint:t=>t[1]*12%1<.3||(t[2]+5)*12%1<.3?c.CLOTH:c.SHADES}),n.ell([-.3,.4,.5],[.2,.3,.4],c.CLOTH,{group:e+2,cut:!0})}const p_=[...Object.entries(h_).map(([n,e])=>({id:n,family:"modern",size:1,split:null,...e})),...Object.entries(u_).map(([n,e])=>({id:n,family:"playground",size:1.1,split:null,...e})),...Object.entries(f_).map(([n,e])=>({id:n,family:"sports",size:1.1,split:null,...e}))];Object.fromEntries(p_.map(n=>[n.id,n]));const Bt=(n,e=0)=>{const t=Math.sin(n*127.1+e*311.7)*43758.5453;return t-Math.floor(t)},Zn=(n,e,t=0)=>Bt(Math.floor(n[0]*e)+Math.floor(n[2]*e)*57+t,Math.floor(n[1]*e)),Bl=n=>{const e=Zn(n,12);return e<.14?c.BARKD:e>.88?c.BARKL:void 0},m_=n=>e=>{const t=Zn(e,10,3);return e[1]<n[1]-.2||t<.2?c.LEAF3:t>.8?c.LEAF2:void 0},dn=(n,e=0)=>t=>{const i=Zn(t,9,7);return t[1]>.05&&i<(n?.34:.12)&&Zn(t,3,1)<(n?.75:.45)?c.MOSS:e&&(t[1]*e%1<.1||((t[0]+t[2])*e*.7+Math.floor(t[1]*e)*.5)%1<.07)||i>.93?c.STONED:void 0},ut=(n,e,t,i,s,r={})=>n.box(e,t,c.STONE,{round:.03,rough:.012,group:i,paint:dn(s,r.courses??5),...r}),bn=(n,e,t,i,s)=>{const r=[];for(let a=0;a<=4;a++){const o=a/4;r.push([...R.add(R.lerp(e,t,o),[(Bt(s,a)-.5)*.15,0,.02]),.03])}n.chain(r,c.LEAF,{group:i,rough:.02,paint:a=>Zn(a,30)<.3?c.LEAF2:void 0})},_i=(n,e,t,i,s)=>{for(let r=0;r<e;r++){const a=Bt(s,r)*6.283,o=t*Math.sqrt(Bt(r,s)),h=Math.cos(a)*o,l=Math.sin(a)*o*.7;n.ell([h,.08,l],[.07,.1+Bt(r,4)*.08,.07],c.LEAF2,{group:i+r%3,paint:u=>u[1]>.14?c.LEAF:void 0})}},si=(n,e,t,i)=>n.ell(e,t,c.LEAF,{group:i,rough:.04,paint:m_(e)}),An=(n,e,t)=>n.chain(e,c.TRUNK,{group:t,rough:.012,paint:Bl}),Sn=(n,e,t,i,s={})=>n.ell(e,t,c.STONE,{group:i,rough:.03,dir:s.dir,paint:r=>r[1]>e[1]+t[1]*(s.moss??.62)&&Zn(r,5,i)<.7?c.MOSS:Zn(r,14)>.9?c.STONED:void 0}),Wh=(n,e,t,i,s=c.MAGIC)=>n.ell(e,[t,t,t],s,{group:i,extra:!0}),g_={"broken-arch":{desc:"a broken arch, one side fallen, a rune on its keystone",glow:!0,split:null,build(n,e){for(const t of[-1,1])ut(n,[t,t<0?1:.7,0],[.22,t<0?1:.7,.25],1+(t>0?1:0),e);for(let t=0;t<=6;t++){const i=Math.PI*(1-t/9),s=[Math.cos(i)*1,2+Math.sin(i)*.7,0];ut(n,s,[.17,.14,.25],3+t%2,e,{dir:[-Math.sin(i),Math.cos(i),0],courses:0,paint:t===4?(r=>Math.abs(r[0]-s[0])<.05&&Math.abs(r[1]-s[1])<.08?c.RUNE:dn(e)(r)):dn(e)})}for(let t=0;t<4;t++)ut(n,[1.3+t*.3,.14,.4+Bt(t)*.5],[.17,.13,.22],6+t,e,{dir:[1,.3*(Bt(t,2)-.5),Bt(t,3)-.5],courses:0});e&&(bn(n,[-1.15,.1,.26],[-.9,1.9,.26],12,1),_i(n,14,1.8,14,2))}},"tower-stump":{desc:"a fallen tower's stump, a spiral stair climbing round its inside",split:2,build(n,e){for(let t=0;t<14;t++){const i=t/14*Math.PI*2,s=1+(Math.sin(i*2+1)*.5+.5)*1.6*(i>3.6&&i<5.4?1:.55);i>.9&&i<2||ut(n,[Math.cos(i)*1.05,s/2,Math.sin(i)*.95],[.25,s/2,.14],1+t%3,e,{dir:[-Math.sin(i),0,Math.cos(i)]})}for(let t=0;t<9;t++){const i=3.2+t*.42,s=.15+t*.26;ut(n,[Math.cos(i)*.7,s,Math.sin(i)*.6],[.24,.06,.12],5,e,{dir:[Math.cos(i),0,Math.sin(i)],courses:0})}for(let t=0;t<3;t++)ut(n,[.6+t*.35,.14,1.1],[.22,.13,.2],7,e,{dir:[1,0,.4*t],courses:0});e&&(bn(n,[-1.05,.1,-.4],[-1,2.3,-.5],10,3),bn(n,[.9,.1,-.6],[.95,1.7,-.55],11,4),n.ell([0,.2,0],[.55,.2,.5],c.LEAF,{group:12,rough:.04}))}},colonnade:{desc:"a colonnade, two columns standing and the rest toppled",split:null,build(n,e){ut(n,[0,.08,0],[2.2,.08,.55],1,e,{courses:0});for(const[t,i]of[[-1.7,1.9],[-.6,1.4]])n.seg([t,.16,0],[t,i,0],.18,.17,c.STONE,{group:2,rough:.01,paint:s=>Math.abs(Math.sin(Math.atan2(s[2],s[0]-t)*8))<.15?c.STONED:dn(e,0)(s)}),ut(n,[t,i+.07,0],[.26,.07,.26],3,e,{courses:0});for(const[t,i,s]of[[.6,.55,.3],[1.6,.4,-.4]])n.seg([t-Math.cos(s)*.7,.2,i-Math.sin(s)*.7],[t+Math.cos(s)*.7,.2,i+Math.sin(s)*.7],.18,.18,c.STONE,{group:4,paint:dn(e,0)});ut(n,[-1.15,2,0],[.75,.1,.28],5,e,{courses:0}),e&&(bn(n,[-1.7,.2,.18],[-1.65,1.8,.18],8,5),_i(n,16,2.2,10,6))}},"stone-ring":{desc:"a ring of standing-stone stubs",split:null,build(n,e){for(let t=0;t<9;t++){const i=t/9*Math.PI*2,s=.3+Bt(t,9)*(t%3===0?1.2:.45);ut(n,[Math.cos(i)*1.7,s/2,Math.sin(i)*1.35],[.2,s/2,.14],1+t%4,e,{dir:[-Math.sin(i),.1*(Bt(t)-.5),Math.cos(i)],courses:0,round:.07})}ut(n,[0,.1,0],[.55,.1,.35],6,e,{courses:0,round:.05}),e&&_i(n,20,2,10,7)}},"chapel-wall":{desc:"a ruined chapel wall with an empty pointed window, moonlight caught in it",glow:!0,split:2.4,build(n,e){ut(n,[0,1.4,0],[1.4,1.4,.18],1,e,{paint:t=>{const i=t[0],s=t[1];return Math.abs(i)<.38&&s>1.1&&s<2.3-Math.abs(i)*.5?void 0:dn(e,5)(t)}}),n.box([0,1.6,0],[.33,.55,.3],c.NOSE,{group:1,cut:!0}),n.ell([0,1.5,-.05],[.3,.5,.02],c.MAGIC2,{group:2,extra:!0,paint:t=>Zn(t,18)<.5?c.MAGIC:void 0});for(const[t,i]of[[-1.55,2.6],[1.5,1.6]])ut(n,[t,i/2,0],[.22,i/2,.26],3,e);for(let t=0;t<5;t++)ut(n,[-1.2+t*.6,.12,.55+Bt(t)*.3],[.18,.12,.16],4,e,{courses:0,dir:[1,0,Bt(t,5)-.5]});e&&(bn(n,[-1.2,.1,.2],[-.6,2.6,.2],6,8),bn(n,[1,.1,.2],[1.2,2,.2],7,9))}},well:{desc:"an old well with a broken winch, fireflies over the water",glow:!0,split:null,build(n,e){for(let t=0;t<12;t++){const i=t/12*Math.PI*2;ut(n,[Math.cos(i)*.55,.32,Math.sin(i)*.5],[.15,.32,.1],1+t%2,e,{dir:[-Math.sin(i),0,Math.cos(i)],courses:3})}n.ell([0,.55,0],[.42,.02,.38],c.WATER,{group:3});for(const t of[-.6,.6])n.box([t,1,0],[.06,.5,.06],c.WOOD,{group:4,round:.02});n.seg([-.6,1.4,0],[.1,1.25,.05],.04,.04,c.WOOD,{group:5}),n.seg([.1,1.25,.05],[0,.85,.1],.01,.01,c.STRAW,{group:5});for(let t=0;t<4;t++)Wh(n,[(Bt(t)-.5)*.8,.8+Bt(t,2)*.7,(Bt(t,3)-.5)*.6],.03,10+t,t%2?c.MAGIC:c.MAGIC2);e&&(bn(n,[-.55,.05,.5],[-.4,.62,.5],15,10),_i(n,10,1,16,11))}},watchtower:{desc:"a crumbled watchtower, tall enough to see from the treetops",split:2.6,build(n,e){ut(n,[0,1.2,0],[.7,1.2,.7],1,e,{paint:t=>Math.abs(t[1]-1.9)<.16&&Math.abs(t[0])<.07&&t[2]>.6?c.NOSE:dn(e,5)(t)});for(const[t,i,s]of[[-.5,-.5,1.3],[0,-.5,1],[.5,-.5,.7],[-.5,0,.9],[-.5,.5,.5],[.5,0,.3]])ut(n,[t,2.4+s/2,i],[.2,s/2,.2],1,e);n.box([0,.55,.7],[.25,.45,.1],c.NOSE,{group:1,cut:!0});for(let t=0;t<6;t++)ut(n,[.5+Bt(t)*1.2,.13,-.3+Bt(t,4)*1.2],[.17,.12,.15],2+t%2,e,{courses:0,dir:[1,0,Bt(t,5)-.5]});e&&(bn(n,[-.7,.1,.3],[-.7,2.4,.2],4,12),bn(n,[.3,.1,.72],[.5,1.8,.72],5,13),si(n,[.1,2.6,-.2],[.45,.3,.4],6))}},"sunken-stair":{desc:"a stairway going down into the ground, a dark doorway at its foot",split:null,build(n,e){for(const t of[-.6,.6])ut(n,[0,.2,t],[1.1,.2,.12],1,e,{courses:2});for(let t=0;t<5;t++)ut(n,[.8-t*.32,.3-t*.07,0],[.16,.04,.5],2,e,{courses:0});n.box([-.55,.08,0],[.28,.1,.48],c.NOSE,{group:3}),ut(n,[-1.1,.55,0],[.15,.55,.62],4,e),ut(n,[-1.05,1.15,0],[.2,.1,.7],5,e,{courses:0}),e&&(_i(n,12,1.6,10,14),bn(n,[-1,1.2,.5],[-.9,.3,.62],13,15))}},"statue-head":{desc:"a toppled giant statue head, its eyes still faintly lit",glow:!0,split:null,build(n,e){const t=[0,.8,0],i=.62,s=(r,a)=>[t[0]+a,t[1]+r,t[2]+i];n.ell(t,[.8,1,.7],c.STONE,{group:1,rough:.012,dir:[1,.25,0],paint:dn(e,0)}),n.ell(s(.3,0),[.62,.14,.16],c.STONE,{group:2,paint:dn(e,0)});for(const r of[-.26,.26])n.ell(s(.12,r),[.15,.09,.1],c.STONED,{group:1,cut:!0}),Wh(n,s(.12,r),.05,3+(r>0?1:0),c.MAGIC);n.ell(s(-.08,0),[.11,.24,.14],c.STONE,{group:5,paint:dn(e,0)}),n.ell(s(-.42,0),[.3,.07,.08],c.STONE,{group:6,paint:r=>Math.abs(r[1]-(t[1]-.42))<.015?c.STONED:dn(e,0)(r)});for(const[r,a]of[[-.55,.75],[0,.95],[.5,.8],[-.7,.3],[.75,.3]])n.ell([t[0]+r,t[1]+a,t[2]-.2],[.3,.25,.45],c.STONE,{group:7,rough:.02,paint:dn(e,0)});n.ell([t[0],.05,t[2]+.2],[1,.1,.8],c.STONE,{group:8,paint:dn(e,0)}),e&&(_i(n,14,1.8,10,16),si(n,R.add(t,[-.2,.95,-.2]),[.5,.25,.45],6))}},hearth:{desc:"a collapsed cottage: its hearth and chimney still standing",split:2.6,build(n,e){ut(n,[0,1.6,-.2],[.45,1.6,.35],1,e),n.box([0,.45,.1],[.3,.3,.3],c.NOSE,{group:1,cut:!0});for(const[t,i,s,r,a]of[[-1.1,.4,.9,.5,0],[1,.5,.7,.35,0],[-1.9,-.2,.12,.35,1]])ut(n,[t,r/2,i],a?[.12,r/2,.7]:[s,r/2,.12],2,e);for(let t=0;t<4;t++)n.seg([-.5+t*.4,.08,.9],[.2+t*.5,.3,.3+t*.1],.05,.05,c.BARKD,{group:3});e&&(bn(n,[-.4,.1,.16],[-.3,2.8,.16],5,17),_i(n,14,1.8,10,18))}},"bridge-span":{desc:"an old bridge span going nowhere, one arch over nothing",split:null,build(n,e){ut(n,[-.9,.7,0],[.35,.7,.5],1,e),ut(n,[.95,.55,0],[.3,.55,.5],2,e);for(let t=0;t<=8;t++){const i=t/8,s=Math.PI*(1-i),r=[Math.cos(s)*.85,.9+Math.sin(s)*.55,0];ut(n,r,[.14,.12,.5],3+t%2,e,{dir:[-Math.sin(s),Math.cos(s),0],courses:0})}ut(n,[-.1,1.62,0],[1.25,.1,.55],5,e,{courses:0,dir:[1,-.08,0]});for(const t of[-.5,.5])ut(n,[-.2,1.85,t],[1,.14,.06],6,e,{courses:0});e&&(bn(n,[-1.2,.1,.5],[-1,1.6,.55],8,19),_i(n,10,1.6,10,20))}},gateway:{desc:"an overgrown gateway, two posts and a rusted gate, a rune glowing on one post",glow:!0,split:null,build(n,e){for(const t of[-.9,.9])ut(n,[t,.9,0],[.22,.9,.22],1+(t>0?1:0),e,{paint:t<0?(i=>i[2]>.2&&Math.abs(i[1]-1.1)<.14&&Math.abs(i[0]-t)<.06?c.RUNE:dn(e,5)(i)):dn(e,5)}),n.ell([t,1.9,0],[.18,.14,.18],c.STONE,{group:3,paint:dn(e,0)});for(let t=0;t<6;t++)n.seg([-.65+t*.12,.1,.1+t*.06],[-.65+t*.12,1.2,.1+t*.06],.015,.015,c.SHADES,{group:4});for(const t of[.25,1.1])n.seg([-.65,t,.1],[-.05,t,.4],.018,.018,c.SHADES,{group:4});for(const t of[-1,1])for(let i=0;i<3;i++)ut(n,[t*(1.3+i*.35),.3-i*.08,0],[.17,.3-i*.08,.14],5,e);e&&(bn(n,[.75,.05,.22],[.85,1.9,.22],7,21),bn(n,[-.9,1.8,.22],[-.3,1,.3],8,22),_i(n,12,1.6,10,23))}}},x_={pebbles:{desc:"a cluster of fist-sized stones",build(n){for(let e=0;e<7;e++)Sn(n,[(Bt(e)-.5)*.6,.04,(Bt(e,2)-.5)*.4],[.07+Bt(e,3)*.05,.05,.07],1+e,{moss:.8})}},pair:{desc:"two small rocks",build(n){Sn(n,[-.15,.12,0],[.22,.15,.2],1),Sn(n,[.2,.08,.12],[.14,.1,.13],2)}},rock:{desc:"a knee-high rock",build(n){Sn(n,[0,.22,0],[.45,.3,.38],1,{dir:[1,.15,.2]})}},split:{desc:"a rock split in two, a seedling in the crack",build(n){Sn(n,[-.28,.35,0],[.3,.45,.45],1,{dir:[1,.3,0]}),Sn(n,[.3,.33,0],[.3,.42,.45],2,{dir:[1,-.3,0]}),n.seg([.02,.2,.1],[0,.6,.1],.015,.01,c.TRUNK,{group:3}),si(n,[0,.62,.1],[.1,.07,.1],4)}},boulder:{desc:"a big boulder",build(n){Sn(n,[0,.55,0],[.85,.75,.7],1,{dir:[1,.1,.3]}),Sn(n,[.7,.15,.5],[.22,.15,.2],2)}},"great-boulder":{desc:"a great mossy boulder, a landmark",build(n){Sn(n,[0,.9,0],[1.4,1.15,1.1],1,{dir:[1,.2,.1],moss:.2}),Sn(n,[-1.1,.3,.6],[.4,.35,.35],2),Sn(n,[1.2,.2,.5],[.3,.22,.28],3)}},slab:{desc:"a flat slab of rock",build(n){n.box([0,.12,0],[1,.12,.7],c.STONE,{round:.08,rough:.02,group:1,dir:[1,.04,.2],paint:e=>e[1]>.2&&Zn(e,6)<.3?c.MOSS:Zn(e,14)>.9?c.STONED:void 0})}},"standing-rock":{desc:"a tall natural standing rock",build(n){Sn(n,[0,.8,0],[.35,.85,.3],1,{moss:.8}),Sn(n,[.35,.1,.25],[.15,.1,.14],2)}}},v_={"spiral-tree":{desc:"a tree whose trunk twists in a spiral",split:2.4,build(n){const e=[];for(let t=0;t<=10;t++){const i=t/10,s=i*Math.PI*4;e.push([Math.cos(s)*.35*(1-i*.4),i*3,Math.sin(s)*.3,.2-i*.12])}An(n,e,1),si(n,[0,3.2,0],[.9,.6,.8],2)}},"loop-tree":{desc:"a tree grown into a loop",split:2.4,build(n){const e=[[0,0,0,.22],[.1,.9,0,.18]];for(let t=0;t<=10;t++){const i=-Math.PI/2+t/10*Math.PI*2;e.push([.1+Math.cos(i)*.55+t*.02,1.45+Math.sin(i)*.55,0,.15])}e.push([.3,2.6,0,.1]),An(n,e,1),si(n,[.3,2.9,0],[.75,.5,.65],2)}},"split-tree":{desc:"a tree split by lightning, both halves still leafing",split:2,build(n){An(n,[[0,0,0,.3],[0,.9,0,.26]],1),An(n,[[-.05,.9,0,.18],[-.6,1.9,0,.13],[-1,2.6,0,.07]],2),An(n,[[.05,.9,0,.18],[.55,1.8,.05,.13],[.9,2.4,.05,.07]],3),n.ell([0,1,.05],[.08,.25,.2],c.BARKD,{group:1,cut:!0}),si(n,[-1,2.7,0],[.6,.45,.5],4),si(n,[.95,2.5,.05],[.55,.4,.5],5)}},"door-tree":{desc:"a fat old tree with a little round door in it, a lit window above",glow:!0,split:2.3,build(n){n.ell([0,1,0],[.8,1.1,.75],c.TRUNK,{group:1,rough:.02,paint:e=>e[2]>.5&&Math.hypot(e[0],e[1]-.45)<.3&&e[1]>.2?Math.hypot(e[0],e[1]-.45)<.25?Math.abs(e[0]%.1)<.015?c.BARKD:c.ACCENT:c.BARKD:e[2]>.45&&Math.hypot(e[0]-.3,e[1]-1.3)<.13?Math.abs(e[0]-.3)<.015||Math.abs(e[1]-1.3)<.015?c.BARKD:c.GLOW:Bl(e)}),n.ell([.12,.45,.72],[.03,.03,.03],c.FRAME,{group:2}),si(n,[0,2.4,-.1],[1.1,.7,.9],3);for(let e=0;e<5;e++){const t=e/5*Math.PI*2;An(n,[[Math.cos(t)*.6,.2,Math.sin(t)*.55,.15],[Math.cos(t)*1.1,.02,Math.sin(t)*1,.05]],4)}}},"mushroom-tree":{desc:"an enormous mushroom, tall as a tree",split:2.2,build(n){n.seg([0,0,0],[.1,2.4,0],.3,.22,c.CLOTH,{group:1,paint:e=>e[1]>2&&e[1]<2.15?c.BELLY:void 0}),n.ell([.1,2.55,0],[1.3,.45,1.15],c.ACCENT,{group:2,rough:.01,paint:e=>e[1]<2.35?c.BODY2:Zn(e,8)<.18?c.BELLY:void 0}),n.ell([.1,2.35,0],[1.2,.08,1.05],c.BODY2,{group:3,paint:e=>Math.abs(Math.sin(Math.atan2(e[2],e[0]-.1)*20))<.3?c.STRAW:void 0})}},"root-tree":{desc:"an upside-down-looking tree, its roots raised high like a crown",split:2,build(n){An(n,[[0,0,0,.35],[0,1.6,0,.25]],1);for(let e=0;e<7;e++){const t=e/7*Math.PI*2;An(n,[[0,1.6,0,.16],[Math.cos(t)*.7,2.2+Bt(e)*.3,Math.sin(t)*.6,.1],[Math.cos(t)*1.2,2.5+Bt(e,2)*.4,Math.sin(t)*1,.04]],2+e%2)}for(let e=0;e<4;e++){const t=e/4*Math.PI*2+.4;An(n,[[Math.cos(t)*.25,.3,Math.sin(t)*.25,.14],[Math.cos(t)*.6,.02,Math.sin(t)*.55,.05]],4)}}},"stone-lifter":{desc:"a tree that has lifted great stones up in its roots",split:2.4,build(n){An(n,[[0,.6,0,.3],[0,2,0,.22],[.1,2.8,0,.12]],1);for(let e=0;e<6;e++){const t=e/6*Math.PI*2;An(n,[[Math.cos(t)*.2,.6,Math.sin(t)*.2,.15],[Math.cos(t)*.6,.45,Math.sin(t)*.55,.12],[Math.cos(t)*.9,0,Math.sin(t)*.8,.07]],2)}for(const[e,t,i]of[[.5,.45,.9],[-.5,.4,1.1],[.15,-.5,.8]])Sn(n,[e,i,t],[.3,.24,.26],3);si(n,[.1,3,0],[1,.6,.85],4)}},"ring-tree":{desc:"a hollow ring of a tree you could fly through",split:null,build(n){for(let e=0;e<=16;e++){const t=e/16*Math.PI*2,i=[Math.cos(t)*1.2,1.35+Math.sin(t)*1.2,0];n.ell(i,[.3,.3,.3],c.TRUNK,{group:1,rough:.02,paint:Bl})}An(n,[[-.6,0,.2,.3],[-.5,.3,.1,.3]],2),An(n,[[.6,0,.2,.3],[.5,.3,.1,.3]],2);for(const[e,t]of[[-.9,2.3],[.3,2.65],[1.1,2]])si(n,[e,t,-.1],[.45,.3,.35],3)}}},M_=[...Object.entries(g_).map(([n,e])=>({id:n,family:"ruins",size:1.15,variants:2,...e})),...Object.entries(x_).map(([n,e])=>({id:n,family:"rocks",size:1,variants:1,split:null,...e})),...Object.entries(v_).map(([n,e])=>({id:n,family:"freak",size:1.2,variants:1,...e}))];Object.fromEntries(M_.map(n=>[n.id,n]));const Hi=(n,e=0)=>{const t=Math.sin(n*127.1+e*311.7)*43758.5453;return t-Math.floor(t)},ln=(n,e,t=0)=>Hi(Math.floor(n[0]*e)+Math.floor(n[2]*e)*57+t,Math.floor(n[1]*e)),ni=(n=.25,e=.15)=>t=>{const i=ln(t,16,3);return ln(t,6,5)<e&&t[1]>.1?c.MOSS:i>1-n*.7?c.BODY2:void 0},ti=(n,e,t,i,s=.025,r=c.FRAME)=>n.seg(e,t,s,s,r,{group:i,paint:ni(.4,.05)}),Vh=(n,e,t,i)=>n.ell(e,t,c.STONE,{group:i,rough:.025,paint:s=>s[1]>e[1]+t[1]*.5&&ln(s,5,i)<.6?c.MOSS:ln(s,14)>.9?c.STONED:void 0}),es=(n,e,t,i,s)=>{for(let r=0;r<e;r++){const a=Hi(s,r)*6.283,o=t*Math.sqrt(Hi(r,s));n.ell([Math.cos(a)*o,.07,Math.sin(a)*o*.7],[.07,.1+Hi(r,4)*.08,.07],c.LEAF2,{group:i+r%3,paint:h=>h[1]>.13?c.LEAF:void 0})}},Fo=(n,e,t,i)=>n.ell(e,t,c.LEAF,{group:i,rough:.04,paint:s=>{const r=ln(s,10,2);return s[1]<e[1]-.15||r<.2?c.LEAF3:r>.8?c.LEAF2:void 0}}),ra=(n,e,t,i,s)=>{const r=[];for(let a=0;a<=4;a++)r.push([...R.add(R.lerp(e,t,a/4),[(Hi(s,a)-.5)*.12,0,.02]),.03]);n.chain(r,c.LEAF,{group:i,paint:a=>ln(a,30)<.3?c.LEAF2:void 0})};function Yh(n,e,{pitch:t=0,roll:i=0,at:s=[0,0,0]}={}){const r=(u,f,d,p)=>{const g=Math.cos(f),v=Math.sin(f),x=[...u];return x[d]=u[d]*g-u[p]*v,x[p]=u[d]*v+u[p]*g,x},a=u=>r(r(u,i,1,2),t,0,1),o=u=>r(r(u,-t,0,1),-i,1,2),h=u=>R.add(a(u),s),l=u=>o(R.sub(u,s));for(const u of n.parts.slice(e))if(u.type==="cone"?(u.a=h(u.a),u.b=h(u.b)):(u.c=h(u.c),u.axes=u.axes.map(a)),u.paint){const f=u.paint;u.paint=(d,p)=>f(l(d),p)}}const __={"verge-post":{family:"prop",path:"tarmac",desc:"a road's verge post, leaning, its band faded",build(n){const e=n.parts.length;n.box([0,.4,0],[.06,.4,.06],c.BELLY,{round:.02,group:1,paint:t=>Math.abs(t[1]-.62)<.06?c.SHADES:ni(.1,.2)(t)}),Yh(n,e,{roll:.15,pitch:.1}),es(n,4,.25,3,1)}},"cats-eye":{family:"prop",path:"tarmac",desc:"a cat's-eye stud in the road (unlit)",build(n){n.box([0,.02,0],[.09,.02,.05],c.SHADES,{round:.01,group:1});for(const e of[-.04,.04])n.ell([e,.04,.03],[.025,.015,.015],c.FRAME,{group:2})}},"stepping-stone":{family:"prop",path:"stepping",desc:"a stepping stone, flat-topped and mossy",build(n){Vh(n,[0,.08,0],[.38,.12,.3],1)}},"boardwalk-post":{family:"prop",path:"boardwalk",desc:"a boardwalk's post, standing in the water",build(n){n.seg([0,0,0],[0,.55,0],.06,.055,c.WOOD,{group:1,paint:e=>e[1]<.12?c.MOSS:e[1]>.5?c.BARK2:void 0})}},"sleeper-sapling":{family:"prop",path:"railway",desc:"a sapling grown up between the sleepers",build(n){n.seg([0,0,0],[0,.9,0],.025,.015,c.TRUNK,{group:1}),Fo(n,[0,.95,0],[.22,.18,.2],2),es(n,4,.2,3,2)}},"glow-mushrooms":{family:"prop",path:"magic",glow:!0,desc:"a cluster of softly glowing mushrooms",build(n){for(let e=0;e<4;e++){const t=[(Hi(e)-.5)*.3,0,(Hi(e,2)-.5)*.2],i=.08+Hi(e,3)*.1;n.seg(t,R.add(t,[0,i,0]),.015,.012,c.CLOTH,{group:1}),n.ell(R.add(t,[0,i+.02,0]),[.05,.03,.05],c.MAGIC,{group:2+e,paint:s=>s[1]>t[1]+i+.035?c.MAGIC2:void 0})}}},"fairy-stone":{family:"prop",path:"magic",glow:!0,desc:"a small fairy stone with a glowing rune",build(n){n.box([0,.18,0],[.09,.18,.06],c.STONE,{round:.04,group:1,paint:e=>e[2]>.04&&Math.abs(e[1]-.2)<.07&&Math.abs(e[0])<.025?c.RUNE:e[1]>.32?c.MOSS:void 0})}},"signal-post":{family:"prop",path:"railway",desc:"a rusty old signal post, its arm dropped (unlit)",build(n){ti(n,[0,0,0],[0,2.2,0],1,.04),n.box([.25,2,0],[.25,.05,.02],c.ACCENT,{dir:[1,-.6,0],group:2,paint:e=>e[0]>.38?c.BELLY:ni(.4,0)(e)}),n.ell([0,2.05,.05],[.06,.06,.03],c.SHADES,{group:3}),ra(n,[0,0,.04],[.02,1.4,.04],4,3)}},stairs:{family:"piece",path:"stairs",desc:"a short flight of mossy stone stairs, for ruins and hollows",build(n){for(let e=0;e<5;e++)n.box([0,.1+e*.2,-e*.3],[.6,.1+e*.2,.15],c.STONE,{round:.03,rough:.01,group:1+e%2,paint:t=>t[1]>.16+e*.4&&ln(t,6,e)<.35?c.MOSS:ln(t,14)>.9?c.STONED:void 0});for(const e of[-.7,.7])Vh(n,[e,.3,-.6],[.15,.35,.7],5)}},"stairs-turn":{family:"piece",path:"stairs",desc:"stone stairs turning on a landing",build(n){for(let e=0;e<3;e++)n.box([0,.1+e*.2,-e*.3],[.5,.1+e*.2,.15],c.STONE,{round:.03,rough:.01,group:1+e%2,paint:t=>ln(t,6,e)<.3&&t[1]>.2+e*.4?c.MOSS:void 0});n.box([0,.35,-1.1],[.55,.35,.5],c.STONE,{round:.03,group:3,paint:e=>ln(e,6)<.3&&e[1]>.6?c.MOSS:void 0});for(let e=0;e<3;e++)n.box([.65+e*.3,.8+e*.2,-1.1],[.15,.1+e*.1,.5],c.STONE,{round:.03,group:4+e%2})}},"root-bridge":{family:"piece",path:"roots",desc:"a bridge of gnarled roots over a stream",build(n){n.ell([0,.01,0],[1.4,.015,.6],c.WATER,{group:1});for(let e=0;e<4;e++)n.chain([[-1.8,0,-.4+e*.27,.14],[-.8,.45,-.35+e*.25,.1],[.6,.5,-.3+e*.22,.1],[1.8,0,-.25+e*.2,.13]],c.TRUNK,{group:2+e%2,rough:.015,paint:t=>ln(t,12)<.12?c.BARKD:t[1]>.55&&ln(t,5)<.3?c.MOSS:void 0});Fo(n,[-1.7,.25,-.5],[.3,.2,.25],5)}},footbridge:{family:"piece",path:"bridges",desc:"a little wooden footbridge over a stream",build(n){n.ell([0,.01,0],[1.2,.015,.7],c.WATER,{group:1});for(let e=-6;e<=6;e++){const t=e*.2,i=.35-t*t*.1;n.box([t,i,0],[.09,.03,.5],c.WOOD,{round:.01,group:2+(e&1),paint:s=>ln(s,10)<.15?c.MOSS:void 0})}for(const e of[-.5,.5]){for(const t of[-1.1,0,1.1])n.seg([t,.3-t*t*.1,e],[t,.85-t*t*.1,e],.03,.03,c.WOOD,{group:4});n.chain([[-1.1,.85-.121,e,.025],[0,.85,e,.025],[1.1,.85-.121,e,.025]],c.WOOD,{group:4})}}},"rope-bridge":{family:"piece",path:"bridges",desc:"a rope bridge over a stream, planks sagging, one missing",build(n){n.ell([0,.01,0],[1.3,.015,.7],c.WATER,{group:1});for(const e of[-1.6,1.6])for(const t of[-.45,.45])n.seg([e,0,t],[e,1.1,t],.05,.045,c.WOOD,{group:2});for(let e=-7;e<=7;e++){if(e===3)continue;const t=e*.2,i=.55-(1-(t/1.6)**2)*.3;n.box([t,i,0],[.08,.02,.38],c.WOOD,{round:.01,group:3+(e&1)})}for(const e of[-.45,.45])for(const t of[0,1]){const i=[];for(let s=0;s<=8;s++){const r=-1.6+s*.4,a=(t?1.05:.55)-(1-(r/1.6)**2)*(t?.25:.3);i.push([r,a,e,.015])}n.chain(i,c.STRAW,{group:5})}}},"goods-wagon":{family:"landmark",path:"railway",desc:"an abandoned goods wagon tipped on its side (no livery)",build(n){const e=n.parts.length;n.box([0,.75,0],[1.6,.65,.6],c.BODY2,{round:.05,group:1,paint:t=>(t[0]+9)*4%1<.08?c.SHADES:ni(.6,.2)(t)});for(const t of[-1.1,1.1])for(const i of[-.55,.55])n.ell([t,.22,i],[.22,.22,.06],c.SHADES,{group:2,paint:s=>Math.hypot(s[0]-t,s[1]-.22)<.08?c.FRAME:void 0});Yh(n,e,{roll:1.4,at:[0,.3,.3]}),es(n,14,2.2,4,5),ra(n,[-1.2,0,1],[-.6,1,1.1],7,6)}},carriage:{family:"landmark",path:"railway",glow:!0,desc:"an old passenger carriage, mossy roof, a tree grown through it, its windows glowing",build(n){n.box([0,.95,0],[2.4,.65,.62],c.HAT1,{round:.08,group:1,paint:e=>Math.abs(e[2])>.58&&e[1]>1&&e[1]<1.35&&(e[0]+9)*1.6%1>.25?ln(e,9)<.2?c.SHADES:c.GLOW:ni(.4,.15)(e)}),n.ell([0,1.62,0],[2.4,.14,.62],c.MOSS,{group:2,paint:e=>ln(e,6)<.3?c.LEAF2:void 0});for(const e of[-1.8,1.8])for(const t of[-.5,.5])n.ell([e,.25,t],[.24,.24,.06],c.SHADES,{group:3});n.chain([[.6,0,0,.2],[.6,1.8,0,.16],[.7,2.9,-.1,.09]],c.TRUNK,{group:4,rough:.015}),Fo(n,[.7,3.1,-.1],[1,.6,.8],5),es(n,16,2.8,6,7)}},platform:{family:"landmark",path:"railway",desc:"a little station platform, a bench and a lamp post (no name board)",build(n){n.box([0,.35,0],[2.4,.35,.7],c.STONE,{round:.02,rough:.008,group:1,paint:e=>e[2]>.62&&e[1]>.6?c.BELLY:e[1]>.66&&ln(e,5)<.25?c.MOSS:(e[0]+9)*2.5%1<.06?c.STONED:void 0}),n.box([-.6,.95,-.3],[.6,.04,.16],c.WOOD,{group:2}),n.box([-.6,1.2,-.44],[.6,.18,.03],c.WOOD,{group:2});for(const e of[-1.1,-.1])n.box([e,.82,-.3],[.04,.12,.14],c.FRAME,{group:2});ti(n,[1.4,.7,-.4],[1.4,2.4,-.4],3,.035),n.box([1.4,2.5,-.4],[.12,.12,.12],c.FRAME,{round:.03,group:4,paint:e=>Math.abs(e[1]-2.5)<.07?c.SHADES:void 0}),ra(n,[1.4,.7,-.36],[1.42,2.2,-.36],5,8),es(n,10,2.4,6,9)}},"level-crossing":{family:"landmark",path:"railway",desc:"a level crossing's barrier post, its boom broken off and lying in the grass",build(n){n.box([0,.55,0],[.15,.55,.15],c.BELLY,{round:.03,group:1,paint:ni(.3,.15)}),n.box([.6,1.05,0],[.6,.05,.04],c.BELLY,{group:2,paint:e=>(e[0]+9)*2.5%1<.5?c.ACCENT:ni(.3,0)(e)}),n.box([1.6,.05,.4],[.7,.05,.04],c.BELLY,{dir:[1,0,.5],group:3,paint:e=>(e[0]+9)*2.5%1<.5?c.ACCENT:ni(.3,.15)(e)}),ti(n,[-.5,0,0],[-.5,1.6,0],4,.03);for(const e of[-1,1])n.box([-.5,1.6,0],[.35,.04,.015],c.BELLY,{dir:[1,e,0],group:5});es(n,10,1.6,6,10)}},"buffer-stop":{family:"landmark",path:"railway",desc:"a buffer stop at the end of the line: a timber beam on rusty posts, its buffers worn, grass round its short stub of track",build(n){for(const e of[-.45,.45])ti(n,[-.2,0,e],[0,.75,e],1,.05),ti(n,[.35,0,e],[0,.7,e],1,.04),n.seg([0,.62,e],[.22,.62,e],.07,.07,c.FRAME,{group:2,paint:ni(.5,0)}),n.ell([.25,.62,e],[.03,.1,.1],c.SHADES,{group:2});n.box([0,.7,0],[.08,.1,.75],c.ACCENT,{round:.02,group:3,paint:e=>(e[2]+9)*4%1<.5?c.BELLY:ni(.4,.1)(e)});for(const e of[-.3,.3])n.seg([.2,.03,e],[2,.03,e],.03,.03,c.SHADES,{group:4,paint:t=>t[1]>.05?c.FRAME:void 0});for(let e=0;e<4;e++)n.box([.5+e*.45,.02,0],[.07,.02,.45],c.WOOD,{group:5,paint:t=>ln(t,9)<.3?c.MOSS:void 0});es(n,12,1.4,6,12)}},"signal-gantry":{family:"landmark",path:"railway",desc:"a rusty signal gantry spanning the line, its signals dark",build(n){for(const e of[-2,2])for(const t of[-.15,.15])ti(n,[e,0,t],[e,3,t],1,.04);for(let e=0;e<8;e++){const t=-2+e*.5;ti(n,[t,2.8,0],[t+.5,3.1,0],2,.02),ti(n,[t,3.1,0],[t+.5,2.8,0],2,.02)}for(const e of[2.8,3.1])ti(n,[-2,e,0],[2,e,0],3,.035);for(const e of[-.8,.8])ti(n,[e,2.8,.05],[e,2.3,.05],4,.02),n.box([e,2.2,.08],[.12,.2,.05],c.SHADES,{round:.03,group:5,paint:t=>Math.hypot(t[0]-e,t[1]-2.27)<.05||Math.hypot(t[0]-e,t[1]-2.13)<.05?c.FRAME:void 0});ra(n,[-2,0,.2],[-1.95,2.4,.2],6,11)}}},b_=Object.entries(__).map(([n,e])=>({id:n,...e}));Object.fromEntries(b_.map(n=>[n.id,n]));const Na=[{id:"stack",crystal:"cyan",tiers:[["bass",4,[.24,.25,.28]],["mid",2,[.46,.15,.25]],["horn",4,[.21,.22,.23]],["tweet",2,[.21,.08,.17]]]},{id:"wall",crystal:"violet",tiers:[["bass",3,[.31,.3,.3]],["mid",2,[.44,.16,.26]],["horn",2,[.3,.25,.24]],["tweet",1,[.26,.09,.18]]]},{id:"tower",crystal:"amber",tiers:[["bass",2,[.28,.27,.29]],["bass",2,[.25,.24,.27]],["horn",2,[.25,.23,.23]],["tweet",3,[.15,.07,.15]]]}],S_={cyan:[[60,220,255],[210,250,255],[150,205,225]],violet:[[175,95,255],[240,215,255],[180,160,225]],amber:[[255,170,50],[255,238,200],[225,190,140]]};function y_(n=0){const[e,t,i]=S_[Na[n%Na.length].crystal];return{[c.STONE]:[78,80,94],[c.STONED]:[36,36,48],[c.MOSS]:[72,108,58],[c.CRYSTAL]:i,[c.RUNE]:e,[c.GLOW]:e,[c.MAGIC2]:t,[c.WOOD]:[150,96,52],[c.LINE]:[24,24,34]}}function Xh(n,e,t,i){const s=Na[n%Na.length],r=new Xe({blend:.02}),a=t==="damaged",o=a?0:[0,.5,1][e%3],h=_=>a&&Pt(_,e,31)<.5;let l=0,u=1,f=.3,d=0,p=n*7;const g=(_,E,P,T)=>D=>{if(T&&Math.abs(Math.sin(D[0]*37+D[1]*23+Math.sin(D[2]*17)*2))<.07)return c.STONED;if(D[1]>_-.02&&(D[2]>E-.06||Pt(Math.floor(D[0]*30),Math.floor(D[2]*30),P)<.2)&&Pt(Math.floor(D[0]*40),Math.floor(D[2]*40),P+1)<.6)return c.MOSS},v=(_,E,P,T,D,U)=>{const N=h(U),F=1+o*.08;r.ell([_,E,P],[T*1.18,T*1.18,.06],c.STONED,{group:D,cut:!0}),r.ell([_,E,P-.02],[T*F,T*F,.035+o*.025],c.CRYSTAL,{group:900+U,paint:H=>{const W=Math.hypot(H[0]-_,H[1]-E)/(T*F);return N?W<.3?c.GLOW:c.CRYSTAL:W<.2+o*.15?c.MAGIC2:W<.5?c.GLOW:W<.78?c.CRYSTAL:c.GLOW}})},x=(_,E,P,T,D,U,N,F)=>H=>{if(H[0]>_+T-.022){const W=Math.min(P,D)*1.5,te=(U-D-H[2])/W+.5,K=(E-H[1])/W+.5;if(te>=0&&te<=1&&K>=0&&K<=1&&(i?Hf(i,te,K,.065):nu(te,K,N,.12)))return a&&Pt(N,e,5)<.5?c.STONED:c.RUNE}return F(H)},m=s.tiers,M=m[0][1]*m[0][2][0]+.02,S=.08,b=m[0][2][2];r.box([0,S,f-b],[M,S,b],c.STONE,{group:u,round:.03,rough:.006,paint:g(S*2,f,3,a)}),r.box([0,S*.9,f],[M-.06,S*.45,.12],c.STONED,{group:u,cut:!0,paint:_=>_[2]<f-.07?c.GLOW:void 0});for(let _=1;_<m[0][1];_++)r.box([-M+_*M*2/m[0][1],S*.9,f-.06],[.015,S*.45,.06],c.STONE,{group:u});l=S*2,u++;const A=[];m.forEach(([_,E,[P,T,D]],U)=>{const N=_==="tweet"?.09:0,F=E*P*2+(E-1)*(_==="tweet"?.14:.01),H=f-U*.035,W=l+N+T;for(let te=0;te<E;te++){const K=-F/2+P+te*(P*2+(_==="tweet"?.14:.01));if(a&&_==="horn"&&te===E-1){A.push([K,P,T,D]);continue}const B=a&&_==="tweet"?[1,.12*(te%2?1:-1),0]:void 0,I=a&&_==="tweet"?W-.04:W,q=g(I+T,H-D+D,u,a),$=te===E-1-(a&&_==="horn"?1:0)&&_!=="tweet";if(r.box([K,I,H-D],[P-.005,T,D],c.STONE,{group:u,round:.035,rough:.004,dir:B,paint:$?x(K,I,T,P-.005,D,H,p++,q):q}),_==="bass"&&v(K,W+.02,H,Math.min(P,T)*.72,u,d++),_==="mid"&&(r.ell([K,W,H],[P*.8,T*.7,D*.9],c.STONED,{group:u,cut:!0,paint:ce=>ce[2]<H-D*.45?h(d)?c.STONED:c.GLOW:void 0}),r.box([K,W,H-D*.5],[.018,T*.6,D*.45],c.STONE,{group:u}),d++),_==="horn"){const ce=W+T*.25;r.seg([K,ce,H-D*1.5],[K,ce,H+.03],.03,Math.min(P,T)*.78,c.STONED,{group:u,cut:!0,paint:de=>de[2]<H-D*.55?h(d)?c.STONED:c.GLOW:void 0}),v(K,W-T*.6,H,T*.22,u,d++)}if(_==="tweet")for(const ce of[-.5,0,.5])v(K+ce*P*1.15,I,H,T*.55,u,d++);u++}if(_!=="tweet"){const te=a&&_==="horn"?P:0;r.box([-te,l+T*2+.012,H-.015],[F/2+.01-te,.012,.015],c.WOOD,{group:u++,round:.008}),l+=.024}_==="tweet"&&!a&&r.flat([0,l+N/2,H-D],[1,0,0],[0,1,0],F/2,N/2,(te,K)=>Math.abs(K)<.45&&Math.sin(te*23)>-.4?c.GLOW:null,{group:u++,bend:0}),l+=T*2+N});const w=l;if([[-M-.04,.25,.34,-.3],[M+.02,.2,.3,.35],[-M+.15,.4,.22,-.1],[M-.2,.42,.18,.2],[.1,.45,.16,.15],[-M-.1,-.25,.26,-.4],[M+.08,-.2,.24,.45]].forEach(([_,E,P,T],D)=>{if(a&&D%2){r.seg([_,.03,E],[_+.12,.05,E+.04],.04,.02,c.CRYSTAL,{group:700+D});return}const U=[_+T*P,P,E+.05];r.seg([_,0,E],U,.045+P*.05,.006,c.CRYSTAL,{group:700+D,paint:N=>N[1]>P*(.65-o*.1)&&!a?c.GLOW:void 0}),r.seg([_+.04,0,E-.03],[_+.04+T*P*.5,P*.55,E],.03,.005,c.CRYSTAL,{group:720+D})}),!a)for(const[_,E,P,T]of[[-.55,.1,.1,.03],[.6,.16,0,.025],[.15,.24,-.1,.02]])r.ell([_,w+E-.1,P],[T,T*.8,T],c.STONE,{group:800+Math.round(_*100),extra:!0,rough:.004});for(const[_,E,P,T]of A)r.box([_+.45,E*.75,f+.25],[E,P,T],c.STONE,{group:u++,dir:[.6,.8,.2],round:.035,rough:.007,paint:g(1,0,9,!0)});return{m:r,top:w}}function w_(n){const e=new Xe({blend:.02}),t=(i,s)=>Pt(i,s,n*13+7);e.ell([.1,.1,.62],[.14,.12,.1],c.GLOW,{group:1,paint:i=>i[1]>.16?c.MAGIC2:void 0}),e.seg([.1,.1,.6],[.02,.5,.66],.07,.01,c.GLOW,{group:2,paint:i=>i[1]>.35?c.MAGIC2:c.CRYSTAL});for(let i=0;i<16;i++){const s=i*2.4,r=.15+t(i,1)*.75,a=Math.cos(s)*r,o=Math.sin(s)*r*.6,h=.09+t(i,2)*.1,l=Math.max(.05,(.8-r)*.45)+h*.5;e.box([a,l*.7,o],[h*1.3,h,h*1.1],c.STONE,{group:10+i,dir:[Math.cos(s*1.7),.4+t(i,3),Math.sin(s*2.3)],round:.03,rough:.008,paint:u=>Math.abs(Math.sin(u[0]*41+u[1]*29))<.08?c.STONED:u[1]>l*.7+h*.6&&t(i,4)<.25?c.MOSS:void 0})}for(let i=0;i<4;i++){const s=i*1.7+1,r=Math.cos(s)*.4,a=Math.sin(s)*.25;e.ell([r,.05,a],[.09,.08,.03],c.CRYSTAL,{group:50+i,dir:[Math.cos(s),.5,Math.sin(s)],paint:o=>t(i,5)<.3?c.GLOW:void 0})}for(let i=0;i<4;i++){const s=-.7+i*.45;e.seg([s,0,.4-i*.1],[s+.1,.08+t(i,6)*.1,.42-i*.1],.03,.01,c.CRYSTAL,{group:60+i})}return e}function Kh(n,e,t){let i=0;for(let s=0;s<2e3&&i<e;s++){const r=Math.floor(Pt(s,t,1)*n.w),a=Math.floor(Pt(s,t,2)*n.h*.7);n.get(r,a)||n.get(r+1,a)||n.get(r-1,a)||n.get(r,a+1)||n.get(r,a-1)||n.get(r,a+2)||(n.px(r,a,i%3?c.GLOW:c.MAGIC2),i++)}return n}const E_=n=>Gl(n)*3,Bo=new Map;function A_(n={},{variant:e=0,frame:t=0,state:i="playing",sigil:s}={}){const r=E_(n),a=e+":"+r;Bo.has(a)||Bo.set(a,Ln(Xh(e,0,"playing").m,{height:r}).s);const o=Bo.get(a);if(i==="destroyed")return Kh(Ln(w_(e),{scale:o}).sp,3,e*5+1);const{sp:h}=Ln(Xh(e,t,i,s).m,{scale:o});return Kh(h,i==="damaged"?4:10+t*2,e*5+t)}const T_=[{k:"ambientHue",g:"Night light",label:"Twilight hue",min:0,max:1,step:.01,v:.68,hue:!0},{k:"ambient",g:"Night light",label:"Twilight brightness",min:.05,max:.6,step:.01,v:.22},{k:"moon",g:"Night light",label:"Moonlight",min:0,max:1,step:.01,v:.3},{k:"moonHue",g:"Night light",label:"Moon hue",min:0,max:1,step:.01,v:.58,hue:!0},{k:"glowHue",g:"Night light",label:"Witch glow hue",min:0,max:1,step:.01,v:.13,hue:!0},{k:"glowSat",g:"Night light",label:"Witch glow colour",min:0,max:1,step:.01,v:.35},{k:"glowRadius",g:"Night light",label:"Witch glow reach",min:30,max:200,step:5,v:110},{k:"glowPower",g:"Night light",label:"Witch glow strength",min:.3,max:2.5,step:.05,v:1.4},{k:"bands",g:"Shading",label:"Light steps",min:2,max:7,step:1,v:3},{k:"dither",g:"Shading",label:"Dithering",min:0,max:1,step:.05,v:.35},{k:"round",g:"Shading",label:"Roundness",min:.2,max:1.5,step:.05,v:.9},{k:"outline",g:"Shading",label:"Plant outline",options:["none","dark","tinted"],v:"none"},{k:"cOutline",g:"Shading",label:"Creature outline",options:["dark","tinted","none"],v:"dark"},{k:"shafts",g:"Night light",label:"Moonbeams",min:0,max:1,step:.05,v:.3},{k:"areaContrast",g:"Colour",label:"Difference between areas",min:0,max:1,step:.05,v:.6},{k:"sat",g:"Colour",label:"Saturation",min:.2,max:1.3,step:.01,v:.9},{k:"leafHue",g:"Colour",label:"Leaf hue",min:0,max:1,step:.01,v:.3,hue:!0},{k:"leafVariety",g:"Colour",label:"Leaf colour variety",min:0,max:1,step:.05,v:.3},{k:"trunkHue",g:"Colour",label:"Bark hue",min:0,max:1,step:.01,v:.07,hue:!0},{k:"groundHue",g:"Colour",label:"Ground hue",min:0,max:1,step:.01,v:.27,hue:!0},{k:"groundVal",g:"Colour",label:"Ground brightness",min:.15,max:.7,step:.01,v:.4},{k:"pixel",g:"Shading",label:"Pixel size",min:1,max:5,step:1,v:3},{k:"treeSize",g:"Trees",label:"Tree height",min:.5,max:1.5,step:.05,v:.85},{k:"crownWidth",g:"Trees",label:"Crown width",min:1,max:4,step:.1,v:3},{k:"clearing",g:"Trees",label:"Clearing size",min:0,max:1,step:.05,v:.55},{k:"depth",g:"Map",label:"Border detail (fractal layers)",min:0,max:6,step:1,v:4},{k:"areaScale",g:"Map",label:"Area size (screens)",min:.6,max:2,step:.05,v:1},{k:"areaTypes",g:"Map",label:"Area types",min:4,max:30,step:1,v:30},{k:"density",g:"Trees",label:"Foliage density",min:.2,max:1,step:.05,v:.55},{k:"clump",g:"Trees",label:"Clumpiness",min:0,max:1,step:.05,v:.6},{k:"gnarl",g:"Trees",label:"Gnarliness",min:0,max:1,step:.05,v:.5},{k:"roots",g:"Trees",label:"Roots",min:0,max:1,step:.05,v:.6},{k:"bark",g:"Trees",label:"Bark texture",min:0,max:1,step:.05,v:.6},{k:"trees",g:"Trees",label:"Tree density",min:.2,max:2,step:.05,v:1},{k:"wBroad",g:"Tree mix",label:"Gnarled broadleaf",min:0,max:1,step:.05,v:.8},{k:"wFir",g:"Tree mix",label:"Fir",min:0,max:1,step:.05,v:.6},{k:"wWillow",g:"Tree mix",label:"Willow",min:0,max:1,step:.05,v:.5},{k:"wBirch",g:"Tree mix",label:"Birch",min:0,max:1,step:.05,v:.5},{k:"wPalm",g:"Tree mix",label:"Tree fern",min:0,max:1,step:.05,v:.3},{k:"wFlat",g:"Tree mix",label:"Flat-crowned",min:0,max:1,step:.05,v:.5},{k:"bushes",g:"Undergrowth",label:"Bushes and shrubs",min:0,max:120,step:1,v:55},{k:"bushSize",g:"Undergrowth",label:"Bush size",min:.5,max:1.8,step:.05,v:1},{k:"flowers",g:"Undergrowth",label:"Flowers",min:0,max:1,step:.05,v:.3},{k:"cSat",g:"Creatures",label:"Creature saturation",min:.1,max:1,step:.01,v:.6},{k:"cVal",g:"Creatures",label:"Creature brightness",min:.4,max:1,step:.01,v:.85},{k:"head",g:"Creatures",label:"Baby head size",min:.3,max:.6,step:.01,v:.44},{k:"eye",g:"Creatures",label:"Eye size",min:.5,max:2,step:.05,v:1},{k:"legs",g:"Creatures",label:"Leg length",min:.5,max:1.8,step:.05,v:1},{k:"long",g:"Creatures",label:"Body length",min:.7,max:1.5,step:.05,v:1},{k:"size",g:"Creatures",label:"Baby size (px)",min:5,max:14,step:1,v:8},{k:"growth",g:"Creatures",label:"Legend vs baby height",min:5,max:25,step:1,v:20},{k:"magicHue",g:"Creatures",label:"Magic glow hue",min:0,max:1,step:.01,v:.5,hue:!0},{k:"fur",g:"Creatures",label:"Stripes and spots",min:0,max:1,step:.05,v:.5},{k:"cloakHue",g:"Witch",label:"Jacket hue",min:0,max:1,step:.01,v:.72,hue:!0},{k:"hairHue",g:"Witch",label:"Hair hue",min:0,max:1,step:.01,v:.01,hue:!0},{k:"hatHue",g:"Witch",label:"Hat hue",min:0,max:1,step:.01,v:.74,hue:!0},{k:"topHue",g:"Witch",label:"Top hue",min:0,max:1,step:.01,v:.13,hue:!0},{k:"jeansHue",g:"Witch",label:"Jeans hue",min:0,max:1,step:.01,v:.6,hue:!0},{k:"shoeHue",g:"Witch",label:"Sneakers hue",min:0,max:1,step:.01,v:0,hue:!0},{k:"phonesHue",g:"Witch",label:"Headphones hue",min:0,max:1,step:.01,v:.92,hue:!0}];function R_(){const n={};return T_.forEach(e=>n[e.k]=e.v),n}const C_={broad:mu,fir:ql,willow:gu,birch:xu,flat:vu};function L_(n,e,t,i,s){const r=C_[e.type],a={...t,leafHue:n.leaf+(e.dark?.05:0),gnarl:e.gnarl??t.gnarl,treeBare:e.bare,treeTrunks:e.trunks,treeLean:e.lean,treeThick:e.thick,treeThin:e.thin,treeHollow:e.hollow,treeWebs:e.webs},o=r(i,a,t.treeSize*s*(e.scale||1)*Ae(i,.9,1.1)),h=$l(i,a,r);return e.dark&&(h[c.LEAF]=h[c.LEAF3],h[c.LEAF3]=_e(n.leaf+.05,.7,.22)),h[c.NOSE]=[20,16,24],h[c.GLINT]=[235,235,240],{parts:Vf(o),colours:h}}function P_(n,e,t,i,s){const r=xn[t].id,a=Sr.find(p=>p.id===r),o=Jf(r,n,{K:i,makeCanvas:s}),h=[],l=p=>h.push(p)-1,u={big:[],small:[],walls:[],set:null},f=(p,g)=>zi(p,g,n,"none",s),d=(p,g)=>{const{parts:v,colours:x}=L_(a,p,n,Wi(e*13+t*101+g*7+1),i);return{bot:l(f(v.bot,x)),top:l(f(v.top,x))}};a.big.forEach(([p,g],v)=>{if(p!=="tree"){u.big.push({bot:l(o.big[v].sp),top:null});return}const x=Math.max(1,Math.round(_u/a.big.length));for(let m=0;m<x;m++)u.big.push(d(g,v*17+m))}),a.small.forEach(([p,g],v)=>u.small.push(p==="tree"?d(g,500+v):{bot:l(o.small[v].sp),top:null}));for(const p of o.walls)u.walls.push(l(p.sp));return o.setPiece&&(u.set=a.set?.[0]==="tree"?d(a.set[1],900):{bot:l(o.setPiece.sp),top:null,origin:o.setPiece.origin}),{sprites:h,layout:u,floor:o.floor.sp}}function qh(n,e,t,i=null){const s=[];for(const r of["towards","away"])for(let a=0;a<4;a++)for(let o=0;o<2;o++)s.push(zi(Cf(e,a,o,n,r,i),Af(e,n,i),n,n.cOutline,t));return s}const D_=(n,e,t=!1)=>(t?8:0)+n*2+e;function Oa(n,e,t){return n.getContext("2d").getImageData(0,0,e,t).data}function Ma(n,e=2048){const i=[];let s=0,r=0,a=0,o=1;for(const d of n)s+d.w+1>e&&(s=0,r+=a+1,a=0),i.push({x:s,y:r}),s+=d.w+1,a=Math.max(a,d.h),o=Math.max(o,s);const h=Math.max(1,r+a),l=new Uint8Array(o*h*4),u=new Uint8Array(o*h*4),f=n.map((d,p)=>{const g=i[p],v=Oa(d.A,d.w,d.h),x=Oa(d.N,d.w,d.h);for(let M=0;M<d.h;M++){const S=M*d.w*4,b=((g.y+M)*o+g.x)*4;l.set(v.subarray(S,S+d.w*4),b),u.set(x.subarray(S,S+d.w*4),b)}let m=0;e:for(let M=d.h-1;M>=0;M--,m++)for(let S=0;S<d.w;S++)if(v[(M*d.w+S)*4+3]>=128)break e;return{uv:[g.x/o,g.y/h,(g.x+d.w)/o,(g.y+d.h)/h],w:d.w,h:d.h,pad:Math.min(m,d.h)}});return{albedo:l,normal:u,width:o,height:h,frames:f}}function I_(n,e){if(n.kind==="creature")return{px:Ma(qh(n.style,n.id,e),2048)};if(n.kind==="party")return{px:Ma(qh(n.style,n.species,e,{...Ef(n.seed),collar:n.colour}),2048)};const{sprites:t,layout:i,floor:s}=P_(n.style,n.seed,n.id,n.K,e);return{px:Ma(t),layout:i,floor:{albedo:new Uint8Array(Oa(s.A,s.w,s.h)),normal:new Uint8Array(Oa(s.N,s.w,s.h)),w:s.w,h:s.h}}}function $h(n,e,t){const i=new Ns(n,e,t,Cn,Rn);return i.magFilter=Wt,i.minFilter=Wt,i.generateMipmaps=!1,i.flipY=!1,i.colorSpace=Yn,i.needsUpdate=!0,i}function hd(n){return{albedo:$h(n.albedo,n.width,n.height),normal:$h(n.normal,n.width,n.height),frames:n.frames}}const aa=(n,e=2048)=>hd(Ma(n,e));class N_{constructor(e,t,i){this.style=e,this.seed=t,this.K=2/i;const s=Hd(e),r=u=>zi($d(e,u),s,e,e.cOutline),a=[0,1,2].map(u=>r({frame:u})).concat([0,1,2].map(u=>r({frame:u,facing:"away"})),[r({lean:!0}),r({lean:!0,facing:"away"})],...["rise","descend"].flatMap(u=>["towards","away"].flatMap(f=>[0,1].map(d=>r({pose:u,frame:d,facing:f}))))),o=au;for(const u of["stand","land","takeoff","talk","placeSigil","liftSigil"]){const f=o[u].frames,d={towards:[],away:[],fps:o[u].fps};for(const p of["towards","away"])for(let g=0;g<f;g++)d[p].push(a.length),a.push(r({pose:u,frame:g,facing:p}));this.witchFoot[u]=d}this.witch=aa(a,1024),this.stones=aa([0,1,2,3].map(u=>this.stone(u)));const h=n0(e);this.props=aa([...h.campfire,h.stones.cyan,h.stones.violet,h.stones.green],1024);const l=[];for(let u=0;u<3;u++)for(let f=0;f<3;f++)l.push(zi(A_(e,{variant:u,frame:f,state:"playing"}),y_(u),e,e.cOutline));if(this.soundsystems=aa(l,2048),this.useWorkers=typeof Worker<"u"&&typeof OffscreenCanvas<"u",this.useWorkers){const u=Math.max(1,Math.min(3,(navigator.hardwareConcurrency||2)-1));try{for(let f=0;f<u;f++){const d=new Worker(new URL(""+new URL("artWorker-CdSKnx5j.js",import.meta.url).href,import.meta.url),{type:"module"}),p={w:d,busy:!1};d.onmessage=g=>{p.busy=!1,p.job=void 0,this.receive(g.data),this.dispatch()},d.onerror=()=>{this.useWorkers=!1,p.job&&this.queue.unshift(p.job),p.busy=!1,p.job=void 0},this.workers.push(p)}}catch{this.useWorkers=!1}}}style;seed;types=new Map;creatures=new Map;queue=[];inFlight=new Set;workers=[];useWorkers;witch;witchFoot={};stones;props;soundsystems;K;version=0;onFloor=()=>{};stone(e){const t=Wi(this.seed*3+e),i=5+Math.floor(t()*3),s=7+Math.floor(t()*5),r=new Mn(i+2,s+1);return r.ellipse((i+2)/2,s/2+1,i/2,s/2+.5,c.BODY,{round:this.style.round}),r.ellipse((i+2)/2-1,s/2,i/3,s/3,c.BODY2,{round:this.style.round,onlyOn:new Set([c.BODY]),density:.5,seed:e}),zi(r,{[c.BODY]:[178,174,162],[c.BODY2]:[140,138,130]},this.style,"dark")}key=e=>e.kind+":"+e.id;ask(e){const t=this.key(e);this.inFlight.has(t)||(this.inFlight.add(t),this.queue.push(e),this.dispatch())}dispatch(){if(this.useWorkers)for(const e of this.workers)e.busy||!this.queue.length||(e.busy=!0,e.job=this.queue.shift(),e.w.postMessage(e.job))}receive(e){if(!e.result){console.warn("art worker failed, drawing on the page:",e.error),this.useWorkers=!1,this.queue.unshift(e.job);return}const t=hd(e.result.px);e.job.kind==="type"?(this.types.set(e.job.id,{atlas:t,layout:e.result.layout}),e.result.floor&&this.onFloor(e.job.id,e.result.floor)):this.creatures.set(e.job.id,{atlas:t,frame:D_}),this.inFlight.delete(this.key(e.job)),this.version++}typeArt(e){const t=this.types.get(e);return t||this.ask({kind:"type",id:e,style:this.style,seed:this.seed,K:this.K}),t}creatureArt(e){const t=this.creatures.get(e);return t||this.ask({kind:"creature",id:e,style:this.style}),t}partyArt(e,t,i){const s=`party-${t}`,r=this.creatures.get(s);return r||this.ask({kind:"party",id:s,species:e,seed:t,colour:i,style:this.style}),r}prefetchType(e){this.types.has(e)||this.typeArt(e)}get pending(){return this.inFlight.size}work(e){if(this.useWorkers)return;const t=performance.now();let i=0;for(;this.queue.length&&(i===0||performance.now()-t<e);){const s=this.queue.shift();this.receive({job:s,result:I_(s,(r,a)=>{const o=document.createElement("canvas");return o.width=r,o.height=a,o})}),i++}}whenIdle(){return new Promise(e=>{const t=()=>{this.work(50),this.pending?setTimeout(t,30):e()};t()})}}const Gs=24,lt={uAmb:{value:new X},uMoon:{value:new X},uMoonDir:{value:new X(-.45,.75,.5).normalize()},uMoonBeam:{value:new X},uBands:{value:4},uDither:{value:.35},uShafts:{value:.3},uShaftScale:{value:1},uGlowPos:{value:new X},uGlowRgb:{value:new X},uGlowR:{value:8},uGlowPower:{value:1.4},uHazeCentre:{value:new We},uHazeRange:{value:new We(70,200)},uHazeColour:{value:new X},uTime:{value:0},uSmooth:{value:1},uLightPos:{value:Array.from({length:Gs},()=>new it)},uLightCol:{value:Array.from({length:Gs},()=>new it)},uLightCount:{value:0},uDisco:{value:new it},uDiscoParams:{value:new it},uDiscoColour:{value:new X(1,1,1)},uScenery:{value:new We(1e6,1)}};function O_(n,e,t,i=1){const s=(r,a)=>new X(r[0]/255*a,r[1]/255*a,r[2]/255*a);lt.uAmb.value.copy(s(_e(n.ambientHue,.55,1),n.ambient*i)),lt.uMoon.value.copy(s(_e(n.moonHue,.35,1),n.moon)),lt.uMoonBeam.value.copy(s(_e(n.moonHue,.35,1),n.shafts*.25)),lt.uBands.value=n.bands,lt.uDither.value=n.dither*.5,lt.uShafts.value=n.shafts,lt.uShaftScale.value=t*2,lt.uGlowRgb.value.copy(s(_e(n.glowHue,n.glowSat,1),1)),lt.uGlowR.value=e,lt.uGlowPower.value=n.glowPower,lt.uHazeColour.value.copy(s(_e(n.ambientHue-.08,.55,1),.16*Math.sqrt(i)))}const Ai=`
uniform vec3 uAmb, uMoon, uMoonDir, uMoonBeam, uGlowPos, uGlowRgb;
uniform float uBands, uDither, uShafts, uShaftScale, uGlowR, uGlowPower, uTime, uSmooth;
uniform vec2 uHazeCentre, uHazeRange;
uniform vec3 uHazeColour;
uniform vec4 uLightPos[${Gs}], uLightCol[${Gs}];
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
  // The witch's glow: a broad, soft pool, fairly flat for the first part of its reach, easing to
  // nothing at the edge (no ring), from a source well above her so there's no hot spot under her.
  vec3 v = uGlowPos - P;
  float d = length(v);
  if (d < uGlowR) {
    float ndl = max(0.0, dot(N, v / max(d, 1e-4))) * 0.35 + 0.65;
    float fall = 1.0 - smoothstep(0.0, uGlowR, d);
    l += uGlowRgb * min(1.0, ndl * fall * uGlowPower);
  }
  for (int i = 0; i < ${Gs}; i++) {
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
`,Oi=2,on=32,is=8,U_=`
varying vec3 vWorld;
void main() {
  vec4 w = modelMatrix * vec4(position, 1.0);
  vWorld = w.xyz;
  gl_Position = projectionMatrix * viewMatrix * w;
}
`,F_=`
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
${Ai}
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
    vec2 cell = vec2(mod(float(t), ${is}.0), floor(float(t) / ${is}.0));
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
`;class B_{constructor(e,t,i,s){this.map=e,this.forest=t;const r=e.extent,a=r.maxX-r.minX,o=r.maxZ-r.minZ,h=Math.ceil(a*Oi/on)*on,l=Math.ceil(o*Oi/on)*on;this.tilesX=h/on,this.tilesZ=l/on,this.filled=new Uint8Array(this.tilesX*this.tilesZ);const u=g=>(g.magFilter=g.minFilter=Wt,g.generateMipmaps=!1,g.colorSpace=Yn,g.needsUpdate=!0,g);this.texture=u(new Ns(new Uint8Array(h*l*4),h,l)),u(this.tile),this.floors=u(new Ns(new Uint8Array(64*is*48*4*4),64*is,192));const f=Array.from({length:32},(g,v)=>new X(...xn[v]?.floor??[.25,.45,.4])),d=new yt({vertexShader:U_,fragmentShader:F_,uniforms:{...lt,uAreas:{value:this.texture},uExtent:{value:new it(r.minX,r.minZ,h/Oi,l/Oi)},uPixel:{value:s},uTypeFloor:{value:f},uFloorReady:{value:this.floorReady},uFloors:{value:this.floors},uTile:{value:new We(64,48)},uFloorsSize:{value:new We(64*is,192)},uSat:{value:i.sat},uFloor:{value:new X(e.dancefloor.x,e.dancefloor.z,e.dancefloor.radius)},uCanopy:{value:new it},uCircle:{value:new it},uSweeps:{value:Array.from({length:4},()=>new it)},uSweepCount:{value:0},uClearing:{value:new We(e.tuning.clearingSize,e.tuning.clearingFalloff)}}}),p=new Dn(a+400,o+400);p.rotateX(-Math.PI/2),this.mesh=new $t(p,d),this.mesh.position.set((r.minX+r.maxX)/2,0,(r.minZ+r.maxZ)/2)}map;forest;mesh;texture;tile=new Ns(new Uint8Array(on*on*4),on,on);filled;tilesX;tilesZ;initialised=!1;floorReady=new Array(32).fill(0);floors;pendingFloors=[];setSweeps(e){const t=this.mesh.material.uniforms,i=t.uSweeps.value;e.slice(0,4).forEach((s,r)=>i[r].set(s.x,s.z,s.radius,s.strength)),t.uSweepCount.value=Math.min(4,e.length)}setCircle(e,t,i,s){this.mesh.material.uniforms.uCircle.value.set(e,t,i,s)}setCanopyShadow(e,t,i,s){this.mesh.material.uniforms.uCanopy.value.set(e,t,i,s)}setFloor(e,t){this.pendingFloors.push([e,t])}placeFloors(e){for(const[t,i]of this.pendingFloors){const s=this.mesh.material,r=s.uniforms.uTile.value;if(i.w!==r.x||i.h!==r.y)continue;const a=new Ns(i.albedo,i.w,i.h);a.needsUpdate=!0,e.copyTextureToTexture(a,this.floors,null,new We(t%is*i.w,Math.floor(t/is)*i.h)),a.dispose(),this.floorReady[t]=1}this.pendingFloors=[]}fill(e,t,i,s,r){this.initialised||(e.initTexture(this.texture),e.initTexture(this.floors),this.initialised=!0),this.pendingFloors.length&&this.placeFloors(e);const a=this.map.extent,o=on/Oi,h=Math.max(0,Math.floor((t.minX-a.minX)/o)),l=Math.min(this.tilesX-1,Math.floor((t.maxX-a.minX)/o)),u=Math.max(0,Math.floor((t.minZ-a.minZ)/o)),f=Math.min(this.tilesZ-1,Math.floor((t.maxZ-a.minZ)/o)),d=(i-a.minX)/o,p=(s-a.minZ)/o,g=[];for(let m=u;m<=f;m++)for(let M=h;M<=l;M++)this.filled[m*this.tilesX+M]||g.push([M,m,(M+.5-d)**2+(m+.5-p)**2]);g.sort((m,M)=>m[2]-M[2]);const v=performance.now();let x=0;for(const[m,M]of g){if(x>0&&performance.now()-v>r)break;this.fillTile(e,m,M),x++}return g.length-x}fillTile(e,t,i){const s=this.map.extent,r=this.tile.image.data,a=on/Oi,o=s.minX+t*a,h=s.minZ+i*a,l=this.forest.lightsNear(o+a/2,h+a/2,a/2+6).filter(u=>u.kind==="pond");for(let u=0;u<on;u++)for(let f=0;f<on;f++){const d=o+(f+.5)/Oi,p=h+(u+.5)/Oi,g=this.map.areaAt(d,p),v=(u*on+f)*4;let x=0;for(const m of l)Math.hypot(d-m.x,p-m.z)<3*m.size&&(x=255);r[v]=g.type,r[v+1]=Math.round(g.openness*255),r[v+2]=x,r[v+3]=255}this.tile.needsUpdate=!0,e.copyTextureToTexture(this.tile,this.texture,null,new We(t*on,i*on)),this.filled[i*this.tilesX+t]=1}dispose(){this.texture.dispose(),this.tile.dispose(),this.mesh.geometry.dispose(),this.mesh.material.dispose()}}const k_="varying vec2 vUv; void main() { vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }",z_=`
uniform sampler2D uScene; uniform float uThreshold; varying vec2 vUv;
void main() {
  vec3 c = texture2D(uScene, vUv).rgb;
  float l = max(c.r, max(c.g, c.b));
  gl_FragColor = vec4(c * smoothstep(uThreshold, uThreshold + 0.25, l), 1.0);
}`,G_=`
uniform sampler2D uSrc; uniform vec2 uStep; varying vec2 vUv;
void main() {
  vec4 c = texture2D(uSrc, vUv) * 0.227;
  c += (texture2D(uSrc, vUv + uStep * 1.38) + texture2D(uSrc, vUv - uStep * 1.38)) * 0.316;
  c += (texture2D(uSrc, vUv + uStep * 3.23) + texture2D(uSrc, vUv - uStep * 3.23)) * 0.070;
  gl_FragColor = c;
}`,H_=`
uniform sampler2D uScene, uBloom, uFx; uniform vec2 uLow; uniform float uBloomStrength, uBlack, uGamma, uFxOn; varying vec2 vUv;
void main() {
  vec2 p = (floor(vUv * uLow) + 0.5) / uLow;
  vec3 c = texture2D(uScene, p).rgb;
  if (uFxOn > 0.5) { vec4 f = texture2D(uFx, vUv); c = c * (1.0 - f.a) + f.rgb; }
  // Levels: a black point and a gamma, so the shade goes near-black and the lit stays bright.
  c = pow(clamp((c - uBlack) / (1.0 - uBlack), 0.0, 1.0), vec3(uGamma));
  c += texture2D(uBloom, vUv).rgb * uBloomStrength;
  gl_FragColor = vec4(min(c, vec3(1.0)), 1.0);
}`,W_=`
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
}`;function ts(n,e,t,i=!1){const s=new Fn(Math.max(1,n),Math.max(1,e),{minFilter:t,magFilter:t,depthBuffer:i,generateMipmaps:!1});return s.texture.colorSpace=Yn,s}class V_{constructor(e,t){this.renderer=e,this.tuning=t,this.scene=ts(1,1,zt,!0),this.scene.depthTexture=new Ys(1,1),this.fx.texture.format=Cn;const i=(s,r)=>new yt({vertexShader:k_,fragmentShader:s,uniforms:r,depthTest:!1,depthWrite:!1});this.mats={bright:i(z_,{uScene:{value:null},uThreshold:{value:.6}}),blur:i(G_,{uSrc:{value:null},uStep:{value:new We}}),composite:i(H_,{uScene:{value:null},uBloom:{value:null},uLow:{value:new We},uBloomStrength:{value:0},uBlack:{value:0},uGamma:{value:1},uFx:{value:null},uFxOn:{value:0}}),tilt:i(W_,{uSrc:{value:null},uTexel:{value:new We},uDir:{value:new We},uStrength:{value:0},uBand:{value:.4},uCentre:{value:.5}})},this.quad=new $t(new Dn(2,2),this.mats.composite),this.quad.frustumCulled=!1}renderer;tuning;scene;bright=ts(1,1,zt);bloomB=ts(1,1,zt);a=ts(1,1,zt);b=ts(1,1,zt);fx=ts(1,1,zt);fxB=ts(1,1,zt);fxScene=null;quad;cam=new pc(-1,1,1,-1,0,1);mats;low=new We(1,1);out=new We(1,1);get fullResolution(){return this.tuning.tiltShift.on&&this.tuning.tiltShift.where==="after"}get lowSize(){return this.low}resize(e,t,i,s){this.low.set(e,t),this.fx.setSize(e,t),this.fxB.setSize(e,t),this.out.set(i,s),this.scene.setSize(e,t);const r=Math.max(1,Math.round(e/2)),a=Math.max(1,Math.round(t/2));this.bright.setSize(r,a),this.bloomB.setSize(r,a);const o=this.fullResolution?i:e,h=this.fullResolution?s:t;this.a.setSize(o,h),this.b.setSize(o,h)}pass(e,t,i){const s=this.mats[e];i(s.uniforms),this.quad.material=s,this.renderer.setRenderTarget(t),this.renderer.render(this.quad,this.cam)}render(e,t){const i=this.renderer,s=this.tuning;i.setRenderTarget(this.scene),i.render(e,t);const r=s.bloom.on&&s.bloom.strength>0;if(r){const d=this.bright.width,p=this.bright.height;this.pass("bright",this.bright,g=>{g.uScene.value=this.scene.texture,g.uThreshold.value=s.bloom.threshold});for(let g=0;g<2;g++)this.pass("blur",this.bloomB,v=>{v.uSrc.value=this.bright.texture,v.uStep.value.set(1/d,0)}),this.pass("blur",this.bright,v=>{v.uSrc.value=this.bloomB.texture,v.uStep.value.set(0,1/p)})}const a=!!this.fxScene;if(this.fxScene){const d=i.getClearColor(new tt),p=i.getClearAlpha();i.setRenderTarget(this.fx),i.setClearColor(0,0),i.clear(),i.render(this.fxScene,t),i.setClearColor(d,p);const g=this.fx.width,v=this.fx.height;this.pass("blur",this.fxB,x=>{x.uSrc.value=this.fx.texture,x.uStep.value.set(.6/g,0)}),this.pass("blur",this.fx,x=>{x.uSrc.value=this.fxB.texture,x.uStep.value.set(0,.6/v)})}const o=s.tiltShift.on&&s.tiltShift.strength>0;if(this.pass("composite",o?this.a:null,d=>{d.uScene.value=this.scene.texture,d.uBloom.value=this.bright.texture,d.uLow.value.copy(this.low),d.uBloomStrength.value=r?s.bloom.strength:0,d.uBlack.value=s.tone.black,d.uGamma.value=s.tone.gamma,d.uFx.value=this.fx.texture,d.uFxOn.value=a?1:0}),!o)return;const h=this.a.width,l=this.a.height,u=this.fullResolution?this.out.y/this.low.y:1,f=d=>{d.uTexel.value.set(1/h,1/l),d.uStrength.value=s.tiltShift.strength*u,d.uBand.value=s.tiltShift.band,d.uCentre.value=1-s.tiltShift.centre};this.pass("tilt",this.b,d=>{f(d),d.uSrc.value=this.a.texture,d.uDir.value.set(1,0)}),this.pass("tilt",null,d=>{f(d),d.uSrc.value=this.b.texture,d.uDir.value.set(0,1)})}}const Y_=`
uniform vec3 uRight, uUp;
uniform float uSize;
varying vec2 vUv;
void main() {
  vUv = uv * 2.0 - 1.0;
  vec3 w = (modelMatrix * vec4(0.0, 0.0, 0.0, 1.0)).xyz + (uRight * position.x + uUp * position.y) * uSize;
  gl_Position = projectionMatrix * viewMatrix * vec4(w, 1.0);
}`,X_=`
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
}`,K_=`
uniform vec3 uTint;
void main() {
  if (mod(floor(gl_FragCoord.y), 3.0) > 0.5) discard; // faint: a dotted thread of light
  gl_FragColor = vec4(uTint, 1.0);
}`,q_=`
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
}`,$_=`
uniform vec3 uTint;
varying float vA;
void main() { if (vA < 0.15) discard; gl_FragColor = vec4(uTint * (0.5 + vA), 1.0); }`;class Z_{constructor(e,t,i,s){this.tuning=t;const r=t.dancefloor,a=e.dancefloor;this.centre=new X(a.x,0,a.z);const o=new X(..._e(r.circleHue2,.4,1).map(x=>x/255));this.ballMat=new yt({vertexShader:Y_,fragmentShader:X_,uniforms:{...i,uSize:{value:r.discoSize/2},uTime:lt.uTime,uSpin:{value:r.spin/60*Math.PI*2},uPixels:{value:Math.max(6,Math.round(r.discoSize/s))},uTint:{value:o}}}),this.ball=new $t(new Dn(2,2),this.ballMat),this.ball.frustumCulled=!1;const h=60;this.beam=new $t(new Dn(s,h).translate(0,h/2,0),new yt({fragmentShader:K_,uniforms:{uTint:{value:o.clone().multiplyScalar(.5)}}})),this.beam.frustumCulled=!1;const l=r.motes,u=[],f=[];for(let x=0;x<l.count;x++){const m=b=>{const A=Math.sin(x*12.9898+b*78.233)*43758.5453;return A-Math.floor(A)},M=m(1)*Math.PI*2,S=Math.sqrt(m(2))*a.radius*l.column;u.push(a.x+Math.cos(M)*S,.3,a.z+Math.sin(M)*S),f.push(m(3),l.speed*(.6+m(4)*.8),.4+m(5)*1.2,0)}const d=new jt;d.setAttribute("position",new Nt(u,3)),d.setAttribute("aMote",new Nt(f,4));const p=_e(r.circleHue,.55,1);this.motes=new Da(d,new yt({vertexShader:q_,fragmentShader:$_,uniforms:{uTime:lt.uTime,uRise:{value:l.rise},uTint:{value:new X(p[0]/255,p[1]/255,p[2]/255)}},transparent:!0,depthWrite:!1,blending:hs})),this.motes.frustumCulled=!1;const g=_e(r.circleHue,.7,1);this.lightRgb=new X(g[0]/255,g[1]/255,g[2]/255);const v=lt;v.uDiscoParams.value.set(r.spin/60*Math.PI*2,r.specks,r.speckBrightness,r.speckReach),v.uDiscoColour.value.copy(o)}tuning;ball;beam;motes;ballMat;lightRgb;centre;update(e,t){const i=this.tuning.dancefloor,s=.75+.25*Math.sin(e*i.pulse*Math.PI*2);t.setCircle(i.circleHue,i.circleHue2,.7+.3*s,e*i.runeSpeed/60*Math.PI*2);const r=i.discoHeight+Math.sin(e*.8)*.3;return this.ball.position.set(this.centre.x,r,this.centre.z),this.beam.position.set(this.centre.x,r+i.discoSize/2,this.centre.z),lt.uDisco.value.set(this.centre.x,r,this.centre.z,1),{x:this.centre.x,y:2.5,z:this.centre.z,reach:i.lightReach,rgb:this.lightRgb,strength:i.lightStrength*s}}}const J_=[new X(.25,.85,1),new X(.7,.4,1),new X(1,.65,.2)];class Q_{constructor(e,t){this.atlas=e,this.metresPerPixel=t}atlas;metresPerPixel;homeSoundsystem(e){const t=e.map.dancefloor;return{x:t.x+t.radius+5,z:t.z+3,variant:0,at:-1/0,from:null}}update(e,t,i,s){const r=e.tuning.party,a=[],o=[],h=[],l=[],u=[this.homeSoundsystem(e)];for(const[,f]of e.party.areas){if(!f.soundsystem)continue;const d=f.from?e.map.siteOf(f.from[0],f.from[1]):null;u.push({...f.soundsystem,at:f.at,from:d})}for(const f of u){const d=r.transition>0?Math.min(1,(t-f.at)/r.transition):1,p=this.atlas.frames[f.variant*3+Math.floor(t*6)%3],g=p.h*this.metresPerPixel,v=Jt((d-.55)/.45);if(d<1&&f.from){const m=(f.from.x+f.x)/2,M=(f.from.z+f.z)/2,S=Math.hypot(f.x-m,f.z-M)*1.6;h.push({x:m,z:M,radius:d*S,strength:1-Jt((d-.8)/.2)})}if(v>0&&i(f.x,f.z,p.w*this.metresPerPixel,g)){const m=Ve(Math.round(f.x*10),Math.round(f.z*10),911)<.5;a.push({x:f.x,y:-(1-v)*g,z:f.z,frame:p,flip:m,fresh:s(f.x,f.z,g)})}d>=1&&l.push({x:f.x,y:g*.85,z:f.z,seed:Math.floor(Math.abs(f.x*7.3+f.z*13.1))%1e5,ready:f.at+r.transition});const x=.85+.15*Math.sin(t*8);v>0&&o.push({x:f.x,y:3,z:f.z,reach:r.lightReach,rgb:J_[f.variant%3],strength:r.lightStrength*x*v*(1+(1-d)*2)})}return{items:a,lights:o,sweeps:h,playing:l}}}function j_(n,e,t,i){const s=(a,o)=>Math.abs(a[0]-o[0])<1e-6&&Math.abs(a[1]-o[1])<1e-6;if(s(n,t)||s(n,i)||s(e,t)||s(e,i))return!1;const r=(a,o,h)=>Math.sign((o[0]-a[0])*(h[1]-a[1])-(o[1]-a[1])*(h[0]-a[0]));return r(n,e,t)*r(n,e,i)<0&&r(t,i,n)*r(t,i,e)<0}function eb(n,e,t){const i=n.tuning.stringLights,s=n.siteOf(t[0],t[1]),r=Wi(n.seed*53+t[0]*1031+t[1]*7+509),a=b=>{const A=n.areaAt(b.x,b.z).cell;return A[0]===t[0]&&A[1]===t[1]},o=b=>Ve(Math.round(b.x*10),Math.round(b.z*10),n.seed+501),h=e.treesNear(s.x,s.z,n.areaSize*1.3).filter(a).sort((b,A)=>o(b)-o(A)),l=new Map,u=new Set,f=[],d=[],p=Math.cos(i.coneAngle*Math.PI/180),g=(b,A=0)=>(l.get(b)??0)+1<=(u.has(b)?3:2)-A,v=(b,A)=>f.some(w=>j_([b.x,b.z],[A.x,A.z],[w.ax,w.az],[w.bx,w.bz])),x=(b,A)=>{f.push({ax:b.x,az:b.z,bx:A.x,bz:A.z,seed:Math.floor(Ve(Math.round(b.x*10),Math.round(A.z*10),n.seed+503)*1e6)}),l.set(b,(l.get(b)??0)+1),l.set(A,(l.get(A)??0)+1)},m=(b,A,w)=>{let L=b,_=A;const E=[b];for(let P=0;P<w;P++){const T=[];for(const N of h){if(N===L||!g(N))continue;const F=N.x-L.x,H=N.z-L.z,W=Math.hypot(F,H);if(!(W<i.spanMin||W>i.spanMax)&&!(_&&(F*_[0]+H*_[1])/W<p)&&!v(L,N)&&(T.push({b:N,d:W}),T.length>=16))break}if(!T.length)break;T.sort((N,F)=>F.d-N.d);const{b:D,d:U}=T[Math.floor(r()*Math.min(4,T.length))];x(L,D),_=[(D.x-L.x)/U,(D.z-L.z)/U],E.push(D),L=D}return E},M=i.runsPerArea[0]+Math.floor(r()*(i.runsPerArea[1]-i.runsPerArea[0]+1)),S=[];for(const b of h){if(d.length>=M)break;if(l.has(b)||d.some(L=>Math.hypot(L.x-b.x,L.z-b.z)<i.spread))continue;d.push(b);const A=i.spansPerRun[0]+Math.floor(r()*(i.spansPerRun[1]-i.spansPerRun[0]+1)),w=m(b,null,A);for(let L=1;L<w.length-1;L++){if(r()>=i.junctionChance)continue;const _=w[L],E=w[L+1],P=E.x-_.x,T=E.z-_.z,D=Math.hypot(P,T),U=r()<.5?1:-1;u.add(_),S.push({from:_,heading:[-T/D*U,P/D*U]})}}for(const b of S)m(b.from,b.heading,i.spansPerRun[0]+Math.floor(r()*3));return f}const Gt={uRight:{value:new X(1,0,0)},uUp:{value:new X(0,1,0)},uFacing:{value:new X(0,0,1)},uTopFade:{value:0},uCutout:{value:new it(0,0,0,1)},uDebugCull:{value:0},uRes:{value:new We(1,1)},uWitch:{value:new it(0,0,0,0)},uWitchDepth:{value:0},uOcc:{value:new it(.38,6,2.5,1)},uParty:{value:Array.from({length:16},()=>new it)},uPartyCol:{value:Array.from({length:16},()=>new X)},uPartyCount:{value:0},uUplight:{value:new it}},ko=`
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
  // Eased over a few metres of depth and of height, so nothing snaps into the fade as she moves.
  vFront = smoothstep(0.0, 3.0, uWitchDepth - 0.5 + (viewMatrix * vec4(iPos, 1.0)).z) * smoothstep(uOcc.z * 0.7, uOcc.z * 1.3, iSize.y);
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
`,zo=`
uniform sampler2D uAlbedo, uNormal;
uniform vec3 uRight, uUp, uFacing;
uniform float uTopFade, uUnlit;
uniform vec4 uCutout;
uniform float uDebugCull, uIsScenery;
uniform vec4 uWitch, uOcc, uSilhouette;
uniform float uFadePass;
uniform vec4 uParty[16];
uniform vec3 uPartyCol[16];
uniform int uPartyCount;
uniform vec4 uUplight;
varying vec2 vUv;
varying vec3 vWorld;
varying vec3 vFlags;
varying float vFront;
${Ai}
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
  float occl = uOcc.w * vFront * (1.0 - smoothstep(0.3, 1.0 + uOcc.y, e));
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
    float k = sceneryFade(vWorld);
    if (k < 0.004) discard;
    gl_FragColor.a *= k;
  }
}
`;class Ls{constructor(e,t,i={}){this.atlas=e,this.metresPerPixel=t;const s=new Dn(1,1);s.translate(0,.5,0),this.geo=new mc,this.geo.index=s.index,this.geo.setAttribute("position",s.getAttribute("position")),this.geo.setAttribute("uv",s.getAttribute("uv")),this.pos=this.size=this.uvs=this.flags=void 0,this.grow(64);const r=h=>({...lt,...Gt,uAlbedo:{value:e.albedo},uNormal:{value:e.normal},uUnlit:{value:i.unlit?1:0},uIsScenery:{value:i.scenery?1:0},uFadePass:{value:0},uSilhouette:{value:new it(0,0,0,0)},...h}),a=i.scenery?{blending:Wa,blendSrc:ec,blendDst:tc}:{},o=new yt({vertexShader:ko,fragmentShader:zo,uniforms:r({}),depthTest:!i.onTop,depthWrite:!i.onTop,...a});if(this.mesh=new $t(this.geo,o),this.mesh.frustumCulled=!1,i.onTop&&(this.mesh.renderOrder=10),i.scenery&&(this.mesh.renderOrder=.5),this.meshes=[this.mesh],i.fade){const h=new $t(this.geo,new yt({vertexShader:ko,fragmentShader:zo,uniforms:r({uFadePass:{value:1}}),transparent:!0,depthWrite:!1}));h.frustumCulled=!1,h.renderOrder=11,this.meshes.push(h)}if(i.silhouette){const h=i.silhouette.colour,l=new $t(this.geo,new yt({vertexShader:ko,fragmentShader:zo,uniforms:r({uSilhouette:{value:new it(h.x,h.y,h.z,i.silhouette.opacity)}}),transparent:!0,depthWrite:!1,depthFunc:ya}));l.frustumCulled=!1,l.renderOrder=12,this.meshes.push(l)}}atlas;metresPerPixel;mesh;meshes;geo;pos;size;uvs;flags;capacity=0;count=0;grow(e){const t=Math.max(e,this.capacity*2);this.geo.dispose();const i=(s,r)=>{const a=new dc(new Float32Array(t*s),s);return a.setUsage(Bs),r&&a.array.set(r.array),a};this.pos=i(3,this.pos),this.size=i(2,this.size),this.uvs=i(4,this.uvs),this.flags=i(3,this.flags),this.geo.setAttribute("iPos",this.pos),this.geo.setAttribute("iSize",this.size),this.geo.setAttribute("iUv",this.uvs),this.geo.setAttribute("iFlags",this.flags),this.capacity=t}items=[];set(e){this.items=e,e.length>this.capacity&&this.grow(e.length);const t=this.pos.array,i=this.size.array,s=this.uvs.array,r=this.flags.array;e.forEach((a,o)=>{t[o*3]=a.x,t[o*3+1]=a.y,t[o*3+2]=a.z;const h=a.scale??1;i[o*2]=a.frame.w*this.metresPerPixel*h,i[o*2+1]=a.frame.h*this.metresPerPixel*h,s.set(a.frame.uv,o*4),r[o*3]=a.flip?1:0,r[o*3+1]=a.top?1:0,r[o*3+2]=a.fresh?1:0});for(const a of[this.pos,this.size,this.uvs,this.flags])a.needsUpdate=!0;this.count=e.length,this.geo.instanceCount=e.length;for(const a of this.meshes)a.visible=e.length>0}get dropped(){const e=this.geo._maxInstanceCount;return e===void 0||!this.mesh.visible?0:Math.max(0,this.count-e)}dispose(){this.geo.dispose(),this.mesh.material.dispose(),this.atlas.albedo.dispose(),this.atlas.normal.dispose()}}const tb=`
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
}`,nb=`
uniform float uTwinkle, uChase;
varying vec3 vColour;
varying vec3 vWorld;
varying float vOn;
varying vec2 vB;
${Ai}
void main() {
  if (vOn < 0.5 || sceneryFade(vWorld) < 0.5) discard; // scenery: gone past the scenery budget's edge
  float b = 1.0 - uTwinkle * 0.5 * (1.0 + sin(uTime * (1.3 + vB.x) + vB.x * 40.0));
  if (fract((vB.y - uTime * uChase) / 60.0) < 0.06) b = 1.4;  // a chase running along now and then
  gl_FragColor = vec4(haze(vColour * b * 1.6, vWorld), 1.0); // bright enough to bloom
}`,ib=`
attribute float aSway;
uniform float uWind, uTime;
varying vec3 vWorld;
void main() {
  vec3 p = position;
  p.x += sin(uTime * uWind + aSway * 6.0) * 0.18 * fract(aSway * 7.0);
  vWorld = p;
  gl_Position = projectionMatrix * viewMatrix * vec4(p, 1.0);
}`,sb=`
varying vec3 vWorld;
${Ai}
void main() {
  if (sceneryFade(vWorld) < 0.5) discard;
  gl_FragColor = vec4(haze(vec3(0.03, 0.025, 0.04), vWorld), 1.0);
}`,rb=`
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
}`,ab=`
uniform vec3 uMoteColour;
varying float vA;
varying vec3 vWorld;
${Ai}
void main() {
  if (vA < 0.3) discard;
  gl_FragColor = vec4(haze(uMoteColour * (0.6 + 0.6 * vA), vWorld), 1.0);
}`;class ob{constructor(e,t){this.scene=e,this.game=t;const i=t.tuning.stringLights;this.palette=i.palette.map(r=>new tt(r));const s={...lt,uWind:{value:t.tuning.canopyShadow.wind*1.5}};this.bulbMat=new yt({vertexShader:tb,fragmentShader:nb,uniforms:{...s,uRes:Gt.uRes,uNear:{value:240},uTwinkle:{value:i.twinkle},uChase:{value:i.chaseSpeed}}}),this.wireMat=new yt({vertexShader:ib,fragmentShader:sb,uniforms:s}),this.moteMat=new yt({vertexShader:rb,fragmentShader:ab,uniforms:{...lt,uMoteColour:{value:new tt(1,.85,1)},uRise:{value:t.tuning.party.motes.to-t.tuning.party.motes.from}},transparent:!0,depthWrite:!1,blending:hs})}scene;game;built=new Map;palette;bulbMat;wireMat;moteMat;build(e,t,i,s,r){const a=this.game.tuning.stringLights,o=a.height,h=[],l=[],u=[],f=[],d=[];e.forEach((_,E)=>{const P=Math.hypot(_.bx-_.ax,_.bz-_.az),T=Math.max(2,Math.round(P/a.bulbSpacing)),D=U=>[_.ax+(_.bx-_.ax)*U,o-a.sag*4*U*(1-U)*(P/8),_.az+(_.bz-_.az)*U];for(let U=0;U<=16;U++){const N=D(U/16),F=D((U+1)/16);U<16&&(f.push(...N,...F),d.push(E+U/16,E+(U+1)/16))}for(let U=1;U<T;U++){const N=U/T,F=D(N),H=this.palette[(_.seed+U)%this.palette.length];h.push(...F),l.push(H.r,H.g,H.b),u.push((_.seed*13+U*7)%100/100,E*40+U,t(F[0],F[2])+U*.03,4*N*(1-N))}});const p=new fr,g=new jt;g.setAttribute("position",new Nt(h,3)),g.setAttribute("aColour",new Nt(l,3)),g.setAttribute("aBulb",new Nt(u,4));const v=new jt;v.setAttribute("position",new Nt(f,3)),v.setAttribute("aSway",new Nt(d,1)),p.add(new fc(v,this.wireMat),new Da(g,this.bulbMat));const x=this.game.tuning.party.motes,m=this.game.map,M=[],S=[],b=m.areaSize*1.1,A=Math.round(Math.PI*b*b/400*x.perPatch);for(let _=0;_<A;_++){const E=F=>{const H=Math.sin(s*12.9898+_*78.233+F*37.719)*43758.5453;return H-Math.floor(H)},P=E(1)*Math.PI*2,T=Math.sqrt(E(2))*b,D=i.x+Math.cos(P)*T,U=i.z+Math.sin(P)*T,N=m.areaAt(D,U).cell;N[0]!==r[0]||N[1]!==r[1]||(M.push(D,x.from,U),S.push(E(3),x.speed*(.6+E(4)*.8),.3+E(5)*.8,t(D,U)))}const w=new jt;w.setAttribute("position",new Nt(M,3)),w.setAttribute("aMote",new Nt(S,4));const L=new Da(w,this.moteMat);return L.frustumCulled=!1,p.add(L),p.traverse(_=>{_.frustumCulled=!1}),p}update(){const e=this.game;if(!e.tuning.stringLights.on)return;this.bulbMat.depthTest=e.witch.lift<.5;let i=0;for(const[s,r]of e.party.areas){let a=this.built.get(s);if(!a){if(i++>=2)break;const o=eb(e.map,e.forest,r.cell),h=e.map.siteOf(r.cell[0],r.cell[1]),l=r.from?e.map.siteOf(r.from[0],r.from[1]):null,u=l?(l.x+h.x)/2:h.x,f=l?(l.z+h.z)/2:h.z,d=l?Math.hypot(h.x-u,h.z-f)*1.6:1,p=e.tuning.party.transition,g=(v,x)=>r.wave===0?-1:r.at+Math.min(1,Math.hypot(v-u,x-f)/d)*p;a={lines:o,group:this.build(o,g,h,r.cell[0]*131+r.cell[1]*17+e.seed,r.cell),on:r.wave===0?-1:r.at},this.scene.add(a.group),this.built.set(s,a)}}}clear(){for(const[,e]of this.built)this.scene.remove(e.group);this.built.clear()}}const Kt=32,Ps=16,lb=`
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
}`,cb=`
uniform sampler2D uGlyphs;
varying vec2 vUv, vP;
varying vec4 vCol;
varying float vDraw;
varying vec3 vWorld;
${Ai}
void main() {
  float a = texture2D(uGlyphs, vUv).a * vCol.a;
  // Written on: revealed clockwise from the top as vDraw goes 0 to 1.
  float ang = fract(atan(vP.x, vP.y) / 6.2831853 + 1.0);
  if (ang > vDraw || a < 0.02) discard;
  gl_FragColor = vec4(haze(vCol.rgb * a, vWorld), 1.0);
}`;class Zh{mesh;geo=new mc;cap=0;n=0;pos;size;uv;col;draw;constructor(e){const t=new Dn(1,1);this.geo.index=t.index,this.geo.setAttribute("position",t.getAttribute("position")),this.geo.setAttribute("uv",t.getAttribute("uv")),this.grow(256),this.mesh=new $t(this.geo,e),this.mesh.frustumCulled=!1,this.mesh.renderOrder=3}grow(e){const t=(s,r)=>{const a=new Float32Array(e*r);return s&&a.set(s),a};this.pos=t(this.pos,3),this.size=t(this.size,1),this.uv=t(this.uv,4),this.col=t(this.col,4),this.draw=t(this.draw,1),this.cap=e,this.geo.dispose();const i=(s,r,a)=>this.geo.setAttribute(s,new dc(r,a).setUsage(Bs));i("iPos",this.pos,3),i("iSize",this.size,1),i("iUv",this.uv,4),i("iCol",this.col,4),i("iDraw",this.draw,1)}begin(){this.n=0}add(e,t,i,s,r,a,o,h,l,u=1){this.n>=this.cap&&this.grow(this.cap*2);const f=this.n++;this.pos.set([e,t,i],f*3),this.size[f]=s,this.uv.set(r,f*4),this.col.set([a,o,h,l],f*4),this.draw[f]=u}end(){this.geo.instanceCount=this.n;for(const e of["iPos","iSize","iUv","iCol","iDraw"])this.geo.getAttribute(e).needsUpdate=!0}}const hb=["🎉","🎈","💃","🎊","🥳","😛","🍉","🍒","🍷","🍸","🍹","🥂","🍺","😁","😆"],ub=[["😴","🫩","🥱","💼"],["😐","😐","🥱"],["😮","🤭","🫢","😛"],["🙂","🍷","🍺","😁"],["🥳","🎉","🎈","😆","🥂","💃"]];class db{constructor(e,t){this.game=t,this.canvas.width=this.canvas.height=Kt*Ps;const i=this.canvas.getContext("2d"),s=i.createRadialGradient(Kt/2,Kt/2,0,Kt/2,Kt/2,Kt/2);s.addColorStop(0,"rgba(255,255,255,1)"),s.addColorStop(.35,"rgba(255,255,255,.55)"),s.addColorStop(1,"rgba(255,255,255,0)"),i.fillStyle=s,i.fillRect(0,0,Kt,Kt),this.tex=new t1(this.canvas),this.tex.magFilter=Wt,this.tex.minFilter=Wt,this.tex.generateMipmaps=!1;const r=a=>new yt({vertexShader:lb,fragmentShader:cb,uniforms:{...lt,uRight:Gt.uRight,uUp:Gt.uUp,uFlat:{value:a},uGlyphs:{value:this.tex}},transparent:!0,depthWrite:!1,blending:hs});this.standing=new Zh(r(0)),this.flat=new Zh(r(1)),e.add(this.standing.mesh,this.flat.mesh)}game;canvas=document.createElement("canvas");tex;slots=new Map;colours=new Map;standing;flat;fizzles=[];bursts=[];chain=[];lastTime=0;bubbleWitch=document.getElementById("bubble-witch");bubbleCreature=document.getElementById("bubble-creature");v=new X;slotOf(e,t=0){const i=`${e}:${t}`;let s=this.slots.get(i);if(s!==void 0)return s;s=this.slots.size+1,this.slots.set(i,s);const r=this.canvas.getContext("2d"),a=s%Ps*Kt,o=Math.floor(s/Ps)*Kt;r.clearRect(a,o,Kt,Kt),zf(r,e,{x:a+1,y:o+1,size:Kt-2,level:t,colour:[255,255,255],glow:!1});const h=r.getImageData(a,o,Kt,Kt);for(let u=3;u<h.data.length;u+=4)h.data[u]=h.data[u]>90?255:0;r.putImageData(h,a,o);const l=gr(e);return this.colours.set(e,new tt(l[0]/255,l[1]/255,l[2]/255)),this.tex.needsUpdate=!0,s}uv(e){const t=Kt*Ps,i=e%Ps*Kt,s=Math.floor(e/Ps)*Kt;return[i/t,1-s/t,(i+Kt)/t,1-(s+Kt)/t]}update(e,t,i,s,r){const a=this.game,o=a.leash,h=a.tuning,l=a.witch,u=h.bond,f=h.leash,d=this.uv(0);this.standing.begin(),this.flat.begin();for(const w of o.events)w.kind==="fizzled"&&this.fizzles.push({x:w.x,z:w.z,at:e}),w.kind==="invited"&&this.bursts.push({x:w.x,z:w.z,at:e,seed:w.id});this.fizzles=this.fizzles.filter(w=>e-w.at<.7),this.bursts=this.bursts.filter(w=>e-w.at<.9);for(const w of this.bursts){const L=(e-w.at)/.9;for(let _=0;_<28;_++){const E=Ve(w.seed,_,3)*Math.PI*2,P=2+Ve(w.seed,_,5)*3,T=2+Ve(w.seed,_,7)*3,D=[[1,.4,.8],[.3,.95,1],[1,.9,.3],[.6,1,.4],[1,1,1]][_%5];this.standing.add(w.x+Math.cos(E)*P*L,.6+T*L-4*L*L,w.z+Math.sin(E)*P*L,.3,d,D[0],D[1],D[2],1-L)}}const p=(w,L,_)=>{const E=a.creatures[w],P=28,T=_?1:.45;for(let D=0;D<P;D++){const U=Math.PI/2-D/P*Math.PI*2,N=D/P<L;!_&&!N||this.flat.add(E.x+Math.cos(U)*1.5,0,E.z+Math.sin(U)*1.1,.35,d,1,N?.6:.9,N?.9:1,(N?.9:.18)*T)}};o.talk&&p(o.talk.id,o.talk.refused?0:Math.min(1,o.talk.t/o.talk.total),!0);for(const[w,L]of o.progress)o.talk?.id!==w&&p(w,Math.min(1,L/yu(a.creatures[w],h)),!1);const g=h.stack,v=Math.min(.1,Math.max(0,e-this.lastTime)),x=new Map;for(this.lastTime=e;this.chain.length<o.stack.length;)this.chain.push({x:0,z:0,vx:0,vz:0});let m={x:0,z:0},M=r;for(let w=o.stack.length-1;w>=0;w--){const L=o.stack[w],_=a.creatures[L],E=o.stack.length-1-w,P=this.chain[E],T=(2+_.level*.4)*g.scale,D=Math.sin(e*1.7+E*.9)*g.idleSway*(1+E*.5),U=m.x-l.vx*g.trail+D,N=m.z-l.vz*g.trail;P.vx+=((U-P.x)*g.stiffness-P.vx*g.damping)*v,P.vz+=((N-P.z)*g.stiffness-P.vz*g.damping)*v,P.x+=P.vx*v,P.z+=P.vz*v,m=P,M+=(E===0?g.offset*T:g.gap*T)+T/2;const F=new X(l.x+P.x,M,l.z+P.z);M+=T/2,x.set(L,F);const H=(this.slotOf(_.species,_.level),this.colours.get(_.species));this.standing.add(F.x,F.y,F.z,T,this.uv(this.slotOf(_.species,_.level)),H.r,H.g,H.b,1)}for(const w of o.placed){const L=a.creatures[w.id],_=this.slotOf(L.species,L.level),E=this.colours.get(L.species),P=.8+.2*Math.sin(e*2+w.id);this.flat.add(w.x,0,w.z,3+L.level*.8,this.uv(_),E.r*P,E.g*P,E.b*P,1,Math.min(1,(e-w.at)/.8)),this.flat.add(w.x,0,w.z,5,d,E.r,E.g,E.b,.25)}const S=h.sigilProjection,b=l.lift*l.lift*(3-2*l.lift);if(b>.01)for(const w of o.placed){const L=a.creatures[w.id],_=this.colours.get(L.species),E=h.treetopHeight-4+S.height,P=.85+.15*Math.sin(e*1.3+w.id);this.flat.add(w.x,E,w.z,(3+L.level*.8)*S.size,this.uv(this.slotOf(L.species,L.level)),_.r,_.g,_.b,S.opacity*b*P);for(let T=1;T<E;T+=1.5)this.standing.add(w.x,T,w.z,.3,d,_.r,_.g,_.b,S.beam*b*P*(.6+.4*Math.sin(T*.8-e*3)))}if(l.mode==="ground"&&o.stack.length&&!o.placed.some(w=>Math.hypot(w.x-l.x,w.z-l.z)<=f.pickRadius)){const w=a.creatures[o.stack[o.stack.length-1]],L=this.colours.get(w.species),_=wu(o,l.x,l.z,h);this.flat.add(l.x,0,l.z,3+w.level*.8,this.uv(this.slotOf(w.species,w.level)),_?1:L.r,_?.1:L.g,_?.1:L.b,.22)}for(const w of this.fizzles){const L=1-(e-w.at)/.7;this.flat.add(w.x,0,w.z,3*(1+(1-L)*.6),d,1,.15,.1,L)}const A=[...o.stack,...o.placed.map(w=>w.id)];for(const w of A){const L=a.creatures[w],_=this.colours.get(L.species);if(!_)continue;const E=T0(o,w,l.x,l.z);u.rim&&this.flat.add(L.x,0,L.z,1.8,d,_.r,_.g,_.b,.35);const P=x.get(w)??new X(E.x,.2,E.z);if(u.sparks){const D=Math.max(.5,u.sparkEvery),U=(e+w*.618%1*D)%D;if(U<.7){const N=U/.7;this.standing.add(P.x+(L.x-P.x)*N,P.y+(.6-P.y)*N+Math.sin(N*Math.PI)*1.2,P.z+(L.z-P.z)*N,.35,d,_.r,_.g,_.b,1)}}const T=Math.hypot(L.x-E.x,L.z-E.z);if(u.thread&&T>f.length*.85){const D=Math.min(1,(T-f.length*.85)/f.length),U=Math.min(60,Math.floor(T/1.2));for(let N=1;N<U;N++){const F=(N+e*2%1)/U;this.standing.add(P.x+(L.x-P.x)*F,P.y+(.5-P.y)*F,P.z+(L.z-P.z)*F,.22,d,_.r,_.g,_.b,.25+.75*D)}}}this.standing.end(),this.flat.end(),this.bubbles(e,t,i,s)}bubbles(e,t,i,s){const r=this.game,a=r.leash.talk,o=this.bubbleWitch,h=this.bubbleCreature;if(!o||!h)return;const l=r.witch,u=(S,b,A,w)=>{this.v.set(b,A,w).project(t),S.style.left=`${(this.v.x+1)/2*i}px`,S.style.top=`${(1-this.v.y)/2*s}px`},f=h.querySelector("span"),d=h.querySelector(".bar");if(!a){d.style.display="none",h.classList.remove("on"),o.classList.toggle("on",r.leash.held),r.leash.held&&(o.textContent=r.leash.heldInAir?"land to talk":"…",u(o,l.x-1.2,Ws(l,r.tuning)+2.2,l.z));return}const p=r.creatures[a.id];if(u(o,l.x-1.2,Ws(l,r.tuning)+2.2,l.z),u(h,p.x,1.2+p.level*.8,p.z),a.refused){o.classList.remove("on"),f.textContent=Ve(a.id,1,9)<.5?"😒":"🙄",d.style.display="none",h.classList.toggle("on",a.t<1.6),h.style.opacity="1";return}d.style.display="";const g=Math.floor(a.t/A0(p,r.tuning)),v=Math.min(1,a.t/a.total),x=(S,b)=>S[Math.floor(Ve(a.id,b,5)*S.length)%S.length],m=[4,2,0][Math.min(2,p.level)],M=Math.round(m+(4-m)*v);o.textContent=x(hb,g-g%2),o.classList.toggle("on",g%2===0),f.textContent=g>=1?x(ub[M],g-(g+1)%2):"…",d.querySelector("i").style.width=`${v*100}%`,h.classList.add("on"),h.style.opacity=g%2===1?"1":"0.6"}}const fb=[1,3,5,7,9],ud=n=>{const e=60/Math.max(1,n.beat.bpm);return{beat:e,bar:e*4}};function pb(n,e,t,i){const s=i.lasers,{beat:r,bar:a}=ud(i),o=a*Math.max(1,s.blockBars),h=Math.floor(n/o),l=n-h*o,u=Vi(s.duty*t,0,1),d=Ve(e,h,311)<u?Jt(l/Math.max(.001,s.fadeIn))*Jt((o-l)/Math.max(.001,s.fadeOut)):0,p=Math.floor(l/a),g=fb.filter(b=>b<=s.maxCount),v=g[Math.floor(Ve(e,h*64+p,313)*g.length)%g.length]??1,x=e%97*.37,m=Math.sin(2*Math.PI*n/(r*s.sweepBeats)+x)*(s.sweep*Math.PI)/180,M=.55+.45*Math.sin(2*Math.PI*n/(a*s.openBars)+x*2),S=((e%1e3*.0137+n/(a*8))%1+1)%1;return{on:d,count:v,sweep:m,open:M,hue:S}}const mb=`
attribute vec4 aCol; // rgb, alpha
attribute float aU;  // 0 at the source, 1 at the far end
varying vec4 vCol;
varying float vU;
void main() { vCol = aCol; vU = aU; gl_Position = projectionMatrix * viewMatrix * vec4(position, 1.0); }`,gb=`
varying vec4 vCol;
varying float vU;
void main() { float a = vCol.a * pow(1.0 - vU, 0.6); gl_FragColor = vec4(vCol.rgb * a, 1.0); }`,ur=[[.3,.95,1],[.35,.55,1],[.7,.4,1],[1,.3,.85],[.45,1,.55]],xb=n=>{const e=(n%1+1)%1*ur.length,t=Math.floor(e),i=e-t,s=ur[t%ur.length],r=ur[(t+1)%ur.length];return[s[0]+(r[0]-s[0])*i,s[1]+(r[1]-s[1])*i,s[2]+(r[2]-s[2])*i]};class vb{constructor(e,t){this.game=t,this.mesh=new fc(this.geo,new yt({vertexShader:mb,fragmentShader:gb,transparent:!0,depthWrite:!1,blending:hs})),this.mesh.frustumCulled=!1,e.add(this.mesh)}game;geo=new jt;pos=new Float32Array(0);col=new Float32Array(0);u=new Float32Array(0);mesh;update(e,t,i,s){const r=this.game.tuning,a=r.lasers,{bar:o}=ud(r),h=o*a.blockBars,l=[],u=[],f=[];if(a.on)for(const d of t){const p=1-Math.min(1,Math.max(0,(Math.hypot(d.x-i,d.z-s)-a.fadeNear)/Math.max(1,a.fadeFar-a.fadeNear)));if(p<=0)continue;const g=pb(e,d.seed,1,r),v=e-d.ready,x=v>=0&&v<h?Math.min(1,v/a.fadeIn)*Math.min(1,(h-v)/a.fadeOut):0,m=Math.max(g.on,x),M=x>g.on?a.maxCount:g.count;if(m<=.01)continue;const S=a.spread*Math.PI/180*g.open;for(let b=0;b<M;b++){const A=M===1?0:b/(M-1)-.5,w=a.maxTilt*Math.PI/180,L=Math.max(-w,Math.min(w,A*S+g.sweep)),_=Math.sin(L),E=Math.cos(L),P=-.15*Math.cos(L*3+d.seed),T=xb(g.hue+b*.07),D=a.opacity*m*p;l.push(d.x,d.y,d.z,d.x+_*a.length,d.y+E*a.length,d.z+P*a.length),u.push(...T,D,...T,D),f.push(0,1)}}if(l.length>this.pos.length&&(this.pos=new Float32Array(l.length*2),this.col=new Float32Array(u.length*2),this.u=new Float32Array(f.length*2),this.geo.setAttribute("position",new Pn(this.pos,3).setUsage(Bs)),this.geo.setAttribute("aCol",new Pn(this.col,4).setUsage(Bs)),this.geo.setAttribute("aU",new Pn(this.u,1).setUsage(Bs))),!!this.geo.getAttribute("position")){this.pos.set(l),this.col.set(u),this.u.set(f);for(const d of["position","aCol","aU"])this.geo.getAttribute(d).needsUpdate=!0;this.geo.setDrawRange(0,l.length/3)}}}function*Mb(n,e,t,i){const s=n.siteOf(e[0],e[1]),r=n.areaSize*1.5,a=Math.max(t*2,8),o=n.bounds,h=(m,M)=>{if(m<o.minX||m>o.maxX||M<o.minZ||M>o.maxZ)return"edge";const S=n.areaAt(m,M).cell;return`${S[0]},${S[1]}`},l=`${e[0]},${e[1]}`,u=Math.ceil(2*r/a),f=s.x-r,d=s.z-r,p=[];for(let m=0;m<=u;m++){for(let M=0;M<=u;M++)p.push(h(f+M*a,d+m*a));yield}const g=new Set,v=Math.max(1,Math.round(a/t)),x=a/v;for(let m=0;m<u;m++,yield)for(let M=0;M<u;M++){const S=[p[m*(u+1)+M],p[m*(u+1)+M+1],p[(m+1)*(u+1)+M],p[(m+1)*(u+1)+M+1]];if(!S.includes(l)||S.every(A=>A===l))continue;const b=[];for(let A=0;A<=v;A++)for(let w=0;w<=v;w++)b.push(h(f+M*a+w*x,d+m*a+A*x));for(let A=0;A<=v;A++)for(let w=0;w<=v;w++){const L=b[A*(v+1)+w],_=f+M*a+w*x,E=d+m*a+A*x;for(const[P,T]of[[1,0],[0,1]]){if(w+P>v||A+T>v)continue;const D=b[(A+T)*(v+1)+w+P];if(L===D||L!==l&&D!==l)continue;const U=_+P*x*.5,N=E+T*x*.5,F=`${Math.round(U*4)},${Math.round(N*4)}`;g.has(F)||(g.add(F),i.push({x:U,z:N,other:L===l?D:L}))}}}}const _b=`
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
}`,bb=`
uniform float uBright;
varying vec3 vColour;
varying vec3 vWorld;
varying float vB;
${Ai}
void main() { gl_FragColor = vec4(haze(vColour * vB * uBright, vWorld), 1.0); }`;class Sb{constructor(e,t){this.game=t;const i=t.tuning.borders;this.mesh=new Da(this.geo,new yt({vertexShader:_b,fragmentShader:bb,uniforms:{...lt,uWidth:{value:i.width},uSparkle:{value:i.sparkle},uBright:{value:i.brightness}},transparent:!0,depthWrite:!1,blending:hs})),this.mesh.frustumCulled=!1,e.add(this.mesh)}game;areas=new Map;jobs=[];geo=new jt;stamp="";mesh;update(){const e=this.game,t=e.tuning.borders;if(!t.on){this.mesh.visible=!1;return}for(const[h,l]of e.party.areas){if(this.areas.has(h))continue;const u=e.map.siteOf(l.cell[0],l.cell[1]),f=l.from?e.map.siteOf(l.from[0],l.from[1]):null,d=f?(f.x+u.x)/2:u.x,p=f?(f.z+u.z)/2:u.z,g=e.map.areaSize*1.6,v=e.tuning.party.transition,x=gr(xn[e.map.typeOf(l.cell[0],l.cell[1])].creature),m={points:[],colour:new tt(x[0]/255,x[1]/255,x[2]/255),on:(M,S)=>l.wave===0?-1:l.at+Math.min(1,Math.hypot(M-d,S-p)/g)*v,done:!1};this.areas.set(h,m),this.jobs.push({key:h,gen:Mb(e.map,l.cell,t.step,m.points)})}const i=performance.now()+3;for(;this.jobs.length&&performance.now()<i;){const h=this.jobs[0];h.gen.next().done&&(this.areas.get(h.key).done=!0,this.jobs.shift())}const s=`${e.party.areas.size}|${[...this.areas.values()].filter(h=>h.done).length}`;if(s===this.stamp)return;this.stamp=s;const r=[],a=[],o=[];for(const[,h]of this.areas)if(h.done)for(const l of h.points)l.other!=="edge"&&e.party.areas.has(l.other)||(r.push(l.x,.15,l.z),a.push(h.colour.r,h.colour.g,h.colour.b),o.push(((l.x*12.9898+l.z*78.233)%1+1)%1,h.on(l.x,l.z)));this.geo.setAttribute("position",new Nt(r,3)),this.geo.setAttribute("aColour",new Nt(a,3)),this.geo.setAttribute("aSpark",new Nt(o,2))}}const yb=["#ff6fcf","#5fe8ff","#ffe25c"];class wb{canvas=document.createElement("canvas");g;v=new X;constructor(e){this.canvas.width=this.canvas.height=96,Object.assign(this.canvas.style,{position:"fixed",width:"96px",height:"96px",pointerEvents:"none",zIndex:"2",display:"none"}),e.appendChild(this.canvas),this.g=this.canvas.getContext("2d")}update(e,t,i,s,r,a,o,h,l,u){const f=this.v.set(s,1,r).project(e),d=Math.max(Math.abs(f.x),Math.abs(f.y)),p=f.z<1?Math.min(1,Math.max(0,(d-.9)/.25)):1;if(p<=.01){this.canvas.style.display="none";return}let g=f.x,v=f.y;f.z>=1&&(g=-g,v=-v);const x=1/Math.max(Math.abs(g)/.86,Math.abs(v)/.8,1e-6),m=(g*x+1)/2*t,M=(1-v*x)/2*i,S=Math.hypot(s-a,r-o),b=Math.max(.25,Math.min(1,1-S/900));this.canvas.style.display="block",this.canvas.style.left=`${m-48}px`,this.canvas.style.top=`${M-48}px`;const A=this.g,w=Math.atan2(-v,g);A.clearRect(0,0,96,96),A.save(),A.translate(48,48),A.rotate(w);const L=h*l/60,_=L-Math.floor(L);for(let E=0;E<3;E++){const P=(10+E*9+_*9)*(.7+.3*b),T=p*b*(1-(E+_)/3.2);A.strokeStyle=yb[E],A.globalAlpha=Math.max(0,T),A.lineWidth=3,A.beginPath(),A.arc(26,0,P,Math.PI-.7,Math.PI+.7),A.stroke()}u&&(A.rotate(-w),A.globalAlpha=.8,A.fillStyle="#fff",A.font="10px monospace",A.textAlign="center",A.fillText(`${Math.round(S)} m`,0,40)),A.restore()}}class Eb{canvas=document.createElement("canvas");g;v=new X;d=new X;on=!1;constructor(e){Object.assign(this.canvas.style,{position:"fixed",left:"0",top:"0",pointerEvents:"none",zIndex:"3",display:"none"}),e.appendChild(this.canvas),this.g=this.canvas.getContext("2d")}ground(e,t,i){const s=e.position;return this.d.set(t,i,.5).unproject(e).sub(s),this.d.y>=-1e-6?null:s.clone().addScaledVector(this.d,-s.y/this.d.y)}update(e,t,i,s,r){if(this.canvas.style.display=this.on?"block":"none",!this.on)return;(this.canvas.width!==t||this.canvas.height!==i)&&(this.canvas.width=t,this.canvas.height=i);const a=this.g,o=(T,D)=>{const U=this.v.set(T,0,D).project(e);return[(U.x+1)/2*t,(1-U.y)/2*i,U.z]};a.clearRect(0,0,t,i);const h=(T,D,U,N,F)=>{a.strokeStyle="rgba(0,0,0,0.6)",a.lineWidth=3,a.beginPath(),a.moveTo(T,D),a.lineTo(U,N),a.stroke(),a.strokeStyle=`rgba(255,255,255,${F})`,a.lineWidth=1,a.beginPath(),a.moveTo(T,D),a.lineTo(U,N),a.stroke()},l=(T,D,U,N)=>{a.font="10px ui-monospace, monospace",a.textAlign=N,a.textBaseline="middle",a.fillStyle="rgba(0,0,0,0.8)",a.fillText(T,D+1,U+1),a.fillStyle="rgba(255,255,255,0.85)",a.fillText(T,D,U)},u=this.ground(e,0,-.98),f=this.ground(e,0,.98)??this.ground(e,0,.3);if(!u||!f)return;const d=this.ground(e,-1,-1),p=this.ground(e,1,-1),g=this.ground(e,-1,.98)??d,v=this.ground(e,1,.98)??p,x=Math.min(d.x,g.x),m=Math.max(p.x,v.x),M=Math.min(f.z,g.z),S=u.z;for(let T=Math.ceil(x/10)*10;T<=m;T+=10){const D=o(T,M),U=o(T,S);h(D[0],D[1],U[0],U[1],T%50===0?.28:.1)}for(let T=Math.ceil(M/10)*10;T<=S;T+=10){const D=o(x,T),U=o(m,T);h(D[0],D[1],U[0],U[1],T%50===0?.28:.1)}const b=i-6;h(0,b,t,b,.6);for(let T=Math.ceil((d.x-s)/2)*2;s+T<=p.x;T+=2){const D=o(s+T,u.z)[0],U=T%10===0;h(D,b,D,b-(U?10:5),.6),U&&l(`${T}`,D,b-18,"center")}const A=6;h(A,0,A,i,.6);for(let T=Math.ceil((r-u.z)/2)*2;r-T>=f.z-1e-6&&T<400;T+=2){const D=o(s,r-T)[1],U=T%10===0;D<0||D>i||(h(A,D,A+(U?10:5),D,.6),U&&l(`${T}`,A+14,D,"left"))}const w=o(s,r),L=this.ground(e,-1,1-w[1]/i*2),_=this.ground(e,1,1-w[1]/i*2),E=L&&_?Math.round(_.x-L.x):0,P=Math.round(e.position.y);l(`camera ${P} m up · ${E} m across at the witch`,t-12,i-24,"right")}}const Ab=`
varying vec3 vWorld;
void main() {
  vec4 w = modelMatrix * vec4(position, 1.0);
  vWorld = w.xyz;
  gl_Position = projectionMatrix * viewMatrix * w;
}`,Tb=`
uniform float uStrength, uWind, uPixel;
uniform sampler2D uDepth; uniform vec2 uLow;
varying vec3 vWorld;
${Ai}
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
}`;class Rb{constructor(e,t,i,s,r,a,o){this.height=t,this.mat=new yt({vertexShader:Ab,fragmentShader:Tb,uniforms:{...lt,uStrength:{value:e},uWind:{value:i},uPixel:{value:s},uDepth:{value:a},uLow:{value:o}},depthWrite:!1,depthTest:!r,blending:r?ci:Fs}),this.mesh=new $t(new Dn(700,700).rotateX(-Math.PI/2),this.mat),this.mesh.frustumCulled=!1,this.mesh.renderOrder=2}height;mesh;mat;follow(e,t){this.mesh.position.set(e,this.height,t-150)}}const Cb=`
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
}`,Lb=`
uniform float uStrength;
varying vec2 vLocal;
varying vec3 vWorld;
varying float vScenery;
${Ai}
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
}`;class Pb{mesh;geo=new mc;attr;capacity=0;constructor(e,t=!0){const i=new Dn(1,1).rotateX(-Math.PI/2);this.geo.index=i.index,this.geo.setAttribute("position",i.getAttribute("position")),this.attr=this.grow(1024);const s=new yt({vertexShader:Cb,fragmentShader:Lb,uniforms:{...lt,uStrength:{value:e}},depthWrite:!1,...t?{transparent:!0,blending:Wa,blendSrc:Ql,blendDst:jl}:{}});this.mesh=new $t(this.geo,s),this.mesh.frustumCulled=!1,this.mesh.renderOrder=1}grow(e){return this.capacity=Math.max(e,this.capacity*2),this.geo.dispose(),this.attr=new dc(new Float32Array(this.capacity*4),4),this.attr.setUsage(Bs),this.geo.setAttribute("iShadow",this.attr),this.attr}set(e){e.length>this.capacity&&this.grow(e.length);const t=this.attr.array;e.forEach((i,s)=>{t[s*4]=i.x,t[s*4+1]=i.z,t[s*4+2]=i.scenery?-i.w:i.w,t[s*4+3]=i.d}),this.attr.needsUpdate=!0,this.geo.instanceCount=e.length,this.mesh.visible=e.length>0}}const Db=n=>({radius:n.haze.far,fps:n.scenery.fps,slowFor:0,fastFor:0});function Ib(n,e,t){const i=t.scenery;if(!i.adaptive||!(e>0)||e>.25)return n;const s=n.fps+(1/e-n.fps)*Math.min(1,e*4),r=s<i.fps-i.hysteresis?n.slowFor+e:0,a=s>=i.fps?n.fastFor+e:0;let o=n.radius;return r>i.sustain?o-=i.shrink*e:a>i.sustain&&(o+=i.grow*e),o=Math.min(t.haze.far,Math.max(Math.min(i.minRadius,t.haze.far),o)),{radius:o,fps:s,slowFor:r,fastFor:a}}class Nb{constructor(e,t,i){this.canvas=e,this.game=t,this.style=i;const s=t.tuning;this.budget=Db(s),this.renderer=new c_({canvas:e,antialias:!1,powerPreference:"high-performance",preserveDrawingBuffer:!0}),this.renderer.setPixelRatio(1),this.renderer.info.autoReset=!1,this.renderer.outputColorSpace=_r,this.mpp=1/(s.artPixelsPerMetre*(2/s.pixelSize)),this.camera=new Tn(s.camera.fov,1,1,900),this.post=new V_(this.renderer,s),this.scene.background=new tt(723478),O_({...i,shafts:i.shafts*s.moonbeams},s.glowReach,this.mpp,s.tone.ambient),lt.uGlowPower.value=s.glowPower,this.assets=new N_(i,t.seed,s.pixelSize),this.ground=new B_(t.map,t.forest,i,this.mpp),this.assets.onFloor=(d,p)=>this.ground.setFloor(d,p);const r=s.canopyShadow;this.ground.setCanopyShadow(r.on?r.strength:0,r.height,r.cover,r.wind),this.shadows=new Pb(s.shadows.strength,s.fx==="smooth"),this.shadows.mesh.visible=s.shadows.on,this.scene.add(this.shadows.mesh);const a=s.fx==="smooth";lt.uSmooth.value=a?1:0,s.mist.on&&s.mist.strength>0&&(this.mist=new Rb(s.mist.strength,s.mist.height,s.mist.wind,this.mpp,a,this.post.scene.depthTexture,this.post.lowSize),a?(this.post.fxScene=new sh,this.post.fxScene.add(this.mist.mesh)):this.scene.add(this.mist.mesh)),lt.uHazeRange.value.set(s.haze.near,s.haze.far),this.scene.add(this.ground.mesh);const o=s.occlusion;this.witchBatch=new Ls(this.assets.witch,this.mpp,{unlit:!0,silhouette:{colour:lt.uGlowRgb.value.clone(),opacity:o.silhouette}}),this.witchBatch.mesh.renderOrder=10,this.scene.add(...this.witchBatch.meshes),Gt.uOcc.value.set(o.fadeOpacity,o.edge,o.minHeight,o.on?1:0),this.stoneBatch=new Ls(this.assets.stones,this.mpp,{fade:!0}),this.scene.add(...this.stoneBatch.meshes);const h=t.map.dancefloor,l=[],u=t.tuning.dancefloor.stones;for(let d=0;d<u;d++){const p=d/u*Math.PI*2+.3;l.push({x:h.x+Math.cos(p)*h.radius,y:0,z:h.z+Math.sin(p)*h.radius,frame:this.assets.stones.frames[d%4],flip:d%2===0})}this.stoneBatch.set(l),this.propBatch=new Ls(this.assets.props,this.mpp,{fade:!0}),this.scene.add(...this.propBatch.meshes),this.partyView=new Q_(this.assets.soundsystems,this.mpp),this.strings=new ob(this.scene,t),this.leashView=new db(this.scene,t),this.lasers=new vb(this.scene,t),this.borders=new Sb(this.scene,t),this.soundBatch=new Ls(this.assets.soundsystems,this.mpp,{fade:!0}),this.scene.add(...this.soundBatch.meshes),this.dancefloor=new Z_(t.map,s,Gt,this.mpp),this.scene.add(this.dancefloor.ball,this.dancefloor.beam,this.dancefloor.motes);const f=s.fx==="smooth"?new yt({transparent:!0,depthWrite:!1,blending:Wa,blendSrc:Ql,blendDst:jl,vertexShader:"varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }",fragmentShader:"varying vec2 vUv; void main(){ vec2 p = vUv * 2.0 - 1.0; float r = dot(p, p); if (r > 1.0) discard; gl_FragColor = vec4(vec3(1.0 - 0.75 * (1.0 - r) * (1.0 - r)), 1.0); }"}):new yt({transparent:!1,depthWrite:!1,vertexShader:"varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }",fragmentShader:"varying vec2 vUv; void main(){ vec2 p = vUv * 2.0 - 1.0; if (dot(p, p) > 1.0 || mod(floor(gl_FragCoord.x) + floor(gl_FragCoord.y), 2.0) > 0.5) discard; gl_FragColor = vec4(0.02, 0.02, 0.05, 1.0); }"});this.shadow=new $t(new Dn(1.4,.7).rotateX(-Math.PI/2),f),this.shadow.renderOrder=1,this.scene.add(this.shadow)}canvas;game;style;renderer;scene=new sh;camera;ground;assets;typeBatches=new Map;creatureBatches=new Map;witchBatch;stoneBatch;shadow;mpp;lastBuild={x:1/0,y:1/0,z:1/0,version:-1,radius:-1};budget;sceneryFixed=null;lastReal=0;post;dancefloor;propBatch;partyView;strings;leashView;lasers;borders;music=new wb(document.body);rulers=new Eb(document.body);debugReadouts=!1;soundBatch;sources=[];forestLights=[];shadows;shadowList=[];mist=null;width=1;height=1;debugCull=!1;ghosts=[];ghostLines=null;now=0;stats={sceneryRadius:0,fps:0,gameplay:0,scenery:0,dropped:0,trees:0,bushes:0,creatures:0,batches:0,drawCalls:0,pendingArt:0,pendingGround:0,lights:0};resize(e,t){const i=this.game.tuning.pixelSize;this.width=Math.max(1,Math.ceil(e/i)),this.height=Math.max(1,Math.ceil(t/i));const s=this.post.fullResolution?i:1;this.renderer.setSize(this.width*s,this.height*s,!1),this.post.resize(this.width,this.height,this.width*s,this.height*s),this.canvas.style.width=this.width*i+"px",this.canvas.style.height=this.height*i+"px",this.camera.aspect=this.width/this.height,this.camera.updateProjectionMatrix(),Gt.uRes.value.set(this.width,this.height)}async prepare(){this.render(0,!1),this.drawCreatures(),this.ground.fill(this.renderer,this.viewRect(this.game.tuning.haze.near,20),this.game.witch.x,this.game.witch.z,1/0),await this.assets.whenIdle(),this.render(0,!1),this.refresh(!0);for(let e=0;e<xn.length;e++)this.assets.prefetchType(e);for(const e of xn)this.assets.creatureArt(e.creature)}batchFor(e,t,i){let s=e.get(t);return s||(s=i(),s&&(e.set(t,s),this.scene.add(...s.meshes))),s}frustum=new Ca;frustumTo=new Ca;cullCam=new Tn;box=new $s;m4=new Ot;v3=new X;at=new Map;tracks={placed:{now:new Set,before:new Set},moving:{now:new Set,before:new Set}};pops=[];poseCamera(e,t){const i=t.angle*Math.PI/180;e.position.set(t.tx,t.ty+Math.sin(i)*t.distance,t.tz+Math.cos(i)*t.distance),e.up.set(0,1,0),e.lookAt(t.tx,t.ty,t.tz),e.updateMatrixWorld()}updateFrustum(){const e=this.game,t=e.tuning,i=this.camera;i.updateMatrixWorld(),this.m4.multiplyMatrices(i.projectionMatrix,i.matrixWorldInverse),this.frustum.setFromProjectionMatrix(this.m4);const s=Math.max(1,t.camera.zoomSteps),r=e.witch.mode==="rising"||e.witch.mode==="treetop"?1:0,a=eu({...e.camera,zoom:s>1?e.camera.zoomStep/(s-1):0},r,t),o=this.cullCam;o.fov=i.fov,o.aspect=i.aspect,o.near=i.near,o.far=i.far,o.updateProjectionMatrix(),this.poseCamera(o,{...a,ty:Vn(t.groundHeight,t.treetopHeight,r)}),this.m4.multiplyMatrices(o.projectionMatrix,o.matrixWorldInverse),this.frustumTo.setFromProjectionMatrix(this.m4)}viewRect(e,t){const i=this.game.witch,s=[];for(const o of[this.camera,this.cullCam]){const h=o.position,l=e+Math.hypot(h.x-i.x,h.z-i.z)+t;for(const u of[-1,1])for(const f of[-1,1]){const d=this.v3.set(u,f,1).unproject(o).sub(h).normalize();for(const p of[0,25]){let g=d.y<-.001?(p-h.y)/d.y:1/0;g>0||(g=1/0),g=Math.min(g,l),s.push([h.x+d.x*g,h.z+d.z*g])}}s.push([h.x,h.z])}const r=s.map(o=>o[0]),a=s.map(o=>o[1]);return{minX:Math.min(...r)-t,maxX:Math.max(...r)+t,minZ:Math.min(...a)-t,maxZ:Math.max(...a)+t}}inView(e,t,i,s,r,a=this.game.tuning.haze.far){const o=this.game.witch.x,h=this.game.witch.z,l=a+r;return(e-o)**2+(t-h)**2>l*l?!1:(this.box.min.set(e-i/2-r,-r,t-s-r),this.box.max.set(e+i/2+r,s+r,t+r),this.frustum.intersectsBox(this.box)||this.frustumTo.intersectsBox(this.box))}inInnerView(e,t,i){const s=this.game.witch,r=this.game.tuning.haze;if(Math.hypot(e-s.x,t-s.z)>r.near+(r.far-r.near)*.6)return!1;for(const a of[0,i*.5,i]){const o=this.v3.set(e,a,t).project(this.camera);if(Math.abs(o.x)<1&&Math.abs(o.y)<1&&o.z<1)return!0}return!1}mark(e,t,i,s,r=""){const a=e==="creature"||e==="prop"?this.tracks.moving:this.tracks.placed,o=e==="creature"?`${e}|${r}`:`${e}|${t.toFixed(1)}|${i.toFixed(1)}|${s.toFixed(1)}|${r}`;return e==="creature"&&this.at.set(o,[t,i,s]),a.now.add(o),!a.before.has(o)}checkPops(e,t=!0){const i=this.tracks[e],s=t&&this.assets.pending===0&&i.before.size>0;if(this.debugCull){for(const r of i.before)if(!i.now.has(r)){const a=this.at.get(r),[,...o]=r.split("|"),[h,l,u]=a??o.map(Number);this.ghosts.push({x:+h,z:+l,h:Math.max(1,+u),until:this.now+1})}}if(s){const r=(a,o)=>{const h=this.at.get(a),[l,...u]=a.split("|"),[f,d,p]=h??u.map(Number),g=this.game.witch;!(e==="placed"&&Math.hypot(+f-g.x,+d-g.z)>this.budget.radius-this.game.tuning.scenery.fade)&&this.inInnerView(+f,+d,+p)&&this.pops.push(`${o} ${l} ${(+f).toFixed(0)},${(+d).toFixed(0)}`)};for(const a of i.now)i.before.has(a)||r(a,"appeared");for(const a of i.before)i.now.has(a)||r(a,"vanished")}i.before=i.now,i.now=new Set}foot=0;footTime=0;footAct=null;lastPose={distance:0,angle:0,zoomStep:-1,lift:-1};refresh(e=!1){const t=this.game,i=t.tuning,s=this.camera,r=i.viewMargin,a=zc(t),o={x:s.position.x,y:s.position.y,z:s.position.z},h=this.lastPose,l=t.witch.mode==="rising"||t.witch.mode==="treetop"?1:0,u=Math.hypot(o.x-this.lastBuild.x,o.y-this.lastBuild.y,o.z-this.lastBuild.z)>=r/3,f=this.budget.radius,d=Math.min(i.haze.far,f+r/2),p=Math.abs(f-this.lastBuild.radius)>=r/3,g=Math.abs(a.distance-h.distance)>2||Math.abs(a.angle-h.angle)>.5||t.camera.zoomStep!==h.zoomStep||l!==h.lift;if(!e&&!u&&!g&&!p&&this.assets.version===this.lastBuild.version)return;this.lastBuild={...o,version:this.assets.version,radius:f},this.lastPose={distance:a.distance,angle:a.angle,zoomStep:t.camera.zoomStep,lift:l};const v=this.viewRect(d,r),x=(v.minX+v.maxX)/2,m=(v.minZ+v.maxZ)/2,M=Math.max(v.maxX-v.minX,v.maxZ-v.minZ)/2,S=[],b=lt.uMoonDir.value,A=-b.x/Math.max(.2,b.y),w=-b.z/Math.max(.2,b.y),L=new Map,_=(W,te)=>{let K=L.get(W);K||L.set(W,K=[]),K.push(te)},E=this.mpp,P=a.angle*Math.PI/180,T=Gt.uUp.value.dot(this.v3.set(0,Math.cos(P),-Math.sin(P))),D=Gt.uUp.value,U=(W,te,K,B)=>{const I=(K.pad??0)*B;return{x:W-D.x*I,y:-D.y*I,z:te-D.z*I}};let N=0,F=0;for(const W of t.forest.treesNear(x,m,M)){const te=this.assets.typeArt(W.type);if(!te||!te.layout.big.length)continue;const K=te.atlas.frames,B=te.layout.big[W.variant%te.layout.big.length],I=K[B.top??B.bot];if(!this.inView(W.x,W.z,I.w*E,I.h*E,r,d))continue;const q=this.mark("tree",W.x,W.z,I.h*E),$=U(W.x,W.z,K[B.bot],E);_(W.type,{...$,frame:K[B.bot],flip:W.flip,fresh:q}),B.top!==null&&_(W.type,{...$,frame:K[B.top],flip:W.flip,top:!0,fresh:q});const ce=I.w*E,de=I.h*E*(B.top===null?.2:.6);i.shadows.trees&&S.push({x:W.x+A*de,z:W.z+w*de,w:ce*.8,d:ce*.45,scenery:!0}),N++}const H=(W,te,K)=>{for(const B of te){const I=this.assets.typeArt(B.type);if(!I)continue;const q=K(I.layout);if(!q.length)continue;const $=q[B.variant%q.length],ce=I.atlas.frames,de=ce[$.bot],me=ce[$.top??$.bot],j=W==="setpiece"?i.setPieceScale:1,ie=E*j;let k=B.x,re=B.z;if($.origin){const Ce=B.flip?de.w-$.origin.x:$.origin.x;k+=(de.w/2-Ce)*ie,re+=(de.h-(de.pad??0)-$.origin.y)*ie*T/Math.max(.2,Math.sin(P))}if(!this.inView(k,re,me.w*ie,me.h*ie,r,d))continue;const ae=this.mark(W,B.x,B.z,me.h*ie),ge=U(k,re,de,ie);_(B.type,{...ge,frame:de,flip:B.flip,fresh:ae,scale:j}),$.top!==null&&_(B.type,{...ge,frame:ce[$.top],flip:B.flip,top:!0,fresh:ae,scale:j});const ke=de.w*ie*.3;W!=="setpiece"&&S.push({x:B.x,z:B.z-ke*.4,w:de.w*ie*.8,d:ke,scenery:!0}),F++}};H("small",t.forest.bushesNear(x,m,M),W=>W.small),H("wall",t.forest.wallsNear(x,m,M),W=>W.walls.map(te=>({bot:te,top:null}))),H("setpiece",t.forest.setPiecesNear(x,m,M),W=>W.set===null?[]:[W.set]);for(const[W,te]of this.typeBatches)L.has(W)||te.set([]);for(const[W,te]of L)this.batchFor(this.typeBatches,W,()=>{const B=this.assets.typeArt(W);return B&&new Ls(B.atlas,E,{scenery:!0,fade:!0})})?.set(te);this.checkPops("placed",!e),this.sources=t.forest.lightsNear(t.witch.x,t.witch.z,i.haze.far+r),this.stats.trees=N,this.stats.bushes=F,this.shadowList=S}drawCreatures(e=0){const t=this.game,i=t.tuning.haze.far+20,s=new Map,r=new Map,a=[],o=60/t.tuning.beat.bpm;let h=0;for(const l of t.creatures){if(Math.abs(l.x-t.witch.x)>i||Math.abs(l.z-t.witch.z)>i)continue;const u=l.leashed?this.assets.partyArt(l.species,l.id,gr(l.species)):void 0,f=u??this.assets.creatureArt(l.species),d=u?`party-${l.id}`:l.species;if(!f)continue;r.set(d,f);const p=f.atlas.frames[f.frame(l.level,l.moving?Math.floor(l.walk)%2:0,l.away)];if(!this.inView(l.x,l.z,p.w*this.mpp,p.h*this.mpp,4))continue;const g=this.mark("creature",l.x,l.z,p.h*this.mpp,l.id);let v=s.get(d);v||s.set(d,v=[]);const x=(e/o+l.id%4*.25)*Math.PI,m=l.leashed?Math.abs(Math.sin(x))*(l.moving?.15:.4):0,M=l.leashed&&!l.moving?Math.sin(x*.5)*.12:0;v.push({x:l.x+M,y:m,z:l.z,frame:p,flip:l.facing<0,fresh:g}),a.push({x:l.x,z:l.z,w:p.w*this.mpp*.7,d:p.w*this.mpp*.25}),h++}for(const[l,u]of this.creatureBatches)s.has(l)||u.set([]);for(const[l,u]of s)this.batchFor(this.creatureBatches,l,()=>{const d=r.get(l);return d&&new Ls(d.atlas,this.mpp)})?.set(u);this.stats.creatures=h,this.game.tuning.shadows.on&&this.shadows.set(this.shadowList.concat(a))}fire=new X(1,.5,.16);runeCyan=new X(.3,.9,1);runeViolet=new X(.75,.45,1);runeGreen=new X(.45,1,.5);updateSources(e){const t=this.assets.props.frames,i=[],s=[];for(const r of this.sources){if(r.kind==="pond")continue;const a=Ve(Math.round(r.x*10),Math.round(r.z*10),7);if(r.kind==="campfire"){const o=.8+.12*Math.sin(e*11+a*40)+.08*Math.sin(e*23.7+a*13);s.push({x:r.x+Math.sin(e*9+a)*.08,y:1.2,z:r.z,reach:this.game.tuning.lights.campfire.reach*r.size,rgb:this.fire,strength:this.game.tuning.lights.campfire.strength*o});const h=t[Math.floor(e*8+a*10)%3];this.inView(r.x,r.z,h.w*this.mpp,h.h*this.mpp,4)&&i.push({x:r.x,y:0,z:r.z,frame:h,flip:a<.5,fresh:this.mark("prop",r.x,r.z,2)})}else{const o=a<.33?1:a<.66?0:2,h=.7+.3*Math.sin(e*.9+a*20),l=t[3+o];s.push({x:r.x,y:2,z:r.z,reach:this.game.tuning.lights.stone.reach*r.size,rgb:[this.runeCyan,this.runeViolet,this.runeGreen][o],strength:this.game.tuning.lights.stone.strength*h}),this.inView(r.x,r.z,l.w*this.mpp,l.h*this.mpp,4)&&i.push({x:r.x,y:0,z:r.z,frame:l,flip:a<.5,fresh:this.mark("prop",r.x,r.z,2.6)})}}this.propBatch.set(i),this.forestLights=s}setLights(e,t,i){const s=Math.min(Gs,this.game.tuning.lightBudget),r=e.map(l=>({l,d:Math.hypot(l.x-t,l.z-i)-l.reach})).sort((l,u)=>l.d-u.d).slice(0,s+1),a=r.length>s?r[s].d:1/0,o=lt;let h=0;for(const{l,d:u}of r.slice(0,s)){const f=Math.min(1,Math.max(0,(a-u)/15));o.uLightPos.value[h].set(l.x,l.y,l.z,l.reach),o.uLightCol.value[h].set(l.rgb.x,l.rgb.y,l.rgb.z,l.strength*f),h++}o.uLightCount.value=h,this.stats.lights=h}drawGhosts(e){this.now=e,this.ghosts=this.ghosts.filter(a=>a.until>e),this.ghostLines||(this.ghostLines=new fc(new jt,new Zu({color:16719904,depthTest:!1})),this.ghostLines.frustumCulled=!1,this.ghostLines.renderOrder=20,this.scene.add(this.ghostLines));const t=Gt.uRight.value,i=Gt.uUp.value,s=[];for(const a of this.ghosts){const o=a.h*.4,h=(p,g)=>[a.x+t.x*p*o+i.x*g*a.h,t.y*p*o+i.y*g*a.h,a.z+t.z*p*o+i.z*g*a.h],l=h(-1,0),u=h(1,0),f=h(1,1),d=h(-1,1);s.push(...l,...u,...u,...f,...f,...d,...d,...l,...l,...f)}const r=this.ghostLines.geometry;r.dispose(),r.setAttribute("position",new Nt(s,3)),r.setDrawRange(0,s.length/3),this.ghostLines.visible=s.length>0}render(e,t=!0){const i=this.game,s=i.tuning,r=zc(i);if(t){const $=performance.now();this.lastReal&&(this.budget=Ib(this.budget,($-this.lastReal)/1e3,s)),this.lastReal=$}this.sceneryFixed!==null&&(this.budget.radius=Math.min(s.haze.far,Math.max(1,this.sceneryFixed))),lt.uScenery.value.set(this.budget.radius,Math.max(1,s.scenery.fade));const a=r.angle*Math.PI/180,o=2*r.distance*Math.tan(s.camera.fov*Math.PI/360)/this.height,h=new X(0,Math.cos(a),-Math.sin(a)),l=new X(r.tx,r.ty,r.tz),u=l.dot(h),f=l.x;l.addScaledVector(h,Math.round(u/o)*o-u),l.x+=Math.round(f/o)*o-f;const d=new X(0,Math.sin(a),Math.cos(a)).multiplyScalar(r.distance);this.camera.position.copy(l).add(d),this.camera.up.set(0,1,0),this.camera.lookAt(l),this.updateFrustum();const p=s.spriteTilt;Gt.uUp.value.set(0,1,0).lerp(h,p).normalize(),Gt.uFacing.value.crossVectors(Gt.uRight.value,Gt.uUp.value).normalize();const g=Fc(i.witch),v=s.canopyCutout;this.camera.updateMatrixWorld();const x=this.v3.set(i.witch.x,Ws(i.witch,s)*.5,i.witch.z).project(this.camera);Gt.uCutout.value.set((x.x*.5+.5)*this.width,(x.y*.5+.5)*this.height,.5*v.screenFraction*this.width*(1-g),Math.max(1,v.edge*this.width*(1-g))),Gt.uTopFade.value=g,Gt.uDebugCull.value=this.debugCull?1:0;const m=i.witch,M=Ws(m,s);lt.uGlowPos.value.set(m.x,M+s.glowHeight,m.z),lt.uHazeCentre.value.set(m.x,m.z),this.updateSources(e);const S=this.partyView.update(i,e,($,ce,de,me)=>this.inView($,ce,de,me,4),()=>!1);this.soundBatch.set(S.items),this.ground.setSweeps(S.sweeps),this.lasers.update(e,S.playing,m.x,m.z);{const $=Gt,ce=s.party,de=[...i.party.areas.values()].map(me=>({a:me,s:i.map.siteOf(me.cell[0],me.cell[1])})).sort((me,j)=>Math.hypot(me.s.x-m.x,me.s.z-m.z)-Math.hypot(j.s.x-m.x,j.s.z-m.z)).slice(0,16);de.forEach(({a:me,s:j},ie)=>{const k=me.wave===0?1:Math.min(1,Math.max(0,(e-me.at)/Math.max(.01,ce.transition)));$.uParty.value[ie].set(j.x,j.z,i.map.areaSize*.85,k);const re=gr(xn[i.map.typeOf(me.cell[0],me.cell[1])].creature);$.uPartyCol.value[ie].set(re[0]/255,re[1]/255,re[2]/255)}),$.uPartyCount.value=de.length,$.uUplight.value.set(ce.uplight.strength,ce.uplight.pulse,ce.uplight.edge,e*s.beat.bpm/60*Math.PI*2)}this.strings.update(),this.borders.update(),this.setLights([this.dancefloor.update(e,this.ground),...S.lights,...this.forestLights],m.x,m.z),lt.uTime.value=e,this.mist?.follow(r.tx,r.tz);const b=Math.sin(e*2.4)*.12,A=m.mode==="rising"&&m.lift<.9,w=m.mode==="descending"&&m.lift>.1;let L=A||w?(A?8:12)+(m.away?2:0)+Math.floor(e*7)%2:m.lean?6+(m.away?1:0):(m.away?3:0)+Math.floor(e*4)%3;const _=i.leash,E=this.assets.witchFoot,P=m.away?"away":"towards";for(const $ of _.events)$.kind==="placed"||$.kind==="fizzled"?this.footAct={pose:"placeSigil",at:e}:$.kind==="picked"&&(this.footAct={pose:"liftSigil",at:e});const T=this.footAct?E[this.footAct.pose].towards.length/E[this.footAct.pose].fps:0,D=!!this.footAct&&e-this.footAct.at<T+.3,U=m.mode==="ground"&&(_.talk||_.held||D)?1:0,N=Math.min(.1,Math.max(0,e-this.footTime)),F=this.foot;this.footTime=e,this.foot+=(U-this.foot)*Math.min(1,N*8),Math.abs(U-this.foot)<.01&&(this.foot=U);const H=($,ce)=>{const de=E[$][P];return de[Math.max(0,Math.min(de.length-1,ce))]};this.foot>.6?D&&this.footAct?L=H(this.footAct.pose,Math.floor((e-this.footAct.at)*E[this.footAct.pose].fps)):_.talk?L=H("talk",Math.floor(e*E.talk.fps)%E.talk[P].length):L=H("stand",Math.floor(e*E.stand.fps)%E.stand[P].length):this.foot>.02&&(L=this.foot>=F?H("land",Math.floor(this.foot*3)):H("takeoff",Math.floor((1-this.foot)*3)));const W=this.foot*this.foot*(3-2*this.foot),te=(M+b-.4)*(1-W),K=this.assets.witch.frames[L],B=te+K.h*this.mpp;this.witchBatch.set([{x:m.x,y:te,z:m.z,frame:K,flip:m.facing<0}]);{const $=(j,ie,k)=>{const re=this.v3.set(j,ie,k).project(this.camera);return[(re.x+1)/2*this.width,(re.y+1)/2*this.height]},ce=$(m.x,te,m.z),de=$(m.x,B,m.z),me=$(m.x+K.w*this.mpp/2,te,m.z);Gt.uWitch.value.set((ce[0]+de[0])/2,(ce[1]+de[1])/2,Math.abs(me[0]-ce[0])+1,Math.abs(de[1]-ce[1])/2+1),Gt.uWitchDepth.value=-this.v3.set(m.x,M,m.z).applyMatrix4(this.camera.matrixWorldInverse).z}this.shadow.position.set(m.x,.03,m.z),this.shadow.scale.setScalar(1-.5*Fc(m)),this.refresh(),this.drawCreatures(e),this.checkPops("moving"),this.rulers.update(this.camera,this.canvas.clientWidth||window.innerWidth,this.canvas.clientHeight||window.innerHeight,m.x,m.z);const I=i.map.dancefloor;if(this.music.update(this.camera,this.canvas.clientWidth||window.innerWidth,this.canvas.clientHeight||window.innerHeight,I.x,I.z,m.x,m.z,e,s.beat.bpm,this.debugReadouts),this.leashView.update(e,this.camera,this.canvas.clientWidth||window.innerWidth,this.canvas.clientHeight||window.innerHeight,B),this.assets.work(6),this.stats.pendingGround=this.ground.fill(this.renderer,this.viewRect(s.haze.far,40),m.x,m.z,4),this.stats.pendingArt=this.assets.pending,this.debugCull&&this.drawGhosts(e),!t)return;this.renderer.info.reset(),this.post.render(this.scene,this.camera);let q=0;for(const $ of[...this.typeBatches.values(),...this.creatureBatches.values(),this.propBatch,this.soundBatch])q+=$.dropped;q&&!this.stats.dropped&&console.warn(`view: ${q} sprite instances set but not drawn`),this.stats.dropped=q,this.stats.drawCalls=this.renderer.info.render.calls,this.stats.batches=this.typeBatches.size+this.creatureBatches.size,this.stats.sceneryRadius=this.budget.radius,this.stats.fps=this.budget.fps,this.stats.scenery=this.stats.trees+this.stats.bushes,this.stats.gameplay=this.stats.creatures+this.propBatch.count+this.soundBatch.count}}const Ob="The art style: knobs from the Witch Art Lab. Paste a style saved in the Lab here (its whole saved JSON, or just its style object). Any knob left out follows the Lab's current default, so an empty style means the Lab's default look, and stays up to date as the art changes.",Ub="Lab default",Fb={},Bb={_readme:Ob,name:Ub,style:Fb};function kb(n=Bb){const e=n??{},t=e.style&&typeof e.style=="object"?e.style:e,i=R_();for(const[s,r]of Object.entries(t))s in i&&(i[s]=r);return i}function zb(n,e){const t=n.querySelector("#stick"),i=t.querySelector(".knob"),s=56;let r=null,a=0,o=0;const h=()=>n.classList.add("touch"),l=n.querySelector("#stick-zone");l.addEventListener("pointerdown",p=>{if(!(p.pointerType==="mouse"||r!==null)){h(),r=p.pointerId,a=p.clientX,o=p.clientY,t.style.left=a+"px",t.style.top=o+"px",t.classList.add("on");try{l.setPointerCapture(p.pointerId)}catch{}p.preventDefault()}}),l.addEventListener("pointermove",p=>{if(p.pointerId!==r)return;let g=p.clientX-a,v=p.clientY-o;const x=Math.hypot(g,v);x>s&&(g*=s/x,v*=s/x),i.style.transform=`translate(${g}px, ${v}px)`;const m=Math.min(1,x/s),M=.15,S=m<M?0:(m-M)/(1-M)/Math.max(1e-6,m);e.x=g/s*S,e.y=v/s*S});const u=p=>{p.pointerId===r&&(r=null,e.x=0,e.y=0,i.style.transform="",t.classList.remove("on"))};l.addEventListener("pointerup",u),l.addEventListener("pointercancel",u);const f=(p,g)=>{const v=n.querySelector(p);v.addEventListener("pointerdown",x=>{x.preventDefault(),x.stopPropagation(),g(),v.classList.add("down")}),v.addEventListener("pointerup",()=>v.classList.remove("down")),v.addEventListener("pointerleave",()=>v.classList.remove("down"))};f("#rise",()=>e.toggle=!0),f("#zoom-in",()=>e.zoom-=1),f("#zoom-out",()=>e.zoom+=1),f("#sigil",()=>e.sigil=!0);const d=n.querySelector("#talk");d.addEventListener("pointerdown",p=>{p.preventDefault(),p.stopPropagation(),e.talk=!0,d.classList.add("down")});for(const p of["pointerup","pointerleave","pointercancel"])d.addEventListener(p,()=>{e.talk=!1,d.classList.remove("down")});window.addEventListener("touchstart",p=>{h(),p.touches.length===3&&(e.debug=!0)},{passive:!0})}const Gb=[{version:null,items:["Removed the diagonal stripes across the forest (moonbeams are off; ?moonbeams=on brings them back)","When a tree stands in front of the witch, you now see her through a soft round window that fades in gently, not a square"]},{version:116,items:["Land first to talk or to put down and pick up sigils, with new poses","Talking to a creature keeps its progress for a while if you break off","Placed sigils show above the canopy from the treetops","Waves every 5 minutes by default; pick how often on this screen","A small arrow points the way to the music","Slower lasers, party motes drifting over whole areas, and party light on the treetops","Woods have groves, thickets, glades and lone trees, and areas blend into each other","G shows metre rulers and a ground grid"]},{version:111,items:["The witch's glow lights up a much wider pool of forest round her","Fewer bushes"]},{version:108,items:["Trees no longer pop in and out as you fly","The witch is never lost: tall things in front of her fade, and her silhouette shows through"]},{version:105,items:["No more speech icons over every creature in range"]},{version:99,items:["String lights hang in long garlands from tree to tree","Soundsystems face different ways","Set pieces are bigger, and areas have ragged edges"]},{version:93,items:["The witch has rise and descend poses","Sigils show rings, and creatures show when they're ready to talk"]}],Hb={entries:Gb},pn=new URLSearchParams(location.search);let as=r0(pn.get("seed"));as===null&&(as=Math.floor(Math.random()*1e6),pn.set("seed",String(as)),history.replaceState(null,"","?"+pn.toString()+location.hash));const Qt={...qi,bloom:{...qi.bloom},tiltShift:{...qi.tiltShift},shadows:{...qi.shadows},canopyShadow:{...qi.canopyShadow},mist:{...qi.mist},party:{...qi.party}};pn.get("shadows")==="off"&&(Qt.shadows.on=!1);pn.get("canopy")==="off"&&(Qt.canopyShadow.on=!1);pn.get("mist")==="off"&&(Qt.mist.on=!1);const oa=pn.get("tilt");oa==="off"?Qt.tiltShift.on=!1:(oa==="before"||oa==="after")&&(Qt.tiltShift.on=!0,Qt.tiltShift.where=oa);pn.get("bloom")==="off"&&(Qt.bloom.on=!1);pn.get("moonbeams")==="on"&&(Qt.moonbeams=1);const Go=pn.get("fx");(Go==="pixel"||Go==="smooth")&&(Qt.fx=Go);const Zt=O0(as,Qt),dd=[30,60,120,300,600,0];function fd(n){Qt.party.interval=n>0?n:1e9,Zt.party.paused=n===0,Zt.party.nextAt=Zt.clock.time+Qt.party.startDelay+Qt.party.interval,document.querySelectorAll("#waves button").forEach(e=>e.classList.toggle("on",+e.dataset.s===n))}let gc=Qt.party.interval;try{const n=localStorage.getItem("witch.wave");n!==null&&dd.includes(+n)&&(gc=+n)}catch{}const Ho=pn.get("wave");Ho!==null&&(gc=Ho==="off"?0:Math.max(0,+Ho||0));const Wb=document.getElementById("game"),Wo=kb(),qn=new Nb(Wb,Zt,{...Wo,pixel:Qt.pixelSize,treeSize:Wo.treeSize*Qt.treeHeight,crownWidth:Wo.crownWidth*Qt.crownWidth/Qt.treeHeight});qn.debugCull=pn.get("debug")==="cull";const Jh=Number(pn.get("scenery"));pn.has("scenery")&&Jh>0&&(qn.sceneryFixed=Jh);const Qs=new $m;document.getElementById("next-wave").addEventListener("pointerdown",n=>{n.preventDefault(),Qs.touch.nextWave=!0});document.getElementById("pause-waves").addEventListener("pointerdown",n=>{n.preventDefault(),Qs.touch.pauseWaves=!0});zb(document.body,Qs.touch);qn.rulers.on=pn.has("debug");const pd=()=>{qn.rulers.on=!qn.rulers.on};window.addEventListener("keydown",n=>{n.code==="KeyG"&&!n.repeat&&pd()});document.getElementById("rulers").addEventListener("pointerdown",n=>{n.preventDefault(),pd()});const md=document.getElementById("help");try{localStorage.getItem("witch.help")==="off"&&md.classList.add("off")}catch{}window.addEventListener("keydown",n=>{if(n.code!=="KeyH"||n.repeat)return;const e=md.classList.toggle("off");try{localStorage.setItem("witch.help",e?"off":"on")}catch{}});document.getElementById("version").textContent="v119 · 153017a";const gd=document.getElementById("news"),Vb="v119 · 153017a".split(" ")[0],Yb=n=>n.replace(/[&<>]/g,e=>({"&":"&amp;","<":"&lt;",">":"&gt;"})[e]);gd.innerHTML="<b>What's new</b>"+Hb.entries.slice(0,3).map(n=>`<div>${n.version===null?`${Vb} (this version)`:"v"+n.version}</div><ul>${n.items.map(e=>`<li>${Yb(e)}</li>`).join("")}</ul>`).join("");gd.addEventListener("pointerdown",n=>n.stopPropagation());const Xb=document.getElementById("seed");Xb.innerHTML=`seed <a href="?seed=${as}">${as}</a>`;const kl=document.getElementById("debug"),xc=document.getElementById("start"),xd=document.getElementById("debug-buttons"),vc=document.getElementById("wave"),Kb=vc.querySelector(".fill"),qb=vc.querySelector(".label");let Fi=pn.has("debug");kl.classList.toggle("on",Fi);xd.classList.toggle("on",Fi);const vd=()=>qn.resize(window.innerWidth,window.innerHeight);window.addEventListener("resize",vd);vd();let Ka=!1;requestAnimationFrame(()=>setTimeout(async()=>{await qn.prepare(),Ka=!0,xc.classList.remove("loading")},0));let Qh=null;function Md(){if(!Ka||!Zt.clock.paused)return!1;try{Qh??=new AudioContext,Qh.resume()}catch{}return Zt.clock.paused=!1,xc.style.display="none",Qs.clearPresses(),!0}Qs.onAny=Md;xc.addEventListener("pointerdown",n=>{n.preventDefault(),Md()});const _d=document.getElementById("waves");_d.innerHTML="waves every "+dd.map(n=>`<button type="button" data-s="${n}">${n===0?"off":n<60?n+" s":n/60+" min"}</button>`).join("");_d.addEventListener("pointerdown",n=>{n.stopPropagation();const e=n.target.closest("button");if(!e)return;const t=+e.dataset.s;fd(t);try{localStorage.setItem("witch.wave",String(t))}catch{}});fd(gc);document.addEventListener("visibilitychange",()=>{document.hidden&&(_a=0)});let _a=0,jh=60,Vo=0,la=0;function bd(n){requestAnimationFrame(bd);const e=_a?(n-_a)/1e3:0;_a=n,Vo++,la+=e,la>=.5&&(jh=Vo/la,Vo=0,la=0);const t=Qs.read();if(t.debug&&(Fi=!Fi,kl.classList.toggle("on",Fi),xd.classList.toggle("on",Fi)),qn.debugReadouts=Fi,U0(Zt,t,e),!Ka)return;const i=N0(Zt.party,Zt.map,Zt.clock.time);Kb.style.height=`${(1-i.gone)*100}%`;const s=Qt.party.interval>=1e9?"waves off":i.left>=60?`${Math.floor(i.left/60)}:${String(Math.ceil(i.left)%60).padStart(2,"0")}`:`${Math.ceil(i.left)} s`;if(qb.textContent=`wave ${Zt.party.wave} · ${Zt.party.areas.size} areas · ${s}`,vc.classList.toggle("paused",Zt.party.paused),qn.render(Zt.clock.time),Fi){const r=Zt.witch,a=qn.stats;kl.textContent=[`fps    ${jh.toFixed(0)}`,`seed   ${as}`,`area   ${Au(Zt)}`,`mode   ${r.mode}`,`at     ${r.x.toFixed(0)}, ${r.z.toFixed(0)} m   zoom ${Zt.camera.zoomStep}`,`trees  ${a.trees}  bushes ${a.bushes}  creatures ${a.creatures}`,`budget scenery to ${a.sceneryRadius.toFixed(0)} m (${a.scenery})  gameplay ${a.gameplay}  dropped ${a.dropped}`,`draws  ${a.drawCalls}  art queued ${a.pendingArt}  ground tiles ${a.pendingGround}`].join(`
`)}}requestAnimationFrame(bd);window.witch={game:Zt,view:qn,areaUnderWitch:()=>Au(Zt),areaTypeId:n=>xn[n].id,spriteUp:()=>Gt.uUp.value,get ready(){return Ka}};
