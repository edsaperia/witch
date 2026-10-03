(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))n(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const a of s.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function t(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(r){if(r.ep)return;r.ep=!0;const s=t(r);fetch(r.href,s)}})();function vi(i){let e=i>>>0;return()=>{e=e+1831565813>>>0;let t=e;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}}function We(i,e,t){let n=Math.imul(i|0,374761393)^Math.imul(e|0,668265263)^Math.imul(t|0,2147483647);return n=Math.imul(n^n>>>13,1274126177),((n^n>>>16)>>>0)/4294967296}function dr(i,e,t){const n=Math.floor(i),r=Math.floor(e),s=i-n,a=e-r,o=s*s*(3-2*s),c=a*a*(3-2*a),l=We(n,r,t),h=We(n+1,r,t),d=We(n,r+1,t),u=We(n+1,r+1,t);return l+(h-l)*o+(d-l)*c+(l-h-d+u)*o*c}const Pn=(i,e,t)=>i+(e-i)*t,_i=(i,e,t)=>Math.min(t,Math.max(e,i)),ln=i=>{const e=_i(i,0,1);return e*e*(3-2*e)};function zu(i,e,t,n){const r=Math.max(1,i.camera.zoomSteps),s=_i(Math.round(i.camera.startZoom),0,r-1),a=r>1?s/(r-1):0;return{zoomStep:s,zoom:a,tx:e,ty:t,tz:n,vx:0,vy:0,vz:0,ax:0,az:0,lift:0}}function ba(i,e,t,n,r){const s=n*r,a=Math.exp(-s),o=i-t,c=e+n*o;return[t+(o+c*r)*a,(e-n*c*r)*a]}function ku(i,e,t,n,r,s,a){const o=a.camera,c=Math.max(1,o.zoomSteps),l=_i(i.zoomStep+Math.sign(e),0,c-1),h=c>1?l/(c-1):0;let d=n.x*o.lookAhead,u=n.z*o.lookAhead;const p=Math.hypot(d,u);p>o.lookAheadMax&&(d*=o.lookAheadMax/p,u*=o.lookAheadMax/p);const g=1-Math.exp(-o.lookAheadEase*s),v=i.ax+(d-i.ax)*g,x=i.az+(u-i.az)*g,[m,_]=ba(i.tx,i.vx,t.x+v,o.follow,s),[M,S]=ba(i.ty,i.vy,t.y,o.follow,s),[w,E]=ba(i.tz,i.vz,t.z+x,o.follow,s),L=i.zoom+(h-i.zoom)*(1-Math.exp(-o.zoomEase*s)),y=i.lift+(r-i.lift)*(1-Math.exp(-o.liftEase*s));return{zoomStep:l,zoom:L,tx:m,ty:M,tz:w,vx:_,vy:S,vz:E,ax:v,az:x,lift:_i(y,0,1)}}function xh(i,e,t){const n=t.camera.ground,r=t.camera.treetop,s=ln(e),a=Pn(Pn(n.angleIn,n.angleOut,i.zoom),Pn(r.angleIn,r.angleOut,i.zoom),s),o=Pn(Pn(n.distanceIn,n.distanceOut,i.zoom),Pn(r.distanceIn,r.distanceOut,i.zoom),s),c=a*Math.PI/180;return{angle:a,distance:o,x:i.tx,y:i.ty+Math.sin(c)*o,z:i.tz+Math.cos(c)*o,tx:i.tx,ty:i.ty,tz:i.tz}}const Gu=.1,Hu=()=>({time:0,paused:!0});function Wu(i,e){if(i.paused||!(e>0))return 0;const t=Math.min(Gu,e);return i.time+=t,t}const Vu={moor:{treeDensity:.65},"fern-forest":{treeDensity:1},"muddy-forest":{treeDensity:1},"stone-shrine":{treeDensity:.6},"tangly-forest":{treeDensity:1},"wispy-forest":{treeDensity:1},"hazel-forest":{treeDensity:1},garden:{treeDensity:.75},"twiggy-forest":{treeDensity:1},ancient:{treeDensity:.9},norway:{treeDensity:1},"alder-forest":{treeDensity:.9},meadow:{treeDensity:.55},"old-oaks":{treeDensity:.9},"berry-thicket":{treeDensity:1},wetland:{treeDensity:.75},stream:{treeDensity:.8},"rocky-slope":{treeDensity:.75},bog:{treeDensity:.7},deadwood:{treeDensity:.8},"cave-mouth":{treeDensity:.75},grassland:{treeDensity:.55},"beaver-pond":{treeDensity:.8},"log-pile":{treeDensity:.7},heath:{treeDensity:.65},"old-pinewood":{treeDensity:1},ravine:{treeDensity:.75},"bluebell-glade":{treeDensity:.8},"holly-thicket":{treeDensity:1},"honeysuckle-tangle":{treeDensity:1}},Xu={types:Vu};function cl(i,e){if(typeof document<"u"){const t=document.createElement("canvas");return t.width=i,t.height=e,t}return new OffscreenCanvas(i,e)}function la(i){let e=i>>>0;return()=>{e=e+1831565813>>>0;let t=e;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}}const be=(i,e,t)=>e+(t-e)*i(),vh=(i,e)=>e[Math.floor(i()*e.length)];function Rt(i,e,t){let n=Math.imul(i|0,374761393)^Math.imul(e|0,668265263)^Math.imul(t|0,2147483647);return n=Math.imul(n^n>>>13,1274126177),((n^n>>>16)>>>0)/4294967296}function mi(i,e,t){const n=Math.floor(i),r=Math.floor(e),s=i-n,a=e-r,o=s*s*(3-2*s),c=a*a*(3-2*a),l=Rt(n,r,t),h=Rt(n+1,r,t),d=Rt(n,r+1,t),u=Rt(n+1,r+1,t);return l+(h-l)*o+(d-l)*c+(l-h-d+u)*o*c}function ge(i,e,t){i=(i%1+1)%1,e=Math.max(0,Math.min(1,e)),t=Math.max(0,Math.min(1,t));const n=Math.floor(i*6),r=i*6-n,s=t*(1-e),a=t*(1-r*e),o=t*(1-(1-r)*e),[c,l,h]=[[t,o,s],[a,t,s],[s,t,o],[s,a,t],[o,s,t],[t,s,a]][n%6];return[Math.round(c*255),Math.round(l*255),Math.round(h*255)]}const f={BODY:1,BELLY:2,ACCENT:3,EYE:4,GLINT:5,TRUNK:6,LEAF:7,LEAF2:8,CLOTH:9,SKIN:10,HAIR:11,BROOM:12,STRAW:13,BODY2:14,BARK2:15,FLOWER:16,PUPIL:17,MAGIC:18,BARKD:19,LINE:20,IRIS:21,MAGIC2:22,NOSE:23,EAR:24,BODY3:25,LEAF3:26,BARKL:27,HAT:28,PHONES:29,TOP:30,JACKET:31,JEANS:32,SHOES:33,WATER:34,STONE:35,STONED:36,MOSS:37,CRYSTAL:38,RUNE:39,GLOW:40,WOOD:41,COLLAR:42,HAT1:43,HAT2:44,POM:45,SHADES:46,FRAME:47,SHOE:48,SOLE:49,WOKEN:50,WEB:51},wa=4;function _h(i,e,t,n=.12){const r=(s,a,o,c)=>{const l=o-s,h=c-a,d=Math.max(0,Math.min(1,((i-s)*l+(e-a)*h)/(l*l+h*h)));return Math.hypot(i-s-l*d,e-a-h*d)<n};switch((t%wa+wa)%wa){case 0:return r(.5,.08,.5,.92)||r(.5,.1,.18,.4)||r(.5,.1,.82,.4);case 1:return r(.5,.08,.5,.92)||r(.5,.5,.18,.18)||r(.5,.5,.82,.18);case 2:return r(.2,.1,.8,.9)||r(.8,.1,.2,.9)||r(.5,.08,.5,.92);default:return r(.3,.08,.3,.92)||r(.3,.12,.75,.35)||r(.75,.35,.3,.55)||r(.3,.55,.78,.92)}}const Yu=new Set([f.GLINT,f.MAGIC,f.MAGIC2,f.RUNE,f.GLOW,f.COLLAR,f.WOKEN]);function Jl(i,e=!0,t=8){const n=i.length,r=[];if(n<3)return i.slice();const s=o=>e?i[(o+n)%n]:i[Math.max(0,Math.min(n-1,o))],a=e?n:n-1;for(let o=0;o<a;o++){const c=s(o-1),l=s(o),h=s(o+1),d=s(o+2),u=Math.max(2,Math.ceil(Math.hypot(h[0]-l[0],h[1]-l[1])/1.5),t);for(let p=0;p<u;p++){const g=p/u,v=g*g,x=v*g;r.push([0,1].map(m=>.5*(2*l[m]+(-c[m]+h[m])*g+(2*c[m]-5*l[m]+4*h[m]-d[m])*v+(-c[m]+3*l[m]-3*h[m]+d[m])*x)))}}return e||r.push(i[n-1]),r}function qu(i,{cap:e=1,capEnd:t=e}={}){const n=[],r=[],s=i.length;for(let c=0;c<s;c++){const l=i[Math.max(0,c-1)],h=i[Math.min(s-1,c+1)];let d=h[0]-l[0],u=h[1]-l[1];const p=Math.hypot(d,u)||1;d/=p,u/=p;const g=i[c][2]/2;n.push([i[c][0]-u*g,i[c][1]+d*g]),r.push([i[c][0]+u*g,i[c][1]-d*g])}const a=(c,l,h,d)=>{let u=c[0]-l[0],p=c[1]-l[1];const g=Math.hypot(u,p)||1;return[c[0]+u/g*h/2*d,c[1]+p/g*h/2*d]};return[...n,a(i[s-1],i[s-2],i[s-1][2],t),...r.reverse(),a(i[0],i[1],i[0][2],e)]}const At=(i,e)=>[i[0]+e[0],i[1]+e[1]],ti=(i,e,t)=>[i[0]+(e[0]-i[0])*t,i[1]+(e[1]-i[1])*t];function ca(i,e,t,n,r,s=1){const a=[];for(let o=0;o<i.length;o++){if(a.push(i[o]),o<e||o>=t)continue;const c=i[o],l=i[(o+1)%i.length];let h=l[0]-c[0],d=l[1]-c[1];const u=Math.hypot(h,d)||1,p=d/u*s,g=-h/u*s;for(let v=1;v<=n;v++){const x=(v-.5)/n,m=ti(c,l,x),_=[m[0]+p*r-h/u*r*.5,m[1]+g*r-d/u*r*.5];a.push(ti(c,l,x-.45/n),_,ti(c,l,x+.35/n))}}return a}function Ql(i,e,t){const n=new Uint8Array(i*e);let r=1/0,s=-1/0;for(const a of t)r=Math.min(r,a[1]),s=Math.max(s,a[1]);for(let a=Math.max(0,Math.floor(r));a<=Math.min(e-1,Math.ceil(s));a++){const o=a+.5,c=[];for(let l=0,h=t.length-1;l<t.length;h=l++){const[d,u]=t[l],[p,g]=t[h];u>o!=g>o&&c.push(d+(o-u)/(g-u)*(p-d))}c.sort((l,h)=>l-h);for(let l=0;l+1<c.length;l+=2)for(let h=Math.max(0,Math.ceil(c[l]-.5));h<=Math.min(i-1,Math.floor(c[l+1]-.5));h++)n[a*i+h]=1}return n}function Ku(i,e,t){const r=new Float32Array(i*e),s=new Float32Array(i*e);for(let c=0;c<i*e;c++)t[c]&&(r[c]=1e4,s[c]=1e4);const a=c=>r[c]*r[c]+s[c]*s[c],o=(c,l,h,d,u)=>{const p=l+d,g=h+u;let v,x;if(p<0||g<0||p>=i||g>=e)v=d,x=u;else{const m=g*i+p;v=r[m]+d,x=s[m]+u}v*v+x*x<a(c)&&(r[c]=v,s[c]=x)};for(let c=0;c<e;c++){for(let l=0;l<i;l++){const h=c*i+l;t[h]&&(o(h,l,c,-1,0),o(h,l,c,0,-1),o(h,l,c,-1,-1),o(h,l,c,1,-1))}for(let l=i-1;l>=0;l--){const h=c*i+l;t[h]&&o(h,l,c,1,0)}}for(let c=e-1;c>=0;c--){for(let l=i-1;l>=0;l--){const h=c*i+l;t[h]&&(o(h,l,c,1,0),o(h,l,c,0,1),o(h,l,c,1,1),o(h,l,c,-1,1))}for(let l=0;l<i;l++){const h=c*i+l;t[h]&&o(h,l,c,-1,0)}}return{vx:r,vy:s}}class cn{constructor(e,t,n=1){this.sx=n,this.w=Math.round(e*n),this.h=t|0,this.m=new Uint8Array(this.w*this.h),this.n=new Float32Array(this.w*this.h*3),this.g=new Uint8Array(this.w*this.h)}inb(e,t){return e>=0&&t>=0&&e<this.w&&t<this.h}get(e,t){return e|=0,t|=0,this.inb(e,t)?this.m[t*this.w+e]:0}put(e,t,n,r=0,s=0,a=1){this.px(e*this.sx,t,n,r,s,a)}px(e,t,n,r=0,s=0,a=1){if(e=Math.floor(e),t=Math.floor(t),!this.inb(e,t))return;const o=t*this.w+e;this.m[o]=n,this.n[o*3]=r,this.n[o*3+1]=s,this.n[o*3+2]=a}recolour(e,t,n){e=Math.floor(e),t=Math.floor(t),this.inb(e,t)&&this.m[t*this.w+e]&&(this.m[t*this.w+e]=n)}ellipse(e,t,n,r,s,a={}){const{onlyOn:o,density:c=1,noise:l=0,seed:h=0,round:d=1}=a;e*=this.sx,n*=this.sx;for(let u=Math.max(0,Math.floor(t-r-1));u<Math.min(this.h,t+r+1);u++)for(let p=Math.max(0,Math.floor(e-n-1));p<Math.min(this.w,e+n+1);p++){const g=(p+.5-e)/n,v=(u+.5-t)/r,x=g*g+v*v;if(x>1)continue;const m=u*this.w+p;if(o&&!o.has(this.m[m]))continue;if(c<1){const w=l?mi(p/3.2,u/3.2,h)*l+(1-l)*.5:.5;if(Rt(p,u,h+77)>c*(.4+w*1.2)*(1.15-x*.5))continue}const _=g*d,M=v*d,S=Math.hypot(_,M,Math.sqrt(Math.max(0,1-x))+.15);this.px(p,u,s,_/S,M/S,(Math.sqrt(Math.max(0,1-x))+.15)/S)}}line(e,t,n,r,s,a,o,c=1){e*=this.sx,n*=this.sx;const l=Math.max(1,Math.ceil(Math.hypot(n-e,r-t)));for(let h=0;h<=l;h++){const d=h/l,u=e+(n-e)*d,p=t+(r-t)*d,g=Math.max(.5,(s+(a-s)*d)/2);for(let v=Math.floor(p-g);v<=p+g;v++)for(let x=Math.floor(u-g);x<=u+g;x++){const m=(x+.5-u)/g,_=(v+.5-p)/g;if(m*m+_*_>1)continue;const M=m*c,S=Math.hypot(M,_*.3,1);this.px(x,v,o,M/S,_*.3/S,1/S)}}}tri(e,t){let[[n,r],[s,a],[o,c]]=e;n*=this.sx,s*=this.sx,o*=this.sx;const l=(g,v,x,m,_,M)=>(g-_)*(m-M)-(x-_)*(v-M),h=Math.max(0,Math.floor(Math.min(n,s,o))),d=Math.min(this.w,Math.ceil(Math.max(n,s,o))),u=Math.max(0,Math.floor(Math.min(r,a,c))),p=Math.min(this.h,Math.ceil(Math.max(r,a,c)));for(let g=u;g<p;g++)for(let v=h;v<d;v++){const x=v+.5,m=g+.5,_=l(x,m,n,r,s,a),M=l(x,m,s,a,o,c),S=l(x,m,o,c,n,r);(_<0||M<0||S<0)&&(_>0||M>0||S>0)||this.px(v,g,t,0,-.2,.98)}}shape(e,t,n={}){return this.fillMask(Ql(this.w,this.h,Jl(e,!0,n.per||6)),t,n)}limb(e,t,n={}){return this.shape(qu(e,n),t,n)}fillMask(e,t,{group:n=1,line:r=!1,depth:s=0,round:a=1,onlyOn:o=null,keepNormals:c=!1,tilt:l=[0,0],lineMat:h=f.LINE}={}){const{w:d,h:u}=this;if(o)for(let x=0;x<d*u;x++)e[x]&&!o.has(this.m[x])&&(e[x]=0);const{vx:p,vy:g}=Ku(d,u,e);let v=s;if(!v){for(let x=0;x<d*u;x++)e[x]&&(v=Math.max(v,Math.hypot(p[x],g[x])));v=Math.max(1.5,Math.min(v*.9,2.5+v*.35))}for(let x=0;x<u;x++)for(let m=0;m<d;m++){const _=x*d+m;if(!e[_])continue;if(c){this.m[_]=t;continue}const M=Math.hypot(p[_],g[_]),S=Math.min(1,Math.max(0,(M-.5)/v)),w=Math.min(2.6,(1-S)/Math.sqrt(Math.max(.02,1-(1-S)*(1-S))))*a;let E=p[_]/(M||1)*w+l[0],L=g[_]/(M||1)*w+l[1];const y=Math.hypot(E,L,1);this.m[_]=t,this.n[_*3]=E/y,this.n[_*3+1]=L/y,this.n[_*3+2]=1/y}if(r&&!c){const x=[];for(let m=0;m<u;m++)for(let _=0;_<d;_++){const M=m*d+_;if(e[M])for(const[S,w]of[[1,0],[-1,0],[0,1],[0,-1]]){const E=_+S,L=m+w;if(E<0||L<0||E>=d||L>=u)continue;const y=L*d+E;if(!e[y]&&this.m[y]&&this.g[y]!==n&&this.m[y]!==h){x.push(M);break}}}for(const m of x)this.m[m]=h}if(!c)for(let x=0;x<d*u;x++)e[x]&&(this.g[x]=n);return e}mark(e,t,n,r={}){return this.fillMask(Ql(this.w,this.h,Jl(e,!0,6)),t,{...r,onlyOn:new Set(n),keepNormals:!0})}grid(e,t,n=0,r=0,{round:s=1,flipX:a=!1}={}){const o=Math.max(...e.map(h=>h.length)),c=new Uint8Array(this.w*this.h),l=new Map;e.forEach((h,d)=>[...h].forEach((u,p)=>{const g=t[u];if(!g)return;const v=n+(a?o-1-p:p),x=r+d;this.inb(v,x)&&(c[x*this.w+v]=1,l.set(x*this.w+v,g))})),this.fillMask(c,f.BODY,{round:s,depth:2.5});for(const[h,d]of l)this.m[h]=d}}function gi(i,e,t,n=t.outline,r=cl){const{w:s,h:a}=i,o=()=>r(s,a),c=o(),l=o(),h=o(),d=c.getContext("2d").createImageData(s,a),u=l.getContext("2d").createImageData(s,a),p=h.getContext("2d").createImageData(s,a),g=n==="none"?null:n==="dark"?[22,18,30]:"tint";for(let v=0;v<a;v++)for(let x=0;x<s;x++){const m=v*s+x,_=i.m[m],M=m*4;if(!_){if(!g)continue;const y=[i.get(x+1,v),i.get(x-1,v),i.get(x,v+1),i.get(x,v-1)].find(D=>D);if(!y)continue;const A=g==="tint"?(e[y]||[0,0,0]).map(D=>D*.35|0):g;d.data.set([...A,255],M),u.data.set([128,128,255,255],M),p.data.set([128,128,255,255],M);continue}let S=e[_];_===f.LINE&&!S&&(S=g==="tint"||!g?(e[f.BODY2]||[0,0,0]).map(y=>y*.55|0):g),S=S||[255,0,255],d.data.set([...S,Yu.has(_)?254:255],M);const w=i.n[m*3],E=i.n[m*3+1],L=i.n[m*3+2];u.data.set([w*127+128,E*127+128,L*255,255],M),p.data.set([-w*127+128,E*127+128,L*255,255],M)}return c.getContext("2d").putImageData(d,0,0),l.getContext("2d").putImageData(u,0,0),h.getContext("2d").putImageData(p,0,0),{A:c,N:l,NF:h,w:s,h:a}}const xi=i=>{const e=Math.hypot(i[0],i[1],i[2])||1;return[i[0]/e,i[1]/e,i[2]/e]},Xr=(i,e)=>[i[1]*e[2]-i[2]*e[1],i[2]*e[0]-i[0]*e[2],i[0]*e[1]-i[1]*e[0]],It=(i,e)=>i[0]*e[0]+i[1]*e[1]+i[2]*e[2],wn=(i,e)=>[i[0]-e[0],i[1]-e[1],i[2]-e[2]],C={add:(i,e)=>[i[0]+e[0],i[1]+e[1],i[2]+e[2]],sub:wn,mul:(i,e)=>[i[0]*e,i[1]*e,i[2]*e],lerp:(i,e,t)=>[i[0]+(e[0]-i[0])*t,i[1]+(e[1]-i[1])*t,i[2]+(e[2]-i[2])*t],norm:xi,cross:Xr,dot:It};function jl(i,e=[0,1,0]){const t=xi(i);let n=Xr(e,t);Math.hypot(...n)<1e-4&&(n=Xr([0,0,1],t)),n=xi(n);const r=Xr(t,n);return[t,r,n]}function Mh(i,e){const t=It(i,e.axes[0]),n=It(i,e.axes[1]),r=It(i,e.axes[2]),[s,a,o]=e.r,c=Math.hypot(t/s,n/a,r/o),l=Math.hypot(t/(s*s),n/(a*a),r/(o*o));return l>1e-9?c*(c-1)/l:-Math.min(s,a,o)}function Sh(i,e){const{ba:t,l2:n,rr:r,a2:s,il2:a,r1:o,r2:c}=e,l=It(i,t),h=l-n,d=[i[0]*n-t[0]*l,i[1]*n-t[1]*l,i[2]*n-t[2]*l],u=It(d,d),p=l*l*n,g=h*h*n,v=Math.sign(r)*r*r*u;return Math.sign(h)*s*g>v?Math.sqrt(u+g)*a-c:Math.sign(l)*s*p<v?Math.sqrt(u+p)*a-o:(Math.sqrt(u*s*a)+l*r)*a-o}function yh(i,e){const t=Math.abs(It(i,e.axes[0]))-e.h[0]+e.round,n=Math.abs(It(i,e.axes[1]))-e.h[1]+e.round,r=Math.abs(It(i,e.axes[2]))-e.h[2]+e.round;return Math.hypot(Math.max(t,0),Math.max(n,0),Math.max(r,0))+Math.min(Math.max(t,n,r),0)-e.round}const $u=(i,e)=>e*(Math.sin(i[0]*23+i[1]*7)*Math.sin(i[1]*19-i[2]*11)+.5*Math.sin(i[2]*41+i[0]*29)),ec=(i,e)=>i.type==="ell"?Mh(wn(e,i.cw),i):i.type==="box"?yh(wn(e,i.cw),i):Sh(wn(e,i.aw),i),Lr=(i,e)=>i.rough?ec(i,e)+$u(e,i.rough):ec(i,e);class Xe{constructor({blend:e=.07}={}){this.parts=[],this.flats=[],this.blend=e,this.anchors={feet:[]}}ell(e,t,n,r={}){const s=r.axes||(r.dir?jl(r.dir,r.up):[[1,0,0],[0,1,0],[0,0,1]]);return this.parts.push({type:"ell",c:e,r:t,axes:s,mat:n,group:r.group??1,extra:!!r.extra,paint:r.paint,rough:r.rough,cut:!!r.cut}),this}box(e,t,n,r={}){const s=r.axes||(r.dir?jl(r.dir,r.up):[[1,0,0],[0,1,0],[0,0,1]]);return this.parts.push({type:"box",c:e,h:t,round:Math.min(r.round??.02,...t),axes:s,mat:n,group:r.group??1,extra:!!r.extra,paint:r.paint,rough:r.rough,cut:!!r.cut}),this}seg(e,t,n,r,s,a={}){return this.parts.push({type:"cone",a:e,b:t,r1:n,r2:r,mat:s,group:a.group??1,extra:!!a.extra,paint:a.paint,rough:a.rough,cut:!!a.cut}),this}chain(e,t,n={}){for(let r=0;r+1<e.length;r++)this.seg(e[r].slice(0,3),e[r+1].slice(0,3),e[r][3],e[r+1][3],t,n);return this}flat(e,t,n,r,s,a,o={}){return this.flats.push({c:e,u:xi(t),v:xi(n),su:r,sv:s,mask:a,group:o.group??30,extra:!!o.extra,bend:o.bend??.35}),this}field(e){let t=1/0;for(const n of this.parts){if(n.extra||n.cut)continue;let r;if(n.type==="ell")r=Mh(wn(e,n.c),n);else if(n.type==="box")r=yh(wn(e,n.c),n);else{const s=wn(n.b,n.a),a=Math.max(1e-9,It(s,s)),o=n.r1-n.r2;r=Sh(wn(e,n.a),{ba:s,l2:a,rr:o,a2:a-o*o,il2:1/a,r1:n.r1,r2:n.r2})}r<t&&(t=r)}return t}static surface(e,t,n){const r=1/Math.hypot(n[0]/t[0],n[1]/t[1],n[2]/t[2]);return[e[0]+n[0]*r,e[1]+n[1]*r,e[2]+n[2]*r]}}const tc={towards:.6,away:-.6},Zu=.52;function gn(i,{height:e,scale:t,facing:n="towards",yaw:r=tc[n]??tc.towards,pitch:s=Zu,lineGap:a=.12}={}){const o=Math.cos(r),c=Math.sin(r),l=Math.cos(s),h=Math.sin(s),d=Y=>[Y[0]*o-Y[2]*c,Y[1],Y[0]*c+Y[2]*o],u=Y=>[Y[0]*o+Y[2]*c,Y[1],-Y[0]*c+Y[2]*o],p=[0,-h,-l],g=[0,l,-h],v=[1,0,0],x=[0,h,l],m=i.blend,_=i.parts.map(Y=>{if(Y.type==="ell"){const Fe=d(Y.c),qe=Y.axes.map(d),Ye=Math.max(...Y.r);return{...Y,cw:Fe,axes:qe,bc:Fe,br:Ye+(Y.rough||0)*1.5}}if(Y.type==="box"){const Fe=d(Y.c),qe=Y.axes.map(d);return{...Y,cw:Fe,axes:qe,bc:Fe,br:Math.hypot(...Y.h)+(Y.rough||0)*1.5}}const he=d(Y.a),ae=d(Y.b),Ee=wn(ae,he),Ze=Math.max(1e-9,It(Ee,Ee)),Ce=Y.r1-Y.r2;return{...Y,aw:he,ba:Ee,l2:Ze,rr:Ce,a2:Ze-Ce*Ce,il2:1/Ze,bc:C.lerp(he,ae,.5),br:Math.sqrt(Ze)/2+Math.max(Y.r1,Y.r2)}}),M=i.flats.map(Y=>{const he=d(Y.c),ae=d(Y.u),Ee=d(Y.v);return{...Y,cw:he,uw:ae,vw:Ee,nw:xi(Xr(ae,Ee)),bc:he,br:Math.hypot(Y.su,Y.sv)}}),S=[..._,...M],w=Y=>{const he=It(Y.bc,v),ae=It(Y.bc,g),Ee=Y.br+(Y.uw?0:m);return[he-Ee,he+Ee,ae-Ee,ae+Ee]};for(const Y of S)[Y.x0,Y.x1,Y.u0,Y.u1]=w(Y);const E=S.filter(Y=>!Y.extra&&!Y.cut),L=Math.min(...E.map(Y=>Y.u0+(Y.uw?0:m))),y=Math.max(...E.map(Y=>Y.u1-(Y.uw?0:m))),A=t??e/Math.max(1e-6,y-L),D=Math.min(...S.map(Y=>Y.x0)),R=Math.max(...S.map(Y=>Y.x1)),U=Math.min(...S.map(Y=>Y.u0)),N=Math.max(...S.map(Y=>Y.u1)),P=Math.ceil((R-D)*A)+4,F=Math.ceil((N-U)*A)+2,O=new cn(P,F),V=new Float32Array(P*F).fill(1/0),Q=new Int16Array(P*F).fill(-1),X=8,te=Math.ceil(P/X),B=Math.ceil(F/X),ne=Array.from({length:te*B},()=>[]);S.forEach((Y,he)=>{const ae=Math.max(0,Math.floor((Y.x0-D)*A/X)),Ee=Math.min(te-1,Math.floor(((Y.x1-D)*A+2)/X)),Ze=Math.max(0,Math.floor((N-Y.u1)*A/X)),Ce=Math.min(B-1,Math.floor(((N-Y.u0)*A+1)/X));for(let Fe=Ze;Fe<=Ce;Fe++)for(let qe=ae;qe<=Ee;qe++)ne[Fe*te+qe].push(he)});const le=.25/A,_e=(Y,he)=>{const ae=Math.max(m-Math.abs(Y-he),0)/m;return Math.min(Y,he)-ae*ae*m*.25};for(let Y=0;Y<F;Y++)for(let he=0;he<P;he++){const ae=ne[Math.floor(Y/X)*te+Math.floor(he/X)];if(!ae.length)continue;const Ee=D+(he+.5-1)/A,Ze=N-(Y+.5)/A,Ce=C.add(C.add(C.mul(v,Ee),C.mul(g,Ze)),C.mul(x,50));let Fe=1/0,qe=-1/0;const Ye=[],St=[];for(const Je of ae){const ze=S[Je],I=wn(Ce,ze.bc),b=It(I,p),z=ze.br+(ze.uw?0:m),q=It(I,I)-z*z,Z=b*b-q;if(Z<0)continue;if(ze.uw){St.push(ze);continue}if(ze.cut){Ye.push(ze);continue}const ce=Math.sqrt(Z);Fe=Math.min(Fe,-b-ce),qe=Math.max(qe,-b+ce),Ye.push(ze)}let Dt=1/0,Xt=-1,xt=0,yt=null;if(Ye.length){const Je=new Map;for(const b of Ye){let z=Je.get(b.group);z||Je.set(b.group,z=[]),z.push(b)}const ze=(b,z)=>{let q=1/0;for(const Z of b)Z.cut||(q=q===1/0?Lr(Z,z):_e(q,Lr(Z,z)));for(const Z of b)Z.cut&&(q=Math.max(q,-Lr(Z,z)));return q};let I=Math.max(0,Fe);for(let b=0;b<96&&I<qe;b++){const z=C.add(Ce,C.mul(p,I));let q=1/0,Z=null;for(const[ce,ue]of Je){const j=ze(ue,z);j<q&&(q=j,Z=ce)}if(q<le){const ce=Je.get(Z),ue=.5/A;yt=xi([ze(ce,[z[0]+ue,z[1],z[2]])-ze(ce,[z[0]-ue,z[1],z[2]]),ze(ce,[z[0],z[1]+ue,z[2]])-ze(ce,[z[0],z[1]-ue,z[2]]),ze(ce,[z[0],z[1],z[2]+ue])-ze(ce,[z[0],z[1],z[2]-ue])]);let j=ce[0],ie=1/0;for(const de of ce){if(de.cut)continue;const Le=Lr(de,z);Le<ie&&(ie=Le,j=de)}for(const de of ce)if(de.cut&&-Lr(de,z)>ie-le*2){j=de;break}Dt=I,Xt=Z,xt=j.paint?j.paint(u(z),j)??j.mat:j.mat;break}I+=Math.max(q*.9,le*.5)}}for(const Je of St){const ze=It(p,Je.nw);if(Math.abs(ze)<1e-4)continue;const I=It(wn(Je.cw,Ce),Je.nw)/ze;if(I>=Dt)continue;const b=C.add(Ce,C.mul(p,I)),z=wn(b,Je.cw),q=It(z,Je.uw)/Je.su,Z=It(z,Je.vw)/Je.sv;if(Math.abs(q)>1||Math.abs(Z)>1)continue;const ce=Je.mask(q,Z);if(!ce)continue;let ue=ze>0?C.mul(Je.nw,-1):Je.nw;ue=xi(C.add(ue,C.add(C.mul(Je.uw,q*Je.bend),C.mul(Je.vw,Z*Je.bend*.5)))),Dt=I,Xt=Je.group,xt=ce,yt=ue}if(!yt||!xt)continue;const G=Y*P+he;V[G]=Dt,Q[G]=Xt,O.px(he,Y,xt,It(yt,v),-It(yt,g),It(yt,x))}const Ie=[];for(let Y=0;Y<F;Y++)for(let he=0;he<P;he++){const ae=Y*P+he;if(O.m[ae])for(const[Ee,Ze]of[[1,0],[-1,0],[0,1],[0,-1]]){const Ce=he+Ee,Fe=Y+Ze;if(Ce<0||Fe<0||Ce>=P||Fe>=F)continue;const qe=Fe*P+Ce;if(O.m[qe]&&Q[qe]!==Q[ae]&&V[qe]-V[ae]>a){Ie.push(ae);break}}}for(const Y of Ie)[f.EYE,f.GLINT,f.MAGIC,f.MAGIC2,f.NOSE,f.COLLAR,f.WOKEN,f.RUNE,f.GLOW].includes(O.m[Y])||(O.m[Y]=f.LINE);for(let Y=0;Y<F;Y++)for(let he=0;he<P;he++){const ae=Y*P+he;if(O.m[ae]!==f.EYE)continue;const Ee=Y>0&&O.m[ae-P]===f.EYE,Ze=he>0&&O.m[ae-1]===f.EYE,Ce=he+1<P&&O.m[ae+1]===f.EYE&&Y+1<F&&O.m[ae+P]===f.EYE;!Ee&&!Ze&&Ce&&(O.m[ae]=f.GLINT)}let ke=-1;for(let Y=F-1;Y>=0&&ke<0;Y--)for(let he=0;he<P;he++)if(O.m[Y*P+he]){ke=Y;break}const ee=ke>=0&&ke<F-1?F-1-ke:0;if(ke>=0&&ke<F-1){const Y=F-1-ke;for(let he=F-1;he>=0;he--)for(let ae=0;ae<P;ae++){const Ee=he*P+ae,Ze=(he-Y)*P+ae,Ce=he-Y>=0;O.m[Ee]=Ce?O.m[Ze]:0,O.g[Ee]=Ce?O.g[Ze]:0;for(let Fe=0;Fe<3;Fe++)O.n[Ee*3+Fe]=Ce?O.n[Ze*3+Fe]:0}}return O.bodyH=Math.round((y-L)*A),{sp:O,s:A,project:Y=>{const he=d(Y);return[+((he[0]-D)*A+1).toFixed(1),+((N-It(he,g))*A+ee).toFixed(1)]}}}const Nn=(i,e=9,t=.3)=>Rt(Math.floor(i[0]*e),Math.floor(i[1]*e)+Math.floor(i[2]*e)*97,7)<t,Ui={wing:(i,e)=>(t,n)=>{const r=(t+1)/2,s=1-.35*r*r,a=-1+.55*r+.18*Math.abs(Math.sin(r*Math.PI*6));return n>s||n<a?null:n>s-.35*(1-r*.5)?e:Math.floor(r*9)%2?i:e},ear:(i,e=f.EAR,t=f.BODY3)=>(n,r)=>{const s=(r+1)/2,a=.95*Math.sin(Math.PI*Math.min(1,.15+s*.85))*(1-s*.35);return Math.abs(n)>a?null:s>.82?t:Math.abs(n)<a*.5&&s<.7&&s>.12?e:i},flame:(i,e)=>(t,n)=>{const r=(n+1)/2,s=Math.sin(Math.PI*Math.min(1,r*1.1))*(1-r)*1.4;return Math.abs(t)>s?null:Math.abs(t)<s*.45&&r<.6?e:i},membrane:i=>(e,t)=>{const n=(e+1)/2,r=-1+.35*Math.abs(Math.sin(n*Math.PI*3));return t<r||t>1-.2*n?null:i},spotted:(i,e,t)=>(n,r)=>{if(Math.hypot(n,r*1.2)>1)return null;const a=Math.hypot(n-.35,r-.1);return a<.18?t:a<.3?e:i}},Ju={hair:f.HAIR,hat:f.HAT,headphones:f.PHONES,top:f.TOP,jacket:f.JACKET,jeans:f.JEANS,sneakers:f.SHOES,broom:f.BROOM,bristles:f.STRAW,skin:f.SKIN},nc={hair:[.01,.7,.85],hat:[.74,.45,.45],headphones:[.92,.55,.9],top:[.13,.15,.95],jacket:[.72,.45,.7],jeans:[.6,.5,.7],sneakers:[0,0,.95],broom:[.08,.55,.55],bristles:[.12,.55,.9],skin:[.07,.3,.94]};function Qu(i,e=nc){const t={...nc,...e},n={hair:i.hairHue,jacket:i.cloakHue,hat:i.hatHue,top:i.topHue,jeans:i.jeansHue,sneakers:i.shoeHue,headphones:i.phonesHue},r={};for(const[s,a]of Object.entries(Ju)){const[o,c,l]=t[s];r[a]=ge(n[s]??o,c,l)}return r[f.EYE]=[24,18,30],r[f.GLINT]=[255,255,245],r[f.NOSE]=[20,16,24],r[f.MAGIC]=ge(i.glowHue??.13,.5,1),r[f.MAGIC2]=ge(i.glowHue??.13,.15,1),r[f.BELLY]=[245,245,240],r}const ju={rise:.78,descend:-.66,brake:.44};function ed(i){const e=new Xe({blend:.03}),t=i%3,n=.5,r=.05,s=[[0,.02,-.01],[.02,-.01,.02],[-.01,.015,.01]][t],a=g=>n-r*(g/.62);e.seg([-.5,a(-.5),0],[.62,a(.62),0],.022,.018,f.BROOM,{group:2}),e.ell([-.64,a(-.64)+.005,0],[.2,.1,.11],f.STRAW,{dir:[1,r*1.6,0],group:3,paint:g=>g[0]<-.76?f.MAGIC2:g[0]>-.5?f.BROOM:void 0});const o=[-1,1].map(g=>[.5,a(.5)+.03,g*.045]),c=[-1,1].map(g=>[.2,n+.24+s[1],g*.1]);for(const g of[0,1]){const v=g?1:-1,x=v>0?7:5;e.seg(c[g],o[g],.04,.03,f.JACKET,{group:x}),e.ell(o[g],[.035,.03,.035],f.SKIN,{group:x})}const l=[.3+s[0],n+.27+s[1],0],h=[.07,n+.28+s[1]*.5,0],d=[-.15,n+.35+s[2],0];e.ell(h,[.17,.1,.11],f.JACKET,{dir:[1,-.25,0],group:1,paint:g=>g[1]<h[1]-.04&&Math.abs(g[2])<.055?f.TOP:void 0}),e.ell(d,[.11,.08,.1],f.JEANS,{dir:[1,-.3,0],group:1}),e.chain([[...C.add(d,[-.02,.06,0]),.07],[...C.add(d,[-.18,.08+s[0]*2,0]),.05],[...C.add(d,[-.34,.05+s[1]*3,.02]),.025]],f.JACKET,{group:12}),[[[-.32,n+.5+s[1]*2,-.07],[-.46,n+.38+s[0]*2,-.08]],[[-.34,n+.33+s[2]*2,.08],[-.55,n+.44-s[1]*3,.1]]].forEach(([g,v],x)=>{const m=x?6:4,_=C.add(d,[-.04,0,x?.06:-.06]);e.seg(_,g,.055,.045,f.JEANS,{group:m}),e.seg(g,v,.045,.04,f.JEANS,{group:m}),e.ell(C.add(v,[-.05,0,0]),[.08,.04,.045],f.SHOES,{dir:[-1,.3,0],group:m,paint:M=>M[1]<v[1]-.03?f.BELLY:void 0})}),e.ell(l,[.11,.115,.1],f.SKIN,{group:8,paint:g=>g[0]<l[0]-.01||g[1]>l[1]+.075?f.HAIR:void 0});for(const g of[-1,1]){const v=Xe.surface(l,[.11,.115,.1],C.norm([.85,.1,g*.45]));e.ell(v,[.026,.036,.026],f.BELLY,{group:8}),e.ell(C.add(v,[.012,0,g*.004]),[.014,.018,.014],f.EYE,{group:8})}e.ell(Xe.surface(l,[.11,.115,.1],C.norm([1,-.45,0])),[.012,.016,.04],f.BELLY,{group:8}),e.chain([[...C.add(l,[-.06,.03,0]),.065],[...C.add(l,[-.22,.05+s[1]*2,.01]),.05],[...C.add(l,[-.4,.06+s[2]*3,.02]),.03],[...C.add(l,[-.55,.07+s[0]*3,.02]),.012]],f.HAIR,{group:9});for(const g of[-1,1])e.ell(C.add(l,[-.015,0,g*.105]),[.05,.055,.03],f.PHONES,{group:10});e.chain([[...C.add(l,[-.005,.03,-.095]),.015],[...C.add(l,[-.02,.12,0]),.015],[...C.add(l,[-.005,.03,.095]),.015]],f.PHONES,{group:10});const p=C.add(l,[-.1+s[0],.2+s[1]*2,0]);e.ell(p,[.16,.014,.15],f.HAT,{dir:[1,.9,0],group:11}),e.chain([[...C.add(p,[-.02,.02,0]),.08],[...C.add(p,[-.14,.13,0]),.04],[...C.add(p,[-.3,.14+s[2]*2,0]),.012]],f.HAT,{group:11,paint:g=>Math.hypot(g[0]-p[0],g[1]-p[1])<.06?f.MAGIC:void 0}),e.seg(C.add(p,[.08,-.02,.08]),C.add(l,[.04,-.09,.08]),.008,.008,f.HAT,{group:11});for(const[g,v,x,m]of[[-.86,a(-.8)+.05,.03,.22],[-.88,a(-.8)-.04,-.04,.16],[-.7,n+.45,.05,.14],[-.2,n+.5,-.04,.12]]){const _=t*.05%.1;e.seg([g-_,v,x],[g-_-m,v,x],.01,.004,f.MAGIC2,{group:30,extra:!0})}return e.ell([.02,.005,0],[.2,.005,.12],f.NOSE,{group:0}),e}const td={stand:{frames:3,fps:3},land:{frames:3,fps:10},takeoff:{frames:3,fps:10},talk:{frames:4,fps:2.5},placeSigil:{frames:3,fps:6},liftSigil:{frames:3,fps:6},sit:{frames:2,fps:1.5}},mo=.34,bh={binding:[-.02,.31,-.2],dir:[.02,1,-.04]},nd={stand:[0,1,2].map(i=>({breathe:[0,.006,.012][i],sway:[0,.02,.035][i],free:[.04,.5+[0,.006,.012][i],.18],hand:"rest",broom:bh})),land:[{crouch:.2,hop:.01,broom:{astride:!0},sway:.05},{crouch:.1,bend:.1,broom:{binding:[-.28,.26,-.08],dir:[.6,.5,-.06]},legUp:[.18,.24,.12],sway:.03,free:[.2,.58,.2],hand:"rest"},{breathe:.004,broom:{binding:[.06,.31,-.2],dir:[.18,1,-.03]},sway:.015,free:[.06,.52,.19],hand:"rest"}],takeoff:[{crouch:.1,broom:{binding:[-.1,.3,-.17],dir:[.35,.7,-.04]},free:[.16,.58,.2],hand:"rest",sway:.02},{crouch:.15,bend:.1,broom:{binding:[-.3,.28,-.06],dir:[.7,.4,-.04]},legUp:[.1,.26,.13],sway:.04,free:[.24,.55,.17],hand:"rest"},{hop:.1,broom:{astride:!0},toes:!0,sway:.06}],talk:[{free:[.47,.84,.13],hand:"palm",tilt:.35,mouth:!0,sway:.01},{free:[.32,1.18,.12],hand:"point",tilt:-.25,look:.12,sway:.02},{free:[.24,1.16,.3],elbow:[.26,.88,.26],hand:"wave",tilt:.45,mouth:!0,sway:.03},{free:[.15,.76,.1],hand:"chest",tilt:-.35,breathe:.01,sway:.015}],placeSigil:[{free:[.16,1.62,.1],hand:"palm",look:.22,breathe:.01,sway:.02},{free:[.42,1,.12],hand:"palm",look:.08,sway:.03},{crouch:.7,bend:.55,free:[.38,.1,.13],hand:"down",look:-.08,sway:.04}],liftSigil:[{crouch:.7,bend:.55,free:[.36,.08,.13],hand:"down",look:-.08,sway:.02},{crouch:.25,bend:.18,free:[.44,.82,.12],hand:"palm",look:.05,sway:.04},{breathe:.012,free:[.2,1.64,.1],hand:"palm",look:.25,sway:.05,toes:!0}],sit:[0,1].map(i=>({sit:!0,swing:[.06,-.06][i],bend:-.08,look:[.02,.1][i],tilt:[.15,-.2][i],sway:[.01,.03][i],breathe:[0,.008][i],broom:{binding:[-.24,.31,-.3],dir:[.32,1,-.06]},free:[.2,mo+.14,.15],far:[.18,mo+.14,-.13],hand:"rest"}))};function id(i,e,t){const n=Math.hypot(e[0]-i[0],e[1]-i[1]),r=C.lerp(i,e,.5);if(n>=2*t)return r;const s=Math.sqrt(t*t-n*n/4),a=(e[0]-i[0])/n,o=(e[1]-i[1])/n;return[r[0]-o*s,r[1]+a*s,r[2]]}function rd(i,e){const t=nd[i],n={crouch:0,bend:0,hop:0,breathe:0,sway:0,tilt:0,look:0,broom:bh,...t[e%t.length]},r=new Xe({blend:.03}),s=n.hop,a=n.sway,o=n.sit?mo+.06:.45-n.crouch*.21+s,c=-n.crouch*.12,l=!!n.broom.astride,h=o-.04,d=l?[1,0,0]:C.norm(n.broom.dir),u=l?[-.36,h,0]:n.broom.binding,p=A=>C.add(u,C.mul(d,A));r.seg(p(0),p(l?.98:1.1),.022,.018,f.BROOM,{group:2}),r.ell(p(-.13),[.17,.07,.08],f.STRAW,{dir:d,group:3,paint:A=>{const D=C.dot(C.sub(A,u),d);return D<-.22?f.MAGIC2:D>-.01?f.BROOM:void 0}});for(const A of[-1,1]){const D=A>0?6:4,R=[c,o,A*.07],U=n.sit?n.swing*A:0,N=n.sit?[.24+U,.09+Math.max(0,U)*.6,A*.1]:A>0&&n.legUp?n.legUp:[(A>0?.05:-.01)+(n.toes?-.03:0),.07+(n.toes?s*.4:s),A*.1],P=n.sit?[.21,o+.01,A*.09]:id(R,N,.21);r.seg(R,P,.055,.045,f.JEANS,{group:D}),r.seg(P,N,.045,.04,f.JEANS,{group:D});const F=n.toes?[.03,-.045,0]:[.05,-.03,0];r.ell(C.add(N,F),[.08,.04,.045],f.SHOES,{dir:n.toes?[1,-.6,0]:[1,0,0],group:D,paint:O=>O[1]<N[1]+F[1]-.015?f.BELLY:void 0})}const g=[Math.sin(n.bend),Math.cos(n.bend),0],v=[Math.cos(n.bend),-Math.sin(n.bend),0],x=[c,o+.03,0];r.ell(x,[.1,.08,.105],f.JEANS,{group:1});const m=C.add(x,C.add(C.mul(g,.19),[0,n.breathe,0]));r.ell(m,[.1,.15+n.breathe*.5,.115],f.JACKET,{dir:v,group:1,paint:A=>C.dot(C.sub(A,m),v)>.045&&Math.abs(A[2])<.05?f.TOP:void 0}),r.chain([[...C.add(m,C.add(C.mul(v,-.07),C.mul(g,-.08))),.07],[...C.add(m,C.add(C.mul(v,-.11-a),C.mul(g,-.2))),.05],[...C.add(m,C.add(C.mul(v,-.13-a*1.6),C.mul(g,-.29))),.025]],f.JACKET,{group:12});const _=C.add(m,C.add(C.mul(g,.27),[n.look*.03,0,n.tilt*.04])),M=A=>C.add(m,C.add(C.mul(g,.1),[0,0,A*.12])),S=l?[.28,h+.03,-.05]:p(Math.max(.12,(Math.min(.62,o+.2)-u[1])/Math.max(.3,d[1]))),w=l?[.28,h+.03,.05]:n.free;for(const A of[-1,1]){const D=A>0?7:5,R=M(A),U=A>0?w:n.far||S,N=A>0&&n.elbow?n.elbow:C.add(C.lerp(R,U,.5),[-.03,-.02,A*.05]);r.seg(R,N,.04,.035,f.JACKET,{group:D}),r.seg(N,U,.035,.03,f.JACKET,{group:D});const P=A>0&&!l?n.hand:"grip";if(P==="palm")r.ell(U,[.045,.02,.04],f.SKIN,{group:D});else if(P==="down")r.ell(U,[.045,.02,.04],f.SKIN,{dir:[1,.15,0],group:D});else if(P==="wave"){r.ell(U,[.03,.045,.04],f.SKIN,{group:D});for(const F of[-1,0,1])r.seg(C.add(U,[0,.03,F*.02]),C.add(U,[F*.01,.065,F*.03]),.01,.008,f.SKIN,{group:D})}else P==="point"?(r.ell(U,[.035,.03,.035],f.SKIN,{group:D}),r.seg(C.add(U,[0,.02,0]),C.add(U,[.01,.08,0]),.012,.01,f.SKIN,{group:D})):r.ell(U,[.035,.03,.035],f.SKIN,{group:D})}r.ell(_,[.11,.115,.1],f.SKIN,{group:8,paint:A=>A[0]<_[0]-.01||A[1]>_[1]+.075?f.HAIR:void 0});for(const A of[-1,1])r.ell(Xe.surface(_,[.11,.115,.1],C.norm([.85,.05+n.look,A*.45+n.tilt*.1])),[.016,.026,.016],f.EYE,{group:8});n.mouth&&r.ell(Xe.surface(_,[.11,.115,.1],C.norm([1,-.5+n.look,n.tilt*.1])),[.012,.016,.025],f.NOSE,{group:8}),r.chain([[...C.add(_,[-.06,.02,0]),.06],[...C.add(_,[-.12-a,-.12,.02+n.tilt*.03]),.05],[...C.add(_,[-.13-a*1.5,-.25,.03+n.tilt*.04]),.03]],f.HAIR,{group:9});for(const A of[-1,1])r.ell(C.add(_,[-.015,0,A*.105]),[.05,.055,.03],f.PHONES,{group:10});r.chain([[...C.add(_,[-.005,.03,-.095]),.015],[...C.add(_,[-.005,.11,-.05]),.015],[...C.add(_,[-.005,.125,0]),.015],[...C.add(_,[-.005,.11,.05]),.015],[...C.add(_,[-.005,.03,.095]),.015]],f.PHONES,{group:10});const E=C.add(_,[-.03,.1,n.tilt*.02]),L=n.tilt*.05,y=C.add(E,[-.16-a*.5,.27,L*2]);return r.ell(E,[.16,.014,.15],f.HAT,{dir:[1,.25-n.look*.8,n.tilt*.3],group:11}),r.chain([[...C.add(E,[0,.01,0]),.085],[...C.add(E,[-.05,.17,L]),.045],[...y,.012]],f.HAT,{group:11,paint:A=>A[1]<E[1]+.045?f.MAGIC:void 0}),r.ell([.02,.005,0],[.2,.005,.12],f.NOSE,{group:0}),r.anchors.hand=w,r.anchors.hatTip=y,r}function wh({frame:i=0,lean:e=!1,pose:t}={}){if(t==="fast")return ed(i);if(td[t])return rd(t,i);const n=t==="rise",r=t==="descend",s=t==="brake",a=n||r||s,o=new Xe({blend:.03}),c=a?0:[0,.025,.045][i%3],l=a?0:[0,.015,-.01][i%3]+(e?.08:0),h=.42+c,d=n?.3:r?-.27:s?-.12:e?.1:0,u=Math.min(.1,Math.max(0,d)),p=a?[.02,.06][i%2]:[0,.03,.05][i%3],g=r?1:n?-.6:0;o.seg([-.5,h-l*2,0],[.62,h+l*3,0],.022,.018,f.BROOM,{group:2}),s?o.ell([-.56,h-.08,0],[.17,.07,.09],f.STRAW,{dir:[.55,1,0],group:3,paint:M=>M[1]<h-.18?f.MAGIC2:M[1]>h-.01?f.BROOM:void 0}):o.ell([-.62,h-l*2-.01,0],[.17,.07,.08],f.STRAW,{dir:[1,l,0],group:3,paint:M=>M[0]<-.72?f.MAGIC2:M[0]>-.5?f.BROOM:void 0});for(const M of[-1,1]){const S=[-.04,h+.06,M*.07],w=s?[.18,h-.01,M*.14]:r?[.16,h-.05,M*.14]:n?[.06,h-.07,M*.14]:[.12+d*.5,h-.02,M*.14],E=s?M>0?[.44,h-.02+p,M*.13]:[.3,h-.16,M*.13]:r?[.2,h-.26,M*.13]:n?[-.1,h-.23,M*.13]:[.08+d,h-.2,M*.13];o.seg(S,w,.055,.045,f.JEANS,{group:M>0?6:4}),o.seg(w,E,.045,.04,f.JEANS,{group:M>0?6:4}),o.ell(C.add(E,[.05,-.02,0]),[.08,.04,.045],f.SHOES,{group:M>0?6:4,paint:L=>L[1]<E[1]-.04?f.BELLY:void 0})}o.ell([-.04,h+.08,0],[.11,.07,.1],f.JEANS,{group:1});const v=[0+d*.8,h+.26-Math.abs(d)*.3,0];o.ell(v,[.1,.16,.11],f.JACKET,{dir:[d*2.5,1,0],up:[-1,0,0],group:1,paint:M=>M[0]>v[0]+.04&&Math.abs(M[2])<.055?f.TOP:void 0}),s?o.chain([[...C.add(v,[-.08,-.06,0]),.07],[...C.add(v,[-.02,.12+p,.02]),.05],[...C.add(v,[.14,.18+p,.03]),.025]],f.JACKET,{group:12}):a&&o.chain([[...C.add(v,[-.08,-.1,0]),.07],[...C.add(v,[-.2,-.12+g*(.08+p),0]),.05],[...C.add(v,[-.3,-.12+g*(.16+p*1.5),.02]),.025]],f.JACKET,{group:12});const x=C.add(v,[.03+d*.5,.26,0]),m=C.add(x,[s?.05:r?-.01:-.03,s?.06:.1,0]);for(const M of[-1,1]){const S=C.add(v,[.01,.11,M*.11]),w=r&&M>0?C.add(m,[.1,.01,.1]):s?[.3,h+.03,M*.05]:[.26+d,h+.03,M*.05],E=r&&M>0?C.add(S,[.1,.02,.1]):C.lerp(S,w,.5);o.seg(S,E,.04,.035,f.JACKET,{group:M>0?7:5}),o.seg(E,w,.035,.03,f.JACKET,{group:M>0?7:5}),o.ell(w,[.035,.03,.035],f.SKIN,{group:M>0?7:5})}o.ell(x,[.11,.115,.1],f.SKIN,{group:8,paint:M=>M[0]<x[0]-.01||M[1]>x[1]+.075?f.HAIR:void 0});for(const M of[-1,1])o.ell(Xe.surface(x,[.11,.115,.1],C.norm([.85,.05,M*.45])),[.016,.026,.016],f.EYE,{group:8});s?o.chain([[...C.add(x,[-.06,.06,0]),.06],[...C.add(x,[.04,.13+p,.03]),.045],[...C.add(x,[.2,.08+p,.04]),.02]],f.HAIR,{group:9}):o.chain([[...C.add(x,[-.06,.02,0]),.06],[...C.add(x,[-.18-u,-.05+p+g*.1,.02]),.045],[...C.add(x,[-.3-u*1.5,-.08+p*1.6+g*.22,.03]),.02]],f.HAIR,{group:9});for(const M of[-1,1])o.ell(C.add(x,[-.015,0,M*.105]),[.05,.055,.03],f.PHONES,{group:10});o.chain([[...C.add(x,[-.005,.03,-.095]),.015],[...C.add(x,[-.005,.11,-.05]),.015],[...C.add(x,[-.005,.125,0]),.015],[...C.add(x,[-.005,.11,.05]),.015],[...C.add(x,[-.005,.03,.095]),.015]],f.PHONES,{group:10});const _=n?.1:0;if(o.ell(m,[.16,.014,.15],f.HAT,{dir:s?[1,-.55,0]:[1,.25+_*3,0],group:11}),o.chain(s?[[...C.add(m,[0,.01,0]),.085],[...C.add(m,[.06,.16,0]),.045],[...C.add(m,[.2,.22+p*.5,0]),.012]]:[[...C.add(m,[0,.01,0]),.085],[...C.add(m,[-.05-u-_*.5,.17-_*.3,0]),.045],[...C.add(m,[-.16-u*1.5-_,.27+p*.5-_*.5,0]),.012]],f.HAT,{group:11,paint:M=>M[1]<m[1]+.045?f.MAGIC:void 0}),a){const M=ju[t]+(s?[0,.06][i%2]:0),S=Math.cos(M),w=Math.sin(M),E=[0,h,0],L=R=>[E[0]+(R[0]-E[0])*S-(R[1]-E[1])*w,E[1]+(R[0]-E[0])*w+(R[1]-E[1])*S,R[2]],y=R=>[E[0]+(R[0]-E[0])*S+(R[1]-E[1])*w,E[1]-(R[0]-E[0])*w+(R[1]-E[1])*S,R[2]],A=R=>[R[0]*S-R[1]*w,R[0]*w+R[1]*S,R[2]];for(const R of o.parts)if(R.type==="ell"?(R.c=L(R.c),R.axes=R.axes.map(A)):(R.a=L(R.a),R.b=L(R.b)),R.paint){const U=R.paint;R.paint=(N,P)=>U(y(N),P)}for(const R of o.flats)R.c=L(R.c),R.u=A(R.u),R.v=A(R.v);const D=Math.min(...o.parts.map(R=>R.type==="ell"?R.c[1]-Math.max(...R.r):Math.min(R.a[1]-R.r1,R.b[1]-R.r2)));if(D<.08)for(const R of o.parts){const U=.08-D;R.type==="ell"?R.c=[R.c[0],R.c[1]+U,R.c[2]]:(R.a=[R.a[0],R.a[1]+U,R.a[2]],R.b=[R.b[0],R.b[1]+U,R.b[2]])}if(s){const R=L([-.45,h-.24,0]);for(let U=0;U<5;U++){const N=U+i*.5,P=.055-U*.008;o.ell([R[0]+.1+N*.08,Math.max(.04,R[1]-.02+Math.sin(N*1.9)*.04),Math.cos(N*1.3)*.06],[P,P*.8,P],U<2?f.BELLY:U%2?f.MAGIC:f.MAGIC2,{group:25+U,extra:!0})}}if(n){const R=L([-.8,h,0]);for(let U=0;U<5;U++){const N=U+i*.5,P=.05-U*.007;o.ell([R[0]-.02+Math.sin(N*2.1)*.06,Math.max(.04,R[1]-.08-N*.09),Math.cos(N*1.7)*.05],[P,P,P],U%2?f.MAGIC:f.MAGIC2,{group:20+U,extra:!0})}}}return o.ell([.02,.005,0],[.2,.005,.12],f.NOSE,{group:0}),o}const hl=(i={})=>Math.round((i.size||8)*Math.sqrt(i.growth||20)*(2/(i.pixel||3))*1.9),Ea=new Map,Eh=i=>(Ea.has(i)||Ea.set(i,gn(wh({frame:0}),{height:i}).s),Ea.get(i)),sd=(i={})=>Eh(hl(i));function ad(i={},{frame:e=0,lean:t=!1,facing:n="towards",pose:r}={}){const s=hl(i),a=wh({frame:e,lean:t,pose:r}),{sp:o,project:c}=r?gn(a,{scale:Eh(s),facing:n}):gn(a,{height:s,facing:n});a.anchors.hand&&(o.anchors={hand:c(a.anchors.hand),hatTip:c(a.anchors.hatTip)});let l=0;for(let h=0;h<400&&l<6;h++){const d=h*37%o.w,u=h*53%Math.floor(o.h*.8);o.get(d,u)||o.get(d+1,u)||o.get(d-1,u)||o.get(d,u+1)||o.get(d,u-1)||(d*7+u*13+e*5)%11||(o.px(d,u,f.MAGIC2),l++)}return o}const st=(i,e=0)=>{const t=Math.sin(i*127.1+e*311.7)*43758.5453;return t-Math.floor(t)},or=i=>{const e=st(Math.floor(i[0]*14)+Math.floor(i[2]*14)*13,Math.floor(i[1]*6));return e<.14?f.BARKD:e>.88?f.BARKL:void 0},od=i=>e=>{const t=st(Math.floor(e[0]*10),Math.floor(e[1]*10)+Math.floor(e[2]*10)*7);return e[1]<i[1]-.2||t<.2?f.LEAF3:t>.8?f.LEAF2:void 0},Yn=(i,e,t,n,r=!0)=>i.ell(e,t,f.STONE,{group:n,rough:.025,paint:s=>s[1]>e[1]+t[1]*.45&&r?f.MOSS:Math.abs(Math.sin(s[0]*13+s[2]*7))<.06?f.STONED:void 0}),is=(i,e,t,n)=>i.ell(e,t,f.LEAF,{group:n,rough:.04,paint:od(e)}),Kt=(i,e,t)=>i.chain(e,f.TRUNK,{group:t,rough:.012,paint:or}),rs=(i,e,t,n,r,s=.3,a=f.LEAF2)=>{for(let o=0;o<e;o++){const c=st(r,o)*6.283,l=t*Math.sqrt(st(o,r)),h=Math.cos(c)*l,d=Math.sin(c)*l*.7;i.ell([h,s*.3,d],[.07,s*(.35+st(o,4)*.3),.07],a,{group:n+o%3,paint:u=>u[1]>s*.45?f.LEAF:void 0})}},ss=(i,e,t,n)=>i.ell(e,[t[0],.015,t[1]],f.WATER,{group:n}),ld={"sleeping-giant"(i){const e=t=>n=>{const r=st(Math.floor(n[0]*8),Math.floor(n[2]*8)+Math.floor(n[1]*8)*5);return r<.15?f.LEAF3:r>.86?f.LEAF2:void 0};for(const[t,n]of[[[.85,.42,0],[.7,.5,.66]],[[0,.3,0],[.62,.36,.6]],[[-.8,.3,0],[.56,.36,.62]],[[1.85,.5,.02],[.5,.5,.48]],[[-1.55,.72,.3],[.38,.5,.3]],[[-1.55,.72,-.3],[.38,.5,.3]],[[-2.2,.3,.32],[.42,.3,.26]],[[-2.2,.3,-.32],[.42,.3,.26]],[[.6,.2,.78],[.75,.2,.2]],[[.6,.2,-.78],[.75,.2,.2]]])i.ell(t,n,f.MOSS,{group:1,rough:.03,paint:e()});Yn(i,[2.25,.75,.12],[.13,.15,.11],2,!1);for(const t of[-.12,.22])i.ell([2.12,.88,t],[.08,.04,.07],f.STONED,{group:3});Yn(i,[-.2,.16,.95],[.2,.15,.18],4),Yn(i,[-.2,.16,-.95],[.18,.14,.16],5),i.ell([2,.95,.02],[.42,.14,.4],f.LEAF3,{group:6,rough:.03}),rs(i,26,2.8,10,3,.3)},"fern-grotto"(i){i.ell([0,.16,0],[.78,.2,.72],f.STONE,{group:1,rough:.015,paint:e=>e[1]>.3?f.MOSS:void 0}),ss(i,[0,.345,0],[.55,.5],2);for(let e=0;e<6;e++){const t=e/6*Math.PI*2+.4,n=1.5+st(e)*.3,r=[Math.cos(t)*n,0,Math.sin(t)*n*.8],s=1.1+st(e,2)*.7,a=C.add(r,[0,s,0]);i.seg(r,a,.12,.09,f.TRUNK,{group:3+e,rough:.02,paint:or});for(let o=0;o<7;o++){const c=o/7*Math.PI*2+e,l=[Math.cos(c),0,Math.sin(c)];i.chain([[...a,.05],[...C.add(a,C.add(C.mul(l,.45),[0,.18,0])),.04],[...C.add(a,C.add(C.mul(l,.9),[0,-.15,0])),.015]],o%2?f.LEAF:f.LEAF2,{group:10+e})}}for(let e=0;e<5;e++){const t=e*1.3;Yn(i,[Math.cos(t)*.95,.08,Math.sin(t)*.95],[.16,.12,.14],20+e)}},"sunken-boat"(i){ss(i,[.3,.01,.15],[1.9,1.15],1);const e=[0,.12,0],t=C.norm([1,.28,.12]);i.ell(e,[1.3,.45,.55],f.WOOD,{dir:t,group:2,paint:n=>(C.dot(C.sub(n,e),[0,1,0])*9+9)%1<.14?f.BARKD:n[1]>.35&&st(Math.floor(n[0]*9))<.4?f.MOSS:void 0}),i.ell(C.add(e,[0,.14,0]),[1.2,.4,.47],f.BARKD,{dir:t,group:2,cut:!0});for(let n=-2;n<=2;n++)i.seg(C.add(e,C.add(C.mul(t,n*.4),[0,.1,-.42])),C.add(e,C.add(C.mul(t,n*.4),[0,.1,.42])),.04,.04,f.WOOD,{group:3});i.seg([-.9,.05,.7],[.3,1,.55],.03,.03,f.WOOD,{group:4}),i.box([-.98,.06,.72],[.2,.02,.07],f.WOOD,{dir:[1.2,-.8,-.15],group:4}),rs(i,18,2.2,10,5,.45)},"bramble-wagon"(i){const e=C.norm([1,-.12,0]);i.box([0,.62,0],[1.1,.22,.52],f.WOOD,{dir:e,round:.04,group:1,paint:t=>(t[0]+3)*4%1<.08?f.BARKD:void 0}),i.box([0,.72,0],[1,.2,.43],f.BARKD,{dir:e,group:1,cut:!0});for(const[t,n,r,s]of[[-.72,.55,.4,.4],[-.72,-.55,.4,.4],[.72,-.55,.32,.37]])i.ell([t,r,n],[s,s,.06],f.WOOD,{group:2+(t>0?1:0)+(n>0?2:0),paint:a=>{const o=a[0]-t,c=a[1]-r,l=Math.hypot(o,c),h=Math.atan2(c,o);return l>s*.82||l<s*.18?f.BARKD:Math.abs(Math.sin(h*4))<.2?f.WOOD:f.NOSE}});i.ell([.95,.1,.75],[.37,.06,.37],f.WOOD,{group:7,paint:t=>Math.hypot(t[0]-.95,t[2]-.75)>.3?f.BARKD:void 0});for(const t of[-.3,.3])i.seg([1.05,.55,t],[1.9,.05,t*1.4],.04,.035,f.WOOD,{group:8});for(let t=0;t<14;t++){const n=st(t,1)*6.283,r=Math.cos(n)*1.5,s=Math.sin(n)*.9,a=[[r,0,s,.03]];for(let o=1;o<4;o++)a.push([r*(1-o*.28)+(st(t,o)-.5)*.5,.25+o*.25+st(o,t)*.2,s*(1-o*.3)+(st(o,t*3)-.5)*.4,.025-o*.004]);if(i.chain(a,f.BARKD,{group:10+t%3}),t%2===0){const o=a[3];i.ell([o[0],o[1],o[2]],[.18,.13,.16],f.LEAF,{group:14,rough:.03,paint:c=>st(Math.floor(c[0]*30),Math.floor(c[1]*30))<.1?f.ACCENT:void 0})}}},"beehive-tree"(i){for(const[t,n,r]of[[-.2,0,-.25],[.15,-.1,.2],[0,.15,.05]])Kt(i,[[t,0,n,.22],[t+r*.8,1.4,n,.16],[t+r*2,2.8,n-.1,.08]],1);for(const[t,n]of[[[-.6,2.9,-.2],[.9,.6,.7]],[[.6,3,-.2],[.85,.6,.7]],[[0,3.4,-.3],[.9,.55,.7]]])is(i,t,n,3);Kt(i,[[.2,1.9,-.05,.08],[.75,2.05,.15,.05]],2);const e=[.72,1.6,.2];i.ell(e,[.24,.42,.22],f.STRAW,{group:4,paint:t=>{const n=Math.floor((t[1]-e[1])*14),r=Math.floor(Math.atan2(t[2]-e[2],t[0]-e[0])*3+n%2*.5);return st(n,r)<.3?f.BARK2:void 0}}),i.seg([.75,2.02,.15],[.72,1.9,.2],.05,.1,f.STRAW,{group:4});for(let t=0;t<6;t++){const n=t*1.9;i.ell([e[0]+Math.cos(n)*.45,e[1]+Math.sin(t*2.3)*.35,e[2]+Math.sin(n)*.35],[.03,.025,.03],f.MAGIC,{group:20+t,extra:!0})}},"fairy-ring"(i){i.ell([0,.005,0],[1.9,.005,1.5],f.LEAF3,{group:0});for(let e=0;e<9;e++){const t=e/9*Math.PI*2,n=[Math.cos(t)*1.6,0,Math.sin(t)*1.25],r=.35+st(e)*.35;i.box(C.add(n,[0,r/2,0]),[.13,r/2,.1],f.STONE,{dir:[-Math.sin(t),0,Math.cos(t)],round:.05,rough:.015,group:1+e,paint:a=>e===2&&Math.abs(a[1]-r*.55)<r*.22&&Math.abs(a[0]-n[0]-0)<.05?f.RUNE:a[1]>r*.85?f.MOSS:void 0});const s=C.add(n,[Math.cos(t+.35)*.25,0,Math.sin(t+.35)*.2]);i.seg(s,C.add(s,[0,.16,0]),.035,.03,f.CLOTH,{group:12}),i.ell(C.add(s,[0,.18,0]),[.1,.06,.1],f.ACCENT,{group:13,paint:a=>st(Math.floor(a[0]*60),Math.floor(a[2]*60))<.15?f.BELLY:void 0})}},"charcoal-hut"(i){const e=[0,2,0];for(let n=0;n<20;n++){const r=n/20*Math.PI*2;Math.abs(r-1.2)<.35||i.seg([Math.cos(r)*.95,0,Math.sin(r)*.8],C.add(e,[Math.cos(r)*.08,.1+st(n)*.25,Math.sin(r)*.08]),.05,.03,n%3?f.TRUNK:f.BARKD,{group:1+n%2})}i.ell([0,.6,0],[.85,.6,.7],f.BARKD,{group:3});const t=[1.7,0,.3];i.ell(t,[.85,.42,.7],f.BARKD,{group:4,rough:.03,paint:n=>st(Math.floor(n[0]*14),Math.floor(n[2]*14)+Math.floor(n[1]*14))<.07?f.GLOW:n[1]>.3?f.SHADES:void 0});for(let n=0;n<4;n++)i.seg([-1.4,.1+n*.14,-.5+n%2*.05],[-1.4,.1+n*.14,.5],.07,.07,f.TRUNK,{group:5+n%2,paint:r=>Math.abs(r[2])>.46?f.BARKL:void 0})},"root-arch"(i){Kt(i,[[-1.8,0,.1,.4],[-1.4,1.2,0,.34],[-.4,2.3,-.1,.3],[.6,2.4,0,.28],[1.5,1.4,.1,.32],[1.9,0,.15,.38]],1),Kt(i,[[-1.4,0,-.6,.28],[-.6,1.6,-.5,.22],[.5,1.9,-.45,.2],[1.3,.9,-.4,.22],[1.5,0,-.35,.26]],2),Kt(i,[[-1.8,.2,.1,.3],[-2.4,.05,.5,.12]],1),Kt(i,[[1.9,.2,.15,.3],[2.5,.05,.55,.12]],1);for(const[e,t]of[[[-.2,2.6,-.2],[.7,.35,.5]],[[.8,2.5,-.25],[.55,.3,.45]]])is(i,e,t,4);for(let e=0;e<4;e++)Yn(i,[-.7+e*.45,.12,(st(e)-.5)*.5],[.22,.18,.2],6+e);i.box([0,.35,-.2],[.16,.35,.08],f.STONE,{round:.05,rough:.01,group:11,paint:e=>Math.abs(e[1]-.4)<.14&&Math.abs(e[0])<.05?f.MAGIC:e[1]>.62?f.MOSS:void 0})},"turf-hut"(i){i.box([0,.55,0],[1,.55,.7],f.WOOD,{round:.04,group:1,paint:e=>e[1]*7%1<.18?f.BARKD:e[2]>.66&&Math.abs(e[0]+.2)<.2&&e[1]<.85?f.NOSE:e[2]>.66&&Math.abs(e[0]-.5)<.14&&Math.abs(e[1]-.7)<.12?f.SHADES:void 0});for(const e of[-1,1])i.box([0,1.3,e*.4],[1.15,.05,.5],f.MOSS,{dir:[1,0,0],up:[0,1,-e*.75],round:.03,group:2,paint:t=>st(Math.floor(t[0]*12),Math.floor(t[2]*12))<.25?f.LEAF2:void 0});i.seg([.65,1.2,-.3],[.65,1.9,-.3],.15,.13,f.STONE,{group:3,rough:.015});for(let e=0;e<5;e++)Yn(i,[-1.4+e*.7,.12,.9+st(e)*.3],[.2,.15,.18],4+e);rs(i,16,1.8,10,9,.25)},"heron-rookery"(i){Kt(i,[[0,0,0,.25],[.4,1.4,0,.18],[.9,2.8,-.1,.12],[1.3,3.8,-.2,.06]],1);const e=[[[.6,2,-.05],[-.3,2,-.1]],[[1,3,-.1],[1.8,2.9,0]],[[1.25,3.6,-.2],[.6,3.7,-.3]]];e.forEach(([r,s],a)=>{Kt(i,[[...r,.07],[...s,.04]],2),i.ell(C.add(s,[0,.08,0]),[.34,.13,.3],f.BARK2,{group:3+a,rough:.025,paint:o=>Math.abs(Math.sin(o[0]*30+o[2]*20))<.25?f.STRAW:o[1]<s[1]+.02?f.BARKD:void 0})});for(const[r,s]of[[[1.2,4,-.4],[.6,.4,.45]],[[.3,3.1,-.5],[.45,.3,.35]],[[1.9,3.3,-.4],[.4,.3,.35]]])is(i,r,s,7);const t=C.add(e[1][1],[0,.42,.05]),n=1.6;i.ell(t,[.18*n,.1*n,.09*n],f.BELLY,{dir:[1,.3,0],group:10,paint:r=>r[1]>t[1]+.06?f.STONE:void 0}),i.chain([[...C.add(t,[.12*n,.06*n,0]),.035*n],[...C.add(t,[.2*n,.22*n,0]),.03*n],[...C.add(t,[.16*n,.32*n,0]),.04*n]],f.BELLY,{group:10}),i.seg(C.add(t,[.18*n,.33*n,0]),C.add(t,[.36*n,.3*n,0]),.015*n,.005*n,f.BODY2,{group:11});for(const r of[-.04,.04])i.seg(C.add(t,[0,-.06*n,r]),C.add(t,[.02,-.42,r]),.012,.012,f.BARKD,{group:12})},sundial(i){i.ell([0,.07,0],[1.05,.09,1],f.STONE,{group:1,rough:.01}),i.ell([0,.2,0],[.72,.09,.68],f.STONE,{group:2,rough:.01,paint:e=>e[1]>.26&&st(Math.floor(e[0]*8),Math.floor(e[2]*8))<.3?f.MOSS:void 0}),i.seg([0,.28,0],[0,.95,0],.16,.13,f.STONE,{group:3,paint:e=>Math.abs(Math.sin(e[1]*30))<.15?f.STONED:void 0}),i.ell([0,1,0],[.38,.04,.38],f.FRAME,{group:4,paint:e=>{const t=Math.atan2(e[2],e[0]);return Math.abs(Math.sin(t*6))<.12&&Math.hypot(e[0],e[2])>.26?f.BARKD:void 0}}),i.box([0,1.12,0],[.2,.1,.01],f.FRAME,{dir:[1,-.5,0],round:.005,group:5});for(let e=0;e<22;e++){const t=e/22*Math.PI*2,n=1.25+st(e)*.2,r=[Math.cos(t)*n,0,Math.sin(t)*n*.85];i.seg(r,C.add(r,[0,.18,0]),.015,.012,f.LEAF2,{group:6}),i.ell(C.add(r,[0,.2,0]),[.05,.04,.05],[f.FLOWER,f.BELLY,f.ACCENT][e%3],{group:7})}},"bear-den"(i){const e=[0,.3,-.2];i.ell(e,[1.7,1.15,1.25],f.LEAF,{group:1,rough:.05,paint:t=>{const n=st(Math.floor(t[0]*16),Math.floor(t[1]*16)+Math.floor(t[2]*16)*3);return n<.06?f.ACCENT:n<.2?f.BARKD:t[1]<.4?f.LEAF3:n>.85?f.LEAF2:void 0}}),i.ell([.35,.35,.95],[.5,.55,.4],f.NOSE,{group:1,cut:!0}),i.seg([2,0,.5],[2,.65,.5],.3,.27,f.TRUNK,{group:3,paint:t=>t[1]>.6?f.BARKL:Math.abs(Math.sin(Math.atan2(t[2]-.5,t[0]-2)*3))<.12&&t[1]>.2?f.BARKD:void 0})},"stilt-hut"(i){ss(i,[0,.01,.1],[2.1,1.3],1);for(const[e,t]of[[-.75,-.55],[.75,-.55],[-.75,.55],[.75,.55]])i.seg([e,0,t],[e,1.05,t],.07,.06,f.WOOD,{group:2,paint:n=>n[1]<.15?f.MOSS:void 0});i.box([0,1.1,0],[1.05,.05,.8],f.WOOD,{round:.02,group:3,paint:e=>(e[0]+3)*6%1<.12?f.BARKD:void 0}),i.box([-.1,1.6,-.1],[.7,.45,.55],f.WOOD,{round:.03,group:4,paint:e=>e[2]>.4&&Math.abs(e[0]-.1)<.18&&e[1]<1.85?f.NOSE:void 0});for(const[e,t]of[[2.1,.92],[2.35,.72],[2.58,.48],[2.76,.24]])i.ell([-.1,e,-.1],[t,.16,t*.85],f.STRAW,{group:5,paint:n=>Math.abs(Math.sin(Math.atan2(n[2]+.1,n[0]+.1)*18))<.25?f.BARK2:void 0});for(const e of[.72,.95])i.seg([.9,1.1,e],[1.15,0,e],.02,.02,f.WOOD,{group:6});for(let e=0;e<4;e++)i.seg([.92+e*.06,1-e*.26,.72],[.92+e*.06,1-e*.26,.95],.02,.02,f.WOOD,{group:6});for(let e=0;e<26;e++){const t=st(e,7)*6.283,n=1.5+st(e,8)*.7,r=[Math.cos(t)*n,0,Math.sin(t)*n*.7],s=.5+st(e,9)*.5;i.seg(r,C.add(r,[0,s,0]),.028,.02,f.LEAF2,{group:10+e%3}),e%3===0&&i.ell(C.add(r,[0,s-.05,0]),[.025,.07,.025],f.BARKD,{group:13})}},"bog-shrine"(i){ss(i,[.6,.01,.4],[1.4,.9],1),i.seg([0,0,0],[0,1.9,0],.2,.17,f.TRUNK,{group:2,rough:.01,paint:e=>{const t=e[1];return e[2]>.12&&(Math.abs(t-1.6)<.05&&Math.abs(Math.abs(e[0])-.08)<.05||Math.abs(t-1.38)<.04&&Math.abs(e[0])<.1)||t*5%1<.07?f.BARKD:e[1]>1.85?f.MOSS:void 0}}),i.ell([0,1.95,0],[.24,.1,.24],f.MOSS,{group:3});for(let e=0;e<6;e++){const t=e/6*Math.PI*2;i.seg([Math.cos(t)*1,0,Math.sin(t)*.8],[Math.cos(t)*1,.35+st(e)*.25,Math.sin(t)*.8],.05,.04,f.TRUNK,{group:4})}i.ell([-.25,.06,.3],[.14,.07,.13],f.EAR,{group:5}),Yn(i,[.3,.07,.3],[.09,.07,.08],6,!1),Yn(i,[.15,.05,.42],[.06,.05,.06],7,!1);for(const[e,t,n]of[[.9,.9,.5],[1.4,1.2,.1],[.4,1.4,.8]])i.ell([e,t,n],[.06,.07,.06],f.MAGIC,{group:20+e*10,extra:!0,paint:r=>Math.hypot(r[0]-e,r[1]-t)<.03?f.MAGIC2:void 0});rs(i,20,2,10,11,.3,f.WEB)},"raven-tree"(i){Kt(i,[[0,0,0,.3],[.1,1.3,0,.22],[-.1,2.5,-.1,.16],[.1,3.6,-.15,.07]],1),[[[.1,1.6,0],[1.3,2.3,.1],[1.8,2.2,.1]],[[-.05,2.1,-.05],[-1.2,2.8,-.1],[-1.6,3.2,-.1]],[[0,2.9,-.1],[.8,3.5,-.2]]].forEach((r,s)=>Kt(i,r.map((a,o)=>[...a,.12-o*.04]),2+s)),Kt(i,[[-.1,.5,0,.22],[-1.1,.1,.5,.08]],5),Kt(i,[[.1,.4,0,.2],[.9,.05,-.4,.08]],5);const t=(r,s)=>{i.ell(r,[.12,.07,.06],f.SHADES,{dir:[1,.2,0],group:s}),i.ell(C.add(r,[.11,.07,0]),[.05,.05,.045],f.SHADES,{group:s}),i.seg(C.add(r,[.15,.07,0]),C.add(r,[.22,.05,0]),.015,.004,f.BODY2,{group:s}),i.seg(C.add(r,[-.1,0,0]),C.add(r,[-.22,-.04,0]),.04,.015,f.SHADES,{group:s})};t([1.3,2.42,.1],10),t([-1.2,2.92,-.1],11),t([.8,3.62,-.2],12),t([-.05,3.72,-.15],13);const n=[1.55,1.45,.1];i.seg([1.55,2.25,.1],C.add(n,[0,.3,0]),.01,.01,f.FRAME,{group:14});for(let r=0;r<6;r++){const s=r/6*Math.PI*2;i.seg(C.add(n,[Math.cos(s)*.2,-.25,Math.sin(s)*.2]),C.add(n,[Math.cos(s)*.12,.3,Math.sin(s)*.12]),.012,.012,f.FRAME,{group:14})}i.seg(C.add(n,[0,-.27,0]),C.add(n,[0,-.25,0]),.22,.22,f.FRAME,{group:14})},barrow(i){i.ell([0,0,-.2],[2.3,.95,1.3],f.LEAF2,{group:1,rough:.03,paint:e=>st(Math.floor(e[0]*10),Math.floor(e[2]*10)+Math.floor(e[1]*10))<.25?f.LEAF:void 0});for(const e of[-.35,.35])i.box([e,.45,.95],[.12,.45,.12],f.STONE,{round:.03,rough:.01,group:2});i.box([0,.95,.95],[.55,.1,.14],f.STONE,{round:.03,rough:.01,group:3,paint:e=>e[1]>1.02?f.MOSS:void 0}),i.box([0,.4,.9],[.23,.4,.3],f.NOSE,{group:1,cut:!0});for(const[e,t,n]of[[-1.6,1,.7],[1.7,.9,.55]])i.box([e,n/2,t],[.12,n/2,.09],f.STONE,{round:.04,rough:.01,group:4})},cairn(i){let e=0;for(let n=0;n<6;n++){const r=.9-n*.14,s=Math.max(3,9-n);for(let a=0;a<s;a++){const o=a/s*Math.PI*2+n;Yn(i,[Math.cos(o)*r*.8,e+.14,Math.sin(o)*r*.7],[.24-n*.02,.15,.2-n*.02],1+(n+a)%4,n<2)}e+=.26}const t=[0,e+.1,0];for(let n=0;n<6;n++){const r=n/6*Math.PI*2;i.seg(C.add(t,[Math.cos(r)*.12,0,Math.sin(r)*.12]),C.add(t,[Math.cos(r)*.3,.35,Math.sin(r)*.3]),.02,.02,f.FRAME,{group:6})}i.seg(C.add(t,[0,-.3,0]),t,.05,.05,f.FRAME,{group:6}),i.ell(C.add(t,[0,.14,0]),[.2,.07,.2],f.SHADES,{group:7})},"stump-throne"(i){i.ell([0,.28,0],[.92,.34,.86],f.TRUNK,{group:1,rough:.015,paint:or}),i.ell([0,.58,0],[.84,.06,.78],f.BARKL,{group:1,paint:e=>Math.abs(Math.sin(Math.hypot(e[0],e[2])*30))<.3?f.BARK2:void 0}),i.box([-.55,1.15,0],[.18,.62,.62],f.TRUNK,{round:.1,rough:.01,group:2,paint:or});for(const e of[-.6,.6])i.box([-.1,.72,e],[.45,.14,.12],f.TRUNK,{round:.06,group:3,paint:or});for(let e=0;e<6;e++){const t=e/6*Math.PI*2+.3;Kt(i,[[Math.cos(t)*.8,.25,Math.sin(t)*.8,.18],[Math.cos(t)*1.4,.02,Math.sin(t)*1.3,.06]],4)}i.seg([1.5,.18,.8],[1.5,.18,.2],.18,.18,f.TRUNK,{group:5,paint:e=>e[2]>.78||e[2]<.22?f.BARKL:or(e)}),i.seg([1.5,.3,.5],[1.6,.75,.5],.025,.025,f.WOOD,{group:6}),i.box([1.5,.36,.5],[.1,.06,.015],f.FRAME,{group:6});for(let e=0;e<6;e++){const t=e<3?0:1,n=e%3;i.seg([-1.7+n*.3+t*.15,.15+t*.26,-.7],[-1.7+n*.3+t*.15,.15+t*.26,.2],.14,.14,f.TRUNK,{group:7+e%2,paint:r=>r[2]>.16||r[2]<-.66?f.BARKL:void 0})}},"swing-beech"(i){Kt(i,[[0,0,-.3,.45],[0,1.6,-.3,.36],[-.1,2.8,-.4,.26]],1),Kt(i,[[0,2.2,-.3,.2],[1,2.6,-.2,.14],[1.9,2.75,-.1,.08]],2),Kt(i,[[-.05,2.5,-.35,.18],[-1.2,3,-.4,.1]],3);for(let e=0;e<5;e++){const t=e/5*Math.PI*2;Kt(i,[[Math.cos(t)*.35,.3,-.3+Math.sin(t)*.3,.2],[Math.cos(t)*.9,.02,-.3+Math.sin(t)*.8,.07]],4)}for(const[e,t]of[[[0,3.4,-.6],[1.4,.8,1]],[[1.4,3.1,-.4],[.9,.55,.7]],[[-1.3,3.2,-.6],[.9,.6,.7]]])is(i,e,t,5);for(const e of[-.12,.12])i.seg([1.3,2.65,e],[1.3,.55,e],.012,.012,f.STRAW,{group:6});i.box([1.3,.53,0],[.08,.025,.18],f.WOOD,{round:.01,group:6});for(let e=0;e<9;e++)i.ell([(st(e,1)-.5)*3,.05+st(e,2)*.5,(st(e,3)-.3)*1.6],[.022,.022,.022],f.MAGIC,{group:20+e,extra:!0})},bower(i){for(const t of[-.9,0,.9])for(const n of[-.6,.6])i.seg([t,0,n],[t,1.2,n],.04,.04,f.WOOD,{group:1});for(const t of[-.9,0,.9])i.chain([[t,1.2,-.6,.04],[t,1.62,-.3,.04],[t,1.72,0,.04],[t,1.62,.3,.04],[t,1.2,.6,.04]],f.WOOD,{group:2});for(const t of[-.6,.6])for(const n of[.5,1])i.seg([-.9,n,t],[.9,n,t],.025,.025,f.WOOD,{group:3});const e=t=>{const n=st(Math.floor(t[0]*26),Math.floor(t[1]*26)+Math.floor(t[2]*26)*3);return n<.12?f.BELLY:n<.2?f.STRAW:n>.85?f.LEAF2:void 0};for(const[t,n]of[[[-.6,1.6,0],[.6,.3,.75]],[[.5,1.65,0],[.65,.3,.75]],[[-.95,.9,-.55],[.25,.65,.25]],[[.95,.8,-.6],[.25,.55,.25]],[[-.9,.7,.62],[.22,.5,.2]],[[.2,1.3,-.65],[.5,.4,.2]]])i.ell(t,n,f.LEAF,{group:4,rough:.04,paint:e});i.box([0,.4,-.35],[.6,.04,.15],f.WOOD,{round:.02,group:5});for(const t of[-.5,.5])i.seg([t,0,-.35],[t,.38,-.35],.03,.03,f.WOOD,{group:5})}},Ah={moor:["sleeping-giant","the sleeping giant, a moss mound like a figure lying on its back",1],"fern-forest":["fern-grotto","a ring of giant tree ferns round a stone basin",1],"muddy-forest":["sunken-boat","an old rowing boat sunk in the mud",1.15],"tangly-forest":["bramble-wagon","an old wagon wrapped in brambles",1.1],"wispy-forest":["beehive-tree","a many-trunked tree with a great wild honeycomb",1],"hazel-forest":["fairy-ring","a ring of fairy stones and toadstools",1.1],"twiggy-forest":["charcoal-hut","a charcoal burner's hut of sticks, its mound smouldering",1],ancient:["root-arch","a great arch of roots over mossy stones",1.1],norway:["turf-hut","a log cabin with a turf roof",1.15],"alder-forest":["heron-rookery","an alder holding herons' stick nests",1],meadow:["sundial","a moonlit sundial on a stone dais in a ring of flowers",1.2],"berry-thicket":["bear-den","a bear's den in a bramble mound",1.1],wetland:["stilt-hut","a fisher's hut on stilts over a pool",1.1],bog:["bog-shrine","a carved post shrine to the bog, will-o'-wisps over the pool",1.1],deadwood:["raven-tree","a dead tree where the ravens gather",1],grassland:["barrow","a barrow with a stone doorway",1],heath:["cairn","a tall cairn with an old beacon basket",1.4],"old-pinewood":["stump-throne","a woodcutter's stump throne",1.1],"bluebell-glade":["swing-beech","a great beech with a rope swing, glowworms beneath",1],"honeysuckle-tangle":["bower","a honeysuckle bower with a bench",1.2]};function cd(i,e){const t=i.leaf,n=e.trunkHue??.07;return{[f.TRUNK]:ge(n,.45,.36),[f.BARKD]:ge(n+.03,.5,.17),[f.BARKL]:ge(n,.35,.55),[f.BARK2]:ge(n+.02,.45,.26),[f.LEAF]:ge(t,.55,.45),[f.LEAF2]:ge(t-.03,.5,.62),[f.LEAF3]:ge(t+.03,.6,.26),[f.STONE]:[122,120,128],[f.STONED]:[62,60,70],[f.MOSS]:ge(.26,.45,.45),[f.WOOD]:[128,92,58],[f.STRAW]:[190,162,104],[f.CLOTH]:[228,220,200],[f.EAR]:[168,96,66],[f.FRAME]:[150,128,84],[f.SHADES]:[30,28,36],[f.ACCENT]:[196,40,52],[f.BELLY]:[232,228,214],[f.BODY2]:[210,170,60],[f.FLOWER]:[180,140,230],[f.WEB]:[228,228,234],[f.WATER]:[52,78,104],[f.NOSE]:[16,14,20],[f.GLOW]:[255,120,40],[f.MAGIC]:ge(e.magicHue??.45,.6,1),[f.MAGIC2]:ge(e.magicHue??.45,.2,1),[f.RUNE]:[120,230,255],[f.LINE]:[24,22,30]}}function hd(i,e,t,n=16){const r=new Xe({blend:.05});ld[i](r),r.ell([0,.004,0],[.01,.004,.01],f.NOSE,{group:0});const s=(Object.values(Ah).find(([o])=>o===i)||[,,1])[2],{sp:a}=gn(r,{scale:sd(t)*s});return{sp:a,colours:cd(e,t),metres:{width:+(a.w/n).toFixed(1),height:+(a.h/n).toFixed(1)}}}const ud=1.3,dd=i=>[1,Math.sqrt(i.growth),Math.sqrt(i.growth)*ud,i.growth],Pr=(i,e,t=1)=>Math.round(e.size*dd(e)[Math.max(0,Math.min(3,i))]*(2/(e.pixel||2))*1.9*t),ul=(i,e)=>{const t=la(e);for(let n=0;n<9;n++){const r=Math.floor(be(t,2,i.w-2)),s=Math.floor(be(t,2,i.h*.6));if(!(i.get(r,s)||i.get(r+1,s)||i.get(r-1,s)||i.get(r,s+1)||i.get(r,s-1))&&(i.px(r,s,f.MAGIC2),n%3===0))for(const[a,o]of[[1,0],[-1,0],[0,1],[0,-1]])i.px(r+a,s+o,f.MAGIC)}};function ha(i,e,t,n,r,s,a,o){const c=C.add(e,[-n*.7,n*(.75+r),t*n*.35]),l=C.norm(C.sub(c,e)),h=C.norm(C.sub([1,0,0],C.mul(l,C.dot([1,0,0],l)))),d=Math.hypot(...C.sub(c,e));i.flat(C.add(C.lerp(e,c,.5),C.mul(h,-n*.14)),l,h,d*.55,n*.34,Ui.wing(s,a),{group:o,extra:!0})}const dl=(i,e,t=1)=>i===0?Math.round(Math.max(12,Math.min(30*Math.max(.75,Math.min(1.1,t)),Pr(1,e)*t*.72))):i===2?Math.round(Math.max(Pr(1,e)*t*1.08,Math.min(Pr(2,e,t),Pr(1,e)*1.4))):Pr(i,e)*t;let Fs=null;function fd(i,e){const t=Fs;Fs=i;try{return e()}finally{Fs=t}}const pd=(i,e)=>{const t=Math.atan2(e,i);return Math.hypot(i,e)<.55+.4*Math.pow(Math.abs(Math.cos(t*2.5+Math.PI/2)),3)},md=(i,e)=>{const t=i*1.2,n=-e*1.2+.25;return Math.pow(t*t+n*n-.6,3)-t*t*n*n*n<0};function fl(i){const e=Fs,t=i.anchors;if(!e)return;const n=t.head,r=n?Math.max(...n.r):.2;if(e.collar&&(t.neck||n)){const s=t.neck||{c:C.add(n.c,[-n.r[0]*.8,-n.r[1]*.4,0]),r:n.r[1]*.75,dir:C.norm([1,.4,0])},a=C.norm(s.dir),o=C.norm(C.cross(a,Math.abs(a[2])<.9?[0,0,1]:[1,0,0])),c=C.cross(a,o),l=[],h=Math.max(.03,s.r*.2);for(let v=0;v<=16;v++){const x=v/16*Math.PI*2,m=C.add(C.mul(o,Math.cos(x)),C.mul(c,Math.sin(x)));let _=0;for(;_<.8&&i.field(C.add(s.c,C.mul(m,_)))<0;)_+=.01;_>=.8&&(_=s.r),l.push([...C.add(s.c,C.mul(m,_+h*.7)),h])}i.chain(l,f.COLLAR,{group:60,extra:!0});const d=l.reduce((v,x)=>x[0]-x[1]*.6+x[2]*.5>v[0]-v[1]*.6+v[2]*.5?x:v),u=h*1.3*(s.tag||1),p=C.norm(C.add(C.norm(C.sub(d.slice(0,3),s.c)),[.3,-.5,.3]));let g=d.slice(0,3);for(let v=0;v<60&&i.field(g)<u*.4;v++)g=C.add(g,C.mul(p,.01));i.ell(g,[u,u,u*.6],f.COLLAR,{group:60,extra:!0})}if(e.hat!=null&&n){const s=Math.max(r,.13),a=n.top||C.add(Xe.surface(n.c,n.r,C.norm([-.15,1,.1])),[0,r*.1,0]),o=C.norm([.3,1,.35]),c=s*1.5,l=C.add(a,C.mul(o,c));i.seg(C.add(a,C.mul(o,-s*.1)),l,s*.48,s*.04,f.HAT1,{group:61,extra:!0,paint:h=>Math.floor(C.dot(C.sub(h,a),o)/(c/5)+10)%2?f.HAT2:void 0}),i.ell(l,[s*.17,s*.17,s*.17],f.POM,{group:61,extra:!0})}if(e.glasses&&t.eyes&&n){const[s,a]=t.eyes.pts,o=l=>C.add(l,C.mul(C.norm(C.sub(l,n.c)),t.eyes.size*.45)),c=Math.max(t.eyes.size*1.05,r*.1);if(e.glasses==="bar")i.seg(o(s),o(a),c,c,f.SHADES,{group:62,extra:!0}),i.ell(C.add(o(a),[c*.3,c*.5,c*.2]),[c*.25,c*.25,c*.25],f.GLINT,{group:62,extra:!0});else for(const l of[s,a]){const h=C.norm(C.sub(l,n.c)),d=C.norm(C.cross([0,1,0],h)),u=C.cross(h,d),p=e.glasses==="heart"?md:pd,g=c*1.5;i.flat(o(l),d,u,g,g,(v,x)=>p(v,x)?p(v*1.3,x*1.3)?f.SHADES:f.FRAME:null,{group:62,bend:.1,extra:!0}),i.seg(o(s),o(a),c*.18,c*.18,f.FRAME,{group:62,extra:!0})}}if(e.shoes)for(const s of t.feet){const a=e.shoes==="platform",o=s.r,c=C.add(s.c,[o*.25,o*(a?.35:.15),0]);i.ell(c,[o*1.45,o*(a?1.2:.85),o*1.15],f.SHOE,{group:s.group,extra:!0,paint:l=>l[1]<c[1]-o*(a?.45:.4)?f.SOLE:e.shoes==="glitter"&&Nn(l,60,.28)?f.GLINT:void 0})}}function gd(i,e,t,n,r="towards"){const s={legW:1,earS:1,hgt:1,bw:.3,...i.q},a=e===3,o=e===1,c=e===0,l=B=>a&&i.legend.includes(B),h=new Xe,d=s.hr*(c?1.75:o?1.25:1)*(n.head/.44)**.5,u=s.len*(c?.8:o?.9:1.02)*n.long,p=c?.55:o?.9:1.04,g=t?-.04:0,v=1+g,x=s.chest*(a?1.06:1)/p+g,m=s.tuck/p+g,_=s.bw*(c?1.15:e>=2?1.06:1)*(s.legW>1.2?1.15:1),M=.06*s.legW*(a?1.1:c?1.7:1),S=s.back==="hump"?.1:0,w=s.back==="arch"?.1:0,E=x+.12,L=B=>{if(s.belly&&B[1]<E&&B[0]>-u*.5)return f.BELLY;if(s.saddle&&B[1]>v-.18&&B[0]<u*.55)return f.BODY2;if(s.spots&&B[1]>x+.1&&Nn(B,10,.22))return s.spotMat==="belly"||s.spots==="young"&&o?f.BELLY:s.spots==="young"?void 0:f.BODY3;if(s.ridge&&B[1]>v-.08+S*.5)return f.BODY3};if(h.ell([u*.48,(v+x)/2+S*.5,0],[u*.62,(v-x)/2+S*.5,_],f.BODY,{paint:L}),h.ell([-u*.5,(v+m)/2+w*.6,0],[u*.58,(v-m)/2+w*.6,_*.93],f.BODY,{paint:L}),h.ell([0,(v+(x+m)/2)/2+.02,0],[u*.6,(v-(x+m)/2)/2,_*.9],f.BODY,{paint:L}),s.ridge)for(let B=0;B<(a?16:10);B++){const ne=-u*.8+B*u*1.75/(a?15:9),le=(.07+(a?.04:0))*(1+.5*Math.max(0,ne/u));h.ell([ne,v+.02+S*Math.max(0,1-Math.abs(ne/u-.5)*2)+le*.5,0],[le,.03,_*.25],f.BODY3,{dir:[-.3,1,0],up:[1,0,0]})}if(s.wool)for(let B=0;B<14;B++){const ne=B/14*Math.PI*2;h.ell([u*Math.cos(ne)*.7,(v+x)/2+Math.sin(ne)*.2,_*(B%2?.5:-.5)],[.16,.14,.14],f.BODY)}const y=[.32,-.32][t],A=(B,ne)=>{const le=ne*_*.62,_e=B?u*.62:-u*.62,Ie=(B?1:-1)*ne*y,ke=B?x+.1:m+.15,ee=(B?ne:-ne)*(t?1:-1)>0?.06:0,se=[_e+Math.sin(Ie)*.2+(B?.02:.1),Math.max(.3,ke*.55),le],Y=[_e+Math.sin(Ie)*.42,.05+ee,le],he=[_e,ke+.12,le*.8],ae=ne>0?s.legMat||f.BODY:s.legMat?f.BODY3:f.BODY2,Ee=B?[[...he,M*1.5],[...se,M*1.05],[...Y,M*.9]]:[[...he,M*2*(s.haunch||1)],[...C.add(se,[-.12,.06,0]),M*1.2],[...C.add(Y,[-.06*(s.hindFoot||1),.12,0]),M*.9],[...Y,M*.9]];h.chain(Ee,ae,{group:ne>0?6+(B?1:0):2,paint:s.socks?Ce=>Ce[1]<s.socks?f.BODY3:void 0:void 0});const Ze=(s.paw==="hoof"?.07:.09)*s.legW**.5*(B?1:s.hindFoot||1);h.ell(C.add(Y,[Ze*.5,-.01,0]),[Ze,M*.9,M*1.1],s.paw==="hoof"?f.NOSE:ae,{group:ne>0?6+(B?1:0):2}),h.anchors.feet.push({c:C.add(Y,[Ze*.5,-.01,0]),r:Math.max(Ze,M*1.1),group:ne>0?6+(B?1:0):2})};for(const B of[-1,1])A(!0,B),A(!1,B);const D=[u*.82,v-.12,0],R=[D[0]+Math.cos(s.neckAng)*s.neck*.9,D[1]+Math.sin(s.neckAng)*s.neck*.9+(c?.1:0),0];h.seg(D,R,s.neckW*.55,s.neckW*.42,f.BODY,{paint:B=>s.belly&&B[1]<(D[1]+R[1])/2-.05?f.BELLY:s.face==="dark"?f.BODY2:void 0});const U=B=>{if(s.face==="badger")return Math.abs(B[2])<d*.22+(B[0]-R[0])*.1||B[1]<R[1]-d*.1?f.BELLY:f.BODY3;if(s.face==="dark")return f.BODY2;if((s.belly||s.muzzle)&&B[1]<R[1]-d*.35)return f.BELLY};h.ell(R,[d*1.05,d*.92,d*.88],f.BODY,{paint:U});const N=d*s.snout*(c?.55:o?.78:1),P=d*s.snoutD*.55,F=[R[0]+d*.65+N*.5,R[1]-d*.28,0];h.ell(F,[N*.62+d*.2,P,P*.95],f.BODY,{dir:[1,-.25,0],paint:B=>(s.muzzle||s.belly)&&B[1]<F[1]-P*.1?f.BELLY:U(B)});const O=[F[0]+N*.62+d*.1,F[1]-.02,0];h.ell(O,[d*(s.disc?.1:.12),d*(s.disc?.2:.12),d*(s.disc?.2:.15)],f.NOSE,{group:1});for(const B of[-1,1]){const ne=Xe.surface(R,[d*1.05,d*.92,d*.88],C.norm([.75,.32,B*.62]));h.ell(ne,[d*.13,d*.16,d*.13].map(le=>le*(s.eyeK||1)*(c?1.5:o?1.2:1)),a&&!s.tusks?f.MAGIC2:f.EYE,{group:1})}h.anchors.head={c:R,r:[d*1.05,d*.92,d*.88],top:[R[0]-d*.1,R[1]+d*.82,0]},h.anchors.eyes={pts:[-1,1].map(B=>Xe.surface(R,[d*1.05,d*.92,d*.88],C.norm([.75,.32,B*.62]))),size:d*.16*(s.eyeK||1)*(c?1.5:o?1.2:1)},h.anchors.neck={c:C.lerp(D,R,c?.05:o?.25:.42),r:s.neckW*.5*(c?1.3:o?1.12:1),dir:C.norm(C.sub(R,D)),tag:c?1.8:o?1.3:1};for(const B of[-1,1]){const ne=s.ear,le=[R[0]-d*.15,R[1]+d*.7,B*d*.5],_e=s.earS*(c?1.2:1)*(s.ear==="long"?.62:1);if(ne==="none")continue;if(ne==="round"){h.ell(le,[d*.22,d*.25*_e,d*.1],f.BODY,{group:1,paint:Ee=>Ee[0]>le[0]+d*.02?f.EAR:void 0});continue}const Ie=ne==="long",ke=ne==="small"?-.6:0,ee=d*.55*_e*(ne==="big"?1.35:Ie?2.2:1),se=d*.3*(ne==="big"?1.2:Ie?1.35:1),Y=C.norm([ke*.6-(Ie?.3:.12),1,B*.3]),he=C.norm([.55,.2,B]),ae=C.norm(C.cross(he,Y));h.flat(C.add(le,C.mul(Y,ee)),ae,Y,se,ee,Ui.ear(f.BODY,f.EAR,f.BODY3),{group:5+(B>0?0:20),extra:Ie}),ne==="tuft"&&h.seg(C.add(le,[0,ee*1.4,B*.02]),C.add(le,[0,ee*1.85,B*.04]),d*.05,d*.02,f.BODY3,{group:1})}const V=[-u*1.05,v-.1+w*.5,0],Q=t?.04:-.02;if(l("tails")||xd(h,l("starTail")?"star":s.tail,V,u,v,Q),s.horns)for(const B of[-1,1]){const ne=o?.6:c?.35:l("hornsGlow")?1.4:1,le=[];for(let _e=0;_e<=8;_e++){const Ie=.3-_e/8*Math.PI*1.6,ke=d*.65*ne*(1-.45*_e/8);le.push([R[0]-d*.1+Math.cos(Ie)*ke,R[1]+d*.45+Math.sin(Ie)*ke,B*(d*.6+_e*.015)]),le[_e].push(d*.2*ne*(1-.6*_e/8))}h.chain(le,l("hornsGlow")?f.MAGIC:f.ACCENT,{group:13})}if(s.antlers||l("jackalope"))for(const B of[-1,1])vd(h,s,[R[0]-d*.05,R[1]+d*.75,B*d*.4],B,e,l);if(s.tusks)for(const B of[-1,1]){const ne=o?.4:c?0:l("tusksBig")?1.3:.75;if(!ne)continue;const le=[F[0]+N*.25,F[1]-P*.4,B*P*.8];h.chain([[...le,.045*ne],[...C.add(le,[.1*ne,.1*ne,B*.03]),.04*ne],[...C.add(le,[.06*ne,.24*ne,B*.05]),.02*ne]],f.ACCENT,{group:8})}s.teeth&&!c&&h.ell([O[0]-d*.1,O[1]-d*.25,0],[d*.08,d*.14,d*.12],f.ACCENT,{group:1});const X=B=>[-u*.9+B*u*1.65,v+S*Math.max(0,1-Math.abs(B-.8)*3)+w*(1-Math.abs(B-.4)*2),0];if(l("wings"))for(const B of[-1,1])ha(h,[u*.2,v,B*_*.5],B,1.15,t?.1:0,B>0?f.MAGIC2:f.MAGIC,f.MAGIC,40+(B>0?10:0));if(l("mane")||l("flames"))for(let B=0;B<7;B++){const ne=B/6,le=C.lerp(C.add(R,[-d*.5,d*.3,0]),X(.55),ne),_e=[.4,.3,.45,.28,.38,.25,.3][B],Ie=C.norm([-.35-(t?.1:0),1,0]);h.flat(C.add(le,C.mul(Ie,_e*.5)),[1,0,0],Ie,_e*.32,_e*.55,Ui.flame(B%2?f.MAGIC:f.MAGIC2,f.MAGIC2),{group:60+B%2,extra:!0})}if(l("tails"))for(let B=0;B<7;B++){const ne=Math.PI*(.55+B*.08),le=(B-3)*.1,_e=C.add(V,[Math.cos(ne)*.9,Math.sin(ne)*.85,le]);h.chain([[...V,.1],[...C.lerp(V,_e,.5),.17],[..._e,.08]],B%2?f.BODY2:f.BODY,{group:70,extra:!0}),h.ell(_e,[.09,.09,.09],f.MAGIC2,{group:71,extra:!0})}if(l("crystals")&&[.15,.3,.45,.6,.75].forEach((B,ne)=>{const le=X(B),_e=[.3,.5,.4,.6,.35][ne];h.ell(C.add(le,[0,_e*.45,(ne%2-.5)*.1]),[_e*.55,.08,.08],f.MAGIC,{dir:[(ne-2)*.12,1,0],group:80+ne%2,extra:!0,paint:Ie=>Ie[2]>0?f.MAGIC2:void 0})}),l("moss")){for(let B=0;B<6;B++)h.ell(X(.08+B*.15),[u*.22,.07,_*.85],f.LEAF,{group:85,extra:!0});for(const[B,ne]of[[.25,.55],[.5,.8],[.75,.45]]){const le=X(B);h.seg(le,C.add(le,[0,ne*.7,0]),.04,.025,f.TRUNK,{group:86,extra:!0}),h.ell(C.add(le,[0,ne*.8,0]),[ne*.28,ne*.26,ne*.28],f.LEAF2,{group:87,extra:!0,paint:_e=>_e[1]<le[1]+ne*.72?f.LEAF3:void 0})}for(const B of[.12,.4,.65,.9]){const ne=X(B);h.ell(C.add(ne,[0,.12,_*.3]),[.07,.035,.07],f.MAGIC,{group:89,extra:!0})}}if(l("ribbons"))for(let B=0;B<3;B++){const ne=[];for(let le=0;le<9;le++){const _e=le/8;ne.push([u*(.5-_e*2.2),v+.05+B*.1+_e*(.25+B*.12)+Math.sin(_e*6+t+B)*.07,(B-1)*.18,.04*(1-_e*.6)])}h.chain(ne,B%2?f.MAGIC2:f.MAGIC,{group:90+B,extra:!0})}fl(h);const{sp:te}=gn(h,{height:dl(e,n,s.hgt),facing:r});return a&&ul(te,i.id.length*7919),te}function xd(i,e,t,n,r,s){const a={group:3},o=c=>-n*c;e==="brush"?i.chain([[...t,.1],[o(1.3),r-.25+s,0,.15],[o(1.4),r-.55,0,.14],[o(1.35),.38+s,0,.09]],f.BODY,{...a,paint:c=>c[1]<.32?f.BODY3:void 0}):e==="bushy"?i.chain([[...t,.1],[o(1.05)-.35,r-.05+s,0,.17],[o(1.05)-.75,r-.2+s,0,.18],[o(1.05)-1,r-.35+s,0,.1]],f.BODY,{...a,paint:c=>c[0]<o(1.05)-.82?f.BELLY:void 0}):e==="stub"||e==="deer"||e==="bob"?i.ell(C.add(t,[-.06,.02+s,0]),[.1,.08,.07],e==="deer"?f.BELLY:f.BODY,{...a,paint:e==="bob"?c=>c[0]<t[0]-.08?f.BODY3:void 0:void 0}):e==="puff"?i.ell(C.add(t,[-.04,.02,0]),[.11,.11,.1],f.BELLY,a):e==="squirrel"||e==="star"?i.chain([[...t,.12],[o(1.3),r+.05+s,0,.25],[o(1.3),r+.6+s,0,.3],[o(1),r+.95+s,0,.27],[o(.65),r+.9+s,0,.16]],e==="star"?f.MAGIC:f.BODY,{...a,extra:!0,paint:e==="star"?c=>Nn(c,14,.12)?f.GLINT:void 0:void 0}):e==="otter"?i.chain([[...t,.17],[o(1.3),r-.45+s,0,.12],[o(1.6),.1,0,.07],[o(1.85),.06+s,0,.03]],f.BODY,a):e==="stoat"?i.chain([[...t,.08],[o(1.3),r-.12+s,0,.07],[o(1.6),r-.05+s,0,.06]],f.BODY,{...a,paint:c=>c[0]<o(1.45)?f.BODY3:void 0}):e==="flat"?(i.seg(t,[o(1.15),.3,0],.08,.07,f.BODY2,a),i.ell([o(1.4),.1+s*.5,0],[.28,.03,.14],f.BODY3,a)):e==="thin"&&(i.chain([[...t,.04],[o(1.1),r-.3,0,.03],[o(1.12)+s,r-.55,0,.025]],f.BODY,a),i.ell([o(1.12)+s,r-.62,0],[.04,.07,.04],f.BODY3,a))}function vd(i,e,t,n,r,s){const a=!e.antlers,o=a?.45:[0,.5,.95,.95][r]*(s("antlersGlow")?1.15:1),c=s("antlersGlow")?n>0?f.MAGIC2:f.MAGIC:f.ACCENT,l={group:11+(n>0?1:0),extra:!0};if(!o)return;const h=.045*Math.max(.8,o),d=n*.35*o;if(e.antlers==="palm"){const x=C.add(t,[-.06*o,.12*o,d*.3]);i.seg(t,x,h*1.3,h*1.2,c,l);for(let m=0;m<5;m++){const _=.35+m*.3,M=C.norm([-Math.cos(_),Math.sin(_)*.9,n*.55]),S=(.24+.05*(m%2))*o;i.ell(C.add(x,C.mul(M,S*.55)),[S*.6,h*1.5,h*.6],c,{...l,dir:M,up:[0,0,1]})}return}const u=C.add(t,[-.18*o,.3*o,d*.4]),p=C.add(t,[-.25*o,.62*o,d*.8]),g=C.add(t,[-.1*o,.95*o,d]);i.chain([[...t,h*1.2],[...u,h],[...p,h*.85],[...g,h*.4]],c,l);const v=(x,m,_,M)=>i.seg(x,C.add(x,C.mul(C.norm(m),_)),M,M*.35,c,l);v(C.add(t,[-.04*o,.1*o,d*.1]),[1,.6,0],.28*o,h*.8),(o>.4||a)&&v(u,[1,.9,0],.3*o,h*.7),o>.7&&(v(p,[.8,1,0],.28*o,h*.6),v(g,[.3,1,n*.2],.18*o,h*.5))}function _d(i,e,t,n,r="towards"){const s=e===3,a=e===1,o=e===0,c=g=>s&&i.legend.includes(g),l=new Xe,h=t?.03:0,d=o?.48:a?.42:.36,u=(o?.95:1.08)+h;for(const g of[-1,1]){const v=t&&g>0?.04:0;l.seg([.05,.2,g*.14],[.08,.05+v,g*.15],.07,.06,f.BODY2,{group:2});for(const x of[-.04,0,.04])l.ell([.16,.03+v,g*.15+x],[.06,.025,.02],f.ACCENT,{group:2});l.anchors.feet.push({c:[.13,.04+v,g*.15],r:.08,group:g>0?6:2})}if(l.ell([-.32,.32,0],[.22,.06,.14],f.BODY2,{dir:[-1,-.6,0],group:3}),l.ell([0,.55+h,0],[.36,.52,.36],f.BODY,{paint:g=>g[0]>.12&&g[1]<u-d*.5?Math.floor(g[1]*18)%3===0&&Nn(g,16,.5)?f.BODY2:f.BELLY:void 0}),!c("wings"))for(const g of[-1,1])l.ell([-.06,.58+h,g*.3],[.4,.3,.08],f.BODY2,{dir:[-.3,-1,0],up:[1,0,0],group:g>0?4:2,paint:v=>Nn(v,12,.15)?f.BODY3:void 0});l.ell([0,u,0],[d,d*.9,d],f.BODY);for(const g of[-1,1]){const v=C.norm([.75,-.05,g*.4+.35]),x=C.add(Xe.surface([0,u,0],[d,d*.9,d],v),C.mul(v,-d*.05));l.ell(x,[d*.22,d*.46,d*.4],f.BELLY,{group:1,dir:v});const m=C.add(x,C.mul(v,d*.14));l.ell(m,[d*.1,d*.26,d*.24].map(_=>_*(o?1.15:1)),s?f.MAGIC:f.IRIS,{group:1,dir:v}),l.ell(C.add(m,C.mul(v,d*.07)),[d*.08,d*.14,d*.13].map(_=>_*(o?1.15:1)),s?f.MAGIC2:f.EYE,{group:1,dir:v}),(l.anchors.eyes||={pts:[],size:d*.22}).pts.push(C.add(m,C.mul(v,d*.07))),o||l.ell([d*.05,u+d*.8,g*d*.6],[d*.32,d*.12,d*.08],f.BODY2,{dir:[-.1,1,g*.7],up:[1,0,0],group:1})}if(l.ell(Xe.surface([0,u,0],[d,d*.9,d],C.norm([.75,-.35,.35])),[d*.2,d*.12,d*.1],f.ACCENT,{dir:[.6,-1,.3],group:1}),c("wings"))for(const g of[-1,1])ha(l,[-.05,.8+h,g*.3],g,1.3,t?.12:0,g>0?f.MAGIC2:f.MAGIC,f.MAGIC,40+(g>0?10:0));if(c("eyesRing"))for(let g=0;g<7;g++){const v=Math.PI*(.15+g/6*.7);l.ell([Math.cos(v)*.2-.1,u+.1+Math.sin(v)*.6,(g-3)*.15],[.07,.07,.07],f.MAGIC2,{group:95+g,extra:!0}),l.ell([Math.cos(v)*.2-.05,u+.1+Math.sin(v)*.6,(g-3)*.15],[.035,.035,.035],f.EYE,{group:95+g,extra:!0})}l.anchors.head={c:[0,u,0],r:[d,d*.9,d]},l.anchors.neck={c:[0,u-d*.75,0],r:d*.85,dir:[0,1,0]},fl(l);const{sp:p}=gn(l,{height:dl(e,n,.95),facing:r});return s&&ul(p,31),p}const Si=(i,e,t,n,r,s,a=1)=>{for(const o of n)i.ell(Xe.surface(e,t,C.norm(o)),[r,r*1.2,r],s,{group:a});i.anchors.head||={c:e,r:t},i.anchors.eyes||={pts:n.map(o=>Xe.surface(e,t,C.norm(o))),size:r}},Th=(i,e,t)=>i.ell([e,.005,0],[t,.005,t*.6],f.NOSE,{group:0});function An(i,e,t,n,r,s){fl(i);const{sp:a}=gn(i,{height:dl(t,n,r),facing:s});return t===3&&ul(a,e.id.length*131),a}const Rh=(i,e,t)=>{i.ell(e,[t,t*.35,t],f.MAGIC,{group:95,extra:!0,paint:n=>n[1]>e[1]?f.MAGIC2:void 0});for(let n=0;n<5;n++){const r=n/5*Math.PI*2;i.ell(C.add(e,[Math.cos(r)*t*.8,t*.55,Math.sin(r)*t*.8]),[t*.38,t*.12,t*.12],f.MAGIC,{dir:[0,1,0],up:[1,0,0],group:96,extra:!0})}},pl=(i,e)=>e.forEach(([t,n],r)=>i.ell(C.add(t,[0,n*.45,0]),[n*.55,.07,.07],f.MAGIC,{dir:[(r%3-1)*.25,1,(r%2-.5)*.3],group:80+r%2,extra:!0,paint:s=>s[2]>t[2]?f.MAGIC2:void 0}));function Md(i,e,t,n,r="towards"){const s=e===3,a=new Xe,o=t?.03:0;for(const[d,u]of[[.28,.2],[.28,-.2],[-.28,.2],[-.28,-.2]])a.seg([d,.15,u],[d+(u>0?o:-o),.03,u],.06,.05,f.BODY3,{group:u>0?6:2}),a.anchors.feet.push({c:[d+.03+(u>0?o:-o),.03,u],r:.065,group:u>0?6:2});const c=[0,.32,0],l=[.5,.32,.38];a.ell(c,l,f.BODY2,{paint:d=>Nn(d,22,.3)?f.BODY3:Nn(d,19,.12)?f.BELLY:void 0});for(let d=0;d<46;d++){const u=d*2.399%(Math.PI*2),p=d/46*.9+.05,g=C.norm([Math.cos(u)*Math.sin(p*Math.PI*.5)-.25,Math.cos(p*Math.PI*.5)*.9+.1,Math.sin(u)*Math.sin(p*Math.PI*.5)]);g[0]>.55||a.ell(C.add(Xe.surface(c,l,g),C.mul(g,.02)),[.1,.025,.025],d%4?f.BODY2:f.BODY3,{dir:C.add(g,[-.4,0,0]),group:1})}const h=[.48,.22,0];return a.ell(h,[.22,.14,.15],f.BELLY,{dir:[1,-.3,0],group:1}),a.ell([.69,.16,0],[.04,.04,.04],f.NOSE,{group:1}),Si(a,h,[.22,.14,.15],[[.3,.6,.55],[.3,.6,-.55]],.035,s?f.MAGIC2:f.EYE),s&&pl(a,[[[-.3,.55,.1],.35],[[-.05,.62,-.1],.5],[[.2,.55,.12],.4],[[-.15,.58,.2],.3]]),An(a,i,e,n,.6,r)}function Sd(i,e,t,n,r="towards"){const s=e===3,a=new Xe,o=t?.05:0;for(const h of[-1,1])a.ell([-.22,.16,h*.36],[.24,.13,.12],h>0?f.BODY:f.BODY2,{dir:[1,.3,0],group:h>0?6:2,paint:d=>Nn(d,14,.15)?f.BODY3:void 0}),a.ell([.05,.04,h*.4],[.16,.04,.08],h>0?f.BODY:f.BODY2,{group:h>0?6:2}),a.seg([.35,.2+o,h*.24],[.42,.03,h*.3],.05,.04,h>0?f.BODY:f.BODY2,{group:h>0?7:2}),a.anchors.feet.push({c:[.45,.03,h*.3],r:.06,group:h>0?7:2},{c:[.12,.04,h*.4],r:.08,group:h>0?6:2});const c=[0,.3+o,0],l=[.5,.28,.4];a.ell(c,l,f.BODY,{paint:h=>h[1]<c[1]-.12?f.BELLY:h[0]>.38&&Math.abs(h[1]-(c[1]-.02))<.018?f.LINE:Nn(h,14,.22)?f.BODY3:void 0});for(const h of[-1,1]){const d=[.3,.55+o,h*.17];a.ell(d,[.1,.09,.1],f.BODY,{group:1}),a.ell(Xe.surface(d,[.1,.09,.1],C.norm([.6,.5,h*.5])),[.05,.05,.05],s?f.MAGIC2:f.IRIS,{group:1}),a.ell(Xe.surface(d,[.11,.1,.11],C.norm([.65,.45,h*.5])),[.03,.015,.03],f.EYE,{group:1})}return a.anchors.head={c:[.22,.45+o,0],r:[.3,.2,.3],top:[.18,.62+o,0]},a.anchors.eyes={pts:[-1,1].map(h=>Xe.surface([.3,.55+o,h*.17],[.1,.09,.1],C.norm([.6,.5,h*.5]))),size:.05},a.anchors.neck={c:[.32,.3+o,0],r:.25,dir:[1,.3,0]},s&&Rh(a,[.15,.66+o,0],.16),An(a,i,e,n,.55,r)}function yd(i,e,t,n,r="towards"){const s=e===3,a=e===1,o=u=>s&&i.legend.includes(u),c=new Xe,l=t?.02:0;for(const u of[-1,1]){const p=t&&u>0?.04:0;c.seg([0,.3,u*.08],[.03,.03+p,u*.08],.03,.025,f.NOSE,{group:u>0?7:2}),c.ell([.08,.02+p,u*.08],[.08,.015,.04],f.NOSE,{group:2}),c.anchors.feet.push({c:[.07,.03+p,u*.08],r:.06,group:u>0?7:2})}if(c.ell([-.55,.42,0],[.32,.035,.12],f.BODY2,{dir:[-1,-.25,0],group:3}),c.ell([0,.52+l,0],[.42,.26,.24],f.BODY,{dir:[1,.45,0]}),!o("wings"))for(const u of[-1,1])c.ell([-.1,.55+l,u*.2],[.45,.17,.05],f.BODY2,{dir:[-1,-.25,0],group:u>0?4:2});const h=[.36,.84+l,0],d=a?.19:.16;if(c.ell(h,[d*1.1,d,d*.95],f.BODY,{paint:u=>u[1]>h[1]+d*.55?f.BELLY:void 0}),c.ell(C.add(h,[d*1.5,-d*.25,0]),[d*1,d*.38,d*.3],f.NOSE,{dir:[1,-.2,0],group:1}),Si(c,h,[d*1.1,d,d*.95],[[.55,.35,.65],[.55,.35,-.65]],d*.16,s?f.MAGIC2:f.EYE),o("wings"))for(const u of[-1,1])ha(c,[-.05,.65+l,u*.18],u,1.1,t?.1:0,u>0?f.MAGIC2:f.MAGIC,f.MAGIC,40+(u>0?10:0));if(o("eyesRing"))for(let u=0;u<6;u++){const p=Math.PI*(.2+u/5*.6);c.ell([Math.cos(p)*.25-.1,.95+Math.sin(p)*.45,(u-2.5)*.12],[.06,.06,.06],f.MAGIC2,{group:95+u,extra:!0})}return An(c,i,e,n,.75,r)}function bd(i,e,t,n,r="towards"){const s=e===3,a=u=>s&&i.legend.includes(u),o=new Xe,c=t===0,l=.55,h=a("wingsBig")?1.5:1;Th(o,0,.3*h);for(const u of[-1,1]){const p=[0,l+.05,u*.1],g=[.05,l+(c?.35:-.05),u*.45*h],v=[[-.05,l+(c?.45:-.15),u*.85*h],[-.25,l+(c?.2:-.25),u*.75*h],[-.3,l+(c?0:-.25),u*.4*h]],x=a("wingsBig")?f.MAGIC:f.BODY2,m=a("wingsBig")?f.MAGIC2:f.BODY3;o.seg(p,g,.03,.025,m,{group:11});for(const E of v)o.seg(g,E,.02,.012,m,{group:11});const _=C.sub(v[0],p),M=C.norm(_),S=C.norm(C.sub(v[2],g)),w=C.norm(C.sub(S,C.mul(M,C.dot(S,M))));o.flat(C.add(C.lerp(p,v[0],.5),C.mul(w,.12*h)),M,w,Math.hypot(..._)*.55,.3*h,Ui.membrane(x),{group:10+(u>0?1:0),bend:.2})}o.ell([0,l,0],[.13,.16,.12],f.BODY,{group:1});const d=[.08,l+.2,0];o.ell(d,[.12,.11,.11],f.BODY,{group:1});for(const u of[-1,1])o.ell(C.add(d,[-.02,.15,u*.07]),[.12,.045,.02],f.BODY,{dir:[.1,1,u*.3],up:[1,0,0],group:1,paint:p=>p[0]>d[0]-.01?f.EAR:void 0});return Si(o,d,[.12,.11,.11],[[.7,.2,.5],[.7,.2,-.5]],.025,s?f.MAGIC2:f.EYE),o.ell(Xe.surface(d,[.12,.11,.11],[1,-.2,0]),[.025,.02,.03],f.NOSE,{group:1}),An(o,i,e,n,.55,r)}function wd(i,e,t,n,r="towards"){const s=e===3,a=new Xe,o=t?.03:0;a.seg([-.5,.18,0],[-.62,.12,0],.04,.02,f.SKIN,{group:3});for(const c of[-1,1])a.ell([-.3,.05,c*.2],[.07,.04,.05],f.SKIN,{group:c>0?6:2}),a.anchors.feet.push({c:[-.3,.05,c*.2],r:.07,group:c>0?6:2});a.ell([0,.3,0],[.52,.29,.33],f.BODY,{paint:c=>c[1]>.45?f.BODY2:void 0}),a.ell([.55,.24,0],[.2,.07,.07],f.SKIN,{dir:[1,-.15,0],group:1}),a.ell([.74,.21,0],[.04,.05,.06],f.NOSE,{group:1});for(const c of[-1,1]){const l=[.32,.1-(c>0?o:0),c*.34];a.ell(l,[.13,.035,.12],f.SKIN,{group:c>0?7:2,axes:[[1,0,0],[0,1,0],[0,0,1]]});for(let h=0;h<4;h++)a.ell(C.add(l,[.14,-.01,c*(h-1.5)*.05]),[.05,.015,.015],f.ACCENT,{group:c>0?7:2})}for(const c of[-1,1])a.ell(Xe.surface([0,.3,0],[.52,.29,.33],C.norm([.85,.3,c*.35])),[.015,.015,.015],s?f.MAGIC2:f.EYE,{group:1});return a.anchors.head={c:[.32,.34,0],r:[.25,.22,.25],top:[.3,.58,0]},a.anchors.eyes={pts:[-1,1].map(c=>Xe.surface([0,.3,0],[.52,.29,.33],C.norm([.85,.3,c*.35]))),size:.03},a.anchors.neck={c:[.36,.3,0],r:.27,dir:[1,.1,0]},s&&Rh(a,[.15,.62,0],.15),An(a,i,e,n,.55,r)}function Ed(i,e,t,n,r="towards"){const s=e===3,a=d=>s&&i.legend.includes(d),o=new Xe;for(const d of[-1,1])for(let u=0;u<3;u++){const p=.25-u*.25,g=(u+(d>0?1:0)+t)%2?.06:-.06,v=[p,.22,d*.2];o.chain([[...v,.03],[p+g+(1-u)*.06,.32,d*.42,.025],[p+g*1.5+(1-u)*.15,.02,d*.55,.015]],d>0?f.BODY2:f.BODY3,{group:d>0?7:2})}o.ell([-.12,.34,0],[.46,.24,.32],f.BODY,{paint:d=>Math.abs(d[2])<.018&&d[1]>.4?f.LINE:d[1]>.5&&d[2]>.05&&d[2]<.17?f.BELLY:void 0}),o.ell([.38,.33,0],[.16,.16,.26],f.BODY,{group:1});const c=[.56,.3,0];o.ell(c,[.1,.1,.17],f.BODY2,{group:1});const l=[.3,.5,.7,.75][e]*(a("horn")?1.3:1),h=a("horn")?f.MAGIC:f.BODY3;for(const d of[-1,1]){const u=C.add(c,[.08,.02,d*.1]),p=C.add(u,[l*.7,l*.45,d*l*.15]),g=C.add(p,[l*.25,-l*.12,-d*l*.12]);o.chain([[...u,.045],[...p,.035],[...g,.015]],h,{group:8+(d>0?1:0)}),o.seg(C.lerp(u,p,.55),C.add(C.lerp(u,p,.55),[0,l*.22,0]),.02,.008,h,{group:8})}for(const d of[-1,1])o.chain([[...C.add(c,[.05,.06,d*.1]),.012],[c[0]+.1,.5,d*.22,.012],[c[0]+.2,.5,d*.26,.012]],f.BODY3,{group:9,extra:!0});return Si(o,c,[.1,.1,.17],[[.4,.3,.85],[.4,.3,-.85]],.032,s?f.MAGIC2:f.EYE,9),a("crystals")&&pl(o,[[[-.35,.5,.1],.3],[[-.1,.55,-.08],.45],[[.1,.5,.1],.35]]),An(o,i,e,n,.5,r)}function Ad(i,e,t,n,r="towards"){const s=e===3,a=new Xe,o=t?.04:0;a.ell([0,.07,0],[.6+o,.07,.17],f.SKIN,{group:1}),a.chain([[.45+o,.08,0,.1],[.6+o,.25,0,.09],[.68+o,.28,0,.08]],f.SKIN,{group:1});for(const h of[-1,1])a.seg([.7+o,.32,h*.04],[.78+o,.55,h*.1],.018,.014,f.SKIN,{group:5}),a.ell([.78+o,.57,h*.1],[.03,.03,.03],s?f.MAGIC2:f.EYE,{group:5});a.anchors.head={c:[.68+o,.3,0],r:[.09,.08,.09],top:[.66+o,.38,0]},a.anchors.eyes={pts:[-1,1].map(h=>[.78+o,.57,h*.1]),size:.03},a.anchors.neck={c:[.55+o,.17,0],r:.1,dir:[1,1.2,0]};const c=[-.12,.4,0],l=s?f.MAGIC:f.BODY;return a.ell(c,[.32,.32,.22],l,{group:3,paint:h=>{const d=Math.atan2(h[1]-c[1],h[0]-c[0]);return((Math.hypot(h[0]-c[0],h[1]-c[1])/.32-d/(Math.PI*2)*.3)%.3+.3)%.3<.06?s?f.MAGIC2:f.BODY3:void 0}}),An(a,i,e,n,.45,r)}function Td(i,e,t,n,r="towards"){const s=e===3,a=new Xe;for(const o of[-1,1])for(let c=0;c<7;c++){const l=-.45+c*.15,h=(c+t)%2?.03:-.03;a.seg([l,.1,o*.22],[l+h,.01,o*.33],.025,.015,f.BODY3,{group:o>0?7:2})}for(const o of[-1,1])a.chain([[.5,.15,o*.08,.02],[.7,.3,o*.2,.015],[.82,.22,o*.26,.012]],f.BODY3,{group:9,extra:!0});return a.ell([0,.18,0],[.58,.2,.3],f.BODY,{paint:o=>(Math.floor((o[0]+.6)*9)%2&&o[1]>.2?f.BODY2:void 0)||(Math.abs((o[0]+.6)*9%1)<.12?f.LINE:void 0)}),Si(a,[0,.18,0],[.58,.2,.3],[[.92,.3,.25],[.92,.3,-.25]],.02,s?f.MAGIC2:f.EYE),s&&pl(a,[[[-.3,.32,.05],.3],[[0,.37,-.05],.45],[[.25,.32,.05],.32]]),An(a,i,e,n,.4,r)}function Rd(i,e,t,n,r="towards"){const s=e===3,a=e===1,o=p=>s&&i.legend.includes(p),c=new Xe,l=t?.7:0,h=[];for(let p=0;p<=12;p++){const g=p/12;h.push([-.9+g*1.2,.07,Math.sin(g*Math.PI*2+l)*.25*(1-g*.5),.03+.045*Math.sin(Math.min(1,g*1.4)*Math.PI/2)])}h.push([.38,.25,h[12][2],.07],[.42,.45,h[12][2]*.8,.065]),c.chain(h,f.BODY,{paint:p=>p[1]<.05&&p[0]<.35?f.BELLY:Nn([p[0]*1.5,p[1],p[2]],14,.3)?f.BODY3:void 0});const d=[.5,.5,h[13][2]*.8],u=a?.11:.09;if(c.ell(d,[u*1.5,u*.75,u],f.BODY,{dir:[1,-.15,0],group:1}),Si(c,d,[u*1.5,u*.75,u],[[.5,.5,.7],[.5,.5,-.7]],u*.22,s?f.MAGIC2:f.EYE),t||c.seg(C.add(d,[u*1.4,-u*.2,0]),C.add(d,[u*2.3,-u*.3,0]),.01,.008,f.SKIN,{group:1}),c.anchors.feet.push({c:C.add(h[0].slice(0,3),[-.02,-.01,0]),r:.06,group:3,tail:!0}),c.anchors.neck={c:[.42,.36,h[12][2]*.9],r:.075,dir:[.2,1,0]},o("wings"))for(const p of[-1,1])ha(c,[0,.2,p*.05],p,.9,t?.1:0,p>0?f.MAGIC2:f.MAGIC,f.MAGIC,40+(p>0?10:0));return An(c,i,e,n,.45,r)}function Cd(i,e,t,n,r="towards"){const s=e===3,a=u=>s&&i.legend.includes(u),o=new Xe,c=t===0,l=.55,h=a("wingsBig")?1.45:1,d=a("wingsBig")?f.MAGIC:f.BODY;Th(o,0,.3*h);for(const u of[-1,1]){const p=c?.5:-.1,g=C.norm([.35,p,u]),v=C.norm([-.3,p*.6,u]);o.flat(C.add([0,l,u*.05],C.mul(g,.38*h)),g,C.norm(C.cross(g,[0,1,0])),.4*h,.24*h,Ui.spotted(d,f.BELLY,f.BODY3),{group:10+(u>0?1:0)}),o.flat(C.add([-.05,l,u*.05],C.mul(v,.26*h)),v,C.norm(C.cross(v,[0,1,0])),.27*h,.17*h,Ui.spotted(a("wingsBig")?f.MAGIC2:f.BODY2,f.BODY2,f.BODY2),{group:12+(u>0?1:0)}),o.chain([[.12,l+.08,u*.03,.015],[.2,l+.25,u*.1,.025],[.24,l+.32,u*.14,.012]],f.BODY2,{group:11})}return o.ell([0,l,0],[.22,.09,.09],f.BELLY,{group:1,paint:u=>Nn(u,30,.25)?f.BODY2:void 0}),o.ell([.17,l+.03,0],[.07,.07,.07],f.BELLY,{group:1}),Si(o,[.17,l+.03,0],[.07,.07,.07],[[.7,.3,.6],[.7,.3,-.6]],.02,s?f.MAGIC2:f.EYE),An(o,i,e,n,.5,r)}function Ld(i,e,t,n,r="towards"){const s=e===3,a=l=>s&&i.legend.includes(l),o=new Xe,c=t?.05:0;for(let l=0;l<9;l++){const h=l/8,d=-.6+h*1.15;o.ell([d,.12+Math.sin(h*Math.PI)*(.06+c),0],[.08,.1-h*.02,.12-h*.03],l<2?f.MAGIC2:l%2?f.BODY2:f.BODY,{group:1})}a("lantern")&&o.ell([-.75,.3,0],[.22,.22,.22],f.MAGIC2,{group:3,paint:l=>l[1]<.2?f.MAGIC:void 0});for(let l=0;l<6;l++)o.seg([-.2+l*.12,.05,.08],[-.2+l*.12+(l%2?.02:-.02)*(t?-1:1),0,.12],.015,.01,f.BODY3,{group:7});return o.ell([.6,.14,0],[.06,.06,.08],f.BODY3,{group:1}),Si(o,[.6,.14,0],[.06,.06,.08],[[.6,.3,.7],[.6,.3,-.7]],.015,s?f.MAGIC2:f.EYE),An(o,i,e,n,.4,r)}function Pd(i,e,t,n,r="towards"){const s=e===3,a=h=>s&&i.legend.includes(h),o=new Xe,c=[.15,.28,0];for(const h of[-1,1])for(let d=0;d<4;d++){const u=-.6+d*.4,p=(d+(h>0?0:1)+t)%2?.05:-.05,g=C.add(c,[.05-d*.04,0,h*.1]),v=C.add(g,[Math.cos(u)*.3*(d<2?1:-.6)+p,.3,h*.3]),x=C.add(g,[Math.cos(u)*.55*(d<2?1:-.8)+p*1.5,-.28,h*.55]);o.chain([[...g,.03],[...v,.028],[...x,.015]],h>0?f.BODY2:f.BODY3,{group:h>0?7:2})}o.ell([-.28,.38,0],[.34,.28,.3],f.BODY,{paint:h=>(Math.abs(h[2])<.03||Math.abs(h[0]+.28)<.03)&&h[1]>.45?f.BELLY:void 0}),o.ell(c,[.18,.13,.17],f.BODY2,{group:1}),o.anchors.head={c,r:[.18,.13,.17]},o.anchors.eyes={pts:[[.05,.05],[.05,-.05]].map(([h,d])=>Xe.surface(c,[.18,.13,.17],C.norm([.9,h*6,d*4]))),size:.03},o.anchors.neck={c:[-.02,.32,0],r:.15,dir:[1,0,0]};const l=a("eyesRing");for(const[h,d]of[[.05,.05],[.05,-.05],[.02,.1],[.02,-.1]])o.ell(Xe.surface(c,[.18,.13,.17],C.norm([.9,h*6,d*4])),[.025,.025,.025],l?f.MAGIC2:f.EYE,{group:1});if(l)for(let h=0;h<5;h++){const d=Math.PI*(.2+h/4*.6);o.ell([-.3+Math.cos(d)*.2,.75+Math.sin(d)*.35,(h-2)*.12],[.06,.06,.06],f.MAGIC2,{group:95+h,extra:!0})}return An(o,i,e,n,.5,r)}const Dd=new Map(Object.entries({owl:_d,hedgehog:Md,toad:Sd,raven:yd,bat:bd,mole:wd,beetle:Ed,snail:Ad,woodlouse:Td,snake:Rd,moth:Cd,glowworm:Ld,spider:Pd})),ml=[{id:"wolf",name:"Wolf",plan:"quad",hue:.08,sat:.24,val:.56,legend:["wings","mane"],q:{len:.64,chest:.42,tuck:.6,neck:.32,neckAng:.7,neckW:.42,hr:.26,snout:.82,snoutD:.7,ear:"point",earS:.82,tail:"brush",paw:"paw",legW:1.25,saddle:!0,belly:!0},tail:"up"},{id:"fox",name:"Fox",plan:"quad",q:{hgt:.8,len:.62,chest:.4,tuck:.5,neck:.3,neckAng:.7,neckW:.32,hr:.24,snout:1.05,snoutD:.5,snoutTaper:.6,ear:"point",earS:1.35,tail:"bushy",paw:"paw",legW:.9,belly:!0,socks:.3},hue:.06,sat:.8,val:.9,belly:"white",legend:["tails"]},{id:"badger",name:"Badger",plan:"quad",q:{hgt:.62,len:.78,chest:.2,tuck:.22,neck:.18,neckAng:.1,neckW:.5,hr:.26,snout:1,snoutD:.55,snoutTaper:.55,ear:"round",earS:.7,tail:"stub",paw:"paw",legW:1.35,legMat:f.BODY3,face:"badger",shaggy:!0},hue:.65,sat:.08,val:.45,legend:["crystals"]},{id:"boar",name:"Boar",plan:"quad",hue:.07,sat:.62,val:.5,legend:["tusksBig"],q:{len:.72,chest:.34,tuck:.42,neck:.2,neckAng:-.15,neckW:.55,hr:.27,snout:1.25,snoutD:.62,snoutTaper:.55,ear:"small",earS:.8,tail:"thin",paw:"hoof",legW:1.15,ridge:!0,tusks:!0,back:"hump",disc:!0},ridge:!0},{id:"stag",name:"Stag",plan:"quad",q:{hgt:1.3,len:.6,chest:.6,tuck:.7,neck:.55,neckAng:.95,neckW:.32,hr:.2,snout:1.15,snoutD:.6,snoutTaper:.65,ear:"point",earS:1.1,tail:"deer",paw:"hoof",legW:.75,antlers:"branch",rump:!0,spots:"young",belly:!0},hue:.08,sat:.5,val:.7,legend:["antlersGlow"]},{id:"hare",name:"Hare",plan:"quad",q:{hgt:.72,len:.5,chest:.4,tuck:.45,neck:.2,neckAng:.9,neckW:.35,hr:.27,snout:.65,snoutD:.7,ear:"long",earS:2.4,tail:"puff",paw:"paw",legW:.85,haunch:1.35,hindFoot:1.6,back:"arch",belly:!0,whiskers:!0},hue:.08,sat:.4,val:.72,legend:["jackalope"]},{id:"owl",name:"Owl",plan:"owl",hue:.08,sat:.5,val:.55,legend:["eyesRing","wings"]},{id:"bear",name:"Bear",plan:"quad",q:{hgt:1.15,len:.72,chest:.38,tuck:.4,neck:.25,neckAng:.3,neckW:.55,hr:.28,snout:.7,snoutD:.62,snoutTaper:.7,ear:"round",earS:.8,tail:"stub",paw:"paw",legW:1.55,back:"hump",muzzle:!0,shaggy:!0},hue:.07,sat:.55,val:.42,legend:["moss"]},{id:"hedgehog",name:"Hedgehog",plan:"hedgehog",hue:.08,sat:.4,val:.5,legend:["crystals"]},{id:"squirrel",name:"Squirrel",plan:"quad",q:{hgt:.55,len:.45,chest:.35,tuck:.4,neck:.2,neckAng:.9,neckW:.35,hr:.3,snout:.55,snoutD:.65,ear:"tuft",earS:1.1,tail:"squirrel",paw:"paw",legW:.8,haunch:1.3,back:"arch",belly:!0,whiskers:!0},hue:.03,sat:.75,val:.75,belly:"white",legend:["starTail"]},{id:"toad",name:"Toad",plan:"toad",hue:.2,sat:.5,val:.55,legend:["crown"]},{id:"otter",name:"Otter",plan:"quad",q:{hgt:.55,len:1,chest:.25,tuck:.25,neck:.3,neckAng:.35,neckW:.5,hr:.27,snout:.6,snoutD:.7,ear:"round",earS:.5,tail:"otter",paw:"paw",legW:1.1,muzzle:!0,belly:!0,whiskers:!0},hue:.07,sat:.55,val:.45,belly:"white",legend:["ribbons"]},{id:"lynx",name:"Lynx",plan:"quad",q:{hgt:.9,len:.55,chest:.5,tuck:.55,neck:.25,neckAng:.8,neckW:.4,hr:.27,snout:.5,snoutD:.75,snoutTaper:.8,ear:"tuft",earS:1,tail:"bob",paw:"paw",legW:1.2,cheeks:!0,spots:!0,belly:!0,whiskers:!0},hue:.09,sat:.45,val:.75,legend:["mane"]},{id:"elk",name:"Elk",plan:"quad",q:{hgt:1.4,len:.68,chest:.6,tuck:.66,neck:.45,neckAng:.75,neckW:.42,hr:.24,snout:1.6,snoutD:.9,snoutTaper:.85,ear:"point",earS:.9,tail:"stub",paw:"hoof",legW:.9,back:"hump",antlers:"palm",shaggy:!0},hue:.07,sat:.55,val:.38,legend:["antlersGlow","moss"]},{id:"raven",name:"Raven",plan:"raven",hue:.68,sat:.35,val:.3,legend:["wings","eyesRing"]},{id:"bat",name:"Bat",plan:"bat",hue:.78,sat:.25,val:.45,legend:["wingsBig"]},{id:"mole",name:"Mole",plan:"mole",hue:.7,sat:.15,val:.32,legend:["crown"]},{id:"beaver",name:"Beaver",plan:"quad",q:{hgt:.6,len:.65,chest:.2,tuck:.22,neck:.2,neckAng:.4,neckW:.55,hr:.28,snout:.6,snoutD:.75,ear:"round",earS:.45,tail:"flat",paw:"paw",legW:1.2,back:"arch",teeth:!0,whiskers:!0},hue:.06,sat:.6,val:.45,legend:["moss"]},{id:"stoat",name:"Stoat",plan:"quad",q:{hgt:.5,len:1,chest:.3,tuck:.33,neck:.35,neckAng:.6,neckW:.32,hr:.25,snout:.6,snoutD:.6,ear:"round",earS:.6,tail:"stoat",paw:"paw",legW:.8,belly:!0,back:"arch",whiskers:!0},hue:.1,sat:.25,val:.92,legend:["ribbons","mane"]},{id:"snail",name:"Snail",plan:"snail",hue:.08,sat:.45,val:.55,legend:["glowShell"]},{id:"ram",name:"Ram",plan:"quad",q:{hgt:.95,len:.6,chest:.48,tuck:.52,neck:.22,neckAng:.45,neckW:.48,hr:.25,snout:.85,snoutD:.75,snoutTaper:.8,ear:"small",earS:.7,tail:"stub",paw:"hoof",legW:.9,wool:!0,horns:"curl",face:"dark"},hue:.1,sat:.12,val:.88,legend:["hornsGlow"]},{id:"woodlouse",name:"Woodlouse",plan:"woodlouse",hue:.65,sat:.12,val:.45,legend:["crystals"]},{id:"snake",name:"Snake",plan:"snake",hue:.25,sat:.45,val:.45,legend:["wings"]},{id:"moth",name:"Moth",plan:"moth",hue:.1,sat:.3,val:.7,legend:["wingsBig"]},{id:"marten",name:"Pine marten",plan:"quad",q:{hgt:.55,len:.78,chest:.35,tuck:.38,neck:.3,neckAng:.55,neckW:.35,hr:.25,snout:.65,snoutD:.6,ear:"round",earS:.9,tail:"bushy",paw:"paw",legW:.85,belly:!0,back:"arch"},hue:.07,sat:.6,val:.45,legend:["mane"]},{id:"salamander",name:"Salamander",plan:"quad",q:{hgt:.42,len:.9,chest:.14,tuck:.14,neck:.12,neckAng:.05,neckW:.5,hr:.27,snout:.55,snoutD:.55,ear:"none",tail:"otter",paw:"paw",legW:1,spots:!0,spotMat:"belly"},hue:.1,sat:.1,val:.22,belly:"yellow",legend:["flames"]},{id:"glowworm",name:"Glow-worm",plan:"glowworm",hue:.12,sat:.4,val:.35,legend:["lantern"]},{id:"spider",name:"Spider",plan:"spider",hue:.07,sat:.45,val:.4,legend:["eyesRing"]},{id:"dormouse",name:"Dormouse",plan:"quad",q:{hgt:.38,len:.45,chest:.35,tuck:.38,neck:.15,neckAng:.6,neckW:.4,hr:.34,snout:.45,snoutD:.7,ear:"round",earS:.85,tail:"squirrel",paw:"paw",legW:.8,back:"arch",belly:!0,whiskers:!0,eyeK:1.6},hue:.09,sat:.6,val:.75,belly:"white",legend:["starTail"]},{id:"beetle",name:"Stag beetle",plan:"beetle",hue:.78,sat:.5,val:.35,legend:["horn","crystals"]}],Ch=Object.fromEntries(ml.map(i=>[i.id,i])),go=[[[255,70,170],[255,245,250],[255,230,70]],[[40,220,255],[255,236,60],[255,80,180]],[[150,80,255],[175,255,60],[255,255,255]]],xo={sneakers:[[255,70,90],[250,250,245]],glitter:[[215,215,235],[190,190,210]],platform:[[160,60,230],[40,30,52]]},Id=["bar","star","heart"];function Nd(i,e=!0){const t=la((i|0)*7919+17),n=t()<.12;return{collar:e,hat:n||t()<.45?Math.floor(t()*go.length):null,glasses:n||t()<.4?Id[t()<.6?0:t()<.5?1:2]:null,shoes:n||t()<.4?Object.keys(xo)[Math.floor(t()*3)]:null}}function Ud(i,e,t=null){const n=Fd(i,e);if(!t)return n;if(t.collar&&(n[f.COLLAR]=Array.isArray(t.collar)?t.collar:n[f.MAGIC]),t.hat!=null){const[r,s,a]=go[t.hat%go.length];n[f.HAT1]=r,n[f.HAT2]=s,n[f.POM]=a}if(t.glasses&&(n[f.SHADES]=[22,18,32],n[f.FRAME]=t.glasses==="heart"?[255,60,110]:[255,90,210]),t.shoes){const[r,s]=xo[t.shoes]||xo.sneakers;n[f.SHOE]=r,n[f.SOLE]=s}if(t.woken){n[f.WOKEN]=[255,40,36];for(const r of[f.BODY,f.BODY2,f.BODY3,f.BELLY,f.ACCENT,f.EAR])n[r]&&(n[r]=n[r].map((s,a)=>Math.round(s*.72+[30,8,12][a]*.1)))}return n}function Fd(i,e){const t=Ch[i],n=e.cVal/.85,r=e.cSat/.6,s=ge(t.hue,t.sat*r*e.sat,t.val*n),a=t.belly==="yellow"?[240,196,40]:t.belly==="white"||t.q?.face==="badger"?[236,232,222]:ge(t.hue+.03,t.sat*.5*r,Math.min(1,t.val*n*1.3+.08)),o=ge(e.magicHue+t.hue*.3,.6,1),c=ge(e.magicHue+t.hue*.3,.18,1),l=["boar","stag","elk","ram"].includes(t.id);return{[f.BODY]:s,[f.BODY2]:ge(t.hue+.02,Math.min(1,t.sat*r*1.2+.05),t.val*n*.66),[f.BODY3]:ge(t.hue+.03,Math.min(1,t.sat*r*1.3+.1),t.val*n*.4),[f.BELLY]:a,[f.ACCENT]:l?[236,226,200]:ge(t.hue+.05,t.sat*.6,Math.min(1,t.val*n*.5+.25)),[f.MAGIC]:o,[f.MAGIC2]:c,[f.LEAF]:ge(.3,.55,.55),[f.LEAF2]:ge(.25,.5,.75),[f.LEAF3]:ge(.33,.6,.35),[f.TRUNK]:ge(.07,.45,.32),[f.EYE]:[24,18,30],[f.PUPIL]:[70,40,90],[f.GLINT]:[255,255,245],[f.NOSE]:[38,28,36],[f.EAR]:ge(t.hue+.97,Math.min(1,t.sat*.6+.2),Math.min(1,t.val*n*.55+.2)),[f.IRIS]:t.plan==="owl"?[255,176,40]:ge(.12,.7,.85),[f.SKIN]:[238,158,192]}}const Od=["size","growth","pixel","head","eye","legs","long","fur"],Dr=new Map;function Bd(i,e,t,n,r="towards",s=null){const a=Ch[i]||ml[0],o=s&&(s.collar||s.hat!=null||s.glasses||s.shoes||s.woken)?s:null,c=[a.id,e,t,r,...Od.map(h=>n[h]),o?[!!o.collar,o.hat??"",o.glasses||"",o.shoes||"",!!o.woken].join(","):""].join("|");let l=Dr.get(c);if(!l){if(l=fd(o,()=>a.q?gd(a,e,t,n,r):Dd.get(a.plan)(a,e,t,n,r)),o?.woken)for(let h=0;h<l.m.length;h++)(l.m[h]===f.EYE||l.m[h]===f.IRIS||l.m[h]===f.PUPIL)&&(l.m[h]=f.WOKEN);Dr.size>600&&Dr.delete(Dr.keys().next().value),Dr.set(c,l)}return l}const ua=.07,gl=.048,$e=(...i)=>({l:i}),_t=(i,e,t,n,r)=>({a:[i,e,t,n,r]}),$t=(i,e)=>({d:[i,e]}),dt=(i,e=.86)=>$e([.5,e],[.5,i]),ft=_t(.5,.76,.13,25,155),zd=i=>i.l?{l:i.l.map(([e,t])=>[1-e,t])}:i.a?{a:[1-i.a[0],i.a[1],i.a[2],180-i.a[3],180-i.a[4]]}:{d:[1-i.d[0],i.d[1]]},pt=(...i)=>i.flatMap(e=>[e,zd(e)]);function qn(i,e,t){const n=e[0]-i[0],r=e[1]-i[1],s=Math.hypot(n,r),a=t*s,o=(s*s/4+a*a)/(2*Math.abs(a)),c=(i[0]+e[0])/2,l=(i[1]+e[1])/2,h=r/s,d=-n/s,u=(o-Math.abs(a))*Math.sign(a),p=c-h*u,g=l-d*u,v=Math.atan2(i[1]-g,i[0]-p)*180/Math.PI;let m=Math.atan2(e[1]-g,e[0]-p)*180/Math.PI-v;for(;m>180;)m-=360;for(;m<-180;)m+=360;return _t(p,g,o,v,v+m)}const kd=(i,e,t,n,r,s=24)=>$e(...Array.from({length:s+1},(a,o)=>[i+n*Math.sin(o/s*r*2*Math.PI),e+(t-e)*o/s])),Gd=(i,e,t,n,r,s=0,a=40)=>$e(...Array.from({length:a+1},(o,c)=>{const l=c/a,h=(s+l*r*360)*Math.PI/180,d=t+(n-t)*l;return[i+d*Math.cos(h),e+d*Math.sin(h)]})),as=(i,e,t,n,r)=>r.map(s=>{const a=Math.cos(s*Math.PI/180),o=Math.sin(s*Math.PI/180);return $e([i+t*a,e+t*o],[i+n*a,e+n*o])}),Hd={wolf:[dt(.3),$e([.28,.08],[.5,.3],[.72,.08]),_t(.5,.55,.2,-55,55),ft,$t(.5+.2*Math.cos(-55*Math.PI/180),.55+.2*Math.sin(-55*Math.PI/180))],fox:[dt(.34),$e([.36,.06],[.5,.34],[.64,.06]),_t(.67,.66,.17,180,-80),$t(.67+.17*Math.cos(-80*Math.PI/180),.66+.17*Math.sin(-80*Math.PI/180)),ft],badger:[dt(.1),$e([.24,.3],[.76,.3]),...pt($e([.33,.14],[.33,.56])),ft,...pt($t(.24,.3))],boar:[dt(.16),...pt(_t(.36,.24,.15,45,180)),...as(.5,.16,0,.1,[-130,-90,-50]),ft],stag:[dt(.42),...pt($e([.5,.42],[.34,.26],[.3,.06]),$e([.335,.25],[.16,.2]),$e([.32,.15],[.18,.07])),ft],hare:[dt(.44),...pt($e([.5,.44],[.4,.34],[.38,.06])),_t(.62,.66,.09,180,540),ft,...pt($t(.38,.06))],owl:[dt(.44),...pt(_t(.33,.3,.13,0,360),$e([.24,.18],[.18,.05])),ft,...pt($t(.33,.3))],bear:[dt(.24),$e([.24,.3],[.76,.3]),...pt(_t(.3,.3,.09,180,360)),...pt($e([.36,.5],[.32,.62])),ft],hedgehog:[dt(.52),_t(.5,.52,.2,180,360),...as(.5,.52,.22,.34,[-160,-125,-90,-55,-20]),ft],squirrel:[dt(.2),$e([.5,.2],[.4,.08]),_t(.66,.4,.16,100,-200),$t(.66+.16*Math.cos(-200*Math.PI/180),.4+.16*Math.sin(-200*Math.PI/180)),ft],toad:[dt(.42),$e([.16,.54],[.24,.42],[.76,.42],[.84,.54]),...pt(_t(.34,.3,.1,0,360)),ft,...pt($t(.16,.54))],otter:[dt(.24),_t(.5,.5,.28,-100,100),$t(.5+.28*Math.cos(-100*Math.PI/180),.5+.28*Math.sin(-100*Math.PI/180)),qn([.18,.64],[.36,.64],.3),ft],lynx:[dt(.32),$e([.26,.2],[.5,.32],[.74,.2]),...pt($e([.26,.2],[.26,.06])),$e([.5,.68],[.66,.62]),ft,...pt($t(.26,.06))],elk:[dt(.3),...pt($e([.5,.3],[.42,.2]),_t(.3,.16,.12,0,180),$e([.18,.16],[.14,.06])),$e([.5,.44],[.6,.52]),ft],raven:[dt(.14),$e([.5,.14],[.3,.22]),$e([.18,.56],[.5,.38],[.82,.56]),ft,$t(.58,.17),...pt($t(.18,.56))],bat:[dt(.3),_t(.5,.16,.14,20,160),...pt($e([.5,.38],[.12,.26]),qn([.12,.26],[.24,.46],-.25),qn([.24,.46],[.38,.5],-.3),qn([.38,.5],[.5,.52],-.3)),ft],mole:[dt(.44),_t(.5,.3,.16,0,180),...as(.5,.3,.19,.3,[-160,-125,-55,-20]),$e([.5,.14],[.5,.04]),ft],beaver:[dt(.36),$e([.32,.2],[.68,.2]),...pt($e([.44,.2],[.44,.34])),$e([.5,.56],[.68,.66],[.5,.76],[.32,.66],[.5,.56]),ft],stoat:[dt(.18),_t(.5,.44,.24,180,360),$e([.5,.18],[.6,.08]),ft,...pt($t(.26,.44))],snail:[dt(.52),Gd(.5,.33,.03,.2,1.6,90),$e([.66,.2],[.76,.06]),ft,$t(.76,.06)],ram:[dt(.24),...pt(_t(.36,.24,.14,0,-250)),ft,...pt($t(.36+.14*Math.cos(-250*Math.PI/180),.24+.14*Math.sin(-250*Math.PI/180)))],woodlouse:[dt(.24),_t(.5,.52,.22,205,335),_t(.5,.66,.24,205,335),_t(.5,.38,.2,205,335),...pt($e([.5,.24],[.32,.06])),ft],snake:[dt(.16),kd(.5,.82,.2,.2,1.25),$e([.5,.2],[.5,.11]),...pt($e([.5,.11],[.42,.045])),ft],moth:[dt(.2),...pt($e([.5,.3],[.16,.18],[.24,.5],[.5,.4]),$e([.5,.5],[.3,.64],[.5,.66]),_t(.38,.16,.12,0,-110)),ft],marten:[dt(.32),$e([.3,.2],[.5,.32],[.7,.2]),...pt(_t(.3,.14,.07,90,-180)),_t(.28,.56,.22,0,150),$t(.28+.22*Math.cos(150*Math.PI/180),.56+.22*Math.sin(150*Math.PI/180)),ft],salamander:[dt(.3),qn([.5,.3],[.5,.06],.35),qn([.5,.3],[.5,.06],-.35),...pt($e([.5,.42],[.32,.38],[.26,.48]),$e([.5,.64],[.32,.6],[.26,.7])),ft,...pt($t(.38,.52))],glowworm:[dt(.4),_t(.5,.27,.1,90,450),...as(.5,.27,.15,.25,[0,60,120,180,240,300]),ft],spider:[$e([.5,.05],[.5,.3]),dt(.5),_t(.5,.4,.11,-90,270),...pt(...[-150,-170,170,150].map(i=>$e([.5+.12*Math.cos(i*Math.PI/180),.4+.12*Math.sin(i*Math.PI/180)],[.5+.28*Math.cos(i*Math.PI/180),.4+.28*Math.sin(i*Math.PI/180)],[.5+.32*Math.cos(i*Math.PI/180),.4+.28*Math.sin(i*Math.PI/180)+.1]))),ft,$t(.5,.05)],dormouse:[dt(.12),_t(.5,.46,.24,-60,250),...pt(_t(.34,.16,.08,90,-180)),qn([.56,.38],[.7,.38],-.4),ft],beetle:[dt(.36),...pt(_t(.66,.26,.2,160,250)),qn([.5,.38],[.5,.82],.25),qn([.5,.38],[.5,.82],-.25),ft]},ic={pink:[255,64,200],cyan:[50,235,255],acid:[175,255,45],violet:[165,95,255],orange:[255,135,35],lemon:[255,238,70],red:[255,55,95],mint:[70,255,175],blue:[70,145,255],magenta:[235,70,255]},Wd={badger:"pink",boar:"cyan",snail:"acid",fox:"violet",ram:"orange",woodlouse:"lemon",hedgehog:"red",squirrel:"mint",wolf:"blue",stag:"magenta",stoat:"pink",snake:"cyan",hare:"acid",owl:"violet",bear:"orange",toad:"lemon",otter:"red",lynx:"mint",elk:"blue",raven:"magenta",bat:"pink",mole:"cyan",beaver:"acid",beetle:"violet",moth:"orange",marten:"lemon",salamander:"red",glowworm:"mint",spider:"blue",dormouse:"magenta"},da=i=>ic[Wd[i]]||ic.cyan,Vd=[255,255,250],Xd=(i,e,t)=>i.map((n,r)=>Math.round(n+(e[r]-n)*t)),rc=i=>`rgb(${i.join(",")})`;function Yd(i=0){const e=Math.max(0,i);return{level:e,metres:2+e+Math.max(0,e-2)*.5,core:1+.2*e,halo:Math.min(1,.45+.19*e),rings:e>=4?3:e>=3?2:e>=2?1:0,dots:e>=1&&e<2?12:0,band:e>=3,rays:e>=4?8:e>=3?4:0,shimmer:e>=3}}function Os(i){if(i.d)return{dot:!0,pts:[i.d],len:gl*2};let e=i.l;if(i.a){const[n,r,s,a,o]=i.a,c=Math.max(6,Math.ceil(Math.abs(o-a)/8));e=Array.from({length:c+1},(l,h)=>{const d=(a+(o-a)*h/c)*Math.PI/180;return[n+s*Math.cos(d),r+s*Math.sin(d)]})}let t=0;for(let n=1;n<e.length;n++)t+=Math.hypot(e[n][0]-e[n-1][0],e[n][1]-e[n-1][1]);return{dot:!1,pts:e,len:t}}const vo=(i,e=0,t=1)=>{const n=i.reduce((s,a)=>s+a.len,0)||1;let r=0;for(const s of i)s.start=e+(t-e)*r/n,r+=s.len,s.end=e+(t-e)*r/n;return i},Aa=new Map;function Lh(i){return Aa.has(i)||Aa.set(i,vo((Hd[i]||[]).map(e=>({...Os(e),w:ua,part:"sigil"})))),Aa.get(i)}const Ta=new Map;function qd(i,e=0){const t=i+":"+e;if(Ta.has(t))return Ta.get(t);const n=e===null?null:Yd(e),r=n?n.rings>=2?.6:n.rings||n.dots?.66:.8:1,s=(1-r)/2,a=n?n.core:1,o=ua*.55*((n?.level??0)<3?1:Math.min(1.6,.8+.25*n.level)),c=[];if(n){const p=g=>Os({a:[.5,.5,g,90,450]});for(let g=0;g<n.rings;g++)c.push({...p(.44-g*.06),w:o,part:"ring"});for(let g=0;g<n.dots;g++){const v=(90+g*360/n.dots)*Math.PI/180;c.push({dot:!0,pts:[[.5+.44*Math.cos(v),.5+.44*Math.sin(v)]],len:.05,r:.042,w:o,part:"ring"})}if(n.band&&n.rings>=2)for(let g=0;g<16;g++){const v=(90+g*22.5)*Math.PI/180,x=.44-.06+.014,m=.44-.014;c.push({...Os({l:[[.5+x*Math.cos(v),.5+x*Math.sin(v)],[.5+m*Math.cos(v),.5+m*Math.sin(v)]]}),w:o*.8,part:"band"})}for(let g=0;g<n.rays;g++){const v=(90+g*360/n.rays)*Math.PI/180,x=.44+.02,m=.5-o/2;c.push({...Os({l:[[.5+x*Math.cos(v),.5+x*Math.sin(v)],[.5+m*Math.cos(v),.5+m*Math.sin(v)]]}),w:o*1.3,part:"ray"})}}const l=Math.min(1.25,a),h=Lh(i).map(u=>({dot:u.dot,len:u.len*r,pts:u.pts.map(([p,g])=>[s+p*r,s+g*r]),w:u.w*r*l,r:gl*r*l,part:"sigil"})),d={level:e,frame:n,k:r,strokes:[...vo(c,0,c.length?.15:0),...vo(h,c.length?.15:0,1)]};return Ta.set(t,d),d}function Kd(i,e){if(e>=i.end)return i.pts;if(e<=i.start)return null;if(i.dot)return i.pts;let t=(e-i.start)/(i.end-i.start)*i.len;const n=[i.pts[0]];for(let r=1;r<i.pts.length;r++){const s=i.pts[r-1],a=i.pts[r],o=Math.hypot(a[0]-s[0],a[1]-s[1]);if(t<=o){n.push([s[0]+(a[0]-s[0])*t/o,s[1]+(a[1]-s[1])*t/o]);break}n.push(a),t-=o}return n}function $d(i,e,{x:t=0,y:n=0,size:r=64,level:s=null,colour:a=da(e),progress:o=1,glow:c=!0}={}){const l=qd(e,s),h=l.frame?l.frame.halo:.7;i.save(),i.translate(t,n),i.scale(r,r),i.lineCap="round",i.lineJoin="round";const d=(u,p,g,v)=>{i.globalAlpha=g,i.strokeStyle=i.fillStyle=rc(u),i.shadowColor=rc(a),i.shadowBlur=v;for(const x of l.strokes){const m=Kd(x,o);if(m){if(i.beginPath(),x.dot){i.arc(m[0][0],m[0][1],x.r*(p>1?1.5:1),0,Math.PI*2),i.fill();continue}i.lineWidth=x.w*p,m.forEach((_,M)=>M?i.lineTo(_[0],_[1]):i.moveTo(_[0],_[1])),i.stroke()}}};c?(d(a,2.4,Math.min(h,.7)*.55,r/12),d(Xd(a,Vd,.72),.62,1,r/30)):d(a,1,1,0),i.restore()}function Zd(i,e,t,n){let r=1/0;for(const s of i){if(s.start>=r)break;if(s.dot){Math.hypot(e-s.pts[0][0],t-s.pts[0][1])<gl+n-ua/2&&(r=s.start);continue}let a=0;for(let o=1;o<s.pts.length;o++){const c=s.pts[o-1],l=s.pts[o],h=l[0]-c[0],d=l[1]-c[1],u=h*h+d*d,p=Math.sqrt(u),g=u?Math.max(0,Math.min(1,((e-c[0])*h+(t-c[1])*d)/u)):0;if(Math.hypot(e-c[0]-h*g,t-c[1]-d*g)<n){const v=s.start+(a+g*p)/s.len*(s.end-s.start);v<r&&(r=v)}a+=p}}return r}function Jd(i,e,t,n=ua/2){return Zd(Lh(i),e,t,n)<1/0}ml.map(i=>i.id);const Qd=new Set([f.TRUNK,f.BARK2,f.BARKD,f.BARKL]);function Fi(i,e,t,n,r,s,{mat:a=f.LEAF,group:o=30,ragged:c=1}={}){const h=[];for(let m=0;m<9;m++){const _=m/9*Math.PI*2,M=1+(s()-.5)*.35*(r.clump+.3);h.push([e[0]+Math.cos(_)*t*M,e[1]+Math.sin(_)*n*M*(Math.sin(_)>0?.8:1)])}const d=Math.max(1,Math.round(Math.min(t,n)/3.5));i.shape(ca(h,0,9,d,Math.max(1.2,Math.min(t,n)*.14)*c,1),a,{group:o,line:!1,round:r.round}),i.mark([At(e,[-t*1.1,n*.15]),At(e,[t*1.1,n*.1]),At(e,[t*1.1,n*1.2]),At(e,[-t*1.1,n*1.2])],f.LEAF3,[a]),i.mark([At(e,[-t*.75,-n*.55]),At(e,[t*.25,-n*.95]),At(e,[t*.55,-n*.35]),At(e,[-t*.2,-n*.05])],f.LEAF2,[a]);const u=Math.floor(e[0]-t*1.2),p=Math.ceil(e[0]+t*1.2),g=Math.floor(e[1]-n*1.2),v=Math.ceil(e[1]+n*1.2),x=s()*1e4|0;for(let m=g;m<=v;m++)for(let _=u;_<=p;_++){const M=i.get(_,m);if(M!==a&&M!==f.LEAF2&&M!==f.LEAF3)continue;const S=Rt(_,m,x),w=mi(_/2,m/2,x)*.5+S*.5;w<.16*r.density?i.recolour(_,m,M===f.LEAF2?a:f.LEAF2):w>1-.16*r.density&&i.recolour(_,m,M===f.LEAF3?a:f.LEAF3)}}function Mi(i,e,t,n,r,s,a,o,{mat:c=f.TRUNK,bend:l=1,group:h=10,line:d=!1}={}){const u=[e],p=4;let g=t,v=e;for(let x=1;x<=p;x++)g+=(o()-.5)*.7*a.gnarl*l,v=At(v,[Math.cos(g)*n/p,Math.sin(g)*n/p]),u.push(v);return i.limb(u.map((x,m)=>[...x,r+(s-r)*m/p]),c,{group:h,line:d,round:a.round,cap:.6,capEnd:1}),{end:v,ang:g,pts:u}}function fa(i,e,t,n,r,s,a){if(i.shape([[e-n*1.05,t],[e-n*.62,t-n*.5],[e-n*.45,t-n*1.4],[e+n*.45,t-n*1.4],[e+n*.62,t-n*.5],[e+n*1.05,t]],f.TRUNK,{group:10,round:r.round}),r.roots<=0)return;const o=Math.round(2+r.roots*4);for(let c=0;c<o;c++){const l=c%2?1:-1,h=(8+s()*16)*a*(.4+r.roots),d=(2+s()*3)*a,u=[e+l*n*.2,t-n*.5],p=[e+l*(n*.55+h*.4),t-d],g=[e+l*(n*.5+h),t-.5];i.limb([[...u,n*.55],[...p,n*.28],[...g,1.2]],f.TRUNK,{group:11,round:r.round,cap:.5,capEnd:.6})}}function pa(i,e,t=!0){if(!(e.bark<=0))for(let n=0;n<i.h;n++)for(let r=0;r<i.w;r++){const s=n*i.w+r;if(i.m[s]!==f.TRUNK)continue;const a=t?mi(r/1.3,n/6,21):mi(r/6,n/1.3,21);a>1-e.bark*.42||Rt(r,n,4)<e.bark*.05?i.m[s]=f.BARKD:a>1-e.bark*.62&&i.n[s*3]<-.1&&(i.m[s]=f.BARKL)}}function _r(i,e,t){let n=i.w,r=-1,s=i.h;for(let u=0;u<i.h;u++)for(let p=0;p<i.w;p++)i.m[u*i.w+p]&&(n=Math.min(n,p),r=Math.max(r,p),s=Math.min(s,u));if(r<0)return{sp:i,crownY:t};const a=Math.max(e-n,r-e)+2,o=Math.max(0,Math.floor(e-a)),c=Math.min(i.w-o,Math.ceil(a*2)+1),l=Math.max(0,s-1),h=i.h-l,d=new cn(c,h);for(let u=0;u<h;u++)for(let p=0;p<c;p++){const g=(u+l)*i.w+p+o,v=u*c+p;d.m[v]=i.m[g],d.g[v]=i.g[g],d.n[v*3]=i.n[g*3],d.n[v*3+1]=i.n[g*3+1],d.n[v*3+2]=i.n[g*3+2]}return{sp:d,crownY:t-l}}const Zr=i=>(i.crownWidth||3)/3;function Ph(i,e,t){const n=Zr(e),r=Math.round(220*t*n+60*t),s=Math.round(140*t),a=new cn(r,s),o=r/2,c=s,l=e.treeTrunks||1,h=12*t*(e.treeThick||1)*(e.treeThin?.55:1)/Math.sqrt(l),d=(i()-.5)*.5*e.gnarl+(e.treeLean||0),u=[];let p=s;const g=(v,x,m,_,M)=>{const S=Mi(a,v,x,m,_,_*.65,e,i,{group:12});if(M===0){u.push(S.end);return}const w=i()<.35?3:2;for(let E=0;E<w;E++){const L=(E-(w-1)/2)*be(i,.5,.85)*(M===3?1.4:1);g(S.end,S.ang+L+(i()-.5)*.25,m*be(i,.6,.78),_*.62,M-1)}M<=2&&u.push(ti(v,S.end,.7))};for(let v=0;v<l;v++){const x=d+(l>1?(v/(l-1)-.5)*.8:0),m=[o+(v-(l-1)/2)*h*.6,c],_=Mi(a,m,-Math.PI/2+x,s*.36*(l>1?be(i,.75,1.15):1),h,h*.72,e,i,{bend:1.4});p=Math.min(p,_.end[1]);for(const M of[-1,1])g(_.end,-Math.PI/2+x*.5+M*be(i,.55,.95)*(.7+.3*n)*(l>1?.6:1),s*.22*(.75+.25*n)*(l>1?.7:1),h*.7,l>2?2:3);if(l===1&&i()<.7&&g(_.end,-Math.PI/2+(i()-.5)*.3,s*.18,h*.55,2),v===0&&e.treeHollow){const M=ti(m,_.end,.38);a.ellipse(M[0],M[1],h*.28,h*.5,f.NOSE,{round:.3})}}if(fa(a,o,c,h*Math.sqrt(l),e,i,t),pa(a,e),e.treeWebs)for(let v=0;v+1<u.length;v+=2){const x=u[v],m=u[v+1],_=Math.hypot(m[0]-x[0],m[1]-x[1]);if(_<40*t)for(let M=0;M<=_;M++){const S=ti(x,m,M/_);a.px(S[0],S[1]+Math.sin(M/_*Math.PI)*_*.15,f.WEB,0,0,1)}}if(e.treeBare)return _r(a,o,p+4*t);u.sort((v,x)=>v[1]-x[1]);for(const v of u)Fi(a,At(v,[0,-3*t]),be(i,14,21)*t,be(i,10,14)*t,e,i,{mat:i()<.35?f.LEAF3:f.LEAF});for(const v of u)i()<.75&&Fi(a,At(v,[be(i,-9,9)*t,be(i,-12,-3)*t]),be(i,10,15)*t,be(i,7,10)*t,e,i);return _r(a,o,p+4*t)}function xl(i,e,t){const n=.8+.2*Zr(e),r=Math.round(90*t*n),s=Math.round(160*t),a=new cn(r,s),o=r/2,c=s;a.limb([[o,c,6*t],[o,c-s*.5,4*t],[o,6*t,1.5]],f.TRUNK,{group:10,round:e.round}),fa(a,o,c,6*t,e,i,t*.6),pa(a,e);const l=Math.round(be(i,9,12));for(let h=l-1;h>=0;h--){const d=h/(l-1),u=6*t+d*s*.7,p=(5+d*36)*t*n*be(i,.9,1.1),g=(5+d*13)*t,v=[[o,u-4*t],[o+p*.5,u+g*.3],[o+p,u+g],[o+p*.7,u+g*1.15],[o,u+g*.7],[o-p*.7,u+g*1.15],[o-p,u+g],[o-p*.5,u+g*.3]];a.shape(ca(v,1,7,Math.max(2,Math.round(p/(3*t))),2*t,1),f.LEAF,{group:30+h,line:!1,round:e.round}),a.mark([[o-p,u+g*.55],[o+p,u+g*.55],[o+p,u+g*1.4],[o-p,u+g*1.4]],f.LEAF3,[f.LEAF]),a.mark([[o-p*.55,u-2*t],[o+p*.1,u-3*t],[o+p*.1,u+g*.45],[o-p*.7,u+g*.7]],f.LEAF2,[f.LEAF])}return _r(a,o,s*.82)}function Dh(i,e,t){const n=Zr(e),r=Math.round(200*t*n+50*t),s=Math.round(130*t),a=new cn(r,s),o=r/2,c=s,l=13*t,h=Mi(a,[o,c],-Math.PI/2+(i()-.5)*.3,s*.3,l,l*.8,e,i,{bend:1.6}),d=[];for(let g=0;g<5;g++){const v=g%2?1:-1,x=-Math.PI/2+v*be(i,.55,1.25)*(.7+.3*n),m=Mi(a,h.end,x,s*be(i,.3,.42)*(.8+.2*n),l*.55,l*.3,e,i,{group:12});d.push(m.end)}fa(a,o,c,l,e,i,t),pa(a,e);for(const g of d)Fi(a,At(g,[0,-2*t]),be(i,20,28)*t,be(i,9,12)*t,e,i);Fi(a,At(h.end,[0,-8*t]),24*t,11*t,e,i);let u=r,p=0;for(const g of d)u=Math.min(u,g[0]-22*t),p=Math.max(p,g[0]+22*t);for(let g=u;g<p;g+=be(i,1,1.7)){let v=s;for(let M=0;M<s;M++)if(a.get(g,M)===f.LEAF||a.get(g,M)===f.LEAF2||a.get(g,M)===f.LEAF3){v=M;break}if(v>=s)continue;const x=Math.abs(g-o)/(r/2),m=(c-v)*be(i,.5,.9)*(1-x*.3),_=Rt(g|0,1,9)<.4?f.LEAF2:f.LEAF;for(let M=v+2;M<Math.min(c-2,v+m);M++){const S=Math.round(Math.sin(M*.12+g)*.7);Rt(g|0,M,5)<.2+e.density*.8&&a.px(g+S,M,(M-v)/m>.8?f.LEAF3:_,S*.3,.2,.95)}}return _r(a,o,h.end[1]+6*t)}function Ih(i,e,t){const n=.7+.3*Zr(e),r=Math.round(110*t*n),s=Math.round(155*t),a=new cn(r,s),o=r/2,c=s,l=(i()-.5)*.25+(e.treeLean||0),h=Mi(a,[o,c],-Math.PI/2+l,s*.85,5*t,2*t,e,i,{mat:f.BARK2,bend:.4});for(let u=0;u<h.pts.length-1;u++)for(let p=0;p<1;p+=1/8){const g=ti(h.pts[u],h.pts[u+1],p+i()*.1);if(i()<.55)for(let v=-3;v<=3;v++)a.get(g[0]+v,g[1])===f.BARK2&&i()<.8&&a.recolour(g[0]+v,g[1],f.BARKD)}const d=[h.end];for(let u=0;u<7;u++){const p=be(i,.35,.9),g=ti(h.pts[0],h.end,p),v=u%2?1:-1,x=Mi(a,g,-Math.PI/2+v*be(i,.5,1),s*be(i,.12,.2)*n,2*t,1,e,i,{mat:f.BARKD,group:12});d.push(x.end)}for(const u of d)Fi(a,u,be(i,9,13)*t*n,be(i,7,10)*t,e,i,{mat:f.LEAF2,ragged:1.3});return _r(a,o,s*.55)}function Nh(i,e,t){const n=Zr(e),r=Math.round(220*t*n+50*t),s=Math.round(120*t),a=new cn(r,s),o=r/2,c=s,l=10*t,h=Mi(a,[o,c],-Math.PI/2+(i()-.5)*.4*(e.gnarl+.3),s*.4,l,l*.75,e,i,{bend:1.2}),d=[];for(const g of[-1,1,-1,1]){const v=Mi(a,h.end,-Math.PI/2+g*be(i,.7,1.15)*(.7+.3*n),s*be(i,.3,.42)*(.7+.3*n),l*.55,l*.25,e,i,{group:12});d.push(v.end,ti(h.end,v.end,.55))}fa(a,o,c,l,e,i,t),pa(a,e);const u=Math.round(be(i,2,3)),p=Math.min(...d.map(g=>g[1]));for(let g=0;g<u;g++){const v=p-6*t+g*9*t,x=(95-g*12)*t*(.65+.35*n);for(let m=0;m<5;m++)Fi(a,[o+(m-2)*x*.36+be(i,-5,5)*t,v+be(i,-3,3)*t],x*be(i,.2,.26),7*t,e,i,{mat:g===u-1?f.LEAF:f.LEAF3})}return _r(a,o,h.end[1]+4*t)}function vl(i,e,t){const n=e.leafHue+(i()-.5)*e.leafVariety*.7+(t===xl?.06:0);return{[f.TRUNK]:ge(e.trunkHue,.45*e.sat,.34),[f.BARKD]:ge(e.trunkHue+.03,.5*e.sat,.17),[f.BARKL]:ge(e.trunkHue-.01,.38*e.sat,.5),[f.BARK2]:[222,220,212],[f.LEAF]:ge(n,.62*e.sat,.58),[f.LEAF2]:ge(n-.05,.55*e.sat,.8),[f.LEAF3]:ge(n+.03,.66*e.sat,.38),[f.WEB]:[225,225,232]}}function jd(i){const{sp:e,crownY:t}=i,n=new cn(e.w,e.h),r=new cn(e.w,e.h);for(let s=0;s<e.h;s++)for(let a=0;a<e.w;a++){const o=s*e.w+a,c=e.m[o];if(!c)continue;(Qd.has(c)&&s>=t?r:n).put(a,s,c,e.n[o*3],e.n[o*3+1],e.n[o*3+2])}return{top:n,bot:r}}function ef(i,e){const t=e.bushSize,n=vh(i,["round","round","fern","grass","shrub"]),r=Math.round(40*t),s=Math.round(28*t),a=new cn(r,s);if(n==="round"||n==="shrub"){const c=n==="shrub"?5:3;for(let l=0;l<c;l++)Fi(a,[r/2+be(i,-9,9)*t,s-8*t+be(i,-4,2)*t],be(i,7,10)*t,be(i,5,8)*t,e,i);if(n==="shrub"||i()<e.flowers)for(let l=0;l<18*e.flowers+3;l++){const h=r/2+be(i,-12,12)*t,d=s-be(i,5,17)*t;a.get(h,d)&&a.recolour(h,d,f.FLOWER)}}else if(n==="fern")for(let c=0;c<7;c++){const l=-Math.PI/2+(c/6-.5)*2.4;let h=r/2,d=s-1;for(let u=0;u<15*t;u++)h+=Math.cos(l)*.9,d+=Math.sin(l)*.9+u*.06,a.put(h,d,c%2?f.LEAF3:f.LEAF,Math.cos(l)*.4,-.2,.9),u%2&&(a.put(h,d-1,f.LEAF2,0,-.5,.85),a.put(h+Math.sign(Math.cos(l)),d+1,f.LEAF,0,.3,.9))}else for(let c=0;c<18*t;c++){const l=r/2+be(i,-13,13)*t,h=be(i,5,15)*t,d=be(i,-3,3);for(let u=0;u<h;u++)a.put(l+d*u/h*(u/h),s-1-u,u>h*.65?f.LEAF2:u<h*.3?f.LEAF3:f.LEAF,d*.1,-.3,.9)}const o=vl(i,e,null);return o[f.FLOWER]=ge(i(),.55,.95),{sp:a,colours:o}}const ct=(i,e={})=>["tree",{type:i,...e}],Oe=(i,e={})=>[i,e],Jr=[{id:"moor",name:"Moor",creature:"badger",by:"Ed",leaf:.24,floor:["moss",.26,.45,.42],text:{floor:"moss",wall:"puddles, a lake",small:"long grass",big:"moss mounds"},wall:[Oe("water",{w:1.6})],small:[Oe("grass",{h:1.4})],big:[Oe("mound",{moss:!0})]},{id:"fern-forest",name:"Fern forest",creature:"boar",by:"Ed",leaf:.3,floor:["needles",.08,.45,.32],text:{floor:"pine needles",small:"ferns",big:"pine trees"},small:[Oe("fern")],big:[ct("fir")]},{id:"muddy-forest",name:"Muddy forest",creature:"snail",by:"Ed",leaf:.22,floor:["mud",.07,.5,.28],text:{floor:"mud and leaves",small:"short trunks with broken branches",big:"trees with many trunks and branches"},small:[Oe("stump",{snag:!0})],big:[ct("broad",{trunks:3,gnarl:.9})]},{id:"stone-shrine",name:"Stone shrine",creature:"fox",by:"Ed",leaf:.28,floor:["stony",.25,.3,.45],text:{floor:"grassy, stony",wall:"mossy henges",small:"little stones",big:"big stones",set:"a shrine"},wall:[Oe("henge")],small:[Oe("stones")],big:[Oe("boulder")],set:Oe("shrine")},{id:"tangly-forest",name:"Tangly forest",creature:"ram",by:"Ed",leaf:.27,floor:["nettles",.28,.5,.3],text:{floor:"nettles and earth",small:"tangled branches",big:"fairly short tangly trees"},small:[Oe("bramble",{bare:!0})],big:[ct("broad",{scale:.7,gnarl:1})]},{id:"wispy-forest",name:"Wispy forest",creature:"woodlouse",by:"Ed",leaf:.2,floor:["leaves",.09,.55,.45],text:{floor:"dry leaves",small:"tall thin wispy trees",big:"thick trees with several trunks"},small:[ct("birch",{scale:.75})],big:[ct("broad",{trunks:3,thick:1.4})]},{id:"hazel-forest",name:"Hazel forest",creature:"hedgehog",by:"Ed",leaf:.26,floor:["grass",.24,.45,.45],text:{floor:"short grass",small:"brown lumps",big:"crooked trees with many branches"},small:[Oe("mound",{brown:!0})],big:[ct("broad",{gnarl:1,scale:.85})]},{id:"garden",name:"Garden",creature:"squirrel",by:"Ed",leaf:.3,floor:["lawn",.27,.5,.5],text:{floor:"uniform grass",wall:"ornate stone wall",small:"manicured flower beds",big:"willows",set:"a stone pavilion"},wall:[Oe("wall")],small:[Oe("flowerbed")],big:[ct("willow")],set:Oe("pavilion")},{id:"twiggy-forest",name:"Twiggy forest",creature:"wolf",by:"Ed",leaf:.29,floor:["plants",.3,.5,.38],text:{floor:"small leafy plants",small:"small trees with many thin trunks",big:"straight but slanted trees with many trunks"},small:[ct("broad",{trunks:4,scale:.5,thin:!0})],big:[ct("broad",{trunks:3,lean:.3,gnarl:.1})]},{id:"ancient",name:"Ancient",creature:"stag",by:"Ed",leaf:.31,floor:["roots",.1,.25,.35],text:{floor:"mossy roots over rocks",small:"sorrel",big:"giant gnarly slanted trees"},small:[Oe("flowers",{hue:.98,leafy:!0})],big:[ct("broad",{scale:1.4,gnarl:1,lean:.35})]},{id:"norway",name:"Norway",creature:"stoat",by:"Ed",leaf:.36,floor:["slate",.6,.15,.35],text:{floor:"pine needles and slate",small:"rocks",big:"straight pines"},small:[Oe("stones",{big:!0})],big:[ct("fir",{scale:1.2})]},{id:"alder-forest",name:"Alder forest",creature:"snake",by:"Ed",leaf:.23,floor:["tallgrass",.22,.45,.42],text:{floor:"tall and short grass",small:"tree stumps with tall grass around",big:"tall slanted trees with thin leaves at different heights"},small:[Oe("stump",{grass:!0})],big:[ct("birch",{lean:.3,scale:1.2,dark:!0})]},{id:"meadow",name:"Meadow",creature:"hare",by:"draft",leaf:.25,floor:["flowers",.25,.5,.5],text:{floor:"grass and wildflowers",small:"scattered hawthorn",big:"lone oaks"},small:[Oe("shrub",{flower:[250,245,235]})],big:[ct("broad",{scale:1.1})]},{id:"old-oaks",name:"Old oaks",creature:"owl",by:"draft",leaf:.22,floor:["leaves",.07,.5,.35],text:{floor:"leaf litter",small:"acorns, fallen branches",big:"ancient gnarled oaks with hollow trunks",set:"a great hollow oak"},small:[Oe("cones",{acorn:!0}),Oe("log",{branch:!0})],big:[ct("broad",{gnarl:.9,hollow:!0})],set:ct("broad",{scale:1.6,gnarl:1,hollow:!0})},{id:"berry-thicket",name:"Berry thicket",creature:"bear",by:"draft",leaf:.32,floor:["needles",.08,.45,.3],text:{floor:"pine needles",wall:"bramble thickets",small:"berry bushes",big:"tall pines"},wall:[Oe("bramble")],small:[Oe("shrub",{flower:[200,30,60]})],big:[ct("fir",{scale:1.3})]},{id:"wetland",name:"Wetland",creature:"toad",by:"draft",leaf:.2,floor:["mud",.15,.45,.3],text:{floor:"wet mud",wall:"puddles, reeds",small:"reeds and rushes",big:"willows"},wall:[Oe("water"),Oe("reeds",{tall:!0})],small:[Oe("reeds")],big:[ct("willow")]},{id:"stream",name:"Stream",creature:"otter",by:"draft",leaf:.27,floor:["pebbles",.25,.3,.45],text:{floor:"pebbles and grass",wall:"a stream or pond",small:"alder saplings",big:"alders",set:"a fallen-log bridge"},wall:[Oe("water",{w:2})],small:[ct("broad",{scale:.45})],big:[ct("broad",{scale:.95,gnarl:.3})],set:Oe("bridge")},{id:"rocky-slope",name:"Rocky slope",creature:"lynx",by:"draft",leaf:.34,floor:["scree",.2,.2,.42],text:{floor:"scree and moss",wall:"boulders",small:"rocks",big:"pines",set:"a rocky outcrop"},wall:[Oe("boulder",{big:!0})],small:[Oe("stones",{big:!0})],big:[ct("fir")],set:Oe("outcrop")},{id:"bog",name:"Bog",creature:"elk",by:"draft",leaf:.38,floor:["moss",.18,.55,.4],text:{floor:"sphagnum moss",wall:"bog pools",small:"cotton grass",big:"spruce"},wall:[Oe("water",{bog:!0})],small:[Oe("reeds",{cotton:!0})],big:[ct("fir",{dark:!0})]},{id:"deadwood",name:"Deadwood",creature:"raven",by:"draft",leaf:.15,floor:["earth",.07,.35,.3],text:{floor:"bare earth",small:"broken branches",big:"blasted dead trees"},small:[Oe("log",{branch:!0})],big:[ct("broad",{bare:!0,gnarl:1})]},{id:"cave-mouth",name:"Cave mouth",creature:"bat",by:"draft",leaf:.2,floor:["stone",.08,.15,.35],text:{floor:"stone and roots",wall:"rock walls",small:"stalagmite stubs",big:"dead trees",set:"a cave mouth"},wall:[Oe("rockwall")],small:[Oe("stalagmite")],big:[ct("broad",{bare:!0})],set:Oe("cave")},{id:"grassland",name:"Grassland",creature:"mole",by:"draft",leaf:.25,floor:["grass",.26,.5,.48],text:{floor:"short turf",small:"molehills",big:"lone birches"},small:[Oe("mound",{brown:!0,small:!0})],big:[ct("birch")]},{id:"beaver-pond",name:"Beaver pond",creature:"beaver",by:"draft",leaf:.17,floor:["leaves",.13,.6,.5],text:{floor:"birch leaves",wall:"a pond",small:"stumps",big:"birch and aspen",set:"a beaver dam"},wall:[Oe("water",{w:2})],small:[Oe("stump",{gnawed:!0})],big:[ct("birch")],set:Oe("dam")},{id:"log-pile",name:"Log pile",creature:"beetle",by:"draft",leaf:.22,floor:["leaves",.06,.5,.3],text:{floor:"rotting leaves",small:"fungi",big:"rotting logs",set:"a fallen giant"},small:[Oe("fungi")],big:[Oe("log",{rot:!0})],set:Oe("log",{rot:!0,giant:!0})},{id:"heath",name:"Heath",creature:"moth",by:"draft",leaf:.27,floor:["heather",.85,.35,.4],text:{floor:"heather",small:"gorse",big:"wind-bent birches"},small:[Oe("shrub",{flower:[250,205,40],spiky:!0})],big:[ct("birch",{lean:.45,scale:.75})]},{id:"old-pinewood",name:"Old pinewood",creature:"marten",by:"draft",leaf:.35,floor:["needles",.07,.4,.3],text:{floor:"pine needles",small:"pine cones",big:"tall old pines with knotholes"},small:[Oe("cones")],big:[ct("fir",{scale:1.35})]},{id:"ravine",name:"Ravine",creature:"salamander",by:"draft",leaf:.3,floor:["stone",.3,.3,.32],text:{floor:"wet moss and rock",wall:"rock walls",small:"ferns",big:"mossy boulders",set:"a waterfall"},wall:[Oe("rockwall",{moss:!0})],small:[Oe("fern")],big:[Oe("boulder",{moss:!0,big:!0})],set:Oe("waterfall")},{id:"bluebell-glade",name:"Bluebell glade",creature:"glowworm",by:"draft",leaf:.26,floor:["bluebells",.27,.45,.4],text:{floor:"bluebells",small:"ferns",big:"beeches"},small:[Oe("fern")],big:[ct("broad",{gnarl:.2,scale:1.1})]},{id:"holly-thicket",name:"Holly thicket",creature:"spider",by:"draft",leaf:.36,floor:["leaves",.08,.35,.28],text:{floor:"dead leaves",wall:"holly hedges",small:"cobwebs",big:"hollies",set:"a web-hung dead tree"},wall:[Oe("hedge",{berries:!0})],small:[Oe("web")],big:[ct("broad",{scale:.7,dark:!0})],set:ct("broad",{bare:!0,webs:!0})},{id:"honeysuckle-tangle",name:"Honeysuckle tangle",creature:"dormouse",by:"draft",leaf:.25,floor:["clover",.27,.45,.45],text:{floor:"grass and clover",wall:"bramble",small:"honeysuckle",big:"hazel coppice"},wall:[Oe("bramble")],small:[Oe("shrub",{flower:[250,230,170]})],big:[ct("broad",{trunks:5,scale:.7,thin:!0})]}];for(const[i,[e,t]]of Object.entries(Ah)){const n=Jr.find(r=>r.id===i);n&&!n.set&&(n.set=Oe(e,{three:!0}),n.text={...n.text,set:t})}const tf=Object.fromEntries(Jr.map(i=>[i.id,i])),nf=["ruins","rocks","freak","lake","modern"],mt=(i,e,t,n,r,s,a,o,c,l,h={})=>({pattern:i,...h,density:e,clump:t,glades:{count:n[0],size:n[1]||[0,0]},heightMix:r&&{sapling:r[0],mature:r[1],tall:r[2],giant:r[3]},undergrowth:s,lean:{dir:a[0],amount:a[1]},terrain:o,decor:{rate:c[0],...Object.fromEntries(nf.map((d,u)=>[d,c[1][u]]))},feel:l}),Ct=[0,0],rf={moor:mt("scatter",.2,.6,[2,[14,24]],null,.7,[30,.2],["pools","mounds","hollows"],[.5,[.3,.4,0,.3,0]],"Open rolling moss, low mounds and dark pools, long grass combed one way by the wind; you can see a long way."),"fern-forest":mt("groves",.65,.6,[2,[8,12]],[.2,.5,.25,.05],.9,Ct,["hollows","paths"],[.25,[.4,.3,.3,0,0]],"Pine groves standing waist-deep in ferns, with green sunken hollows between them."),"muddy-forest":mt("scatter",.7,.3,[1,[6,9]],[.25,.55,.17,.03],.4,Ct,["pools","paths"],[.3,[.3,.1,.2,.1,.3]],"Squelching mud between many-trunked trees, puddled ruts winding through, broken stumps everywhere."),"stone-shrine":mt("rings",.35,.8,[1,[10,14]],null,.3,Ct,["rocky","mounds"],[.5,[.6,.4,0,0,0]],"Big stones stand in rings round the shrine on stony grass; it feels deliberate and old."),"tangly-forest":mt("thicket",.9,.2,[1,[5,8]],[.35,.55,.1,0],.9,Ct,["hollows"],[.2,[.2,0,.6,0,.2]],"Short tangled trees packed close over nettles, low and claustrophobic, with one small clearing."),"wispy-forest":mt("stands",.55,.7,[2,[6,10]],[.15,.45,.3,.1],.5,Ct,["ridges"],[.3,[.4,.2,.3,0,.1]],"Stands of thick many-trunked trees, thin wispy saplings drifting between them over dry leaves."),"hazel-forest":mt("rings",.6,.6,[2,[6,9]],[.3,.55,.12,.03],.5,Ct,["mounds","paths"],[.3,[.4,.3,.3,0,0]],"Crooked hazels grown in loose fairy rings on short grass, lumpy little mounds in the middle of each."),garden:mt("rows",.45,0,[3,[6,10]],[.1,.7,.2,0],.6,Ct,["paths","pools"],[.4,[.7,0,0,.2,.1]],"A lost formal garden: willows in avenues along straight paths, lawns and flower beds, a pavilion at the heart.",{along:"paths"}),"twiggy-forest":mt("scatter",.75,.3,[1,[6,10]],[.25,.5,.2,.05],.6,[60,.5],["paths"],[.25,[.3,.2,.3,0,.2]],"Straight many-trunked trees all slanting the same way, like a wood frozen in a gale."),ancient:mt("lone",.4,.2,[1,[12,18]],[.05,.35,.4,.2],.4,[150,.25],["rocky","mounds","hollows"],[.45,[.5,.2,.3,0,0]],"Giant gnarled trees far apart, roots heaving over mossy rocks; every tree is a landmark."),norway:mt("stands",.8,.5,[1,[8,12]],[.15,.45,.35,.05],.2,Ct,["rocky","ridges"],[.3,[.2,.6,0,.2,0]],"Dense stands of straight pines on slate ridges, bare rock between; dark, vertical and cold."),"alder-forest":mt("scatter",.55,.4,[2,[6,10]],[.2,.4,.35,.05],.6,[120,.35],["stream","hollows"],[.3,[.3,.1,.2,.3,.1]],"Tall slanted alders at every height over long grass and stumps, a little stream wandering through."),meadow:mt("lone",.12,.1,[0],[.2,.5,.25,.05],.3,Ct,["mounds","paths"],[.35,[.3,.3,0,.2,.2]],"Wide-open wildflower grass with a lone oak here and there and scattered hawthorn; the sky does the work."),"old-oaks":mt("groves",.5,.5,[2,[10,16]],[.1,.35,.4,.15],.5,Ct,["mounds","hollows"],[.4,[.5,.1,.4,0,0]],"Groves of huge hollow oaks with broad clearings of leaf litter between; slow and grand."),"berry-thicket":mt("thicket",.85,.5,[2,[4,7]],[.2,.4,.35,.05],1,Ct,["paths"],[.15,[.3,0,.4,0,.3]],"Tall pines over solid berry bushes and brambles, only narrow animal paths and a couple of pockets of space."),wetland:mt("edgeOnly",.5,.5,[1,[16,24]],[.25,.55,.15,.05],.8,Ct,["pools","stream"],[.35,[.2,0,0,.6,.2]],"Open reedy water and mud in the middle, willows crowding the rim; wet and echoing."),stream:mt("rows",.5,.2,[1,[6,10]],[.3,.45,.2,.05],.5,Ct,["stream","pools"],[.3,[.3,.3,0,.3,.1]],"Alders lining both banks of a pebbly stream, saplings at the water's edge, open grass away from it.",{along:"stream"}),"rocky-slope":mt("scatter",.35,.6,[1,[8,12]],[.3,.5,.18,.02],.2,[90,.15],["rocky","ridges"],[.5,[.3,.7,0,0,0]],"Scree and boulders with pines clinging in clumps, everything leaning slightly uphill."),bog:mt("stands",.25,.85,[3,[10,20]],[.4,.5,.1,0],.6,Ct,["pools","mounds"],[.35,[.2,0,0,.5,.3]],"Sphagnum and bog pools, stunted spruce in tight dark stands, cotton grass pale between them."),deadwood:mt("scatter",.25,.2,[2,[8,14]],[.05,.3,.45,.2],.15,Ct,["ridges","hollows"],[.45,[.3,.1,.3,0,.3]],"Sparse tall blasted snags on bare ridges; bleak, quiet, with long sightlines."),"cave-mouth":mt("edgeOnly",.4,.5,[1,[10,14]],[.2,.5,.3,0],.2,Ct,["rocky","ridges"],[.4,[.3,.6,0,0,.1]],"Rock walls and dead trees ring an open stone floor that leads to the cave's dark mouth."),grassland:mt("lone",.1,.5,[0],[.3,.5,.2,0],.2,Ct,["mounds"],[.35,[.3,.2,0,.1,.4]],"Short turf to the horizon, molehills, birches alone or in twos and threes."),"beaver-pond":mt("edgeOnly",.55,.4,[1,[14,20]],[.4,.45,.15,0],.4,Ct,["pools","stream"],[.4,[.1,0,0,.7,.2]],"A pond in the middle, young birch and aspen round it, gnawed stumps where the big ones were felled."),"log-pile":mt("groves",.5,.7,[2,[6,10]],null,.7,Ct,["hollows","mounds"],[.3,[.3,0,.4,0,.3]],"Rotting logs heaped in piles, fungi everywhere, damp hollows between the heaps."),heath:mt("scatter",.2,.3,[1,[12,18]],[.5,.45,.05,0],.8,[30,.6],["ridges","paths"],[.4,[.4,.4,0,0,.2]],"Purple heather and gorse, small birches bent hard by the wind, all the same way."),"old-pinewood":mt("scatter",.5,.3,[2,[8,14]],[.1,.35,.4,.15],.15,Ct,["mounds","paths"],[.35,[.4,.3,.3,0,0]],"Cathedral-tall old pines on a clear floor of needles; you can see between the trunks a long way."),ravine:mt("edgeOnly",.55,.6,[1,[6,9]],null,.8,Ct,["stream","ridges","rocky"],[.4,[.3,.5,0,.2,0]],"A deep wet cleft: rock walls and mossy boulders either side, ferns, a stream down the middle."),"bluebell-glade":mt("groves",.45,.5,[3,[8,14]],[.1,.5,.35,.05],.3,Ct,["hollows"],[.35,[.4,0,.3,.3,0]],"Beech groves round open glades carpeted in bluebells; soft, bright and airy."),"holly-thicket":mt("thicket",.9,.3,[1,[6,9]],[.3,.6,.1,0],.7,Ct,["hollows"],[.25,[.3,0,.5,0,.2]],"Dark hollies packed close, cobwebs strung between, one clearing round the web-hung tree."),"honeysuckle-tangle":mt("stands",.6,.7,[2,[5,8]],[.45,.5,.05,0],.8,Ct,["paths","mounds"],[.3,[.3,0,.3,0,.4]],"Hazel coppice stools in clumps, honeysuckle and bramble between, clover paths winding through.")};for(const i of Jr)i.layout=rf[i.id];function sf(i,e,t=64,n=48){const[r,s,a,o]=i.floor,c=new cn(t,n),l=i.id.length*131;for(let v=0;v<n;v++)for(let x=0;x<t;x++){const m=(mi(x/7,v/5,l)*(t-x)*(n-v)+mi((x-t)/7,v/5,l)*x*(n-v)+mi(x/7,(v-n)/5,l)*(t-x)*v+mi((x-t)/7,(v-n)/5,l)*x*v)/(t*n),_=m<.38?f.BODY2:m>.64?f.BELLY:f.BODY;c.px(x,v,_,0,-.42,.91)}const h=la(l),d=(v,x,m)=>c.px((v%t+t)%t,(x%n+n)%n,m,0,-.42,.91),u={moss:0,needles:70,mud:25,stony:30,nettles:60,leaves:80,grass:70,lawn:30,plants:60,roots:30,slate:40,tallgrass:90,flowers:70,pebbles:60,scree:70,earth:15,stone:40,heather:90,bluebells:90,clover:60}[r]??40;for(let v=0;v<u;v++){const x=Math.floor(h()*t),m=Math.floor(h()*n);if(r==="needles"){const _=h()<.5?1:-1;for(let M=0;M<3;M++)d(x+M*_,m+(M>>1),h()<.5?f.BODY2:f.ACCENT)}else if(["grass","lawn","tallgrass","plants","nettles","clover","flowers","bluebells","heather"].includes(r)){const _=r==="tallgrass"?4:r==="lawn"?1:2;for(let M=0;M<_;M++)d(x,m-M,M===_-1?f.LEAF2:f.LEAF);(r==="flowers"||r==="bluebells"||r==="heather"||r==="clover")&&h()<.5&&d(x+1,m-_,f.FLOWER)}else if(["stony","pebbles","scree","slate","stone","roots"].includes(r)){if(d(x,m,f.ACCENT),h()<.6&&d(x+1,m,f.ACCENT),h()<.4&&d(x,m+1,f.BODY2),r==="roots"&&h()<.5)for(let _=0;_<5;_++)d(x+_,m+(_>2?1:0),f.TRUNK)}else if(r==="leaves")d(x,m,f.FLOWER),d(x+1,m,f.FLOWER),h()<.5&&d(x,m+1,f.ACCENT);else if(r==="mud"||r==="earth")for(let _=0;_<3;_++)d(x+_,m,f.BODY2)}const p={flowers:ge(.13,.6,.95),bluebells:[90,110,230],heather:[180,90,170],clover:[240,235,240],leaves:ge(s+.02,.65,.6)}[r]||ge(s,.3,.6),g={[f.BODY]:ge(s,a*e.sat,o),[f.BODY2]:ge(s+.02,a*e.sat*1.1,o*.78),[f.BELLY]:ge(s-.02,a*e.sat*.9,Math.min(1,o*1.15)),[f.ACCENT]:r==="needles"?ge(.07,.5,.5):ge(.1,.08,.62),[f.FLOWER]:p,[f.LEAF]:ge(i.leaf,.55*e.sat,.45),[f.LEAF2]:ge(i.leaf-.03,.5*e.sat,.62),[f.TRUNK]:ge(e.trunkHue,.4,.3)};return{sp:c,colours:g}}const Ci=i=>({[f.ACCENT]:ge(.1,.06,.6),[f.BODY2]:ge(.62,.08,.4),[f.BELLY]:ge(.1,.05,.78),[f.LEAF]:ge(.27,.5,.45),[f.LEAF2]:ge(.25,.45,.62),[f.NOSE]:[20,16,24]});function fr(i,e,t,n,r,s,a){const o=[];for(let c=0;c<8;c++){const l=c/8*Math.PI*2,h=1+(s()-.5)*.3;o.push([e[0]+Math.cos(l)*t*h,e[1]+Math.sin(l)*n*h*(Math.sin(l)>0?.5:1)])}i.shape(o,f.ACCENT,{group:5,line:!0,round:r.round}),i.mark([At(e,[-t,n*.1]),At(e,[t,n*.1]),At(e,[t,n]),At(e,[-t,n])],f.BODY2,[f.ACCENT]),i.mark([At(e,[-t*.6,-n*.8]),At(e,[t*.1,-n*1.1]),At(e,[t*.3,-n*.5]),At(e,[-t*.3,-n*.3])],f.BELLY,[f.ACCENT]),a&&i.mark(ca([At(e,[-t*1.1,-n*.55]),At(e,[0,-n*1.3]),At(e,[t*1.1,-n*.5]),At(e,[t*.6,-n*.2]),At(e,[-t*.6,-n*.2])],0,3,3,n*.15,1),f.LEAF,[f.ACCENT,f.BELLY,f.BODY2])}function Bs(i,e,t,n,r,s){const a={[f.LEAF]:ge(t.leaf,.6*n.sat,.55),[f.LEAF2]:ge(t.leaf-.05,.55*n.sat,.78),[f.LEAF3]:ge(t.leaf+.03,.66*n.sat,.36)},o={[f.TRUNK]:ge(n.trunkHue,.45*n.sat,.34),[f.BARKD]:ge(n.trunkHue+.03,.5*n.sat,.17),[f.BARKL]:ge(n.trunkHue-.01,.38*n.sat,.5),[f.BELLY]:ge(n.trunkHue+.02,.3,.7)},c={[f.MAGIC]:[60,110,150],[f.MAGIC2]:[150,200,220],[f.BODY2]:[35,70,100]};if(i==="tree"){const v={broad:Ph,fir:xl,willow:Dh,birch:Ih,flat:Nh}[e.type],x={...n,leafHue:t.leaf+(e.dark?.05:0),gnarl:e.gnarl??n.gnarl,treeBare:e.bare,treeTrunks:e.trunks,treeLean:e.lean,treeThick:e.thick,treeThin:e.thin,treeHollow:e.hollow,treeWebs:e.webs},m=v(r,x,n.treeSize*s*(e.scale||1)*be(r,.9,1.1)),_=vl(r,x,v);return e.dark&&(_[f.LEAF]=_[f.LEAF3],_[f.LEAF3]=ge(t.leaf+.05,.7,.22)),_[f.NOSE]=[20,16,24],_[f.WEB]=[225,225,232],{sp:m.sp,colours:_}}if(i==="shrub"){const v=ef(r,{...n,leafHue:t.leaf,bushSize:n.bushSize*s,flowers:1});for(let x=0;x<v.sp.m.length;x++)v.sp.m[x]&&Rt(x,1,3)<(e.spiky?.18:.1)&&v.sp.m[x]!==f.TRUNK&&(v.sp.m[x]=f.FLOWER);return v.colours[f.FLOWER]=e.flower,v}const l=Math.round(48*s*(e.w||1)),h=Math.round(32*s),d=new cn(l,h),u=l/2,p=h;let g={};if(i==="grass"||i==="reeds"||i==="fern"||i==="flowers"||i==="flowerbed"){const v=i==="flowerbed"?40:24,x=(i==="reeds"?e.tall?26:20:i==="fern"?14:10*(e.h||1))*s;i==="flowerbed"&&d.shape([[u-20*s,p-2],[u-18*s,p-6*s],[u+18*s,p-6*s],[u+20*s,p-2],[u+20*s,p],[u-20*s,p]],f.ACCENT,{group:2,line:!0});for(let m=0;m<v;m++){const _=u+be(r,-16,16)*s,M=x*be(r,.5,1),S=i==="fern"?be(r,-6,6)*s:be(r,-2,2)*s,w=p-1-(i==="flowerbed"?5*s:0);for(let E=0;E<M;E++){const L=E/M;d.px(_+S*L*L,w-E,L>.7?f.LEAF2:L<.3?f.LEAF3:f.LEAF,S*.05,-.3,.9),i==="fern"&&E%2&&d.px(_+S*L*L+(S>0?1:-1),w-E+1,f.LEAF2,0,-.3,.9)}if(i==="reeds"&&(e.cotton||r()<.5))for(let E=0;E<(e.cotton?2:3);E++)d.px(_+S,w-M-E,e.cotton?f.WEB:f.TRUNK,0,-.5,.85);(i==="flowers"||i==="flowerbed")&&r()<.7&&(d.px(_+S,w-M,f.FLOWER,0,-.5,.85),d.px(_+S+1,w-M,f.FLOWER,0,-.5,.85))}if(g={...a,[f.FLOWER]:i==="flowerbed"?vh(r,[[230,80,120],[250,210,60],[150,110,230]]):ge(e.hue??.95,.6,.85),[f.TRUNK]:ge(.07,.5,.35),[f.WEB]:[240,240,235],[f.ACCENT]:ge(.08,.1,.55)},i==="flowerbed"){for(let m=0;m<d.m.length;m++)d.m[m]===f.FLOWER&&Rt(m,2,7)<.5&&(d.m[m]=f.BELLY);g[f.BELLY]=[250,245,240]}}else if(i==="stones"){for(let v=0;v<(e.big?3:6);v++)fr(d,[u+be(r,-14,14)*s,p-(e.big?5:2.5)*s],(e.big?6:3)*s*be(r,.7,1.2),(e.big?5:2.5)*s,n,r);g=Ci()}else if(i==="boulder")fr(d,[u,p-(e.big?11:8)*s],(e.big?18:13)*s,(e.big?12:9)*s,n,r,e.moss),g={...Ci(),...a,[f.ACCENT]:ge(.1,.06,.6)};else if(i==="henge")d.shape([[u-7*s,p],[u-8*s,p-18*s],[u-4*s,p-28*s],[u+5*s,p-27*s],[u+8*s,p-14*s],[u+7*s,p]],f.ACCENT,{group:5,line:!0,round:n.round}),d.mark([[u-9*s,p-30*s],[u+9*s,p-30*s],[u+9*s,p-22*s],[u-9*s,p-18*s]],f.LEAF,[f.ACCENT]),g={...Ci(),...a};else if(i==="mound"){const v=(e.small?8:14)*s,x=(e.small?5:8)*s;d.shape(ca([[u-v,p],[u-v*.6,p-x*.8],[u,p-x],[u+v*.6,p-x*.8],[u+v,p]],0,4,e.moss?3:1,(e.moss?1.5:.8)*s,1),e.moss?f.LEAF:f.TRUNK,{group:5,round:n.round}),d.mark([[u-v,p-x*.45],[u+v,p-x*.45],[u+v,p],[u-v,p]],e.moss?f.LEAF3:f.BARKD,[e.moss?f.LEAF:f.TRUNK]),g={...a,...o,[f.TRUNK]:ge(.07,.45,e.brown?.35:.3)}}else if(i==="stump"){const v=6*s;if(d.limb([[u,p,v*2.2],[u,p-8*s,v*1.6]],f.TRUNK,{group:5,round:n.round,cap:0,capEnd:0}),d.shape([[u-v*.8,p-8*s],[u,p-10*s-(e.gnawed?4*s:0)],[u+v*.8,p-8*s],[u,p-7*s]],f.BELLY,{group:6,round:n.round}),e.snag&&d.limb([[u+v*.4,p-8*s,2.5*s],[u+v*1.6,p-15*s,1.5*s]],f.TRUNK,{group:7,round:n.round}),e.grass)for(let x=0;x<20;x++){const m=u+be(r,-14,14)*s,_=be(r,6,13)*s;for(let M=0;M<_;M++)d.px(m,p-1-M,M>_*.6?f.LEAF2:f.LEAF,0,-.3,.9)}g={...a,...o}}else if(i==="log"){const v=(e.giant?46:e.branch?18:30)*s,x=(e.giant?14:e.branch?3:8)*s;if(d.limb([[u-v/2,p-x/2,x],[u+v/2,p-x/2-(e.branch?2*s:0),x*.9]],f.TRUNK,{group:5,round:n.round,cap:.3,capEnd:.3}),e.branch||d.shape([[u+v/2-x*.1,p-x],[u+v/2+x*.2,p-x/2],[u+v/2-x*.1,p],[u+v/2-x*.3,p-x/2]],f.BELLY,{group:6,round:n.round}),e.rot)for(let m=0;m<(e.giant?6:3);m++){const _=u+be(r,-v/2,v/3);d.shape([[_-3*s,p-x*.9],[_,p-x-3*s],[_+3*s,p-x*.9]],f.FLOWER,{group:7,line:!0,round:n.round})}e.branch&&d.limb([[u,p-x,x*.7],[u+5*s,p-x-6*s,x*.4]],f.TRUNK,{group:6,round:n.round}),g={...o,[f.FLOWER]:[230,190,120]}}else if(i==="fungi"){for(let v=0;v<5;v++){const x=u+be(r,-12,12)*s,m=be(r,3,7)*s,_=be(r,3,5)*s;d.limb([[x,p,1.6*s],[x,p-m,1.4*s]],f.BELLY,{group:5}),d.shape([[x-_,p-m],[x,p-m-_*.8],[x+_,p-m]],v%2?f.FLOWER:f.MAGIC,{group:6+v%2,line:!0,round:n.round})}g={[f.BELLY]:[225,215,195],[f.FLOWER]:[190,80,50],[f.MAGIC]:[120,230,200]}}else if(i==="cones"){for(let v=0;v<6;v++){const x=u+be(r,-14,14)*s,m=p-2*s;d.ellipse(x,m,(e.acorn?1.6:2)*s,(e.acorn?2:2.8)*s,f.TRUNK,{round:n.round}),e.acorn?d.ellipse(x,m-1.6*s,1.8*s,1*s,f.BARKD,{round:n.round}):d.px(x,m-1,f.BARKL)}g=o}else if(i==="water"){const v=22*s*(e.w||1),x=6*s;d.shape([[u-v,p-x],[u-v*.3,p-x*1.5],[u+v*.6,p-x*1.2],[u+v,p-x*.5],[u+v*.4,p],[u-v*.7,p-x*.2]],f.MAGIC,{group:5,round:.2});for(let m=0;m<6;m++){const _=u+be(r,-v*.6,v*.6),M=p-x*be(r,.4,1.1);for(let S=0;S<3*s;S++)d.recolour(_+S,M,f.MAGIC2)}g=e.bog?{[f.MAGIC]:[60,70,50],[f.MAGIC2]:[120,130,90]}:c;for(let m=0;m<d.m.length;m++)d.m[m]===f.MAGIC?d.m[m]=f.BODY:d.m[m]===f.MAGIC2&&(d.m[m]=f.BELLY);g={[f.BODY]:g[f.MAGIC],[f.BELLY]:g[f.MAGIC2]}}else if(i==="bramble"||i==="hedge"){const v=22*s,x=(i==="hedge"?18:12)*s;for(let m=0;m<(i==="hedge"?6:4);m++){const _=u+be(r,-v*.8,v*.8),M=p-x*be(r,.4,.7);d.ellipse(_,M,be(r,6,9)*s,x*.45,i==="hedge"?f.LEAF3:f.LEAF,{round:n.round,density:e.bare?.5:.95,noise:.5,seed:m})}for(let m=0;m<8;m++){let M=u+be(r,-v,v),S=p;for(let w=0;w<x*1.2;w++)M+=Math.sin(w*.3+m)*.8,S-=.8,d.px(M,S,f.TRUNK,0,-.3,.9)}if(i==="hedge"||e.berries||i==="bramble")for(let m=0;m<d.m.length;m++)d.m[m]&&d.m[m]!==f.TRUNK&&Rt(m,5,9)<.05&&(d.m[m]=f.FLOWER);g={...a,...o,[f.FLOWER]:i==="hedge"?[210,30,40]:[70,30,70]}}else if(i==="wall"){const v=22*s,x=12*s;d.shape([[u-v,p],[u-v,p-x],[u+v,p-x],[u+v,p]],f.ACCENT,{group:5,line:!0,depth:2}),d.shape([[u-v-1,p-x],[u-v-1,p-x-2*s],[u+v+1,p-x-2*s],[u+v+1,p-x]],f.BELLY,{group:6,line:!0,depth:2}),d.shape([[u+v-6*s,p-x-2*s],[u+v-6*s,p-x-7*s],[u+v,p-x-7*s],[u+v,p-x-2*s]],f.ACCENT,{group:7,line:!0,depth:2}),d.ellipse(u+v-3*s,p-x-9*s,3*s,2.5*s,f.BELLY,{round:n.round});for(let m=p-x+3*s;m<p;m+=4*s)for(let _=u-v;_<u+v;_++)d.recolour(_,m,f.BODY2);g=Ci()}else if(i==="rockwall"){for(let v=0;v<5;v++)fr(d,[u+(v-2)*9*s,p-be(r,8,14)*s],8*s,10*s,n,r,e.moss);g={...Ci(),...a}}else if(i==="stalagmite"){for(let v=0;v<4;v++){const x=u+be(r,-14,14)*s,m=be(r,5,11)*s;d.shape([[x-3*s,p],[x-1*s,p-m],[x+1*s,p-m],[x+3*s,p]],f.ACCENT,{group:5,line:!0,round:n.round})}g=Ci()}else if(i==="web"){const v=[u,p-14*s],x=11*s;for(let m=0;m<8;m++){const _=m/8*Math.PI*2;for(let M=0;M<x;M++)d.px(v[0]+Math.cos(_)*M,v[1]+Math.sin(_)*M,f.WEB,0,0,1)}for(let m=3*s;m<x;m+=3*s)for(let _=0;_<Math.PI*2;_+=.05)d.px(v[0]+Math.cos(_)*m,v[1]+Math.sin(_)*m,f.WEB,0,0,1);g={[f.WEB]:[225,230,240]}}return{sp:d,colours:g}}function af(i,e,t,n,r,s){if(e.three)return hd(i,t,n);if(i==="tree"||i==="log")return Bs(i,e,t,n,r,s);const a=Math.round(90*s),o=Math.round(70*s),c=new cn(a,o),l=a/2,h=o;let d={...Ci(),[f.LEAF]:ge(t.leaf,.55,.5),[f.LEAF2]:ge(t.leaf-.04,.5,.7),[f.TRUNK]:ge(n.trunkHue,.45,.34),[f.BARKD]:ge(n.trunkHue+.03,.5,.17),[f.MAGIC]:ge(n.magicHue,.6,1),[f.MAGIC2]:ge(n.magicHue,.2,1)};if(i==="shrine")c.shape([[l-16*s,h],[l-14*s,h-6*s],[l+14*s,h-6*s],[l+16*s,h]],f.ACCENT,{group:5,line:!0,depth:2}),c.shape([[l-9*s,h-6*s],[l-9*s,h-26*s],[l+9*s,h-26*s],[l+9*s,h-6*s]],f.ACCENT,{group:6,line:!0,depth:2}),c.shape([[l-5*s,h-10*s],[l-5*s,h-20*s],[l,h-23*s],[l+5*s,h-20*s],[l+5*s,h-10*s]],f.NOSE,{group:7}),c.shape([[l-13*s,h-26*s],[l,h-34*s],[l+13*s,h-26*s]],f.BODY2,{group:8,line:!0,depth:2}),c.ellipse(l,h-13*s,2.5*s,2.5*s,f.MAGIC2,{round:.5}),c.mark([[l-14*s,h-36*s],[l+2*s,h-36*s],[l-4*s,h-24*s],[l-14*s,h-24*s]],f.LEAF,[f.BODY2,f.ACCENT]);else if(i==="pavilion"){c.shape([[l-26*s,h],[l-26*s,h-4*s],[l+26*s,h-4*s],[l+26*s,h]],f.ACCENT,{group:5,line:!0,depth:2});for(const u of[-20,-7,7,20])c.limb([[l+u*s,h-4*s,4*s],[l+u*s,h-34*s,4*s]],u===-7||u===7?f.BODY2:f.BELLY,{group:6+(u>0?1:0),line:!0,cap:0,capEnd:0});c.shape([[l-28*s,h-34*s],[l-28*s,h-38*s],[l+28*s,h-38*s],[l+28*s,h-34*s]],f.ACCENT,{group:8,line:!0,depth:2}),c.shape([[l-24*s,h-38*s],[l-16*s,h-54*s],[l,h-60*s],[l+16*s,h-54*s],[l+24*s,h-38*s]],f.BELLY,{group:9,line:!0})}else if(i==="bridge"){const u=Bs("water",{w:1.8},t,n,r,s);for(let p=0;p<u.sp.m.length;p++){const g=p%u.sp.w,v=p/u.sp.w|0,x=Math.round(l-u.sp.w/2+g),m=h-u.sp.h+v;u.sp.m[p]&&c.inb(x,m)&&c.px(x,m,u.sp.m[p]===f.BODY?f.IRIS:f.PUPIL,0,-.42,.91)}c.limb([[l-34*s,h-6*s,9*s],[l+34*s,h-10*s,8*s]],f.TRUNK,{group:6,line:!0,cap:.3,capEnd:.3}),d[f.IRIS]=[60,110,150],d[f.PUPIL]=[150,200,220]}else if(i==="outcrop")for(const[u,p,g,v]of[[-18,14,16,13],[12,12,18,12],[-2,28,15,13],[16,34,9,9]])fr(c,[l+u*s,h-p*s],g*s,v*s,n,r,!0);else if(i==="cave"){for(const[u,p,g,v]of[[-26,16,16,15],[26,16,16,15],[0,40,30,18],[-12,30,14,12],[12,30,14,12]])fr(c,[l+u*s,h-p*s],g*s,v*s,n,r,p>30);c.shape([[l-15*s,h],[l-14*s,h-18*s],[l-4*s,h-28*s],[l+6*s,h-27*s],[l+14*s,h-16*s],[l+15*s,h]],f.NOSE,{group:9,line:!0})}else if(i==="dam"){const u=Bs("water",{w:1.9},t,n,r,s);for(let p=0;p<u.sp.m.length;p++){const g=p%u.sp.w,v=p/u.sp.w|0,x=Math.round(l-u.sp.w/2+g),m=h-u.sp.h+v-10*s;u.sp.m[p]&&c.inb(x,m)&&c.px(x,m,u.sp.m[p]===f.BODY?f.IRIS:f.PUPIL,0,-.42,.91)}for(let p=0;p<26;p++){const g=l+be(r,-32,32)*s,v=h-be(r,2,14)*s,x=be(r,-.5,.5),m=be(r,8,16)*s;c.limb([[g-Math.cos(x)*m/2,v-Math.sin(x)*m/2,2.6*s],[g+Math.cos(x)*m/2,v+Math.sin(x)*m/2,2*s]],p%3?f.TRUNK:f.BARKD,{group:6+p%2,line:!0})}d[f.IRIS]=[60,110,150],d[f.PUPIL]=[150,200,220]}else if(i==="waterfall"){for(const[u,p,g,v]of[[-22,30,18,30],[22,30,18,30],[0,56,20,12]])fr(c,[l+u*s,h-p*s],g*s,v*s,n,r,!0);for(let u=l-6*s;u<l+6*s;u++)for(let p=h-50*s;p<h-4*s;p++)c.px(u,p,Rt(u|0,p/3|0,4)<.3?f.PUPIL:f.IRIS,0,-.2,.98);c.shape([[l-18*s,h],[l-14*s,h-6*s],[l+14*s,h-6*s],[l+18*s,h]],f.IRIS,{group:10,round:.2}),d[f.IRIS]=[90,150,190],d[f.PUPIL]=[210,235,245]}return{sp:c,colours:d}}function of(i,e,{K:t=2/(e.pixel||2),makeCanvas:n=cl}={}){const r=tf[i];if(!r)throw new Error(`no area type "${i}"`);const s=la(i.split("").reduce((h,d)=>h*31+d.charCodeAt(0),7)>>>0),a=(h,d,u)=>({sp:gi(h.sp,h.colours,e,"none",n),kind:d,text:u}),o=sf(r,e),c=h=>(h||[]).map(([d,u])=>a(Bs(d,u,r,e,s,t),d,"")),l={def:r,floor:{sp:gi(o.sp,o.colours,e,"none",n),kind:r.floor[0],text:r.text.floor},walls:c(r.wall),small:c(r.small),big:c(r.big),setPiece:null};if(l.walls.forEach(h=>h.text=r.text.wall),l.small.forEach(h=>h.text=r.text.small),l.big.forEach(h=>h.text=r.text.big),r.set){const h=af(r.set[0],r.set[1],r,e,s,t);l.setPiece={...a(h,r.set[0],r.text.set),metres:h.metres}}return l}const lf={[f.ACCENT]:[150,145,140],[f.BODY2]:[95,92,100],[f.TRUNK]:[110,70,40],[f.BARKD]:[60,38,24],[f.MAGIC]:[255,130,40],[f.MAGIC2]:[255,228,120],[f.NOSE]:[30,24,26]};function cf(i){const e=new Xe({blend:.02});for(let r=0;r<9;r++){const s=r/9*Math.PI*2;e.ell([Math.cos(s)*.32,.05,Math.sin(s)*.32],[.09,.06,.08],r%3?f.ACCENT:f.BODY2,{dir:[-Math.sin(s),0,Math.cos(s)],group:1+r})}e.seg([-.22,.06,-.12],[.22,.1,.12],.05,.045,f.TRUNK,{group:20,paint:r=>r[0]>.12?f.BARKD:void 0}),e.seg([-.2,.1,.14],[.2,.06,-.14],.05,.045,f.TRUNK,{group:21,paint:r=>r[0]<-.12?f.BARKD:void 0});const t=[[.42,.3,.34],[.36,.4,.28],[.46,.32,.38]][i%3];[[-.05,0,t[0]],[.08,.06,t[1]],[-.02,-.08,t[2]]].forEach(([r,s,a],o)=>e.flat([r,.1+a*.5,s],[1,0,.3],[((i+o)%3-1)*.1,1,0],a*.38,a*.5,Ui.flame(f.MAGIC,f.MAGIC2),{group:30+o,bend:.1}));const n=gn(e,{height:34}).sp;for(let r=0;r<4;r++){const s=Math.floor(n.w/2+Math.sin(r*2.3+i)*n.w*.25),a=Math.floor(n.h*(.12+r*.08));n.get(s,a)||n.px(s,a,f.MAGIC2)}return n}const zs={cyan:[[70,230,255],[200,250,255]],violet:[[190,100,255],[235,210,255]],green:[[90,255,140],[215,255,220]]};function hf(i,e){const t=new Xe({blend:.04}),n=Object.keys(zs).indexOf(i),r=.08,s=.4,a=[Math.cos(s),0,-Math.sin(s)],o=C.norm([Math.sin(s),.22,Math.cos(s)]),c=C.norm(C.cross(o,a)),l=[0,.46,0],h=[[[.2-n*.05,.92],[.14,.8],[.19,.7],[.12,.58]],[[-.22+n*.03,.05],[-.17,.16],[-.21,.25]]],d=(x,m)=>h.some(_=>_.some((M,S)=>{const w=_[S+1];if(!w)return!1;const E=w[0]-M[0],L=w[1]-M[1],y=Math.max(0,Math.min(1,((x-M[0])*E+(m-M[1])*L)/(E*E+L*L)));return Math.hypot(x-M[0]-E*y,m-M[1]-L*y)<.014})),u=x=>{const m=C.sub(x,l),_=[C.dot(m,a),C.dot(m,c)+.46,C.dot(m,o)];if(_[2]>r-.02){const M=(_[0]+.17)/.34,S=(.8-_[1])/.5;if(M>=0&&M<=1&&S>=0&&S<=1&&_h(M,S,n+1,.1))return f.RUNE}if(d(_[0],_[1]))return f.STONED;if(_[1]>.86&&Rt(Math.floor(_[0]*30),Math.floor(_[2]*30),3)<.3||_[1]<.12&&Rt(Math.floor(_[0]*35),Math.floor(_[1]*35)+Math.floor(_[2]*35)*7,5)<.55)return f.MOSS};t.box(l,[.28,.46,r],f.STONE,{group:1,axes:[a,c,o],round:.06,paint:u}),t.box(C.add(C.add(l,C.mul(c,.53)),C.mul(a,.2)),[.3,.12,.2],f.STONE,{group:1,dir:C.add(a,C.mul(c,.35)),up:c,cut:!0,paint:u});for(const[x,m,_]of[[-.24,.14,.08],[.2,.02,.07],[0,.12,.07]])t.ell([x,.015,m],[_,_*.4,_],f.MOSS,{group:2});for(let x=0;x<9;x++){const m=-.3+x*.07,_=.12+x%3*.025-x*.02,M=.07+x*37%5/60;t.seg([m,0,_],[m+(x%3-1)*.02,M,_+.01],.012,.004,x%3?f.LEAF:f.LEAF2,{group:10+x})}const p={[f.STONE]:[132,134,142],[f.STONED]:[70,70,80],[f.MOSS]:[86,120,62],[f.LEAF]:[80,125,60],[f.LEAF2]:[130,160,80],[f.RUNE]:zs[i][0],[f.MAGIC2]:zs[i][1],[f.LINE]:[40,40,50]},g=gn(t,{height:44}).sp;let v=0;for(let x=0;x<600&&v<5;x++){const m=Math.floor(Rt(x,n,9)*g.w),_=Math.floor(Rt(x,n,10)*g.h*.8);g.get(m,_)||g.get(m+1,_)||g.get(m-1,_)||g.get(m,_+1)||g.get(m,_-1)||(g.px(m,_,v%2?f.RUNE:f.MAGIC2),v++)}return{sp:g,colours:p}}function uf(){const i=new Xe({blend:.03});i.ell([0,0,0],[.62,.025,.38],f.WATER,{group:1,paint:t=>Math.hypot(t[0]/.62,t[2]/.38)>.88?f.BODY2:void 0});for(let t=0;t<16;t++){const n=Math.PI*(.85+t/15*.9),r=Math.cos(n)*.6,s=Math.sin(n)*.36,a=.18+t*37%10/40;i.seg([r,0,s],[r+(t%3-1)*.02,a,s],.012,.006,t%4?f.LEAF:f.LEAF2,{group:10+t})}for(const[t,n,r]of[[.5,.2,.07],[.45,-.25,.05],[-.2,.35,.06]])i.ell([t,.02,n],[r,r*.5,r],f.ACCENT,{group:30});return{sp:gn(i,{height:22}).sp,colours:{[f.WATER]:[40,70,95],[f.BODY2]:[70,60,45],[f.LEAF]:[80,125,60],[f.LEAF2]:[130,160,80],[f.ACCENT]:[130,128,125]}}}function df(i,{makeCanvas:e=cl}={}){const t=(l,h)=>gi(l,h,i,"none",e),n={campfire:[0,1,2].map(l=>t(cf(l),lf)),stones:{},pond:null};for(const l of Object.keys(zs)){const h=hf(l);n.stones[l]=t(h.sp,h.colours)}const r=uf(),s=t(r.sp,r.colours),a=e(r.sp.w,r.sp.h),o=a.getContext("2d"),c=o.createImageData(r.sp.w,r.sp.h);for(let l=0;l<r.sp.m.length;l++)r.sp.m[l]===f.WATER&&c.data.set([255,255,255,255],l*4);return o.putImageData(c,0,0),s.mask=a,n.pond=s,n}function ff(i,e){const t=new Map,n=new Map,r=(c,l,h)=>(c*2097152+(l+1048576))*2097152+(h+1048576),s=(c,l,h)=>{const d=r(c,l,h);let u=t.get(d);if(!u){const p=Math.pow(2,-c);u=[p*(l+We(l*7+c,h,i)),p*(h+We(l,h*13+c,i+1))],t.set(d,u)}return u},a=(c,l,h)=>{const d=Math.pow(2,-c),u=Math.floor(l/d),p=Math.floor(h/d);let g=u,v=p,x=1/0;for(let m=-2;m<=2;m++)for(let _=-2;_<=2;_++){const M=s(c,u+m,p+_),S=(M[0]-l)**2+(M[1]-h)**2;S<x&&(x=S,g=u+m,v=p+_)}return[g,v]},o=(c,l,h)=>{const d=r(c,l,h);let u=n.get(d);if(u)return u;if(c===0)u=[l,h];else{const p=s(c,l,h),g=a(c-1,p[0],p[1]);u=o(c-1,g[0],g[1])}return n.set(d,u),u};return{seed:i,depth:e,site:(c,l)=>s(0,c,l),partition(c,l){const h=a(e,c,l);return o(e,h[0],h[1])},centreness(c,l,h){const d=s(0,h[0],h[1]),u=Math.hypot(c-d[0],l-d[1]);let p=1/0;const g=Math.floor(c),v=Math.floor(l);for(let x=-2;x<=2;x++)for(let m=-2;m<=2;m++){const _=g+x,M=v+m;if(_===h[0]&&M===h[1])continue;const S=s(0,_,M);p=Math.min(p,Math.hypot(c-S[0],l-S[1]))}return Math.min(1,2*u/(u+p))},openness(c,l){let h=1/0,d=1/0;const u=Math.floor(c),p=Math.floor(l);for(let g=-2;g<=2;g++)for(let v=-2;v<=2;v++){const x=s(0,u+g,p+v),m=Math.hypot(c-x[0],l-x[1]);m<h?(d=h,h=m):m<d&&(d=m)}return Math.min(1,2*h/(h+d))}}}const pf=Xu.types,vn=Jr.map(i=>({id:i.id,name:i.name,creature:i.creature,text:i.text,setPiece:i.set?i.text.set??"a set piece":"",hasWalls:!!i.wall?.length,floor:[i.floor[1],i.floor[2],i.floor[3]],treeDensity:pf[i.id]?.treeDensity??1})),cr=(i,e)=>i+","+e;function mf(i){if(i==null||i.trim()==="")return null;const e=i.trim();if(/^\d{1,9}$/.test(e))return Number(e);let t=2166136261;for(let n=0;n<e.length;n++)t=Math.imul(t^e.charCodeAt(n),16777619);return(t>>>0)%1e9}function gf(i,e,t,n){const r=new Map,s=(c,l)=>{if(c[0]===l[0]&&c[1]===l[1])return;const h=cr(c[0],c[1]),d=cr(l[0],l[1]);r.has(h)||r.set(h,new Set),r.has(d)||r.set(d,new Set),r.get(h).add(d),r.get(d).add(h)},a=(t-e)*n;let o=[];for(let c=0;c<=a;c++){const l=[];for(let h=0;h<=a;h++){const d=i.partition(e+h/n,e+c/n);l.push(d),h>0&&s(d,l[h-1]),c>0&&s(d,o[h])}o=l}return r}function xf(i,e){const t=e.mapAreas,n=2,r=e.areaSize*e.areaScale,s=vn.length,a=3,o=Math.max(0,Math.min(1,e.areaSizeVariance))*a*.3,c=(N,P)=>{const F=N/r,O=P/r;return[F+o*(dr(F/a,O/a,i+91)-.5)*2,O+o*(dr(F/a,O/a,i+92)-.5)*2]},l=(N,P)=>{let F=N*r,O=P*r;for(let V=0;V<30;V++){const[Q,X]=c(F,O);F+=(N-Q)*r,O+=(P-X)*r}return[F,O]},h=ff(i,e.borderLayers),d=-n,u=t+n,p=gf(h,d,u,6),g=new Map,v=vi(i*5+1);for(let N=d;N<u;N++)for(let P=d;P<u;P++){const F=new Set;for(let Q=-2;Q<=2;Q++)for(let X=-2;X<=2;X++){const te=g.get(cr(P+X,N+Q));te!==void 0&&F.add(te)}for(const Q of p.get(cr(P,N))??[]){const X=g.get(Q);X!==void 0&&F.add(X)}const O=[...Array(s).keys()].filter(Q=>!F.has(Q)),V=O.length?O:[...Array(s).keys()];g.set(cr(P,N),V[Math.floor(v()*V.length)])}const x=(N,P)=>g.get(cr(N,P))??Math.floor(We(N,P,i+17)*s),m=Math.floor(t/2),_=(N,P)=>{const F=h.site(N,P),O=h.partition(F[0],F[1]);return O[0]===N&&O[1]===P};let M=[m,m];for(const[N,P]of[[0,0],[1,0],[0,1],[-1,0],[0,-1],[1,1],[-1,1],[1,-1],[-1,-1]])if(_(m+N,m+P)){M=[m+N,m+P];break}const S=(N,P)=>{const F=h.site(N,P),O=l(F[0],F[1]);return{x:O[0],z:O[1]}},w=S(M[0],M[1]),E=(N,P)=>{const[F,O]=c(N,P),V=h.partition(F,O);return{cell:V,type:x(V[0],V[1]),openness:h.openness(F,O)}},L=(N,P)=>{const F=vn[x(N,P)];return F.setPiece&&We(N,P,i+61)<e.setPieceChance?F.setPiece:null},y=e.dancefloor.radius,A=y+e.dancefloor.clearing,D=(N,P)=>{if(Math.hypot(N-w.x,P-w.z)<A)return 0;const[F,O]=c(N,P),V=h.partition(F,O);if(L(V[0],V[1])){const X=S(V[0],V[1]);if(Math.hypot(N-X.x,P-(X.z-4))<e.setPieceClear*e.setPieceScale)return 0}const Q=1-ln((dr(N/e.gladeScale,P/e.gladeScale,i+61)-(1-e.gladeAmount))/.03);return ln((h.openness(F,O)-e.clearingSize)/Math.max(.01,e.clearingFalloff))*e.treeDensity*Q},R=(N,P)=>Math.min(1,Math.hypot(N-M[0],P-M[1])/(t/2)),U=r*.5;return{seed:i,tuning:e,n:t,margin:n,areaSize:r,partition:h,centreCell:M,dancefloor:{x:w.x,z:w.z,radius:y},start:{x:w.x,z:w.z+2},bounds:{minX:U,maxX:t*r-U,minZ:U,maxZ:t*r-U},extent:{minX:d*r,maxX:u*r,minZ:d*r,maxZ:u*r},typeOf:x,areaAt:E,siteOf:S,treeWeight:D,neighbours:p,setPieceOf:L,remoteness:R}}function _l(i,e,t,n,r){return Math.hypot(i,e)<n||e>=0?!1:Math.atan2(Math.abs(i),-e)*180/Math.PI<(t?r.facing.awayLeave:r.facing.awayEnter)}function vf(i,e){return{x:i,z:e,vx:0,vz:0,lift:0,mode:"ground",facing:1,away:!1,lean:!1}}const Mr=(i,e)=>Pn(e.groundHeight,e.treetopHeight,ln(i.lift)),sc=i=>ln(i.lift);function _f(i,e,t,n,r){let{mode:s,lift:a}=i;e.toggleMode&&(s=s==="ground"||s==="descending"?"rising":"descending"),s==="rising"?(a+=t/Math.max(.001,n.riseTime),a>=1&&(a=1,s="treetop")):s==="descending"&&(a-=t/Math.max(.001,n.descendTime),a<=0&&(a=0,s="ground"));let o=e.moveX,c=e.moveZ;const l=Math.hypot(o,c);l>1&&(o/=l,c/=l);const h=Pn(n.groundSpeed,n.treetopSpeed,ln(a)),d=1-Math.exp(-Pn(n.groundAcceleration,n.acceleration,ln(a))*t);let u=i.vx+(o*h-i.vx)*d,p=i.vz+(c*h-i.vz)*d,g=i.x+u*t,v=i.z+p*t;(g<r.minX||g>r.maxX)&&(g=_i(g,r.minX,r.maxX),u=0),(v<r.minZ||v>r.maxZ)&&(v=_i(v,r.minZ,r.maxZ),p=0);const x=u>.3?1:u<-.3?-1:i.facing,m=Math.hypot(u,p),_=_l(u,p,i.away,Math.max(1,h*.15),n);return{x:g,z:v,vx:u,vz:p,lift:a,mode:s,facing:x,away:_,lean:m>h*n.leanAt}}const ma=3;function Mf(i,e,t=.5,n=1){const r=i.tuning,s=_i(e,0,1),a=Math.max(0,Math.round(Pn(r.creaturesNear,r.creaturesFar,Math.pow(s,r.creatureCurve))+(t-.5)*2)),o=a>0&&n<Sf(i,s)?1:0,c=Math.max(0,a-o),l=Math.round(c*r.adultShareFar*ln((s-r.adultsFrom)/Math.max(.01,1-r.adultsFrom))),h=Math.round((c-l)*r.youngShareFar*s);return{babies:Math.max(0,c-l-h),young:h,adults:l,legends:o}}const Sf=(i,e)=>i.tuning.legendChanceFar*ln((e-i.tuning.legendsFrom)/Math.max(.01,1-i.tuning.legendsFrom)),Uh=i=>i.areaSize*.75,Ks=(i,e,t,n)=>{const r=i.areaAt(e,t).cell;return r[0]===n[0]&&r[1]===n[1]};function Fh(i,e,t,n,r){if(Ks(i,t,n,e))return[t,n];for(let s=2;s<r*1.5;s+=2)for(let a=0;a<16;a++){const o=a/16*Math.PI*2,c=t+Math.cos(o)*s,l=n+Math.sin(o)*s;if(Ks(i,c,l,e))return[c,l]}return[t,n]}function $s(i,e,t){for(let n=0;n<12;n++){const r=t()*Math.PI*2,s=Math.sqrt(t())*e.range,a=e.homeX+Math.cos(r)*s,o=e.homeZ+Math.sin(r)*s;if(Ks(i,a,o,e.cell))return[a,o]}return[e.anchorX,e.anchorZ]}function yf(i){const e=[],t=i.tuning;let n=0;const[r,s]=i.centreCell;for(let a=0;a<i.n;a++)for(let o=0;o<i.n;o++){if(o===r&&a===s)continue;const c=vi(i.seed*7919+o*131+a*977+3),l=vn[i.typeOf(o,a)],h=i.siteOf(o,a),d=i.remoteness(o,a),u=Mf(i,d,We(o,a,i.seed+43),We(o,a,i.seed+47)),p=v=>{const x=[o,a],m=Uh(i),[_,M]=Fh(i,x,h.x,h.z,m),S={cell:x,homeX:h.x,homeZ:h.z,range:m,anchorX:_,anchorZ:M},[w,E]=$s(i,S,c);return{id:n++,species:l.creature,level:v,...S,x:w,z:E,tx:w,tz:E,rest:c()*3,speed:(v===ma?t.legendSpeed:t.creatureSpeed)*(.7+c()*.6),facing:c()<.5?1:-1,away:!1,moving:!1,walk:c(),seen:0,leashed:!1,rand:vi(i.seed*31+n*7+11)}};for(let v=0;v<u.babies;v++)e.push(p(0));for(let v=0;v<u.young;v++)e.push(p(1));for(let v=0;v<u.adults;v++)e.push(p(2));const g=t.legendNextToHome&&o===r+1&&a===s;(u.legends||g)&&e.push(p(3))}return e}function bf(i,e,t){if(i.rest>0){i.rest-=e,i.moving=!1,i.away=!1;return}const n=i.tx-i.x,r=i.tz-i.z,s=Math.hypot(n,r);if(s<.05){[i.tx,i.tz]=$s(t,i,i.rand),i.rest=.8+i.rand()*3.5,i.moving=!1;return}const a=Math.min(s,i.speed*e),o=i.x+n/s*a,c=i.z+r/s*a;if(!Ks(t,o,c,i.cell)){i.tx=i.x,i.tz=i.z,i.moving=!1;return}i.x=o,i.z=c,Math.abs(n)>.02&&(i.facing=n>0?1:-1),i.away=_l(n,r,i.away,0,t.tuning),i.moving=!0,i.walk+=e*(i.level===ma?1.5:4)}function wf(i,e,t,n,r,s,a){for(const o of i)if(!o.leashed&&!(Math.abs(o.homeX-e)>n||Math.abs(o.homeZ-t)>n)){if(s-o.seen>3){const c=vi(o.id*7919+Math.floor(s/20)*131+5);[o.x,o.z]=$s(a,o,c),[o.tx,o.tz]=$s(a,o,c),o.rest=c()*2}o.seen=s,bf(o,r,a)}}const Oh=6,Ef=4,kt=32;function Af(i){const e=i.tuning.camera.treetop.angleIn*Math.PI/180;return i.tuning.crownHeight/Math.sin(e)}function Bh(i,e,t,n,r,s){const a=i.tuning.areaEdgeBlend,o=i.seed;if(a.width<=0)return i.areaAt(e,t).type;const c=(dr(e/a.scale,t/a.scale,o+81)-.5)*2*a.width+(We(n,r,s+1)-.5)*a.width*a.stray,l=(dr(e/a.scale,t/a.scale,o+82)-.5)*2*a.width+(We(n,r,s+2)-.5)*a.width*a.stray;return i.areaAt(e+c,t+l).type}function Tf(i,e,t){const{treeSpacingX:n,treeSpacingZ:r}=i.tuning,s=i.seed,a=[],o=Af(i),c=i.tuning.crownHalfWidth,l=Math.ceil(t*kt/r),h=Math.ceil((t+1)*kt/r);for(let d=l;d<h;d++){const u=d&1?.5:0,p=Math.ceil(e*kt/n-u),g=Math.ceil((e+1)*kt/n-u);for(let v=p;v<g;v++){const x=(v+u+(We(v,d,s+101)-.5)*.7)*n,m=(d+(We(v,d,s+102)-.5)*.7)*r,_=Bh(i,x,m,v,d,s+106);We(v,d,s+103)>=i.treeWeight(x,m)*vn[_].treeDensity||i.treeWeight(x,m-o)===0||i.treeWeight(x-c,m-o)===0||i.treeWeight(x+c,m-o)===0||a.push({x,z:m,type:_,variant:Math.floor(We(v,d,s+104)*Oh),flip:We(v,d,s+105)<.5})}}return a}function Rf(i,e,t){const n=i.tuning.bushSpacing,r=i.seed,s=[],a=Math.ceil(t*kt/n),o=Math.ceil((t+1)*kt/n),c=Math.ceil(e*kt/n),l=Math.ceil((e+1)*kt/n);for(let h=a;h<o;h++)for(let d=c;d<l;d++){const u=(d+We(d,h,r+201)-.5)*n,p=(h+We(d,h,r+202)-.5)*n,g=1+i.tuning.bushClump*(2*ln((dr(u/13,p/13,r+207)-.35)/.3)-1);We(d,h,r+203)>(.12+Math.min(1,i.treeWeight(u,p))*.3)*i.tuning.bushDensity*g||Math.hypot(u-i.dancefloor.x,p-i.dancefloor.z)<i.dancefloor.radius+2||s.push({x:u,z:p,type:Bh(i,u,p,d,h,r+206),variant:Math.floor(We(d,h,r+204)*Ef),flip:We(d,h,r+205)<.5})}return s}function Cf(i,e,t){const n=i.tuning.wallSpacing,r=i.seed,s=[],a=Math.ceil(t*kt/n),o=Math.ceil((t+1)*kt/n),c=Math.ceil(e*kt/n),l=Math.ceil((e+1)*kt/n);for(let h=a;h<o;h++)for(let d=c;d<l;d++){if(We(d,h,r+303)>i.tuning.wallDensity)continue;const u=(d+(We(d,h,r+301)-.5)*.6)*n,p=(h+(We(d,h,r+302)-.5)*.6)*n,g=i.areaAt(u,p);g.openness<.82||!vn[g.type].hasWalls||Math.hypot(u-i.dancefloor.x,p-i.dancefloor.z)<i.dancefloor.radius+4||s.push({x:u,z:p,type:g.type,variant:Math.floor(We(d,h,r+304)*4),flip:We(d,h,r+305)<.5})}return s}const Lf=new Set(["wetland","stream","bog","beaver-pond","moor"]);function Pf(i,e,t){const n=i.tuning.lightSources,r=n.spacing,s=i.seed,a=[],o=Math.ceil(t*kt/r),c=Math.ceil((t+1)*kt/r),l=Math.ceil(e*kt/r),h=Math.ceil((e+1)*kt/r);for(let d=o;d<c;d++)for(let u=l;u<h;u++){const p=(u+(We(u,d,s+401)-.5)*.7)*r,g=(d+(We(u,d,s+402)-.5)*.7)*r;if(Math.hypot(p-i.dancefloor.x,g-i.dancefloor.z)<i.dancefloor.radius+i.tuning.dancefloor.clearing+4)continue;const v=i.areaAt(p,g),x=v.openness<.35||v.openness>.8?1:.25,m=We(u,d,s+403),M=(Lf.has(vn[v.type].id)?n.wetPond:n.pond)*x,S=n.campfire*x,w=n.magicStone*x,E=m<M?"pond":m<M+S?"campfire":m<M+S+w?"stone":null;E&&a.push({x:p,z:g,kind:E,size:.75+We(u,d,s+404)*.5})}return a}class Df{constructor(e){this.map=e}map;trees=new Map;bushes=new Map;walls=new Map;lights=new Map;chunks(e,t,n){const r=[];for(let s=Math.floor((t-n)/kt);s<=Math.floor((t+n)/kt);s++)for(let a=Math.floor((e-n)/kt);a<=Math.floor((e+n)/kt);a++)r.push([a,s]);return r}gather(e,t,n,r,s){e.size>600&&e.clear();const a=[];for(const[o,c]of this.chunks(n,r,s)){const l=o+","+c;let h=e.get(l);h||(h=t(o,c),e.set(l,h));for(const d of h)Math.abs(d.x-n)<=s&&Math.abs(d.z-r)<=s&&a.push(d)}return a}treesNear(e,t,n){return this.gather(this.trees,(r,s)=>Tf(this.map,r,s),e,t,n)}bushesNear(e,t,n){return this.gather(this.bushes,(r,s)=>Rf(this.map,r,s),e,t,n)}lightsNear(e,t,n){return this.gather(this.lights,(r,s)=>Pf(this.map,r,s),e,t,n)}wallsNear(e,t,n){return this.gather(this.walls,(r,s)=>Cf(this.map,r,s),e,t,n)}setPiecesNear(e,t,n){const r=this.map,s=r.areaSize,a=[];for(let o=Math.floor((t-n)/s)-1;o<=Math.floor((t+n)/s)+1;o++)for(let c=Math.floor((e-n)/s)-1;c<=Math.floor((e+n)/s)+1;c++){if(c===r.centreCell[0]&&o===r.centreCell[1]||!r.setPieceOf(c,o))continue;const l=r.siteOf(c,o);Math.abs(l.x-e)<=n&&Math.abs(l.z-4-t)<=n&&a.push({x:l.x,z:l.z-4,type:r.typeOf(c,o),variant:0,flip:We(c,o,r.seed+71)<.5})}return a}}const If=()=>({stack:[],placed:[],talk:null,events:[],held:!1,heldInAir:!1}),Nf=(i,e)=>e.invite.talkTime[Math.min(i.level,e.invite.talkTime.length-1)],Uf=(i,e)=>e.invite.turn[Math.min(i.level,e.invite.turn.length-1)],_o=i=>!i.leashed&&i.level!==ma;function Ff(i,e,t,n){if(i.stack.includes(e))return{x:t,z:n};const r=i.placed.find(s=>s.id===e);return r?{x:r.x,z:r.z}:null}function Ra(i,e,t,n,r=!1){let s=null,a=n;for(const o of i){if(o.leashed||!r&&!_o(o))continue;const c=Math.hypot(o.x-e,o.z-t);c<=a&&(a=c,s=o)}return s}function ac(i,e,t,n,r){e.leashed=!0,e.rest=0,i.stack.push(e.id),i.events.push({kind:"invited",id:e.id,x:t,z:n,at:r})}function Of(i,e,t,n,r,s,a,o){i.events=[],i.held=t.talk,i.heldInAir=t.talk&&!r;const c=o.invite,l=o.leash,h=d=>e[d];if(t.talk&&r){const d=i.talk?h(i.talk.id):null;if(d&&!d.leashed&&Math.hypot(d.x-n.x,d.z-n.z)<=c.cancelDistance)i.talk.t+=a,d.rest=Math.max(d.rest,.2),d.moving=!1,d.facing=n.x>=d.x?1:-1,d.away=n.z<d.z-1,!i.talk.refused&&i.talk.t>=i.talk.total&&(ac(i,d,d.x,d.z,s),i.talk=null);else{i.talk&&i.events.push({kind:"cancelled",id:i.talk.id,x:n.x,z:n.z,at:s});const u=Ra(e,n.x,n.z,c.talkRange)??Ra(e,n.x,n.z,c.talkRange,!0);i.talk=u?{id:u.id,refused:!_o(u),t:0,total:_o(u)?Nf(u,o):1/0}:null}}else i.talk&&(i.events.push({kind:"cancelled",id:i.talk.id,x:n.x,z:n.z,at:s}),i.talk=null);if(t.inviteNearest){const d=Ra(e,n.x,n.z,1/0);d&&ac(i,d,d.x,d.z,s)}if(t.sigil&&r){let d=-1,u=l.pickRadius;if(i.placed.forEach((p,g)=>{const v=Math.hypot(p.x-n.x,p.z-n.z);v<=u&&(u=v,d=g)}),d>=0){const[p]=i.placed.splice(d,1);i.stack.push(p.id),i.events.push({kind:"picked",id:p.id,x:p.x,z:p.z,at:s})}else if(i.stack.length){const p=i.stack[i.stack.length-1];zh(i,n.x,n.z,o)?i.events.push({kind:"fizzled",id:p,x:n.x,z:n.z,at:s}):(i.stack.pop(),i.placed.push({id:p,x:n.x,z:n.z,at:s}),i.events.push({kind:"placed",id:p,x:n.x,z:n.z,at:s}))}}for(const d of i.stack)oc(h(d),n.x,n.z,a,o);for(const d of i.placed)oc(h(d.id),d.x,d.z,a,o)}const zh=(i,e,t,n)=>i.placed.some(r=>Math.hypot(r.x-e,r.z-t)<n.leash.spacing);function oc(i,e,t,n,r){const s=r.leash,a=s.length,o=Math.hypot(i.x-e,i.z-t)>a;if(o){const p=Math.hypot(i.x-e,i.z-t),g=a*.5/p;i.tx=e+(i.x-e)*g,i.tz=t+(i.z-t)*g,i.rest=0}else if(i.rest>0){i.rest-=n,i.moving=!1,i.away=!1;return}else if(Math.hypot(i.tx-e,i.tz-t)>a*.85||Math.hypot(i.tx-i.x,i.tz-i.z)<.05){Math.hypot(i.tx-i.x,i.tz-i.z)<.05&&(i.rest=.5+i.rand()*2);const p=i.rand()*Math.PI*2,g=Math.sqrt(i.rand())*a*.8;if(i.tx=e+Math.cos(p)*g,i.tz=t+Math.sin(p)*g,i.rest>0){i.moving=!1,i.away=!1;return}}const c=i.tx-i.x,l=i.tz-i.z,h=Math.hypot(c,l);if(h<1e-4){i.moving=!1;return}const d=o?Math.max(i.speed,s.runSpeed*(i.level===ma?.6:1)):i.speed*1.5,u=Math.min(h,d*n);i.x+=c/h*u,i.z+=l/h*u,Math.abs(c)>.02&&(i.facing=c>0?1:-1),i.away=_l(c,l,i.away,0,r),i.moving=!0,i.walk+=n*(o?7:4)}const Bf=i=>`${i[0]},${i[1]}`;function zf(i){const e={cell:i.centreCell,wave:0,at:0,from:null,soundsystem:null};return{areas:new Map([[Bf(i.centreCell),e]]),wave:0,nextAt:i.tuning.party.startDelay+i.tuning.party.interval,paused:!1}}function kf(i,e){const t=i.siteOf(e[0],e[1]),n=vi(i.seed*17+e[0]*53+e[1]*911),[r,s]=Fh(i,[e[0],e[1]],t.x,t.z,i.areaSize*.75),a=Math.floor(We(e[0],e[1],i.seed+77)*3)%3;for(let o=0;o<24;o++){const c=n()*Math.PI*2,l=3+n()*4,h=r+Math.cos(c)*l,d=s+Math.sin(c)*l+3,u=i.areaAt(h,d).cell;if(u[0]===e[0]&&u[1]===e[1])return{x:h,z:d,variant:a}}return{x:r,z:s,variant:a}}const Gf=(i,e)=>e[0]>=0&&e[1]>=0&&e[0]<i.n&&e[1]<i.n;function kh(i,e,t){const n=i.wave+1,r=[],s=new Map,a=new Map;for(const[l,h]of i.areas)for(const d of e.neighbours.get(l)??[]){if(i.areas.has(d)||s.has(d))continue;const u=d.split(",").map(Number);Gf(e,u)&&(s.set(d,u),a.set(d,h.cell))}const o=[...s.entries()].sort((l,h)=>We(l[1][0],l[1][1],e.seed+n)-We(h[1][0],h[1][1],e.seed+n)),c=e.tuning.party.maxPerWave>0?e.tuning.party.maxPerWave:1/0;for(const[l,h]of o.slice(0,c)){const d={cell:h,wave:n,at:t,from:a.get(l)??null,soundsystem:kf(e,h)};i.areas.set(l,d),r.push(d)}return i.wave=n,r}function Hf(i,e,t,n){return i.paused?(i.nextAt+=n,[]):t<i.nextAt?[]:(i.nextAt+=e.tuning.party.interval,kh(i,e,t))}function Wf(i,e,t){const n=Math.max(0,i.nextAt-t),r=e.tuning.party.interval;return{left:n,gone:1-Math.min(1,n/r)}}function Vf(i,e){const t=xf(i,e),n=vf(t.start.x,t.start.z);return{seed:i,tuning:e,map:t,forest:new Df(t),creatures:yf(t),clock:Hu(),witch:n,camera:zu(e,n.x,Mr(n,e),n.z),party:zf(t),leash:If()}}function Xf(i,e,t){const n=Wu(i.clock,t);n!==0&&(i.witch=_f(i.witch,e,n,i.tuning,i.map.bounds),i.camera=ku(i.camera,e.zoom,{x:i.witch.x,y:Mr(i.witch,i.tuning),z:i.witch.z},{x:i.witch.vx,z:i.witch.vz},i.witch.lift,n,i.tuning),e.pauseWaves&&(i.party.paused=!i.party.paused),e.nextWave&&(kh(i.party,i.map,i.clock.time),i.party.nextAt=i.clock.time+i.tuning.party.interval),Hf(i.party,i.map,i.clock.time,n),wf(i.creatures,i.witch.x,i.witch.z,Yf(i),n,i.clock.time,i.map),Of(i.leash,i.creatures,{talk:!!e.talk,sigil:!!e.sigil,inviteNearest:e.inviteNearest},i.witch,i.witch.mode==="ground",i.clock.time,n,i.tuning))}const Yf=i=>Math.max(i.tuning.creatureSimRadius,i.tuning.haze.far+20+Uh(i.map)*2.5),lc=i=>xh(i.camera,i.camera.lift,i.tuning);function Gh(i){const e=i.map.areaAt(i.witch.x,i.witch.z),t=i.map.setPieceOf(e.cell[0],e.cell[1]);return vn[e.type].name+(t?` (set piece: ${t})`:"")}const qf="Witch tuning. Edit the numbers, push, and the playable link rebuilds. Distances are metres, times seconds, angles degrees. Keys starting with _ are notes.",Kf="The forest: mapAreas x mapAreas areas cut by the fractal partition. An area is areaSize x areaScale metres across on average (areaScale 4 makes them four times as wide as the first 28 m areas; push it for bigger). areaSizeVariance (0-1) makes areas vary in size, some small, some large. borderLayers sets how wiggly borders are.",$f=20,Zf=28,Jf=4,Qf=.7,jf=4,ep="treeHeight and crownWidth scale the art's trees (1 is the Art Lab's size; crowns widen with treeHeight too, crownWidth is the total). treeDensity (0-1): the chance of a tree on each spot outside the clearings; clearingSize (0-1): how far out from an area's centre the ground stays fully open; clearingFalloff (0-1): over how much of the way to the border trees thicken to full density (small: crisp clearing edges); gladeAmount (0-1) of the woods is open in random glades about gladeScale metres across; trees sit on a staggered grid treeSpacingX by treeSpacingZ metres, so no two crowns pile up. A tree is left out where its crown (crownHalfWidth either side, crownHeight up) would hang over a clearing seen from the treetops.",tp=.8,np=.2,ip=.12,rp=.25,sp=38,ap="Ragged area edges: each tree and bush takes its look (its area type) from a point up to width metres away, by a smooth noise scale metres across plus a per-plant stray (stray, share of width), so neighbouring areas' plants mix in a band along the border. Only the look: creatures, partifying and the party border keep the exact borders.",op={width:8,scale:24,stray:.5},lp=.45,cp=.8,hp=2.25,up=1.7,dp=4.6,fp=2.8,pp=10.5,mp=11.25,gp=3.4,xp=4,vp=.6,_p="Speeds per mode, and how long rising and descending take. acceleration: how quickly she reaches her speed or stops in the treetops (per second; higher is snappier); groundAcceleration: the same on the ground. leanAt: the share of the top speed above which she leans into her flight. facing: she (and every creature) faces the viewer unless clearly heading up the screen, within awayEnter degrees of straight up (and stays turned away until past awayLeave); sideways, down or stopped faces the viewer.",Mp=17.5,Sp=32,yp=10,bp=28,wp=.7,Ep={awayEnter:55,awayLeave:65},Ap=.7,Tp=.55,Rp=1.4,Cp=24,Lp="Near-isometric on the ground, after Transistor; lower over the treetops, looking toward the horizon to feel the speed. The camera follows the witch on a soft spring (follow: its stiffness; higher keeps her closer to the middle) and looks a little ahead of her: lookAhead seconds of flight, at most lookAheadMax metres, eased in at lookAheadEase. zoomEase and liftEase: how softly zoom and rising change the angle and distance. a narrow field of view (fov, degrees) seen from far off, so there is little perspective. Each mode has its own angle (degrees below horizontal) and distance from the witch, at zoomed-in and zoomed-out. Zoom moves between them in zoomSteps steps, starting at startZoom: with 4 steps and startZoom 1 the start is a third of the way out, so the defaults are ground 32 degrees at 100 m and treetop 36 degrees at 170 m, with one step in and two out from each.",Pp={fov:20,ground:{angleIn:30,angleOut:36,distanceIn:80,distanceOut:140},treetop:{angleIn:34,angleOut:40,distanceIn:150,distanceOut:210},lookAhead:.1,lookAheadMax:3,lookAheadEase:1.5,zoomEase:5,liftEase:8,zoomSteps:4,startZoom:1,follow:8},Dp="Everything the camera can see is drawn, plus viewMargin metres round the view, so nothing appears or vanishes on screen. haze: the twilight haze fades the forest from near to far metres from the witch; nothing is drawn beyond far. lightBudget: how many of the nearest point lights (campfires, magic stones, the dancefloor) light the scene at once. pixelSize: screen pixels per art pixel. glowReach: metres the witch's light reaches. spriteTilt: 1 = sprites face the camera fully, 0 = stand upright.",Ip=3,Np=12,Up=1,Fp=1,Op=16,Bp=12,zp=20,kp="Light sources placed by seed, on a grid of spacing metres, mostly in clearings and at area edges: the chance per spot of a campfire, a magic stone, or a pond mirroring the moon (wetPond in wet areas: wetland, stream, bog, beaver pond, moor).",Gp="How far (reach, metres) and how strongly each kind of light lights its surroundings. glowPower: the witch's own glow (glowReach is its reach). Light falls off smoothly to nothing at its reach: no rings or bands.",Hp={campfire:{reach:22,strength:2.6},stone:{reach:16,strength:1.8}},Wp=2.2,Vp="The music's clock (beats per minute): the lasers sweep to it and party animals dance to it. Later the music itself drives it.",Xp={bpm:120},Yp="Never lose the witch: tall things (over minHeight metres) standing in front of her fade to fadeOpacity where they cover her, with a soft edge of edge pixels; anything that still hides her shows her silhouette in her glow colour at silhouette opacity.",qp={on:!0,fadeOpacity:.38,edge:6,minHeight:2.5,silhouette:.55},Kp="The sigil stack above the witch's hat: scale (of the sigils' size), offset (the gap between her hat tip and the bottom sigil, in sigil heights), gap (between sigils, in sigil heights). It sways as a chain of springs: stiffness and damping, trail (how far it leans back per m/s of her speed), idleSway (metres of gentle sway when she's still).",$p={offset:.5,scale:.65,gap:.15,stiffness:60,damping:9,trail:.03,idleSway:.1},Zp="Each playing soundsystem's laser show: bursts of blockBars bars, on about duty of the time (seeded per soundsystem), up to maxCount beams stepping on the bars, fanned over spread degrees (no beam tilting more than maxTilt from straight up), swinging sweep degrees once every sweepBeats beats (slow, like searchlights), opening and closing the fan every openBars bars, length metres tall, opacity 0-1, fading in over fadeIn and out over fadeOut seconds, and fading with distance from fadeNear to fadeFar metres. Glow only: no light, nothing from the light budget.",Jp={on:!0,maxCount:9,length:420,spread:100,maxTilt:55,sweep:22,sweepBeats:12,openBars:6,opacity:.6,duty:.35,blockBars:4,fadeIn:.12,fadeOut:.4,fadeNear:140,fadeFar:480},Qp="A sparkling line round the partified region's outside edge, in each area's sigil colour: width (px), brightness, sparkle (0-1, how much it twinkles and runs), step (metres between its sparks).",jp={on:!0,width:2,brightness:1.2,sparkle:.6,step:1.6},e0={spacing:10,campfire:.035,magicStone:.025,pond:.02,wetPond:.12},t0={near:150,far:360},n0="The scenery budget (Ed, 2026-10-03: gameplay always drawn, scenery as much as we can). Creatures, sigils, soundsystems, the dancefloor, the party border, campfires and stones are always drawn. Scenery (trees, bushes, wall objects, set pieces, string lights) is drawn out to a radius round the witch, at most the haze's far edge, fading out over its last fade metres so nothing pops. With adaptive on, the radius follows the frame rate: if it stays under fps minus hysteresis for sustain seconds the radius shrinks by shrink metres a second, never below minRadius; if it stays at fps or more, it grows back by grow metres a second. ?scenery=<metres> fixes the radius (for testing).",i0={adaptive:!0,fps:55,hysteresis:8,sustain:1.5,minRadius:110,shrink:40,grow:15,fade:40},r0="bloom: a gentle glow round bright things (strength 0 or on false turns it off; threshold: how bright a pixel must be to glow). tiltShift: blurs the top and bottom of the screen so the forest looks like a miniature. strength: the blur at the screen's edges, in pixels; band: the height of the sharp band (0-1 of the screen); centre: where it sits (0 top, 0.5 middle, 1 bottom); where: 'before' blurs at the low resolution, before the pixels are scaled up, 'after' blurs the scaled-up image. Add ?tilt=before, ?tilt=after or ?tilt=off to the link to compare.",s0="shadows: a small contact shadow under the witch, each bush, creature and prop; trees: a crown-sized shadow under every tree too, cast away from the moon (off: Ed, 2026-10-03). canopyShadow: a dappled shadow from the canopy overhead (height in metres), thinner in clearings, drifting with the wind. mist: a low drifting mist (height in metres above the ground). Each has on and strength.",a0={on:!0,strength:.7,trees:!1},o0={on:!0,strength:.45,height:18,cover:.55,wind:.6},l0={on:!0,strength:.12,height:3,wind:.8},c0="fx: how the mist, the far haze and the canopy dapple are drawn. smooth: soft gradients (the mist in its own buffer, blurred a little and scaled up smoothly); pixel: dithered steps on the art's pixel grid. In smooth, the moonlight's bands, moonbeams and the soft contact shadows under the witch, creatures, bushes and props are smooth too (no dither anywhere); pixel brings all the dithers back. ?fx=pixel or ?fx=smooth in the URL.",h0="smooth",u0="Inviting (DESIGN.md, the leash): on the ground, hold Talk within talkRange metres of a creature; you chat in emoji for talkTime seconds (babies, young, adults), taking turns every turn seconds (babies, young, adults), then it is invited and leashed to you. Letting go, rising or moving further than cancelDistance cancels it. Legends can't be invited: they give one unimpressed look. leash.length: how far a leashed creature roams from its leash point (you, or its sigil on the ground); runSpeed: how fast it hurries back when out of range (m/s); pickRadius: how near a placed sigil you must be to pick it up; spacing: how close two sigils may be put down (keep it above pickRadius, or a blocked spot picks up instead of fizzling). bond: how a creature shows its tie to its sigil (rim: a glow at its feet in the sigil's colour; sparks: one spark every sparkEvery seconds from sigil to creature, staggered; thread: a dotted line only under strain).",d0={talkRange:12,cancelDistance:18,talkTime:[3,6,12],turn:[.7,.9,1.3]},f0={length:8,runSpeed:4,pickRadius:2,spacing:4},p0={rim:!0,sparks:!0,thread:!0,sparkEvery:4},m0="The party spreads: a wave every interval seconds (the first after startDelay more), partifying every area touching a partified one; maxPerWave caps a wave (0: no cap). transition: seconds an area takes to partify, 0 to skip the show. partyLight: the coloured light at each soundsystem (reach in metres, strength).",g0={interval:30,startDelay:0,maxPerWave:0,transition:2.5,lightReach:30,lightStrength:1.6},x0="Colourful string lights in every partified area, as long garlands: runsPerArea runs (a range), each spansPerRun spans (a range) from tree to tree, every next tree inside a forward cone of coneAngle degrees either side, so a run sweeps across rather than zig-zagging; runs start at least spread metres apart. Each span is spanMin to spanMax metres. No span crosses another and each tree holds at most two ends, except junction trees (junctionChance per tree on a run) where a branch leaves, so three meet. At height metres, sagging sag metres per 8 m of span, a bulb every bulbSpacing metres in the palette's colours, twinkling (twinkle 0-1), a chase running along now and then at chaseSpeed bulbs per second. The bulbs only glow (bloom); they cast no light.",v0={on:!0,runsPerArea:[3,6],spansPerRun:[4,10],coneAngle:35,junctionChance:.15,spanMin:6,spanMax:20,spread:24,height:6.5,sag:.9,bulbSpacing:.8,palette:["#fff1d6","#ff6fcf","#5fe8ff","#ffe25c","#b48cff","#7dff8a"],twinkle:.35,chaseSpeed:8},_0="The dancefloor: motes: magic particles drifting up off the circle (count, how high they rise in metres, speed in m/s, column: the share of the circle they rise from); a ring of standing stones (radius in metres, how many stones), a clear space of clearing metres round it, a glowing magic circle (two hues 0-1, pulse per second, runeSpeed in turns per minute) lighting the ground round it (lightReach metres, lightStrength), and a magic disco ball floating discoHeight metres up (discoSize metres across, spin turns per minute) throwing specks of light: specks is the share of the sphere that throws one, speckBrightness how bright, speckReach how far.",M0={motes:{count:220,rise:110,speed:3.2,column:.8},radius:13.5,stones:27,clearing:9,circleHue:.86,circleHue2:.52,pulse:.35,runeSpeed:1,lightReach:36,lightStrength:2,discoHeight:7.5,discoSize:1.8,spin:4,specks:.22,speckBrightness:.9,speckReach:32},S0="In ground mode the canopy stays drawn at the screen's edges, so she flies under the forest roof; a dithered hole round her is cut out, screenFraction of the screen's width across, with a soft edge (a fraction of the width). Rising closes the hole.",y0={screenFraction:.8,edge:.1},b0="Contrast: ambient scales the twilight fill (lower is darker shade under the canopy); black is the black point and gamma the curve applied to the whole picture, so dark goes near-black and lit stays bright.",w0={black:.03,gamma:1.35,ambient:.35},E0={on:!0,strength:.7,threshold:.55},A0={on:!0,where:"before",strength:3,band:.4,centre:.55},T0="Creatures grow more numerous and older with an area's distance from home (0 at the dancefloor, 1 at the map's edge): creaturesNear in the areas round home, creaturesFar at the edge (creatureCurve shapes the rise), youngShareFar of them young at the edge; adults from adultsFrom outward, adultShareFar of them at the edge. Legends are rare: at most one in any area, by a chance rising from 0 at legendsFrom to legendChanceFar at the edge; legendNextToHome puts one next to home, to look at early. Idle creatures roam their whole area. Only creatures whose home is within creatureSimRadius metres of the witch move (never less than the haze far edge plus 2.5 areas, so a creature resuming its roam always does so out of sight).",R0=2,C0=20,L0=1.3,P0=.5,D0=.35,I0=.35,N0=.25,U0=!0,F0=.55,O0=600,B0=.6,z0="setPieceChance: the share of areas, among the types that have a set piece, that show theirs. Wall objects (an area type's edges: puddles, henges, hedges) stand where areas meet, one per wallSpacing metres with chance wallDensity; they do not block movement.",k0=.25,G0=1.8,H0=9,W0=.35,V0={_readme:qf,_map:Kf,mapAreas:$f,areaSize:Zf,areaScale:Jf,areaSizeVariance:Qf,borderLayers:jf,_trees:ep,treeDensity:tp,clearingSize:np,clearingFalloff:ip,gladeAmount:rp,gladeScale:sp,_areaEdgeBlend:ap,areaEdgeBlend:op,bushDensity:lp,bushClump:cp,treeHeight:hp,crownWidth:up,treeSpacingX:dp,treeSpacingZ:fp,crownHalfWidth:pp,crownHeight:mp,bushSpacing:gp,wallSpacing:xp,wallDensity:vp,_witch:_p,groundSpeed:Mp,treetopSpeed:Sp,acceleration:yp,groundAcceleration:bp,leanAt:wp,facing:Ep,riseTime:Ap,descendTime:Tp,groundHeight:Rp,treetopHeight:Cp,_camera:Lp,camera:Pp,_look:Dp,pixelSize:Ip,glowReach:Np,glowHeight:Up,spriteTilt:Fp,artPixelsPerMetre:Op,viewMargin:Bp,lightBudget:zp,_lightSources:kp,_lights:Gp,lights:Hp,glowPower:Wp,_beat:Vp,beat:Xp,_occlusion:Yp,occlusion:qp,_stack:Kp,stack:$p,_lasers:Zp,lasers:Jp,_borders:Qp,borders:jp,lightSources:e0,haze:t0,_scenery:n0,scenery:i0,_post:r0,_shadows:s0,shadows:a0,canopyShadow:o0,mist:l0,_fx:c0,fx:h0,_invite:u0,invite:d0,leash:f0,bond:p0,_party:m0,party:g0,_stringLights:x0,stringLights:v0,_dancefloor:_0,dancefloor:M0,_canopyCutout:S0,canopyCutout:y0,_tone:b0,tone:w0,bloom:E0,tiltShift:A0,_creatures:T0,creaturesNear:R0,creaturesFar:C0,creatureCurve:L0,youngShareFar:P0,adultsFrom:D0,adultShareFar:I0,legendChanceFar:N0,legendNextToHome:U0,legendsFrom:F0,creatureSimRadius:O0,creatureSpeed:B0,_setPieces:z0,setPieceChance:k0,setPieceScale:G0,setPieceClear:H0,legendSpeed:W0},Xi=V0;class X0{keys=new Set;pressed=new Set;padPrev=[];touch={x:0,y:0,toggle:!1,zoom:0,debug:!1};onAny=null;constructor(e=window){e.addEventListener("keydown",t=>{if(t.repeat){this.isGameKey(t.code)&&t.preventDefault();return}this.keys.add(t.code),this.isGameKey(t.code)&&t.preventDefault(),this.onAny?.()||this.pressed.add(t.code)}),e.addEventListener("keyup",t=>this.keys.delete(t.code)),e.addEventListener("blur",()=>this.keys.clear())}isGameKey(e){return/^(Arrow|Space$|Key[WASDZXENPTIFR]$|Shift|Minus$|Equal$|NumpadAdd$|NumpadSubtract$|Backquote$)/.test(e)}clearPresses(){this.pressed.clear();const e=this.touch;e.toggle=!1,e.zoom=0,e.debug=!1}read(){const e=this.pressed.has("KeyN")||this.touch.nextWave,t=this.pressed.has("KeyP")||this.touch.pauseWaves;this.touch.nextWave=!1,this.touch.pauseWaves=!1;const n=x=>this.keys.has(x)?1:0,r=x=>this.pressed.has(x);let s=n("KeyD")+n("ArrowRight")-n("KeyA")-n("ArrowLeft"),a=n("KeyS")+n("ArrowDown")-n("KeyW")-n("ArrowUp"),o=r("Space"),c=(r("KeyX")||r("Minus")||r("NumpadSubtract")?1:0)-(r("KeyZ")||r("Equal")||r("NumpadAdd")?1:0),l=r("Backquote"),h=n("KeyT")+n("KeyF")+n("ShiftLeft")+n("ShiftRight")>0,d=r("KeyE")||r("KeyR");const u=r("KeyI");this.pressed.clear();const p=typeof navigator<"u"&&navigator.getGamepads?navigator.getGamepads():[];for(const x of p){if(!x)continue;const m=A=>!!x.buttons[A]?.pressed,M=x.buttons.some((A,D)=>A.pressed&&!this.padPrev[D])&&!!this.onAny?.(),S=A=>!M&&m(A)&&!this.padPrev[A];let w=x.axes[0]??0,E=x.axes[1]??0;const L=Math.hypot(w,E),y=.18;if(L<y)w=0,E=0;else{const A=(Math.min(1,L)-y)/(1-y)/L;w*=A,E*=A}w+=(m(15)?1:0)-(m(14)?1:0),E+=(m(13)?1:0)-(m(12)?1:0),s+=w,a+=E,S(3)&&(o=!0),(S(4)||S(6))&&(c+=1),(S(5)||S(7))&&(c-=1),S(8)&&(l=!0),m(0)&&(h=!0),S(2)&&(d=!0),this.padPrev=x.buttons.map(A=>A.pressed);break}const g=this.touch;s+=g.x,a+=g.y,g.toggle&&(o=!0),c+=g.zoom,g.debug&&(l=!0),g.talk&&(h=!0),g.sigil&&(d=!0),g.toggle=!1,g.zoom=0,g.debug=!1,g.sigil=!1;const v=Math.hypot(s,a);return v>1&&(s/=v,a/=v),{moveX:s,moveZ:a,toggleMode:o,zoom:Math.sign(c),debug:l,nextWave:e,pauseWaves:t,talk:h,sigil:d,inviteNearest:u}}}const Ml="186",Y0=0,cc=1,q0=2,ks=1,K0=2,Hr=3,Oi=0,on=1,jn=2,Hn=0,pr=1,Sr=2,hc=3,uc=4,ga=5,lr=100,$0=101,Z0=102,J0=103,Q0=104,Sl=200,j0=201,yl=202,em=203,bl=204,wl=205,tm=206,nm=207,im=208,rm=209,sm=210,am=211,om=212,lm=213,cm=214,Mo=0,So=1,yo=2,Yr=3,bo=4,wo=5,Zs=6,Eo=7,Hh=0,hm=1,um=2,Wn=0,Wh=1,Vh=2,Xh=3,Yh=4,qh=5,Kh=6,$h=7,Zh=300,Bi=301,yr=302,Ca=303,La=304,xa=306,Ao=1e3,ei=1001,To=1002,Ut=1003,dm=1004,os=1005,Nt=1006,Pa=1007,Di=1008,fn=1009,Jh=1010,Qh=1011,qr=1012,El=1013,Vn=1014,kn=1015,Xn=1016,Al=1017,Tl=1018,Kr=1020,jh=35902,eu=35899,tu=1021,nu=1022,pn=1023,ii=1026,Ii=1027,iu=1028,Rl=1029,zi=1030,Cl=1031,Ll=1033,Gs=33776,Hs=33777,Ws=33778,Vs=33779,Ro=35840,Co=35841,Lo=35842,Po=35843,Do=36196,Io=37492,No=37496,Uo=37488,Fo=37489,Js=37490,Oo=37491,Bo=37808,zo=37809,ko=37810,Go=37811,Ho=37812,Wo=37813,Vo=37814,Xo=37815,Yo=37816,qo=37817,Ko=37818,$o=37819,Zo=37820,Jo=37821,Qo=36492,jo=36494,el=36495,tl=36283,nl=36284,Qs=36285,il=36286,fm=3200,dc=0,pm=1,Dn="",bn="srgb",$r="srgb-linear",js="linear",gt="srgb",Da=7680,mm=519,gm=512,xm=513,vm=514,Pl=515,_m=516,Mm=517,Dl=518,Sm=519,ym=35044,mr=35048,fc="300 es",Gn=2e3,ea=2001;function bm(i){for(let e=i.length-1;e>=0;--e)if(i[e]>=65535)return!0;return!1}function ta(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function wm(){const i=ta("canvas");return i.style.display="block",i}const pc={};function mc(...i){const e="THREE."+i.shift();console.log(e,...i)}function ru(i){const e=i[0];if(typeof e=="string"&&e.startsWith("TSL:")){const t=i[1];t&&t.isStackTrace?i[0]+=" "+t.getLocation():i[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return i}function Ge(...i){i=ru(i);const e="THREE."+i.shift();{const t=i[0];t&&t.isStackTrace?console.warn(t.getError(e)):console.warn(e,...i)}}function lt(...i){i=ru(i);const e="THREE."+i.shift();{const t=i[0];t&&t.isStackTrace?console.error(t.getError(e)):console.error(e,...i)}}function gr(...i){const e=i.join(" ");e in pc||(pc[e]=!0,Ge(...i))}function Em(i,e,t){return new Promise(function(n,r){function s(){switch(i.clientWaitSync(e,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:r();break;case i.TIMEOUT_EXPIRED:setTimeout(s,t);break;default:n()}}setTimeout(s,t)})}const Am={[Mo]:So,[yo]:Zs,[bo]:Eo,[Yr]:wo,[So]:Mo,[Zs]:yo,[Eo]:bo,[wo]:Yr};class Hi{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){const n=this._listeners;return n===void 0?!1:n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){const n=this._listeners;if(n===void 0)return;const r=n[e];if(r!==void 0){const s=r.indexOf(t);s!==-1&&r.splice(s,1)}}dispatchEvent(e){const t=this._listeners;if(t===void 0)return;const n=t[e.type];if(n!==void 0){e.target=this;const r=n.slice(0);for(let s=0,a=r.length;s<a;s++)r[s].call(this,e);e.target=null}}}const Qt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Ia=Math.PI/180,rl=180/Math.PI;function Qr(){const i=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Qt[i&255]+Qt[i>>8&255]+Qt[i>>16&255]+Qt[i>>24&255]+"-"+Qt[e&255]+Qt[e>>8&255]+"-"+Qt[e>>16&15|64]+Qt[e>>24&255]+"-"+Qt[t&63|128]+Qt[t>>8&255]+"-"+Qt[t>>16&255]+Qt[t>>24&255]+Qt[n&255]+Qt[n>>8&255]+Qt[n>>16&255]+Qt[n>>24&255]).toLowerCase()}function it(i,e,t){return Math.max(e,Math.min(t,i))}function Tm(i,e){return(i%e+e)%e}function Na(i,e,t){return(1-t)*i+t*e}function Ir(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:case Uint8ClampedArray:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function an(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:case Uint8ClampedArray:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}class He{static{He.prototype.isVector2=!0}constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("THREE.Vector2: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,n=this.y,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6],this.y=r[1]*t+r[4]*n+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=it(this.x,e.x,t.x),this.y=it(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=it(this.x,e,t),this.y=it(this.y,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(it(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(it(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const n=Math.cos(t),r=Math.sin(t),s=this.x-e.x,a=this.y-e.y;return this.x=s*n-a*r+e.x,this.y=s*r+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Er{constructor(e=0,t=0,n=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=r}static slerpFlat(e,t,n,r,s,a,o){let c=n[r+0],l=n[r+1],h=n[r+2],d=n[r+3],u=s[a+0],p=s[a+1],g=s[a+2],v=s[a+3];if(d!==v||c!==u||l!==p||h!==g){let x=c*u+l*p+h*g+d*v;x<0&&(u=-u,p=-p,g=-g,v=-v,x=-x);let m=1-o;if(x<.9995){const _=Math.acos(x),M=Math.sin(_);m=Math.sin(m*_)/M,o=Math.sin(o*_)/M,c=c*m+u*o,l=l*m+p*o,h=h*m+g*o,d=d*m+v*o}else{c=c*m+u*o,l=l*m+p*o,h=h*m+g*o,d=d*m+v*o;const _=1/Math.sqrt(c*c+l*l+h*h+d*d);c*=_,l*=_,h*=_,d*=_}}e[t]=c,e[t+1]=l,e[t+2]=h,e[t+3]=d}static multiplyQuaternionsFlat(e,t,n,r,s,a){const o=n[r],c=n[r+1],l=n[r+2],h=n[r+3],d=s[a],u=s[a+1],p=s[a+2],g=s[a+3];return e[t]=o*g+h*d+c*p-l*u,e[t+1]=c*g+h*u+l*d-o*p,e[t+2]=l*g+h*p+o*u-c*d,e[t+3]=h*g-o*d-c*u-l*p,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,r){return this._x=e,this._y=t,this._z=n,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const n=e._x,r=e._y,s=e._z,a=e._order,o=Math.cos,c=Math.sin,l=o(n/2),h=o(r/2),d=o(s/2),u=c(n/2),p=c(r/2),g=c(s/2);switch(a){case"XYZ":this._x=u*h*d+l*p*g,this._y=l*p*d-u*h*g,this._z=l*h*g+u*p*d,this._w=l*h*d-u*p*g;break;case"YXZ":this._x=u*h*d+l*p*g,this._y=l*p*d-u*h*g,this._z=l*h*g-u*p*d,this._w=l*h*d+u*p*g;break;case"ZXY":this._x=u*h*d-l*p*g,this._y=l*p*d+u*h*g,this._z=l*h*g+u*p*d,this._w=l*h*d-u*p*g;break;case"ZYX":this._x=u*h*d-l*p*g,this._y=l*p*d+u*h*g,this._z=l*h*g-u*p*d,this._w=l*h*d+u*p*g;break;case"YZX":this._x=u*h*d+l*p*g,this._y=l*p*d+u*h*g,this._z=l*h*g-u*p*d,this._w=l*h*d-u*p*g;break;case"XZY":this._x=u*h*d-l*p*g,this._y=l*p*d-u*h*g,this._z=l*h*g+u*p*d,this._w=l*h*d+u*p*g;break;default:Ge("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const n=t/2,r=Math.sin(n);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,n=t[0],r=t[4],s=t[8],a=t[1],o=t[5],c=t[9],l=t[2],h=t[6],d=t[10],u=n+o+d;if(u>0){const p=.5/Math.sqrt(u+1);this._w=.25/p,this._x=(h-c)*p,this._y=(s-l)*p,this._z=(a-r)*p}else if(n>o&&n>d){const p=2*Math.sqrt(1+n-o-d);this._w=(h-c)/p,this._x=.25*p,this._y=(r+a)/p,this._z=(s+l)/p}else if(o>d){const p=2*Math.sqrt(1+o-n-d);this._w=(s-l)/p,this._x=(r+a)/p,this._y=.25*p,this._z=(c+h)/p}else{const p=2*Math.sqrt(1+d-n-o);this._w=(a-r)/p,this._x=(s+l)/p,this._y=(c+h)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(it(this.dot(e),-1,1)))}rotateTowards(e,t){const n=this.angleTo(e);if(n===0)return this;const r=Math.min(1,t/n);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const n=e._x,r=e._y,s=e._z,a=e._w,o=t._x,c=t._y,l=t._z,h=t._w;return this._x=n*h+a*o+r*l-s*c,this._y=r*h+a*c+s*o-n*l,this._z=s*h+a*l+n*c-r*o,this._w=a*h-n*o-r*c-s*l,this._onChangeCallback(),this}slerp(e,t){let n=e._x,r=e._y,s=e._z,a=e._w,o=this.dot(e);o<0&&(n=-n,r=-r,s=-s,a=-a,o=-o);let c=1-t;if(o<.9995){const l=Math.acos(o),h=Math.sin(l);c=Math.sin(c*l)/h,t=Math.sin(t*l)/h,this._x=this._x*c+n*t,this._y=this._y*c+r*t,this._z=this._z*c+s*t,this._w=this._w*c+a*t,this._onChangeCallback()}else this._x=this._x*c+n*t,this._y=this._y*c+r*t,this._z=this._z*c+s*t,this._w=this._w*c+a*t,this.normalize();return this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),r=Math.sqrt(1-n),s=Math.sqrt(n);return this.set(r*Math.sin(e),r*Math.cos(e),s*Math.sin(t),s*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class W{static{W.prototype.isVector3=!0}constructor(e=0,t=0,n=0){this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("THREE.Vector3: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(gc.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(gc.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,n=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6]*r,this.y=s[1]*t+s[4]*n+s[7]*r,this.z=s[2]*t+s[5]*n+s[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,n=this.y,r=this.z,s=e.elements,a=1/(s[3]*t+s[7]*n+s[11]*r+s[15]);return this.x=(s[0]*t+s[4]*n+s[8]*r+s[12])*a,this.y=(s[1]*t+s[5]*n+s[9]*r+s[13])*a,this.z=(s[2]*t+s[6]*n+s[10]*r+s[14])*a,this}applyQuaternion(e){const t=this.x,n=this.y,r=this.z,s=e.x,a=e.y,o=e.z,c=e.w,l=2*(a*r-o*n),h=2*(o*t-s*r),d=2*(s*n-a*t);return this.x=t+c*l+a*d-o*h,this.y=n+c*h+o*l-s*d,this.z=r+c*d+s*h-a*l,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,n=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[4]*n+s[8]*r,this.y=s[1]*t+s[5]*n+s[9]*r,this.z=s[2]*t+s[6]*n+s[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=it(this.x,e.x,t.x),this.y=it(this.y,e.y,t.y),this.z=it(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=it(this.x,e,t),this.y=it(this.y,e,t),this.z=it(this.z,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(it(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const n=e.x,r=e.y,s=e.z,a=t.x,o=t.y,c=t.z;return this.x=r*c-s*o,this.y=s*a-n*c,this.z=n*o-r*a,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return Ua.copy(this).projectOnVector(e),this.sub(Ua)}reflect(e){return this.sub(Ua.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(it(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y,r=this.z-e.z;return t*t+n*n+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){const r=Math.sin(t)*e;return this.x=r*Math.sin(n),this.y=Math.cos(t)*e,this.z=r*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=r,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Ua=new W,gc=new Er;class Ve{static{Ve.prototype.isMatrix3=!0}constructor(e,t,n,r,s,a,o,c,l){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,r,s,a,o,c,l)}set(e,t,n,r,s,a,o,c,l){const h=this.elements;return h[0]=e,h[1]=r,h[2]=o,h[3]=t,h[4]=s,h[5]=c,h[6]=n,h[7]=a,h[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,r=t.elements,s=this.elements,a=n[0],o=n[3],c=n[6],l=n[1],h=n[4],d=n[7],u=n[2],p=n[5],g=n[8],v=r[0],x=r[3],m=r[6],_=r[1],M=r[4],S=r[7],w=r[2],E=r[5],L=r[8];return s[0]=a*v+o*_+c*w,s[3]=a*x+o*M+c*E,s[6]=a*m+o*S+c*L,s[1]=l*v+h*_+d*w,s[4]=l*x+h*M+d*E,s[7]=l*m+h*S+d*L,s[2]=u*v+p*_+g*w,s[5]=u*x+p*M+g*E,s[8]=u*m+p*S+g*L,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[1],r=e[2],s=e[3],a=e[4],o=e[5],c=e[6],l=e[7],h=e[8];return t*a*h-t*o*l-n*s*h+n*o*c+r*s*l-r*a*c}invert(){const e=this.elements,t=e[0],n=e[1],r=e[2],s=e[3],a=e[4],o=e[5],c=e[6],l=e[7],h=e[8],d=h*a-o*l,u=o*c-h*s,p=l*s-a*c,g=t*d+n*u+r*p;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const v=1/g;return e[0]=d*v,e[1]=(r*l-h*n)*v,e[2]=(o*n-r*a)*v,e[3]=u*v,e[4]=(h*t-r*c)*v,e[5]=(r*s-o*t)*v,e[6]=p*v,e[7]=(n*c-l*t)*v,e[8]=(a*t-n*s)*v,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,r,s,a,o){const c=Math.cos(s),l=Math.sin(s);return this.set(n*c,n*l,-n*(c*a+l*o)+a+e,-r*l,r*c,-r*(-l*a+c*o)+o+t,0,0,1),this}scale(e,t){return gr("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(Fa.makeScale(e,t)),this}rotate(e){return gr("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(Fa.makeRotation(-e)),this}translate(e,t){return gr("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(Fa.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,n=e.elements;for(let r=0;r<9;r++)if(t[r]!==n[r])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const Fa=new Ve,xc=new Ve().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),vc=new Ve().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Rm(){const i={enabled:!0,workingColorSpace:$r,spaces:{},convert:function(r,s,a){return this.enabled===!1||s===a||!s||!a||(this.spaces[s].transfer===gt&&(r.r=ni(r.r),r.g=ni(r.g),r.b=ni(r.b)),this.spaces[s].primaries!==this.spaces[a].primaries&&(r.applyMatrix3(this.spaces[s].toXYZ),r.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===gt&&(r.r=xr(r.r),r.g=xr(r.g),r.b=xr(r.b))),r},workingToColorSpace:function(r,s){return this.convert(r,this.workingColorSpace,s)},colorSpaceToWorking:function(r,s){return this.convert(r,s,this.workingColorSpace)},getPrimaries:function(r){return this.spaces[r].primaries},getTransfer:function(r){return r===Dn?js:this.spaces[r].transfer},getToneMappingMode:function(r){return this.spaces[r].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(r,s=this.workingColorSpace){return r.fromArray(this.spaces[s].luminanceCoefficients)},define:function(r){Object.assign(this.spaces,r)},_getMatrix:function(r,s,a){return r.copy(this.spaces[s].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(r){return this.spaces[r].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(r=this.workingColorSpace){return this.spaces[r].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(r,s){return gr("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),i.workingToColorSpace(r,s)},toWorkingColorSpace:function(r,s){return gr("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),i.colorSpaceToWorking(r,s)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[$r]:{primaries:e,whitePoint:n,transfer:js,toXYZ:xc,fromXYZ:vc,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:bn},outputColorSpaceConfig:{drawingBufferColorSpace:bn}},[bn]:{primaries:e,whitePoint:n,transfer:gt,toXYZ:xc,fromXYZ:vc,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:bn}}}),i}const nt=Rm();function ni(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function xr(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}let Yi;class Cm{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{Yi===void 0&&(Yi=ta("canvas")),Yi.width=e.width,Yi.height=e.height;const r=Yi.getContext("2d");e instanceof ImageData?r.putImageData(e,0,0):r.drawImage(e,0,0,e.width,e.height),n=Yi}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=ta("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);const r=n.getImageData(0,0,e.width,e.height),s=r.data;for(let a=0;a<s.length;a++)s[a]=ni(s[a]/255)*255;return n.putImageData(r,0,0),t}else if(e.data){const t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(ni(t[n]/255)*255):t[n]=ni(t[n]);return{data:t,width:e.width,height:e.height}}else return Ge("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let Lm=0;class Il{constructor(e=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:Lm++}),this.uuid=Qr(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<"u"&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const n={uuid:this.uuid,url:""},r=this.data;if(r!==null){let s;if(Array.isArray(r)){s=[];for(let a=0,o=r.length;a<o;a++)r[a].isDataTexture?s.push(Oa(r[a].image)):s.push(Oa(r[a]))}else s=Oa(r);n.url=s}return t||(e.images[this.uuid]=n),n}}function Oa(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?Cm.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(Ge("Texture: Unable to serialize Texture."),{})}let Pm=0;const Ba=new W;class tn extends Hi{constructor(e=tn.DEFAULT_IMAGE,t=tn.DEFAULT_MAPPING,n=ei,r=ei,s=Nt,a=Di,o=pn,c=fn,l=tn.DEFAULT_ANISOTROPY,h=Dn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Pm++}),this.uuid=Qr(),this.name="",this.source=new Il(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=r,this.magFilter=s,this.minFilter=a,this.anisotropy=l,this.format=o,this.internalFormat=null,this.type=c,this.offset=new He(0,0),this.repeat=new He(1,1),this.center=new He(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ve,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(Ba).x}get height(){return this.source.getSize(Ba).y}get depth(){return this.source.getSize(Ba).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const t in e){const n=e[t];if(n===void 0){Ge(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}const r=this[t];if(r===void 0){Ge(`Texture.setValues(): property '${t}' does not exist.`);continue}r&&n&&r.isVector2&&n.isVector2||r&&n&&r.isVector3&&n.isVector3||r&&n&&r.isMatrix3&&n.isMatrix3?r.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Zh)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Ao:e.x=e.x-Math.floor(e.x);break;case ei:e.x=e.x<0?0:1;break;case To:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Ao:e.y=e.y-Math.floor(e.y);break;case ei:e.y=e.y<0?0:1;break;case To:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}tn.DEFAULT_IMAGE=null;tn.DEFAULT_MAPPING=Zh;tn.DEFAULT_ANISOTROPY=1;class rt{static{rt.prototype.isVector4=!0}constructor(e=0,t=0,n=0,r=1){this.x=e,this.y=t,this.z=n,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,r){return this.x=e,this.y=t,this.z=n,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("THREE.Vector4: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,n=this.y,r=this.z,s=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*r+a[12]*s,this.y=a[1]*t+a[5]*n+a[9]*r+a[13]*s,this.z=a[2]*t+a[6]*n+a[10]*r+a[14]*s,this.w=a[3]*t+a[7]*n+a[11]*r+a[15]*s,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,r,s;const c=e.elements,l=c[0],h=c[4],d=c[8],u=c[1],p=c[5],g=c[9],v=c[2],x=c[6],m=c[10];if(Math.abs(h-u)<.01&&Math.abs(d-v)<.01&&Math.abs(g-x)<.01){if(Math.abs(h+u)<.1&&Math.abs(d+v)<.1&&Math.abs(g+x)<.1&&Math.abs(l+p+m-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const M=(l+1)/2,S=(p+1)/2,w=(m+1)/2,E=(h+u)/4,L=(d+v)/4,y=(g+x)/4;return M>S&&M>w?M<.01?(n=0,r=.707106781,s=.707106781):(n=Math.sqrt(M),r=E/n,s=L/n):S>w?S<.01?(n=.707106781,r=0,s=.707106781):(r=Math.sqrt(S),n=E/r,s=y/r):w<.01?(n=.707106781,r=.707106781,s=0):(s=Math.sqrt(w),n=L/s,r=y/s),this.set(n,r,s,t),this}let _=Math.sqrt((x-g)*(x-g)+(d-v)*(d-v)+(u-h)*(u-h));return Math.abs(_)<.001&&(_=1),this.x=(x-g)/_,this.y=(d-v)/_,this.z=(u-h)/_,this.w=Math.acos((l+p+m-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=it(this.x,e.x,t.x),this.y=it(this.y,e.y,t.y),this.z=it(this.z,e.z,t.z),this.w=it(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=it(this.x,e,t),this.y=it(this.y,e,t),this.z=it(this.z,e,t),this.w=it(this.w,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(it(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Dm extends Hi{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Nt,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new rt(0,0,e,t),this.scissorTest=!1,this.viewport=new rt(0,0,e,t),this.textures=[];const r={width:e,height:t,depth:n.depth},s=new tn(r),a=n.count;for(let o=0;o<a;o++)this.textures[o]=s.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveColorBuffer=n.resolveColorBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.storeMultisampledColorBuffer=n.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=n.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=n.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview,this.useArrayDepthTexture=n.useArrayDepthTexture}_setTextureOptions(e={}){const t={minFilter:Nt,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),e!==null&&e.renderTarget===null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let r=0,s=this.textures.length;r<s;r++)this.textures[r].image.width=e,this.textures[r].image.height=t,this.textures[r].image.depth=n,this.textures[r].isData3DTexture!==!0&&(this.textures[r].isArrayTexture=this.textures[r].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;const r=Object.assign({},e.textures[t].image);this.textures[t].source=new Il(r)}if(this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveColorBuffer=e.resolveColorBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,this.storeMultisampledColorBuffer=e.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=e.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=e.storeMultisampledStencilBuffer,e.depthTexture!==null)if(e.depthTexture.renderTarget===e){const t=e.depthTexture.clone();t.renderTarget=null,this.depthTexture=t}else this.depthTexture=e.depthTexture;return this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}}class En extends Dm{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}}class su extends tn{constructor(e=null,t=1,n=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=Ut,this.minFilter=Ut,this.wrapR=ei,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class Im extends tn{constructor(e=null,t=1,n=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=Ut,this.minFilter=Ut,this.wrapR=ei,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}}class Pt{static{Pt.prototype.isMatrix4=!0}constructor(e,t,n,r,s,a,o,c,l,h,d,u,p,g,v,x){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,r,s,a,o,c,l,h,d,u,p,g,v,x)}set(e,t,n,r,s,a,o,c,l,h,d,u,p,g,v,x){const m=this.elements;return m[0]=e,m[4]=t,m[8]=n,m[12]=r,m[1]=s,m[5]=a,m[9]=o,m[13]=c,m[2]=l,m[6]=h,m[10]=d,m[14]=u,m[3]=p,m[7]=g,m[11]=v,m[15]=x,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Pt().fromArray(this.elements)}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){const t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return this.determinantAffine()===0?(e.set(1,0,0),t.set(0,1,0),n.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();const t=this.elements,n=e.elements,r=1/qi.setFromMatrixColumn(e,0).length(),s=1/qi.setFromMatrixColumn(e,1).length(),a=1/qi.setFromMatrixColumn(e,2).length();return t[0]=n[0]*r,t[1]=n[1]*r,t[2]=n[2]*r,t[3]=0,t[4]=n[4]*s,t[5]=n[5]*s,t[6]=n[6]*s,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,n=e.x,r=e.y,s=e.z,a=Math.cos(n),o=Math.sin(n),c=Math.cos(r),l=Math.sin(r),h=Math.cos(s),d=Math.sin(s);if(e.order==="XYZ"){const u=a*h,p=a*d,g=o*h,v=o*d;t[0]=c*h,t[4]=-c*d,t[8]=l,t[1]=p+g*l,t[5]=u-v*l,t[9]=-o*c,t[2]=v-u*l,t[6]=g+p*l,t[10]=a*c}else if(e.order==="YXZ"){const u=c*h,p=c*d,g=l*h,v=l*d;t[0]=u+v*o,t[4]=g*o-p,t[8]=a*l,t[1]=a*d,t[5]=a*h,t[9]=-o,t[2]=p*o-g,t[6]=v+u*o,t[10]=a*c}else if(e.order==="ZXY"){const u=c*h,p=c*d,g=l*h,v=l*d;t[0]=u-v*o,t[4]=-a*d,t[8]=g+p*o,t[1]=p+g*o,t[5]=a*h,t[9]=v-u*o,t[2]=-a*l,t[6]=o,t[10]=a*c}else if(e.order==="ZYX"){const u=a*h,p=a*d,g=o*h,v=o*d;t[0]=c*h,t[4]=g*l-p,t[8]=u*l+v,t[1]=c*d,t[5]=v*l+u,t[9]=p*l-g,t[2]=-l,t[6]=o*c,t[10]=a*c}else if(e.order==="YZX"){const u=a*c,p=a*l,g=o*c,v=o*l;t[0]=c*h,t[4]=v-u*d,t[8]=g*d+p,t[1]=d,t[5]=a*h,t[9]=-o*h,t[2]=-l*h,t[6]=p*d+g,t[10]=u-v*d}else if(e.order==="XZY"){const u=a*c,p=a*l,g=o*c,v=o*l;t[0]=c*h,t[4]=-d,t[8]=l*h,t[1]=u*d+v,t[5]=a*h,t[9]=p*d-g,t[2]=g*d-p,t[6]=o*h,t[10]=v*d+u}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Nm,e,Um)}lookAt(e,t,n){const r=this.elements;return hn.subVectors(e,t),hn.lengthSq()===0&&(hn.z=1),hn.normalize(),li.crossVectors(n,hn),li.lengthSq()===0&&(Math.abs(n.z)===1?hn.x+=1e-4:hn.z+=1e-4,hn.normalize(),li.crossVectors(n,hn)),li.normalize(),ls.crossVectors(hn,li),r[0]=li.x,r[4]=ls.x,r[8]=hn.x,r[1]=li.y,r[5]=ls.y,r[9]=hn.y,r[2]=li.z,r[6]=ls.z,r[10]=hn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,r=t.elements,s=this.elements,a=n[0],o=n[4],c=n[8],l=n[12],h=n[1],d=n[5],u=n[9],p=n[13],g=n[2],v=n[6],x=n[10],m=n[14],_=n[3],M=n[7],S=n[11],w=n[15],E=r[0],L=r[4],y=r[8],A=r[12],D=r[1],R=r[5],U=r[9],N=r[13],P=r[2],F=r[6],O=r[10],V=r[14],Q=r[3],X=r[7],te=r[11],B=r[15];return s[0]=a*E+o*D+c*P+l*Q,s[4]=a*L+o*R+c*F+l*X,s[8]=a*y+o*U+c*O+l*te,s[12]=a*A+o*N+c*V+l*B,s[1]=h*E+d*D+u*P+p*Q,s[5]=h*L+d*R+u*F+p*X,s[9]=h*y+d*U+u*O+p*te,s[13]=h*A+d*N+u*V+p*B,s[2]=g*E+v*D+x*P+m*Q,s[6]=g*L+v*R+x*F+m*X,s[10]=g*y+v*U+x*O+m*te,s[14]=g*A+v*N+x*V+m*B,s[3]=_*E+M*D+S*P+w*Q,s[7]=_*L+M*R+S*F+w*X,s[11]=_*y+M*U+S*O+w*te,s[15]=_*A+M*N+S*V+w*B,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[4],r=e[8],s=e[12],a=e[1],o=e[5],c=e[9],l=e[13],h=e[2],d=e[6],u=e[10],p=e[14],g=e[3],v=e[7],x=e[11],m=e[15],_=c*p-l*u,M=o*p-l*d,S=o*u-c*d,w=a*p-l*h,E=a*u-c*h,L=a*d-o*h;return t*(v*_-x*M+m*S)-n*(g*_-x*w+m*E)+r*(g*M-v*w+m*L)-s*(g*S-v*E+x*L)}determinantAffine(){const e=this.elements,t=e[0],n=e[4],r=e[8],s=e[1],a=e[5],o=e[9],c=e[2],l=e[6],h=e[10];return t*(a*h-o*l)-n*(s*h-o*c)+r*(s*l-a*c)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){const r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=n),this}invert(){const e=this.elements,t=e[0],n=e[1],r=e[2],s=e[3],a=e[4],o=e[5],c=e[6],l=e[7],h=e[8],d=e[9],u=e[10],p=e[11],g=e[12],v=e[13],x=e[14],m=e[15],_=t*o-n*a,M=t*c-r*a,S=t*l-s*a,w=n*c-r*o,E=n*l-s*o,L=r*l-s*c,y=h*v-d*g,A=h*x-u*g,D=h*m-p*g,R=d*x-u*v,U=d*m-p*v,N=u*m-p*x,P=_*N-M*U+S*R+w*D-E*A+L*y;if(P===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const F=1/P;return e[0]=(o*N-c*U+l*R)*F,e[1]=(r*U-n*N-s*R)*F,e[2]=(v*L-x*E+m*w)*F,e[3]=(u*E-d*L-p*w)*F,e[4]=(c*D-a*N-l*A)*F,e[5]=(t*N-r*D+s*A)*F,e[6]=(x*S-g*L-m*M)*F,e[7]=(h*L-u*S+p*M)*F,e[8]=(a*U-o*D+l*y)*F,e[9]=(n*D-t*U-s*y)*F,e[10]=(g*E-v*S+m*_)*F,e[11]=(d*S-h*E-p*_)*F,e[12]=(o*A-a*R-c*y)*F,e[13]=(t*R-n*A+r*y)*F,e[14]=(v*M-g*w-x*_)*F,e[15]=(h*w-d*M+u*_)*F,this}scale(e){const t=this.elements,n=e.x,r=e.y,s=e.z;return t[0]*=n,t[4]*=r,t[8]*=s,t[1]*=n,t[5]*=r,t[9]*=s,t[2]*=n,t[6]*=r,t[10]*=s,t[3]*=n,t[7]*=r,t[11]*=s,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,r))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const n=Math.cos(t),r=Math.sin(t),s=1-n,a=e.x,o=e.y,c=e.z,l=s*a,h=s*o;return this.set(l*a+n,l*o-r*c,l*c+r*o,0,l*o+r*c,h*o+n,h*c-r*a,0,l*c-r*o,h*c+r*a,s*c*c+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,r,s,a){return this.set(1,n,s,0,e,1,a,0,t,r,1,0,0,0,0,1),this}compose(e,t,n){const r=this.elements,s=t._x,a=t._y,o=t._z,c=t._w,l=s+s,h=a+a,d=o+o,u=s*l,p=s*h,g=s*d,v=a*h,x=a*d,m=o*d,_=c*l,M=c*h,S=c*d,w=n.x,E=n.y,L=n.z;return r[0]=(1-(v+m))*w,r[1]=(p+S)*w,r[2]=(g-M)*w,r[3]=0,r[4]=(p-S)*E,r[5]=(1-(u+m))*E,r[6]=(x+_)*E,r[7]=0,r[8]=(g+M)*L,r[9]=(x-_)*L,r[10]=(1-(u+v))*L,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,n){const r=this.elements;e.x=r[12],e.y=r[13],e.z=r[14];const s=this.determinantAffine();if(s===0)return n.set(1,1,1),t.identity(),this;let a=qi.set(r[0],r[1],r[2]).length();const o=qi.set(r[4],r[5],r[6]).length(),c=qi.set(r[8],r[9],r[10]).length();s<0&&(a=-a),Rn.copy(this);const l=1/a,h=1/o,d=1/c;return Rn.elements[0]*=l,Rn.elements[1]*=l,Rn.elements[2]*=l,Rn.elements[4]*=h,Rn.elements[5]*=h,Rn.elements[6]*=h,Rn.elements[8]*=d,Rn.elements[9]*=d,Rn.elements[10]*=d,t.setFromRotationMatrix(Rn),n.x=a,n.y=o,n.z=c,this}makePerspective(e,t,n,r,s,a,o=Gn,c=!1){const l=this.elements,h=2*s/(t-e),d=2*s/(n-r),u=(t+e)/(t-e),p=(n+r)/(n-r);let g,v;if(c)g=s/(a-s),v=a*s/(a-s);else if(o===Gn)g=-(a+s)/(a-s),v=-2*a*s/(a-s);else if(o===ea)g=-a/(a-s),v=-a*s/(a-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return l[0]=h,l[4]=0,l[8]=u,l[12]=0,l[1]=0,l[5]=d,l[9]=p,l[13]=0,l[2]=0,l[6]=0,l[10]=g,l[14]=v,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,n,r,s,a,o=Gn,c=!1){const l=this.elements,h=2/(t-e),d=2/(n-r),u=-(t+e)/(t-e),p=-(n+r)/(n-r);let g,v;if(c)g=1/(a-s),v=a/(a-s);else if(o===Gn)g=-2/(a-s),v=-(a+s)/(a-s);else if(o===ea)g=-1/(a-s),v=-s/(a-s);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return l[0]=h,l[4]=0,l[8]=0,l[12]=u,l[1]=0,l[5]=d,l[9]=0,l[13]=p,l[2]=0,l[6]=0,l[10]=g,l[14]=v,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){const t=this.elements,n=e.elements;for(let r=0;r<16;r++)if(t[r]!==n[r])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}}const qi=new W,Rn=new Pt,Nm=new W(0,0,0),Um=new W(1,1,1),li=new W,ls=new W,hn=new W,_c=new Pt,Mc=new Er;class ki{constructor(e=0,t=0,n=0,r=ki.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=r}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,r=this._order){return this._x=e,this._y=t,this._z=n,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){const r=e.elements,s=r[0],a=r[4],o=r[8],c=r[1],l=r[5],h=r[9],d=r[2],u=r[6],p=r[10];switch(t){case"XYZ":this._y=Math.asin(it(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,p),this._z=Math.atan2(-a,s)):(this._x=Math.atan2(u,l),this._z=0);break;case"YXZ":this._x=Math.asin(-it(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,p),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-d,s),this._z=0);break;case"ZXY":this._x=Math.asin(it(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(-d,p),this._z=Math.atan2(-a,l)):(this._y=0,this._z=Math.atan2(c,s));break;case"ZYX":this._y=Math.asin(-it(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(u,p),this._z=Math.atan2(c,s)):(this._x=0,this._z=Math.atan2(-a,l));break;case"YZX":this._z=Math.asin(it(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-h,l),this._y=Math.atan2(-d,s)):(this._x=0,this._y=Math.atan2(o,p));break;case"XZY":this._z=Math.asin(-it(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(u,l),this._y=Math.atan2(o,s)):(this._x=Math.atan2(-h,p),this._y=0);break;default:Ge("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return _c.makeRotationFromQuaternion(e),this.setFromRotationMatrix(_c,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Mc.setFromEuler(this),this.setFromQuaternion(Mc,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}ki.DEFAULT_ORDER="XYZ";class au{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let Fm=0;const Sc=new W,Ki=new Er,Kn=new Pt,cs=new W,Nr=new W,Om=new W,Bm=new Er,yc=new W(1,0,0),bc=new W(0,1,0),wc=new W(0,0,1),Ec={type:"added"},zm={type:"removed"},$i={type:"childadded",child:null},za={type:"childremoved",child:null};class sn extends Hi{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Fm++}),this.uuid=Qr(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=sn.DEFAULT_UP.clone();const e=new W,t=new ki,n=new Er,r=new W(1,1,1);function s(){n.setFromEuler(t,!1)}function a(){t.setFromQuaternion(n,void 0,!1)}t._onChange(s),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new Pt},normalMatrix:{value:new Ve}}),this.matrix=new Pt,this.matrixWorld=new Pt,this.matrixAutoUpdate=sn.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=sn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new au,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Ki.setFromAxisAngle(e,t),this.quaternion.multiply(Ki),this}rotateOnWorldAxis(e,t){return Ki.setFromAxisAngle(e,t),this.quaternion.premultiply(Ki),this}rotateX(e){return this.rotateOnAxis(yc,e)}rotateY(e){return this.rotateOnAxis(bc,e)}rotateZ(e){return this.rotateOnAxis(wc,e)}translateOnAxis(e,t){return Sc.copy(e).applyQuaternion(this.quaternion),this.position.add(Sc.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(yc,e)}translateY(e){return this.translateOnAxis(bc,e)}translateZ(e){return this.translateOnAxis(wc,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Kn.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?cs.copy(e):cs.set(e,t,n);const r=this.parent;this.updateWorldMatrix(!0,!1),Nr.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Kn.lookAt(Nr,cs,this.up):Kn.lookAt(cs,Nr,this.up),this.quaternion.setFromRotationMatrix(Kn),r&&(Kn.extractRotation(r.matrixWorld),Ki.setFromRotationMatrix(Kn),this.quaternion.premultiply(Ki.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(lt("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Ec),$i.child=e,this.dispatchEvent($i),$i.child=null):lt("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(zm),za.child=e,this.dispatchEvent(za),za.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Kn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Kn.multiply(e.parent.matrixWorld)),e.applyMatrix4(Kn),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Ec),$i.child=e,this.dispatchEvent($i),$i.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,r=this.children.length;n<r;n++){const a=this.children[n].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);const r=this.children;for(let s=0,a=r.length;s<a;s++)r[s].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Nr,e,Om),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Nr,Bm,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}intersectsFrustum(){}traverse(e){e(this);const t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);const e=this.pivot;if(e!==null){const t=e.x,n=e.y,r=e.z,s=this.matrix.elements;s[12]+=t-s[0]*t-s[4]*n-s[8]*r,s[13]+=n-s[1]*t-s[5]*n-s[9]*r,s[14]+=r-s[2]*t-s[6]*n-s[10]*r}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t,n=!1){const r=this.parent;if(e===!0&&r!==null&&r.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||n)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,n=!0),t===!0){const s=this.children;for(let a=0,o=s.length;a<o;a++)s[a].updateWorldMatrix(!1,!0,n)}}toJSON(e){const t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const r={};r.uuid=this.uuid,r.type=this.type,r.name=this.name,r.castShadow=this.castShadow,r.receiveShadow=this.receiveShadow,r.visible=this.visible,r.frustumCulled=this.frustumCulled,r.renderOrder=this.renderOrder,r.static=this.static,r.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.pivot!==null&&(r.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(r.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(r.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),r.instanceInfo=this._instanceInfo.map(o=>({...o})),r.availableInstanceIds=this._availableInstanceIds.slice(),r.availableGeometryIds=this._availableGeometryIds.slice(),r.nextIndexStart=this._nextIndexStart,r.nextVertexStart=this._nextVertexStart,r.geometryCount=this._geometryCount,r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.matricesTexture=this._matricesTexture.toJSON(e),r.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(r.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(r.boundingBox=this.boundingBox.toJSON()));function s(o,c){return o[c.uuid]===void 0&&(o[c.uuid]=c.toJSON(e)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=s(e.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const c=o.shapes;if(Array.isArray(c))for(let l=0,h=c.length;l<h;l++){const d=c[l];s(e.shapes,d)}else s(e.shapes,c)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let c=0,l=this.material.length;c<l;c++)o.push(s(e.materials,this.material[c]));r.material=o}else r.material=s(e.materials,this.material);if(this.children.length>0){r.children=[];for(let o=0;o<this.children.length;o++)r.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let o=0;o<this.animations.length;o++){const c=this.animations[o];r.animations.push(s(e.animations,c))}}if(t){const o=a(e.geometries),c=a(e.materials),l=a(e.textures),h=a(e.images),d=a(e.shapes),u=a(e.skeletons),p=a(e.animations),g=a(e.nodes);o.length>0&&(n.geometries=o),c.length>0&&(n.materials=c),l.length>0&&(n.textures=l),h.length>0&&(n.images=h),d.length>0&&(n.shapes=d),u.length>0&&(n.skeletons=u),p.length>0&&(n.animations=p),g.length>0&&(n.nodes=g)}return n.object=r,n;function a(o){const c=[];for(const l in o){const h=o[l];delete h.metadata,c.push(h)}return c}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot!==null?e.pivot.clone():null,this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){const r=e.children[n];this.add(r.clone())}return this}dispose(){this.dispatchEvent({type:"dispose"})}}sn.DEFAULT_UP=new W(0,1,0);sn.DEFAULT_MATRIX_AUTO_UPDATE=!0;sn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class Wr extends sn{constructor(){super(),this.isGroup=!0,this.type="Group"}}const km={type:"move"};class ka{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Wr,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Wr,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new W,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new W),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Wr,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new W,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new W,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let r=null,s=null,a=null;const o=this._targetRay,c=this._grip,l=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(l&&e.hand){a=!0;for(const v of e.hand.values()){const x=t.getJointPose(v,n),m=this._getHandJoint(l,v);x!==null&&(m.matrix.fromArray(x.transform.matrix),m.matrix.decompose(m.position,m.rotation,m.scale),m.matrixWorldNeedsUpdate=!0,m.jointRadius=x.radius),m.visible=x!==null}const h=l.joints["index-finger-tip"],d=l.joints["thumb-tip"],u=h.position.distanceTo(d.position),p=.02,g=.005;l.inputState.pinching&&u>p+g?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!l.inputState.pinching&&u<=p-g&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else c!==null&&e.gripSpace&&(s=t.getPose(e.gripSpace,n),s!==null&&(c.matrix.fromArray(s.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,s.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(s.linearVelocity)):c.hasLinearVelocity=!1,s.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(s.angularVelocity)):c.hasAngularVelocity=!1,c.eventsEnabled&&c.dispatchEvent({type:"gripUpdated",data:e,target:this})));o!==null&&(r=t.getPose(e.targetRaySpace,n),r===null&&s!==null&&(r=s),r!==null&&(o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,r.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(r.linearVelocity)):o.hasLinearVelocity=!1,r.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(r.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(km)))}return o!==null&&(o.visible=r!==null),c!==null&&(c.visible=s!==null),l!==null&&(l.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const n=new Wr;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}}const ou={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},ci={h:0,s:0,l:0},hs={h:0,s:0,l:0};function Ga(i,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?i+(e-i)*6*t:t<1/2?e:t<2/3?i+(e-i)*6*(2/3-t):i}class et{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){const r=e;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=bn){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,nt.colorSpaceToWorking(this,t),this}setRGB(e,t,n,r=nt.workingColorSpace){return this.r=e,this.g=t,this.b=n,nt.colorSpaceToWorking(this,r),this}setHSL(e,t,n,r=nt.workingColorSpace){if(e=Tm(e,1),t=it(t,0,1),n=it(n,0,1),t===0)this.r=this.g=this.b=n;else{const s=n<=.5?n*(1+t):n+t-n*t,a=2*n-s;this.r=Ga(a,s,e+1/3),this.g=Ga(a,s,e),this.b=Ga(a,s,e-1/3)}return nt.colorSpaceToWorking(this,r),this}setStyle(e,t=bn){function n(s){s!==void 0&&parseFloat(s)<1&&Ge("Color: Alpha component of "+e+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let s;const a=r[1],o=r[2];switch(a){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,t);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,t);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,t);break;default:Ge("Color: Unknown color model "+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){const s=r[1],a=s.length;if(a===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(s,16),t);Ge("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=bn){const n=ou[e.toLowerCase()];return n!==void 0?this.setHex(n,t):Ge("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=ni(e.r),this.g=ni(e.g),this.b=ni(e.b),this}copyLinearToSRGB(e){return this.r=xr(e.r),this.g=xr(e.g),this.b=xr(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=bn){return nt.workingToColorSpace(jt.copy(this),e),Math.round(it(jt.r*255,0,255))*65536+Math.round(it(jt.g*255,0,255))*256+Math.round(it(jt.b*255,0,255))}getHexString(e=bn){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=nt.workingColorSpace){nt.workingToColorSpace(jt.copy(this),t);const n=jt.r,r=jt.g,s=jt.b,a=Math.max(n,r,s),o=Math.min(n,r,s);let c,l;const h=(o+a)/2;if(o===a)c=0,l=0;else{const d=a-o;switch(l=h<=.5?d/(a+o):d/(2-a-o),a){case n:c=(r-s)/d+(r<s?6:0);break;case r:c=(s-n)/d+2;break;case s:c=(n-r)/d+4;break}c/=6}return e.h=c,e.s=l,e.l=h,e}getRGB(e,t=nt.workingColorSpace){return nt.workingToColorSpace(jt.copy(this),t),e.r=jt.r,e.g=jt.g,e.b=jt.b,e}getStyle(e=bn){nt.workingToColorSpace(jt.copy(this),e);const t=jt.r,n=jt.g,r=jt.b;return e!==bn?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(r*255)})`}offsetHSL(e,t,n){return this.getHSL(ci),this.setHSL(ci.h+e,ci.s+t,ci.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(ci),e.getHSL(hs);const n=Na(ci.h,hs.h,t),r=Na(ci.s,hs.s,t),s=Na(ci.l,hs.l,t);return this.setHSL(n,r,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,n=this.g,r=this.b,s=e.elements;return this.r=s[0]*t+s[3]*n+s[6]*r,this.g=s[1]*t+s[4]*n+s[7]*r,this.b=s[2]*t+s[5]*n+s[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const jt=new et;et.NAMES=ou;class Ac extends sn{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new ki,this.environmentIntensity=1,this.environmentRotation=new ki,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),t.object.backgroundBlurriness=this.backgroundBlurriness,t.object.backgroundIntensity=this.backgroundIntensity,t.object.backgroundRotation=this.backgroundRotation.toArray(),t.object.environmentIntensity=this.environmentIntensity,t.object.environmentRotation=this.environmentRotation.toArray(),t}}const Cn=new W,$n=new W,Ha=new W,Zn=new W,Zi=new W,Ji=new W,Tc=new W,Wa=new W,Va=new W,Xa=new W,Ya=new rt,qa=new rt,Ka=new rt;class In{constructor(e=new W,t=new W,n=new W){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,r){r.subVectors(n,t),Cn.subVectors(e,t),r.cross(Cn);const s=r.lengthSq();return s>0?r.multiplyScalar(1/Math.sqrt(s)):r.set(0,0,0)}static getBarycoord(e,t,n,r,s){Cn.subVectors(r,t),$n.subVectors(n,t),Ha.subVectors(e,t);const a=Cn.dot(Cn),o=Cn.dot($n),c=Cn.dot(Ha),l=$n.dot($n),h=$n.dot(Ha),d=a*l-o*o;if(d===0)return s.set(0,0,0),null;const u=1/d,p=(l*c-o*h)*u,g=(a*h-o*c)*u;return s.set(1-p-g,g,p)}static containsPoint(e,t,n,r){return this.getBarycoord(e,t,n,r,Zn)===null?!1:Zn.x>=0&&Zn.y>=0&&Zn.x+Zn.y<=1}static getInterpolation(e,t,n,r,s,a,o,c){return this.getBarycoord(e,t,n,r,Zn)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(s,Zn.x),c.addScaledVector(a,Zn.y),c.addScaledVector(o,Zn.z),c)}static getInterpolatedAttribute(e,t,n,r,s,a){return Ya.setScalar(0),qa.setScalar(0),Ka.setScalar(0),Ya.fromBufferAttribute(e,t),qa.fromBufferAttribute(e,n),Ka.fromBufferAttribute(e,r),a.setScalar(0),a.addScaledVector(Ya,s.x),a.addScaledVector(qa,s.y),a.addScaledVector(Ka,s.z),a}static isFrontFacing(e,t,n,r){return Cn.subVectors(n,t),$n.subVectors(e,t),Cn.cross($n).dot(r)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,r){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,t,n,r){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Cn.subVectors(this.c,this.b),$n.subVectors(this.a,this.b),Cn.cross($n).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return In.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return In.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,r,s){return In.getInterpolation(e,this.a,this.b,this.c,t,n,r,s)}containsPoint(e){return In.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return In.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const n=this.a,r=this.b,s=this.c;let a,o;Zi.subVectors(r,n),Ji.subVectors(s,n),Wa.subVectors(e,n);const c=Zi.dot(Wa),l=Ji.dot(Wa);if(c<=0&&l<=0)return t.copy(n);Va.subVectors(e,r);const h=Zi.dot(Va),d=Ji.dot(Va);if(h>=0&&d<=h)return t.copy(r);const u=c*d-h*l;if(u<=0&&c>=0&&h<=0)return a=c/(c-h),t.copy(n).addScaledVector(Zi,a);Xa.subVectors(e,s);const p=Zi.dot(Xa),g=Ji.dot(Xa);if(g>=0&&p<=g)return t.copy(s);const v=p*l-c*g;if(v<=0&&l>=0&&g<=0)return o=l/(l-g),t.copy(n).addScaledVector(Ji,o);const x=h*g-p*d;if(x<=0&&d-h>=0&&p-g>=0)return Tc.subVectors(s,r),o=(d-h)/(d-h+(p-g)),t.copy(r).addScaledVector(Tc,o);const m=1/(x+v+u);return a=v*m,o=u*m,t.copy(n).addScaledVector(Zi,a).addScaledVector(Ji,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}class Ar{constructor(e=new W(1/0,1/0,1/0),t=new W(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(Ln.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(Ln.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=Ln.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const n=e.geometry;if(n!==void 0){const s=n.getAttribute("position");if(t===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=s.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,Ln):Ln.fromBufferAttribute(s,a),Ln.applyMatrix4(e.matrixWorld),this.expandByPoint(Ln);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),us.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),us.copy(n.boundingBox)),us.applyMatrix4(e.matrixWorld),this.union(us)}const r=e.children;for(let s=0,a=r.length;s<a;s++)this.expandByObject(r[s],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Ln),Ln.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Ur),ds.subVectors(this.max,Ur),Qi.subVectors(e.a,Ur),ji.subVectors(e.b,Ur),er.subVectors(e.c,Ur),hi.subVectors(ji,Qi),ui.subVectors(er,ji),bi.subVectors(Qi,er);let t=[0,-hi.z,hi.y,0,-ui.z,ui.y,0,-bi.z,bi.y,hi.z,0,-hi.x,ui.z,0,-ui.x,bi.z,0,-bi.x,-hi.y,hi.x,0,-ui.y,ui.x,0,-bi.y,bi.x,0];return!$a(t,Qi,ji,er,ds)||(t=[1,0,0,0,1,0,0,0,1],!$a(t,Qi,ji,er,ds))?!1:(fs.crossVectors(hi,ui),t=[fs.x,fs.y,fs.z],$a(t,Qi,ji,er,ds))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Ln).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Ln).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Jn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Jn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Jn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Jn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Jn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Jn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Jn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Jn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Jn),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const Jn=[new W,new W,new W,new W,new W,new W,new W,new W],Ln=new W,us=new Ar,Qi=new W,ji=new W,er=new W,hi=new W,ui=new W,bi=new W,Ur=new W,ds=new W,fs=new W,wi=new W;function $a(i,e,t,n,r){for(let s=0,a=i.length-3;s<=a;s+=3){wi.fromArray(i,s);const o=r.x*Math.abs(wi.x)+r.y*Math.abs(wi.y)+r.z*Math.abs(wi.z),c=e.dot(wi),l=t.dot(wi),h=n.dot(wi);if(Math.max(-Math.max(c,l,h),Math.min(c,l,h))>o)return!1}return!0}const Bt=new W,ps=new He;let Gm=0;class xn extends Hi{constructor(e,t,n=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Gm++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=ym,this.updateRanges=[],this.gpuType=kn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let r=0,s=this.itemSize;r<s;r++)this.array[e+r]=t.array[n+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)ps.fromBufferAttribute(this,t),ps.applyMatrix3(e),this.setXY(t,ps.x,ps.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)Bt.fromBufferAttribute(this,t),Bt.applyMatrix3(e),this.setXYZ(t,Bt.x,Bt.y,Bt.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)Bt.fromBufferAttribute(this,t),Bt.applyMatrix4(e),this.setXYZ(t,Bt.x,Bt.y,Bt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Bt.fromBufferAttribute(this,t),Bt.applyNormalMatrix(e),this.setXYZ(t,Bt.x,Bt.y,Bt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Bt.fromBufferAttribute(this,t),Bt.transformDirection(e),this.setXYZ(t,Bt.x,Bt.y,Bt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=Ir(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=an(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Ir(t,this.array)),t}setX(e,t){return this.normalized&&(t=an(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Ir(t,this.array)),t}setY(e,t){return this.normalized&&(t=an(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Ir(t,this.array)),t}setZ(e,t){return this.normalized&&(t=an(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Ir(t,this.array)),t}setW(e,t){return this.normalized&&(t=an(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=an(t,this.array),n=an(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,r){return e*=this.itemSize,this.normalized&&(t=an(t,this.array),n=an(n,this.array),r=an(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this}setXYZW(e,t,n,r,s){return e*=this.itemSize,this.normalized&&(t=an(t,this.array),n=an(n,this.array),r=an(r,this.array),s=an(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return e.name=this.name,e.usage=this.usage,e.gpuType=this.gpuType,e}dispose(){this.dispatchEvent({type:"dispose"})}}class lu extends xn{constructor(e,t,n){super(new Uint16Array(e),t,n)}}class cu extends xn{constructor(e,t,n){super(new Uint32Array(e),t,n)}}class Lt extends xn{constructor(e,t,n){super(new Float32Array(e),t,n)}}const Hm=new Ar,Fr=new W,Za=new W;class jr{constructor(e=new W,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const n=this.center;t!==void 0?n.copy(t):Hm.setFromPoints(e).getCenter(n);let r=0;for(let s=0,a=e.length;s<a;s++)r=Math.max(r,n.distanceToSquared(e[s]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Fr.subVectors(e,this.center);const t=Fr.lengthSq();if(t>this.radius*this.radius){const n=Math.sqrt(t),r=(n-this.radius)*.5;this.center.addScaledVector(Fr,r/n),this.radius+=r}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Za.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Fr.copy(e.center).add(Za)),this.expandByPoint(Fr.copy(e.center).sub(Za))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}let Wm=0;const yn=new Pt,Ja=new sn,tr=new W,un=new Ar,Or=new Ar,Yt=new W;class Ht extends Hi{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Wm++}),this.uuid=Qr(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(bm(e)?cu:lu)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const s=new Ve().getNormalMatrix(e);n.applyNormalMatrix(s),n.needsUpdate=!0}const r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return yn.makeRotationFromQuaternion(e),this.applyMatrix4(yn),this}rotateX(e){return yn.makeRotationX(e),this.applyMatrix4(yn),this}rotateY(e){return yn.makeRotationY(e),this.applyMatrix4(yn),this}rotateZ(e){return yn.makeRotationZ(e),this.applyMatrix4(yn),this}translate(e,t,n){return yn.makeTranslation(e,t,n),this.applyMatrix4(yn),this}scale(e,t,n){return yn.makeScale(e,t,n),this.applyMatrix4(yn),this}lookAt(e){return Ja.lookAt(e),Ja.updateMatrix(),this.applyMatrix4(Ja.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(tr).negate(),this.translate(tr.x,tr.y,tr.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const n=[];for(let r=0,s=e.length;r<s;r++){const a=e[r];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new Lt(n,3))}else{const n=Math.min(e.length,t.count);for(let r=0;r<n;r++){const s=e[r];t.setXYZ(r,s.x,s.y,s.z||0)}e.length>t.count&&Ge("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Ar);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){lt("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new W(-1/0,-1/0,-1/0),new W(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,r=t.length;n<r;n++){const s=t[n];un.setFromBufferAttribute(s),this.morphTargetsRelative?(Yt.addVectors(this.boundingBox.min,un.min),this.boundingBox.expandByPoint(Yt),Yt.addVectors(this.boundingBox.max,un.max),this.boundingBox.expandByPoint(Yt)):(this.boundingBox.expandByPoint(un.min),this.boundingBox.expandByPoint(un.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&lt('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new jr);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){lt("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new W,1/0);return}if(e){const n=this.boundingSphere.center;if(un.setFromBufferAttribute(e),t)for(let s=0,a=t.length;s<a;s++){const o=t[s];Or.setFromBufferAttribute(o),this.morphTargetsRelative?(Yt.addVectors(un.min,Or.min),un.expandByPoint(Yt),Yt.addVectors(un.max,Or.max),un.expandByPoint(Yt)):(un.expandByPoint(Or.min),un.expandByPoint(Or.max))}un.getCenter(n);let r=0;for(let s=0,a=e.count;s<a;s++)Yt.fromBufferAttribute(e,s),r=Math.max(r,n.distanceToSquared(Yt));if(t)for(let s=0,a=t.length;s<a;s++){const o=t[s],c=this.morphTargetsRelative;for(let l=0,h=o.count;l<h;l++)Yt.fromBufferAttribute(o,l),c&&(tr.fromBufferAttribute(e,l),Yt.add(tr)),r=Math.max(r,n.distanceToSquared(Yt))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&lt('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){lt("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=t.position,r=t.normal,s=t.uv;let a=this.getAttribute("tangent");(a===void 0||a.count!==n.count)&&(a=new xn(new Float32Array(4*n.count),4),this.setAttribute("tangent",a));const o=[],c=[];for(let y=0;y<n.count;y++)o[y]=new W,c[y]=new W;const l=new W,h=new W,d=new W,u=new He,p=new He,g=new He,v=new W,x=new W;function m(y,A,D){l.fromBufferAttribute(n,y),h.fromBufferAttribute(n,A),d.fromBufferAttribute(n,D),u.fromBufferAttribute(s,y),p.fromBufferAttribute(s,A),g.fromBufferAttribute(s,D),h.sub(l),d.sub(l),p.sub(u),g.sub(u);const R=1/(p.x*g.y-g.x*p.y);isFinite(R)&&(v.copy(h).multiplyScalar(g.y).addScaledVector(d,-p.y).multiplyScalar(R),x.copy(d).multiplyScalar(p.x).addScaledVector(h,-g.x).multiplyScalar(R),o[y].add(v),o[A].add(v),o[D].add(v),c[y].add(x),c[A].add(x),c[D].add(x))}let _=this.groups;_.length===0&&(_=[{start:0,count:e.count}]);for(let y=0,A=_.length;y<A;++y){const D=_[y],R=D.start,U=D.count;for(let N=R,P=R+U;N<P;N+=3)m(e.getX(N+0),e.getX(N+1),e.getX(N+2))}const M=new W,S=new W,w=new W,E=new W;function L(y){w.fromBufferAttribute(r,y),E.copy(w);const A=o[y];M.copy(A),M.sub(w.multiplyScalar(w.dot(A))).normalize(),S.crossVectors(E,A);const R=S.dot(c[y])<0?-1:1;a.setXYZW(y,M.x,M.y,M.z,R)}for(let y=0,A=_.length;y<A;++y){const D=_[y],R=D.start,U=D.count;for(let N=R,P=R+U;N<P;N+=3)L(e.getX(N+0)),L(e.getX(N+1)),L(e.getX(N+2))}this._transformed=!0}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0||n.count!==t.count)n=new xn(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let u=0,p=n.count;u<p;u++)n.setXYZ(u,0,0,0);const r=new W,s=new W,a=new W,o=new W,c=new W,l=new W,h=new W,d=new W;if(e)for(let u=0,p=e.count;u<p;u+=3){const g=e.getX(u+0),v=e.getX(u+1),x=e.getX(u+2);r.fromBufferAttribute(t,g),s.fromBufferAttribute(t,v),a.fromBufferAttribute(t,x),h.subVectors(a,s),d.subVectors(r,s),h.cross(d),o.fromBufferAttribute(n,g),c.fromBufferAttribute(n,v),l.fromBufferAttribute(n,x),o.add(h),c.add(h),l.add(h),n.setXYZ(g,o.x,o.y,o.z),n.setXYZ(v,c.x,c.y,c.z),n.setXYZ(x,l.x,l.y,l.z)}else for(let u=0,p=t.count;u<p;u+=3)r.fromBufferAttribute(t,u+0),s.fromBufferAttribute(t,u+1),a.fromBufferAttribute(t,u+2),h.subVectors(a,s),d.subVectors(r,s),h.cross(d),n.setXYZ(u+0,h.x,h.y,h.z),n.setXYZ(u+1,h.x,h.y,h.z),n.setXYZ(u+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)Yt.fromBufferAttribute(e,t),Yt.normalize(),e.setXYZ(t,Yt.x,Yt.y,Yt.z)}toNonIndexed(){function e(o,c){const l=o.array,h=o.itemSize,d=o.normalized,u=new l.constructor(c.length*h);let p=0,g=0;for(let v=0,x=c.length;v<x;v++){o.isInterleavedBufferAttribute?p=c[v]*o.data.stride+o.offset:p=c[v]*h;for(let m=0;m<h;m++)u[g++]=l[p++]}return new xn(u,h,d)}if(this.index===null)return Ge("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new Ht,n=this.index.array,r=this.attributes;for(const o in r){const c=r[o],l=e(c,n);t.setAttribute(o,l)}const s=this.morphAttributes;for(const o in s){const c=[],l=s[o];for(let h=0,d=l.length;h<d;h++){const u=l[h],p=e(u,n);c.push(p)}t.morphAttributes[o]=c}t.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,c=a.length;o<c;o++){const l=a[o];t.addGroup(l.start,l.count,l.materialIndex)}return t}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,e.name=this.name,Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){const c=this.parameters;for(const l in c)c[l]!==void 0&&(e[l]=c[l]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const n=this.attributes;for(const c in n){const l=n[c];e.data.attributes[c]=l.toJSON(e.data)}const r={};let s=!1;for(const c in this.morphAttributes){const l=this.morphAttributes[c],h=[];for(let d=0,u=l.length;d<u;d++){const p=l[d];h.push(p.toJSON(e.data))}h.length>0&&(r[c]=h,s=!0)}s&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const n=e.index;n!==null&&this.setIndex(n.clone());const r=e.attributes;for(const l in r){const h=r[l];this.setAttribute(l,h.clone(t))}const s=e.morphAttributes;for(const l in s){const h=[],d=s[l];for(let u=0,p=d.length;u<p;u++)h.push(d[u].clone(t));this.morphAttributes[l]=h}this.morphTargetsRelative=e.morphTargetsRelative;const a=e.groups;for(let l=0,h=a.length;l<h;l++){const d=a[l];this.addGroup(d.start,d.count,d.materialIndex)}const o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());const c=e.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Qa=new W,Vm=new W,Xm=new Ve;class pi{constructor(e=new W(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,r){return this.normal.set(e,t,n),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){const r=Qa.subVectors(n,t).cross(Vm.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,n=!0){const r=e.delta(Qa),s=this.normal.dot(r);if(s===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const a=-(e.start.dot(this.normal)+this.constant)/s;return n===!0&&(a<0||a>1)?null:t.copy(e.start).addScaledVector(r,a)}intersectsLine(e){const t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const n=t||Xm.getNormalMatrix(e),r=this.coplanarPoint(Qa).applyMatrix4(e),s=this.normal.applyMatrix3(n).normalize();return this.constant=-r.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(e){return this.normal.fromArray(e.normal),this.constant=e.constant,this}}let Ym=0;class Tr extends Hi{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Ym++}),this.uuid=Qr(),this.name="",this.type="Material",this.blending=pr,this.side=Oi,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=bl,this.blendDst=wl,this.blendEquation=lr,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new et(0,0,0),this.blendAlpha=0,this.depthFunc=Yr,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=mm,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Da,this.stencilZFail=Da,this.stencilZPass=Da,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const n=e[t];if(n===void 0){Ge(`Material: parameter '${t}' has value of undefined.`);continue}const r=this[t];if(r===void 0){Ge(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(n):r&&r.isVector2&&n&&n.isVector2||r&&r.isEuler&&n&&n.isEuler||r&&r.isVector3&&n&&n.isVector3?r.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,n.blending=this.blending,n.side=this.side,n.shadowSide=this.shadowSide,n.vertexColors=this.vertexColors,n.opacity=this.opacity,n.transparent=this.transparent,n.blendSrc=this.blendSrc,n.blendDst=this.blendDst,n.blendEquation=this.blendEquation,n.blendSrcAlpha=this.blendSrcAlpha,n.blendDstAlpha=this.blendDstAlpha,n.blendEquationAlpha=this.blendEquationAlpha,n.blendColor=this.blendColor.getHex(),n.blendAlpha=this.blendAlpha,n.depthFunc=this.depthFunc,n.depthTest=this.depthTest,n.depthWrite=this.depthWrite,n.colorWrite=this.colorWrite,n.clipIntersection=this.clipIntersection,n.clipShadows=this.clipShadows,n.stencilWriteMask=this.stencilWriteMask,n.stencilFunc=this.stencilFunc,n.stencilRef=this.stencilRef,n.stencilFuncMask=this.stencilFuncMask,n.stencilFail=this.stencilFail,n.stencilZFail=this.stencilZFail,n.stencilZPass=this.stencilZPass,n.stencilWrite=this.stencilWrite,n.polygonOffset=this.polygonOffset,n.polygonOffsetFactor=this.polygonOffsetFactor,n.polygonOffsetUnits=this.polygonOffsetUnits,n.dithering=this.dithering,n.alphaTest=this.alphaTest,n.alphaHash=this.alphaHash,n.alphaToCoverage=this.alphaToCoverage,n.premultipliedAlpha=this.premultipliedAlpha,n.forceSinglePass=this.forceSinglePass,n.allowOverride=this.allowOverride,n.visible=this.visible,n.toneMapped=this.toneMapped,n.name=this.name,this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(n.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(n.clippingPlanes=this.clippingPlanes.map(s=>s.toJSON())),this.rotation!==void 0&&(n.rotation=this.rotation),this.depthPacking!==void 0&&(n.depthPacking=this.depthPacking),this.linewidth!==void 0&&(n.linewidth=this.linewidth),this.linecap!==void 0&&(n.linecap=this.linecap),this.linejoin!==void 0&&(n.linejoin=this.linejoin),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.wireframe!==void 0&&(n.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(n.flatShading=this.flatShading),this.fog!==void 0&&(n.fog=this.fog),Object.keys(this.userData).length>0&&(n.userData=this.userData);function r(s){const a=[];for(const o in s){const c=s[o];delete c.metadata,a.push(c)}return a}if(t){const s=r(e.textures),a=r(e.images);s.length>0&&(n.textures=s),a.length>0&&(n.images=a)}return n}fromJSON(e,t){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new et().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.retroreflectivity!==void 0&&(this.retroreflectivity=e.retroreflectivity),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=e.iridescenceThicknessRange),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.clippingPlanes!==void 0&&(this.clippingPlanes=e.clippingPlanes.map(n=>new pi().fromJSON(n))),e.clipIntersection!==void 0&&(this.clipIntersection=e.clipIntersection),e.clipShadows!==void 0&&(this.clipShadows=e.clipShadows),e.depthPacking!==void 0&&(this.depthPacking=e.depthPacking),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.linecap!==void 0&&(this.linecap=e.linecap),e.linejoin!==void 0&&(this.linejoin=e.linejoin),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(typeof e.vertexColors=="number"?this.vertexColors=e.vertexColors>0:this.vertexColors=e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=t[e.map]||null),e.matcap!==void 0&&(this.matcap=t[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=t[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=t[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=t[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let n=e.normalScale;Array.isArray(n)===!1&&(n=[n,n]),this.normalScale=new He().fromArray(n)}return e.displacementMap!==void 0&&(this.displacementMap=t[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=t[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=t[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=t[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=t[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=t[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=t[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=t[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=t[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=t[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=t[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=t[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=t[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=t[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new He().fromArray(e.clearcoatNormalScale)),e.iridescenceMap!==void 0&&(this.iridescenceMap=t[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=t[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=t[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=t[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=t[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=t[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=t[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let n=null;if(t!==null){const r=t.length;n=new Array(r);for(let s=0;s!==r;++s)n[s]=t[s].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}const Qn=new W,ja=new W,ms=new W,gs=new W;class Nl{constructor(e=new W,t=new W(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Qn)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=Qn.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Qn.copy(this.origin).addScaledVector(this.direction,t),Qn.distanceToSquared(e))}distanceSqToSegment(e,t,n,r){ja.copy(e).add(t).multiplyScalar(.5),ms.copy(t).sub(e).normalize(),gs.copy(this.origin).sub(ja);const s=e.distanceTo(t)*.5,a=-this.direction.dot(ms),o=gs.dot(this.direction),c=-gs.dot(ms),l=gs.lengthSq(),h=Math.abs(1-a*a);let d,u,p,g;if(h>0)if(d=a*c-o,u=a*o-c,g=s*h,d>=0)if(u>=-g)if(u<=g){const v=1/h;d*=v,u*=v,p=d*(d+a*u+2*o)+u*(a*d+u+2*c)+l}else u=s,d=Math.max(0,-(a*u+o)),p=-d*d+u*(u+2*c)+l;else u=-s,d=Math.max(0,-(a*u+o)),p=-d*d+u*(u+2*c)+l;else u<=-g?(d=Math.max(0,-(-a*s+o)),u=d>0?-s:Math.min(Math.max(-s,-c),s),p=-d*d+u*(u+2*c)+l):u<=g?(d=0,u=Math.min(Math.max(-s,-c),s),p=u*(u+2*c)+l):(d=Math.max(0,-(a*s+o)),u=d>0?s:Math.min(Math.max(-s,-c),s),p=-d*d+u*(u+2*c)+l);else u=a>0?-s:s,d=Math.max(0,-(a*u+o)),p=-d*d+u*(u+2*c)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,d),r&&r.copy(ja).addScaledVector(ms,u),p}intersectSphere(e,t){if(e.radius<0)return null;Qn.subVectors(e.center,this.origin);const n=Qn.dot(this.direction),r=Qn.dot(Qn)-n*n,s=e.radius*e.radius;if(r>s)return null;const a=Math.sqrt(s-r),o=n-a,c=n+a;return c<0?null:o<0?this.at(c,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){const n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,r,s,a,o,c;const l=1/this.direction.x,h=1/this.direction.y,d=1/this.direction.z,u=this.origin;return l>=0?(n=(e.min.x-u.x)*l,r=(e.max.x-u.x)*l):(n=(e.max.x-u.x)*l,r=(e.min.x-u.x)*l),h>=0?(s=(e.min.y-u.y)*h,a=(e.max.y-u.y)*h):(s=(e.max.y-u.y)*h,a=(e.min.y-u.y)*h),n>a||s>r||((s>n||isNaN(n))&&(n=s),(a<r||isNaN(r))&&(r=a),d>=0?(o=(e.min.z-u.z)*d,c=(e.max.z-u.z)*d):(o=(e.max.z-u.z)*d,c=(e.min.z-u.z)*d),n>c||o>r)||((o>n||n!==n)&&(n=o),(c<r||r!==r)&&(r=c),r<0)?null:this.at(n>=0?n:r,t)}intersectsBox(e){return this.intersectBox(e,Qn)!==null}intersectTriangle(e,t,n,r,s){const a=this.origin,o=this.direction,c=o.x,l=o.y,h=o.z,d=e.x-a.x,u=e.y-a.y,p=e.z-a.z,g=t.x-a.x,v=t.y-a.y,x=t.z-a.z,m=n.x-a.x,_=n.y-a.y,M=n.z-a.z,S=Math.abs(c),w=Math.abs(l),E=Math.abs(h);let L,y,A,D,R,U,N,P,F,O,V,Q;if(S>=w&&S>=E?(A=c,U=d,F=g,Q=m,c>=0?(L=l,y=h,D=u,R=p,N=v,P=x,O=_,V=M):(L=h,y=l,D=p,R=u,N=x,P=v,O=M,V=_)):w>=E?(A=l,U=u,F=v,Q=_,l>=0?(L=h,y=c,D=p,R=d,N=x,P=g,O=M,V=m):(L=c,y=h,D=d,R=p,N=g,P=x,O=m,V=M)):(A=h,U=p,F=x,Q=M,h>=0?(L=c,y=l,D=d,R=u,N=g,P=v,O=m,V=_):(L=l,y=c,D=u,R=d,N=v,P=g,O=_,V=m)),A===0)return null;const X=L/A,te=y/A,B=1/A,ne=D-X*U,le=R-te*U,_e=N-X*F,Ie=P-te*F,ke=O-X*Q,ee=V-te*Q,se=ke*Ie-ee*_e,Y=ne*ee-le*ke,he=_e*le-Ie*ne;if(r){if(se<0||Y<0||he<0)return null}else if((se<0||Y<0||he<0)&&(se>0||Y>0||he>0))return null;const ae=se+Y+he;if(ae===0)return null;const Ee=B*(se*U+Y*F+he*Q);return(ae>0?Ee<0:Ee>0)?null:this.at(Ee/ae,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class hu extends Tr{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new et(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new ki,this.combine=Hh,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const Rc=new Pt,Ei=new Nl,xs=new jr,Cc=new W,vs=new W,_s=new W,Ms=new W,eo=new W,Ss=new W,Lc=new W,ys=new W;class Gt extends sn{constructor(e=new Ht,t=new hu){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const r=t[n[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=r.length;s<a;s++){const o=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}getVertexPosition(e,t){const n=this.geometry,r=n.attributes.position,s=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(r,e);const o=this.morphTargetInfluences;if(s&&o){Ss.set(0,0,0);for(let c=0,l=s.length;c<l;c++){const h=o[c],d=s[c];h!==0&&(eo.fromBufferAttribute(d,e),a?Ss.addScaledVector(eo,h):Ss.addScaledVector(eo.sub(t),h))}t.add(Ss)}return t}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){const n=this.geometry,r=this.material,s=this.matrixWorld;r!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),xs.copy(n.boundingSphere),xs.applyMatrix4(s),Ei.copy(e.ray).recast(e.near),!(xs.containsPoint(Ei.origin)===!1&&(Ei.intersectSphere(xs,Cc)===null||Ei.origin.distanceToSquared(Cc)>(e.far-e.near)**2))&&(Rc.copy(s).invert(),Ei.copy(e.ray).applyMatrix4(Rc),!(n.boundingBox!==null&&Ei.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,Ei)))}_computeIntersections(e,t,n){let r;const s=this.geometry,a=this.material,o=s.index,c=s.attributes.position,l=s.attributes.uv,h=s.attributes.uv1,d=s.attributes.normal,u=s.groups,p=s.drawRange;if(o!==null)if(Array.isArray(a))for(let g=0,v=u.length;g<v;g++){const x=u[g],m=a[x.materialIndex],_=Math.max(x.start,p.start),M=Math.min(o.count,Math.min(x.start+x.count,p.start+p.count));for(let S=_,w=M;S<w;S+=3){const E=o.getX(S),L=o.getX(S+1),y=o.getX(S+2);r=bs(this,m,e,n,l,h,d,E,L,y),r&&(r.faceIndex=Math.floor(S/3),r.face.materialIndex=x.materialIndex,t.push(r))}}else{const g=Math.max(0,p.start),v=Math.min(o.count,p.start+p.count);for(let x=g,m=v;x<m;x+=3){const _=o.getX(x),M=o.getX(x+1),S=o.getX(x+2);r=bs(this,a,e,n,l,h,d,_,M,S),r&&(r.faceIndex=Math.floor(x/3),t.push(r))}}else if(c!==void 0)if(Array.isArray(a))for(let g=0,v=u.length;g<v;g++){const x=u[g],m=a[x.materialIndex],_=Math.max(x.start,p.start),M=Math.min(c.count,Math.min(x.start+x.count,p.start+p.count));for(let S=_,w=M;S<w;S+=3){const E=S,L=S+1,y=S+2;r=bs(this,m,e,n,l,h,d,E,L,y),r&&(r.faceIndex=Math.floor(S/3),r.face.materialIndex=x.materialIndex,t.push(r))}}else{const g=Math.max(0,p.start),v=Math.min(c.count,p.start+p.count);for(let x=g,m=v;x<m;x+=3){const _=x,M=x+1,S=x+2;r=bs(this,a,e,n,l,h,d,_,M,S),r&&(r.faceIndex=Math.floor(x/3),t.push(r))}}}}function qm(i,e,t,n,r,s,a,o){let c;if(e.side===on?c=n.intersectTriangle(a,s,r,!0,o):c=n.intersectTriangle(r,s,a,e.side===Oi,o),c===null)return null;ys.copy(o),ys.applyMatrix4(i.matrixWorld);const l=t.ray.origin.distanceTo(ys);return l<t.near||l>t.far?null:{distance:l,point:ys.clone(),object:i}}function bs(i,e,t,n,r,s,a,o,c,l){i.getVertexPosition(o,vs),i.getVertexPosition(c,_s),i.getVertexPosition(l,Ms);const h=qm(i,e,t,n,vs,_s,Ms,Lc);if(h){const d=new W;In.getBarycoord(Lc,vs,_s,Ms,d),r&&(h.uv=In.getInterpolatedAttribute(r,o,c,l,d,new He)),s&&(h.uv1=In.getInterpolatedAttribute(s,o,c,l,d,new He)),a&&(h.normal=In.getInterpolatedAttribute(a,o,c,l,d,new W),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));const u={a:o,b:c,c:l,normal:new W,materialIndex:0};In.getNormal(vs,_s,Ms,u.normal),h.face=u,h.barycoord=d}return h}class hr extends tn{constructor(e=null,t=1,n=1,r,s,a,o,c,l=Ut,h=Ut,d,u){super(null,a,o,c,l,h,r,s,d,u),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Ul extends xn{constructor(e,t,n,r=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=r}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const Ai=new jr,Km=new He(.5,.5),ws=new W;class na{constructor(e=new pi,t=new pi,n=new pi,r=new pi,s=new pi,a=new pi){this.planes=[e,t,n,r,s,a]}set(e,t,n,r,s,a){const o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(r),o[4].copy(s),o[5].copy(a),this}copy(e){const t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=Gn,n=!1){const r=this.planes,s=e.elements,a=s[0],o=s[1],c=s[2],l=s[3],h=s[4],d=s[5],u=s[6],p=s[7],g=s[8],v=s[9],x=s[10],m=s[11],_=s[12],M=s[13],S=s[14],w=s[15];if(r[0].setComponents(l-a,p-h,m-g,w-_).normalize(),r[1].setComponents(l+a,p+h,m+g,w+_).normalize(),r[2].setComponents(l+o,p+d,m+v,w+M).normalize(),r[3].setComponents(l-o,p-d,m-v,w-M).normalize(),n)r[4].setComponents(c,u,x,S).normalize(),r[5].setComponents(l-c,p-u,m-x,w-S).normalize();else if(r[4].setComponents(l-c,p-u,m-x,w-S).normalize(),t===Gn)r[5].setComponents(l+c,p+u,m+x,w+S).normalize();else if(t===ea)r[5].setComponents(c,u,x,S).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Ai.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Ai.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Ai)}intersectsSprite(e){Ai.center.set(0,0,0);const t=Km.distanceTo(e.center);return Ai.radius=.7071067811865476+t,Ai.applyMatrix4(e.matrixWorld),this.intersectsSphere(Ai)}intersectsSphere(e){const t=this.planes,n=e.center,r=-e.radius;for(let s=0;s<6;s++)if(t[s].distanceToPoint(n)<r)return!1;return!0}intersectsBox(e){const t=this.planes;for(let n=0;n<6;n++){const r=t[n];if(ws.x=r.normal.x>0?e.max.x:e.min.x,ws.y=r.normal.y>0?e.max.y:e.min.y,ws.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(ws)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class uu extends Tr{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new et(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const ia=new W,ra=new W,Pc=new Pt,Br=new Nl,Es=new jr,to=new W,Dc=new W;class $m extends sn{constructor(e=new Ht,t=new uu){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[0];for(let r=1,s=t.count;r<s;r++)ia.fromBufferAttribute(t,r-1),ra.fromBufferAttribute(t,r),n[r]=n[r-1],n[r]+=ia.distanceTo(ra);e.setAttribute("lineDistance",new Lt(n,1))}else Ge("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){const n=this.geometry,r=this.matrixWorld,s=e.params.Line.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Es.copy(n.boundingSphere),Es.applyMatrix4(r),Es.radius+=s,e.ray.intersectsSphere(Es)===!1)return;Pc.copy(r).invert(),Br.copy(e.ray).applyMatrix4(Pc);const o=s/((this.scale.x+this.scale.y+this.scale.z)/3),c=o*o,l=this.isLineSegments?2:1,h=n.index,u=n.attributes.position;if(h!==null){const p=Math.max(0,a.start),g=Math.min(h.count,a.start+a.count);for(let v=p,x=g-1;v<x;v+=l){const m=h.getX(v),_=h.getX(v+1),M=As(this,e,Br,c,m,_,v);M&&t.push(M)}if(this.isLineLoop){const v=h.getX(g-1),x=h.getX(p),m=As(this,e,Br,c,v,x,g-1);m&&t.push(m)}}else{const p=Math.max(0,a.start),g=Math.min(u.count,a.start+a.count);for(let v=p,x=g-1;v<x;v+=l){const m=As(this,e,Br,c,v,v+1,v);m&&t.push(m)}if(this.isLineLoop){const v=As(this,e,Br,c,g-1,p,g-1);v&&t.push(v)}}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const r=t[n[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=r.length;s<a;s++){const o=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}}function As(i,e,t,n,r,s,a){const o=i.geometry.attributes.position;if(ia.fromBufferAttribute(o,r),ra.fromBufferAttribute(o,s),t.distanceSqToSegment(ia,ra,to,Dc)>n)return;to.applyMatrix4(i.matrixWorld);const l=e.ray.origin.distanceTo(to);if(!(l<e.near||l>e.far))return{distance:l,point:Dc.clone().applyMatrix4(i.matrixWorld),index:a,face:null,faceIndex:null,barycoord:null,object:i}}const Ic=new W,Nc=new W;class Fl extends $m{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[];for(let r=0,s=t.count;r<s;r+=2)Ic.fromBufferAttribute(t,r),Nc.fromBufferAttribute(t,r+1),n[r]=r===0?0:n[r-1],n[r+1]=n[r]+Ic.distanceTo(Nc);e.setAttribute("lineDistance",new Lt(n,1))}else Ge("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class Zm extends Tr{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new et(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const Uc=new Pt,sl=new Nl,Ts=new jr,Rs=new W;class sa extends sn{constructor(e=new Ht,t=new Zm){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){const n=this.geometry,r=this.matrixWorld,s=e.params.Points.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Ts.copy(n.boundingSphere),Ts.applyMatrix4(r),Ts.radius+=s,e.ray.intersectsSphere(Ts)===!1)return;Uc.copy(r).invert(),sl.copy(e.ray).applyMatrix4(Uc);const o=s/((this.scale.x+this.scale.y+this.scale.z)/3),c=o*o,l=n.index,d=n.attributes.position;if(l!==null){const u=Math.max(0,a.start),p=Math.min(l.count,a.start+a.count);for(let g=u,v=p;g<v;g++){const x=l.getX(g);Rs.fromBufferAttribute(d,x),Fc(Rs,x,c,r,e,t,this)}}else{const u=Math.max(0,a.start),p=Math.min(d.count,a.start+a.count);for(let g=u,v=p;g<v;g++)Rs.fromBufferAttribute(d,g),Fc(Rs,g,c,r,e,t,this)}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const r=t[n[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=r.length;s<a;s++){const o=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}}function Fc(i,e,t,n,r,s,a){const o=sl.distanceSqToPoint(i);if(o<t){const c=new W;sl.closestPointToPoint(i,c),c.applyMatrix4(n);const l=r.ray.origin.distanceTo(c);if(l<r.near||l>r.far)return;s.push({distance:l,distanceToRay:Math.sqrt(o),point:c,index:e,face:null,faceIndex:null,barycoord:null,object:a})}}class du extends tn{constructor(e=[],t=Bi,n,r,s,a,o,c,l,h){super(e,t,n,r,s,a,o,c,l,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class Jm extends tn{constructor(e,t,n,r,s,a,o,c,l){super(e,t,n,r,s,a,o,c,l),this.isCanvasTexture=!0,this.needsUpdate=!0}}class br extends tn{constructor(e,t,n=Vn,r,s,a,o=Ut,c=Ut,l,h=ii,d=1){if(h!==ii&&h!==Ii)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const u={width:e,height:t,depth:d};super(u,r,s,a,o,c,h,n,l),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new Il(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return t.compareFunction=this.compareFunction,t}}class Qm extends br{constructor(e,t=Vn,n=Bi,r,s,a=Ut,o=Ut,c,l=ii){const h={width:e,height:e,depth:1},d=[h,h,h,h,h,h];super(e,e,t,n,r,s,a,o,c,l),this.image=d,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}}class fu extends tn{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}}class es extends Ht{constructor(e=1,t=1,n=1,r=1,s=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:r,heightSegments:s,depthSegments:a};const o=this;r=Math.floor(r),s=Math.floor(s),a=Math.floor(a);const c=[],l=[],h=[],d=[];let u=0,p=0;g("z","y","x",-1,-1,n,t,e,a,s,0),g("z","y","x",1,-1,n,t,-e,a,s,1),g("x","z","y",1,1,e,n,t,r,a,2),g("x","z","y",1,-1,e,n,-t,r,a,3),g("x","y","z",1,-1,e,t,n,r,s,4),g("x","y","z",-1,-1,e,t,-n,r,s,5),this.setIndex(c),this.setAttribute("position",new Lt(l,3)),this.setAttribute("normal",new Lt(h,3)),this.setAttribute("uv",new Lt(d,2));function g(v,x,m,_,M,S,w,E,L,y,A){const D=S/L,R=w/y,U=S/2,N=w/2,P=E/2,F=L+1,O=y+1;let V=0,Q=0;const X=new W;for(let te=0;te<O;te++){const B=te*R-N;for(let ne=0;ne<F;ne++){const le=ne*D-U;X[v]=le*_,X[x]=B*M,X[m]=P,l.push(X.x,X.y,X.z),X[v]=0,X[x]=0,X[m]=E>0?1:-1,h.push(X.x,X.y,X.z),d.push(ne/L),d.push(1-te/y),V+=1}}for(let te=0;te<y;te++)for(let B=0;B<L;B++){const ne=u+B+F*te,le=u+B+F*(te+1),_e=u+(B+1)+F*(te+1),Ie=u+(B+1)+F*te;c.push(ne,le,Ie),c.push(le,_e,Ie),Q+=6}o.addGroup(p,Q,A),p+=Q,u+=V}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new es(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}class _n extends Ht{constructor(e=1,t=1,n=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:r};const s=e/2,a=t/2,o=Math.floor(n),c=Math.floor(r),l=o+1,h=c+1,d=e/o,u=t/c,p=[],g=[],v=[],x=[];for(let m=0;m<h;m++){const _=m*u-a;for(let M=0;M<l;M++){const S=M*d-s;g.push(S,-_,0),v.push(0,0,1),x.push(M/o),x.push(1-m/c)}}for(let m=0;m<c;m++)for(let _=0;_<o;_++){const M=_+l*m,S=_+l*(m+1),w=_+1+l*(m+1),E=_+1+l*m;p.push(M,S,E),p.push(S,w,E)}this.setIndex(p),this.setAttribute("position",new Lt(g,3)),this.setAttribute("normal",new Lt(v,3)),this.setAttribute("uv",new Lt(x,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new _n(e.width,e.height,e.widthSegments,e.heightSegments)}}function wr(i){const e={};for(const t in i){e[t]={};for(const n in i[t]){const r=i[t][n];if(Oc(r))r.isRenderTargetTexture?(Ge("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=r.clone();else if(Array.isArray(r))if(Oc(r[0])){const s=[];for(let a=0,o=r.length;a<o;a++)s[a]=r[a].clone();e[t][n]=s}else e[t][n]=r.slice();else e[t][n]=r}}return e}function rn(i){const e={};for(let t=0;t<i.length;t++){const n=wr(i[t]);for(const r in n)e[r]=n[r]}return e}function Oc(i){return i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)}function jm(i){const e=[];for(let t=0;t<i.length;t++)e.push(i[t].clone());return e}function pu(i){const e=i.getRenderTarget();return e===null?i.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:nt.workingColorSpace}const eg={clone:wr,merge:rn};var tg=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,ng=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Mt extends Tr{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=tg,this.fragmentShader=ng,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=wr(e.uniforms),this.uniformsGroups=jm(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const r in this.uniforms){const a=this.uniforms[r].value;a&&a.isTexture?t.uniforms[r]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[r]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[r]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[r]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[r]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[r]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[r]={type:"m4",value:a.toArray()}:t.uniforms[r]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const n={};for(const r in this.extensions)this.extensions[r]===!0&&(n[r]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}fromJSON(e,t){if(super.fromJSON(e,t),e.uniforms!==void 0)for(const n in e.uniforms){const r=e.uniforms[n];switch(this.uniforms[n]={},r.type){case"t":this.uniforms[n].value=t[r.value]||null;break;case"c":this.uniforms[n].value=new et().setHex(r.value);break;case"v2":this.uniforms[n].value=new He().fromArray(r.value);break;case"v3":this.uniforms[n].value=new W().fromArray(r.value);break;case"v4":this.uniforms[n].value=new rt().fromArray(r.value);break;case"m3":this.uniforms[n].value=new Ve().fromArray(r.value);break;case"m4":this.uniforms[n].value=new Pt().fromArray(r.value);break;default:this.uniforms[n].value=r.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(const n in e.extensions)this.extensions[n]=e.extensions[n];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}}class ig extends Mt{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class rg extends Tr{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=fm,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class sg extends Tr{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const Cs=new W,Ls=new Er,On=new W;class mu extends sn{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Pt,this.projectionMatrix=new Pt,this.projectionMatrixInverse=new Pt,this.coordinateSystem=Gn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(Cs,Ls,On),On.x===1&&On.y===1&&On.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Cs,Ls,On.set(1,1,1)).invert()}updateWorldMatrix(e,t,n=!1){super.updateWorldMatrix(e,t,n),this.matrixWorld.decompose(Cs,Ls,On),On.x===1&&On.y===1&&On.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Cs,Ls,On.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}const di=new W,Bc=new He,zc=new He;class dn extends mu{constructor(e=50,t=1,n=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=rl*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(Ia*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return rl*2*Math.atan(Math.tan(Ia*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){di.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(di.x,di.y).multiplyScalar(-e/di.z),di.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(di.x,di.y).multiplyScalar(-e/di.z)}getViewSize(e,t){return this.getViewBounds(e,Bc,zc),t.subVectors(zc,Bc)}setViewOffset(e,t,n,r,s,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(Ia*.5*this.fov)/this.zoom,n=2*t,r=this.aspect*n,s=-.5*r;const a=this.view;if(this.view!==null&&this.view.enabled){const c=a.fullWidth,l=a.fullHeight;s+=a.offsetX*r/c,t-=a.offsetY*n/l,r*=a.width/c,n*=a.height/l}const o=this.filmOffset;o!==0&&(s+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+r,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}class Ol extends mu{constructor(e=-1,t=1,n=1,r=-1,s=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=r,this.near=s,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,r,s,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,r=(this.top+this.bottom)/2;let s=n-e,a=n+e,o=r+t,c=r-t;if(this.view!==null&&this.view.enabled){const l=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=l*this.view.offsetX,a=s+l*this.view.width,o-=h*this.view.offsetY,c=o-h*this.view.height}this.projectionMatrix.makeOrthographic(s,a,o,c,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}class Bl extends Ht{constructor(){super(),this.isInstancedBufferGeometry=!0,this.type="InstancedBufferGeometry",this.instanceCount=1/0}copy(e){return super.copy(e),this.instanceCount=e.instanceCount,this}toJSON(){const e=super.toJSON();return e.instanceCount=this.instanceCount,e.isInstancedBufferGeometry=!0,e}}const nr=-90,ir=1;class ag extends sn{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const r=new dn(nr,ir,e,t);r.layers=this.layers,this.add(r);const s=new dn(nr,ir,e,t);s.layers=this.layers,this.add(s);const a=new dn(nr,ir,e,t);a.layers=this.layers,this.add(a);const o=new dn(nr,ir,e,t);o.layers=this.layers,this.add(o);const c=new dn(nr,ir,e,t);c.layers=this.layers,this.add(c);const l=new dn(nr,ir,e,t);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[n,r,s,a,o,c]=t;for(const l of t)this.remove(l);if(e===Gn)n.up.set(0,1,0),n.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(e===ea)n.up.set(0,-1,0),n.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const l of t)this.add(l),l.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[s,a,o,c,l,h]=this.children,d=e.getRenderTarget(),u=e.getActiveCubeFace(),p=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;const v=n.texture.generateMipmaps;n.texture.generateMipmaps=!1;let x=!1;e.isWebGLRenderer===!0?x=e.state.buffers.depth.getReversed():x=e.reversedDepthBuffer,e.setRenderTarget(n,0,r),x&&e.autoClear===!1&&e.clearDepth(),e.render(t,s),e.setRenderTarget(n,1,r),x&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(n,2,r),x&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(n,3,r),x&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),e.setRenderTarget(n,4,r),x&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),n.texture.generateMipmaps=v,e.setRenderTarget(n,5,r),x&&e.autoClear===!1&&e.clearDepth(),e.render(t,h),e.setRenderTarget(d,u,p),e.xr.enabled=g,n.texture.needsPMREMUpdate=!0}}class og extends dn{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}class gu{static{gu.prototype.isMatrix2=!0}constructor(e,t,n,r){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,n,r)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let n=0;n<4;n++)this.elements[n]=e[n+t];return this}set(e,t,n,r){const s=this.elements;return s[0]=e,s[2]=t,s[1]=n,s[3]=r,this}}function kc(i,e,t,n){const r=lg(n);switch(t){case tu:return i*e;case iu:return i*e/r.components*r.byteLength;case Rl:return i*e/r.components*r.byteLength;case zi:return i*e*2/r.components*r.byteLength;case Cl:return i*e*2/r.components*r.byteLength;case nu:return i*e*3/r.components*r.byteLength;case pn:return i*e*4/r.components*r.byteLength;case Ll:return i*e*4/r.components*r.byteLength;case Gs:case Hs:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case Ws:case Vs:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case Co:case Po:return Math.max(i,16)*Math.max(e,8)/4;case Ro:case Lo:return Math.max(i,8)*Math.max(e,8)/2;case Do:case Io:case Uo:case Fo:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case No:case Js:case Oo:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case Bo:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case zo:return Math.floor((i+4)/5)*Math.floor((e+3)/4)*16;case ko:return Math.floor((i+4)/5)*Math.floor((e+4)/5)*16;case Go:return Math.floor((i+5)/6)*Math.floor((e+4)/5)*16;case Ho:return Math.floor((i+5)/6)*Math.floor((e+5)/6)*16;case Wo:return Math.floor((i+7)/8)*Math.floor((e+4)/5)*16;case Vo:return Math.floor((i+7)/8)*Math.floor((e+5)/6)*16;case Xo:return Math.floor((i+7)/8)*Math.floor((e+7)/8)*16;case Yo:return Math.floor((i+9)/10)*Math.floor((e+4)/5)*16;case qo:return Math.floor((i+9)/10)*Math.floor((e+5)/6)*16;case Ko:return Math.floor((i+9)/10)*Math.floor((e+7)/8)*16;case $o:return Math.floor((i+9)/10)*Math.floor((e+9)/10)*16;case Zo:return Math.floor((i+11)/12)*Math.floor((e+9)/10)*16;case Jo:return Math.floor((i+11)/12)*Math.floor((e+11)/12)*16;case Qo:case jo:case el:return Math.ceil(i/4)*Math.ceil(e/4)*16;case tl:case nl:return Math.ceil(i/4)*Math.ceil(e/4)*8;case Qs:case il:return Math.ceil(i/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function lg(i){switch(i){case fn:case Jh:return{byteLength:1,components:1};case qr:case Qh:case Xn:return{byteLength:2,components:1};case Al:case Tl:return{byteLength:2,components:4};case Vn:case El:case kn:return{byteLength:4,components:1};case jh:case eu:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Ml}}));typeof window<"u"&&(window.__THREE__?Ge("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Ml);function xu(){let i=null,e=!1,t=null,n=null;function r(s,a){n=i.requestAnimationFrame(r),t(s,a)}return{start:function(){e!==!0&&t!==null&&i!==null&&(n=i.requestAnimationFrame(r),e=!0)},stop:function(){i!==null&&i.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(s){t=s},setContext:function(s){i=s}}}function cg(i){const e=new WeakMap;function t(o,c){const l=o.array,h=o.usage,d=l.byteLength,u=i.createBuffer();i.bindBuffer(c,u),i.bufferData(c,l,h),o.onUploadCallback();let p;if(l instanceof Float32Array)p=i.FLOAT;else if(typeof Float16Array<"u"&&l instanceof Float16Array)p=i.HALF_FLOAT;else if(l instanceof Uint16Array)o.isFloat16BufferAttribute?p=i.HALF_FLOAT:p=i.UNSIGNED_SHORT;else if(l instanceof Int16Array)p=i.SHORT;else if(l instanceof Uint32Array)p=i.UNSIGNED_INT;else if(l instanceof Int32Array)p=i.INT;else if(l instanceof Int8Array)p=i.BYTE;else if(l instanceof Uint8Array)p=i.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)p=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:u,type:p,bytesPerElement:l.BYTES_PER_ELEMENT,version:o.version,size:d}}function n(o,c,l){const h=c.array,d=c.updateRanges;if(i.bindBuffer(l,o),d.length===0)i.bufferSubData(l,0,h);else{d.sort((p,g)=>p.start-g.start);let u=0;for(let p=1;p<d.length;p++){const g=d[u],v=d[p];v.start<=g.start+g.count+1?g.count=Math.max(g.count,v.start+v.count-g.start):(++u,d[u]=v)}d.length=u+1;for(let p=0,g=d.length;p<g;p++){const v=d[p];i.bufferSubData(l,v.start*h.BYTES_PER_ELEMENT,h,v.start,v.count)}c.clearUpdateRanges()}c.onUploadCallback()}function r(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function s(o){o.isInterleavedBufferAttribute&&(o=o.data);const c=e.get(o);c&&(i.deleteBuffer(c.buffer),e.delete(o))}function a(o,c){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const h=e.get(o);(!h||h.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const l=e.get(o);if(l===void 0)e.set(o,t(o,c));else if(l.version<o.version){if(l.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(l.buffer,o,c),l.version=o.version}}return{get:r,remove:s,update:a}}var hg=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,ug=`#ifdef USE_ALPHAHASH
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
#endif`,dg=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,fg=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,pg=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,mg=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,gg=`#ifdef USE_AOMAP
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
#endif`,xg=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,vg=`#ifdef USE_BATCHING
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
#endif`,_g=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Mg=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Sg=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,yg=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,bg=`#ifdef USE_IRIDESCENCE
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
#endif`,wg=`#ifdef USE_BUMPMAP
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
#endif`,Eg=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,Ag=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Tg=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Rg=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Cg=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,Lg=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,Pg=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,Dg=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
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
#endif`,Ig=`#define PI 3.141592653589793
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
} // validated`,Ng=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,Ug=`vec3 transformedNormal = objectNormal;
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
#endif`,Fg=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Og=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Bg=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,zg=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,kg="gl_FragColor = linearToOutputTexel( gl_FragColor );",Gg=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Hg=`#ifdef USE_ENVMAP
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
#endif`,Wg=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,Vg=`#ifdef USE_ENVMAP
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
#endif`,Xg=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Yg=`#ifdef USE_ENVMAP
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
#endif`,qg=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Kg=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,$g=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Zg=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Jg=`#ifdef USE_GRADIENTMAP
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
}`,Qg=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,jg=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,e1=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,t1=`uniform bool receiveShadow;
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
#include <lightprobes_pars_fragment>`,n1=`#ifdef USE_ENVMAP
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
#endif`,i1=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,r1=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,s1=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,a1=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,o1=`PhysicalMaterial material;
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
#endif`,l1=`uniform sampler2D dfgLUT;
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
}`,c1=`
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
#endif`,h1=`#if defined( RE_IndirectDiffuse )
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
#endif`,u1=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,d1=`#ifdef USE_LIGHT_PROBES_GRID
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
#endif`,f1=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,p1=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,m1=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,g1=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,x1=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,v1=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,_1=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,M1=`#if defined( USE_POINTS_UV )
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
#endif`,S1=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,y1=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,b1=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,w1=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,E1=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,A1=`#ifdef USE_MORPHTARGETS
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
#endif`,T1=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,R1=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,C1=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,L1=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,P1=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,D1=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,I1=`#ifdef USE_NORMALMAP
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
#endif`,N1=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,U1=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,F1=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,O1=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,B1=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,z1=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,k1=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,G1=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,H1=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,W1=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,V1=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,X1=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Y1=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,q1=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,K1=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,$1=`float getShadowMask() {
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
}`,Z1=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,J1=`#ifdef USE_SKINNING
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
#endif`,Q1=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,j1=`#ifdef USE_SKINNING
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
#endif`,ex=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,tx=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,nx=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,ix=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,rx=`#ifdef USE_TRANSMISSION
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
#endif`,sx=`#ifdef USE_TRANSMISSION
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
#endif`,ax=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,ox=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,lx=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,cx=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const hx=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,ux=`uniform sampler2D t2D;
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
}`,dx=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,fx=`#ifdef ENVMAP_TYPE_CUBE
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
}`,px=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,mx=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,gx=`#include <common>
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
}`,xx=`#if DEPTH_PACKING == 3200
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
}`,vx=`#define DISTANCE
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
}`,_x=`#define DISTANCE
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
}`,Mx=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Sx=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,yx=`uniform float scale;
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
}`,bx=`uniform vec3 diffuse;
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
}`,wx=`#include <common>
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
}`,Ex=`uniform vec3 diffuse;
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
}`,Ax=`#define LAMBERT
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
}`,Tx=`#define LAMBERT
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
}`,Rx=`#define MATCAP
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
}`,Cx=`#define MATCAP
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
}`,Lx=`#define NORMAL
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
}`,Px=`#define NORMAL
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
}`,Dx=`#define PHONG
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
}`,Ix=`#define PHONG
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
}`,Nx=`#define STANDARD
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
}`,Ux=`#define STANDARD
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
}`,Fx=`#define TOON
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
}`,Ox=`#define TOON
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
}`,Bx=`uniform float size;
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
}`,zx=`uniform vec3 diffuse;
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
}`,kx=`#include <common>
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
}`,Gx=`uniform vec3 color;
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
}`,Hx=`uniform float rotation;
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
}`,Wx=`uniform vec3 diffuse;
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
}`,je={alphahash_fragment:hg,alphahash_pars_fragment:ug,alphamap_fragment:dg,alphamap_pars_fragment:fg,alphatest_fragment:pg,alphatest_pars_fragment:mg,aomap_fragment:gg,aomap_pars_fragment:xg,batching_pars_vertex:vg,batching_vertex:_g,begin_vertex:Mg,beginnormal_vertex:Sg,bsdfs:yg,iridescence_fragment:bg,bumpmap_pars_fragment:wg,clipping_planes_fragment:Eg,clipping_planes_pars_fragment:Ag,clipping_planes_pars_vertex:Tg,clipping_planes_vertex:Rg,color_fragment:Cg,color_pars_fragment:Lg,color_pars_vertex:Pg,color_vertex:Dg,common:Ig,cube_uv_reflection_fragment:Ng,defaultnormal_vertex:Ug,displacementmap_pars_vertex:Fg,displacementmap_vertex:Og,emissivemap_fragment:Bg,emissivemap_pars_fragment:zg,colorspace_fragment:kg,colorspace_pars_fragment:Gg,envmap_fragment:Hg,envmap_common_pars_fragment:Wg,envmap_pars_fragment:Vg,envmap_pars_vertex:Xg,envmap_physical_pars_fragment:n1,envmap_vertex:Yg,fog_vertex:qg,fog_pars_vertex:Kg,fog_fragment:$g,fog_pars_fragment:Zg,gradientmap_pars_fragment:Jg,lightmap_pars_fragment:Qg,lights_lambert_fragment:jg,lights_lambert_pars_fragment:e1,lights_pars_begin:t1,lights_toon_fragment:i1,lights_toon_pars_fragment:r1,lights_phong_fragment:s1,lights_phong_pars_fragment:a1,lights_physical_fragment:o1,lights_physical_pars_fragment:l1,lights_fragment_begin:c1,lights_fragment_maps:h1,lights_fragment_end:u1,lightprobes_pars_fragment:d1,logdepthbuf_fragment:f1,logdepthbuf_pars_fragment:p1,logdepthbuf_pars_vertex:m1,logdepthbuf_vertex:g1,map_fragment:x1,map_pars_fragment:v1,map_particle_fragment:_1,map_particle_pars_fragment:M1,metalnessmap_fragment:S1,metalnessmap_pars_fragment:y1,morphinstance_vertex:b1,morphcolor_vertex:w1,morphnormal_vertex:E1,morphtarget_pars_vertex:A1,morphtarget_vertex:T1,normal_fragment_begin:R1,normal_fragment_maps:C1,normal_pars_fragment:L1,normal_pars_vertex:P1,normal_vertex:D1,normalmap_pars_fragment:I1,clearcoat_normal_fragment_begin:N1,clearcoat_normal_fragment_maps:U1,clearcoat_pars_fragment:F1,iridescence_pars_fragment:O1,opaque_fragment:B1,packing:z1,premultiplied_alpha_fragment:k1,project_vertex:G1,dithering_fragment:H1,dithering_pars_fragment:W1,roughnessmap_fragment:V1,roughnessmap_pars_fragment:X1,shadowmap_pars_fragment:Y1,shadowmap_pars_vertex:q1,shadowmap_vertex:K1,shadowmask_pars_fragment:$1,skinbase_vertex:Z1,skinning_pars_vertex:J1,skinning_vertex:Q1,skinnormal_vertex:j1,specularmap_fragment:ex,specularmap_pars_fragment:tx,tonemapping_fragment:nx,tonemapping_pars_fragment:ix,transmission_fragment:rx,transmission_pars_fragment:sx,uv_pars_fragment:ax,uv_pars_vertex:ox,uv_vertex:lx,worldpos_vertex:cx,background_vert:hx,background_frag:ux,backgroundCube_vert:dx,backgroundCube_frag:fx,cube_vert:px,cube_frag:mx,depth_vert:gx,depth_frag:xx,distance_vert:vx,distance_frag:_x,equirect_vert:Mx,equirect_frag:Sx,linedashed_vert:yx,linedashed_frag:bx,meshbasic_vert:wx,meshbasic_frag:Ex,meshlambert_vert:Ax,meshlambert_frag:Tx,meshmatcap_vert:Rx,meshmatcap_frag:Cx,meshnormal_vert:Lx,meshnormal_frag:Px,meshphong_vert:Dx,meshphong_frag:Ix,meshphysical_vert:Nx,meshphysical_frag:Ux,meshtoon_vert:Fx,meshtoon_frag:Ox,points_vert:Bx,points_frag:zx,shadow_vert:kx,shadow_frag:Gx,sprite_vert:Hx,sprite_frag:Wx},ve={common:{diffuse:{value:new et(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ve},alphaMap:{value:null},alphaMapTransform:{value:new Ve},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ve}},envmap:{envMap:{value:null},envMapRotation:{value:new Ve},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ve}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ve}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ve},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ve},normalScale:{value:new He(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ve},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ve}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ve}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ve}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new et(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new W},probesMax:{value:new W},probesResolution:{value:new W}},points:{diffuse:{value:new et(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ve},alphaTest:{value:0},uvTransform:{value:new Ve}},sprite:{diffuse:{value:new et(16777215)},opacity:{value:1},center:{value:new He(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ve},alphaMap:{value:null},alphaMapTransform:{value:new Ve},alphaTest:{value:0}}},zn={basic:{uniforms:rn([ve.common,ve.specularmap,ve.envmap,ve.aomap,ve.lightmap,ve.fog]),vertexShader:je.meshbasic_vert,fragmentShader:je.meshbasic_frag},lambert:{uniforms:rn([ve.common,ve.specularmap,ve.envmap,ve.aomap,ve.lightmap,ve.emissivemap,ve.bumpmap,ve.normalmap,ve.displacementmap,ve.fog,ve.lights,{emissive:{value:new et(0)},envMapIntensity:{value:1}}]),vertexShader:je.meshlambert_vert,fragmentShader:je.meshlambert_frag},phong:{uniforms:rn([ve.common,ve.specularmap,ve.envmap,ve.aomap,ve.lightmap,ve.emissivemap,ve.bumpmap,ve.normalmap,ve.displacementmap,ve.fog,ve.lights,{emissive:{value:new et(0)},specular:{value:new et(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:je.meshphong_vert,fragmentShader:je.meshphong_frag},standard:{uniforms:rn([ve.common,ve.envmap,ve.aomap,ve.lightmap,ve.emissivemap,ve.bumpmap,ve.normalmap,ve.displacementmap,ve.roughnessmap,ve.metalnessmap,ve.fog,ve.lights,{emissive:{value:new et(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:je.meshphysical_vert,fragmentShader:je.meshphysical_frag},toon:{uniforms:rn([ve.common,ve.aomap,ve.lightmap,ve.emissivemap,ve.bumpmap,ve.normalmap,ve.displacementmap,ve.gradientmap,ve.fog,ve.lights,{emissive:{value:new et(0)}}]),vertexShader:je.meshtoon_vert,fragmentShader:je.meshtoon_frag},matcap:{uniforms:rn([ve.common,ve.bumpmap,ve.normalmap,ve.displacementmap,ve.fog,{matcap:{value:null}}]),vertexShader:je.meshmatcap_vert,fragmentShader:je.meshmatcap_frag},points:{uniforms:rn([ve.points,ve.fog]),vertexShader:je.points_vert,fragmentShader:je.points_frag},dashed:{uniforms:rn([ve.common,ve.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:je.linedashed_vert,fragmentShader:je.linedashed_frag},depth:{uniforms:rn([ve.common,ve.displacementmap]),vertexShader:je.depth_vert,fragmentShader:je.depth_frag},normal:{uniforms:rn([ve.common,ve.bumpmap,ve.normalmap,ve.displacementmap,{opacity:{value:1}}]),vertexShader:je.meshnormal_vert,fragmentShader:je.meshnormal_frag},sprite:{uniforms:rn([ve.sprite,ve.fog]),vertexShader:je.sprite_vert,fragmentShader:je.sprite_frag},background:{uniforms:{uvTransform:{value:new Ve},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:je.background_vert,fragmentShader:je.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Ve}},vertexShader:je.backgroundCube_vert,fragmentShader:je.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:je.cube_vert,fragmentShader:je.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:je.equirect_vert,fragmentShader:je.equirect_frag},distance:{uniforms:rn([ve.common,ve.displacementmap,{referencePosition:{value:new W},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:je.distance_vert,fragmentShader:je.distance_frag},shadow:{uniforms:rn([ve.lights,ve.fog,{color:{value:new et(0)},opacity:{value:1}}]),vertexShader:je.shadow_vert,fragmentShader:je.shadow_frag}};zn.physical={uniforms:rn([zn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ve},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ve},clearcoatNormalScale:{value:new He(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ve},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ve},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ve},sheen:{value:0},sheenColor:{value:new et(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ve},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ve},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ve},transmissionSamplerSize:{value:new He},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ve},attenuationDistance:{value:0},attenuationColor:{value:new et(0)},specularColor:{value:new et(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ve},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ve},anisotropyVector:{value:new He},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ve}}]),vertexShader:je.meshphysical_vert,fragmentShader:je.meshphysical_frag};const Ps={r:0,b:0,g:0},Vx=new Pt,vu=new Ve;vu.set(-1,0,0,0,1,0,0,0,1);function Xx(i,e,t,n,r,s){const a=new et(0);let o=r===!0?0:1,c,l,h=null,d=0,u=null;function p(_){let M=_.isScene===!0?_.background:null;if(M&&M.isTexture){const S=_.backgroundBlurriness>0;M=e.get(M,S)}return M}function g(_){let M=!1;const S=p(_);S===null?x(a,o):S&&S.isColor&&(x(S,1),M=!0);const w=i.xr.getEnvironmentBlendMode();w==="additive"?t.buffers.color.setClear(0,0,0,1,s):w==="alpha-blend"&&t.buffers.color.setClear(0,0,0,0,s),(i.autoClear||M)&&(t.buffers.depth.setTest(!0),t.buffers.depth.setMask(!0),t.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function v(_,M){const S=p(M);S&&(S.isCubeTexture||S.mapping===xa)?(l===void 0&&(l=new Gt(new es(1,1,1),new Mt({name:"BackgroundCubeMaterial",uniforms:wr(zn.backgroundCube.uniforms),vertexShader:zn.backgroundCube.vertexShader,fragmentShader:zn.backgroundCube.fragmentShader,side:on,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),l.geometry.deleteAttribute("uv"),l.onBeforeRender=function(w,E,L){this.matrixWorld.copyPosition(L.matrixWorld)},Object.defineProperty(l.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),n.update(l)),l.material.uniforms.envMap.value=S,l.material.uniforms.backgroundBlurriness.value=M.backgroundBlurriness,l.material.uniforms.backgroundIntensity.value=M.backgroundIntensity,l.material.uniforms.backgroundRotation.value.setFromMatrix4(Vx.makeRotationFromEuler(M.backgroundRotation)).transpose(),S.isCubeTexture&&S.isRenderTargetTexture===!1&&l.material.uniforms.backgroundRotation.value.premultiply(vu),l.material.toneMapped=nt.getTransfer(S.colorSpace)!==gt,(h!==S||d!==S.version||u!==i.toneMapping)&&(l.material.needsUpdate=!0,h=S,d=S.version,u=i.toneMapping),l.layers.enableAll(),_.unshift(l,l.geometry,l.material,0,0,null)):S&&S.isTexture&&(c===void 0&&(c=new Gt(new _n(2,2),new Mt({name:"BackgroundMaterial",uniforms:wr(zn.background.uniforms),vertexShader:zn.background.vertexShader,fragmentShader:zn.background.fragmentShader,side:Oi,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),n.update(c)),c.material.uniforms.t2D.value=S,c.material.uniforms.backgroundIntensity.value=M.backgroundIntensity,c.material.toneMapped=nt.getTransfer(S.colorSpace)!==gt,S.matrixAutoUpdate===!0&&S.updateMatrix(),c.material.uniforms.uvTransform.value.copy(S.matrix),(h!==S||d!==S.version||u!==i.toneMapping)&&(c.material.needsUpdate=!0,h=S,d=S.version,u=i.toneMapping),c.layers.enableAll(),_.unshift(c,c.geometry,c.material,0,0,null))}function x(_,M){_.getRGB(Ps,pu(i)),t.buffers.color.setClear(Ps.r,Ps.g,Ps.b,M,s)}function m(){l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return a},setClearColor:function(_,M=1){a.set(_),o=M,x(a,o)},getClearAlpha:function(){return o},setClearAlpha:function(_){o=_,x(a,o)},render:g,addToRenderList:v,dispose:m}}function Yx(i,e){const t=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},r=u(null);let s=r,a=!1;function o(R,U,N,P,F){let O=!1;const V=d(R,P,N,U);s!==V&&(s=V,l(s.object)),O=p(R,P,N,F),O&&g(R,P,N,F),F!==null&&e.update(F,i.ELEMENT_ARRAY_BUFFER),(O||a)&&(a=!1,S(R,U,N,P),F!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,e.get(F).buffer))}function c(){return i.createVertexArray()}function l(R){return i.bindVertexArray(R)}function h(R){return i.deleteVertexArray(R)}function d(R,U,N,P){const F=P.wireframe===!0;let O=n[U.id];O===void 0&&(O={},n[U.id]=O);const V=R.isInstancedMesh===!0?R.id:0;let Q=O[V];Q===void 0&&(Q={},O[V]=Q);let X=Q[N.id];X===void 0&&(X={},Q[N.id]=X);let te=X[F];return te===void 0&&(te=u(c()),X[F]=te),te}function u(R){const U=[],N=[],P=[];for(let F=0;F<t;F++)U[F]=0,N[F]=0,P[F]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:U,enabledAttributes:N,attributeDivisors:P,object:R,attributes:{},index:null}}function p(R,U,N,P){const F=s.attributes,O=U.attributes;let V=0;const Q=N.getAttributes();for(const X in Q)if(Q[X].location>=0){const B=F[X];let ne=O[X];if(ne===void 0&&(X==="instanceMatrix"&&R.instanceMatrix&&(ne=R.instanceMatrix),X==="instanceColor"&&R.instanceColor&&(ne=R.instanceColor)),B===void 0||B.attribute!==ne||ne&&B.data!==ne.data)return!0;V++}return s.attributesNum!==V||s.index!==P}function g(R,U,N,P){const F={},O=U.attributes;let V=0;const Q=N.getAttributes();for(const X in Q)if(Q[X].location>=0){let B=O[X];B===void 0&&(X==="instanceMatrix"&&R.instanceMatrix&&(B=R.instanceMatrix),X==="instanceColor"&&R.instanceColor&&(B=R.instanceColor));const ne={};ne.attribute=B,B&&B.data&&(ne.data=B.data),F[X]=ne,V++}s.attributes=F,s.attributesNum=V,s.index=P}function v(){const R=s.newAttributes;for(let U=0,N=R.length;U<N;U++)R[U]=0}function x(R){m(R,0)}function m(R,U){const N=s.newAttributes,P=s.enabledAttributes,F=s.attributeDivisors;N[R]=1,P[R]===0&&(i.enableVertexAttribArray(R),P[R]=1),F[R]!==U&&(i.vertexAttribDivisor(R,U),F[R]=U)}function _(){const R=s.newAttributes,U=s.enabledAttributes;for(let N=0,P=U.length;N<P;N++)U[N]!==R[N]&&(i.disableVertexAttribArray(N),U[N]=0)}function M(R,U,N,P,F,O,V){V===!0?i.vertexAttribIPointer(R,U,N,F,O):i.vertexAttribPointer(R,U,N,P,F,O)}function S(R,U,N,P){v();const F=P.attributes,O=N.getAttributes(),V=U.defaultAttributeValues;for(const Q in O){const X=O[Q];if(X.location>=0){let te=F[Q];if(te===void 0&&(Q==="instanceMatrix"&&R.instanceMatrix&&(te=R.instanceMatrix),Q==="instanceColor"&&R.instanceColor&&(te=R.instanceColor)),te!==void 0){const B=te.normalized,ne=te.itemSize,le=e.get(te);if(le===void 0)continue;const _e=le.buffer,Ie=le.type,ke=le.bytesPerElement,ee=Ie===i.INT||Ie===i.UNSIGNED_INT||te.gpuType===El;if(te.isInterleavedBufferAttribute){const se=te.data,Y=se.stride,he=te.offset;if(se.isInstancedInterleavedBuffer){for(let ae=0;ae<X.locationSize;ae++)m(X.location+ae,se.meshPerAttribute);R.isInstancedMesh!==!0&&P._maxInstanceCount===void 0&&(P._maxInstanceCount=se.meshPerAttribute*se.count)}else for(let ae=0;ae<X.locationSize;ae++)x(X.location+ae);i.bindBuffer(i.ARRAY_BUFFER,_e);for(let ae=0;ae<X.locationSize;ae++)M(X.location+ae,ne/X.locationSize,Ie,B,Y*ke,(he+ne/X.locationSize*ae)*ke,ee)}else{if(te.isInstancedBufferAttribute){for(let se=0;se<X.locationSize;se++)m(X.location+se,te.meshPerAttribute);R.isInstancedMesh!==!0&&P._maxInstanceCount===void 0&&(P._maxInstanceCount=te.meshPerAttribute*te.count)}else for(let se=0;se<X.locationSize;se++)x(X.location+se);i.bindBuffer(i.ARRAY_BUFFER,_e);for(let se=0;se<X.locationSize;se++)M(X.location+se,ne/X.locationSize,Ie,B,ne*ke,ne/X.locationSize*se*ke,ee)}}else if(V!==void 0){const B=V[Q];if(B!==void 0)switch(B.length){case 2:i.vertexAttrib2fv(X.location,B);break;case 3:i.vertexAttrib3fv(X.location,B);break;case 4:i.vertexAttrib4fv(X.location,B);break;default:i.vertexAttrib1fv(X.location,B)}}}}_()}function w(){A();for(const R in n){const U=n[R];for(const N in U){const P=U[N];for(const F in P){const O=P[F];for(const V in O)h(O[V].object),delete O[V];delete P[F]}}delete n[R]}}function E(R){if(n[R.id]===void 0)return;const U=n[R.id];for(const N in U){const P=U[N];for(const F in P){const O=P[F];for(const V in O)h(O[V].object),delete O[V];delete P[F]}}delete n[R.id]}function L(R){for(const U in n){const N=n[U];for(const P in N){const F=N[P];if(F[R.id]===void 0)continue;const O=F[R.id];for(const V in O)h(O[V].object),delete O[V];delete F[R.id]}}}function y(R){for(const U in n){const N=n[U],P=R.isInstancedMesh===!0?R.id:0,F=N[P];if(F!==void 0){for(const O in F){const V=F[O];for(const Q in V)h(V[Q].object),delete V[Q];delete F[O]}delete N[P],Object.keys(N).length===0&&delete n[U]}}}function A(){D(),a=!0,s!==r&&(s=r,l(s.object))}function D(){r.geometry=null,r.program=null,r.wireframe=!1}return{setup:o,reset:A,resetDefaultState:D,dispose:w,releaseStatesOfGeometry:E,releaseStatesOfObject:y,releaseStatesOfProgram:L,initAttributes:v,enableAttribute:x,disableUnusedAttributes:_}}function qx(i,e,t){let n;function r(c){n=c}function s(c,l){i.drawArrays(n,c,l),t.update(l,n,1)}function a(c,l,h){h!==0&&(i.drawArraysInstanced(n,c,l,h),t.update(l,n,h))}function o(c,l,h){if(h===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,c,0,l,0,h);let u=0;for(let p=0;p<h;p++)u+=l[p];t.update(u,n,1)}this.setMode=r,this.render=s,this.renderInstances=a,this.renderMultiDraw=o}function Kx(i,e,t,n){let r;function s(){if(r!==void 0)return r;if(e.has("EXT_texture_filter_anisotropic")===!0){const L=e.get("EXT_texture_filter_anisotropic");r=i.getParameter(L.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else r=0;return r}function a(L){return!(L!==pn&&n.convert(L)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(L){const y=L===Xn&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(L!==fn&&L!==kn&&!y&&n.convert(L)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE))}function c(L){if(L==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";L="mediump"}return L==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=t.precision!==void 0?t.precision:"highp";const h=c(l);h!==l&&(Ge("WebGLRenderer:",l,"not supported, using",h,"instead."),l=h);const d=t.logarithmicDepthBuffer===!0,u=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control");t.reversedDepthBuffer===!0&&u===!1&&Ge("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");const p=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),g=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),v=i.getParameter(i.MAX_TEXTURE_SIZE),x=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),m=i.getParameter(i.MAX_VERTEX_ATTRIBS),_=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),M=i.getParameter(i.MAX_VARYING_VECTORS),S=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),w=i.getParameter(i.MAX_SAMPLES),E=i.getParameter(i.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:c,textureFormatReadable:a,textureTypeReadable:o,precision:l,logarithmicDepthBuffer:d,reversedDepthBuffer:u,maxTextures:p,maxVertexTextures:g,maxTextureSize:v,maxCubemapSize:x,maxAttributes:m,maxVertexUniforms:_,maxVaryings:M,maxFragmentUniforms:S,maxSamples:w,samples:E}}function $x(i){const e=this;let t=null,n=0,r=!1,s=!1;const a=new pi,o=new Ve,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(d,u){const p=d.length!==0||u||n!==0||r;return r=u,n=d.length,p},this.beginShadows=function(){s=!0,h(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(d,u){t=h(d,u,0)},this.setState=function(d,u,p){const g=d.clippingPlanes,v=d.clipIntersection,x=d.clipShadows,m=i.get(d);if(!r||g===null||g.length===0||s&&!x)s?h(null):l();else{const _=s?0:n,M=_*4;let S=m.clippingState||null;c.value=S,S=h(g,u,M,p);for(let w=0;w!==M;++w)S[w]=t[w];m.clippingState=S,this.numIntersection=v?this.numPlanes:0,this.numPlanes+=_}};function l(){c.value!==t&&(c.value=t,c.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function h(d,u,p,g){const v=d!==null?d.length:0;let x=null;if(v!==0){if(x=c.value,g!==!0||x===null){const m=p+v*4,_=u.matrixWorldInverse;o.getNormalMatrix(_),(x===null||x.length<m)&&(x=new Float32Array(m));for(let M=0,S=p;M!==v;++M,S+=4)a.copy(d[M]).applyMatrix4(_,o),a.normal.toArray(x,S),x[S+3]=a.constant}c.value=x,c.needsUpdate=!0}return e.numPlanes=v,e.numIntersection=0,x}}const ur=4,Zx=6,Jx=20,Qx=256,zr=new Ol,Gc=new et;let no=null,io=0,ro=0,so=!1;const jx=new W,Ti=new W;class Hc{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,n=.1,r=100,s={}){const{size:a=256,position:o=jx}=s;no=this._renderer.getRenderTarget(),io=this._renderer.getActiveCubeFace(),ro=this._renderer.getActiveMipmapLevel(),so=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);const c=this._allocateTargets();return c.depthBuffer=!0,this._sceneToCubeUV(e,n,r,c,o),t>0&&this._blur(c,0,0,t),this._applyPMREM(c),this._cleanup(c),c}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Xc(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Vc(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(no,io,ro),this._renderer.xr.enabled=so,e.scissorTest=!1,rr(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===Bi||e.mapping===yr?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),no=this._renderer.getRenderTarget(),io=this._renderer.getActiveCubeFace(),ro=this._renderer.getActiveMipmapLevel(),so=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:Nt,minFilter:Nt,generateMipmaps:!1,type:Xn,format:pn,colorSpace:$r,depthBuffer:!1},r=Wc(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Wc(e,t,n);const{_lodMax:s}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods}=ev(s)),this._blurMaterial=nv(s,e,t),this._ggxMaterial=tv(s,e,t)}return r}_compileMaterial(e){const t=new Gt(new Ht,e);this._renderer.compile(t,zr)}_sceneToCubeUV(e,t,n,r,s){const c=new dn(90,1,t,n),l=[1,-1,1,1,1,1],h=[1,1,1,-1,-1,-1],d=this._renderer,u=d.autoClear,p=d.toneMapping;d.getClearColor(Gc),d.toneMapping=Wn,d.autoClear=!1,d.state.buffers.depth.getReversed()&&(d.setRenderTarget(r),d.clearDepth(),d.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new Gt(new es,new hu({name:"PMREM.Background",side:on,depthWrite:!1,depthTest:!1})));const v=this._backgroundBox,x=v.material;let m=!1;const _=e.background;_?_.isColor&&(x.color.copy(_),e.background=null,m=!0):(x.color.copy(Gc),m=!0);for(let M=0;M<6;M++){const S=M%3;S===0?(c.up.set(0,l[M],0),c.position.set(s.x,s.y,s.z),c.lookAt(s.x+h[M],s.y,s.z)):S===1?(c.up.set(0,0,l[M]),c.position.set(s.x,s.y,s.z),c.lookAt(s.x,s.y+h[M],s.z)):(c.up.set(0,l[M],0),c.position.set(s.x,s.y,s.z),c.lookAt(s.x,s.y,s.z+h[M]));const w=this._cubeSize;rr(r,S*w,M>2?w:0,w,w),d.setRenderTarget(r),m&&d.render(v,c),d.render(e,c)}d.toneMapping=p,d.autoClear=u,e.background=_}_textureToCubeUV(e,t){const n=this._renderer,r=e.mapping===Bi||e.mapping===yr;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=Xc()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Vc());const s=r?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=s;const o=s.uniforms;o.envMap.value=e;const c=this._cubeSize;rr(t,0,0,3*c,2*c),n.setRenderTarget(t),n.render(a,zr)}_applyPMREM(e){const t=this._renderer,n=t.autoClear;t.autoClear=!1;const r=this._lodMeshes.length;for(let s=1;s<r;s++)this._applyGGXFilter(e,s-1,s);t.autoClear=n}_applyGGXFilter(e,t,n){const r=this._renderer,s=this._pingPongRenderTarget,a=this._ggxMaterial,o=this._lodMeshes[n];o.material=a;const c=a.uniforms,l=n/(this._lodMeshes.length-1),h=t/(this._lodMeshes.length-1),d=Math.sqrt(l*l-h*h),u=l*1.25,p=d*u,{_lodMax:g}=this,v=this._sizeLods[n],x=3*v*(n>g-ur?n-g+ur:0),m=4*(this._cubeSize-v);c.envMap.value=e.texture,c.roughness.value=p,c.mipInt.value=g-t,rr(s,x,m,3*v,2*v),r.setRenderTarget(s),r.render(o,zr),c.envMap.value=s.texture,c.roughness.value=0,c.mipInt.value=g-n,rr(e,x,m,3*v,2*v),r.setRenderTarget(e),r.render(o,zr)}_blur(e,t,n,r){const s=this._pingPongRenderTarget,a=Math.min(r,Math.PI)/Math.SQRT2;this._blurPass(e,s,t,n,a),this._blurPass(s,e,n,n,a)}_blurPass(e,t,n,r,s){const a=this._renderer,o=this._blurMaterial,c=this._lodMeshes[r];c.material=o;const l=o.uniforms;l.envMap.value=e.texture,l.sigma.value=s,l.mipInt.value=this._lodMax-n;const h=this._sizeLods[r],d=3*h*(r>this._lodMax-ur?r-this._lodMax+ur:0),u=4*(this._cubeSize-h);rr(t,d,u,3*h,2*h),a.setRenderTarget(t),a.render(c,zr)}}function ev(i){const e=[],t=[];let n=i;const r=i-ur+1+Zx;for(let s=0;s<r;s++){const a=Math.pow(2,n);e.push(a);const o=1/(a-2),c=-o,l=1+o,h=[c,c,l,c,l,l,c,c,l,l,c,l],d=6,u=6,p=3,g=new Float32Array(p*u*d),v=new Float32Array(p*u*d);for(let m=0;m<d;m++){const _=m%3*2/3-1,M=m>2?0:-1,S=[_,M,0,_+2/3,M,0,_+2/3,M+1,0,_,M,0,_+2/3,M+1,0,_,M+1,0];g.set(S,p*u*m);for(let w=0;w<u;w++){const E=h[w*2]*2-1,L=h[w*2+1]*2-1;m===0?Ti.set(1,L,E):m===1?Ti.set(-E,1,-L):m===2?Ti.set(-E,L,1):m===3?Ti.set(-1,L,-E):m===4?Ti.set(-E,-1,L):Ti.set(E,L,-1),Ti.toArray(v,(m*u+w)*p)}}const x=new Ht;x.setAttribute("position",new xn(g,p)),x.setAttribute("outputDirection",new xn(v,p)),t.push(new Gt(x,null)),n>ur&&n--}return{lodMeshes:t,sizeLods:e}}function Wc(i,e,t){const n=new En(i,e,t);return n.texture.mapping=xa,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function rr(i,e,t,n,r){i.viewport.set(e,t,n,r),i.scissor.set(e,t,n,r)}function tv(i,e,t){return new Mt({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:Qx,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:va(),fragmentShader:`

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
		`,blending:Hn,depthTest:!1,depthWrite:!1})}function nv(i,e,t){return new Mt({name:"SphericalGaussianBlur",defines:{SAMPLES:Jx,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},sigma:{value:0},mipInt:{value:0}},vertexShader:va(),fragmentShader:`

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
		`,blending:Hn,depthTest:!1,depthWrite:!1})}function Vc(){return new Mt({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:va(),fragmentShader:`

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
		`,blending:Hn,depthTest:!1,depthWrite:!1})}function Xc(){return new Mt({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:va(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Hn,depthTest:!1,depthWrite:!1})}function va(){return`

		precision mediump float;
		precision mediump int;

		attribute vec3 outputDirection;

		varying vec3 vOutputDirection;

		void main() {

			vOutputDirection = outputDirection;
			gl_Position = vec4( position, 1.0 );

		}
	`}class _u extends En{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const n={width:e,height:e,depth:1},r=[n,n,n,n,n,n];this.texture=new du(r),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},r=new es(5,5,5),s=new Mt({name:"CubemapFromEquirect",uniforms:wr(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:on,blending:Hn});s.uniforms.tEquirect.value=t;const a=new Gt(r,s),o=t.minFilter;return t.minFilter===Di&&(t.minFilter=Nt),new ag(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,n=!0,r=!0){const s=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,n,r);e.setRenderTarget(s)}}function iv(i){let e=new WeakMap,t=new WeakMap,n=null;function r(u,p=!1){return u==null?null:p?a(u):s(u)}function s(u){if(u&&u.isTexture){const p=u.mapping;if(p===Ca||p===La)if(e.has(u)){const g=e.get(u).texture;return o(g,u.mapping)}else{const g=u.image;if(g&&g.height>0){const v=new _u(g.height);return v.fromEquirectangularTexture(i,u),e.set(u,v),u.addEventListener("dispose",l),o(v.texture,u.mapping)}else return null}}return u}function a(u){if(u&&u.isTexture){const p=u.mapping,g=p===Ca||p===La,v=p===Bi||p===yr;if(g||v){let x=t.get(u);const m=x!==void 0?x.texture.pmremVersion:0;if(u.isRenderTargetTexture&&u.pmremVersion!==m)return n===null&&(n=new Hc(i)),x=g?n.fromEquirectangular(u,x):n.fromCubemap(u,x),x.texture.pmremVersion=u.pmremVersion,t.set(u,x),x.texture;if(x!==void 0)return x.texture;{const _=u.image;return g&&_&&_.height>0||v&&_&&c(_)?(n===null&&(n=new Hc(i)),x=g?n.fromEquirectangular(u):n.fromCubemap(u),x.texture.pmremVersion=u.pmremVersion,t.set(u,x),u.addEventListener("dispose",h),x.texture):null}}}return u}function o(u,p){return p===Ca?u.mapping=Bi:p===La&&(u.mapping=yr),u}function c(u){let p=0;const g=6;for(let v=0;v<g;v++)u[v]!==void 0&&p++;return p===g}function l(u){const p=u.target;p.removeEventListener("dispose",l);const g=e.get(p);g!==void 0&&(e.delete(p),g.dispose())}function h(u){const p=u.target;p.removeEventListener("dispose",h);const g=t.get(p);g!==void 0&&(t.delete(p),g.dispose())}function d(){e=new WeakMap,t=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:r,dispose:d}}function rv(i){const e={};function t(n){if(e[n]!==void 0)return e[n];const r=i.getExtension(n);return e[n]=r,r}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){const r=t(n);return r===null&&gr("WebGLRenderer: "+n+" extension not supported."),r}}}function sv(i,e,t,n){const r={},s=new WeakMap;function a(d){const u=d.target;u.index!==null&&e.remove(u.index);for(const g in u.attributes)e.remove(u.attributes[g]);u.removeEventListener("dispose",a),delete r[u.id];const p=s.get(u);p&&(e.remove(p),s.delete(u)),n.releaseStatesOfGeometry(u),u.isInstancedBufferGeometry===!0&&delete u._maxInstanceCount,t.memory.geometries--}function o(d,u){return r[u.id]===!0||(u.addEventListener("dispose",a),r[u.id]=!0,t.memory.geometries++),u}function c(d){const u=d.attributes;for(const p in u)e.update(u[p],i.ARRAY_BUFFER)}function l(d){const u=[],p=d.index,g=d.attributes.position;let v=0;if(g===void 0)return;if(p!==null){const _=p.array;v=p.version;for(let M=0,S=_.length;M<S;M+=3){const w=_[M+0],E=_[M+1],L=_[M+2];u.push(w,E,E,L,L,w)}}else{const _=g.array;v=g.version;for(let M=0,S=_.length/3-1;M<S;M+=3){const w=M+0,E=M+1,L=M+2;u.push(w,E,E,L,L,w)}}const x=new(g.count>=65535?cu:lu)(u,1);x.version=v;const m=s.get(d);m&&e.remove(m),s.set(d,x)}function h(d){const u=s.get(d);if(u){const p=d.index;p!==null&&u.version<p.version&&l(d)}else l(d);return s.get(d)}return{get:o,update:c,getWireframeAttribute:h}}function av(i,e,t){let n;function r(d){n=d}let s,a;function o(d){s=d.type,a=d.bytesPerElement}function c(d,u){i.drawElements(n,u,s,d*a),t.update(u,n,1)}function l(d,u,p){p!==0&&(i.drawElementsInstanced(n,u,s,d*a,p),t.update(u,n,p))}function h(d,u,p){if(p===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,u,0,s,d,0,p);let v=0;for(let x=0;x<p;x++)v+=u[x];t.update(v,n,1)}this.setMode=r,this.setIndex=o,this.render=c,this.renderInstances=l,this.renderMultiDraw=h}function ov(i){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(s,a,o){switch(t.calls++,a){case i.TRIANGLES:t.triangles+=o*(s/3);break;case i.LINES:t.lines+=o*(s/2);break;case i.LINE_STRIP:t.lines+=o*(s-1);break;case i.LINE_LOOP:t.lines+=o*s;break;case i.POINTS:t.points+=o*s;break;default:lt("WebGLInfo: Unknown draw mode:",a);break}}function r(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:r,update:n}}function lv(i,e,t){const n=new WeakMap,r=new rt;function s(a,o,c){const l=a.morphTargetInfluences,h=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,d=h!==void 0?h.length:0;let u=n.get(o);if(u===void 0||u.count!==d){let A=function(){L.dispose(),n.delete(o),o.removeEventListener("dispose",A)};u!==void 0&&u.texture.dispose();const p=o.morphAttributes.position!==void 0,g=o.morphAttributes.normal!==void 0,v=o.morphAttributes.color!==void 0,x=o.morphAttributes.position||[],m=o.morphAttributes.normal||[],_=o.morphAttributes.color||[];let M=0;p===!0&&(M=1),g===!0&&(M=2),v===!0&&(M=3);let S=o.attributes.position.count*M,w=1;S>e.maxTextureSize&&(w=Math.ceil(S/e.maxTextureSize),S=e.maxTextureSize);const E=new Float32Array(S*w*4*d),L=new su(E,S,w,d);L.type=kn,L.needsUpdate=!0;const y=M*4;for(let D=0;D<d;D++){const R=x[D],U=m[D],N=_[D],P=S*w*4*D;for(let F=0;F<R.count;F++){const O=F*y;p===!0&&(r.fromBufferAttribute(R,F),E[P+O+0]=r.x,E[P+O+1]=r.y,E[P+O+2]=r.z,E[P+O+3]=0),g===!0&&(r.fromBufferAttribute(U,F),E[P+O+4]=r.x,E[P+O+5]=r.y,E[P+O+6]=r.z,E[P+O+7]=0),v===!0&&(r.fromBufferAttribute(N,F),E[P+O+8]=r.x,E[P+O+9]=r.y,E[P+O+10]=r.z,E[P+O+11]=N.itemSize===4?r.w:1)}}u={count:d,texture:L,size:new He(S,w)},n.set(o,u),o.addEventListener("dispose",A)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)c.getUniforms().setValue(i,"morphTexture",a.morphTexture,t);else{let p=0;for(let v=0;v<l.length;v++)p+=l[v];const g=o.morphTargetsRelative?1:1-p;c.getUniforms().setValue(i,"morphTargetBaseInfluence",g),c.getUniforms().setValue(i,"morphTargetInfluences",l)}c.getUniforms().setValue(i,"morphTargetsTexture",u.texture,t),c.getUniforms().setValue(i,"morphTargetsTextureSize",u.size)}return{update:s}}function cv(i,e,t,n,r){let s=new WeakMap;function a(l){const h=r.render.frame,d=l.geometry,u=e.get(l,d);if(s.get(u)!==h&&(e.update(u),s.set(u,h)),l.isInstancedMesh&&(l.hasEventListener("dispose",c)===!1&&l.addEventListener("dispose",c),s.get(l)!==h&&(t.update(l.instanceMatrix,i.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,i.ARRAY_BUFFER),s.set(l,h))),l.isSkinnedMesh){const p=l.skeleton;s.get(p)!==h&&(p.update(),s.set(p,h))}return u}function o(){s=new WeakMap}function c(l){const h=l.target;h.removeEventListener("dispose",c),n.releaseStatesOfObject(h),t.remove(h.instanceMatrix),h.instanceColor!==null&&t.remove(h.instanceColor)}return{update:a,dispose:o}}const hv={[Wh]:"LINEAR_TONE_MAPPING",[Vh]:"REINHARD_TONE_MAPPING",[Xh]:"CINEON_TONE_MAPPING",[Yh]:"ACES_FILMIC_TONE_MAPPING",[Kh]:"AGX_TONE_MAPPING",[$h]:"NEUTRAL_TONE_MAPPING",[qh]:"CUSTOM_TONE_MAPPING"};function uv(i,e,t,n,r,s){const a=new En(e,t,{type:i,depthBuffer:r,stencilBuffer:s,samples:n?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1});let o=null,c=null;const l=new Ht;l.setAttribute("position",new Lt([-1,3,0,-1,-1,0,3,-1,0],3)),l.setAttribute("uv",new Lt([0,2,0,0,2,0],2));const h=new ig({uniforms:{tDiffuse:{value:null}},vertexShader:`
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
			}`,depthTest:!1,depthWrite:!1}),d=new Gt(l,h),u=new Ol(-1,1,1,-1,0,1);let p=null,g=null,v=!1,x,m=null,_=[],M=!1;this.setSize=function(S,w){a.setSize(S,w),o!==null&&o.setSize(S,w),c!==null&&c.setSize(S,w);for(let E=0;E<_.length;E++){const L=_[E];L.setSize&&L.setSize(S,w)}},this.setEffects=function(S){_=S,M=_.length>0&&_[0].isRenderPass===!0;const w=a.width,E=a.height;_.length>0&&o===null&&(o=new En(w,E,{type:Xn,depthBuffer:!1,stencilBuffer:!1}),c=new En(w,E,{type:Xn,depthBuffer:!1,stencilBuffer:!1}));for(let L=0;L<_.length;L++){const y=_[L];y.setSize&&y.setSize(w,E)}},this.begin=function(S,w){if(v||S.toneMapping===Wn&&_.length===0)return!1;if(m=w,w!==null){const E=w.width,L=w.height;(a.width!==E||a.height!==L)&&this.setSize(E,L)}return M===!1&&S.setRenderTarget(a),x=S.toneMapping,S.toneMapping=Wn,!0},this.hasRenderPass=function(){return M},this.end=function(S,w){S.toneMapping=x,v=!0;let E=a,L=o;for(let y=0;y<_.length;y++){const A=_[y];A.enabled!==!1&&(A.render(S,L,E,w),A.needsSwap!==!1&&(E=L,L=L===o?c:o))}if(p!==S.outputColorSpace||g!==S.toneMapping){p=S.outputColorSpace,g=S.toneMapping,h.defines={},nt.getTransfer(p)===gt&&(h.defines.SRGB_TRANSFER="");const y=hv[g];y&&(h.defines[y]=""),h.needsUpdate=!0}h.uniforms.tDiffuse.value=E.texture,S.setRenderTarget(m),S.render(d,u),m=null,v=!1},this.isCompositing=function(){return v},this.dispose=function(){a.dispose(),o!==null&&o.dispose(),c!==null&&c.dispose(),l.dispose(),h.dispose()}}const Mu=new tn,al=new br(1,1),Su=new su,yu=new Im,bu=new du,Yc=[],qc=[],Kc=new Float32Array(16),$c=new Float32Array(9),Zc=new Float32Array(4);function Rr(i,e,t){const n=i[0];if(n<=0||n>0)return i;const r=e*t;let s=Yc[r];if(s===void 0&&(s=new Float32Array(r),Yc[r]=s),e!==0){n.toArray(s,0);for(let a=1,o=0;a!==e;++a)o+=t,i[a].toArray(s,o)}return s}function Wt(i,e){if(i.length!==e.length)return!1;for(let t=0,n=i.length;t<n;t++)if(i[t]!==e[t])return!1;return!0}function Vt(i,e){for(let t=0,n=e.length;t<n;t++)i[t]=e[t]}function _a(i,e){let t=qc[e];t===void 0&&(t=new Int32Array(e),qc[e]=t);for(let n=0;n!==e;++n)t[n]=i.allocateTextureUnit();return t}function dv(i,e){const t=this.cache;t[0]!==e&&(i.uniform1f(this.addr,e),t[0]=e)}function fv(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Wt(t,e))return;i.uniform2fv(this.addr,e),Vt(t,e)}}function pv(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(i.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Wt(t,e))return;i.uniform3fv(this.addr,e),Vt(t,e)}}function mv(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Wt(t,e))return;i.uniform4fv(this.addr,e),Vt(t,e)}}function gv(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(Wt(t,e))return;i.uniformMatrix2fv(this.addr,!1,e),Vt(t,e)}else{if(Wt(t,n))return;Zc.set(n),i.uniformMatrix2fv(this.addr,!1,Zc),Vt(t,n)}}function xv(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(Wt(t,e))return;i.uniformMatrix3fv(this.addr,!1,e),Vt(t,e)}else{if(Wt(t,n))return;$c.set(n),i.uniformMatrix3fv(this.addr,!1,$c),Vt(t,n)}}function vv(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(Wt(t,e))return;i.uniformMatrix4fv(this.addr,!1,e),Vt(t,e)}else{if(Wt(t,n))return;Kc.set(n),i.uniformMatrix4fv(this.addr,!1,Kc),Vt(t,n)}}function _v(i,e){const t=this.cache;t[0]!==e&&(i.uniform1i(this.addr,e),t[0]=e)}function Mv(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Wt(t,e))return;i.uniform2iv(this.addr,e),Vt(t,e)}}function Sv(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Wt(t,e))return;i.uniform3iv(this.addr,e),Vt(t,e)}}function yv(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Wt(t,e))return;i.uniform4iv(this.addr,e),Vt(t,e)}}function bv(i,e){const t=this.cache;t[0]!==e&&(i.uniform1ui(this.addr,e),t[0]=e)}function wv(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Wt(t,e))return;i.uniform2uiv(this.addr,e),Vt(t,e)}}function Ev(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Wt(t,e))return;i.uniform3uiv(this.addr,e),Vt(t,e)}}function Av(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Wt(t,e))return;i.uniform4uiv(this.addr,e),Vt(t,e)}}function Tv(i,e,t){const n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r);let s;this.type===i.SAMPLER_2D_SHADOW?(al.compareFunction=t.isReversedDepthBuffer()?Dl:Pl,s=al):s=Mu,t.setTexture2D(e||s,r)}function Rv(i,e,t){const n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),t.setTexture3D(e||yu,r)}function Cv(i,e,t){const n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),t.setTextureCube(e||bu,r)}function Lv(i,e,t){const n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),t.setTexture2DArray(e||Su,r)}function Pv(i){switch(i){case 5126:return dv;case 35664:return fv;case 35665:return pv;case 35666:return mv;case 35674:return gv;case 35675:return xv;case 35676:return vv;case 5124:case 35670:return _v;case 35667:case 35671:return Mv;case 35668:case 35672:return Sv;case 35669:case 35673:return yv;case 5125:return bv;case 36294:return wv;case 36295:return Ev;case 36296:return Av;case 35678:case 36198:case 36298:case 36306:case 35682:return Tv;case 35679:case 36299:case 36307:return Rv;case 35680:case 36300:case 36308:case 36293:return Cv;case 36289:case 36303:case 36311:case 36292:return Lv}}function Dv(i,e){i.uniform1fv(this.addr,e)}function Iv(i,e){const t=Rr(e,this.size,2);i.uniform2fv(this.addr,t)}function Nv(i,e){const t=Rr(e,this.size,3);i.uniform3fv(this.addr,t)}function Uv(i,e){const t=Rr(e,this.size,4);i.uniform4fv(this.addr,t)}function Fv(i,e){const t=Rr(e,this.size,4);i.uniformMatrix2fv(this.addr,!1,t)}function Ov(i,e){const t=Rr(e,this.size,9);i.uniformMatrix3fv(this.addr,!1,t)}function Bv(i,e){const t=Rr(e,this.size,16);i.uniformMatrix4fv(this.addr,!1,t)}function zv(i,e){i.uniform1iv(this.addr,e)}function kv(i,e){i.uniform2iv(this.addr,e)}function Gv(i,e){i.uniform3iv(this.addr,e)}function Hv(i,e){i.uniform4iv(this.addr,e)}function Wv(i,e){i.uniform1uiv(this.addr,e)}function Vv(i,e){i.uniform2uiv(this.addr,e)}function Xv(i,e){i.uniform3uiv(this.addr,e)}function Yv(i,e){i.uniform4uiv(this.addr,e)}function qv(i,e,t){const n=this.cache,r=e.length,s=_a(t,r);Wt(n,s)||(i.uniform1iv(this.addr,s),Vt(n,s));let a;this.type===i.SAMPLER_2D_SHADOW?a=al:a=Mu;for(let o=0;o!==r;++o)t.setTexture2D(e[o]||a,s[o])}function Kv(i,e,t){const n=this.cache,r=e.length,s=_a(t,r);Wt(n,s)||(i.uniform1iv(this.addr,s),Vt(n,s));for(let a=0;a!==r;++a)t.setTexture3D(e[a]||yu,s[a])}function $v(i,e,t){const n=this.cache,r=e.length,s=_a(t,r);Wt(n,s)||(i.uniform1iv(this.addr,s),Vt(n,s));for(let a=0;a!==r;++a)t.setTextureCube(e[a]||bu,s[a])}function Zv(i,e,t){const n=this.cache,r=e.length,s=_a(t,r);Wt(n,s)||(i.uniform1iv(this.addr,s),Vt(n,s));for(let a=0;a!==r;++a)t.setTexture2DArray(e[a]||Su,s[a])}function Jv(i){switch(i){case 5126:return Dv;case 35664:return Iv;case 35665:return Nv;case 35666:return Uv;case 35674:return Fv;case 35675:return Ov;case 35676:return Bv;case 5124:case 35670:return zv;case 35667:case 35671:return kv;case 35668:case 35672:return Gv;case 35669:case 35673:return Hv;case 5125:return Wv;case 36294:return Vv;case 36295:return Xv;case 36296:return Yv;case 35678:case 36198:case 36298:case 36306:case 35682:return qv;case 35679:case 36299:case 36307:return Kv;case 35680:case 36300:case 36308:case 36293:return $v;case 36289:case 36303:case 36311:case 36292:return Zv}}class Qv{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=Pv(t.type)}}class jv{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=Jv(t.type)}}class e_{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){const r=this.seq;for(let s=0,a=r.length;s!==a;++s){const o=r[s];o.setValue(e,t[o.id],n)}}}const ao=/(\w+)(\])?(\[|\.)?/g;function Jc(i,e){i.seq.push(e),i.map[e.id]=e}function t_(i,e,t){const n=i.name,r=n.length;for(ao.lastIndex=0;;){const s=ao.exec(n),a=ao.lastIndex;let o=s[1];const c=s[2]==="]",l=s[3];if(c&&(o=o|0),l===void 0||l==="["&&a+2===r){Jc(t,l===void 0?new Qv(o,i,e):new jv(o,i,e));break}else{let d=t.map[o];d===void 0&&(d=new e_(o),Jc(t,d)),t=d}}}class Xs{constructor(e,t){this.seq=[],this.map={};const n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let a=0;a<n;++a){const o=e.getActiveUniform(t,a),c=e.getUniformLocation(t,o.name);t_(o,c,this)}const r=[],s=[];for(const a of this.seq)a.type===e.SAMPLER_2D_SHADOW||a.type===e.SAMPLER_CUBE_SHADOW||a.type===e.SAMPLER_2D_ARRAY_SHADOW?r.push(a):s.push(a);r.length>0&&(this.seq=r.concat(s))}setValue(e,t,n,r){const s=this.map[t];s!==void 0&&s.setValue(e,n,r)}setOptional(e,t,n){const r=t[n];r!==void 0&&this.setValue(e,n,r)}static upload(e,t,n,r){for(let s=0,a=t.length;s!==a;++s){const o=t[s],c=n[o.id];c.needsUpdate!==!1&&o.setValue(e,c.value,r)}}static seqWithValue(e,t){const n=[];for(let r=0,s=e.length;r!==s;++r){const a=e[r];a.id in t&&n.push(a)}return n}}function Qc(i,e,t){const n=i.createShader(e);return i.shaderSource(n,t),i.compileShader(n),n}const n_=37297;let i_=0;function r_(i,e){const t=i.split(`
`),n=[],r=Math.max(e-6,0),s=Math.min(e+6,t.length);for(let a=r;a<s;a++){const o=a+1;n.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return n.join(`
`)}const jc=new Ve;function s_(i){nt._getMatrix(jc,nt.workingColorSpace,i);const e=`mat3( ${jc.elements.map(t=>t.toFixed(4))} )`;switch(nt.getTransfer(i)){case js:return[e,"LinearTransferOETF"];case gt:return[e,"sRGBTransferOETF"];default:return Ge("WebGLProgram: Unsupported color space: ",i),[e,"LinearTransferOETF"]}}function eh(i,e,t){const n=i.getShaderParameter(e,i.COMPILE_STATUS),s=(i.getShaderInfoLog(e)||"").trim();if(n&&s==="")return"";const a=/ERROR: 0:(\d+)/.exec(s);if(a){const o=parseInt(a[1]);return t.toUpperCase()+`

`+s+`

`+r_(i.getShaderSource(e),o)}else return s}function a_(i,e){const t=s_(e);return[`vec4 ${i}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}const o_={[Wh]:"Linear",[Vh]:"Reinhard",[Xh]:"Cineon",[Yh]:"ACESFilmic",[Kh]:"AgX",[$h]:"Neutral",[qh]:"Custom"};function l_(i,e){const t=o_[e];return t===void 0?(Ge("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+i+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+i+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const Ds=new W;function c_(){nt.getLuminanceCoefficients(Ds);const i=Ds.x.toFixed(4),e=Ds.y.toFixed(4),t=Ds.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function h_(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Vr).join(`
`)}function u_(i){const e=[];for(const t in i){const n=i[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function d_(i,e){const t={},n=i.getProgramParameter(e,i.ACTIVE_ATTRIBUTES);for(let r=0;r<n;r++){const s=i.getActiveAttrib(e,r),a=s.name;let o=1;s.type===i.FLOAT_MAT2&&(o=2),s.type===i.FLOAT_MAT3&&(o=3),s.type===i.FLOAT_MAT4&&(o=4),t[a]={type:s.type,location:i.getAttribLocation(e,a),locationSize:o}}return t}function Vr(i){return i!==""}function th(i,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return i.replace(/NUM_SUN_LIGHTS/g,e.numSunLights).replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,e.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function nh(i,e){return i.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const f_=/^[ \t]*#include +<([\w\d./]+)>/gm;function ol(i){return i.replace(f_,m_)}const p_=new Map;function m_(i,e){let t=je[e];if(t===void 0){const n=p_.get(e);if(n!==void 0)t=je[n],Ge('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+e+">")}return ol(t)}const g_=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function ih(i){return i.replace(g_,x_)}function x_(i,e,t,n){let r="";for(let s=parseInt(e);s<parseInt(t);s++)r+=n.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return r}function rh(i){let e=`precision ${i.precision} float;
	precision ${i.precision} int;
	precision ${i.precision} sampler2D;
	precision ${i.precision} samplerCube;
	precision ${i.precision} sampler3D;
	precision ${i.precision} sampler2DArray;
	precision ${i.precision} sampler2DShadow;
	precision ${i.precision} samplerCubeShadow;
	precision ${i.precision} sampler2DArrayShadow;
	precision ${i.precision} isampler2D;
	precision ${i.precision} isampler3D;
	precision ${i.precision} isamplerCube;
	precision ${i.precision} isampler2DArray;
	precision ${i.precision} usampler2D;
	precision ${i.precision} usampler3D;
	precision ${i.precision} usamplerCube;
	precision ${i.precision} usampler2DArray;
	`;return i.precision==="highp"?e+=`
#define HIGH_PRECISION`:i.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}const v_={[ks]:"SHADOWMAP_TYPE_PCF",[Hr]:"SHADOWMAP_TYPE_VSM"};function __(i){return v_[i.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const M_={[Bi]:"ENVMAP_TYPE_CUBE",[yr]:"ENVMAP_TYPE_CUBE",[xa]:"ENVMAP_TYPE_CUBE_UV"};function S_(i){return i.envMap===!1?"ENVMAP_TYPE_CUBE":M_[i.envMapMode]||"ENVMAP_TYPE_CUBE"}const y_={[yr]:"ENVMAP_MODE_REFRACTION"};function b_(i){return i.envMap===!1?"ENVMAP_MODE_REFLECTION":y_[i.envMapMode]||"ENVMAP_MODE_REFLECTION"}const w_={[Hh]:"ENVMAP_BLENDING_MULTIPLY",[hm]:"ENVMAP_BLENDING_MIX",[um]:"ENVMAP_BLENDING_ADD"};function E_(i){return i.envMap===!1?"ENVMAP_BLENDING_NONE":w_[i.combine]||"ENVMAP_BLENDING_NONE"}function A_(i){const e=i.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:n,maxMip:t}}function T_(i,e,t,n){const r=i.getContext(),s=t.defines;let a=t.vertexShader,o=t.fragmentShader;const c=__(t),l=S_(t),h=b_(t),d=E_(t),u=A_(t),p=h_(t),g=u_(s),v=r.createProgram();let x,m,_=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(x=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(Vr).join(`
`),x.length>0&&(x+=`
`),m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(Vr).join(`
`),m.length>0&&(m+=`
`)):(x=[rh(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexNormals?"#define HAS_NORMAL":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Vr).join(`
`),m=[rh(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+l:"",t.envMap?"#define "+h:"",t.envMap?"#define "+d:"",u?"#define CUBEUV_TEXEL_WIDTH "+u.texelWidth:"",u?"#define CUBEUV_TEXEL_HEIGHT "+u.texelHeight:"",u?"#define CUBEUV_MAX_MIP "+u.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.retroreflection?"#define USE_RETROREFLECTION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas||t.batchingColor?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Wn?"#define TONE_MAPPING":"",t.toneMapping!==Wn?je.tonemapping_pars_fragment:"",t.toneMapping!==Wn?l_("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",je.colorspace_pars_fragment,a_("linearToOutputTexel",t.outputColorSpace),c_(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Vr).join(`
`)),a=ol(a),a=th(a,t),a=nh(a,t),o=ol(o),o=th(o,t),o=nh(o,t),a=ih(a),o=ih(o),t.isRawShaderMaterial!==!0&&(_=`#version 300 es
`,x=[p,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+x,m=["#define varying in",t.glslVersion===fc?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===fc?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+m);const M=_+x+a,S=_+m+o,w=Qc(r,r.VERTEX_SHADER,M),E=Qc(r,r.FRAGMENT_SHADER,S);r.attachShader(v,w),r.attachShader(v,E),t.index0AttributeName!==void 0?r.bindAttribLocation(v,0,t.index0AttributeName):t.hasPositionAttribute===!0&&r.bindAttribLocation(v,0,"position"),r.linkProgram(v);function L(R){if(i.debug.checkShaderErrors){const U=r.getProgramInfoLog(v)||"",N=r.getShaderInfoLog(w)||"",P=r.getShaderInfoLog(E)||"",F=U.trim(),O=N.trim(),V=P.trim();let Q=!0,X=!0;if(r.getProgramParameter(v,r.LINK_STATUS)===!1)if(Q=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(r,v,w,E);else{const te=eh(r,w,"vertex"),B=eh(r,E,"fragment");lt("WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(v,r.VALIDATE_STATUS)+`

Material Name: `+R.name+`
Material Type: `+R.type+`

Program Info Log: `+F+`
`+te+`
`+B)}else F!==""?Ge("WebGLProgram: Program Info Log:",F):(O===""||V==="")&&(X=!1);X&&(R.diagnostics={runnable:Q,programLog:F,vertexShader:{log:O,prefix:x},fragmentShader:{log:V,prefix:m}})}r.deleteShader(w),r.deleteShader(E),y=new Xs(r,v),A=d_(r,v)}let y;this.getUniforms=function(){return y===void 0&&L(this),y};let A;this.getAttributes=function(){return A===void 0&&L(this),A};let D=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return D===!1&&(D=r.getProgramParameter(v,n_)),D},this.destroy=function(){n.releaseStatesOfProgram(this),r.deleteProgram(v),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=i_++,this.cacheKey=e,this.usedTimes=1,this.program=v,this.vertexShader=w,this.fragmentShader=E,this}let R_=0;class C_{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,n){const r=this._getShaderCacheForMaterial(e);return r.has(t)===!1&&(r.add(t),t.usedTimes++),r.has(n)===!1&&(r.add(n),n.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){const t=this.shaderCache;let n=t.get(e);return n===void 0&&(n=new L_(e),t.set(e,n)),n}}class L_{constructor(e){this.id=R_++,this.code=e,this.usedTimes=0}}function P_(i){return i===zi||i===Js||i===Qs}function D_(i,e,t,n,r,s){const a=new au,o=new C_,c=new Set,l=[],h=new Map,d=n.logarithmicDepthBuffer;let u=n.precision;const p={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function g(y){return c.add(y),y===0?"uv":`uv${y}`}function v(y,A,D,R,U,N){const P=R.fog,F=U.geometry,O=y.isMeshStandardMaterial||y.isMeshLambertMaterial||y.isMeshPhongMaterial?R.environment:null,V=y.isMeshStandardMaterial||y.isMeshLambertMaterial&&!y.envMap||y.isMeshPhongMaterial&&!y.envMap,Q=e.get(y.envMap||O,V),X=Q&&Q.mapping===xa?Q.image.height:null,te=p[y.type];y.precision!==null&&(u=n.getMaxPrecision(y.precision),u!==y.precision&&Ge("WebGLProgram.getParameters:",y.precision,"not supported, using",u,"instead."));const B=F.morphAttributes.position||F.morphAttributes.normal||F.morphAttributes.color,ne=B!==void 0?B.length:0;let le=0;F.morphAttributes.position!==void 0&&(le=1),F.morphAttributes.normal!==void 0&&(le=2),F.morphAttributes.color!==void 0&&(le=3);let _e,Ie,ke,ee;if(te){const wt=zn[te];_e=wt.vertexShader,Ie=wt.fragmentShader}else{_e=y.vertexShader,Ie=y.fragmentShader;const wt=o.getVertexShaderStage(y),ht=o.getFragmentShaderStage(y);o.update(y,wt,ht),ke=wt.id,ee=ht.id}const se=i.getRenderTarget(),Y=i.state.buffers.depth.getReversed(),he=U.isInstancedMesh===!0,ae=U.isBatchedMesh===!0,Ee=!!y.map,Ze=!!y.matcap,Ce=!!Q,Fe=!!y.aoMap,qe=!!y.lightMap,Ye=!!y.bumpMap&&y.wireframe===!1,St=!!y.normalMap,Dt=!!y.displacementMap,Xt=!!y.emissiveMap,xt=!!y.metalnessMap,yt=!!y.roughnessMap,G=y.anisotropy>0,Je=y.clearcoat>0,ze=y.dispersion>0,I=y.retroreflectivity>0,b=y.iridescence>0,z=y.sheen>0,q=y.transmission>0,Z=G&&!!y.anisotropyMap,ce=Je&&!!y.clearcoatMap,ue=Je&&!!y.clearcoatNormalMap,j=Je&&!!y.clearcoatRoughnessMap,ie=b&&!!y.iridescenceMap,de=b&&!!y.iridescenceThicknessMap,Le=z&&!!y.sheenColorMap,xe=z&&!!y.sheenRoughnessMap,fe=!!y.specularMap,Ne=!!y.specularColorMap,Be=!!y.specularIntensityMap,Ke=q&&!!y.transmissionMap,H=q&&!!y.thicknessMap,pe=!!y.gradientMap,re=!!y.alphaMap,me=y.alphaTest>0,ye=!!y.alphaHash,oe=!!y.extensions;let Ue=Wn;y.toneMapped&&(se===null||se.isXRRenderTarget===!0)&&(Ue=i.toneMapping);const Pe={shaderID:te,shaderType:y.type,shaderName:y.name,vertexShader:_e,fragmentShader:Ie,defines:y.defines,customVertexShaderID:ke,customFragmentShaderID:ee,isRawShaderMaterial:y.isRawShaderMaterial===!0,glslVersion:y.glslVersion,precision:u,batching:ae,batchingColor:ae&&U._colorsTexture!==null,instancing:he,instancingColor:he&&U.instanceColor!==null,instancingMorph:he&&U.morphTexture!==null,outputColorSpace:se===null?i.outputColorSpace:se.isXRRenderTarget===!0?se.texture.colorSpace:nt.workingColorSpace,alphaToCoverage:!!y.alphaToCoverage,map:Ee,matcap:Ze,envMap:Ce,envMapMode:Ce&&Q.mapping,envMapCubeUVHeight:X,aoMap:Fe,lightMap:qe,bumpMap:Ye,normalMap:St,displacementMap:Dt,emissiveMap:Xt,normalMapObjectSpace:St&&y.normalMapType===pm,normalMapTangentSpace:St&&y.normalMapType===dc,packedNormalMap:St&&y.normalMapType===dc&&P_(y.normalMap.format),metalnessMap:xt,roughnessMap:yt,anisotropy:G,anisotropyMap:Z,clearcoat:Je,clearcoatMap:ce,clearcoatNormalMap:ue,clearcoatRoughnessMap:j,dispersion:ze,retroreflection:I,iridescence:b,iridescenceMap:ie,iridescenceThicknessMap:de,sheen:z,sheenColorMap:Le,sheenRoughnessMap:xe,specularMap:fe,specularColorMap:Ne,specularIntensityMap:Be,transmission:q,transmissionMap:Ke,thicknessMap:H,gradientMap:pe,opaque:y.transparent===!1&&y.blending===pr&&y.alphaToCoverage===!1,alphaMap:re,alphaTest:me,alphaHash:ye,combine:y.combine,mapUv:Ee&&g(y.map.channel),aoMapUv:Fe&&g(y.aoMap.channel),lightMapUv:qe&&g(y.lightMap.channel),bumpMapUv:Ye&&g(y.bumpMap.channel),normalMapUv:St&&g(y.normalMap.channel),displacementMapUv:Dt&&g(y.displacementMap.channel),emissiveMapUv:Xt&&g(y.emissiveMap.channel),metalnessMapUv:xt&&g(y.metalnessMap.channel),roughnessMapUv:yt&&g(y.roughnessMap.channel),anisotropyMapUv:Z&&g(y.anisotropyMap.channel),clearcoatMapUv:ce&&g(y.clearcoatMap.channel),clearcoatNormalMapUv:ue&&g(y.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:j&&g(y.clearcoatRoughnessMap.channel),iridescenceMapUv:ie&&g(y.iridescenceMap.channel),iridescenceThicknessMapUv:de&&g(y.iridescenceThicknessMap.channel),sheenColorMapUv:Le&&g(y.sheenColorMap.channel),sheenRoughnessMapUv:xe&&g(y.sheenRoughnessMap.channel),specularMapUv:fe&&g(y.specularMap.channel),specularColorMapUv:Ne&&g(y.specularColorMap.channel),specularIntensityMapUv:Be&&g(y.specularIntensityMap.channel),transmissionMapUv:Ke&&g(y.transmissionMap.channel),thicknessMapUv:H&&g(y.thicknessMap.channel),alphaMapUv:re&&g(y.alphaMap.channel),vertexTangents:!!F.attributes.tangent&&(St||G),vertexNormals:!!F.attributes.normal,vertexColors:y.vertexColors,vertexAlphas:y.vertexColors===!0&&!!F.attributes.color&&F.attributes.color.itemSize===4,pointsUvs:U.isPoints===!0&&!!F.attributes.uv&&(Ee||re),fog:!!P,useFog:y.fog===!0,fogExp2:!!P&&P.isFogExp2,flatShading:y.wireframe===!1&&(y.flatShading===!0||F.attributes.normal===void 0&&St===!1&&(y.isMeshLambertMaterial||y.isMeshPhongMaterial||y.isMeshStandardMaterial||y.isMeshPhysicalMaterial)),sizeAttenuation:y.sizeAttenuation===!0,logarithmicDepthBuffer:d,reversedDepthBuffer:Y,skinning:U.isSkinnedMesh===!0,hasPositionAttribute:F.attributes.position!==void 0,morphTargets:F.morphAttributes.position!==void 0,morphNormals:F.morphAttributes.normal!==void 0,morphColors:F.morphAttributes.color!==void 0,morphTargetsCount:ne,morphTextureStride:le,numSunLights:A.sun.length,numDirLights:A.directional.length,numPointLights:A.point.length,numSpotLights:A.spot.length,numSpotLightMaps:A.spotLightMap.length,numRectAreaLights:A.rectArea.length,numHemiLights:A.hemi.length,numSunLightShadows:A.sunShadowMap.length,numDirLightShadows:A.directionalShadowMap.length,numPointLightShadows:A.pointShadowMap.length,numSpotLightShadows:A.spotShadowMap.length,numSpotLightShadowsWithMaps:A.numSpotLightShadowsWithMaps,numLightProbes:A.numLightProbes,numLightProbeGrids:N.length,numClippingPlanes:s.numPlanes,numClipIntersection:s.numIntersection,dithering:y.dithering,shadowMapEnabled:i.shadowMap.enabled&&D.length>0,shadowMapType:i.shadowMap.type,toneMapping:Ue,decodeVideoTexture:Ee&&y.map.isVideoTexture===!0&&nt.getTransfer(y.map.colorSpace)===gt,decodeVideoTextureEmissive:Xt&&y.emissiveMap.isVideoTexture===!0&&nt.getTransfer(y.emissiveMap.colorSpace)===gt,premultipliedAlpha:y.premultipliedAlpha,doubleSided:y.side===jn,flipSided:y.side===on,useDepthPacking:y.depthPacking>=0,depthPacking:y.depthPacking||0,index0AttributeName:y.index0AttributeName,extensionClipCullDistance:oe&&y.extensions.clipCullDistance===!0&&t.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(oe&&y.extensions.multiDraw===!0||ae)&&t.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:t.has("KHR_parallel_shader_compile"),customProgramCacheKey:y.customProgramCacheKey()};return Pe.vertexUv1s=c.has(1),Pe.vertexUv2s=c.has(2),Pe.vertexUv3s=c.has(3),c.clear(),Pe}function x(y){const A=[];if(y.shaderID?A.push(y.shaderID):(A.push(y.customVertexShaderID),A.push(y.customFragmentShaderID)),y.defines!==void 0)for(const D in y.defines)A.push(D),A.push(y.defines[D]);return y.isRawShaderMaterial===!1&&(m(A,y),_(A,y),A.push(i.outputColorSpace)),A.push(y.customProgramCacheKey),A.join()}function m(y,A){y.push(A.precision),y.push(A.outputColorSpace),y.push(A.envMapMode),y.push(A.envMapCubeUVHeight),y.push(A.mapUv),y.push(A.alphaMapUv),y.push(A.lightMapUv),y.push(A.aoMapUv),y.push(A.bumpMapUv),y.push(A.normalMapUv),y.push(A.displacementMapUv),y.push(A.emissiveMapUv),y.push(A.metalnessMapUv),y.push(A.roughnessMapUv),y.push(A.anisotropyMapUv),y.push(A.clearcoatMapUv),y.push(A.clearcoatNormalMapUv),y.push(A.clearcoatRoughnessMapUv),y.push(A.iridescenceMapUv),y.push(A.iridescenceThicknessMapUv),y.push(A.sheenColorMapUv),y.push(A.sheenRoughnessMapUv),y.push(A.specularMapUv),y.push(A.specularColorMapUv),y.push(A.specularIntensityMapUv),y.push(A.transmissionMapUv),y.push(A.thicknessMapUv),y.push(A.combine),y.push(A.fogExp2),y.push(A.sizeAttenuation),y.push(A.morphTargetsCount),y.push(A.morphAttributeCount),y.push(A.numSunLights),y.push(A.numDirLights),y.push(A.numPointLights),y.push(A.numSpotLights),y.push(A.numSpotLightMaps),y.push(A.numHemiLights),y.push(A.numRectAreaLights),y.push(A.numSunLightShadows),y.push(A.numDirLightShadows),y.push(A.numPointLightShadows),y.push(A.numSpotLightShadows),y.push(A.numSpotLightShadowsWithMaps),y.push(A.numLightProbes),y.push(A.shadowMapType),y.push(A.toneMapping),y.push(A.numClippingPlanes),y.push(A.numClipIntersection),y.push(A.depthPacking)}function _(y,A){a.disableAll(),A.instancing&&a.enable(0),A.instancingColor&&a.enable(1),A.instancingMorph&&a.enable(2),A.matcap&&a.enable(3),A.envMap&&a.enable(4),A.normalMapObjectSpace&&a.enable(5),A.normalMapTangentSpace&&a.enable(6),A.clearcoat&&a.enable(7),A.iridescence&&a.enable(8),A.alphaTest&&a.enable(9),A.vertexColors&&a.enable(10),A.vertexAlphas&&a.enable(11),A.vertexUv1s&&a.enable(12),A.vertexUv2s&&a.enable(13),A.vertexUv3s&&a.enable(14),A.vertexTangents&&a.enable(15),A.anisotropy&&a.enable(16),A.alphaHash&&a.enable(17),A.batching&&a.enable(18),A.dispersion&&a.enable(19),A.retroreflection&&a.enable(24),A.batchingColor&&a.enable(20),A.gradientMap&&a.enable(21),A.packedNormalMap&&a.enable(22),A.vertexNormals&&a.enable(23),y.push(a.mask),a.disableAll(),A.fog&&a.enable(0),A.useFog&&a.enable(1),A.flatShading&&a.enable(2),A.logarithmicDepthBuffer&&a.enable(3),A.reversedDepthBuffer&&a.enable(4),A.skinning&&a.enable(5),A.morphTargets&&a.enable(6),A.morphNormals&&a.enable(7),A.morphColors&&a.enable(8),A.premultipliedAlpha&&a.enable(9),A.shadowMapEnabled&&a.enable(10),A.doubleSided&&a.enable(11),A.flipSided&&a.enable(12),A.useDepthPacking&&a.enable(13),A.dithering&&a.enable(14),A.transmission&&a.enable(15),A.sheen&&a.enable(16),A.opaque&&a.enable(17),A.pointsUvs&&a.enable(18),A.decodeVideoTexture&&a.enable(19),A.decodeVideoTextureEmissive&&a.enable(20),A.alphaToCoverage&&a.enable(21),A.numLightProbeGrids>0&&a.enable(22),A.hasPositionAttribute&&a.enable(23),y.push(a.mask)}function M(y){const A=p[y.type];let D;if(A){const R=zn[A];D=eg.clone(R.uniforms)}else D=y.uniforms;return D}function S(y,A){let D=h.get(A);return D!==void 0?++D.usedTimes:(D=new T_(i,A,y,r),l.push(D),h.set(A,D)),D}function w(y){if(--y.usedTimes===0){const A=l.indexOf(y);l[A]=l[l.length-1],l.pop(),h.delete(y.cacheKey),y.destroy()}}function E(y){o.remove(y)}function L(){o.dispose()}return{getParameters:v,getProgramCacheKey:x,getUniforms:M,acquireProgram:S,releaseProgram:w,releaseShaderCache:E,programs:l,dispose:L}}function I_(){let i=new WeakMap;function e(a){return i.has(a)}function t(a){let o=i.get(a);return o===void 0&&(o={},i.set(a,o)),o}function n(a){i.delete(a)}function r(a,o,c){i.get(a)[o]=c}function s(){i=new WeakMap}return{has:e,get:t,remove:n,update:r,dispose:s}}function N_(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.material.id!==e.material.id?i.material.id-e.material.id:i.materialVariant!==e.materialVariant?i.materialVariant-e.materialVariant:i.z!==e.z?i.z-e.z:i.id-e.id}function sh(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.z!==e.z?e.z-i.z:i.id-e.id}function ah(){const i=[];let e=0;const t=[],n=[],r=[];function s(){e=0,t.length=0,n.length=0,r.length=0}function a(u){let p=0;return u.isInstancedMesh&&(p+=2),u.isSkinnedMesh&&(p+=1),p}function o(u,p,g,v,x,m){let _=i[e];return _===void 0?(_={id:u.id,object:u,geometry:p,material:g,materialVariant:a(u),groupOrder:v,renderOrder:u.renderOrder,z:x,group:m},i[e]=_):(_.id=u.id,_.object=u,_.geometry=p,_.material=g,_.materialVariant=a(u),_.groupOrder=v,_.renderOrder=u.renderOrder,_.z=x,_.group=m),e++,_}function c(u,p,g,v,x,m,_){_.reversedDepth===!0&&(x=-x);const M=o(u,p,g,v,x,m);g.transmission>0?n.push(M):g.transparent===!0?r.push(M):t.push(M)}function l(u,p,g,v,x,m){const _=o(u,p,g,v,x,m);g.transmission>0?n.unshift(_):g.transparent===!0?r.unshift(_):t.unshift(_)}function h(u,p){t.length>1&&t.sort(u||N_),n.length>1&&n.sort(p||sh),r.length>1&&r.sort(p||sh)}function d(){for(let u=e,p=i.length;u<p;u++){const g=i[u];if(g.id===null)break;g.id=null,g.object=null,g.geometry=null,g.material=null,g.group=null}}return{opaque:t,transmissive:n,transparent:r,init:s,push:c,unshift:l,finish:d,sort:h}}function U_(){let i=new WeakMap;function e(n,r){const s=i.get(n);let a;return s===void 0?(a=new ah,i.set(n,[a])):r>=s.length?(a=new ah,s.push(a)):a=s[r],a}function t(){i=new WeakMap}return{get:e,dispose:t}}function F_(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={direction:new W,color:new et};break;case"SpotLight":t={position:new W,direction:new W,color:new et,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new W,color:new et,distance:0,decay:0};break;case"HemisphereLight":t={direction:new W,skyColor:new et,groundColor:new et};break;case"RectAreaLight":t={color:new et,position:new W,halfWidth:new W,halfHeight:new W};break}return i[e.id]=t,t}}}function O_(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new He};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new He};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new He,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[e.id]=t,t}}}let B_=0;function z_(i,e){return(e.castShadow?2:0)-(i.castShadow?2:0)+(e.map?1:0)-(i.map?1:0)}function k_(i){const e=new F_,t=O_(),n={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)n.probe.push(new W);const r=new W,s=new Pt,a=new Pt;function o(l){let h=0,d=0,u=0;for(let U=0;U<9;U++)n.probe[U].set(0,0,0);let p=0,g=0,v=0,x=0,m=0,_=0,M=0,S=0,w=0,E=0,L=0,y=0,A=0,D=0;l.sort(z_);for(let U=0,N=l.length;U<N;U++){const P=l[U],F=P.color,O=P.intensity,V=P.distance;let Q=null;if(P.shadow&&P.shadow.map&&(P.shadow.map.texture.format===zi?Q=P.shadow.map.texture:Q=P.shadow.map.depthTexture||P.shadow.map.texture),P.isAmbientLight)h+=F.r*O,d+=F.g*O,u+=F.b*O;else if(P.isLightProbe){for(let X=0;X<9;X++)n.probe[X].addScaledVector(P.sh.coefficients[X],O);D++}else if(P.isSunLight){const X=e.get(P);if(X.color.copy(P.color).multiplyScalar(P.intensity),P.castShadow){const te=P.shadow,B=t.get(P);B.shadowIntensity=te.intensity,B.shadowBias=te.bias,B.shadowNormalBias=te.normalBias,B.shadowRadius=te.radius,B.shadowMapSize.copy(te.mapSize).multiply(te.getFrameExtents()),n.sunShadow[g]=B,n.sunShadowMap[g]=Q;const ne=te.getViewportCount();for(let le=0;le<ne;le++)n.sunShadowMatrix[v+le]=te.getMatrix(le),n.sunShadowCascade[v+le]=te._cascadeData[le];v+=ne,g++}n.sun[p]=X,p++}else if(P.isDirectionalLight){const X=e.get(P);if(X.color.copy(P.color).multiplyScalar(P.intensity),P.castShadow){const te=P.shadow,B=t.get(P);B.shadowIntensity=te.intensity,B.shadowBias=te.bias,B.shadowNormalBias=te.normalBias,B.shadowRadius=te.radius,B.shadowMapSize=te.mapSize,n.directionalShadow[x]=B,n.directionalShadowMap[x]=Q,n.directionalShadowMatrix[x]=P.shadow.matrix,w++}n.directional[x]=X,x++}else if(P.isSpotLight){const X=e.get(P);X.position.setFromMatrixPosition(P.matrixWorld),X.color.copy(F).multiplyScalar(O),X.distance=V,X.coneCos=Math.cos(P.angle),X.penumbraCos=Math.cos(P.angle*(1-P.penumbra)),X.decay=P.decay,n.spot[_]=X;const te=P.shadow;if(P.map&&(n.spotLightMap[y]=P.map,y++,te.updateMatrices(P),P.castShadow&&A++),n.spotLightMatrix[_]=te.matrix,P.castShadow){const B=t.get(P);B.shadowIntensity=te.intensity,B.shadowBias=te.bias,B.shadowNormalBias=te.normalBias,B.shadowRadius=te.radius,B.shadowMapSize=te.mapSize,n.spotShadow[_]=B,n.spotShadowMap[_]=Q,L++}_++}else if(P.isRectAreaLight){const X=e.get(P);X.color.copy(F).multiplyScalar(O),X.halfWidth.set(P.width*.5,0,0),X.halfHeight.set(0,P.height*.5,0),n.rectArea[M]=X,M++}else if(P.isPointLight){const X=e.get(P);if(X.color.copy(P.color).multiplyScalar(P.intensity),X.distance=P.distance,X.decay=P.decay,P.castShadow){const te=P.shadow,B=t.get(P);B.shadowIntensity=te.intensity,B.shadowBias=te.bias,B.shadowNormalBias=te.normalBias,B.shadowRadius=te.radius,B.shadowMapSize=te.mapSize,B.shadowCameraNear=te.camera.near,B.shadowCameraFar=te.camera.far,n.pointShadow[m]=B,n.pointShadowMap[m]=Q,n.pointShadowMatrix[m]=P.shadow.matrix,E++}n.point[m]=X,m++}else if(P.isHemisphereLight){const X=e.get(P);X.skyColor.copy(P.color).multiplyScalar(O),X.groundColor.copy(P.groundColor).multiplyScalar(O),n.hemi[S]=X,S++}}M>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=ve.LTC_FLOAT_1,n.rectAreaLTC2=ve.LTC_FLOAT_2):(n.rectAreaLTC1=ve.LTC_HALF_1,n.rectAreaLTC2=ve.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=d,n.ambient[2]=u;const R=n.hash;(R.sunLength!==p||R.directionalLength!==x||R.pointLength!==m||R.spotLength!==_||R.rectAreaLength!==M||R.hemiLength!==S||R.numSunShadows!==g||R.numDirectionalShadows!==w||R.numPointShadows!==E||R.numSpotShadows!==L||R.numSpotMaps!==y||R.numLightProbes!==D)&&(n.sun.length=p,n.directional.length=x,n.spot.length=_,n.rectArea.length=M,n.point.length=m,n.hemi.length=S,n.sunShadow.length=g,n.sunShadowMap.length=g,n.sunShadowMatrix.length=v,n.sunShadowCascade.length=v,n.directionalShadow.length=w,n.directionalShadowMap.length=w,n.directionalShadowMatrix.length=w,n.pointShadow.length=E,n.pointShadowMap.length=E,n.pointShadowMatrix.length=E,n.spotShadow.length=L,n.spotShadowMap.length=L,n.spotLightMatrix.length=L+y-A,n.spotLightMap.length=y,n.numSpotLightShadowsWithMaps=A,n.numLightProbes=D,R.sunLength=p,R.directionalLength=x,R.pointLength=m,R.spotLength=_,R.rectAreaLength=M,R.hemiLength=S,R.numSunShadows=g,R.numDirectionalShadows=w,R.numPointShadows=E,R.numSpotShadows=L,R.numSpotMaps=y,R.numLightProbes=D,n.version=B_++)}function c(l,h){let d=0,u=0,p=0,g=0,v=0,x=0;const m=h.matrixWorldInverse;for(let _=0,M=l.length;_<M;_++){const S=l[_];if(S.isSunLight){const w=n.sun[d];w.direction.setFromMatrixPosition(S.matrixWorld),w.direction.transformDirection(m),d++}else if(S.isDirectionalLight){const w=n.directional[u];w.direction.setFromMatrixPosition(S.matrixWorld),r.setFromMatrixPosition(S.target.matrixWorld),w.direction.sub(r),w.direction.transformDirection(m),u++}else if(S.isSpotLight){const w=n.spot[g];w.position.setFromMatrixPosition(S.matrixWorld),w.position.applyMatrix4(m),w.direction.setFromMatrixPosition(S.matrixWorld),r.setFromMatrixPosition(S.target.matrixWorld),w.direction.sub(r),w.direction.transformDirection(m),g++}else if(S.isRectAreaLight){const w=n.rectArea[v];w.position.setFromMatrixPosition(S.matrixWorld),w.position.applyMatrix4(m),a.identity(),s.copy(S.matrixWorld),s.premultiply(m),a.extractRotation(s),w.halfWidth.set(S.width*.5,0,0),w.halfHeight.set(0,S.height*.5,0),w.halfWidth.applyMatrix4(a),w.halfHeight.applyMatrix4(a),v++}else if(S.isPointLight){const w=n.point[p];w.position.setFromMatrixPosition(S.matrixWorld),w.position.applyMatrix4(m),p++}else if(S.isHemisphereLight){const w=n.hemi[x];w.direction.setFromMatrixPosition(S.matrixWorld),w.direction.transformDirection(m),x++}}}return{setup:o,setupView:c,state:n}}function oh(i){const e=new k_(i),t=[],n=[],r=[];function s(u){d.camera=u,t.length=0,n.length=0,r.length=0}function a(u){t.push(u)}function o(u){n.push(u)}function c(u){r.push(u)}function l(){e.setup(t)}function h(u){e.setupView(t,u)}const d={lightsArray:t,shadowsArray:n,lightProbeGridArray:r,camera:null,lights:e,transmissionRenderTarget:{},textureUnits:0};return{init:s,state:d,setupLights:l,setupLightsView:h,pushLight:a,pushShadow:o,pushLightProbeGrid:c}}function G_(i){let e=new WeakMap;function t(r,s=0){const a=e.get(r);let o;return a===void 0?(o=new oh(i),e.set(r,[o])):s>=a.length?(o=new oh(i),a.push(o)):o=a[s],o}function n(){e=new WeakMap}return{get:t,dispose:n}}const H_=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,W_=`uniform sampler2D shadow_pass;
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
}`,V_=[new W(1,0,0),new W(-1,0,0),new W(0,1,0),new W(0,-1,0),new W(0,0,1),new W(0,0,-1)],X_=[new W(0,-1,0),new W(0,-1,0),new W(0,0,1),new W(0,0,-1),new W(0,-1,0),new W(0,-1,0)],lh=new Pt,kr=new W,oo=new W;function Y_(i,e,t){let n=new na;const r=new He,s=new He,a=new rt,o=new rg,c=new sg,l={},h=t.maxTextureSize,d={[Oi]:on,[on]:Oi,[jn]:jn},u=new Mt({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new He},radius:{value:4}},vertexShader:H_,fragmentShader:W_}),p=u.clone();p.defines.HORIZONTAL_PASS=1;const g=new Ht;g.setAttribute("position",new xn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const v=new Gt(g,u),x=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=ks;let m=this.type;this.render=function(E,L,y){if(x.enabled===!1||x.autoUpdate===!1&&x.needsUpdate===!1||E.length===0)return;this.type===K0&&(Ge("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."),this.type=ks);const A=i.getRenderTarget(),D=i.getActiveCubeFace(),R=i.getActiveMipmapLevel(),U=i.state;U.setBlending(Hn),U.buffers.depth.getReversed()===!0?U.buffers.color.setClear(0,0,0,0):U.buffers.color.setClear(1,1,1,1),U.buffers.depth.setTest(!0),U.setScissorTest(!1);const N=m!==this.type;N&&L.traverse(function(P){P.material&&(Array.isArray(P.material)?P.material.forEach(F=>F.needsUpdate=!0):P.material.needsUpdate=!0)});for(let P=0,F=E.length;P<F;P++){const O=E[P],V=O.shadow;if(V===void 0){Ge("WebGLShadowMap:",O,"has no shadow.");continue}if(V.autoUpdate===!1&&V.needsUpdate===!1)continue;r.copy(V.mapSize);const Q=V.getFrameExtents();r.multiply(Q),s.copy(V.mapSize),(r.x>h||r.y>h)&&(r.x>h&&(s.x=Math.floor(h/Q.x),r.x=s.x*Q.x,V.mapSize.x=s.x),r.y>h&&(s.y=Math.floor(h/Q.y),r.y=s.y*Q.y,V.mapSize.y=s.y));const X=i.state.buffers.depth.getReversed();if(V.camera._reversedDepth=X,V.map===null||N===!0){if(V.map!==null&&(V.map.depthTexture!==null&&(V.map.depthTexture.dispose(),V.map.depthTexture=null),V.map.dispose()),this.type===Hr){if(O.isPointLight){Ge("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}V.map=new En(r.x,r.y,{format:zi,type:Xn,minFilter:Nt,magFilter:Nt,generateMipmaps:!1}),V.map.texture.name=O.name+".shadowMap",V.map.depthTexture=new br(r.x,r.y,kn),V.map.depthTexture.name=O.name+".shadowMapDepth",V.map.depthTexture.format=ii,V.map.depthTexture.compareFunction=null,V.map.depthTexture.minFilter=Ut,V.map.depthTexture.magFilter=Ut}else O.isPointLight?(V.map=new _u(r.x),V.map.depthTexture=new Qm(r.x,Vn)):(V.map=new En(r.x,r.y),V.map.depthTexture=new br(r.x,r.y,Vn)),V.map.depthTexture.name=O.name+".shadowMap",V.map.depthTexture.format=ii,this.type===ks?(V.map.depthTexture.compareFunction=X?Dl:Pl,V.map.depthTexture.minFilter=Nt,V.map.depthTexture.magFilter=Nt):(V.map.depthTexture.compareFunction=null,V.map.depthTexture.minFilter=Ut,V.map.depthTexture.magFilter=Ut);V.camera.updateProjectionMatrix()}V.map.isWebGLCubeRenderTarget!==!0&&(V.map.width!==r.x||V.map.height!==r.y)&&V.map.setSize(r.x,r.y);const te=V.map.isWebGLCubeRenderTarget?6:V.getViewportCount();O.isPointLight!==!0&&V.updateMatrices(O,y);for(let B=0;B<te;B++){const ne=V.getCamera(B);if(O.isPointLight){const le=V.camera,_e=V.matrix,Ie=O.distance||le.far;Ie!==le.far&&(le.far=Ie,le.updateProjectionMatrix()),kr.setFromMatrixPosition(O.matrixWorld),le.position.copy(kr),oo.copy(le.position),oo.add(V_[B]),le.up.copy(X_[B]),le.lookAt(oo),le.updateMatrixWorld(),_e.makeTranslation(-kr.x,-kr.y,-kr.z),lh.multiplyMatrices(le.projectionMatrix,le.matrixWorldInverse),V._frustum.setFromProjectionMatrix(lh,le.coordinateSystem,le.reversedDepth)}if(V.map.isWebGLCubeRenderTarget)i.setRenderTarget(V.map,B),i.clear();else{B===0&&(i.setRenderTarget(V.map),i.clear());const le=V.getViewport(B);a.set(s.x*le.x,s.y*le.y,s.x*le.z,s.y*le.w),U.viewport(a)}n=V.getFrustum(B),S(L,y,ne,O,this.type)}V.isPointLightShadow!==!0&&this.type===Hr&&_(V,y),V.needsUpdate=!1}m=this.type,x.needsUpdate=!1,i.setRenderTarget(A,D,R)};function _(E,L){const y=e.update(v);u.defines.VSM_SAMPLES!==E.blurSamples&&(u.defines.VSM_SAMPLES=E.blurSamples,p.defines.VSM_SAMPLES=E.blurSamples,u.needsUpdate=!0,p.needsUpdate=!0),E.mapPass===null?E.mapPass=new En(r.x,r.y,{format:zi,type:Xn}):(E.mapPass.width!==E.map.width||E.mapPass.height!==E.map.height)&&E.mapPass.setSize(E.map.width,E.map.height),u.uniforms.shadow_pass.value=E.map.depthTexture,u.uniforms.resolution.value.set(E.map.width,E.map.height),u.uniforms.radius.value=E.radius,i.setRenderTarget(E.mapPass),i.clear(),i.renderBufferDirect(L,null,y,u,v,null),p.uniforms.shadow_pass.value=E.mapPass.texture,p.uniforms.resolution.value.set(E.map.width,E.map.height),p.uniforms.radius.value=E.radius,i.setRenderTarget(E.map),i.clear(),i.renderBufferDirect(L,null,y,p,v,null)}function M(E,L,y,A){let D=null;const R=y.isPointLight===!0?E.customDistanceMaterial:E.customDepthMaterial;if(R!==void 0)D=R;else if(D=y.isPointLight===!0?c:o,i.localClippingEnabled&&L.clipShadows===!0&&Array.isArray(L.clippingPlanes)&&L.clippingPlanes.length!==0||L.displacementMap&&L.displacementScale!==0||L.alphaMap&&L.alphaTest>0||L.map&&L.alphaTest>0||L.alphaToCoverage===!0){const U=D.uuid,N=L.uuid;let P=l[U];P===void 0&&(P={},l[U]=P);let F=P[N];F===void 0&&(F=D.clone(),P[N]=F,L.addEventListener("dispose",w)),D=F}if(D.visible=L.visible,D.wireframe=L.wireframe,A===Hr?D.side=L.shadowSide!==null?L.shadowSide:L.side:D.side=L.shadowSide!==null?L.shadowSide:d[L.side],D.alphaMap=L.alphaMap,D.alphaTest=L.alphaToCoverage===!0?.5:L.alphaTest,D.map=L.map,D.clipShadows=L.clipShadows,D.clippingPlanes=L.clippingPlanes,D.clipIntersection=L.clipIntersection,D.displacementMap=L.displacementMap,D.displacementScale=L.displacementScale,D.displacementBias=L.displacementBias,D.wireframeLinewidth=L.wireframeLinewidth,D.linewidth=L.linewidth,y.isPointLight===!0&&D.isMeshDistanceMaterial===!0){const U=i.properties.get(D);U.light=y}return D}function S(E,L,y,A,D){if(E.visible===!1)return;if(E.layers.test(L.layers)&&(E.isMesh||E.isLine||E.isPoints)&&(E.castShadow||E.receiveShadow&&D===Hr)&&(!E.frustumCulled||E.intersectsFrustum(n))){E.modelViewMatrix.multiplyMatrices(y.matrixWorldInverse,E.matrixWorld);const N=e.update(E),P=E.material;if(Array.isArray(P)){const F=N.groups;for(let O=0,V=F.length;O<V;O++){const Q=F[O],X=P[Q.materialIndex];if(X&&X.visible){const te=M(E,X,A,D);E.onBeforeShadow(i,E,L,y,N,te,Q),i.renderBufferDirect(y,null,N,te,E,Q),E.onAfterShadow(i,E,L,y,N,te,Q)}}}else if(P.visible){const F=M(E,P,A,D);E.onBeforeShadow(i,E,L,y,N,F,null),i.renderBufferDirect(y,null,N,F,E,null),E.onAfterShadow(i,E,L,y,N,F,null)}}const U=E.children;for(let N=0,P=U.length;N<P;N++)S(U[N],L,y,A,D)}function w(E){E.target.removeEventListener("dispose",w);for(const y in l){const A=l[y],D=E.target.uuid;D in A&&(A[D].dispose(),delete A[D])}}}function q_(i,e){function t(){let H=!1;const pe=new rt;let re=null;const me=new rt(0,0,0,0);return{setMask:function(ye){re!==ye&&!H&&(i.colorMask(ye,ye,ye,ye),re=ye)},setLocked:function(ye){H=ye},setClear:function(ye,oe,Ue,Pe,wt){wt===!0&&(ye*=Pe,oe*=Pe,Ue*=Pe),pe.set(ye,oe,Ue,Pe),me.equals(pe)===!1&&(i.clearColor(ye,oe,Ue,Pe),me.copy(pe))},reset:function(){H=!1,re=null,me.set(-1,0,0,0)}}}function n(){let H=!1,pe=!1,re=null,me=null,ye=null;return{setReversed:function(oe){if(pe!==oe){const Ue=e.get("EXT_clip_control");oe?Ue.clipControlEXT(Ue.LOWER_LEFT_EXT,Ue.ZERO_TO_ONE_EXT):Ue.clipControlEXT(Ue.LOWER_LEFT_EXT,Ue.NEGATIVE_ONE_TO_ONE_EXT),pe=oe;const Pe=ye;ye=null,this.setClear(Pe)}},getReversed:function(){return pe},setTest:function(oe){oe?se(i.DEPTH_TEST):Y(i.DEPTH_TEST)},setMask:function(oe){re!==oe&&!H&&(i.depthMask(oe),re=oe)},setFunc:function(oe){if(pe&&(oe=Am[oe]),me!==oe){switch(oe){case Mo:i.depthFunc(i.NEVER);break;case So:i.depthFunc(i.ALWAYS);break;case yo:i.depthFunc(i.LESS);break;case Yr:i.depthFunc(i.LEQUAL);break;case bo:i.depthFunc(i.EQUAL);break;case wo:i.depthFunc(i.GEQUAL);break;case Zs:i.depthFunc(i.GREATER);break;case Eo:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}me=oe}},setLocked:function(oe){H=oe},setClear:function(oe){ye!==oe&&(ye=oe,pe&&(oe=1-oe),i.clearDepth(oe))},reset:function(){H=!1,re=null,me=null,ye=null,pe=!1}}}function r(){let H=!1,pe=null,re=null,me=null,ye=null,oe=null,Ue=null,Pe=null,wt=null;return{setTest:function(ht){H||(ht?se(i.STENCIL_TEST):Y(i.STENCIL_TEST))},setMask:function(ht){pe!==ht&&!H&&(i.stencilMask(ht),pe=ht)},setFunc:function(ht,Tn,Un){(re!==ht||me!==Tn||ye!==Un)&&(i.stencilFunc(ht,Tn,Un),re=ht,me=Tn,ye=Un)},setOp:function(ht,Tn,Un){(oe!==ht||Ue!==Tn||Pe!==Un)&&(i.stencilOp(ht,Tn,Un),oe=ht,Ue=Tn,Pe=Un)},setLocked:function(ht){H=ht},setClear:function(ht){wt!==ht&&(i.clearStencil(ht),wt=ht)},reset:function(){H=!1,pe=null,re=null,me=null,ye=null,oe=null,Ue=null,Pe=null,wt=null}}}const s=new t,a=new n,o=new r,c=new WeakMap,l=new WeakMap;let h={},d={},u={},p=new WeakMap,g=[],v=null,x=!1,m=null,_=null,M=null,S=null,w=null,E=null,L=null,y=new et(0,0,0),A=0,D=!1,R=null,U=null,N=null,P=null,F=null;const O=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let V=!1,Q=0;const X=i.getParameter(i.VERSION);X.indexOf("WebGL")!==-1?(Q=parseFloat(/^WebGL (\d)/.exec(X)[1]),V=Q>=1):X.indexOf("OpenGL ES")!==-1&&(Q=parseFloat(/^OpenGL ES (\d)/.exec(X)[1]),V=Q>=2);let te=null,B={};const ne=i.getParameter(i.SCISSOR_BOX),le=i.getParameter(i.VIEWPORT),_e=new rt().fromArray(ne),Ie=new rt().fromArray(le);function ke(H,pe,re,me){const ye=new Uint8Array(4),oe=i.createTexture();i.bindTexture(H,oe),i.texParameteri(H,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(H,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let Ue=0;Ue<re;Ue++)H===i.TEXTURE_3D||H===i.TEXTURE_2D_ARRAY?i.texImage3D(pe,0,i.RGBA,1,1,me,0,i.RGBA,i.UNSIGNED_BYTE,ye):i.texImage2D(pe+Ue,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,ye);return oe}const ee={};ee[i.TEXTURE_2D]=ke(i.TEXTURE_2D,i.TEXTURE_2D,1),ee[i.TEXTURE_CUBE_MAP]=ke(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),ee[i.TEXTURE_2D_ARRAY]=ke(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),ee[i.TEXTURE_3D]=ke(i.TEXTURE_3D,i.TEXTURE_3D,1,1),s.setClear(0,0,0,1),a.setClear(1),o.setClear(0),se(i.DEPTH_TEST),a.setFunc(Yr),Ye(!1),St(cc),se(i.CULL_FACE),Fe(Hn);function se(H){h[H]!==!0&&(i.enable(H),h[H]=!0)}function Y(H){h[H]!==!1&&(i.disable(H),h[H]=!1)}function he(H,pe){return u[H]!==pe?(i.bindFramebuffer(H,pe),u[H]=pe,H===i.DRAW_FRAMEBUFFER&&(u[i.FRAMEBUFFER]=pe),H===i.FRAMEBUFFER&&(u[i.DRAW_FRAMEBUFFER]=pe),!0):!1}function ae(H,pe){let re=g,me=!1;if(H){re=p.get(pe),re===void 0&&(re=[],p.set(pe,re));const ye=H.textures;if(re.length!==ye.length||re[0]!==i.COLOR_ATTACHMENT0){for(let oe=0,Ue=ye.length;oe<Ue;oe++)re[oe]=i.COLOR_ATTACHMENT0+oe;re.length=ye.length,me=!0}}else re[0]!==i.BACK&&(re[0]=i.BACK,me=!0);me&&i.drawBuffers(re)}function Ee(H){return v!==H?(i.useProgram(H),v=H,!0):!1}const Ze={[lr]:i.FUNC_ADD,[$0]:i.FUNC_SUBTRACT,[Z0]:i.FUNC_REVERSE_SUBTRACT};Ze[J0]=i.MIN,Ze[Q0]=i.MAX;const Ce={[Sl]:i.ZERO,[j0]:i.ONE,[yl]:i.SRC_COLOR,[bl]:i.SRC_ALPHA,[sm]:i.SRC_ALPHA_SATURATE,[im]:i.DST_COLOR,[tm]:i.DST_ALPHA,[em]:i.ONE_MINUS_SRC_COLOR,[wl]:i.ONE_MINUS_SRC_ALPHA,[rm]:i.ONE_MINUS_DST_COLOR,[nm]:i.ONE_MINUS_DST_ALPHA,[am]:i.CONSTANT_COLOR,[om]:i.ONE_MINUS_CONSTANT_COLOR,[lm]:i.CONSTANT_ALPHA,[cm]:i.ONE_MINUS_CONSTANT_ALPHA};function Fe(H,pe,re,me,ye,oe,Ue,Pe,wt,ht){if(H===Hn){x===!0&&(Y(i.BLEND),x=!1);return}if(x===!1&&(se(i.BLEND),x=!0),H!==ga){if(H!==m||ht!==D){if((_!==lr||w!==lr)&&(i.blendEquation(i.FUNC_ADD),_=lr,w=lr),ht)switch(H){case pr:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Sr:i.blendFunc(i.ONE,i.ONE);break;case hc:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case uc:i.blendFuncSeparate(i.DST_COLOR,i.ONE_MINUS_SRC_ALPHA,i.ZERO,i.ONE);break;default:lt("WebGLState: Invalid blending: ",H);break}else switch(H){case pr:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Sr:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE,i.ONE,i.ONE);break;case hc:lt("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case uc:lt("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:lt("WebGLState: Invalid blending: ",H);break}M=null,S=null,E=null,L=null,y.set(0,0,0),A=0,m=H,D=ht}return}ye=ye||pe,oe=oe||re,Ue=Ue||me,(pe!==_||ye!==w)&&(i.blendEquationSeparate(Ze[pe],Ze[ye]),_=pe,w=ye),(re!==M||me!==S||oe!==E||Ue!==L)&&(i.blendFuncSeparate(Ce[re],Ce[me],Ce[oe],Ce[Ue]),M=re,S=me,E=oe,L=Ue),(Pe.equals(y)===!1||wt!==A)&&(i.blendColor(Pe.r,Pe.g,Pe.b,wt),y.copy(Pe),A=wt),m=H,D=!1}function qe(H,pe){H.side===jn?Y(i.CULL_FACE):se(i.CULL_FACE);let re=H.side===on;pe&&(re=!re),Ye(re),H.blending===pr&&H.transparent===!1?Fe(Hn):Fe(H.blending,H.blendEquation,H.blendSrc,H.blendDst,H.blendEquationAlpha,H.blendSrcAlpha,H.blendDstAlpha,H.blendColor,H.blendAlpha,H.premultipliedAlpha),a.setFunc(H.depthFunc),a.setTest(H.depthTest),a.setMask(H.depthWrite),s.setMask(H.colorWrite);const me=H.stencilWrite;o.setTest(me),me&&(o.setMask(H.stencilWriteMask),o.setFunc(H.stencilFunc,H.stencilRef,H.stencilFuncMask),o.setOp(H.stencilFail,H.stencilZFail,H.stencilZPass)),Xt(H.polygonOffset,H.polygonOffsetFactor,H.polygonOffsetUnits),H.alphaToCoverage===!0?se(i.SAMPLE_ALPHA_TO_COVERAGE):Y(i.SAMPLE_ALPHA_TO_COVERAGE)}function Ye(H){R!==H&&(H?i.frontFace(i.CW):i.frontFace(i.CCW),R=H)}function St(H){H!==Y0?(se(i.CULL_FACE),H!==U&&(H===cc?i.cullFace(i.BACK):H===q0?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):Y(i.CULL_FACE),U=H}function Dt(H){H!==N&&(V&&i.lineWidth(H),N=H)}function Xt(H,pe,re){H?(se(i.POLYGON_OFFSET_FILL),(P!==pe||F!==re)&&(P=pe,F=re,a.getReversed()&&(pe=-pe),i.polygonOffset(pe,re))):Y(i.POLYGON_OFFSET_FILL)}function xt(H){H?se(i.SCISSOR_TEST):Y(i.SCISSOR_TEST)}function yt(H){H===void 0&&(H=i.TEXTURE0+O-1),te!==H&&(i.activeTexture(H),te=H)}function G(H,pe,re){re===void 0&&(te===null?re=i.TEXTURE0+O-1:re=te);let me=B[re];me===void 0&&(me={type:void 0,texture:void 0},B[re]=me),(me.type!==H||me.texture!==pe)&&(te!==re&&(i.activeTexture(re),te=re),i.bindTexture(H,pe||ee[H]),me.type=H,me.texture=pe)}function Je(){const H=B[te];H!==void 0&&H.type!==void 0&&(i.bindTexture(H.type,null),H.type=void 0,H.texture=void 0)}function ze(){try{i.compressedTexImage2D(...arguments)}catch(H){lt("WebGLState:",H)}}function I(){try{i.compressedTexImage3D(...arguments)}catch(H){lt("WebGLState:",H)}}function b(){try{i.texSubImage2D(...arguments)}catch(H){lt("WebGLState:",H)}}function z(){try{i.texSubImage3D(...arguments)}catch(H){lt("WebGLState:",H)}}function q(){try{i.compressedTexSubImage2D(...arguments)}catch(H){lt("WebGLState:",H)}}function Z(){try{i.compressedTexSubImage3D(...arguments)}catch(H){lt("WebGLState:",H)}}function ce(){try{i.texStorage2D(...arguments)}catch(H){lt("WebGLState:",H)}}function ue(){try{i.texStorage3D(...arguments)}catch(H){lt("WebGLState:",H)}}function j(){try{i.texImage2D(...arguments)}catch(H){lt("WebGLState:",H)}}function ie(){try{i.texImage3D(...arguments)}catch(H){lt("WebGLState:",H)}}function de(H){return d[H]!==void 0?d[H]:i.getParameter(H)}function Le(H,pe){d[H]!==pe&&(i.pixelStorei(H,pe),d[H]=pe)}function xe(H){_e.equals(H)===!1&&(i.scissor(H.x,H.y,H.z,H.w),_e.copy(H))}function fe(H){Ie.equals(H)===!1&&(i.viewport(H.x,H.y,H.z,H.w),Ie.copy(H))}function Ne(H,pe){let re=l.get(pe);re===void 0&&(re=new WeakMap,l.set(pe,re));let me=re.get(H);me===void 0&&(me=i.getUniformBlockIndex(pe,H.name),re.set(H,me))}function Be(H,pe){const me=l.get(pe).get(H);c.get(pe)!==me&&(i.uniformBlockBinding(pe,me,H.__bindingPointIndex),c.set(pe,me))}function Ke(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),a.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),i.pixelStorei(i.PACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,!1),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,i.BROWSER_DEFAULT_WEBGL),i.pixelStorei(i.PACK_ROW_LENGTH,0),i.pixelStorei(i.PACK_SKIP_PIXELS,0),i.pixelStorei(i.PACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_ROW_LENGTH,0),i.pixelStorei(i.UNPACK_IMAGE_HEIGHT,0),i.pixelStorei(i.UNPACK_SKIP_PIXELS,0),i.pixelStorei(i.UNPACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_SKIP_IMAGES,0),h={},d={},te=null,B={},u={},p=new WeakMap,g=[],v=null,x=!1,m=null,_=null,M=null,S=null,w=null,E=null,L=null,y=new et(0,0,0),A=0,D=!1,R=null,U=null,N=null,P=null,F=null,_e.set(0,0,i.canvas.width,i.canvas.height),Ie.set(0,0,i.canvas.width,i.canvas.height),s.reset(),a.reset(),o.reset()}return{buffers:{color:s,depth:a,stencil:o},enable:se,disable:Y,bindFramebuffer:he,drawBuffers:ae,useProgram:Ee,setBlending:Fe,setMaterial:qe,setFlipSided:Ye,setCullFace:St,setLineWidth:Dt,setPolygonOffset:Xt,setScissorTest:xt,activeTexture:yt,bindTexture:G,unbindTexture:Je,compressedTexImage2D:ze,compressedTexImage3D:I,texImage2D:j,texImage3D:ie,pixelStorei:Le,getParameter:de,updateUBOMapping:Ne,uniformBlockBinding:Be,texStorage2D:ce,texStorage3D:ue,texSubImage2D:b,texSubImage3D:z,compressedTexSubImage2D:q,compressedTexSubImage3D:Z,scissor:xe,viewport:fe,reset:Ke}}function K_(i,e,t,n,r,s,a){const o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new He,h=new WeakMap,d=new Set;let u;const p=new WeakMap;let g=!1;try{g=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function v(I,b){return g?new OffscreenCanvas(I,b):ta("canvas")}function x(I,b,z){let q=1;const Z=ze(I);if((Z.width>z||Z.height>z)&&(q=z/Math.max(Z.width,Z.height)),q<1)if(typeof HTMLImageElement<"u"&&I instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&I instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&I instanceof ImageBitmap||typeof VideoFrame<"u"&&I instanceof VideoFrame){const ce=Math.floor(q*Z.width),ue=Math.floor(q*Z.height);u===void 0&&(u=v(ce,ue));const j=b?v(ce,ue):u;return j.width=ce,j.height=ue,j.getContext("2d").drawImage(I,0,0,ce,ue),Ge("WebGLRenderer: Texture has been resized from ("+Z.width+"x"+Z.height+") to ("+ce+"x"+ue+")."),j}else return"data"in I&&Ge("WebGLRenderer: Image in DataTexture is too big ("+Z.width+"x"+Z.height+")."),I;return I}function m(I){return I.generateMipmaps}function _(I){i.generateMipmap(I)}function M(I){return I.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:I.isWebGL3DRenderTarget?i.TEXTURE_3D:I.isWebGLArrayRenderTarget||I.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function S(I,b,z,q,Z,ce=!1){if(I!==null){if(i[I]!==void 0)return i[I];Ge("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+I+"'")}let ue;q&&(ue=e.get("EXT_texture_norm16"),ue||Ge("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let j=b;if(b===i.RED&&(z===i.FLOAT&&(j=i.R32F),z===i.HALF_FLOAT&&(j=i.R16F),z===i.UNSIGNED_BYTE&&(j=i.R8),z===i.UNSIGNED_SHORT&&ue&&(j=ue.R16_EXT),z===i.SHORT&&ue&&(j=ue.R16_SNORM_EXT)),b===i.RED_INTEGER&&(z===i.UNSIGNED_BYTE&&(j=i.R8UI),z===i.UNSIGNED_SHORT&&(j=i.R16UI),z===i.UNSIGNED_INT&&(j=i.R32UI),z===i.BYTE&&(j=i.R8I),z===i.SHORT&&(j=i.R16I),z===i.INT&&(j=i.R32I)),b===i.RG&&(z===i.FLOAT&&(j=i.RG32F),z===i.HALF_FLOAT&&(j=i.RG16F),z===i.UNSIGNED_BYTE&&(j=i.RG8),z===i.UNSIGNED_SHORT&&ue&&(j=ue.RG16_EXT),z===i.SHORT&&ue&&(j=ue.RG16_SNORM_EXT)),b===i.RG_INTEGER&&(z===i.UNSIGNED_BYTE&&(j=i.RG8UI),z===i.UNSIGNED_SHORT&&(j=i.RG16UI),z===i.UNSIGNED_INT&&(j=i.RG32UI),z===i.BYTE&&(j=i.RG8I),z===i.SHORT&&(j=i.RG16I),z===i.INT&&(j=i.RG32I)),b===i.RGB_INTEGER&&(z===i.UNSIGNED_BYTE&&(j=i.RGB8UI),z===i.UNSIGNED_SHORT&&(j=i.RGB16UI),z===i.UNSIGNED_INT&&(j=i.RGB32UI),z===i.BYTE&&(j=i.RGB8I),z===i.SHORT&&(j=i.RGB16I),z===i.INT&&(j=i.RGB32I)),b===i.RGBA_INTEGER&&(z===i.UNSIGNED_BYTE&&(j=i.RGBA8UI),z===i.UNSIGNED_SHORT&&(j=i.RGBA16UI),z===i.UNSIGNED_INT&&(j=i.RGBA32UI),z===i.BYTE&&(j=i.RGBA8I),z===i.SHORT&&(j=i.RGBA16I),z===i.INT&&(j=i.RGBA32I)),b===i.RGB&&(z===i.UNSIGNED_SHORT&&ue&&(j=ue.RGB16_EXT),z===i.SHORT&&ue&&(j=ue.RGB16_SNORM_EXT),z===i.UNSIGNED_INT_5_9_9_9_REV&&(j=i.RGB9_E5),z===i.UNSIGNED_INT_10F_11F_11F_REV&&(j=i.R11F_G11F_B10F)),b===i.RGBA){const ie=ce?js:nt.getTransfer(Z);z===i.FLOAT&&(j=i.RGBA32F),z===i.HALF_FLOAT&&(j=i.RGBA16F),z===i.UNSIGNED_BYTE&&(j=ie===gt?i.SRGB8_ALPHA8:i.RGBA8),z===i.UNSIGNED_SHORT&&ue&&(j=ue.RGBA16_EXT),z===i.SHORT&&ue&&(j=ue.RGBA16_SNORM_EXT),z===i.UNSIGNED_SHORT_4_4_4_4&&(j=i.RGBA4),z===i.UNSIGNED_SHORT_5_5_5_1&&(j=i.RGB5_A1)}return(j===i.R16F||j===i.R32F||j===i.RG16F||j===i.RG32F||j===i.RGBA16F||j===i.RGBA32F)&&e.get("EXT_color_buffer_float"),j}function w(I,b){let z;return I?b===null||b===Vn||b===Kr?z=i.DEPTH24_STENCIL8:b===kn?z=i.DEPTH32F_STENCIL8:b===qr&&(z=i.DEPTH24_STENCIL8,Ge("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):b===null||b===Vn||b===Kr?z=i.DEPTH_COMPONENT24:b===kn?z=i.DEPTH_COMPONENT32F:b===qr&&(z=i.DEPTH_COMPONENT16),z}function E(I,b){return m(I)===!0||I.isFramebufferTexture&&I.minFilter!==Ut&&I.minFilter!==Nt?Math.log2(Math.max(b.width,b.height))+1:I.mipmaps!==void 0&&I.mipmaps.length>0?I.mipmaps.length:I.isCompressedTexture&&Array.isArray(I.image)?b.mipmaps.length:1}function L(I){const b=I.target;b.removeEventListener("dispose",L),A(b),b.isVideoTexture&&h.delete(b),b.isHTMLTexture&&d.delete(b)}function y(I){const b=I.target;b.removeEventListener("dispose",y),R(b)}function A(I){const b=n.get(I);if(b.__webglInit===void 0)return;const z=I.source,q=p.get(z);if(q){const Z=q[b.__cacheKey];Z.usedTimes--,Z.usedTimes===0&&D(I),Object.keys(q).length===0&&p.delete(z)}n.remove(I)}function D(I){const b=n.get(I);i.deleteTexture(b.__webglTexture);const z=I.source,q=p.get(z);delete q[b.__cacheKey],a.memory.textures--}function R(I){const b=n.get(I);if(I.depthTexture&&(I.depthTexture.dispose(),n.remove(I.depthTexture)),I.isWebGLCubeRenderTarget)for(let q=0;q<6;q++){if(Array.isArray(b.__webglFramebuffer[q]))for(let Z=0;Z<b.__webglFramebuffer[q].length;Z++)i.deleteFramebuffer(b.__webglFramebuffer[q][Z]);else i.deleteFramebuffer(b.__webglFramebuffer[q]);b.__webglDepthbuffer&&i.deleteRenderbuffer(b.__webglDepthbuffer[q])}else{if(Array.isArray(b.__webglFramebuffer))for(let q=0;q<b.__webglFramebuffer.length;q++)i.deleteFramebuffer(b.__webglFramebuffer[q]);else i.deleteFramebuffer(b.__webglFramebuffer);if(b.__webglDepthbuffer&&i.deleteRenderbuffer(b.__webglDepthbuffer),b.__webglMultisampledFramebuffer&&i.deleteFramebuffer(b.__webglMultisampledFramebuffer),b.__webglColorRenderbuffer)for(let q=0;q<b.__webglColorRenderbuffer.length;q++)b.__webglColorRenderbuffer[q]&&i.deleteRenderbuffer(b.__webglColorRenderbuffer[q]);b.__webglDepthRenderbuffer&&i.deleteRenderbuffer(b.__webglDepthRenderbuffer)}const z=I.textures;for(let q=0,Z=z.length;q<Z;q++){const ce=n.get(z[q]);ce.__webglTexture&&(i.deleteTexture(ce.__webglTexture),a.memory.textures--),n.remove(z[q])}n.remove(I)}let U=0;function N(){U=0}function P(){return U}function F(I){U=I}function O(){const I=U;return I>=r.maxTextures&&Ge("WebGLTextures: Trying to use "+(I+1)+" texture units while this GPU supports only "+r.maxTextures),U+=1,I}function V(I){const b=[];return b.push(I.wrapS),b.push(I.wrapT),b.push(I.wrapR||0),b.push(I.magFilter),b.push(I.minFilter),b.push(I.anisotropy),b.push(I.internalFormat),b.push(I.format),b.push(I.type),b.push(I.generateMipmaps),b.push(I.premultiplyAlpha),b.push(I.flipY),b.push(I.unpackAlignment),b.push(I.colorSpace),b.join()}function Q(I,b){const z=n.get(I);if(I.isVideoTexture&&G(I),I.isRenderTargetTexture===!1&&I.isExternalTexture!==!0&&I.version>0&&z.__version!==I.version){const q=I.image;if(q===null)Ge("WebGLRenderer: Texture marked for update but no image data found.");else if(q.complete===!1)Ge("WebGLRenderer: Texture marked for update but image is incomplete");else{Y(z,I,b);return}}else I.isExternalTexture&&(z.__webglTexture=I.sourceTexture?I.sourceTexture:null);t.bindTexture(i.TEXTURE_2D,z.__webglTexture,i.TEXTURE0+b)}function X(I,b){const z=n.get(I);if(I.isRenderTargetTexture===!1&&I.version>0&&z.__version!==I.version){Y(z,I,b);return}else I.isExternalTexture&&(z.__webglTexture=I.sourceTexture?I.sourceTexture:null);t.bindTexture(i.TEXTURE_2D_ARRAY,z.__webglTexture,i.TEXTURE0+b)}function te(I,b){const z=n.get(I);if(I.isRenderTargetTexture===!1&&I.version>0&&z.__version!==I.version){Y(z,I,b);return}t.bindTexture(i.TEXTURE_3D,z.__webglTexture,i.TEXTURE0+b)}function B(I,b){const z=n.get(I);if(I.isCubeDepthTexture!==!0&&I.version>0&&z.__version!==I.version){he(z,I,b);return}t.bindTexture(i.TEXTURE_CUBE_MAP,z.__webglTexture,i.TEXTURE0+b)}const ne={[Ao]:i.REPEAT,[ei]:i.CLAMP_TO_EDGE,[To]:i.MIRRORED_REPEAT},le={[Ut]:i.NEAREST,[dm]:i.NEAREST_MIPMAP_NEAREST,[os]:i.NEAREST_MIPMAP_LINEAR,[Nt]:i.LINEAR,[Pa]:i.LINEAR_MIPMAP_NEAREST,[Di]:i.LINEAR_MIPMAP_LINEAR},_e={[gm]:i.NEVER,[Sm]:i.ALWAYS,[xm]:i.LESS,[Pl]:i.LEQUAL,[vm]:i.EQUAL,[Dl]:i.GEQUAL,[_m]:i.GREATER,[Mm]:i.NOTEQUAL};function Ie(I,b){if(b.type===kn&&e.has("OES_texture_float_linear")===!1&&(b.magFilter===Nt||b.magFilter===Pa||b.magFilter===os||b.magFilter===Di||b.minFilter===Nt||b.minFilter===Pa||b.minFilter===os||b.minFilter===Di)&&Ge("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(I,i.TEXTURE_WRAP_S,ne[b.wrapS]),i.texParameteri(I,i.TEXTURE_WRAP_T,ne[b.wrapT]),(I===i.TEXTURE_3D||I===i.TEXTURE_2D_ARRAY)&&i.texParameteri(I,i.TEXTURE_WRAP_R,ne[b.wrapR]),i.texParameteri(I,i.TEXTURE_MAG_FILTER,le[b.magFilter]),i.texParameteri(I,i.TEXTURE_MIN_FILTER,le[b.minFilter]),b.compareFunction&&(i.texParameteri(I,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(I,i.TEXTURE_COMPARE_FUNC,_e[b.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(b.magFilter===Ut||b.minFilter!==os&&b.minFilter!==Di||b.type===kn&&e.has("OES_texture_float_linear")===!1)return;if(b.anisotropy>1||n.get(b).__currentAnisotropy){const z=e.get("EXT_texture_filter_anisotropic");i.texParameterf(I,z.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(b.anisotropy,r.getMaxAnisotropy())),n.get(b).__currentAnisotropy=b.anisotropy}}}function ke(I,b){let z=!1;I.__webglInit===void 0&&(I.__webglInit=!0,b.addEventListener("dispose",L));const q=b.source;let Z=p.get(q);Z===void 0&&(Z={},p.set(q,Z));const ce=V(b);if(ce!==I.__cacheKey){Z[ce]===void 0&&(Z[ce]={texture:i.createTexture(),usedTimes:0},a.memory.textures++,z=!0),Z[ce].usedTimes++;const ue=Z[I.__cacheKey];ue!==void 0&&(Z[I.__cacheKey].usedTimes--,ue.usedTimes===0&&D(b)),I.__cacheKey=ce,I.__webglTexture=Z[ce].texture}return z}function ee(I,b,z){return Math.floor(Math.floor(I/z)/b)}function se(I,b,z,q){const ce=I.updateRanges;if(ce.length===0)t.texSubImage2D(i.TEXTURE_2D,0,0,0,b.width,b.height,z,q,b.data);else{ce.sort((Le,xe)=>Le.start-xe.start);let ue=0;for(let Le=1;Le<ce.length;Le++){const xe=ce[ue],fe=ce[Le],Ne=xe.start+xe.count,Be=ee(fe.start,b.width,4),Ke=ee(xe.start,b.width,4);fe.start<=Ne+1&&Be===Ke&&ee(fe.start+fe.count-1,b.width,4)===Be?xe.count=Math.max(xe.count,fe.start+fe.count-xe.start):(++ue,ce[ue]=fe)}ce.length=ue+1;const j=t.getParameter(i.UNPACK_ROW_LENGTH),ie=t.getParameter(i.UNPACK_SKIP_PIXELS),de=t.getParameter(i.UNPACK_SKIP_ROWS);t.pixelStorei(i.UNPACK_ROW_LENGTH,b.width);for(let Le=0,xe=ce.length;Le<xe;Le++){const fe=ce[Le],Ne=Math.floor(fe.start/4),Be=Math.ceil(fe.count/4),Ke=Ne%b.width,H=Math.floor(Ne/b.width),pe=Be,re=1;t.pixelStorei(i.UNPACK_SKIP_PIXELS,Ke),t.pixelStorei(i.UNPACK_SKIP_ROWS,H),t.texSubImage2D(i.TEXTURE_2D,0,Ke,H,pe,re,z,q,b.data)}I.clearUpdateRanges(),t.pixelStorei(i.UNPACK_ROW_LENGTH,j),t.pixelStorei(i.UNPACK_SKIP_PIXELS,ie),t.pixelStorei(i.UNPACK_SKIP_ROWS,de)}}function Y(I,b,z){let q=i.TEXTURE_2D;(b.isDataArrayTexture||b.isCompressedArrayTexture)&&(q=i.TEXTURE_2D_ARRAY),b.isData3DTexture&&(q=i.TEXTURE_3D);const Z=ke(I,b),ce=b.source;t.bindTexture(q,I.__webglTexture,i.TEXTURE0+z);const ue=n.get(ce);if(ce.version!==ue.__version||Z===!0){if(t.activeTexture(i.TEXTURE0+z),(typeof ImageBitmap<"u"&&b.image instanceof ImageBitmap)===!1){const re=nt.getPrimaries(nt.workingColorSpace),me=b.colorSpace===Dn?null:nt.getPrimaries(b.colorSpace),ye=b.colorSpace===Dn||re===me?i.NONE:i.BROWSER_DEFAULT_WEBGL;t.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,b.flipY),t.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,b.premultiplyAlpha),t.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,ye)}t.pixelStorei(i.UNPACK_ALIGNMENT,b.unpackAlignment);let ie=x(b.image,!1,r.maxTextureSize);ie=Je(b,ie);const de=s.convert(b.format,b.colorSpace),Le=s.convert(b.type);let xe=S(b.internalFormat,de,Le,b.normalized,b.colorSpace,b.isVideoTexture);Ie(q,b);let fe;const Ne=b.mipmaps,Be=b.isVideoTexture!==!0,Ke=ue.__version===void 0||Z===!0,H=ce.dataReady,pe=E(b,ie);if(b.isDepthTexture)xe=w(b.format===Ii,b.type),Ke&&(Be?t.texStorage2D(i.TEXTURE_2D,1,xe,ie.width,ie.height):t.texImage2D(i.TEXTURE_2D,0,xe,ie.width,ie.height,0,de,Le,null));else if(b.isDataTexture)if(Ne.length>0){Be&&Ke&&t.texStorage2D(i.TEXTURE_2D,pe,xe,Ne[0].width,Ne[0].height);for(let re=0,me=Ne.length;re<me;re++)fe=Ne[re],Be?H&&t.texSubImage2D(i.TEXTURE_2D,re,0,0,fe.width,fe.height,de,Le,fe.data):t.texImage2D(i.TEXTURE_2D,re,xe,fe.width,fe.height,0,de,Le,fe.data);b.generateMipmaps=!1}else Be?(Ke&&t.texStorage2D(i.TEXTURE_2D,pe,xe,ie.width,ie.height),H&&se(b,ie,de,Le)):t.texImage2D(i.TEXTURE_2D,0,xe,ie.width,ie.height,0,de,Le,ie.data);else if(b.isCompressedTexture)if(b.isCompressedArrayTexture){Be&&Ke&&t.texStorage3D(i.TEXTURE_2D_ARRAY,pe,xe,Ne[0].width,Ne[0].height,ie.depth);for(let re=0,me=Ne.length;re<me;re++)if(fe=Ne[re],b.format!==pn)if(de!==null)if(Be){if(H)if(b.layerUpdates.size>0){const ye=kc(fe.width,fe.height,b.format,b.type);for(const oe of b.layerUpdates){const Ue=fe.data.subarray(oe*ye/fe.data.BYTES_PER_ELEMENT,(oe+1)*ye/fe.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,re,0,0,oe,fe.width,fe.height,1,de,Ue)}}else t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,re,0,0,0,fe.width,fe.height,ie.depth,de,fe.data)}else t.compressedTexImage3D(i.TEXTURE_2D_ARRAY,re,xe,fe.width,fe.height,ie.depth,0,fe.data,0,0);else Ge("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Be?H&&t.texSubImage3D(i.TEXTURE_2D_ARRAY,re,0,0,0,fe.width,fe.height,ie.depth,de,Le,fe.data):t.texImage3D(i.TEXTURE_2D_ARRAY,re,xe,fe.width,fe.height,ie.depth,0,de,Le,fe.data);b.layerUpdates.size>0&&b.clearLayerUpdates()}else{Be&&Ke&&t.texStorage2D(i.TEXTURE_2D,pe,xe,Ne[0].width,Ne[0].height);for(let re=0,me=Ne.length;re<me;re++)fe=Ne[re],b.format!==pn?de!==null?Be?H&&t.compressedTexSubImage2D(i.TEXTURE_2D,re,0,0,fe.width,fe.height,de,fe.data):t.compressedTexImage2D(i.TEXTURE_2D,re,xe,fe.width,fe.height,0,fe.data):Ge("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Be?H&&t.texSubImage2D(i.TEXTURE_2D,re,0,0,fe.width,fe.height,de,Le,fe.data):t.texImage2D(i.TEXTURE_2D,re,xe,fe.width,fe.height,0,de,Le,fe.data)}else if(b.isDataArrayTexture)if(Be){if(Ke&&t.texStorage3D(i.TEXTURE_2D_ARRAY,pe,xe,ie.width,ie.height,ie.depth),H)if(b.layerUpdates.size>0){const re=kc(ie.width,ie.height,b.format,b.type);for(const me of b.layerUpdates){const ye=ie.data.subarray(me*re/ie.data.BYTES_PER_ELEMENT,(me+1)*re/ie.data.BYTES_PER_ELEMENT);t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,me,ie.width,ie.height,1,de,Le,ye)}b.clearLayerUpdates()}else t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,ie.width,ie.height,ie.depth,de,Le,ie.data)}else t.texImage3D(i.TEXTURE_2D_ARRAY,0,xe,ie.width,ie.height,ie.depth,0,de,Le,ie.data);else if(b.isData3DTexture)Be?(Ke&&t.texStorage3D(i.TEXTURE_3D,pe,xe,ie.width,ie.height,ie.depth),H&&t.texSubImage3D(i.TEXTURE_3D,0,0,0,0,ie.width,ie.height,ie.depth,de,Le,ie.data)):t.texImage3D(i.TEXTURE_3D,0,xe,ie.width,ie.height,ie.depth,0,de,Le,ie.data);else if(b.isFramebufferTexture){if(Ke)if(Be)t.texStorage2D(i.TEXTURE_2D,pe,xe,ie.width,ie.height);else{let re=ie.width,me=ie.height;for(let ye=0;ye<pe;ye++)t.texImage2D(i.TEXTURE_2D,ye,xe,re,me,0,de,Le,null),re>>=1,me>>=1}}else if(b.isHTMLTexture){if("texElementImage2D"in i){const re=i.canvas;if(re.hasAttribute("layoutsubtree")||re.setAttribute("layoutsubtree","true"),ie.parentNode!==re){re.appendChild(ie),d.add(b),re.onpaint=me=>{const ye=me.changedElements;for(const oe of d)ye.includes(oe.image)&&(oe.needsUpdate=!0)},re.requestPaint();return}if(i.texElementImage2D.length===3)i.texElementImage2D(i.TEXTURE_2D,i.RGBA8,ie);else{const ye=i.RGBA,oe=i.RGBA,Ue=i.UNSIGNED_BYTE;i.texElementImage2D(i.TEXTURE_2D,0,ye,oe,Ue,ie)}i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MIN_FILTER,i.LINEAR),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_S,i.CLAMP_TO_EDGE),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_T,i.CLAMP_TO_EDGE)}}else if(Ne.length>0){if(Be&&Ke){const re=ze(Ne[0]);t.texStorage2D(i.TEXTURE_2D,pe,xe,re.width,re.height)}for(let re=0,me=Ne.length;re<me;re++)fe=Ne[re],Be?H&&t.texSubImage2D(i.TEXTURE_2D,re,0,0,de,Le,fe):t.texImage2D(i.TEXTURE_2D,re,xe,de,Le,fe);b.generateMipmaps=!1}else if(Be){if(Ke){const re=ze(ie);t.texStorage2D(i.TEXTURE_2D,pe,xe,re.width,re.height)}H&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,de,Le,ie)}else t.texImage2D(i.TEXTURE_2D,0,xe,de,Le,ie);m(b)&&_(q),ue.__version=ce.version,b.onUpdate&&b.onUpdate(b)}I.__version=b.version}function he(I,b,z){if(b.image.length!==6)return;const q=ke(I,b),Z=b.source;t.bindTexture(i.TEXTURE_CUBE_MAP,I.__webglTexture,i.TEXTURE0+z);const ce=n.get(Z);if(Z.version!==ce.__version||q===!0){t.activeTexture(i.TEXTURE0+z);const ue=nt.getPrimaries(nt.workingColorSpace),j=b.colorSpace===Dn?null:nt.getPrimaries(b.colorSpace),ie=b.colorSpace===Dn||ue===j?i.NONE:i.BROWSER_DEFAULT_WEBGL;t.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,b.flipY),t.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,b.premultiplyAlpha),t.pixelStorei(i.UNPACK_ALIGNMENT,b.unpackAlignment),t.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,ie);const de=b.isCompressedTexture||b.image[0].isCompressedTexture,Le=b.image[0]&&b.image[0].isDataTexture,xe=[];for(let oe=0;oe<6;oe++)!de&&!Le?xe[oe]=x(b.image[oe],!0,r.maxCubemapSize):xe[oe]=Le?b.image[oe].image:b.image[oe],xe[oe]=Je(b,xe[oe]);const fe=xe[0],Ne=s.convert(b.format,b.colorSpace),Be=s.convert(b.type),Ke=S(b.internalFormat,Ne,Be,b.normalized,b.colorSpace),H=b.isVideoTexture!==!0,pe=ce.__version===void 0||q===!0,re=Z.dataReady;let me=E(b,fe);Ie(i.TEXTURE_CUBE_MAP,b);let ye;if(de){H&&pe&&t.texStorage2D(i.TEXTURE_CUBE_MAP,me,Ke,fe.width,fe.height);for(let oe=0;oe<6;oe++){ye=xe[oe].mipmaps;for(let Ue=0;Ue<ye.length;Ue++){const Pe=ye[Ue];b.format!==pn?Ne!==null?H?re&&t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+oe,Ue,0,0,Pe.width,Pe.height,Ne,Pe.data):t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+oe,Ue,Ke,Pe.width,Pe.height,0,Pe.data):Ge("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):H?re&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+oe,Ue,0,0,Pe.width,Pe.height,Ne,Be,Pe.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+oe,Ue,Ke,Pe.width,Pe.height,0,Ne,Be,Pe.data)}}}else{if(ye=b.mipmaps,H&&pe){ye.length>0&&me++;const oe=ze(xe[0]);t.texStorage2D(i.TEXTURE_CUBE_MAP,me,Ke,oe.width,oe.height)}for(let oe=0;oe<6;oe++)if(Le){H?re&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+oe,0,0,0,xe[oe].width,xe[oe].height,Ne,Be,xe[oe].data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+oe,0,Ke,xe[oe].width,xe[oe].height,0,Ne,Be,xe[oe].data);for(let Ue=0;Ue<ye.length;Ue++){const wt=ye[Ue].image[oe].image;H?re&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+oe,Ue+1,0,0,wt.width,wt.height,Ne,Be,wt.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+oe,Ue+1,Ke,wt.width,wt.height,0,Ne,Be,wt.data)}}else{H?re&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+oe,0,0,0,Ne,Be,xe[oe]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+oe,0,Ke,Ne,Be,xe[oe]);for(let Ue=0;Ue<ye.length;Ue++){const Pe=ye[Ue];H?re&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+oe,Ue+1,0,0,Ne,Be,Pe.image[oe]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+oe,Ue+1,Ke,Ne,Be,Pe.image[oe])}}}m(b)&&_(i.TEXTURE_CUBE_MAP),ce.__version=Z.version,b.onUpdate&&b.onUpdate(b)}I.__version=b.version}function ae(I,b,z,q,Z,ce){const ue=s.convert(z.format,z.colorSpace),j=s.convert(z.type),ie=S(z.internalFormat,ue,j,z.normalized,z.colorSpace),de=n.get(b),Le=n.get(z);if(Le.__renderTarget=b,!de.__hasExternalTextures){const xe=Math.max(1,b.width>>ce),fe=Math.max(1,b.height>>ce);Z===i.TEXTURE_3D||Z===i.TEXTURE_2D_ARRAY?t.texImage3D(Z,ce,ie,xe,fe,b.depth,0,ue,j,null):t.texImage2D(Z,ce,ie,xe,fe,0,ue,j,null)}t.bindFramebuffer(i.FRAMEBUFFER,I),yt(b)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,q,Z,Le.__webglTexture,0,xt(b)):(Z===i.TEXTURE_2D||Z>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&Z<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,q,Z,Le.__webglTexture,ce),t.bindFramebuffer(i.FRAMEBUFFER,null)}function Ee(I,b,z){if(i.bindRenderbuffer(i.RENDERBUFFER,I),b.depthBuffer){const q=b.depthTexture,Z=q&&q.isDepthTexture?q.type:null,ce=w(b.stencilBuffer,Z),ue=b.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;yt(b)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,xt(b),ce,b.width,b.height):z?i.renderbufferStorageMultisample(i.RENDERBUFFER,xt(b),ce,b.width,b.height):i.renderbufferStorage(i.RENDERBUFFER,ce,b.width,b.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,ue,i.RENDERBUFFER,I)}else{const q=b.textures;for(let Z=0;Z<q.length;Z++){const ce=q[Z],ue=s.convert(ce.format,ce.colorSpace),j=s.convert(ce.type),ie=S(ce.internalFormat,ue,j,ce.normalized,ce.colorSpace);yt(b)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,xt(b),ie,b.width,b.height):z?i.renderbufferStorageMultisample(i.RENDERBUFFER,xt(b),ie,b.width,b.height):i.renderbufferStorage(i.RENDERBUFFER,ie,b.width,b.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function Ze(I,b,z){const q=b.isWebGLCubeRenderTarget===!0;if(t.bindFramebuffer(i.FRAMEBUFFER,I),!(b.depthTexture&&b.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");const Z=n.get(b.depthTexture);if(Z.__renderTarget=b,(!Z.__webglTexture||b.depthTexture.image.width!==b.width||b.depthTexture.image.height!==b.height)&&(b.depthTexture.image.width=b.width,b.depthTexture.image.height=b.height,b.depthTexture.needsUpdate=!0),q){if(Z.__webglInit===void 0&&(Z.__webglInit=!0,b.depthTexture.addEventListener("dispose",L)),Z.__webglTexture===void 0){Z.__webglTexture=i.createTexture(),t.bindTexture(i.TEXTURE_CUBE_MAP,Z.__webglTexture),Ie(i.TEXTURE_CUBE_MAP,b.depthTexture);const de=s.convert(b.depthTexture.format),Le=s.convert(b.depthTexture.type);let xe;b.depthTexture.format===ii?xe=i.DEPTH_COMPONENT24:b.depthTexture.format===Ii&&(xe=i.DEPTH24_STENCIL8);for(let fe=0;fe<6;fe++)i.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+fe,0,xe,b.width,b.height,0,de,Le,null)}}else Q(b.depthTexture,0);const ce=Z.__webglTexture,ue=xt(b),j=q?i.TEXTURE_CUBE_MAP_POSITIVE_X+z:i.TEXTURE_2D,ie=b.depthTexture.format===Ii?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;if(b.depthTexture.format===ii)yt(b)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,ie,j,ce,0,ue):i.framebufferTexture2D(i.FRAMEBUFFER,ie,j,ce,0);else if(b.depthTexture.format===Ii)yt(b)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,ie,j,ce,0,ue):i.framebufferTexture2D(i.FRAMEBUFFER,ie,j,ce,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function Ce(I){const b=n.get(I),z=I.isWebGLCubeRenderTarget===!0;if(b.__boundDepthTexture!==I.depthTexture){const q=I.depthTexture;if(b.__depthDisposeCallback&&b.__depthDisposeCallback(),q){const Z=()=>{delete b.__boundDepthTexture,delete b.__depthDisposeCallback,q.removeEventListener("dispose",Z)};q.addEventListener("dispose",Z),b.__depthDisposeCallback=Z}b.__boundDepthTexture=q}if(I.depthTexture&&!b.__autoAllocateDepthBuffer)if(z)for(let q=0;q<6;q++)Ze(b.__webglFramebuffer[q],I,q);else{const q=I.texture.mipmaps;q&&q.length>0?Ze(b.__webglFramebuffer[0],I,0):Ze(b.__webglFramebuffer,I,0)}else if(z){b.__webglDepthbuffer=[];for(let q=0;q<6;q++)if(t.bindFramebuffer(i.FRAMEBUFFER,b.__webglFramebuffer[q]),b.__webglDepthbuffer[q]===void 0)b.__webglDepthbuffer[q]=i.createRenderbuffer(),Ee(b.__webglDepthbuffer[q],I,!1);else{const Z=I.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ce=b.__webglDepthbuffer[q];i.bindRenderbuffer(i.RENDERBUFFER,ce),i.framebufferRenderbuffer(i.FRAMEBUFFER,Z,i.RENDERBUFFER,ce)}}else{const q=I.texture.mipmaps;if(q&&q.length>0?t.bindFramebuffer(i.FRAMEBUFFER,b.__webglFramebuffer[0]):t.bindFramebuffer(i.FRAMEBUFFER,b.__webglFramebuffer),b.__webglDepthbuffer===void 0)b.__webglDepthbuffer=i.createRenderbuffer(),Ee(b.__webglDepthbuffer,I,!1);else{const Z=I.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ce=b.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,ce),i.framebufferRenderbuffer(i.FRAMEBUFFER,Z,i.RENDERBUFFER,ce)}}t.bindFramebuffer(i.FRAMEBUFFER,null)}function Fe(I,b,z){const q=n.get(I);b!==void 0&&ae(q.__webglFramebuffer,I,I.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),z!==void 0&&Ce(I)}function qe(I){const b=I.texture,z=n.get(I),q=n.get(b);I.addEventListener("dispose",y);const Z=I.textures,ce=I.isWebGLCubeRenderTarget===!0,ue=Z.length>1;if(ue||(q.__webglTexture===void 0&&(q.__webglTexture=i.createTexture()),q.__version=b.version,a.memory.textures++),ce){z.__webglFramebuffer=[];for(let j=0;j<6;j++)if(b.mipmaps&&b.mipmaps.length>0){z.__webglFramebuffer[j]=[];for(let ie=0;ie<b.mipmaps.length;ie++)z.__webglFramebuffer[j][ie]=i.createFramebuffer()}else z.__webglFramebuffer[j]=i.createFramebuffer()}else{if(b.mipmaps&&b.mipmaps.length>0){z.__webglFramebuffer=[];for(let j=0;j<b.mipmaps.length;j++)z.__webglFramebuffer[j]=i.createFramebuffer()}else z.__webglFramebuffer=i.createFramebuffer();if(ue)for(let j=0,ie=Z.length;j<ie;j++){const de=n.get(Z[j]);de.__webglTexture===void 0&&(de.__webglTexture=i.createTexture(),a.memory.textures++)}if(I.samples>0&&yt(I)===!1){z.__webglMultisampledFramebuffer=i.createFramebuffer(),z.__webglColorRenderbuffer=[],t.bindFramebuffer(i.FRAMEBUFFER,z.__webglMultisampledFramebuffer);for(let j=0;j<Z.length;j++){const ie=Z[j];z.__webglColorRenderbuffer[j]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,z.__webglColorRenderbuffer[j]);const de=s.convert(ie.format,ie.colorSpace),Le=s.convert(ie.type),xe=S(ie.internalFormat,de,Le,ie.normalized,ie.colorSpace,I.isXRRenderTarget===!0),fe=xt(I);i.renderbufferStorageMultisample(i.RENDERBUFFER,fe,xe,I.width,I.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+j,i.RENDERBUFFER,z.__webglColorRenderbuffer[j])}i.bindRenderbuffer(i.RENDERBUFFER,null),I.depthBuffer&&(z.__webglDepthRenderbuffer=i.createRenderbuffer(),Ee(z.__webglDepthRenderbuffer,I,!0)),t.bindFramebuffer(i.FRAMEBUFFER,null)}}if(ce){t.bindTexture(i.TEXTURE_CUBE_MAP,q.__webglTexture),Ie(i.TEXTURE_CUBE_MAP,b);for(let j=0;j<6;j++)if(b.mipmaps&&b.mipmaps.length>0)for(let ie=0;ie<b.mipmaps.length;ie++)ae(z.__webglFramebuffer[j][ie],I,b,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+j,ie);else ae(z.__webglFramebuffer[j],I,b,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+j,0);m(b)&&_(i.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(ue){for(let j=0,ie=Z.length;j<ie;j++){const de=Z[j],Le=n.get(de);let xe=i.TEXTURE_2D;(I.isWebGL3DRenderTarget||I.isWebGLArrayRenderTarget)&&(xe=I.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(xe,Le.__webglTexture),Ie(xe,de),ae(z.__webglFramebuffer,I,de,i.COLOR_ATTACHMENT0+j,xe,0),m(de)&&_(xe)}t.unbindTexture()}else{let j=i.TEXTURE_2D;if((I.isWebGL3DRenderTarget||I.isWebGLArrayRenderTarget)&&(j=I.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(j,q.__webglTexture),Ie(j,b),b.mipmaps&&b.mipmaps.length>0)for(let ie=0;ie<b.mipmaps.length;ie++)ae(z.__webglFramebuffer[ie],I,b,i.COLOR_ATTACHMENT0,j,ie);else ae(z.__webglFramebuffer,I,b,i.COLOR_ATTACHMENT0,j,0);m(b)&&_(j),t.unbindTexture()}I.depthBuffer&&Ce(I)}function Ye(I){const b=I.textures;for(let z=0,q=b.length;z<q;z++){const Z=b[z];if(m(Z)){const ce=M(I),ue=n.get(Z).__webglTexture;t.bindTexture(ce,ue),_(ce),t.unbindTexture()}}}const St=[],Dt=[];function Xt(I){if(I.samples>0){if(yt(I)===!1){const b=I.textures,z=I.width,q=I.height;let Z=i.COLOR_BUFFER_BIT;const ce=I.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ue=n.get(I),j=b.length>1;if(j)for(let de=0;de<b.length;de++)t.bindFramebuffer(i.FRAMEBUFFER,ue.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+de,i.RENDERBUFFER,null),t.bindFramebuffer(i.FRAMEBUFFER,ue.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+de,i.TEXTURE_2D,null,0);t.bindFramebuffer(i.READ_FRAMEBUFFER,ue.__webglMultisampledFramebuffer);const ie=I.texture.mipmaps;ie&&ie.length>0?t.bindFramebuffer(i.DRAW_FRAMEBUFFER,ue.__webglFramebuffer[0]):t.bindFramebuffer(i.DRAW_FRAMEBUFFER,ue.__webglFramebuffer);for(let de=0;de<b.length;de++){if(I.resolveDepthBuffer&&(I.depthBuffer&&(Z|=i.DEPTH_BUFFER_BIT),I.stencilBuffer&&I.resolveStencilBuffer&&(Z|=i.STENCIL_BUFFER_BIT)),j){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,ue.__webglColorRenderbuffer[de]);const Le=n.get(b[de]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,Le,0)}i.blitFramebuffer(0,0,z,q,0,0,z,q,Z,i.NEAREST),c===!0&&(St.length=0,Dt.length=0,St.push(i.COLOR_ATTACHMENT0+de),I.depthBuffer&&I.storeMultisampledDepthBuffer===!1&&(St.push(ce),Dt.push(ce),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,Dt)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,St))}if(t.bindFramebuffer(i.READ_FRAMEBUFFER,null),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),j)for(let de=0;de<b.length;de++){t.bindFramebuffer(i.FRAMEBUFFER,ue.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+de,i.RENDERBUFFER,ue.__webglColorRenderbuffer[de]);const Le=n.get(b[de]).__webglTexture;t.bindFramebuffer(i.FRAMEBUFFER,ue.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+de,i.TEXTURE_2D,Le,0)}t.bindFramebuffer(i.DRAW_FRAMEBUFFER,ue.__webglMultisampledFramebuffer)}else if(I.depthBuffer&&I.storeMultisampledDepthBuffer===!1&&c){const b=I.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[b])}}}function xt(I){return Math.min(r.maxSamples,I.samples)}function yt(I){const b=n.get(I);return I.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&b.__useRenderToTexture!==!1}function G(I){const b=a.render.frame;h.get(I)!==b&&(h.set(I,b),I.update())}function Je(I,b){const z=I.colorSpace,q=I.format,Z=I.type;return I.isCompressedTexture===!0||I.isVideoTexture===!0||z!==$r&&z!==Dn&&(nt.getTransfer(z)===gt?(q!==pn||Z!==fn)&&Ge("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):lt("WebGLTextures: Unsupported texture color space:",z)),b}function ze(I){return typeof HTMLImageElement<"u"&&I instanceof HTMLImageElement?(l.width=I.naturalWidth||I.width,l.height=I.naturalHeight||I.height):typeof VideoFrame<"u"&&I instanceof VideoFrame?(l.width=I.displayWidth,l.height=I.displayHeight):(l.width=I.width,l.height=I.height),l}this.allocateTextureUnit=O,this.resetTextureUnits=N,this.getTextureUnits=P,this.setTextureUnits=F,this.setTexture2D=Q,this.setTexture2DArray=X,this.setTexture3D=te,this.setTextureCube=B,this.rebindTextures=Fe,this.setupRenderTarget=qe,this.updateRenderTargetMipmap=Ye,this.updateMultisampleRenderTarget=Xt,this.setupDepthRenderbuffer=Ce,this.setupFrameBufferTexture=ae,this.useMultisampledRTT=yt,this.isReversedDepthBuffer=function(){return t.buffers.depth.getReversed()}}function $_(i,e){function t(n,r=Dn){let s;const a=nt.getTransfer(r);if(n===fn)return i.UNSIGNED_BYTE;if(n===Al)return i.UNSIGNED_SHORT_4_4_4_4;if(n===Tl)return i.UNSIGNED_SHORT_5_5_5_1;if(n===jh)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===eu)return i.UNSIGNED_INT_10F_11F_11F_REV;if(n===Jh)return i.BYTE;if(n===Qh)return i.SHORT;if(n===qr)return i.UNSIGNED_SHORT;if(n===El)return i.INT;if(n===Vn)return i.UNSIGNED_INT;if(n===kn)return i.FLOAT;if(n===Xn)return i.HALF_FLOAT;if(n===tu)return i.ALPHA;if(n===nu)return i.RGB;if(n===pn)return i.RGBA;if(n===ii)return i.DEPTH_COMPONENT;if(n===Ii)return i.DEPTH_STENCIL;if(n===iu)return i.RED;if(n===Rl)return i.RED_INTEGER;if(n===zi)return i.RG;if(n===Cl)return i.RG_INTEGER;if(n===Ll)return i.RGBA_INTEGER;if(n===Gs||n===Hs||n===Ws||n===Vs)if(a===gt)if(s=e.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(n===Gs)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===Hs)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===Ws)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===Vs)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=e.get("WEBGL_compressed_texture_s3tc"),s!==null){if(n===Gs)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===Hs)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===Ws)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===Vs)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===Ro||n===Co||n===Lo||n===Po)if(s=e.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(n===Ro)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===Co)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===Lo)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===Po)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===Do||n===Io||n===No||n===Uo||n===Fo||n===Js||n===Oo)if(s=e.get("WEBGL_compressed_texture_etc"),s!==null){if(n===Do||n===Io)return a===gt?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(n===No)return a===gt?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC;if(n===Uo)return s.COMPRESSED_R11_EAC;if(n===Fo)return s.COMPRESSED_SIGNED_R11_EAC;if(n===Js)return s.COMPRESSED_RG11_EAC;if(n===Oo)return s.COMPRESSED_SIGNED_RG11_EAC}else return null;if(n===Bo||n===zo||n===ko||n===Go||n===Ho||n===Wo||n===Vo||n===Xo||n===Yo||n===qo||n===Ko||n===$o||n===Zo||n===Jo)if(s=e.get("WEBGL_compressed_texture_astc"),s!==null){if(n===Bo)return a===gt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===zo)return a===gt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===ko)return a===gt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===Go)return a===gt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===Ho)return a===gt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===Wo)return a===gt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Vo)return a===gt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Xo)return a===gt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Yo)return a===gt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===qo)return a===gt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===Ko)return a===gt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===$o)return a===gt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Zo)return a===gt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Jo)return a===gt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Qo||n===jo||n===el)if(s=e.get("EXT_texture_compression_bptc"),s!==null){if(n===Qo)return a===gt?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===jo)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===el)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===tl||n===nl||n===Qs||n===il)if(s=e.get("EXT_texture_compression_rgtc"),s!==null){if(n===tl)return s.COMPRESSED_RED_RGTC1_EXT;if(n===nl)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Qs)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===il)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===Kr?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:t}}const Z_=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,J_=`
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

}`;class Q_{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){const n=new fu(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,n=new Mt({vertexShader:Z_,fragmentShader:J_,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new Gt(new _n(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class j_ extends Hi{constructor(e,t){super();const n=this;let r=null,s=1,a=null,o="local-floor",c=1,l=null,h=null,d=null,u=null,p=null,g=null;const v=typeof XRWebGLBinding<"u",x=new Q_,m={},_=t.getContextAttributes();let M=null,S=null;const w=[],E=[],L=new He;let y=null,A=null;const D=new dn;D.viewport=new rt;const R=new dn;R.viewport=new rt;const U=[D,R],N=new og;let P=null,F=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(ee){let se=w[ee];return se===void 0&&(se=new ka,w[ee]=se),se.getTargetRaySpace()},this.getControllerGrip=function(ee){let se=w[ee];return se===void 0&&(se=new ka,w[ee]=se),se.getGripSpace()},this.getHand=function(ee){let se=w[ee];return se===void 0&&(se=new ka,w[ee]=se),se.getHandSpace()};function O(ee){const se=E.indexOf(ee.inputSource);if(se===-1)return;const Y=w[se];Y!==void 0&&(Y.update(ee.inputSource,ee.frame,l||a),Y.dispatchEvent({type:ee.type,data:ee.inputSource}))}function V(){r.removeEventListener("select",O),r.removeEventListener("selectstart",O),r.removeEventListener("selectend",O),r.removeEventListener("squeeze",O),r.removeEventListener("squeezestart",O),r.removeEventListener("squeezeend",O),r.removeEventListener("end",V),r.removeEventListener("inputsourceschange",Q);for(let ee=0;ee<w.length;ee++){const se=E[ee];se!==null&&(E[ee]=null,w[ee].disconnect(se))}P=null,F=null,x.reset();for(const ee in m)delete m[ee];if(e.setRenderTarget(M),p=null,u=null,d=null,r=null,S=null,ke.stop(),n.isPresenting=!1,e.setPixelRatio(y),e.setSize(L.width,L.height,!1),A!==null){const ee=A.camera;ee.fov=A.fov,ee.zoom=A.zoom,ee.updateProjectionMatrix(),A=null}n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(ee){s=ee,n.isPresenting===!0&&Ge("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(ee){o=ee,n.isPresenting===!0&&Ge("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||a},this.setReferenceSpace=function(ee){l=ee},this.getBaseLayer=function(){return u!==null?u:p},this.getBinding=function(){return d===null&&v&&(d=new XRWebGLBinding(r,t)),d},this.getFrame=function(){return g},this.getSession=function(){return r},this.setSession=async function(ee){if(r=ee,r!==null){if(M=e.getRenderTarget(),r.addEventListener("select",O),r.addEventListener("selectstart",O),r.addEventListener("selectend",O),r.addEventListener("squeeze",O),r.addEventListener("squeezestart",O),r.addEventListener("squeezeend",O),r.addEventListener("end",V),r.addEventListener("inputsourceschange",Q),_.xrCompatible!==!0&&await t.makeXRCompatible(),y=e.getPixelRatio(),e.getSize(L),v&&"createProjectionLayer"in XRWebGLBinding.prototype){let Y=null,he=null,ae=null;_.depth&&(ae=_.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,Y=_.stencil?Ii:ii,he=_.stencil?Kr:Vn);const Ee={colorFormat:t.RGBA8,depthFormat:ae,scaleFactor:s};d=this.getBinding(),u=d.createProjectionLayer(Ee),r.updateRenderState({layers:[u]}),e.setPixelRatio(1),e.setSize(u.textureWidth,u.textureHeight,!1),S=new En(u.textureWidth,u.textureHeight,{format:pn,type:fn,depthTexture:new br(u.textureWidth,u.textureHeight,he,void 0,void 0,void 0,void 0,void 0,void 0,Y),stencilBuffer:_.stencil,colorSpace:e.outputColorSpace,samples:_.antialias?4:0,resolveDepthBuffer:u.ignoreDepthValues===!1,resolveStencilBuffer:u.ignoreDepthValues===!1,storeMultisampledDepthBuffer:u.ignoreDepthValues===!1,storeMultisampledStencilBuffer:u.ignoreDepthValues===!1})}else{const Y={antialias:_.antialias,alpha:!0,depth:_.depth,stencil:_.stencil,framebufferScaleFactor:s};p=new XRWebGLLayer(r,t,Y),r.updateRenderState({baseLayer:p}),e.setPixelRatio(1),e.setSize(p.framebufferWidth,p.framebufferHeight,!1),S=new En(p.framebufferWidth,p.framebufferHeight,{format:pn,type:fn,colorSpace:e.outputColorSpace,stencilBuffer:_.stencil,resolveDepthBuffer:p.ignoreDepthValues===!1,resolveStencilBuffer:p.ignoreDepthValues===!1,storeMultisampledDepthBuffer:p.ignoreDepthValues===!1,storeMultisampledStencilBuffer:p.ignoreDepthValues===!1})}S.isXRRenderTarget=!0,this.setFoveation(c),l=null,a=await r.requestReferenceSpace(o),ke.setContext(r),ke.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return x.getDepthTexture()};function Q(ee){for(let se=0;se<ee.removed.length;se++){const Y=ee.removed[se],he=E.indexOf(Y);he>=0&&(E[he]=null,w[he].disconnect(Y))}for(let se=0;se<ee.added.length;se++){const Y=ee.added[se];let he=E.indexOf(Y);if(he===-1){for(let Ee=0;Ee<w.length;Ee++)if(Ee>=E.length){E.push(Y),he=Ee;break}else if(E[Ee]===null){E[Ee]=Y,he=Ee;break}if(he===-1)break}const ae=w[he];ae&&ae.connect(Y)}}const X=new W,te=new W;function B(ee,se,Y){X.setFromMatrixPosition(se.matrixWorld),te.setFromMatrixPosition(Y.matrixWorld);const he=X.distanceTo(te),ae=se.projectionMatrix.elements,Ee=Y.projectionMatrix.elements,Ze=ae[14]/(ae[10]-1),Ce=ae[14]/(ae[10]+1),Fe=(ae[9]+1)/ae[5],qe=(ae[9]-1)/ae[5],Ye=(ae[8]-1)/ae[0],St=(Ee[8]+1)/Ee[0],Dt=Ze*Ye,Xt=Ze*St,xt=he/(-Ye+St),yt=xt*-Ye;if(se.matrixWorld.decompose(ee.position,ee.quaternion,ee.scale),ee.translateX(yt),ee.translateZ(xt),ee.matrixWorld.compose(ee.position,ee.quaternion,ee.scale),ee.matrixWorldInverse.copy(ee.matrixWorld).invert(),ae[10]===-1)ee.projectionMatrix.copy(se.projectionMatrix),ee.projectionMatrixInverse.copy(se.projectionMatrixInverse);else{const G=Ze+xt,Je=Ce+xt,ze=Dt-yt,I=Xt+(he-yt),b=Fe*Ce/Je*G,z=qe*Ce/Je*G;ee.projectionMatrix.makePerspective(ze,I,b,z,G,Je),ee.projectionMatrixInverse.copy(ee.projectionMatrix).invert()}}function ne(ee,se){se===null?ee.matrixWorld.copy(ee.matrix):ee.matrixWorld.multiplyMatrices(se.matrixWorld,ee.matrix),ee.matrixWorldInverse.copy(ee.matrixWorld).invert()}this.updateCamera=function(ee){if(r===null)return;let se=ee.near,Y=ee.far;x.texture!==null&&(x.depthNear>0&&(se=x.depthNear),x.depthFar>0&&(Y=x.depthFar)),N.near=R.near=D.near=se,N.far=R.far=D.far=Y,(P!==N.near||F!==N.far)&&(r.updateRenderState({depthNear:N.near,depthFar:N.far}),P=N.near,F=N.far),N.layers.mask=ee.layers.mask|6,D.layers.mask=N.layers.mask&-5,R.layers.mask=N.layers.mask&-3;const he=ee.parent,ae=N.cameras;ne(N,he);for(let Ee=0;Ee<ae.length;Ee++)ne(ae[Ee],he);ae.length===2?B(N,D,R):N.projectionMatrix.copy(D.projectionMatrix),A===null&&ee.isPerspectiveCamera&&(A={camera:ee,fov:ee.fov,zoom:ee.zoom}),le(ee,N,he)};function le(ee,se,Y){Y===null?ee.matrix.copy(se.matrixWorld):(ee.matrix.copy(Y.matrixWorld),ee.matrix.invert(),ee.matrix.multiply(se.matrixWorld)),ee.matrix.decompose(ee.position,ee.quaternion,ee.scale),ee.updateMatrixWorld(!0),ee.projectionMatrix.copy(se.projectionMatrix),ee.projectionMatrixInverse.copy(se.projectionMatrixInverse),ee.isPerspectiveCamera&&(ee.fov=rl*2*Math.atan(1/ee.projectionMatrix.elements[5]),ee.zoom=1)}this.getCamera=function(){return N},this.getFoveation=function(){if(!(u===null&&p===null))return c},this.setFoveation=function(ee){c=ee,u!==null&&(u.fixedFoveation=ee),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=ee)},this.hasDepthSensing=function(){return x.texture!==null},this.getDepthSensingMesh=function(){return x.getMesh(N)},this.getCameraTexture=function(ee){return m[ee]};let _e=null;function Ie(ee,se){if(h=se.getViewerPose(l||a),g=se,h!==null){const Y=h.views;p!==null&&(e.setRenderTargetFramebuffer(S,p.framebuffer),e.setRenderTarget(S));let he=!1;Y.length!==N.cameras.length&&(N.cameras.length=0,he=!0);for(let Ce=0;Ce<Y.length;Ce++){const Fe=Y[Ce];let qe=null;if(p!==null)qe=p.getViewport(Fe);else{const St=d.getViewSubImage(u,Fe);qe=St.viewport,Ce===0&&(e.setRenderTargetTextures(S,St.colorTexture,St.depthStencilTexture),e.setRenderTarget(S))}let Ye=U[Ce];Ye===void 0&&(Ye=new dn,Ye.layers.enable(Ce),Ye.viewport=new rt,U[Ce]=Ye),Ye.matrix.fromArray(Fe.transform.matrix),Ye.matrix.decompose(Ye.position,Ye.quaternion,Ye.scale),Ye.projectionMatrix.fromArray(Fe.projectionMatrix),Ye.projectionMatrixInverse.copy(Ye.projectionMatrix).invert(),Ye.viewport.set(qe.x,qe.y,qe.width,qe.height),Ce===0&&(N.matrix.copy(Ye.matrix),N.matrix.decompose(N.position,N.quaternion,N.scale)),he===!0&&N.cameras.push(Ye)}const ae=r.enabledFeatures;if(ae&&ae.includes("depth-sensing")&&r.depthUsage=="gpu-optimized"&&v){d=n.getBinding();const Ce=d.getDepthInformation(Y[0]);Ce&&Ce.isValid&&Ce.texture&&x.init(Ce,r.renderState)}if(ae&&ae.includes("camera-access")&&v){e.state.unbindTexture(),d=n.getBinding();for(let Ce=0;Ce<Y.length;Ce++){const Fe=Y[Ce].camera;if(Fe){let qe=m[Fe];qe||(qe=new fu,m[Fe]=qe);const Ye=d.getCameraImage(Fe);qe.sourceTexture=Ye}}}}for(let Y=0;Y<w.length;Y++){const he=E[Y],ae=w[Y];he!==null&&ae!==void 0&&ae.update(he,se,l||a)}_e&&_e(ee,se),se.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:se}),g=null}const ke=new xu;ke.setAnimationLoop(Ie),this.setAnimationLoop=function(ee){_e=ee},this.dispose=function(){}}}const eM=new Pt,wu=new Ve;wu.set(-1,0,0,0,1,0,0,0,1);function tM(i,e){function t(x,m){x.matrixAutoUpdate===!0&&x.updateMatrix(),m.value.copy(x.matrix)}function n(x,m){m.color.getRGB(x.fogColor.value,pu(i)),m.isFog?(x.fogNear.value=m.near,x.fogFar.value=m.far):m.isFogExp2&&(x.fogDensity.value=m.density)}function r(x,m,_,M,S){m.isNodeMaterial?m.uniformsNeedUpdate=!1:m.isMeshBasicMaterial?s(x,m):m.isMeshLambertMaterial?(s(x,m),m.envMap&&(x.envMapIntensity.value=m.envMapIntensity)):m.isMeshToonMaterial?(s(x,m),d(x,m)):m.isMeshPhongMaterial?(s(x,m),h(x,m),m.envMap&&(x.envMapIntensity.value=m.envMapIntensity)):m.isMeshStandardMaterial?(s(x,m),u(x,m),m.isMeshPhysicalMaterial&&p(x,m,S)):m.isMeshMatcapMaterial?(s(x,m),g(x,m)):m.isMeshDepthMaterial?s(x,m):m.isMeshDistanceMaterial?(s(x,m),v(x,m)):m.isMeshNormalMaterial?s(x,m):m.isLineBasicMaterial?(a(x,m),m.isLineDashedMaterial&&o(x,m)):m.isPointsMaterial?c(x,m,_,M):m.isSpriteMaterial?l(x,m):m.isShadowMaterial?(x.color.value.copy(m.color),x.opacity.value=m.opacity):m.isShaderMaterial&&(m.uniformsNeedUpdate=!1)}function s(x,m){x.opacity.value=m.opacity,m.color&&x.diffuse.value.copy(m.color),m.emissive&&x.emissive.value.copy(m.emissive).multiplyScalar(m.emissiveIntensity),m.map&&(x.map.value=m.map,t(m.map,x.mapTransform)),m.alphaMap&&(x.alphaMap.value=m.alphaMap,t(m.alphaMap,x.alphaMapTransform)),m.bumpMap&&(x.bumpMap.value=m.bumpMap,t(m.bumpMap,x.bumpMapTransform),x.bumpScale.value=m.bumpScale,m.side===on&&(x.bumpScale.value*=-1)),m.normalMap&&(x.normalMap.value=m.normalMap,t(m.normalMap,x.normalMapTransform),x.normalScale.value.copy(m.normalScale),m.side===on&&x.normalScale.value.negate()),m.displacementMap&&(x.displacementMap.value=m.displacementMap,t(m.displacementMap,x.displacementMapTransform),x.displacementScale.value=m.displacementScale,x.displacementBias.value=m.displacementBias),m.emissiveMap&&(x.emissiveMap.value=m.emissiveMap,t(m.emissiveMap,x.emissiveMapTransform)),m.specularMap&&(x.specularMap.value=m.specularMap,t(m.specularMap,x.specularMapTransform)),m.alphaTest>0&&(x.alphaTest.value=m.alphaTest);const _=e.get(m),M=_.envMap,S=_.envMapRotation;M&&(x.envMap.value=M,x.envMapRotation.value.setFromMatrix4(eM.makeRotationFromEuler(S)).transpose(),M.isCubeTexture&&M.isRenderTargetTexture===!1&&x.envMapRotation.value.premultiply(wu),x.reflectivity.value=m.reflectivity,x.ior.value=m.ior,x.refractionRatio.value=m.refractionRatio),m.lightMap&&(x.lightMap.value=m.lightMap,x.lightMapIntensity.value=m.lightMapIntensity,t(m.lightMap,x.lightMapTransform)),m.aoMap&&(x.aoMap.value=m.aoMap,x.aoMapIntensity.value=m.aoMapIntensity,t(m.aoMap,x.aoMapTransform))}function a(x,m){x.diffuse.value.copy(m.color),x.opacity.value=m.opacity,m.map&&(x.map.value=m.map,t(m.map,x.mapTransform))}function o(x,m){x.dashSize.value=m.dashSize,x.totalSize.value=m.dashSize+m.gapSize,x.scale.value=m.scale}function c(x,m,_,M){x.diffuse.value.copy(m.color),x.opacity.value=m.opacity,x.size.value=m.size*_,x.scale.value=M*.5,m.map&&(x.map.value=m.map,t(m.map,x.uvTransform)),m.alphaMap&&(x.alphaMap.value=m.alphaMap,t(m.alphaMap,x.alphaMapTransform)),m.alphaTest>0&&(x.alphaTest.value=m.alphaTest)}function l(x,m){x.diffuse.value.copy(m.color),x.opacity.value=m.opacity,x.rotation.value=m.rotation,m.map&&(x.map.value=m.map,t(m.map,x.mapTransform)),m.alphaMap&&(x.alphaMap.value=m.alphaMap,t(m.alphaMap,x.alphaMapTransform)),m.alphaTest>0&&(x.alphaTest.value=m.alphaTest)}function h(x,m){x.specular.value.copy(m.specular),x.shininess.value=Math.max(m.shininess,1e-4)}function d(x,m){m.gradientMap&&(x.gradientMap.value=m.gradientMap)}function u(x,m){x.metalness.value=m.metalness,m.metalnessMap&&(x.metalnessMap.value=m.metalnessMap,t(m.metalnessMap,x.metalnessMapTransform)),x.roughness.value=m.roughness,m.roughnessMap&&(x.roughnessMap.value=m.roughnessMap,t(m.roughnessMap,x.roughnessMapTransform)),m.envMap&&(x.envMapIntensity.value=m.envMapIntensity)}function p(x,m,_){x.ior.value=m.ior,m.sheen>0&&(x.sheenColor.value.copy(m.sheenColor).multiplyScalar(m.sheen),x.sheenRoughness.value=m.sheenRoughness,m.sheenColorMap&&(x.sheenColorMap.value=m.sheenColorMap,t(m.sheenColorMap,x.sheenColorMapTransform)),m.sheenRoughnessMap&&(x.sheenRoughnessMap.value=m.sheenRoughnessMap,t(m.sheenRoughnessMap,x.sheenRoughnessMapTransform))),m.clearcoat>0&&(x.clearcoat.value=m.clearcoat,x.clearcoatRoughness.value=m.clearcoatRoughness,m.clearcoatMap&&(x.clearcoatMap.value=m.clearcoatMap,t(m.clearcoatMap,x.clearcoatMapTransform)),m.clearcoatRoughnessMap&&(x.clearcoatRoughnessMap.value=m.clearcoatRoughnessMap,t(m.clearcoatRoughnessMap,x.clearcoatRoughnessMapTransform)),m.clearcoatNormalMap&&(x.clearcoatNormalMap.value=m.clearcoatNormalMap,t(m.clearcoatNormalMap,x.clearcoatNormalMapTransform),x.clearcoatNormalScale.value.copy(m.clearcoatNormalScale),m.side===on&&x.clearcoatNormalScale.value.negate())),m.dispersion>0&&(x.dispersion.value=m.dispersion),m.retroreflectivity>0&&(x.retroreflectivity.value=m.retroreflectivity),m.iridescence>0&&(x.iridescence.value=m.iridescence,x.iridescenceIOR.value=m.iridescenceIOR,x.iridescenceThicknessMinimum.value=m.iridescenceThicknessRange[0],x.iridescenceThicknessMaximum.value=m.iridescenceThicknessRange[1],m.iridescenceMap&&(x.iridescenceMap.value=m.iridescenceMap,t(m.iridescenceMap,x.iridescenceMapTransform)),m.iridescenceThicknessMap&&(x.iridescenceThicknessMap.value=m.iridescenceThicknessMap,t(m.iridescenceThicknessMap,x.iridescenceThicknessMapTransform))),m.transmission>0&&(x.transmission.value=m.transmission,x.transmissionSamplerMap.value=_.texture,x.transmissionSamplerSize.value.set(_.width,_.height),m.transmissionMap&&(x.transmissionMap.value=m.transmissionMap,t(m.transmissionMap,x.transmissionMapTransform)),x.thickness.value=m.thickness,m.thicknessMap&&(x.thicknessMap.value=m.thicknessMap,t(m.thicknessMap,x.thicknessMapTransform)),x.attenuationDistance.value=m.attenuationDistance,x.attenuationColor.value.copy(m.attenuationColor)),m.anisotropy>0&&(x.anisotropyVector.value.set(m.anisotropy*Math.cos(m.anisotropyRotation),m.anisotropy*Math.sin(m.anisotropyRotation)),m.anisotropyMap&&(x.anisotropyMap.value=m.anisotropyMap,t(m.anisotropyMap,x.anisotropyMapTransform))),x.specularIntensity.value=m.specularIntensity,x.specularColor.value.copy(m.specularColor),m.specularColorMap&&(x.specularColorMap.value=m.specularColorMap,t(m.specularColorMap,x.specularColorMapTransform)),m.specularIntensityMap&&(x.specularIntensityMap.value=m.specularIntensityMap,t(m.specularIntensityMap,x.specularIntensityMapTransform))}function g(x,m){m.matcap&&(x.matcap.value=m.matcap)}function v(x,m){const _=e.get(m).light;x.referencePosition.value.setFromMatrixPosition(_.matrixWorld),x.nearDistance.value=_.shadow.camera.near,x.farDistance.value=_.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:r}}function nM(i,e,t,n){let r={},s={},a=[];const o=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function c(S,w){const E=w.program;n.uniformBlockBinding(S,E)}function l(S,w){let E=r[S.id];E===void 0&&(x(S),E=h(S),r[S.id]=E,S.addEventListener("dispose",_));const L=w.program;n.updateUBOMapping(S,L);const y=e.render.frame;s[S.id]!==y&&(u(S),s[S.id]=y)}function h(S){const w=d();S.__bindingPointIndex=w;const E=i.createBuffer(),L=S.__size,y=S.usage;return i.bindBuffer(i.UNIFORM_BUFFER,E),i.bufferData(i.UNIFORM_BUFFER,L,y),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,w,E),E}function d(){for(let S=0;S<o;S++)if(a.indexOf(S)===-1)return a.push(S),S;return lt("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function u(S){const w=r[S.id],E=S.uniforms,L=S.__cache;i.bindBuffer(i.UNIFORM_BUFFER,w);for(let y=0,A=E.length;y<A;y++){const D=E[y];if(Array.isArray(D))for(let R=0,U=D.length;R<U;R++)p(D[R],y,R,L);else p(D,y,0,L)}i.bindBuffer(i.UNIFORM_BUFFER,null)}function p(S,w,E,L){if(v(S,w,E,L)===!0){const y=S.__offset,A=S.value;if(Array.isArray(A)){let D=0;for(let R=0;R<A.length;R++){const U=A[R],N=m(U);g(U,S.__data,D),typeof U!="number"&&typeof U!="boolean"&&!U.isMatrix3&&!ArrayBuffer.isView(U)&&(D+=N.storage/Float32Array.BYTES_PER_ELEMENT)}}else g(A,S.__data,0);i.bufferSubData(i.UNIFORM_BUFFER,y,S.__data)}}function g(S,w,E){typeof S=="number"||typeof S=="boolean"?w[0]=S:S.isMatrix3?(w[0]=S.elements[0],w[1]=S.elements[1],w[2]=S.elements[2],w[3]=0,w[4]=S.elements[3],w[5]=S.elements[4],w[6]=S.elements[5],w[7]=0,w[8]=S.elements[6],w[9]=S.elements[7],w[10]=S.elements[8],w[11]=0):ArrayBuffer.isView(S)?w.set(new S.constructor(S.buffer,S.byteOffset,w.length)):S.toArray(w,E)}function v(S,w,E,L){const y=S.value,A=w+"_"+E;if(L[A]===void 0)return typeof y=="number"||typeof y=="boolean"?L[A]=y:ArrayBuffer.isView(y)?L[A]=y.slice():L[A]=y.clone(),!0;{const D=L[A];if(typeof y=="number"||typeof y=="boolean"){if(D!==y)return L[A]=y,!0}else{if(ArrayBuffer.isView(y))return!0;if(D.equals(y)===!1)return D.copy(y),!0}}return!1}function x(S){const w=S.uniforms;let E=0;const L=16;for(let A=0,D=w.length;A<D;A++){const R=Array.isArray(w[A])?w[A]:[w[A]];for(let U=0,N=R.length;U<N;U++){const P=R[U],F=Array.isArray(P.value)?P.value:[P.value];for(let O=0,V=F.length;O<V;O++){const Q=F[O],X=m(Q),te=E%L,B=te%X.boundary,ne=te+B;E+=B,ne!==0&&L-ne<X.storage&&(E+=L-ne),P.__data=new Float32Array(X.storage/Float32Array.BYTES_PER_ELEMENT),P.__offset=E,E+=X.storage}}}const y=E%L;return y>0&&(E+=L-y),S.__size=E,S.__cache={},this}function m(S){const w={boundary:0,storage:0};return typeof S=="number"||typeof S=="boolean"?(w.boundary=4,w.storage=4):S.isVector2?(w.boundary=8,w.storage=8):S.isVector3||S.isColor?(w.boundary=16,w.storage=12):S.isVector4?(w.boundary=16,w.storage=16):S.isMatrix3?(w.boundary=48,w.storage=48):S.isMatrix4?(w.boundary=64,w.storage=64):S.isTexture?Ge("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(S)?(w.boundary=16,w.storage=S.byteLength):Ge("WebGLRenderer: Unsupported uniform value type.",S),w}function _(S){const w=S.target;w.removeEventListener("dispose",_);const E=a.indexOf(w.__bindingPointIndex);a.splice(E,1),i.deleteBuffer(r[w.id]),delete r[w.id],delete s[w.id]}function M(){for(const S in r)i.deleteBuffer(r[S]);a=[],r={},s={}}return{bind:c,update:l,dispose:M}}const iM=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let Bn=null;function rM(){return Bn===null&&(Bn=new hr(iM,16,16,zi,Xn),Bn.name="DFG_LUT",Bn.minFilter=Nt,Bn.magFilter=Nt,Bn.wrapS=ei,Bn.wrapT=ei,Bn.generateMipmaps=!1,Bn.needsUpdate=!0),Bn}class sM{constructor(e={}){const{canvas:t=wm(),context:n=null,depth:r=!0,stencil:s=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:d=!1,reversedDepthBuffer:u=!1,outputBufferType:p=fn}=e;this.isWebGLRenderer=!0;let g;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");g=n.getContextAttributes().alpha}else g=a;const v=p,x=new Set([Ll,Cl,Rl]),m=new Set([fn,Vn,qr,Kr,Al,Tl]),_=new Uint32Array(4),M=new Int32Array(4),S=new W;let w=null,E=null;const L=[],y=[];let A=null;this.domElement=t,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Wn,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const D=this;let R=!1,U=null,N=null,P=null,F=null;this._outputColorSpace=bn;let O=0,V=0,Q=null,X=-1,te=null;const B=new rt,ne=new rt;let le=null;const _e=new et(0);let Ie=0,ke=t.width,ee=t.height,se=1,Y=null,he=null;const ae=new rt(0,0,ke,ee),Ee=new rt(0,0,ke,ee);let Ze=!1;const Ce=new na;let Fe=!1,qe=!1;const Ye=new Pt,St=new W,Dt=new rt,Xt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let xt=!1;function yt(){return Q===null?se:1}let G=n;function Je(T,k){return t.getContext(T,k)}let ze,I,b,z,q,Z,ce,ue,j,ie,de,Le,xe,fe,Ne,Be,Ke,H,pe,re,me,ye,oe;try{const T={alpha:!0,depth:r,stencil:s,antialias:o,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:h,failIfMajorPerformanceCaveat:d};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${Ml}`),t.addEventListener("webglcontextlost",wt,!1),t.addEventListener("webglcontextrestored",ht,!1),t.addEventListener("webglcontextcreationerror",Tn,!1),G===null){const k="webgl2";if(G=Je(k,T),G===null)throw Je(k)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}Ue()}catch(T){throw t.removeEventListener("webglcontextlost",wt,!1),t.removeEventListener("webglcontextrestored",ht,!1),t.removeEventListener("webglcontextcreationerror",Tn,!1),lt("WebGLRenderer: "+T.message),T}function Ue(){ze=new rv(G),ze.init(),me=new $_(G,ze),I=new Kx(G,ze,e,me),b=new q_(G,ze),I.reversedDepthBuffer&&u&&b.buffers.depth.setReversed(!0),N=G.createFramebuffer(),P=G.createFramebuffer(),F=G.createFramebuffer(),z=new ov(G),q=new I_,Z=new K_(G,ze,b,q,I,me,z),ce=new iv(D),ue=new cg(G),ye=new Yx(G,ue),j=new sv(G,ue,z,ye),ie=new cv(G,j,ue,ye,z),H=new lv(G,I,Z),Ne=new $x(q),de=new D_(D,ce,ze,I,ye,Ne),Le=new tM(D,q),xe=new U_,fe=new G_(ze),Ke=new Xx(D,ce,b,ie,g,c),Be=new Y_(D,ie,I),oe=new nM(G,z,I,b),pe=new qx(G,ze,z),re=new av(G,ze,z),z.programs=de.programs,D.capabilities=I,D.extensions=ze,D.properties=q,D.renderLists=xe,D.shadowMap=Be,D.state=b,D.info=z}v!==fn&&(A=new uv(v,t.width,t.height,o,r,s));const Pe=new j_(D,G);this.xr=Pe,this.getContext=function(){return G},this.getContextAttributes=function(){return G.getContextAttributes()},this.forceContextLoss=function(){const T=ze.get("WEBGL_lose_context");T&&T.loseContext()},this.forceContextRestore=function(){const T=ze.get("WEBGL_lose_context");T&&T.restoreContext()},this.getPixelRatio=function(){return se},this.setPixelRatio=function(T){T!==void 0&&(se=T,this.setSize(ke,ee,!1))},this.getSize=function(T){return T.set(ke,ee)},this.setSize=function(T,k,J=!0){if(Pe.isPresenting){Ge("WebGLRenderer: Can't change size while VR device is presenting.");return}ke=T,ee=k,t.width=Math.floor(T*se),t.height=Math.floor(k*se),J===!0&&(t.style.width=T+"px",t.style.height=k+"px"),A!==null&&A.setSize(t.width,t.height),this.setViewport(0,0,T,k)},this.getDrawingBufferSize=function(T){return T.set(ke*se,ee*se).floor()},this.setDrawingBufferSize=function(T,k,J){ke=T,ee=k,se=J,t.width=Math.floor(T*J),t.height=Math.floor(k*J),this.setViewport(0,0,T,k)},this.setEffects=function(T){if(v===fn){lt("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(T){for(let k=0;k<T.length;k++)if(T[k].isOutputPass===!0){Ge("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}A.setEffects(T||[])},this.getCurrentViewport=function(T){return T.copy(B)},this.getViewport=function(T){return T.copy(ae)},this.setViewport=function(T,k,J,K){T.isVector4?ae.set(T.x,T.y,T.z,T.w):ae.set(T,k,J,K),b.viewport(B.copy(ae).multiplyScalar(se).round())},this.getScissor=function(T){return T.copy(Ee)},this.setScissor=function(T,k,J,K){T.isVector4?Ee.set(T.x,T.y,T.z,T.w):Ee.set(T,k,J,K),b.scissor(ne.copy(Ee).multiplyScalar(se).round())},this.getScissorTest=function(){return Ze},this.setScissorTest=function(T){b.setScissorTest(Ze=T)},this.setOpaqueSort=function(T){Y=T},this.setTransparentSort=function(T){he=T},this.getClearColor=function(T){return T.copy(Ke.getClearColor())},this.setClearColor=function(){Ke.setClearColor(...arguments)},this.getClearAlpha=function(){return Ke.getClearAlpha()},this.setClearAlpha=function(){Ke.setClearAlpha(...arguments)},this.clear=function(T=!0,k=!0,J=!0){let K=0;if(T){let $=!1;if(Q!==null){const Se=Q.texture.format;$=x.has(Se)}if($){const Se=Q.texture.type,Ae=m.has(Se),Me=Ke.getClearColor(),Te=Ke.getClearAlpha(),De=Me.r,Qe=Me.g,tt=Me.b;Ae?(_[0]=De,_[1]=Qe,_[2]=tt,_[3]=Te,G.clearBufferuiv(G.COLOR,0,_)):(M[0]=De,M[1]=Qe,M[2]=tt,M[3]=Te,G.clearBufferiv(G.COLOR,0,M))}else K|=G.COLOR_BUFFER_BIT}k&&(K|=G.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),J&&(K|=G.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),K!==0&&G.clear(K)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(T){T.setRenderer(this),U=T},this.dispose=function(){t.removeEventListener("webglcontextlost",wt,!1),t.removeEventListener("webglcontextrestored",ht,!1),t.removeEventListener("webglcontextcreationerror",Tn,!1),Ke.dispose(),xe.dispose(),fe.dispose(),q.dispose(),ce.dispose(),ie.dispose(),ye.dispose(),oe.dispose(),de.dispose(),Pe.dispose(),Pe.removeEventListener("sessionstart",Hl),Pe.removeEventListener("sessionend",Wl),yi.stop()};function wt(T){T.preventDefault(),mc("WebGLRenderer: Context Lost."),R=!0}function ht(){mc("WebGLRenderer: Context Restored."),R=!1;const T=z.autoReset,k=Be.enabled,J=Be.autoUpdate,K=Be.needsUpdate,$=Be.type;Ue(),z.autoReset=T,Be.enabled=k,Be.autoUpdate=J,Be.needsUpdate=K,Be.type=$}function Tn(T){lt("WebGLRenderer: A WebGL context could not be created. Reason: ",T.statusMessage)}function Un(T){const k=T.target;k.removeEventListener("dispose",Un),Du(k)}function Du(T){Iu(T),q.remove(T)}function Iu(T){const k=q.get(T).programs;k!==void 0&&(k.forEach(function(J){de.releaseProgram(J)}),T.isShaderMaterial&&de.releaseShaderCache(T))}this.renderBufferDirect=function(T,k,J,K,$,Se){k===null&&(k=Xt);const Ae=$.isMesh&&$.matrixWorld.determinantAffine()<0,Me=Fu(T,k,J,K,$);b.setMaterial(K,Ae);let Te=J.index,De=1;if(K.wireframe===!0){if(Te=j.getWireframeAttribute(J),Te===void 0)return;De=2}const Qe=J.drawRange,tt=J.attributes.position;let Re=Qe.start*De,ut=(Qe.start+Qe.count)*De;Se!==null&&(Re=Math.max(Re,Se.start*De),ut=Math.min(ut,(Se.start+Se.count)*De)),Te!==null?(Re=Math.max(Re,0),ut=Math.min(ut,Te.count)):tt!=null&&(Re=Math.max(Re,0),ut=Math.min(ut,tt.count));const Ot=ut-Re;if(Ot<0||Ot===1/0)return;ye.setup($,K,Me,J,Te);let Tt,bt=pe;if(Te!==null&&(Tt=ue.get(Te),bt=re,bt.setIndex(Tt)),$.isMesh)K.wireframe===!0?(b.setLineWidth(K.wireframeLinewidth*yt()),bt.setMode(G.LINES)):bt.setMode(G.TRIANGLES);else if($.isLine){let Jt=K.linewidth;Jt===void 0&&(Jt=1),b.setLineWidth(Jt*yt()),$.isLineSegments?bt.setMode(G.LINES):$.isLineLoop?bt.setMode(G.LINE_LOOP):bt.setMode(G.LINE_STRIP)}else $.isPoints?bt.setMode(G.POINTS):$.isSprite&&bt.setMode(G.TRIANGLES);if($.isBatchedMesh)if(ze.get("WEBGL_multi_draw"))bt.renderMultiDraw($._multiDrawStarts,$._multiDrawCounts,$._multiDrawCount);else{const Jt=$._multiDrawStarts,we=$._multiDrawCounts,nn=$._multiDrawCount,at=Te?ue.get(Te).bytesPerElement:1,Sn=q.get(K).currentProgram.getUniforms();for(let Fn=0;Fn<nn;Fn++)Sn.setValue(G,"_gl_DrawID",Fn),bt.render(Jt[Fn]/at,we[Fn])}else if($.isInstancedMesh)bt.renderInstances(Re,Ot,$.count);else if(J.isInstancedBufferGeometry){const Jt=J._maxInstanceCount!==void 0?J._maxInstanceCount:1/0,we=Math.min(J.instanceCount,Jt);bt.renderInstances(Re,Ot,we)}else bt.render(Re,Ot)};function Gl(T,k,J,K){U!==null&&T.isNodeMaterial&&U.setObject(K,T),Fe===!0&&Ne.setState(T,J,!1),T.transparent===!0&&T.side===jn&&T.forceSinglePass===!1?(T.side=on,T.needsUpdate=!0,ns(T,k,K),T.side=Oi,T.needsUpdate=!0,ns(T,k,K),T.side=jn):ns(T,k,K)}this.compile=function(T,k,J=null){J===null&&(J=T),U!==null&&U.renderStart(T,k,J),E=fe.get(J),E.init(k),y.push(E),J.traverseVisible(function($){$.isLight&&$.layers.test(k.layers)&&(E.pushLight($),$.castShadow&&E.pushShadow($))}),T!==J&&T.traverseVisible(function($){$.isLight&&$.layers.test(k.layers)&&(E.pushLight($),$.castShadow&&E.pushShadow($))}),E.setupLights(),U!==null&&U.updateLights(E.state.lightsArray),qe=this.localClippingEnabled,Fe=Ne.init(this.clippingPlanes,qe),Fe===!0&&Ne.setGlobalState(this.clippingPlanes,k),U!==null&&Be.render(E.state.shadowsArray,J,k);const K=new Set;return T.traverse(function($){if(!($.isMesh||$.isPoints||$.isLine||$.isSprite))return;const Se=$.material;if(Se)if(Array.isArray(Se))for(let Ae=0;Ae<Se.length;Ae++){const Me=Se[Ae];Gl(Me,J,k,$),K.add(Me)}else Gl(Se,J,k,$),K.add(Se)}),E=y.pop(),U!==null&&U.renderEnd(),K},this.compileAsync=function(T,k,J=null){const K=this.compile(T,k,J);return new Promise($=>{function Se(){if(K.forEach(function(Ae){const Te=q.get(Ae).currentProgram;(Te===void 0||Te.isReady())&&K.delete(Ae)}),K.size===0){$(T);return}setTimeout(Se,10)}ze.get("KHR_parallel_shader_compile")!==null?Se():setTimeout(Se,10)})};let Sa=null;function Nu(T){Sa&&Sa(T)}function Hl(){yi.stop()}function Wl(){yi.start()}const yi=new xu;yi.setAnimationLoop(Nu),typeof self<"u"&&yi.setContext(self),this.setAnimationLoop=function(T){Sa=T,Pe.setAnimationLoop(T),T===null?yi.stop():yi.start()},Pe.addEventListener("sessionstart",Hl),Pe.addEventListener("sessionend",Wl),this.render=function(T,k){if(k!==void 0&&k.isCamera!==!0){lt("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(R===!0)return;U!==null&&U.renderStart(T,k);const J=Pe.enabled===!0&&Pe.isPresenting===!0,K=A!==null&&(Q===null||J)&&A.begin(D,Q);if(T.matrixWorldAutoUpdate===!0&&T.updateMatrixWorld(),k.parent===null&&k.matrixWorldAutoUpdate===!0&&k.updateMatrixWorld(),Pe.enabled===!0&&Pe.isPresenting===!0&&(A===null||A.isCompositing()===!1)&&(Pe.cameraAutoUpdate===!0&&Pe.updateCamera(k),k=Pe.getCamera()),T.isScene===!0&&T.onBeforeRender(D,T,k,Q),E=fe.get(T,y.length),E.init(k),E.state.textureUnits=Z.getTextureUnits(),y.push(E),Ye.multiplyMatrices(k.projectionMatrix,k.matrixWorldInverse),Ce.setFromProjectionMatrix(Ye,Gn,k.reversedDepth),qe=this.localClippingEnabled,Fe=Ne.init(this.clippingPlanes,qe),w=xe.get(T,L.length),w.init(),L.push(w),Pe.enabled===!0&&Pe.isPresenting===!0){const Ae=D.xr.getDepthSensingMesh();Ae!==null&&ya(Ae,k,-1/0,D.sortObjects)}ya(T,k,0,D.sortObjects),w.finish(),U!==null&&U.updateLights(E.state.lightsArray),D.sortObjects===!0&&w.sort(Y,he),xt=Pe.enabled===!1||Pe.isPresenting===!1||Pe.hasDepthSensing()===!1,xt&&Ke.addToRenderList(w,T),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),Fe===!0&&Ne.beginShadows();const $=E.state.shadowsArray;if(Be.render($,T,k),Fe===!0&&Ne.endShadows(),(K&&A.hasRenderPass())===!1){const Ae=w.opaque,Me=w.transmissive;if(E.setupLights(),k.isArrayCamera){const Te=k.cameras;if(Me.length>0)for(let De=0,Qe=Te.length;De<Qe;De++){const tt=Te[De];Xl(Ae,Me,T,tt)}xt&&Ke.render(T);for(let De=0,Qe=Te.length;De<Qe;De++){const tt=Te[De];Vl(w,T,tt,tt.viewport)}}else Me.length>0&&Xl(Ae,Me,T,k),xt&&Ke.render(T),Vl(w,T,k)}Q!==null&&V===0&&(Z.updateMultisampleRenderTarget(Q),Z.updateRenderTargetMipmap(Q)),K&&A.end(D),T.isScene===!0&&T.onAfterRender(D,T,k),ye.resetDefaultState(),X=-1,te=null,y.pop(),y.length>0?(E=y[y.length-1],Z.setTextureUnits(E.state.textureUnits),Fe===!0&&Ne.setGlobalState(D.clippingPlanes,E.state.camera)):E=null,L.pop(),L.length>0?w=L[L.length-1]:w=null,U!==null&&U.renderEnd()};function ya(T,k,J,K){if(T.visible===!1)return;if(T.layers.test(k.layers)){if(T.isGroup)J=T.renderOrder;else if(T.isLOD)T.autoUpdate===!0&&T.update(k);else if(T.isLightProbeGrid)E.pushLightProbeGrid(T);else if(T.isLight)E.pushLight(T),T.castShadow&&E.pushShadow(T);else if(T.isSprite){if(!T.frustumCulled||T.intersectsFrustum(Ce)){K&&Dt.setFromMatrixPosition(T.matrixWorld).applyMatrix4(Ye);const Ae=ie.update(T),Me=T.material;Me.visible&&w.push(T,Ae,Me,J,Dt.z,null,k)}}else if((T.isMesh||T.isLine||T.isPoints)&&(!T.frustumCulled||T.intersectsFrustum(Ce))){const Ae=ie.update(T),Me=T.material;if(K&&(T.boundingSphere!==void 0?(T.boundingSphere===null&&T.computeBoundingSphere(),Dt.copy(T.boundingSphere.center)):(Ae.boundingSphere===null&&Ae.computeBoundingSphere(),Dt.copy(Ae.boundingSphere.center)),Dt.applyMatrix4(T.matrixWorld).applyMatrix4(Ye)),Array.isArray(Me)){const Te=Ae.groups;for(let De=0,Qe=Te.length;De<Qe;De++){const tt=Te[De],Re=Me[tt.materialIndex];Re&&Re.visible&&w.push(T,Ae,Re,J,Dt.z,tt,k)}}else Me.visible&&w.push(T,Ae,Me,J,Dt.z,null,k)}}const Se=T.children;for(let Ae=0,Me=Se.length;Ae<Me;Ae++)ya(Se[Ae],k,J,K)}function Vl(T,k,J,K){const{opaque:$,transmissive:Se,transparent:Ae}=T;E.setupLightsView(J),Fe===!0&&Ne.setGlobalState(D.clippingPlanes,J),K&&b.viewport(B.copy(K)),$.length>0&&ts($,k,J),Se.length>0&&ts(Se,k,J),Ae.length>0&&ts(Ae,k,J),b.buffers.depth.setTest(!0),b.buffers.depth.setMask(!0),b.buffers.color.setMask(!0),b.setPolygonOffset(!1)}function Xl(T,k,J,K){if((J.isScene===!0?J.overrideMaterial:null)!==null)return;if(E.state.transmissionRenderTarget[K.id]===void 0){const Re=ze.has("EXT_color_buffer_half_float")||ze.has("EXT_color_buffer_float");E.state.transmissionRenderTarget[K.id]=new En(1,1,{generateMipmaps:!0,type:Re?Xn:fn,minFilter:Di,samples:Math.max(4,I.samples),stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:nt.workingColorSpace})}const Se=E.state.transmissionRenderTarget[K.id],Ae=K.viewport||B;Se.setSize(Ae.z*D.transmissionResolutionScale,Ae.w*D.transmissionResolutionScale);const Me=D.getRenderTarget(),Te=D.getActiveCubeFace(),De=D.getActiveMipmapLevel();D.setRenderTarget(Se),D.getClearColor(_e),Ie=D.getClearAlpha(),Ie<1&&D.setClearColor(16777215,.5),D.clear(),xt&&Ke.render(J);const Qe=D.toneMapping;D.toneMapping=Wn;const tt=K.viewport;if(K.viewport!==void 0&&(K.viewport=void 0),E.setupLightsView(K),Fe===!0&&Ne.setGlobalState(D.clippingPlanes,K),ts(T,J,K),Z.updateMultisampleRenderTarget(Se),Z.updateRenderTargetMipmap(Se),ze.has("WEBGL_multisampled_render_to_texture")===!1){let Re=!1;for(let ut=0,Ot=k.length;ut<Ot;ut++){const Tt=k[ut],{object:bt,geometry:Jt,material:we,group:nn}=Tt;if(we.side===jn&&bt.layers.test(K.layers)){const at=we.side;we.side=on,we.needsUpdate=!0,Yl(bt,J,K,Jt,we,nn),we.side=at,we.needsUpdate=!0,Re=!0}}Re===!0&&(Z.updateMultisampleRenderTarget(Se),Z.updateRenderTargetMipmap(Se))}D.setRenderTarget(Me,Te,De),D.setClearColor(_e,Ie),tt!==void 0&&(K.viewport=tt),D.toneMapping=Qe}function ts(T,k,J){const K=k.isScene===!0?k.overrideMaterial:null;for(let $=0,Se=T.length;$<Se;$++){const Ae=T[$],{object:Me,geometry:Te,group:De}=Ae;let Qe=Ae.material;Qe.allowOverride===!0&&K!==null&&(Qe=K),Me.layers.test(J.layers)&&Yl(Me,k,J,Te,Qe,De)}}function Yl(T,k,J,K,$,Se){U!==null&&$.isNodeMaterial&&U.setObject(T,$),T.onBeforeRender(D,k,J,K,$,Se),T.modelViewMatrix.multiplyMatrices(J.matrixWorldInverse,T.matrixWorld),T.normalMatrix.getNormalMatrix(T.modelViewMatrix),$.onBeforeRender(D,k,J,K,T,Se),$.transparent===!0&&$.side===jn&&$.forceSinglePass===!1?($.side=on,$.needsUpdate=!0,D.renderBufferDirect(J,k,K,$,T,Se),$.side=Oi,$.needsUpdate=!0,D.renderBufferDirect(J,k,K,$,T,Se),$.side=jn):D.renderBufferDirect(J,k,K,$,T,Se),T.onAfterRender(D,k,J,K,$,Se)}function ns(T,k,J){k.isScene!==!0&&(k=Xt);const K=q.get(T),$=E.state.lights,Se=E.state.shadowsArray,Ae=$.state.version,Me=de.getParameters(T,$.state,Se,k,J,E.state.lightProbeGridArray),Te=de.getProgramCacheKey(Me);let De=K.programs;K.environment=T.isMeshStandardMaterial||T.isMeshLambertMaterial||T.isMeshPhongMaterial?k.environment:null,K.fog=k.fog;const Qe=T.isMeshStandardMaterial||T.isMeshLambertMaterial&&!T.envMap||T.isMeshPhongMaterial&&!T.envMap;K.envMap=ce.get(T.envMap||K.environment,Qe),K.envMapRotation=K.environment!==null&&T.envMap===null?k.environmentRotation:T.envMapRotation,De===void 0&&(T.addEventListener("dispose",Un),De=new Map,K.programs=De);let tt=De.get(Te);if(tt!==void 0){if(K.currentProgram===tt&&K.lightsStateVersion===Ae)return Kl(T,Me),tt}else Me.uniforms=de.getUniforms(T),U!==null&&T.isNodeMaterial&&U.build(T,J,Me),T.onBeforeCompile(Me,D),tt=de.acquireProgram(Me,Te),De.set(Te,tt),K.uniforms=Me.uniforms;const Re=K.uniforms;return(!T.isShaderMaterial&&!T.isRawShaderMaterial||T.clipping===!0)&&(Re.clippingPlanes=Ne.uniform),Kl(T,Me),K.needsLights=Bu(T),K.lightsStateVersion=Ae,K.needsLights&&(Re.ambientLightColor.value=$.state.ambient,Re.lightProbe.value=$.state.probe,Re.sunLights.value=$.state.sun,Re.sunLightShadows.value=$.state.sunShadow,Re.directionalLights.value=$.state.directional,Re.directionalLightShadows.value=$.state.directionalShadow,Re.spotLights.value=$.state.spot,Re.spotLightShadows.value=$.state.spotShadow,Re.rectAreaLights.value=$.state.rectArea,Re.ltc_1.value=$.state.rectAreaLTC1,Re.ltc_2.value=$.state.rectAreaLTC2,Re.pointLights.value=$.state.point,Re.pointLightShadows.value=$.state.pointShadow,Re.hemisphereLights.value=$.state.hemi,Re.sunShadowMatrix.value=$.state.sunShadowMatrix,Re.sunShadowCascade.value=$.state.sunShadowCascade,Re.directionalShadowMatrix.value=$.state.directionalShadowMatrix,Re.spotLightMatrix.value=$.state.spotLightMatrix,Re.spotLightMap.value=$.state.spotLightMap,Re.pointShadowMatrix.value=$.state.pointShadowMatrix),K.lightProbeGrid=E.state.lightProbeGridArray.length>0,K.currentProgram=tt,K.uniformsList=null,tt}function ql(T){if(T.uniformsList===null){const k=T.currentProgram.getUniforms();T.uniformsList=Xs.seqWithValue(k.seq,T.uniforms)}return T.uniformsList}function Kl(T,k){const J=q.get(T);J.outputColorSpace=k.outputColorSpace,J.batching=k.batching,J.batchingColor=k.batchingColor,J.instancing=k.instancing,J.instancingColor=k.instancingColor,J.instancingMorph=k.instancingMorph,J.skinning=k.skinning,J.morphTargets=k.morphTargets,J.morphNormals=k.morphNormals,J.morphColors=k.morphColors,J.morphTargetsCount=k.morphTargetsCount,J.numClippingPlanes=k.numClippingPlanes,J.numIntersection=k.numClipIntersection,J.vertexAlphas=k.vertexAlphas,J.vertexTangents=k.vertexTangents,J.toneMapping=k.toneMapping}function Uu(T,k){if(T.length===0)return null;if(T.length===1)return T[0].texture!==null?T[0]:null;S.setFromMatrixPosition(k.matrixWorld);for(let J=0,K=T.length;J<K;J++){const $=T[J];if($.texture!==null&&$.boundingBox.containsPoint(S))return $}return null}function Fu(T,k,J,K,$){k.isScene!==!0&&(k=Xt),Z.resetTextureUnits();const Se=k.fog,Ae=K.isMeshStandardMaterial||K.isMeshLambertMaterial||K.isMeshPhongMaterial?k.environment:null,Me=Q===null?D.outputColorSpace:Q.isXRRenderTarget===!0?Q.texture.colorSpace:nt.workingColorSpace,Te=K.isMeshStandardMaterial||K.isMeshLambertMaterial&&!K.envMap||K.isMeshPhongMaterial&&!K.envMap,De=ce.get(K.envMap||Ae,Te),Qe=K.vertexColors===!0&&!!J.attributes.color&&J.attributes.color.itemSize===4,tt=!!J.attributes.tangent&&(!!K.normalMap||K.anisotropy>0),Re=!!J.morphAttributes.position,ut=!!J.morphAttributes.normal,Ot=!!J.morphAttributes.color;let Tt=Wn;K.toneMapped&&(Q===null||Q.isXRRenderTarget===!0)&&(Tt=D.toneMapping);const bt=J.morphAttributes.position||J.morphAttributes.normal||J.morphAttributes.color,Jt=bt!==void 0?bt.length:0,we=q.get(K),nn=E.state.lights;if(Fe===!0&&(qe===!0||T!==te)){const Et=T===te&&K.id===X;Ne.setState(K,T,Et)}let at=!1;K.version===we.__version?(we.needsLights&&we.lightsStateVersion!==nn.state.version||we.outputColorSpace!==Me||$.isBatchedMesh&&we.batching===!1||!$.isBatchedMesh&&we.batching===!0||$.isBatchedMesh&&we.batchingColor===!0&&$._colorsTexture===null||$.isBatchedMesh&&we.batchingColor===!1&&$._colorsTexture!==null||$.isInstancedMesh&&we.instancing===!1||!$.isInstancedMesh&&we.instancing===!0||$.isSkinnedMesh&&we.skinning===!1||!$.isSkinnedMesh&&we.skinning===!0||$.isInstancedMesh&&we.instancingColor===!0&&$.instanceColor===null||$.isInstancedMesh&&we.instancingColor===!1&&$.instanceColor!==null||$.isInstancedMesh&&we.instancingMorph===!0&&$.morphTexture===null||$.isInstancedMesh&&we.instancingMorph===!1&&$.morphTexture!==null||we.envMap!==De||K.fog===!0&&we.fog!==Se||we.numClippingPlanes!==void 0&&(we.numClippingPlanes!==Ne.numPlanes||we.numIntersection!==Ne.numIntersection)||we.vertexAlphas!==Qe||we.vertexTangents!==tt||we.morphTargets!==Re||we.morphNormals!==ut||we.morphColors!==Ot||we.toneMapping!==Tt||we.morphTargetsCount!==Jt||!!we.lightProbeGrid!=E.state.lightProbeGridArray.length>0)&&(at=!0):(at=!0,we.__version=K.version);let Sn=we.currentProgram;at===!0&&(Sn=ns(K,k,$),U&&K.isNodeMaterial&&U.onUpdateProgram(K,Sn,we));let Fn=!1,si=!1,Wi=!1;const vt=Sn.getUniforms(),Ft=we.uniforms;if(b.useProgram(Sn.program)&&(Fn=!0,si=!0,Wi=!0),K.id!==X&&(X=K.id,si=!0),we.needsLights){const Et=Uu(E.state.lightProbeGridArray,$);we.lightProbeGrid!==Et&&(we.lightProbeGrid=Et,si=!0)}if(Fn||te!==T){b.buffers.depth.getReversed()&&T.reversedDepth!==!0&&(T._reversedDepth=!0,T.updateProjectionMatrix()),vt.setValue(G,"projectionMatrix",T.projectionMatrix),vt.setValue(G,"viewMatrix",T.matrixWorldInverse);const oi=vt.map.cameraPosition;oi!==void 0&&oi.setValue(G,St.setFromMatrixPosition(T.matrixWorld)),I.logarithmicDepthBuffer&&vt.setValue(G,"logDepthBufFC",2/(Math.log(T.far+1)/Math.LN2)),(K.isMeshPhongMaterial||K.isMeshToonMaterial||K.isMeshLambertMaterial||K.isMeshBasicMaterial||K.isMeshStandardMaterial||K.isShaderMaterial)&&vt.setValue(G,"isOrthographic",T.isOrthographicCamera===!0),te!==T&&(te=T,si=!0,Wi=!0)}if(we.needsLights&&(nn.state.sunShadowMap.length>0&&vt.setValue(G,"sunShadowMap",nn.state.sunShadowMap,Z),nn.state.directionalShadowMap.length>0&&vt.setValue(G,"directionalShadowMap",nn.state.directionalShadowMap,Z),nn.state.spotShadowMap.length>0&&vt.setValue(G,"spotShadowMap",nn.state.spotShadowMap,Z),nn.state.pointShadowMap.length>0&&vt.setValue(G,"pointShadowMap",nn.state.pointShadowMap,Z)),$.isSkinnedMesh){vt.setOptional(G,$,"bindMatrix"),vt.setOptional(G,$,"bindMatrixInverse");const Et=$.skeleton;Et&&(Et.boneTexture===null&&Et.computeBoneTexture(),vt.setValue(G,"boneTexture",Et.boneTexture,Z))}$.isBatchedMesh&&(vt.setOptional(G,$,"batchingTexture"),vt.setValue(G,"batchingTexture",$._matricesTexture,Z),vt.setOptional(G,$,"batchingIdTexture"),vt.setValue(G,"batchingIdTexture",$._indirectTexture,Z),vt.setOptional(G,$,"batchingColorTexture"),$._colorsTexture!==null&&vt.setValue(G,"batchingColorTexture",$._colorsTexture,Z));const ai=J.morphAttributes;if((ai.position!==void 0||ai.normal!==void 0||ai.color!==void 0)&&H.update($,J,Sn),(si||we.receiveShadow!==$.receiveShadow)&&(we.receiveShadow=$.receiveShadow,vt.setValue(G,"receiveShadow",$.receiveShadow)),(K.isMeshStandardMaterial||K.isMeshLambertMaterial||K.isMeshPhongMaterial)&&K.envMap===null&&k.environment!==null&&(Ft.envMapIntensity.value=k.environmentIntensity),Ft.dfgLUT!==void 0&&(Ft.dfgLUT.value=rM()),si){if(vt.setValue(G,"toneMappingExposure",D.toneMappingExposure),we.needsLights&&Ou(Ft,Wi),Se&&K.fog===!0&&Le.refreshFogUniforms(Ft,Se),Le.refreshMaterialUniforms(Ft,K,se,ee,E.state.transmissionRenderTarget[T.id]),we.needsLights&&we.lightProbeGrid){const Et=we.lightProbeGrid;Ft.probesSH.value=Et.texture,Ft.probesMin.value.copy(Et.boundingBox.min),Ft.probesMax.value.copy(Et.boundingBox.max),Ft.probesResolution.value.copy(Et.resolution)}Xs.upload(G,ql(we),Ft,Z)}if(K.isShaderMaterial&&K.uniformsNeedUpdate===!0&&(Xs.upload(G,ql(we),Ft,Z),K.uniformsNeedUpdate=!1),K.isSpriteMaterial&&vt.setValue(G,"center",$.center),vt.setValue(G,"modelViewMatrix",$.modelViewMatrix),vt.setValue(G,"normalMatrix",$.normalMatrix),vt.setValue(G,"modelMatrix",$.matrixWorld),K.uniformsGroups!==void 0){const Et=K.uniformsGroups;for(let oi=0,Vi=Et.length;oi<Vi;oi++){const Zl=Et[oi];oe.update(Zl,Sn),oe.bind(Zl,Sn)}}return Sn}function Ou(T,k){T.ambientLightColor.needsUpdate=k,T.lightProbe.needsUpdate=k,T.sunLights.needsUpdate=k,T.sunLightShadows.needsUpdate=k,T.directionalLights.needsUpdate=k,T.directionalLightShadows.needsUpdate=k,T.pointLights.needsUpdate=k,T.pointLightShadows.needsUpdate=k,T.spotLights.needsUpdate=k,T.spotLightShadows.needsUpdate=k,T.rectAreaLights.needsUpdate=k,T.hemisphereLights.needsUpdate=k}function Bu(T){return T.isMeshLambertMaterial||T.isMeshToonMaterial||T.isMeshPhongMaterial||T.isMeshStandardMaterial||T.isShadowMaterial||T.isShaderMaterial&&T.lights===!0}this.getActiveCubeFace=function(){return O},this.getActiveMipmapLevel=function(){return V},this.getRenderTarget=function(){return Q},this.setRenderTargetTextures=function(T,k,J){const K=q.get(T);K.__autoAllocateDepthBuffer=T.resolveDepthBuffer===!1,K.__autoAllocateDepthBuffer===!1&&(K.__useRenderToTexture=!1),q.get(T.texture).__webglTexture=k,q.get(T.depthTexture).__webglTexture=K.__autoAllocateDepthBuffer?void 0:J,K.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(T,k){const J=q.get(T);J.__webglFramebuffer=k,J.__useDefaultFramebuffer=k===void 0},this.setRenderTarget=function(T,k=0,J=0){Q=T,O=k,V=J;let K=null,$=!1,Se=!1;if(T){const Me=q.get(T);if(Me.__useDefaultFramebuffer!==void 0){b.bindFramebuffer(G.FRAMEBUFFER,Me.__webglFramebuffer),B.copy(T.viewport),ne.copy(T.scissor),le=T.scissorTest,b.viewport(B),b.scissor(ne),b.setScissorTest(le),X=-1;return}else if(Me.__webglFramebuffer===void 0)Z.setupRenderTarget(T);else if(Me.__hasExternalTextures)Z.rebindTextures(T,q.get(T.texture).__webglTexture,q.get(T.depthTexture).__webglTexture);else if(T.depthBuffer){const Qe=T.depthTexture;if(Me.__boundDepthTexture!==Qe){if(Qe!==null&&q.has(Qe)&&(T.width!==Qe.image.width||T.height!==Qe.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");Z.setupDepthRenderbuffer(T)}}const Te=T.texture;(Te.isData3DTexture||Te.isDataArrayTexture||Te.isCompressedArrayTexture)&&(Se=!0);const De=q.get(T).__webglFramebuffer;T.isWebGLCubeRenderTarget?(Array.isArray(De[k])?K=De[k][J]:K=De[k],$=!0):T.samples>0&&Z.useMultisampledRTT(T)===!1?K=q.get(T).__webglMultisampledFramebuffer:Array.isArray(De)?K=De[J]:K=De,B.copy(T.viewport),ne.copy(T.scissor),le=T.scissorTest}else B.copy(ae).multiplyScalar(se).floor(),ne.copy(Ee).multiplyScalar(se).floor(),le=Ze;if(J!==0&&(K=N),b.bindFramebuffer(G.FRAMEBUFFER,K)&&b.drawBuffers(T,K),b.viewport(B),b.scissor(ne),b.setScissorTest(le),$){const Me=q.get(T.texture);G.framebufferTexture2D(G.FRAMEBUFFER,G.COLOR_ATTACHMENT0,G.TEXTURE_CUBE_MAP_POSITIVE_X+k,Me.__webglTexture,J)}else if(Se){const Me=k;for(let Te=0;Te<T.textures.length;Te++){const De=q.get(T.textures[Te]);G.framebufferTextureLayer(G.FRAMEBUFFER,G.COLOR_ATTACHMENT0+Te,De.__webglTexture,J,Me)}}else if(T!==null&&J!==0){const Me=q.get(T.texture);G.framebufferTexture2D(G.FRAMEBUFFER,G.COLOR_ATTACHMENT0,G.TEXTURE_2D,Me.__webglTexture,J)}X=-1};function $l(T){const k=q.get(T);return(k.__readFormat!==T.format||k.__readType!==T.type)&&(k.__readFormat=T.format,k.__readType=T.type,k.__formatReadable=I.textureFormatReadable(T.format),k.__typeReadable=I.textureTypeReadable(T.type)),k}this.readRenderTargetPixels=function(T,k,J,K,$,Se,Ae,Me=0){if(!(T&&T.isWebGLRenderTarget)){lt("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Te=q.get(T).__webglFramebuffer;if(T.isWebGLCubeRenderTarget&&Ae!==void 0&&(Te=Te[Ae]),Te){b.bindFramebuffer(G.FRAMEBUFFER,Te);try{const De=T.textures[Me],Qe=De.format,tt=De.type;T.textures.length>1&&G.readBuffer(G.COLOR_ATTACHMENT0+Me);const Re=$l(De);if(Re.__formatReadable===!1){lt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(Re.__typeReadable===!1){lt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}k>=0&&k<=T.width-K&&J>=0&&J<=T.height-$&&G.readPixels(k,J,K,$,me.convert(Qe),me.convert(tt),Se)}finally{const De=Q!==null?q.get(Q).__webglFramebuffer:null;b.bindFramebuffer(G.FRAMEBUFFER,De)}}},this.readRenderTargetPixelsAsync=async function(T,k,J,K,$,Se,Ae,Me=0){if(!(T&&T.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Te=q.get(T).__webglFramebuffer;if(T.isWebGLCubeRenderTarget&&Ae!==void 0&&(Te=Te[Ae]),Te)if(k>=0&&k<=T.width-K&&J>=0&&J<=T.height-$){b.bindFramebuffer(G.FRAMEBUFFER,Te);const De=T.textures[Me],Qe=De.format,tt=De.type;T.textures.length>1&&G.readBuffer(G.COLOR_ATTACHMENT0+Me);const Re=$l(De);if(Re.__formatReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(Re.__typeReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const ut=G.createBuffer();G.bindBuffer(G.PIXEL_PACK_BUFFER,ut),G.bufferData(G.PIXEL_PACK_BUFFER,Se.byteLength,G.STREAM_READ),G.readPixels(k,J,K,$,me.convert(Qe),me.convert(tt),0),G.bindBuffer(G.PIXEL_PACK_BUFFER,null);const Ot=Q!==null?q.get(Q).__webglFramebuffer:null;b.bindFramebuffer(G.FRAMEBUFFER,Ot);const Tt=G.fenceSync(G.SYNC_GPU_COMMANDS_COMPLETE,0);return G.flush(),await Em(G,Tt,4),G.bindBuffer(G.PIXEL_PACK_BUFFER,ut),G.getBufferSubData(G.PIXEL_PACK_BUFFER,0,Se),G.bindBuffer(G.PIXEL_PACK_BUFFER,null),G.deleteBuffer(ut),G.deleteSync(Tt),Se}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(T,k=null,J=0){const K=Math.pow(2,-J),$=Math.floor(T.image.width*K),Se=Math.floor(T.image.height*K),Ae=k!==null?k.x:0,Me=k!==null?k.y:0;Z.setTexture2D(T,0),G.copyTexSubImage2D(G.TEXTURE_2D,J,0,0,Ae,Me,$,Se),b.unbindTexture()},this.copyTextureToTexture=function(T,k,J=null,K=null,$=0,Se=0){let Ae,Me,Te,De,Qe,tt,Re,ut,Ot;const Tt=T.isCompressedTexture?T.mipmaps[Se]:T.image;if(J!==null)Ae=J.max.x-J.min.x,Me=J.max.y-J.min.y,Te=J.isBox3?J.max.z-J.min.z:1,De=J.min.x,Qe=J.min.y,tt=J.isBox3?J.min.z:0;else{const Ft=Math.pow(2,-$);Ae=Math.floor(Tt.width*Ft),Me=Math.floor(Tt.height*Ft),T.isDataArrayTexture?Te=Tt.depth:T.isData3DTexture?Te=Math.floor(Tt.depth*Ft):Te=1,De=0,Qe=0,tt=0}K!==null?(Re=K.x,ut=K.y,Ot=K.z):(Re=0,ut=0,Ot=0);const bt=me.convert(k.format),Jt=me.convert(k.type);let we;k.isData3DTexture?(Z.setTexture3D(k,0),we=G.TEXTURE_3D):k.isDataArrayTexture||k.isCompressedArrayTexture?(Z.setTexture2DArray(k,0),we=G.TEXTURE_2D_ARRAY):(Z.setTexture2D(k,0),we=G.TEXTURE_2D),b.activeTexture(G.TEXTURE0),b.pixelStorei(G.UNPACK_FLIP_Y_WEBGL,k.flipY),b.pixelStorei(G.UNPACK_PREMULTIPLY_ALPHA_WEBGL,k.premultiplyAlpha),b.pixelStorei(G.UNPACK_ALIGNMENT,k.unpackAlignment);const nn=b.getParameter(G.UNPACK_ROW_LENGTH),at=b.getParameter(G.UNPACK_IMAGE_HEIGHT),Sn=b.getParameter(G.UNPACK_SKIP_PIXELS),Fn=b.getParameter(G.UNPACK_SKIP_ROWS),si=b.getParameter(G.UNPACK_SKIP_IMAGES);b.pixelStorei(G.UNPACK_ROW_LENGTH,Tt.width),b.pixelStorei(G.UNPACK_IMAGE_HEIGHT,Tt.height),b.pixelStorei(G.UNPACK_SKIP_PIXELS,De),b.pixelStorei(G.UNPACK_SKIP_ROWS,Qe),b.pixelStorei(G.UNPACK_SKIP_IMAGES,tt);const Wi=T.isDataArrayTexture||T.isData3DTexture,vt=k.isDataArrayTexture||k.isData3DTexture;if(T.isDepthTexture){const Ft=q.get(T),ai=q.get(k),Et=q.get(Ft.__renderTarget),oi=q.get(ai.__renderTarget);b.bindFramebuffer(G.READ_FRAMEBUFFER,Et.__webglFramebuffer),b.bindFramebuffer(G.DRAW_FRAMEBUFFER,oi.__webglFramebuffer);for(let Vi=0;Vi<Te;Vi++)Wi&&(G.framebufferTextureLayer(G.READ_FRAMEBUFFER,G.COLOR_ATTACHMENT0,q.get(T).__webglTexture,$,tt+Vi),G.framebufferTextureLayer(G.DRAW_FRAMEBUFFER,G.COLOR_ATTACHMENT0,q.get(k).__webglTexture,Se,Ot+Vi)),G.blitFramebuffer(De,Qe,Ae,Me,Re,ut,Ae,Me,G.DEPTH_BUFFER_BIT,G.NEAREST);b.bindFramebuffer(G.READ_FRAMEBUFFER,null),b.bindFramebuffer(G.DRAW_FRAMEBUFFER,null)}else if($!==0||T.isRenderTargetTexture||q.has(T)){const Ft=q.get(T),ai=q.get(k);b.bindFramebuffer(G.READ_FRAMEBUFFER,P),b.bindFramebuffer(G.DRAW_FRAMEBUFFER,F);for(let Et=0;Et<Te;Et++)Wi?G.framebufferTextureLayer(G.READ_FRAMEBUFFER,G.COLOR_ATTACHMENT0,Ft.__webglTexture,$,tt+Et):G.framebufferTexture2D(G.READ_FRAMEBUFFER,G.COLOR_ATTACHMENT0,G.TEXTURE_2D,Ft.__webglTexture,$),vt?G.framebufferTextureLayer(G.DRAW_FRAMEBUFFER,G.COLOR_ATTACHMENT0,ai.__webglTexture,Se,Ot+Et):G.framebufferTexture2D(G.DRAW_FRAMEBUFFER,G.COLOR_ATTACHMENT0,G.TEXTURE_2D,ai.__webglTexture,Se),$!==0?G.blitFramebuffer(De,Qe,Ae,Me,Re,ut,Ae,Me,G.COLOR_BUFFER_BIT,G.NEAREST):vt?G.copyTexSubImage3D(we,Se,Re,ut,Ot+Et,De,Qe,Ae,Me):G.copyTexSubImage2D(we,Se,Re,ut,De,Qe,Ae,Me);b.bindFramebuffer(G.READ_FRAMEBUFFER,null),b.bindFramebuffer(G.DRAW_FRAMEBUFFER,null)}else vt?T.isDataTexture||T.isData3DTexture?G.texSubImage3D(we,Se,Re,ut,Ot,Ae,Me,Te,bt,Jt,Tt.data):k.isCompressedArrayTexture?G.compressedTexSubImage3D(we,Se,Re,ut,Ot,Ae,Me,Te,bt,Tt.data):G.texSubImage3D(we,Se,Re,ut,Ot,Ae,Me,Te,bt,Jt,Tt):T.isDataTexture?G.texSubImage2D(G.TEXTURE_2D,Se,Re,ut,Ae,Me,bt,Jt,Tt.data):T.isCompressedTexture?G.compressedTexSubImage2D(G.TEXTURE_2D,Se,Re,ut,Tt.width,Tt.height,bt,Tt.data):G.texSubImage2D(G.TEXTURE_2D,Se,Re,ut,Ae,Me,bt,Jt,Tt);b.pixelStorei(G.UNPACK_ROW_LENGTH,nn),b.pixelStorei(G.UNPACK_IMAGE_HEIGHT,at),b.pixelStorei(G.UNPACK_SKIP_PIXELS,Sn),b.pixelStorei(G.UNPACK_SKIP_ROWS,Fn),b.pixelStorei(G.UNPACK_SKIP_IMAGES,si),Se===0&&k.generateMipmaps&&G.generateMipmap(we),b.unbindTexture()},this.initRenderTarget=function(T){q.get(T).__webglFramebuffer===void 0&&Z.setupRenderTarget(T)},this.initTexture=function(T){T.isCubeTexture?Z.setTextureCube(T,0):T.isData3DTexture?Z.setTexture3D(T,0):T.isDataArrayTexture||T.isCompressedArrayTexture?Z.setTexture2DArray(T,0):Z.setTexture2D(T,0),b.unbindTexture()},this.resetState=function(){O=0,V=0,Q=null,b.reset(),ye.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Gn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=nt._getDrawingBufferColorSpace(e),t.unpackColorSpace=nt._getUnpackColorSpace()}}const aa=[{id:"stack",crystal:"cyan",tiers:[["bass",4,[.24,.25,.28]],["mid",2,[.46,.15,.25]],["horn",4,[.21,.22,.23]],["tweet",2,[.21,.08,.17]]]},{id:"wall",crystal:"violet",tiers:[["bass",3,[.31,.3,.3]],["mid",2,[.44,.16,.26]],["horn",2,[.3,.25,.24]],["tweet",1,[.26,.09,.18]]]},{id:"tower",crystal:"amber",tiers:[["bass",2,[.28,.27,.29]],["bass",2,[.25,.24,.27]],["horn",2,[.25,.23,.23]],["tweet",3,[.15,.07,.15]]]}],aM={cyan:[[60,220,255],[210,250,255],[150,205,225]],violet:[[175,95,255],[240,215,255],[180,160,225]],amber:[[255,170,50],[255,238,200],[225,190,140]]};function oM(i=0){const[e,t,n]=aM[aa[i%aa.length].crystal];return{[f.STONE]:[78,80,94],[f.STONED]:[36,36,48],[f.MOSS]:[72,108,58],[f.CRYSTAL]:n,[f.RUNE]:e,[f.GLOW]:e,[f.MAGIC2]:t,[f.WOOD]:[150,96,52],[f.LINE]:[24,24,34]}}function ch(i,e,t,n){const r=aa[i%aa.length],s=new Xe({blend:.02}),a=t==="damaged",o=a?0:[0,.5,1][e%3],c=y=>a&&Rt(y,e,31)<.5;let l=0,h=1,d=.3,u=0,p=i*7;const g=(y,A,D,R)=>U=>{if(R&&Math.abs(Math.sin(U[0]*37+U[1]*23+Math.sin(U[2]*17)*2))<.07)return f.STONED;if(U[1]>y-.02&&(U[2]>A-.06||Rt(Math.floor(U[0]*30),Math.floor(U[2]*30),D)<.2)&&Rt(Math.floor(U[0]*40),Math.floor(U[2]*40),D+1)<.6)return f.MOSS},v=(y,A,D,R,U,N)=>{const P=c(N),F=1+o*.08;s.ell([y,A,D],[R*1.18,R*1.18,.06],f.STONED,{group:U,cut:!0}),s.ell([y,A,D-.02],[R*F,R*F,.035+o*.025],f.CRYSTAL,{group:900+N,paint:O=>{const V=Math.hypot(O[0]-y,O[1]-A)/(R*F);return P?V<.3?f.GLOW:f.CRYSTAL:V<.2+o*.15?f.MAGIC2:V<.5?f.GLOW:V<.78?f.CRYSTAL:f.GLOW}})},x=(y,A,D,R,U,N,P,F)=>O=>{if(O[0]>y+R-.022){const V=Math.min(D,U)*1.5,Q=(N-U-O[2])/V+.5,X=(A-O[1])/V+.5;if(Q>=0&&Q<=1&&X>=0&&X<=1&&(n?Jd(n,Q,X,.065):_h(Q,X,P,.12)))return a&&Rt(P,e,5)<.5?f.STONED:f.RUNE}return F(O)},m=r.tiers,_=m[0][1]*m[0][2][0]+.02,M=.08,S=m[0][2][2];s.box([0,M,d-S],[_,M,S],f.STONE,{group:h,round:.03,rough:.006,paint:g(M*2,d,3,a)}),s.box([0,M*.9,d],[_-.06,M*.45,.12],f.STONED,{group:h,cut:!0,paint:y=>y[2]<d-.07?f.GLOW:void 0});for(let y=1;y<m[0][1];y++)s.box([-_+y*_*2/m[0][1],M*.9,d-.06],[.015,M*.45,.06],f.STONE,{group:h});l=M*2,h++;const w=[];m.forEach(([y,A,[D,R,U]],N)=>{const P=y==="tweet"?.09:0,F=A*D*2+(A-1)*(y==="tweet"?.14:.01),O=d-N*.035,V=l+P+R;for(let Q=0;Q<A;Q++){const X=-F/2+D+Q*(D*2+(y==="tweet"?.14:.01));if(a&&y==="horn"&&Q===A-1){w.push([X,D,R,U]);continue}const te=a&&y==="tweet"?[1,.12*(Q%2?1:-1),0]:void 0,B=a&&y==="tweet"?V-.04:V,ne=g(B+R,O-U+U,h,a),le=Q===A-1-(a&&y==="horn"?1:0)&&y!=="tweet";if(s.box([X,B,O-U],[D-.005,R,U],f.STONE,{group:h,round:.035,rough:.004,dir:te,paint:le?x(X,B,R,D-.005,U,O,p++,ne):ne}),y==="bass"&&v(X,V+.02,O,Math.min(D,R)*.72,h,u++),y==="mid"&&(s.ell([X,V,O],[D*.8,R*.7,U*.9],f.STONED,{group:h,cut:!0,paint:_e=>_e[2]<O-U*.45?c(u)?f.STONED:f.GLOW:void 0}),s.box([X,V,O-U*.5],[.018,R*.6,U*.45],f.STONE,{group:h}),u++),y==="horn"){const _e=V+R*.25;s.seg([X,_e,O-U*1.5],[X,_e,O+.03],.03,Math.min(D,R)*.78,f.STONED,{group:h,cut:!0,paint:Ie=>Ie[2]<O-U*.55?c(u)?f.STONED:f.GLOW:void 0}),v(X,V-R*.6,O,R*.22,h,u++)}if(y==="tweet")for(const _e of[-.5,0,.5])v(X+_e*D*1.15,B,O,R*.55,h,u++);h++}if(y!=="tweet"){const Q=a&&y==="horn"?D:0;s.box([-Q,l+R*2+.012,O-.015],[F/2+.01-Q,.012,.015],f.WOOD,{group:h++,round:.008}),l+=.024}y==="tweet"&&!a&&s.flat([0,l+P/2,O-U],[1,0,0],[0,1,0],F/2,P/2,(Q,X)=>Math.abs(X)<.45&&Math.sin(Q*23)>-.4?f.GLOW:null,{group:h++,bend:0}),l+=R*2+P});const E=l;if([[-_-.04,.25,.34,-.3],[_+.02,.2,.3,.35],[-_+.15,.4,.22,-.1],[_-.2,.42,.18,.2],[.1,.45,.16,.15],[-_-.1,-.25,.26,-.4],[_+.08,-.2,.24,.45]].forEach(([y,A,D,R],U)=>{if(a&&U%2){s.seg([y,.03,A],[y+.12,.05,A+.04],.04,.02,f.CRYSTAL,{group:700+U});return}const N=[y+R*D,D,A+.05];s.seg([y,0,A],N,.045+D*.05,.006,f.CRYSTAL,{group:700+U,paint:P=>P[1]>D*(.65-o*.1)&&!a?f.GLOW:void 0}),s.seg([y+.04,0,A-.03],[y+.04+R*D*.5,D*.55,A],.03,.005,f.CRYSTAL,{group:720+U})}),!a)for(const[y,A,D,R]of[[-.55,.1,.1,.03],[.6,.16,0,.025],[.15,.24,-.1,.02]])s.ell([y,E+A-.1,D],[R,R*.8,R],f.STONE,{group:800+Math.round(y*100),extra:!0,rough:.004});for(const[y,A,D,R]of w)s.box([y+.45,A*.75,d+.25],[A,D,R],f.STONE,{group:h++,dir:[.6,.8,.2],round:.035,rough:.007,paint:g(1,0,9,!0)});return{m:s,top:E}}function lM(i){const e=new Xe({blend:.02}),t=(n,r)=>Rt(n,r,i*13+7);e.ell([.1,.1,.62],[.14,.12,.1],f.GLOW,{group:1,paint:n=>n[1]>.16?f.MAGIC2:void 0}),e.seg([.1,.1,.6],[.02,.5,.66],.07,.01,f.GLOW,{group:2,paint:n=>n[1]>.35?f.MAGIC2:f.CRYSTAL});for(let n=0;n<16;n++){const r=n*2.4,s=.15+t(n,1)*.75,a=Math.cos(r)*s,o=Math.sin(r)*s*.6,c=.09+t(n,2)*.1,l=Math.max(.05,(.8-s)*.45)+c*.5;e.box([a,l*.7,o],[c*1.3,c,c*1.1],f.STONE,{group:10+n,dir:[Math.cos(r*1.7),.4+t(n,3),Math.sin(r*2.3)],round:.03,rough:.008,paint:h=>Math.abs(Math.sin(h[0]*41+h[1]*29))<.08?f.STONED:h[1]>l*.7+c*.6&&t(n,4)<.25?f.MOSS:void 0})}for(let n=0;n<4;n++){const r=n*1.7+1,s=Math.cos(r)*.4,a=Math.sin(r)*.25;e.ell([s,.05,a],[.09,.08,.03],f.CRYSTAL,{group:50+n,dir:[Math.cos(r),.5,Math.sin(r)],paint:o=>t(n,5)<.3?f.GLOW:void 0})}for(let n=0;n<4;n++){const r=-.7+n*.45;e.seg([r,0,.4-n*.1],[r+.1,.08+t(n,6)*.1,.42-n*.1],.03,.01,f.CRYSTAL,{group:60+n})}return e}function hh(i,e,t){let n=0;for(let r=0;r<2e3&&n<e;r++){const s=Math.floor(Rt(r,t,1)*i.w),a=Math.floor(Rt(r,t,2)*i.h*.7);i.get(s,a)||i.get(s+1,a)||i.get(s-1,a)||i.get(s,a+1)||i.get(s,a-1)||i.get(s,a+2)||(i.px(s,a,n%3?f.GLOW:f.MAGIC2),n++)}return i}const cM=i=>hl(i)*3,lo=new Map;function hM(i={},{variant:e=0,frame:t=0,state:n="playing",sigil:r}={}){const s=cM(i),a=e+":"+s;lo.has(a)||lo.set(a,gn(ch(e,0,"playing").m,{height:s}).s);const o=lo.get(a);if(n==="destroyed")return hh(gn(lM(e),{scale:o}).sp,3,e*5+1);const{sp:c}=gn(ch(e,t,n,r).m,{scale:o});return hh(c,n==="damaged"?4:10+t*2,e*5+t)}const uM=[{k:"ambientHue",g:"Night light",label:"Twilight hue",min:0,max:1,step:.01,v:.68,hue:!0},{k:"ambient",g:"Night light",label:"Twilight brightness",min:.05,max:.6,step:.01,v:.22},{k:"moon",g:"Night light",label:"Moonlight",min:0,max:1,step:.01,v:.3},{k:"moonHue",g:"Night light",label:"Moon hue",min:0,max:1,step:.01,v:.58,hue:!0},{k:"glowHue",g:"Night light",label:"Witch glow hue",min:0,max:1,step:.01,v:.13,hue:!0},{k:"glowSat",g:"Night light",label:"Witch glow colour",min:0,max:1,step:.01,v:.35},{k:"glowRadius",g:"Night light",label:"Witch glow reach",min:30,max:200,step:5,v:110},{k:"glowPower",g:"Night light",label:"Witch glow strength",min:.3,max:2.5,step:.05,v:1.4},{k:"bands",g:"Shading",label:"Light steps",min:2,max:7,step:1,v:3},{k:"dither",g:"Shading",label:"Dithering",min:0,max:1,step:.05,v:.35},{k:"round",g:"Shading",label:"Roundness",min:.2,max:1.5,step:.05,v:.9},{k:"outline",g:"Shading",label:"Plant outline",options:["none","dark","tinted"],v:"none"},{k:"cOutline",g:"Shading",label:"Creature outline",options:["dark","tinted","none"],v:"dark"},{k:"shafts",g:"Night light",label:"Moonbeams",min:0,max:1,step:.05,v:.3},{k:"areaContrast",g:"Colour",label:"Difference between areas",min:0,max:1,step:.05,v:.6},{k:"sat",g:"Colour",label:"Saturation",min:.2,max:1.3,step:.01,v:.9},{k:"leafHue",g:"Colour",label:"Leaf hue",min:0,max:1,step:.01,v:.3,hue:!0},{k:"leafVariety",g:"Colour",label:"Leaf colour variety",min:0,max:1,step:.05,v:.3},{k:"trunkHue",g:"Colour",label:"Bark hue",min:0,max:1,step:.01,v:.07,hue:!0},{k:"groundHue",g:"Colour",label:"Ground hue",min:0,max:1,step:.01,v:.27,hue:!0},{k:"groundVal",g:"Colour",label:"Ground brightness",min:.15,max:.7,step:.01,v:.4},{k:"pixel",g:"Shading",label:"Pixel size",min:1,max:5,step:1,v:3},{k:"treeSize",g:"Trees",label:"Tree height",min:.5,max:1.5,step:.05,v:.85},{k:"crownWidth",g:"Trees",label:"Crown width",min:1,max:4,step:.1,v:3},{k:"clearing",g:"Trees",label:"Clearing size",min:0,max:1,step:.05,v:.55},{k:"depth",g:"Map",label:"Border detail (fractal layers)",min:0,max:6,step:1,v:4},{k:"areaScale",g:"Map",label:"Area size (screens)",min:.6,max:2,step:.05,v:1},{k:"areaTypes",g:"Map",label:"Area types",min:4,max:30,step:1,v:30},{k:"density",g:"Trees",label:"Foliage density",min:.2,max:1,step:.05,v:.55},{k:"clump",g:"Trees",label:"Clumpiness",min:0,max:1,step:.05,v:.6},{k:"gnarl",g:"Trees",label:"Gnarliness",min:0,max:1,step:.05,v:.5},{k:"roots",g:"Trees",label:"Roots",min:0,max:1,step:.05,v:.6},{k:"bark",g:"Trees",label:"Bark texture",min:0,max:1,step:.05,v:.6},{k:"trees",g:"Trees",label:"Tree density",min:.2,max:2,step:.05,v:1},{k:"wBroad",g:"Tree mix",label:"Gnarled broadleaf",min:0,max:1,step:.05,v:.8},{k:"wFir",g:"Tree mix",label:"Fir",min:0,max:1,step:.05,v:.6},{k:"wWillow",g:"Tree mix",label:"Willow",min:0,max:1,step:.05,v:.5},{k:"wBirch",g:"Tree mix",label:"Birch",min:0,max:1,step:.05,v:.5},{k:"wPalm",g:"Tree mix",label:"Tree fern",min:0,max:1,step:.05,v:.3},{k:"wFlat",g:"Tree mix",label:"Flat-crowned",min:0,max:1,step:.05,v:.5},{k:"bushes",g:"Undergrowth",label:"Bushes and shrubs",min:0,max:120,step:1,v:55},{k:"bushSize",g:"Undergrowth",label:"Bush size",min:.5,max:1.8,step:.05,v:1},{k:"flowers",g:"Undergrowth",label:"Flowers",min:0,max:1,step:.05,v:.3},{k:"cSat",g:"Creatures",label:"Creature saturation",min:.1,max:1,step:.01,v:.6},{k:"cVal",g:"Creatures",label:"Creature brightness",min:.4,max:1,step:.01,v:.85},{k:"head",g:"Creatures",label:"Baby head size",min:.3,max:.6,step:.01,v:.44},{k:"eye",g:"Creatures",label:"Eye size",min:.5,max:2,step:.05,v:1},{k:"legs",g:"Creatures",label:"Leg length",min:.5,max:1.8,step:.05,v:1},{k:"long",g:"Creatures",label:"Body length",min:.7,max:1.5,step:.05,v:1},{k:"size",g:"Creatures",label:"Baby size (px)",min:5,max:14,step:1,v:8},{k:"growth",g:"Creatures",label:"Legend vs baby height",min:5,max:25,step:1,v:20},{k:"magicHue",g:"Creatures",label:"Magic glow hue",min:0,max:1,step:.01,v:.5,hue:!0},{k:"fur",g:"Creatures",label:"Stripes and spots",min:0,max:1,step:.05,v:.5},{k:"cloakHue",g:"Witch",label:"Jacket hue",min:0,max:1,step:.01,v:.72,hue:!0},{k:"hairHue",g:"Witch",label:"Hair hue",min:0,max:1,step:.01,v:.01,hue:!0},{k:"hatHue",g:"Witch",label:"Hat hue",min:0,max:1,step:.01,v:.74,hue:!0},{k:"topHue",g:"Witch",label:"Top hue",min:0,max:1,step:.01,v:.13,hue:!0},{k:"jeansHue",g:"Witch",label:"Jeans hue",min:0,max:1,step:.01,v:.6,hue:!0},{k:"shoeHue",g:"Witch",label:"Sneakers hue",min:0,max:1,step:.01,v:0,hue:!0},{k:"phonesHue",g:"Witch",label:"Headphones hue",min:0,max:1,step:.01,v:.92,hue:!0}];function dM(){const i={};return uM.forEach(e=>i[e.k]=e.v),i}const fM={broad:Ph,fir:xl,willow:Dh,birch:Ih,flat:Nh};function pM(i,e,t,n,r){const s=fM[e.type],a={...t,leafHue:i.leaf+(e.dark?.05:0),gnarl:e.gnarl??t.gnarl,treeBare:e.bare,treeTrunks:e.trunks,treeLean:e.lean,treeThick:e.thick,treeThin:e.thin,treeHollow:e.hollow,treeWebs:e.webs},o=s(n,a,t.treeSize*r*(e.scale||1)*be(n,.9,1.1)),c=vl(n,a,s);return e.dark&&(c[f.LEAF]=c[f.LEAF3],c[f.LEAF3]=ge(i.leaf+.05,.7,.22)),c[f.NOSE]=[20,16,24],c[f.GLINT]=[235,235,240],{parts:jd(o),colours:c}}function mM(i,e,t,n,r){const s=vn[t].id,a=Jr.find(p=>p.id===s),o=of(s,i,{K:n,makeCanvas:r}),c=[],l=p=>c.push(p)-1,h={big:[],small:[],walls:[],set:null},d=(p,g)=>gi(p,g,i,"none",r),u=(p,g)=>{const{parts:v,colours:x}=pM(a,p,i,vi(e*13+t*101+g*7+1),n);return{bot:l(d(v.bot,x)),top:l(d(v.top,x))}};a.big.forEach(([p,g],v)=>{if(p!=="tree"){h.big.push({bot:l(o.big[v].sp),top:null});return}const x=Math.max(1,Math.round(Oh/a.big.length));for(let m=0;m<x;m++)h.big.push(u(g,v*17+m))}),a.small.forEach(([p,g],v)=>h.small.push(p==="tree"?u(g,500+v):{bot:l(o.small[v].sp),top:null}));for(const p of o.walls)h.walls.push(l(p.sp));return o.setPiece&&(h.set=a.set?.[0]==="tree"?u(a.set[1],900):{bot:l(o.setPiece.sp),top:null}),{sprites:c,layout:h,floor:o.floor.sp}}function uh(i,e,t,n=null){const r=[];for(const s of["towards","away"])for(let a=0;a<4;a++)for(let o=0;o<2;o++)r.push(gi(Bd(e,a,o,i,s,n),Ud(e,i,n),i,i.cOutline,t));return r}const gM=(i,e,t=!1)=>(t?8:0)+i*2+e;function oa(i,e,t){return i.getContext("2d").getImageData(0,0,e,t).data}function Ys(i,e=2048){const n=[];let r=0,s=0,a=0,o=1;for(const u of i)r+u.w+1>e&&(r=0,s+=a+1,a=0),n.push({x:r,y:s}),r+=u.w+1,a=Math.max(a,u.h),o=Math.max(o,r);const c=Math.max(1,s+a),l=new Uint8Array(o*c*4),h=new Uint8Array(o*c*4),d=i.map((u,p)=>{const g=n[p],v=oa(u.A,u.w,u.h),x=oa(u.N,u.w,u.h);for(let m=0;m<u.h;m++){const _=m*u.w*4,M=((g.y+m)*o+g.x)*4;l.set(v.subarray(_,_+u.w*4),M),h.set(x.subarray(_,_+u.w*4),M)}return{uv:[g.x/o,g.y/c,(g.x+u.w)/o,(g.y+u.h)/c],w:u.w,h:u.h}});return{albedo:l,normal:h,width:o,height:c,frames:d}}function xM(i,e){if(i.kind==="creature")return{px:Ys(uh(i.style,i.id,e),2048)};if(i.kind==="party")return{px:Ys(uh(i.style,i.species,e,{...Nd(i.seed),collar:i.colour}),2048)};const{sprites:t,layout:n,floor:r}=mM(i.style,i.seed,i.id,i.K,e);return{px:Ys(t),layout:n,floor:{albedo:new Uint8Array(oa(r.A,r.w,r.h)),normal:new Uint8Array(oa(r.N,r.w,r.h)),w:r.w,h:r.h}}}function dh(i,e,t){const n=new hr(i,e,t,pn,fn);return n.magFilter=Ut,n.minFilter=Ut,n.generateMipmaps=!1,n.flipY=!1,n.colorSpace=Dn,n.needsUpdate=!0,n}function Eu(i){return{albedo:dh(i.albedo,i.width,i.height),normal:dh(i.normal,i.width,i.height),frames:i.frames}}const Is=(i,e=2048)=>Eu(Ys(i,e));class vM{constructor(e,t,n){this.style=e,this.seed=t,this.K=2/n;const r=Qu(e),s=c=>gi(ad(e,c),r,e,e.cOutline);this.witch=Is([0,1,2].map(c=>s({frame:c})).concat([0,1,2].map(c=>s({frame:c,facing:"away"})),[s({lean:!0}),s({lean:!0,facing:"away"})],...["rise","descend"].flatMap(c=>["towards","away"].flatMap(l=>[0,1].map(h=>s({pose:c,frame:h,facing:l}))))),1024),this.stones=Is([0,1,2,3].map(c=>this.stone(c)));const a=df(e);this.props=Is([...a.campfire,a.stones.cyan,a.stones.violet,a.stones.green],1024);const o=[];for(let c=0;c<3;c++)for(let l=0;l<3;l++)o.push(gi(hM(e,{variant:c,frame:l,state:"playing"}),oM(c),e,e.cOutline));if(this.soundsystems=Is(o,2048),this.useWorkers=typeof Worker<"u"&&typeof OffscreenCanvas<"u",this.useWorkers){const c=Math.max(1,Math.min(3,(navigator.hardwareConcurrency||2)-1));try{for(let l=0;l<c;l++){const h=new Worker(new URL(""+new URL("artWorker-CmeBstVf.js",import.meta.url).href,import.meta.url),{type:"module"}),d={w:h,busy:!1};h.onmessage=u=>{d.busy=!1,d.job=void 0,this.receive(u.data),this.dispatch()},h.onerror=()=>{this.useWorkers=!1,d.job&&this.queue.unshift(d.job),d.busy=!1,d.job=void 0},this.workers.push(d)}}catch{this.useWorkers=!1}}}style;seed;types=new Map;creatures=new Map;queue=[];inFlight=new Set;workers=[];useWorkers;witch;stones;props;soundsystems;K;version=0;onFloor=()=>{};stone(e){const t=vi(this.seed*3+e),n=5+Math.floor(t()*3),r=7+Math.floor(t()*5),s=new cn(n+2,r+1);return s.ellipse((n+2)/2,r/2+1,n/2,r/2+.5,f.BODY,{round:this.style.round}),s.ellipse((n+2)/2-1,r/2,n/3,r/3,f.BODY2,{round:this.style.round,onlyOn:new Set([f.BODY]),density:.5,seed:e}),gi(s,{[f.BODY]:[178,174,162],[f.BODY2]:[140,138,130]},this.style,"dark")}key=e=>e.kind+":"+e.id;ask(e){const t=this.key(e);this.inFlight.has(t)||(this.inFlight.add(t),this.queue.push(e),this.dispatch())}dispatch(){if(this.useWorkers)for(const e of this.workers)e.busy||!this.queue.length||(e.busy=!0,e.job=this.queue.shift(),e.w.postMessage(e.job))}receive(e){if(!e.result){console.warn("art worker failed, drawing on the page:",e.error),this.useWorkers=!1,this.queue.unshift(e.job);return}const t=Eu(e.result.px);e.job.kind==="type"?(this.types.set(e.job.id,{atlas:t,layout:e.result.layout}),e.result.floor&&this.onFloor(e.job.id,e.result.floor)):this.creatures.set(e.job.id,{atlas:t,frame:gM}),this.inFlight.delete(this.key(e.job)),this.version++}typeArt(e){const t=this.types.get(e);return t||this.ask({kind:"type",id:e,style:this.style,seed:this.seed,K:this.K}),t}creatureArt(e){const t=this.creatures.get(e);return t||this.ask({kind:"creature",id:e,style:this.style}),t}partyArt(e,t,n){const r=`party-${t}`,s=this.creatures.get(r);return s||this.ask({kind:"party",id:r,species:e,seed:t,colour:n,style:this.style}),s}prefetchType(e){this.types.has(e)||this.typeArt(e)}get pending(){return this.inFlight.size}work(e){if(this.useWorkers)return;const t=performance.now();let n=0;for(;this.queue.length&&(n===0||performance.now()-t<e);){const r=this.queue.shift();this.receive({job:r,result:xM(r,(s,a)=>{const o=document.createElement("canvas");return o.width=s,o.height=a,o})}),n++}}whenIdle(){return new Promise(e=>{const t=()=>{this.work(50),this.pending?setTimeout(t,30):e()};t()})}}const vr=24,ot={uAmb:{value:new W},uMoon:{value:new W},uMoonDir:{value:new W(-.45,.75,.5).normalize()},uMoonBeam:{value:new W},uBands:{value:4},uDither:{value:.35},uShafts:{value:.3},uShaftScale:{value:1},uGlowPos:{value:new W},uGlowRgb:{value:new W},uGlowR:{value:8},uGlowPower:{value:1.4},uHazeCentre:{value:new He},uHazeRange:{value:new He(70,200)},uHazeColour:{value:new W},uTime:{value:0},uSmooth:{value:1},uLightPos:{value:Array.from({length:vr},()=>new rt)},uLightCol:{value:Array.from({length:vr},()=>new rt)},uLightCount:{value:0},uDisco:{value:new rt},uDiscoParams:{value:new rt},uDiscoColour:{value:new W(1,1,1)},uScenery:{value:new He(1e6,1)}};function _M(i,e,t,n=1){const r=(s,a)=>new W(s[0]/255*a,s[1]/255*a,s[2]/255*a);ot.uAmb.value.copy(r(ge(i.ambientHue,.55,1),i.ambient*n)),ot.uMoon.value.copy(r(ge(i.moonHue,.35,1),i.moon)),ot.uMoonBeam.value.copy(r(ge(i.moonHue,.35,1),i.shafts*.25)),ot.uBands.value=i.bands,ot.uDither.value=i.dither*.5,ot.uShafts.value=i.shafts,ot.uShaftScale.value=t*2,ot.uGlowRgb.value.copy(r(ge(i.glowHue,i.glowSat,1),1)),ot.uGlowR.value=e,ot.uGlowPower.value=i.glowPower,ot.uHazeColour.value.copy(r(ge(i.ambientHue-.08,.55,1),.16*Math.sqrt(n)))}const ri=`
uniform vec3 uAmb, uMoon, uMoonDir, uMoonBeam, uGlowPos, uGlowRgb;
uniform float uBands, uDither, uShafts, uShaftScale, uGlowR, uGlowPower, uTime, uSmooth;
uniform vec2 uHazeCentre, uHazeRange;
uniform vec3 uHazeColour;
uniform vec4 uLightPos[${vr}], uLightCol[${vr}];
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
  vec3 v = uGlowPos - P;
  float d = length(v);
  if (d < uGlowR) {
    float ndl = max(0.0, dot(N, v / max(d, 1e-4)));
    float fall = 1.0 - d / uGlowR;
    l += uGlowRgb * min(1.0, ndl * fall * fall * uGlowPower); // smooth to nothing at its reach: no ring
  }
  for (int i = 0; i < ${vr}; i++) {
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
`,fi=2,Zt=32,Li=8,MM=`
varying vec3 vWorld;
void main() {
  vec4 w = modelMatrix * vec4(position, 1.0);
  vWorld = w.xyz;
  gl_Position = projectionMatrix * viewMatrix * w;
}
`,SM=`
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
${ri}
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
    vec2 cell = vec2(mod(float(t), ${Li}.0), floor(float(t) / ${Li}.0));
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
`;class yM{constructor(e,t,n,r){this.map=e,this.forest=t;const s=e.extent,a=s.maxX-s.minX,o=s.maxZ-s.minZ,c=Math.ceil(a*fi/Zt)*Zt,l=Math.ceil(o*fi/Zt)*Zt;this.tilesX=c/Zt,this.tilesZ=l/Zt,this.filled=new Uint8Array(this.tilesX*this.tilesZ);const h=g=>(g.magFilter=g.minFilter=Ut,g.generateMipmaps=!1,g.colorSpace=Dn,g.needsUpdate=!0,g);this.texture=h(new hr(new Uint8Array(c*l*4),c,l)),h(this.tile),this.floors=h(new hr(new Uint8Array(64*Li*48*4*4),64*Li,192));const d=Array.from({length:32},(g,v)=>new W(...vn[v]?.floor??[.25,.45,.4])),u=new Mt({vertexShader:MM,fragmentShader:SM,uniforms:{...ot,uAreas:{value:this.texture},uExtent:{value:new rt(s.minX,s.minZ,c/fi,l/fi)},uPixel:{value:r},uTypeFloor:{value:d},uFloorReady:{value:this.floorReady},uFloors:{value:this.floors},uTile:{value:new He(64,48)},uFloorsSize:{value:new He(64*Li,192)},uSat:{value:n.sat},uFloor:{value:new W(e.dancefloor.x,e.dancefloor.z,e.dancefloor.radius)},uCanopy:{value:new rt},uCircle:{value:new rt},uSweeps:{value:Array.from({length:4},()=>new rt)},uSweepCount:{value:0},uClearing:{value:new He(e.tuning.clearingSize,e.tuning.clearingFalloff)}}}),p=new _n(a+400,o+400);p.rotateX(-Math.PI/2),this.mesh=new Gt(p,u),this.mesh.position.set((s.minX+s.maxX)/2,0,(s.minZ+s.maxZ)/2)}map;forest;mesh;texture;tile=new hr(new Uint8Array(Zt*Zt*4),Zt,Zt);filled;tilesX;tilesZ;initialised=!1;floorReady=new Array(32).fill(0);floors;pendingFloors=[];setSweeps(e){const t=this.mesh.material.uniforms,n=t.uSweeps.value;e.slice(0,4).forEach((r,s)=>n[s].set(r.x,r.z,r.radius,r.strength)),t.uSweepCount.value=Math.min(4,e.length)}setCircle(e,t,n,r){this.mesh.material.uniforms.uCircle.value.set(e,t,n,r)}setCanopyShadow(e,t,n,r){this.mesh.material.uniforms.uCanopy.value.set(e,t,n,r)}setFloor(e,t){this.pendingFloors.push([e,t])}placeFloors(e){for(const[t,n]of this.pendingFloors){const r=this.mesh.material,s=r.uniforms.uTile.value;if(n.w!==s.x||n.h!==s.y)continue;const a=new hr(n.albedo,n.w,n.h);a.needsUpdate=!0,e.copyTextureToTexture(a,this.floors,null,new He(t%Li*n.w,Math.floor(t/Li)*n.h)),a.dispose(),this.floorReady[t]=1}this.pendingFloors=[]}fill(e,t,n,r,s){this.initialised||(e.initTexture(this.texture),e.initTexture(this.floors),this.initialised=!0),this.pendingFloors.length&&this.placeFloors(e);const a=this.map.extent,o=Zt/fi,c=Math.max(0,Math.floor((t.minX-a.minX)/o)),l=Math.min(this.tilesX-1,Math.floor((t.maxX-a.minX)/o)),h=Math.max(0,Math.floor((t.minZ-a.minZ)/o)),d=Math.min(this.tilesZ-1,Math.floor((t.maxZ-a.minZ)/o)),u=(n-a.minX)/o,p=(r-a.minZ)/o,g=[];for(let m=h;m<=d;m++)for(let _=c;_<=l;_++)this.filled[m*this.tilesX+_]||g.push([_,m,(_+.5-u)**2+(m+.5-p)**2]);g.sort((m,_)=>m[2]-_[2]);const v=performance.now();let x=0;for(const[m,_]of g){if(x>0&&performance.now()-v>s)break;this.fillTile(e,m,_),x++}return g.length-x}fillTile(e,t,n){const r=this.map.extent,s=this.tile.image.data,a=Zt/fi,o=r.minX+t*a,c=r.minZ+n*a,l=this.forest.lightsNear(o+a/2,c+a/2,a/2+6).filter(h=>h.kind==="pond");for(let h=0;h<Zt;h++)for(let d=0;d<Zt;d++){const u=o+(d+.5)/fi,p=c+(h+.5)/fi,g=this.map.areaAt(u,p),v=(h*Zt+d)*4;let x=0;for(const m of l)Math.hypot(u-m.x,p-m.z)<3*m.size&&(x=255);s[v]=g.type,s[v+1]=Math.round(g.openness*255),s[v+2]=x,s[v+3]=255}this.tile.needsUpdate=!0,e.copyTextureToTexture(this.tile,this.texture,null,new He(t*Zt,n*Zt)),this.filled[n*this.tilesX+t]=1}dispose(){this.texture.dispose(),this.tile.dispose(),this.mesh.geometry.dispose(),this.mesh.material.dispose()}}const bM="varying vec2 vUv; void main() { vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }",wM=`
uniform sampler2D uScene; uniform float uThreshold; varying vec2 vUv;
void main() {
  vec3 c = texture2D(uScene, vUv).rgb;
  float l = max(c.r, max(c.g, c.b));
  gl_FragColor = vec4(c * smoothstep(uThreshold, uThreshold + 0.25, l), 1.0);
}`,EM=`
uniform sampler2D uSrc; uniform vec2 uStep; varying vec2 vUv;
void main() {
  vec4 c = texture2D(uSrc, vUv) * 0.227;
  c += (texture2D(uSrc, vUv + uStep * 1.38) + texture2D(uSrc, vUv - uStep * 1.38)) * 0.316;
  c += (texture2D(uSrc, vUv + uStep * 3.23) + texture2D(uSrc, vUv - uStep * 3.23)) * 0.070;
  gl_FragColor = c;
}`,AM=`
uniform sampler2D uScene, uBloom, uFx; uniform vec2 uLow; uniform float uBloomStrength, uBlack, uGamma, uFxOn; varying vec2 vUv;
void main() {
  vec2 p = (floor(vUv * uLow) + 0.5) / uLow;
  vec3 c = texture2D(uScene, p).rgb;
  if (uFxOn > 0.5) { vec4 f = texture2D(uFx, vUv); c = c * (1.0 - f.a) + f.rgb; }
  // Levels: a black point and a gamma, so the shade goes near-black and the lit stays bright.
  c = pow(clamp((c - uBlack) / (1.0 - uBlack), 0.0, 1.0), vec3(uGamma));
  c += texture2D(uBloom, vUv).rgb * uBloomStrength;
  gl_FragColor = vec4(min(c, vec3(1.0)), 1.0);
}`,TM=`
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
}`;function Ri(i,e,t,n=!1){const r=new En(Math.max(1,i),Math.max(1,e),{minFilter:t,magFilter:t,depthBuffer:n,generateMipmaps:!1});return r.texture.colorSpace=Dn,r}class RM{constructor(e,t){this.renderer=e,this.tuning=t,this.scene=Ri(1,1,Nt,!0),this.scene.depthTexture=new br(1,1),this.fx.texture.format=pn;const n=(r,s)=>new Mt({vertexShader:bM,fragmentShader:r,uniforms:s,depthTest:!1,depthWrite:!1});this.mats={bright:n(wM,{uScene:{value:null},uThreshold:{value:.6}}),blur:n(EM,{uSrc:{value:null},uStep:{value:new He}}),composite:n(AM,{uScene:{value:null},uBloom:{value:null},uLow:{value:new He},uBloomStrength:{value:0},uBlack:{value:0},uGamma:{value:1},uFx:{value:null},uFxOn:{value:0}}),tilt:n(TM,{uSrc:{value:null},uTexel:{value:new He},uDir:{value:new He},uStrength:{value:0},uBand:{value:.4},uCentre:{value:.5}})},this.quad=new Gt(new _n(2,2),this.mats.composite),this.quad.frustumCulled=!1}renderer;tuning;scene;bright=Ri(1,1,Nt);bloomB=Ri(1,1,Nt);a=Ri(1,1,Nt);b=Ri(1,1,Nt);fx=Ri(1,1,Nt);fxB=Ri(1,1,Nt);fxScene=null;quad;cam=new Ol(-1,1,1,-1,0,1);mats;low=new He(1,1);out=new He(1,1);get fullResolution(){return this.tuning.tiltShift.on&&this.tuning.tiltShift.where==="after"}get lowSize(){return this.low}resize(e,t,n,r){this.low.set(e,t),this.fx.setSize(e,t),this.fxB.setSize(e,t),this.out.set(n,r),this.scene.setSize(e,t);const s=Math.max(1,Math.round(e/2)),a=Math.max(1,Math.round(t/2));this.bright.setSize(s,a),this.bloomB.setSize(s,a);const o=this.fullResolution?n:e,c=this.fullResolution?r:t;this.a.setSize(o,c),this.b.setSize(o,c)}pass(e,t,n){const r=this.mats[e];n(r.uniforms),this.quad.material=r,this.renderer.setRenderTarget(t),this.renderer.render(this.quad,this.cam)}render(e,t){const n=this.renderer,r=this.tuning;n.setRenderTarget(this.scene),n.render(e,t);const s=r.bloom.on&&r.bloom.strength>0;if(s){const u=this.bright.width,p=this.bright.height;this.pass("bright",this.bright,g=>{g.uScene.value=this.scene.texture,g.uThreshold.value=r.bloom.threshold});for(let g=0;g<2;g++)this.pass("blur",this.bloomB,v=>{v.uSrc.value=this.bright.texture,v.uStep.value.set(1/u,0)}),this.pass("blur",this.bright,v=>{v.uSrc.value=this.bloomB.texture,v.uStep.value.set(0,1/p)})}const a=!!this.fxScene;if(this.fxScene){const u=n.getClearColor(new et),p=n.getClearAlpha();n.setRenderTarget(this.fx),n.setClearColor(0,0),n.clear(),n.render(this.fxScene,t),n.setClearColor(u,p);const g=this.fx.width,v=this.fx.height;this.pass("blur",this.fxB,x=>{x.uSrc.value=this.fx.texture,x.uStep.value.set(.6/g,0)}),this.pass("blur",this.fx,x=>{x.uSrc.value=this.fxB.texture,x.uStep.value.set(0,.6/v)})}const o=r.tiltShift.on&&r.tiltShift.strength>0;if(this.pass("composite",o?this.a:null,u=>{u.uScene.value=this.scene.texture,u.uBloom.value=this.bright.texture,u.uLow.value.copy(this.low),u.uBloomStrength.value=s?r.bloom.strength:0,u.uBlack.value=r.tone.black,u.uGamma.value=r.tone.gamma,u.uFx.value=this.fx.texture,u.uFxOn.value=a?1:0}),!o)return;const c=this.a.width,l=this.a.height,h=this.fullResolution?this.out.y/this.low.y:1,d=u=>{u.uTexel.value.set(1/c,1/l),u.uStrength.value=r.tiltShift.strength*h,u.uBand.value=r.tiltShift.band,u.uCentre.value=1-r.tiltShift.centre};this.pass("tilt",this.b,u=>{d(u),u.uSrc.value=this.a.texture,u.uDir.value.set(1,0)}),this.pass("tilt",null,u=>{d(u),u.uSrc.value=this.b.texture,u.uDir.value.set(0,1)})}}const CM=`
uniform vec3 uRight, uUp;
uniform float uSize;
varying vec2 vUv;
void main() {
  vUv = uv * 2.0 - 1.0;
  vec3 w = (modelMatrix * vec4(0.0, 0.0, 0.0, 1.0)).xyz + (uRight * position.x + uUp * position.y) * uSize;
  gl_Position = projectionMatrix * viewMatrix * vec4(w, 1.0);
}`,LM=`
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
}`,PM=`
uniform vec3 uTint;
void main() {
  if (mod(floor(gl_FragCoord.y), 3.0) > 0.5) discard; // faint: a dotted thread of light
  gl_FragColor = vec4(uTint, 1.0);
}`,DM=`
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
}`,IM=`
uniform vec3 uTint;
varying float vA;
void main() { if (vA < 0.15) discard; gl_FragColor = vec4(uTint * (0.5 + vA), 1.0); }`;class NM{constructor(e,t,n,r){this.tuning=t;const s=t.dancefloor,a=e.dancefloor;this.centre=new W(a.x,0,a.z);const o=new W(...ge(s.circleHue2,.4,1).map(x=>x/255));this.ballMat=new Mt({vertexShader:CM,fragmentShader:LM,uniforms:{...n,uSize:{value:s.discoSize/2},uTime:ot.uTime,uSpin:{value:s.spin/60*Math.PI*2},uPixels:{value:Math.max(6,Math.round(s.discoSize/r))},uTint:{value:o}}}),this.ball=new Gt(new _n(2,2),this.ballMat),this.ball.frustumCulled=!1;const c=60;this.beam=new Gt(new _n(r,c).translate(0,c/2,0),new Mt({fragmentShader:PM,uniforms:{uTint:{value:o.clone().multiplyScalar(.5)}}})),this.beam.frustumCulled=!1;const l=s.motes,h=[],d=[];for(let x=0;x<l.count;x++){const m=S=>{const w=Math.sin(x*12.9898+S*78.233)*43758.5453;return w-Math.floor(w)},_=m(1)*Math.PI*2,M=Math.sqrt(m(2))*a.radius*l.column;h.push(a.x+Math.cos(_)*M,.3,a.z+Math.sin(_)*M),d.push(m(3),l.speed*(.6+m(4)*.8),.4+m(5)*1.2,0)}const u=new Ht;u.setAttribute("position",new Lt(h,3)),u.setAttribute("aMote",new Lt(d,4));const p=ge(s.circleHue,.55,1);this.motes=new sa(u,new Mt({vertexShader:DM,fragmentShader:IM,uniforms:{uTime:ot.uTime,uRise:{value:l.rise},uTint:{value:new W(p[0]/255,p[1]/255,p[2]/255)}},transparent:!0,depthWrite:!1,blending:Sr})),this.motes.frustumCulled=!1;const g=ge(s.circleHue,.7,1);this.lightRgb=new W(g[0]/255,g[1]/255,g[2]/255);const v=ot;v.uDiscoParams.value.set(s.spin/60*Math.PI*2,s.specks,s.speckBrightness,s.speckReach),v.uDiscoColour.value.copy(o)}tuning;ball;beam;motes;ballMat;lightRgb;centre;update(e,t){const n=this.tuning.dancefloor,r=.75+.25*Math.sin(e*n.pulse*Math.PI*2);t.setCircle(n.circleHue,n.circleHue2,.7+.3*r,e*n.runeSpeed/60*Math.PI*2);const s=n.discoHeight+Math.sin(e*.8)*.3;return this.ball.position.set(this.centre.x,s,this.centre.z),this.beam.position.set(this.centre.x,s+n.discoSize/2,this.centre.z),ot.uDisco.value.set(this.centre.x,s,this.centre.z,1),{x:this.centre.x,y:2.5,z:this.centre.z,reach:n.lightReach,rgb:this.lightRgb,strength:n.lightStrength*r}}}const UM=[new W(.25,.85,1),new W(.7,.4,1),new W(1,.65,.2)];class FM{constructor(e,t){this.atlas=e,this.metresPerPixel=t}atlas;metresPerPixel;homeSoundsystem(e){const t=e.map.dancefloor;return{x:t.x+t.radius+5,z:t.z+3,variant:0,at:-1/0,from:null}}update(e,t,n,r){const s=e.tuning.party,a=[],o=[],c=[],l=[],h=[this.homeSoundsystem(e)];for(const[,d]of e.party.areas){if(!d.soundsystem)continue;const u=d.from?e.map.siteOf(d.from[0],d.from[1]):null;h.push({...d.soundsystem,at:d.at,from:u})}for(const d of h){const u=s.transition>0?Math.min(1,(t-d.at)/s.transition):1,p=this.atlas.frames[d.variant*3+Math.floor(t*6)%3],g=p.h*this.metresPerPixel,v=ln((u-.55)/.45);if(u<1&&d.from){const m=(d.from.x+d.x)/2,_=(d.from.z+d.z)/2,M=Math.hypot(d.x-m,d.z-_)*1.6;c.push({x:m,z:_,radius:u*M,strength:1-ln((u-.8)/.2)})}if(v>0&&n(d.x,d.z,p.w*this.metresPerPixel,g)){const m=We(Math.round(d.x*10),Math.round(d.z*10),911)<.5;a.push({x:d.x,y:-(1-v)*g,z:d.z,frame:p,flip:m,fresh:r(d.x,d.z,g)})}u>=1&&l.push({x:d.x,y:g*.85,z:d.z,seed:Math.floor(Math.abs(d.x*7.3+d.z*13.1))%1e5,ready:d.at+s.transition});const x=.85+.15*Math.sin(t*8);v>0&&o.push({x:d.x,y:3,z:d.z,reach:s.lightReach,rgb:UM[d.variant%3],strength:s.lightStrength*x*v*(1+(1-u)*2)})}return{items:a,lights:o,sweeps:c,playing:l}}}function OM(i,e,t,n){const r=(a,o)=>Math.abs(a[0]-o[0])<1e-6&&Math.abs(a[1]-o[1])<1e-6;if(r(i,t)||r(i,n)||r(e,t)||r(e,n))return!1;const s=(a,o,c)=>Math.sign((o[0]-a[0])*(c[1]-a[1])-(o[1]-a[1])*(c[0]-a[0]));return s(i,e,t)*s(i,e,n)<0&&s(t,n,i)*s(t,n,e)<0}function BM(i,e,t){const n=i.tuning.stringLights,r=i.siteOf(t[0],t[1]),s=vi(i.seed*53+t[0]*1031+t[1]*7+509),a=S=>{const w=i.areaAt(S.x,S.z).cell;return w[0]===t[0]&&w[1]===t[1]},o=S=>We(Math.round(S.x*10),Math.round(S.z*10),i.seed+501),c=e.treesNear(r.x,r.z,i.areaSize*1.3).filter(a).sort((S,w)=>o(S)-o(w)),l=new Map,h=new Set,d=[],u=[],p=Math.cos(n.coneAngle*Math.PI/180),g=(S,w=0)=>(l.get(S)??0)+1<=(h.has(S)?3:2)-w,v=(S,w)=>d.some(E=>OM([S.x,S.z],[w.x,w.z],[E.ax,E.az],[E.bx,E.bz])),x=(S,w)=>{d.push({ax:S.x,az:S.z,bx:w.x,bz:w.z,seed:Math.floor(We(Math.round(S.x*10),Math.round(w.z*10),i.seed+503)*1e6)}),l.set(S,(l.get(S)??0)+1),l.set(w,(l.get(w)??0)+1)},m=(S,w,E)=>{let L=S,y=w;const A=[S];for(let D=0;D<E;D++){const R=[];for(const P of c){if(P===L||!g(P))continue;const F=P.x-L.x,O=P.z-L.z,V=Math.hypot(F,O);if(!(V<n.spanMin||V>n.spanMax)&&!(y&&(F*y[0]+O*y[1])/V<p)&&!v(L,P)&&(R.push({b:P,d:V}),R.length>=16))break}if(!R.length)break;R.sort((P,F)=>F.d-P.d);const{b:U,d:N}=R[Math.floor(s()*Math.min(4,R.length))];x(L,U),y=[(U.x-L.x)/N,(U.z-L.z)/N],A.push(U),L=U}return A},_=n.runsPerArea[0]+Math.floor(s()*(n.runsPerArea[1]-n.runsPerArea[0]+1)),M=[];for(const S of c){if(u.length>=_)break;if(l.has(S)||u.some(L=>Math.hypot(L.x-S.x,L.z-S.z)<n.spread))continue;u.push(S);const w=n.spansPerRun[0]+Math.floor(s()*(n.spansPerRun[1]-n.spansPerRun[0]+1)),E=m(S,null,w);for(let L=1;L<E.length-1;L++){if(s()>=n.junctionChance)continue;const y=E[L],A=E[L+1],D=A.x-y.x,R=A.z-y.z,U=Math.hypot(D,R),N=s()<.5?1:-1;h.add(y),M.push({from:y,heading:[-R/U*N,D/U*N]})}}for(const S of M)m(S.from,S.heading,n.spansPerRun[0]+Math.floor(s()*3));return d}const qt={uRight:{value:new W(1,0,0)},uUp:{value:new W(0,1,0)},uFacing:{value:new W(0,0,1)},uTopFade:{value:0},uCutout:{value:new rt(0,0,0,1)},uDebugCull:{value:0},uRes:{value:new He(1,1)},uWitch:{value:new rt(0,0,0,0)},uWitchDepth:{value:0},uOcc:{value:new rt(.38,6,2.5,1)}},co=`
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
`,ho=`
uniform sampler2D uAlbedo, uNormal;
uniform vec3 uRight, uUp, uFacing;
uniform float uTopFade, uUnlit;
uniform vec4 uCutout;
uniform float uDebugCull, uIsScenery;
uniform vec4 uWitch, uOcc, uSilhouette;
uniform float uFadePass;
varying vec2 vUv;
varying vec3 vWorld;
varying vec3 vFlags;
varying float vFront;
${ri}
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
void main() {
  shade();
  // Scenery past the budget's radius fades out smoothly (alpha), from the far edge inward.
  if (uIsScenery > 0.5) {
    float k = sceneryFade(vWorld);
    if (k < 0.004) discard;
    gl_FragColor.a *= k;
  }
}
`;class sr{constructor(e,t,n={}){this.atlas=e,this.metresPerPixel=t;const r=new _n(1,1);r.translate(0,.5,0),this.geo=new Bl,this.geo.index=r.index,this.geo.setAttribute("position",r.getAttribute("position")),this.geo.setAttribute("uv",r.getAttribute("uv")),this.pos=this.size=this.uvs=this.flags=void 0,this.grow(64);const s=c=>({...ot,...qt,uAlbedo:{value:e.albedo},uNormal:{value:e.normal},uUnlit:{value:n.unlit?1:0},uIsScenery:{value:n.scenery?1:0},uFadePass:{value:0},uSilhouette:{value:new rt(0,0,0,0)},...c}),a=n.scenery?{blending:ga,blendSrc:bl,blendDst:wl}:{},o=new Mt({vertexShader:co,fragmentShader:ho,uniforms:s({}),depthTest:!n.onTop,depthWrite:!n.onTop,...a});if(this.mesh=new Gt(this.geo,o),this.mesh.frustumCulled=!1,n.onTop&&(this.mesh.renderOrder=10),n.scenery&&(this.mesh.renderOrder=.5),this.meshes=[this.mesh],n.fade){const c=new Gt(this.geo,new Mt({vertexShader:co,fragmentShader:ho,uniforms:s({uFadePass:{value:1}}),transparent:!0,depthWrite:!1}));c.frustumCulled=!1,c.renderOrder=11,this.meshes.push(c)}if(n.silhouette){const c=n.silhouette.colour,l=new Gt(this.geo,new Mt({vertexShader:co,fragmentShader:ho,uniforms:s({uSilhouette:{value:new rt(c.x,c.y,c.z,n.silhouette.opacity)}}),transparent:!0,depthWrite:!1,depthFunc:Zs}));l.frustumCulled=!1,l.renderOrder=12,this.meshes.push(l)}}atlas;metresPerPixel;mesh;meshes;geo;pos;size;uvs;flags;capacity=0;count=0;grow(e){const t=Math.max(e,this.capacity*2);this.geo.dispose();const n=(r,s)=>{const a=new Ul(new Float32Array(t*r),r);return a.setUsage(mr),s&&a.array.set(s.array),a};this.pos=n(3,this.pos),this.size=n(2,this.size),this.uvs=n(4,this.uvs),this.flags=n(3,this.flags),this.geo.setAttribute("iPos",this.pos),this.geo.setAttribute("iSize",this.size),this.geo.setAttribute("iUv",this.uvs),this.geo.setAttribute("iFlags",this.flags),this.capacity=t}set(e){e.length>this.capacity&&this.grow(e.length);const t=this.pos.array,n=this.size.array,r=this.uvs.array,s=this.flags.array;e.forEach((a,o)=>{t[o*3]=a.x,t[o*3+1]=a.y,t[o*3+2]=a.z;const c=a.scale??1;n[o*2]=a.frame.w*this.metresPerPixel*c,n[o*2+1]=a.frame.h*this.metresPerPixel*c,r.set(a.frame.uv,o*4),s[o*3]=a.flip?1:0,s[o*3+1]=a.top?1:0,s[o*3+2]=a.fresh?1:0});for(const a of[this.pos,this.size,this.uvs,this.flags])a.needsUpdate=!0;this.count=e.length,this.geo.instanceCount=e.length;for(const a of this.meshes)a.visible=e.length>0}get dropped(){const e=this.geo._maxInstanceCount;return e===void 0||!this.mesh.visible?0:Math.max(0,this.count-e)}dispose(){this.geo.dispose(),this.mesh.material.dispose(),this.atlas.albedo.dispose(),this.atlas.normal.dispose()}}const zM=`
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
}`,kM=`
uniform float uTwinkle, uChase;
varying vec3 vColour;
varying vec3 vWorld;
varying float vOn;
varying vec2 vB;
${ri}
void main() {
  if (vOn < 0.5 || sceneryFade(vWorld) < 0.5) discard; // scenery: gone past the scenery budget's edge
  float b = 1.0 - uTwinkle * 0.5 * (1.0 + sin(uTime * (1.3 + vB.x) + vB.x * 40.0));
  if (fract((vB.y - uTime * uChase) / 60.0) < 0.06) b = 1.4;  // a chase running along now and then
  gl_FragColor = vec4(haze(vColour * b * 1.6, vWorld), 1.0); // bright enough to bloom
}`,GM=`
attribute float aSway;
uniform float uWind, uTime;
varying vec3 vWorld;
void main() {
  vec3 p = position;
  p.x += sin(uTime * uWind + aSway * 6.0) * 0.18 * fract(aSway * 7.0);
  vWorld = p;
  gl_Position = projectionMatrix * viewMatrix * vec4(p, 1.0);
}`,HM=`
varying vec3 vWorld;
${ri}
void main() {
  if (sceneryFade(vWorld) < 0.5) discard;
  gl_FragColor = vec4(haze(vec3(0.03, 0.025, 0.04), vWorld), 1.0);
}`,WM=`
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
}`,VM=`
uniform vec3 uMoteColour;
varying float vA;
varying vec3 vWorld;
${ri}
void main() {
  if (vA < 0.3) discard;
  gl_FragColor = vec4(haze(uMoteColour * (0.6 + 0.6 * vA), vWorld), 1.0);
}`;class XM{constructor(e,t){this.scene=e,this.game=t;const n=t.tuning.stringLights;this.palette=n.palette.map(s=>new et(s));const r={...ot,uWind:{value:t.tuning.canopyShadow.wind*1.5}};this.bulbMat=new Mt({vertexShader:zM,fragmentShader:kM,uniforms:{...r,uRes:qt.uRes,uNear:{value:240},uTwinkle:{value:n.twinkle},uChase:{value:n.chaseSpeed}}}),this.wireMat=new Mt({vertexShader:GM,fragmentShader:HM,uniforms:r}),this.moteMat=new Mt({vertexShader:WM,fragmentShader:VM,uniforms:{...ot,uMoteColour:{value:new et(1,.85,1)}}})}scene;game;built=new Map;palette;bulbMat;wireMat;moteMat;build(e,t,n,r){const s=this.game.tuning.stringLights,a=s.height,o=[],c=[],l=[],h=[],d=[];e.forEach((M,S)=>{const w=Math.hypot(M.bx-M.ax,M.bz-M.az),E=Math.max(2,Math.round(w/s.bulbSpacing)),L=y=>[M.ax+(M.bx-M.ax)*y,a-s.sag*4*y*(1-y)*(w/8),M.az+(M.bz-M.az)*y];for(let y=0;y<=16;y++){const A=L(y/16),D=L((y+1)/16);y<16&&(h.push(...A,...D),d.push(S+y/16,S+(y+1)/16))}for(let y=1;y<E;y++){const A=y/E,D=L(A),R=this.palette[(M.seed+y)%this.palette.length];o.push(...D),c.push(R.r,R.g,R.b),l.push((M.seed*13+y*7)%100/100,S*40+y,t(D[0],D[2])+y*.03,4*A*(1-A))}});const u=new Wr,p=new Ht;p.setAttribute("position",new Lt(o,3)),p.setAttribute("aColour",new Lt(c,3)),p.setAttribute("aBulb",new Lt(l,4));const g=new Ht;g.setAttribute("position",new Lt(h,3)),g.setAttribute("aSway",new Lt(d,1)),u.add(new Fl(g,this.wireMat),new sa(p,this.bulbMat));const v=[],x=[];for(let M=0;M<48;M++){const S=A=>{const D=Math.sin(r*12.9898+M*78.233+A*37.719)*43758.5453;return D-Math.floor(D)},w=S(1)*Math.PI*2,E=2+S(2)*14,L=n.x+Math.cos(w)*E,y=n.z+Math.sin(w)*E;v.push(L,.3,y),x.push(S(3),.4+S(4)*.6,.3+S(5)*.8,t(L,y))}const m=new Ht;m.setAttribute("position",new Lt(v,3)),m.setAttribute("aMote",new Lt(x,4));const _=new sa(m,this.moteMat);return _.frustumCulled=!1,u.add(_),u.traverse(M=>{M.frustumCulled=!1}),u}update(){const e=this.game;if(!e.tuning.stringLights.on)return;this.bulbMat.depthTest=e.witch.lift<.5;let n=0;for(const[r,s]of e.party.areas){let a=this.built.get(r);if(!a){if(n++>=2)break;const o=BM(e.map,e.forest,s.cell),c=e.map.siteOf(s.cell[0],s.cell[1]),l=s.from?e.map.siteOf(s.from[0],s.from[1]):null,h=l?(l.x+c.x)/2:c.x,d=l?(l.z+c.z)/2:c.z,u=l?Math.hypot(c.x-h,c.z-d)*1.6:1,p=e.tuning.party.transition,g=(x,m)=>s.wave===0?-1:s.at+Math.min(1,Math.hypot(x-h,m-d)/u)*p,v=s.soundsystem??(s.wave===0?e.map.dancefloor:c);a={lines:o,group:this.build(o,g,v,s.cell[0]*131+s.cell[1]*17+e.seed),on:s.wave===0?-1:s.at},this.scene.add(a.group),this.built.set(r,a)}}}clear(){for(const[,e]of this.built)this.scene.remove(e.group);this.built.clear()}}const zt=32,ar=16,YM=`
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
}`,qM=`
uniform sampler2D uGlyphs;
varying vec2 vUv, vP;
varying vec4 vCol;
varying float vDraw;
varying vec3 vWorld;
${ri}
void main() {
  float a = texture2D(uGlyphs, vUv).a * vCol.a;
  // Written on: revealed clockwise from the top as vDraw goes 0 to 1.
  float ang = fract(atan(vP.x, vP.y) / 6.2831853 + 1.0);
  if (ang > vDraw || a < 0.02) discard;
  gl_FragColor = vec4(haze(vCol.rgb * a, vWorld), 1.0);
}`;class fh{mesh;geo=new Bl;cap=0;n=0;pos;size;uv;col;draw;constructor(e){const t=new _n(1,1);this.geo.index=t.index,this.geo.setAttribute("position",t.getAttribute("position")),this.geo.setAttribute("uv",t.getAttribute("uv")),this.grow(256),this.mesh=new Gt(this.geo,e),this.mesh.frustumCulled=!1,this.mesh.renderOrder=3}grow(e){const t=(r,s)=>{const a=new Float32Array(e*s);return r&&a.set(r),a};this.pos=t(this.pos,3),this.size=t(this.size,1),this.uv=t(this.uv,4),this.col=t(this.col,4),this.draw=t(this.draw,1),this.cap=e,this.geo.dispose();const n=(r,s,a)=>this.geo.setAttribute(r,new Ul(s,a).setUsage(mr));n("iPos",this.pos,3),n("iSize",this.size,1),n("iUv",this.uv,4),n("iCol",this.col,4),n("iDraw",this.draw,1)}begin(){this.n=0}add(e,t,n,r,s,a,o,c,l,h=1){this.n>=this.cap&&this.grow(this.cap*2);const d=this.n++;this.pos.set([e,t,n],d*3),this.size[d]=r,this.uv.set(s,d*4),this.col.set([a,o,c,l],d*4),this.draw[d]=h}end(){this.geo.instanceCount=this.n;for(const e of["iPos","iSize","iUv","iCol","iDraw"])this.geo.getAttribute(e).needsUpdate=!0}}const KM=["🎉","🎈","💃","🎊","🥳","😛","🍉","🍒","🍷","🍸","🍹","🥂","🍺","😁","😆"],$M=[["😴","🫩","🥱","💼"],["😐","😐","🥱"],["😮","🤭","🫢","😛"],["🙂","🍷","🍺","😁"],["🥳","🎉","🎈","😆","🥂","💃"]];class ZM{constructor(e,t){this.game=t,this.canvas.width=this.canvas.height=zt*ar;const n=this.canvas.getContext("2d"),r=n.createRadialGradient(zt/2,zt/2,0,zt/2,zt/2,zt/2);r.addColorStop(0,"rgba(255,255,255,1)"),r.addColorStop(.35,"rgba(255,255,255,.55)"),r.addColorStop(1,"rgba(255,255,255,0)"),n.fillStyle=r,n.fillRect(0,0,zt,zt),this.tex=new Jm(this.canvas),this.tex.magFilter=Ut,this.tex.minFilter=Ut,this.tex.generateMipmaps=!1;const s=a=>new Mt({vertexShader:YM,fragmentShader:qM,uniforms:{...ot,uRight:qt.uRight,uUp:qt.uUp,uFlat:{value:a},uGlyphs:{value:this.tex}},transparent:!0,depthWrite:!1,blending:Sr});this.standing=new fh(s(0)),this.flat=new fh(s(1)),e.add(this.standing.mesh,this.flat.mesh)}game;canvas=document.createElement("canvas");tex;slots=new Map;colours=new Map;standing;flat;fizzles=[];bursts=[];chain=[];lastTime=0;bubbleWitch=document.getElementById("bubble-witch");bubbleCreature=document.getElementById("bubble-creature");v=new W;slotOf(e,t=0){const n=`${e}:${t}`;let r=this.slots.get(n);if(r!==void 0)return r;r=this.slots.size+1,this.slots.set(n,r);const s=this.canvas.getContext("2d"),a=r%ar*zt,o=Math.floor(r/ar)*zt;s.clearRect(a,o,zt,zt),$d(s,e,{x:a+1,y:o+1,size:zt-2,level:t,colour:[255,255,255],glow:!1});const c=s.getImageData(a,o,zt,zt);for(let h=3;h<c.data.length;h+=4)c.data[h]=c.data[h]>90?255:0;s.putImageData(c,a,o);const l=da(e);return this.colours.set(e,new et(l[0]/255,l[1]/255,l[2]/255)),this.tex.needsUpdate=!0,r}uv(e){const t=zt*ar,n=e%ar*zt,r=Math.floor(e/ar)*zt;return[n/t,1-r/t,(n+zt)/t,1-(r+zt)/t]}update(e,t,n,r,s){const a=this.game,o=a.leash,c=a.tuning,l=a.witch,h=c.bond,d=c.leash,u=this.uv(0);this.standing.begin(),this.flat.begin();for(const M of o.events)M.kind==="fizzled"&&this.fizzles.push({x:M.x,z:M.z,at:e}),M.kind==="invited"&&this.bursts.push({x:M.x,z:M.z,at:e,seed:M.id});this.fizzles=this.fizzles.filter(M=>e-M.at<.7),this.bursts=this.bursts.filter(M=>e-M.at<.9);for(const M of this.bursts){const S=(e-M.at)/.9;for(let w=0;w<28;w++){const E=We(M.seed,w,3)*Math.PI*2,L=2+We(M.seed,w,5)*3,y=2+We(M.seed,w,7)*3,A=[[1,.4,.8],[.3,.95,1],[1,.9,.3],[.6,1,.4],[1,1,1]][w%5];this.standing.add(M.x+Math.cos(E)*L*S,.6+y*S-4*S*S,M.z+Math.sin(E)*L*S,.3,u,A[0],A[1],A[2],1-S)}}if(o.talk){const M=a.creatures[o.talk.id],S=o.talk.refused?0:Math.min(1,o.talk.t/o.talk.total),w=28;for(let E=0;E<w;E++){const L=Math.PI/2-E/w*Math.PI*2,y=E/w<S;this.flat.add(M.x+Math.cos(L)*1.5,0,M.z+Math.sin(L)*1.1,.35,u,1,y?.6:.9,y?.9:1,y?.9:.18)}}const p=c.stack,g=Math.min(.1,Math.max(0,e-this.lastTime)),v=new Map;for(this.lastTime=e;this.chain.length<o.stack.length;)this.chain.push({x:0,z:0,vx:0,vz:0});let x={x:0,z:0},m=s;for(let M=o.stack.length-1;M>=0;M--){const S=o.stack[M],w=a.creatures[S],E=o.stack.length-1-M,L=this.chain[E],y=(2+w.level*.4)*p.scale,A=Math.sin(e*1.7+E*.9)*p.idleSway*(1+E*.5),D=x.x-l.vx*p.trail+A,R=x.z-l.vz*p.trail;L.vx+=((D-L.x)*p.stiffness-L.vx*p.damping)*g,L.vz+=((R-L.z)*p.stiffness-L.vz*p.damping)*g,L.x+=L.vx*g,L.z+=L.vz*g,x=L,m+=(E===0?p.offset*y:p.gap*y)+y/2;const U=new W(l.x+L.x,m,l.z+L.z);m+=y/2,v.set(S,U);const N=(this.slotOf(w.species,w.level),this.colours.get(w.species));this.standing.add(U.x,U.y,U.z,y,this.uv(this.slotOf(w.species,w.level)),N.r,N.g,N.b,1)}for(const M of o.placed){const S=a.creatures[M.id],w=this.slotOf(S.species,S.level),E=this.colours.get(S.species),L=.8+.2*Math.sin(e*2+M.id);this.flat.add(M.x,0,M.z,3+S.level*.8,this.uv(w),E.r*L,E.g*L,E.b*L,1,Math.min(1,(e-M.at)/.8)),this.flat.add(M.x,0,M.z,5,u,E.r,E.g,E.b,.25)}if(l.mode==="ground"&&o.stack.length&&!o.placed.some(M=>Math.hypot(M.x-l.x,M.z-l.z)<=d.pickRadius)){const M=a.creatures[o.stack[o.stack.length-1]],S=this.colours.get(M.species),w=zh(o,l.x,l.z,c);this.flat.add(l.x,0,l.z,3+M.level*.8,this.uv(this.slotOf(M.species,M.level)),w?1:S.r,w?.1:S.g,w?.1:S.b,.22)}for(const M of this.fizzles){const S=1-(e-M.at)/.7;this.flat.add(M.x,0,M.z,3*(1+(1-S)*.6),u,1,.15,.1,S)}const _=[...o.stack,...o.placed.map(M=>M.id)];for(const M of _){const S=a.creatures[M],w=this.colours.get(S.species);if(!w)continue;const E=Ff(o,M,l.x,l.z);h.rim&&this.flat.add(S.x,0,S.z,1.8,u,w.r,w.g,w.b,.35);const L=v.get(M)??new W(E.x,.2,E.z);if(h.sparks){const A=Math.max(.5,h.sparkEvery),D=(e+M*.618%1*A)%A;if(D<.7){const R=D/.7;this.standing.add(L.x+(S.x-L.x)*R,L.y+(.6-L.y)*R+Math.sin(R*Math.PI)*1.2,L.z+(S.z-L.z)*R,.35,u,w.r,w.g,w.b,1)}}const y=Math.hypot(S.x-E.x,S.z-E.z);if(h.thread&&y>d.length*.85){const A=Math.min(1,(y-d.length*.85)/d.length),D=Math.min(60,Math.floor(y/1.2));for(let R=1;R<D;R++){const U=(R+e*2%1)/D;this.standing.add(L.x+(S.x-L.x)*U,L.y+(.5-L.y)*U,L.z+(S.z-L.z)*U,.22,u,w.r,w.g,w.b,.25+.75*A)}}}this.standing.end(),this.flat.end(),this.bubbles(e,t,n,r)}bubbles(e,t,n,r){const s=this.game,a=s.leash.talk,o=this.bubbleWitch,c=this.bubbleCreature;if(!o||!c)return;const l=s.witch,h=(M,S,w,E)=>{this.v.set(S,w,E).project(t),M.style.left=`${(this.v.x+1)/2*n}px`,M.style.top=`${(1-this.v.y)/2*r}px`},d=c.querySelector("span"),u=c.querySelector(".bar");if(!a){u.style.display="none",c.classList.remove("on"),o.classList.toggle("on",s.leash.held),s.leash.held&&(o.textContent=s.leash.heldInAir?"land to talk":"…",h(o,l.x-1.2,Mr(l,s.tuning)+2.2,l.z));return}const p=s.creatures[a.id];if(h(o,l.x-1.2,Mr(l,s.tuning)+2.2,l.z),h(c,p.x,1.2+p.level*.8,p.z),a.refused){o.classList.remove("on"),d.textContent=We(a.id,1,9)<.5?"😒":"🙄",u.style.display="none",c.classList.toggle("on",a.t<1.6),c.style.opacity="1";return}u.style.display="";const g=Math.floor(a.t/Uf(p,s.tuning)),v=Math.min(1,a.t/a.total),x=(M,S)=>M[Math.floor(We(a.id,S,5)*M.length)%M.length],m=[4,2,0][Math.min(2,p.level)],_=Math.round(m+(4-m)*v);o.textContent=x(KM,g-g%2),o.classList.toggle("on",g%2===0),d.textContent=g>=1?x($M[_],g-(g+1)%2):"…",u.querySelector("i").style.width=`${v*100}%`,c.classList.add("on"),c.style.opacity=g%2===1?"1":"0.6"}}const JM=[1,3,5,7,9],Au=i=>{const e=60/Math.max(1,i.beat.bpm);return{beat:e,bar:e*4}};function QM(i,e,t,n){const r=n.lasers,{beat:s,bar:a}=Au(n),o=a*Math.max(1,r.blockBars),c=Math.floor(i/o),l=i-c*o,h=_i(r.duty*t,0,1),u=We(e,c,311)<h?ln(l/Math.max(.001,r.fadeIn))*ln((o-l)/Math.max(.001,r.fadeOut)):0,p=Math.floor(l/a),g=JM.filter(S=>S<=r.maxCount),v=g[Math.floor(We(e,c*64+p,313)*g.length)%g.length]??1,x=e%97*.37,m=Math.sin(2*Math.PI*i/(s*r.sweepBeats)+x)*(r.sweep*Math.PI)/180,_=.55+.45*Math.sin(2*Math.PI*i/(a*r.openBars)+x*2),M=((e%1e3*.0137+i/(a*8))%1+1)%1;return{on:u,count:v,sweep:m,open:_,hue:M}}const jM=`
attribute vec4 aCol; // rgb, alpha
attribute float aU;  // 0 at the source, 1 at the far end
varying vec4 vCol;
varying float vU;
void main() { vCol = aCol; vU = aU; gl_Position = projectionMatrix * viewMatrix * vec4(position, 1.0); }`,e2=`
varying vec4 vCol;
varying float vU;
void main() { float a = vCol.a * pow(1.0 - vU, 0.6); gl_FragColor = vec4(vCol.rgb * a, 1.0); }`,Gr=[[.3,.95,1],[.35,.55,1],[.7,.4,1],[1,.3,.85],[.45,1,.55]],t2=i=>{const e=(i%1+1)%1*Gr.length,t=Math.floor(e),n=e-t,r=Gr[t%Gr.length],s=Gr[(t+1)%Gr.length];return[r[0]+(s[0]-r[0])*n,r[1]+(s[1]-r[1])*n,r[2]+(s[2]-r[2])*n]};class n2{constructor(e,t){this.game=t,this.mesh=new Fl(this.geo,new Mt({vertexShader:jM,fragmentShader:e2,transparent:!0,depthWrite:!1,blending:Sr})),this.mesh.frustumCulled=!1,e.add(this.mesh)}game;geo=new Ht;pos=new Float32Array(0);col=new Float32Array(0);u=new Float32Array(0);mesh;update(e,t,n,r){const s=this.game.tuning,a=s.lasers,{bar:o}=Au(s),c=o*a.blockBars,l=[],h=[],d=[];if(a.on)for(const u of t){const p=1-Math.min(1,Math.max(0,(Math.hypot(u.x-n,u.z-r)-a.fadeNear)/Math.max(1,a.fadeFar-a.fadeNear)));if(p<=0)continue;const g=QM(e,u.seed,1,s),v=e-u.ready,x=v>=0&&v<c?Math.min(1,v/a.fadeIn)*Math.min(1,(c-v)/a.fadeOut):0,m=Math.max(g.on,x),_=x>g.on?a.maxCount:g.count;if(m<=.01)continue;const M=a.spread*Math.PI/180*g.open;for(let S=0;S<_;S++){const w=_===1?0:S/(_-1)-.5,E=a.maxTilt*Math.PI/180,L=Math.max(-E,Math.min(E,w*M+g.sweep)),y=Math.sin(L),A=Math.cos(L),D=-.15*Math.cos(L*3+u.seed),R=t2(g.hue+S*.07),U=a.opacity*m*p;l.push(u.x,u.y,u.z,u.x+y*a.length,u.y+A*a.length,u.z+D*a.length),h.push(...R,U,...R,U),d.push(0,1)}}if(l.length>this.pos.length&&(this.pos=new Float32Array(l.length*2),this.col=new Float32Array(h.length*2),this.u=new Float32Array(d.length*2),this.geo.setAttribute("position",new xn(this.pos,3).setUsage(mr)),this.geo.setAttribute("aCol",new xn(this.col,4).setUsage(mr)),this.geo.setAttribute("aU",new xn(this.u,1).setUsage(mr))),!!this.geo.getAttribute("position")){this.pos.set(l),this.col.set(h),this.u.set(d);for(const u of["position","aCol","aU"])this.geo.getAttribute(u).needsUpdate=!0;this.geo.setDrawRange(0,l.length/3)}}}function*i2(i,e,t,n){const r=i.siteOf(e[0],e[1]),s=i.areaSize*1.5,a=Math.max(t*2,8),o=i.bounds,c=(m,_)=>{if(m<o.minX||m>o.maxX||_<o.minZ||_>o.maxZ)return"edge";const M=i.areaAt(m,_).cell;return`${M[0]},${M[1]}`},l=`${e[0]},${e[1]}`,h=Math.ceil(2*s/a),d=r.x-s,u=r.z-s,p=[];for(let m=0;m<=h;m++){for(let _=0;_<=h;_++)p.push(c(d+_*a,u+m*a));yield}const g=new Set,v=Math.max(1,Math.round(a/t)),x=a/v;for(let m=0;m<h;m++,yield)for(let _=0;_<h;_++){const M=[p[m*(h+1)+_],p[m*(h+1)+_+1],p[(m+1)*(h+1)+_],p[(m+1)*(h+1)+_+1]];if(!M.includes(l)||M.every(w=>w===l))continue;const S=[];for(let w=0;w<=v;w++)for(let E=0;E<=v;E++)S.push(c(d+_*a+E*x,u+m*a+w*x));for(let w=0;w<=v;w++)for(let E=0;E<=v;E++){const L=S[w*(v+1)+E],y=d+_*a+E*x,A=u+m*a+w*x;for(const[D,R]of[[1,0],[0,1]]){if(E+D>v||w+R>v)continue;const U=S[(w+R)*(v+1)+E+D];if(L===U||L!==l&&U!==l)continue;const N=y+D*x*.5,P=A+R*x*.5,F=`${Math.round(N*4)},${Math.round(P*4)}`;g.has(F)||(g.add(F),n.push({x:N,z:P,other:L===l?U:L}))}}}}const r2=`
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
}`,s2=`
uniform float uBright;
varying vec3 vColour;
varying vec3 vWorld;
varying float vB;
${ri}
void main() { gl_FragColor = vec4(haze(vColour * vB * uBright, vWorld), 1.0); }`;class a2{constructor(e,t){this.game=t;const n=t.tuning.borders;this.mesh=new sa(this.geo,new Mt({vertexShader:r2,fragmentShader:s2,uniforms:{...ot,uWidth:{value:n.width},uSparkle:{value:n.sparkle},uBright:{value:n.brightness}},transparent:!0,depthWrite:!1,blending:Sr})),this.mesh.frustumCulled=!1,e.add(this.mesh)}game;areas=new Map;jobs=[];geo=new Ht;stamp="";mesh;update(){const e=this.game,t=e.tuning.borders;if(!t.on){this.mesh.visible=!1;return}for(const[c,l]of e.party.areas){if(this.areas.has(c))continue;const h=e.map.siteOf(l.cell[0],l.cell[1]),d=l.from?e.map.siteOf(l.from[0],l.from[1]):null,u=d?(d.x+h.x)/2:h.x,p=d?(d.z+h.z)/2:h.z,g=e.map.areaSize*1.6,v=e.tuning.party.transition,x=da(vn[e.map.typeOf(l.cell[0],l.cell[1])].creature),m={points:[],colour:new et(x[0]/255,x[1]/255,x[2]/255),on:(_,M)=>l.wave===0?-1:l.at+Math.min(1,Math.hypot(_-u,M-p)/g)*v,done:!1};this.areas.set(c,m),this.jobs.push({key:c,gen:i2(e.map,l.cell,t.step,m.points)})}const n=performance.now()+3;for(;this.jobs.length&&performance.now()<n;){const c=this.jobs[0];c.gen.next().done&&(this.areas.get(c.key).done=!0,this.jobs.shift())}const r=`${e.party.areas.size}|${[...this.areas.values()].filter(c=>c.done).length}`;if(r===this.stamp)return;this.stamp=r;const s=[],a=[],o=[];for(const[,c]of this.areas)if(c.done)for(const l of c.points)l.other!=="edge"&&e.party.areas.has(l.other)||(s.push(l.x,.15,l.z),a.push(c.colour.r,c.colour.g,c.colour.b),o.push(((l.x*12.9898+l.z*78.233)%1+1)%1,c.on(l.x,l.z)));this.geo.setAttribute("position",new Lt(s,3)),this.geo.setAttribute("aColour",new Lt(a,3)),this.geo.setAttribute("aSpark",new Lt(o,2))}}const o2=`
varying vec3 vWorld;
void main() {
  vec4 w = modelMatrix * vec4(position, 1.0);
  vWorld = w.xyz;
  gl_Position = projectionMatrix * viewMatrix * w;
}`,l2=`
uniform float uStrength, uWind, uPixel;
uniform sampler2D uDepth; uniform vec2 uLow;
varying vec3 vWorld;
${ri}
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
}`;class c2{constructor(e,t,n,r,s,a,o){this.height=t,this.mat=new Mt({vertexShader:o2,fragmentShader:l2,uniforms:{...ot,uStrength:{value:e},uWind:{value:n},uPixel:{value:r},uDepth:{value:a},uLow:{value:o}},depthWrite:!1,depthTest:!s,blending:s?Hn:pr}),this.mesh=new Gt(new _n(700,700).rotateX(-Math.PI/2),this.mat),this.mesh.frustumCulled=!1,this.mesh.renderOrder=2}height;mesh;mat;follow(e,t){this.mesh.position.set(e,this.height,t-150)}}const h2=`
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
}`,u2=`
uniform float uStrength;
varying vec2 vLocal;
varying vec3 vWorld;
varying float vScenery;
${ri}
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
}`;class d2{mesh;geo=new Bl;attr;capacity=0;constructor(e,t=!0){const n=new _n(1,1).rotateX(-Math.PI/2);this.geo.index=n.index,this.geo.setAttribute("position",n.getAttribute("position")),this.attr=this.grow(1024);const r=new Mt({vertexShader:h2,fragmentShader:u2,uniforms:{...ot,uStrength:{value:e}},depthWrite:!1,...t?{transparent:!0,blending:ga,blendSrc:Sl,blendDst:yl}:{}});this.mesh=new Gt(this.geo,r),this.mesh.frustumCulled=!1,this.mesh.renderOrder=1}grow(e){return this.capacity=Math.max(e,this.capacity*2),this.geo.dispose(),this.attr=new Ul(new Float32Array(this.capacity*4),4),this.attr.setUsage(mr),this.geo.setAttribute("iShadow",this.attr),this.attr}set(e){e.length>this.capacity&&this.grow(e.length);const t=this.attr.array;e.forEach((n,r)=>{t[r*4]=n.x,t[r*4+1]=n.z,t[r*4+2]=n.scenery?-n.w:n.w,t[r*4+3]=n.d}),this.attr.needsUpdate=!0,this.geo.instanceCount=e.length,this.mesh.visible=e.length>0}}const f2=i=>({radius:i.haze.far,fps:i.scenery.fps,slowFor:0,fastFor:0});function p2(i,e,t){const n=t.scenery;if(!n.adaptive||!(e>0)||e>.25)return i;const r=i.fps+(1/e-i.fps)*Math.min(1,e*4),s=r<n.fps-n.hysteresis?i.slowFor+e:0,a=r>=n.fps?i.fastFor+e:0;let o=i.radius;return s>n.sustain?o-=n.shrink*e:a>n.sustain&&(o+=n.grow*e),o=Math.min(t.haze.far,Math.max(Math.min(n.minRadius,t.haze.far),o)),{radius:o,fps:r,slowFor:s,fastFor:a}}class m2{constructor(e,t,n){this.canvas=e,this.game=t,this.style=n;const r=t.tuning;this.budget=f2(r),this.renderer=new sM({canvas:e,antialias:!1,powerPreference:"high-performance",preserveDrawingBuffer:!0}),this.renderer.setPixelRatio(1),this.renderer.info.autoReset=!1,this.renderer.outputColorSpace=$r,this.mpp=1/(r.artPixelsPerMetre*(2/r.pixelSize)),this.camera=new dn(r.camera.fov,1,1,900),this.post=new RM(this.renderer,r),this.scene.background=new et(723478),_M(n,r.glowReach,this.mpp,r.tone.ambient),ot.uGlowPower.value=r.glowPower,this.assets=new vM(n,t.seed,r.pixelSize),this.ground=new yM(t.map,t.forest,n,this.mpp),this.assets.onFloor=(u,p)=>this.ground.setFloor(u,p);const s=r.canopyShadow;this.ground.setCanopyShadow(s.on?s.strength:0,s.height,s.cover,s.wind),this.shadows=new d2(r.shadows.strength,r.fx==="smooth"),this.shadows.mesh.visible=r.shadows.on,this.scene.add(this.shadows.mesh);const a=r.fx==="smooth";ot.uSmooth.value=a?1:0,r.mist.on&&r.mist.strength>0&&(this.mist=new c2(r.mist.strength,r.mist.height,r.mist.wind,this.mpp,a,this.post.scene.depthTexture,this.post.lowSize),a?(this.post.fxScene=new Ac,this.post.fxScene.add(this.mist.mesh)):this.scene.add(this.mist.mesh)),ot.uHazeRange.value.set(r.haze.near,r.haze.far),this.scene.add(this.ground.mesh);const o=r.occlusion;this.witchBatch=new sr(this.assets.witch,this.mpp,{unlit:!0,silhouette:{colour:ot.uGlowRgb.value.clone(),opacity:o.silhouette}}),this.witchBatch.mesh.renderOrder=10,this.scene.add(...this.witchBatch.meshes),qt.uOcc.value.set(o.fadeOpacity,o.edge,o.minHeight,o.on?1:0),this.stoneBatch=new sr(this.assets.stones,this.mpp,{fade:!0}),this.scene.add(...this.stoneBatch.meshes);const c=t.map.dancefloor,l=[],h=t.tuning.dancefloor.stones;for(let u=0;u<h;u++){const p=u/h*Math.PI*2+.3;l.push({x:c.x+Math.cos(p)*c.radius,y:0,z:c.z+Math.sin(p)*c.radius,frame:this.assets.stones.frames[u%4],flip:u%2===0})}this.stoneBatch.set(l),this.propBatch=new sr(this.assets.props,this.mpp,{fade:!0}),this.scene.add(...this.propBatch.meshes),this.partyView=new FM(this.assets.soundsystems,this.mpp),this.strings=new XM(this.scene,t),this.leashView=new ZM(this.scene,t),this.lasers=new n2(this.scene,t),this.borders=new a2(this.scene,t),this.soundBatch=new sr(this.assets.soundsystems,this.mpp,{fade:!0}),this.scene.add(...this.soundBatch.meshes),this.dancefloor=new NM(t.map,r,qt,this.mpp),this.scene.add(this.dancefloor.ball,this.dancefloor.beam,this.dancefloor.motes);const d=r.fx==="smooth"?new Mt({transparent:!0,depthWrite:!1,blending:ga,blendSrc:Sl,blendDst:yl,vertexShader:"varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }",fragmentShader:"varying vec2 vUv; void main(){ vec2 p = vUv * 2.0 - 1.0; float r = dot(p, p); if (r > 1.0) discard; gl_FragColor = vec4(vec3(1.0 - 0.75 * (1.0 - r) * (1.0 - r)), 1.0); }"}):new Mt({transparent:!1,depthWrite:!1,vertexShader:"varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }",fragmentShader:"varying vec2 vUv; void main(){ vec2 p = vUv * 2.0 - 1.0; if (dot(p, p) > 1.0 || mod(floor(gl_FragCoord.x) + floor(gl_FragCoord.y), 2.0) > 0.5) discard; gl_FragColor = vec4(0.02, 0.02, 0.05, 1.0); }"});this.shadow=new Gt(new _n(1.4,.7).rotateX(-Math.PI/2),d),this.shadow.renderOrder=1,this.scene.add(this.shadow)}canvas;game;style;renderer;scene=new Ac;camera;ground;assets;typeBatches=new Map;creatureBatches=new Map;witchBatch;stoneBatch;shadow;mpp;lastBuild={x:1/0,y:1/0,z:1/0,version:-1,radius:-1};budget;sceneryFixed=null;lastReal=0;post;dancefloor;propBatch;partyView;strings;leashView;lasers;borders;soundBatch;sources=[];forestLights=[];shadows;shadowList=[];mist=null;width=1;height=1;debugCull=!1;ghosts=[];ghostLines=null;now=0;stats={sceneryRadius:0,fps:0,gameplay:0,scenery:0,dropped:0,trees:0,bushes:0,creatures:0,batches:0,drawCalls:0,pendingArt:0,pendingGround:0,lights:0};resize(e,t){const n=this.game.tuning.pixelSize;this.width=Math.max(1,Math.ceil(e/n)),this.height=Math.max(1,Math.ceil(t/n));const r=this.post.fullResolution?n:1;this.renderer.setSize(this.width*r,this.height*r,!1),this.post.resize(this.width,this.height,this.width*r,this.height*r),this.canvas.style.width=this.width*n+"px",this.canvas.style.height=this.height*n+"px",this.camera.aspect=this.width/this.height,this.camera.updateProjectionMatrix(),qt.uRes.value.set(this.width,this.height)}async prepare(){this.render(0,!1),this.drawCreatures(),this.ground.fill(this.renderer,this.viewRect(this.game.tuning.haze.near,20),this.game.witch.x,this.game.witch.z,1/0),await this.assets.whenIdle(),this.render(0,!1),this.refresh(!0);for(let e=0;e<vn.length;e++)this.assets.prefetchType(e);for(const e of vn)this.assets.creatureArt(e.creature)}batchFor(e,t,n){let r=e.get(t);return r||(r=n(),r&&(e.set(t,r),this.scene.add(...r.meshes))),r}frustum=new na;frustumTo=new na;cullCam=new dn;box=new Ar;m4=new Pt;v3=new W;at=new Map;tracks={placed:{now:new Set,before:new Set},moving:{now:new Set,before:new Set}};pops=[];poseCamera(e,t){const n=t.angle*Math.PI/180;e.position.set(t.tx,t.ty+Math.sin(n)*t.distance,t.tz+Math.cos(n)*t.distance),e.up.set(0,1,0),e.lookAt(t.tx,t.ty,t.tz),e.updateMatrixWorld()}updateFrustum(){const e=this.game,t=e.tuning,n=this.camera;n.updateMatrixWorld(),this.m4.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this.frustum.setFromProjectionMatrix(this.m4);const r=Math.max(1,t.camera.zoomSteps),s=e.witch.mode==="rising"||e.witch.mode==="treetop"?1:0,a=xh({...e.camera,zoom:r>1?e.camera.zoomStep/(r-1):0},s,t),o=this.cullCam;o.fov=n.fov,o.aspect=n.aspect,o.near=n.near,o.far=n.far,o.updateProjectionMatrix(),this.poseCamera(o,{...a,ty:Pn(t.groundHeight,t.treetopHeight,s)}),this.m4.multiplyMatrices(o.projectionMatrix,o.matrixWorldInverse),this.frustumTo.setFromProjectionMatrix(this.m4)}viewRect(e,t){const n=this.game.witch,r=[];for(const o of[this.camera,this.cullCam]){const c=o.position,l=e+Math.hypot(c.x-n.x,c.z-n.z)+t;for(const h of[-1,1])for(const d of[-1,1]){const u=this.v3.set(h,d,1).unproject(o).sub(c).normalize();for(const p of[0,25]){let g=u.y<-.001?(p-c.y)/u.y:1/0;g>0||(g=1/0),g=Math.min(g,l),r.push([c.x+u.x*g,c.z+u.z*g])}}r.push([c.x,c.z])}const s=r.map(o=>o[0]),a=r.map(o=>o[1]);return{minX:Math.min(...s)-t,maxX:Math.max(...s)+t,minZ:Math.min(...a)-t,maxZ:Math.max(...a)+t}}inView(e,t,n,r,s,a=this.game.tuning.haze.far){const o=this.game.witch.x,c=this.game.witch.z,l=a+s;return(e-o)**2+(t-c)**2>l*l?!1:(this.box.min.set(e-n/2-s,-s,t-r-s),this.box.max.set(e+n/2+s,r+s,t+s),this.frustum.intersectsBox(this.box)||this.frustumTo.intersectsBox(this.box))}inInnerView(e,t,n){const r=this.game.witch,s=this.game.tuning.haze;if(Math.hypot(e-r.x,t-r.z)>s.near+(s.far-s.near)*.6)return!1;for(const a of[0,n*.5,n]){const o=this.v3.set(e,a,t).project(this.camera);if(Math.abs(o.x)<1&&Math.abs(o.y)<1&&o.z<1)return!0}return!1}mark(e,t,n,r,s=""){const a=e==="creature"||e==="prop"?this.tracks.moving:this.tracks.placed,o=e==="creature"?`${e}|${s}`:`${e}|${t.toFixed(1)}|${n.toFixed(1)}|${r.toFixed(1)}|${s}`;return e==="creature"&&this.at.set(o,[t,n,r]),a.now.add(o),!a.before.has(o)}checkPops(e,t=!0){const n=this.tracks[e],r=t&&this.assets.pending===0&&n.before.size>0;if(this.debugCull){for(const s of n.before)if(!n.now.has(s)){const a=this.at.get(s),[,...o]=s.split("|"),[c,l,h]=a??o.map(Number);this.ghosts.push({x:+c,z:+l,h:Math.max(1,+h),until:this.now+1})}}if(r){const s=(a,o)=>{const c=this.at.get(a),[l,...h]=a.split("|"),[d,u,p]=c??h.map(Number),g=this.game.witch;!(e==="placed"&&Math.hypot(+d-g.x,+u-g.z)>this.budget.radius-this.game.tuning.scenery.fade)&&this.inInnerView(+d,+u,+p)&&this.pops.push(`${o} ${l} ${(+d).toFixed(0)},${(+u).toFixed(0)}`)};for(const a of n.now)n.before.has(a)||s(a,"appeared");for(const a of n.before)n.now.has(a)||s(a,"vanished")}n.before=n.now,n.now=new Set}lastPose={distance:0,angle:0,zoomStep:-1,lift:-1};refresh(e=!1){const t=this.game,n=t.tuning,r=this.camera,s=n.viewMargin,a=lc(t),o={x:r.position.x,y:r.position.y,z:r.position.z},c=this.lastPose,l=t.witch.mode==="rising"||t.witch.mode==="treetop"?1:0,h=Math.hypot(o.x-this.lastBuild.x,o.y-this.lastBuild.y,o.z-this.lastBuild.z)>=s/3,d=this.budget.radius,u=Math.min(n.haze.far,d+s/2),p=Math.abs(d-this.lastBuild.radius)>=s/3,g=Math.abs(a.distance-c.distance)>2||Math.abs(a.angle-c.angle)>.5||t.camera.zoomStep!==c.zoomStep||l!==c.lift;if(!e&&!h&&!g&&!p&&this.assets.version===this.lastBuild.version)return;this.lastBuild={...o,version:this.assets.version,radius:d},this.lastPose={distance:a.distance,angle:a.angle,zoomStep:t.camera.zoomStep,lift:l};const v=this.viewRect(u,s),x=(v.minX+v.maxX)/2,m=(v.minZ+v.maxZ)/2,_=Math.max(v.maxX-v.minX,v.maxZ-v.minZ)/2,M=[],S=ot.uMoonDir.value,w=-S.x/Math.max(.2,S.y),E=-S.z/Math.max(.2,S.y),L=new Map,y=(N,P)=>{let F=L.get(N);F||L.set(N,F=[]),F.push(P)},A=this.mpp;let D=0,R=0;for(const N of t.forest.treesNear(x,m,_)){const P=this.assets.typeArt(N.type);if(!P||!P.layout.big.length)continue;const F=P.atlas.frames,O=P.layout.big[N.variant%P.layout.big.length],V=F[O.top??O.bot];if(!this.inView(N.x,N.z,V.w*A,V.h*A,s,u))continue;const Q=this.mark("tree",N.x,N.z,V.h*A);y(N.type,{x:N.x,y:0,z:N.z,frame:F[O.bot],flip:N.flip,fresh:Q}),O.top!==null&&y(N.type,{x:N.x,y:0,z:N.z,frame:F[O.top],flip:N.flip,top:!0,fresh:Q});const X=V.w*A,te=V.h*A*(O.top===null?.2:.6);n.shadows.trees&&M.push({x:N.x+w*te,z:N.z+E*te,w:X*.8,d:X*.45,scenery:!0}),D++}const U=(N,P,F)=>{for(const O of P){const V=this.assets.typeArt(O.type);if(!V)continue;const Q=F(V.layout);if(!Q.length)continue;const X=Q[O.variant%Q.length],te=V.atlas.frames,B=te[X.bot],ne=te[X.top??X.bot],le=N==="setpiece"?n.setPieceScale:1,_e=A*le;if(!this.inView(O.x,O.z,ne.w*_e,ne.h*_e,s,u))continue;const Ie=this.mark(N,O.x,O.z,ne.h*_e);y(O.type,{x:O.x,y:0,z:O.z,frame:B,flip:O.flip,fresh:Ie,scale:le}),X.top!==null&&y(O.type,{x:O.x,y:0,z:O.z,frame:te[X.top],flip:O.flip,top:!0,fresh:Ie,scale:le}),M.push({x:O.x,z:O.z,w:B.w*_e*.8,d:B.w*_e*.3,scenery:!0}),R++}};U("small",t.forest.bushesNear(x,m,_),N=>N.small),U("wall",t.forest.wallsNear(x,m,_),N=>N.walls.map(P=>({bot:P,top:null}))),U("setpiece",t.forest.setPiecesNear(x,m,_),N=>N.set===null?[]:[N.set]);for(const[N,P]of this.typeBatches)L.has(N)||P.set([]);for(const[N,P]of L)this.batchFor(this.typeBatches,N,()=>{const O=this.assets.typeArt(N);return O&&new sr(O.atlas,A,{scenery:!0,fade:!0})})?.set(P);this.checkPops("placed",!e),this.sources=t.forest.lightsNear(t.witch.x,t.witch.z,n.haze.far+s),this.stats.trees=D,this.stats.bushes=R,this.shadowList=M}drawCreatures(e=0){const t=this.game,n=t.tuning.haze.far+20,r=new Map,s=new Map,a=[],o=60/t.tuning.beat.bpm;let c=0;for(const l of t.creatures){if(Math.abs(l.x-t.witch.x)>n||Math.abs(l.z-t.witch.z)>n)continue;const h=l.leashed?this.assets.partyArt(l.species,l.id,da(l.species)):void 0,d=h??this.assets.creatureArt(l.species),u=h?`party-${l.id}`:l.species;if(!d)continue;s.set(u,d);const p=d.atlas.frames[d.frame(l.level,l.moving?Math.floor(l.walk)%2:0,l.away)];if(!this.inView(l.x,l.z,p.w*this.mpp,p.h*this.mpp,4))continue;const g=this.mark("creature",l.x,l.z,p.h*this.mpp,l.id);let v=r.get(u);v||r.set(u,v=[]);const x=(e/o+l.id%4*.25)*Math.PI,m=l.leashed?Math.abs(Math.sin(x))*(l.moving?.15:.4):0,_=l.leashed&&!l.moving?Math.sin(x*.5)*.12:0;v.push({x:l.x+_,y:m,z:l.z,frame:p,flip:l.facing<0,fresh:g}),a.push({x:l.x,z:l.z,w:p.w*this.mpp*.7,d:p.w*this.mpp*.25}),c++}for(const[l,h]of this.creatureBatches)r.has(l)||h.set([]);for(const[l,h]of r)this.batchFor(this.creatureBatches,l,()=>{const u=s.get(l);return u&&new sr(u.atlas,this.mpp)})?.set(h);this.stats.creatures=c,this.game.tuning.shadows.on&&this.shadows.set(this.shadowList.concat(a))}fire=new W(1,.5,.16);runeCyan=new W(.3,.9,1);runeViolet=new W(.75,.45,1);runeGreen=new W(.45,1,.5);updateSources(e){const t=this.assets.props.frames,n=[],r=[];for(const s of this.sources){if(s.kind==="pond")continue;const a=We(Math.round(s.x*10),Math.round(s.z*10),7);if(s.kind==="campfire"){const o=.8+.12*Math.sin(e*11+a*40)+.08*Math.sin(e*23.7+a*13);r.push({x:s.x+Math.sin(e*9+a)*.08,y:1.2,z:s.z,reach:this.game.tuning.lights.campfire.reach*s.size,rgb:this.fire,strength:this.game.tuning.lights.campfire.strength*o});const c=t[Math.floor(e*8+a*10)%3];this.inView(s.x,s.z,c.w*this.mpp,c.h*this.mpp,4)&&n.push({x:s.x,y:0,z:s.z,frame:c,flip:a<.5,fresh:this.mark("prop",s.x,s.z,2)})}else{const o=a<.33?1:a<.66?0:2,c=.7+.3*Math.sin(e*.9+a*20),l=t[3+o];r.push({x:s.x,y:2,z:s.z,reach:this.game.tuning.lights.stone.reach*s.size,rgb:[this.runeCyan,this.runeViolet,this.runeGreen][o],strength:this.game.tuning.lights.stone.strength*c}),this.inView(s.x,s.z,l.w*this.mpp,l.h*this.mpp,4)&&n.push({x:s.x,y:0,z:s.z,frame:l,flip:a<.5,fresh:this.mark("prop",s.x,s.z,2.6)})}}this.propBatch.set(n),this.forestLights=r}setLights(e,t,n){const r=Math.min(vr,this.game.tuning.lightBudget),s=e.map(l=>({l,d:Math.hypot(l.x-t,l.z-n)-l.reach})).sort((l,h)=>l.d-h.d).slice(0,r+1),a=s.length>r?s[r].d:1/0,o=ot;let c=0;for(const{l,d:h}of s.slice(0,r)){const d=Math.min(1,Math.max(0,(a-h)/15));o.uLightPos.value[c].set(l.x,l.y,l.z,l.reach),o.uLightCol.value[c].set(l.rgb.x,l.rgb.y,l.rgb.z,l.strength*d),c++}o.uLightCount.value=c,this.stats.lights=c}drawGhosts(e){this.now=e,this.ghosts=this.ghosts.filter(a=>a.until>e),this.ghostLines||(this.ghostLines=new Fl(new Ht,new uu({color:16719904,depthTest:!1})),this.ghostLines.frustumCulled=!1,this.ghostLines.renderOrder=20,this.scene.add(this.ghostLines));const t=qt.uRight.value,n=qt.uUp.value,r=[];for(const a of this.ghosts){const o=a.h*.4,c=(p,g)=>[a.x+t.x*p*o+n.x*g*a.h,t.y*p*o+n.y*g*a.h,a.z+t.z*p*o+n.z*g*a.h],l=c(-1,0),h=c(1,0),d=c(1,1),u=c(-1,1);r.push(...l,...h,...h,...d,...d,...u,...u,...l,...l,...d)}const s=this.ghostLines.geometry;s.dispose(),s.setAttribute("position",new Lt(r,3)),s.setDrawRange(0,r.length/3),this.ghostLines.visible=r.length>0}render(e,t=!0){const n=this.game,r=n.tuning,s=lc(n);if(t){const R=performance.now();this.lastReal&&(this.budget=p2(this.budget,(R-this.lastReal)/1e3,r)),this.lastReal=R}this.sceneryFixed!==null&&(this.budget.radius=Math.min(r.haze.far,Math.max(1,this.sceneryFixed))),ot.uScenery.value.set(this.budget.radius,Math.max(1,r.scenery.fade));const a=s.angle*Math.PI/180,o=2*s.distance*Math.tan(r.camera.fov*Math.PI/360)/this.height,c=new W(0,Math.cos(a),-Math.sin(a)),l=new W(s.tx,s.ty,s.tz),h=l.dot(c),d=l.x;l.addScaledVector(c,Math.round(h/o)*o-h),l.x+=Math.round(d/o)*o-d;const u=new W(0,Math.sin(a),Math.cos(a)).multiplyScalar(s.distance);this.camera.position.copy(l).add(u),this.camera.up.set(0,1,0),this.camera.lookAt(l),this.updateFrustum();const p=r.spriteTilt;qt.uUp.value.set(0,1,0).lerp(c,p).normalize(),qt.uFacing.value.crossVectors(qt.uRight.value,qt.uUp.value).normalize();const g=sc(n.witch),v=r.canopyCutout;this.camera.updateMatrixWorld();const x=this.v3.set(n.witch.x,Mr(n.witch,r)*.5,n.witch.z).project(this.camera);qt.uCutout.value.set((x.x*.5+.5)*this.width,(x.y*.5+.5)*this.height,.5*v.screenFraction*this.width*(1-g),Math.max(1,v.edge*this.width*(1-g))),qt.uTopFade.value=g,qt.uDebugCull.value=this.debugCull?1:0;const m=n.witch,_=Mr(m,r);ot.uGlowPos.value.set(m.x,_+r.glowHeight,m.z),ot.uHazeCentre.value.set(m.x,m.z),this.updateSources(e);const M=this.partyView.update(n,e,(R,U,N,P)=>this.inView(R,U,N,P,4),()=>!1);this.soundBatch.set(M.items),this.ground.setSweeps(M.sweeps),this.lasers.update(e,M.playing,m.x,m.z),this.strings.update(),this.borders.update(),this.setLights([this.dancefloor.update(e,this.ground),...M.lights,...this.forestLights],m.x,m.z),ot.uTime.value=e,this.mist?.follow(s.tx,s.tz);const S=Math.sin(e*2.4)*.12,w=m.mode==="rising"&&m.lift<.9,E=m.mode==="descending"&&m.lift>.1,L=w||E?(w?8:12)+(m.away?2:0)+Math.floor(e*7)%2:m.lean?6+(m.away?1:0):(m.away?3:0)+Math.floor(e*4)%3,y=this.assets.witch.frames[L],A=_+S-.4+y.h*this.mpp;this.witchBatch.set([{x:m.x,y:_+S-.4,z:m.z,frame:y,flip:m.facing<0}]);{const R=(F,O,V)=>{const Q=this.v3.set(F,O,V).project(this.camera);return[(Q.x+1)/2*this.width,(Q.y+1)/2*this.height]},U=R(m.x,_+S-.4,m.z),N=R(m.x,A,m.z),P=R(m.x+y.w*this.mpp/2,_+S-.4,m.z);qt.uWitch.value.set((U[0]+N[0])/2,(U[1]+N[1])/2,Math.abs(P[0]-U[0])+1,Math.abs(N[1]-U[1])/2+1),qt.uWitchDepth.value=-this.v3.set(m.x,_,m.z).applyMatrix4(this.camera.matrixWorldInverse).z}if(this.shadow.position.set(m.x,.03,m.z),this.shadow.scale.setScalar(1-.5*sc(m)),this.refresh(),this.drawCreatures(e),this.checkPops("moving"),this.leashView.update(e,this.camera,this.canvas.clientWidth||window.innerWidth,this.canvas.clientHeight||window.innerHeight,A),this.assets.work(6),this.stats.pendingGround=this.ground.fill(this.renderer,this.viewRect(r.haze.far,40),m.x,m.z,4),this.stats.pendingArt=this.assets.pending,this.debugCull&&this.drawGhosts(e),!t)return;this.renderer.info.reset(),this.post.render(this.scene,this.camera);let D=0;for(const R of[...this.typeBatches.values(),...this.creatureBatches.values(),this.propBatch,this.soundBatch])D+=R.dropped;D&&!this.stats.dropped&&console.warn(`view: ${D} sprite instances set but not drawn`),this.stats.dropped=D,this.stats.drawCalls=this.renderer.info.render.calls,this.stats.batches=this.typeBatches.size+this.creatureBatches.size,this.stats.sceneryRadius=this.budget.radius,this.stats.fps=this.budget.fps,this.stats.scenery=this.stats.trees+this.stats.bushes,this.stats.gameplay=this.stats.creatures+this.propBatch.count+this.soundBatch.count}}const g2="The art style: knobs from the Witch Art Lab. Paste a style saved in the Lab here (its whole saved JSON, or just its style object). Any knob left out follows the Lab's current default, so an empty style means the Lab's default look, and stays up to date as the art changes.",x2="Lab default",v2={},_2={_readme:g2,name:x2,style:v2};function M2(i=_2){const e=i??{},t=e.style&&typeof e.style=="object"?e.style:e,n=dM();for(const[r,s]of Object.entries(t))r in n&&(n[r]=s);return n}function S2(i,e){const t=i.querySelector("#stick"),n=t.querySelector(".knob"),r=56;let s=null,a=0,o=0;const c=()=>i.classList.add("touch"),l=i.querySelector("#stick-zone");l.addEventListener("pointerdown",p=>{if(!(p.pointerType==="mouse"||s!==null)){c(),s=p.pointerId,a=p.clientX,o=p.clientY,t.style.left=a+"px",t.style.top=o+"px",t.classList.add("on");try{l.setPointerCapture(p.pointerId)}catch{}p.preventDefault()}}),l.addEventListener("pointermove",p=>{if(p.pointerId!==s)return;let g=p.clientX-a,v=p.clientY-o;const x=Math.hypot(g,v);x>r&&(g*=r/x,v*=r/x),n.style.transform=`translate(${g}px, ${v}px)`;const m=Math.min(1,x/r),_=.15,M=m<_?0:(m-_)/(1-_)/Math.max(1e-6,m);e.x=g/r*M,e.y=v/r*M});const h=p=>{p.pointerId===s&&(s=null,e.x=0,e.y=0,n.style.transform="",t.classList.remove("on"))};l.addEventListener("pointerup",h),l.addEventListener("pointercancel",h);const d=(p,g)=>{const v=i.querySelector(p);v.addEventListener("pointerdown",x=>{x.preventDefault(),x.stopPropagation(),g(),v.classList.add("down")}),v.addEventListener("pointerup",()=>v.classList.remove("down")),v.addEventListener("pointerleave",()=>v.classList.remove("down"))};d("#rise",()=>e.toggle=!0),d("#zoom-in",()=>e.zoom-=1),d("#zoom-out",()=>e.zoom+=1),d("#sigil",()=>e.sigil=!0);const u=i.querySelector("#talk");u.addEventListener("pointerdown",p=>{p.preventDefault(),p.stopPropagation(),e.talk=!0,u.classList.add("down")});for(const p of["pointerup","pointerleave","pointercancel"])u.addEventListener(p,()=>{e.talk=!1,u.classList.remove("down")});window.addEventListener("touchstart",p=>{c(),p.touches.length===3&&(e.debug=!0)},{passive:!0})}const Mn=new URLSearchParams(location.search);let Ni=mf(Mn.get("seed"));Ni===null&&(Ni=Math.floor(Math.random()*1e6),Mn.set("seed",String(Ni)),history.replaceState(null,"","?"+Mn.toString()+location.hash));const mn={...Xi,bloom:{...Xi.bloom},tiltShift:{...Xi.tiltShift},shadows:{...Xi.shadows},canopyShadow:{...Xi.canopyShadow},mist:{...Xi.mist}};Mn.get("shadows")==="off"&&(mn.shadows.on=!1);Mn.get("canopy")==="off"&&(mn.canopyShadow.on=!1);Mn.get("mist")==="off"&&(mn.mist.on=!1);const Ns=Mn.get("tilt");Ns==="off"?mn.tiltShift.on=!1:(Ns==="before"||Ns==="after")&&(mn.tiltShift.on=!0,mn.tiltShift.where=Ns);Mn.get("bloom")==="off"&&(mn.bloom.on=!1);const uo=Mn.get("fx");(uo==="pixel"||uo==="smooth")&&(mn.fx=uo);const en=Vf(Ni,mn),y2=document.getElementById("game"),fo=M2(),Gi=new m2(y2,en,{...fo,pixel:mn.pixelSize,treeSize:fo.treeSize*mn.treeHeight,crownWidth:fo.crownWidth*mn.crownWidth/mn.treeHeight});Gi.debugCull=Mn.get("debug")==="cull";const ph=Number(Mn.get("scenery"));Mn.has("scenery")&&ph>0&&(Gi.sceneryFixed=ph);const Cr=new X0;document.getElementById("next-wave").addEventListener("pointerdown",i=>{i.preventDefault(),Cr.touch.nextWave=!0});document.getElementById("pause-waves").addEventListener("pointerdown",i=>{i.preventDefault(),Cr.touch.pauseWaves=!0});S2(document.body,Cr.touch);const Tu=document.getElementById("help");try{localStorage.getItem("witch.help")==="off"&&Tu.classList.add("off")}catch{}window.addEventListener("keydown",i=>{if(i.code!=="KeyH"||i.repeat)return;const e=Tu.classList.toggle("off");try{localStorage.setItem("witch.help",e?"off":"on")}catch{}});document.getElementById("version").textContent="v106 · 36b3414";const b2=document.getElementById("seed");b2.innerHTML=`seed <a href="?seed=${Ni}">${Ni}</a>`;const ll=document.getElementById("debug"),zl=document.getElementById("start"),Ru=document.getElementById("debug-buttons"),kl=document.getElementById("wave"),w2=kl.querySelector(".fill"),E2=kl.querySelector(".label");let Pi=Mn.has("debug");ll.classList.toggle("on",Pi);Ru.classList.toggle("on",Pi);const Cu=()=>Gi.resize(window.innerWidth,window.innerHeight);window.addEventListener("resize",Cu);Cu();let Ma=!1;requestAnimationFrame(()=>setTimeout(async()=>{await Gi.prepare(),Ma=!0,zl.classList.remove("loading")},0));let mh=null;function Lu(){if(!Ma||!en.clock.paused)return!1;try{mh??=new AudioContext,mh.resume()}catch{}return en.clock.paused=!1,zl.style.display="none",Cr.clearPresses(),!0}Cr.onAny=Lu;zl.addEventListener("pointerdown",i=>{i.preventDefault(),Lu()});document.addEventListener("visibilitychange",()=>{document.hidden&&(qs=0)});let qs=0,gh=60,po=0,Us=0;function Pu(i){requestAnimationFrame(Pu);const e=qs?(i-qs)/1e3:0;qs=i,po++,Us+=e,Us>=.5&&(gh=po/Us,po=0,Us=0);const t=Cr.read();if(t.debug&&(Pi=!Pi,ll.classList.toggle("on",Pi),Ru.classList.toggle("on",Pi)),Xf(en,t,e),!Ma)return;const n=Wf(en.party,en.map,en.clock.time);if(w2.style.height=`${(1-n.gone)*100}%`,E2.textContent=`wave ${en.party.wave} · ${en.party.areas.size} areas · ${Math.ceil(n.left)} s`,kl.classList.toggle("paused",en.party.paused),Gi.render(en.clock.time),Pi){const r=en.witch,s=Gi.stats;ll.textContent=[`fps    ${gh.toFixed(0)}`,`seed   ${Ni}`,`area   ${Gh(en)}`,`mode   ${r.mode}`,`at     ${r.x.toFixed(0)}, ${r.z.toFixed(0)} m   zoom ${en.camera.zoomStep}`,`trees  ${s.trees}  bushes ${s.bushes}  creatures ${s.creatures}`,`budget scenery to ${s.sceneryRadius.toFixed(0)} m (${s.scenery})  gameplay ${s.gameplay}  dropped ${s.dropped}`,`draws  ${s.drawCalls}  art queued ${s.pendingArt}  ground tiles ${s.pendingGround}`].join(`
`)}}requestAnimationFrame(Pu);window.witch={game:en,view:Gi,areaUnderWitch:()=>Gh(en),areaTypeId:i=>vn[i].id,get ready(){return Ma}};
